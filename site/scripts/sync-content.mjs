#!/usr/bin/env node
/**
 * sync-content.mjs
 *
 * Materialises curriculum pages for the Starlight site from the canonical
 * markdown in ../modules and ../reference.
 *
 * Rules (deliberately non-destructive):
 *   - A source lesson with NO page on the site gets generated: frontmatter
 *     (title from the H1, description from the first paragraph), H1 stripped,
 *     relative ./x.md links rewritten to site routes.
 *   - A page that already exists is left alone. Several site pages carry
 *     executive-flavoured rewrites that are richer than the repo copy and
 *     must not be clobbered.
 *   - `--refresh-meta` rewrites ONLY the frontmatter of existing pages whose
 *     title/description were auto-generated (title-cased slug, "Part of ..."),
 *     replacing them with the real H1 and first-paragraph summary.
 *   - `--force <slug>` regenerates one page fully from its source.
 *
 * Usage:  node scripts/sync-content.mjs [--refresh-meta] [--force curriculum/06-advanced-patterns/overview]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..', '..');
const docs = path.join(here, '..', 'src', 'content', 'docs');

const args = process.argv.slice(2);
const refreshMeta = args.includes('--refresh-meta');
const forceIdx = args.indexOf('--force');
const forceSlug = forceIdx > -1 ? args[forceIdx + 1] : null;

/** Build the source -> target map. */
function collectSources() {
  const out = [];
  const modulesDir = path.join(repo, 'modules');
  for (const dir of fs.readdirSync(modulesDir).sort()) {
    const full = path.join(modulesDir, dir);
    if (!fs.statSync(full).isDirectory()) continue;
    for (const file of fs.readdirSync(full).sort()) {
      if (!file.endsWith('.md')) continue;
      const name = file === 'README.md' ? 'overview' : file.replace(/\.md$/, '');
      out.push({
        source: path.join(full, file),
        rel: path.relative(repo, path.join(full, file)),
        slug: `curriculum/${dir}/${name}`,
        moduleDir: dir,
      });
    }
  }
  const refDir = path.join(repo, 'reference');
  for (const file of fs.readdirSync(refDir).sort()) {
    if (!file.endsWith('.md')) continue;
    out.push({
      source: path.join(refDir, file),
      rel: path.relative(repo, path.join(refDir, file)),
      slug: `reference/${file.replace(/\.md$/, '')}`,
      moduleDir: null,
    });
  }
  return out;
}

/** Turn "./x.md", "../01-getting-started/README.md", "../modules/..", "../reference/.." into site routes. */
function rewriteLinks(md, moduleDir) {
  return md.replace(/\]\((\.{1,2}\/[^)\s#]+?\.md)(#[^)]*)?\)/g, (m, target, hash = '') => {
    const parts = target.split('/');
    let route = null;
    if (target.startsWith('./')) {
      const name = parts[1].replace(/\.md$/, '');
      const base = moduleDir ? `/curriculum/${moduleDir}/` : '/reference/';
      route = base + (name === 'README' ? 'overview' : name) + '/';
    } else if (parts[1] === 'modules' && parts.length >= 4) {
      const name = parts[3].replace(/\.md$/, '');
      route = `/curriculum/${parts[2]}/${name === 'README' ? 'overview' : name}/`;
    } else if (parts[1] === 'reference' && parts.length >= 3) {
      route = `/reference/${parts[2].replace(/\.md$/, '')}/`;
    } else if (moduleDir && parts.length === 3) {
      // ../02-building-web-apps/README.md from inside modules/
      const name = parts[2].replace(/\.md$/, '');
      route = `/curriculum/${parts[1]}/${name === 'README' ? 'overview' : name}/`;
    }
    return route ? `](${route}${hash})` : m;
  });
}

function stripMarkdown(s) {
  return s
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(s, max = 155) {
  if (s.length <= max) return s;
  // Prefer whole sentences; fall back to a word boundary.
  // Split only on sentence punctuation followed by whitespace, so "CLAUDE.md" and "Next.js" survive.
  const sentences = s.split(/(?<=[.!?])\s+/);
  let out = '';
  for (const sent of sentences) {
    if ((out + ' ' + sent).trim().length > max) break;
    out = (out + ' ' + sent).trim();
  }
  if (out.length >= 60) return out;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

/** Hand-written descriptions for pages whose first paragraph is not a summary. */
const DESCRIPTION_OVERRIDES = {
  'reference/commands-cheatsheet': 'Every Claude Code CLI flag, slash command and keyboard shortcut on one page. Startup options, session commands, permissions and model selection.',
  'reference/hooks-patterns': 'Copy-paste hook configurations for Claude Code: settings.json structure, PreToolUse and PostToolUse patterns, notifications, git checkpoints and formatters.',
  'reference/skills-catalog': 'A catalog of reusable Claude Code skills and slash commands, how to install them globally or per project and how to write your own.',
  'reference/troubleshooting': 'Fixes for the most common Claude Code problems: install and PATH errors, API key issues, permission prompts, context overflow and MCP server failures.',
  'curriculum/05-mcp-integrations/installing-mcp-servers': 'How to install and configure the most useful MCP servers for Claude Code (GitHub, filesystem, Slack, Google Drive, databases) and register them in claude.json.',
  'curriculum/01-getting-started/permissions-and-safety': 'What Claude Code can do on your machine, what it asks permission for, how to allow or deny commands in settings.json and how to work safely with git.',
};

/** A description is weak if it is short, ends in a colon or reads like a fragment. */
function weak(desc) {
  return !desc || desc.length < 60 || /[:,;]$/.test(desc) || /^[a-z]/.test(desc);
}

function yamlString(s) {
  return JSON.stringify(s);
}

/** Parse a source file into { title, description, body } (body without H1). */
function parseSource(src, moduleDir) {
  const raw = fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n');
  const lines = raw.split('\n');
  let title = null;
  const bodyLines = [];
  for (const line of lines) {
    if (title === null && /^#\s+/.test(line)) {
      title = line.replace(/^#\s+/, '').trim();
      continue;
    }
    bodyLines.push(line);
  }
  let body = bodyLines.join('\n').replace(/^\s+/, '');
  body = rewriteLinks(body, moduleDir);
  // First real paragraph (skip bold metadata lines like **Time estimate:** and rules)
  const paras = body.split(/\n\s*\n/);
  let description = '';
  for (const p of paras) {
    const t = p.trim();
    if (!t || t === '---' || t.startsWith('#') || t.startsWith('**') || t.startsWith('```') || t.startsWith('|') || t.startsWith('-') || t.startsWith('>') || /^\d+\./.test(t)) continue;
    description = clip(stripMarkdown(t));
    break;
  }
  return { title: title || path.basename(src, '.md'), description, body };
}

function readFrontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, fmRaw: '', body: raw };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return { fm, fmRaw: m[1], body: m[2] };
}

function slugTitleCase(slug) {
  return slug.split('/').pop().split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function writePage(target, title, description, body, rel) {
  const fm = [
    '---',
    `# generated from ${rel} by site/scripts/sync-content.mjs`,
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    '---',
    '',
  ].join('\n');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, fm + body.trimEnd() + '\n');
}

let created = 0, refreshed = 0, skipped = 0;
for (const entry of collectSources()) {
  const target = path.join(docs, entry.slug + '.md');
  const parsed = parseSource(entry.source, entry.moduleDir);
  const exists = fs.existsSync(target);

  if (!exists || forceSlug === entry.slug) {
    writePage(target, parsed.title, DESCRIPTION_OVERRIDES[entry.slug] || parsed.description, parsed.body, entry.rel);
    created++;
    console.log(`${exists ? 'regenerated' : 'created'}  ${entry.slug}`);
    continue;
  }

  if (refreshMeta) {
    const { fm, body } = readFrontmatter(target);
    const autoTitle = !fm.title || fm.title === slugTitleCase(entry.slug);
    const override = DESCRIPTION_OVERRIDES[entry.slug];
    const autoDesc = !fm.description || /^Part of /.test(fm.description) || weak(fm.description) || (override && fm.description !== override);
    const dupH1 = /^\s*#\s+/.test(body);
    if (autoTitle || autoDesc || dupH1) {
      const title = autoTitle ? parsed.title : fm.title;
      let description = fm.description;
      if (autoDesc) {
        // Prefer the site body's own first paragraph (it may be the richer rewrite).
        const paras = body.split(/\n\s*\n/);
        description = '';
        for (const p of paras) {
          const t = p.trim();
          if (!t || t === '---' || t.startsWith('#') || t.startsWith('**') || t.startsWith('```') || t.startsWith('|') || t.startsWith('-') || t.startsWith('>') || /^\d+\./.test(t)) continue;
          description = clip(stripMarkdown(t));
          break;
        }
        if (!description || weak(description)) description = parsed.description;
        if (weak(description)) description = `${title}: a lesson in the free Claude Code Mastery curriculum by Yuri Kruman.`;
      }
      const cleanBody = body.replace(/^\s*#\s+[^\n]+\n/, '');
      writePage(target, title, DESCRIPTION_OVERRIDES[entry.slug] || description, cleanBody, entry.rel);
      refreshed++;
      console.log(`refreshed  ${entry.slug}  (${autoTitle ? 'title ' : ''}${autoDesc ? 'description' : ''})`);
      continue;
    }
  }
  skipped++;
}
console.log(`\n${created} created/regenerated, ${refreshed} frontmatter refreshed, ${skipped} left untouched.`);
