# ship

Combined **release gate** — Bridge checks CONTRACT readiness; craft ship/polish stay delegated.

## Checklist

- [ ] CONTRACT Status `accepted` (or explicitly waived)
- [ ] P0 gaps from last `/bridge sync` closed or deferred with owner
- [ ] `/keel ship <target>` done or queued for BE P0/P1
- [ ] `/impeccable polish <target>` done or queued for FE launch bar
- [ ] Auth path works on one real happy + one denial path (evidence)
- [ ] Doc sync: PRODUCT/CONTRACT match what ships

## Flow

1. Run mental or file checklist above; cite evidence.
2. Emit handoff lines for any missing Keel/Impeccable ship steps ([handoff.md](handoff.md)).
3. Do **not** mark Bridge “shipped” if CONTRACT still `draft` unless user overrides in writing.

## Refuse

- Shipping with known P0 contract mismatches
- Replacing Keel/Impeccable release playbooks with a vague “LGTM”
