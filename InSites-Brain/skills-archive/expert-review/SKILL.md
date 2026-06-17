---
name: expert-review
description: Launch 4 parallel expert agents (Heritage, Learning, UX, AI Architect) to review a project's components — system/bot prompts, web app, program/docs, or repo. Trigger on "expert review", "team review", "review with experts".
user-invocable: true
---

# InSites Expert Team Review

Launch the full InSites expert panel (4 agents in parallel) to review any project component for coherence, quality, and workshop readiness.

## When to Use

- Before deploying a new bot prompt version (any platform)
- After major edits to check for blind spots
- When reviewing artifacts (dashboards, KGs) for quality
- When updating bot brain stage specs or taxonomies
- When updating workshop-site content or design
- When updating GitHub documentation or guides for workshop participants
- When planning workshop content or session design
- When checking cross-platform alignment (Claude ↔ Gemini ↔ GPT). **Note:** KG + both dashboards are CONVERGED on the shared `atar-runtime` (D3, jsDelivr) across all three platforms; GPT Canvas may be unavailable on GPT-5.5 → `/mnt/data` shell fallback (never a custom UI).

## How It Works

1. User provides: target (file, component, or target type) + review focus (optional)
2. Skill auto-detects target type (bot prompt / workshop site / workshop program / GitHub repo)
3. Launches **ALL 4 expert agents IN PARALLEL** — each reads the target through their lens
4. Results synthesized into prioritized, actionable findings with convergence analysis

## Expert Panel (4 experts, all parallel)

_Reusable across projects — these four lenses suit heritage / learning / UX / AI-system work; swap personas via **Customization** (below). The example file paths are for the InSites project._

| Expert | Lens | Key Review Questions |
|--------|------|---------------------|
| **Heritage Assessment Specialist** | CBSA methodology, values taxonomy, evidence standards, context effect, archaeological epistemology, heritage management and conservation ethics | Is the methodology correct? Are stages properly sequenced? Is context effect bidirectional/evaluative (not causal)? Are taxonomies ([CA-V], [CA-C], [CA-T]) complete? |
| **Learning Designer** | Instructional design, progressive disclosure, energy management, participant agency, HITL quality, session arc, transfer potential | Does the experience build? Where does cognitive fatigue hit? Are reflection moments genuine (DQR)? Is the 4-hour workshop arc sustainable? |
| **UX & Visual Communication Designer** | Information design, cognitive load, visual coherence, typography, interaction patterns, artifact quality, scanning aids | Is output scannable? Do artifacts share visual language ([CA-UX])? Is orientation maintained? Are tabs/navigation intuitive? |
| **AI Systems Architect** | Prompt engineering, instruction optimization, multi-platform deployment, token efficiency, trigger routing, API integration, governance rules | Are instructions conflict-free? Is token budget efficient? Do triggers fire correctly? Any cross-platform drift? |

**Why 4 not 3:** All agents are read-only Explore agents running in parallel — negligible performance difference vs 3. Four distinct lenses catch more than merging Learning + UX into one overloaded agent.

## Target Types & File Paths

### Bot Prompts
Review the bot brain for methodology, instruction quality, and cross-platform alignment.

**Primary files (InSites example):**
- Claude: `InSites-Brain/Claude/InSites-claude.md` (live mono)
- Gemini: `InSites-Brain/Gemini/InSites-CAA-GEM-v9.3.md`
- GPT: `InSites-Brain/GPTs/instructions.md` + knowledge files in same dir

**Cross-reference (agents must check):**
- Cross-platform rendering + convergence: `InSites-Brain/design/contracts/artifact-ux-contract.md` + `InSites-Brain/Claude/atar-runtime/data-contract.md`
- Skills: `.claude/skills/` (active) + `InSites-Brain/skills-archive/` (archived)

### Workshop Site
Review the companion website for UX, learning flow, and technical quality.

**Primary files:**
- Entry: `workshop-site/App.tsx`
- Views: `workshop-site/components/views/`
- Modals: `workshop-site/components/modals/`
- Data: `workshop-site/constants.tsx`, `workshop-site/sampleTexts.ts`
- Config: `workshop-site/vite.config.ts`, `workshop-site/package.json`

### Workshop Program
Review session design for learning arc, timing, and participant experience.

**Primary files:**
- DevPlan: `management/InSites_CAA26_DevPlan_v1.md`
- Timeline: `management/InSites_CAA26_Timeline_v1.md`
- Agent-for-agents: `InSites-Brain/agent-for-agents/`

### GitHub Repo
Review for workshop effectiveness and post-workshop value.

**Primary files:**
- `README.md`, `CLAUDE.md`, `.claude/skills/`
- Setup guides: `InSites-Brain/Claude/SETUP-GUIDE.md`

**Key questions:**
- Is the repo navigable for workshop participants?
- Can someone who wasn't at the workshop use this repo to learn/apply CBSA?
- Are setup guides, deployment instructions, and sample data findable?
- Is the repo structure self-explanatory or does it need a map?

## Cross-Platform Drift Detection (Bot Prompt Reviews)

When reviewing any single platform's bot prompt, EVERY agent must also read the corresponding sections in the OTHER platforms and flag divergences in:

- Stage definitions, templates, word counts
- Operating rules (Evidence Mandate, Context Effect, HITL)
- Taxonomies ([CA-V], [CA-C], [CA-T], [CA-EC])
- DQR rules, reflection question counts
- Optional features (Workshop Mode, Epistemic Visibility)
- Artifact specs (KG, Dashboard tab structure, Report)

**Rule:** Shared content must be identical across platforms per the convergence principle (`InSites-Brain/Claude/atar-runtime/data-contract.md`). Platform-specific differences (artifact format, API integration) are expected — flag only when shared content diverges.

## Process

### Step 1: Detect Target Type
From user input, identify which target type is being reviewed. If unclear, ask.

### Step 2: Launch 4 Parallel Agents
Each agent gets:
- The target file path(s) for this target type
- Their expert persona description and lens
- 4-6 specific review questions tailored to their expertise AND the target type
- Cross-reference files they must also check
- Instruction to return **SPECIFIC, ACTIONABLE findings** with line numbers — not generic advice

### Step 3: Synthesize
Collect all 4 agent outputs. Identify:
- **Convergence**: Issues flagged by 2+ experts (highest priority)
- **Unique catches**: Issues only one expert spotted (validate before including)
- **Conflicts**: Where experts disagree (flag for user decision)

### Step 4: Report
Present findings as a prioritized action list:
- **Critical** — convergence across experts, blocks workshop quality
- **Important** — single expert, high confidence, clear fix
- **Nice-to-have** — improvements, not blockers

## Relationship to Other Skills

This skill is the **big-picture coherence** review. Other skills go deeper on specific concerns:

| Skill | Focus | When to use instead |
|-------|-------|-------------------|
| `cbsa-ux-review` | Deep 13-lens UX audit | Single bot prompt, detailed UX |
| `prompt-qa` | Token efficiency optimization | Reducing prompt size |
| `dashboard-ux-reviewer` | Dashboard-specific UX + data viz | Single dashboard file |
| `expert-review` | **Project-wide coherence, cross-platform, workshop readiness** | Big picture |

## Customization

User can specify custom experts: "review with a conservation architect and a museum curator" — the skill adapts persona descriptions accordingly while keeping the 4-parallel pattern.
