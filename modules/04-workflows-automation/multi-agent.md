# Multi-Agent Coordination

Claude Code can spawn multiple agent instances and coordinate them. This is how you scale beyond what a single context window can handle.

---

## When to Use Multiple Agents

Single agent is fine for: editing a component, writing a function, debugging a specific error.

Multiple agents make sense when:
- Tasks are independent and can run in parallel
- The total work exceeds a single context window (~180K tokens)
- Different parts of the work need different expertise
- You want a "review" step separate from the "build" step

---

## The `--print` Flag

Running Claude Code with `--print` (non-interactive mode) makes it automatable:

```bash
# Single non-interactive task
echo "Add JSDoc comments to all functions in src/utils.ts" | claude --print

# Pass a file as context
cat src/components/Dashboard.tsx | claude --print "Identify all performance issues in this component"

# Save output to a file
echo "Write a test suite for src/auth.ts" | claude --print > tests/auth.test.ts
```

`--print` mode: Claude runs the task, outputs the result, exits. No interactive prompt.

---

## Parallel Agents in Bash

Use background processes to run agents in parallel:

```bash
#!/bin/bash
# parallel_review.sh - Run three review agents simultaneously

echo "Starting parallel review..."

# Launch three agents in the background
echo "Review for security vulnerabilities" | claude --print > /tmp/security-review.txt &
PID1=$!

echo "Review for performance issues" | claude --print > /tmp/perf-review.txt &
PID2=$!

echo "Review for accessibility issues in components/" | claude --print > /tmp/a11y-review.txt &
PID3=$!

# Wait for all three to finish
wait $PID1 $PID2 $PID3

# Combine results
echo "=== SECURITY ===" >> review-report.md
cat /tmp/security-review.txt >> review-report.md
echo "=== PERFORMANCE ===" >> review-report.md
cat /tmp/perf-review.txt >> review-report.md
echo "=== ACCESSIBILITY ===" >> review-report.md
cat /tmp/a11y-review.txt >> review-report.md

echo "Review complete. Results in review-report.md"
```

Three reviews running simultaneously - takes the same time as one.

---

## Orchestrator Pattern in Python

A Python script that manages agent workers:

```python
"""orchestrator.py - Spawns Claude Code subagents for each task."""
import subprocess
import concurrent.futures
import sys

def run_claude_task(prompt: str, output_file: str) -> tuple[str, bool]:
    """Run a Claude Code task and save output to a file."""
    try:
        result = subprocess.run(
            ["claude", "--print", prompt],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout per agent
        )
        if result.returncode == 0:
            with open(output_file, "w") as f:
                f.write(result.stdout)
            return output_file, True
        else:
            return f"Error: {result.stderr}", False
    except subprocess.TimeoutExpired:
        return f"Timeout: {prompt[:50]}...", False

def orchestrate(tasks: list[dict]) -> dict:
    """Run tasks in parallel, return results keyed by task name."""
    results = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = {
            executor.submit(run_claude_task, t["prompt"], t["output"]): t["name"]
            for t in tasks
        }
        for future in concurrent.futures.as_completed(futures):
            name = futures[future]
            output, success = future.result()
            results[name] = {"output": output, "success": success}
            status = "OK" if success else "FAILED"
            print(f"[{status}] {name}")
    return results

if __name__ == "__main__":
    tasks = [
        {
            "name": "security",
            "prompt": "Audit this codebase for OWASP Top 10 vulnerabilities. Be specific about file names and line numbers.",
            "output": "reports/security.md"
        },
        {
            "name": "tests",
            "prompt": "Write a comprehensive test suite for all functions in src/lib/. Save tests to tests/lib.test.ts",
            "output": "reports/test-summary.md"
        },
        {
            "name": "docs",
            "prompt": "Generate API documentation for all exported functions in src/. Format as Markdown.",
            "output": "docs/api.md"
        }
    ]

    print(f"Running {len(tasks)} agents in parallel...")
    results = orchestrate(tasks)

    success_count = sum(1 for r in results.values() if r["success"])
    print(f"\nDone: {success_count}/{len(tasks)} succeeded")
```

---

## Worktrees for Parallel Codebase Edits

When multiple agents need to edit the SAME codebase simultaneously, use git worktrees so they don't conflict:

```bash
# Create three isolated copies of the repo
git worktree add /tmp/feature-auth -b feature/auth
git worktree add /tmp/feature-search -b feature/search
git worktree add /tmp/feature-notifications -b feature/notifications

# Run agents on each worktree in parallel
(cd /tmp/feature-auth && echo "Implement authentication with Clerk" | claude --print) &
(cd /tmp/feature-search && echo "Implement full-text search with Algolia" | claude --print) &
(cd /tmp/feature-notifications && echo "Implement email notifications with Resend" | claude --print) &
wait

# Review and merge each branch
git checkout feature/auth && git log --oneline -5
```

Each agent works on its own branch, no conflicts.

---

## Progress Monitoring

Track what each agent is doing:

```bash
# Watch agent output files in real-time
tail -f /tmp/security-review.txt &
tail -f /tmp/perf-review.txt &

# Or use a simple progress indicator
while [ $(jobs -r | wc -l) -gt 0 ]; do
  echo "Running: $(jobs -r | wc -l) agents still working..."
  sleep 5
done
echo "All agents complete."
```

---

## Prompting Claude Code to Build an Orchestration System

```
> Build a Python script called orchestrate.py that runs multiple Claude Code
  agents in parallel for a code quality pipeline.

  The pipeline has 4 stages that run in this order:
  Stage 1 (parallel): security_audit, performance_review, accessibility_check
  Stage 2 (sequential, after Stage 1): fix_issues (reads all Stage 1 reports and fixes them)
  Stage 3 (parallel): run_tests, build_check
  Stage 4 (sequential, after Stage 3): generate_pr_description

  Each stage saves its output to reports/{stage_name}.md.
  The script should print progress as each agent completes.
  Abort the pipeline if any stage fails (exit code != 0).
  Accept a --dry-run flag that prints the plan without running anything.
```

---

Next: [CI/CD Integration](./cicd-integration.md)
