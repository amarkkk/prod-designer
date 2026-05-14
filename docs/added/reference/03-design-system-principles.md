# Design System Principles — The Ledger

Synthesized from Design System Book chapters 4, 5, 6, 7, 10. Filtered to actionable takeaways for this project. Read alongside `01-token-extraction.md` (raw values) and `02-component-catalog.md` (component inventory) — both in this `reference/` folder.

**Ch 3.1 validation note:** validated on 2026-05-13 against `docs/added/dsb/` plus the completed Page 1 work in `docs/added/sessions/ch-2.3-organisms.md` and `docs/added/review/ch-2.3-organism-mockup-deep-audit.md`.

**Post-review correction:** Page 1 `As-is` remains a locked, source-faithful baseline. The `Proposed` page is different: it must become a ship-ready, tokenized design-system page. Use the DSB foundation → alias → mapping architecture for Proposed, including component-specific mapping tokens where components consume values. Ch 3.1 produced only an initial scaffold; Ch 3.2-Ch 3.6 complete the real Proposed system.

---

## 1. Token Architecture

### Layered model for Proposed (Ch 7)

The DSB architecture is foundation → alias → mapping. For Page 1 it is intentionally not applied, because Page 1 is evidence. For `Proposed`, it is the required structure.

| Layer | Use in The Ledger | Figma expression |
|-------|-------------------|------------------|
| **Evidence** | Raw Page 1 values from the HTML and local `as-is/` styles. These are not normalized or rebound. | Existing `as-is/` styles only |
| **Foundation** | Proposed raw values: color ramps and modes, spacing numbers, rhythm fractions, dimensions, typography primitives, rule widths, radius, and focus metrics. | `Proposed * - 1. Foundations` collections |
| **Alias** | Semantic choices designers should actually choose: paper, ink, rule, accent, focus, rhythm, density, type roles, shell dimensions. | `Proposed * - 2. Aliases` collections |
| **Mapping** | Component-level endpoints consumed by components and variants. | `Proposed * - 3. Mappings` collections |

Composite proposed text styles serve as designer-facing typography tokens. They should be backed by typography foundation/alias variables where Figma supports variable binding, and documented where text-style internals cannot be bound through the current workflow.

### Naming conventions

**Color aliases:** `{role}/{purpose}` or `{role}/{purpose}/{state}`.
- Keep names short where the role already carries meaning: `paper/canvas`, `ink/primary`, `rule/subtle`, `accent/debit`.
- Use state only when the value is stateful: `paper/interactive/hover`, `focus/ring`.
- Keep the warm paper/ink discipline from the source. Do not introduce cool neutral greys.

**Spacing aliases:** classify by scale and purpose.
- Micro values handle hairlines, rule widths, focus offsets, icon gaps, and optical nudge values.
- Meso values handle component padding, row interiors, dense list gaps, and section-header relationships.
- Macro values handle page padding, column gutters, and section-to-section spacing.

**Mapping tokens:** `{component}/{part}/{property}/{state}` or `{component}/{part}/{state}`.
- Example: `button/primary/surface/enabled` → `{paper/ink}` or `{accent/debit}` depending on the component decision.
- Example: `sidebar/nav-item/bar/active` → `{accent/debit}`.
- Create mappings as components are retokenized. Every Proposed component should bind through aliases or mappings rather than literal values.

### What The Ledger needs

The as-is HTML defines 19 color custom properties, 3 layout dimensions, and many fractional spacing and type values. For the proposed page:

1. Preserve Page 1 as raw evidence. Do not edit, rename, or normalize existing `as-is/` styles.
2. Normalize only the duplicated `Proposed` page and its new `proposed/` styles and variables.
3. Build the Proposed token network before redesigning feature flows.
4. Keep the color palette close to source because it already encodes the product metaphor and semantic red/blue/gold/olive rules, but route it through foundation, alias, and mapping layers so dark mode can be tested by changing foundations.
5. Normalize spacing and typography more aggressively because the extracted values include arbitrary 7/9/11/13/22/26px and 9.5/10.5/11.5/12.5px clusters.
6. Split horizontal spacing from vertical rhythm where useful: horizontal spacing can use a compact grid, while vertical rhythm derives from body line-height multiples and documented fractions.
7. Proposed components must be self-contained: nested instances inside Proposed point to Proposed-local masters, not Page 1 `As-is` masters.

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

The Ledger is a dense finance dashboard with an editorial serif voice. The Proposed system should not force a generic 16px SaaS base across every surface. Use a dense-app scale that improves legibility while staying close to the source:

| Role | Proposed size / line-height | Source cluster normalized |
|------|-----------------------------|---------------------------|
| `label/micro` | 10 / 12 | 8.5, 9, 9.5, 10 |
| `label/small` | 11 / 14 | 10.5, 11, 11.5 |
| `label/default` | 12 / 16 | 12, 12.5 |
| `body/small` | 13 / 18 | 12.5, 13 |
| `body/default` | 14 / 20 | 13.5, 14 |
| `body/comfortable` | 16 / 24 | 15, 16 and longer copy contexts |
| `heading/subsection` | 20 / 24 | 18, 20 |
| `heading/section` | 24 / 28 | clamp 20-26 |
| `display/small` | 32 / 36 | 27, 28, display stat cluster |
| `display/hero` | fluid 56-112, fixed desktop specimen 112 / 96 | clamp 56-116 |

This is intentionally a tuned stepped scale rather than a pure modular ratio. It follows DSB Ch 10's advice to pair every size with a line-height and to let dense app UI use smaller body sizes when the audience and content density justify it.

### Vertical trim for controls

Single-line UI elements (buttons, chips, input fields) use vertical trim or manual padding to center text optically. Line-height on these should be `1` (100%), with padding controlling the hit area. This avoids the "too much space above/below" problem with display line-heights on buttons.

### Vertical rhythm

Use `body/default` line-height `20px` as the default vertical rhythm unit. The Proposed system should check rows, lists, and sections against this rhythm without pretending every value must be an integer multiple:

- `rhythm/base` = 20px.
- `rhythm/half` = 10px for source-compatible local offsets.
- 4px spacing values remain the micro-grid for padding, focus offsets, rules, and optical alignment.
- Dense rows should land on 4px increments and stay explainable relative to the rhythm, e.g. 40px, 44px, 56px, 60px, 72px.
- Explicit exceptions: 1px hairlines, 1.5-3px chart/bar marks, 5px/10px rhythm fractions, and single-line control trim.

### Fluid typography

Two kinds of responsive type:
- **Scaled sizes** (hero, headings): use `clamp(min, preferred, max)` with viewport-relative preferred value
- **Fixed sizes** (body, labels, metadata): stay constant across breakpoints

Check clamp values at 1680, 1240, 1080, 960, and 720px. Use single clamp values unless a role visibly overshoots at a breakpoint; piecewise clamp is available from DSB Ch 5/10 if Proposed components prove the need.

### Typography tokens in Figma

- **Foundation variables:** raw sizes, weights, line-heights, and rhythm values useful for inspection.
- **Composite text styles:** `proposed/display/hero`, `proposed/heading/section`, `proposed/body/default`, `proposed/label/small`, etc.
- Figma variables and text styles cannot encode every typographic detail equally well through the current workflow. Bind what Figma supports, and document OpenType, optical size, SOFT axis, case intent, and relative cents treatment in style descriptions and session logs.

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

Add modes only where they support real Proposed decisions:

- Color foundations should include Light and Dark value modes so aliases and mappings can inherit mode changes.
- Responsive typography and dimension foundations may use viewport modes when a component needs them.
- Density modes are optional until atoms/molecules prove that Compact or Relaxed needs a formal token mode.

For a future density axis:
- `Default` remains the proposed baseline.
- `Compact` can reduce meso row padding and macro section gaps while preserving 24px minimum targets and readable text floors.
- `Relaxed` can increase macro spacing for presentation/review surfaces, but should not become the main dashboard default.

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

Derived from distinct typography treatments in the HTML. Each style captures the exact CSS values — no normalization. The Figma `Typography Samples — As-is` section labels each sample with the source CSS selector(s), so semantic style names remain auditable.

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
| `as-is/label-action` | Newsreader | 10.5px | 600 | — | 0.10–0.14em | uppercase | Legacy/general small CTA treatment; prefer `link-action` modes for Page 1 molecules |
| `as-is/label-link-action` | Newsreader | 11px | 600 | — | 0.14em | uppercase | `.link-action` |
| `as-is/label-chip` | Newsreader | 11px | 600 | — | 0.12–0.14em | uppercase | `.tabs label`, `.chips label` |
| `as-is/body-default` | Newsreader | 13.5px | 400 | 1.55 | 0 | opsz 16 | Coach body text |
| `as-is/body-sidebar` | Newsreader | 13px | 400 | — | -0.005em | opsz 14, SOFT 80 | Sidebar account names |
| `as-is/body-table` | Newsreader | 13px | 500 | 1.2 | — | — | Ledger entry names |
| `as-is/tx-tag` | Newsreader | 9.5px | 400 | 1 | 0.14em | italic, uppercase | `.tx-tag` transaction metadata |
| `as-is/body-btn` | Newsreader | 12.5px | 500 | — | 0.02em | — | Button labels |
| `as-is/body-btn-sm` | Newsreader | 11.5px | 500 | — | 0.02em | — | `.btn-sm` |
| `as-is/body-small` | Newsreader | 11px | — | 1.4 | 0.04em | — | Small body, descriptions |
| `as-is/body-meta` | Newsreader | 10.5px | — | — | — | italic | Metadata, timestamps |
| `as-is/number-table` | Fraunces | 14px | — | — | — | opsz 30, SOFT 25–30, tabular-nums | Ledger/budget amounts |
| `as-is/number-fiscal` | Fraunces | 13.5px | — | — | — | tabular-nums | Budget category amounts |
| `as-is/number-cents` | Fraunces | 0.42em | — | — | — | tabular-nums | Cents suffix (relative to parent) |
| `as-is/input` | Newsreader | 13px | 400 | — | 0 | — | Search input |
| `as-is/input-placeholder` | Newsreader | 13px | 400 | — | 0 | italic | Search placeholder |
| `as-is/statusbar` | Newsreader | 11.5px | — | — | — | — | Status bar text |
| `as-is/kbd` | Newsreader | 10px | 400 | — | 0.04em | — | `.topbar-search kbd`, `.statusbar .shortcuts kbd` |
| `as-is/section-num` | Fraunces | 16px | 400 | 1 | — | italic, opsz 24, SOFT 80 | `.section-head .section-num`, `.topbar-title .section-mark` |
| `as-is/section-sub` | Newsreader | 12.5px | 400 | — | — | italic | `.section-sub` |
| `as-is/roman` | Fraunces | 13px | 400 | 1 | — | italic, opsz 14, SOFT 80 | `.roman`, `.goal-eyebrow .roman` |
| `as-is/row-action-link` | Newsreader | 10.5px | 500 | 1 | 0.08em | uppercase | Reveal-on-parent-hover actions such as `.row-actions a`; reused for consolidated reveal action mode |
| `as-is/nav-hint` | Newsreader | 11px | 400 | 1 | 0 | tabular-nums | `.sidebar-nav .hint` |
| `as-is/nav-hint-strong` | Newsreader | 11px | 700 | 1 | 0 | tabular-nums | `.sidebar-nav .hint.alert`, `.sidebar-nav .hint.warn` |
| `as-is/distribution-name` | Newsreader | 14px | 500 | 1.2 | 0 | — | `.distribution .name` |
| `as-is/distribution-total-name` | Newsreader | 13.5px | 500 | 1.2 | 0 | italic | `.distribution .total .name` |
| `as-is/legend-summary` | Newsreader | 12px | 400 | 1.4 | 0 | italic | `.legend .summary` |
| `as-is/marginalia` | Newsreader | 12.5px | 400 | 1.45 | 0 | italic | `.marginalia` |
| `as-is/marginalia-arrow` | Newsreader | 12.5px | 600 | 1 | 0 | — | `.marginalia::before` |
| `as-is/hero-delta-value` | Fraunces | 15px | 400 | 1 | 0 | tabular-nums | `.hero-delta .val` |
| `as-is/notice-body` | Newsreader | 13px | 400 | 1.45 | 0 | — | `.alerts .alert-body` |
| `as-is/goal-pace` | Newsreader | 11px | 400 | 1.3 | 0 | italic | `.goal-pace` |
| `as-is/coach-kind` | Newsreader | 10px | 700 | 1 | 0.18em | uppercase | `.coach-kind` |

\* Hero uses `clamp(56px, 8.5vw, 116px)`. At the 1680px Page 1 reference, Figma gets the max value.
† Goals use `clamp(22px, 2.1vw, 27px)`. At the 1680px Page 1 reference, Figma gets the max value.

Dashes (—) mean the value inherits from the element's context or isn't explicitly set in CSS. These will be resolved to concrete values during Figma construction by checking computed styles.

Ch 2.2 correction note: duplicate molecule-only action text styles (`as-is/fiscal-action-link`, `as-is/alert-action-link`) were retired after `link-action` was consolidated to `Mode=Visible/Reveal` plus content slots. Keep source-specific text styles only where the CSS treatment is meaningfully distinct, such as `.tx-tag`.

### Checklist — every component, both pages

#### Before building

- [ ] Identify: name, atomic level, parent compositions (from `02-component-catalog.md`)
- [ ] Structural anatomy: layer tree sketch (container → slots → elements)
- [ ] Variant axes: which properties create variants? (from component catalog state inventory)
- [ ] State list: Page 1 maps only source CSS states; Proposed interactive components must include enabled/default, hover, focus, pressed, and disabled.

#### During building

- [ ] Layer names follow hybrid BEM: `block__element`, internal layers prefixed `_`
- [ ] Figma layer tree mirrors DOM structure
- [ ] Auto-layout matches CSS flex model (direction, gap, padding, alignment)
- [ ] Boolean properties for optional slots (icons, badges, hints)
- [ ] Text content exposed as component text properties
- [ ] Atoms inside molecules wrapped in `_slot-wrapper` frames
- [ ] Parent components use nested atom/helper instances rather than duplicated internals
- [ ] If a required lower-level component is missing, mark it in Figma and the session log before building the parent
- [ ] Missing atoms/helpers are not silently redrawn inline inside molecules or organisms
- [ ] Parent variants cover only parent-owned state changes; nested child state combinations stay on the nested child component
- [ ] CSS one-sided borders use individual Figma stroke weights, not decorative rectangle layers
- [ ] **As-is:** color fills use `as-is/` color styles, text uses `as-is/` text styles, spacing is exact pixel values
- [ ] **Proposed:** fills, strokes, spacing, dimensions, rule widths, radius, and focus geometry use proposed alias/mapping variables where Figma supports binding; text uses proposed text styles and type variables where supported.

#### After building

- [ ] Variant matrix: annotated grid showing all state/variant combinations
- [ ] Variant matrix is bounded: no parent × child Cartesian state explosion unless source explicitly requires it
- [ ] Visual verification against HTML screenshot at same viewport width
- [ ] States verified: Page 1 source states are covered; Proposed interactive components include the full five-state model unless a documented reason excludes a state.

---

## 7. Ledger-Specific Decisions

Decisions derived from cross-referencing book principles with extracted tokens, guardrails, completed Page 1 work, and the post-review Proposed scope correction. These are starting points for the Ch 3.2-Ch 3.6 Proposed system, not rules for modifying Page 1.

### Color token structure

The flat Ch 3.1 `Proposed / Color` scaffold has been superseded and renamed `Legacy Ch 3.1 Proposed / Color (scaffold)` in Figma. Active Proposed color work uses the layered Ch 3.2 collections:

- `Proposed Color - 1. Foundations` with Light and Dark modes.
- `Proposed Color - 2. Aliases` for paper, ink, rule, accent, focus, and semantic status choices.
- `Proposed Color - 3. Mappings` for component parts and states.

```
Proposed Color - 2. Aliases
├── paper/canvas       → #eae0d2 (source --paper-deep)
├── paper/surface      → #f2eade (source --paper)
├── paper/interactive  → #f7f1e8 (source --paper-soft)
├── paper/sunken       → #e1d6c7 (source --paper-sunk)
├── ink/primary        → #190f0a (source --ink)
├── ink/secondary      → #433b37 (source --ink-soft)
├── ink/muted          → #746d68 (source --ink-mute)
├── ink/faint          → #9d9792 (source --ink-faint)
├── rule/strong        → #190f0a (source --ink as structural border)
├── rule/default       → #c6bcaf (source --rule)
├── rule/subtle        → #d8d0c4 (source --rule-soft)
├── accent/debit       → #7f2117 (source --red)
├── accent/debit/wash  → #f4dbd4 (source --red-wash)
├── accent/credit      → #17495a (source --blue)
├── accent/credit/wash → #d7e8ee (source --blue-wash)
├── accent/warning     → #a17833 (source --gold)
├── accent/confirm     → #50663a (source --olive)
└── focus/ring         → #190f0a (warm high-contrast focus)
```

The source's unused `--paper-edge`, `--red-soft`, and `--blue-soft` remain documented evidence only until a proposed component needs them.

### Spacing normalization target

| Alias | Value | Classification | Replaces / use |
|-------|------:|----------------|----------------|
| `rule/hairline` | 1px | micro | Standard dividers |
| `rule/accent` | 2px | micro | Coach top rules, active nav |
| `space/micro/4` | 4px | micro | Dots, tiny offsets, compact icon gaps |
| `space/micro/6` | 6px | micro | Existing button/icon gaps where 8px is too loose |
| `space/micro/8` | 8px | micro | 7/8/9px gaps and small padding |
| `space/meso/12` | 12px | meso | 11/12/13px component padding |
| `space/meso/16` | 16px | meso | Section-header gaps, row group gaps |
| `space/meso/20` | 20px | meso | Guardrail section padding, body rhythm base |
| `space/meso/24` | 24px | meso | 22/24/26px local layout gaps |
| `space/macro/32` | 32px | macro | 28/32px section gaps |
| `space/macro/40` | 40px | macro | Desktop main/topbar side padding |
| `space/macro/48` | 48px | macro | Middle/double desktop column gaps |
| `space/macro/64` | 64px | macro | Hero desktop column gap |

Use the 4px grid as the default. Keep 6px as an explicit micro exception because it appears repeatedly in source controls and often centers serif labels better than 8px.

### Typography normalization target

Two font families (Fraunces display, Newsreader body) — no change from current.

Proposed style categories for Figma text styles:

| Style name | Family | Size | Weight | LH | LS | Usage |
|-----------|--------|------|--------|-----|-----|-------|
| `proposed/display/hero` | Fraunces | 112px desktop specimen | 400 | 96px | -0.02em | Hero balance; document clamp 56-112 |
| `proposed/display/small` | Fraunces | 32px | 400 | 36px | -0.01em | Large stats |
| `proposed/heading/section` | Fraunces | 24px | 400 | 28px | 0 | Section headings |
| `proposed/heading/subsection` | Fraunces | 20px | 400 | 24px | 0 | Panel titles |
| `proposed/body/comfortable` | Newsreader | 16px | 400 | 24px | 0 | Longer explanatory copy |
| `proposed/body/default` | Newsreader | 14px | 400 | 20px | 0 | Dense dashboard body and row labels |
| `proposed/body/small` | Newsreader | 13px | 400 | 18px | 0 | Sidebar/account/meta body |
| `proposed/label/default` | Newsreader | 12px | 600 | 16px | 0.5px | Buttons, tabs, chips |
| `proposed/label/small` | Newsreader | 11px | 600 | 14px | 0.55px | Eyebrows and row actions |
| `proposed/label/micro` | Newsreader | 10px | 700 | 12px | 0.6px | Sparing dense labels |
| `proposed/number/table` | Fraunces | 14px | 400 | 20px | 0 | Table and budget amounts |
| `proposed/number/kpi` | Fraunces | 22px | 400 | 24px | 0 | KPI values |
| `proposed/number/cents` | Fraunces | 0.42em | 400 | 1 | 0 | Cents suffix; document as relative exception |

All financial number styles require lining tabular numerals. Fraunces optical-size/SOFT settings should remain documented with styles where Figma exposes them; if not, include them in style descriptions and the session log.

Figma implementation note: bound `letterSpacing` variables resolve as pixels. Do not enter the conceptual label tracking values as `8`, `10`, or `12`; those become unusable `px` values in Figma. Use the current pixel equivalents above unless a later visual pass deliberately changes the label styles.

---

## Source chapters

| Chapter | Key contribution to this project |
|---------|----------------------------------|
| Ch 4 Accessibility | Focus rings as token infrastructure, contrast at alias layer, touch targets, motion |
| Ch 5 Responsiveness | Desktop-locked frame, value scaling vs layout reflow, Figma variable modes |
| Ch 6 Component Anatomy | Dissection method, hybrid BEM naming, layer tree = DOM tree, wrapper slots |
| Ch 7 Design Tokens | Three-layer architecture, naming conventions, collection structure, role-purity |
| Ch 10 Typography | Style categories, type scale, vertical trim, composite tokens, fluid type |
