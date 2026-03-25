# [CA-KG] Knowledge Graph — CBSA Integration (React JSX Canvas Version)

Generate an interactive Knowledge Graph as a **Canvas React artifact** when the user explicitly requests a Knowledge Graph (`"kg"`, `"knowledge graph"`, `"create kg"`, `"generate knowledge graph"`, `"show knowledge graph"`).

---

## 1. Trigger and Output

- Execute this appendix **only** on explicit Knowledge Graph requests.
- Output as a **Canvas React document** (`code/react`).
- Respond with the **artifact only** when generating the KG itself. No surrounding prose.
- The artifact must use **React JSX + imported D3**:
  - `import React, { ... } from 'react';`
  - `import * as d3 from 'd3';`
- Do **not** use CDN `<script>` tags for D3.
- The React artifact must recreate the CA-KG shell defined below exactly:
  - top collapsible AI configuration panel
  - left graph canvas / right sidebar layout
  - collapsible sidebar
  - bottom-left legend
  - Info / Analytics / AI Query tabs
  - JSON export
  - D3 force-directed graph with curved edges, zoom, drag, hover, select/dim
- In GPT v1, the **AI Query tab is placeholder-only**:
  - keep the visible configuration panel
  - keep the visible AI Query interface
  - keep localStorage key storage shell
  - **do not execute live API calls from the artifact**
  - route actual interpretation to GPT chat

---

## 2. CBSA Data Extraction → DATA

1. Re-read stage outputs (contexts, timeline, values, comparisons).
2. List candidate nodes (target **10–15**, maximum **18**) in this priority order:
   - **Value-bearing entities** central to Stage 2
   - **Key places/structures** and **major events**
   - **Context anchors** (geographic, social, political, historical)
   - **Social actors** (individuals, groups, communities)
   - **Up to 3 Cultural Value nodes**
3. Capture relationship verbs that show CBSA logic:
   - `located_in`
   - `expresses_value`
   - `part_of`
   - `commemorates`
   - `influenced_by`
   - `supports`
4. Drop weak or duplicate nodes.
5. No orphan nodes: every node must connect at least once.
6. Assign each node a `type` from the CA-EC entity categories.

---

## 3. DATA Schema (strict)

**Critical language rule:** All fields (`name`, `meaning`, `type`, `label`) must be in **English**.

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

### Rules
- `type` must use English tokens from [CA-EC].
- `meaning` must be concise, site-specific, and in English.
- Optional `value_type` must match [CA-V].
- Edge labels must be lowercase verbs.
- Total edges: **≤24**.
- Maximum cultural value nodes: **3**.

---

## 4. React JSX Artifact Contract

### 4a. Artifact Type
Generate a **single-file React component** that:
- default-exports the KG component
- imports D3 directly
- contains all styling inline (via `<style>` string and inline styles where needed)
- is fully self-contained inside the React artifact

### 4b. Required Imports
```jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
```

### 4c. Required Top-Level Constants
The file must define:
- `GRAPH_DATA`
- `TYPE_COLORS`
- `TYPE_LABELS`
- `STORAGE_KEY`

---

## 5. Layout Contract

### 5a. Main Split
- Graph canvas: **65–70%** width
- Sidebar: **30–35%** width
- Sidebar minimum width: **300px**
- Sidebar open by default
- Sidebar collapsible via visible toggle button
- When collapsed:
  - graph expands to full width
  - toggle remains visible

### 5b. Top Configuration Panel
A collapsible panel at the top of the artifact:

```text
┌─ 🔑 AI Configuration ───────────────────────────────┐
│  Gemini API Key: [____________________] [Save]      │
│  Status: ● Not configured                           │
│  Get a free key at ai.google.dev                    │
└─────────────────────────────────────────────────────┘
```

Rules:
- collapsed by default
- click header toggles open/closed
- includes:
  - password input
  - `Save & Test` button
  - `Clear` button
  - status indicator dot
  - link to `ai.google.dev/aistudio`
- in GPT v1, this panel is **UI shell only**
- saving may store to localStorage
- **no live API call is executed from the artifact**

---

## 6. Dark Mode Chrome Palette

Use this exact shell palette:

- Background: `#0a1120`
- Sidebar: `#0f172a`
- Cards: `#1e293b`
- Borders: `#334155`
- Text primary: `#e2e8f0`
- Text dim: `#94a3b8`
- Text muted: `#64748b`
- Accent: `#3b82f6`

Entity colours come from `TYPE_COLORS`.

---

## 7. Node Types and Colour Mapping

The component must define the full mapping:

```jsx
const TYPE_COLORS = {
  asset: '#E53935',
  cultural_value: '#FFD700',
  structure: '#D81B60',
  place: '#9C27B0',
  event: '#FB8C00',
  period: '#6D4C41',
  person: '#00ACC1',
  group: '#7CB342',
  historical_context: '#1E88E5',
  social_context: '#43A047',
  political_context: '#3949AB',
  technological_context: '#F4511E',
  environmental_context: '#00897B',
  context: '#78909C'
};
```

The component must also define:

```jsx
const TYPE_LABELS = {
  asset: 'Asset',
  cultural_value: 'Cultural Value',
  structure: 'Structure',
  place: 'Place',
  event: 'Event',
  period: 'Period',
  person: 'Person',
  group: 'Group',
  historical_context: 'Historical Context',
  social_context: 'Social Context',
  political_context: 'Political Context',
  technological_context: 'Technological Context',
  environmental_context: 'Environmental Context',
  context: 'Context'
};
```

---

## 8. Node Sizing

| Tier | Applies to | Radius |
|------|-----------|--------|
| Asset | Primary assessed heritage subject | 14–16px |
| Cultural Value | Nodes with `value_type` | 11px |
| All others | Other entities | 8–10px |

Additional rules:
- Asset node may include a white star glyph centered inside the node.
- Node labels appear below the node.
- Label font-size: **≥10px**
- Truncate labels at **20 chars** with ellipsis.

---

## 9. Edge Geometry and Physics

Use a D3 force-directed graph.

### Required force settings
- Link distance: **130–152px**
- Charge strength: **−300 to −450**
- Collision radius: node radius + padding
- Zoom enabled
- Drag enabled

### Edge drawing
- Use **curved quadratic paths**
- Do **not** use straight lines
- Curve offset: **15–25px** perpendicular to midpoint
- Edge labels at curve midpoint
- Edge label font-size: **≥10px**
- Add small directional arrowheads

---

## 10. Graph Interaction States

### Hover
- Increase node radius by **+4px**
- Stroke width becomes **3px**
- Transition ≤150ms

### Click node
- Select node
- Populate Info tab
- Highlight directly connected edges
- Direct edges opacity: **1**
- Other edges opacity: **0.15**
- Dim unrelated nodes and labels

### Click background
- Deselect node
- Restore full graph opacity
- Clear Info selection state

---

## 11. Legend

A horizontal wrapped legend strip at the **bottom-left** of the graph pane.

Each item:
- 8px colored dot
- type label

Legend styling:
- background: `rgba(30,41,59,0.85)`
- backdrop blur
- small rounded container
- font-size: **≥0.66rem**

---

## 12. Sidebar Tabs

The sidebar must contain exactly **three tabs**:

- **Info**
- **Analytics**
- **AI Query**

### 12a. Info Tab
When no node is selected:
- show placeholder text: `Click a node to inspect it.`

When a node is selected:
- node name
- colored type badge
- optional value badge if `value_type` exists
- meaning text
- connections grouped:
  - **Outgoing**
  - **Incoming**
- each connection row clickable and selects that node

### 12b. Analytics Tab
Must include:
- search input filtering by node `name` or `meaning`
- type filter chips with counts
- clear button
- statistics cards:
  - node count
  - edge count
  - entity type count
  - graph density
- “Most connected” list:
  - top 5 by degree
  - clickable

### 12c. AI Query Tab
Must include:
- empty-state message when not configured
- chat history area
- starter prompts when chat is empty
- user input textarea
- send button
- assistant message card rendering
- loading placeholder

---

## 13. AI Query Behaviour (GPT v1 Placeholder)

### 13a. Required Behaviour
The AI Query tab must be visible and styled as if it is future-ready.

But in GPT v1:
- **do not call Gemini**
- **do not fetch any API**
- **do not execute live interpretation**
- respond with a placeholder assistant message such as:

> AI Query is reserved for a future Action-based implementation. In GPT v1, please ask the GPT in chat to interpret the Knowledge Graph. This artifact keeps the query slot visible for future upgrade, but does not perform live requests.

### 13b. Local Storage
The config panel may store the entered key under:

```js
const STORAGE_KEY = 'insites_gemini_key';
```

This is only for UI continuity in GPT v1.

> **Future implementation note:** When AI Query becomes live, the system prompt and API integration pattern are documented in the original HTML spec (`Original/kg-spec.md` §5). Use Gemini 2.0 Flash endpoint with graph data JSON injected into the system prompt.

### 13c. Starter Prompts
When the AI tab is otherwise empty, show starter prompts such as:
- `Which nodes most strongly express historical value?`
- `Explain how collective memory connects events to the asset.`
- `What is the strongest context-effect relationship in the graph?`

---

## 14. Assistant Message Rendering

Assistant messages must render as full-width cards with:
- left border: 3px accent
- card background: `#1e293b`
- padding: 12px
- line-height: **≥1.55**

Minimal markdown parsing required:
- `**bold**` → `<strong>`
- `` `code` `` → `<code>`
- `\n\n` → paragraph splits
- list items beginning with `- ` or `* ` → `<ul><li>`

User messages:
- right-aligned compact bubbles
- accent-toned background

---

## 15. Export

The sidebar header must include an **Export JSON** button.

Behaviour:
- download `GRAPH_DATA` as `.json`
- filename based on the graph name where possible

---

## 16. React State Requirements

The artifact must manage at least these states:

- `configOpen`
- `sidebarCollapsed`
- `selectedNodeId`
- `activeTab`
- `searchQuery`
- `activeFilters`
- `apiKeyInput`
- `apiConfigured`
- `apiStatus`
- `isSavingKey`
- `aiMessages`
- `aiInput`
- `isLoading`

Use React hooks:
- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- `useRef`

---

## 17. D3 Implementation Requirements

The React artifact must:
- render the graph inside an `<svg ref={svgRef}>`
- rebuild the graph inside `useEffect`
- use:
  - `d3.forceSimulation`
  - `d3.forceLink`
  - `d3.forceManyBody`
  - `d3.forceCenter`
  - `d3.forceCollide`
  - `d3.zoom`
  - `d3.drag`
- maintain zoom transform across re-renders where possible
- support resize handling (e.g. `ResizeObserver`)

---

## 18. Output Template Requirement

Generate the artifact as a **single-file React component** following this structure:

```jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

const GRAPH_DATA = __GRAPH_DATA__;
const TYPE_COLORS = { ... };
const TYPE_LABELS = { ... };
const STORAGE_KEY = 'insites_gemini_key';

function truncate(text, max = 20) { ... }
function nodeRadius(node) { ... }
function parseAssistantMarkdown(text) { ... }

export default function KnowledgeGraph() {
  // refs
  // state
  // memoized filtered data
  // effects: init storage, resize, d3 render
  // callbacks: save/clear config, toggle filters, reset view, export, send placeholder AI reply
  return (
    <div className="kg-root">
      <style>{`...full CA-KG shell styles...`}</style>
      {/* full CA-KG shell */}
    </div>
  );
}
```

Replace:
- `__GRAPH_DATA__` with the extracted JSON
- graph title text with the asset name

---

## 19. Final Checklist

1. **Counts**: 10–15 nodes (≤18), ≤24 edges, ≤3 Cultural Value nodes.
2. **Fields**: every node has `id`, `name`, `type`, `meaning` in English.
3. **Semantics**: relationship verbs reflect actual CBSA logic.
4. **Output**: single Canvas React artifact only.
5. **D3**: imported in JSX, not CDN-loaded.
6. **Layout**: graph 65–70%, sidebar 30–35%, collapsible.
7. **Palette**: CA-KG dark chrome palette.
8. **Edges**: curved arcs with labels and arrowheads.
9. **Interaction**: hover enlarge, click-select, dim unrelated edges/nodes, background deselect.
10. **Sidebar**: Info / Analytics / AI Query tabs.
11. **AI panel**: visible config shell, placeholder-only in GPT v1.
12. **Legend**: bottom-left wrap strip.
13. **Export**: JSON download button present.

---

## 20. Context Effect Clarification Offer (mandatory post-KG offer)

After generating the KG, always offer:

> “Would you like me to explain the context-effect relationships shown in the graph? I’ll use one example from the graph to illustrate the two-way influence.”

When the user accepts, provide:
1. **Definition (2–3 sentences)**: context effect as bidirectional flow.
2. **One graph example**:
   - **Context → Asset**
   - **Asset → Context**
3. Keep the explanation **≤100 words**.

---

**END OF CA-KG JSX SPEC**
