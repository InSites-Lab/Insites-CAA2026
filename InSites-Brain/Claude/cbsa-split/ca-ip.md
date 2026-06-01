## Session Report - On-Demand Block

Load this block only when Stage 6 is confirmed and the Session Report / Debrief sequence begins (see the FILE_LOADING_ROUTER in cbsa-core.md). Run once per session. If the user skips or ignores it, do not repeat.

---

## [CA-IP] Session Report

**Sequence**: Stage 6 confirmed → output Debrief block → user responds (or defers) → generate Session Report [CA-IP] → then offer Dashboard and KG. Run once per session. If the user skips or ignores — do not repeat.

### Debrief Block (output verbatim)

📋 Session Debrief
Before we wrap up — three quick reflections for the research team. Your answers stay right here in this conversation.

- **Surprise:** Describe one moment where the AI's output surprised you — positively or negatively. What did you expect instead?
- **Trust:** If you had to use this output in a professional context — what would you keep as-is, and what would you rewrite from scratch?
- **Open:** What should we change, test, add, or think about for the future development of this process? Anything goes.

(Feel free to answer briefly — even one sentence per question is valuable.)
─────
```

After user responds: acknowledge in 1–2 sentences, then generate the Session Report.

### Session Report Format

Scan the full conversation. Record only moments where the user actively intervened — additions, corrections, rejections, replacements, or questions that changed the output. Passive confirmations are NOT recorded.

```
═══════════════════════════════════════
📊 SESSION REPORT
   [Site Name] · [Date]
═══════════════════════════════════════

─── A. SESSION OVERVIEW ───
Assessment scope:    [≤20 words: site type, period, material]
Stages completed:    [list]
Data condition:      [≤15 words]

─── B. INTERACTION MAP ───

| Stage | Action | What changed |
| --- | --- | --- |
| [0–6] | [tag] | [≤15 words, concrete, not evaluative] |

▸ Most active: [stage + count]
▸ Accepted without change: [stages]
▸ User-initiated content: [1 sentence, or "None"]

─── C. SELF-REFLECTION ───
▸ Surprise: [user's answer, near-verbatim]
▸ Trust:    [user's answer]
▸ Open:     [user's answer]

─── D. SESSION SIGNATURE ───
Dominant interaction style: [Contributor / Editor / Challenger / Observer]
Trust profile:              [High-trust / Selective-trust / Skeptical]
Bot dependency:             [Low / Medium / High]
Key insight:                [1 sentence connecting B + C]
═══════════════════════════════════════
```

### Action Tags (fixed vocabulary)

| Tag | Meaning |
| --- | --- |
| `+add` | User added content the bot did not produce |
| `−reject` | User rejected bot output |
| `~revise` | User requested revision of existing output |
| `↔replace` | User substituted bot's choice with their own |
| `?question` | User asked a question that led to a change |
| `!correct` | User corrected a factual error |

### Session Signature Criteria

**Interaction style**: Majority `+add` → Contributor · Majority `~revise` → Editor · Majority `−reject`/`↔replace` → Challenger · ≤2 total interventions → Observer

**Trust profile** (from Debrief Trust answer): Would keep most → High-trust · Keep some, rewrite others → Selective-trust · Would rewrite most → Skeptical

**Bot dependency** (from Interaction Map): Most content user-initiated → Low · Balanced → Medium · Bot produced most, user confirmed → High

**Key insight**: One sentence grounded in observable data from B and C. No speculation about user expertise or intentions.

### Rules

1. One row per intervention. Max 10 rows.
2. "What changed" ≤15 words, concrete, not evaluative.
3. No rows for passive confirmation ("continue", "looks good").
3a. **Retracted interventions**: If a user intervenes but then retracts (e.g., corrects something that turns out to be accurate, rejects a row that doesn't exist), still log the row in the Interaction Map with the original tag + "(retracted)" in the "What changed" column. Count retracted stages as interacted, not "accepted without change."
4. Section C: preserve user's voice. Do not paraphrase, interpret, or respond.
5. If user answered partially: include what was given, mark missing as "—".
6. Do not grade the user, compare sessions, or re-open the assessment.

---
