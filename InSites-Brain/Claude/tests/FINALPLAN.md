Ready for review
Select text to add comments on the plan
Heritage 4.0 Paper — Final Writing Plan
Venue: Heritage 4.0, Florence | Track 1: AI, Governance, Trust, Bias, Accountability Deadline: April 1, 2026 (extended abstract) | Camera-ready: June 21 Format: 6 pages Springer CCIS (5.5 usable — text + tables + refs) Paper type: Position paper with proof of concept and preliminary demonstration Case study: Tuba-Zangariyye — same site, same expert, same sources: EAC11 manual CBSA vs. InSites-CAA v2 with HITL

Source Materials (created this session)
File	Content	Use in paper
Florence/Heritage4_0-Adapted-Structure-2303.md	Section-by-section structure with content guidance	Primary writing scaffold
InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/Heritage4_0-Case-Evidence-2303.md	Source-traced demonstrations (A/B/C), performance profile, case conclusion	Section 4 evidence + Section 5 arguments
InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/Manual-vs-Bot-Comparison-2303.md	EAC11 manual SA vs. bot SA — values, framing, new insights, what neither caught	Section 4 comparison framing
InSites-Brain/Claude/tests/claudeCode-Dolmens-Reports/Claim-Level-Count-2303.md	45 claims, epistemic classification accuracy, item-level metrics	Section 4 quantitative backbone + Section 5 methodology
Florence/Heritage4_0_Outline_v4.pdf	Original writing plan — claims, structure, tone rules, references	Writing principles, claim structure, tone governance
Methodological Identity
Design: Embedded single-case design (Yin 2018) — one case with two embedded units (manual SA, AI-assisted SA). Controls for site, expert, and source material; isolates workflow as the variable.

Analysis method: Directed qualitative content analysis (Hsieh & Shannon 2005) with source-tracing. CBSA provides predefined categories; each AI output traced to source documents and classified as extraction / synthesis / overreach / missed.

Unit of analysis: Individual substantive claim (n=45), not "the assessment" (n=1). Each claim is page-referenced and independently checkable.

Critical data relationship: The bot's input includes the expert's own descriptions from the EAC11 case. The SA sections were withheld. New insights came from re-processing text the expert herself wrote — the difference is the workflow, not the data.

What it supports: Existence proof, mechanism illustration, preliminary pattern identification. What it cannot support: Generalizability, reliability measurement, causal claims.

Limitation to name directly: Same expert produced descriptions, ran assessment, validated output. This is how the tool is designed to be used — but independent validation is future work.

Section-by-Section Writing Guide
Section 1: Introduction (~1.0 page, ~450 words)
Job: Land the reframe. By end of p.1: this examines heritage methodology upgraded through AI, not AI applied to heritage.

Moves:

Heritage assessment aspirations: contextual reasoning, multivocality, networks of meaning, systematic uncertainty
Well-articulated in theory, difficult in practice
[Anon., 2024]: single site → complex contextual network; three challenges
The gap: assessment reasoning (interpretive layer) underexplored in AI-heritage discourse
Reframe (C): not "does AI match expert accuracy?" but "under what governance conditions can AI-assisted assessment both operationalize methodology and expand what can be noticed?"
Specific claim (B) + paper structure
Tone rule: Heritage methodology is the active agent, not the AI. "The assessment methodology, embedded in AI, surfaces context-effects for expert examination."

Section 2: Background (~0.5 page, ~225 words)
Job: Just enough theory. Lean on [Anon., 2024]. Save space.

Moves:

CBSA + context-effect: 3-4 sentences referencing [Anon., 2024]
Why cognitively demanding: multiple contexts, cross-referencing, uncertainty calibration
What exists in AI-heritage: data pipeline (classification, 3D, decay). Assessment reasoning = different problem.
Methodology (2-3 sentences): Directed qualitative content analysis with source-tracing. We compare a formal manual CBSA (EAC Guidance 11) with an AI-assisted assessment of the same site, same expert, same sources. AI outputs traced at claim level (n=45) to distinguish extraction, synthesis, overreach, and missed content.
References: [Anon., 2024], Avrami & Mason 2019, EAC Guidance 9/11, 1-2 AI-heritage refs, 1 verbalized confidence ref

Section 3: Design — Governed Epistemic Partnership (~0.9 page, ~400 words)
Job: Present the governance framework — the main contribution.

3.1 Context-effect as ontological backbone (~0.15p): Bridge from [Anon., 2024] manual analysis to AI-embedded workflow. Domain-theoretic scaffolding, not generic conversation.

3.2 HITL as accountability architecture (~0.25p): Mandatory pause per stage. Expert directs, not checks. Audit mechanisms: Session Report, cognitive transparency, reflective questioning, evidence type tagging. Data quality governance (Stage 0/6) from practitioner feedback.

3.3 Uncertainty notation as epistemic enabler (~0.35p) — CORE:

Three-tier: unmarked (explicit) / ° (inferred from 2+ evidence) / 💭 (interpretive hypothesis)
The key move: notation licenses AI to search beyond explicit text — without it, any output beyond stated = indistinguishable from hallucination; with it = marked hypothesis for expert examination
Technical honesty: verbalized confidence, not formal calibration. AI is sometimes wrong. That's why the checkpoint exists.
3.4 Supporting infrastructure + workflow (~0.15p): Citation-first, provenance, no external lookup. Six modules. Portable across LLMs — prompt engineering only.

Section 4: Case Illustration (~1.1 page, ~350 words + table)
Job: Show the framework in action. Concrete outputs, source-traced.

4a. Site + comparison framing (~80 words):

Tuba-Zangariyye dolmen field, Korazim Plateau, 43 dolmens, unexcavated, IB–MBII
Evidence profile: survey + analogical + architectural. Data requires inference.
Same site previously assessed manually for EAC Guidance 11 (site 7.12) by the same expert using the same source documents. Bot input includes the expert's own descriptions; SA withheld.
4b. Demo A — all 3 ° insights (~270 words):

Developed: Social continuity — 4000-year pastoralist arc (~150 words). Source C main text + footnote 4 + Source B → "enduring node in a pastoral territory." Expert: "pattern I didn't identify."
Brief: "Landscape for imagination" (~60 words). Single footnote → unified intangible heritage value.
Brief: Cultural landscape / geographic reframing (~60 words). Springs + settlement ecology → "resource node."
4c. Overview table — 5 rows showing the full range:

Moment	AI output	Source basis	Epistemic status	Expert action
Social continuity	"Pastoralist populations... four millennia"	C pp.46-48 + C fn.4 + B	° — cross-source	Validated: "pattern I didn't identify"
"Landscape for imagination"	Footnote → heritage value	C fn.2	° — elevation	Validated: "new beautiful insight"
Cultural landscape	"Resource node in a landscape corridor"	A p.1 + C pp.40-41	° — reframing	Validated + new planning recommendation
"Hierarchical network"	Differentiation → hierarchy	A p.3: "it is possible..."	Unmarked — should be 💭	Expert challenged; bot acknowledged
Corbelling prototype	Not surfaced	C p.44 (Stepansky's hypothesis)	Missed	Not caught by bot or assessor
4d. Demo B/C hybrid — governance catching failure (~100 words): The hierarchy example: bot generated hypothesis, failed to mark 💭, expert caught it, bot traced reasoning honestly. Shows: (1) AI generates hypotheses, (2) classification fails at boundary, (3) governance catches it.

4e. Claim-level summary (~2 sentences): Across the full assessment, 45 substantive claims were traced: 94% of marked claims (°/💭) were correctly classified by the AI; content errors (scope, conceptual misapplication) were caught by governance, not notation.

4f. What neither caught (~2 sentences): Corbelling hypothesis — Stepansky's explicit research question, missed by both. Complementary coverage, not exhaustive.

4g. Workshop observations (~3 sentences): ~65 heritage professionals in ICOMOS/CIPA workshops. Data quality identified as critical factor → Stage 0/6. Assessor noted notation "helps surface where hypotheses need attention."

Section 5: Discussion (~0.6 page, ~270 words)
5.1 Complementary blind spots — LEAD: Bot under-reads salience; expert under-connects evidence. Not "AI is flawed, humans must check" but "different cognitive strengths, architecture activates both." Manual SA: 5 values. AI-assisted: 7 values + 5 new insights — from re-reading the expert's own descriptions.

5.2 Trust as structural governance: Not accuracy verification but warranted confidence. [Anon., 2024] showed networks too complex for individual management.

5.3 Epistemic implications: Assessment-as-report → assessment-as-inquiry. New output category: "machine-generated hypotheses for expert examination."

5.4 Limitations (name directly, don't over-justify):

Single case, single expert
Same expert wrote descriptions and validated — design feature + known limitation
Notation classification approximate (hierarchy example)
Method not exhaustive (corbelling)
Formal calibration across site types and experts is underway
Section 6: Conclusions (~0.2 page, ~90 words)
Three beats:

Current assessment theory: principles difficult to implement consistently
We examined whether embedding them in AI under governance operationalizes them and opens new inquiry. Preliminary evidence: yes.
Core finding: complementary blind spots. The architecture structures collaboration where notation activates AI's synthetic strength and governance activates expert's salience judgment.
Section 7: References (~0.7 page, 8-10 refs)
[Anon., 2024] — CBSA theory + Huqoq (foundation)
[Anon., CAA2026] — InSites implementation + workshops
Avrami & Mason 2019 — values-based conservation
EAC Guidance 9 (2025) or 11 (2026) — European heritage assessment
1-2 AI-in-heritage landscape refs
1 verbalized confidence / epistemic calibration ref
1 AI governance in cultural domains ref
Writing Principles (from outline v4)
Heritage methodology in the foreground: active agent = methodology or expert, not AI
Inquiry, not declaration: "we examine whether" not "AI enables"
Interdisciplinary accessibility: every technical term glossed on first use (heritage terms for AI readers, AI terms for heritage readers)
Tone: confident but modest. No tech-utopian, no apologetic.
Double-blind: no names, affiliations, identifying self-citations
Page Budget
Section	Pages	Words (~450/p)
1. Introduction	1.0	~450
2. Background	0.5	~225
3. Design	0.9	~400
4. Case Illustration	1.1	~350 + table
5. Discussion	0.6	~270
6. Conclusions	0.2	~90
7. References	0.7	8-10 entries
Total	5.0	0.5p margin
Writing Order
Section 4 first — around actual outputs. This is the evidence. Write it while the case is fresh.
Section 3 — the framework. Shape it to support what Section 4 shows.
Sections 1 + 2 — introduction and background. Now you know what needs setting up.
Sections 5 + 6 — discussion and conclusions.
Last: abstract, title, keywords, references.
Pre-Submission Checklist
 Double-blind: no names, affiliations, identifying self-citations
 Springer CCIS template formatting
 6-page count verified (including all figures, tables, references)
 Every Section 4 claim traced to source with page reference
 Tone check: search for "AI enables/extends/transforms" → reframe as "we examine whether"
 Interdisciplinary check: every technical term explained on first use
 Alt text for any figures
 All ° and 💭 symbols render correctly in LaTeX/CCIS template
Output
Create the paper draft at: Florence/Heritage4_0-Draft-v1.md Writing scaffold: Florence/Heritage4_0-Adapted-Structure-2303.md (already exists)