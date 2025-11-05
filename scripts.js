// Enhanced particles.js configuration with interactive background
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: ["#00bcd4", "#ff4081", "#9c27b0", "#4caf50", "#ff9800"],
        },
        shape: {
            type: ["circle", "triangle", "star", "polygon"],
            stroke: {
                width: 0,
                color: "#000000",
            },
            polygon: {
                nb_sides: 6,
            },
        },
        opacity: {
            value: 0.7,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.5,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
            shadow: {
                enable: true,
                blur: 5,
                color: "#000000"
            }
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: ["grab", "bubble"],
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.8,
                    width: 1.5
                },
            },
            bubble: {
                distance: 200,
                size: 6,
                duration: 0.3,
                opacity: 0.8,
                speed: 3
            },
            push: {
                particles_nb: 6,
            },
            repulse: {
                distance: 100,
                duration: 0.4,
            },
        },
    },
    retina_detect: true,
    config_demo: {
        hide_card: false,
        background_color: "#b61924",
        background_image: "",
        background_position: "50% 50%",
        background_repeat: "no-repeat",
        background_size: "cover",
    },
});

// Add mouse trail effect
const canvas = document.querySelector("#particles-js");
const ctx = canvas.getContext("2d");
let mouseX = 0;
let mouseY = 0;
const particles = [];
const particleCount = 20;

// Create particles for mouse trail
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: 0,
        y: 0,
        size: Math.random() * 5 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
    });
}

// Track mouse position
canvas.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation loop for mouse trail
function animate() {
    requestAnimationFrame(animate);
    
    // Fade out the trail
    ctx.fillStyle = "rgba(10, 10, 20, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
        const next = particles[(index + 1) % particles.length];
        
        // Move particles towards the next one in the trail
        particle.x += (next.x - particle.x) * 0.3;
        particle.y += (next.y - particle.y) * 0.3;
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
    
    // Update the first particle to follow the mouse
    if (particles[0]) {
        particles[0].x = mouseX;
        particles[0].y = mouseY;
    }
}

// Start the animation
animate();

// Dark Mode Toggle with Local Storage
const darkModeSwitch = document.getElementById("dark-mode-switch");
const body = document.body;

// Check for saved user preference, if any, on load
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeSwitch.textContent = " Light Mode";
}

darkModeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        darkModeSwitch.textContent = " Light Mode";
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeSwitch.textContent = " Dark Mode";
        localStorage.setItem('darkMode', null);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to top button
const scrollToTopBtn = document.createElement('div');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes after a short delay to trigger animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Initial check for scroll position
    animateOnScroll();
    
    // Add animation classes to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
    });
});

// Form submission handling
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}