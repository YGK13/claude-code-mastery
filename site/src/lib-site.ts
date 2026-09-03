/**
 * Shared site metadata used by the text/XML endpoints (llms.txt, sitemap.xml),
 * the landing-page components and the JSON-LD blocks. Single source of truth
 * for names, URLs, the curriculum map and the FAQ, so the FAQPage schema always
 * matches the visible answers. A domain change is one edit here plus astro.config.mjs.
 */
export const SITE = {
  name: 'Claude Code Mastery',
  url: 'https://claude-code-mastery-self.vercel.app',
  tagline: 'Learn agentic coding with Claude Code. A free six-module curriculum for executives, operators and builders.',
  description:
    'Claude Code Mastery is a free, open-source curriculum for learning Claude Code, the agentic coding tool from Anthropic. Six modules, 19 lessons and four reference guides take you from installation to shipping web apps, AI agents, automated workflows and MCP servers.',
  repo: 'https://github.com/YGK13/claude-code-mastery',
  license: 'MIT',
  author: {
    name: 'Yuri Kruman',
    url: 'https://yurikruman.com',
    sameAs: [
      'https://www.linkedin.com/in/yurikruman/',
      'https://yurikruman.com',
      'https://portlev.com',
      'https://substack.com/@commanderinchief',
      'https://leveragebrief.beehiiv.com',
      'https://github.com/YGK13',
    ],
  },
  publisher: {
    name: 'Portfolio Leverage Company',
    alternateName: 'PortLev',
    url: 'https://portlev.com',
    logo: 'https://claude-code-mastery-self.vercel.app/portlev-mark-256.png',
  },
  newsletter: 'https://leveragebrief.beehiiv.com/subscribe',
  academy: 'https://learn.portlev.com/programs',
  cohort: 'https://learn.portlev.com/cohort',
  lastUpdated: '2026-09-02',
};

export interface Lesson { slug: string; title: string }
export interface Module {
  n: string; slug: string; title: string; hours: number; audience: string; summary: string; lessons: Lesson[];
}

/** Curriculum map: mirrors ../modules. Hours are the estimates in each module README. */
export const MODULES: Module[] = [
  {
    n: '01', slug: '01-getting-started', title: 'Getting Started', hours: 2, audience: 'Everyone starts here',
    summary: 'Install Claude Code, run a first session, write a CLAUDE.md and understand exactly what the agent can and cannot do on your machine.',
    lessons: [
      { slug: 'installation', title: 'Installation' },
      { slug: 'first-session', title: 'Your first session' },
      { slug: 'claude-md-guide', title: 'The CLAUDE.md file' },
      { slug: 'permissions-and-safety', title: 'Permissions and safety' },
    ],
  },
  {
    n: '02', slug: '02-building-web-apps', title: 'Building Web Apps', hours: 4, audience: 'Executives and operators',
    summary: 'Single-file React apps with no build step, then full-stack Next.js on Vercel. Ship a dashboard, a tracker or an internal tool.',
    lessons: [
      { slug: 'standalone-html-apps', title: 'Standalone HTML apps' },
      { slug: 'nextjs-apps', title: 'Next.js apps' },
      { slug: 'react-patterns', title: 'React patterns' },
    ],
  },
  {
    n: '03', slug: '03-ai-agents', title: 'AI Agents', hours: 4, audience: 'Builders start here',
    summary: 'Python agents that reason with Claude and act through tools. Tool-use patterns and an architecture that holds up in production.',
    lessons: [
      { slug: 'python-agents', title: 'Python agents' },
      { slug: 'tool-use-patterns', title: 'Tool use patterns' },
      { slug: 'agent-architecture', title: 'Agent architecture' },
    ],
  },
  {
    n: '04', slug: '04-workflows-automation', title: 'Workflows and Automation', hours: 3, audience: 'Both tracks',
    summary: 'Hooks, multi-agent coordination and GitHub Actions so Claude Code runs without you at the keyboard.',
    lessons: [
      { slug: 'hooks-system', title: 'The hooks system' },
      { slug: 'multi-agent', title: 'Multi-agent coordination' },
      { slug: 'cicd-integration', title: 'CI/CD integration' },
    ],
  },
  {
    n: '05', slug: '05-mcp-integrations', title: 'MCP Integrations', hours: 3, audience: 'Both tracks',
    summary: 'Model Context Protocol: plug Claude into Gmail, Slack, GitHub, Notion and your own data, then build your own server.',
    lessons: [
      { slug: 'what-is-mcp', title: 'What is MCP' },
      { slug: 'installing-mcp-servers', title: 'Installing MCP servers' },
      { slug: 'building-custom-mcp', title: 'Building a custom MCP server' },
    ],
  },
  {
    n: '06', slug: '06-advanced-patterns', title: 'Advanced Patterns', hours: 4, audience: 'After Modules 01 to 05',
    summary: 'Skills and slash commands, context management and a full multi-agent engineering workflow from idea to deploy.',
    lessons: [
      { slug: 'skills-slash-commands', title: 'Skills and slash commands' },
      { slug: 'context-management', title: 'Context management' },
      { slug: 'gstack-workflow', title: 'The gstack workflow' },
    ],
  },
];

export const REFERENCE: Lesson[] = [
  { slug: 'commands-cheatsheet', title: 'Commands cheatsheet' },
  { slug: 'hooks-patterns', title: 'Hooks patterns' },
  { slug: 'skills-catalog', title: 'Skills catalog' },
  { slug: 'troubleshooting', title: 'Troubleshooting' },
];

export const TOTAL_HOURS = MODULES.reduce((a, m) => a + m.hours, 0);
export const TOTAL_LESSONS = MODULES.reduce((a, m) => a + m.lessons.length, 0);

/** FAQ: direct answer first, then context. Rendered on the landing page and emitted as FAQPage JSON-LD. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is Claude Code?',
    a: 'Claude Code is a command-line agentic coding tool from Anthropic. You describe what you want in plain language and it reads, writes and runs code directly in your project folder, asking permission before risky actions. This curriculum teaches you to use it to build web apps, AI agents, automations and MCP integrations.',
  },
  {
    q: 'Is Claude Code Mastery free?',
    a: 'Yes. Every module, lesson, template and example is free and public with no signup. The source is MIT licensed on GitHub, so you can fork it for your team. Guided programs with live coaching are the paid tier, offered through PortLev Academy.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. Module 01 assumes you have never opened a terminal and walks through installation step by step. Executives and operators follow the modules in order; developers can skim Module 01 and start at Module 03 (AI Agents) or Module 05 (MCP).',
  },
  {
    q: 'How long does the curriculum take?',
    a: 'About 20 hours of structured material across six modules, plus your own build time. Module 01 takes two hours and ends with a working single-file app. Most people finish the whole path in four to six weeks at three to five hours a week.',
  },
  {
    q: 'What will I have built by the end?',
    a: 'Six things: a standalone HTML web app, a full-stack Next.js app on Vercel, a Python AI agent that uses Claude as its reasoning engine, an automated workflow with hooks and multiple agents, a custom MCP server connected to your own data and a production-ready AI feature.',
  },
  {
    q: 'What does it cost to run Claude Code while learning?',
    a: 'The Claude Code CLI is free to install. You pay for model usage through an Anthropic API key or a Claude subscription. At a learning pace that is roughly 10 to 30 US dollars a month; Module 01 shows how to set spending limits.',
  },
  {
    q: 'Is this affiliated with Anthropic?',
    a: 'No. Claude Code Mastery is an independent curriculum written by Yuri Kruman and published by Portfolio Leverage Company (PortLev). Claude and Claude Code are trademarks of Anthropic, PBC. Always check the official docs when the tool changes.',
  },
  {
    q: 'How is this different from the official Claude Code docs or YouTube tutorials?',
    a: 'The official docs are a reference, not a path. This curriculum is sequenced project-first: every module ends with something deployed, the examples come from executive and operator work (KPI dashboards, intake bots, research agents) and the CLAUDE.md, hooks and MCP templates are copy-paste ready.',
  },
  {
    q: 'Who is Yuri Kruman?',
    a: 'Yuri Kruman is a three-time Chief Human Resources Officer, has trained AI systems under contract for Meta, Microsoft and OpenAI programs and founded PortLev and BookToCourse.AI. They build production AI agents, automations and web apps with Claude Code daily and write The Leverage Brief newsletter.',
  },
  {
    q: 'Can I use this to train my team?',
    a: 'Yes. The curriculum is MIT licensed: fork the GitHub repository, add your own CLAUDE.md conventions and run it as an internal course. For a facilitated version with live workshops, see the programs at PortLev Academy.',
  },
];
