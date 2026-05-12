---
name: Workflow preferences for this project
description: How the user wants to collaborate — chapters, documentation, guardrails against DESIGN.md violations
type: feedback
originSessionId: 931ed20f-ae8b-4d7c-9455-6f6c203727cf
---
1. Flag conflicts with DESIGN.md anti-patterns immediately when user proposes something that violates them.
   **Why:** User explicitly asked to be notified when their decisions conflict with the original design document.
   **How to apply:** Before executing any design decision, cross-reference against Section 9 (Anti-patterns) and all other DESIGN.md constraints.

2. Work in small chapters for video recording. Each chapter should be a self-contained unit.
   **Why:** User is creating a walkthrough video in structured chapters, not a raw timelapse.
   **How to apply:** Keep work phases discrete and named. Summarize each chapter's purpose and outcome.

3. Don't digest design system book chapters until the design system building phase.
   **Why:** Avoid context bloat. Those chapters inform Figma component creation, not the planning phase.
   **How to apply:** Reference book chapters only when entering the Figma component building sessions.

4. Session logs for onboarding but avoid context bloat. Documentation goes to docs/added/.
   **Why:** Multiple AI agents will work on this project and need clean handoff.
   **How to apply:** Write concise session summaries, not verbose transcripts.

5. Two Figma pages: Page 1 "as-is" (faithful HTML recreation) + Page 2 "proposed" (fixes, normalized tokens, new features).
   **Why:** Need before/after comparison. As-is page uses raw values, proposed page gets the proper variable system. This avoids dual-token bloat.
   **How to apply:** Build Page 1 first with exact HTML values. Page 2 gets the design system treatment. Don't create before/after modes in the same token set.

6. Check design decisions against the FULL guardrails.md file, not partial anti-pattern lists.
   **Why:** DESIGN.md has constraints scattered across typography, color, layout, density, motion, and accessibility sections — not just the anti-patterns table.
   **How to apply:** Reference `docs/added/guardrails.md` as the canonical checklist.
