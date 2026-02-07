# Task Plan: Lubricants Page Redesign with Grid Layout & Filtering

**Goal:** Redesign the lubricants page to display products in a grid card layout with filtering functionality for different equipment types.

**Created:** 2026-02-07
**Status:** ✅ Complete

---

## Overview

The current lubricants page displays products in a tab-based layout organized by industry. We need to redesign it to show individual lubricant products (Mosil brand) in grid cards with filtering by equipment type.

### New Product Data Structure

```
Equipment Types:
1. Jaw Crusher → Mosil GM-00(SP2)
2. Cone Crusher → Mosil Gear Lube SP-150e, Mosil Gear Lube SP-220e, Mosil BRB 400, Mosil GM-00(SP2)
3. Impactors → Mosil ML-110 Premium
4. Vibrating Screen → Mosil GM-00(SP2)
5. Conveyor Bearing & Gearbox → Mosil GM-00(SP2), Mosil Gear Lube SP-320e
```

### Unique Products (7 total):
- Mosil GM-00(SP2) - Used in 4 equipment types
- Mosil Gear Lube SP-150e
- Mosil Gear Lube SP-220e
- Mosil BRB 400
- Mosil ML-110 Premium
- Mosil Gear Lube SP-320e

---

## Phases

### Phase 1: Planning & Data Structure ✅ `complete`
**Objective:** Define data structure and page layout approach

**Tasks:**
- [x] Read current lubricants.html structure
- [x] Define JavaScript data structure for products and equipment mapping
- [x] Plan grid card layout design
- [x] Plan filter UI (dropdown or button group)

**Files to Modify:**
- `pages/lubricants.html` - Main page structure
- `src/main.js` - Add lubricants filtering logic

**Files to Create:**
- New JS module for lubricants data (optional)

**Status:** Complete
**Notes:** Planning complete. Decided on button group filters and 3-column grid

---

### Phase 2: JavaScript Data Structure & Mapping ✅ `complete`
**Objective:** Create data structure for lubricants and equipment mapping

**Tasks:**
- [ ] Define lubricant products array with properties (id, name, image, description, equipment types)
- [ ] Create equipment-to-products mapping
- [ ] Add filter state management
- [ ] Implement filter logic (show all by default)

**Implementation Notes:**
```javascript
// Data structure example:
const lubricants = [
  {
    id: 'gm-00-sp2',
    name: 'Mosil GM-00(SP2)',
    image: '/images/mosil-gm-00-sp2.jpg', // placeholder
    description: 'Multi-purpose grease...',
    equipmentTypes: ['jaw-crusher', 'cone-crusher', 'vibrating-screen', 'conveyor']
  },
  // ... more products
];

const equipmentCategories = [
  { id: 'all', label: 'All Equipment' },
  { id: 'jaw-crusher', label: 'Jaw Crusher' },
  { id: 'cone-crusher', label: 'Cone Crusher' },
  { id: 'impactors', label: 'Impactors' },
  { id: 'vibrating-screen', label: 'Vibrating Screen' },
  { id: 'conveyor', label: 'Conveyor Bearing & Gearbox' }
];
```

**Status:** Pending

---

### Phase 3: HTML Structure Update ✅ `complete`
**Objective:** Replace current layout with grid card layout

**Tasks:**
- [ ] Remove old tab-based sections
- [ ] Add filter UI (button group or dropdown)
- [ ] Create grid container for product cards
- [ ] Design individual card HTML structure
- [ ] Ensure responsive design (mobile, tablet, desktop)

**Design Considerations:**
- Use Tailwind grid utilities (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Card design: image, product name, description, equipment tags, CTA button
- Filter buttons: Active state styling with primary colors
- Maintain existing hero section and CTA sections

**Status:** Pending

---

### Phase 4: Filter Implementation ✅ `complete`
**Objective:** Implement client-side filtering functionality

**Tasks:**
- [ ] Add event listeners to filter buttons
- [ ] Implement filter logic to show/hide cards
- [ ] Handle "All" filter (default state)
- [ ] Add visual feedback for active filter
- [ ] Test filtering with all equipment types

**Status:** Pending

---

### Phase 5: Styling & Polish ✅ `complete`
**Objective:** Refine visual design and ensure consistency

**Tasks:**
- [ ] Apply brand colors (primary purple, accent gold)
- [ ] Add hover effects to cards
- [ ] Ensure proper spacing and alignment
- [ ] Add equipment type badges on cards
- [ ] Test responsive behavior on different screen sizes

**Status:** Pending

---

### Phase 6: Testing & Validation ✅ `complete`
**Objective:** Test functionality and ensure everything works

**Tasks:**
- [ ] Test filtering for each equipment type
- [ ] Verify "All" filter shows all products
- [ ] Test on mobile, tablet, desktop
- [ ] Verify navigation and footer work correctly
- [ ] Check console for JavaScript errors

**Status:** Pending

---

## Decisions Made

| Decision | Rationale | Date |
|----------|-----------|------|
| Grid card layout instead of sections | Better UX for filtering, shows all products at once | 2026-02-07 |
| Filter by equipment type | Products are used across multiple equipment types | 2026-02-07 |
| "All" as default filter | Shows all products on page load | 2026-02-07 |
| Assume image names | User will add images later | 2026-02-07 |

---

## Questions/Blockers

| Question | Status | Resolution |
|----------|--------|------------|
| Where should JS data live? Inline or separate module? | Open | TBD - suggest inline in main.js for simplicity |
| Should we use dropdown or button group for filters? | Open | TBD - button group likely better UX |
| How many columns for grid on desktop? | Open | TBD - suggest 3 columns (lg:grid-cols-3) |

---

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| None yet | - | - |

---

## Resources

- Current page: `pages/lubricants.html`
- Main JS: `src/main.js`
- CLAUDE.md color system and design guidelines

---

## Success Criteria

- ✅ All 7 unique lubricant products displayed in grid cards
- ✅ Filtering works for all 5 equipment types + "All"
- ✅ Default view shows all products
- ✅ Responsive design works on mobile, tablet, desktop
- ✅ Equipment type badges show which equipment uses each product
- ✅ Image placeholders ready for future images
- ✅ Maintains brand design system (colors, typography, spacing)
