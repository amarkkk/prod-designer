# Token Extraction — The Ledger

Extracted from `the-ledger.html` (2125 lines). Source of truth for Phase 1 normalization.

---

## 1. CSS Custom Properties

### 1.1 Colors

All colors defined in oklch(). Hex equivalents computed for Figma.

#### Paper (backgrounds)

| Token | oklch | Hex | Usage |
|-------|-------|-----|-------|
| `--paper` | oklch(94% 0.018 80) | #f2eade | Main content background |
| `--paper-soft` | oklch(96% 0.014 80) | #f7f1e8 | Hover backgrounds, tab fills, search bg |
| `--paper-deep` | oklch(91% 0.022 76) | #eae0d2 | Body bg, sidebar bg, status bar bg |
| `--paper-sunk` | oklch(88% 0.024 74) | #e1d6c7 | Sidebar hover, sidebar foot bg |
| `--paper-edge` | oklch(85% 0.026 72) | #d9cbbc | Not used in CSS — defined but unused |

#### Ink (foreground)

| Token | oklch | Hex | Usage |
|-------|-------|-----|-------|
| `--ink` | oklch(18% 0.020 50) | #190f0a | Primary text, borders, filled buttons |
| `--ink-soft` | oklch(36% 0.014 50) | #433b37 | Secondary text, sidebar nav links |
| `--ink-mute` | oklch(54% 0.012 55) | #746d68 | Labels, eyebrows, metadata, placeholders |
| `--ink-faint` | oklch(68% 0.010 60) | #9d9792 | Roman numerals, lowest-emphasis text |

#### Rules (dividers)

| Token | oklch | Hex | Usage |
|-------|-------|-----|-------|
| `--rule` | oklch(80% 0.022 75) | #c6bcaf | Standard hairlines, borders |
| `--rule-soft` | oklch(86% 0.018 78) | #d8d0c4 | Light hairlines (table rows, kpi rows) |

#### Accents

| Token | oklch | Hex | Semantic role |
|-------|-------|-----|---------------|
| `--red` | oklch(40% 0.13 30) | #7f2117 | Debits, alerts, over-budget, active nav, CTAs |
| `--red-soft` | oklch(50% 0.11 32) | #984839 | Not used in CSS — defined but unused |
| `--red-wash` | oklch(91% 0.030 35) | #f4dbd4 | Spending area fill (chart) |
| `--blue` | oklch(38% 0.06 225) | #17495a | Credits, positive deltas, income, on-pace |
| `--blue-soft` | oklch(50% 0.06 225) | #3a6b7d | Not used in CSS — defined but unused |
| `--blue-wash` | oklch(92% 0.020 220) | #d7e8ee | Income area fill (chart) |
| `--gold` | oklch(60% 0.10 78) | #a17833 | Warnings, near-limit, coach heads-up |
| `--olive` | oklch(48% 0.07 130) | #50663a | Confirmation, on-pace, sync dot |

#### Derived / inline colors

| Expression | Where | Notes |
|------------|-------|-------|
| `color-mix(in oklch, var(--paper) 96%, transparent)` | `.topbar` background | Semi-transparent paper for backdrop-filter |
| `color-mix(in oklch, var(--olive) 18%, transparent)` | Sync dot box-shadow | Pulse glow |
| `color-mix(in oklch, var(--olive) 6%, transparent)` | Sync dot pulse peak | Expanded glow |

#### Unused tokens

`--paper-edge`, `--red-soft`, `--blue-soft` are defined in `:root` but never referenced in CSS rules.

### 1.2 Font families

| Token | Value | Role |
|-------|-------|------|
| `--display` | 'Fraunces', 'Times New Roman', Times, serif | Headings, numbers, section marks, display type |
| `--body` | 'Newsreader', Georgia, 'Iowan Old Style', serif | Body text, labels, buttons, inputs |

Google Fonts load spec: `Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100` and `Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700`.

### 1.3 Layout dimensions

| Token | Value | Notes |
|-------|-------|-------|
| `--sidebar-w` | 248px | DESIGN.md says 256px — discrepancy |
| `--topbar-h` | 56px | Matches DESIGN.md |
| `--statusbar-h` | 38px | Matches DESIGN.md |

---

## 2. Typography Scale

### 2.1 All font sizes (ascending)

| Size | Where used | Family | Weight | Extras |
|------|-----------|--------|--------|--------|
| 8.5px | fiscal-bar-marker::after ("budget" label) | body | — | ls 0.18em, uppercase |
| 9px | btn .caret | — | — | — |
| 9.5px | sidebar-section-label, account-head .num, tx-tag, alert-kind | body | 700 (label), — (others) | ls 0.24em/0.06em/0.14em/0.22em, uppercase/small-caps |
| 10px | sidebar-brand .vol, hero-split .l, ledger-table th, goal-eyebrow, coach-kind, topbar-search kbd, statusbar kbd | body | 600–700 | ls varies (0.12–0.24em), uppercase |
| 10.5px | account-bal .trend, hero-kicker, kpi .l .micro, row-actions a, fiscal-edit a, goal-contribute, coach-meta, alert-action, sidebar-foot .role | body | varies | uppercase / italic mix |
| 11px | hero-split .foot, section-head .h-meta, tabs label, chips label, link-action, fiscal-edit, goal-pace, coach-stat .lbl, statusbar .shortcuts, cashflow axis text | body | 600 | ls varies, uppercase |
| 11.5px | kpi .d, tx-date, distribution .name .note, ledger-foot, goal-eta, btn-sm, statusbar | body | — | italic / small-caps mix |
| 12px | topbar .sub, hero-kicker .recent, distribution .pct, legend, legend .summary | body | 400 | italic |
| 12.5px | account-head .name, btn, marginalia, section-sub, fiscal-name .pct | body/display | 500 | — |
| 13px | sidebar-nav .num, sidebar-foot .avatar, sidebar-foot .name, topbar-search input, distribution .rank, goal-prog, alerts li, coach-kind .num, distribution .total .name (13.5px) | display/body | varies | — |
| 13.5px | ledger-table td, fiscal-name, coach-body, distribution .total .name | body | — | line-height 1.35/1.55 |
| 14px | sidebar-nav a, account-bal .v, tx-bal, fiscal-amount, distribution .name, hero-delta .arrow | body/display | — | — |
| 15px | hero-delta .val, distribution .amount | body/display | 600 | — |
| 16px | topbar .section-mark, section-head .section-num | display | 400 | italic |
| 18px | topbar .title | display | 400 | ls -0.008em |
| 20px | hero-side panel-head h3 | display | 400 | ls -0.01em |
| 22px | sidebar-brand .name, kpi .v | display | 400 | — |
| 28px | coach-stat .big | display | — | — |

### 2.2 Fluid (clamp) sizes

| Element | clamp() | Min | Preferred | Max |
|---------|---------|-----|-----------|-----|
| hero-num | clamp(56px, 8.5vw, 116px) | 56px | 8.5vw | 116px |
| hero-split .v | clamp(20px, 2.2vw, 26px) | 20px | 2.2vw | 26px |
| section-head h3 | clamp(20px, 1.9vw, 26px) | 20px | 1.9vw | 26px |
| goal-name / coach-headline | clamp(22px, 2.1vw, 27px) | 22px | 2.1vw | 27px |

### 2.3 Font variation settings (Fraunces)

| Element | opsz | SOFT | Notes |
|---------|------|------|-------|
| .roman (utility class) | 14 | 80 | Muted italic numerals |
| sidebar-brand .name | 48 | 30 | Crisp display |
| sidebar-brand em | 48 | 100 | Soft italic "The" |
| sidebar-nav .num | 14 | 80 | Small roman numerals |
| sidebar-foot .avatar | 18 | 90 | Initials in avatar |
| topbar .section-mark | 24 | 80 | § mark |
| topbar .title | 24 | 40 | Section title |
| hero-num | 144 | 30 | Large display number |
| marginalia | 14 | 80 | Annotation text |
| hero-split .v | 48 | 30 | Sub-metrics |
| hero-side panel-head h3 | 48 | 30 | Panel title |
| hero-side panel-head h3 em | 48 | 100 | Italic word in title |
| kpi .v | 40 | 30 | KPI values |
| section-head h3 | 60 | 30 | Section titles |
| section-head h3 em | 60 | 100 | Italic word in title |
| account-bal .v | 30 | 30 | Account balance |
| tx-bal | 24 | 20 | Transaction balance |
| fiscal-name .pct | 14 | 70 | Budget percentage |
| fiscal-amount | 30 | 25 | Budget amount |
| distribution .rank | 14 | 70 | Rank numerals |
| distribution .amount | 30 | 20 | Category amount |
| goal-name | 48 | 40 | Goal heading |
| goal-name em | 48 | 100 | Italic in goal |
| goal-eta .pct | 14 | 40 | Goal percentage |
| coach-kind .num | 14 | 70 | Coach note number |
| coach-headline | 48 | 35 | Coach heading |
| coach-headline em | 48 | 100 | Italic in coach |
| coach-stat .big | 48 | 30 | Big stat number |
| anno-text (SVG) | 18 | 60 | Chart annotation |
| statusbar ticker strong | 14 | 30 | Ticker values |

### 2.4 Letter-spacing patterns

| Value | Usage pattern |
|-------|--------------|
| -0.03em | hero-num (large display) |
| -0.018em | coach-headline |
| -0.015em | sidebar-brand .name |
| -0.012em | section-head h3, goal-name |
| -0.01em | panel-head h3 |
| -0.008em | topbar .title |
| -0.005em | sidebar-nav .name |
| 0.02em | btn, kpi .l .micro |
| 0.04em | pills, kbd, hero-kicker .recent, fiscal-edit |
| 0.06em | account-head .num |
| 0.08em | tx-date, goal-pace em, row-actions a |
| 0.10em | coach-stat .lbl, alert-action, fiscal-edit a |
| 0.12em | tabs label |
| 0.14em | sidebar-brand .vol, topbar .sub .meta, link-action, chips label, tx-tag, goal-contribute |
| 0.16em | section-head .h-meta |
| 0.18em | hero-split .l, ledger-table th, fiscal-bar-marker::after, kpi .l |
| 0.20em | goal-eyebrow |
| 0.22em | hero-kicker, coach-kind, alert-kind |
| 0.24em | sidebar-section-label |

Pattern: tighter for large display, wider for small uppercase labels. Two clusters — negative for display type, 0.10–0.24em for label/eyebrow type.

### 2.5 Line-height values

| Value | Where |
|-------|-------|
| 0.86 | hero-num |
| 1 | sidebar-brand .name, topbar .title, hero-split .v, kpi .v, coach-stat .big, btn .plus, hero-delta .arrow |
| 1.05 | goal-name |
| 1.06 | coach-headline |
| 1.2 | sidebar-foot .name, btn |
| 1.35 | marginalia, ledger-table td |
| 1.4 | goal-pace |
| 1.45 | alert body |
| 1.55 | coach-body |

---

## 3. Spacing

### 3.1 All unique padding values

| Value | Occurrences |
|-------|-------------|
| 1px 5px | nav .pill, kbd |
| 0 4px | statusbar kbd |
| 4px 0 | chips label |
| 5px 11px | tabs label |
| 6px | sidebar-foot .settings |
| 6px 11px | btn-sm |
| 7px 12px | topbar-search |
| 7px 13px | btn |
| 8px 0 | coach-stat |
| 8px 20px | sidebar-nav a |
| 9px 0 | accounts-list li (9px 20px) |
| 9px 8px 9px 0 | ledger-table th |
| 10px 0 | distribution li |
| 11px 0 | kpi |
| 11px 8px 11px 0 | ledger-table td |
| 12px 0 | alerts li, statusbar .sync-pill area |
| 12px 16px | sidebar-foot |
| 13px 0 | fiscal-list li |
| 14px 0 12px | sidebar-scroll |
| 14px 16px 14px 0 | hero-split > div |
| 16px 20px 14px | sidebar-brand |
| 20px 22px 18px | goals-grid article |
| 20px 22px 22px | coach-note |

### 3.2 Fluid padding (clamp)

| Where | Expression | Min | Preferred | Max |
|-------|-----------|-----|-----------|-----|
| topbar horizontal | clamp(20px, 3vw, 40px) | 20px | 3vw | 40px |
| main padding-top | clamp(20px, 2.6vw, 36px) | 20px | 2.6vw | 36px |
| main padding-sides | clamp(20px, 3vw, 40px) | 20px | 3vw | 40px |
| main padding-bottom | clamp(28px, 3.5vw, 44px) | 28px | 3.5vw | 44px |
| section spacing | clamp(24px, 3.5vw, 38px) | 24px | 3.5vw | 38px |
| hero gap | clamp(28px, 4vw, 64px) | 28px | 4vw | 64px |
| middle/double gap | clamp(24px, 3.5vw, 48px) | 24px | 3.5vw | 48px |

### 3.3 Gap values

| Value | Where |
|-------|-------|
| 6px | btn, hero-actions, topbar-search svg offset (via align), statusbar ticker .item |
| 7px | statusbar sync-pill |
| 8px | sidebar-brand, sidebar-nav a, account-head, topbar-search, topbar-actions, coach-kind, goal-eyebrow, coach-stat, coach-actions |
| 9px | goals-grid article (flex gap) |
| 10px | hero-delta, row-actions, fiscal-name |
| 12px | hero-kicker, sidebar-foot, section-head .h-title, distribution li |
| 14px | topbar-title, kpi, section-head, section-head .h-controls, chips |
| 16px | alerts li, statusbar > div |
| 18px | topbar, statusbar ticker, statusbar shortcuts |
| 22px | legend .items |
| 24px | hero-num-wrap, statusbar |
| 28px | legend |

### 3.4 Margin values

| Value | Where |
|-------|-------|
| 2px | account-head margin-bottom, fiscal-edit margin-top, goal-prog margin-top |
| 4px | topbar .sub margin-left, hero-split .foot margin-top, goal-eta margin-top, coach-stat margin-top (4px 0 8px) |
| 5px | hero-split .v margin-top |
| 6px | marginalia margin-right (::before), goal-bar margin-top |
| 8px | coach-stat margin-bottom, marginalia padding-bottom |
| 10px | hero-side panel-head margin-bottom/padding-bottom, coach-headline margin-bottom, goal-contribute margin-top |
| 12px | coach-kind margin-bottom, coach-body margin-bottom, ledger-foot margin-top, coach-meta margin-bottom/padding-top |
| 14px | hero-kicker margin-bottom, hero-actions margin-top, hero-delta margin-top, legend margin-top |
| 16px | section-head margin-bottom |
| 26px | hero-split margin-top |

### 3.5 Spacing anomalies

Raw padding values that don't fit a 4px grid:
- 5px (hero-split .v margin-top, tabs label padding-top)
- 7px (topbar-search, btn padding-top)
- 9px (accounts-list li, ledger th, section-head padding-bottom, goals-grid article gap)
- 9.5px — no direct px padding, but 9.5px used as font size
- 11px (tabs label padding-side, btn-sm padding-side, fiscal-edit)
- 13px (btn padding-side, fiscal-list li padding)
- 14px (sidebar-scroll top, hero-kicker mb, etc.)
- 18px (goals-grid article padding-bottom in coach-note)
- 22px (goals-grid article padding-side, coach-note padding-side)
- 26px (hero-split margin-top)

Many values approximate a 4px base but deviate: 7 ≈ 8, 9 ≈ 8, 11 ≈ 12, 13 ≈ 12, 14 ≈ 16, 22 ≈ 24, 26 ≈ 24.

---

## 4. Borders & Hairlines

### 4.1 Border widths

| Width | Color | Usage |
|-------|-------|-------|
| 1px | `--ink` | Sidebar right, topbar bottom, statusbar top, section-head bottom, hero-split top, kpi last, fiscal first, goals-grid top, sidebar-brand bottom (rule), sidebar-foot top |
| 1px | `--rule` | Standard dividers throughout — hero bottom, middle bottom, goals bottom, coach bottom, nav .pill border, tabs border, coach-meta top, goal-bar bg |
| 1px | `--rule-soft` | Light dividers — table rows, kpi rows, distribution rows, accounts-list, fiscal rows, coach-stat borders |
| 1px | transparent | sidebar-nav border-left (becomes red on active), sidebar-foot settings border |
| 2px | `--ink` / color | Coach-note top (colored: red/blue/gold), fiscal total top, sidebar-nav active left |
| 3px | `--red` | Over-budget bar fill (.fiscal-bar-fill.over becomes 3px) |

### 4.2 Border patterns

- No border-radius anywhere except sync dot (border-radius: 50% — it's a circle)
- Sidebar-nav active state: 2px solid `--red` left border
- Hairlines (1px `--rule`) separate sections — never cards
- Strong borders (1px `--ink`) mark structural boundaries (sidebar, topbar, statusbar, section heads)

---

## 5. Sizing

### 5.1 Fixed dimensions

| Element | Width | Height |
|---------|-------|--------|
| Sidebar | 248px (var) | 100vh |
| Topbar | — | 56px (var) |
| Status bar | — | 38px (var) |
| Avatar | 32px | 32px |
| btn-icon | 32px | 32px |
| Account dot | 8px | 8px |
| Notification badge | 6px | 6px |
| Sync dot | 6px | 6px |
| New entry indicator | 4px | 4px |
| Scrollbar thumb | 6px | — |
| Search icon (SVG) | 13px | 13px |
| Settings icon (SVG) | 14px | 14px |
| btn-icon SVG | 15px | 15px |
| Legend swatch | 20px | 1.4px |
| Distribution bar | — | 1.5px |
| Goal bar | — | 1.5px |
| Budget bar | — | 2px (3px over) |
| Budget marker tick | 1px | top -3px to bottom -3px (8px) |
| Cashflow SVG viewBox | 640 | 260 |
| Income/spend stroke | — | 1.2px |
| Anno line stroke | — | 0.8px |
| Anno dot | — | r=2.6 |

### 5.2 Fluid widths (clamp)

| Element | Expression |
|---------|-----------|
| topbar-search | clamp(200px, 28vw, 360px) |
| cashflow SVG height | clamp(220px, 26vw, 260px) |

### 5.3 Grid proportions

| Grid | Columns |
|------|---------|
| body | var(--sidebar-w) 1fr |
| hero | 1.4fr 1fr |
| middle (cashflow + distribution) | 1.5fr 1fr |
| double (ledger + budgets) | 1.45fr 1fr |
| hero-split | repeat(3, 1fr) |
| goals-grid | repeat(3, 1fr) |
| coach-grid | repeat(3, 1fr) |
| topbar | 1fr auto auto |
| statusbar | auto 1fr auto |
| sidebar-nav a | 28px 1fr auto |
| kpi | 1fr auto auto |
| distribution li | 22px 1fr auto auto |
| fiscal-list li | 1fr auto (rows: auto auto) |
| ledger columns (HTML) | 80px / flex / 76px / 92px / 100px |
| alerts li | 100px 1fr auto |

---

## 6. Transitions & Animation

### 6.1 Hover/interaction transitions

| Duration | Easing | Properties | Elements |
|----------|--------|------------|----------|
| 160ms | ease-out | background, color | sidebar-nav a, accounts-list li, sidebar-foot .settings |
| 180ms | ease-out | background, color, border-color | btn, link-action, tabs label, chips label, distribution li, ledger-table tr, fiscal-edit a, alert-action, goal-contribute, row-actions opacity |
| 200ms | ease-out | background | goals-grid article |
| 280ms | ease-out | left | sidebar off-canvas slide (responsive) |

### 6.2 Entrance animations

| Name | Duration | Easing | Effect |
|------|----------|--------|--------|
| reveal | 700ms | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0→1, translateY(8px→0) |
| drawBar | 800ms (distribution), 1000ms (fiscal), 1200ms (goals) | cubic-bezier(0.16, 1, 0.3, 1) | scaleX(0→1) |
| pulse | 2.6s | ease-in-out, infinite | Sync dot box-shadow pulsing |
| (inline) | 320ms | cubic-bezier(0.16, 1, 0.3, 1) | Cashflow period tab ack (opacity flash) |

### 6.3 Stagger pattern

Reveal children staggered at 60ms increments: 0, 60, 120, 180, 240, 300, 360, 420ms (8 slots).

### 6.4 Reduced motion

`prefers-reduced-motion: reduce` disables all transitions and animations globally via `* { animation: none !important; transition: none !important; }`.

---

## 7. Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| ≤1240px | Hero single column, marginalia hidden, hero-num-wrap single column |
| ≤1080px | Middle/double/goals/coach stack to single column. Goals get bottom borders instead of right. Ticker hidden. |
| ≤960px | Sidebar off-canvas (fixed, left: -100%, 280px wide). Topbar sub hidden. Shortcuts hidden. |
| ≤720px | Hero-split stacks. Alerts single column. Search hidden. |

---

## 8. Selection & Scrollbar

- `::selection`: background `--gold`, color `--paper`
- Scrollbar (webkit): 6px wide, thumb color `--rule`
- `backdrop-filter: blur(8px)` on topbar

---

## 9. Special Text Treatments

| Treatment | CSS | Where |
|-----------|-----|-------|
| Tabular nums | `font-variant-numeric: lining-nums tabular-nums` | All financial figures, .tabnum utility |
| All-small-caps | `font-variant-caps: all-small-caps` | account-head .num, tx-date, hero-split .foot em, goal-pace em |
| Uppercase + letter-spacing | `text-transform: uppercase` + wide ls | Every label/eyebrow (9.5px–11px range) |
| Negative letter-spacing | -0.03em to -0.005em | Display type (headings, hero-num) |
| Cents rendering | `font-size: 0.42em` + muted color | hero-num .cents |
| Italic as register signal | `font-style: italic` | Marginalia, metadata, sub-text, trends |
