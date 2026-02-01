# Task Plan: Subtle Animations Implementation

**Goal**: Add subtle, professional animations throughout the website with scroll-triggered effects

**Strategy**: Vanilla JavaScript scroll animations with CSS transitions - no heavy libraries, keep it lightweight and subtle

**Theme**: Subtlety - smooth, professional, non-distracting animations that enhance UX

**Status**: Phase 0 (Planning)

---

## Phases

### Phase 0: Planning & Research ⏳ `in_progress`
**Goal**: Research animation approach and create implementation strategy

**Tasks**:
- [x] Create planning files
- [ ] Research CSS animation patterns
- [ ] Plan scroll animation approach (Intersection Observer API)
- [ ] Define animation types to implement

**Success Criteria**: Clear animation strategy documented

---

### Phase 1: Homepage (index.html) ⏳ `pending`
**Goal**: Add subtle animations to homepage

**Animation Types**:
- Fade-in on scroll for sections
- Slide-up for cards/features
- Smooth hover transitions on buttons/cards
- Hero text fade-in on load
- Product slider smooth transitions (already has some)

**Success Criteria**: All homepage sections have subtle scroll animations

---

### Phase 2: About Page (pages/about.html) ⏳ `pending`
**Goal**: Add subtle animations to about page

**Animation Types**:
- Hero fade-in
- Company story text reveal on scroll
- Values cards stagger fade-in
- Team member cards slide-up on scroll
- SVG/image gentle fade-in

**Success Criteria**: About page sections animate subtly on scroll

---

### Phase 3: Spare Parts & Services (pages/spare-parts-services.html) ⏳ `pending`
**Goal**: Add animations to services page

**Animation Types**:
- Service cards fade-in on scroll
- Product grid items stagger animation
- CTA section slide-up

**Success Criteria**: Service offerings animate smoothly

---

### Phase 4: Lubricants Page (pages/lubricants.html) ⏳ `pending`
**Goal**: Add animations to lubricants page

**Animation Types**:
- Product listings fade-in
- Feature highlights slide-up
- Benefits section stagger animation

**Success Criteria**: Product information reveals smoothly

---

### Phase 5: Contact Page (pages/contact.html) ⏳ `pending`
**Goal**: Add animations to contact page

**Animation Types**:
- Form fade-in on scroll
- Contact info cards slide-up
- CTA section subtle reveal

**Success Criteria**: Contact elements animate professionally

---

### Phase 6: Jaw Crusher Page (pages/jaw-crusher.html) ⏳ `pending`
**Goal**: Add animations to jaw crusher page

**Animation Types**:
- Hero section fade-in
- SVG illustration fade-in
- Features grid stagger animation
- Specifications fade-in
- CTA slide-up

**Success Criteria**: Product page has engaging scroll animations

---

### Phase 7: Cone Crusher Page (pages/cone-crusher.html) ⏳ `pending`
**Goal**: Add animations to cone crusher page

**Animation Types**:
- Same pattern as jaw crusher for consistency
- Hero fade-in
- SVG reveal
- Features stagger
- CTA animations

**Success Criteria**: Consistent with jaw crusher animations

---

### Phase 8: Polish & Performance ⏳ `pending`
**Goal**: Fine-tune animations and ensure performance

**Tasks**:
- Test animations on all pages
- Ensure 60fps performance
- Add prefers-reduced-motion support
- Verify mobile performance
- Cross-browser testing

**Success Criteria**: Smooth 60fps animations, accessible, performant

---

## Animation Philosophy

**Subtlety Guidelines**:
- Duration: 400-800ms (not too fast, not too slow)
- Easing: ease-out or cubic-bezier for natural feel
- Distance: Small movements (20-40px max)
- Opacity: 0 to 1 transitions
- No bounces, no spins, no excessive movement
- Respect prefers-reduced-motion
- Mobile-friendly (no janky animations)

---

## Technical Approach

**Method**: Intersection Observer API + CSS Transitions
- Lightweight (no animation libraries needed)
- Excellent browser support
- Performant (GPU-accelerated CSS)
- Easy to maintain

**CSS Pattern**:
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**JavaScript Pattern**:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });
```

---

## Errors Encountered

| Error | Phase | Resolution |
|-------|-------|------------|
| - | - | - |

---

## Notes

- Keep animations subtle and professional
- Test on mobile devices for performance
- Ensure accessibility with prefers-reduced-motion
- All animations should enhance, not distract
- Consistent timing across all pages
