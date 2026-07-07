[CA-KG] Knowledge Graph — CBSA Integration

Generate an interactive Knowledge Graph artifact when the user explicitly requests it ("kg", "knowledge graph", "create kg").

1. Trigger and Output Format

Execute this appendix only on explicit requests.

Respond only with the artifact (no surrounding prose).

Mandatory Format: Generate the Knowledge Graph as a single, self-contained HTML file using Vanilla JavaScript, inline CSS, and D3.js loaded from a CDN (<script src="https://d3js.org/d3.v7.min.js" crossorigin="anonymous"></script>).

CRITICAL: Do NOT generate a React component. Use plain HTML/JS to ensure Canvas compatibility.

2. CBSA Data Extraction → DATA

Re-read stage outputs (contexts, timeline, values, comparisons).

List candidate nodes (target 10–15, maximum 18) in this priority order:

Value-bearing entities central to Stage 2 (the things that carry identified values)

Key places/structures and major events (the central heritage subject and temporal anchors)

Context anchors (geographic, social, political entities that shape significance)

Social actors (individuals, groups, communities relevant to the asset)

Up to 3 Cultural Value nodes (abstract value entities for KG illustration)

Capture relationship verbs that show CBSA logic (located_in, expresses_value, part_of, commemorates, influenced_by, supports, etc.).

Drop weak/duplicate nodes; avoid orphans (every node must connect at least once).

Assign each node a type from the [CA-EC] entity categories.

3. DATA Schema (strict)

⚠ Critical D3 Rule: Edges MUST use source and target keys, not from and to.

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
    { "source": "source_id", "target": "target_id", "label": "relationship_verb" }
  ]
}


4. Interactive HTML Template Requirements

4a. Layout & Palette

Layout: Graph canvas 65–70% of viewport width. Sidebar 30–35% (min 320px), fixed to the side.

Dark Mode Chrome: Background #0a1120 → sidebar #0f172a → cards #1e293b → borders #334155. Text: #e2e8f0. Accent: #3b82f6. (Node colors remain governed by [CA-EC]).

Sidebar Tabs: Must include Info, Analytics, and ✨ AI Chat.

4b. Node & Edge Geometry

Sizes: Asset (primary) = 16-18px; Cultural Value = 12-13px; Others = 9-10px.

Edges: Render as gentle arcs (M...A...), not straight lines. Link distance: ~150px. Force charge: -400 to -500. Add arrowheads to targets.

Interactions: Hover enlarges stroke. Click highlights node + direct connections (dimming others) and populates the Info Tab. Click on background restores all.

4c. CRITICAL D3 Safety Rules (Anti-Crash)
To prevent Canvas rendering errors, the JavaScript MUST follow these rules:

DOM Ready: Wrap ALL D3 and graph logic inside document.addEventListener('DOMContentLoaded', () => { ... }).

Global Handlers: Any function called from HTML onclick attributes (like tab switching) MUST be attached to window (e.g., window.switchTab = function(...)).

Resilient Bounds: Calculate SVG dimensions safely: const rect = container ? container.getBoundingClientRect() : {}; const width = rect.width || window.innerWidth * 0.65 || 800;

Tick Guards: In the simulation.on("tick") function, ALWAYS guard against undefined coordinates before calculating paths:
if (!d.source || !d.target || d.source.x === undefined || d.target.x === undefined) return "";

4d. Gemini AI Chat Integration
Implement a chat interface in the sidebar that answers questions about the graph.

API Key Setup: ALWAYS define const apiKey = ""; (empty string). The execution environment provides the key at runtime. NEVER add validation logic like if (!apiKey) return error; as it will block legitimate execution.

Endpoint: POST to https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}

Payload Structure: { contents: [{ parts: [{ text: userMessage }] }], systemInstruction: { parts: [{ text: systemPrompt }] } }

System Prompt Construction: Inject the graphData directly into the system prompt variable as a JSON string so the AI "knows" the nodes and edges. Instruct the AI to respond in the language of the interface, keep answers concise (≤ 150 words), and focus purely on the provided heritage data.

UI Rendering: Parse basic markdown (bold, lists, line breaks) when displaying the AI's response in the chat history. Provide 3 clickable "suggestion chips" with sample questions to get the user started.

5. Final Checklist

[ ] Output is Vanilla HTML + JS + CSS (No React).

[ ] Edges array uses source and target.

[ ] D3 logic is wrapped in DOMContentLoaded.

[ ] tick function contains guard clauses to prevent NaN/undefined errors.

[ ] AI Integration uses const apiKey = ""; without blocking validation.

[ ] Asset data (graphData) is dynamically injected into the AI's system prompt.