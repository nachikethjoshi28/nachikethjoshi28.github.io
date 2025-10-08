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

// Initialize EmailJS with your User ID
(function() {
    emailjs.init("YOUR_USER_ID"); // e.g., "user_ghi789"
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const params = {
        name: document.getElementById('user_name').value,
        email: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    // Send email via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params) // e.g., "service_def456", "template_abc123"
        .then(function(response) {
            alert('Message sent successfully! Thank you for reaching out.');
            document.getElementById('contact-form').reset(); // Clear form
        }, function(error) {
            alert('Failed to send message. Please try again or email me directly.');
            console.log('EmailJS Error:', error);
        });
});

// // EmailJS Initialization and Form Handling
// (function() {
//     emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
// })();

// const contactForm = document.getElementById('contactForm');
// const formMessage = document.getElementById('formMessage');

// contactForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = new FormData(contactForm);
//     const templateParams = {
//         from_name: formData.get('name') || contactForm.querySelector('input[type="text"]').value,
//         from_email: formData.get('email') || contactForm.querySelector('input[type="email"]').value,
//         message: formData.get('message') || contactForm.querySelector('textarea').value
//     };

//     emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace with your IDs
//         .then(function(response) {
//             formMessage.textContent = 'Message sent successfully!';
//             formMessage.className = 'form-message success';
//             contactForm.reset();
//         }, function(error) {
//             formMessage.textContent = 'Failed to send message. Please try again.';
//             formMessage.className = 'form-message error';
//             console.error('EmailJS error:', error);
//         });
        
// });
