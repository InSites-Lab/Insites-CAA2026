# kg-spec.md — CA-KG Knowledge Graph Specification (GPT)

## Purpose

Create CA-KG Knowledge Graph canvases with a minimal HTML shell and shared external runtime files hosted on `alephplace.com`.

**Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `[CA-EC]`, AI Query follows `[CA-AIQ]` placeholder mode. See `artifact-ux-contract.md` for the cross-platform source of truth.

## Hard Contract

This specification is a required implementation contract, not guidance.

When CA-KG is triggered, the assistant must execute this specification exactly.

Required:
- use the CA-KG HTML shell structure below
- load `vis-network` from the approved CDN
- load external `kg-runtime.css` from `alephplace.com`
- load external `kg-runtime.js` from `alephplace.com`
- place only the graph data in `window.__DATA_JSON__`

Forbidden:
- custom standalone inline JS app
- custom standalone inline CSS system
- alternative graph framework (no React, D3, Chart.js, etc.)
- recreating toolbar, search, filter, sidebar, or status logic inline
- "equivalent" implementations based on assistant judgment
- embedding entity colors, node sizing, or sidebar rendering inline

**Why external runtime**: GPT Canvas truncates long inline code. The runtime handles ALL rendering — colors, sidebar (3 tabs), legend, physics, selection. The canvas must stay thin.

If exact execution is blocked, state the blocker and stop. Do not substitute another implementation.

## HTML Generation Pattern

Generate exactly this structure. Only replace `{LANG}`, `{DIR}`, `{TITLE}`, and the `DATA` content:

```html
<!DOCTYPE html>
<html lang="{LANG}" dir="{DIR}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>{TITLE} — Knowledge Graph</title>
  <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;800&family=Noto+Sans+Hebrew:wght@400;600;700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://alephplace.com/atar.bot/canvas/kg-runtime.css"/>
  <style>
    #kg-app { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="kg-app">
    <div id="kg-toolbar"></div>
    <div id="kg-network"></div>
    <aside id="kg-sidebar"></aside>
  </div>

  <script>
    window.__DATA_JSON__ = {
      title: "{TITLE}",
      nodes: [
        /* bot fills extracted nodes here */
      ],
      edges: [
        /* bot fills extracted edges here */
      ]
    };
  </script>
  <script src="https://alephplace.com/atar.bot/canvas/kg-runtime.js"></script>
</body>
</html>
```

Only the graph data belongs in the inline script block. Everything else is handled by the external runtime.

## Data Contract

### Required Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (snake_case, e.g. `asset_tower`) |
| `name` | string | Display name |
| `type` | string | One of the 15 canonical entity types (see below) |
| `meaning` | string | Heritage significance description |

### Optional Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `value_type` | string | For Cultural Value nodes: Historical, Aesthetic, Social, etc. |
| `meta` | object | Additional key-value pairs displayed in sidebar |

### Required Edge Fields

| Field | Type | Description |
|-------|------|-------------|
| `from` | string | Source node `id` |
| `to` | string | Target node `id` |
| `label` | string | Relationship verb (e.g. `embodies`, `frames`, `situates`) |

## Entity Types and Colors [CA-EC]

The runtime resolves colors automatically from the `type` field. The bot must NOT specify `color` per node — only `type`.

15 canonical types:

| Type | Hex |
|------|-----|
| Asset | #E53935 |
| Natural Phenomenon | #0ea5e9 |
| Structure / Building | #f59e0b |
| Architectural Element | #d97706 |
| Person | #ec4899 |
| Event | #ef4444 |
| Story / Narrative | #8b5cf6 |
| Social Group | #3b82f6 |
| Cultural Value | #6366f1 |
| Place | #10b981 |
| Artwork / Artefact | #f43f5e |
| Tradition / Custom | #14b8a6 |
| Historical Period | #64748b |
| Religion / Belief | #a855f7 |
| Collective Memory | #84cc16 |

The runtime also accepts Hebrew type names (e.g., "מבנה", "ערך תרבותי") and maps them automatically. Unknown types receive a dynamic fallback color.

## Node Sizing

The runtime applies three sizing tiers automatically:

| Tier | Applies to | Radius |
|------|-----------|--------|
| Asset | type === `Asset` | 16px |
| Value | type === `Cultural Value` or `value_type` is set | 11px |
| Default | all others | 9px |

## Graph Limits

- Target: 10–15 nodes, max 20
- Edges: max 25
- User can request more

## Runtime-Provided UX

The external runtime (`kg-runtime.js` + `kg-runtime.css`) provides all of the following automatically. The bot does NOT need to implement any of this:

### Graph
- Colored dot nodes with labels below (per [CA-EC])
- Curved edges (cubic Bézier) with arrow markers
- Pan and zoom
- Click node → selects, dims non-connected nodes (opacity 0.22), updates sidebar
- Click empty space → clears selection
- Physics stabilization then auto-disable (prevents jumping on Canvas re-render)

### Toolbar
- Title and subtitle
- Node/edge count pills
- Search (applies on Enter, does not restart physics)
- Type filter buttons with colored dots

### Sidebar (3 tabs)
- **Info**: node details (name, type badge, meaning, value_type, meta) + outgoing/incoming connections as clickable cards
- **Analytics**: 2×2 stat grid (Nodes, Edges, Types, Density) + top 5 most connected nodes
- **AI Query**: placeholder mode — title, description, example prompts for the GPT chat

### Legend
- Bottom of canvas, shows only types present in current data
- Colored dot + type label

### Language
- Auto-detects RTL from node content (Hebrew, Arabic)
- Switches all UI labels to Hebrew when RTL detected
- Respects `lang` and `dir` attributes on `<html>`

## Language and Direction

Set `lang` and `dir` on `<html>` to match the user's instruction language:
- English → `lang="en" dir="ltr"`
- Hebrew → `lang="he" dir="rtl"`
- Arabic → `lang="ar" dir="rtl"`

## AI Query Tab [CA-AIQ]

Follows **placeholder mode** (GPT platform). No live API calls from the artifact — all interpretation is routed through the GPT conversation. The runtime displays:
- Title ("Deep Graph Query")
- Explanation of capabilities
- 4 example prompts users can copy into chat

## Compliance Check

Before returning a Knowledge Graph Canvas, verify:

- [ ] HTML is a thin shell (~30 lines max, no inline JS logic)
- [ ] `vis-network` loaded from `unpkg.com`
- [ ] `kg-runtime.css` loaded from `alephplace.com`
- [ ] `kg-runtime.js` loaded from `alephplace.com`
- [ ] Google Fonts link for Noto Sans included
- [ ] Graph data is only in `window.__DATA_JSON__`
- [ ] Node `type` values use canonical entity types from the table above
- [ ] No `color` specified per node
- [ ] No inline toolbar, sidebar, search, filter, legend, or physics logic
- [ ] No inline CSS beyond `#kg-app { width: 100vw; height: 100vh; }`
- [ ] `lang` and `dir` match user language

If any item fails, revise before returning output.
