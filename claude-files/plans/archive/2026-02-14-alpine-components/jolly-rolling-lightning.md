# Alpine.js Reusable Components Implementation Plan

## Context

The Contemporary Engineering Solutions website has opportunities for Alpine.js componentization:

**Current State:**
- **spare-parts-services.html**: Config-based tab filtering (8 items, 5 categories)
- **lubricants.html**: Equipment filtering (6 products, 4 categories)
- **Swiper.js sliders**: 3 types manually initialized in main.js (hero, product, product-page)

**Problems**:
1. The `shouldShow()` filter logic is **100% duplicated** across 2 pages (40 lines total)
2. Swiper initialization is **imperative** (manual DOMContentLoaded calls), not **declarative** (Alpine x-data)
3. Adding new sliders requires JavaScript knowledge, not just HTML

**Goal**: Implement Alpine.js reusable component patterns to:
- Eliminate filter duplication (DRY principle)
- Make Swiper sliders declarative with Alpine.js wrappers
- Enable HTML-only slider creation without touching JavaScript

**Why Now**: User discovered Alpine.js component patterns and wants to apply them for better maintainability and consistency.

---

## Proposed Solution

### Architecture: Single-File Component Library

Create `src/alpine-components.js` containing all reusable Alpine.js logic:

**Component 1: `createFilter()`** (Function Pattern)
- Purpose: Config-based filtering for tabs/categories
- Eliminates 20 lines × 2 pages duplication
- API: `createFilter(itemsConfig, initialFilter = 'all')`

**Component 2: Swiper Wrappers** (Hybrid Alpine.data Pattern)
- **Base Component**: `swiper(selector, configFn)` - Generic wrapper, calls swiper-init.js functions
- **Preset Shortcuts**: `swiperHero()`, `swiperProduct()`, `swiperProductPage()` - Convenience wrappers
- Auto-initializes in Alpine `init()` hook
- Keeps swiper-init.js for Swiper configs (separation of concerns)
- Makes sliders declarative: `<div x-data="swiperHero()">` instead of imperative JS calls

**Skip**:
- Alpine.bind() button presets (low ROI for 5-page site)
- Contact form refactoring (only used once, no duplication)

---

## Implementation Phases

### Phase 1: Setup Infrastructure (45 min)

**Goal**: Create component library without breaking changes

**Step 1.1: Create `/src/alpine-components.js`**

Implement filter and Swiper wrapper components:

```javascript
/**
 * Alpine.js Reusable Components
 * Components: createFilter(), swiper wrappers
 */

// ============================================
// FILTER COMPONENT (Function Pattern)
// ============================================

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

// ============================================
// SWIPER WRAPPER COMPONENTS (Alpine.data Pattern)
// ============================================

/**
 * Registers Alpine.js Swiper wrapper components
 * @param {Object} Alpine - Alpine.js instance
 * @param {Object} swiperInitFunctions - Swiper init functions from swiper-init.js
 */
export function registerAlpineComponents(Alpine, swiperInitFunctions) {

  /**
   * Generic Swiper wrapper - base component
   * @param {Function} configFn - Function from swiper-init.js that returns Swiper config
   * @returns {Object} Alpine component with Swiper instance
   */
  Alpine.data('swiper', (configFn) => ({
    swiperInstance: null,

    init() {
      if (typeof configFn === 'function') {
        // Call the swiper-init.js function to initialize
        this.swiperInstance = configFn();
      }
    },

    destroy() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }
    }
  }));

  /**
   * Preset: Hero Slider (auto-play, loop, no nav)
   * Usage: <div x-data="swiperHero()">
   */
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

  /**
   * Preset: Product Grid Slider (responsive, nav, auto-play)
   * Usage: <div x-data="swiperProduct()">
   */
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

  /**
   * Preset: Product Page Slider (simple, nav, loop)
   * Usage: <div x-data="swiperProductPage()">
   */
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

**Step 1.2: Update `/src/main.js`**

Import components and register with Alpine:

```javascript
import Alpine from "alpinejs";
import {
  initHeroSlider,
  initProductSlider,
  initProductPageSlider,
} from "./swiper-init.js";

// Import Alpine components
import { createFilter, registerAlpineComponents } from './alpine-components.js';

// Register Swiper wrapper components BEFORE Alpine.start()
registerAlpineComponents(Alpine, {
  initHeroSlider,
  initProductSlider,
  initProductPageSlider
});

// Expose createFilter globally for inline x-data
window.createFilter = createFilter;

window.Alpine = Alpine;
Alpine.start();

// REMOVE manual Swiper initialization from DOMContentLoaded
// (will be handled by Alpine x-data now)
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  // DELETE these lines (Swiper now auto-inits via Alpine):
  // initHeroSlider();
  // initProductSlider();
  // initProductPageSlider();
  initScrollAnimations();
});
```

**Step 1.3: Verify**
- Run `npm run dev`
- Check console for errors
- All pages should still work (no visible changes yet)

---

### Phase 2: Migrate Filter Components (45 min)

**Goal**: Eliminate filter logic duplication

**Step 2.1: Migrate spare-parts-services.html**

Replace inline x-data (lines 443-462):
```html
<!-- BEFORE (20 lines) -->
<div x-data="{
  activeTab: 'all',
  partsConfig: { ... },
  shouldShow(partId) { ... }
}">
```

With component call:
```html
<!-- AFTER (8 lines) -->
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

Update button variables: `activeTab` → `activeFilter` (for consistency)

**Step 2.2: Test spare-parts page**
- Click "All" → verify all 8 items visible
- Click each category → verify correct items show/hide
- Test mobile responsiveness
- Check browser console for errors

**Step 2.3: Migrate lubricants.html**

Replace inline x-data (lines 443-460) with:
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

**Step 2.4: Test lubricants page**
- Click all equipment filters
- Verify products show/hide correctly
- Test mobile layout

---

### Phase 3: Migrate Swiper Sliders to Alpine (45 min)

**Goal**: Make sliders declarative with Alpine x-data

**Current State**: Sliders are imperatively initialized in main.js:
```javascript
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();      // Manual call
  initProductSlider();   // Manual call
  initProductPageSlider(); // Manual call
});
```

**Target State**: Sliders auto-initialize via Alpine x-data in HTML

---

**Step 3.1: Migrate Hero Slider (index.html)**

Find the hero slider container (look for `[data-hero-slider]`):

**Before**:
```html
<div data-hero-slider class="swiper">
  <div class="swiper-wrapper">
    <!-- slides -->
  </div>
</div>
```

**After**:
```html
<div data-hero-slider class="swiper" x-data="swiperHero()">
  <div class="swiper-wrapper">
    <!-- slides -->
  </div>
</div>
```

**Test**: Verify hero slider auto-plays, loops correctly

---

**Step 3.2: Migrate Product Slider (index.html)**

Find product slider (look for `[data-products-slider]`):

**Before**:
```html
<div data-products-slider class="swiper">
  <div class="swiper-wrapper">
    <!-- product cards -->
  </div>
  <button data-slider-prev>←</button>
  <button data-slider-next>→</button>
</div>
```

**After**:
```html
<div data-products-slider class="swiper" x-data="swiperProduct()">
  <div class="swiper-wrapper">
    <!-- product cards -->
  </div>
  <button data-slider-prev>←</button>
  <button data-slider-next>→</button>
</div>
```

**Test**:
- Slider shows 1 slide (mobile), 2 (tablet), 3 (desktop)
- Navigation buttons work
- Auto-plays every 5 seconds
- Loops correctly

---

**Step 3.3: Migrate Product Page Sliders**

Find in product pages (e.g., jaw-crusher.html, cone-crusher.html):

Look for `[data-product-slider]`:

**Before**:
```html
<div data-product-slider class="swiper">
  <div class="swiper-wrapper">
    <!-- product images -->
  </div>
  <button data-product-prev>←</button>
  <button data-product-next>→</button>
</div>
```

**After**:
```html
<div data-product-slider class="swiper" x-data="swiperProductPage()">
  <div class="swiper-wrapper">
    <!-- product images -->
  </div>
  <button data-product-prev>←</button>
  <button data-product-next>→</button>
</div>
```

**Test**: Navigation works, loops correctly, auto-plays

---

**Step 3.4: Remove manual Swiper calls from main.js**

Already done in Phase 1, but verify these lines are DELETED:
```javascript
// DELETE these (Alpine now handles it):
initHeroSlider();
initProductSlider();
initProductPageSlider();
```

Keep only:
```javascript
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  initScrollAnimations();
  // Swiper initialization removed - handled by Alpine x-data
});
```

---

### Phase 4: Documentation & Cleanup (15 min)

**Step 4.1: Add JSDoc comments**

Already included in component code above

**Step 4.2: Update CLAUDE.md**

Add section under "Interactive Components":
```markdown
### Alpine.js Reusable Components

Components are defined in `src/alpine-components.js`:

**createFilter(itemsConfig, initialFilter)**
- Purpose: Config-based item filtering
- Used in: spare-parts-services.html, lubricants.html
- Example: `x-data="createFilter({ 'item-1': ['category-a'] })"`

**Swiper Wrappers**
- **swiperHero()**: Hero slider preset (auto-play, loop, no nav)
- **swiperProduct()**: Product grid slider (responsive, nav, auto-play)
- **swiperProductPage()**: Product page slider (simple, nav, loop)
- Usage: Add `x-data="swiperHero()"` to slider container
- Config: Managed in `src/swiper-init.js` (separation of concerns)
```

**Step 4.3: Build and test production**

```bash
npm run build
npm run preview
```

Smoke test all 3 affected pages in preview mode

---

## Critical Files

**New Files:**
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/src/alpine-components.js` (reusable components)

**Files to Modify:**
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/src/main.js` (imports, registration, remove manual Swiper calls)
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/pages/spare-parts-services.html` (replace filter x-data)
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/pages/lubricants.html` (replace filter x-data)
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/index.html` (add x-data to hero/product sliders)
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/pages/*.html` (add x-data to product page sliders)
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/CLAUDE.md` (document components)

**Files to Keep Unchanged:**
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/src/swiper-init.js` (Swiper configs stay here)
- `/home/amul_dahal/Projects/contemporary_engineering_solutions/pages/contact.html` (no refactoring needed)

---

## Trade-offs

### Benefits
✅ **Eliminates filter duplication**: 20 lines × 2 pages (40 lines total)
✅ **Single source of truth**: Filter logic changes once, applies everywhere
✅ **Declarative sliders**: Add slider with HTML `x-data`, no JavaScript needed
✅ **Follows Alpine.js best practices**: Uses official component patterns
✅ **Better developer experience**: HTML-only slider creation for non-JS developers
✅ **Future-proof**: Easy to add more filtered pages or new slider types
✅ **Cleaner main.js**: No more imperative DOMContentLoaded Swiper calls

### Costs
⚠️ **Slight abstraction**: Need to understand `createFilter()` and `swiper*()` APIs
⚠️ **Bundle size**: ~1KB gzipped for component wrappers (negligible)
⚠:️ **Learning curve**: Team needs to learn Alpine.data() pattern (but it's simple)
⚠️ **Debugging**: Swiper errors now tied to Alpine lifecycle (use Alpine DevTools)

### Decision
**Proceed with refactoring** - Benefits far outweigh costs:
- Clear duplication to eliminate (filters)
- Makes sliders more accessible to HTML developers
- Follows framework conventions (Alpine.js patterns)

---

## Verification Checklist

### Pre-Implementation
- [ ] Git status clean, create branch: `git checkout -b refactor/alpine-components`
- [ ] Current site works perfectly (baseline)

### After Phase 1 (Infrastructure)
- [ ] Dev server starts: `npm run dev`
- [ ] No console errors
- [ ] All pages still work (no changes yet)

### After Phase 2 (Filter Migration)
**spare-parts-services.html:**
- [ ] "All" tab shows all 8 items
- [ ] "Cone Crusher" shows Concave + Mantle only
- [ ] "Jaw Crusher" shows Jaw Plates only
- [ ] "Impact Crusher" shows VSI Parts only
- [ ] "Screening Equipment" shows 4 screening items
- [ ] Tab buttons highlight correctly
- [ ] Mobile responsive (buttons wrap, items stack)

**lubricants.html:**
- [ ] "All" shows all 6 products
- [ ] "Jaw Crusher" filter works
- [ ] "Cone Crusher" filter works
- [ ] "Vibrating Screen" filter works
- [ ] "Impactors" filter works
- [ ] "Conveyor" filter works

### After Phase 3 (Swiper Migration)
**Hero Slider (index.html):**
- [ ] Auto-plays every 4 seconds
- [ ] Loops seamlessly
- [ ] Smooth transitions
- [ ] No navigation buttons (as expected)

**Product Slider (index.html):**
- [ ] Shows 1 slide on mobile (<640px)
- [ ] Shows 2 slides on tablet (640-1023px)
- [ ] Shows 3 slides on desktop (1024px+)
- [ ] Navigation arrows work (prev/next)
- [ ] Auto-plays every 5 seconds
- [ ] Loops correctly
- [ ] Touch/swipe works on mobile

**Product Page Sliders:**
- [ ] Navigation arrows work
- [ ] Auto-plays every 4 seconds
- [ ] Loops correctly
- [ ] Images display properly

### Production Build
- [ ] Build completes: `npm run build`
- [ ] Preview works: `npm run preview`
- [ ] Revisit all 3 pages in preview
- [ ] No console errors in production build
- [ ] Bundle size reasonable (check dist/ folder)

### Cross-Browser (Optional but Recommended)
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Rollback Strategy

**If issues arise:**

1. Each phase is in separate commit:
   - `git commit -m "feat: add Alpine.js component infrastructure"`
   - `git commit -m "refactor: migrate filter components to createFilter()"`
   - `git commit -m "refactor: migrate contact form to Alpine.data component"`

2. Rollback specific phase: `git revert <commit-hash>`

3. Emergency rollback: `git reset --hard HEAD~3` (then force push if needed)

**Safe to proceed because:**
- Incremental approach allows testing each phase
- No breaking changes to user-facing behavior
- Site currently works, changes are internal refactoring only

---

## Success Criteria

**Implementation is successful when:**
1. All filter tabs/buttons work identically to before
2. All Swiper sliders auto-initialize via Alpine x-data
3. Hero, product, and product-page sliders behave as before
4. No manual Swiper calls remain in main.js DOMContentLoaded
5. No console errors in browser
6. Production build completes and works in preview
7. Code is DRY (no duplicated filter logic)
8. Sliders can be added with HTML only (no JavaScript changes)

**Bonus outcomes:**
- Future filtered pages can reuse `createFilter()`
- New slider types can be added easily
- HTML developers can create sliders without JavaScript knowledge
- Team understands Alpine.js component patterns

---

## Estimated Timeline

- **Phase 1**: 45 minutes (infrastructure setup + Swiper wrappers)
- **Phase 2**: 45 minutes (filter migration + testing)
- **Phase 3**: 45 minutes (Swiper migration + testing all slider types)
- **Phase 4**: 15 minutes (documentation + build verification)

**Total**: ~2.5 hours for complete implementation

**Can be split across sessions** - each phase is independently testable.
