# gemini cbsa-split — CBSA master prompt, split for a Gemini Gem

A split of `../InSites-CAA-GEM.md` into the same 8-flat-file architecture as the Claude split, adapted
for **Gemini**. A thin always-in-context core plus on-demand files, so the bot reads the precise spec for
a task instead of relying on memory of the whole prompt.

> **Status — derived artifact.** `../InSites-CAA-GEM.md` remains the source-of-truth; this is a faithful
> re-organization of it (content verbatim except the Loading Block + cross-reference updates — see
> `VERIFICATION.md`).

## Architecture

- **`cbsa-core.md`** is **always in context** — it becomes the **Gem Instructions**. Persona, language
  policy, governance (incl. Session Activation / Pro Mode), Critical Operating Rules, CSR/DQR, Global
  Controls, the **full Hebrew overlay** (`[CA-HE]`), and a **mandatory Loading Block** (trigger → files).
- The **other 7 files are loaded on demand** per the Loading Block:

  | When | Load |
  |---|---|
  | any stage 0–6 / returning to a stage / single stage | `cbsa-stages.md` + `cbsa-reference.md` |
  | "kg", "knowledge graph", "create kg" | `ca-kg.md` + `cbsa-reference.md` |
  | "dashboard" | `ca-db.md` + `cbsa-stages.md` |
  | "read assessment" | `ma-ra.md` + `cbsa-reference.md` |
  | "read collection" | `ma-rc.md` + `cbsa-reference.md` |
  | image analysis | `ca-img.md` |

- **`cbsa-stages.md`** — Stages 0–6 + Session Report `[CA-IP]`.
- **`cbsa-reference.md`** — `[GB-1]`, `[CA-V]`, `[CA-C]`, `[CA-T]`, `[SM-3]`, `[CA-E]`, `[CA-CS]`, `[CA-EV]`, `[CA-EC]`.
- **`ca-kg.md`** — `[CA-KG]` Knowledge Graph (with the **live Gemini-API** AI-Query, §4j).
- **`ca-db.md`** — `[CA-DB-F]` + `[CA-DB]` + `[CA-DB-C]`.
- **`ma-ra.md`** / **`ma-rc.md`** — Read-Assessment / Read-Collection.
- **`ca-img.md`** — `[CA-IMG]` image analysis.

Cross-references resolve as "see X in <file>.md".

## Gemini specifics (preserved — differ from Claude/GPT)

- **Live Gemini API for AI-Query** — KG and dashboards call `generativelanguage.googleapis.com`
  (`gemini-2.5-flash…:generateContent`) with exponential backoff + `parseMarkdown`. **Not** placeholder mode.
- **Canvas activation required** — in Gemini you must **activate Canvas mode** before generating an
  artifact, or it outputs code as text.
- **Canvas sandbox** — wrap storage/history/print/blob calls in try-catch; all artifact JS goes in an
  **IIFE** (no global-scope `top`/`name`/… collisions). Google Maps tiles + RTL auto-detect retained.
- Artifacts are **vanilla JS + D3/Leaflet/Chart.js via cdnjs** — single self-contained HTML, no ESM/JSX.

## Epistemic transparency (〰️ / 💭)

Same as the Claude split: every element carries an epistemic status (sourced / inferred `〰️` /
interpretive `💭`), defined in `cbsa-core.md` (Global Notation Key + Per-Claim Epistemic Gate) and run
through all stages. In the **Knowledge Graph** (`ca-kg.md`): each node has an `epistemic` field +
`epistemic_note`, surfaced **only in the Info tab on click** + a **"💭 Entities to review (N)"** report in
Analytics; after generating a KG the bot makes an **HITL offer** to confirm/rename/reject/promote the 💭
entities (chat-based — coexists with the live in-artifact AI-Query). A proposed entity type renders with
the closest category colour and is flagged `interpretive`.

## How to install (Gemini Gem)

1. Paste the entire content of **`cbsa-core.md`** into the Gem **Instructions**.
2. Upload the other **7 content files** as Gem **Knowledge**: `cbsa-stages.md`, `cbsa-reference.md`,
   `ca-kg.md`, `ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md` (optionally README + VERIFICATION).
3. Remind users to **activate Canvas mode** before requesting an artifact (KG / Dashboard).
4. All files are flat (no folders).

## How to maintain
- Edit a spec only in its own file (stage → `cbsa-stages.md`; vocabulary → `cbsa-reference.md`; KG →
  `ca-kg.md`; dashboards → `ca-db.md`; read workflows → `ma-ra.md`/`ma-rc.md`; image → `ca-img.md`).
- Persona/governance/notation/Hebrew overlay/Loading Block → `cbsa-core.md`; keep core thin.
- **Epistemic notation** (`〰️`/`💭`) → general rule in `cbsa-core.md`; KG entity-level layer in `ca-kg.md`.
- The split derives from `../InSites-CAA-GEM.md` (source-of-truth); `VERIFICATION.md` records which source
  lines went where. Edit the mono, then re-derive/sync the affected split file.
