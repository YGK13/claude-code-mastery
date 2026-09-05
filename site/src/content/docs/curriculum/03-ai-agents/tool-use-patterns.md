---
# generated from modules/03-ai-agents/tool-use-patterns.md by site/scripts/sync-content.mjs
title: "Tool Use Patterns"
description: "Tool use is the mechanism that transforms Claude from a chatbot into an agent that can act. This lesson covers the patterns you'll use in every real agent."
---

Tool use is the mechanism that transforms Claude from a chatbot into an agent that can act. This lesson covers the patterns you'll use in every real agent.

---

## Defining Good Tools

A tool definition has three parts: name, description and input schema. The description is the most important - it's what Claude reads to decide when to call the tool.

**Bad tool description:**
```python
{
    "name": "search",
    "description": "Search for something.",
    ...
}
```

**Good tool description:**
```python
{
    "name": "web_search",
    "description": """Search the web for current information about a topic.
    Use this when you need facts, news, prices, or any information that may have
    changed after your training cutoff. Returns a list of relevant results with
    titles, snippets and URLs.

    When to use: answering questions about current events, recent data,
    specific products or anything requiring up-to-date information.
    When NOT to use: general knowledge questions you can answer directly,
    mathematical calculations, or code generation.""",
    ...
}
```

A rich description with when-to-use and when-not-to-use guidance makes Claude much more reliable at choosing the right tool.

---

## Input Schema Patterns

### Required strings
```python
"input_schema": {
    "type": "object",
    "properties": {
        "query": {
            "type": "string",
            "description": "The search query. Be specific - include key terms and context."
        }
    },
    "required": ["query"]
}
```

### Optional parameters with defaults
```python
"input_schema": {
    "type": "object",
    "properties": {
        "query": {"type": "string", "description": "Search query"},
        "max_results": {
            "type": "integer",
            "description": "Maximum number of results to return. Default: 5. Max: 20.",
            "default": 5
        }
    },
    "required": ["query"]
}
```

### Enum values
```python
"input_schema": {
    "type": "object",
    "properties": {
        "status": {
            "type": "string",
            "enum": ["pending", "in_progress", "completed", "cancelled"],
            "description": "The new status for the task"
        }
    },
    "required": ["status"]
}
```

### Nested objects
```python
"input_schema": {
    "type": "object",
    "properties": {
        "contact": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "email": {"type": "string"},
                "phone": {"type": "string"}
            },
            "required": ["name", "email"]
        }
    },
    "required": ["contact"]
}
```

---

## Parallel Tool Calls

Claude can call multiple tools in one response. Handle this correctly:

```python
# Don't assume there's only one tool call per response
for block in response.content:
    if block.type == "tool_use":
        # Could be multiple blocks in one response
        result = execute_tool(block.name, block.input)
        tool_results.append({
            "type": "tool_result",
            "tool_use_id": block.id,
            "content": result
        })
```

---

## Error Handling in Tools

Never let a tool crash the agent. Return errors as strings:

```python
def web_search(query: str) -> str:
    try:
        response = requests.get(
            "https://serpapi.com/search",
            params={"q": query, "api_key": os.environ["SERPAPI_KEY"]},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        results = [
            f"{r['title']}: {r['snippet']} ({r['link']})"
            for r in data.get("organic_results", [])[:5]
        ]
        return "\n".join(results) if results else "No results found."
    except requests.Timeout:
        return "Error: Search timed out. Try a different query."
    except requests.HTTPError as e:
        return f"Error: Search API returned {e.response.status_code}"
    except Exception as e:
        return f"Error executing search: {str(e)}"
```

When a tool returns an error, Claude will see it, reason about it and either retry with different parameters or explain the problem to the user.

---

## Confirmation Before Destructive Actions

For tools that modify data, build a confirmation step into the tool:

```python
# Two-phase pattern: preview first, confirm then execute

TOOLS = [
    {
        "name": "preview_email",
        "description": "Preview an email before sending. Shows what would be sent without actually sending it.",
        ...
    },
    {
        "name": "send_email",
        "description": "Send an email. Only call this after the user has confirmed the email preview.",
        ...
    }
]
```

Or instruct Claude in the system prompt:
```
When using the send_email tool, always call preview_email first and ask
the user to confirm before sending.
```

---

## Tool Result Formatting

Format tool results so Claude can reason about them clearly. JSON is best for structured data:

```python
# Unstructured - hard for Claude to parse
return "John Smith john@example.com Manager Engineering 2021-03-15"

# Structured JSON - Claude parses this reliably
return json.dumps({
    "employee": {
        "name": "John Smith",
        "email": "john@example.com",
        "title": "Engineering Manager",
        "department": "Engineering",
        "start_date": "2021-03-15"
    }
}, indent=2)
```

---

## Streaming Tool Results

For long-running tools, stream intermediate updates back to the user:

```python
import sys

def long_running_analysis(data: str) -> str:
    print("Analyzing...", flush=True)  # visible in terminal during execution

    # Do the work
    result = expensive_analysis(data)

    return result
```

For a web app, use Server-Sent Events (SSE) to stream agent progress to the browser - Claude Code can implement this pattern for you:
```
> Add streaming to the agent so that tool execution progress is sent to the
  browser via SSE (text/event-stream). The user should see "Searching the web..."
  as each tool runs rather than waiting for the final result.
```

---

## Tool Chaining Patterns

Some tools are naturally chained. Design them to work together:

```
search_web → get_page_content → extract_key_facts → write_summary
```

You don't need to code the chain - Claude will chain them automatically if the tool descriptions make the relationship clear:

```python
{
    "name": "get_page_content",
    "description": """Fetches the full text content of a web page given its URL.
    Use this AFTER search_web when you need the complete article text rather than
    just the snippet. Returns plain text of the page content.""",
    ...
}
```

---

Next: [Agent Architecture](/curriculum/03-ai-agents/agent-architecture/)
