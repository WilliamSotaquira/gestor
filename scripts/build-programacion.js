/**
 * Script: build-programacion.js
 * Genera, a partir de un único archivo de datos (programacion.json), UNA SOLA
 * página autocontenida index.html de la sección "Programación" del micrositio
 * Primer Congreso Nacional e Internacional de Investigación Artística
 * (Culturas / SharePoint).
 *
 * El HTML generado usa un bloque <style> interno con clases CSS que imponen
 * los estilos mediante !important, para que no sean sobrescritos por el CSS
 * del CMS de SharePoint.
 *
 * Fuente de datos:
 *   sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json
 *
 * Uso: npm run build:programacion   (o: node scripts/build-programacion.js)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const PROGRAMACION_DIR = resolve(
  process.cwd(),
  'sites', 'culturas', 'cms', 'congreso-investigacion-artistica', 'programacion'
);
const DATA_FILE = resolve(PROGRAMACION_DIR, 'programacion.json');

/** Escapa los caracteres HTML sensibles en texto plano. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** CSS interno con clases que imponen estilos mediante !important. */
const CSS_INTERNAL = `
<style>
  /* ===== Convenciones de modalidad ===== */
  .convenciones {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.75rem 1rem !important;
    margin-bottom: 1.25rem !important;
    border: 1px solid #d1d1d1 !important;
    border-radius: 6px !important;
    background: #f4f4f4 !important;
    font-family: 'nunito sans', verdana, sans-serif !important;
  }
  .convenciones-label {
    font-weight: 700 !important;
    color: #4c4c4c !important;
    font-size: 0.9rem !important;
    margin-right: 0.25rem !important;
  }
  .convenciones-item {
    display: inline-flex !important;
    align-items: center !important;
    color: #4c4c4c !important;
    font-size: 0.9rem !important;
    margin-left: 0.75rem !important;
  }
  .convenciones-badge {
    display: inline-block !important;
    padding: 0.1rem 0.5rem !important;
    border-radius: 4px !important;
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    margin-right: 0.4rem !important;
    margin-left: 0 !important;
  }
  .convenciones-badge.virtual {
    background: #0943b5 !important;
    color: #ffffff !important;
  }
  .convenciones-badge.presencial {
    background: #158361 !important;
    color: #ffffff !important;
  }

  /* ===== Navegación de secciones ===== */
  .nav-secciones {
    display: flex !important;
    flex-wrap: wrap !important;
    padding: 1rem 0px !important;
    font-family: 'nunito sans', verdana, sans-serif !important;
  }
  .nav-secciones a,
  .nav-secciones span {
    display: inline-block !important;
    margin-right: 0.5rem !important;
    margin-bottom: 0.5rem !important;
    padding: 0.4rem 0.9rem !important;
    border-radius: 4px !important;
    font-weight: 600 !important;
    font-size: 0.95rem !important;
    text-decoration: none !important;
    color: #0943b5 !important;
    border: 1px solid transparent !important;
    background: transparent !important;
  }
  .nav-secciones span[aria-current="page"] {
    color: #ffffff !important;
    background: #0943b5 !important;
  }
  .nav-secciones a.inscribirse {
    color: #ffffff !important;
    background: #158361 !important;
    font-weight: 700 !important;
    padding: 0.4rem 1rem !important;
  }

  /* ===== Detalles por día ===== */
  .dia-details {
    border: 1px solid #d1d1d1 !important;
    border-radius: 6px !important;
    background: #ffffff !important;
    margin-bottom: 1rem !important;
  }
  .dia-summary {
    list-style: none !important;
    cursor: pointer !important;
    background: #0943b5 !important;
    color: #ffffff !important;
    padding: 0.6rem 1rem !important;
    border-radius: 6px 6px 0px 0px !important;
  }
  .dia-summary h2 {
    margin: 0px !important;
    color: #ffffff !important;
    font-size: 1rem !important;
    line-height: 1.3 !important;
  }
  .dia-contenido {
    padding: 1rem 1.25rem !important;
  }

  /* ===== Bloque de actividad ===== */
  .actividad-bloque {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: flex-start !important;
    border-bottom: 1px solid #d1d1d1 !important;
    padding-bottom: 0.75rem !important;
    margin-bottom: 0.75rem !important;
  }
  .actividad-hora {
    min-width: 7rem !important;
    margin-right: 1rem !important;
    font-weight: 700 !important;
    color: #0943b5 !important;
  }
  .actividad-contenido {
    flex: 1 1 16rem !important;
  }
  .actividad-titulo-wrap {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    margin-bottom: 0.25rem !important;
  }
  .actividad-titulo {
    font-size: 0.8rem !important;
    margin: 0 !important;
    color: #4c4c4c !important;
    font-weight: 600 !important;
    line-height: 1.2 !important;
  }
  .pill-modalidad {
    display: inline-block !important;
    padding: 0.15rem 0.5rem !important;
    border-radius: 3px !important;
    font-size: 0.75rem !important;
    font-weight: 600 !important;
    margin-bottom: 0.15rem !important;
  }
  .pill-modalidad.presencial {
    background: #158361 !important;
  }
  .pill-modalidad.virtual {
    background: #0943b5 !important;
  }

  /* ===== Lugar / ubicación ===== */
  .actividad-lugar {
    margin: 0.25rem 0px 0.5rem !important;
    color: #4c4c4c !important;
    font-size: 0.85rem !important;
  }
  .actividad-lugar a {
    color: #0943b5 !important;
    text-decoration: underline !important;
  }

  /* ===== Personas / ponentes ===== */
  .actividad-personas {
    margin: 0.25rem 0px 0px !important;
    padding-left: 1.25rem !important;
    color: #4c4c4c !important;
    margin-bottom: 0 !important;
  }
  .actividad-personas li {
    margin-bottom: 0.15rem !important;
    font-size: 0.85rem !important;
  }
  .actividad-personas li strong {
    font-weight: 700 !important;
  }

  /* ===== Moderación ===== */
  .actividad-modera {
    margin: 0.5rem 0px 0.25rem !important;
    color: #4c4c4c !important;
    font-weight: 700 !important;
    font-size: 0.85rem !important;
  }
  .actividad-modera + ul {
    margin: 0px !important;
    padding-left: 1.25rem !important;
    color: #4c4c4c !important;
    margin-bottom: 0 !important;
  }
  .actividad-modera + ul li {
    margin-bottom: 0.15rem !important;
    font-size: 0.85rem !important;
  }
</style>
`;

/** Renderiza un bloque de actividad individual. */
function renderBloqueActividad(b) {
  // La modalidad/espacio puede venir del bloque (no paralelo) o de la actividad (paralelo)
  const esParalelo = b.paralelo || b.actividades.length > 1;

  let html = '';

  b.actividades.forEach((act) => {
    const modalidad = esParalelo ? act.modalidad : b.modalidad;
    const espacio = esParalelo ? act.espacio : b.espacio;
    const enlaceUbicacion = esParalelo ? act.enlaceUbicacion : b.enlaceUbicacion;

    const pillHtml = modalidad === 'Presencial'
      ? '<span class="pill-modalidad presencial">Presencial</span>'
      : modalidad === 'Virtual'
        ? '<span class="pill-modalidad virtual">Virtual</span>'
        : '';

    const lugarHtml = espacio
      ? `<p class="actividad-lugar">Lugar: ${
          enlaceUbicacion
            ? '<a href="' + escapeHtml(enlaceUbicacion) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(espacio) + '</a>'
            : escapeHtml(espacio)
        }</p>`
      : '';

    const personasHtml = Array.isArray(act.personas) && act.personas.length
      ? `<ul class="actividad-personas">${
          act.personas.map((p) => `<li>${escapeHtml(p.nombre)}${p.rol ? ' — ' + escapeHtml(p.rol) : ''}</li>`).join('')
        }</ul>`
      : '';

    const moderacionHtml = Array.isArray(act.moderacion) && act.moderacion.length
      ? `<p class="actividad-modera">Modera:</p><ul class="actividad-personas">${
          act.moderacion.map((p) => `<li>${escapeHtml(p.nombre)}${p.rol ? ' — ' + escapeHtml(p.rol) : ''}</li>`).join('')
        }</ul>`
      : '';

    const ponenciasHtml = Array.isArray(act.ponencias) && act.ponencias.length
      ? `<ul class="actividad-personas">${
          act.ponencias.map((po) => `<li><strong>${escapeHtml(po.autor)}</strong> — ${escapeHtml(po.titulo)}</li>`).join('')
        }</ul>`
      : '';

    html += `
        <div class="actividad-bloque">
          <div class="actividad-hora">${escapeHtml(b.inicio)}–${escapeHtml(b.fin)}</div>
          <div class="actividad-contenido">
            <div class="actividad-titulo-wrap">
              ${pillHtml}
              <h3 class="actividad-titulo">${escapeHtml(act.titulo)}</h3>
            </div>
            ${lugarHtml}
            ${personasHtml}
            ${moderacionHtml}
            ${ponenciasHtml}
          </div>
        </div>
    `;
  });

  return html;
}

/** Renderiza un día completo como bloque <details>. */
function renderDia(dia) {
  let bloquesHtml = '';
  dia.bloques.forEach((b) => {
    bloquesHtml += renderBloqueActividad(b);
  });

  return `  <!-- ===================== DÍA ${dia.numero} ===================== -->
  <details class="dia-details">
     <summary class="dia-summary">
        <h2><span>Día ${dia.numero} · ${escapeHtml(dia.fecha)}</span></h2>
     </summary>
     <div class="dia-contenido">
${bloquesHtml}
     </div>
  </details>`;
}

/** Renderiza el documento completo index.html estático. */
function renderIndex(programacion) {
  const diasHtml = programacion.dias.map(renderDia).join('\n');

  return `<div id="contenido-cms">
${CSS_INTERNAL}
   <main role="main" aria-label="Programación del Congreso">
    <nav class="nav-secciones" aria-label="Secciones del congreso">
      <a href="/especiales/primer-congreso-nacional-internacional-investigacion-artistica/Paginas/default.aspx">Inicio</a>
      <a href="/especiales/primer-congreso-nacional-internacional-investigacion-artistica/Paginas/presentacion.aspx">Presentación</a>
      <a href="/especiales/primer-congreso-nacional-internacional-investigacion-artistica/Paginas/invitados.aspx">Invitados</a>
      <span aria-current="page">Programación</span>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfyg8DjLUp-fj0POFHwF5Bn2iRReHmtZRqPapOfytggqXv6Mw/viewform" target="_blank" rel="noopener noreferrer" aria-label="Inscríbase aquí al Congreso (abre el formulario en una nueva pestaña)" class="inscribirse">Inscríbase aquí</a>
    </nav>
    <h1>Programación del Congreso</h1>
    <p>Agenda del Primer Congreso Nacional e Internacional de Investigación Artística, del 3 al 6 de noviembre de 2026 en Bogotá. Seleccione un día para ver su programación.</p>
    <div class="convenciones" role="note" aria-label="Convenciones de modalidad">
      <span class="convenciones-label">Convenciones:</span>
      <span class="convenciones-item"><span class="convenciones-badge virtual">Virtual</span>Actividad en línea</span>
      <span class="convenciones-item"><span class="convenciones-badge presencial">Presencial</span>Actividad en el lugar del evento</span>
    </div>
${diasHtml}
   </main>
</div>`;
}

function buildProgramacion() {
  const programacion = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));

  const indexFile = resolve(PROGRAMACION_DIR, 'index.html');
  writeFileSync(indexFile, renderIndex(programacion), 'utf-8');
  console.log('  ✓ index.html');

  const numDias = programacion.dias.length;
  const numBloques = programacion.dias.reduce((acc, dia) => acc + dia.bloques.length, 0);
  console.log(`\n✅ 1 página autocontenida (${numDias} días, ${numBloques} bloques) en sites/culturas/cms/congreso-investigacion-artistica/programacion/`);
  console.log('   Edita programacion.json y vuelve a correr: npm run build:programacion\n');
}

buildProgramacion();
