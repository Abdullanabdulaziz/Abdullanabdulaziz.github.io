// DOM Elements
const body = document.body;
const header = document.querySelector('.header');
const themeToggle = document.getElementById('theme-toggle');
const dotsMenuToggle = document.querySelector('.dots-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const splashScreen = document.querySelector('.splashscreen');
const navLinks = document.querySelectorAll('.nav-link');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Theme Toggle - Use event delegation to handle dynamically added elements
document.addEventListener('click', (e) => {
  // Check if the clicked element is a theme toggle or a child of one
  const themeToggle = e.target.closest('.theme-toggle');
  if (themeToggle) {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }
});

// Set theme function - Enhanced with better error handling and logging
function setTheme(theme) {
  try {
    const html = document.documentElement;
    const isDark = theme === 'dark';
    
    // Log theme change for debugging
    console.log(`Setting theme to: ${theme}`);
    
    // Update data-theme attribute on html element
    html.setAttribute('data-theme', theme);
    
    // Toggle dark-mode class on body
    document.body.classList.toggle('dark-mode', isDark);
    
    // Update theme color meta tag for mobile browsers
    const themeColor = isDark ? '#1a1a1a' : '#f3f2f9';
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themeColor);
    }
    
    // Update all theme toggles on the page
    document.querySelectorAll('.theme-toggle').forEach(toggle => {
      try {
        const moonIcon = toggle.querySelector('.fa-moon');
        const sunIcon = toggle.querySelector('.fa-sun');
        
        if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'inline-block';
        if (sunIcon) sunIcon.style.display = isDark ? 'inline-block' : 'none';
        
        // Ensure the toggle has the correct ARIA label
        toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      } catch (e) {
        console.error('Error updating theme toggle:', e);
      }
    });
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Dispatch a custom event in case other scripts need to react to theme changes
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    
  } catch (error) {
    console.error('Error in setTheme:', error);
  }
}

// Initialize theme on page load - Enhanced with better error handling
function initializeTheme() {
  try {
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply the theme
    setTheme(theme);
    
    // Watch for system theme changes (only if user hasn't set a preference)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener for system theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  // DOMContentLoaded has already fired
  initializeTheme();
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
