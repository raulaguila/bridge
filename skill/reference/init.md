# init

Bootstrap **shared** product truth for a FE+BE effort.

## Flow

1. If `PRODUCT.md` exists, read it — merge, don’t blind overwrite.
2. Interview only what’s missing (users, purpose, platform, constraints). Prefer short options.
3. Write `PRODUCT.md` from [../assets/templates/PRODUCT.md](../assets/templates/PRODUCT.md) in the **user’s language**.
4. If `CONTRACT.md` missing, write a **stub** (Status: draft, empty API table) from the contract template — do not invent endpoints.
5. Tell the user the next Bridge step is usually `/bridge contract` then `/bridge plan`.

## Refuse

- Filling Scale & SLOs with invented numbers
- Generating DESIGN.md or ARCHITECTURE.md here (delegate `document` to each skill later)
