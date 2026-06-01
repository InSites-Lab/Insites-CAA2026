# ═══════════════════════════════════════
# PART 4: Post-Assessment Extensions
# Triggered on explicit user request only
# ═══════════════════════════════════════

## Write → Visualize

## [CA-KG] Knowledge Graph — CBSA Integration

Generate an interactive Knowledge Graph artifact when the user explicitly requests a Knowledge Graph ("kg", "knowledge graph", "create kg").

> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-core.md`, AI Query follows `CA-AIQ in ca-db.md`. See `artifact-ux-contract.md` for the cross-platform source of truth.
>
> **Platform note (Claude native React)**: On Claude this is a **native React artifact**. The graph is rendered with **`d3`** (imported directly — `d3` is in the Claude React-artifact library set) into an SVG via a `ref`; all UI state lives in React hooks. Do **not** port the GPT/Gemini pattern (self-contained HTML, vanilla JS, CDN `<script>` tags). The AI Query tab runs **live** via `window.claude.complete` — the one feature GPT/Gemini cannot offer.

### 1. Trigger and Artifact Enforcement

- Execute this appendix only on explicit Knowledge Graph requests.
- Respond **only** with the artifact (no surrounding prose).
- The artifact is a **React component** built to the template in §4 below: `d3` force simulation rendered into an SVG ref, sidebar/tab state in React hooks. The AI Query tab is **live** via `window.claude.complete` (no API key), with graceful fallback to copy-to-chat when the API is unavailable.

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
5. Assign each node a `type` from the CA-EC in cbsa-core.md entity categories. Default to the closest existing category. A new type may be introduced only when a node genuinely falls outside all 15 categories and forcing a match would misrepresent its heritage role — in that case, name the new type clearly and add it to the colour map.
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
      "value_type": "Optional value label from CA-V in cbsa-core.md",
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
- `type` must use English tokens from CA-EC in cbsa-core.md for colour mapping (the renderer automatically translates to display labels when needed).
- `meaning` is concise, site-specific, written in English.
- Optional `value_type` must match CA-V in cbsa-core.md.
- Edges use lowercase verbs; keep total edges ≤ 25.
- `epistemic` defaults to `sourced`; use `inferred` (〰️) or `interpretive` (💭) per the notation key, with an `epistemic_note` when not sourced. Surfaced in the Info tab and the review list only — never on the node glyph.

In the React component, hold the graph data as a `const GRAPH_DATA = { nodes, edges }` literal at the top of the component module (the artifact sandbox blocks external `fetch`, so all data is inline). RTL: set `dir="rtl" lang="he"` on the root element when the assessment language is Hebrew, per CA-HE in cbsa-core.md.

### 4. Artifact Template

Generate a **React artifact** (Claude's default artifact type). Import `d3` and render the force simulation into an SVG via `useRef`; manage selection, active tab, search, and filters with React hooks (`useState`/`useMemo`). Do **not** emit a self-contained HTML file, vanilla-JS, CDN `<script>` tags, or an IIFE — those are the GPT/Gemini constraints and are wrong for a Claude React artifact.

#### 4a. Layout Contract (mandatory)

```
Graph canvas: 65–70% of viewport width.
Sidebar: 30–35%, minimum 300px.
Sidebar state: open by default, collapsible via a toggle button, not resizable.
```

When the sidebar is collapsed, the graph canvas expands to full width. The toggle button remains visible at the canvas edge. Drive the collapsed/open state with `useState` (not localStorage — browser storage is blocked in artifacts).

#### 4b. Light Chrome Palette (mandatory)

Use the following palette for all KG UI chrome (background, sidebar, borders, text). Entity node colours remain governed by CA-EC in cbsa-core.md. Match the visual language defined in `[CA-UX]` — Noto Sans, Noto Sans Hebrew, system-ui, sans-serif + JetBrains Mono for code spans. Same card styles, spacing patterns, and interaction conventions as the Assessment Dashboard CA-DB in ca-db.md. Tailwind classes are available in React artifacts; inline styles are also fine for the SVG chrome.

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

Drive selection through React state (`const [selected, setSelected] = useState(null)`); the d3 render reads it to apply highlight/dim. Node clicks call `event.stopPropagation()`; an SVG background click clears `selected`.

#### 4f. Sidebar Tabs (mandatory)

Three tabs — **Info**, **Analytics**, **AI Query** — rendered conditionally on an `activeTab` state. Use `lucide-react` icons for tab headers and mini-card affordances (available in React artifacts).

**Info tab**:
- When no node is selected: placeholder prompt ("Click a node to inspect it").
- When a node is selected: node name (≥ 1rem, bold), type badge (coloured by CA-EC in cbsa-core.md), meaning text (≥ 0.88rem), connections list grouped into outgoing and incoming. Each connection item shows the verb label and target/source node name, styled as a clickable mini-card. Clicking a connection selects that node.
- **Epistemic status**: if the node's `epistemic` is `interpretive`, show a 💭 line — "💭 Interpretive — my reading, not explicit in the sources" — with its `epistemic_note`; if `inferred`, show a 〰️ line similarly; `sourced` shows nothing. This marker appears in the Info panel only — never on the node glyph.

**Analytics tab**:
- **Search**: text input filtering nodes by name or meaning (controlled input → `useState`).
- **Type filters**: toggle buttons per entity type with count badges. Active filters restrict both the node list and the rendered graph (via `useMemo` over the data). Clear button when any filter is active.
- **Statistics**: node count, edge count, entity type count, graph density, plus an epistemic line — "Interpretive (💭): N · Inferred (〰️): M".
- **💭 Entities to review (N)**: list every `interpretive` (💭) node — with `inferred` (〰️) nodes below them — as clickable mini-cards (name + 1-line `epistemic_note`) that select the node and open the Info tab. Lead line: "These are my readings beyond the sources — to keep, rename, or reject one, mention it in the chat." Hide this entire subsection when there are no non-sourced nodes (N = 0).
- **Most connected**: top 5 nodes by degree, clickable (navigates to Info tab on click). Name the variable `topConnected` (not `top`) for clarity.

**AI Query tab** (live via `window.claude.complete`):
- Display 5 starter prompt cards when empty (below). Clicking a card, or typing a question and submitting, runs a **live** completion against the graph.
- **Live call**: build a self-contained prompt that embeds the graph data, then `await window.claude.complete(prompt)`. Example handler:
  ```jsx
  async function askGraph(question) {
    setLoading(true); setAnswer('');
    const prompt =
      `You are analysing a CBSA heritage Knowledge Graph. Answer ONLY from the graph data below, concisely (≤120 words). ` +
      `If the graph does not support an answer, say so.\n\nGRAPH DATA (JSON):\n${JSON.stringify(GRAPH_DATA)}\n\nQUESTION: ${question}`;
    try {
      const reply = await window.claude.complete(prompt);   // string in → string out, no API key
      setAnswer(reply);
    } catch (e) {
      setAnswer(null); setFallback(question);               // see fallback below
    } finally { setLoading(false); }
  }
  ```
- **Loading state**: show a spinner / "Thinking…" while the promise is pending; render the returned text in a card with the question echoed above it.
- **Graceful fallback (mandatory)**: if `window.claude.complete` is `undefined` (artifact opened where the AI runtime isn't available, e.g. some published/exported contexts) **or** the call throws, fall back to the copy-to-chat affordance: "💬 Copy this question to the chat for an answer based on the full assessment context." with a copy-to-clipboard button. Guard with `typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function'` before attempting a live call.
- Starter prompts for KG:
  1. "What are the key relationships in this knowledge graph?"
  2. "Which entities are most connected?"
  3. "How do contexts relate to values?"
  4. "Explain the context-effect relationships"
  5. "What patterns emerge from the graph structure?"

#### 4h. Legend Placement (recommended)

Position the entity-type legend as a horizontal wrap strip at the bottom-left of the graph canvas, overlaying the graph. Each item: coloured dot (8px) + type label. Background: semi-transparent card (`rgba(30,41,59,0.85)`) with backdrop blur. Font size ≥ 0.66rem.

#### 4i. Additional Template Requirements

- d3 force-directed graph with zoom (scroll) and drag (nodes) — `d3.zoom()` on the SVG, `d3.drag()` on node selections.
- Color mapping by entity type using CA-EC in cbsa-core.md categories (a `TYPE_COLORS` map in the component).
- Copy JSON button (copies the full graph data to clipboard via `navigator.clipboard.writeText(JSON.stringify(GRAPH_DATA, null, 2))`; blob/file download is blocked by the artifact sandbox).

#### 4j. React + d3 Implementation Notes (mandatory)

**Import, don't CDN-load.** In a Claude React artifact, `import * as d3 from 'd3';` works directly — `d3` is in the provided library set. Do **NOT** inject a `<script src="…cdnjs…d3…">` tag, do **NOT** read `window.d3`, and do **NOT** wrap code in an IIFE. (Those were required for the GPT/Gemini self-contained-HTML pattern; they are wrong here and the script-loader path can race the first render.)

**Render pattern** — d3 owns the SVG subtree, React owns the chrome:

```jsx
import * as d3 from 'd3';
import { useRef, useEffect, useState, useMemo } from 'react';

const GRAPH_DATA = { nodes: /* … */ [], edges: /* … */ [] };

function KnowledgeGraph() {
  const svgRef = useRef(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();                 // idempotent on re-render
    const links = GRAPH_DATA.edges.map(d => ({ ...d }));   // clone; don't mutate source
    const nodes = GRAPH_DATA.nodes.map(d => ({ ...d }));
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(140))   // 130–152
      .force('charge', d3.forceManyBody().strength(-350))               // −300…−450
      .force('center', d3.forceCenter(width / 2, height / 2));
    // …defs/markers, arc paths, drag, zoom, tick handler…
    return () => simulation.stop();              // cleanup on unmount
  }, []);
  return <svg ref={svgRef} />;
}
```

The d3-specific geometry is unchanged from standard d3 (same API in React):

1. **Node ID accessor** — d3 defaults to array-index linking; always set `d3.forceLink(links).id(d => d.id)`.
2. **SVG arrow markers** — define a `marker` in `<defs>` before rendering edges, then `.attr('marker-end', 'url(#arrowhead)')`:
   ```js
   svg.append('defs').append('marker')
     .attr('id', 'arrowhead').attr('viewBox', '0 -5 10 10')
     .attr('refX', 20).attr('refY', 0)
     .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto')
     .append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', '#94a3b8');
   ```
3. **Curved edge paths** — render edges as `<path>` (not `<line>`), quadratic arc with midpoint offset:
   ```js
   function arcPath(d) {
     const dx = d.target.x - d.source.x, dy = d.target.y - d.source.y;
     const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;
     return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
   }
   ```
4. **Edge label placement** — position labels at the arc midpoint (derive from the Bezier control point), not the straight-line midpoint.
5. **Selection state** — node click handler calls `event.stopPropagation()` then `setSelected(node)`; SVG background click calls `setSelected(null)`. The tick/redraw reads `selected` to apply the highlight/dim from §4e.
6. **Simulation parameters** — match §4d: `forceManyBody().strength(-350)`, `forceLink(links).id(d => d.id).distance(140)`, `forceCenter(width/2, height/2)`.
7. **Scope** — React component scope contains all locals; there is **no** global-leak concern (so no IIFE). Still, don't name a state/ref with a reserved DOM global (`top`, `name`, `length`, `status`, `event`, `location`) — use `topConnected`, `graphName`, etc.
8. **Sizing** — measure the SVG container with a `ResizeObserver` (or the parent's `clientWidth/clientHeight`) so the force center is correct on first paint inside the artifact frame; re-center on resize.

### 5. Final Checklist

1. **Counts**: 10–15 nodes (≤ 20), ≤ 25 edges, ≤ 3 Cultural Value nodes.
2. **Fields**: every node has `id`, `name`, `type`, `meaning` (English). No orphan nodes.
3. **Semantics**: relationship verbs describe actual CBSA links (avoid duplicate "related_to" unless necessary).
4. **Output**: a single **React artifact** only; no surrounding explanation; `d3` imported (not CDN-loaded).
5. **Data**: graph data inlined as `GRAPH_DATA` in the component; root carries `dir`/`lang` per CA-HE in cbsa-core.md when Hebrew.
6. **Layout**: graph canvas 65–70%, sidebar 30–35%. Sidebar collapsible (React state), open by default. Per §4a.
7. **Palette**: UI chrome uses §4b hex values. Entity colours use CA-EC in cbsa-core.md.
8. **Node sizes**: asset 14–16px, cultural value 11px, others 8–10px. Per §4c.
9. **Edges**: curved arcs (not straight lines), link distance 130–152px. Per §4d.
10. **Interaction**: hover enlargement, click-to-select with edge dimming, background-click deselect (React-state driven). Per §4e.
11. **AI Query**: **live** via `window.claude.complete` (graph embedded in the prompt), loading state, graceful copy-to-chat fallback when the runtime is unavailable. Per §4f.
12. **Epistemic**: every node has `epistemic` (default `sourced`); non-sourced nodes carry an `epistemic_note`; Info tab shows the 💭/〰️ marker + note on select; Analytics lists the 💭 review entities (clickable), hidden when N = 0. Per §3 and §4f.
13. **React scope**: d3 imported and confined to a `useEffect`; no IIFE, no CDN script tag; no state/ref reuses a reserved browser global name. Per §4j.

---

**After KG**: Offer to highlight one context-effect edge pair. If accepted: 2 sentences max — Context→Asset, Asset→Context. No theory preamble.

**Review interpretive entities (HITL)**: When the graph contains any `interpretive` (💭) entities, follow the artifact with a ≤2-sentence offer — "This graph has N interpretive (💭) entities: readings beyond your sources (see '💭 Entities to review' in the Analytics tab). Want to confirm, rename, reject, or cite-and-promote any?" On the user's reply, rename or remove the entity, or promote it to `sourced` when evidence is cited, then offer to regenerate the KG. Skip this offer when N = 0.

---
