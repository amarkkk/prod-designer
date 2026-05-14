# Master Plan — The Ledger Redesign

Established 2026-05-12. Session 1 onboarding and planning.

## For new agents: how to start

1. Read this file end-to-end — it has all context, decisions, and findings.
2. Read `docs/added/guardrails.md` — every design decision must be checked against it.
3. For Figma component work, read `docs/added/context/component-building.md` before building. It defines source-backed states, nesting, and state-boundary rules.
4. Check the **Progress** section below to find the next `[ ]` chapter.
5. Read the chapter's description for scope and expected output files.
6. Read `docs/added/_index.md` for the full documentation map — it links to all reference docs, context files, and review checklists.
7. The HTML artifact is at `the-ledger.html` (repo root). The original design document is at `docs/original/DESIGN.md`. The task description is at `docs/original/test-assignment.md`.

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

#### `[x]` Ch 2.1: Atoms (Page 1 — as-is)
Buttons (primary, ghost, link-action, icon), chips, tabs, badges/pills, input field, hairlines/rules, typography samples, status indicators (dots, arrows, trends). Built with raw values matching the HTML exactly.
- User review gate passed on 2026-05-12. Session log: `docs/added/sessions/ch-2.1-atoms.md`.

#### `[x]` Ch 2.2: Molecules (Page 1 — as-is)
Section header, KPI row, ledger table row, budget bar row, goal card, coach note, account list item, nav item, notice row, marginalia, legend, hero delta, hero split cell
- Completed and corrected after review on 2026-05-13. Session log: `docs/added/sessions/ch-2.2-molecules.md`.
- Deep audit: `docs/added/review/ch-2.2-molecule-deep-audit.md`.
- Important handoff: Ch 2.2 final pass unbound variant-specific specimen text where Figma shared text properties collapsed source-backed variants. Do not blindly rebind those fields in Ch 2.3.

#### `[x]` Ch 2.3: Organisms & full mockup (Page 1 — as-is)
Sidebar, topbar, status bar, hero section, cashflow + distribution, ledger + budgets, goals grid, coach grid, notices feed. Assemble into full dashboard mockup.
- Kickoff prompt: `docs/added/context/ch-2.3-organisms-kickoff-prompt.md`.
- Completed and corrected after organism/mockup review on 2026-05-13.
- Output: `docs/added/sessions/ch-2.3-organisms.md`.
- Deep audit and fix record: `docs/added/review/ch-2.3-organism-mockup-deep-audit.md`.
- Important handoff: Page 1 `As-is` is closed as the source-backed baseline. Use `full-dashboard-mockup` id `211:865` and organism section id `207:196` for reference. Carry forward the Ch 2.2/2.3 caveats: intentional `mixed` rich text, direct specimen text overrides where shared properties collapse examples, and exact-token paint relinking after Figma script edits.

### Phase 3 — Token normalization & proposed page setup

#### `[x]` Ch 3.1: Initial token normalization & Figma variable scaffold
- Re-read `docs/added/reference/03-design-system-principles.md` and validate it against the source DSB chapters in `docs/added/dsb/`; improve the principles doc where the Page 1 UI work exposed gaps or overreach.
- Normalize extracted tokens: round inconsistent values to a coherent scale
- Define spacing scale (micro, meso, macro — which scale, which don't)
- Define a practical vertical rhythm for the dashboard, derived from body text line-height and checked against all proposed text styles.
- Define typography scale with clamp audit at chosen breakpoints
- Consider whether a minimal dark mode belongs in the proposed token set, especially for top navigation/status surfaces; do not create a broad token network unless the design needs it.
- Optional: evaluate compact/default/relaxed density modes as a future-facing extension, but keep Ch 3.1 scoped to the default proposed foundation unless the value is clear.
- Create the `Proposed` page by duplicating the closed `As-is` page, then work only on the duplicate.
- Keep Page 1 `As-is` and existing grouped `as-is/` color/text styles intact as locked source evidence.
- Create separate `proposed/` color and text style groups for proposed composite design tokens.
- Create Figma variables with scoped naming
- Only the "proposed" Figma page gets the variable system.
- Output: Figma variables in the working file
- Kickoff prompt: `docs/added/context/ch-3.1-token-normalization-kickoff-prompt.md`.
- Completed as scaffold on 2026-05-13. Session log: `docs/added/sessions/ch-3.1-token-normalization.md`.
- Post-review correction: Ch 3.1 is not sufficient as the final Proposed design-system foundation. It created the page duplicate and first variables/styles, but Proposed still needs a full foundation → alias → mapping token network, self-contained Proposed component masters, five interaction states, and full variable binding across atoms, molecules, organisms, and layout.
- Figma audit: after duplication, many Proposed instances still pointed to Page 1 `As-is` masters. These must be rewired before Proposed can be used as a shippable system. Do not start Phase 4 deliverables until the Ch 3.x system work below is complete.
- Important handoff: `Proposed` was created by duplicating `As-is`; Page 1 and existing `as-is/` styles remain locked. Proposed labels were renamed away from `As-is`, but component tokenization and instance reconnection are intentionally deferred to the following chapters.

#### `[x]` Ch 3.2: Proposed token architecture & variable table
- Use `docs/added/sessions/ch-3.2-proposed-system-plan.md` as the planning entry point.
- Rebuild the proposed token architecture in the style of the reference variable-table system: foundation, alias, and mapping layers for color, spacing, dimension, typography, radius/rule/focus, and any required effects.
- Color foundations must support at least Light and Dark value modes, with aliases/mappings resolving through the foundation layer.
- Split horizontal spacing scale from vertical rhythm where useful: horizontal spacing can stay on a compact grid, while vertical rhythm can derive from line-height multiples.
- Define component mapping namespaces only for real Proposed components that will be retokenized in Ch 3.3-Ch 3.5.
- Output: updated Figma variable collections and token specimen/table on `Proposed`; updated session log.
- Completed on 2026-05-13. Session log: `docs/added/sessions/ch-3.2-proposed-system-plan.md`.
- Output: 20 layered Ch 3.2 collections and 320 baseline variables across color, space, dimension, type, rule, radius, and focus. Existing flat Ch 3.1 collections were renamed as legacy scaffolds.
- Important handoff: `proposed/` paint styles now bind to color aliases. `proposed/` text styles bind to type aliases for family, weight, size, line-height, and letter-spacing; `fontStyle` binding did not persist and must remain documented. Label tracking is pixel-bound in Figma: `0.5px`, `0.55px`, `0.6px`.
- Token board: `Token Architecture — Proposed / Ch 3.2` id `276:5169`.

#### `[x]` Ch 3.3: Proposed atoms — tokenized masters and states
- Rename/reframe atom sections as Proposed-only system sections.
- Ensure all atom component instances and nested instances resolve to Proposed-local masters, not Page 1 `As-is` masters.
- Rebuild or retokenize atom masters with component mapping tokens for color, spacing, dimension, typography, rules, radius, and focus.
- Define required interaction states for interactive atoms: enabled/default, hover, focus, pressed, disabled. Add selected/active and semantic states where the component needs them.
- Apply proposed text styles and variable bindings; no raw component-level values where Figma supports variables/styles.
- Output: tokenized Proposed atom components, state matrix, and audit log.
- Completed on 2026-05-13. Session log: `docs/added/sessions/ch-3.3-proposed-atoms.md`.
- Final result: atom instances resolve to Proposed masters, atom text uses `proposed/` styles, visible paints are variable-bound, interactive atom families include the required state model, and atom geometry/focus/spacing/radius values are bound where Figma supports variable bindings.
- Important handoff: a first state-variant clone pass placed generated variants on Page 1 `As-is`; those 41 generated nodes were removed immediately and recreated inside Proposed component sets. Final audit confirms no generated `308:*` components remain on `As-is`.

#### `[x]` Ch 3.4: Proposed molecules — propagate tokens and nested masters
- Rewire molecule components to use Proposed atom instances.
- Bind molecule spacing, dimensions, rules, fills, strokes, and typography through proposed alias/mapping tokens.
- Tailor molecule variants and state boundaries without parent × child variant explosions.
- Check molecule rows, dense lists, controls, and headings against the vertical rhythm and guardrails.
- Output: tokenized Proposed molecules, reconnection audit, and visual QA.
- Completed on 2026-05-13. Session log: `docs/added/sessions/ch-3.4-proposed-molecules.md`.
- Final result: created missing Proposed molecule masters, rewired all molecule instances to Proposed atoms/molecules, and validated `0` As-is links, `0` `as-is/` text styles, and `0` unbound visible paints in `Molecules — Proposed`.

#### `[x]` Ch 3.5: Proposed organisms and shell layout
- Rewire organism components to use Proposed molecule/atom instances.
- Tokenize the full dashboard mockup and shell dimensions.
- Reconcile design refinements with guardrails: more breathing room between organisms, horizontal-rule alignment, equalized sidebar brand/topbar height, equalized statusbar/sidebar footer height, and no card/shadow drift.
- Apply responsive and density recommendations only where the organism system proves a real need.
- Output: tokenized Proposed organisms, full mockup, layout/rhythm audit, and screenshot QA.
- Completed on 2026-05-13. Session log: `docs/added/sessions/ch-3.5-proposed-organisms-layout.md`.
- Final result: created Proposed organism masters, rewired organisms and the full mockup to Proposed-only masters, bound shell dimensions and row/rhythm spacing tokens, and validated `0` As-is links/styles/unbound visible paints in `Organisms — Proposed` and `Recreation validation`.

#### `[x]` Ch 3.6: Proposed system audit and handoff
- Verify no Proposed instances point to Page 1 `As-is` masters.
- Verify no Proposed component layer uses `as-is/` styles.
- Verify fills, strokes, spacing, dimensions, rules, focus, and typography are bound to proposed variables/styles wherever Figma supports binding.
- Document intentional exceptions, including foundation variable raw values and any Figma API limitations.
- Verify all interactive component families include required states.
- Output: final Phase 3 audit report and handoff gate for Phase 4.
- Completed on 2026-05-13. Session log: `docs/added/sessions/ch-3.6-proposed-system-audit.md`.
- Phase 4 is unblocked: the Proposed page is now self-contained at the component-instance level and tokenized through proposed variables/styles wherever Figma supports the binding.

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
| Clamp audit deferred to Proposed token work | Needs breakpoint decisions first. Will check slopes during Ch 3.2 typography foundations and Ch 3.5 layout QA. |
| Two Figma pages: as-is + proposed | Page 1 is faithful recreation. Page 2 has fixes, normalized tokens, new features. Avoids dual-token bloat. |
| Replacement tokens for content | Component structure comes first, content decisions (IA, naming) come later. |
| oklch → hex conversion | Figma doesn't support oklch(). Convert during token extraction, keep oklch as documentation source of truth. |
| As-is page uses raw values, proposed page uses variable system | Avoids needing before/after modes in the same token set. |
| Design system book chapters read in Phase 1, not Phase 0 | Avoid context bloat in planning phase. Methodology informs construction, not planning. |
| Page 1 source states only | Ch 2.1 review decided not to add Pressed, Focused, Disabled, Error, or other states unless the HTML/CSS defines or uses them. This applies only to the faithful `As-is` baseline; `Proposed` must define the full interactive state model. |
| Page 1 component sections optimize scanability | 1680px remains the browser measurement reference, but Figma component sections do not need fixed 1680px width. |
| Page 1 components compose from nested instances | Molecules should reuse approved atom/helper instances rather than duplicating internals. |
| Missing lower-level components must be marked | If a molecule/organism needs an atom/helper that does not exist, mark the missing dependency in Figma and docs instead of silently redrawing it inline. |
| One-sided CSS borders use individual Figma strokes | Avoid fake `_border-bottom` rectangles; use per-side stroke weights and nested instance stroke overrides. |
| Typography samples map styles to source selectors | The typography documentation section is outside atoms and labels every local `as-is/` text style with CSS selector coverage. |
| Rich text can legitimately appear as mixed text styles | Ch 2.2 uses range-level styling for source `em`, `strong`, `.figure`, and `.num` semantics. Audit true unstyled text by checking missing `textStyleId`, not every `mixed` node. |
| Variant-specific specimens may be unbound | Figma shared text-property references collapsed source-backed variants in Ch 2.2. For documentation variants, accurate source examples can take priority over a single shared text property, but the tradeoff must be logged. |
| Direct Figma edits must relink paint styles | Ch 2.2 direct edits briefly reintroduced exact-token detached fills/strokes. After Figma script edits, rerun a paint audit and relink local `as-is/` paint styles. |

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

**Status:** Will normalize through Ch 3.2 token architecture and validate through Ch 3.3-Ch 3.5 component retokenization.

## Findings: UX writing issues

- Coach: "3 notes ready" — ready implies a queue, but these are actionable nudges
- Coach types: "alert / sweep / heads-up" — not self-explanatory without domain knowledge
- "Dining nudge" — unclear what distinguishes a heads-up from an alert from a nudge semantically
- Sidebar hint "—" for Reports — displaying absence as a value when zero reports could simply not show a badge
- Version "v 2.1" in sidebar brand — unnecessary for end users

**Status:** Will address in Ch 4.3 (fix what's broken) where appropriate, after the Proposed system foundation passes Ch 3.6.

## Findings: typography readability concern

The serif font stack (Fraunces display + Newsreader body) creates density that is hard to read at both 1080p and 2K. Small sizes (9.5px labels, 10px eyebrows, 10.5px metadata) combine with high letter-spacing and all-small-caps to reduce legibility. The clamp() ranges may produce steep interpolation between breakpoints.

**Status:** Clamp slope audit belongs to Ch 3.2 typography foundations and Ch 3.5 layout QA. May propose piecewise clamps if slopes are too aggressive. Minimum body size of 13px per DESIGN.md is respected but edge-case labels go well below.

---

## DESIGN.md guardrails

Full guardrails are in `docs/added/guardrails.md` — that is the canonical reference. All design decisions must be checked against the complete guardrails file, not a partial list. Covers: typography rules, color discipline, layout constraints, density principles, motion restrictions, accessibility requirements, and the explicit anti-patterns table.
