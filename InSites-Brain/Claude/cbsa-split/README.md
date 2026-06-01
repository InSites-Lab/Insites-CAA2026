# cbsa-split — CBSA master prompt, split for Claude Projects

A split of `../InSites-CAA-claude.md` (v7) into **7 flat content files** plus this README and
`VERIFICATION.md`. As of the fat-spine restructure, the split keeps a **fat always-in-context spine**
(governance + the full CBSA Stages 0–6 + the Reference appendices) and loads only the genuine
one-shot utilities (Session Report, KG, Dashboard, Read workflows, Image) on demand.

**Why fat-spine?** The CBSA stages are a *sequential* process needed in context on every turn; loading
them on-demand risks stage-skipping/mis-numbering (the failure mode seen when stages are treated as a
retrievable appendix). Claude.ai prompt-caches the Project Instructions, so the larger always-on spine
costs full price once and ~cache-read every later turn. Anything that fires **once** (Session Report,
KG, Dashboard, Reads, Image) stays on-demand and XML-triggered.

## Architecture

- **`cbsa-core.md`** is **always in context** — it becomes the Claude.ai Project **Instructions**.
  It holds the persona, language policy, governance, critical operating rules, theoretical frameworks
  (CSR/DQR), global controls, the full Hebrew overlay (`[CA-HE]`), a `<FILE_LOADING_ROUTER>` that tells
  the bot which on-demand file to read before each utility, **and — inline as PART 2 and PART 3 — the
  full CBSA Stages 0–6 and the Reference appendices**.
- The **other 6 files are loaded on demand** per the `<FILE_LOADING_ROUTER>` in core:

  | When | Load |
  |---|---|
  | Session Report / Debrief, after Stage 6 confirmed | `ca-ip.md` |
  | "kg" / "knowledge graph" | `ca-kg.md` |
  | "dashboard" | `ca-db.md` |
  | "read assessment" | `ma-ra.md` |
  | "read collection" | `ma-rc.md` |
  | image analysis | `ca-img.md` |

  Stages 0–6 and the Reference appendices are **not** loaded — they are always in context inside
  `cbsa-core.md`.

- **`cbsa-core.md`** (PART 2) — Stages 0–6. **(PART 3)** — the methodological vocabulary:
  `[GB-1]`, `[CA-V]`, `[CA-C]`, `[CA-T]`, `[CA-CS]`, `[CA-EV]`, `[CA-E]`, `[SM-3]`, `[CA-EC]`.
- **`ca-ip.md`** — `[CA-IP]` Session Report (one-shot, fires once at the end of a session).
- **`ca-kg.md`** — `[CA-KG]` Knowledge Graph spec.
- **`ca-db.md`** — `[CA-DB-F]` foundation + `[CA-DB]` assessment dashboard (incl. `[CA-RPT]`, `[CA-AIQ]`)
  + `[CA-DB-C]` collection dashboard.
- **`ma-ra.md`** / **`ma-rc.md`** — Read-Assessment / Read-Collection workflows.
- **`ca-img.md`** — `[CA-IMG]` image analysis aid.

Cross-references **inside `cbsa-core.md`** are written as "see X in this document"; references from an
on-demand file back to the always-on spine are written as "see X in cbsa-core.md".

## Epistemic transparency (〰️ / 💭)

InSites makes the model's interpretive work **visible** rather than hiding it. Every element carries an
epistemic status, defined by the **Global Notation Key** + **Per-Claim Epistemic Gate** in `cbsa-core.md`:

- *(no mark)* — **sourced**: explicit in the user's material.
- `〰️` — **inferred**: connected from 2+ pieces of evidence (cite them).
- `💭` — **interpretive** ("cloud"): a reading a reasonable peer could contest.

This notation runs inline through **all stages** (Stages 0–6 in `cbsa-core.md`) — and, as of this version,
through the **Knowledge Graph** too, so the KG no longer flattens the epistemic layer the stage prose carries.

### In the Knowledge Graph (`ca-kg.md`)

- Each node has an `epistemic` field (`sourced` default / `inferred` / `interpretive`) plus an
  `epistemic_note` (≤15-word rationale) when not sourced.
- The marker appears **only in the Info tab when a node is clicked** — never on the node glyph or colour,
  so the graph and the `[CA-EC]` colour map are unchanged.
- The **Analytics tab** carries a **"💭 Entities to review (N)"** report: clickable cards for every
  interpretive (and inferred) node. Hidden when none exist (N = 0).
- **HITL moment** — after generating the KG, the bot offers to **confirm / rename / reject /
  cite-and-promote** the 💭 entities (the decision happens in chat, since the artifact can't write back).
  Skipped when N = 0.
- A **proposed entity type** (outside the `[CA-EC]` list in `cbsa-core.md`) renders with the
  *closest existing category's colour* and is flagged `interpretive` 💭 — no colour-map change.

> Scope: this is live for the **Claude** artifact (bot-written, driven by the spec). Mirroring the KG
> epistemic layer into the GPT runtime (`kg-runtime.js`) and Gemini is a pending follow-up.

## Installation (Claude.ai Project)

1. Paste the entire content of **`cbsa-core.md`** (the fat spine — governance + Stages 0–6 + Reference)
   into the Project **Instructions** (custom instructions).
2. Upload the other **6 content files** as Project **Files**:
   `ca-ip.md`, `ca-kg.md`, `ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md`.
3. Optionally upload `README.md` and `VERIFICATION.md` as Project Files for reference.
4. All files are flat (no folders), matching how Claude Projects stores uploaded files.

## Maintenance — where to edit

- **A stage (0–6)** → `cbsa-core.md` PART 2. **The Session Report** → `ca-ip.md`.
- **A value type, context, change type, comparison/evidence criterion, Nara Grid theory, entity
  category, or phrasing aid** → `cbsa-core.md` PART 3 (Reference). Stages link to these as
  "see [CODE] in this document".
- **KG spec** → `ca-kg.md`. **Dashboards** → `ca-db.md`. **Read workflows** → `ma-ra.md` / `ma-rc.md`.
  **Image analysis** → `ca-img.md`.
- **Persona, governance, rules, notation, Hebrew overlay, the `<FILE_LOADING_ROUTER>`, Stages, or
  Reference** → `cbsa-core.md`. The spine carries everything the bot needs on *every* turn; only
  one-shot utilities live in on-demand files plus a row in the `<FILE_LOADING_ROUTER>`.
- **Adding/moving a code** → update the `<FILE_LOADING_ROUTER>` and any "see X in <file>.md" / "see X in
  this document" cross-references.
- **Epistemic notation** (`〰️`/`💭`) → the general rule is in `cbsa-core.md` (Global Notation Key + Per-Claim Epistemic Gate); the KG entity-level layer (the `epistemic` field, Info-tab display, "Entities to review" report, and After-KG HITL offer) is in `ca-kg.md`.
- The split derives from `../InSites-CAA-claude.md` (v7), which remains the source-of-truth; `VERIFICATION.md`
  records exactly which source lines went where.
