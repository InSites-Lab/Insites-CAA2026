# Bot Enhancement Plan — InSites-CAA-mono v3

## Context
Yael's Tuba-Zangariyye assessment session identified 9 bot behavior issues (B1-B9). Detailed analysis and exact prompt fix language in `InSites-Brain/Heritage4.0/evidence/Tuba-Run-Analysis-2303.md` Section B.

## Target file
`InSites-Brain/Claude/InSites-CAA-mono v3.md` (created from v2.2, on branch `dev-mono-v3`)

After v3 is stable → adapt to skills-split version. Not now.

## Testing
- `InSites-Brain/Claude/tests/ayelet-wt-v3-test.md` — B8 only, partial prompt (Stage 1+2 specs only). Showed B8 boundary works but notation absent.
- `InSites-Brain/Claude/tests/ayelet-wt-v4-test.md` — B8+B7 simulated, full prompt context (Stage 0→1→2). Notation activated (12° + 2💭), context-effects present, B7 compression viable. Confirmed B7 wording is ready to apply as-is.

## Fixes (priority order)

### P1 — B8: Contexts ≠ Values boundary (Stage 1 + Stage 2) ✅ APPLIED
**The most critical CBSA method enhancement.** Bot labels contexts as values without making the evaluative move; Stage 1 sometimes evaluates prematurely, leaving Stage 2 with nothing new.

**How:** Add one rule to Stage 1 spec, one to Stage 2 spec:

> **Stage 1 addition:** "Contexts are descriptive frameworks. Describe the framework and identify the context-effect. Do not evaluate significance — that is Stage 2's job. If you find yourself writing 'this is significant because' or 'this demonstrates,' you are doing Stage 2 work prematurely."

> **Stage 2 addition:** "Each value answers: what makes THIS SITE significant within the context from Stage 1? Reference the context by name. State the evaluative insight that Stage 1 did not — rarity, uniqueness, representativeness, contribution. If your value text could be copy-pasted into Stage 1 without feeling out of place, you haven't made the analytical move."

---

### P2 — B7: Shorter first pass, expand on request ✅ APPLIED
**Cautious change — find the LIM point.** Goal is better HITL (expert directs depth), not just shorter text. Must not lose important content or over-compress into vague circles.

**How:** Add to general output rules section:

> "At each stage, deliver a scannable first pass: headline insight + key evidence + context-effect in 2-3 sentences per item. Then offer to expand specific items the user wants to explore. Depth is available on request — don't front-load it."

**Caution:** Review each stage after adding this — make sure existing per-stage templates don't contradict it. Test mentally: would a 2-3 sentence context still carry enough substance for Stage 2 to build on?

---

### P3 — B3: Three-state integrity → conditional offer (Stage 3) ✅ APPLIED
**Clear fix.** Simplified: offer only if archaeologically relevant, skip entirely if not.

**How:** In Stage 3 spec, change three-state model from mandatory to offered:

> Replace mandatory three-state output with: "For archaeological sites, I can also apply the three-state integrity model (at-exposure / post-excavation / as-potential). Would you like me to expand on this?"

---

### P4 — B4: Hard stop after Stage 5 ✅ APPLIED
**Needs careful wording.** The issue happened at Stage 5→6 but could happen at any transition. Stage 5 is special because it's the assessment climax — but the existing HITL rule already says "pause after each stage." The real problem may be that after a **revision** (user corrects Stage 5, bot delivers revised version), the bot treats the revision as completing the stage and auto-advances.

**How:** Add global rule to HITL section + reinforce at Stage 5:

> **Global (HITL rules):** "After delivering any revision at any stage, STOP. Do not proceed to the next stage until the user explicitly confirms. A revision completes the correction — it does not complete the stage."

> **Stage 5 reinforcement:** "After delivering the significance statement (including any revision), STOP. Do not proceed to Stage 6 until the user explicitly confirms. No exceptions — do not bundle Stage 6 into a Stage 5 revision response."

---

### P5 — B5: Session Report sequence after Stage 6 ✅ APPLIED
**Simplified: state the sequence naturally, no meta-language about "not optional."** Bot improvised free-form analysis instead of using [CA-IP] format. The fix is making the post-Stage-6 sequence explicit and automatic.

**How:** In [CA-IP] section + post-Stage-6 flow:

> "After Stage 6 is confirmed complete, the next output is ALWAYS the Session Debrief (3 reflection questions), followed by the Session Report in [CA-IP] format. This is not optional and does not require a user trigger. Sequence: Stage 6 confirmed → Debrief → user responds (or defers) → Session Report [CA-IP] → then offer Dashboard and KG."

This also covers **B6** (Dashboard/KG suggestion) — it's the tail of the same sequence.

---

### P6 — B1: Prose must match notation ✅ APPLIED
**Placed in Global Notation Key section — enforces epistemic coherence.** The problem is that the bot puts ° on a term but writes the surrounding sentence confidently. Example: "the site functioned as a °hierarchically organized network" — the ° is there, but "functioned as" is assertive. The prose should say "may have functioned as" when the marker is °. Notation without matching prose tone = contradiction.

**How:** Add to evidence mandate section:

> "When evidence type is analogical or architectural only, the prose must match the notation — suggestive language throughout, not just on marked terms. A ° in the notation but certainty in the sentence is a contradiction."

**Note:** This reinforces B8 — once the descriptive/evaluative boundary is clearer, this becomes easier to enforce.

---

### P7 — B2: Filter non-CBSA content from sources ⏸ DEFERRED
**Revised scope:** Not pre-filtering in the workshop bot. But Stage 0 (Preliminary Review / data gaps) could surface it as an observation — "Source B contains administrative/regulatory content that won't be used in the significance assessment."

**How:** Add to Stage 0 spec:

> "During data gap scanning, note if sources contain substantial administrative, legal, regulatory, or procedural content. Flag this to the user: 'Source X contains [type] content that is outside CBSA scope — I will focus on heritage description and context.' This is informational, not a filter — the user may want those materials referenced in planning implications (Stage 6)."

**LIM approach:** One sentence in Stage 0 output, not a filtering mechanism.

---

### P8 — B9: Experiential dimension in Stage 5 ✅ APPLIED (LIM)
**Conditional, one sentence.** If no experiential data exists in sources or earlier stages, this rule shouldn't force fabrication.

**How:** Add to Stage 5 spec:

> "The significance statement should include the experiential dimension — what it feels like to encounter this place — as a substantive thread, not a passing mention. Check Stage 1 and Stage 3 Spirit & Feeling for language that should carry forward. If no experiential evidence was identified in earlier stages, note this as a gap rather than fabricating it."

---

## Implementation
1. Copy `InSites-CAA-mono-v2.2.md` → `Claude/OLD/` (per versioning convention)
2. Create `InSites-CAA-mono v3.md`, update version line inside
3. Read v2.2 to locate exact insertion points for each fix
4. Apply fixes in priority order (P1→P8), using the prompt text above
5. After each fix, re-read the modified section to check for contradictions
6. Update CLAUDE.md references (v2.2 → v3)

## Verification
- Read modified sections — no conflicts with existing rules
- Spot-check: Stage 1 should now have descriptive-only boundary instruction (B8)
- Spot-check: Post-Stage-6 flow should have mandatory [CA-IP] → Dashboard/KG sequence (B5+B6)
- Stage 5 should have hard stop (B4) + experiential carry-forward (B9)

## Critical files
- **Source of fixes**: `InSites-Brain/Heritage4.0/evidence/Tuba-Run-Analysis-2303.md` Section B
- **Target**: `InSites-Brain/Claude/InSites-CAA-mono-v2.2.md` → `InSites-CAA-mono v3.md`
- **Archive**: `InSites-Brain/Claude/OLD/InSites-CAA-mono-v2.2.md`
- **Update**: `CLAUDE.md` (root) — v2.2 → v3 references
