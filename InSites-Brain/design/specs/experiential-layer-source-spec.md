# Experiential-Layer Source — Integration Spec

**What it is:** an operational contract for feeding an *experiential knowledge layer* (how people actually experience a place) into the CBSA bot as a source document. Method rationale and the analytical dimensions live in [`../../research/genius-loci-experiential-method.md`](../../research/genius-loci-experiential-method.md); this spec covers only *how the bot consumes such a source*.

**Validated:** Madatech run, 2026-05 (genius-loci corpus → assessment). No bot-prompt change was required.

---

## 1. Source type

An experiential-layer source is **qualitative evidence of lived experience** — distilled from a corpus of personal impressions (e.g., visitors', students', residents' free observations), not from expert assessment. It is a distinct evidence type from:
- **factual-historical** sources (dates, events, fabric), and
- **design-intent** sources (the architect's program).

It primarily feeds: Social and Intangible **contexts** (Stage 1); Social / Symbolic / Aesthetic / experiential **values** (Stage 2); and the **Spirit & Feeling** thread of the significance statement (Stage 5).

## 2. Embedded-guidance contract (the source carries its own instruction)

Because the bot already has a full system prompt, **do not add external instructions.** The source document must open with a short guidance block that the bot reads first. That block states:

1. **This is an experiential-phenomenological source** — evidence of how the place is experienced.
2. **Distinguish from factual sources; cross-reference, don't conflate.** Use it for experiential/social/intangible content; rely on factual sources for facts and on design sources for intent. Where possible, *link* a fact or design intent to how the place is experienced today.
3. **Counts are tendencies, not scores.** Any number in the source or its data files is an occurrence count (how many people raised an item) — never a quality score or significance ranking.
4. **Uploadable at any stage** — beginning, or after contexts/values are drafted.

## 3. Bot behavior

- Treat the source under the normal **Evidence Mandate** — cite it like any uploaded material.
- Attribute experiential claims to it (e.g., visitor quotes) as evidence of community/visitor experience; quotes may be first-name-attributed.
- When the source's guidance says counts are tendencies, **do not** surface them as ratings, scores, or ranked significance. Reflect prevalence in words ("dominant", "recurring", "rare").
- Keep the experiential reading separate from factual claims in the analysis, but **weave** them in Stage 5 (the significance statement should connect experience to fact/intent where the evidence supports it).

## 4. Do NOT

- Do not ingest the full raw corpus when a synthesis + curated quotes is provided — use the prepared layer.
- Do not present occurrence counts as quality scores or significance rankings.
- Do not require or expect an external instruction to accompany the file — the contract lives inside it.

## 5. Reference package

Conservation-101 repo, `knowledge2atar.bot/genius-loci/`: a synthesis MD (with the embedded guidance block at its top) + `data/themes.json` + `data/initial_insights.json`. Use it as a working example of a well-formed experiential-layer source.
