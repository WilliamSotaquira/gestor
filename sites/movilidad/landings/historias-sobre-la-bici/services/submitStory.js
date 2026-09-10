/**
 * services/submitStory.js
 * Abstracción de envío del formulario de participación.
 *
 * Regla: si no hay endpoint real configurado, solo se usa un mock EN DESARROLLO.
 * En producción sin endpoint, se devuelve error controlado (nunca simular éxito).
 */

import { CONFIG } from '../config.js';

/**
 * @typedef {Object} StoryFormData
 * @property {string} nombre
 * @property {string} email
 * @property {string} telefono
 * @property {string} [localidad]
 * @property {string} historia
 * @property {boolean} autorizacion
 */

/**
 * Envía la historia al backend configurado.
 * @param {StoryFormData} formData
 * @returns {Promise<{ ok: boolean, message?: string }>}
 */
export async function submitStory(formData) {
  const { endpoint, useMockInDev } = CONFIG.form;

  // Con endpoint real: envío HTTP normal.
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error(`El servidor respondió con estado ${res.status}.`);
    }
    return { ok: true };
  }

  // Sin endpoint: mock SOLO en desarrollo.
  if (CONFIG.isDev && useMockInDev) {
    await new Promise((r) => setTimeout(r, 800));
    // eslint-disable-next-line no-console
    console.info('[submitStory][MOCK DEV] Datos recibidos:', formData);
    return { ok: true, message: 'Envío simulado (mock de desarrollo).' };
  }

  // Sin endpoint en producción: no simular éxito.
  // TODO: configurar CONFIG.form.endpoint antes de publicar.
  throw new Error(
    'El envío no está disponible temporalmente. Por favor intenta más tarde.'
  );
}

export default submitStory;
