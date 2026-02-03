# Findings: Contact Form Query Param Pre-fill

**Last Updated:** 2026-02-03

## Project Context

This is a static multi-page website built with Vite + Tailwind CSS + Vanilla JS. The site has:
- Homepage (index.html at root)
- Multiple pages in pages/ directory
- Contact form at pages/contact.html

## Discovery Notes

### Current Contact Form Structure

**Form Element:** `#contact-form` (line 327 in contact.html)

**Message Textarea:**
- ID: `message` (line 381)
- Name attribute: `message`
- Rows: 6
- Classes: `w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-vertical`
- Placeholder: "Tell us about your requirements..."
- Required: Yes

**Other Form Fields:**
- Name input: `#name`
- Email input: `#email`

**Validation:** Already handled in main.js (lines 207-373)
- Validates on blur and submit
- Shows inline error messages
- Displays success message after submission

### Contact Links Inventory

**Total Contact Links Found:** 37 links across 6 pages

**Pages with contact links:**
- [x] index.html - 10 links (navbar x2, hero CTA, 6 product cards, footer CTA)
- [x] pages/about.html - 3 links (navbar x2, footer CTA)
- [x] pages/jaw-crusher.html - 3 links (navbar x2, product CTA)
- [x] pages/cone-crusher.html - 3 links (navbar x2, product CTA)
- [x] pages/lubricants.html - 10 links (navbar x2, 7 lubricant card CTAs, footer CTA)
- [x] pages/spare-parts-services.html - 8 links (navbar x2, 5 part cards CTAs, footer CTA)

**Link locations by type:**
1. **Navbar Desktop** (line ~200 on all pages) - "Contact Us" button
2. **Navbar Mobile** (line ~297 on all pages) - "Contact Us" button
3. **Hero CTAs** (index.html only) - "Get Started" button
4. **Product Cards** (index.html) - 6 "Learn More" buttons
5. **Lubricant Cards** (lubricants.html) - 7 "Contact for Quote" buttons
6. **Spare Parts Cards** (spare-parts-services.html) - 5 "Request Quote" buttons
7. **Product Detail CTAs** (jaw-crusher, cone-crusher) - "Contact Us" buttons
8. **Footer CTAs** (about, lubricants, spare-parts) - "Contact Us" link

**Query Params Strategy:**
- **Navbar links**: `?source=general` (default inquiry)
- **Product cards**: `?source=jaw-crusher` or `?source=cone-crusher`
- **About page**: `?source=about`

**Specific Lubricant Params** (7 types):
- `?source=lubricant-lithium-grease` - Lithium-Complex EP Grease
- `?source=lubricant-gear-oil` - Heavy-Duty Gear Oil
- `?source=lubricant-iso100` - Circulating Oil ISO 100
- `?source=lubricant-iso150` - Circulating Oil ISO 150
- `?source=lubricant-gap-control` - Gap Control Grease (MoS2)
- `?source=lubricant-high-temp` - High-Temperature EP Grease
- `?source=lubricant-impact` - Heavy-Duty Impact Grease

**Specific Spare Parts Params** (5 types):
- `?source=spare-concave` - Concave (cone crusher)
- `?source=spare-mantle` - Mantle (cone crusher)
- `?source=spare-jaw-plates` - Jaw Plates (jaw crusher)
- `?source=spare-vsi` - VSI Parts
- `?source=spare-wire-mesh` - Wire Meshes (screening)

### JavaScript Structure

**File:** `src/main.js` (504 lines)

**Existing Functions:**
- `initNavigation()` - Desktop/mobile nav
- `initSmoothScroll()` - Anchor link scrolling
- `initActiveNavState()` - Active nav on scroll
- `initProductSlider()` - Homepage product slider
- `initHeroSlider()` - Hero slider
- **`initContactForm()` - Contact form validation (lines 208-373)**
- `initPartsTabs()` - Spare parts tabs
- `initScrollAnimations()` - Intersection Observer animations
- `initProductPageSlider()` - Product page slider

**Contact Form Logic (lines 208-373):**
- Already has comprehensive validation
- Uses `getElementById()` to get form elements
- Validates name, email, message fields
- Shows success message on submit
- Clears form after submission

**Decision:** We should add our query param logic to the `initContactForm()` function, before the validation setup.

### JSON Config Design

**Proposed structure:**
```json
{
  "jaw-crusher": "I'm interested in learning more about Jaw Crusher products.",
  "cone-crusher": "I'm interested in learning more about Cone Crusher products.",
  "lubricants": "I would like information about your lubricants and related services.",
  "spare-parts": "I'm looking for spare parts and maintenance services.",
  "about": "I would like to know more about Contemporary Engineering Solutions.",
  "general": "I have a general inquiry."
}
```

**Query param format:** `?source=jaw-crusher`

### File Locations

**JSON Config:**
- Option 1: `public/contact-messages.json` (served as static asset) ✓ PREFERRED
- Option 2: `src/data/contact-messages.json` (imported as module)

**Decision:** Use `public/contact-messages.json`
- Vite serves files in `public/` as static assets at root
- Can be fetched via `/contact-messages.json`
- No need to rebuild when updating messages
- Easier to maintain for non-technical users

**JavaScript Module:**
- Option 1: Extend `src/main.js` ✓ PREFERRED
- Option 2: Create `src/contact-form.js` (cleaner separation)

**Decision:** Extend existing `initContactForm()` function in `src/main.js`
- Contact form logic already exists there (lines 208-373)
- Keep all contact-related code in one place
- No need to modify HTML imports
- Simpler architecture for this small feature

## Technical Decisions

### Query Param Parsing
Use modern URL API:
```javascript
const params = new URLSearchParams(window.location.search);
const source = params.get('source');
```

### JSON Loading
If using public/:
```javascript
fetch('/contact-messages.json')
  .then(res => res.json())
  .then(data => /* use data */)
```

If using src/:
```javascript
import messages from './data/contact-messages.json';
```

### Textarea Selection
Prefer data attribute for stability:
```html
<textarea data-contact-message id="message">
```

```javascript
const textarea = document.querySelector('[data-contact-message]');
```

## Key Insights
(To be populated as we discover)

## Challenges Found
(To be documented during implementation)

## Resources Referenced
- CLAUDE.md project instructions
- Vite documentation (if needed)
- URL API documentation (MDN)
