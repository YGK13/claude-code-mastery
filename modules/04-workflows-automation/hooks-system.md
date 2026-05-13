# The Hooks System

Hooks let you run shell commands automatically in response to Claude Code events. They're the bridge between Claude Code's actions and your own tooling — linters, formatters, tests, notifications, git checkpoints and more.

---

## Hook Events

| Event | Fires when |
|-------|-----------|
| `PreToolUse` | Before Claude runs any tool |
| `PostToolUse` | After Claude runs any tool |
| `Notification` | When Claude sends a notification message |
| `Stop` | When Claude ends a session |

---

## Hook Configuration Location

Hooks live in `.claude/settings.json` within your project, or in `~/.claude/settings.json` for global hooks.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'File written'"
          }
        ]
      }
    ]
  }
}
```

---

## Matchers

The `matcher` field filters which tool events trigger the hook.

| Matcher | Triggers on |
|---------|------------|
| `"Write"` | Any file write |
| `"Bash"` | Any shell command |
| `"Read"` | Any file read |
| `"*"` | All tools |
| `"Bash(npm*)"` | Bash commands starting with `npm` |

---

## The 5 Most Useful Hooks

### 1. Auto-lint after every write

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
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

Every file Claude writes gets automatically linted and auto-fixed. ESLint errors never accumulate silently.

### 2. Auto-format with Prettier

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

The `$CLAUDE_TOOL_INPUT_FILE_PATH` environment variable holds the path of the file that was just written.

### 3. Git checkpoint before dangerous commands

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(rm*)",
        "hooks": [
          {
            "type": "command",
            "command": "git add -A && git stash -m 'pre-delete checkpoint $(date +%Y%m%d-%H%M%S)' 2>&1"
          }
        ]
      }
    ]
  }
}
```

Before any `rm` command, auto-stash everything to git. Easy to recover if something goes wrong.

### 4. Run tests after changing test files

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q '\\.test\\.'; then npm test -- --testPathPattern=\"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>&1 | tail -20; fi"
          }
        ]
      }
    ]
  }
}
```

Whenever Claude writes a `.test.` file, automatically run just that test file.

### 5. Notify when a session ends

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code session complete\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

On Mac, this sends a system notification when Claude finishes a long task. On Windows, use PowerShell's `New-BurntToastNotification` if you have the BurntToast module.

---

## Hook Context Variables

Hooks have access to these environment variables:

| Variable | Contains |
|----------|---------|
| `$CLAUDE_TOOL_NAME` | Name of the tool being called (Read, Write, Bash, etc.) |
| `$CLAUDE_TOOL_INPUT_FILE_PATH` | File path (for Read and Write tools) |
| `$CLAUDE_TOOL_INPUT_COMMAND` | Shell command (for Bash tool) |
| `$CLAUDE_SESSION_ID` | Unique ID for the current session |

---

## Combining Multiple Hooks

Stack multiple hooks for the same event:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --fix 2>&1 | head -10"
          },
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

Hooks in the array run in order, one after another.

---

## Prompting Claude Code to Set Up Hooks

```
> Add hooks to .claude/settings.json for this project:
  1. After every Write: run npm run lint -- --fix on the written file
  2. After every Write to a *.test.ts file: run the test with npm test
  3. Before any Bash command matching "git push*": run npm run build and 
     abort if the build fails (exit code 1)
  4. When the session stops: echo "Session complete at $(date)" >> .claude/session-log.txt
```

Claude Code will write the correct settings.json structure for all four hooks.

---

## Debugging Hooks

If a hook isn't firing, check:

1. JSON syntax in `settings.json` — a single missing comma breaks everything
2. The matcher string — `"Write"` not `"write"` (case sensitive)
3. Run the command manually in your terminal to make sure it works independently
4. Check `~/.claude/logs/` for hook execution logs

---

Next: [Multi-Agent Coordination](./multi-agent.md)
