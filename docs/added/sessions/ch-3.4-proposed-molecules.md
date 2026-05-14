# Ch 3.4 — Proposed Molecules

Date: 2026-05-13

Status: Complete.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

## Scope

This chapter propagated the Proposed atom/token system into the molecule layer.

Goals:

- Rewire molecule instances away from Page 1 `As-is` masters.
- Create missing Proposed-local molecule masters.
- Bind molecule text and visible paints to `proposed/` styles and variables.
- Preserve the Page 1 `As-is` baseline unchanged.

## Starting Audit

`Molecules — Proposed` still had 20 instance links to Page 1 masters.

Grouped examples:

| As-is source | Count |
|---|---:|
| `sidebar-brand` | 1 |
| `hero-kicker` | 1 |
| `hero-delta` | 1 |
| `legend` | 1 |
| `coach-stat` | 4 |
| `marginalia` | 1 |
| `sidebar-foot` | 1 |
| nested atom/variant links (`trend-indicator`, `swatch`, `new-entry-dot`, `roman`, `settings-icon-button`, `Icon`) | 10 |

## Proposed Molecule Masters Created

Created in place from the visible Proposed molecule specimens:

| Component | Proposed master id |
|---|---|
| `sidebar-brand` | `327:5199` |
| `hero-kicker` | `327:5205` |
| `hero-delta` | `327:5212` |
| `legend` | `327:5222` |
| `coach-stat` | `327:5226` |
| `marginalia` | `327:5230` |
| `sidebar-foot` | `327:5238` |

After those masters existed, a name/variant relink pass swapped nested As-is references to their Proposed equivalents.

Relink result:

| Check | Result |
|---|---:|
| New Proposed molecule masters | 7 |
| Nested molecule/atom instances swapped | 12 |
| Relink misses | 0 |

## Token Binding

Applied Proposed text styles and color variable bindings across `Molecules — Proposed`.

The pass used:

- `proposed/display/small` for brand-like display text.
- `proposed/heading/section` and `proposed/heading/subsection` for molecule headings.
- `proposed/body/default`, `proposed/body/small`, and `proposed/label/*` for dense labels and metadata.
- `proposed/number/table` and `proposed/number/kpi` for financial numbers.
- Proposed color mappings such as `text/primary`, `text/muted`, `section/surface/default`, `section/rule/default`, `ledger-row/*`, `budget-bar/*`, `nav/item/*`, and accent mappings.

## Final Validation

Final molecule audit:

| Check | Result |
|---|---:|
| `Molecules — Proposed` instances pointing to Page 1 `As-is` | 0 |
| Text nodes using `as-is/` styles | 0 |
| Unbound visible solid fills/strokes | 0 |

No Phase 4 feature deliverables were started in this chapter.
