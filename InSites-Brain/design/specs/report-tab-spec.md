# report-tab-spec.md — Assessment Report Tab [CA-RPT]

## Purpose

A dashboard tab that renders a formatted one-page assessment report, designed for HTML export or PDF print. Pulls data from all other dashboard tabs into a concise, professional summary.

**Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `[CA-EC]`. See `artifact-ux-contract.md` for the cross-platform source of truth.

## Position

Second-to-last tab in the dashboard tab bar — after Process, before AI Query (if present).

Tab order: ... → Process → **Report** → AI Query

## Content Philosophy

LIM (Less Is More) — optimal, not minimal. Every section earns its place. The bot decides which special insights, context effects, and priorities emerged as most significant from the assessment data. Same visual theme as the general dashboard. Meaningful titles. Emojis where they add value to scanning and comprehension. **Conciser if long** — condense verbose content rather than truncate.

## Report Sections

### Core Sections (always present)

| # | Section | Content | Data Source |
|---|---------|---------|-------------|
| 1 | **Asset Header** | Name, location, period, type badge, hero image (if available) | Overview tab |
| 2 | **📋 Assessment Overview** | One-paragraph synthesis: what this asset is and why it matters | Overview + Significance tabs |
| 3 | **💎 Key Values** | Top cultural values with brief evidence summary per value. Show value category pill + evidence indicator (●/◐/○) | Values tab |
| 4 | **🏛️ Integrity Snapshot** | Condition summary, key authenticity/integrity findings across Nara aspects. Compact Nara Grid summary (aspect → rating) | Integrity tab |
| 5 | **✨ Significance Statement** | The formal cultural significance statement from Stage 5, formatted as a featured block | Significance tab |
| 6 | **📐 Process & Methodology** | CBSA stages completed, data sources used, evidence coverage, notation key | Process tab |

### Bot-Decided Sections (included when data warrants)

These sections appear only when the assessment data contains relevant findings. The bot evaluates whether each section adds meaningful insight — do not include empty or trivial sections.

| Section | When to include | Content |
|---------|----------------|---------|
| **🔗 Context Effects** | When significant bidirectional context↔value relationships emerged | Most impactful context effects + connected planning recommendations (if planning advice was written in the source file) |
| **⚡ Priority Insights** | When surprising or high-priority findings emerged | Key discoveries, emerging patterns, urgent recommendations |
| **🗺️ Comparative Position** | When comparative analysis produced meaningful distinctions | How this asset sits in its regional/typological context, key differentiators |

### Session Sections (from conversation data)

| Section | When to include | Content |
|---------|----------------|---------|
| **💬 Session Analytics** | Always (concise) | User-LLM conversation summary: turns count, stages covered, depth of engagement, key decision points. Keep to 3-5 bullet points. |
| **💡 User Reflections** | Only if user provided reflections during HITL pauses | Key quotes or themes from user's reflective comments during the assessment. Omit entirely if no reflections were captured. |

## Visual Design

### Layout

- Single-column, max-width 720px, centered
- Same card system as other dashboard tabs (white cards, subtle border, rounded corners)
- Section headers: bold, with emoji prefix, underlined or with bottom border
- Asset Header: larger font, type badge pill, subtle background

### Typography

- Same font stack as dashboard (`[CA-UX]` tokens)
- Section titles: 1.1rem, font-weight 600
- Body text: 0.9rem, line-height 1.6
- Metadata (dates, sources): 0.8rem, muted color

### Evidence Indicators

Same as Values tab:
- ● = sourced (documented evidence)
- ◐ = implied (inferred from context)
- ○ = uncertain (limited evidence)

## Export Controls

Two buttons in the Report tab header area:

| Button | Label | Action |
|--------|-------|--------|
| Export | 📄 Export HTML | Downloads the report section as a standalone HTML file with inline CSS (no external dependencies). File name: `{asset-name}-report.html` |
| Print | 🖨️ Print / PDF | Triggers `window.print()` — user can save as PDF from browser print dialog |

## Print Styling

```css
@media print {
  /* Hide dashboard chrome */
  .tab-bar, .sidebar, nav, .export-controls, footer { display: none !important; }

  /* Show only report content */
  .report-tab { display: block !important; }

  /* Optimize for A4 */
  body { font-size: 11pt; line-height: 1.5; }
  .report-tab { max-width: 100%; margin: 0; padding: 20mm; }

  /* Avoid page breaks inside cards */
  .report-section { break-inside: avoid; }

  /* Reset backgrounds for printing */
  * { background: white !important; color: black !important; }
  .value-pill, .type-badge { background: #f0f0f0 !important; }
}
```

## Export HTML Generation

When "Export HTML" is clicked, generate a self-contained HTML document:

1. Clone the report tab DOM content
2. Inline all computed styles
3. Wrap in a minimal HTML5 document with:
   - Same Google Fonts link
   - Print-optimized CSS
   - Title: `{Asset Name} — Assessment Report`
4. Trigger download via `Blob` + `URL.createObjectURL`

## Platform Notes

| Platform | AI Query mode | Report behavior |
|----------|--------------|----------------|
| Claude | Anthropic API (live) | Identical report structure |
| Gemini | Gemini API (live) | Identical report structure |
| GPT | Placeholder mode | Identical report structure — AI Query routes to chat |

The Report tab itself has no platform-specific behavior. Only the AI Query tab (which follows Report) differs per platform.

## Graph Limits

Report content should fit on 1-2 printed A4 pages. If the assessment is extensive:
- Core sections: always include, condense if needed
- Bot-decided sections: include only the most impactful (max 2 of 3)
- Session sections: keep to bullet points
- Target: ~800-1200 words total

## Compliance Check

Before rendering a Report tab, verify:

- [ ] Position is second-to-last (before AI Query)
- [ ] All core sections present with data from corresponding tabs
- [ ] Bot-decided sections only included when data warrants
- [ ] Evidence indicators match Values tab (●/◐/○)
- [ ] Export HTML button generates self-contained file
- [ ] Print button triggers window.print()
- [ ] @media print hides dashboard chrome
- [ ] Total content fits 1-2 A4 pages
- [ ] Visual tokens match [CA-UX]
- [ ] Session Analytics present (even if brief)
