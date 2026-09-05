// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

/**
 * Claude Code Mastery - Astro Starlight configuration
 *
 * Brand: PortLev (portlev.com) tokens on a locked dark canvas.
 *   ink #000613 / indigo #4b41e1 / violet ramp #645efb -> #818cf8 / amber #f59e0b
 *   Manrope (display) + Inter (body), both Google Fonts with system fallbacks.
 *
 * SITE_URL is the canonical origin. When a custom domain is attached, change it
 * here and in src/lib-site.ts (SITE.url) - nothing else hardcodes the host.
 */
const SITE_URL = 'https://claude-code-mastery-self.vercel.app';
const SITE_NAME = 'Claude Code Mastery';
const SITE_DESCRIPTION =
  'Free, open-source curriculum for learning Claude Code: six modules, 19 lessons, four reference guides. For executives, operators and builders who want to ship AI tools.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const PERSON = {
  '@type': 'Person',
  '@id': 'https://yurikruman.com/#person',
  name: 'Yuri Kruman',
  url: 'https://yurikruman.com',
  jobTitle: 'Founder, Portfolio Leverage Company',
  description:
    'Three-time Chief Human Resources Officer, AI trainer for Meta, Microsoft and OpenAI programs, founder of PortLev and BookToCourse.AI. Builds production AI agents and web apps with Claude Code daily.',
  sameAs: [
    'https://www.linkedin.com/in/yurikruman/',
    'https://yurikruman.com',
    'https://portlev.com',
    'https://substack.com/@commanderinchief',
    'https://leveragebrief.beehiiv.com',
    'https://github.com/YGK13',
  ],
};

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': 'https://portlev.com/#organization',
  name: 'Portfolio Leverage Company',
  alternateName: 'PortLev',
  url: 'https://portlev.com',
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/portlev-mark-256.png`, width: 256, height: 256 },
  founder: { '@id': 'https://yurikruman.com/#person' },
  sameAs: ['https://www.linkedin.com/in/yurikruman/', 'https://github.com/YGK13', 'https://leveragebrief.beehiiv.com'],
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': 'https://portlev.com/#organization' },
  author: { '@id': 'https://yurikruman.com/#person' },
  isAccessibleForFree: true,
  license: 'https://github.com/YGK13/claude-code-mastery/blob/master/README.md#license',
};

const SITE_GRAPH = { '@context': 'https://schema.org', '@graph': [ORGANIZATION, PERSON, WEBSITE] };

const module = (n, slug, label, lessons) => ({
  label: `Module ${n}: ${label}`,
  collapsed: n !== '01',
  items: [
    { label: 'Overview', slug: `curriculum/${slug}/overview` },
    ...lessons.map(([l, s]) => ({ label: l, slug: `curriculum/${slug}/${s}` })),
  ],
});

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  redirects: {
    // Module 06 shipped in Sept 2026; the old placeholder URL keeps working.
    '/curriculum/06-advanced/coming-soon/': '/curriculum/06-advanced-patterns/overview/',
  },
  integrations: [
    starlight({
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      logo: { src: './public/portlev-mark-256.png', replacesTitle: false, alt: 'PortLev mark' },
      favicon: '/favicon.png',
      lastUpdated: true,
      editLink: { baseUrl: 'https://github.com/YGK13/claude-code-mastery/edit/master/site/' },
      customCss: ['./src/styles/portlev-brand.css'],
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap',
          },
        },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0a0d1a' } },
        { tag: 'meta', attrs: { name: 'author', content: 'Yuri Kruman' } },
        { tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Claude Code Mastery: learn agentic coding with Claude Code. A free six-module curriculum by Yuri Kruman.' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE } },
        { tag: 'meta', attrs: { name: 'twitter:creator', content: '@yurikruman' } },
        { tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON.stringify(SITE_GRAPH) },
        // The site is LOCKED to dark. This runs before Starlight's theme provider and
        // overwrites any stale 'light' preference an early visitor may have stored.
        // It also sets .js-reveal, which is what arms the scroll-reveal animation:
        // with scripting off the [data-reveal] sections stay fully visible.
        {
          tag: 'script',
          content: `(function(){try{localStorage.setItem('starlight-theme','dark')}catch(e){}var d=document.documentElement;d.dataset.theme='dark';d.classList.add('js-reveal');})();`,
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/YGK13/claude-code-mastery' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/yurikruman/' },
        { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@yurikruman' },
        { icon: 'email', label: 'The Leverage Brief newsletter', href: 'https://leveragebrief.beehiiv.com/subscribe' },
      ],
      components: {
        Banner: './src/components/SiteBanner.astro',
        Footer: './src/components/SiteFooter.astro',
        // No light/dark/auto switcher: the site is dark-only.
        ThemeSelect: './src/components/EmptyThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Welcome and setup', slug: 'welcome' },
            { label: 'Who this is for', slug: 'who-its-for' },
            { label: 'Guided programs', slug: 'cohort' },
          ],
        },
        module('01', '01-getting-started', 'Getting Started', [
          ['Installation', 'installation'],
          ['Your first session', 'first-session'],
          ['The CLAUDE.md file', 'claude-md-guide'],
          ['Permissions and safety', 'permissions-and-safety'],
        ]),
        module('02', '02-building-web-apps', 'Building Web Apps', [
          ['Standalone HTML apps', 'standalone-html-apps'],
          ['Next.js apps', 'nextjs-apps'],
          ['React patterns', 'react-patterns'],
        ]),
        module('03', '03-ai-agents', 'AI Agents', [
          ['Python agents', 'python-agents'],
          ['Tool use patterns', 'tool-use-patterns'],
          ['Agent architecture', 'agent-architecture'],
        ]),
        module('04', '04-workflows-automation', 'Workflows and Automation', [
          ['The hooks system', 'hooks-system'],
          ['Multi-agent coordination', 'multi-agent'],
          ['CI/CD integration', 'cicd-integration'],
        ]),
        module('05', '05-mcp-integrations', 'MCP Integrations', [
          ['What is MCP', 'what-is-mcp'],
          ['Installing MCP servers', 'installing-mcp-servers'],
          ['Building a custom MCP server', 'building-custom-mcp'],
        ]),
        module('06', '06-advanced-patterns', 'Advanced Patterns', [
          ['Skills and slash commands', 'skills-slash-commands'],
          ['Context management', 'context-management'],
          ['The gstack workflow', 'gstack-workflow'],
        ]),
        {
          label: 'Reference',
          items: [
            { label: 'Commands cheatsheet', slug: 'reference/commands-cheatsheet' },
            { label: 'Hooks patterns', slug: 'reference/hooks-patterns' },
            { label: 'Skills catalog', slug: 'reference/skills-catalog' },
            { label: 'Troubleshooting', slug: 'reference/troubleshooting' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Tools and stack', slug: 'resources/tools' },
            { label: 'Templates', slug: 'resources/templates' },
            { label: 'Curated reading', slug: 'resources/reading' },
          ],
        },
      ],
    }),
  ],
});
