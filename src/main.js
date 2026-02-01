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
    currentIndex = currentIndex > 0 ? currentIndex - 1 : Math.max(0, totalSlides - slidesToShow);
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
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
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
  }, 5000);

  // Update on resize
  window.addEventListener('resize', updateSlider);

  updateSlider();
}

// Hero Slider functionality
function initHeroSlider() {
  const slider = document.querySelector('[data-hero-slider]');
  const dots = document.querySelectorAll('[data-hero-dot]');

  if (!slider || dots.length === 0) return;

  let currentIndex = 0;
  const totalSlides = 3;

  function updateHeroSlider() {
    const translateX = -(currentIndex * 100);
    slider.style.transform = `translateX(${translateX}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove('bg-white/50');
        dot.classList.add('bg-white');
      } else {
        dot.classList.remove('bg-white');
        dot.classList.add('bg-white/50');
      }
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-hero-dot'));
      updateHeroSlider();
    });
  });

  // Auto-play
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateHeroSlider();
  }, 4000);

  updateHeroSlider();
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initActiveNavState();
  initHeroSlider();
  initProductSlider();
});
