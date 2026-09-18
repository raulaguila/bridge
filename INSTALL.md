# Instalar Bridge em diversos agentes / modelos

Bridge orquestra **Keel** + **Impeccable**. Instale os três no mesmo projeto.  
Rode **no diretório do seu projeto** — sem clonar o Bridge.

## Instalação direta (recomendado)

```bash
cd /caminho/do/seu/projeto

curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor

npx --yes github:raulaguila/bridge install --providers=cursor
```

Keel + Bridge (Cursor + Cline):

```bash
curl -fsSL https://raw.githubusercontent.com/raulaguila/keel/master/install.sh | bash -s -- --providers=cursor,cline
curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor,cline
```

Pin: `BRIDGE_REF=v0.2.1 curl -fsSL …/install.sh | bash -s -- --providers=cursor`

## Clone local (opcional)

```bash
git clone https://github.com/raulaguila/bridge.git /tmp/bridge-skill
cd /caminho/do/seu/projeto
node /tmp/bridge-skill/cli/bin/bridge.js install --providers=cursor
```

## Um comando por harness

| Harness / agente | Comando |
|------------------|---------|
| Cursor | `node …/bridge.js install --providers=cursor` |
| Claude Code | `node …/bridge.js install --providers=claude` |
| Codex / Agents | `node …/bridge.js install --providers=codex` ou `agents` |
| Gemini CLI | `node …/bridge.js install --providers=gemini` |
| GitHub Copilot | `node …/bridge.js install --providers=copilot` |
| OpenCode | `node …/bridge.js install --providers=opencode` |
| Windsurf | `node …/bridge.js install --providers=windsurf` |
| Continue | `node …/bridge.js install --providers=continue` |
| Cline | `node …/bridge.js install --providers=cline` |
| Grok Build | `node …/bridge.js install --providers=grok` |
| Kiro | `node …/bridge.js install --providers=kiro` |
| Pi | `node …/bridge.js install --providers=pi` |
| Trae / Trae CN | `node …/bridge.js install --providers=trae` ou `trae-cn` |
| Hermes | `node …/bridge.js install --providers=hermes` |
| DeepSeek Harness | `node …/bridge.js install --providers=dsh` |
| Qoder | `node …/bridge.js install --providers=qoder` |
| Rovo Dev | `node …/bridge.js install --providers=rovo-dev` |
| Mistral Vibe | `node …/bridge.js install --providers=vibe` |
| Veto | `node …/bridge.js install --providers=veto` |
| Antigravity | `node …/bridge.js install --providers=antigravity` |
| Aider (path manual) | `node …/bridge.js install --providers=aider` |

## Vários de uma vez

```bash
node /tmp/bridge-skill/cli/bin/bridge.js install --providers=cursor,claude,codex,gemini,copilot
node /tmp/bridge-skill/cli/bin/bridge.js install --providers=all
node /tmp/bridge-skill/cli/bin/bridge.js install --list-providers
```

## Onde a skill é copiada

| Provider | Pasta | Invocar |
|----------|-------|---------|
| `cursor` | `.cursor/skills/bridge` | `/bridge` |
| `claude` | `.claude/skills/bridge` | `/bridge` |
| `codex` / `agents` | `.agents/skills/bridge` | `/bridge` |
| `gemini` | `.gemini/skills/bridge` | `/bridge` |
| `copilot` | `.github/skills/bridge` | `/bridge` |
| `cline` | `.cline/skills/bridge` (+ `.clinerules/skills/bridge`) | `/bridge` |
| … | `--list-providers` | `/bridge` |

## Fluxo após instalar

1. Instale também Keel e Impeccable nos **mesmos** providers.  
2. Recarregue o harness.  
3. `/bridge init` → `/bridge contract` → `/bridge plan`.

## Atualizar

```bash
curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor,claude
# ou: npx --yes github:raulaguila/bridge update --providers=cursor,claude
```

`update` é alias de `install`.
