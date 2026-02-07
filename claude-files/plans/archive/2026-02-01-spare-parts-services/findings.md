# Findings: Spare Parts & Services Page Implementation

**Last Updated:** 2026-02-01

---

## Reference Design Analysis (Taurian MPS Spare Parts Page)

**Page Structure:**

- Hero section with product imagery and value proposition
- Breadcrumb navigation (Home > Parts & Services > Spare Parts)
- Introduction block highlighting core benefits
- Feature cards: 6 icon-based cards in 2x3 grid
- Category sections: 4 distinct product categories with imagery
- CTA section: "Ready to Optimize" with contact button
- Footer with company info, downloads, contact details, quick links

**Display Method:**

- **NOT a product catalog** - uses categorical cards instead
- Focus on equipment types: Crushers, Feeders, Washing, Screening
- Each category: image + title + descriptive paragraph
- No SKU listings or filtering on main page
- Directs to service centers for detailed inventory

**Visual Design:**

- **Typography:** Clear heading hierarchy, sans-serif body text
- **Spacing:** Generous whitespace, grid-based layouts
- **Colors:** Blue accent (#124b99), white backgrounds, grayscale imagery
- **Icons:** Custom illustrated icons for feature cards
- **Imagery:** Product photography for each category

**CTA Patterns:**

- Primary CTA: "Contact us" button (mid-page)
- Secondary: "Service Centers" link
- Footer CTAs: Phone, email, address
- WhatsApp integration for instant communication

**User Flow:**

1. Hero → understand value
2. Feature cards → grasp benefits
3. Category overview → identify relevant product area
4. Contact/Service Centers → access specific parts/pricing
5. Footer → fallback contact options

**Key Takeaway:**
Benefits-driven messaging BEFORE product details. Avoid overwhelming with product catalogs upfront.

---

## Current Project State

**Existing Pages:**

- Homepage (`index.html`): Complete with navigation, hero slider, sections, footer
- About page (`pages/about.html`): Complete with team section, values, footer
- Contact page (`pages/contact.html`): Complete with form validation, map
- Spare Parts & Services page: **NEEDS TO BE CHECKED** (may exist as placeholder)

**Brand Color System (from CLAUDE.md):**

- **Primary Purple:** `bg-primary-600` (buttons, navbar), `bg-primary-700` (hover)
- **Secondary Purple-Slate:** `bg-secondary-600` (secondary buttons)
- **Accent Gold:** `bg-accent-gold-500` (special CTAs - use sparingly)
- **Accent Teal:** `bg-accent-teal-600` (alternative actions)
- **Text:** `text-text` (body), `text-text-muted` (secondary)
- **Surfaces:** `bg-background` (page), `bg-surface` (cards), `border-border` (dividers)

**Typography:**

- Font: Poppins (Google Fonts)
- Already loaded in all pages

---

## Reusable Components

**Top Bar Structure (from index.html lines 18-61):**

- `bg-primary-600 text-white py-4`
- 3-column grid on desktop, single column on mobile
- Left: Location icon + "Kathmandu, Nepal"
- Center: Phone icon + clickable phone number (+977-9842416857)
- Right: Social media icons (Facebook, TikTok, Email)
- Icons use `hover:text-accent-gold-300` for hover state

**Navigation Structure (from index.html lines 63-162):**

- `bg-surface border-b border-border sticky top-0 z-50 shadow-sm py-2`
- Logo height: `h-28 w-auto`
- Desktop nav: horizontal menu with Products dropdown
- Mobile nav: hamburger menu with accordion for Products
- **NEW LINK NEEDED:** Spare Parts & Services should be in main navigation
- "Contact Us" button: `bg-primary-600 hover:bg-primary-700` (CTA style)

**Footer Structure (from index.html lines 648-714):**

- `bg-secondary-800 text-white pt-16 pb-8`
- Two column layout: Quick Links (left), Contact Info (right)
- Quick Links: 2x3 grid of navigation links
- Contact Info:
  - Email: cesolutions079@gmail.com
  - Phone: +977-9842416857, +977-9705516857
- Bottom bar: Copyright + social media icons

---

## Content Requirements

**Services to Highlight:**

1. **Crusher Fitting**
   - Installation and setup of all crusher types
   - Professional fitting services
   - Ensure optimal performance from day one

2. **Crusher Operation**
   - Expert operational support
   - Training for your team
   - Maximize efficiency and output

3. **Crusher Maintenance**
   - Regular maintenance schedules
   - Preventive care
   - Minimize downtime and extend equipment life

**Spare Parts to Feature:**

1. **Concave**
   - High-quality replacement concaves
   - Compatible with major crusher brands
   - Extended wear life

2. **Mantle**
   - Premium mantle replacements
   - Precision-engineered for optimal fit
   - Improved crushing efficiency

3. **Jaw Plates**
   - Durable jaw plate solutions
   - Manganese steel construction
   - Longer service intervals

4. **VSI Parts**
   - Vertical Shaft Impactor components
   - Rotor tips, anvils, and more
   - Enhanced production capacity

5. **Wire Meshes**
   - Screening media solutions
   - Various aperture sizes
   - High tensile strength

---

## Technical Decisions

**Layout Strategy:**

- Single page with two main sections: Services + Spare Parts
- Services section: 3-column grid on desktop (1 col mobile)
- Spare parts section: Grid layout (2-3 columns desktop, 1 col mobile)
- Hero section: Full-width with background image or gradient
- CTA section: Between or after main sections

**JavaScript Requirements:**

- Minimal JS needed (mostly static content)
- Possibly smooth scrolling for anchor links
- No complex interactions required
- Reuse existing navigation JS from main.js

**Imagery Needs:**

- Service icons or illustrations (3 total)
- Spare parts product photos or icons (5 total)
- Hero background image (optional)
- Could use placeholder images initially

**Responsive Breakpoints:**

- Mobile: Default (< 768px) - single column
- Tablet: `md:` (>= 768px) - 2 columns
- Desktop: `lg:` (>= 1024px) - 3 columns for services, 2-3 for parts

---

## Next Actions for Phase 1

- [ ] Check if `pages/spare-parts-services.html` exists
- [ ] Read existing page structure if it exists
- [ ] Read homepage sections for layout inspiration
- [ ] Document findings after 2 read operations (2-Action Rule)
- [ ] Mark Phase 1 complete when discovery is done
- [ ] Move to Phase 2: Page Structure & Layout

---

## Design Inspiration Notes

From Taurian MPS reference:

- ✅ Use feature cards with icons (benefits-focused)
- ✅ Categorical organization (not product listings)
- ✅ Multiple contact pathways (phone, email, contact page)
- ✅ Clean whitespace (avoid information overload)
- ✅ Professional product photography
- ❌ Don't copy their exact layout (adapt to our brand)
- ❌ Don't use breadcrumb navigation (keep it simple)
- ❌ Don't overwhelm with too many categories

---

## Questions to Resolve

- Does `pages/spare-parts-services.html` already exist?
- Do we have product images for the 5 spare parts?
- Should we add a parts inquiry form on this page, or link to contact?
- Do we want to highlight "all crusher types" explicitly?

---

## 2-Action Rule Tracking

**Read Operations Count:** 2
**Last findings.md Update:** After reading spare-parts-services.html + index.html

### Discovery Update #1: Current State + Homepage Patterns

**File: pages/spare-parts-services.html**

- Status: Minimal placeholder (only 20 lines, just h1 tag)
- Has proper head structure (Poppins font, favicon, meta tags)
- Title: "Spare Parts & Services - Contemporary Engineering Solutions"
- Needs complete rebuild like contact page

**File: index.html (lines 300-492)**

- **Feature Cards Pattern (lines 300-343):**
  - Structure: `bg-surface border border-border rounded-xl p-8`
  - Icon container: `bg-primary-100 rounded-lg w-14 h-14` with hover effect `group-hover:bg-primary-600`
  - SVG icons: `h-7 w-7 text-primary-600 group-hover:text-white`
  - Title: `text-xl font-semibold text-text mb-3`
  - Description: `text-text-muted leading-relaxed`
  - Hover effects: `hover:shadow-lg transition-all duration-200 hover:border-primary-200`
  - **Already has relevant services:**
    - "Expert Installation" (line 307) - aligns with our "Crusher Fitting"
    - "Operation & Maintenance" (line 335) - aligns with our services

- **Product Cards Pattern (lines 368-467):**
  - Structure: `bg-surface rounded-2xl shadow-xl overflow-hidden`
  - Header: Gradient background `bg-gradient-to-br from-primary-200 to-primary-300 h-48`
  - Icon: SVG centered in header
  - Content: `p-6` padding
  - Title: `text-xl font-bold text-text mb-2`
  - Badge: Various colors (gold-100, primary-100, teal-100) with rounded-full
  - Description: `text-text-muted mt-4 text-sm`
  - CTA button: `bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg`
  - Grid: `w-full md:w-1/2 lg:w-1/3` (3 columns on large screens)

### Reusable HTML Patterns Identified:

**Service Card Template:**

```html
<div
  class="bg-surface border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:border-primary-200 group"
>
  <div
    class="bg-primary-100 rounded-lg w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-200"
  >
    [SVG ICON]
  </div>
  <h3 class="text-xl font-semibold text-text mb-3">[TITLE]</h3>
  <p class="text-text-muted leading-relaxed">[DESCRIPTION]</p>
</div>
```

**Spare Part Card Template:**

```html
<div
  class="bg-surface rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
>
  <div
    class="bg-gradient-to-br from-primary-200 to-primary-300 h-48 flex items-center justify-center"
  >
    [SVG ICON or IMAGE]
  </div>
  <div class="p-6">
    <h3 class="text-xl font-bold text-text mb-2">[PART NAME]</h3>
    <span
      class="bg-[COLOR]-100 text-[COLOR]-700 text-xs font-semibold px-3 py-1 rounded-full"
      >[BADGE]</span
    >
    <p class="text-text-muted mt-4 text-sm">[DESCRIPTION]</p>
    <a
      href="/pages/contact.html"
      class="mt-4 block text-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
    >
      Request Quote
    </a>
  </div>
</div>
```

### Next Discovery Actions:

- Phase 1 is essentially complete - we know what to build
- Ready to move to Phase 2: Page Structure & Layout
