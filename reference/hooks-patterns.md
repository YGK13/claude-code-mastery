# Hooks Patterns Reference

All hooks go in `.claude/settings.json` (project) or `~/.claude/settings.json` (global). Run `/hooks` in a session to see what's loaded.

## Full settings.json Structure

```json
{
  "permissions": {
    "allow": ["Bash(npm run dev)", "Bash(git status *)"],
    "deny": ["Bash(rm -rf *)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "if": "Bash(git push *)", "command": "shell command here" }
        ]
      }
    ],
    "PostToolUse": [...],
    "Notification": [...],
    "Stop": [...]
  }
}
```

- `matcher` matches the **tool name**: `"Bash"`, `"Edit|Write"`, `"mcp__github__.*"`. It never contains arguments.
- `if` (optional) is a permission rule such as `"Bash(git commit *)"` or `"Edit(*.ts)"`; the hook only runs when the tool call matches it.

## Hook Input: JSON on stdin

Hooks do not get per-field environment variables. Claude Code writes a JSON object to the hook's **stdin**; read it with `jq`:

| Field | Available in | Contains |
|-------|-------------|---------|
| `.tool_name` | PreToolUse, PostToolUse | Tool name (`Bash`, `Edit`, `Write`, `Read`, ...) |
| `.tool_input.file_path` | Edit, Write, Read | File path being edited, written or read |
| `.tool_input.command` | Bash | Shell command being run |
| `.session_id`, `.cwd` | All | Session identifier and working directory |
| `.stop_hook_active` | Stop | `true` if Claude is already continuing because of a Stop hook |

`$CLAUDE_PROJECT_DIR` holds the project root, for referencing scripts such as `"$CLAUDE_PROJECT_DIR"/.claude/hooks/check.sh`.

## Production-Ready Hook Recipes

### 1. Auto-lint TypeScript/JavaScript on edit
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "f=$(jq -r '.tool_input.file_path // empty'); if echo \"$f\" | grep -qE '\\.(ts|tsx|js|jsx)$'; then npx eslint --fix \"$f\" 2>&1 | head -20; fi"
      }]
    }]
  }
}
```

### 2. Auto-format with Prettier
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs -I {} npx prettier --write '{}' 2>/dev/null || true"
      }]
    }]
  }
}
```

### 3. Run affected tests after editing test files
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "f=$(jq -r '.tool_input.file_path // empty'); if echo \"$f\" | grep -q '\\.test\\.'; then npx jest \"$f\" --passWithNoTests 2>&1 | tail -15; fi"
      }]
    }]
  }
}
```

### 4. Block recursive force deletes
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "if": "Bash(rm *)",
        "command": "if jq -r '.tool_input.command' | grep -Eq 'rm[[:space:]]+-[a-zA-Z]*([rR][a-zA-Z]*f|f[a-zA-Z]*[rR])'; then echo 'BLOCKED: recursive force delete. Remove specific files instead.' >&2; exit 2; fi"
      }]
    }]
  }
}
```
To undo file changes Claude made, use the built-in checkpoints (`/rewind`) rather than a git hook.

### 5. Enforce no console.log before git commit
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "if": "Bash(git commit *)",
        "command": "COUNT=$(git diff --staged | grep '^+.*console\\.log' | wc -l); if [ \"$COUNT\" -gt 0 ]; then echo \"BLOCKED: $COUNT console.log statements in staged changes. Remove before committing.\" >&2; exit 2; fi"
      }]
    }]
  }
}
```
Exit code 2 blocks the tool call, and the stderr message is shown to Claude.

### 6. Log all bash commands to a file
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo \"$(date -Iseconds) BASH: $(jq -r '.tool_input.command')\" >> .claude/command-log.txt"
      }]
    }]
  }
}
```

### 7. Notify when Claude finishes responding (Mac)
```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Claude is waiting for you\" with title \"Claude Code\" sound name \"Glass\"'"
      }]
    }]
  }
}
```
`Stop` fires at the end of **every response**, not at the end of the session (that's `SessionEnd`).

### 8. Block pushes to main/master
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "if": "Bash(git push *)",
        "command": "if jq -r '.tool_input.command' | grep -Eq '(main|master)([[:space:]]|$)'; then echo 'BLOCKED: Direct push to main is not allowed. Use a PR.' >&2; exit 2; fi"
      }]
    }]
  }
}
```

### 9. TypeScript type check after editing .ts files
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "f=$(jq -r '.tool_input.file_path // empty'); if echo \"$f\" | grep -qE '\\.tsx?$'; then npx tsc --noEmit 2>&1 | head -20; fi"
      }]
    }]
  }
}
```

### 10. Auto-run build check after editing config files
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "f=$(jq -r '.tool_input.file_path // empty'); if echo \"$f\" | grep -qE '(next\\.config|tsconfig|package\\.json)'; then npm run build 2>&1 | tail -10; fi"
      }]
    }]
  }
}
```

### 11. Keep working until tests pass (Stop hook)
```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "if [ \"$(jq -r '.stop_hook_active')\" != true ] && ! npm test >/dev/null 2>&1; then echo '{\"decision\": \"block\", \"reason\": \"Tests are failing. Fix them before finishing.\"}'; fi"
      }]
    }]
  }
}
```
`{"decision": "block", "reason": "..."}` sends Claude back to work. The `stop_hook_active` check stops it looping forever.

## Combining Multiple Hooks

Multiple matching hooks for the same event **run in parallel**:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "f=$(jq -r '.tool_input.file_path'); npx prettier --write \"$f\" 2>/dev/null && npx eslint --fix \"$f\" 2>&1 | head -10" }
        ]
      }
    ]
  }
}
```

When order matters (Prettier formats, then ESLint fixes), chain the steps inside one command as above instead of listing two hooks.

## Blocking vs. Non-blocking Hooks

- Exit code `0`: success, the tool proceeds
- Exit code `2`: **blocking**. On `PreToolUse` the tool call is blocked and stderr is shown to Claude; on `Stop` Claude keeps working
- Any other exit code (including `1`): non-blocking error, the tool **still runs**

Use exit code 2 for safety gates. For hard guarantees, pair a hook with a `deny` permission rule.
