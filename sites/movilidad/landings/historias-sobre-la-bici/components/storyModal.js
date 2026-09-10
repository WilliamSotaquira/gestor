/**
 * components/storyModal.js
 * Modal accesible de detalle de historia.
 *
 * Accesibilidad: role="dialog", aria-modal, aria-labelledby, focus trap, ESC cierra,
 * botón cerrar visible, retorno de foco al trigger, scroll del fondo bloqueado.
 * El iframe de YouTube se carga de forma diferida (solo al pulsar reproducir). Sin autoplay.
 */

import { escapeHtml } from '../utils/dom.js';
import { getHistoriaById } from '../data/historias.js';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Extrae el id de video de YouTube de una URL (watch, youtu.be o embed).
 * @param {string} url
 * @returns {string|null}
 */
function youtubeId(url) {
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

export class StoryModal {
  /**
   * @param {{ onEvent?: (name: string, payload: object) => void }} [options]
   */
  constructor(options = {}) {
    this.onEvent = options.onEvent || (() => {});
    this.lastFocused = null;
    this.currentStory = null;
    this._buildRoot();
    this._bindGlobal();
  }

  _buildRoot() {
    const root = document.createElement('div');
    root.className = 'story-modal';
    root.setAttribute('hidden', '');
    root.innerHTML = `
      <div class="story-modal__overlay" data-close></div>
      <div class="story-modal__dialog" role="dialog" aria-modal="true"
           aria-labelledby="story-modal-title">
        <button type="button" class="story-modal__close" data-close aria-label="Cerrar">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="story-modal__content"></div>
      </div>
    `;
    document.body.appendChild(root);
    this.root = root;
    this.dialog = root.querySelector('.story-modal__dialog');
    this.content = root.querySelector('.story-modal__content');
  }

  _bindGlobal() {
    // Cierres por overlay / botón
    this.root.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) this.close();
    });
    // ESC + focus trap
    document.addEventListener('keydown', (e) => {
      if (this.root.hasAttribute('hidden')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key === 'Tab') {
        this._trapFocus(e);
      }
    });
  }

  /**
   * @param {KeyboardEvent} e
   */
  _trapFocus(e) {
    const items = this.dialog.querySelectorAll(FOCUSABLE);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /**
   * Abre el modal con la historia indicada.
   * @param {number} storyId
   * @param {HTMLElement|null} trigger  Elemento que disparó la apertura.
   */
  open(storyId, trigger = null) {
    const story = getHistoriaById(storyId);
    if (!story) return;
    this.currentStory = story;
    this.lastFocused = trigger || document.activeElement;

    this.content.innerHTML = this._renderContent(story);
    this._bindContent(story);

    this.root.removeAttribute('hidden');
    document.body.classList.add('story-modal-open');

    // foco al diálogo
    const closeBtn = this.dialog.querySelector('.story-modal__close');
    if (closeBtn) closeBtn.focus();

    this.onEvent('story_open', { id: story.id, slug: story.slug });
  }

  close() {
    if (this.root.hasAttribute('hidden')) return;
    this.root.setAttribute('hidden', '');
    document.body.classList.remove('story-modal-open');
    this.content.innerHTML = ''; // descarga cualquier iframe embebido
    if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
      this.lastFocused.focus();
    }
    this.currentStory = null;
  }

  /**
   * @param {import('../data/historias.js').Story} story
   * @returns {string}
   */
  _renderContent(story) {
    const profile = story.profile
      ? `<p class="story-modal__profile">${escapeHtml(story.profile)}</p>`
      : '';
    const description = story.description
      ? `<p class="story-modal__desc">${escapeHtml(story.description)}</p>`
      : `<p class="story-modal__desc story-modal__desc--pending">El relato completo de esta historia estará disponible próximamente.</p>`;

    // Media: si hay video, se muestra una fachada (imagen/botón) que carga el iframe al pulsar.
    let media = '';
    if (story.videoUrl && youtubeId(story.videoUrl)) {
      media = `
        <div class="story-modal__media" data-video-facade>
          <button type="button" class="story-modal__play" data-play-video
                  aria-label="Reproducir el video de ${escapeHtml(story.name)}">
            <span class="story-modal__play-icon" aria-hidden="true">▶</span>
          </button>
        </div>`;
    } else if (story.image) {
      media = `<div class="story-modal__media"><img src="${escapeHtml(story.image)}" alt="${escapeHtml(story.imageAlt)}"></div>`;
    }

    // Acciones: solo se muestran si el recurso existe (nunca href="#").
    const actions = [];
    if (story.videoUrl && youtubeId(story.videoUrl)) {
      actions.push(
        `<a class="btn-govco outline-btn-govco" href="${escapeHtml(story.videoUrl)}"
            target="_blank" rel="noopener noreferrer" data-video-link>
           Ver el video en YouTube
           <span class="visually-hidden"> (se abre en una nueva pestaña)</span>
         </a>`
      );
    }
    if (story.articleUrl) {
      const label = story.articleType === 'pdf' ? 'Leer la historia (PDF)' : 'Leer la historia';
      actions.push(
        `<a class="btn-govco fill-btn-govco" href="${escapeHtml(story.articleUrl)}"
            target="_blank" rel="noopener noreferrer" data-article-link>
           ${label}
           <span class="visually-hidden"> (se abre en una nueva pestaña)</span>
         </a>`
      );
    }
    const actionsHtml = actions.length
      ? `<div class="story-modal__actions">${actions.join('')}</div>`
      : '';

    return `
      <h2 class="story-modal__name" id="story-modal-title">${escapeHtml(story.name)}</h2>
      ${profile}
      ${media}
      ${description}
      ${actionsHtml}
    `;
  }

  /**
   * @param {import('../data/historias.js').Story} story
   */
  _bindContent(story) {
    const playBtn = this.content.querySelector('[data-play-video]');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const id = youtubeId(story.videoUrl);
        if (!id) return;
        const facade = this.content.querySelector('[data-video-facade]');
        facade.innerHTML = `
          <iframe class="story-modal__iframe"
            src="https://www.youtube-nocookie.com/embed/${id}?rel=0"
            title="Video de ${escapeHtml(story.name)}"
            frameborder="0" allowfullscreen
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
        const frame = facade.querySelector('iframe');
        if (frame) frame.focus();
        this.onEvent('story_video_click', { id: story.id, slug: story.slug });
      });
    }
    const videoLink = this.content.querySelector('[data-video-link]');
    if (videoLink) {
      videoLink.addEventListener('click', () =>
        this.onEvent('story_video_click', { id: story.id, slug: story.slug })
      );
    }
    const articleLink = this.content.querySelector('[data-article-link]');
    if (articleLink) {
      articleLink.addEventListener('click', () =>
        this.onEvent('story_article_click', { id: story.id, slug: story.slug })
      );
    }
  }
}

export default StoryModal;
