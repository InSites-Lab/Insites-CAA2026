# InSites GPT — Setup Guide

## Quick Start

Use the ready-made GPT: [Open InSites-CAA GPT](https://chatgpt.com/g/g-69ca986712f88191828a4a1122278392-insites-caa26)

## Manual Setup

1. Go to [chatgpt.com](https://chatgpt.com) → Explore GPTs → Create
2. Paste contents of [`instructions.md`](instructions.md) into the **Instructions** field
3. Upload these **knowledge files**:
   - `cbsa-stages.md` — Stages 0-6, frameworks, notation, session report
   - `cbsa-appendices.md` — All reference appendices (includes [CA-HE] Hebrew overlay)
   - `kg-spec.md` — Knowledge Graph spec (vis-network + external runtime)
   - `dashboard-spec.md` — Assessment Dashboard spec (external runtime)
   - `collection-dashboard-spec.md` — Collection Dashboard spec (external runtime)
   - `ma-ra-spec.md` — Read single assessment workflow
   - `ma-rc-spec.md` — Read collection workflow
   - `report-tab-spec.md` — Report tab rendering spec
   - `test-mode.md` — Full test pipeline (optional — for developer testing)
4. Save, upload a heritage document, type **"start"** (or **"התחל"** for Hebrew)

## Files

```
instructions.md               ← Paste into Instructions field
cbsa-stages.md                 ← Knowledge file: Stages 0-6 + [CA-IP]
cbsa-appendices.md             ← Knowledge file: All appendices + [CA-HE]
kg-spec.md                     ← Knowledge file: KG (vis-network)
dashboard-spec.md              ← Knowledge file: Single Dashboard (external runtime)
collection-dashboard-spec.md   ← Knowledge file: Collection Dashboard (external runtime)
ma-ra-spec.md                  ← Knowledge file: Read Assessment
ma-rc-spec.md                  ← Knowledge file: Read Collection
report-tab-spec.md             ← Knowledge file: Report tab
runtime/                       ← JS/CSS runtimes (deployed to alephplace.com, not uploaded to GPT)
```
