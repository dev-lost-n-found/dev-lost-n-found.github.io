document.addEventListener('DOMContentLoaded', function () {
    // Update copyright year dynamically
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        copyrightYear.innerHTML = `&copy; ${new Date().getFullYear()} Pet Finder Helper. All rights reserved.`;
    }

    // Mobile Menu Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        const body = document.body;

        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);

        function toggleMenu() {
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        }

        mobileMenuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on window resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;

        // Create dots dynamically
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            container.style.transform = `translateX(-${currentSlide * 25}%)`;
            updateDots();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(currentSlide);
        }

        // Event listeners for navigation buttons
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        if (prevButton) prevButton.addEventListener('click', prevSlide);

        // Auto-slide functionality
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        startAutoSlide();

        // Pause auto-slide on hover
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Touch support with passive event listeners
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        }
    }

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const title = formData.get('title');
            const message = formData.get('message');

            // Construct email content
            const emailBody = `
Name: ${name}
Email: ${email}
Subject: ${title}

Message:
${message}
            `;

            // Generate mailto link
            const mailtoLink = `mailto:lostandfound.mm.org@gmail.com?subject=${encodeURIComponent(`Enquiry from ${name}: ${title}`)}&body=${encodeURIComponent(emailBody)}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Show success message
            alert('Your email client will open. Please send the email to complete your message.');

            // Reset form after submission
            contactForm.reset();
        });
    }

});
