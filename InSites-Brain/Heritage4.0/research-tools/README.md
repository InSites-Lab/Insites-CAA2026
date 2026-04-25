# Heritage 4.0 — Supplementary Materials

Supplementary materials for the Heritage 4.0 paper (Springer CCIS, 6 pages). This folder contains the codebook, transcripts, analytical runs, and comparisons that back the paper's methodological claims.

The materials are organized for someone who has just read the paper and wants to verify, reproduce, or explore the evidence. If you found this folder by browsing the repo without context, see the project README at the repo root for what InSites-CAA is.

## Where to start

If you want to **verify the central methodological claims**, look in [core/](core/). Everything cited in the paper is there.

If you want to **inspect the bot session that was analyzed**, open [core/tz-textonly.md](core/tz-textonly.md) (raw chat) or [core/tuba-session-transcript.md](core/tuba-session-transcript.md) (cleaned by CBSA stage).

If you want to **reproduce the analysis** or check coder agreement, look in [reproducibility/](reproducibility/) — three independent extraction runs.

If you want **richer narrative context** (source-level traces, manual-vs-AI comparison, workshop run notes), look in [further-reading/](further-reading/).

## What is a claim? (the unit of analysis)

The paper's quantitative findings count "substantive claims" produced by the AI bot during the case-study assessment. The operational definition we used:

> A substantive claim is a discrete statement that does ONE of:
> - attributes significance to the site or an aspect of it,
> - interprets evidence (moves beyond describing to analyzing),
> - identifies a heritage value or context,
> - draws a connection between two or more pieces of evidence,
> - makes an analytical judgment (comparison, evaluation, framing).

The unit is the **analytical move** — a single argumentative step the bot takes. Procedural text ("shall I continue?"), direct source quotation without interpretation, formatting and headers, restatements of earlier claims, and reflection questions do NOT count as claims.

The full stage-by-stage extraction rules and boundary cases are in [core/SKILL.md](core/SKILL.md).

## Why 80% and not 94%?

The paper reports that ~80% of the bot's substantive claims involve synthesis or inference across multiple sources, with only ~20% being direct extractions from a single passage. An earlier version of this analysis reported a 94% "epistemic classification accuracy" figure (manually counted, single coder). Both numbers come from the same body of evidence. We chose to foreground 80% in the paper for three reasons.

**1. Stability across runs.** When three independent extraction agents applied the same codebook to the same transcript, the synthesis-plus-inference share held within ±2 percentage points (91–93% in the raw cross-run data; the rounded 80% in the paper is the share excluding "expert-added" claims). The accuracy figure varied between 67% and 91% across the same three runs, because it depends on how strictly each analyst applies the "should-have-been-marked-uncertain" rule — a methodological threshold the codebook deliberately leaves to the analyst.

**2. Closer to the paper's argument.** The paper claims that uncertainty notation licenses cross-source reasoning. The 80% directly demonstrates that — most of what the bot produces *is* cross-source reasoning, not extraction. The 94% answered a different and weaker question: was the bot accurate at self-classifying its own outputs.

**3. Clearer for review.** A content-type tally is harder to challenge than an accuracy claim that depends on the coder's judgment threshold.

The 80% does not change the paper's argument from what the 94% supported — it is a more stable handle on the same finding. Full evidence: [core/claim-extraction-cross-run-comparison.md](core/claim-extraction-cross-run-comparison.md).

## The case study

The paper analyzes a single AI-assisted heritage assessment session. A heritage expert (Yael Alef) used the InSites-CAA bot in Claude Opus to produce a Cultural Built-heritage Significance Assessment (CBSA) of the Tuba-Zangariyye Dolmen Field on the Korazim Plateau, northern Israel. Three source documents were provided to the bot: an archaeological survey (Berger 2025), a heritage-management case study (Alef et al.), and a regional research synthesis (Stepansky 2005). Source PDFs are not included in this supplementary; full citations and page numbers appear in the narrative reports under [further-reading/](further-reading/).

The session ran on 2026-03-21/22. The bot produced the full 6-stage assessment plus a Knowledge Graph and a Dashboard. The expert intervened approximately 13 times during the run. Total session time was about 4 hours, including 1 hour of source-data preparation.

## Folder layout

| Folder | What it is | When to look |
|--------|------------|--------------|
| [core/](core/) | Paper-cited evidence | Verifying any methodological claim in the paper |
| [reproducibility/](reproducibility/) | Three independent extraction runs | Auditing reproducibility, checking inter-run agreement |
| [further-reading/](further-reading/) | Narrative analyses, source-level tracing, workshop notes | Deeper context beyond the 6-page paper |

## Related repository pointers (context, not paper-cited)

These are not part of the paper's evidence. They are included for readers who want to see how the bot is structured and deployed.

- Current Claude bot prompt — [InSites-Brain/Claude/InSites-CAA-claude.md](../../Claude/InSites-CAA-claude.md)
- Cross-platform Gemini version — [InSites-Brain/Gemini/InSites-CAA-GEM.md](../../Gemini/InSites-CAA-GEM.md)
- Workshop companion site (live: alephplace.com/CAA26) — [workshop-site/](../../../workshop-site/)

The case-study transcript was produced by an earlier bot version (InSites-CAA v2). The current public bot is a later iteration with the same architecture and stage structure. Bot-version differences do not affect the methodological findings reported in the paper.
