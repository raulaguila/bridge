# handoff

Emit **copy-paste commands** for Keel and Impeccable. Bridge does not silently auto-run them.

## Format

```markdown
### Handoff

Backend:
1. `/keel shape checkout` — CONTRACT APIs for checkout
2. `/keel harden checkout` — timeouts on payment client

Frontend:
1. `/impeccable shape checkout` — Operate mode; honor CONTRACT auth
2. `/impeccable polish checkout` — after BE stubs ready

Bridge follow-up:
1. `/bridge sync` — after both shapes land
```

## Rules

- Every line maps to a named CONTRACT item or gap.
- 2–3 per side max unless user asked for the full plan dump.
- User language for reasons; command names English.
- After listing: ask run order (BE first / FE first / parallel).
