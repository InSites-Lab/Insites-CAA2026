# Dashboard UX & Visualization Reviewer

Scan a dashboard codebase and produce a structured improvement report. The goal is to help the developer see their dashboard through a user's eyes — what's confusing, what's missing, what could communicate the data more powerfully.

## When to Use

Apply this framework whenever asked to:
- Review, audit, or improve a dashboard's UX, visualizations, layout, interactivity, or analytical clarity
- Create a new dashboard from a data file (JSON, CSV, API response)
- Suggest how to make a dashboard "better" — even if the request is vague

Works with any framework (React, Vue, vanilla JS) and any charting library (Recharts, D3, Chart.js, Leaflet, Mapbox). Especially suited for research, heritage, and analytical dashboards with maps, charts, and tabbed views.

## Philosophy

Dashboards exist to create understanding, not just display data. A good dashboard review asks: "Does each view earn its place? Does the user leave with insight they didn't have before?" This is especially important for research and heritage assessment dashboards, where the audience may be domain experts (archaeologists, planners, conservators) rather than data analysts — they need the visualization to surface meaning, not just render numbers.

When reviewing, think about the data first, then the representation. A chart type recommendation is only useful if it's grounded in what the data actually contains and what question the user is trying to answer.

## Process

### Step 1: Understand the Dashboard

Read the codebase thoroughly before making any recommendations. You need to understand:

1. **Structure** — What files exist? What framework and libraries are used? How is the code organized?
2. **Data model** — What does the data look like? What fields exist? What are the cardinalities, types, and ranges?
3. **Views** — What tabs/pages/sections exist? What does each one show?
4. **Interactions** — What can the user click, filter, hover, select? How do views relate to each other?
5. **Visual design** — Color palette, typography, spacing, responsive behavior.

Spend real time on this. Read the main component files, the data files, and the stylesheets. Don't skim — the best recommendations come from noticing subtle things like a chart that could be a table, a filter that doesn't connect to anything, or a color scale that doesn't match the data semantics.

### Step 2: Analyze Through Six Lenses

Evaluate the dashboard through each of these lenses. Not every lens will produce findings — that's fine. Skip lenses that aren't relevant rather than forcing observations.

#### Lens 1: Information Architecture
- Does the tab/view structure match how users actually think about the data?
- Is there a logical flow between views, or are they disconnected?
- Are there views that try to do too much? Views that are redundant?
- Is the most important information the easiest to reach?
- Does progressive disclosure work well — overview first, then detail on demand?

#### Lens 2: Chart & Visualization Choices
- Is each chart type appropriate for the data it shows? Common mismatches:
  - Pie charts for more than 5-6 categories (consider bar chart or treemap)
  - Bar charts for time series (consider line or area chart)
  - Tables for data that has spatial or hierarchical structure
  - Missing small multiples where comparison across groups would help
- Could any static display become an interactive exploration?
- Are axes, labels, and legends clear without needing to read code?
- Do color encodings carry consistent meaning across views?

#### Lens 3: Map-Specific Review
If the dashboard includes a map view:
- Does the map add analytical value, or is it just a pretty basemap?
- Are map markers appropriate for the data density? (points vs. clusters vs. heatmap vs. choropleth)
- Do marker glyphs encode useful information or just location?
- Is there meaningful interaction between the map and other views (brushing, filtering)?
- Are place names that appear in tables, charts, or text panels linked back to the map? When an entity (site, location, building) appears both on the map and in other views, every mention should be a doorway back to its spatial context and full details. This is one of the highest-value interactions in any map-based dashboard — spotting disconnected place references is a priority.
- For research/heritage dashboards: does the spatial view reveal patterns that tables cannot?

#### Lens 4: Interactivity & User Flow
- Are shared entities (places, categories, time periods) clickable across all views? If a site name appears in a table row, a chart label, and a map marker, clicking any of them should navigate or highlight the same entity everywhere. Look for "dead" text references that could be live links.
- Can the user answer their actual questions with the available filters and interactions?
- Are click targets obvious? Does hover reveal useful information?
- Is there cross-filtering between views (click a bar → map filters)?
- Can the user "undo" or reset easily?
- Is selection state visible and clear?
- Are transitions/animations meaningful or just decorative?

#### Lens 5: Data Integrity
The dashboard may have data that it doesn't fully or accurately present. Compare the data source (JSON files, API responses, hardcoded arrays) against what actually renders on screen:
- Are there fields in the data that are never displayed? Rich fields like detailed notes, full names, or qualitative descriptions sitting unused in the data model represent missed analytical value.
- Is any data silently truncated or filtered? Look for `.slice()`, `.filter()`, or hardcoded limits that drop categories, rows, or values without telling the user. This is especially dangerous in analytical dashboards because users trust that they're seeing the complete picture.
- Are summary statistics (counts, totals, labels) hardcoded when they could be computed from the data? Hardcoded numbers go stale when the dataset changes and create a false sense of accuracy.
- Do computed values (scores, percentages, thresholds) reflect meaningful criteria, or are they artifacts of the data encoding? For example, a "completeness score" based on string length rather than content quality may always show green.

This lens is not about code quality — it's about whether the user is seeing accurate and complete information.

#### Lens 6: Data Storytelling & Analytical Depth
This lens asks: is the dashboard helping the user think, or just showing data? Unlike the other lenses, this one can propose new representations across all data types — numerical, categorical, spatial, and textual — when doing so would significantly improve the analytical story.

**Across all fields:**
- Does each view have a clear analytical question it answers? If you can't state what question a tab answers in one sentence, the user probably can't either.
- Are there interpretive cues — a callout, a subtitle, a highlighted outlier — that point the user toward the insight? A tab titled "Values" that shows a raw matrix is less useful than one that says "Historical values are documented in all 15 sites; Community values appear in only 4."
- Could annotations, reference lines, or benchmarks add context to existing charts?
- For comparative views: is comparison easy (side-by-side, sorted tables, small multiples), or does the user need to hold numbers in their head?
- Are there cross-field relationships that would tell a story if combined? For example, plotting threat count against protection status reveals vulnerability; overlaying temporal periods on a map reveals geographic clusters by era. Look for combinations the dashboard doesn't explore yet.
- Could categorical fields be reframed to surface patterns? Sorting, grouping, or color-coding by a dimension the dashboard currently ignores (e.g., grouping sites by method type instead of country) may reveal insights the current arrangement hides.

**Text and content analysis — a special case:**
Research and heritage dashboards often have their richest information locked in text fields — significance statements, integrity notes, comparative justifications, protection descriptions. These are typically shown as static paragraphs in detail panels, if at all. Look for opportunities to:
- Extract patterns across text fields. Are there recurring themes, keywords, or phrases across multiple records? Could these be surfaced as tags, word clouds, or frequency counts?
- Compare text content side by side. When records share a category (same period, same country, same value type), can their narrative descriptions be juxtaposed to reveal differences in how significance is argued?
- Visualize text length, completeness, or detail level as a dimension. A bar showing how much each site says about its significance (vs. a one-line summary) reveals documentation depth at a glance.
- Turn qualitative fields into filterable facets. If notes mention specific concepts (UNESCO, community participation, climate risk), those could become clickable tags that cross-reference to other records mentioning the same concept.

When this lens suggests new representations, include them in the main Findings section (not just Data Opportunities) if they would significantly improve storytelling. The Data Opportunities section is for more speculative ideas.

### Step 3: Prioritize and Write the Report

Not all observations are equal. Prioritize by impact on the user's ability to gain insight from the dashboard.

## Report Structure

Use this template for the output:

```markdown
# Dashboard UX & Visualization Review

## Quick Summary
<!-- 3-5 sentences: what the dashboard does well, and the single biggest opportunity -->

## Findings

### High Impact
<!-- Changes that would significantly improve the user's analytical experience -->
<!-- Each finding follows the pattern below -->

#### [Finding title]
**What's happening:** Describe what you observe in the current dashboard.
**Why it matters:** Explain the UX or analytical consequence.
**Recommendation:** What to do instead, and why this alternative is better for the data.
**Implementation hint:** Brief technical direction (library, component pattern, or approach — not full code).

### Medium Impact
<!-- Same pattern. Improvements that would noticeably help but aren't critical. -->

### Low Impact / Polish
<!-- Nice-to-haves. Quick wins or aesthetic refinements. -->

## What Works Well
<!-- Genuinely good design decisions worth keeping. Be specific. -->

## Data Opportunities
<!-- New views, tabs, or analytical angles that don't exist yet but the data could support. Each opportunity should:
  1. Name the analytical question it would answer
  2. Identify what data fields make it possible
  3. Suggest a visualization approach
  Keep these concise — 2-3 sentences each. -->
```

### Guidelines for Good Findings

- **Be specific.** "The pie chart on the Overview tab has 10 country slices — with that many categories, a horizontal bar chart sorted by count would be faster to read because users compare lengths more accurately than angles."
- **Ground in data.** Reference actual field names, category counts, and value ranges from the codebase you read.
- **Explain the why.** Don't just say "use a bar chart" — explain what cognitive or perceptual advantage it gives for this particular data.
- **Implementation hints, not implementations.** Point the developer in the right direction: "Recharts `<BarChart layout='vertical'>` with `<Bar>` sorted descending" — not a 50-line code block. The developer knows their codebase better than you do.
- **Respect the domain.** A heritage assessment dashboard has different needs than a SaaS metrics dashboard. Recommendations should account for the audience (researchers, planners, conservators) and the analytical task (comparative assessment, gap analysis, significance documentation).
- **Don't over-recommend.** A finding that says "this is fine, maybe tweak the color" isn't worth including. Only surface things that would genuinely improve the experience.

### What NOT to do

- Don't recommend a complete rewrite or framework migration unless the user asks.
- Don't focus on code quality, performance, or engineering concerns — this is a UX and visualization review.
- Don't suggest adding features that change the dashboard's purpose. Work within its existing intent.
- Don't recommend exotic or obscure chart types that would confuse the target audience. Prefer well-understood visualizations used creatively over novel ones used for novelty.

## Building a New Dashboard from Data

When the user provides a data file (JSON, CSV, or describes an API response) and asks you to create a dashboard, use the 6 lenses as **design constraints** rather than review criteria. This means:

1. **Start with the data.** Read the data file thoroughly. Understand every field — its type, cardinality, range, and what questions it could answer. Note text fields separately — they often contain the richest analytical content.

2. **Design views around questions, not fields.** Each tab or view should answer a clear analytical question. Don't create a tab just because a field exists. Ask: "What would a researcher/analyst want to know from this data?" Then design views that answer those questions.

3. **Apply the lenses as you build:**
   - **Information Architecture (Lens 1):** Start with an Overview tab. Order views from orientation to analysis to detail.
   - **Chart Choices (Lens 2):** Pick chart types based on the data shape, not habit. Bar for comparison, scatter for relationships, matrix for cross-tabulation, map for spatial data.
   - **Map (Lens 3):** If the data has coordinates, the map should be analytical (not just a pin map). Encode a data dimension in the markers. Connect map selection to all other views.
   - **Interactivity (Lens 4):** Build shared selection state from the start. Every entity name should be clickable across all views. Don't create isolated tabs.
   - **Data Integrity (Lens 5):** Compute all statistics from the data — never hardcode counts or labels. Show all categories — never silently truncate with `.slice()`.
   - **Storytelling (Lens 6):** Add interpretive cues — subtitles that summarize the pattern, annotations on outliers, dynamic callouts that update with the data. Surface text fields as searchable/filterable content, not just detail-panel paragraphs.

4. **Data Opportunities as bonus views.** After the core dashboard is built, suggest 2-3 additional views that combine fields in unexpected ways (the Data Opportunities from the review template). Offer to build them if the user is interested.

5. **Use the data file as the single source of truth.** Load it via fetch or import — never copy data into the component code.
