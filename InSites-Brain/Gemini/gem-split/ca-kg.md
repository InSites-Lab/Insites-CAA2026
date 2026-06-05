# ═══════════════════════════════════════
# CA-KG — FULL Knowledge Graph spec (Gemini, hardened)
# version: v9.1 - split-gem fit to 3.1-pro - runtime
# ═══════════════════════════════════════
#
# build: CA-KG-FULL — the canonical KG DATA-extraction spec (entity taxonomy [CA-EC], extraction
#   priority order, the Per-Claim Epistemic Gate, the DATA schema, the context-effect offer, and the
#   HITL interpretive-entity review) is reproduced below. The rendering is EXTERNALIZED: §4 now emits a
#   thin vanilla-HTML shell that loads the shared `atar-runtime` package from jsDelivr and calls
#   `mount(container, DATA, host)`. The runtime owns the D3 force graph, the Info/Analytics/AI-Query
#   sidebar (incl. "💭 Entities to review"), the epistemic display, legend, search, zoom/drag and RTL.
#   The live AI Query stays live on Gemini — the shell wires `host.complete` to the Gemini API.
#
# Parallel review artifact — derived from the canonical Gemini split; NOT the source of truth.
#   Source of truth: InSites-CAA-GEM.md → cbsa-split/ca-kg.md. Re-sync there, then re-derive.

<EXECUTION_HARDENING>
Read first — these reinforce rules already present in the spec below; the canonical body governs CONTENT.
This body is the COMPLETE spec: any "performance" rewrite that drops sections (entity types, the
epistemic/HITL offers, the DATA schema, or the final checklist) is NON-CONFORMANT — do not follow it.

• Single self-contained HTML artifact. Vanilla JS — no React/JSX, no build step.
• Render via the externalized **atar-runtime** package — NOT inline d3/render code. Load the UMD via a
  `<script>` tag (never ESM `import` — the canvas sandbox throws "Dynamic require"):
  `<script src="https://cdn.jsdelivr.net/npm/atar-runtime@0.3.4/dist/atar-runtime.umd.js"></script>`
  then call `window.AtarRuntime.mount(el, DATA, host)`. The runtime owns ALL rendering (D3 force graph,
  sidebar tabs, epistemic display, legend, search, zoom/drag, RTL). Guard with
  `typeof window.AtarRuntime !== 'undefined'`. (jsDelivr is required for the runtime; the runtime loads
  its own sub-libraries, e.g. D3, from cdnjs internally.)
• IIFE + no reserved globals: wrap ALL artifact JS in `(function(){ /* all code */ })();`. Never declare a
  top-level variable named `top`, `name`, `length`, `parent`, `status`, `event`, or `location`. Prevents
  "Identifier 'X' has already been declared" in the canvas sandbox.
• Defensive sandbox APIs / no AbortController: use `Promise.race` + `setTimeout` for fetch timeouts (an
  `AbortController` cannot cross the artifact boundary → `DataCloneError`).
• Inline data only — embed the graph data as a JS object; never `fetch()` for the DATA.
• RTL / Hebrew: when the language is Hebrew, set `dir="rtl" lang="he"` on the root element; the runtime
  also auto-detects Hebrew content and flips RTL. Any chat-side table follows the reversed column order
  defined in [CA-HE] (in the system prompt / cbsa-core.md) — the single source of truth for table layout.
• Output discipline: respond with ONLY the artifact — no prose before or after — EXCEPT the post-artifact
  engagement prompts the spec requires (the context-effect offer and the 💭 interpretive-entity HITL review).
• Flow control lives in the system prompt's GLOBAL_INTERRUPT_ROUTER + EXECUTION_FRAMEWORK_STATE_MACHINE:
  those win on flow; the canonical body below wins on content.
</EXECUTION_HARDENING>

---

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
- The artifact is the **shell in §4** (loads `atar-runtime` from jsDelivr, passes `DATA` + `host`). The AI Query tab is **live** via `host.complete` → the Gemini API; all rendering is the runtime's. **Never hand-write d3/SVG/force code** — emit the shell even if the runtime fails (the shell shows a finding), not a renderer of your own.

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
5. Assign each node a `type` from the CA-EC in cbsa-reference.md entity categories. Default to the closest existing category. A new type may be introduced only when a node genuinely falls outside all 15 categories and forcing a match would misrepresent its heritage role — in that case, name the new type clearly and add it to the colour map.
6. **Mark epistemic status (mandatory)** — Set each node's `epistemic` per the Per-Claim Epistemic Gate (see Global Controls in cbsa-core.md): explicit in source → `sourced`; connected from 2+ pieces of evidence → `inferred` (〰️); a reading a peer could contest, or an entity/type proposed beyond the sources → `interpretive` (💭). For `inferred`/`interpretive` nodes, add an `epistemic_note` (≤15 words) stating why.

### 3. DATA Schema (strict)

⚠ Apply Language Policy to all KG fields.

```json
{
  "type": "kg",
  "title": "Asset name / graph title",
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

- `type` must use English tokens from CA-EC in cbsa-reference.md for colour mapping (the runtime translates to display labels when needed).
- `meaning` is concise, site-specific, written in English.
- Optional `value_type` must match CA-V in cbsa-reference.md.
- Edges use lowercase verbs; keep total edges ≤ 25.
- `epistemic` defaults to `sourced`; use `inferred` (〰️) or `interpretive` (💭) per the notation key, with an `epistemic_note` when not sourced. Surfaced by the runtime in the Info tab and the review list only — never on the node glyph.

### 4. Artifact — `atar-runtime` shell

Emit exactly the vanilla-HTML shell below as the artifact, replacing **only** `DATA` with the extracted graph (`type: 'kg'`) and `__GRAPH_TITLE__` with the asset name. The shell loads the shared **`atar-runtime`** package from jsDelivr and calls `mount(container, DATA, host)`. The runtime owns everything visual — force layout (node tiers Asset 14–16 / Cultural-Value 11 / other 8–10; link distance ~140, charge −350; curved arcs + arrowheads), the Info/Analytics/AI-Query sidebar tabs, the epistemic 💭/〰️ display (Info panel + the Analytics "💭 Entities to review" list only — **never** on the node glyph), the entity-type legend, search + type filters, zoom/drag, RTL auto-detection, and the **live AI Query** (wired here to the Gemini API via `host.complete`). **Do not generate any d3/SVG/force/render code yourself** — only the shell + `DATA`.

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Knowledge Graph</title></head>
<body>
  <div id="kg" style="height:90vh"></div>
  <script src="https://cdn.jsdelivr.net/npm/atar-runtime@0.3.4/dist/atar-runtime.umd.js"></script>
  <script>
  (function () {
    // ↓↓↓ Replace DATA with the extracted graph. Schema: §3 (type:'kg'). For Hebrew set <html lang="he">. ↓↓↓
    var DATA = {
      type: 'kg',
      title: '__GRAPH_TITLE__',
      nodes: [
        // 10–15 nodes (≤20); set epistemic + epistemic_note on non-sourced nodes per §2/§3
      ],
      edges: [
        // { source: 'a', target: 'b', label: 'relationship_verb' }   (lowercase verbs, ≤25)
      ]
    };
    // Live AI Query → Gemini API (key injected at runtime). No AbortController — Promise.race timeout.
    var apiKey = "";
    function complete(prompt) {
      var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=" + apiKey;
      var req = fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
      return Promise.race([req, new Promise(function (_, rej) { setTimeout(function () { rej(new Error('Timeout')); }, 20000); })])
        .then(function (r) { return r.json(); })
        .then(function (j) { return (j.candidates && j.candidates[0] && j.candidates[0].content
          && j.candidates[0].content.parts[0] && j.candidates[0].content.parts[0].text) || 'No response.'; });
    }
    function go() {
      try { window.AtarRuntime.mount(document.getElementById('kg'), DATA, { complete: complete }); }
      catch (e) { document.getElementById('kg').textContent = 'Graph error: ' + e.message; }
    }
    if (window.AtarRuntime) go();
    else { document.getElementById('kg').textContent = 'Graph runtime unavailable (jsDelivr blocked).'; }
  })();
  </script>
</body>
</html>
```

The shell is the only artifact code — there is no inline renderer to maintain. Full DATA field shapes + the GPT/Claude key aliases live in `atar-runtime/data-contract.md` (`type:'kg'`).

### 5. Final Checklist

1. **Counts**: 10–15 nodes (≤ 20), ≤ 25 edges, ≤ 3 Cultural Value nodes; no orphans.
2. **Fields**: every node has `id`, `name`, `type` (English CA-EC token), `meaning`. Edges use `source`/`target` + a lowercase verb.
3. **Epistemic**: every node has `epistemic` (default `sourced`); non-sourced nodes carry an `epistemic_note` (≤ 15 words). Per §2 / §3.
4. **Output**: the §4 shell only (only `DATA` + `__GRAPH_TITLE__` replaced); no surrounding prose; `atar-runtime` pinned `@0.3.4`; no hand-written d3/force/render code.
5. **Language / RTL**: all fields follow Language Policy; the runtime auto-detects Hebrew → RTL (for Hebrew, also set `<html lang="he">`).

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
