---
title: Module 05 - MCP Integrations
description: Connect Claude Code to Gmail, Slack, GitHub, Notion, your CRM and any other tool you already use via the Model Context Protocol.
---

**Time estimate:** 3 hours total
**Prerequisite:** [Module 01 - Getting Started](/curriculum/01-getting-started/overview/)

## What you'll be able to do after Module 05

- Connect Claude Code to Gmail (read, search, send, draft emails)
- Connect it to Slack (read channels, post messages, summarize threads)
- Connect it to GitHub, Notion, Google Drive and any other major SaaS tool you use
- Build your own MCP server to expose private data - your own CRM, internal databases, custom APIs

## What MCP actually is

**Model Context Protocol (MCP)** is an open standard for connecting AI tools to data sources and services. Anthropic created it. The major SaaS vendors are racing to support it.

In practice: instead of every AI integration being a one-off custom build, you install an MCP server for the tool you want to connect (Gmail, Slack, GitHub, etc.) and Claude can use it instantly. Zero glue code.

For executives this means: every tool you already use can become something Claude reads from and writes to. Your inbox becomes searchable by an AI agent. Your Slack history becomes context for next quarter's strategy doc. Your Notion notes become the knowledge base for a chatbot you give to your team.

## Your executive builds in this module

1. **Connect Claude to your Gmail** - then ask: "Summarize every email from [client] in the last 90 days. What are they really worried about?"
2. **Connect Claude to your Slack** - then ask: "What did the engineering team flag as blockers this week? Build me a leadership-readable summary."
3. **Build a custom MCP server** for your own CRM (Salesforce, HubSpot, Notion DB, etc.) - now Claude can read and update your pipeline in conversation

## Lessons in this module

1. [What is MCP](/curriculum/05-mcp-integrations/what-is-mcp/) - The protocol explained without jargon
2. [Installing MCP servers](/curriculum/05-mcp-integrations/installing-mcp-servers/) - The 5 servers every executive should install today
3. [Building custom MCP](/curriculum/05-mcp-integrations/building-custom-mcp/) - Expose your own data to Claude

## After this module

→ [Module 06 - Advanced Patterns](/curriculum/06-advanced-patterns/overview/)
