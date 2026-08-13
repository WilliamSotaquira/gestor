/**
 * navbar_gifts.js
 * Tooltip compacto con GIF en Lengua de Señas Colombiana (LSC) sobre cada
 * ítem del menú y encabezado de sección del micrositio Plan Nacional de Cultura.
 *
 * Aislamiento total: IIFE, prefijo "pncGT_", no modifica globals ni prototipos.
 *
 * WCAG 2.2:
 * - SC 1.4.13: Descartable (Esc), hoverable, persistente
 * - SC 2.2.2: Botón pausa/play
 * - SC 2.1.1: Funciona con focus de teclado
 * - SC 4.1.2: role=tooltip, aria-describedby
 */
;(function navbarGifts() {
  "use strict";

  if (window.__pncGT_loaded) return;
  window.__pncGT_loaded = true;

  // === CONFIG ===
  var BASE_URL = "https://www.mincultura.gov.co/despacho/plan-nacional-de-cultura/images/gifts/";

  // Mapa de textos de navegación/encabezados → archivo GIF
  var GIFT_MAP = {
    // Ítems del menú de navegación
    "INICIO":       "inicio....gif",
    "¿QUÉ ES?":    "Que%20es.gif",
    "NOTICIAS":     "Noticias.gif",
    "VIDEOS":       "Videos.gif",
    "DOCUMENTOS":   "Documentos.gif",

    // Encabezados de sección (h1, h2)
    "Plan Nacional de Cultura 2024-2038": "Plan%20Nacional%20de%20Cultura.gif",
    "NOTICIAS":     "Noticias.gif",
    "VIDEOS":       "Videos.gif",
    "Documentos de consulta": "Documentos%20de%20consulta.gif"
  };

  // === ESTILOS ===
  var css = document.createElement("style");
  css.setAttribute("data-owner", "pnc-navbar-gifts");
  css.textContent = [
    /* Contenedor tooltip */
    ".pncGT_ {",
    "  position: fixed;",
    "  z-index: 100000;",
    "  background: #fff;",
    "  border: 2px solid #310864;",
    "  border-radius: 8px;",
    "  padding: 3px;",
    "  box-shadow: 0 2px 10px rgba(0,0,0,.15);",
    "  opacity: 0;",
    "  visibility: hidden;",
    "  transition: opacity .12s, visibility .12s;",
    "  pointer-events: none;",
    "  width: 130px;",
    "}",
    ".pncGT_--show {",
    "  opacity: 1;",
    "  visibility: visible;",
    "  pointer-events: auto;",
    "}",
    /* Imagen GIF */
    ".pncGT_ img {",
    "  display: block;",
    "  width: 100%;",
    "  height: auto;",
    "  border-radius: 4px;",
    "  aspect-ratio: 1/1;",
    "  object-fit: cover;",
    "}",
    /* Botón pausa */
    ".pncGT__btn {",
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
    ".pncGT__btn:focus-visible {",
    "  outline: 2px solid #310864;",
    "  outline-offset: 2px;",
    "}",
    /* Caption oculto visualmente, disponible para lectores de pantalla */
    ".pncGT__cap {",
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
    /* Flecha superior (apunta al menú) */
    ".pncGT_::after {",
    "  content: '';",
    "  position: absolute;",
    "  top: -7px;",
    "  left: 50%;",
    "  transform: translateX(-50%);",
    "  border-left: 7px solid transparent;",
    "  border-right: 7px solid transparent;",
    "  border-bottom: 7px solid #fff;",
    "}",
    ".pncGT_::before {",
    "  content: '';",
    "  position: absolute;",
    "  top: -9px;",
    "  left: 50%;",
    "  transform: translateX(-50%);",
    "  border-left: 8px solid transparent;",
    "  border-right: 8px solid transparent;",
    "  border-bottom: 8px solid #310864;",
    "}",
    /* Responsive: más compacto en móvil */
    "@media (max-width: 768px) {",
    "  .pncGT_ { width: 100px; padding: 3px; }",
    "  .pncGT__btn { width: 16px; height: 16px; min-width: 16px; min-height: 16px; max-width: 16px; max-height: 16px; font-size: 8px; }",
    "}",
    "@media (max-width: 480px) {",
    "  .pncGT_ { width: 80px; }",
    "}"
  ].join("\n");
  document.head.appendChild(css);

  // === TOOLTIP SINGLETON ===
  var tip = null;
  var hideTimer = null;
  var showTimer = null;
  var isPaused = false;
  var pausedSrc = "";

  function build() {
    var el = document.createElement("div");
    el.className = "pncGT_";
    el.id = "pncGT_tip";
    el.setAttribute("role", "tooltip");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<img src="" alt="" />' +
      '<button type="button" class="pncGT__btn" aria-label="Pausar animación">\u23F8</button>' +
      '<p class="pncGT__cap"></p>';
    document.body.appendChild(el);

    var btn = el.querySelector(".pncGT__btn");
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
    var cap = tip.querySelector(".pncGT__cap");
    var btn = tip.querySelector(".pncGT__btn");

    // Reset
    isPaused = false;
    pausedSrc = "";
    btn.textContent = "\u23F8";
    btn.setAttribute("aria-label", "Pausar animación");
    img.style.animationPlayState = "";

    img.src = BASE_URL + gif;
    img.setAttribute("alt", "Seña en Lengua de Señas Colombiana: " + label);
    cap.textContent = label;

    trigger.setAttribute("aria-describedby", "pncGT_tip");

    // Posicionar ARRIBA del elemento
    var rect = trigger.getBoundingClientRect();
    var tipH = 140;
    var topPos = rect.top - tipH + 2;

    // Si no cabe arriba, ponerlo abajo
    if (topPos < 2) {
      topPos = rect.bottom + 4;
    }

    var leftPos = rect.left + (rect.width / 2) - 65;

    // No salirse por la derecha
    if (leftPos + 138 > window.innerWidth) {
      leftPos = window.innerWidth - 146;
    }
    // No salirse por la izquierda
    if (leftPos < 8) leftPos = 8;

    tip.style.top = topPos + "px";
    tip.style.left = leftPos + "px";
    tip.classList.add("pncGT_--show");
    tip.setAttribute("aria-hidden", "false");
  }

  function scheduleHide() {
    hideTimer = setTimeout(hideTip, 200);
  }

  function hideTip() {
    if (!tip) return;
    tip.classList.remove("pncGT_--show");
    tip.setAttribute("aria-hidden", "true");
    var el = document.querySelector('[aria-describedby="pncGT_tip"]');
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
  function bindElements() {
    var bound = 0;

    // 1. Enlazar ítems del menú de navegación (.nav-link)
    var navLinks = document.querySelectorAll(".nav-link");
    for (var i = 0; i < navLinks.length; i++) {
      var text = navLinks[i].textContent.trim();
      var gif = GIFT_MAP[text];
      if (!gif) continue;
      if (navLinks[i].getAttribute("data-pncgt")) continue;
      navLinks[i].setAttribute("data-pncgt", "1");
      attachEvents(navLinks[i], gif, text);
      bound++;
    }

    // 2. Enlazar encabezados de sección (h1, h2)
    var headings = document.querySelectorAll("h1, h2");
    for (var j = 0; j < headings.length; j++) {
      var hText = headings[j].textContent.trim();
      var hGif = GIFT_MAP[hText];
      if (!hGif) continue;
      if (headings[j].getAttribute("data-pncgt")) continue;
      headings[j].setAttribute("data-pncgt", "1");
      headings[j].setAttribute("tabindex", "0");
      attachEvents(headings[j], hGif, hText);
      bound++;
    }

    return bound > 0;
  }

  function attachEvents(trigger, gif, label) {
    trigger.addEventListener("mouseenter", function () {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
      showTimer = setTimeout(function () { showTip(trigger, gif, label); }, 350);
    });
    trigger.addEventListener("mouseleave", function () {
      clearTimeout(showTimer);
      scheduleHide();
    });
    trigger.addEventListener("focusin", function () {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
      showTimer = setTimeout(function () { showTip(trigger, gif, label); }, 350);
    });
    trigger.addEventListener("focusout", function () {
      clearTimeout(showTimer);
      scheduleHide();
    });
  }

  // Init con reintentos (por si el DOM carga async)
  function init() {
    if (bindElements()) return;
    var attempts = 0;
    var iv = setInterval(function () {
      attempts++;
      if (bindElements() || attempts >= 20) clearInterval(iv);
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
