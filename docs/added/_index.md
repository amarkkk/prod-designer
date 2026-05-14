# Documentation Map — The Ledger Redesign

Start with `00-master-plan.md` for full project context, chapter structure, and progress tracking.

## Top-level docs (steer by these)

- [Master plan](00-master-plan.md) — chapter structure, progress, findings, key decisions
- [Guardrails](guardrails.md) — all design constraints from DESIGN.md; check every design decision against this

## Reference (look up, don't modify)

Extracted data from the HTML artifact and design system book. Created once, referenced often.

- [Token extraction](reference/01-token-extraction.md) — all CSS values: colors (oklch + hex), typography, spacing, borders, sizing, motion, breakpoints
- [Component catalog](reference/02-component-catalog.md) — atoms, molecules, organisms, interactive states, accessibility audit, reference button pattern (Appendix A)
- [Design system principles](reference/03-design-system-principles.md) — token architecture, component anatomy, typography, accessibility, responsiveness, building checklist. Must be revalidated in Ch 3.1 against the DSB sources and the completed Page 1 work.
- [Figma component library build guide](reference/figma-component-library-build-guide.md) — reusable component-building method: structure, naming, helpers, variants, properties, QA checklist
- `dsb/` — source Design System Book chapters 4, 5, 6, 7, and 10. Use these to validate or revise `03-design-system-principles.md`.

## Review (use during Figma work)

- [Figma component checklist](review/figma-component-checklist.md) — code-to-Figma accuracy checks for reviewing AI-generated components
- [Ch 2.2 molecule deep audit](review/ch-2.2-molecule-deep-audit.md) — detailed molecule audit that informed the final Ch 2.2 correction pass
- [Ch 2.3 organism/mockup deep audit](review/ch-2.3-organism-mockup-deep-audit.md) — dashboard-level audit, applied fix pass, and remaining review notes

## Sessions (append-only logs)

- [Ch 0.2 — Token extraction](sessions/ch-0.2-token-extraction.md)
- [Ch 0.3 — Accessibility scan](sessions/ch-0.3-accessibility-scan.md)
- [Ch 1.1 — Design system digestion](sessions/ch-1.1-design-system-digestion.md)
- [Ch 2.1 — Atoms](sessions/ch-2.1-atoms.md) — approved handoff for Ch 2.2 molecules
- [Ch 2.2 — Molecules](sessions/ch-2.2-molecules.md) — completed handoff for Ch 2.3 organisms
- [Ch 2.3 — Organisms and full mockup](sessions/ch-2.3-organisms.md) — closed Page 1 as-is baseline and Phase 2 handoff
- [Ch 3.1 — Token normalization](sessions/ch-3.1-token-normalization.md) — Proposed page duplicate, proposed variables/styles, vertical rhythm, and token recommendations
- [Ch 3.2 — Proposed system plan](sessions/ch-3.2-proposed-system-plan.md) — scope correction, instance-link audit, layered token implementation, variable-table board, and Phase 3 batch plan
- [Ch 3.3 — Proposed atoms](sessions/ch-3.3-proposed-atoms.md) — atom local master repair, state expansion, focus rings, and atom token binding
- [Ch 3.4 — Proposed molecules](sessions/ch-3.4-proposed-molecules.md) — molecule local masters, nested atom relink, and molecule token validation
- [Ch 3.5 — Proposed organisms/layout](sessions/ch-3.5-proposed-organisms-layout.md) — organism local masters, full mockup relink, shell dimensions, and layout/rhythm token binding
- [Ch 3.6 — Proposed system audit](sessions/ch-3.6-proposed-system-audit.md) — final Phase 3 audit and Phase 4 handoff gate
- [Ch 4.0 — Phase 4 brainstorm](sessions/ch-4.0-phase4-brainstorm.md) — index for Phase 4, links to focused specs below
- [Ch 4.1 — Quick-create menu](sessions/ch-4.1-quick-create-menu.md) — dropdown anatomy, 5 flow first screens, data model, confirmation state
- [Ch 4.2 — Search / command palette](sessions/ch-4.2-search-command-palette.md) — 4 states, keyboard model, universal launcher
- [Ch 4.3 — Fix what's broken](sessions/ch-4.3-fix-whats-broken.md) — 7 themes, before/after specs, noted-but-not-designed items

## Context (agent onboarding)

Files for AI agent onboarding. Humans can skip this folder.

- [Project overview](context/project-overview.md) — what this project is and why
- [User profile](context/user-profile.md) — Mark Andrassy, product designer, design system expertise
- [Workflow preferences](context/workflow-preferences.md) — how to collaborate, chapter structure, DESIGN.md conflict flagging
- [Component building pattern](context/component-building.md) — source-backed states, nesting, missing dependency rules, and variant economy
- [Figma chapter kickoff template](context/figma-chapter-kickoff-template.md) — session template for molecule/organism kickoff audits
- [Figma references](context/figma-references.md) — working file, portfolio reference, design system book chapter paths
- [Ch 2.3 organisms kickoff prompt](context/ch-2.3-organisms-kickoff-prompt.md) — historical kickoff prompt for the now-closed Page 1 organism chapter
- [Ch 3.1 token normalization kickoff prompt](context/ch-3.1-token-normalization-kickoff-prompt.md) — ready-to-paste prompt for starting Phase 3

## Original materials (read-only, provided by PeakX)

- `../original/DESIGN.md` — the design document for the HTML artifact
- `../original/README.md` — repo README
- `../original/test-assignment.md` — task description (markdown recreation of the PDF)
- `../original/AI-First Product Designer - Test Assignment.pdf` — original task PDF
