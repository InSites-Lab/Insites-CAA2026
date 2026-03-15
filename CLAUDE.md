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
    Bot-Brain-en.md    # Master system prompt (English)
    Bot-Brain-he.md    # Master system prompt (Hebrew)
    KG-Skill-en/SKILL.md  # Knowledge Graph skill specification
    KG-artifacts/      # Frontend: kg.js, knowledge-graph.css, test HTML files
  Gemini/              # Google Gemini prompts and configurations
  GPTs/                # OpenAI Custom GPT system prompt and knowledge files
    CAA-GTPs (Claude.ai-Spilts)/  # GPT installation package for Claude.ai Projects
  agent-for-agents/    # "The Architect" — meta-agent for Ethics in Practice session
  design/              # Cross-platform design specs (LIM, creativity control, etc.)
  sites-data/          # Heritage site data and assessments
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
1. Paste `InSites-Brain/GPTs/atarbot-system-en.md` → GPT Instructions field
2. Upload `InSites-Brain/GPTs/atarbot-master-en.md` → GPT Knowledge file

### Claude Bot (Claude.ai Projects)
- Set `InSites-Brain/Claude/Bot-Brain-en.md` (or `-he.md`) as the Project prompt
- Add `InSites-Brain/Claude/KG-Skill-en/SKILL.md` as a Claude Skill

### Testing KG Rendering
Open in a browser to verify:
- `InSites-Brain/Claude/KG-artifacts/test-kg-en.html` — LTR layout, English labels
- `InSites-Brain/Claude/KG-artifacts/test-kg-he.html` — RTL layout, Hebrew labels

Verify: correct node colors per entity type, click-to-info panel, Escape to close.

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

- **CBSA stage definitions/templates** → `Bot-Brain-en.md`, `Bot-Brain-he.md`, `atarbot-master-en.md`, Gemini files
- **Entity types or KG schema** → `SKILL.md`, `kg.js`, Bot-Brain appendices [CA-KG] + [CA-EC]
- **Operating rules** (evidence mandate, citation, HITL) → all Bot-Brain variants + `atarbot-system-en.md`
- **Trigger phrases** → Bot-Brain variants + `atarbot-system-en.md`

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
