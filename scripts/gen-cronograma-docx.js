// Genera el documento Word del Cronograma de implementación del Micrositio Observatorio.
// Uso: node scripts/gen-cronograma-docx.js
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, ShadingType,
} from 'docx';
import { writeFileSync } from 'node:fs';

const MORADO = '5A2A83';
const AZUL = '1A2744';
const GRIS = '536171';
const AMARILLO = 'F4C542';

const font = 'Calibri';

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.TITLE,
    spacing: { after: 120 },
    children: [new TextRun({ text, bold: true, size: 36, color: MORADO, font })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true, size: 26, color: AZUL, font })],
  });
}

function meta(label, value) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, color: AZUL, font }),
      new TextRun({ text: value, size: 20, color: GRIS, font }),
    ],
  });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text, size: 21, color: opts.color || '000000', italics: !!opts.italics, font })],
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 21, font })],
  });
}

function note(text) {
  return new Paragraph({
    spacing: { before: 80, after: 160 },
    shading: { type: ShadingType.CLEAR, fill: 'F4F6F8' },
    border: {
      left: { style: BorderStyle.SINGLE, size: 18, color: AMARILLO, space: 8 },
    },
    children: [new TextRun({ text, size: 20, italics: true, color: GRIS, font })],
  });
}

function cell(text, { header = false, bold = false, width } = {}) {
  return new TableCell({
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    shading: header ? { type: ShadingType.CLEAR, fill: MORADO } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [
      new Paragraph({
        children: [new TextRun({
          text,
          bold: header || bold,
          color: header ? 'FFFFFF' : '000000',
          size: 20,
          font,
        })],
      }),
    ],
  });
}

function table(headers, rows, widths) {
  const borderColor = 'D7DDE5';
  const b = { style: BorderStyle.SINGLE, size: 4, color: borderColor };
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => cell(h, { header: true, width: widths?.[i] })),
      }),
      ...rows.map(r => new TableRow({
        children: r.map((c, i) => cell(c.text ?? c, { bold: c.bold, width: widths?.[i] })),
      })),
    ],
  });
}

const spacer = () => new Paragraph({ spacing: { after: 60 }, children: [] });

const doc = new Document({
  creator: 'Oficina Asesora de Comunicaciones — equipo web',
  title: 'Cronograma de implementación — Micrositio del Observatorio',
  styles: { default: { document: { run: { font, size: 21 } } } },
  sections: [{
    properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
    children: [
      h1('Cronograma de implementación'),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: 'Micrositio del Observatorio de las economías en las culturas, las artes y los saberes', size: 24, color: AZUL, font })],
      }),
      meta('Solicitado por', 'Dirección de Estrategia, Desarrollo y Emprendimiento (DEDE)'),
      meta('Elaborado por', 'Oficina Asesora de Comunicaciones — equipo web'),
      meta('Fecha de elaboración', '______________'),
      spacer(),
      note('Este cronograma responde a la solicitud de la DEDE: actividades pendientes, tiempos previstos y fecha proyectada de la versión actualizada. Los tiempos se expresan en días hábiles desde el cierre de la etapa de definición.'),

      h2('1. Estado actual'),
      bullet('El micrositio está maquetado en su versión de trabajo, con las cuatro líneas estratégicas definidas por la DEDE (Mediciones, Publicaciones, Investigaciones y Repositorio) más la vista de inicio.'),
      bullet('El Grupo de Gestión del Conocimiento entregó los cinco mockups y la matriz de montaje con los contenidos definitivos.'),
      bullet('El equipo web completó la revisión y el cruce de cada sección contra la matriz y los mockups; los textos definitivos están organizados para su incorporación.'),
      bullet('Etapa actual: definición previa al montaje, articulada entre la DEDE, Comunicaciones y el Grupo de Divulgación y Prensa.'),

      h2('2. Etapa de definición (en curso)'),
      para('Estos insumos se articulan entre los equipos; al cerrarlos se habilita el montaje.'),
      table(
        ['#', 'Insumo', 'Responsable', 'Estado'],
        [
          ['1', 'Cinco mockups de referencia', 'DEDE — Gestión del Conocimiento', 'Entregados y revisados'],
          ['2', 'Matriz de montaje (contenidos definitivos)', 'DEDE — Gestión del Conocimiento', 'Entregada y revisada'],
          ['3', 'Línea gráfica definitiva, articulada con el nuevo Manual de identidad del Ministerio', 'Grupo de Divulgación y Prensa', 'En definición'],
          ['4', 'Recursos (documentos, imágenes) con enlace público de consulta', 'DEDE', 'Pendiente'],
          ['5', 'Decisiones puntuales de contenido y alcance', 'DEDE / Comunicaciones', 'En revisión'],
        ],
        [6, 44, 32, 18],
      ),

      h2('3. Actividades pendientes y tiempos previstos (fase de montaje)'),
      note('Días hábiles de trabajo efectivo del equipo web. No incluyen los tiempos de validación de contenidos por parte de la DEDE ni la espera de insumos de la etapa de definición. Las estimaciones incluyen un 40% de holgura.'),
      table(
        ['#', 'Actividad', 'Tiempo'],
        [
          ['1', 'Base compartida: identidad visual y elementos comunes (encabezado, menú, pie)', '1,5–3 días'],
          ['2', 'Sección Observatorio (inicio): reestructuración a la nueva propuesta', '1,5–3 días'],
          ['3', 'Sección Mediciones: incorporación del Cuadernillo de Consumo Cultural 2025', '1,5 días'],
          ['4', 'Sección Publicaciones: reordenamiento e integración de Herramientas, Revistas y Mapas', '3–4 días'],
          ['5', 'Sección Investigaciones', '1,5 días'],
          ['6', 'Sección Repositorio (integración documental)', '1,5–3 días'],
          ['7', 'Depuración de secciones fuera de alcance', '~0,7 día'],
          ['8', 'Auditoría final: enlaces, accesibilidad y revisión editorial/funcional', '1,5 días'],
          [{ text: '', bold: true }, { text: 'Total montaje', bold: true }, { text: '~11–17 días hábiles', bold: true }],
        ],
        [6, 74, 20],
      ),

      h2('4. Fase de validación y publicación'),
      table(
        ['#', 'Actividad', 'Responsable', 'Tiempo estimado'],
        [
          ['9', 'Revisión y validación final de contenidos', 'DEDE / Comunicaciones', 'Según disponibilidad del área'],
          ['10', 'Ajustes derivados de la validación', 'Equipo web', '1,5–3 días'],
          ['11', 'Publicación de la versión actualizada', 'Equipo web', '~0,7 día'],
        ],
        [6, 42, 28, 24],
      ),

      h2('5. Fecha proyectada (condicionada)'),
      para('No es posible fijar una fecha de calendario firme hasta cerrar la etapa de definición, porque el montaje arranca cuando esos insumos están disponibles. Expresado como proyección:'),
      bullet('Versión actualizada lista para revisión final: ~3 a 4 semanas hábiles desde el cierre de la etapa de definición (montaje + primera pasada de ajustes).'),
      bullet('Publicación: sujeta a la validación final de contenidos por parte de la DEDE y el Grupo de Divulgación y Prensa.'),
      spacer(),
      para('Proyección a completar cuando se tenga la fecha de cierre de la etapa de definición:'),
      table(
        ['Hito', 'Fecha'],
        [
          ['Cierre de la etapa de definición (insumos listos)', '______________'],
          ['Entrega de la versión actualizada para revisión', '______________ (≈ +3–4 semanas hábiles)'],
          ['Validación final de contenidos (DEDE)', '______________'],
          ['Publicación', '______________'],
        ],
        [60, 40],
      ),

      h2('6. Nota de seguimiento'),
      para('Para un seguimiento articulado entre los equipos, se sugiere fijar el cierre de la etapa de definición en la próxima mesa de trabajo. Con esa fecha, el equipo web convierte este cronograma condicionado en fechas de calendario concretas.'),
    ],
  }],
});

const out = 'sites/culturas/landings/observatorio/CRONOGRAMA-IMPLEMENTACION.docx';
const buffer = await Packer.toBuffer(doc);
writeFileSync(out, buffer);
console.log('Documento generado:', out);
