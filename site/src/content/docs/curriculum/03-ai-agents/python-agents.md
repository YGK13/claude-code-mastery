---
title: Python Agents
description: Part of 03-ai-agents in the PortLev Learn Claude Code curriculum.
---

# Python Agents

This lesson walks through building AI agents in Python using the Anthropic SDK. By the end you'll have a working agent that can reason and take actions.

---

## Setup

```bash
pip install anthropic
```

Set your API key:
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

---

## The Simplest Possible Agent

A "bare bones" agent: just Claude, no tools.

```python
"""simple_agent.py — Bare bones Claude agent."""
import os
import anthropic

client = anthropic.Anthropic()
MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-5")  # one place to change the model

def ask(question: str) -> str:
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": question}]
    )
    return response.content[0].text

if __name__ == "__main__":
    answer = ask("Draft a 3-bullet summary I can use to brief my board on AI's impact on HR strategy this quarter. Be specific.")
    print(answer)
```

This is useful for one-shot questions like board prep, talking-point generation or quick research. But the real power comes from giving the agent tools — letting it take actions in your world.

---

## Adding Tools

Tools let Claude take actions in the world. You define the tool, Claude decides when to call it, you execute it and return the result.

```python
"""prospect_agent.py — Executive research agent that looks up companies."""
import os
import anthropic
import json
import urllib.request
import urllib.parse

client = anthropic.Anthropic()
MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-5")

# ============================================================
# Tool definitions — what Claude is allowed to do
# ============================================================
# Two tools, both directly useful for executive research:
# 1. Look up basic company info (size, industry, recent news)
# 2. Look up a person's professional summary

TOOLS = [
    {
        "name": "lookup_company",
        "description": "Get key facts about a company by name: industry, headcount range, headquarters, recent funding or major news. Use this when you need quick context on a prospect, partner or competitor before a meeting.",
        "input_schema": {
            "type": "object",
            "properties": {
                "company_name": {
                    "type": "string",
                    "description": "The legal or commonly-known name of the company (e.g. 'Anthropic', 'Acme Corp')."
                }
            },
            "required": ["company_name"]
        }
    },
    {
        "name": "lookup_person",
        "description": "Get a professional summary of a person by name and company: current role, prior roles, notable background. Use this for meeting prep when you need to understand who you're talking to.",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string", "description": "Full name of the person."},
                "company": {"type": "string", "description": "Their current company, for disambiguation."}
            },
            "required": ["name", "company"]
        }
    }
]

# ============================================================
# Tool implementations — what each tool actually does
# ============================================================
# These are stubs that show the pattern. In production you'd connect them
# to your real data sources: Apollo, ZoomInfo, your CRM, Clearbit, etc.

def lookup_company(company_name: str) -> str:
    """In production: call your CRM, Clearbit, Apollo or LinkedIn API.
    For learning, this returns a sample structured response."""
    return json.dumps({
        "company": company_name,
        "industry": "[your data source returns this]",
        "headcount_range": "[your data source returns this]",
        "headquarters": "[your data source returns this]",
        "recent_news": "[your data source returns this]",
        "note": "Replace this stub with a real API call to Apollo, Clearbit, or your CRM."
    })

def lookup_person(name: str, company: str) -> str:
    """In production: call LinkedIn API, Apollo people-search, or your CRM."""
    return json.dumps({
        "name": name,
        "current_role": "[your data source returns this]",
        "company": company,
        "previous_roles": "[your data source returns this]",
        "education": "[your data source returns this]",
        "note": "Replace this stub with a real API call to LinkedIn Sales Navigator, Apollo, or similar."
    })

def execute_tool(name: str, inputs: dict) -> str:
    """Route tool calls to the correct implementation."""
    if name == "lookup_company":
        return lookup_company(inputs["company_name"])
    elif name == "lookup_person":
        return lookup_person(inputs["name"], inputs["company"])
    else:
        return f"Unknown tool: {name}"

# ============================================================
# The agent loop
# ============================================================

def run_agent(user_message: str) -> str:
    """Run the agent until it produces a final text response."""
    messages = [{"role": "user", "content": user_message}]
    
    while True:
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            tools=TOOLS,
            messages=messages
        )
        
        # If Claude wants to use a tool, execute it
        if response.stop_reason == "tool_use":
            # Add Claude's response (including the tool call) to history
            messages.append({"role": "assistant", "content": response.content})
            
            # Execute each tool call and collect results
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })
            
            # Add tool results back to the conversation
            messages.append({"role": "user", "content": tool_results})
            # Loop continues — Claude will reason with the tool results
            
        else:
            # Claude is done — return the final text
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return ""

if __name__ == "__main__":
    result = run_agent(
        "I have a meeting tomorrow with Sarah Chen at Acme Corp. "
        "Look up the company and the person, then write me a one-page meeting prep brief: "
        "company context, who Sarah is, three smart questions I can ask her, "
        "and the angle most likely to land."
    )
    print(result)
```

That single prompt drives the agent through: look up company → look up person → synthesize → produce a one-page brief. You did zero glue-code reasoning. Claude figured out the sequence from the tool descriptions alone.

---

## The Agent Loop Explained

The core pattern is always the same:

```
1. Send message + tool definitions to Claude
2. If Claude returns tool_use → execute the tool, add result, go to 1
3. If Claude returns end_turn → extract text, return it
```

This loop is the foundation of every agent. Everything else is just tools.

---

## Prompting Claude Code to Build an Agent

```
> Build a Python file called research_agent.py that is an AI agent using the 
  Anthropic Python SDK (claude-sonnet-5 model, kept in a MODEL constant).
  
  The agent should have two tools:
  1. web_search(query: str) — searches the web using the SerpAPI (use the 
     SERPAPI_KEY environment variable) and returns the top 5 results as JSON
  2. summarize_text(text: str) — sends the text to Claude for summarization 
     and returns a 3-sentence summary
  
  The agent should:
  - Accept a research question as a command-line argument
  - Use the tools to research the question
  - Return a formatted answer with key findings and sources cited
  
  Include full docstrings, type hints and error handling.
  The ANTHROPIC_API_KEY comes from the environment variable.
```

This prompt produces a complete, production-quality agent in one shot.

---

## Conversation State: Multi-Turn Agents

For an agent that maintains conversation history across multiple exchanges:

```python
"""conversation_agent.py — Stateful multi-turn agent."""

class ConversationAgent:
    def __init__(self, system_prompt: str):
        self.client = anthropic.Anthropic()
        self.messages = []
        self.system = system_prompt
    
    def chat(self, user_message: str) -> str:
        self.messages.append({"role": "user", "content": user_message})
        
        response = self.client.messages.create(
            model=MODEL,
            max_tokens=4096,
            system=self.system,
            tools=TOOLS,
            messages=self.messages
        )
        
        # Run the tool loop, then add final response to history
        final_response = self._run_tool_loop(response)
        self.messages.append({"role": "assistant", "content": final_response})
        return final_response
    
    def _run_tool_loop(self, response) -> str:
        # Same tool loop as before, returns the final text
        ...
```

---

## System Prompts

Every production agent needs a system prompt that defines its persona, constraints and behavior:

```python
SYSTEM_PROMPT = """You are a specialized HR assistant for Acme Corp.

Your capabilities:
- Look up employee information (use the get_employee tool)
- Check time-off balances (use the get_pto_balance tool)  
- Submit time-off requests (use the submit_pto_request tool)

Your constraints:
- Only provide information about the authenticated employee (employee_id will be provided)
- Never modify data without explicit confirmation
- If a request is outside your capabilities, say so clearly and provide the HR hotline number

Always be professional, concise and helpful."""
```

The system prompt is the "soul" of the agent. Spend time on it.

---

Next: [Tool Use Patterns](./tool-use-patterns.md)
