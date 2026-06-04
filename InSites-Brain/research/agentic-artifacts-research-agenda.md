# Agentic Artifacts — Research & Development Agenda

**Status:** R&D agenda (forward-looking). **Nothing built yet.** Baseline = `atar-runtime` v0.3.0.
**Provenance:** Written 2026-06 after the Claude mono was re-architected to render the KG and both dashboards through the externalized `atar-runtime` package (D3 + Leaflet), validated in the claude.ai Project (incl. Sonnet). That externalization is the substrate this agenda builds on.
**Scope:** A research project, not a commercial product. This catalogues *candidate* directions for making the InSites artifacts **agentic**, with feasibility grounded in the real runtime seams — so each item is a hypothesis to prototype and study, not a committed roadmap.
**Related artifacts:** [`atar-runtime/`](../Claude/atar-runtime/) · [`data-contract.md`](../Claude/atar-runtime/data-contract.md) · [`src/mount.js`](../Claude/atar-runtime/src/mount.js) · [`src/shared/ai-query.js`](../Claude/atar-runtime/src/shared/ai-query.js) · architecture components A–G in the DevPlan §10–11 (`management/`, local-only — gitignored). Tactical (non-agentic) deferred features live separately in [design/specs/future-features.md](../design/specs/future-features.md).

> **House note.** This is *not* a validated-method doc (cf. [genius-loci-experiential-method.md](./genius-loci-experiential-method.md)) and *not* a workflow spec. It is a research agenda. Each feature is written as: **What it is / Why (research value) / Feasibility & grounded sketch / Dependencies & triggers / Where it would live in code.**

---

## §0 — Framing: what "agentic" means here

"Agentic" in this project means **the artifact (Knowledge Graph, dashboard) becomes a *tool the model can invoke*** — not just a one-shot rendered output. The model passes structured input, the artifact runs *its own code*, and structured results flow back to drive further reasoning. The KG/dashboard stops being a terminal deliverable and becomes a callable instrument inside an assessment loop.

Contrast with **today's** capability — the *live AI Query* tab. That is genuinely useful but strictly **one-way**: the artifact sends a text prompt (the full graph/dashboard JSON + a user question) to `host.complete()` and renders the **text** that comes back. The model never learns what the user selected, never drives the view, and the artifact never returns a structured result a caller could act on.

The gap between those two is the research space. It is bounded by a hard sandbox ceiling (§2): in-artifact reasoning loops are reachable; arbitrary external tools, data, and persistence are not — those require stepping outside the artifact (MCP / web app).

This agenda is academically motivated. The novel object of study is a **reactive, model-drivable heritage-assessment artifact** operating under explicit human-in-the-loop (HITL) — and what that does to the quality, transparency, and pace of Cultural Significance assessment.

---

## §1 — Current baseline (grounded audit of v0.3.0)

The public entry is `mount(container, data, host)` ([src/mount.js](../Claude/atar-runtime/src/mount.js)). Three facts define the agentic starting line:

1. **The `host` is the only bridge, and it is write-only + text-only.** `host` exposes exactly one optional method: `complete(prompt: string) => Promise<string>`. Capability is detected as `env.live = typeof host.complete === 'function'`; without it the UI degrades to copy-to-chat. The call is wrapped in [ai-query.js](../Claude/atar-runtime/src/shared/ai-query.js) `aiQuery(host, prompt, opts)` — a `Promise.race` against a 20 s timeout (never `AbortController`, which throws `DataCloneError` across the artifact boundary), rejecting `{kind:'no-host'}` or `{kind:'timeout'}`. **The response is rendered as `textContent` — there is no structured (JSON) return path.**

2. **Structured input already exists; structured output does not.** [data-contract.md](../Claude/atar-runtime/data-contract.md) defines three typed `DATA` shapes (`kg` | `assessment` | `collection`), normalized through [normalize.js](../Claude/atar-runtime/src/shared/normalize.js) (GPT↔Claude key aliases + derived KPIs). So the artifact receives rich structured data, but emits only pixels and (via AI Query) free text.

3. **Renderers hold rich state but expose none of it.** Each renderer keeps meaningful interaction state locally and never surfaces it:
   - **KG** ([src/renderers/kg.js](../Claude/atar-runtime/src/renderers/kg.js)): `selectedId`, `appliedSearch`, `isolatedType` (type filter), `activeTab`, plus computed adjacency / degree / visible-set / 1-hop neighbors.
   - **Assessment dashboard** ([src/renderers/dashboard.js](../Claude/atar-runtime/src/renderers/dashboard.js)): `state = { activeTab, highlight: {type:'value'|'context', id} | null, mapHandle }`.
   - **Collection dashboard** ([src/renderers/collection.js](../Claude/atar-runtime/src/renderers/collection.js)): `state = { activeTab, depthFilter, expandedSite, mapHandle, pendingFocus }` + computed region/type/period/depth counts.

   There are **no outbound seams** anywhere in the package: no return handle from `mount()`, no callbacks, no `CustomEvent`, no `postMessage` out, no `window.*` exposure. Communication is one-way in (DATA) and one-way out-to-model (text prompt).

**Bottom line:** the substrate is excellent for *displaying* structured heritage data and for *asking the model about it*, but it has zero machinery for (a) telling a caller what the user is doing, (b) returning a structured result, or (c) letting the model drive the view. Those three are the foundations every feature below adds.

---

## §2 — The sandbox ceiling (honest constraints)

These are not solvable by cleverness; they bound what "agentic" can mean inside a Claude artifact:

- **CSP / CDN-only.** Scripts load only from `cdn.jsdelivr.net/npm/` (and cdnjs for some assets). No arbitrary fetch to project servers or third-party APIs. (Cross-platform this fragments: Gemini = cdnjs-only; GPT = alephplace.)
- **No `AbortController`/`AbortSignal`** — `DataCloneError` across the `postMessage` sandbox. Timeouts must use `Promise.race` + `setTimeout`.
- **No persistence** — no `localStorage`/IndexedDB/cookies. All state is ephemeral; a reload is a cold start.
- **The model bridge is a narrow `postMessage` channel** surfaced as `window.claude.complete` (text in → text out). No tool-use API, no streaming structured events, inside the artifact.

**Consequence for agency.** Two tiers are reachable *inside* the artifact: structured I/O and a bounded **model-as-controller reasoning loop** (the model reads data, decides, the artifact reacts). What is **not** reachable inside the artifact: calling external tools, querying live databases, or remembering across sessions. Those require **Component E (MCP)** or **Component F (a dedicated web app)** from the architecture decision space — a deliberate step *outside* the artifact, not an extension of it.

---

## §3 — Feature catalogue

Ordered roughly by dependency. #1–3 are the foundations; #4–6 compose them; #7–8 step beyond the artifact.

### 1. Structured return from the model call
- **What.** Let `aiQuery` optionally request and parse a JSON answer instead of prose — e.g. `{ answer, citations:[nodeId], suggestedAction }`.
- **Why (research value).** The precondition for everything else. A parsed result can drive the view, be logged for analysis, or be validated against the graph (does the cited node exist?). Turns "the model said something" into "the model returned data we can act on and audit."
- **Feasibility & sketch.** Low. Add an opts flag to [ai-query.js](../Claude/atar-runtime/src/shared/ai-query.js): when set, the prompt instructs strict-JSON output and `aiQuery` runs a tolerant parse (strip code fences; `try/catch`; on failure fall back to showing the raw text — never throw). No new dependency, no sandbox issue.
- **Dependencies & triggers.** None. Build first. Trigger: any of #4–8 is wanted.
- **Where.** `src/shared/ai-query.js` (+ per-renderer prompt builders).

### 2. State-read handle (outbound seam)
- **What.** `mount()` returns a handle: `{ getState(), on(event, cb), destroy() }`, where events are `selection`, `highlight`, `filter`, `tab`. `getState()` snapshots the renderer's current selection/filter/visible-set.
- **Why.** Lets a host (the bot's React shell, or a future orchestrator) *observe* what the user is exploring — the basis for "the user is looking at node X; reason about that," for cross-artifact linking (#6), and for interaction logging (#8).
- **Feasibility & sketch.** Low; backward-compatible (existing callers ignore the return value). Each renderer already funnels updates through a single re-render path — emit an event there. Read-only, no sandbox concern. Internal state vars already exist (§1.3).
- **Dependencies & triggers.** None hard. Trigger: model-as-controller (#4) or cross-artifact (#6).
- **Where.** `src/mount.js` (handle plumbing) + the three renderers (emit on update).

### 3. Host-driven mutation (inbound seam)
- **What.** Handle methods that *drive* the artifact: `setSelection(id)`, `setFilter(type)`, `setHighlight({type,id})`, `setTab(id)`, `focusSite(id)`.
- **Why.** The other half of two-way comms: the model (or shell) can steer the view — "highlight the three values most at risk," "focus the map on the comparator site." This is what makes the artifact feel like an instrument the reasoning operates *through*.
- **Feasibility & sketch.** Low. The renderers already mutate these vars on user events; expose the same mutators as handle methods that set state + re-render. Pure closure capture, no sandbox concern.
- **Dependencies & triggers.** Pairs with #2. Trigger: #4.
- **Where.** The three renderers + the `mount()` handle.

### 4. Model-as-controller loop (in-artifact agent)
- **What.** Compose #1+#2+#3: a bounded loop where the model reads `getState()` + `DATA`, returns a structured action (`{action:'highlight', ids:[...], rationale}`), the artifact applies it via the mutators, and optionally iterates a fixed number of steps.
- **Why.** The first genuinely *agentic* behavior the sandbox allows — the model reasons over the heritage data and manipulates the representation, with the human watching and able to interrupt. A concrete research probe for "does a model-steered KG surface significance patterns a static one hides?"
- **Feasibility & sketch.** Medium. No new browser capability — it is a control loop over #1–3 with a hard step cap (no `AbortController`; bound iterations and use `Promise.race` per step). The risk is UX/HITL design (runaway or confusing motion), not platform.
- **Dependencies & triggers.** Requires #1, #2, #3. Trigger: a study question that needs the model to *act on* the view, not just answer about it.
- **Where.** A new `src/shared/controller.js` orchestrating the handle + `aiQuery`.

### 5. Artifact-as-tool contract *(the core vision)*
- **What.** Formalize each artifact as a callable tool with a typed **input** (`DATA` per the contract) and a typed **output** (`{ state, analytics, answer, citations }`). Document it so the bot — or any orchestrator — can treat "render-and-interrogate a KG" as a tool call, analogous to a Claude tool-use schema.
- **Why.** This is the user's central goal: the KG/dashboard as a *tool*, not a leaf output. It reframes the assessment as a pipeline of tool calls (extract → build KG → query KG → build dashboard → interrogate), each step's structured output feeding the next — the foundation for more autonomous Atar.Bot operation.
- **Feasibility & sketch.** Medium, and partly a *specification* deliverable. Inside one Claude artifact the "tool" runs in-process (handle + #1–4). The full vision — the bot programmatically invoking the artifact as a registered tool with schema'd I/O — depends on how Claude exposes artifact↔model tool-use; today the bridge is text-only (§2), so the near-term form is the *contract + in-artifact handle*, with true tool-use registration tracked as it becomes available.
- **Dependencies & triggers.** Builds on #1–4; extends [data-contract.md](../Claude/atar-runtime/data-contract.md) with an **output** contract (it currently specifies input only).
- **Where.** `data-contract.md` (add output schema) + the handle (#2/#3) as the runtime realization.

### 6. Cross-artifact composition
- **What.** One artifact's state feeds another — e.g. selecting a KG node highlights the matching value in the assessment dashboard; selecting a site in the collection map opens its single-assessment view.
- **Why.** Heritage reasoning is inherently cross-representation (a *value* is also a *node* is also a *map pin*). Linking them is where the "new representations" experience component pays off most.
- **Feasibility & sketch.** Medium. Within a single mounted artifact: trivial via #2/#3. Across *separate* Claude artifacts (each its own sandbox): only through the model/shell as a relay — no direct artifact-to-artifact channel exists. Realistic near-term scope = a single composite artifact hosting linked views.
- **Dependencies & triggers.** Requires #2, #3. Trigger: a multi-view study or a combined KG+dashboard artifact.
- **Where.** A composite shell + shared selection bus over the handles.

### 7. Beyond the sandbox — MCP / web app track
- **What.** When agency needs *external* data, tools, or memory: (a) **MCP server** (Component E) exposing CBSA sources/collections the bot can query live; (b) **dedicated web app** (Component F) with a backend, real persistence, and research logging, embedding the same renderers.
- **Why.** The only path past the §2 ceiling. Required for cross-session memory, live source retrieval, and rigorous interaction logging at scale.
- **Feasibility & sketch.** High effort; out of the artifact entirely. The renderers are already vanilla and reusable, so a web app can embed them directly; an MCP server is independent of the runtime. Note the original architecture rubric weighed these (γ/δ configurations).
- **Dependencies & triggers.** Independent of #1–6. Trigger: a research need for persistence/live data that the sandbox structurally cannot meet.
- **Where.** New repos/services, not `atar-runtime` (which they would consume).

### 8. Research-instrumentation angle
- **What.** Treat reactive/agentic artifacts as a **measurement instrument**: log selections, model actions, accept/override decisions, and significance edits (via the #2 event stream), under explicit HITL.
- **Why.** This is the academic payoff. It lets us study questions like: *Does a model-steerable KG change which values assessors notice? How often do experts override model-driven highlights, and on what grounds?* Connects to the existing Session-Report / `[CA-IP]` instrumentation (see [design/specs/Bot-Research-Skiil/](../design/specs/Bot-Research-Skiil/)).
- **Feasibility & sketch.** Low to capture in-artifact (the #2 event stream); the *persistence* of logs needs #7 (sandbox has no storage). In-artifact, logs can be surfaced to the chat for the human to save.
- **Dependencies & triggers.** Reads from #2; durable logging needs #7. Trigger: a paper or study that needs interaction data.
- **Where.** A thin `src/shared/instrument.js` subscriber on the handle; durable sink via #7.

---

## §4 — Feasibility tiers (sequencing)

| Tier | Items | Nature | Effort | Sandbox-safe? |
|------|-------|--------|--------|---------------|
| **1 — Foundations** | #1 structured return, #2 read-handle, #3 mutation | In-artifact, backward-compatible | Low | Yes |
| **2 — Controller / tool** | #4 model-as-controller, #5 artifact-as-tool contract, #6 composition (single artifact) | In-artifact reasoning loop | Medium | Yes |
| **3 — Cross-platform** | #6 across artifacts, `postMessage`-out for GPT/Gemini iframes | Needs the model/iframe-host as relay; **may be CSP-blocked on Claude — test first** | Medium | Partial |
| **4 — Beyond sandbox** | #7 MCP / web app, #8 durable instrumentation | External services | High | N/A (outside) |

Build Tier 1 first; it unblocks everything and ships without breaking current callers.

---

## §5 — Cross-platform implications

- **Engine-agnostic foundations.** #1–3 are plain JS over the existing renderers and the `host` interface — they work on Claude, and conceptually on the Gemini (vanilla D3) and GPT (vis-network → D3 later) builds once those converge on the runtime. They reinforce the convergence goal, not fight it.
- **The relay difference.** Claude's artifact has `host.complete`; GPT/Gemini variants pass `host = {}` (copy-to-chat). `postMessage`-out (Tier 3) is plausible for GPT/Gemini *iframe* embeddings but likely blocked under Claude's artifact CSP — **measure before designing on it.**
- **One contract, three deploys.** The input+output `data-contract.md` is the convergence layer; CDN fragmentation (Claude=jsdelivr, GPT=alephplace, Gemini=cdnjs) remains the deploy reality, unchanged by this agenda.

---

## §6 — Open research questions (for papers)

- Does a **model-steerable** KG/dashboard change *which* cultural values assessors attend to, versus a static one? (Component 4 — "new representations" — made measurable.)
- Under HITL, how often, and on what grounds, do experts **override** model-driven highlights or filters? (Trust calibration in heritage assessment.)
- Does **artifact-as-tool** pipelining (extract → KG → interrogate → dashboard) improve traceability of a Significance Statement back to evidence, relative to prose-only flow?
- What is the **failure profile** of structured returns (#1) — how often does the model cite non-existent nodes, and does in-artifact validation catch it? (A concrete, auditable hallucination probe.)
- Where is the line at which a task genuinely needs to leave the sandbox (#7) rather than be solved in-artifact — and what does that cost in transparency/logging?

These extend the InSites line on evidence-based, transparent assessment; the interaction logs (#8) are the empirical backbone.

---

## §7 — Triggers to revisit / dependencies

- **Build Tier 1 (#1–3)** whenever any agentic behavior is wanted — it is the cheap, safe prerequisite for all of #4–8.
- **Re-open Tier 3** only after an empirical `postMessage` CSP test on Claude artifacts.
- **Escalate to Tier 4 (#7)** only when a study/feature *structurally* needs external data, live tools, or cross-session memory — not before; the sandbox covers more than it first appears.
- **Platform watch:** if/when Claude exposes a richer artifact↔model tool-use API (beyond text `complete`), revisit #5 to register the artifact as a first-class tool with schema'd I/O.
- **Keep aligned with** [data-contract.md](../Claude/atar-runtime/data-contract.md) (add the output schema there, single source of truth) and the A–G component framing in the DevPlan.
