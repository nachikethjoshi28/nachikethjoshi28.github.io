// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Light/Dark Mode Toggle
const modeToggle = document.getElementById('modeToggle');
const currentTheme = localStorage.getItem('theme');
const html = document.documentElement;

if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

modeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// AOS Initialization (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// EmailJS Initialization and Form Handling
(function() {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
})();

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const templateParams = {
        from_name: formData.get('name') || contactForm.querySelector('input[type="text"]').value,
        from_email: formData.get('email') || contactForm.querySelector('input[type="email"]').value,
        message: formData.get('message') || contactForm.querySelector('textarea').value
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace with your IDs
        .then(function(response) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.className = 'form-message success';
            contactForm.reset();
        }, function(error) {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.className = 'form-message error';
            console.error('EmailJS error:', error);
        });
        
});