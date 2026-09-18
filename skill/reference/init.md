# init

Bootstrap **shared** product truth for a FE+BE effort, then finish **both** craft inits (Keel + Impeccable).  
`/bridge init` is incomplete if only one craft skill ran.

## Flow

### A. Shared product (Bridge owns this interview)

1. If `PRODUCT.md` exists, read it — merge, don’t blind overwrite.
2. Interview only what’s missing for **both** backend and frontend (users, purpose, platform, stack BE+FE, operating context, constraints). Prefer short options.
3. Write `PRODUCT.md` from [../assets/templates/PRODUCT.md](../assets/templates/PRODUCT.md) in the **user’s language**. Keep **all three** schema stamps from the template (`bridge`, `keel`, `impeccable`) so either craft skill accepts the file.
4. If `CONTRACT.md` missing, write a **stub** (Status: draft, empty API table) from the contract template — do not invent endpoints.

### B. Craft init — both required (do not skip Keel)

Bridge does not replace Keel or Impeccable init. After A, you **must** complete both sides in this same `/bridge init` turn (or the immediate follow-up if the harness forces one skill load at a time).

1. **Keel (backend) — required**  
   - Load the installed Keel skill’s `reference/init.md`.  
   - Finish remaining Keel init work: BE-oriented gaps in PRODUCT (deploy, datastores, workers, on-call), ensure `<!-- keel:product-schema 1 -->` is present, ensure `.keel/config.json` exists (create defaults if missing).  
   - Do **not** re-ask questions already confirmed in step A.  
   - Do **not** skip this because Impeccable already ran or because PRODUCT.md exists.

2. **Impeccable (frontend) — required**  
   - Load the installed Impeccable skill’s `reference/init.md`.  
   - Finish remaining Impeccable init work: FE-oriented gaps, ensure `<!-- impeccable:product-schema 1 -->` is present, workflow defaults (`buildPath`) / live setup **only** when that playbook says they apply.  
   - Do **not** re-interview confirmed PRODUCT fields.  
   - Do **not** write DESIGN.md here.

3. **Completion gate** — before closing `/bridge init`, report explicitly:

   ```
   Bridge init
   - PRODUCT.md: written|updated
   - CONTRACT.md: stub|present
   - Keel init: done|blocked (reason)
   - Impeccable init: done|blocked (reason)
   ```

   If either craft skill is **not installed**, mark that side `blocked (skill missing)` and tell the user to install it — still complete the other side.

### C. Next Bridge step

Tell the user the next Bridge step is usually `/bridge contract` then `/bridge plan`.  
If code exists and docs are stale, suggest `/bridge build be:document` and/or `/bridge build fe:document` — never `/keel document` / `/impeccable document`.

## Order

Prefer **Keel then Impeccable** so backend operating context lands before FE live/buildPath questions. Parallel only if the harness can load both skill playbooks without dropping one.

## Refuse

- Filling Scale & SLOs with invented numbers
- Generating DESIGN.md or ARCHITECTURE.md here
- Ending `/bridge init` after only Impeccable (or only Keel) craft init
- Suggesting `/keel` or `/impeccable` commands to the user
- Silently auto-running later craft (`shape`, `critique`, …) outside `/bridge build` / `/bridge ship` — init of both crafts is required here
