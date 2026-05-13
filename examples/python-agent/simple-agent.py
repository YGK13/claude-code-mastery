"""
simple-agent.py — A complete, runnable Claude agent example.

This agent can answer factual questions and do math.
Run it: python simple-agent.py "What is 2 to the power of 32?"

Requirements:
    pip install anthropic
    export ANTHROPIC_API_KEY=sk-ant-...
"""

import os
import sys
import json
import anthropic

# ============================================================
# TOOL DEFINITIONS
# ============================================================

TOOLS = [
    {
        "name": "calculate",
        "description": """Evaluates a Python math expression and returns the numeric result.
        Use this for any arithmetic, algebra, or mathematical computation.
        Examples: '2 ** 32', '(100 * 1.07) ** 5', 'sum([1,2,3,4,5])'
        Do NOT use for string operations or non-math expressions.""",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "A valid Python math expression"
                }
            },
            "required": ["expression"]
        }
    },
    {
        "name": "count_words",
        "description": """Counts the number of words in a given text string.
        Use when asked how many words are in a passage.""",
        "input_schema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "The text to count words in"
                }
            },
            "required": ["text"]
        }
    }
]

# ============================================================
# TOOL IMPLEMENTATIONS
# ============================================================

def calculate(expression: str) -> str:
    """Safely evaluates a math expression."""
    # Whitelist only math-safe names
    safe_names = {
        k: v for k, v in vars(__import__("math")).items()
        if not k.startswith("_")
    }
    safe_names["sum"] = sum
    safe_names["abs"] = abs
    safe_names["round"] = round
    safe_names["min"] = min
    safe_names["max"] = max
    try:
        result = eval(expression, {"__builtins__": {}}, safe_names)
        return str(result)
    except Exception as e:
        return f"Error evaluating '{expression}': {e}"


def count_words(text: str) -> str:
    """Counts words in text."""
    count = len(text.split())
    return f"{count} words"


def execute_tool(name: str, inputs: dict) -> str:
    """Routes a tool call to the correct function."""
    if name == "calculate":
        return calculate(inputs["expression"])
    elif name == "count_words":
        return count_words(inputs["text"])
    else:
        return f"Unknown tool: {name}"


# ============================================================
# AGENT LOOP
# ============================================================

def run_agent(question: str) -> str:
    """
    Runs the Claude agent loop until a final answer is produced.

    1. Send question + tools to Claude
    2. If Claude calls a tool: execute it, add result, repeat
    3. If Claude returns end_turn: return the text
    """
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    messages = [{"role": "user", "content": question}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            tools=TOOLS,
            messages=messages
        )

        if response.stop_reason == "tool_use":
            # Claude wants to call a tool — add its response to history
            messages.append({"role": "assistant", "content": response.content})

            # Execute each tool call and collect results
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    print(f"  [tool] {block.name}({json.dumps(block.input)}) → {result}")
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })

            # Feed results back and continue
            messages.append({"role": "user", "content": tool_results})

        else:
            # Claude is done — extract the final text
            for block in response.content:
                if hasattr(block, "text"):
                    return block.text
            return "(no response)"


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: set ANTHROPIC_API_KEY first")
        sys.exit(1)

    if len(sys.argv) < 2:
        print('Usage: python simple-agent.py "Your question here"')
        sys.exit(1)

    question = " ".join(sys.argv[1:])
    print(f"Question: {question}\n")

    answer = run_agent(question)
    print(f"\nAnswer:\n{answer}")
