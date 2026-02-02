# Task Plan: Replace SVG Placeholders with Actual Images

**Created:** 2026-02-02
**Pattern:** Planning-with-Files (Manus)
**Status:** Phase 1 - Image Audit (pending)

## Goal

Systematically replace all SVG placeholder images across all 7 pages with actual, high-quality images appropriate for each section. Work page-by-page, identifying image needs, sourcing images, and implementing replacements while maintaining responsive design and visual consistency.

## Success Criteria

- [ ] All SVG placeholders identified across all 7 pages
- [ ] Image requirements documented for each page
- [ ] Images sourced (from reference sites or via search phrases)
- [ ] Images optimized for web (format, size)
- [ ] Images implemented with proper responsive attributes
- [ ] Alt text added for accessibility
- [ ] Visual consistency maintained across site
- [ ] All pages tested for responsive image display

## Reference Sites for Images

**Primary Sources:**
- Bee Builders: https://www.beebuilders.com.np/ (design reference, images)
- Taurian MPS: https://taurianmps.com/ (technical equipment images)

## Phases

### Phase 1: Image Audit (pending)
**Goal:** Identify all SVG placeholders across all 7 pages

**Tasks:**
- [ ] Read index.html and identify all SVG placeholders
- [ ] Read pages/about.html and identify all SVG placeholders
- [ ] Read pages/spare-parts-services.html and identify all SVG placeholders
- [ ] Read pages/lubricants.html and identify all SVG placeholders
- [ ] Read pages/contact.html and identify all SVG placeholders
- [ ] Read pages/jaw-crusher.html and identify all SVG placeholders
- [ ] Read pages/cone-crusher.html and identify all SVG placeholders
- [ ] Document all findings in findings.md (2-Action Rule: after every 2 pages)
- [ ] Review archived plans for context on each page's purpose

**Success Criteria:**
- Complete inventory of all SVG placeholders
- Understanding of what each image should represent
- Context from archived plans documented

**Status:** pending

---

### Phase 2: Homepage (index.html) Images (pending)
**Goal:** Replace all SVG placeholders on the homepage

**From archived plan context:**
- Hero section visual (right side)
- Products slider (6 crusher product images)
- Possibly service/feature icons

**Tasks:**
- [ ] List all required images for homepage
- [ ] Identify which images are available on reference sites
- [ ] Provide Google search phrases for unavailable images
- [ ] Source/download images
- [ ] Optimize images (WebP format, appropriate dimensions)
- [ ] Add images to public/ directory with descriptive names
- [ ] Replace SVG placeholders in HTML
- [ ] Add responsive srcset attributes if needed
- [ ] Add descriptive alt text
- [ ] Test responsive display (320px to 1920px)
- [ ] Document changes in progress.md

**Success Criteria:**
- All homepage SVG placeholders replaced
- Images load quickly and look professional
- Responsive design maintained
- Accessibility improved with alt text

**Status:** pending

---

### Phase 3: About Page Images (pending)
**Goal:** Replace SVG placeholders on about.html

**From archived plan context:**
- Company story section image
- Possibly team member photos (currently initials)
- Values section icons (might be SVG icons, not placeholders)

**Tasks:**
- [ ] List all required images for about page
- [ ] Identify which images are available on reference sites
- [ ] Provide Google search phrases for unavailable images
- [ ] Source/download images
- [ ] Optimize images
- [ ] Add images to public/ directory
- [ ] Replace SVG placeholders in HTML
- [ ] Add alt text
- [ ] Test responsive display
- [ ] Document changes in progress.md

**Success Criteria:**
- All about page SVG placeholders replaced
- Images tell the company story effectively
- Professional appearance maintained

**Status:** pending

---

### Phase 4: Spare Parts & Services Page Images (pending)
**Goal:** Replace SVG placeholders on spare-parts-services.html

**From archived plan context:**
- Service cards imagery (Fitting, Operation, Maintenance)
- Spare parts images (Concave, Mantle, Jaw Plates, VSI Parts, Wire Meshes)

**Tasks:**
- [ ] List all required images
- [ ] Identify which images are available on reference sites (Taurian MPS likely has parts images)
- [ ] Provide Google search phrases for unavailable images
- [ ] Source/download images
- [ ] Optimize images
- [ ] Add images to public/ directory
- [ ] Replace SVG placeholders in HTML
- [ ] Add alt text
- [ ] Test responsive display
- [ ] Document changes in progress.md

**Success Criteria:**
- All spare parts & services SVG placeholders replaced
- Images clearly show each part type
- Professional product photography maintained

**Status:** pending

---

### Phase 5: Lubricants Page Images (pending)
**Goal:** Replace SVG placeholders on lubricants.html

**Tasks:**
- [ ] List all required images
- [ ] Identify which images are available on reference sites
- [ ] Provide Google search phrases for unavailable images
- [ ] Source/download images
- [ ] Optimize images
- [ ] Add images to public/ directory
- [ ] Replace SVG placeholders in HTML
- [ ] Add alt text
- [ ] Test responsive display
- [ ] Document changes in progress.md

**Success Criteria:**
- All lubricants page SVG placeholders replaced
- Images show oil/grease products effectively

**Status:** pending

---

### Phase 6: Contact Page Images (pending)
**Goal:** Replace SVG placeholders on contact.html (if any)

**Tasks:**
- [ ] List all required images (likely minimal)
- [ ] If placeholders exist, source appropriate images
- [ ] Optimize and implement
- [ ] Test responsive display
- [ ] Document changes in progress.md

**Success Criteria:**
- All contact page SVG placeholders replaced (if any exist)

**Status:** pending

---

### Phase 7: Jaw Crusher Page Images (pending)
**Goal:** Replace SVG placeholders on jaw-crusher.html

**From archived plan context:**
- Hero section jaw crusher image
- Feature/benefit section visuals
- Specification section images (TJ and TJF models)

**Tasks:**
- [ ] List all required images
- [ ] Identify which images are available on reference sites (Bee Builders, Taurian MPS)
- [ ] Provide Google search phrases for unavailable images
- [ ] Source/download images
- [ ] Optimize images
- [ ] Add images to public/ directory
- [ ] Replace SVG placeholders in HTML
- [ ] Add alt text
- [ ] Test responsive display
- [ ] Document changes in progress.md

**Success Criteria:**
- All jaw crusher page SVG placeholders replaced
- Images accurately represent TJ and TJF models
- Technical images are clear and professional

**Status:** pending

---

### Phase 8: Cone Crusher Page Images (pending)
**Goal:** Replace SVG placeholders on cone-crusher.html

**From archived plan context:**
- Hero section cone crusher image
- Feature/benefit section visuals
- Specification section images (CG, CB, CM models)

**Tasks:**
- [ ] List all required images
- [ ] Identify which images are available on reference sites (Bee Builders, Taurian MPS)
- [ ] Provide Google search phrases for unavailable images
- [ ] Source/download images
- [ ] Optimize images
- [ ] Add images to public/ directory
- [ ] Replace SVG placeholders in HTML
- [ ] Add alt text
- [ ] Test responsive display
- [ ] Document changes in progress.md

**Success Criteria:**
- All cone crusher page SVG placeholders replaced
- Images accurately represent CG, CB, CM models
- Technical images are clear and professional

**Status:** pending

---

### Phase 9: Global Testing & Optimization (pending)
**Goal:** Test all images across all pages and optimize performance

**Tasks:**
- [ ] Run `npm run build` and check bundle size
- [ ] Test image loading performance
- [ ] Verify all images are optimized (WebP format where supported)
- [ ] Test responsive images on multiple devices
- [ ] Verify alt text on all images
- [ ] Check for any broken image links
- [ ] Test cross-browser compatibility
- [ ] Document final test results in progress.md

**Success Criteria:**
- All images load quickly (<3 seconds)
- No broken image links
- Responsive design works on all breakpoints
- Accessibility maintained (alt text)
- Production build optimized

**Status:** pending

---

### Phase 10: Delivery (pending)
**Goal:** Commit changes and archive planning files

**Tasks:**
- [ ] Final review of all changes
- [ ] Run `/review` for code quality check
- [ ] Commit changes with descriptive message
- [ ] Archive planning files to archive/2026-02-02-image-replacement/
- [ ] Verify clean git status
- [ ] Deliver to user

**Success Criteria:**
- All changes committed
- Planning files archived
- Working tree clean
- User satisfied with image replacements

**Status:** pending

---

## Workflow Per Page

For each page, follow this pattern:

1. **Identify** - Read the page HTML and list all SVG placeholders
2. **Context** - Review archived plan for that page's purpose
3. **List Requirements** - Tell user what images are needed
4. **Source Guidance** - Tell user which are on reference sites vs need Google search
5. **Implement** - Replace placeholders with actual images
6. **Test** - Verify responsive display and accessibility
7. **Document** - Update findings.md and progress.md

## Critical Rules

### 2-Action Rule
After every 2 page reads or image implementations, IMMEDIATELY update findings.md with:
- What images were found/needed
- Where they're available (reference site or search phrase)
- Any issues encountered

### Never Repeat Failures
If an image source fails (404, wrong format, etc.), track it in the Errors table and try a different source.

### Read Before Decide
Before implementing images on each page, re-read this task plan to stay oriented.

### One Phase at a Time
Keep only ONE phase status as `in_progress`. Complete it before moving to the next.

## Image Optimization Guidelines

**Format:**
- Prefer WebP for photos (better compression)
- Use PNG for logos and graphics with transparency
- Use SVG for icons (keep existing SVG icons, only replace placeholder images)

**Dimensions:**
- Hero images: 1200-1600px wide
- Product cards: 600-800px wide
- Icons/thumbnails: 200-400px wide
- Compress all images (target <200KB per image)

**Naming Convention:**
- Descriptive names: `jaw-crusher-tj-model.webp`
- Not: `image1.jpg` or `crusher.png`

**Directory:**
- All images in `public/` directory
- Organize by category if needed: `public/products/`, `public/services/`

## Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Use planning-with-files pattern | Multi-page task, multiple phases, requires systematic approach | 2026-02-02 |
| Work page-by-page | Easier to track progress, maintain focus | 2026-02-02 |
| Reference archived plans | Provides context for what each image should represent | 2026-02-02 |
| Optimize images to WebP | Better compression, faster loading | 2026-02-02 |

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| (none yet) | - | - |

## Out of Scope

- Creating custom graphics or illustrations
- Professional photography (using stock/reference images only)
- Video content
- Image galleries with lightbox functionality
- Lazy loading implementation (may add later)
- CDN setup for image delivery

## Notes

- Follow 2-Action Rule religiously (update findings.md frequently)
- Keep user informed of image requirements for each page
- Provide clear guidance: "Available on [site]" vs "Search Google for: [phrase]"
- Maintain responsive design at all breakpoints
- Ensure all images have descriptive alt text for accessibility
- Test production build after all replacements
