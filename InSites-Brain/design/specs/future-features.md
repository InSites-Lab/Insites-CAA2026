# Future Features — Dashboard & Report Enhancements

Deferred capabilities intentionally removed from the active bot specs, captured here as roadmap so they are not lost. Not loaded by any bot prompt.

---

## 1. In-artifact Print / Export component (Report tab)

**Status:** Deferred.

**What it was.** The dashboard Report tab originally specified two in-artifact buttons — **📄 Export HTML** (clone DOM → self-contained HTML file) and **🖨️ Print / PDF** (`window.print()`) — plus an `@media print` stylesheet and a sandbox-detection fallback.

**Why deferred / removed (ALL platforms).** In-artifact `window.print()` / blob-download does not work reliably in **any** of the bot canvases — the Claude React-artifact sandbox blocks it (`URL.createObjectURL`, `window.print()`), and it is likewise non-functional in the **GPT** and **Gemini** canvases. The buttons rendered as broken affordances and contradicted the `[CA-DB-F]` "no in-artifact download / print" rule. So the print/export buttons were removed **sweepingly, across all three platforms**:
- **Claude** — mono `InSites-CAA-claude.md` + split `cbsa-split/ca-db.md`
- **GPT** — `GPTs/report-tab-spec.md`
- **Gemini** — `Gemini/InSites-CAA-GEM-v9.md` + `Gemini/gem-split/ca-db.md`

Export is now **chat-delivered everywhere** (the bot generates a formatted Word/PDF in the conversation on request).

**Design sketch for a future revival:**
- **Now (shipped):** Report tab shows its content on-screen + a header note — "📥 Ask in chat to export this report as a formatted Word/PDF document." The bot produces the file in chat.
- **Option A — post-artifact generation:** keep export out of the artifact; the bot emits a downloadable Word/PDF (or a self-contained HTML file) as a chat deliverable, populated from the same dashboard data JSON.
- **Option B — in-artifact, if/when the sandbox allows it:** re-introduce an Export button that builds the HTML/PDF in memory and offers it via a sanctioned download path, guarded by a runtime capability check (only render the button when the API is actually available).
- **Option C — headless renderer:** an external HTML→PDF service the bot calls, returning a link.

**Dependencies / triggers to revisit:**
- A change in Claude artifact sandbox policy (download / `window.print()` becoming available), **or**
- A decision to standardize on chat-delivered Word/PDF export across all InSites artifacts ([CA-DB-F] contract).

**Where the active behavior lives now:** `cbsa-split/ca-db.md` §4c Report Tab (chat-delivered note) and the mirrored section in `InSites-CAA-claude.md`.
