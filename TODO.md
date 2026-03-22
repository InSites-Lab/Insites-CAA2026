# TODO — InSites CAA Workshop

## Workshop Site
- [ ] **Rename Atar.Bot → InSites-CAA** — case-sensitive replace `Atar.Bot` → `InSites-CAA` in all display text. Do together with remote repo setup since URLs will change too. Lowercase `atar.bot` in URLs (alephplace.com/atar.bot/, github.com/atar.bot-*) need separate handling after new repo is created.
- [ ] Workshop-site LIM rules — create `.claude/rules/workshop-site.md` (trigger: "workshop LIM rules")
- [ ] Deploy updated `dist/` to alephplace.com/CAA26 after rename + KG changes

## Bot Brain — Stage & Mini-Agent Audit (plan: `.claude/plans/cbsa-eac-benchmark-audit.md`)
Part 1 (Taxonomy/Appendix) — DONE (items 1,4,5 applied in mono v2.1). Remaining Part 1 items:
- [ ] [CA-V] Social Value — add note that research assessments may underrepresent it
- [ ] [CA-V] Mystery/Enigma — verify category pulls its weight vs EAC data
- [ ] [CA-C] Statutory/regulatory context note
- [ ] [CA-CS] Ensemble Connection criterion — clarity check
- [ ] [CA-KG] Verify node/edge schema handles multi-period, landscape-scale sites
- [ ] [CA-DB] Compare dashboard spec against `eac11-dashboard-data.json` fields

Part 2 — Stage spec validation (each stage vs 2-3 EAC sites):
- [ ] Stage 0: 7-row checklist, Documentation Profile tiers
- [ ] Stage 1: 280-word description, timeline, context selection, Context Effect
- [ ] Stage 2: 4-6 values at 350-400 words, Attribute table, Value Dynamics, Inferred Values Rule
- [ ] Stage 3: Nara Grid rows, Three-State Principle, Integrity Condition Description
- [ ] Stage 4: Priority A/B fallback, 2-4 criteria from [CA-CS]
- [ ] Stage 5: 3-5 paragraphs ≤300 words, convergence, documentary integrity sentence
- [ ] Stage 6: Reliability Constraint, Quick Boosts, Context-Effect Planning

Part 3 — Live testing:
- [ ] Run updated mono on Claude.ai with EAC site data
- [ ] Compare output against `MA-RC-execution-15sites.md` reference
- [ ] Verify no regressions in stage quality

## Bot Brain — Other
- [ ] Skills-split sync — mono → split when freezing for deployment (~March 25-26), move [CA-EC] to KG skill
- [ ] Creativity control — designed but not written, branch `feature/creativity-control` exists empty
- [ ] Test skills-split on Sonnet — verify all triggers work with ~870-line core
- [ ] Hebrew RTL table rendering — monitor, re-insert Global Table Contract if breaks (see memory)

## Deployment
- [ ] Create remote repo (new name TBD, not "atar.bot")
- [ ] Claude.ai Project setup guide (SETUP-GUIDE.md) — participants copy-paste instructions
- [ ] Workshop companion site Setup tab — copy-paste buttons, skill download, visual guide
- [ ] GPT/Gemini sync — propagate v2 changes (MA-RC, MA-RA) to GPT knowledge files and Gemini prompts
- [ ] Evaluate Gemini JSX artifact support for KG rendering (may need different approach)

## Workshop Content
- [ ] Demo script (~ready by March 25)
- [ ] Participant guide
- [ ] Fallback scenarios validated
- [ ] Integration dry run (Phase 4: March 21-27)
