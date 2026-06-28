// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// PortLev Learn - Astro Starlight configuration
// Brand: Executive Premium - ink #0C0F17, gold #C9A24B, oxblood #8C2F39
// Fonts: Fraunces (serif display), Inter (body)

export default defineConfig({
  site: 'https://learn.portlev.com',
  integrations: [
    starlight({
      title: 'PortLev Learn',
      description: 'The Chief AI Officer Program - the most comprehensive path to becoming a Chief AI Officer, built for experienced leaders, not engineers. By Yuri Kruman.',
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
            href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap',
          },
        },
        {
          tag: 'script',
          content: `(function() {
            try { localStorage.setItem('starlight-theme', 'dark'); } catch (e) {}
            document.documentElement.dataset.theme = 'dark';
          })();`,
        },
      ],
      social: [
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/yurikruman' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/YGK13/claude-code-mastery' },
      ],
      components: {
        Banner: './src/components/CohortBanner.astro',
        ThemeSelect: './src/components/EmptyThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Welcome', slug: 'welcome' },
            { label: 'The CAIO Program', slug: 'program/the-program' },
            { label: 'Who this is for', slug: 'who-its-for' },
            { label: 'The cohort', slug: 'cohort' },
          ],
        },
        {
          label: 'Enroll',
          items: [
            { label: 'Pricing & enrollment', slug: 'pricing' },
            { label: 'The CAIO Certificate (waitlist)', slug: 'certificate' },
            { label: "The portfolio you'll build", slug: 'artifacts' },
          ],
        },
        {
          label: 'Pillar I - The CAIO Mandate',
          items: [
            { label: 'Overview', slug: 'program/pillar-1-mandate/overview' },
            { label: 'The Readiness Diagnostic', slug: 'program/pillar-1-mandate/readiness-diagnostic' },
            { label: 'The CAIO role map', slug: 'program/pillar-1-mandate/the-caio-role-map' },
            { label: 'The 80/20 self-audit', slug: 'program/pillar-1-mandate/the-80-20-audit' },
          ],
        },
        {
          label: 'Pillar II - AI Fluency',
          items: [
            { label: 'Overview', slug: 'program/pillar-2-fluency/overview' },
            { label: 'How AI actually works', slug: 'program/pillar-2-fluency/how-ai-actually-works' },
            { label: 'Transformers, without the math', slug: 'program/pillar-2-fluency/transformers-without-the-math' },
            { label: 'The LLM lifecycle', slug: 'program/pillar-2-fluency/the-llm-lifecycle' },
            { label: 'Context, RAG and memory', slug: 'program/pillar-2-fluency/context-rag-and-memory' },
            { label: 'Agents and tools', slug: 'program/pillar-2-fluency/agents-and-tools' },
            { label: 'Evaluation and hallucination', slug: 'program/pillar-2-fluency/evaluation-and-hallucination' },
            { label: 'Cost, latency and risk', slug: 'program/pillar-2-fluency/cost-latency-and-risk' },
            { label: 'Build vs buy vs fine-tune', slug: 'program/pillar-2-fluency/build-vs-buy-vs-fine-tune' },
          ],
        },
        {
          label: 'Pillar III - Build: Ship Real AI',
          items: [
            { label: 'Overview', slug: 'program/pillar-3-build/overview' },
            { label: 'Ship a RAG assistant (free build)', slug: 'program/pillar-3-build/ship-a-rag-assistant' },
          ],
        },
        {
          label: 'Pillar IV - Governance & Risk',
          items: [
            { label: 'Overview', slug: 'program/pillar-4-governance/overview' },
            { label: 'Governance operating model', slug: 'program/pillar-4-governance/governance-operating-model' },
            { label: 'The regulatory map', slug: 'program/pillar-4-governance/regulatory-map' },
            { label: 'Model, vendor & data risk', slug: 'program/pillar-4-governance/model-vendor-data-risk' },
            { label: 'AI policy & charter', slug: 'program/pillar-4-governance/ai-policy-and-charter' },
            { label: 'Bias, fairness & interpretability', slug: 'program/pillar-4-governance/bias-fairness-interpretability' },
          ],
        },
        {
          label: 'Pillar V - Value & Adoption',
          items: [
            { label: 'Overview', slug: 'program/pillar-5-value/overview' },
            { label: 'Why 95% fail', slug: 'program/pillar-5-value/why-95-percent-fail' },
            { label: 'AI value & ROI model', slug: 'program/pillar-5-value/the-ai-value-and-roi-model' },
            { label: 'Portfolio prioritization', slug: 'program/pillar-5-value/portfolio-prioritization' },
            { label: 'The adoption program', slug: 'program/pillar-5-value/the-adoption-program' },
            { label: 'Org design & operating model', slug: 'program/pillar-5-value/org-design-and-the-operating-model' },
          ],
        },
        {
          label: 'Pillar VI - Landing the Seat',
          items: [
            { label: 'Overview', slug: 'program/pillar-6-landing/overview' },
            { label: 'Positioning & the CAIO narrative', slug: 'program/pillar-6-landing/positioning-and-the-caio-narrative' },
            { label: 'The board memo', slug: 'program/pillar-6-landing/the-board-memo' },
            { label: 'Comp & negotiation', slug: 'program/pillar-6-landing/comp-benchmarking-and-negotiation' },
            { label: 'The 100-day plan', slug: 'program/pillar-6-landing/the-100-day-plan' },
            { label: 'Board simulation capstone', slug: 'program/pillar-6-landing/the-board-simulation-capstone' },
          ],
        },
        {
          label: 'Build Track - Hands-On Modules',
          collapsed: true,
          items: [
            { label: 'Module 01 - Getting Started', slug: 'curriculum/01-getting-started/overview' },
            { label: 'Installation', slug: 'curriculum/01-getting-started/installation' },
            { label: 'Your first session', slug: 'curriculum/01-getting-started/first-session' },
            { label: 'The CLAUDE.md file', slug: 'curriculum/01-getting-started/claude-md-guide' },
            { label: 'Permissions and safety', slug: 'curriculum/01-getting-started/permissions-and-safety' },
            { label: 'Module 02 - Building Web Apps', slug: 'curriculum/02-building-web-apps/overview' },
            { label: 'Standalone HTML apps', slug: 'curriculum/02-building-web-apps/standalone-html-apps' },
            { label: 'Next.js apps', slug: 'curriculum/02-building-web-apps/nextjs-apps' },
            { label: 'React patterns', slug: 'curriculum/02-building-web-apps/react-patterns' },
            { label: 'Module 03 - AI Agents', slug: 'curriculum/03-ai-agents/overview' },
            { label: 'Python agents', slug: 'curriculum/03-ai-agents/python-agents' },
            { label: 'Tool use patterns', slug: 'curriculum/03-ai-agents/tool-use-patterns' },
            { label: 'Agent architecture', slug: 'curriculum/03-ai-agents/agent-architecture' },
            { label: 'Module 04 - Workflows', slug: 'curriculum/04-workflows-automation/overview' },
            { label: 'The hooks system', slug: 'curriculum/04-workflows-automation/hooks-system' },
            { label: 'Multi-agent coordination', slug: 'curriculum/04-workflows-automation/multi-agent' },
            { label: 'CI/CD integration', slug: 'curriculum/04-workflows-automation/cicd-integration' },
            { label: 'Module 05 - MCP Integrations', slug: 'curriculum/05-mcp-integrations/overview' },
            { label: 'What is MCP', slug: 'curriculum/05-mcp-integrations/what-is-mcp' },
            { label: 'Module 06 - Advanced', slug: 'curriculum/06-advanced/coming-soon' },
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
