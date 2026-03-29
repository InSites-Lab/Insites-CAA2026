# [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: This dashboard spec is for **single-assessment** visualization (one site, one CBSA process). For collection-level dashboards (multiple sites), see the MA-RC workflow — collection dashboards have a different data shape and tab structure. Both share the same visual language (stone/amber palette, serif typography).

Generate an interactive Assessment Dashboard as a **Canvas document (HTML)** after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

⚠ Apply Language Policy to all dashboard text.

---

## 1. Trigger and Offer

- **Mandatory offer** at end of Stage 6: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- Execute only on acceptance — do not auto-generate.
- Output as a **Canvas document** (self-contained HTML with inline CSS/JS, D3 from CDN).
- Respond **only** with the Canvas directly — no surrounding prose.

## 2. Data Extraction

Re-read all stage outputs from the conversation and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps (list) |
| Timeline | Stage 1 | 5–10 key dated events with **year, label, and change type** (use / structure / setting / infrastructure) |
| Contexts | Stage 1 | Each context: type label, description, **related value categories**, **timespan** |
| Values | Stage 2 | Each value: name, category ([CA-V]), evidence strength (sourced/inferred/uncertain), 1-line summary |
| Attribute Table | Stage 2.2 | Each row: attribute name, associated value categories, site-specific significance, **implication for significance** |
| Authenticity | Stage 3 | Nara Grid as **structured objects**: aspect, attribute description, value expression, integrity rating (high/medium/low-medium/low). Plus summary sentence. |
| Comparative | Stage 4 | Each comparator: name, period, architect (if known), distinction narrative, criteria ratings (rarity, documentation, condition). Plus overall summary. |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level (3=high, 2=medium, 1=low). Derived from Stage 2 implications and Stage 3 ratings. |
| Process Quality | Stage 6 | Quick boosts (list), next steps (list), strengths count, gaps count |
| Knowledge Graph | [CA-KG] | If KG was generated: full nodes and edges JSON. If not: null. |

**Rule**: Only include data that actually appeared in the conversation. Do not fabricate. If a stage was skipped or incomplete, show it as "Not completed" with a visual indicator.

## 3. Data Schema (strict)

```json
{
  "asset": { "name": "", "location": "", "type": "", "period": "", "description": "" },
  "dataQuality": { "sources": ["filename.pdf"], "gaps": ["missing X"] },
  "timeline": [
    { "year": "1923–1924", "yearStart": 1923, "label": "...", "changeType": "structure" }
  ],
  "contexts": [
    { "id": "ctx_hist", "type": "historical", "label": "...", "relatedValues": ["Historical", "Technological"], "timespan": "1915–1960s" }
  ],
  "values": [
    { "id": "v_hist", "name": "...", "category": "Historical", "evidence": "sourced", "summary": "..." }
  ],
  "attributeTable": [
    { "attribute": "...", "values": ["Social", "Symbolic"], "significance": "...", "implication": "..." }
  ],
  "authenticity": {
    "grid": [
      { "aspect": "Form & Design", "description": "...", "valueExpression": "Historical, Aesthetic", "rating": "medium" }
    ],
    "summary": "..."
  },
  "comparative": {
    "summary": "...",
    "comparators": [
      { "name": "...", "period": "...", "architect": "...", "distinction": "...", "criteria": { "rarity": "high", "documentation": "moderate", "condition": "unknown" } }
    ]
  },
  "significance": { "statement": "..." },
  "vulnerability": [
    { "value": "Historical", "form": 3, "material": 3, "use": 2, "setting": 2 }
  ],
  "processQuality": { "strengths": 3, "gaps": 6, "quickBoosts": ["..."], "nextSteps": ["..."] },
  "stagesCompleted": [0,1,2,3,4,5,6],
  "kg": null
}
```

**Schema rules**:
- `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
- `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
- `timeline[].changeType` is mandatory — every event classifies what kind of change occurred.
- `contexts[].relatedValues` links each context to the value categories it generates — this enables cross-referencing.
- `vulnerability` is derived by cross-reading Stage 2 implications against Stage 3 ratings. Impact levels: 3 = loss of this integrity aspect severely damages this value; 2 = moderate damage; 1 = minor or indirect.

## 4. Tab Structure (mandatory — consolidated)

Tabs are consolidated for cognitive load management (~8 tabs, not 11+). Stages that are tightly coupled share a tab. Map is always present.

```
Overview → Map → Timeline → Contexts & Values → [Themes] → Integrity → Comparative → Significance → [Report] → [Debrief] → [Session Analysis] → [KG]
```

Brackets = conditional: Themes only if ≥2 themes total across all categories; Report — always generate (see `report-tab-spec.md` [CA-RPT]); becomes required once DOCX exists. Debrief + Session Analysis: only if user opts in after [CA-IP] — process documentation, not heritage evidence. KG: only if generated during session.

**First-time orientation (mandatory)**: Before generating the dashboard, offer: "I can generate an interactive Assessment Dashboard. Quick path: **Overview → Significance** (key findings). Or explore all tabs for the full picture. Which do you prefer?"

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps, process summary, sources | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count (not "Completion: 100%"). Integrity range shows color-coded ratings per aspect. Process section: strengths/gaps/quick boosts/next steps (folded from former Process tab). Sources list. |
| **Map** | Site location + mentioned locations from Stages 1/4/5 | **MANDATORY** — even for single-assessment dashboards. Shows site as primary marker. If Stages 1, 4, or 5 mention comparison sites, connected sites, or regional context locations, add as secondary markers with labels. Leaflet map with cross-referencing to Comparative tab. See §4a. |
| **Timeline** | Chronological events | **Proportional spacing** based on year gaps. **Color-coded** by change type (use/structure/setting/infrastructure). Distribution summary. |
| **Contexts & Values** | Context cards + value cards + attribute table (merged) | **Contexts section**: Each card shows type label, description, timespan, **clickable value pills**. **Values section**: Cards with name, category pill, evidence indicator (●/◐/○), summary. **Attribute table** below with 🔑 Implication column. Cross-referencing works within this tab: clicking a context highlights its related values inline. |
| **Themes** | Value\context\threat thematic clusters (conditional) | Sub-tab pills: "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Theme cards with colored dot, label, member pills (clickable → navigate to item in home tab). Only if ≥2 themes total. See §4b. |
| **Integrity** | Nara Grid cards + vulnerability heat matrix + summary | Each card: aspect name, description, value expression pills, **color-coded rating badge** (high=green → low=red). Left border color matches rating. **Vulnerability sub-section**: heat matrix (values × Nara aspects) with legend ABOVE matrix: 🔴 Severe (3) / 🟠 Moderate (2) / ⬜ Minor (1). 2–3 sentence interpretive callout ABOVE the matrix explaining the pattern. |
| **Comparative** | Per-comparator cards + summary | Each card: name, period, architect, criteria ratings (color-coded), distinction narrative. Source note. |
| **Significance** | Statement of cultural significance | Styled as a featured block. |
| **Report** | One-page printable assessment summary | Always generate. Export controls. Full spec in `report-tab-spec.md` [CA-RPT]. |
| **Debrief** | Session debrief Q&A | Three reflection questions + user responses. Conversation-card layout. Muted process styling. Only if user opts in post-[CA-IP]. |
| **Session Analysis** | Session Report [CA-IP] | Interaction Map table, Self-Reflection quotes, Session Signature. Same muted process styling. Only if user opts in post-[CA-IP]. |
| **KG** | Embedded MiniKG with floating popover | If a KG was generated earlier in the session, reuse its graph data JSON (nodes + edges) — do not re-extract. Otherwise extract from stage outputs. D3 force-directed graph. See §7 for interaction. |

### 4a. Map Tab Spec (mandatory)

**Condition**: Always render — even for single-assessment dashboards.

- **Library**: Leaflet 1.9.4 from `cdnjs.cloudflare.com`. Guard: `if (typeof L !== 'undefined')`.
- **Tiles**: OpenStreetMap.
- **Asset marker**: `L.circleMarker`, radius 10, fill `#2563eb`, white stroke width 2. Tooltip: asset name.
- **Secondary markers**: If Stages 1, 4, or 5 mention comparison sites, connected sites, or regional context locations — add as `L.circleMarker`, radius 7, fill `#94a3b8`, with labels. Only render if coordinates are available or can be inferred.
- **Asset popup**: name (bold), type, period, description, integrity range summary.
- **Bounds**: Auto-fit all markers with padding `[40, 40]`. If only asset marker → zoom 12.
- **Coordinate source**: Below the map container, show: "📍 Coordinates: explicit/inferred" matching `asset.coordinateSource`.
- **Container**: `height: 440px; border-radius: 10px; border: 1px solid #e2e8f0`.
- **Cross-referencing**: Click comparator marker → set `highlight = { type: 'comparator', id }` → Comparative tab highlights that card.

### 4b. Themes Tab Spec (conditional)

**Condition**: Render only if ≥2 themes total across `valueThemes`, `contextThemes`, and `threatThemes`.

**Layout**: Sub-tab switcher (pill buttons): "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Hide a sub-tab if 0 themes in that category.

**Theme card**: Colored dot matching `theme.color`, label, count, one-sentence description, member pills (clickable → navigate to item in home tab with highlight). Cards are always expanded.

**Threat Themes** additionally: mini heatmap row showing vulnerability cells that define the threat pattern.

**Theme derivation rules**: Group values sharing overlapping contexts or co-occurring in attribute table. Group contexts by temporal overlap or causal relationship. Group vulnerability cells by shared high-impact patterns. ≥2 members per theme. Label with short noun phrase. Include 1-sentence rationale.

## 5. Cross-Referencing (mandatory)

The dashboard must implement a shared selection state:

- **Clicking a context** → highlights its related values in the Values tab.
- **Clicking a value** → highlights matching contexts and integrity aspects.
- **Navigating between tabs** preserves the active highlight.
- **Visible indicator** (banner) shows what is currently highlighted, with a Clear action.

Implementation: a top-level `highlight` variable (`{ type: 'value'|'context', id: string } | null`) checked by each tab renderer.

## 6. Theme and Readability (mandatory)

**Light theme throughout**: All tabs — including KG — use the same light palette. This ensures visual coherence between the Dashboard and the standalone KG artifact.

**Light palette** (all tabs):
```
Background: #f8fafc → cards: #ffffff → borders: #e2e8f0
Text: #1e293b → dim: #64748b → muted: #94a3b8
Accent: #2563eb — or site-appropriate
```

**Minimum readability requirements**:
- Body text: ≥ 0.84rem, contrast ratio ≥ 4.5:1
- Section labels / uppercase micro-labels: ≥ 0.72rem
- Pills and badges: ≥ 0.66rem
- KG edge labels: ≥ 10px, contrast ratio ≥ 3:1
- KG node labels: include text-shadow or halo for legibility against light background
- **No text below 0.62rem anywhere**

## 7. KG Node Interaction (MiniKG)

When a user clicks a KG node, display a **floating popover** adjacent to the clicked node:

- **Position**: prefer right of node; flip left near container edge; clamp vertically within SVG bounds.
- **Content**: node name (≥1rem, bold), type badge, meaning (≥0.88rem), connections list with directional arrows and verb labels.
- **Connection items**: styled as mini-cards (background + border), colored verb labels, white entity names.
- **Animate entrance**: scale+fade, ≤200ms.
- **Dismiss on**: close button, background click, or clicking another node.
- **Never require scrolling** to read node info — all content visible within the graph viewport.

## 8. Dashboard UX — 7-Lens Design Constraints

When building the dashboard (not reviewing), apply these lenses as design constraints:

### Lens 1: Information Architecture
- Overview tab first. Order: orientation → analysis → detail.
- Each tab answers a clear analytical question.
- Most important information easiest to reach.

### Lens 2: Chart & Visualization Choices
- Chart types based on data shape: bar for comparison, scatter for relationships, matrix for cross-tabulation.
- Color encodings carry consistent meaning across views.
- Axes, labels, legends clear without reading code.

### Lens 3: Map (if applicable)
- Map must add analytical value, not just decoration.
- Markers encode useful information beyond location.

### Lens 4: Interactivity & User Flow
- Shared entities clickable across all views.
- Cross-filtering between views.
- Selection state visible and clear.
- `history.pushState()` or hash routing on every tab switch.
- After cross-tab jumps, show "← Back to [previous tab]" pill.
- Encode active tab in URL hash (`#timeline`, `#values`).
- Sort/scroll state preserved across tab switches.

### Lens 5: Data Integrity
- All statistics computed from data — never hardcoded.
- No silent truncation or filtering.
- Computed values reflect meaningful criteria.
- Rich fields in data never left unused.

### Lens 6: Visual Design
- Sans-serif font stack (system-ui, Inter) for UI. Monospace for numeric cells.
- CSS custom properties for all design tokens.
- Card containers with elevation for content groups.
- Pill/segment tab controls.
- Neutral palette + one accent family.
- Bidi auto-detection for mixed-language data (set `dir="auto"` on text containers with heritage content).

### Lens 7: Storytelling
- Subtitles and annotations on outliers.
- Dynamic callouts that surface patterns.
- Collapsible "How to read this" guide box on key tabs with: "What you see", "How to interact", and an insight callout.
- Surface text fields as searchable/filterable content.

### Build Checklist
- [ ] Overview tab with KPI cards + distribution charts
- [ ] Data embedded as JS object (single source of truth)
- [ ] All statistics computed from data
- [ ] Every entity name clickable across views
- [ ] URL hash routing (`#tab-name`)
- [ ] Guide box on complex tabs (collapsible)
- [ ] CSS custom properties for design tokens
- [ ] Card containers with elevation
- [ ] Pill/segment tab controls
- [ ] Bidi auto-detection on heritage text
- [ ] Evidence indicators (●/◐/○) consistent across all tabs
- [ ] Nara Grid stored as structured objects
- [ ] fadeIn animation on tab switch

## 9. AI Query Tab [CA-AIQ]

The AI Query tab implements the generic AI Query contract from `artifact-ux-contract.md` §2 in **placeholder mode** (GPT platform).

**Platform behavior:**
- **GPT**: Placeholder mode — display starter prompts and route queries to GPT conversation. No live API calls from the artifact.
- **Claude**: Live analysis via Anthropic API.
- **Gemini**: Live analysis via Gemini API.

**Starter prompts** (Single Dashboard):
1. "Summarize the significance of this asset"
2. "What are the main gaps in this assessment?"
3. "How do values connect to contexts?"
4. "What does the integrity assessment reveal?"
5. "How does this asset compare to its comparators?"

**UI elements**: Chat-style message area with starter prompt cards. User copies prompts into GPT conversation. No live API calls are executed from the artifact.

## 10. Final Checklist

1. Only include data from the conversation — never fabricate.
2. If a stage was not completed, show as incomplete in progress bar and mark "Not completed" in its tab.
3. Evidence indicators (●/◐/○) must match Stage 2 markers and appear consistently in all tabs that reference values.
4. KG tab appears only if KG was generated during the session; Themes tab only if ≥2 themes exist. Vulnerability is a sub-section of Integrity (always present if data exists).
5. Replace `__DATA__` and `__ASSET_NAME__` placeholders with extracted content.
6. **Consolidated tabs** — Contexts & Values share one tab; Vulnerability folds into Integrity; Process folds into Overview. See §4.
7. **Attribute-Value-Implication table** present in Values tab.
8. **Cross-referencing** implemented: at least Context↔Value linking functional.
9. **Readability**: no text below 0.62rem; no contrast ratio below 3:1.
10. **Nara Grid** stored as structured objects, not parsed strings.
11. **CDN source**: Use `cdnjs.cloudflare.com` exclusively for all external libraries (D3, Leaflet, Chart.js). Do NOT use unpkg.com or jsdelivr.net. Add a `typeof` guard before initializing CDN-dependent features.
12. **Inline data**: All extracted data must be embedded inline as JS objects. Do NOT use `fetch()` — the dashboard must work when opened via `file://` protocol without a server.
13. **Leaflet popup close button**: Leaflet's popup close is `<a href="#close">` — in sandbox environments, hash links get rewritten. After map init, add: `document.addEventListener('click',function(e){if(e.target.closest('.leaflet-popup-close-button')){e.preventDefault();mapInstance.closePopup();}});`
14. **Chart.js stability**: For doughnut/pie charts, do NOT set `maintainAspectRatio:false` — it causes infinite expansion. Add `canvas{max-height:280px}` CSS to chart containers. Only use `maintainAspectRatio:false` for bar charts in constrained-height containers.
15. **Report tab required** once DOCX export exists.
16. **Debrief / Session Analysis tabs** use muted process styling, visually distinct from heritage tabs. Only present if user opted in.

## 11. Post-Dashboard Offers (mandatory)

After generating the Dashboard, offer the next steps in the workflow chain [CA-WF]:

> "Would you like me to:
> 1. **Export** as a formatted Word document?
> 2. **Read-Assessment** — analyze from different angles (evidence weight, stakeholder lens, context-effect audit)?
>
> You can do both, one, or neither. After that → Session Debrief."

Use **Code Interpreter** for DOCX export. Do not stop at file delivery if a logical next step exists.

## 11a. Workflow & Augmentation Rules [CA-WF]

**Model B+**: Dashboard and DOCX export are part of one visible workflow. If a DOCX report exists, the dashboard must include a Report tab [CA-RPT].

**Post-session augmentation**: After Debrief and [CA-IP] Session Report are generated, offer to append them as optional Dashboard tabs and/or DOCX appendix sections. The dashboard may be updated after the main session is otherwise complete.

**Evidence separation rule (mandatory)**: Debrief and Session Analysis content must be visually and semantically separated from site assessment evidence. These are process-layer additions, not heritage-source evidence. Use muted styling (lighter background, different border color, "Process" label).

**Acceptance criteria**:
- If DOCX exists → Report tab must exist
- If user opts in → Debrief tab must exist
- If user opts in → Session Analysis tab must exist
- Dashboard may be updated after session closure
- DOCX may be regenerated with Debrief / Session Analysis appendices

---

## 12. Reference Data Shape — Ayelet HaShachar

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) implements an earlier version of this spec. Use it as a working example for visual language and interaction patterns — not as a locked template. The current spec consolidates tabs (~8 vs 10+), adds mandatory Map, merges Contexts & Values, and folds Vulnerability into Integrity.

This section describes the data shape and rendering approach used in that reference. Your generated data must follow this shape exactly.

---

### Asset Identity

The `asset` object is a flat dictionary with five string fields: `name`, `location`, `type`, `period`, and `description` (~20 words).

Example:
- name: "Water Tower, Kibbutz Ayelet HaShachar"
- type: "Rural Water Tower — Kibbutz Infrastructure"
- period: "1923–1924 (Mandatory Palestine)"

This populates the Overview tab header.

### Data Quality

`dataQuality` contains two arrays: `sources` (filenames as strings) and `gaps` (concise gap descriptions). The Ayelet assessment had 2 sources and 6 gaps. The Overview tab renders sources as a list and gaps as warning badges.

### Timeline

`timeline` is an array of event objects. Each must have:
- `year` (display string, e.g., "1923–1924")
- `yearStart` (integer for proportional positioning)
- `label` (what happened)
- `changeType` (one of: "fabric", "infrastructure", "use", "setting", "interpretation" — matching [CA-T] in `cbsa-method.md`)

The Ayelet timeline had 8 events spanning 1915–1961. Change types were: 3× fabric, 2× use, 2× infrastructure, 1× setting.

**Rendering**: The Timeline tab renders events on a proportional horizontal axis where spacing reflects actual year gaps. Events are color-coded by `changeType` (e.g., fabric=blue, use=green, setting=amber, infrastructure=purple, interpretation=teal). A distribution summary below shows the count per change type.

### Contexts

`contexts` is an array of context objects. Each must have:
- `id` (e.g., "ctx_hist")
- `type` (from [CA-C]: "historical", "social", etc.)
- `label` (the site-specific context description, 2–4 sentences)
- `relatedValues` (array of value category names from [CA-V])
- `timespan` (e.g., "1915–1960s")

The Ayelet assessment identified 6 contexts, each linked to 1–3 value categories.

**Rendering**: Cards with type badge, description, timespan, and clickable value pills. Clicking a context card activates cross-referencing: it highlights matching values in the Values tab.

### Values

`values` is an array. Each must have:
- `id` (e.g., "v_hist")
- `name` (the "Value Type — Value Meaning" compound, e.g., "Historical — Infrastructure as Survival")
- `category` (the [CA-V] type name)
- `evidence` (one of: "sourced", "inferred", "uncertain")
- `summary` (one-line description)

The Ayelet assessment identified 5 values with evidence: 3 sourced, 2 inferred.

**Rendering**: Cards show the value name, a category-colored pill, an evidence indicator (● sourced, ◐ inferred, ○ uncertain), and the summary. Below the cards: the full Attribute-Value-Implication table from `attributeTable`.

### Attribute Table

`attributeTable` is an array. Each row:
- `attribute` (the physical or conceptual attribute)
- `values` (array of value category names)
- `significance` (≤9 words)
- `implication` (what happens if this attribute is compromised)

**Rendering**: Styled table with value pills in the second column and the implication as a warning-toned text.

### Authenticity (Nara Grid)

`authenticity` contains:
- `grid`: array of structured objects, each with `aspect`, `description`, `valueExpression`, and `rating` (high / medium / low-medium / low)
- `summary`: one paragraph

The four aspects are always: Form & Design, Material & Fabric, Use & Function, Location & Setting.

**Rendering**: Cards with left border colored by rating (green→high, amber→medium, orange→low-medium, red→low). Each card shows the aspect name as header, description as body, value expression as pills, and a rating badge. The summary appears below.

### Comparative

`comparative` contains:
- `summary`: overall comparison narrative
- `comparators`: array of objects, each with `name`, `period`, `architect` (may be null), `distinction` (narrative), and `criteria` (object with keys like `rarity`, `documentation`, `condition` — values are "high", "moderate", "low", "unknown")

The Ayelet assessment compared 3 water towers.

**Rendering**: Per-comparator cards. Each shows name/period header, architect (if known), criteria as color-coded badges, and distinction text. Summary paragraph above.

### Significance

`significance` has one field: `statement` (the full Stage 5 text, 3–5 paragraphs).

**Rendering**: Featured block with distinct typography — larger font, left accent border, generous padding. Treat as the centerpiece of the dashboard.

### Vulnerability Matrix

`vulnerability` is an array. Each row:
- `value` (value category name)
- `form` (impact level 1–3)
- `material` (impact level 1–3)
- `use` (impact level 1–3)
- `setting` (impact level 1–3)

Impact levels: 3 = loss severely damages this value, 2 = moderate damage, 1 = minor.

**Rendering**: Heat matrix table. Column headers show the Nara aspect name AND its current integrity rating from the authenticity grid. Cells colored: 3=red, 2=amber, 1=neutral/grey. **Legend ABOVE matrix**: 🔴 Severe (3) / 🟠 Moderate (2) / ⬜ Minor (1). **Interpretive callout ABOVE the matrix** (not below): 2–3 sentences identifying the most critical vulnerability intersection and the pattern it reveals.

### Process Quality

`processQuality` contains:
- `strengths` (integer count)
- `gaps` (integer count)
- `quickBoosts` (array of strings)
- `nextSteps` (array of strings)

**Rendering**: Three-column KPI row (strengths / gaps / boosts count). Below: two-column layout with next steps (left) and quick boosts (right). Sources list at bottom.

### KG (conditional)

`kg` is either `null` (no KG generated) or the full `{ nodes, edges }` object from the KG spec.

**Rendering**: If present, render a MiniKG tab with D3 force-directed graph (light theme), floating popover on node click, and a banner: "The standalone Knowledge Graph has richer features including analytics and AI queries." If KG included AI capability, include the Gemini chat panel here too.

### Report [CA-RPT]

Always generate. One-page printable assessment summary with export controls. Full spec in `report-tab-spec.md`. Position: after Process, before KG.

### Stages Completed

`stagesCompleted` is an array of integers [0,1,2,3,4,5,6]. Any stage not in this array renders as "Not completed" in its tab with a muted indicator.

---

### Key Rendering Principles

1. **Single source of truth**: All data lives in one `DATA` object at the top of the HTML. Every statistic, count, and label is computed from this object — never hardcoded.

2. **Cross-referencing**: A global `highlight` state (value or context ID) propagates across tabs. When active, matching elements get a visual highlight and non-matching elements are dimmed.

3. **Proportional timeline**: Year gaps determine spacing. A 40-year gap gets more horizontal space than a 2-year gap.

4. **Consistent evidence indicators**: ● / ◐ / ○ appear everywhere a value is referenced — cards, tables, pills.

5. **Structured Nara Grid**: The grid is always an array of objects with typed fields — never a flat string or paragraph.

6. **Tab navigation**: Hash-based routing. Each tab switch updates `location.hash`. On load, read hash to restore tab state.

---

**END OF DASHBOARD SPECIFICATION**
