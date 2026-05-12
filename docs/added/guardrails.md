# Guardrails — The Ledger

Extracted from `docs/original/DESIGN.md`. Every constraint that design decisions must be checked against. If a proposed change violates any of these, flag it before execution.

Source sections referenced as `§n` matching DESIGN.md numbering.

---

## Typography (§2)

- Body text never goes below 13px
- Smallcaps reserved for labels, never body
- Italic is meaningful — never decorative. Eyebrow and marginalia italics signal a different register
- No system fonts, no Inter, no monospace as a "technical" affectation
- Only Fraunces (display) and Newsreader (body) — no other typefaces
- All financial figures use `font-variant-numeric: lining-nums tabular-nums` (columns of money must align)
- Cents portion rendered at 0.42em of integer size with muted color
- Fluid scale declared with clamp() — hero scales 56px → 116px

## Color (§3)

- All colors defined in oklch() for perceptually uniform tints
- No pure black, no pure white
- Tint neutrals toward the brand hue (paper neutrals: hue 76–80 warm; ink neutrals: hue 50–55 warm)
- Cool greys forbidden — they fight warm accents
- Never use gradient text or rainbow gradients
- Red (oxblood) only for alerts and debits — never for ordinary spending decreases
- Semantic mapping is strict:
  - Red → debits, over-budget, alerts, contribute CTAs, active-nav bar
  - Blue → credits, positive deltas, income, on-pace
  - Gold → warnings, near-limit states
  - Olive → confirmation signals

## Layout (§4)

- Two-column grid: sidebar + main content
- Sidebar: 256px wide (note: HTML uses 248px — discrepancy), sticky, full viewport height
- Topbar: sticky, 56px
- Status bar: sticky bottom, 38px
- Sections separated by 1px hairlines, never cards
- Each section has its own § number marker in the heading

## Density & rhythm (§5)

- Section padding 20px, not 32px — this is an app, not a landing page
- Hairlines do the work of borders — cards almost never appear
- When card-like enclosure is necessary (Coach notes), drawn with 2px colored top rule and no other edges
- Drop shadows are forbidden — depth comes from paper tone differences only (--paper, --paper-deep, --paper-sunk)
- Vertical rhythm comes from typography, not from margins

## Components (§6)

- Buttons are never rounded beyond 0px — square corners reinforce printed-page metaphor
- Marginalia hidden on screens below 1240px
- Coach is the only place where 3-line body copy is allowed — discipline elsewhere: data first, never prose
- The Ledger uses real double-entry layout: Date · Entry · Debit · Credit · Balance
- Budget bars: 2px ink bar; when over budget turns oxblood, grows to 3px, tick marker appears
- Goals: three columns separated by hairlines, no enclosing card

## Motion (§7)

- Restraint and orchestration over micro-interactions
- Page load: staggered fade-up, 60ms increments, cubic-bezier(0.16, 1, 0.3, 1)
- Bars draw left-to-right via scaleX() over 800–1200ms
- Sync dot: only continuous motion allowed (2.6s pulse, infinite)
- Hover states: 180ms ease-out color/background changes only — never animated layout properties
- Bounce/elastic easing forbidden — real objects decelerate smoothly
- prefers-reduced-motion: reduce disables every transition and animation globally

## Accessibility (§8)

- SVG charts must carry `<title>` and `<desc>` for screen readers
- aria-current="page" on active sidebar nav
- aria-live="polite" on status-bar ticker
- Filter chips and period tabs must be real `<input type="radio">` with associated `<label>`
- Keyboard: Cmd+K focuses search

## Anti-patterns (§9)

Explicit "do not do" list — these are fingerprints of generic AI-generated dashboards:

| Forbidden | Reason |
|-----------|--------|
| Drop shadows | Print metaphor; depth from paper tones |
| Rounded corners on rectangles | Page is set, not cushioned |
| Gradient text / metric gradients | Decoration without meaning |
| Glassmorphism, frosted cards | Cool without being designed |
| Generic SaaS card grids | Repetition disguised as structure |
| Big emoji or rounded-corner icons above headings | Templated 2024 default |
| Inter as a body font | Overused, signals "AI made this" |
| Monospace for "technical" feel | Cheap shorthand |
| Bouncing easing curves | Toy-like; real objects don't bounce |
| Dark-mode-by-default with neon accents | The "didn't decide" default |
| Red for spending decreases | Red is alert, blue is credit/good |

---

## Known violations in current artifact

These are places the HTML itself breaks its own guardrails:

- **Body text below 13px:** sidebar labels at 9.5px, metadata at 10px–10.5px, eyebrows at 10px, kbd at 10px. DESIGN.md says "body text never goes below 13px" — these are labels/metadata, so arguably a grey area, but the density adds up.
- **Sidebar width:** DESIGN.md says 256px, CSS uses 248px (--sidebar-w: 248px)
- **No focus indicators:** interactive elements (buttons, links, nav items) have no visible :focus styles — only hover transitions. Keyboard users have no visible indicator.
- **Progressive content hiding:** responsive breakpoints hide content (marginalia, search, ticker, shortcuts) without providing alternative access paths.
