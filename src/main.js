// Navigation functionality
function initNavigation() {
  // Desktop dropdown (hover)
  const dropdown = document.querySelector('[data-dropdown]');
  if (dropdown) {
    const menu = dropdown.querySelector('[data-dropdown-menu]');
    const icon = dropdown.querySelector('[data-dropdown-icon]');

    // Show dropdown on hover
    dropdown.addEventListener('mouseenter', () => {
      menu.classList.remove('opacity-0', 'invisible');
      menu.classList.add('opacity-100', 'visible');
      icon.classList.add('rotate-180');
    });

    // Hide dropdown when mouse leaves
    dropdown.addEventListener('mouseleave', () => {
      menu.classList.remove('opacity-100', 'visible');
      menu.classList.add('opacity-0', 'invisible');
      icon.classList.remove('rotate-180');
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Mobile dropdown
  const mobileDropdownTrigger = document.querySelector('[data-mobile-dropdown-trigger]');
  const mobileDropdownMenu = document.querySelector('[data-mobile-dropdown-menu]');
  const mobileDropdownIcon = document.querySelector('[data-mobile-dropdown-icon]');

  if (mobileDropdownTrigger && mobileDropdownMenu) {
    mobileDropdownTrigger.addEventListener('click', () => {
      mobileDropdownMenu.classList.toggle('hidden');
      mobileDropdownIcon.classList.toggle('rotate-180');
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// Active navigation state on scroll
function initActiveNavState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-primary-600');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('text-primary-600');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Call once on page load
}

// Product Slider functionality
function initProductSlider() {
  const slider = document.querySelector('[data-products-slider]');
  const prevBtn = document.querySelector('[data-slider-prev]');
  const nextBtn = document.querySelector('[data-slider-next]');
  const dots = document.querySelectorAll('[data-dot]');

  if (!slider || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const totalSlides = 9; // 9 products total
  let slidesToShow = getSlidesToShow();

  function getSlidesToShow() {
    if (window.innerWidth >= 1024) return 3; // Desktop
    if (window.innerWidth >= 768) return 2; // Tablet
    return 1; // Mobile
  }

  function updateSlider() {
    slidesToShow = getSlidesToShow();
    const slideWidth = 100 / slidesToShow;
    const translateX = -(currentIndex * slideWidth);
    slider.style.transform = `translateX(${translateX}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove('bg-secondary-300');
        dot.classList.add('bg-primary-600');
      } else {
        dot.classList.remove('bg-primary-600');
        dot.classList.add('bg-secondary-300');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex = currentIndex - 1;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    if (currentIndex < maxIndex) {
      currentIndex = currentIndex + 1;
      updateSlider();
    }
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-dot'));
      updateSlider();
    });
  });

  // Auto-play
  setInterval(() => {
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    if (currentIndex < maxIndex) {
      currentIndex = currentIndex + 1;
    } else {
      currentIndex = 0; // Reset to beginning when auto-play reaches end
    }
    updateSlider();
  }, 5000);

  // Update on resize
  window.addEventListener('resize', updateSlider);

  updateSlider();
}

// Hero Slider functionality
function initHeroSlider() {
  const slider = document.querySelector('[data-hero-slider]');

  if (!slider) return;

  let currentIndex = 0;
  const totalSlides = 3;

  function updateHeroSlider() {
    const translateX = -(currentIndex * 100);
    slider.style.transform = `translateX(${translateX}%)`;
  }

  // Auto-play
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateHeroSlider();
  }, 4000);

  updateHeroSlider();
}

// Contact Form Validation
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return; // Form only exists on contact page

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMessage = document.getElementById('success-message');

  // Query Param Pre-fill Logic
  // Contact message templates based on source parameter
  const contactMessages = {
    'jaw-crusher': 'I\'m interested in learning more about your Jaw Crusher products.',
    'cone-crusher': 'I\'m interested in learning more about your Cone Crusher products.',
    'about': 'I would like to know more about Contemporary Engineering Solutions and your services.',
    'lubricant-lithium-grease': 'I would like a quote for Lithium-Complex EP Grease for my crusher equipment.',
    'lubricant-gear-oil': 'I\'m interested in purchasing Heavy-Duty Gear Oil for my jaw crusher gearbox.',
    'lubricant-iso100': 'I need Circulating Oil ISO 100 for my cone crusher. Please provide pricing and availability.',
    'lubricant-iso150': 'I would like to order Circulating Oil ISO 150 for heavy-duty cone crusher operations.',
    'lubricant-gap-control': 'I\'m interested in Gap Control Grease (MoS2) for my cone crusher. Please send me details and pricing.',
    'lubricant-high-temp': 'I need High-Temperature EP Grease for my crusher equipment. Please provide a quote.',
    'lubricant-impact': 'I would like information and pricing for Heavy-Duty Impact Grease for my crusher bearings.',
    'lubricant-vsi-grease': 'I\'m interested in High-Speed Vertical Bearing Grease for my VSI crusher. Please provide specifications and pricing.',
    'lubricant-vsi-oil': 'I need Thin Oil Circulation System (35# bearing oil) for my VSI crusher operations. Please send me details.',
    'lubricant-screen-grease': 'I would like a quote for Premium Vibration-Resistant Grease for my vibrating screen equipment.',
    'lubricant-screen-exciter': 'I\'m interested in Exciter Bearing Grease for my vibrating screen motors. Please provide pricing.',
    'lubricant-conveyor-bearing': 'I need Heavy-Duty Idler Bearing Grease for my belt conveyor system. Please send specifications and quote.',
    'lubricant-conveyor-gearbox': 'I would like information on Industrial Conveyor Gearbox Oil (ISO VG 220-320). Please provide pricing and availability.',
    'lubricant-cement-inquiry': 'I\'m interested in learning about your cement industry lubricants. Please contact me with more information.',
    'lubricant-food-pharma-inquiry': 'I would like information about food-grade and pharmaceutical lubricants. Please get in touch.',
    'lubricant-steel-inquiry': 'I\'m interested in high-temperature lubricants for steel production equipment. Please provide more details.',
    'spare-concave': 'I need to order a replacement Concave for my cone crusher. Please provide pricing and lead time.',
    'spare-mantle': 'I\'m looking for a replacement Mantle for my cone crusher. Please send me specifications and pricing.',
    'spare-jaw-plates': 'I need replacement Jaw Plates for my jaw crusher. Please provide availability and quote.',
    'spare-vsi': 'I\'m interested in VSI Parts for my vertical shaft impact crusher. Please provide specifications and pricing.',
    'spare-wire-mesh': 'I need Wire Meshes for screening equipment. Please send me available sizes and pricing.'
  };

  // Parse URL query parameter for message pre-fill
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('source');

  if (source && messageInput && !messageInput.value.trim()) {
    // Only pre-fill if message is empty (user hasn't typed anything)
    if (contactMessages[source]) {
      messageInput.value = contactMessages[source];
    }
    // If source doesn't exist in messages object, leave message empty (default behavior)
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation rules
  const validationRules = {
    name: {
      validate: (value) => {
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (value.trim().length > 100) {
          return 'Name must be less than 100 characters';
        }
        return '';
      }
    },
    email: {
      validate: (value) => {
        if (!value || value.trim().length === 0) {
          return 'Email is required';
        }
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        return '';
      }
    },
    message: {
      validate: (value) => {
        if (!value || value.trim().length < 10) {
          return 'Message must be at least 10 characters long';
        }
        if (value.trim().length > 1000) {
          return 'Message must be less than 1000 characters';
        }
        return '';
      }
    }
  };

  // Show error message
  function showError(fieldName, message) {
    const errorElement = document.querySelector(`[data-error="${fieldName}"]`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
      inputElement.classList.add('border-error-500');
      inputElement.classList.remove('border-border');
    }
  }

  // Clear error message
  function clearError(fieldName) {
    const errorElement = document.querySelector(`[data-error="${fieldName}"]`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement && inputElement) {
      errorElement.textContent = '';
      errorElement.classList.add('hidden');
      inputElement.classList.remove('border-error-500');
      inputElement.classList.add('border-border');
    }
  }

  // Validate single field
  function validateField(fieldName, value) {
    const rule = validationRules[fieldName];
    if (!rule) return true;

    const errorMessage = rule.validate(value);
    if (errorMessage) {
      showError(fieldName, errorMessage);
      return false;
    } else {
      clearError(fieldName);
      return true;
    }
  }

  // Validate all fields
  function validateForm() {
    const isNameValid = validateField('name', nameInput.value);
    const isEmailValid = validateField('email', emailInput.value);
    const isMessageValid = validateField('message', messageInput.value);

    return isNameValid && isEmailValid && isMessageValid;
  }

  // Real-time validation on blur
  nameInput.addEventListener('blur', () => {
    validateField('name', nameInput.value);
  });

  emailInput.addEventListener('blur', () => {
    validateField('email', emailInput.value);
  });

  messageInput.addEventListener('blur', () => {
    validateField('message', messageInput.value);
  });

  // Clear errors on input
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) {
      clearError('name');
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailRegex.test(emailInput.value.trim())) {
      clearError('email');
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 10) {
      clearError('message');
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide success message if visible
    successMessage.classList.add('hidden');

    // Validate all fields
    if (!validateForm()) {
      // Focus on first invalid field
      if (!validateField('name', nameInput.value)) {
        nameInput.focus();
      } else if (!validateField('email', emailInput.value)) {
        emailInput.focus();
      } else if (!validateField('message', messageInput.value)) {
        messageInput.focus();
      }
      return;
    }

    // Form is valid - show success message
    successMessage.classList.remove('hidden');

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Clear form
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 5000);
  });
}

// Spare Parts Tabs Functionality
function initPartsTabs() {
  const tabsContainer = document.querySelector('[data-parts-tabs]');
  if (!tabsContainer) return; // Only on spare parts page

  const tabs = tabsContainer.querySelectorAll('[data-parts-tab]');
  const partsGrid = document.querySelector('[data-parts-grid]');
  const partCards = partsGrid.querySelectorAll('[data-category]');

  // Function to filter parts by category
  function filterParts(selectedCategory) {
    partCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      if (cardCategory === selectedCategory) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Initialize: Show only Cone Crusher parts by default
  filterParts('cone');

  // Tab click handlers
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedCategory = tab.getAttribute('data-parts-tab');

      // Update active tab styling
      tabs.forEach(t => {
        if (t === tab) {
          t.classList.remove('bg-surface', 'text-text', 'hover:bg-primary-50', 'border', 'border-border');
          t.classList.add('bg-primary-600', 'text-white', 'shadow-md');
        } else {
          t.classList.remove('bg-primary-600', 'text-white', 'shadow-md');
          t.classList.add('bg-surface', 'text-text', 'hover:bg-primary-50', 'border', 'border-border');
        }
      });

      // Filter parts cards
      filterParts(selectedCategory);
    });
  });
}

// Scroll Animation with Intersection Observer
function initScrollAnimations() {
  // Check if browser supports Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Fallback: make all animated elements visible
    document.querySelectorAll('.fade-in-scroll, .slide-up-scroll, .slide-in-left, .slide-in-right').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Create observer with subtle threshold
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: stop observing after animation triggers (performance optimization)
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in-scroll, .slide-up-scroll, .slide-in-left, .slide-in-right'
  );

  animatedElements.forEach(el => observer.observe(el));
}

// Product Page Slider functionality (for jaw-crusher and cone-crusher pages)
function initProductPageSlider() {
  const slider = document.querySelector('[data-product-slider]');
  const prevBtn = document.querySelector('[data-product-prev]');
  const nextBtn = document.querySelector('[data-product-next]');

  if (!slider || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const slides = slider.children.length;

  function updateProductSlider() {
    const translateX = -(currentIndex * 100);
    slider.style.transform = `translateX(${translateX}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides - 1;
    updateProductSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex < slides - 1 ? currentIndex + 1 : 0;
    updateProductSlider();
  });

  // Auto-play
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides;
    updateProductSlider();
  }, 4000);

  updateProductSlider();
}

// Lubricants Industry Tabs Functionality
function initLubricantsTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length === 0 || tabPanels.length === 0) return; // Only on lubricants page

  // Function to switch tabs
  function switchTab(tabName) {
    // Hide all panels
    tabPanels.forEach(panel => {
      panel.classList.add('hidden');
      panel.setAttribute('aria-hidden', 'true');
    });

    // Show selected panel
    const selectedPanel = document.querySelector(`[data-panel="${tabName}"]`);
    if (selectedPanel) {
      selectedPanel.classList.remove('hidden');
      selectedPanel.setAttribute('aria-hidden', 'false');
    }

    // Update button states
    tabButtons.forEach(button => {
      const buttonTab = button.getAttribute('data-tab');
      const isActive = buttonTab === tabName;

      button.setAttribute('aria-selected', isActive);

      if (isActive) {
        button.classList.remove('bg-surface', 'text-text', 'hover:bg-primary-50', 'border', 'border-border');
        button.classList.add('bg-primary-600', 'text-white', 'shadow-md');
      } else {
        button.classList.remove('bg-primary-600', 'text-white', 'shadow-md');
        button.classList.add('bg-surface', 'text-text', 'hover:bg-primary-50', 'border', 'border-border');
      }
    });
  }

  // Tab button click handlers
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Keyboard navigation (arrow keys)
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
      let newIndex = index;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = index > 0 ? index - 1 : tabButtons.length - 1;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = index < tabButtons.length - 1 ? index + 1 : 0;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabButtons.length - 1;
      }

      if (newIndex !== index) {
        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
      }
    });
  });

  // Initialize first tab as active
  switchTab('crusher-construction');
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initActiveNavState();
  initHeroSlider();
  initProductSlider();
  initProductPageSlider();
  initContactForm();
  initPartsTabs();
  initLubricantsTabs();
  initScrollAnimations();
});
