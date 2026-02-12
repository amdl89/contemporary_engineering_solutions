# Task Plan: Swiper.js Migration

## Objective
Replace custom vanilla JavaScript slider implementations with Swiper.js library across the entire website for better performance, accessibility, and touch/swipe support on mobile devices.

## Scope

### Pages with Sliders
1. **Homepage (`index.html`):**
   - Hero slider (3 slides, full-screen)
   - Products slider (9 cards, responsive multi-slide carousel)

2. **Product Pages (`pages/*.html`):**
   - Jaw Crusher ✓
   - Cone Crusher
   - Vibrating Screen
   - Vertical Shaft Impactor
   - Horizontal Shaft Impactor
   - Roll Crusher
   - Bucket Classifier
   - Hydro Cyclone
   - Screw Classifier

## Implementation Strategy

### Phase 1: Setup and Infrastructure
**Goal:** Prepare Swiper.js imports and CSS integration

1. **Create Swiper initialization module** (`src/swiper-init.js`)
   - Import Swiper core and modules (Navigation, Pagination, Autoplay)
   - Import necessary CSS files
   - Export initialization functions for each slider type

2. **Update `src/main.js`**
   - Import Swiper initialization functions
   - Replace custom slider functions with Swiper calls
   - Keep existing DOM ready listener

### Phase 2: Homepage Sliders
**Goal:** Migrate homepage sliders first (most complex)

#### 2A: Hero Slider
**Current:** `data-hero-slider`, `initHeroSlider()`
**Target Configuration:**
- 3 slides
- Auto-play: 4000ms
- Loop: true
- Effect: fade or slide
- No navigation arrows (just auto-play)

**Changes Required:**
- Update HTML: Add `swiper` and `swiper-slide` classes
- Add `swiper-wrapper` container
- Configure Swiper instance with autoplay module

#### 2B: Products Slider
**Current:** `data-products-slider`, `initProductSlider()`
**Target Configuration:**
- 9 product cards
- Responsive slidesPerView:
  - Desktop (≥1024px): 3
  - Tablet (≥768px): 2
  - Mobile: 1
- Navigation: arrows
- Pagination: dots (optional, already referenced in code)
- Auto-play: 5000ms
- Space between slides: use existing padding

**Changes Required:**
- Update HTML structure for Swiper compatibility
- Add navigation arrow bindings
- Configure responsive breakpoints
- Style navigation to match existing design

### Phase 3: Product Pages
**Goal:** Migrate individual product page sliders

**Current:** `data-product-slider`, `initProductPageSlider()`
**Target Configuration (per page):**
- 2 slides (SVG diagrams/technical illustrations)
- Navigation: arrows
- Auto-play: 4000ms
- Loop: true

**Pages to Update:**
1. `pages/jaw-crusher.html` (template/reference)
2. `pages/cone-crusher.html`
3. `pages/vibrating-screen.html`
4. `pages/vertical-shaft-impactor.html`
5. `pages/horizontal-shaft-impactor.html`
6. `pages/roll-crusher.html`
7. `pages/bucket-classifier.html`
8. `pages/hydro-cyclone.html`
9. `pages/screw-classifier.html`

**Approach:**
- Create reusable HTML pattern from jaw-crusher migration
- Apply same pattern to all other product pages
- Test each page individually

### Phase 4: JavaScript Cleanup
**Goal:** Remove obsolete custom slider code

**Files to Clean:**
1. `src/main.js`:
   - Remove `initHeroSlider()` (lines 185-205)
   - Remove `initProductSlider()` (lines 108-182)
   - Remove `initProductPageSlider()` (lines 528-560)
   - Update DOMContentLoaded listener

### Phase 5: Styling Customization
**Goal:** Ensure Swiper elements match brand design

**Custom Styles Needed:**
1. **Navigation Arrows:**
   - Keep existing Tailwind classes: `bg-white hover:bg-primary-600 text-text hover:text-white rounded-full p-2 sm:p-3 shadow-lg`
   - Position: absolute positioning maintained
   - Colors: primary-600, white

2. **Pagination Dots:**
   - Active: `bg-primary-600`
   - Inactive: `bg-secondary-300`
   - Style to match brand

3. **Transitions:**
   - Maintain smooth transitions (500-700ms)

### Phase 6: Testing and Validation
**Goal:** Ensure all sliders work correctly across devices

**Test Matrix:**
| Page | Desktop | Tablet | Mobile | Touch | Keyboard | Auto-play |
|------|---------|--------|--------|-------|----------|-----------|
| Homepage (Hero) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Homepage (Products) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Jaw Crusher | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Cone Crusher | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Vibrating Screen | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Vert. Shaft Impactor | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Horiz. Shaft Impactor | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Roll Crusher | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Bucket Classifier | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Hydro Cyclone | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Screw Classifier | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**Testing Checklist:**
- [ ] All sliders auto-play correctly
- [ ] Navigation arrows work on all sliders
- [ ] Responsive behavior (products slider adapts to screen size)
- [ ] Touch/swipe works on mobile devices
- [ ] Keyboard navigation functional (arrow keys, tab)
- [ ] Loop behavior correct (where enabled)
- [ ] No JavaScript errors in console
- [ ] Smooth transitions maintained
- [ ] Custom styling preserved (brand colors)
- [ ] Accessibility (ARIA labels, focus states)

## Success Criteria

1. ✅ All custom slider code replaced with Swiper.js
2. ✅ Same visual appearance and behavior as before
3. ✅ Touch/swipe support added for mobile users
4. ✅ Better accessibility (keyboard navigation, ARIA)
5. ✅ No regressions in functionality
6. ✅ Code is cleaner and more maintainable
7. ✅ Performance improved or maintained

## Rollback Plan

If issues arise:
1. Revert changes via git: `git reset --hard <commit-before-swiper>`
2. Custom slider code is preserved in git history
3. Can selectively revert individual pages if needed

## Notes

- Swiper.js v12.1.0 is already installed
- Keep existing data attributes during development for easier debugging
- Can remove old data attributes after successful migration
- Test on actual devices if possible (not just browser DevTools)
- Consider lazy loading for hero images if performance is concern
