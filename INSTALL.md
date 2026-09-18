# Install Bridge on many agents / models

Bridge orchestrates **Keel** + **Impeccable**. Install all three into the same project.  
Run from **your project root** — no Bridge clone required.

> Prefer the [README](README.md) quick start. This page is the full provider table.

## Direct install (recommended)

```bash
cd /path/to/your/project

curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor

npx --yes github:raulaguila/bridge install --providers=cursor
```

Keel + Bridge (Cursor + Cline):

```bash
curl -fsSL https://raw.githubusercontent.com/raulaguila/keel/master/install.sh | bash -s -- --providers=cursor,cline
curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor,cline
# Impeccable: npx impeccable install
```

Pin: `BRIDGE_REF=v0.2.1 curl -fsSL …/install.sh | bash -s -- --providers=cursor`

## Local clone (optional)

```bash
git clone https://github.com/raulaguila/bridge.git /tmp/bridge-skill
cd /path/to/your/project
node /tmp/bridge-skill/cli/bin/bridge.js install --providers=cursor
```

## One command per harness

| Harness / agent | Command |
|-----------------|---------|
| Cursor | `… install --providers=cursor` |
| Claude Code | `… install --providers=claude` |
| Codex / Agents | `… install --providers=codex` or `agents` |
| Gemini CLI | `… install --providers=gemini` |
| GitHub Copilot | `… install --providers=copilot` |
| OpenCode | `… install --providers=opencode` |
| Windsurf | `… install --providers=windsurf` |
| Continue | `… install --providers=continue` |
| Cline | `… install --providers=cline` |
| Grok Build | `… install --providers=grok` |
| Kiro | `… install --providers=kiro` |
| Pi | `… install --providers=pi` |
| Trae / Trae CN | `… install --providers=trae` or `trae-cn` |
| Hermes | `… install --providers=hermes` |
| DeepSeek Harness | `… install --providers=dsh` |
| Qoder | `… install --providers=qoder` |
| Rovo Dev | `… install --providers=rovo-dev` |
| Mistral Vibe | `… install --providers=vibe` |
| Veto | `… install --providers=veto` |
| Antigravity | `… install --providers=antigravity` |
| Aider (manual path) | `… install --providers=aider` |

## Several at once

```bash
npx --yes github:raulaguila/bridge install --providers=cursor,claude,codex,gemini,copilot
npx --yes github:raulaguila/bridge install --providers=all
npx --yes github:raulaguila/bridge install --list-providers
```

## Where the skill is copied

| Provider | Folder | Invoke |
|----------|--------|--------|
| `cursor` | `.cursor/skills/bridge` | `/bridge` |
| `claude` | `.claude/skills/bridge` | `/bridge` |
| `codex` / `agents` | `.agents/skills/bridge` | `/bridge` |
| `gemini` | `.gemini/skills/bridge` | `/bridge` |
| `copilot` | `.github/skills/bridge` | `/bridge` |
| `cline` | `.cline/skills/bridge` (+ `.clinerules/skills/bridge`) | `/bridge` |
| … | `--list-providers` | `/bridge` |

## After install

1. Install Keel and Impeccable for the **same** providers.
2. Reload the harness.
3. `/bridge init` → `/bridge contract` → `/bridge plan`.

## Update

```bash
curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor,claude
# or: npx --yes github:raulaguila/bridge update --providers=cursor,claude
```

`update` is an alias of `install`.
