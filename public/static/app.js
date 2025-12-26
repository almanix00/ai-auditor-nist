// Frontend JavaScript for NIST AI Auditor
console.log('NIST AI Auditor - Frontend Loaded');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Ready');
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Add fade-in animation to cards
  const cards = document.querySelectorAll('.bg-white');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
  });
});

// API Helper Functions
const API_BASE_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Model Management
async function createModel(modelData) {
  return fetchAPI('/models', {
    method: 'POST',
    body: JSON.stringify(modelData),
  });
}

async function startScan(modelId, scanType = 'full') {
  return fetchAPI('/scans', {
    method: 'POST',
    body: JSON.stringify({ model_id: modelId, scan_type: scanType }),
  });
}

// Export functions for use in other scripts
window.NISTAuditor = {
  fetchAPI,
  createModel,
  startScan,
};
