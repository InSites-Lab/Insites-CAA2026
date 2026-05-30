# **\[CA-KG\] Knowledge Graph Application Module**

* Version: v4.0 (Unified Ontology, Sandbox-Compliant, Native RTL, Prompt Generator)

## **1\. CBSA Graph Ontology & Data Extraction**

Before generating the HTML artifact, extract and structure the conversation data into a strict JSON format.

### **1.1 Entity Categories**

Every extracted node MUST be assigned one of the following exact types for color mapping:

• **Place:** A geographic location, area, or region relevant to the heritage asset.

• **Structure / Building:** A constructed edifice or architectural ensemble.

• **Architectural Element:** A specific component of a structure (column, arch, etc.).

• **Person:** An individual historically or culturally linked to the asset.

• **Event:** A discrete historical occurrence tied to the asset's timeline.

• **Story / Narrative:** An oral tradition, legend, or documented account.

• **Cultural Value:** An abstract value category from the CBSA assessment.

• **Natural Phenomenon:** A geological, ecological, or climatic feature.

• **Artwork / Artefact:** A movable object, inscription, or decorative element.

• **Tradition / Custom:** A recurring cultural practice associated with the asset.

• **Social Group:** A community, guild, congregation, or population segment.

• **Historical Period:** A defined chronological era relevant to the assessment.

• **Religion / Belief:** A faith system, cosmology, or spiritual practice.

• **Collective Memory:** A shared remembrance, commemoration, or cultural narrative.

• **נכס מורשת:** The primary asset under assessment.

### **1.2 Extraction Rules**

• **Target Size:** Extract 10–15 central nodes (Maximum 20). No orphan nodes allowed.

• **Epistemic Tracking:** Assign an epistemic property to each node: sourced (explicit in text), inferred (〰️ via 2+ sources), or interpretive (💭 reading between lines). For non-sourced nodes, an epistemic\_note (≤15 words) is mandatory.

### **1.3 Data Schema (Strict JSON Injection)**

Inject the data into the HTML template exactly as a JSON object assigned to window.kgData:

{  
  "nodes": \[  
    {  
      "id": "unique\_lowercase\_id",  
      "name": "שם התצוגה בעברית",  
      "type": "English\_Ontology\_Type\_From\_1.1",  
      "meaning": "Brief role description in Hebrew (5-12 words)",  
      "value\_type": "Optional \[CA-V\] label",  
      "epistemic": "sourced|inferred|interpretive",  
      "epistemic\_note": "הסבר קצר להסקה או פרשנות"  
    }  
  \],  
  "edges": \[  
    { "source": "source\_id", "target": "target\_id", "label": "יחס\_בעברית" }  
  \]  
}

## **2\. HTML Sandbox & Interface Specification**

The artifact must be a single, self-contained HTML file executing within an isolated about:srcdoc iframe.

### **2.1 UI Layout & Native RTL**

• **Layout:** Graph canvas occupies 65-70% width; Sidebar occupies 30-35% width (min 300px, collapsible, right-aligned for RTL).

• **Typography:** Noto Sans Hebrew, system-ui, sans-serif.

• **Colors:** Background: \#f8fafc, Sidebar: \#f1f5f9, Cards: \#ffffff, Borders: \#e2e8f0, Text Primary: \#1e293b, Accent Blue: \#3b82f6.

• **RTL Rule:** Root element MUST be \<html dir="rtl" lang="he"\>. Ensure CSS contains body { direction: rtl; text-align: right; }.

### **2.2 Strict Script Protection (IIFE)**

ALL custom JavaScript logic must be wrapped inside an Immediately Invoked Function Expression to prevent global scope clashes in the previewer:

(function() {  
    // Variables, D3 setup, and UI logic here  
})();

*Constraint:* NEVER declare variables with browser-reserved names (top, name, length, parent, status, location). Use prefixes (e.g., kgTopNodes).

### **2.3 Defensive API Execution**

Wrap all browser-level APIs in try...catch blocks so they fail silently without crashing the DOM renderer:

try {  
    navigator.clipboard.writeText(text);  
} catch (err) {  
    // Show manual copy fallback in the UI  
}

## **3\. D3.js Force Simulation**

### **3.1 Library Delivery**

Load D3.js exclusively via script tag in the \<head\>. Do NOT use ESM imports.

\<script src="\[https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js\](https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js)"\>\</script\>

### **3.2 Physics and Geometry**

• **Simulation Tuning:** Force link distance: 140px. Charge strength: \-350 to \-450.

• **Curved Edges:** Links must be rendered as quadratic Bezier curves:

function tickActions() {  
    linkElements.attr("d", function(d) {  
        const dx \= d.target.x \- d.source.x, dy \= d.target.y \- d.source.y;  
        const dr \= Math.sqrt(dx \* dx \+ dy \* dy) \* 1.2;  
        return \`M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}\`;  
    });  
}

• **Directional Markers:** Define arrowheads in SVG \<defs\> and apply to edges, accounting for node radius offsets.

## **4\. Analytical AI Query Tab (Prompt Generator)**

The third tab ("AI Query" / "שאלות וניתוח") does NOT make live API calls. Instead, it serves as an analytical prompt generator directing the user back to the main chat interface.

### **4.1 Tab UI Requirements**

• **Header:** A clear instruction: "העתק את השאלות הבאות לחלון השיחה הראשי כדי לנתח את הגרף שיצרנו."

• **Dynamic Prompts:** Generate 3-5 clickable cards. Each card contains a contextual prompt based on the specific nodes generated in the current graph.

### **4.2 Dynamic Prompt Templates**

Populate the cards with prompts that reference actual graph data. Examples:

• *Contextual Analysis:* "נתח את ההשפעה הדו-כיוונית בין \[שם ישות מהגרף\] לבין הערכים התרבותיים המקושרים אליה."

• *Epistemic Review:* "הצג את כל הישויות בגרף שהוגדרו כ-'פרשנות' (💭) והסבר את הבסיס המחקרי שלהן."

• *Structural Vulnerability:* "לפי הגרף הנוכחי, מהן נקודות התורפה המרכזיות שעלולות לפגוע במשמעות האתר אם ייפגעו?"

### **4.3 Interaction**

Clicking a prompt card should attempt to copy the text to the clipboard (using the try...catch wrapper). Show a brief visual confirmation. Provide a standard text input field acting as a "scratchpad" for the user to compose their own prompt before copying it.