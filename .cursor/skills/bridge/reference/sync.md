# sync

Monitor **integration drift**: UI assumptions vs CONTRACT vs backend reality.

## Flow

1. Read `CONTRACT.md` (must exist).
2. Sample FE call sites / types / fetch paths and BE handlers / OpenAPI — evidence only.
3. Emit a gap table:

| Gap | Side | Evidence | Suggested command |
|-----|------|----------|-------------------|
| Missing `GET /x` | BE | UI calls `/x` | `/keel shape` or implement |
| Extra field unused | BE | … | `/keel distill` / defer |
| Error shape mismatch | both | … | `/bridge contract` + `/keel clarify` |
| Auth header wrong | FE | … | `/impeccable harden` / clarify |

4. Do **not** fix both stacks in one unbounded pass. Pick the smallest owner per gap.
5. Optional: run `keel status` / detector on BE path if installed — fold primaries into gaps.

## Refuse

- Re-scoring full Keel/Impeccable critiques here
- Expanding CONTRACT silently — propose edits, ask to accept
