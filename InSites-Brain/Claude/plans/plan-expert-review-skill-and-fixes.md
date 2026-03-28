# Plan: Expert Review Skill Update + Cross-Platform Fixes

**Date:** 2026-03-28
**Source:** Expert panel review of Gemini v5.3 + skill redesign session
**Status:** Ready for implementation

## Context

Expert team review (Heritage Specialist, UX & Visual Communication, AI Systems Architect) reviewed `InSites-CAA-mono-GEM v5.3.md` and surfaced both Gemini-specific issues and project-wide improvements. This plan covers:

1. **Item 13** — Rewrite the `/expert-review` skill to match InSites team expertise and broaden to full-project review
2. **Items 14a–14f** — Cross-platform fixes surfaced by the expert panel (not covered by the Claude mono v5.3 optimization plan)

The Claude mono v5.3 optimization edits (items 1–12) are in a separate plan: `plan-enhance-bot-v3.md`.

---

## 13. UPDATE SKILL: Expert Review (`.claude/skills/expert-review/SKILL.md`)

Rewrite the existing skill to reflect the InSites team's actual expertise and broaden scope to full-project review.

**What changes:**
- 5 generic experts → 4 InSites team experts (pick 3 per review)
- Single-file review → 3 target types (bot prompts, workshop site, workshop program)
- Auto-detect target type → select best 3 experts
- Add cross-platform drift detection for bot prompt reviews
- Add project file paths so agents know where to look
- Keep convergence/unique/conflict synthesis pattern

**New expert panel (4 experts, select 3 per review):**

| Expert | Lens | Key questions |
|--------|------|---------------|
| **Heritage Assessment Specialist** | CBSA methodology, values taxonomy, evidence standards, context effect, archaeological epistemology | Is the methodology correct? Are stages properly sequenced? Is context effect bidirectional/evaluative? |
| **Learning Designer** | Instructional design, progressive disclosure, energy management, participant agency, HITL quality, session arc | Does the experience build? Where does cognitive fatigue hit? Are reflection moments genuine? |
| **UX & Visual Communication Designer** | Information design, cognitive load, visual coherence, typography, interaction patterns, artifact quality | Is output scannable? Do artifacts share visual language? Is orientation maintained? |
| **AI Systems Architect** | Prompt engineering, instruction optimization, multi-platform deployment, token efficiency, trigger routing, API integration | Are instructions conflict-free? Is token budget efficient? Do triggers fire correctly? Cross-platform drift? |

**Auto-selection by target type:**

| Target | Select these 3 | Skip |
|--------|----------------|------|
| Bot prompt review | Heritage + AI Architect + UX | Learning Designer |
| Workshop site review | UX + Learning Designer + AI Architect | Heritage |
| Workshop program review | Learning Designer + Heritage + UX | AI Architect |
| Cross-platform sync check | AI Architect + Heritage + UX | Learning Designer |

**Target-specific file paths (agents need these):**

Bot prompts:
- Claude: `InSites-Brain/Claude/InSites-CAA-mono v5.3.md`
- Gemini: `InSites-Brain/Gemini/InSites-CAA-mono- GEM v5.3.md`
- GPT: `InSites-Brain/GPTs/CAA-GTPs (Claude.ai-Spilts)/instructions.md` + knowledge files
- Cross-platform guide: `InSites-Brain/CLAUDE.md`
- Design specs: `InSites-Brain/design/artifact-ux-contract.md`

Workshop site:
- Entry: `workshop-site/App.tsx`
- Views: `workshop-site/components/views/`
- Modals: `workshop-site/components/modals/`
- Data: `workshop-site/constants.tsx`, `workshop-site/sampleTexts.ts`

Workshop program:
- DevPlan: `management/InSites_CAA26_DevPlan_v1.md`
- Timeline: `management/InSites_CAA26_Timeline_v1.md`
- Agent-for-agents: `InSites-Brain/agent-for-agents/`

**Cross-platform drift detection (bot prompt reviews only):**
When reviewing any single platform's bot prompt, the agent must also read the corresponding sections in the OTHER platforms and flag divergences in:
- Stage definitions, templates, word counts
- Operating rules (Evidence Mandate, Context Effect, HITL)
- Taxonomies ([CA-V], [CA-C], [CA-T], [CA-EC])
- DQR rules, reflection question counts
- Optional features (Workshop Mode, Epistemic Visibility)
- Artifact specs (KG, Dashboard)

**Relationship to other skills (don't duplicate):**
- `cbsa-ux-review` = deep 13-lens UX audit (single file)
- `prompt-qa` = token efficiency optimization
- `dashboard-ux-reviewer` = dashboard-specific UX
- `expert-review` = big-picture coherence across the whole project

**Report format (unchanged):**
- Convergence (2+ experts flagged) → Critical
- Unique catches (1 expert, high confidence) → Important
- Conflicts (experts disagree) → Flag for user decision

**Customization:** User can still specify custom experts or override auto-selection.

---

## 14. Expert Review Findings — Additional Fixes (from Gemini v5.3 review)

The expert panel review on Gemini v5.3 surfaced issues that also apply to the project broadly. These are NOT Claude mono edits (already covered in items 1–12 in `plan-enhance-bot-v3.md`) — they are additional items for when we sync Gemini or do project-wide fixes.

**14a. API key injection in Gemini Canvas (Gemini-only fix)**
- Line ~2089: `const apiKey = ""` pattern won't work — Gemini Canvas has no key injection
- Fix: Use `postMessage` proxy to host, or disable AI Query in Gemini artifacts with fallback to chat
- Affects: KG [CA-KG] §4j and Dashboard [CA-DB] §9a in Gemini file only

**14b. Upload routing consolidation (all platforms)**
- Lines 55 and 147 in Gemini (and equivalent in Claude/GPT) have overlapping routing rules
- Fix: Merge into single decision tree at first occurrence, delete duplicate

**14c. Trigger disambiguation (all platforms)**
- "review assessment" fires MA-RA even during Stage 3 discussion
- Fix: Add rule — trigger only fires if message includes upload or references uploaded doc; mid-CBSA use is treated as stage discussion

**14d. Stage-jump / rollback mechanism (all platforms)**
- No explicit mechanism for "go back to Stage 1"
- Fix: Add to Governance: "If user says 'go back' or 'change stage X' → acknowledge, jump to that stage, display earlier output, pause for revision"

**14e. Dashboard first-time orientation (all platforms)**
- 11 tabs with no onboarding — workshop participants get lost
- Fix: Before generating, offer choice (quick tour vs full); add orientation sentence when artifact first appears

**14f. Vulnerability matrix legend placement (all platforms)**
- Interpretive callout is below matrix — users miss it
- Fix: Move callout ABOVE matrix, add inline legend (Red=severe, Amber=moderate, Gray=minor)

---

## Verification

### Expert-review skill (item 13)
1. Read `.claude/skills/expert-review/SKILL.md` — confirm 4 experts, 3 target types, auto-selection table, file paths, drift detection
2. Invoke `/expert-review` on a bot prompt — verify 3 agents launch, cross-platform drift is checked
3. Invoke `/expert-review` on workshop-site — verify UX + Learning + AI Architect selected (not Heritage)

### Additional fixes (items 14a–14f)
4. Gemini: Verify API key section uses postMessage proxy or disabled mode (not bare fetch)
5. All platforms: Upload routing is a single decision tree (no duplicate)
6. All platforms: "review assessment" trigger has disambiguation rule
7. All platforms: Stage-jump mechanism exists in Governance section
