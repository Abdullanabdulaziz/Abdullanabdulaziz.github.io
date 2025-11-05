document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    const aboutMeBtn = document.getElementById('aboutMeBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.querySelector('.back-to-top');

    // Show home section by default
    showSection(homeSection);

    // Event Listeners
    viewProjectsBtn?.addEventListener('click', () => showSection(projectsSection));
    aboutMeBtn?.addEventListener('click', () => showSection(aboutSection));

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });

    // Back to top button
    backToTopBtn?.addEventListener('click', () => {
        showSection(homeSection);
    });

    // Show section with smooth transition
    function showSection(sectionToShow) {
        // Hide all sections
        [homeSection, aboutSection, projectsSection, contactSection].forEach(section => {
            if (section) {
                section.classList.add('d-none');
                section.classList.remove('section-visible');
            }
        });

        // Show the selected section
        if (sectionToShow) {
            sectionToShow.classList.remove('d-none');
            setTimeout(() => {
                sectionToShow.classList.add('section-visible');
                // Update URL without page reload
                history.pushState(null, '', `#${sectionToShow.id}`);
                // Update active nav link
                updateActiveNav(sectionToShow.id);
                // Scroll to top
                window.scrollTo(0, 0);
            }, 50);
        }
    }

    // Update active navigation link
    function updateActiveNav(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash) || homeSection;
        showSection(targetSection);
    });

    // Initialize based on URL hash
    if (window.location.hash) {
        const targetSection = document.getElementById(window.location.hash.substring(1));
        if (targetSection) {
            showSection(targetSection);
        }
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
