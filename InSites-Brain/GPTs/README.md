# InSites GPT — Setup Guide

## Quick Start

Use the ready-made GPT: [Open InSites-CAA GPT](https://chatgpt.com/g/g-69ca986712f88191828a4a1122278392-insites-caa26)

## Manual Setup

1. Go to [chatgpt.com](https://chatgpt.com) → Explore GPTs → Create
2. Paste contents of [`instructions.md`](instructions.md) into the **Instructions** field
3. Upload these **knowledge files**:
   - `cbsa-stages.md` — Stages 0-6, frameworks, notation, session report
   - `cbsa-appendices.md` — All reference appendices (includes [CA-HE] Hebrew overlay)
   - `kg-spec.md` — Knowledge Graph (atar-runtime shell)
   - `dashboard-spec.md` — Assessment Dashboard (atar-runtime shell)
   - `collection-dashboard-spec.md` — Collection Dashboard (atar-runtime shell)
   - `ma-ra-spec.md` — Read single assessment workflow
   - `ma-rc-spec.md` — Read collection workflow

   > Visual products (KG / Dashboard / Timeline) render via the shared **atar-runtime** (D3), loaded from jsDelivr at view time — no runtime files are uploaded.
4. Save, upload a heritage document, type **"start"** (or **"התחל"** for Hebrew)

## Files

```
instructions.md               ← Paste into Instructions field
cbsa-stages.md                 ← Knowledge file: Stages 0-6 + [CA-IP]
cbsa-appendices.md             ← Knowledge file: All appendices + [CA-HE]
kg-spec.md                     ← Knowledge file: KG (atar-runtime)
dashboard-spec.md              ← Knowledge file: Single Dashboard (atar-runtime)
collection-dashboard-spec.md   ← Knowledge file: Collection Dashboard (atar-runtime)
ma-ra-spec.md                  ← Knowledge file: Read Assessment
ma-rc-spec.md                  ← Knowledge file: Read Collection
OLD/                           ← Archived vis-network/alephplace build (do not upload)
runtime/                       ← Legacy alephplace runtimes (unused by this build; not uploaded)
```
