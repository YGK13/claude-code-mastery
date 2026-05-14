---
title: Agent Architecture
description: Part of 03-ai-agents in the PortLev Learn Claude Code curriculum.
---

# Agent Architecture

Knowing how to write a single agent is one thing. Knowing how to structure reliable, maintainable agent systems is another. This lesson covers the architectural patterns that separate production agents from prototype agents.

---

## Single Agent vs. Multi-Agent

**Single agent:** One LLM instance with a set of tools. Good for focused, well-defined tasks.

**Multi-agent:** Multiple LLM instances, each specialized for a role, coordinated by an orchestrator. Good for complex workflows with distinct phases.

Rule of thumb: start with a single agent. Move to multi-agent when the context window gets overloaded, the task has truly distinct phases, or you need parallel execution.

---

## The Orchestrator-Subagent Pattern

The most common multi-agent pattern:

```
User → Orchestrator Agent
           ↓
    ┌──────┼──────┐
    ↓      ↓      ↓
Research  Draft  Review
Agent    Agent   Agent
    ↓      ↓      ↓
    └──────┼──────┘
           ↓
    Final Result → User
```

The orchestrator receives the task and delegates to specialized subagents. Each subagent does one thing well.

```python
# Orchestrator prompt
ORCHESTRATOR_SYSTEM = """You are a research report orchestrator. 
For each research request:
1. Call the research_agent tool to gather information
2. Call the writing_agent tool to draft the report
3. Call the review_agent tool to check for accuracy and clarity
4. Return the final polished report

Do not do any research or writing yourself — delegate to the specialized agents."""
```

---

## State Management for Long-Running Agents

For agents that run over minutes or hours:

```python
import json
from pathlib import Path
from datetime import datetime

class PersistentAgent:
    """Agent that saves state to disk so it can resume after interruption."""
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.state_file = Path(f"agent_sessions/{session_id}.json")
        self.state = self._load_state()
    
    def _load_state(self) -> dict:
        if self.state_file.exists():
            return json.loads(self.state_file.read_text())
        return {"messages": [], "completed_steps": [], "created_at": datetime.now().isoformat()}
    
    def _save_state(self):
        self.state_file.parent.mkdir(exist_ok=True)
        self.state_file.write_text(json.dumps(self.state, indent=2))
    
    def run_step(self, step_name: str, fn):
        """Run a step only if it hasn't been completed yet (idempotent)."""
        if step_name in self.state["completed_steps"]:
            print(f"Skipping {step_name} (already completed)")
            return self.state.get(f"result_{step_name}")
        
        result = fn()
        self.state["completed_steps"].append(step_name)
        self.state[f"result_{step_name}"] = result
        self._save_state()
        return result
```

---

## Rate Limiting and Retry Logic

Production agents need retry logic with exponential backoff:

```python
import time
import anthropic
from anthropic import RateLimitError, APIStatusError

def call_with_retry(client: anthropic.Anthropic, max_retries: int = 3, **kwargs):
    """Call the Anthropic API with exponential backoff on rate limit errors."""
    for attempt in range(max_retries):
        try:
            return client.messages.create(**kwargs)
        except RateLimitError:
            if attempt == max_retries - 1:
                raise
            wait = 2 ** attempt  # 1s, 2s, 4s
            print(f"Rate limited. Waiting {wait}s before retry {attempt + 1}/{max_retries}")
            time.sleep(wait)
        except APIStatusError as e:
            if e.status_code >= 500 and attempt < max_retries - 1:
                # Server error — retry
                time.sleep(2 ** attempt)
            else:
                raise
```

---

## Token Budget Management

Large agents can burn through context windows. Manage it:

```python
def summarize_if_long(messages: list, client: anthropic.Anthropic, threshold: int = 50000) -> list:
    """Summarize conversation history when it gets too long."""
    # Estimate tokens (rough: 1 token ≈ 4 characters)
    total_chars = sum(
        len(str(m["content"])) for m in messages
    )
    
    if total_chars < threshold * 4:
        return messages
    
    # Summarize the older messages, keep the last few
    to_summarize = messages[:-4]  # keep last 4 exchanges
    keep = messages[-4:]
    
    summary_response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # cheap model for summarization
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": f"Summarize this conversation history concisely:\n\n{json.dumps(to_summarize)}"
            }
        ]
    )
    
    summary = summary_response.content[0].text
    return [{"role": "user", "content": f"[Prior conversation summary: {summary}]"}] + keep
```

---

## Testing Agents

Agents are hard to unit test because they're non-deterministic. Use a layered approach:

**Layer 1: Test individual tools** (fully deterministic)
```python
def test_calculate_tool():
    assert calculate("2 + 2") == "4"
    assert calculate("invalid expr") == "Error: ..."
```

**Layer 2: Test tool routing** (mock the API)
```python
def test_agent_calls_correct_tool():
    # Use the Anthropic SDK's mock client
    with anthropic.mock() as m:
        m.messages.create.return_value = mock_tool_use_response("web_search", {"query": "test"})
        agent.run("What's in the news today?")
        assert m.messages.create.called
```

**Layer 3: Integration tests** (real API, real tools, low frequency)
```python
def test_research_agent_end_to_end():
    result = run_agent("What is the capital of France?")
    assert "Paris" in result
```

---

## Logging and Observability

Always log tool calls and responses in production:

```python
import logging

logger = logging.getLogger(__name__)

def execute_tool_with_logging(name: str, inputs: dict) -> str:
    logger.info(f"Tool call: {name} | inputs: {json.dumps(inputs)}")
    start = time.time()
    result = execute_tool(name, inputs)
    elapsed = time.time() - start
    logger.info(f"Tool result: {name} | elapsed: {elapsed:.2f}s | result_length: {len(result)}")
    return result
```

---

## Prompting Claude Code to Build a Production Agent

```
> Build a Python agent in agents/email_drafter.py that drafts cold outreach emails.

  The agent should have these tools:
  1. lookup_contact(name: str) — looks up a contact in contacts.json and returns their info
  2. get_email_templates() — reads templates from /templates/ and returns a list of templates
  3. draft_email(contact_id: str, template_name: str, customizations: dict) — drafts an email
  4. save_draft(contact_id: str, subject: str, body: str) — saves the draft to drafts/

  Architecture:
  - PersistentAgent class that saves session state to agent_sessions/
  - RetryableClient that wraps the Anthropic client with exponential backoff
  - Logging to logs/email_drafter.log
  - Type hints on every function
  - Full docstrings

  The agent accepts a contact name as input and produces a ready-to-send email draft.
  Run with: python agents/email_drafter.py "John Smith at Acme Corp"
```

---

Next module: [Workflows and Automation](../04-workflows-automation/README.md)
