# Skills Archive (available, NOT loaded)

Tracked-but-inactive Claude Code skills. **Claude Code does NOT scan this folder** — nothing here loads into a session, so these skills never auto-trigger and add zero context overhead. They live here only to stay versioned and recoverable.

## How skills are organized in this repo

| State | Location | Loaded every session? | In git? |
|-------|----------|:---:|:---:|
| **Active** (project) | `.claude/skills/` | ✅ yes | ✅ tracked (via `.gitignore` `!.claude/skills/`) |
| **Archived** (available) | `InSites-Brain/skills-archive/` ← here | ❌ no | ✅ tracked |
| **Generic** (cross-project) | `~/.claude/skills/` (global) | ✅ yes (all projects) | ❌ no |

Rule: a skill lives in exactly **one** of these.

## Activate an archived skill

```
cp -r InSites-Brain/skills-archive/<name> .claude/skills/<name>
```

It loads next session. To deactivate, move it back here. (For the generic `expert-review`, activate into the **global** dir instead: `cp -r InSites-Brain/skills-archive/expert-review ~/.claude/skills/expert-review`.)

## What's archived

| Skill | Purpose |
|-------|---------|
| `expert-review` | 4-expert parallel review panel. **Generic → runs from the global `~/.claude/skills/`; this copy is its versioned source/backup.** Edit here, then `cp` to `~/.claude/skills/expert-review/`. |
| `agent-builder` | "The Architect" — guide participants to build their own AI instructions (workshop "Ethics in Practice"). Skill name: `cbsa-agent-builder`. |
| `cbsa-ux-review` | Review CBSA bot prompts / artifacts for UX, HITL, cognitive load, flow. |
| `prompt-qa` | Audit & optimize large system prompts for token efficiency (LIM + 7 categories). |
| `claim-extractor` | Extract/classify substantive claims from CBSA sessions (paper research). |
| `source-refiner` | Refine heavy heritage source docs into lean, citation-ready material. |

**No active project skills currently** (`.claude/skills/` is empty). `expert-review` is generic → runs from the global `~/.claude/skills/` (its versioned source/backup is here). Other generic skills (`dashboard-ux-reviewer`, `lim`, `skill-creator`) also live in global.
