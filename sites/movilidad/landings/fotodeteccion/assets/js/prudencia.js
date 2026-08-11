/**
 * Prudencia — Aparece y desaparece de forma espontánea
 * Sin repetir posiciones ni sprites consecutivos.
 */
(function () {
  "use strict";

  // No animar si el usuario prefiere movimiento reducido
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // No mostrar en móvil
  if (window.innerWidth < 768) return;

  var BASE = "https://www.movilidadbogota.gov.co/sites/default/files/micrositios/assets/2026-07-30/";
  var sprites = [
    "prudencia_1.png",
    "prudencia_2.png",
    "prudencia_3.png",
    "prudencia-1.gif",
    "prudencia-2.gif",
    "prudencia-3.gif"
  ];

  var positions = [
    { bottom: "8%", right: "3%" },
    { top: "20%", left: "2%" },
    { bottom: "15%", left: "4%" },
    { top: "35%", right: "2%" },
    { bottom: "30%", right: "5%" },
    { top: "50%", left: "3%" },
    { bottom: "45%", right: "4%" },
    { top: "65%", left: "2%" }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var shuffledSprites = shuffle(sprites);
  var shuffledPositions = shuffle(positions);
  var current = 0;
  var MAX = 4;
  var el = null;

  function init() {
    el = document.createElement("img");
    el.alt = "";
    el.setAttribute("aria-hidden", "true");
    el.style.position = "fixed";
    el.style.zIndex = "9990";
    el.style.pointerEvents = "none";
    el.style.maxWidth = "75px";
    el.style.height = "auto";
    el.style.opacity = "0";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    el.style.transform = "translateY(10px)";
    document.body.appendChild(el);
  }

  function appear() {
    if (current >= MAX) return;

    var sprite = shuffledSprites[current % shuffledSprites.length];
    var pos = shuffledPositions[current % shuffledPositions.length];
    current++;

    // Reset all position props
    el.style.top = "auto";
    el.style.bottom = "auto";
    el.style.left = "auto";
    el.style.right = "auto";

    // Apply position
    if (pos.top) el.style.top = pos.top;
    if (pos.bottom) el.style.bottom = pos.bottom;
    if (pos.left) el.style.left = pos.left;
    if (pos.right) el.style.right = pos.right;

    // Set sprite
    el.src = BASE + sprite;

    // Force reflow then animate in
    el.style.transform = "translateY(10px)";
    el.style.opacity = "0";

    setTimeout(function () {
      el.style.opacity = "0.9";
      el.style.transform = "translateY(0)";
    }, 50);

    // Stay visible 4-6s then fade out
    var stayDuration = 4000 + Math.random() * 2000;
    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";

      // Schedule next after fade out completes
      setTimeout(function () {
        scheduleNext();
      }, 900);
    }, stayDuration);
  }

  function scheduleNext() {
    if (current >= MAX) return;
    var delay = 8000 + Math.random() * 12000; // 8-20s entre apariciones
    setTimeout(appear, delay);
  }

  // Start on scroll
  var started = false;
  function onScroll() {
    if (started) return;
    if (window.scrollY > 300) {
      started = true;
      window.removeEventListener("scroll", onScroll);
      init();
      // Primera aparición después de 3-6s
      setTimeout(appear, 3000 + Math.random() * 3000);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();
