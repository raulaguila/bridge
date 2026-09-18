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
3. Emit gap table:

| Code | Side | Evidence | Suggested command |
|------|------|----------|-------------------|
| `BE_MISSING_ROUTE` | BE | UI `GET /x` | `/keel shape` / implement |
| `ERROR_SHAPE` | both | … | `/bridge contract` + `/keel clarify` |

4. One owner per gap. No mega-diff fixing both stacks.
5. Optional: Keel detect on BE paths if installed.

## Refuse

- Full Keel/Impeccable re-critique inside sync
- Silent CONTRACT expansion — propose, then accept
