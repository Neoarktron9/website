// Video gallery functionality for Rose Being Unhinged

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video gallery
    initVideoGallery();
    
    // Initialize video modal
    initVideoModal();
    
    // Initialize form interactions
    initFormInteractions();
    
    // Initialize enhanced title effects
    initEnhancedTitleEffects();
});

// Initialize video gallery with enhanced functionality
function initVideoGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');
    
    if (filterButtons.length && videoItems.length) {
        // Add active class to first button by default
        if (!document.querySelector('.filter-btn.active')) {
            filterButtons[0].classList.add('active');
        }
        
        // Add staggered animation to video items on initial load
        gsap.from(videoItems, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
        
        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter videos with animation
                if (filter === 'all') {
                    // Show all videos with staggered animation
                    gsap.to(videoItems, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "back.out(1.7)",
                        clearProps: "all"
                    });
                    
                    videoItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    // First hide all videos
                    videoItems.forEach(item => {
                        const category = item.getAttribute('data-category');
                        
                        if (category !== filter) {
                            gsap.to(item, {
                                opacity: 0,
                                y: 20,
                                scale: 0.9,
                                duration: 0.3,
                                onComplete: function() {
                                    item.style.display = 'none';
                                }
                            });
                        }
                    });
                    
                    // Then show matching videos with staggered animation
                    const matchingVideos = Array.from(videoItems).filter(item => 
                        item.getAttribute('data-category') === filter
                    );
                    
                    setTimeout(() => {
                        matchingVideos.forEach(item => {
                            item.style.display = 'block';
                        });
                        
                        gsap.to(matchingVideos, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.5,
                            stagger: 0.05,
                            ease: "back.out(1.7)",
                            clearProps: "all"
                        });
                    }, 300);
                }
            });
        });
        
        // Add hover effects to video items
        videoItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('.video-info'), {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('.video-info'), {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            // Add click event to open modal
            item.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                if (videoId) {
                    openVideoModal(videoId);
                }
            });
        });
    }
}

// Initialize video modal with enhanced functionality
function initVideoModal() {
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalClose) {
        // Add animation to close button
        modalClose.addEventListener('mouseenter', function() {
            gsap.to(this, {
                rotation: 90,
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        modalClose.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
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

// Open video modal with enhanced animation
function openVideoModal(videoId) {
    const modal = document.querySelector('.modal');
    const modalVideoWrapper = document.querySelector('.modal-video-wrapper');
    
    if (modal && modalVideoWrapper) {
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        
        // Clear previous content and add iframe
        modalVideoWrapper.innerHTML = '';
        modalVideoWrapper.appendChild(iframe);
        
        // Show modal with animation
        modal.classList.add('active');
        
        // Animate modal content
        gsap.fromTo(modal, 
            { backdropFilter: "blur(0px)" },
            { backdropFilter: "blur(5px)", duration: 0.5 }
        );
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
}

// Close video modal with enhanced animation
function closeVideoModal() {
    const modal = document.querySelector('.modal');
    const modalVideoWrapper = document.querySelector('.modal-video-wrapper');
    const modalContent = document.querySelector('.modal-content');
    
    if (modal && modalVideoWrapper && modalContent) {
        // Animate modal out
        gsap.to(modalContent, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
        
        gsap.to(modal, {
            backdropFilter: "blur(0px)",
            duration: 0.5,
            onComplete: function() {
                // Hide modal
                modal.classList.remove('active');
                
                // Reset modal content
                gsap.set(modalContent, {
                    scale: 1,
                    opacity: 1
                });
                
                // Clear iframe to stop video
                setTimeout(() => {
                    modalVideoWrapper.innerHTML = '';
                }, 100);
                
                // Enable body scroll
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize form interactions
function initFormInteractions() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add form submission animation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get submit button
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Animate button
            gsap.to(submitButton, {
                scale: 0.95,
                duration: 0.1,
                onComplete: function() {
                    // Add loading state
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    
                    // Simulate form submission (would be an actual AJAX request in production)
                    setTimeout(() => {
                        // Success animation
                        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                        submitButton.classList.add('submit-success');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button after delay
                        setTimeout(() => {
                            submitButton.innerHTML = 'Send Message';
                            submitButton.classList.remove('submit-success');
                            gsap.to(submitButton, {
                                scale: 1,
                                duration: 0.3,
                                ease: "back.out(1.7)"
                            });
                        }, 2000);
                    }, 1500);
                }
            });
        });
        
        // Add input focus animations
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                gsap.to(this, {
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            input.addEventListener('blur', function() {
                gsap.to(this, {
                    y: 0,
                    boxShadow: "none",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Initialize enhanced title effects
function initEnhancedTitleEffects() {
    const titleLetters = document.querySelectorAll('.title-letter');
    
    if (titleLetters.length) {
        // Add random hover delay to each letter
        titleLetters.forEach(letter => {
            const randomDelay = Math.random() * 0.5;
            letter.style.animationDelay = `${randomDelay}s`;
            
            // Add 3D hover effect
            letter.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    z: 50,
                    scale: 1.5,
                    color: '#FF4081',
                    textShadow: "0 0 20px rgba(255, 64, 129, 0.7)",
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            letter.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    z: 0,
                    scale: 1,
                    color: '',
                    textShadow: "",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        // Add random glitch effect
        setInterval(() => {
            // Select random letters to glitch
            const randomCount = Math.floor(Math.random() * 3) + 1;
            const randomIndices = [];
            
            while (randomIndices.length < randomCount) {
                const randomIndex = Math.floor(Math.random() * titleLetters.length);
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }
            
            // Apply glitch effect
            randomIndices.forEach(index => {
                const letter = titleLetters[index];
                letter.classList.add('glitch');
                
                // Remove glitch effect after a short time
                setTimeout(() => {
                    letter.classList.remove('glitch');
                }, 1000);
            });
        }, 3000);
    }
}
