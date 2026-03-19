---
name: prompt-qa
description: Audit and optimize large system prompts (bot brains, mono files) for token efficiency without losing output quality. Trigger on "prompt qa", "optimize prompt", "audit prompt", "reduce tokens". Uses LIM principle and 7 optimization categories.
user-invocable: true
---

# Prompt QA Optimization

Audit a system prompt file and produce a prioritized edit plan that reduces token count while preserving (or improving) output quality. Follows the LIM principle: **optimal, not minimal**.

## When to Use

- Before deploying a new version of a bot prompt
- When a mono file exceeds ~1500 lines or ~25K tokens
- After adding new features/sections to check for accumulated redundancy
- Periodic health check on prompt efficiency

## Process

### Step 1: Measure

Read the target file. Record:
- Total lines and estimated tokens
- Section inventory (headers, anchor tags, appendices)
- Key concepts list (terms that appear in multiple sections)

### Step 2: Audit Through 7 Categories

For each category, scan the full file and log findings.

#### Category 1: Cross-Reference Deduplication

Find every instance of each key concept. For each instance, determine its **purpose**:
- Primary definition (operational rule)
- Stage-specific application (HOW to apply here)
- Brief reference (1-line reminder)
- Theoretical explanation (for "explain the method" requests)
- Educational context (post-artifact user clarification)

**Decision rule**: Different purposes → keep both. Plain restatement → replace with cross-reference.

**Critical**: Do NOT blindly deduplicate. A concept appearing 7 times may serve 5 distinct purposes. Present the analysis as a table: Location | Purpose | Verdict.

#### Category 2: Standard LLM Behavior

Flag instructions that tell the LLM to do what it does by default:
- "You may explain your reasoning if asked"
- "Use your knowledge to answer questions"
- "If the user asks about the method, explain it"

Remove if deleting would not change behavior.

#### Category 3: Platform-Default Rules

Flag rules enforcing behavior the platform already guarantees:
- "Output tables as Markdown with pipes"
- "Do not wrap tables in code blocks"

If added for a specific edge case (e.g., RTL rendering), recommend archival rather than deletion.

#### Category 4: Theory-Section Condensing

Compare reference/appendix sections against operational sections (stage specs). Content in both:
- Keep in the operational section
- Replace in the reference with a pointer: "See [section] for [topic]"
- Keep ONLY unique content in the reference

#### Category 5: Concise-Rewrite

Flag verbose principles (8+ lines) that can be compressed. Preserve the **test** (how the LLM decides) and the **key constraint** (what must not happen). Cut rationale and obvious implications.

#### Category 6: Missing Operations

Flag missing routing logic or disambiguation rules where the LLM must currently guess. Optimization can mean **adding** lines.

#### Category 7: Safe Archival Candidates

Flag content that should leave the prompt but may be needed later. Recommend archival destination (Claude Code memory, design doc) with re-insertion criteria.

### Step 3: Edit Plan

Present a numbered edit list:

| # | Category | Location | What changes | Lines saved | Risk |
|---|----------|----------|-------------|-------------|------|

Include:
- Pre-step: commit current state before any edits
- Total estimated savings
- Expected final line count

### Step 4: Execute (only after user approval)

Apply edits sequentially. After each, verify surrounding context reads coherently.

### Step 5: Verify

- Line count matches estimate
- Read full flow — coherent without removed content?
- Search key concepts — all still defined somewhere?
- No orphaned cross-references
- Anchor tags still resolve

## Output Format

```markdown
# Prompt QA Report: [filename]

## Metrics
- Lines: [before] → [estimated after]
- Tokens: ~[before] → ~[estimated after]
- Sections: [count]

## Concept Duplication Analysis
| Concept | Instances | Purposes | Verdict |
|---------|-----------|----------|---------|

## Edit Plan
| # | Category | Location | Change | Lines | Risk |
|---|----------|----------|--------|-------|------|

## Anti-Pattern Warnings
<!-- Flag any issues from the anti-patterns list -->

## Recommendation
<!-- Summary: estimated savings, risk level, suggested approach -->
```

## Anti-Patterns (flag if detected)

1. **Blind deduplication** — removing repeated phrases without checking if each serves a different purpose
2. **Externalization fallacy** — moving to knowledge files on platforms where they're always loaded (zero savings)
3. **Over-cutting** — removing rules that guard against specific edge cases
4. **Domain-ignorant cuts** — removing domain-specific repetition that serves professional credibility
5. **No rollback point** — editing without committing the pre-optimization state

## Platform Context

On **Claude.ai Projects**: knowledge files are always loaded (no token savings). Only two strategies reduce per-turn cost:
- **Deduplication** (fewer tokens everywhere)
- **Skills** (on-demand loading — content loaded only when triggered)

On **GPT**: knowledge files use RAG (chunked retrieval). Anchor tags `[CA-XY]` matter for retrieval. Deduplication in RAG chunks can hurt retrieval — be cautious.
