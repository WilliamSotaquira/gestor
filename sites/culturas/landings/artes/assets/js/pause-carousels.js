/**
 * WCAG 2.2.2 - Pause, Stop, Hide
 * Handles pause/play buttons for auto-playing carousels.
 */
document.addEventListener('DOMContentLoaded', function() {
    var pauseBtns = document.querySelectorAll('.artes-pause-btn');
    pauseBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var carouselId = btn.getAttribute('data-carousel');
            var carouselEl = document.getElementById(carouselId);
            if (!carouselEl) return;
            var bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
            var icon = btn.querySelector('i');
            if (icon.classList.contains('bi-pause-fill')) {
                bsCarousel.pause();
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
                btn.setAttribute('aria-label', btn.getAttribute('aria-label').replace('Pausar', 'Reproducir'));
            } else {
                bsCarousel.cycle();
                icon.classList.remove('bi-play-fill');
                icon.classList.add('bi-pause-fill');
                btn.setAttribute('aria-label', btn.getAttribute('aria-label').replace('Reproducir', 'Pausar'));
            }
        });
    });

    // WCAG 2.2.2: Pause on focus within carousel
    var autoCarousels = document.querySelectorAll('[data-bs-ride="carousel"]');
    autoCarousels.forEach(function(el) {
        el.addEventListener('focusin', function() {
            bootstrap.Carousel.getOrCreateInstance(el).pause();
        });
        el.addEventListener('mouseenter', function() {
            bootstrap.Carousel.getOrCreateInstance(el).pause();
        });
        el.addEventListener('mouseleave', function() {
            bootstrap.Carousel.getOrCreateInstance(el).cycle();
        });
    });
});
