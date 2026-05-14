# Ch 4.1 — Quick-create menu (+New)

Extracted from Ch 4.0 brainstorm (2026-05-13). Focused spec for Figma execution.

---

## Task requirement

> Design the dropdown so Anna can launch any of these flows from anywhere in the product, in one click or one keystroke. We want to see: the dropdown itself (anatomy, hierarchy, states), the first screen of each of the five flows, and how a confirmation/success state looks for one flow.

---

## The dropdown

### Anatomy

5-item vertical menu dropping from the +New button in the topbar.

| Element | Spec |
|---------|------|
| Container | Paper bg, 1px ink border, 0px radius |
| Item height | ~40px (10px vertical padding + content) |
| Item structure | Icon (14px, ink-mute) → Label (Newsreader 12.5px, ink). Focused item shows "Enter" kbd hint (10px, muted, bordered) aligned right. |
| Separators | 0.5px rule-soft between items |
| Width | Auto, min ~220px to fit longest label + shortcut |

### Hierarchy (visual weight)

1. **Icon** — type recognition at a glance
2. **Label** — primary identification
3. **Enter hint** — appears only on the focused item, teaching the interaction

### Items

| # | Icon | Label | Opens |
|---|------|-------|-------|
| 1 | pencil | New entry | Inline form in ledger |
| 2 | arrows-exchange | New transfer | Compact compose |
| 3 | target | New goal | Compact compose |
| 4 | tag | New category | Compact compose |
| 5 | link | Connect account | Centered modal |

### States

**Rest:** Dropdown closed. +New button uses btn-primary style (ink bg, paper text, plus in red).

**Hover (button):** Button bg transitions to oxblood, 180ms ease-out.

**Open:** Dropdown visible. First item auto-focused (paper-sunk bg). Button stays in hover/active style.

**Item hover/focus:** Paper-sunk background, 180ms ease-out. Focus ring: 2px ink outline, offset 2px.

**Keyboard navigation:**
- ⌘B opens the dropdown (remapped from ⌘N which conflicts with browser New Window)
- ↑↓ moves focus between items — the "Enter" kbd hint follows focus
- Enter launches the focused flow
- Escape closes dropdown, restores focus to +New button
- Click outside closes dropdown

**Per-flow global shortcuts** (work from anywhere, menu open or closed):

| Flow | Shortcut | Mnemonic |
|------|----------|----------|
| New entry | ⌘E | E = Entry |
| New transfer | ⌘D | D = Dispatch (remapped from ⌘T to avoid browser New Tab) |
| New goal | ⌘G | G = Goal |
| New category | ⌘J | J (remapped from ⌘C to avoid Copy conflict) |
| Connect account | ⌘I | I = Import/Integrate (remapped from ⌘A to avoid Select All conflict) |

These shortcuts are shown as `kbd` badges on each menu item and in the command palette. See [Ch 4.0 keyboard shortcuts decision](ch-4.0-phase4-brainstorm.md#keyboard-shortcuts-revised-2026-05-14) for remap rationale.

### Relationship to search/command palette

The same 5 create commands appear in the search palette's default state. Typing "new" or any flow name in the palette filters to the matching command via fuzzy search. The dropdown and the palette are two entry points to the same flows.

---

## Container pattern: three types

The system uses exactly three container types, chosen by task weight:

| Flow | Container | Rationale |
|------|-----------|-----------|
| New entry | **Inline in ledger** | Most frequent action, needs ledger context. Form appears as a new row at the top of the table. |
| New transfer | **Compact compose** | Discrete task, lightweight. Dashboard remains visible behind the compose panel. Confirmation step fits within the compose. |
| New goal | **Compact compose** | Needs context of existing goals — condensed goal list inside the compose panel. Reordering within the panel. |
| New category | **Compact compose** | Lightweight, includes entry assignment list. |
| Connect account | **Centered modal** | External auth, multi-step, serious action. Large modal covering significant portion of the screen. |

### Why three types, not four

Originally had centered modals for transfer and goal alongside compact compose for category. Consolidating to three gives a coherent pattern hierarchy: inline (in-context), compose (overlaid but lightweight), modal (full focus). Each step up means more gravity — Anna intuitively knows the seriousness of an action from its container.

### Why not side panels

Side panels were considered and rejected during brainstorming (session 2):
- 300-600ms slide animation feels sluggish for action-oriented flows
- Limited horizontal space for form fields
- Must go to screen edge to close — modals close with X, Escape, or click-outside
- Side panels imply ongoing work (email sidebar pattern), but these are discrete tasks
- Pinnable side panels add complexity without clear UX benefit

Research: [Smashing Magazine decision tree](https://www.smashingmagazine.com/2026/03/modal-separate-page-ux-decision-tree/), [NN/g modal guidelines](https://www.nngroup.com/articles/modal-nonmodal-dialog/).

### Container behavior specs

**1. Inline (new entry):**
- Page scrolls to the Ledger section (§ iv)
- A new empty row opens at the top of the ledger table, in editing mode
- Form fields are inline in the table columns (date, description, debit/credit, etc.)
- Tab moves between fields
- Enter saves, Escape cancels
- **Entry point also available directly in the ledger section** — a + button in the section header or at the top of the table, so Anna can create entries without going through the +New dropdown

**2. Compact compose (transfer, goal, category):**
- Bottom-right of viewport (Gmail compose pattern)
- Persistent across scrolling — dashboard remains visible and interactive behind it
- **Layering without drop shadow:** 1px ink border on the compose panel. Dashboard behind is not dimmed (no scrim) — the compose sits on top via z-index, with tonal separation from its paper background against the dashboard content. The editorial constraint (no drop shadows) means depth comes from the border and background contrast, not elevation.
- Expandable to full-screen, poppable to new window (shift+expand)
- For goal flow: includes condensed existing goals list inside the compose panel
- **Close behavior:**
  - X button: always works
  - Escape: closes immediately if form is empty; shows "Discard changes?" confirmation if any field has data
  - Click outside: compose does NOT close on outside click (Gmail pattern — it persists so Anna can reference dashboard content while filling the form)

**3. Centered modal (connect account only):**
- Centered on screen, scrim behind (dashboard dimmed with fade, ~180ms)
- Large — covers significant portion of the screen for the multi-step flow
- No slide animation — modal fades in, instant feel
- Step indicator for the multi-step connect flow
- **Close behavior:**
  - X button: always works
  - Escape: closes immediately if form is empty; shows "Discard changes?" confirmation if any field has data
  - Click outside (scrim): same rule as Escape — empty form closes, filled form confirms first
- Styling: paper bg, 1px ink border, 0px radius (no rounded corners per guardrails), no drop shadow (depth from scrim dimming only)

---

## Flow 1: New entry (inline in ledger)

### Revision note

Originally planned as compact compose. Changed to inline after brainstorm feedback: Anna needs ledger context, wants to see where the entry lands, and "new entry" is the most frequent action. Research confirms inline is preferred for frequent contextual actions ([NN/g](https://www.nngroup.com/articles/modal-nonmodal-dialog/), [LogRocket](https://blog.logrocket.com/ux-design/modal-ux-best-practices/)).

### Fields (data model)

| Field | Type | Maps to | Notes |
|-------|------|---------|-------|
| Date | Date picker | tx-date | Default: today |
| Description | Text input with **auto-suggest** | tx-desc | Shows recent payees as you type. Selecting a payee auto-fills category. |
| Category | Dropdown / auto-suggest | tx-tag | Auto-suggested from description. Populated from existing categories (Groceries, Subscription, Transport, etc.). |
| Amount | Numeric input | tx-debit or tx-credit | Prominent. Fraunces display style in the inline row. |
| Direction | Toggle | data-kind | Expense (debit) / Income (credit). Default: Expense. No need to type minus sign. |

### Smart behaviors

- **Auto-suggest description:** As Anna types "Spo...", recent payees appear (Spotify Premium, Sportcheck, etc.). Selecting one auto-fills the category based on previous entries.
- **Auto-category:** If Anna types a known payee, the category field pre-fills (e.g., "Spotify" → "Subscription"). Editable.
- **Tip/hint:** Below the form or as a subtle footnote: "Sync with your bank to import entries automatically" — nudges toward Connect Account flow instead of manual entry. Or: "Scan a receipt" as a future feature hint.

### Interaction

1. Anna triggers: +New → New entry, or types "new entry" in command palette, or + button in ledger section header
2. Page scrolls to Ledger (§ iv) if not in view
3. New empty row appears at top of ledger table, in editing mode
4. Cursor focuses on description field (or amount, to be tested)
5. Anna fills fields, Tab moves between them
6. Save: Enter or "Save" button
7. Cancel: Escape or "Cancel" link

### Success state (showcase)

This is the confirmation/success state we design for the deliverable:

1. Row saves — editing mode ends
2. Row remains at top with the existing 4×4px red new-entry dot in the gutter
3. Row has brief paper-sunk background tint (~1s) that eases back to normal
4. Ledger footer updates: "8 of 143 entries · 1 new since [time]"
5. Balance column recalculates

### Open questions

- **Q1:** Should the first field focused be Amount (the most important piece of data) or Description (the natural reading order)?
- **Q2:** How does the inline form handle the double-entry layout? Does the form span all 5 columns (Date, Entry, Debit, Credit, Balance) or collapse into a simpler layout?
- **Q3:** Mobile/responsive: the inline pattern works at desktop width but may need a different pattern at narrow viewports.

---

## Flow 2: New transfer (compact compose)

### Fields (data model)

| Field | Type | Maps to | Notes |
|-------|------|---------|-------|
| From | Account picker | accounts-list entity | Shows: dot + name + num + balance. Single-select. |
| To | Account picker | accounts-list entity | Excludes "from" selection. Single-select. |
| Amount | Numeric input | — | Validated against "from" balance. |
| Date | Date picker | — | Default: today. |
| Note | Text input | — | Optional. |
| Log as entry | Checkbox | — | Optional. If checked, expands to show category field. Transfer appears in the ledger. |

### Internal vs. external

Open question: does "New transfer" cover only internal transfers (between Anna's connected accounts) or also external transfers (to someone else's account)? The current HTML shows 4 connected accounts. Internal-only is simpler and safer for scope.

**Assumption:** Internal transfers only (between Anna's own accounts). External transfers (bill pay, sending money) would be a separate flow or a future feature.

### Interaction

1. Anna triggers: +New → New transfer, or types "transfer" in command palette
2. Compact compose appears bottom-right — dashboard remains visible behind it
3. Anna selects From/To accounts, enters amount
4. Clicks "Review transfer" → compose transitions to confirmation view
5. Confirmation: summary of from (name, balance before) → to (name, balance after) → amount → date
6. "Confirm transfer" (btn-primary) + "Edit" (ghost btn)
7. On confirm: compose shows brief success state with **animated balance change** on both accounts
8. Compose closes → sidebar account balances update with tint animation

### Reversibility

Non-reversible. Pre-confirmation review step required. No undo toast (we don't know backend logic).

### Open questions

- **Q4:** If "Log as entry" is checked, which category applies? Should it auto-suggest "Transfer" as a category?
- **Q5:** Should the confirmation show projected balances (current balance ± transfer amount) for both accounts?

---

## Flow 3: New goal (compact compose)

### Fields (data model)

| Field | Type | Maps to | Notes |
|-------|------|---------|-------|
| Name | Text input | goal-name | Goal title. |
| Target amount | Numeric input | goal-prog denominator | Target to reach. |
| Target date | Date picker | goal-eta | When to reach it. |
| Fund from | Account picker (multi-select) | — | Which accounts feed this goal. **Required** — can't calculate pace without it. |
| Funding model | Select | — | How to fund: fixed amount/mo, percentage of income, or automatic leftover. |

### Context and reordering

The compact compose needs to show existing goals for context. Options:
- Show a condensed list of current goals (name + progress + priority number) inside the compose panel, above or beside the form
- Allow drag-and-drop reordering of the priority list within the compose
- New goal inserts at the position Anna drags it to

### Validation and warnings

- **No funding source:** Can't save without at least one account selected. Show inline validation: "Select an account to track progress."
- **Account already funding another goal:** Show warning: "Savings (··TR) is also funding Emergency Fund. This may affect that goal's pace." Not blocking — just informational.
- **5+ goals nudge:** If this is the 5th+ goal, inline notice: "Tracking 5+ goals may split your focus. Consider prioritizing."

### Funding model (new question from brainstorm)

The current HTML shows pace/rate info ("€475/mo at current rate") but doesn't define how the funding works. Three options to expose in the form:

1. **Fixed amount** — "Save €475 per month" (manual or auto-transfer)
2. **Percentage** — "Save 10% of income toward this goal"
3. **Leftover** — "Sweep remaining budget at month-end"

This is a feature design question, not just a UI question. For the test assignment, we can show the field with options and flag that the logic is TBD.

### Open questions

- **Q6:** What does the condensed goal list in the compose panel look like? Just names + bars, or full cards?
- **Q7:** Does reordering in the compose immediately reorder the dashboard, or only on save?
- **Q8:** How does multi-account funding display the pace calculation? Aggregate or per-account?

---

## Flow 4: New category (compact compose)

### Fields (data model)

| Field | Type | Maps to | Notes |
|-------|------|---------|-------|
| Name | Text input | fiscal-name | Category label (e.g., "Clothes"). |
| Budget | Numeric input | fiscal-amount denominator | Monthly budget limit. Optional — can set later. |
| Assign entries | Entry selector | — | List of uncategorized entries to assign to this new category. |

### Entry assignment (new from brainstorm)

Key insight: Anna typically creates a new category *because* she wants to categorize entries. So the creation flow should include assignment:

- Below the name/budget fields: a searchable list of uncategorized or all entries
- Checkbox per entry to assign to this category
- Filter/search within the list (e.g., type "Amazon" to find all Amazon entries)
- Shows: date + description + amount for each entry
- Multi-select with checkboxes

This makes the compact compose slightly larger — more like a compact panel than a tiny widget. But it still anchors bottom-right and is expandable.

### Interaction

1. Anna triggers: +New → New category, ⌘J, or types "category" in command palette
2. Compact compose appears bottom-right
3. Anna types category name, optionally sets budget
4. Scrolls through uncategorized entries, checks the ones to assign
5. "Add category" saves name + budget + assignments in one action
6. Inline success toast: "Clothes added · 3 entries categorized"

### Alternative trigger

When Anna clicks "Categorise" on a ledger row and the category doesn't exist yet, she should be able to type a new category name and create it inline. This is the reverse entry point — from the ledger to category creation.

### Open questions

- **Q9:** Is the entry assignment list showing only uncategorized entries, or all entries (with a filter for uncategorized)?
- **Q10:** Should existing categories be suggested as alternatives before creating a new one? ("Did you mean: Shopping, Entertainment?")

---

## Flow 5: Connect account (centered modal)

### Steps

**Step 1 — Select bank:**
- Search input to find bank by name
- Below: 3-4 popular banks as quick picks (with logos if available)
- Select to proceed

**Step 2 — Authenticate:**
- External provider handles auth (Plaid-style iframe or redirect)
- We show: bank logo + "Connecting to [bank name]..." + progress indicator
- This is a placeholder in our design — the actual auth UI is third-party

**Step 3 — Configure:**
- Account connected confirmation
- Shows: dot (auto-colored by account type) + account name + last four + initial balance
- **Import historical transactions:** option to import last 7 / 30 / 90 days of transactions as ledger entries
- "Syncing..." status with sync dot animation

**Step 4 — Done:**
- "Done" button closes modal
- Sidebar account list shows new account with fade-in + tint
- Sync dot in status bar pulses

### Open questions

- **Q11:** What input fields does Anna actually need to provide? Just bank name + auth credentials? Or also account number / credit card number?
- **Q12:** If importing historical transactions, do they appear as a batch in the ledger with a visual indicator ("imported from [bank]")?
- **Q13:** What account types are supported? Checking, savings, credit card, brokerage, loan? Each gets a different dot color.

---

## Confirmation/success showcase: New entry

The task asks for one confirmation/success state. We chose **New entry** because it's the most frequent action and demonstrates the inline feedback loop:

### Sequence (for Figma states)

1. **Before:** Ledger showing 7 entries, with existing + button in section header
2. **Editing:** New row at top in editing mode — fields inline in table columns, direction toggle visible
3. **Saving:** Brief saving indicator (optional, depends on sync speed)
4. **Success:** Row saved — editing mode ends, row shows normal styling with:
   - 4×4px red new-entry dot in gutter
   - Brief paper-sunk background tint (~1s ease)
   - Ledger footer: "8 of 143 entries · 1 new since [time]"
   - Balance column recalculated

---

## Research references

- [NN/g — Modal & Nonmodal Dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/) — When inline beats modal
- [LogRocket — Modal UX Best Practices](https://blog.logrocket.com/ux-design/modal-ux-best-practices/) — Don't use modals for frequent actions
- [Eleken — Fintech UX Best Practices 2026](https://www.eleken.co/blog-posts/fintech-ux-best-practices) — AI-assisted entry, progressive disclosure
- [UXDA — Top 20 Financial UX Issues](https://theuxda.com/blog/top-20-financial-ux-dos-and-donts-to-boost-customer-experience) — Frequent actions should be few intuitive steps
