# Sample Data for Testing

This repository includes real heritage assessment data you can use to test the bot and explore its capabilities.

---

## EAC11 Collection (17 Sites)

**Location:** [`InSites-Brain/sites-data/EAC/small-dataset-4-benchmark/`](../InSites-Brain/sites-data/EAC/small-dataset-4-benchmark/)

A collection of 17 heritage site assessments from the **EAC Guidelines 11** (European Archaeological Council, 2026), spanning 10 countries — from Neolithic landscapes to modern industrial sites.

### Available Formats

| File | Format | How to use |
|------|--------|-----------|
| `EAC11_Collection_FreeText.md` | Narrative text | Upload to bot, say **"read collection"** |
| `EAC11_Collection_Structured.json` | Structured JSON | For dashboard or data analysis |
| `EAC11_Collection_Structured.csv` | Tabular CSV | Quick filtering and reference |

### What to expect

When you upload the free-text file and trigger Read-Collection, the bot will:
1. Generate a snapshot table of all 17 sites
2. Identify recurring value patterns (94% share Historical value, 71% Landscape)
3. Surface gaps (only 12% explicitly document Social/Community values)
4. Answer cross-cutting questions ("How do assessment methods differ by country?")

See [`EAC11_ReadCollection_README.md`](../InSites-Brain/sites-data/EAC/small-dataset-4-benchmark/EAC11_ReadCollection_README.md) for full documentation.

---

## Workshop Sample Sites

**Location:** [`InSites-Brain/sites-data/Samples and Sites Descriptions/`](../InSites-Brain/sites-data/Samples%20and%20Sites%20Descriptions/)

Individual heritage site documents used during the workshop hands-on sessions. Upload any of these to the bot, say **"start"**, and work through the 6 assessment stages.

The `wokshop-shared-assessments/` subfolder contains completed CBSA outputs — use these with **"read assessment"** to explore the deep analysis tools.

---

## Tips

- **Start simple:** Upload one document, say "start", and follow the stages
- **Try the collection:** The EAC11 dataset is the fastest way to see Read-Collection in action
- **Compare platforms:** Try the same document on Claude, GPT, and Gemini to see how the methodology works across platforms

---

*InSites Knowledge Lab — [CC-BY 4.0](../LICENSE)*
