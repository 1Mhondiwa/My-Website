(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Modern scroll animations (replaces WOW.js)
    const observerOptions = {
        threshold: 0.01,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    const fadeEls = document.querySelectorAll('.fade-in-up');
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If already in viewport on load, reveal immediately to avoid perceived delay
        if (rect.top < viewportHeight - 10) {
            el.classList.add('is-visible');
        } else {
            observer.observe(el);
        }
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);

// Scroll-based animation for mobile section (Stewart Nyamayaro style - exact replication)
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.scroll-animated');
    const mobileSection = document.querySelector('.mobile-app-section');
    
    if (!animatedElements.length || !mobileSection) return;
    
    // Easing function for smooth animation (ease-out-cubic)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function updateMobileAnimation() {
        const rect = mobileSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Section enters when bottom hits viewport bottom
        // Section leaves when top exits viewport top
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        
        // Calculate visibility progress
        // When section bottom enters viewport (sectionBottom = windowHeight), progress starts at 0
        // When section is centered (sectionTop + sectionHeight/2 = windowHeight/2), progress is at 0.5
        // When section top exits viewport (sectionTop = 0), progress is at 1
        
        let progress;
        
        if (sectionBottom < windowHeight && sectionTop > 0) {
            // Section is fully in viewport - calculate position relative to center
            const sectionCenter = sectionTop + (sectionHeight / 2);
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
            const maxDistance = windowHeight / 2 + sectionHeight / 2;
            
            // Progress: 0 at edges, 1 at center
            progress = 1 - (distanceFromCenter / maxDistance);
            progress = Math.max(0, Math.min(1, progress));
        } else if (sectionBottom >= windowHeight) {
            // Section entering from bottom
            const enterProgress = (windowHeight - sectionBottom) / (windowHeight + sectionHeight);
            progress = Math.max(0, enterProgress + 0.5);
        } else if (sectionTop <= 0) {
            // Section leaving from top
            const exitProgress = Math.abs(sectionTop) / sectionHeight;
            progress = Math.max(0, 0.5 - exitProgress);
        } else {
            progress = 0;
        }
        
        // Apply easing for smooth animation
        const easedProgress = easeOutCubic(progress);
        
        // Calculate scale and opacity based on eased progress
        // At progress 0: scale 0.5, opacity 0
        // At progress 1: scale 1.0, opacity 1
        const phoneScale = 0.5 + (easedProgress * 0.5);
        const textScale = 0.85 + (easedProgress * 0.15);
        const opacity = easedProgress;
        
        // Apply animation to all elements
        animatedElements.forEach(function(element) {
            if (element.classList.contains('mobile-card')) {
                element.style.transform = `scale(${phoneScale})`;
                element.style.opacity = opacity;
            } else if (element.classList.contains('mobile-text')) {
                element.style.transform = `scale(${textScale})`;
                element.style.opacity = opacity;
            }
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateMobileAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateMobileAnimation, { passive: true });
    updateMobileAnimation(); // Initial call
});
