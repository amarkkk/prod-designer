# Design System Principles — The Ledger

Synthesized from Design System Book chapters 4, 5, 6, 7, 10. Filtered to actionable takeaways for this project. Read alongside `01-token-extraction.md` (raw values) and `02-component-catalog.md` (component inventory) — both in this `reference/` folder.

---

## 1. Token Architecture

### Three-layer model (Ch 7)

| Layer | What it holds | Figma collection | Example |
|-------|---------------|-------------------|---------|
| **Foundation** | Raw values — every color, size, spacing number | `Color - 1. Foundation`, `Size - 1. Foundation` | `warm/80/94` → `#f2eade` |
| **Alias** | Semantic names referencing foundations | `Color - 2. Alias`, `Size - 2. Alias` | `paper/default` → `{warm/80/94}` |
| **Mapping** | Component-scoped tokens referencing aliases | `Color - 3. Mapping`, `Size - 3. Mapping` | `sidebar/bg/default` → `{paper/deep}` |

Typography skips the mapping layer — composite text styles serve as mapping. Create foundation variables for raw sizes and weights, alias variables for semantic roles (`body/default`, `heading/section`), then build Figma text styles directly from aliases.

### Naming conventions

**Color aliases:** `{role}/{usage}/{element}/{strength}/{context}/{state}`
- Segments omitted when default: `paper/default` not `paper/default/default/default/default/default`
- Ledger colors map to 4 roles: `paper` (backgrounds), `ink` (foreground), `rule` (dividers), `accent` (semantic color)
- Accent sub-roles: `accent/debit` (red), `accent/credit` (blue), `accent/warning` (gold), `accent/confirm` (olive)

**Mapping tokens:** `{component}/{role}/{variant}/{element}/{context}/{state}`
- Example: `ledger-row/ink/default/amount/debit/default` → `{accent/debit/default}`
- Example: `sidebar-nav/paper/default/bg/default/hovered` → `{paper/sunk}`

**Spacing aliases:** flatten responsive modes into single tokens
- `space/section-pad` → resolves to 20px (desktop), can change per mode
- `space/gap/tight` → 4px, `space/gap/default` → 8px, etc.

### What The Ledger needs

The as-is HTML defines 19 color custom properties, 3 layout dimensions, and ~18 distinct padding values with no coherent scale. For the proposed page:

1. **Foundation:** 19 oklch→hex color values + normalized spacing scale (4px base: 4, 8, 12, 16, 20, 24, 32) + type size scale
2. **Alias:** semantic names for paper/ink/rule/accent roles, spacing by purpose, type by role
3. **Mapping:** per-component tokens only where a component needs to override the alias (e.g., sidebar uses `paper-deep` not `paper` for background)

The as-is page uses raw hex values directly — no variable system.

---

## 2. Component Anatomy (Ch 6)

### Three anatomies per component

1. **Structural anatomy** — the element tree (container, slots, regions). Becomes the Figma layer tree.
2. **Variant anatomy** — the axes that create different versions (size, style, scheme). Becomes Figma component properties.
3. **State anatomy** — interactive states (enabled, hovered, pressed, focused, disabled). Becomes variant axis or interactive component states.

### Dissection method (7 steps)

Apply to each component before building in Figma:

1. **Identify** — name it, classify (atom/molecule/organism)
2. **Structural anatomy** — container, slots, regions, fixed vs flexible areas
3. **Variant anatomy** — which axes? (e.g., button: Style × Scheme × Size)
4. **State anatomy** — which interactive states? (5 standard: enabled/hovered/pressed/focused/disabled)
5. **Token binding** — which mapping tokens attach to which elements?
6. **Responsive behavior** — what changes at breakpoints? (value scaling vs layout reflow)
7. **Accessibility contract** — role, label, keyboard model, focus management

### Naming in Figma

Hybrid BEM: `block__element--modifier`
- Block = component name: `sidebar-nav`
- Element = structural part: `sidebar-nav__label`, `sidebar-nav__icon`
- Modifier = variant: `sidebar-nav--active`

Layer naming in Figma mirrors this. Internal layers that users shouldn't interact with get underscore prefix: `_focus-ring`, `_slot-wrapper`.

### Figma structure = code structure

The Figma layer tree should match the DOM tree. A `<button>` with `<span class="label">` and `<svg class="icon">` becomes a Figma frame with a text layer "label" and an icon instance "icon" — same nesting, same naming.

### Wrapper layers for atoms in composites

When an atom (button, chip) sits inside a molecule (section-header), wrap it in a frame named `_button-slot`. This lets the molecule control layout without overriding the atom's internal auto-layout.

---

## 3. Typography (Ch 10)

### Text style categories

| Category | Line-height | Letter-spacing | Example in Ledger |
|----------|-------------|----------------|-------------------|
| **Shortform** (headings, display) | 100–115% | Tight (negative ok) | Hero balance, section headings |
| **Longform** (body, paragraphs) | 140–170% | Normal (0–0.02em) | Coach note body |
| **UI labels** (buttons, chips, meta) | Match control height | Wide (0.04em+) | Tabs, chip labels, sidebar labels |

### Type scale approach

The Ledger uses 28+ distinct font sizes — many fractional (9.5px, 10.5px, 11.5px, 12.5px). For the proposed page, normalize to a fixed-step scale anchored at 16px base. Suggested scale using √2 minor third (factor ~1.189):

| Step | Size | Round to | Usage |
|------|------|----------|-------|
| -3 | 9.5px | 10px | Smallest labels (min viable — guardrails say body ≥13px, but labels are exempt) |
| -2 | 11.3px | 11px | Metadata, eyebrows |
| -1 | 13.4px | 13px | Small body, sidebar text |
| 0 | 16px | 16px | Base body |
| 1 | 19px | 19px | Large body, sub-headings |
| 2 | 22.6px | 23px | Section headings |
| 3 | 26.9px | 27px | Page title |
| 4+ | 32–116px | fluid | Hero display (clamp range) |

Note: the exact scale is a Phase 1.2 decision. This table is directional.

### Vertical trim for controls

Single-line UI elements (buttons, chips, input fields) use vertical trim or manual padding to center text optically. Line-height on these should be `1` (100%), with padding controlling the hit area. This avoids the "too much space above/below" problem with display line-heights on buttons.

### Fluid typography

Two kinds of responsive type:
- **Scaled sizes** (hero, headings): use `clamp(min, preferred, max)` with viewport-relative preferred value
- **Fixed sizes** (body, labels, metadata): stay constant across breakpoints

Check clamp slopes at target breakpoints (1240, 1080, 960, 720px) to ensure smooth interpolation. If slope is too steep between two breakpoints, use piecewise clamp (different clamp per media query range).

### Typography tokens in Figma

- **Foundation variables:** raw sizes (10, 11, 13, 16, 19, 23, 27, 32…), raw weights (300, 400, 500, 600, 700), raw line-heights (1, 1.15, 1.4, 1.6)
- **Alias variables:** `type/body/size` → `{16}`, `type/heading-section/size` → `{23}`, `type/label/weight` → `{600}`
- **Composite text styles** (Figma text styles, not variables): `Body/Default`, `Heading/Section`, `Label/Small` — each binds family + size alias + weight alias + line-height alias + letter-spacing
- No mapping layer for typography — the composite text style IS the mapping

---

## 4. Accessibility (Ch 4)

### Token-level accessibility

Accessibility is baked into the token system, not bolted on after:
- **Contrast:** validated at the alias layer. `ink/default` on `paper/default` must pass WCAG AA (4.5:1 for text, 3:1 for large text). The current Ledger palette passes — `#190f0a` on `#f2eade` is ~14:1.
- **Min sizes:** enforced via clamp() floor values. Body clamp floors must be ≥13px per guardrails.
- **Focus indicators:** defined as alias tokens (`focus/ring/color`, `focus/ring/width`, `focus/ring/offset`), consumed by every interactive component's mapping.

### Focus ring implementation

From the reference button pattern and Ch 4:
- Focus ring is a **separate positioned element**, not a Figma effect (shadow/stroke)
- Uses `:focus-visible` (keyboard only) — suppressed for mouse clicks
- Token: `focus/ring/color` → `{ink/default}`, `focus/ring/width` → 2px, `focus/ring/offset` → 2px
- In Figma: a nested frame named `_focus-ring` with stroke, absolutely positioned (constraints: stretch all sides with negative margin equal to offset)
- Visible only in Focused state variant

### Current gaps to fix (from Ch 0.3 audit)

| Gap | Principle violated | Fix for proposed page |
|-----|-------------------|----------------------|
| No custom focus styles | Focus as system infrastructure | Add `_focus-ring` to every interactive atom |
| Account list items not keyboard-accessible | Every interactive element must be focusable | Add button/link role, include in tab order |
| Opacity-0 links unreachable | Hidden interactive elements must have alternative access | Show on focus, or provide always-visible trigger |
| No h1 on page | Heading hierarchy must start at h1 | Add visually-hidden h1 or make hero heading h1 |
| No skip link | Bypass blocks for keyboard users | Add skip-to-content link before sidebar |
| Distribution items focusable but inert | Focusable = interactive or remove from tab order | Either add keyboard handler or remove tabindex |

### Touch targets

- Minimum: 24×24px (WCAG 2.2 Level AA)
- Enhanced: 44×44px (Level AAA, recommended for primary actions)
- The Ledger's sidebar nav items, tab radio inputs, and chip buttons need target size verification

### prefers-reduced-motion

Guardrails already mandate this. All transitions and animations must be wrapped in `@media (prefers-reduced-motion: no-preference)`. The proposed Figma page doesn't animate, but the HTML prototype update (Ch 4.1) must verify this.

---

## 5. Responsiveness (Ch 5)

### Desktop-locked reference frame

The Figma files are designed at desktop width only. Responsive behavior is documented, not designed frame-by-frame. This aligns with the master plan: "Desktop + one collapsed state for responsive."

### Two types of responsive change

1. **Value scaling** — sizes/spacing change fluidly via clamp(). Figma handles this through variable modes (e.g., a "compact" mode with smaller values).
2. **Layout reflow** — structure changes at breakpoints (sidebar collapses, columns stack). Figma handles this through separate component variants or a second frame.

### What The Ledger needs

For the proposed page, document responsive intent without building every breakpoint:

| Breakpoint | What changes | Type |
|------------|-------------|------|
| ≤1240px | Marginalia hidden | Layout reflow |
| ≤1080px | Ticker hidden, layouts stack | Layout reflow |
| ≤960px | Sidebar collapses to icons | Layout reflow — **this is the "one collapsed state" to design** |
| ≤720px | Search hidden, hero stacks | Layout reflow |
| All | Type sizes scale via clamp | Value scaling |

Only the 960px collapsed sidebar state needs a Figma variant. The rest is documented as behavior notes on the proposed mockup.

### Figma variable modes

If using modes for responsive values:
- Collection: `Size - 2. Alias`
- Mode 1: `Desktop` (default)
- Mode 2: `Compact` (960px and below)
- Only spacing and type size aliases that actually change between modes need two values

---

## 6. Component Building in Figma

Applies to both as-is and proposed pages. The structural principles (anatomy, naming, layer tree) are the same — only the value source differs.

### As-is vs proposed: what changes

| Aspect | As-is (Page 1) | Proposed (Page 2) |
|--------|----------------|-------------------|
| **Colors** | Figma color styles under `as-is/` folder | Figma variables (alias/mapping tokens) |
| **Typography** | Figma text styles under `as-is/` folder | Figma text styles (normalized composite tokens) |
| **Spacing** | Exact pixel values from HTML CSS | Figma variables (normalized scale) |
| **Focus states** | Reproduce browser `:focus-visible` default (blue ring) | Custom `_focus-ring` layer with design tokens |
| **Normalization** | None — if HTML says 9.5px, use 9.5px | Rounded to coherent scale |
| **Accessibility fixes** | Reproduce gaps faithfully | Fix gaps (skip link, heading hierarchy, etc.) |

### As-is Figma styles

Color styles and text styles live under an `as-is/` folder in Figma's local styles panel. This keeps the variable table clean for the proposed page's proper token system.

#### Color styles (`as-is/`)

Derived from the 16 used CSS custom properties in `01-token-extraction.md`:

| Style name | Hex | Source token |
|-----------|-----|-------------|
| `as-is/paper` | #f2eade | --paper |
| `as-is/paper-soft` | #f7f1e8 | --paper-soft |
| `as-is/paper-deep` | #eae0d2 | --paper-deep |
| `as-is/paper-sunk` | #e1d6c7 | --paper-sunk |
| `as-is/ink` | #190f0a | --ink |
| `as-is/ink-soft` | #433b37 | --ink-soft |
| `as-is/ink-mute` | #746d68 | --ink-mute |
| `as-is/ink-faint` | #9d9792 | --ink-faint |
| `as-is/rule` | #c6bcaf | --rule |
| `as-is/rule-soft` | #d8d0c4 | --rule-soft |
| `as-is/red` | #7f2117 | --red |
| `as-is/red-wash` | #f4dbd4 | --red-wash |
| `as-is/blue` | #17495a | --blue |
| `as-is/blue-wash` | #d7e8ee | --blue-wash |
| `as-is/gold` | #a17833 | --gold |
| `as-is/olive` | #50663a | --olive |

The 3 unused tokens (--paper-edge, --red-soft, --blue-soft) are omitted.

#### Text styles (`as-is/`)

Derived from distinct typography treatments in the HTML. Each style captures the exact CSS values — no normalization.

This is a starting inventory of the most reused typography patterns. Additional styles may be added during Figma construction as edge cases surface. All values are exact from the CSS — no normalization.

| Style name | Family | Size | Weight | LH | LS | Other | Usage |
|-----------|--------|------|--------|-----|-----|-------|-------|
| `as-is/display-hero` | Fraunces | 116px* | 400 | 0.86 | -0.03em | opsz 144, SOFT 30, tabular-nums | Hero balance |
| `as-is/display-brand` | Fraunces | 22px | 400 | 1 | -0.015em | opsz 48, SOFT 30 | Sidebar brand name |
| `as-is/display-goal` | Fraunces | 27px† | 400 | 1.05 | -0.012em | opsz 48, SOFT 40, tabular-nums | Goal amounts |
| `as-is/display-stat` | Fraunces | 28px | — | 1 | — | opsz 48, SOFT 30, tabular-nums | Coach stat number |
| `as-is/heading-topbar` | Fraunces | 18px | 400 | 1 | -0.008em | opsz 24, SOFT 40 | Topbar month title |
| `as-is/heading-kpi` | Fraunces | 14px | — | — | — | opsz 30, SOFT 30, tabular-nums | KPI figures |
| `as-is/label-kicker` | Newsreader | 10.5px | 600 | — | 0.22em | uppercase | Hero kicker, section eyebrows |
| `as-is/label-sidebar` | Newsreader | 9.5px | 700 | — | 0.24em | uppercase | Sidebar nav labels |
| `as-is/label-eyebrow` | Newsreader | 10px | 600–700 | — | 0.14–0.22em | uppercase | Goal/notice/status eyebrows |
| `as-is/label-action` | Newsreader | 10.5px | 600 | — | 0.10–0.14em | uppercase | Action links, edit links |
| `as-is/label-chip` | Newsreader | 10.5px | 600 | — | 0.10em | uppercase | Period tabs, filter chips |
| `as-is/body-default` | Newsreader | 13.5px | 400 | 1.55 | 0 | opsz 16 | Coach body text |
| `as-is/body-sidebar` | Newsreader | 13px | 400 | — | -0.005em | opsz 14, SOFT 80 | Sidebar account names |
| `as-is/body-table` | Newsreader | 13px | 500 | 1.2 | — | — | Ledger entry names |
| `as-is/body-btn` | Newsreader | 12.5px | 500 | — | 0.02em | — | Button labels |
| `as-is/body-small` | Newsreader | 11px | — | 1.4 | 0.04em | — | Small body, descriptions |
| `as-is/body-meta` | Newsreader | 10.5px | — | — | — | italic | Metadata, timestamps |
| `as-is/number-table` | Fraunces | 14px | — | — | — | opsz 30, SOFT 25–30, tabular-nums | Ledger/budget amounts |
| `as-is/number-fiscal` | Fraunces | 13.5px | — | — | — | tabular-nums | Budget category amounts |
| `as-is/number-cents` | Fraunces | 0.42em | — | — | — | tabular-nums | Cents suffix (relative to parent) |
| `as-is/input` | Newsreader | 13px | 400 | — | 0 | — | Search input |
| `as-is/input-placeholder` | Newsreader | 13px | 400 | — | 0 | italic | Search placeholder |
| `as-is/statusbar` | Newsreader | 11.5px | — | — | — | — | Status bar text |

\* Hero uses `clamp(56px, 8.5vw, 116px)`. At 1440px viewport = 116px. Figma gets the max value (desktop reference frame).
† Goals use `clamp(22px, 2.1vw, 27px)`. At 1440px = 27px. Figma gets the max value.

Dashes (—) mean the value inherits from the element's context or isn't explicitly set in CSS. These will be resolved to concrete values during Figma construction by checking computed styles.

### Checklist — every component, both pages

#### Before building

- [ ] Identify: name, atomic level, parent compositions (from `02-component-catalog.md`)
- [ ] Structural anatomy: layer tree sketch (container → slots → elements)
- [ ] Variant axes: which properties create variants? (from component catalog state inventory)
- [ ] State list: which interactive states exist in the HTML CSS? (hover, focus-visible, active, checked, disabled)

#### During building

- [ ] Layer names follow hybrid BEM: `block__element`, internal layers prefixed `_`
- [ ] Figma layer tree mirrors DOM structure
- [ ] Auto-layout matches CSS flex model (direction, gap, padding, alignment)
- [ ] Boolean properties for optional slots (icons, badges, hints)
- [ ] Text content exposed as component text properties
- [ ] Atoms inside molecules wrapped in `_slot-wrapper` frames
- [ ] **As-is:** color fills use `as-is/` color styles, text uses `as-is/` text styles, spacing is exact pixel values
- [ ] **Proposed:** color fills use Figma variables (alias/mapping), text uses proposed text styles, spacing uses variables

#### After building

- [ ] Variant matrix: annotated grid showing all state/variant combinations
- [ ] Visual verification against HTML screenshot at same viewport width
- [ ] States verified: every interactive state from the CSS has a corresponding variant

---

## 7. Ledger-Specific Decisions

Decisions derived from cross-referencing book principles with extracted tokens and guardrails. These are proposals for Phase 1.2 and Phase 2 execution.

### Color token structure

```
Foundation (Collection: "Color - 1. Foundation")
├── warm/
│   ├── 80/94  → #f2eade (paper)
│   ├── 80/96  → #f7f1e8 (paper-soft)
│   ├── 76/91  → #eae0d2 (paper-deep)
│   ├── 74/88  → #e1d6c7 (paper-sunk)
│   ├── 75/80  → #c6bcaf (rule)
│   ├── 78/86  → #d8d0c4 (rule-soft)
│   ├── 50/18  → #190f0a (ink)
│   ├── 50/36  → #433b37 (ink-soft)
│   ├── 55/54  → #746d68 (ink-mute)
│   └── 60/68  → #9d9792 (ink-faint)
├── red/
│   ├── 30/40  → #7f2117
│   └── 35/91  → #f4dbd4 (wash)
├── blue/
│   ├── 225/38 → #17495a
│   └── 220/92 → #d7e8ee (wash)
├── gold/
│   └── 78/60  → #a17833
└── olive/
    └── 130/48 → #50663a

Alias (Collection: "Color - 2. Alias")
├── paper/default      → {warm/80/94}
├── paper/soft         → {warm/80/96}
├── paper/deep         → {warm/76/91}
├── paper/sunk         → {warm/74/88}
├── ink/default        → {warm/50/18}
├── ink/soft           → {warm/50/36}
├── ink/mute           → {warm/55/54}
├── ink/faint          → {warm/60/68}
├── rule/default       → {warm/75/80}
├── rule/soft          → {warm/78/86}
├── accent/debit       → {red/30/40}
├── accent/debit/wash  → {red/35/91}
├── accent/credit      → {blue/225/38}
├── accent/credit/wash → {blue/220/92}
├── accent/warning     → {gold/78/60}
├── accent/confirm     → {olive/130/48}
└── focus/ring         → {warm/50/18}
```

Mapping tokens created per-component as needed during Phase 2 construction.

### Spacing normalization target

| Alias | Value | Replaces |
|-------|-------|----------|
| `space/micro` | 4px | 3px, 4px, 5px uses |
| `space/tight` | 8px | 7px, 8px, 9px, 9.5px, 10px |
| `space/default` | 12px | 11px, 12px, 12.5px, 13px |
| `space/comfortable` | 16px | 14px, 16px uses |
| `space/section` | 20px | 18px, 20px (section padding per guardrails) |
| `space/loose` | 24px | 22px, 24px uses |
| `space/wide` | 32px | 28px, 32px uses |

This 4px-base scale covers all current usage. Exact mapping from old→new values is a Phase 1.2 task.

### Typography normalization target

Two font families (Fraunces display, Newsreader body) — no change from current.

Proposed style categories for Figma text styles:

| Style name | Family | Size | Weight | LH | LS | Usage |
|-----------|--------|------|--------|-----|-----|-------|
| `Display/Hero` | Fraunces | clamp(56–116px) | 300 | 100% | -0.02em | Hero balance |
| `Display/Large` | Fraunces | 32px | 400 | 110% | -0.01em | — |
| `Heading/Section` | Fraunces | 23px | 400 | 115% | 0 | Section headings (§) |
| `Heading/Sub` | Fraunces | 19px | 500 | 120% | 0 | Sub-section headings |
| `Body/Default` | Newsreader | 16px | 400 | 150% | 0 | Body text, coach notes |
| `Body/Small` | Newsreader | 13px | 400 | 150% | 0.01em | Sidebar body, descriptions |
| `Label/Default` | Newsreader | 13px | 600 | 100% | 0.06em | Button labels, tab labels |
| `Label/Small` | Newsreader | 11px | 500 | 100% | 0.08em | Eyebrows, metadata, pill text |
| `Label/Micro` | Newsreader | 10px | 600 | 100% | 0.10em | Smallest labels (sparingly) |
| `Number/Table` | Fraunces | 16px | 400 | 100% | 0 | Ledger amounts (tabular-nums) |
| `Number/KPI` | Fraunces | 19px | 500 | 100% | 0 | KPI figures |
| `Number/Cents` | Fraunces | 0.42em | 400 | 100% | 0 | Cents suffix (muted) |

Exact sizes finalized in Phase 1.2 after clamp slope audit.

---

## Source chapters

| Chapter | Key contribution to this project |
|---------|----------------------------------|
| Ch 4 Accessibility | Focus rings as token infrastructure, contrast at alias layer, touch targets, motion |
| Ch 5 Responsiveness | Desktop-locked frame, value scaling vs layout reflow, Figma variable modes |
| Ch 6 Component Anatomy | Dissection method, hybrid BEM naming, layer tree = DOM tree, wrapper slots |
| Ch 7 Design Tokens | Three-layer architecture, naming conventions, collection structure, role-purity |
| Ch 10 Typography | Style categories, type scale, vertical trim, composite tokens, fluid type |
