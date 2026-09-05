# The CLAUDE.md File

`CLAUDE.md` is a configuration file you place at the root of any project. It tells Claude Code how to behave in that specific project - your coding style, project structure, which commands to run automatically and which need confirmation, and any context Claude needs to understand what you're building.

It is the single most important file for making Claude Code feel like a teammate who already knows your codebase.

---

## Why You Need It

Without a `CLAUDE.md`, Claude Code has to infer everything from your codebase on every session. With it, you never have to re-explain:
- Your preferred naming conventions
- Which directories are which
- Which commands require your approval
- What the project is and who it's for
- What "done" looks like in your standards

---

## Basic Structure

```markdown
# CLAUDE.md - [Project Name]

## Project Overview
Brief description of what this is and what it does.

## Tech Stack
List the technologies, frameworks and key libraries.

## Project Structure
Document the key directories and what they contain.

## Coding Conventions
Your style rules: naming, patterns, what to avoid.

## Commands
What Claude Code can run automatically vs. what needs confirmation.
```

---

## A Real Example

Here's a production-grade `CLAUDE.md` for a Next.js project:

```markdown
# CLAUDE.md - MyApp

## Project Overview
MyApp is a B2B SaaS dashboard for HR teams. It shows employee analytics,
handles time-off requests and generates reports. Backend is Next.js API routes
with a Neon PostgreSQL database via Drizzle ORM.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Drizzle ORM
- Neon (PostgreSQL)
- Clerk (auth)
- Vercel (deployment)

## Project Structure
- /app              - Next.js App Router pages and layouts
- /app/api          - API routes (server-side only)
- /components       - Shared React components
- /components/ui    - shadcn/ui base components (do not modify)
- /lib              - Utility functions and server-side helpers
- /lib/db.ts        - Drizzle database client
- /lib/schema.ts    - Database schema definitions
- /hooks            - Custom React hooks
- /types            - TypeScript type definitions

## Coding Conventions
- TypeScript strict mode - no `any` types
- Component names: PascalCase
- File names: kebab-case
- All database queries go through /lib/db.ts - never query directly in components
- Use server components by default; add 'use client' only when needed
- No console.log in production code - use proper error handling
- All user-facing strings use the t() translation function

## Commands Claude Can Run Without Asking
- npm run dev
- npm run build
- npm run lint
- npx drizzle-kit generate
- git status, git diff, git log

## Commands That Require My Approval
- git commit
- git push
- npx drizzle-kit push (modifies database)
- npm install (installing new packages)
- Any file deletion

## What Good Looks Like
- Components are typed, handle loading and error states
- API routes validate input with Zod before touching the database
- UI matches the existing design - check /components/ui for existing components first
- No magic numbers - use named constants
```

---

## Global vs. Project CLAUDE.md

You can have a **global** `CLAUDE.md` that applies to every project, and a **project-level** one that overrides or extends it.

**Global location:** `~/.claude/CLAUDE.md` (Mac/Linux) or `%USERPROFILE%\.claude\CLAUDE.md` (Windows)

Put things in the global file that apply everywhere:
- Your name and general preferences
- Your preferred programming language conventions
- Global tool permissions
- Your communication style preferences

Put things in the project file that are specific to that codebase.

---

## The Permissions Section in Detail

This section is critical. It controls what Claude Code can do autonomously vs. what requires your explicit approval.

```markdown
## Commands Claude Can Run Without Asking
- Reading any file
- npm run dev
- npm test
- git status, git diff, git log

## Commands That Require Confirmation
- git commit
- git push
- npm install (any package install)
- Database migrations
- rm or delete operations
```

The rule of thumb: **reversible actions can be automatic, irreversible ones need confirmation.**

Running tests is reversible. Pushing to production is not. Installing a package modifies `package.json` and `node_modules` - that's significant. File deletion without a backup is irreversible.

---

## Telling Claude Code What "Done" Looks Like

One of the most powerful sections to add:

```markdown
## Definition of Done
A feature is complete when:
- It works end-to-end in the browser (not just in the console)
- The TypeScript build passes (npm run build shows no errors)
- The ESLint check passes (npm run lint shows no errors)
- Loading and error states are handled
- Mobile layout works at 375px width
```

Without this, Claude Code will stop when the code "looks right." With it, it runs the builds, fixes the errors and checks what you actually care about.

---

## Template to Copy

A minimal starting template for any project:

```markdown
# CLAUDE.md - [Project Name]

## Project Overview
[2-3 sentences: what this is, who it's for, what it does]

## Tech Stack
[List key technologies and versions]

## Project Structure
[Key directories and their purpose]

## Coding Conventions
- [Name your patterns - component naming, file naming, etc.]
- No Oxford comma in user-facing strings
- [Other style rules]

## Allowed Commands
- Reading files
- npm run dev, npm run build, npm test

## Commands That Need Confirmation
- git commit, git push
- npm install
- File deletion
```

Copy this, fill in the brackets and you're ready.

---

## Exercise

Create a `CLAUDE.md` for a project you're working on right now. Use the template above. Then start a Claude Code session in that project and ask:

```
> Read the CLAUDE.md file and tell me what you now know about this project
  and how you'll approach working in it.
```

Claude Code's response will show you exactly what it understood and what gaps exist in your CLAUDE.md.

---

Next: [Permissions and Safety](./permissions-and-safety.md)
