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
  const totalSlides = 6; // 6 products total
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
  initScrollAnimations();
});
