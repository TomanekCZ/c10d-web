// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // This helps Alpine.js process the newly loaded content
    if (window.Alpine) {
      window.Alpine.initTree(document.getElementById(elementId));
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Function to initialize components
function initComponents() {
  // Load mobile menu
  if (document.getElementById('mobile-menu-container')) {
    loadComponent('mobile-menu-container', 'components/mobile-menu.html');
  }
}

// Wait for DOM and Alpine to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // If Alpine is already loaded
  if (window.Alpine) {
    // Small delay to ensure Alpine store is initialized
    setTimeout(initComponents, 50);
  } else {
    // Otherwise wait for Alpine initialization
    document.addEventListener('alpine:init', function() {
      // Small delay after Alpine is initialized
      setTimeout(initComponents, 50);
    });
  }
}); 