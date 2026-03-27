# collection-dashboard-spec.md — CA-DB-C Collection Dashboard Specification (GPT)

## Purpose

Generate a collection-level dashboard after MA-RC Read-Collection analysis. Visualizes multiple heritage sites with comparative analytics.

**Cross-platform reference**: Visual tokens follow `[CA-UX]`, entity colors follow `[CA-EC]`, AI Query follows `[CA-AIQ]` placeholder mode. See `artifact-ux-contract.md` for the cross-platform source of truth.

## Trigger

- After MA-RC Step 3 analysis: "Would you like a visual dashboard for this collection?"
- On direct request: "dashboard", "collection dashboard", "visualize"
- Execute only on acceptance — do not auto-generate.
- **Format**: Single self-contained HTML file (vanilla JS, Chart.js + Leaflet from CDN).

## Tab Structure (8 tabs, fixed order)

| # | Tab | Content |
|---|-----|---------|
| 1 | Overview | KPI cards + 4 distribution charts |
| 2 | Map | Leaflet map with circle markers, value filter buttons |
| 3 | Values | Matrix: sites × value types (●/◐/○), sortable |
| 4 | Arguments | Significance premises + claim scope analysis |
| 5 | Gaps | Traffic-light matrix: sites × data dimensions |
| 6 | Cross-Tabs | Stacked bar charts by country/type/period |
| 7 | Clusters | Management-oriented grouping cards |
| 8 | AI Query | Starter prompts for GPT conversation (placeholder mode) |

## Data Extraction

Build per-site JSON from MA-RC Step 2 output: name, country, coordinates, type, period, description, significance summary, values (e/i/a), integrity, threats, method, comparative basis.

## Mandatory Rules

- Overview first (tab index 0)
- Cross-tab site linking — all site names clickable
- No silent chart truncation
- Guide boxes on every tab
- Collection metadata in header (name, N items, Depth, date)
- Inline data only — no fetch()
- Chart.js: no maintainAspectRatio:false on doughnut/pie

## AI Query Tab [CA-AIQ]

Implements `[CA-AIQ]` **placeholder mode** (GPT platform). No live API calls from the artifact.

**Starter prompts** (Collection Dashboard):
1. "What value patterns are shared across sites?"
2. "How does the geographic distribution look?"
3. "Compare the assessment methodologies used"
4. "Where are the biggest data gaps?"
5. "What management clusters emerge?"

Users copy prompts into the GPT conversation for analysis.

## Checklist

1. ☐ Only extracted data — nothing fabricated
2. ☐ Overview tab first
3. ☐ All site names interactive
4. ☐ Value indicators consistent (●/◐/○)
5. ☐ Charts show all categories
6. ☐ Guide box per tab
7. ☐ Collection metadata in header
8. ☐ Responsive layout
9. ☐ AI Query tab in placeholder mode

## Reference

`InSites-Brain/sites-data/EAC/EAC-DASH/index-eac.html` — working example (not locked template).
