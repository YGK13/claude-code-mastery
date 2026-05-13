# Module 03 — Building AI Agents

**Time estimate:** 4 hours  
**Prerequisite:** [Module 01 — Getting Started](../01-getting-started/README.md)

---

## What Is an AI Agent?

An AI agent is a program that uses a language model as its "brain" and gives it the ability to take actions: read files, search the web, call APIs, write emails, query databases, run code.

The LLM reasons about what to do. The agent framework handles the actions.

Claude Code is itself an AI agent. In this module, you'll build your own.

---

## What You Will Build

1. A simple Python agent that answers questions using Claude and can look up current information
2. A multi-tool agent that can read files, search the web and send emails
3. A specialized agent for a real use case (HR ticket router, email drafter or document summarizer)

---

## Lessons

1. [Python Agents](./python-agents.md) — Build agents with the Anthropic Python SDK
2. [Tool Use Patterns](./tool-use-patterns.md) — Define and call tools, handle tool results, chain tools together
3. [Agent Architecture](./agent-architecture.md) — Design patterns for reliable, production-grade agents

---

## The Mental Model

```
User prompt
    ↓
Claude (reasoning engine)
    ↓ "I should call the search tool"
Tool: search("latest GDP figures 2026")
    ↓ result
Claude (reasoning again)
    ↓ "I have the data, I'll now write the answer"
Final response
```

Claude decides WHAT to do. Your code defines HOW to do it. You never write decision logic — just the tools.

---

## Exercise: Your First Agent

After Module 03, build this agent:

```
> Build a Python agent that acts as a daily briefing assistant.
  
  It should:
  - Accept a topic as input (e.g., "AI in healthcare", "US interest rates")
  - Use a web search tool to find 3 recent articles on the topic
  - Use a summarize tool to extract the key point from each article
  - Output a formatted briefing: topic, date, 3 bullet-point summaries with sources
  
  Use the Anthropic Python SDK with tool use. One Python file, runnable from the command line.
  Accept the topic as a command-line argument: python briefing.py "AI in healthcare"
```

---

## Next Module

[Module 04 — Workflows and Automation](../04-workflows-automation/README.md)
