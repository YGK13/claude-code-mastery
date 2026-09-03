---
# generated from modules/05-mcp-integrations/building-custom-mcp.md by site/scripts/sync-content.mjs
title: "Building Custom MCP Servers"
description: "Building your own MCP server lets you expose any data source, internal API or business logic to Claude Code."
---

Building your own MCP server lets you expose any data source, internal API or business logic to Claude Code. This is where Claude starts to feel like a colleague who has access to all your systems.

---

## Setup

```bash
npm install @modelcontextprotocol/sdk
```

---

## Minimal MCP Server (Node.js)

```javascript
// server.mjs — A minimal MCP server with one tool
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create the server
const server = new Server(
  { name: "my-custom-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Declare available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_current_user",
      description: "Returns information about the currently logged-in user from our internal system.",
      inputSchema: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            description: "The user's ID"
          }
        },
        required: ["user_id"]
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_current_user") {
    const { user_id } = request.params.arguments;
    
    // Replace this with a real database call, API call, etc.
    const user = { id: user_id, name: "Jane Smith", role: "Engineering Manager" };
    
    return {
      content: [{ type: "text", text: JSON.stringify(user, null, 2) }]
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

Register it in `~/.claude/claude.json`:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/server.mjs"]
    }
  }
}
```

---

## Real-World Example: CRM MCP Server

Expose your CRM contacts to Claude Code:

```javascript
// crm-server.mjs — Expose contacts, deals and notes to Claude Code
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import Database from "better-sqlite3";

const db = new Database(process.env.CRM_DB_PATH || "./crm.db");

const server = new Server(
  { name: "crm-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_contacts",
      description: "Search CRM contacts by name, email, company or tag.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search term" },
          limit: { type: "number", description: "Max results (default 10)" }
        },
        required: ["query"]
      }
    },
    {
      name: "get_contact_history",
      description: "Get the full interaction history for a contact including emails, calls and notes.",
      inputSchema: {
        type: "object",
        properties: {
          contact_id: { type: "string" }
        },
        required: ["contact_id"]
      }
    },
    {
      name: "add_note",
      description: "Add a note to a contact's record.",
      inputSchema: {
        type: "object",
        properties: {
          contact_id: { type: "string" },
          note: { type: "string", description: "The note text" }
        },
        required: ["contact_id", "note"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === "search_contacts") {
    const limit = args.limit || 10;
    const results = db.prepare(
      `SELECT id, name, email, company, tags 
       FROM contacts 
       WHERE name LIKE ? OR email LIKE ? OR company LIKE ?
       LIMIT ?`
    ).all(`%${args.query}%`, `%${args.query}%`, `%${args.query}%`, limit);
    
    return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
  }
  
  if (name === "get_contact_history") {
    const contact = db.prepare("SELECT * FROM contacts WHERE id = ?").get(args.contact_id);
    const history = db.prepare(
      "SELECT * FROM interactions WHERE contact_id = ? ORDER BY created_at DESC"
    ).all(args.contact_id);
    
    return { content: [{ type: "text", text: JSON.stringify({ contact, history }, null, 2) }] };
  }
  
  if (name === "add_note") {
    db.prepare(
      "INSERT INTO interactions (contact_id, type, content, created_at) VALUES (?, 'note', ?, datetime('now'))"
    ).run(args.contact_id, args.note);
    
    return { content: [{ type: "text", text: "Note added successfully." }] };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

Now Claude Code can search your CRM, read contact history and add notes — from within any coding session.

---

## Prompting Claude Code to Build an MCP Server

```
> Build a Node.js MCP server in mcp-servers/contacts-server.mjs that exposes 
  my contacts stored in contacts.json.

  Tools to implement:
  1. list_contacts() — returns all contacts
  2. get_contact(id: string) — returns one contact by ID
  3. search_contacts(query: string) — searches by name or email
  4. add_contact(name, email, company, notes) — adds a new contact and saves to contacts.json
  5. update_contact(id, updates) — updates specified fields of a contact

  Also provide the mcpServers config entry I need to add to ~/.claude/claude.json.
  Use the @modelcontextprotocol/sdk package. Include error handling for missing records.
```

---

## Resources and Prompts

Beyond tools, MCP servers can expose resources (readable data) and prompts (reusable templates):

```javascript
// Expose a resource — Claude can read this directly
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "crm://dashboard/summary",
      name: "CRM Dashboard Summary",
      description: "Current pipeline status, total contacts and recent activity",
      mimeType: "application/json"
    }
  ]
}));
```

```javascript
// Expose a reusable prompt template
server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: "outreach_email",
      description: "Draft a personalized outreach email for a contact",
      arguments: [
        { name: "contact_id", description: "The contact to write to", required: true }
      ]
    }
  ]
}));
```

---

Next module: [Advanced Patterns](../06-advanced-patterns/README.md)
