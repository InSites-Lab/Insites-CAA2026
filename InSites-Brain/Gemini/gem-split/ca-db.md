# ═══════════════════════════════════════
# CA-DB — FULL Dashboard spec (Gemini, hardened)
# version: v9.1 - split-gem fit to 3.1-pro - runtime
# ═══════════════════════════════════════
#
# build: CA-DB-FULL — the DATA-extraction specs are kept (foundation [CA-DB-F] + [CA-DB] single-assessment
#   + [CA-DB-C] collection). The RENDERING is EXTERNALIZED: both dashboards now emit a thin vanilla-HTML
#   shell that loads the shared `atar-runtime` from jsDelivr and calls `mount(container, DATA, host)`. The
#   runtime owns every tab + the map (Leaflet + OSM tiles with a zero-network SVG vector fallback) + charts
#   + cross-tab highlighting + guide-less LIM layout + RTL. The live AI-Query stays live on Gemini — the
#   shell wires `host.complete` to the Gemini API. Your job is only to extract DATA (§2/§3).
#
# Parallel review artifact — derived from the canonical Gemini split; NOT the source of truth.
#   Source of truth: InSites-CAA-GEM.md → cbsa-split/ca-db.md. Re-sync there, then re-derive.

<EXECUTION_HARDENING>
Read first — these reinforce rules already present in [CA-DB-F] below; the canonical body governs CONTENT.
This body is the COMPLETE spec: any rewrite that hand-builds an inline renderer instead of emitting the
shell, or downgrades the live AI-Query, is NON-CONFORMANT.

• Single self-contained HTML artifact. Vanilla JS — no React/JSX, no build step.
• Render via the externalized **atar-runtime** package — NOT inline Leaflet/Chart.js/d3/tab code. Load the
  UMD via a `<script>` tag (never ESM `import`):
  `<script src="https://cdn.jsdelivr.net/npm/atar-runtime@0.3.0/dist/atar-runtime.umd.js"></script>`
  then call `window.AtarRuntime.mount(el, DATA, host)`. The runtime owns ALL rendering — every tab, the map
  (Leaflet + OSM + zero-network vector fallback), charts/matrices, cross-tab highlighting, RTL. Guard with
  `typeof window.AtarRuntime !== 'undefined'`. (jsDelivr is required for the runtime; the runtime loads its
  own sub-libraries, e.g. D3/Leaflet, from cdnjs internally.)
• IIFE + no reserved globals: wrap ALL artifact JS in `(function(){ … })();`. Never declare a top-level
  variable named `top`, `name`, `length`, `parent`, `status`, `event`, or `location`.
• No AbortController: use `Promise.race` + `setTimeout` for fetch timeouts (AbortController cannot cross the
  artifact boundary → `DataCloneError`).
• Inline data only — embed all extracted data as a JS object in the shell; never `fetch()` for the DATA.
• RTL / Hebrew: set `dir="rtl" lang="he"` on the root for Hebrew; the runtime also auto-detects Hebrew and
  flips RTL. Any chat-side table follows the reversed column order in [CA-HE] (the single source of truth).
• Output discipline: respond with ONLY the artifact — no surrounding prose.
• Flow control lives in the system prompt's GLOBAL_INTERRUPT_ROUTER + EXECUTION_FRAMEWORK_STATE_MACHINE:
  those win on flow; the canonical body below wins on content.
</EXECUTION_HARDENING>

---

## [CA-DB-F] Dashboard Foundation — Shared Rules

> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-reference.md`, AI Query follows `[CA-AIQ]`.

These rules apply to **both** the single-assessment dashboard [CA-DB] and the collection dashboard [CA-DB-C]. Each spec references this foundation rather than repeating it.

### Rendering — via the `atar-runtime` shell

Both dashboards render through the shared **`atar-runtime`** package (vanilla JS + D3/Leaflet, loaded from `cdn.jsdelivr.net/npm/`). You emit a thin vanilla-HTML **shell** that calls `mount(container, DATA, host)`. The runtime owns: all tabs + layout, the map (Leaflet + OSM tiles with a zero-network SVG vector fallback), cross-tab entity highlighting, charts/matrices, RTL auto-detection, and the **live AI Query** (wired to the Gemini API via `host.complete`).

> **Mandatory & exclusive (non-negotiable) — KG and both dashboards.** The ONLY permitted artifact is this shell: it loads the pinned `atar-runtime` UMD from jsDelivr and calls `mount(container, DATA, host)`; you replace **only** `DATA`. NEVER write your own *rendering engine* — no Leaflet/Chart.js/d3/`<svg>` map, tab renderer, or hand-built dashboard — not partially, not "as a fallback." (Populating `DATA` is always fine, including a `custom` tab's `html` content — what is banned is authoring the renderer.) If the runtime fails to load, emit the shell anyway and let it show the finding — a failed load is a finding to report, not something to engineer around.

- **host**: `{ complete: fn }` where `complete(prompt)` calls the Gemini API (see the shell below) → keeps the AI Query tab live. If you cannot wire it, pass `{}` (→ copy-to-chat fallback).
- **DATA**: carries a `type` (`assessment` | `collection`) plus the extracted fields. See each spec's §2/§3 and `atar-runtime/data-contract.md` (the single source of truth for shapes + GPT/Claude key aliases).
- **No browser storage; no `AbortController`.** All data is inline in the shell.
- **Dynamic `tabs[]`** (types `table`/`cards`/`matrix`/`prose`/`custom`) carry MA-RA / MA-RC reading results, and — for the single assessment — the Report (always), Debrief, and Session-Analysis tabs as `prose`. They render after the fixed tabs, before AI Query.
- **LIM**: the runtime renders no top-of-tab guide banners; the content speaks for itself.

---

## [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: single-assessment visualization (one site, one CBSA process). For collection-level dashboards, see [CA-DB-C] below. Both share [CA-DB-F]; the runtime applies the single-assessment palette (DM Sans + blue accent).

Generate an interactive Assessment Dashboard after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

⚠ Apply Language Policy to all dashboard text.

### 1. Trigger and Offer

- **Mandatory offer**: At the end of Stage 6, always present: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- **Execute only on acceptance** — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: the **`atar-runtime` shell** (§4) — a thin vanilla-HTML artifact that loads the runtime and passes `DATA` (`type: 'assessment'`); the runtime renders all tabs + the map. Per [CA-DB-F]. Do not write inline chart/map/tab code.

### 2. Data Extraction

Re-read all stage outputs from the conversation and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps (list) |
| Timeline | Stage 1 | 5–10 key dated events with **year, label, and change type** (use / structure / setting / infrastructure) |
| Contexts | Stage 1 | Each context: type label, description, **related value categories**, **timespan** |
| Values | Stage 2 | Each value: name, category (CA-V in cbsa-reference.md), evidence strength (sourced/inferred/uncertain), 1-line summary |
| Attribute Table | Stage 2.1 | Each row: attribute name, associated value categories, site-specific significance, **implication for significance** |
| Authenticity | Stage 3 | Nara Grid as **structured objects**: aspect, attribute description, value expression, integrity rating (high/medium/low-medium/low). Plus summary sentence. |
| Comparative | Stage 4 | Each comparator: name, period, architect (if known), distinction narrative, criteria ratings (rarity, documentation, condition). Plus overall summary. |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level (3=high, 2=medium, 1=low). Derived from Stage 2 implications and Stage 3 ratings. |
| Process Quality | Stage 6 | Quick boosts (list), next steps (list), strengths count, gaps count |
| Knowledge Graph | CA-KG in ca-kg.md | If KG was generated: full nodes and edges JSON. If not: null. |
| Location Coordinates | Stage 0 + context | Lat/lng for asset and each comparator. Explicit from source, inferred from place names, or null. |
| Thematic Clusters | Stages 1–3 | Group values by overlapping contexts, contexts by temporal/causal overlap, vulnerability cells by shared high-impact patterns. |

**Rule**: Only include data that actually appeared in the conversation. Do not fabricate. If a stage was skipped, omit it (the runtime marks absent sections).

### 3. Data Schema (strict)

```json
{
  "type": "assessment",
  "asset": { "name": "", "location": "", "type": "", "period": "", "description": "", "coordinates": { "lat": null, "lng": null }, "coordinateSource": "explicit|inferred|unknown" },
  "dataQuality": { "sources": ["filename.pdf"], "gaps": ["missing X"] },
  "timeline": [ { "year": "1923–1924", "yearStart": 1923, "label": "...", "changeType": "structure" } ],
  "contexts": [ { "id": "ctx_hist", "type": "historical", "label": "...", "relatedValues": ["Historical", "Technological"], "timespan": "1915–1960s" } ],
  "values": [ { "id": "v_hist", "name": "...", "category": "Historical", "evidence": "sourced", "summary": "..." } ],
  "attributeTable": [ { "attribute": "...", "values": ["Social", "Symbolic"], "significance": "...", "implication": "..." } ],
  "authenticity": { "grid": [ { "aspect": "Form & Design", "description": "...", "valueExpression": "Historical, Aesthetic", "rating": "medium" } ], "summary": "..." },
  "comparative": { "summary": "...", "comparators": [ { "name": "...", "period": "...", "architect": "...", "distinction": "...", "criteria": { "rarity": "high", "documentation": "moderate", "condition": "unknown" }, "coordinates": { "lat": null, "lng": null } } ] },
  "significance": { "statement": "..." },
  "vulnerability": [ { "value": "Historical", "form": 3, "material": 3, "use": 2, "setting": 2 } ],
  "processQuality": { "strengths": 3, "gaps": 6, "quickBoosts": ["..."], "nextSteps": ["..."] },
  "stagesCompleted": [0,1,2,3,4,5,6],
  "kg": null,
  "themes": { "valueThemes": [{ "id": "", "label": "", "description": "", "valueIds": [], "color": "" }], "contextThemes": [{ "id": "", "label": "", "description": "", "contextIds": [], "color": "" }], "threatThemes": [{ "id": "", "label": "", "description": "", "vulnerabilities": [], "color": "" }] },
  "tabs": []
}
```

**Schema rules**:

- `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
- `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
- `timeline[].changeType` is mandatory — every event classifies what kind of change occurred.
- `contexts[].relatedValues` links each context to the value categories it generates (powers the runtime's cross-referencing).
- `vulnerability` is derived by cross-reading Stage 2 implications against Stage 3 ratings (3 severe / 2 moderate / 1 minor).
- `asset.coordinates` / `comparators[].coordinates`: explicit lat/lng, inferred from known place names, or null. Set `coordinateSource` accordingly.
- `themes`: group related values/contexts/vulnerabilities by narrative thread; ≥2 members per theme; only populate if ≥3 values OR ≥3 contexts exist. The runtime shows the Themes tab only when ≥2 themes total.
- `tabs`: dynamic tabs for MA-RA reading results + Report/Debrief/Session (see §5). Types: `table` / `cards` / `matrix` / `prose` / `custom`.
- Use exact entity names (asset, comparators) in all text + `tabs[]` data so the runtime's cross-tab links resolve.

### 4. Artifact — `atar-runtime` shell

Emit exactly the vanilla-HTML shell below, replacing **only** `DATA` with the extracted assessment (`type: 'assessment'`). The shell loads the shared **`atar-runtime`** and calls `mount(container, DATA, host)`. The runtime renders every tab + the map from `DATA`; your job is only to extract the data (§2/§3). **Do not write any Leaflet / Chart.js / d3 / tab / map code.**

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Assessment Dashboard</title></head>
<body>
  <div id="dash" style="height:92vh"></div>
  <script src="https://cdn.jsdelivr.net/npm/atar-runtime@0.3.0/dist/atar-runtime.umd.js"></script>
  <script>
  (function () {
    // ↓↓↓ Replace DATA with the extracted assessment. Schema: §3 (type:'assessment'). Hebrew → <html lang="he">. ↓↓↓
    var DATA = {
      type: 'assessment',
      asset: { name: '', location: '', type: '', period: '', description: '', coordinates: { lat: null, lng: null }, coordinateSource: 'unknown' },
      dataQuality: { sources: [], gaps: [] },
      timeline: [], contexts: [], values: [], attributeTable: [],
      authenticity: { grid: [], summary: '' },
      comparative: { summary: '', comparators: [] },
      significance: { statement: '' },
      vulnerability: [], processQuality: { strengths: 0, gaps: 0, quickBoosts: [], nextSteps: [] },
      themes: { valueThemes: [], contextThemes: [], threatThemes: [] },
      tabs: []   // Report (always) + Debrief/Session (conditional) + MA-RA readings — see §5
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
      try { window.AtarRuntime.mount(document.getElementById('dash'), DATA, { complete: complete }); }
      catch (e) { document.getElementById('dash').textContent = 'Dashboard error: ' + e.message; }
    }
    if (window.AtarRuntime) go();
    else { document.getElementById('dash').textContent = 'Dashboard runtime unavailable (jsDelivr blocked).'; }
  })();
  </script>
</body>
</html>
```

### 5. Tabs the runtime renders (what DATA powers each)

Fixed tabs, rendered automatically from `DATA`: **Overview** (KPIs from values/contexts/evidence-rate/gaps + `asset.description` + integrity range from `authenticity.grid` + `dataQuality` + `processQuality`) · **Map** (`asset.coordinates` + comparator coordinates; Leaflet + OSM tiles with a zero-network SVG vector fallback) · **Timeline** (`timeline[]`, colour-coded by `changeType`) · **Contexts & Values** (`contexts[]` + `values[]` + `attributeTable[]`, cross-highlight) · **[Themes]** (`themes.*`; shown when ≥2 total) · **Integrity** (`authenticity.grid` + `vulnerability` matrix) · **Comparative** (`comparative.comparators[]`) · **Significance** (`significance`). Then your dynamic `tabs[]`, then a live **AI Query** tab (runtime-owned, wired to `host.complete`).

**Report / Debrief / Session Analysis → dynamic `tabs[]` of type `prose`** (the runtime renders `{ sections:[{title, body}] }`, `**bold**` supported), emitted in this order after Significance:

- **Report** (always): `{ id:'report', label:'Report', icon:'📄', type:'prose', data:{ sections:[ … ] } }`. Sections, LIM (optimal not minimal), target 800–1200 words: **📋 Assessment Overview** (what + why) · **💎 Key Values** (top values + category + evidence 〰️/💭) · **🏛️ Integrity Snapshot** · **✨ Significance Statement** · **📐 Process & Methodology** · up to 2 of {**🔗 Context Effects**, **⚡ Priority Insights**, **🗺️ Comparative Position**} · always **💬 Session Analytics** · **💡 User Reflections** (omit if none). End with a section noting: "📥 Ask in chat to export this report as a formatted Word document."
- **Debrief** (only if the post-Stage-6 Debrief was completed): `{ id:'debrief', label:'Debrief', icon:'💬', type:'prose', data:{ sections:[ {title:question, body:userResponse} ×3 ] } }`.
- **Session Analysis** (only if opted in per [CA-IP] in cbsa-stages.md): `{ id:'session', label:'Session Analysis', icon:'📊', type:'prose', data:{ sections:[ Interaction Map, Self-Reflection, Session Signature ] } }`.

Other MA-RA reading results also go in `tabs[]` (types `table`/`cards`/`matrix`/`prose`/`custom`).

### 6. Final Checklist

1. **Output**: the §4 shell only (only `DATA` replaced); no surrounding prose; `atar-runtime` pinned `@0.3.0`; no hand-written Leaflet/Chart/d3/tab code.
2. **Data**: matches §3 — structured `authenticity.grid`, per-comparator objects, `timeline[].changeType`, `contexts[].relatedValues`, `vulnerability` cross-matrix. Only real conversation data.
3. **Tabs**: Report always present (prose tab); Debrief/Session only when they occurred; Themes data only when warranted (runtime shows it when ≥2).
4. **Coordinates**: set with `coordinateSource`; `null` when unknown (runtime shows a placeholder / vector fallback).
5. **Language/RTL**: fields follow Language Policy; the runtime auto-detects Hebrew → RTL (for Hebrew also set `<html lang="he">`).

**Export Offer (mandatory)**: after generating the dashboard, offer — "Would you like me to export this assessment as a formatted Word document?"

---

## [CA-DB-C] Collection Dashboard — MA-RC Integration

> **Scope**: collection-level visualization (multiple sites from MA-RC). For single-assessment dashboards, see [CA-DB] above. Both share [CA-DB-F]; the runtime applies the collection palette (Inter + stone/amber).

### 1. Trigger and Offer

- Offer after at least one MA-RC Step 3 analysis: "Would you like a visual dashboard for this collection?"
- Also generate on direct request ("dashboard", "collection dashboard", "visualize").
- Execute only on acceptance — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: the **`atar-runtime` shell** (§3) — a thin vanilla-HTML artifact that loads the runtime and passes `DATA` (`type: 'collection'`). Per [CA-DB-F]. Do not write inline chart/map/tab code.

### 2. Data Extraction

Re-read MA-RC Step 2 extraction output and build a per-site JSON record:

| Step 2 field | Dashboard field(s) | Notes |
|---|---|---|
| Name | `name` | Short display name |
| Location | `country`, `lat`, `lng` | Parse coordinates if available; `null` if not |
| Type | `type`, `typeCategory` | Category: landscape / single / ensemble / urban |
| Period | `period`, `periodCategory` | Category: prehistoric / ancient / medieval / modern / multiperiod |
| Site description | `description` | 1–2 sentences |
| Significance summary | `significanceSummary`, `highlight` | `highlight` = one-sentence collection-level insight **(MANDATORY — non-empty for every site)** |
| Values identified | `values: { [type]: "e"/"i"/"a" }` | 8 categories: Historical, Scientific, Landscape, Community, Intangible, Architectural, Nature, Educational. `e`=explicit, `i`=implied, `a`=absent |
| Integrity / Authenticity | `integrity`, `integrityNote` | Level: high / good / variable / unknown |
| Threats | `threats[]` | Array of threat category IDs |
| Comparative references | `comparativeBasis`, `claimScope` | claimScope: local / regional / national / international |

Also derive (if available): `significancePremises[]`, `managementClusters[]`, and:

- `themes[]` — **MANDATORY**. `{ id, label, description, sites: [siteId], evidence: { siteId: "text" } }`. Always generate from MA-RC analysis (minimum: group sites by overlapping value patterns).
- `tabs[]` — dynamic tabs from MA-RC Step 3 results. Types: `table` / `cards` / `matrix` / `prose` / `custom`.

### 3. Artifact — `atar-runtime` shell

Emit exactly the vanilla-HTML shell below, replacing **only** `DATA` with the extracted collection (`type: 'collection'`). The runtime renders every tab + the map; you only extract the data (§2). **Do not write any charts / map / tab code.**

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Collection Dashboard</title></head>
<body>
  <div id="dash" style="height:92vh"></div>
  <script src="https://cdn.jsdelivr.net/npm/atar-runtime@0.3.0/dist/atar-runtime.umd.js"></script>
  <script>
  (function () {
    // ↓↓↓ Replace DATA with the extracted collection. Schema: §2 (type:'collection'). Hebrew → <html lang="he">. ↓↓↓
    var DATA = {
      type: 'collection',
      collection: { name: '', source: '', depth: '', date: '', itemCount: 0 },
      sites: [],     // per-site objects per §2 (id, name, country, lat, lng, depth, type, period, values{e/i/a}, highlight, threats, …)
      themes: [],    // MANDATORY: [{ id, label, description, sites:[siteId], evidence:{siteId:'…'} }]
      collectionSummary: { narrative: '', patterns: [], gaps: [], distinctives: [] },
      tabs: []       // dynamic MA-RC Step-3 analyses (Arguments/Gaps/Cross-Tabs/Clusters)
    };
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
      try { window.AtarRuntime.mount(document.getElementById('dash'), DATA, { complete: complete }); }
      catch (e) { document.getElementById('dash').textContent = 'Dashboard error: ' + e.message; }
    }
    if (window.AtarRuntime) go();
    else { document.getElementById('dash').textContent = 'Collection runtime unavailable (jsDelivr blocked).'; }
  })();
  </script>
</body>
</html>
```

### 4. Tabs the runtime renders (what DATA powers each)

Fixed tabs from `DATA`: **Overview** (KPIs + region/type/period/depth distributions + `collectionSummary`) · **Map** (site markers coloured by `depth` + a depth filter; Leaflet + OSM with a zero-network vector fallback) · **Values** (sites × value-types matrix, `e`/`i`/`a` evidence) · **[Themes]** (`themes[]`, shown when present). Then your dynamic `tabs[]`, then a live **AI Query** tab. Use exact `site.name`/`site.id` everywhere so cross-tab links resolve.

Dynamic `tabs[]` (MA-RC Step-3 results) — `table` (Arguments), `matrix` (Gaps traffic-light), `custom` (Cross-Tabs), `cards` (Management Clusters), `prose`.

### 5. Final Checklist

1. **Output**: the §3 shell only (only `DATA` replaced); no surrounding prose; `atar-runtime` pinned `@0.3.0`.
2. **Data**: per §2 + `data-contract.md` (`type:'collection'`). `themes[]` MANDATORY (≥1); every site has a non-empty `highlight`; values use `e`/`i`/`a`; no fabricated data.
3. **Language/RTL**: fields follow Language Policy; the runtime auto-detects Hebrew → RTL.

**Dataset Export (offer)**: after generating, offer the extracted collection data as a structured JSON file (collection metadata + per-site objects + controlled-vocabulary enums).

---
