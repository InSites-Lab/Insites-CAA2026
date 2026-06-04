# Future Features — Dashboard & Report Enhancements

Deferred capabilities intentionally removed from the active bot specs, captured here as roadmap so they are not lost. Not loaded by any bot prompt.

---

## 1. In-artifact Print / Export component (Report tab)

**Status:** Deferred.

**What it was.** The dashboard Report tab originally specified two in-artifact buttons — **📄 Export HTML** (clone DOM → self-contained HTML file) and **🖨️ Print / PDF** (`window.print()`) — plus an `@media print` stylesheet and a sandbox-detection fallback.

**Why deferred / removed (ALL platforms).** In-artifact `window.print()` / blob-download does not work reliably in **any** of the bot canvases — the Claude React-artifact sandbox blocks it (`URL.createObjectURL`, `window.print()`), and it is likewise non-functional in the **GPT** and **Gemini** canvases. The buttons rendered as broken affordances and contradicted the `[CA-DB-F]` "no in-artifact download / print" rule. So the print/export buttons were removed **sweepingly, across all three platforms**:
- **Claude** — mono `InSites-CAA-claude.md` + split `cbsa-split/ca-db.md`
- **GPT** — `GPTs/report-tab-spec.md`
- **Gemini** — `Gemini/InSites-CAA-GEM-v9.md` + `Gemini/gem-split/ca-db.md`

Export is now **chat-delivered everywhere** (the bot generates a formatted Word/PDF in the conversation on request).

**Design sketch for a future revival:**
- **Now (shipped):** Report tab shows its content on-screen + a header note — "📥 Ask in chat to export this report as a formatted Word/PDF document." The bot produces the file in chat.
- **Option A — post-artifact generation:** keep export out of the artifact; the bot emits a downloadable Word/PDF (or a self-contained HTML file) as a chat deliverable, populated from the same dashboard data JSON.
- **Option B — in-artifact, if/when the sandbox allows it:** re-introduce an Export button that builds the HTML/PDF in memory and offers it via a sanctioned download path, guarded by a runtime capability check (only render the button when the API is actually available).
- **Option C — headless renderer:** an external HTML→PDF service the bot calls, returning a link.

**Dependencies / triggers to revisit:**
- A change in Claude artifact sandbox policy (download / `window.print()` becoming available), **or**
- A decision to standardize on chat-delivered Word/PDF export across all InSites artifacts ([CA-DB-F] contract).

**Where the active behavior lives now:** `cbsa-split/ca-db.md` §4c Report Tab (chat-delivered note) and the mirrored section in `InSites-CAA-claude.md`.

---

## 2. External runtime via jsdelivr / GitHub (token-reduction path)

**Status:** CSP behavior **measured & validated**; implementation deferred (post-workshop).

**The lever.** ~40,361 chars (~27%) of the Claude mono are embedded artifact code blocks (KG, Dashboard, Map components — largest single block is the iframe-Leaflet Map ~5.8K). Under claude.ai full-injection (see [[project_claude_ai_full_injection]]) every char of that is re-sent every turn. If the heavy runtime code lived **outside** the prompt and the bot emitted only a short shell + data JSON (the pattern GPT/Gemini already use with `kg-runtime.js` on alephplace.com), the mono could shed an estimated **~20–30K chars** — by far the biggest instruction-side reduction available.

**What was untested:** whether a Claude artifact can load a `<script src>` from an external server. It can — but only from a CSP-whitelisted host.

**Measured result** (`InSites-Brain/Claude/tests/external-runtime-csp-test.jsx`, run in claude.ai, both React-direct **and** iframe-srcDoc paths):

| Host / path | Result | Usable as runtime host? |
| ----------- | ------ | ----------------------- |
| `cdnjs.cloudflare.com` | ✅ LOADED | whitelisted, but only hosts registered libraries — can't host our files |
| `cdn.jsdelivr.net/npm/` | ✅ LOADED | **YES — serves any npm package (publish the runtime to npm)** |
| `cdn.jsdelivr.net/gh/` (GitHub route) | ❌ FAILED | **no** — same host as /npm, but the CSP is path-scoped and blocks /gh/ |
| `unpkg.com` | ❌ FAILED | not whitelisted |
| `alephplace.com` (our server) | ❌ FAILED | not whitelisted (URL is valid → confirmed CSP block, not 404) |

→ **Claude's artifact CSP is PATH-SCOPED, not just host-scoped.** It whitelists `cdn.jsdelivr.net/npm/` (the npm mirror) but blocks `cdn.jsdelivr.net/gh/` (the GitHub-repo mirror) — same host, different verdict, so the rule keys on the path prefix, not the origin alone. Our own server (alephplace) and unpkg are blocked entirely; the alephplace block is client-side CSP and **not changeable from the server** (CORS / "allowed origins" on alephplace is irrelevant — `<script src>` loading isn't gated by CORS).

**The viable path: publish the runtime to npm → `cdn.jsdelivr.net/npm/`.** Because the whitelisted path is the npm mirror (not the GitHub mirror), self-hosting means publishing the runtime as an **npm package** (free; `npm publish`); jsdelivr then auto-mirrors it:

```text
https://cdn.jsdelivr.net/npm/<your-package>@<version>/runtime.js
```

Version-locked (pin `@<version>`, never `@latest`) · we own the package · loaded via **both** the React-direct script-append and the iframe-srcDoc path in testing, so the runtime can live in either context.

> **Confirmation status — CONFIRMED (3 runs, `external-runtime-csp-test.jsx`).** Run 2 proved `/npm/` works (leaflet) and `/gh/` is blocked. Run 3 proved an **obscure** npm package (`left-pad`) loads via **both** the React-direct and iframe paths → the whole `cdn.jsdelivr.net/npm/` *prefix* is open, not a fixed library list. **Externalize is viable.** (Re-run the test artifact before relying on it — the whitelist is Claude policy and can change.)

**Design sketch for revival:**
- Publish `kg-runtime.js` / a `dashboard-runtime.js` / a `map-runtime.js` as an **npm package** (e.g. `@insites/atar-runtime`), tag a version, reference via `cdn.jsdelivr.net/npm/<pkg>@<version>/...`.
- Bot output shrinks to: a short artifact shell that loads the runtime + the **data JSON** for that assessment (same division of labor GPT/Gemini already use).
- **React-direct** (dynamic `<script>` in `useEffect`) avoids the iframe, but must guard the **load-before-render race** (render a "loading…" state until the global the runtime defines is present); the **iframe-srcDoc** path is the more isolated fallback.
- **Keep a minimal embedded fallback** for the offline / CSP-policy-change case.

**Dependencies / triggers to revisit:**
- Post-workshop (this is an optimization, not a workshop blocker), **and**
- A decision to converge Claude artifacts onto the external-runtime model the other platforms use (would also unify the cross-platform KG/Dashboard rendering).

**Caveat:** the whitelist is Claude's policy and can change without notice — pin versions, keep the embedded fallback, and re-run the test artifact before relying on it.
