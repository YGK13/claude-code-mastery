# Skills and slash commands

Skills package a repeatable workflow (a checklist, a house style, a multi-step process) so Claude Code can run it the same way every time. You can run a skill yourself by typing `/skill-name`, and Claude can also load it on its own when your request matches the skill's `description`.

---

## What a skill is

A skill is a **folder** that contains a `SKILL.md` file:

```text
~/.claude/skills/commit/SKILL.md        # personal: available in all your projects
.claude/skills/commit/SKILL.md          # project: commit it so your team gets it too
```

The folder name becomes the command you type (`/commit`). A single loose file such as `~/.claude/skills/commit.md` is **not** a skill and never loads.

`SKILL.md` has two parts:

1. **YAML frontmatter** between `---` markers on the very first line. This tells Claude Code what the skill is and when to use it.
2. **Markdown instructions** that Claude follows when the skill runs.

Skills can:
- Run a sequence of tool calls
- Ask you questions before proceeding
- Bundle reference files and scripts in the same folder
- Enforce a specific process every time

> Custom commands and skills are now the same feature. A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`. Old command files keep working, but prefer skills for new work because they can hold supporting files.

---

## Anatomy of a skill

```markdown
---
name: skill-name
description: What the skill does and when to use it. Use when the user asks to X or Y. Not for Z.
---

## Steps

1. First, read the current state of the project
2. Then do X
3. Then check Y
4. Finally output the result

## Output format

Describe what the final output should look like.
```

The most useful frontmatter fields:

| Field | What it does |
|-------|--------------|
| `name` | Display name. Defaults to the folder name; keep them the same. |
| `description` | What the skill does and **when to use it**. Claude reads this to decide whether to load the skill. |
| `when_to_use` | Optional extra trigger phrases, appended to `description`. The two together are cut off at 1,536 characters in the skill listing. |
| `disable-model-invocation` | `true` means only you can run it with `/name`. Use for anything with side effects (commits, deploys, sending messages). |
| `user-invocable` | `false` hides it from the `/` menu so only Claude loads it (background knowledge). |
| `allowed-tools` | Tools Claude may use without asking during the turn you invoke the skill, for example `Bash(git add *) Bash(git commit *)`. |
| `argument-hint` | Autocomplete hint, for example `[issue-number]`. The arguments you type arrive as `$ARGUMENTS`. |
| `context` | `fork` runs the skill in a separate subagent context. |

Frontmatter is only read when the opening `---` is the file's first line. If the YAML doesn't parse, `/skill-name` still works but Claude can't match your `description`, so it never triggers on its own. Run `claude --debug` to see the parse error.

---

## Writing a description that triggers

The `description` is the single biggest lever on skill quality. In a normal session Claude only sees each skill's name and description; the full `SKILL.md` loads when the skill is invoked. So:

- **Lead with the use case.** "Creates a Conventional Commit from staged changes" beats "A helpful git utility".
- **Say when.** Include the words people actually type: "Use when the user asks to commit, write a commit message or wrap up their changes."
- **Say when not.** A "Not for ..." line stops a skill from firing on neighbouring requests.
- **Keep it short.** Long descriptions are truncated in the listing, and every installed skill's description costs context in every session.

If a skill fires too often, make the description narrower or add `disable-model-invocation: true`. If it never fires, ask Claude "What skills are available?" to confirm it loaded, then add the phrases you actually use.

---

## Creating your first skill

Here's a real skill that creates a well-structured commit. It has side effects, so it sets `disable-model-invocation: true`: it runs only when you type `/commit`.

```bash
mkdir -p ~/.claude/skills/commit
```

**File:** `~/.claude/skills/commit/SKILL.md`

```markdown
---
name: commit
description: Creates a git commit with a Conventional Commits message for the staged changes, after showing it to the user for confirmation.
disable-model-invocation: true
allowed-tools: Bash(git diff *) Bash(git status *)
---

## Steps

1. Run `git diff --staged` to see all staged changes
2. Analyze what changed: what files, what kind of change (feat/fix/refactor/docs/test/chore)
3. Write a commit message following Conventional Commits format:
   - First line: `type(scope): short description` (max 72 chars)
   - Blank line
   - Bullet points summarizing the key changes (3-5 bullets)
4. Show me the proposed commit message and ask for confirmation
5. Only after I confirm: run `git commit -m "..."`

## Commit types
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

Start a new Claude Code session and type `/commit`. Claude Code reads the staged diff, writes a Conventional Commit message, shows it to you and only commits after your confirmation. `allowed-tools` lets it read the diff without a permission prompt; the commit itself still asks.

---

## More useful skill examples

### `/new-component`: scaffold a new React component

**File:** `.claude/skills/new-component/SKILL.md`

```markdown
---
name: new-component
description: Scaffolds a new React component with a test file, following this project's conventions. Use when the user asks to create, add or scaffold a component.
argument-hint: "[ComponentName]"
---

## Steps

1. Component name is `$ARGUMENTS`. If empty, ask: "Component name? (PascalCase)"
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

### `/security-check`: OWASP security review

**File:** `.claude/skills/security-check/SKILL.md`

```markdown
---
name: security-check
description: Reviews the codebase for OWASP Top 10 vulnerabilities and outputs a severity-rated findings table. Use when the user asks for a security review, audit or vulnerability check.
---

## Steps

1. Search for SQL query string concatenation (SQL injection risk)
2. Check all API routes: are inputs validated before use?
3. Check for hardcoded secrets or API keys in any file
4. Check authentication: are protected routes actually protected?
5. Check for XSS: is user input ever rendered as raw HTML?
6. Check dependencies: run `npm audit` and report critical/high issues
7. Output a severity-rated report: CRITICAL / HIGH / MEDIUM / LOW for each finding

## Output format
Security findings in a table: | Severity | Location | Issue | Recommendation |
```

### `/standup`: draft a daily standup from git history

**File:** `~/.claude/skills/standup/SKILL.md`

```markdown
---
name: standup
description: Drafts a Yesterday / Today / Blockers standup message from the last 24 hours of git commits. Use when the user asks for a standup, daily update or status summary.
---

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

## Supporting files (progressive disclosure)

A skill folder can hold more than `SKILL.md`. Put long reference material in separate files and link to them from `SKILL.md`; Claude reads them only when the task needs them, so they don't cost context every time.

```text
release/
├── SKILL.md            # overview + steps (keep it under ~500 lines)
├── checklist.md        # detailed release checklist, loaded when needed
└── scripts/
    └── bump-version.sh # executed, not loaded into context
```

```markdown
## Additional resources

- For the full pre-release checklist, see [checklist.md](checklist.md)
- To bump the version, run `scripts/bump-version.sh`
```

---

## Team skills (project-level)

For skills that encode team process, store them in `.claude/skills/<name>/SKILL.md` in the repo. Anyone who clones the repo gets the skills automatically.

Good candidates for team skills:
- `/new-feature`: creates the branch, PR template and initial files according to team conventions
- `/release`: runs the team's specific release checklist
- `/db-migration`: scaffolds a new Drizzle migration with the correct format
- `/e2e-test`: creates a Playwright test file following team conventions

To share skills across many repos, package them as a plugin (`/plugin`) instead of copying folders around.

---

## Skill best practices

1. **Write the description first.** "What it does. Use when ... Not for ...". It decides whether the skill ever runs.
2. **Be explicit about output format.** If you want a table, say "format as a markdown table".
3. **Guard side effects.** Use `disable-model-invocation: true` and confirmation steps for anything that commits, pushes, deploys or sends.
4. **Reference existing code.** "Read the most recently modified file to match the style."
5. **Include edge case handling.** "If there are no staged changes, tell the user and stop."
6. **Keep each skill focused.** One skill, one job. Move long reference material into supporting files.

---

Next: [Context Management](./context-management.md)
