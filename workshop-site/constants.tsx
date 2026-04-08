
import React from 'react';
import {
  ShieldCheck,
  Network,
  Gem,
  Puzzle,
  Scale,
  Scroll,
  SearchCheck,
  Box,
  Zap,
  MessageSquare,
  BookOpen,
  Library,
  Users,
  MessageCircle,
  Footprints,
  Fingerprint,
  Drama,
  Smile
} from 'lucide-react';
import { AgentConfig, SupportAgent } from './types';

export const MODEL_NAME = 'gemini-3-flash-preview';

export const DIALOGUE_PRINCIPLES = [
  {
    title: "Define Identity & Purpose",
    description: "In every prompt, assign the bot a professional role (e.g., conservation advisor or historical researcher). Don't ask general questions — define a clear task against the site data."
  },
  {
    title: "Inject Evidence-Based Context",
    description: "Feed the bot only facts found in documentation (physical attributes, timeline). Don't let it 'fill gaps' from general knowledge — direct it to use only the data you provided."
  },
  {
    title: "Control & Stop Mechanism",
    description: "Require the bot to describe what it understood from the instruction and wait for your approval before starting work. This is the most important rule for preventing data hallucinations."
  }
];

export const PROMPT_ADVISOR_SYSTEM = `
You are a 'Dialogue Architect' expert in cultural heritage. Your role is to help a researcher formulate a professional prompt for the full InSites-CAA.

Mandatory principles:
1. **Criticality & Professionalism**: If the user asks for "recommendations", "conservation plans", or final decisions based on partial information (as in the demo), you **must not** provide a prompt that promises these. Instead, formulate a prompt that asks for "value identification", "sensitivity mapping", "meaning analysis", or "raising dilemmas" to support decision-making.
2. **Output structure**: Your output must be separated into exactly two parts as follows (use the exact separator):

[Prompt content for copying only]
---PROMPT_BOUNDARY---
[Brief explanation to the user about the professional choice you made in the prompt, and why]

3. **The prompt for copying**: Must be short, professional, without headings, address the bot in second person ("Act as an advisor..."), and end with a stop question.
`;
// Re-export sample texts from sampleTexts.ts
export { DEMO_DATA, ZAIRA_TEXT, AYELET_WT_TEXT } from './sampleTexts';

// export const DEMO_DATA = `שם האתר: תחנת הקמח "הטוחן הישן" (The Old Miller's Flour Mill)
// מיקום: גדת נחל הירקון, תל אביב.
// שנת הקמה משוערת: 1922.

// תיאור פיזי:
// מבנה תעשייתי בן 3 קומות עשוי לבני סיליקט וכורכר. הגג קרס בחלקו הדרומי. בתוך המבנה נותרו שרידים של מכונות גריסה גרמניות מקוריות (חברת 'Amme, Giesecke & Konegen'). החלונות המקומרים אטומים בבלוקים משנות ה-70. בחצר המבנה צומחים עצי אקליפטוס עתיקים ששורשיהם מאיימים על היסודות.

// היסטוריה ידועה:
// הוקמה על ידי יצחק גרינברג כחלק מהניסיון לתיעוש עברי בשנות ה-20. 
// בשנות ה-40 שימשה התחנה כסליק נשק של ההגנה (יש שמועות על מרתף נסתר, אך לא נמצאו ראיות).
// בשנות ה-50 המקום ננטש והפך למחסן חומרי בניין.
// כיום המקום נטוש ומגודר, אך משמש כמקום מפגש לא רשמי לאמני גרפיטי.

// סוגיות חברתיות:
// השכונה החדשה שנבנית מסביב (מגדלי יוקרה) לוחצת להרוס את המבנה לטובת "ריאה ירוקה" או חניון.
// מצד שני, קבוצת תושבים ותיקים טוענת שזהו השריד האחרון לתעשייה המוקדמת באזור.`;

// export const ZAIRA_TEXT = `רק לשווא, הו קובלאי רחב־הלב, אנסה לתאר באוזניך את העיר זאָירָה שחומותיה נשגבות. יכולתי לספר לך כמה מדרגות מרכיבות את הרחובות העשויים כסולמות, באי־אלו לוחות־אבץ מכוסים הגגות; אלא שכבר ידעתי שיהיה זה כמו לא לומר לך דבר. לא מאלה עשויה העיר, אלא מהיחסים בין מידות־חֲלָלָה לבין אירועי־עֲבָרָה: המרחק מהקרקע אל הפנס ואל רגליו של גזלן שנִתְלָה; החוט המתוח מהפנס אל מעקה־המרפסת שממול והסרטים אשר קישטו את הדרך בה עברה תהלוכת־הנישואין של המלכה; גובה המעקה וקפיצתו של המאהב שמדלג עליו עם שחר; נטייתו של מרזב ועליו צעידתו של חתול המִשְׁתָחֵל לתוך אותו חלון; מסלולי־הירי של ספינת־התותחים שהופיעה לפתע והפגז ההורס את המרזב; הקרעים ברשתות־הדיג ושלושת הזקנים היושבים על הרציף ומתקנים את הרשתות ובו־בזמן מספרים זה לזה בפעם המאה את סיפור ספינת־התותחים של הגזלן, שעליו אומרים כי היה בן־נאפופיה של המלכה עם מאהבה, ושננטש, בחיתוליו, שם על הרציף.
// הלאה מִגַל־הזיכרונות הזורם הזה נושמת העיר כמו ספוג ותופחת. תיאור של זאָירָה כפי שהיא כיום חייב היה להכיל בתוכו את כל עברה. אולם העיר אינה אומרת את עברה, אלא מכילה אותו כאילו היה רשת קווים של כף־יד, והוא כתוב בְקַרְנוֹת־הרחוב, בסורגי־החלונות, במעקות גרמי־המדרגות, במוטות קוֹלְטֵי־הבְּרָקים, בניסי־הדגלים, וכל קטע מחורט כל כולו בבוא תורו, בִשְׂריטות, בְנִיסורים, בחיתוכים, בִפְסִיקים.`;

export const GRAPH_PROMPT = (input: string, cumulative: string) => `
Analyze the provided text to generate a Knowledge Graph based on the Context-Based Significance Assessment (CBSA) methodology.
Input: ${input}
Cumulative Context: ${cumulative}

OBJECTIVE:
Map the complex web of significance by identifying key entities, values, and context anchors.

RULES:
1. Return ONLY a valid JSON object.
2. Structure: { "nodes": [ { "id": "string", "name": "Display Name", "type": "English Type Token", "meaning": "Explanation of heritage role (5-12 words)" } ], "edges": [ { "from": "id", "to": "id", "label": "relationship_verb" } ] }
3. SELECTION LOGIC: Select 10-15 key nodes. Prioritize:
   - Entities carrying values (Value Carriers)
   - Major places/structures/events
   - Context anchors (Geographic, Social, Political)
   - Social actors
   - Up to 3 abstract cultural values
4. "type" MUST be one of:
   - Physical/Spatial: "place", "structure", "architectural_element", "natural_phenomenon"
   - Human/Social: "person", "social_group", "religion"
   - Temporal/Events: "event", "historical_period", "collective_memory"
   - Cultural/Abstract: "cultural_value", "narrative", "tradition", "artwork"
5. "meaning": Explain the entity's heritage significance in this specific context (match the input language).
6. "label": Relationships should use lowercase English verbs (e.g., "located_in", "expresses", "commemorates").
`;

export const PROMPT_TEMPLATES: Record<number, (input: any) => string> = {
  0: (input) => `SYSTEM PROMPT: CBSA Stage 0 — Pre-check. 
Identify gaps in the data provided. 
MANDATORY: End with "האם לעבור לשלב 1 - מחלץ ההקשרים?"
Input: ${input}`,
  1: (input) => `Stage 1: Context Extractor. Build timeline and context reciprocity. 
MANDATORY: End with "האם לעבור לשלב 2 - מזקק הערכים?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  2: (input) => `Stage 2: Value Purifier. Extract heritage values and attributes. 
MANDATORY: End with "האם לעבור לשלב 3 - בוחן השלמות?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  3: (input) => `Stage 3: Integrity Examiner. Analyze authenticity and integrity via Nara Grid. 
MANDATORY: End with "האם לעבור לשלב 4 - שוקל ומשווה?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  4: (input) => `Stage 4: Comparative Balancer. Perform comparative evaluation. 
MANDATORY: End with "האם לעבור לשלב 5 - סינתיסייזר המשמעויות?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  5: (input) => `Stage 5: Significance Synthesizer. Formulate the Statement of Significance. 
MANDATORY: End with "האם לעבור לשלב 6 - מבקר האיכות?"
Raw: ${input.raw}, Cumulative: ${input.cumulative}`,
  6: (input) => `Stage 6: Quality Auditor. Final audit and assessment wrap. 
MANDATORY: Summarize the process and suggest the next professional action in the field.
Raw: ${input.raw}, Cumulative: ${input.cumulative}`
};

export const PROMPT_PREVIEWS_EN: Record<number, string> = {
  0: `SYSTEM PROMPT: Stage 0 — Pre-check & Data Inventory
PERSONA: 'The Gatekeeper'.
PURPOSE: Confirm asset-specific evidence exists before proceeding to evaluation.
STRUCTURE:
1. Summary (≤120 words): describe uploaded material scope and period.
2. Checklist (6 rows): Location & Setting, Function, Evolution, Contexts, Physicality, Finds.
3. Gap List: Bullets on missing/ambiguous data. Label source as Asset-specific vs General.
4. Data Suggestions: 2-4 concrete asks for completion.
5. Timeline Rule: MANDATORY - Flag every dated event for Stage 1.
6. Stop Question: Approve moving to Stage 1?`,

  1: `SYSTEM PROMPT: Stage 1 — Contexts & Asset Description
PERSONA: 'The Context Extractor'.
STRUCTURE:
1. Narrative Task (~280 words): founders, original function, evolution summary.
2. Attribute & Condition Dossier: Form, structure, materials, technology, stability/defects.
3. Timeline Table: Date/Range | Functional Change | Fabric Change | Source (CRITICAL).
4. Context Paragraphs: Apply Context Reciprocity (Evaluative Two-Way).
   - Geographic, Landscape, Urban, Historical, Social, Political, Technological, Environmental, Intangible, Thematic.
5. Context Summary Bullets: ≤9-word site-specific qualifiers.`,

  2: `SYSTEM PROMPT: Stage 2 — Value Analysis
PERSONA: 'The Value Purifier'.
STRUCTURE:
1. Values Analysis (4-6 bullets, ~400 words):
   - Format: [Value Type] — [Value Meaning-Title].
   - Mystery & Enigma Rule: Distinguish routine gaps from uncertainty that sustains meaning.
   - Value Dynamics: Identify Cohesion or Tension between identified values.
2. Unified Attribute-Value-Meaning-Consequence Table:
   - Mandatory Traceability: Every value from 2.0 must appear here.
   - Consequence: Clear impact on Significance.
3. Workshop Challenge: Questions on value tensions or stakeholder viewpoints.`,

  3: `SYSTEM PROMPT: Stage 3 — Authenticity & Integrity
PERSONA: 'The Integrity Examiner'.
STRUCTURE:
1. Nara Grid (MANDATORY):
   - Aspects: Form & Design, Material & Substance, Use & Function, Location & Setting.
   - Grading: High / Medium / Low / Lost independently per row.
   - Value Expression: Link each row back to Stage 2 values.
2. Integrity Narrative: Analysis of dilemmas, losses, or reinforcing factors.
3. Regional Note: Local frameworks and authenticity priorities.`,

  4: `SYSTEM PROMPT: Stage 4 — Comparative Evaluation
PERSONA: 'The Comparative Balancer'.
STRUCTURE:
1. Comparative Set: Minimum 2 comparable sites (geographic, typologic, or thematic).
2. Criteria Analysis: Period, Rarity, Documentation, Ensemble, Condition, Research Potential.
3. Synthesis Paragraph: Distinctiveness relative to comparanda.
4. Stop Question: Proceed to Stage 5?`,

  5: `SYSTEM PROMPT: Stage 5 — Cultural Significance Statement
PERSONA: 'The Significance Synthesizer'.
STRUCTURE:
1. Significance Statement (3-5 paragraphs, ≤300 words):
   - MANDATORY OPENING: Weave together Contexts (S1), Values (S2), Integrity (S3), and Distinctiveness (S4).
   - Coherence Analysis: How these elements form a unified cultural interpretation.
2. Optional Tracks Menu:
   - Knowledge Graph (KG): Interactive entity mapping.
   - Semiotic Reading: Symbols, metaphors, and cultural codes.
   - Educational/Community Ideas.
   - Alternative Narrative Framings.`,

  6: `SYSTEM PROMPT: Stage 6 — Assessment Wrap (Audit)
PERSONA: 'The Quality Auditor'.
STRUCTURE:
1. Strengths: 2-3 sentences on confirmed core values.
2. Boost Table (≤3 rows): Small tweaks for impact (Quick Wins).
3. Next Steps: Concrete actions to complete/refine the study.
4. Professional Practice Note: Offer region-specific framework review.
5. Workshop Challenge: Questions on collaboration and standards navigation.`
};

export const PROMPT_TRANSLATIONS: Record<number, string> = {
  0: `פרומפט מערכת: שלב 0 — בדיקה מקדימה של פערי המידע
פרסונה: 'מנהל הדאטא של האינוונטר'.
מבנה פלט חובה:
1. סיכום (עד 120 מילים): תיאור החומרים, היקף וסוג הנכס.
2. טבלת בדיקה (6 שורות): מיקום, תפקוד, אבולוציה, הקשרים, פיזיקה, ממצאים.
3. רשימת פערים: פירוט מידע חסר או מעורפל. סיווג מקורות לנכס ספציפי מול כללי.
4. הצעות לנתונים: 2-4 בקשות קונקרטיות להשלמה (תמונות, תוכניות, ראיונות).
5. כלל ציר הזמן: חובה לסמן כל אירוע מתוארך לקראת שלב 1.
6. שאלת עצירה: אישור מעבר לשלב 1?`,

  1: `פרומפט מערכת: שלב 1 — תיאור והקשרים
פרסונה: 'המתכנן והחוקרים (מתעד /ארכאולוג) '.
מבנה פלט חובה:
1. משימה נרטיבית (~280 מילים): מייסדים, תפקוד מקורי, סיכום אבולוציה.
2. דוסייר מאפיינים ומצב: צורה, מבנה, חומרים, טכנולוגיה, יציבות ופגמים.
3. טבלת ציר זמן: תאריך | שינוי תפקודי | שינוי פיזי | מקור.
4. פסקאות הקשר: יישום 'אפקט ההקשר' (Context Reciprocity) דו-כיווני.
   - גאוגרפי, נופי, אורבני, היסטורי, חברתי, פוליטי, טכנולוגי, סביבתי, בלתי-מוחשי.
5. סיכום הקשרים: הגדרות תמציתיות של עד 9 מילים.
6. שאלה למחשבה: העמקה בנושא ההקשרים במיוחד עבור הקשרים לא מובנים מאליהם`
  ,

  2: `פרומפט מערכת: שלב 2 — ניתו הערכים
פרסונה: 'מומחה הערכה תרבותית ומנהל נכסי מורשת'.
מבנה פלט חובה:
1. ניתוח ערכים (4-6 בולטים, כ-400 מילים):
   - פורמט: [סוג הערך] — [משמעות הערך באתר].
   - כלל מסתורין (Mystery & Enigma): הבחנה בין פערי מידע טכניים לבין אי-וודאות המזינה את המשמעות התרבותית.
   - דינמיקת ערכים: זיהוי לכידות (Cohesion) או מתח (Tension) בין הערכים.
2. טבלה מאוחדת (מאפיין-ערך-משמעות-השלכה):
   - עקיבות חובה: כל ערך מסעיף 2.0 חייב להופיע בטבלה.
   - קישור מאפיינים לסוגי שינוי (חומר, שימוש, הקשר וכו').
3. שאלות למחשבה:המצא שאלות למשל על מתחי ערכים או נקודות מבט של מחזיקי עניין.`,

  3: `פרומפט מערכת: שלב 3 — מבחן האותנטיות והשלמות
פרסונה: 'משמר מומחה ואדריכל'.
מבנה פלט חובה:
1. טבלת נארה (Nara Grid - חובה):
   - היבטים: צורה ועיצוב, חומר ומהות, שימוש ותפקוד, מיקום והקשר.
   - דירוג: גבוה / בינוני / נמוך / אבוד לכל שורה בנפרד.
   - ביטוי ערכי: קישור כל שורה לערכים משלב 2.
2. נרטיב שלמות: ניתוח דילמות, אובדן משמעותי או גורמים מחזקים.
3. הערה אזורית: סקירת עקרונות אותנטיות לפי מסגרות עבודה מקומיות.
4. שאלות למחשבה:המצא שאלות למשל על דילמות שימוריות בין שלבים שונים.`,

  4: `פרומפט מערכת: שלב 4 — השוואה לנכסים אחרים
פרסונה: 'חוקר טיפולוגיות אדריכליות ומנהל מורשת'.
מטרה: השוואה לנכסים דומים ברמה מקומית ובינלאומית תוך שימוש בקריטריוני השוואה.
מבנה פלט חובה:
1. סט השוואתי: לפחות 2 אתרים דומים (גאוגרפית, טיפולוגית או תמטית).
2. ניתוח קריטריונים: תקופה, נדירות, תיעוד, קשר למכלול, מצב פיזי, פוטנציאל מחקרי.
3. פסקת סינתזה: הגדרות ייחודיות ביחס לקבוצת ההשוואה.
4. שאלות למחשבה:המצא שאלות למשל על ייחוד הנכס לעומת היותו מייצג בטיפולוגיה.`
  ,
  5: `פרומפט מערכת: שלב 5 — סיתנזה והצהרת משמעות
פרסונה: 'מתכנן השימור + הארכאולוג/המתעד'.
מבנה פלט חובה (נאמנות מלאה לפרוטוקול):
1. הצהרת משמעות (3-5 פסקאות, עד 300 מילים):
   - פסקת פתיחה מנדטורית: שזירה מפורשת של הקשרים (S1), ערכים (S2), שלמות (S3) וייחודיות (S4).
   - ניתוח הלכידות: כיצד המרכיבים מתגבשים לפרשנות תרבותית מאוחדת ורציפה.
2. שאלות למחשבה - אודות נרטיבים חלופיים, מהם המשמעויות הבולטות ואיך ההקשרים קבעו אותם   
3. תפריט מסלולים אופציונליים:
   - גרף ידע (KG): מיפוי אינטראקטיבי של ישויות וקשרים.
   - קריאה סמיוטית: ניתוח סמלים, מטאפורות וקודים תרבותיים.
   - רעיונות לחינוך וקהילה.
   - נרטיבים חלופיים.`,

  6: `פרומפט מערכת: שלב 6 — בקרת איכות התהליך
פרסונה: 'איש הדאטה, מנהל המורשת וכל הפרסונות בתהליך'.
מבנה פלט חובה:
1. סיכום הערכה: תמצית נקודות החוזק שאוששו (2-3 משפטים).
2. טבלת שדרוג (Boost Table): שינויים קטנים בעלי השפעה משמעותית (ניצחונות מהירים).
3. צעדים הבאים: פעולות קונקרטיות להשלמת או טיוב המחקר.
4. הערה מקצועית: סקירת מסגרות עבודה ספציפיות לאזור המקצועי.
5.  שאלות מחשבה:  בעיקר בהקשר ליכולת המסמך לתמוך בהחלטה.`,
};

export const CORE_AGENTS: AgentConfig[] = [
  { id: 0, name: "0 - Pre-check & Data Inventory", role: "Verify data gaps in uploaded material", color: "slate", icon: <ShieldCheck size={20} /> },
  { id: 1, name: "1 - Description & Contexts", role: "Description, timeline & context analysis", color: "blue", icon: <Network size={20} /> },
  { id: 2, name: "2 - Value Analysis", role: "Identify heritage values & meanings", color: "amber", icon: <Gem size={20} /> },
  { id: 3, name: "3 - Authenticity & Integrity", role: "Authenticity and physical condition", color: "emerald", icon: <Puzzle size={20} /> },
  { id: 4, name: "4 - Comparative Evaluation", role: "Comparison criteria vs. other assets", color: "indigo", icon: <Scale size={20} /> },
  { id: 5, name: "5 - Synthesis & Significance", role: "Formulate significance statement", color: "purple", icon: <Scroll size={20} /> },
  { id: 6, name: "6 - Quality Audit", role: "Logic review and gap summary", color: "rose", icon: <SearchCheck size={20} /> }
];

export const SUPPORT_AGENTS: SupportAgent[] = [
  { id: 'img', name: "Visual Analysis", icon: <Box size={16} /> },
  { id: 'know', name: "Knowledge Graph", icon: <Zap size={16} /> },
  { id: 'narr', name: "Alternative Narratives", icon: <BookOpen size={16} /> },
  { id: 'coll', name: "Collection Analysis", icon: <Library size={16} /> },
  { id: 'sent', name: "Community Values & Sentiment", icon: <MessageSquare size={16} /> },
];

export const STEP_DETAILS: Record<number, {
  whyImportant: string;
  whatHappens: string[];
  cognitiveLink: string;
  promptSummary: string;
  featureSpotlight?: { title: string; description: string };
  extensions?: { name: string; url: string; description: string }[];
}> = {
  0: {
    whyImportant: "This stage serves as a 'gateway' — ensuring there is enough data before analysis begins. Prevents analysis based on missing or unfounded information.",
    whatHappens: [
      "Scan uploaded materials to identify type and source",
      "Checklist of 6 points: location, function, timeline, contexts, physical description, findings",
      "Identify specific data gaps and classify them",
      "Concrete suggestions for completing missing information"
    ],
    cognitiveLink: "Starting point — no prior stages. Gaps identified here will be flagged throughout the entire process.",
    promptSummary: "Scan the materials, check 6 mandatory categories, list specific gaps, and suggest sources for completion."
  },
  1: {
    whyImportant: "Builds the interpretive framework — where, when, and in what relationships the asset exists. This is the foundation for all subsequent analysis.",
    whatHappens: [
      "Narrative description of the asset (~280 words)",
      "Build a detailed timeline with sources",
      "Identify key contexts (e.g., geographic, historical, social, technological)",
      "Apply 'Context Effect' principle — how context frames meaning and vice versa"
    ],
    cognitiveLink: "Builds on Stage 0: uses scanned materials, flags gaps identified in the timeline.",
    promptSummary: "Describe the asset, build a timeline, analyze bidirectional contexts and define site-specific relationships.",
    featureSpotlight: {
      title: "↔ Context Effect — Bidirectional Analysis",
      description: "How context frames the asset AND how the asset reframes the context. Planning implications flagged with 🧭 and collected in Stage 6."
    }
  },
  2: {
    whyImportant: "The core of significance assessment — translates contexts and physical attributes into defined cultural meanings.",
    whatHappens: [
      "Identify significant site values (e.g., historical, aesthetic, social, technological)",
      "For each value: evidence (attributes) → context → value → meaning",
      "Build an attribute-value-meaning-consequence table (what happens if the value is harmed)",
      "Identify value dynamics: cohesion or tension?"
    ],
    cognitiveLink: "Contexts from Stage 1 become 'lenses' through which values are identified. The timeline feeds historical values.",
    promptSummary: "Identify heritage values, build an attribute-value table, and analyze dynamics between different values.",
    featureSpotlight: {
      title: "Evidence Strength Marking",
      description: "Values marked by evidence tier: explicit (sourced), inferred°, uncertain💭. The attribute table shows what's at stake if each attribute is compromised."
    }
  },
  3: {
    whyImportant: "Examines the state of evidence on the ground — integrity and authenticity (proximity to the original). Do the attributes still exist and can they express the values?",
    whatHappens: [
      "NARA Grid: form, material, use, setting",
      "Grading for each aspect: High / Medium / Low / Lost",
      "Link each aspect to values from Stage 2",
      "Identify what is preserved, what changed, what was lost"
    ],
    cognitiveLink: "Asks: Do the physical evidences still allow expressing the values from Stage 2? The timeline from Stage 1 explains when changes occurred.",
    promptSummary: "Build a Nara Grid, grade authenticity for each aspect, and link back to identified values.",
    featureSpotlight: {
      title: "Vulnerability Matrix",
      description: "Cross-tabulates values × Nara aspects → impact levels. Available in the assessment dashboard for interactive exploration."
    }
  },
  4: {
    whyImportant: "Calibrates significance — is the asset unique or representative? At what scale: local, regional, national?",
    whatHappens: [
      "Identify relevant comparable assets (at least 2)",
      "Comparison matrix: period, rarity, documentation, condition",
      "Analyze what distinguishes the asset relative to comparisons",
      "Calibrate significance level: local, regional, national"
    ],
    cognitiveLink: "Are the values from Stage 2 expressed here more/less than in similar assets? Does the authenticity from Stage 3 set it apart?",
    promptSummary: "Compare to similar assets, analyze criteria, and define the asset's uniqueness."
  },
  5: {
    whyImportant: "Unites all analysis into a coherent significance narrative — the answer to 'why and what to conserve?'",
    whatHappens: [
      "Significance statement of 3-5 paragraphs (~300 words)",
      "Weave together contexts, values, authenticity and uniqueness",
      "Coherence analysis — how the components create meaning together",
      "Propose optional tracks for deeper exploration"
    ],
    cognitiveLink: "The meeting point of Stages 1-4. Not a summary — but a synthesis showing how elements create meaning together.",
    promptSummary: "Write a significance statement that integrates all previous stages into one coherent narrative.",
    extensions: [
      { name: "Knowledge Graph", url: "graph-create", description: "Entity and relationship mapping" },
      { name: "Semiotic Reading", url: "q-semiotics", description: "Symbols and cultural codes" },
      { name: "Alternative Narratives", url: "q-narratives", description: "Interpretations and perspectives" },
      { name: "Site Activity Planning", url: "q-education", description: "Education and community" },
      { name: "Community Values", url: "q-sentiment", description: "Sentiment and stakeholders" },
      { name: "Court Jester", url: "q-jester", description: "Challenge core assumptions" }
    ]
  },
  6: {
    whyImportant: "Ensures the assessment was rigorous and transparent. Identifies strengths and gaps — not conservation recommendations!",
    whatHappens: [
      "Summary of assessment strengths (2-3 sentences)",
      "Small improvements table (up to 3 rows)",
      "Concrete next steps (1-2)",
      "Professional practice note"
    ],
    cognitiveLink: "Checks: Is the synthesis from Stage 5 supported? Were we rigorous throughout all stages? Do we need to go back?",
    promptSummary: "Audit the process, identify strengths and weaknesses, and suggest next steps.",
    featureSpotlight: {
      title: "Session Debrief & Trust Profile",
      description: "After quality check: 3 reflection questions + interaction map create a research-grade record of your collaboration with the bot."
    }
  }
};

// Node type translations for Knowledge Graph
export const TYPE_HE: Record<string, string> = {
  // Physical
  site: 'Heritage Site',
  place: 'Place',
  structure: 'Structure',
  architectural_element: 'Architectural Element',
  natural_phenomenon: 'Natural Phenomenon',
  // Social
  person: 'Person',
  social_group: 'Social Group',
  religion: 'Religion/Belief',
  // Time/Event
  period: 'Period',
  event: 'Event',
  historical_period: 'Historical Period',
  collective_memory: 'Collective Memory',
  // Abstract
  value: 'Value',
  cultural_value: 'Cultural Value',
  narrative: 'Narrative',
  tradition: 'Tradition',
  artwork: 'Artwork',
  // Fallback
  physical: 'Physical',
  default: 'General'
};

// Educational prompt for AI explanation
export const EDUCATIONAL_PROMPT = `**Role:** As an expert in cultural assessment and Generative AI.
**Goal:** Explain to workshop participants what a Large Language Model (LLM) is and how it differs from human thinking in heritage assessment.
**Tasks:**
1. Explain how a language model tries to understand the "meaning" of a heritage asset (e.g., 'water tower') through statistics and word prediction, versus how a human researcher interprets it as a nexus of memories, identity, and physical contexts.
2. Use the concept of "Context Effect" to show how AI can help extract contexts, but only humans can assign cultural value.
**Reflective addition:** What 3 questions do you suggest I ask myself every time I receive a value analysis from you (the bot), to ensure I haven't lost my "professional voice"?`;

// MA-RC Instructions for collection analysis
export const MARC_INSTRUCTIONS = {
  he: {
    title: "ניתוח אוסף הערכות",
    purpose: "סיוע למשתמשים לסרוק אוסף של אתרים, נכסים או נופי תרבות עירוניים באמצעות תהליך מובנה מונחה-משתמש",
    promptContent: `פעל כמנהל מורשת ומדען נתונים. המשימה - ניתוח רוחבי של האוסף שהועלה בשלבים:

1. קריאה ואינדוקס: נתח את הקבצים שהועלה ללא הקדמות. אנדקס כל רשומה כ'אתר', 'נכס' או 'נוף תרבות עירוני'.

2. דגלי ראיות: סמן (✓/—) עבור כל פריט: קיום ערכים, הצהרת משמעות, שלמות ואותנטיות, ומידע מתוארך.

3. טבלת תמונת מצב: הצג טבלה מרכזת של עד 10 שורות עם נתוני ליבה של האוסף.

4. סיכום נתונים: תאר בקצרה (3-5 משפטים) דפוסים בולטים, ערכים ותמות מרכזיות ופערי מידע בתוך האוסף.

שאלות עצירה מנדטוריות (Stop Prompts):
• האם יש מה להוסיף או לתקן בתמונת המצב או בסיכום?
• האם תרצה אפשרויות ניתוח (כמותי / איכותני)?
• האם תרצה אפשרויות לסיווג אתרים לצרכי ניהול מורשת?`,
    steps: [],
    prompts: []
  },
  en: {
    title: "Assessment Collection Analysis [MA-RC]",
    purpose: "Assist users in scanning a collection of sites, assets, or urban-cultural landscapes using structured, user-led steps.",
    promptContent: `Act as a Quality Controller and Information Specialist for Heritage Collections. Mission: Perform a cross-sectional analysis of the uploaded collection according to the following steps:

1. Read & Index
   >> Parse uploaded files without excessive preamble; index each record as Site / Asset / Urban-Cultural Landscape.

2. Evidence Flags
   >> For every item note (✓/—) for: Values (CA-V), Significance statements, Integrity/Auth, and Dated info.

3. Snapshot Table
   >> Display totals plus a summary table (max 10 rows).

4. Data Summary
   >> Write 3-5 sentences on evident patterns and gaps. Strictly descriptive.

---
Mandatory Stop Prompts:
• Anything to add or correct in the snapshot or summary?
• Would you like analysis options?
• Would you like proposed site classification options?`,
    steps: [],
    prompts: []
  }
};

// Research queries for extensions
export const RESEARCH_QUERIES = [
  {
    route: 'q-narratives',
    title: "Alternative Narratives",
    description: "Examine the site through the eyes of different stakeholders.",
    icon: <Users size={16} />,
    prompt: `Act as a heritage researcher using a 'Values-Based Management' approach and CBSA methodology, promoting **Polyvocality** in conservation processes.

Task: Analyze the site through the 'lenses' of 3 distinct identity groups or stakeholders (e.g., long-time residents, a developer, a historical figure, or an author whose work resonates with the place).

For each group, analyze:
1. Value reflection: What are the core heritage values this group attributes to the site? (e.g., social, symbolic, economic, or identity value).
2. Tension points: Where does their interpretation clash with narratives of other groups?
3. Role of space: How does the physical site serve as a **bridge** (connecting identities) or a **barrier** (perpetuating conflict)?

Summary: Present an integrative insight on the potential for inclusion of the different narratives at the site.`
  },
  {
    route: 'q-sentiment',
    title: "Community Sentiment",
    description: "Sentiment and community values analysis.",
    icon: <MessageCircle size={16} />,
    prompt: `Act as a community sentiment and values analyst.
Task: From the attached text, extract the "social values map."
Look for emotional keywords, shared memories, and descriptions of everyday use.
Present in a table: [Quote from text] | [Social value identified] | [Emotional connection strength].
Summary: What is the "Spirit of the Place" (Genius Loci) as perceived by the community?`
  },
  {
    route: 'q-education',
    title: "Interpretation & Education",
    description: "Proposals for site activities based on identified heritage values.",
    icon: <Footprints size={16} />,
    prompt: `Act as a team of a senior Heritage Interpretation planner and a learning activity developer specializing in on-site learning.
Task: Develop 3 concepts for experiential-educational activities at the site, bringing to life the 'Significance Statement' and the site attributes we identified.

Work process:
1. Data gathering (preliminary): Before presenting ideas, ask me about the site's physical characteristics to consider, current conservation status, and management/other constraints. Wait for my response.
2. Proposal development: Based on my response, develop 3 proposals combining active learning (Learning by Doing) and physical-digital interface (Phygital) suited to the site's character, or other creative ideas.

Structure for each proposal:
• Leading value: Which specific heritage value(s) (from previous analysis) does the activity 'activate'?
• Experience profile: Target audience, pedagogical goal, and the central emotion the activity creates.
• Activity description: What does the visitor actually do? (Connection between physical space and content).
• Planning aspects: Physical/infrastructure requirements at the site.
• Feasibility: Resource assessment (budget/operations).

Keep your responses optimally concise.`
  },
  {
    route: 'q-semiotics',
    title: "Semiotic Analysis",
    description: "Decode symbols, cultural codes, and metaphors in the heritage asset.",
    icon: <Fingerprint size={16} />,
    prompt: `Act as a cultural semiotics expert.
Task: Perform a "semiotic reading" of the site.
Identify 3 elements (physical or abstract) that function as cultural "signs."
For each sign:
1. What is the signifier (the physical element)?
2. What is the signified (the cultural meaning/metaphor)?
3. How has this cultural code changed over time (diachrony)?`
  },
  {
    route: 'q-jester-chorus',
    title: "Court Jester / Greek Chorus",
    description: "Reflective voices for examining the process: the subversive Jester and the interpreting Chorus.",
    icon: <Drama size={16} />,
    subQueries: [
      {
        route: 'q-jester',
        title: "Court Jester",
        description: "Challenge core assumptions through provocative questions.",
        icon: <Smile size={16} />,
        prompt: `Act as "The Court Jester" in the spirit of CBSA methodology.
Your role: Challenge the analysis from within using a subversive-playful voice, exposing contradictions, overconfidence, and hidden assumptions — without adding facts.
Do this:
1. Challenge overly safe phrasings ("Is that really so?").
2. Point out internal contradictions or absurdities the analysis tries to smooth over.
3. Expose hidden assumptions not explicitly stated.
4. Use reversal, irony, and sharp questions.
What NOT to do: Don't add information or contexts, don't propose alternative analysis, don't speak authoritatively.
Tone: Sharp, playful, informal yet intelligent. Slight exaggeration is allowed to reveal truth.
Ending: End with a statement or question that unsettles existing certainty.`
      },
      {
        route: 'q-chorus',
        title: "Greek Chorus",
        description: "Interpretive-public accompaniment illuminating choices and value tensions.",
        icon: <Users size={16} />,
        prompt: `Act as "The Greek Chorus Voice" in the spirit of CBSA methodology.
Your role: Accompany the existing output with a conscious interpretive-public voice, without adding new information and without deciding.
Do this:
1. Point out transitions from description to meaning.
2. Illuminate quiet phrasing choices and embedded assumptions.
3. Flag value tensions or sensitivity points.
4. Address the meaning of how things are phrased, not the correctness of facts.
What NOT to do: Don't add evidence, contexts, or new interpretation. Don't propose full alternative phrasing, and don't determine what is right or wrong.
Tone: Careful, public, self-aware. Use hedging phrases ("this is how it might sound", "there is a choice here").
Ending: Always end with an open stop question that returns responsibility to the user.`
      }
    ]
  }
];

// Types for research queries
export type ResearchQuery = (typeof RESEARCH_QUERIES)[number];
export type ResearchSubQuery = NonNullable<ResearchQuery['subQueries']>[number];
export type ResearchQuerySelection = ResearchQuery | ResearchSubQuery;

// Node color mapping for Knowledge Graph visualization
export const getNodeColor = (type: string) => {
  switch (type) {
    // Physical/Spatial - Green/Stone/Teal
    case 'site': return { background: '#10b981', border: '#047857', highlight: '#34d399' };
    case 'place': return { background: '#10b981', border: '#047857', highlight: '#34d399' };
    case 'structure': return { background: '#64748b', border: '#334155', highlight: '#94a3b8' };
    case 'architectural_element': return { background: '#78716c', border: '#44403c', highlight: '#a8a29e' };
    case 'natural_phenomenon': return { background: '#059669', border: '#064e3b', highlight: '#34d399' };

    // Human/Social - Violet/Pink/Purple
    case 'person': return { background: '#8b5cf6', border: '#5b21b6', highlight: '#a78bfa' };
    case 'social_group': return { background: '#ec4899', border: '#be185d', highlight: '#f472b6' };
    case 'religion': return { background: '#a855f7', border: '#7e22ce', highlight: '#c084fc' };

    // Temporal/Events - Orange/Blue/Cyan
    case 'period': return { background: '#f59e0b', border: '#b45309', highlight: '#fbbf24' };
    case 'event': return { background: '#f59e0b', border: '#b45309', highlight: '#fbbf24' };
    case 'historical_period': return { background: '#3b82f6', border: '#1e3a8a', highlight: '#60a5fa' };
    case 'collective_memory': return { background: '#06b6d4', border: '#0e7490', highlight: '#67e8f9' };

    // Cultural/Abstract - Amber/Rose/Fuchsia
    case 'value': return { background: '#f59e0b', border: '#b45309', highlight: '#fbbf24' };
    case 'cultural_value': return { background: '#d97706', border: '#b45309', highlight: '#f59e0b' };
    case 'narrative': return { background: '#f43f5e', border: '#be123c', highlight: '#fb7185' };
    case 'tradition': return { background: '#14b8a6', border: '#0f766e', highlight: '#5eead4' };
    case 'artwork': return { background: '#d946ef', border: '#a21caf', highlight: '#e879f9' };

    default: return { background: '#94a3b8', border: '#475569', highlight: '#cbd5e1' };
  }
};

// ─── Looking Glass Cards ──────────────────────────────────────────
export const LOOKING_GLASS_CARDS = [
  {
    id: 'mirror',
    title: 'Mirror, Not Magic',
    tagline: 'The LLM is a looking glass — more than a wonderland.',
    color: 'rose',
    content: `It reflects your material back, structured through CBSA.\nEvery claim sourced. Every step approved by you.\nAlice decides where and when to step.`,
  },
  {
    id: 'low-floor',
    title: 'Low Floor, High Ceiling',
    tagline: 'After Mitchel Resnick\'s design principles for Scratch',
    color: 'indigo',
    content: `**Chat-native platforms** — Claude Projects · Gemini · GPTs\n- Every step is a conversation — maximum human-in-the-loop\n- Full prompt transparency — readable, editable, challengeable\n- You control the LLM directly in natural language\n\n**Not a standalone app** — No React + Node + API production stack.\nWe gave up polished agentic UX — which has real advantages — because CBSA should be driven by human judgment, not automated by agent workflows.`,
  },
  {
    id: 'stay-current',
    title: 'Stay Current, Stay in Control',
    tagline: 'LLMs evolve fast. Our platform choice keeps us on the edge.',
    color: 'emerald',
    content: `- Test the latest models the moment they ship — no migration, no refactoring\n- No API costs that make us conservative with the deep, multi-stage analysis CBSA demands\n- No architectural lock-in — what works today doesn't constrain tomorrow\n\n*The tool serves the assessor. The assessor doesn't serve the tool.*`,
  },
];

// ─── Glossary ─────────────────────────────────────────────────────
export const GLOSSARY: { term: string; definition: string; relatedHash?: string }[] = [
  { term: 'CBSA', definition: 'Context-Based Significance Assessment — a structured methodology for evaluating cultural heritage through contexts, values, authenticity, and comparison.', relatedHash: 'step-0' },
  { term: 'Context Effect', definition: 'Bidirectional analysis: how context frames the asset\'s meaning AND how the asset reframes its context.', relatedHash: 'step-1' },
  { term: 'Epistemic Notation', definition: 'Three-tier evidence marking: explicit (sourced), inferred°, uncertain💭 — making the bot\'s confidence visible.', relatedHash: 'notation' },
  { term: 'HITL', definition: 'Human-in-the-Loop — the assessor approves every stage transition. The bot proposes; the human decides.', relatedHash: 'governance' },
  { term: 'Nara Grid', definition: 'Authenticity framework (form, material, use, setting) graded High/Medium/Low/Lost per row.', relatedHash: 'step-3' },
  { term: 'Knowledge Graph', definition: 'Interactive visual mapping of entities (places, events, values) and their semantic relationships.', relatedHash: 'graph' },
  { term: 'Significance Statement', definition: 'The synthesis (Stage 5): a coherent narrative weaving contexts, values, integrity and distinctiveness into "why conserve."', relatedHash: 'step-5' },
  { term: 'MA-RA', definition: 'Read-Assessment workflow — structured analytical readings of a single completed assessment.', relatedHash: 'read-assessment' },
  { term: 'MA-RC', definition: 'Read-Collection workflow — cross-sectional analysis scanning a collection of heritage assessments.', relatedHash: 'inventory' },
  { term: 'Value Dynamics', definition: 'Cohesion or tension between identified heritage values — does a value reinforce or compete with another?', relatedHash: 'step-2' },
  { term: 'Session Debrief', definition: 'Post-assessment reflection: 3 questions + interaction map creating a research-grade trust profile.', relatedHash: 'session-report' },
];

// ─── Session Resources ────────────────────────────────────────────
export const SESSION_RESOURCES: Record<number, { prep?: string[]; stages?: number[]; tools?: string[]; hashLinks?: { label: string; hash: string }[] }> = {
  1: {
    stages: [0, 1, 2, 3, 4, 5, 6],
    hashLinks: [
      { label: 'Design Principles', hash: 'design' },
      { label: 'Epistemic Notation', hash: 'notation' },
    ],
  },
  2: {
    stages: [0, 1, 2, 3, 4, 5],
    tools: ['Prompt Advisor', 'Knowledge Graph'],
    hashLinks: [
      { label: 'InSites-CAA (GPT)', hash: '' },
      { label: 'InSites-CAA (Gemini)', hash: '' },
    ],
  },
  3: {
    stages: [5, 6],
    tools: ['Dashboard', 'Collection Analysis', 'Read Assessment'],
    hashLinks: [
      { label: 'Assessment Dashboard', hash: 'dashboard-preview' },
      { label: 'Collection Dashboard', hash: 'inventory' },
      { label: 'Read Assessment', hash: 'read-assessment' },
    ],
  },
  4: {
    tools: ['Agent Builder'],
    hashLinks: [
      { label: 'Build Agent (GPT)', hash: '' },
      { label: 'Build Agent (Gemini)', hash: '' },
    ],
  },
};

// ─── Lab Team ─────────────────────────────────────────────────────
export const LAB_TEAM = [
  {
    name: 'Dr. Yael Alef',
    role: 'Principal Investigator',
    affiliation: 'Faculty of Architecture, Technion',
    bio: 'Heritage assessment methodology, CBSA development, conservation planning.',
  },
  {
    name: 'Yuval Shafriri',
    role: 'AI & Development Lead',
    affiliation: 'InSites Knowledge Lab',
    bio: 'AI system design, prompt engineering, knowledge representation for heritage.',
  },
];

// ─── Experience Components ────────────────────────────────────────
export const EXPERIENCE_COMPONENTS = [
  { label: 'CBSA Experience', description: 'Structured stages, each building on the last', icon: 'layers' },
  { label: 'Human-AI Collaboration', description: 'HITL as an explicit value, not a safety guardrail', icon: 'users' },
  { label: 'Design Principles in Action', description: 'Transparency and grounding shown through the work', icon: 'eye' },
  { label: 'New Representations', description: 'KG, timeline, dashboard, narrative create the insight moment', icon: 'sparkles' },
  { label: 'Transfer', description: 'Participants leave able to apply the approach themselves', icon: 'share' },
];
