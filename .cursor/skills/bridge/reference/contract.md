# contract

Own the **FE↔BE contract**. This is Bridge’s core planning artifact.

## Flow

1. Require PRODUCT (offer `/bridge init` if missing).
2. Inventory evidence. If OpenAPI exists, seed draft rows:
   ```bash
   node <bridge-skill>/scripts/openapi-seed.js [--in=openapi.yaml]
   ```
   Review before accept (`--force` only if replacing an accepted table).
3. Draft/update `CONTRACT.md` (template): Surfaces, Auth, APIs, Errors, **Mocks**, Non-goals, Open questions.
4. Run `doctor --json` before asking for acceptance.
5. **Stop for acceptance** unless user said proceed. On accept: Status `accepted`.

## Rules

- Smallest API surface for the job-to-be-done.
- Mocks policy required before parallel FE build.
- Do not implement BE/UI here.
