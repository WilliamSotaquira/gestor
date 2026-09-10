/**
 * config.js
 * Configuración central del micrositio "Historias sobre la bici".
 *
 * Regla de no invención: cualquier recurso no suministrado oficialmente se deja en `null`
 * con su TODO. La UI debe degradar de forma elegante (ocultar/deshabilitar), nunca inventar.
 */

/**
 * Detección de entorno sin depender de un backend.
 * Vite expone `import.meta.env.DEV` en desarrollo. Si se sirve como archivo estático
 * fuera de Vite, se asume producción (DEV = false) por seguridad.
 */
const IS_DEV = Boolean(
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.DEV
);

/** @type {{ isDev: boolean, form: object, links: object, ui: object, seo: object }} */
export const CONFIG = {
  isDev: IS_DEV,

  form: {
    // TODO: definir endpoint real de recepción del formulario. Mientras sea null,
    // solo se usa el mock en desarrollo; en producción se muestra estado de error controlado.
    endpoint: null,
    // Límite configurable de caracteres para la historia (documento: 400–500).
    maxStoryLength: 500,
    // Habilita el mock de envío ÚNICAMENTE en desarrollo. Nunca simular éxito en producción.
    useMockInDev: true,
  },

  links: {
    // TODO: URL oficial de la Política de Tratamiento de Datos de la SDM (Ley 1581/2012). No inventar.
    // Se enlaza junto al checkbox de autorización cuando esté disponible.
    dataPolicyUrl: null,
    // Nota: enlaces institucionales y redes del footer usan datos oficiales ya verificados
    // en el repo (facebook.com/SectorMovilidad, twitter.com/SectorMovilidad,
    // instagram.com/saboramovilidad, youtube @SecretariaMovilidadBogota) y viven en index.html.
  },

  ui: {
    // Respeta prefers-reduced-motion en tiempo de ejecución.
    smoothScroll: true,
  },

  seo: {
    title: 'Historias sobre la bici | Secretaría Distrital de Movilidad de Bogotá',
    description:
      'Un archivo vivo de relatos y experiencias ciudadanas que muestran cómo la bicicleta ' +
      'mueve historias en Bogotá.',
    // TODO: URL canónica de producción. No inventar.
    canonical: null,
    // TODO: imagen OpenGraph definitiva. No inventar.
    ogImage: null,
  },
};

export default CONFIG;
