# CLAUDE.md — Claude Code Mastery Teaching Repo

This file configures how Claude Code behaves in this repo. It serves double duty:
it's a real working CLAUDE.md AND a teaching example of how to write one.

---

## Project Purpose

This is a teaching curriculum for Claude Code. When working in this repo:
- Keep all new content under the correct module directory
- Follow the existing file naming convention: `kebab-case.md`
- Code examples must be complete and runnable — no stubs or pseudocode
- All markdown headings use sentence case (not Title Case)
- No Oxford comma in prose

## Directory Map

```
modules/         -- Curriculum modules 01-06
templates/       -- Copy-paste starter templates
examples/        -- Complete runnable code examples
reference/       -- Quick-reference guides and cheatsheets
```

## Writing Style Rules

- Headings: use `##` for top-level sections within a file
- Code blocks: always include the language identifier (```python, ```html, ```bash)
- Every code example must run without modification (no placeholder values)
- Explain the WHY, not just the what

## Commands Allowed Without Confirmation

- Reading any file in this repo
- Writing .md files anywhere in this repo
- Running Node.js or Python scripts in the /examples directory
- Running `git status`, `git diff`, `git log`

## Commands That Require Confirmation

- `git push` or `git commit`
- Any npm install
- Any file deletion
