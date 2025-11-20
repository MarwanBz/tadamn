// Speakers Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
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

    // Observe all speaker cards
    const cards = document.querySelectorAll('.speaker-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Interactive card effects
function initCardInteractions() {
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    speakerCards.forEach(card => {
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
        
        // Click to expand (optional future feature)
        card.addEventListener('click', function() {
            console.log('Speaker card clicked:', this.querySelector('.speaker-name').textContent);
            // Future: Could open a modal with more speaker details
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
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-12px)
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

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
            header.style.background = 'rgba(15, 31, 30, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 31, 30, 0.95)';
        }
    });
}

// Accessibility enhancements
function initAccessibility() {
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    speakerCards.forEach(card => {
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `معلومات عن ${card.querySelector('.speaker-name').textContent}`);
        
        // Add keyboard support
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
        
        // Add focus styles
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

// Filter speakers by badge type (future feature)
function filterSpeakers(type) {
    const cards = document.querySelectorAll('.speaker-card');
    
    cards.forEach(card => {
        const badge = card.querySelector('.speaker-badge');
        if (!badge) return;
        
        if (type === 'all' || badge.textContent === type) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Add loading complete class
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content-wrapper');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// Performance optimization: Debounce scroll events
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
        initCardInteractions,
        filterSpeakers
    };
}
