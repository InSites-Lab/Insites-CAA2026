# kg-specs.md — CA-KG Knowledge Graph Specification (GPT)

## Purpose

Create CA-KG Knowledge Graph canvases with a small HTML shell and shared external runtime files.

This specification preserves the required interaction model while avoiding large inline canvas code.

**Cross-platform reference**: This is the GPT-specific rendering spec. Visual tokens follow `[CA-UX]`, entity colors follow `[CA-EC]`, AI Query follows `[CA-AIQ]` placeholder mode. See `artifact-ux-contract.md` for the cross-platform source of truth.

## Hard Contract

This specification is a required implementation contract, not guidance.

When CA-KG is triggered, the assistant must execute this specification exactly.

Required:
- use the CA-KG HTML shell structure
- load `vis-network` from the CA-KG-approved external URL
- load external `kg-runtime.css`
- load external `kg-runtime.js`
- place only the graph data in `window.__DATA_JSON__`

Forbidden:
- custom standalone inline JS app
- custom standalone inline CSS system
- alternative graph framework
- recreating toolbar, search, filter, sidebar, or status logic inline
- "equivalent" implementations based on assistant judgment

If exact execution is blocked, state the blocker and stop.
Do not substitute another implementation.

## Artifact Model

Each generated Knowledge Graph must be a thin HTML shell.

The shell must depend on these shared runtime assets:
- `https://unpkg.com/vis-network/standalone/umd/vis-network.min.js`
- `https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;800&family=Noto+Sans+Hebrew:wght@400;600;700;800&display=swap`
- `https://alephplace.com/atar.bot/canvas/kg-runtime.css`
- `https://alephplace.com/atar.bot/canvas/kg-runtime.js`

Only the graph data should vary between Knowledge Graph outputs.

## Required UX

The graph must preserve these behaviors.

### Graph

- Nodes are circles (dots) with labels below.
- The graph supports pan and zoom.
- Clicking empty space clears selection.
- Clicking a node:
  - selects it
  - emphasizes the selected node
  - emphasizes directly connected nodes and edges
  - updates the sidebar

### Sidebar (3 tabs)

The sidebar has three tabs: **Info**, **Analytics**, **AI Query**.

**Info tab** (default):
- When no node is selected: placeholder prompt ("Click a node to inspect it")
- When a node is selected:
  - node name (bold)
  - type badge (colored dot + label)
  - meaning text
  - optional value type
  - optional metadata fields
  - connections list grouped into outgoing and incoming, each showing the verb label and target/source node name as a clickable card

**Analytics tab**:
- Statistics: node count, edge count, entity type count, graph density (2x2 grid)
- Most connected: top 5 nodes by degree (clickable — navigates to Info tab)

**AI Query tab**:
- Guides users to query the graph via the GPT conversation
- Shows title ("Deep Graph Query"), explanation of what the chatbot can do (analyze relationships, trace connections, identify patterns, interpret the significance map)
- Lists example prompts: value clusters, most-connected nodes, path tracing, context framing
- No live API calls from the artifact — all queries go through the GPT chat

### Search

- Search must apply on **Enter** or the **Search** button.
- Typing alone must not restart graph physics.
- Search must:
  - highlight direct matches
  - auto-select the first direct match
  - show match count
  - list matches in the sidebar when nothing is selected

### Type Filter

- Default state shows all nodes.
- Filter buttons show a colored dot matching the entity type color.
- Clicking a type isolates:
  - that type
  - plus its direct relations
- Clicking again returns to the full graph.

### Status / Analytics

The UI must keep lightweight status indicators for:
- visible nodes count
- visible edges count
- current search match count
- selected state

### Legend

The runtime renders an entity-type legend strip at the bottom of the graph canvas. The legend shows only types present in the current data. No bot action needed — the legend is automatic.

### Language and Direction

The HTML shell should set `lang` and `dir` to match the user instruction language.

Examples:
- English request → `lang="en" dir="ltr"`
- Hebrew request → `lang="he" dir="rtl"`
- Arabic request → `lang="ar" dir="rtl"`

The runtime also auto-detects RTL content from node names and meanings, and adjusts the UI language (sidebar labels, search placeholders, filter buttons) automatically.

## Entity Types and Colors

The runtime embeds the canonical 14-type CBSA color palette. The bot does NOT need to specify `color` per node — only `type` is required. The runtime resolves colors automatically.

### Canonical Types

| Type | Hex |
|------|-----|
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
| Asset | #E53935 |

The runtime also accepts Hebrew type names (e.g., "מבנה", "ערך תרבותי") and maps them to canonical colors automatically.

Unknown types receive a dynamic color from a fallback palette.

## Node Sizing

The runtime applies three sizing tiers automatically based on node type:

| Tier | Applies to | Effect |
|------|-----------|--------|
| Asset (primary) | Nodes with type `Asset` | Radius 16px |
| Cultural Value | Nodes with type `Cultural Value` or `value_type` set | Radius 11px |
| All others | Every other entity type | Radius 9px |

## Required Runtime Stack

Use:
- `vis-network` from the approved external URL
- external `kg-runtime.css`
- external `kg-runtime.js`

Do not:
- build a large inline application in the generated HTML
- replace the CA-KG runtime with assistant-authored logic
- replace the CA-KG stylesheet with assistant-authored layout or styling
- use React, D3, or another framework as a substitute runtime for CA-KG

## Data Contract

The HTML shell must inject:

```js
window.__DATA_JSON__ = {
  title: 'Graph title',
  nodes: [
    {
      id: 'node_id',
      name: 'Display name',
      type: 'Type label',
      meaning: 'Meaning text',
      value_type: 'Optional value type',
      meta: {
        key: 'optional value'
      }
    }
  ],
  edges: [
    {
      from: 'node_a',
      to: 'node_b',
      label: 'relation_label'
    }
  ]
};
```

### Required Node Fields

- `id`
- `name`
- `type` — must be one of the canonical types listed above (English or Hebrew)
- `meaning`

### Optional Node Fields

- `value_type`
- `meta`
- `color` — deprecated; still supported for backward compatibility but not required. The runtime resolves colors from the `type` field automatically.

### Required Edge Fields

- `from`
- `to`
- `label`

## HTML Generation Pattern

Use this structure:

```html
<!DOCTYPE html>
<html lang="{LANG}" dir="{DIR}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Knowledge Graph</title>
  <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;800&family=Noto+Sans+Hebrew:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://alephplace.com/atar.bot/canvas/kg-runtime.css" />
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
    window.__DATA_JSON__ = {/* graph data */};
  </script>
  <script src="https://alephplace.com/atar.bot/canvas/kg-runtime.js"></script>
</body>
</html>
```

Only the graph data belongs in the inline script block.

## Runtime Responsibilities

### kg-runtime.js

Responsible for:
- reading `window.__DATA_JSON__`
- building the `vis-network` graph (dot/circle nodes)
- canonical entity type color resolution (14 types + Hebrew mapping + dynamic fallback)
- RTL/LTR auto-detection from data content
- bilingual UI (English/Hebrew sidebar labels, toolbar, search)
- node sizing tiers (Asset / Cultural Value / others)
- search behavior
- type filter behavior (with colored dots)
- selection highlighting
- 3-tab sidebar (Info / Analytics / AI Query placeholder)
- Info tab: node details with outgoing/incoming connections
- Analytics tab: stats grid (nodes, edges, types, density) + top 5 most connected
- legend strip rendering
- top status and analytics UI
- stable update cycle

### kg-runtime.css

Responsible for:
- page shell layout
- Noto Sans / Noto Sans Hebrew font stack with font smoothing
- graph region sizing
- toolbar styling
- pills and status chips
- filter and search control styling
- sidebar styling (3-tab layout)
- tab bar and tab content area styling
- analytics stat grid and top-connected list
- legend strip styling
- type badge dot styling
- RTL layout overrides (sidebar, network, legend positioning)
- responsive fallback layout

## AI Query Tab `[CA-AIQ]`

The AI Query tab follows `[CA-AIQ]` **placeholder mode** (GPT platform). No live API calls from the artifact — all interpretation is routed through the GPT conversation.

It displays:
- A title ("Deep Graph Query") and explanation of capabilities (relationship analysis, pattern detection, path tracing)
- Example prompts users can copy into the GPT chat
- No live API calls are executed from the artifact

See `artifact-ux-contract.md` §2 for the full AI Query contract across platforms.

## Failure Behavior

If the required runtime URLs are unavailable, blocked, or incompatible:
1. state the blocker clearly
2. stop
3. do not substitute another implementation

## Compliance Check

Before returning a Knowledge Graph, verify:

- [ ] HTML is a thin shell
- [ ] `vis-network` external URL is used
- [ ] Google Fonts link for Noto Sans included
- [ ] `kg-runtime.css` is loaded
- [ ] `kg-runtime.js` is loaded
- [ ] graph data is only in `window.__DATA_JSON__`
- [ ] node `type` values use canonical entity types
- [ ] no `color` specified per node (runtime handles colors)
- [ ] no duplicated inline toolbar, search, filter, sidebar, or status logic
- [ ] no standalone custom CSS system
- [ ] no assistant-authored replacement runtime
- [ ] `lang` and `dir` match the user instruction language

If any item fails, revise before returning output.

## Reuse Model

Preferred reuse model:
- one tiny HTML shell per Knowledge Graph
- one shared `kg-runtime.js`
- one shared `kg-runtime.css`
- only graph data changes between projects

This keeps generation stable, reduces truncation risk, and makes maintenance easier.
