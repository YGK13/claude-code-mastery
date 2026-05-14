// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// PortLev Learn — Astro Starlight configuration
// Brand: PortLev (portlev.com) — primary #000613, secondary #4b41e1, accent #f59e0b
// Fonts: Manrope (headings), Inter (body) — matches portlev.com

export default defineConfig({
  site: 'https://learn.portlev.com',
  integrations: [
    starlight({
      title: 'PortLev Learn',
      description: 'Build with AI: the free foundational curriculum for executives, operators and consultants learning to ship real AI products with Claude Code.',
      logo: {
        src: './public/portlev-logo.png',
        replacesTitle: false,
        alt: 'PortLev',
      },
      favicon: '/portlev-logo.png',
      customCss: [
        './src/styles/portlev-brand.css',
      ],
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
      ],
      social: [
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/yurikruman' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/YGK13/claude-code-mastery' },
      ],
      components: {
        Banner: './src/components/CohortBanner.astro',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Welcome', slug: 'welcome' },
            { label: 'Who this is for', slug: 'who-its-for' },
            { label: 'The cohort', slug: 'cohort' },
          ],
        },
        {
          label: 'Module 01 — Getting Started',
          items: [
            { label: 'Overview', slug: 'curriculum/01-getting-started/overview' },
            { label: 'Installation', slug: 'curriculum/01-getting-started/installation' },
            { label: 'Your first session', slug: 'curriculum/01-getting-started/first-session' },
            { label: 'The CLAUDE.md file', slug: 'curriculum/01-getting-started/claude-md-guide' },
            { label: 'Permissions and safety', slug: 'curriculum/01-getting-started/permissions-and-safety' },
          ],
        },
        {
          label: 'Module 02 — Building Web Apps',
          items: [
            { label: 'Overview', slug: 'curriculum/02-building-web-apps/overview' },
            { label: 'Standalone HTML apps', slug: 'curriculum/02-building-web-apps/standalone-html-apps' },
            { label: 'Next.js apps', slug: 'curriculum/02-building-web-apps/nextjs-apps' },
            { label: 'React patterns', slug: 'curriculum/02-building-web-apps/react-patterns' },
          ],
        },
        {
          label: 'Module 03 — AI Agents',
          items: [
            { label: 'Overview', slug: 'curriculum/03-ai-agents/overview' },
            { label: 'Python agents', slug: 'curriculum/03-ai-agents/python-agents' },
            { label: 'Tool use patterns', slug: 'curriculum/03-ai-agents/tool-use-patterns' },
            { label: 'Agent architecture', slug: 'curriculum/03-ai-agents/agent-architecture' },
          ],
        },
        {
          label: 'Module 04 — Workflows & Automation',
          items: [
            { label: 'Overview', slug: 'curriculum/04-workflows-automation/overview' },
            { label: 'The hooks system', slug: 'curriculum/04-workflows-automation/hooks-system' },
            { label: 'Multi-agent coordination', slug: 'curriculum/04-workflows-automation/multi-agent' },
            { label: 'CI/CD integration', slug: 'curriculum/04-workflows-automation/cicd-integration' },
          ],
        },
        {
          label: 'Module 05 — MCP Integrations',
          items: [
            { label: 'Overview', slug: 'curriculum/05-mcp-integrations/overview' },
            { label: 'What is MCP', slug: 'curriculum/05-mcp-integrations/what-is-mcp' },
          ],
        },
        {
          label: 'Module 06 — Advanced',
          items: [
            { label: 'Coming soon', slug: 'curriculum/06-advanced/coming-soon' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'Curated reading', slug: 'resources/reading' },
            { label: 'Templates', slug: 'resources/templates' },
            { label: 'Tools', slug: 'resources/tools' },
          ],
        },
      ],
    }),
  ],
});
