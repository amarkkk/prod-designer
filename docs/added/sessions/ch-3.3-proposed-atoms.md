# Ch 3.3 — Proposed Atoms

Date: 2026-05-13

Status: Complete.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

## Scope

This chapter executes the Proposed token system at the atom layer before molecules or organisms are touched.

Current batch completed:

- Corrected the immediate token-system issues raised after Ch 3.2.
- Removed atom-scope dependencies on Page 1 `As-is` component masters.
- Bound atom text and visible paints to active Proposed tokens.
- Added component-specific mapping tokens where the atom work exposed missing endpoints.

Completed in the final atom batch:

- Full spacing, dimension, radius, and focus binding for interactive atoms where Figma supports variables.
- Five-state expansion for interactive atom families.
- Proposed state color mappings for pressed/disabled/focused paths that were missing after Ch 3.2.
- Cleanup of an early clone-placement error so Page 1 `As-is` remains intact.

## Corrections Before Atom Binding

Figma-bound text-style `letterSpacing` resolves as pixels. The earlier percentage-style values translated into unusable tracking.

Corrected active values:

| Style | Corrected Figma value |
|---|---:|
| `proposed/label/default` | `0.5px` |
| `proposed/label/small` | `0.55px` |
| `proposed/label/micro` | `0.6px` |

The flat Ch 3.1 collections were renamed to make their legacy status explicit:

- `Legacy Ch 3.1 Proposed / Color (scaffold)`
- `Legacy Ch 3.1 Proposed / Space (scaffold)`
- `Legacy Ch 3.1 Proposed / Type (scaffold)`

## Atom Link Repair

Initial atom audit:

| Check | Result |
|---|---:|
| Atom instances | 43 |
| Pointing to Proposed masters | 35 |
| Pointing to Page 1 `As-is` masters | 8 |
| Missing main components | 0 |

The reported example was confirmed:

- `249:2557` `notification-badge` pointed to As-is master `45:17`.

Created Proposed-local atom masters from visible top-level atom instances:

| Component | New Proposed master |
|---|---|
| `notification-badge` | `287:5171` |
| `pill` | `287:5174` |
| `sync-dot` | `287:5178` |
| `new-entry-dot` | `287:5180` |
| `roman` | `287:5183` |

Swapped nested atom instances:

| Instance | Old As-is master | New Proposed master |
|---|---|---|
| `249:2557` `notification-badge` | `45:17` | `287:5171` |
| `249:2560` `notification-badge` | `45:17` | `287:5171` |
| `249:2774` `pill` | `45:11` | `287:5174` |

Validation after repair:

| Check | Result |
|---|---:|
| Atom instances | 38 |
| Pointing to Proposed masters | 38 |
| Pointing to Page 1 `As-is` masters | 0 |

## Token Binding Batch

Corrected obvious color mapping scopes:

- `button/primary/surface/*` now exposes fill scopes.
- `button/primary/text/*` now exposes text-fill/stroke scopes.
- `badge/notification/surface` now exposes fill scopes.
- `badge/notification/text` now exposes text-fill scope.

Added atom-specific color mappings as real consumers appeared:

| Mapping token | Alias source | Scope |
|---|---|---|
| `tabs/surface/selected` | `ink/primary` | Fill |
| `tabs/text/default` | `ink/primary` | Text fill / stroke |
| `tabs/text/selected` | `paper/surface` | Text fill |
| `pill/surface/default` | `accent/debit` | Fill |
| `pill/text/default` | `paper/surface` | Text fill |
| `icon/stroke/default` | `ink/primary` | Stroke |
| `icon/stroke/muted` | `ink/muted` | Stroke |

Added Figma catalog annotation typography:

- Text style: `proposed/annotation/micro`
- Foundation variables: `font-size/annotation/micro`, `line-height/annotation/micro`, `letter-spacing/annotation/micro`
- Alias variables: `size/annotation/micro`, `line-height/annotation/micro`, `letter-spacing/annotation/micro`
- Purpose: Figma component-catalog labels only. This is not a product UI role.

Removed the purple component-set scaffold strokes from atom component sets instead of tokenizing them as product UI.

Updated the visible `Atoms — Proposed` section note to state that atom text and paints are now bound to the Proposed token network, while spacing/dimension binding continues in the atom rebuild pass.

## Current Validation

Final atom audit for this batch:

| Check | Result |
|---|---:|
| Nodes in `Atoms — Proposed` | 355 |
| Atom instances pointing to Page 1 `As-is` | 0 |
| Atom instances pointing to Proposed masters | 38 |
| Text nodes | 178 |
| Text nodes using `proposed/` text styles | 178 |
| Text nodes using `as-is/` text styles | 0 |
| Visible solid fills bound to variables | 243 / 243 |
| Visible solid strokes bound to variables | 86 / 86 |
| Unbound visible solid paints | 0 |

Full Proposed page link audit after this atom batch:

| Check | Result |
|---|---:|
| Proposed-page instances | 612 |
| Pointing to Proposed masters | 91 |
| Pointing to Page 1 `As-is` masters | 521 |
| Missing main components | 0 |

Remaining Page 1 links are outside the atom section:

| Section | Remaining `As-is` links |
|---|---:|
| `Molecules — Proposed` | 20 |
| `Organisms — Proposed` | 330 |
| `Recreation validation` | 171 |

Text style distribution after the annotation pass:

| Text style | Count |
|---|---:|
| `proposed/annotation/micro` | 76 |
| `proposed/label/default` | 58 |
| `proposed/label/small` | 29 |
| `proposed/body/small` | 6 |
| `proposed/label/micro` | 6 |
| `proposed/number/table` | 2 |
| `proposed/heading/subsection` | 1 |

Screenshot QA:

- Checked `Atoms — Proposed` after binding and annotation correction.
- The first screenshot showed catalog-label crowding from applying product label styles to Figma documentation labels.
- The `proposed/annotation/micro` style fixed the visible catalog-label crowding.

## Final Atom State and Geometry Pass

Interactive atom component sets were expanded to the Proposed state model:

| Component set | Final state coverage |
|---|---|
| `btn` | Enabled, Hovered, Focused, Pressed, Disabled across primary/secondary and default/small |
| `btn-icon` | Enabled, Hovered, Focused, Pressed, Disabled |
| `settings-icon-button` | Default, Hovered, Focused, Pressed, Disabled |
| `link-action` | Default, Hovered, Focused, Pressed, Disabled across visible/reveal modes |
| `topbar-search` | Enabled, Hovered, Focused, Disabled |
| `_tabs__label` | Enabled, Hovered, Focused, Pressed, Checked, Disabled |
| `_chips__label` | Default, Hovered, Focused, Pressed, Active, Disabled |

Geometry/focus pass:

- Bound 71 atom variants/components to Proposed dimension, spacing, and radius variables.
- Added 14 `_focus-ring` layers in focused variants.
- Focus-ring stroke color binds to `button/focus/ring`.
- Focus-ring stroke width binds through Figma's side-specific stroke weight fields (`strokeTopWeight`, `strokeRightWeight`, `strokeBottomWeight`, `strokeLeftWeight`) rather than the aggregate `strokeWeight` field.
- Added `control/tab-chip/height` (`28px`) as a Proposed dimension mapping for compact tab/chip labels.

Additional state color mappings added during the atom state pass:

| Token group | Added mappings |
|---|---|
| Ghost button | pressed/disabled surface, pressed text |
| Icon button | enabled/hover/pressed/disabled surface |
| Icon stroke | disabled stroke |
| Link action | default/hover/pressed/disabled text |
| Input | hover/disabled surface, disabled border, disabled text |
| Tabs | pressed/disabled surface, disabled text |
| Chips | hover/pressed/disabled surface, disabled text |

Correction note:

- The first state-variant clone script created 41 generated components on Page 1 `As-is` because Figma's `clone()` placed them with the source main component before they were appended to a Proposed set.
- Those generated `308:*` nodes were removed immediately.
- The variants were recreated inside the Proposed atom component sets (`312:*` nodes).
- Final validation confirmed no generated `308:*` components remain on `As-is`.

## Final Validation

Final atom audit:

| Check | Result |
|---|---:|
| Atom instances pointing to Page 1 `As-is` | 0 |
| Atom text nodes using `as-is/` styles | 0 |
| Unbound visible atom fills/strokes | 0 |
| Focus rings | 14 |
| Interactive state families expanded | 7 |

Full Proposed page after Ch 3.3 still had remaining non-atom As-is links, intentionally deferred to Ch 3.4 and Ch 3.5.
