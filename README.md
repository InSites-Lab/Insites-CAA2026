# InSites-CAA — AI-Assisted Heritage Significance Assessment

**InSites** is an AI assistant that guides you through a structured significance assessment of built heritage sites. Upload documents about a site, and the assistant walks you through 7 stages (0–6) — identifying what makes the place culturally significant, how authentic it remains, and how it compares to similar sites.

Every claim is evidence-based. Every stage is reviewed by you. The AI proposes; you decide.

> **Workshop:** [InSites: Significance Assessment through the Looking Glass of Gen-AI](https://bit.ly/insites-caa)
> CAA 2026 — Athens, March 31, 2026
> **[bit.ly/insites-caa](https://bit.ly/insites-caa)**

---

## Try It Now

| Platform | Access | Notes |
|----------|--------|-------|
| **ChatGPT** | [Open InSites →](https://chatgpt.com/g/g-69ca986712f88191828a4a1122278392-insites-caa26) | Ready to use |
| **Google Gemini** | [Open InSites →](https://gemini.google.com/gem/1PMAcB6O2FGJPYonixa3ZA7_2xwiTIVKA?usp=sharing) | Use Thinking mode |
| **Claude.ai** | [Setup Guide →](InSites-Brain/Claude/SETUP-GUIDE.md) | DIY: paste one file into a Project (~5 min) |

**To start:** Upload a heritage document and type **"start"**.

---

## Quick Questions to Ask the Bot

The best way to understand InSites is to ask it. These questions let the bot introduce its own concepts.

### Understand the method

| Ask this | What you'll learn |
|----------|-------------------|
| **"What is InSites?"** | What it does, how it works, what it expects from you |
| **"What is CBSA?"** | The 7-stage assessment method — evidence-based, human-reviewed |
| **"What is context effect?"** | The core principle — how contexts and values shape each other |
| **"What are epistemic markers?"** | How the bot marks what's explicit, inferred 〰️, or interpretive 💭 |
| **"What can't you do?"** | Reveals boundaries — what it won't attempt and why |

### Explore capabilities

| Ask this | What you'll see |
|----------|----------------|
| **"kg"** or **"knowledge graph"** | Interactive map of entities and relationships |
| **"dashboard"** | Multi-tab visual summary of a completed assessment |
| **"read assessment"** | Deep interpretive reading through multiple lenses |
| **"read collection"** | Pattern analysis across multiple site assessments |

### Test its principles

| Ask this | Why it matters |
|----------|---------------|
| **"What evidence supports that claim?"** | Must cite your documents — file and page |
| **"What are the data gaps?"** | Stage 0 identifies what's missing before analysis |
| **"Can you search the web?"** | Should decline — works only with your uploads |

---

## What the Bot Does

**7-stage assessment (Stages 0–6)** — From document review through contexts, values, authenticity, comparison, significance statement, to quality check. Pauses after every stage for your review.

**Knowledge Graph** — Interactive entity-relationship visualization.

**Assessment Dashboard** — Multi-tab visual summary (values, contexts, timeline, integrity, threats).

**Read-Assessment** — Analytical and interpretive readings of a completed assessment.

**Read-Collection** — Cross-cutting analysis of multiple site assessments.

### Design principles

- **Evidence Mandate** — Uses only your uploaded documents. No external sources, no fabrication.
- **Human-in-the-Loop** — You approve every stage. The AI proposes; you decide.
- **Context Effect** — Bidirectional: contexts frame significance, and significance reframes contexts.
- **Epistemic Transparency** — Claims marked: explicit (sourced), 〰️ inferred, 💭 interpretive.

---

## Workshop Materials

- **[Companion website](https://bit.ly/insites-caa)** — Presentation, stage walkthroughs, KG demo, glossary
- **[Shared materials](https://drive.google.com/drive/folders/1XWc4TZVK2x0S8daxqwc20eZqr_tvCDEm?usp=sharing)** — Heritage documents to work with during the workshop
- **[Build Your Own AI Assistant](agent-for-agents/README.md)** — Design your own AI agent
- **[Examples](InSites-Brain/sites-data/results-examples/)** — KG, dashboard, and collection analysis outputs

---

## Repository Structure

```
InSites-Brain/
  Claude/                    Claude.ai bot prompt + setup guide
  GPTs/                      ChatGPT custom GPT (instructions + knowledge files)
  Gemini/                    Google Gemini prompt
  design/
    specs/                   Workflow specifications (MA-RA, MA-RC, session report)
    contracts/               Cross-platform rules (UX contract, epistemic notation)
    examples/                Reference implementations (dashboard HTML)
    skills/                  Reusable Claude Code skills (LIM, dashboard review, expert review)
  sites-data/                Heritage site documents + result examples

agent-for-agents/            Build Your Own AI Assistant (standalone tool)
workshop-site/               Companion website source (Vite + React + Tailwind)
```

---

## For Researchers

### Prompt source

The complete system prompt: [`InSites-Brain/Claude/InSites-CAA-claude.md`](InSites-Brain/Claude/InSites-CAA-claude.md)

### Design specs

| Document | Content |
|----------|---------|
| [MA-RA Spec](InSites-Brain/design/specs/MA-RA-spec-v2.md) | Read-Assessment workflow |
| [MA-RC Spec](InSites-Brain/design/specs/MA-RC-spec-v2.md) | Read-Collection workflow |
| [Artifact UX Contract](InSites-Brain/design/contracts/artifact-ux-contract.md) | Cross-platform visual language |
| [Epistemic Notation](InSites-Brain/design/contracts/epistemic-notation.md) | Three-tier evidence marking system |
| [Dashboard Reference](InSites-Brain/design/examples/Single-Dashboard-example.html) | Assessment dashboard implementation |
| [Session Report](InSites-Brain/design/specs/Bot-Research-Skiil/) | Research instrument for documenting sessions |
| [Claude Code Skills](InSites-Brain/skills-archive/) | Reusable Claude Code skills (active in `.claude/skills/`; others archived here) |

---

## References

- **Getty Conservation Institute** — [Research on the Values of Heritage](https://www.getty.edu/projects/research-values-heritage/)
- **Historic England** — [Conservation Principles](https://historicengland.org.uk/images-books/publications/conservation-principles-sustainable-management-historic-environment/)
- **EAC Guidelines 9** — [Assessing Archaeological Significance: Key Concepts](https://zenodo.org/records/10697000)
- **EAC Guidelines 11** — [Articulating the Significance of Archaeological Sites](https://zenodo.org/records/14975018)

---

## How to Cite

> Alef, Y., & Shafriri, Y. (2026). InSites-CAA: AI-Assisted Heritage Significance Assessment. InSites Knowledge Lab, Technion — Israel Institute of Technology. https://github.com/InSites-Lab/Insites-CAA2026

---

## The InSites Knowledge Lab

At the intersection of assessment methods, novel technologies, and built-heritage data — we develop computational methods for evidence-based heritage assessment.

**Dr. Yael Alef** — Heritage assessment methodology, CBSA development
**Yuval Shafriri** — AI systems architecture, prompt engineering

[InSites Knowledge Lab](https://github.com/InSites-Lab) · Technion — Israel Institute of Technology

---

[CC-BY 4.0](LICENSE)
