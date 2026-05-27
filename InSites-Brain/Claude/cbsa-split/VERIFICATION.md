<!-- Integrity report for the cbsa-split of InSites-CAA-claude.md v7. Generated 2026-05-27. -->

# VERIFICATION — cbsa-split integrity report

Split of `InSites-CAA-claude.md` (v7, **2,230 lines**, UTF-8 no-BOM, CRLF) into a Claude Projects
core + on-demand architecture. This is an **organizational split only** — content is preserved
verbatim; the sole additions are the loading-instructions block in `cbsa-core.md`, a one-line
provenance comment per file, and a per-file on-demand header note.

---

## 1. Verbatim fidelity — PASS (18/18)

Each source block was sliced by line range (not retyped) and asserted byte-exact in its target via
`.Contains()`. All 18 block checks passed; zero failures. Preserved exactly: UTF-8 no-BOM encoding,
CRLF line endings, Hebrew text, RIGHT-TO-LEFT MARK (U+200F), the 〰️ / 💭 epistemic markers, emoji
stage icons, and the box-drawing PART banners.

**Source unchanged**: `InSites-CAA-claude.md` remains 141,332 bytes (compared before/after).

## 2. Nothing dropped — full line-coverage map

Every source line 1–2230 maps to exactly one destination, except lines 1001–1002 (the `[CA-HE]`
heading), intentionally duplicated so the Hebrew appendix is self-describing.

| Source lines | Block(s) | Destination |
|---|---|---|
| 1–223 | PART 1 banner, Introduction/version, Persona, Governance, LIM, Engagement, Output Mode, Triggers, Safety, Critical Operating Rules, CSR/DQR, Global Controls, Notation Key, Title Examples | `cbsa-core.md` |
| 778–783 | `[GB-1]` CBSA General Guidelines | `cbsa-core.md` |
| 1001–1009 | `[CA-HE]` heading + Rendering Directive | `cbsa-core.md` |
| 224–770 | PART 2 banner, Stage-Specs header, Stages 0–6, `[CA-IP]` Session Report | `cbsa-stages.md` |
| 1047–1261 | PART 4 banner, `Write → Visualize` divider, `[CA-KG]` | `apps/ca-kg-knowledge-graph.md` |
| 1262–1695 | `[CA-DB-F]`, `[CA-DB]`, `[CA-RPT]`, `[CA-AIQ]` | `apps/ca-db-dashboard.md` |
| 1696–1959 | `Read → Analyze → Visualize` divider, `[MA-RA]` | `apps/ma-ra-read-assessment.md` |
| 1960–2101 | `[MA-RC]` | `apps/ma-rc-read-collection.md` |
| 2102–2230 | `[CA-DB-C]`, `[CA-AIQ]`, `[CA-UX]`, END marker | `apps/ca-db-c-collection-dashboard.md` |
| 771–777 | PART 3 banner | `appendices/appendix-values-contexts.md` |
| 784–857 | `[CA-V]`, `[CA-C]`, `[CA-T]` | `appendices/appendix-values-contexts.md` |
| 907–962 | `[CA-CS]`, `[CA-EV]` | `appendices/appendix-values-contexts.md` |
| 858–896 | `[SM-3]` Integrity & Nara Grid | `appendices/appendix-nara-grid.md` |
| 897–906 | `[CA-E]` Examples & Phrasing | `appendices/appendix-examples.md` |
| 963–977 | `[CA-IMG]` Image Analysis | `appendices/appendix-image-analysis.md` |
| 978–1000 | `[CA-EC]` Entity Categories | `appendices/appendix-entity-categories.md` |
| 1001–1002 + 1010–1046 | `[CA-HE]` heading (repeat) + terminology maps | `appendices/appendix-hebrew-overlay.md` |

**Reconciliation**: Σ(block sizes) = **2,232** = 2,230 unique source lines + 2 duplicated `[CA-HE]`
heading lines. No gaps, no orphaned lines.

## 3. No duplication introduced by the split

- **`[CA-AIQ]` AI Query Tab appears twice** — inside `[CA-DB]` (≈src 1672) and `[CA-DB-C]` (≈src 2205).
  This duplication exists in the **source** and is preserved verbatim; it was **not** introduced here.
- **`[CA-HE]` heading (lines 1001–1002)** appears in both `cbsa-core.md` and `appendix-hebrew-overlay.md`
  — the single intentional duplication, so the appendix is self-describing. The directive body
  (1003–1009) is in core only; the maps (1010–1046) are in the appendix only — no content overlap.
- No other content appears in more than one file.

## 4. References — resolution mechanism

Inline cross-references in the source use bracket codes (`[CA-V]`, `[SM-3]`, `[CSR]`, …). Rather than
rewrite every inline mention (which would violate the verbatim mandate), references are resolved by:

1. **`Code → file resolution` table in `cbsa-core.md`** (always in context) — maps every code to the
   file it now lives in. This is the authoritative router.
2. **Per-file on-demand header** — each loaded file states that codes referenced-but-not-defined
   resolve via the core map.
3. **Explicit dependency note** — `ca-db-c-collection-dashboard.md` carries an HTML-comment stating it
   also requires `ca-db-dashboard.md` for the shared foundation `[CA-DB-F]`.

Result: any `[CA-X]` encountered in any file is resolvable to its current location.

## 5. Cognitive self-containment

Each on-demand file is usable on its own given the data-extraction context that comes from the stages.
The **one deliberate cross-file dependency** — collection dashboard → `[CA-DB-F]` (in the assessment
dashboard file) — is stated explicitly in the file header and in the core loading table.

## 6. Scaffolding & seam notes (full disclosure)

- **PART banners** (PART 1/2/3/4) and the two app-group dividers (`Write → Visualize`,
  `Read → Analyze → Visualize`) are monolith navigation scaffolding. Each travels verbatim at the top
  of the first file of its group (PART 1 → core; PART 2 → stages; PART 3 → values-contexts;
  PART 4 + `Write → Visualize` → ca-kg; `Read → Analyze → Visualize` → ma-ra). The `END OF MASTER
  PROMPT` marker sits at the tail of `ca-db-c-collection-dashboard.md`.
- **`appendix-values-contexts.md` ordering**: its members are non-contiguous in the source
  (`[SM-3]` + `[CA-E]` sit between them); they are regrouped into one file in source order
  (V → C → T → CS → EV). No text changed.
- **Pre-existing source quirks preserved (not "fixed")**: `[CA-DB]`'s `§9a [CA-AIQ]` and `Reference
  Implementation` sit after `§10 Final Checklist`; `[CA-AIQ]` is duplicated across the two dashboards.
- **Seam whitespace**: at the few assembly seams in the 3 composed files (core, values-contexts,
  hebrew-overlay), blank separator lines join formerly-adjacent-now-separate blocks. These are
  whitespace-only and markdown-invisible; no semantic text was added or removed.

## 7. Additions (the only non-verbatim content)

- `cbsa-core.md`: the `## File Loading Instructions — Mandatory` block (loading table + artifact
  self-check + Code→file resolution).
- Every file: a one-line provenance HTML comment; on-demand files also carry a one-line header note.

These are the only changes to content beyond pure re-organization.
