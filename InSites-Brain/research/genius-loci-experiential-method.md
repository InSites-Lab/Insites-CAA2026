# Genius-Loci Experiential Analysis as a Knowledge Layer for CBSA

**Status:** Validated method (2026-05). First application: the Madatech / historic Technion building (architect Alexander Baerwald), Haifa.

**Provenance:** The Conservation-101 course "spirit of place" (רוח המקום) task — 66 architecture students each freely observed and described their lived experience of the building. That corpus was distilled into an *experiential knowledge layer* and uploaded to אתר.בוט (the InSites CBSA assessment bot) as a **source document**, alongside a historical-documentation dossier and an article on Baerwald's design. It **contributed to the significance assessment** — the expert (Yael) confirmed it produced what was wanted: a richer reading of the social / intangible / Spirit-&-Feeling dimensions.

**Related artifacts:**
- Operational integration spec: [`../design/specs/experiential-layer-source-spec.md`](../design/specs/experiential-layer-source-spec.md)
- Source package (conservation-101 repo): `knowledge2atar.bot/genius-loci/` — the synthesis MD + `themes.json` + `initial_insights.json`.

---

## 1. The idea

A heritage significance assessment usually draws on **factual-historical** sources (what happened, when) and **design-intent** sources (what the architect meant). It rarely has a structured account of **how the place is actually experienced** by people. This method supplies exactly that: a corpus of *lived impressions*, analyzed phenomenologically, becomes a distinct **experiential knowledge layer** — a complementary evidence type, not a substitute for facts.

The impressions are not expert assessments. They are open, personal observations ("what is the story of this place, what does it mean to you?"). The analytical value comes from reading *across* the corpus.

## 2. The method (pipeline)

```
Corpus of lived impressions  →  Phenomenological analysis  →  Experiential layer  →  Integration into CBSA
(free observations,             (across the dimensions       (synthesis + curated   (as an experiential
 not expert assessment)          in §3)                       quotes/titles/data)     source, cross-referenced)
```

## 3. Analytical dimensions (the components)

The corpus is read across these dimensions. None is a score; each is a qualitative lens.

| Dimension | What it captures | From the Madatech |
|-----------|------------------|-------------------|
| **Spirit themes** | What the place *is* experientially | historic presence; old/new collision; stone materiality; light & shadow; in-between/liminal space |
| **Sensory register** | Which senses it activates — including emergent ones | sight dominant; **"sense of time"** surprisingly prominent, peaking where old stone meets new glass |
| **Viewer feelings** | Emotional register | calm, curiosity, nostalgia, awe |
| **Phenomenological modes** | The stance of the observer | conservation gaze / visitor experience / existential |
| **Elements that carry weight** | Which features hold the meaning | the arch (as a *family*: rhythm, axis, framing), stone, the corridor, deep wall-openings |
| **Tensions & ambivalence** | Dilemmas the place holds, unresolved | authenticity vs. accessibility; living/noisy vs. museum-quiet; new dominance vs. humble completion |
| **Open questions** | What the place makes people wonder | "what is worth conserving?"; "the building carries a secret"; "is steel-and-concrete added later also heritage?" |
| **Titles** | One-line distillations people chose | "stone that holds, ceiling that hides"; "the past won't let go"; "an arch that hasn't forgotten" |
| **Blind spots** | What went *unobserved* (itself a finding) | the active exhibition halls — attention fled to the historic fabric |

**Output:** a qualitative experiential layer = a readable synthesis + a curated bank of attributed quotes/titles/questions + structured data files for drill-down.

## 4. Validated outcome

Fed as a source to the CBSA bot, the layer enriched the assessment's experiential, social, and intangible dimensions and supplied authentic visitor voice for the Spirit-&-Feeling content of the significance statement. The bot handled it **without any change to its system prompt** — the existing Evidence Mandate and experiential handling were sufficient; the value was in how the *source* was prepared.

## 5. What is NOT needed (and why)

- **Occurrence counts are not scores.** The numbers are a student exercise, not research data. "49 of 66 raised X" is a tendency, not a quality rating or significance ranking. Render tendencies in words; keep precise counts in data files only.
- **Don't feed the raw corpus.** 66 full texts are long and repetitive. A synthesis plus curated quotes/titles is denser and more useful to a downstream agent.
- **No external instruction.** When the consuming bot already has its own system prompt, do not add separate instructions — embed the how-to-use guidance *inside* the source document so it travels with the file.

## 6. Integration with CBSA (summary)

The layer is uploaded as an **experiential source**, kept distinct from factual-historical sources but **cross-referenced** with them (e.g., Baerwald's intent for light ↔ how visitors experience light today). The source carries an embedded guidance block telling the bot what kind of evidence it is and that its counts are tendencies. Full contract: [`../design/specs/experiential-layer-source-spec.md`](../design/specs/experiential-layer-source-spec.md).

## 7. Future directions

**Extend the phenomenology to the drawings.** This run analyzed mainly the *text*. The students also produced drawings, and rich data already exists — `visual_analysis_combined` (elements drawn, drawing styles, observational emphasis, viewpoint) and `alignment` (text↔drawing links) in the conservation-101 `enriched_records.json`. A full phenomenological reading of the **visual experience** and the **text↔drawing relationship** is an open opportunity on existing, high-quality qualitative data — likely to surface many further perceptions.

## 8. For papers (Heritage 4.0 and beyond)

This method is a concrete instance of an **experiential knowledge layer / evidence type** entering a governed assessment: lived experience, transparently labeled as such, complementing factual sources without being conflated with them. It connects to the lab's themes of epistemic transparency and uncertainty-as-enabler — here the "uncertainty" is the qualitative, non-metric nature of experience, handled honestly (tendencies, not scores). Case anchor: the Madatech run. See `../Heritage4.0/` for the paper that can cite it.
