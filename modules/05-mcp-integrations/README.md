# Module 05 — MCP Integrations

**Time estimate:** 3 hours  
**Prerequisite:** [Module 01 — Getting Started](../01-getting-started/README.md)

---

## What Is MCP?

MCP (Model Context Protocol) is an open standard that lets Claude connect to external tools, data sources and services. Where tools in Python agents are functions you write, MCP servers are standalone programs that expose capabilities Claude can use in any session.

Think of MCP servers as plugins for Claude Code. Install one, and Claude gains access to Gmail, Google Drive, Slack, Notion, GitHub, your database — anything with an MCP server.

---

## Lessons

1. [What Is MCP](./what-is-mcp.md) — How the protocol works and why it matters
2. [Installing MCP Servers](./installing-mcp-servers.md) — The most useful MCP servers and how to set them up
3. [Building Custom MCP](./building-custom-mcp.md) — Write your own MCP server to expose your own data

---

## The 5 MCP Servers You Should Install Today

| Server | What you can do | Install |
|--------|----------------|---------|
| `@modelcontextprotocol/server-filesystem` | Read/write any file on your machine | npm |
| `@modelcontextprotocol/server-github` | Create PRs, manage issues, search code | npm |
| `mcp-server-gmail` | Read, search and send emails | npm |
| `@notionhq/notion-mcp-server` | Read and write Notion pages and databases | npm |
| `mcp-server-slack` | Read channels, post messages, manage Slack | npm |

---

## Quick Setup: GitHub MCP

```bash
# Install
npm install -g @modelcontextprotocol/server-github

# Add to Claude Code config (~/.claude/claude.json)
# (or let Claude Code do it: claude mcp add github)
```

Now in any Claude Code session:
```
> Create a GitHub issue for the bug we just fixed. Title: "Fix null pointer in 
  auth middleware". Body: describe what was broken and what the fix was.
  Add labels: bug, fixed.
```

Claude Code reads your current working directory (to understand the fix) and creates the GitHub issue — all in one prompt.

---

## Exercise

After this module, connect Claude Code to at least two MCP servers and complete these tasks using only Claude Code prompts:

1. **GitHub**: Create a PR for the last branch you worked on, with a proper title and description
2. **Gmail**: Find the last email about a project you're working on and summarize it
3. **Custom**: Build a simple MCP server that exposes one piece of your own data

---

## Next Module

[Module 06 — Advanced Patterns](../06-advanced-patterns/README.md)
