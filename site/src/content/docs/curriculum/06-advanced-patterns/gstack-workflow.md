---
# generated from modules/06-advanced-patterns/gstack-workflow.md by site/scripts/sync-content.mjs
title: "The gstack Workflow"
description: "gstack is a collection of 30+ specialized slash command skills that implement a complete software engineering workflow — from product ideation to…"
---
gstack is a collection of 30+ specialized slash command skills that implement a complete software engineering workflow — from product ideation to deployment. Each skill is a specialized agent with a specific role.

---

## Installing gstack

```bash
# gstack uses Bun as its runtime
# Install Bun if you don't have it:
npm install -g bun

# Install gstack (installs to ~/.claude/skills/)
# Run this in any Claude Code session:
```

Or install it from source — gstack is open source by Garry Tan.

---

## The Full Sprint Workflow

### Phase 1: Thinking

**`/office-hours`** — Product strategist. Challenges your premises, generates alternatives, asks the hard questions.

Use it when: you have an idea but want to pressure-test it before building.

```
/office-hours
> I want to add AI-powered email drafting to my CRM. 
  Is this the right feature to build next?
```

The agent will challenge your assumptions, ask about user demand, suggest alternatives and help you write a clear product spec before any code is written.

---

**`/plan-ceo-review`** — Executive review. Scope and strategic fit.

Use it when: you have a spec and want a reality check on scope and priority.

---

### Phase 2: Planning

**`/plan-eng-review`** — Staff engineer review. Data flows, state machines, API design, test matrices.

Use it when: you're about to start implementation and want to lock the technical approach.

```
/plan-eng-review
> We're building email drafting: user selects a contact, 
  Claude generates a draft using contact history, 
  user edits and sends via Gmail MCP.
```

The agent produces: component breakdown, API endpoints, database schema changes, edge cases, suggested test cases.

---

**`/plan-design-review`** — Design auditor. Rates the UX design on 10 dimensions, identifies gaps.

Use it when: you have wireframes or a design mockup to review.

---

### Phase 3: Build

This is where you use Claude Code directly — not a skill. Build the feature based on the plan from `/plan-eng-review`.

One feature at a time. Commit frequently. Keep sessions focused.

---

### Phase 4: Review

**`/review`** — Staff engineer code review with auto-fix.

Use it when: you've finished a feature and want quality review before shipping.

```
/review
```

The agent reads all changed files, identifies bugs, security issues, missing error handling and style violations. It then auto-fixes what it can and reports what needs manual attention.

---

### Phase 5: Test

**`/qa`** — QA lead. Opens a real browser, tests the feature end-to-end, finds bugs and generates regression tests.

Use it when: the feature is implemented and needs browser testing.

```
/qa
> Test the email drafting feature: select a contact, 
  click Draft Email, verify the draft appears, edit it and send.
```

The agent uses Playwright to open your app, navigate through the feature, find edge cases and write regression tests so the bugs it finds never come back.

---

**`/qa-only`** — Same as `/qa` but report only, no code changes. Use for a pre-ship audit.

---

### Phase 6: Ship

**`/ship`** — Release engineer. Syncs, runs tests, checks coverage, opens a PR.

```
/ship
```

The agent: runs the full test suite, checks test coverage, audits for console.logs left in production code, verifies environment variables are documented, then opens a GitHub PR with a proper description.

---

**`/land-and-deploy`** — Merges the PR, deploys to production and verifies the deployment is healthy.

Use it when: the PR has been approved and is ready to merge.

---

### Phase 7: Monitor

**`/canary`** — SRE monitoring. Watches for console errors and performance regressions after deployment.

```
/canary
> Monitor the email drafting feature for the next 10 minutes 
  after deployment. Alert on any errors or performance degradation.
```

---

## Safety Skills

**`/careful`** — Adds a warning before any destructive command. Good to run at the start of sessions where you'll be modifying production config.

**`/freeze /path/to/dir`** — Restricts all edits to the specified directory. Claude Code can only edit that path.

**`/guard`** — Combines `/careful` and `/freeze`. Maximum safety for sensitive operations.

**`/unfreeze`** — Removes restrictions set by `/freeze`.

---

## The Minimal Daily Workflow

You don't have to use every skill every day. A practical daily workflow:

```
Morning: /office-hours (if exploring a new idea)
         → /plan-eng-review (if starting something new)

Build: claude (regular Claude Code session)

End of day: /review (code quality check)
            /commit (from your custom commit skill)
```

Weekly: `/qa` before shipping, `/ship` when ready to PR.

---

## Building Your Own gstack-Style Skills

Every team has process knowledge that lives in someone's head. Skills externalize it.

High-value skills to build for your team:
- `/onboard` — walks a new engineer through the codebase
- `/incident` — incident response runbook as a skill
- `/db-rollback` — database rollback procedure with safety checks
- `/performance` — profiles the app and identifies the slowest paths
- `/translate` — translates the app to a new locale following your i18n conventions

Build one skill a week. In a month, your team has a library of encoded best practices.

---

Congratulations — you've completed the full curriculum. You now have the foundation to build web apps, AI agents, automated workflows and custom tools using Claude Code. The next step is to build something real.
