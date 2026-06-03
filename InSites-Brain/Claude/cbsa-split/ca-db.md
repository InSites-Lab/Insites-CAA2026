## [CA-DB-F] Dashboard Foundation — Shared Rules

> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-core.md`, AI Query follows `[CA-AIQ]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

These rules apply to **both** the single-assessment dashboard [CA-DB] and the collection dashboard [CA-DB-C]. Each spec references this foundation rather than repeating these patterns.

### Technical Constraints (native React artifact)

This dashboard is a **native React artifact** on Claude. Do NOT emit a self-contained HTML file, vanilla JS, CDN `<script>` tags, an IIFE, or a dynamic script loader — those are the GPT/Gemini constraints and are wrong here.

- **Imports (direct)**: Import the libraries you need — they are provided in the Claude React-artifact set: `recharts` (bar/line/area/pie charts), `d3` (KG force-graph + custom viz), `lucide-react` (icons), and `papaparse` / `xlsx` (SheetJS) when CSV/Excel handling is needed. Tailwind classes and inline styles both work. **Leaflet is used INSIDE the Map tab's `<iframe srcDoc>` (cdnjs 1.9.4 + OSM tiles), not `import`ed into React; a lightweight d3/SVG vector map is the mandatory fallback. See §4a.** **Do NOT use Plotly** — it is not in the React-artifact set (errors: "uses libraries we don't support: plotly.js-dist-min").
- **No external network**: the artifact sandbox blocks cross-origin `fetch`/XHR. All extracted data is embedded inline as a `const` object literal in the component. The only sanctioned outbound call is `window.claude.complete` (AI Query — see [CA-AIQ]). **Exception:** the Map tab's `<iframe srcDoc>` runs its own cdnjs `<script>` + OSM tile `<img>` loads (image/script loads are not the blocked fetch/XHR); if tiles fail, it falls back to the d3/SVG vector map.
- **No browser storage**: `localStorage`/`sessionStorage` are blocked. ALL UI state (active tab, guide-box collapsed, filters, highlight) lives in React state (`useState`/`useReducer`) — per-session, not persisted. Don't try/catch around storage; just don't use it.
- **Reserved names**: React component scope holds all locals (no IIFE). Still, don't name a state/ref with a reserved DOM global (`top`, `name`, `length`, `status`, `event`, `location`) — use `topSites`, `assetName`, etc.
- **Charts**: prefer `recharts` (React-native, responsive) for bar/line/area/pie. If a doughnut/pie needs Chart.js (also available), wrap the canvas in a fixed-height container and avoid `maintainAspectRatio:false`.
- **Map**: Leaflet (OSM tiles) inside an `<iframe srcDoc>` + a **mandatory** lightweight d3/SVG vector fallback on tile failure. Full spec + reference component in §4a.
- **Sizing**: measure chart/map/SVG containers with a `ResizeObserver` (or parent `clientWidth/clientHeight`) so first paint inside the animated artifact frame is correct; re-measure on resize.
- **RTL**: when the assessment language is Hebrew, set `dir="rtl" lang="he"` on the root and mirror layout per CA-HE in cbsa-core.md.
- **`window.claude.complete` timeouts**: do NOT use `AbortController`/`AbortSignal` (cannot cross the artifact `postMessage` boundary → `DataCloneError`). If you need a timeout, use `Promise.race` with `setTimeout`.
- **No in-artifact download / print**: blob downloads (`URL.createObjectURL`) and `window.print()` are blocked. Export (Word/PDF/Excel) is delivered through the chat — the bot generates the document — not via an in-artifact button. (`papaparse`/`xlsx` may build a workbook in memory for on-screen display; offer the actual file via chat.) The Report tab shows its content on-screen and notes: "📥 Ask in chat to export this as a formatted document."
- **State-only navigation**: there is no URL/history in the artifact — `activeTab` and all cross-references run purely from React state. No `pushState` / `location.hash` / `popstate`.

### Guide Boxes (every tab)

- Collapsible with chevron toggle, driven by **React state** (`useState`, e.g. a `{[tabId]: bool}` map or one flag per tab).
- Default expanded; collapse is per-session only (no localStorage — browser storage is blocked in artifacts).
- 3-zone structure: "What you see" (encoding), "How to interact" (actions), "What to look for" (insight callout with amber left-border accent).
- Styling: `background: var(--amber-100); border-left: 3px solid var(--amber-500);` — compact header with icon + title + chevron.
- Collapsed state: single line, minimal footprint.

### Navigation & History

- Active tab is held in **React state** (`const [activeTab, setActiveTab] = useState('overview')`) — the single source of truth. URL hash / `history.pushState` / `popstate` are blocked in the artifact sandbox; do not use them.
- After cross-tab jumps (e.g., entity click → different tab), show "← Back to [previous tab]" pill, tracked in React state.
- All tab switching and cross-references work entirely from React state — no URL involvement.

### Accessibility (mandatory)

- Sidebar navigation: `role="tablist"` on container, `role="tab"` with `aria-selected="true"/"false"` on each tab button, `role="tabpanel"` on content area.

### Cross-Tab Entity Linking

- All entity names (sites, values, comparators, themes) must be clickable across all tabs.
- Clicking navigates to the entity's primary tab with highlight.
- Shared highlight state: `{ type, id } | null`.

---

## [CA-DB] Assessment Dashboard — CBSA Integration

> **Scope**: This dashboard spec is for **single-assessment** visualization (one site, one CBSA process). For collection-level dashboards (multiple sites), see [CA-DB-C] below. Both share the same UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Single-assessment: DM Sans + blue accent (#2563eb). Collection: Inter + stone/amber.

Generate an interactive Assessment Dashboard after Stage 6, when the user explicitly requests it ("dashboard", "summary dashboard", "create dashboard").

⚠ Apply Language Policy to all dashboard text.

### 1. Trigger and Offer

- **Mandatory offer**: At the end of Stage 6, always present: "Would you like me to generate an interactive Assessment Dashboard that visualizes the complete CBSA process?"
- **Execute only on acceptance** — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: Generate as a **native React artifact** (Claude's default), importing `recharts`/`d3`/`lucide-react` as needed per [CA-DB-F]; the Map tab embeds an iframe-Leaflet map (see §4a). No self-contained HTML, no CDN, no vanilla-JS.

### 2. Data Extraction

Re-read all stage outputs from the conversation and extract:

| Section | Source | Data to extract |
| --- | --- | --- |
| Asset Identity | Stage 0 | Name, location, type, period, brief description (~20 words) |
| Data Quality | Stage 0 | Sources uploaded, identified gaps (list) |
| Timeline | Stage 1 | 5–10 key dated events with **year, label, and change type** (use / structure / setting / infrastructure) |
| Contexts | Stage 1 | Each context: type label, description, **related value categories**, **timespan** |
| Values | Stage 2 | Each value: name, category (CA-V in cbsa-core.md), evidence strength (sourced/inferred/uncertain), 1-line summary |
| Attribute Table | Stage 2.1 | Each row: attribute name, associated value categories, site-specific significance, **implication for significance** |
| Authenticity | Stage 3 | Nara Grid as **structured objects**: aspect, attribute description, value expression, integrity rating (high/medium/low-medium/low). Plus summary sentence. |
| Comparative | Stage 4 | Each comparator: name, period, architect (if known), distinction narrative, criteria ratings (rarity, documentation, condition). Plus overall summary. |
| Significance | Stage 5 | Full statement text |
| Vulnerability | Stages 2+3 | Cross-matrix: each value × each Nara aspect → impact level (3=high, 2=medium, 1=low). Derived from Stage 2 implications and Stage 3 ratings. |
| Process Quality | Stage 6 | Quick boosts (list), next steps (list), strengths count, gaps count |
| Knowledge Graph | CA-KG in ca-kg.md | If KG was generated: full nodes and edges JSON. If not: null. |
| Location Coordinates | Stage 0 + context | Lat/lng for asset and each comparator. Explicit from source, inferred from place names, or null. |
| Thematic Clusters | Stages 1–3 | Group values by overlapping contexts, contexts by temporal/causal overlap, vulnerability cells by shared high-impact patterns. |

**Rule**: Only include data that actually appeared in the conversation. Do not fabricate. If a stage was skipped or incomplete, show it as "Not completed" with a visual indicator.

### 3. Data Schema (strict)

```json
{
  "asset": { "name": "", "location": "", "type": "", "period": "", "description": "", "coordinates": { "lat": null, "lng": null }, "coordinateSource": "explicit|inferred|unknown" },
  "dataQuality": { "sources": ["filename.pdf"], "gaps": ["missing X"] },
  "timeline": [
    { "year": "1923–1924", "yearStart": 1923, "label": "...", "changeType": "structure" }
  ],
  "contexts": [
    { "id": "ctx_hist", "type": "historical", "label": "...", "relatedValues": ["Historical", "Technological"], "timespan": "1915–1960s" }
  ],
  "values": [
    { "id": "v_hist", "name": "...", "category": "Historical", "evidence": "sourced", "summary": "..." }
  ],
  "attributeTable": [
    { "attribute": "...", "values": ["Social", "Symbolic"], "significance": "...", "implication": "..." }
  ],
  "authenticity": {
    "grid": [
      { "aspect": "Form & Design", "description": "...", "valueExpression": "Historical, Aesthetic", "rating": "medium" }
    ],
    "summary": "..."
  },
  "comparative": {
    "summary": "...",
    "comparators": [
      { "name": "...", "period": "...", "architect": "...", "distinction": "...", "criteria": { "rarity": "high", "documentation": "moderate", "condition": "unknown" }, "coordinates": { "lat": null, "lng": null } }
    ]
  },
  "significance": { "statement": "..." },
  "vulnerability": [
    { "value": "Historical", "form": 3, "material": 3, "use": 2, "setting": 2 }
  ],
  "processQuality": { "strengths": 3, "gaps": 6, "quickBoosts": ["..."], "nextSteps": ["..."] },
  "stagesCompleted": [0,1,2,3,4,5,6],
  "kg": null,
  "themes": {
    "valueThemes": [{ "id": "", "label": "", "description": "", "valueIds": [], "color": "" }],
    "contextThemes": [{ "id": "", "label": "", "description": "", "contextIds": [], "color": "" }],
    "threatThemes": [{ "id": "", "label": "", "description": "", "vulnerabilities": [], "color": "" }]
  },
  "tabs": [
    { "id": "evidence", "label": "Evidence Weight", "icon": "⚖️", "type": "cards", "data": { "cards": [] } }
  ]
}
```

**Schema rules**:
- `authenticity.grid` must be **structured objects** — never flatten the Nara Grid to strings.
- `comparative.comparators` must be **per-site objects** with criteria — never a flat name list.
- `timeline[].changeType` is mandatory — every event classifies what kind of change occurred.
- `contexts[].relatedValues` links each context to the value categories it generates — this enables cross-referencing.
- `vulnerability` is derived by cross-reading Stage 2 implications against Stage 3 ratings. Impact levels: 3 = loss of this integrity aspect severely damages this value; 2 = moderate damage; 1 = minor or indirect.
- `asset.coordinates`: Extract lat/lng if explicit in source material; infer from well-known place names (e.g., "Kibbutz Ayelet HaShachar" → known coordinates); set null if unknown. Set `coordinateSource` accordingly.
- `comparative.comparators[].coordinates`: Same logic per comparator site.
- `themes`: Group related values/contexts/vulnerabilities by narrative thread. Rules: ≥2 members per theme; only populate if ≥3 values OR ≥3 contexts exist. Label each theme with a short noun phrase (e.g., "Industrial Heritage Identity", "Environmental Vulnerability"). Include 1-sentence rationale in `description`.
- `tabs`: Optional dynamic tabs for MA-RA reading results. If MA-RA readings (Evidence Weight, Stakeholder Lens, Context-Effect Audit, etc.) were performed during the session, include each as a tab entry. Supported types: `table` (columns + rows), `cards` (title/body/level/badges), `matrix` (rowLabels + colLabels + cells 0-3), `prose` (sections with title + body), `custom` (raw HTML). Dynamic tabs render after Significance.
- In all text fields and `tabs[]` data, use exact entity names (asset name, comparator names) to enable cross-tab navigation.

### 4. Tab Structure (mandatory — consolidated)

Tabs are consolidated for cognitive load management (~8 tabs, not 11+). Stages that are tightly coupled share a tab. Map is always present.

```
Overview → Map → Timeline → Contexts & Values → [Themes] → Integrity → Comparative → Significance → Report → [Debrief] → [Session Analysis] → AI Query
```

Brackets = conditional: Themes only if ≥2 themes total across all categories; Report — always generate (see `design/report-tab-spec.md` [CA-RPT]). AI Query is always present.

**Dashboard announcement (mandatory)**: Before generating, say: "I'll generate an interactive Assessment Dashboard — your full assessment visualized across [N] tabs."

**LIM — No guide banners**: Do not add explanatory info/guide banners at the top of each tab. The dashboard content should speak for itself. If a tab needs explanation, the content is not clear enough.

| Tab | Content | Key features |
| --- | --- | --- |
| **Overview** | KPIs, asset description, integrity range, data gaps, process summary, sources | KPIs: Values count, Evidence rate, Contexts count, Data Gaps count (not "Completion: 100%"). Integrity range shows color-coded ratings per aspect. Process section: strengths/gaps/quick boosts/next steps (folded from former Process tab). Sources list. |
| **Map** | Asset + mentioned locations (mandatory) | Leaflet/OSM tiles in an `<iframe>`; d3/SVG vector fallback on tile failure. **Always present** — even for single-site assessments, show the site as a point. If Stage 1, 4, or 5 mention other locations (comparison sites, connected sites, regional context), add as secondary points with labels. Asset: blue marker (`primary`). Comparators/mentioned: slate marker. Click → details panel + cross-link. Coordinate-source indicator below map. If coordinates unknown, placeholder "Location not specified in source material." See §4a. |
| **Timeline** | Chronological events | **Proportional spacing** based on year gaps. **Color-coded** by change type (use/structure/setting/infrastructure). Distribution summary. |
| **Contexts & Values** | Context cards + value cards + attribute table (merged) | **Contexts section**: Each card shows type label, description, timespan, **clickable value pills**. **Values section**: Cards with name, category pill, evidence indicator (〰️/💭 per notation key), summary. **Attribute table** below with 🔑 Implication column. Cross-referencing works within this tab: clicking a context highlights its related values inline. |
| **Themes** | Value/context/threat thematic clusters (conditional) | Sub-tab pills: "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Theme cards with colored dot, label, member pills (clickable → navigate to item in home tab). Only if ≥2 themes total. See §4b. |
| **Integrity** | Nara Grid cards + summary + vulnerability matrix | Each card: aspect name, description, value expression pills, **color-coded rating badge** (high=green → low=red). Left border color matches rating. **🔴 Vulnerability Analysis** (visible sub-heading): interpretive callout ABOVE the heat matrix (not below). Legend inline: "🔴 = loss severely damages this value, 🟡 = moderate, ⚪ = minor." Each cell shows symbol + number: `● 3` (severe), `◐ 2` (moderate), `○ 1` (minor), `· 0` (negligible) — symbols provide non-color distinction for accessibility. Heat matrix: rows = value categories, columns = Nara aspects with integrity rating in header. Only if vulnerability data exists. |
| **Comparative** | Per-comparator cards + summary | Each card: name, period, architect, criteria ratings (color-coded), distinction narrative. Source note. |
| **Significance** | Statement of cultural significance | Styled as a featured block. |
| **Report** | One-page printable assessment summary | Always generate. Export as HTML or PDF. See §4c [CA-RPT]. |
| **Debrief** | Session debrief Q&A (conditional) | Three reflection questions + user responses. Muted process styling. Only if user completed Debrief block after Stage 6. |
| **Session Analysis** | Session Report [CA-IP] in ca-ip.md (conditional) | Interaction Map, Self-Reflection, Session Signature. Muted process styling. Only if user opted in post-[CA-IP] in ca-ip.md. |
| **AI Query** | Live via `window.claude.complete` | Starter prompts + free-text box; runs a **live** completion grounded in the embedded dashboard data, with loading state and a copy-to-chat fallback when the runtime is unavailable. See §9a. |

### 4a. Map Tab Spec (mandatory)

**Architecture: React host, HTML map island.** The dashboard stays a native React artifact. The Map tab is the one component that renders an `<iframe sandbox="allow-scripts" srcDoc={…}>` whose document is a **self-contained Leaflet page** (Leaflet 1.9.4 from cdnjs + OSM tiles). The iframe is a separate browsing context, so its cdnjs `<script>` and tile `<img>` loads behave as in a standalone HTML artifact — script/image loads are **not** the blocked cross-origin `fetch`/XHR. **Do NOT** `import` Leaflet/`react-leaflet` into the React artifact, and **do NOT** use Plotly (it errors: "uses libraries we don't support: plotly.js-dist-min").

**Two render modes, automatic degradation:**
1. `tiles` (default) — `<iframe srcDoc={LEAFLET_HTML(points)}>`: OSM raster basemap, Leaflet zoom/pan/markers/popups.
2. `vector` (fallback, **mandatory**) — a lightweight, self-contained equirectangular SVG (graticule + continent labels + points), zero network. Tile loading is observed but **not guaranteed** across sandbox/CSP versions, so the fallback is never optional.

**Fallback trigger (mandatory):** the iframe posts `tilesOk` on first tile; switch `tiles → vector` when it posts `tilesFailed` / `leafletMissing` / `tilesTimeout` (Leaflet `tileerror`, missing `L`, or no `tileload` within ~4.5 s). Never leave a blank/grey map.

**Data-driven points:** `points: [{ id, name, lat, lng, primary?, size?, kind?, meaning? }]`. Asset → `primary:true` (blue ~9px); comparators → slate (~7px); `size` may encode a count (collection). `lat/lng` may be null → skip that point. Adding sites = editing the array, not the code.

**Auto-fit (critical pitfall):** fit with Leaflet `fitBounds(latlngs, {maxZoom:12})` (tiles) or, in the vector fallback, **linear lon/lat math with a minimum-span floor (~3.5°×2.2°)**. **Never** fit through a hand-built `Polygon` bbox / `d3.geoBounds` — a ring's winding direction can read a small box as "the whole globe minus the box", collapsing all points to one pixel. A single point must not infinite-zoom.

**Coordinate-source indicator (mandatory):** below the map show `📍 Coordinates: explicit | inferred | demo | unknown` from `asset.coordinateSource`. All-null coordinates → placeholder card "📍 Location not specified in source material"; render neither mode.

**Cross-referencing via `postMessage`:** map→host on marker click `{source:'cbsa-map', type:'markerClick', id}` → host sets `highlight` and the Comparative tab highlights that card. host→map on highlight `{source:'cbsa-host', type:'highlight', id}` → opens/centres that marker; on `{type:'filter', ids}` → dims non-matching markers (collection). The vector fallback does the same selection/dimming via React state.

**Container:** `height: min(440px,60vh); border-radius:10px; border:1px solid #e2e8f0`. Host owns the card / guide-box / coord line; the iframe fills the map area only. RTL: host card per [CA-HE]; the Leaflet island stays LTR internally (correct for maps).

**Reference component — copy this VERBATIM into the artifact; change ONLY the `points` data (do NOT regenerate it — the template-literal escaping, `postMessage` bridge, and fit logic are easy to break).** Emit `MapTab` + `LEAFLET_HTML` + the `VectorMap` fallback:

```jsx
import { useState, useEffect, useRef, useMemo } from 'react';

// PRIMARY: self-contained Leaflet doc for the iframe srcDoc.
const LEAFLET_HTML = (P) => `<!doctype html><html><head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
<style>html,body,#m{margin:0;height:100%}</style></head><body><div id="m"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<script>(function(){
  var P=${JSON.stringify(P)};
  var post=function(o){parent.postMessage(Object.assign({source:'cbsa-map'},o),'*')};
  if(typeof L==='undefined'){post({type:'leafletMissing'});return;}
  var map=L.map('m'),got=0,marks={};
  var t=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'});
  t.on('tileload',function(){got++;if(got===1)post({type:'tilesOk'})});
  t.on('tileerror',function(){post({type:'tilesFailed'})}); t.addTo(map);
  P.forEach(function(p){ if(p.lat==null||p.lng==null)return;
    marks[p.id]=L.circleMarker([p.lat,p.lng],{radius:p.primary?9:(p.size||7),color:'#fff',weight:2,
      fillColor:p.primary?'#2563eb':'#94a3b8',fillOpacity:1}).addTo(map)
      .bindPopup('<b>'+p.name+'</b>'+(p.meaning?'<br>'+p.meaning:''))
      .on('click',function(){post({type:'markerClick',id:p.id})}); });
  var ll=P.filter(function(p){return p.lat!=null&&p.lng!=null}).map(function(p){return [p.lat,p.lng]});
  if(ll.length){map.fitBounds(ll,{padding:[40,40],maxZoom:12})}else{map.setView([20,0],2)}
  window.addEventListener('message',function(e){var d=e.data||{};if(d.source!=='cbsa-host')return;
    if(d.type==='highlight'&&marks[d.id]){marks[d.id].openPopup();map.panTo(marks[d.id].getLatLng())}
    if(d.type==='filter'){Object.keys(marks).forEach(function(id){var on=!d.ids||d.ids.indexOf(id)>=0;marks[id].setStyle({fillOpacity:on?1:0.2});});}});
  setTimeout(function(){if(got===0)post({type:'tilesTimeout'})},4500);
})();<\/script></body></html>`;

function MapTab({ points, highlight, onSelect, filterIds }) {
  const [mode, setMode] = useState('tiles');
  const frameRef = useRef(null);
  const srcDoc = useMemo(() => LEAFLET_HTML(points), [points]);
  useEffect(() => {                                  // map -> host
    function onMsg(e){ const d=e.data||{}; if(d.source!=='cbsa-map')return;
      if(d.type==='markerClick') onSelect?.(d.id);
      if(['tilesFailed','leafletMissing','tilesTimeout'].includes(d.type)) setMode('vector'); }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [onSelect]);
  useEffect(() => { if(mode!=='tiles')return;        // host -> map
    frameRef.current?.contentWindow?.postMessage({source:'cbsa-host',type:'highlight',id:highlight??null},'*'); }, [highlight, mode]);
  useEffect(() => { if(mode!=='tiles')return;
    frameRef.current?.contentWindow?.postMessage({source:'cbsa-host',type:'filter',ids:filterIds??null},'*'); }, [filterIds, mode]);
  if(mode==='vector') return <VectorMap points={points} highlight={highlight} onSelect={onSelect} filterIds={filterIds} />;
  return <iframe ref={frameRef} title="map" sandbox="allow-scripts" srcDoc={srcDoc}
    style={{width:'100%',height:'min(440px,60vh)',border:'1px solid #e2e8f0',borderRadius:10,background:'#eef2f7'}} />;
}

// FALLBACK: lightweight equirectangular SVG — no network, no GeoJSON. (Tiles work in current
// clients, so this is a safety net.) To upgrade later, swap for d3.geoMercator + inlined GeoJSON.
const CONTINENTS=[{n:'N. America',lat:45,lng:-100},{n:'S. America',lat:-12,lng:-58},{n:'Europe',lat:50,lng:14},{n:'Africa',lat:3,lng:21},{n:'Asia',lat:46,lng:90},{n:'Oceania',lat:-25,lng:134}];
function VectorMap({ points, highlight, onSelect, filterIds }) {
  const W=720,H=360, pts=(points||[]).filter(p=>p.lat!=null&&p.lng!=null);
  const fit=useMemo(()=>{ if(!pts.length)return{aLng:-180,bLng:180,aLat:-90,bLat:90};
    const lngs=pts.map(p=>p.lng),lats=pts.map(p=>p.lat);
    const cX=(Math.min(...lngs)+Math.max(...lngs))/2, cY=(Math.min(...lats)+Math.max(...lats))/2;
    const sX=Math.max(Math.max(...lngs)-Math.min(...lngs),3.5)*1.35, sY=Math.max(Math.max(...lats)-Math.min(...lats),2.2)*1.35;
    return{aLng:cX-sX/2,bLng:cX+sX/2,aLat:cY-sY/2,bLat:cY+sY/2}; },[pts]);
  const X=lng=>((lng-fit.aLng)/(fit.bLng-fit.aLng))*W, Y=lat=>((fit.bLat-lat)/(fit.bLat-fit.aLat))*H;
  const inView=(lat,lng)=>lng>=fit.aLng&&lng<=fit.bLng&&lat>=fit.aLat&&lat<=fit.bLat;
  const gx=[],gy=[]; for(let g=Math.ceil(fit.aLng/10)*10;g<=fit.bLng;g+=10)gx.push(g); for(let g=Math.ceil(fit.aLat/10)*10;g<=fit.bLat;g+=10)gy.push(g);
  return (<div>
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:'min(440px,60vh)',borderRadius:10,border:'1px solid #e2e8f0',background:'#eef2f7',display:'block'}}>
      {gx.map(g=><line key={'x'+g} x1={X(g)} y1={0} x2={X(g)} y2={H} stroke="#dbe3ee"/>)}
      {gy.map(g=><line key={'y'+g} x1={0} y1={Y(g)} x2={W} y2={Y(g)} stroke="#dbe3ee"/>)}
      {CONTINENTS.filter(c=>inView(c.lat,c.lng)).map(c=><text key={c.n} x={X(c.lng)} y={Y(c.lat)} fontSize={13} fill="#aab6c6" textAnchor="middle">{c.n}</text>)}
      {pts.map(p=>{ const on=!filterIds||filterIds.includes(p.id), sel=highlight===p.id, r=p.primary?8:(p.size||6);
        return (<g key={p.id} style={{cursor:'pointer',opacity:on?1:0.25}} onClick={()=>onSelect?.(p.id)}>
          {sel&&<circle cx={X(p.lng)} cy={Y(p.lat)} r={r+5} fill="none" stroke="#2563eb" strokeWidth={2}/>}
          <circle cx={X(p.lng)} cy={Y(p.lat)} r={r} fill={p.primary?'#2563eb':'#94a3b8'} stroke="#fff" strokeWidth={2}><title>{p.name}</title></circle>
        </g>); })}
    </svg>
    <div style={{fontSize:12,color:'#94a3b8',marginTop:6}}>🗺️ Offline fallback map (tiles unavailable here) — points by coordinate.</div>
  </div>);
}
```

### 4b. Themes Tab Spec (conditional)

**Condition**: Render only if ≥2 themes total across `valueThemes`, `contextThemes`, and `threatThemes`.

**Layout**: Sub-tab switcher (pill buttons): "Value Themes" / "Context Themes" / "Threat Themes" with count badges. Hide a sub-tab if 0 themes in that category.

**Theme card**:
```
┌─────────────────────────────────────────┐
│ ● Theme Label                    3 items│
│ One-sentence description                │
│ [Value A] [Value B] [Value C]           │
└─────────────────────────────────────────┘
```
- Colored dot matches `theme.color`.
- Member pills are clickable → navigate to the item's home tab (Values or Contexts) with highlight.
- Cards are always expanded (not collapsible).

**Threat Themes** additionally: mini heatmap row showing the vulnerability cells that define the threat pattern (red/amber/neutral from Vulnerability tab palette).

**Theme derivation rules** (instructions for the AI generating the data):
- Group values sharing overlapping contexts or co-occurring in the attribute table.
- Group contexts by temporal overlap or causal relationship.
- Group vulnerability cells by shared high-impact patterns.
- ≥2 members per theme. Label with short noun phrase.
- Include 1-sentence rationale in `description`.

**Integration into existing tabs**:
- Values tab: add a "Thematic Grouping" callout showing theme membership with link to Themes tab.
- Contexts tab: same callout.
- Vulnerability tab: summary row noting identified threat clusters.

### 4c. Report Tab Spec [CA-RPT]

**Condition**: Always generate. Position: after Process, before KG.

**Content philosophy**: LIM — optimal, not minimal. Every section earns its place. Bot decides which insights are most significant. Same visual theme as dashboard. Meaningful titles, emojis where they aid scanning. Conciser if long — condense, don't truncate.

**Core sections** (always present):

| # | Section | Content | Source |
|---|---------|---------|--------|
| 1 | **Asset Header** | Name, location, period, type badge | Overview |
| 2 | **📋 Assessment Overview** | One-paragraph synthesis: what + why it matters | Overview + Significance |
| 3 | **💎 Key Values** | Top cultural values, category pill + evidence indicator (〰️/💭) | Values |
| 4 | **🏛️ Integrity Snapshot** | Condition summary, Nara aspect → rating compact grid | Integrity |
| 5 | **✨ Significance Statement** | Formal statement from Stage 5, featured block | Significance |
| 6 | **📐 Process & Methodology** | Stages completed, sources, evidence coverage, notation | Process |

**Bot-decided sections** (include only when data warrants — max 2 of 3):

| Section | When | Content |
|---------|------|---------|
| **🔗 Context Effects** | Significant bidirectional relationships emerged | Most impactful context↔value effects + connected planning recommendations (if in source) |
| **⚡ Priority Insights** | Surprising or high-priority findings | Key discoveries, emerging patterns, urgent recommendations |
| **🗺️ Comparative Position** | Comparative analysis produced meaningful distinctions | Regional/typological positioning, key differentiators |

**Session sections** (from conversation):

| Section | When | Content |
|---------|------|---------|
| **💬 Session Analytics** | Always | Turns count, stages covered, depth, key decisions. 3-5 bullets. |
| **💡 User Reflections** | User gave reflections during HITL pauses | Key quotes/themes. Omit if none. |

**Layout**: Single column, max-width 720px, centered. Same card system as other tabs.

**Export (chat-delivered)**: in-artifact file download and `window.print()` are blocked in the React-artifact sandbox. The Report tab renders its content on-screen; for a file, show a single note in the tab header — "📥 Ask in chat to export this report as a formatted Word/PDF document." The bot generates the document in the conversation, not from inside the artifact. *(A future in-artifact print/export component is tracked in `../design/specs/future-features.md`.)*

**Target length**: 800-1200 words, fitting 1-2 A4 pages.

### 5. Cross-Referencing (mandatory)

The dashboard must implement a shared selection state:

- **Clicking a context** → highlights its related values in the Values tab.
- **Clicking a value** → highlights matching contexts and integrity aspects.
- **Clicking a comparator** (on Map) → highlights its card in the Comparative tab.
- **Clicking a theme member pill** → highlights the specific item in its home tab (Values or Contexts).
- **Clicking a theme card** → highlights all members in their home tabs.
- **Clicking a comparator name** in Comparative tab → highlights on Map (if Map tab exists).
- **Navigating between tabs** preserves the active highlight.
- **Visible indicator** (banner) shows what is currently highlighted, with a Clear action.
- **Back pill**: After any cross-tab highlight jump, show "← Back to [previous tab]" pill. Hide when user navigates manually via tab bar.

Implementation: a top-level `highlight` variable (`{ type: 'value'|'context'|'comparator'|'theme', id: string } | null`) checked by each tab renderer.

### 6. Theme and Readability (mandatory)

**Light theme throughout**: All tabs use the same light palette.

**Light palette** (all tabs):
```
Background: #f8fafc → cards: #ffffff → borders: #e2e8f0
Text: #1e293b → dim: #64748b → muted: #94a3b8
Accent: #2563eb — or site-appropriate
```

**Minimum readability requirements**:
- Body text: ≥ 0.84rem, contrast ratio ≥ 4.5:1
- Section labels / uppercase micro-labels: ≥ 0.72rem
- Pills and badges: ≥ 0.66rem
- KG edge labels: ≥ 10px, contrast ratio ≥ 3:1
- KG node labels: include text-shadow or halo for legibility against light background
- **No text below 0.62rem anywhere**

### 7. Guide Boxes (mandatory — every tab)

Every tab includes a collapsible guide box at the top. **Structure / behavior / styling: see [CA-DB-F] → Guide Boxes** (3 zones — "What you see" / "How to interact" / "What to look for"; React-state collapse, default expanded; amber `#fef3c7` callout with `border-left: 3px solid #f59e0b`).

**Content must be tab-specific** — no generic descriptions. Guide content per tab:
- **Overview**: "KPIs summarize scope; integrity range shows condition at a glance; gaps flag what's missing."
- **Map**: "Asset and comparator locations on a region map. Click a point for details. Coordinate-source note appears below the map."
- **Timeline**: "Events spaced proportionally by year. Color = type of change. Look for clusters of rapid change."
- **Contexts**: "Click a context to highlight related values. Pill links jump to Values tab."
- **Values**: "Evidence markers (〰️/💭) show traceability. Attribute table below shows what sustains each value."
- **Themes**: "Values and contexts grouped by narrative thread. Click members to navigate."
- **Integrity**: "Left border color = integrity rating. Green = high, red = low. Summary links all aspects."
- **Comparative**: "Each site rated on rarity/documentation/condition. Colors match rating."
- **Significance**: "The synthesized statement from Stage 5."
- **Vulnerability**: "Red = high impact if that integrity aspect is lost. Look for columns with concentrated red."
- **Process**: "Strengths, gaps, and quick wins. Action items for next steps."
- **KG**: "Force-directed graph. Drag nodes, scroll to zoom, click for connections."

### 8. Navigation (mandatory)

- **Active tab in React state**: `const [activeTab, setActiveTab] = useState('overview')` is the single source of truth. There is no URL/history in the artifact — do not use `location.hash`, `history.pushState`, or `popstate` (blocked in the sandbox).
- **Back pill**: After cross-tab jumps (e.g., click comparator on Map → Comparative tab), track the previous tab in state and show a "← Back to Map" pill. Hide when the user navigates manually via the tab bar.
- **All tabs switchable and all cross-references working** entirely from React state.

### 9. KG Node Interaction

When a user clicks a KG node, display a **floating popover** adjacent to the clicked node:

- Position: prefer right of node; flip left near container edge; clamp vertically within SVG bounds.
- Content: node name (≥1rem, bold), type badge, meaning (≥0.88rem), connections list with directional arrows and verb labels.
- Connection items: styled as mini-cards (background + border), colored verb labels, white entity names.
- Animate entrance: scale+fade, ≤200ms.
- Dismiss on: close button, background click, or clicking another node.
- **Never require scrolling** to read node info — all content visible within the graph viewport.

### 10. Final Checklist

1. Only include data from the conversation — never fabricate.
2. If a stage was not completed, show as incomplete and mark "Not completed" in its tab.
3. Evidence markers (〰️/💭) match Stage 2 notation, consistent across all value-referencing tabs.
4. Vulnerability tab only if data exists.
5. Replace `__DATA__` / `__ASSET_NAME__` placeholders with extracted content.
6. **All CBSA stages (1–6) have dedicated tabs** — no merged stages.
7. **Attribute-Value-Implication table** present in Values tab.
8. **Cross-referencing** functional: at least Context↔Value linking; back pill after highlight jumps.
9. **Readability**: no text below 0.62rem; no contrast ratio below 3:1.
10. **Nara Grid** stored as structured objects, not parsed strings.
11. **Tech recap** (full rules in [CA-DB-F] / §4a / §9a — do not re-derive): native React, no Plotly; Map = iframe-Leaflet + **mandatory** d3/SVG fallback + `fitBounds`/linear auto-fit (never a Polygon bbox); **live** AI Query with copy-to-chat fallback; inline data; no storage / no in-artifact download.

### 9a. AI Query Tab `[CA-AIQ]` (Live via `window.claude.complete`)

The AI Query tab runs **live** on Claude: it calls `window.claude.complete` (no API key, billed to the viewer) with the dashboard data embedded in the prompt, so the user gets a grounded answer without leaving the artifact. This is the one AI-Query capability GPT/Gemini cannot offer.

**Starter prompts** (Single Dashboard):
1. "Summarize the significance of this asset"
2. "What are the main gaps in this assessment?"
3. "How do values connect to contexts?"
4. "What does the integrity assessment reveal?"
5. "How does this asset compare to its comparators?"

**UI elements**: chat-style message area with the 5 starter-prompt cards and a free-text box. On submit (card click or typed question), run a live completion:

```jsx
async function ask(question) {
  setLoading(true); setAnswer('');
  const prompt =
    `You are analysing a CBSA heritage Assessment Dashboard. Answer ONLY from the data below, concisely (≤150 words). ` +
    `If the data does not support an answer, say so.\n\nDASHBOARD DATA (JSON):\n${JSON.stringify(DASHBOARD_DATA)}\n\nQUESTION: ${question}`;
  try { setAnswer(await window.claude.complete(prompt)); }
  catch (e) { setFallback(question); }      // graceful fallback, below
  finally { setLoading(false); }
}
```

- **Loading state**: spinner / "Thinking…" while pending; render the answer in a card with the question echoed above it.
- **Graceful fallback (mandatory)**: guard with `typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function'`. If unavailable or the call throws, show the copy-to-chat affordance instead: "💬 Copy this question to the chat for an answer based on the full assessment context." + a copy-to-clipboard button.

---

**Export Offer (mandatory)**:
After generating the Dashboard, always offer:
> "Would you like me to export this assessment as a formatted Word document?"

### Reference Implementation (if available)

The Ayelet HaShachar water tower assessment dashboard (`Single-Dashboard-example.html`) shows the intended **visual design and structure**: light theme throughout, all 10 tabs, cross-referencing with shared highlight state, structured Nara Grid, per-comparator cards, vulnerability matrix, proportional timeline with change types, and floating KG popover. Use it as a **visual/structural reference for the look and tab set** — it is HTML, so reproduce its design in the React artifact; do not copy its vanilla-JS code or treat it as a locked template.
---

## [CA-DB-C] Collection Dashboard — MA-RC Integration

> **Scope**: Collection-level visualization (multiple sites from MA-RC analysis). For single-assessment dashboards (one site, one CBSA process), see [CA-DB] above. Both share the UX foundation ([CA-DB-F]) but have different data shapes, tab structures, and visual palettes. Collection: Inter + stone/amber palette.
>
> **Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `CA-EC in cbsa-core.md`, AI Query follows `[CA-AIQ]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

### 1. Trigger and Offer

- Offer after at least one MA-RC Step 3 analysis: "Would you like a visual dashboard for this collection?"
- Also generate on direct request ("dashboard", "collection dashboard", "visualize").
- Execute only on acceptance — do not auto-generate.
- Respond **only** with the artifact (no surrounding prose).
- **Format**: a **native React artifact** (recharts for charts, the shared iframe-Leaflet Map component with d3/SVG fallback for the map — [CA-DB] §4a, `lucide-react` icons — per [CA-DB-F]). No self-contained HTML, no CDN, no vanilla-JS, no Plotly.

### 2. Data Extraction

Re-read MA-RC Step 2 extraction output and build a per-site JSON record:

| Step 2 field | Dashboard field(s) | Notes |
|---|---|---|
| Name | `name` | Short display name |
| Location | `country`, `lat`, `lng` | Parse coordinates if available; `lat`/`lng` = `null` if not |
| Type | `type`, `typeCategory` | Category: landscape / single / ensemble / urban |
| Period | `period`, `periodCategory` | Category: prehistoric / ancient / medieval / modern / multiperiod |
| Site description | `description` | 1–2 sentences |
| Significance summary | `significanceSummary`, `highlight` | `highlight` = one-sentence collection-level insight **(MANDATORY — must be non-empty for every site)** |
| Values identified | `values: { [type]: "e"/"i"/"a" }` | Map to 8 categories: Historical, Scientific, Landscape, Community, Intangible, Architectural, Nature, Educational. `e` = explicit, `i` = implied, `a` = absent |
| Integrity / Authenticity | `integrity`, `integrityNote` | Level: high / good / variable / unknown |
| Threats | `threats[]` | Array of threat category IDs |
| Assessment method | `method`, `methodType` | methodType: qual_legal / criteria_list / quant_score / categorical_ranking / cbsa / other |
| Comparative references | `comparativeBasis`, `claimScope` | claimScope: local / regional / national / international |

Also derive from Collection Reading and analyses (if available):
- `significancePremises[]` — basis of significance argument (uniqueness, archive, completeness, community, assessment_impact, cultural_landscape)
- `managementClusters[]` — grouping labels from Classify step, if run
- `themes[]` — **MANDATORY**. Array of theme objects: `{ id, label, description, sites: [siteId], evidence: { siteId: "text" } }`. Always generate from MA-RC analysis. Minimum: group sites by overlapping value patterns.
- `tabs[]` — dynamic tabs from MA-RC Step 3 analysis results. Schema: `{ id, label, icon, type, data }`. Supported types: table, cards, matrix, prose, custom.

### 3. Tab Structure (4 fixed + dynamic)

**Fixed tabs** (always present):

| # | Tab | Content | Key features |
|---|-----|---------|-------------|
| 1 | **Overview** | KPI cards (N sites, N countries, time span, N methods) + 4 distribution charts. KPI numeric values use monospace font. | Always first tab. Orients the user. |
| 2 | **Map** | Shared iframe-Leaflet Map component (§4a); marker size by explicit-value count | Filter buttons per value type **dim non-matching markers in both modes** (host→iframe `filter` message; React state in vector fallback). Click a marker → details panel with significance summary + highlight. |
| 3 | **Values** | Matrix: sites × value types, evidence markers (〰️/💭). Below: value specification panel. | Sortable columns. Sticky first column. Footer counts. Click site name → expand panel. |
| 4 | **Themes** | Thematic clusters across the collection **(MANDATORY)** | Always generate. Theme cards with colored dot, label, description, clickable site member pills, per-site evidence text. |

**Dynamic tabs** (from `data.tabs[]` — include MA-RC Step 3 analysis results):

Add analysis results the user requested. Supported types: table, cards, matrix, prose, custom. Common dynamic tabs:
- **Arguments** — significance premises table (type: `table`)
- **Gaps** — traffic-light completeness matrix (type: `matrix`)
- **Cross-Tabs** — distribution charts (type: `custom`)
- **Clusters** — management grouping cards (type: `cards`)
- **AI Query** — implements the [CA-AIQ] contract **live** via `window.claude.complete` (no API key; see §9)

In `tabs[]` data, use exact `site.name` values when referencing sites — enables cross-tab navigation.

### 4. Mandatory Rules

- **Overview first.** Tab index 0.
- **Cross-tab site linking.** All site names in all tabs must be clickable → navigate to Map popup or Values row. No orphaned names.
- **No silent truncation.** Charts must show all data categories. If >8 categories, use "Other" bucket with tooltip listing constituents.
- **Guide boxes.** Each tab gets a collapsible guide box (see [CA-DB-F] foundation rules).
- **Collection metadata in header.** Show: collection name/source, N items, Depth indicator, generation date.
- **Cross-tab site navigation.** Shared `navigateToSite(siteId)` function. Site name clicked in Values → show value panel; in other tabs → switch to Map + open popup.
- **Map filters must filter.** Value filter buttons must dim or hide non-matching markers — not just toggle visual state.
- **Gap data derived from extraction.** Use `⚠ not stated` / `—` markers to determine green/yellow/red. Never hardcode per-site overrides.
- All [CA-DB-F] foundation rules apply (native React imports, inline data, React-state navigation/guide-boxes, no storage).

### 5. Visual Language — Design Tokens

**Libraries** (imported directly — provided in the React-artifact set):
- **Map** = the shared iframe-Leaflet `MapTab` component (cdnjs Leaflet + OSM tiles in an `<iframe srcDoc>`) with the d3/SVG vector fallback. See [CA-DB] §4a. Not an imported lib.
- `recharts` for the distribution charts (Chart.js optional)
- `lucide-react` for icons. No CDN `import`s for the React code (the Leaflet cdnjs tags live only inside the iframe `srcDoc`).

#### 5a. Design Intent

- **Palette**: Stone/amber (stone-50 `#fafaf9` through stone-900 `#1c1917`, amber-100 `#fef3c7` through amber-700 `#b45309`)
- **Typography**: Inter (sans), JetBrains Mono (mono), 13px base
- **Layout**: Max-width 1320px, 12px border-radius, light theme only
- **Components**: Dark header (stone-800), amber-accented guide boxes, compact KPI cards, pastel site tags (unique color per site)
- **Responsive**: 2-column grids collapse to 1-column below 768px. `canvas{max-height:280px}` for Chart.js stability.

See [CA-UX] for cross-platform visual tokens.

#### 5b. Design Rules

- **Cross-tab navigation**: All site tags clickable → navigate to Map popup or Values row. Implement `selectSiteOnMap()`, `goBack()`.
- **Header**: Collection name, N sites, region, depth badge, source, date.
- All [CA-DB-F] foundation rules apply (inline data, React state, no storage, native React).

### 6. Checklist

1. ☐ All site names interactive (link to Map or Values)
2. ☐ Evidence markers (〰️/💭) consistent across all tabs
3. ☐ Charts show all data categories — no `.slice()` truncation
4. ☐ Collection metadata in header (source, depth, N items)
5. ☐ AI Query is live via `window.claude.complete` (with copy-to-chat fallback)

### 9. AI Query Tab `[CA-AIQ]` (Live via `window.claude.complete`)

The AI Query tab runs **live** on Claude: it calls `window.claude.complete` (no API key, billed to the viewer) with the collection data embedded in the prompt — same pattern as [CA-DB] §9a.

**Starter prompts** (Collection Dashboard):
1. "What value patterns are shared across sites?"
2. "How does the geographic distribution look?"
3. "Compare the assessment methodologies used"
4. "Where are the biggest data gaps?"
5. "What management clusters emerge?"

**UI elements**: chat-style message area with the starter-prompt cards and a free-text box. On submit, build a prompt embedding the collection JSON (`COLLECTION_DATA`) and `await window.claude.complete(prompt)`; show a loading state, then the answer. **Graceful fallback (mandatory)**: guard `typeof window !== 'undefined' && window.claude && typeof window.claude.complete === 'function'`; if unavailable or the call throws, show "💬 Copy this question to the chat for an answer based on the full collection context." + a copy-to-clipboard button.

### 7. Dataset Export

After generating the dashboard, offer: "Would you like the extracted collection data as a structured JSON file?"

The JSON should include:
- **Collection metadata**: name, source, depth, date, method
- **Per-site objects**: all extraction fields + analytics dimensions
- **Controlled vocabulary enums**: argument types, evidence bases, value levels (`e`/`i`/`a`), integrity levels
- **Analytics dimensions metadata**: which dimensions are derivable from current data vs. need enrichment

---

**END OF MASTER PROMPT (Claude Version — Hebrew Overlay)**
