---
name: cbsa-assessment-dashboard
description: Generates interactive single-assessment CBSA dashboard with 10 tabs after Stage 6 completion. Trigger on "dashboard", "summary dashboard", "create dashboard". Produces self-contained HTML with D3, cross-referencing, and light theme.
---

# [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: This dashboard spec is for **single-assessment** visualization (one site, one CBSA process). For collection-level dashboards (multiple sites), see the MA-RC workflow — collection dashboards have a different data shape and tab structure. Both share the same visual language (stone/amber palette, serif typography).

Generate an interactive Assessment Dashboard after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

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

## 4. Tab Structure (mandatory)

Each CBSA stage must have its own tab. Do not merge stages.

```
Overview → Timeline → Contexts → Values → Integrity → Comparative → Significance → [Vulnerability] → Process → [KG]
```

Brackets = conditional (Vulnerability only if data exists; KG only if generated during session).

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count (not "Completion: 100%"). Integrity range shows color-coded ratings per aspect. |
| **Timeline** | Chronological events | **Proportional spacing** based on year gaps. **Color-coded** by change type (use/structure/setting/infrastructure). Distribution summary. |
| **Contexts** | Context cards with related values | Each card shows: type label, description, timespan, **clickable value pills**. Clicking a context highlights related values in Values tab. |
| **Values** | Value cards + Attribute-Value-Implication table | Cards: name, category pill, evidence indicator (●/◐/○), summary. Below: full attribute table with implication warnings. |
| **Integrity** | Nara Grid cards + summary | Each card: aspect name, description, value expression pills, **color-coded rating badge** (high=green → low=red). Left border color matches rating. |
| **Comparative** | Per-comparator cards + summary | Each card: name, period, architect, criteria ratings (color-coded), distinction narrative. Source note. |
| **Significance** | Statement of cultural significance | Styled as a featured block. |
| **Vulnerability** | Heat matrix: values × Nara aspects | Rows = value categories, columns = Nara aspects. Column headers show current integrity rating. Cells colored by impact (red/amber/neutral). 2–3 sentence interpretive callout. |
| **Process** | KPIs, next steps, quick boosts, sources | Three-column KPI (strengths/gaps/boosts). Two-column layout: next steps + quick boosts. Sources list. |
| **KG** | Embedded MiniKG with floating popover | D3 force-directed graph. Banner noting standalone KG has richer features. See §7 for interaction. |

## 5. Cross-Referencing (mandatory)

The dashboard must implement a shared selection state:

- **Clicking a context** → highlights its related values in the Values tab.
- **Clicking a value** → highlights matching contexts and integrity aspects.
- **Navigating between tabs** preserves the active highlight.
- **Visible indicator** (banner) shows what is currently highlighted, with a Clear action.

Implementation: a top-level `highlight` variable (`{ type: 'value'|'context', id: string } | null`) checked by each tab renderer.

## 6. Theme and Readability (mandatory)

**Light theme throughout**. All tabs use the light palette. The KG tab uses the same light chrome palette as the standalone KG [CA-KG] for visual coherence.

**Light mode palette**:
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
- KG node labels: include text-shadow or halo for legibility
- **No text below 0.62rem anywhere**

## 7. KG Node Interaction

When a user clicks a KG node, display a **floating popover** adjacent to the clicked node:

- Position: prefer right of node; flip left near container edge; clamp vertically within SVG bounds.
- Content: node name (≥1rem, bold), type badge, meaning (≥0.88rem), connections list with directional arrows and verb labels.
- Connection items: styled as mini-cards (background + border), colored verb labels, white entity names.
- Animate entrance: scale+fade, ≤200ms.
- Dismiss on: close button, background click, or clicking another node.
- **Never require scrolling** to read node info — all content visible within the graph viewport.

## 8. Entity Categories

For KG tab node coloring, use entity categories from the KG skill [CA-EC].

## 9. Final Checklist

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

---

**Export Offer (mandatory)**:
After generating the Dashboard, always offer:
> "Would you like me to export this assessment as a formatted Word document?"

## Reference Implementation (if available)

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) implements this spec fully: light theme, all 10 tabs, cross-referencing with shared highlight state, structured Nara Grid, per-comparator cards, vulnerability matrix, proportional timeline with change types, and floating KG popover. Use it as a working example — not as a locked template.
