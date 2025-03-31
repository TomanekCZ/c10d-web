// AOS (Animate On Scroll) initialization
export function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      delay: 100
    });
    console.log('AOS initialized');
  } else {
    console.warn('AOS library not loaded');
  }
} 