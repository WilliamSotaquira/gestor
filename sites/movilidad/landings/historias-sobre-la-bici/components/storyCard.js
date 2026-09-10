/**
 * components/storyCard.js
 * Render de una tarjeta de historia (StoryCard).
 */

import { escapeHtml } from '../utils/dom.js';

/**
 * Placeholder neutro (silueta) usado cuando image === null.
 * NO debe parecer una fotografía real de la persona.
 * @returns {string}
 */
function placeholderMarkup() {
  return `
    <div class="story-card__placeholder" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6z"/>
      </svg>
    </div>
  `;
}

/**
 * Devuelve el markup de una tarjeta de historia.
 * @param {import('../data/historias.js').Story} story
 * @returns {string}
 */
export function renderStoryCard(story) {
  const media = story.image
    ? `<img class="story-card__img" src="${escapeHtml(story.image)}" alt="${escapeHtml(story.imageAlt)}" loading="lazy" width="300" height="300">`
    : placeholderMarkup();

  const profile = story.profile
    ? `<p class="story-card__profile">${escapeHtml(story.profile)}</p>`
    : `<p class="story-card__profile story-card__profile--pending">Perfil por publicar</p>`;

  const desc = story.shortDescription
    ? `<p class="story-card__desc">${escapeHtml(story.shortDescription)}</p>`
    : `<p class="story-card__desc story-card__desc--pending">Historia por publicar.</p>`;

  return `
    <article class="story-card h-100" data-story-id="${story.id}">
      <div class="story-card__media">${media}</div>
      <div class="story-card__body">
        <h3 class="story-card__name">${escapeHtml(story.name)}</h3>
        ${profile}
        ${desc}
        <button type="button" class="btn-govco fill-btn-govco story-card__cta" data-open-story="${story.id}">
          Conoce su historia
          <span class="visually-hidden"> de ${escapeHtml(story.name)}</span>
        </button>
      </div>
    </article>
  `;
}

export default renderStoryCard;
