# Dashboard Reference Shape — Ayelet HaShachar Water Tower

This file describes the data shape and rendering approach used in the Ayelet HaShachar water tower dashboard. Use it as a reference when building dashboards for new assets. Your generated data must follow this shape exactly.

---

## Asset Identity

The `asset` object is a flat dictionary with five string fields: `name`, `location`, `type`, `period`, and `description` (~20 words).

Example:
- name: "Water Tower, Kibbutz Ayelet HaShachar"
- type: "Rural Water Tower — Kibbutz Infrastructure"
- period: "1923–1924 (Mandatory Palestine)"

This populates the Overview tab header.

## Data Quality

`dataQuality` contains two arrays: `sources` (filenames as strings) and `gaps` (concise gap descriptions). The Ayelet assessment had 2 sources and 6 gaps. The Overview tab renders sources as a list and gaps as warning badges.

## Timeline

`timeline` is an array of event objects. Each must have:
- `year` (display string, e.g., "1923–1924")
- `yearStart` (integer for proportional positioning)
- `label` (what happened)
- `changeType` (one of: "fabric", "infrastructure", "use", "setting", "interpretation" — matching [CA-T] in cbsa-method.md)

The Ayelet timeline had 8 events spanning 1915–1961. Change types were: 3× fabric, 2× use, 2× infrastructure, 1× setting.

**Rendering**: The Timeline tab renders events on a proportional horizontal axis where spacing reflects actual year gaps. Events are color-coded by `changeType` (e.g., fabric=blue, use=green, setting=amber, infrastructure=purple, interpretation=teal). A distribution summary below shows the count per change type.

## Contexts

`contexts` is an array of context objects. Each must have:
- `id` (e.g., "ctx_hist")
- `type` (from [CA-C]: "historical", "social", etc.)
- `label` (the site-specific context description, 2-4 sentences)
- `relatedValues` (array of value category names from [CA-V])
- `timespan` (e.g., "1915–1960s")

The Ayelet assessment identified 6 contexts, each linked to 1-3 value categories.

**Rendering**: Cards with type badge, description, timespan, and clickable value pills. Clicking a context card activates cross-referencing: it highlights matching values in the Values tab.

## Values

`values` is an array. Each must have:
- `id` (e.g., "v_hist")
- `name` (the "Value Type — Value Meaning" compound, e.g., "Historical — Infrastructure as Survival")
- `category` (the [CA-V] type name)
- `evidence` (one of: "sourced", "inferred", "uncertain")
- `summary` (one-line description)

The Ayelet assessment identified 5 values with evidence: 3 sourced, 2 inferred.

**Rendering**: Cards show the value name, a category-colored pill, an evidence indicator (● sourced, ◐ inferred, ○ uncertain), and the summary. Below the cards: the full Attribute-Value-Implication table from `attributeTable`.

## Attribute Table

`attributeTable` is an array. Each row:
- `attribute` (the physical or conceptual attribute)
- `values` (array of value category names)
- `significance` (≤9 words)
- `implication` (what happens if this attribute is compromised)

**Rendering**: Styled table with value pills in the second column and the implication as a warning-toned text.

## Authenticity (Nara Grid)

`authenticity` contains:
- `grid`: array of structured objects, each with `aspect`, `description`, `valueExpression`, and `rating` (high / medium / low-medium / low)
- `summary`: one paragraph

The four aspects are always: Form & Design, Material & Fabric, Use & Function, Location & Setting.

**Rendering**: Cards with left border colored by rating (green→high, amber→medium, orange→low-medium, red→low). Each card shows the aspect name as header, description as body, value expression as pills, and a rating badge. The summary appears below.

## Comparative

`comparative` contains:
- `summary`: overall comparison narrative
- `comparators`: array of objects, each with `name`, `period`, `architect` (may be null), `distinction` (narrative), and `criteria` (object with keys like `rarity`, `documentation`, `condition` — values are "high", "moderate", "low", "unknown")

The Ayelet assessment compared 3 water towers.

**Rendering**: Per-comparator cards. Each shows name/period header, architect (if known), criteria as color-coded badges, and distinction text. Summary paragraph above.

## Significance

`significance` has one field: `statement` (the full Stage 5 text, 3-5 paragraphs).

**Rendering**: Featured block with distinct typography — larger font, left accent border, generous padding. Treat as the centerpiece of the dashboard.

## Vulnerability Matrix

`vulnerability` is an array. Each row:
- `value` (value category name)
- `form` (impact level 1-3)
- `material` (impact level 1-3)
- `use` (impact level 1-3)
- `setting` (impact level 1-3)

Impact levels: 3 = loss severely damages this value, 2 = moderate damage, 1 = minor.

**Rendering**: Heat matrix table. Column headers show the Nara aspect name AND its current integrity rating from the authenticity grid. Cells colored: 3=red, 2=amber, 1=neutral/grey. Below: 2-3 sentence interpretive callout identifying the most critical vulnerability intersection.

## Process Quality

`processQuality` contains:
- `strengths` (integer count)
- `gaps` (integer count)
- `quickBoosts` (array of strings)
- `nextSteps` (array of strings)

**Rendering**: Three-column KPI row (strengths / gaps / boosts count). Below: two-column layout with next steps (left) and quick boosts (right). Sources list at bottom.

## KG (conditional)

`kg` is either `null` (no KG generated) or the full `{ nodes, edges }` object from the KG spec.

**Rendering**: If present, render a MiniKG tab with D3 force-directed graph (dark theme), floating popover on node click, and a banner: "The standalone Knowledge Graph has richer features including analytics and AI queries." If KG included AI capability, include the Gemini chat panel here too.

## Stages Completed

`stagesCompleted` is an array of integers [0,1,2,3,4,5,6]. Any stage not in this array renders as "Not completed" in its tab with a muted indicator.

---

## Key Rendering Principles

1. **Single source of truth**: All data lives in one `DATA` object at the top of the HTML. Every statistic, count, and label is computed from this object — never hardcoded.

2. **Cross-referencing**: A global `highlight` state (value or context ID) propagates across tabs. When active, matching elements get a visual highlight and non-matching elements are dimmed.

3. **Proportional timeline**: Year gaps determine spacing. A 40-year gap gets more horizontal space than a 2-year gap.

4. **Consistent evidence indicators**: ● / ◐ / ○ appear everywhere a value is referenced — cards, tables, pills.

5. **Structured Nara Grid**: The grid is always an array of objects with typed fields — never a flat string or paragraph.

6. **Tab navigation**: Hash-based routing. Each tab switch updates `location.hash`. On load, read hash to restore tab state.

---

**END OF REFERENCE SHAPE**