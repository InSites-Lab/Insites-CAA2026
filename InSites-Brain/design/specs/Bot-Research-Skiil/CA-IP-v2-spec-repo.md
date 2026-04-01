# CA-IP: Session Report Protocol — Full Documentation

**Version**: 2.0  
**Date**: 2026-03-19  
**Status**: Designed, pending integration into InSites-CAA-mono.md  
**Authors**: InSites Knowledge Lab (Technion)

---

## 1. Purpose

The Session Report is an auto-generated structured artifact produced at the end of every CBSA session. It serves two audiences simultaneously:

- **Participant**: Sees their own interaction pattern and self-reflection in a readable format — a learning moment that surfaces how they worked with the AI.
- **Researcher**: Gets standardized, extractable data for cross-case qualitative and quantitative analysis. Fixed vocabulary and diagnostic labels enable aggregation across sessions.

### Design Principles

- **Zero added burden**: The report is generated from data that already exists in the conversation — the bot's observation of user interventions + the user's answers to 3 fixed questions.
- **Embedded, not external**: The report lives inside the chat log. When participants share their conversation, the research data comes with it — no separate survey needed.
- **Transparent**: The participant sees exactly what the bot observed about their behavior. No hidden analysis.

---

## 2. Position in Session Flow

```
Stage 6.1  Assessment Process Summary
    │
    ▼
💡 Reflection (standard Stage 6 questions on professional practice)
    │
    ▼
👤 "We're done"
    │
    ▼
📋 Session Debrief (3 fixed questions — Control, Surprise, Trust)
    │
    ▼
👤 User answers
    │
    ▼
📊 SESSION REPORT ← generated here, incorporating everything above
    │
    ▼
Offer KG / Dashboard → End of session
```

### Trigger Rules

- Activate after the user confirms completion at Stage 6 (responds to "are we done?" affirmatively).
- Run once per session. If the user declines, skips, or ignores — do not repeat.
- If the user ends the conversation before Stage 6 — do not generate.
- If activated mid-workflow (e.g., user says "done" at Stage 4) — generate with available data, note incomplete stages.

---

## 3. Session Debrief: The Three Questions

These questions are fixed across all sessions to enable cross-case comparison:

1. **Control**: "At which point in the process did you feel most in control of the outcome? Was there a point where you felt the AI was leading too much?"
2. **Surprise**: "Describe one moment where the AI's output surprised you — positively or negatively. What did you expect instead?"
3. **Trust**: "If you had to use this output in a professional context — what would you keep as-is, and what would you rewrite from scratch?"

### Question Design Rationale

| Question | What it measures | Research construct |
| --- | --- | --- |
| Control | Perceived agency in HITL workflow | Human-AI power dynamics |
| Surprise | Expectation gaps (positive and negative) | AI capability calibration |
| Trust | Professional usability of AI-generated output | Output quality assessment |

### Handling Responses

- Reproduce answers near-verbatim in Section C. Acceptable edits: fix obvious typos, trim to ≤2 sentences if extensive.
- Do NOT paraphrase, interpret, analyze, or respond to the answers.
- If partially answered: include what was given, mark unanswered as "—".
- If ignored: generate Session Report without Section C. Note: "Participant did not provide Debrief responses."

---

## 4. Session Report Structure

### Section A: Session Overview

Fixed metadata fields, factual, no interpretation.

| Field | Source | Format |
| --- | --- | --- |
| Assessment scope | Stage 0 summary | ≤20 words |
| Stages completed | Count of completed stages | List (e.g., "0, 1, 2, 3, 4, 5, 6") |
| Data condition | Stage 0 gap assessment | ≤15 words |

### Section B: Interaction Map

A table of user interventions using fixed action tags:

| Tag | Meaning | Example |
| --- | --- | --- |
| `+add` | User added content the bot did not produce | Added oral history source not in uploads |
| `−reject` | User rejected bot output | Rejected "mystery and enigma" as a value |
| `~revise` | User requested revision of existing output | Asked for stronger traceability in 2.1 table |
| `↔replace` | User substituted bot's choice with their own | Replaced both comparison sites |
| `?question` | User asked a question that led to a change | Asked why social value was ranked below historical |
| `!correct` | User corrected a factual error | Corrected dating from Byzantine to Late Roman |

**Rules**:
- One row per intervention. Maximum 10 rows.
- If more interventions occurred, keep the 10 most substantive. Note "(N additional minor edits)".
- "What changed" column: ≤15 words, concrete, not evaluative.
- No rows for passive confirmations ("continue", "looks good", "yes").
- Three summary bullets after the table:
  - Most active stage (stage number + intervention count)
  - Stages accepted without change
  - User-initiated content (topics the user raised unprompted — not responses to bot questions)

### Section C: Self-Reflection

Direct reproduction of the user's Debrief answers. Preserves the participant's voice. No bot interpretation.

### Section D: Session Signature

Four diagnostic labels derived from Sections B and C together. These are the cross-case analysis keys.

**Dominant interaction style** (from B — action tag distribution):

| Style | Criteria |
| --- | --- |
| **Contributor** | Majority of actions are `+add` |
| **Editor** | Majority of actions are `~revise` |
| **Challenger** | Majority of actions are `−reject` or `↔replace` |
| **Observer** | ≤2 total interventions |

**Trust profile** (from C — Trust answer):

| Profile | Criteria |
| --- | --- |
| **High-trust** | User would keep most output as-is |
| **Selective-trust** | User would keep some sections, rewrite others |
| **Skeptical** | User would rewrite most or all |

**Bot dependency** (from B — content origin):

| Level | Criteria |
| --- | --- |
| **Low** | Most significant content was user-initiated |
| **Medium** | Balanced contributions |
| **High** | Bot produced most content; user mainly confirmed |

**Key insight**: One sentence connecting the interaction pattern (B) with the self-reflection (C). Must be grounded in observable data. No speculation about expertise, personality, or intentions.

Examples:
- "User contributed the two most significant contexts but reported the bot's *phrasing* as the most surprising moment — suggesting the bot's primary contribution was articulation, not discovery."
- "Observer pattern across all stages, combined with high-trust self-report — consistent profile suggesting alignment between bot output and user expectations."
- "Challenger pattern concentrated in Stages 2 and 4, but user expressed surprise at Stage 1 quality — trust varies by stage type."

---

## 5. Research Analysis Guide

### What the Session Report enables

**Quantitative aggregation** (across 15+ sessions):
- Action tag frequency per stage → where do users intervene most?
- Interaction style distribution → what is the dominant HITL pattern?
- Trust profile distribution → do users trust the output?
- Bot dependency levels → is the tool augmenting or replacing?

**Qualitative analysis** (per session):
- Interaction Map + Self-Reflection triangulation: what the user *did* vs. what they *say* they experienced
- Key Insight flags discrepancies (e.g., high-trust self-report + challenger behavior)
- "What changed" column provides concrete examples for thematic analysis

### Cross-Case Matrix

The researcher assembles this post-workshop from collected Session Reports:

| ID | Style | Trust | Dependency | Active stages | Key pattern |
| --- | --- | --- | --- | --- | --- |
| P01 | Contributor | Selective | Low | 1, 2, 4 | User drove content; bot structured it |
| P02 | Observer | High | High | — | Accepted all; no push-back |
| P03 | Challenger | Skeptical | Medium | 2, 3, 5 | Pushed back on values and synthesis |
| ... | | | | | |

This matrix is NOT generated by the bot — it is assembled by the researcher from collected chat logs.

### Methodological Notes

- **Sample**: 15–20 cases (workshop participants). Qualitative content analysis, not statistical inference.
- **Triangulation**: Session Report (bot observation) × Debrief (participant self-report) × Assessment outputs (product quality) = three data sources per case.
- **Coding**: Action tags provide pre-coded categories. Session Signature labels enable rapid cross-case comparison. "What changed" column and Debrief answers require thematic coding.
- **Limitations**: Bot-generated observation may miss nuances of user intent. Debrief answers are retrospective and brief. Sessions with incomplete CBSA (not reaching Stage 6) produce partial reports.

---

## 6. Integration Notes

### In InSites-CAA-mono.md

A compact operational version (~50 lines) is embedded as section `[CA-IP]` in the mono file. It contains only what the bot needs: the Debrief block, the output format template, action tags, Session Signature criteria, and generation rules.

### In the GitHub Repository

This full document (CA-IP-v2-spec.md) is stored in the repository as methodological documentation. It provides the research rationale, analysis guide, and cross-case framework that the bot does not need but the research team does.

### What the bot does NOT do

- Does not grade the user's performance
- Does not suggest the user "should have" intervened more or less
- Does not compare this session to other sessions
- Does not generate the cross-case matrix
- Does not re-open the assessment based on Debrief answers
- Does not analyze or interpret Debrief responses

---

## 7. Version History

| Version | Date | Changes |
| --- | --- | --- |
| v1 | 2026-03-19 | Initial design: Interaction Profile as section within Stage 6 |
| v2 | 2026-03-19 | Moved to end of session (after Debrief); added Session Signature; separated compact (mono) from full (repo) versions |
