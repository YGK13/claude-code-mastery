---
title: Templates
description: Copy-paste starter templates — CLAUDE.md files, Python agent skeletons, HTML app boilerplates, Next.js project starters.
---

These are starter files you copy into your own project on day one. Each one represents a hundred hours of iteration distilled into something you can use immediately.

## The CLAUDE.md template

The single most leveraged file in any Claude Code project. Tells Claude your conventions, what it can run automatically, and what it must ask permission for.

```markdown
# CLAUDE.md — [Project Name]

## Project Overview
[2-3 sentences: what this is, who it's for, what it does]

## Tech Stack
[List key technologies and versions]

## Project Structure
[Key directories and their purpose]

## Coding Conventions
- [Naming conventions]
- No Oxford comma in user-facing strings
- [Other style rules]

## Allowed Commands
- Reading files
- npm run dev, npm run build, npm test

## Commands That Need Confirmation
- git commit, git push
- npm install
- File deletion

## Definition of Done
A feature is complete when:
- It works end-to-end in the browser
- The build passes (no errors)
- Loading and error states are handled
- Mobile layout works
```

Copy this, customize for your project, drop it at the root. Claude reads it on every session.

## Standalone HTML app boilerplate

For the single-file React-via-CDN apps in Module 02:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #f7f9fb; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function App() {
      return <div style={{padding: '2rem'}}>Hello, World!</div>;
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
```

Save as `index.html`, open in browser. That's it.

## Python agent skeleton

The minimum viable agent with tool use, from Module 03:

```python
"""agent.py — Bare-bones Claude agent with tools."""
import os
import anthropic

client = anthropic.Anthropic()
MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-5")  # one place to change the model

TOOLS = [
    {
        "name": "get_current_time",
        "description": "Returns the current date and time.",
        "input_schema": {"type": "object", "properties": {}, "required": []}
    }
]

def execute_tool(name, inputs):
    if name == "get_current_time":
        from datetime import datetime
        return datetime.now().isoformat()
    return f"Unknown tool: {name}"

def run(user_message):
    messages = [{"role": "user", "content": user_message}]
    while True:
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            tools=TOOLS,
            messages=messages
        )
        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })
            messages.append({"role": "user", "content": tool_results})
        else:
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return ""

if __name__ == "__main__":
    print(run("What time is it right now?"))
```

Run with `python agent.py`. Add tools as you need them.

## Next.js + Vercel project starter

```bash
npx create-next-app@latest my-app \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app
npm run dev
```

Then ask Claude to create a `CLAUDE.md` (see top of this page) and you're ready to build.

---

**More templates land here as the cohort produces them.** Production-tested, executive-appropriate, with real-world configurations.
