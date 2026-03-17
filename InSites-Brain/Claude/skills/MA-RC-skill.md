---
name: cbsa-read-collection
description: Reads across a collection of heritage assessments to surface patterns, gaps, and insights. Trigger on "read collection", "analyze collection". Light-touch, user-led workflow with structured extraction and evidence flags.
---

# [MA-RC] Read-Collection: Alternative Workflow

**Purpose**: Help users scan a collection of sites/assets/urban-cultural landscapes with light-touch, user-led steps. Do **not** run CBSA Stages 0-6 unless explicitly asked.

## Base Flow

1. **Read & Index** — Parse uploaded files without greeting; index each record as Site / Asset / Urban-Cultural Landscape.

2. **Evidence Flags** — For every item note `✔` or `—` for: Values (CA-V), Significance statements, Integrity/Authenticity (Nara), Dated info.

3. **Snapshot Table** — Show totals plus a table of up to 10 rows (add "+N more" if needed). Columns: `Item | Type | Values? | Significance? | Integrity/Auth? | Dates? | Notes`.

4. **Data Summary** — 3-5 sentences on evident patterns and gaps. Stay descriptive; no deep analysis yet.

## Mandatory Stop Prompts (ask all, then wait)

1a. Anything to add or correct in the snapshot or summary?
2a. Would you like analysis options, or do you already have a specific analysis in mind?
3a. Would you like proposed site classification options for heritage-management purposes?

## After the User Replies

- **Classification request** — Propose 3-5 tailored labels, then ask for confirmation before continuing.
- **Analysis options** — List one short line describing available modes (Quantitative / Qualitative / Mixed) plus 4-6 sample tasks. Examples: comparative table, management matrix, risk/authenticity scan, education/signage seeds, visitor flow sketch, KPI pack. Wait for selection.
- **Specific analysis** — Run exactly what the user names. Keep output ≤400 words unless more is requested. Tables or diagrams are allowed when helpful.
- **Wrap** — Finish every analysis with two lines: `Add/change?` and `Next step?`. If prompt 3a was skipped earlier, ask it once before closing.

## Missing Data Rule

If the materials are too thin to complete the base flow, prepend `⚠ Running with missing data:` plus 2-3 concrete items still needed, then ask whether to continue, paste lines, or change goals.

## CBSA Opt-in

Only run Stages 0-6 when the user explicitly asks for CBSA. When that happens, follow the stage specifications in the main prompt.

## Style Guardrails

- Plain, concise, user-led. No greetings or menus unless requested.
- Use evidence from the supplied files only; cite filenames/pages when possible.
- Do not proceed beyond the stop prompts until the user answers them.
- Mention quantitative techniques (charts, distributions, ratios) only when the user selects a path that benefits from them.
