# Figma Component Review — Code to Figma

For reviewing AI-generated Figma components against the HTML/CSS source. Focus is on structural and visual accuracy of the translation, not design judgment or guardrails enforcement.

## Page 1 as-is overrides

These project-specific rules supersede the generic component-library checklist for Ch 2.1 Page 1 work:

- Use a 1680px desktop browser reference for source measurements. Figma component-library sections do not need to be 1680px wide; organize them for scanability on the canvas.
- Translate only what exists in `the-ledger.html` and its CSS. Do not add Pressed, Focused, Disabled, Error, or other states unless the HTML/CSS explicitly defines or uses them.
- Keep code-derived names for layers and component parts whenever the HTML provides names. Use helper slots only when Figma needs a wrapper the DOM does not have, and prefix those helpers with `_`.
- Build from the atom inventory in `reference/02-component-catalog.md` A1-A13. `topbar-search` is cataloged as M5, but may be included in Ch 2.1 as the current input-field exception because it is the only search/input atom-sized control in the source.
- Parent components must use nested component instances for reusable parts: examples include `btn-icon` using `Icon`, `tabs` using `_tabs__label`, `chips` using `_chips__label`, and `topbar-search` using `Icon` plus `kbd`.
- On the canvas, place the smallest organizational level above the parent component set: helper components first, composed components below.
- Typography samples are documentation, not atoms. Keep them outside `Atoms — As-is`, include one sample for every real local `as-is/` text style, and label each sample with its source CSS selector(s).
- Page 1 remains a faithful as-is recreation: exact raw colors, type, spacing, and warts. No proposed-page accessibility fixes, token normalization, or extra interaction patterns.

## Setup

- Open `the-ledger.html` at 1680px viewport width in browser for Page 1 as-is review
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
- [ ] Rich text nodes with range-level `em`, `strong`, `.figure`, or `.num` styling may report `mixed` text styles. Verify there are no truly unstyled text nodes before treating `mixed` as a failure.

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
- [ ] CSS `border-bottom`, `border-top`, `border-left`, and `border-right` are modeled with Figma individual stroke weights on the relevant frame/component, not with extra `_border-bottom` rectangle layers
- [ ] Composed components override nested instance side strokes where CSS removes shared borders, e.g. `tabs label:last-of-type { border-right: none; }`, without detaching the nested instances
- [ ] No border-radius anywhere except sync dot (50%)

### 6. Sizing

- [ ] Fixed dimensions match (widths, heights from token extraction section 5)
- [ ] SVG and icon sizes match
- [ ] For fluid sizes (clamp), Figma uses the static value at the 1680px desktop source reference

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
- [ ] If shared text properties collapse source-backed variant examples, preserve accurate specimen content and document the unbound-property tradeoff
- [ ] Optional slots use boolean properties (icons, badges, hints)
- [ ] Variant axes match the state inventory from the component catalog
- [ ] Icon slots use instance swap properties where applicable
- [ ] Parent component APIs do not duplicate every nested child state; child-owned states stay on the child component

### 10. Helper components

- [ ] Repeated subparts with their own states extracted as `_` prefixed helpers
- [ ] Helpers are not meant for direct use by designers
- [ ] Parent component has a clean API because internals are in helpers
- [ ] Higher-level components use approved lower-level instances wherever those exist
- [ ] Missing lower-level dependencies are explicitly marked in Figma and documented in the session log
- [ ] No missing atom/helper is silently redrawn inline inside a molecule, organism, or mockup

---

## States

### 11. State completeness

- [ ] All hover states from CSS transitions are represented
- [ ] Focus state present (browser default ring for as-is; custom `_focus-ring` for proposed)
- [ ] Active/checked states for tabs, chips, nav items
- [ ] Semantic variants present (e.g., trend up/down/neutral, alert info/warn/due/win)

### 12. State order (consistent across all components where those states exist)

```
Enabled
Hovered
Pressed
Focused
Disabled
```

For the as-is page, do not invent missing states. If the HTML/CSS only defines enabled and hover behavior, include only Enabled and Hovered. Active/checked states are separate variant axes when the HTML uses them.

### 13. State ownership across nested components

- [ ] Component-level states only represent changes owned by that component's DOM/CSS.
- [ ] Parent hover/focus/active variants may reveal, hide, or restyle nested slots when the source does that.
- [ ] Parent variants do not multiply by every possible nested child state.
- [ ] Nested interactive components keep their own state variants in their own component set.
- [ ] Combined parent + child state variants are added only when the source explicitly defines a distinct combined visual.

---

## Component set presentation

- [ ] Variants laid out with consistent gaps and 20px inset/padding where the set has a visible wrapper
- [ ] Component sets use the local `Component border` paint style for their presentation stroke
- [ ] Component set wrappers have clipping enabled, with enough padding that variants and labels are not clipped
- [ ] State order consistent across all component sets
- [ ] Multi-axis components use grid layout
- [ ] Single-axis state components use vertical stack
- [ ] No variant is clipped by component set bounds
- [ ] Annotation labels on axes where useful
- [ ] Component and variant labels are readable next to or below the components; avoid using overly spaced display/sidebar labels for documentation text

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
