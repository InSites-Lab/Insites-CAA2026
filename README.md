# InSites-CAA — AI-Assisted Heritage Significance Assessment

InSites-CAA is an AI assistant for structured **Cultural Heritage Significance Assessment** (CBSA). You upload documents about a built heritage site and the assistant guides you through a 6-stage analysis — identifying what makes the place culturally significant, how authentic it remains, and how it compares to similar sites. Every claim is evidence-based, every stage is reviewed by you.

Built by the **InSites Knowledge Lab** as a research prototype for the [CAA 2026 Workshop](https://alephplace.com/CAA26) (Athens, March 31 2026).

---

## Try It Now

Set up your own InSites-CAA assistant in ~10 minutes on any platform:

| Platform | Guide |
|----------|-------|
| **Claude.ai** | [Setup Guide →](InSites-Brain/Claude/WORKSHOP-README.md) |
| **ChatGPT** | [Setup Guide →](InSites-Brain/GPTs/CAA-GTPs%20(Claude.ai-Spilts)/README.md) |
| **Google Gemini** | [Setup Guide →](InSites-Brain/Gemini/README.md) |

All three platforms use the same CBSA methodology. Choose whichever you prefer.

---

## What Can the Bot Do?

A structured 6-stage heritage assessment with interactive outputs. [Full feature overview →](docs/BOT-FEATURES.md)

- **Stages 0-6** — from preliminary review to significance statement, with your review after every stage
- **Knowledge Graph** — interactive visual map of entities and relationships in the assessment
- **Dashboard** — 10-tab visual summary of a completed assessment
- **Read-Assessment** — deep interpretive reading of a single assessment
- **Read-Collection** — pattern analysis across multiple site assessments

---

## Companion Website

**[alephplace.com/CAA26](https://alephplace.com/CAA26)** — interactive workshop guide with CBSA stage walkthroughs, design principles, Knowledge Graph demo, glossary, and program timeline.

Source code: [`workshop-site/`](workshop-site/)

---

## Workshop Materials

- [Sample assessment data](docs/SAMPLE-DATA.md) — EAC11 collection (17 sites, 10 countries) + workshop input files
- [The Architect — Build Your Own Agent](docs/THE-ARCHITECT.md) — meta-agent for designing AI system instructions, used in the Ethics in Practice session

---

## For Researchers — Methodology

The design specifications behind InSites-CAA:

| Document | What it covers |
|----------|---------------|
| [MA-RA Spec](InSites-Brain/design/MA-RA-spec-v2.md) | Read-Assessment workflow — deep reading of single assessments |
| [MA-RC Spec](InSites-Brain/design/MA-RC-spec-v2.md) | Read-Collection workflow — cross-site pattern analysis |
| [MA-RC Guide](InSites-Brain/design/MA-RC-guide.md) | Rationale: why collection-level analysis matters |
| [Epistemic Notation](InSites-Brain/design/epistemic-notation.md) | How claims are classified by evidence traceability |
| [Dashboard Reference](InSites-Brain/design/Single-Dashboard-example.html) | Reference implementation for assessment dashboards |
| [Session Report Protocol](InSites-Brain/design/Bot-Research-Skiil/) | Research instrument for session documentation |

---

## Repository Map

```
InSites-Brain/
  Claude/                    # Claude.ai bot prompt + 4 skills + setup guides
  GPTs/                      # ChatGPT custom GPT package
  Gemini/                    # Google Gemini prompt + setup guide
  agent-for-agents/          # "The Architect" meta-agent (English + Hebrew)
  design/                    # Methodology specs (source of truth)
  sites-data/                # Heritage site data + test collections

workshop-site/               # Companion site source (alephplace.com/CAA26)

docs/
  BOT-FEATURES.md            # What the bot can do (non-technical overview)
  SAMPLE-DATA.md             # Guide to test data
  THE-ARCHITECT.md           # Agent-building activity guide
```

---

## How to Cite

> Alef, Y., & Shafriri, Y. (2026). InSites-CAA: AI-Assisted Heritage Significance Assessment. InSites Knowledge Lab. https://github.com/[repo-url]

*(Paper citations will be added after acceptance.)*

---

## License

[CC-BY 4.0](LICENSE) — use freely, adapt, share. Credit the **InSites Knowledge Lab**.

---

## The InSites Knowledge Lab

The InSites Knowledge Lab develops computational methods for evidence-based heritage assessment at the intersection of **Assessment Methods**, **Novel Technologies**, and **Built-Heritage Data**. InSites-CAA is a research prototype that explores how structured AI-Human collaboration can make heritage significance assessment more transparent, documented, and accessible.

**Dr. Yael Alef** — Heritage assessment methodology, CBSA development, domain expertise
**Yuval Shafriri** — AI systems architecture, prompt engineering, platform development
