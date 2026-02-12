# Contemporary Engineering Solutions

Multi-page marketing website for an engineering solutions company.

## Project Type

**Static Multi-Page Website** - Business/Marketing site built with vanilla JavaScript

## Tech Stack

- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS v4 (with @tailwindcss/vite plugin)
- **JavaScript**: Vanilla JS (ES modules)
- **Font**: Google Fonts (Poppins)
- **Pages**: Home, About, Spare Parts & Services, Lubricants, Contact

## Commands

- `/plan` - Create implementation plan (task_plan.md)
- `/review` - Code review (quality, security, performance)
- `/update-context` - Save state before /clear
- `/guide` - Get pattern recommendations (Vanilla/Planning-with-Files/SuperClaude)
- `/create-skill` - Create new domain-specific skills

## Planning Conventions

**IMPORTANT:** When using planning-with-files pattern or `/plan` command:

- **Always reference** `.claude/PLANNING_FILES_GUIDE.md` for file location conventions
- Planning files MUST go in `claude-files/plans/current/`
- **Never** create `task_plan.md`, `findings.md`, or `progress.md` in project root
- Archive completed plans to `claude-files/plans/archive/YYYY-MM-DD-description/`

This ensures consistency with project file organization and enables proper session recovery.

## Skills

Generic skills available in `.claude/skills/`:

- `code-quality` - DRY, SOLID, error handling
- `testing` - Framework-agnostic test patterns
- `security` - OWASP top 10, secure coding
- `git-workflow` - Commits, branching, PRs
- `documentation` - Clear docs and comments
- `pattern-guide` - Pattern selection guidance

Skills auto-activate based on keywords in your prompts.

## Project Structure

```
contemporary-engineering-solutions/
├── index.html                    # Homepage (at root for dev server)
├── pages/
│   ├── about.html                # About page
│   ├── spare-parts-services.html # Services page
│   ├── lubricants.html           # Lubricants page
│   └── contact.html              # Contact page
├── src/
│   ├── main.js                   # Main JavaScript entry
│   └── style.css                 # Tailwind CSS styles
├── public/
│   ├── logo.png                  # Company logo
│   └── favicon.png               # Site favicon
├── vite.config.js                # Vite multi-page configuration
└── package.json                  # Dependencies
```

## Brand & Design System

### Color Palette

**Primary (Royal Purple)**
- `bg-primary-600` - Primary buttons, navbar, key CTAs
- `bg-primary-700` - Hover states for primary elements
- `bg-primary-500` - Links, active states
- `bg-primary-100` - Subtle backgrounds, selected states, tags
- `bg-primary-50` - Hero sections, feature backgrounds

**Secondary (Purple-Slate)**
- `bg-secondary-600` - Secondary buttons, less prominent CTAs
- `bg-secondary-700` - Hover states for secondary buttons
- `text-secondary-300` - Placeholder text, disabled states
- `bg-secondary-100` - Muted badges, subtle highlights

**Accent Gold** (use sparingly for high-impact moments)
- `bg-accent-gold-500` - Special CTAs, promotions, highlights
- `bg-accent-gold-600` - Hover states, icons
- `bg-accent-gold-100` - Highlight backgrounds, callout boxes

**Accent Teal** (cool alternative accent)
- `bg-accent-teal-600` - Secondary links, alternative actions
- `bg-accent-teal-100` - Info boxes, tips, alternate highlights

**Text Colors**
- `text-text` - Body copy, headings, primary content
- `text-text-muted` - Secondary info, descriptions, captions
- `text-text-light` - Placeholders, disabled text (non-essential only)

**Surfaces**
- `bg-background` - Page background (off-white)
- `bg-surface` - Cards, modals, containers (white)
- `border-border` - Dividers, input borders, card outlines

**Feedback States**
- Success: `bg-success-500`, `bg-success-100`
- Warning: `bg-warning-500`, `bg-warning-100`
- Error: `bg-error-500`, `bg-error-100`

### Color Usage Rules

- **Primary purple** for brand identity and most important actions
- **Don't overuse purple** - if everything is purple, nothing stands out
- **Gold accent** for special promotions, awards, premium features only
- **One accent per context** - don't mix gold and teal in same component
- **Maintain text hierarchy** - use `text` for primary, `text-muted` for secondary
- **Accessibility**: Primary passes WCAG AA, use gold 600+ for text contrast

### Common Component Patterns

```html
<!-- Primary button -->
<button class="bg-primary-600 hover:bg-primary-700 text-white">
  Get Started
</button>

<!-- Secondary button -->
<button class="bg-secondary-100 hover:bg-secondary-200 text-secondary-700">
  Learn More
</button>

<!-- Gold CTA (special offers only) -->
<button class="bg-accent-gold-500 hover:bg-accent-gold-600 text-white">
  Claim Offer
</button>

<!-- Card -->
<div class="bg-surface border border-border rounded-lg shadow-sm">
  <h3 class="text-text">Title</h3>
  <p class="text-text-muted">Description</p>
</div>

<!-- Badge -->
<span class="bg-primary-100 text-primary-700 text-sm px-2 py-1 rounded">
  New
</span>
```

## Coding Rules

### HTML Structure

- All HTML pages share common structure (head, fonts, favicon)
- Use semantic HTML5 elements
- Maintain consistent page structure across all pages
- Include proper meta tags for SEO and responsiveness

### Styling with Tailwind CSS

- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Keep custom CSS in `src/style.css` minimal
- Use Tailwind's configuration for theme customization

### JavaScript Organization

- Keep JavaScript modular using ES modules
- Import only what's needed on each page
- Use vanilla JS for DOM manipulation
- Avoid jQuery or heavy frameworks (keep it lightweight)

### Multi-Page Setup

- Each HTML page is configured in `vite.config.js` rollupOptions
- `index.html` stays at root for dev server
- Other pages are in the `pages/` directory
- All pages share the same CSS and can share JS modules
- To add a new page:
  1. Create `pages/new-page.html`
  2. Add entry in `vite.config.js` rollupOptions.input: `pageName: resolve(__dirname, "pages/page-name.html")`
  3. Follow the existing page template structure

### Performance Considerations

- Optimize images before adding to `public/`
- Use proper image formats (WebP for photos, PNG for logos)
- Leverage Vite's build optimization for production
- Minimize custom JavaScript (site is mostly static)

### Accessibility

- Always include alt text for images
- Maintain proper heading hierarchy (h1 → h6)
- Ensure sufficient color contrast
- Test keyboard navigation

## Build & Development

### Development Server

```bash
npm run dev
```

Starts Vite dev server with hot reload.

### Production Build

```bash
npm run build
```

Builds optimized static files to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Workflows

### Adding a New Page

1. Create `pages/page-name.html` (note: index.html stays at root, other pages in pages/)
2. Copy the HTML structure from an existing page
3. Update the `<title>` tag
4. Update the page heading content
5. Add the page to `vite.config.js`:
   ```js
   input: {
     main: resolve(__dirname, "index.html"),  // index stays at root
     // ... existing pages
     pageName: resolve(__dirname, "pages/page-name.html"),
   }
   ```
6. Run `/review` before committing

### Styling Changes

1. Use Tailwind utility classes in HTML first
2. Add custom CSS to `src/style.css` only if necessary
3. Test responsiveness at different breakpoints
4. Run `npm run build` to verify production output

### Content Updates

1. Edit HTML files directly
2. Keep consistent formatting across pages
3. Update navigation links if page structure changes
4. Run dev server to preview changes

### Feature Development

1. Run `/plan` to create task_plan.md
2. Implement following the plan
3. Test in development mode
4. Build and preview production version
5. Run `/review` before committing

## Important Notes

- **No Test Framework**: This is a static site with minimal JS, testing would be manual/visual
- **No Backend**: Pure frontend static site
- **Multi-Page App**: Each page is a separate HTML entry point (not an SPA)
- **Minimal JavaScript**: Keep JS light - this is primarily a content/marketing site
- **Shared Assets**: All pages share CSS, fonts, and JS modules
- **Build Output**: `dist/` folder contains production-ready static files

## Git Workflow

When making changes:

1. Keep commits focused on one page/feature
2. Use descriptive commit messages (e.g., "Add contact form to contact page")
3. Run `/review` before creating commits
4. Follow conventional commits format

## Hooks & Automation

The `.claude/hooks/` folder provides automation:

- **skill-activation** - Suggests relevant skills based on your prompt
- **planning-reminder** - Reminds you to plan before implementing
- **context-check** - Monitors tool calls, suggests /update-context at ~50
- **build-check** - Verifies build after edits

Hooks are configured in `.claude/settings.json`.

## Next Steps

1. Build out the placeholder pages with actual content
2. Add navigation menu across all pages
3. Implement contact form with validation
4. Add company information and services details
5. Optimize images and assets
6. Consider adding animations/transitions for polish
