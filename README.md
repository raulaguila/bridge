# Bridge

FE↔BE orchestration for AI coding agents. 1 skill, 8 commands — drives [Keel](https://github.com/raulaguila/keel) (backend) and [Impeccable](https://github.com/pbakaus/impeccable) (frontend) **internally** through a shared contract.

> **Quick start:** Install Keel + Impeccable + Bridge into the same project, then run `/bridge init`.  
> `npx --yes github:raulaguila/bridge install` · Provider details: [INSTALL.md](INSTALL.md).

## Why Bridge?

Backend and frontend skills optimize their own craft. Without a shared contract they invent parallel fields, disagree on auth headers, and “ship” with mock policy undefined.

You talk to **Bridge only**. Bridge loads Keel/Impeccable playbooks behind `/bridge build` and `/bridge ship` — you should not need to paste `/keel` or `/impeccable` commands.

- **Contract first.** `/bridge contract` negotiates `CONTRACT.md` (APIs, auth, errors, mocks) before parallel FE/BE build.
- **Explicit sequence.** `/bridge plan` persists `/bridge …` steps in `.bridge/plan.md`; `/bridge build` runs the next craft step internally.
- **Gap codes.** `/bridge sync` diffs UI ↔ contract ↔ BE with stable codes (`BE_MISSING_ROUTE`, `FE_AUTH_HEADER`, …).
- **Combined gate.** `/bridge ship` checks CONTRACT readiness and runs BE ship + FE polish playbooks internally.

## What's Included

### The Skill: bridge

```bash
/bridge <command>
```

Start with:

```bash
/bridge init
```

Then `/bridge contract` → `/bridge plan` → `/bridge build` → `/bridge sync` → `/bridge ship`.

### 8 Commands

| Command | What it does |
|---------|--------------|
| `/bridge init` | Shared `PRODUCT.md` + CONTRACT stub; finishes Keel + Impeccable init internally |
| `/bridge contract` | Negotiate / accept `CONTRACT.md` (optional OpenAPI seed via CLI) |
| `/bridge plan` | Sequence as `/bridge …` steps; persist `.bridge/plan.md` |
| `/bridge build` | Run craft work via Keel/Impeccable playbooks (`be:shape`, `fe:polish`, …) |
| `/bridge sync` | Diff UI ↔ contract ↔ BE with gap codes |
| `/bridge status` | Pulse artifacts, skills, and plan (`--json`) |
| `/bridge doctor` | Validate stamps / Status / APIs / skills (`--fix`) |
| `/bridge ship` | Combined release gate; runs BE ship + FE polish internally |

**Alias:** `/bridge handoff` → `/bridge build`.

Bare `/bridge` recommends **Bridge-only** next steps.

#### Usage Examples

```
/bridge contract
/bridge plan
/bridge build be:shape checkout
/bridge build fe:shape checkout
/bridge sync
/bridge ship
```

### Gap codes (`sync`)

`BE_MISSING_ROUTE` · `FE_EXTRA_CALL` · `FE_AUTH_HEADER` · `ERROR_SHAPE` · `FIELD_MISSING` · `CONTRACT_DRAFT` · `MOCK_POLICY` · `SKILL_MISSING`

## Installation

Node **20+**. Install **Keel** and **Impeccable** into the same providers so Bridge can load their playbooks.

### Option 1: CLI installer (Recommended)

```bash
# From your project root
npx --yes github:raulaguila/keel install --providers=cursor
npx --yes github:raulaguila/bridge install --providers=cursor
# + Impeccable: npx impeccable install
```

or:

```bash
curl -fsSL https://raw.githubusercontent.com/raulaguila/bridge/master/install.sh | bash -s -- --providers=cursor
```

```bash
npx --yes github:raulaguila/bridge install --providers=cursor,claude,cline
npx --yes github:raulaguila/bridge install --providers=all
npx --yes github:raulaguila/bridge update --providers=cursor
```

Pin: `BRIDGE_REF=v0.2.1 curl -fsSL …/install.sh | bash -s -- --providers=cursor`.

Full harness table: **[INSTALL.md](INSTALL.md)**.

### Option 2: Clone once (optional)

```bash
git clone https://github.com/raulaguila/bridge.git /tmp/bridge-skill
cd /path/to/your/project
node /tmp/bridge-skill/cli/bin/bridge.js install --providers=cursor
```

## Usage

```
/bridge init
/bridge contract
/bridge plan
/bridge build          # next plan step, or e.g. be:shape / fe:polish
/bridge sync
/bridge ship
```

## Keeping `.bridge` out of git

```gitignore
# bridge-ignore-start
.bridge/*.local.*
# bridge-ignore-end
```

**Keep tracked:** `CONTRACT.md`, `PRODUCT.md`, and `.bridge/plan.md` when the team shares the sequence.

## CLI

```bash
npx --yes github:raulaguila/bridge status --json
npx --yes github:raulaguila/bridge doctor --json
npx --yes github:raulaguila/bridge plan write --title=App --steps="/bridge build be:shape|/bridge build fe:shape|/bridge sync"
npx --yes github:raulaguila/bridge seed --in=openapi.yaml
```

## Supported Tools

Same provider catalog as Keel (Cursor, Claude Code, Copilot, Codex, Gemini, Cline, Continue, OpenCode, Grok, Hermes, and more). See [INSTALL.md](INSTALL.md).

## License

Apache 2.0. See [LICENSE](LICENSE).

---

Orchestrates [Keel](https://github.com/raulaguila/keel) + [Impeccable](https://github.com/pbakaus/impeccable) behind a Bridge-only command surface.
