---
# generated from modules/01-getting-started/installation.md by site/scripts/sync-content.mjs
title: "Installation"
description: "Claude Code runs as a CLI tool on top of Node.js. Here's the complete setup for every platform."
---

Claude Code runs as a CLI tool on top of Node.js. Here's the complete setup for every platform.

---

## Step 1 - Install Node.js

Claude Code requires Node.js v18 or higher. Use v20 LTS or v22 for best results.

**Mac (Homebrew):**
```bash
brew install node
```

**Windows:**
Download the installer from [nodejs.org](https://nodejs.org). During install, check "Add to PATH".

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify the install:
```bash
node --version   # should print v20.x.x or higher
npm --version    # should print 10.x.x or higher
```

---

## Step 2 - Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Verify:
```bash
claude --version
```

You should see a version number like `1.x.x`.

---

## Step 3 - Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Click **API Keys** in the left sidebar
4. Click **Create Key**
5. Copy the key - it starts with `sk-ant-`

**Important:** You only see the key once. Save it somewhere safe.

---

## Step 4 - Set the API Key

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

## Step 5 - Verify Everything Works

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
3. Type "Claude Code" - install the extension if prompted
4. Use `Ctrl+Shift+C` (`Cmd+Shift+C` on Mac) to open a Claude Code session in the terminal

---

## Pricing Note

Claude Code uses your Anthropic API key and bills per token. For typical learning sessions (one new app per session, moderate complexity), expect $0.10–$1.00 per session. Claude Sonnet is the default model - more affordable than Claude Opus while still highly capable.

Set a spending limit in the Anthropic console under **Billing** to avoid surprises.

---

## Troubleshooting

**"command not found: claude" after install**

npm's global bin directory isn't in your PATH. Fix:
```bash
npm config get prefix    # shows where global packages are installed
# add that path + /bin to your PATH
```

**"Invalid API key"**

Double-check the key in the Anthropic console. Make sure there are no extra spaces or newline characters in the variable.

**Windows: PowerShell execution policy**

If you see a policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

Next: [Your First Session](/curriculum/01-getting-started/first-session/)
