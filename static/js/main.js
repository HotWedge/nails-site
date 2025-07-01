// Main JavaScript file for Nail Studio landing page

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 11 digits (1 for country code + 10 for number)
            if (value.length > 11) {
                value = value.substr(0, 11);
            }
            
            // Format the number
            let formattedValue = '';
            if (value.length > 0) {
                if (value.length <= 1) {
                    formattedValue = '+7';
                } else if (value.length <= 4) {
                    formattedValue = '+7 (' + value.substr(1);
                } else if (value.length <= 7) {
                    formattedValue = '+7 (' + value.substr(1, 3) + ') ' + value.substr(4);
                } else if (value.length <= 9) {
                    formattedValue = '+7 (' + value.substr(1, 3) + ') ' + value.substr(4, 3) + '-' + value.substr(7);
                } else {
                    formattedValue = '+7 (' + value.substr(1, 3) + ') ' + value.substr(4, 3) + '-' + value.substr(7, 2) + '-' + value.substr(9);
                }
            }
            
            e.target.value = formattedValue;
        });
        
        // Set initial format
        phoneInput.addEventListener('focus', function(e) {
            if (e.target.value === '') {
                e.target.value = '+7 (';
            }
        });
        
        phoneInput.addEventListener('blur', function(e) {
            if (e.target.value === '+7 (') {
                e.target.value = '';
            }
        });
    }

    // Form validation
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showFieldError(nameInput, 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else {
                removeFieldError(nameInput);
            }
            
            // Validate phone
            const phoneValue = phoneInput.value.replace(/\D/g, '');
            if (phoneValue.length < 11) {
                showFieldError(phoneInput, 'Пожалуйста, введите корректный номер телефона');
                isValid = false;
            } else {
                removeFieldError(phoneInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Field error handling
    function showFieldError(field, message) {
        removeFieldError(field);
        
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeFieldError(field) {
        field.classList.remove('is-invalid');
        
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Auto-dismiss alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert.classList.contains('show')) {
                alert.classList.remove('show');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    });

    // Add loading animation to form submit button
    const submitBtn = document.querySelector('.booking-form button[type="submit"]');
    
    if (submitBtn && bookingForm) {
        bookingForm.addEventListener('submit', function() {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправка...';
            submitBtn.disabled = true;
            
            // Re-enable button after 3 seconds (in case of error)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add animation to statistics or counters (if needed in the future)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Initialize tooltips (if Bootstrap tooltips are needed)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Social media link tracking (for analytics)
    const socialLinks = document.querySelectorAll('.social-btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.classList.contains('telegram') ? 'telegram' :
                           this.classList.contains('whatsapp') ? 'whatsapp' :
                           this.classList.contains('vk') ? 'vk' : 'unknown';
            
            // Here you could add analytics tracking
            console.log(`Social link clicked: ${platform}`);
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for additional animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements that need additional animation
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .contact-card');
    animatedElements.forEach(el => observer.observe(el));

    console.log('Nail Studio website initialized successfully!');
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent features
    AOS.refresh();
}, 250));
