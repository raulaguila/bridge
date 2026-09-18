# build

Execute **craft work** for this FE↔BE effort by loading Keel (backend) or Impeccable (frontend) playbooks **internally**.

**Does:** run the mapped craft command and report in Bridge terms.  
**Does not:** print copy-paste `/keel` / `/impeccable` lines for the user.

**Alias:** `handoff` → this command.

## User-facing usage

```
/bridge build                 # next open step from .bridge/plan.md (or ask side+action)
/bridge build be:shape checkout
/bridge build fe:polish settings
/bridge build be:ship
```

## Dispatch map (internal — never show as user suggestions)

| Token | Load and follow |
|-------|-----------------|
| `be:init` | `<keel-skill>/reference/init.md` |
| `be:document` | `<keel-skill>/reference/document.md` |
| `be:shape` | `<keel-skill>/reference/shape.md` |
| `be:extract` | `<keel-skill>/reference/extract.md` |
| `be:onboard` | `<keel-skill>/reference/onboard.md` |
| `be:adapt` | `<keel-skill>/reference/adapt.md` |
| `be:critique` | `<keel-skill>/reference/critique.md` |
| `be:audit` | `<keel-skill>/reference/audit.md` |
| `be:secure` | `<keel-skill>/reference/secure.md` |
| `be:observe` | `<keel-skill>/reference/observe.md` |
| `be:harden` | `<keel-skill>/reference/harden.md` |
| `be:organize` | `<keel-skill>/reference/organize.md` |
| `be:distill` | `<keel-skill>/reference/distill.md` |
| `be:migrate` | `<keel-skill>/reference/migrate.md` |
| `be:optimize` | `<keel-skill>/reference/optimize.md` |
| `be:clarify` | `<keel-skill>/reference/clarify.md` |
| `be:load` | `<keel-skill>/reference/load.md` |
| `be:ship` | `<keel-skill>/reference/ship.md` |
| `be:doctor` | `<keel-skill>/reference/doctor.md` |
| `fe:init` | `<impeccable-skill>/reference/init.md` |
| `fe:document` | `<impeccable-skill>/reference/document.md` |
| `fe:shape` | `<impeccable-skill>/reference/shape.md` |
| `fe:critique` | `<impeccable-skill>/reference/critique.md` |
| `fe:audit` | `<impeccable-skill>/reference/audit.md` |
| `fe:polish` | `<impeccable-skill>/reference/polish.md` |
| `fe:harden` | `<impeccable-skill>/reference/harden.md` |
| `fe:onboard` | `<impeccable-skill>/reference/onboard.md` |
| `fe:adapt` | `<impeccable-skill>/reference/adapt.md` |
| `fe:optimize` | `<impeccable-skill>/reference/optimize.md` |
| `fe:clarify` | `<impeccable-skill>/reference/clarify.md` |
| `fe:live` | `<impeccable-skill>/reference/live.md` |

If the playbook filename differs in the installed skill, resolve the closest command from that skill’s Commands table — still without naming `/keel` or `/impeccable` to the user.

## Flow

1. Resolve target: explicit `be:…` / `fe:…`, else first open step in `.bridge/plan.md` that is a `/bridge build …` line, else ask once (backend / frontend / both + action).
2. Confirm CONTRACT Status when the action is `shape` / implement / `polish` / `ship` (offer `/bridge contract` if draft).
3. Locate craft skill via `status.js` / known install paths. If missing → say install Keel or Impeccable (package install), not “run /keel init”.
4. Load **only** the mapped playbook (+ that skill’s eng/craft floor if the playbook requires it for edits).
5. Execute the playbook for the user’s target.
6. Mark the matching `.bridge/plan.md` step done when applicable:
   ```bash
   node <bridge-skill>/scripts/plan.js done
   ```
7. Close with Bridge-only next commands ([next-commands.md](next-commands.md)).

## Report shape (user language)

```markdown
### Bridge build — be:shape checkout
- Internal: backend shape playbook
- Result: …
- Plan: step N marked done | still open
```

Do **not** say “run `/keel shape` next”.

## Refuse

- Emitting a handoff list of `/keel` / `/impeccable` for the user to paste
- Loading both Keel deep critique and Impeccable craft-floor in the same turn
- Expanding CONTRACT silently — propose via `/bridge contract`
