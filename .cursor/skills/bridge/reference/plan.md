# plan

Produce a **sequenced plan** and persist it under `.bridge/plan.md`.

**Does:** sequence + checklist file. **Does not:** copy-paste-only lines (→ `handoff`) or auto-run Keel/Impeccable.

## Preconditions

- `PRODUCT.md` present (else `init`)
- `CONTRACT.md` Status `accepted` (else `contract`)

## Persist

After drafting the sequence, write the checklist:

```bash
node <bridge-skill>/scripts/plan.js write --title="Checkout" --steps="/keel shape checkout|/impeccable shape checkout|/keel harden …|/bridge sync|/bridge ship"
```

Advance later:

```bash
node <bridge-skill>/scripts/plan.js status --json
node <bridge-skill>/scripts/plan.js done        # first open
node <bridge-skill>/scripts/plan.js done 3      # step 3
node <bridge-skill>/scripts/plan.js next
```

`/bridge status` reads the same file for `N/M done · next: …`.

## Output shape (chat, user’s language)

```markdown
## Bridge plan — <title>

### Contract
- Status: accepted · N endpoints · auth: …

### Sequence (also in .bridge/plan.md)
1. …
### Parallelism
- …
### Risks
- …
```

## Rules

- Each step names skill command + CONTRACT clause.
- Max one optional critique pair.
- Ask: run step 1, full handoff, or revise — never silent execute-all.
