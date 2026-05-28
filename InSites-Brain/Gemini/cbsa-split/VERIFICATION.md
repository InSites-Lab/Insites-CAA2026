# VERIFICATION — Gemini cbsa-split

Split of `InSites-Brain/Gemini/InSites-CAA-GEM.md` (v-GEM, **3,272 lines**, UTF-8 no-BOM, CRLF) into the
same 8-flat-file architecture as the Claude split, with Gemini platform specifics **preserved** and the
💭 epistemic layer + artifact-JS-safety folded in. Organizational split only; the sole additions are the
Loading Block (core), the cross-reference updates (§3), and the epistemic/safety blocks (also applied to
the GEM mono as source-of-truth).

## 1. Coverage list — every section → file (line ranges)

| Source lines | Block(s) | Destination |
|---|---|---|
| 1–304 | PART 1: persona, language policy, governance (incl. 🏛️ Session Activation / Pro Mode), LIM, engagement, Output Mode, triggers, Critical Operating Rules, CSR/DQR, Global Controls | `cbsa-core.md` |
| 3196–3272 | `[CA-HE]` Hebrew overlay — **full** | `cbsa-core.md` |
| 305–1053 | PART 2: Stages 0–6 + `[CA-IP]` Session Report | `cbsa-stages.md` |
| 1054–1306 | PART 3 banner + `[GB-1]` + `[CA-V]` `[CA-C]` `[CA-T]` `[SM-3]` `[CA-E]` `[CA-CS]` `[CA-EV]` | `cbsa-reference.md` |
| 1327–1362 | `[CA-EC]` Entity Categories | `cbsa-reference.md` |
| 1307–1326 | `[CA-IMG]` Image Analysis | `ca-img.md` |
| 1363–1720 | PART 4 banner + `Write → Visualize` + `[CA-KG]` (incl. live Gemini-API §4j) | `ca-kg.md` |
| 1721–2423 | `[CA-DB-F]` + `[CA-DB]` (incl. `[CA-RPT]`, `[CA-AIQ]`) | `ca-db.md` |
| 2424–2803 | `Read → Analyze → Visualize` + `[MA-RA]` | `ma-ra.md` |
| 2804–3007 | `[MA-RC]` | `ma-rc.md` |
| 3008–3195 | `[CA-DB-C]` Collection Dashboard | `ca-db.md` |

**Reconciliation**: 381 (core) + 749 (stages) + 289 (reference) + 20 (ca-img) + 358 (ca-kg) + 891 (ca-db) +
380 (ma-ra) + 204 (ma-rc) = **3,272**. Every source line maps to exactly one file. No gaps, **no duplication**
(`[CA-HE]` is in core only). Each block was asserted byte-exact in its target via `.Contains()` before edits
(11/11 PASS); UTF-8 no-BOM, CRLF, Hebrew, U+200F, 〰️/💭 emojis preserved.

## 2. No duplicates
Each block in exactly one file. `[CA-HE]` → core only. `[CA-EC]` → reference only (KG/dashboards point to it,
§3). Stages use pointers to taxonomies, not inline copies. **Pre-existing intra-file note**: `[CA-AIQ]` AI-Query
appears twice within `ca-db.md` (one per dashboard) — source-level, preserved, not cross-file.

## 3. References updated (28 cross-file groups)
Every cross-**file** bracket reference rewritten to "see X in <file>.md"; same-file refs, headings, self-refs,
and external refs left unchanged. Highlights:
- core: `[CA-EV]`/`[CA-V]` (Pro-Mode density line) + `[GB-1]`×2 → reference; `[CA-IMG]`→ca-img; `[MA-RC]`/`[MA-RA]`/`[CA-KG]`→apps; `[CA-DB]`×2→ca-db; `[CA-IP]`×2→stages.
- stages: `see [CSR]`×6→core; `[CA-C]`+`[GB-1]`, `[CA-CS]`, `[SM-3]`, `[CA-EV]`→reference.
- reference: PART-3 banner `[CA-HE]`→core; GB-1 "Critical Operating Rules" + SM-3 "Stage 3" pointers updated.
- ca-img: `[CA-V]`→reference.
- ca-kg: `[CA-EC]`×6, `[CA-V]`×2→reference; `[CA-DB]`, `[CA-AIQ]`→ca-db.
- ca-db: `[CA-EC]`×2, `[CA-V]`→reference; `[CA-KG]`→ca-kg; `[CA-IP]`×2→stages; `[CA-HE]`→core. (Same-file `[CA-DB]`/`[CA-DB-C]`/`[CA-DB-F]`/`[CA-RPT]`/`[CA-AIQ]` left untouched.)
- ma-ra: `[CA-KG]`→ca-kg.
Post-edit scan: **no substring corruption** (`.md` never followed by `-`/letter — `[CA-DB]` did not damage `[CA-DB-C/F]`).

## 4. Folded-in updates (mono source-of-truth + split, in parity)
- **Epistemic 💭** in `[CA-KG]`: `epistemic` field + `epistemic_note` (§3), extraction rule (§2), Info-tab marker (§4f), "💭 Entities to review (N)" report (§4f Analytics), checklist item, and the **Review interpretive entities (HITL)** offer alongside Gemini's Context-Effect offer; plus the `[CA-EC]` proposed-types note.
- **Artifact JS safety**: umbrella in core Output Mode + `[CA-DB-F]` Technical-Constraints bullet + `[CA-KG]` §4k item (IIFE; no reserved browser globals like `top`).

## 5. Gemini platform specifics — PRESERVED (verified)
- **Live Gemini API**: `ca-kg.md` §4j keeps `generativelanguage.googleapis.com/.../gemini-2.5-flash…:generateContent?key=…`, exponential backoff, and `parseMarkdown`. AI-Query is **live**, not placeholder (the only "placeholder" in ca-kg is the Info-tab empty-state prompt).
- **Cross-platform AI-Query** lines in `ca-db.md` (Gemini=live / Claude=Anthropic / GPT=placeholder) preserved.
- **Canvas sandbox** try-catch constraints + **Google Maps tiles** + RTL auto-detect preserved verbatim.
- **Gemini's after-KG offer** ("Context Effect Clarification Offer") retained; the epistemic HITL offer is added alongside it (chat-based — coexists with the in-artifact live API).

## 6. Flagged items
- **`[GB-1]` → `cbsa-reference.md`** (not explicitly assigned by the architecture; placed as foundational vocabulary, as in the Claude split). Reviewable.
- **`[CA-HE]` → core (full)** — mirrors the Claude decision (Hebrew is a primary path).
- **Loading Block** says "Gem's knowledge files"; safety wording says "canvas sandbox" — Gemini adaptations.
- **Deployment = Gemini Gem**: paste `cbsa-core.md` into Gem Instructions; upload the other 7 as Gem Knowledge. Gem knowledge-file retrieval may behave differently than Claude Projects — the Loading Block is the lever; **test post-deploy**.
