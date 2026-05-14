# Ch 2.3 — Organisms (Page 1 as-is)

Date: 2026-05-13

Status: Closed. Phase 2 Page 1 as-is baseline complete.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger
Page: `As-is`
Reference viewport: 1680px browser width
Source artifact: `the-ledger.html`

## Kickoff audit

### Component inventory

| Catalog ID | Component | Source selector(s) | Build? | Notes |
|---|---|---|---|---|
| O1 | Sidebar | `.sidebar`, `.sidebar-scroll`, `.sidebar-section-label`, `.sidebar-nav`, `.accounts-list`, `.sidebar-foot` | yes | Compose from approved `sidebar-brand`, `sidebar-nav-item`, `account-list-item`, and `sidebar-foot`; section labels and the single `+` account link are organism-owned source structure. |
| O2 | Topbar | `.topbar`, `.topbar-title`, `.section-mark`, `.topbar-search`, `.topbar-actions` | yes | Compose from `section-num / section-mark`, approved `topbar-search`, `btn-icon`, and `btn`; title/subtitle/action grouping is organism-owned. |
| O3 | Status bar | `.statusbar`, `.sync-pill`, `.ticker`, `.shortcuts`, `kbd` | yes | Compose from `sync-dot` and `kbd`; ticker text and shortcut group are source-backed organism-owned structure. |
| O4 | Hero section | `.hero`, `.hero-num-wrap`, `.hero-side`, `.kpi-list`, `.hero-actions` | yes | Compose from `hero-kicker`, `marginalia`, `hero-delta`, `hero-split-cell`, `kpi-row`, and `btn`; hero number and side panel wrapper are organism-owned. |
| O5 | Middle section: Cashflow + Distribution | `.middle`, `.cashflow`, `.cashflow svg`, `.legend`, `.distribution` | yes | Compose from `section-head`, `legend`, and `distribution-row`; the cashflow SVG chart is a source-specific organism-owned data visualization, not a lower-level catalog component. |
| O6 | Double section: Ledger + Budgets | `.double`, `.ledger-table`, `.ledger-foot`, `.fiscal-list` | yes | Compose from `section-head`, `ledger-table-row`, `budget-bar-row`, and `link-action`; table heading and ledger foot are organism-owned source structure. |
| O7 | Goals section | `.goals`, `.goals-grid` | yes | Compose from `section-head` and `goal-card`; no additional source states at organism level. |
| O8 | Coach section | `.coach`, `.coach-grid` | yes | Compose from `section-head` and `coach-note`; note kind remains a molecule variant. |
| O9 | Notices section | `.alerts`, `.alerts ul` | yes | Compose from `section-head` and `notice-row`; notice kind remains a molecule variant. |

### Related token values checked

- Layout dimensions: `--sidebar-w` 248px, `--topbar-h` 56px, `--statusbar-h` 38px.
- Reference viewport math at 1680px: body grid is 248px sidebar + 1432px right column; topbar/statusbar horizontal padding clamp resolves to 40px; main padding resolves to 36px top, 40px sides, 44px bottom.
- Content widths at 1680px: main content width is 1352px; hero columns resolve to about 751px / 537px with 64px gap; middle columns resolve to about 782px / 522px with 48px gap; double columns resolve to about 772px / 532px with 48px gap.
- Colors: `--paper` #f2eade, `--paper-soft` #f7f1e8, `--paper-deep` #eae0d2, `--paper-sunk` #e1d6c7, `--ink` #190f0a, `--ink-soft` #433b37, `--ink-mute` #746d68, `--ink-faint` #9d9792, `--rule` #c6bcaf, `--rule-soft` #d8d0c4, `--red` #7f2117, `--blue` #17495a, `--gold` #a17833, `--olive` #50663a, `--red-wash` #f4dbd4, `--blue-wash` #d7e8ee.
- Structural spacing: hero gap 64px, middle/double gap 48px, section bottom padding and margin 38px, section head margin-bottom 16px and padding-bottom 9px, hero split margin-top 26px, ledger foot margin-top 12px, legend margin-top 14px.
- Borders: sidebar right, topbar bottom, statusbar top, section heads, hero split top, fiscal first, and goals grid top use 1px `--ink`; section separators and standard rows use `--rule` or `--rule-soft`; coach notes use 2px colored top borders.
- Typography: reuse existing local `as-is/` styles where present. Organism-owned styles checked for topbar subline, hero number/cents, panel head, SVG chart axis/annotation, table header, ledger foot, and statusbar ticker.

### Lower-level dependency audit

| Parent component | Required lower-level component | Exists in Figma? | Action |
|---|---:|---:|---|
| Sidebar | `sidebar-brand` | yes | Use nested instance. |
| Sidebar | `sidebar-nav-item` | yes | Use nested instances for all seven source nav rows; keep active state only on Today. |
| Sidebar | `account-list-item` | yes | Use nested instances for all four source accounts. |
| Sidebar | `sidebar-foot` | yes | Use nested instance. |
| Topbar | `section-num / section-mark` | yes | Use `Class=section-mark` instance. |
| Topbar | `topbar-search` | yes | Use approved Ch 2.1 input-field exception. |
| Topbar | `btn-icon` | yes | Use notification button instance. |
| Topbar | `btn` | yes | Use primary default `+ New` instance. |
| Status bar | `sync-dot` | yes | Use inside `.sync-pill`. |
| Status bar | `kbd` | yes | Use `Context=statusbar` instances for shortcuts. |
| Hero section | `hero-kicker`, `marginalia`, `hero-delta`, `hero-split-cell` | yes | Use nested instances. |
| Hero section | `kpi-row` | yes | Use nested instances for four KPI rows. |
| Hero section | `btn` | yes | Use small secondary buttons for hero actions. |
| Cashflow + Distribution | `section-head` | yes | Use `TabsAction` and `MetaAction` variants. |
| Cashflow + Distribution | `legend` | yes | Use nested instance. |
| Cashflow + Distribution | `distribution-row` | yes | Use nested instances for five rows plus total. |
| Cashflow + Distribution | `.cashflow svg` | n/a | Organism-owned static SVG reconstruction; not cataloged as lower-level reusable component. |
| Ledger + Budgets | `section-head` | yes | Use `ChipsAction` and `MetaAction` variants. |
| Ledger + Budgets | `ledger-table-row` | yes | Use nested row instances. |
| Ledger + Budgets | `budget-bar-row` | yes | Use nested row instances. |
| Ledger + Budgets | `link-action` | yes | Use for ledger foot import action. |
| Goals | `section-head` | yes | Use `AddAction` variant. |
| Goals | `goal-card` | yes | Use nested instances for the three source cards. |
| Coach | `section-head` | yes | Use `MetaAction` variant. |
| Coach | `coach-note` | yes | Use nested instances for alert/action/heads-up. |
| Notices | `section-head` | yes | Use `AddAction`-style visible action composition with before hidden, matching the source `Mark all read` link. |
| Notices | `notice-row` | yes | Use nested instances for the four source notices. |
| Full dashboard mockup | O1-O9 organisms | after build | Compose from organism instances. |

### Owned state audit

| Component | Source state(s) | Parent-owned change | Nested child state avoided |
|---|---|---|---|
| Sidebar | Sticky, active nav row, nav/account hover states | Sticky/full-height structure and scroll region only. | Nav active/hover and account hover stay in molecules; no sidebar x nav x account state matrix. |
| Topbar | Sticky, search focus-within, button hover | Sticky bar layout and translucent paper background. | Search focus and button/icon hover stay in lower-level components. |
| Status bar | Sticky, sync-dot pulse | Three-zone layout and ticker content. | `sync-dot` owns indicator styling; no parent animation variants. |
| Hero section | None at parent level | Two-column hero layout, hero number, side panel grouping. | KPI delta, buttons, split cells, marginalia, and delta styling stay in molecules/atoms. |
| Cashflow + Distribution | Cashflow tab acknowledgement via JS, distribution row hover | Two-column section layout and static chart composition. | Tabs and row hover remain nested component states. |
| Ledger + Budgets | Transaction filter via JS, ledger row hover/new, budget row hover/status | Two-column section layout, table header, ledger foot, and row stacking. | Chips, row hover/new, budget status, and reveal links remain lower-level states. |
| Goals | Goal-card hover | Grid and top border only. | Card hover and pace variants stay in `goal-card`. |
| Coach | Note kind by position | Three-column grid only. | `coach-note` kind and nested button states stay lower-level. |
| Notices | Notice kind variants | List wrapper and top border only. | `notice-row` kind and action hover stay lower-level. |
| Full dashboard mockup | Sticky topbar/sidebar/statusbar represented statically | 1680px source layout composition. | Does not multiply child states. |

### Missing lower-level dependencies

- None at kickoff. Source-specific one-offs (`.cashflow svg`, `.sidebar-section-label`, `.topbar-title`, `.statusbar .ticker`, `.ledger-table thead`, `.ledger-foot`) are organism-owned structures from O1-O9, not missing lower-level catalog components.

## Figma work completed

- Created the `Organisms — As-is` Figma section on page `As-is` and built the Page 1 source-backed organism components:
  - `sidebar`
  - `topbar`
  - `statusbar`
  - `hero`
  - `middle`
  - `double`
  - `goals`
  - `coach`
  - `alerts`
- Created the full source-backed dashboard frame `full-dashboard-mockup` at the 1680px reference width.
- Composed the full mockup from organism instances rather than copied inline section groups: `sidebar`, `topbar`, `hero`, `middle`, `double`, `goals`, `coach`, `alerts`, and `statusbar`.
- Added organism-owned local text styles needed by the source layout:
  - `as-is/sidebar-label-add`
  - `as-is/topbar-sub`
  - `as-is/topbar-sub-strong`
  - `as-is/panel-title`
  - `as-is/panel-title-em`
  - `as-is/panel-meta`
  - `as-is/hero-cents`
  - `as-is/doc-label`
  - `as-is/chart-axis`
  - `as-is/chart-annotation`
  - `as-is/table-head`
  - `as-is/ledger-foot`
- Fixed one lower-level defect exposed by organism construction: `distribution-row` did not represent the source `.name .note` text. The molecule now has a `Note` text property and a nested note text node styled with the approved `as-is/distribution-note` style.
- Corrected the notices organism after screenshot review so each notice row uses the exact source-backed label/body/action content, including the `AppleCare+` due row and intentional rich text ranges.

## Decisions and exceptions

- The `.cashflow svg` chart is source-specific organism-owned content, not a missing lower-level component. It is reconstructed in `middle` with static Figma vector primitives, axis labels, legend positioning, and the `Q1 bonus deposited` annotation from the source.
- The full dashboard mockup is a static Figma frame that represents the browser's 1680px layout. Source sticky behavior for the sidebar, topbar, and statusbar is represented by their static positions in the frame; it is not modeled as an interactive scroll prototype.
- The sidebar instance in `full-dashboard-mockup` is resized to the static full-frame height so the page review screenshot has the same persistent left rail visual as the browser. The source behavior remains `height: 100vh` plus sticky positioning.
- Topbar background opacity remains an intentional source-backed exception for `color-mix(in srgb, var(--paper) 96%, white)`.
- Sync pulse glow opacity remains an intentional source-backed exception on `sync-dot`; it is not an unlinked token error.
- `mixed` text styles remain expected for intentional rich text ranges, including coach body emphasis, hero/trend copy, notice body copy, and similar source ranges.
- Variant-specific specimen copy was set by direct instance text overrides where safe. No shared text property was rebound in a way that collapses separate source examples.
- Notices uses the existing `section-head` AddAction-style composition with the pre-title action hidden and the after-title action visible to match the source `Mark all read` link without adding a new lower-level heading variant.

## Validation

- [x] Component inventory checked against `02-component-catalog.md`.
- [x] Lower-level dependency audit completed.
- [x] Missing lower-level dependencies audited before Figma build.
- [x] Nested instance inspection confirms parent components use approved lower-level instances.
- [x] State audit confirms no parent x child variant explosion.
- [x] One-sided borders use individual stroke weights; no fake `_border-bottom` rectangle helpers.
- [x] Text audit distinguishes true unstyled text nodes from intentional rich text `mixed` nodes.
- [x] Paint audit confirms exact-token fills/strokes are linked to local paint styles after scripted edits.
- [x] Screenshot review shows no clipping, overlap, or unreadable labels.
- [x] Session log includes decisions, exceptions, and handoff notes for the next chapter.

### Nested instance audit

Approved lower-level components are nested in the organism sources. The full mockup then nests organism instances.

| Organism | Nested approved components |
|---|---|
| `sidebar` | `sidebar-brand`, `sidebar-nav-item`, `sidebar-nav-hint`, `pill`, `account-list-item`, `dot`, `sidebar-foot`, `settings-icon-button` |
| `topbar` | `section-num / section-mark`, `topbar-search`, `kbd`, `btn-icon`, `notification-badge`, `btn` |
| `statusbar` | `sync-dot`, `kbd` |
| `hero` | `hero-kicker`, `marginalia`, `hero-delta`, `trend-indicator`, `hero-split-cell`, `kpi-row`, `btn` |
| `middle` | `section-head`, `section-num / section-mark`, `tabs`, `_tabs__label`, `link-action`, `legend`, `swatch`, `distribution-row` |
| `double` | `section-head`, `section-num / section-mark`, `chips`, `_chips__label`, `link-action`, `ledger-table-row`, `new-entry-dot`, `budget-bar-row` |
| `goals` | `section-head`, `section-num / section-mark`, `link-action`, `goal-card`, `roman` |
| `coach` | `section-head`, `section-num / section-mark`, `link-action`, `coach-note`, `coach-stat`, `btn` |
| `alerts` | `section-head`, `section-num / section-mark`, `link-action`, `notice-row` |
| `full-dashboard-mockup` | `sidebar`, `topbar`, `hero`, `middle`, `double`, `goals`, `coach`, `alerts`, `statusbar` |

### Initial build typography audit

- Text nodes checked before the post-review correction pass: 880.
- Missing text styles after final fix: 0.
- Intentional `mixed` text style nodes: 50.
- `mixed` nodes are retained where the source uses rich text ranges and are not treated as failures.

### Initial build paint audit

- Exact-token detached fills/strokes after final relink: 0.
- Exact-token fills/strokes relinked during audit: 23.
- Opacity exceptions: 4.
  - `topbar` paper blend at 0.96 opacity.
  - `sync-dot` pulse glow at 0.18 opacity in the source component and dashboard instance.
- Fake `_border-bottom` helpers: 0. The post-review coach top-rule helpers were added later and are documented as a Figma per-side stroke-color workaround below.

### Screenshot validation

- O1-O4 partial organism screenshot: `/private/tmp/ch23-o1-o4.png`.
- Full organism section screenshot: `/private/tmp/ch23-organisms.png`.
- Full dashboard screenshot before final rich-text restoration: `/private/tmp/ch23-full-mockup.png`.
- Final full dashboard screenshot after notice rich-text restoration: `/private/tmp/ch23-full-mockup-post-rich.png`.
- Final screenshot reviewed against the 1680px source layout. The page composition, notices content, budget rows, chart annotation, full-width section rules, and persistent left/status rails are readable and source-aligned.

## Post-review correction pass

Date: 2026-05-13

Applied the deep-audit fixes from `docs/added/review/ch-2.3-organism-mockup-deep-audit.md` in Figma.

- Corrected the full mockup background model: `full-dashboard-mockup` keeps `as-is/paper-deep`; the `right` and `main` wrappers are transparent, matching source `.main` over the document background.
- Added `as-is/paper-deep` fills to the four standalone comparison frames so transparent Figma content renders in the same background context as the full dashboard.
- Reserved the sidebar's 1px right border at the source component level with right layout padding, so child rows fill the 247px content area instead of running under the border.
- Restored statusbar ticker rich text and exact inline emphasis for strong display values and muted italic ranges.
- Rebuilt the hero vertical model around measured source positions: `hero` `308.8px`, `hero-num-wrap` y `26`, `hero-delta` y `139.75`, `hero-split` y `181.75`, and split row height `86px`.
- Corrected row/card heights surfaced by the dashboard audit:
  - `distribution-row`: `54.5px`; total row: `39px`.
  - `ledger-table-row`: source instances use measured `59.44px` or `41.22px` row heights depending on content.
  - `budget-bar-row`: `73px`.
  - `goal-card`: `213.23px`.
  - `coach-note`: `307.17px`.
  - `notice-row`: source rows use `55px`, `43.84px`, `43.84px`, and `45px`.
- Recut the main organism stack to the browser source metrics:
  - `main`: `1432 x 2551.39`, padding `36 / 40 / 44`.
  - `hero`: y `36`, h `308.8`.
  - `middle`: y `382.8`, h `423.5`.
  - `double`: y `844.3`, h `504`.
  - `goals`: y `1386.3`, h `326.23`.
  - `coach`: y `1750.53`, h `419.17`.
  - `alerts`: y `2207.7`, h `299.69`.
- Fixed coach note borders by keeping the neutral right dividers on the card node and adding a source-backed 2px top-rule helper for the red/blue/gold accents. This is a documented Figma limitation workaround: one node cannot have a colored top stroke and a different colored right stroke.
- Rechecked `kpi-row` after the fix pass. No new edit was needed: the current Ch 2.2 molecule already matches the source row model with inline microcopy, 11px vertical padding, 14px column gap, and Fraunces 22px values.
- Relinked exact-token paints after the scripted edits. Final detached exact-token fill/stroke count: `0`.

### Post-fix validation artifacts

- Full dashboard after fix: `output/playwright/ch-2.3-organism-audit/figma-full-dashboard-after-fix-211-865.png`.
- Topbar comparison after fix: `output/playwright/ch-2.3-organism-audit/figma-compare-topbar-after-fix-218-5036.png`.
- Bottom/statusbar comparison after fix: `output/playwright/ch-2.3-organism-audit/figma-compare-bottom-bar-after-fix-218-5037.png`.
- Sidebar comparison after fix: `output/playwright/ch-2.3-organism-audit/figma-compare-sidebar-after-fix-218-5043.png`.
- Main comparison after fix: `output/playwright/ch-2.3-organism-audit/figma-compare-main-after-fix-218-5041.png`.

### Post-fix audit result

- Dashboard frame: `1680 x 2645.39`.
- Main frame: `1432 x 2551.39`.
- Statusbar: y `2607.39`, h `38`.
- Final typography audit on `full-dashboard-mockup`: `434` text nodes, `28` intentional `mixed` rich-text nodes.
- Final paint audit on the organism section and full dashboard: `0` detached exact-token paints.
- Remaining opacity exceptions are source-backed: topbar paper blend at `#f2eade@0.96` and sync pulse glow at `#50663a@0.18`, duplicated where the component appears.

### Remaining review notes

- The full-dashboard sidebar remains a static full-height representation of the browser's sticky rail. In the browser, `.sidebar` is viewport-height and sticky; in the full-page Figma mockup it is stretched so the left rail persists for the full dashboard screenshot. If a strict viewport-only sidebar specimen is needed, duplicate the sidebar into a separate `248 x viewport-height` review frame rather than changing `full-dashboard-mockup`.
- The topbar right-side track drift remains below 2px versus the measured browser source and was left as acceptable.
- Browser text rendering and Figma text rendering are not pixel-identical. Remaining small optical differences in Fraunces/Newsreader antialiasing should not be treated as layout defects.

## Handoff notes

- Figma section id: `207:196` (`Organisms — As-is`).
- Full dashboard frame id: `211:865` (`full-dashboard-mockup`).
- No missing lower-level dependencies remain for Ch 2.3.
- Ch 2.3 changed the Ch 2.2 `distribution-row` molecule to add the source-backed `Note` text property. Treat this as part of the latest molecule truth for future chapters.
- Ch 2.3 post-review corrections changed several Ch 2.2 molecule source sizes (`distribution-row`, `ledger-table-row`, `budget-bar-row`, `goal-card`, `coach-note`, `notice-row`) because the organism-level audit exposed real source fidelity defects.
- Coach note colored top borders use `_coach-note__top-rule` helper rectangles in the molecule sources. This is intentional and should not be removed during cleanup unless Figma gains per-side stroke paints.
- Carry forward the accepted Ch 2.2 caveats: `mixed` text styles are intentional for rich text ranges, and direct text overrides are safer than rebinding shared specimen text when each variant needs distinct source content.
- Carry forward Ch 2.3 opacity exceptions for the topbar paper blend and sync pulse glow.
- The full mockup is ready for downstream review as a source-backed static dashboard composition at the 1680px browser reference width.

## Chapter closeout

Closed on 2026-05-13 after user review acceptance.

### What was completed

- Page 1 `As-is` now contains a source-backed atomic stack through organisms:
  - Ch 2.1 atoms: approved.
  - Ch 2.2 molecules: corrected after review and used as the latest lower-level source.
  - Ch 2.3 organisms: built from approved atoms/molecules and corrected after organism/mockup audit.
- Built the O1-O9 organism sources:
  - O1 `sidebar`
  - O2 `topbar`
  - O3 `statusbar`
  - O4 `hero`
  - O5 `middle` / Cashflow + Distribution
  - O6 `double` / Ledger + Budgets
  - O7 `goals`
  - O8 `coach`
  - O9 `alerts`
- Built `full-dashboard-mockup` from organism instances at the 1680px browser reference width.
- Ran the kickoff audit before building:
  - O1-O9 catalog inventory.
  - exact token checks from `01-token-extraction.md`.
  - lower-level dependency audit.
  - approved atom/molecule/helper inventory.
  - missing dependency audit.
  - organism-owned state audit.
- Ran a deep organism/mockup review after user screenshot feedback and applied the fix pass.
- Saved source and Figma comparison screenshots in `output/playwright/ch-2.3-organism-audit/`.

### Fixes applied during the final pass

- Corrected dashboard background context: `full-dashboard-mockup` owns `as-is/paper-deep`; `right` and `main` are transparent.
- Added `as-is/paper-deep` fills to the four standalone comparison frames so transparent Figma content renders against the correct source background.
- Reserved the sidebar right border pixel once at the sidebar source component level.
- Restored statusbar rich-text semantics for strong display values and muted italic phrases.
- Rebuilt hero vertical spacing from measured source positions.
- Corrected row/card heights for distribution, ledger, budget, goal, coach, and notice components.
- Recut the full main organism stack to the measured source section y/heights.
- Fixed coach-note borders with neutral right dividers and source-backed colored top-rule helpers.
- Revalidated `kpi-row`; no additional fix was needed after Ch 2.2 corrections.
- Reran typography and paint audits after scripted Figma edits; exact-token detached paint count finished at `0`.

### Final validation snapshot

- `full-dashboard-mockup`: `1680 x 2645.39`.
- `main`: `1432 x 2551.39`, padding `36px 40px 44px`.
- `statusbar`: y `2607.39`, h `38`.
- Final full-mockup typography audit: `434` text nodes, `28` intentional `mixed` rich-text nodes.
- Final organism/full-mockup paint audit: `0` detached exact-token fills/strokes.
- Remaining source-backed opacity exceptions:
  - `topbar` paper blend: `#f2eade@0.96`.
  - `sync-dot` pulse glow: `#50663a@0.18`.

### Decisions to carry into Phase 3

- Page 1 `As-is` is now the baseline. Phase 3 should build the `Proposed` page and variable system without normalizing Page 1.
- Do not reinterpret Page 1 source values during Phase 3. Use the as-is values as raw evidence, then make proposed-page decisions explicitly.
- Ch 2.3 corrected some Ch 2.2 molecules because the organism audit exposed real source-fidelity defects. Treat this session log as the current truth for those molecule dimensions.
- `mixed` text styles remain expected for source rich-text ranges.
- Direct text overrides are acceptable where Figma text-property rebinding would collapse source-backed specimen copy.
- The coach-note top-rule helpers are intentional. They represent CSS per-side border colors that Figma cannot model with one stroke paint.
- The full-dashboard sidebar is a static full-page review representation of sticky browser behavior. Do not use that stretch as a proposed responsive rule.

### Phase 3 readiness

Phase 3 can start from `docs/added/context/ch-3.1-token-normalization-kickoff-prompt.md`.

Before creating proposed-page variables, Ch 3.1 should revalidate `docs/added/reference/03-design-system-principles.md`. That principles document was written before the Page 1 UI work and should be checked against the source DSB chapters in `docs/added/dsb/` plus the completed Ch 2.1-Ch 2.3 implementation. Patch the principles doc if it is stale, too generic, or too large for this project.

Create the `Proposed` page by duplicating the completed `As-is` page, then renaming the duplicate. Page 1 `As-is` and all grouped `as-is/` color/text styles are source evidence and should remain intact. Proposed color styles and text styles should use separate `proposed/` groups, especially for composite text-style design tokens.

Phase 3 should also explicitly consider a vertical rhythm model for the dashboard. Use body text line-height as the starting point, then check proposed text styles, row heights, section spacing, and dense list/table surfaces against that rhythm. Keep practical exceptions where fixed values work better.

Optional Phase 3 explorations:

- Minimal dark-mode token path, possibly focused first on top navigation/status surfaces rather than a full dark dashboard.
- Compact/default/relaxed density modes as a future extension. Treat this as optional and keep the default proposed foundation as the main deliverable.

The next chapter should read:

1. `docs/added/00-master-plan.md`
2. `docs/added/_index.md`
3. `docs/added/guardrails.md`
4. `docs/added/reference/01-token-extraction.md`
5. `docs/added/reference/02-component-catalog.md`
6. `docs/added/reference/03-design-system-principles.md`
7. `docs/added/dsb/Chapter_04_Accessibility_v3-1.md`
8. `docs/added/dsb/Chapter_05_Responsiveness_v3-3.md`
9. `docs/added/dsb/Chapter_06_Component_Anatomy_v3-2.md`
10. `docs/added/dsb/Chapter_07_Design_Tokens_v3-2.md`
11. `docs/added/dsb/Chapter_10_Typography_v3-3.md`
12. `docs/added/sessions/ch-2.3-organisms.md`
13. `docs/added/review/ch-2.3-organism-mockup-deep-audit.md`

Start Phase 3 with token normalization and `Proposed` page setup. Do not start Quick-create or Search work until the normalized variable foundation exists.
