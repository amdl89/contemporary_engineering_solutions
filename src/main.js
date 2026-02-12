// Import Alpine.js
import Alpine from "alpinejs";

// Import Swiper initialization functions
import {
  initHeroSlider as initHeroSwiperSlider,
  initProductSlider as initProductSwiperSlider,
  initProductPageSlider as initProductPageSwiperSlider,
} from "./swiper-init.js";

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Navigation functionality
function initNavigation() {
  // Desktop dropdown (hover)
  const dropdown = document.querySelector("[data-dropdown]");
  if (dropdown) {
    const menu = dropdown.querySelector("[data-dropdown-menu]");
    const icon = dropdown.querySelector("[data-dropdown-icon]");

    // Show dropdown on hover
    dropdown.addEventListener("mouseenter", () => {
      menu.classList.remove("opacity-0", "invisible");
      menu.classList.add("opacity-100", "visible");
      icon.classList.add("rotate-180");
    });

    // Hide dropdown when mouse leaves
    dropdown.addEventListener("mouseleave", () => {
      menu.classList.remove("opacity-100", "visible");
      menu.classList.add("opacity-0", "invisible");
      icon.classList.remove("rotate-180");
    });
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Mobile dropdown
  const mobileDropdownTrigger = document.querySelector(
    "[data-mobile-dropdown-trigger]",
  );
  const mobileDropdownMenu = document.querySelector(
    "[data-mobile-dropdown-menu]",
  );
  const mobileDropdownIcon = document.querySelector(
    "[data-mobile-dropdown-icon]",
  );

  if (mobileDropdownTrigger && mobileDropdownMenu) {
    mobileDropdownTrigger.addEventListener("click", () => {
      mobileDropdownMenu.classList.toggle("hidden");
      mobileDropdownIcon.classList.toggle("rotate-180");
    });
  }
}

// Smooth scroll - handles nav offset & mobile menu closing
// CSS handles the actual smooth scrolling (scroll-behavior: smooth)
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "#!") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Calculate nav height offset
        const nav = document.querySelector("nav");
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector("[data-mobile-menu]");
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });
}

// Scroll Animation with Intersection Observer
function initScrollAnimations() {
  // Check if browser supports Intersection Observer
  if (!("IntersectionObserver" in window)) {
    // Fallback: make all animated elements visible
    document
      .querySelectorAll(
        ".fade-in-scroll, .slide-up-scroll, .slide-in-left, .slide-in-right",
      )
      .forEach((el) => {
        el.classList.add("is-visible");
      });
    return;
  }

  // Create observer with subtle threshold
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    ".fade-in-scroll, .slide-up-scroll, .slide-in-left, .slide-in-right",
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// Initialize all functionality when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Navigation (vanilla JS)
  initNavigation();

  // Smooth scroll with nav offset & mobile menu closing
  // CSS handles smooth scrolling, this handles what CSS can't do
  initSmoothScroll();

  // Swiper.js sliders
  initHeroSwiperSlider();
  initProductSwiperSlider();
  initProductPageSwiperSlider();

  // Scroll animations (Intersection Observer)
  initScrollAnimations();
});
