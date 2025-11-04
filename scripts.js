// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===== Preloader =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // ===== Particles.js Configuration =====
    if (document.getElementById('particles-js')) {
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
                    value: '#0d6efd' 
                },
                shape: { 
                    type: 'circle' 
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
                    color: '#0d6efd',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
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
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // ===== Dark Mode Toggle =====
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved user preference, if any, on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check system preference if no user preference is set
        enableDarkMode();
    }

    // Toggle dark mode
    function toggleDarkMode() {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    function enableDarkMode() {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        themeIcon.className = 'bi bi-sun';
        localStorage.setItem('darkMode', 'enabled');
        
        // Update particles color for dark mode
        if (window.pJSDom && window.pJSDom.length > 0) {
            pJSDom[0].pJS.particles.color.value = '#ffffff';
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
        themeIcon.className = 'bi bi-moon';
        localStorage.setItem('darkMode', 'disabled');
        
        // Update particles color for light mode
        if (window.pJSDom && window.pJSDom.length > 0) {
            pJSDom[0].pJS.particles.color.value = '#0d6efd';
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDarkScheme.addEventListener('change', (e) => {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Trigger scroll event on page load
        window.dispatchEvent(new Event('scroll'));
    }

    // ===== Back to Top Button =====
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Project Filtering =====
    const filterButtons = document.querySelectorAll('.project-filters .btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        // Trigger AOS animation
                        item.setAttribute('data-aos', 'fade-up');
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Refresh AOS to trigger animations
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            });
        });
    }

    // ===== Project Modals =====
    const projectModals = document.querySelectorAll('.project-modal');
    
    // Initialize Bootstrap modals
    if (projectModals.length > 0) {
        projectModals.forEach(modal => {
            // Add click event to open modal buttons
            const modalId = modal.getAttribute('id');
            const openButtons = document.querySelectorAll(`[data-bs-target="#${modalId}"]`);
            
            openButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const projectCard = this.closest('.project-card');
                    if (projectCard) {
                        const title = projectCard.querySelector('.project-title').textContent;
                        const description = projectCard.querySelector('.project-description').textContent;
                        const imageSrc = projectCard.querySelector('.project-img img').src;
                        
                        // Update modal content
                        const modal = new bootstrap.Modal(document.getElementById(modalId));
                        const modalTitle = modal._element.querySelector('.modal-title');
                        const modalBody = modal._element.querySelector('.modal-body');
                        
                        if (modalTitle) modalTitle.textContent = title;
                        if (modalBody) {
                            // You can customize the modal content here
                            modalBody.innerHTML = `
                                <div class="row">
                                    <div class="col-md-6">
                                        <img src="${imageSrc}" alt="${title}" class="img-fluid rounded mb-3">
                                    </div>
                                    <div class="col-md-6">
                                        <p>${description}</p>
                                        <div class="project-details">
                                            <!-- Add more project details here -->
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        
                        modal.show();
                    }
                });
            });
        });
    }

    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contactForm');
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
            // For now, we'll just show a success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.role = 'alert';
                alertDiv.innerHTML = 'Thank you for your message! I will get back to you soon.';
                
                // Remove any existing alerts
                const existingAlert = this.querySelector('.alert');
                if (existingAlert) {
                    existingAlert.remove();
                }
                
                this.appendChild(alertDiv);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Scroll to the alert
                alertDiv.scrollIntoView({ behavior: 'smooth' });
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
                
            }, 1500);
        });
    }

    // ===== Initialize AOS (Animate On Scroll) =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // ===== Initialize Typed.js for typing effect =====
    if (typeof Typed !== 'undefined') {
        const typedElements = document.querySelectorAll('.typed-text');
        if (typedElements.length > 0) {
            typedElements.forEach(element => {
                const strings = JSON.parse(element.getAttribute('data-typed-items'));
                if (strings && strings.length > 0) {
                    new Typed(element, {
                        strings: strings,
                        typeSpeed: 100,
                        backSpeed: 50,
                        backDelay: 2000,
                        loop: true,
                        showCursor: true,
                        cursorChar: '|',
                        autoInsertCss: true
                    });
                }
            });
        }
    }

    // ===== Initialize tooltips =====
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ===== Initialize popovers =====
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // ===== Skill Progress Bars Animation =====
    function animateSkills() {
        const skills = document.querySelectorAll('.progress');
        skills.forEach(skill => {
            const value = skill.getAttribute('data-value');
            const progressBar = skill.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = value + '%';
                }, 100);
            }
        });
    }

    // Animate skills when they come into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // ===== Scroll Reveal Animation =====
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on page load
});