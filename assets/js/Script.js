// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    }
});

// Smooth scroll for navigation links
const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.tech-item, .service-item, .stat-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Add hover effects for service items
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Add parallax effect to hero photo on scroll
const heroPhotoContainer = document.querySelector('.hero-photo-container');

if (heroPhotoContainer) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = window.innerHeight;
        
        if (scrollPosition < maxScroll) {
            const translateY = scrollPosition * 0.3;
            heroPhotoContainer.style.transform = `translateY(${translateY}px)`;
        }
    });
}

// Animate stats on scroll
const statItems = document.querySelectorAll('.stat-item');
let animated = false;

const animateStats = () => {
    if (animated) return;
    
    const statsSection = document.querySelector('.stats-grid');
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        animated = true;
        
        statItems.forEach((item, index) => {
            const statValue = item.querySelector('.stat-value');
            const targetValue = parseInt(statValue.textContent);
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const increment = targetValue / (duration / 16); // 60fps
            
            const animate = () => {
                currentValue += increment;
                if (currentValue < targetValue) {
                    statValue.textContent = Math.floor(currentValue);
                    requestAnimationFrame(animate);
                } else {
                    statValue.textContent = targetValue;
                }
            };
            
            setTimeout(() => {
                animate();
            }, index * 100);
        });
    }
};

window.addEventListener('scroll', animateStats);
animateStats(); // Check on load

// Add button click effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Prevent default button actions (since this is a demo)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Button clicked:', btn.textContent);
    });
});

// Add smooth transitions for tech stack items
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach((item, index) => {
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    }, index * 100);
});

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully!');
    console.log('Developed with ♥ and HTML/CSS/JavaScript');
});
