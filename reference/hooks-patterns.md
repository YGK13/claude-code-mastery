# Hooks Patterns Reference

All hooks go in `.claude/settings.json` (project) or `~/.claude/settings.json` (global).

## Full settings.json Structure

```json
{
  "permissions": {
    "allow": ["Bash(npm run dev)", "Bash(git status*)"],
    "deny": ["Bash(rm -rf*)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "TOOL_NAME_OR_PATTERN",
        "hooks": [
          { "type": "command", "command": "shell command here" }
        ]
      }
    ],
    "PostToolUse": [...],
    "Notification": [...],
    "Stop": [...]
  }
}
```

## Environment Variables Available in Hooks

| Variable | Available in | Contains |
|----------|-------------|---------|
| `$CLAUDE_TOOL_NAME` | Pre + Post | Tool name (Write, Bash, Read, etc.) |
| `$CLAUDE_TOOL_INPUT_FILE_PATH` | Pre + Post (Write/Read) | File path being written/read |
| `$CLAUDE_TOOL_INPUT_COMMAND` | Pre + Post (Bash) | Shell command being run |
| `$CLAUDE_SESSION_ID` | All | Unique session identifier |

## Production-Ready Hook Recipes

### 1. Auto-lint TypeScript/JavaScript on write
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE '\\.(ts|tsx|js|jsx)$'; then npx eslint --fix \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>&1 | head -20; fi"
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
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
      }]
    }]
  }
}
```

### 3. Run affected tests after writing test files
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q '\\.test\\.'; then npx jest \"$CLAUDE_TOOL_INPUT_FILE_PATH\" --passWithNoTests 2>&1 | tail -15; fi"
      }]
    }]
  }
}
```

### 4. Git checkpoint before file deletion
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash(rm*)",
      "hooks": [{
        "type": "command",
        "command": "git add -A && git stash -m \"pre-delete-$(date +%Y%m%d-%H%M%S)\" 2>&1 | head -5"
      }]
    }]
  }
}
```

### 5. Enforce no console.log before git commit
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash(git commit*)",
      "hooks": [{
        "type": "command",
        "command": "COUNT=$(git diff --staged | grep '+.*console\\.log' | grep -v '^\\.\\./\\|test\\.' | wc -l); if [ \"$COUNT\" -gt 0 ]; then echo \"BLOCKED: $COUNT console.log statements in staged changes. Remove before committing.\"; exit 1; fi"
      }]
    }]
  }
}
```
Exit code 1 blocks the tool from running.

### 6. Log all bash commands to a file
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo \"$(date -Iseconds) BASH: $CLAUDE_TOOL_INPUT_COMMAND\" >> .claude/command-log.txt"
      }]
    }]
  }
}
```

### 7. Notify on session end (Mac)
```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Task complete\" with title \"Claude Code\" sound name \"Glass\"'"
      }]
    }]
  }
}
```

### 8. Block pushes to main/master
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash(git push*main*)",
      "hooks": [{
        "type": "command",
        "command": "echo 'BLOCKED: Direct push to main is not allowed. Use a PR.'; exit 1"
      }]
    }]
  }
}
```

### 9. TypeScript type check after writing .ts files
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE '\\.tsx?$'; then npx tsc --noEmit 2>&1 | head -20; fi"
      }]
    }]
  }
}
```

### 10. Auto-run build check after writing config files
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE '(next\\.config|tsconfig|package\\.json)'; then npm run build 2>&1 | tail -10; fi"
      }]
    }]
  }
}
```

## Combining Multiple Hooks

Multiple hooks for the same event run in order:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true" },
          { "type": "command", "command": "npx eslint --fix \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>&1 | head -10" }
        ]
      }
    ]
  }
}
```

Prettier runs first (formats), then ESLint (fixes lint issues).

## Blocking vs. Non-blocking Hooks

- Exit code `0` (success) → hook output is shown, tool proceeds
- Exit code `1` (failure) → hook output is shown, **tool is blocked**

Use exit code 1 for safety gates. Use exit code 0 for informational hooks.
