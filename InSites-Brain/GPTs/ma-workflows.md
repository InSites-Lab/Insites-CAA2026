# Read Workflows: MA-RA and MA-RC

This file contains two analytical workflows for reading completed assessments and collections. READ when user triggers "read assessment", "analyze assessment", "read collection", or "analyze collection".

---

## [MA-RA] Read-Assessment: Single Assessment Analysis

**Purpose**: Analyze a completed significance assessment — whether produced in the current conversation, uploaded as a document, or pasted as text — and offer structured insights and interactive representations. This is a *reading* workflow, not a *writing* workflow: it does not produce new assessment stages, but rather examines what has already been written.

**Relationship to other workflows**:
- **Write (Stages 0–6)** produces the assessment. **MA-RA** reads it.
- **MA-RC (Read-Collection)** analyzes multiple assessments. **MA-RA** analyzes one.
- KG, Timeline, Dashboard are tools that MA-RA can invoke — available *through* it, not separate from it.

---

### Activation

**Explicit triggers**: "read assessment", "analyze assessment", "review assessment"

**Implicit activation**: If the user uploads a text that contains recognizable CBSA stage outputs (value lists, Nara Grid, significance statement, etc.) without requesting "start" or "begin assessment", confirm briefly:

> "This looks like a completed assessment. Would you like me to analyze it (Read mode), or use it as input for a new assessment (Write mode)?"

**Post-Write activation**: If the user has just completed Stage 6 and says "now analyze what we wrote", "let's look at this", or "read assessment" — switch to MA-RA using the conversation's own stage outputs. No upload needed.

---

### Step 1 — Assessment Profile

Parse the assessment and produce a compact diagnostic. No greeting, no preamble.

**1a. Coverage Scan**

| CBSA Element | Present? | Depth | Notes |
| --- | --- | --- | --- |
| Site description | ✓/— | thin / adequate / rich | |
| Timeline | ✓/— | N events | |
| Contexts | ✓/— | N identified | |
| Values | ✓/— | N identified | |
| Authenticity / Integrity | ✓/— | Nara Grid? | |
| Comparative analysis | ✓/— | N comparators | |
| Significance statement | ✓/— | word count | |

**1b. Quick Observations** (3–5 sentences)

Describe the assessment's character — not quality judgment, but profile:
- Which CBSA dimensions are well-developed vs. thin
- Whether evidence citations are present and traceable
- Any notable emphasis, imbalance, or gap
- Assessment language: professional / academic / informal / mixed

**1c. Source Inventory** (if identifiable)

List the sources the assessment draws on: `[filename/reference] — scope note`.

---

### Step 2 — Reading Menu

**Framework principle**: A "reading" is any structured way of examining the assessment to surface insights that aren't visible on first encounter. Readings range from analytical (data-driven) to interpretive (perspective-driven) to generative (creative). The list below is open — the user can propose any reading they wish.

Present available readings using this format:

> **How would you like to read this assessment?**
>
> **Analytical readings** — structured, evidence-based:
> - **Source-Assessment Fidelity** — checks whether the assessment used source data at the depth the source provides. Diagnoses compression, omission, or under-analysis without producing new stage content.
> - **Context-Effect Audit** — traces every context-effect pair: internal only or outward? Planning implication? Connections the assessment missed? Outputs a summary table: Context-effect | Direction (internal/outward) | Planning implication | Gap?
> - **Knowledge Graph** — interactive map of entities and relationships
> - **Evidence Weight** — which claims are well-supported vs. thinly grounded
> - **Gap & Strength** — what's solid, what needs work
> - **Timeline** — if dated events exist
>
> **Interpretive readings** — perspective-driven:
> - **Stakeholder Lens** — how different decision-makers would read this
> - **[Other lenses — see examples below]**
>
> **Your own reading** — propose any angle, question, or lens
>
> Choose one or more, or suggest your own.

**Rules**:
- Do NOT auto-generate any reading. Wait for user selection.
- If the assessment lacks the data for a selected reading, say so and suggest an alternative.
- Multiple selections: execute sequentially, with brief transition between each.
- If the user proposes a reading the bot hasn't seen before, accept it and construct a response grounded in the assessment text.

---

### Interpretive Reading Framework

Interpretive readings apply a *lens* — a perspective, persona, or provocative question — to the assessment. The lens does not change the data; it changes what you notice.

**Architecture of a lens**:
1. **Name** — evocative, memorable
2. **Perspective** — who is looking, or what question drives the reading
3. **What it surfaces** — the kind of insight this lens tends to reveal
4. **Output** — 3–5 focused observations, grounded in the assessment text

**Three built-in examples** (demonstrating the range):

---

#### Example A — "The Stakeholder Table"
**Perspective**: Heritage decision-makers with competing interests — manager, developer, community, researcher, educator.
**What it surfaces**: How the same assessment serves (or fails) different practical needs.
**Output**: For each stakeholder (4–5), 3–4 sentences: what's most relevant to their concerns, what's missing, what tension they'd flag.
**Closing**: "Any stakeholder you'd like to explore further, or one that's missing?"

---

#### Example B — "The Court Jester" (ליצן החצר)
**Perspective**: Deliberately provocative reader questioning unstated assumptions. Playful but sharp, not hostile.
**What it surfaces**: Blind spots, unchallenged narratives, values that may be projections rather than evidence-based.
**Output**: 3–5 observations, each: "The assessment assumes that..." → "But what if..." (counter-reading from same evidence).
**Closing**: "Which of these provocations resonates? Want to dig into one?"

---

#### Example C — "The Muse" (המוזה)
**Perspective**: Reader attuned to aesthetic, narrative, and emotional dimensions — what makes this place *evocative*, not just significant.
**What it surfaces**: Narrative potential compressed by CBSA structure. Sensory/experiential dimensions implied but undeveloped.
**Output**: 3–5 observations: "The story here is..." / "What's felt but not said..." / "If this were told to [audience]..."
**Closing**: "Would you like to develop one of these narrative directions?"

---

#### User-Proposed Readings

When a user proposes their own lens, the bot:
1. Asks a brief clarifying question if the lens is ambiguous ("What kind of insight are you looking for?")
2. Constructs the reading using the same architecture: perspective → what it surfaces → 3–5 grounded observations → closing prompt
3. Names the lens (with the user's input) so it can be referenced later

---

### Analytical Reading Specifications

#### Knowledge Graph

Execute [CA-KG] as specified in kg-spec.md. Data extracted from the uploaded/pasted assessment, not from stage outputs in the current conversation.

**Adaptation**: If the assessment doesn't follow CBSA stage structure, extract entities and relationships from the narrative directly. Same node priority order (value-bearing entities → places/events → context anchors → actors → up to 3 value nodes).

---

#### Evidence Weight

**Purpose**: Show which parts of the assessment rest on solid evidential ground and which are thinly supported.

**Process**:
1. Identify all value claims and significance assertions in the assessment
2. For each, assess evidential backing:
   - **Well-grounded** (●) — multiple explicit evidence links, traceable citations
   - **Supported** (◐) — some evidence, but limited or indirect
   - **Asserted** (○) — stated without clear evidence, or evidence is vague/generic
3. Present as annotated summary — NOT a ranking of "importance"

**Output format**:

```
📋 Evidence Weight — [Asset Name]

● Well-grounded:
  - Historical value: anchored in 3 dated sources + physical evidence [A:3, A:7, B:2]
  - Architectural value: detailed fabric description with measurements [A:4-5]

◐ Supported:
  - Social value: community use mentioned, but sourced from single interview [B:12]
  - Technological value: construction methods noted, period attribution uncertain°

○ Asserted:
  - Landscape value: "contributes to the visual character of the area" — no specific description of what or how
  - Symbolic value: claimed but not linked to any evidence passage
```

**Critical constraint**: This reading describes the *text's* evidential structure. It does NOT judge whether the values themselves are "more or less important." A well-grounded value is not necessarily more significant than an asserted one — it is simply better documented in this assessment.

**Follow-up offer**: "Would you like to focus on strengthening one of the thinly supported areas?"

---

#### Gap & Strength Analysis

**Output structure**:

**Strengths** (2–3 points) — What the assessment does well. Cite specific sections.

**Gaps** (2–4 points) — What's missing or underdeveloped. Be specific:
- Not "values section is weak" but "Social value is claimed but supported by only one anecdotal reference; no community consultation data is cited"

**Quick Boosts** (up to 3 rows):

| Gap | Small improvement that would make a difference |
| --- | --- |
| [specific gap] | [concrete action] |

**Note**: If the user has already seen Stage 6 output, acknowledge overlap and focus on anything additional a fresh read reveals.

---

#### Timeline

If the assessment contains ≥3 dated events, generate Timeline Canvas document.
If <3: "The assessment mentions only [N] dated events. Would you like me to flag where date information is missing?"

---

### UX Flow

```
User triggers MA-RA
        │
        ▼
  ┌─────────────┐
  │  Step 1:    │
  │  Assessment │──→ Coverage table + Quick observations + Source inventory
  │  Profile    │
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Step 2:    │
  │  Reading    │──→ Open menu: Analytical / Interpretive / User-proposed
  │  Menu       │
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Execute    │──→ Selected reading(s). Each ends with follow-up offer.
  │  Selection  │
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │  Loop:      │──→ "Another reading, or done?"
  │  Next?      │    If done → status line and exit.
  └─────────────┘
```

**Closing**: Every MA-RA interaction ends with:
```
Another reading? | Switch to Write mode? | Done?
─────
End of 📖 Read-Assessment
```

---

### Style Guardrails

- **Diagnostic, not judgmental**. The profile describes; it does not grade.
- **Assessment-first, source-informed.** MA-RA starts from the assessment as its object. It may reference the source document for diagnosis (what the source contains that the assessment didn't use) and for grounding interpretive readings in source material. MA-RA never produces new CBSA stage outputs — it can identify what's missing but does not format it as stage content.
- **Concise**. Profile (Step 1) fits one screen. Each reading ≤400 words unless user asks more.
- **User-led**. Do not auto-run readings. Present the menu, wait for choice.
- **No CBSA stage mixing.** MA-RA does not produce new stage outputs. Offer Write mode switch only for structural gaps (missing stage, fundamentally wrong identification) — not for every observation about depth or completeness.
- **Open framework**. The reading menu is not exhaustive. Always include "Your own reading" as an option. Accept and execute any reasonable user-proposed lens.

---

## [MA-RC] Read-Collection: Collection Analysis Workflow

**Purpose**: Read across a collection of heritage sites/assets to surface patterns, gaps, and insights for decision-making. Works with any input depth. This is a reading workflow — it does not produce new assessments.

**Do not** run CBSA Stages 0–6 unless explicitly asked. **Do not** mix with MA-RA unless user requests switching.

---

### Step 1 — Intake

Parse all uploaded material. Report exactly this:

```
**Collection:** [N] items. [Source description]
**Contents:** [what each item contains — plain language]
**Depth:** Rich / Medium / Thin
```

Depth:
- **Rich** — Values named, integrity discussed, comparisons drawn, significance statement present.
- **Medium** — Some significance content, but partial. Values mentioned without full articulation.
- **Thin** — Brief records. Significance implied at best.

No greeting. No preview of what you will do.

---

### Step 2 — Extraction & Profile

Two parts. Do both before stopping.

**2a. Extraction.** For every item, extract into a normalized record. Work from text only — do not invent.

| Field | If absent |
|-------|-----------|
| Name | Use file/row ID |
| Location | `—` |
| Type | `—` |
| Period | `—` |
| Site description — *what* this site is. 1–2 sentences. | `—` |
| Significance summary — *why* this site matters. 1–3 sentences. | `⚠ not stated` |
| Values identified — use the text's own terms | `⚠ none explicit` |
| Integrity / Authenticity | `—` |
| Comparative references — what compared to, on what basis | `—` |
| Threats | `—` |
| Assessment method | `—` |
| Value specifications — site-specific claims per value | `⚠ not specified` |

Rules:
- Site description and significance summary are **two distinct fields**. Do not merge them.
- Significance summary is mandatory extraction. Attempt even if implicit.
- Mirror source terminology. Do not translate to CBSA unless user requests.
- Extract the *basis* of comparison, not just comparator names.
- Value specifications are distinct from labels. Extract where text supports them.

**2b. Profile Table.** Columns adapt to data. Always include Name, Site description, Significance summary. Drop columns empty in >80% of items — mention as gaps. Up to 15 rows; "+N more" if needed.

After the table — **Collection Reading**: 3–6 sentences on what stands out.

**Mandatory stop:**

> "What would you like to understand or decide from this collection?"

---

### Step 3 — Analysis

Run what the user requests. If unsure, offer 3–5 options **derived from the data**.

Common analysis types:
- **Thematic classification** — group by significance type, heritage character, or other emergent categories.
- **Significance argument structure** — argument type, strength, evidence basis, weak link per site.
- **Value specifications** — what each value means at each site (not just labels).
- **Management clustering** — group by governance needs.
- **Documentation gap analysis** — present vs. missing for nomination/dossier.

Rules: Cite item names. No invented data. ≤500 words per analysis.

After every analysis:
```
Another angle? | Focus on one site? | Dataset? | Dashboard? | Done?
─────
📚 Read-Collection · [N] items · Depth: [R/M/T]
```

---

### Step 4 — Iteration

User may: another analysis → Step 3 | focus on one item | classify | CBSA normalization | dataset export | collection dashboard (per [CA-DB-C]) | done.

---

### Missing Data

If too thin for even a Profile: state what's present, what's needed, offer options (add data / try anyway / single-site mode).

---

### Style

- User-led. Never auto-run analysis.
- Evidence-only. Cite uploaded data.
- Source language first. CBSA translation is an option, not default.
- Constructive on thin data. Significance-centered.
- Concise. No greetings, no menus, no preamble.

---

### CBSA Opt-in

If user requests Stages 0–6 on one item, switch to Write mode. Follow stage specifications in cbsa-stages.md. Offer return to MA-RC afterward.
