<div dir="rtl">

# מוחות Gemini — InSites CAA

גרסה נוכחית: **v9** — קיימות שתי צורות פריסה זהות בתוכן:
**`gem-split/`** (מפוצל, מומלץ ל-Gem) ו-**`InSites-CAA-GEM-v9.3.md`** (מונוליטי).

» version: v9 - split parity + RTL chat tables natural-order

## קבצים

| קובץ | תיאור |
|------|-------|
| `gem-split/` | גרסה מפוצלת — `cbsa-main.md` (הדבקה ל-Instructions, fat-core) + 5 קבצי ידע (`ca-kg.md`, `ca-db.md`, `ma-ra.md`, `ma-rc.md`, `ca-img.md`) |
| `InSites-CAA-GEM-v9.3.md` | מונוליטי — הכול בקובץ אחד, מתאים להעתקה ל-Gem בודד |
| `README.md` | קובץ זה |

גרסאות קודמות (v8 ומטה, וריאנט newHE) הועברו ל-`OLD/`.

## פריסה

עיין ב-`gem-split/README.md` להוראות העלאה מלאות ל-Gemini Gem.
בקצרה: הדבק את `gem-split/cbsa-main.md` בשדה ה-Instructions, והעלה את 5 קבצי הידע (flat, ללא תיקיות).

## הערות v9

- טבלאות צ'אט בעברית: סדר עמודות **טבעי** (העמודה הראשונה בקוד מופיעה מימין ב-RTL). אין שימוש ב-U+200F (RLM).
- `cbsa-main.md` עבר QA: גדרות קוד מאוזנות, ה-`[CA-HE]` והשלבים מרונדרים כ-Markdown תקין.

</div>
