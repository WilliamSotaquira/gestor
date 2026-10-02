/* ============================================================
   Intranet Culturas — scripts del Home
   Etapa baja fidelidad: interacciones mínimas del encabezado.
   Las interacciones avanzadas (carruseles, aviso rotativo) se
   implementan en la etapa de alta fidelidad (Task 7).
   ============================================================ */

(function () {
    'use strict';

    /* ---- Toggle del menú en móvil ---- */
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.getElementById('menu-principal');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    /* ---- Desplegables del menú principal (clic + teclado) ---- */
    const menuItems = document.querySelectorAll('.site-nav__item--has-menu > .site-nav__link');

    menuItems.forEach(function (link) {
        const submenu = link.nextElementSibling;
        if (!submenu) return;

        link.addEventListener('click', function (e) {
            e.preventDefault();
            const willOpen = !submenu.classList.contains('is-open');
            // Cierra otros submenús abiertos
            document.querySelectorAll('.site-nav__submenu.is-open').forEach(function (open) {
                if (open !== submenu) {
                    open.classList.remove('is-open');
                    const sibling = open.previousElementSibling;
                    if (sibling) sibling.setAttribute('aria-expanded', 'false');
                }
            });
            submenu.classList.toggle('is-open', willOpen);
            link.setAttribute('aria-expanded', String(willOpen));
        });
    });

    /* ---- Cerrar submenús al hacer clic fuera ---- */
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.site-nav__item--has-menu')) {
            document.querySelectorAll('.site-nav__submenu.is-open').forEach(function (open) {
                open.classList.remove('is-open');
                const sibling = open.previousElementSibling;
                if (sibling) sibling.setAttribute('aria-expanded', 'false');
            });
        }
    });
})();

/* ============================================================
   Aviso institucional rotativo
   - Muestra un aviso a la vez.
   - Rota automáticamente (intervalo configurable, mín. 7s).
   - Controles: anterior / pausar / siguiente (accesibilidad).
   - Respeta prefers-reduced-motion (no autoavanza).
   ============================================================ */
(function () {
    'use strict';

    const rotador = document.querySelector('[data-aviso-rotador]');
    if (!rotador) return;

    const items = Array.prototype.slice.call(rotador.querySelectorAll('[data-aviso-item]'));
    if (items.length <= 1) return; // Con un solo aviso queda fijo, sin controles activos

    const btnPrev = rotador.querySelector('[data-aviso-prev]');
    const btnNext = rotador.querySelector('[data-aviso-next]');
    const btnPausa = rotador.querySelector('[data-aviso-pausa]');

    const intervalo = Math.max(7000, parseInt(rotador.getAttribute('data-aviso-intervalo'), 10) || 7000);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let actual = 0;
    let timer = null;
    let pausado = reduceMotion; // si el usuario pide menos movimiento, arranca pausado

    function mostrar(indice) {
        actual = (indice + items.length) % items.length;
        items.forEach(function (item, i) {
            item.hidden = (i !== actual);
        });
    }

    function siguiente() { mostrar(actual + 1); }
    function anterior() { mostrar(actual - 1); }

    function iniciar() {
        detener();
        if (!pausado) {
            timer = window.setInterval(siguiente, intervalo);
        }
    }

    function detener() {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    function actualizarBotonPausa() {
        if (!btnPausa) return;
        btnPausa.setAttribute('aria-pressed', String(pausado));
        btnPausa.textContent = pausado ? '▶' : '⏸';
        btnPausa.setAttribute('aria-label', pausado ? 'Reanudar rotación de avisos' : 'Pausar rotación de avisos');
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', function () {
            anterior();
            iniciar(); // reinicia el temporizador tras interacción manual
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', function () {
            siguiente();
            iniciar();
        });
    }

    if (btnPausa) {
        btnPausa.addEventListener('click', function () {
            pausado = !pausado;
            actualizarBotonPausa();
            iniciar();
        });
    }

    // Pausa al pasar el mouse o enfocar (buena práctica de accesibilidad)
    rotador.addEventListener('mouseenter', detener);
    rotador.addEventListener('mouseleave', function () { if (!pausado) iniciar(); });
    rotador.addEventListener('focusin', detener);
    rotador.addEventListener('focusout', function () { if (!pausado) iniciar(); });

    // Estado inicial
    mostrar(0);
    actualizarBotonPausa();
    iniciar();
})();
