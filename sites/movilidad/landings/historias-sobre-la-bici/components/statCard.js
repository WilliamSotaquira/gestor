/**
 * components/statCard.js
 * Render de una tarjeta de cifra (StatCard).
 */

import { escapeHtml } from '../utils/dom.js';

/**
 * Íconos SVG inline por nombre lógico. Son decorativos (aria-hidden).
 * @type {Record<string, string>}
 */
const ICONS = {
  viajes:
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3.2"/><circle cx="18" cy="17" r="3.2"/><path d="M6 17l3.5-7h4l2.5 7M9.5 10l-1-3H6.8"/></svg>',
  infraestructura:
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-16M20 20L16 4M9 8h6M8 12h8M7 16h10"/></svg>',
  registro:
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h6M8 17h4"/></svg>',
  parqueadero:
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 17V8h3.5a2.5 2.5 0 0 1 0 5H9"/></svg>',
  estudiantes:
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4"/></svg>',
  recuperadas:
    '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
};

/**
 * Devuelve el markup de una tarjeta de cifra.
 * @param {import('../data/cifras.js').Stat} stat
 * @returns {string}
 */
export function renderStatCard(stat) {
  const icon = ICONS[stat.icon] || '';
  const support = stat.support
    ? `<p class="stat-card__support">${escapeHtml(stat.support)}</p>`
    : '';

  return `
    <article class="stat-card h-100">
      <span class="stat-card__icon" aria-hidden="true">${icon}</span>
      <p class="stat-card__value">${escapeHtml(stat.value)}</p>
      <p class="stat-card__label">${escapeHtml(stat.label)}</p>
      ${support}
    </article>
  `;
}

export default renderStatCard;
