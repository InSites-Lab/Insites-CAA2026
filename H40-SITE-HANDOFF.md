# H40 presentation site — handoff

**Updated 2026-08-18.** Read this first in a new session, then `C:\Users\user\.claude\plans\wild-tumbling-fountain.md` (the approved design plan for the tabs).

## The goal

A presentation site for the **Heritage 4.0** talk in Florence — **Thursday 27.8.2026, RETTORATO, technical session AI-1, 11:30–13:30**, third talk in Part 1. Paper: *From Report to Inquiry: Governing Generative AI Insights in Heritage Significance Assessment* (Alef, Shafriri, Berger) — already submitted, in `writing/Sent-Meteor/`.

The site is the visual behind a **10-minute spoken talk**. Each tab carries one short message, never the spoken text. The talk's focus is **epistemic notation, around the Tuba-Zangariyye dolmen case**.

## Where things live

| | |
| --- | --- |
| Site worktree | `c:\Users\user\Documents\InSites-Lab\insites-h40` — branch `h40-sidebar-design` |
| Fallback point | branch `h40-site` @ `866a620` — byte-identical rebuild of the deployed CAA talk site |
| Paper + talk material | `c:\Users\user\Documents\InSites-Lab\insites-caa2026\InSites-Brain\Papers\Heritage4.0\` (primary worktree, branch `heritage-final-paper` — **never pushed**) |
| Talk outline (source of truth for the deck) | `…\Heritage4.0\writing\presentation\Heritage40_presentation_outline_EN.docx` |
| Conference programme | `…\writing\presentation\27-August.pdf` |
| Claim counts | `…\Heritage4.0\evidence\Claim-Level-Count-2303.md` |
| Design canvas (published) | https://claude.ai/code/artifact/223d6e70-0e71-4971-ba33-bf07551f0129 |
| Canvas working files | `insites-h40\design-canvas\` (untracked) |

Cowork is connected to `Heritage4.0\writing\` — it writes talk content there; Claude Code builds the site in `insites-h40`. No mirror folder.

## Done

- **Branch/worktree set up** so nothing existing moved. `main`, `CAA-presention`, `heritage-final-paper` untouched.
- **Verified the live CAA talk site** `alephplace.com/caa/` is a build of the `CAA-presention` branch, not `main` — merged it in (`866a620`) so the H40 site starts from the state that was actually presented. The local build then matched the deployed bundle byte-for-byte except the Gemini API key.
- **Sidebar redesigned as a process** (`d259851`): vertical spine, open rings for gates 0 and 6 (dashed cards), thicker indigo segment for the CBSA core 1–5, filled indigo dot = HITL stop on every connector, connectors flex to fill height. Extensions & Tools became a station in the same container (no dot, no line, indigo surface). Design Principles button removed from the sidebar. Two layout bugs fixed: hardcoded `h-[calc(100vh-48px)]` (real header is taller, plus a fixed footer) and `overflow-hidden` that clipped instead of scrolling.
- **Title** set to the paper title (header + browser tab).
- **Design canvas approved** — four artboards, one per tab, in the site's own visual language.

## Approved tab design — not yet built

| # | Tab | From the outline | Time |
| --- | --- | --- | --- |
| 1 | The Dual Tension | PART A — Opening | 1:30 |
| 2 | What is InSites | Topic 1 | 3:00 |
| 3 | Epistemic Notation | Topic 2 — **core, do not cut** | 3:30 |
| 4 | From Report to Inquiry | Topic 3 + Closing | 4:00 |
| 5 | Q&A | GitHub link + backup material | — |

Decisions locked during review:

- Tab 1's photo strip **crossfades quietly** (~6s, no arrows/dots) through the site photos. `TubaArial-1.JPG` is a byte-identical duplicate of `TubaArial.JPG` — omit it. More photos can join the rotation.
- Tab 2 leads with "Analytical scaffolding."; "not a trained model" is the sub-line. Its point is that **the process is already live in the sidebar** — no second workflow diagram.
- Tab 3 uses the **existing InSites marks**, not the outline's circle: no mark = explicit, 〰️ on amber = inferred, 💭 on purple = hypothesis (styles from `public/notation.html`, class `notation-marker inf`). Two buttons: "The notation" opens `EpistemicNotationModal` (`#notation`); "Worked example" opens `notation.html` — the old Example tab — in a fullscreen modal.
- Numbers (verified against the evidence file): 45 claims · 24 unmarked · 14 〰️ · 4 💭. They sum to 42; the remaining 3 are the special cases (1 misclassification, 1 scope error, 1 conceptual error).
- Tab 4 closes on: even a perfect machine, optimally serving conservation — cultural assessment must remain human.
- **Design Principles: hide the tab, keep the code.** Still reachable via `#design` if needed during Q&A.

## Uncommitted right now

- `workshop-site/components/layout/Header.tsx`, `workshop-site/index.html` — the paper-title change plus a descender-clipping fix (`leading-none` → `leading-tight`, which `truncate`'s `overflow:hidden` was cutting).
- `workshop-site/components/layout/Sidebar.tsx` may carry the user's own spacing tweaks — **do not revert or "tidy" these**; they were hand-tuned.
- `design-canvas/` is untracked.

## Next step

Implement the four tabs in `workshop-site/components/views/WorkshopProgramView.tsx`: replace `PROGRAM_TABS`, write four new tab components, wire the two modals, keep the existing fade transition. Photos need downsampling into `public/` before use (originals are 3.5–5MB).

## Watch out

- The site's Gemini API key is embedded in the public JS bundle at `alephplace.com/caa/` — inherent to the client-side design, flagged, no decision taken.
- Deploy is manual over WinSCP; the remote path is the only thing separating this site from CAA26. Verify it before any upload.
- `npm run dev` runs on port 3000 from `insites-h40`; `npm run build` takes ~55s and passes.
