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

// Premium 3D scroll animation for mobile section
document.addEventListener('DOMContentLoaded', function() {
    const phoneFrame = document.querySelector('.phone-frame.scroll-animated');
    const mobileText = document.querySelector('.mobile-text.scroll-animated');
    const mobileSection = document.querySelector('.mobile-app-section');
    
    if (!phoneFrame || !mobileText || !mobileSection) return;
    
    function updateMobileAnimation() {
        const rect = mobileSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Calculate progress: 0 (section entering) to 1 (section leaving)
        const start = windowHeight;
        const end = -sectionHeight;
        const range = start - end;
        const progress = (start - rect.top) / range;
        
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // Create smooth bell curve with easing
        let scale, opacity, rotateY, translateX, shadowIntensity;
        
        if (clampedProgress < 0.5) {
            // Entering: smooth ease-in
            const enterProgress = clampedProgress * 2;
            const easedProgress = 1 - Math.pow(1 - enterProgress, 3); // Cubic ease out
            
            scale = 0.8 + (easedProgress * 0.2); // 0.8 to 1
            opacity = easedProgress; // 0 to 1
            rotateY = -25 + (easedProgress * 25); // -25deg to 0deg (rotate from left)
            translateX = -30 + (easedProgress * 30); // -30px to 0px
            shadowIntensity = easedProgress;
        } else {
            // Leaving: smooth ease-out
            const exitProgress = (clampedProgress - 0.5) * 2;
            const easedProgress = Math.pow(exitProgress, 3); // Cubic ease in
            
            scale = 1 - (easedProgress * 0.2); // 1 to 0.8
            opacity = 1 - easedProgress; // 1 to 0
            rotateY = 0 + (easedProgress * 25); // 0deg to 25deg (rotate to right)
            translateX = 0 + (easedProgress * 30); // 0px to 30px
            shadowIntensity = 1 - easedProgress;
        }
        
        // Apply 3D transform to phone with dynamic shadows
        const shadowBlur = 40 * shadowIntensity;
        const glowIntensity = 0.15 * shadowIntensity;
        phoneFrame.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
        phoneFrame.style.opacity = opacity;
        phoneFrame.style.boxShadow = `
            0 ${15 + shadowBlur * 0.5}px ${shadowBlur}px rgba(0, 0, 0, ${0.2 * shadowIntensity}),
            0 0 ${20 + shadowBlur * 0.3}px rgba(33, 150, 243, ${glowIntensity}),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `;
        
        // Apply parallax slide to text
        mobileText.style.transform = `translateX(${translateX}px)`;
        mobileText.style.opacity = opacity;
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
