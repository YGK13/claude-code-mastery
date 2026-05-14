---
title: Tools
description: The exact stack — every tool, service and account you need to ship real AI products. Free tier or paid tier flagged for every one.
---

This is the complete executive AI stack. Use it as a checklist.

## Required (must have)

| Tool | Purpose | Cost | Link |
|------|---------|------|------|
| **Node.js v20+** | Runtime for Claude Code and Next.js | Free | [nodejs.org](https://nodejs.org) |
| **Git** | Version control / undo system | Free | [git-scm.com](https://git-scm.com) |
| **VS Code** | Code editor | Free | [code.visualstudio.com](https://code.visualstudio.com) |
| **Claude Code** | The AI coding agent | Free CLI + API usage | `npm install -g @anthropic-ai/claude-code` |
| **Anthropic API key** | Powers Claude | ~$10-30/month at learning pace | [console.anthropic.com](https://console.anthropic.com) |
| **GitHub account** | Code hosting + version sync | Free | [github.com](https://github.com) |

That's the minimum. With those six things you can ship everything in Modules 01-04.

## Highly recommended

| Tool | Purpose | Cost | Notes |
|------|---------|------|-------|
| **Vercel** | Deploys your apps to the public internet | Free hobby tier | One command from a Next.js project to a live URL |
| **Neon (PostgreSQL)** | Serverless database | Free tier generous | When your apps need to remember things |
| **Clerk** | User authentication | Free up to 10K users | When your apps need login |
| **Cursor** *(optional alternative to VS Code)* | AI-native editor | $20/month | Some operators prefer it. Either works. |

## Nice-to-haves for specific verticals

| Tool | When you need it |
|------|------------------|
| **Resend** | Sending transactional email from your apps (free 100/day) |
| **SerpAPI** | Web search for your agents (free tier limited; $50/mo for serious use) |
| **Twilio** | SMS or WhatsApp integration |
| **Stripe** | Charging money for what you build |
| **Supabase** | Alternative to Neon + Clerk in one platform |

## MCP servers — the connection layer

These let Claude Code talk to your existing tools (covered in Module 05):

| Server | What it connects to | Install |
|--------|---------------------|---------|
| `@modelcontextprotocol/server-filesystem` | Local files anywhere on your machine | npm |
| `@modelcontextprotocol/server-github` | GitHub repos, issues, PRs | npm |
| `mcp-server-gmail` | Read, search and send Gmail | npm |
| `@notionhq/notion-mcp-server` | Notion pages and databases | npm |
| `mcp-server-slack` | Slack channels and messages | npm |

## Estimated monthly cost at full executive scale

If you're using all of this for real work (not learning), monthly:

- Claude API: **$30-100** (depends on agent usage)
- Vercel: **$0** (free tier handles most personal use)
- Neon DB: **$0-20** (free tier handles most projects)
- Clerk auth: **$0** (free tier up to 10K users)
- GitHub: **$0**
- Domain (optional): **$12/year**

**Total: $40-150/month** to operate a small AI product portfolio. The same stack scales to $10K+/month enterprise SaaS without changes.

---

**Cohort members get Yuri's exact configuration files** for every tool above. Onboarding becomes a copy-paste exercise instead of a setup project.
