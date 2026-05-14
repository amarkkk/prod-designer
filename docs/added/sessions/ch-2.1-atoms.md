# Ch 2.1 — Atoms (Page 1 as-is)

Date: 2026-05-12

Status: Approved for handoff. Ch 2.1 is closed and Ch 2.2 molecules may begin in a new session.

## Scope

Document and close the Page 1 as-is atom build in the working Figma file:

- Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger
- Page: `As-is`
- Section: `Atoms — As-is`
- Reference width: 1680px

## Page 1 review rule overrides

Added these overrides to `docs/added/review/figma-component-checklist.md`:

- Use a 1680px desktop browser reference for Page 1 as-is source measurements, but organize Figma component sections for scanability rather than forcing 1680px section width.
- Translate only states that exist in `the-ledger.html` and CSS. Do not invent Pressed, Focused, Disabled, Error, or proposed-page accessibility states.
- Keep code-derived layer names. Use `_` prefixed helper slots only where Figma needs a wrapper.
- Place smallest helper components above the parent components that consume them.
- Use nested component instances for reusable parts instead of duplicating vector/text internals inside parent components.
- Keep typography samples outside the atoms section, cover every real local `as-is/` text style, and label samples with their source CSS selectors.
- Model one-sided CSS borders with Figma individual stroke weights, not extra underline rectangles.
- Keep Page 1 faithful to raw HTML values; no normalization or proposed-page fixes.

## Decisions locked for later chapters

- Page 1 remains an as-is reconstruction. Keep source quirks and raw CSS values; fixes and normalization belong on Page 2.
- The 1680px browser viewport is the source measurement reference. Figma component sections should be organized for scanability, not forced to 1680px width.
- Build only source-backed states. If CSS/HTML does not define or use a state, do not add it for Page 1.
- Keep source/code-derived component and layer names where the HTML supplies meaningful names. Use `_` only for helper components or wrapper slots Figma needs.
- Compose upward with nested component instances. Molecules should use atom/helper instances rather than duplicated internals wherever the source structure permits.
- Higher-level components must use approved lower-level components. If a lower-level dependency is missing, mark it explicitly in Figma and the session log instead of silently redrawing it inline.
- Put the smallest organizational level above composed parents on the canvas.
- Component set presentation uses the local `Component border` style, visible wrapper padding where useful, clipping enabled, and readable variant labels.
- CSS one-sided borders map to Figma individual stroke weights on the relevant frame/component. Do not use decorative rectangle layers for `border-bottom` or similar borders.
- Typography samples are documentation, not atoms. Keep them outside the atoms section and label each local text style with source CSS selector(s).
- `topbar-search` is cataloged as M5, but was included in Ch 2.1 as the input-field exception. Treat it as already reviewed; do not rebuild it in Ch 2.2 unless molecule context requires a composed instance.

## Figma work completed

Updated local `as-is/` styles:

- 17 paint styles, including all used HTML colors plus browser focus-ring blue retained as a style.
- 29 text styles covering the existing as-is inventory, atom-specific styles, and the missing `.section-sub` treatment.

Updated existing components:

- `btn` component set now has only `State=Enabled` and `State=Hovered`.
- Removed previous invented `State=Focused` variants from `btn`, per Page 1 override.
- Kept existing `Label`, `showPlus`, and `showCaret` properties.
- Added `btn examples — code use` instances showing `+ New ▾` and `+ Pay bill`.

Added atom components/component sets:

- `Icon` with `name=bell`, `name=search`, `name=settings`, using inline SVG paths from the HTML.
- `btn-icon` with `State=Enabled/Hovered`, using nested `Icon` and `notification-badge` instances.
- `link-action` with `Style=Default/Add` and `State=Enabled/Hovered`.
- `_tabs__label`, `tabs`, `_chips__label`, `chips`. Parent `tabs` and `chips` variants use the helper label components as nested instances.
- `pill`, `kbd`, `dot`, `hairline`.
- `trend-indicator`, `sync-dot`, `new-entry-dot`, `notification-badge`.
- `swatch`, `section-num / section-mark`, `roman`.
- `topbar-search` with `State=Enabled/Focused` because CSS defines `:focus-within`. This is cataloged as M5, but included in the atom review as the current input-field exception; it uses nested `Icon` and `kbd` instances.

Presentation and documentation updates:

- Applied the local `Component border` style to component set wrappers, with 20px inset where wrappers are visible.
- Kept component set clipping enabled and expanded wrapper padding/spacing so variants are not clipped.
- Added readable component and variant labels near the component sets.
- Replaced fake `_border-bottom` rectangles in `link-action` and `_chips__label` with actual bottom strokes on the component roots.
- Propagated nested `tabs` instance stroke overrides across all variants so adjacent tab labels do not create doubled internal borders.
- Reorganized `Atoms — As-is` as a Figma section with helper/smallest components above composed parent sets.
- Moved typography samples to a separate `Typography Samples — As-is` section.
- Rebuilt typography samples as a selector-labeled inventory with one row for each of the 29 local `as-is/` text styles.
- Confirmed the dashed `swatch` spend variant comes directly from `.legend .swatch.spend { border-top: 1.4px dashed var(--red); }`.

Inventory check against `reference/02-component-catalog.md`:

- A1 `btn`: covered.
- A2 `btn-icon`: covered.
- A3 `link-action`: covered.
- A4 `tabs`: covered, with `_tabs__label` helper.
- A5 `chips`: covered, with `_chips__label` helper.
- A6 `pill`: covered.
- A7 `kbd`: covered for topbar and statusbar contexts.
- A8 `dot`: covered.
- A9 hairline/rule: covered.
- A10 status indicators: covered (`trend-indicator`, `sync-dot`, `new-entry-dot`, `notification-badge`).
- A11 `swatch`: covered.
- A12 `section-num` / `section-mark`: covered as `section-num / section-mark` with `Class=section-num` and `Class=section-mark` variants.
- A13 `roman`: covered.

Browser measurements checked during feedback pass:

- `.topbar-search`: `360x43`.
- `.topbar-search kbd`: approximately `30x27`.
- `.topbar-search svg`: `13x13`.
- `.hero-delta .arrow`: `14x14`, used for `trend-indicator`.

## Icon decision

Recreating the HTML icons was not costly in this case. The bell, search, and settings icons are simple inline SVGs, so they were translated directly into Figma from the source paths. No external icon library or manual redrawing workaround was needed.

## Validation

- Figma metadata confirms the atom/helper/component roots in `Atoms — As-is`.
- Nested-instance inspection confirms `btn-icon`, `tabs`, `chips`, and `topbar-search` are composed from helper atom instances rather than duplicated internals.
- Border inspection confirms `link-action` and `_chips__label` have no `_border-bottom` rectangle children and use bottom-only strokes.
- Border inspection confirms every `tabs` variant uses nested `_tabs__label` instance stroke overrides of `[0, 0, 0, 1]` for right-side strokes, matching the chosen no-double-border pattern without detaching.
- `btn` state options are now only `Enabled` and `Hovered`.
- Screenshot review showed no obvious overlap or clipping in the atom section after label and wrapper-spacing polish.
- Typography section screenshot confirms all 29 local `as-is/` text style samples are visible outside the atoms section with source selector labels.

## Handoff to Ch 2.2

Start Ch 2.2 from `docs/added/reference/02-component-catalog.md` under **Molecules**. Build the molecule section on Page 1 `As-is`, using the approved atoms as nested instances wherever applicable.

Before building, read `docs/added/context/component-building.md`. It now contains the agent-facing rules for source-backed states, nesting, and avoiding parent x child state explosion.

Expected molecule scope from the master plan:

- Section header
- KPI row
- Ledger table row
- Budget bar row
- Goal card
- Coach note
- Account list item
- Nav item
- Notice row
- Marginalia
- Legend
- Hero delta
- Hero split cell

Carry forward these checks:

- Verify molecule inventory against the catalog before building.
- Measure in the 1680px browser reference when dimensions are uncertain.
- Use only states that exist in the HTML/CSS.
- Preserve source class names in component naming where possible.
- Use atom/helper instances for icons, tabs/chips labels, kbd, section numerals, swatches, indicators, buttons, and link actions.
- If a required atom/helper is missing during molecule work, either create it first if it belongs in scope or add a visible `Missing lower-level component: <source class/name>` marker in Figma and document it in the Ch 2.2 session log.
- For one-sided borders in molecules and rows, use individual stroke weights.
- Add readable component/variant labels next to molecule sets.

## Closed notes

- Atoms were reviewed and approved by the user on 2026-05-12.
- Component APIs are intentionally minimal for Page 1. Proposed-page accessibility/focus improvements belong on Page 2.
