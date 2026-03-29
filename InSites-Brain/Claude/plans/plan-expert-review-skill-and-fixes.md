# Plan: Expert Review Skill Update + Cross-Platform Fixes

**Date:** 2026-03-28 (updated 2026-03-29)
**Branch:** `dev/InSites-CAA/v5.4`
**Status:** ALL DONE — Items 13 + 14a–14f applied across all platforms

## Context

Expert team review (Heritage Specialist, UX & Visual Communication, AI Systems Architect) reviewed `InSites-CAA-mono-GEM v5.3.md` and surfaced both Gemini-specific issues and project-wide improvements. This plan covers:

1. **Item 13** — ✅ DONE — Rewrote `/expert-review` skill with 4 InSites team experts, 4 target types, all-parallel launch
2. **Items 14a–14f** — ✅ DONE — Cross-platform fixes applied to Claude, Gemini, GPT

The Claude mono v5.3 optimization edits (items 1–12) are in a separate plan: `plan-enhance-bot-v3.md`.

---

## 13. ✅ DONE — Expert Review Skill Rewrite

Applied to `.claude/skills/expert-review/SKILL.md`:
- 4 experts (Heritage Assessment Specialist, Learning Designer, UX & Visual Communication, AI Systems Architect)
- 4 target types (bot prompts, workshop site, workshop program, GitHub repo)
- All 4 agents launch in parallel (not 3-of-4 selection)
- Cross-platform drift detection built into bot prompt reviews
- Project file paths per target type
- GitHub repo target for workshop effectiveness + post-workshop value

---

## 14. ✅ DONE — Cross-Platform Fixes

**14a. ✅ API key injection in Gemini Canvas (Gemini-only)**
- Changed to postMessage proxy pattern with 5s timeout fallback to copy-paste mode

**14b. ✅ Upload routing consolidation (all platforms)**
- Single decision tree at first occurrence, duplicate deleted (Claude, Gemini, GPT)

**14c. ✅ Trigger disambiguation (all platforms)**
- "read assessment" trigger excludes "review assessment"; fires only on upload context

**14d. ✅ Stage-jump / rollback (all platforms)**
- Stage Navigation mechanism added after Upload Routing in all platform prompts

**14e. ✅ Dashboard tab consolidation + map (all platforms) — MAJOR**
- Tab order: Overview → Map → Timeline → Contexts & Values → [Themes] → Integrity → Comparative → Significance → [Report] → [KG] → AI Query
- Process folded into Overview, Vulnerability folded into Integrity, Contexts+Values merged
- Map MANDATORY with secondary markers from Stages 1/4/5
- Map Tab Spec (§4a) and Themes Tab Spec (§4b) added
- First-time orientation prompt added

**14f. ✅ Vulnerability matrix legend (all platforms)**
- Legend + interpretive callout moved ABOVE matrix (🔴 Severe / 🟠 Moderate / ⬜ Minor)
