document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: { enable: true, color: '#ffffff' },
            move: { enable: true, speed: 1 }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
            },
            modes: {
                repulse: { distance: 100 },
                push: { particles_nb: 4 }
            }
        }
    });

    // Smooth Scroll for Links
    document.querySelectorAll('.smooth-scroll').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dark Mode Toggle
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    darkModeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Close Navbar after click on link
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbar = document.getElementById('navbarNav');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('show')) {
                navbarToggler.click(); // Simulate a click to rely on Bootstrap's toggling
            }
        });
    });
});
