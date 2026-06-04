# CBSA Gemini Gem — v9.1 (split-gem fit to 3.1-pro · runtime), FULL bundle

A complete, self-contained upload set for the InSites CBSA bot as a **Google Gemini Gem**.
**Version: v9.1 — split-gem fit to 3.1-pro · runtime.** It pairs the **full canonical methodology
(zero methodological loss)** with **execution-hardening** that front-loads the sandbox / RTL / determinism
rules, and — new in v9.1 — **externalizes all artifact rendering to the shared `atar-runtime` package**
(loaded from jsDelivr), so the KG and dashboards converge with the Claude build.

Filenames here are **exactly** the names the system prompt's loading table references (`ca-kg.md`,
`ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md`) — so on-demand loading resolves correctly.

## How to deploy (fat-core model)

1. **Gem Instructions** ← paste the entire content of `cbsa-main.md`.
   It already inlines governance + the Hebrew overlay `[CA-HE]` + Stages 0–6 + Session Report + the full
   Reference taxonomies, so `cbsa-stages.md` / `cbsa-reference.md` are **not** uploaded separately.
2. **Gem Knowledge** ← upload these 5 files (flat, no folders):
   - `ca-kg.md` — Knowledge Graph app
   - `ca-db.md` — Dashboard app — contains `[CA-DB-F]` foundation + `[CA-DB]` single-assessment + `[CA-DB-C]` collection (one file, by design)
   - `ma-ra.md` — Read-Assessment workflow
   - `ma-rc.md` — Read-Collection workflow
   - `ca-img.md` — Image-analysis aid
3. Remind users to **activate Canvas mode** before requesting an artifact (KG / Dashboard) — otherwise
   Gemini outputs the code as text.

> **Do NOT upload**: the monolithic `InSites-CAA-GEM-v9.md` (that is the single-file alternative — use the
> split **or** the mono, not both), `test-mode.md` (dev-only), this `README.md`, or the `OLD/` folder.

## Rendering — externalized runtime (v9.1)

The KG and both dashboards no longer ship inline D3 / Leaflet / Chart.js render code. Each emits a **thin
vanilla-HTML shell** that loads the shared **`atar-runtime`** package and calls `mount(container, DATA, host)`:

```html
<script src="https://cdn.jsdelivr.net/npm/atar-runtime@0.3.0/dist/atar-runtime.umd.js"></script>
```

- The runtime owns ALL rendering — the D3 force graph, every dashboard tab, the map (Leaflet + OSM tiles
  with a zero-network SVG vector fallback), charts/matrices, cross-tab highlighting, and RTL.
- **CDN**: the runtime loads from **jsDelivr** (verified to work in the Gemini Canvas sandbox). It then loads
  its own sub-libraries (D3, Leaflet) from **cdnjs** internally. The old "cdnjs-only / no jsdelivr" rule is
  relaxed accordingly — it applied to hand-loaded libraries, not to the runtime.
- **Live AI Query stays live**: the shell wires `host.complete` to the Gemini API
  (`gemini-2.5-flash-preview-09-2025`, empty `apiKey` injected at runtime, `Promise.race` timeout — no
  `AbortController`). The bot's only job is to extract `DATA`.
- Same `atar-runtime/data-contract.md` shapes as the Claude build — one data contract, per-platform shells.

## File manifest

| File | Role | Basis |
|---|---|---|
| `cbsa-main.md` | Instructions (paste) | canonical `cbsa-main` fat-core + 3 framing blocks (governance/stages/reference — no artifact code) |
| `ca-kg.md` | Knowledge | DATA-extraction spec (entity taxonomy `[CA-EC]` + Per-Claim Epistemic Gate + schema + context-effect / HITL offers) + the `atar-runtime` shell |
| `ca-db.md` | Knowledge | DATA-extraction specs (`[CA-DB-F]` + `[CA-DB]` single + `[CA-DB-C]` collection) + the `atar-runtime` shell |
| `ma-ra.md`, `ma-rc.md`, `ca-img.md` | Knowledge | canonical `cbsa-split/`, content-identical (blank-line cleanup only) |

## Where is the Collection Dashboard (CA-DB-C)?

Inside `ca-db.md`, as the `[CA-DB-C]` section. A single `ca-db.md` holds the shared foundation `[CA-DB-F]`
once, then both the single-assessment (`[CA-DB]`) and collection (`[CA-DB-C]`) specs — matching the prompt's
routing (the "dashboard" trigger and the MA-RC collection-dashboard hand-off both resolve to `ca-db.md`).

## Design guarantee — methodology preserved, rendering externalized

- The **methodology** is preserved with zero loss: every stage rule, the epistemic discipline (〰️/💭 + the
  Per-Claim Epistemic Gate), the entity taxonomy, the DATA schema, the context-effect explanation, and the
  HITL interpretive-entity review are all intact in the knowledge files.
- The only **intentional** change in v9.1 is the **rendering**: the inline D3 / Leaflet / Chart.js / tab code
  was replaced by the `atar-runtime` shell. The visual output is now owned by the shared runtime — identical
  to the Claude build, governed by the same `data-contract.md`. This is a deliberate convergence, not a loss.
- Execution hardening lives **only** in the prepended `<EXECUTION_HARDENING>` / framing blocks; it restates
  rules in the bodies for prominence, never drops content.

## v9.1 changes (runtime externalization)

1. **KG + both dashboards → `atar-runtime` shell** (jsDelivr) instead of inline render code. The mono
   `InSites-CAA-GEM-v9.md` shrank ~32 KB; `ca-db.md` went from ~717 to ~280 lines.
2. **cdnjs-only rule relaxed** — jsDelivr is allowed for the runtime; sub-libraries (D3/Leaflet) still load
   from cdnjs internally. The old "Do NOT use jsdelivr.net" prohibition was removed.
3. **AI Query stays live on Gemini** — the shell wires `host.complete` to the Gemini API.
4. **Map**: Google-Maps 3-layer tiles → the runtime's **OSM tiles + zero-network SVG vector fallback**.
5. **Verified**: jsDelivr loads in the Gemini Canvas sandbox; KG and dashboard+map both render. (The
   `atar-runtime/data-contract.md` shapes are unchanged — extraction specs are untouched.)

## v9 changes (vs. the first FULL bundle) — retained

1. **Entity types reconciled to 15.** `[CA-EC]` (English) includes **`Heritage Asset`** to match the Hebrew
   KG list and the runtime; "outside all 15 categories" → propose a new type, mark `interpretive` (💭) + `epistemic_note`.
2. **Whitespace cleaned** across all files (also repairs in-chat Markdown tables).
3. **Filenames** are the routing-correct lowercase names.
4. **RTL chat tables → natural column order** in `[CA-HE]` Table Header Maps (first column = rightmost in RTL); no U+200F.
5. **`cbsa-main.md` QA** — code-fence phasing fixed; `[CA-HE]` + stages render as proper Markdown.

## What was rejected (do not upload)

The three files in `OLD/gemini suggestions for html apps/` are Gemini Pro 3.1's "performance" rewrites —
net regressions (dropped tabs/taxonomy/offers, downgraded the live AI-Query to a static prompt generator,
reversed the Chart.js rule). Discarded. The runtime externalization (v9.1) supersedes any inline-render debate.

## Status — this IS the maintained Gemini split

- `gem-split/` (this folder) is the **maintained split** for Gemini.
- The monolithic `InSites-CAA-GEM-v9.md` (Gemini root) carries the **same content** in one file and was
  mirrored to the v9.1 runtime build; keep the two in sync when methodology changes (edit here, then mirror).

## Remaining note (inherited, by design — not a bug)

- Accent colours differ **by app on purpose** (the runtime applies them): KG `#3b82f6`, single-assessment
  dashboard `#2563eb`, collection dashboard stone/amber. Do not "harmonize" them.
