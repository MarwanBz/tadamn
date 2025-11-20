// Categories Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initCardAnimations();
    initScrollEffects();
    initParallax();
    initAccessibility();
});

// Card Hover Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach(card => {
        // Mouse move effect for card tilt
        card.addEventListener('mousemove', (e) => {
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
                translateY(-8px)
                scale3d(1.02, 1.02, 1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
        });
        
        // Click animation
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            animateCardClick(this, category);
        });
    });
}

// Animate card click
function animateCardClick(card, category) {
    // Add pulse animation
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'pulse 0.6s ease-out';
    }, 10);
    
    // Log category selection (can be used for analytics)
    console.log(`Category selected: ${category}`);
    
    // Optional: Show a toast notification
    showToast(`تم اختيار فئة: ${card.querySelector('.card-title').textContent}`);
}

// Toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(26, 46, 45, 0.95);
        color: var(--primary);
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(196, 162, 79, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-weight: 600;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Scroll-based animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect to cards
                if (entry.target.classList.contains('category-card')) {
                    const cards = document.querySelectorAll('.category-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.category-card, .cta-section');
    elements.forEach(el => observer.observe(el));
}

// Parallax effect for hero background
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.page-header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        header.style.background = 'rgba(15, 31, 30, 0.98)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(15, 31, 30, 0.95)';
    }
});

// Accessibility improvements
function initAccessibility() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach(card => {
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
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
}

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

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadLink = document.createElement('link');
            preloadLink.href = src;
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            document.head.appendChild(preloadLink);
        }
    });
}

preloadImages();

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
        }, index * 100);
    });
});

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCardAnimations,
        initScrollEffects,
        initParallax,
        showToast
    };
}
