---
name: bridge
description: "Use when the user wants end-to-end product work spanning backend and frontend: plan a shared contract, orchestrate Keel (backend) and Impeccable (frontend), sequence shape/build/critique/ship, and monitor gaps between API and UI. Not a replacement for Keel or Impeccable craft — delegates to them. Not for backend-only or frontend-only tasks (use those skills directly)."
---

Orchestrator for **Keel** (backend) + **Impeccable** (frontend). You own **contract, sequence, and monitoring** — not pixels, not service topology.

## Laws

1. **Delegate craft** — backend → `/keel …`; frontend → `/impeccable …`. Do not re-score or redesign UI/architecture inside Bridge.
2. **Contract first** — no parallel FE/BE build without accepted `CONTRACT.md` (+ Mocks policy).
3. **Thin context** — load only `reference/<command>.md`. Never preload Keel personas + Impeccable craft-floor together.
4. **Evidence** — invent no SLOs/QPS/fake fields. Gaps use codes from [sync.md](reference/sync.md).
5. **User language** — reports in user’s language; command names English.
6. **Issue-driven close** — [next-commands.md](reference/next-commands.md); never auto-run Keel/Impeccable unless asked.

## Setup

1. Prefer scripts: `node <bridge-skill>/scripts/status.js --json` (detects Keel/Impeccable).
2. Read PRODUCT / CONTRACT / ARCHITECTURE / DESIGN if present.
3. Route via Commands. Bare `/bridge` → [routing.md](reference/routing.md).

`<bridge-skill>` = folder containing this SKILL.md.

## Commands

| Command | Does | Does not | Ref |
|---------|------|----------|-----|
| `init` | Shared PRODUCT + CONTRACT stub | Write DESIGN/ARCHITECTURE | [init.md](reference/init.md) |
| `contract` | Negotiate CONTRACT (+ OpenAPI seed) | Implement handlers/screens | [contract.md](reference/contract.md) |
| `plan` | Sequence + persist `.bridge/plan.md` | Copy-paste-only → `handoff`; auto-run all | [plan.md](reference/plan.md) |
| `sync` | Diff UI↔CONTRACT↔BE with gap codes | Mega-fix both stacks | [sync.md](reference/sync.md) |
| `status` | Pulse artifacts + plan + skills | Full critique | [status.md](reference/status.md) |
| `doctor` | Validate CONTRACT/PRODUCT (`--fix` stamps) | App smell scan | [doctor.md](reference/doctor.md) |
| `ship` | Combined release gate vs CONTRACT | Replace keel ship / impeccable polish | [ship.md](reference/ship.md) |
| `handoff` | Exact `/keel` `/impeccable` lines | Run them silently; full plan narrative → `plan` | [handoff.md](reference/handoff.md) |

## Scripts

```bash
node <bridge-skill>/scripts/status.js [--json]
node <bridge-skill>/scripts/doctor.js [--json] [--fix]
node <bridge-skill>/scripts/plan.js write|status|done|next …
node <bridge-skill>/scripts/openapi-seed.js [--in=openapi.yaml] [--force]
```

## Close

Pending gaps → [next-commands.md](reference/next-commands.md) (2–3). Else nothing.
