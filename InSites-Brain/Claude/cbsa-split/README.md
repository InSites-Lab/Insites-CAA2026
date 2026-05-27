<!-- Part of the cbsa-split derived from InSites-CAA-claude.md v7 (2026-05-27). -->

# cbsa-split — CBSA master prompt, split for Claude Projects

A core + on-demand reorganization of `../InSites-CAA-claude.md` (v7). The goal: keep a thin prompt
always in context and load detailed specs only when their trigger fires, so the bot reads the precise
spec for a task instead of leaning on general patterns.

> **Status — derived artifact, not (yet) a deployment target.** The mono `../InSites-CAA-claude.md`
> remains the source-of-truth. This split is a faithful re-organization of it (content verbatim — see
> `VERIFICATION.md`). Whether it becomes the deployed form is an open decision.

## Architecture

- **`cbsa-core.md`** — always in context. Persona, governance, LIM, epistemic notation, global controls,
  triggers, `[GB-1]`, the Hebrew rendering directive, and a **mandatory file-loading block** (trigger →
  file table + artifact self-check + `Code → file` resolution map).
- **`cbsa-stages.md`** — Stages 0–6 + Session Report `[CA-IP]`, kept as one file (stages cross-reference
  each other and users navigate non-linearly).
- **`apps/`** — one file per post-assessment application: Knowledge Graph, Assessment Dashboard,
  Collection Dashboard, Read-Assessment, Read-Collection. Loaded only on explicit request.
- **`appendices/`** — reference vocabularies and aids (values/contexts, entity categories, Hebrew
  terminology maps, Nara Grid, examples, image analysis). Loaded only when used.

## How to install (Claude.ai Project)

Claude Projects uploads files **flat** (no real subdirectories). The `apps/` and `appendices/` folders
here are logical grouping only — flatten them at upload time.

1. Paste the full content of **`cbsa-core.md`** into the Project **Instructions** field (custom
   instructions). This is the only always-in-context piece.
2. Upload **every other file** as Project **knowledge files** (flattened): `cbsa-stages.md`, the 5
   `apps/*.md`, and the 6 `appendices/*.md`.
3. The loading block in the core instructs the bot to read the relevant file before acting on each
   trigger ("kg", "dashboard", a stage, Hebrew output, etc.).

## How to maintain

- **Edit a spec only in its own file.** A stage change goes in `cbsa-stages.md`; a KG change in
  `apps/ca-kg-knowledge-graph.md`; a value-type change in `appendices/appendix-values-contexts.md`.
  Never duplicate spec content back into `cbsa-core.md`.
- **The core stays thin.** Only add to core what the bot must act on in *every* interaction. New
  detailed content belongs in a stage/app/appendix file plus a row in the core loading table.
- **Cross-references** resolve via the `Code → file` table in `cbsa-core.md`. If you add or move a code,
  update that table.
- **Drift warning.** Each file carries a provenance comment pointing back to `../InSites-CAA-claude.md`
  v7. If you edit the mono, re-derive or hand-sync the affected split file. `VERIFICATION.md` documents
  exactly which source lines went where.

## Files

```
cbsa-core.md                                  Project Instructions field
cbsa-stages.md                                Stages 0–6 + Session Report [CA-IP]
apps/ca-kg-knowledge-graph.md                 [CA-KG]
apps/ca-db-dashboard.md                        [CA-DB-F] + [CA-DB] + [CA-RPT] + [CA-AIQ]
apps/ca-db-c-collection-dashboard.md           [CA-DB-C]  (also needs ca-db-dashboard.md for [CA-DB-F])
apps/ma-ra-read-assessment.md                  [MA-RA]
apps/ma-rc-read-collection.md                  [MA-RC]
appendices/appendix-values-contexts.md         [CA-V] [CA-C] [CA-T] [CA-CS] [CA-EV]
appendices/appendix-entity-categories.md       [CA-EC]
appendices/appendix-hebrew-overlay.md          [CA-HE] terminology maps
appendices/appendix-nara-grid.md               [SM-3]
appendices/appendix-examples.md                [CA-E]
appendices/appendix-image-analysis.md          [CA-IMG]
README.md / VERIFICATION.md                    this file / integrity report
```
