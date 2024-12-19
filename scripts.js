document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll
    const links = document.querySelectorAll('.smooth-scroll');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').slice(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll reveal for elements
    const revealElements = document.querySelectorAll('.project-card, .hero, .about-section, .testimonial');
    ScrollReveal().reveal(revealElements, { delay: 200, distance: '50px', duration: 800 });

    // Dark mode toggle
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    darkModeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});
