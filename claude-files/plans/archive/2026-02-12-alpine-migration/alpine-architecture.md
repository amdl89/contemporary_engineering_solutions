# Alpine.js Architecture Plan

## Components to Migrate

### 1. **Spare Parts Tabs** (spare-parts-services.html)
```javascript
// Current: initPartsTabs() - 52 lines of vanilla JS
// Alpine.js: Simple reactive state

x-data="{
  activeTab: 'all',
  filterParts(category) {
    this.activeTab = category
  }
}"

// Benefits:
- Declarative filtering with x-show
- No manual class manipulation
- Reactive UI updates
```

### 2. **Lubricants Filter** (lubricants.html)
```javascript
// Current: initLubricantsFilter() - 47 lines of vanilla JS
// Alpine.js: Simple reactive filtering

x-data="{
  activeFilter: 'all',
  filterProducts(equipment) {
    this.activeFilter = equipment
  },
  isVisible(cardEquipment) {
    return this.activeFilter === 'all' || cardEquipment.includes(this.activeFilter)
  }
}"

// Benefits:
- Cleaner filtering logic
- No manual DOM manipulation
- Reactive button states
```

### 3. **Contact Form** (contact.html)
```javascript
// Current: initContactForm() - 230 lines of vanilla JS
// Alpine.js: Form state management

x-data="{
  formData: { name: '', email: '', message: '' },
  errors: {},
  showSuccess: false,

  validateField(field) { ... },
  submitForm() { ... }
}"

// Benefits:
- x-model for two-way binding
- Reactive error display
- Cleaner validation logic
```

### 4. **Active Nav State** (all pages with sections)
```javascript
// Current: initActiveNavState() - 30 lines of vanilla JS
// Alpine.js: Scroll-based reactive state

x-data="{
  activeSection: '',

  init() {
    // Use IntersectionObserver for better performance
    this.observeSections()
  },

  observeSections() {
    // Observer logic
  }
}"

// Benefits:
- Modern IntersectionObserver API (better than scroll events)
- Reactive nav highlighting
- Better performance
```

### 5. **Smooth Scroll with Nav Offset** (all pages)
```javascript
// Current: initSmoothScroll() - 28 lines
// Alpine.js: Click handler

x-on:click="scrollToSection($event)"

scrollToSection(event) {
  event.preventDefault()
  const target = document.querySelector(event.target.getAttribute('href'))
  const nav = document.querySelector('nav')
  const navHeight = nav ? nav.offsetHeight : 0

  window.scrollTo({
    top: target.offsetTop - navHeight,
    behavior: 'smooth'
  })

  // Close mobile menu
  this.mobileMenuOpen = false
}

// Benefits:
- Integrated with nav state
- Cleaner event handling
- Reactive mobile menu state
```

## Implementation Strategy

### Phase 3: Initialize Alpine.js
1. Import Alpine.js in main.js
2. Set up global Alpine components/stores if needed
3. Initialize Alpine

### Phase 4: Migrate Tabs & Filters
1. Update spare-parts-services.html with Alpine directives
2. Update lubricants.html with Alpine directives
3. Remove initPartsTabs() and initLubricantsFilter() from main.js

### Phase 5: Migrate Contact Form
1. Update contact.html with Alpine directives
2. Implement form validation in Alpine
3. Remove initContactForm() from main.js

### Phase 6: Migrate Navigation Features
1. Add Alpine data to navigation component
2. Implement active nav state with IntersectionObserver
3. Implement smooth scroll with nav offset
4. Remove initActiveNavState() and initSmoothScroll() from main.js

## Alpine.js Directives Reference

| Directive | Use Case |
|-----------|----------|
| `x-data` | Component state |
| `x-model` | Two-way form binding |
| `x-show` | Toggle visibility |
| `x-on:click` | Click handlers |
| `x-bind:class` | Dynamic classes |
| `x-text` | Dynamic text content |
| `x-init` | Component initialization |
| `x-ref` | Element references |

## File Changes Required

| File | Changes |
|------|---------|
| `src/main.js` | Import & initialize Alpine, remove migrated functions |
| `pages/spare-parts-services.html` | Add Alpine directives for tabs |
| `pages/lubricants.html` | Add Alpine directives for filters |
| `pages/contact.html` | Add Alpine directives for form |
| All pages with nav | Add Alpine directives for active state & smooth scroll |
