# VERIFICATION — cbsa-split

## 0. Current architecture — fat-spine restructure (Alt 1′)

The split was subsequently **restructured to a fat spine**. `cbsa-core.md` now carries the always-on
spine inline: **PART 1** (governance/controls/`[CA-HE]`) + **PART 2** (Stages 0–6) + **PART 3**
(Reference appendices). The one-shot Session Report `[CA-IP]` was pulled out to its own on-demand file
`ca-ip.md`. The former `cbsa-stages.md` and `cbsa-reference.md` were **retired** (their content moved
into `cbsa-core.md` PART 2/PART 3; recoverable via git).

**Current file set (8 content files):** `cbsa-core.md` (fat spine, Project Instructions) · on-demand:
`ca-ip.md`, `ca-kg.md`, `ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md`, `test-mode.md` (`/test` self-run).

**Cross-reference convention after restructure:** inside `cbsa-core.md`, former cross-file pointers to
`cbsa-stages.md`/`cbsa-reference.md`/`cbsa-core.md` were rewritten to **"in this document"** (all three
parts are co-located). On-demand files (`ca-kg.md`, `ca-db.md`, `ca-img.md`) point back to the spine as
**"in cbsa-core.md"**, and Session-Report pointers were rewritten to **"in ca-ip.md"**. A post-restructure
scan confirmed **zero** residual references to the retired `cbsa-stages.md`/`cbsa-reference.md` filenames.

**Loading Block:** the old "Files to load" table became the XML-tagged `<FILE_LOADING_ROUTER>` — Stages
and Reference are declared always-on (not loaded); only the six one-shot utilities are on-demand.

> §1–§4 below document the **original 8-file organizational split** (historical record) and remain
> accurate for that event; read them together with §0 for the current state.

---

## Original 8-file split (historical record)

Split of `InSites-CAA-claude.md` (v7, **2,230 lines**, UTF-8 no-BOM, CRLF) into 8 flat content files.
Organizational split only: content verbatim; the sole additions are the Loading Block (core) and the
cross-reference updates listed in §3. Source file **not modified** (141,332 bytes before and after).

## 1. Coverage list — every top-level section → file

**`cbsa-core.md`**
- PART 1 banner + Introduction / version line + System Prompt header
- Persona + Language Policy
- **Loading Block** (added — placed after Persona, before Governance)
- Governance (stage flow, activation, upload routing, navigation, rules), Context Recall & Missing Data
- Output Discipline (LIM), Engagement & Visual Clarity, Output Mode, Workflows & Triggers, Safety & Scope
- Critical Operating Rules
- Theoretical Frameworks: CSR + DQR
- Global Controls (Stage Closing, Global Notation Key, Per-Claim Epistemic Gate, Stage Title Examples)
- `[CA-HE]` Hebrew Output Overlay — **full** (Rendering Directive + all terminology maps)

**`cbsa-stages.md`**
- PART 2 banner + Stage Specifications header
- Stages 0, 1, 2, 3, 4, 5, 6 (full, incl. Internal Instructions, Reflections, status lines)
- `[CA-IP]` Session Report (Debrief, format, action tags, signature criteria, rules)

**`cbsa-reference.md`**
- PART 3 banner
- `[GB-1]` CBSA General Guidelines
- `[CA-V]` Value Types · `[CA-C]` Context Types · `[CA-T]` Change Types
- `[SM-3]` Integrity & Nara Grid · `[CA-E]` Examples & Phrasing
- `[CA-CS]` Comparative Significance Criteria · `[CA-EV]` Evidence Types
- `[CA-EC]` Entity Categories

**`ca-img.md`** — `[CA-IMG]` Image Analysis Aid

**`ca-kg.md`** — PART 4 banner + `Write → Visualize` divider + `[CA-KG]` Knowledge Graph (full)

**`ca-db.md`** — `[CA-DB-F]` Dashboard Foundation + `[CA-DB]` Assessment Dashboard (incl. `[CA-RPT]` Report Tab, `[CA-AIQ]` AI Query) + `[CA-DB-C]` Collection Dashboard + END marker

**`ma-ra.md`** — `Read → Analyze → Visualize` divider + `[MA-RA]` Read-Assessment (full)

**`ma-rc.md`** — `[MA-RC]` Read-Collection (full)

**Line reconciliation**: source lines 1–2230 each map to exactly one file (contiguous, no gaps).
Per-file source spans — core 1–223 + 1001–1046; stages 224–770; reference 771–962 + 978–1000;
ca-img 963–977; ca-kg 1047–1261; ca-db 1262–1695 + 2102–2230; ma-ra 1696–1959; ma-rc 1960–2101.
Σ = 2,230. The 8 files total 2,244 lines = 2,230 + 19 (Loading Block in core) − ~5 blank lines
normalized at the 3 non-contiguous seams (whitespace only).

**Verbatim proof**: before the §3 edits, every source span was asserted byte-exact in its target via
`.Contains()` (11/11 PASS). Preserved: UTF-8 no-BOM, CRLF, Hebrew, U+200F RTL marks, 〰️/💭 markers, emojis.

## 2. No duplicates

Each content block appears in exactly one file. Specifically:
- `[CA-HE]` is in `cbsa-core.md` **only** (full overlay; not duplicated anywhere).
- `[CA-EC]` is in `cbsa-reference.md` **only**; KG/dashboard specs point to it (§3), not copy it.
- Stages use **pointers** to taxonomies ("see CA-C in cbsa-reference.md …"), never inline copies — so no
  taxonomy text is duplicated between `cbsa-stages.md` and `cbsa-reference.md` (instruction rule 6 satisfied).
- **Pre-existing intra-file note**: `[CA-AIQ]` AI Query appears twice **within `ca-db.md`** — once in the
  single-assessment spec (§9a) and once in the collection spec (§9). This duplication exists in the source
  (two distinct placeholder specs for two dashboards) and is preserved verbatim. It is **not** cross-file,
  so rule 6 (no duplication *across* files) holds.

## 3. References updated (instruction rule 5)

Every cross-**file** reference was rewritten to name its new home (26 replacement groups). Same-file
references, section headings/definitions, self-references, and external references were left unchanged.

| File | Original | Rewritten to | Count |
|---|---|---|---|
| cbsa-core.md | `[GB-1]` | GB-1 in cbsa-reference.md | 2 |
| cbsa-core.md | `[CA-IMG]` | CA-IMG in ca-img.md | 1 |
| cbsa-core.md | `[CA-IP]` | [CA-IP] in cbsa-stages.md | 2 |
| cbsa-core.md | `[MA-RC]` / `[MA-RA]` / `[CA-KG]` | MA-RC in ma-rc.md / MA-RA in ma-ra.md / CA-KG in ca-kg.md | 1 each |
| cbsa-core.md | `[CA-DB]` | CA-DB in ca-db.md | 2 |
| cbsa-stages.md | `[CA-C]` + `[GB-1]` (line-332 combo) | CA-C / GB-1 in cbsa-reference.md | 1 |
| cbsa-stages.md | `[CA-CS]` | CA-CS in cbsa-reference.md | 1 |
| cbsa-stages.md | `see [CSR]` | see CSR in cbsa-core.md | 6 |
| cbsa-stages.md | `[SM-3]` | SM-3 in cbsa-reference.md | 1 |
| cbsa-stages.md | `[CA-EV]` | CA-EV in cbsa-reference.md | 1 |
| cbsa-reference.md | `see Critical Operating Rules …` | … in cbsa-core.md | 1 |
| cbsa-reference.md | `See Stage 3 for Nara Grid` | See Stage 3 in cbsa-stages.md … | 1 |
| cbsa-reference.md | `[CA-HE]` (PART-3 banner) | CA-HE in cbsa-core.md | 1 |
| ca-img.md | `[CA-V]` | CA-V in cbsa-reference.md | 1 |
| ca-kg.md | `[CA-EC]` | CA-EC in cbsa-reference.md | 7 |
| ca-kg.md | `[CA-V]` | CA-V in cbsa-reference.md | 2 |
| ca-kg.md | `[CA-AIQ]` / `[CA-DB]` | CA-AIQ in ca-db.md / CA-DB in ca-db.md | 1 each |
| ca-db.md | `[CA-EC]` | CA-EC in cbsa-reference.md | 2 |
| ca-db.md | `[CA-V]` / `[CA-KG]` | CA-V in cbsa-reference.md / CA-KG in ca-kg.md | 1 each |
| ca-db.md | `[CA-IP]` | [CA-IP] in cbsa-stages.md | 2 |
| ca-db.md | `[CA-HE]` | CA-HE in cbsa-core.md | 1 |
| ma-ra.md | `[CA-KG]` | CA-KG in ca-kg.md | 1 |

**Left unchanged (correct):**
- *Same-file* refs inside `ca-db.md`: `[CA-DB]`, `[CA-DB-C]`, `[CA-DB-F]`, `[CA-RPT]`, `[CA-AIQ]`.
- *Same-file* refs inside `cbsa-stages.md`: `[CA-IP]` (Session Report is in this file).
- *Self-refs*: `[CA-HE]` in core (Persona line); `[CA-V]` inside reference's SM-3 section.
- *External* (point outside the split, names already given): `[CA-UX]` → `artifact-ux-contract.md`;
  `test-mode.md`; `design/report-tab-spec.md`; `Single-Dashboard-example.html`.

A post-edit scan confirmed **no substring corruption** (no `*.md` immediately followed by `-`/letters,
i.e. `[CA-DB]` did not damage `[CA-DB-C]`/`[CA-DB-F]`) and **no missed cross-file references**.

## 4. Flagged items

- **`[GB-1]` placement** — the instruction's core/reference lists did not name `[GB-1]`. Placed in
  `cbsa-reference.md` as the framework's foundational vocabulary (it heads PART 3 in the source).
  Core's two `[GB-1]` references were updated to point there. *Review if you'd prefer it in core.*
- **Test-mode** — the instruction said to include test-mode/simulation in `cbsa-stages.md` "if present."
  The master contains **no inline test-mode block** — only a `see test-mode.md` reference (external file)
  in the core trigger table. Nothing was moved to stages; the external reference is preserved in core.
- **`[CA-AIQ]` intra-file duplication** in `ca-db.md` — see §2; pre-existing in source, preserved.
- **No default-to-stages placements** were needed (rule 7) — every section had a clear home.
