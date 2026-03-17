# InSites-CAA — Workshop Participant Guide

## Set Up Your Own AI Heritage Assessment Assistant on Claude.ai

Welcome to the **CAA 2026 InSites Workshop**. This guide walks you through creating your own Claude.ai project with InSites-CAA — an AI assistant for structured Cultural Heritage Significance Assessment (CBSA).

**Time needed:** ~10 minutes

**What you'll need:**
- A Claude.ai account (free tier works; Pro recommended for longer sessions)
- The files provided in the workshop materials (or from this repository)

---

## What You're Building

InSites-CAA is an AI assistant that guides you through a **6-stage heritage significance assessment** (CBSA method). It includes:

- **Structured assessment stages** (0–6) — from preliminary review to significance statement
- **Knowledge Graph** — interactive visual map of your assessment's entities and relationships
- **Dashboard** — 10-tab summary of a completed assessment
- **Read-Assessment** — deep interpretive analysis of a single assessment
- **Read-Collection** — pattern analysis across multiple site assessments

The assistant enforces evidence-based analysis: it uses **only** the documents you upload, cites sources, and pauses after each stage for your review.

---

## Quick Setup (5 Steps)

### Step 1: Create a Project

1. Open [claude.ai](https://claude.ai)
2. Click **Projects** in the left sidebar
3. Click **Create Project**
4. Name it anything you like (e.g., "Heritage Assessment" or "InSites Workshop")

### Step 2: Set the System Prompt

1. In your new project, click the **gear icon** or **Edit Project**
2. Find **Custom Instructions** (sometimes called "Project Instructions")
3. Open the file **`InSites-CAA.md`** from the workshop materials
4. **Copy all the text** and **paste** it into the Custom Instructions field
5. Save

### Step 3: Add the 4 Skills

Skills are specialized modules that activate when you need them. Add each one:

1. In the project settings, look for the **Skills** section
2. Click **Add Skill**
3. For each of these 4 files from the workshop materials, paste the contents as a new skill:

| File to paste | What it does |
|---------------|-------------|
| **KG-skill.md** | Creates interactive Knowledge Graphs |
| **Dashboard-skill-generate.md** | Generates assessment summary dashboards |
| **MA-RA-skill.md** | Deep reading of a single assessment |
| **MA-RC-skill.md** | Reads across a collection of assessments |

> Each file starts with a header block (name, description, triggers) — Claude.ai reads these automatically. Just paste the whole file.

### Step 4: Upload a Heritage Document

1. Start a new conversation in your project
2. Upload a PDF or document about a heritage site (we'll provide sample files during the workshop)
3. You're ready to go

### Step 5: Start Your Assessment

Type **"start"** and the assistant will begin Stage 0 — Preliminary Review.

---

## How to Use It

### Basic Commands

| What to say | What happens |
|------------|-------------|
| **"start"** | Begins the assessment (Stage 0) |
| **"continue"** or **"next"** | Moves to the next stage |
| **"kg"** or **"knowledge graph"** | Generates a visual Knowledge Graph |
| **"dashboard"** | Creates a 10-tab assessment summary |
| **"read assessment"** | Runs interpretive analysis on the assessment |
| **"what is CBSA?"** | Explains the methodology (~140 words) |

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

### Key Principles

- **Evidence-based only** — The assistant uses only your uploaded documents. It will not invent information.
- **Citations** — Every claim is sourced with a file and page reference.
- **Human-in-the-Loop** — The assistant pauses after each stage so you can review, correct, or add information before continuing.
- **Context Effect** — The analysis shows how contexts shape values and vice versa (bidirectional).

### The Status Line

At the bottom of every response, you'll see a status line like:

```
📍 Stage 2 · Values · 3/7 values identified · ⏸ Awaiting review
```

This tells you where you are in the process.

---

## Tips for the Workshop

1. **Upload your document first**, then say "start"
2. **Take your time** between stages — the bot waits for you
3. **Ask questions** at any point — the bot will answer within the assessment context
4. **Try the Knowledge Graph** after Stage 2 or later — it's more interesting with more data
5. **The Dashboard** works best after completing all 6 stages
6. If the response seems too long, you can ask for a **shorter version**
7. You can always say **"where am I?"** to check your current stage

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Bot doesn't seem to follow the stages | Make sure InSites-CAA.md is in **Project Instructions**, not just pasted into a chat message |
| "kg" command doesn't produce a graph | Check that KG-skill.md was added as a Skill in the project settings |
| Bot uses information not in your document | Say: "Please use only the uploaded documents" |
| Response was cut off | Type "continue" to get the rest |
| Want to restart | Start a new conversation within the same project |

---

## Files Reference

Workshop materials include these 5 files:

```
InSites-CAA.md                    ← Main system prompt (paste into Project Instructions)
skills/
  KG-skill.md                     ← Skill: Knowledge Graph
  Dashboard-skill-generate.md     ← Skill: Assessment Dashboard
  MA-RA-skill.md                  ← Skill: Read-Assessment
  MA-RC-skill.md                  ← Skill: Read-Collection
```

---

*InSites Knowledge Lab — CAA 2026 Workshop*
