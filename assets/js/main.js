// Main JavaScript file for Rose Being Unhinged

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoading();
    
    // Initialize animations
    initAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize video gallery
    initVideoGallery();
    
    // Initialize particle background
    initParticles();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize modals
    initModals();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize theme toggle
    initThemeToggle();
});

// Loading screen functionality
function initLoading() {
    const loading = document.querySelector('.loading');
    
    if (loading) {
        // Hide loading screen after content is loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                loading.classList.add('hidden');
                
                // Remove loading screen from DOM after transition
                setTimeout(function() {
                    loading.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Initialize animations
function initAnimations() {
    // Animate title text
    animateTitle();
    
    // Animate elements when they come into view
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
}

// Animate title text with glitch effect
function animateTitle() {
    const titleText = 'Rose Being Unhinged';
    const titleContainer = document.getElementById('animated-title');
    
    if (!titleContainer) return;
    
    // Clear the original text
    titleContainer.innerHTML = '';
    
    // Create spans for each letter
    [...titleText].forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('title-letter');
        span.style.animationDelay = `${index * 0.05}s`;
        titleContainer.appendChild(span);
        
        // Add glitch effect randomly
        if (Math.random() > 0.7) {
            span.classList.add('glitch');
        }
    });
    
    // Add random glitch effect periodically
    setInterval(() => {
        const letters = document.querySelectorAll('.title-letter');
        letters.forEach(letter => {
            letter.classList.remove('glitch');
        });
        
        // Add glitch to random letters
        const randomCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < randomCount; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            letters[randomIndex].classList.add('glitch');
        }
    }, 2000);
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize navigation
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle aria-expanded attribute
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !expanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navList.contains(event.target) && navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Add smooth scrolling to navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        if (navList.classList.contains('active')) {
                            navList.classList.remove('active');
                            navToggle.classList.remove('active');
                            navToggle.setAttribute('aria-expanded', 'false');
                        }
                        
                        // Scroll to target
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Adjust for header height
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Add header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Initialize video gallery
function initVideoGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');
    
    if (filterButtons.length && videoItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter videos
                videoItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const category = item.getAttribute('data-category');
                        if (category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Add click event to video items to open modal
        videoItems.forEach(item => {
            item.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                if (videoId) {
                    openVideoModal(videoId);
                }
            });
        });
    }
}

// Initialize particle background
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const particleX = parseInt(particle.style.left);
            const particleY = parseInt(particle.style.top);
            
            const dx = mouseX - particleX;
            const dy = mouseY - particleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const tx = Math.cos(angle) * 2;
                const ty = Math.sin(angle) * 2;
                
                particle.style.transform = `translate(${-tx}px, ${-ty}px)`;
            } else {
                particle.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// Create a single particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 3 + 1;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random color
    const colors = ['#6200EA', '#FF4081', '#00BCD4'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Set styles
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.backgroundColor = color;
    
    // Add animation
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    
    container.appendChild(particle);
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize modals
function initModals() {
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalClose) {
        // Close modal when close button is clicked
        modalClose.addEventListener('click', function() {
            closeVideoModal();
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
        
        // Close modal when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }
}

// Open video modal
function openVideoModal(videoId) {
    const modal = document.querySelector('.modal');
    const modalVideoWrapper = document.querySelector('.modal-video-wrapper');
    
    if (modal && modalVideoWrapper) {
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        
        // Clear previous content and add iframe
        modalVideoWrapper.innerHTML = '';
        modalVideoWrapper.appendChild(iframe);
        
        // Show modal
        modal.classList.add('active');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
}

// Close video modal
function closeVideoModal() {
    const modal = document.querySelector('.modal');
    const modalVideoWrapper = document.querySelector('.modal-video-wrapper');
    
    if (modal && modalVideoWrapper) {
        // Hide modal
        modal.classList.remove('active');
        
        // Clear iframe to stop video
        setTimeout(() => {
            modalVideoWrapper.innerHTML = '';
        }, 300);
        
        // Enable body scroll
        document.body.style.overflow = '';
    }
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const videoItems = document.querySelectorAll('.video-item');
    
    if (searchInput && videoItems.length) {
        // Search function
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all videos if search is empty
                videoItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Filter videos based on search term
            videoItems.forEach(item => {
                const title = item.querySelector('.video-title').textContent.toLowerCase();
                const description = item.querySelector('.video-description')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };
        
        // Search on input
        searchInput.addEventListener('input', performSearch);
        
        // Search on button click
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch();
            });
        }
        
        // Search on enter key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        // Apply saved theme if it exists
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('light-theme')) {
                // Switch to dark theme
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                // Switch to light theme
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}
