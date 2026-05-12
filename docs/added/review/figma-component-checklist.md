# Figma Component Review — Code to Figma

For reviewing AI-generated Figma components against the HTML/CSS source. Focus is on structural and visual accuracy of the translation, not design judgment or guardrails enforcement.

## Setup

- Open `the-ledger.html` at 1440px viewport width in browser
- Have `reference/01-token-extraction.md` open for value lookups
- Have `reference/02-component-catalog.md` open for structure and state reference

---

## Per-component checklist

### 1. Visual match

- [ ] Component visually matches HTML at same viewport width
- [ ] All visual states are distinct and match CSS hover/active/focus/checked behavior
- [ ] No extra visual elements added that don't exist in the HTML

### 2. Color accuracy

- [ ] Fill colors match hex values from token extraction (oklch to hex)
- [ ] Border colors match
- [ ] Text colors match per state
- [ ] **Page 1:** using `as-is/` color styles
- [ ] **Page 2:** using Figma variables (alias/mapping tokens)

### 3. Typography accuracy

- [ ] Font family correct (Fraunces for display, Newsreader for body)
- [ ] Font size matches (exact for as-is, normalized for proposed)
- [ ] Font weight matches
- [ ] Line-height matches
- [ ] Letter-spacing matches
- [ ] Font variation settings: opsz and SOFT values documented or approximated
- [ ] Text transforms correct (uppercase, small-caps, tabular-nums)
- [ ] **Page 1:** using `as-is/` text styles
- [ ] **Page 2:** using proposed text styles

### 4. Spacing accuracy

- [ ] Padding values match CSS (auto-layout padding in Figma)
- [ ] Gap values match CSS flex/grid gap (auto-layout gap in Figma)
- [ ] Margins represented as auto-layout spacing between items
- [ ] **Page 1:** exact pixel values from HTML
- [ ] **Page 2:** normalized to spacing scale

### 5. Border accuracy

- [ ] Border widths match (1px light, 1px medium, 1px heavy, 2px accent, 3px over-budget)
- [ ] Border colors match the three tiers: `--rule-soft`, `--rule`, `--ink`
- [ ] Border positions correct (top, bottom, left, right — not all sides unless specified)
- [ ] No border-radius anywhere except sync dot (50%)

### 6. Sizing

- [ ] Fixed dimensions match (widths, heights from token extraction section 5)
- [ ] SVG and icon sizes match
- [ ] For fluid sizes (clamp), Figma uses the max value (desktop reference at 1440px)

---

## Component structure

### 7. Layer tree

- [ ] Figma layer tree mirrors the DOM structure
- [ ] Auto-layout direction matches CSS flex direction
- [ ] Auto-layout alignment matches CSS align-items / justify-content
- [ ] No unnecessary wrapper frames that don't exist in the HTML

### 8. Naming

- [ ] Component name matches the catalog name from `02-component-catalog.md`
- [ ] Internal layers use hybrid BEM: `block__element`
- [ ] Helper and internal layers prefixed with `_`
- [ ] Nested component instances keep their own component name — do not rename to parent BEM
- [ ] If context is needed for a nested instance, name the wrapper slot, not the instance

### 9. Component API

- [ ] Text content exposed as component text properties
- [ ] Optional slots use boolean properties (icons, badges, hints)
- [ ] Variant axes match the state inventory from the component catalog
- [ ] Icon slots use instance swap properties where applicable

### 10. Helper components

- [ ] Repeated subparts with their own states extracted as `_` prefixed helpers
- [ ] Helpers are not meant for direct use by designers
- [ ] Parent component has a clean API because internals are in helpers

---

## States

### 11. State completeness

- [ ] All hover states from CSS transitions are represented
- [ ] Focus state present (browser default ring for as-is; custom `_focus-ring` for proposed)
- [ ] Active/checked states for tabs, chips, nav items
- [ ] Semantic variants present (e.g., trend up/down/neutral, alert info/warn/due/win)

### 12. State order (consistent across all components)

```
Enabled
Hovered
Pressed
Focused
Disabled
```

For the as-is page, Pressed and Disabled states don't exist in the HTML CSS — include Enabled, Hovered, and Focused at minimum. Active/checked states are separate variant axes.

---

## Component set presentation

- [ ] Variants laid out with consistent gaps (20px inset recommended)
- [ ] State order consistent across all component sets
- [ ] Multi-axis components use grid layout
- [ ] Single-axis state components use vertical stack
- [ ] No variant is clipped by component set bounds
- [ ] Annotation labels on axes where useful

---

## Cross-reference sources

| What to check | Where to find it |
|---|---|
| Raw CSS values (colors, sizes, spacing) | `reference/01-token-extraction.md` |
| Component structure, states, a11y audit | `reference/02-component-catalog.md` |
| Building methodology, naming, checklists | `reference/03-design-system-principles.md` section 6 |
| Reference button pattern (60 variants) | `reference/02-component-catalog.md` Appendix A |
| Token naming convention | `reference/03-design-system-principles.md` section 1 |
| As-is color and text styles list | `reference/03-design-system-principles.md` section 6 |
| Component library build patterns | `reference/figma-component-library-build-guide.md` |
