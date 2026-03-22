# CLAUDE.md — InSites-Brain Development Guide

This file provides guidance to Claude Code when working on the InSites AI assistant across all platforms.

## Core Principle: Convergence by Default

The CBSA method, stage flow (0-6), entity types, KG schema, operating rules, and all analytical content **must be identical across platforms**. Platform-specific differences are exceptions, not the norm. When in doubt, keep it the same everywhere.

## Shared Architecture (do not diverge)

These are identical across GPT, Claude, and Gemini:

- **CBSA Stages 0-6**: stage definitions, templates, output structure
- **5 Critical Rules**: Evidence Mandate, Context Effect, No Generic Definitions, Citation Completeness, Descriptive Precision
- **Entity types [CA-EC]**: 14 categories used for KG node coloring
- **KG schema**: node/edge structure, relationship verbs, sizing tiers
- **Values taxonomy [CA-V]**, Contexts [CA-C], Change types [CA-T]
- **Dashboard data shape**: same structure across platforms
- **Notation key**: (none) / ° / source citations
- **HITL flow**: pause after every stage for user review

## Anchor Tags

`[CA-XY]` tags serve as stable section identifiers throughout the method files. They are critical for GPT RAG retrieval and useful as cross-reference anchors on all platforms.

| Tag | Content | File |
|-----|---------|------|
| `[GB-1]` | CBSA theory / context effect | cbsa-method |
| `[CA-V]` | Values taxonomy | cbsa-method |
| `[CA-C]` | Contexts taxonomy | cbsa-method |
| `[CA-T]` | Change types | cbsa-method |
| `[SM-3]` | Integrity/authenticity theory | cbsa-method |
| `[CA-CS]` | Comparison criteria | cbsa-method |
| `[CA-EC]` | Entity categories (14 types) | cbsa-method |
| `[CA-KG]` | Knowledge Graph spec | kg-spec |
| `[CA-DB]` | Dashboard spec | dashboard-spec |
| `[MA-RC]` | Read-Collection workflow | cbsa-method |
| `[MA-RA]` | Read-Assessment workflow | design/MA-RA-spec-v2.md (not yet in bot prompts) |
| `[CA-IP]` | Session Report protocol (research) | cbsa-method (InSites-CAA-mono.md) |

Do not rename or remove these tags — they are cross-referenced between files and used by GPT's RAG retrieval.

## Platform Constraints (forced differences)

| Aspect | GPT | Claude | Gemini |
|--------|-----|--------|--------|
| Prompt loading | RAG chunks (needs `[CA-*]` anchors) | Full system prompt | Full system prompt |
| Artifacts | React JSX Canvas | Native artifacts + Skills | Limited |
| AI Query in artifacts | User Gemini key, placeholder in v1 | Built-in API | Built-in |
| Prompt structure | Instructions field + Knowledge files | Project prompt | System instructions |
| File split | System prompt separate from method (RAG) | Can be combined | Can be combined |

## Platform-Specific Options and Features

Capabilities available on some platforms but not all. Use these to enhance specific platform experiences without breaking cross-platform parity.

| Capability | GPT | Claude | Gemini | Status |
|-----------|-----|--------|--------|--------|
| MCP (external tools) | Exploring | Primary | — | Future |
| Skills system | — | Available | — | KG skill exists |
| Actions (server-side API calls) | Available | — | — | Future |
| Extensions | — | — | Available | Unexplored |
| API-in-Artifact | Via user key | Native | TBD | GPT v1 = placeholder |
| Code Interpreter | Available | Available | Available | Used for DOCX export |

When adding a platform-specific feature: implement on that platform only and document the decision here.

## Cross-Platform Sync Rule

When changing **shared content** (stages, rules, entity types, KG schema, dashboard spec):
- Propagate to ALL platform variants
- Files to update: InSites-CAA.md (Claude), GPT instructions + knowledge files, Gemini prompts

When changing a **platform constraint** or adding a **platform-specific feature**:
- Update only that platform
- Document the change in this file

## Directory Structure

```
InSites-Brain/
  Claude/            # Claude.ai bot
    InSites-CAA-mono.md  # Monolithic bot prompt (current working version — edit this first)
    InSites-CAA.md       # Skills-split version (core ~870 lines + 4 skills on demand)
    claude-ai-project/   # Self-contained deployment package (built from mono v2.2)
      InSites-CAA.md               # Core prompt (~845 lines, includes [CA-IP])
      skills/KG-skill.md           # Knowledge Graph [CA-KG] + [CA-EC]
      skills/Dashboard-skill.md    # Assessment Dashboard [CA-DB]
      skills/MA-RA-skill.md        # Read-Assessment [MA-RA]
      skills/MA-RC-skill.md        # Read-Collection [MA-RC] + [CA-DB-C]
      SETUP-GUIDE.md               # Step-by-step deployment instructions
    skills/              # Project Skills (development versions)
      KG-skill.md                  # Knowledge Graph [CA-KG] — merged SKILL.md + CA-KG
      Dashboard-skill-generate.md  # Assessment Dashboard [CA-DB]
      MA-RA-skill.md               # Read-Assessment [MA-RA]
      MA-RC-skill.md               # Read-Collection [MA-RC]
      Dashboard-review-skill.md    # UX review framework (Claude Code tool)
    KG-Skill-en/     # Legacy KG skill (reference — superseded by skills/KG-skill.md)
    KG-artifacts/    # Frontend: kg.js, knowledge-graph.css, test HTML files
  Gemini/            # Google Gemini — prompts, OPAL
  GPTs/              # OpenAI GPT — system prompts, knowledge files
    CAA-GTPs (Claude.ai-Spilts)/  # GPT installation package (upload-ready)
      Original/      # Frozen backup — do not modify
  agent-for-agents/  # "The Architect" — workshop activity: participants build their own AI agent
  design/            # Cross-platform design specs (source of truth for mini-agents)
    MA-RA-spec-v2.md             # Read-Assessment spec (source of truth)
    MA-RC-spec-v2.md             # Read-Collection spec (source of truth)
    MA-RC-guide.md               # Read-Collection rationale + workshop usage
    Single-Dashboard-example.html # Single-assessment dashboard reference
    less-is-more.md              # LIM verbosity reductions
    prompt-qa-principles.md      # Prompt QA method — bot-brain optimization principles
    Bot-Research-Skiil/          # [CA-IP] Session Report protocol (research instrument)
  sites-data/        # Heritage site data — uploadable files, not bot-facing
    EAC/             # EAC11 collection + dashboards
      EAC-DASH/      # Collection dashboard dev (index-eac.html = CURRENT)
      small-dataset-4-benchmark/  # EAC11 test data (3 formats + README)
      result/        # MA-RC execution output (15 sites)
```

## Skill Architecture (v2)

InSites-CAA.md v2 splits the monolithic prompt into a core (~870 lines, always loaded) + 4 Project Skills (loaded on demand when triggered). This reduces the always-loaded token count by ~43%.

| Component | Lines | When loaded |
|-----------|-------|-------------|
| InSites-CAA.md (core) | ~870 | Always |
| KG-skill.md | ~620 | On "kg", "knowledge graph" |
| Dashboard-skill-generate.md | ~200 | On "dashboard" |
| MA-RA-skill.md | ~270 | On "read assessment" |
| MA-RC-skill.md | ~50 | On "read collection" |

**Claude Code Skills** (development tools, not bot-facing):

| Skill | Purpose | Trigger |
|-------|---------|---------|
| Dashboard-review-skill.md | UX review framework | "review dashboard" |
| prompt-qa-skill.md | Bot-brain prompt optimization | "prompt qa", "optimize prompt" |
| agent-builder-skill.md | Workshop agent-building activity | "build agent", "the architect" |

## Mini-Agent Sync Status

| Spec | Design (source) | Claude | GPT | Gemini |
|------|-----------------|--------|-----|--------|
| **MA-RC** (Read-Collection) | v2 ✓ | v2 ✓ | v1 ⚠ | v1 ⚠ |
| **MA-RA** (Read-Assessment) | v2 ✓ | v2 ✓ | — | — |

v1 → v2 differences: v2 adds Depth assessment (Rich/Medium/Thin), structured extraction with 8 fields, Collection Reading synthesis, distinct site-description vs. significance-summary fields, and status line.

## GPT-Specific Notes

GPT knowledge files use RAG retrieval (chunked, not fully loaded). Critical rules must be duplicated in `instructions.md` because RAG retrieval is not guaranteed. The `Original/` folder in the GPT package is a frozen backup of initial versions — do not modify.

## Testing Checklist

**All platforms:**
- Upload a heritage document and say "start" — confirm Stage 0 follows template
- Status line appears at end of every response
- Notation key referenced in output
- HITL pause after each stage

**GPT additionally:**
- Test "kg" trigger → verify React JSX Canvas artifact
- Test "dashboard" trigger → verify HTML Canvas artifact
- Verify anchor tags retrieve correct content after long conversations

**Claude additionally:**
- Test KG Skill invocation
- Verify native artifact rendering

**Gemini additionally:**
- Verify prompt structure works with Gemini's system instructions format
