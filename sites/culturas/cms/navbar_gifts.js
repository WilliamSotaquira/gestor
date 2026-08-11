/**
 * navbar_gifts.js
 * Tooltip compacto con GIF en lengua de señas sobre cada ítem del menú.
 * Se posiciona encima del menú, más pequeño, sin tapar los submenús.
 *
 * Aislamiento total: IIFE, prefijo "mcGT_", no modifica globals ni prototipos.
 *
 * WCAG 2.2:
 * - SC 1.4.13: Descartable (Esc), hoverable, persistente
 * - SC 2.2.2: Botón pausa/play
 * - SC 2.1.1: Funciona con focus de teclado
 * - SC 4.1.2: role=tooltip, aria-describedby
 */
;(function navbarGifts() {
  "use strict";

  if (window.__mcGT_loaded) return;
  window.__mcGT_loaded = true;

  // === CONFIG ===
  var BASE_URL = "https://www.mincultura.gov.co/resources/gifts/2026/";

  var GIFT_MAP = {
    // === Nivel raíz ===
    "Ministerio": "Ministerio.gif",
    "Lo más buscado": "Lo mas buscado.gif",
    "Direcciones": "3.Direcciones.gif",
    "Participa": "4.Participa Control Social.gif",
    "Atención y Servicio a la Ciudadanía": "5.Atencio%CC%81n%20y%20servicio%20a%20la%20ciudadania.gif",
    "Transparencia": "6.Transparencia.gif",

    // === Submenú: Ministerio ===
    "Quiénes Somos": "Quienes somos.gif",
    "Despacho": "Despacho.gif",
    "Ministra": "Ministro.gif",
    "Grupos del Despacho": "Grupos de despacho.gif",
    "Secretaría General": "Gestion Humana.gif",
    "Viceministerio de las Artes y la Economía Cultural y Creativa": "viceMinisterio%20de%20de%20las%20artes%20y%20la%20economia%20cultural%20y%20creativa.gif",
    "Viceministerio de los Patrimonios, las Memorias y Gobernanza Cultural": "viceMinisterio%20de%20los%20patrimonios,%20las%20memorias%20y%20gobernanza%20cultural.gif",
    "Gestión Humana": "Gestion Humana.gif",
    "Directorio institucional": "Directorio institucional.gif",
    "Organigrama": "Organigrama.gif",

    // === Submenú: Lo más buscado ===
    "Santa Marta 500 años": "Pagina antigua.gif",
    "Convocatorias": "7.Convocatorias A.gif",
    "Noticias": "9.Noticias.gif",
    "Agenda": "Calificanos.gif",
    "Especiales": "Especiales.gif",
    "Redes sociales": "10.Redes sociales.gif",
    "Revista Gaceta": "Revista Gaceta.gif",
    "Publicaciones MiCASa": "Pagina antigua.gif",
    "Soy Cultura": "12.Soy cultura.gif",

    // === Submenú: Direcciones ===
    "Dirección de Patrimonio y Memoria": "3.Direcciones.gif",
    "Dirección de Fomento Regional": "Direccion%20de%20fomento%20regional.gif",
    "Dirección de Poblaciones": "3.Direcciones.gif",
    "Dirección de Artes": "3.Direcciones.gif",
    "Dirección de Audiovisuales, Cine y Medios Interactivos": "Direccion%20de%20Audiovisuales,%20cine%20y%20Medios%20Interactivos.gif",
    "Dirección de Estrategia, Desarrollo y Emprendimiento": "Direccion%20de%20Estrategica,%20desarrollo%20y%20Emprendimiento.gif",

    // === Submenú: Participa ===
    "Identificació\u200B\u200Bn de problemas y diagnóstico de necesidades": "Identificacion%20de%20problemas%20y%20diagnotico%20de%20necesidades.gif",
    "Planeación y/o Presupuesto Participativo": "4.Participa%20Control%20Social.gif",
    "Consulta Ciudadana": "Consulta ciudadana.gif",
    "Colaboración e innovación abierta": "Colaboracion%20e%20innovacion%20abierta.gif",
    "Rendición de cuentas": "Rendicion%20de%20cuentas.gif",
    "Control Ciudadano": "Control ciudadano.gif",

    // === Submenú: Atención y Servicio a la Ciudadanía ===
    "Canales de contacto": "14.Canales de contacto.gif",
    "Atención PQRS": "15.%20Atencio%CC%81n%20PQRSD.gif",
    "Agendamiento y Atención presencial": "16.Agendamiento%20y%20Atencio%CC%81n%20presencial.gif",
    "Tramites y servicios": "17.Tra%CC%81mites%20y%20servicios.gif",
    "Informes": "Informes.gif",
    "Cartelera virtual": "Pagina antigua.gif"
  };

  // === ESTILOS ===
  var css = document.createElement("style");
  css.setAttribute("data-owner", "navbar-gifts");
  css.textContent = [
    /* Contenedor tooltip */
    ".mcGT_ {",
    "  position: fixed;",
    "  z-index: 100000;",
    "  background: #fff;",
    "  border: 1px solid rgba(9,67,181,.3);",
    "  border-radius: 8px;",
    "  padding: 3px;",
    "  box-shadow: 0 2px 10px rgba(0,0,0,.15);",
    "  opacity: 0;",
    "  visibility: hidden;",
    "  transition: opacity .12s, visibility .12s;",
    "  pointer-events: none;",
    "  width: 130px;",
    "}",
    ".mcGT_--show {",
    "  opacity: 1;",
    "  visibility: visible;",
    "  pointer-events: auto;",
    "}",
    /* Imagen GIF */
    ".mcGT_ img {",
    "  display: block;",
    "  width: 100%;",
    "  height: auto;",
    "  border-radius: 4px;",
    "  aspect-ratio: 1/1;",
    "  object-fit: cover;",
    "}",
    /* Botón pausa */
    ".mcGT__btn {",
    "  position: absolute;",
    "  top: 3px;",
    "  right: 3px;",
    "  background: rgba(0,0,0,.55);",
    "  color: #fff;",
    "  border: none;",
    "  border-radius: 50%;",
    "  width: 20px;",
    "  height: 20px;",
    "  min-width: 20px;",
    "  min-height: 20px;",
    "  max-width: 20px;",
    "  max-height: 20px;",
    "  padding: 0;",
    "  font-size: 9px;",
    "  cursor: pointer;",
    "  display: flex;",
    "  align-items: center;",
    "  justify-content: center;",
    "  line-height: 1;",
    "  aspect-ratio: 1/1;",
    "}",
    ".mcGT__btn:focus-visible {",
    "  outline: 2px solid #0943B5;",
    "  outline-offset: 2px;",
    "}",
    /* Caption oculto visualmente, disponible para lectores de pantalla */
    ".mcGT__cap {",
    "  position: absolute;",
    "  width: 1px;",
    "  height: 1px;",
    "  padding: 0;",
    "  margin: -1px;",
    "  overflow: hidden;",
    "  clip: rect(0,0,0,0);",
    "  white-space: nowrap;",
    "  border: 0;",
    "}",
    /* Flecha inferior */
    ".mcGT_::after {",
    "  content: '';",
    "  position: absolute;",
    "  bottom: -5px;",
    "  left: 50%;",
    "  transform: translateX(-50%);",
    "  border-left: 5px solid transparent;",
    "  border-right: 5px solid transparent;",
    "  border-top: 5px solid #fff;",
    "}",
    ".mcGT_::before {",
    "  content: '';",
    "  position: absolute;",
    "  bottom: -6px;",
    "  left: 50%;",
    "  transform: translateX(-50%);",
    "  border-left: 6px solid transparent;",
    "  border-right: 6px solid transparent;",
    "  border-top: 6px solid #0943B5;",
    "}",
    /* Responsive: aún más compacto en móvil */
    "@media (max-width: 768px) {",
    "  .mcGT_ { width: 100px; padding: 3px; }",
    "  .mcGT__cap { font-size: 9px; }",
    "  .mcGT__btn { width: 16px; height: 16px; min-width: 16px; min-height: 16px; max-width: 16px; max-height: 16px; font-size: 8px; }",
    "}",
    "@media (max-width: 480px) {",
    "  .mcGT_ { width: 80px; }",
    "  .mcGT__cap { display: none; }",
    "}"
  ].join("\n");
  document.head.appendChild(css);

  // === TOOLTIP SINGLETON ===
  var tip = null;
  var hideTimer = null;
  var showTimer = null; // delay de 2s antes de mostrar
  var isPaused = false;
  var pausedSrc = "";

  function build() {
    var el = document.createElement("div");
    el.className = "mcGT_";
    el.id = "mcGT_tip";
    el.setAttribute("role", "tooltip");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<img src="" alt="" />' +
      '<button type="button" class="mcGT__btn" aria-label="Pausar animación">\u23F8</button>' +
      '<p class="mcGT__cap"></p>';
    document.body.appendChild(el);

    var btn = el.querySelector(".mcGT__btn");
    var img = el.querySelector("img");

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      isPaused = !isPaused;
      if (isPaused) {
        try {
          var c = document.createElement("canvas");
          c.width = img.naturalWidth || 140;
          c.height = img.naturalHeight || 140;
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          pausedSrc = img.src;
          img.src = c.toDataURL();
        } catch (err) {
          pausedSrc = img.src;
          img.style.animationPlayState = "paused";
        }
        btn.textContent = "\u25B6";
        btn.setAttribute("aria-label", "Reanudar animación");
      } else {
        if (pausedSrc) img.src = pausedSrc;
        img.style.animationPlayState = "";
        btn.textContent = "\u23F8";
        btn.setAttribute("aria-label", "Pausar animación");
      }
    });

    // Hoverable (SC 1.4.13)
    el.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    el.addEventListener("mouseleave", function () { scheduleHide(); });

    return el;
  }

  function showTip(trigger, gif, label) {
    if (!tip) tip = build();
    clearTimeout(hideTimer);

    var img = tip.querySelector("img");
    var cap = tip.querySelector(".mcGT__cap");
    var btn = tip.querySelector(".mcGT__btn");

    // Reset
    isPaused = false;
    pausedSrc = "";
    btn.textContent = "\u23F8";
    btn.setAttribute("aria-label", "Pausar animación");
    img.style.animationPlayState = "";

    img.src = BASE_URL + (gif.indexOf("%") !== -1 ? gif : gif.replace(/ /g, "%20"));
    img.setAttribute("alt", "Seña en lengua de señas colombiana: " + label);
    cap.textContent = label;

    trigger.setAttribute("aria-describedby", "mcGT_tip");

    // Posicionar ARRIBA del ítem pegado (mínimo gap)
    var rect = trigger.getBoundingClientRect();
    var tipH = 140;
    var topPos = rect.top - tipH + 2; // +2 para solapar ligeramente con la flecha

    // Si no cabe arriba, ponerlo abajo pegado
    if (topPos < 2) {
      topPos = rect.bottom;
    }

    var leftPos = rect.left + (rect.width / 2) - 65; // centrado (130/2)

    // No salirse por la derecha
    if (leftPos + 138 > window.innerWidth) {
      leftPos = window.innerWidth - 146;
    }
    // No salirse por la izquierda
    if (leftPos < 8) leftPos = 8;

    tip.style.top = topPos + "px";
    tip.style.left = leftPos + "px";

    tip.classList.add("mcGT_--show");
    tip.setAttribute("aria-hidden", "false");
  }

  function scheduleHide() {
    hideTimer = setTimeout(hideTip, 200);
  }

  function hideTip() {
    if (!tip) return;
    tip.classList.remove("mcGT_--show");
    tip.setAttribute("aria-hidden", "true");
    var el = document.querySelector('[aria-describedby="mcGT_tip"]');
    if (el) el.removeAttribute("aria-describedby");
  }

  // Escape (SC 1.4.13 dismissible)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      if (tip) hideTip();
    }
  });

  // === BIND ===
  function bindMenu() {
    var container = document.getElementById("zz1_TopNavigationMenu")
      || document.getElementById("DeltaTopNavigation")
      || document.querySelector(".ms-core-listMenu-horizontalBox");

    if (!container) return false;

    var spans = container.querySelectorAll(".menu-item-text");
    if (!spans.length) return false;

    var bound = 0;
    for (var i = 0; i < spans.length; i++) {
      var text = spans[i].textContent.trim();
      var gif = GIFT_MAP[text];
      if (!gif) continue;

      var trigger = spans[i].closest("a")
        || spans[i].closest("span.static")
        || spans[i].closest("span.dynamic")
        || spans[i].parentElement;
      if (!trigger || trigger.getAttribute("data-mcgt")) continue;
      trigger.setAttribute("data-mcgt", "1");

      (function (tr, g, lbl) {
        tr.addEventListener("mouseenter", function () {
          clearTimeout(hideTimer);
          clearTimeout(showTimer);
          showTimer = setTimeout(function () { showTip(tr, g, lbl); }, 350);
        });
        tr.addEventListener("mouseleave", function () {
          clearTimeout(showTimer);
          scheduleHide();
        });
        tr.addEventListener("focusin", function () {
          clearTimeout(hideTimer);
          clearTimeout(showTimer);
          showTimer = setTimeout(function () { showTip(tr, g, lbl); }, 350);
        });
        tr.addEventListener("focusout", function () {
          clearTimeout(showTimer);
          scheduleHide();
        });
      })(trigger, gif, text);

      bound++;
    }
    return bound > 0;
  }

  // Init con reintentos (SharePoint async)
  function init() {
    if (bindMenu()) return;
    var attempts = 0;
    var iv = setInterval(function () {
      attempts++;
      if (bindMenu() || attempts >= 20) clearInterval(iv);
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
