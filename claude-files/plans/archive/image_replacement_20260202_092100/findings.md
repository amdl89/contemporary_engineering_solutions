# Findings: Image Replacement Task

**Task:** Replace SVG placeholders with actual images across all 7 pages
**Created:** 2026-02-02
**Last Updated:** 2026-02-02

## Overview

This document tracks discoveries, image requirements, and sourcing guidance for each page as we systematically replace SVG placeholder images.

---

## Archived Plans Context

### Pages and Their Purpose

**1. Homepage (index.html)**
- **Purpose:** Multi-section marketing homepage
- **Key Sections:** Hero, Services (6 cards), Products Slider (6 crushers), Why Choose Us, CTA, Footer
- **Reference:** Bee Builders design structure
- **Current State:** Products slider implemented, likely has SVG placeholders in hero and product images

**2. About Page (pages/about.html)**
- **Purpose:** Company story, values, team
- **Key Sections:** Hero, Company Story, Values (3-4 cards), Team (2 members), CTA, Footer
- **Current State:** Team members use initials in circular SVG avatars, company story may have image placeholder

**3. Spare Parts & Services Page (pages/spare-parts-services.html)**
- **Purpose:** Showcase services (fitting, operation, maintenance) and spare parts
- **Key Sections:** Hero, Services (3 cards), Spare Parts (5 types), CTA, Footer
- **Reference:** Taurian MPS parts page structure
- **Current State:** Likely has product/part images as placeholders

**4. Lubricants Page (pages/lubricants.html)**
- **Purpose:** Industrial lubricants offerings
- **Current State:** Unknown, need to audit

**5. Contact Page (pages/contact.html)**
- **Purpose:** Contact form and information
- **Current State:** Minimal images expected

**6. Jaw Crusher Page (pages/jaw-crusher.html)**
- **Purpose:** Detailed jaw crusher product page
- **Key Sections:** Hero, Overview, Features, Specs (TJ/TJF), Applications, Why Choose, CTA
- **Reference:** Taurian MPS TJ/TJF models
- **Current State:** Likely has crusher images in hero and specs sections

**7. Cone Crusher Page (pages/cone-crusher.html)**
- **Purpose:** Detailed cone crusher product page
- **Key Sections:** Hero, Overview, Features, Specs (CG/CB/CM), Applications, Why Choose, CTA
- **Reference:** Taurian MPS CG/CB/CM models
- **Current State:** Likely has crusher images in hero and specs sections

---

## Reference Sites for Image Sourcing

### Primary Sources

**Bee Builders** (https://www.beebuilders.com.np/)
- Design reference
- General crusher images
- Layout inspiration

**Taurian MPS** (https://taurianmps.com/)
- Technical equipment images
- Specific crusher models:
  - Jaw Crushers: TJ (https://taurianmps.com/product/crushers-jaw-tj/)
  - Jaw Crushers: TJF (https://taurianmps.com/product/crushers-jaw-tjf/)
  - Cone Crushers: CG (https://taurianmps.com/product/crushers-cone-cg/)
  - Cone Crushers: CB (https://taurianmps.com/product/crushers-cone-cb/)
  - Cone Crushers: CM (https://taurianmps.com/product/crushers-cone-cm/)
- Spare parts images: https://taurianmps.com/parts-and-services/spare-parts/

### Secondary Sources (Google Search Needed)

TBD - will document as we identify unavailable images

---

## Image Audit by Page

### 1. Homepage (index.html)

**Status:** ✅ Audited

**SVG Placeholders Found:**

1. **Hero Section Background Slider (3 slides)**
   - **Location:** Lines 310-376
   - **Current:** 3 rotating background slides with centered SVG icons
   - **Slide 1 (Lines 317-333):** Purple gradient with beaker/lab icon
   - **Slide 2 (Lines 335-357):** Gold gradient with settings/gear icon
   - **Slide 3 (Lines 359-375):** Teal gradient with shield/checkmark icon
   - **Dimensions:** Full hero section (600-800px height)
   - **Replace with:** Industrial crusher facility images, equipment in action, or construction site photos
   - **Priority:** HIGH - Hero section is first impression

2. **Products Slider - 6 Crusher Cards**
   - **Location:** Lines 711-969 (product cards)
   - **Pattern:** Each card has identical placeholder: `bg-gradient-to-br from-primary-200 to-primary-300` with centered SVG icon

   **Card 1 - PE Jaw Crusher (Lines 718-733):**
   - SVG: Beaker/lab icon in purple gradient box
   - Badge: "Popular" (gold)
   - **Replace with:** PE Jaw Crusher product image

   **Card 2 - PEX Jaw Crusher (Lines 760-776):**
   - SVG: Same beaker icon in purple gradient
   - Badge: "Fine Crushing" (purple)
   - **Replace with:** PEX Jaw Crusher product image

   **Card 3 - Mobile Jaw Crusher (Lines 804-819):**
   - SVG: Same beaker icon in purple gradient
   - Badge: "Portable" (teal)
   - **Replace with:** Mobile Jaw Crusher (track-mounted) image

   **Card 4 - Hydraulic Cone Crusher (Lines 847-863):**
   - SVG: Same beaker icon in purple gradient
   - Badge: "Best Seller" (gold)
   - **Replace with:** Hydraulic Cone Crusher product image

   **Card 5 - Spring Cone Crusher (Lines 890-906):**
   - SVG: Same beaker icon in purple gradient
   - Badge: "Reliable" (purple)
   - **Replace with:** Spring Cone Crusher product image

   **Card 6 - Multi-Cylinder Cone Crusher (Lines 934-949):**
   - SVG: Same beaker icon in purple gradient
   - Badge: "High Capacity" (teal)
   - **Replace with:** Multi-Cylinder Cone Crusher image

   - **Dimensions:** 192px height (h-48), card width responsive
   - **Priority:** HIGH - Main product showcase

**No SVG Placeholders:**
- Service/feature cards (lines 485-675) use only SVG icons (not placeholders - keep as is)
- All other sections use text and icons only

**Total SVG Placeholders on Homepage:** 9 images needed
- 3 hero background images
- 6 product images

---

### 2. About Page (pages/about.html)

**Status:** ✅ Audited

**SVG Placeholders Found:**

1. **Company Story Section Image**
   - **Location:** Lines 205-215
   - **Current:** Purple gradient square (`bg-linear-to-br from-primary-100 to-primary-200`) with building/office SVG icon
   - **Dimensions:** `aspect-square` (square), responsive
   - **Description:** "Company facility or office building" visual
   - **Replace with:** Photo of company facility, office, warehouse, or team at work
   - **Priority:** MEDIUM - Adds authenticity to company story

2. **Team Member Avatars (2 members)**
   - **Location:** Lines 297-299 (Managing Director), Lines 315-317 (CEO)
   - **Current:** Circular divs with initials "MK" and "SS"
   - **Description:** Simple text initials on purple background, NOT image placeholders
   - **Decision Needed:** Keep initials or replace with actual photos?
   - **Priority:** LOW - Initials are professional and acceptable

**No SVG Placeholders:**
- Values section cards (lines 237-275) use only SVG icons (not placeholders - keep as is)
- All other sections use text only

**Total SVG Placeholders on About Page:** 1 image needed
- 1 company story image (team photo/facility)
- Optional: 2 team member photos (if user wants to replace initials)

---

### 3. Spare Parts & Services Page (pages/spare-parts-services.html)

**Status:** ✅ Audited (Complete)

**NO Service Card Image Placeholders:**
- Service cards (Fitting, Operation, Maintenance) use only SVG icons - NOT placeholders, keep as is

**SVG Placeholders Found - 5 Spare Parts Products:**

1. **Concave** (Lines 513-529)
   - Purple gradient box with grid icon
   - For cone crushers
2. **Mantle** (Lines 561-577)
   - Purple gradient box with 3D cube icon
   - For cone crushers
3. **Jaw Plates** (Lines 609-625)
   - Purple gradient box with blocks icon
   - For jaw crushers
4. **VSI Parts** (Lines 658-674)
   - Purple gradient box with lightning bolt icon
   - For impact crushers
5. **Wire Meshes** (Lines 707-723)
   - Purple gradient box with grid icon
   - For screening

**Dimensions:** `aspect-square`, w-full md:w-1/3 for each
**Priority:** MEDIUM - Product identification images

**Total SVG Placeholders:** 5 spare parts images

---

### 4. Lubricants Page (pages/lubricants.html)

**Status:** ✅ Audited (Complete)

**SVG Placeholders Found - 7 Lubricant Products:**

**Jaw Crusher Lubricants:**
1. **Lithium-Complex EP Grease** (Lines 398-413)
   - Gold gradient box with beaker icon
2. **Heavy-Duty Gear Oil** (Lines 447-469)
   - Purple gradient box with gear icon

**Cone Crusher Lubricants:**
3. **Circulating Oil ISO 100** (Lines 521-537)
   - Teal gradient box with refresh icon
4. **Circulating Oil ISO 150** (Lines 571-587)
   - Teal gradient box with refresh icon
5. **Gap Control Grease (MoS2)** (Lines 621-637)
   - Gray/secondary gradient box with sliders icon

**Impact Crusher Lubricants:**
6. **High-Temperature EP Grease** (Lines 693-714)
   - Red/error gradient box with flame icon
7. **Heavy-Duty Impact Grease** (Lines 748-764)
   - Yellow/warning gradient box with lightning icon

**Dimensions:** `aspect-square`, w-full md:w-1/3 for each
**Priority:** MEDIUM - Product identification images

**Total SVG Placeholders:** 7 lubricant product images

---

### 5. Contact Page (pages/contact.html)

**Status:** ✅ Audited (Complete read - 400 lines)

**NO SVG Placeholders Found!**

- Hero section: Text only
- Contact form: Text inputs only
- Contact information cards: SVG icons only (not placeholders)
- Map section: Google Maps embed (not a placeholder)

**Total SVG Placeholders:** 0 images needed ✅

---

### 6. Jaw Crusher Page (pages/jaw-crusher.html)

**Status:** ✅ Audited (Partial read - 500 lines)

**NO SVG PLACEHOLDERS - Custom Diagram Instead!**

**Product Showcase Section (Lines 374-464):**
- Contains a **CUSTOM-BUILT SVG DIAGRAM** illustrating how a jaw crusher works
- This is NOT a placeholder - it's an actual technical illustration
- Shows: Base/Frame, Fixed Jaw, Moving Jaw, Feed Material, Crushed Output, Crushing Chamber, Compression Arrow
- **Decision:** KEEP THIS - it's an educational diagram, not a placeholder to replace

**Total SVG Placeholders:** 0 images needed ✅
(Custom SVG diagram is intentional and should remain)

---

### 7. Cone Crusher Page (pages/cone-crusher.html)

**Status:** ✅ Audited (Partial read - 500 lines)

**NO SVG PLACEHOLDERS - Custom Diagram Instead!**

**Product Showcase Section (Lines 374-493):**
- Contains a **CUSTOM-BUILT SVG DIAGRAM** illustrating how a cone crusher works
- This is NOT a placeholder - it's an actual technical illustration
- Shows: Outer Bowl/Concave, Inner Mantle, Central Shaft, Feed Material, Crushed Output, Gyrating Motion Arrows
- **Decision:** KEEP THIS - it's an educational diagram, not a placeholder to replace

**Total SVG Placeholders:** 0 images needed ✅
(Custom SVG diagram is intentional and should remain)

---

## Image Sourcing Guidance

### Template for Each Image

When documenting image requirements, use this format:

**Image:** [Description]
**Location:** [Page name, section name]
**Current:** [SVG placeholder code/description]
**Dimensions:** [Width x Height or "responsive"]
**Available at:** [Reference site URL or "Google search needed"]
**Search phrase:** [If Google search needed, provide phrase]
**Priority:** [High/Medium/Low]

---

## Key Discoveries

### 2026-02-02 - Initial Setup
- Created task plan with 10 phases
- Identified 7 pages to audit
- Reviewed all archived plans for context
- Documented reference sites (Bee Builders, Taurian MPS)

---

## Image Optimization Notes

### Format Decisions
- **Photos:** WebP (better compression)
- **Logos/Graphics:** PNG with transparency
- **Icons:** Keep as SVG (don't replace working icons)

### Size Guidelines
- Hero images: 1200-1600px wide, <200KB
- Product cards: 600-800px wide, <150KB
- Thumbnails: 200-400px wide, <50KB

### Naming Convention
- Descriptive: `jaw-crusher-tj-model.webp`
- Not generic: `image1.jpg`

### Directory Structure
- All in `public/`
- Consider organizing: `public/products/`, `public/services/` if many images

---

## Open Questions

1. **Team Photos:** Should we replace initials with actual photos or keep as is?
2. **Image Licensing:** Are we allowed to use images from reference sites, or should we guide user to download them?
3. **WebP Support:** Should we provide fallback formats for older browsers?
4. **Lazy Loading:** Should we implement lazy loading for performance?

**Decisions:**
- (TBD - will document as we progress)

---

## Complete Audit Summary

### ✅ AUDIT COMPLETE - Total Images Needed: 22 images

| Page | SVG Placeholders | Status | Priority |
|------|------------------|--------|----------|
| **Homepage** | 9 images (3 hero + 6 products) | ✅ Complete | HIGH |
| **About** | 1 image (company story) | ✅ Complete | MEDIUM |
| **Spare Parts** | 5 images (parts products) | ✅ Complete | MEDIUM |
| **Lubricants** | 7 images (lubricant products) | ✅ Complete | MEDIUM |
| **Contact** | 0 images | ✅ Complete | N/A |
| **Jaw Crusher** | 0 images (has custom SVG diagram) | ✅ Complete | N/A |
| **Cone Crusher** | 0 images (has custom SVG diagram) | ✅ Complete | N/A |

### Key Findings

**✅ Good News:**
1. Contact page needs NO images
2. Jaw & Cone Crusher pages have **custom technical SVG diagrams** (not placeholders) - they're educational illustrations and should STAY!
3. Most placeholders are on Homepage (highest priority)
4. All placeholders follow consistent pattern: gradient background boxes with icon overlays

**📊 Breakdown by Category:**
- **Hero/Background:** 3 images (homepage hero slider)
- **Crusher Products:** 6 images (homepage product slider)
- **Spare Parts:** 5 images (parts page)
- **Lubricants:** 7 images (lubricants page)
- **Company/About:** 1 image (about page story section)

**🎯 Next Steps:**
1. ✅ Audit complete
2. ⏳ Present findings to user with sourcing guidance
3. ⏳ Begin image sourcing and implementation phase-by-phase

---

**Remember: Update this file after every 2 read/search/implementation actions!**
