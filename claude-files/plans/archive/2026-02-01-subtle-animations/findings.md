# Findings: Subtle Animations Research

**Updated**: 2026-02-01

---

## Animation Strategy

### Core Principles
1. **Subtle over flashy** - Professional, not distracting
2. **Purposeful** - Each animation serves UX
3. **Performant** - 60fps, lightweight
4. **Accessible** - Respect user preferences
5. **Consistent** - Same patterns across pages

---

## Animation Types to Implement

### 1. Fade-In Animations
**Use Case**: Text blocks, sections, images
**Effect**: Opacity 0 → 1
**Duration**: 600ms
**Trigger**: Scroll into view

```css
opacity: 0;
transition: opacity 0.6s ease-out;
```

### 2. Slide-Up Animations
**Use Case**: Cards, features, CTAs
**Effect**: Translate Y + opacity
**Duration**: 600ms
**Distance**: 20px

```css
opacity: 0;
transform: translateY(20px);
transition: all 0.6s ease-out;
```

### 3. Stagger Animations
**Use Case**: Card grids, feature lists
**Effect**: Sequential fade-in
**Delay**: 100ms between items

```css
.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 100ms; }
.item:nth-child(3) { transition-delay: 200ms; }
```

### 4. Hover Transitions
**Use Case**: Buttons, cards, links
**Effect**: Scale, shadow, color
**Duration**: 200ms (fast for responsiveness)

```css
transition: all 0.2s ease-out;
hover: transform: scale(1.02);
```

---

## Technical Implementation

### Intersection Observer API
**Browser Support**: 97%+ (excellent)
**Performance**: Native, optimized
**Fallback**: Animations just appear (graceful degradation)

**Configuration**:
```javascript
{
  threshold: 0.1,     // Trigger when 10% visible
  rootMargin: '0px'   // No offset
}
```

### CSS Approach
- Use CSS transitions (not animations) for simplicity
- GPU-accelerated properties: opacity, transform
- Avoid: width, height, margin (causes layout shift)

### Accessibility
**prefers-reduced-motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Animation Timing

| Element Type | Duration | Delay | Easing |
|-------------|----------|-------|--------|
| Text blocks | 600ms | 0ms | ease-out |
| Cards | 600ms | 0-300ms | ease-out |
| Images | 800ms | 0ms | ease-out |
| Buttons (hover) | 200ms | 0ms | ease-out |
| Icons | 400ms | 0ms | ease-out |

---

## Performance Considerations

### Best Practices
1. **Use will-change sparingly** - Only for critical animations
2. **Batch animations** - Don't animate too many items at once
3. **Mobile-first** - Test on low-end devices
4. **Lazy load** - Don't animate off-screen content

### Metrics to Target
- **FPS**: Consistent 60fps
- **JavaScript**: < 10ms per frame
- **CSS**: GPU-accelerated only
- **Bundle size**: 0kb (using vanilla JS)

---

## Current Site Analysis

### Existing Animations
- Product slider transitions ✓
- Button hover states ✓
- Dropdown menu transitions ✓
- Mobile menu toggle ✓

### Missing Animations
- Scroll-triggered reveals
- Section transitions
- Card entrance animations
- Hero text animations
- Image fade-ins

---

## Pages Priority

| Page | Priority | Complexity | Notes |
|------|----------|-----------|-------|
| Homepage | High | Medium | Most visitor traffic |
| Jaw/Cone Crushers | High | Medium | Product showcases |
| About | Medium | Low | Simple sections |
| Contact | Medium | Low | Form focus |
| Services | Low | Low | Content-heavy |
| Lubricants | Low | Low | Product listings |

---

## Animation Classes to Create

```css
/* Base animation classes */
.fade-in-scroll { }
.slide-up-scroll { }
.slide-in-left { }
.slide-in-right { }
.stagger-children > * { }

/* State classes */
.is-visible { }
.animate-on-scroll { }

/* Utility classes */
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
```

---

## Code Organization

**File Structure**:
1. Add animation CSS to `src/style.css`
2. Add animation JS to `src/main.js`
3. Add animation classes to HTML elements
4. Test and refine

**Separation of Concerns**:
- CSS: Define transitions
- JavaScript: Observe & add classes
- HTML: Mark elements for animation

---

## Mobile Considerations

- Reduce animation distance on mobile (10px vs 20px)
- Shorter durations on mobile (400ms vs 600ms)
- Fewer simultaneous animations
- Test on actual devices, not just emulators
- Consider touch interaction delays
