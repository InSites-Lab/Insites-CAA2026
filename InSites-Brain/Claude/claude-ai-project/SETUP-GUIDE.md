# InSites-CAA — Claude.ai Project Setup Guide

This folder contains everything needed to deploy InSites-CAA as a Claude.ai Project. The package is self-contained — no other files from the repository are required.

## Package Contents

| File | Role | Size | When loaded |
|------|------|------|-------------|
| `InSites-CAA.md` | Core prompt (Project Instructions) | ~845 lines | Always |
| `skills/KG-skill.md` | Knowledge Graph [CA-KG] + Entity Categories [CA-EC] | ~210 lines | On "kg", "knowledge graph" |
| `skills/Dashboard-skill.md` | Assessment Dashboard [CA-DB] | ~185 lines | On "dashboard" |
| `skills/MA-RA-skill.md` | Read-Assessment [MA-RA] | ~295 lines | On "read assessment" |
| `skills/MA-RC-skill.md` | Read-Collection [MA-RC] + Collection Dashboard [CA-DB-C] | ~343 lines | On "read collection" |

**Architecture**: The core prompt (~845 lines) is always loaded. Skills are loaded on-demand when their trigger phrases are detected, reducing per-turn token cost by ~43% compared to a monolithic prompt.

---

## Step-by-Step Setup

### 1. Create a New Claude.ai Project

1. Go to [claude.ai](https://claude.ai)
2. Click **Projects** in the sidebar
3. Click **Create Project**
4. Name it: `InSites-CAA` (or your preferred name)

### 2. Set the Project Instructions

1. Open the project settings (gear icon)
2. Find **Custom Instructions** (or **Project Instructions**)
3. Copy the entire contents of `InSites-CAA.md` and paste it into the instructions field
4. Save

### 3. Add Project Skills

For each skill file in the `skills/` folder:

1. In the project settings, find **Skills** (or **Project Skills**)
2. Click **Add Skill**
3. Copy the entire contents of the skill file (including the `---` frontmatter at the top)
4. Paste into the skill editor
5. Save

Add all 4 skills:
- `KG-skill.md`
- `Dashboard-skill.md`
- `MA-RA-skill.md`
- `MA-RC-skill.md`

### 4. Check for Conflicting Global Skills

If you have global Claude.ai skills that overlap with this project's skills, disable them for this project:

1. Go to **Settings → Skills** (global)
2. Look for any skills named `cbsa-knowledge-graph`, `cbsa-assessment-dashboard`, or similar
3. Disable them to avoid conflicts with the project-level skills

### 5. Upload Test Data (Optional)

Upload heritage assessment documents to test the system. Sample files are available in:
- `InSites-Brain/sites-data/Samples and Sites Descriptions/` — workshop input samples
- `InSites-Brain/sites-data/EAC/small-dataset-4-benchmark/` — collection test data

---

## Verification Checklist

Run these 5 tests to confirm the setup works correctly:

### Test 1: CBSA Assessment (Core)
1. Upload a heritage document
2. Type: **"start"**
3. Expected: Stage 0 output with Documentation Profile (7 rows), notation key, HITL pause
4. Confirm: Status line appears at the end of the response

### Test 2: Knowledge Graph (KG Skill)
1. After completing at least Stages 0–2, type: **"kg"** or **"knowledge graph"**
2. Expected: Interactive HTML artifact with D3 force graph, sidebar with Info/Analytics/AI Query tabs
3. Confirm: Light chrome palette (#f8fafc background), entity nodes colored by [CA-EC] type
4. Confirm: Context Effect Clarification Offer appears after the KG

### Test 3: Dashboard (Dashboard Skill)
1. After completing all stages (0–6), type: **"dashboard"**
2. Expected: Self-contained HTML artifact with 8–10 tabs (Overview through Process/KG)
3. Confirm: Light theme throughout (no dark mode), cross-referencing works (click context → values highlight)

### Test 4: Read-Assessment (MA-RA Skill)
1. Upload a completed CBSA assessment document
2. Type: **"read assessment"**
3. Expected: Assessment Profile (coverage table), then Reading Menu with Analytical/Interpretive options
4. Confirm: Menu includes Source-Assessment Fidelity and Context-Effect Audit readings

### Test 5: Read-Collection (MA-RC Skill)
1. Upload a collection document (multiple sites)
2. Type: **"read collection"**
3. Expected: Intake (Depth assessment), Extraction table with site descriptions and significance summaries, Collection Reading, mandatory stop prompt
4. Confirm: Status line shows `📚 Read-Collection · [N] items · Depth: [R/M/T]`

---

## Troubleshooting

| Issue | Likely cause | Fix |
|-------|-------------|-----|
| Skill not triggering | Trigger phrase not recognized | Use exact phrases: "kg", "dashboard", "read assessment", "read collection" |
| Global skill conflicts | Overlapping skill names | Disable global skills with similar names (see Step 4) |
| KG has dark background | Old palette version | Verify KG-skill.md contains §4b Light Chrome Palette |
| Dashboard has dark KG tab | Old hybrid theme | Verify Dashboard-skill.md §6 says "Light theme throughout" |
| Missing readings in MA-RA menu | Outdated skill | Verify MA-RA-skill.md includes Source-Assessment Fidelity and Context-Effect Audit |
| No status line | Core prompt issue | Check InSites-CAA.md Stage Closing section includes status line format |

---

## What's NOT Included

These are **development tools**, not part of the participant-facing bot:

- `Dashboard-review-skill.md` — UX review framework (Claude Code only)
- `prompt-qa-skill.md` — Prompt optimization tool (Claude Code only)
- `agent-builder-skill.md` — Workshop agent-building activity (separate setup)

---

## Version Info

- **Source**: Built from `InSites-CAA-mono-v2.2.md` (monolithic development version)
- **Key v2.2 features**: Documentation Profile, Upload Routing, Outward context-effect dimension, Planning bridge, archaeological integrity, [CA-EV] evidence vocabulary, [CA-IP] Session Report (inline in core), light chrome palette convergence
- **TODO**: Test mono KG output vs advanced SKILL.md (`KG-Skill-en/SKILL.md`) output before workshop to decide if upgrade is worth the token cost
