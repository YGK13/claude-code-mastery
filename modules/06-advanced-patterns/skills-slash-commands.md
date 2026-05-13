# Skills and Slash Commands

Skills are reusable slash commands that package complex, multi-step workflows into a single command. They're Markdown files that tell Claude Code exactly what to do when you type `/skill-name`.

---

## What a Skill Is

A skill is a `.md` file stored in `~/.claude/skills/` (global) or `.claude/skills/` (project-specific). When you type `/skill-name`, Claude Code reads that file and executes the instructions in it.

Skills can:
- Run a sequence of tool calls
- Ask you questions before proceeding
- Spawn subagents in parallel
- Enforce a specific process every time

---

## Anatomy of a Skill File

```markdown
# skill-name

Brief description of what this skill does. This shows in /help.

## Steps

1. First, read the current state of the project
2. Then do X
3. Then check Y
4. Finally output the result

## Output Format

Describe what the final output should look like.
```

That's it. The instructions can be as detailed as you need.

---

## Creating Your First Skill

Here's a real skill that creates a PR-ready commit with a good message:

**File:** `~/.claude/skills/commit.md`

```markdown
# commit

Creates a git commit with a well-structured commit message for all staged changes.

## Steps

1. Run `git diff --staged` to see all staged changes
2. Analyze what changed: what files, what kind of change (feat/fix/refactor/docs/test/chore)
3. Write a commit message following Conventional Commits format:
   - First line: `type(scope): short description` (max 72 chars)
   - Blank line
   - Bullet points summarizing the key changes (3-5 bullets)
4. Show me the proposed commit message and ask for confirmation
5. Only after I confirm: run `git commit -m "..."`

## Commit Types
- feat: new feature
- fix: bug fix
- refactor: code restructuring without behavior change
- docs: documentation only
- test: adding or updating tests
- chore: build process, dependency updates, config

## Rules
- Never use --no-verify
- If there are no staged changes, tell me and stop
```

Now type `/commit` whenever you want a well-structured commit message. Claude Code reads the staged diff, writes a Conventional Commit message, shows it to you and only commits after your confirmation.

---

## More Useful Skill Examples

### `/new-component` — Scaffold a new React component

```markdown
# new-component

Creates a new React component following project conventions.

## Steps

1. Ask the user: "Component name? (PascalCase)"
2. Ask: "What does this component do? (1-2 sentences)"
3. Read the most recently modified component in /components/ to understand the style
4. Create the component file in /components/ComponentName.tsx
5. Create the test file in /components/__tests__/ComponentName.test.tsx
6. Export the component from /components/index.ts
7. Report what was created

## Standards
- TypeScript, functional component with hooks
- Props interface defined above the component
- Loading and error states if the component fetches data
- Basic test: renders without crashing + key interactions
```

### `/security-check` — OWASP security review

```markdown
# security-check

Reviews the codebase for OWASP Top 10 vulnerabilities.

## Steps

1. Search for SQL query string concatenation (SQL injection risk)
2. Check all API routes: are inputs validated before use?
3. Check for hardcoded secrets or API keys in any file
4. Check authentication: are protected routes actually protected?
5. Check for XSS: is user input ever rendered as raw HTML?
6. Check dependencies: run `npm audit` and report critical/high issues
7. Output a severity-rated report: CRITICAL / HIGH / MEDIUM / LOW for each finding

## Output Format
Security findings in a table: | Severity | Location | Issue | Recommendation |
```

### `/standup` — Draft a daily standup from git history

```markdown
# standup

Generates a daily standup message from recent git activity.

## Steps

1. Run `git log --oneline --since="24 hours ago" --author="$(git config user.email)"`
2. Read the diff of the most significant commits (`git show --stat`)
3. Draft a standup in this format:
   **Yesterday:** [what was actually completed based on commits]
   **Today:** [logical next steps based on what was in progress]
   **Blockers:** [ask me if there are any blockers I want to mention]
4. Show the draft and ask if I want to adjust anything before copying
```

---

## Team Skills (Project-Level)

For skills that encode team process, store them in `.claude/skills/` in the repo root. Anyone who clones the repo gets the skills automatically.

Good candidates for team skills:
- `/new-feature` — creates the branch, PR template and initial files according to team conventions
- `/release` — runs the team's specific release checklist
- `/db-migration` — scaffolds a new Drizzle migration with the correct format
- `/e2e-test` — creates a Playwright test file following team conventions

---

## Skill Best Practices

1. **Be explicit about output format** — if you want a table, say "format as a markdown table"
2. **Include confirmation steps for destructive actions** — "ask for confirmation before running git push"
3. **Reference existing code** — "read the most recently modified file to match the style"
4. **Include edge case handling** — "if there are no staged changes, tell the user and stop"
5. **Keep each skill focused** — one skill, one job. Don't build a 20-step mega-skill.

---

Next: [Context Management](./context-management.md)
