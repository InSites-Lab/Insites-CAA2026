---
name: cbsa-knowledge-graph
description: Creates interactive CBSA Knowledge Graphs for cultural heritage assessment. Trigger when user requests "knowledge graph", "kg", "create kg", or visualization of heritage entity relationships. Graph includes colour-coded nodes by type, info panel, structured analytics, AI query interface, and source traceability. English-language version.
---

# CBSA Knowledge Graph Skill

## When to trigger
- Explicit request: "knowledge graph", "kg", "create kg"
- Request to visualise heritage relationships
- After CBSA Stage 5 when user opts in
- Via MA-RA when user selects Knowledge Graph reading
- Language: all display text, node names, and meanings in **English**

## Graph creation process

### Step 1: Extract data from conversation

Scan all CBSA outputs in the conversation (contexts, timeline, values, comparisons, significance statement) and identify:

**Nodes (10-15, maximum 18)** in priority order:
1. The central heritage asset (asset) — always exactly one
2. Key value-bearing entities (structures, places)
3. Major events and periods
4. Context anchors (geographic, social, political, historical)
5. Social actors (groups, figures)
6. Up to 3 cultural value nodes (cultural_value)

**Edges (up to 24)** — verbs showing CBSA logic:

| Verb | Meaning | When to use |
|------|---------|-------------|
| `located_in` | Physical location | Place relationships |
| `expresses_value` | Embodies cultural value | Asset/entity → value |
| `part_of` | Belongs to a whole | Component → ensemble |
| `commemorates` | Memorialises | Entity → event/person |
| `influenced_by` | Shaped by | Entity → context/event |
| `supports` | Sustains or reinforces | Entity → value/practice |
| `built_by` | Constructed/created by | Asset → person/group |
| `used_by` | Utilised by | Asset → group/community |
| `transformed_into` | Changed/converted | Use/function change |
| `connected_to` | General relationship | Fallback — use sparingly |
| `frames` | Context frames value (one-way) | Context → Value (Context Effect) |
| `reframes` | Value reframes context (reciprocal) | Value → Context (Context Effect) |

**Context Effect verbs** (`frames` / `reframes`): These two verbs are specific to CBSA and distinguish it from generic knowledge graphs. `frames` represents the one-way interpretive act (a context shapes how an attribute is evaluated). `reframes` represents the reciprocal effect (recognition of significance transforms how the context itself is perceived). When rendering, `reframes` edges should use a dashed stroke to visually distinguish them.

### Step 2: Build DATA JSON

```json
{
  "metadata": {
    "title": "Asset Name — Knowledge Graph",
    "created": "YYYY-MM-DD",
    "source": "CBSA Assessment",
    "language": "en"
  },
  "nodes": [
    {
      "id": "unique_id",
      "name": "Display Name",
      "type": "entity_type",
      "meaning": "5-12 words describing heritage role",
      "source_stage": "2",
      "source_ref": "[A:3]"
    }
  ],
  "edges": [
    { "from": "source_id", "to": "target_id", "label": "relationship_verb" }
  ]
}
```

**Critical field rules:**
- `name`, `meaning`: **English**
- `type`: **English** from the entity categories list (see §Entity Categories below)
- `label` on edges: **English**, lowercase
- **No orphan nodes** — every node connected at least once
- `source_stage`: CBSA stage where this entity was identified (0-6). Optional but recommended.
- `source_ref`: Citation to user document (e.g. `[A:3]`). Optional but recommended.
- Optional `value_type` on nodes: must match CBSA value types if set.
- Keep total edges ≤ 24.

## Entity Categories [CA-EC]

Assign each node a `type` from these categories. Default to the closest existing category. A new type may be introduced only when a node genuinely falls outside all categories and forcing a match would misrepresent its heritage role — in that case, name the new type clearly and add it to the colour map.

### Core types

| type | Colour | Label | When to use |
|------|--------|-------|-------------|
| asset | #E53935 | Asset | The central heritage asset under assessment (always one) |
| cultural_value | #FFD700 | Cultural Value | Abstract values — historical, aesthetic, social (up to 3) |
| structure | #D81B60 | Structure / Building | Physical structures, buildings, architectural ensembles |
| architectural_element | #AD1457 | Architectural Element | Specific component of a structure (column, arch, frieze) |
| place | #9C27B0 | Place | Geographic locations, areas, regions |
| event | #FB8C00 | Event | Specific historical events |
| period | #6D4C41 | Historical Period | Historical periods or chronological eras |
| person | #00ACC1 | Person | Specific individuals |
| group | #7CB342 | Social Group | Communities, organisations, social groups |
| story | #8D6E63 | Story / Narrative | Oral traditions, legends, documented accounts |
| natural_phenomenon | #26A69A | Natural Phenomenon | Geological, ecological, or climatic features |
| artwork | #EC407A | Artwork / Artefact | Movable objects, inscriptions, decorative elements |
| tradition | #AB47BC | Tradition / Custom | Recurring cultural practices |
| religion | #5C6BC0 | Religion / Belief | Faith systems, cosmology, spiritual practices |
| collective_memory | #78909C | Collective Memory | Shared remembrance, commemoration |

### Context types

| type | Colour | Label | When to use |
|------|--------|-------|-------------|
| historical_context | #1E88E5 | Historical Context | Historical background |
| social_context | #43A047 | Social Context | Social/community background |
| political_context | #3949AB | Political Context | Political/governance background |
| technological_context | #F4511E | Technological Context | Technical/construction background |
| environmental_context | #00897B | Environmental Context | Ecological/landscape background |
| context | #78909C | Context | Other context types |

## Step 3: Create React Artifact

**Required:** Create a React artifact (.jsx) using the full template below.

**Replacements needed:**
1. Replace `__GRAPH_DATA__` with the built JSON (as a JavaScript object)
2. Replace `__GRAPH_TITLE__` with the asset name in English

### Rendering Specifications

#### Layout Contract (mandatory)

```
Graph canvas: 65–70% of viewport width.
Sidebar: 30–35%, minimum 300px.
Sidebar state: open by default, collapsible via a toggle button, not resizable.
```

When the sidebar is collapsed, the graph canvas expands to full width. The toggle button remains visible at the canvas edge.

#### Dark Mode Chrome Palette (mandatory)

Use the following palette for all KG UI chrome (background, sidebar, borders, text). Entity node colours remain governed by the entity categories above.

```
Background: #0a1120 → sidebar: #0f172a → cards: #1e293b → borders: #334155
Text-primary: #e2e8f0 → text-dim: #94a3b8 → text-muted: #64748b
Accent: #3b82f6 (interactive elements, active tab indicator)
```

#### Node Sizing (mandatory)

Three tiers, compact proportions:

| Tier | Applies to | Radius |
|------|-----------|--------|
| Asset (primary) | The assessed heritage subject | 14–16px |
| Cultural Value | Nodes with `value_type` set or type `cultural_value` | 11px |
| All others | Every other entity type | 8–10px |

Node labels: placed below the node, font-size ≥ 10px. Truncate at 20 characters with ellipsis.

#### Edge Geometry (mandatory)

- **Link distance**: 130–152px (D3 force-link distance parameter). Edges should feel spacious, not cramped.
- **Curvature**: Render edges as gentle arcs (quadratic curve, control point offset 15–25px perpendicular to the midpoint), not straight lines. This prevents edge overlap and gives the graph a looser, more organic feel.
- **Charge strength**: −300 to −450 (force-many-body). Nodes should not cluster tightly.
- **Edge labels**: placed at curve midpoint, font-size ≥ 10px.
- **Arrow markers**: small directional arrowheads at target end of each edge.

#### Node Interaction States (mandatory)

| Trigger | Visual response |
|---------|----------------|
| **Hover** | Enlarge node radius +4px, stroke-width to 3px. Transition ≤ 150ms. |
| **Click** | Select node → highlight its direct edges (increase stroke-opacity to 1, dim all other edges to 0.15) → populate Info tab with node details and connections. |
| **Click background** | Deselect: restore all edges to default opacity, clear Info tab selection. |

#### Sidebar Tabs (mandatory)

Three tabs — **Info**, **Analytics**, **AI Query**:

**Info tab**:
- When no node is selected: placeholder prompt ("Click a node to inspect it").
- When a node is selected: node name (≥ 1rem, bold), type badge (coloured by entity category), meaning text (≥ 0.88rem), source traceability (stage + ref if available), connections list grouped into outgoing and incoming. Each connection item shows the verb label and target/source node name, styled as a clickable mini-card. Clicking a connection selects that node.

**Analytics tab**:
- **Search**: text input filtering nodes by name or meaning.
- **Type filters**: toggle buttons per entity type with count badges. Active filters restrict both the node list and the rendered graph. Clear button when any filter is active.
- **Statistics**: node count, edge count, entity type count, graph density.
- **Most connected**: top 5 nodes by degree, clickable (navigates to Info tab on click).

**AI Query tab**:
- Prompt field + submit button at the bottom. Pressing Enter also submits.
- System prompt: instructs the model to answer based on the graph data JSON, referencing specific nodes and edges, concise (≤ 150 words).
- User messages: right-aligned compact bubbles (accent background).
- Assistant messages: rendered as full-width cards with left border (3px, accent), card background (#1e293b), parsed markdown (**bold** → `<strong>`, `code` → `<code>`, paragraph breaks, list items). Maximum response height: 60% of sidebar content area, scrollable.
- Suggested starter prompts when the message list is empty.

#### Legend Placement (recommended)

Position the entity-type legend as a horizontal wrap strip at the bottom-left of the graph canvas, overlaying the graph. Each item: coloured dot (8px) + type label. Background: semi-transparent card (`rgba(30,41,59,0.85)`) with backdrop blur. Font size ≥ 0.66rem. Include Context Effect dashed-line indicator if `frames`/`reframes` edges exist.

### Full React template

```jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const GRAPH_DATA = __GRAPH_DATA__;

const TYPE_COLORS = {
  asset: '#E53935',
  cultural_value: '#FFD700',
  structure: '#D81B60',
  architectural_element: '#AD1457',
  place: '#9C27B0',
  event: '#FB8C00',
  period: '#6D4C41',
  person: '#00ACC1',
  group: '#7CB342',
  story: '#8D6E63',
  natural_phenomenon: '#26A69A',
  artwork: '#EC407A',
  tradition: '#AB47BC',
  religion: '#5C6BC0',
  collective_memory: '#78909C',
  historical_context: '#1E88E5',
  social_context: '#43A047',
  political_context: '#3949AB',
  technological_context: '#F4511E',
  environmental_context: '#00897B',
  context: '#78909C'
};

const TYPE_LABELS = {
  asset: 'Asset',
  cultural_value: 'Cultural Value',
  structure: 'Structure',
  architectural_element: 'Architectural Element',
  place: 'Place',
  event: 'Event',
  period: 'Historical Period',
  person: 'Person',
  group: 'Social Group',
  story: 'Story / Narrative',
  natural_phenomenon: 'Natural Phenomenon',
  artwork: 'Artwork / Artefact',
  tradition: 'Tradition / Custom',
  religion: 'Religion / Belief',
  collective_memory: 'Collective Memory',
  historical_context: 'Historical Context',
  social_context: 'Social Context',
  political_context: 'Political Context',
  technological_context: 'Technological Context',
  environmental_context: 'Environmental Context',
  context: 'Context'
};

const CONTEXT_EFFECT_VERBS = new Set(['reframes']);

export default function KnowledgeGraph() {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(new Set(Object.keys(TYPE_COLORS)));
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help you understand this Knowledge Graph. Ask me about nodes, relationships, or cultural significance.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const typeCounts = GRAPH_DATA.nodes.reduce((acc, n) => {
    acc[n.type] = (acc[n.type] || 0) + 1;
    return acc;
  }, {});

  const getConnections = useCallback((nodeId) => {
    return GRAPH_DATA.edges.filter(e => e.from === nodeId || e.to === nodeId).map(e => {
      const isSource = e.from === nodeId;
      const otherId = isSource ? e.to : e.from;
      const otherNode = GRAPH_DATA.nodes.find(n => n.id === otherId);
      return { label: e.label, node: otherNode, direction: isSource ? '→' : '←', isContextEffect: CONTEXT_EFFECT_VERBS.has(e.label) };
    });
  }, []);

  const filteredNodes = GRAPH_DATA.nodes.filter(n => {
    const matchesFilter = activeFilters.has(n.type);
    const matchesSearch = !searchQuery ||
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.meaning && n.meaning.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filteredEdges = GRAPH_DATA.edges.filter(e => {
    const sourceVisible = filteredNodes.some(n => n.id === e.from);
    const targetVisible = filteredNodes.some(n => n.id === e.to);
    return sourceVisible && targetVisible;
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const container = svgRef.current.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    // Arrow markers
    const defs = svg.append('defs');
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20).attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6).attr('markerHeight', 6)
      .append('path').attr('d', 'M 0,-5 L 10,0 L 0,5').attr('fill', '#666');

    defs.append('marker')
      .attr('id', 'arrowhead-ce')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20).attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6).attr('markerHeight', 6)
      .append('path').attr('d', 'M 0,-5 L 10,0 L 0,5').attr('fill', '#e94560');

    const nodesData = filteredNodes.map(n => ({ ...n }));
    const edgesData = filteredEdges.map(e => ({ ...e, source: e.from, target: e.to }));

    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(edgesData).id(d => d.id).distance(140))
      .force('charge', d3.forceManyBody().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(45));

    simulationRef.current = simulation;

    // Links — context effect edges get dashed stroke
    const link = g.append('g')
      .selectAll('line')
      .data(edgesData)
      .join('line')
      .attr('stroke', d => CONTEXT_EFFECT_VERBS.has(d.label) ? '#e94560' : '#555')
      .attr('stroke-width', d => CONTEXT_EFFECT_VERBS.has(d.label) ? 2 : 1.5)
      .attr('stroke-dasharray', d => CONTEXT_EFFECT_VERBS.has(d.label) ? '6,3' : 'none')
      .attr('marker-end', d => CONTEXT_EFFECT_VERBS.has(d.label) ? 'url(#arrowhead-ce)' : 'url(#arrowhead)');

    const linkLabel = g.append('g')
      .selectAll('text')
      .data(edgesData)
      .join('text')
      .attr('font-size', 10)
      .attr('fill', d => CONTEXT_EFFECT_VERBS.has(d.label) ? '#e94560' : '#888')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .text(d => d.label);

    const node = g.append('g')
      .selectAll('g')
      .data(nodesData)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        }));

    node.append('circle')
      .attr('r', d => d.type === 'asset' ? 15 : (d.type === 'cultural_value' ? 11 : 9))
      .attr('fill', d => TYPE_COLORS[d.type] || '#999')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node.filter(d => d.type === 'asset')
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', 14)
      .attr('fill', '#fff')
      .text('★');

    node.append('text')
      .attr('dy', d => d.type === 'asset' ? 32 : 24)
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('fill', '#eee')
      .attr('font-weight', d => d.type === 'asset' ? 'bold' : 'normal')
      .text(d => d.name.length > 20 ? d.name.substring(0, 20) + '…' : d.name);

    node.on('click', (event, d) => {
      setSelectedNode(GRAPH_DATA.nodes.find(n => n.id === d.id));
      event.stopPropagation();
    });

    svg.on('click', () => setSelectedNode(null));

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);

      linkLabel
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [filteredNodes, filteredEdges, searchQuery, activeFilters]);

  const toggleFilter = (type) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const resetView = () => {
    if (simulationRef.current) {
      simulationRef.current.alpha(0.5).restart();
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(GRAPH_DATA, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'knowledge-graph.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const sendAIQuery = async (question) => {
    const q = question || aiInput.trim();
    if (!q) return;

    setAiMessages(prev => [...prev, { role: 'user', content: q }]);
    setAiInput('');
    setIsLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a cultural heritage Knowledge Graph analyst. Here is the graph:

Nodes:
${GRAPH_DATA.nodes.map(n => `- ${n.name} (${TYPE_LABELS[n.type] || n.type}): ${n.meaning || ''}${n.source_stage ? ` [Stage ${n.source_stage}]` : ''}${n.source_ref ? ` ${n.source_ref}` : ''}`).join('\n')}

Edges:
${GRAPH_DATA.edges.map(e => {
  const fromNode = GRAPH_DATA.nodes.find(n => n.id === e.from);
  const toNode = GRAPH_DATA.nodes.find(n => n.id === e.to);
  return `- ${fromNode?.name || e.from} --[${e.label}]--> ${toNode?.name || e.to}`;
}).join('\n')}

Note: "frames" edges represent the Context Effect (context shapes value interpretation). "reframes" edges represent the reciprocal effect (recognised significance transforms context perception).

User question: ${q}

Answer concisely (up to 150 words). Focus on insights from the graph structure and CBSA relationships.`
          }]
        })
      });

      const data = await response.json();
      const answer = data.content?.[0]?.text || 'No response received.';
      setAiMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (error) {
      setAiMessages(prev => [...prev, { role: 'error', content: `Error: ${error.message}` }]);
    }
    setIsLoading(false);
  };

  const nodeCount = GRAPH_DATA.nodes.length;
  const edgeCount = GRAPH_DATA.edges.length;
  const density = (2 * edgeCount / (nodeCount * (nodeCount - 1))).toFixed(2);
  const contextEffectCount = GRAPH_DATA.edges.filter(e => e.label === 'frames' || e.label === 'reframes').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a1120', color: '#e2e8f0', fontFamily: 'Segoe UI, Tahoma, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#0f172a', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
        <h1 style={{ fontSize: '1.3rem', color: '#3b82f6', margin: 0 }}>__GRAPH_TITLE__</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={resetView} style={{ background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>
          <button onClick={exportData} style={{ background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>Export JSON</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Graph Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg ref={svgRef} style={{ width: '100%', height: '100%', background: '#0a1120' }} />

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(30,41,59,0.85)', backdropFilter: 'blur(8px)', padding: 12, borderRadius: 8, fontSize: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '8px 16px', maxWidth: '60%' }}>
            {Object.entries(typeCounts).map(([type]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[type], marginRight: 6 }}></span>
                <span>{TYPE_LABELS[type]}</span>
              </div>
            ))}
            {contextEffectCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: 20, height: 0, borderTop: '2px dashed #e94560', marginRight: 6 }}></span>
                <span style={{ color: '#e94560' }}>Context Effect</span>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <aside style={{ width: 320, minWidth: 300, background: '#0f172a', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#1e293b' }}>
            {['info', 'analytics', 'ai'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: 12, border: 'none', cursor: 'pointer',
                  background: activeTab === tab ? '#0f172a' : 'transparent',
                  color: activeTab === tab ? '#3b82f6' : '#94a3b8',
                  fontSize: '0.85rem',
                  borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent'
                }}
              >
                {tab === 'info' ? 'Info' : tab === 'analytics' ? 'Analytics' : 'AI Query'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 15 }}>
            {/* Info Tab */}
            {activeTab === 'info' && (
              selectedNode ? (
                <div>
                  <h2 style={{ color: '#3b82f6', marginBottom: 10, fontSize: '1.2rem' }}>{selectedNode.name}</h2>
                  <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', marginBottom: 15, background: TYPE_COLORS[selectedNode.type], color: '#fff' }}>
                    {TYPE_LABELS[selectedNode.type]}
                  </span>
                  <p style={{ lineHeight: 1.6, color: '#94a3b8', marginBottom: 15, fontSize: '0.9rem' }}>{selectedNode.meaning}</p>

                  {/* Source traceability */}
                  {(selectedNode.source_stage || selectedNode.source_ref) && (
                    <div style={{ background: '#1e293b', padding: 10, borderRadius: 6, marginBottom: 15, fontSize: '0.85rem', border: '1px solid #334155' }}>
                      <span style={{ color: '#64748b' }}>Source: </span>
                      {selectedNode.source_stage && <span style={{ color: '#3b82f6' }}>Stage {selectedNode.source_stage}</span>}
                      {selectedNode.source_stage && selectedNode.source_ref && <span style={{ color: '#64748b' }}> | </span>}
                      {selectedNode.source_ref && <span style={{ color: '#94a3b8' }}>{selectedNode.source_ref}</span>}
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid #334155', paddingTop: 15 }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 10 }}>Connections ({getConnections(selectedNode.id).length})</h3>
                    {getConnections(selectedNode.id).map((conn, i) => (
                      <div key={i} style={{
                        padding: 8, borderRadius: 6, marginBottom: 6, fontSize: '0.85rem', cursor: 'pointer',
                        background: conn.isContextEffect ? '#1e1a3e' : '#1e293b',
                        border: conn.isContextEffect ? '1px dashed #e94560' : '1px solid #334155'
                      }}
                      onClick={() => conn.node && setSelectedNode(conn.node)}
                      >
                        {conn.direction} {conn.label} → {conn.node?.name}
                        {conn.isContextEffect && <span style={{ fontSize: '0.7rem', color: '#e94560', marginLeft: 6 }}>⟳ context effect</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '40px 20px' }}>
                  Click a node in the graph to view details
                </div>
              )
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {[
                    { value: nodeCount, label: 'Nodes' },
                    { value: edgeCount, label: 'Edges' },
                    { value: density, label: 'Density' },
                    { value: contextEffectCount, label: 'Context Effects' }
                  ].map(stat => (
                    <div key={stat.label} style={{ background: '#1e293b', padding: 15, borderRadius: 8, textAlign: 'center', border: '1px solid #334155' }}>
                      <div style={{ fontSize: '1.8rem', color: '#3b82f6' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Search nodes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: 10, border: '1px solid #334155', borderRadius: 6, background: '#0a1120', color: '#e2e8f0', marginBottom: 15 }}
                />

                <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 10 }}>Filter by type</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {Object.keys(typeCounts).map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter(type)}
                      style={{
                        padding: '5px 12px', borderRadius: 20, fontSize: '0.75rem', cursor: 'pointer',
                        background: TYPE_COLORS[type], color: '#fff',
                        border: activeFilters.has(type) ? '2px solid #fff' : '2px solid transparent',
                        opacity: activeFilters.has(type) ? 1 : 0.4
                      }}
                    >
                      {TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>

                <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 10 }}>Type distribution</h3>
                {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: '0.85rem' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: TYPE_COLORS[type], marginRight: 8 }}></span>
                    <span style={{ flex: 1 }}>{TYPE_LABELS[type]}</span>
                    <span style={{ color: '#64748b' }}>{count}</span>
                  </div>
                ))}
              </div>
            )}

            {/* AI Tab */}
            {activeTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 15 }}>
                  {['Central node?', 'Key relationships', 'Summarise significance', 'Context effects', 'What\'s missing?'].map(q => (
                    <button
                      key={q}
                      onClick={() => sendAIQuery(q)}
                      style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '6px 12px', borderRadius: 20, fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: 15, maxHeight: '60%' }}>
                  {aiMessages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 12, borderRadius: 8, marginBottom: 10, fontSize: '0.9rem', lineHeight: 1.55,
                        background: msg.role === 'user' ? '#3b82f6' : msg.role === 'error' ? '#4a1a1a' : '#1e293b',
                        border: msg.role === 'assistant' ? '1px solid #334155' : 'none',
                        borderLeft: msg.role === 'assistant' ? '3px solid #3b82f6' : undefined,
                        marginLeft: msg.role === 'user' ? 20 : 0,
                        marginRight: msg.role === 'user' ? 0 : 20,
                        color: msg.role === 'user' ? '#fff' : '#e2e8f0'
                      }}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{ padding: 12, background: '#1e293b', border: '1px solid #334155', borderRadius: 8, marginRight: 20 }}>
                      <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                      <span style={{ marginLeft: 8 }}>Processing...</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <textarea
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIQuery(); } }}
                    placeholder="Ask about the graph..."
                    style={{ flex: 1, padding: 10, border: '1px solid #334155', borderRadius: 6, background: '#0a1120', color: '#e2e8f0', resize: 'none', height: 50, fontFamily: 'inherit' }}
                  />
                  <button
                    onClick={() => sendAIQuery()}
                    style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', alignSelf: 'flex-end' }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
```

## Pre-output checklist

Before creating the Artifact, verify:

- [ ] 10-15 nodes (no more than 18)
- [ ] Up to 24 edges
- [ ] Up to 3 cultural_value nodes
- [ ] Every node connected (no orphans)
- [ ] `name` and `meaning` in English
- [ ] `type` from the defined entity categories list (English)
- [ ] `label` on edges in English lowercase
- [ ] `source_stage` included where identifiable
- [ ] `source_ref` included where citations exist
- [ ] At least one `frames` or `reframes` edge if Context Effect was discussed
- [ ] `__GRAPH_DATA__` replaced with actual JSON
- [ ] `__GRAPH_TITLE__` replaced with asset name
- [ ] `reframes` edges render as dashed lines in the graph
- [ ] Layout: graph canvas 65–70%, sidebar 30–35%, collapsible. Per Layout Contract.
- [ ] Palette: UI chrome uses Dark Mode Chrome Palette hex values. Entity colours use entity categories.
- [ ] Node sizes: asset 14–16px, cultural value 11px, others 8–10px. Per Node Sizing.
- [ ] Edges: curved arcs preferred, link distance 130–152px. Per Edge Geometry.
- [ ] Interaction: hover enlargement, click-to-select with edge dimming, background-click deselect.
- [ ] AI responses: rendered as left-bordered cards with parsed markdown — not raw-text bubbles.

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

## Full example

When user says "kg" after a CBSA assessment of "Khan al-Umdan, Acre":

**Built JSON:**
```json
{
  "metadata": {
    "title": "Khan al-Umdan, Acre — Knowledge Graph",
    "created": "2026-03-31",
    "source": "CBSA Assessment",
    "language": "en"
  },
  "nodes": [
    {"id": "asset_1", "name": "Khan al-Umdan", "type": "asset", "meaning": "Central heritage asset — Ottoman-era caravanserai in Acre's harbour", "source_stage": "0", "source_ref": "[A:1]"},
    {"id": "place_1", "name": "Acre Old City", "type": "place", "meaning": "Fortified port city on the Mediterranean coast", "source_stage": "1"},
    {"id": "group_1", "name": "Merchant Communities", "type": "group", "meaning": "Regional traders who used the khan as warehouse and lodging", "source_stage": "1", "source_ref": "[A:4]"},
    {"id": "period_1", "name": "Late Ottoman Period", "type": "period", "meaning": "Construction era under Ahmad Pasha al-Jazzar, 1784", "source_stage": "1", "source_ref": "[A:2]"},
    {"id": "event_1", "name": "Clock Tower Addition", "type": "event", "meaning": "1906 jubilee tower marking Ottoman modernisation", "source_stage": "1", "source_ref": "[A:6]"},
    {"id": "hc_1", "name": "Trade Route Network", "type": "historical_context", "meaning": "Acre's role as regional trade hub connecting sea and inland routes", "source_stage": "1", "source_ref": "[A:3]"},
    {"id": "sc_1", "name": "Multi-ethnic Coexistence", "type": "social_context", "meaning": "Diverse communities sharing commercial and social space", "source_stage": "1", "source_ref": "[B:7]"},
    {"id": "value_1", "name": "Historical Value", "type": "cultural_value", "meaning": "Evidence of Ottoman commercial infrastructure and governance", "source_stage": "2", "source_ref": "[A:3-5]"},
    {"id": "value_2", "name": "Social Value", "type": "cultural_value", "meaning": "Living memory of communal trade practices and encounter", "source_stage": "2", "source_ref": "[B:7]"}
  ],
  "edges": [
    {"from": "asset_1", "to": "place_1", "label": "located_in"},
    {"from": "asset_1", "to": "period_1", "label": "part_of"},
    {"from": "asset_1", "to": "group_1", "label": "used_by"},
    {"from": "asset_1", "to": "event_1", "label": "connected_to"},
    {"from": "asset_1", "to": "value_1", "label": "expresses_value"},
    {"from": "asset_1", "to": "value_2", "label": "expresses_value"},
    {"from": "hc_1", "to": "value_1", "label": "frames"},
    {"from": "sc_1", "to": "value_2", "label": "frames"},
    {"from": "value_1", "to": "hc_1", "label": "reframes"},
    {"from": "group_1", "to": "place_1", "label": "located_in"}
  ]
}
```

**Output:** Interactive React (.jsx) artifact with the full graph, dashed context-effect edges, source traceability in the info panel, and Context Effect Clarification Offer.

## Features included in the template

| Feature | Description |
|---------|-------------|
| Node dragging | D3 drag behaviour |
| Zoom and pan | D3 zoom behaviour |
| Node click | Shows details in side panel with source traceability |
| Source traceability | Displays CBSA stage and document reference |
| Context Effect edges | Dashed red lines for `reframes` relationships |
| Node search | Text-based filtering |
| Type filtering | Coloured chip buttons |
| Analytics | Statistics, density, context effect count |
| AI queries | Sends to Claude API with CBSA-aware prompt |
| JSON export | Download graph data |
| Legend | Active types + context effect indicator |
| Clickable connections | Navigate between nodes via connection list |
