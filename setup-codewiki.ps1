# setup-codewiki.ps1
# Run this once to configure the local CodeWiki CLI and generate docs.
# Usage: .\setup-codewiki.ps1 -ApiKey "sk-ant-..."

param(
    [Parameter(Mandatory=$true)]
    [string]$ApiKey
)

$CODEWIKI = "C:\Users\yurik\AppData\Roaming\Python\Python314\Scripts\codewiki.exe"
$REPO_DIR = $PSScriptRoot  # this file is in the repo root
$MODEL = "claude-sonnet-5"                     # one place to change the main model
$FALLBACK_MODEL = "claude-haiku-4-5-20251001"

Write-Host "Configuring CodeWiki with Anthropic..." -ForegroundColor Cyan

& $CODEWIKI config set `
    --api-key $ApiKey `
    --base-url "https://api.anthropic.com" `
    --provider anthropic `
    --main-model $MODEL `
    --cluster-model $MODEL `
    --fallback-model $FALLBACK_MODEL `
    --max-tokens 8192

if ($LASTEXITCODE -ne 0) {
    Write-Host "Config failed. Check your API key." -ForegroundColor Red
    exit 1
}

Write-Host "Validating configuration..." -ForegroundColor Cyan
& $CODEWIKI config validate

if ($LASTEXITCODE -ne 0) {
    Write-Host "Validation failed." -ForegroundColor Red
    exit 1
}

Write-Host "`nGenerating documentation for claude-code-mastery..." -ForegroundColor Cyan
Set-Location $REPO_DIR

& $CODEWIKI generate `
    --include "*.md,*.html,*.py" `
    --exclude "node_modules,dist,.git,setup-codewiki.ps1" `
    --doc-type user-guide `
    --github-pages `
    --instructions "This is a teaching curriculum for Claude Code. Generate documentation that helps instructors and students navigate the curriculum. Describe each module's purpose, key concepts covered and how modules connect to each other. Highlight the templates and examples as practical resources." `
    --verbose

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDocs generated in ./docs/" -ForegroundColor Green
    Write-Host "Open ./docs/index.html in a browser to view locally." -ForegroundColor Green
    Write-Host "`nTo push docs to GitHub:" -ForegroundColor Cyan
    Write-Host "  git add docs/ && git commit -m 'docs: add CodeWiki generated docs' && git push"
} else {
    Write-Host "Generation failed. Check the output above." -ForegroundColor Red
}
