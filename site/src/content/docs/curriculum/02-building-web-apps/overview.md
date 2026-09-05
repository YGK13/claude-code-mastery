---
title: Module 02 - Building Web Apps
description: Standalone HTML apps, full-stack Next.js apps and the React patterns that matter for shipping real internal tools.
---

**Time estimate:** 4 hours total
**Prerequisite:** [Module 01 - Getting Started](/curriculum/01-getting-started/overview/)

## What you'll be able to do after Module 02

- Build a single-file HTML web app that runs anywhere with no install, no build, no server
- Build a production-grade Next.js app and deploy it to Vercel with one command
- Understand which approach to use for which situation (90% of executive use cases need only the simple one)

## The two tools, the two situations

**Standalone HTML apps (Module 02a):**
For 80% of what you build personally, this is the right approach. One file. Open it in a browser. Share it with a colleague by emailing them the file. No login, no server, no maintenance.

Use this for: personal dashboards, internal team tools, prototypes you're testing with a client, calculators, single-purpose utilities.

**Next.js apps on Vercel (Module 02b):**
For things you want multiple people to use, that need authentication, that need a database, that need to be reliably online with a URL.

Use this for: client-facing tools, anything with user accounts, anything that needs to send emails or scheduled tasks, anything you'll bill for.

## Your executive builds in this module

You'll build three things in Module 02. Pick whichever resonates most with your work - the technique is the same:

1. **A weekly status report generator** - takes notes from your last few meetings (pasted in) and produces a clean weekly update for your boss / board / team
2. **A personal CRM lite** - names, last touchpoint, follow-up date, notes. Persists in your browser. Replaces the "Important Contacts" spreadsheet you've been maintaining
3. **A proposal pricing calculator** - for consultants. Inputs your service mix and scope, outputs a defensible proposal price with a markdown breakdown you can email to a prospect

Each one ships in a single Claude Code session. The technique transfers to anything else.

## Lessons in this module

1. [Standalone HTML apps](/curriculum/02-building-web-apps/standalone-html-apps/) - One file, no install, ship in 30 seconds
2. [Next.js apps](/curriculum/02-building-web-apps/nextjs-apps/) - Scaffold, build, database, deploy
3. [React patterns](/curriculum/02-building-web-apps/react-patterns/) - The component patterns Claude Code handles best

## After this module

→ [Module 03 - AI Agents](/curriculum/03-ai-agents/overview/)
