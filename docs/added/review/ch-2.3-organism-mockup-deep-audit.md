# Chapter 2.3 Organism + Dashboard Mockup Deep Audit

Date: 2026-05-13  
Figma file: The Ledger, `As-is` page  
Scope: organism and full-dashboard mockup audit. Initial audit findings are preserved below; the applied correction pass is documented at the end of this file.

## Evidence Used

- Source CSS/HTML: `the-ledger.html`
- Component criteria: `docs/added/review/figma-component-checklist.md`
- Ch 2.3 session handoff: `docs/added/sessions/ch-2.3-organisms.md`
- Prior lower-level audit: `docs/added/review/ch-2.2-molecule-deep-audit.md`
- Figma user comparison regions:
  - Top bar: node `218:5036`
  - Bottom bar: node `218:5037`
  - Sidebar: node `218:5043`
  - Main: node `218:5041`
- Figma source/mockup comparison screenshots:
  - `output/playwright/ch-2.3-organism-audit/figma-compare-topbar-218-5036.png`
  - `output/playwright/ch-2.3-organism-audit/figma-compare-bottom-bar-218-5037.png`
  - `output/playwright/ch-2.3-organism-audit/figma-compare-sidebar-218-5043.png`
  - `output/playwright/ch-2.3-organism-audit/figma-compare-main-218-5041.png`
- Playwright source screenshots at 1680px viewport width:
  - `output/playwright/ch-2.3-organism-audit/source-topbar-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-statusbar-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-sidebar-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-main-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-hero-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-middle-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-double-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-goals-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-coach-1680.png`
  - `output/playwright/ch-2.3-organism-audit/source-alerts-1680.png`
- Playwright inspection viewport: `1680 x 1200`.
- Browser console note: only the existing missing `favicon.ico` 404 appeared; it does not affect this UI audit.

## Source Baseline

The source page is a two-column CSS grid: `248px` sidebar plus `1432px` right column. Main content has `36px 40px 44px` padding at the 1680px reference width. The source background is `--paper-deep` on `html, body`; `.main` has no own background. Topbar is sticky with a translucent paper blend. Statusbar is sticky bottom with `--paper-deep`.

The Playwright token conversion check confirmed that the documented OKLCH-to-hex values in `01-token-extraction.md` are correct in Chromium. The visible color mismatch is therefore not a general conversion issue; it is caused by at least one wrong Figma frame fill.

## High-Priority Findings

### P0. Main dashboard vertical rhythm drifts because organism instances are fixed taller than the source

The source and Figma start the first organism at the same main padding offset, but the Figma organisms are fixed-height and progressively push every later section down. By `Notices`, the Figma mockup is about `224px` lower than the browser source.

| Section | Source y in main | Figma y in main | Source h | Figma h | Height delta |
|---|---:|---:|---:|---:|---:|
| `hero` | 36 | 36 | 308.8 | 344 | +35.2 |
| `middle` | 382.8 | 418 | 423.5 | 470 | +46.5 |
| `double` | 844.3 | 926 | 504 | 528 | +24 |
| `goals` | 1386.3 | 1492 | 326.23 | 370 | +43.77 |
| `coach` | 1750.53 | 1900 | 419.17 | 494 | +74.83 |
| `alerts` | 2207.7 | 2432 | 299.69 | 328 | +28.31 |

Primary cause: the organism components have fixed heights that do not hug their source-backed content. The session-level validation missed this because the screenshot was checked visually as a whole rather than measured section-by-section against Playwright.

Recommended fix: correct organism source components first, then update `full-dashboard-mockup` instances. Do not compensate by manually moving later instances upward; that would hide the source component defects.

### P0. Main/right column background is the wrong token

In source, `html, body` use `--paper-deep` and `.main` is transparent (`the-ledger.html:46`, `the-ledger.html:405`). In the Figma comparison frame, the `right` frame `218:3349` has a solid `--paper` fill (`#f2eade`), while the full dashboard frame has `--paper-deep` (`#eae0d2`).

This explains the user's main-region color concern. It is not caused by OKLCH conversion. The browser canvas conversion produced the same hex values listed in token extraction:

| Token | Browser-converted hex |
|---|---|
| `--paper` | `#f2eade` |
| `--paper-deep` | `#eae0d2` |
| `--paper-sunk` | `#e1d6c7` |
| `--rule` | `#c6bcaf` |
| `--ink` | `#190f0a` |

Recommended fix: remove the `right` frame fill or change it to `as-is/paper-deep`. The source-backed version is transparent right/main content over the page background.

### P0. Coach cards have colored side borders, but only top borders should be colored

Source `.coach-note` has a 2px top border with semantic color and a 1px right border in `--rule` (`the-ledger.html:1100`, `the-ledger.html:1107`). The Figma `coach-note` instances use one stroke paint for both top and right strokes:

| Figma coach note | Stroke color | Stroke weights |
|---|---|---|
| First | red | top 2, right 1 |
| Second | blue | top 2, right 1 |
| Third | gold | top 2, right 0 |

This makes the vertical dividers red/blue where the source has neutral rule dividers. This is an organism-level fidelity defect, not a screenshot artifact.

Recommended fix: represent the accent top rule separately from the neutral right divider. Since Figma applies one stroke paint to all weighted sides on a node, the component needs a nested structure or a dedicated top-rule layer while preserving source semantics and documenting the exception to the no-fake-border-helper preference.

### P1. Sidebar row widths overlap the sidebar border by 1px

The source `.sidebar` is `248px` border-box with a 1px right border; child rows fill the content box and measure `247px`. In Figma, the `sidebar` instance is `248px` with a 1px right stroke, and nested nav/account rows are also `248px`, so they visually run under the right border.

This matches the user's observation that reducing the row by 1px makes it fit.

Recommended fix: reserve the border pixel at the sidebar source component level rather than patching only nav rows. Options:

- Set the sidebar content/scroll frame width to `247px` while keeping the root frame `248px` with the right stroke.
- Or give the root sidebar a 1px right layout padding and let child rows fill the content area.

The second option is cleaner if Figma auto-layout still preserves the visible `248px` exterior. Avoid manually setting only `sidebar-nav-item` to `247px`, because `sidebar-brand`, section labels, account rows, and foot also share the same CSS content-box relationship.

### P1. Statusbar typography and track sizing are not source-accurate

Source statusbar uses `grid-template-columns: auto 1fr auto`, `gap: 24px`, and `40px` side padding (`the-ledger.html:1232`). Figma has the same outer values, but the inner content widths differ:

| Zone | Source width | Figma width | Finding |
|---|---:|---:|---|
| `sync-pill` | 179.81 | 192 | Too wide |
| `ticker` | 844.55 | 812 | Too narrow |
| `shortcuts` | 279.64 | 300 | Too wide / starts too far left |

Typography is also flattened. Source `.statusbar .ticker .item strong` uses display font and semibold weight (`the-ledger.html:1271`), and `.ticker .item em` is muted italic (`the-ledger.html:1270`). Figma ticker values such as `€84,212.40`, `Spending €2,914 of €3,800`, and `Adobe €59.99` are Newsreader Regular rather than range-styled Fraunces/strong text.

Recommended fix: restore the statusbar rich text or split text nodes so `strong` and `em` ranges match the source. Then re-measure the three grid zones; the sync-pill width should shrink and the ticker should recover the source track width.

### P1. Hero layout has an internal spacing model mismatch

Source hero internals:

- `.hero-kicker` height `12`, margin-bottom `14`.
- `.hero-num-wrap` y `26`, height `99.75`.
- `.hero-delta` margin-top `14`, y `139.75` relative to hero.
- `.hero-split` margin-top `26`, y `181.75`, height `86`.
- `.hero-split > div` padding `14px 16px 14px 0`.

Figma hero internals:

- `hero-kicker` height `16`.
- `hero-num-wrap` y `16`, height `104`.
- `hero-delta` y `120`.
- `hero-split` y `136`, height `108`, with `26px` top padding.
- `hero` root height is fixed to `344`, leaving excess blank space below its children.

The source has `margin-top: 26px` on `.hero-split`; Figma effectively moved that 26px into the split frame's padding. That changes where the top divider and cell content land. It also explains the user's missing/misaligned divider observation in the hero area.

Recommended fix: model the 26px as spacing before the `hero-split`, not as internal padding. Set the split row to the source height around `86px` and let the organism height resolve to the content plus 38px bottom padding and the 1px bottom rule.

### P1. KPI list issues are inherited from the molecule but visible at organism level

At the organism level, the `hero-side` block is close in width and top placement, but the nested KPI rows still read differently from the source. Source `.kpi` is a grid `1fr auto auto`, has `14px` gaps, `11px 0` padding, and has label/micro differentiation (`the-ledger.html:560`, `the-ledger.html:569`, `the-ledger.html:574`, `the-ledger.html:578`). The Ch 2.2 audit already flagged the `kpi-row` molecule typography and structure as wrong.

Recommended fix: repair `kpi-row` before tuning the `hero` organism. Parent-level hero changes alone will not fix label/micro typography, value sizing, or grid alignment.

### P1. Distribution rows are too tall

Source `.distribution li` rows measure about `54.5px` with `10px 0` padding and grid `22px 1fr auto auto` (`the-ledger.html:744`). Figma `distribution-row` instances inside `middle` are `62px` high, and the total row is `48px`.

That makes the Figma distribution list `358px` high versus the browser distribution content at about `311.5px`, pushing the middle organism taller by about `46.5px`.

Recommended fix: reduce `distribution-row` content height to the source grid result. The note property added in Ch 2.3 is correct, but the row height and internal vertical model need correction.

### P1. Ledger and Budgets use different row-height errors in opposite directions

Source ledger first row measures `59.44px`; Figma `ledger-table-row` instances are `54px`. The Figma ledger therefore compresses rows, even though the containing `double` organism is still too tall.

Budgets have the opposite problem: source `.fiscal-list li` is `73px`, while Figma `budget-bar-row` instances are `86px`. This is the largest local cause of the right-side double-section mismatch.

Relevant source CSS:

- `.ledger-table tbody td` padding `11px 8px 11px 0`, font size `13.5px`, line-height `1.35` (`the-ledger.html:836`).
- `.fiscal-list li` grid rows, row gap `5px`, padding `13px 0` (`the-ledger.html:905`).

Recommended fix: repair the lower-level `ledger-table-row` and `budget-bar-row` molecule heights first, then rebuild/resize the `double` organism from nested instances.

### P1. Goals cards are significantly too tall

Source `.goals-grid > article` cards measure about `213.23px` high. Figma `goal-card` instances inside the `goals` organism are `258px`. This makes the goals organism `370px` tall instead of the source `326.23px`.

The source uses a 3-column grid with no gap and only right dividers between cards (`the-ledger.html:993`, `the-ledger.html:999`). Figma gets the three-column structure, but the card specimen height is too large for the source content.

Recommended fix: make `goal-card` height hug source content at the 1680px card width, then allow `goals-grid` and `goals` to hug. Do not preserve the current fixed card height.

### P1. Coach cards are too tall in addition to the colored side-border defect

Source coach note cards measure about `307.17px`. Figma `coach-note` instances are `382px`, so the coach organism is about `74.83px` taller than source.

The source uses `padding: 20px 22px 22px`, top accent border, neutral right border, and no grid gap (`the-ledger.html:1095`, `the-ledger.html:1100`). Figma has the right column widths and no grid gap, but the note cards are fixed too tall.

Recommended fix: fix `coach-note` height to content/hug after correcting the side border paint split. Then resize the `coach` organism to the source height.

## Region-by-Region Audit

### Top bar

Status: acceptable with minor measurement drift.

Measured source vs Figma:

- Source `topbar`: `1432 x 56`, padding `0 40`, grid columns `830.297px 360px 125.703px`.
- Figma `topbar`: `1432 x 56`, padding `0 40`, gap `18`, search `360 x 43`, actions `124 x 32`.
- Source search starts at x `888.3` relative to the topbar; Figma search starts at x `890`.
- Source actions start at x `1266.3` relative to the topbar; Figma actions start at x `1268`.

The small right-side spacing difference is under 2px for the primary tracks and is lower priority than the main/coach/sidebar issues.

### Bottom bar

Status: visually close, but typography and content widths need correction.

The source uses rich inline ranges in the ticker. Figma split text nodes currently preserve some color, but not the source font family/weight semantics. In particular, source strong ticker values should be display/semi-bold; Figma values are regular body text.

The current Figma spacing is not obviously worse visually, but it is not source-accurate. The oversized `sync-pill` and shortcut zone shrink the ticker compared with the browser.

### Sidebar

Status: decent but has a structural 1px width issue.

Source `.sidebar` root is `248px` with a right border; content rows are effectively `247px`. Figma root and children are all `248px`, causing row backgrounds to hit or pass under the right stroke.

The best fix is to reserve the border pixel once in the sidebar component's internal layout, not to reduce only the active nav row.

### Main

Status: main requires a focused correction pass. The visual differences are measurable and accumulate vertically.

The major main issues are:

- Wrong right-frame fill (`--paper` instead of transparent / `--paper-deep`).
- Fixed organism heights that do not hug source content.
- Hero split margin modeled as internal padding.
- Distribution, budgets, goals, and coach card heights too large.
- Ledger row height too small.
- Coach side borders use accent colors.

The top-level widths and column math are mostly correct:

- Source main content width: `1352px`.
- Figma organism instances: `1352px`.
- Source hero columns: `751.328px / 536.656px` with 64px gap.
- Figma hero children: about `751px / 537px` with 64px gap.
- Source middle columns: `782.391px / 521.594px` with 48px gap.
- Figma middle columns: `782px / 522px` with 48px gap.
- Source double columns: `771.75px / 532.234px` with 48px gap.
- Figma double columns: `772px / 532px` with 48px gap.

So the main issue is not column math; it is vertical sizing, row/card internals, and one fill token.

## Lower-Level Dependency Findings Surfaced By Organisms

These are not new organism APIs, but they block organism fidelity:

- `kpi-row`: still carries Ch 2.2 typography/grid issues, visible in the hero side panel.
- `ledger-table-row`: fixed row height is too short versus table-cell source behavior.
- `budget-bar-row`: row height too tall versus `.fiscal-list li`.
- `goal-card`: fixed specimen height too tall at the real 450.66px card width.
- `coach-note`: fixed height too tall and cannot represent separate top/right stroke colors with one node stroke paint.
- `distribution-row`: now has the needed `Note` property, but its row height is too tall.
- `statusbar`: may need its own organism-level rich-text handling rather than relying only on lower-level `kbd`/`sync-dot`.

## Recommended Fix Order

1. Correct the `right` frame fill in `full-dashboard-mockup` and any comparison/mockup right-column wrapper.
2. Fix `sidebar` internal content width so rows use the 247px content area inside the 248px bordered rail.
3. Fix `coach-note` border-color structure so only top borders are semantic colors and right dividers are `--rule`.
4. Fix lower-level row/card heights: `distribution-row`, `budget-bar-row`, `goal-card`, `coach-note`, and `ledger-table-row`.
5. Fix `hero` spacing: especially `hero-split` margin vs padding and root fixed height.
6. Restore statusbar ticker rich text and re-measure grid tracks.
7. Resize/recompose organism source components to hug corrected content.
8. Recompose `full-dashboard-mockup` from the corrected organism instances.
9. Re-run typography, paint, and screenshot audits against the four comparison regions.

## Review Conclusion

The Ch 2.3 build has the correct component inventory and mostly correct horizontal column math. It is not yet source-faithful at dashboard level. The largest defects are measurable vertical drift, wrong main/right fill, coach side-border color, statusbar typography flattening, and fixed lower-level row/card heights surfacing inside organisms.

The next pass should be a correction pass, not another broad rebuild. Fix the lower-level components where their source dimensions are wrong, then let organisms and the dashboard mockup reflow from corrected instances.

## Correction Pass Applied

Date: 2026-05-13  
Figma edits: applied after this audit.

### Fixed in Figma

| Audit item | Result |
|---|---|
| Main/right background token | Fixed. `full-dashboard-mockup` owns the `as-is/paper-deep` fill; `right` and `main` are transparent. Standalone comparison frames also use `as-is/paper-deep` so transparent content is reviewed in the correct context. |
| Main vertical drift | Fixed. Source section y/heights now match Playwright measurements at 1680px: hero `36 / 308.8`, middle `382.8 / 423.5`, double `844.3 / 504`, goals `1386.3 / 326.23`, coach `1750.53 / 419.17`, notices `2207.7 / 299.69`. |
| Sidebar row border overlap | Fixed. The sidebar source component reserves the 1px right stroke via right layout padding so nested rows fill the 247px content box. |
| Coach colored side borders | Fixed. Neutral right dividers remain on the card node; semantic red/blue/gold accents are 2px absolute top-rule helpers pinned at y `0`. |
| Statusbar rich text | Fixed. Ticker values/emphasis were restored with display semibold strong ranges and muted italic ranges. |
| Hero split spacing | Fixed. The split top divider now sits at the measured source y (`181.75`) instead of using the 26px margin as internal padding. |
| Distribution, ledger, budget, goals, coach, notices heights | Fixed at the lower-level component/instance level and then propagated through organisms and the full mockup. |
| Token paint relinking | Fixed. Final exact-token detached paint count is `0`. |

### Revalidated Without Additional Edits

- `kpi-row` was rechecked after the correction pass. The current Ch 2.2 component already reflects the source row model: `11px` vertical padding, `14px` column gap, inline label/microcopy with `8px` gap, uppercase 10.5px label, italic 10.5px microcopy, Fraunces 22px value, and 11.5px delta. No new Figma change was needed.

### Post-fix Evidence

- Full dashboard screenshot: `output/playwright/ch-2.3-organism-audit/figma-full-dashboard-after-fix-211-865.png`
- Topbar comparison: `output/playwright/ch-2.3-organism-audit/figma-compare-topbar-after-fix-218-5036.png`
- Bottom/statusbar comparison: `output/playwright/ch-2.3-organism-audit/figma-compare-bottom-bar-after-fix-218-5037.png`
- Sidebar comparison: `output/playwright/ch-2.3-organism-audit/figma-compare-sidebar-after-fix-218-5043.png`
- Main comparison: `output/playwright/ch-2.3-organism-audit/figma-compare-main-after-fix-218-5041.png`

### Final Numeric Audit

- `full-dashboard-mockup`: `1680 x 2645.39`.
- `main`: `1432 x 2551.39`, padding `36px 40px 44px`.
- `statusbar`: y `2607.39`, h `38`.
- Final typography audit on the full mockup: `434` text nodes, `28` intentional `mixed` rich-text nodes.
- Final paint audit across organism section plus full dashboard: `0` detached exact-token fills/strokes.
- Remaining opacity exceptions are source-backed: topbar paper blend `#f2eade@0.96` and sync pulse glow `#50663a@0.18`.

### Remaining Notes / Not Covered By The Audit

- The full-page sidebar is a static Figma representation of source sticky behavior. Browser `.sidebar` is viewport-height and sticky; the Figma full-dashboard sidebar is stretched to the full mockup height so the rail persists in the page screenshot. If a strict viewport-height sidebar comparison is needed, create a separate viewport specimen rather than changing the dashboard mockup.
- Topbar right-side track drift remains below 2px and was left as acceptable.
- Small type-rendering differences remain between Chromium and Figma. Treat those as rendering differences unless they create measurable spacing, clipping, or hierarchy defects.
