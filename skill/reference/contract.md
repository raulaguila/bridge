# contract

Own the **FE↔BE contract**. This is Bridge’s core planning artifact.

## Flow

1. Require PRODUCT (offer `/bridge init` if missing).
2. Inventory evidence: existing OpenAPI/proto, routes, UI calls, Keel surfaces, Impeccable surface briefs — mark Unknown.
3. Draft or update `CONTRACT.md` ([template](../assets/templates/CONTRACT.md)):
   - Surfaces + modes (BE Serve/… · FE Operate/Persuade/…)
   - Auth
   - API table (only endpoints needed for the job-to-be-done)
   - Errors, pagination, idempotency
   - Non-goals + open questions
4. **Stop for acceptance** unless the user said “contract and plan” / “just proceed”.
5. On accept: set Status: `accepted`. Optional: note handoff lines via [handoff.md](handoff.md).

## Rules

- Smallest API surface that unlocks the FE job.
- Field names on the wire stay stable; prose in user’s language.
- Do not implement backend or UI in this command.
- Ambiguous auth or breaking changes → ask once with options.

## After acceptance

Typical handoff:

1. `/keel shape <feature>` — honor CONTRACT APIs  
2. `/impeccable shape <surface>` — honor CONTRACT + PRODUCT  
3. `/bridge plan` — sequence builds and checks  
