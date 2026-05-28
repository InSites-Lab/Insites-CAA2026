# ═══════════════════════════════════════
# PART 4: Post-Assessment Extensions
# Triggered on explicit user request only
# ═══════════════════════════════════════

## Write → Visualize

## [CA-KG] Knowledge Graph — CBSA Integration

Generate an interactive Knowledge Graph artifact when the user explicitly requests a Knowledge Graph ("kg", "knowledge graph", "create kg").

> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-reference.md`, AI Query follows `CA-AIQ in ca-db.md`. See `artifact-ux-contract.md` for the cross-platform source of truth.

### 1. Trigger and Artifact Enforcement

- Execute this appendix only on explicit Knowledge Graph requests.
- Respond **only** with the artifact/Canvas (no surrounding prose).
- The HTML artifact must use the template defined in §4 below, with D3 for rendering. AI Query tab uses placeholder mode (no live API calls).

### 2. CBSA Data Extraction → DATA

1. Re-read stage outputs (contexts, timeline, values, comparisons).
2. List candidate nodes (target 10–15, maximum 20) in this priority order:
   - **Value-bearing entities** central to Stage 2 (the things that carry identified values)
   - **Key places/structures** and **major events** (the central heritage subject and temporal anchors)
   - **Context anchors** (geographic, social, political entities that shape significance)
   - **Social actors** (individuals, groups, communities relevant to the asset)
   - **Up to 3 Cultural Value nodes** (abstract value entities for KG illustration)
3. Capture relationship verbs that show CBSA logic (`located_in`, `expresses_value`, `part_of`, `commemorates`, `influenced_by`, `supports`, etc.).
4. Drop weak/duplicate nodes; avoid orphans (every node must connect at least once).
5. Assign each node a `type` from the CA-EC in cbsa-reference.md entity categories. Default to the closest existing category. A new type may be introduced only when a node genuinely falls outside all 14 categories and forcing a match would misrepresent its heritage role — in that case, name the new type clearly and add it to the colour map.

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
      "value_type": "Optional value label from CA-V in cbsa-reference.md"
    }
  ],
  "edges": [
    { "source": "source_id", "target": "target_id", "label": "relationship_verb" }
  ]
}
```

**Rules**:
- `type` must use English tokens from CA-EC in cbsa-reference.md for colour mapping (the renderer automatically translates to display labels when needed).
- `meaning` is concise, site-specific, written in English.
- Optional `value_type` must match CA-V in cbsa-reference.md.
- Edges use lowercase verbs; keep total edges ≤ 25.

### 4. Artifact Template

Generate an **HTML artifact** (vanilla JS + D3 force simulation, NOT React/JSX) with the following structure and specifications. The artifact must be a single self-contained HTML file — no module imports, no build tools, no JSX.
#### 4a. Layout Contract (mandatory)

```
Graph canvas: 65–70% of viewport width.
Sidebar: 30–35%, minimum 300px.
Sidebar state: open by default, collapsible via a toggle button, not resizable.
```

When the sidebar is collapsed, the graph canvas expands to full width. The toggle button remains visible at the canvas edge.

#### 4b. Light Chrome Palette (mandatory)

Use the following palette for all KG UI chrome (background, sidebar, borders, text). Entity node colours remain governed by CA-EC in cbsa-reference.md. Match the visual language defined in `[CA-UX]` — Noto Sans, Noto Sans Hebrew, system-ui, sans-serif + JetBrains Mono for code spans. Same card styles, spacing patterns, and interaction conventions as the Assessment Dashboard CA-DB in ca-db.md.

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
- When a node is selected: node name (≥ 1rem, bold), type badge (coloured by CA-EC in cbsa-reference.md), meaning text (≥ 0.88rem), connections list grouped into outgoing and incoming. Each connection item shows the verb label and target/source node name, styled as a clickable mini-card. Clicking a connection selects that node.

**Analytics tab**:
- **Search**: text input filtering nodes by name or meaning.
- **Type filters**: toggle buttons per entity type with count badges. Active filters restrict both the node list and the rendered graph. Clear button when any filter is active.
- **Statistics**: node count, edge count, entity type count, graph density.
- **Most connected**: top 5 nodes by degree, clickable (navigates to Info tab on click).

**AI Query tab** (placeholder mode):
- Display 5 starter prompt cards when empty. No live API calls from the artifact.
- When user clicks a starter prompt or types a question, display: "💬 Copy this question to the chat conversation for an answer based on the full assessment context." Include a copy-to-clipboard button for the question text.
- Starter prompts for KG:
  1. "What are the key relationships in this knowledge graph?"
  2. "Which entities are most connected?"
  3. "How do contexts relate to values?"
  4. "Explain the context-effect relationships"
  5. "What patterns emerge from the graph structure?"

#### 4h. Legend Placement (recommended)

Position the entity-type legend as a horizontal wrap strip at the bottom-left of the graph canvas, overlaying the graph. Each item: coloured dot (8px) + type label. Background: semi-transparent card (`rgba(30,41,59,0.85)`) with backdrop blur. Font size ≥ 0.66rem.

#### 4i. Additional Template Requirements

- D3 force-directed graph with zoom (scroll) and drag (nodes)
- Color mapping by entity type using CA-EC in cbsa-reference.md categories
- Copy JSON button (copies the full graph data to clipboard via `navigator.clipboard.writeText()`; blob download is blocked by the artifact sandbox)

#### 4j. D3 Force Implementation Notes (mandatory)

**CRITICAL — D3 loading in artifacts**: Do NOT use ESM imports (`import * as d3 from 'd3'`) — the artifact sandbox does not support dynamic `require()` and will throw "Dynamic require" error. Load D3 via a `<script>` tag from CDN and access it as `window.d3`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
```
Then use `const d3 = window.d3;` or reference `d3` directly (it's global). For React artifacts, use a dynamic script loader inside `useEffect` that creates a `<script>` element and waits for `onload` before rendering.

The data contract natively uses `source` and `target` to align with D3.js. Clone the data directly for the simulation:

```js
const links = data.edges.map(d => Object.create(d));
```

**Required D3 setup:**

1. **Node ID accessor** — D3 defaults to array-index linking. Always set:
   ```js
   d3.forceLink(links).id(d => d.id)
   ```

2. **SVG arrow markers** — Define in `<defs>` before rendering edges:
   ```js
   svg.append('defs').append('marker')
     .attr('id', 'arrowhead')
     .attr('viewBox', '0 -5 10 10')
     .attr('refX', 20).attr('refY', 0)
     .attr('markerWidth', 6).attr('markerHeight', 6)
     .attr('orient', 'auto')
     .append('path').attr('d', 'M0,-5L10,0L0,5')
     .attr('fill', '#94a3b8');
   ```
   Apply to edges: `.attr('marker-end', 'url(#arrowhead)')`.

3. **Curved edge paths** — Render edges as `<path>` elements (not `<line>`). Use quadratic Bezier with midpoint offset:
   ```js
   function arcPath(d) {
     const dx = d.target.x - d.source.x, dy = d.target.y - d.source.y;
     const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;
     return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
   }
   ```

4. **Edge label placement** — Position labels at the arc midpoint, not the straight-line midpoint. Calculate from the Bezier control point.

5. **Selection state** — On node click, call `e.stopPropagation()` before updating sidebar. On SVG background click, deselect and clear sidebar.

6. **Simulation parameters** — Match §4d values:
   - `d3.forceManyBody().strength(-350)` (range: −300 to −450)
   - `d3.forceLink(links).id(d => d.id).distance(140)` (range: 130–152px)
   - `d3.forceCenter(width/2, height/2)`

### 5. Final Checklist

1. **Counts**: 10–15 nodes (≤ 20), ≤ 25 edges, ≤ 3 Cultural Value nodes.
2. **Fields**: every node has `id`, `name`, `type`, `meaning` (English). No orphan nodes.
3. **Semantics**: relationship verbs describe actual CBSA links (avoid duplicate "related_to" unless necessary).
4. **Output**: HTML artifact only; no surrounding explanation.
5. **Placeholders**: replace `__GRAPH_DATA__` with JSON object and `__GRAPH_TITLE__` with asset name.
6. **Layout**: graph canvas 65–70%, sidebar 30–35%. Sidebar collapsible, open by default. Per §4a.
7. **Palette**: UI chrome uses §4b hex values. Entity colours use CA-EC in cbsa-reference.md.
8. **Node sizes**: asset 14–16px, cultural value 11px, others 8–10px. Per §4c.
9. **Edges**: curved arcs (not straight lines), link distance 130–152px. Per §4d.
10. **Interaction**: hover enlargement, click-to-select with edge dimming, background-click deselect. Per §4e.
11. **AI Query**: placeholder mode — starter prompts only, no live API calls. Per §4f.

---

**After KG**: Offer to highlight one context-effect edge pair. If accepted: 2 sentences max — Context→Asset, Asset→Context. No theory preamble.

---
