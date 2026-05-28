# cbsa-split — CBSA master prompt, split for Claude Projects

A split of `../InSites-CAA-claude.md` (v7) into **8 flat content files** plus this README and
`VERIFICATION.md`. The split keeps a thin always-in-context core and loads detailed specs on demand,
so the bot reads the precise spec for a task instead of relying on memory of the whole prompt.

## Architecture

- **`cbsa-core.md`** is **always in context** — it becomes the Claude.ai Project **Instructions**.
  It holds the persona, language policy, governance, critical operating rules, theoretical frameworks
  (CSR/DQR), global controls, the full Hebrew overlay (`[CA-HE]`), and a **mandatory Loading Block**
  that tells the bot which file(s) to read before each action.
- The **other 7 files are loaded on demand** per the Loading Block in core:

  | When | Load |
  |---|---|
  | any stage 0–6 / returning to a stage / single stage | `cbsa-stages.md` + `cbsa-reference.md` |
  | "kg" / "knowledge graph" | `ca-kg.md` + `cbsa-reference.md` |
  | "dashboard" | `ca-db.md` + `cbsa-stages.md` |
  | "read assessment" | `ma-ra.md` + `cbsa-reference.md` |
  | "read collection" | `ma-rc.md` + `cbsa-reference.md` |
  | image analysis | `ca-img.md` |

- **`cbsa-stages.md`** — Stages 0–6 + Session Report `[CA-IP]`.
- **`cbsa-reference.md`** — the methodological vocabulary: `[GB-1]`, `[CA-V]`, `[CA-C]`, `[CA-T]`,
  `[CA-CS]`, `[CA-EV]`, `[CA-E]`, `[SM-3]`, `[CA-EC]`.
- **`ca-kg.md`** — `[CA-KG]` Knowledge Graph spec.
- **`ca-db.md`** — `[CA-DB-F]` foundation + `[CA-DB]` assessment dashboard (incl. `[CA-RPT]`, `[CA-AIQ]`)
  + `[CA-DB-C]` collection dashboard.
- **`ma-ra.md`** / **`ma-rc.md`** — Read-Assessment / Read-Collection workflows.
- **`ca-img.md`** — `[CA-IMG]` image analysis aid.

Cross-references between files are written as "see X in <file>.md" so any code resolves to its file.

## Installation (Claude.ai Project)

1. Paste the entire content of **`cbsa-core.md`** into the Project **Instructions** (custom instructions).
2. Upload the other **7 content files** as Project **Files**:
   `cbsa-stages.md`, `cbsa-reference.md`, `ca-kg.md`, `ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md`.
3. Optionally upload `README.md` and `VERIFICATION.md` as Project Files for reference.
4. All files are flat (no folders), matching how Claude Projects stores uploaded files.

## Maintenance — where to edit

- **A stage / the Session Report** → `cbsa-stages.md`.
- **A value type, context, change type, comparison/evidence criterion, Nara Grid theory, entity
  category, or phrasing aid** → `cbsa-reference.md` (never copy these into a stage — link to them).
- **KG spec** → `ca-kg.md`. **Dashboards** → `ca-db.md`. **Read workflows** → `ma-ra.md` / `ma-rc.md`.
  **Image analysis** → `ca-img.md`.
- **Persona, governance, rules, notation, Hebrew overlay, or the Loading Block** → `cbsa-core.md`.
  Keep core thin: only content the bot needs in *every* interaction belongs here; everything else goes
  in an on-demand file plus a row in the Loading Block.
- **Adding/moving a code** → update the Loading Block and any "see X in <file>.md" cross-references.
- The split derives from `../InSites-CAA-claude.md` (v7), which remains the source-of-truth; `VERIFICATION.md`
  records exactly which source lines went where.
