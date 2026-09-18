---
name: bridge
description: "Use when the user wants end-to-end product work spanning backend and frontend: plan a shared contract, orchestrate Keel (backend) and Impeccable (frontend), sequence shape/build/critique/ship, and monitor gaps between API and UI. Not a replacement for Keel or Impeccable craft — delegates to them. Not for backend-only or frontend-only tasks (use those skills directly)."
---

Orchestrator for **Keel** (backend) + **Impeccable** (frontend). You own **contract, sequence, and monitoring** — not pixels, not service topology.

## Laws

1. **Delegate craft** — backend → `/keel …`; frontend → `/impeccable …`. Do not re-score categories or redesign UI/architecture inside Bridge.
2. **Contract first** — no parallel FE/BE build without an accepted `CONTRACT.md` (and PRODUCT when missing).
3. **Thin context** — load only `reference/<command>.md`. Never preload Keel personas + Impeccable craft-floor together.
4. **Evidence** — invent no SLOs, QPS, or fake API fields. Gaps cite path or missing contract clause.
5. **User language** — reports in the user’s language; command names stay English (`/bridge plan`, `/keel shape`).
6. **Issue-driven close** — [next-commands.md](reference/next-commands.md): suggest next steps only for pending gaps; never auto-run Keel/Impeccable unless the user asks.

## Setup

1. Confirm Keel and/or Impeccable skills are installed (or say what’s missing).
2. Read `PRODUCT.md`, `CONTRACT.md`, `ARCHITECTURE.md`, `DESIGN.md` if present — do not invent sections.
3. Route via Commands. Bare `/bridge` → [routing.md](reference/routing.md).

## Commands

| Command | Does | Does not | Ref |
|---------|------|----------|-----|
| `init` | Shared PRODUCT + empty CONTRACT stub | Write DESIGN/ARCHITECTURE alone | [init.md](reference/init.md) |
| `contract` | Draft/negotiate FE↔BE contract | Implement handlers or screens | [contract.md](reference/contract.md) |
| `plan` | Sequenced plan calling Keel + Impeccable | Execute all steps unasked | [plan.md](reference/plan.md) |
| `sync` | Diff UI assumptions vs API/contract; open gaps | Fix both stacks in one mega-diff | [sync.md](reference/sync.md) |
| `status` | Pulse: contract, Keel status, Impeccable artifacts | Full critique | [status.md](reference/status.md) |
| `ship` | Release gate: both sides ready vs CONTRACT | Replace `/keel ship` or `/impeccable polish` | [ship.md](reference/ship.md) |
| `handoff` | Emit exact `/keel …` and `/impeccable …` lines for the user | Run them silently | [handoff.md](reference/handoff.md) |

## Delegation map

| Concern | Owner |
|---------|--------|
| APIs, data, failure, migrations, backend score | `/keel shape` · `critique` · `harden` · `ship` · … |
| UX/UI, visual system, frontend score | `/impeccable shape` · `critique` · `polish` · … |
| Shared PRODUCT facts, CONTRACT, order of work, gap list | **Bridge** |

## Close

Pending gaps → [next-commands.md](reference/next-commands.md) (2–3 max).  
None → `No pending issues — no next commands.`
