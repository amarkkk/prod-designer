# Figma Component Structure Guide

This guide captures the reusable component-building method from the SensorView Figma work. It is intentionally focused on component structure, nesting, helper components, variants, properties, and token-ready naming.

Use it when recreating a visual mockup in Figma as a component library.

## 1. Build Order

Build from smallest parts to largest structures.

```text
01 Foundations / raw styles
02 Component anatomy
03 Atoms
04 Molecules
05 Organisms + templates
06 Prototype assembly
07 QA + decisions
```

For a one-page presentation file, keep all of these as large section frames on one Figma page.

Do not start with final screens. Build the component library first, then assemble screens from instances.

## 2. Component Levels

### Atoms

Atoms are the smallest reusable UI pieces.

Examples:

```text
Icon
Icon size layer
Button
IconButton
TextInput
NumericInput
Badge
Divider
Tooltip
Kbd
Marker
```

### Molecules

Molecules compose atoms into reusable interface units.

Examples:

```text
ViewModeToggle
ViewPresetBar
NavControlCluster
SensorListItem
ContextMenu
NumericInputGroup
ValidationRow
CoordinateReadout
```

### Organisms

Organisms compose molecules into full UI regions.

Examples:

```text
TopBar
SensorPanel
InspectorPanel
ViewportScene
StatusBar
AppFrame
```

## 3. Component Set Presentation

Keep every component set readable on the canvas.

Rules:

- Place variants with a consistent outer inset, usually `20px`.
- Use consistent row and column gaps.
- Keep component-set bounds large enough so no variant is clipped.
- Keep state order consistent across components.
- Prefer a grid for multi-axis components.
- Prefer a vertical stack for single-axis state components.

Recommended state order:

```text
Enabled
Hovered
Pressed
Focused
Disabled
Error, if applicable
```

Example single-axis layout:

```text
AddSensorButton
  State=Enabled   x=20 y=20
  State=Hovered   x=20 y=72
  State=Pressed   x=20 y=124
  State=Focused   x=20 y=176
  State=Disabled  x=20 y=228
```

The presentation frame around the variants can have a visible component border and padding. That visual organization is for the component set itself. It should not force extra wrapper layers inside every instance.

## 4. Naming Rule

Use hybrid BEM names for layers you own inside a component.

Good:

```text
button__surface
button__label
input__value
sensor-list-item__warning
context-menu-item__label
```

But do not rename nested component instances just to make them match the parent.

Good nesting:

```text
Button
  Icon
  button__label

SensorListItem
  _SensorListTypeIcon
  sensor-list-item__label
  WarningDot
  _SensorListActionButton
  _SensorListActionButton
```

Avoid:

```text
Button
  button__icon
  button__label

SensorListItem
  sensor-list-item__visibility-button
  sensor-list-item__menu-button
```

The problem with renaming nested instances is that it hides whether the layer is a reusable component instance or a custom local layer. If context is needed, name the wrapper slot, not the instance.

Preferred:

```text
sensor-panel__footer
  AddSensorButton
```

Instead of:

```text
sensor-panel__footer
  sensor-panel__add-sensor-button
```

Use semantic instance renaming only when it materially improves clarity and does not obscure the component identity.

## 5. Public Components And Helper Components

Public components are meant to be used directly.

Examples:

```text
Button
IconButton
TextInput
SensorListItem
ContextMenu
InspectorPanel
```

Helper components are internal building blocks. Prefix them with `_`.

Examples:

```text
_ViewModeToggleItem
_ViewportButton
_SensorListActionButton
_SensorListTypeIcon
_ContextMenuItem
```

Create a helper component when:

- A repeated subpart has its own states.
- A molecule would otherwise need too many variants.
- The subpart is not meant to be reused directly by designers.
- The parent component needs a clean API.

## 6. Icon Structure

Use two icon layers:

```text
Icon
  Icon name=Camera
  Icon name=Plus
  Icon name=Trash
  Icon name=Gear
  ...

Icon
  Size=lg
  Size=md
  Size=sm
```

The first component set stores raw icon artworks.

The second component set is the sizing layer. Buttons, icon buttons, menus, and list rows use the sizing layer, not raw vector copies.

Rules:

- Keep icons local and unpublished until stable.
- Use instance swap properties for icon choice.
- Use size variants for icon size.
- Do not create a Button variant for every icon.
- Icon color should come from the parent component's icon style or mapping.

## 7. Component Properties

Use component properties for content and slots.

Good component properties:

```text
Label: text
Value: text
Unit: text
Icon: instance swap
Show Icon: boolean
Show Warning: boolean
```

Use variants for visual or behavioral state.

Good variant axes:

```text
State=Enabled/Hovered/Pressed/Focused/Disabled
Style=Primary/Secondary/Ghost/Danger
Scheme=Neutral/Accent/Danger
Selection=Inactive/Active
Mode=Placement/Coverage
Tone=Default/Danger
```

Avoid variants for:

- Every text string.
- Every icon.
- Every data value.
- One-off content changes.

## 8. Button Pattern

Recommended structure:

```text
Button
  Icon
  button__label
```

Recommended API:

```text
Style=Primary/Secondary/Ghost/Danger
State=Enabled/Hovered/Pressed/Focused/Disabled
Label: text property
Show Icon: boolean property
Icon: instance swap property, if needed
```

Rules:

- The icon is a nested `Icon` instance.
- Keep the nested icon instance name as `Icon`.
- The label layer can use `button__label`.
- The label is connected to the `Label` text property.
- Icon visibility is connected to `Show Icon`.
- Button surface, text, icon, and border should each have their own style or mapping.

Do not overload the generic Button for every contextual action. If the visual language is meaningfully different, create a separate component.

Examples:

```text
AddSensorButton
DeleteSensorButton
```

These are separate because they are footer actions with special dashed/soft destructive styling. Adding them as more Button styles would make the generic Button harder to understand.

## 9. IconButton Pattern

Recommended structure:

```text
IconButton
  Icon
```

Recommended API:

```text
Scheme=Neutral/Accent/Danger
State=Enabled/Hovered/Pressed/Focused/Disabled
Icon: instance swap property
```

Rules:

- Keep fixed square dimensions.
- Use the icon size layer.
- Keep the nested instance name as `Icon`.
- Bind the icon glyph color to the IconButton icon style or mapping.

## 10. Input Pattern

Recommended structure:

```text
TextInput
  text-input__value

NumericInput
  AxisBadge, if applicable
  numeric-input__value
  numeric-input__unit
```

Recommended API:

```text
TextInput
  State=Enabled/Hovered/Focused/Disabled/Error
  Value: text property

NumericInput
  Kind=Axis/Plain/Computed
  State=Enabled/Hovered/Focused/Disabled/Error
  Value: text property
  Unit: text property
```

Rules:

- Use nested atoms such as `AxisBadge`.
- Keep nested atom instance names intact.
- Use separate value and unit text layers when they have different styling.
- Do not create variants for different numeric values.

## 11. Menu Item Pattern

Use a helper for rows:

```text
_ContextMenuItem
  Icon
  context-menu-item__label
```

Recommended API:

```text
Tone=Default/Danger
State=Enabled/Hovered/Pressed/Focused/Disabled
Label: text property
Icon: instance swap property
```

Then compose:

```text
ContextMenu
  _ContextMenuItem
  _ContextMenuItem
  _ContextMenuItem
```

Rules:

- The parent menu should not duplicate item internals.
- Hovered and enabled states must be visibly different.
- Danger tone should be clear but not unnecessarily harsh.

## 12. List Item Pattern

Use helpers for repeated controls:

```text
SensorListItem
  _SensorListTypeIcon
  sensor-list-item__label
  WarningDot
  _SensorListActionButton
  _SensorListActionButton
```

Recommended API:

```text
Selected?=No/Yes
Interaction=Default/Hovered
Sensor visible?=Yes/No
Menu opened?=No/Yes
Name: text property
Show Warning: boolean property
```

Rules:

- Visibility is a variant because it affects icon, row tone, and opacity.
- Warning can be a boolean property if it only shows/hides an indicator.
- Action buttons should be helper components, not raw icons.
- Keep helper instance names visible.

## 13. Toggle And Preset Pattern

Use helper items for repeated toggle buttons.

```text
_ViewModeToggleItem
  Icon
  view-mode-toggle-item__label
```

Recommended helper API:

```text
Selection=Inactive/Active
State=Enabled/Hovered/Pressed/Focused/Disabled
Label: text property
Icon: instance swap property
```

Recommended parent API:

```text
ViewModeToggle
  Mode=Placement/Coverage

ViewPresetBar
  Active=3D/Top/Front/Right
```

The helper owns item states. The parent owns the selected mode or preset.

## 14. Special Contextual Actions

Use a dedicated component when a normal Button would be visually too broad or too harsh.

Examples:

```text
AddSensorButton
  State=Enabled/Hovered/Pressed/Focused/Disabled
  Label: text
  Show Icon: boolean

DeleteSensorButton
  State=Enabled/Hovered/Pressed/Focused/Disabled
  Label: text
  Show Icon: boolean
```

These keep the main `Button` API clean while allowing footer-specific styling.

## 15. Token-Ready Styling

If the project is not tokenized yet, use local styles and raw values, but structure them so they can become variables later.

Minimum style groups:

```text
Color styles
Text styles
Effect styles, if needed
Radius notes
Spacing notes
```

When tokenization happens, use this direction:

```text
foundation value -> alias role -> component mapping -> component binding
```

For component mapping, include every applicable element:

```text
button/primary/surface/enabled
button/primary/text/enabled
button/primary/icon/enabled
button/primary/border/enabled
```

Do not create surface-only mappings when text, icon, or border colors also change.

## 16. QA Checklist

Before a component is considered ready:

```text
[ ] Component set has readable spacing and padding.
[ ] Variants are not clipped.
[ ] Variant axes are bounded and understandable.
[ ] Text content uses component properties.
[ ] Icon choice uses instance swap.
[ ] Nested component instances keep their component names unless renaming is necessary.
[ ] Owned internal layers use clear BEM names.
[ ] Helper components use `_` prefix.
[ ] Hover/focus/disabled states are visually distinct.
[ ] Reusable colors and text styles are applied consistently.
[ ] The component can be assembled without detaching.
```

## 17. Lean Transfer Checklist

For a new project:

```text
[ ] Create one page with sections for foundations, anatomy, atoms, molecules, organisms, prototype, QA.
[ ] Create raw color and text styles.
[ ] Build raw Icon set.
[ ] Build Icon size layer.
[ ] Build Button and IconButton.
[ ] Build inputs, badges, dividers, tooltips, markers.
[ ] Build helper components for repeated molecule parts.
[ ] Build molecules from atom/helper instances.
[ ] Build organisms from molecule instances.
[ ] Assemble prototype screens from organism instances.
[ ] QA names, variants, nesting, text clipping, and visual states.
```
