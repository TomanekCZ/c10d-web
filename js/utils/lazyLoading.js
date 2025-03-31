// Lazy loading functionality
export function initLazyLoading() {
  const observer = lozad('.lozad', {
    rootMargin: '50px 0px',
    threshold: 0.1,
    loaded: function(el) {
      el.classList.add('fade-in');
    }
  });
  observer.observe();
  console.log('Lazy loading initialized');
} 