# sync

Monitor **integration drift**: UI assumptions vs CONTRACT vs backend reality.

## Gap codes (use these ids)

| Code | Meaning |
|------|---------|
| `BE_MISSING_ROUTE` | CONTRACT/UI needs a route BE lacks |
| `FE_EXTRA_CALL` | UI calls path not in CONTRACT |
| `FE_AUTH_HEADER` | Auth scheme/header ≠ CONTRACT |
| `ERROR_SHAPE` | Error envelope mismatch |
| `FIELD_MISSING` | Required field missing on wire |
| `CONTRACT_DRAFT` | Building against unaccepted CONTRACT |
| `MOCK_POLICY` | FE parallel work without Mocks policy |
| `SKILL_MISSING` | Keel/Impeccable not installed |

## Flow

1. Read `CONTRACT.md`. Prefer `node <bridge-skill>/scripts/status.js --json` for artifact pulse.
2. Sample FE call sites and BE handlers / OpenAPI — evidence only.
3. Emit gap table — **Suggested** column is Bridge-only:

| Code | Side | Evidence | Suggested |
|------|------|----------|-----------|
| `BE_MISSING_ROUTE` | BE | UI `GET /x` | `/bridge build be:shape` |
| `ERROR_SHAPE` | both | … | `/bridge contract` then `/bridge build be:clarify` |
| `FE_AUTH_HEADER` | FE | … | `/bridge contract` then `/bridge build fe:harden` |
| `SKILL_MISSING` | — | … | install Keel/Impeccable packages (not a `/keel` chat command) |

4. One owner per gap. No mega-diff fixing both stacks in sync.
5. Optional: run Keel `detect` **internally** on BE paths if installed — report findings under Bridge; do not tell the user to run Keel CLI unless they asked for scripts.

## Refuse

- Full re-critique inside sync (use `/bridge build be:critique` / `fe:critique` later)
- Suggesting `/keel` or `/impeccable` in the gap table
- Silent CONTRACT expansion — propose via `/bridge contract`
