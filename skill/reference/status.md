# status

Read-only pulse for the **combined** effort.

## Report

```markdown
## Bridge status

PRODUCT: present | missing
CONTRACT: missing | draft | accepted · N APIs
ARCHITECTURE: present | missing
DESIGN: present | missing

Keel: <keel status one-liner or “not installed / no snapshot”>
Impeccable: <artifacts / hook note or “not installed”>

### Open gaps
- …
```

## Flow

1. Check files on disk (PRODUCT, CONTRACT, ARCHITECTURE, DESIGN).
2. If Keel scripts exist: `node <keel-skill>/scripts/status.js --json` when useful.
3. Do not invent critique scores. Missing = say missing.
4. Open gaps → next-commands only for those gaps.
