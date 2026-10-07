/**
 * Script: build-invitados.js
 * Genera, a partir de un único archivo de datos (invitados.json), las fichas
 * individuales perfil-<slug>.html y el listado index.html de la sección
 * "Invitados" del micrositio Primer Congreso Nacional e Internacional de
 * Investigación Artística (Culturas / SharePoint).
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

import { readFileSync, writeFileSync } from 'fs';
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

/**
 * Escapa los caracteres HTML sensibles en campos de TEXTO PLANO
 * (nombre, alt, categoría, resumen, etc.). No se usa sobre la bio ni sobre
 * las secciones, cuyo contenido puede incluir markup inline (<em>) verbatim.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Párrafos de la biografía: HTML interno verbatim (puede incluir <em>). */
function renderBio(bio) {
  return bio.map(p => `        <p>${p}</p>`).join('\n');
}

/**
 * Secciones adicionales de la ficha (p. ej. una Ponencia): título h2,
 * subtítulo opcional (p.text1-govco con <em>) y párrafos. Contenido verbatim.
 */
function renderSecciones(secciones) {
  if (!secciones || secciones.length === 0) return '';
  return secciones.map(sec => {
    const partes = [`      <h2>${escapeHtml(sec.titulo)}</h2>`];
    if (sec.subtitulo) {
      partes.push(`      <p class="text1-govco"><em>${sec.subtitulo}</em></p>`);
    }
    sec.parrafos.forEach(p => partes.push(`      <p>${p}</p>`));
    return `    <section class="py-3">\n${partes.join('\n')}\n    </section>`;
  }).join('\n');
}

/** Bloque <img> de la ficha, con comentario PENDIENTE condicional. */
function renderFichaImg(inv) {
  const alt = escapeHtml(inv.alt);
  if (inv.fotoPendiente) {
    return [
      `        <!-- ${inv.comentarioFicha} -->`,
      `        <img class="img-fluid rounded" src="${inv.foto}" alt="${alt}">`,
    ].join('\n');
  }
  return `        <img class="img-fluid rounded" src="${inv.foto}" alt="${alt}">`;
}

/** HTML completo de una ficha perfil-<slug>.html. */
function renderFicha(inv) {
  const nombre = escapeHtml(inv.nombre);
  const secciones = renderSecciones(inv.secciones);
  const seccionesBlock = secciones ? `\n${secciones}` : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nombre} - Invitados del Congreso de Investigación Artística</title>
  <!-- CDN GOV.CO v5 -->
  <link rel="stylesheet" href="https://cdn.www.gov.co/layout-govco-v5/all.css">
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!--
    PLANTILLA CONTENIDO - CULTURAS (SharePoint)
    Micrositio: Primer Congreso Nacional e Internacional de Investigación Artística
    Página: Ficha de invitado
    Solo el contenido dentro de #contenido-cms se copia al gestor de contenidos.
  -->
  <div id="contenido-cms">
    <!-- === INICIO CONTENIDO PARA SHAREPOINT === -->
    <main id="contenido-principal">

    <nav class="breadcrumb-nav-govco" aria-label="Ruta de navegación">
      <ol class="breadcrumb-govco">
        <li class="breadcrumb-item-govco"><a href="../index.html">Inicio</a></li>
        <li class="breadcrumb-item-govco"><a href="index.html">Invitados</a></li>
        <li class="breadcrumb-item-govco active" aria-current="page">${nombre}</li>
      </ol>
    </nav>

    <div class="row g-4 py-3">
      <div class="col-12 col-md-4">
${renderFichaImg(inv)}
      </div>
      <div class="col-12 col-md-8">
        <span class="text3-govco">${escapeHtml(inv.categoriaFicha)}</span>
        <h1>${nombre}</h1>
${renderBio(inv.bio)}
      </div>
    </div>${seccionesBlock}

    <p class="pt-3">
      <a href="index.html" class="btn-govco outline-btn-govco">Volver a Invitados</a>
    </p>

    </main>
    <!-- === FIN CONTENIDO PARA SHAREPOINT === -->
  </div>

  <script src="https://cdn.www.gov.co/layout-govco-v5/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;
}

/** Bloque <img> de la tarjeta del listado, con comentario PENDIENTE condicional. */
function renderCardImg(inv) {
  const alt = escapeHtml(inv.altCard || inv.alt);
  if (inv.fotoPendiente) {
    return [
      `            <!-- ${inv.comentarioCard} -->`,
      `            <img class="image-tarjeta-govco" src="${inv.foto}" alt="${alt}">`,
    ].join('\n');
  }
  return `            <img class="image-tarjeta-govco" src="${inv.foto}" alt="${alt}">`;
}

/** Tarjeta <div class="col"> del listado para un invitado. */
function renderCard(inv) {
  return `      <div class="col">
        <a href="perfil-${inv.slug}.html" class="tarjeta-govco vertical-tarjeta-govco w-100">
          <div class="container-img-tarjeta-govco">
${renderCardImg(inv)}
          </div>
          <div class="body-tarjeta-govco">
            <span>${escapeHtml(inv.categoriaCard)}</span>
            <h3 class="h5">${escapeHtml(inv.nombreCard)}</h3>
            <p>${escapeHtml(inv.resumen)}</p>
          </div>
        </a>
      </div>`;
}

/** Una sección del listado: h2 + grilla con las tarjetas de esa categoría. */
function renderSeccionListado(sec, invitados) {
  const delGrupo = invitados.filter(inv => inv.categoria === sec.categoria);
  const cards = delGrupo.map(renderCard).join('\n\n');
  const grilla = cards
    ? `    <div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">\n\n${cards}\n\n    </div>`
    : `    <div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">\n    </div>`;
  return `    <h2 class="${sec.pt}">${escapeHtml(sec.titulo)}</h2>\n${grilla}`;
}

/** HTML completo del listado index.html. */
function renderIndex(invitados) {
  // Comentarios de bloque fieles al original.
  const comentarios = ['INVITADOS INTERNACIONALES', 'INVITADOS NACIONALES', 'MODERADORES'];
  const seccionesHtml = SECCIONES.map((sec, i) => {
    const bloque = renderSeccionListado(sec, invitados);
    const label = comentarios[i].padEnd(61, ' ');
    const comentario = `    <!-- ============================================================ -->
    <!-- ${label}-->
    <!-- ============================================================ -->`;
    return `${comentario}\n${bloque}`;
  }).join('\n\n');

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
    Las fotos referenciadas en img/ deben subirse a la biblioteca de imágenes del portal
    y ajustarse las rutas src según la ubicación final en SharePoint.
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
      <span class="btn-govco link-btn-govco disabled" aria-disabled="true">Programación (en preparación)</span>
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
</body>
</html>
`;
}

function buildInvitados() {
  const invitados = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));

  let count = 0;

  invitados.forEach(inv => {
    const outFile = resolve(INVITADOS_DIR, `perfil-${inv.slug}.html`);
    writeFileSync(outFile, renderFicha(inv), 'utf-8');
    count++;
    console.log(`  ✓ perfil-${inv.slug}.html`);
  });

  const indexFile = resolve(INVITADOS_DIR, 'index.html');
  writeFileSync(indexFile, renderIndex(invitados), 'utf-8');
  console.log('  ✓ index.html');

  console.log(`\n✅ ${count} ficha(s) + index generados en sites/culturas/cms/congreso-investigacion-artistica/invitados/`);
  console.log('   Edita invitados.json y vuelve a correr: npm run build:invitados\n');
}

buildInvitados();
