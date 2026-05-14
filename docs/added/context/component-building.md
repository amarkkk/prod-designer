---
name: Component building pattern
description: Agent-facing rules for building Figma components from the HTML source without variant bloat — source-backed states, nesting, naming, composition, and state boundaries
type: feedback
---

Use this file before building any Figma component in Page 1 or Page 2.

**Why:** The user has an established component building methodology with specific patterns for annotation, modularity, nesting, tokens, text properties, variant axes, and interactive states. The same pattern scales from atoms to molecules to organisms, but state ownership must stay bounded so the component system does not explode.

## Page 1 as-is rule

Page 1 is a faithful code-to-Figma reconstruction. Build only what exists in `the-ledger.html` and its CSS.

- Do not add Pressed, Focused, Disabled, Error, or other states unless the source defines or uses them.
- Use the 1680px browser viewport for measurement.
- Use raw `as-is/` color and text styles.
- Keep source class names where they are meaningful.
- Use Figma individual stroke weights for CSS one-sided borders.

## Page 2 proposed rule

For the proposed page, the portfolio reference button pattern is relevant:

- Enabled, Hovered, Pressed, Focused, Disabled where the component needs those states.
- Focus rings as separate positioned elements, not Figma effects.
- Token naming: `--{component}/{scheme}/{style}/{property}/{context}/{state}`.
- Color variables and normalized proposed text styles.

Do not apply this full-state requirement back to Page 1.

## Build Order

1. Read `docs/added/reference/02-component-catalog.md` for the component inventory.
2. Inspect the relevant HTML/CSS before building.
3. Identify the component's owned DOM, owned visual states, reusable child atoms/helpers, and optional slots.
4. Check whether every required lower-level building block already exists.
5. If a required lower-level component is missing, stop and document the gap before building the parent.
6. Build the smallest reusable helpers first.
7. Compose parent components from nested instances.
8. Add readable component and variant labels.
9. Validate structure, nesting, one-sided strokes, and visual match.

## State Ownership And Variant Economy

A component only owns variants for state changes that belong to that component level.

- If a molecule has a hover state that reveals row actions, the molecule gets a `State=Hovered` variant that reveals the action slot.
- The nested action component keeps its own `Enabled/Hovered/...` states in its own component set.
- Do not create every parent × child state combination, such as `Row Hovered + Action Hovered`, `Row Hovered + Action Focused`, `Row Hovered + Action Disabled`, unless the source explicitly shows that combined parent state as a distinct visual requirement.
- If a nested component needs to be demonstrated in a non-default state, show that in the nested component set or a separate example, not by multiplying parent variants.
- Use parent variants for layout, visibility, and parent-owned styling. Use nested component variants for child-owned styling.

This rule applies upward:

- Molecules compose atoms.
- Organisms compose molecules.
- Full mockups compose organisms.

The larger component should not duplicate the full state space of its children.

## Nesting Rules

- Parent components must use nested component instances for reusable parts.
- Higher organizational levels must be built from approved lower-level components whenever such components exist.
- If a molecule, organism, or mockup needs a lower-level component that does not exist yet, mark the missing dependency explicitly in Figma and documentation before proceeding.
- Do not silently draw missing atoms/helpers inline inside a higher-level component. Create or log the lower-level component first.
- Nested component instances keep their own component name.
- If context-specific naming is needed, name the wrapper slot, not the nested instance.
- Do not detach nested instances to make visual fixes.
- Context overrides are allowed on nested instances when CSS composition requires them, for example removing right strokes between adjacent `tabs` labels.

## Missing Dependency Marking

When a lower-level component is missing:

- In Figma, add a visible documentation label near the parent component: `Missing lower-level component: <source class/name>`.
- In the parent component, use a clearly named temporary wrapper such as `_missing--<source-class>` only if layout cannot be reviewed without a placeholder.
- In documentation, add the missing item to the session log under a `Missing lower-level dependencies` note.
- Prefer creating the lower-level component immediately when it is in scope for the current chapter.
- If it is out of scope, do not pretend it is finished; leave the marker for the next chapter/session.

## API Rules

- Text content should be exposed as component text properties where useful.
- Optional slots should use booleans where Figma support and scope make that practical.
- Icon choices should use instance swaps when there is a real icon choice.
- Avoid over-engineering Page 1 APIs; the goal is faithful reconstruction and review, not a reusable product library yet.

### Figma limitations observed in Ch 2.2

- Shared text-property references inside a component set can collapse all variant specimen text to the last edited value. If variants are meant to document different source-backed examples, do not blindly bind them all to one shared parent text property. Prefer accurate source specimens, and document any unbound text-property tradeoff.
- Figma may reject parent-level bindings to text inside nested instance sublayers with `Cannot set component property references on instance sublayer`. Do not detach the nested instance to work around this. Expose nested properties only where Figma allows it; otherwise document the limitation.
- Rich text nodes that use range-level styling for source `em`, `strong`, `.figure`, or `.num` semantics report `mixed` text styles. This is expected. Audit for true missing typography styles by checking nodes with no `textStyleId`, not by treating every `mixed` node as a failure.
- Direct Plugin API edits can leave exact-token fills/strokes detached even when the hex value is correct. After scripted Figma writes, run a paint audit and relink local `as-is/` paint styles, including range-level fill style IDs for rich text where possible.

## Layout And Documentation

- Organize canvas sections for scanability; do not force component sections to a fixed 1680px width.
- Place smaller helper levels above composed parents.
- Component set wrappers use the local `Component border` style, visible padding where useful, clipping enabled, and readable labels.
- Typography samples are documentation, not atoms. Keep them outside component sections and label them with source CSS selector coverage.
