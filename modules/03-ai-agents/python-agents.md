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
"""simple_agent.py - Bare bones Claude agent."""
import anthropic

client = anthropic.Anthropic()

def ask(question: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": question}]
    )
    return response.content[0].text

if __name__ == "__main__":
    answer = ask("What are the three most important AI developments of 2025?")
    print(answer)
```

This is useful for one-shot questions. But the real power comes from tools.

---

## Adding Tools

Tools let Claude take actions in the world. You define the tool, Claude decides when to call it, you execute it and return the result.

```python
"""agent_with_tools.py - Agent that can look things up."""
import anthropic
import json

client = anthropic.Anthropic()

# ============================================================
# Tool definitions - what Claude is allowed to do
# ============================================================

TOOLS = [
    {
        "name": "get_current_time",
        "description": "Returns the current date and time in ISO format.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "calculate",
        "description": "Evaluates a mathematical expression and returns the result.",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "A Python math expression like '2 ** 10' or '(14 * 3) / 2'"
                }
            },
            "required": ["expression"]
        }
    }
]

# ============================================================
# Tool implementations - what each tool actually does
# ============================================================

def get_current_time() -> str:
    from datetime import datetime
    return datetime.now().isoformat()

def calculate(expression: str) -> str:
    try:
        # Safe eval: only allows math operations
        result = eval(expression, {"__builtins__": {}}, {})
        return str(result)
    except Exception as e:
        return f"Error: {e}"

def execute_tool(name: str, inputs: dict) -> str:
    """Route tool calls to the correct implementation."""
    if name == "get_current_time":
        return get_current_time()
    elif name == "calculate":
        return calculate(inputs["expression"])
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
            model="claude-sonnet-4-6",
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
            # Loop continues - Claude will reason with the tool results

        else:
            # Claude is done - return the final text
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return ""

if __name__ == "__main__":
    result = run_agent("What time is it right now, and what is 2 to the power of 32?")
    print(result)
```

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
  Anthropic Python SDK (claude-sonnet-4-6 model).

  The agent should have two tools:
  1. web_search(query: str) - searches the web using the SerpAPI (use the
     SERPAPI_KEY environment variable) and returns the top 5 results as JSON
  2. summarize_text(text: str) - sends the text to Claude for summarization
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
"""conversation_agent.py - Stateful multi-turn agent."""

class ConversationAgent:
    def __init__(self, system_prompt: str):
        self.client = anthropic.Anthropic()
        self.messages = []
        self.system = system_prompt

    def chat(self, user_message: str) -> str:
        self.messages.append({"role": "user", "content": user_message})

        response = self.client.messages.create(
            model="claude-sonnet-4-6",
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
