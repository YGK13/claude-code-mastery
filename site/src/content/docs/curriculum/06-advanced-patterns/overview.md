---
# generated from modules/06-advanced-patterns/README.md by site/scripts/sync-content.mjs
title: "Module 06 - Advanced Patterns"
description: "Module 06: skills and slash commands, context management and a full multi-agent engineering workflow that takes a feature from idea to deployed code."
---
**Time estimate:** 4 hours
**Prerequisite:** Modules 01–05

---

## What This Module Covers

You know how to build apps, agents, workflows and MCP integrations. This module covers the patterns that distinguish production-grade Claude Code usage from beginner usage.

---

## Lessons

1. [Skills and Slash Commands](/curriculum/06-advanced-patterns/skills-slash-commands/) - Create reusable slash commands that package complex multi-step workflows
2. [Context Management](/curriculum/06-advanced-patterns/context-management/) - Keep Claude focused, avoid context overflow and manage long sessions
3. [The gstack Workflow](/curriculum/06-advanced-patterns/gstack-workflow/) - A complete engineering workflow using specialized agents from idea to deployment

---

## What Makes Expert Claude Code Usage Different

**Beginners:** Ask Claude to do things one at a time, retype context each session, don't configure anything.

**Intermediate:** Use CLAUDE.md for persistent context, understand permissions, build simple agents.

**Expert:**
- Custom slash commands that encode hard-won process knowledge
- Hooks that enforce quality automatically
- Multi-agent pipelines that parallelize work
- CLAUDE.md files that encode team standards, not just preferences
- MCP servers that give Claude access to internal systems
- Context management that keeps sessions productive indefinitely

This module is about moving from intermediate to expert.

---

## Exercise: Build Your Personal Workflow

At the end of this module, create a custom slash command that encodes the most repetitive part of your own work. Examples:

- `/new-feature` - creates branch, scaffolds component, writes test skeleton, updates CLAUDE.md
- `/deploy-check` - runs tests, checks for console.logs, validates env vars, then deploys
- `/standup` - reads recent git commits and drafts a standup message
- `/code-review` - reviews staged changes for bugs, security issues and style violations

---

## Capstone Project

Build a complete AI-powered SaaS feature end-to-end using the full workflow:
1. `/office-hours` for product strategy
2. `/plan-eng-review` for technical design
3. Implementation with Claude Code
4. `/review` for code quality
5. `/qa` for browser testing
6. `/ship` for PR creation and deployment

This is the full production cycle. Complete it once and the pattern becomes muscle memory.
