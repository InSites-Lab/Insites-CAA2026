# Read-Collection (MA-RC v2) — Guide

## What It Is

MA-RC is a mini-agent inside Bot-Brain. When a user uploads multiple heritage site records and triggers "read collection" or "analyze collection", the bot switches from its normal CBSA assessment mode into a collection-reading mode.

It does not assess individual sites. It reads *across* them — finding patterns, gaps, and insights that no single assessment can show.

---

## Rationale

**Read-Collection: What Gen-AI Can Do with Significance Statements**

Heritage inventories list sites — but rarely say why they matter. When significance assessments do exist, they sit in files, written once for a specific decision and never read again.

Read-Collection is what happens when Gen-AI reads them together:

- **See across.** Individual assessments, read together, reveal patterns and gaps no single file can show.
- **Find blind spots.** 12 of 17 sites mention landscape value, but only 2 mention social value. Real pattern — or documentation habit?
- **Strengthen the parts.** A site that seems ordinary alone may stand out against the rest. Criteria applied unevenly across a collection can be identified and revisited.
- **Scale.** A manager can read 17 files. Not 200. Gen-AI surfaces the patterns; the expert decides what they mean.

A significance statement written today becomes more useful tomorrow — once Gen-AI can read it alongside every other statement in the inventory.

---

## How It Works — Step by Step

### Step 1: Intake
The bot reads everything uploaded and reports three lines: how many items, what format, and how deep the data is (Rich / Medium / Thin). No analysis yet — just recognition.

**Why:** The same workflow handles full CBSA outputs, published case studies, and sparse survey rows. The bot needs to know what it's working with before it can do anything useful.

### Step 2: Extraction & Profile
The bot extracts a structured record from every item — site description, significance summary, values, integrity, comparative references, threats, method. Then it builds a table adapted to the data and writes 3–6 sentences about what stands out across the collection.

**Why:** This is the core step. The structured extraction creates a normalized dataset *as a byproduct of the reading*. Two fields form the core: **description** (what the site is — physical, spatial, factual) and **significance summary** (why it matters — the argument, not the description). The bot doesn't just scan — it distills each item into both its identity and its significance argument. Items where significance is not stated get flagged, and that absence is itself a finding.

**Key design choices:**
- The bot uses the **source's own terminology**, not CBSA terms. If the Finnish assessment says "cultural-historic significance", the bot mirrors that. CBSA normalization is available as a later option, not forced.
- Comparative references extract the **basis** of comparison (rarity, typicality, preservation quality), not just "similar to X".
- Table columns **adapt** to whatever is in the data. No fixed template.

### Step 3: Decision Question
The bot asks: *"What would you like to understand or decide from this collection?"* — and waits.

**Why:** The same collection supports completely different analyses. A heritage manager prioritizing funding needs a different reading than a researcher studying assessment methods across countries. The bot doesn't assume.

### Step 4: Analysis
The bot runs what the user asked. If the user is unsure, it offers 3–5 options derived from the actual data — not a fixed menu. Every analysis ends with: "Another angle? Focus on one site? Done?"

### Step 5: Iteration
The user can request more analyses, zoom into one site, ask the bot to classify/group the collection, or request CBSA normalization (translating all values and contexts into CBSA taxonomy alongside the original terms).

---

## Three Input Scenarios

### A. Full CBSA assessments (Bot-Brain outputs)
- Depth: **Rich**
- Extraction is straightforward — fields align.
- Value: cross-participant patterns. "What did 15 people find that 5 missed?"

### B. Published significance assessments (EAC11 style)
- Depth: **Rich** to **Medium**
- Different terminology per country/method.
- Value: **normalization** — making 9 methods comparable. And gap detection: "Who discusses integrity? Who doesn't?"

### C. Conservation survey data (brief records)
- Depth: **Thin**
- Most significance fields will show `⚠ not stated`.
- Value: demonstrating that **even sparse data has patterns** — and showing concretely what richer documentation would add. This is the strongest argument for why significance statements are worth writing.

---

## Workshop Usage (CAA 2026, ~25 min)

### Preparation
- EAC11 dataset ready (17 case studies, free-text MD file)
- Optionally: aggregated participant outputs from the Write session

### Flow
1. **Upload** the collection to a bot with MA-RC enabled
2. Bot produces **Intake + Extraction + Profile** (~3 min processing)
3. Facilitator reads the Collection Reading aloud. Points out: "Notice the significance summaries — extracted from 9 different national methods into one table"
4. **Decision question** — facilitator asks one, or invites participants to suggest:
   - "Which sites share values that aren't named in their assessments?"
   - "Where are the documentation gaps?"
   - "How do assessment methods differ by country?"
5. **One or two live analyses** (~10 min)
6. **Closing discussion** (~5 min): "What did the collection reveal that no single assessment could?"

### Key Demo Point
The demo should land one argument: **significance statements — even brief ones — become powerful decision tools once Gen-AI reads them as a collection.**

---

## Relationship to Other Components

| Component | Role |
|-----------|------|
| **Write (Stages 0–6)** | Produces assessments. MA-RC reads across them. |
| **MA-RA (Read-Assessment)** | Reads one assessment in depth. MA-RC reads many in breadth. |
| **KG / Dashboard** | Can be invoked from within MA-RC (e.g., collection-level KG). Not yet specified. |

---

## Dataset: EAC11

17 case studies extracted from EAC Guidelines 11 (Feb 2026). Three formats prepared:
- `EAC11_Collection_FreeText.md` — for upload to bot
- `EAC11_Collection_Structured.json` — structured data for artifacts
- `EAC11_Collection_Structured.csv` — tabular with boolean flags

These serve as **benchmark**: run MA-RC on the raw texts, compare bot's extraction to the pre-extracted dataset.

Profile: 17 sites, 10 countries, Neolithic to modern. Average 4.1 values per site, 3.5 threats.

Link to research idea (separate): [🔬 Decomposing Stage 5 assessments through CBSA](https://www.notion.so/31f9a02592f881d2a2fae5f3356c2ff7)

---

## הסבר בעברית

### מה זה MA-RC

מיני-סוכן בתוך Bot-Brain. כשמשתמש מעלה אוסף הערכות ואומר "read collection" — הבוט עובר ממצב הערכה (Write) למצב קריאת אוסף. הוא לא מעריך אתרים בודדים. הוא קורא *חוצה* — מוצא דפוסים, פערים ותובנות שאף הערכה בודדת לא יכולה לחשוף.

### איך זה עובד — שלב אחר שלב

**שלב 1 — קליטה.** הבוט קורא את כל מה שהועלה ומדווח בשלוש שורות: כמה פריטים, מה הפורמט, ומה עומק המידע (עשיר / בינוני / דל). עדיין בלי ניתוח — רק זיהוי. למה? כי אותו workflow מטפל ב-CBSA מלא, בהערכות מפורסמות, ובשורות סקר דלות. הבוט צריך לדעת מה קיבל לפני שהוא עושה משהו.

**שלב 2 — חילוץ ופרופיל.** שני חלקים:
- **חילוץ מובנה** — מכל פריט הבוט מחלץ רשומה: תיאור האתר, תקציר משמעות, ערכים, אותנטיות, קריטריוני השוואה, איומים, שיטת הערכה. שני השדות הראשונים הם הגרעין: **תיאור** = מה האתר (פיזית, מרחבית, מאפיינים) ו-**תקציר משמעות** = למה הוא חשוב (הטענה, לא התיאור). התוצר הזה — הדאטה-סט המובנה — נוצר כתוצר לוואי של הקריאה. אם תקציר המשמעות חסר — הבוט מסמן, ואותו חוסר הוא עצמו ממצא.
- **טבלת פרופיל** — עמודות מותאמות למה שבנתונים, לא טמפלייט קבוע. אחרי הטבלה — 3-6 משפטים על מה בולט באוסף. ואז **עצירה**: "מה את צריכה להחליט או להבין מהאוסף הזה?"

**החלטות עיצוב מרכזיות:**
- הבוט **משקף את שפת המקור**, לא מתרגם ל-CBSA. אם הפיני כתב "cultural-historic significance" — הבוט משתמש במונח שלו. נרמול ל-CBSA זמין כאופציה בשלב 4, לא כברירת מחדל.
- קריטריוני השוואה: לא רק "דומה ל-X" אלא **על בסיס מה** — נדירות, ייצוגיות, איכות שימור. ההבדל בין רשימת שמות לכלי החלטה.
- עמודות הטבלה **מתאימות עצמן** לנתונים. אין תבנית קבועה.

**שלב 3 — ניתוח.** לפי מה שהמשתמש ביקש. אם לא בטוח — הבוט מציע 3-5 אפשרויות שנגזרות מהנתונים (לא תפריט קבוע). כל ניתוח נגמר ב: "עוד זווית? מיקוד באתר אחד? סיימנו?"

**שלב 4 — איטרציה.** עוד ניתוח, מיקוד בפרט אחד, סיווג/קיבוץ, או **נרמול CBSA** — מיפוי כל הערכים ל-CA-V וההקשרים ל-CA-C, מוצג *ליד* המונחים המקוריים. תרגום, לא הערכה חדשה.

### שלושת תרחישי הקלט

**א. תוצרי Bot-Brain (CBSA מלא)** — עומק עשיר. החילוץ ישיר. הערך: דפוסים חוצי-משתתפים. "מה 15 אנשים מצאו ו-5 לא?"

**ב. הערכות משמעות מפורסמות (סגנון EAC11)** — עשיר עד בינוני. טרמינולוגיה שונה לכל מדינה. הערך: נרמול — 9 שיטות הופכות לניתנות להשוואה. ואיתור פערים: "מי מדבר על שלמות? מי לא?"

**ג. סקרי שימור (נתונים דלים)** — רוב שדות המשמעות יסומנו `⚠ not stated`. הערך: להראות שגם מנתונים דלים אפשר ללמוד — ולהמחיש קונקרטית מה תיעוד עשיר יותר היה מוסיף. **זה הטיעון החזק ביותר למה כדאי לכתוב הצהרות משמעות.**

### שימוש בסדנה (~25 דקות)

1. מעלים את האוסף (EAC11 או פלטי משתתפים)
2. הבוט מייצר קליטה + חילוץ + פרופיל (~3 דקות)
3. המנחה מקריא את קריאת האוסף. מצביע: "שימו לב — תקצירי משמעות מ-9 שיטות שונות בטבלה אחת"
4. שאלת החלטה — המנחה שואל אחת, או מזמין הצעות ממשתתפים
5. ניתוח אחד או שניים בזמן אמת (~10 דקות)
6. דיון סיום (~5 דקות): "מה האוסף חשף שהערכה בודדת לא יכלה?"

**נקודת הדמו:** הצהרות משמעות — גם תמציתיות — הופכות לכלי החלטה ברגע ש-Gen-AI קורא אותן כאוסף.

### הקשר לרכיבים אחרים

- **Write (שלבים 0-6)** מייצר הערכות. MA-RC קורא חוצה אותן.
- **MA-RA** קורא הערכה אחת לעומק. MA-RC קורא רבות לרוחב.
- **KG / Dashboard** — ניתנים להפעלה מתוך MA-RC (למשל גרף ידע ברמת אוסף). טרם אופיין.

### הדאטה-סט: EAC11

17 case studies מ-EAC Guidelines 11 (פברואר 2026). שלושה פורמטים:
- `EAC11_Collection_FreeText.md` — להעלאה לבוט
- `EAC11_Collection_Structured.json` — נתונים מובנים ל-artifacts
- `EAC11_Collection_Structured.csv` — טבלה עם דגלים בוליאניים

אלה משמשים כ-**benchmark**: מריצים MA-RC על הטקסטים המקוריים, משווים את חילוץ הבוט לדאטה-סט שחולץ ידנית.

קישור לרעיון מחקר נפרד: [🔬 פירוק הערכות Stage 5 דרך CBSA](https://www.notion.so/31f9a02592f881d2a2fae5f3356c2ff7)

---

## Source

Developed March 10, 2026. Replaces MA-RC v1 in Bot-Brain-en.md.
