---
name: bridge
description: "Use when the user wants end-to-end product work spanning backend and frontend: plan a shared contract, orchestrate Keel (backend) and Impeccable (frontend), sequence shape/build/critique/ship, and monitor gaps between API and UI. Not a replacement for Keel or Impeccable craft — runs them internally. Not for backend-only or frontend-only tasks when the user is already using those skills directly."
---

Orchestrator for **Keel** (backend) + **Impeccable** (frontend). You own **contract, sequence, and monitoring** — craft work is executed **inside** Bridge commands by loading those skills’ playbooks.

## Laws

1. **Facade** — user-facing suggestions and close-outs are **only** `/bridge …`. Never tell the user to run `/keel` or `/impeccable`. Internally load the matching Keel/Impeccable `reference/<command>.md` and do the work.
2. **Delegate craft (internal)** — backend playbooks = Keel; frontend = Impeccable. Do not re-score or redesign UI/architecture with Bridge’s own judgment.
3. **Contract first** — no parallel FE/BE build without accepted `CONTRACT.md` (+ Mocks policy).
4. **Thin context** — load only `reference/<command>.md` for the Bridge command; when dispatching craft, load **one** craft playbook at a time (never Keel personas + Impeccable craft-floor together).
5. **Evidence** — invent no SLOs/QPS/fake fields. Gaps use codes from [sync.md](reference/sync.md).
6. **User language** — reports/docs in the user’s language; command names stay English (`/bridge sync`).
7. **Issue-driven close** — [next-commands.md](reference/next-commands.md): Bridge commands only.

## Setup

1. Prefer scripts: `node <bridge-skill>/scripts/status.js --json` (detects Keel/Impeccable).
2. Read PRODUCT / CONTRACT / ARCHITECTURE / DESIGN if present.
3. Route via Commands. Bare `/bridge` → [routing.md](reference/routing.md).

`<bridge-skill>` = folder containing this SKILL.md.  
`<keel-skill>` / `<impeccable-skill>` = installed craft skill folders (from status/doctor).

## Commands

| Command | Does | Does not | Ref |
|---------|------|----------|-----|
| `init` | Shared PRODUCT + CONTRACT stub; internally finish Keel + Impeccable init | Write DESIGN/ARCHITECTURE; skip either craft init | [init.md](reference/init.md) |
| `contract` | Negotiate CONTRACT (+ OpenAPI seed) | Implement handlers/screens | [contract.md](reference/contract.md) |
| `plan` | Sequence as `/bridge …` steps; persist `.bridge/plan.md` | Expose `/keel` `/impeccable` to the user | [plan.md](reference/plan.md) |
| `build` | Run next (or named) craft work via Keel/Impeccable playbooks | Dump craft commands for the user to paste | [build.md](reference/build.md) |
| `sync` | Diff UI↔CONTRACT↔BE with gap codes | Mega-fix both stacks; suggest craft CLIs | [sync.md](reference/sync.md) |
| `status` | Pulse artifacts + plan + skills | Full critique | [status.md](reference/status.md) |
| `doctor` | Validate CONTRACT/PRODUCT (`--fix` stamps) | App smell scan | [doctor.md](reference/doctor.md) |
| `ship` | Combined gate; internally run BE ship + FE polish playbooks as needed | Ask user to paste `/keel ship` / `/impeccable polish` | [ship.md](reference/ship.md) |

**Alias:** `handoff` → `build` (legacy name).

## Scripts

```bash
node <bridge-skill>/scripts/status.js [--json]
node <bridge-skill>/scripts/doctor.js [--json] [--fix]
node <bridge-skill>/scripts/plan.js write|status|done|next …
node <bridge-skill>/scripts/openapi-seed.js [--in=openapi.yaml] [--force]
```

## Close

Pending gaps → [next-commands.md](reference/next-commands.md) (2–3 `/bridge …` only). Else nothing.
