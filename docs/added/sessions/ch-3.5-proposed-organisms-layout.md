# Ch 3.5 — Proposed Organisms and Shell Layout

Date: 2026-05-13

Status: Complete.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

## Scope

This chapter propagated the Proposed component/token system into organisms and the full dashboard mockup.

Goals:

- Create Proposed-local organism masters.
- Rewire organisms and the full mockup away from Page 1 `As-is` masters.
- Bind organism and mockup typography, fills, strokes, shell dimensions, row heights, and spacing to Proposed tokens.
- Apply the planned layout foundation fixes without beginning Phase 4 feature work.

## Starting Audit

Before this chapter:

| Section | Page 1 `As-is` instance links |
|---|---:|
| `Organisms — Proposed` | 330 |
| `Recreation validation` | 171 |

The remaining links were mostly As-is organism masters and their nested molecule/atom dependencies.

## Proposed Organism Masters Created

Created in place from the visible Proposed organism specimens:

| Component | Proposed master id |
|---|---|
| `sidebar` | `335:5259` |
| `topbar` | `335:5272` |
| `statusbar` | `335:5300` |
| `hero` | `335:5334` |
| `middle` | `335:5371` |
| `double` | `335:5398` |
| `goals` | `335:5405` |
| `coach` | `335:5424` |
| `alerts` | `335:5432` |

Relink result:

| Check | Result |
|---|---:|
| New Proposed organism masters | 9 |
| Organism/mockup instances swapped | 492 |
| Relink misses | 0 |

## Token Binding

Applied Proposed text styles and color variables across:

- `Organisms — Proposed`
- `Recreation validation`

Final style/paint validation for both sections:

| Check | Result |
|---|---:|
| Text nodes using `as-is/` styles | 0 |
| Unbound visible solid fills/strokes | 0 |

## Shell and Rhythm Binding

Existing Ch 3.2 layout variables were used rather than adding a new broad scale.

Key mapped values:

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

Bindings applied:

| Binding area | Count |
|---|---:|
| Width bindings | 4 |
| Height bindings | 80 |
| Gap bindings | 232 |
| Padding bindings | 72 |

Layout corrections addressed:

- Topbar and sidebar brand now share the same mapped height (`56`).
- Statusbar and sidebar footer now share the same mapped height (`40`).
- Sidebar shell width is mapped to the Proposed shell dimension token (`256`).
- Row heights use the Proposed row dimension mappings.
- Organism spacing uses vertical rhythm mappings, keeping the DESIGN.md 20px section padding guardrail intact.

## Visual QA

Screenshot QA was run on `Recreation validation` after token/layout binding.

Observation:

- The full Proposed mockup remained renderable and self-contained after relinking.
- The layout now shows the tokenized Proposed Figma design beside the source screenshot for review.
- The right sidebar validation column remains tall because the dashboard mockup spans the full long-form page height; this is a mockup-layout artifact, not a component-link issue.

No Quick-create, Search, or fix-what's-broken Phase 4 deliverables were started.
