# GPT Dashboard & KG Runtimes

> ⚠️ **LEGACY / ARCHIVED — no longer deployed or uploaded.** GPT visual products now render via the shared **`atar-runtime`** package (D3, loaded from `cdn.jsdelivr.net/npm/atar-runtime@<ver>`), converged with Claude/Gemini — see the `InSites-Brain/GPTs/*-spec.md` shells and `InSites-Brain/Claude/atar-runtime/data-contract.md`. The vis-network/alephplace runtime documented below is kept for reference only; the legacy specs that used it are in `InSites-Brain/GPTs/OLD/`.

External JS/CSS files that render GPT-generated dashboards and knowledge graphs. The GPT outputs a short HTML shell with data JSON; these runtimes handle all rendering.

## Deployment

Upload to `alephplace.com/atar.bot/canvas/`:

```
kg-runtime.js                       ← KG renderer (vis-network)
kg-runtime.css                      ← KG styles
dashboard-runtime.js                ← Single assessment dashboard (8 tabs + dynamic)
dashboard-runtime.css                ← Shared dashboard styles
collection-dashboard-runtime.js     ← Collection dashboard (4 fixed + dynamic tabs)
```

## How It Works

1. GPT generates an HTML shell with `window.__DASHBOARD_DATA__` (or `__COLLECTION_DATA__`) as inline JSON
2. Shell loads Leaflet from cdnjs + runtime JS/CSS from alephplace.com
3. Runtime reads the JSON and renders all tabs, maps, charts, cross-referencing

## Key Patterns

- `<div id="dashboard-root">` — the container the runtime renders into
- RTL auto-detected from data content (Hebrew regex)
- Google Maps tiles with language auto-detect (`hl=iw`/`en`)
- Dynamic `data.tabs[]` for session-specific content
- `siteNameMap` auto-links entity names in tables to map markers

## NOT uploaded to GPT

These files are hosted externally — they are NOT uploaded as GPT knowledge files. The HTML shell loads them via `<script>` tags.
