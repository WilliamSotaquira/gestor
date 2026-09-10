/**
 * data/cifras.js
 * Cifras oficiales del micrositio "Historias sobre la bici".
 *
 * ADVERTENCIA: los números del wireframe son ILUSTRATIVOS y NO coinciden con estos.
 * Estas son las cifras oficiales aprobadas. No modificar sin fuente.
 * Fuente: Secretaría Distrital de Movilidad de Bogotá, junio de 2026.
 */

/**
 * @typedef {Object} Stat
 * @property {string} value    Cifra destacada (formato de presentación).
 * @property {string} label    Descripción principal de la cifra.
 * @property {string|null} support  Dato de apoyo/contexto (o null si no aplica).
 * @property {string} icon     Nombre lógico del ícono (decorativo, aria-hidden).
 */

/** @type {Stat[]} */
export const cifras = [
  {
    value: '886.000+',
    label: 'Viajes diarios en bicicleta',
    support: '7,3 % de todos los desplazamientos de la ciudad.',
    icon: 'viajes',
  },
  {
    value: '683 km',
    label: 'Cicloinfraestructura permanente',
    support: '87 km nuevos en construcción hacia 2027.',
    icon: 'infraestructura',
  },
  {
    value: '550.000+',
    label: 'Bicicletas registradas en Registro Bici Bogotá',
    support: null,
    icon: 'registro',
  },
  {
    value: '85.000+',
    label: 'Cicloparqueaderos para bicicletas y vehículos de micromovilidad',
    support: null,
    icon: 'parqueadero',
  },
  {
    value: '6.660',
    label: 'Estudiantes beneficiados por Al Colegio en Bici y BiciParceros',
    // TODO: confirmar contra documento oficial el sub-dato "416.667 viajes acompañados".
    // Mientras no esté confirmado, se deja fuera de la UI (null).
    support: null,
    icon: 'estudiantes',
  },
  {
    value: '2.400+',
    label: 'Bicicletas hurtadas recuperadas gracias al Registro Bici',
    support: null,
    icon: 'recuperadas',
  },
];

/** Texto de fuente que debe mostrarse junto al bloque de cifras. */
export const cifrasFuente = 'Secretaría Distrital de Movilidad de Bogotá, junio de 2026.';

export default cifras;
