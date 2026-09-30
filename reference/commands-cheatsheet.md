# Claude Code Commands Cheatsheet

## CLI Startup

| Command | What it does |
|---------|-------------|
| `claude` | Start an interactive session in the current directory |
| `claude "prompt"` | Start a session with an initial prompt |
| `claude --print "prompt"` | Run non-interactively, print output and exit |
| `claude --model claude-opus-5-5` | Use a specific model (aliases like `opus` / `sonnet` also work) |
| `claude --dangerously-skip-permissions` | Skip all permission prompts (use with caution) |

## Slash Commands (in-session)

| Command | What it does |
|---------|-------------|
| `/help` | Show all available commands |
| `/status` | Show session info: model, token usage, working directory |
| `/cost` | Show token usage and estimated cost so far |
| `/clear` | Clear conversation history (files are NOT deleted) |
| `/compact` | Manually trigger context compaction (auto-compaction is on by default) |
| `/exit` or `/quit` | End the session |
| `/config` | Open configuration settings |
| `/mcp` | List connected MCP servers and their tools |
| `/memory` | Open your CLAUDE.md memory files for editing |

## Keyboard Shortcuts

| Shortcut | What it does |
|----------|-------------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit session |
| `↑ / ↓` | Navigate prompt history |
| `Tab` | Autocomplete file paths and slash commands |
| `Shift+Enter` | New line in prompt (without submitting) |

## Custom Skill Commands

These run when you have the matching skill folder, `~/.claude/skills/<name>/SKILL.md` (or `.claude/skills/<name>/SKILL.md` in the project):

| Command | Typical use |
|---------|------------|
| `/commit` | Create a conventional commit message from staged changes |
| `/review` | Staff engineer code review of changed files |
| `/qa` | Browser-based QA testing with Playwright |
| `/ship` | Full pre-ship checklist and PR creation |
| `/security-check` | OWASP Top 10 security audit |
| `/standup` | Draft standup from recent git commits |
| `/new-component` | Scaffold a new React component with test |

Install gstack for 30+ production-ready skills: see Module 06.

## MCP Commands

| Command | What it does |
|---------|-------------|
| `claude mcp add <name>` | Add an MCP server interactively |
| `claude mcp list` | List all configured MCP servers |
| `claude mcp remove <name>` | Remove an MCP server |
| `/mcp` (in-session) | Show connected servers and their tools |

## Settings File Locations

| File | Purpose |
|------|---------|
| `~/.claude/settings.json` | Global permissions, hooks, MCP |
| `.claude/settings.json` | Project-level overrides |
| `~/.claude/claude.json` | MCP server registrations |
| `~/.claude/skills/<name>/SKILL.md` | Global skill definitions |
| `.claude/skills/<name>/SKILL.md` | Project-specific skills |
| `CLAUDE.md` (project root) | Project configuration for Claude |
| `~/.claude/CLAUDE.md` | Global configuration |

## Useful One-Liners

```bash
# Quick code review of all changes since last commit
git diff HEAD | claude --print "Review these changes for bugs and issues"

# Generate tests for a specific file
cat src/auth.ts | claude --print "Write a comprehensive Jest test suite for this module"

# Explain a complex file
cat src/complex-module.ts | claude --print "Explain what this module does in plain English"

# Generate a commit message from staged changes
git diff --staged | claude --print "Write a conventional commit message for these changes"

# Audit for hardcoded secrets
claude --print "Search this entire codebase for hardcoded API keys, passwords or secrets"
```
