# atar-runtime

Artifact-rendering runtime for the InSites **Atar.Bot** CBSA bots. The bot emits a short shell + data JSON; this runtime does the rendering. Loaded by Claude artifacts from `cdn.jsdelivr.net/npm/...` (the only external-script path Claude's artifact CSP allows — see `../../design/specs/future-features.md` §2).

> **Current state: `0.1.0` — Knowledge Graph (Phase 1).** Built from `src/` with esbuild. `mount()` renders the **KG** (vis-network from cdnjs, [CA-EC] colours, RTL, Info/Analytics/AI tabs, epistemic markers, **live AI Query** via `window.claude.complete`). The **assessment** and **collection** dashboards are still placeholders (Phase 2). Build: `npm run build` → `dist/atar-runtime.umd.js` + `dist/atar-runtime.css` (CSS also inlined into the UMD).

## Contract

```js
AtarRuntime.mount(container, data, host)
//   container : DOM node to render into
//   data      : assessment / collection / KG JSON
//   host      : { complete?: (prompt) => Promise<string> }  // Claude passes window.claude.complete
```

The runtime uses a **capability check** (`host.complete ? live : copy-to-chat`), never a platform check.

## Publish (the only human steps)

Everything up to here was prepared by Claude Code. To put it on npm:

```sh
# one-time: create a free account at https://www.npmjs.com/signup
cd InSites-Brain/Claude/atar-runtime
npm login            # interactive — your username / password / 2FA
npm publish --access public
```

Within a few minutes jsdelivr auto-mirrors it at:

```text
https://cdn.jsdelivr.net/npm/atar-runtime@0.1.0/dist/atar-runtime.umd.js
```

Then paste `shells/claude-shell.jsx` into a claude.ai chat (render as a React artifact) to confirm Claude loads **your** package and reaches `window.claude.complete`.

## Update later

Bump `version` in `package.json` → `npm publish` again → update the pinned version in `shells/claude-shell.jsx` (and any bot-prompt shell). **Always pin a version; never `@latest`** (jsdelivr caches aggressively).

## Local check (no npm account needed)

Open `test/local-test.html` in a browser — it loads `dist/` directly and mounts twice (fallback path + a fake live host).

## Layout

```text
atar-runtime/
  package.json
  build.mjs                  ← esbuild driver (src → dist, inlines CSS)
  dist/atar-runtime.umd.js   ← published bundle (+ atar-runtime.css)
  src/                       ← runtime source (mount + renderers/ + shared/ + styles/)
  shells/claude-shell.jsx    ← typed shell the bot emits
  data-contract.md           ← the DATA shape per type
  test/local-test.html       ← local render check
```
