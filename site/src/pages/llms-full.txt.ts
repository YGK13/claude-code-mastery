import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, MODULES, REFERENCE } from '../lib-site';

/** Order pages the way a reader would encounter them, then append anything else. */
function orderedIds(): string[] {
  const ids = ['welcome', 'who-its-for', 'cohort'];
  for (const m of MODULES) {
    ids.push(`curriculum/${m.slug}/overview`);
    for (const l of m.lessons) ids.push(`curriculum/${m.slug}/${l.slug}`);
  }
  for (const r of REFERENCE) ids.push(`reference/${r.slug}`);
  ids.push('resources/tools', 'resources/templates', 'resources/reading');
  return ids;
}

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const byId = new Map(docs.map((d) => [d.id.replace(/\/index$/, ''), d]));
  const out: string[] = [];
  out.push(`# ${SITE.name}: full text`, '');
  out.push(`> ${SITE.tagline}`, '');
  out.push(`Source: ${SITE.url} | Repo: ${SITE.repo} | License: ${SITE.license} | Author: ${SITE.author.name} | Publisher: ${SITE.publisher.name} | Last updated: ${SITE.lastUpdated}`, '');
  out.push('Claude Code Mastery is independent and not affiliated with Anthropic. Claude and Claude Code are trademarks of Anthropic, PBC.', '');

  const seen = new Set<string>();
  const emit = (id: string) => {
    const d = byId.get(id);
    if (!d || seen.has(id)) return;
    seen.add(id);
    out.push('---', '');
    out.push(`# ${d.data.title}`, '');
    out.push(`URL: ${SITE.url}/${id}/`);
    if (d.data.description) out.push(`Summary: ${d.data.description}`);
    out.push('');
    out.push((d.body ?? '').trim(), '');
  };
  for (const id of orderedIds()) emit(id);
  for (const d of docs) {
    const id = d.id.replace(/\/index$/, '');
    if (id === 'index' || id === '404') continue;
    emit(id);
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
