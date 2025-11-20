// About Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffects();
    initCardInteractions();
    initHeaderEffects();
    initAccessibility();
});

// Scroll-based reveal animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const elements = document.querySelectorAll(
        '.goal-card, .audience-item, .pillar-card, .about-content'
    );
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (!heroGradient) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                
                heroGradient.style.transform = `translateY(${rate}px)`;
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Interactive card effects
function initCardInteractions() {
    // Goal cards 3D tilt effect
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });

    // Pillar cards enhanced hover
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    pillarCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
        
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });

    // Audience items slide effect
    const audienceItems = document.querySelectorAll('.audience-item');
    
    audienceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const bullet = item.querySelector('.audience-bullet');
            if (bullet) {
                bullet.style.transform = 'scale(1.5)';
                bullet.style.boxShadow = '0 0 20px rgba(196, 162, 79, 0.8)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const bullet = item.querySelector('.audience-bullet');
            if (bullet) {
                bullet.style.transform = 'scale(1)';
                bullet.style.boxShadow = '0 0 12px rgba(196, 162, 79, 0.5)';
            }
        });
    });
}

// 3D tilt effect handler
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale3d(1.02, 1.02, 1.02)
    `;
}

// Reset card tilt
function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
}

// Header scroll effects
function initHeaderEffects() {
    const header = document.querySelector('.page-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
            header.style.background = 'rgba(15, 31, 30, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 31, 30, 0.95)';
        }

        lastScroll = currentScroll;
    });
}

// Accessibility enhancements
function initAccessibility() {
    // Make interactive cards keyboard accessible
    const interactiveCards = document.querySelectorAll('.goal-card, .pillar-card, .audience-item');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
        
        card.addEventListener('focus', () => {
            card.style.outline = '2px solid var(--primary)';
            card.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', () => {
            card.style.outline = 'none';
        });
    });

    // Smooth scroll for anchor links
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
}

// Counter animation for stats (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection observer for counting animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Debounce utility for performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading complete class
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger any load-dependent animations
    const heroContent = document.querySelector('.hero-content-wrapper');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// Performance optimization: Use passive event listeners where possible
const passiveSupported = (() => {
    let passive = false;
    try {
        const options = {
            get passive() {
                passive = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive;
})();

const eventOptions = passiveSupported ? { passive: true } : false;

// Add smooth transitions to dynamic elements
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .loaded .hero-content-wrapper {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
`;
document.head.appendChild(style);

// Export functions for potential use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initParallaxEffects,
        initCardInteractions,
        animateCounter
    };
}
