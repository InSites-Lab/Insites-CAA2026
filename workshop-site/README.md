# InSites-CAA Workshop Companion Site

The companion site at **[alephplace.com/CAA26](https://alephplace.com/CAA26)** provides an interactive guide to the CBSA heritage assessment methodology and the CAA 2026 workshop.

**No installation needed** — just visit the link.

---

## What's on the Site

- **Workshop Program** — session timeline with linked resources and tools
- **CBSA Stages (0-6)** — walkthrough of each assessment stage with agent descriptions
- **Design Principles** — the "Looking Glass" conceptual frame: Mirror Not Magic, Low Floor High Ceiling, Stay Current Stay in Control
- **Knowledge Graph Demo** — create and visualize entity relationships
- **Glossary** — key CBSA terms with definitions
- **Bot Links** — quick access to InSites-CAA on all platforms

### Direct Links (Hash Routes)

The site supports deep linking:

| Route | Content |
|-------|---------|
| `#program` | Workshop program timeline |
| `#principles` | Design principles |
| `#step-0` ... `#step-6` | Individual CBSA stages |
| `#graph-create` | Knowledge Graph input |
| `#visual` | Visual analysis |
| `#glossary` | CBSA glossary |

---

## For Developers

**Tech stack:** Vite + React 19 + TypeScript + Tailwind CSS 4

### Run locally

```bash
npm install
npm run dev
```

Requires a Gemini API key in `.env.local` for the live AI features:

```
GEMINI_API_KEY=your_key_here
```

### Build

```bash
npm run build
```

Output goes to `dist/` (gitignored).

---

*InSites Knowledge Lab — [CC-BY 4.0](../LICENSE)*
