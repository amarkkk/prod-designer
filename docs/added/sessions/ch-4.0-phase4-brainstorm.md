# Ch 4.0 — Phase 4 brainstorming session (index)

Established 2026-05-13. Planning session for all Phase 4 deliverables before Figma execution.

This session ran in parallel with Ch 2.3 (organisms). Design direction decisions are not dependent on Figma component completion.

---

## Chapter documents

This brainstorming session produced three focused specs, split for isolated work:

- **[Ch 4.1 — Quick-create menu](ch-4.1-quick-create-menu.md)** — Dropdown anatomy/hierarchy/states, 5 flow first screens with data model, confirmation/success showcase (new entry)
- **[Ch 4.2 — Search / command palette](ch-4.2-search-command-palette.md)** — 4 required states (default, typing, empty, keyboard), universal launcher concept
- **[Ch 4.3 — Fix what's broken](ch-4.3-fix-whats-broken.md)** — 7 themed groups with before/after specs, noted-but-not-designed items

---

## Key decisions (summary)

### Container pattern mapping (revised)

| Flow | Container | Change from initial |
|------|-----------|-------------------|
| New entry | **Inline in ledger** | Was: compact compose. Changed: Anna needs ledger context for the most frequent action. |
| New transfer | **Compact compose** | Was: side panel → centered modal → compact compose. Lightweight overlay, dashboard stays visible. |
| New goal | **Compact compose** | Was: side panel → centered modal → compact compose. Includes condensed goal list in compose panel. |
| New category | **Compact compose** | Unchanged, but now includes entry assignment list. |
| Connect account | **Centered modal** | Unchanged. Large modal, multi-step, most serious action. |

Three container types total: inline (entry), compact compose (transfer, goal, category), centered modal (connect account).

### Search model

- Compact dropdown from topbar search input (not full-width overlay)
- Universal launcher: search + commands in one panel
- Results grouped by content type, NO inline quick actions (Enter = navigate only)
- Commands discovered by typing (fuzzy match) — no per-command keyboard shortcuts in palette
- Escape always closes palette; ✕ button or ⌘+Backspace clears search text without closing
- Tab skips between result groups

### Fix themes (7 total)

1. IA mismatch (propose, don't implement)
2. Accessibility — focus indicators
3. Typography — sub-13px text
4. UX writing / content clarity
5. Responsive progressive disclosure
6. Spacing inconsistency
7. Visual consistency — spec vs. implementation

### Capacity and reversibility

- Goals: max 3 visible on dashboard, "View all" for overflow, priority ordering via drag-and-drop
- Non-reversible actions (transfers): pre-confirmation review only
- All other actions: directly reversible

---

## Data model (from HTML artifact)

Entities and their fields are documented in each chapter's flow specs. Key entities: Transaction (date, desc, tag, kind, amounts, balance), Account (dot, name, num, balance, trend), Goal (eyebrow, name, progress, target, ETA, pace), Budget/Category (name, amount, budget, bar state), Coach note (kind, headline, body, stat, actions).

---

## Open questions (aggregated)

See individual chapter documents for context. Questions marked with Q# are tracked per-chapter.

**Ch 4.1:** Q1-Q13 covering inline form layout, transfer entry checkbox, goal funding model, category assignment scope, connect account input fields.

**Ch 4.2:** Q1-Q4 covering result freshness, fuzzy matching, alert behavior, auto-close.

**Client questions (out of scope to answer):** Transfer scheduling, coach note lifecycle, category hierarchy depth, notification panel design.

---

## Session metadata

- **Date:** 2026-05-13
- **Participants:** Mark Andrassy (product designer), Claude (AI collaborator)
- **Status:** Complete — design direction set, specs split into chapter documents
- **Next steps:** Figma execution for Ch 4.1, 4.2, 4.3 using the focused specs
