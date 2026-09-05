# Module 04 - Workflows and Automation

**Time estimate:** 3 hours
**Prerequisite:** [Module 01 - Getting Started](../01-getting-started/README.md)

---

## What This Module Covers

Claude Code becomes genuinely powerful when you automate it - running automatically when files change, before commits, after builds or on a schedule. This module covers the mechanisms that make that happen.

---

## Lessons

1. [The Hooks System](./hooks-system.md) - Trigger shell commands automatically based on Claude Code events
2. [Multi-Agent Coordination](./multi-agent.md) - Spawn and coordinate multiple Claude Code agents in parallel
3. [CI/CD Integration](./cicd-integration.md) - Use Claude Code in GitHub Actions and deployment pipelines

---

## The Three Automation Layers

```
Layer 1: Hooks
  Claude Code events → shell commands
  Example: after every file write → run linter automatically

Layer 2: Multi-Agent
  One agent → spawns specialized subagents → aggregates results
  Example: one orchestrator → spawns research + writer + reviewer in parallel

Layer 3: CI/CD
  Git push → Claude Code runs in GitHub Actions → reviews, tests, deploys
  Example: every PR → Claude Code reviews the diff → posts comments
```

---

## Quick Win: The Auto-Lint Hook

Add this to your project's `.claude/settings.json` right now:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --fix 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}
```

From now on, every file Claude Code writes gets auto-linted. No more lint errors building up silently.

---

## Exercise

After completing this module, set up a full automation pipeline for any project:

1. Add a PostToolUse hook that lints after every write
2. Add a PreToolUse hook that creates a git checkpoint before any dangerous command
3. Add a scheduled Claude Code session that runs every Monday morning and reviews what changed in the past week

---

## Next Module

[Module 05 - MCP Integrations](../05-mcp-integrations/README.md)
