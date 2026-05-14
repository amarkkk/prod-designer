# Ch 2.3 Organisms Kickoff Prompt

Paste this into the next new conversation.

```md
Start with these docs, in this order:

1. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/added/_index.md`
2. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/added/00-master-plan.md`
3. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/added/context/component-building.md`
4. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/added/context/figma-chapter-kickoff-template.md`
5. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/added/sessions/ch-2.1-atoms.md`
6. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/added/sessions/ch-2.2-molecules.md`
7. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/original/DESIGN.md`
8. `/Users/amark/Documents/GitHub/peak-prod-designer/docs/original/README.md`

We are at Chapter 2.3, creating the Page 1 as-is Organisms and full dashboard mockup in the Figma file:

https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

Page: `As-is`
Source artifact: `/Users/amark/Documents/GitHub/peak-prod-designer/the-ledger.html`
Reference viewport: 1680px browser width.

Important state from previous session:

- Ch 2.1 atoms are approved.
- Ch 2.2 molecules are complete after review corrections. I did not manually fix anything after the agent’s last pass, so treat the Ch 2.2 session log as the latest source of truth.
- The most relevant Ch 2.2 corrections were typography/style retuning, source-backed molecule content, detached paint relinking, rich-text range styling, and the Figma text-property tradeoffs documented in `ch-2.2-molecules.md`.
- Do not rebuild atoms or molecules unless an organism-level blocker exposes a real lower-level defect. If that happens, fix the lower-level component first and document the reason.

Before building anything in Figma, run the kickoff audit from `figma-chapter-kickoff-template.md`:

- List all organism candidates from `docs/added/reference/02-component-catalog.md`:
  - O1 Sidebar
  - O2 Topbar
  - O3 Status bar
  - O4 Hero section
  - O5 Middle section: Cashflow + Distribution
  - O6 Double section: Ledger + Budgets
  - O7 Goals section
  - O8 Coach section
  - O9 Notices section
- Check related values in `docs/added/reference/01-token-extraction.md`.
- Audit required lower-level dependencies for each organism.
- Identify which dependencies already exist as approved atoms/molecules/helpers.
- Explicitly mark any missing lower-level component instead of drawing it inline.
- Audit organism-owned states only, avoiding organism x molecule x atom state explosion.

Build rules:

- Page 1 is source-backed only. Do not invent states, content, or layout fixes that the HTML/CSS does not define or use.
- Higher organizational levels must be composed from approved lower-level component instances where they exist.
- If a required lower-level component is missing, either create it first if it is in scope, or add a visible Figma marker: `Missing lower-level component: <source class/name>` and document it in the Ch 2.3 session log.
- Organism states should only cover organism-owned changes. Nested molecule/atom states stay in their own component sets.
- Use individual Figma stroke weights for one-sided CSS borders; do not use fake `_border-bottom` rectangles.
- Keep source-derived names where the HTML/CSS provides meaningful class names.
- Organize the organism section and full mockup for scanability; do not force component documentation sections into fixed 1680px widths.
- The final dashboard mockup itself should match the source layout at the 1680px reference viewport.
- Add readable labels for organism names and variant/state documentation.

Ch 2.2 Figma caveats to carry forward:

- Some rich text nodes intentionally report `mixed` text styles because source semantics require range styling (`em`, `strong`, `.figure`, `.num`). Audit true unstyled text with `!textStyleId`, not by treating all `mixed` nodes as missing styles.
- Shared parent text-property references collapsed source-backed variant examples in several molecule sets. Ch 2.2 unbound variant-specific specimen text where needed to preserve accurate source examples. Do not rebind those blindly.
- Figma rejected parent bindings to nested instance sublayer text (`Cannot set component property references on instance sublayer`). Expose nested props only where Figma allows it; otherwise document the limitation.
- After direct Figma edits, run a paint audit and relink exact token colors back to local `as-is/` paint styles.

Expected Ch 2.3 output:

- Create/update `docs/added/sessions/ch-2.3-organisms.md`.
- Build the `Organisms — As-is` section on Page `As-is`.
- Assemble the full Page 1 dashboard mockup from approved organism/molecule/atom instances.
- Validate nesting, source states, missing dependencies, one-sided borders, text styles, paint styles, and screenshot quality before closing the chapter.
```

