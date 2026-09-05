# What Is MCP?

MCP (Model Context Protocol) is the standard that lets Claude connect to external systems. It defines how AI models and tools communicate - what format requests take, how results are returned and how capabilities are declared.

---

## The Problem MCP Solves

Without MCP, every AI tool integration is bespoke: you write custom code to connect Claude to Gmail, write more custom code to connect it to Notion, more for GitHub, more for Slack. Each integration is one-off, hard to share and hard to maintain.

MCP standardizes the interface. An MCP server exposes tools in a common format. Claude Code (and any other MCP-compatible client) can use any MCP server without custom integration code.

---

## Architecture

```
Claude Code (MCP Client)
        ↕ MCP Protocol (JSON-RPC over stdio or HTTP)
MCP Server (e.g., Gmail server)
        ↕ Native API
Gmail API
```

The MCP server translates between the MCP protocol and the native API. You never write that translation code - you just install the server.

---

## What MCP Servers Expose

Every MCP server declares:

**Tools** - Actions Claude can take
```
send_email(to, subject, body)
create_issue(repo, title, body, labels)
query_database(sql)
```

**Resources** - Data Claude can read
```
file://path/to/document.pdf
gmail://inbox/message-id
notion://page/page-id
```

**Prompts** - Reusable prompt templates
```
"Summarize the last 10 emails from this sender"
"Create a weekly status report from these Notion pages"
```

---

## Transports

MCP servers communicate over two transports:

**stdio** (most common): Claude Code launches the server as a child process, communicates via stdin/stdout. Simplest setup - just install the server and configure the path.

**HTTP/SSE** (for remote servers): The server runs on a URL, Claude connects over the network. Used for shared servers, team-wide MCP, or serverless deployment.

---

## Security Model

MCP servers only run when Claude Code is active. They don't run in the background. Claude requests tools from them on-demand, and the MCP server executes on your machine with your credentials.

Key points:
- MCP servers run with the permissions of the user who starts them
- Credentials (API keys, OAuth tokens) stay on your machine - they're never sent to Anthropic
- You can restrict which MCP servers are available per project via `.claude/settings.json`

---

## The Registry

Thousands of MCP servers are publicly available. Browse them at:
- [mcp-registry.io](https://mcp-registry.io) - community registry
- [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) - official servers
- [npmjs.com](https://npmjs.com) - search "mcp-server-"

---

Next: [Installing MCP Servers](./installing-mcp-servers.md)
