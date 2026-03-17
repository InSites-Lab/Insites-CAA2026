# CBSA UX & HITL Review

Review a CBSA bot prompt (like InSites-CAA-mono.md) or a generated artifact (KG, Dashboard, Timeline) through the lens of user experience, HITL effectiveness, and insight generation. The goal is to ensure the system produces outputs that create genuine understanding — not just structural completeness.

## When to Use

- After modifying a CBSA bot prompt — to check that changes won't degrade workshop UX
- After generating an artifact — to evaluate whether it meets quality standards
- When planning a new version — to audit the current version's experiential quality
- When comparing two versions — to assess which produces better dialogue
- Periodically as a health check before deployment

Works with: bot prompt files (.md), generated artifacts (HTML, JSX), conversation transcripts, or descriptions of observed behavior.

## Philosophy

The system is called **InSItes** because its purpose is generating **insight** — not just assessment structure. Every output the bot produces should pass a simple test: *did the user learn something they didn't know before reading this?*

Workshop participants have 4 hours. They arrive curious, not expert. The experience must build momentum — each stage should feel like progress, not bureaucracy. The HITL pauses are where the real learning happens: not when the bot talks, but when the user *thinks* about what the bot said and decides what to do next.

**The enemy is not incompleteness — it's density without clarity.** A structurally perfect output that takes 3 minutes to parse is worse than a slightly incomplete one that communicates in 30 seconds and invites the user to fill the gap.

## Process

### Step 1: Read the Material

Read the prompt file or artifact code thoroughly. Understand:

1. **What the user will see** — mentally simulate the output for a realistic heritage site
2. **Where the user will pause** — HITL moments, decision points, artifact interactions
3. **What the user will feel** — momentum, confusion, overwhelm, insight, agency
4. **What the user will do next** — and whether the output makes that action obvious

### Step 2: Evaluate Through 13 Lenses

Organize findings into three groups. Not every lens will produce findings — skip lenses that aren't relevant rather than forcing observations.

---

#### Group A: Dialogue UX (the chat experience)

**Lens 1: Cognitive Load**
- Can a workshop participant scan each stage output in ~30 seconds and identify what matters?
- Is information layered (headline → evidence → nuance) or delivered as a wall?
- Are tables scannable? Do they have too many columns, too many rows, or too-dense cells?
- Is notation (°, source citations, evidence types) helping comprehension or creating visual noise?
- Rule of thumb: if a participant needs to re-read a paragraph to understand it, it's too dense.

**Lens 2: HITL Dialogue Quality**
- Do reflection questions provoke genuine thought — or just "looks good, continue"?
- Are questions anchored in *this specific site's* content, not generic heritage philosophy?
- Does the HITL pause come at a moment when the user has something meaningful to contribute?
- Is there enough space between the analytical content and the pause for the user to form their own opinion before being asked?
- Critical test: would an archaeologist reading the reflection question want to *argue* with it? If yes — good. If they'd just nod — too safe.

**Lens 3: Flow & Momentum**
- Does the stage progression build energy or drain it?
- Is there a "Stage 3 wall" problem — where energy drops after the novelty of Stages 0-1 wears off?
- Are transitions between stages smooth? Does each CSR Brief reconnect the user to where they are?
- Is the overall arc satisfying? Does Stage 5 feel like an arrival, not just another output?
- Workshop-specific: can a facilitator predict timing? Are some stages disproportionately heavy?

**Lens 4: Insight Density**
- Does every paragraph earn its place by generating a genuine insight about this site?
- Are there sections that restate what the user already uploaded, without adding analytical value?
- Is the analysis *surprising* anywhere? Does it surface something the user hadn't noticed in their own material?
- Is the context-effect analysis producing actual two-way insights, or just restating contexts as values?
- LIM check: could any section be shorter without losing insight? "Optimal, not minimal."

**Lens 5: Visual Breathing Room**
- Is there enough whitespace between sections? Between table and prose? Between analysis and HITL prompt?
- Are formatting devices (bold, emoji, tables, code blocks) used consistently and sparingly?
- Do status lines and stage markers create orientation, or are they lost in the text?
- Is the notation key (°, citations) lightweight enough to be useful without cluttering every sentence?

**Lens 6: Actionability**
- After reading each stage output, does the user know what they *can* do? (correct, challenge, add data, skip, expand)
- Are the "Before Moving On" prompts specific enough to guide action?
- When the bot flags a gap or uncertainty, does it suggest a concrete next step?
- Can the user exercise real agency — or does the flow push them toward "continue" regardless?

---

#### Group B: Artifact-Dialogue Integration (the handoff)

**Lens 7: Artifact Timing**
- Is each artifact offered at the right moment — when the user has enough context to appreciate it?
- Would the artifact make more sense earlier or later in the flow?
- Is the offer phrased as a genuine choice, not a formality? Does the user understand what they'll get?
- Is there a clear "you're done with analysis, now let's visualize" transition?

**Lens 8: Artifact-Dialogue Handoff**
- Does the artifact extend the conversation or interrupt it?
- After viewing an artifact, can the user return to dialogue without losing their thread?
- Does the artifact generate new questions that feed back into the dialogue?
- Is the Context Effect Clarification Offer (KG) genuinely educational, or just more text?

**Lens 9: Artifact Self-Sufficiency**
- Can the artifact be understood on its own — shared with a colleague, exported, revisited a week later?
- Does it include enough context (title, legend, labels) to stand without the chat above it?
- If exported or screenshotted, does it still communicate its core message?

**Lens 10: Artifact Insight Yield**
- Does the artifact reveal something the text didn't?
- KG: does it surface *relationships* and *network structure* that linear text compressed?
- Dashboard: does it surface *patterns across stages* that sequential reading obscured?
- Timeline: does it make *temporal gaps and clusters* visible?
- If the artifact just reformats the same words into boxes — it's not earning its place.

---

#### Group C: Artifact Craft (the artifact as a product)

**Lens 11: Artifact UX Quality**
- Layout: is information organized logically? Is the visual hierarchy clear?
- Spacing: is there room to breathe, or is it cramped?
- Typography: readable sizes, appropriate contrast, consistent hierarchy?
- Interaction: do clicks, hovers, and selections give clear feedback?
- Responsiveness: does it work at different viewport sizes?
- Polish: does it feel crafted and intentional — or auto-generated?
- 10-second test: can the user orient themselves within 10 seconds of seeing the artifact?

**Lens 12: Artifact Simplicity**
- Is the code minimal and effective? No dead features, unused imports, over-abstracted components.
- Could this be simpler and still do the job? (the `/simplify` lens)
- Are there interactions that exist but nobody would discover without documentation?
- Is every UI element earning its screen space?
- Performance: does it render smoothly, or does D3 force simulation stutter?
- Applies the same principle as LIM: optimal, not minimal — the right weight for the job.

**Lens 13: Visual Language Coherence**
- Do all artifacts feel like they belong to the same product family?
- **Design anchor**: The Assessment Dashboard (stone/amber palette, serif typography, hybrid light/dark theme) is the current reference point for visual identity. Other artifacts should converge toward this language — not the other way around.
- Check: palette consistency, card styles, typography scale, spacing rhythm, interaction patterns (hover, click, select), color semantics (what does green/red/amber mean across artifacts).
- When reviewing a specific artifact, cross-reference against the Dashboard-review-skill (InSites-Brain/Claude/skills/Dashboard-review-skill.md) for detailed visual and interaction standards.
- Known gap: KG uses a dark chrome palette that diverges from the Dashboard's hybrid theme. This is a coherence debt to track.

---

### Step 3: Prioritize and Write the Report

Not all observations are equal. Prioritize by impact on the **workshop participant's experience**.

## Report Structure

```markdown
# CBSA UX & HITL Review: [file or artifact name]

## Quick Summary
<!-- 3-5 sentences: what works well experientially, and the single biggest UX concern -->

## Findings

### Critical (blocks good workshop experience)
<!-- Findings that would cause confusion, overwhelm, or lost momentum -->

#### [Finding title]
**What the user experiences:** Describe the moment from the participant's perspective.
**Why it matters:** What insight or flow is lost.
**Recommendation:** What to change, with reference to specific lines/sections.

### Important (degrades but doesn't block)
<!-- Findings that reduce quality but participants can work through -->

### Polish (refinements)
<!-- Nice-to-haves that would elevate the experience -->

## What Works Well
<!-- Genuinely good experiential design worth keeping. Be specific. -->

## Coherence Notes
<!-- Cross-artifact observations: visual language gaps, interaction pattern differences, palette drift -->
<!-- Reference Dashboard-review-skill for detailed standards -->
```

### Guidelines for Good Findings

- **Write from the user's perspective.** Not "Stage 2 template has too many rows" but "A workshop participant seeing the Stage 2 table for the first time has to parse 6 columns before reaching the value point — by then they've lost the thread."
- **Be specific.** Reference line numbers, section names, exact phrasing.
- **Explain the experiential consequence.** Not just "too dense" but "the participant will skim past the context-effect because it's buried in the third sub-bullet of a 4-level list."
- **Ground recommendations in the InSites philosophy.** The fix should generate more insight, not just less text.
- **Distinguish workshop vs. later use.** Some density is fine for expert repeat users but deadly in a 4-hour workshop. Flag which findings are workshop-critical vs. general improvement.
- **Reference the Dashboard-review-skill** when findings relate to artifact visual quality, interaction design, or data storytelling.

### What NOT to Do

- Don't review for structural completeness or cross-reference integrity — that's a different tool.
- Don't recommend adding features. The review improves what exists.
- Don't optimize for AI performance (token count, prompt engineering tricks). Optimize for human experience.
- Don't suggest "dumbing down" the methodology. The goal is clear communication of sophisticated analysis — not simplification.
- Don't review code quality or engineering concerns — this is an experience review. (Use `/simplify` for code quality; Lens 12 is about whether complexity serves the user, not whether the code is clean.)
