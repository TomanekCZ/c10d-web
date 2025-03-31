// Back to Top functionality
export function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return;
  
  // Toggle button visibility based on scroll position
  const toggleBackToTopButton = () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('opacity-100', 'visible');
      backToTopButton.classList.remove('opacity-0', 'invisible');
    } else {
      backToTopButton.classList.remove('opacity-100', 'visible');
      backToTopButton.classList.add('opacity-0', 'invisible');
    }
  };
  
  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Add event listeners
  window.addEventListener('scroll', toggleBackToTopButton);
  backToTopButton.addEventListener('click', scrollToTop);
  
  // Initialize button state
  toggleBackToTopButton();
} 