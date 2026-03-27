(function () {
  'use strict';

  /* ── RTL detector ── */
  var isRTL = function (s) {
    return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s || '');
  };

  /* ── Canonical color palette [CA-EC] — see artifact-ux-contract.md §3 ── */
  var COLOR_BY_TYPE = {
    'Natural Phenomenon':   { background: 'rgba(14,165,233,0.7)',  border: '#0ea5e9' },
    'Structure / Building': { background: 'rgba(245,158,11,0.7)',  border: '#f59e0b' },
    'Architectural Element':{ background: 'rgba(217,119,6,0.7)',   border: '#d97706' },
    'Person':               { background: 'rgba(236,72,153,0.7)',  border: '#ec4899' },
    'Event':                { background: 'rgba(239,68,68,0.7)',   border: '#ef4444' },
    'Story / Narrative':    { background: 'rgba(139,92,246,0.7)',  border: '#8b5cf6' },
    'Social Group':         { background: 'rgba(59,130,246,0.7)',  border: '#3b82f6' },
    'Cultural Value':       { background: 'rgba(99,102,241,0.7)',  border: '#6366f1' },
    'Value':                { background: 'rgba(99,102,241,0.7)',  border: '#6366f1' },
    'Place':                { background: 'rgba(16,185,129,0.7)',  border: '#10b981' },
    'Artwork / Artefact':   { background: 'rgba(244,63,94,0.7)',   border: '#f43f5e' },
    'Tradition / Custom':   { background: 'rgba(20,184,166,0.7)',  border: '#14b8a6' },
    'Historical Period':    { background: 'rgba(100,116,139,0.7)', border: '#64748b' },
    'Religion / Belief':    { background: 'rgba(168,85,247,0.7)',  border: '#a855f7' },
    'Collective Memory':    { background: 'rgba(132,204,22,0.7)',  border: '#84cc16' },
    'Asset':                { background: 'rgba(229,57,53,0.7)',   border: '#E53935' }
  };
  var FALLBACK_COLOR = { background: 'rgba(200,200,200,0.6)', border: '#666666' };

  /* ── Hebrew ↔ canonical English type mapping ── */
  var CANONICAL_TYPE_MAP = {};
  var HEBREW_LABEL_BY_CANONICAL = {};

  // Build mappings programmatically to avoid encoding issues
  var TYPE_PAIRS = [
    [['Natural Phenomenon'],   ['\u05EA\u05D5\u05E4\u05E2\u05D4 \u05D8\u05D1\u05E2\u05D9\u05EA']],
    [['Structure / Building'], ['\u05DE\u05D1\u05E0\u05D4', '\u05DE\u05D1\u05E0\u05D4 / \u05D0\u05EA\u05E8']],
    [['Architectural Element'],['\u05D0\u05DC\u05DE\u05E0\u05D8 \u05D0\u05D3\u05E8\u05D9\u05DB\u05DC\u05D9']],
    [['Person'],               ['\u05D3\u05DE\u05D5\u05EA', '\u05D0\u05D3\u05DD']],
    [['Event'],                ['\u05D0\u05D9\u05E8\u05D5\u05E2']],
    [['Story / Narrative'],    ['\u05E1\u05D9\u05E4\u05D5\u05E8 / \u05E0\u05E8\u05D8\u05D9\u05D1', '\u05E1\u05D9\u05E4\u05D5\u05E8', '\u05E0\u05E8\u05D8\u05D9\u05D1']],
    [['Social Group'],         ['\u05E7\u05D1\u05D5\u05E6\u05D4 \u05D7\u05D1\u05E8\u05EA\u05D9\u05EA']],
    [['Cultural Value'],       ['\u05E2\u05E8\u05DA \u05EA\u05E8\u05D1\u05D5\u05EA\u05D9', '\u05E2\u05E8\u05DA']],
    [['Place'],                ['\u05DE\u05E7\u05D5\u05DD']],
    [['Artwork / Artefact'],   ['\u05D9\u05E6\u05D9\u05E8\u05EA \u05D0\u05DE\u05E0\u05D5\u05EA / \u05DE\u05DE\u05E6\u05D0', '\u05D9\u05E6\u05D9\u05E8\u05EA \u05D0\u05DE\u05E0\u05D5\u05EA', '\u05DE\u05DE\u05E6\u05D0']],
    [['Tradition / Custom'],   ['\u05DE\u05E1\u05D5\u05E8\u05EA / \u05DE\u05E0\u05D4\u05D2', '\u05DE\u05E1\u05D5\u05E8\u05EA', '\u05DE\u05E0\u05D4\u05D2']],
    [['Historical Period'],    ['\u05EA\u05E7\u05D5\u05E4\u05D4 \u05D4\u05D9\u05E1\u05D8\u05D5\u05E8\u05D9\u05EA']],
    [['Religion / Belief'],    ['\u05D3\u05EA / \u05D0\u05DE\u05D5\u05E0\u05D4']],
    [['Collective Memory'],    ['\u05D6\u05D9\u05DB\u05E8\u05D5\u05DF \u05E7\u05D5\u05DC\u05E7\u05D8\u05D9\u05D1\u05D9']],
    [['Asset'],                ['\u05E0\u05DB\u05E1 \u05DE\u05D5\u05E8\u05E9\u05EA', '\u05E0\u05DB\u05E1']],
    [['General'],              ['\u05E1\u05D5\u05D2 \u05DB\u05DC\u05DC\u05D9']]
  ];
  TYPE_PAIRS.forEach(function (pair) {
    var canonical = pair[0][0];
    var hebrewVariants = pair[1];
    HEBREW_LABEL_BY_CANONICAL[canonical] = hebrewVariants[0];
    hebrewVariants.forEach(function (he) { CANONICAL_TYPE_MAP[he] = canonical; });
  });

  /* ── Dynamic fallback palette for unknown types ── */
  var dynamicTypeColors = {};
  var dynamicPalette = [
    { background: 'rgba(244,67,54,0.7)',  border: '#F44336' },
    { background: 'rgba(76,175,80,0.7)',  border: '#4CAF50' },
    { background: 'rgba(33,150,243,0.7)', border: '#2196F3' },
    { background: 'rgba(255,152,0,0.7)',  border: '#FF9800' },
    { background: 'rgba(156,39,176,0.7)', border: '#9C27B0' },
    { background: 'rgba(121,85,72,0.7)',  border: '#795548' }
  ];
  var dynamicIndex = 0;

  function getDynamicColor(typeKey) {
    if (!typeKey) return FALLBACK_COLOR;
    if (!dynamicTypeColors[typeKey]) {
      dynamicTypeColors[typeKey] = dynamicPalette[dynamicIndex % dynamicPalette.length];
      dynamicIndex++;
    }
    return dynamicTypeColors[typeKey];
  }

  /* ── Bilingual UI strings ── */
  var UI_STRINGS = {
    en: {
      selectNode:     'Click a node to inspect it.',
      searchResults:  'Search Results',
      noResults:      'No results for',
      type:           'Type',
      meaning:        'Meaning',
      valueType:      'Value Type',
      directRelations:'Direct Relations',
      connections:    'Connections',
      noRelations:    'No connections.',
      subtitle:       'CBSA interactive graph',
      search:         'Search',
      clear:          'Clear',
      showAll:        'Show all',
      placeholder:    'Search node, type, meaning',
      tabInfo:        'Info',
      tabAnalytics:   'Analytics',
      tabAI:          'AI Query',
      nodes:          'Nodes',
      edges:          'Edges',
      types:          'Types',
      density:        'Density',
      mostConnected:  'Most Connected',
      aiTitle:        'Deep Graph Query',
      aiDescription:  'Use the GPT conversation to ask questions about this knowledge graph. The chatbot can analyze relationships, trace connections, identify patterns, and interpret the heritage significance map.',
      aiTryAsking:    'Try asking in the chat:',
      aiExamples:     [
        '"What are the main value clusters in this graph?"',
        '"Which node connects the most entities?"',
        '"Trace the path from [asset] to [value]"',
        '"What contexts frame the significance of this site?"'
      ],
      outgoing:       'Outgoing',
      incoming:       'Incoming'
    },
    he: {
      selectNode:     '\u05DC\u05D7\u05E6\u05D5 \u05E2\u05DC \u05E6\u05D5\u05DE\u05EA \u05DB\u05D3\u05D9 \u05DC\u05E8\u05D0\u05D5\u05EA \u05E4\u05E8\u05D8\u05D9\u05DD.',
      searchResults:  '\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D9\u05E4\u05D5\u05E9',
      noResults:      '\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8',
      type:           '\u05E1\u05D5\u05D2',
      meaning:        '\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA',
      valueType:      '\u05E1\u05D5\u05D2 \u05E2\u05E8\u05DA',
      directRelations:'\u05E7\u05E9\u05E8\u05D9\u05DD \u05D9\u05E9\u05D9\u05E8\u05D9\u05DD',
      connections:    '\u05E7\u05E9\u05E8\u05D9\u05DD',
      noRelations:    '\u05D0\u05D9\u05DF \u05E7\u05E9\u05E8\u05D9\u05DD.',
      subtitle:       '\u05D2\u05E8\u05E3 \u05D9\u05D3\u05E2 \u05D0\u05D9\u05E0\u05D8\u05E8\u05D0\u05E7\u05D8\u05D9\u05D1\u05D9 CBSA',
      search:         '\u05D7\u05D9\u05E4\u05D5\u05E9',
      clear:          '\u05E0\u05E7\u05D4',
      showAll:        '\u05D4\u05E6\u05D2 \u05D4\u05DB\u05DC',
      placeholder:    '\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E6\u05D5\u05DE\u05EA, \u05E1\u05D5\u05D2, \u05DE\u05E9\u05DE\u05E2\u05D5\u05EA',
      tabInfo:        '\u05DE\u05D9\u05D3\u05E2',
      tabAnalytics:   '\u05E0\u05D9\u05EA\u05D5\u05D7',
      tabAI:          '\u05E9\u05D0\u05D9\u05DC\u05EA AI',
      nodes:          '\u05E6\u05DE\u05EA\u05D9\u05DD',
      edges:          '\u05E7\u05E9\u05E8\u05D9\u05DD',
      types:          '\u05E1\u05D5\u05D2\u05D9\u05DD',
      density:        '\u05E6\u05E4\u05D9\u05E4\u05D5\u05EA',
      mostConnected:  '\u05D4\u05DB\u05D9 \u05DE\u05E7\u05D5\u05E9\u05E8\u05D9\u05DD',
      aiTitle:        '\u05E9\u05D0\u05D9\u05DC\u05EA \u05D2\u05E8\u05E3 \u05DE\u05E2\u05DE\u05D9\u05E7\u05D4',
      aiDescription:  '\u05D4\u05E9\u05EA\u05DE\u05E9\u05D5 \u05D1\u05E9\u05D9\u05D7\u05EA GPT \u05DB\u05D3\u05D9 \u05DC\u05E9\u05D0\u05D5\u05DC \u05E9\u05D0\u05DC\u05D5\u05EA \u05E2\u05DC \u05D2\u05E8\u05E3 \u05D4\u05D9\u05D3\u05E2. \u05D4\u05E6\u05D0\u05D8\u05D1\u05D5\u05D8 \u05D9\u05DB\u05D5\u05DC \u05DC\u05E0\u05EA\u05D7 \u05E7\u05E9\u05E8\u05D9\u05DD, \u05DC\u05E2\u05E7\u05D5\u05D1 \u05D0\u05D7\u05E8 \u05D7\u05D9\u05D1\u05D5\u05E8\u05D9\u05DD, \u05DC\u05D6\u05D4\u05D5\u05EA \u05D3\u05E4\u05D5\u05E1\u05D9\u05DD \u05D5\u05DC\u05E4\u05E8\u05E9 \u05D0\u05EA \u05DE\u05E4\u05EA \u05D4\u05DE\u05E9\u05DE\u05E2\u05D5\u05EA \u05D4\u05DE\u05D5\u05E8\u05E9\u05EA\u05D9\u05EA.',
      aiTryAsking:    '\u05E0\u05E1\u05D5 \u05DC\u05E9\u05D0\u05D5\u05DC \u05D1\u05E6\u05D0\u05D8:',
      aiExamples:     [
        '"\u05DE\u05D4\u05DD \u05D0\u05E9\u05DB\u05D5\u05DC\u05D5\u05EA \u05D4\u05E2\u05E8\u05DB\u05D9\u05DD \u05D4\u05DE\u05E8\u05DB\u05D6\u05D9\u05D9\u05DD \u05D1\u05D2\u05E8\u05E3?"',
        '"\u05D0\u05D9\u05D6\u05D4 \u05E6\u05D5\u05DE\u05EA \u05DE\u05D7\u05D1\u05E8 \u05D4\u05DB\u05D9 \u05D4\u05E8\u05D1\u05D4 \u05D9\u05E9\u05D5\u05D9\u05D5\u05EA?"',
        '"\u05E2\u05E7\u05D5\u05D1 \u05D0\u05D7\u05E8 \u05D4\u05DE\u05E1\u05DC\u05D5\u05DC \u05DE[\u05E0\u05DB\u05E1] \u05DC[\u05E2\u05E8\u05DA]"',
        '"\u05D0\u05D9\u05DC\u05D5 \u05D4\u05E7\u05E9\u05E8\u05D9\u05DD \u05DE\u05DE\u05E1\u05D2\u05E8\u05D9\u05DD \u05D0\u05EA \u05DE\u05E9\u05DE\u05E2\u05D5\u05EA \u05D4\u05D0\u05EA\u05E8?"'
      ],
      outgoing:       '\u05D9\u05D5\u05E6\u05D0\u05D9\u05DD',
      incoming:       '\u05E0\u05DB\u05E0\u05E1\u05D9\u05DD'
    }
  };

  /* ── Type resolution helpers ── */
  function resolveType(rawType) {
    if (!rawType) return 'General';
    var t = String(rawType).trim();
    if (CANONICAL_TYPE_MAP[t]) return CANONICAL_TYPE_MAP[t];
    if (COLOR_BY_TYPE[t]) return t;
    var lower = t.toLowerCase();
    if (lower === 'value' || lower === 'cultural value') return 'Cultural Value';
    if (lower === 'asset') return 'Asset';
    return t;
  }

  function resolveColor(node) {
    if (node.color && node.color.background) return node.color;
    var canonical = resolveType(node.type);
    if (COLOR_BY_TYPE[canonical]) return COLOR_BY_TYPE[canonical];
    if (COLOR_BY_TYPE[node.type]) return COLOR_BY_TYPE[node.type];
    return getDynamicColor(canonical);
  }

  function getNodeSize(node) {
    var canonical = resolveType(node.type);
    if (canonical === 'Asset') return 16;
    if (canonical === 'Cultural Value' || canonical === 'Value' || node.value_type) return 11;
    return 9;
  }

  /* ── Read data ── */
  var data = window.__DATA_JSON__ || { nodes: [], edges: [], title: 'Knowledge Graph' };
  var toolbar = document.getElementById('kg-toolbar');
  var container = document.getElementById('kg-network');
  var sidebar = document.getElementById('kg-sidebar');

  if (!toolbar || !container || !sidebar || !window.vis) {
    console.error('KG runtime: missing DOM nodes or vis-network runtime.');
    return;
  }

  var allNodes = Array.isArray(data.nodes) ? data.nodes.slice() : [];
  var allEdges = Array.isArray(data.edges) ? data.edges.slice() : [];
  var title = data.title || 'Knowledge Graph';

  /* ── RTL auto-detection ── */
  var anyRTL = allNodes.some(function (n) { return isRTL(n.name) || isRTL(n.meaning); });
  var uiLang = anyRTL ? 'he' : 'en';
  var ui = UI_STRINGS[uiLang];
  var fontFace = anyRTL
    ? 'Noto Sans Hebrew, Noto Sans, Arial'
    : 'Noto Sans, Noto Sans Hebrew, Arial';

  document.documentElement.lang = anyRTL ? 'he' : 'en';
  document.documentElement.dir = anyRTL ? 'rtl' : 'ltr';
  document.body.dir = anyRTL ? 'rtl' : 'ltr';
  if (anyRTL) document.body.classList.add('rtl');

  /* ── Build adjacency & degree maps ── */
  var nodeById = new Map(allNodes.map(function (node) { return [node.id, node]; }));
  var adjacency = new Map();
  var degreeMap = new Map();
  // Edge lookup: from→[{to, label}] and to→[{from, label}]
  var outEdges = new Map();
  var inEdges = new Map();

  allNodes.forEach(function (node) {
    adjacency.set(node.id, new Set());
    degreeMap.set(node.id, 0);
    outEdges.set(node.id, []);
    inEdges.set(node.id, []);
  });

  allEdges.forEach(function (edge) {
    if (!adjacency.has(edge.from)) adjacency.set(edge.from, new Set());
    if (!adjacency.has(edge.to)) adjacency.set(edge.to, new Set());
    adjacency.get(edge.from).add(edge.to);
    adjacency.get(edge.to).add(edge.from);
    degreeMap.set(edge.from, (degreeMap.get(edge.from) || 0) + 1);
    degreeMap.set(edge.to, (degreeMap.get(edge.to) || 0) + 1);
    if (!outEdges.has(edge.from)) outEdges.set(edge.from, []);
    if (!inEdges.has(edge.to)) inEdges.set(edge.to, []);
    outEdges.get(edge.from).push({ to: edge.to, label: edge.label || '' });
    inEdges.get(edge.to).push({ from: edge.from, label: edge.label || '' });
  });

  /* ── Node preprocessing ── */
  var typeDisplayMap = {};
  allNodes.forEach(function (node) {
    var canonical = resolveType(node.type);
    if (anyRTL) {
      node.display_type = isRTL(node.type) ? node.type : (HEBREW_LABEL_BY_CANONICAL[canonical] || canonical);
    } else {
      node.display_type = COLOR_BY_TYPE[canonical] ? canonical : node.type;
    }
    node._resolved_color = resolveColor(node);
    if (!typeDisplayMap[node.type]) {
      typeDisplayMap[node.type] = node.display_type || node.type;
    }
  });

  /* ── Collect type order ── */
  var typeOrder = [];
  var seenTypes = new Set();
  allNodes.forEach(function (node) {
    if (!seenTypes.has(node.type)) {
      seenTypes.add(node.type);
      typeOrder.push(node.type);
    }
  });

  /* ── State ── */
  var isolatedType = null;
  var searchInputValue = '';
  var appliedSearch = '';
  var selectedId = null;
  var activeTab = 'info'; // 'info' | 'analytics' | 'ai'

  /* ── vis-network ── */
  var nodesDS = new vis.DataSet();
  var edgesDS = new vis.DataSet();

  var network = new vis.Network(
    container,
    { nodes: nodesDS, edges: edgesDS },
    {
      autoResize: true,
      interaction: {
        hover: true,
        keyboard: false,
        navigationButtons: false,
        multiselect: false
      },
      physics: {
        enabled: true,
        solver: 'repulsion',
        repulsion: {
          nodeDistance: 150,
          centralGravity: 0.08,
          springLength: 80,
          springConstant: 0.012,
          damping: 0.14
        },
        stabilization: { enabled: true, iterations: 600, updateInterval: 25 }
      },
      layout: {
        improvedLayout: true,
        randomSeed: 12
      },
      nodes: {
        shape: 'dot',
        size: 10,
        borderWidth: 2,
        borderWidthSelected: 4,
        labelHighlightBold: true,
        font: {
          face: fontFace,
          size: 14,
          color: '#0f172a',
          vadjust: 24
        }
      },
      edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.45 } },
        smooth: { enabled: true, type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.5 },
        width: 1.5,
        color: {
          color: '#848484',
          highlight: '#333',
          hover: '#555',
          inherit: false
        },
        font: {
          size: 11,
          color: '#555',
          background: 'rgba(255,255,255,0.82)',
          strokeWidth: 0,
          face: fontFace
        }
      }
    }
  );

  /* ── Utility ── */
  function normalize(value) { return String(value || '').toLowerCase().trim(); }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function nodeMatches(node, query) {
    var q = normalize(query);
    if (!q) return true;
    var haystack = [node.name, node.type, node.display_type, node.meaning, node.value_type, node.meta ? JSON.stringify(node.meta) : ''].join(' ');
    return normalize(haystack).includes(q);
  }

  function getDirectMatchIds(query) {
    var q = normalize(query);
    var ids = new Set();
    if (!q) return ids;
    allNodes.forEach(function (node) { if (nodeMatches(node, q)) ids.add(node.id); });
    return ids;
  }

  function getExpandedIds(matchIds) {
    var expanded = new Set(matchIds);
    allEdges.forEach(function (edge) {
      if (matchIds.has(edge.from) || matchIds.has(edge.to)) { expanded.add(edge.from); expanded.add(edge.to); }
    });
    return expanded;
  }

  function getTypeFocusedIds(typeName) {
    if (!typeName) return null;
    var ids = new Set();
    allNodes.forEach(function (node) { if (node.type === typeName) ids.add(node.id); });
    allEdges.forEach(function (edge) {
      var fn = nodeById.get(edge.from), tn = nodeById.get(edge.to);
      if ((fn && fn.type === typeName) || (tn && tn.type === typeName)) { ids.add(edge.from); ids.add(edge.to); }
    });
    return ids;
  }

  function computeVisibleState() {
    var directMatchIds = getDirectMatchIds(appliedSearch);
    var expandedSearchIds = appliedSearch ? getExpandedIds(directMatchIds) : null;
    var focusedTypeIds = getTypeFocusedIds(isolatedType);
    var visibleNodes = allNodes.filter(function (node) {
      if (expandedSearchIds && !expandedSearchIds.has(node.id)) return false;
      if (focusedTypeIds && !focusedTypeIds.has(node.id)) return false;
      return true;
    });
    var visibleNodeIds = new Set(visibleNodes.map(function (n) { return n.id; }));
    var visibleEdges = allEdges.filter(function (e) { return visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to); });
    return { directMatchIds: directMatchIds, visibleNodes: visibleNodes, visibleEdges: visibleEdges, visibleNodeIds: visibleNodeIds };
  }

  /* ── Node styling (dot shape) ── */
  function styleNode(node, state) {
    var baseColor = node._resolved_color || FALLBACK_COLOR;
    var selectedNeighbors = selectedId ? adjacency.get(selectedId) || new Set() : new Set();
    var isSelected = selectedId === node.id;
    var isNeighbor = selectedId ? selectedNeighbors.has(node.id) : false;
    var isMatch = state.directMatchIds.has(node.id);
    var opacity = 1;
    if (selectedId) { opacity = isSelected || isNeighbor ? 1 : 0.22; }
    else if (appliedSearch) { opacity = isMatch ? 1 : 0.44; }
    var size = getNodeSize(node);
    return {
      id: node.id,
      label: node.name,
      shape: 'dot',
      size: isSelected ? size + 4 : size,
      color: {
        background: baseColor.background,
        border: isSelected || isMatch ? '#0f172a' : baseColor.border,
        highlight: { background: baseColor.background, border: '#0f172a' },
        hover: { background: baseColor.background, border: '#0f172a' }
      },
      borderWidth: isSelected ? 4 : isMatch ? 3 : 2,
      opacity: opacity,
      font: { face: fontFace, size: 14, color: 'rgba(15,23,42,' + opacity + ')', vadjust: 24 }
    };
  }

  /* ── Edge styling ── */
  function styleEdge(edge) {
    var selectedNeighbors = selectedId ? adjacency.get(selectedId) || new Set() : new Set();
    var selectedEdge = selectedId && (edge.from === selectedId || edge.to === selectedId);
    var nearbyEdge = selectedId && (selectedNeighbors.has(edge.from) || selectedNeighbors.has(edge.to));
    var opacity = 0.9, width = 1.5;
    if (selectedId) { opacity = selectedEdge ? 1 : nearbyEdge ? 0.55 : 0.14; width = selectedEdge ? 2.6 : 1.5; }
    else if (appliedSearch) { opacity = 0.4; }
    return {
      id: edge.from + '__' + edge.to + '__' + (edge.label || ''),
      from: edge.from, to: edge.to, label: edge.label || '',
      arrows: { to: { enabled: true, scaleFactor: 0.45 } },
      width: width,
      smooth: { enabled: true, type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.5 },
      color: { color: 'rgba(132,132,132,' + opacity + ')', highlight: '#333', hover: '#555' },
      font: { size: 11, color: 'rgba(85,85,85,' + Math.max(opacity, 0.36) + ')', background: 'rgba(255,255,255,0.82)', face: fontFace }
    };
  }

  function getDirectMatches(state) {
    return state.visibleNodes.filter(function (n) { return state.directMatchIds.has(n.id); });
  }

  /* ── Toolbar rendering ── */
  function renderToolbar(state) {
    var directMatches = getDirectMatches(state);
    toolbar.innerHTML =
      '<div class="kg-toolbar-main">' +
        '<div class="kg-title-block">' +
          '<div class="kg-title">' + escapeHtml(title) + '</div>' +
          '<div class="kg-subtitle">' + escapeHtml(ui.subtitle) + '</div>' +
        '</div>' +
        '<div class="kg-status-pills">' +
          '<span class="kg-pill">Nodes: ' + state.visibleNodes.length + '</span>' +
          '<span class="kg-pill">Edges: ' + state.visibleEdges.length + '</span>' +
          (appliedSearch ? '<span class="kg-pill kg-pill-accent">Matches: ' + directMatches.length + '</span>' : '') +
          (selectedId ? '<span class="kg-pill kg-pill-strong">Selected</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="kg-toolbar-controls">' +
        '<div class="kg-search-wrap">' +
          '<input id="kg-search-input" type="text" placeholder="' + escapeHtml(ui.placeholder) + '" value="' + escapeHtml(searchInputValue) + '" />' +
          '<button id="kg-search-btn" type="button">' + escapeHtml(ui.search) + '</button>' +
          '<button id="kg-clear-btn" type="button">' + escapeHtml(ui.clear) + '</button>' +
        '</div>' +
        '<div class="kg-filter-row">' +
          typeOrder.map(function (type) {
            var displayLabel = typeDisplayMap[type] || type;
            var color = (allNodes.find(function (n) { return n.type === type; }) || {})._resolved_color;
            var dotHtml = color ? '<span class="kg-filter-dot" style="background:' + color.border + '"></span> ' : '';
            return '<button class="kg-filter-btn ' + (isolatedType === type ? 'is-active' : '') + '" data-type="' + escapeHtml(type) + '">' + dotHtml + escapeHtml(displayLabel) + '</button>';
          }).join('') +
          (isolatedType ? '<button id="kg-show-all" class="kg-filter-btn kg-show-all" type="button">' + escapeHtml(ui.showAll) + '</button>' : '') +
        '</div>' +
      '</div>';

    var input = document.getElementById('kg-search-input');
    var searchBtn = document.getElementById('kg-search-btn');
    var clearBtn = document.getElementById('kg-clear-btn');
    if (input) {
      input.addEventListener('input', function () { searchInputValue = this.value || ''; });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { appliedSearch = searchInputValue.trim(); var d = allNodes.filter(function (n) { return nodeMatches(n, appliedSearch); }); selectedId = d.length ? d[0].id : null; activeTab = 'info'; update(); }
      });
    }
    if (searchBtn) { searchBtn.addEventListener('click', function () { appliedSearch = searchInputValue.trim(); var d = allNodes.filter(function (n) { return nodeMatches(n, appliedSearch); }); selectedId = d.length ? d[0].id : null; activeTab = 'info'; update(); }); }
    if (clearBtn) { clearBtn.addEventListener('click', function () { searchInputValue = ''; appliedSearch = ''; selectedId = null; update(); }); }
    toolbar.querySelectorAll('[data-type]').forEach(function (btn) { btn.addEventListener('click', function () { var t = this.getAttribute('data-type'); isolatedType = isolatedType === t ? null : t; selectedId = null; update(); }); });
    var showAllBtn = document.getElementById('kg-show-all');
    if (showAllBtn) { showAllBtn.addEventListener('click', function () { isolatedType = null; selectedId = null; update(); }); }
  }

  /* ── Sidebar: Tab bar + content ── */
  function renderSidebar(state) {
    var tabBar =
      '<div class="kg-tab-bar">' +
        '<button class="kg-tab' + (activeTab === 'info' ? ' is-active' : '') + '" data-tab="info">' + escapeHtml(ui.tabInfo) + '</button>' +
        '<button class="kg-tab' + (activeTab === 'analytics' ? ' is-active' : '') + '" data-tab="analytics">' + escapeHtml(ui.tabAnalytics) + '</button>' +
        '<button class="kg-tab' + (activeTab === 'ai' ? ' is-active' : '') + '" data-tab="ai">' + escapeHtml(ui.tabAI) + '</button>' +
      '</div>';

    var content = '';
    if (activeTab === 'info') { content = renderInfoTab(state); }
    else if (activeTab === 'analytics') { content = renderAnalyticsTab(state); }
    else { content = renderAITab(); }

    sidebar.innerHTML = tabBar + '<div class="kg-tab-content">' + content + '</div>';

    // Tab switching
    sidebar.querySelectorAll('.kg-tab').forEach(function (btn) {
      btn.addEventListener('click', function () { activeTab = this.getAttribute('data-tab'); renderSidebar(state); });
    });
    // Node click navigation
    sidebar.querySelectorAll('[data-node-id]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nodeId = this.getAttribute('data-node-id');
        if (!nodeId) return;
        selectedId = nodeId;
        activeTab = 'info';
        update();
        network.focus(nodeId, { scale: 1.02, animation: { duration: 260 } });
      });
    });
  }

  /* ── Info Tab ── */
  function renderInfoTab(state) {
    var selectedNode = selectedId ? nodeById.get(selectedId) : null;
    var directMatches = getDirectMatches(state);

    if (!selectedNode) {
      var html = '<div class="kg-panel-section"><div class="kg-panel-title">Knowledge Graph</div><div class="kg-panel-text">' + escapeHtml(ui.selectNode) + '</div></div>';
      if (appliedSearch) {
        html += '<div class="kg-panel-section"><div class="kg-section-label">' + escapeHtml(ui.searchResults) + '</div>';
        if (directMatches.length) {
          directMatches.forEach(function (n) {
            html += '<button class="kg-result-btn" data-node-id="' + escapeHtml(n.id) + '"><span class="kg-result-name">' + escapeHtml(n.name) + '</span><span class="kg-result-type">' + escapeHtml(n.display_type || n.type) + '</span></button>';
          });
        } else { html += '<div class="kg-empty">' + escapeHtml(ui.noResults) + ' "' + escapeHtml(appliedSearch) + '"</div>'; }
        html += '</div>';
      }
      return html;
    }

    var nodeColor = selectedNode._resolved_color || FALLBACK_COLOR;
    var out = outEdges.get(selectedNode.id) || [];
    var inc = inEdges.get(selectedNode.id) || [];

    var html = '<div class="kg-panel-section">' +
      '<div class="kg-panel-title">' + escapeHtml(selectedNode.name) + '</div>' +
      '<div class="kg-meta-row"><strong>' + escapeHtml(ui.type) + ':</strong> <span class="kg-type-badge" style="background:' + nodeColor.border + '"></span> <span>' + escapeHtml(selectedNode.display_type || selectedNode.type || '\u2014') + '</span></div>' +
      '<div class="kg-meta-row"><strong>' + escapeHtml(ui.meaning) + ':</strong> <span>' + escapeHtml(selectedNode.meaning || '\u2014') + '</span></div>' +
      (selectedNode.value_type ? '<div class="kg-meta-row"><strong>' + escapeHtml(ui.valueType) + ':</strong> <span>' + escapeHtml(selectedNode.value_type) + '</span></div>' : '');

    // Meta fields
    if (selectedNode.meta) {
      Object.keys(selectedNode.meta).forEach(function (key) {
        html += '<div class="kg-meta-row"><strong>' + escapeHtml(key) + ':</strong> <span>' + escapeHtml(selectedNode.meta[key]) + '</span></div>';
      });
    }
    html += '</div>';

    // Connections: outgoing
    if (out.length) {
      html += '<div class="kg-panel-section"><div class="kg-section-label">' + escapeHtml(ui.outgoing) + '</div>';
      out.forEach(function (e) {
        var target = nodeById.get(e.to);
        if (target) {
          html += '<button class="kg-result-btn" data-node-id="' + escapeHtml(e.to) + '"><span class="kg-result-name">' + escapeHtml(target.name) + '</span><span class="kg-edge-label">' + escapeHtml(e.label) + '</span></button>';
        }
      });
      html += '</div>';
    }
    // Connections: incoming
    if (inc.length) {
      html += '<div class="kg-panel-section"><div class="kg-section-label">' + escapeHtml(ui.incoming) + '</div>';
      inc.forEach(function (e) {
        var source = nodeById.get(e.from);
        if (source) {
          html += '<button class="kg-result-btn" data-node-id="' + escapeHtml(e.from) + '"><span class="kg-result-name">' + escapeHtml(source.name) + '</span><span class="kg-edge-label">' + escapeHtml(e.label) + '</span></button>';
        }
      });
      html += '</div>';
    }
    if (!out.length && !inc.length) {
      html += '<div class="kg-panel-section"><div class="kg-empty">' + escapeHtml(ui.noRelations) + '</div></div>';
    }
    return html;
  }

  /* ── Analytics Tab ── */
  function renderAnalyticsTab(state) {
    var nodeCount = state.visibleNodes.length;
    var edgeCount = state.visibleEdges.length;
    var typeCount = new Set(state.visibleNodes.map(function (n) { return resolveType(n.type); })).size;
    var maxEdges = nodeCount > 1 ? nodeCount * (nodeCount - 1) / 2 : 1;
    var density = (edgeCount / maxEdges).toFixed(3);

    var html = '<div class="kg-stat-grid">' +
      '<div class="kg-stat-card"><div class="kg-stat-value">' + nodeCount + '</div><div class="kg-stat-label">' + escapeHtml(ui.nodes) + '</div></div>' +
      '<div class="kg-stat-card"><div class="kg-stat-value">' + edgeCount + '</div><div class="kg-stat-label">' + escapeHtml(ui.edges) + '</div></div>' +
      '<div class="kg-stat-card"><div class="kg-stat-value">' + typeCount + '</div><div class="kg-stat-label">' + escapeHtml(ui.types) + '</div></div>' +
      '<div class="kg-stat-card"><div class="kg-stat-value">' + density + '</div><div class="kg-stat-label">' + escapeHtml(ui.density) + '</div></div>' +
    '</div>';

    // Most connected (top 5)
    var sorted = state.visibleNodes.slice().sort(function (a, b) { return (degreeMap.get(b.id) || 0) - (degreeMap.get(a.id) || 0); }).slice(0, 5);
    html += '<div class="kg-panel-section"><div class="kg-section-label">' + escapeHtml(ui.mostConnected) + '</div>';
    sorted.forEach(function (node) {
      var deg = degreeMap.get(node.id) || 0;
      html += '<button class="kg-result-btn" data-node-id="' + escapeHtml(node.id) + '"><span class="kg-result-name">' + escapeHtml(node.name) + '</span><span class="kg-result-type">' + deg + '</span></button>';
    });
    html += '</div>';

    return html;
  }

  /* ── AI Query Tab ── */
  function renderAITab() {
    return '<div class="kg-ai-panel">' +
      '<div class="kg-ai-icon">\uD83E\uDD16</div>' +
      '<div class="kg-ai-title">' + escapeHtml(ui.aiTitle) + '</div>' +
      '<div class="kg-ai-text">' + escapeHtml(ui.aiDescription) + '</div>' +
      '<div class="kg-ai-suggestions">' +
        '<div class="kg-ai-suggestion-label">' + escapeHtml(ui.aiTryAsking) + '</div>' +
        (ui.aiExamples || []).map(function (ex) {
          return '<div class="kg-ai-example">' + escapeHtml(ex) + '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }

  /* ── Legend ── */
  function renderLegend() {
    var existing = document.getElementById('kg-legend');
    if (existing) existing.remove();
    var typesInData = [];
    var seenCanonical = new Set();
    allNodes.forEach(function (node) {
      var canonical = resolveType(node.type);
      if (!seenCanonical.has(canonical)) {
        seenCanonical.add(canonical);
        var displayLabel = anyRTL ? (HEBREW_LABEL_BY_CANONICAL[canonical] || canonical) : canonical;
        var color = node._resolved_color || resolveColor(node);
        typesInData.push({ label: displayLabel, color: color.border });
      }
    });
    var legend = document.createElement('div');
    legend.id = 'kg-legend';
    legend.innerHTML = typesInData.map(function (t) {
      return '<span class="kg-legend-item"><span class="kg-legend-dot" style="background:' + t.color + '"></span>' + escapeHtml(t.label) + '</span>';
    }).join('');
    container.parentElement.appendChild(legend);
  }

  /* ── Main update cycle ── */
  var legendRendered = false;
  var lastVisibleSet = null; // track which nodes are visible to avoid unnecessary clear+add
  var physicsSettled = false;

  // Disable physics after initial stabilization to prevent jumping
  network.on('stabilized', function () {
    if (!physicsSettled) {
      physicsSettled = true;
      network.setOptions({ physics: { enabled: false } });
    }
  });

  function update(styleOnly) {
    var state = computeVisibleState();
    var visibleKey = state.visibleNodes.map(function (n) { return n.id; }).sort().join(',');
    var setChanged = visibleKey !== lastVisibleSet;

    if (setChanged || !lastVisibleSet) {
      // Visible set changed (filter/search) — must rebuild
      nodesDS.clear();
      edgesDS.clear();
      nodesDS.add(state.visibleNodes.map(function (n) { return styleNode(n, state); }));
      edgesDS.add(state.visibleEdges.map(function (e) { return styleEdge(e); }));
      lastVisibleSet = visibleKey;
      // Re-enable physics briefly for new layout, then settle
      if (physicsSettled) {
        network.setOptions({ physics: { enabled: true, stabilization: { enabled: true, iterations: 300 } } });
        physicsSettled = false;
        network.stabilize(300);
      }
    } else {
      // Same nodes visible — just update styles (no physics restart)
      nodesDS.update(state.visibleNodes.map(function (n) { return styleNode(n, state); }));
      edgesDS.update(state.visibleEdges.map(function (e) { return styleEdge(e); }));
    }

    renderToolbar(state);
    adjustLayout();
    renderSidebar(state);
    if (!legendRendered) { renderLegend(); legendRendered = true; }
  }

  /* ── Dynamic layout: offset sidebar & network below actual toolbar height ── */
  function adjustLayout() {
    var h = toolbar.offsetHeight || 96;
    sidebar.style.top = h + 'px';
    container.style.top = h + 'px';
    var legend = document.getElementById('kg-legend');
    // Legend bottom position is fine — no adjustment needed
  }

  network.on('click', function (params) {
    if (params.nodes && params.nodes.length) { selectedId = params.nodes[0]; activeTab = 'info'; }
    else { selectedId = null; }
    update(true); // style-only — don't restart physics
  });

  update();
})();
