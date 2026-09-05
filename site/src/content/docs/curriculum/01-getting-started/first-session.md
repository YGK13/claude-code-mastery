---
# generated from modules/01-getting-started/first-session.md by site/scripts/sync-content.mjs
title: "Your First Session"
description: "This lesson walks through a complete Claude Code session from start to finish so you know exactly what to expect."
---

This lesson walks through a complete Claude Code session from start to finish so you know exactly what to expect.

---

## Starting a Session

Navigate to any folder and type `claude`:

```bash
mkdir hello-world
cd hello-world
claude
```

Claude Code reads the current directory and opens an interactive prompt. It looks like this:

```
Claude Code v1.x.x
Working directory: /path/to/hello-world

> _
```

---

## Your First Prompt

Type this and press Enter:

```
> Create a single HTML file called weekly-status.html. It's a personal weekly
  status report generator. Inputs: a list of accomplishments (one per line), a
  list of blockers (one per line) and a list of next-week priorities. Output:
  a formatted, copy-paste-ready Monday-morning status email I can send to my
  boss or team. Include a "Copy to clipboard" button.
```

Claude Code will:
1. Think briefly (you'll see the model working)
2. Create `weekly-status.html` with the full code
3. Tell you what it did

Open `weekly-status.html` in your browser. Type some accomplishments. Hit "Generate." It works.

That's your first real piece of software, built in roughly 60 seconds. From now on, every Sunday night, you have a tool that takes the rambling notes in your head and produces a clean Monday-morning email.

---

## How Claude Code Actually Works

Claude Code is an **agentic coding tool**, not a chatbot. Key differences:

| Chatbot | Claude Code |
|---------|------------|
| Gives you code to copy | Writes code directly into your files |
| Requires you to run commands | Runs commands itself (with permission) |
| Stateless - forgets context | Reads your whole codebase before responding |
| You manage files | It manages files |

When you open a session, Claude Code reads your directory. It knows every file, every function, every dependency. When you ask it to "add a search bar," it finds the right component and edits the right file. You don't need to tell it where.

---

## Key Commands to Know

These are built-in commands, not prompts - prefix them with `/`:

| Command | What it does |
|---------|-------------|
| `/help` | Show all available commands |
| `/status` | Show current session info |
| `/clear` | Clear conversation history (keeps files) |
| `/exit` | End the session |
| `/cost` | Show token usage and cost so far |
| `/config` | Open configuration settings |

---

## How to Write Good Prompts

The quality of your output is directly proportional to the specificity of your prompt. Here's the pattern:

**Weak prompt:**
```
> Build me a CRM
```

**Strong prompt:**
```
> Build a single HTML file called contacts.html. It's a lightweight personal CRM.
  Each contact has: name, company, role, email, last-touched date, next-followup
  date, priority (high/medium/low) and a notes field. Display contacts as cards
  sorted by next-followup date (overdue items shown in red at top).
  Add filters by priority and a search box. Persist everything in localStorage.
  Add an "Export CSV" button. No login, no server, just one file I can email myself.
```

The strong prompt gives:
- What to build (personal CRM in a single HTML file)
- The data model (specific fields per contact)
- The behavior (sorting, filters, search, persistence)
- The output format (CSV export for portability)

You don't need to know HOW to implement any of this. You just need to know WHAT you want. Spending two minutes writing a precise prompt saves you twenty minutes of "no, not like that, try again."

---

## Your Second Prompt: Editing Existing Code

Staying in the same session (your `weekly-status.html` is still open in Claude's context):

```
> Add a "tone" dropdown at the top with three options: "Professional" (default),
  "Casual" and "Concise." The Generate button uses the selected tone to format
  the output differently - formal sentences for Professional, contractions and
  warmth for Casual, bullet-only for Concise. Default stays Professional.
```

Claude Code knows your existing file. It will add the dropdown and the tone logic correctly without breaking what's already there. You don't need to point it to anything - it already read the file when you started the session.

This is the fundamental superpower: **iterate in plain English, get back working software.**

---

## Reading vs. Editing Mode

Sometimes you want to understand a file (yours or someone else's) without changing anything. Drop a file into a folder, start a session and ask:

```
> Explain in plain English what this app does and who would use it
> Walk me through the data model - what does each field represent?
> What changes if I want to add a "tags" feature to each contact?
```

Claude Code reads the file (or whole folder) and explains. No code is touched. This is genuinely useful for understanding any codebase someone hands you - a vendor's proposal, an inherited tool, an open-source project you're evaluating.

---

## When Claude Gets It Wrong

Claude Code is not perfect. When something doesn't work:

```
> That didn't work. When I click Generate with only one accomplishment in the list,
  the output shows "undefined" instead of skipping the blockers section.
  The blockers section should only render if at least one blocker is entered.
```

Be specific about what's wrong and what you see. "It doesn't work" is much less effective than "when I click Generate with empty blockers, it shows 'undefined' instead of skipping the section." The more precisely you describe the failure, the more reliably Claude fixes it on the first try.

---

## Session Continuity

Within a session, Claude Code remembers everything. Across sessions, it re-reads your files fresh - but it doesn't remember your conversation history.

This means:
- A `CLAUDE.md` file in your project is how you give Claude Code persistent instructions (covered in the next lesson)
- If you reference decisions from a previous session, paste the key context again

---

## Exercise

Before moving on, complete these three prompts in a fresh project. Each one should produce a working executive-grade tool you can use the same day:

1. **Meeting prep card** - `> Create a single HTML file called meeting-prep.html. Input fields: meeting title, attendees (one per line), meeting goal and any context I paste in. Output: a one-page printable brief with: "What I want to walk out with," "Likely objections," "Three key questions to ask" and "Decisions needed." Use a clean print-ready layout.`

2. **Decision matrix** - `> Build decision-matrix.html. Lets me add options (rows) and criteria (columns), score each cell 1-10 with weighted criteria, and shows the weighted total per option with a ranked recommendation at the top. Persist in localStorage.`

3. **One-on-one tracker** - `> Build 1on1-tracker.html. For each direct report: their name, the date of our last 1:1, talking points for next 1:1 (notes I add throughout the week), what they're blocked on, what they need from me. Show all reports as cards, sorted by "next 1:1 overdue." Persist in localStorage.`

Each prompt should take Claude Code about 30-60 seconds. You'll have three working tools by the end of this lesson.

---

Next: [The CLAUDE.md File](/curriculum/01-getting-started/claude-md-guide/)
