# Ch 2.2 — Molecules (Page 1 as-is)

Date: 2026-05-12

Status: Corrected after third review feedback. Ready for Ch 2.3 handoff.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger
Page: `As-is`
Reference viewport: 1680px browser width
Source artifact: `the-ledger.html`

## Kickoff audit

### Component inventory

| Catalog ID | Component | Source selector(s) | Build? | Notes |
|---|---|---|---|---|
| M1 | Sidebar brand | `.sidebar-brand`, `.sidebar-brand .name`, `.sidebar-brand .vol` | yes | Source-backed sidebar molecule for Ch 2.3 sidebar assembly. |
| M2 | Sidebar nav item | `.sidebar-nav a`, `.num`, `.name`, `.hint`, `.hint.alert`, `.hint.warn`, `.pill`, `[aria-current="page"]`, `:hover` | yes | Parent owns rest/hover/active background, color, and active left border. Hint variants are content/style variants. |
| M3 | Account list item | `.accounts-list li`, `.account-head`, `.dot`, `.account-bal`, `.trend`, `.v.neg`, `:hover` | yes | Uses approved `dot`; parent owns row hover. |
| M4 | Sidebar user/foot | `.sidebar-foot`, `.avatar`, `.user`, `.settings`, `.settings:hover` | yes | Settings icon must use approved `Icon`/`settings`; settings button hover is owned by this molecule. |
| M5 | Topbar search | `.topbar-search`, `:focus-within` | no | Already built, reviewed, and approved in Ch 2.1 as the input-field exception. Use existing `topbar-search` instance later. |
| M6 | Section header | `.section-head`, `.h-title`, `.section-num`, `h3`, `.section-sub`, `.h-controls`, `.h-meta` | yes | Compose from approved `section-num / section-mark`, `tabs`, `chips`, and `link-action` where controls exist. |
| M7 | Hero kicker | `.hero-kicker`, `.glyph`, `.rule`, `.recent` | yes | Source-backed, no states. |
| M8 | Hero delta | `.hero-delta`, `.arrow`, `.val`, `em`, `.pipe` | yes | Use approved `trend-indicator` for arrow where practical; no invented down/neutral states unless documenting source token use only. |
| M9 | KPI row | `.kpi`, `.l`, `.micro`, `.v`, `.d`, `.d.up`, `.d.good`, `.d.bad`, `.d .arrow`, `:last-of-type` | yes | Delta style variants only; last-row border variant is source-backed. |
| M10 | Distribution row | `.distribution li`, `.rank`, `.name`, `.note`, `.amount`, `.pct`, `.bar`, `.total`, `:hover` | yes | Parent owns row hover and total variant. |
| M11 | Ledger table row | `.ledger-table tbody tr`, `.tx-date`, `.tx-desc`, `.tx-tag`, `.row-actions`, `.new`, `.hidden`, `:hover` | yes | Hidden is source-backed for JS filtering but represented as documentation only, not a visible component variant. |
| M12 | Budget bar row | `.fiscal-list li`, `.fiscal-name`, `.pct`, `.fiscal-amount`, `.fiscal-bar`, `.fiscal-bar-fill`, `.fiscal-bar-marker`, `.fiscal-edit`, `:hover` | yes | Parent owns edit-link reveal on hover. Bar state belongs to the row, not parent organisms. |
| M13 | Legend | `.legend`, `.items`, `.swatch.income`, `.swatch.spend`, `.summary` | yes | Compose from approved `swatch`. |
| M14 | Coach stat | `.coach-stat`, `.big`, `.lbl` | yes | Used inside coach note. |
| M15 | Notice row | `.alerts li`, `.alert-kind`, `.alert-body`, `.alert-action`, `.alert-action:hover` | yes | Parent owns kind color variant; action hover is helper-owned. |
| M16 | Marginalia | `.marginalia`, `.marginalia::before`, `.marginalia strong` | yes | `::before` arrow is source-backed inline text treatment. |
| MP1 | Goal card | `.goals-grid > article`, `.goal-eyebrow`, `.goal-name`, `.goal-prog`, `.goal-bar`, `.goal-eta`, `.goal-pace`, `.goal-contribute`, `:hover` | yes | Master-plan Ch 2.2 candidate, cataloged under O7. Parent owns card hover and pace variant. |
| MP2 | Coach note | `.coach-note`, `.coach-kind`, `.coach-headline`, `.coach-body`, `.coach-stat`, `.coach-meta`, `.coach-actions`, `:nth-child(1..3)` | yes | Master-plan Ch 2.2 candidate, cataloged under O8. Compose from `coach-stat` and approved `btn`. |
| MP3 | Hero split cell | `.hero-split > div`, `.l`, `.v`, `.foot`, `.foot em` | yes | Master-plan Ch 2.2 candidate, cataloged under O4. Parent owns no state; border-right is context variant. |

### Related token values checked

- Colors: `--paper` #f2eade, `--paper-soft` #f7f1e8, `--paper-sunk` #e1d6c7, `--ink` #190f0a, `--ink-soft` #433b37, `--ink-mute` #746d68, `--ink-faint` #9d9792, `--rule` #c6bcaf, `--rule-soft` #d8d0c4, `--red` #7f2117, `--blue` #17495a, `--gold` #a17833, `--olive` #50663a.
- Typography: use existing local `as-is/` styles from Ch 2.1 where available; exact source treatments checked for 9.5px, 10px, 10.5px, 11px, 11.5px, 12px, 12.5px, 13px, 13.5px, 14px, 15px, 20px, 22px, 26px, and 28px cases.
- Spacing: source values include 8px nav/account gaps, 9px account item padding, 10px/12px/14px row gaps, 11px KPI padding, 13px budget row padding, 14px hero split padding, 16px/20px/22px larger component padding.
- Borders: one-sided CSS borders must use individual stroke weights. Required one-sided cases include section header bottom, nav active left, account row bottom, KPI row bottom, distribution top/bottom, ledger cell bottom, budget top/bottom, goal card right, coach note top/right, notice row bottom, marginalia left, hero split top/bottom/right.

### Lower-level dependency audit

| Parent component | Required lower-level component | Exists in Figma? | Action |
|---|---|---:|---|
| Sidebar nav item | `pill` | yes | Use for `.hint .pill`. |
| Sidebar nav item | `section-num / section-mark` or `roman` | yes | Source nav uses its own `.num`; reuse approved text style/roman treatment, no detached atom needed. |
| Account list item | `dot` | yes | Use nested `dot` variants. |
| Sidebar user/foot | `Icon` `name=settings` | yes | Use nested instance inside settings button. |
| Topbar search | `topbar-search` | yes | Already approved; do not rebuild. |
| Section header | `section-num / section-mark` | yes | Use nested `Class=section-num`. |
| Section header | `tabs`, `chips`, `link-action` | yes | Use as variants/instances in header controls. |
| Hero kicker | `hairline` | yes | Use a line/hairline for the rule; no state. |
| Hero delta | `trend-indicator` | yes | Use nested `Direction=Up` for source example. |
| KPI row | trend arrow/delta | partial | Create molecule text variant for `.d`; no missing component because source delta is text plus arrow. |
| Distribution row | `roman` | yes | Use approved roman treatment for rank. |
| Ledger table row | `new-entry-dot` | yes | Use for `.new` row marker. |
| Ledger table row | `_row-actions__link` | no | Create Ch 2.2 helper first; do not draw links inline. |
| Budget bar row | `_fiscal-edit__link` | no | Create Ch 2.2 helper first; do not draw link inline. |
| Legend | `swatch` | yes | Use nested income/spend swatches. |
| Notice row | `_alert-action` | no | Create Ch 2.2 helper first; do not draw link inline. |
| Goal card | `roman` | yes | Use for `.goal-eyebrow .roman`. |
| Goal card | `_goal-contribute` | no | Create Ch 2.2 helper first; do not draw link inline. |
| Coach note | `coach-stat` | in scope | Create M14 first, then nest in `coach-note`. |
| Coach note | `btn` | yes | Use approved default/primary small button instances. |
| Hero split cell | none beyond text/borders | yes | Build directly as molecule. |

### Owned state audit

| Component | Source state(s) | Parent-owned change | Nested child state avoided |
|---|---|---|---|
| Sidebar brand | Rest | None | None. |
| Sidebar nav item | Rest, Hover, Active | Background, foreground, active left border, active num color. | Does not multiply by pill state; pill remains child styling. |
| Account list item | Rest, Hover | Row background only. | Dot color and trend direction remain data variants. |
| Sidebar user/foot | Rest, Settings Hover | Settings border/color only. | Does not create full foot hover state. |
| Section header | Control composition variants | Layout/content variations only. | Nested `tabs`, `chips`, and `link-action` retain their own state sets. |
| Hero kicker | Rest | None. | None. |
| Hero delta | Rest | None. | Trend arrow remains child/source text treatment. |
| KPI row | Delta up/good/bad/neutral, last row | Delta color/style and bottom border tier. | No parent hover states. |
| Distribution row | Rest, Hover, Total | Row background; total top border/cursor/no-hover representation. | Rank/name/amount/pct have no independent states. |
| Ledger table row | Rest, Hover, New entry, Hidden | Hover background and row-action visibility; new-entry marker. | Row action link hover stays in `_row-actions__link`; hidden is documented, not drawn as visible UI. |
| Budget bar row | Rest, Hover, default/over/warn, marker optional | Edit action opacity reveal, bar fill color/height, over marker. | Fiscal edit link hover stays in `_fiscal-edit__link`. |
| Legend | Rest | None. | Swatch variants stay in `swatch`. |
| Coach stat | Rest | None. | None. |
| Notice row | Kind info/warn/due/win | Kind color/content only. | Alert action hover stays in `_alert-action`. |
| Marginalia | Rest | None. | None. |
| Goal card | Rest, Hover, pace on-pace/behind | Card background and pace color. | Goal contribute hover stays in `_goal-contribute`. |
| Coach note | Type alert/action/heads-up | Top border and kind color by source nth-child. | `coach-stat` and `btn` states stay in child component sets. |
| Hero split cell | Default, Last cell | Right border/padding context only. | No parent x child states. |

### Missing lower-level dependencies

- `_row-actions__link` for `.row-actions a` — missing at kickoff; in Ch 2.2 scope, create helper before `ledger-table row`.
- `_fiscal-edit__link` for `.fiscal-edit a` — missing at kickoff; in Ch 2.2 scope, create helper before `budget bar row`.
- `_alert-action` for `.alerts .alert-action` — missing at kickoff; in Ch 2.2 scope, create helper before `notice row`.
- `_goal-contribute` for `.goal-contribute` — missing at kickoff; in Ch 2.2 scope, create helper before `goal card`.

## Figma work completed

Created Page 1 section:

- `Molecules — As-is` on the `As-is` page.
- Organized for scanability, not fixed 1680px section width.
- Added readable section labels for helper, sidebar, section/hero, data-row, and row/card groups.

Extended lower-level atom/helper components before dependent parents:

- `link-action` now owns the action-link family through source-backed variants: `Style=Default/Add/RowAction/FiscalEdit/AlertAction/GoalContribute` with `State=Enabled/Hovered`.
- `sidebar-nav-hint` was added as a lower-level atom for nav hint decoration (`Kind=Default/Alert/Warn/Pill`), then nested into `sidebar-nav-item`.
- `settings-icon-button` was added as a lower-level atom for the sidebar foot settings affordance (`State=Default/Hovered`).
- Earlier molecule-only helper sets (`_row-actions__link`, `_fiscal-edit__link`, `_alert-action`, `_goal-contribute`) were removed from the molecule section after review feedback.

Created molecule components/component sets:

- `sidebar-brand`
- `sidebar-nav-item`
- `account-list-item`
- `sidebar-foot`
- `section-head`
- `hero-kicker`
- `hero-delta`
- `hero-split-cell`
- `kpi-row`
- `distribution-row`
- `ledger-table-row`
- `budget-bar-row`
- `legend`
- `coach-stat`
- `notice-row`
- `marginalia`
- `goal-card`
- `coach-note`

M5 `topbar-search` was not rebuilt because Ch 2.1 already built and approved it as the input-field exception. It remains available for Ch 2.3 topbar assembly.

## Decisions and exceptions

- `ledger-table-row` does not include a visible `State=Hidden` variant. The source `hidden` class is a JS filter display state (`display: none`), so it is documented instead of shown as visible UI.
- `section-head` variants cover source-backed control compositions (`tabs`, `chips`, meta plus action, add action) and do not multiply by nested child hover/checked states. Section number, title, subtitle, and meta copy are exposed as replaceable text where they are molecule-owned.
- `budget-bar-row` uses `State=Default/Hovered` and `Status=Default/Over/Warn`. The action link reveal belongs to row hover; the action link hover remains in `link-action`.
- `goal-card` includes source-backed hover, pace, and last-card border context variants without multiplying every combination.
- `coach-note` uses source note kind variants only (`Alert`, `Action`, `Heads-up`), and nests `coach-stat` plus approved small `btn` instances.
- `sidebar-nav-item` was reduced to parent-owned `State=Default/Hovered/Active`; number and label are text properties, and the hint is a nested `sidebar-nav-hint` instance rather than a parent variant axis.
- `sidebar-foot` was rebuilt as a single molecule with nested `settings-icon-button`; the parent no longer has a settings-hover state.
- `account-list-item` was corrected to `State=Default/Hovered` by `Trend=Up/Neutral/Down`; account name/code/balance/trend text are replaceable data, and balance negativity is not a variant axis.

## Feedback correction pass

Review feedback on 2026-05-12 identified semantic and typography issues in the first molecule build. Corrections made:

- Re-read `docs/original/DESIGN.md` and `docs/original/README.md` to restore widget/function meaning for sidebar TOC items, ledger row actions, budgets, goals, coach notes, alerts, legend, and marginalia.
- Removed molecule-only action helper component sets and merged their behavior into `link-action` variants where the source typography, underline, color, and hover behavior matched closely enough to reuse.
- Added missing lower-level atoms for `sidebar-nav-hint` and `settings-icon-button` instead of letting parent molecules own those child states.
- Reworked variant APIs around parent-owned semantics:
  - `sidebar-nav-item`: `State=Default/Hovered/Active`; hint is nested.
  - `sidebar-foot`: single component; settings hover is nested.
  - `account-list-item`: `State x Trend`; no `Balance` axis.
  - `section-head`: one control-composition axis plus replaceable heading copy.
  - `budget-bar-row`: `State x Status`; action visibility follows hover.
  - `coach-note`: `Kind=Alert/Action/Heads-up`.
- Reapplied text styles across the molecule section, including source-specific additions for row actions, fiscal actions, alert actions, nav hints, distribution labels, legend summary, marginalia, hero delta, notice body, goal pace, and coach kind.
- Corrected uppercase source transforms by relying on uppercase text styles for `.row-actions a`, `.link-action`, `.alert-action`, `.goal-contribute`, and `.coach-kind`.
- Relayed the section into scanable columns with padded component sets: sidebar molecules, section/hero molecules, data rows/summaries, and rows/cards/widgets.

## Second feedback correction pass

Review feedback on 2026-05-13 identified remaining component API bloat, replaceable-data gaps, duplicate typography styles, detached colors, utility color drift, and row spacing issues. Corrections made:

- Re-read `docs/original/DESIGN.md` and `docs/original/README.md` for the intended standalone widget semantics before changing the component structure.
- Simplified `link-action` from content-specific style variants to `Mode=Visible/Reveal` and `State=Default/Hovered`, with text/boolean properties for `Before`, `Label`, `After`, `Show before`, and `Show after`.
- Simplified `_chips__label` from `Label x State` variants to `State=Default/Hovered/Active` plus a replaceable label text property.
- Added text properties to `pill` and `roman`, then exposed nested instances where Figma allowed nested properties to surface.
- Bound molecule-owned replaceable text properties across hero, KPI, distribution, ledger, budget, notice, goal, coach, legend, marginalia, sidebar brand, and coach stat components.
- Corrected semantic property wiring after audit:
  - `ledger-table-row`: date, description, tag, debit, credit, and balance now map to their own properties.
  - `budget-bar-row`: budget name, usage, amount, forecast, and marker label now map to their own properties.
  - `goal-card`: eyebrow, goal name, goal amount, percent, ETA, and pace now map to their own properties.
  - `kpi-row`: label, microcopy, value, and delta now map to their own properties.
- Created the missing `as-is/tx-tag` text style for `.tx-tag` instead of reusing `label-sidebar`.
- Removed unused duplicate Figma text styles for `as-is/fiscal-action-link` and `as-is/alert-action-link`; reveal-on-parent-hover actions now use `as-is/row-action-link`.
- Bound exact token colors to local `as-is/` paint styles across the molecule section; final audit reports 0 detached exact-token fills/strokes.
- Fixed utility color parity between default and hover variants:
  - `account-list-item` hover variants now preserve up/neutral/down dot, trend, and negative balance colors.
  - `budget-bar-row` hover over/warn variants now preserve red/gold bar fills.
- Fixed source spacing/alignment issues:
  - `kpi-row` uses the 14px source gap between grid columns, with the label/microcopy stack restored.
  - `ledger-table-row` lets the entry cell fill remaining space so debit/credit/balance columns land at the row end.
- Fixed nested `goal-card` contribute actions after the `link-action` merge so the plus sign is supplied by the before slot rather than duplicated in the label.
- Figma declined exposing the nested `new-entry-dot` marker because it has no exposed nested instances or component-property-bearing children; it remains a non-configurable marker instance.

## Third feedback correction pass

Review feedback on 2026-05-13 clarified that some audit findings were CSS-to-Figma translation issues, especially fixed specimen widths versus fill behavior inside the container. Corrections made:

- Retuned `ledger-table-row`, `budget-bar-row`, `notice-row`, `goal-card`, and `coach-note` against the source HTML/CSS and original README/DESIGN semantics.
- Reapplied source-specific typography for transaction dates/cells, fiscal names/percents/amounts/forecasts/actions, notice kinds/body/actions, goal headings/progress/ETA/pace, and coach kind/headline/body/meta/stat labels.
- Restored rich text semantics where source uses `em`, `strong`, `.figure`, or `.num` by applying range-level font and paint styling inside the relevant Figma text nodes.
- Fixed source-backed example content for budget statuses, notice kinds, goal cards, coach notes, and ledger default/new entries.
- Retuned row/card auto layout where Figma can reasonably mimic source grid/flex behavior:
  - `ledger-table-row` entry cells fill remaining width while debit/credit/balance columns stay fixed.
  - `budget-bar-row` heads use space-between behavior, bars preserve over/warn utility colors in default and hover variants, and over markers exist in both over variants.
  - `notice-row` body text fills the available row column.
  - `goal-card` and `coach-note` specimens use source padding/border semantics for first/middle/last positions.
- Re-linked uniform fills/strokes to local `as-is/` paint styles after the correction pass.
- Used range-level paint style IDs for remaining rich text nodes so exact token colors are no longer detached.

### Third-pass exceptions

- Figma shared text-property references across variants collapsed source-backed specimen content to the last written value. To keep the component documentation visually source-backed, variant-specific specimen text in `ledger-table-row`, `budget-bar-row`, `notice-row`, `goal-card`, and `coach-note` was unbound from the shared text-property references. This preserves accurate examples, but those particular fields are no longer exposed as one shared parent text property. A fuller redesign would need either variant-specific text properties, separate source examples outside the component sets, or accepting shared default specimen copy.
- Parent-level exposure of text inside nested instances remains limited by Figma API behavior. Earlier attempts to bind nested instance sublayer text through the parent returned `Cannot set component property references on instance sublayer`.
- `notice-row / Kind=Info` is retained as a labeled CSS-state specimen because `.alert-kind.info` exists in the source CSS and original design docs mention four notice kinds, but Page 1 HTML does not instantiate an info notice row.

## Validation

- [x] Component inventory checked against `02-component-catalog.md`.
- [x] Lower-level dependency audit completed.
- [x] Missing lower-level dependencies were resolved at the correct level. The initial molecule-only action helpers were removed; source action patterns are now `link-action` variants.
- [x] Nested instance inspection confirms parent molecules use approved lower-level instances where available:
  - `account-list-item` uses `dot`.
  - `sidebar-nav-item` uses `sidebar-nav-hint`.
  - `sidebar-foot` uses `settings-icon-button`, which uses `Icon / name=settings`.
  - `section-head` uses `section-num / section-mark`, `tabs`, `_tabs__label`, `chips`, `_chips__label`, and `link-action`.
  - `hero-delta` uses `trend-indicator`.
  - `ledger-table-row` uses `new-entry-dot` and `link-action / Style=RowAction`.
  - `budget-bar-row` uses `link-action / Style=FiscalEdit`.
  - `legend` uses `swatch`.
  - `notice-row` uses `link-action / Style=AlertAction`.
  - `goal-card` uses `roman` and `link-action / Style=GoalContribute`.
  - `coach-note` uses `coach-stat` and approved `btn` instances.
- [x] State audit confirms no parent x child variant explosion.
- [x] One-sided borders use individual stroke weights on component roots/frames; no fake `_border-bottom` rectangle helpers were found in the section.
- [x] Final typography audit: 267 molecule-section text nodes, 0 without text styles.
- [x] Second-pass typography audit: 309 molecule-section text nodes, 0 without text styles.
- [x] Second-pass replaceable-data audit: 0 molecule-owned direct text nodes without character component properties.
- [x] Second-pass color audit: 0 detached exact-token fills/strokes in the molecule section.
- [x] Third-pass typography audit: 310 molecule-section text nodes, 0 without text styles. 33 rich text nodes report `mixed` text styles because their ranges intentionally differ for italic/strong/figure semantics.
- [x] Third-pass color audit: 0 detached exact-token fills/strokes after relinking uniform paints and range-level rich text paints to local `as-is/` paint styles.
- [x] Final helper audit: 0 molecule-only helper component sets and 0 old helper instances remain.
- [x] Screenshot review completed after batch 1 and final assembly. Issues fixed:
  - Lower row/card component sets were repositioned to remove overlap.
  - `coach-note` button labels were applied through the approved `btn` text property.
  - `_alert-action` was widened so long source action text does not clip.
  - Correction pass fixed section-column overlap, account/budget matrix scanability, sidebar-foot note overlap, and coach-note wrapped copy.
  - Second correction pass fixed `goal-card` doubled plus signs after action-slot merge.
  - Third correction pass fixed shared text-property collapse in source-backed variants and detached exact-token paints introduced during direct Figma edits.
- [x] Session log includes decisions, exceptions, and handoff notes for the next chapter.

## Handoff to Ch 2.3

Ch 2.3 organisms can assemble the sidebar, topbar, status bar, hero section, cashflow/distribution, ledger/budgets, goals, coach, and notices from the completed lower-level components.

Carry forward:

- Use the existing `topbar-search` from Ch 2.1 rather than rebuilding it.
- Compose organisms from the Ch 2.2 molecule component sets and approved Ch 2.1 atoms.
- Keep source state boundaries: organism states should not multiply molecule states unless the HTML/CSS defines a distinct organism-owned state.
- Continue using individual stroke weights for one-sided borders.
- Keep source class names and variant names visible enough for review.
