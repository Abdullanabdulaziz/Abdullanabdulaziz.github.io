/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener('click', ()=> {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle','nav-menu');

/*===== REMOVE MOBILE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');
function linkAction(){
    document.getElementById('nav-menu').classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
    const scrollDown = window.scrollY;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*===== HEADER BACKGROUND OPACITY ON SCROLL =====*/
const headerBgScroll = () => {
    const header = document.querySelector('.l-header');
    const scrollY = window.scrollY;
    
    if(scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = '';
        header.style.backdropFilter = '';
        header.style.boxShadow = '';
    }
};
window.addEventListener('scroll', headerBgScroll);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});  

/*===== SKILLS ANIMATION ON SCROLL (IntersectionObserver) =====*/
const skillBars = document.querySelectorAll('.skills__bar');

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillsObserver.observe(bar));

/*===== CONTACT FORM VALIDATION =====*/
const contactForm = document.getElementById('contactForm');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

// Validation functions
const validateName = (name) => {
    return name.trim().length >= 2;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateMessage = (message) => {
    return message.trim().length >= 10;
};

// Show error function
const showError = (errorElement, message) => {
    errorElement.textContent = message;
    errorElement.classList.add('show');
};

// Hide error function
const hideError = (errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
};

// Real-time validation
const nameInput = contactForm.querySelector('input[name="name"]');
const emailInput = contactForm.querySelector('input[name="email"]');
const messageInput = contactForm.querySelector('textarea[name="message"]');

nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameError, 'Name must be at least 2 characters long');
    } else {
        hideError(nameError);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailError, 'Please enter a valid email address');
    } else {
        hideError(emailError);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageError, 'Message must be at least 10 characters long');
    } else {
        hideError(messageError);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    hideError(nameError);
    hideError(emailError);
    hideError(messageError);
    successMessage.classList.remove('show');
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError(nameError, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageError, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Create mailto link with form data
        const subject = encodeURIComponent('Portfolio Contact Form Submission');
        const body = encodeURIComponent(
            `Name: ${nameInput.value}\n` +
            `Email: ${emailInput.value}\n` +
            `Message: ${messageInput.value}`
        );
        const mailtoLink = `mailto:abdallahnabil830@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});
