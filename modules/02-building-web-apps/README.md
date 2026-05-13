# Module 02 — Building Web Apps

**Time estimate:** 4 hours  
**Prerequisite:** [Module 01 — Getting Started](../01-getting-started/README.md)

---

## What You Will Build

By the end of this module you will have built:
1. A full-featured standalone HTML app (React via CDN, zero build tools)
2. A Next.js web app deployed to Vercel
3. A data-driven dashboard with charts and filtering

---

## Why Two Approaches?

**Standalone HTML apps** (React via CDN) are the fastest way to build and share a working tool. Open the file in a browser — that's all it takes. No Node.js, no npm, no deployment. Perfect for internal tools, prototypes, one-off dashboards and learning exercises.

**Next.js apps** are production-grade. They support server-side rendering, API routes, databases, auth and deployment pipelines. Use Next.js when you're building something real that other people will use.

Claude Code is excellent at both. The difference is in how you prompt it.

---

## Lessons

1. [Standalone HTML Apps](./standalone-html-apps.md) — Build complete apps in a single file using React CDN
2. [Next.js Apps](./nextjs-apps.md) — Scaffold, build and deploy a full-stack Next.js app
3. [React Patterns](./react-patterns.md) — Component patterns, state management and data fetching that Claude Code handles best

---

## The Golden Rule of Web App Prompts

Tell Claude Code what the user will DO with the app, not just what the app IS.

**Weak:** `> Build a task manager`

**Strong:**
```
> Build a task manager where users can:
  - Add tasks with a title, optional due date and priority (High/Medium/Low)
  - Mark tasks complete (shows strikethrough, moves to bottom of list)
  - Filter by status (All / Active / Completed) and by priority
  - Delete tasks with a confirmation prompt
  - Persist everything in localStorage so tasks survive page refresh
  
  Use React via CDN (no build tools). Style it with clean CSS — white background,
  subtle shadows, the task list in a card. No external CSS libraries.
```

One well-written prompt produces a complete, working app. Five vague prompts produce five incomplete iterations.

---

## Exercise: Build These Three Apps

After completing the lessons, build these three apps to solidify your skills:

1. **Budget tracker** — Add income/expense entries, categorize them, show running balance. Persist in localStorage.
2. **Password strength checker** — Paste any password, see a strength score (weak/medium/strong/very strong), specific feedback on what to improve, entropy calculation.
3. **Countdown timer** — Set a title and target date, show days/hours/minutes/seconds remaining, ring when done.

Build each with a single Claude Code prompt. If your prompt is good enough, each one takes about 60 seconds.

---

## Next Module

[Module 03 — AI Agents](../03-ai-agents/README.md)
