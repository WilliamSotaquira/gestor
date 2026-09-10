/**
 * data/historias.js
 * Fuente de datos de las 20 historias del micrositio.
 *
 * REGLA DE NO INVENCIÓN:
 * - Los NOMBRES son oficiales (aprobados).
 * - profile, shortDescription, image, videoUrl y articleUrl están PENDIENTES de la
 *   documentación oficial. Se dejan en null (o cadena vacía) hasta que se suministren.
 *   NO inventar perfiles, descripciones, fotos, videos ni PDFs.
 *
 * Cómo trabajar con este archivo:
 * - Agregar una historia nueva: añadir un objeto al array con un `id` y `order` únicos.
 * - Cambiar el orden de aparición: modificar el campo `order` (se ordena ascendente).
 * - Ocultar temporalmente una historia: poner `published: false`.
 */

/**
 * @typedef {('pdf'|'web'|null)} ArticleType
 */

/**
 * @typedef {Object} Story
 * @property {number} id
 * @property {string} slug
 * @property {string} name
 * @property {string|null} profile           Perfil corto (ej. "Estudiante"). null si pendiente.
 * @property {string|null} shortDescription  Frase para la tarjeta. null si pendiente.
 * @property {string|null} description        Texto completo para el modal. null si pendiente.
 * @property {string|null} image             Ruta a la fotografía. null => placeholder neutro.
 * @property {string} imageAlt               Texto alternativo de la fotografía.
 * @property {string|null} videoUrl          URL final de YouTube. null => sin botón de video.
 * @property {string|null} articleUrl        URL del PDF/publicación. null => sin botón de artículo.
 * @property {ArticleType} articleType       Tipo de artículo enlazado.
 * @property {boolean} published
 * @property {number} order
 */

/**
 * Genera un slug simple y estable a partir del nombre.
 * @param {string} name
 * @returns {string}
 */
function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar tildes
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Nombres oficiales, en orden de aparición aprobado. */
const NOMBRES_OFICIALES = [
  'Mauricio Jiménez',
  'Jorge Monroy',
  'Luz Marina Ramirez',
  'Jose Luis Díaz',
  'Bryan Garzón',
  'Adrian Chávez Andrade',
  'Eliana González',
  'Carolina Castro',
  'Lorena Nieto',
  'Diego Rodríguez',
  'Oscar Jesus Murillo',
  'Juan David Quitian',
  'Julián Sierra',
  'Dayana Villalobos',
  'Oriana Barreto',
  'David Torres',
  'Andrés Gómez',
  'Diana Piraquive',
  'Tomás Villescas',
  'Juan Felipe Lamus',
];

/**
 * Construye el registro base de cada historia con recursos pendientes en null.
 * TODO: reemplazar profile/shortDescription/description/image/videoUrl/articleUrl
 *       con la información oficial cuando sea suministrada.
 * @type {Story[]}
 */
export const historias = NOMBRES_OFICIALES.map((name, index) => ({
  id: index + 1,
  slug: slugify(name),
  name,
  profile: null, // TODO: perfil oficial
  shortDescription: null, // TODO: descripción corta oficial
  description: null, // TODO: relato completo oficial (para el modal)
  image: null, // TODO: fotografía oficial => usar placeholder mientras sea null
  imageAlt: `Fotografía de ${name}`,
  videoUrl: null, // TODO: URL final de YouTube
  articleUrl: null, // TODO: URL final del PDF/publicación
  articleType: null,
  published: true,
  order: index + 1,
}));

/**
 * Devuelve las historias publicadas, ordenadas por `order` ascendente.
 * @returns {Story[]}
 */
export function getHistoriasPublicadas() {
  return historias
    .filter((s) => s.published)
    .slice()
    .sort((a, b) => a.order - b.order);
}

/**
 * Busca una historia por su id.
 * @param {number} id
 * @returns {Story|undefined}
 */
export function getHistoriaById(id) {
  return historias.find((s) => s.id === Number(id));
}

/**
 * Valida que las historias publicadas no generen enlaces inválidos.
 * No rompe la página; reporta en consola solo en desarrollo.
 * @param {boolean} [isDev=false]
 * @returns {string[]} lista de advertencias encontradas
 */
export function validarHistorias(isDev = false) {
  const warnings = [];
  for (const s of historias) {
    if (!s.published) continue;
    if (s.videoUrl != null && !/^https?:\/\//i.test(s.videoUrl)) {
      warnings.push(`Historia "${s.name}" (id ${s.id}): videoUrl no es una URL válida.`);
    }
    if (s.articleUrl != null && !/^https?:\/\//i.test(s.articleUrl)) {
      warnings.push(`Historia "${s.name}" (id ${s.id}): articleUrl no es una URL válida.`);
    }
    if (s.articleUrl != null && s.articleType == null) {
      warnings.push(`Historia "${s.name}" (id ${s.id}): tiene articleUrl pero articleType es null.`);
    }
  }
  if (isDev && warnings.length) {
    // eslint-disable-next-line no-console
    console.warn('[historias] Advertencias de validación:\n' + warnings.join('\n'));
  }
  return warnings;
}

export default historias;
