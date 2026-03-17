# InSites-CAA v2 — Claude.ai Project Setup Guide

## Overview

InSites-CAA v2 uses a **core prompt + 4 Project Skills** architecture. The core prompt (~870 lines) is always loaded. Skills load on demand when triggered, reducing token usage by ~43% compared to the monolithic v1.

| Component | File | Loaded when |
|-----------|------|-------------|
| **Core prompt** | `InSites-CAA.md` | Always |
| Knowledge Graph | `skills/KG-skill.md` | "kg", "knowledge graph" |
| Dashboard | `skills/Dashboard-skill-generate.md` | "dashboard", "summary dashboard" |
| Read-Assessment | `skills/MA-RA-skill.md` | "read assessment", "analyze assessment" |
| Read-Collection | `skills/MA-RC-skill.md` | "read collection", "analyze collection" |

---

## Step 1 — Disable Conflicting Global Skills

If you have any global Claude.ai skills with overlapping triggers (e.g., `cbsa-knowledge-graph`, dashboard review), disable them first:

1. Go to **claude.ai → Settings → Skills** (or Profile → Feature Preview → Skills)
2. Find any InSites/CBSA-related global skills
3. **Toggle them OFF** (do not delete — you may need them for non-v2 projects)
4. Specifically check for:
   - `cbsa-knowledge-graph` — conflicts with `KG-skill.md`
   - Any dashboard review skill — conflicts with `Dashboard-skill-generate.md`

> **Why?** Global and project skills with overlapping trigger phrases (like "kg" or "knowledge graph") can conflict, causing unpredictable behavior.

---

## Step 2 — Create a New Claude.ai Project

1. Go to **claude.ai**
2. Click **Projects** in the left sidebar
3. Click **Create Project** (or **+ New Project**)
4. Name it: `InSites-CAA v2` (or your preferred name)
5. Optionally add a description: *"CBSA Heritage Significance Assessment — structured 6-stage methodology with Knowledge Graph, Dashboard, and mini-agent skills"*

---

## Step 3 — Set the Core Prompt

1. Open the project settings (gear icon or **Edit Project**)
2. Find the **Custom Instructions** (or **Project Instructions**) field
3. Copy the **entire contents** of `InSites-Brain/Claude/InSites-CAA.md` and paste it into this field
4. Save

> **Tip:** The file is ~870 lines. Paste the whole thing — Claude.ai supports long project instructions.

---

## Step 4 — Add the 4 Project Skills

For each skill file in `InSites-Brain/Claude/skills/`, add it as a Project Skill:

1. In the project settings, find the **Skills** section
2. Click **Add Skill** (or **+**)
3. For each of these files, create a new skill by pasting the file contents:

| # | File | Skill name (auto-detected from frontmatter) |
|---|------|----------------------------------------------|
| 1 | `skills/KG-skill.md` | `cbsa-knowledge-graph-v2` |
| 2 | `skills/Dashboard-skill-generate.md` | `cbsa-assessment-dashboard` |
| 3 | `skills/MA-RA-skill.md` | `cbsa-read-assessment` |
| 4 | `skills/MA-RC-skill.md` | `cbsa-read-collection` |

Each skill file has YAML frontmatter with `name`, `description`, and trigger phrases — Claude.ai reads these automatically.

> **Note:** `Dashboard-review-skill.md` is a Claude Code tool (for developers), NOT a bot-facing skill. Do not add it to the Claude.ai project.

---

## Step 5 — Upload Site Data (Optional)

For testing or working sessions, upload heritage assessment documents to the project:

1. In the project, click **Add Content** or use the attachment button
2. Upload PDF, DOCX, or text files containing heritage assessment data
3. The bot will use only the uploaded material (Evidence Mandate)

Test datasets are available in `InSites-Brain/sites-data/`:
- `sites-data/EAC/` — EAC11 collection (15 sites)
- `sites-data/mills-2021.json` — Mills 2021 dataset

---

## Step 6 — Verify Setup

Test these triggers in a new conversation within the project:

| Test | What to type | Expected result |
|------|-------------|-----------------|
| Basic assessment | "start" (with a document uploaded) | Stage 0 output with status line |
| Knowledge Graph | "kg" or "knowledge graph" | Interactive KG artifact |
| Dashboard | "dashboard" | 10-tab assessment dashboard |
| Read-Assessment | "read assessment" | 3-lens interpretive analysis |
| Read-Collection | "read collection" (with multiple sites) | Collection synthesis workflow |
| Self-identify | "what is InSites?" | ~200-word explanation |
| CBSA explain | "what is CBSA?" | ~140-word explanation |

**Checklist:**
- [ ] Status line appears at end of every response
- [ ] HITL pause: bot pauses after each stage for user review
- [ ] Citations reference uploaded documents (not external sources)
- [ ] KG shows correct node colors per entity type
- [ ] Dashboard renders with hybrid light/dark theme

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "kg" triggers the wrong skill | Disable the global `cbsa-knowledge-graph` skill (Step 1) |
| Skill not loading on trigger | Verify the skill's frontmatter has correct trigger phrases |
| Bot doesn't follow CBSA stages | Ensure InSites-CAA.md is set as project instructions, not pasted into a conversation |
| Very long responses / text overload | This is by design for some stages; say "continue" if truncated |
| Bot uses external knowledge | Remind it: "use only the uploaded documents" — Evidence Mandate should prevent this |

---

## Updating

When updating the system prompt or skills:
1. Edit the source files in this repository
2. Copy the updated content into the Claude.ai project settings
3. Skills can be updated individually without touching the core prompt
4. Always test after updates

## File Locations

All source files relative to repository root:

```
InSites-Brain/Claude/
  InSites-CAA.md                          ← Core prompt (paste into Project Instructions)
  skills/
    KG-skill.md                           ← Skill #1: Knowledge Graph
    Dashboard-skill-generate.md           ← Skill #2: Dashboard
    MA-RA-skill.md                        ← Skill #3: Read-Assessment
    MA-RC-skill.md                        ← Skill #4: Read-Collection
    Dashboard-review-skill.md             ← Developer tool only (do NOT add to project)
```
