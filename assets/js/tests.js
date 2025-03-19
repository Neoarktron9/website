// Testing and optimization for Rose Being Unhinged

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Run browser compatibility tests
    testBrowserCompatibility();
    
    // Run accessibility tests
    testAccessibility();
    
    // Run performance optimizations
    optimizePerformance();
    
    // Add console message for developers
    console.log('Rose Being Unhinged - Testing and optimization module loaded');
});

// Test browser compatibility
function testBrowserCompatibility() {
    // Detect browser
    const userAgent = navigator.userAgent;
    let browser = 'unknown';
    
    if (userAgent.indexOf('Edge') > -1 || userAgent.indexOf('Edg') > -1) {
        browser = 'edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browser = 'chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browser = 'firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browser = 'ie';
    }
    
    // Add browser class to body
    document.body.classList.add(`browser-${browser}`);
    
    // Apply browser-specific fixes
    switch (browser) {
        case 'safari':
            // Fix for Safari flexbox issues
            const flexElements = document.querySelectorAll('.videos-grid, .about-container, .footer-container');
            flexElements.forEach(el => {
                el.classList.add('safari-flex-fix');
            });
            
            // Fix for Safari video playback
            const videoWrappers = document.querySelectorAll('.video-wrapper');
            videoWrappers.forEach(wrapper => {
                wrapper.classList.add('safari-video-fix');
            });
            break;
            
        case 'ie':
            // Show warning for IE users
            const ieWarning = document.createElement('div');
            ieWarning.className = 'browser-warning';
            ieWarning.innerHTML = `
                <div class="container">
                    <p><strong>Internet Explorer is not fully supported.</strong> For the best experience, please use a modern browser like Chrome, Firefox, Edge, or Safari.</p>
                    <button class="close-warning">×</button>
                </div>
            `;
            document.body.insertBefore(ieWarning, document.body.firstChild);
            
            // Add close functionality
            const closeButton = ieWarning.querySelector('.close-warning');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    ieWarning.style.display = 'none';
                });
            }
            
            // Apply IE-specific fixes
            document.body.classList.add('ie-fixes');
            break;
            
        case 'edge':
            // Fix for older Edge versions
            if (userAgent.indexOf('Edge') > -1) {
                const particlesContainer = document.querySelector('.particles-container');
                if (particlesContainer) {
                    particlesContainer.classList.add('edge-particles-fix');
                }
            }
            break;
    }
    
    // Test for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        // Add fallback for grid layout
        const gridElements = document.querySelectorAll('.videos-grid');
        gridElements.forEach(el => {
            el.classList.add('no-grid-fallback');
        });
    }
    
    // Test for Flexbox support
    if (!CSS.supports('display', 'flex')) {
        // Add fallback for flexbox layout
        document.body.classList.add('no-flexbox-fallback');
    }
    
    // Log browser compatibility info
    console.log(`Browser detected: ${browser}`);
    console.log('CSS Grid support: ' + (CSS.supports('display', 'grid') ? 'Yes' : 'No'));
    console.log('Flexbox support: ' + (CSS.supports('display', 'flex') ? 'Yes' : 'No'));
}

// Test accessibility
function testAccessibility() {
    // Add focus outlines for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    // Remove focus outlines for mouse users
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    // Ensure all interactive elements have appropriate ARIA attributes
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            console.warn('Button without aria-label or text content:', button);
        }
    });
    
    // Ensure all images have alt text
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt')) {
            console.warn('Image without alt text:', img);
            img.alt = ''; // Add empty alt for decorative images
        }
    });
    
    // Add role attributes to improve screen reader experience
    const nav = document.querySelector('nav');
    if (nav && !nav.hasAttribute('role')) {
        nav.setAttribute('role', 'navigation');
    }
    
    const main = document.querySelector('main');
    if (main && !main.hasAttribute('role')) {
        main.setAttribute('role', 'main');
    }
    
    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.substring(1));
        
        if (level - lastLevel > 1 && lastLevel !== 0) {
            console.warn('Heading level skipped:', heading);
        }
        
        lastLevel = level;
    });
    
    // Add skip to content link functionality
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    }
    
    // Log accessibility test completion
    console.log('Accessibility tests completed');
}

// Optimize performance
function optimizePerformance() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Lazy load videos
    const videoItems = document.querySelectorAll('.video-item');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoItem = entry.target;
                    const iframe = videoItem.querySelector('iframe');
                    
                    if (iframe && iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                    }
                    
                    videoObserver.unobserve(videoItem);
                }
            });
        }, {
            rootMargin: '200px'
        });
        
        videoItems.forEach(item => {
            videoObserver.observe(item);
        });
    }
    
    // Optimize animations
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (reducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduced-motion');
    } else {
        // Optimize animations for better performance
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animatedElements.forEach(el => {
                animationObserver.observe(el);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            animatedElements.forEach(el => {
                el.classList.add('active');
            });
        }
    }
    
    // Optimize particle effects
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        // Reduce particle count on mobile devices
        if (window.innerWidth < 768) {
            // Remove some particles to improve performance
            const particles = particlesContainer.querySelectorAll('.particle');
            for (let i = 0; i < particles.length; i++) {
                if (i % 2 === 0) { // Remove every other particle
                    particles[i].remove();
                }
            }
        }
    }
    
    // Debounce scroll and resize events
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Replace scroll event handlers with debounced versions
    const scrollHandlers = window._originalScrollHandlers || [];
    window.addEventListener('scroll', debounce(function() {
        scrollHandlers.forEach(handler => handler());
    }, 100));
    
    // Log performance optimizations
    console.log('Performance optimizations applied');
}

// Add console message for developers
console.log('Rose Being Unhinged - Test module loaded');
