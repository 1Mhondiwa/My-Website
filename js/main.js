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

// Scroll-based animation for mobile section (Stewart Nyamayaro style)
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.scroll-animated');
    const mobileSection = document.querySelector('.mobile-app-section');
    
    if (!animatedElements.length || !mobileSection) return;
    
    function updateMobileAnimation() {
        const rect = mobileSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Calculate progress: 0 (section entering) to 1 (section leaving)
        // Starts when section enters bottom of viewport, ends when it leaves top
        const start = windowHeight;
        const end = -sectionHeight;
        const range = start - end;
        const progress = (start - rect.top) / range;
        
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // Create a bell curve effect:
        // - Scale and opacity increase from 0 to 0.5 (entering)
        // - Scale and opacity decrease from 0.5 to 1 (leaving)
        let phoneScale, textScale, opacity;
        
        if (clampedProgress < 0.5) {
            // Entering: progress 0-0.5 maps to scale and opacity 0-1
            const enterProgress = clampedProgress * 2; // 0 to 1
            phoneScale = 0.7 + (enterProgress * 0.3); // Phone: 0.7 to 1
            textScale = 0.95 + (enterProgress * 0.05); // Text: 0.95 to 1 (subtle)
            opacity = enterProgress; // 0 to 1
        } else {
            // Leaving: progress 0.5-1 maps to scale 1 back down and opacity 1-0
            const exitProgress = (clampedProgress - 0.5) * 2; // 0 to 1
            phoneScale = 1 - (exitProgress * 0.3); // Phone: 1 to 0.7
            textScale = 1 - (exitProgress * 0.05); // Text: 1 to 0.95
            opacity = 1 - exitProgress; // 1 to 0
        }
        
        // Apply animation to all elements
        animatedElements.forEach(function(element) {
            if (element.classList.contains('phone-frame')) {
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
    updateMobileAnimation(); // Initial call
});
