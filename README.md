# The Ledger — Product Design Assignment

Submission by **Mark Andrassy** for the PeakX AI-First Product Designer test assignment.

Recreate a personal finance dashboard in Figma, design two new features (quick-create menu, search/command palette), and fix what's broken — AI-assisted throughout.

## Key deliverables

| What | Where |
|------|-------|
| Video walkthrough | [YouTube](https://youtu.be/4S8RHGjWIpg) |
| Figma file (live) | [The Ledger](https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger?node-id=0-1&t=jzEQMSyOLKx3jMFi-1) · password: `multi-select-combo-box` |
| Figma source file | [`The Ledger.fig`](The%20Ledger.fig) — for inspecting variables, component sets, and token architecture |
| Enriched prototype | [`the-ledger-v2.html`](the-ledger-v2.html) — interactive flows for quick-create and search |
| Original prototype | [`the-ledger.html`](the-ledger.html) — untouched baseline from PeakX |
| Planning docs | [`docs/added/`](docs/added/) — master plan, session logs, specs, and reference extractions |

## Repository structure

```
peak-prod-designer/
├── README.md                  ← you are here
├── The Ledger.fig             ← Figma source file (variables, components, tokens)
├── the-ledger.html            ← original HTML prototype (untouched)
├── the-ledger-v2.html         ← enriched prototype with quick-create + search flows
│
├── docs/
│   ├── original/              ← test assignment materials (read-only)
│   │   ├── test-assignment.md
│   │   ├── AI-First Product Designer - Test Assignment.pdf
│   │   ├── DESIGN.md          ← design document for the HTML artifact
│   │   └── README.md          ← original repo README
│   │
│   └── added/                 ← my planning and documentation
│       ├── 00-master-plan.md  ← start here for full context
│       ├── guardrails.md      ← design constraints extracted from DESIGN.md
│       ├── _index.md          ← full documentation map
│       ├── reference/         ← token extraction, component catalog, design principles
│       ├── review/            ← Figma audit checklists and deep audit reports
│       ├── sessions/          ← per-chapter session logs (Ch 0.2 through Ch 4.3)
│       └── context/           ← AI agent onboarding files
│
└── output/
    └── playwright/            ← testing screenshots and visual audit scripts
```

## Figma file structure

The Figma file has two pages:

- **Page 1 — "As-is"** contains all task deliverables: the UI recreation, quick-create menu, search/command palette, and fix documentation frames. Organized in atomic design zones (tokens, atoms, molecules, organisms, full mockup) with the new feature sections alongside.
- **Page 2 — "Proposed"** is a design token architecture contribution toward Task 4. It duplicates the As-is component tree but rewires everything through a layered variable system (foundation, alias, and mapping tokens for color, spacing, dimension, typography, radius, and focus). The token structure is complete; the aesthetic values are not fully carried over.

## Assignment tasks and where to find them

### Task 1: Recreate the UI in Figma

AI-assisted recreation of the HTML dashboard using atomic design methodology (atoms, molecules, organisms). The recreation is on the As-is page — built component-by-component across Chapters 2.1–2.3 with review gates at each level.

### Task 2: Quick-create menu (+New)

Dropdown anatomy, five flow first screens (new entry, new transfer, new goal, new category, connect account), and a confirmation state.

- Figma: [Quick-create section](https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger?node-id=355-2488&t=jzEQMSyOLKx3jMFi-4) on the As-is page
- Prototype: interactive flows in [`the-ledger-v2.html`](the-ledger-v2.html)
- Spec: [`docs/added/sessions/ch-4.1-quick-create-menu.md`](docs/added/sessions/ch-4.1-quick-create-menu.md)

### Task 3: Search / command palette

Default state, typing with mixed results, empty state, and keyboard interaction model. Functions as a universal launcher (find + act).

- Figma: [Search section](https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger?node-id=420-4523&t=jzEQMSyOLKx3jMFi-4) on the As-is page
- Prototype: interactive command palette in [`the-ledger-v2.html`](the-ledger-v2.html)
- Spec: [`docs/added/sessions/ch-4.2-search-command-palette.md`](docs/added/sessions/ch-4.2-search-command-palette.md)

### Task 4: Fix what's broken

Seven themes identified: information architecture mismatch, spacing inconsistency, typography readability, accessibility gaps, responsive progressive disclosure, UX writing, and visual consistency.

- Theme inventory and rationale: [`docs/added/sessions/ch-4.3-fix-whats-broken.md`](docs/added/sessions/ch-4.3-fix-whats-broken.md) — seven themes with scoping, before/after specs, and conscious not-fixed decisions
- Figma: [Fix theme frames](https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger?node-id=402-9016&t=jzEQMSyOLKx3jMFi-4) on the As-is page — the would-be Figma implementation. Absolutely failed output.
- Design tokens as a structural fix: the entire [Proposed page](https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger?node-id=249-2488) (Phase 3, Chapters 3.1–3.6) addresses spacing inconsistency and typographic scale as systemic fixes through a normalized token architecture

## Completion status

| Phase | Chapters | Status |
|-------|----------|--------|
| Phase 0 — Audit and planning | Ch 0.1–0.3 | Complete |
| Phase 1 — Design system foundations | Ch 1.1 | Complete |
| Phase 2 — Figma recreation (As-is) | Ch 2.1–2.3 | Complete |
| Phase 3 — Token normalization (Proposed) | Ch 3.1–3.6 | Complete |
| Phase 4 — Quick-create menu | Ch 4.1 | Spec and prototype complete; Figma needs refinement |
| Phase 4 — Search / command palette | Ch 4.2 | Spec and prototype complete; Figma needs refinement |
| Phase 4 — Fix what's broken | Ch 4.3 | Spec and theme inventory complete; Figma before/afters not executed |

Full chapter breakdown with outputs and session logs: [`docs/added/00-master-plan.md`](docs/added/00-master-plan.md)

## Approach

Work was structured as numbered chapters, designed for video walkthrough recordings. Each chapter has a session log in [`docs/added/sessions/`](docs/added/sessions/).

### Tools used

| Purpose | Tool |
|---------|------|
| AI coding and Figma construction | Claude Code (with Figma MCP), OpenAI Codex |
| Testing and screenshots | Playwright |
| Documentation and notes | Obsidian |
| Voice dictation | VoiceInk |
| Session recording | BetterCapture |
| Video production | DaVinci Resolve |

## Original assignment

Materials provided by PeakX, stored untouched in `docs/original/`.

- [Test assignment (PDF)](docs/original/AI-First%20Product%20Designer%20-%20Test%20Assignment.pdf) — the original brief as received
- [Test assignment (markdown)](docs/original/test-assignment.md) — my transcription of the PDF for AI agent consumption
- [DESIGN.md](docs/original/DESIGN.md) — the design document for the HTML artifact
- [Live HTML](https://ledger-test.peakx.ai/)
