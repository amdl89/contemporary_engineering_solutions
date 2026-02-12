// Import Swiper initialization functions
import {
  initHeroSlider as initHeroSwiperSlider,
  initProductSlider as initProductSwiperSlider,
  initProductPageSlider as initProductPageSwiperSlider,
} from './swiper-init.js';

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
    // Product pages
    'jaw-crusher': 'I\'m interested in learning more about your Jaw Crusher products.',
    'cone-crusher': 'I\'m interested in learning more about your Cone Crusher products.',
    'vibrating-screen': 'I would like information about your Vibrating Screen products. Please send specifications and pricing.',
    'vertical-shaft-impactor': 'I\'m interested in your Vertical Shaft Impactor (VSI) crushers. Please provide details and pricing.',
    'vsi-crusher': 'I\'m interested in your Vertical Shaft Impactor (VSI) crushers. Please provide details and pricing.',
    'horizontal-shaft-impactor': 'I would like information about your Horizontal Shaft Impactor (HSI) products. Please send specifications.',
    'hsi-crusher': 'I would like information about your Horizontal Shaft Impactor (HSI) products. Please send specifications.',
    'roll-crusher': 'I\'m interested in your Roll Crusher products. Please provide specifications and pricing.',
    'bucket-classifier': 'I would like information about your Bucket Classifier equipment. Please send details and pricing.',
    'screw-classifier': 'I\'m interested in your Screw Classifier products. Please provide specifications and pricing.',
    'hydro-cyclone': 'I would like information about your Hydro Cyclone equipment. Please send specifications and pricing.',
    'about': 'I would like to know more about Contemporary Engineering Solutions and your services.',
    // Mosil Lubricant Products
    'mosil-gm-00-sp2': 'I would like a quote for Mosil GM-00(SP2) multi-purpose grease. Please provide pricing and availability.',
    'mosil-gear-lube-sp-150e': 'I\'m interested in Mosil Gear Lube SP-150e for my cone crusher gearbox. Please send specifications and pricing.',
    'mosil-gear-lube-sp-220e': 'I need Mosil Gear Lube SP-220e heavy-duty gear oil for my cone crusher. Please provide a quote.',
    'mosil-brb-400': 'I would like information and pricing for Mosil BRB 400 specialty bearing oil for cone crusher applications.',
    'mosil-ml-110-premium': 'I\'m interested in Mosil ML-110 Premium for my impact crusher. Please provide specifications and pricing.',
    'mosil-gear-lube-sp-320e': 'I need Mosil Gear Lube SP-320e for my conveyor gearbox. Please send me specifications and a quote.',
    // Legacy lubricant references (keeping for backward compatibility)
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
    // Spare parts
    'spare-concave': 'I need to order a replacement Concave for my cone crusher. Please provide pricing and lead time.',
    'spare-mantle': 'I\'m looking for a replacement Mantle for my cone crusher. Please send me specifications and pricing.',
    'spare-jaw-plates': 'I need replacement Jaw Plates for my jaw crusher. Please provide availability and quote.',
    'spare-vsi': 'I\'m interested in VSI Parts for my vertical shaft impact crusher. Please provide specifications and pricing.',
    'spare-wire-mesh': 'I need Wire Meshes for screening equipment. Please send me available sizes and pricing.',
    'spare-plate-mesh': 'I\'m interested in Plate Mesh products for my screening equipment. Please provide specifications and pricing.',
    'spare-clamping-fasteners': 'I need Clamping Fasteners for my crusher equipment. Please send me available options and pricing.',
    'spare-rubber-bedding': 'I would like to order Rubber Bedding for my crusher. Please provide specifications and quote.'
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

      if (selectedCategory === 'all') {
        // Show all cards when "all" is selected
        card.classList.remove('hidden');
        card.style.display = '';
      } else if (cardCategory === selectedCategory) {
        // Show cards matching the selected category
        card.classList.remove('hidden');
        card.style.display = '';
      } else {
        // Hide cards that don't match
        card.classList.add('hidden');
      }
    });
  }

  // Initialize: Show all parts by default
  filterParts('all');

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


// Lubricants Equipment Filter Functionality
function initLubricantsFilter() {
  const filterButtons = document.querySelectorAll('[data-lubricant-filter]');
  const productCards = document.querySelectorAll('[data-lubricant-card]');

  if (filterButtons.length === 0 || productCards.length === 0) return; // Only on lubricants page

  // Function to filter products by equipment type
  function filterProducts(equipmentType) {
    productCards.forEach(card => {
      const cardEquipment = card.getAttribute('data-equipment').split(' ');

      if (equipmentType === 'all' || cardEquipment.includes(equipmentType)) {
        card.classList.remove('hidden');
        // Add fade-in animation
        card.style.animation = 'fadeIn 0.3s ease-in';
      } else {
        card.classList.add('hidden');
      }
    });

    // Update filter button states
    filterButtons.forEach(button => {
      const buttonFilter = button.getAttribute('data-lubricant-filter');
      const isActive = buttonFilter === equipmentType;

      if (isActive) {
        button.classList.remove('bg-surface', 'text-text', 'hover:bg-primary-50', 'border', 'border-border');
        button.classList.add('bg-primary-600', 'text-white', 'shadow-md');
      } else {
        button.classList.remove('bg-primary-600', 'text-white', 'shadow-md');
        button.classList.add('bg-surface', 'text-text', 'hover:bg-primary-50', 'border', 'border-border');
      }
    });
  }

  // Filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const equipmentType = button.getAttribute('data-lubricant-filter');
      filterProducts(equipmentType);
    });
  });

  // Initialize with "All" filter active
  filterProducts('all');
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initActiveNavState();
  // Swiper.js sliders (replacing custom implementations)
  initHeroSwiperSlider();
  initProductSwiperSlider();
  initProductPageSwiperSlider();
  initContactForm();
  initPartsTabs();
  initLubricantsFilter();
  initScrollAnimations();
});
