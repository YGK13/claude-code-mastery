# The Hooks System

Hooks let you run shell commands automatically in response to Claude Code events. They're the bridge between Claude Code's actions and your own tooling: linters, formatters, tests, notifications, guardrails and more. Unlike an instruction in CLAUDE.md, a hook always runs.

---

## Hook Events

| Event | Fires when |
|-------|-----------|
| `SessionStart` | A session starts or resumes (good for loading context) |
| `UserPromptSubmit` | You submit a prompt, before Claude processes it |
| `PreToolUse` | Before Claude runs a tool (can block the call) |
| `PostToolUse` | After a tool call succeeds |
| `Notification` | Claude Code sends a notification (for example, it needs your permission) |
| `Stop` | Claude finishes responding, **at the end of every turn** (not the end of the session) |
| `SubagentStop` | A subagent finishes |
| `PreCompact` | Before the context is compacted |
| `SessionEnd` | The session ends |

There are more events for advanced cases; the full list is in the [hooks reference](https://code.claude.com/docs/en/hooks).

---

## Hook Configuration Location

Hooks live in `.claude/settings.json` within your project, or in `~/.claude/settings.json` for global hooks. You can also view and edit them with the `/hooks` command inside a session.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'File changed'"
          }
        ]
      }
    ]
  }
}
```

---

## What a hook receives: JSON on stdin

Claude Code sends each hook a **JSON object on standard input**. There are no per-field environment variables such as `$CLAUDE_TOOL_INPUT_FILE_PATH`; read what you need from stdin, most easily with [`jq`](https://jqlang.org/) (`brew install jq`, `apt install jq` or `winget install jqlang.jq`).

A `PostToolUse` hook for a file edit receives something like:

```json
{
  "session_id": "abc123",
  "cwd": "/Users/you/my-project",
  "hook_event_name": "PostToolUse",
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/Users/you/my-project/src/app.ts",
    "old_string": "...",
    "new_string": "..."
  }
}
```

| Field | Contains |
|-------|---------|
| `hook_event_name` | The event, for example `PreToolUse` |
| `tool_name` | The tool being called (`Bash`, `Edit`, `Write`, `Read`, ...) on tool events |
| `tool_input.file_path` | File path for `Edit`, `Write` and `Read` |
| `tool_input.command` | Shell command for `Bash` |
| `session_id`, `cwd` | The session ID and working directory |
| `stop_hook_active` | On `Stop`: `true` if Claude is already continuing because a Stop hook blocked it |

Two environment variables are useful in commands: `$CLAUDE_PROJECT_DIR` (the project root, handy for referencing scripts in `.claude/hooks/`) and `$CLAUDE_CODE_REMOTE` (`"true"` in web sessions).

---

## Matchers

The `matcher` field filters by **tool name** (on tool events like `PreToolUse` and `PostToolUse`). It is case-sensitive.

| Matcher | Triggers on |
|---------|------------|
| `"Edit\|Write"` | File edits and new files (most file changes are `Edit`, so always include it) |
| `"Bash"` | Any shell command |
| `"Read"` | Any file read |
| `"mcp__github__.*"` | Every tool from the `github` MCP server (a regular expression) |
| `"*"`, `""` or omitted | All tools |

A matcher does **not** look at arguments: `"Bash(npm*)"` is permission-rule syntax, not a hook matcher. To run a hook only for some commands or files, either add an `if` field with a permission rule (for example `"if": "Bash(git push *)"`) or check `tool_input` inside your script.

---

## Exit codes: how a hook talks back

| Exit code | Meaning |
|-----------|---------|
| `0` | Success. The action proceeds. |
| `2` | Blocking error. On `PreToolUse` the tool call is **blocked** and your stderr is shown to Claude as the reason. On `Stop` Claude **keeps working** instead of stopping. On `PostToolUse` the tool already ran, so it can't be undone, but Claude sees your stderr. |
| anything else | Non-blocking error. The action proceeds and a hook error notice is shown. |

---

## The 5 Most Useful Hooks

### 1. Auto-lint after every edit

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --fix 2>&1 | head -30"
          }
        ]
      }
    ]
  }
}
```

Every file Claude edits or writes gets the linter run and auto-fixed. ESLint errors never accumulate silently.

### 2. Auto-format the changed file with Prettier

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I {} npx prettier --write '{}' 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

The hook reads the edited file's path from the JSON on stdin (`.tool_input.file_path`) and formats only that file.

### 3. Block destructive `rm -rf` commands

Save this script as `.claude/hooks/block-rm-rf.sh` and make it executable (`chmod +x .claude/hooks/block-rm-rf.sh`):

```bash
#!/bin/bash
# PreToolUse hook: refuse `rm -rf` style commands before they run.
command=$(jq -r '.tool_input.command // empty')

if echo "$command" | grep -Eq '(^|[;&|[:space:]])rm[[:space:]]+-[a-zA-Z]*[rR][a-zA-Z]*f|rm[[:space:]]+-[a-zA-Z]*f[a-zA-Z]*[rR]'; then
  echo "Blocked by hook: recursive force delete. Delete specific files instead, or ask the user to run it." >&2
  exit 2   # exit 2 = block the tool call; stderr is shown to Claude
fi

exit 0     # anything else goes through the normal permission flow
```

Register it:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-rm-rf.sh"
          }
        ]
      }
    ]
  }
}
```

A hook is a guardrail, not a security boundary. For hard rules, also add a `deny` rule in your permission settings. To undo Claude's file edits, use the built-in checkpoints: run `/rewind` (or press `Esc` twice with an empty prompt).

### 4. Run tests after changing test files

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "f=$(jq -r '.tool_input.file_path // empty'); if echo \"$f\" | grep -q '\\.test\\.'; then npm test -- \"$f\" 2>&1 | tail -20; fi"
          }
        ]
      }
    ]
  }
}
```

Whenever Claude edits or writes a `.test.` file, run just that test file.

### 5. Notify when Claude finishes responding

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code is waiting for you\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

`Stop` fires every time Claude finishes a response, so this pings you whenever a long task is done and Claude is waiting on you. On Windows, use PowerShell's `New-BurntToastNotification` if you have the BurntToast module.

---

## Stop hooks that keep Claude working

Because `Stop` runs at the end of each turn, it can also refuse to let Claude stop. This hook makes Claude keep going until the tests pass:

```bash
#!/bin/bash
# .claude/hooks/tests-must-pass.sh  (Stop hook)
input=$(cat)

# If we already sent Claude back once this turn, let it stop to avoid a loop.
if [ "$(echo "$input" | jq -r '.stop_hook_active')" = "true" ]; then
  exit 0
fi

if ! npm test >/dev/null 2>&1; then
  echo '{"decision": "block", "reason": "Tests are failing. Run npm test, fix the failures, then finish."}'
fi
exit 0
```

Printing `{"decision": "block", "reason": "..."}` (or exiting 2 with a message on stderr) sends Claude back to work with that reason. Always check `stop_hook_active` so the hook can't loop forever.

---

## Combining Multiple Hooks

Stack multiple hooks for the same event:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --fix 2>&1 | head -10"
          },
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I {} npx prettier --write '{}' 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

All matching hooks **run in parallel**, not one after another. If one step must follow another (format, then lint), put both in a single script.

---

## Prompting Claude Code to Set Up Hooks

```
> Add hooks to .claude/settings.json for this project:
  1. After every Edit or Write: run npm run lint -- --fix
  2. After every Edit or Write to a *.test.ts file: run that test with npm test
  3. Before any Bash command that runs "git push": run npm run build and
     block the push (exit code 2) if the build fails
  4. When Claude finishes responding: append "Turn complete at $(date)" to .claude/session-log.txt
  Hooks read the tool input as JSON from stdin; use jq.
```

Claude Code will write the correct settings.json structure for all four hooks.

---

## Debugging Hooks

If a hook isn't firing, check:

1. JSON syntax in `settings.json`: a single missing comma breaks everything
2. The matcher: it matches tool names (`"Edit|Write"`), is case sensitive (`"Write"` not `"write"`) and never includes arguments
3. Run `/hooks` in a session to see which hooks Claude Code actually loaded
4. Test the command on its own by piping sample JSON into it: `echo '{"tool_input":{"file_path":"src/app.ts"}}' | your-command`
5. Start Claude Code with `claude --debug` and read the hook log in `~/.claude/debug/<session-id>.txt`

---

Next: [Multi-Agent Coordination](./multi-agent.md)
