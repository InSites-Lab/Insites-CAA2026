---
name: lim-review
description: Review any output, code, prompt, document, or design through the Less-Is-More (LIM) lens. Trigger on "LIM", "lim", "less is more", or requests to optimize weight/density. Applies the LIM principle — optimal, not minimal — every element must earn its place.
---

# LIM — Less-Is-More Review

## When to trigger

- User says "LIM", "lim", "less is more"
- User asks to optimize weight, density, verbosity, or signal-to-noise of any output
- User asks to review something for conciseness or clarity
- Works on: text, code, prompts, documents, UI copy, API responses, designs — anything with elements that can be evaluated

## The Principle

**LIM means optimal, not minimal.** The right weight for the job — not the least text possible, not the most complete structure imaginable.

Every element must earn its place by doing one of:
1. **Generating insight** — the reader learns something they didn't know
2. **Creating orientation** — the reader knows where they are, what happened, what's next
3. **Enabling dialogue** — the reader has enough to challenge, correct, or extend

**Stays** → if it does any of these, regardless of length.
**Goes** → if it doesn't, regardless of how "standard" it feels.

## What to Cut

- **Ceremony without function**: boilerplate headings, formulaic closings, repeated context, throat-clearing introductions
- **Scaffolding visible to the consumer**: internal organization that leaked into output, process labels the reader doesn't need
- **Redundant decision points**: if a professional judgment can be made, don't ask — do it
- **Defensive verbosity**: restating "just to be safe," caveats that protect the author but slow the reader
- **Standard LLM behavior instructions** (in prompts): telling the model to do what it already does by default

## What NOT to Cut

- **Content that generates genuine thought** — questions, provocations, non-obvious observations
- **Discoverable capabilities** — if the reader would benefit from knowing something exists, mention it
- **Evidence and traceability** — citations, sources, reasoning chains
- **Core analysis** — dense work that produces real insight is not "verbose," it's the product
- **Edge-case rules** (in prompts) — rules that prevent rare but costly failures earn their tokens

## The Test

> **"Does removing this make the reader's next decision easier, or does it just make the output shorter?"**
> Easier → cut. Just shorter → keep.

## Process

When triggered on a target (file, output, text, code, prompt, UI, design):

### Step 1: Read
Read the target completely. Understand its purpose and audience.

### Step 2: Classify
Evaluate every significant element:

| Element | Verdict | Reason |
|---------|---------|--------|
| ... | ✅ Keep | Generates insight: [why] |
| ... | ✂️ Cut | Ceremony: [why] |
| ... | 🔄 Reshape | Good content, bad format: [how] |

### Step 3: Propose
Concrete changes — what changes and why it's optimization, not just reduction. For each change, explain what the reader/user gains.

### Step 4: Summarize
Impact table:

| Metric | Count |
|--------|-------|
| Elements reviewed | N |
| ✅ Kept | N |
| ✂️ Cut | N |
| 🔄 Reshaped | N |
| Net effect | [description] |

## Domain-Specific Applications

### For Prompts / System Instructions
- Apply the 7 optimization categories: cross-reference deduplication, standard LLM behavior removal, platform-default removal, scaffold reduction, defensive verbosity, format compression, dead-code removal
- Measure in tokens when possible — every token loads per turn

### For Code
- Unused imports, dead branches, over-abstracted wrappers for one-time use
- Comments that restate what the code already says
- Abstractions created "for future use" with only one caller

### For UI / Copy
- Labels, tooltips, and instructions that repeat what the interface already shows
- Modals with 3 paragraphs when 1 sentence would orient the user
- Features added "just in case" that no one discovers without documentation

### For Documents / Reports
- Executive summaries that are longer than the content
- Sections that exist because the template has them, not because this document needs them
- Conclusions that restate the introduction without adding synthesis

---

**Critical**: Never cut just to be shorter. LIM is weight optimization, not weight loss.
