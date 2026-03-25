# [CA-DB] Assessment Dashboard — CBSA Integration

Generate an interactive Assessment Dashboard as a Canvas document (HTML) after Stage 6, when the user explicitly requests it.

---

## 1. Trigger and Offer

- **Mandatory offer** at end of Stage 6: "Would you like me to generate an interactive Assessment Dashboard?"
- Execute only on acceptance.
- Output as a **Canvas document** (self-contained HTML with inline CSS/JS, D3 from CDN).
- No surrounding prose — deliver the Canvas directly.

## 2. Data Extraction

Re-read all stage outputs and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps |
| Timeline | Stage 1 | 5–10 key dated events with year, label, and change type |
| Contexts | Stage 1 | Each: type label, description, related value categories, timespan |
| Values | Stage 2 | Each: name, category, evidence strength, 1-line summary |
| Attribute Table | Stage 2.1 | Each: attribute, associated values, significance, implication |
| Authenticity | Stage 3 | Nara Grid as structured objects + summary sentence |
| Comparative | Stage 4 | Per-comparator objects with criteria ratings + summary |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level |
| Process Quality | Stage 6 | Quick boosts, next steps, strengths count, gaps count |
| Knowledge Graph | [CA-KG] | If KG was generated: full nodes/edges JSON. If not: null |

**Rule**: Only include data from the conversation. Never fabricate. If a stage was skipped, show "Not completed".

## 3. Data Schema

```json
{
  "asset": { "name": "", "location": "", "type": "", "period": "", "description": "" },
  "dataQuality": { "sources": ["filename.pdf"], "gaps": ["missing X"] },
  "timeline": [
    { "year": "1923–1924", "yearStart": 1923, "label": "...", "changeType": "fabric" }
  ],
  "contexts": [
    { "id": "ctx_hist", "type": "historical", "label": "...", "relatedValues": ["Historical"], "timespan": "1915–1960s" }
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

**Schema rules:**
- `authenticity.grid` must be structured objects — never flatten to strings.
- `comparative.comparators` must be per-site objects with criteria — never a flat name list.
- `timeline[].changeType` is mandatory (fabric / infrastructure / use / setting / interpretation). Values match [CA-T] in cbsa-method.md.
- `contexts[].relatedValues` links each context to value categories.
- `vulnerability` impact levels: 3 = severe damage, 2 = moderate, 1 = minor.

## 4. Tab Structure

Each CBSA stage has its own tab. Never merge stages.

```
Overview → Timeline → Contexts → Values → Integrity → Comparative → Significance → [Vulnerability] → Process → [KG]
```

Brackets = conditional (Vulnerability only if data exists; KG only if generated).

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count. Integrity range: color-coded per aspect. |
| **Timeline** | Chronological events | Proportional spacing by year. Color-coded by change type. Distribution summary. |
| **Contexts** | Context cards with related values | Type label, description, timespan, clickable value pills. |
| **Values** | Value cards + Attribute table | Cards: category pill, evidence indicator (●/◐/○), summary. Below: full attribute table with implications. |
| **Integrity** | Nara Grid cards + summary | Each card: aspect, description, value expression pills, color-coded rating badge. Left border matches rating. |
| **Comparative** | Per-comparator cards + summary | Name, period, architect, criteria ratings (color-coded), distinction. |
| **Significance** | Statement | Styled as featured block. |
| **Vulnerability** | Heat matrix | Rows = values, columns = Nara aspects with current rating. Cells by impact (red/amber/neutral). 2-3 sentence callout. |
| **Process** | KPIs, next steps, quick boosts | Three-column KPI. Two-column: next steps + quick boosts. Sources list. |
| **KG** | Embedded MiniKG with popover | D3 force-directed. Banner: "Standalone KG has richer features." See §7. |

## 5. Cross-Referencing (mandatory)

Implement a shared selection state:
- Clicking a context → highlights its related values in Values tab
- Clicking a value → highlights matching contexts and integrity aspects
- Tab navigation preserves active highlight
- Banner shows what is highlighted + Clear action

Implementation: top-level `highlight` variable checked by each tab renderer.

## 6. Theme and Readability

**Hybrid theme**: Light background for text-heavy tabs. Dark canvas only for KG tab.

**Light mode (text tabs):**
```
Background: #f8fafc → cards: #ffffff → borders: #e2e8f0
Text: #1e293b → dim: #64748b → muted: #94a3b8
Accent: #2563eb
```

**Dark mode (KG tab only):**
```
Background: #0a1120 → cards: #1e293b → borders: #334155
Text: #e2e8f0 → dim: #b0bfd0
```

**Readability requirements:**
- Body text: ≥ 0.84rem, contrast ≥ 4.5:1
- Section labels: ≥ 0.72rem
- Pills/badges: ≥ 0.66rem
- KG labels: ≥ 10px, contrast ≥ 3:1, text-shadow for legibility
- No text below 0.62rem anywhere

## 7. KG Node Interaction (MiniKG)

On click, display a floating popover adjacent to the node:
- Position: prefer right; flip near edges; clamp vertically
- Content: node name (≥1rem bold), type badge, meaning (≥0.88rem), connections with arrows and verbs
- Connection items: mini-cards with colored verbs, white entity names
- Animate: scale+fade ≤200ms
- Dismiss: close button, background click, or clicking another node
- Never require scrolling to read node info

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

## 9. AI Query in Dashboard

If KG tab is present, include the same Gemini AI Query capability as described in kg-spec.md §5:
- Configuration panel (collapsible, Gemini 2.0 Flash)
- System prompt referencing the KG data JSON
- Chat interface within the KG tab sidebar

## 10. Final Checklist

1. Only data from conversation — never fabricate.
2. Incomplete stages: show "Not completed" in tab.
3. Evidence indicators match Stage 2 markers.
4. KG tab only if KG generated; Vulnerability only if data exists.
5. All CBSA stages (1-6) have dedicated tabs.
6. Attribute-Value-Implication table in Values tab.
7. Cross-referencing: Context↔Value linking functional.
8. Readability: no text below 0.62rem; contrast ≥ 3:1.
9. Nara Grid as structured objects.
10. 7-lens build checklist items verified.

## 11. Post-Dashboard Offers (mandatory)

After generating: "Would you like me to export this assessment as a formatted Word document?"

---

**END OF DASHBOARD SPECIFICATION**