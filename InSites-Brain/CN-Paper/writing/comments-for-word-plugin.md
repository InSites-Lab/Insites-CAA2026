<div dir="rtl">

# הערות סוקר — חומר עבודה לתוסף Claude ב-Word

**מטרת הקובץ**: לאפשר לתוסף Claude ב-Word להכניס את ההערות שלנו כ-Word comments בטיוטה `CulturalInSites_CZ(YY).docx`, מבלי לעבוד באופן ידני על כל הערה.

**איך להשתמש** — ראה סעיף "הוראות הפעלה" בתחתית הקובץ.

**פורמט כל הערה**:

- **מיקום בטיוטה** — לידיעתך (לא להעתקה)
- **עוגן** — טקסט מדויק מהטיוטה, באנגלית. לסמן את הטקסט הזה ב-Word לפני יצירת ההערה
- **טקסט ההערה** — תוכן ההערה באנגלית. להעתיק כתוכן ה-Word comment
- **הערה לעצמך** — קונטקסט / קשר להערות Yael / לא להכניס לתוך ה-Word comment

ההערות מסודרות **לפי סדר ההופעה בטיוטה** — מלמעלה למטה — כדי שתוכל לעבור עליהן ברצף.

---

## הערה 1 — מסגור ההתאמה (INT-1)

**מיקום**: Introduction, פסקה 2

**עוגן**:
> This study investigates how a staged, human-in-the-loop Cultural InSites AI workflow could support non-heritage students' learning of Context-Based Significance Assessment (CBSA) within a one-semester digital heritage course

**טקסט ההערה**:
> Cultural InSites was originally designed for trained heritage professionals (architects, archaeologists, heritage assessors), not for students. Your study tests its transferability to non-heritage undergraduates — that is precisely what makes the investigation novel and valuable. Consider adding a brief sentence here acknowledging this design-vs-use shift; it strengthens the contribution rather than weakening it. (See Yael's comment on Table 1 / Stages 0+6 for the parallel framing at the workflow level.)

**הערה לעצמך**: משלים את הערת Yael #16 — היא בקפטיון Table 1, זו במבוא.

---

## הערה 2 — ציטוט CBSA במופע הראשון (INT-2)

**מיקום**: Introduction, פסקה 2 — מופע ראשון של "CBSA"

**עוגן**:
> Context-Based Significance Assessment (CBSA)

**טקסט ההערה**:
> CBSA is the framework developed in our prior work — please cite it at first mention. Suggested citation: [Yuval/Yael to provide full CAA 2025 reference for source-materials/]. This is a theoretical citation (to the paper); a separate operational reference to the public repo follows later (see comment on "context effect").

**הערה לעצמך**: מסונכרן עם הערות Yael #7, #12. הציטוט המלא ייכנס ל-`source-materials/` של CN-Paper.

---

## הערה 3 — Context effect: הפניה (INT-3)

**מיקום**: Introduction, פסקה 2 — סוף ההגדרה הקצרה של context effect

**עוגן**:
> A key idea is the "context effect": contexts give significance to an asset, and valued assets can in turn reinforce or reshape their wider contexts while keeping human interpretation and decision-making central.

**טקסט ההערה**:
> The "context effect" is a foundational concept of InSites and is formally defined in our prior work. Please add a citation here. Two pointers: (1) theoretical reference: CAA 2025 paper [full citation to be provided]; (2) operational reference: the public repository at https://github.com/InSites-Lab/Insites-CAA2026 — the README serves as entry point. Note: this URL may change before publication; treat as placeholder for now. Important: the epistemic notation (Tier 1/Tier 2, 〰️/💭 markers) that exists in the current repo was NOT in the version you used in the course — do not add it to the paper.

**הערה לעצמך**: גם הגרסה שלהם וגם הנוכחית כוללת context effect כעיקרון יסוד; epistemic notation זה חידוש מאוחר יותר.

---

## הערה 4 — "Cultural InSites LLM" → "Cultural InSites" (instance 1)

**מיקום**: Introduction, פסקה 3

**עוגן**:
> Cultural InSites LLM responds to this challenge by guiding students through staged AI-assisted reasoning while keeping human judgement central.

**טקסט ההערה**:
> Terminology: please use "Cultural InSites" (without the trailing "LLM"). The system is a prompt-engineered workflow built on top of a general-purpose LLM, not an LLM itself. (Aligned with Yael's comment that the LLM is external to the system.) This applies to all occurrences throughout the paper — search for "Cultural InSites LLM" and "Cultural Insites" (lowercase s typo) and standardise to "Cultural InSites".

**הערה לעצמך**: זו ההערה היחידה עם הכוונה גלובלית — לאחר מכן ההערות הבאות יהיו נקודתיות לכל מופע.

---

## הערה 5 — RQ1: סקופ הכלי מול האדפטציה (INT-5)

**מיקום**: Introduction — RQ1

**עוגן**:
> RQ1: To what extent does the Cultural InSites human-in-the-loop AI framework support non-heritage students' ability and confidence in conducting context-based cultural significance assessments that leads to digital storytelling outcomes?

**טקסט ההערה**:
> The current phrasing conflates what the tool natively does (CBSA up to a significance statement) with what your team built around it (the pedagogical loop into storytelling). Suggested rephrasing (not a change to the research question, just clarification): *"RQ1: To what extent does the Cultural InSites human-in-the-loop AI framework — together with the pedagogical workflow we built around it to extend significance assessment into storytelling — support non-heritage students' ability and confidence in conducting context-based cultural significance assessments that lead to digital storytelling outcomes?"* This makes the tool/adaptation distinction visible without diluting the question.

**הערה לעצמך**: מצויין שזה לא שינוי שאלת המחקר, רק הבהרה.

---

## הערה 6 — חידוד "transferable" (INT-6)

**מיקום**: Introduction — פסקת התרומה (לפני "Background")

**עוגן**:
> a transferable human-in-the-loop pedagogical model for integrating AI-assisted significance assessment into digital heritage education

**טקסט ההערה**:
> "Transferable" carries significant weight here — transferable to what? Suggested clarification: *"...a transferable human-in-the-loop pedagogical model — transferable across project-based courses in digital media, design, and creative technology, and adaptable to GLAM-oriented heritage workflows that integrate AI-assisted significance reasoning."* Not a required phrasing — but anchoring at least one interpretation of "transferable" in the text strengthens the claim.

---

## הערה 7 — "Cultural InSites LLM" (instance 2)

**מיקום**: Background, פסקה 3 (לפני "Theoretical Framework")

**עוגן**:
> Cultural InSites LLM operationalises CBSA through a staged and AI-assisted workflow.

**טקסט ההערה**:
> Terminology: → "Cultural InSites" (see global comment earlier).

---

## הערה 8 — CBSA: ציטוט + גשר ל-Burra (TF-1)

**מיקום**: Theoretical Framework — "Heritage Significance Assessment as Interpretive Reasoning", פסקה 1

**עוגן**:
> Context-Based Significance Assessment (CBSA) [citation?] provides the domain logic for conceptualising heritage significance reasoning in this study.

**טקסט ההערה**:
> Two points here: (1) Citation — please add the CAA 2025 reference to CBSA (same as in the Introduction). (2) Bridge to Burra Charter — the move from "Burra Charter says X" to "CBSA does Y" is too quick. Suggest a connecting sentence explaining that CBSA is a specific operationalisation of value-based assessment principles aligned with Burra-style norms — not a synonym, not a direct derivation. This also serves to highlight CBSA's contribution.

---

## הערה 9 — HITL: עיקרון תכנון מול scaffold פדגוגי (TF-2)

**מיקום**: Theoretical Framework — "Cultural InSites as Cognitive Apprenticeship", פסקה 1 (פתיחת הסעיף)

**עוגן**:
> The way in which students learn the complex reasoning process of cultural heritage significance assessment can be drawn on Cognitive Apprenticeship theory

**טקסט ההערה**:
> Important conceptual translation worth making visible: HITL in InSites was originally designed as an *epistemic governance principle* — ensuring human accountability for value and evidence judgements in heritage assessment — not as a learning-design device. Your move to recast it as pedagogical scaffolding is conceptually strong and strengthens your contribution. Suggested sentence to add near the start of this section: *"Although InSites' human-in-the-loop design was originally conceived as an epistemic governance principle, we recast it here as a learning-scaffolding mechanism, where the same checkpoints function pedagogically to externalise reasoning steps for non-heritage students."* Also: Yael's comment elsewhere recommends consistent use of the abbreviation "HITL" after first definition — applies here too.

---

## הערה 10 — Cognitive Apprenticeship: ציטוט במופע הראשון (TF-3)

**מיקום**: Theoretical Framework — "Cultural InSites as Cognitive Apprenticeship", פסקה 1

**עוגן**:
> Cognitive Apprenticeship theory [citation?]

**טקסט ההערה**:
> Collins et al. (1991) is cited later in this same paragraph — please move/duplicate the citation to the first mention.

---

## הערה 11 — "Cultural InSites LLM" (instance 3)

**מיקום**: Theoretical Framework — "Cognitive Apprenticeship", פסקה 3

**עוגן**:
> the purpose of Cultural InSites LLM is not to replace the professional judgment of students but to provide cognitive scaffolding for the learners.

**טקסט ההערה**:
> Terminology: → "Cultural InSites" (see global comment).

---

## הערה 12 — "Cultural Insites LLM" (instance 4 — גם typo) (INT-4)

**מיקום**: Theoretical Framework — "Cognitive Apprenticeship", פסקה אחרונה (לפני ICAP)

**עוגן**:
> Through this framework, the study connects system design, learning processes, and student perceptions, explaining how Cultural Insites LLM supports students in developing reasoning about heritage significance within CBSA pedagogy

**טקסט ההערה**:
> Terminology: → "Cultural InSites" (note: this instance also has a lowercase s typo — "Insites" should be "InSites").

---

## הערה 13 — Schön placeholder (TF-7) — *הצעה, לא חובה*

**מיקום**: Theoretical Framework — אחרי הפסקה האחרונה של ICAP, איפה שכתוב `[need to revise, plan to add more references such as Schön's...]`

**עוגן**:
> [need to revise, plan to add more references such as Schön's conception of professional practice as reflective action in situations that are complex, uncertain, and not reducible to technical rules. not finish yet]

**טקסט ההערה**:
> Suggested phrasing to fill this placeholder: *"InSites' staged checkpoints can be read as scaffolding for Schön's reflection-in-action: each pause invites the student to interrogate AI-generated reasoning under conditions of uncertainty rather than apply rules mechanically."* (1983, *The Reflective Practitioner*). Not required — feel free to take a different angle.

---

## הערה 14 — "Cultural Insites" — typo + גבול הכלי (TF-5)

**מיקום**: Theoretical Framework — "From Significance Reasoning to Storytelling Quality", פתיחת הסעיף

**עוגן**:
> Cultural Insites supports the development of storytelling structures that remain accountable to heritage values, as is built for conservation but open to adjacent creative domains, giving the workflow transfer potential.

**טקסט ההערה**:
> (1) Typo — "Insites" → "InSites".
>
> (2) Scope nuance — Cultural InSites is natively designed to produce an **analytical, evidence-grounded, transparent path** to a defensible significance statement, with substrate (knowledge graph, structured readings) supporting a range of downstream decisions: **what to protect, interpret, coordinate, communicate, or narrate**. Storytelling is one such channel — a legitimate one, but not the primary purpose (conservation decision-support is). Your workflow channels the substrate specifically into storytelling, and that channelling is the pedagogical contribution. Suggested rephrasing: *"Cultural InSites is designed to produce a defensible significance statement and an analytical, evidence-grounded substrate (knowledge graph, structured readings) supporting downstream decisions about what to protect, interpret, coordinate, or narrate. In this study, we built a pedagogical workflow that channels this substrate specifically into digital storytelling production."* (Complements Yael's Table 1 / Stages 0+6 comment.)

---

## הערה 15 — איך בוצעה ההתאמה? (TF-5b)

**מיקום**: Theoretical Framework — "From Significance Reasoning to Storytelling Quality" (אותה פסקה כמו הערה 14, או בפסקה הסמוכה)

**עוגן**:
> Cultural InSites is designed to help our students understand the significance assessment and transfer the understanding into project frameworks for digital storytelling.

**טקסט ההערה**:
> Important methodological question — please describe explicitly in the Methodology section how the adaptation was implemented in practice: (a) Modifications to the bot's system prompt / instructions to lower the assumed level of heritage expertise? (b) Student-facing scaffolding only (sheets, briefings, course materials) while the bot remained in its original "professional" configuration? (c) A combination? (d) Was Stage 6 (storytelling) handled by Cultural InSites, by a different tool, or by free LLM conversation? This matters for two reasons: (1) Reproducibility — without knowing what differed, the experiment cannot be repeated. (2) Conclusions about the tool — if InSites succeeded with non-heritage students without configuration changes, that is a much stronger finding than if substantial modifications were needed. From our perspective as developers, this is a first-order research question, not just a nice-to-know.

---

## הערה 16 — שלושת ממדי איכות הסטוריטלינג (TF-6)

**מיקום**: Theoretical Framework — "From Significance Reasoning to Storytelling Quality", פסקה 2

**עוגן**:
> Our study perceives digital heritage storytelling quality as involving at least three interrelated dimensions: contextual grounding, interpretive responsibility, and narrative coherence.

**טקסט ההערה**:
> The three dimensions you propose are well-defined and clearly your contribution. Worth noting briefly that they happen to align with InSites' design even though the tool was not explicitly designed against these dimensions: contextual grounding maps to InSites' evidence structuring, interpretive responsibility to the HITL governance, and narrative coherence to the significance statement that frames any subsequent narrative. This is a *strength* of the tool — that the dimensions you developed are implicitly supported — and reinforces the tool's suitability as pedagogical substrate. Optional minor rephrasing: acknowledge that the dimensions emerge in the tool as a by-product of its design rather than as a stated objective. If you prefer not to add this nuance, the current phrasing also works.

---

## הוראות הפעלה — איך לעבוד עם תוסף Claude ב-Word

### לפני ההתחלה

1. **גיבוי**: שמור עותק של `CulturalInSites_CZ(YY).docx` במקום בטוח (מומלץ: `OLD/CulturalInSites_CZ(YY)-pre-our-comments.docx` בתיקיית CN-Paper). 16 הערות Yael הקיימות — לא לאבד.
2. **פתח את ה-DOCX ב-MS Word** (לא LibreOffice — תוסף Claude מיועד ל-MS Word).
3. ודא שהתוסף Claude ל-Word מותקן ופעיל (בצד הימני / סרגל הכלים של Word).

### הפעלה — שיטה מומלצת (עבודה הדרגתית)

**שיטה A — לעבוד הערה-הערה (מומלץ, בטוח יותר)**:

לכל הערה ב-16 ההערות לעיל:

1. בקובץ הזה (`comments-for-word-plugin.md`) — העתק את **טקסט העוגן** (התוכן תחת "**עוגן**").
2. ב-Word, השתמש ב-Ctrl+F (חיפוש) כדי למצוא את הטקסט בטיוטה.
3. סמן את הטקסט שנמצא (מסנן את ההתאמה הראשונה אם יש מספר התאמות — היעזר ב"מיקום בטיוטה" שצוין).
4. Insert → Comment (או Ctrl+Alt+M).
5. העתק את **טקסט ההערה** והדבק.
6. עבור להערה הבאה.

זה לוקח ~15-20 דקות לכל ההערות, אבל אתה רואה כל הערה במקום שלה ומאמת שהיא נכונה.

**שיטה B — תוסף Claude מבצע אוטומטית**:

1. פתח את תוסף Claude ב-Word.
2. הדבק את הפרומפט הבא (משונה לפי הצורך):

```text
I have a Word document open with 16 review comments I need to add as Word comments.
The comments are in a Markdown file at:
[נתיב מלא: c:\Users\user\Documents\InSItes-Workshops-26\CAA Workshop\InSites-Brain\CN-Paper\writing\comments-for-word-plugin.md]

For each of the 16 numbered comments in that file:
1. Find the "עוגן" text (anchor — verbatim quote from the draft) in the document.
2. Insert a Word comment at that location.
3. The comment content should be the "טקסט ההערה" text exactly.
4. Skip the "הערה לעצמך" sections — those are notes to me, not for the document.

There are 16 existing Word comments in the document (mostly by Yael ALEF). Do NOT touch them — only add new comments. After adding, report which comments were successfully placed and which (if any) could not find their anchor.
```

3. אמת את התוצאה — עבור על כל 16 ההערות החדשות וודא שכל אחת:
   - נמצאת במקום הנכון
   - מכילה את הטקסט המלא
   - לא חופפת עם הערה קיימת של Yael

### לאחר ההכנסה

- **שמור As** עם שם חדש: `CulturalInSites_CZ(YY)-with-our-comments.docx` (לא להחליף את המקור).
- ודא ש-16 הערות Yael עדיין שלמות.
- **קומיט**: לאחר ש-DOCX מעודכן מוכן, לעשות commit לכל החומרים בענף `cn-paper`.

### תקלות אפשריות

- **"Anchor not found"** — אם התוסף לא מוצא טקסט עוגן, ייתכן ש: (א) התווים השונים בקידוד (smart quotes, em-dashes) — נסה לחפש רק חלק קצר מהמשפט; (ב) הטקסט בטיוטה שונה ממה שחילצתי — תאתר ידנית.
- **התוסף מחליף הערות קיימות של Yael** — עצור מיד. השתמש בשיטה A.
- **טקסט ההערה ארוך מדי** — ניתן לקצר; הטקסט המלא נשמר ב-`review-notes.md` של CN-Paper.

</div>
