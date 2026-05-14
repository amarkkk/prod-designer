# Ch 3.1 Token Normalization Kickoff Prompt

Use this prompt to start Phase 3.

---

We are starting Phase 3, Chapter 3.1: Token normalization and Figma variables for the `Proposed` page.

Working file:
https://www.figma.com/design/5SxLdRVd3N0GKljJutwUb7/The-Ledger

Current state:

- Page 1 `As-is` is closed as the faithful source-backed baseline.
- Ch 2.1 atoms are approved.
- Ch 2.2 molecules are complete after review corrections.
- Ch 2.3 organisms and `full-dashboard-mockup` are complete after deep audit fixes.
- Treat `docs/added/sessions/ch-2.3-organisms.md` and `docs/added/review/ch-2.3-organism-mockup-deep-audit.md` as the latest source of truth for Page 1.

Before touching Figma:

1. Read `docs/added/00-master-plan.md`.
2. Read `docs/added/_index.md`.
3. Read `docs/added/guardrails.md`.
4. Read `docs/added/reference/01-token-extraction.md`.
5. Read `docs/added/reference/02-component-catalog.md`.
6. Read `docs/added/reference/03-design-system-principles.md`.
7. Read the source DSB chapters in `docs/added/dsb/` as needed, especially:
   - `Chapter_04_Accessibility_v3-1.md`
   - `Chapter_05_Responsiveness_v3-3.md`
   - `Chapter_06_Component_Anatomy_v3-2.md`
   - `Chapter_07_Design_Tokens_v3-2.md`
   - `Chapter_10_Typography_v3-3.md`
8. Read `docs/added/sessions/ch-2.3-organisms.md`.
9. Read `docs/added/review/ch-2.3-organism-mockup-deep-audit.md`.

Important context:

- `docs/added/reference/03-design-system-principles.md` was created before the Page 1 UI construction and by a different agent.
- Do not treat it as fixed truth. Validate it against the DSB chapters and the actual Ch 2.1-Ch 2.3 Figma work.
- Improve `03-design-system-principles.md` if it is stale, too generic, too complex for this project, or missing useful principles exposed by the Page 1 build.
- Page 1 `As-is` and all existing `as-is/` color/text styles are locked source evidence. Do not edit, rename, normalize, delete, or rebind them.
- The `Proposed` page does not exist yet. Create it by duplicating the completed `As-is` page, then rename the duplicate to `Proposed`. Work only on the duplicate.
- Proposed color styles and text styles must live in separate `proposed/` style groups. Do not reuse the `as-is/` style namespace for proposed composite design tokens.

Chapter goal:

- Normalize extracted as-is tokens into a coherent proposed-page token system.
- Create/update Figma variables for the `Proposed` page only.
- Do not normalize or rewrite Page 1 `As-is`.
- Duplicate `As-is` to create `Proposed`, then build the proposed variable/style system only there.
- Add a practical vertical rhythm strategy for the dashboard.
- Document token decisions, exceptions, and unresolved questions.

Required audit before Figma work:

- Validate `03-design-system-principles.md` against `docs/added/dsb/` and the completed Page 1 work. Patch it first if it needs corrections.
- Compare the raw values in `01-token-extraction.md` against the guardrails and design-system principles.
- Identify which values should remain literal source values and which should normalize.
- Propose a spacing scale. Explicitly classify micro, meso, and macro spacing values.
- Propose typography roles and scale. Include clamp/breakpoint implications from the source.
- Propose a vertical rhythm model:
  - derive the base rhythm from body text line-height,
  - map all proposed text styles to rhythm-compatible line heights where practical,
  - identify explicit exceptions where fixed values are better than rhythm alignment,
  - check section spacing, row heights, and dense dashboard lists against the rhythm.
- Propose semantic color variables for the improved design. Keep oklch source values documented, but use Figma-compatible hex values.
- Evaluate a minimal dark-mode path. It may be limited to token aliases and top navigation/status surfaces if a full dark dashboard is too broad for this chapter.
- Evaluate compact/default/relaxed view modes as an optional density axis. Treat this as "cherry on top"; document the recommendation, but do not build density modes unless the scope remains controlled.
- Define naming/scoping rules before creating variables.
- Define the proposed style namespace before creating styles. Use `proposed/` for color styles and text styles, including composite text-style tokens.
- Decide which existing `as-is/` styles are useful as evidence only. They must not be edited or converted in place.

Expected Figma output:

- A `Proposed` page if it does not already exist.
- The `Proposed` page should be a duplicate of `As-is`, renamed after duplication, so Page 1 remains intact.
- Variable collections and scoped variables for proposed colors, spacing, radii, sizing, typography support values as appropriate.
- Separate `proposed/` local color styles and text styles for the proposed system. Keep existing `as-is/` styles intact.
- Composite proposed text styles for design-token usage, backed by normalized typography decisions where Figma supports it.
- Any required local styles for proposed text/effects that cannot be represented cleanly as variables alone.
- A small variable/specimen board showing the normalized scale and source-to-proposed rationale.
- A compact vertical-rhythm specimen showing body text, key labels, section headings, row heights, and spacing alignment.
- Optional only if justified: dark-mode token mode or a clearly marked dark-mode token proposal. Do not build a large dark UI surface unless the token foundation requires proof.

Expected documentation output:

- Create/update `docs/added/sessions/ch-3.1-token-normalization.md`.
- Include:
  - normalized token table,
  - source value mappings,
  - vertical rhythm model and exceptions,
  - `03-design-system-principles.md` validation notes and any changes made,
  - dark-mode recommendation,
  - compact/default/relaxed density-mode recommendation,
  - decisions and rationale,
  - unresolved questions,
  - Figma variable collection names and ids if available,
  - proposed style group names and any created style ids if available,
  - validation/audit notes.

Carry-forward caveats:

- Page 1 `As-is` contains intentional `mixed` rich text and source quirks. Do not "fix" it as part of Phase 3.
- Keep `As-is` page plus grouped `as-is/` color and text styles intact and locked as source evidence.
- Figma may reject parent bindings to nested instance sublayer text.
- After Figma script edits, run typography and paint/variable audits.
- The full-dashboard sidebar stretch in Page 1 is a static review representation of sticky behavior, not a proposed responsive rule.
- Coach-note top-rule helper rectangles are intentional in Page 1 because Figma cannot model separate top/right stroke colors on one node.
- The DSB book describes a deeper token network than this project likely needs. Use the book for principles and judgment; keep the actual token system proportional to The Ledger.

Do not start Phase 4 deliverables yet:

- Do not design Quick-create flows.
- Do not design Search / Command palette.
- Do not apply fix-what's-broken UI redesigns.

This chapter is foundation work only: normalize tokens, create the `Proposed` variable system, and document the reasoning.
