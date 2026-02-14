# Task Plan: Alpine.js Reusable Components

## Context

Implementing Alpine.js reusable component patterns to:
1. Eliminate filter logic duplication (40 lines across 2 pages)
2. Make Swiper sliders declarative (HTML-only slider creation)
3. Follow Alpine.js best practices (component patterns)

**User Requirements**:
- Hybrid approach: Base component + preset shortcuts
- Auto-initialization via Alpine init() hook
- Keep swiper-init.js for configs (separation of concerns)
- Skip contact form refactoring (no duplication)

---

## Phase 1: Setup Infrastructure (45 min)

### Step 1.1: Create src/alpine-components.js

**Create new file** with:
- `createFilter()` function (filter logic)
- `registerAlpineComponents()` function (Swiper wrappers)
- Base component: `Alpine.data('swiper', ...)`
- Presets: `swiperHero()`, `swiperProduct()`, `swiperProductPage()`

**Implementation**:
```javascript
// Filter component
export function createFilter(itemsConfig, initialFilter = 'all') {
  return {
    activeFilter: initialFilter,
    itemsConfig,
    shouldShow(itemId) {
      return this.activeFilter === 'all' ||
             this.itemsConfig[itemId]?.includes(this.activeFilter);
    }
  };
}

// Swiper wrappers
export function registerAlpineComponents(Alpine, swiperInitFunctions) {
  // Base component (for custom configs)
  Alpine.data('swiper', (configFn) => ({
    swiperInstance: null,
    init() {
      if (typeof configFn === 'function') {
        this.swiperInstance = configFn();
      }
    },
    destroy() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }
    }
  }));

  // Preset: Hero slider
  Alpine.data('swiperHero', () => ({
    swiperInstance: null,
    init() {
      this.swiperInstance = swiperInitFunctions.initHeroSlider();
    },
    destroy() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }
    }
  }));

  // Preset: Product slider
  Alpine.data('swiperProduct', () => ({
    swiperInstance: null,
    init() {
      this.swiperInstance = swiperInitFunctions.initProductSlider();
    },
    destroy() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }
    }
  }));

  // Preset: Product page slider
  Alpine.data('swiperProductPage', () => ({
    swiperInstance: null,
    init() {
      this.swiperInstance = swiperInitFunctions.initProductPageSlider();
    },
    destroy() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }
    }
  }));
}
```

### Step 1.2: Update src/main.js

**Add imports**:
```javascript
import { createFilter, registerAlpineComponents } from './alpine-components.js';
```

**Register components** (before Alpine.start()):
```javascript
registerAlpineComponents(Alpine, {
  initHeroSlider,
  initProductSlider,
  initProductPageSlider
});
window.createFilter = createFilter;
```

**Remove manual Swiper calls** (from DOMContentLoaded):
```javascript
// DELETE these lines:
initHeroSlider();
initProductSlider();
initProductPageSlider();
```

### Step 1.3: Verify
- [ ] Run `npm run dev`
- [ ] No console errors
- [ ] All pages load (no visible changes yet)

---

## Phase 2: Migrate Filter Components (45 min)

### Step 2.1: Migrate spare-parts-services.html

**Find lines 443-462** (inline x-data)

**Replace with**:
```html
<div x-data="createFilter({
  'concave': ['cone'],
  'mantle': ['cone'],
  'jaw-plates': ['jaw'],
  'vsi-parts': ['impact'],
  'wire-meshes': ['screening'],
  'plate-meshes': ['screening'],
  'clamping-fasteners': ['screening'],
  'rubber-bedding': ['screening']
})">
```

**Update buttons**: Change `activeTab` → `activeFilter` for consistency

### Step 2.2: Test spare-parts page
- [ ] "All" shows all 8 items
- [ ] "Cone Crusher" shows Concave + Mantle
- [ ] "Jaw Crusher" shows Jaw Plates
- [ ] "Impact Crusher" shows VSI Parts
- [ ] "Screening Equipment" shows 4 items
- [ ] Mobile responsive

### Step 2.3: Migrate lubricants.html

**Find lines 443-460** (inline x-data)

**Replace with**:
```html
<div x-data="createFilter({
  'mosil-gm-00-sp2': ['jaw-crusher', 'cone-crusher', 'vibrating-screen', 'conveyor'],
  'mosil-gear-lube-sp-150e': ['cone-crusher'],
  'mosil-gear-lube-sp-220e': ['cone-crusher'],
  'mosil-brb-400': ['cone-crusher'],
  'mosil-ml-110-premium': ['impactors'],
  'mosil-gear-lube-sp-320e': ['conveyor']
})">
```

### Step 2.4: Test lubricants page
- [ ] "All" shows all 6 products
- [ ] Each equipment filter works correctly
- [ ] Mobile responsive

---

## Phase 3: Migrate Swiper Sliders (45 min)

### Step 3.1: Migrate Hero Slider (index.html)

**Find**: `<div data-hero-slider class="swiper">`

**Add x-data**:
```html
<div data-hero-slider class="swiper" x-data="swiperHero()">
```

**Test**:
- [ ] Auto-plays (4s delay)
- [ ] Loops seamlessly
- [ ] Smooth transitions

### Step 3.2: Migrate Product Slider (index.html)

**Find**: `<div data-products-slider class="swiper">`

**Add x-data**:
```html
<div data-products-slider class="swiper" x-data="swiperProduct()">
```

**Test**:
- [ ] Responsive (1/2/3 slides)
- [ ] Navigation works
- [ ] Auto-plays (5s delay)
- [ ] Touch/swipe works

### Step 3.3: Migrate Product Page Sliders

**Find all**: `<div data-product-slider class="swiper">` in product pages

**Add x-data to each**:
```html
<div data-product-slider class="swiper" x-data="swiperProductPage()">
```

**Test each product page**:
- [ ] Navigation works
- [ ] Auto-plays (4s delay)
- [ ] Loops correctly

---

## Phase 4: Documentation & Verification (15 min)

### Step 4.1: Add JSDoc to alpine-components.js
- [x] Already included in Phase 1 code

### Step 4.2: Update CLAUDE.md

**Add section** under "Interactive Components":
```markdown
### Alpine.js Reusable Components

**createFilter(itemsConfig, initialFilter)**
- Config-based item filtering
- Used in: spare-parts-services.html, lubricants.html
- Example: `x-data="createFilter({ 'item-1': ['cat-a'] })"`

**Swiper Wrappers**
- swiperHero() - Hero slider (auto-play, loop, no nav)
- swiperProduct() - Product grid (responsive, nav, auto-play)
- swiperProductPage() - Product page (simple, nav, loop)
- Usage: Add `x-data="swiperHero()"` to slider container
- Config managed in: src/swiper-init.js
```

### Step 4.3: Production Build Verification
- [ ] Run `npm run build`
- [ ] No build errors
- [ ] Run `npm run preview`
- [ ] Test all pages in preview
- [ ] Check bundle size

---

## Critical Files

### New Files
- `src/alpine-components.js` - All reusable components

### Files to Modify
- `src/main.js` - Imports, registration, remove Swiper calls
- `pages/spare-parts-services.html` - Replace filter x-data
- `pages/lubricants.html` - Replace filter x-data
- `index.html` - Add x-data to sliders
- `pages/*.html` - Add x-data to product sliders
- `CLAUDE.md` - Document components

### Files to Keep Unchanged
- `src/swiper-init.js` - Swiper configs stay here
- `pages/contact.html` - No refactoring needed

---

## Success Criteria

✅ All filter tabs work identically to before
✅ All sliders auto-initialize via Alpine x-data
✅ No manual Swiper calls in main.js
✅ No console errors
✅ Production build works
✅ Code is DRY (no filter duplication)
✅ Sliders can be added with HTML only

---

## Estimated Timeline

- Phase 1: 45 minutes
- Phase 2: 45 minutes
- Phase 3: 45 minutes
- Phase 4: 15 minutes

**Total**: ~2.5 hours (can be split across sessions)

---

## Rollback Strategy

**Per-phase commits**:
- Commit 1: "feat: add Alpine.js component infrastructure"
- Commit 2: "refactor: migrate filters to createFilter()"
- Commit 3: "refactor: migrate Swiper to Alpine wrappers"
- Commit 4: "docs: update CLAUDE.md with component usage"

**Emergency rollback**: `git revert <commit-hash>` for specific phase
