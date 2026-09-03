import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { SITE } from '../lib-site';

/**
 * Sitemap with real <lastmod> values taken from git history (Vercel clones
 * with history, so this works in CI). Falls back to the build date when a
 * file has no commit yet. Starlight's own sitemap-index.xml is kept too.
 */
function lastmod(filePath: string | undefined, fallback: string): string {
  if (!filePath) return fallback;
  try {
    const abs = path.resolve(filePath);
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', abs], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return out ? out.slice(0, 10) : fallback;
  } catch {
    return fallback;
  }
}

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const today = new Date().toISOString().slice(0, 10);
  const rows = docs
    .filter((d) => d.id !== '404')
    .map((d) => {
      const id = d.id.replace(/\/index$/, '');
      const loc = id === 'index' ? `${SITE.url}/` : `${SITE.url}/${id}/`;
      const depth = id === 'index' ? 0 : id.split('/').length;
      const priority = id === 'index' ? '1.0' : depth === 1 ? '0.8' : id.endsWith('/overview') ? '0.7' : '0.6';
      return { loc, lastmod: lastmod(d.filePath, today), priority };
    })
    .sort((a, b) => a.loc.localeCompare(b.loc));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rows.map((r) => `  <url><loc>${r.loc}</loc><lastmod>${r.lastmod}</lastmod><priority>${r.priority}</priority></url>`),
    '</urlset>',
    '',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
