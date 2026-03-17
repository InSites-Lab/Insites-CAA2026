# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **InSites Knowledge Lab — CAA Workshop** repository. It is an AI-first research project for **Cultural Heritage Significance Assessment (CBSA)**, combining multi-platform LLM integration, knowledge graph visualization, and structured methodology documentation. There is no traditional build system, package manager, or compiled code.

The project is an output of the **InSites Knowledge Lab**, which develops computational methods for evidence-based heritage assessment at the intersection of Assessment Methods, Novel Technologies, and Built-Heritage Data. The workshop tool (Atar.Bot) is a research prototype — see `management/InSites_Budget_20260208 (1).docx` for full lab rationale.

## Platform Development Guide

For all platform-specific development rules (GPT, Claude, Gemini), cross-platform sync policies, and the convergence principle, see `InSites-Brain/CLAUDE.md`.

## Repository Structure

```
InSites-Brain/         # Core AI system artifacts — DEVELOPMENT FOCUS
  Claude/              # Claude-specific prompts and skills
    InSites-CAA.md     # Master system prompt (current)
    OLD/               # Archived: Bot-Brain-en/he.md (previous versions)
    KG-Skill-en/SKILL.md  # Knowledge Graph skill specification
    KG-artifacts/      # Frontend: kg.js, knowledge-graph.css, test HTML files
  Gemini/              # Google Gemini prompts and configurations
  GPTs/                # OpenAI Custom GPT system prompt and knowledge files
    CAA-GTPs (Claude.ai-Spilts)/  # GPT installation package for Claude.ai Projects
  agent-for-agents/    # "The Architect" — meta-agent for Ethics in Practice session
  design/              # Cross-platform design specs (source of truth)
    MA-RA-spec-v2.md   # Read-Assessment (single) — workflow spec
    MA-RC-spec-v2.md   # Read-Collection — bot instructions spec
    MA-RC-guide.md     # Read-Collection — rationale & workshop usage
    Single-Dashboard-example.html  # Single-assessment dashboard reference
    less-is-more.md    # LIM verbosity reductions
  sites-data/          # Heritage site data — uploadable files, not bot-facing
    EAC/               # EAC11 collection dataset + dashboard
      EAC-DASH/        # Collection dashboard (index-eac.html = current)
      small-dataset-4-benchmark/  # EAC11 test data (3 formats)
      result/          # MA-RC execution output
    Samples and Sites Descriptions/  # Workshop input data
    mills-2021.json    # Mills collection data
  MANIFEST.md          # Artifact deployment guide
management/            # Workshop logistics (excluded from Claude Code via .claudeignore)
.github/instructions/  # Snyk security rules (always-on)
```

## Deployment

### KG Frontend (alephplace.com)
Upload to `/atar.bot/canvas/`:
- `InSites-Brain/Claude/KG-artifacts/kg.js` (universal engine, auto-detects RTL/LTR)
- `InSites-Brain/Claude/KG-artifacts/knowledge-graph.css`

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
Open in a browser to verify:
- `InSites-Brain/Claude/KG-artifacts/test-kg-en.html` — LTR layout, English labels
- `InSites-Brain/Claude/KG-artifacts/test-kg-he.html` — RTL layout, Hebrew labels

Verify: correct node colors per entity type, click-to-info panel, Escape to close.

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

### Knowledge Graph (`kg.js`)
- Universal engine replacing separate `kg-he.js` / `kg-en.js`
- Auto-detects RTL/LTR from data language
- Node types: Asset, Cultural Value, Structure, Place, Event, Period, Person, Group
- Edge types include standard relationships + Context Effect verbs (`frames`, `reframes`)
- Color-coded by entity type (defined in `knowledge-graph.css`)

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
- **Entity types or KG schema** → `SKILL.md`, `kg.js`, `InSites-CAA.md` appendices [CA-KG] + [CA-EC]
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

Snyk is configured with always-on rules (`.github/instructions/snyk_rules.instructions.md`). When writing or modifying any JavaScript (e.g., `kg.js`):
- Run a Snyk code scan
- Fix any issues found before finalizing
- Rescan to confirm no new issues were introduced

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
