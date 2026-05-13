# Installing MCP Servers

---

## Two Ways to Install

**Method 1: Claude Code CLI (easiest)**
```bash
claude mcp add <server-name>
```
Claude Code walks you through the setup interactively and writes the config for you.

**Method 2: Manual config** — edit `~/.claude/claude.json` directly.

---

## The Config File

MCP servers are registered in `~/.claude/claude.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourname"]
    }
  }
}
```

Every entry is: `command` to launch the server, `args` to pass to it, optional `env` for credentials.

---

## Top MCP Servers: Setup Instructions

### GitHub

What it can do: create issues and PRs, review code, search repos, manage branches.

```bash
# 1. Create a personal access token at github.com/settings/tokens
#    Scopes needed: repo, read:org

# 2. Add to ~/.claude/claude.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_yourtoken"
      }
    }
  }
}
```

Example usage:
```
> Create a GitHub issue: "Fix login redirect bug" — body should explain
  that users are redirected to /home instead of their intended URL after login.
  Add labels: bug, auth.
```

---

### Filesystem (broader file access)

What it can do: read and write files OUTSIDE your current working directory (Claude Code's normal scope).

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/Documents",
        "/Users/yourname/Desktop"
      ]
    }
  }
}
```

The path arguments specify which directories are accessible. Be conservative — only open what you need.

---

### Notion

What it can do: read and write Notion pages and databases, query database entries.

```bash
# 1. Create a Notion integration at notion.so/my-integrations
# 2. Share the pages/databases you want Claude to access with the integration
# 3. Copy the integration token (starts with secret_)

# Add to config:
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer secret_yourtoken\", \"Notion-Version\": \"2022-06-28\"}"
      }
    }
  }
}
```

Example usage:
```
> Read my "Project Status" Notion database and create a weekly summary email 
  of all tasks that are marked "In Progress" or "Blocked".
```

---

### Gmail (via Google MCP)

What it can do: search and read emails, send emails, manage labels.

```bash
claude mcp add gmail
# Follow the OAuth flow in your browser
```

Example usage:
```
> Search my Gmail for emails from investors@vcfirm.com in the last 30 days.
  Summarize each thread in one sentence and tell me if any need a reply.
```

---

### Slack

What it can do: read messages, post to channels, search history.

```bash
# 1. Create a Slack app at api.slack.com/apps
# 2. Add Bot Token Scopes: channels:read, chat:write, channels:history
# 3. Install app to workspace, copy Bot Token

{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-yourtoken",
        "SLACK_TEAM_ID": "T0XXXXXXX"
      }
    }
  }
}
```

---

## Project-Specific MCP Servers

To restrict which MCP servers are available in a specific project, add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "allowedServers": ["github", "filesystem"]
  }
}
```

This project will only see the GitHub and filesystem servers, even if more are configured globally.

---

## Verifying a Server is Connected

After adding a server, start a Claude Code session and check:
```
> /mcp
```

This lists all connected MCP servers and their available tools.

---

Next: [Building Custom MCP](./building-custom-mcp.md)
