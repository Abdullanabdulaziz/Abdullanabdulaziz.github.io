// DOM Elements
const body = document.body;
const header = document.querySelector('.header');
const themeToggle = document.getElementById('theme-toggle');
const dotsMenuToggle = document.querySelector('.dots-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const splashScreen = document.querySelector('.splashscreen');
const app = document.getElementById('app');
let currentPage = 'home';

// Initialize the app
function initApp() {
  // Set initial page
  showPage('home');
  
  // Add event listeners for navigation
  document.querySelectorAll('.nav-button, .quick-link').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = button.dataset.page;
      if (targetPage && targetPage !== currentPage) {
        showPage(targetPage);
      }
    });
  });
  
  // Back button functionality
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
  backButton.addEventListener('click', () => showPage('home'));
  document.body.appendChild(backButton);
  
  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const page = window.location.hash.replace('#', '') || 'home';
    if (page !== currentPage) {
      showPage(page, false);
    }
  });
}

// Show page with transition
function showPage(pageId, updateHistory = true) {
  const newPage = document.getElementById(pageId);
  const currentPageEl = document.querySelector('.page.active');
  
  if (!newPage || (currentPageEl && currentPageEl.id === pageId)) return;
  
  // Add loading state
  app.classList.add('page-transitioning');
  
  // Update current page
  currentPage = pageId;
  
  // Update URL
  if (updateHistory) {
    const url = pageId === 'home' ? window.location.pathname : `#${pageId}`;
    window.history.pushState({ page: pageId }, '', url);
  }
  
  // Update body class
  if (pageId === 'home') {
    body.classList.remove('page-active');
    document.querySelector('.back-button').style.display = 'none';
  } else {
    body.classList.add('page-active');
    document.querySelector('.back-button').style.display = 'flex';
  }
  
  // Start page transition
  if (currentPageEl) {
    currentPageEl.classList.add('leaving');
    currentPageEl.classList.remove('active');
    
    // Wait for leave animation to complete
    setTimeout(() => {
      currentPageEl.classList.remove('leaving');
      
      // Show new page
      newPage.classList.add('active');
      
      // Trigger reflow
      void newPage.offsetWidth;
      
      // Remove loading state
      setTimeout(() => {
        app.classList.remove('page-transitioning');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Load page content if needed
        loadPageContent(pageId);
      }, 50);
    }, 300);
  } else {
    // First page load
    newPage.classList.add('active');
    app.classList.remove('page-transitioning');
    loadPageContent(pageId);
  }
}

// Load page content dynamically
function loadPageContent(pageId) {
  const page = document.getElementById(pageId);
  if (!page || page.dataset.loaded) return;
  
  // Add loading indicator
  page.innerHTML = `
    <div class="page-loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `;
  
  // Simulate loading (replace with actual content loading)
  setTimeout(() => {
    // This would be replaced with actual content loading logic
    const content = {
      about: `
        <div class="container">
          <h2 class="section-title">About Me</h2>
          <div class="about-content">
            <div class="about-text">
              <p>I'm a passionate Full Stack Developer with expertise in modern web technologies.</p>
              <!-- Add your about content here -->
            </div>
          </div>
        </div>
      `,
      skills: `
        <div class="container">
          <h2 class="section-title">My Skills</h2>
          <div class="skills-grid">
            <!-- Add your skills here -->
          </div>
        </div>
      `,
      projects: `
        <div class="container">
          <h2 class="section-title">My Projects</h2>
          <div class="projects-grid">
            <!-- Add your projects here -->
          </div>
        </div>
      `,
      contact: `
        <div class="container">
          <h2 class="section-title">Get in Touch</h2>
          <div class="contact-form">
            <!-- Add your contact form here -->
          </div>
        </div>
      `
    };
    
    page.innerHTML = content[pageId] || '<div class="container"><h2>Page not found</h2></div>';
    page.dataset.loaded = 'true';
    
    // Initialize any page-specific scripts
    if (typeof window[`init${pageId.charAt(0).toUpperCase() + pageId.slice(1)}Page`] === 'function') {
      window[`init${pageId.charAt(0).toUpperCase() + pageId.slice(1)}Page`]();
    }
  }, 500);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check for hash on initial load
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    showPage(hash, false);
  } else {
    initApp();
  }
});

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Set theme function
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Toggle dots menu
if (dotsMenuToggle) {
  dotsMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    header.classList.toggle('menu-open');
    dotsMenuToggle.classList.toggle('active');
    
    // Toggle body scroll
    if (header.classList.contains('menu-open')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (header.classList.contains('menu-open') && 
      !e.target.closest('.nav-menu') && 
      !e.target.closest('.dots-menu-toggle')) {
    header.classList.remove('menu-open');
    dotsMenuToggle.classList.remove('active');
    body.style.overflow = '';
  }
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (header.classList.contains('menu-open')) {
      header.classList.remove('menu-open');
      dotsMenuToggle.classList.remove('active');
      body.style.overflow = '';
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  });
});


// Splash Screen
function hideSplashScreen() {
  const splashScreen = document.querySelector('.splashscreen');
  if (splashScreen) {
    try {
      splashScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s';
      splashScreen.style.opacity = '0';
      splashScreen.style.visibility = 'hidden';
      document.body.style.overflow = 'auto';
      
      // Remove splash screen from DOM after animation completes
      setTimeout(() => {
        if (splashScreen && splashScreen.parentNode) {
          splashScreen.parentNode.removeChild(splashScreen);
        }
      }, 500);
    } catch (error) {
      console.error('Error hiding splash screen:', error);
      // Fallback: Just hide it immediately
      splashScreen.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  } else {
    document.body.style.overflow = 'auto';
  }
}

// Function to initialize splash screen
function initSplashScreen() {
  // Hide splash screen when everything is loaded
  if (document.readyState === 'complete') {
    setTimeout(hideSplashScreen, 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideSplashScreen, 1000);
    });
  }

  // Fallback in case the load event doesn't fire
  setTimeout(hideSplashScreen, 3000);
}

// Initialize splash screen
document.addEventListener('DOMContentLoaded', initSplashScreen);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');
const textArray = ['Web Development', 'Automation', 'WordPress', 'React', 'Python', 'PHP'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursor.classList.remove('typing');
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursor.classList.remove('typing');
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

// Start the typing effect on page load
if (typedTextSpan) {
  document.addEventListener('DOMContentLoaded', () => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
  });
}

// Scroll reveal animation
const scrollReveal = ScrollReveal({
  origin: 'bottom',
  distance: '60px',
  duration: 1000,
  delay: 200,
  reset: false
});

scrollReveal.reveal('.section-title', { origin: 'top' });
scrollReveal.reveal('.project-card', { interval: 200 });
scrollReveal.reveal('.skill-item', { interval: 100 });

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    // Scroll down
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    // Scroll up
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  
  lastScroll = currentScroll;
});

// Initialize particles.js if available
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#2563eb'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#2563eb',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    
    const submitButton = this.querySelector('button[type="submit"]');
    this.insertBefore(successMessage, submitButton);
    
    // Reset form
    this.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  });
}

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
