# Component Catalog — The Ledger

Every distinct component in `the-ledger.html`, organized by atomic design level. Each entry lists the HTML class, structure, and all interactive states visible in CSS.

---

## Atoms

### A1. Button — default (`.btn`)

**Structure:** `<a class="btn">` or `<button class="btn">` — inline-flex, gap 6px, border 1px `--ink`, bg `--paper`.

| State | Visual change |
|-------|--------------|
| Rest | bg `--paper`, color `--ink`, border `--ink` |
| Hover | bg `--paper-soft` |
| (no :focus style) | — |

Variants:
- **`.btn-primary`**: bg `--ink`, color `--paper`. Hover → bg `--red`, border `--red`.
- **`.btn-sm`**: padding 6px 11px, font-size 11.5px (used in hero-actions, coach-actions).
- **`.plus` span**: color `--red` (or `--paper` in primary). Font-size 13px.
- **`.caret` span**: color `--ink-mute` (or `--paper` at 0.7 opacity in primary). Font-size 9px.

### A2. Button — icon (`.btn-icon`)

**Structure:** `<button class="btn-icon">` — 32x32, grid, place-items center, border 1px `--rule`.

| State | Visual change |
|-------|--------------|
| Rest | border `--rule`, color `--ink-soft` |
| Hover | border `--ink`, color `--ink` |

Contains SVG (15x15) and optional `.badge` (6x6 absolute, bg `--red`, box-shadow 2px `--paper`).

### A3. Link-action (`.link-action`)

**Structure:** `<a class="link-action">` — uppercase, 11px, ls 0.14em, border-bottom 1px `--ink`, `::after` → "→" in `--red`.

| State | Visual change |
|-------|--------------|
| Rest | color `--ink`, border `--ink` |
| Hover | color `--red`, border `--red` |

Variant: `.link-action.add` — `::before` "+" in `--red`, no `::after`.

### A4. Tabs (`.tabs`)

**Structure:** Wrapper `<div class="tabs">` with hidden `<input type="radio">` + `<label>`. Border 1px `--rule`, bg `--paper-soft`. Labels separated by 1px `--rule` right borders.

| State | Visual change |
|-------|--------------|
| Rest | color `--ink-soft` |
| Hover | color `--ink` |
| Checked | bg `--ink`, color `--paper` (via `input:checked + label`) |

### A5. Filter chips (`.chips`)

**Structure:** Like tabs but no enclosing border/bg. Hidden `<input type="radio">` + `<label>`. Underline style.

| State | Visual change |
|-------|--------------|
| Rest | color `--ink-mute`, border-bottom transparent |
| Hover | color `--ink` |
| Checked | color `--ink`, border-bottom `--ink` |

### A6. Pill badge (`.pill`)

**Structure:** `<span class="pill">` — bg `--ink`, color `--paper`, padding 1px 5px, 10px, ls 0.04em, weight 600. Used in sidebar nav hint for "+1" indicator.

### A7. Kbd (keyboard shortcut)

**Structure:** `<kbd>` — font `--body`, 10px, color `--ink-mute`/`--ink-soft`, padding 1px 5px / 0 4px, border 1px `--rule`, bg `--paper`. Used in topbar search and statusbar shortcuts.

### A8. Account dot

**Structure:** `<span class="dot">` — 8x8, flex-shrink 0. Color set via inline `style="background: var(--blue/--gold/--red/--ink)"`.

### A9. Hairline / rule

Not a component per se — 1px borders throughout using `--rule`, `--rule-soft`, or `--ink`. Three weight tiers:
- Light: 1px `--rule-soft` (between rows)
- Medium: 1px `--rule` (between sections)
- Heavy: 1px `--ink` (structural: sidebar, topbar, statusbar, section-head)

### A10. Status indicators

- **Trend arrows**: `▲` (color `--blue` for up) / `▼` (color `--red` for down) / `—` (muted, no change)
- **Sync dot**: 6x6, bg `--olive`, border-radius 50%, box-shadow pulsing (2.6s infinite)
- **New entry dot**: 4x4, bg `--red`, absolute positioned left of first table row
- **Notification badge**: 6x6, bg `--red`, absolute top-right of btn-icon, box-shadow 2px `--paper`

### A11. Swatch (legend)

**Structure:** `<span class="swatch">` — 20px wide, 1.4px height. `.income` bg `--blue`. `.spend` border-top 1.4px dashed `--red`, height 0 (dashed line effect).

### A12. Section numeral (`.section-num` / `.section-mark`)

**Structure:** `<span>` — Fraunces italic, opsz 24, SOFT 80, color `--ink-mute` (section-num) or `--red` (topbar section-mark). Renders "§ i", "§ ii", etc.

### A13. Roman numeral (`.roman`)

**Structure:** utility class — Fraunces italic, opsz 14, SOFT 80, color `--ink-mute`, weight 400. Used for ordinal marks (i., ii., iii.).

---

## Molecules

### M1. Sidebar brand (`.sidebar-brand`)

**Structure:** flex, align baseline, gap 8px. Contains `.name` (Fraunces 22px) with `<em>The</em>` (SOFT 100) + "Ledger" (SOFT 30), and `.vol` (10px muted italic "v 2.1").

Border-bottom 1px `--rule`. Padding 16px 20px 14px.

### M2. Sidebar nav item (`.sidebar-nav a`)

**Structure:** 3-column grid (28px / 1fr / auto). Contains `.num` (§ numeral), `.name`, `.hint` (count/status).

| State | Visual change |
|-------|--------------|
| Rest | color `--ink-soft`, border-left 2px transparent |
| Hover | bg `--paper-sunk`, color `--ink` |
| Active (aria-current) | bg `--paper`, color `--ink`, border-left 2px `--red`, .num color `--red` |

Hint variants: plain italic, `.alert` (color `--red`, weight 600), `.warn` (color `--gold`, weight 600), `.pill` (inverted badge).

### M3. Account list item (`.accounts-list li`)

**Structure:** Two rows — `.account-head` (dot + name + masked number) and `.account-bal` (value + trend). Padding 9px 20px, border-bottom 1px `--rule-soft`.

| State | Visual change |
|-------|--------------|
| Rest | default bg |
| Hover | bg `--paper-sunk` |

Trend variants: `.up` (color `--blue`), `.down` (color `--red`), neutral (muted italic "—").
Balance variant: `.neg` (color `--red`).

### M4. Sidebar user/foot (`.sidebar-foot`)

**Structure:** flex, gap 12px. `.avatar` (32x32, border 1px `--ink`, Fraunces italic initials), `.user` (name 13px + role 10.5px italic), `.settings` button.

Settings button: border 1px transparent → hover: border `--rule`, color `--ink`.
Background: `--paper-sunk`. Border-top 1px `--ink`.

### M5. Topbar search (`.topbar-search`)

**Structure:** flex, gap 8px. SVG search icon (13x13), `<input>` (13px, placeholder italic), `<kbd>` (⌘ K).
Border 1px `--rule`, bg `--paper-soft`. Width clamp(200px, 28vw, 360px).

| State | Visual change |
|-------|--------------|
| Rest | border `--rule` |
| Focus-within | border `--ink` |

### M6. Section header (`.section-head`)

**Structure:** flex, space-between, wrap. `.h-title` (section-num + h3 + optional section-sub) and `.h-controls` (meta text + tabs/chips/link-actions).

H3: Fraunces, clamp(20px, 1.9vw, 26px), with optional `<em>` for italic SOFT 100 word.
Border-bottom 1px `--ink`. Margin-bottom 16px, padding-bottom 9px.

### M7. Hero kicker (`.hero-kicker`)

**Structure:** flex, gap 12px. Glyph (◆, 9px, `--red`), label text (10.5px uppercase), rule line (1px `--rule`, flex 1), recent value (12px italic with strong red figure).

### M8. Hero delta (`.hero-delta`)

**Structure:** inline-flex, gap 10px. Arrow (▲, 14px, `--blue`), value (15px, `--blue`, weight 600), em comparisons (13px italic muted), pipe separator.

### M9. KPI row (`.kpi`)

**Structure:** 3-column grid (1fr auto auto). `.l` (label, 10.5px uppercase), `.v` (Fraunces 22px value), `.d` (delta, 11.5px italic).

Delta variants: `.up` / `.good` (color `--blue`, normal style), `.bad` (color `--red`).
Padding 11px 0. Border-bottom 1px `--rule-soft` (last: `--ink`).

### M10. Distribution row (`.distribution li`)

**Structure:** 4-column grid (22px / 1fr / auto / auto). `.rank` (roman italic), `.name` (14px + optional `.note`), `.amount` (Fraunces 15px), `.pct` (12px italic). Plus `.bar` spanning full width (1.5px, scaleX animation).

| State | Visual change |
|-------|--------------|
| Rest | default bg |
| Hover | bg `--paper-soft` |

Total variant (`.total`): no border-bottom, 2px `--ink` top, italic name, no hover, cursor default.

### M11. Ledger table row

**Structure:** `<tr>` in `.ledger-table`. Columns: `.tx-date` (11.5px small-caps), entry (`.tx-desc` + `.tx-tag` + `.row-actions`), `.tx-debit` (red), `.tx-credit` (blue), `.tx-bal` (Fraunces 14px).

| State | Visual change |
|-------|--------------|
| Rest | row-actions opacity 0 |
| Hover | bg `--paper-soft`, row-actions opacity 1 |
| New entry | 4px `--red` dot indicator left of first cell |
| Hidden | `display: none` (via filter JS) |

Row-actions: links "Categorise", "Split", "Cancel", "View" — 10.5px uppercase, border-bottom `--rule` → hover `--ink`.
`data-kind` attribute: "debit" or "credit" (used by JS filter).

### M12. Budget bar row (`.fiscal-list li`)

**Structure:** 2-row grid. Row 1: `.fiscal-name` (13.5px + `.pct` italic) + `.fiscal-amount` (Fraunces 14px). Row 2: `.fiscal-bar` (2px `--rule` track + `.fiscal-bar-fill` absolute). Optional `.fiscal-edit` row below.

Bar-fill variants:
- Default: bg `--ink`, 2px
- `.over`: bg `--red`, 3px, top offset -0.5px
- `.warn`: bg `--gold`, 2px

Optional `.fiscal-bar-marker`: 1px `--ink` vertical tick at budget threshold, with "budget" label above (8.5px).

Fiscal-edit: italic 11px with percentage info. Contains `<a>` "Adjust"/"Move funds" — opacity 0 → 1 on li:hover.

Pct variants: `.over` (color `--red`, weight 600).

### M13. Legend (`.legend`)

**Structure:** flex, space-between, wrap. `.items` (income/spend swatches + labels) and `.summary` (6-mo averages, tabular nums).

### M14. Coach stat (`.coach-stat`)

**Structure:** flex, gap 8px, baseline. `.big` (Fraunces 28px) + `.lbl` (11px uppercase). Bordered top and bottom with `--rule-soft`. Padding 8px 0.

### M15. Notice row (`.alerts li`)

**Structure:** 3-column grid (100px / 1fr / auto). `.alert-kind` (9.5px uppercase), `.alert-body` (13px with emphasis), `.alert-action` (uppercase link).

Alert-kind variants: `.info` (blue), `.warn` (gold), `.due` (red), `.win` (olive).
Alert-action: hover → color `--red`, border `--red`.

### M16. Marginalia (`.marginalia`)

**Structure:** aside element. Fraunces italic 12.5px, max-width 22ch, border-left 1px `--rule`, padding-left 14px. `::before` → "→" in red.

---

## Organisms

### O1. Sidebar (`.sidebar`)

**Structure:** `<aside>` — flex column, sticky, 100vh, bg `--paper-deep`, border-right 1px `--ink`.
Contains: `.sidebar-brand` (M1) → `.sidebar-scroll` (section labels + nav M2 + accounts M3) → `.sidebar-foot` (M4).

### O2. Topbar (`.topbar`)

**Structure:** `<header>` — sticky top 0, z-index 10, backdrop-filter blur(8px), semi-transparent paper bg, border-bottom 1px `--ink`, height 56px.
Grid: 1fr auto auto. Contains: `.topbar-title` (section-mark + title + sub) → `.topbar-search` (M5) → `.topbar-actions` (btn-icon + btn-primary "+New").

### O3. Status bar (`.statusbar`)

**Structure:** `<footer>` — sticky bottom 0, z-index 10, bg `--paper-deep`, border-top 1px `--ink`, height 38px.
Grid: auto 1fr auto. Contains: sync-pill (A10) → ticker (aria-live="polite", 3 items with strong values) → shortcuts (4x kbd+label).

### O4. Hero section (`.hero`)

**Structure:** `<section>` — 2-column grid (1.4fr 1fr). Left: kicker (M7) → hero-num (display figure) → marginalia (M16) → delta (M8) → hero-split (3-column sub-metrics). Right: `.hero-side` panel with heading + KPI list (M9) + action buttons.

### O5. Middle section — Cashflow + Distribution (`.middle`)

**Structure:** `<section>` — 2-column grid (1.5fr 1fr).
Left `.cashflow`: section-head (M6) with tabs (A4) → SVG chart (640x260 viewBox, `<title>` + `<desc>`, y-axis, x-axis, area fills, stroke lines, annotation) → legend (M13).
Right `.distribution`: section-head (M6) → ordered list of distribution rows (M10).

### O6. Double section — Ledger + Budgets (`.double`)

**Structure:** `<section>` — 2-column grid (1.45fr 1fr).
Left: section-head (M6) with chips filter (A5) → ledger-table (M11 rows) → ledger-foot.
Right: section-head (M6) → fiscal-list (M12 budget bars).

### O7. Goals section (`.goals`)

**Structure:** `<section>` — section-head (M6) → `.goals-grid` (3-column, repeat(3, 1fr), border-top `--ink`).
Each `<article>`: eyebrow (A12 + text) → h4 goal-name (Fraunces clamp) → progress text → goal-bar (1.5px) → eta + pct → pace status → "Contribute" link.

Goal pace: `<em>On pace</em>` (olive) or `<em class="behind">Behind</em>` (gold).
Articles separated by 1px `--rule` right borders, no enclosing card.
Hover: bg `--paper-soft`.

### O8. Coach section (`.coach`)

**Structure:** `<section>` — section-head (M6) → `.coach-grid` (3-column).
Each `.coach-note` `<article>`: 2px colored top border (red/blue/gold by :nth-child), bg `--paper`. Contains: kind label → headline (Fraunces clamp) → body (13.5px, 3-line max per guardrails) → stat (M14) → meta (timestamp) → actions (primary btn + ghost btn).

Only component with card-like enclosure — top rule + bg `--paper` (per guardrails §5).

### O9. Notices section (`.alerts`)

**Structure:** `<section>` — section-head (M6) → `<ul>` with notice rows (M15). Border-top 1px `--rule` on list. Last section before statusbar.

---

## Interactive Behaviors (JavaScript)

### JS1. Transaction filter

Radio buttons (`input[name="tx"]`: All / Credits / Debits) toggle `tr.hidden` class on ledger rows based on `data-kind` attribute. Pure CSS class toggle — no animation.

### JS2. Cashflow period tabs

Radio buttons (`input[name="cf"]`: 1M / 6M / 1Y / All) trigger a 320ms opacity flash on the SVG chart as visual acknowledgment. No data change — purely cosmetic.

### JS3. Keyboard shortcut

`Cmd/Ctrl+K` → focuses `.topbar-search input`. `preventDefault()` blocks browser default.

---

## State Inventory for Figma

States that must be designed into Figma components:

| Component | States needed |
|-----------|--------------|
| btn | rest, hover (+ primary variant of each) |
| btn-icon | rest, hover, with/without badge |
| link-action | rest, hover (+ .add variant) |
| tabs label | rest, hover, selected |
| chips label | rest, hover, selected |
| sidebar-nav item | rest, hover, active (aria-current) |
| accounts-list item | rest, hover |
| sidebar-foot .settings | rest, hover |
| topbar-search | rest, focus-within |
| ledger-table row | rest, hover (shows row-actions), new entry |
| distribution row | rest, hover |
| fiscal-list item | rest, hover (shows edit link) |
| goals-grid article | rest, hover |
| alert-action | rest, hover |
| goal-contribute | rest, hover |
| fiscal-edit a | rest, hover (opacity 0→1 is parent hover, then own color hover) |
| row-actions a | rest, hover |
| coach note | 3 color variants (red/blue/gold top border) |
| budget bar fill | default (ink), over (red, 3px), warn (gold) |
| trend indicator | up (blue ▲), down (red ▼), neutral (— muted) |
| hint badge | plain italic, alert (red), warn (gold), pill (inverted) |
| alert-kind | info (blue), warn (gold), due (red), win (olive) |
| goal-pace | on-pace (olive), behind (gold) |
| account-bal | positive (ink), negative (red) |
| kpi delta | up/good (blue), bad (red), neutral (muted) |

**Missing states (not in CSS — noted as gaps):**
- No `:focus` styles on any interactive element (buttons, links, nav, inputs)
- No `:active` / pressed states
- No disabled states
- No loading/skeleton states
- No error states on form elements

---

## Accessibility Audit (Ch 0.3)

### Focus indicators

**Single custom focus style in CSS:** `.topbar-search:focus-within { border-color: var(--ink); }` — the search container responds when its child input is focused. No other element has a custom `:focus` or `:focus-visible` rule.

**However:** browsers provide a default `:focus-visible` outline for keyboard navigation. This means keyboard users *do* get a visible indicator (typically a blue/black outline ring) — the page is not completely inaccessible. The `:focus-visible` heuristic only fires for keyboard navigation, not mouse clicks, which is actually better UX than `:focus`.

**The gap is aesthetic, not functional:** the browser's default focus ring doesn't match the warm-paper design language. For the "proposed" Figma page, custom `:focus-visible` styles should be designed that fit the visual system — see the reference button component pattern below for focus ring approach.

**For Figma:** Every interactive component needs a focus state designed. The reference portfolio uses a separate focus ring element with 2px border, offset from the component edges (see Appendix A).

### Tab order

Natural DOM order is reasonable — sidebar first, then topbar, then main content top-to-bottom, then statusbar. Issues:

| Element | Problem |
|---------|---------|
| `.accounts-list li` | Has `cursor: pointer` and hover state but is a plain `<li>` — not focusable via keyboard, no `tabindex`, no `<a>` or `<button>` wrapping |
| `.distribution li[tabindex="0"]` | Focusable (tabindex=0) but no keyboard action handler and no focus style — pressing Enter does nothing |
| Row-actions (`<a>` in table) | Focusable but `opacity: 0` at rest — screen reader finds them, sighted keyboard user cannot see them without hover |
| `.fiscal-edit a` | Same opacity-0 issue — links are in DOM but invisible without mouse hover |
| All `<a href="#">` | Navigate to page top on click — should use `<button>` or `href` pointing to actual targets |
| No skip link | First tab stop is deep in sidebar — no way to jump to main content |

### ARIA inventory

**Present and correct:**

| Attribute | Element | Assessment |
|-----------|---------|------------|
| `aria-current="page"` | Active sidebar nav link | Correct per guardrails |
| `aria-hidden="true"` | Decorative rule span, search SVG | Correct — hides decorative elements |
| `aria-label="Net worth and key figures"` | Hero section | Good section labeling |
| `aria-label="Cashflow chart"` | SVG chart | Good, combined with `<title>` and `<desc>` |
| `aria-label="Period"` | Tabs (cashflow) | Good label for tablist |
| `aria-label="Filter"` | Chips (ledger filter) | Good label for radiogroup |
| `aria-label="Notifications"` | Bell btn-icon | Good button label |
| `aria-label="Settings"` | Settings button | Good button label |
| `aria-label="Link account"` | "+" add account link | Good |
| `aria-label="Unread"` | Notification badge | Labels the dot indicator |
| `aria-labelledby` | Goals, Coach, Notices sections | Correct — references heading IDs |
| `aria-live="polite"` | Statusbar ticker | Correct per guardrails |
| `role="tablist"` | Cashflow period tabs | Present |
| `role="radiogroup"` | Ledger filter chips | Present |

**Missing or problematic:**

| Gap | Where | Impact |
|-----|-------|--------|
| No `role="tab"` on labels | Tabs (`.tabs label`) | `role="tablist"` container has no `role="tab"` children. Labels act as tabs visually but aren't announced as tabs. The underlying `<input type="radio">` is functionally correct but hidden (`opacity: 0`), so AT may not associate it. |
| No `aria-label` on middle section | Cashflow + distribution section | Two sub-sections inside, no overall landmark label |
| No `aria-label` on double section | Ledger + budgets section | Same — two sub-sections, no landmark label |
| No section labeling on hero-side | May figures panel | `<aside>` without `aria-label` |
| No `aria-labelledby` on "May figures" | `<h3>` has no `id` | Unlike Goals/Coach/Notices which use `aria-labelledby`, hero-side doesn't |
| SVG icons missing `aria-hidden` | Settings SVG, notification bell SVG | Parent buttons have `aria-label` so impact is low, but SVGs may expose meaningless paths to AT |
| `<table>` has no `<caption>` | Ledger table | Screen readers won't announce table purpose. Has an `id="ledger"` but no caption or `aria-label`. |
| Distribution `<ol>` has no `aria-label` | Spending categories list | Ordered list has semantic meaning but no label |
| Budget `<ul>` has no `aria-label` | `.fiscal-list` | Same issue |

### Heading hierarchy

```
(no h1)
(no h2)
├─ h3 "May figures"
├─ h3 "Cashflow"
├─ h3 "Where it went"
├─ h3 "The Ledger"
├─ h3 "Budgets"
├─ h3 "Goals"
│  ├─ h4 "Emergency Fund"
│  ├─ h4 "Japan in autumn"
│  └─ h4 "House deposit"
├─ h3 "Coach"
│  ├─ h4 "Subscription creep, +€38/mo"
│  ├─ h4 "Sweep €52 to Emergency?"
│  └─ h4 "Dining already €108 over"
└─ h3 "Notices"
```

**Issues:**
- No `<h1>` on the page. "The Ledger" brand in sidebar is a `<span>`, not a heading.
- No `<h2>`. Hierarchy jumps directly to h3 for all sections.
- Flat h3 level for all sections is defensible for a single-page dashboard, but the missing h1 is a WCAG violation (1.3.1 Info and Relationships).

### Keyboard interaction model

| Interaction | Implementation | Works? |
|-------------|---------------|--------|
| `Cmd/Ctrl+K` → focus search | JS `keydown` listener | Yes |
| Tab through sidebar nav | Native `<a>` focus order | Focusable but no visible indicator |
| Arrow keys in tabs/chips | Native `<input type="radio">` | Yes — radio groups support arrow key navigation natively |
| Cashflow period switch | Radio `change` event → opacity flash | Yes — keyboard triggers change event |
| Ledger filter | Radio `change` event → toggle rows | Yes — keyboard triggers change event |
| Distribution items | `tabindex="0"` on `<li>` | Focusable but no action on Enter/Space |
| Account list items | Plain `<li>` | Not keyboard accessible at all |
| Table row-actions | `<a>` links | Focusable but invisible (opacity 0) |
| Budget edit links | `<a>` links | Focusable but invisible (opacity 0) |
| Sidebar off-canvas (mobile) | CSS class `.open` | No JS toggle implemented — sidebar can't be opened on mobile |

### SVG chart accessibility

The cashflow SVG chart has:
- `aria-label="Cashflow chart"` on the `<svg>` element
- `<title>Cashflow, last 6 months</title>` inside SVG
- `<desc>Income (solid line) and spending (dashed line), Dec 2025 through May 2026.</desc>` inside SVG

This meets the guardrails requirement (§8: SVG charts must carry `<title>` and `<desc>`).

### Summary: what must be designed for Figma

1. **Custom focus ring** for every interactive component — browser default `:focus-visible` works but doesn't match the design language. The proposed page should show a consistent, styled focus indicator.
2. **Keyboard-accessible account list items** — need button/link wrapping or tabindex + handler
3. **Visible focus path for opacity-0 links** — row-actions and fiscal-edit need to become visible on focus, not just hover
4. **Skip link** to main content — standard a11y pattern, should be designed
5. **Missing sidebar toggle** for mobile — no hamburger button or gesture exists to open the off-canvas sidebar

---

## Appendix A: Reference Button Component Pattern

From the portfolio Figma file (`amark.design-2026`), node `20323:6421`. This is the standard for how components should be built in the proposed Figma page.

### Variant axes (4 independent properties)

| Axis | Values | Count |
|------|--------|-------|
| **Style** | Filled, Outlined, Text | 3 |
| **State** | Enabled, Hovered, Pressed, Focused, Disabled | 5 |
| **Scheme** | Brand, Neutral | 2 |
| **Context** | Normal, Inverse | 2 |

Total: 3 × 5 × 2 × 2 = **60 variants** in one component set.

### Component properties (boolean + text)

| Property | Type | Purpose |
|----------|------|---------|
| `iconLeft` | boolean | Show/hide left icon slot |
| `iconRight` | boolean | Show/hide right icon slot |
| `label` | text | Exposed text property — button label content |
| `label1` | boolean | Show/hide label (enables icon-only mode) |

### Internal structure (nesting)

```
Button (auto-layout: horizontal, gap, padding, min-height)
├── icon-slot (left) [boolean toggle]
│   └── icons--light (nested component instance, 20×20)
│       └── Vector
├── Label (text node, exposed as text property)
├── icon-slot (right) [boolean toggle]
│   └── icons--light (nested component instance, 20×20)
│       └── Vector
└── Focus ring (absolute positioned, only in Focused state)
```

### Token naming convention

Tokens follow a structured path: `--{component}/{scheme}/{style}/{property}/{context}/{state}`

**Examples from the button:**

| Token path | Value | Role |
|------------|-------|------|
| `--button/brand/filled/surface/normal/enabled` | #ac7336 | Fill color |
| `--button/brand/filled/text/normal/enabled` | #feffff | Text color |
| `--button/brand/filled/surface/normal/focused` | #ac7336 | Same fill, focus ring added |
| `--button/brand/filled/text/normal/focused` | #f6f7f8 | Text in focused state |
| `--button/gap` | 4px | Spacing between icon and label |
| `--button/padding-x--icon` | 10px | Horizontal padding (with icon) |
| `--button/padding-y` | 4px | Vertical padding |
| `--button/base` | 9999px | Border radius (pill shape) |
| `--button/focus` | 9999px | Focus ring border radius |
| `--focus/outline` | #99e2e4 | Global focus ring color |

**Typography tokens (shared across components):**

| Token | Value | Role |
|-------|-------|------|
| `--type/family/secondary` | Geist Regular | Button font family |
| `--type/weight/regular` | 400 | Font weight |
| `--type/size/fixed/2` | 15px | Font size |
| `--type/line-height/shortform/text/fixed/2` | 24px | Line height |
| `--type/letter-spacing/body` | 0px | Letter spacing |

### Focus ring implementation

- **Separate element**, not a Figma effect or CSS outline
- 2px solid border using `--focus/outline` color (#99e2e4 — cyan/teal)
- **Offset from button edges** (negative inset -1.31% on left/right, height 44px vs button 33px)
- Border-radius matches component shape (`--button/focus`)
- Only present in the **Focused** state variant

### Annotation pattern

The component matrix is annotated with text labels on each axis:
- Row labels: state names (Enabled, Hovered, Pressed, Focused, Disabled)
- Column labels: style names (Filled, Outlined, Text)
- Section labels: scheme (Brand, Neutral) and context (Normal, Inverse)
- Page backgrounds: light and dark rectangles behind Normal/Inverse columns

### Key principles to apply to The Ledger

1. **Full state coverage** — every component gets all 5 states (enabled, hovered, pressed, focused, disabled), not just rest + hover
2. **Scheme + context separation** — token naming differentiates color scheme from background context
3. **Modular slots** — icon slots as boolean-toggled nested components, not baked into each variant
4. **Text as property** — label text exposed as component property, not hardcoded
5. **Focus ring as element** — designed as part of the component, not relying on Figma effects or browser defaults
6. **Token paths** — structured hierarchical naming, not flat variable names
