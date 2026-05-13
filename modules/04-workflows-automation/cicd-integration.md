# CI/CD Integration

Claude Code can run in GitHub Actions, giving you an AI code reviewer, automated documentation updater and quality gate that runs on every pull request.

---

## Claude Code in GitHub Actions

The setup: install Node, install Claude Code, set the API key as a repository secret.

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
      pull-requests: write
      contents: read
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # full history so Claude can see the diff
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      
      - name: Run Claude Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Get the diff
          git diff origin/${{ github.base_ref }}...HEAD > /tmp/pr-diff.txt
          
          # Run Claude review
          cat /tmp/pr-diff.txt | claude --print \
            "Review this PR diff. Focus on: bugs, security issues, missing error handling,
             performance problems, and missing tests. Format output as markdown with
             specific file:line references for each issue. Be concise." \
            > /tmp/review.md
          
          echo "REVIEW_CONTENT<<EOF" >> $GITHUB_ENV
          cat /tmp/review.md >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV
      
      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: process.env.REVIEW_CONTENT
            })
```

Add `ANTHROPIC_API_KEY` to your repository secrets (Settings → Secrets → Actions).

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
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - run: npm install -g @anthropic-ai/claude-code
      
      - name: Update API docs
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          echo "Update docs/api.md to reflect the current exported functions in src/. 
                Keep the existing structure, just update content that changed." \
            | claude --print > docs/api.md
      
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

Use Claude as a quality gate that can block a PR:

```yaml
# .github/workflows/quality-gate.yml
name: Quality Gate

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - run: npm install -g @anthropic-ai/claude-code
      
      - name: Security check
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/${{ github.base_ref }}...HEAD > /tmp/diff.txt
          
          RESULT=$(cat /tmp/diff.txt | claude --print \
            "Check this diff for security vulnerabilities (SQL injection, XSS, hardcoded secrets,
             insecure dependencies, auth bypasses). Reply with PASS if no issues, or FAIL followed
             by a description of each issue found. No other text.")
          
          echo "Security check result: $RESULT"
          
          if echo "$RESULT" | grep -q "^FAIL"; then
            echo "::error::Security issues found in this PR"
            echo "$RESULT"
            exit 1
          fi
          
          echo "Security check passed"
```

A `FAIL` response from Claude causes the workflow to exit with code 1, blocking the PR merge.

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
    
    steps:
      - uses: actions/checkout@v4
      
      - run: npm install -g @anthropic-ai/claude-code
      
      - name: Generate health report
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          echo "Analyze this codebase and generate a health report covering:
                1. Technical debt (specific examples)
                2. Outdated dependencies (check package.json)
                3. Test coverage gaps (look at test files vs source files)
                4. Documentation gaps
                5. Top 3 recommended improvements this week
                Format as a markdown report with a severity rating for each item." \
            | claude --print > health-report.md
      
      - name: Read report into env
        run: |
          echo "REPORT_BODY<<EOF" >> $GITHUB_ENV
          cat health-report.md >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV
          echo "TODAY=$(date -u +%F)" >> $GITHUB_ENV
      
      - name: Create GitHub Issue with report
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `Weekly Health Report — ${process.env.TODAY}`,
              body: process.env.REPORT_BODY,
              labels: ['health-report']
            });
```

---

## Cost Management for CI

Claude Code in CI can get expensive at scale. Control costs:

1. **Use Haiku for simple checks** — it's 10x cheaper than Sonnet
2. **Cache results** — if nothing changed in a directory, skip that check
3. **Limit to changed files only** — use `git diff --name-only` to scope reviews
4. **Set `max_tokens`** — for short-answer quality gates, 100 tokens is enough

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
