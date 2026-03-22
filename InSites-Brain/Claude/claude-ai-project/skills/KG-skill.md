---
name: cbsa-knowledge-graph
description: Creates interactive CBSA Knowledge Graph visualization. Trigger on "kg", "knowledge graph", "create kg". Generates HTML artifact with D3 force simulation, sidebar tabs (Info/Analytics/AI Query), and light chrome palette.
---

# Knowledge Graph Skill

This skill generates an interactive Knowledge Graph from CBSA assessment data. It includes entity categories [CA-EC] for node classification and the full KG specification [CA-KG].

---

## [CA-EC] Entity Categories

Use these categories when selecting node type in a Knowledge Graph. Each category includes a brief description for clarity.

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

---

## [CA-KG] Knowledge Graph — CBSA Integration

Generate an interactive Knowledge Graph React artifact when the user explicitly requests a Knowledge Graph ("kg", "knowledge graph", "create kg").

### 1. Trigger and Artifact Enforcement

- Execute this appendix only on explicit Knowledge Graph requests.
- Respond **only** with the artifact/Canvas (no surrounding prose).
- The React artifact must use the template defined in §4 below, with D3 for rendering and Claude API for AI queries.

### 2. CBSA Data Extraction → DATA

1. Re-read stage outputs (contexts, timeline, values, comparisons).
2. List candidate nodes (target 10–15, maximum 18) in this priority order:
   - **Value-bearing entities** central to Stage 2 (the things that carry identified values)
   - **Key places/structures** and **major events** (the central heritage subject and temporal anchors)
   - **Context anchors** (geographic, social, political entities that shape significance)
   - **Social actors** (individuals, groups, communities relevant to the asset)
   - **Up to 3 Cultural Value nodes** (abstract value entities for KG illustration)
3. Capture relationship verbs that show CBSA logic (`located_in`, `expresses_value`, `part_of`, `commemorates`, `influenced_by`, `supports`, etc.).
4. Drop weak/duplicate nodes; avoid orphans (every node must connect at least once).
5. Assign each node a `type` from the [CA-EC] entity categories. Default to the closest existing category. A new type may be introduced only when a node genuinely falls outside all 14 categories and forcing a match would misrepresent its heritage role — in that case, name the new type clearly and add it to the colour map.

### 3. DATA Schema (strict)

⚠ Apply Language Policy to all KG fields.

```json
{
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
- Edges use lowercase verbs; keep total edges ≤ 20.

### 4. Artifact Template

Generate an **HTML artifact** (vanilla JS + D3 force simulation) with the following structure and specifications.


#### 4a. Layout Contract (mandatory)

```
Graph canvas: 65–70% of viewport width.
Sidebar: 30–35%, minimum 300px.
Sidebar state: open by default, collapsible via a toggle button, not resizable.
```

When the sidebar is collapsed, the graph canvas expands to full width. The toggle button remains visible at the canvas edge.

#### 4b. Light Chrome Palette (mandatory)

Use the following palette for all KG UI chrome (background, sidebar, borders, text). Entity node colours remain governed by [CA-EC]. Match the visual language of the Assessment Dashboard [CA-DB] — same typography (DM Sans + JetBrains Mono), card styles, spacing patterns, and interaction conventions.

```
Background: #f8fafc → sidebar: #f1f5f9 → cards: #ffffff → borders: #e2e8f0
Text-primary: #1e293b → text-dim: #64748b → text-muted: #94a3b8
Accent: #3b82f6 (interactive elements, active tab indicator)
```

#### 4c. Node Sizing (mandatory)

Three tiers, compact proportions:

| Tier | Applies to | Radius |
|------|-----------|--------|
| Asset (primary) | The assessed heritage subject | 14–16px |
| Cultural Value | Nodes with `value_type` set | 11px |
| All others | Every other entity type | 8–10px |

Node labels: placed below the node, font-size ≥ 10px. Truncate at 20 characters with ellipsis.

#### 4d. Edge Geometry (mandatory)

- **Link distance**: 130–152px (D3 force-link distance parameter). Edges should feel spacious, not cramped.
- **Curvature**: Render edges as gentle arcs (quadratic curve, control point offset 15–25px perpendicular to the midpoint), not straight lines. This prevents edge overlap and gives the graph a looser, more organic feel.
- **Charge strength**: −300 to −450 (force-many-body). Nodes should not cluster tightly.
- **Edge labels**: placed at curve midpoint, font-size ≥ 10px.
- **Arrow markers**: small directional arrowheads at target end of each edge.

#### 4e. Node Interaction States (mandatory)

| Trigger | Visual response |
|---------|----------------|
| **Hover** | Enlarge node radius +4px, stroke-width to 3px. Transition ≤ 150ms. |
| **Click** | Select node → highlight its direct edges (increase stroke-opacity to 1, dim all other edges to 0.15) → populate Info tab with node details and connections. |
| **Click background** | Deselect: restore all edges to default opacity, clear Info tab selection. |

#### 4f. Sidebar Tabs (mandatory)

Three tabs — **Info**, **Analytics**, **AI Query**:

**Info tab**:
- When no node is selected: placeholder prompt ("Click a node to inspect it").
- When a node is selected: node name (≥ 1rem, bold), type badge (coloured by [CA-EC]), meaning text (≥ 0.88rem), connections list grouped into outgoing and incoming. Each connection item shows the verb label and target/source node name, styled as a clickable mini-card. Clicking a connection selects that node.

**Analytics tab**:
- **Search**: text input filtering nodes by name or meaning.
- **Type filters**: toggle buttons per entity type with count badges. Active filters restrict both the node list and the rendered graph. Clear button when any filter is active.
- **Statistics**: node count, edge count, entity type count, graph density.
- **Most connected**: top 5 nodes by degree, clickable (navigates to Info tab on click).

**AI Query tab**:
- Prompt field + submit button at the bottom. Pressing Enter also submits.
- System prompt: instructs the model to answer based on the graph data JSON, referencing specific nodes and edges, concise (≤ 150 words).
- User messages: right-aligned compact bubbles (accent background).
- Assistant messages: rendered per §4g below.
- Suggested starter prompts shown when the message list is empty.

#### 4g. AI Query Response Rendering (mandatory)

**Assistant messages**: Render as full-width cards with the following rules:

1. **Container**: Left border (3px, accent colour), card background (`#1e293b`), padding 12px. Not a chat bubble — full sidebar width minus padding.
2. **Markdown parsing** (minimal, no external library): handle `**bold**` → `<strong>`, `` `code` `` → `<code>` (monospace, subtle background), `\n\n` → paragraph break, `\n` preceded by `- ` or `N. ` → list item. Discard all other markdown tokens.
3. **Paragraph spacing**: ≥ 8px between paragraphs. Line-height ≥ 1.55 inside assistant cards.
4. **Code spans**: `font-family: monospace`, background `#334155`, border-radius 3px, padding 1px 5px.
5. **Maximum response height**: 60% of sidebar content area, scrollable overflow. User must not lose access to the input field.

#### 4h. Legend Placement (recommended)

Position the entity-type legend as a horizontal wrap strip at the bottom-left of the graph canvas, overlaying the graph. Each item: coloured dot (8px) + type label. Background: semi-transparent card (`rgba(30,41,59,0.85)`) with backdrop blur. Font size ≥ 0.66rem.

#### 4i. Additional Template Requirements

- D3 force-directed graph with zoom (scroll) and drag (nodes)
- Color mapping by entity type using [CA-EC] categories
- Copy JSON button (copies the full graph data to clipboard via `navigator.clipboard.writeText()`; blob download is blocked by the artifact sandbox)
- Use the Ayelet HaShachar KG (`kg-ayelet.jsx`) as a reference implementation for the full template structure

### 5. Final Checklist

1. **Counts**: 10–15 nodes (≤ 18), ≤ 20 edges, ≤ 3 Cultural Value nodes.
2. **Fields**: every node has `id`, `name`, `type`, `meaning` (English). No orphan nodes.
3. **Semantics**: relationship verbs describe actual CBSA links (avoid duplicate "related_to" unless necessary).
4. **Output**: React artifact only; no surrounding explanation.
5. **Placeholders**: replace `__GRAPH_DATA__` with JSON object and `__GRAPH_TITLE__` with asset name.
6. **Layout**: graph canvas 65–70%, sidebar 30–35%. Sidebar collapsible, open by default. Per §4a.
7. **Palette**: UI chrome uses §4b hex values. Entity colours use [CA-EC].
8. **Node sizes**: asset 14–16px, cultural value 11px, others 8–10px. Per §4c.
9. **Edges**: curved arcs (not straight lines), link distance 130–152px. Per §4d.
10. **Interaction**: hover enlargement, click-to-select with edge dimming, background-click deselect. Per §4e.
11. **AI responses**: rendered as left-bordered cards with parsed markdown — not raw-text bubbles. Per §4g.

---

**Context Effect Clarification Offer (mandatory)**:
After generating the KG, always offer the user:
> "Would you like me to explain the context-effect relationships shown in the graph? I'll use one example from the graph to illustrate the two-way influence."

**When the user accepts**, provide:
1. **Definition (2–3 sentences)**: Explain context effect as the bidirectional flow where contexts generate the asset's cultural significances, and the valued asset reciprocally reinforces, legitimizes, or transforms its context entities as they appear in the graph.
2. **One graph-based example**: Select one context node and one asset node from the generated KG. Describe:
   - **Context → Asset**: How this context shaped/imbued the asset with specific values.
   - **Asset → Context**: How the valued asset, in turn, influenced, commemorated, or elevated that context.
3. Keep the explanation ≤ 100 words total.
