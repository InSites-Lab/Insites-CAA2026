# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **InSites Knowledge Lab — CAA Workshop** repository. It is an AI-first research project for **Cultural Heritage Significance Assessment (CBSA)**, combining multi-platform LLM integration, knowledge graph visualization, and structured methodology documentation. There is no traditional build system, package manager, or compiled code.

The project is an output of the **InSites Knowledge Lab**, which develops computational methods for evidence-based heritage assessment at the intersection of Assessment Methods, Novel Technologies, and Built-Heritage Data. The workshop tool (Atar.Bot) is a research prototype — see `management/InSites_Budget_20260208 (1).docx` for full lab rationale.

## Platform Development Guide

For platform-specific rendering architecture and cross-platform convergence, see `InSites-Brain/design/contracts/artifact-ux-contract.md` (§5) and `InSites-Brain/Claude/atar-runtime/data-contract.md` (the shared DATA contract). All three platforms (Claude/Gemini/GPT) now render visual products via the shared `atar-runtime`.

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
  Claude/InSites-CAA-claude.md                 # CURRENT live mono — deployed to claude.ai; KG/dashboard artifacts emit the atar-runtime shell
  Claude/atar-runtime/                         # Externalized artifact runtime (vanilla JS: D3 KG + Leaflet/vector map + dashboards); npm `insites-lab`, loaded via cdn.jsdelivr.net/npm/atar-runtime@<ver>
  Claude/InSites-CAA.md                        # Older skills-split prompt (superseded by the mono above)
  Claude/InSites-CAA-mono v5.4.md              # Older monolithic snapshot (pre-runtime; superseded)
  Claude/skills/*.md                           # 7 Claude.ai Project Skills (on-demand)
  GPTs/                                         # OpenAI GPT spec files (instructions.md + knowledge files)
  GPTs/runtime/                                  # LEGACY vis-network runtime (archived; GPT now uses atar-runtime)
  GPTs/tests/                                    # GPT KG test HTML files (EN, HE, CDN)
  GPTs/CAA-GTPs (Claude.ai-Spilts)/             # GPT upload package (frozen backups in Original/)
  Gemini/*.md                                  # Google Gemini bot prompts (4 files)
  agent-for-agents/agent-for-agents-en.md      # "The Architect" meta-agent (en + he)
  agent-for-agents/agent-for-agents-he.md
```

### ✅ Claude Code skills — one loaded home per skill

- **Generic** (global, loaded everywhere) — `~/.claude/skills/` (NOT in repo): `expert-review` (4-expert panel), `dashboard-ux-reviewer`, `lim`, `skill-creator`.
- **Active project** — `.claude/skills/` (tracked via `.gitignore` `!.claude/skills/`): none currently.
- **Archive** (tracked, NOT loaded — `cp` into a skills dir to activate) — `InSites-Brain/skills-archive/`: `expert-review` (versioned source/backup of the global copy) · `agent-builder` (skill name `cbsa-agent-builder`) · `cbsa-ux-review` · `prompt-qa` · `claim-extractor` · `source-refiner`.

> Claude Code scans only `.claude/skills/` (project) + `~/.claude/skills/` (global); `skills-archive/` is deliberately not scanned (backup + on-demand). `expert-review` is generic → runs from global, with its versioned source/backup in the archive. See `InSites-Brain/skills-archive/README.md`.

### 📝 ACTIVE WRITING — Heritage 4.0 Paper (Florence)

```
InSites-Brain/Heritage4.0/
  PROJECT-INSTRUCTIONS.md                      # Claude.ai Project instructions (paste-ready)
  writing/                                     # Direct writing task
    Heritage4_0-Draft-v1.md                    # Paper draft (extended abstract, 6p Springer CCIS)
    Heritage4_0-Draft-v1.docx                  # Same in Springer CCIS template
    Heritage4_0-Adapted-Structure-2303.md      # Section-by-section writing scaffold
    Writing-Plan.md                            # Full plan, methodology, page budget, checklist
    splnproc2510.docm                          # Springer CCIS Word template
    instructions for Authors heritage 4.0.pdf  # Venue submission guidelines
  evidence/                                    # Session-generated analysis (Claude Code output)
    Heritage4_0-Case-Evidence-2303.md          # Source-traced demonstrations + performance profile
    Manual-vs-Bot-Comparison-2303.md           # Manual SA vs AI-assisted SA comparison
    Claim-Level-Count-2303.md                  # 45-claim epistemic analysis (quantitative backbone)
    Tuba-Run-Analysis-2303.md                  # Bot session analysis
    InSites_Observation_Guide.docx             # Expert observation rubric
  source-materials/                            # Case study source PDFs (A, B, C)
```

### 📐 REFERENCE — Read-only specs, don't modify unless asked

```
InSites-Brain/design/                          # Source-of-truth workflow specs
  artifact-ux-contract.md                      # [CA-UX] + [CA-AIQ] + [CA-EC] cross-platform visual convergence
  MA-RA-spec-v2.md, MA-RC-spec-v2.md, MA-RC-guide.md
  Single-Dashboard-example.html                # Dashboard reference implementation
  less-is-more.md, prompt-qa-principles.md     # Optimization principles
  Bot-Research-Skiil/                          # [CA-IP] Session Report specs
  ca-ll-lessons-loop.md                        # [CA-LL] Lessons Loop mini-agent — CANDIDATE, not in build; depends on [CA-IP]; integrate only on explicit request
  specs/experiential-layer-source-spec.md      # How the bot consumes an experiential-layer source
InSites-Brain/research/                        # Lab research insights & validated methods (cross-paper)
  genius-loci-experiential-method.md           # Experiential knowledge layer -> CBSA (validated, Madatech)
InSites-Brain/Claude/KG-Skill-en/SKILL.md     # Advanced KG spec (reference only)
InSites-Brain/Claude/plans/                    # Enhancement roadmap
InSites-Brain/Claude/atar-runtime/data-contract.md  # Shared cross-platform DATA contract (convergence)
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
InSites-Brain/Claude/KG-artifacts/             # Legacy kg.js — superseded by atar-runtime
InSites-Brain/Claude/global-claude-ai-skills/  # Superseded by project skills
management/                                    # Workshop logistics (.claudeignore)
content-dev/                                   # Staging area (.claudeignore)
promptsEngineering/                            # Reference PDFs (.claudeignore)
sakem-li/                                      # Research background (.claudeignore)
```

## Deployment

### Visual Runtime (atar-runtime — all platforms)
KG + both dashboards render via the shared **`atar-runtime`** npm package, loaded at view time from `cdn.jsdelivr.net/npm/atar-runtime@<ver>` — nothing is uploaded/hosted. The bot emits a thin shell + `DATA` and calls `mount(root, DATA, host)`. (Legacy vis-network/alephplace runtime archived in `InSites-Brain/GPTs/OLD/` + `GPTs/runtime/`.)

### OpenAI Custom GPT
1. Paste `InSites-Brain/GPTs/instructions.md` → GPT Instructions field (≤ 8000 chars)
2. Upload knowledge files from `InSites-Brain/GPTs/`: `cbsa-stages.md`, `cbsa-appendices.md`, `kg-spec.md`, `dashboard-spec.md`, `collection-dashboard-spec.md`, `ma-ra-spec.md`, `ma-rc-spec.md` (all atar-runtime shells — see `GPTs/README.md`). Canvas optional on GPT-5.5 → `/mnt/data` shell fallback.

### Claude Bot (Claude.ai Projects)
- **Current (mono)**: set `InSites-Brain/Claude/InSites-CAA-claude.md` (the live mono) as the Project prompt. Its KG/dashboard artifacts load the externalized **`atar-runtime`** from `cdn.jsdelivr.net/npm/atar-runtime@<ver>` (thin shell + `DATA`, no inline render code) — no Project Skills required.
- **Legacy (skills-split)**: set `InSites-Brain/Claude/InSites-CAA.md` as the prompt and add 4 Project Skills from `InSites-Brain/Claude/skills/`:
  - `KG-skill.md` — Knowledge Graph generation
  - `Dashboard-skill-generate.md` — Assessment Dashboard generation
  - `MA-RA-skill.md` — Read-Assessment workflow
  - `MA-RC-skill.md` — Read-Collection workflow
- Optional: `Dashboard-review-skill.md` (UX review tool, not bot-facing)

### Testing KG Rendering

**GPT (atar-runtime via jsDelivr):**
- `InSites-Brain/GPTs/tests/test-atar-runtime-npm-spike.html` — loads atar-runtime@0.3.4 from jsDelivr, mounts kg/assessment/collection (open in a browser)
- Legacy vis-network tests (`test-kg-en.html`, `test-kg-he.html`, `test-kg-gpt.html`) exercise the archived alephplace runtime

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

### Knowledge Graph (`atar-runtime`)
- Canonical engine = the shared **`atar-runtime`** (vanilla D3 force), loaded from `cdn.jsdelivr.net/npm/atar-runtime@<ver>` — same on Claude/Gemini/GPT
- Auto-detects RTL/LTR from data language
- 15 entity types per [CA-EC], color-coded (owned by the runtime; see `atar-runtime/data-contract.md`)
- 3-tab sidebar: Info, Analytics, AI Query (live on Claude via `window.claude.complete`; copy-to-chat on Gemini/GPT)
- Edge types include standard relationships + Context Effect verbs (`frames`, `reframes`)

> **KG architecture — RESOLVED (2026-06).** Claude renders the KG (and both dashboards) through the externalized **`atar-runtime`** package — a **vanilla-D3** force engine + Leaflet/vector map + dashboard renderers, loaded from `cdn.jsdelivr.net/npm/atar-runtime@<ver>`. The bot emits only a thin React **shell** + a `DATA` object; **never** inline d3/SVG/Leaflet/render code. Enforced by the **mandatory exclusive-shell rule** in the mono (`[CA-DB-F]` + `[CA-KG] §1`): if the runtime fails to load, emit the shell anyway and let its `load-error` branch render — a failed load is a finding, not a reason to hand-roll a renderer.
>
> **Engine per platform (CONVERGED 2026-06):** Claude · Gemini · GPT all = **`atar-runtime`** (vanilla D3) via `cdn.jsdelivr.net/npm`. The shared **`atar-runtime/data-contract.md`** is the one DATA contract; `normalize()` accepts each platform's key aliases. GPT was last to converge (legacy vis-network archived in `GPTs/OLD/`).
>
> KG/dashboards now render through the **same** `atar-runtime` on all platforms; the only differences are the shell wrapper (Claude = React artifact; Gemini/GPT = vanilla HTML) and AI Query (live on Claude via `window.claude.complete`, copy-to-chat elsewhere). Bot-Brain, HITL, citations already work similarly across platforms.

### Multi-Platform Parallel Versions
Content is maintained in parallel across platforms. When modifying any of these areas, propagate changes to all relevant files:

- **CBSA stage definitions/templates** → `InSites-CAA-claude.md` (Claude mono), GPT knowledge files, Gemini files
- **Entity types or KG schema** → `atar-runtime/data-contract.md` (the shared contract for all platforms) + `InSites-CAA-claude.md` appendices [CA-KG] + [CA-EC] + the GPT/Gemini spec files
- **Operating rules** (evidence mandate, citation, HITL) → `InSites-CAA-claude.md` (Claude) + GPT `instructions.md`
- **Trigger phrases** → `InSites-CAA-claude.md` (Claude) + GPT `instructions.md`

> **⚠ Cross-platform drift — OPEN (2026-06-17)**: the **v10.0 epistemic upgrade** (source-doubt + interpretive-depth rungs in the Per-Claim Epistemic Gate) landed in **`InSites-CAA-claude.md` (Claude) only**. NOT yet propagated to GPT (`InSites-Brain/GPTs/`) or Gemini (`InSites-Brain/Gemini/`); the design spec `design/epistemic-notation-for-user-documents.md` still describes the superseded "citation-distinguishes" mechanism. Deferred by decision — review in depth, then propagate to GPT + Gemini and re-sync the spec. See memory `project_epistemic_source_doubt`.

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

Snyk is configured with always-on rules (`.github/instructions/snyk_rules.instructions.md`). When writing or modifying any JavaScript (e.g., the `atar-runtime` source or `workshop-site/`):
- Run a Snyk code scan
- Fix any issues found before finalizing
- Rescan to confirm no new issues were introduced

---

## Mono Prompt Versioning

**Live mono**: `InSites-Brain/Claude/InSites-CAA-claude.md` — **stable filename** (no "CAA", no version in the name, post-workshop). The version lives **inside** the file (the `- version: vX.Y` line near the top) and is frozen with a git tag (e.g. `claude-v10.0`). Two-level `v{major}.{minor}`.

| Bump | When | Examples |
|------|------|----------|
| **Major** (v9→v10) | Structural change: new/removed stages, reorganized architecture, new governance rule, deployment freeze | Epistemic source-doubt gate (v10), adding a Stage, final workshop freeze |
| **Minor** (v10.0→v10.1) | Content enhancement: new appendix entries, refined rules, added examples | Doc-tier patch, EAC enhancements, context-effect additions |

**Before bumping**: Ask the user whether to version-bump or keep as-is. Do not auto-rename.

**On bump**: archive the prior version to `Claude/OLD/` (gitignored), update the in-file `version:` line, commit, and add a `claude-v{major}.{minor}` git tag. Keep the **filename stable** — putting the version in the name churns every reference on each bump.

> History: v9.1 (`InSites-CAA-claude.md`, pre-epistemic, CAA-era) → **v10.0** (`InSites-CAA-claude.md`, epistemic source-doubt + interpretive depth, "CAA" dropped), tag `claude-v10.0`; v9.1 archived in `Claude/OLD/`.

---

## Release Checkpoints

- **`atar-runtime-v0.3.0`** — annotated tag on branch `gpt-gemini-sync` (**not** merged to `main`). The validated externalized-runtime build: mono on `atar-runtime@0.3.0` (D3 KG + dashboards) + the mandatory exclusive-shell rule. Cut 2026-06-04.
- Forward R&D direction (artifact-as-tool / agentic): `InSites-Brain/research/agentic-artifacts-research-agenda.md`.

## Git Permissions

Local git commands (commit, add, status, diff, log, branch, etc.) are auto-allowed in `.claude/settings.json`. Remote operations (push, pull, fetch) still require confirmation.

## Compaction Guidance

When context is compacted, preserve:
- Current task description and which files are being modified
- Which bot prompt is being edited (live mono `InSites-CAA-claude.md` — artifacts via the atar-runtime shell — vs the older skills-split `InSites-CAA.md`)
- Active platform target (Claude / GPT / Gemini / workshop-site)
- Any cross-platform sync obligations triggered by the current edit

---

## Workshop Design — Principles & Lessons

> **CAA 2026 workshop completed 31.3.2026** (configuration landed on **α — A+B+D**). Active context is now the **Technion** workshops — see branch `tec26-atar.bot`. The design principles + lessons below remain the guide; historical CAA planning docs (DevPlan, Timeline, Budget) live in `management/`.

### Design North Star — 5 Experience Components

Every tool and session decision is evaluated against these five components. When in doubt, prioritize in this order:

1. **CBSA experience** — participants go through structured stages, each building on the last
2. **Human-AI collaboration** — HITL as an explicit value, not a safety guardrail
3. **Design principles in action** — transparency and grounding are shown through the work, not explained upfront
4. **New representations** — KG, timeline, dashboard, narrative create the insight moment
5. **Transfer** — participants leave able to apply the approach (not just the tool) themselves

### Previous Workshop Lessons (Design Constraints)

These problems were identified from participant feedback and must be addressed in the new tool:

| Problem | Required design response |
|---------|--------------------------|
| Text overload, especially Stage 1 | Progressive disclosure |
| Lost orientation — "which stage am I in?" | Persistent status tracker |
| Energy drain toward session end | Deliberate time/energy management in session design |
| Too little visualization | Interactive artifacts |
| Inconsistent citations | Reinforced citation mechanism in Bot-Brain |
| Hard to navigate between stages | Safe back-navigation without losing context |

### Ethics in Practice — Agent-for-Agents

`InSites-Brain/agent-for-agents/` contains "The Architect" (v5.1) — a meta-agent that guides participants in building their own AI system instructions. This is the core tool for the **Ethics in Practice** session (Experience Component 5 — Transfer). Three versions:

- `agent-for-agents-en.md` — faithful English translation of the original
- `agent-for-agents-workshop-en.md` — workshop-enhanced version with CBSA design principles menu, reflection moment, multi-platform deployment instructions
- `agent-for-agents-he.md` — Hebrew original

Cross-platform: works on Claude, GPT, Gemini. See DevPlan §11.1 and Timeline task 3.2.
