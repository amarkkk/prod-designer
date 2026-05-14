# Ch 4.2 — Search / command palette

Extracted from Ch 4.0 brainstorm (2026-05-13). Focused spec for Figma execution.

---

## Task requirement

> The top bar has a search input. Design what happens when Anna uses it. Cover at least: default state, typing state with mixed results, empty state, keyboard interaction model. The search isn't only a finder... it's also a command palette.

---

## Core concept

A compact dropdown anchored to the topbar search input. Not a full-width overlay. Acts as a **universal launcher**: Anna can find things (transactions, categories, goals, accounts, coach notes) AND launch actions (create commands, navigation). Opens with ⌘K or by clicking the search input. Cursor is in the field immediately — Anna can start typing.

---

## Search scope

Covers the **entire database**, not just dashboard-visible items:
- All historical transactions (142+ in the current data)
- All accounts, goals, budget categories, coach notes
- All commands (create actions + navigation)
- Notices

---

## State 1: Default (on open, before typing)

### Layout

```
┌─────────────────────────────────────────┐
│ 🔍  Type a command or search...    esc  │
├─────────────────────────────────────────┤
│ ⚠ 2 bills due this week       [urgent] │  ← priority alert (if exists)
├─────────────────────────────────────────┤
│ COMMANDS                                │
│  ✏  New entry                           │
│  ⇄  New transfer                        │
│  ◎  New goal                            │
│  🏷  New category                        │
│  🔗  Connect account                    │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│ GO TO                                   │
│  § i  Today                             │
│  § ii Cashflow                          │
│  ...                                    │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│ RECENT                                  │
│  "spotify"                              │
│  "groceries april"                      │
└─────────────────────────────────────────┘
```

### Specs

- **Priority alert row:** If urgent items exist (overdue bills, over-budget alerts), pinned at top with attention badge. Must be keyboard-accessible — selectable with arrow keys, Enter navigates to the relevant section.
- **Commands section:** The 5 create actions + navigation commands. No per-command keyboard shortcuts displayed — Anna discovers commands by typing (e.g., "new entry", "transfer"). Fuzzy matching surfaces the right command from partial input.
- **Go to section:** Quick navigation to dashboard sections (§ i through § viii). Typing a section name filters to it.
- **Recent searches:** Last 2-3 queries, if any.
- **First item auto-focused:** The priority alert (if present) or the first command.

### Command discovery

Commands are found by typing, not by memorizing shortcuts. The palette uses fuzzy matching: typing "trans" surfaces "New transfer", typing "goal" surfaces "New goal". This follows the Superhuman/Linear pattern — the search field IS the command input. Global shortcuts (⌘K to open palette, ⌘N to open +New dropdown) remain outside the palette.

---

## State 2: Typing (mixed results)

### Layout

```
┌─────────────────────────────────────────┐
│ 🔍  spotify                        esc  │
├─────────────────────────────────────────┤
│ TRANSACTIONS · 3                        │
│ ▸ Spotify Premium · −9.99    10 May     │  ← focused (paper-sunk bg)
│   Spotify Premium · −9.99    10 Apr     │
│   Spotify Premium · −9.99    10 Mar     │
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│ CATEGORIES · 1                          │
│   Subscription       €38/mo            │
└─────────────────────────────────────────┘
```

### Specs

- **Grouped by content type:** Transactions, Categories, Goals, Accounts, Coach, Commands. Each group has a header with count badge.
- **Result row:** Icon (type-specific) + title (match highlighted with underline) + metadata (date, amount, status)
- **NO inline quick actions.** Enter = navigate to the item in the dashboard. The search is for finding and navigating, not for performing actions. Actions happen in context after navigation.
- **Match highlighting:** Matched characters underlined with a subtle accent color, not bold.
- **Result limit per group:** Show 3-5 results per group. If more exist, show "Show all N [type]" link at the bottom of the group — expanding the group within the dropdown, not navigating away.
- **Tab skips between groups:** Instead of arrowing through 90 transactions, Tab jumps to the next group header. ↑↓ navigates within the current group.
- **Maximum height:** Dropdown has a max-height (~60-70% of viewport). Results scroll within the container. A subtle scroll indicator (fade gradient at bottom) signals more content below.
- **Refining search:** Anna can narrow results by adding terms ("spotify 2025", "groceries april"). No special syntax needed — just space-separated keywords.

### Why no inline actions

From brainstorm feedback: if a transaction result shows "Categorize" as an inline action, pressing Enter is ambiguous — does it categorize the transaction or navigate to it? Keep it clean: **Enter always navigates.** Actions are available once Anna is at the item in the dashboard (via the ledger's existing hover row-actions).

---

## State 3: Empty (no results)

### Layout

```
┌─────────────────────────────────────────┐
│ 🔍  xyznothing               ✕    esc  │
├─────────────────────────────────────────┤
│                                         │
│       No results for "xyznothing"       │
│       Try different keywords            │
│                                         │
└─────────────────────────────────────────┘
```

### Specs

- **No commands in empty state.** From brainstorm feedback: showing "New entry" and "New transfer" below a failed search is confusing — it implies the search failed because Anna should be creating something instead of searching. The empty state should just be honest.
- **Reset affordance:** A clear/✕ button appears in the search field (to the left of the esc hint) when text is present. Click or ⌘+Backspace clears the query, returning to default state without closing the palette. This is the "reset search without closing" behavior.
- **Escape closes the palette.** Industry standard (VS Code, Linear, Superhuman, Figma): Escape always closes, regardless of whether text is in the field. To clear text without closing, use the ✕ button or ⌘+Backspace.

### Escape behavior

| State | Escape | ✕ / ⌘+Backspace |
|-------|--------|------------------|
| Text in field, results showing | Closes palette | Clears text → default state (palette stays open) |
| Text in field, no results | Closes palette | Clears text → default state (palette stays open) |
| Default state (no text) | Closes palette | — (✕ not visible) |

---

## State 4: Keyboard interaction model

### Full keyboard spec

| Key | Action |
|-----|--------|
| ⌘K | Open palette, focus search input |
| Type | Filter results + commands in real-time (fuzzy matching) |
| ↑ ↓ | Navigate within current result group |
| Tab | Jump to next result group header |
| Shift+Tab | Jump to previous result group header |
| Enter | Navigate to selected item (scroll to section / open entity / launch command) |
| Escape | Close palette, restore previous focus |
| ✕ button or ⌘+Backspace | Clear search text, return to default state (palette stays open) |

### Focus management

- On open: focus is in the search input, first item in results has visual focus indicator
- Arrow keys move visual focus through results, search input retains actual focus (Anna can keep typing)
- Enter acts on the visually focused item
- On close: focus returns to whatever element was focused before ⌘K

### Result navigation with many results

When a group has many results (e.g., 30 Spotify transactions):
- ↑↓ navigates through the visible results within the group
- "Show all 30 transactions" at the bottom of the group, selectable with ↓
- Selecting it expands the group in the dropdown (scroll within max-height)
- Tab skips to the next group regardless of how many results are in the current group
- This means Anna never has to arrow through 90 results to get to a different category of results

### Scroll behavior

- Dropdown max-height: ~60-70% of viewport height
- Content scrolls within the container
- Keyboard navigation auto-scrolls to keep the focused item visible
- Subtle fade gradient at the bottom edge when more content is below the fold

---

## Styling constraints (from guardrails)

- 0px border-radius on all elements
- Paper bg, ink borders, hairline separators
- Newsreader body text, kbd styling for shortcuts
- 180ms ease-out hover transitions
- No drop shadows — depth from paper tones only
- Focus ring: 2px ink outline, offset 2px

---

## Open questions

- **Q1:** Should search results show a timestamp for how "fresh" the results are? ("Results from last sync at 09:42")
- **Q2:** Should the "Go to" section support fuzzy matching? (e.g., typing "bud" matches "Budgets" and "Budget bars")
- **Q3:** The priority alert row — should clicking it navigate to the relevant section (e.g., notices) or expand inline to show the details?
- **Q4:** When Anna navigates to a result (e.g., a specific transaction), does the palette close automatically, or stay open so she can quickly search again?

---

## Research references

- [UX Patterns — Command Palette](https://uxpatterns.dev/patterns/advanced/command-palette) — Core structure: trigger, input, results list, footer
- [Mobbin — Command Palette UI Design](https://mobbin.com/glossary/command-palette) — Layout configurations and best practices
- [Philip Davis — Command Palette Interfaces](https://philipcdavis.com/writing/command-palette-interfaces) — Context-aware commands
- [Sam Solomon — Designing Command Palettes](https://solomon.io/designing-command-palettes/) — Keyboard navigation patterns
- [Pencil & Paper — Search UX Best Practices](https://www.pencilandpaper.io/articles/search-ux) — Result grouping and filtering
