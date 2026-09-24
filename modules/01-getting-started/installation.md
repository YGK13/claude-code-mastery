# Installation

Claude Code installs with a single command. The native installer needs no Node.js, and it keeps itself up to date automatically.

---

## Step 1 — Install Claude Code

**Mac, Linux or WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows (Command Prompt):**
```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Prefer a package manager? `brew install --cask claude-code` (Mac) and `winget install Anthropic.ClaudeCode` (Windows) also work, but they don't auto-update: run `brew upgrade claude-code` or `winget upgrade Anthropic.ClaudeCode` from time to time.

On native Windows, install [Git for Windows](https://git-scm.com/downloads/win) as well so Claude Code can use Bash.

Verify:
```bash
claude --version
claude doctor      # checks the install and your settings
```

---

## Step 2 — Sign in

Run `claude` and follow the prompts. You can sign in with a Claude subscription (Pro, Max, Team or Enterprise) or with an Anthropic Console account that bills per token. If you use a Console API key instead, follow Steps 3 and 4.

---

## Step 3 — Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Click **API Keys** in the left sidebar
4. Click **Create Key**
5. Copy the key — it starts with `sk-ant-`

**Important:** You only see the key once. Save it somewhere safe.

---

## Step 4 — Set the API Key

**Mac / Linux (add to shell profile so it persists):**
```bash
echo 'export ANTHROPIC_API_KEY=sk-ant-YOUR-KEY-HERE' >> ~/.zshrc
source ~/.zshrc
```

Or for bash:
```bash
echo 'export ANTHROPIC_API_KEY=sk-ant-YOUR-KEY-HERE' >> ~/.bashrc
source ~/.bashrc
```

**Windows (PowerShell, persistent):**
```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-YOUR-KEY-HERE", "User")
```

Then restart your terminal.

**For a single session only (any platform):**
```bash
export ANTHROPIC_API_KEY=sk-ant-YOUR-KEY-HERE
```

---

## Step 5 — Verify Everything Works

```bash
claude --version           # shows version number
echo $ANTHROPIC_API_KEY    # shows your key (Mac/Linux)
```

Then start your first session:
```bash
mkdir test-project && cd test-project
claude
```

You should see the Claude Code prompt. Type `/help` to see available commands.

---

## VS Code Integration (Optional but Recommended)

Claude Code integrates with VS Code so you can trigger sessions from the editor.

1. Open VS Code
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
3. Type "Claude Code" — install the extension if prompted
4. Use `Ctrl+Shift+C` (`Cmd+Shift+C` on Mac) to open a Claude Code session in the terminal

---

## Pricing Note

Claude Code uses your Anthropic API key and bills per token. For typical learning sessions (one new app per session, moderate complexity), expect $0.10–$1.00 per session. Claude Sonnet is the default model — more affordable than Claude Opus while still highly capable.

Set a spending limit in the Anthropic console under **Billing** to avoid surprises.

---

## Troubleshooting

**"command not found: claude" after install**

The install directory isn't in your PATH. The installer puts `claude` in `~/.local/bin` (Mac/Linux) or `%USERPROFILE%\.local\bin` (Windows). Fix on Mac/Linux:
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc   # or ~/.bashrc
source ~/.zshrc
```
On Windows, add `%USERPROFILE%\.local\bin` to your user PATH and open a new terminal.

**"Invalid API key"**

Double-check the key in the Anthropic console. Make sure there are no extra spaces or newline characters in the variable.

**Windows: PowerShell execution policy**

If you see a policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

Next: [Your First Session](./first-session.md)
