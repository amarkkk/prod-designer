---
name: Component building pattern
description: Follow the reference button component pattern from portfolio Figma for all Figma component construction — variant axes, states, nesting, token naming, focus rings
type: feedback
---

When building Figma components for the proposed page, follow the reference button pattern at node 20323:6421 in the portfolio file.

**Why:** The user has an established component building methodology with specific patterns for annotation, modularity, nesting, tokens, text properties, variant axes, and interactive states. Components must match this quality bar — it's what the portfolio demonstrates.

**How to apply:**
- Full state coverage: Enabled, Hovered, Pressed, Focused, Disabled (5 states per component)
- Token naming: `--{component}/{scheme}/{style}/{property}/{context}/{state}`
- Focus rings as separate positioned elements, not Figma effects
- Boolean toggles for optional slots (icons, badges)
- Text content exposed as component text properties
- Annotated matrix layout showing all variant combinations
- Full analysis documented in `docs/added/02-component-catalog.md` Appendix A
