import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, MODULES, REFERENCE, TOTAL_HOURS, TOTAL_LESSONS } from '../lib-site';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const byId = new Map(docs.map((d) => [d.id.replace(/\/index$/, ''), d]));
  const line = (id: string, fallback: string) => {
    const d = byId.get(id);
    const title = d?.data.title ?? fallback;
    const desc = d?.data.description ? `: ${d.data.description}` : '';
    return `- [${title}](${SITE.url}/${id}/)${desc}`;
  };

  const out: string[] = [];
  out.push(`# ${SITE.name}`, '');
  out.push(`> ${SITE.tagline}`, '');
  out.push(SITE.description, '');
  out.push(`- Author: ${SITE.author.name} (${SITE.author.url}), ${SITE.author.sameAs[0]}`);
  out.push(`- Publisher: ${SITE.publisher.name} (${SITE.publisher.url})`);
  out.push(`- Price: free. Source is ${SITE.license}-licensed at ${SITE.repo}`);
  out.push(`- Format: ${MODULES.length} modules, ${TOTAL_LESSONS} lessons, ${REFERENCE.length} reference guides, about ${TOTAL_HOURS} hours plus build time`);
  out.push(`- Audience: executives, operators and consultants who want to ship AI tools without a dev team, and developers adopting agentic coding`);
  out.push(`- Paid tier: guided programs and cohorts at ${SITE.academy}`);
  out.push(`- Newsletter: The Leverage Brief, ${SITE.newsletter}`);
  out.push(`- Not affiliated with Anthropic. Claude and Claude Code are trademarks of Anthropic, PBC.`);
  out.push(`- Full text: ${SITE.url}/llms-full.txt`);
  out.push(`- Last updated: ${SITE.lastUpdated}`, '');

  out.push('## Start here', '');
  out.push(line('welcome', 'Welcome'));
  out.push(line('who-its-for', 'Who this is for'));
  out.push(line('cohort', 'The cohort'), '');

  for (const m of MODULES) {
    out.push(`## Module ${m.n}: ${m.title} (${m.hours} h)`, '');
    out.push(`${m.summary}`, '');
    out.push(line(`curriculum/${m.slug}/overview`, `Module ${m.n} overview`));
    for (const l of m.lessons) out.push(line(`curriculum/${m.slug}/${l.slug}`, l.title));
    out.push('');
  }

  out.push('## Reference', '');
  for (const r of REFERENCE) out.push(line(`reference/${r.slug}`, r.title));
  out.push('');
  out.push('## Resources', '');
  out.push(line('resources/tools', 'Tools'));
  out.push(line('resources/templates', 'Templates'));
  out.push(line('resources/reading', 'Curated reading'));
  out.push('');
  out.push('## Optional', '');
  out.push(`- [GitHub repository](${SITE.repo}): modules/, reference/, templates/ and examples/ as plain markdown and runnable code`);
  out.push(`- [PortLev](${SITE.publisher.url}): the studio behind this curriculum`);
  out.push(`- [Yuri Kruman](${SITE.author.url}): instructor`);
  out.push('');
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
