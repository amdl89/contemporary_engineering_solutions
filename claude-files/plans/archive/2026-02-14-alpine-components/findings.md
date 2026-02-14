# Findings: Alpine.js Component Opportunities

## Current State Analysis

### Filter Components (DUPLICATE CODE)
**Location 1**: `pages/spare-parts-services.html` (lines 443-462)
- Inline x-data with `activeTab`, `partsConfig`, `shouldShow()` logic
- 8 items, 5 filter categories
- 20 lines of Alpine.js code

**Location 2**: `pages/lubricants.html` (lines 443-460)
- Inline x-data with `activeFilter`, `productsConfig`, `shouldShow()` logic
- 6 products, 4 equipment categories
- 18 lines of Alpine.js code (identical pattern)

**Duplication**: The `shouldShow()` logic is 100% identical
```javascript
shouldShow(itemId) {
  return this.activeFilter === 'all' ||
         this.itemsConfig[itemId]?.includes(this.activeFilter)
}
```

### Swiper.js Initialization (IMPERATIVE)
**Location**: `src/main.js` (lines 143-157)
```javascript
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  initHeroSlider();         // ← Imperative call
  initProductSlider();      // ← Imperative call
  initProductPageSlider();  // ← Imperative call
  initScrollAnimations();
});
```

**Problem**:
- Requires JavaScript changes to add new sliders
- Not declarative (can't see in HTML what slider type is used)
- Harder for non-JS developers to understand

### Swiper Slider Types
**From `src/swiper-init.js`:**

1. **initHeroSlider()** - Lines 16-31
   - Modules: Autoplay only
   - Config: Loop, 4000ms delay, 1 slide, no nav

2. **initProductSlider()** - Lines 40-76
   - Modules: Navigation + Autoplay
   - Config: Loop, 5000ms delay, responsive breakpoints (1/2/3 slides)
   - Navigation: `[data-slider-next]`, `[data-slider-prev]`

3. **initProductPageSlider()** - Lines 85-103
   - Modules: Navigation + Autoplay
   - Config: Loop, 4000ms delay, 1 slide
   - Navigation: `[data-product-next]`, `[data-product-prev]`

## Opportunities for Componentization

### 1. createFilter() Function Pattern
**Benefit**: Eliminate 40 lines of duplication (20 × 2 pages)
**Pattern**: Function returning object (Alpine.js pattern from user's research)
**API**: `createFilter(itemsConfig, initialFilter = 'all')`

### 2. Swiper Alpine Wrappers
**Benefit**: Declarative sliders via x-data
**Pattern**: Hybrid (base + presets) Alpine.data components
**Architecture** (per user requirements):
- Base: `swiper(configFn)` - generic wrapper
- Presets: `swiperHero()`, `swiperProduct()`, `swiperProductPage()`
- Auto-init in Alpine `init()` hook
- Keep swiper-init.js for configs (separation of concerns)

### 3. Contact Form (NO REFACTORING)
**User Decision**: Skip contact form refactoring
**Rationale**: Only used once (no duplication), not worth abstracting

## Key Findings Summary

| Component | Duplicated? | Lines | Priority | Pattern |
|-----------|-------------|-------|----------|---------|
| Filter logic | ✅ Yes (2 pages) | 40 | HIGH | Function |
| Swiper sliders | ❌ No | N/A | MEDIUM | Alpine.data (declarative benefits) |
| Contact form | ❌ No | 100+ | SKIP | Not needed |

## Technical Constraints

1. **Keep swiper-init.js**: User wants separation of concerns
2. **Auto-initialization**: Use Alpine init() hook, not manual control
3. **Hybrid approach**: Base component + preset shortcuts
4. **No test framework**: Manual/visual testing only
5. **Multi-page site**: Changes affect 5+ HTML files
