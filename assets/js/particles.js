// Particle background effects for Rose Being Unhinged

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    initParticleSystem();
    
    // Initialize scroll indicator
    initScrollIndicator();
});

// Initialize particle system
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        createParticle(particlesContainer);
    }
    
    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const dx = mouseX - particleX;
            const dy = mouseY - particleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - distance) / 10;
                const tx = Math.cos(angle) * force;
                const ty = Math.sin(angle) * force;
                
                gsap.to(particle, {
                    x: `-=${tx}`,
                    y: `-=${ty}`,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Add click effect
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
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
    const size = Math.random() * 4 + 1;
    
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
    const animationDuration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${animationDuration}s`;
    
    // Add to container
    container.appendChild(particle);
    
    // Add GSAP animation
    gsap.to(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 30 + 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Create click effect
function createClickEffect(x, y) {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    particlesContainer.appendChild(ripple);
    
    // Animate and remove
    gsap.to(ripple, {
        scale: 3,
        opacity: 0,
        duration: 1,
        onComplete: function() {
            ripple.remove();
        }
    });
    
    // Create burst particles
    for (let i = 0; i < 10; i++) {
        const burstParticle = document.createElement('div');
        burstParticle.classList.add('burst-particle');
        
        // Random size
        const size = Math.random() * 6 + 2;
        
        // Random color
        const colors = ['#6200EA', '#FF4081', '#00BCD4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        burstParticle.style.left = `${x}px`;
        burstParticle.style.top = `${y}px`;
        burstParticle.style.width = `${size}px`;
        burstParticle.style.height = `${size}px`;
        burstParticle.style.backgroundColor = color;
        
        particlesContainer.appendChild(burstParticle);
        
        // Animate and remove
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        gsap.to(burstParticle, {
            x: tx,
            y: ty,
            opacity: 0,
            duration: Math.random() * 1 + 0.5,
            ease: "power2.out",
            onComplete: function() {
                burstParticle.remove();
            }
        });
    }
}

// Initialize scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        scrollIndicator.style.width = scrolled + '%';
    });
}
