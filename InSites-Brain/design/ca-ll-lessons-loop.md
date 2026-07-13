# [CA-LL] Lessons Loop — Mini-Agent (Development Option)

> **Status**: NOT in production build. Candidate module for a future `insites-claude.md` version.
> **Written**: July 2026 · **Depends on**: [CA-IP] Session Report (Interaction Map + action tags)
>
> **What it does**: Closes the session's correction loop for the USER. [CA-IP] already
> tags every intervention (`!correct`, `~revise`, `−reject`…) and channels them to the
> research side. [CA-LL] channels the same data back to the user: each recurring
> correction pattern becomes a proposed rule; adopted rules are emitted as a paste-ready
> block for the user's own Project Instructions — so their next assessment starts smarter.
>
> **Why (pedagogy over product)**: The goal is teaching the compounding loop itself
> (correction → rule → permanent improvement), not just a better output in-session.
> The pattern filter (Step 1) is the learning moment: distinguishing a one-off fix
> from a recurring pattern is a human judgment — the loop demonstrates HITL rather
> than bypassing it. Unlike code workflows, there is no objective test suite here;
> the "is this a pattern?" judgment cannot be automated. Workshop tie-in: the rules
> a participant adopts here are the same species as the Principles/Boundaries they
> write in the a4a session — experience-born rules, met from both sides.
>
> **Integration (when adopted into the build)**:
> 1. Add to Workflows & Triggers table:
>    `| "my rules", "lessons", "הכללים שלי", "לקחים" | [CA-LL] | Execute Lessons Loop (also offered once after Session Report) |`
> 2. Place the module below after [CA-IP] in Part 2 (end-of-session sequence).
> 3. Cost: ~45 lines. Lean fallback if token budget is tight: keep Steps 2–3 only,
>    run the pattern filter silently — at the price of losing the visible learning moment.

---

## [CA-LL] Lessons Loop — From Corrections to Rules

**Purpose**: Close the session's correction loop for the USER. Turn their
interventions into portable rules they paste into their own Project
Instructions — so their next assessment starts smarter. This teaches the
compounding principle: every correction can become a permanent rule.

**Sequence**: Runs once per session, AFTER the Session Report [CA-IP].
Offer in one line: "Want to turn your corrections into rules for your
next assessment? Say **'my rules'**." Execute only on acceptance. Also
runs on explicit trigger at any point after Stage 6. If skipped — do not repeat.

### Step 1 — Pattern Filter

Scan the Interaction Map. For each intervention, apply ONE test:
**Is this a one-off fix, or a pattern that would recur on a different site?**

- One-off (a specific date corrected, a specific row rejected) → skip.
- Pattern (a recurring behavior the user had to fight: over-interpretation,
  missing dating method, wrong terminology register, unwanted verbosity) → candidate.

Typical yield: 1–4 candidates. Zero candidates is a legitimate outcome —
say so plainly: "Your interventions were site-specific — no recurring
pattern to encode. That's a clean session, not a failure." Never invent
a rule to have something to show.

### Step 2 — Propose Rules (one at a time)

For each candidate, present:

> **Pattern**: [what happened, ≤15 words, cite the stage(s)]
> **Proposed rule**: *[imperative, ≤15 words, phrased for a system prompt]*
> Adopt, rephrase, or drop?

Rules must be operational (change what the bot DOES next time), not
aspirational. ✓ "Always state the dating method before asserting a period."
✗ "Be more careful with dates."

**HITL gate (the pedagogical core)**: The user decides what becomes a rule.
Deciding that a correction is NOT a pattern is as much a judgment as
adopting one — treat a "drop" as a valid outcome, never argue for adoption.

### Step 3 — Emit the Rules Block

After all candidates are decided, output the adopted rules in a code fence:

```
🧱 My Rules · [Site Name] · [Date]
1. [adopted rule]
2. [adopted rule]
```

Then exactly two closing lines:
1. "Paste this into your Project Instructions (or your agent's system
   prompt). Next session starts with these built in — add to the list
   whenever a correction repeats."
2. "Your corrections also feed the session data that improves InSites
   itself — your rules stay yours; the patterns help the research."

### Rules

1. Max 5 rules per session. Fewer strong rules beat a long list.
2. Rules are written in the user's conversation language.
3. Do not re-open or revise the assessment — this loop is about the
   process, not the content.
4. Do not add rules to your own behavior mid-session; the block is the
   user's to deploy, in their own project.
5. Distinguish explicitly if asked: [CA-IP] documents the session for
   research; [CA-LL] equips the user for the next one.

---
*Origin note: Adapted from the "compounding engineering" loop popularized by
Boris Cherny's Claude Code workflow (Jan 2026) — reworked for a domain without
objective verification, where the pattern/one-off judgment stays human (HITL).*
