# [CA-DB] Assessment Dashboard — CBSA Integration

> **Architecture**: External runtime pattern. The GPT outputs a short HTML shell (~30 lines) with extracted data as JSON. All rendering, tabs, styling, cross-referencing, guide boxes, navigation, and interactivity are handled by `dashboard-runtime.js` and `dashboard-runtime.css` loaded from CDN.

---

## 1. Trigger and Offer

- **Mandatory offer** at end of Stage 6: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- Execute only on acceptance — do not auto-generate.
- Output as a **Canvas document** (HTML shell loading external runtime).
- Respond **only** with the Canvas directly — no surrounding prose.
- **Dashboard announcement**: Before generating, say: "I'll generate an interactive Assessment Dashboard — your full assessment visualized across [N] tabs."

## 2. Output Format — External Runtime

The bot outputs an HTML shell that loads the dashboard runtime from CDN. The bot's only job is **data extraction** — all rendering, tab structure, cross-referencing, guide boxes, navigation, print CSS, and AI Query are handled by the runtime.

### HTML Shell Template

```html
<!DOCTYPE html>
<html lang="__LANG__" dir="__DIR__">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>__ASSET_NAME__ — CBSA Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
  <link rel="stylesheet" href="https://alephplace.com/atar.bot/canvas/dashboard-runtime.css"/>
</head>
<body>
  <div id="dashboard-root"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
  <script>
    window.__DASHBOARD_DATA__ = {
      // ... extracted data object (see §4 Data Schema) ...
    };
  </script>
  <script src="https://alephplace.com/atar.bot/canvas/dashboard-runtime.js"></script>
</body>
</html>
```

**Rules**:
- Set `__LANG__` to `"he"` / `"en"` and `__DIR__` to `"rtl"` / `"ltr"` based on content language.
- Replace `__ASSET_NAME__` with the site name.
- The `window.__DASHBOARD_DATA__` object must be valid JSON embedded inline — no `fetch()` calls.
- Do NOT add any inline CSS or JS beyond the data assignment. The runtime handles everything.

## 3. Data Extraction

Re-read all stage outputs from the conversation and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps (list) |
| Timeline | Stage 1 | 5–10 key dated events with year, label, and change type (use/structure/setting/infrastructure) |
| Contexts | Stage 1 | Each context: type label, description, related value categories, timespan |
| Values | Stage 2 | Each value: name, category ([CA-V]), evidence strength (sourced/inferred/uncertain), 1-line summary |
| Attribute Table | Stage 2.2 | Each row: attribute name, associated value categories, site-specific significance, implication |
| Authenticity | Stage 3 | Nara Grid as structured objects: aspect, attribute description, value expression, integrity rating (high/medium/low-medium/low). Plus summary. |
| Comparative | Stage 4 | Each comparator: name, period, architect, distinction, criteria ratings (rarity, documentation, condition). Plus summary. |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level (3=high, 2=medium, 1=low) |
| Process Quality | Stage 6 | Quick boosts, next steps, strengths count, gaps count |
| Knowledge Graph | [CA-KG] | If KG was generated: full nodes and edges JSON. If not: null. |
| Location | Stage 0 + context | Lat/lng for asset and each comparator. Explicit, inferred, or null. |
| Thematic Clusters | Stages 1–3 | Group values by overlapping contexts, contexts by temporal/causal overlap, vulnerability cells by shared high-impact patterns. ≥2 members per theme. |

## 4. Data Schema

```json
{
  "asset": {
    "name": "", "location": "", "type": "", "period": "",
    "description": "", "coordinates": { "lat": null, "lng": null },
    "coordinateSource": "explicit|inferred|unknown"
  },
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
  "tabs": []
}
```

### Dynamic Tabs (`data.tabs[]`)

If MA-RA readings were performed during the session, include them as additional tabs. The runtime renders each entry as a new tab after the core tabs.

```json
"tabs": [
  {
    "id": "reading_evidence",
    "label": "Evidence Weight",
    "type": "ma-ra-reading",
    "data": { "readingType": "evidence-weight", "content": "..." }
  },
  {
    "id": "reading_stakeholder",
    "label": "Stakeholder Lens",
    "type": "ma-ra-reading",
    "data": { "readingType": "stakeholder-lens", "content": "..." }
  }
]
```

Each tab entry: `id` (unique slug), `label` (tab display name), `type` (`"ma-ra-reading"` | `"debrief"`), `data` (type-specific payload — the runtime knows how to render each type).

## 5. Data Quality Rules

1. Only include data that actually appeared in the conversation — never fabricate.
2. If a stage was skipped or incomplete, set its fields to `null` and include the stage number in `stagesCompleted` only if it was actually completed.
3. Evidence markers must match Stage 2 notation (sourced/inferred/uncertain).
4. `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
5. `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
6. `timeline[].changeType` is mandatory for every event.
7. `contexts[].relatedValues` must link each context to the value categories it generates.
8. Coordinates: extract if explicit in source, infer from well-known place names, or set `null`. Set `coordinateSource` accordingly.
9. `vulnerability` impact levels: 3 = loss severely damages this value; 2 = moderate; 1 = minor or indirect.
10. `themes`: ≥2 members per theme; only populate if ≥3 values OR ≥3 contexts exist.
11. In `tabs[]` data, use exact entity names (asset name, comparator names) when referencing them — the runtime auto-links matching names to map markers.

## 6. Post-Dashboard Offers

After generating the Dashboard, offer next steps in the workflow chain [CA-WF]:

> "Would you like me to:
> 1. **Export** as a formatted Word document?
> 2. **Read-Assessment** — analyze from different angles (evidence weight, stakeholder lens, context-effect audit)?
>
> You can do both, one, or neither. After that → Session Debrief."

Use **Code Interpreter** for DOCX export. Do not stop at file delivery if a logical next step exists.

**Post-session augmentation**: After Debrief, offer to append it as a dashboard tab (add an entry to `tabs[]` and regenerate the shell). Debrief content uses `type: "debrief"` — the runtime renders this with muted process styling, visually separated from heritage evidence.

## 7. Reference

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) is a working example of the data shape this spec produces. Use it as reference for data extraction — not as a rendering template (the runtime handles rendering).

---

**END OF DASHBOARD SPECIFICATION**
