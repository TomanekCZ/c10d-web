/**
 * C10D s.r.o. Website Main JavaScript
 * Initializes all functionality
 * Version: 1.0
 */

import { initNavigationObserver, initSmoothScroll } from './modules/navigation.js';
import { initLazyLoading } from './utils/lazyLoading.js';
import { initBackToTop } from './utils/backToTop.js';
import { initAOS } from './utils/aos.js';

// Global variables
let currentLanguage = localStorage.getItem('language') || 'cs';

// Helper functions - REMOVED translations-dependent code

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize navigation observer (highlights active section in navbar)
    initNavigationObserver();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize AOS animations
    initAOS();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (mobileMenuToggle && navbarCollapse) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            mobileMenuToggle.classList.toggle('collapsed');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navbarCollapse.classList.remove('show');
                mobileMenuToggle.classList.remove('collapsed');
            }
        }
    });
});

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      body.classList.toggle('nav-open');
    });

    // Close menu when clicking navigation links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        body.classList.remove('nav-open');
      });
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Close mobile menu on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mainNav && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      body.classList.remove('nav-open');
    }
  }
});