# Epistemic Notation System — Reference Definition

## Purpose

In AI-assisted heritage assessment, any output that goes beyond what sources explicitly state is indistinguishable from hallucination — a fabricated claim presented as fact. The epistemic notation system transforms this liability into a resource: marked hypotheses submitted for expert examination.

The notation does three things:
1. **Licenses inference** — gives the AI permission to search beyond explicit text, because the output will be marked
2. **Activates governance** — gives the expert a visual signal for where to apply domain judgment
3. **Creates an audit trail** — every claim's epistemic status is visible in the output

## Three Tiers

| Notation | Name | Definition | Example |
|:--------:|------|-----------|---------|
| (none) | Explicit | Directly stated in source material. No inference required. | "Built in 1923" [A:2] |
| ° | Inferred | Synthesized from 2+ pieces of evidence. Not stated as such in any single source, but supported by convergent data. Must cite the evidence passages. | °"pastoralist populations using the same landscape over four millennia" — connecting main text [A:46–48], footnote [A:50 fn.4], and management context [B:12] |
| 💭 | Interpretive hypothesis | Neither explicit nor confidently inferred. A reading-between-the-lines claim — pattern recognition, subtext, or creative connection that the expert should examine. | 💭"a persistent landscape for imagination" — elevating scattered textual references into a unified heritage value |

## The Reasoning Chain: Meaning → Criteria → Significance

The notation operates within a structured analytical progression:

| Stage | Role | Notation behavior |
|-------|------|-------------------|
| **Stage 1** (Contexts) | Describe frameworks, identify context-effects | ° on contexts emerging from unique site description; 💭 on reading between the lines |
| **Stage 2** (Values) | Articulate what the site *means* within each context | ° on values inferred from cross-context analysis; 💭 on subtext values not explicitly documented |
| **Stage 3** (Integrity/Authenticity) | Apply criteria lens: what survives, what's lost | Notation on condition claims based on indirect evidence |
| **Stage 4** (Comparative) | Apply criteria lens: how does this compare | ° on comparative insights from cross-source synthesis |
| **Stage 5** (Significance) | Synthesize: weigh meanings through criteria into significance | If a core claim rests on ° or 💭, state its basis and limits in the sentence — don't rely on notation alone |

**Key distinction**: Stage 2 extracts *meanings*, not significance. Significance emerges only after Stages 3–4 apply evaluative criteria. Stage 5 synthesizes the full chain.

## Prose-Notation Coherence

When a claim carries ° or 💭, the surrounding prose must use suggestive language — "may have," "suggests," "possibly." A ° on a term but certainty in the sentence is a contradiction.

**Wrong**: "The site functioned as a °hierarchically organized network"
**Right**: "The site may have functioned as a °hierarchically organized network"

The notation marks the epistemic status; the prose must match it.

## Connection to Evidence Types [CA-EV]

Epistemic notation and evidence types are complementary:
- **Notation** marks how the claim was derived (explicit / inferred / hypothesized)
- **Evidence type** marks what kind of evidence supports it (stratigraphic, analogical, documentary, etc.)

A claim can be explicit in source but based on weak evidence type (e.g., analogical parallel stated directly). Or inferred but from strong evidence (e.g., cross-referencing two stratigraphic reports). Both dimensions matter for the expert's judgment.

Combined notation: `[ana°: B:7]` = analogical evidence, inferred from multiple sources.

## Case Evidence: Tuba-Zangariyye Dolmen Field

From the Heritage 4.0 paper (Section 4), three instances demonstrate notation enabling cross-source synthesis:

1. **Social continuity** (°) — Three scattered references (main text, footnote, management context) connected into "pastoralist populations using the same landscape over four millennia." Expert validated: "pattern I didn't identify."

2. **Intangible heritage** (°) — A single footnote listing references across traditions elevated into a unified heritage value. Expert validated: "a new beautiful insight not written before."

3. **Classification failure** (should have been 💭, was unmarked) — "Hierarchically organized network" introduced structural language absent from any source. Expert caught it; AI acknowledged overreach. Demonstrates that notation depends on expert governance — the AI's self-classification is approximate.

## Activation in Bot Prompt

The notation system activates at two levels:

1. **Global** — The Notation Key table defines the three tiers and applies to all stages
2. **Per-stage** — Stage 1 and Stage 2 explicitly mark which analytical moves produce ° and 💭 output:
   - Stage 1: contexts emerging from unique description (°), reading between the lines (💭), surprising convergences (°)
   - Stage 2: values inferred from cross-context analysis (°), values from reading between the lines (💭)

Without per-stage activation, the notation key exists but the AI has no instruction connecting "go beyond explicit" to "mark it." The activation bridges this gap.
