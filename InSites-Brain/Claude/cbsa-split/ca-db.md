## [CA-DB-F] Dashboard Foundation — Shared Rules

> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-reference.md`, AI Query follows `[CA-AIQ]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

These rules apply to **both** the single-assessment dashboard [CA-DB] and the collection dashboard [CA-DB-C]. Each spec references this foundation rather than repeating these patterns.

### Technical Constraints

- **CDN**: `cdnjs.cloudflare.com` exclusively for all external libraries (D3, Leaflet, Chart.js). Do NOT use unpkg.com or jsdelivr.net.
- **No ESM imports in artifacts**: Do NOT use `import` statements for CDN libraries — the artifact sandbox does not support dynamic `require()`. Load all libraries via `<script>` tags and access via global objects (`window.d3`, `window.L`, `window.Chart`). For React artifacts, use a dynamic script loader in `useEffect`.
- **Global-scope identifiers (critical)**: Wrap all custom JS in an IIFE `(function(){ /* all code */ })();` (React code stays in component scope); never declare top-level variables with reserved browser-global names (`top`, `name`, `length`, `parent`, `status`, `event`, `location`). A top-level `const top` (e.g., a "top-N" list) throws "Identifier 'top' has already been declared" in the artifact sandbox.
- **typeof guard**: Always check `typeof L !== 'undefined'` (Leaflet), `typeof Chart !== 'undefined'` (Chart.js), `typeof d3 !== 'undefined'` (D3), etc. before initializing CDN-dependent features.
- **Inline data**: All extracted data must be embedded inline as JS objects. Do NOT use `fetch()`. Dashboards must work via `file://` protocol.
- **Leaflet popup close workaround**: Artifact sandbox rewrites hash links. After map init: `document.addEventListener('click',function(e){if(e.target.closest('.leaflet-popup-close-button')){e.preventDefault();mapInstance.closePopup();}});`
- **Chart.js stability**: Do NOT set `maintainAspectRatio:false` on doughnut/pie charts. Add `canvas{max-height:280px}` CSS.
- **Leaflet Map Tiles (Critical)**: Use OpenStreetMap as default layer (works in artifact sandbox). Add Google Maps layers only outside sandbox — no dead switcher buttons in preview.
  ```javascript
  const osmBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' });
  osmBase.addTo(mapInstance);
  const isSandbox = window.location.href === 'about:srcdoc';
  if (!isSandbox) {
    const mapLang = (document.documentElement.lang === 'he') ? 'iw' : 'en';
    const googleTerrain = L.tileLayer(`https://mt1.google.com/vt/lyrs=p&hl=${mapLang}&x={x}&y={y}&z={z}`, { maxZoom: 20 });
    const googleSatellite = L.tileLayer(`https://mt1.google.com/vt/lyrs=y&hl=${mapLang}&x={x}&y={y}&z={z}`, { maxZoom: 20 });
    L.control.layers({ "OpenStreetMap": osmBase, "Terrain": googleTerrain, "Satellite": googleSatellite }, null, { position: 'topleft' }).addTo(mapInstance);
  }
  ```
  Language auto-detected from `document.documentElement.lang` (set by CA-HE in cbsa-core.md). Position `topleft` avoids RTL scrollbar overlap. Also add to `<style>`: `[dir="rtl"] .leaflet-popup-content-wrapper { direction: rtl; text-align: right; }`
- **CRITICAL — Artifact sandbox constraint**: Do NOT use `AbortController` or `AbortSignal` for fetch timeout. The artifact iframe uses `postMessage`, and `AbortSignal` cannot be cloned across this boundary (`DataCloneError`). Use `Promise.race` with `setTimeout` instead.
- **Sandbox compatibility (critical)**: The Claude.ai artifact preview runs inside `about:srcdoc` where these browser APIs are blocked:
  · `history.pushState()` / `location.hash` writes
  · `localStorage` / `sessionStorage`
  · `window.print()`
  · Blob downloads (`URL.createObjectURL` + `<a>.click()`)

  Mandatory rules:
  · Wrap ALL calls to these APIs in try-catch. Never let a blocked API crash the dashboard.
  · Tab switching must be driven by an in-memory variable (`activeTab`), not URL state. URL hash is a progressive enhancement.
  · Detect sandbox context with: `const isSandbox = window.location.href === 'about:srcdoc';`
  · Report tab: when in sandbox, replace export buttons with: "📥 Download this dashboard file to use Export HTML and Print/PDF features."
  · localStorage for guide box state: fall back to in-memory object when localStorage throws.
  · All these features must work when the HTML is downloaded and opened as a standalone file. The sandbox constraint must never remove functionality — only defer it to standalone mode.

### Guide Boxes (every tab)

- Collapsible with chevron toggle.
- State persisted in localStorage (`guide_[tabId]`). First visit = expanded; returning = collapsed.
- 3-zone structure: "What you see" (encoding), "How to interact" (actions), "What to look for" (insight callout with amber left-border accent).
- Styling: `background: var(--amber-100); border-left: 3px solid var(--amber-500);` — compact header with icon + title + chevron.
- Collapsed state: single line, minimal footprint.

### Navigation & History

- Encode active tab in URL hash (`#overview`, `#map`, `#timeline`, etc.).
- `history.pushState()` on every tab switch.
- `popstate` listener for browser back/forward tab restoration.
- After cross-tab jumps (e.g., entity click → different tab), show "← Back to [previous tab]" pill.
- On page load: read hash and restore the corresponding tab.

### Accessibility (mandatory)

- Sidebar navigation: `role="tablist"` on container, `role="tab"` with `aria-selected="true"/"false"` on each tab button, `role="tabpanel"` on content area.

### Cross-Tab Entity Linking

- All entity names (sites, values, comparators, themes) must be clickable across all tabs.
- Clicking navigates to the entity's primary tab with highlight.
- Shared highlight state: `{ type, id } | null`.

---

## [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: This dashboard spec is for **single-assessment** visualization (one site, one CBSA process). For collection-level dashboards (multiple sites), see [CA-DB-C] below. Both share the same UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Single-assessment: DM Sans + blue accent (#2563eb). Collection: Inter + stone/amber.

Generate an interactive Assessment Dashboard after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

⚠ Apply Language Policy to all dashboard text.

### 1. Trigger and Offer

- **Mandatory offer**: At the end of Stage 6, always present: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- **Execute only on acceptance** — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: Generate as a single self-contained **HTML file** (vanilla JS + D3 from CDN). No build toolchain required.

### 2. Data Extraction

Re-read all stage outputs from the conversation and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps (list) |
| Timeline | Stage 1 | 5–10 key dated events with **year, label, and change type** (use / structure / setting / infrastructure) |
| Contexts | Stage 1 | Each context: type label, description, **related value categories**, **timespan** |
| Values | Stage 2 | Each value: name, category (CA-V in cbsa-reference.md), evidence strength (sourced/inferred/uncertain), 1-line summary |
| Attribute Table | Stage 2.2 | Each row: attribute name, associated value categories, site-specific significance, **implication for significance** |
| Authenticity | Stage 3 | Nara Grid as **structured objects**: aspect, attribute description, value expression, integrity rating (high/medium/low-medium/low). Plus summary sentence. |
| Comparative | Stage 4 | Each comparator: name, period, architect (if known), distinction narrative, criteria ratings (rarity, documentation, condition). Plus overall summary. |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level (3=high, 2=medium, 1=low). Derived from Stage 2 implications and Stage 3 ratings. |
| Process Quality | Stage 6 | Quick boosts (list), next steps (list), strengths count, gaps count |
| Knowledge Graph | CA-KG in ca-kg.md | If KG was generated: full nodes and edges JSON. If not: null. |
| Location Coordinates | Stage 0 + context | Lat/lng for asset and each comparator. Explicit from source, inferred from place names, or null. |
| Thematic Clusters | Stages 1–3 | Group values by overlapping contexts, contexts by temporal/causal overlap, vulnerability cells by shared high-impact patterns. |

**Rule**: Only include data that actually appeared in the conversation. Do not fabricate. If a stage was skipped or incomplete, show it as "Not completed" with a visual indicator.

### 3. Data Schema (strict)

```json
{
  "asset": { "name": "", "location": "", "type": "", "period": "", "description": "", "coordinates": { "lat": null, "lng": null }, "coordinateSource": "explicit|inferred|unknown" },
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
      { "name": "...", "period": "...", "architect": "...", "distinction": "...", "criteria": { "rarity": "high", "documentation": "moderate", "condition": "unknown" }, "coordinates": { "lat": null, "lng": null } }
    ]
  },
  "significance": { "statement": "..." },
  "vulnerability": [
    { "value": "Historical", "form": 3, "material": 3, "use": 2, "setting": 2 }
  ],
  "processQuality": { "strengths": 3, "gaps": 6, "quickBoosts": ["..."], "nextSteps": ["..."] },
  "stagesCompleted": [0,1,2,3,4,5,6],
  "kg": null,
  "themes": {
    "valueThemes": [{ "id": "", "label": "", "description": "", "valueIds": [], "color": "" }],
    "contextThemes": [{ "id": "", "label": "", "description": "", "contextIds": [], "color": "" }],
    "threatThemes": [{ "id": "", "label": "", "description": "", "vulnerabilities": [], "color": "" }]
  },
  "tabs": [
    { "id": "evidence", "label": "Evidence Weight", "icon": "⚖️", "type": "cards", "data": { "cards": [] } }
  ]
}
```

**Schema rules**:
- `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
- `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
- `timeline[].changeType` is mandatory — every event classifies what kind of change occurred.
- `contexts[].relatedValues` links each context to the value categories it generates — this enables cross-referencing.
- `vulnerability` is derived by cross-reading Stage 2 implications against Stage 3 ratings. Impact levels: 3 = loss of this integrity aspect severely damages this value; 2 = moderate damage; 1 = minor or indirect.
- `asset.coordinates`: Extract lat/lng if explicit in source material; infer from well-known place names (e.g., "Kibbutz Ayelet HaShachar" → known coordinates); set null if unknown. Set `coordinateSource` accordingly.
- `comparative.comparators[].coordinates`: Same logic per comparator site.
- `themes`: Group related values/contexts/vulnerabilities by narrative thread. Rules: ≥2 members per theme; only populate if ≥3 values OR ≥3 contexts exist. Label each theme with a short noun phrase (e.g., "Industrial Heritage Identity", "Environmental Vulnerability"). Include 1-sentence rationale in `description`.
- `tabs`: Optional dynamic tabs for MA-RA reading results. If MA-RA readings (Evidence Weight, Stakeholder Lens, Context-Effect Audit, etc.) were performed during the session, include each as a tab entry. Supported types: `table` (columns + rows), `cards` (title/body/level/badges), `matrix` (rowLabels + colLabels + cells 0-3), `prose` (sections with title + body), `custom` (raw HTML). Dynamic tabs render after Significance.
- In all text fields and `tabs[]` data, use exact entity names (asset name, comparator names) to enable cross-tab navigation.

### 4. Tab Structure (mandatory — consolidated)

Tabs are consolidated for cognitive load management (~8 tabs, not 11+). Stages that are tightly coupled share a tab. Map is always present.

```
Overview → Map → Timeline → Contexts & Values → [Themes] → Integrity → Comparative → Significance → Report → [Debrief] → [Session Analysis] → AI Query
```

Brackets = conditional: Themes only if ≥2 themes total across all categories; Report — always generate (see `design/report-tab-spec.md` [CA-RPT]). AI Query is always present.

**Dashboard announcement (mandatory)**: Before generating, say: "I'll generate an interactive Assessment Dashboard — your full assessment visualized across [N] tabs."

**LIM — No guide banners**: Do not add explanatory info/guide banners at the top of each tab. The dashboard content should speak for itself. If a tab needs explanation, the content is not clear enough.

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps, process summary, sources | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count (not "Completion: 100%"). Integrity range shows color-coded ratings per aspect. Process section: strengths/gaps/quick boosts/next steps (folded from former Process tab). Sources list. |
| **Map** | Asset + mentioned locations (mandatory) | Leaflet map. **Always present** — even for single-site assessments, show the site as a point. If Stage 1, 4, or 5 mention other locations (comparison sites, connected sites, regional context), add as secondary points with labels. Asset: blue circle r=10. Comparators/mentioned: slate circle r=7. Click → popup with details. Coordinate source indicator below map. If coordinates unknown, show a placeholder with "Location not specified in source material." See §4a. |
| **Timeline** | Chronological events | **Proportional spacing** based on year gaps. **Color-coded** by change type (use/structure/setting/infrastructure). Distribution summary. |
| **Contexts & Values** | Context cards + value cards + attribute table (merged) | **Contexts section**: Each card shows type label, description, timespan, **clickable value pills**. **Values section**: Cards with name, category pill, evidence indicator (〰️/💭 per notation key), summary. **Attribute table** below with 🔑 Implication column. Cross-referencing works within this tab: clicking a context highlights its related values inline. |
| **Themes** | Value/context/threat thematic clusters (conditional) | Sub-tab pills: "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Theme cards with colored dot, label, member pills (clickable → navigate to item in home tab). Only if ≥2 themes total. See §4b. |
| **Integrity** | Nara Grid cards + summary + vulnerability matrix | Each card: aspect name, description, value expression pills, **color-coded rating badge** (high=green → low=red). Left border color matches rating. **🔴 Vulnerability Analysis** (visible sub-heading): interpretive callout ABOVE the heat matrix (not below). Legend inline: "🔴 = loss severely damages this value, 🟡 = moderate, ⚪ = minor." Each cell shows symbol + number: `● 3` (severe), `◐ 2` (moderate), `○ 1` (minor), `· 0` (negligible) — symbols provide non-color distinction for accessibility. Heat matrix: rows = value categories, columns = Nara aspects with integrity rating in header. Only if vulnerability data exists. |
| **Comparative** | Per-comparator cards + summary | Each card: name, period, architect, criteria ratings (color-coded), distinction narrative. Source note. |
| **Significance** | Statement of cultural significance | Styled as a featured block. |
| **Report** | One-page printable assessment summary | Always generate. Export as HTML or PDF. See §4c [CA-RPT]. |
| **Debrief** | Session debrief Q&A (conditional) | Three reflection questions + user responses. Muted process styling. Only if user completed Debrief block after Stage 6. |
| **Session Analysis** | Session Report [CA-IP] in cbsa-stages.md (conditional) | Interaction Map, Self-Reflection, Session Signature. Muted process styling. Only if user opted in post-[CA-IP] in cbsa-stages.md. |
| **AI Query** | Placeholder mode — starter prompts route to chat | Displays starter prompts; user copies question to chat for full-context answer. No live API calls. See §9a. |

### 4a. Map Tab Spec (mandatory)

**Condition**: Always render. If `asset.coordinates.lat` is non-null, show Leaflet map with markers. If coordinates unknown, show placeholder: "📍 Location not specified in source material — add coordinates to enable map."

- **Library**: Leaflet 1.9.4 from `cdnjs.cloudflare.com`. Guard: `if (typeof L !== 'undefined')`.
- **Tiles**: See [CA-DB-F] Leaflet Map Tiles rule (OSM default + Google layers outside sandbox).
- **Asset marker**: `L.circleMarker`, radius 10, fill `#2563eb`, white stroke width 2. Tooltip: asset name.
- **Comparator markers**: `L.circleMarker`, radius 7, fill `#94a3b8`, stroke color = highest criteria rating color. Only render if that comparator's coordinates are non-null.
- **Asset popup**: name (bold), type, period, description, integrity range summary.
- **Comparator popup**: name (bold), period, architect, distinction (truncated 80 chars), criteria as colored pills.
- **Bounds**: Auto-fit all markers with padding `[40, 40]`. If only asset marker → zoom 12.
- **Coordinate source**: Below the map container, show: "📍 Coordinates: explicit/inferred" matching `asset.coordinateSource`.
- **Container**: `height: min(440px, 60vh); border-radius: 10px; border: 1px solid #e2e8f0`.
- **Cross-referencing**: Click comparator marker → set `highlight = { type: 'comparator', id }` → Comparative tab highlights that card.
- **Leaflet popup close workaround**: Apply checklist item 13.

### 4b. Themes Tab Spec (conditional)

**Condition**: Render only if ≥2 themes total across `valueThemes`, `contextThemes`, and `threatThemes`.

**Layout**: Sub-tab switcher (pill buttons): "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Hide a sub-tab if 0 themes in that category.

**Theme card**:
```
┌─────────────────────────────────────────┐
│ ● Theme Label                    3 items│
│ One-sentence description                │
│ [Value A] [Value B] [Value C]           │
└─────────────────────────────────────────┘
```
- Colored dot matches `theme.color`.
- Member pills are clickable → navigate to the item's home tab (Values or Contexts) with highlight.
- Cards are always expanded (not collapsible).

**Threat Themes** additionally: mini heatmap row showing the vulnerability cells that define the threat pattern (red/amber/neutral from Vulnerability tab palette).

**Theme derivation rules** (instructions for the AI generating the data):
- Group values sharing overlapping contexts or co-occurring in the attribute table.
- Group contexts by temporal overlap or causal relationship.
- Group vulnerability cells by shared high-impact patterns.
- ≥2 members per theme. Label with short noun phrase.
- Include 1-sentence rationale in `description`.

**Integration into existing tabs**:
- Values tab: add a "Thematic Grouping" callout showing theme membership with link to Themes tab.
- Contexts tab: same callout.
- Vulnerability tab: summary row noting identified threat clusters.

### 4c. Report Tab Spec [CA-RPT]

**Condition**: Always generate. Position: after Process, before KG.

**Content philosophy**: LIM — optimal, not minimal. Every section earns its place. Bot decides which insights are most significant. Same visual theme as dashboard. Meaningful titles, emojis where they aid scanning. Conciser if long — condense, don't truncate.

**Core sections** (always present):

| # | Section | Content | Source |
|---|---------|---------|--------|
| 1 | **Asset Header** | Name, location, period, type badge | Overview |
| 2 | **📋 Assessment Overview** | One-paragraph synthesis: what + why it matters | Overview + Significance |
| 3 | **💎 Key Values** | Top cultural values, category pill + evidence indicator (〰️/💭) | Values |
| 4 | **🏛️ Integrity Snapshot** | Condition summary, Nara aspect → rating compact grid | Integrity |
| 5 | **✨ Significance Statement** | Formal statement from Stage 5, featured block | Significance |
| 6 | **📐 Process & Methodology** | Stages completed, sources, evidence coverage, notation | Process |

**Bot-decided sections** (include only when data warrants — max 2 of 3):

| Section | When | Content |
|---------|------|---------|
| **🔗 Context Effects** | Significant bidirectional relationships emerged | Most impactful context↔value effects + connected planning recommendations (if in source) |
| **⚡ Priority Insights** | Surprising or high-priority findings | Key discoveries, emerging patterns, urgent recommendations |
| **🗺️ Comparative Position** | Comparative analysis produced meaningful distinctions | Regional/typological positioning, key differentiators |

**Session sections** (from conversation):

| Section | When | Content |
|---------|------|---------|
| **💬 Session Analytics** | Always | Turns count, stages covered, depth, key decisions. 3-5 bullets. |
| **💡 User Reflections** | User gave reflections during HITL pauses | Key quotes/themes. Omit if none. |

**Layout**: Single column, max-width 720px, centered. Same card system as other tabs.

**Export controls** (in Report tab header):
- **📄 Export HTML** — downloads report as self-contained HTML file (`{asset-name}-report.html`). Clone DOM, inline styles, wrap in HTML5 doc with Google Fonts link.
- **🖨️ Print / PDF** — triggers `window.print()`.
- **Sandbox fallback (mandatory)**: Detect sandbox (`window.location.href === 'about:srcdoc'`). When in sandbox, replace both buttons with a single message: "📥 Download this dashboard file to use Export HTML and Print/PDF features." Do not show broken buttons.

**Print CSS**:
```css
@media print {
  .tab-bar, .sidebar, nav, .export-controls, footer { display: none !important; }
  .report-tab { display: block !important; max-width: 100%; padding: 20mm; }
  .report-section { break-inside: avoid; }
  body { font-size: 11pt; line-height: 1.5; }
  * { background: white !important; color: black !important; }
}
```

**Target length**: 800-1200 words, fitting 1-2 A4 pages.

### 5. Cross-Referencing (mandatory)

The dashboard must implement a shared selection state:

- **Clicking a context** → highlights its related values in the Values tab.
- **Clicking a value** → highlights matching contexts and integrity aspects.
- **Clicking a comparator** (on Map) → highlights its card in the Comparative tab.
- **Clicking a theme member pill** → highlights the specific item in its home tab (Values or Contexts).
- **Clicking a theme card** → highlights all members in their home tabs.
- **Clicking a comparator name** in Comparative tab → highlights on Map (if Map tab exists).
- **Navigating between tabs** preserves the active highlight.
- **Visible indicator** (banner) shows what is currently highlighted, with a Clear action.
- **Back pill**: After any cross-tab highlight jump, show "← Back to [previous tab]" pill. Hide when user navigates manually via tab bar.

Implementation: a top-level `highlight` variable (`{ type: 'value'|'context'|'comparator'|'theme', id: string } | null`) checked by each tab renderer.

### 6. Theme and Readability (mandatory)

**Light theme throughout**: All tabs use the same light palette.

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

### 7. Guide Boxes (mandatory — every tab)

Every tab must include a collapsible guide box at the top, explaining what the tab shows and how to interact with it.

**Structure** (3 zones):
1. **"What you see"** — what the visualization encodes.
2. **"How to interact"** — available actions (click, filter, sort).
3. **"What to look for"** — insight callout with amber left-border accent. The actionable takeaway.

**Behavior**:
- Collapsible with chevron toggle.
- State persisted in localStorage (`guide_[tabId]`). First visit = expanded; returning = collapsed.
- Collapsed state: single line (amber "ℹ" icon + title + chevron), minimal footprint.

**Styling**:
- Compact header: amber icon + tab-specific title + chevron.
- Section labels: small uppercase text.
- Insight callout: `background: #fef3c7; border-left: 3px solid #f59e0b; padding: 8px 12px;`
- Body indented from header for clear nesting.

**Content must be tab-specific** — no generic descriptions. Guide content per tab:
- **Overview**: "KPIs summarize scope; integrity range shows condition at a glance; gaps flag what's missing."
- **Map**: "Asset and comparator locations. Click markers for details. Dotted outline = inferred coordinates."
- **Timeline**: "Events spaced proportionally by year. Color = type of change. Look for clusters of rapid change."
- **Contexts**: "Click a context to highlight related values. Pill links jump to Values tab."
- **Values**: "Evidence markers (〰️/💭) show traceability. Attribute table below shows what sustains each value."
- **Themes**: "Values and contexts grouped by narrative thread. Click members to navigate."
- **Integrity**: "Left border color = integrity rating. Green = high, red = low. Summary links all aspects."
- **Comparative**: "Each site rated on rarity/documentation/condition. Colors match rating."
- **Significance**: "The synthesized statement from Stage 5."
- **Vulnerability**: "Red = high impact if that integrity aspect is lost. Look for columns with concentrated red."
- **Process**: "Strengths, gaps, and quick wins. Action items for next steps."
- **KG**: "Force-directed graph. Drag nodes, scroll to zoom, click for connections."

### 8. Navigation & History (mandatory)

- **URL hash**: Encode active tab in URL hash: `#overview`, `#map`, `#timeline`, etc. Wrap in try-catch — blocked in artifact sandbox.
- **pushState**: Use `history.pushState()` on every tab switch, **wrapped in try-catch**. Tab switching must work even when pushState fails — the in-memory `activeTab` variable is the source of truth, not the URL.
- **popstate**: Listen for `popstate` event to restore tab on browser back/forward. Wrap listener registration in try-catch.
- **Back pill**: After cross-tab jumps (e.g., click comparator on Map → Comparative tab), show "← Back to Map" pill. Hide when user navigates manually via the tab bar.
- **Page load**: On load, attempt to read hash and restore the corresponding tab. Default to Overview if no hash or if hash reading fails. Wrap in try-catch.
- **Sandbox fallback**: All navigation features above are progressive enhancements. The dashboard must be fully functional (all tabs switchable, all cross-references working) even when all URL-based APIs are blocked.

### 9. KG Node Interaction

When a user clicks a KG node, display a **floating popover** adjacent to the clicked node:

- Position: prefer right of node; flip left near container edge; clamp vertically within SVG bounds.
- Content: node name (≥1rem, bold), type badge, meaning (≥0.88rem), connections list with directional arrows and verb labels.
- Connection items: styled as mini-cards (background + border), colored verb labels, white entity names.
- Animate entrance: scale+fade, ≤200ms.
- Dismiss on: close button, background click, or clicking another node.
- **Never require scrolling** to read node info — all content visible within the graph viewport.

### 10. Final Checklist

1. Only include data from the conversation — never fabricate.
2. If a stage was not completed, show as incomplete in progress bar and mark "Not completed" in its tab.
3. Evidence markers (〰️/💭) must match Stage 2 notation and appear consistently in all tabs that reference values.
4. Vulnerability tab only if data exists.
5. Replace `__DATA__` and `__ASSET_NAME__` placeholders with extracted content.
6. **All CBSA stages (1–6) have dedicated tabs** — no merged stages.
7. **Attribute-Value-Implication table** present in Values tab.
8. **Cross-referencing** implemented: at least Context↔Value linking functional.
9. **Readability**: no text below 0.62rem; no contrast ratio below 3:1.
10. **Nara Grid** stored as structured objects, not parsed strings.
11. **CDN source**: Use `cdnjs.cloudflare.com` exclusively for all external libraries (D3, Leaflet, Chart.js). Do NOT use unpkg.com or jsdelivr.net. Add a `typeof` guard before initializing CDN-dependent features.
12. **Inline data**: All extracted data must be embedded inline as JS objects. Do NOT use `fetch()` — the dashboard must work when opened via `file://` protocol without a server.
13. **Leaflet popup close button**: Leaflet's popup close is `<a href="#close">` — in Claude.ai's artifact sandbox, hash links get rewritten. After map init, add: `document.addEventListener('click',function(e){if(e.target.closest('.leaflet-popup-close-button')){e.preventDefault();mapInstance.closePopup();}});`
14. **Chart.js stability**: For doughnut/pie charts, do NOT set `maintainAspectRatio:false` — it causes infinite expansion. Add `canvas{max-height:280px}` CSS to chart containers. Only use `maintainAspectRatio:false` for bar charts in constrained-height containers.
15. **Map tab** conditional on non-null `asset.coordinates.lat`; coordinate source indicator below map; Leaflet `typeof L` guard.
16. **Themes tab** conditional on ≥2 clusters total; member pills linked via cross-referencing; threat themes show mini heatmap.
17. **Guide boxes** on every tab; collapsible with chevron; localStorage state persistence (`guide_[tabId]`); 3-zone structure.
18. **URL hash** encodes active tab; `pushState` on switch; `popstate` listener; back pill after cross-tab jumps.
19. **Cross-referencing** extended to `value|context|comparator|theme` types; back pill shown after highlight jumps.
20. **AI Query tab** uses placeholder mode — starter prompts only, no live API calls.
21. **Sandbox compatibility**: All `history.pushState()`, `localStorage`, `location.hash`, `window.print()`, and blob download calls wrapped in try-catch. Tab switching works via in-memory state. Report export buttons replaced with download prompt when in sandbox. Dashboard fully functional in both artifact preview and standalone mode.

### 9a. AI Query Tab `[CA-AIQ]` (Placeholder Mode)

The AI Query tab uses **placeholder mode** on Claude. No live API calls from the artifact. Starter prompts guide the user to ask questions in the chat conversation, where the bot has full context.

**Starter prompts** (Single Dashboard):
1. "Summarize the significance of this asset"
2. "What are the main gaps in this assessment?"
3. "How do values connect to contexts?"
4. "What does the integrity assessment reveal?"
5. "How does this asset compare to its comparators?"

**UI elements**: Chat-style message area with starter prompt cards. When user clicks a prompt or types a question, display: "💬 Copy this question to the chat conversation for an answer based on the full assessment context." Include a copy-to-clipboard button for the question text. No live API calls are executed from the artifact.

---

**Export Offer (mandatory)**:
After generating the Dashboard, always offer:
> "Would you like me to export this assessment as a formatted Word document?"

### Reference Implementation (if available)

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) implements this spec fully: light theme throughout, all 10 tabs, cross-referencing with shared highlight state, structured Nara Grid, per-comparator cards, vulnerability matrix, proportional timeline with change types, and floating KG popover. Use it as a working example — not as a locked template.
---

## [CA-DB-C] Collection Dashboard — MA-RC Integration

> **Scope**: Collection-level visualization (multiple sites from MA-RC analysis). For single-assessment dashboards (one site, one CBSA process), see [CA-DB] above. Both share the UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Collection: Inter + stone/amber palette.
>
> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-reference.md`, AI Query follows `[CA-AIQ]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

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
