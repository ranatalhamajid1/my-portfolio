/**
 * ============================================================
 * PORTFOLIO — Main JavaScript
 * Author: Rana Muhammad Talha Majid
 * Modern ES6+ | Vanilla JS | No Dependencies
 * ============================================================
 */

'use strict';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initCounters();
    initContactForm();
    initBackToTop();
    initCharCounter();
    console.log('🚀 Portfolio loaded successfully');
});

// ===================================================================
// PRELOADER
// ===================================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => preloader.remove(), 500);
        }, 1600);
    });
}

// ===================================================================
// THEME TOGGLE (Dark / Light)
// ===================================================================
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (!toggle || !icon) return;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===================================================================
// NAVIGATION
// ===================================================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // --- Navbar scroll effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // --- Hamburger toggle ---
    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        // Lock body scroll when menu open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // --- Close menu on link click ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // --- Active link on scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- Smooth scroll for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// ===================================================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ===================================================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    elements.forEach(el => observer.observe(el));
}

// ===================================================================
// TYPING EFFECT
// ===================================================================
function initTypingEffect() {
    const element = document.getElementById('typed-text');
    if (!element) return;

    const roles = [
        'Full Stack Developer',
        'Cybersecurity Enthusiast',
        'Video Editor',
        'UI/UX Designer',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        // Finished typing the word
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        }

        // Finished deleting the word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Small pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start after a brief delay
    setTimeout(type, 1000);
}

// ===================================================================
// SKILL BARS ANIMATION
// ===================================================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                // Small delay for stagger effect
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================================================
// COUNTER ANIMATION
// ===================================================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * easeOut);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }
}

// ===================================================================
// CONTACT FORM
// ===================================================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Get values
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        // Validate
        let isValid = true;

        if (!name) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.length > 100) {
            showFieldError('name', 'Name must be under 100 characters');
            isValid = false;
        }

        if (!email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!message) {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (message.length > 2000) {
            showFieldError('message', 'Message must be under 2000 characters');
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showToast('Message sent successfully! I\'ll get back to you soon. 🎉', 'success');
                form.reset();
                document.getElementById('char-current').textContent = '0';
            } else {
                showToast(data.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showToast('Network error. Please check your connection or email me directly at talhamajid404@gmail.com', 'error');
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'inline-flex';
            btnLoading.style.display = 'none';
        }
    });

    function showFieldError(field, message) {
        const errorEl = document.getElementById(`${field}-error`);
        const inputWrapper = form.querySelector(`[name="${field}"]`).closest('.input-wrapper');
        if (errorEl) errorEl.textContent = message;
        if (inputWrapper) inputWrapper.classList.add('error');
    }

    function clearErrors() {
        form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        form.querySelectorAll('.input-wrapper.error').forEach(el => el.classList.remove('error'));
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// ===================================================================
// CHARACTER COUNTER
// ===================================================================
function initCharCounter() {
    const messageField = document.getElementById('message');
    const charCurrent = document.getElementById('char-current');
    if (!messageField || !charCurrent) return;

    messageField.addEventListener('input', () => {
        charCurrent.textContent = messageField.value.length;
    });
}

// ===================================================================
// BACK TO TOP
// ===================================================================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===================================================================
// TOAST NOTIFICATIONS
// ===================================================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
    };

    toast.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}