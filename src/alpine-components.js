/**
 * Alpine.js Reusable Components
 * Core components: createFilter(), createSlider()
 * Presets are defined in main.js
 */

// Import Swiper and required modules
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// ============================================
// FILTER COMPONENT
// ============================================

/**
 * Creates a reusable filter component for category/tab-based filtering
 * @param {Object} itemsConfig - Map of item IDs to their categories
 * @param {string} initialFilter - Initial active filter (default: 'all')
 * @returns {Object} Alpine.js component with activeFilter and shouldShow() method
 *
 * @example
 * x-data="createFilter({
 *   'item-1': ['category-a', 'category-b'],
 *   'item-2': ['category-a']
 * })"
 */
export function createFilter(itemsConfig, initialFilter = "all") {
  return {
    activeFilter: initialFilter,
    itemsConfig,
    shouldShow(itemId) {
      return (
        this.activeFilter === "all" ||
        this.itemsConfig[itemId]?.includes(this.activeFilter)
      );
    },
  };
}

// ============================================
// SLIDER COMPONENT
// ============================================

/**
 * Generic slider component factory
 * @param {Object} config - Swiper configuration object
 * @param {string} selector - Optional data attribute selector for finding slider element
 * @returns {Object} Alpine component with Swiper instance
 *
 * @example
 * x-data="createSlider({ slidesPerView: 1, loop: true })"
 */
export function createSlider(config = {}, selector = null) {
  return {
    swiperInstance: null,

    init() {
      // Find slider element: use selector, or default to $el
      const sliderEl = selector
        ? this.$el.querySelector(`[data-${selector}]`) || this.$el
        : this.$el;

      if (sliderEl) {
        this.swiperInstance = new Swiper(sliderEl, config);
      }
    },

    destroy() {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }
    },
  };
}

// ============================================
// USAGE PATTERN
// ============================================
//
// Core components are exposed globally from main.js:
// - window.createFilter (factory for custom filter configs)
// - window.createSlider (factory for custom slider configs)
//
// HTML usage:
// - <div x-data="createFilter({...})">
// - <div x-data="createSlider({...})">
