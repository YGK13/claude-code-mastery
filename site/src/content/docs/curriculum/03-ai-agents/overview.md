---
title: Module 03 - AI Agents
description: Build Python AI agents that reason and take action. Tool use, system prompts, multi-step workflows, production-grade architecture.
---

**Time estimate:** 4 hours total
**Prerequisite:** [Module 01 - Getting Started](/curriculum/01-getting-started/overview/)

## What you'll be able to do after Module 03

- Build a Python AI agent that uses Claude as its reasoning engine
- Define and connect tools so the agent can take real-world action (search the web, send emails, read databases, call APIs)
- Design system prompts that turn a generic LLM into a specialized assistant for one specific job
- Handle errors, retries and edge cases so your agent is reliable enough to deploy

## The mental model

A web app is a thing your user navigates. An **agent** is a thing that decides what to do.

You give it a goal ("research this prospect, summarize their last 3 funding rounds, draft an intro email"), give it tools (web search, your CRM, Gmail) and let it figure out the sequence. The agent reasons, calls tools, reasons on the results, calls more tools and produces an answer.

Most "AI products" in the market right now are agents wrapped in a UI. After Module 03, you can build those.

## Your executive builds in this module

Three agent builds, executive-flavored:

1. **The prospect research agent** - give it a name and company, it pulls news, funding, LinkedIn profile, recent press, and produces a one-page intel brief in 30 seconds
2. **The meeting prep agent** - takes a calendar invite + attendee names + your CRM history, and produces a one-page "what you need to know before this meeting" doc
3. **The HR ticket triage agent** (or your function's equivalent) - reads incoming emails, classifies them, routes to the right person and drafts the first-pass response

You'll build all three. Same architecture, different tools. Once you've shipped one agent, you can ship any agent.

## Lessons in this module

1. [Python agents](/curriculum/03-ai-agents/python-agents/) - The Anthropic SDK, the agent loop, your first working agent
2. [Tool use patterns](/curriculum/03-ai-agents/tool-use-patterns/) - Defining tools, handling results, chaining actions
3. [Agent architecture](/curriculum/03-ai-agents/agent-architecture/) - Production patterns: state, retries, observability, multi-agent

## After this module

→ [Module 04 - Workflows & Automation](/curriculum/04-workflows-automation/overview/)
