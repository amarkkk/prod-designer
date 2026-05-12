# Documentation Map — The Ledger Redesign

Start with `00-master-plan.md` for full project context, chapter structure, and progress tracking.

## Top-level docs (steer by these)

- [Master plan](00-master-plan.md) — chapter structure, progress, findings, key decisions
- [Guardrails](guardrails.md) — all design constraints from DESIGN.md; check every design decision against this

## Reference (look up, don't modify)

Extracted data from the HTML artifact and design system book. Created once, referenced often.

- [Token extraction](reference/01-token-extraction.md) — all CSS values: colors (oklch + hex), typography, spacing, borders, sizing, motion, breakpoints
- [Component catalog](reference/02-component-catalog.md) — atoms, molecules, organisms, interactive states, accessibility audit, reference button pattern (Appendix A)
- [Design system principles](reference/03-design-system-principles.md) — token architecture, component anatomy, typography, accessibility, responsiveness, building checklist
- [Figma component library build guide](reference/figma-component-library-build-guide.md) — reusable component-building method: structure, naming, helpers, variants, properties, QA checklist

## Review (use during Figma work)

- [Figma component checklist](review/figma-component-checklist.md) — code-to-Figma accuracy checks for reviewing AI-generated components

## Sessions (append-only logs)

- [Ch 0.2 — Token extraction](sessions/ch-0.2-token-extraction.md)
- [Ch 0.3 — Accessibility scan](sessions/ch-0.3-accessibility-scan.md)
- [Ch 1.1 — Design system digestion](sessions/ch-1.1-design-system-digestion.md)

## Context (agent onboarding)

Files for AI agent onboarding. Humans can skip this folder.

- [Project overview](context/project-overview.md) — what this project is and why
- [User profile](context/user-profile.md) — Mark Andrassy, product designer, design system expertise
- [Workflow preferences](context/workflow-preferences.md) — how to collaborate, chapter structure, DESIGN.md conflict flagging
- [Component building pattern](context/component-building.md) — follow reference button pattern for all Figma components
- [Figma references](context/figma-references.md) — working file, portfolio reference, design system book chapter paths

## Original materials (read-only, provided by PeakX)

- `../original/DESIGN.md` — the design document for the HTML artifact
- `../original/README.md` — repo README
- `../original/test-assignment.md` — task description (markdown recreation of the PDF)
- `../original/AI-First Product Designer - Test Assignment.pdf` — original task PDF
