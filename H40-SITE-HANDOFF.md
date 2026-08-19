# H40 presentation site — what is still open

**Updated 2026-08-19.** The build log that used to live here is gone: it was executed, and the
reasoning now sits where it belongs, in the commits — `aecd58b` (the four tabs, the photo strip, the
modal z-order trap, the sidebar-resize bug) and `d8644ed` (the `--app-zoom` knob and why viewport
units had to be divided by it). Read those before changing either area.

This file now carries only what git cannot: paths, and decisions nobody has taken yet.

## The goal

A presentation site for the **Heritage 4.0** talk in Florence — **Thursday 27.8.2026, RETTORATO,
technical session AI-1, 11:30–13:30**, third talk in Part 1. Paper: *From Report to Inquiry:
Governing Generative AI Insights in Heritage Significance Assessment* (Alef, Shafriri, Berger).
The site is the visual behind a **10-minute spoken talk** — one short message per tab, never the
spoken text. Focus: **epistemic notation, around the Tuba-Zangariyye dolmen case**.

## Where things live

| | |
| --- | --- |
| Site worktree | `c:\Users\user\Documents\InSites-Lab\insites-h40` — branch `h40-sidebar-design` |
| Fallback point | branch `h40-site` @ `866a620` — byte-identical rebuild of the deployed CAA talk site |
| Paper + talk material | `c:\Users\user\Documents\InSites-Lab\insites-caa2026\InSites-Brain\Papers\Heritage4.0\` (primary worktree, branch `heritage-final-paper` — **never pushed**) |
| Talk outline (source of truth for the deck) | `…\Heritage4.0\writing\presentation\Heritage40_presentation_outline_EN.docx` |
| Claim counts | `…\Heritage4.0\evidence\Claim-Level-Count-2303.md` |
| Design canvas (published) | <https://claude.ai/code/artifact/223d6e70-0e71-4971-ba33-bf07551f0129> |
| Canvas working files | `insites-h40\design-canvas\` (untracked) |

**Both worktrees contain a `workshop-site/`.** Only the one under `insites-h40` is the talk site.
Editing the `insites-caa2026` copy by mistake has already cost one round trip.

## Still open

1. **The QR.** Tab 4's closing panel has a GitHub link button where the canvas had a `[QR]`
   placeholder. For a hall a QR is probably right — needs a decision and an asset.
2. **Visual review of the four tabs.** The sidebar and the app scale were reviewed in the browser;
   the tab *content* has not been walked through. Do this at the projector's resolution, not on a
   large desktop monitor.
3. **Deploy.** Manual over WinSCP. The remote path is the only thing separating this site from
   CAA26 — verify it before any upload.
4. **The Gemini API key is embedded in the public JS bundle** at `alephplace.com/caa/`. Inherent to
   the client-side design. Flagged twice now, still no decision.

## Watch out

- `--app-zoom` (in `index.css`) is the one knob for overall scale. If the site looks too large in the
  hall, set it back toward `1` — do not start editing individual sizes. And reset the browser's own
  zoom to 100% before judging, or the two multiply.
- `npm run dev` may land on **3001** if an orphaned server still holds 3000. `npm run build` passes.
