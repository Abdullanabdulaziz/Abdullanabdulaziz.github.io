document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.project-card, .hero, .about-section');
    ScrollReveal().reveal(revealElements, { delay: 200, distance: '50px', duration: 800 });
});
