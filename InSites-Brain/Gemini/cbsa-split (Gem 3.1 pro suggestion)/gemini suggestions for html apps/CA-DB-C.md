# **\[CA-DB-C\] Collection Dashboard Application Module**

* Version: v4.0 (Multi-Site, Sandbox-Compliant, RTL, Prompt Generator)

## **1\. Collection Data Extraction**

Extract data from the MA-RC workflow and structure it as an array of site objects. Inject as window.collectionData:

{  
  "metadata": { "collectionName": "שם האוסף", "totalSites": 5, "depth": "Medium" },  
  "sites": \[  
    {  
      "id": "site\_1",  
      "name": "שם האתר",  
      "coordinates": { "lat": 32.5, "lng": 35.2 },  
      "type": "מבנה יחיד",  
      "period": "התקופה הרומית",  
      "significanceSummary": "משפט סיכום",  
      "values": \["Historical", "Architectural"\],  
      "integrity": "High"  
    }  
  \]  
}

## **2\. Sandbox & UI Rules**

### **2.1 UI and Layout**

• **Palette:** Stone/Amber palette. Background: \#fafaf9, Cards: \#ffffff, Accent: \#b45309.

• **RTL Rule:** Root element MUST be \<html dir="rtl" lang="he"\>.

• **Cross-Referencing:** Every mention of a site name in lists or charts MUST be clickable, triggering a function to highlight the site on the map or in the detailed data table.

### **2.2 Script Protection (IIFE & Try-Catch)**

• Wrap ALL code in (function(){ ... })();.

• Do not use reserved names (top, name). Use prefixes like colMap, colChart.

• Wrap history.pushState and navigator.clipboard in try...catch blocks.

## **3\. Libraries & Visualizations**

Load Leaflet and Chart.js via CDN \<script\> tags.

### **3.1 Map Implementation (Collection View)**

• Render all sites on the map using L.circleMarker.

• Implement the Leaflet popup bug fix:

document.addEventListener('click', function(e) {  
    if (e.target.closest('.leaflet-popup-close-button')) { e.preventDefault(); colMap.closePopup(); }  
});

• Add filter buttons above the map (e.g., filter by Period or Value). Clicking a filter dims (opacity: 0.2) non-matching markers.

### **3.2 Charts Implementation**

• Provide at least two charts: Distribution by Period (Bar chart) and Distribution by Integrity Level (Doughnut chart).

• Constrain all Chart.js canvas elements with max-height: 280px via CSS.

## **4\. Analytical AI Query Tab (Prompt Generator)**

Provide an "AI Query / ניתוח אוסף" tab. Do not use live API calls. Generate contextual prompts for the user to copy into the main chat.

### **4.1 Prompt Templates (Populate with actual collection data)**

• "בהתבסס על פריסת האתרים, אילו דפוסי ניהול משותפים ניתן להציע עבור קבוצת האתרים מהתקופה ה-\[תקופה נפוצה באוסף\]?"

• "הצג את הפערים התיעודיים המרכזיים שחוזרים על עצמם ב-\[מספר\] האתרים באוסף."

• "זהה אם ישנם ערכים תרבותיים שמופיעים באתרים בעלי שלמות נמוכה אך נעדרים מהאתרים השמורים היטב."