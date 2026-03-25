# What InSites-CAA Can Do

InSites-CAA is an AI assistant that guides you through a structured heritage significance assessment. You upload documents about a built heritage site, and the assistant helps you analyze what makes it culturally significant — stage by stage, with your review at every step.

It runs on **Claude.ai**, **ChatGPT**, and **Google Gemini** with the same methodology.

---

## The 6 Assessment Stages

You move through these stages one at a time. After each stage, the assistant pauses and waits for your feedback before continuing.

| Stage | Name | What you'll see |
|-------|------|----------------|
| 0 | **Preliminary Review** | A summary of what's in your documents, what data is available, and what gaps exist |
| 1 | **Contexts** | Historical, spatial, social, and political timelines — the circumstances that shaped the site |
| 2 | **Values** | Cultural, historical, aesthetic, and scientific significance — why the site matters |
| 3 | **Authenticity & Integrity** | Physical condition, past interventions, what's original and what's changed |
| 4 | **Comparative Analysis** | How this site relates to similar sites in the region and beyond |
| 5 | **Significance Statement** | A synthesis of everything — the overall case for the site's significance |
| 6 | **Quality Check** | Final validation and summary of the complete assessment |

**How to start:** Upload a heritage document and type **"start"**.

---

## Interactive Outputs

### Knowledge Graph

An interactive visual map showing the entities in your assessment (the site, people, events, values, structures) and how they relate to each other.

- **Trigger:** Say **"kg"** or **"knowledge graph"**
- **What it shows:** Color-coded nodes by entity type, clickable for details, relationship lines between entities
- **Best after:** Stage 2 or later (more data = richer graph)

### Assessment Dashboard

A 10-tab interactive summary of a completed assessment — values, contexts, threats, authenticity, and more in a visual format.

- **Trigger:** Say **"dashboard"**
- **Best after:** Completing all 6 stages

---

## Deep Analysis Tools

### Read-Assessment

A deep reading of a single completed assessment. The assistant offers multiple interpretive lenses — analytical, interpretive, or your own question — to surface insights that aren't obvious from reading the assessment alone.

- **Trigger:** Say **"read assessment"**
- **When to use:** After completing a full assessment, or when uploading someone else's completed assessment

### Read-Collection

Pattern analysis across multiple heritage site assessments. Upload several assessments and the assistant finds common themes, gaps, and cross-cutting patterns across the collection.

- **Trigger:** Say **"read collection"**
- **When to use:** When you have assessments for multiple sites and want to see what emerges from looking at them together

---

## Design Principles

These principles are built into every response the assistant produces:

- **Evidence Mandate** — The assistant uses *only* your uploaded documents. It will not invent information or pull from external sources.
- **Human-in-the-Loop** — The assistant pauses after every stage for your review. You decide when to continue, what to correct, and what to add.
- **Context Effect** — Contexts and values are analyzed bidirectionally. A historical event can shape a cultural value, and a cultural value can reframe how we understand a historical event.
- **Citation Discipline** — Every claim is sourced with a file name and page reference. You can trace any statement back to your documents.

---

## Quick Commands

| What to say | What happens |
|------------|-------------|
| **"start"** | Begins the assessment (Stage 0) |
| **"continue"** or **"next"** | Moves to the next stage |
| **"kg"** | Generates a Knowledge Graph |
| **"dashboard"** | Creates an assessment dashboard |
| **"read assessment"** | Deep reading of a single assessment |
| **"read collection"** | Pattern analysis across multiple assessments |
| **"what is CBSA?"** | Explains the methodology (~140 words) |
| **"where am I?"** | Shows your current stage |

---

## Platform Comparison

| Feature | Claude.ai | ChatGPT | Gemini |
|---------|-----------|---------|--------|
| Full 6-stage assessment | Yes | Yes | Yes |
| Knowledge Graph | Interactive artifact | Canvas (React) | Text-based |
| Dashboard | Interactive artifact | Canvas (HTML) | Text-based |
| Read-Assessment | Yes | Yes | Yes |
| Read-Collection | Yes | Yes | Yes |
| Skills (on-demand modules) | Yes (Project Skills) | Via knowledge files | Single prompt |
| Setup method | Project + Skills | Custom GPT | Gem / System Instructions |

All platforms use the same CBSA methodology and produce equivalent analytical output. The main differences are in how interactive visualizations (KG, Dashboard) are rendered.

---

*InSites Knowledge Lab — [CC-BY 4.0](../LICENSE)*
