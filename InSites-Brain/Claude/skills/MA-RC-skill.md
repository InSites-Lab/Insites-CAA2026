---
name: cbsa-read-collection
description: Reads across a collection of heritage assessments to surface patterns, gaps, and insights. Includes collection dashboard generation. Trigger on "read collection", "analyze collection".
---

# [MA-RC] Read-Collection: Collection Analysis Workflow

**Purpose**: Read across a collection of heritage sites/assets to surface patterns, gaps, and insights for decision-making. Works with any input depth. This is a reading workflow — it does not produce new assessments.

**Do not** run CBSA Stages 0–6 unless explicitly asked. **Do not** mix with MA-RA unless user requests switching.

---

### Step 1 — Intake

Parse all uploaded material. Report exactly this:

```
**Collection:** [N] items. [Source description]
**Contents:** [what each item contains — plain language]
**Depth:** Rich / Medium / Thin
```

Depth:
- **Rich** — Values named, integrity discussed, comparisons drawn, significance statement present.
- **Medium** — Some significance content, but partial. Values mentioned without full articulation.
- **Thin** — Brief records. Significance implied at best.

No greeting. No preview of what you will do.

---

### Step 2 — Extraction & Profile

Two parts. Do both before stopping.

**2a. Extraction.** For every item, extract into a normalized record. Work from text only — do not invent.

| Field | If absent |
|-------|-----------|
| Name | Use file/row ID |
| Location | `—` |
| Type | `—` |
| Period | `—` |
| Site description — *what* this site is. 1–2 sentences: physical character, scale, key features. Factual, not evaluative. | `—` |
| Significance summary — *why* this site matters. 1–3 sentences, distilled from text. The argument for significance, not a description of the site. | `⚠ not stated` |
| Values identified — use the text's own terms, not CBSA taxonomy | `⚠ none explicit` |
| Integrity / Authenticity | `—` |
| Comparative references — what compared to, and on what basis (rarity, typicality, preservation, geographic scope) | `—` |
| Threats | `—` |
| Assessment method | `—` |
| Value specifications — for each value, what it specifically means at *this* site. Not category labels but the site-specific claim. | `⚠ not specified` |

Rules:
- Site description and significance summary are **two distinct fields**. Description = what the site is. Significance = why it matters. Do not merge them.
- Significance summary is mandatory extraction. Attempt even if implicit. Mark `⚠ not stated` only if truly absent.
- Mirror source terminology. Do not translate to CBSA unless user requests.
- For comparative references: extract the *basis* of comparison, not just comparator names.
- Value specifications are distinct from value labels. A label says "Historical"; a specification says "Jesus' adopted home; 21 Gospel mentions; second only to Jerusalem." Extract specifications where the text supports them.
- If location information includes geographic references, attempt to provide approximate coordinates (lat/lng). Mark as approximate if not stated in source.

**2b. Profile Table.** Columns adapt to what the data contains. Always include Name, Site description, and Significance summary. Drop columns empty in >80% of items — mention as gaps instead. Show up to 15 rows; "+N more" if needed.

After the table — **Collection Reading**: 3–6 sentences on what stands out. Patterns, clusters, absences, imbalances. Descriptive only.

**Mandatory stop:**

> "What would you like to understand or decide from this collection?"

If the user already stated a goal, skip to Step 3.

---

### Step 3 — Analysis

Run what the user requests. If unsure, offer 3–5 options **derived from the data**:

> Based on what I found:
> - [option from a visible pattern]
> - [option from a visible gap]
> - [option matching likely decision context]
> - Your own question

Common analysis types (offer when relevant to the data):
- **Thematic classification** — group sites by significance type, heritage character, landscape relationship, or other emergent categories. Produce multiple overlapping schemes, not just one. Each scheme should reveal a different management or analytical dimension. Sites belonging to multiple groups is a feature — it reveals governance complexity.
- **Significance argument structure** — for each site, identify: argument type (event-memorial / place-as-character / living-heritage), argument strength (strong / moderate / weak), evidence basis (archaeological + textual / tradition + landscape / tradition only), and the single weak link where the argument is most vulnerable. Show patterns across the collection.
- **Value specifications** — move beyond explicit/implied/absent labels to what each value actually means at each site. A label says "Historical"; a specification says "Jesus' adopted home; 21 Gospel mentions." This is the core analytical move that distinguishes collection reading from tagging.
- **Management clustering** — group by governance needs (shared corridors, multi-owner compounds, isolated sites). Sites may appear in multiple clusters.
- **Documentation gap analysis** — what's present vs. missing for a nomination/dossier; priority actions.
- **Enrichment needs** — what analytics dimensions are derivable now vs. need additional data.

Rules:
- Cite item names. Do not invent data.
- Tables, matrices, ranked lists encouraged when they clarify.
- For Thin input: show what is visible, then name what richer data would reveal. "From these entries, [X] is apparent. Adding significance notes would also show [Y]."
- ≤500 words per analysis.

After every analysis:
```
Another angle? | Focus on one site? | Dataset? | Dashboard? | Done?
─────
📚 Read-Collection · [N] items · Depth: [R/M/T]
```

---

### Step 4 — Iteration

User may:
- **Another analysis** → return to Step 3.
- **Focus on one item** → full extracted record + how it sits in the collection. Offer MA-RA handoff if available.
- **Classify** → propose 3–5 grouping schemes from visible data. Apply after confirmation.
- **CBSA normalization** → map values to CA-V categories (Historical, Scientific, Social, Aesthetic, Symbolic, Landscape, Spiritual, Technological, Educational, Economic, Ecological, Political, Intangible), contexts to CA-C. Show alongside original terms. This is translation, not new assessment.
- **Dataset export** → Generate a structured JSON file with all extracted and derived data per site. Include: collection metadata (name, depth, date, method), per-site objects with all extraction fields + analytics dimensions, controlled vocabulary enums. Offer before or alongside dashboard.
- **Collection dashboard** → "Would you like a visual dashboard for this collection?" Generate per [CA-DB-C] spec below. Offer after at least one analysis has been run, or on direct user request.
- **Done** → 3–4 sentences: what the collection revealed, what remains unclear, possible next step.

---

### Missing Data

If too thin for even a Profile:
```
⚠️ I can see [what's present] but not enough for collection analysis.
Needed: [specific — e.g., "a significance note per site, even one sentence"].
Options: add data | tell me your question and I'll try | single-site mode
```

---

### Style

- User-led. Never auto-run analysis.
- Evidence-only. Cite uploaded data. No external knowledge unless asked.
- Source language first. Mirror input terminology. CBSA translation is an option, not default.
- Constructive on thin data. Never dismiss. Show value of what exists.
- Significance-centered. Even when data is about condition or risk — the focus is significance.
- Concise. Extraction + Profile ≤ 2 screens. Each analysis ≤ 500 words.
- No greetings, no menus, no preamble.
- CDN reliability: use `cdnjs.cloudflare.com` for all external libraries. Avoid unpkg.com (fails on file:// protocol and restricted networks). Always add a `typeof` guard before initializing CDN-dependent features.

---

### CBSA Opt-in

If user requests Stages 0–6 on one item, switch to Write mode. Offer return to MA-RC afterward.

---
---

## [CA-DB-C] Collection Dashboard

> **Scope**: Collection-level visualization (multiple sites from MA-RC analysis). For single-assessment dashboards (one site, one CBSA process), see [CA-DB]. Both share the same visual language (stone/amber palette, Inter typography).

### 1. Trigger and Offer

- Offer after at least one Step 3 analysis: "Would you like a visual dashboard for this collection?"
- Also generate on direct request ("dashboard", "collection dashboard", "visualize").
- Execute only on acceptance — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: Single self-contained **HTML file** (vanilla JS, Chart.js + Leaflet from CDN). No build toolchain.

### 2. Data Extraction

Re-read Step 2 extraction output and build a per-site JSON record:

| Step 2 field | Dashboard field(s) | Notes |
|---|---|---|
| Name | `name` | Short display name |
| Location | `country`, `lat`, `lng` | Parse coordinates if available; `lat`/`lng` = `null` if not |
| Type | `type`, `typeCategory` | Category: landscape / single / ensemble / urban |
| Period | `period`, `periodCategory` | Category: prehistoric / ancient / medieval / modern / multiperiod |
| Site description | `description` | 1–2 sentences |
| Significance summary | `significanceSummary`, `highlight` | `highlight` = one-sentence collection-level insight |
| Values identified | `values: { [type]: "e"/"i"/"a" }` | Map to 8 categories: Historical, Scientific, Landscape, Community, Intangible, Architectural, Nature, Educational. `e` = explicit, `i` = implied, `a` = absent |
| Integrity / Authenticity | `integrity`, `integrityNote` | Level: high / good / variable / unknown |
| Threats | `threats[]` | Array of threat category IDs |
| Assessment method | `method`, `methodType` | methodType: qual_legal / criteria_list / quant_score / categorical_ranking / cbsa / other |
| Comparative references | `comparativeBasis`, `claimScope` | claimScope: local / regional / national / international |

Also derive from Collection Reading and analyses (if available):
- `significancePremises[]` — basis of significance argument (uniqueness, archive, completeness, community, assessment_impact, cultural_landscape)
- `managementClusters[]` — grouping labels from Classify step, if run

### 3. Tab Structure (7 tabs, fixed order)

| # | Tab | Content | Key features |
|---|-----|---------|-------------|
| 1 | **Overview** | KPI cards (N sites, N countries, time span, N methods) + 4 distribution charts (by country, type, period, protection) | Always first tab. Orients the user. |
| 2 | **Map** | Leaflet map with circle markers sized by explicit-value count | Filter buttons per value type. Click filter → **dim or hide markers** where that value is absent; show only sites with explicit or implied. "All" resets. Click marker → popup with significance summary + highlight. |
| 3 | **Values** | Matrix: sites × value types, ●/◐/○. Below matrix: value specification panel. | Sortable columns. Sticky first column. Footer counts. **Click site name → expand value specifications panel** showing what each value means at that site (the actual claim, not just e/i/a). |
| 4 | **Arguments** | Significance premises bar chart + claim scope pie chart + **argument assessment table** | Table columns: Site, Argument Type, Strength (color-coded: green/amber/red), Evidence Basis, Claim Scope, Assessment note. Shows what each argument rests on and where it's vulnerable. |
| 5 | **Gaps** | Traffic-light matrix: sites × data dimensions (values, significance, integrity, threats, method, comparisons). Green/yellow/red. | Per-site completeness score. Identifies documentation gaps. |
| 6 | **Cross-Tabs** | Stacked bar charts: values by country, values by type, values by period | Show ALL categories — no silent truncation. |
| 7 | **Clusters** | Management-oriented grouping cards with site tags | Derived from visible patterns. Sites may appear in multiple clusters. |

### 4. Mandatory Rules

- **Overview first.** Tab index 0. The user sees collection-level orientation before any detail.
- **Cross-tab site linking.** All site names in Values, Arguments, Gaps, Cross-Tabs, and Clusters must be clickable → navigate to Map popup or scroll to Values row. No orphaned names.
- **No silent truncation.** Charts must show all data categories. If >8 categories, use an "Other" bucket with tooltip listing constituents.
- **Guide boxes.** Each tab gets a brief collapsible header explaining what the tab shows and what patterns to look for.
- **Collection metadata in header.** Show: collection name/source, N items, Depth indicator, generation date.
- **Cross-tab site navigation.** Implement a shared `navigateToSite(siteId)` function. When a site name is clicked in Values → show value specifications panel; in Arguments, Gaps, Clusters → switch to Map tab and open that site's popup.
- **Map filters must filter.** Value filter buttons must actually dim or hide non-matching markers — not just toggle visual state. Implement marker opacity/visibility based on selected value type.
- **Gap data derived from extraction.** Use the extraction's `⚠ not stated` / `—` markers to determine green/yellow/red gap status. Never hardcode per-site overrides in the dashboard code.
- **Chart.js stability.** For doughnut/pie charts, do NOT set `maintainAspectRatio:false` — let them maintain their natural aspect ratio. Add `canvas{max-height:280px}` CSS to chart containers. Only use `maintainAspectRatio:false` for bar charts in constrained-height containers.
- **Inline data.** All site data must be embedded inline in the HTML file as a JS array/object. Do NOT use `fetch()` to load external JSON — the dashboard must work when opened directly via `file://` protocol without a server. Offer a separate JSON export via Step 4, but the dashboard itself is self-contained.

### 5. Visual Language

Shared with single-assessment dashboard [CA-DB]:
- **Palette**: stone-50 through stone-900 for backgrounds/text/borders; amber accents for highlights, active states, insights. Define as CSS custom properties (`--stone-50` through `--stone-900`, `--amber-*`).
- **Fonts**: Inter (400/500/600/700) for text, JetBrains Mono (500) for data/counts — both from Google Fonts CDN.
- **Theme**: Light throughout (no dark mode — collection dashboards have no KG tab).
- **Libraries**: Leaflet 1.9.4 via `cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/`, Chart.js 4.4.1 via `cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/`. Do NOT use unpkg.com or jsdelivr.net. Add `typeof` guard before map initialization (`if(typeof L==='undefined')` → show error instead of crashing).

**Layout & structure:**
- **Layout wrapper**: Content area uses a `max-width: 1320px` centered container. Page background is `stone-100`.
- **Header**: A rounded card (`border-radius: 12px`) inside the container with `stone-800` background, `padding: 24px 28px`. NOT a full-width bar.
- **Tab style**: Pill/card tabs — rounded top corners (`border-radius: 8px 8px 0 0`), `background: stone-200` inactive, `background: white` + `box-shadow` for active. NOT underline-style tabs.
- **Tab content container**: Each tab's content is wrapped in a white card (`background: white; border-radius: 0 12px 12px 12px; padding: 24px; box-shadow`). Content does NOT float on the gray background.
- **Spacing**: 28px page padding, consistent card margins. Responsive: 2-column grids collapse to 1-column below 768px.

**Component styles:**
- **Guide boxes**: Left-border accent style (`border-left: 3px solid amber-500; background: amber-100; padding: 12px 16px`), compact single paragraph with emoji icon. Collapsible. NOT multi-zone structure.
- **Site tags**: Per-site colored tags — each site gets a unique pastel background + dark text color pair (e.g., blue for one, green for another, pink for a third). This creates visual identity per site across tabs. NOT uniform amber for all sites.
- **KPI values**: Use `stone-800` (dark) for KPI numbers, `font-weight: 700`, monospace. Background uses `stone-50` with `1px border stone-200`. NOT amber-colored numbers.
- **Chart cards**: Use `stone-50` background with `1px border stone-200`, NOT white with heavy box-shadow.
- **Overview charts**: Show Heritage Character, Argument Strength, Evidence Basis, and Ownership Count — these are the most analytically useful dimensions.
- **Chart.js canvas**: Add `canvas{max-height:280px}` to chart card styles. Do NOT set `maintainAspectRatio:false` on doughnut/pie charts.

### 6. Checklist

Before delivering the artifact, verify:

1. ☐ Only data extracted from uploaded materials — nothing fabricated
2. ☐ Overview tab is first (tab index 0)
3. ☐ All site names are interactive (link to Map or Values)
4. ☐ Value indicators (●/◐/○) consistent across Values, Map popups, and Clusters
5. ☐ Charts show all data categories — no `.slice()` truncation
6. ☐ Guide box present on every tab
7. ☐ Collection metadata (source, depth, N items) shown in header
8. ☐ Responsive: 2-column grids collapse to 1-column below 768px

### 7. Reference Implementation

`InSites-Brain/sites-data/EAC/EAC-DASH/index-eac.html` (EAC11 collection, 15 sites, 10 countries) implements this tab structure. Use as a working example — not a locked template.

### 8. Dataset Export

After generating the dashboard, offer: "Would you like the extracted collection data as a structured JSON file?"

The JSON should include:
- **Collection metadata**: name, source, depth, date, method
- **Per-site objects**: all extraction fields (Step 2) + analytics dimensions (Step 3)
- **Controlled vocabulary enums**: argument types (`event-memorial`, `place-as-character`, `living-heritage`), evidence bases (`archaeological+textual`, `tradition+landscape`, `tradition-only`), value levels (`e`/`i`/`a`), integrity levels (`high`/`good`/`variable`/`unknown`)
- **Analytics dimensions metadata**: which dimensions are derivable from current data vs. need enrichment
