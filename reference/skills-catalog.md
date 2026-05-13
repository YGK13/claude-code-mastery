# Skills Catalog

A skills catalog is a directory of available slash commands for Claude Code. Install skills globally in `~/.claude/skills/` or per-project in `.claude/skills/`.

---

## How to Install a Skill

1. Create the file: `~/.claude/skills/skill-name.md`
2. Write the instructions (see [Module 06](../modules/06-advanced-patterns/skills-slash-commands.md))
3. In any Claude Code session, type `/skill-name`

---

## Built-in gstack Skills (install via gstack)

These come pre-built with gstack. See Module 06 for installation.

| Skill | Phase | What it does |
|-------|-------|-------------|
| `/office-hours` | Thinking | Product strategist — challenges premises, generates alternatives |
| `/plan-ceo-review` | Planning | Executive scope and strategic fit review |
| `/plan-eng-review` | Planning | Staff engineer technical design review |
| `/plan-design-review` | Planning | UX/design audit with 0-10 dimension ratings |
| `/design-consultation` | Planning | Complete design system creation |
| `/review` | Execution | Staff engineer code review with auto-fix |
| `/investigate` | Execution | Systematic root-cause debugging |
| `/design-review` | Execution | Design-code changes with atomic commits |
| `/qa` | Testing | QA with real browser + regression test generation |
| `/qa-only` | Testing | Report-only QA (no code changes) |
| `/browse` | Testing | Headless browser automation |
| `/ship` | Release | Full pre-ship checklist + PR creation |
| `/land-and-deploy` | Release | Merge + deploy + health verification |
| `/canary` | Release | SRE monitoring for errors and regressions |
| `/document-release` | Docs | Sync docs with code changes |
| `/retro` | Analysis | Weekly retrospective with per-person breakdown |
| `/cso` | Security | OWASP Top 10 + STRIDE threat modeling |
| `/benchmark` | Performance | Core Web Vitals before/after PRs |
| `/careful` | Safety | Warn before destructive commands |
| `/freeze` | Safety | Restrict edits to specified directory |
| `/guard` | Safety | Combined careful + freeze |
| `/unfreeze` | Safety | Remove edit restrictions |

---

## Community Skills to Build

These are high-value skills not in gstack. Build them for your workflow.

### `/commit`
Creates a Conventional Commit message from staged changes with confirmation before committing. One of the most-used daily skills.

### `/standup`
Reads recent git commits, extracts what was actually done and drafts a standup message in the format: Yesterday / Today / Blockers.

### `/new-component`
Scaffolds a new React component: creates the file, creates the test file, exports from the index. Reads existing components to match style.

### `/db-migration`
Creates a new database migration file with the correct format, timestamps and naming convention for your ORM.

### `/new-feature`
Creates a feature branch, scaffolds the files, updates CLAUDE.md status and creates a draft PR template.

### `/pr-description`
Reads all commits on the current branch, understands what changed and writes a comprehensive PR description with summary and test plan.

### `/env-check`
Verifies all environment variables in `.env.example` are present in `.env.local`. Reports any missing keys before you discover them at runtime.

### `/security-check`
OWASP Top 10 focused review of all staged changes. Outputs a severity-rated table of findings.

### `/deps-audit`
Runs `npm audit`, checks for outdated packages, identifies unused dependencies. Reports with priority ratings.

### `/onboard`
Walks a new team member through the codebase: architecture overview, key files to understand, how to run locally and what the main workflows are.

---

## Skill Template

Copy this to start a new skill:

```markdown
# skill-name

One-sentence description of what this skill does.

## When to Use
[Describe the trigger: "Use when you've finished a feature and want to review it"]

## Steps

1. [First action — be specific]
2. [Second action]
3. [Ask user for confirmation if needed]
4. [Final action]

## Output Format

[Describe what the user will see: a table, a list, a commit message, etc.]

## Edge Cases

- If [condition], do [alternative action]
- If there are no changes, tell the user and stop
```

---

## Skill Naming Conventions

- Use kebab-case: `/new-component` not `/newComponent`
- Use verb-noun pairs: `/create-feature`, `/review-security`, `/generate-tests`
- Keep names short — you'll type them often
- Namespace team skills with a prefix: `/team-deploy`, `/team-release`
