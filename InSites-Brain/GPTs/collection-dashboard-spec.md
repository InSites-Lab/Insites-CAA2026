# [CA-DB-C] Collection Dashboard — MA-RC Integration

## 1. Trigger

- After MA-RC Step 3 analysis: "Would you like a visual dashboard for this collection?"
- On direct request: "dashboard", "collection dashboard", "visualize"
- Execute only on acceptance.

## 2. Output Format — External Runtime

HTML shell with inline data JSON. Runtime handles all rendering.

**Canvas tool (critical)**: emit this shell with the `canmore.create_textdoc` tool (`type: "code/html"`) whenever Canvas/`canmore` is exposed in the current runtime.

**Canvas unavailable fallback**: if `canmore`/Canvas is not exposed (e.g. GPT-5.5 Thinking/Instant, which no longer offer Canvas) or the call fails, do NOT refuse and do NOT invent a substitute — generate the same collection-dashboard shell as a downloadable `/mnt/data/{collection-name}-cbsa-collection-dashboard.html` file, labelled `HTML shell fallback — Canvas unavailable`. A file opened in a real browser loads the runtime correctly (the empty-container caveat applies only to the inline sandbox preview).

**Fallback compliance**: the fallback file must follow this spec exactly — the external runtime + inline data object as defined in the HTML Shell Template below, no `fetch()`, no inline CSS/JS beyond the data assignment, and no custom standalone UI. Never use the KG runtime for a dashboard.

**Download/export copy**: when Canvas is available, offer a download/export copy only on explicit request, after the Canvas exists; when Canvas is unavailable, the downloadable shell IS the primary output.

### HTML Shell Template

```html
<!DOCTYPE html>
<html lang="__LANG__" dir="__DIR__">
<head>
  <meta charset="UTF-8">
  <title>__COLLECTION_NAME__ — Collection Dashboard</title>
  <link rel="stylesheet" href="https://alephplace.com/atar.bot/canvas/dashboard-runtime.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
</head>
<body>
  <div id="dashboard-root"></div>
  <script>window.__COLLECTION_DATA__ = __DATA_JSON__;</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
  <script src="https://alephplace.com/atar.bot/canvas/collection-dashboard-runtime.js"></script>
</body>
</html>
```

Replace `__COLLECTION_NAME__`, `__DATA_JSON__`, `__LANG__` (`en` or `he`), and `__DIR__` (`ltr` or `rtl`) with actual values per Language Policy.

## 3. Data Extraction

Build per-site JSON from MA-RC Step 2 output.

## 4. Data Schema

```jsonc
{
  "collection": { "name", "source", "depth", "date", "itemCount" },
  "sites": [{
    "id", "name", "region", "lat", "lng", "depth", "type", "period",
    "description", "significanceSummary",
    "highlight" (MANDATORY — one-sentence collection-level insight for this site),
    "values": { "historical": "e"|"i"|"a", /* ... */ },
    "integrity", "integrityNote", "threats": [],
    "comparativeBasis", "claimScope"
  }],
  "themes": [{
    "id", "label", "description",
    "sites": ["siteId"],
    "evidence": { "siteId": "supporting text" }
  }],
  "tabs": [{
    "id": "arguments", "label": "Arguments", "icon": "📊",
    "type": "table",
    "data": { "columns": [...], "rows": [...] }
  }]
}
```

### Fixed Tabs (rendered by runtime)

Overview, Map, Values, Themes — always present.

### Dynamic Tabs (from `data.tabs[]`)

Include analysis results from MA-RC Step 3. Supported types:

| Type | `data` shape |
|------|-------------|
| `table` | `{ columns: [...], rows: [...] }` |
| `cards` | `[{ title, body, level, badges }]` |
| `matrix` | `{ rowLabels, colLabels, cells }` (0-3 scale) |
| `prose` | `[{ title, body }]` |
| `custom` | `{ html: "..." }` |

### Themes (MANDATORY)

Always generate themes from MA-RC analysis. Minimum: group sites by overlapping value patterns. Include evidence per site.

## 5. Data Quality Rules

- Only extracted data — nothing fabricated
- `themes[]` must be non-empty
- `site.highlight` must be non-empty for every site — one sentence stating why this site matters in the collection context
- All site names must have valid `id`
- In `tabs[]` data, use exact `site.name` values when referencing sites — the runtime auto-links matching names to map markers
- Coordinates: extract / infer / `null`
- Values: use `"e"` / `"i"` / `"a"` consistently

## 6. Post-Dashboard Offer

"Would you like the extracted collection data as a structured JSON file?"
