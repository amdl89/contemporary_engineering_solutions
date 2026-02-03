# Task Plan: Contact Form Query Param Pre-fill

**Created:** 2026-02-03
**Status:** in_progress

## Goal

Implement query parameter-based message pre-filling for the contact form. Users arriving from different pages should see contextual pre-filled messages based on URL query params (e.g., `/contact?source=jaw-crusher` shows "I'm interested in Jaw Crusher products").

## Success Criteria

- [ ] JSON config file created with query param → message mappings
- [ ] JavaScript module reads query params and pre-fills message textarea
- [ ] All relevant links across site updated with appropriate query params
- [ ] Empty message for unknown/missing query params
- [ ] Works on page load without user interaction
- [ ] No errors in browser console

## Out of Scope

- Form validation changes
- Backend/server-side integration
- Contact form styling changes
- Email template modifications

## Phases

### Phase 1: Discovery & Planning
**Status:** complete

**Tasks:**
- [x] Read current contact.html structure
- [x] Identify contact form textarea element
- [x] Find all pages that link to contact page
- [x] List all contact link locations (navbar, footer, CTAs)
- [x] Document existing JavaScript structure
- [x] Determine JSON config file location

**Findings documented in:** findings.md
**Completed:** 2026-02-03

### Phase 2: Create JSON Config
**Status:** complete

**Tasks:**
- [x] Design JSON structure for query param mappings
- [x] Create comprehensive list of query params needed:
  - Product pages (jaw-crusher, cone-crusher)
  - Service pages (lubricants, spare-parts)
  - General inquiry
  - About page
- [x] Write messages for each query param
- [x] Save JSON config file in appropriate location
- [x] Document JSON schema in findings.md

**Files created:**
- `public/contact-messages.json` ✓
**Completed:** 2026-02-03

### Phase 3: Implement JavaScript Logic
**Status:** complete

**Tasks:**
- [x] Create new JS module or extend existing main.js
- [x] Implement URL query param parsing
- [x] Load JSON config file
- [x] Map query param to message
- [x] Pre-fill textarea on page load
- [x] Handle edge cases (no param, unknown param, malformed URL)
- [x] Test in browser console (deferred to Phase 5)

**Files modified:**
- `src/main.js` - Added query param pre-fill logic to `initContactForm()`
**Completed:** 2026-02-03

### Phase 4: Update Links Across Site
**Status:** complete

**Tasks:**
- [x] Update navbar "Contact" links with default param (SKIPPED - no query param for general contact per user request)
- [x] Update footer "Contact Us" links (SKIPPED - no query param for general contact per user request)
- [x] Update product page CTAs (jaw-crusher, cone-crusher)
- [x] Update service page CTAs (lubricants 7 products, spare-parts 5 products)
- [x] Update homepage product cards (6 crusher products)
- [x] About page has no product-specific links (SKIPPED)
- [x] Verify all updated links

**Files modified:**
- `index.html` - 6 product card links
- `pages/jaw-crusher.html` - 1 product CTA
- `pages/cone-crusher.html` - 1 product CTA
- `pages/lubricants.html` - 7 lubricant product links
- `pages/spare-parts-services.html` - 5 spare part links

**Total**: 20 query params added across site
**Completed:** 2026-02-03

### Phase 5: Testing & Verification
**Status:** in_progress

**Tasks:**
- [ ] Test each query param variant
- [ ] Verify pre-fill works on page load
- [ ] Test with no query param (empty message)
- [ ] Test with invalid query param (empty message)
- [ ] Check browser console for errors
- [ ] Test on mobile and desktop
- [ ] Verify user can still edit pre-filled message

**Test cases documented in:** progress.md

### Phase 6: Build & Review
**Status:** pending

**Tasks:**
- [ ] Run `npm run build` to verify production build
- [ ] Test production build with `npm run preview`
- [ ] Run `/review` for code quality check
- [ ] Document any issues found
- [ ] Create git commit

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Query params not parsed correctly | Medium | High | Test with multiple browsers, use URL API |
| JSON file not loaded (CORS/path) | Medium | High | Test locally, verify Vite serves public/ files |
| Textarea ID changes break logic | Low | Medium | Use data attributes or defensive querySelector |
| Pre-fill overrides user typing | Low | High | Only pre-fill on initial page load |
| Too many query params to maintain | Medium | Low | Keep JSON config centralized |

## Errors Encountered

| Error | Attempt | Resolution | Date |
|-------|---------|------------|------|
| (none yet) | - | - | - |

## Questions/Decisions

| Question | Decision | Rationale | Date |
|----------|----------|-----------|------|
| Where to store JSON config? | `public/contact-messages.json` | Vite serves public/ as static assets, no rebuild needed | 2026-02-03 |
| Create new JS module or extend main.js? | Extend `initContactForm()` in main.js | Contact logic already there, keep it together | 2026-02-03 |
| Query param naming convention? | `?source=[value]` | Descriptive (jaw-crusher, spare-parts, etc) | 2026-02-03 |

## Dependencies

- Vite build system (already configured)
- Existing contact form structure
- All site pages with contact links

## Notes

- This is a client-side only feature
- No backend changes required
- Should work with existing form validation
- User can still manually edit the pre-filled message
