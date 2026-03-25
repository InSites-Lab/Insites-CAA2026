import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

const GRAPH_DATA = {
  metadata: {
    title: "Tuba-Zangariyye Dolmen Field — Knowledge Graph",
    created: "2026-03-22",
    source: "CBSA Assessment"
  },
  nodes: [
    { id: "asset", name: "Tuba-Zangariyye Dolmen Field", type: "Structure / Building", meaning: "Densest megalithic burial concentration on the Korazim Plateau", value_type: null },
    { id: "type_b", name: "Type B Dolmens", type: "Architectural Element", meaning: "Rectangular chamber dolmens with slab roofing and ring wall or cairn", value_type: null },
    { id: "tortoise", name: "Tortoise Shell Dolmens", type: "Architectural Element", meaning: "Corbelled oval variant unique to the Korazim Plateau (Nos. 35, 41)", value_type: null },
    { id: "cupmarks", name: "Cupmarks & Gameboards", type: "Artwork / Artefact", meaning: "Ritual cupmarks and later mancala carvings on dolmen surfaces", value_type: null },
    { id: "korazim", name: "Korazim Plateau", type: "Place", meaning: "Basalt plateau in the Jordan Rift Valley; largest dolmen field west of the Jordan", value_type: null },
    { id: "golan", name: "Golan Heights Dolmen Fields", type: "Place", meaning: "Inter-visible megalithic field east of the Jordan canyon", value_type: null },
    { id: "shamir", name: "Shamir Dolmen Field", type: "Place", meaning: "Comparable dense dolmen center in the northern Hula Valley", value_type: null },
    { id: "horbat_berekh", name: "Horbat Berekh", type: "Place", meaning: "IB–MBIIA semi-nomadic settlement linked to dolmen builders", value_type: null },
    { id: "ib_mbii", name: "IB–MBII Period", type: "Historical Period", meaning: "End of 3rd – early 2nd millennia BCE; dolmen construction horizon", value_type: null },
    { id: "pastoralists", name: "Semi-Nomadic Pastoralists", type: "Social Group", meaning: "IB–MBIIA herder-cultivators proposed as the dolmen builders", value_type: null },
    { id: "zangariyye", name: "Zangariyye Bedouin", type: "Social Group", meaning: "Community inhabiting the plateau since at least the 18th century", value_type: null },
    { id: "kitchener_1877", name: "Kitchener Survey 1877", type: "Event", meaning: "First dolmen documented west of Transjordan (Hajr ed-Dum)", value_type: null },
    { id: "val_landscape", name: "Landscape Value", type: "Cultural Value", meaning: "Visually connected mortuary territory across the rift", value_type: "Landscape Value" },
    { id: "val_scientific", name: "Scientific Value", type: "Cultural Value", meaning: "Unexcavated archive preserving future research potential", value_type: "Scientific Value" },
    { id: "val_tech", name: "Technological Value", type: "Cultural Value", meaning: "Megalithic construction by a mobile society", value_type: "Technological Value" }
  ],
  edges: [
    { from: "asset", to: "korazim", label: "located_in" },
    { from: "asset", to: "ib_mbii", label: "dated_to" },
    { from: "asset", to: "pastoralists", label: "built_by" },
    { from: "asset", to: "val_landscape", label: "expresses_value" },
    { from: "asset", to: "val_scientific", label: "expresses_value" },
    { from: "asset", to: "val_tech", label: "expresses_value" },
    { from: "asset", to: "golan", label: "inter_visible_with" },
    { from: "asset", to: "shamir", label: "comparable_to" },
    { from: "type_b", to: "asset", label: "part_of" },
    { from: "tortoise", to: "asset", label: "part_of" },
    { from: "cupmarks", to: "asset", label: "associated_with" },
    { from: "pastoralists", to: "horbat_berekh", label: "settled_at" },
    { from: "pastoralists", to: "ib_mbii", label: "active_during" },
    { from: "zangariyye", to: "asset", label: "grazes_landscape" },
    { from: "zangariyye", to: "korazim", label: "inhabits" },
    { from: "kitchener_1877", to: "asset", label: "first_documented" },
    { from: "horbat_berekh", to: "korazim", label: "located_in" },
    { from: "golan", to: "ib_mbii", label: "dated_to" }
  ]
};

const TYPE_COLORS = {
  "Structure / Building": "#D81B60",
  "Architectural Element": "#E91E90",
  "Artwork / Artefact": "#AB47BC",
  "Place": "#9C27B0",
  "Historical Period": "#6D4C41",
  "Social Group": "#7CB342",
  "Event": "#FB8C00",
  "Cultural Value": "#FFD700"
};

const getNodeRadius = (node) => {
  if (node.id === "asset") return 16;
  if (node.type === "Cultural Value") return 11;
  return 9;
};

function parseMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code style="font-family:monospace;background:#334155;border-radius:3px;padding:1px 5px">$1</code>')
    .replace(/\n\n/g, '</p><p style="margin:8px 0">')
    .replace(/\n- /g, '</p><li style="margin:4px 0;margin-left:16px">')
    .replace(/\n(\d+)\. /g, '</p><li style="margin:4px 0;margin-left:16px">');
}

export default function KnowledgeGraph() {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(new Set(Object.keys(TYPE_COLORS)));
  const [aiMessages, setAiMessages] = useState([]);
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
      return { label: e.label, node: otherNode, direction: isSource ? 'outgoing' : 'incoming' };
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
    return filteredNodes.some(n => n.id === e.from) && filteredNodes.some(n => n.id === e.to);
  });

  useEffect(() => {
    if (!svgRef.current) return;
    const container = svgRef.current.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
    svg.selectAll('*').remove();

    const g = svg.append('g');
    const zoom = d3.zoom().scaleExtent([0.3, 3]).on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    svg.append('defs').append('marker')
      .attr('id', 'arrowhead').attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20).attr('refY', 0).attr('orient', 'auto')
      .attr('markerWidth', 5).attr('markerHeight', 5)
      .append('path').attr('d', 'M 0,-4 L 8,0 L 0,4').attr('fill', '#64748b');

    const nodesData = filteredNodes.map(n => ({ ...n }));
    const edgesData = filteredEdges.map(e => ({ ...e, source: e.from, target: e.to }));

    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(edgesData).id(d => d.id).distance(145))
      .force('charge', d3.forceManyBody().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));
    simulationRef.current = simulation;

    // Curved edges
    const link = g.append('g').selectAll('path').data(edgesData).join('path')
      .attr('fill', 'none').attr('stroke', '#475569').attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.6).attr('marker-end', 'url(#arrowhead)');

    const linkLabel = g.append('g').selectAll('text').data(edgesData).join('text')
      .attr('font-size', 10).attr('fill', '#94a3b8').attr('text-anchor', 'middle').attr('dy', -6)
      .text(d => d.label.replace(/_/g, ' '));

    const node = g.append('g').selectAll('g').data(nodesData).join('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

    node.append('circle')
      .attr('r', d => getNodeRadius(d))
      .attr('fill', d => TYPE_COLORS[d.type] || '#78909C')
      .attr('stroke', '#0a1120').attr('stroke-width', 2)
      .on('mouseenter', function () { d3.select(this).transition().duration(150).attr('r', d => getNodeRadius(d) + 4).attr('stroke-width', 3).attr('stroke', '#e2e8f0'); })
      .on('mouseleave', function () { d3.select(this).transition().duration(150).attr('r', d => getNodeRadius(d)).attr('stroke-width', 2).attr('stroke', '#0a1120'); });

    node.filter(d => d.id === 'asset').append('text')
      .attr('text-anchor', 'middle').attr('dy', 5).attr('font-size', 13).attr('fill', '#fff').text('★');

    // Node labels with halo
    node.append('text')
      .attr('dy', d => getNodeRadius(d) + 14).attr('text-anchor', 'middle')
      .attr('font-size', d => d.id === 'asset' ? 12 : 10.5)
      .attr('fill', '#0a1120').attr('stroke', '#0a1120').attr('stroke-width', 3).attr('paint-order', 'stroke')
      .text(d => d.name.length > 20 ? d.name.substring(0, 20) + '…' : d.name);
    node.append('text')
      .attr('dy', d => getNodeRadius(d) + 14).attr('text-anchor', 'middle')
      .attr('font-size', d => d.id === 'asset' ? 12 : 10.5)
      .attr('fill', '#e2e8f0').attr('font-weight', d => d.id === 'asset' ? 'bold' : 'normal')
      .text(d => d.name.length > 20 ? d.name.substring(0, 20) + '…' : d.name);

    node.on('click', (event, d) => {
      setSelectedNode(GRAPH_DATA.nodes.find(n => n.id === d.id));
      setActiveTab('info');
      // Dim non-connected edges
      const connectedEdgeSet = new Set();
      GRAPH_DATA.edges.forEach(e => { if (e.from === d.id || e.to === d.id) connectedEdgeSet.add(e); });
      link.attr('stroke-opacity', e => connectedEdgeSet.has(e) ? 1 : 0.08);
      linkLabel.attr('fill-opacity', e => connectedEdgeSet.has(e) ? 1 : 0.08);
      event.stopPropagation();
    });

    svg.on('click', () => {
      setSelectedNode(null);
      link.attr('stroke-opacity', 0.6);
      linkLabel.attr('fill-opacity', 1);
    });

    simulation.on('tick', () => {
      link.attr('d', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 1.8;
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });
      linkLabel.attr('x', d => (d.source.x + d.target.x) / 2 + (d.target.y - d.source.y) * 0.06)
        .attr('y', d => (d.source.y + d.target.y) / 2 - (d.target.x - d.source.x) * 0.06);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [filteredNodes, filteredEdges]);

  const toggleFilter = (type) => {
    setActiveFilters(prev => { const next = new Set(prev); if (next.has(type)) next.delete(type); else next.add(type); return next; });
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(GRAPH_DATA, null, 2)).then(() => alert('Graph JSON copied to clipboard'));
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
            content: `You are analyzing a CBSA heritage knowledge graph. Answer based on the graph data only. Be concise (≤150 words). Reference specific nodes and edges.

Nodes:
${GRAPH_DATA.nodes.map(n => `- ${n.name} (${n.type}): ${n.meaning}`).join('\n')}

Edges:
${GRAPH_DATA.edges.map(e => {
              const f = GRAPH_DATA.nodes.find(n => n.id === e.from);
              const t = GRAPH_DATA.nodes.find(n => n.id === e.to);
              return `- ${f?.name} --[${e.label}]--> ${t?.name}`;
            }).join('\n')}

User question: ${q}`
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

  const mostConnected = GRAPH_DATA.nodes.map(n => ({
    ...n,
    degree: GRAPH_DATA.edges.filter(e => e.from === n.id || e.to === n.id).length
  })).sort((a, b) => b.degree - a.degree).slice(0, 5);

  const suggestedPrompts = [
    "What is the central node?",
    "Key relationships?",
    "How do the values connect?",
    "What is missing?"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a1120', color: '#e2e8f0', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ background: '#0f172a', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', flexShrink: 0 }}>
        <h1 style={{ fontSize: '1.15rem', color: '#e2e8f0', margin: 0, fontWeight: 600 }}>
          <span style={{ color: '#3b82f6' }}>KG</span> Tuba-Zangariyye Dolmen Field
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={copyJSON} style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>Copy JSON</button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
            {sidebarOpen ? 'Hide Panel' : 'Show Panel'}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Graph Canvas */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg ref={svgRef} style={{ width: '100%', height: '100%', background: '#0a1120' }} />
          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(30,41,59,0.88)', backdropFilter: 'blur(6px)', padding: '10px 14px', borderRadius: 8, display: 'flex', flexWrap: 'wrap', gap: '6px 14px', maxWidth: 480 }}>
            {Object.entries(typeCounts).map(([type]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: '#94a3b8' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[type], flexShrink: 0 }} />
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside style={{ width: 340, minWidth: 300, background: '#0f172a', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #334155', flexShrink: 0 }}>
              {[{ key: 'info', label: 'Info' }, { key: 'analytics', label: 'Analytics' }, { key: 'ai', label: 'AI Query' }].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                  flex: 1, padding: '11px 0', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500,
                  background: 'transparent', color: activeTab === tab.key ? '#3b82f6' : '#64748b',
                  borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : '2px solid transparent'
                }}>{tab.label}</button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>

              {/* INFO TAB */}
              {activeTab === 'info' && (
                selectedNode ? (
                  <div>
                    <h2 style={{ fontSize: '1.05rem', marginBottom: 8, color: '#e2e8f0' }}>{selectedNode.name}</h2>
                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 12, fontSize: '0.72rem', marginBottom: 14, background: TYPE_COLORS[selectedNode.type], color: '#fff' }}>
                      {selectedNode.type}
                    </span>
                    <p style={{ lineHeight: 1.6, color: '#94a3b8', marginBottom: 16, fontSize: '0.88rem' }}>{selectedNode.meaning}</p>
                    {selectedNode.value_type && (
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 16 }}>Value category: {selectedNode.value_type}</p>
                    )}
                    <div style={{ borderTop: '1px solid #334155', paddingTop: 14 }}>
                      <h3 style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Connections ({getConnections(selectedNode.id).length})
                      </h3>
                      {(() => {
                        const conns = getConnections(selectedNode.id);
                        const outgoing = conns.filter(c => c.direction === 'outgoing');
                        const incoming = conns.filter(c => c.direction === 'incoming');
                        return (
                          <>
                            {outgoing.length > 0 && (
                              <div style={{ marginBottom: 10 }}>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 6 }}>Outgoing →</div>
                                {outgoing.map((conn, i) => (
                                  <div key={i} onClick={() => { setSelectedNode(conn.node); }} style={{
                                    padding: '8px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: 6, marginBottom: 5, fontSize: '0.82rem', cursor: 'pointer'
                                  }}>
                                    <span style={{ color: '#3b82f6' }}>{conn.label.replace(/_/g, ' ')}</span> → <span style={{ color: '#e2e8f0' }}>{conn.node?.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {incoming.length > 0 && (
                              <div>
                                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: 6 }}>← Incoming</div>
                                {incoming.map((conn, i) => (
                                  <div key={i} onClick={() => { setSelectedNode(conn.node); }} style={{
                                    padding: '8px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: 6, marginBottom: 5, fontSize: '0.82rem', cursor: 'pointer'
                                  }}>
                                    <span style={{ color: '#e2e8f0' }}>{conn.node?.name}</span> → <span style={{ color: '#3b82f6' }}>{conn.label.replace(/_/g, ' ')}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#64748b', padding: '40px 20px', fontSize: '0.88rem' }}>
                    Click a node to inspect it
                  </div>
                )
              )}

              {/* ANALYTICS TAB */}
              {activeTab === 'analytics' && (
                <div>
                  <input type="text" placeholder="Search nodes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #334155', borderRadius: 6, background: '#1e293b', color: '#e2e8f0', marginBottom: 14, fontSize: '0.85rem', boxSizing: 'border-box' }} />

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {Object.keys(typeCounts).map(type => (
                      <button key={type} onClick={() => toggleFilter(type)} style={{
                        padding: '4px 10px', borderRadius: 14, fontSize: '0.72rem', cursor: 'pointer',
                        background: TYPE_COLORS[type], color: '#fff', border: activeFilters.has(type) ? '2px solid #e2e8f0' : '2px solid transparent',
                        opacity: activeFilters.has(type) ? 1 : 0.35
                      }}>
                        {type} ({typeCounts[type]})
                      </button>
                    ))}
                    {activeFilters.size < Object.keys(TYPE_COLORS).length && (
                      <button onClick={() => setActiveFilters(new Set(Object.keys(TYPE_COLORS)))} style={{
                        padding: '4px 10px', borderRadius: 14, fontSize: '0.72rem', cursor: 'pointer',
                        background: 'transparent', color: '#94a3b8', border: '1px solid #334155'
                      }}>Clear filters</button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
                    {[{ v: nodeCount, l: 'Nodes' }, { v: edgeCount, l: 'Edges' }, { v: Object.keys(typeCounts).length, l: 'Types' }, { v: density, l: 'Density' }].map(s => (
                      <div key={s.l} style={{ background: '#1e293b', padding: 12, borderRadius: 8, textAlign: 'center', border: '1px solid #334155' }}>
                        <div style={{ fontSize: '1.5rem', color: '#3b82f6', fontWeight: 600 }}>{s.v}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Most Connected</h3>
                  {mostConnected.map(n => (
                    <div key={n.id} onClick={() => { setSelectedNode(n); setActiveTab('info'); }} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#1e293b', border: '1px solid #334155',
                      borderRadius: 6, marginBottom: 5, fontSize: '0.82rem', cursor: 'pointer'
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[n.type], flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{n.name}</span>
                      <span style={{ color: '#64748b' }}>{n.degree}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* AI QUERY TAB */}
              {activeTab === 'ai' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {aiMessages.length === 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {suggestedPrompts.map(q => (
                        <button key={q} onClick={() => sendAIQuery(q)} style={{
                          background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '6px 12px',
                          borderRadius: 14, fontSize: '0.75rem', cursor: 'pointer'
                        }}>{q}</button>
                      ))}
                    </div>
                  )}

                  <div style={{ flex: 1, overflowY: 'auto', marginBottom: 14, maxHeight: '60%' }}>
                    {aiMessages.map((msg, i) => (
                      msg.role === 'user' ? (
                        <div key={i} style={{
                          padding: '8px 12px', borderRadius: 10, marginBottom: 8, fontSize: '0.85rem',
                          background: '#3b82f6', color: '#fff', marginLeft: 40, textAlign: 'right'
                        }}>{msg.content}</div>
                      ) : (
                        <div key={i} style={{
                          padding: 12, borderRadius: 6, marginBottom: 8, fontSize: '0.85rem', lineHeight: 1.55,
                          background: '#1e293b', borderLeft: `3px solid ${msg.role === 'error' ? '#ef4444' : '#3b82f6'}`,
                          color: msg.role === 'error' ? '#fca5a5' : '#e2e8f0'
                        }}>
                          <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                        </div>
                      )
                    ))}
                    {isLoading && (
                      <div style={{ padding: 12, background: '#1e293b', borderLeft: '3px solid #3b82f6', borderRadius: 6, color: '#94a3b8', fontSize: '0.85rem' }}>
                        Thinking...
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <textarea value={aiInput} onChange={e => setAiInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIQuery(); } }}
                      placeholder="Ask about the graph..."
                      style={{ flex: 1, padding: 10, border: '1px solid #334155', borderRadius: 6, background: '#1e293b', color: '#e2e8f0', resize: 'none', height: 44, fontFamily: 'inherit', fontSize: '0.85rem' }} />
                    <button onClick={() => sendAIQuery()} style={{
                      background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 6, cursor: 'pointer', alignSelf: 'flex-end', fontSize: '0.85rem'
                    }}>Send</button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
