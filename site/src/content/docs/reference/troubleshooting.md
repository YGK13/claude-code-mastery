---
# generated from reference/troubleshooting.md by site/scripts/sync-content.mjs
title: "Troubleshooting Guide"
description: "Fixes for the most common Claude Code problems: install and PATH errors, API key issues, permission prompts, context overflow and MCP server failures."
---
## Installation Issues

### "command not found: claude" after `npm install -g`

npm's global bin directory isn't in your PATH.

```bash
# Find where npm installs global binaries
npm config get prefix
# Output: /usr/local  (or similar)

# Add /usr/local/bin to PATH in your shell profile
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

On Windows, npm's global bin is usually `%APPDATA%\npm` — add that to your system PATH.

### "Invalid API key" error

1. Check the key exists: `echo $ANTHROPIC_API_KEY` (should print the key)
2. Verify it hasn't expired in the [Anthropic console](https://console.anthropic.com/settings/keys)
3. Check for whitespace: `echo "$ANTHROPIC_API_KEY" | cat -A` (no `^M` or `$` with spaces)
4. Re-export: `export ANTHROPIC_API_KEY=sk-ant-...` (paste the key directly)

### Python agent: "ModuleNotFoundError: No module named 'anthropic'"

```bash
pip install anthropic
# or if you have multiple Python versions:
python3 -m pip install anthropic
```

---

## Session Issues

### Claude keeps forgetting context from earlier in the session

This means you've hit context limits. Strategies:

1. Add the forgotten context to `CLAUDE.md` — it's re-read every session
2. Use `/clear` to start a fresh context window for a new subtask
3. Start a new session — `claude` — for unrelated tasks
4. Use `--auto-compact` flag for long sessions

### Claude is editing the wrong file

Two causes:
1. You haven't specified the file clearly enough in your prompt
2. Claude is confused by multiple similar files

Fix:
```
> Edit ONLY the file at src/components/Sidebar.tsx — not any other file.
  Add a search bar at the top of the sidebar.
```

Always use the full relative path when precision matters.

### Claude keeps asking for permission for the same command

The command isn't in your `allow` list. Add it to `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(npm run dev)", "Bash(npm run build)"]
  }
}
```

Or type `always` when the permission prompt appears — it adds it for the current session.

### Claude stopped mid-task and isn't continuing

Press Enter on an empty prompt to nudge it, or type:
```
> Continue where you left off
```

If it seems confused about where it was:
```
> Summarize what you've done so far in this session, then continue with [next step]
```

---

## Code Quality Issues

### Claude is generating TypeScript errors

Tell it explicitly:
```
> The TypeScript build is failing. Run `npm run build` and fix all type errors.
  Do not use `any` types as a fix — use proper types or `unknown`.
```

### Claude keeps adding `console.log` statements

Add to `CLAUDE.md`:
```markdown
## Code Standards
- No console.log in production code — use proper error handling and logging
```

Or add the blocking hook from the hooks reference.

### Claude is not following my naming conventions

Make them explicit in `CLAUDE.md`. "Use descriptive names" is not actionable. This is:

```markdown
## Naming Conventions
- React components: PascalCase (UserCard, not userCard or user-card)
- Files: kebab-case (user-card.tsx, not UserCard.tsx)
- Variables and functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Database tables: snake_case (user_profiles, not userProfiles)
```

---

## MCP Issues

### MCP server shows as "disconnected"

1. Check the server is installed: `npx -y @modelcontextprotocol/server-github --version`
2. Verify the config path is correct in `~/.claude/claude.json`
3. Restart Claude Code — MCP servers connect at session start
4. Check the server's credentials are correct (API token, OAuth, etc.)
5. Run the server manually to see its error output:
   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_... npx -y @modelcontextprotocol/server-github
   ```

### `/mcp` shows the server but tools don't work

The server is connected but the tool call is failing. Check:
1. Do you have the right permissions/scopes on the credential?
2. Is the resource accessible? (e.g., Notion page shared with the integration?)
3. Run a minimal test: `> Use the [tool_name] tool with these minimal inputs: [...]`

---

## Performance Issues

### Sessions are very slow

1. Check your internet connection — Claude Code streams responses
2. Check the [Anthropic status page](https://status.anthropic.com) for outages
3. Switch to a faster model: `claude --model claude-haiku-4-5-20251001` (much faster, less capable)
4. Reduce context: use `/clear` to wipe history and re-read only necessary files

### Claude is reading too many files

Scope your prompts:
```
# Too broad (reads everything)
> Understand the codebase and add error handling

# Scoped (reads what's needed)
> Read ONLY src/api/users.ts and add try-catch error handling 
  that returns a 500 response with a JSON error body on failure
```

---

## Getting Help

- **Claude Code docs:** [code.claude.com/docs](https://code.claude.com/docs)
- **Community:** [github.com/anthropics/claude-code/discussions](https://github.com/anthropics/claude-code/discussions)
- **Bug reports:** [github.com/anthropics/claude-code/issues](https://github.com/anthropics/claude-code/issues)
- **Anthropic status:** [status.anthropic.com](https://status.anthropic.com)
