# Paper Revision Notes — v3 Alignment

These revisions align the Heritage 4.0 draft with the v3 bot enhancements and epistemic terminology refinements.

---

## 1. Section 3.1 (Context-Effect as Ontological Backbone) — ADD

**After** the sentence ending "...tracing how each context frames specific values and how values reframe the understanding of contexts." (end of Section 3.1)

**Insert**:

> The framework distinguishes analytical stages: Stage 2 articulates what a site *means* within each context; significance emerges only after authenticity, integrity, and comparative analysis apply evaluative criteria in Stages 3–5. This separation prevents the common collapse where description, meaning, and significance are conflated in a single pass.

**Why**: v3 now enforces the meaning→criteria→significance chain explicitly. The paper should reflect this as a design choice, not just a sequence.

---

## 2. Section 3.3 (Uncertainty Notation as Epistemic Enabler) — REVISE

**Current** (line 65 of draft):
> "This notation does more than label confidence. It *may* license the AI to search beyond explicit source text."

**Revise to**:
> "This notation does more than label confidence. It licenses the AI to search beyond explicit source text, by design: the bot prompt explicitly connects 'go beyond what is stated' instructions to the marking system, so that inference and hypothesis are generated *as* marked output rather than labeled after the fact."

**Why**: In v3, we added per-stage notation activation (° and 💭 markers directly in the "go beyond explicit" instructions). This is no longer a "may" — it's an architectural choice.

---

## 3. Section 5 (Discussion) — OPTIONAL ADD

**After** the "Complementary Blind Spots" subsection, consider adding a short paragraph:

> A related architectural finding concerns stage boundaries. The framework enforces a descriptive/evaluative boundary between contexts (Stage 1) and values (Stage 2): contexts describe frameworks and identify framing relationships; values articulate meanings that the description did not make explicit. In practice, without this boundary, the AI tends to evaluate prematurely in Stage 1, leaving Stage 2 with nothing new to contribute — a pattern identified through practitioner review of assessment sessions [8].

**Why**: The B8 fix (descriptive/evaluative boundary) is a methodological insight worth noting. It shows that the governance architecture addresses not just AI error but analytical structure.

**Note**: This adds ~60 words. If page budget is tight, skip — it's enhancement, not correction.
