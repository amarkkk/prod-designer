---
name: Key decisions from Session 1
description: Scoping decisions made 2026-05-12 — what's in, what's postponed, execution order
type: project
originSessionId: 931ed20f-ae8b-4d7c-9455-6f6c203727cf
---
**Scope decisions:**
- IA fix (sidebar ↔ content naming mismatch): documented, NOT fixing. Out of scope for a design exercise.
- Responsive: desktop + one collapsed state only. Full responsive redesign is overhead.
- Progressive content hiding without alternatives: document as red flag, show one before/after, don't redesign all breakpoints.

**Execution order:**
1. Token extraction + component catalog (from HTML, no testing)
2. Quick a11y scan (lightweight, informs component states)
3. Read design system book chapters (methodology for Figma)
4. Build in Figma (tokens → atoms → molecules → organisms → mockup)
5. Full Playwright testing (verify, discover remaining issues)

**Why this order:** Components can use replacement tokens for content — IA decisions come later. The pipeline (book methodology → tokens → components) must be set up before Figma work begins. Testing validates after construction, except for a quick a11y scan that informs which states to design.

**How to apply:** Don't jump to Figma before tokens are extracted and normalized. Don't read book chapters during planning phase — they inform construction.
