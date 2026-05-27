<!-- Derived from InSites-CAA-claude.md v7 - split 2026-05-27. Source-of-truth is the mono; edits here may drift. -->
<!-- Loaded on-demand by cbsa-core.md. Codes referenced but not defined in this file resolve via the Code->file map in cbsa-core.md. -->
<!-- Building a collection dashboard ALSO requires apps/ca-db-dashboard.md for the shared foundation [CA-DB-F]. -->

## [CA-DB-C] Collection Dashboard — MA-RC Integration

> **Scope**: Collection-level visualization (multiple sites from MA-RC analysis). For single-assessment dashboards (one site, one CBSA process), see [CA-DB] above. Both share the UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Collection: Inter + stone/amber palette.
>
> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `[CA-EC]`, AI Query follows `[CA-AIQ]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

### 1. Trigger and Offer

- Offer after at least one MA-RC Step 3 analysis: "Would you like a visual dashboard for this collection?"
- Also generate on direct request ("dashboard", "collection dashboard", "visualize").
- Execute only on acceptance — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: Single self-contained **HTML file** (vanilla JS, Chart.js + Leaflet from CDN). No build toolchain.

### 2. Data Extraction

Re-read MA-RC Step 2 extraction output and build a per-site JSON record:

| Step 2 field | Dashboard field(s) | Notes |
|---|---|---|
| Name | `name` | Short display name |
| Location | `country`, `lat`, `lng` | Parse coordinates if available; `lat`/`lng` = `null` if not |
| Type | `type`, `typeCategory` | Category: landscape / single / ensemble / urban |
| Period | `period`, `periodCategory` | Category: prehistoric / ancient / medieval / modern / multiperiod |
| Site description | `description` | 1–2 sentences |
| Significance summary | `significanceSummary`, `highlight` | `highlight` = one-sentence collection-level insight **(MANDATORY — must be non-empty for every site)** |
| Values identified | `values: { [type]: "e"/"i"/"a" }` | Map to 8 categories: Historical, Scientific, Landscape, Community, Intangible, Architectural, Nature, Educational. `e` = explicit, `i` = implied, `a` = absent |
| Integrity / Authenticity | `integrity`, `integrityNote` | Level: high / good / variable / unknown |
| Threats | `threats[]` | Array of threat category IDs |
| Assessment method | `method`, `methodType` | methodType: qual_legal / criteria_list / quant_score / categorical_ranking / cbsa / other |
| Comparative references | `comparativeBasis`, `claimScope` | claimScope: local / regional / national / international |

Also derive from Collection Reading and analyses (if available):
- `significancePremises[]` — basis of significance argument (uniqueness, archive, completeness, community, assessment_impact, cultural_landscape)
- `managementClusters[]` — grouping labels from Classify step, if run
- `themes[]` — **MANDATORY**. Array of theme objects: `{ id, label, description, sites: [siteId], evidence: { siteId: "text" } }`. Always generate from MA-RC analysis. Minimum: group sites by overlapping value patterns.
- `tabs[]` — dynamic tabs from MA-RC Step 3 analysis results. Schema: `{ id, label, icon, type, data }`. Supported types: table, cards, matrix, prose, custom.

### 3. Tab Structure (4 fixed + dynamic)

**Fixed tabs** (always present):

| # | Tab | Content | Key features |
|---|-----|---------|-------------|
| 1 | **Overview** | KPI cards (N sites, N countries, time span, N methods) + 4 distribution charts. KPI numeric values use monospace font. | Always first tab. Orients the user. |
| 2 | **Map** | Leaflet map with circle markers sized by explicit-value count | Filter buttons per value type. Click marker → popup with significance summary + highlight. |
| 3 | **Values** | Matrix: sites × value types, evidence markers (〰️/💭). Below: value specification panel. | Sortable columns. Sticky first column. Footer counts. Click site name → expand panel. |
| 4 | **Themes** | Thematic clusters across the collection **(MANDATORY)** | Always generate. Theme cards with colored dot, label, description, clickable site member pills, per-site evidence text. |

**Dynamic tabs** (from `data.tabs[]` — include MA-RC Step 3 analysis results):

Add analysis results the user requested. Supported types: table, cards, matrix, prose, custom. Common dynamic tabs:
- **Arguments** — significance premises table (type: `table`)
- **Gaps** — traffic-light completeness matrix (type: `matrix`)
- **Cross-Tabs** — distribution charts (type: `custom`)
- **Clusters** — management grouping cards (type: `cards`)
- **AI Query** — implements [CA-AIQ] contract (Anthropic API on Claude)

In `tabs[]` data, use exact `site.name` values when referencing sites — enables cross-tab navigation.

### 4. Mandatory Rules

- **Overview first.** Tab index 0.
- **Cross-tab site linking.** All site names in all tabs must be clickable → navigate to Map popup or Values row. No orphaned names.
- **No silent truncation.** Charts must show all data categories. If >8 categories, use "Other" bucket with tooltip listing constituents.
- **Guide boxes.** Each tab gets a collapsible guide box (see [CA-DB-F] foundation rules).
- **Collection metadata in header.** Show: collection name/source, N items, Depth indicator, generation date.
- **Cross-tab site navigation.** Shared `navigateToSite(siteId)` function. Site name clicked in Values → show value panel; in other tabs → switch to Map + open popup.
- **Map filters must filter.** Value filter buttons must dim or hide non-matching markers — not just toggle visual state.
- **Gap data derived from extraction.** Use `⚠ not stated` / `—` markers to determine green/yellow/red. Never hardcode per-site overrides.
- All [CA-DB-F] foundation rules apply (Chart.js stability, inline data, Leaflet workaround, sandbox compatibility).

### 5. Visual Language — Design Tokens

**Libraries** (load in `<head>`):
- Leaflet 1.9.4 via `cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/`
- Chart.js 4.4.1 via `cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/`
- Do NOT use unpkg.com or jsdelivr.net. Add `typeof` guard before map init.

#### 5a. Design Intent

- **Palette**: Stone/amber (stone-50 `#fafaf9` through stone-900 `#1c1917`, amber-100 `#fef3c7` through amber-700 `#b45309`)
- **Typography**: Inter (sans), JetBrains Mono (mono), 13px base
- **Layout**: Max-width 1320px, 12px border-radius, light theme only
- **Components**: Dark header (stone-800), amber-accented guide boxes, compact KPI cards, pastel site tags (unique color per site)
- **Responsive**: 2-column grids collapse to 1-column below 768px. `canvas{max-height:280px}` for Chart.js stability.

See [CA-UX] for cross-platform visual tokens.

#### 5b. Design Rules

- **Cross-tab navigation**: All site tags clickable → navigate to Map popup or Values row. Implement `selectSiteOnMap()`, `goBack()`.
- **Header**: Collection name, N sites, region, depth badge, source, date.
- All [CA-DB-F] foundation rules apply (inline data, Leaflet workaround, sandbox compatibility).

### 6. Checklist

1. ☐ All site names interactive (link to Map or Values)
2. ☐ Evidence markers (〰️/💭) consistent across all tabs
3. ☐ Charts show all data categories — no `.slice()` truncation
4. ☐ Collection metadata in header (source, depth, N items)
5. ☐ AI Query uses placeholder mode

### 9. AI Query Tab `[CA-AIQ]` (Placeholder Mode)

The AI Query tab uses **placeholder mode** on Claude. No live API calls from the artifact. Starter prompts guide the user to ask questions in the chat conversation.

**Starter prompts** (Collection Dashboard):
1. "What value patterns are shared across sites?"
2. "How does the geographic distribution look?"
3. "Compare the assessment methodologies used"
4. "Where are the biggest data gaps?"
5. "What management clusters emerge?"

**UI elements**: Chat-style message area with starter prompt cards. When user clicks a prompt or types a question, display: "💬 Copy this question to the chat conversation for an answer based on the full assessment context." Include a copy-to-clipboard button. No live API calls are executed from the artifact.

### 7. Dataset Export

After generating the dashboard, offer: "Would you like the extracted collection data as a structured JSON file?"

The JSON should include:
- **Collection metadata**: name, source, depth, date, method
- **Per-site objects**: all extraction fields + analytics dimensions
- **Controlled vocabulary enums**: argument types, evidence bases, value levels (`e`/`i`/`a`), integrity levels
- **Analytics dimensions metadata**: which dimensions are derivable from current data vs. need enrichment

---

**END OF MASTER PROMPT (Claude Version — Hebrew Overlay)**
