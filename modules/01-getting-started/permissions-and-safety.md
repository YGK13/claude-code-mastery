# Permissions and Safety

Claude Code can read files, write files, run commands and browse the web. Understanding how it decides what to do - and how you control that - keeps you in charge of your own codebase.

---

## The Three Permission Tiers

Claude Code uses three modes for tool execution:

### 1. Auto-approve (runs without asking)
Actions in your "allowed" list in `CLAUDE.md` or in global settings. Typically: reading files, running tests, running the dev server.

### 2. Prompt-for-approval (asks before running)
Anything not on the auto-approve list. Claude Code shows you the command and waits for you to press Enter or deny it.

### 3. Never (blocked entirely)
Some actions can be blocked outright via settings: pushing to certain branches, deleting certain files, calling external APIs, etc.

---

## What Claude Code Can Do By Default

Out of the box, without any configuration:

| Action | Default behavior |
|--------|-----------------|
| Read any file in the working directory | Auto (always) |
| Write/edit files in the working directory | Prompts first time, remembers choice |
| Run `npm`, `node`, `python` commands | Prompts for approval |
| Run `git` read commands (status, diff, log) | Auto |
| Run `git commit`, `git push` | Prompts for approval |
| Delete files | Prompts for approval |
| Make HTTP requests | Prompts for approval |
| Install packages | Prompts for approval |

---

## Understanding the Prompt Dialog

When Claude Code needs approval to run a command, it shows:

```
Claude wants to run:
  npm install axios

Allow? [y/n/always/never]
```

Your options:
- **y** - allow this one time
- **n** - deny this one time
- **always** - add to auto-approve list for this session
- **never** - block this command for this session

---

## Global Safety Settings

You can set global permissions in `~/.claude/settings.json` (created automatically):

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(npm test)",
      "Bash(git status)",
      "Bash(git diff*)",
      "Bash(git log*)"
    ],
    "deny": [
      "Bash(git push --force*)",
      "Bash(rm -rf*)"
    ]
  }
}
```

The `allow` and `deny` arrays use glob patterns. The asterisk matches anything.

---

## Project-Level Settings

For project-specific rules, use `.claude/settings.json` in your project root:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev)",
      "Bash(npx drizzle-kit generate)"
    ],
    "deny": [
      "Bash(npx drizzle-kit push)"
    ]
  }
}
```

Project settings override global settings for commands that match both.

---

## The Hooks System

Hooks let you run shell commands automatically before or after Claude Code actions. This is covered in depth in Module 04, but here's the concept:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "npm run lint -- --fix" }
        ]
      }
    ]
  }
}
```

This example automatically runs ESLint after every file write. Hooks are powerful for enforcing code quality without thinking about it.

---

## What Claude Code Cannot Do

Some things are architecturally impossible regardless of permissions:

- It cannot access files outside your working directory (without explicit `--dangerously-skip-permissions` flag, which you should never use)
- It cannot read your environment variables unless you explicitly pass them
- It cannot send arbitrary network requests from within the secure sandbox
- It cannot run as root or escalate privileges

---

## A Word on Trust

Claude Code is a tool that executes code on your machine. The same caution you'd apply to any automated script applies here:

- Don't run `claude` as root or with sudo
- Keep your `ANTHROPIC_API_KEY` secret - it's your billing credential
- Review unfamiliar commands before approving them
- Use the `deny` list for destructive operations on important projects

Claude Code will tell you what it's doing before it does it. That transparency is your main safety mechanism - use it.

---

## Recovering from Mistakes

Claude Code makes mistakes sometimes. Here's how to recover:

**Claude edited a file incorrectly:**
```bash
git diff   # see what changed
git checkout -- filename.js   # restore one file
git checkout -- .   # restore all changed files
```

**Claude deleted a file:**
```bash
git checkout -- deleted-file.js   # only works if the file was tracked by git
```

**Claude installed a package you didn't want:**
```bash
npm uninstall package-name
```

**Claude made multiple changes you want to undo:**
```bash
git stash   # stash all uncommitted changes
```

This is another reason to use git from day one in every project: it's your undo button for everything Claude Code does.

---

Next module: [Building Web Apps](../02-building-web-apps/README.md)
