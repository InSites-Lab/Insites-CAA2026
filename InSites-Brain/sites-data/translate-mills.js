#!/usr/bin/env node
/**
 * translate-mills.js
 * Translates mills-2021-v2.json from Hebrew to English
 * Output: mills-2021-en.json
 */

const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'mills-2021-v2.json');
const outPath = path.join(__dirname, 'mills-2021-en.json');

const data = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

// --- HTML stripping ---
function stripHtml(html) {
  if (!html || typeof html !== 'string') return html;
  let text = html;
  // Replace paragraph tags with double newlines
  text = text.replace(/<\/p>\s*<p[^>]*>/gi, '\n\n');
  text = text.replace(/<p[^>]*>/gi, '');
  text = text.replace(/<\/p>/gi, '');
  // Replace <br> tags with newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  // Remove list tags
  text = text.replace(/<\/?ul>/gi, '\n');
  text = text.replace(/<\/?ol[^>]*>/gi, '\n');
  text = text.replace(/<li>/gi, '- ');
  text = text.replace(/<\/li>/gi, '\n');
  // Remove all other HTML tags
  text = text.replace(/<[^>]+>/gi, '');
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&mdash;/g, '—');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&lrm;/g, '');
  text = text.replace(/&rlm;/g, '');
  // Clean up whitespace
  text = text.replace(/\u200B/g, ''); // zero-width space
  text = text.replace(/\u200E/g, ''); // LRM
  text = text.replace(/\u200F/g, ''); // RLM
  text = text.replace(/\u00A0/g, ' '); // nbsp
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  text = text.trim();
  return text;
}

// --- Coordinate extraction ---
function extractCoords(geometry) {
  if (!geometry) return { lat: null, lng: null };

  if (geometry.type === 'Point') {
    return { lng: geometry.coordinates[0], lat: geometry.coordinates[1] };
  }

  if (geometry.type === 'GeometryCollection') {
    // Find Point geometry first
    const point = geometry.geometries.find(g => g.type === 'Point');
    if (point) {
      return { lng: point.coordinates[0], lat: point.coordinates[1] };
    }
    // Compute centroid of first Polygon
    const polygon = geometry.geometries.find(g => g.type === 'Polygon');
    if (polygon) {
      const ring = polygon.coordinates[0];
      let sumLng = 0, sumLat = 0;
      for (const coord of ring) {
        sumLng += coord[0];
        sumLat += coord[1];
      }
      return {
        lng: Math.round(sumLng / ring.length * 100000) / 100000,
        lat: Math.round(sumLat / ring.length * 100000) / 100000
      };
    }
  }
  return { lat: null, lng: null };
}

// --- Name translations ---
const nameMap = {
  'טחנת רכורדנא (טחנה הוספיטלרית)': 'Recordana Mill (Hospitaller Mill)',
  'M20 - טחנת צלף': 'M20 - Tzalaf Mill',
  'טחנת דוק': 'Dok Mill (Crusader Mill)',
  'טחנת אבו רבאח': 'Abu Rabah Mill',
  'טחנת אל-מיר': 'Al-Mir Mill',
  'טחנת הנזירים': "Monks' Mill",
  'טחנת הקמח הסחנה (גן השלושה)': 'Sachne Flour Mill (Gan HaShlosha)',
  'טחנת מרפוקה - עליל': 'Marpuka - Alil Mill',
  "M9 טחנת ה'בטאן' - המבטשה": 'M9 Battan Mill (The Fulling Mill)',
  'טחנת הגפן M4': 'Gefen Mill M4 (Vine Mill)',
  'פרוחיה': 'Pruchiya Mill',
  'M11 טחנת שמאי (א-סמאווי)': 'M11 Shamai Mill (A-Samawi)',
  'טאחונת מטליך סעיד סולימן ': 'Metalikh Said Suleiman Mill',
  'טאחונת כואניה ': 'Kwaniyeh Mill',
  'טאחונת אום אל קנטיר ': 'Umm al-Qantir Mill',
  "שבע טחנות - ג'רישה": 'Seven Mills - Jarisha',
  'M21 טחנת שרקרק': 'M21 Sharqraq Mill',
  'טאוחנת מוחמד מועיד  ': 'Muhammad Muaid Mill',
  'טאחונת ערבי ': 'Arabi Mill',
  'M14 טחנת גנים': 'M14 Ganim Mill (Gardens Mill)',
  "M15 טחנת אגוז (אום-ג'אוזה)": 'M15 Egoz Mill (Umm al-Jawzeh)',
  'טחנת קנה M6': 'Kaneh Mill M6 (Reed Mill)',
  'M18 טחנת תות (אום א-תות)': 'M18 Tut Mill (Umm a-Tut)',
  'טחנת תאנה M8': 'Teenah Mill M8 (Fig Mill)',
  'טחנות סכר נחל תנינים ': 'Nahal Taninim Dam Mills',
  'טחנת טובי (אל-בוטיטיה) M13 נחל עמוד': 'M13 Tubi Mill (Al-Butitiyya), Nahal Amud',
  'טחנת דולב M7': 'Dolev Mill M7 (Plane Tree Mill)',
  'M17 טחנת חדיד (אום אל חאדיד)': 'M17 Hadid Mill (Umm al-Hadid)',
  'טאחונת אזעירי': "Az'eiri Mill",
  "טאחנות עת'מני ": 'Othmani Mills',
  'M12 טחנת שכווי': 'M12 Shaqwi Mill',
  'טחנת השקד M5': 'Shaked Mill M5 (Almond Mill)',
  'M10 טחנת אלכסנדר (אסכנדריה)': 'M10 Alexander Mill (Iskandaria)',
  'עשר טחנות (אל הדאר)': 'Ten Mills (Al-Hadar)',
  'הטחנות הגדולות - Grands Moulins de Palestine': 'The Great Mills (Grands Moulins de Palestine)',
  'טחנות נעמן (טחנות גני רידוואן)': 'Naaman Mills (Ridwan Gardens Mills)',
  "טאחונת ע'ראס ": "Ghras Mill",
  "M16 טחנת גבל/אל ג'בליה": "M16 Jabal Mill (Al-Jabaliyya)"
};

// --- Region translations ---
const regionMap = {
  'עין אפק': 'Ein Afek',
  'נחל עמוד': 'Nahal Amud',
  'נחל ציפורי': 'Nahal Tzipori',
  "נחל הירקון -  נהר אלעוג׳א": 'Nahal Yarkon',
  'גן השלושה': 'Gan HaShlosha',
  'נחל תנינים - אמות המים לקיסריה': 'Nahal Taninim',
  'העיר התחתית ומדרונות ואדי סאליב, חיפה': 'Lower City Haifa, Wadi Salib',
  'גני רידוואן': 'Ridwan Gardens',
  'נחל ציפורי - נחל הגלבוע': 'Nahal Tzipori - Nahal HaGilboa'
};

// --- Structured field value translations ---
const valueTranslations = {
  // Conservation state
  'השתמרות טובה': 'Good preservation',
  'השתמרות חלקית': 'Partial preservation',
  'השתמרות נמוכה': 'Low preservation',
  // Physical condition
  'יציב': 'Stable',
  'מעורער': 'Unstable',
  'הרוס': 'Ruined',
  // Threat types
  'ביולוגיים': 'Biological',
  'סביבתיים': 'Environmental',
  'גיאומורפולוגים': 'Geomorphological',
  'מעשה ידי אדם': 'Human-caused',
  // Management status
  'ניהול שוטף (פעיל)': 'Active management',
  'ניהול מזדמן': 'Occasional management',
  // Managing body
  'רשות הטבע והגנים': 'Israel Nature and Parks Authority',
  'גורם פרטי': 'Private entity',
  'אחר': 'Other',
  // Conservation intervention
  'שימור ושיקום': 'Conservation and rehabilitation',
  'שימור מונע': 'Preventive conservation',
  'תחזוקה': 'Maintenance',
  'ניטור': 'Monitoring',
  'הסרת סכנה': 'Risk removal',
  // Intervention levels
  '1. שימור מונע': '1. Preventive conservation',
  '2. ייצוב': '2. Stabilization',
  '3. שחזור': '3. Restoration',
  '4. רקונסטרוקציה': '4. Reconstruction',
  '5. בניה חדשה': '5. New construction',
  '6. השמשה': '6. Adaptive reuse',
  '6. השמשה ': '6. Adaptive reuse',
  // Periods
  'צלבני או ממלוכי': 'Crusader/Mamluk',
  'עותומני': 'Ottoman',
  'מנדטורי': 'British Mandate',
  'מדינת ישראל': 'State of Israel',
  'העת העתיקה (רומי ביזנטי)': 'Antiquity (Roman-Byzantine)',
  'ערבי קדום': 'Early Arab',
  // Use types
  'טחנת קמח': 'Flour mill',
  'עמדת שמירה': 'Guard post',
  'מרכז מבקרים תיירותי': 'Tourist visitor center',
  'נטוש': 'Abandoned',
  'מבטשה': 'Fulling mill',
  'נופש ופנאי': 'Leisure and recreation',
  'טחנת קמח וכפר קטן': 'Flour mill and small village',
  'אתר מורשת': 'Heritage site',
  'גן לאומי ומרכז מבקרים': 'National park and visitor center',
  'הסכר': 'The dam',
  'טחנת וויסות מים': 'Water regulation mill',
  'טחנת קמח מגלש אנכי הפעלה תחתית': 'Flour mill with vertical chute, bottom operation',
  'טחנות נטושות': 'Abandoned mills',
  'טחנת קמח מגלש אופקי וארובה': 'Flour mill with horizontal chute and chimney',
  'טחנות קמח': 'Flour mills',
  'תיירות': 'Tourism',
  'מגורים': 'Residential',
  'מבנה נטוש': 'Abandoned structure',
  'טחנת קמח פשוטה סמוך לנחל': 'Simple flour mill near the stream',
  // Roles
  'מתעד כרטיס הנכס': 'Asset card documenter',
  'דמות היסטורית המוזכרת בסיפור הטחנה': "Historical figure mentioned in the mill's story",
  'משמר': 'Conservator',
  'כותב תיק התיעוד': 'Documentation file author',
  'אדריכל': 'Architect',
  'מנהל או בעלי המקום היום': 'Current manager/owner',
  'בעלי הטחנה': 'Mill owner',
  // Land designation
  'גן לאומי': 'National park',
  'שמורת טבע/גן לאומי': 'Nature reserve/National park',
  'גן לאומי + שמורת טבע': 'National park + Nature reserve',
  'אזור תעשייה': 'Industrial zone',
  'על פי תבע': 'Per statutory plan',
  'שצ"פ': 'Public open space',
  'ייעוד חקלאי לפי תכנית ג/13449': 'Agricultural designation per plan G/13449',
  'שטחים פתוחים ומבנים ומוסדות ציבור': 'Open spaces and public buildings and institutions',
  'שמורת טבע/גן לאומי ': 'Nature reserve/National park',
};

function translateStructuredValue(val) {
  if (!val || typeof val !== 'string') return val;
  val = val.trim();
  if (!val) return null;

  // Check if it's a comma-separated list
  if (val.includes(',')) {
    return val.split(',').map(v => {
      const trimmed = v.trim();
      return valueTranslations[trimmed] || trimmed;
    }).filter(v => v).join(', ');
  }

  return valueTranslations[val] || val;
}

// --- Process each entry ---
const sites = data.FullItems.map((item, index) => {
  const p = item.properties;
  const coords = extractCoords(item.geometry);
  const originalName = item.name;
  const name = nameMap[originalName.trim()] || originalName;

  const originalRegion = p['אזור או מכלול הנכס'] || '';
  const region = regionMap[originalRegion.trim()] || originalRegion;

  // Determine data depth
  const culturalRaw = p['הערכה תרבותית 0'];
  const descRaw = p['תיאור'];
  const hasCultural = culturalRaw && culturalRaw.trim().length > 0;
  const hasDesc = descRaw && descRaw.trim().length > 0;
  const dataDepth = hasCultural ? 'rich' : hasDesc ? 'medium' : 'thin';

  // Process text fields - strip HTML
  const processText = (val) => {
    if (val === null || val === undefined) return null;
    if (typeof val !== 'string') return val;
    const stripped = stripHtml(val);
    return stripped.length === 0 ? null : stripped;
  };

  // Translate comma-separated fields
  const conservationIntervention = translateStructuredValue(p['המלצות להתערבות שימור']);
  const interventionLevels = translateStructuredValue(p['רמות התערבות שימורית '] || p['רמות התערבות שימורית']);
  const period = translateStructuredValue(p['תקופה']);
  const conservationState = translateStructuredValue(p['מצב השתמרות']);
  const physicalCondition = translateStructuredValue(p['מצב פיזי של הנכס']);
  const threatTypes = translateStructuredValue(p['סוג האיומים']);
  const managementStatus = translateStructuredValue(p['סטטוס ניהול']);
  const managingBody = translateStructuredValue(p['גורם מנהל']);
  const landDesignation = translateStructuredValue(p['ייעודי קרקע']);

  // Use type - often has complex/long values, translate known ones
  let useType = p['סוג השימוש'];
  if (useType) {
    useType = processText(useType);
    // Try to translate comma-separated use types
    if (useType && useType.includes(',')) {
      useType = useType.split(',').map(v => {
        const trimmed = v.trim();
        return valueTranslations[trimmed] || trimmed;
      }).join(', ');
    } else if (useType) {
      useType = valueTranslations[useType.trim()] || useType;
    }
  }

  // Roles
  let roles = p['תפקיד ביחס לטחנה'];
  if (roles) {
    roles = roles.split(',').map(v => {
      const trimmed = v.trim();
      return valueTranslations[trimmed] || trimmed;
    }).filter(v => v).join(', ');
    if (!roles) roles = null;
  }

  // People - transliterate
  const associatedPeople = processText(p['א.נשים - הקשורים לנכס']);
  const linkedPeople = processText(p['אנשים הקשורים לנכס']);

  // Web links - keep as-is
  const webLinks = p['קישור למידע ברשת'];

  // Images - keep as-is
  const images = p['תמונות'] || null;
  const imagesWithDescription = p['תמונות עם תיאור'] || null;

  // Dates - keep as-is
  const useStart = p['תחילת השימוש'] || null;
  const useEnd = p['סיום השימוש'] || null;

  // References
  const references = processText(p['הפניה']);

  // Planning boundary - keep as-is (WKT geometry)
  const planningBoundary = p['המלצה לגבולות התכנון'] || null;

  // Mapping description
  const mappingDescription = processText(p['תיאור המיפוי']);

  // Management notes
  const managementNotes = processText(p['הערות לנתוני הניהול']);

  // Risk description
  const riskDescription = processText(p['תיאור סיכונים ורגישויות']);

  // Main text fields - these need full Hebrew->English translation
  // For now, strip HTML and mark them for translation
  const description = processText(p['תיאור']);
  const culturalAssessment = processText(p['הערכה תרבותית 0']);
  const spiritOfPlace = processText(p['רוח המקום']);
  const conservationPolicy = processText(p['המלצות  ומדיניות שימור']);

  const id = `mill-${String(index + 1).padStart(2, '0')}`;

  return {
    id,
    name,
    originalName,
    region,
    originalRegion,
    lat: coords.lat,
    lng: coords.lng,
    dataDepth,
    assetName: name,
    description,
    culturalAssessment,
    spiritOfPlace,
    managingBody,
    managementStatus,
    conservationState,
    physicalCondition,
    threatTypes,
    conservationIntervention,
    conservationPolicy,
    interventionLevels,
    period,
    useType,
    useStart,
    useEnd,
    planningBoundary,
    references,
    landDesignation,
    associatedPeople,
    linkedPeople,
    riskDescription,
    images,
    imagesWithDescription,
    mappingDescription,
    roleRelativeToMill: roles || null,
    managementNotes,
    webLinks: webLinks || null
  };
});

// Count depths
const richCount = sites.filter(s => s.dataDepth === 'rich').length;

const output = {
  collection: {
    name: 'Historic Flour Mills of Israel',
    source: 'Arches Project Platform, Technion Faculty of Architecture',
    exportMethod: 'API to dedicated Arches plugin for AI analytics',
    itemsTotal: sites.length,
    richEntries: richCount,
    date: '2021'
  },
  sites
};

fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`Written ${sites.length} sites to ${outPath}`);
console.log(`Rich: ${richCount}, Medium: ${sites.filter(s => s.dataDepth === 'medium').length}, Thin: ${sites.filter(s => s.dataDepth === 'thin').length}`);

// Verify
const verify = JSON.parse(fs.readFileSync(outPath, 'utf8'));
console.log('Verified: parsed OK,', verify.sites.length, 'sites');
