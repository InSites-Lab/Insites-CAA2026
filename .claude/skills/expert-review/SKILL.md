---
name: expert-review
description: Launch a parallel expert panel (2-3 specialized agents) to review a file from multiple professional perspectives. Use for bot prompts, artifacts, specs, or any document that benefits from multi-lens critique. Trigger on "expert review", "team review", "review with experts".
user-invocable: true
---

# Expert Team Review

Launch a simulated expert panel to review a target file from multiple professional perspectives simultaneously.

## When to Use

- Before deploying a new bot prompt version
- After major edits to check for blind spots
- When reviewing artifacts (dashboards, KGs) for quality
- When planning workshop content or session design
- Any document that needs multi-perspective critique

## How It Works

1. User provides: target file + review focus (optional)
2. Skill launches 2-3 Explore agents IN PARALLEL, each with a specific expert persona
3. Each agent reads the same file but reviews through their lens
4. Results are synthesized into prioritized, actionable findings

## Default Expert Panel (adapt per task)

| Expert | Focus | Best for |
|--------|-------|----------|
| **UX Designer** | Chat readability, visual rhythm, cognitive load, progressive disclosure, mobile | Bot prompts, artifacts, dashboards |
| **Prompt QA Engineer** | Instruction conflicts, redundancy, Sonnet attention, missing guardrails, format examples | Bot prompts, system prompts |
| **Heritage Pedagogy Expert** | CBSA methodology, time budget, energy curve, participant agency, HITL quality | Workshop content, session design |
| **Visual Communication Expert** | Information density, scanning aids, emojis, typography, table design | Artifacts, output formatting |
| **Domain Expert** (heritage/archaeology) | Methodological precision, value taxonomy, evidence standards, terminology | CBSA content, assessment quality |

## Process

### Step 1: Select Panel
Based on the review focus, select 2-3 experts (max 3 for efficiency).
- Prompt review → UX + Prompt QA + Heritage Pedagogy
- Artifact review → UX + Visual Communication + Domain
- Workshop design → Heritage Pedagogy + UX + Domain

### Step 2: Launch Parallel Agents
Each agent gets:
- The target file path
- Their expert persona description
- 4-6 specific review questions tailored to their expertise
- Instruction to return SPECIFIC, ACTIONABLE findings (not generic advice)

### Step 3: Synthesize
Collect all agent outputs. Identify:
- **Convergence**: Issues flagged by 2+ experts (highest priority)
- **Unique catches**: Issues only one expert spotted (check validity)
- **Conflicts**: Where experts disagree (flag for user decision)

### Step 4: Report
Present findings as a prioritized action list:
- Critical (convergence across experts)
- Important (single expert, high confidence)
- Nice-to-have (improvements, not blockers)

## Customization
User can specify custom experts: "review with a conservation architect and a museum curator"
— the skill adapts persona descriptions accordingly.
