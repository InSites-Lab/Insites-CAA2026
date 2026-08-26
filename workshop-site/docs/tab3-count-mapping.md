# Claim counts: the slide and the dataset

Tab 3 of the Heritage 4.0 talk shows a five-cell row of counts. The public
claim-level files in the repository partition the same 45 claims differently.
Both are correct. This note maps one onto the other, so that anyone who adds up
the dataset and then looks at the slide can see why the two do not read the same.

## The two framings

They answer different questions.

| | Question it answers | Where it lives |
|---|---|---|
| **Dataset framing** | What did the system **mark**? | `Claim-Level-Count-2303.md`, `claim-extraction-*.md`; the paper |
| **Slide framing** | What **were** the claims, and what became of them? | Tab 3 of the talk |

The first measures the notation's output. The second measures the session's
content. The same claim can be an inference (slide) that carried no glyph
(dataset) — that gap is the finding the slide is built on.

## The mapping

| Slide cell | Reads | Dataset equivalent |
|---|---|---|
| `45 claims` | 45 | 45 substantive claims, Stages 1–5, after deduplication |
| `24 explicit [file:page]` | 24 | 24 unmarked-but-cited: presented as explicit in the sources |
| `epistemic marks · 20` | 20 | 18 marked (14 ° + 4 💭) **+ 2** — see below |
| ↳ `14/16 accepted 〰️` | 16 inferences, 14 accepted | 14 ° + the 2 rejected inferences |
| ↳ `4 hypotheses 💭` | 4 | 4 💭, all accepted |
| `1 unmarked · wrong` | 1 | the "hierarchically organised network" claim |

Slide total: 24 + 20 + 1 = 45. Dataset total: 24 + 18 + 3 = 45.

**The whole of the difference is where the 2 rejected claims are counted.** The
paper's "three special cases" (`24 + 14 + 4 + 3`) sets them beside the marked
claims; the slide folds them back into the inferences they were, which is what
makes the `14/16` fraction legible as an acceptance rate.

## The three claims the expert stopped

Two are content rejections; one is the notation's only miss.

| Claim | Marked? | Why it fell |
|---|---|---|
| Political context (antiquities legislation) | no | **Scope.** "Not relevant to this assessment." A mark would not have saved it. |
| "Authenticity dilemma" | no | **Conceptual.** A Nara term applied to what was a conservation threat; the system retracted it ("I conflated two different things"). |
| "Hierarchically organised network" | **no — and it needed one** | **Overreach.** The survey says Tuba and Shamir "may have" been focal points; the session turned that into an order. The system conceded the phrase "goes beyond what the sources state", and the expert required a rewrite, not a mark. |

The third is the false negative the slide names: the only claim in the test that
needed a mark and reached the expert without one — and its content was wrong too.

## Why this is the talk's sharpest evidence

Two claims trace to the **same hedged sentence** of the survey. The
mortuary-landscape reading took 💭 and survived expert review; the hierarchical
network went unmarked and was rejected. Nothing in the prose separated them.

A mark measures a claim's distance from its sources. Whether the claim holds is
a separate question, and a human one.

## [TO CONFIRM]

One claim needs the first author's decision before this note is final.

**"Individuals interred here held particular significance"** was marked ° —
correctly — and then rejected by the expert as too weak to contribute. It is a
rejected inference, but unlike the other two it is *not* a marking failure.

- If it is one of the slide's 2 rejected inferences, then `14/16` counts it, and
  the dataset's 14 ° maps to 13 accepted + this one.
- If it is not, the slide's 2 are the political-context and authenticity-dilemma
  claims, and the arithmetic above needs adjusting.

Resolve this before the numbers are quoted anywhere outside the talk.
