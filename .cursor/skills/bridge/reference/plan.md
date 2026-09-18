# plan

Produce a **sequenced plan** and persist it under `.bridge/plan.md`.

**Does:** sequence + checklist file using **only** `/bridge …` steps.  
**Does not:** list `/keel` / `/impeccable` for the user; auto-run the whole plan.

## Preconditions

- `PRODUCT.md` present (else `init`)
- `CONTRACT.md` Status `accepted` (else `contract`)

## Persist

After drafting the sequence, write the checklist with Bridge-facing steps only:

```bash
node <bridge-skill>/scripts/plan.js write --title="Checkout" --steps="/bridge build be:shape checkout|/bridge build fe:shape checkout|/bridge build be:harden checkout|/bridge sync|/bridge ship"
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
1. `/bridge build be:shape …`
2. `/bridge build fe:shape …`
3. `/bridge sync`
4. `/bridge ship`

### Parallelism
- …
### Risks
- …
```

## Rules

- Every user-visible step is a `/bridge …` command (`build`, `sync`, `ship`, `contract`, …).
- Map craft intent with `be:` / `fe:` tokens on `build` (see [build.md](build.md)) — those tokens are Bridge syntax, not invitations to leave Bridge.
- Max one optional critique pair (`build be:critique` / `build fe:critique`).
- Ask: run `/bridge build` (next step), revise plan, or stop — never silent execute-all.
- Never print a parallel “also run `/keel …`” list.
