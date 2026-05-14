# Chapter 2.2 Molecule Deep Audit

Date: 2026-05-13  
Figma file: The Ledger, `As-is` page, molecule section `84:52`  
Scope: audit only. No Figma fixes were made.

## Evidence Used

- Source documentation: `docs/original/design.md`, `docs/original/readme.md`
- Source CSS/HTML: `the-ledger.html`
- Component criteria: `docs/added/review/figma-component-checklist.md`
- Source reference screenshots:
  - `output/playwright/the-ledger-source-1680.png`
  - `output/playwright/source-sidebar-1680.png`
  - `output/playwright/source-hero-1680.png`
  - `output/playwright/source-middle-1680.png`
  - `output/playwright/source-double-1680.png`
  - `output/playwright/source-goals-1680.png`
  - `output/playwright/source-coach-1680.png`
  - `output/playwright/source-alerts-1680.png`
- Figma molecule screenshot:
  - `output/playwright/figma-molecules-84-52.png`
- Playwright viewport: `1680 x 1200`
- Browser console note: only a missing `favicon.ico` 404 was reported; it does not affect the UI audit.

## Semantic Baseline From Original Docs

The original docs frame these molecules as working app widgets, not decorative samples. The sidebar is a table of contents plus live account rail; marginalia is a signature annotation pattern; ledger rows are real double-entry rows; budget rows communicate status and forecast; coach notes are actionable cards with different alert/action/heads-up meanings. That means variants should represent behavior or semantic state from the HTML/CSS, while changing data such as names, dates, amounts, labels, and notes should remain editable text or nested instance properties.

## High-Priority Findings

### P0. Typography styles are present, but many are semantically or numerically wrong

The issue is no longer mostly "missing text style". The issue is that applied styles often do not match the source selector.

Examples:

- `as-is/heading-kpi` is identical to `as-is/number-table` at Fraunces 14 / 100% line-height, but source `.kpi .v` is Fraunces 22 at `the-ledger.html:578`.
- `kpi-row` label uses `as-is/body-table` 13px regular case, while source `.kpi .l` is 10.5px uppercase, 0.18em tracking at `the-ledger.html:569`.
- `hero-delta` context text uses `as-is/body-meta` 10.5px, but source `.hero-delta em` is 13px italic at `the-ledger.html:495`.
- `legend` item labels use 10.5px body-meta, but source `.legend` is 12px italic at `the-ledger.html:719`.
- `sidebar-brand` renders `The` as Newsreader 11 body-small, but source `.sidebar-brand .name em` is Fraunces italic 22 with SOFT 100 at `the-ledger.html:89` and `the-ledger.html:98`.

Text-style duplication found in Figma:

| Duplicate signature | Styles |
| --- | --- |
| Newsreader SemiBold, 11px, line-height 100%, letter-spacing 14%, uppercase | `as-is/label-chip`, `as-is/label-link-action` |
| Fraunces Regular, 14px, line-height 100%, no letter-spacing | `as-is/heading-kpi`, `as-is/number-table` |

The first duplication is risky because source tabs use 0.12em tracking, while chips and link-action use 0.14em. The second is a direct mismatch because KPI values are not table numbers.

### P0. Rich-text semantics from the HTML are flattened into single text nodes

Several source molecules rely on mixed styling inside one semantic text block. Figma often converts those into one flat styled text node, losing meaning and visual fidelity.

Affected examples:

- `sidebar-brand`: `<em>The</em>Ledger` should be one display phrase with italic display emphasis. Figma splits it into small Newsreader `The` plus Fraunces `Ledger`.
- `marginalia`: source has arrow, then `strong` in ink/non-italic, then italic Fraunces body in ink-mute (`the-ledger.html:468`, `the-ledger.html:480`, `the-ledger.html:486`). Figma applies one italic text style and ink-soft to the body.
- `hero-kicker`: source recent text has a red non-italic `strong` figure and italic continuation (`the-ledger.html:432`, `the-ledger.html:440`). Figma treats it as one italic string.
- `goal-name` and `coach-headline`: source italicizes the first semantic word via `<em>` (`the-ledger.html:1018`, `the-ledger.html:1132`). Figma headline/name text is regular throughout.
- `goal-pace`: source colors only the leading `em` token (`On pace` / `Behind`) while the rest stays muted italic (`the-ledger.html:1063`, `the-ledger.html:1070`). Figma colors whole variants.
- `coach-kind`: source has a separate `.num` roman child in Fraunces italic (`the-ledger.html:1113`, `the-ledger.html:1124`). Figma combines `Alert · subscriptions i.` into one uppercase Newsreader node.

### P0. Several molecule layouts use fixed presentation widths where source behavior is fluid

The source page uses CSS grid/flex with `1fr`, `auto`, or container-fill behavior. Many Figma molecules are fixed-width specimens with fixed inner frames.

Examples:

- `ledger-table-row` has a synthetic 12px marker slot and fixed entry cell width of 360px. Source table uses actual table columns, with the new-entry dot absolutely positioned left of the first cell (`the-ledger.html:836`, `the-ledger.html:848`, `the-ledger.html:850`).
- `budget-bar-row` is fixed at 430px with fixed row-head/bar/edit frames. Source `.fiscal-list li` is a grid with `grid-template-columns: 1fr auto` (`the-ledger.html:905`).
- `notice-row` is fixed at 760px. Source `.alerts li` is `100px / 1fr / auto` and fills the available content column (`the-ledger.html:1197`).
- `goal-card` and `coach-note` are fixed 330/340px specimens, while source cards are column tracks in a 3-column grid (`the-ledger.html:999`, `the-ledger.html:1100`).

For component documentation this can be acceptable as a specimen width, but the inner constraints should still express source behavior: text/data cells should use fill where source uses `1fr`, fixed markers should not reserve layout space when source uses absolute positioning, and action/content clusters should hug when source hugs.

### P1. Nested component properties are not exposed deeply enough

Figma property definitions show top-level text props, but many nested instance controls are not exposed where the molecule needs to represent Page 1 data.

Examples:

- `section-head` exposes number/title/subtitle/meta/control type, but not nested link labels, tab active label text, or chip label text.
- `ledger-table-row` exposes date/description/tag/debit/credit/balance, but not row action labels or action count. Source rows vary between `Categorise/Split/Cancel`, `Categorise/Split`, `View`, etc. (`the-ledger.html:1646` onward).
- `budget-bar-row` exposes forecast and marker text, but not the action label (`Adjust` vs `Move funds`) as a direct molecule property.
- `notice-row` exposes kind/body only, but not action label (`Review`, `Manage`, `View runway`) even though source varies it.
- `coach-note` exposes kind/headline/body/meta, but not nested `coach-stat` value/label or button labels, despite source having different stats and CTAs per note.
- `sidebar-nav-item` nests `sidebar-nav-hint`, but the parent only exposes number/label/state. Hint label/type is not exposed through the molecule.

### P1. Source-backed content is inconsistent in component examples

Page 1 as-is components should use values from the HTML. Several molecules use generic or invented specimens instead.

Examples:

- `notice-row` variants use `Sync · today`, which is not in the source notice feed. Source kinds are `Tariff change · 1 May`, `Due · 14 May`, `Due · 18 May`, `Milestone · 10 May`.
- `coach-note` variants keep `Alert · subscriptions i.` and the subscription body across Action and Heads-up variants, while source Action and Heads-up notes have different text.
- `goal-card` Behind variants still show `Emergency Fund` / `On pace · ...` in places where source has `Japan in autumn` / `Behind · +€85/mo ...`.
- `hero-split-cell` both variants show `Assets`; source has `Assets`, `Liabilities`, and `Savings rate`.
- `budget-bar-row` all variants show `Groceries`, although source examples include `Dining out`, `Transport`, `Entertainment`, and `Shopping`.

### P1. Color audit: no random detached colors in the molecule section, but wrong token usage remains

Programmatic scan of section `84:52` found:

- Detached paint count: `0`
- Random non-token hex count: `0`

So the current color problem is not random hex detachment inside the molecule section. It is incorrect token/style choice.

Examples:

- `hero-kicker` glyph is `as-is/ink-soft`; source glyph is red at `the-ledger.html:430`.
- `hero-delta` nested arrow resolves to muted styling in the molecule, while source arrow is blue at `the-ledger.html:493`.
- `marginalia` body uses ink-soft; source base color is ink-mute at `the-ledger.html:468`.
- `sidebar-foot` background is `as-is/paper-deep`; source `.sidebar-foot` background is `--paper-sunk` at `the-ledger.html:250`.
- `sidebar-foot` uses all-side rule stroke; source only has a top border, and it is ink.

## Lower-Level Dependency Findings

### `btn`

Source `.btn-sm` is `padding: 6px 11px; font-size: 11.5px` at `the-ledger.html:1187`. Figma small button variants are `7/12/7/12`, so every nested coach button is one pixel too large vertically and horizontally.

The plus and caret internal text nodes have no text styles. They are small helper glyphs, but this is still a dependency gap if the chapter expects every visible text node to be style-backed.

### `link-action`

The current atom has a workable two-mode direction (`Visible` vs `Reveal`), but it is overused for source selectors with different definitions.

Source selectors:

- `.link-action`: 11px, 0.14em, semibold, underline ink to red hover, arrow after (`the-ledger.html:649`)
- `.row-actions a`: 10.5px, 0.08em, medium, underline rule to ink hover, no arrow (`the-ledger.html:865`)
- `.fiscal-edit a`: 10.5px, 0.10em, semibold, opacity reveal, no arrow (`the-ledger.html:971`)
- `.alert-action`: 10.5px, 0.10em, semibold, visible, no arrow (`the-ledger.html:1218`)
- `.goal-contribute`: 10.5px, 0.14em, semibold, plus before, no arrow (`the-ledger.html:1075`)

The atom currently models `.link-action` and `.row-actions a` best. It does not exactly model fiscal edit, alert action, or goal contribute. Using it everywhere creates typography and pseudo-element mismatches.

### `_tabs__label`, `_chips__label`, and `tabs`

`_chips__label` uses source chip values correctly: 11px, 0.14em, uppercase, padding `4px 0` (`the-ledger.html:809`).

`_tabs__label` incorrectly shares the chip/link text style with 0.14 tracking. Source `.tabs label` is 11px with 0.12em tracking and padding `5px 11px`. This is a lower-level atom issue that affects `section-head` tab variants.

### `pill`

The atom uses `as-is/kbd` (Newsreader Regular 10, 0.04 tracking). Source `.pill` is 10px, 0.04em, weight 600, paper on ink (`the-ledger.html:181`). It needs a dedicated pill label style or a corrected shared style.

### `settings-icon-button`

Default size is correct at 28x28. Hover state adds a paper-soft fill, but source `.sidebar-foot .settings:hover` only changes color and border-color; it does not set a background fill (`the-ledger.html:276`, `the-ledger.html:283`).

### `sidebar-nav-hint`

The atom's default/alert/warn/pill semantic split is directionally correct. The issue is parent exposure: `sidebar-nav-item` does not expose the nested hint kind/label as parent-level properties, so consumers cannot swap source-backed hints from the nav molecule itself.

## Molecule-by-Molecule Audit

### `sidebar-brand` (`84:79`)

Source: `the-ledger.html:82`, `the-ledger.html:89`, `the-ledger.html:98`, `the-ledger.html:103`

Findings:

- `The` is Newsreader 11 body-small in Figma. Source has `The` as Fraunces 22 italic, same display phrase as `Ledger`.
- Version text uses `as-is/kbd` Newsreader Regular. Source `.vol` is 10px uppercase, 0.14em, ink-mute, italic.
- Component width/padding/bottom border match closely (`248x52`, `16/20/14/20`, bottom rule), but typography breaks the brand semantics.

### `sidebar-nav-item` (`84:110`)

Source: `the-ledger.html:142`, `the-ledger.html:162`, `the-ledger.html:170`, `the-ledger.html:173`

Findings:

- Figma uses horizontal auto layout. Source is a 3-column grid: `28px 1fr auto`.
- Label text uses `as-is/body-sidebar` 13px. Source nav row text is 14px.
- Number and state colors are mostly right.
- Hint is correctly nested as `sidebar-nav-hint`, but nested hint props are not exposed at the parent molecule.
- Component state axis is correct: Default / Hovered / Active only. No parent x child hint explosion remains.

### `account-list-item` (`84:147`)

Source: `the-ledger.html:196`, `the-ledger.html:203`, account child rules around `the-ledger.html:208`

Findings:

- Figma row height is 60px; browser rendered source account rows are 51px at 1680px.
- Account name uses 13px `body-sidebar`; source `.account-head .name` is 12.5px, weight 500.
- Account code uses bold uppercase style with 0.24 tracking; source `.account-head .num` is 9.5px with 0.06em and `font-variant-caps: all-small-caps`.
- Internal frames are fixed-width. Source uses flex with `margin-left:auto` for the account code and `justify-content: space-between` for balance/trend.
- Trend colors are preserved in default and hover variants.

### `sidebar-foot` (`109:209`)

Source: `the-ledger.html:250`, `the-ledger.html:258`, `the-ledger.html:269`, `the-ledger.html:273`, `the-ledger.html:276`

Findings:

- Figma component is a `NONE` layout frame. Source is flex with `gap: 12px`, align center, and settings pushed with `margin-left:auto`.
- Background is `paper-deep`; source uses `paper-sunk`.
- Figma has all-side rule stroke. Source has only `border-top: 1px solid var(--ink)`.
- Avatar border is ink-mute and initials use Newsreader Italic 10.5. Source avatar uses ink border and Fraunces italic 13.
- Nested `settings-icon-button` exists, but its hover state has a fill not defined in source.

### `section-head` (`84:245`)

Source: `the-ledger.html:606`, `the-ledger.html:613`, `the-ledger.html:623`, `the-ledger.html:636`, `the-ledger.html:639`

Findings:

- Component variant axis (`Controls`) is semantically valid, but nested control labels are not exposed.
- Title uses `as-is/display-goal` 27px. Source section h3 is `clamp(20px, 1.9vw, 26px)` and resolves to 26px at 1680px.
- Tabs in the section inherit the chip/link 0.14 tracking style; source tabs are 0.12em.
- Meta text uses the link-action style in places. Source `.h-meta` is 11px, 0.16em, uppercase, semibold.

### `hero-kicker` (`84:246`)

Source: `the-ledger.html:421`, `the-ledger.html:430`, `the-ledger.html:432`, `the-ledger.html:440`

Findings:

- Glyph is 11px ink-soft. Source glyph is 9px red.
- Recent text is one `section-sub` style at 12.5px. Source recent is 12px italic, with the `strong` figure red, normal, semibold.
- The rule/flex behavior is close, but the component uses a fixed 650px specimen.

### `hero-delta` (`84:251`)

Source: `the-ledger.html:488`, `the-ledger.html:493`, `the-ledger.html:494`, `the-ledger.html:495`, `the-ledger.html:496`

Findings:

- Delta value matches 15px semibold blue.
- Context and YTD text are 10.5px body-meta; source `.hero-delta em` is 13px italic.
- Pipe is body-meta-sized and ink-mute; source pipe uses rule color with `margin: 0 2px`.
- Nested `trend-indicator` is correct at atom level, but the instance in `hero-delta` resolves visually/textually as muted instead of source blue.

### `hero-split-cell` (`84:267`)

Source: `the-ledger.html:498`, `the-ledger.html:504`, `the-ledger.html:511`, `the-ledger.html:515`, `the-ledger.html:524`, `the-ledger.html:528`

Findings:

- Label style is close.
- Value is 27px `display-goal`; source value maxes at 26px at 1680px.
- Footnote uses regular body-small with 0.04 tracking. Source `.hero-split .foot` is 11px italic, no tracking.
- Emphasis in footnote (`up €1,840`, `on target`) is flattened.
- Both variants show `Assets`; source-backed specimens should cover Assets / Liabilities / Savings rate values.

### `kpi-row` (`84:292`)

Source: `the-ledger.html:560`, `the-ledger.html:569`, `the-ledger.html:574`, `the-ledger.html:578`, `the-ledger.html:586`

Findings:

- This is one of the largest mismatches.
- Source row is grid `1fr auto auto` with 14px gap. Figma is horizontal fixed layout with a vertical `kpi__l` frame.
- Label should be 10.5px uppercase, 0.18em, semibold. Figma label is 13px body-table, normal case.
- Microcopy should be inline in `.kpi .l`, italic, 10.5px, 0.02em, with 8px gap. Figma stacks it below the label.
- Value should be Fraunces 22px. Figma uses 14px (`heading-kpi`, duplicated with table number).
- Delta should be 11.5px; neutral delta is italic, up/good/bad are normal colored. Figma uses 11px body-small and does not preserve the exact neutral/colored typography split.

### `distribution-row` (`84:313`)

Source: `the-ledger.html:744`, `the-ledger.html:755`, `the-ledger.html:760`, `the-ledger.html:766`, `the-ledger.html:771`, `the-ledger.html:779`

Findings:

- Source row is a 4-column grid plus a bar spanning all columns. Figma approximates this with a vertical row plus inner horizontal frame.
- Amount is 14px in Figma; source `.distribution .amount` is 15px Fraunces.
- Percent is 12.5px section-sub; source `.distribution .pct` is 12px italic with `min-width: 36px`.
- Source name and note are separate: `.name` 14px and `.note` 11.5px italic with 8px left margin. Figma combines `Housing rent + utilities` into one name text, losing the note semantics.
- Total row type is present and mostly aligned, but rank is still present in the specimen even though source total row has an empty rank cell.

### `legend` (`84:314`)

Source: `the-ledger.html:719`, `the-ledger.html:728`, `the-ledger.html:729`, `the-ledger.html:732`, `the-ledger.html:737`

Findings:

- Item labels are 10.5px body-meta. Source legend base text is 12px italic.
- Summary uses ink-mute; source summary uses ink-soft and has strong values in ink semibold.
- Summary strong emphasis is flattened into one style.
- Swatch atom dimensions are close.

### `coach-stat` (`84:325`)

Source: `the-ledger.html:1157`, `the-ledger.html:1164`, `the-ledger.html:1172`

Findings:

- Big value matches source at Fraunces 28.
- Label uses `as-is/label-action` 10.5px / 0.14 tracking. Source `.coach-stat .lbl` is 11px / 0.10em.
- Fixed 260px width is acceptable as a specimen, but in source `.coach-stat` fills its card column.

### `marginalia` (`84:328`)

Source: `the-ledger.html:468`, `the-ledger.html:480`, `the-ledger.html:486`

Findings:

- Base family/italic/size/line-height are close.
- Body fill is ink-soft; source base color is ink-mute.
- Strong phrase is not separately styled as ink, semibold, non-italic.
- Arrow and left rule are broadly correct.

### `ledger-table-row` (`85:155`)

Source: `the-ledger.html:836`, `the-ledger.html:848`, `the-ledger.html:850`, `the-ledger.html:857`, `the-ledger.html:865`, `the-ledger.html:873`, `the-ledger.html:880`

Findings:

- Figma row reserves a 12px `new-entry-marker-slot`. Source new-entry dot is absolutely positioned at `left: -8px` and does not consume table layout space.
- Figma row is 720px fixed with fixed cell frames. Source is a real table with width 100%, fixed column hints on the actual table headers, and a fluid entry column.
- Date uses 11px body-small. Source `.tx-date` is 11.5px, all-small-caps, 0.08em.
- Description/debit/credit use 13px body-table. Source table body cells are 13.5px.
- Tag style is close: 9.5px italic uppercase 0.14em.
- Action labels are nested `link-action` reveal instances, but action labels/count are not exposed at the row level. Source row action sets vary per transaction.

### `budget-bar-row` (`85:214`)

Source: `the-ledger.html:905`, `the-ledger.html:916`, `the-ledger.html:920`, `the-ledger.html:930`, `the-ledger.html:962`, `the-ledger.html:971`

Findings:

- Figma row is fixed 430px; source row is a grid with `1fr auto`.
- Budget name is 13px medium; source `.fiscal-name` is 13.5px.
- Usage percent uses Newsreader 10.5 body-meta; source `.fiscal-name .pct` is Fraunces italic 12.5.
- Amount is one 13.5px Fraunces style. Source amount is 14px Fraunces ink-soft, with the strong spent amount in ink.
- Forecast text uses regular body-small with tracking. Source `.fiscal-edit` is 11px italic with 0.04em.
- Marker label uses 10px label-eyebrow. Source marker label is 8.5px.
- Action link uses row-action-link values. Source `.fiscal-edit a` is 10.5px, 0.10em, semibold.

### `notice-row` (`85:239`)

Source: `the-ledger.html:1197`, `the-ledger.html:1207`, `the-ledger.html:1215`, `the-ledger.html:1218`

Findings:

- Fixed width 760px; source fills content width with `100px 1fr auto`.
- Kind style is close, but source content examples are not used.
- Action link uses generic `link-action` visible mode. Source `.alert-action` is 10.5px / 0.10em and has no arrow pseudo-element.
- Action label is not exposed as a molecule property.
- Body text is one style. Source body includes normal body plus nested `em` muted italic and figure spans.

### `goal-card` (`85:312`)

Source: `the-ledger.html:999`, `the-ledger.html:1012`, `the-ledger.html:1018`, `the-ledger.html:1031`, `the-ledger.html:1050`, `the-ledger.html:1063`, `the-ledger.html:1075`

Findings:

- Position variants roughly match first/default/last padding and right rule semantics.
- Goal heading loses `<em>` styling on the first word.
- Progress uses 11px body-small; source `.goal-prog` is 13px, with strong amount in ink semibold.
- ETA uses 10.5px body-meta; source `.goal-eta` is 11.5px italic.
- Pace coloring is applied to the whole line in the Behind variant; source colors only the leading `em.behind`.
- Contribute action uses the generic link-action atom at 11px. Source `.goal-contribute` is 10.5px and has only a plus before, not a trailing arrow.
- Nested action label is not exposed, though source currently always uses `Contribute`.

### `coach-note` (`85:395`)

Source: `the-ledger.html:1100`, `the-ledger.html:1113`, `the-ledger.html:1124`, `the-ledger.html:1132`, `the-ledger.html:1139`, `the-ledger.html:1157`, `the-ledger.html:1187`

Findings:

- Top border color variants are correct.
- Padding/right-border position variants are close to source first/middle/last rules.
- Kind line is flattened. Source requires `.coach-kind` text plus separate `.num` in Fraunces italic 13.
- Headline loses italic `<em>` word.
- Body loses strong/figure segments.
- Nested `coach-stat` value/label are not exposed at the coach-note parent level.
- Button labels are not exposed at the coach-note parent level.
- Nested button atom uses 7/12 padding, but source `.btn-sm` is 6/11.
- Action and Heads-up variants reuse Alert source text in places, so the examples are not Page 1 source-backed.

## Recommended Fix Order

1. Correct the text style inventory before editing molecules:
   - Split KPI value from table number.
   - Split tabs label from chip/link label.
   - Add/adjust exact styles for sidebar brand emphasis, fiscal percent, fiscal edit, legend labels, coach stat label, transaction date, and sidebar/account small labels.
2. Fix lower-level dependencies:
   - `btn` small padding.
   - `pill` label weight.
   - `settings-icon-button` hover fill.
   - Decide whether `link-action` remains only `.link-action` + `.row-actions a`, or add separate atoms for fiscal/alert/goal action selectors.
3. Rebuild or retune the worst molecule mismatches first:
   - `kpi-row`
   - `sidebar-brand`
   - `sidebar-foot`
   - `budget-bar-row`
   - `ledger-table-row`
4. Restore rich text semantics where source uses `em`, `strong`, `.num`, `.note`, or `.figure`.
5. Expose nested instance properties where a source-backed molecule needs data variation.
6. Re-run browser screenshot comparison at 1680px and repeat Figma screenshot inspection before closing Chapter 2.2.
