# Claude Code Handoff — InSites v9.1 KG/Runtime Update

**Scope:** Two independent instructions for updating the **Claude** instruction set (v9.1) and the shared `atar-runtime` package. These instructions target the **Claude (v9.1) prompt and the `atar-runtime` code only**. They do **not** rewrite the GPT or Gemini instruction sets, and they do not target any future host/shell. Note, however, that `atar-runtime` is shared across all three platforms, so a change to the package code affects them in practice — this is flagged where relevant.

Apply **Instruction 2 first** (it is blocking — it changes the shell that `[CA-KG]` emits), then **Instruction 1** on the clean base.

---

## Instruction 2 — Artifact UX/UI (`atar-runtime` + the runtime call in v9.1)

**Goal:** Update the `atar-runtime` package and its references in the Claude v9.1 prompt. Three behavioral changes plus a delegated versioning decision.

**Context:** The artifact (KG + Dashboard) is stateless; the only conversation→artifact bridge is the `DATA` object. Decision taken: the artifact is a **visualization only**; knowledge and queries live in the surrounding context (the chat), not inside the artifact.

### 2.1 — Remove the internal AI Query engine; convert to "Ask in chat"
- Remove from `atar-runtime` the internal query engine that calls `window.claude.complete`.
- Replace the existing **AI Query tab** with an **"Ask in chat" tab** (keep it as a tab — minimal change, predictable behavior; do not relocate it into the Info panel). On click, the artifact first attempts `sendPrompt(text)` if it exists in the environment; if unavailable, it falls back to copying the question to the clipboard with a notice: "Question copied — paste it into the chat." The sent/copied text includes the question plus the relevant fields from `DATA`.
- Remove the dependency on `host` / `window.claude.complete`. Note: `host` serves **only** the AI Query — removing its construction from the §4 shell (the `live`/`host` lines in `go()`) is safe and intended; the shell should call `mount(container, DATA)` without a host. (The copy-to-chat fallback already exists in the code — make it the default path.)

### 2.2 — Fix height-fill (the empty space)
- The graph does not fill the container height, especially in narrow mode — empty space remains below the network. Fix in `fitBounds` / `forceY` / `applyResponsive` / `resize` event handling so the network fills the container height and balances vertically at any width.

### 2.3 — Text-overflow remnants
- With the AI Query removed, answer-text overflow should resolve on its own. Verify no residual CSS / answer-container remains that causes overflow outside the artifact.

### Versioning decision (delegated to you)
Decide whether/how to bump the version number, under this frame:
- **Constraint:** published versions are immutable — do not republish over an existing number.
- **Name:** do not change the package name `atar-runtime` unless there is no alternative; if you must, flag it explicitly (it forces updates to the GPT/Gemini instructions too).
- **Dependency:** any change to `RUNTIME_URL` (currently `@0.3.4`) requires an identical update everywhere it appears in the **Claude (v9.1)** instructions: `[CA-KG]` §4, `[CA-DB]` §4, and `[CA-DB-C]` §3.
- **Awareness (not for action):** the same `RUNTIME_URL` also appears in the GPT/Gemini instructions that use this package; synchronizing them is out of scope here, but be aware of it when choosing the versioning strategy.

### 2.4 — Runtime call in the v9.1 prompt
After setting the version, update `RUNTIME_URL` in all three locations above, and update the shell text in §4 so it no longer describes the AI Query as a live capability (describe it as "Ask in chat" instead).

### 2.5 — Dashboard scope (deliberately deferred)
The dashboard ([CA-DB], [CA-DB-C]) also describes a runtime-owned live AI Query tab ([CA-DB] §5, [CA-DB-F], [CA-DB-C] §4). **Do not change the dashboard instructions in this pass** — leave them as-is. Rationale: dashboard questions may legitimately be scoped to the data shown there rather than to the chat; this is unresolved by design.

**Reconciling 2.4 and 2.5:** the `RUNTIME_URL` version bump (2.4) still applies in the dashboard sections ([CA-DB] §4, [CA-DB-C] §3) — that is a number-only change. What stays untouched here is the dashboard's **AI Query tab description/behavior**. Bump the URL everywhere; rewrite the AI-Query→"Ask in chat" text only in the **KG** instructions.

However, since `atar-runtime` is shared, the code-level removal of the AI Query engine (2.1) will affect the dashboard's live query in practice. When you implement the KG/runtime update, **consider this and surface a recommendation to the user**: should the dashboard's AI Query be aligned to "Ask in chat" too, or kept? Present it as a decision for the user — do not change it unilaterally.

**Out of scope:** GPT/Gemini instructions; any future host; knowledge-model depth (Instruction 1).

---

## Instruction 1 — KG knowledge-model (prompt layer, `[CA-KG]` in v9.1)

**Goal:** Expand KG extraction so it reflects the **whole assessment** (attribute→value→implication, integrity, context-effect), not only the significance statement.

**Context:** The current graph mainly reflects Stage 5 (a compressed synthesis). Missing: the integrity layer (Stage 3), the attribute→value→implication chain (Table 2.1), full coverage of Stage 2 values, and context-effect as an edge type. Goal: the graph "details" via **rich node fields** and **one new edge type** — not via node proliferation that would break readability (LIM principle).

### 1.1 — `[CA-KG]` §2 (extraction)
- **Value coverage:** extract a `Cultural Value` node for every Stage 2 value (do not compress to 3). Keep the ≤20-node total ceiling; if exceeded, trim secondary descriptive nodes, not values.
- **Context-effect edge:** add an edge type `frames` expressing context-effect (context → the value/attribute it frames). This is the explicit modeling of context-effect, whose absence made the concept un-queryable.

### 1.2 — `[CA-KG]` §3 (schema)
Add optional fields to value-bearing / physical nodes:
- `integrity` — integrity state (`high`/`medium`/`low`/`lost`) from Stage 3, where relevant.
- `implication` — the 🔑 sentence from Table 2.1: what significance is lost if the attribute is compromised.
- Both surface in the Info panel (and in the context passed by "Ask in chat") — never on the node glyph.

### 1.3 — `[CA-KG]` §5 (checklist)
Add verification: every Stage 2 value is represented; at least one `frames` edge exists; attribute-bearing nodes carry `integrity`/`implication` where the stages supplied them.

**Out of scope:** the decision of how much knowledge to pack into the visual `DATA` vs. leave to the chat — to be opened separately after the architecture stabilizes.
