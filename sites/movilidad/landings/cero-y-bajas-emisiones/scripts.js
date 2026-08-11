/* ============================================================
   CERO Y BAJAS EMISIONES — Scripts
   Menú hamburguesa, carrusel hero y scroll header.
   ============================================================ */

// --- Inicializar cuando el DOM esté listo ---
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  'use strict';

  // --- Navbar scroll: transparente → sólida ---
  var header = document.querySelector('.site-header');
  var headerSolidThreshold = 18;
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-solid', window.scrollY > headerSolidThreshold);
    }, { passive: true });
  }

  // --- Menú hamburguesa ---
  var toggle = document.querySelector('.site-menu-toggle');
  var nav = document.querySelector('.site-nav');
  var mobileQuery = window.matchMedia('(max-width: 991.98px)');

  function setMenuOpen(open) {
    if (!header || !toggle || !nav) return;
    var active = open && mobileQuery.matches;
    header.classList.toggle('is-menu-open', active);
    toggle.setAttribute('aria-expanded', active ? 'true' : 'false');
    toggle.setAttribute('aria-label', active ? 'Cerrar menú principal' : 'Abrir menú principal');
  }

  if (toggle && nav) {
    setMenuOpen(false);

    toggle.addEventListener('click', function () {
      setMenuOpen(!header.classList.contains('is-menu-open'));
    });

    // Cerrar menú al hacer click en un enlace (móvil)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function (event) {
      if (!mobileQuery.matches || !header.classList.contains('is-menu-open')) return;
      if (!header.contains(event.target)) setMenuOpen(false);
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenuOpen(false);
    });

    // Cerrar si se agranda la ventana
    window.addEventListener('resize', function () {
      if (!mobileQuery.matches) setMenuOpen(false);
    });
  }

  // --- Carrusel Hero ---
  var carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('.hero-slide');
  var dots = carousel.querySelectorAll('.hero-carousel__dot');
  var prevBtn = carousel.querySelector('.hero-carousel__btn--prev');
  var nextBtn = carousel.querySelector('.hero-carousel__btn--next');
  var pauseBtn = carousel.querySelector('.hero-carousel__pause');

  var current = 0;
  var timer = null;
  var paused = false;
  var INTERVAL = 5000;

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    if (paused) return;
    stopAutoplay();
    timer = setInterval(next, INTERVAL);
  }

  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () { prev(); stopAutoplay(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () { next(); stopAutoplay(); });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(i); stopAutoplay(); });
  });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', paused);
      var pauseIcon = pauseBtn.querySelector('.pause-icon');
      var playIcon = pauseBtn.querySelector('.play-icon');
      if (pauseIcon) pauseIcon.style.display = paused ? 'none' : '';
      if (playIcon) playIcon.style.display = paused ? '' : 'none';
      if (paused) stopAutoplay(); else startAutoplay();
    });
  }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', function () { if (!paused) startAutoplay(); });

  // Respetar preferencia de movimiento reducido
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    paused = true;
  } else {
    startAutoplay();
  }

  // --- Smooth scroll para enlaces internos ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll progress indicator ---
  var progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // --- Back to top button ---
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Active nav link highlighting on scroll ---
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.site-nav a');

  if (sections.length && navLinks.length) {
    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            var isActive = href.indexOf('#' + id) !== -1;
            link.classList.toggle('is-active', isActive);
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
}
