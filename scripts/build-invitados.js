/**
 * Script: build-invitados.js
 * Genera, a partir de un único archivo de datos (invitados.json), UNA SOLA
 * página autocontenida index.html de la sección "Invitados" del micrositio
 * Primer Congreso Nacional e Internacional de Investigación Artística
 * (Culturas / SharePoint).
 *
 * La página embebe los datos como una variable JavaScript real
 * (const INVITADOS = [...]) y un script de render que, en el navegador, pinta
 * tarjetas GOV.CO verticales y un modal Bootstrap por invitado con el detalle
 * completo. No hay fetch ni JSON externo en runtime: todo vive en el cuerpo de
 * la página porque el portal solo copia el HTML dentro de #contenido-cms.
 *
 * El build además BORRA las fichas perfil-*.html que la versión anterior
 * generaba (idempotente).
 *
 * Fuente de datos:
 *   sites/culturas/cms/congreso-investigacion-artistica/invitados/invitados.json
 *
 * Uso: npm run build:invitados   (o: node scripts/build-invitados.js)
 *
 * La cadena "cms" en las rutas es un identificador fijo del sistema y se
 * conserva tal cual. Solo el HTML dentro de #contenido-cms se copia al gestor
 * de contenidos; aun así se genera el documento completo para previsualización
 * local, replicando el patrón original escrito a mano.
 */

import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const INVITADOS_DIR = resolve(
  process.cwd(),
  'sites', 'culturas', 'cms', 'congreso-investigacion-artistica', 'invitados'
);
const DATA_FILE = resolve(INVITADOS_DIR, 'invitados.json');

// Agrupación y títulos de las secciones del listado (orden fijo del index).
const SECCIONES = [
  { categoria: 'internacional', titulo: 'Invitados internacionales', pt: 'pt-4' },
  { categoria: 'nacional',      titulo: 'Invitados nacionales',      pt: 'pt-5' },
  { categoria: 'moderacion',    titulo: 'Moderación',                pt: 'pt-5' },
];

// Comentarios de bloque fieles al original, uno por sección.
const COMENTARIOS = ['INVITADOS INTERNACIONALES', 'INVITADOS NACIONALES', 'MODERADORES'];

/** Escapa los caracteres HTML sensibles en texto plano fijo del generador. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Bloque <h2> + grilla vacía (data-grilla) que el script del navegador llena. */
function renderSeccionVacia(sec, i) {
  const label = COMENTARIOS[i].padEnd(61, ' ');
  const comentario = `    <!-- ============================================================ -->
    <!-- ${label}-->
    <!-- ============================================================ -->`;
  return `${comentario}
    <h2 class="${sec.pt}">${escapeHtml(sec.titulo)}</h2>
    <div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3" data-grilla="${sec.categoria}"></div>`;
}

/**
 * <script> con los datos como variable JS real (NO type="application/json",
 * exigencia explícita del usuario). Se vuelca el array con JSON.stringify y se
 * escapa "<" como "\u003c" para que ninguna cadena de datos (p. ej. una bio con
 * markup) pueda cerrar prematuramente la etiqueta </script> y romper el parser.
 */
function renderDatosScript(invitados) {
  const literal = JSON.stringify(invitados, null, 2).replace(/</g, '\\u003c');
  return `  <script>
    const INVITADOS = ${literal};
  </script>`;
}

/**
 * <script> de render del navegador. Recorre INVITADOS y, por cada invitado,
 * crea una tarjeta GOV.CO vertical (botón que dispara el modal) y un modal
 * Bootstrap con el detalle completo. Frontera texto/HTML: el texto plano de
 * datos (nombre, resumen, categoría, país) se asigna con textContent, mientras
 * que las bios y secciones son HTML editorial verbatim (incluyen <em>) y se
 * insertan con innerHTML.
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

      // HTML verbatim de confianza editorial (párrafos de bio/secciones).
      const parrafoHtml = (html) => {
        const p = document.createElement('p');
        p.innerHTML = html;
        return p;
      };

      const crearTarjeta = (inv) => {
        const col = crear('div', 'col');

        const boton = crear('button', 'tarjeta-govco vertical-tarjeta-govco w-100');
        boton.type = 'button';
        boton.setAttribute('data-bs-toggle', 'modal');
        boton.setAttribute('data-bs-target', '#modal-' + inv.slug);

        const contImg = crear('div', 'container-img-tarjeta-govco');
        const img = crear('img', 'image-tarjeta-govco');
        img.src = inv.foto;
        img.alt = inv.altCard || inv.alt;
        contImg.appendChild(img);

        const body = crear('div', 'body-tarjeta-govco');
        const categoria = crear('span');
        categoria.textContent = inv.categoriaCard;
        const nombre = crear('h3', 'h5');
        nombre.textContent = inv.nombreCard;
        const resumen = crear('p');
        resumen.textContent = inv.resumen;
        body.append(categoria, nombre, resumen);

        boton.append(contImg, body);
        col.appendChild(boton);
        return col;
      };

      const crearModal = (inv) => {
        const modal = crear('div', 'modal fade');
        modal.id = 'modal-' + inv.slug;
        modal.tabIndex = -1;
        modal.setAttribute('aria-labelledby', 'titulo-modal-' + inv.slug);
        modal.setAttribute('aria-hidden', 'true');

        const dialog = crear('div', 'modal-dialog modal-dialog-govco modal-dialog-centered');
        const content = crear('div', 'modal-content modal-content-govco');

        const header = crear('div', 'modal-header modal-header-govco');
        const cerrar = crear('button', 'close-btn-modal');
        cerrar.type = 'button';
        cerrar.setAttribute('data-bs-dismiss', 'modal');
        cerrar.setAttribute('aria-label', 'Cerrar');
        const icono = crear('span', 'govco-svg govco-times modal-close-govco');
        cerrar.appendChild(icono);
        header.appendChild(cerrar);

        const body = crear('div', 'modal-body modal-body-govco');

        const foto = crear('img', 'img-fluid rounded mb-3');
        foto.src = inv.foto;
        foto.alt = inv.alt;

        const titulo = crear('h2', 'modal-title-govco');
        titulo.id = 'titulo-modal-' + inv.slug;
        titulo.textContent = inv.nombre;

        const categoria = crear('p', 'text3-govco');
        categoria.textContent = inv.categoriaFicha;

        body.append(foto, titulo, categoria);
        inv.bio.forEach((html) => body.appendChild(parrafoHtml(html)));

        (inv.secciones || []).forEach((sec) => {
          const subtitulo = crear('h3');
          subtitulo.textContent = sec.titulo;
          body.appendChild(subtitulo);
          if (sec.subtitulo) {
            const sub = crear('p', 'text1-govco');
            const em = crear('em');
            em.textContent = sec.subtitulo;
            sub.appendChild(em);
            body.appendChild(sub);
          }
          sec.parrafos.forEach((html) => body.appendChild(parrafoHtml(html)));
        });

        content.append(header, body);
        dialog.appendChild(content);
        modal.appendChild(dialog);
        return modal;
      };

      const main = document.getElementById('contenido-principal');
      const modales = document.createDocumentFragment();

      INVITADOS.forEach((inv) => {
        const grilla = document.querySelector('[data-grilla="' + inv.categoria + '"]');
        if (grilla) grilla.appendChild(crearTarjeta(inv));
        modales.appendChild(crearModal(inv));
      });

      main.appendChild(modales);
    })();
  </script>`;
}

/** Documento completo autocontenido index.html. */
function renderIndex(invitados) {
  const seccionesHtml = SECCIONES.map(renderSeccionVacia).join('\n\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitados - Primer Congreso Nacional e Internacional de Investigación Artística</title>
  <!-- CDN GOV.CO v5 -->
  <link rel="stylesheet" href="https://cdn.www.gov.co/layout-govco-v5/all.css">
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!--
    PLANTILLA CONTENIDO - CULTURAS (SharePoint)
    Micrositio: Primer Congreso Nacional e Internacional de Investigación Artística
    Página: Listado de invitados (nacionales, internacionales y moderadores)
    Solo el contenido dentro de #contenido-cms se copia al gestor de contenidos.
    Las tarjetas y los modales se generan en el navegador a partir de la variable
    INVITADOS embebida al final del cuerpo (sin fetch ni archivos externos).
    Las fotos referenciadas en img/ deben subirse a la biblioteca de imágenes del
    portal y ajustarse las rutas src según la ubicación final en SharePoint.
  -->

  <div id="contenido-cms">
    <!-- === INICIO CONTENIDO PARA SHAREPOINT === -->
    <main id="contenido-principal">

    <!-- NAVEGACIÓN ENTRE SECCIONES (sin JS, no compite con el menú del portal) -->
    <nav class="d-flex flex-wrap gap-2 py-3" aria-label="Secciones del congreso">
      <a href="../index.html" class="btn-govco link-btn-govco">Inicio</a>
      <a href="../presentacion/index.html" class="btn-govco link-btn-govco">Presentación</a>
      <a href="index.html" class="btn-govco link-btn-govco" aria-current="page">Invitados</a>
      <span class="btn-govco link-btn-govco disabled" aria-disabled="true">Convocatoria (en preparación)</span>
      <a href="../programacion/index.html" class="btn-govco link-btn-govco">Programación</a>
      <span class="btn-govco link-btn-govco disabled" aria-disabled="true">Publicaciones y memorias (en preparación)</span>
    </nav>

    <nav class="breadcrumb-nav-govco" aria-label="Ruta de navegación">
      <ol class="breadcrumb-govco">
        <li class="breadcrumb-item-govco"><a href="../index.html">Inicio</a></li>
        <li class="breadcrumb-item-govco active" aria-current="page">Invitados</li>
      </ol>
    </nav>

    <h1>Invitados del Congreso</h1>
    <p class="text1-govco">
      Conozca a las y los invitados nacionales e internacionales, y al equipo de
      moderación del Primer Congreso Nacional e Internacional de Investigación
      Artística: la soberanía de los saberes culturales y los conocimientos
      sensibles del Sur Global.
    </p>

${seccionesHtml}

    </main>
    <!-- === FIN CONTENIDO PARA SHAREPOINT === -->
  </div>

  <!-- Scripts CDN GOV.CO v5 -->
  <script src="https://cdn.www.gov.co/layout-govco-v5/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Datos de invitados como variable JS embebida (fuente: invitados.json) -->
${renderDatosScript(invitados)}

  <!-- Render de tarjetas y modales en el navegador -->
${renderScriptRender()}
</body>
</html>
`;
}

/**
 * Borra las fichas perfil-*.html que la versión anterior del generador producía.
 * Solo elimina archivos que empiezan con "perfil-" y terminan en ".html" dentro
 * de invitados/; idempotente (no falla si ya no hay ninguna).
 */
function limpiarFichas() {
  const fichas = readdirSync(INVITADOS_DIR)
    .filter(nombre => /^perfil-.*\.html$/.test(nombre));

  fichas.forEach(nombre => {
    unlinkSync(resolve(INVITADOS_DIR, nombre));
    console.log(`  ✓ eliminada ${nombre}`);
  });

  return fichas.length;
}

function buildInvitados() {
  const invitados = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));

  const eliminadas = limpiarFichas();

  const indexFile = resolve(INVITADOS_DIR, 'index.html');
  writeFileSync(indexFile, renderIndex(invitados), 'utf-8');
  console.log('  ✓ index.html');

  console.log(`\n✅ 1 página autocontenida (${invitados.length} invitados) + ${eliminadas} ficha(s) eliminada(s) en sites/culturas/cms/congreso-investigacion-artistica/invitados/`);
  console.log('   Edita invitados.json y vuelve a correr: npm run build:invitados\n');
}

buildInvitados();
