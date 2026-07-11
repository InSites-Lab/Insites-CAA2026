# InSites-Brain — Bot Prompts & Materials

> 🇮🇱 סטודנטים: בחרו פלטפורמה למטה, **העתיקו את קובץ המונו** להנחיות, והעלו מסמך מ-`sites-data/` כדי להתחיל. הקלידו **"start"** / **"התחל"**.

This folder holds everything you need to run the InSites CBSA heritage-assessment bot. Pick **one** platform, copy its single mono prompt, and start.

## Pick a platform

| Platform | Copy this | Setup |
|----------|-----------|-------|
| **Claude.ai** | [`Claude/InSites-CAA-claude.md`](Claude/InSites-CAA-claude.md) | [SETUP-GUIDE.md](Claude/SETUP-GUIDE.md) · [עברית](Claude/SETUP-GUIDE.he.md) |
| **Google Gemini** | [`Gemini/InSites-CAA-GEM-v9.3.md`](Gemini/InSites-CAA-GEM-v9.3.md) | [Gemini/README.md](Gemini/README.md) |
| **ChatGPT** | [`GPTs/instructions.md`](GPTs/instructions.md) + knowledge files | [GPTs/README.md](GPTs/README.md) |

Each platform uses **one mono prompt** — copy the whole file into the system/instructions field. (Claude & Gemini: a single file. GPT: the instructions file + the listed knowledge files.)

## What's here

| Folder | What's inside |
|--------|---------------|
| `Claude/` · `Gemini/` · `GPTs/` | The bot prompt for each platform + setup guide |
| `sites-data/` | Heritage documents to practice on (PDFs + the `technion/` source set) |
| `sites-data/results-examples/` | Example outputs — Knowledge Graph, Dashboard, Collection dashboard |
| `design/` | Specs and cross-platform rules (reference, for the curious) |
| `research/` | Lab research notes (reference) |

## Start

1. Copy the mono prompt for your platform into its instructions field.
2. Upload a heritage document (try one from `sites-data/`).
3. Type **"start"** (or **"התחל"** for Hebrew). The bot runs Stage 0 and pauses for your review.
