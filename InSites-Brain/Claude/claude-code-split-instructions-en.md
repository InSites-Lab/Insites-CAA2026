# Instruction for Claude Code: Split CBSA Master Prompt into Projects Architecture

## Context

I currently have a single master-prompt file that powers a CBSA project on Claude.ai. The file contains the full method: persona, governance, stages 0–6, appendices (CA-V, CA-C, CA-EC, CA-HE), post-assessment applications (CA-KG, CA-DB, MA-RA, MA-RC), and quality rules.

The problem: the entire prompt loads into context for every conversation, even when only a small portion is relevant. This causes the bot to rely on general patterns rather than the precise spec when a specific task is invoked (e.g., generating a KG based on the significance statement).

The goal: split the file so loading can be targeted — a thin core file always in context, and sub-files loaded only when needed.

## Design Preferences

1. **Optimality, not imitation.** If the right Claude organization happens to resemble the Custom GPT structure — fine. If it differs — also fine. Don't force artificial parallelism. The only criterion: what's the right architecture for Claude Projects.

2. **No character limit on the Project prompt.** No need to squeeze everything to 8000 chars like GPT. But **there is a cognitive limit** — the longer the core prompt, the more the bot leans on it instead of reading dedicated files. Aim: thinnest possible core *without losing essential context*.

3. **Criterion for what goes where:**
   - **In core (always in context):** content the bot must act on in every interaction, regardless of the specific stage. Examples: persona, language policy, evidence mandate, LIM rules, epistemic notation, global governance, trigger table.
   - **In on-demand files:** content invoked only in a specific context. Examples: detailed spec of a particular stage, KG/Dashboard spec, technical appendices, Hebrew overlay.

4. **Enforce active reading.** The core must contain an explicit, firm instruction along the lines of "Before starting stage N, you **must** read stage-N-spec.md. Do not rely on memory of the spec." Phrased as a lock state, not a recommendation.

5. **Self-check instruction for artifacts.** Before generating a KG, Dashboard, or any interactive artifact, the bot must declare three requirements from the spec it's about to implement, and only then begin. This forces active retrieval from the spec instead of pattern-reliance.

## Task

Take the original file and execute:

### Step A — Mapping

Go through the original file and produce a map: for each content block (persona, governance, stages 0–6, session report, CA-KG, CA-DB, MA-RA, MA-RC, CA-V, CA-C, CA-EC, CA-HE, etc.) — classify:

- **C (Core)** — must always be in context
- **S (Stages-bundle)** — part of the unified stages file, loaded on any stage activity
- **A (Application)** — loaded only when the application is invoked (KG, Dashboard, MA-RA, MA-RC)
- **R (Reference)** — loaded on-demand when used (CA-V, CA-C, CA-EC, CA-HE)

Present the table before continuing. **Wait for my approval before Step B.**

### Step B — Split

Based on the approved map, create the following file structure under a new directory `cbsa-split/`:

**Single core file:**
- `cbsa-core.md` — the prompt to be pasted into the Project prompt on Claude.ai

**Stages file (single, containing all stages):**
- `cbsa-stages.md` — stages 0–6 plus Session Report [CA-IP]

*Rationale for single file: stages cross-reference each other throughout (stage 2 anchors in stage 1 contexts; stage 3 stress-tests stage 2 values; stage 5 weaves all prior stages). Users navigate non-linearly — going back to revise a stage, running a single stage for testing, jumping between stages — and the bot needs awareness of the full process even when working on one part. A single file supports all of these patterns; separate files would require multiple loads or risk operating without context.*

**Application files (one per application):**
- `ca-kg-knowledge-graph.md`
- `ca-db-dashboard.md`
- `ma-ra-read-assessment.md`
- `ma-rc-read-collection.md`
- `ca-db-c-collection-dashboard.md` (if relevant as a separate file)

**Appendix files (by usage pattern):**
- `appendix-values-contexts.md` (CA-V + CA-C + CA-T + CA-CS + CA-EV)
- `appendix-entity-categories.md` (CA-EC)
- `appendix-hebrew-overlay.md` (CA-HE)
- `appendix-nara-grid.md` (SM-3)
- `appendix-examples.md` (CA-E)
- `appendix-image-analysis.md` (CA-IMG)

If there are blocks that don't fit these categories — propose a structure.

### Step C — Loading instructions in core

In `cbsa-core.md`, add a loading-instructions block in a prominent place (near the top of the file). Phrasing must be firm. Style example:

```
## File Loading Instructions — Mandatory

Before each of the following actions, you must read the relevant file from the
Project files. Do not act from memory of the spec. The files are the authoritative source.

| Trigger | File to load |
|---------|--------------|
| Starting any stage (0-6), revisiting a stage, or running a single stage | cbsa-stages.md |
| "kg", "knowledge graph" | ca-kg-knowledge-graph.md |
| "dashboard" | ca-db-dashboard.md |
| "read assessment" | ma-ra-read-assessment.md |
| "read collection" | ma-rc-read-collection.md |
| Using a value per [CA-V] | appendix-values-contexts.md |
| Hebrew output | appendix-hebrew-overlay.md |
| Nara Grid | appendix-nara-grid.md |
| Image analysis | appendix-image-analysis.md |

Before generating an artifact (KG/Dashboard/other), explicitly declare three
requirements from the spec you're about to implement. Only then begin generating.
```

### Step D — Integrity check

After the split, verify:

1. **No duplications:** If content is in core, it should not appear in a stage file. If in a stage file, not in another file.
2. **Nothing fell out:** Every content block from the original file appears in one of the new files. No line lost.
3. **Internal references work:** If one file says "see [CA-V]" — must clarify which file it's in now. Update all references to the format: "see appendix-values-contexts.md".
4. **Each file is cognitively self-contained:** Someone reading ca-kg-knowledge-graph.md alone, without other files, should understand what to do (except for data-extraction context that comes from the stages).

Create a `VERIFICATION.md` file reporting these checks: list of duplications found and resolved, list of blocks preserved and where they went, list of references updated.

### Step E — README

Create a short `README.md` explaining:
- Architecture (core + on-demand loaded files)
- How to install: what goes into the Claude.ai Project prompt (content of `cbsa-core.md`), what goes into Project files (everything else)
- How to maintain: changes to a stage spec are made only in that stage's file, not in core

## Hard Constraints

- **Do not change content.** The split is organizational only. Phrasing, examples, and instructions are preserved verbatim. The only changes are adding loading instructions in core and updating internal references.
- **Preserve language.** If a block was written in Hebrew — keep it in Hebrew. If in English — keep it in English. (The master prompt is mostly English; the Hebrew overlay [CA-HE] is in Hebrew.)
- **Preserve format.** If something was a Markdown table — keep it a table. If a list — a list.
- **Don't improve.** If something looks redundant or compressible — don't touch it. This is not a content optimization task, only organizational. Any improvement request comes from me separately.

## Expected Output

Full file tree under `cbsa-split/`:

```
cbsa-split/
├── README.md
├── VERIFICATION.md
├── cbsa-core.md
├── cbsa-stages.md
├── apps/
│   ├── ca-kg-knowledge-graph.md
│   ├── ca-db-dashboard.md
│   ├── ma-ra-read-assessment.md
│   └── ma-rc-read-collection.md
└── appendices/
    ├── appendix-values-contexts.md
    ├── appendix-entity-categories.md
    ├── appendix-hebrew-overlay.md
    ├── appendix-nara-grid.md
    ├── appendix-examples.md
    └── appendix-image-analysis.md
```

Note on subdirectories: Claude Projects has a flat file structure (no real subdirectory hierarchy in uploaded files). The subdirectories above are a logical organization to help Claude Code think in categories. The user will upload them as flat files. If you prefer a flat structure in the split output to mirror the deployment target, that's acceptable — just tell me before Step B.

## Checkpoints

- **After Step A (Mapping)** — Present the table. Wait for approval.
- **After Step B (Split)** — Present the file tree and 3-5 example splits you made. Wait for approval.
- **After Step D (Integrity)** — Present VERIFICATION.md. Wait for approval.
- **Step E (README)** — Execute automatically at the end.

Do not run sequentially without pauses. Better to stop early and surface a problem than waste work on a structure I won't approve.
