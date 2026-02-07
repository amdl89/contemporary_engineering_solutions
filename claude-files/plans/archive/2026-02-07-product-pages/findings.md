# Findings: Lubricants Page Redesign Research

**Last Updated**: 2026-02-07

---

## Current Page Analysis

### Existing Structure
- **Current Layout**: Single-page with 3 main sections:
  1. Jaw Crusher Lubricants (2 products)
  2. Cone Crusher Lubricants (3 products)
  3. Impact Crusher Lubricants (2 products)

- **Total Products**: 7 lubricant products currently displayed
- **Hero Section**: Focus on crusher performance and ROI
- **Benefits Section**: 4 key benefits with icons
- **CTA Section**: Technical consultation offer

### Existing Images
Located in `/images/` directory:
- `jaw_grease.png` - Lithium-Complex EP Grease
- `jaw_gear_oil.jpg` - Heavy-Duty Gear Oil
- `cone_circulating_100.webp` - ISO 100 Circulating Oil
- `cone_circulating_150.jpg` - ISO 150 Circulating Oil
- `cone_gap_grease.jpg` - Gap Control Grease
- `impact_ht_grease.png` - High-Temperature EP Grease
- `impact_heavy_grease.webp` - Heavy-Duty Impact Grease

### Existing Contact Query Params
- `?source=lubricant-lithium-grease`
- `?source=lubricant-gear-oil`
- `?source=lubricant-iso100`
- `?source=lubricant-iso150`
- `?source=lubricant-gap-control`
- `?source=lubricant-high-temp`
- `?source=lubricant-impact`

---

## Required Reorganization

### New Tab Structure

#### Tab 1: Crusher & Construction (Primary Focus)
Need to reorganize existing content + add new sections:

**Equipment Sections Required**:
1. ✅ **Jaw Crusher** - Already exists (2 products)
2. ✅ **Cone Crusher** - Already exists (3 products)
3. ⚠️ **Vertical Shaft Impactors (VSI)** - NEW (need content)
4. ⚠️ **Horizontal Shaft Impactors (HSI)** - NEW (currently "Impact Crusher" section exists with 2 products)
5. ⚠️ **Screen** - NEW (need content)
6. ⚠️ **Conveyor Bearing & Gearbox** - NEW (need content)

**Content Status**:
- Jaw Crusher: ✅ Complete
- Cone Crusher: ✅ Complete
- HSI: ⚠️ Can repurpose existing "Impact Crusher" section
- VSI: ❌ Need research
- Screen: ❌ Need research
- Conveyor: ❌ Need research

#### Tab 2: Cement
- Status: Placeholder content
- Message: "Coming Soon - Industrial lubricants for cement manufacturing equipment"

#### Tab 3: Food & Pharmaceuticals
- Status: Placeholder content
- Message: "Coming Soon - Food-grade lubricants meeting FDA and NSF standards"

#### Tab 4: Steel
- Status: Placeholder content
- Message: "Coming Soon - High-temperature lubricants for steel production equipment"

---

## Web Research for Missing Content

### Research Target: VSI (Vertical Shaft Impactors) Lubricants

**What is VSI?**
- High-speed rotor (900-1500 RPM) that throws rock against stationary anvils
- Used for producing fine aggregates and manufactured sand
- Key lubrication points: rotor bearings, drive system
- Operating temperatures: 80°C to ≥120°C

**Lubricant Requirements** (Researched 2026-02-07):
- High-speed bearing grease (NLGI 3 for vertical bearings)
- ISO100 base oil for manual lubrication
- Excellent adhesion properties (lithium-complex thickener)
- Shock load and vibration absorption
- Thin oil lubrication systems for continuous operation

**Product Recommendations**:
1. **High-Speed Vertical Bearing Grease**
   - NLGI Grade 3 (thick soap base, thin base oil)
   - ISO100 base oil equivalent (Shell Gadus S2-V100-3 or equivalent)
   - Lithium-complex thickener for superior adhesion
   - Specially designed for vertically-mounted bearings
   - Absorbs shock loads and high-speed vibration
   - Application: 10g per 8-hour shift per bearing
   - Temperature range: Handles 80-120°C operating conditions

2. **Thin Oil Circulation System**
   - 35# bearing oil specification
   - Capacity: 150-190L
   - Change interval: 200 hours initial, then every 1000 hours
   - Provides excellent bearing work environment
   - Suitable for 24/7 operations
   - Higher stability and longer service life

**Sources**: [Beruplex LIEP 3 VSI Lubrication](https://www.bechemindia.com/enhancing-operational-reliability-of-vertical-shaft-impactor-vsi-crushers-with-effective-lubrication/), [VSI Bearing Lifespan](https://pilotcrushtec.com/how-to-prolong-the-lifespan-of-your-vsi-crusher-bearings/)

---

### Research Target: HSI (Horizontal Shaft Impactors) Lubricants

**What is HSI?**
- Horizontal rotor with blow bars
- Impact crushing for soft to medium-hard materials
- Lower speed than VSI (400-1200 RPM)

**Current Content**: We already have "Impact Crusher" section with 2 products:
- High-Temperature EP Grease
- Heavy-Duty Impact Grease

**Action**: ✅ Rename "Impact Crusher" section to "Horizontal Shaft Impactors (HSI)" and keep existing content

---

### Research Target: Screen Lubricants

**What are Screens?**
- Vibrating screens separate aggregates by size
- Key components: eccentric shaft, bearings, vibration motors (exciter)
- High vibration and oscillating motion environment
- May operate in wet conditions

**Lubricant Requirements** (Researched 2026-02-07):
- Vibration and oscillating motion resistant
- Water-resistant (wet screening applications)
- Excellent adhesion properties
- High load and temperature resistance
- Application: 60-80g every 24 hours during production

**Product Recommendations**:
1. **Premium Vibration-Resistant Grease (VIB3 Type)**
   - Mineral-based with polycarbamide thickener
   - Excellent resistance to high temperatures and loads
   - Specifically formulated for oscillating motion
   - Suitable for ball and rolling bearings
   - Application: Fill bearing space 1/3 to 2/3 (never overfill)
   - Prevents bearing overheating
   - Water washout resistance for wet screening

2. **Exciter Bearing Grease**
   - Universal grease for construction machinery (MULTITOP type)
   - Suitable for vibrating screen exciters
   - Maintenance interval: Every 3-5 months
   - High mechanical stability under continuous vibration
   - Temperature range: Handles mining/aggregate conditions
   - Application: Regular refilling according to operating conditions

**Sources**: [Vibrating Screen Lubrication Methods](https://www.hsd-industry.com/news/vibrating-screen-lubrication-method/), [Interflon Screen Bearing Lubrication](https://interflon.com/cases/lubrication-of-vibrating-screenshield-bearings), [Dropsa Mobile Screen Lubrication](https://www.dropsa.com/en/mining-construction/mobile-screens)

---

### Research Target: Conveyor Bearing & Gearbox Lubricants

**What are Conveyors?**
- Belt conveyors transport materials over distances
- Key components: idler roller bearings, drive gearboxes, tail pulleys
- Operate in demanding environments (dust, moisture, temperature extremes)
- Critical for continuous material flow

**Lubricant Requirements** (Researched 2026-02-07):

**For Idler Bearings**:
- Lithium-based grease with labyrinth seals
- Proper lubrication amount (calculate per manufacturer guidance)
- Water-resistant for outdoor operations
- Must prevent both under and over-lubrication
- Sound monitoring (decibel intensity) indicates proper fill level

**For Gearboxes**:
- ISO viscosity grade selection based on operating temperature
- Viscosity determines film thickness and heat dissipation
- Common grades: ISO VG 150, VG 220, VG 320, VG 460
- Temperature management: Every 10°C reduction significantly extends life
- Splash lubrication systems maintain oil at drive midline

**Product Recommendations**:
1. **Heavy-Duty Idler Bearing Grease**
   - Lithium-based formulation
   - Labyrinth seal compatible
   - Temperature range: -30°C to +130°C
   - Water spray-off resistance
   - Application: Per manufacturer specification (avoid over-lubrication)
   - Sound-guided filling technique
   - Extended service intervals in sealed bearings

2. **Industrial Conveyor Gearbox Oil**
   - ISO VG 220-320 (most common for conveyors)
   - AGMA Grade 4-5 equivalent
   - EP additives for load-carrying capacity
   - Oxidation and rust inhibitors
   - Change interval: Temperature-dependent (cooler = longer life)
   - Splash lubrication compatible
   - Film thickness: Critical for bearing protection
   - Viscosity at 40°C determines proper grade selection

**Sources**: [TANHON Gearbox Lubrication](https://tanhon.com/lubrication-requirements-for-industrial-gearboxes/), [Conveyor Idler Bearing Guide](https://www.gramconveyor.com/conveyor-idler-bearing/), [Belt Conveyor Lubrication Art & Science](https://machinerylubricationindia.com/magazine/2017/mar-apr/art-and-science-of-belt-conveyor-lubrication/), [Regal Rexnord Gear Drive Maintenance](https://www.regalrexnord.com/regal-rexnord-insights/oil-maintenance-for-gear-drives)

---

## UI/UX Design Research

### Tab Navigation Patterns

**Option 1: Horizontal Tabs (Recommended)**
```
[Crusher & Construction] [Cement] [Food & Pharma] [Steel]
─────────────────────────────────────────────────────
[Tab Content]
```

**Pros**:
- Familiar pattern
- Easy to implement
- Mobile-friendly (can stack vertically)
- Clear visual separation

**Option 2: Dropdown Select (Alternative for mobile)**
- Use tabs on desktop
- Convert to `<select>` dropdown on mobile
- Better space efficiency on small screens

**Decision**: Use horizontal tabs that stack on mobile

### Tab Interaction Design

**Active Tab Styling**:
- Background: `bg-primary-600`
- Text: `text-white`
- Border: Bottom border or full background
- Transition: Smooth color fade

**Inactive Tab Styling**:
- Background: `bg-secondary-100` or `bg-transparent`
- Text: `text-text`
- Hover: `hover:bg-primary-100`

**Tab Panel**:
- Background: `bg-surface`
- Border: `border border-border`
- Padding: Generous padding for content breathing room
- Animation: Fade in/out or slide transition

### Accessibility Considerations

**ARIA Attributes Required**:
```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Content</div>
```

**Keyboard Navigation**:
- Arrow Left/Right: Navigate between tabs
- Home/End: First/Last tab
- Enter/Space: Activate tab

---

## Content Structure per Section

### Standard Product Card Format

```
┌─────────────────────────────────────┐
│  [Image]    │  Title + Badge         │
│  (1/3)      │  Description text      │
│             │  [Request Quote CTA]   │
└─────────────────────────────────────┘
```

**Elements**:
1. **Image**: Product photo or representative image (left side, 1/3 width)
2. **Title**: Product name (e.g., "Synthetic High-Speed Bearing Grease")
3. **Badge**: Category tag (e.g., "Premium Grade", "Industrial Grade")
4. **Description**: Technical specs and benefits (2-3 sentences)
5. **CTA**: "Request Quote" button with query param

### Section Header Format

```
┌──────────────────────────┐
│  Section Title (h2)      │
│  Description paragraph   │
└──────────────────────────┘
```

---

## Image Inventory & Placeholder Strategy

### Existing Images (Can Reuse)
- ✅ Jaw Crusher: 2 images available
- ✅ Cone Crusher: 3 images available
- ✅ HSI (Impact): 2 images available

### New Images Needed
- ❌ VSI: 2 placeholder images needed
- ❌ Screen: 2 placeholder images needed
- ❌ Conveyor: 2 placeholder images needed

**Placeholder Strategy**:
1. Use generic industrial lubricant images
2. Create colored placeholders with text overlays
3. Use icon-based visual representations
4. **Recommendation**: Use actual product images if available, otherwise use generic grease/oil images with appropriate equipment labels

**Placeholder Naming Convention**:
- `/images/vsi_grease_placeholder.jpg`
- `/images/vsi_oil_placeholder.jpg`
- `/images/screen_grease_placeholder.jpg`
- `/images/screen_motor_grease_placeholder.jpg`
- `/images/conveyor_bearing_grease_placeholder.jpg`
- `/images/conveyor_gear_oil_placeholder.jpg`

---

## JavaScript Tab Logic

### State Management

```javascript
// Simple state object
const tabState = {
  activeTab: 'crusher-construction', // default
  tabs: ['crusher-construction', 'cement', 'food-pharma', 'steel']
};

// Functions needed:
- initTabs(): Set up event listeners and initial state
- switchTab(tabId): Hide all panels, show selected panel
- updateTabUI(tabId): Update active/inactive tab styles
- handleKeyboard(event): Arrow key navigation
```

### URL Hash Routing (Optional)

```javascript
// Support URLs like: /pages/lubricants.html#cement
- Read hash on page load
- Update hash when tab switches
- Allow direct linking to specific tabs
```

---

## SEO Updates

### Current Meta Description
```
"Premium crusher lubricants, industrial oils, and greases for extended equipment life, reduced downtime, and optimal performance in crushing operations."
```

### New Meta Description (Proposed)
```
"Industrial lubricants for crusher, cement, food processing, and steel manufacturing equipment. Premium oils and greases for extended equipment life and reduced downtime across all industries."
```

### Page Title Update
```
Current: "Industrial Lubricants - C.E. Solutions"
Proposed: "Industrial Lubricants - Multi-Industry Solutions | C.E. Solutions"
```

---

## Technical Specifications Summary

### Content Completed
- [x] Current page structure analyzed
- [x] Existing images inventoried
- [x] Tab structure defined
- [x] VSI lubricant content researched
- [ ] HSI content mapped (reuse existing)
- [x] Screen lubricant content researched
- [x] Conveyor lubricant content researched
- [x] UI/UX design pattern selected
- [x] Accessibility requirements defined
- [x] Placeholder strategy defined

### Next Steps
1. Begin HTML structure implementation (Phase 3)
2. Create product content for new sections
3. Implement tab JavaScript
4. Style with Tailwind CSS

---

## Questions/Decisions Needed

1. ✅ **Tab Behavior on Mobile**: Stack vertically or use dropdown?
   - **Decision**: Stack vertically for simplicity

2. ✅ **URL Hash Routing**: Include or skip?
   - **Decision**: Include for better UX and direct linking

3. ⚠️ **Placeholder Images**: Use generic images or wait for actual products?
   - **Pending**: Will use generic images with equipment type labels

4. ✅ **Hero Section**: Keep crusher-focused or make generic?
   - **Decision**: Update to be multi-industry focused

---

## Resources & References

- NLGI Grease Guide: https://www.nlgi.org/
- ISO Viscosity Standards: https://www.machinerylubrication.com/
- Conveyor Bearing Lubrication Best Practices
- Vibrating Screen Maintenance Guidelines
- Impact Crusher vs VSI Differences


---
---

# TASK 2: Homepage Product Carousel Research

**Research Date**: 2026-02-07

## Equipment Research Summary

### 1. Vertical Shaft Impactor (VSI)

**Primary Applications**:
- Production of cubical aggregate for concrete, asphalt and base mixtures
- Fine crushing particularly for abrasive materials
- Manufacturing sand production
- Quarries, gravel plants, recycling operations

**Key Features**:
- High-speed rotor and anvils for impact crushing
- Produces consistent cubical shape material
- Less noise and dust compared to other crushers
- Excellent for Superpave highway asphalt applications

**Specifications**:
- Feed size: Normally <5 inches (up to 12 inches for large VSIs)
- Capacity: Up to 1000 TPH (maximum), typically 500 TPH
- Centrifugal force acceleration against outer anvil ring

**Sources**: [Stedman VSI Primer](https://www.stedman-machine.com/vsi-primer-article.html), [Zenith VSI](https://www.zenithcrusher.com/en/news/market/vertical-shaft-impact-crusher.html), [911 Metallurgist VSI](https://www.911metallurgist.com/blog/vsi-crusher-vertical-shaft-impactor/)

---

### 2. Horizontal Shaft Impactor (HSI)

**Primary Applications**:
- Demolition and aggregate recycling
- Concrete and asphalt recycling
- Road base material production
- Processing glass and bricks
- Aggregate, mining, recycling industries

**Key Features**:
- Produces cubically-shaped material
- Handles larger feed sizes (up to 40"/1,000mm)
- High production volume with ultra-high reduction ratios
- Blow bars spinning rapidly on rotor toss rocks against steel curtains
- Hydraulically-designed components for easy adjustment

**Specifications**:
- Feed size: Up to 40 inches (1,000mm)
- Three or four-bar configurations available
- 30% more uptime and 25% more production than competitors

**Sources**: [Superior Sentry HSI](https://superior-ind.com/products/crushing-equipment/sentry-horizontal-shaft-impactor-hsi/), [Stedman Mega-Slam](https://www.stedman-machine.com/mega-slam-impactors.html), [Astec HSI](https://www.astecindustries.com/products/details/horizontal-shaft-impactors)

---

### 3. Roll Crusher (Double Roll)

**Primary Applications**:
- Secondary or tertiary crushing
- ROM coal with refuse, limestone, gypsum, trona, shale
- Bauxite, oil shale, clean coal, coke, salt, quicklime
- Handling wet, sticky feeds
- Soft to medium-hard ore processing

**Key Features**:
- High capacity, low headroom requirements
- Low horsepower consumption (15-25% less than hammer crushers)
- Handles wet, sticky, frozen feeds
- Produces cubical product with minimum fines
- Significantly less dust and noise generation

**Specifications**:
- Crushing strength: Up to 150-160 MPa
- Reduction ratio: 4:1
- Throughput: Up to 14,000 TPH (FLS models)
- Capacity range: 5-300 metric tons/hour depending on model
- Powered by electric motors with V-belt drive

**Sources**: [FLS Roll Crushers](https://fls.com/en/equipment/crushing/roll-crushers), [McLanahan Double Roll](https://www.mclanahan.com/products/double-roll-crushers), [DOVE Roll Crushers](https://dovemining.com/double-roll-crushers/)

---

### 4. Bucket Classifier / Spiral Classifier

**Primary Applications**:
- Form closed-circuit cycle with ball mills
- Classify ore sand and fine mud in gravity plants
- Desliming and dehydration operations
- Metal beneficiation processes
- Separate coarse and fine particles

**Key Features**:
- Uses rotating screw for mechanical discharge
- Simple structure, reliable operation
- Large processing capacity
- Stable classification area
- High classification efficiency (90% recovery rate)

**Specifications**:
- Types: High Weir Type (0.83-0.15mm), Submerged Type (0.15-0.07mm)
- Material recovery: About 90%
- Three main types: high dam, low dam, submerged

**Applications by Type**:
- High Weir: Coarser particles (0.83mm-0.15mm overflow)
- Submerged: Fine particles (0.15mm-0.07mm overflow)

**Sources**: [Mining Pedia Spiral Classifier](https://www.miningpedia.cn/dressing/what-is-spiral-classifier-in-mineral-processing.html), [JXSC Spiral Classifier](https://www.jxscmineral.com/equipment/spiral-classifier/), [DOVE Spiral Classifiers](https://dovemining.com/spiral-classifiers-screw-classifiers/)

---

### 5. Hydro Cyclone

**Primary Applications**:
- Classification of fine particles
- Dewatering of slurries
- Metallurgical and mineral processing
- Density separation
- Size-based particle separation

**Key Features**:
- No moving parts (simplistic design)
- Uses centrifugal force to accelerate settling
- Separates by size, shape, and specific gravity
- Consists of inlet, vortex finder, cylindrical section, conical section, underflow spigot, overflow pipe

**Specifications**:
- Apex diameter: 0.1-0.2 times cyclone diameter
- Optimal solids concentration: 15-30% by volume
- Cone angle and vortex finder are critical design parameters
- Separation size depends on cyclone diameter, pressure, particle characteristics

**Operating Principles**:
- Pressure created by centrifugal pump or hydrostatic head
- Generates centrifugal force and flow patterns
- Particles separate based on size and density

**Sources**: [Multotec Hydrocyclone](https://www.multotec.com/en/hydrocyclone-separator), [911 Metallurgist Hydrocyclone](https://www.911metallurgist.com/blog/hydrocyclone-workingprinciple/), [McLanahan Hydrocyclones](https://www.mclanahan.com/products/hydrocyclones)

---

### 6. Screw Classifier / Spiral Classifier

**Primary Applications**:
- Closed circuit wet classification
- Separation of slimes (fines) from sandy (coarse) material
- Sizing and washing applications
- Dewatering sand or crushed material
- Separating mud from sand

**Key Features**:
- Highly efficient classification
- Two main types: High Weir (coarse feed) and Submerged Spiral (fine sand)
- Simple, robust design
- Effective dewatering capability
- Available in single or dual screw configurations

**Specifications**:
- Processing capacity: 30-240 m³/h
- Diameter: 0.5-2 meters
- Motor power: 5-50 kilowatts
- 15 models total (10 single screw, 5 dual screw)

**Operating Principles**:
- Longer length = higher degree of dewatering
- Greater diameter screw = higher capacity at same speed
- Reduced screw speed for fine material dewatering

**Sources**: [DOVE Screw Classifiers](https://dovemining.com/spiral-classifiers-screw-classifiers/), [LZZG Spiral Classifier](https://www.lzzgmachine.com/news/longzhong-news/spiral-classifier-with-high-efficiency-and-small-footprint.html), [JXSC Spiral Classifier](https://www.jxscmachine.com/classifying/spiral-classifier/)

---

## Content Summary for Homepage Cards

### Existing Equipment (With Images)

**1. Jaw Crusher**
- Title: "Jaw Crusher"
- Description: "Primary compression crusher for hard rock and ore. High capacity with simple, reliable design for quarry and mining operations."
- Key Features: Primary crushing, compression-based, high capacity

**2. Cone Crusher**
- Title: "Cone Crusher"  
- Description: "Secondary and tertiary crusher for medium to hard materials. Superior product shape and high reduction ratios for aggregate production."
- Key Features: Secondary/tertiary crushing, high reduction, precise sizing

**3. Vibrating Screen**
- Title: "Vibrating Screen"
- Description: "High-efficiency screening for material separation by size. Robust design handles heavy-duty applications in mining and aggregate plants."
- Key Features: Size classification, high capacity, durable construction

### New Equipment (Need SVG Icons)

**4. Vertical Shaft Impactor (VSI)**
- Title: "Vertical Shaft Impactor"
- Description: "High-speed impact crusher producing premium cubical aggregate. Ideal for manufactured sand and Superpave asphalt applications."
- Key Features: Cubical product, manufactured sand, low fines

**5. Horizontal Shaft Impactor (HSI)**
- Title: "Horizontal Shaft Impactor"
- Description: "Heavy-duty impact crusher for recycling and aggregate production. Processes large feed sizes with exceptional reduction ratios."
- Key Features: Recycling applications, large feed acceptance, high reduction

**6. Roll Crusher**
- Title: "Roll Crusher"
- Description: "Compression crusher for soft to medium-hard materials. Low power consumption with excellent performance on sticky feeds."
- Key Features: Low horsepower, wet/sticky feeds, minimal fines

**7. Bucket Classifier**
- Title: "Spiral Classifier"
- Description: "Gravity separation for coarse and fine particles. Forms closed circuits with mills for efficient ore classification and dewatering."
- Key Features: Particle separation, dewatering, high efficiency

**8. Hydro Cyclone**
- Title: "Hydro Cyclone"
- Description: "Centrifugal separator for fine particle classification. No moving parts ensure reliable slurry separation in mineral processing."
- Key Features: Fine classification, dewatering, no moving parts

**9. Screw Classifier**
- Title: "Screw Classifier"
- Description: "Mechanical classifier for sand washing and dewatering. Robust screw design provides continuous separation of coarse and fine materials."
- Key Features: Sand washing, dewatering, continuous operation

---

## SVG Icon Design Guidelines

For the 6 equipment types without photos, create simple line-based SVG icons:

1. **VSI**: Vertical drum/cylinder with circular motion arrows
2. **HSI**: Horizontal drum with impact bars and directional arrows
3. **Roll Crusher**: Two parallel cylinders/rolls with gap between
4. **Spiral Classifier**: Inclined spiral/helix shape in tank
5. **Hydro Cyclone**: Conical funnel shape with swirl pattern
6. **Screw Classifier**: Angled screw/auger in trough

**Style**: Minimalist line art, 2-3px stroke width, use `text-primary-600` for color consistency

---
---

# TASK 3: Product Pages Development Research

**Research Date**: 2026-02-07

## Product Page Structure Analysis

### Existing Page Template (from jaw-crusher.html)

**Common Sections:**
1. **Top Bar** - Location, phone, social media (purple bg, hidden on mobile)
2. **Navigation** - Logo, menu with Products dropdown, sticky nav
3. **Hero Section** - Product name, tagline, 3 key specs with checkmarks (gradient purple bg)
4. **Product Image Slider** - 2+ images with captions, prev/next controls
5. **Overview Section** - 3 paragraphs: Role, How It Works, Key Applications
6. **Key Features Section** - 6 feature cards with icons, title, description
7. **Why Choose Section** - 3 benefits with large icons (purple gradient bg)
8. **CTA Section** - Heading, description, 2 CTA buttons (purple bg, gold button)
9. **Footer** - Quick links (2 cols), Contact info, social media

**CSS Patterns:**
- Hero: `bg-gradient-to-br from-primary-50 to-primary-100`
- Feature cards: `bg-surface rounded-2xl p-6 shadow-lg`
- Icon backgrounds: `bg-accent-gold-100` with `text-accent-gold-600` icons
- CTA button: `bg-accent-gold-500 hover:bg-accent-gold-600`
- Query param: `?source=jaw-crusher` format

**JavaScript:**
- Product image slider functionality
- Dropdown menu interactions
- Scroll animations (fade-in-scroll, slide-up-scroll)

---

## 1. Vibrating Screen - Detailed Research

**Primary Applications:**
- Screening ore, sand, gravel, and aggregates by size
- Mining, quarrying, building materials operations
- Material separation in crushing plants
- Size classification from fine to coarse materials
- Dewatering applications

**Technical Specifications:**
- **Capacity Range**: 8-1300 TPH (tons per hour)
- **Feed Size**: Up to 400-700mm maximum
- **Screen Width**: 1200-3000mm (4'-10' typical)
- **Screen Length**: 3000-7300mm (10'-24' typical, 2.5-3x width)
- **Layers**: 1-4 deck configurations available
- **Motion Type**: Circular trajectory (circular vibratory screen)
- **Screen Opening Range**: From fine mesh to 100mm+ openings

**Key Features:**
1. **Multi-Deck Configuration** - 1-4 layers for simultaneous size separation, producing multiple size fractions in single pass
2. **Circular Motion** - Eccentric drive produces circular trajectory for efficient material stratification and discharge
3. **High Capacity** - Wide screens (up to 3000mm) handle 8-1300 TPH with excellent efficiency
4. **Adjustable Parameters** - Variable amplitude, frequency, and inclination angle optimize screening for different materials

**Operating Principles:**
- Eccentric shaft or unbalanced motor creates circular vibration
- Material stratifies by size as it travels along inclined screen surface
- Smaller particles pass through screen openings (undersize)
- Larger particles discharge at end of screen (oversize)
- Multiple decks allow production of 2-5 size fractions simultaneously

**Industries Served:**
- Aggregate and crushed stone operations
- Hard rock mining and mineral processing
- Sand and gravel washing plants
- Coal preparation facilities
- Recycling operations (C&D, asphalt, concrete)

**Advantages:**
- High screening efficiency (90-98% depending on material)
- Robust construction handles heavy-duty applications
- Low maintenance requirements with sealed bearings
- Can handle wet, sticky, or difficult materials
- Replaceable screen media extends service life
- Large processing capacity per square foot of screen area

**Sources**:
- [Eastman Vibrating Screen](https://www.eastmancrushing.com/conveying-screening/vibrating-screen/)
- [DOVE Circular Vibrating Screens](https://dovemining.com/vibrating-screens/)
- [Zenith 6 Types Vibrating Screen](https://m.zenithcrusher.com/article/6-types-vibrating-screen.html)
- [MEKA Vibrating Screen Capacity Calculations](https://www.mekaglobal.com/en/blog/vibrating-screen-capacity-calculations)

---

## Product Page Content Summary

All equipment now has complete research for product pages:

### 1. Vibrating Screen (NEW RESEARCH)
- **Hero Title**: "Vibrating Screen"
- **Tagline**: "High-Capacity Material Separation for Aggregate and Mining Operations"
- **3 Key Specs**:
  - Multi-Deck Configuration (1-4 layers)
  - Capacity up to 1300 TPH
  - Feed Size up to 700mm
- **Overview**: Role (size classification), How It Works (circular motion stratification), Applications (mining, aggregate, recycling)
- **6 Features**: Multi-deck, circular motion, high capacity, adjustable parameters, robust construction, replaceable media
- **3 Benefits**: Efficient screening (90-98%), versatile applications, low maintenance

### 2. Vertical Shaft Impactor (VSI) (REUSE FROM TASK 2)
- **Hero Title**: "Vertical Shaft Impactor (VSI)"
- **Tagline**: "Premium Cubical Aggregate Production for Manufactured Sand and Asphalt"
- **3 Key Specs**:
  - High-speed rotor (900-1500 RPM)
  - Cubical shaped product
  - Capacity up to 1000 TPH
- **6 Features**: High-speed impact, cubical product shape, low noise/dust, autogenous crushing, adjustable rotor, wear-resistant materials

### 3. Horizontal Shaft Impactor (HSI) (REUSE FROM TASK 2)
- **Hero Title**: "Horizontal Shaft Impactor (HSI)"
- **Tagline**: "Heavy-Duty Impact Crushing for Recycling and Aggregate Production"
- **3 Key Specs**:
  - Large feed acceptance (up to 1000mm)
  - High reduction ratios
  - Capacity up to 1300 TPH
- **6 Features**: Large feed size, adjustable blow bars, hydraulic opening, high production, recycling capability, cubical product

### 4. Roll Crusher (REUSE FROM TASK 2)
- **Hero Title**: "Roll Crusher"
- **Tagline**: "Compression Crushing for Soft to Medium-Hard Materials"
- **3 Key Specs**:
  - Low power consumption (15-25% less)
  - Handles wet/sticky feeds
  - Capacity up to 14,000 TPH (large models)
- **6 Features**: Low horsepower, wet feed handling, minimal fines, cubical product, low dust/noise, overload protection

### 5. Spiral Classifier (REUSE FROM TASK 2)
- **Hero Title**: "Spiral Classifier"
- **Tagline**: "Gravity Separation for Ore Classification and Dewatering"
- **3 Key Specs**:
  - High classification efficiency (90%)
  - Closed-circuit with ball mills
  - Capacity 30-240 m³/h
- **6 Features**: High efficiency, simple structure, dewatering capability, high/low weir options, reliable operation, large capacity

### 6. Hydro Cyclone (REUSE FROM TASK 2)
- **Hero Title**: "Hydro Cyclone"
- **Tagline**: "Centrifugal Separator for Fine Particle Classification"
- **3 Key Specs**:
  - No moving parts
  - Fine particle separation
  - Optimal solids 15-30% by volume
- **6 Features**: No moving parts, centrifugal force, size/density separation, adjustable parameters, low maintenance, high throughput

### 7. Screw Classifier (REUSE FROM TASK 2)
- **Hero Title**: "Screw Classifier"
- **Tagline**: "Mechanical Classifier for Sand Washing and Dewatering"
- **3 Key Specs**:
  - Continuous operation
  - Processing capacity 30-240 m³/h
  - Single or dual screw configurations
- **6 Features**: Continuous separation, sand washing, dewatering, simple design, high efficiency, adjustable screw speed

---

## SVG Placeholder Design (for Product Pages)

Need larger hero section SVGs (400x300px) for product pages, expanding on carousel icons:

### 1. Vibrating Screen SVG
```
- Rectangular frame with multiple horizontal decks
- Zigzag material flow path
- Spring mounts at corners
- Exciter motor on side
- Material input/output arrows
- Colors: primary-600 for frame, accent-gold-600 for motion lines
```

### 2. VSI SVG (expand carousel icon)
```
- Vertical cylindrical chamber
- Central rotor with 3-4 arms
- Anvil ring around perimeter
- Material input from top
- Circular motion arrows
- Colors: primary-600 for structure, accent-teal-600 for motion
```

### 3. HSI SVG (expand carousel icon)
```
- Horizontal rectangular chamber
- Rotor with blow bars
- Curtain liners on sides
- Material flow arrows (in from top, out from bottom)
- Impact zones marked
- Colors: primary-600 for chamber, accent-gold-600 for rotor
```

### 4. Roll Crusher SVG (expand carousel icon)
```
- Two parallel cylindrical rolls
- Gap between rolls marked
- Feed material from top
- Crushed material out bottom
- Rotation arrows
- Colors: primary-600 for rolls, secondary-600 for gap indication
```

### 5. Spiral Classifier SVG (expand carousel icon)
```
- Inclined tank/trough
- Spiral screw inside
- Slurry input, overflow output, discharge output
- Rotation arrow on screw
- Colors: primary-600 for tank, accent-teal-600 for spiral
```

### 6. Hydro Cyclone SVG (expand carousel icon)
```
- Conical shape with cylindrical top
- Tangential inlet pipe
- Vortex finder (overflow) at top
- Spigot (underflow) at bottom
- Spiral flow pattern inside
- Colors: primary-600 for body, accent-gold-600 for flow pattern
```

### 7. Screw Classifier SVG (expand carousel icon)
```
- Inclined rectangular trough
- Large screw/auger mechanism
- Slurry input, overflow weir, discharge area
- Rotation arrow
- Colors: primary-600 for trough, accent-teal-600 for screw
```

**Implementation Note**: All SVGs will be inline in HTML hero sections, using same style as carousel icons but at larger scale (viewBox="0 0 400 300")
