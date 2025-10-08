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

// Email Validation Function (from previous guide - keep if you have it)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize EmailJS (keep your User ID)
(function () {
    emailjs.init("k6VS5Tuy8D5xEo3I9");  // e.g., "user_abc123"
})();

// Keep existing functions (isValidEmail, emailjs.init)

// Global variables for verification (to access across functions)
let verificationCode = '';  // Store the generated code
let originalSubmitBtn = null;  // To hide/show submit button

// Resend Function (for the button)
function resendCode() {
    const email = document.getElementById('user_email').value.trim();
    const name = document.getElementById('user_name').value.trim();
    if (!email) return;

    // Regenerate and send new code
    verificationCode = Math.random().toString(36).substring(7).toUpperCase();
    console.log('Resent code:', verificationCode);

    emailjs.send("service_kol9kvh", "template_1im8j1f", {
        to_email: email,
        name: name,
        verification_code: verificationCode
    })
    .then(function(response) {
        console.log('Resend success');
        alert('New code sent! Check your email.');
        startResendTimer();  // Optional timer
    }, function(error) {
        console.log('Resend error:', error);
        alert('Failed to resend. Try again.');
    });
}

// Optional: Resend Timer (disables button for 60s)
function startResendTimer() {
    let timeLeft = 60;
    const timerEl = document.getElementById('resend-timer');
    const resendBtn = document.getElementById('resend-btn');
    resendBtn.disabled = true;
    resendBtn.textContent = 'Resend (60s)';
    timerEl.textContent = 'New code sent. You can resend in 60 seconds.';

    const interval = setInterval(() => {
        timeLeft--;
        resendBtn.textContent = `Resend (${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend Code';
            timerEl.textContent = '';
        }
    }, 1000);
}

// Form Submission Handler
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values and validate (keep your existing code)
    const name = document.getElementById('user_name').value.trim();
    const email = document.getElementById('user_email').value.trim();
    const message = document.getElementById('message').value.trim();

    const errorDiv = document.getElementById('form-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }

    if (!name || !email || !message) {
        if (errorDiv) {
            errorDiv.textContent = 'Please fill in all fields.';
            errorDiv.style.display = 'block';
        }
        return;
    }

    if (!isValidEmail(email)) {
        if (errorDiv) {
            errorDiv.textContent = 'Please enter a valid email address.';
            errorDiv.style.display = 'block';
        }
        document.getElementById('user_email').focus();
        return;
    }

    // Hide submit button and show verification section
    originalSubmitBtn = event.target.querySelector('button[type="submit"]');
    if (originalSubmitBtn) originalSubmitBtn.style.display = 'none';

    document.getElementById('user-email-display').textContent = email;
    document.getElementById('verify-section').style.display = 'block';
    document.getElementById('code-input').focus();  // Auto-focus input

    // Step 1: Generate and Send Verification Code
    verificationCode = Math.random().toString(36).substring(7).toUpperCase();
    console.log('Generated code:', verificationCode);

    emailjs.send("service_kol9kvh", "template_1im8j1f", {
        to_email: email,
        name: name,
        verification_code: verificationCode
    })
    .then(function(response) {
        console.log('Verification sent:', response);
        // Section is already shown; user can now enter code
    }, function(error) {
        console.log('Verification error:', error);
        alert('Failed to send code. Please try again.');
        if (originalSubmitBtn) originalSubmitBtn.style.display = 'block';
        document.getElementById('verify-section').style.display = 'none';
    });
});

// Handle Verify Button Click (outside submit handler)
document.getElementById('verify-btn').addEventListener('click', function() {
    const userCode = document.getElementById('code-input').value.trim().toUpperCase();
    const errorEl = document.getElementById('code-error');

    if (!userCode) {
        errorEl.textContent = 'Please enter the code.';
        errorEl.style.display = 'block';
        return;
    }

    if (userCode === verificationCode) {
        // Success: Send Main Email
        const email = document.getElementById('user_email').value.trim();
        const name = document.getElementById('user_name').value.trim();
        const message = document.getElementById('message').value.trim();

        const mainParams = { name, email, message };
        emailjs.send("service_kol9kvh", "template_yu5nd45", mainParams)
        .then(function(mainResponse) {
            console.log('Main email sent:', mainResponse);
            alert('Message verified and sent successfully! I\'ll reply soon.');
            // Reset form and hide verification
            document.getElementById('contact-form').reset();
            document.getElementById('verify-section').style.display = 'none';
            if (originalSubmitBtn) originalSubmitBtn.style.display = 'block';
        }, function(mainError) {
            console.log('Main error:', mainError);
            alert('Verification passed, but send failed. Try again.');
        });
    } else {
        errorEl.textContent = 'Invalid code. Check your email and try again.';
        errorEl.style.display = 'block';
        document.getElementById('code-input').value = '';  // Clear input
        document.getElementById('code-input').focus();
    }
});

// Enter Key Support (for code input)
document.getElementById('code-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('verify-btn').click();  // Trigger verify on Enter
    }
});
