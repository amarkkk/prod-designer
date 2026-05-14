# Ch 3.6 — Proposed System Audit and Handoff

Date: 2026-05-13

Status: Complete.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

## Scope

This chapter is the Phase 3 closeout gate.

It verifies that the `Proposed` page is ready to support Phase 4 feature work:

- No Proposed instances point back to Page 1 `As-is`.
- No Proposed component layer uses `as-is/` text styles.
- Visible fills and strokes are bound to Proposed variables where Figma supports paint binding.
- Interactive atom families have the required Proposed state coverage.
- Shell layout and row dimensions are tokenized.
- Known exceptions are documented before Phase 4 starts.

## Final Instance Link Audit

Final Proposed-page instance audit across the core sections:

| Section | As-is links |
|---|---:|
| `Atoms — Proposed` | 0 |
| `Molecules — Proposed` | 0 |
| `Organisms — Proposed` | 0 |
| `Recreation validation` | 0 |

Total result:

| Check | Result |
|---|---:|
| Proposed instances audited | 609 |
| Pointing to Proposed masters | 609 |
| Pointing to Page 1 `As-is` masters | 0 |
| Missing/other main components | 0 |

## Final Style and Paint Audit

Final audit across the same sections:

| Check | Result |
|---|---:|
| Text nodes using `as-is/` text styles | 0 |
| Unbound visible solid fills/strokes | 0 |

This means the Proposed page no longer depends on Page 1 text styles or raw visible paint values in the audited system sections.

## State Coverage

Interactive atom state coverage:

| Component set | Coverage |
|---|---|
| `btn` | Enabled, Hovered, Focused, Pressed, Disabled |
| `btn-icon` | Enabled, Hovered, Focused, Pressed, Disabled |
| `settings-icon-button` | Default, Hovered, Focused, Pressed, Disabled |
| `link-action` | Default, Hovered, Focused, Pressed, Disabled |
| `topbar-search` | Enabled, Hovered, Focused, Disabled |
| `_tabs__label` | Enabled, Hovered, Focused, Pressed, Checked, Disabled |
| `_chips__label` | Default, Hovered, Focused, Pressed, Active, Disabled |

Notes:

- `topbar-search` intentionally does not include a pressed state because it is an input field, not a pressable control.
- Tabs/chips retain selected semantic states (`Checked`, `Active`) alongside interaction states.

## Layout Token Audit

Shell and layout values bound in Ch 3.5:

| Mapping token | Value |
|---|---:|
| `shell/sidebar/width` | 256 |
| `shell/topbar/height` | 56 |
| `shell/sidebar-brand/height` | 56 |
| `shell/statusbar/height` | 40 |
| `shell/sidebar-footer/height` | 40 |
| `row/ledger/height` | 60 |
| `row/budget/height` | 72 |
| `row/notice/height` | 44 |
| `row/distribution/height` | 56 |
| `organism/gap/default` | 32 |
| `organism/gap/airy` | 40 |
| `section/padding` | 20 |
| `section/header-gap` | 16 |

The key requested shell corrections are in place:

- Topbar height equals sidebar brand height.
- Statusbar height equals sidebar footer height.
- More generous organism spacing is expressed through rhythm/gap variables, while section padding remains at the DESIGN.md 20px guardrail.

## Intentional Exceptions and Figma Limitations

Literal values are still expected in:

- Foundation variables.
- Token specimen/table documentation.
- Freeform vector coordinates and chart paths.
- Text box widths/heights where text uses content sizing or rich-text overrides.

Known Figma behavior:

- Text style `fontStyle` variable binding did not persist in Ch 3.2. Proposed text styles still carry the intended font family, weight, size, line-height, and letter-spacing variables where Figma supports them.
- Focus-ring stroke width appears in node data as side-specific bindings (`strokeTopWeight`, `strokeRightWeight`, `strokeBottomWeight`, `strokeLeftWeight`) rather than the aggregate `strokeWeight`.
- Some catalog/specimen layout labels are documentation, not product UI. They are styled with `proposed/annotation/micro` where needed.

## Phase 4 Handoff Gate

Phase 3 is closed.

Phase 4 can start from a self-contained Proposed page:

- Page 1 `As-is` remains the closed source-backed baseline.
- Proposed atoms, molecules, organisms, and mockup now point to Proposed-local component masters.
- Proposed text and visible paints are tokenized.
- Shell dimensions, row heights, spacing, radius/focus/rule/color/type mappings exist for subsequent feature design.

Do not reopen Page 1 `As-is` for Phase 4. New feature work should build only on `Proposed`.
