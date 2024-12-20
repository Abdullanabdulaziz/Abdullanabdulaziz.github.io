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
        },
        retina_detect: true
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

    // Navbar Toggle Fix Using Bootstrap Events
    const navbar = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Close navbar when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
            bsCollapse.hide();
        });
    });

    // Synchronize Navbar Toggler
    navbar.addEventListener('hide.bs.collapse', () => {
        navbarToggler.classList.add('collapsed');
        navbarToggler.setAttribute('aria-expanded', 'false');
    });

    navbar.addEventListener('show.bs.collapse', () => {
        navbarToggler.classList.remove('collapsed');
        navbarToggler.setAttribute('aria-expanded', 'true');
    });
});
