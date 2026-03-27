# InSites GPT — Installation Package (v3)

Based on InSites-CAA-mono v3.md (Claude source of truth, March 2026).

## Package Contents

```
📦 InSites GPT Package v3
├── README.md                   ← this file (do NOT upload)
├── instructions.md             ← paste into GPT Instructions field (~7.9K)
├── cbsa-stages.md              ← Knowledge file: Frameworks + Stages 0-6 + [CA-IP]
├── cbsa-appendices.md          ← Knowledge file: All reference appendices
├── kg-spec.md                  ← Knowledge file: Knowledge Graph (React Canvas)
├── dashboard-spec.md           ← Knowledge file: Dashboard + reference data shape
├── ma-workflows.md             ← Knowledge file: MA-RA + MA-RC workflows
├── collection-dashboard-spec.md ← Knowledge file: Collection Dashboard [CA-DB-C]
├── agent-for-agents.md         ← Knowledge file: "The Architect" meta-agent
├── runtime/                    ← KG frontend engine (deploy to alephplace.com CDN)
│   ├── kg-runtime.js           ← vis-network engine (15 entity types, 3-tab sidebar)
│   └── kg-runtime.css          ← Full UI styling (responsive, RTL/LTR)
├── tests/                      ← KG test HTML files (do NOT upload)
│   ├── test-kg-en.html         ← English LTR test (loads local runtime)
│   ├── test-kg-he.html         ← Hebrew RTL test (loads local runtime)
│   └── test-kg-gpt.html        ← CDN test (loads from alephplace.com)
├── CAA-GTPs (Claude.ai-Spilts)/ ← Upload package mirror + frozen backups
│   └── Original/               ← Archived v1 files (reference only)
└── OLD/                        ← Archived (gitignored)
```

## What's New in v3

| Content | v1 Status | v3 |
|---------|-----------|-----|
| [CA-IP] Session Report | Missing | In cbsa-stages.md |
| [CA-EV] Evidence Types | Missing | In cbsa-appendices.md |
| [MA-RA] Read-Assessment | Missing | In ma-workflows.md |
| Stage 0 Documentation Profile | Missing | Added |
| Stage 1 Outward dimension + Planning bridge | Missing | Added |
| Stage 2 Mystery/Enigma + Value Dynamics | Missing | Added |
| Stage 3 Documentary Integrity + Three-State | Missing | Added |
| Stage 5 Hard Stop rule | Missing | Added |
| Stage 6 Context-Effect Planning | Missing | Added |
| KG Light Chrome Palette | Dark mode | Light mode (matches dashboard) |
| Dashboard cross-referencing + readability | Basic | Full spec |
| Language Policy | Basic | Critical, multi-language aware |
| Upload Routing | Missing | Auto-detect CBSA/collection/image |

**Removed files**: `cbsa-method.md` and `cbsa-method-lim.md` (replaced by `cbsa-stages.md` + `cbsa-appendices.md`). `dashboard-reference-shape.md` (merged into `dashboard-spec.md`).

## Installation Steps

### 1. Create the GPT
Go to chatgpt.com → Explore GPTs → + Create → Configure tab.

### 2. Name and Description
- **Name**: InSites
- **Description**: Your expert partner for heritage significance assessment. Upload documents about a built heritage site and InSites will guide you through a structured, evidence-based evaluation — identifying what makes the place culturally significant, how authentic it remains, and how it compares to similar sites. Produces interactive knowledge graphs and visual dashboards.

### 3. Instructions
Open `instructions.md` and paste the entire content into the **Instructions** field.

### 4. Conversation Starters
Add these four:
1. `I have a heritage site to assess — let's start`
2. `Read and analyze this completed assessment`
3. `What is CBSA and how does it work?`
4. `What can you do?`

### 5. Knowledge Files
Upload these 6 files (drag and drop into the Knowledge section):
1. `cbsa-stages.md`
2. `cbsa-appendices.md`
3. `kg-spec.md`
4. `dashboard-spec.md`
5. `ma-workflows.md`
6. `collection-dashboard-spec.md`

**Important**: This leaves 14 slots free for user asset documents during conversations.

### 6. Capabilities
| Capability | Setting |
|-----------|---------|
| Web Search | **ON** (governed by search rules in instructions — default: off unless user requests or stage permits) |
| Canvas | **ON** |
| Code Interpreter & Data Analysis | **ON** (used for DOCX export) |
| Image Generation | **OFF** |

### 7. Test
Upload a heritage document and say "start". Verify:
- [ ] Stage 0 output follows template (summary, documentation profile, checklist, gaps)
- [ ] Status line appears at end
- [ ] Notation key is referenced
- [ ] GPT pauses and asks "Continue to Stage 1?"
- [ ] "kg" trigger → Canvas React KG artifact
- [ ] "dashboard" trigger → Canvas HTML dashboard
- [ ] "read assessment" trigger → MA-RA workflow
- [ ] "read collection" trigger → MA-RC workflow

## Architecture Notes

### Why this split?

**Instructions (always active, ~7.9K)**: Persona, stage flow, 5 critical rules (duplicated for RAG safety), knowledge file index with READ hints, output mode, triggers, global controls abbreviated.

**cbsa-stages.md (RAG-retrieved, ~28.5K)**: Frameworks (CSR, DQR), Global Controls (full), Stages 0–6 with all sub-headers, [CA-IP] Session Report protocol. Retrieved sequentially as assessment progresses.

**cbsa-appendices.md (RAG-retrieved, ~17K)**: All `[CA-XY]` reference appendices. Retrieved by anchor tag when stages reference them (e.g., "READ [CA-V] before Stage 2").

**kg-spec.md (trigger-specific, ~16.3K)**: Full KG React Canvas template. Only retrieved on "kg" trigger.

**dashboard-spec.md (trigger-specific, ~21.8K)**: Dashboard HTML Canvas template + 7-lens UX framework + Ayelet reference data shape (merged from former dashboard-reference-shape.md).

**ma-workflows.md (trigger-specific, ~14.8K)**: MA-RA (read single assessment) + MA-RC (read collection). Only retrieved on workflow triggers.

### Known Limitations vs Claude Projects

1. **RAG ≠ System Prompt**: Knowledge files are chunked and retrieved semantically, not loaded in full. Critical rules are duplicated in Instructions for this reason.
2. **React artifacts**: GPT Canvas supports React JSX. KG uses a React component with imported D3. Dashboard is self-contained HTML.
3. **AI Query is placeholder**: GPT v1 includes the AI Query UI shell but does not execute live API calls. Users ask the GPT in chat to interpret KG/Dashboard data.
4. **Retrieval drift**: If the GPT stops following stage structure in long conversations, remind it: "Read cbsa-stages.md for the Stage X template."

## File Size Reference

| File | Size | Est. Words |
|------|------|-----------|
| instructions.md | 7.9K | ~1,150 |
| cbsa-stages.md | 28.5K | ~4,200 |
| cbsa-appendices.md | 17.0K | ~2,500 |
| kg-spec.md | 16.3K | ~2,400 |
| dashboard-spec.md | 21.8K | ~3,200 |
| ma-workflows.md | 14.8K | ~2,200 |
| **Total** | **~106K** | **~15,650** |
