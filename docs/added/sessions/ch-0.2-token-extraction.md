# Session Log — Ch 0.2: Token Extraction & Component Catalog

**Date:** 2026-05-12
**Agent:** Claude Opus 4.6
**Duration:** Single session

## What was done

1. Read the complete `the-ledger.html` (2125 lines) end-to-end
2. Extracted every CSS custom property, computed oklch → hex for all 19 color tokens
3. Cataloged all font declarations: 28 unique font sizes, 4 fluid clamp() scales, 27 Fraunces variation settings combinations, 20 letter-spacing values, 9 line-height values
4. Documented all spacing: padding, margin, gap values with anomaly analysis against a 4px grid
5. Documented all borders, sizing, grid proportions, transitions, animations, and responsive breakpoints
6. Cataloged 13 atoms, 16 molecules, 9 organisms with all their interactive states
7. Built a state inventory mapping every component to the Figma states it requires
8. Identified 3 unused CSS tokens (`--paper-edge`, `--red-soft`, `--blue-soft`)

## Output files

- `docs/added/01-token-extraction.md` — Complete token reference (colors, typography, spacing, borders, sizing, motion, breakpoints)
- `docs/added/02-component-catalog.md` — Component catalog (atoms, molecules, organisms, JS behaviors, Figma state inventory)

## Key findings

- **Spacing is not on a grid.** Values like 7, 9, 11, 13, 14, 22, 26px all approximate but don't land on 4px or 8px. Normalization in Phase 1.2 will need to round these.
- **Three color tokens are defined but never used** in any CSS rule: `--paper-edge`, `--red-soft`, `--blue-soft`.
- **No focus states exist** on any interactive element. Keyboard users get no visual indicator.
- **Transition durations cluster at 160ms and 180ms** with no clear pattern for which gets which. Normalization could unify these.
- **Coach notes are the only card-like component** (2px colored top rule + paper bg), consistent with guardrails.
- **Budget bar is the most state-complex atom** (default/over/warn fills + optional marker tick + hover-reveal edit links).
- **Font variation settings cover 27 unique opsz/SOFT combos** — a large surface area for the Figma recreation.

## What's next

Ch 0.3: Quick accessibility scan — tab order, focus indicators, ARIA inventory, keyboard model. Findings fold into `02-component-catalog.md`.
