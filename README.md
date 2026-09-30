# Claude Code Mastery — Complete Teaching Curriculum

> **Taught by Yuri Kruman** | 3x CHRO | AI Trainer (Meta, Microsoft, OpenAI) | Founder, BookToCourse.AI

---

## What This Is

This is a complete, practical curriculum for learning to use **Claude Code** to build web apps, AI agents and automated workflows from scratch — even if you've never built software before.

Every module is grounded in real projects. No toy examples. No theory without application.

---

## Who This Is For

- **Professionals and executives** who want to build AI-powered tools without a dev team
- **HR leaders, consultants and coaches** who want to automate their practice with AI
- **Entrepreneurs and founders** who need to ship fast without burning their budget on engineers
- **Developers** who want to supercharge their output 10x with agentic AI tools

---

## What You Will Build

By the end of this curriculum you will have built:

1. A standalone HTML web app (React, no build tools)
2. A full-stack Next.js web application on Vercel
3. A Python AI agent that uses Claude as its reasoning engine
4. An automated workflow with hooks and multi-agent coordination
5. A custom MCP server that connects Claude to your own data
6. A production-ready AI-powered SaaS feature

---

## Curriculum Overview

| Module | Topic | Time Estimate |
|--------|-------|---------------|
| [01 — Getting Started](./modules/01-getting-started/README.md) | Install, configure and run your first session | 2 hours |
| [02 — Building Web Apps](./modules/02-building-web-apps/README.md) | HTML apps, Next.js, React patterns | 4 hours |
| [03 — AI Agents](./modules/03-ai-agents/README.md) | Python agents, tool use, Claude API | 4 hours |
| [04 — Workflows & Automation](./modules/04-workflows-automation/README.md) | Hooks, multi-agent, CI/CD | 3 hours |
| [05 — MCP Integrations](./modules/05-mcp-integrations/README.md) | Installing and building MCP servers | 3 hours |
| [06 — Advanced Patterns](./modules/06-advanced-patterns/README.md) | Skills, orchestration, production | 4 hours |

**Total: ~20 hours of structured learning with hands-on builds**

---

## How to Use This Repo with Google Code Wiki

This repo is designed to be used alongside [Google's Code Wiki](https://codewiki.google/github.com/YGK13/claude-code-mastery) for an interactive, AI-powered documentation experience.

Code Wiki gives you:
- Clickable architecture diagrams of every code example
- AI chat to ask questions about any file in the repo
- Auto-updating docs as this curriculum evolves

**Access the live wiki:** [codewiki.google/github.com/YGK13/claude-code-mastery](https://codewiki.google/github.com/YGK13/claude-code-mastery)

---

## Tools You Need

Before starting Module 01, install these:

| Tool | Purpose | Install |
|------|---------|---------|
| Node.js v20+ | JavaScript runtime for the web-app modules (not needed to install Claude Code) | [nodejs.org](https://nodejs.org) |
| Git | Version control | [git-scm.com](https://git-scm.com) |
| VS Code | Editor | [code.visualstudio.com](https://code.visualstudio.com) |
| Claude Code | The AI coding agent | `curl -fsSL https://claude.ai/install.sh \| bash` (Windows: `irm https://claude.ai/install.ps1 \| iex`) |
| Anthropic API key | Powers Claude | [console.anthropic.com](https://console.anthropic.com) |

---

## Quick Start

```bash
# 1. Install Claude Code (native installer; Windows PowerShell: irm https://claude.ai/install.ps1 | iex)
curl -fsSL https://claude.ai/install.sh | bash

# 2. Open any project folder and start a session (sign in when prompted,
#    or export ANTHROPIC_API_KEY=sk-ant-... first to use an API key)
cd my-project
claude

# 3. Your first prompt
> Create a React app that shows today's date and lets users add tasks to a todo list
```

That's it. Claude Code will create, edit and run code directly in your project.

---

## Templates and Examples

- [`/templates`](./templates) — Starter templates for every project type
- [`/examples`](./examples) — Complete, runnable code examples you can use immediately
- [`/reference`](./reference) — Quick-reference cheatsheets for commands, hooks and MCP

---

## The Instructor

**Yuri Kruman** has trained AI use at Meta, Microsoft and OpenAI. He builds production AI agents, automation systems and web apps using Claude Code daily. This curriculum reflects real production patterns — not academic exercises.

- [LinkedIn](https://linkedin.com/in/yurikruman)
- [Website](https://portlev.com)
- [BookToCourse.AI](https://booktocourse.ai)

---

## License

MIT — fork it, remix it, build with it. Credit appreciated.
