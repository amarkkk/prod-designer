# Master Plan — The Ledger Redesign

Established 2026-05-12. Session 1 onboarding and planning.

## For new agents: how to start

1. Read this file end-to-end — it has all context, decisions, and findings.
2. Read `docs/added/guardrails.md` — every design decision must be checked against it.
3. Check the **Progress** section below to find the next `[ ]` chapter.
4. Read the chapter's description for scope and expected output files.
5. Read `docs/added/_index.md` for the full documentation map — it links to all reference docs, context files, and review checklists.
6. The HTML artifact is at `the-ledger.html` (repo root). The original design document is at `docs/original/DESIGN.md`. The task description is at `docs/original/test-assignment.md`.

Do not duplicate work from completed chapters. Do not read the design system book chapters (Obsidian vault) until Phase 1 — they are for Figma construction methodology, not planning.

## Context

PeakX test assignment: recreate a personal finance dashboard (single HTML file) in Figma, design three new features, and fix what's broken. The HTML artifact is a 2125-line self-contained file using Fraunces + Newsreader (Google Fonts), oklch() color, clamp() typography, and vanilla JS.

Work is structured as chapters for video walkthrough recordings. Multiple AI agents collaborate, so documentation and session logs are essential for handoff.

## Deliverables (from test assignment)

1. **Recreate the UI in Figma** — using Claude Code + Figma MCP
2. **Quick-create menu** — +New dropdown anatomy + first screen of 5 flows + 1 confirmation state
3. **Search / Command palette** — default, typing, empty, keyboard states
4. **Fix what's broken** — themed groups, before/afters, conscious-not-fixed with rationale
5. **Updated HTML prototype** reflecting the fixes
6. **Video walkthrough** — structured chapters, not timelapse

## Figma approach

- **Page 1 — "As-is":** faithful recreation of the current HTML artifact, warts and all. No corrections, no normalization. This is the baseline.
- **Page 2 — "Proposed":** improved version with fixes, normalized tokens, and new feature designs (+New menu, Search, before/after fixes).
- **Atomic design zones** within each page for spatial organization (tokens, atoms, molecules, organisms, mockup)
- **Replacement tokens** for content (sidebar items are just sidebar items — content decisions come later)
- **Design tokens as Figma variables** with proper scoping and naming
- **Text styles as composite tokens** built from variables
- **All interactive states** extracted from HTML hover/active/focus behaviors

### Token structure for before/after

The "as-is" page does not need a full variable system — it's a visual recreation using the raw values from the HTML. The "proposed" page gets the proper design system with normalized Figma variables. This avoids dual-token bloat (no need for two modes pointing to near-identical values like 9px vs 8px).

### oklch → Figma color conversion

Figma does not support oklch(). All oklch values from the HTML must be converted to hex during token extraction. The oklch values remain the source of truth in documentation; Figma gets the converted hex equivalents.

## Guardrails

Full guardrails extracted to `docs/added/guardrails.md`. All design decisions must be checked against the complete file, not just the anti-patterns list. Includes typography rules, color discipline, layout constraints, density principles, motion restrictions, and accessibility requirements.

## Reference files

| What | Where |
|------|-------|
| Working Figma | https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger |
| Reference Figma (portfolio) | https://www.figma.com/design/AQQOxpMnwqrL8ZilRo3jPr/amark.design-2026--32px-vertical-grid- |
| HTML artifact | `the-ledger.html` (repo root) |
| Design document | `docs/original/DESIGN.md` |
| Test assignment (PDF) | `docs/original/AI-First Product Designer - Test Assignment.pdf` |
| Test assignment (markdown) | `docs/original/test-assignment.md` |
| Design System Book Ch 4–7, 10 | Local Obsidian vault (see `docs/added/context/figma-references.md` for paths) |

---

## Progress

Status tags: `[ ]` not started · `[~]` in progress · `[x]` done

Each chapter produces a session log in `docs/added/sessions/` and any output documents listed below.

## Chapter structure

### Phase 0 — Audit & planning

#### `[x]` Ch 0.1: Onboarding & master plan
- Read all reference materials
- Establish project context, constraints, anti-patterns
- Document findings and decisions
- Output: `docs/added/00-master-plan.md`, `docs/added/guardrails.md`, `docs/added/project-decisions.md`

#### `[x]` Ch 0.2: Token extraction & component catalog
Extract from HTML without testing:
- All CSS custom properties (colors, spacing, sizing, timing)
- oklch → hex conversion for all color tokens
- All font declarations (family, size, weight, variation settings, clamp ranges)
- All spacing values (padding, margin, gap) — identify scale patterns and outliers
- Catalog every distinct component type with its HTML class name
- Map interactive states visible in CSS (hover, focus, checked, active, transitions)
- Output: `docs/added/reference/01-token-extraction.md`, `docs/added/reference/02-component-catalog.md`

#### `[x]` Ch 0.3: Quick accessibility scan
Lightweight, focused on what informs component design:
- Tab order and focusability of interactive elements
- Focus state indicators (present? styled? visible?)
- ARIA attributes inventory (what exists, what's missing)
- Keyboard interaction model (what works, what doesn't)
- This feeds into which states must be designed into Figma components
- Output: findings folded into `docs/added/reference/02-component-catalog.md`

### Phase 1 — Design system foundation

#### `[x]` Ch 1.1: Design system book chapter digestion
Read chapters 4 (Accessibility), 5 (Responsiveness), 6 (Component Anatomy), 7 (Design Tokens), 10 (Typography). Extract actionable takeaways specific to this project — naming conventions, token structure, component anatomy patterns, Figma component building methodology.
- Output: `docs/added/reference/03-design-system-principles.md`

### Phase 2 — Figma construction (Page 1 — as-is)

Faithful recreation using Figma color styles and text styles under `as-is/` folders — no Figma variables, no normalization. Component building follows `reference/03-design-system-principles.md` section 6 (structural principles, naming, anatomy). Styles defined in `reference/03-design-system-principles.md` section 6 "As-is Figma styles." User reviews atoms before proceeding to molecules. Review against `review/figma-component-checklist.md`.

#### `[ ]` Ch 2.1: Atoms (Page 1 — as-is)
Buttons (primary, ghost, link-action, icon), chips, tabs, badges/pills, input field, hairlines/rules, typography samples, status indicators (dots, arrows, trends). Built with raw values matching the HTML exactly.
- User review gate: atoms approved before proceeding to Ch 2.2.

#### `[ ]` Ch 2.2: Molecules (Page 1 — as-is)
Section header, KPI row, ledger table row, budget bar row, goal card, coach note, account list item, nav item, notice row, marginalia, legend, hero delta, hero split cell

#### `[ ]` Ch 2.3: Organisms & full mockup (Page 1 — as-is)
Sidebar, topbar, status bar, hero section, cashflow + distribution, ledger + budgets, goals grid, coach grid, notices feed. Assemble into full dashboard mockup.

### Phase 3 — Token normalization & proposed page setup

#### `[ ]` Ch 3.1: Token normalization & Figma variables
- Normalize extracted tokens: round inconsistent values to a coherent scale
- Define spacing scale (micro, meso, macro — which scale, which don't)
- Define typography scale with clamp audit at chosen breakpoints
- Create Figma variables with scoped naming
- Only the "proposed" Figma page gets the variable system.
- Output: Figma variables in the working file

### Phase 4 — Task deliverables (Page 2 — proposed)

#### `[ ]` Ch 4.1: Quick-create menu (+New)
- Dropdown anatomy, hierarchy, hover/focus states
- 5 flow first screens: new entry, new transfer, new goal, new category, connect account
- Pattern decisions: which flows are modals, side-sheets, inline, or separate pages
- 1 confirmation/success state (pick the most interesting flow)

#### `[ ]` Ch 4.2: Search / Command palette
- Default state, typing with mixed results, empty state
- Keyboard navigation model
- Quick-create entries in search results
- Autocomplete behavior

#### `[ ]` Ch 4.3: Fix what's broken
- Group findings into themes
- Before/after for 1–2 representative issues per theme
- Conscious not-fixed items with rationale
- Apply fixes to Figma mockup (Page 2)

### Phase 5 — Prototype & testing

#### `[ ]` Ch 5.1: HTML prototype updates
- Apply visual fixes from Ch 4.3 to `the-ledger.html`
- Static states for +New menu and search
- Verify font/color/spacing match Figma intent

#### `[ ]` Ch 5.2: Playwright verification
- Accessibility testing
- Screenshot comparison at target breakpoints
- Focus/tab order verification
- Responsive behavior validation

### Phase 6 — Wrap-up

#### `[ ]` Ch 6.1: Final write-up & presentation prep
- Summary document with themed findings
- Before/after showcase
- Session chapter summaries for video

---

## Key decisions made

| Decision | Rationale |
|----------|-----------|
| IA fix (sidebar ↔ content mismatch) postponed | Structural change, out of scope for this task. Documented as "noticed but consciously not fixing." |
| Desktop + one collapsed state for responsive | Full responsive redesign is overhead. Collapsed state demonstrates awareness. |
| Clamp audit deferred to Phase 1.2 | Needs breakpoint decisions first. Will check slopes at chosen resolutions. |
| Two Figma pages: as-is + proposed | Page 1 is faithful recreation. Page 2 has fixes, normalized tokens, new features. Avoids dual-token bloat. |
| Replacement tokens for content | Component structure comes first, content decisions (IA, naming) come later. |
| oklch → hex conversion | Figma doesn't support oklch(). Convert during token extraction, keep oklch as documentation source of truth. |
| As-is page uses raw values, proposed page uses variable system | Avoids needing before/after modes in the same token set. |
| Design system book chapters read in Phase 1, not Phase 0 | Avoid context bloat in planning phase. Methodology informs construction, not planning. |

## Findings: sidebar vs content section mismatch

The sidebar navigation names do not match the main content section headings:

| Sidebar § | Sidebar label | Content § | Content heading | Match? |
|-----------|--------------|-----------|-----------------|--------|
| § i | Today | § i | Today | Yes |
| § ii | Transactions | § ii | Cashflow | No — "Cashflow" is income vs spending |
| § iii | Budgets | § iii | Where it went | No — "Where it went" is spending distribution |
| § iv | Goals | § iv | The Ledger | No — this is the transactions table |
| § v | Bills | § v | Budgets | No — budgets with bar fills |
| § vi | Coach | § vi | Goals | No — savings goals |
| § vii | Reports | § vii | Coach | No — actionable nudges |
| — | — | § viii | Notices | Missing from sidebar |

This is the single biggest structural issue. Bills (§ v sidebar) has no dedicated section — it maps to the "Due in 14 days" KPI in May figures. Reports shows "—" with no content. Notices exists in content but not sidebar.

**Status:** Documented. Not fixing in this scope — would require content/IA decisions beyond a design exercise.

## Findings: responsive progressive disclosure gap

DESIGN.md defines breakpoints at 1240, 1080, 960, 720px. At each step, content is hidden:
- ≤1240: marginalia hidden
- ≤1080: ticker hidden, layouts stack
- ≤960: sidebar off-canvas, shortcuts hidden, topbar sub hidden
- ≤720: search hidden, hero-split stacks

No alternative access is provided for any hidden element. Users on smaller screens lose context (marginalia), navigation shortcuts (status bar), and even search. This is a red flag for accessibility and usability.

**Status:** Documented as a theme in "fix what's broken." Will show before/after for one case. Not fully redesigning responsive behavior — scope is desktop + one collapsed state.

## Findings: spacing inconsistency

Padding values extracted from CSS (non-exhaustive sample):
- 7px, 8px, 9px, 9.5px, 10px, 10.5px, 11px, 11.5px, 12px, 12.5px, 13px, 13.5px, 14px, 16px, 18px, 20px, 22px, 24px

There is no coherent spacing scale. Values like 9px, 11px, 13px suggest arbitrary placement rather than a system. A 4px-base scale (4, 8, 12, 16, 20, 24, 32) would cover most needs.

**Status:** Will normalize in Phase 1.2 token normalization.

## Findings: UX writing issues

- Coach: "3 notes ready" — ready implies a queue, but these are actionable nudges
- Coach types: "alert / sweep / heads-up" — not self-explanatory without domain knowledge
- "Dining nudge" — unclear what distinguishes a heads-up from an alert from a nudge semantically
- Sidebar hint "—" for Reports — displaying absence as a value when zero reports could simply not show a badge
- Version "v 2.1" in sidebar brand — unnecessary for end users

**Status:** Will address in Ch 3.3 (fix what's broken) where appropriate.

## Findings: typography readability concern

The serif font stack (Fraunces display + Newsreader body) creates density that is hard to read at both 1080p and 2K. Small sizes (9.5px labels, 10px eyebrows, 10.5px metadata) combine with high letter-spacing and all-small-caps to reduce legibility. The clamp() ranges may produce steep interpolation between breakpoints.

**Status:** Clamp slope audit in Phase 1.2. May propose piecewise clamps if slopes are too aggressive. Minimum body size of 13px per DESIGN.md is respected but edge-case labels go well below.

---

## DESIGN.md guardrails

Full guardrails are in `docs/added/guardrails.md` — that is the canonical reference. All design decisions must be checked against the complete guardrails file, not a partial list. Covers: typography rules, color discipline, layout constraints, density principles, motion restrictions, accessibility requirements, and the explicit anti-patterns table.
