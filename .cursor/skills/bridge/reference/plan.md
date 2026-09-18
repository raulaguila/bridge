# plan

Produce a **sequenced plan** that calls Keel and Impeccable — do not execute the whole plan unless asked.

## Preconditions

- `PRODUCT.md` present (else `init`)
- `CONTRACT.md` Status `accepted` (else `contract`)

## Output shape (user’s language)

```markdown
## Bridge plan — <title>

### Contract
- Status: accepted · N endpoints · auth: …

### Sequence
1. `/keel shape …` — …
2. `/impeccable shape …` — …
3. Backend build (Keel eng-floor) — …
4. Frontend build (Impeccable craft-floor) — …
5. `/bridge sync` — …
6. `/keel critique …` / `/impeccable critique …` — optional
7. `/keel ship …` + `/impeccable polish …` + `/bridge ship`

### Parallelism
- What can run in parallel after contract (e.g. BE handlers ∥ FE layout against mocks)

### Risks / open questions
- …
```

## Rules

- Each step names the **skill command** and the **CONTRACT clause** it satisfies.
- Prefer mocks/stubs only when CONTRACT says so; don’t invent fake fields for the UI.
- Max one “optional critique” pair — not a tour of every command.
- End with: ask whether to run step 1, handoff all as copy-paste ([handoff.md](handoff.md)), or revise.
