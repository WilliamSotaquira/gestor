/**
 * Script: build-programacion.js
 * Genera, a partir de un único archivo de datos (programacion.json), UNA SOLA
 * página autocontenida index.html de la sección "Programación" del micrositio
 * Primer Congreso Nacional e Internacional de Investigación Artística
 * (Culturas / SharePoint).
 *
 * La página embebe los datos como una variable JavaScript real
 * (const PROGRAMACION = {...}) y un script de render que, en el navegador, pinta
 * la línea de tiempo de cada día dentro de pestañas Bootstrap. No hay fetch ni
 * JSON externo en runtime: todo vive en el cuerpo de la página porque el portal
 * solo copia el HTML dentro de #contenido-cms.
 *
 * La estructura accesible (pestañas con roles/aria, los 4 tabpanels, h1, h2 por
 * día, breadcrumb y nav de secciones) va en el HTML estático que genera el build;
 * el script del navegador solo LLENA el interior de cada panel, que arranca
 * vacío. Esto es necesario porque el lint de accesibilidad corre jsdom con
 * runScripts: 'outside-only' y no ejecuta el render.
 *
 * Fuente de datos:
 *   sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json
 *
 * Uso: npm run build:programacion   (o: node scripts/build-programacion.js)
 *
 * La cadena "cms" en las rutas es un identificador fijo del sistema y se
 * conserva tal cual. Solo el HTML dentro de #contenido-cms se copia al gestor
 * de contenidos; aun así se genera el documento completo para previsualización
 * local, replicando el patrón de la sección Invitados.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const PROGRAMACION_DIR = resolve(
  process.cwd(),
  'sites', 'culturas', 'cms', 'congreso-investigacion-artistica', 'programacion'
);
const DATA_FILE = resolve(PROGRAMACION_DIR, 'programacion.json');

/** Escapa los caracteres HTML sensibles en texto plano fijo del generador. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * <script> con los datos como variable JS real (NO type="application/json",
 * exigencia explícita del usuario). Se vuelca el objeto con JSON.stringify y se
 * escapa "<" como "\u003c" para que ninguna cadena de datos pueda cerrar
 * prematuramente la etiqueta </script> y romper el parser.
 */
function renderDatosScript(programacion) {
  const literal = JSON.stringify(programacion, null, 2).replace(/</g, '\\u003c');
  return `  <script>
    const PROGRAMACION = ${literal};
  </script>`;
}

/**
 * Markup estático de las pestañas (nav-tabs) + un tabpanel por día con su <h2>
 * y un contenedor data-timeline vacío que el render del navegador llena.
 * El primer día es la pestaña activa; el resto arrancan ocultas.
 */
function renderTabsEstaticas(dias) {
  const botones = dias.map((dia, i) => {
    const activo = i === 0;
    const clase = activo ? 'nav-link active' : 'nav-link';
    const etiqueta = escapeHtml(`${dia.etiquetaTab} · ${dia.fechaCorta}`);
    return `      <button class="${clase}" id="tab-${dia.id}" data-bs-toggle="tab"
              data-bs-target="#panel-${dia.id}" type="button" role="tab"
              aria-controls="panel-${dia.id}" aria-selected="${activo}">${etiqueta}</button>`;
  }).join('\n');

  const paneles = dias.map((dia, i) => {
    const activo = i === 0;
    const clase = activo ? 'tab-pane fade show active' : 'tab-pane fade';
    const titulo = escapeHtml(`${dia.etiquetaTab} · ${dia.fecha}`);
    return `    <div class="${clase}" id="panel-${dia.id}" role="tabpanel"
         aria-labelledby="tab-${dia.id}" tabindex="0">
      <h2>${titulo}</h2>
      <div class="d-flex flex-column gap-3" data-timeline="${dia.id}"></div>
    </div>`;
  }).join('\n');

  return `    <nav>
      <div class="nav nav-tabs" id="tabs-dias" role="tablist" aria-label="Días del congreso">
${botones}
      </div>
    </nav>
    <div class="tab-content pt-4" id="contenido-dias">
${paneles}
    </div>`;
}

/**
 * <script> de render del navegador. Recorre PROGRAMACION.dias y, por cada día,
 * pinta la línea de tiempo de bloques en su panel. Frontera texto/HTML idéntica
 * a Invitados: todo el texto de datos se asigna con textContent y la estructura
 * se arma con el DOM API; no se concatena innerHTML con datos.
 */
function renderScriptRender() {
  return `  <script>
    (() => {
      'use strict';

      const crear = (tag, clase) => {
        const el = document.createElement(tag);
        if (clase) el.className = clase;
        return el;
      };

      const badge = (texto, clase) => {
        const span = crear('span', 'badge ' + clase);
        span.textContent = texto;
        return span;
      };

      // Lista "Nombre — rol" (o solo nombre si no hay rol).
      const listaPersonas = (personas, titulo) => {
        const wrap = crear('div', 'mt-2');
        if (titulo) {
          const etiqueta = crear('p', 'fw-bold mb-1');
          etiqueta.textContent = titulo;
          wrap.appendChild(etiqueta);
        }
        const ul = crear('ul', 'mb-0');
        personas.forEach((p) => {
          const li = crear('li');
          li.textContent = p.rol ? p.nombre + ' — ' + p.rol : p.nombre;
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
        return wrap;
      };

      // Grupos de autoridades (inauguración): subtítulo h4 + lista de personas.
      const listaGrupos = (grupos) => {
        const wrap = crear('div', 'mt-2');
        grupos.forEach((g) => {
          const h4 = crear('h4', 'h6 mb-1');
          h4.textContent = g.entidad;
          wrap.appendChild(h4);
          const ul = crear('ul', 'mb-3');
          g.personas.forEach((p) => {
            const li = crear('li');
            li.textContent = p.rol ? p.nombre + ' — ' + p.rol : p.nombre;
            ul.appendChild(li);
          });
          wrap.appendChild(ul);
        });
        return wrap;
      };

      // Mesa de Saberes: lista "Nombre — pueblo, territorio".
      const listaSabedores = (sabedores) => {
        const ul = crear('ul', 'mb-0 mt-2');
        sabedores.forEach((s) => {
          const li = crear('li');
          const territorio = s.territorio ? ', ' + s.territorio : '';
          li.textContent = s.nombre + ' — ' + s.pueblo + territorio;
          ul.appendChild(li);
        });
        return ul;
      };

      const crearActividad = (act) => {
        const cont = crear('div');

        const titulo = crear('h3', 'h6 mb-1');
        titulo.textContent = act.titulo;
        cont.appendChild(titulo);

        if (act.porConfirmar) {
          cont.appendChild(badge('Por confirmar', 'bg-warning text-dark'));
        }

        if (act.tema) {
          const tema = crear('p', 'text-muted mb-0');
          tema.textContent = act.tema;
          cont.appendChild(tema);
        }

        if (Array.isArray(act.grupos)) {
          cont.appendChild(listaGrupos(act.grupos));
        }

        if (Array.isArray(act.sabedores)) {
          cont.appendChild(listaSabedores(act.sabedores));
        }

        if (Array.isArray(act.personas) && act.personas.length) {
          cont.appendChild(listaPersonas(act.personas));
        }

        if (Array.isArray(act.moderacion) && act.moderacion.length) {
          cont.appendChild(listaPersonas(act.moderacion, 'Modera:'));
        }

        return cont;
      };

      const crearContenidoBloque = (bloque) => {
        const cont = crear('div', 'flex-grow-1');
        const paralelo = bloque.paralelo || (bloque.actividades || []).length === 2;

        if (paralelo) {
          cont.appendChild(badge('En paralelo', 'bg-info text-dark'));
          const row = crear('div', 'row g-3 mt-0');
          bloque.actividades.forEach((act) => {
            const col = crear('div', 'col-12 col-md-6');
            const tarjeta = crear('div', 'p-3 h-100 border rounded');
            tarjeta.appendChild(crearActividad(act));
            col.appendChild(tarjeta);
            row.appendChild(col);
          });
          cont.appendChild(row);
        } else {
          (bloque.actividades || []).forEach((act) => {
            cont.appendChild(crearActividad(act));
          });
        }

        if (bloque.espacios) {
          const esp = crear('p', 'text-muted small mb-0 mt-2');
          esp.textContent = 'Espacios: ' + bloque.espacios;
          cont.appendChild(esp);
        }

        if (bloque.nota) {
          const nota = crear('p', 'text-muted small fst-italic mb-0 mt-2');
          nota.textContent = bloque.nota;
          cont.appendChild(nota);
        }

        return cont;
      };

      const crearBloque = (bloque) => {
        const fila = crear('div', 'd-flex flex-column flex-md-row gap-3 border-bottom pb-3');

        const franja = crear('div', 'fw-bold text1-govco flex-shrink-0');
        franja.style.minWidth = '7rem';
        franja.textContent = bloque.inicio + '–' + bloque.fin;
        fila.appendChild(franja);

        fila.appendChild(crearContenidoBloque(bloque));
        return fila;
      };

      PROGRAMACION.dias.forEach((dia) => {
        const cont = document.querySelector('[data-timeline="' + dia.id + '"]');
        if (!cont) return;
        dia.bloques.forEach((bloque) => cont.appendChild(crearBloque(bloque)));
      });
    })();
  </script>`;
}

/** Documento completo autocontenido index.html. */
function renderIndex(programacion) {
  const tabsHtml = renderTabsEstaticas(programacion.dias);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Programación - Primer Congreso Nacional e Internacional de Investigación Artística</title>
  <!-- CDN GOV.CO v5 -->
  <link rel="stylesheet" href="https://cdn.www.gov.co/layout-govco-v5/all.css">
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!--
    PLANTILLA CONTENIDO - CULTURAS (SharePoint)
    Micrositio: Primer Congreso Nacional e Internacional de Investigación Artística
    Página: Programación (agenda por día del 3 al 6 de noviembre de 2026)
    Solo el contenido dentro de #contenido-cms se copia al gestor de contenidos.
    La línea de tiempo de cada día se genera en el navegador a partir de la
    variable PROGRAMACION embebida al final del cuerpo (sin fetch ni archivos
    externos). Las pestañas y su estructura accesible viven en el HTML estático.
  -->

  <div id="contenido-cms">
    <!-- === INICIO CONTENIDO PARA SHAREPOINT === -->
    <main id="contenido-principal">

    <!-- NAVEGACIÓN ENTRE SECCIONES (sin JS, no compite con el menú del portal) -->
    <nav class="d-flex flex-wrap gap-2 py-3" aria-label="Secciones del congreso">
      <a href="../index.html" class="btn-govco link-btn-govco">Inicio</a>
      <a href="../presentacion/index.html" class="btn-govco link-btn-govco">Presentación</a>
      <a href="../invitados/index.html" class="btn-govco link-btn-govco">Invitados</a>
      <span class="btn-govco link-btn-govco disabled" aria-disabled="true">Convocatoria (en preparación)</span>
      <a href="index.html" class="btn-govco link-btn-govco" aria-current="page">Programación</a>
      <span class="btn-govco link-btn-govco disabled" aria-disabled="true">Publicaciones y memorias (en preparación)</span>
    </nav>

    <nav class="breadcrumb-nav-govco" aria-label="Ruta de navegación">
      <ol class="breadcrumb-govco">
        <li class="breadcrumb-item-govco"><a href="../index.html">Inicio</a></li>
        <li class="breadcrumb-item-govco active" aria-current="page">Programación</li>
      </ol>
    </nav>

    <h1>${escapeHtml(programacion.titulo)}</h1>
    <p class="text1-govco">${escapeHtml(programacion.intro)}</p>

${tabsHtml}

    </main>
    <!-- === FIN CONTENIDO PARA SHAREPOINT === -->
  </div>

  <!-- Scripts CDN GOV.CO v5 -->
  <script src="https://cdn.www.gov.co/layout-govco-v5/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Datos de programación como variable JS embebida (fuente: programacion.json) -->
${renderDatosScript(programacion)}

  <!-- Render de la línea de tiempo por día en el navegador -->
${renderScriptRender()}
</body>
</html>
`;
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
