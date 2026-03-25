# InSites-CAA on Google Gemini — Setup Guide

## What You're Building

InSites-CAA is an AI assistant for structured heritage significance assessment (CBSA method). This guide helps you set it up on Google Gemini.

**Time needed:** ~5 minutes

**What you'll need:**
- A Google account with access to [Google AI Studio](https://aistudio.google.com) or Gemini Advanced

---

## Quick Setup

### Option A: Google AI Studio (Gem)

1. Open [Google AI Studio](https://aistudio.google.com)
2. Click **Create Gem** (or **New Prompt** → **System Instructions**)
3. Open the file **`InSites-CAA-mono- GEM v3.md`** from this folder
4. **Copy all the text** and **paste** it into the System Instructions field
5. Save your Gem with a name (e.g., "InSites" or "Heritage Assessment")

### Option B: Gemini Advanced (System Instructions)

1. Open [gemini.google.com](https://gemini.google.com)
2. Open Settings → **Gems**
3. Create a new Gem
4. Paste the contents of **`InSites-CAA-mono- GEM v3.md`** into the instructions
5. Save

---

## How to Use It

### Basic Commands

| What to say | What happens |
|------------|-------------|
| **"start"** | Begins the assessment (Stage 0) |
| **"continue"** or **"next"** | Moves to the next stage |
| **"kg"** or **"knowledge graph"** | Generates a Knowledge Graph |
| **"dashboard"** | Creates an assessment dashboard |
| **"read assessment"** | Deep reading of a single assessment |
| **"read collection"** | Pattern analysis across multiple assessments |
| **"what is CBSA?"** | Explains the methodology |

### The 6 Assessment Stages

| Stage | Name | What it covers |
|-------|------|---------------|
| 0 | Preliminary Review | Data gaps, material inventory |
| 1 | Contexts | Historical, spatial, social, political timelines |
| 2 | Values | Cultural, historical, aesthetic significance |
| 3 | Authenticity & Integrity | Physical condition, interventions |
| 4 | Comparative Analysis | Similar sites, regional context |
| 5 | Significance Statement | Synthesis of all findings |
| 6 | Quality Check | Final summary and validation |

---

## Gemini-Specific Notes

Gemini uses a **single monolithic prompt** (unlike Claude's skills-split or GPT's knowledge files). Everything is loaded at once — no separate skill files needed.

### What works well
- All 6 assessment stages
- Read-Assessment and Read-Collection workflows
- The full CBSA methodology and citation discipline

### Current limitations
- **Knowledge Graph and Dashboard** are generated as text/code rather than interactive artifacts. Gemini's artifact rendering is more limited than Claude or GPT Canvas.
- **Long sessions** may require reminding the assistant of the stage structure ("Please follow the Stage X template").

---

## Tips

1. **Upload your document first**, then say "start"
2. **Take your time** between stages — the bot waits for you
3. For the best interactive visualization experience (KG, Dashboard), consider trying [Claude.ai](../Claude/WORKSHOP-README.md) or [ChatGPT](../GPTs/CAA-GTPs%20(Claude.ai-Spilts)/README.md) as well

---

## Files in This Folder

```
InSites-CAA-mono- GEM v3.md    ← Paste this into Gemini system instructions
README.md                      ← This file
```

---

*InSites Knowledge Lab — [CC-BY 4.0](../../LICENSE)*
