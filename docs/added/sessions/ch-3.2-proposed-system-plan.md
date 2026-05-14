# Ch 3.2 — Proposed System Plan

Date: 2026-05-13

Status: Complete; corrected after review.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

## Why This Exists

The first Ch 3.1 pass created the `Proposed` page, an initial token scaffold, and a specimen board. Review showed that this is not enough for the proposed-page goal.

The `Proposed` page must become a shippable design-system version of The Ledger:

- Proposed components must be self-contained.
- Nested instances inside Proposed must point to Proposed-local masters, not Page 1 `As-is` masters.
- Components must be fed by design tokens: color, spacing, dimension, rule, radius, focus, and typography.
- Interactive components must define the expected states: enabled/default, hover, focus, pressed, disabled.
- Atoms should be retokenized first, then molecules, then organisms and the full mockup.
- Phase 4 deliverables must wait until the Proposed foundation is reliable.

## Immediate Figma Audit

Read-only audit on 2026-05-13 after the page duplicate:

| Check | Result |
|---|---:|
| Proposed page nodes | 3813 |
| Proposed components / component sets | 133 |
| Proposed instances | 617 |
| Proposed instances pointing to `As-is` masters | 529 |
| Proposed instances pointing to `Proposed` masters | 88 |
| Missing main components | 0 |

Examples:

| Node | Result |
|---|---|
| `249:2925` `dot` instance | Correctly points to Proposed master `249:2587` |
| `249:2557` `notification-badge` instance | Incorrectly points to As-is master `45:17` |

Conclusion: the duplicate page preserved some local component relationships, but many instances still resolve to Page 1 masters. Proposed cannot be treated as self-contained until this is fixed.

## Rename Pass

Applied on `Proposed` only:

- Renamed visible section labels from `Atoms/Molecules/Organisms/Typography Samples — As-is` to `— Proposed`.
- Replaced visible `as-is/` sample labels with `proposed/` labels.
- Corrected token board copy to state that Page 1 `As-is` remains intact and that Proposed retokenization is still pending.

This was only a labeling correction. It did not retokenize components or reconnect all instances.

Validation after rename:

- Remaining visible `As-is` text on `Proposed`: 1 intentional sentence on the token board, stating that Page 1 `As-is` remains intact.
- Remaining instance links to `As-is` masters: 529, unchanged and intentionally deferred to Ch 3.3-Ch 3.5.

## Reference System Notes

The reference file supplied by Mark (`amark.design-2026--32px-vertical-grid-`) uses a mature variable table structure:

- `Color - 1. Foundations` with Light and Dark value modes.
- `Color - 2. Aliases`.
- `Color - 3. Mappings`.
- `Space - 1. Foundations`, `Space - 2. Aliases`, `Space - 3. Mappings`.
- Separate dimension foundations, aliases, and mappings.
- Typography foundations and aliases, with responsive modes.
- Radius and effect collections, including focus variables.

The Ledger does not need the same variable count, but it does need the same architectural separation for Proposed because the next task is a UI fix/redesign system, not a source-faithful copy.

## Token Architecture Direction

### Foundation Layer

Raw proposed values live here. These are the only layer where literal numbers and colors are expected.

Collections to create or replace:

- `Proposed Color - 1. Foundations`
- `Proposed Space - 1. Foundations`
- `Proposed Dimension - 1. Foundations`
- `Proposed Type - 1. Foundations`
- `Proposed Rule - 1. Foundations`
- `Proposed Radius - 1. Foundations`
- `Proposed Focus - 1. Foundations`

Color foundations should include Light and Dark modes. Dark mode should begin as a token capability, not a full dashboard redesign.

### Alias Layer

Semantic choices live here. Designers should usually choose aliases, not foundation values.

Examples:

- `paper/canvas`
- `paper/surface`
- `ink/primary`
- `rule/default`
- `accent/debit`
- `space/horizontal/meso/2`
- `rhythm/vertical/body/1`
- `dimension/shell/topbar-height`
- `focus/ring/width`

### Mapping Layer

Component-level endpoints live here. Component layers should bind to mappings where the component owns the decision.

Examples:

- `button/primary/surface/enabled`
- `button/primary/surface/hover`
- `button/primary/text/disabled`
- `topbar/search/gap`
- `sidebar/nav-item/bar/active`
- `ledger-row/amount/debit/text`
- `budget-bar/track/stroke`

Mapping tokens should be created in the same batch as the components that need them. Do not pre-create every possible component token without a component consumer.

## No Raw Values Rule

For Proposed components:

- Component fills and strokes must bind to proposed color variables or proposed paint styles backed by variables.
- Component text must use proposed text styles and, where Figma supports it, proposed typography variables.
- Auto-layout gaps, padding, widths, heights, rule widths, radii, and focus offsets must bind to proposed variables where the Figma API supports binding.
- Exact values are allowed only inside foundation variables, token documentation, and intentional Figma limitation notes.

## Typography

Guardrails remain binding:

- Fraunces and Newsreader only.
- Body text must not go below 13px.
- Smallcaps are labels, not body.
- Italic must carry meaning.
- Financial numbers require lining tabular numerals.
- Cents remain a relative treatment around `0.42em`.

Composite text styles still matter because they are the designer-facing type tokens. However, the system should also keep type foundation and alias variables for family, size, weight, line height, and letter spacing where Figma supports variable binding.

## Rhythm and Spacing

Use two related scales:

- Horizontal spacing: a compact grid for controls, columns, icon gaps, and inline alignment.
- Vertical rhythm: derived from body line-height multiples and fractions.

The current dashboard has many horizontal rules. Proposed should use more breathable organism spacing and better rule alignment, but this must be reconciled with the guardrails:

- DESIGN.md says section padding is 20px, not 32px.
- Sections are separated by hairlines, not cards.
- Vertical rhythm comes from typography, not arbitrary margins.

Implementation direction: keep section interiors disciplined, then create air through heading rhythm, clearer rule grouping, row-height consistency, and organism-to-organism spacing tokens that are justified by line-height multiples. Any move beyond the 20px section-padding guardrail must be explicitly flagged as a proposed exception before execution.

## Component Reconnection Strategy

Batch order:

1. Build a map from As-is component masters to Proposed component masters by component name, component set name, and variant properties.
2. Reconnect Proposed instances that point to As-is masters to equivalent Proposed masters.
3. Preserve text and visual overrides where possible using `swapComponent`.
4. Audit after each batch: atoms first, then molecules, then organisms.

Acceptance gate for each batch:

- 0 instances in that batch point to Page 1 `As-is` masters.
- 0 layers in that batch use `as-is/` styles.
- 0 unbound exact paints/strokes where proposed variables exist.
- Spacing and dimensions are bound where Figma supports variables.

## State Model

Interactive Proposed components must include:

- Enabled/default
- Hover
- Focus
- Pressed
- Disabled

Additional states are allowed when semantically real:

- Active/current for navigation.
- Selected for tabs/chips.
- Error/warning/success for inputs or validation surfaces.
- Loading/syncing where the source app has live status behavior.

Page 1 omitted states because it was a faithful HTML recreation. Proposed must expand states because it is the ship-ready design system.

## Layout Fixes Deferred to Ch 3.5

Known proposed-system refinements:

- Equalize topbar height and sidebar brand height.
- Equalize statusbar height and sidebar footer height.
- Improve horizontal-rule alignment.
- Make organism spacing a little more generous without drifting into card-based SaaS layout.
- Preserve the ledger/newspaper metaphor: no shadows, no rounded cards, no cool grey dark-mode default.

These are not Phase 4 feature flows. They belong to the Proposed system foundation.

## Phase 3 Batches

| Chapter | Focus | Output |
|---|---|---|
| Ch 3.2 | Token architecture and variable table | Foundation/alias/mapping plan and Figma variables |
| Ch 3.3 | Proposed atoms | Tokenized atom masters, five-state interactive atoms, local instance links |
| Ch 3.4 | Proposed molecules | Molecules using Proposed atoms and mapping tokens |
| Ch 3.5 | Proposed organisms/layout | Tokenized dashboard shell and full mockup |
| Ch 3.6 | Audit/handoff | No As-is links/styles in Proposed; variable/style binding audit |

## Guardrail Reconciliation

No contradiction found with adding full interaction states. The guardrails describe the product direction and implementation expectations; the earlier Page 1 limitation was specific to source-faithful recreation.

Potential tension:

- More air between organisms vs. `section padding 20px, not 32px`.

Resolution:

- Use the 20px rule as default interior padding.
- Add air through rhythm, headings, and rule grouping first.
- If larger spacing is needed, log it as a deliberate Proposed exception and keep it grounded in line-height multiples.

## Figma Implementation

Implemented on 2026-05-13.

The flat Ch 3.1 collections were retained only for compatibility with the initial specimen board, then renamed after review so they are not confused with the active variable table:

- `Legacy Ch 3.1 Proposed / Color (scaffold)`
- `Legacy Ch 3.1 Proposed / Space (scaffold)`
- `Legacy Ch 3.1 Proposed / Type (scaffold)`

Ch 3.2 supersedes them for new work. Ch 3.3 and onward should use the layered collections below.

### Layered Collections Created

| Collection | ID | Modes | Variables |
|---|---|---:|---:|
| `Proposed Color - 1. Foundations` | `VariableCollectionId:272:2488` | Light Value / Dark Value | 16 |
| `Proposed Color - 2. Aliases` | `VariableCollectionId:272:2489` | Foundation Value | 20 |
| `Proposed Color - 3. Mappings` | `VariableCollectionId:272:2490` | Alias Value | 47 |
| `Proposed Space - 1. Foundations` | `VariableCollectionId:272:2491` | Base Value | 36 |
| `Proposed Space - 2. Aliases` | `VariableCollectionId:272:2492` | Foundation Value | 21 |
| `Proposed Space - 3. Mappings` | `VariableCollectionId:272:2493` | Alias Value | 15 |
| `Proposed Dimension - 1. Foundations` | `VariableCollectionId:272:2494` | Desktop / Laptop / Tablet / Mobile | 15 |
| `Proposed Dimension - 2. Aliases` | `VariableCollectionId:272:2495` | Foundation Value | 17 |
| `Proposed Dimension - 3. Mappings` | `VariableCollectionId:272:2496` | Alias Value | 16 |
| `Proposed Type - 1. Foundations` | `VariableCollectionId:272:2497` | Desktop / Laptop / Tablet / Mobile | 40 |
| `Proposed Type - 2. Aliases` | `VariableCollectionId:272:2498` | Foundation Value | 40 |
| `Proposed Rule - 1. Foundations` | `VariableCollectionId:272:2499` | Base Value | 4 |
| `Proposed Rule - 2. Aliases` | `VariableCollectionId:272:2500` | Foundation Value | 4 |
| `Proposed Rule - 3. Mappings` | `VariableCollectionId:272:2501` | Alias Value | 7 |
| `Proposed Radius - 1. Foundations` | `VariableCollectionId:272:2502` | Base Value | 2 |
| `Proposed Radius - 2. Aliases` | `VariableCollectionId:272:2503` | Foundation Value | 3 |
| `Proposed Radius - 3. Mappings` | `VariableCollectionId:272:2504` | Alias Value | 5 |
| `Proposed Focus - 1. Foundations` | `VariableCollectionId:272:2505` | Base Value | 3 |
| `Proposed Focus - 2. Aliases` | `VariableCollectionId:272:2506` | Foundation Value | 3 |
| `Proposed Focus - 3. Mappings` | `VariableCollectionId:272:2507` | Alias Value | 6 |

Total new Ch 3.2 collections: `20`.

Total new Ch 3.2 variables: `320`.

Validation:

- No Ch 3.2 variable uses `ALL_SCOPES`.
- No Ch 3.2 variable has an empty scope list.
- All alias and mapping variables use variable-alias values, not copied literal values.
- Color foundation has Light and Dark modes.
- Type and dimension foundations have Desktop, Laptop, Tablet, and Mobile modes.

### Color Mode Foundation

Light values stay close to source. Dark values are warm paper/ink inversions, not cool slate defaults.

Examples:

| Foundation | Light | Dark | Notes |
|---|---:|---:|---|
| `warm/paper/94` | `#f2eade` | `#241a14` | Primary paper surface |
| `warm/paper/91` | `#eae0d2` | `#1b130f` | Canvas/chrome paper |
| `warm/ink/18` | `#190f0a` | `#f2e6d6` | Primary ink |
| `red/base` | `#7f2117` | `#ec9f93` | Debit / alert |
| `blue/base` | `#17495a` | `#91bed0` | Credit / positive |
| `gold/base` | `#a17833` | `#dcb968` | Warning |
| `olive/base` | `#50663a` | `#aec58b` | Confirmation |

Dark mode remains token capability only. No dark dashboard layout was built.

### Rhythm and Dimension Decisions

- Horizontal spacing aliases use compact micro/meso/macro steps.
- Vertical rhythm aliases use comma names for Figma-safe fractions, following the supplied reference file style: `0,25`, `0,5`, `1,6`, `2,8`, etc.
- `dimension/shell/sidebar-width` uses responsive values: Desktop `256`, Laptop `256`, Tablet `72`, Mobile `0`.
- `dimension/shell/topbar-height` and `dimension/shell/sidebar-brand-height` both resolve to `56`.
- `dimension/shell/statusbar-height` and `dimension/shell/sidebar-footer-height` both resolve to `40`, a normalized two-body-rhythm value that will be checked visually in Ch 3.5.

### Style Rebinding

Existing `proposed/` styles were rebound to the Ch 3.2 token network:

- `18` proposed color styles now bind to `Proposed Color - 2. Aliases`.
- `13` proposed text styles now bind to `Proposed Type - 2. Aliases` for `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, and `letterSpacing`.
- Post-review correction: Figma-bound `letterSpacing` resolves as pixels, not percentages. Label tracking now uses `0.5px` (`label/default`), `0.55px` (`label/small`), and `0.6px` (`label/micro`).

Figma limitation observed:

- `fontStyle` binding did not persist on text styles, despite the API accepting the call. Keep style/italic/regular intent documented in text style descriptions and in implementation notes.
- Ch 3.3 added `proposed/annotation/micro` for Figma catalog labels, backed by annotation type variables. It is not a product UI text role.

### Post-Review Corrections

Applied before and during the opening Ch 3.3 atom work:

- Corrected the `button/primary/*` and `badge/notification/*` mapping variable scopes so surface mappings expose fill scopes and text mappings expose text-fill scopes.
- Added atom-specific color mappings as real consumers appeared: `tabs/surface/selected`, `tabs/text/default`, `tabs/text/selected`, `pill/surface/default`, `pill/text/default`, `icon/stroke/default`, and `icon/stroke/muted`.
- These additions raise the active layered-token count beyond the original Ch 3.2 `320` variables. The `320` count remains the Ch 3.2 implementation baseline; Ch 3.3 logs subsequent atom-specific additions.

### Variable Table Board

Created on `Proposed`:

| Node | ID | Size | Notes |
|---|---|---:|---|
| `Token Architecture — Proposed / Ch 3.2` | `276:5169` | `1800 × 1670` | Collection inventory, layer contract, color modes, rhythm/spacing, and mapping seeds |

Board placement: x `13023`, y `0`, to the right of the Ch 3.1 token board.

Screenshot QA:

- Initial board screenshot showed `Layer Contract` too close to the final collection row.
- Moved the lower board content down by `90px`.
- Final screenshot reviewed locally: `/private/tmp/ch32-token-board-fixed.png`.

Board audit:

| Check | Result |
|---|---:|
| Text nodes | 116 |
| Text nodes missing styles | 0 |
| Non-`proposed/` text styles | 0 |
| Solid fills | 172 |
| Bound solid fills | 172 |
| Solid strokes | 56 |
| Bound solid strokes | 56 |
| Unbound solid paints | 0 |

## Handoff to Ch 3.3

Next chapter: `Ch 3.3: Proposed atoms — tokenized masters and states`.

Start with atoms and reconnect local component relationships before retokenizing molecules:

- Audit atom component sets on `Proposed`.
- Build As-is-master → Proposed-master mapping for atom-level instances.
- Swap Proposed atom instances away from Page 1 masters where equivalent Proposed masters exist.
- Retokenize atom masters through Ch 3.2 mapping tokens.
- Add full interactive states for interactive atoms: enabled/default, hover, focus, pressed, disabled.
- Re-run the instance-link audit after atom work.

Ch 3.3 has started. See `docs/added/sessions/ch-3.3-proposed-atoms.md` for the current atom audit:

- Atom-scope instance links to Page 1 are now `0`.
- Atom text and visible paints are tokenized.
- Spacing, dimension, radius, focus geometry, and full five-state expansion remain open.
