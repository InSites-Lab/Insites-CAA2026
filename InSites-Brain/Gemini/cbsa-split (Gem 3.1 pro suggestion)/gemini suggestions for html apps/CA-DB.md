# **\[CA-DB\] Single Assessment Dashboard Application Module**

* Version: v4.0 (Sandbox-Compliant, Native RTL, Leaflet Safe, Prompt Generator)

## **1\. Data Extraction & Strict Schema**

Before generating the HTML artifact, extract the data from Stages 1-6 of the current conversation and structure it into this exact JSON schema. Inject it as window.dashboardData:

{  
  "asset": { "name": "שם האתר", "type": "סוג", "period": "תקופה", "coordinates": { "lat": 32.0, "lng": 35.0 } },  
  "timeline": \[  
    { "year": "1920", "label": "אירוע", "changeType": "structure" }  
  \],  
  "contexts": \[  
    { "id": "c1", "type": "historical", "label": "תיאור ההקשר", "relatedValues": \["Historical"\] }  
  \],  
  "values": \[  
    { "name": "שם הערך", "category": "Historical", "epistemic": "sourced|inferred|interpretive", "summary": "תיאור המשמעות" }  
  \],  
  "authenticity": {  
    "grid": \[  
      { "aspect": "Form & Design", "description": "מצב", "rating": "medium" }  
    \]  
  },  
  "process": { "strengths": \["..."\], "gaps": \["..."\], "quickBoosts": \["..."\] }  
}

## **2\. HTML Sandbox & UI Specification**

The artifact must be a single, self-contained HTML file executing within an about:srcdoc iframe.

### **2.1 UI Layout & Native RTL**

• **Typography:** Noto Sans Hebrew, system-ui.

• **Colors:** Light theme. Background: \#f8fafc, Cards: \#ffffff, Borders: \#e2e8f0, Accent: \#2563eb.

• **RTL Rule:** Root element MUST be \<html dir="rtl" lang="he"\>. Ensure CSS contains body { direction: rtl; text-align: right; }.

• **Tabs Logic:** Use standard CSS display: none for inactive tabs.

### **2.2 Strict Script Protection (IIFE)**

ALL custom JavaScript logic must be wrapped inside an IIFE:

(function() {  
    // Variables, Map setup, and UI logic here  
})();

*Constraint:* NEVER declare variables with browser-reserved names (top, name, status, location). Use prefixes (e.g., dbActiveTab, dbMapInstance).

### **2.3 Defensive API Execution (Sandbox Protections)**

Wrap localStorage, history.pushState, and navigator.clipboard in try...catch blocks to prevent fatal DOM crashes:

try {  
    history.pushState(null, null, '\#map');  
} catch (err) {  
    // Sandbox restricts history modification; proceed silently via memory state.  
}

## **3\. Libraries: Leaflet & Chart.js Integration**

Load external libraries exclusively via \<script\> tags in the \<head\> from cdnjs.

### **3.1 Map Implementation Rules (Leaflet Safe)**

• **Initialization Check:** Verify coordinates exist (if (data.asset.coordinates.lat)) before rendering the map container.

• **Tile Source:** Use standard Google Maps Tile URLs (no API key required for rendering standard raster tiles in this context):

L.tileLayer('https://mt1.google.com/vt/lyrs=m\&hl=iw\&x={x}\&y={y}\&z={z}', { maxZoom: 19 }).addTo(map);

• **Popup Close Bug Fix (CRITICAL):** The sandbox rewrites \<a href="\#close"\> tags used by Leaflet popups, causing page jumps or crashes. Add this event listener AFTER map initialization:

document.addEventListener('click', function(e) {  
    if (e.target.closest('.leaflet-popup-close-button')) {  
        e.preventDefault();  
        dbMapInstance.closePopup();  
    }  
});

### **3.2 Chart.js Stability**

For Doughnut or Pie charts, you MUST set maintainAspectRatio: false in the chart options, AND constrain the parent canvas via CSS (e.g., max-height: 250px;) to prevent infinite expansion bugs in the iframe.

## **4\. Analytical AI Query Tab (Prompt Generator)**

Do NOT attempt to make live API calls from within the dashboard. The final tab must be a Prompt Generator.

### **4.1 Tab Structure**

Provide a UI area titled "ניתוח המשך". Present 3-5 clickable prompt cards based on the assessment data.

Instruct the user: "העתק את השאלות לחלון השיחה הראשי כדי להעמיק בניתוח."

### **4.2 Dynamic Prompt Examples (Populate with actual data)**

• "בהתבסס על הנתונים, כיצד פגיעה אפשרית ב-\[Aspect ממטריצת נארה\] תשפיע על הערך ה-\[שם הערך מהטבלה\]?"

• "אילו ממשקי תכנון עולים מתוך ההקשר ה-\[סוג הקשר\] שזיהינו בשלב 1?"

• "נסח מחדש את הצהרת המשמעות מנקודת מבט של קהילה מקומית, תוך דגש על הערכים החברתיים שהוגדרו."