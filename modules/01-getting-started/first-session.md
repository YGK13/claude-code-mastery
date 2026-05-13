# Your First Session

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
> Create an HTML file called index.html that says "Hello, World!" with a button that 
  changes the text color each time it's clicked. Use vanilla JavaScript.
```

Claude Code will:
1. Think briefly (you'll see the model working)
2. Create `index.html` with the full code
3. Tell you what it did

Open `index.html` in your browser — it should work immediately.

---

## How Claude Code Actually Works

Claude Code is an **agentic coding tool**, not a chatbot. Key differences:

| Chatbot | Claude Code |
|---------|------------|
| Gives you code to copy | Writes code directly into your files |
| Requires you to run commands | Runs commands itself (with permission) |
| Stateless — forgets context | Reads your whole codebase before responding |
| You manage files | It manages files |

When you open a session, Claude Code reads your directory. It knows every file, every function, every dependency. When you ask it to "add a search bar," it finds the right component and edits the right file. You don't need to tell it where.

---

## Key Commands to Know

These are built-in commands, not prompts — prefix them with `/`:

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
> Add a login page
```

**Strong prompt:**
```
> Add a login page with an email + password form. Use the same Tailwind CSS 
  classes as the existing components in /components/. Validate the email format
  on the client side. On submit, POST to /api/auth/login. Show a loading spinner
  while the request is in flight and display errors inline below each field.
```

The strong prompt gives:
- What to build (login page with form)
- How to build it (match existing style)
- Specific behavior (validation, API endpoint, loading state, error display)

You don't need to know HOW to implement any of this. You just need to know WHAT you want.

---

## Your Second Prompt: Editing Existing Code

Staying in the same session:

```
> Add a dark mode toggle button to the top-right corner that switches between 
  light and dark backgrounds. Save the preference in localStorage so it persists 
  across page reloads.
```

Claude Code knows your existing file. It will add the toggle correctly without breaking what's already there.

---

## Reading vs. Editing Mode

Sometimes you want to understand your code without changing it. Use these patterns:

```
> Explain how the authentication flow works in this project
> What does the fetchUserData function do and when is it called?
> List all the API endpoints in this app and what each one does
```

Claude Code reads the codebase and gives you a clear explanation. No code is changed.

---

## When Claude Gets It Wrong

Claude Code is not perfect. When something doesn't work:

```
> That didn't work — the button is not visible on mobile. 
  The viewport is 375px wide. Fix the CSS so it's visible and tappable 
  on screens under 600px wide.
```

Be specific about what's wrong and what you see. "It doesn't work" is much less effective than "the button is not visible at 375px width."

---

## Session Continuity

Within a session, Claude Code remembers everything. Across sessions, it re-reads your files fresh — but it doesn't remember your conversation history.

This means:
- A `CLAUDE.md` file in your project is how you give Claude Code persistent instructions (covered in the next lesson)
- If you reference decisions from a previous session, paste the key context again

---

## Exercise

Before moving on, complete these three prompts in a fresh project:

1. `> Create a single HTML file with a calculator that handles +, -, * and /`
2. `> Add a history list below the calculator that shows the last 10 calculations`
3. `> Make the calculator keyboard-accessible — all operations should work with keyboard keys`

Each prompt should take about 30 seconds for Claude Code to complete.

---

Next: [The CLAUDE.md File](./claude-md-guide.md)
