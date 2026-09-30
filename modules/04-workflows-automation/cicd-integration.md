# CI/CD Integration

Claude Code can run in GitHub Actions, giving you an AI code reviewer, automated documentation updater and quality gate that runs on every pull request.

---

## Claude Code in GitHub Actions

Use the official action, [`anthropics/claude-code-action@v1`](https://github.com/anthropics/claude-code-action). You don't install Node or Claude Code yourself; the action does it.

**Fastest setup:** open `claude` in your repository and run `/install-github-app`. It installs the Claude GitHub App, adds the `ANTHROPIC_API_KEY` secret and opens a pull request with a working workflow.

**Manual setup:** install the [Claude GitHub App](https://github.com/apps/claude), add `ANTHROPIC_API_KEY` to your repository secrets (Settings → Secrets and variables → Actions) and add a workflow file like the ones below. On a Claude subscription, use `claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}` (generate it with `claude setup-token`) instead of `anthropic_api_key`.

The action has two modes:
- **Interactive:** no `prompt` input. Claude responds when someone writes `@claude` in an issue or PR comment.
- **Automation:** with a `prompt` input, Claude runs on any event (PRs, pushes, a schedule). It can only use the tools you allow in `claude_args` with `--allowedTools`.

### Respond to @claude mentions

```yaml
# .github/workflows/claude.yml
name: Claude Code

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Now comment `@claude fix the failing test in auth.test.ts` on a PR and Claude does the work on a branch.

### Review every pull request

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review pull request #${{ github.event.pull_request.number }} in ${{ github.repository }}.
            Read the diff with `gh pr diff ${{ github.event.pull_request.number }}`.
            Focus on bugs, security issues, missing error handling, performance problems
            and missing tests. Give specific file:line references and be concise.
            Post the review with `gh pr comment ${{ github.event.pull_request.number }} --body "..."`.
          claude_args: '--allowedTools "Bash(gh pr diff:*),Bash(gh pr view:*),Bash(gh pr comment:*)"'
```

---

## Documentation Auto-Updater

Keep docs in sync with code changes automatically:

```yaml
# .github/workflows/update-docs.yml
name: Update Documentation

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'app/**'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - name: Update API docs
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Update docs/api.md to reflect the current exported functions in src/.
            Keep the existing structure; only change content that is out of date.
          claude_args: '--allowedTools "Read,Glob,Grep,Edit(docs/api.md),Write(docs/api.md)"'

      - name: Commit and push if changed
        run: |
          git config user.email "claude-bot@yourapp.com"
          git config user.name "Claude Code Bot"
          git add docs/api.md
          git diff --staged --quiet || git commit -m "docs: auto-update API docs [skip ci]"
          git push
```

---

## Quality Gate: Block Merges with Issues

Use Claude as a quality gate that can block a PR. Claude writes its verdict to a file; the next step fails the job on `FAIL`:

```yaml
# .github/workflows/quality-gate.yml
name: Quality Gate

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  quality:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Security check
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Run `git diff origin/${{ github.base_ref }}...HEAD` and check the diff for security
            vulnerabilities (SQL injection, XSS, hardcoded secrets, insecure dependencies,
            auth bypasses). Write the result to quality-result.txt: the first line must be
            exactly PASS or FAIL, followed by a description of each issue found.
          claude_args: '--allowedTools "Bash(git diff:*),Read,Write(quality-result.txt)"'

      - name: Enforce result
        run: |
          cat quality-result.txt
          if ! head -1 quality-result.txt | grep -qx "PASS"; then
            echo "::error::Security issues found in this PR"
            exit 1
          fi
          echo "Security check passed"
```

Anything other than a clean `PASS` (including a missing file) fails the job, which blocks the merge when the check is required in branch protection.

---

## Scheduled Codebase Health Reports

Run weekly health checks automatically:

```yaml
# .github/workflows/weekly-health.yml
name: Weekly Codebase Health

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am UTC
  workflow_dispatch:     # Also allow manual trigger

jobs:
  health-check:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - name: Generate health report
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Analyze this codebase and write a health report to health-report.md covering:
            1. Technical debt (specific examples)
            2. Outdated dependencies (check package.json)
            3. Test coverage gaps (look at test files vs source files)
            4. Documentation gaps
            5. Top 3 recommended improvements this week
            Format it as markdown with a severity rating for each item.
          claude_args: '--allowedTools "Read,Glob,Grep,Write(health-report.md)"'

      - name: Create GitHub Issue with report
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          gh issue create \
            --title "Weekly Health Report - $(date -u +%F)" \
            --body-file health-report.md \
            --label health-report
```

The `health-report` label must exist in the repository first.

---

## Cost Management for CI

Claude Code in CI can get expensive at scale. Control costs:

1. **Use Haiku for simple checks** — it's 10x cheaper than Sonnet
2. **Cache results** — if nothing changed in a directory, skip that check
3. **Limit to changed files only** — use `git diff --name-only` to scope reviews
4. **Cap the run** — add `--max-turns 5` (and `--model claude-haiku-4-5-20251001` for simple checks) to `claude_args`

```bash
# Only review TypeScript files that changed
CHANGED_TS=$(git diff --name-only origin/main...HEAD | grep '\.ts$' | head -20)
if [ -z "$CHANGED_TS" ]; then
  echo "No TypeScript files changed, skipping review"
  exit 0
fi
echo "Reviewing: $CHANGED_TS"
```

---

Next module: [MCP Integrations](../05-mcp-integrations/README.md)
