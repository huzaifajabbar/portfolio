// Carousel navigation
        // Mobile menu toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Scroll to section
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.classList.remove('active');
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll up button
        const scrollUpBtn = document.querySelector('.scroll-up');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollUpBtn.classList.add('active');
            } else {
                scrollUpBtn.classList.remove('active');
            }
        });
        
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Section animations on scroll
        const sections = document.querySelectorAll('section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });

        // Skill card animations
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Replace placeholder images with actual skill icons
        // This would be implemented when deployed with actual icon URLs
        document.querySelectorAll('.skill-card img').forEach(img => {
            if (img.dataset.src) {
                const dataSrc = img.dataset.src;
                // In a real implementation, you would uncomment the line below
                // img.src = dataSrc;
            }
        });

        // Form submission handling
        const contactForm = document.querySelector('.contact-form form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Form validation and submission logic would go here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            });
        }


document.querySelectorAll('.project-container').forEach(container => {
    const carousel = container.querySelector('.carousel-images');
    const leftArrow = container.querySelector('.carousel-arrow.left');
    const rightArrow = container.querySelector('.carousel-arrow.right');
    let scrollAmount = 0;

    const scrollStep = carousel.clientWidth;

    rightArrow.addEventListener('click', () => {
        scrollAmount += scrollStep;
        if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = carousel.scrollWidth - carousel.clientWidth;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    leftArrow.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = 0;
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Touch/swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                scrollAmount += scrollStep;
            } else {
                scrollAmount -= scrollStep;
            }
            scrollAmount = Math.max(0, Math.min(scrollAmount, carousel.scrollWidth - carousel.clientWidth));
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});

// Update observer to watch project containers
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-container').forEach(container => {
    projectObserver.observe(container);
});