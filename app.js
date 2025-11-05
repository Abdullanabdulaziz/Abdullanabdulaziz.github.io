document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const pageContent = document.getElementById('page-content');
    const homeLink = document.getElementById('home-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const dotsMenuToggle = document.querySelector('.dots-menu-toggle');
    const header = document.querySelector('.header');
    const body = document.body;
    let currentPage = 'home';
    let isTransitioning = false;

    // Handle navigation
    function navigateTo(page) {
        if (page === currentPage || isTransitioning) return;
        
        isTransitioning = true;
        currentPage = page;
        
        // Update active state for navigation links
        navLinks.forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Handle home page
        if (page === 'home') {
            document.querySelector('.hero-section').classList.add('active');
            pageContent.style.opacity = '0';
            
            setTimeout(() => {
                pageContent.innerHTML = '';
                pageContent.style.display = 'none';
                document.querySelector('.hero-section').style.display = 'block';
                
                setTimeout(() => {
                    document.querySelector('.hero-section').style.opacity = '1';
                    isTransitioning = false;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 50);
            }, 300);
            return;
        }

        // Load page content
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                // Hide hero section when navigating to other pages
                document.querySelector('.hero-section').classList.remove('active');
                
                // Update page content with fade transition
                pageContent.style.opacity = '0';
                
                setTimeout(() => {
                    pageContent.innerHTML = html;
                    pageContent.style.display = 'block';
                    
                    // Load page-specific styles
                    const pageStyles = document.getElementById('page-styles');
                    pageStyles.href = `css/${page}.css`;
                    
                    // Initialize animations for the new content
                    if (typeof ScrollReveal !== 'undefined') {
                        ScrollReveal().reveal('.animate-on-scroll', {
                            delay: 200,
                            distance: '20px',
                            duration: 800,
                            easing: 'cubic-bezier(0.5, 0, 0, 1)',
                            interval: 200,
                            reset: true
                        });
                    }
                    
                    // Scroll to top with a slight delay to allow content to render
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        pageContent.style.opacity = '1';
                        isTransitioning = false;
                    }, 50);
                }, 300);
            })
            .catch(error => {
                console.error('Error loading page:', error);
                isTransitioning = false;
            });
    }

    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
            
            // Close mobile menu if open
            if (header.classList.contains('menu-open')) {
                header.classList.remove('menu-open');
                dotsMenuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Home link
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
    });

    // Handle back/forward browser navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '') || 'home';
        navigateTo(hash);
    });

    // Initialize page based on URL hash
    const initialHash = window.location.hash.replace('#', '') || 'home';
    navigateTo(initialHash);

    // Add smooth scrolling for anchor links within the same page
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]') && !e.target.dataset.page) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
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
    });
});
