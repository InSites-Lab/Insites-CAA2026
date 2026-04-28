# kg-spec.md — CA-KG Knowledge Graph Specification (GPT)

## Purpose

Create CA-KG Knowledge Graph canvases with a minimal HTML shell and shared external runtime files hosted on `alephplace.com`.

Entity colors follow `[CA-EC]` in cbsa-appendices.md. AI Query uses placeholder mode.

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

## Trigger

Execute this spec only on explicit Knowledge Graph requests ("kg", "knowledge graph", "create kg"). Respond **only** with the Canvas (no surrounding prose).

## CBSA Data Extraction → DATA

1. Re-read stage outputs (contexts, timeline, values, comparisons).
2. List candidate nodes (target 10–15, maximum 20) in this priority order:
   - **Value-bearing entities** central to Stage 2 (the things that carry identified values)
   - **Key places/structures** and **major events** (the central heritage subject and temporal anchors)
   - **Context anchors** (geographic, social, political entities that shape significance)
   - **Social actors** (individuals, groups, communities relevant to the asset)
   - **Up to 3 Cultural Value nodes** (abstract value entities for KG illustration)
3. Capture relationship verbs that show CBSA logic (`located_in`, `expresses_value`, `part_of`, `commemorates`, `influenced_by`, `supports`, etc.).
4. Drop weak/duplicate nodes; avoid orphans (every node must connect at least once).
5. Assign each node a `type` from the [CA-EC] entity categories. Default to the closest existing category. A new type may be introduced only when a node genuinely falls outside all 14 categories and forcing a match would misrepresent its heritage role — in that case, name the new type clearly and add it to the colour map.

## DATA Schema (strict)

⚠ Apply Language Policy to all KG fields.

```json
{
  "title": "Asset Name",
  "nodes": [
    {
      "id": "unique_id",
      "name": "Display Name",
      "type": "Entity Type",
      "meaning": "5-12 words describing its heritage role",
      "value_type": "Optional value label from [CA-V]"
    }
  ],
  "edges": [
    { "from": "source_id", "to": "target_id", "label": "relationship_verb" }
  ]
}
```

**Rules**:
- `type` must use English tokens from [CA-EC] for colour mapping (the renderer automatically translates to display labels when needed).
- `meaning` is concise, site-specific, written in English.
- Optional `value_type` must match [CA-V].
- Edges use lowercase verbs; keep total edges ≤ 25.

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
| `type` | string | One of the 14 canonical entity types (see below) |
| `meaning` | string | Heritage significance description (5-12 words) |

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

14 canonical types:

| Type | Description |
|------|-------------|
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

**Runtime color mapping**: The runtime maps each type to its hex color automatically:

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
| Asset (primary) | The assessed heritage subject | 14–16px |
| Cultural Value | Nodes with `value_type` set | 11px |
| All others | Every other entity type | 8–10px |

Node labels: placed below the node, font-size ≥ 10px. Truncate at 20 characters with ellipsis.

## Edge Geometry

- **Curvature**: Edges rendered as gentle arcs (curved Bézier), not straight lines. Prevents edge overlap and gives the graph a looser, organic feel.
- **Edge labels**: placed at curve midpoint, font-size ≥ 10px.
- **Arrow markers**: small directional arrowheads at target end of each edge.

## Graph Limits

- Target: 10–15 nodes, max 20
- Edges: max 25
- ≤ 3 Cultural Value nodes
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
- **Info**: node details (name, type badge, meaning, value_type, meta) + outgoing/incoming connections as clickable cards. When no node is selected: placeholder prompt ("Click a node to inspect it"). When selected: node name (≥ 1rem, bold), type badge (coloured by [CA-EC]), meaning text (≥ 0.88rem), connections list grouped into outgoing and incoming.
- **Analytics**: Search input filtering nodes by name or meaning. Type filter toggle buttons with count badges. Statistics: node count, edge count, entity type count, graph density. Top 5 most connected nodes by degree, clickable (navigates to Info tab on click).
- **AI Query**: placeholder mode — title, description, example prompts for the GPT chat. No live API calls from the Canvas.

### Legend
- Bottom of canvas, shows only types present in current data
- Colored dot + type label

### Language
- Auto-detects RTL from node content (Hebrew, Arabic)
- Switches all UI labels to Hebrew when RTL detected
- Respects `lang` and `dir` attributes on `<html>`

## Light Chrome Palette

The runtime uses the following palette for all KG UI chrome (background, sidebar, borders, text). Entity node colours remain governed by [CA-EC]:

```
Background: #f8fafc → sidebar: #f1f5f9 → cards: #ffffff → borders: #e2e8f0
Text-primary: #1e293b → text-dim: #64748b → text-muted: #94a3b8
Accent: #3b82f6 (interactive elements, active tab indicator)
```

## Language and Direction

Set `lang` and `dir` on `<html>` to match the user's instruction language:
- English → `lang="en" dir="ltr"`
- Hebrew → `lang="he" dir="rtl"`
- Arabic → `lang="ar" dir="rtl"`

## AI Query Tab [CA-AIQ]

Follows **placeholder mode** (GPT platform). No live API calls from the Canvas — all interpretation is routed through the GPT conversation. The runtime displays:
- Title ("Deep Graph Query")
- Explanation of capabilities
- 5 starter prompts users can copy into chat:
  1. "What are the key relationships in this knowledge graph?"
  2. "Which entities are most connected?"
  3. "How do contexts relate to values?"
  4. "Explain the context-effect relationships"
  5. "What patterns emerge from the graph structure?"

When user clicks a starter prompt or types a question, display: "💬 Copy this question to the chat conversation for an answer based on the full assessment context." Include a copy-to-clipboard button for the question text.

## After KG

Offer to highlight one context-effect edge pair. If accepted: 2 sentences max — Context→Asset, Asset→Context. No theory preamble.

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
- [ ] Counts: 10–15 nodes (≤ 20), ≤ 25 edges, ≤ 3 Cultural Value nodes
- [ ] Every node has `id`, `name`, `type`, `meaning` (English). No orphan nodes.
- [ ] Relationship verbs describe actual CBSA links (avoid duplicate "related_to" unless necessary)
- [ ] Output: Canvas document only; no surrounding explanation

If any item fails, revise before returning output.

---

## KG Closing Offer (mandatory)

After generating the KG and optionally explaining the context-effect, end with a single closing line that adapts to session state (Hebrew when [CA-HE] active):

- **If Stage 6 has NOT yet been completed:**

  > Continue to Stage 6 (Quality Check & Summary)? | Another tool (read assessment)? | Done?

- **If Stage 6 has ALREADY been completed** (i.e., the `End of 6️⃣ Quality Check and Summary` marker has appeared earlier in the conversation):

  > Continue to Debrief? | Another tool (read assessment)? | Done?
