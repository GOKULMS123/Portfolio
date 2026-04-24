document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Apply reveal class to sections
    const sections = document.querySelectorAll('.section, .hero-content, .project-card, .skill-card, .achievement-card');
    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.height = '70px';
            nav.style.background = 'rgba(11, 11, 11, 0.95)';
        } else {
            nav.style.height = '80px';
            nav.style.background = 'rgba(17, 17, 17, 0.8)';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and X
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // Form submission (Prevent default for demo)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! This is a demo portfolio.');
        });
    }

    // Resume download alert
    const resumeBtn = document.getElementById('resume-download');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            const link = resumeBtn.getAttribute('href');

            if (!link || link === "#" || link.trim() === "") {
                e.preventDefault();
                alert('Resume download will be available once you link your PDF file.');
            }
        });
    }

    // Typing Effect Logic
    const words = [" Fresher", " Software Developer", " Java Backend Developer", " Java & Python Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextElement = document.getElementById("typingText");

    if (typingTextElement) {
        function typeEffect() {
            let currentWord = words[wordIndex];

            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex--);
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex++);
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length + 1) {
                isDeleting = true;
                speed = 1500; // pause at end
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                charIndex = 0;
                speed = 500; // pause before next word
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Update dot position immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Update outline position with slight delay (handled by CSS transition)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn, .menu-toggle, .contact-icon');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
});


// CSS for reveal animations (Adding dynamically)
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card.reveal { transition-delay: 0.1s; }
    .skill-card.reveal { transition-delay: 0.2s; }
`;
document.head.appendChild(style);

