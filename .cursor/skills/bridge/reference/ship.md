# ship

Combined **release gate**. Bridge checks CONTRACT readiness, then runs craft release playbooks **internally** as needed.

## Checklist

- [ ] CONTRACT Status `accepted` (or explicitly waived)
- [ ] P0 gaps from last `/bridge sync` closed or deferred with owner
- [ ] Backend ship playbook done for BE P0/P1 (via internal Keel `ship`)
- [ ] Frontend polish playbook done for FE launch bar (via internal Impeccable `polish`)
- [ ] Auth path works on one real happy + one denial path (evidence)
- [ ] Doc sync: PRODUCT/CONTRACT match what ships

## Flow

1. Run the checklist; cite evidence.
2. For missing craft release work, **load and execute** internally (same as [build.md](build.md)):
   - backend → Keel `reference/ship.md`
   - frontend → Impeccable `reference/polish.md`
3. Do **not** ask the user to paste `/keel ship` or `/impeccable polish`.
4. Do **not** mark Bridge “shipped” if CONTRACT still `draft` unless user overrides in writing.
5. Close with Bridge-only next commands if anything remains (`/bridge sync`, `/bridge build …`).

## Refuse

- Shipping with known P0 contract mismatches
- Replacing craft release playbooks with a vague “LGTM”
- Surfacing other skills’ commands in the ship report
