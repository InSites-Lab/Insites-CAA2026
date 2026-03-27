---
name: cbsa-assessment-dashboard
description: Generates interactive single-assessment CBSA dashboard with up to 12 tabs (including conditional Map, Themes) after Stage 6 completion. Trigger on "dashboard", "summary dashboard", "create dashboard". Produces self-contained HTML with D3, Leaflet, cross-referencing, guide boxes, and navigation history.
---

# [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: This dashboard spec is for **single-assessment** visualization (one site, one CBSA process). For collection-level dashboards (multiple sites), see [CA-DB-C] in the MA-RC skill. Both share the same UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Single-assessment: DM Sans + blue accent (#2563eb). Collection: Inter + stone/amber.
>
> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `[CA-EC]`, AI Query follows `[CA-AIQ]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

Generate an interactive Assessment Dashboard after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

⚠ Apply Language Policy to all dashboard text.

## 1. Trigger and Offer

- **Mandatory offer**: At the end of Stage 6, always present: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- **Execute only on acceptance** — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: Generate as a single self-contained **HTML file** (vanilla JS + D3 from CDN). No build toolchain required.

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
| Location Coordinates | Stage 0 + context | Lat/lng for asset and each comparator. Explicit from source, inferred from place names, or null. |
| Thematic Clusters | Stages 1–3 | Group values by overlapping contexts, contexts by temporal/causal overlap, vulnerability cells by shared high-impact patterns. |

**Rule**: Only include data that actually appeared in the conversation. Do not fabricate. If a stage was skipped or incomplete, show it as "Not completed" with a visual indicator.

## 3. Data Schema (strict)

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
  }
}
```

**Schema rules**:
- `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
- `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
- `timeline[].changeType` is mandatory — every event classifies what kind of change occurred.
- `contexts[].relatedValues` links each context to the value categories it generates — this enables cross-referencing.
- `vulnerability` is derived by cross-reading Stage 2 implications against Stage 3 ratings. Impact levels: 3 = loss of this integrity aspect severely damages this value; 2 = moderate damage; 1 = minor or indirect.
- `asset.coordinates`: Extract lat/lng if explicit in source material; infer from well-known place names; set null if unknown. Set `coordinateSource` accordingly.
- `comparative.comparators[].coordinates`: Same logic per comparator site.
- `themes`: Group related values/contexts/vulnerabilities by narrative thread. Rules: ≥2 members per theme; only populate if ≥3 values OR ≥3 contexts exist.

## 4. Tab Structure (mandatory)

Each CBSA stage must have its own tab. Do not merge stages.

```
Overview → [Map] → Timeline → Contexts → Values → [Themes] → Integrity → Comparative → Significance → [Vulnerability] → Process → [KG] → AI Query
```

Brackets = conditional: Map only if `asset.coordinates.lat` is non-null; Themes only if ≥2 themes total across all categories; Vulnerability only if data exists; KG only if generated during session.

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count (not "Completion: 100%"). Integrity range shows color-coded ratings per aspect. |
| **Map** | Asset + comparator locations (conditional) | Leaflet map. Asset: blue circle r=10. Comparators: slate circle r=7. Click → popup with details. Coordinate source indicator below map. Only render if `asset.coordinates.lat` non-null. See §4a. |
| **Timeline** | Chronological events | **Proportional spacing** based on year gaps. **Color-coded** by change type (use/structure/setting/infrastructure). Distribution summary. |
| **Contexts** | Context cards with related values | Each card shows: type label, description, timespan, **clickable value pills**. Clicking a context highlights related values in Values tab. |
| **Values** | Value cards + Attribute-Value-Implication table | Cards: name, category pill, evidence indicator (●/◐/○), summary. Below: full attribute table with implication warnings. |
| **Themes** | Value/context/threat thematic clusters (conditional) | Sub-tab pills: "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Theme cards with colored dot, label, member pills (clickable → navigate to item in home tab). Only if ≥2 themes total. See §4b. |
| **Integrity** | Nara Grid cards + summary | Each card: aspect name, description, value expression pills, **color-coded rating badge** (high=green → low=red). Left border color matches rating. |
| **Comparative** | Per-comparator cards + summary | Each card: name, period, architect, criteria ratings (color-coded), distinction narrative. Source note. |
| **Significance** | Statement of cultural significance | Styled as a featured block. |
| **Vulnerability** | Heat matrix: values × Nara aspects | Rows = value categories, columns = Nara aspects. Column headers show current integrity rating. Cells colored by impact (red/amber/neutral). 2–3 sentence interpretive callout. |
| **Process** | KPIs, next steps, quick boosts, sources | Three-column KPI (strengths/gaps/boosts). Two-column layout: next steps + quick boosts. Sources list. |
| **KG** | Embedded MiniKG with floating popover | If a KG was generated earlier in the session, reuse its graph data JSON (nodes + edges) — do not re-extract. Otherwise extract from stage outputs. D3 force-directed graph. See §9 for interaction. |
| **AI Query** | In-artifact heritage analysis chat | Implements `[CA-AIQ]` contract. Claude: Anthropic endpoint. Gemini: swap endpoint per `[CA-AIQ]`. GPT: placeholder mode (starter prompts only). See §9a. |

### 4a. Map Tab Spec (conditional)

**Condition**: Render only if `asset.coordinates.lat` is non-null.

- **Library**: Leaflet 1.9.4 from `cdnjs.cloudflare.com`. Guard: `if (typeof L !== 'undefined')`.
- **Tiles**: OpenStreetMap.
- **Asset marker**: `L.circleMarker`, radius 10, fill `#2563eb`, white stroke width 2. Tooltip: asset name.
- **Comparator markers**: `L.circleMarker`, radius 7, fill `#94a3b8`, stroke color = highest criteria rating color. Only render if that comparator's coordinates are non-null.
- **Asset popup**: name (bold), type, period, description, integrity range summary.
- **Comparator popup**: name (bold), period, architect, distinction (truncated 80 chars), criteria as colored pills.
- **Bounds**: Auto-fit all markers with padding `[40, 40]`. If only asset marker → zoom 12.
- **Coordinate source**: Below the map container, show: "📍 Coordinates: explicit/inferred" matching `asset.coordinateSource`.
- **Container**: `height: 440px; border-radius: 10px; border: 1px solid #e2e8f0`.
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

**Threat Themes** additionally: mini heatmap row showing the vulnerability cells that define the threat pattern.

**Integration into existing tabs**:
- Values tab: add a "Thematic Grouping" callout showing theme membership with link to Themes tab.
- Contexts tab: same callout.
- Vulnerability tab: summary row noting identified threat clusters.

## 5. Cross-Referencing (mandatory)

The dashboard must implement a shared selection state:

- **Clicking a context** → highlights its related values in the Values tab.
- **Clicking a value** → highlights matching contexts and integrity aspects.
- **Clicking a comparator** (on Map) → highlights its card in the Comparative tab.
- **Clicking a theme member pill** → highlights the specific item in its home tab.
- **Clicking a theme card** → highlights all members in their home tabs.
- **Clicking a comparator name** in Comparative tab → highlights on Map (if Map tab exists).
- **Navigating between tabs** preserves the active highlight.
- **Visible indicator** (banner) shows what is currently highlighted, with a Clear action.
- **Back pill**: After any cross-tab highlight jump, show "← Back to [previous tab]" pill. Hide when user navigates manually via tab bar.

Implementation: a top-level `highlight` variable (`{ type: 'value'|'context'|'comparator'|'theme', id: string } | null`) checked by each tab renderer.

## 6. Theme and Readability (mandatory)

**Light theme throughout**: All tabs — including KG — use the same light palette.

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

## 7. Guide Boxes (mandatory — every tab)

Every tab must include a collapsible guide box at the top.

**Structure** (3 zones): "What you see" (encoding), "How to interact" (actions), "What to look for" (insight callout with amber left-border accent).

**Behavior**: Collapsible with chevron toggle. State persisted in localStorage (`guide_[tabId]`). First visit = expanded; returning = collapsed.

**Styling**: Compact header (amber "ℹ" icon + title + chevron). Insight callout: `background: #fef3c7; border-left: 3px solid #f59e0b;`

**Content must be tab-specific.** See mono v4 §7 for per-tab guide content.

## 8. Navigation & History (mandatory)

- Encode active tab in URL hash: `#overview`, `#map`, `#timeline`, etc.
- `history.pushState()` on every tab switch.
- `popstate` listener for back/forward.
- After cross-tab jumps, show "← Back to [previous tab]" pill.
- On page load, read hash and restore tab.

## 9. KG Node Interaction

When a user clicks a KG node, display a **floating popover** adjacent to the clicked node:

- Position: prefer right of node; flip left near container edge; clamp vertically within SVG bounds.
- Content: node name (≥1rem, bold), type badge, meaning (≥0.88rem), connections list with directional arrows and verb labels.
- Connection items: styled as mini-cards (background + border), colored verb labels, white entity names.
- Animate entrance: scale+fade, ≤200ms.
- Dismiss on: close button, background click, or clicking another node.
- **Never require scrolling** to read node info — all content visible within the graph viewport.

## 9a. AI Query Tab `[CA-AIQ]`

The AI Query tab implements the generic AI Query contract from `artifact-ux-contract.md` §2.

**Platform behavior:**
- **Claude**: Live analysis via Anthropic API (`POST https://api.anthropic.com/v1/messages`). No API key needed in artifact context.
- **Gemini**: Live analysis via Gemini API. Swap the API call block per `[CA-AIQ]` contract.
- **GPT**: Placeholder mode — display starter prompts, route queries to GPT conversation.

**System prompt**: "You are a heritage expert analyzing an Assessment Dashboard. Be concise (max 150 words). Format using markdown lists and bold text. Base your answer ONLY on this data JSON: {dataJSON}"

**Starter prompts** (Single Dashboard):
1. "Summarize the significance of this asset"
2. "What are the main gaps in this assessment?"
3. "How do values connect to contexts?"
4. "What does the integrity assessment reveal?"
5. "How does this asset compare to its comparators?"

**UI elements**: Chat-style message list (user = right-aligned accent bubble, assistant = left-aligned card with blue-500 left border), input field + Send button, 5 starter prompt cards. See `[CA-AIQ]` for full shared UI spec.

## 10. Entity Categories [CA-EC]

Use these categories for KG node coloring within the dashboard:

| Category | Description |
| --- | --- |
| Place | A geographic location, area, or region relevant to the heritage asset |
| Structure / Building | A constructed edifice or architectural ensemble |
| Architectural Element | A specific component of a structure (column, arch, frieze, etc.) |
| Person | An individual historically or culturally linked to the asset |
| Event | A discrete historical occurrence tied to the asset's timeline |
| Story / Narrative | An oral tradition, legend, or documented account |
| Cultural Value | An abstract value category from the CBSA assessment |
| Natural Phenomenon | A geological, ecological, or climatic feature |
| Artwork / Artefact | A movable object, inscription, or decorative element |
| Tradition / Custom | A recurring cultural practice associated with the asset |
| Social Group | A community, guild, congregation, or population segment |
| Historical Period | A defined chronological era relevant to the assessment |
| Religion / Belief | A faith system, cosmology, or spiritual practice |
| Collective Memory | A shared remembrance, commemoration, or cultural narrative |

## 11. Final Checklist

1. Only include data from the conversation — never fabricate.
2. If a stage was not completed, show as incomplete in progress bar and mark "Not completed" in its tab.
3. Evidence indicators (●/◐/○) must match Stage 2 markers and appear consistently in all tabs that reference values.
4. KG tab appears only if KG was generated during the session; Vulnerability tab only if data exists.
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

---

**Export Offer (mandatory)**:
After generating the Dashboard, always offer:
> "Would you like me to export this assessment as a formatted Word document?"

20. **AI Query tab** implements `[CA-AIQ]` contract with correct platform mode (anthropic/gemini/placeholder).

## Gemini Deployment

This skill file works for both Claude and Gemini. When deploying to Gemini:
1. Activate canvas mode before generating artifacts (otherwise Gemini outputs code as text)
2. Swap the AI Query API call block from Anthropic to Gemini endpoint per `[CA-AIQ]` §2
3. Everything else — visual language, tabs, interactions, entity types — is identical

## Reference Implementation (if available)

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) implements this spec fully: light theme throughout, all 10 tabs, cross-referencing with shared highlight state, structured Nara Grid, per-comparator cards, vulnerability matrix, proportional timeline with change types, and floating KG popover. Use it as a working example — not as a locked template.
