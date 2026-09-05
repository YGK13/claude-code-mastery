"""
python-agent-template.py

Starter template for a Claude-powered AI agent using the Anthropic Python SDK.
Replace TOOL_NAME, AGENT_PURPOSE and the tool implementations with your own.

Usage:
    python python-agent-template.py "Your task or question here"

Requirements:
    pip install anthropic
    export ANTHROPIC_API_KEY=sk-ant-...
"""

import os
import sys
import json
import logging
import time
from typing import Any
import anthropic

# ============================================================
# LOGGING
# ============================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# ============================================================
# CONSTANTS
# ============================================================
MODEL = "claude-sonnet-4-6"
MAX_TOKENS = 4096
MAX_RETRIES = 3

SYSTEM_PROMPT = """You are a specialized assistant for [AGENT_PURPOSE].

Your capabilities:
- [Describe what tools you have and when to use them]
- [Be specific about what you can and cannot do]

Your constraints:
- [List any limits or rules the agent must follow]
- Always confirm before taking destructive actions
- If a task is outside your capabilities, say so clearly"""

# ============================================================
# TOOL DEFINITIONS
# ============================================================
# Each tool needs: name, description (detailed!), input_schema

TOOLS = [
    {
        "name": "example_tool",
        "description": """[Detailed description of what this tool does.
        Include: when to use it, what it returns, any important caveats.
        When to use: [specific scenarios]
        When NOT to use: [scenarios where a different tool is better]""",
        "input_schema": {
            "type": "object",
            "properties": {
                "input_param": {
                    "type": "string",
                    "description": "Description of this parameter"
                },
                "optional_param": {
                    "type": "integer",
                    "description": "Optional parameter with default value. Default: 10",
                    "default": 10
                }
            },
            "required": ["input_param"]
        }
    },
    # Add more tools here following the same pattern
]

# ============================================================
# TOOL IMPLEMENTATIONS
# Replace these with your actual tool logic
# ============================================================

def example_tool(input_param: str, optional_param: int = 10) -> str:
    """
    Implementation of example_tool.

    :param input_param: The main input for the tool
    :param optional_param: Optional integer parameter
    :return: JSON string with the result
    :raises: Returns error string on failure (never raises to caller)
    """
    try:
        # Replace this with actual logic: database call, API call, file read, etc.
        result = {"input": input_param, "processed": True, "count": optional_param}
        return json.dumps(result, indent=2)
    except Exception as e:
        logger.error(f"example_tool error: {e}")
        return f"Error: {str(e)}"


def execute_tool(name: str, inputs: dict[str, Any]) -> str:
    """
    Routes tool calls to the correct implementation.
    Never raises - returns error strings so Claude can handle them gracefully.
    """
    logger.info(f"Tool call: {name} | inputs: {json.dumps(inputs)}")
    start = time.time()

    try:
        if name == "example_tool":
            result = example_tool(
                input_param=inputs["input_param"],
                optional_param=inputs.get("optional_param", 10)
            )
        else:
            result = f"Error: Unknown tool '{name}'"
    except KeyError as e:
        result = f"Error: Missing required parameter {e}"
    except Exception as e:
        result = f"Error: Unexpected error in {name}: {str(e)}"

    elapsed = time.time() - start
    logger.info(f"Tool result: {name} | elapsed: {elapsed:.2f}s | len: {len(result)}")
    return result


# ============================================================
# ANTHROPIC CLIENT WITH RETRY
# ============================================================

def call_claude(client: anthropic.Anthropic, messages: list, **kwargs) -> Any:
    """
    Calls the Anthropic API with exponential backoff on rate limit errors.
    """
    for attempt in range(MAX_RETRIES):
        try:
            return client.messages.create(
                model=MODEL,
                max_tokens=MAX_TOKENS,
                system=SYSTEM_PROMPT,
                tools=TOOLS,
                messages=messages,
                **kwargs
            )
        except anthropic.RateLimitError:
            if attempt == MAX_RETRIES - 1:
                raise
            wait = 2 ** attempt
            logger.warning(f"Rate limited. Retrying in {wait}s ({attempt+1}/{MAX_RETRIES})")
            time.sleep(wait)
        except anthropic.APIStatusError as e:
            if e.status_code >= 500 and attempt < MAX_RETRIES - 1:
                time.sleep(2 ** attempt)
            else:
                raise


# ============================================================
# AGENT LOOP
# ============================================================

def run_agent(task: str) -> str:
    """
    Runs the agent loop until Claude produces a final text response.

    :param task: The user's task or question
    :return: Claude's final text response
    """
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    messages = [{"role": "user", "content": task}]

    logger.info(f"Starting agent | task: {task[:100]}...")

    while True:
        response = call_claude(client, messages)

        if response.stop_reason == "tool_use":
            # Add Claude's response (including tool call requests) to history
            messages.append({"role": "assistant", "content": response.content})

            # Execute all tool calls in this response
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })

            # Add tool results back and continue the loop
            messages.append({"role": "user", "content": tool_results})

        elif response.stop_reason == "end_turn":
            # Extract the final text response
            for block in response.content:
                if hasattr(block, "text"):
                    logger.info("Agent completed successfully")
                    return block.text
            return ""

        else:
            logger.warning(f"Unexpected stop_reason: {response.stop_reason}")
            return f"Agent stopped unexpectedly: {response.stop_reason}"


# ============================================================
# ENTRY POINT
# ============================================================

if __name__ == "__main__":
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY environment variable not set")
        sys.exit(1)

    if len(sys.argv) < 2:
        print("Usage: python python-agent-template.py \"Your task here\"")
        sys.exit(1)

    task = " ".join(sys.argv[1:])
    result = run_agent(task)
    print("\n" + "="*60)
    print(result)
