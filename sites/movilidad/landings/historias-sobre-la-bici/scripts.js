/**
 * scripts.js — Orquestador del micrositio "Historias sobre la bici".
 * Render de cifras e historias, modal, navegación, validación de formulario,
 * analítica y enlaces configurables. JS vanilla (ES modules).
 */

import { CONFIG } from './config.js';
import { cifras, cifrasFuente } from './data/cifras.js';
import { getHistoriasPublicadas, validarHistorias } from './data/historias.js';
import { renderStatCard } from './components/statCard.js';
import { renderStoryCard } from './components/storyCard.js';
import { StoryModal } from './components/storyModal.js';
import { submitStory } from './services/submitStory.js';
import { escapeHtml } from './utils/dom.js';

/* ------------------------------------------------------------------ */
/* Analítica: puntos de integración (sin plataforma conectada aún).    */
/* ------------------------------------------------------------------ */
function track(eventName, payload = {}) {
  // TODO: conectar plataforma de analítica cuando se confirme.
  if (CONFIG.isDev) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', eventName, payload);
  }
}

/* ------------------------------------------------------------------ */
/* Render de cifras                                                    */
/* ------------------------------------------------------------------ */
function renderCifras() {
  const grid = document.getElementById('stats-grid');
  const source = document.getElementById('stats-source');
  if (grid) {
    grid.innerHTML = cifras
      .map((s) => `<div class="col">${renderStatCard(s)}</div>`)
      .join('');
  }
  if (source) source.textContent = `Fuente: ${cifrasFuente}`;
}

/* ------------------------------------------------------------------ */
/* Render de historias                                                 */
/* ------------------------------------------------------------------ */
function renderHistorias() {
  const grid = document.getElementById('stories-grid');
  if (!grid) return;
  const historias = getHistoriasPublicadas();
  grid.innerHTML = historias
    .map((h) => `<div class="col">${renderStoryCard(h)}</div>`)
    .join('');
}

/* ------------------------------------------------------------------ */
/* Modal (delegación de eventos sobre la grilla)                       */
/* ------------------------------------------------------------------ */
function initModal() {
  const modal = new StoryModal({ onEvent: track });
  const grid = document.getElementById('stories-grid');
  if (!grid) return;
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-story]');
    if (!btn) return;
    const id = Number(btn.getAttribute('data-open-story'));
    modal.open(id, btn);
  });
}

/* ------------------------------------------------------------------ */
/* Navegación de anclas (toggle móvil)                                 */
/* ------------------------------------------------------------------ */
function initNav() {
  const toggle = document.querySelector('.micrositio-nav__toggle');
  const list = document.getElementById('nav-anclas');
  if (!toggle || !list) return;
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      list.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ------------------------------------------------------------------ */
/* Botón "volver arriba"                                               */
/* ------------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  const onScroll = () => {
    if (window.scrollY > 600) btn.removeAttribute('hidden');
    else btn.setAttribute('hidden', '');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'auto' }));
  onScroll();
}

/* ------------------------------------------------------------------ */
/* Enlaces configurables (política de datos + footer)                  */
/* ------------------------------------------------------------------ */
function initConfigurableLinks() {
  // Enlace a la política de datos (solo si existe URL).
  const slot = document.getElementById('policy-link-slot');
  if (slot) {
    if (CONFIG.links.dataPolicyUrl) {
      slot.innerHTML =
        ` <a href="${escapeHtml(CONFIG.links.dataPolicyUrl)}" target="_blank" ` +
        `rel="noopener noreferrer">Consulta la política</a>.`;
    }
    // Si es null: no se inventa enlace. (TODO en config.js).
  }

  // Los enlaces institucionales y redes del footer están en el HTML con datos
  // oficiales verificados de la SDM (Facebook/X/Instagram/YouTube, Calle 13 # 37-35, (601) 195).
}

/* ------------------------------------------------------------------ */
/* Formulario de participación                                         */
/* ------------------------------------------------------------------ */
function initForm() {
  const form = document.getElementById('story-form');
  if (!form) return;

  const maxLen = CONFIG.form.maxStoryLength;
  const historia = form.querySelector('#f-historia');
  const counter = form.querySelector('#counter-historia');
  const submitBtn = form.querySelector('#form-submit');
  const message = form.querySelector('#form-message');
  let started = false;

  // Límite y contador
  if (historia) {
    historia.setAttribute('maxlength', String(maxLen));
    const updateCounter = () => {
      if (counter) counter.textContent = `${historia.value.length} / ${maxLen}`;
    };
    historia.addEventListener('input', () => {
      updateCounter();
      if (!started) {
        started = true;
        track('form_start');
      }
    });
    updateCounter();
  }

  /** Muestra un error asociado a un campo. */
  function setError(fieldId, errId, msg) {
    const field = form.querySelector(`#${fieldId}`);
    const err = form.querySelector(`#${errId}`);
    if (field) field.setAttribute('aria-invalid', 'true');
    if (err) {
      err.textContent = msg;
      err.style.display = 'block';
      err.hidden = false;
    }
  }
  function clearError(fieldId, errId) {
    const field = form.querySelector(`#${fieldId}`);
    const err = form.querySelector(`#${errId}`);
    if (field) field.setAttribute('aria-invalid', 'false');
    if (err) {
      err.textContent = '';
      err.style.display = 'none';
      err.hidden = true;
    }
  }

  function validate() {
    let ok = true;
    let firstInvalid = null;

    const nombre = form.querySelector('#f-nombre');
    if (!nombre.value.trim()) {
      setError('f-nombre', 'err-nombre', 'Ingresa tu nombre completo.');
      ok = false; firstInvalid = firstInvalid || nombre;
    } else clearError('f-nombre', 'err-nombre');

    const email = form.querySelector('#f-email');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError('f-email', 'err-email', 'Ingresa tu correo electrónico.');
      ok = false; firstInvalid = firstInvalid || email;
    } else if (!emailRe.test(email.value.trim())) {
      setError('f-email', 'err-email', 'Ingresa un correo electrónico válido.');
      ok = false; firstInvalid = firstInvalid || email;
    } else clearError('f-email', 'err-email');

    const tel = form.querySelector('#f-telefono');
    if (!tel.value.trim()) {
      setError('f-telefono', 'err-telefono', 'Ingresa tu teléfono o WhatsApp.');
      ok = false; firstInvalid = firstInvalid || tel;
    } else clearError('f-telefono', 'err-telefono');

    const hist = form.querySelector('#f-historia');
    if (!hist.value.trim()) {
      setError('f-historia', 'err-historia', 'Cuéntanos tu historia.');
      ok = false; firstInvalid = firstInvalid || hist;
    } else clearError('f-historia', 'err-historia');

    const auth = form.querySelector('#f-autorizacion');
    if (!auth.checked) {
      setError('f-autorizacion', 'err-autorizacion',
        'Debes autorizar el tratamiento de datos para enviar tu historia.');
      ok = false; firstInvalid = firstInvalid || auth;
    } else clearError('f-autorizacion', 'err-autorizacion');

    if (firstInvalid) firstInvalid.focus();
    return ok;
  }

  function showMessage(text, kind) {
    if (!message) return;
    message.textContent = text;
    message.className = `form-message form-message--${kind}`;
    message.hidden = false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    track('form_submit');
    if (!validate()) return;

    const data = {
      nombre: form.querySelector('#f-nombre').value.trim(),
      email: form.querySelector('#f-email').value.trim(),
      telefono: form.querySelector('#f-telefono').value.trim(),
      localidad: form.querySelector('#f-localidad').value,
      historia: form.querySelector('#f-historia').value.trim(),
      autorizacion: form.querySelector('#f-autorizacion').checked,
    };

    // Estado: submitting (evita doble envío)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    try {
      await submitStory(data);
      showMessage(
        '¡Gracias por compartir tu historia! Nuestro equipo la leerá y se pondrá en contacto contigo pronto.',
        'success'
      );
      track('form_success');
      form.reset();
      if (counter) counter.textContent = `0 / ${maxLen}`;
    } catch (err) {
      showMessage(
        err && err.message
          ? err.message
          : 'Ocurrió un error al enviar tu historia. Por favor intenta de nuevo.',
        'error'
      );
      track('form_error', { message: err && err.message });
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar historia';
    }
  });
}

/* ------------------------------------------------------------------ */
/* Arranque                                                            */
/* ------------------------------------------------------------------ */
function init() {
  validarHistorias(CONFIG.isDev);
  renderCifras();
  renderHistorias();
  initModal();
  initNav();
  initBackToTop();
  initConfigurableLinks();
  initForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
