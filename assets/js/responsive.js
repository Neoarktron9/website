// Responsive behavior for Rose Being Unhinged

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize responsive navigation
    initResponsiveNavigation();
    
    // Initialize touch detection
    initTouchDetection();
    
    // Initialize responsive video handling
    initResponsiveVideos();
    
    // Initialize responsive image loading
    initResponsiveImages();
    
    // Initialize orientation change handling
    initOrientationChange();
});

// Initialize responsive navigation
function initResponsiveNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update aria attributes
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            
            // Toggle body scroll
            if (!expanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navList.contains(event.target) && navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Add touch-friendly navigation for mobile
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
}

// Initialize touch detection
function initTouchDetection() {
    // Detect touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Add touch-specific behaviors
        const interactiveElements = document.querySelectorAll('.btn, .filter-btn, .video-item, .social-link');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    } else {
        document.body.classList.add('no-touch');
    }
    
    // Add double-tap prevention for iOS
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('touchend', function(e) {
            const now = new Date().getTime();
            const lastTouch = this.getAttribute('data-last-touch') || 0;
            
            if (now - lastTouch < 300) {
                e.preventDefault();
            }
            
            this.setAttribute('data-last-touch', now);
        });
    });
}

// Initialize responsive videos
function initResponsiveVideos() {
    // Adjust video sizes based on container width
    const videoItems = document.querySelectorAll('.video-item');
    
    function adjustVideoSizes() {
        videoItems.forEach(item => {
            const width = item.offsetWidth;
            const videoWrapper = item.querySelector('.video-wrapper');
            
            if (videoWrapper) {
                // Maintain 16:9 aspect ratio
                videoWrapper.style.paddingBottom = '56.25%';
            }
        });
    }
    
    // Initial adjustment
    adjustVideoSizes();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustVideoSizes);
    
    // Implement lazy loading for videos
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const videoItem = entry.target;
                    const iframe = videoItem.querySelector('iframe');
                    
                    if (iframe) {
                        // Load video when in viewport
                        const dataSrc = iframe.getAttribute('data-src');
                        if (dataSrc) {
                            iframe.src = dataSrc;
                            iframe.removeAttribute('data-src');
                        }
                    }
                    
                    // Stop observing after loading
                    observer.unobserve(videoItem);
                }
            });
        }, {
            rootMargin: '100px 0px'
        });
        
        // Observe all video items
        videoItems.forEach(item => {
            videoObserver.observe(item);
        });
    }
}

// Initialize responsive image loading
function initResponsiveImages() {
    // Implement lazy loading for images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                        
                        // Add loaded class for animation
                        img.addEventListener('load', function() {
                            this.classList.add('loaded');
                        });
                    }
                    
                    // Stop observing after loading
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px'
        });
        
        // Observe all images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    }
}

// Initialize orientation change handling
function initOrientationChange() {
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Adjust layout after orientation change
        setTimeout(function() {
            // Recalculate video sizes
            const videoItems = document.querySelectorAll('.video-item');
            videoItems.forEach(item => {
                const width = item.offsetWidth;
                const videoWrapper = item.querySelector('.video-wrapper');
                
                if (videoWrapper) {
                    // Maintain 16:9 aspect ratio
                    videoWrapper.style.paddingBottom = '56.25%';
                }
            });
            
            // Adjust modal position if open
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                const modalContent = activeModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.maxHeight = `${window.innerHeight * 0.9}px`;
                }
            }
        }, 300);
    });
    
    // Add specific styles for landscape orientation on mobile
    function checkOrientation() {
        if (window.innerWidth < 768 && window.innerWidth > window.innerHeight) {
            document.body.classList.add('landscape');
        } else {
            document.body.classList.remove('landscape');
        }
    }
    
    // Check on load
    checkOrientation();
    
    // Check on resize and orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
}

// Detect browser for specific fixes
function detectBrowser() {
    // Add browser-specific classes to body
    const userAgent = navigator.userAgent;
    let browserClass = '';
    
    if (userAgent.indexOf('Edge') > -1) {
        browserClass = 'browser-edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browserClass = 'browser-chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browserClass = 'browser-safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browserClass = 'browser-firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browserClass = 'browser-ie';
    }
    
    document.body.classList.add(browserClass);
    
    // Apply browser-specific fixes
    if (browserClass === 'browser-safari') {
        // Fix for Safari-specific issues
        const videoWrappers = document.querySelectorAll('.video-wrapper');
        videoWrappers.forEach(wrapper => {
            wrapper.style.webkitBackfaceVisibility = 'hidden';
        });
    }
}

// Call browser detection
detectBrowser();
