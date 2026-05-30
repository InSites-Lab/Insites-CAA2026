# CBSA Gemini Gem — v9 (split-gem fit to 3.1-pro), FULL bundle

A complete, self-contained upload set for the InSites CBSA bot as a **Google Gemini Gem**.
**Version: v9 — split-gem fit to 3.1-pro.** It pairs the **full canonical methodology (zero omissions)**
with **execution-hardening** that front-loads the sandbox / RTL / determinism rules so Gemini follows them
reliably at generation time.

Filenames here are **exactly** the names the system prompt's loading table references (`ca-kg.md`,
`ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md`) — so on-demand loading resolves correctly.

## How to deploy (fat-core model)

1. **Gem Instructions** ← paste the entire content of `cbsa-main.md`.
   It already inlines governance + the Hebrew overlay `[CA-HE]` + Stages 0–6 + Session Report + the full
   Reference taxonomies, so `cbsa-stages.md` / `cbsa-reference.md` are **not** uploaded separately.
2. **Gem Knowledge** ← upload these 5 files (flat, no folders):
   - `ca-kg.md` — Knowledge Graph app
   - `ca-db.md` — Dashboard app — contains `[CA-DB-F]` foundation + `[CA-DB]` single-assessment + `[CA-DB-C]` collection (one file, by design)
   - `ma-ra.md` — Read-Assessment workflow
   - `ma-rc.md` — Read-Collection workflow
   - `ca-img.md` — Image-analysis aid
3. Remind users to **activate Canvas mode** before requesting an artifact (KG / Dashboard) — otherwise
   Gemini outputs the code as text.

## File manifest

| File | Role | Basis |
|---|---|---|
| `cbsa-main.md` | Instructions (paste) | canonical `cbsa-main` fat-core + 3 framing blocks |
| `ca-kg.md` | Knowledge | canonical `cbsa-split/ca-kg.md` body + `<EXECUTION_HARDENING>` header |
| `ca-db.md` | Knowledge | canonical `cbsa-split/ca-db.md` body (`[CA-DB-F]`+`[CA-DB]`+`[CA-DB-C]`) + `<EXECUTION_HARDENING>` header |
| `ma-ra.md`, `ma-rc.md`, `ca-img.md` | Knowledge | canonical `cbsa-split/`, content-identical (blank-line cleanup only) |

## Where is the Collection Dashboard (CA-DB-C)?

Inside `ca-db.md`, as the `[CA-DB-C]` section — exactly as the canonical Gemini split ships it. A single
`ca-db.md` holds the shared foundation `[CA-DB-F]` once, then both the single-assessment (`[CA-DB]`) and
collection (`[CA-DB-C]`) specs. Keeping them in one file avoids duplicating `[CA-DB-F]` and matches the
prompt's routing (the "dashboard" trigger and the MA-RC collection-dashboard hand-off both resolve to
`ca-db.md`). Gemini Pro 3.1's separate `CA-DB-C.md` (a lossy split-out) is discarded.

## Design guarantee — zero methodological loss

- Every **non-blank** line of the app-spec bodies is preserved verbatim from the canonical Gemini split
  (`InSites-Brain/Gemini/cbsa-split/`), verified by a line-sequence comparison (0 mismatches).
- The only intentional content edits vs. canonical are the two the user authorised in v9:
  (a) version label → `v9 - split-gem fit to 3.1-pro`; (b) entity-type reconciliation (see below).
- All execution hardening lives **only** in the prepended `<EXECUTION_HARDENING>` / framing blocks. Those
  **restate** rules already in the bodies (for prominence) — they never drop or reorder content.
- Redundant blank lines (the single blank between every table row / list item) were removed, which also
  repairs the in-chat Markdown tables. No content line was changed by that cleanup.

## v9 changes (vs. the first FULL bundle)

1. **Version** unified to `v9 - split-gem fit to 3.1-pro` across all files (header + body labels).
2. **Entity types reconciled to 15.** `[CA-EC]` (English) gained **`Heritage Asset`** to match the Hebrew
   KG list in `[CA-HE]` and the `kg-runtime.js` TYPE_PAIRS; `ca-kg.md` now reads "outside all 15
   categories." The "propose a new type → mark `interpretive` (💭) + `epistemic_note`" rule is confirmed
   present (in `[CA-EC]` Proposed-types note and `ca-kg.md` extraction step).
3. **Whitespace cleaned** — inter-row / inter-item blank lines removed across all 6 files.
4. **Filenames** set to the routing-correct lowercase names (`ca-kg.md`, `ca-db.md`, `cbsa-main.md`).
5. **RTL chat tables → natural column order.** `[CA-HE]` Table Header Maps now list columns in natural
   logical order (first column = rightmost in RTL), replacing the earlier reversed/LTR workaround. Still no U+200F.
6. **`cbsa-main.md` QA.** Code-fence phasing fixed (no headings/tables trapped in code blocks); `[CA-HE]` +
   stages render as proper Markdown.

## What was rejected (do not upload)

The three files in the sibling folder `gemini suggestions for html apps/` are Gemini Pro 3.1's "performance"
rewrites — **net regressions**, discarded:
- `CA-DB.md` — 103-line fragment vs. ~896 canonical; ~11 of 12 tabs gone; live AI-Query downgraded to a
  static "prompt generator"; **Chart.js rule reversed** (told the model to set `maintainAspectRatio:false`).
- `CA-KG.md` — dropped entity-taxonomy linkage, the Analytics tab, the context-effect + HITL offers, and the
  final checklist; corrupted the D3 `<script>` line.
- `CA-DB-C.md` — lossy split-out of canonical `ca-db.md` §`[CA-DB-C]`.

## Status — this IS the maintained Gemini split

- `gem-split/` (this folder) is now the **maintained split** for Gemini. The earlier `cbsa-split/` and the
  `cbsa-split (Gem 3.1 pro suggestion)/` review folder were retired to `OLD/`.
- The monolithic `InSites-CAA-GEM-v9.md` (Gemini root) carries the **same content** in one file; keep the two
  in sync when methodology changes (edit here, then mirror the change into the mono).

## Remaining note (inherited, by design — not a bug)

- Accent colours differ **by app on purpose**: KG `#3b82f6`, single-assessment dashboard `#2563eb`,
  collection dashboard stone/amber. Do not "harmonize" them.
