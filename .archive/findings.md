# Findings: Lubricants Page Redesign

**Project:** Contemporary Engineering Solutions
**Task:** Lubricants Page Grid Layout & Filtering
**Date:** 2026-02-07

---

## Current State Analysis

### Existing Page Structure
- **File:** `pages/lubricants.html`
- **Current Layout:** Tab-based with 4 industry categories
  - Crusher & Construction (active by default)
  - Cement (coming soon)
  - Food & Pharmaceuticals (coming soon)
  - Steel (coming soon)
- **Current Content:** Multiple detailed product sections with images and descriptions
- **Hero Section:** Includes industry tabs navigation
- **Length:** 1,618 lines

### Current Tab Implementation
- Uses `data-tab` and `data-panel` attributes
- JavaScript in `main.js` handles tab switching
- Each panel has multiple product sections with detailed cards

---

## New Requirements Analysis

### Product Data Provided

**Equipment Types & Lubricants:**

1. **Jaw Crusher** (1 product)
   - Mosil GM-00(SP2)

2. **Cone Crusher** (4 products)
   - Mosil Gear Lube SP-150e
   - Mosil Gear Lube SP-220e
   - Mosil BRB 400
   - Mosil GM-00(SP2)

3. **Impactors** (1 product)
   - Mosil ML-110 Premium

4. **Vibrating Screen** (1 product)
   - Mosil GM-00(SP2)

5. **Conveyor Bearing & Gearbox** (2 products)
   - Mosil GM-00(SP2)
   - Mosil Gear Lube SP-320e

### Unique Products (7 total)
1. **Mosil GM-00(SP2)** - Most versatile (4 equipment types)
   - Jaw Crusher
   - Cone Crusher
   - Vibrating Screen
   - Conveyor Bearing & Gearbox

2. **Mosil Gear Lube SP-150e** - Cone Crusher only
3. **Mosil Gear Lube SP-220e** - Cone Crusher only
4. **Mosil BRB 400** - Cone Crusher only
5. **Mosil ML-110 Premium** - Impactors only
6. **Mosil Gear Lube SP-320e** - Conveyor only

---

## Design System Research

### Brand Colors (from CLAUDE.md)
- **Primary Purple:** `bg-primary-600`, `bg-primary-700` (hover)
- **Primary Light:** `bg-primary-50`, `bg-primary-100` (backgrounds)
- **Accent Gold:** `bg-accent-gold-500` (special CTAs only)
- **Accent Teal:** `bg-accent-teal-600` (alternative accent)
- **Surface:** `bg-surface` (white cards)
- **Border:** `border-border` (card outlines)

### Common Component Patterns
```html
<!-- Card Pattern -->
<div class="bg-surface border border-border rounded-lg shadow-sm">
  <h3 class="text-text">Title</h3>
  <p class="text-text-muted">Description</p>
</div>

<!-- Badge Pattern -->
<span class="bg-primary-100 text-primary-700 text-sm px-2 py-1 rounded">
  Tag
</span>

<!-- Button Pattern -->
<button class="bg-primary-600 hover:bg-primary-700 text-white">
  Action
</button>
```

---

## Technical Findings

### JavaScript Requirements
- Current `main.js` has tab functionality we can reference
- Need to add:
  - Lubricants data array
  - Equipment categories array
  - Filter state management
  - Event listeners for filter buttons
  - Card show/hide logic based on filter

### Existing JS Structure (from main.js context)
- Mobile menu toggle
- Dropdown menu handling
- Tab switching functionality (can be adapted)

---

## Layout Recommendations

### Filter UI Options

**Option A: Button Group (Recommended)**
- Horizontal scrollable buttons on mobile
- Shows all options at once
- Clear active state
- Better for 5-6 options

**Option B: Dropdown Select**
- More compact
- Better for many options
- Less visual clarity of all options

**Recommendation:** Use button group with horizontal scroll on mobile

### Grid Layout
- **Mobile:** 1 column (`grid-cols-1`)
- **Tablet:** 2 columns (`md:grid-cols-2`)
- **Desktop:** 3 columns (`lg:grid-cols-3`)

### Card Design
```
┌─────────────────────────┐
│   [Product Image]       │
│                         │
├─────────────────────────┤
│ Product Name            │
│ Description text...     │
│                         │
│ [Equipment Tags]        │
│                         │
│ [Request Quote Button]  │
└─────────────────────────┘
```

---

## Implementation Approach

### Phase Approach
1. **Data Structure First** - Define JS objects
2. **HTML Structure** - Build static grid layout
3. **Filter Logic** - Implement filtering
4. **Styling** - Polish and responsive design
5. **Testing** - Verify all scenarios

### Data Structure Strategy
```javascript
// Store in main.js for simplicity (single page use case)
const lubricantProducts = [
  {
    id: 'mosil-gm-00-sp2',
    name: 'Mosil GM-00(SP2)',
    shortDesc: 'Multi-purpose grease for various equipment',
    fullDesc: 'Premium lithium complex grease suitable for...',
    image: '/images/lubricants/mosil-gm-00-sp2.jpg', // Placeholder
    equipmentTypes: ['jaw-crusher', 'cone-crusher', 'vibrating-screen', 'conveyor'],
    grade: 'Premium Grade',
    specifications: ['NLGI Grade 2', 'High dropping point']
  },
  // ... other products
];
```

---

## User Requirements

### Confirmed Details
- ✅ Grid card layout for products
- ✅ Filter by equipment type
- ✅ "All" filter is default
- ✅ Same product can appear in multiple categories
- ✅ Image names will be assumed (user will add later)
- ✅ 7 unique Mosil products
- ✅ 5 equipment categories

### Assumptions
- Keep existing hero section structure
- Keep existing navigation and footer
- Maintain brand design system
- Mobile-first responsive approach
- No backend integration (static filtering)

---

## Key Insights

1. **Product Reuse:** Mosil GM-00(SP2) appears in 4 categories - need badges to show compatibility
2. **Filtering Logic:** Use data attributes on cards for equipment types
3. **Default State:** Show all products on page load
4. **Image Placeholders:** Use consistent naming convention for future images
5. **Simplicity:** Client-side filtering is sufficient (only 7 products)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Filter UI cluttered on mobile | Medium | Horizontal scroll with touch gestures |
| Too many equipment tags on multi-use products | Low | Limit to 3 visible tags + "more" indicator |
| Image placeholders look unprofessional | Low | Use consistent placeholder design |
| Filter buttons too wide on desktop | Low | Use flex-wrap and max-width |

---

## Next Steps

1. Define complete JavaScript data structure
2. Create filter button HTML
3. Build product card template
4. Implement grid layout
5. Add filtering logic
6. Test and refine

---

## References
- Current page: `pages/lubricants.html:1-1618`
- Design system: `CLAUDE.md`
- Main JS: `src/main.js`
