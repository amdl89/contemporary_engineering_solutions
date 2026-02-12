# Findings: Swiper.js Migration

## Current Slider Implementation

### 1. Hero Slider (Homepage)
**Location:** `index.html` lines 394-494
**Data Attribute:** `data-hero-slider`
**JavaScript Function:** `initHeroSlider()` in `main.js` lines 185-205
**Details:**
- 3 slides with hero images
- Auto-plays every 4 seconds
- No navigation arrows (just auto-play)
- Simple transform-based animation
- Full-width/height slider

**HTML Structure:**
```html
<div data-hero-slider>
  <!-- Slide 1 -->
  <div class="w-full flex-shrink-0 h-full relative">
    <img src="/images/hero_1.jpg" />
  </div>
  <!-- 2 more slides... -->
</div>
```

### 2. Products Slider (Homepage)
**Location:** `index.html` lines 739-1151
**Data Attribute:** `data-products-slider`
**JavaScript Function:** `initProductSlider()` in `main.js` lines 108-182
**Details:**
- 9 product cards displayed
- Responsive: 3 cards (desktop), 2 (tablet), 1 (mobile)
- Navigation arrows: `data-slider-prev`, `data-slider-next`
- Auto-plays every 5 seconds
- Has pagination dots feature

**HTML Structure:**
```html
<div data-products-slider>
  <!-- 9 product cards -->
  <div class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
    <!-- Product card content -->
  </div>
</div>
<!-- Navigation arrows -->
<button data-slider-prev>...</button>
<button data-slider-next>...</button>
```

### 3. Product Page Sliders
**Locations:**
- `pages/jaw-crusher.html` lines 462-903
- Similar structure on other product pages (cone-crusher, etc.)

**Data Attribute:** `data-product-slider`
**JavaScript Function:** `initProductPageSlider()` in `main.js` lines 528-560
**Details:**
- 2 slides per product page (showing SVG diagrams/technical illustrations)
- Navigation arrows: `data-product-prev`, `data-product-next`
- Auto-plays every 4 seconds
- Full-width container with specific height (400px-600px)

**HTML Structure:**
```html
<div data-product-slider>
  <!-- Slide 1 -->
  <div class="w-full flex-shrink-0 h-full relative">
    <!-- SVG or image content -->
  </div>
  <!-- Slide 2 -->
</div>
<!-- Navigation arrows -->
<button data-product-prev>...</button>
<button data-product-next>...</button>
```

## Product Pages with Sliders

Based on navigation and file exploration, product pages are:
1. `pages/jaw-crusher.html` ✓ (confirmed with slider)
2. `pages/cone-crusher.html`
3. `pages/vibrating-screen.html`
4. `pages/vertical-shaft-impactor.html`
5. `pages/horizontal-shaft-impactor.html`
6. `pages/roll-crusher.html`
7. `pages/bucket-classifier.html`
8. `pages/hydro-cyclone.html`
9. `pages/screw-classifier.html`

**Note:** Need to verify which pages actually have sliders implemented (likely all follow jaw-crusher pattern).

## Swiper.js Installation

**Package:** `swiper` version 12.1.0
**Location:** Already installed in `package.json` line 16
**Import Needed:**
```javascript
import Swiper from 'swiper';
import 'swiper/css';
```

## Key Considerations

### Current Functionality to Preserve
1. **Auto-play** - All sliders auto-advance
2. **Navigation arrows** - Products slider and product page sliders
3. **Responsive behavior** - Products slider adapts to screen size
4. **Smooth transitions** - CSS transitions (duration: 700ms hero, 500ms products, 700ms product-page)
5. **Loop/circular** - Hero slider loops back to start

### Challenges Identified
1. **Different slider types** - Hero (full-screen), Products (multi-slide carousel), Product pages (simple 2-slide)
2. **Custom styling** - Navigation arrows have specific Tailwind styling
3. **Multiple instances** - Need to initialize different Swiper instances per page
4. **Responsive configuration** - Products slider needs breakpoint-specific settings

### Benefits of Swiper.js
1. **Touch/swipe support** - Currently missing on mobile
2. **Better performance** - Hardware-accelerated transitions
3. **Accessibility** - Better keyboard navigation and ARIA support
4. **Lazy loading** - Could improve page load time for images
5. **More reliable** - Battle-tested library vs custom code
6. **Pagination dots** - Built-in, currently partially implemented
7. **Loop mode** - More robust circular navigation

## Technical Approach

### Swiper.js Modules Needed
```javascript
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
```

### Custom Styling Strategy
- Keep existing Tailwind classes on navigation arrows
- Override Swiper default CSS where needed
- Use Swiper's class names but maintain brand colors (primary-600, accent-gold, etc.)
