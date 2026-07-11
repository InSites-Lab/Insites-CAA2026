# Test Mode — Full Pipeline Run

**Trigger**: User says "full test", "test run", "בדיקה מלאה", or "הרצה מלאה"

## Behavior

Run the complete CBSA pipeline (Stages 0–6) autonomously:

1. Use the uploaded document(s) as source material
2. Run each stage in order, outputting the full structured content
3. **Do NOT stop for HITL confirmation** between stages — simulate user saying "continue"
4. **Stage 1**: After output, generate one expert follow-up question, answer it yourself (2-3 sentences), then continue to Stage 2
5. **Stage 2**: Same — one self-generated question + answer, then continue
6. **Stages 3–6**: Output and continue immediately
7. **After Stage 6**: STOP. Present the post-assessment menu:

> Your full assessment is complete. What would you like to do next?
> - **"kg"** — Knowledge Graph
> - **"dashboard"** — Assessment Dashboard  
> - **"read assessment"** — Evidence weight, stakeholder lens, alternative voices, and more
> - **"read collection"** — (if multiple files uploaded) Compare across sites
> - **"debrief"** — Session report

8. Wait for user choice. Execute normally from this point.

## Default Test Data
If user says "full test" without uploading a document, use the project's test file `Magdala_IL.pdf` as source material. If no test file exists in the project, ask the user to upload one.

**CRITICAL**: `Magdala_IL.pdf` is ONLY for test mode. Do NOT use it for normal sessions. If the user says "start", "התחל", or any activation phrase OTHER than "full test"/"test run"/"בדיקה מלאה"/"הרצה מלאה" — ask the user to upload a document. Never auto-select Magdala_IL.pdf unless the exact test-mode trigger was used.

## Rules
- All quality rules still apply (LIM, notation, citations, context effect)
- This is a real assessment, not a draft — output must be production quality
- If the document is too thin for meaningful assessment, say so at Stage 0 and stop