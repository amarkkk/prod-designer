# Ch 3.1 — Token Normalization and Proposed Page Setup

Date: 2026-05-13

Status: Complete pending review.

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

## Scope

Chapter 3.1 created the `Proposed` page foundation only. No Phase 4 flows were designed: no Quick-create, no Search / Command palette, and no fix-what's-broken redesigns.

The `As-is` page remains the locked source-backed baseline. Existing grouped `as-is/` color and text styles were not edited, renamed, normalized, deleted, or rebound.

## Required Reads

Read before Figma work:

- `docs/added/context/ch-3.1-token-normalization-kickoff-prompt.md`
- `docs/added/00-master-plan.md`
- `docs/added/_index.md`
- `docs/added/guardrails.md`
- `docs/added/reference/01-token-extraction.md`
- `docs/added/reference/02-component-catalog.md`
- `docs/added/reference/03-design-system-principles.md`
- `docs/added/dsb/Chapter_04_Accessibility_v3-1.md`
- `docs/added/dsb/Chapter_05_Responsiveness_v3-3.md`
- `docs/added/dsb/Chapter_06_Component_Anatomy_v3-2.md`
- `docs/added/dsb/Chapter_07_Design_Tokens_v3-2.md`
- `docs/added/dsb/Chapter_10_Typography_v3-3.md`
- `docs/added/sessions/ch-2.3-organisms.md`
- `docs/added/review/ch-2.3-organism-mockup-deep-audit.md`

## Principles Validation

`docs/added/reference/03-design-system-principles.md` was patched before Figma edits.

Validation result:

- Kept the DSB foundation → alias → mapping model as the reference architecture.
- Initial Ch 3.1 pass reduced the implementation to compact alias-led variables, composite proposed text styles, and no broad component mapping collection. Post-review correction supersedes this for future work: Ch 3.2-Ch 3.6 must build the full foundation → alias → mapping system.
- Updated the typography guidance from a generic 16px-base scale to a dense-app scale anchored by `body/default` at `14px / 20px`.
- Added the vertical rhythm rule: `20px` body rhythm plus a 4px micro-grid, with documented exceptions.
- Initial Ch 3.1 pass deferred density and responsive variable modes. Post-review correction keeps density optional but requires color foundation modes for dark-mode capability in Ch 3.2.
- Replaced stale "Phase 1.2" directional language with Ch 3.1 proposed-page decisions.

DSB validation notes:

- Ch 4 supports token-level contrast, focus, motion, and target sizing. Applied as `focus/ring`, `focus/width`, `focus/offset`, and alias-level contrast checks.
- Ch 5 supports variables and modes, but also warns against unnecessary complexity. Default-only variables are enough until Phase 4 proves density or breakpoint modes are needed.
- Ch 6 supports anatomy-first component mapping, but Page 1 showed the risk of parent × child state explosion. Component mapping tokens are deferred until a proposed component needs them.
- Ch 7 supports layered tokens, but explicitly allows small systems to collapse layers. The Ledger uses collections by domain rather than a full foundation/alias/mapping trio per domain.
- Ch 10 supports paired size/line-height decisions and dense app UI type scales. Composite text styles are the practical Figma typography tokens.

## Figma Work

Created `Proposed` by duplicating the completed `As-is` page and renaming only the duplicate.

Page IDs:

| Page | ID | Notes |
|---|---|---|
| `As-is` | `0:1` | Locked source baseline; unchanged |
| `Proposed` | `249:2488` | Duplicate of `As-is`; Ch 3.1 work added here |

Added a token specimen board on `Proposed`:

| Node | ID | Notes |
|---|---|---|
| `Token System — Proposed / Ch 3.1` | `256:5169` | Color, spacing, typography, and rhythm specimen board |
| `Vertical Rhythm Specimen — Proposed` | `256:5324` | Compact 20px rhythm specimen inside the board |

Board placement: x `11443`, y `0`, size `1460 × 2040`, to the right of the duplicated Page 1 content.

## Variable Collections

| Collection | ID | Mode | Count | Purpose |
|---|---|---:|---:|---|
| `Proposed / Color` | `VariableCollectionId:253:2488` | `Default` | 18 | Semantic paper, ink, rule, accent, and focus colors |
| `Proposed / Space` | `VariableCollectionId:253:2489` | `Default` | 23 | Rules, spacing scale, rhythm, fixed shell dimensions, focus offsets, radius |
| `Proposed / Type` | `VariableCollectionId:253:2490` | `Default` | 34 | Font family/style strings, weights, sizes, line-heights, letter-spacing support values |

All variables have explicit Figma scopes. No variables use default `ALL_SCOPES`.

## Color Tokens

Color values stay close to source because the source palette already encodes the printed-ledger metaphor and strict semantic color rules.

| Proposed token | Hex | Source token | Role |
|---|---:|---|---|
| `paper/canvas` | `#eae0d2` | `--paper-deep` | Page canvas and document background |
| `paper/surface` | `#f2eade` | `--paper` | Primary paper surface |
| `paper/interactive` | `#f7f1e8` | `--paper-soft` | Subtle hover / interactive fill |
| `paper/sunken` | `#e1d6c7` | `--paper-sunk` | Rail hover and inset surface |
| `ink/primary` | `#190f0a` | `--ink` | Primary text and strongest rules |
| `ink/secondary` | `#433b37` | `--ink-soft` | Secondary text |
| `ink/muted` | `#746d68` | `--ink-mute` | Labels and metadata |
| `ink/faint` | `#9d9792` | `--ink-faint` | Lowest emphasis |
| `rule/strong` | `#190f0a` | `--ink` | Structural borders |
| `rule/default` | `#c6bcaf` | `--rule` | Standard hairlines |
| `rule/subtle` | `#d8d0c4` | `--rule-soft` | Dense row dividers |
| `accent/debit` | `#7f2117` | `--red` | Debits, alerts, over-budget, active nav |
| `accent/debit/wash` | `#f4dbd4` | `--red-wash` | Debit chart wash |
| `accent/credit` | `#17495a` | `--blue` | Credits, income, positive deltas |
| `accent/credit/wash` | `#d7e8ee` | `--blue-wash` | Credit chart wash |
| `accent/warning` | `#a17833` | `--gold` | Warnings and near-limit states |
| `accent/confirm` | `#50663a` | `--olive` | Confirmation and on-pace states |
| `focus/ring` | `#190f0a` | Proposed alias | Keyboard focus ring |

Unused source tokens `--paper-edge`, `--red-soft`, and `--blue-soft` remain evidence only.

## Spacing Tokens

| Proposed token | Value | Class | Source values normalized / use |
|---|---:|---|---|
| `rule/hairline` | 1px | micro | Standard dividers |
| `rule/accent` | 2px | micro | Coach top rules, active nav |
| `rule/emphasis` | 3px | micro | Over-budget bar emphasis |
| `space/micro/4` | 4px | micro | Dots, tiny offsets, compact icon gaps |
| `space/micro/6` | 6px | micro | Deliberate serif-control optical exception |
| `space/micro/8` | 8px | micro | 7/8/9px gaps and small padding |
| `space/meso/12` | 12px | meso | 11/12/13px component padding |
| `space/meso/16` | 16px | meso | Section-header gaps and row groups |
| `space/meso/20` | 20px | meso | Guardrail section padding and rhythm base |
| `space/meso/24` | 24px | meso | 22/24/26px local layout gaps |
| `space/macro/32` | 32px | macro | 28/32px section gaps |
| `space/macro/40` | 40px | macro | Desktop page/topbar side padding |
| `space/macro/48` | 48px | macro | Middle/double desktop column gap |
| `space/macro/64` | 64px | macro | Hero desktop column gap |

Additional support variables:

| Token | Value | Purpose |
|---|---:|---|
| `rhythm/base` | 20px | Body/default line-height and vertical rhythm |
| `rhythm/half` | 10px | Source-compatible rhythm fraction |
| `rhythm/quarter` | 5px | Tight offset exception |
| `dimension/sidebar-width` | 248px | Source shell width retained |
| `dimension/topbar-height` | 56px | Source shell height retained |
| `dimension/statusbar-height` | 38px | Source shell height retained |
| `focus/width` | 2px | Focus ring stroke width |
| `focus/offset` | 2px | Focus ring offset |
| `radius/none` | 0px | Ledger controls remain square |

## Typography Tokens

Typography is represented as composite `proposed/` text styles. This was the initial Ch 3.1 scaffold; Ch 3.2 later rebound the active `proposed/` text styles to layered type aliases where Figma supports it.

| Text style | Family | Size | LH | LS | Role |
|---|---|---:|---:|---:|---|
| `proposed/display/hero` | Fraunces Regular | 112 | 96 | -2% | Desktop hero specimen; document clamp 56-112 |
| `proposed/display/small` | Fraunces Regular | 32 | 36 | -1% | Large stats |
| `proposed/heading/section` | Fraunces Regular | 24 | 28 | 0 | Section headings |
| `proposed/heading/subsection` | Fraunces Regular | 20 | 24 | 0 | Panel titles |
| `proposed/body/comfortable` | Newsreader Regular | 16 | 24 | 0 | Longer explanatory copy |
| `proposed/body/default` | Newsreader Regular | 14 | 20 | 0 | Dense dashboard body and rhythm source |
| `proposed/body/small` | Newsreader Regular | 13 | 18 | 0 | Compact body and metadata |
| `proposed/label/default` | Newsreader SemiBold | 12 | 16 | 0.5px | Buttons, tabs, chips |
| `proposed/label/small` | Newsreader SemiBold | 11 | 14 | 0.55px | Eyebrows and row actions |
| `proposed/label/micro` | Newsreader Bold | 10 | 12 | 0.6px | Sparing dense labels |
| `proposed/number/table` | Fraunces Regular | 14 | 20 | 0 | Table and budget amounts |
| `proposed/number/kpi` | Fraunces Regular | 22 | 24 | 0 | KPI values |
| `proposed/number/cents` | Fraunces Regular | 10 | 10 | 0 | Cents specimen; runtime should use 0.42em |

All financial number styles require lining tabular numerals in implementation. Figma text styles document this in descriptions because the composite style cannot reliably encode all OpenType and variable-font settings through this workflow.

## Vertical Rhythm Model

Base rhythm: `20px`, derived from `proposed/body/default` line-height (`14px / 20px`).

Model:

- Use 20px as the main body rhythm unit.
- Use the 4px micro-grid for padding, rules, focus offsets, and compact component geometry.
- Keep rows on 4px increments, then check them against the 20px rhythm for explainability.
- Do not force every dashboard value onto integer rhythm multiples; this would damage dense finance-table ergonomics.

Checked examples:

| Surface | Proposed checkpoint | Rhythm relationship |
|---|---:|---|
| Notice row | 44px | 2.2 rhythm units; compact but 4px-aligned |
| Distribution row | 56px | 2.8 rhythm units; close to source 54.5 and 4px-aligned |
| Ledger row | 60px | 3 rhythm units |
| Budget row | 72px | 3.6 rhythm units; matches dense two-line budget rows |
| Section gap | 32px | Macro checkpoint; 1.6 rhythm units |
| Body copy | 20px line-height | Rhythm source |
| Comfortable copy | 24px line-height | 1.2 rhythm units; used only where copy length requires it |

Explicit exceptions:

- 1px hairlines and 2px/3px emphasis rules.
- 1.5px chart/bar marks inherited from the source chart language.
- 5px and 10px rhythm fractions for source-compatible local offsets.
- Single-line controls, where optical centering and hit target matter more than strict baseline alignment.

## Dark Mode Recommendation

Do not build a full dark dashboard in Ch 3.1.

Recommendation:

- Treat dark mode as a future token mode only after Phase 4 has concrete proposed components.
- If needed, start with topbar/statusbar/sidebar chrome, not the full dashboard content surface.
- Keep warm neutrals rather than introducing cool slate/blue greys.
- Re-validate semantic accent contrast in dark contexts before adding a mode.

No dark-mode Figma mode was created in this chapter.

## Density Recommendation

Do not build compact/default/relaxed modes in Ch 3.1.

Recommendation:

- `Default` remains the only Figma variable mode for now.
- Future `Compact` can reduce meso row padding and macro section gaps, but must preserve readable text floors and 24px minimum target sizing.
- Future `Relaxed` can be useful for presentation/review frames, but should not become the primary finance-dashboard default.

No density Figma modes were created in this chapter.

## Proposed Style Groups

Color styles created under `proposed/`:

| Style | ID |
|---|---|
| `proposed/accent/confirm` | `S:cfb8b295a77f4ea70d2d2596105312d05b19c377,` |
| `proposed/accent/credit` | `S:54a59825eb7fae7cd88f8ae4395710375086fdcd,` |
| `proposed/accent/credit/wash` | `S:6ecb2bd08643530abfe2a4c76bd6b7c9be1e753f,` |
| `proposed/accent/debit` | `S:d627a1a334ad9d89735c909c1f537f87eae1a806,` |
| `proposed/accent/debit/wash` | `S:8f931dd44f4580ad2955e3a5ffe5eb1b29c3a71a,` |
| `proposed/accent/warning` | `S:56d205fb0d87c85022a905b3c49c8e4734396dfb,` |
| `proposed/focus/ring` | `S:76afc5b7da1212b48b778b07a07692077b37fe07,` |
| `proposed/ink/faint` | `S:03ca82e55138f4011693065a454e56b8ff6aa750,` |
| `proposed/ink/muted` | `S:551a429ea6a265250befdf2517282f4311a82d33,` |
| `proposed/ink/primary` | `S:1d39ae886ffaa52f7887b3642a07b447cc74be49,` |
| `proposed/ink/secondary` | `S:47e57c8179cbd9c37ad428de7c391ba792fcc253,` |
| `proposed/paper/canvas` | `S:b4e1193858cca61319675a4190d8cae5533ef025,` |
| `proposed/paper/interactive` | `S:a1bf030640075badf9b6dba0f5767b33029f9912,` |
| `proposed/paper/sunken` | `S:8b4106eb91d010133f995c8705ae0528bd73cae7,` |
| `proposed/paper/surface` | `S:8c36b019d4217e258d1761408ce0878a3ba131d5,` |
| `proposed/rule/default` | `S:9d45c095dd368a46efc56e993490ec33406832a9,` |
| `proposed/rule/strong` | `S:4478d9340bf1da780112ab74380d233dbc61d644,` |
| `proposed/rule/subtle` | `S:2f2a91d35d4c3835a5f41f638c10b2eefb57874c,` |

Text styles created under `proposed/`:

| Style | ID |
|---|---|
| `proposed/body/comfortable` | `S:8821902065d0bf47072959a1a26e8d1ead7b4ec0,` |
| `proposed/body/default` | `S:d47dc98229fc4818af7044dd1d833e33dc35f212,` |
| `proposed/body/small` | `S:de35c14426080d5815add48e37b24e972372588c,` |
| `proposed/display/hero` | `S:e7f5df1b5e854fd7567fbb85da1f6e9dc214fb07,` |
| `proposed/display/small` | `S:82918a46e19c78582dddd06127918005775d1e34,` |
| `proposed/heading/section` | `S:09647c020d8c11ea11bc9cd0d4bd3362624db4ec,` |
| `proposed/heading/subsection` | `S:ac71ee8cda0930b60937ffe2ea0f8c0a2476283d,` |
| `proposed/label/default` | `S:cd2fc7d6ca7c3a09775e03ef8c8da1a8baf07ee9,` |
| `proposed/label/micro` | `S:710312180be8e66cdc1932dac8609b81174655db,` |
| `proposed/label/small` | `S:c31c909b4e9465271604779ed57ca5b5e83b225e,` |
| `proposed/number/cents` | `S:530a01e2358a3134640c37b8c20817d8d1ee6b3d,` |
| `proposed/number/kpi` | `S:b5f1d4aad70b840f9cfd72745baa1a3f9874c138,` |
| `proposed/number/table` | `S:16fe0a5caeec98b35dcc39b356d480edfb5bac47,` |

## Validation

Figma validation:

- `Proposed` page exists and is a duplicate of `As-is`.
- Page order: `As-is` (`0:1`), `Proposed` (`249:2488`).
- `As-is` style counts after work: `17` `as-is/` paint styles, `116` `as-is/` text styles.
- Proposed variable collections: `3`.
- Proposed variables: `75`.
- Proposed paint styles: `18`.
- Proposed text styles: `13`.
- Token board text audit: `127` text nodes, `0` missing text styles, `0` non-`proposed/` text styles.
- Token board paint audit: `177` solid fills and `23` solid strokes, all bound to proposed color variables; `0` unbound solid paints.
- Board screenshot reviewed after fixing a type-sample overlap.

Local docs changed:

- Patched `docs/added/reference/03-design-system-principles.md`.
- Added this session log.
- Updated `docs/added/00-master-plan.md` with the completed Ch 3.1 status and handoff.
- Updated `docs/added/_index.md` with the Ch 3.1 session entry.

## Decisions

- Color normalization is mostly semantic naming, not palette redesign.
- Spacing normalization uses a 4px grid with one deliberate 6px micro exception.
- Body/default is `14px / 20px`; the 20px line-height defines the rhythm.
- Text styles are the primary typography design tokens.
- No component mapping collection was created yet.
- No dark mode or density modes were created; both remain documented future recommendations.
- No Page 1 `As-is` cleanup or rebinding was performed.

## Unresolved Questions

- Which component mapping collections should be created first in Ch 3.2-Ch 3.3 for buttons, nav rows, chips, search, and status surfaces.
- Whether the proposed hero display should stay at desktop `112px` or return to the source `116px` after actual redesign work begins.
- Whether compact density needs to be a formal variable mode or only component variants once proposed flows exist.
- Whether a minimal dark mode is valuable for top/status/navigation chrome in the final prototype, or if light-only better supports the ledger metaphor.

## Post-Review Scope Correction

Added after review on 2026-05-13.

Ch 3.1 should be treated as an initial scaffold, not as the complete Proposed design-system foundation.

Review correction:

- `Proposed` must be a shippable, tokenized design-system page, not a renamed copy with a small alias token set.
- Proposed components must be self-contained. Nested instances and variants on Proposed should point to Proposed-local masters, not Page 1 `As-is` masters.
- Proposed needs a foundation → alias → mapping token network similar in architecture to the supplied reference variable table.
- Proposed atoms must be retokenized first, then molecules, then organisms and the full mockup.
- Interactive Proposed components need full states: enabled/default, hover, focus, pressed, disabled.
- Guardrails and `docs/original/DESIGN.md` remain binding. The earlier "source states only" limitation applied only to Page 1 `As-is`.

Figma audit after the duplicate:

| Check | Result |
|---|---:|
| Proposed instances | 617 |
| Instances still pointing to Page 1 `As-is` masters | 529 |
| Instances pointing to Proposed-local masters | 88 |
| Missing main components | 0 |

Examples:

- `249:2925` `dot` correctly points to Proposed master `249:2587`.
- `249:2557` `notification-badge` incorrectly points to As-is master `45:17`.

Applied immediate correction on `Proposed` only:

- Renamed visible `As-is` page/section/sample labels to `Proposed`.
- Corrected token board copy to clarify that Page 1 `As-is` remains intact and Proposed retokenization/reconnection is pending.

Planning follow-up:

- Added `docs/added/sessions/ch-3.2-proposed-system-plan.md`.
- Expanded Phase 3 in `docs/added/00-master-plan.md` into Ch 3.2-Ch 3.6.
- Do not start Phase 4 deliverables until Ch 3.6 passes.

## Ch 3.2/3.3 Correction Notes

Added after token execution began on 2026-05-13.

- Figma-bound `letterSpacing` values resolve as pixels, not percentages. The label text styles were corrected from the earlier percentage intent to `0.5px`, `0.55px`, and `0.6px`.
- The flat Ch 3.1 collections were renamed in Figma to `Legacy Ch 3.1 Proposed / Color (scaffold)`, `Legacy Ch 3.1 Proposed / Space (scaffold)`, and `Legacy Ch 3.1 Proposed / Type (scaffold)`.
- New work must use the layered Ch 3.2 collections and the Ch 3.3 component mapping additions, not the legacy scaffold collections.
