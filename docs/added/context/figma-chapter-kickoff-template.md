# Figma Chapter Kickoff Template

Use this template at the start of every Figma construction chapter, especially Ch 2.2 molecules and Ch 2.3 organisms.

## Session Header

```md
# Ch X.Y — [Level] (Page 1 as-is)

Date: YYYY-MM-DD

Status: In progress

Working file: https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger
Page: `As-is`
Reference viewport: 1680px browser width
Source artifact: `the-ledger.html`
```

## Required Reading

- `docs/added/_index.md`
- `docs/added/00-master-plan.md`
- `docs/added/context/component-building.md`
- `docs/added/review/figma-component-checklist.md`
- `docs/added/reference/02-component-catalog.md`
- `docs/added/reference/01-token-extraction.md` when exact typography, spacing, sizing, color, or border values are needed
- Previous level handoff logs, e.g. `docs/added/sessions/ch-2.1-atoms.md` and `docs/added/sessions/ch-2.2-molecules.md`

## Kickoff Audit

Before creating or editing Figma components, document this audit in the session log.

```md
## Kickoff audit

### Component inventory

| Catalog ID | Component | Source selector(s) | Build? | Notes |
|---|---|---|---|---|
| M1 |  |  | yes/no/defer |  |

### Lower-level dependency audit

| Parent component | Required lower-level component | Exists in Figma? | Action |
|---|---|---:|---|
|  |  | yes/no | use/create/mark missing |

### Owned state audit

| Component | Source state(s) | Parent-owned change | Nested child state avoided |
|---|---|---|---|
|  | Enabled/Hovered/etc. |  |  |

### Missing lower-level dependencies

- None, or:
- `Missing lower-level component: <source class/name>` — where it is needed, why it is missing, and whether it was created or marked in Figma.
```

## Build Rules

- Build only source-backed states for Page 1.
- Higher levels must use approved lower-level instances where they exist.
- If a required lower-level component is missing, create it first if in scope; otherwise mark it in Figma with `Missing lower-level component: <source class/name>` and document it in the session log.
- Parent variants only represent parent-owned state changes.
- Do not create parent x child state combinations unless the source explicitly defines a distinct combined visual.
- Use individual Figma stroke weights for CSS one-sided borders.
- Keep source class names where they are meaningful.
- Add readable labels for component names and variant states.
- Keep component sections organized for scanability rather than fixed 1680px width.

## Validation Checklist

Run these checks before closing the chapter:

```md
## Validation

- [ ] Component inventory checked against `02-component-catalog.md`.
- [ ] Lower-level dependency audit completed.
- [ ] Missing lower-level dependencies are either created or visibly marked in Figma and documented.
- [ ] Nested instance inspection confirms parent components use approved lower-level instances.
- [ ] State audit confirms no parent x child variant explosion.
- [ ] One-sided borders use individual stroke weights; no fake `_border-bottom` rectangle helpers.
- [ ] Text audit distinguishes true unstyled text nodes from intentional rich text `mixed` nodes.
- [ ] Paint audit confirms exact-token fills/strokes are linked to local paint styles after scripted edits.
- [ ] Screenshot review shows no clipping, overlap, or unreadable labels.
- [ ] Session log includes decisions, exceptions, and handoff notes for the next chapter.
```
