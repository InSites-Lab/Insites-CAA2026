# ═══════════════════════════════════════
# PART 4: Post-Assessment Extensions
# Triggered on explicit user request only
# ═══════════════════════════════════════

## Write → Visualize

## [CA-KG] Knowledge Graph — CBSA Integration

Generate an interactive Knowledge Graph artifact when the user explicitly requests a Knowledge Graph ("kg", "knowledge graph", "create kg").

> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-reference.md`, AI Query follows `CA-AIQ in ca-db.md`.
### 1. Trigger and Artifact Enforcement

- Execute this appendix only on explicit Knowledge Graph requests.

- Respond **only** with the artifact/Canvas (no surrounding prose).

- The HTML artifact must use the template defined in §4 below, with D3 for rendering and Gemini API for AI queries.

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

6. **Mark epistemic status (mandatory)** — Set each node's `epistemic` per the Per-Claim Epistemic Gate (see Global Controls in cbsa-core.md): explicit in source → `sourced`; connected from 2+ pieces of evidence → `inferred` (〰️); a reading a peer could contest, or an entity/type proposed beyond the sources → `interpretive` (💭). For `inferred`/`interpretive` nodes, add an `epistemic_note` (≤15 words) stating why.

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

      "value_type": "Optional value label from CA-V in cbsa-reference.md",

      "epistemic": "sourced | inferred | interpretive (default: sourced)",

      "epistemic_note": "Required when epistemic is not sourced: <=15-word rationale"

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

- `epistemic` defaults to `sourced`; use `inferred` (〰️) or `interpretive` (💭) per the notation key, with an `epistemic_note` when not sourced. Surfaced in the Info tab and the review list only — never on the node glyph.

### 4. Artifact Template

Generate an **HTML artifact** (vanilla JS + D3 force simulation, NOT React/JSX) with the following structure and specifications. The artifact must be a single self-contained HTML file — no module imports, no build tools, no JSX.

**CRITICAL — D3 loading**: Do NOT use ESM imports (`import * as d3 from 'd3'`) — the canvas sandbox does not support dynamic `require()` and will throw "Dynamic require" error. Load D3 via a `<script>` tag from CDN and access it as `window.d3`:

```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>

```

#### 4a. Layout Contract (mandatory)

```

Graph canvas: 65–70% of viewport width.

Sidebar: 30–35%, minimum 300px.

Sidebar state: open by default, collapsible via a toggle button, not resizable.

```

When the sidebar is collapsed, the graph canvas expands to full width. The toggle button remains visible at the canvas edge.

**Tab CSS Constraint (Critical):** Tailwind's `flex` utilities often override standard display hiding. You MUST forcefully hide inactive tabs by including this exact CSS rule in your `<style>` block:

`.tab-content:not(.active) { display: none !important; }`

#### 4b. Light Chrome Palette (mandatory)

Use the following palette for all KG UI chrome (background, sidebar, borders, text). Entity node colours remain governed by CA-EC in cbsa-reference.md. Match the visual language of the Assessment Dashboard CA-DB in ca-db.md — same typography (Noto Sans, Noto Sans Hebrew, system-ui, sans-serif + JetBrains Mono), card styles, spacing patterns, and interaction conventions.

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

- **Epistemic status**: if the node's `epistemic` is `interpretive`, show a 💭 line — "💭 Interpretive — my reading, not explicit in the sources" — with its `epistemic_note`; if `inferred`, show a 〰️ line similarly; `sourced` shows nothing. This marker appears in the Info panel only — never on the node glyph.

**Analytics tab**:

- **Search**: text input filtering nodes by name or meaning.

- **Type filters**: toggle buttons per entity type with count badges. Active filters restrict both the node list and the rendered graph. Clear button when any filter is active.

- **Statistics**: node count, edge count, entity type count, graph density, plus an epistemic line — "Interpretive (💭): N · Inferred (〰️): M".

- **💭 Entities to review (N)**: list every `interpretive` (💭) node — with `inferred` (〰️) nodes below them — as clickable mini-cards (name + 1-line `epistemic_note`) that select the node and open the Info tab. Lead line: "These are my readings beyond the sources — to keep, rename, or reject one, mention it in the chat." Hide this entire subsection when there are no non-sourced nodes (N = 0).

- **Most connected**: top 5 nodes by degree, clickable (navigates to Info tab on click).

**AI Query tab**:

- Prompt field + submit button at the bottom. Pressing Enter also submits.

- CRITICAL: Do NOT use mock data or hardcoded responses. You MUST implement a live Gemini API connection as specified in section 4j.

 

- System prompt: instructs the model to answer based on the graph data JSON, referencing specific nodes and edges, concise (≤ 150 words).

- User messages: right-aligned compact bubbles (accent background).

- Assistant messages: rendered per §4g below.

- Suggested starter prompts shown when the message list is empty.

#### 4g. AI Query Response Rendering (mandatory)

**Assistant messages**: Render as full-width cards with the following rules:

1. **Container**: Left border (4px solid #3b82f6), card background (`#ffffff`), padding 12px. Not a chat bubble — full sidebar width minus padding.

2. Markdown parsing: Use the robust regex parser defined in 4j to handle bold, code, lists, and paragraphs properly.

3. **Paragraph spacing**: ≥ 8px between paragraphs. Line-height ≥ 1.55 inside assistant cards.

4. **Code spans**: `font-family: monospace`, background `#f1f5f9`, border-radius 3px, padding 1px 5px.

5. **Maximum response height**: 60% of sidebar content area, scrollable overflow. User must not lose access to the input field.

#### 4h. Legend Placement (recommended)

Position the entity-type legend as a horizontal wrap strip at the bottom-left of the graph canvas, overlaying the graph. Each item: coloured dot (8px) + type label. Background: semi-transparent card (`rgba(30,41,59,0.85)`) with backdrop blur. Font size ≥ 0.66rem.

#### 4i. Additional Template Requirements

- D3 force-directed graph with zoom (scroll) and drag (nodes)

- Color mapping by entity type using CA-EC in cbsa-reference.md categories

- Copy JSON button (copies the full graph data to clipboard via `navigator.clipboard.writeText()`; blob download is blocked by the artifact sandbox)

- The artifact must be a single self-contained HTML file — no module imports, no build tools, no JSX

#### 4j. AI Integration (Direct Gemini API & Parsing)

Artifacts in this environment execute with the API key provided at runtime. Do NOT use `postMessage` proxies.

1. **API Setup**: Set `const apiKey = "";` (leave empty, injected automatically).

2. **Endpoint**: `POST` to `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`

3. **Payload**: Pass the query and graph data context:

   `{ contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: "You are a heritage expert analyzing a Knowledge Graph. Format using markdown. Base answer ONLY on this JSON: " + JSON.stringify(GRAPH_DATA) }] } }`

4. **Reliability**: Wrap the `fetch` call in an exponential backoff retry loop (max 5 retries with delays of 1s, 2s, 4s, 8s, 16s). Extract text via `result.candidates?.[0]?.content?.parts?.[0]?.text`.

5. **Robust Markdown Rendering**: Write a `parseMarkdown(text)` function that handles `**bold**`, `*italic*`, `` `code` ``, parses bullet lists (`- ` or `* `) into proper `<ul>` and `<li>` tags, and converts `\n\n` to `<p>`. Add specific CSS rules for `.msg-assistant ul` (e.g., `padding-left: 24px;`) and `.msg-assistant li` to ensure readability.

#### 4k. D3 Force Implementation Notes (mandatory)

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

7. **Avoid global-scope identifier collisions (critical)** — The artifact `<script>` runs in the page's global scope, where browser-predefined names already exist on `window` (`top`, `name`, `length`, `parent`, `self`, `status`, `open`, `location`, `event`, `origin`). A top-level `const`/`let`/`var` reusing one throws "Identifier 'X' has already been declared" — e.g., naming the Analytics "Most connected" list `top`. **Fix: wrap all artifact JS in an IIFE** — `(function(){ /* all code */ })();` — so nothing lands on the global object; and don't reuse those reserved names (use `topConnected`, not `top`).

### 5. Final Checklist

1. **Counts**: 10–15 nodes (≤ 20), ≤ 25 edges, ≤ 3 Cultural Value nodes.

2. **Fields**: every node has `id`, `name`, `type`, `meaning` (English). No orphan nodes.

3. **Semantics**: relationship verbs describe actual CBSA links (avoid duplicate "related_to" unless necessary).

4. **Output**: HTML artifact only; no surrounding explanation.

5. **Placeholders**: replace `__GRAPH_DATA__` with JSON object and `__GRAPH_TITLE__` with asset name.

6. **Epistemic**: every node has `epistemic` (default `sourced`); non-sourced nodes carry an `epistemic_note`; Info tab shows the 💭/〰️ marker + note on select; Analytics lists the 💭 review entities (clickable), hidden when N = 0. Per §3 and §4f.

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

**Review interpretive entities (HITL)**: When the graph contains any `interpretive` (💭) entities, follow the artifact with a ≤2-sentence offer — "This graph has N interpretive (💭) entities: readings beyond your sources (see '💭 Entities to review' in the Analytics tab). Want to confirm, rename, reject, or cite-and-promote any?" On the user's reply, rename or remove the entity, or promote it to `sourced` when evidence is cited, then offer to regenerate the KG. Skip this offer when N = 0.

---
