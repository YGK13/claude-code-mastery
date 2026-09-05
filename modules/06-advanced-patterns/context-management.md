# Context Management

Claude Code has a large context window, but context management is still the skill that separates efficient users from frustrated ones. This lesson covers how to keep sessions productive from start to finish.

---

## How Context Works in Claude Code

Every Claude Code session maintains a conversation history: your prompts, Claude's responses, file contents it read and the outputs of commands it ran. This all fits within a context window.

The context window for Claude Sonnet is approximately 180,000 tokens (~135,000 words). It sounds enormous - and it is for most sessions. But a large codebase, many file reads and a long conversation can fill it.

When context fills up:
- Older parts of the conversation get compressed or dropped
- Claude may "forget" earlier context
- Responses may become less coherent or miss important constraints

---

## Signs Your Context Is Overloaded

- Claude repeats something it just did
- Claude ignores constraints from early in the session
- Claude writes code that conflicts with earlier code it wrote
- Responses become generic or less tailored to your codebase
- You see "compacting conversation" messages

---

## Strategy 1: CLAUDE.md as Persistent Memory

The most effective context management strategy: put everything important in `CLAUDE.md`. It's re-read at session start, not limited by context.

Anything that Claude needs to remember across sessions belongs in CLAUDE.md:
- Architecture decisions
- Naming conventions
- What's been implemented
- What's in progress
- Key constraints

When you find yourself re-explaining something in every session, it belongs in CLAUDE.md.

---

## Strategy 2: Fresh Sessions for Distinct Tasks

Don't do everything in one session. Each session should have one focused objective.

**Bad (one mega-session):**
1. Implement auth
2. Implement payments
3. Debug the dashboard
4. Write all tests
5. Set up CI/CD

**Good (five focused sessions):**
- Session 1: Implement auth
- Session 2: Implement payments
- Session 3: Debug the dashboard
- Session 4: Write all tests
- Session 5: Set up CI/CD

Starting fresh gives Claude a clean context to focus on the task at hand.

---

## Strategy 3: /clear for Subtask Boundaries

Within a session, use `/clear` when switching to a different subtask. It wipes the conversation history but keeps the files you've written.

```
# You just finished the auth implementation
> /clear

# Now start the payments work fresh
> Implement Stripe payments. Read the existing auth implementation in /lib/auth.ts
  first so you understand the pattern.
```

---

## Strategy 4: Scope Your Reads

When Claude Code reads files, their content fills the context. Guide it to read what's relevant:

```
# Too broad - reads everything
> Look at the codebase and understand how data flows

# Scoped - reads just what's needed
> Read only /lib/auth.ts and /app/api/auth/route.ts to understand
  the auth flow, then tell me where the session token is stored
```

---

## Strategy 5: Summarize Before Switching Topics

When you've done significant work and need to switch focus, ask Claude to summarize:

```
> Before we move on to the dashboard: write a brief summary of what we implemented
  in the auth module - what files were created, what patterns were used, and any
  important decisions made. Save it to .claude/session-notes/auth-summary.md
```

Later sessions can read that file instead of reconstructing the context from scratch.

---

## Strategy 6: The CLAUDE.md Journal

For multi-week projects, keep a running journal in CLAUDE.md under a `## Status` section:

```markdown
## Current Status

Last updated: 2026-05-13

### Completed
- Auth: Clerk integration, middleware protecting /dashboard/*, sign-in/sign-up pages
- Database: Neon + Drizzle, users/contacts/interactions tables
- API: CRUD routes for contacts at /api/contacts

### In Progress
- Dashboard: skeleton built, needs real data connected to charts

### Blockers
- Stripe webhook endpoint fails in dev (CORS issue with localhost)

### Next Steps
- Connect dashboard charts to /api/analytics
- Fix Stripe webhook CORS
- Add email notifications with Resend
```

At the start of each session: `> Read CLAUDE.md and tell me what we were working on.`

---

## Strategy 7: Auto-Compact

Claude Code has an `--auto-compact` flag that automatically summarizes older parts of the conversation to stay within context limits:

```bash
claude --auto-compact
```

This is useful for very long sessions, but don't use it as a substitute for the strategies above - it compresses context, which can lose nuance.

---

## The 80% Rule

If you're more than 80% through a productive session and hit a new subtask, it's almost always better to:
1. Save your current work (commit it)
2. Note what's next in CLAUDE.md
3. Start a fresh session for the new subtask

The cost of a fresh session is near zero. The cost of a degraded session is poor code quality and frustration.

---

Next: [The gstack Workflow](./gstack-workflow.md)
