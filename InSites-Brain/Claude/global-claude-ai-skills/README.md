# Global Claude.ai Skills — LEGACY

> **Do not use these files for new projects.** They are superseded by the project-level skills in `Claude/skills/`.

## Contents

- `cbsa-knowledge-graph.skill` — Old KG skill (zip of SKILL.md). **Superseded by `skills/KG-skill.md`.**

## Action Required

When setting up a new Claude.ai Project with InSites-CAA v2:
1. **Disable** `cbsa-knowledge-graph` via the toggle in Claude.ai (Settings → Skills) to prevent trigger conflicts with the new project-level KG skill
2. Add the 4 project skills from `Claude/skills/` instead
3. Re-enable the global skill only if you need the Hebrew RTL KG version outside of a v2 project

## Why

Global skills and project skills with overlapping triggers ("kg", "knowledge graph") can conflict. The v2 project skills contain all the content from these global skills plus additional features (source traceability, Dark Mode palette, Context Effect Clarification Offer).
