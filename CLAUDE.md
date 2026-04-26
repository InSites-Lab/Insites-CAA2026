# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **InSites Knowledge Lab — CAA Workshop** repository. It is an AI-first research project for **Cultural Heritage Significance Assessment (CBSA)**, combining multi-platform LLM integration, knowledge graph visualization, and structured methodology documentation. There is no traditional build system, package manager, or compiled code.

The project is an output of the **InSites Knowledge Lab**, which develops computational methods for evidence-based heritage assessment at the intersection of Assessment Methods, Novel Technologies, and Built-Heritage Data. The workshop tool (Atar.Bot) is a research prototype — see `management/InSites_Budget_20260208 (1).docx` for full lab rationale.

## Platform Development Guide

For all platform-specific development rules (GPT, Claude, Gemini), cross-platform sync policies, and the convergence principle, see `InSites-Brain/CLAUDE.md`.

## Repository Structure — Active vs Inactive

**IMPORTANT**: Do NOT read, suggest changes to, or reference ⛔ items unless explicitly asked. All `OLD/` folders everywhere are archived and excluded via `.claudeignore` + `.gitignore` (`**/OLD/`).

### ✅ ACTIVE CODE — workshop-site/

Live companion site at `alephplace.com/CAA26`. Vite + React + TypeScript + Tailwind.

```
workshop-site/
  App.tsx, index.tsx, index.css, index.html   # Entry points
  components/                                  # React UI (layout/, views/, graph/, mobile/, modals/, common/)
  hooks/                                       # Custom hooks
  services/                                    # geminiService.ts
  utils/                                       # Helpers
  config/                                      # Constants, sample texts
  types.ts, constants.tsx, sampleTexts.ts      # Shared types/data
  public/                                      # Static assets
  docs/                                        # Demo dashboard HTML
  vite.config.ts, tailwind.config.js, tsconfig.json, package.json
```

### ✅ ACTIVE PROMPTS — Deployed to Claude.ai / GPT / Gemini

```
InSites-Brain/
  Claude/InSites-CAA.md                        # Primary Claude bot prompt (skills-split, ~870 lines)
  Claude/InSites-CAA-mono v5.4.md               # Monolithic version (development/testing)
  Claude/skills/*.md                           # 7 Claude.ai Project Skills (on-demand)
  GPTs/                                         # OpenAI GPT spec files (instructions.md + knowledge files)
  GPTs/runtime/                                  # KG frontend engine (deploy to alephplace.com)
  GPTs/tests/                                    # GPT KG test HTML files (EN, HE, CDN)
  GPTs/CAA-GTPs (Claude.ai-Spilts)/             # GPT upload package (frozen backups in Original/)
  Gemini/*.md                                  # Google Gemini bot prompts (4 files)
  agent-for-agents/agent-for-agents-en.md      # "The Architect" meta-agent (en + he)
  agent-for-agents/agent-for-agents-he.md
```

### ✅ ACTIVE — Claude Code skills (.claude/skills/)

```
.claude/skills/agent-builder/SKILL.md          # /agent-builder
.claude/skills/prompt-qa/SKILL.md              # /prompt-qa
.claude/skills/cbsa-ux-review/SKILL.md         # /cbsa-ux-review
```

### 📝 Heritage 4.0 Paper — Submitted (Florence, anonymous review)

Paper: extended abstract submitted to Springer CCIS / Heritage 4.0 Florence conference. Latest draft: `Heritage4.0_V6-2.docm` (gitignored). Status as of 2026-04-26: in anonymous review; URL placeholder in reference [8] will be filled at camera-ready.

**Most of Heritage4.0/ is gitignored (internal). Only `research-tools/` is exposed as paper supplementary, on branch `heritage-4.0.1` (pushed to origin).**

```
InSites-Brain/Heritage4.0/                       (gitignored at root, except research-tools/)
  Heritage4.0_V6-2.docm                          # Submitted draft (gitignored)
  writing/                                        # Drafts + scaffolds (gitignored)
  source-materials/                               # Source PDFs A, B, C (gitignored)
  research-tools/                                 # PUBLIC supplementary (tracked on heritage-4.0.1)
    README.md                                     # Reader-oriented guide: claim definition,
                                                  #   80%-vs-94% rationale, case study, limitations
    core/                                         # 5 paper-cited files + README
      SKILL.md                                    # Claim-extractor codebook v1.1
      Claim-Level-Count-2303.md                   # 45-claim manual count cited in §4
      claim-extraction-cross-run-comparison.md    # ★ Basis for the 80% finding
      tz-textonly.md                              # Raw session transcript
      tuba-session-transcript.md                  # Cleaned transcript (Stages 0–6 + HITL)
    reproducibility/                              # 5 three-run validation files + README
      claim-extraction-run-{A,B,C}.md             # Three independent extractions
      claim-extraction-{20260325,comparison-20260325}.md  # v1.0 vs v1.1 codebook
    further-reading/                              # 4 narrative analyses + README
      Heritage4_0-Case-Evidence-2303.md           # Demos A/B/C with source tracing
      Manual-vs-Bot-Comparison-2303.md            # Manual SA vs AI-assisted SA
      Tuba-Run-Analysis-2303.md                   # Bot session analysis
      InSites_Observation_Guide.docx              # Expert observation rubric

paper-supplementary/                             (PUBLIC entry point on heritage-4.0.1)
  README.md                                       # Short, points into research-tools/
```

**Active branch for paper supplementary**: `heritage-4.0.1` (3 commits, pushed to `origin/heritage-4.0.1`). Do NOT merge to main pre-acceptance.

**Scope rule (intentional minimum)**: The supplementary is sized for an extended-abstract delivery, with camera-ready iteration to follow. See memory `project_paper_supplementary_state.md` for the deferred-to-camera-ready list (numbers-traceability table, optional inter-rater spot-check, source DOIs, polished prose). Do NOT add these now.

**Claim-extractor skill location**: active copy at `.claude/skills/claim-extractor/SKILL.md` (gitignored, local-only) so Claude Code can trigger it. Reference copy in `Heritage4.0/research-tools/core/SKILL.md` (the public version cited by the paper).

### 📐 REFERENCE — Read-only specs, don't modify unless asked

```
InSites-Brain/design/                          # Source-of-truth workflow specs
  artifact-ux-contract.md                      # [CA-UX] + [CA-AIQ] + [CA-EC] cross-platform visual convergence
  MA-RA-spec-v2.md, MA-RC-spec-v2.md, MA-RC-guide.md
  Single-Dashboard-example.html                # Dashboard reference implementation
  less-is-more.md, prompt-qa-principles.md     # Optimization principles
  Bot-Research-Skiil/                          # [CA-IP] Session Report specs
InSites-Brain/Claude/KG-Skill-en/SKILL.md     # Advanced KG spec (reference only)
InSites-Brain/Claude/plans/                    # Enhancement roadmap
InSites-Brain/CLAUDE.md                        # Cross-platform dev guide
```

### 📦 DATA — Heritage site data, test inputs, benchmark outputs

```
InSites-Brain/sites-data/
  EAC/EAC-DASH/index-eac.html                 # Current collection dashboard
  EAC/small-dataset-4-benchmark/               # MA-RC test data (3 formats)
  EAC/result/                                  # MA-RC reference execution output
  Samples and Sites Descriptions/              # Workshop input samples
  mills-2021.json                              # Mills heritage collection
```

### ⛔ DO NOT READ — Archived, deployed elsewhere, or excluded

```
**/OLD/                                        # All OLD/ folders (gitignored + claudeignored)
InSites-Brain/Claude/KG-artifacts/             # Legacy kg.js — superseded by GPTs/runtime/kg-runtime.js
InSites-Brain/Claude/global-claude-ai-skills/  # Superseded by project skills
management/                                    # Workshop logistics (.claudeignore)
content-dev/                                   # Staging area (.claudeignore)
promptsEngineering/                            # Reference PDFs (.claudeignore)
sakem-li/                                      # Research background (.claudeignore)
```

## Deployment

### KG Frontend (alephplace.com)
Upload to `/atar.bot/canvas/`:
- `InSites-Brain/GPTs/runtime/kg-runtime.js` (vis-network engine, [CA-EC] colors, 3-tab sidebar, RTL/LTR)
- `InSites-Brain/GPTs/runtime/kg-runtime.css` (full UI styling, responsive)

### OpenAI Custom GPT
1. Paste `InSites-Brain/GPTs/CAA-GTPs (Claude.ai-Spilts)/instructions.md` → GPT Instructions field
2. Upload knowledge files from same directory: `cbsa-method.md` (or `cbsa-method-lim.md`), `kg-spec.md`, `dashboard-spec.md`, `dashboard-reference-shape.md`

### Claude Bot (Claude.ai Projects)
- Set `InSites-Brain/Claude/InSites-CAA.md` as the Project prompt
- Add 4 Project Skills from `InSites-Brain/Claude/skills/`:
  - `KG-skill.md` — Knowledge Graph generation
  - `Dashboard-skill-generate.md` — Assessment Dashboard generation
  - `MA-RA-skill.md` — Read-Assessment workflow
  - `MA-RC-skill.md` — Read-Collection workflow
- Optional: `Dashboard-review-skill.md` (UX review tool, not bot-facing)

### Testing KG Rendering

**GPT (vis-network + external runtime):**
- `InSites-Brain/GPTs/tests/test-kg-en.html` — LTR layout, English (loads local runtime)
- `InSites-Brain/GPTs/tests/test-kg-he.html` — RTL layout, Hebrew (loads local runtime)
- `InSites-Brain/GPTs/tests/test-kg-gpt.html` — CDN test (loads from alephplace.com)

**Claude / Gemini (D3 inline):**
- `InSites-Brain/Claude/KG-artifacts/tests/test-kg-claude.html` — D3 + Anthropic API
- `InSites-Brain/Claude/KG-artifacts/tests/test-kg-gemini.html` — D3 + Gemini API placeholder

Verify: correct node colors per [CA-EC] entity type, 3-tab sidebar (Info/Analytics/AI Query), curved arcs with arrows.

### Testing Read Workflows

**MA-RC (Read-Collection):**
- Test data: `InSites-Brain/sites-data/EAC/small-dataset-4-benchmark/EAC11_Collection_FreeText.md`
- Upload to bot, trigger "read collection"
- Expected: Intake (Depth: Rich), Extraction table (15 sites), Collection Reading, stop prompt
- Reference output: `InSites-Brain/sites-data/EAC/result/MA-RC-execution-15sites.md`

**MA-RA (Read-Assessment):**
- Test data: `InSites-Brain/sites-data/Samples and Sites Descriptions/wokshop-shared-assessments/` (4 CBSA outputs as .docx)
- Upload one file, trigger "read assessment"
- Expected: Assessment Profile (coverage table), Reading Menu, selected reading execution
- Dashboard reference: `InSites-Brain/design/Single-Dashboard-example.html`

**Claude.ai Project deployment (v2):**
1. Disable any global skills that overlap (e.g., `cbsa-knowledge-graph`, dashboard review) via Settings → Skills toggle
2. Create a new Claude.ai Project
3. Set `InSites-Brain/Claude/InSites-CAA.md` as the Project prompt (custom instructions)
4. Add 4 Project Skills from `InSites-Brain/Claude/skills/`:
   - `KG-skill.md`, `Dashboard-skill-generate.md`, `MA-RA-skill.md`, `MA-RC-skill.md`
5. Upload test data files to the project conversation
6. Test triggers: "start", "read collection", "read assessment", "kg", "dashboard"
7. See `InSites-Brain/Claude/SETUP-GUIDE.md` for full step-by-step instructions

## Core Architecture

### CBSA Methodology (6 Stages)
The bot system guides users through a structured heritage assessment:
1. **Stage 0**: Preliminary Review (data gaps, material inventory)
2. **Stage 1**: Contexts (historical, spatial, social, political timelines)
3. **Stage 2**: Values (cultural, historical, aesthetic significance)
4. **Stage 3**: Authenticity & Integrity (physical condition, interventions)
5. **Stage 4**: Comparative Analysis (similar assets, regional context)
6. **Stage 5**: Cultural Significance Statement (synthesis)
7. **Stage 6**: Quality Check & Summary

**Critical operating rules embedded in the bot brains:**
- Evidence Mandate: use only user-supplied material, never external sources
- Citation Discipline: every claim sourced with file/page reference
- Human-in-the-Loop: pause after each stage for user review
- Context Effect: bidirectional analysis between contexts and values

### Knowledge Graph (`kg-runtime.js`)
- Canonical vis-network engine in `GPTs/runtime/` (deployed to alephplace.com)
- Auto-detects RTL/LTR from data language
- 15 entity types per [CA-EC], color-coded (defined in `kg-runtime.js` + `kg-runtime.css`)
- 3-tab sidebar: Info, Analytics, AI Query (placeholder mode for GPT)
- Edge types include standard relationships + Context Effect verbs (`frames`, `reframes`)

> **KG architecture — open decision for Phase 2.** Two reference implementations exist:
> - **Bot-Brain [CA-KG]** — simpler Vis.Network template, fewer entity types, no source traceability fields
> - **SKILL.md** — advanced React/D3 template with source traceability (`source_stage`, `source_ref`), AI query interface, context effect visualization (dashed edges)
>
> The entity type taxonomy also differs: [CA-EC] in Bot-Brain defines 13 categories vs. 14 simplified types in SKILL.md. These are **starting points, not the only options** — the final KG architecture may combine elements from both or take a different approach.
>
> KG rendering is **one of the few components with real cross-platform differences**: Claude supports interactive artifacts natively, GPT has canvas with different constraints, and Gemini has limited artifact support. Most other CBSA components (Bot-Brain, HITL, citations) work similarly across platforms.

### Multi-Platform Parallel Versions
Content is maintained in parallel across platforms. When modifying any of these areas, propagate changes to all relevant files:

- **CBSA stage definitions/templates** → `InSites-CAA.md` (Claude), GPT knowledge files, Gemini files
- **Entity types or KG schema** → `SKILL.md`, `kg-runtime.js`, `InSites-CAA.md` appendices [CA-KG] + [CA-EC]
- **Operating rules** (evidence mandate, citation, HITL) → `InSites-CAA.md` (Claude) + GPT `instructions.md`
- **Trigger phrases** → `InSites-CAA.md` (Claude) + GPT `instructions.md`

### Mini-Agent Specs — Read Workflows

Two "Read" mini-agents handle post-assessment analysis. Source-of-truth specs live in `design/`; deployed versions are embedded inline in bot prompts.

| Spec | Purpose | Design (source) | Claude | GPT | Gemini |
|------|---------|-----------------|--------|-----|--------|
| **MA-RA** | Read single assessment | v2 ✓ | — (not yet integrated) | — | — |
| **MA-RC** | Read collection | v2 ✓ | v2 ✓ | v1 ⚠ (pending sync) | v1 ⚠ (pending sync) |

**Dashboards** are separate per workflow:
- **Single-assessment dashboard**: `design/Single-Dashboard-example.html` — reference output for MA-RA
- **Collection dashboard**: `sites-data/EAC/EAC-DASH/index-eac.html` — EAC11 collection visualization (current)

Both dashboards share visual language (stone/amber palette, serif typography) but serve different analytical purposes.

## Security

Snyk is configured with always-on rules (`.github/instructions/snyk_rules.instructions.md`). When writing or modifying any JavaScript (e.g., `kg-runtime.js`):
- Run a Snyk code scan
- Fix any issues found before finalizing
- Rescan to confirm no new issues were introduced

---

## Mono Prompt Versioning

**Convention**: `InSites-CAA-mono-v{major}.{minor}.md` — two levels only.

| Bump | When | Examples |
|------|------|----------|
| **Major** (v2→v3) | Structural change: new/removed stages, reorganized architecture, deployment freeze | Adding a Stage, removing an appendix, final workshop freeze |
| **Minor** (v2.1→v2.2) | Content enhancement: new appendix entries, refined rules, added examples | Doc-tier patch, EAC enhancements, context-effect additions |

**Before bumping**: Ask the user whether to version-bump or keep as-is. Do not auto-rename.

**On bump**: Copy current version to `Claude/OLD/` (gitignored), rename file, update version line inside the file, update all references in `CLAUDE.md`.

---

## Git Permissions

Local git commands (commit, add, status, diff, log, branch, etc.) are auto-allowed in `.claude/settings.json`. Remote operations (push, pull, fetch) still require confirmation.

## Compaction Guidance

When context is compacted, preserve:
- Current task description and which files are being modified
- Which bot prompt version is being edited (mono `InSites-CAA-mono v5.4.md` vs skills-split `InSites-CAA.md`)
- Active platform target (Claude / GPT / Gemini / workshop-site)
- Any cross-platform sync obligations triggered by the current edit

---

## Workshop Development (CAA 2026)

**Workshop date:** 31.3.2026 | **~20 participants** | **4 hours**

Planning documents (primary reference for all development decisions):
- [management/InSites_CAA26_DevPlan_v1.md](management/InSites_CAA26_DevPlan_v1.md) — strategy, tool requirements, architecture options, open decisions
- [management/InSites_CAA26_Timeline_v1.md](management/InSites_CAA26_Timeline_v1.md) — phased milestones with owners and completion criteria
- [management/InSites_Budget_20260208 (1).docx](management/InSites_Budget_20260208%20(1).docx) — Lab rationale and research framework (context only — not for budgeting details)

### Design North Star — 5 Experience Components

Every tool and session decision is evaluated against these five components. When in doubt, prioritize in this order:

1. **CBSA experience** — participants go through structured stages, each building on the last
2. **Human-AI collaboration** — HITL as an explicit value, not a safety guardrail
3. **Design principles in action** — transparency and grounding are shown through the work, not explained upfront
4. **New representations** — KG, timeline, dashboard, narrative create the insight moment
5. **Transfer** — participants leave able to apply the approach (not just the tool) themselves

### Tool Architecture Decision Space

Seven available components that can be combined (A–G):

| Component | Description | Platform |
|-----------|-------------|----------|
| **A** | Bot-Brain improvements (progressive disclosure, status tracking, citation) | All |
| **B** | Interactive artifacts (KG, Timeline, Dashboard, Nara Grid — partially exist) | All |
| **C** | API-in-Artifact (LLM calls from within a rendered artifact) | Claude only |
| **D** | Deep HITL (explicit approval checkpoints, reflection moments) | All |
| **E** | MCP (connections to external tools/databases) | Claude primary |
| **F** | Dedicated web app (full frontend + backend, independent of chat) | Independent |
| **G** | Claude Skills (e.g., existing `cbsa-knowledge-graph` skill) | Claude only |

Four candidate configurations under evaluation:

- **α — evolutionary:** A + B + D — lowest risk, fully cross-platform
- **β — Claude-hybrid:** A + B + C + G — richest Claude experience, not fully cross-platform
- **γ — dedicated system:** F + A — full control and research logging, significant dev time, fallback required
- **δ — targeted hybrid:** A + B + one component (C/E/F) for a specific stage only

**Decision #9 (configuration choice) is the master open decision** — open decisions #10–19 in the DevPlan all depend on it. Resolve this first. See DevPlan §10.6 for evaluation rubric. Default to α if undecided by 3.3.

### Development Timeline

| Phase | Dates | Key output | Hard deadline |
|-------|-------|------------|---------------|
| 1. Configuration decision | 27.2–1.3 | Architecture choice documented (DevPlan §10) | — |
| 2. Tool development | 2.3–20.3 | Bot-Brain, artifacts, research logging | — |
| 3. Workshop content (parallel to 2) | 2.3–20.3 | Demo script (~10.3), participant guide, companion site | **Send materials by 17.3** |
| 4. Integration & dry run | 21.3–27.3 | Full run-through, fallback scenarios validated | — |
| 5. Final prep | 28.3–30.3 | GitHub repo public, backups, logistics | — |
| **Workshop** | **31.3** | | |

**Sync gates:** ~5.3 (Bot-Brain draft reviewed + research mode decided) | ~10.3 (demo script + artifacts ready for testing) | 17.3 (participant materials sent — hard deadline)

### Previous Workshop Lessons (Design Constraints)

These problems were identified from participant feedback and must be addressed in the new tool:

| Problem | Required design response |
|---------|--------------------------|
| Text overload, especially Stage 1 | Progressive disclosure (Component A) |
| Lost orientation — "which stage am I in?" | Persistent status tracker |
| Energy drain toward session end | Deliberate time/energy management in session design |
| Too little visualization | Interactive artifacts (Component B) |
| Inconsistent citations | Reinforced citation mechanism in Bot-Brain |
| Hard to navigate between stages | Safe back-navigation without losing context |

### Ethics in Practice — Agent-for-Agents

`InSites-Brain/agent-for-agents/` contains "The Architect" (v5.1) — a meta-agent that guides participants in building their own AI system instructions. This is the core tool for the **Ethics in Practice** session (Experience Component 5 — Transfer). Three versions:

- `agent-for-agents-en.md` — faithful English translation of the original
- `agent-for-agents-workshop-en.md` — workshop-enhanced version with CBSA design principles menu, reflection moment, multi-platform deployment instructions
- `agent-for-agents-he.md` — Hebrew original

Cross-platform: works on Claude, GPT, Gemini. See DevPlan §11.1 and Timeline task 3.2.
