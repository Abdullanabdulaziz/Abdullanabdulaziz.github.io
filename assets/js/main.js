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
