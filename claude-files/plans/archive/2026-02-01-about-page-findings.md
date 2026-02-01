# Findings & Decisions

## Requirements
<!-- Captured from user request -->
- Create About page for Contemporary Engineering Solutions
- Include hero/banner section
- Company story section explaining who we are and what we do
- Our values section with 3-4 cards
- Meet the team section with 2 members (Managing Director and CEO)
- Call-to-action section linking to contact
- Footer (same as homepage)
- Use same navigation as homepage
- Maintain purple/gold color scheme from project
- Use placeholder names and bios for team members

## Research Findings

### Bee Builders About Page (https://www.beebuilders.com.np/about/)
- **Hero Section**: Orange background with decorative SVG wave dividers, includes contact info and address
- **About Section**: Background image overlay (70% black opacity), company description highlighting services
- **Company Values Section**: Three-column layout presenting core principles:
  - Quality: "High quality engineering and design define our brand"
  - Service: Customized material delivery
  - Experience: Sustainable infrastructure investment
- **Design Patterns**:
  - Color scheme: Orange accents (#f9a507), dark blue (#003b64), white text
  - Typography: Oswald for headings, Open Sans/Roboto for body
  - Responsive grid system with breakpoints
  - SVG wave dividers separating sections
  - Centered text alignment

### Taurian MPS About Page (https://taurianmps.com/about/)
- **Hero Section**: "Transforming the Future" - opening statement with company purpose
- **Company Overview**: Key metrics (founding year, global presence, dealer network)
- **20 Years Experience Section**: Narrative history with MD quote
- **Leadership Team**:
  - Four team members with photos
  - Positions and LinkedIn links
  - Minimal biographical information
  - Clean card-based layout
- **Design Patterns**:
  - Dot-pattern graphic elements as dividers
  - Card-based layout for team members
  - Image-text combinations
  - Breadcrumb navigation

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Copy navigation from index.html | Ensures identical navigation experience across pages |
| Use circular SVG avatars with initials | Professional look, easy to replace with real photos later |
| 3-4 values cards | Balances information with scannability, matches Bee Builders pattern |
| Simple hero (not full-screen) | About page should focus on content, not dramatic visuals |
| Purple/gold color scheme | Maintains brand consistency with homepage |
| Two-column team layout | Shows both leaders prominently, responsive to mobile |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
|       |            |

## Resources
- Homepage: /home/amul_dahal/Projects/contemporary-engineering-solutions/index.html
- Navigation HTML: lines 19-117 in index.html
- Footer HTML: lines 595-667 in index.html
- Color palette: src/style.css (already defined in project)
- Bee Builders reference: https://www.beebuilders.com.np/about/
- Taurian MPS reference: https://taurianmps.com/about/

## Visual/Browser Findings

### Bee Builders About Page
- Hero uses decorative wave SVG dividers (orange/blue)
- Values section: 3 cards in grid layout, each with icon and text
- Footer: Black background with social media icons
- Responsive: 3 columns desktop → 2 tablet → 1 mobile

### Taurian MPS About Page
- Team section: Photo cards with position badges
- Clean, minimal design with lots of whitespace
- Breadcrumb navigation at top
- Timeline section uses chronological cards (we won't implement this)

---
*Update this file after every 2 view/browser/search operations*
*This prevents visual information from being lost*
