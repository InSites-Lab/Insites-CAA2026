# Atar Runtime — Externalization Plan

> **Status: PLAN ONLY. Nothing built.** This folder holds the design for a new, self-contained system: a single artifact-rendering **runtime** published to **npm**, loaded by Claude artifacts from `cdn.jsdelivr.net/npm`, so the heavy artifact code stops being re-sent inside every bot prompt.
>
> **Decisions taken (owner, this round):**
> - **Architecture = Option B** — one **unified vanilla-JS runtime**, evolved from the existing GPT runtime (`GPTs/runtime/*.js`).
> - **Home = inside the Claude work** — `InSites-Brain/Claude/atar-runtime/` (this folder).
> - **Do NOT touch GPT / Gemini yet** — they keep loading their runtime from `alephplace.com`, unchanged. This phase is Claude-only; convergence comes later.
> - **No build yet** — clarifying the npm mechanics first (see §6). Phase 0 and the pilot are not greenlit.
>
> What already exists (NOT this system): the CSP probe `InSites-Brain/Claude/tests/external-runtime-csp-test.jsx` and the finding write-up `InSites-Brain/design/specs/future-features.md` §2.

---

## 1. Why — the lever and the green light

Under claude.ai **full-injection** (every Project Knowledge char is re-sent every turn — see memory `project_claude_ai_full_injection`), the single biggest instruction-side cost in the Claude mono is **~40K chars (~27%) of embedded artifact code** (KG, Dashboard, Collection-Dashboard components, the iframe-Leaflet Map, the AI-Query handlers). That code is re-sent on turn 1 and on turn 16 alike.

GPT and Gemini already avoid this: their bots emit a short **HTML shell + data JSON**, and a **vanilla-JS runtime** hosted on `alephplace.com/atar.bot/canvas/` does the rendering. Claude could not do this because its artifact CSP was unknown.

**Now measured (3 runs of the CSP probe):** a Claude artifact CAN load an external `<script src>`, but only from a CSP-whitelisted path — `cdn.jsdelivr.net/npm/` (any npm package) works; `/gh/`, `unpkg`, and our own `alephplace.com` are blocked. → **Publish the runtime to npm; Claude loads it from `cdn.jsdelivr.net/npm/<pkg>@<ver>/...`.** (Detail: `future-features.md` §2; memory `reference_claude_artifact_csp`.)

---

## 2. The core idea

```
BEFORE (Claude today)                  AFTER (this system)
─────────────────────                  ───────────────────
Bot prompt carries the FULL            Bot prompt carries a SHORT shell
component (~30K each turn)         →    + the data JSON. The heavy render
                                       code lives in an npm runtime,
                                       loaded from cdn.jsdelivr.net/npm.
```

The bot's job shrinks from *"emit this 600-line component"* to *"emit this ~20-line shell and this data object."* Render logic is authored, versioned, and maintained **once**, outside every prompt.

---

## 3. Architecture — Option B (DECIDED)

**One unified vanilla-JS runtime for all platforms**, seeded by the existing GPT runtime. For this Claude-only phase:
- **Claude** — a **minimal React artifact shell** (kept only so `window.claude.complete` stays in scope) loads the runtime from `cdn.jsdelivr.net/npm/...`, mounts it into a `<div>`, and hands it `window.claude.complete`.
- **GPT / Gemini** — unchanged this phase (still load from alephplace). Convergence onto the same npm runtime is a later, separate step.
- **Live AI Query preserved** via a capability check inside the runtime: `if (host.complete) { live } else { copy-to-chat }`. Claude lights up the live path.

**Phase-0 gate (the one fact to verify before building):** does `window.claude.complete` remain callable from a script **loaded at runtime** into a Claude artifact? Same-context script append → expected yes; **verify with a tiny probe** (like the CSP test) before committing. If it isn't reachable, the thin-React-shell wrapper still covers it.

---

## 4. Folder structure (this system, inside Claude)

Home: **`InSites-Brain/Claude/atar-runtime/`**. Created now: only this `PLAN.md`.

```
InSites-Brain/Claude/atar-runtime/
  PLAN.md                  ← this file (the only thing that exists now)
  package.json             ← name, version, build scripts (the npm package manifest)
  src/                     ← THE SINGLE SOURCE OF TRUTH for the runtime
    index.js               ← entry: exports mount(container, data, host)
    kg.js                  ← Knowledge-Graph renderer
    dashboard.js           ← single-assessment dashboard
    collection.js          ← collection dashboard
    map.js                 ← iframe-Leaflet map + d3/SVG vector fallback
    ai-query.js            ← live-or-fallback AI Query (capability check on host.complete)
    rtl.js, theme.js       ← shared helpers (RTL detect, [CA-EC] colors)
    styles.css
  dist/                    ← built UMD bundle (what npm publishes / jsdelivr serves)
    atar-runtime.umd.js
    atar-runtime.css
  shells/
    claude-shell.jsx       ← the minimal React shell that goes INTO the Claude prompt
  data-contract.md         ← the JSON shape the bot must emit (single source of truth)
  README.md                ← build / publish / version-pin / re-test instructions
```

`src/` is the single source. The build emits `dist/`; **the same `dist/` file is what later also goes to alephplace** for GPT/Gemini (one source → two hosts), when that phase comes.

---

## 5. The runtime — contract

- **Single entry point:** `AtarRuntime.mount(container, data, host)` where
  - `container` = a DOM node to render into,
  - `data` = the assessment / collection / KG JSON (shape in `data-contract.md`),
  - `host` = `{ complete?: (prompt)=>Promise<string> }` — Claude passes `window.claude.complete`; absence → fallback path.
- **Capability check, not platform check:** the runtime asks "is `host.complete` a function?", never "am I on Claude?". Platform-agnostic, future-proof.
- **No bundled React** (Option B is vanilla — renders straight to DOM). **No secrets** — pure render code, safe to publish publicly.
- **Map** stays an `<iframe srcDoc>` loading Leaflet from **cdnjs** (whitelisted everywhere) with the **mandatory d3/SVG vector fallback** — unchanged from today.

---

## 6. npm publishing — how it works, and why not alephplace

**Is this standard / acceptable?** Yes, completely. Loading a library via `cdn.jsdelivr.net/npm/...` is one of the most common patterns on the web; publishing a small public render library to npm is routine open-source practice. **Free**, no commercial strings. The package is public, but it is **render code only — no secrets** (the GPT runtime is already public on alephplace). No privacy or commercial issue.

**How to publish (≈10 min, repeatable):**
1. Free account at npmjs.com → `npm login`.
2. This folder gets a `package.json` (name + version + `files`) and the built `dist/atar-runtime.umd.js`.
3. `npm publish --access public`.
4. jsdelivr **auto-mirrors** it within minutes — no separate CDN upload — at `https://cdn.jsdelivr.net/npm/<name>@<version>/dist/atar-runtime.umd.js`.
5. **Update** = bump `version` in `package.json` → `npm publish` again → update the pinned URL in `shells/claude-shell.jsx`.

**Can the npm package just "link to" alephplace instead of holding the code?** **No.** Claude's CSP blocks `alephplace.com` regardless of who initiates the load — a jsdelivr-served file that then tries to pull code from alephplace (via injected `<script>`, `fetch`, or `eval`) hits the **same wall** (alephplace isn't whitelisted; cross-origin `fetch`/XHR is also blocked in the artifact sandbox). **The actual code bytes must be served by a whitelisted host = npm/jsdelivr.** There is no proxy shortcut.

**But you do NOT maintain two copies.** Keep ONE source in `src/`; the deploy fans it out:
- `npm publish` → serves Claude (via jsdelivr/npm),
- the existing WinSCP upload of `dist/` → serves GPT/Gemini (via alephplace), when that later phase comes.

Same file, two hosts, one source of truth.

**Version pinning is mandatory:** always `@1.2.0`, **never** `@latest` (jsdelivr caches aggressively; a moving tag = uncontrolled changes mid-session). Re-run `external-runtime-csp-test.jsx` after any Claude policy change before relying on load success.

---

## 7. Bot-prompt changes (what shrinks)

For each of the three Claude artifacts, the prompt section drops from a full component to:
1. a **shell template** (`shells/claude-shell.jsx`, ~15–25 lines) that loads the pinned runtime URL and calls `mount(...)`, and
2. a pointer to the **data contract** (much of which the bot already builds internally).

The `[CA-KG]`, `[CA-DB]`, and Collection-Dashboard sections in `InSites-CAA-claude.md` (and split `cbsa-split/ca-db.md` etc.) lose their embedded component bodies and gain the shell + a `data-contract.md` pointer.

---

## 8. Live AI Query (`window.claude.complete`) — the one thing not to break

Today this is Claude's sole artifact advantage (live, no API key, billed to viewer). Preserve it:
- The Claude shell passes `host = { complete: window.claude.complete.bind(window.claude) }` into `mount`.
- The runtime's AI-Query module: `host.complete ? runLive() : copyToChat()`. Keep the `Promise.race` timeout discipline — **no `AbortController`** (`DataCloneError` across the artifact boundary; memory `feedback_no_abort_controller_artifacts`).
- **Phase 0 confirms** the loaded runtime can actually reach `window.claude.complete`.

---

## 9. Rollout (incremental, reversible)

1. **Phase 0 — verify** the `window.claude`-reachable-from-loaded-script fact. *(Tiny Claude artifact probe, like the CSP test.)*
2. **Phase 1 — pilot ONE artifact (KG):** build the `kg` module, publish `@0.1.0`, swap the `[CA-KG]` body for the shell in a **scratch copy** of the mono, run `/test` in claude.ai, compare render to today. Keep the embedded version as fallback.
3. **Phase 2 — Dashboard + Collection** once KG parity is signed off.
4. **Phase 3 (separate, later) — converge GPT/Gemini** onto the same npm runtime.
5. **Always ship an embedded minimal fallback** so a load failure never yields a blank artifact.

Each phase is independently revertible (embedded code stays in git history; the shell is a localized swap).

---

## 10. Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Claude removes jsdelivr/npm from its whitelist | Pin versions; keep embedded fallback; re-run CSP probe before each workshop |
| `window.claude` not reachable from loaded runtime | Phase 0 gate; thin-React-shell wrapper covers it |
| Vanilla runtime can't match current React artifact polish | Pilot + side-by-side `/test` compare before sign-off |
| Load-before-render race (blank flash) | Shell shows "loading…" until the runtime global is present; `onerror` → embedded fallback |
| jsdelivr cache serves stale build | Never `@latest`; bump the pinned version on every publish |

---

## 11. Savings estimate

- Embedded artifact code today ≈ **40K chars (~27%)** of the mono; realistically **~20–30K chars** are movable; the shell + contract that stay cost ~3–5K.
- **Net per-turn reduction ≈ 20–25K chars (~6–7K tokens).** Under full-injection × a ~16-turn session this compounds into a large cumulative cut — the biggest instruction-side lever available.
- Token framing only; no $ cost on Claude Max. Relevance is quota / context-window economics for the *end user's* session.

---

## 12. Open decisions remaining

Resolved this round: **Option B** · **folder inside Claude** · **GPT/Gemini untouched** · **no build yet**.

Still open:
1. **npm package name** — unscoped `atar-runtime` (must be globally unique — check availability) or scoped `@<org>/atar-runtime` (needs an npm org/user scope; scoped public needs `--access public`).
2. **Greenlight Phase 0** (the `window.claude`-from-loaded-script probe) — the only safe next build step, and small. Say the word and it's a ~1-file test, no commitment beyond that.

*No build happens until you greenlight. This document is the whole of the work so far.*
