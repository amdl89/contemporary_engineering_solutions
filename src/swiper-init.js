// Swiper.js initialization module
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Initialize Hero Slider (Homepage)
 * - 3 slides, full-screen
 * - Auto-play: 4000ms
 * - Loop: true
 * - No navigation arrows
 */
export function initHeroSlider() {
  const heroSliderEl = document.querySelector('[data-hero-slider]');
  if (!heroSliderEl) return null;

  return new Swiper(heroSliderEl, {
    modules: [Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 700,
    effect: 'slide',
  });
}

/**
 * Initialize Products Slider (Homepage)
 * - 9 product cards
 * - Responsive: 3 (desktop), 2 (tablet), 1 (mobile)
 * - Navigation arrows
 * - Auto-play: 5000ms
 */
export function initProductSlider() {
  const productsSliderEl = document.querySelector('[data-products-slider]');
  if (!productsSliderEl) return null;

  return new Swiper(productsSliderEl, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 500,
    navigation: {
      nextEl: '[data-slider-next]',
      prevEl: '[data-slider-prev]',
    },
    breakpoints: {
      // Mobile (default): 1 slide
      640: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      // Tablet: 2 slides
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      // Desktop: 3 slides
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  });
}

/**
 * Initialize Product Page Slider
 * - 2 slides (technical diagrams/images)
 * - Navigation arrows
 * - Auto-play: 4000ms
 * - Loop: true
 */
export function initProductPageSlider() {
  const productSliderEl = document.querySelector('[data-product-slider]');
  if (!productSliderEl) return null;

  return new Swiper(productSliderEl, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 700,
    navigation: {
      nextEl: '[data-product-next]',
      prevEl: '[data-product-prev]',
    },
  });
}
