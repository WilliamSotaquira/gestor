# Plan de implementación — Invitados en una sola página autocontenida

## Contexto y decisiones de diseño (resumen)

Objetivo: convertir `scripts/build-invitados.js` para que genere **una sola**
`invitados/index.html` autocontenida (sin fichas `perfil-*.html`), con los datos
de `invitados.json` volcados como **variable JS** (`const INVITADOS = [...]`) en
el cuerpo de la página y un script que, en el navegador, pinta tarjetas GOV.CO
verticales y modales Bootstrap. Motivo de negocio: el portal (SharePoint,
Culturas) solo admite subir perfiles de a uno y no más de ~29, y solo viaja el
HTML dentro de `#contenido-cms`; no puede depender de `fetch()` ni de archivos
externos en runtime. Sí se permite JavaScript embebido.

Hechos verificados durante la exploración (todos deben re-confirmarse al
implementar, no asumir):

- `invitados.json`: array de 36 objetos. Conteo por categoría: **6**
  `internacional`, **27** `nacional`, **3** `moderacion`. El orden del array es
  el orden de render.
- Campos por objeto: `slug`, `categoria` (`internacional|nacional|moderacion`),
  `pais` (opcional), `foto`, `fotoPendiente` (bool), `nombre`, `nombreCard`,
  `alt`, `altCard` (opcional), `categoriaFicha`, `categoriaCard`,
  `comentarioFicha`/`comentarioCard` (solo en los 2 con `fotoPendiente:true`),
  `resumen`, `bio` (array de párrafos con HTML inline verbatim como `<em>`),
  `secciones` (opcional; presente solo en 2 invitados internacionales:
  `pedro-vilela`, `julieta-infantino`).
- Para las TARJETAS la UI usa: `foto`, `altCard||alt`, `categoriaCard`,
  `nombreCard`, `resumen`. Para el MODAL: `foto`, `alt`, `nombre`,
  `categoriaFicha`, `bio` (y opcionalmente `secciones`).
- Las referencias `perfil-*.html` SOLO existen dentro de la propia
  `invitados/index.html` (que se regenera). No hay enlaces rotos externos que
  reportar (verificado con búsqueda en `sites/**/*.html`). **Verificar durante
  implementación** repitiendo la búsqueda tras regenerar.
- Hay **36** archivos `perfil-*.html` en el directorio (verificado).

### Decisiones

1. **Datos como variable JS real** (exigencia explícita del usuario): emitir
   `const INVITADOS = <JSON.stringify(invitados, null, 2)>;` dentro de un
   `<script>`. No usar `<script type="application/json">`. Para evitar romper el
   parser por la secuencia `</script>` dentro de cualquier cadena de datos, al
   serializar se escapará `<` como `\u003c` (reemplazo global sobre el string ya
   serializado). Es la forma más limpia y segura de incrustar JSON como literal
   JS en HTML.
2. **Modales pre-inyectados en el DOM por el script de render** (no on-demand).
   Razón de limpieza y accesibilidad: Bootstrap declarativo
   (`data-bs-toggle="modal"` + `data-bs-target="#modal-<slug>"`) funciona sin JS
   propio de apertura; el script solo construye nodos una vez al cargar. Un modal
   por invitado, `id="modal-<slug>"` único. Bootstrap gestiona foco (focus trap,
   retorno de foco al disparador y cierre con `Esc`) de forma nativa, cumpliendo
   accesibilidad sin lógica manual frágil.
3. **La tarjeta es el disparador del modal**: usar `<button type="button">` con
   `class="tarjeta-govco vertical-tarjeta-govco w-100"` y los `data-bs-*`, en
   lugar de `<a href>`. Razón: abrir un diálogo no es navegación; un `<button>`
   da nombre accesible y semántica correctos, y evita un `href="#"` sin destino.
4. **Jerarquía de encabezados**: `h1` (título de página) → `h2` por categoría
   (3 secciones) → `h3` (nombre en cada tarjeta). En el modal, el título
   (nombre del invitado) va como `h2` dentro del diálogo y se referencia con
   `aria-labelledby`. Decisión documentada: cada modal es un contexto de diálogo
   independiente (`role="dialog"`/`aria-modal`), por lo que su `h2` no compite
   con la jerarquía del documento base; se acepta `h2` como título del diálogo
   siguiendo el patrón del componente `shared/components/modales/`.
5. **Escape / frontera texto vs HTML** (requisito de limpieza): el script del
   navegador usa `textContent` para todo texto plano de datos (nombre, resumen,
   categoría, alt vía `img.alt`). Las `bio` (y `secciones.parrafos`/subtítulos)
   son **HTML verbatim** de confianza editorial y van como `innerHTML` de sus
   `<p>` dentro del cuerpo del modal. Esta frontera se documenta con un comentario
   breve en el script. El contenido estático HTML (h1, intro, h2) no necesita
   escape porque es texto fijo del generador. El volcado de `INVITADOS` escapa
   `<` a `\u003c` como se indicó en (1).
6. **El HTML base estático** (cabecera `<head>` con CDN+Bootstrap, nav de
   secciones, breadcrumb, `h1`, intro, los 3 bloques `h2` + grilla vacía con
   `data-grilla`) se conserva FIEL al index actual; solo cambia que las grillas
   van vacías y se añaden los dos `<script>` finales. Las clases de grilla se
   mantienen: `row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3`.
7. **Borrado idempotente de `perfil-*.html`**: listar el directorio `invitados/`
   con `readdirSync`, filtrar nombres que cumplan `/^perfil-.*\.html$/` y
   `unlinkSync` cada uno. No borra nada más; si no hay fichas, no falla
   (idempotente). Se ejecuta como parte del build.

---

## Pasos de implementación

- [ ] 1. Reescribir `scripts/build-invitados.js`: eliminar la generación de
      fichas y la plantilla `renderFicha`/`renderFichaImg`/`renderCard`/
      `renderSeccionListado`/`renderCardImg`, y dejar el generador produciendo
      una sola `index.html` autocontenida. Mantener estilo ESM, imports
      (`readFileSync`, `writeFileSync`, `readdirSync`, `unlinkSync`, `resolve`),
      helper `escapeHtml` (para el texto estático que lo requiera y para
      cualquier atributo fijo), constantes `INVITADOS_DIR`/`DATA_FILE`, la
      estructura `SECCIONES` (categoria/título/clase pt) y los mensajes de
      consola con ✓/✅. Funciones puras y pequeñas; sin código muerto.
      Files: `scripts/build-invitados.js`
      Verify: `node -c scripts/build-invitados.js` (sin errores de sintaxis).

- [ ] 2. Añadir `renderHtmlBase(invitados)` que devuelva el documento completo
      estático: `<head>` con CDN GOV.CO v5 + Bootstrap 5.3.3 (idénticos al index
      actual), comentario de plantilla SharePoint, `#contenido-cms` →
      `<main id="contenido-principal">`, nav de secciones (fiel), breadcrumb
      (fiel, con `<li>` activo "Invitados" sin enlace a perfil), `<h1>Invitados
      del Congreso</h1>`, el párrafo intro `text1-govco` existente, y por cada
      entrada de `SECCIONES` un bloque comentario + `<h2 class="<pt>">título</h2>`
      + `<div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3"
      data-grilla="<categoria>"></div>` (grilla VACÍA). Al final del `<body>`,
      antes de cerrar: los scripts del CDN y Bootstrap ya presentes, más los dos
      `<script>` nuevos (datos y render) producidos por los pasos 3 y 4.
      Files: `scripts/build-invitados.js`
      Verify: cubierto por el paso 6 (ejecutar el build y abrir el HTML).

- [ ] 3. Añadir `renderDatosScript(invitados)` que genere el `<script>` con
      `const INVITADOS = ` seguido de `JSON.stringify(invitados, null, 2)` con
      `<` reemplazado por `\u003c` en el resultado, y `;`. Debe ser un literal JS
      (NO `type="application/json"`). Documentar con un comentario breve por qué
      se escapa `<`.
      Files: `scripts/build-invitados.js`
      Verify: cubierto por el paso 6 (en el navegador, `window.INVITADOS.length`
      debe ser 36).

- [ ] 4. Añadir `renderScriptRender()` que devuelva el `<script>` con la lógica
      del navegador (string literal embebido). El script debe, con `const/let`,
      funciones con nombres claros y sin `console.log`:
      (a) recorrer `INVITADOS`;
      (b) por cada invitado, construir una TARJETA
      `<button type="button" class="tarjeta-govco vertical-tarjeta-govco w-100"
      data-bs-toggle="modal" data-bs-target="#modal-<slug>">` con
      `container-img-tarjeta-govco` → `<img class="image-tarjeta-govco">`
      (`img.src=foto`, `img.alt = altCard||alt` vía propiedad, no innerHTML),
      `body-tarjeta-govco` → `<span>` (categoriaCard, `textContent`),
      `<h3 class="h5">` (nombreCard, `textContent`), `<p>` (resumen,
      `textContent`); envolver en `<div class="col">`;
      (c) insertar la tarjeta en `document.querySelector('[data-grilla="<categoria>"]')`;
      (d) construir el MODAL Bootstrap (`<div class="modal fade"
      id="modal-<slug>" tabindex="-1" aria-labelledby="titulo-modal-<slug>"
      aria-hidden="true">` con `modal-dialog modal-dialog-govco
      modal-dialog-centered`, header con botón cerrar
      `data-bs-dismiss="modal" aria-label="Cerrar"`, body con `<img>`
      (`alt = alt`), `h2.modal-title-govco` id=`titulo-modal-<slug>`
      (nombre, `textContent`), categoría (`categoriaFicha`, `textContent`) y los
      párrafos de `bio` como `<p>` con `innerHTML` (HTML verbatim de confianza);
      si existe `secciones`, añadir sus `titulo`/`subtitulo`/`parrafos` también
      como HTML verbatim). Añadir cada modal al final del `<main>` (o a un
      contenedor dedicado dentro de `#contenido-cms`). Un comentario breve
      documenta la frontera `textContent` (texto plano) vs `innerHTML` (bio/HTML
      verbatim). No depender de nada fuera del Bootstrap/CDN que el portal provee.
      Files: `scripts/build-invitados.js`
      Verify: cubierto por los pasos 6 y 7.

- [ ] 5. Añadir `limpiarFichas()` que haga `readdirSync(INVITADOS_DIR)`, filtre
      con `/^perfil-.*\.html$/` y `unlinkSync` cada coincidencia, contando y
      reportando por consola con ✓ cada borrado (o un resumen). Idempotente: si
      no hay coincidencias, no borra ni falla. Reescribir `buildInvitados()` para
      que: lea `invitados.json`, llame `limpiarFichas()`, escriba la única
      `index.html` con `renderHtmlBase` (que incorpora datos+render de los pasos
      3-4), e imprima el mensaje final ✅ (1 página generada + N fichas
      eliminadas, con recordatorio de editar `invitados.json` y recorrer
      `npm run build:invitados`). No dejar archivos temporales.
      Files: `scripts/build-invitados.js`
      Verify: cubierto por el paso 6.

- [ ] 6. Ejecutar el build y verificar efectos en disco. Correr
      `npm run build:invitados`. Resultado esperado: consola muestra ✓ por cada
      `perfil-*.html` eliminado (36 la primera vez) y ✓ `index.html`, y el ✅
      final. Comprobar que **ya no existe** ningún `perfil-*.html` y que existe
      `invitados/index.html`. Volver a correr el comando (segunda pasada): debe
      completarse sin errores y reportar 0 fichas eliminadas (idempotencia).
      Files: (ninguno — ejecución)
      Verify: `npm run build:invitados` termina con código 0 ambas veces;
      `Get-ChildItem sites/culturas/cms/congreso-investigacion-artistica/invitados -Filter perfil-*.html`
      no devuelve resultados; `invitados/index.html` existe.

- [ ] 7. Verificar el HTML generado (validez, accesibilidad y runtime). Revisar
      que `invitados/index.html` contenga: un solo `<h1>`, tres `<h2>` (uno por
      categoría), tres `<div data-grilla="...">` vacíos, `const INVITADOS =` como
      literal JS (no `type="application/json"`), y los scripts del CDN/Bootstrap.
      Confirmar jerarquía h1→h2→h3 y que las tarjetas son `<button>` con
      `data-bs-toggle="modal"`. Ejecutar el linter de accesibilidad del repo:
      `npm run lint:a11y` (usa axe-core/jsdom) y confirmar que no reporta
      violaciones nuevas en la sección de invitados; si el linter no cubre JS en
      runtime, dejar constancia de esa limitación. Opcional pero recomendado:
      abrir el archivo en navegador y confirmar que `INVITADOS.length === 36`, que
      se pintan 6+27+3 tarjetas en sus grillas, y que al activar una tarjeta se
      abre su modal con foco gestionado por Bootstrap y cierre con `Esc`.
      Files: (ninguno — verificación)
      Verify: `npm run lint:a11y` sin violaciones nuevas; inspección del HTML
      confirma la estructura y la variable JS; (si se abre en navegador) 36
      tarjetas y modales funcionales con foco/aria correctos.

- [ ] 8. Confirmar que no quedaron enlaces rotos hacia `perfil-*.html` fuera de
      la sección. Buscar `perfil-.*\.html` en `sites/**/*.html`: tras regenerar,
      las únicas coincidencias esperadas son nulas (ya no se generan fichas ni se
      enlazan). Si apareciera algún enlace en otra sección, reportarlo (no se
      detectó ninguno en la exploración). No tocar `presentacion/` ni otras
      secciones, ni `img/` ni `_originales/`.
      Files: (ninguno — verificación)
      Verify: la búsqueda de `perfil-.*\.html` en `sites/**/*.html` no devuelve
      coincidencias; `img/` y `_originales/` intactos.

## Notas de cierre

- `invitados.json` sigue siendo la fuente editable; el generador lo lee en
  build-time y vuelca su contenido como `INVITADOS`.
- Conservar la cadena `cms` en todas las rutas (identificador del sistema).
- No duplicar la clave `build:invitados` en `package.json` (ya existe y apunta a
  `node scripts/build-invitados.js`; no modificarla).
- Al finalizar: recordar que, para el portal, solo se copia el HTML dentro de
  `#contenido-cms`; el documento completo se genera para previsualización local.
