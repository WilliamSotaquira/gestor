/*
 * Menú principal de Movilidad - comportamiento móvil y accesible
 *
 * Se carga con Asset Injector (JS), posición "footer", DESPUÉS del tema custom_barrio.
 * Va emparejado con menu-principal.css y con sites/movilidad/cms/menu-principal.html
 *
 * Qué corrige respecto al script del tema:
 *  - Botón: aria-expanded real y Escape / clic fuera para cerrar (el tema solo alterna style.display).
 *  - Submenús: el tema usa innerWidth <= 768 mientras el CSS cambia en 1023px, y añade un
 *    listener nuevo en cada "resize" (los toques acaban abriendo y cerrando en el mismo clic).
 *  - Submenús accesibles por teclado en escritorio (antes solo con hover).
 *  - Altura máxima con scroll interno (el tema deja la barra fija y el menú se corta).
 *  - Espaciador para que el contenido no salte cuando la barra pasa a position:fixed.
 *
 * Los listeners del tema se anulan reemplazando los nodos por clones. Los "resize" del tema
 * siguen añadiéndose, pero sobre los nodos antiguos, que ya no están en el documento.
 */
(function () {
  'use strict';

  if (window.__sdmMenuMovilidad) {
    return;
  }
  window.__sdmMenuMovilidad = true;

  var MQ_MOVIL = window.matchMedia('(max-width: 1023px)');
  var MARGEN_INFERIOR = 8;
  var ALTO_BARRA_FIJA = 63; // el .sdm-navbar del tema arranca a top:63px dentro del contenedor

  function iniciar() {
    var contenedor = document.querySelector('.sdm-navbar-container');
    if (!contenedor || contenedor.getAttribute('data-sdm-init')) {
      return;
    }
    var nav = contenedor.querySelector('.sdm-navbar');
    var botonViejo = contenedor.querySelector('.sdm-boton-menu-navbar');
    if (!nav || !botonViejo) {
      return;
    }
    contenedor.setAttribute('data-sdm-init', '1');

    if (!nav.id) {
      nav.id = 'navbarScroll';
    }

    /* --- 1. Anular listeners del tema (botón e ítems) clonando los nodos --- */
    var boton = botonViejo.cloneNode(true);
    botonViejo.parentNode.replaceChild(boton, botonViejo);
    boton.removeAttribute('data-bs-toggle');
    boton.removeAttribute('data-bs-target');
    boton.setAttribute('aria-controls', nav.id);
    boton.setAttribute('aria-expanded', 'false');
    if (!boton.getAttribute('aria-label')) {
      boton.setAttribute('aria-label', 'Menú principal');
    }
    nav.style.removeProperty('display');

    var items = Array.prototype.slice
      .call(nav.querySelectorAll('.sdm-nav-item'))
      .map(function (li) {
        var copia = li.cloneNode(true);
        li.parentNode.replaceChild(copia, li);
        return copia;
      });

    /* Crea <button class="sdm-item-boton"> con el texto y la flecha de la fila */
    function construirBoton(fila) {
      var texto = (fila.textContent || '').replace(/\s+/g, ' ').trim();
      var img = fila.querySelector('img');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sdm-item-boton';

      var etiqueta = document.createElement('span');
      etiqueta.textContent = texto;
      btn.appendChild(etiqueta);

      var icono = document.createElement('span');
      icono.className = 'sdm-icono-submenu';
      icono.setAttribute('aria-hidden', 'true');
      if (img) {
        var copia = img.cloneNode(false);
        copia.setAttribute('alt', '');
        copia.removeAttribute('loading');
        icono.appendChild(copia);
      }
      btn.appendChild(icono);

      while (fila.firstChild) {
        fila.removeChild(fila.firstChild);
      }
      fila.appendChild(btn);
      return btn;
    }

    /* --- 2. Preparar ítems con submenú --- */
    var conSubmenu = [];
    items.forEach(function (li, indice) {
      var submenu = li.querySelector('.sdm-submenu-nav');
      if (!submenu) {
        return;
      }
      var fila = li.querySelector('.sdm-item-con-menu');
      var disparador = li.querySelector('.sdm-item-boton');

      // Si no hay <button> (HTML antiguo con <p><span>, o el editor de Drupal lo eliminó al guardar),
      // se construye aquí: así el CSS y el teclado funcionan con cualquier HTML guardado
      if (!disparador && fila) {
        disparador = construirBoton(fila);
      }
      if (!disparador) {
        return;
      }

      if (!submenu.id) {
        submenu.id = 'sdm-sub-' + (indice + 1);
      }
      submenu.removeAttribute('role');

      // Cada lista queda agrupada bajo su título ("Notificaciones, grupo" en lectores de pantalla)
      Array.prototype.forEach.call(submenu.querySelectorAll('.sdm-submenu-item'), function (grupo, g) {
        var titulo = grupo.querySelector('.sdm-titulo-submenu');
        var lista = grupo.querySelector('.sdm-sublista');
        if (!titulo) {
          return;
        }
        // Enlace suelto sin lista (p. ej. "Histórico de Noticias"): es un enlace destacado,
        // no un título de grupo. Se marca para darle estilo propio y no se iguala su altura.
        if (!lista && titulo.querySelector('a[href]')) {
          grupo.classList.add('sdm-item-destacado');
          titulo.classList.add('sdm-titulo-destacado');
          return;
        }
        // Texto del título en un span: lleva la barra de acento y permite igualar alturas.
        // También en títulos sin lista (p. ej. "Histórico de Noticias") para que todos se vean igual.
        if (!titulo.querySelector('.sdm-titulo-texto')) {
          var envoltura = document.createElement('span');
          envoltura.className = 'sdm-titulo-texto';
          while (titulo.firstChild) {
            envoltura.appendChild(titulo.firstChild);
          }
          titulo.appendChild(envoltura);
        }
        titulo.classList.add('sdm-titulo-preparado');
        if (!lista) {
          return;
        }
        if (!titulo.id) {
          titulo.id = submenu.id + '-g' + (g + 1);
        }
        // El rol va en el contenedor del grupo: en el <ul> rompería la semántica de lista (axe: listitem)
        grupo.setAttribute('role', 'group');
        grupo.setAttribute('aria-labelledby', titulo.id);
      });

      disparador.setAttribute('aria-controls', submenu.id);
      disparador.setAttribute('aria-expanded', 'false');

      conSubmenu.push({ li: li, disparador: disparador, submenu: submenu });
    });

    function esMovil() {
      return MQ_MOVIL.matches;
    }

    /* Iguala la altura de los títulos de grupo que comparten fila en el megamenú (escritorio).
       Se agrupan por posición vertical para respetar las filas cuando las columnas se reparten. */
    function igualarTitulos(submenu) {
      var titulos = Array.prototype.slice.call(submenu.querySelectorAll('.sdm-submenu-item:not(.sdm-item-destacado) > .sdm-titulo-submenu'));
      titulos.forEach(function (t) {
        t.style.removeProperty('min-height');
      });
      if (esMovil() || titulos.length < 2 || window.getComputedStyle(submenu).display === 'none') {
        return;
      }
      var filas = {};
      titulos.forEach(function (t) {
        var fila = Math.round(t.parentNode.getBoundingClientRect().top);
        (filas[fila] = filas[fila] || []).push(t);
      });
      Object.keys(filas).forEach(function (k) {
        var grupo = filas[k];
        if (grupo.length < 2) {
          return;
        }
        var alto = Math.max.apply(null, grupo.map(function (t) {
          return Math.ceil(t.getBoundingClientRect().height);
        }));
        grupo.forEach(function (t) {
          t.style.setProperty('min-height', alto + 'px');
        });
      });
    }

    function igualarAlAbrir(submenu) {
      window.requestAnimationFrame(function () {
        igualarTitulos(submenu);
      });
    }

    function estaAbierto(obj) {
      return obj.li.classList.contains('sdm-sub-abierto');
    }

    function abrirSubmenu(obj) {
      conSubmenu.forEach(function (otro) {
        if (otro !== obj) {
          cerrarSubmenu(otro, false);
        }
      });
      obj.li.classList.remove('sdm-cerrado');
      obj.li.classList.add('sdm-sub-abierto');
      obj.disparador.setAttribute('aria-expanded', 'true');
      igualarAlAbrir(obj.submenu);
    }

    function cerrarSubmenu(obj, ocultarHover) {
      obj.li.classList.remove('sdm-sub-abierto');
      obj.disparador.setAttribute('aria-expanded', 'false');
      // En escritorio, si el puntero sigue encima, .sdm-cerrado evita que el hover lo reabra.
      // Solo si el puntero está realmente encima: si no, el ítem quedaría sin abrir por hover.
      if (ocultarHover && !esMovil() && obj.li.matches(':hover')) {
        obj.li.classList.add('sdm-cerrado');
      }
    }

    function cerrarTodosSubmenus() {
      conSubmenu.forEach(function (obj) {
        cerrarSubmenu(obj, false);
        obj.li.classList.remove('sdm-cerrado');
      });
    }

    function menuAbierto() {
      return nav.classList.contains('sdm-abierto');
    }

    function fijarMenu(abierto) {
      nav.classList.toggle('sdm-abierto', abierto);
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      if (!abierto) {
        cerrarTodosSubmenus();
      }
      actualizarAltura();
    }

    /* --- 3. Botón hamburguesa --- */
    boton.addEventListener('click', function () {
      fijarMenu(!menuAbierto());
    });

    /* --- 4. Disparadores de submenú (clic, Enter y Espacio) --- */
    conSubmenu.forEach(function (obj) {
      obj.disparador.addEventListener('click', function () {
        if (estaAbierto(obj)) {
          cerrarSubmenu(obj, true);
        } else {
          abrirSubmenu(obj);
        }
        actualizarAltura();
      });

      // Escritorio: el hover pasa a mandar sobre el submenú fijado de otro ítem
      obj.li.addEventListener('mouseenter', function () {
        if (esMovil()) {
          return;
        }
        // Al entrar con el puntero se permite de nuevo el hover en este ítem
        obj.li.classList.remove('sdm-cerrado');
        igualarAlAbrir(obj.submenu);
        conSubmenu.forEach(function (otro) {
          if (otro !== obj) {
            cerrarSubmenu(otro, false);
            otro.li.classList.remove('sdm-cerrado');
          }
        });
      });

      obj.li.addEventListener('mouseleave', function () {
        obj.li.classList.remove('sdm-cerrado');
      });

      obj.li.addEventListener('focusout', function (e) {
        var destino = e.relatedTarget;
        if (!destino || !obj.li.contains(destino)) {
          obj.li.classList.remove('sdm-cerrado');
        }
        // Escritorio: si el foco pasa a otro elemento, el megamenú se cierra para no tapar
        // el elemento enfocado (WCAG 2.4.7 / 2.4.11). En móvil el acordeón sigue abierto.
        if (destino && !obj.li.contains(destino) && !esMovil() && estaAbierto(obj)) {
          cerrarSubmenu(obj, false);
        }
      });
    });

    /* --- 5. Escape y clic fuera --- */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' && e.key !== 'Esc') {
        return;
      }
      var activo = document.activeElement;
      var dentro = contenedor.contains(activo);

      // 1) Submenú abierto: cierra y devuelve el foco a su disparador
      for (var i = 0; i < conSubmenu.length; i++) {
        var obj = conSubmenu[i];
        if (estaAbierto(obj) && (dentro ? obj.li.contains(activo) : true)) {
          cerrarSubmenu(obj, true);
          if (dentro) {
            obj.disparador.focus();
          }
          actualizarAltura();
          return;
        }
      }

      // 2) Escritorio con submenú visible solo por hover: lo oculta (WCAG 1.4.13)
      if (!esMovil() && dentro) {
        for (var j = 0; j < conSubmenu.length; j++) {
          if (conSubmenu[j].li.contains(activo) || conSubmenu[j].li.matches(':hover')) {
            conSubmenu[j].li.classList.add('sdm-cerrado');
            return;
          }
        }
      }

      // 3) Menú móvil abierto: lo cierra y devuelve el foco al botón
      if (esMovil() && menuAbierto()) {
        fijarMenu(false);
        if (dentro) {
          boton.focus();
        }
      }
    });

    // Sin trampa de foco: si el foco sale del menú (Tab / Shift+Tab), el menú móvil se cierra
    // para que no tape el contenido al que llega el foco. No se retiene el foco en ningún caso.
    contenedor.addEventListener('focusout', function (e) {
      var destino = e.relatedTarget;
      if (!destino || contenedor.contains(destino)) {
        return;
      }
      if (esMovil() && menuAbierto()) {
        fijarMenu(false);
      }
    });

    document.addEventListener('click', function (e) {
      if (contenedor.contains(e.target)) {
        return;
      }
      if (esMovil()) {
        if (menuAbierto()) {
          fijarMenu(false);
        }
      } else {
        cerrarTodosSubmenus();
      }
    });

    /* --- 6. Altura máxima del menú en móvil (scroll interno) --- */
    function actualizarAltura() {
      if (!esMovil()) {
        nav.style.removeProperty('--sdm-menu-max-h');
        return;
      }
      var arriba = menuAbierto()
        ? nav.getBoundingClientRect().top
        : contenedor.getBoundingClientRect().top + ALTO_BARRA_FIJA;
      var visible = window.innerHeight;
      var alto = Math.max(200, Math.floor(visible - arriba - MARGEN_INFERIOR));
      nav.style.setProperty('--sdm-menu-max-h', alto + 'px');
    }

    /* --- 7. Espaciador cuando el tema fija la barra con position:fixed --- */
    var espaciador = document.createElement('div');
    espaciador.className = 'sdm-navbar-spacer';
    espaciador.setAttribute('aria-hidden', 'true');
    contenedor.parentNode.insertBefore(espaciador, contenedor);

    function sincronizarEspaciador() {
      var fija = window.getComputedStyle(contenedor).position === 'fixed';
      espaciador.style.height = fija ? contenedor.offsetHeight + 'px' : '0';
    }

    function aplicarPosicion() {
      sincronizarEspaciador();
      if (menuAbierto()) {
        actualizarAltura();
      }
    }

    // El script del tema fija la barra en su propio "scroll"; se recalcula en el mismo evento
    // y se repite en el siguiente frame por si el orden de los listeners lo dejara desfasado
    var pendiente = false;
    function alDesplazar() {
      aplicarPosicion();
      if (pendiente) {
        return;
      }
      pendiente = true;
      window.requestAnimationFrame(function () {
        pendiente = false;
        aplicarPosicion();
      });
    }

    window.addEventListener('scroll', alDesplazar, { passive: true });
    function igualarVisibles() {
      conSubmenu.forEach(function (obj) {
        igualarTitulos(obj.submenu);
      });
    }

    window.addEventListener('resize', function () {
      alDesplazar();
      actualizarAltura();
      igualarVisibles();
    });

    // Las fuentes del tema cambian el ancho del texto: se recalcula cuando terminan de cargar
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(igualarVisibles);
    }

    /* --- 8. Cambio móvil <-> escritorio: se reinicia el estado --- */
    function alCambiarBreakpoint() {
      nav.classList.remove('sdm-abierto');
      nav.style.removeProperty('display');
      boton.setAttribute('aria-expanded', 'false');
      cerrarTodosSubmenus();
      actualizarAltura();
    }
    if (MQ_MOVIL.addEventListener) {
      MQ_MOVIL.addEventListener('change', alCambiarBreakpoint);
    } else if (MQ_MOVIL.addListener) {
      MQ_MOVIL.addListener(alCambiarBreakpoint);
    }

    /* --- 9. Página actual: aria-current en el enlace que coincide con la URL --- */
    var ruta = window.location.pathname.replace(/\/+$/, '') || '/';
    Array.prototype.forEach.call(nav.querySelectorAll('a[href]'), function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^https?:/i.test(href)) {
        return;
      }
      var destino = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
      if (destino === ruta) {
        a.setAttribute('aria-current', 'page');
      }
    });

    sincronizarEspaciador();
    actualizarAltura();
  }

  // Se espera a que terminen los DOMContentLoaded del tema (que añaden sus listeners)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.setTimeout(iniciar, 0);
    });
  } else {
    window.setTimeout(iniciar, 0);
  }
})();
