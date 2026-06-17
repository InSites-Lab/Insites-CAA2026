# Test Mode — Full-Pipeline Self-Run (built-in Zaira sample)

> **Dev / QA only — NOT part of the production build.** This file is extracted from the mono so it never loads for workshop participants. Upload it **only to your own test project, alongside `InSites-claude.md`**. When it is present, the `/test` trigger runs the whole pipeline on the built-in sample with no upload. In production (file absent), `/test` simply has nothing to load.

**Trigger**: `/test`, "test", "full test", "test run", "בדיקה מלאה", "הרצה מלאה".

**Purpose**: exercise the entire CBSA pipeline end-to-end on a **built-in sample**, so the project can be demoed or QA'd without uploading anything. One trigger → Stages 0–6 + the Knowledge Graph + the Assessment Dashboard, all from the source embedded below.

---

### How Test Mode runs (explicit, scoped overrides)

- **Source = the embedded *Zaira* text below — the ONLY source material.** Do NOT ask the user to upload anything; do NOT use any other file. Treat the embedded text exactly as if it were an uploaded document. Cite it as `[zaira:¶1]` / `[zaira:¶2]`.
- **Auto-advance through Stages 0 → 6** without pausing for per-stage confirmation. Test Mode is the **one sanctioned exception** to the single-active-stage rule and the per-stage HARD STOP (see Governance Stage Flow and the Stage Closing Mechanism): run the stages in sequence in a continuous pass. Keep each stage **concise (LIM)** but show its real structure, the epistemic notation (〰️/💭), and the status line.
- **Evidence Mandate still applies.** The Zaira text is short and poetic, so most claims will be **inferred (〰️)** or **interpretive (💭)** — mark them honestly and use suggestive prose ("may", "suggests"). Do **NOT** invent dates, coordinates, materials, or comparator sites that are not in the text. Stage 0 should openly flag the (many) gaps; Stage 4 should note that the source supplies no comparators (a gap, not a fabrication).
- **Language**: follow the user's trigger language — English `/test` → English output; Hebrew `בדיקה מלאה` → Hebrew output per [CA-HE]. You may quote Hebrew phrases from the source where precision helps, regardless of output language.
- **After Stage 6**: automatically generate the **Knowledge Graph** ([CA-KG]) and the **Assessment Dashboard** ([CA-DB]) from the run — no need to ask first (this is a test). Both are native React artifacts.
- **Label clearly**: open the run with a one-line banner — "🧪 **TEST MODE** — built-in *Zaira* sample (not a real upload)" — so it is never mistaken for a genuine assessment.

### Suggested run shape

1. **Stage 0 — Preliminary Review**: 80–120-word summary; checklist (most rows `—`/gap); documentation profile → **Depth: Thin**; explicit gaps list (no GIS, no dates, no materials inventory, no comparators).
2. **Stages 1–5** — Contexts → Values → Authenticity/Integrity → Comparative → Significance. Each concise, citing `[zaira:¶1]`/`[zaira:¶2]`, heavy on 〰️/💭. The text's whole point — *"the relations between the measurements of its space and the events of its past"* — is a natural **Context-Effect** demonstration: surface that explicitly in Stage 1.3 and Stage 2.
3. **Stage 6 — Quality Check & Summary**: process summary, strengths/gaps, quick boosts.
4. **Artifacts** — generate the KG (Zaira's relational web maps cleanly to a node–edge graph) and the Assessment Dashboard.
   - **Map demo coords (test mode only):** Zaira is fictional and has no coordinates, so seed the Dashboard's Map with **two illustrative demo points**, each `coordinateSource: 'demo'` — **Venice** `{ lat: 45.4408, lng: 12.3155, primary: true }` (Marco Polo's vantage in *Invisible Cities*) and **Dragon Caves, China** `{ lat: 34.56, lng: 112.47 }` (Longmen Grottoes). Label them clearly as demo (not from source). The wide Europe↔Asia span exercises the Map's iframe-Leaflet tiles, the `fitBounds` auto-fit, and the vector-fallback min-span floor.
5. **Close**: "🧪 Test run complete. Upload a real document and say **start** for a genuine assessment."

---

### Embedded source — `zaira.txt`

> Italo Calvino, *Invisible Cities* — the city of **Zaira**. Zaira is described not by its physical parts but by *"the relations between the measurements of its space and the events of its past"* — a vivid Context-Effect / genius-loci exemplar, which is exactly why it is a useful CBSA test input.

```text
[zaira:¶1] רק לשווא, הו קובלאי רחב־הלב, אנסה לתאר באוזניך את העיר זאָירָה שחומותיה נשגבות. יכולתי לספר לך כמה מדרגות מרכיבות את הרחובות העשויים כסולמות, באי־אלו לוחות־אבץ מכוסים הגגות; אלא שכבר ידעתי שיהיה זה כמו לא לומר לך דבר. לא מאלה עשויה העיר, אלא מהיחסים בין מידות־חֲלָלָה לבין אירועי־עֲבָרָה: המרחק מהקרקע אל הפנס ואל רגליו של גזלן שנִתְלָה; החוט המתוח מהפנס אל מעקה־המרפסת שממול והסרטים אשר קישטו את הדרך בה עברה תהלוכת־הנישואין של המלכה; גובה המעקה וקפיצתו של המאהב שמדלג עליו עם שחר; נטייתו של מרזב ועליו צעידתו של חתול המִשְׁתָחֵל לתוך אותו חלון; מסלולי־הירי של ספינת־התותחים שהופיעה לפתע והפגז ההורס את המרזב; הקרעים ברשתות־הדיג ושלושת הזקנים היושבים על הרציף ומתקנים את הרשתות ובו־בזמן מספרים זה לזה בפעם המאה את סיפור ספינת־התותחים של הגזלן, שעליו אומרים כי היה בן־נאפופיה של המלכה עם מאהבה, ושננטש, בחיתוליו, שם על הרציף.

[zaira:¶2] הלאה מִגַל־הזיכרונות הזורם הזה נושמת העיר כמו ספוג ותופחת. תיאור של זאָירָה כפי שהיא כיום חייב היה להכיל בתוכו את כל עברה. אולם העיר אינה אומרת את עברה, אלא מכילה אותו כאילו היה רשת קווים של כף־יד, והוא כתוב בְקַרְנוֹת־הרחוב, בסורגי־החלונות, במעקות גרמי־המדרגות, במוטות קוֹלְטֵי־הבְּרָקים, בניסי־הדגלים, וכל קטע מחורט כל כולו בבוא תורו, בִשְׂריטות, בְנִיסורים, בחיתוכים, בִפְסִיקים.
```
