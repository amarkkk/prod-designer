# Ch 4.3 — Fix what's broken

Extracted from Ch 4.0 brainstorm (2026-05-13). Theme inventory for Figma execution.

---

## Task requirement

> Find what's wrong. UX, UI, content, consistency, accessibility, broken states, anything. Group what you found into themes. For each theme, show one or two before/afters and explain the fix. Flag anything you noticed but consciously chose not to fix, and why. We're looking for the eye, not the checklist.

---

## Scope line

**Fixing issues** = correcting things that are broken, inconsistent, or inaccessible in the current design.

**Not in scope** = adding new features on top of existing functions (transfer scheduling, coach note lifecycle, notification panel, archive pages). These are noted as "would improve" but don't get before/after treatment.

---

## Theme inventory

All 8 themes get before/after treatment in Figma (Page 2 — proposed).

### Theme 1: Information architecture mismatch

**Current:** Sidebar nav labels don't match content section headings.

| Sidebar label | Content heading | Match? |
|--------------|-----------------|--------|
| Today | Today | Yes |
| Transactions | Cashflow | No |
| Budgets | Where it went | No |
| Goals | The Ledger | No |
| Bills | Budgets | No |
| Coach | Goals | No |
| Reports | Coach | No |
| — | Notices | Missing from sidebar |

Bills has no section. Reports shows "—". Notices exists in content but not sidebar.

**Proposed fix:**

| Sidebar label | Maps to content |
|--------------|-----------------|
| Today | § i Today |
| Cashflow | § ii Cashflow |
| Distribution | § iii Where it went |
| Ledger | § iv The Ledger |
| Budgets | § v Budgets |
| Goals | § vi Goals |
| Coach | § vii Coach |
| Notices | § viii Notices (add to sidebar) |

Remove "Bills" (it's a KPI in May figures, not a section) and "Reports" (undefined, shows "—").

**Status:** Propose but don't implement. This is a content/IA decision beyond the scope of a design exercise. Shows we identified the biggest structural issue and know how to resolve it.

**Would benefit from:** Card sorting or tree testing with users to validate the proposed labels.

**Before/after:** Sidebar nav with mismatched labels → sidebar with corrected labels and Notices added.

---

### Theme 2: Accessibility — no focus indicators

**Current:** Interactive elements (buttons, links, nav items, tabs, chips) have hover transitions but no visible :focus styles. Keyboard users cannot tell where focus is.

**Fix:** Every interactive element gets a visible focus indicator.

**Spec:** `outline: 2px solid var(--ink); outline-offset: 2px`. Clean ink rule, consistent with editorial aesthetic. For elements on dark backgrounds (checked tabs, btn-primary), use `outline-color: var(--paper)`.

**Before/after:** Tab group showing no focus ring → with 2px ink focus ring on the active tab.

---

### Theme 3: Typography — sub-13px text

**Current:** Multiple elements below the 13px body text minimum from DESIGN.md:
- Sidebar labels: 9.5px
- Metadata: 10px–10.5px
- Eyebrows: 10px
- Kbd shortcuts: 10px

**Fix:** Establish a minimum text size floor:
- Pure labels/metadata (sidebar hints, kbd shortcuts): raise to 11px minimum
- Anything with sentence structure or reading content: 13px minimum
- Adjust letter-spacing proportionally when increasing size

**Before/after:** Sidebar nav item at 9.5px → at 11px with adjusted spacing. Check that sidebar density still works at the larger size.

**Assumption to test:** Does 9.5px → 11px affect sidebar layout? Likely fine — 1.5px increase with proportional adjustment.

---

### Theme 4: UX writing / content clarity

**Current issues:**
| Element | Current | Problem |
|---------|---------|---------|
| Coach section sub | "3 notes ready" | "Ready" implies a queue, not actionable nudges |
| Coach types | "Alert · subscriptions", "Action · sweep", "Heads-up · dining" | Types not self-explanatory |
| Sidebar Reports | "—" | Displaying absence as a value |
| Sidebar brand | "v 2.1" | Version stamp unnecessary for end users |

**Fix:**
| Element | Proposed | Rationale |
|---------|----------|-----------|
| Coach section sub | "3 action items" or "3 new insights" | Clearer intent |
| Coach types | "Action needed", "Savings tip", "Heads up" | Self-explanatory without domain knowledge |
| Sidebar Reports | Remove entirely, or replace with actual content | Don't show empty states as navigation items |
| Version stamp | Remove, or move to Settings/About | Users don't need version info in daily view |

**Before/after:** Coach section header "3 notes ready" with "Alert · subscriptions" → "3 action items" with "Action needed · subscriptions".

---

### Theme 5: Responsive progressive disclosure

**Current:** Content disappears at breakpoints with no fallback:
- ≤1240px: marginalia hidden (context lost)
- ≤1080px: ticker hidden (net worth delta lost)
- ≤960px: sidebar off-canvas, shortcuts hidden
- ≤720px: search hidden (primary navigation tool removed)

**Fix (one representative case):** Search must remain accessible at all breakpoints. At ≤720px, the search input collapses to a search icon that expands to a full-width overlay on tap.

**Before/after:** Topbar at 720px with search completely hidden → topbar at 720px with search icon that opens overlay.

**Scope note:** We show the pattern for search only. Full responsive redesign is out of scope. Other hidden elements (marginalia → tooltip, ticker → collapsed summary, shortcuts → help overlay) are noted as would-improve.

---

### Theme 6: Spacing inconsistency

**Current:** Padding values include 7px, 9px, 9.5px, 10.5px, 11px, 11.5px, 13px, 13.5px — no coherent scale. At least 18 distinct spacing values with no system.

**Fix:** Normalize to a 4px base scale:

| Raw value | Normalized | Token name |
|-----------|-----------|------------|
| 7px | 8px | space-2 |
| 9px, 9.5px | 8px | space-2 |
| 10px, 10.5px, 11px, 11.5px | 12px | space-3 |
| 13px, 13.5px, 14px | 12px or 16px | space-3 or space-4 |
| 16px | 16px | space-4 |
| 18px | 20px | space-5 |
| 20px | 20px | space-5 (section padding, per DESIGN.md) |
| 22px, 24px | 24px | space-6 |
| 32px | 32px | space-8 |

**Before/after:** Budget row with mixed 9px/11px padding → normalized 8px/12px with consistent rhythm.

---

### Theme 7: Visual consistency — spec vs. implementation

**Current:** Sidebar width is 248px in CSS, DESIGN.md specifies 256px.

**Fix:** Align to spec: 256px. Adjust downstream padding if needed.

**Before/after:** Sidebar at 248px → 256px. Subtle but demonstrates attention to spec fidelity.

---

### Theme 8: Keyboard shortcuts conflict with host platform

**Current:** The original prototype assigns ⌘N (New menu), ⌘T (Transfer), ⌘C (Category), ⌘A (Connect) as keyboard shortcuts. These collide with the host platform at two levels:

1. **Non-overridable browser-chrome shortcuts** — ⌘N (New Window) and ⌘T (New Tab) are processed by the browser before JavaScript can intercept them. `preventDefault()` has no effect. The browser action fires instead of the app action.
2. **Sacred OS shortcuts** — ⌘C (Copy) and ⌘A (Select All) are fundamental clipboard/selection operations. Overriding them breaks user expectations regardless of whether the app runs in a browser, PWA, or standalone wrapper.

The prototype also had an implementation bug: the JS rendered shortcut labels as "C T", "C G", "C C", "C A" (the letter C substituting for the ⌘ glyph) due to hardcoded strings instead of the platform-aware modifier variable.

**The deeper issue:** The shortcut choices assume a standalone application context where the app owns the full keyboard. But we don't control the deployment target — the same HTML could run in a browser tab, a PWA, an Electron shell, or a mobile webview. Keyboard shortcuts must be platform-aware: avoid keys the host platform reserves, and degrade gracefully where keyboard input isn't the primary modality (touch devices, mobile).

**Fix:** Remap all conflicting shortcuts to letters the browser and OS don't claim:

| Action | Original | Remapped | Conflict avoided |
|--------|----------|----------|-----------------|
| Open +New menu | ⌘N | ⌘B | Browser New Window (non-overridable) |
| New transfer | ⌘T | ⌘D | Browser New Tab (non-overridable) |
| New category | ⌘C | ⌘J | OS Copy (sacred) |
| Connect account | ⌘A | ⌘I | OS Select All (sacred) |

⌘K (Search), ⌘E (Entry), and ⌘G (Goal) were kept — ⌘K and ⌘G are overridable browser shortcuts (Figma, VS Code override these), and ⌘E has no browser conflict. The broken C-prefix chord implementation was replaced with proper global `keydown` handlers.

**Before/after:** Status bar showing `⌘ N` → `⌘ B`; dropdown menu showing `C T` / `C G` / `C C` / `C A` → `⌘ D` / `⌘ G` / `⌘ J` / `⌘ I`. Command palette shortcut badges updated to match.

See [Ch 4.0 keyboard shortcuts decision](ch-4.0-phase4-brainstorm.md#keyboard-shortcuts-revised-2026-05-14) for full rationale.

---

## Noted but not designed

These are gaps we identified but don't create before/after mockups for:

### Missing states
- No empty states (zero transactions, zero goals, zero coach notes)
- No error states (sync failure, network error)
- No loading states (initial load, data refresh)

### Hover-only action discoverability
- Ledger row quick actions (Categorise / Split / Cancel) only visible on hover
- Budget row "Adjust" link only visible on hover
- Touch devices and keyboard users can't discover these
- **Would fix:** Make actions accessible via keyboard focus; on touch devices, always show a subtle "..." overflow menu

### Coach note dead ends
- CTAs like "Review spending" and "Set alert" have no defined destination
- **Would fix:** Map each CTA to a specific navigation target (section or filtered view)

### Notification bell without panel
- Bell icon has red badge but no dropdown/panel designed
- **Would fix:** Design a notification feed dropdown (similar to search palette container)

### Status bar density
- Net worth + delta, spending pace, next bill due, sync status, 4 shortcuts in 38px
- At smaller screens, content is hidden without graceful degradation
- **Would fix:** Progressive disclosure within the bar, priority-based content trimming

---

## Approach for Figma execution

For each theme:
1. **Before frame:** Screenshot or recreation of the current state from Page 1 (as-is)
2. **After frame:** Fixed version on Page 2 (proposed) with the normalized token system
3. **Annotation:** Brief explanation of the fix, positioned as marginalia-style notes
4. **Group label:** Theme name for the write-up

Conscious-not-fixed items get a single frame with annotation explaining why.
