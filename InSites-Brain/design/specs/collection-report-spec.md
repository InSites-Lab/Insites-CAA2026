# collection-report-spec.md — Collection Report Tab [CA-RPT-C]

## Status

**Ready for implementation — not active for workshop.** This spec defines a Report tab for the collection dashboard [CA-DB-C]. It can be added when collection reporting is needed.

## Purpose

A collection dashboard tab that renders a formatted summary report of the entire heritage collection, designed for HTML export or PDF print.

**Relationship to single-assessment report**: Follows the same design language as [CA-RPT] (see `report-tab-spec.md`) but aggregates across multiple sites rather than drilling into one.

## Position

Second-to-last tab in collection dashboard — after the last analytical tab, before AI Query.

## Report Sections

### Core Sections (always present)

| # | Section | Content | Data Source |
|---|---------|---------|-------------|
| 1 | **Collection Header** | Collection name, site count, geographic scope, assessment period | Overview tab |
| 2 | **📋 Collection Overview** | One-paragraph synthesis: what this collection represents and its overall significance | Overview tab |
| 3 | **🗺️ Geographic Distribution** | Summary of spatial patterns, clusters, geographic coverage | Map tab |
| 4 | **💎 Value Patterns** | Most frequent value categories across sites, shared vs unique values | Values tab |
| 5 | **🏛️ Integrity Overview** | Cross-collection integrity summary, common condition patterns | Integrity tab (if present) |
| 6 | **⚠️ Gap Analysis** | Key data gaps across the collection, sites needing further assessment | Gaps tab |
| 7 | **📐 Methodology** | Assessment approach, data sources, coverage statistics | Process/Overview |

### Bot-Decided Sections (included when data warrants)

| Section | When to include | Content |
|---------|----------------|---------|
| **🔗 Cross-Site Patterns** | When thematic clusters or shared context effects emerge | Recurring themes, shared historical contexts, connected planning implications |
| **📊 Comparative Highlights** | When comparative analysis reveals meaningful rankings | Top-significance sites, most-at-risk sites, unique specimens |
| **💡 Collection Insights** | When surprising findings emerge from aggregation | Patterns visible only at collection level, emergent narratives |

### Session Sections

| Section | When to include | Content |
|---------|----------------|---------|
| **💬 Session Analytics** | Always | Conversation summary: sites processed, stages covered, depth per site |
| **💡 User Reflections** | If provided | Key themes from user's reflective comments |

## Visual Design

Same as [CA-RPT] — single column, max-width 720px, card system, same typography and color tokens per [CA-UX].

## Export Controls

Same as [CA-RPT]:
- 📄 Export HTML — self-contained file download (`{collection-name}-report.html`)
- 🖨️ Print / PDF — `window.print()`

## Print Styling

Same `@media print` rules as [CA-RPT].

## Graph Limits

Collection reports may be longer than single-assessment reports:
- Target: 2-3 printed A4 pages
- Target: ~1500-2000 words
- If collection is large (>10 sites), focus on patterns rather than per-site detail

## Platform Notes

Same as [CA-RPT] — no platform-specific behavior in the Report tab itself.
