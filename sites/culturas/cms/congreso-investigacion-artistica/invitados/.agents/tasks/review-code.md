# Invitados en una sola página autocontenida con datos JS embebidos

El generador `build-invitados.js` pasa de emitir 36 fichas `perfil-<slug>.html` + un listado a producir **una sola** `invitados/index.html` autocontenida: embebe los datos como variable JavaScript real (`const INVITADOS = [...]`) y añade un script de render que, en el navegador, pinta tarjetas GOV.CO verticales y un modal Bootstrap por invitado. No hay `fetch` ni JSON externo en runtime. El build además borra de forma idempotente las fichas `perfil-*.html` que la versión anterior generaba. El commit (`c78ad68`) toca solo `scripts/build-invitados.js`, la `invitados/index.html` regenerada, docs de tarea y la eliminación de las 36 fichas.

Watch for: nada bloqueante. La frontera texto-plano/HTML del render está correctamente trazada (`textContent` para datos, `innerHTML` solo para bio/secciones de confianza editorial) y el volcado de datos escapa `<` como `\u003c` para no romper `</script>` (confirmed).

**Verdict**: APPROVED

## High-level view

El generador cumple el objetivo central: una `index.html` autocontenida, sin fichas sueltas, con los datos como variable JS real `const INVITADOS` (no `<script type="application/json">`, exigencia explícita del usuario) y 36 invitados volcados desde `invitados.json`. El HTML estático base conserva cabecera, CDN GOV.CO v5, Bootstrap 5, navegación de secciones y breadcrumb, con jerarquía `h1 → h2` por categoría; las grillas quedan vacías con `data-grilla` para que las llene el script.

El borrado de fichas es idempotente y acotado: `limpiarFichas` lee solo `INVITADOS_DIR` (no recursivo) y filtra con `^perfil-.*\.html$`, así que no puede alcanzar nada fuera de `invitados/` ni archivos que no sean fichas. El commit no toca `img/`, `_originales/` ni `presentacion/`.

El script de render construye tarjetas como `<button>` (acción de abrir diálogo, no navegación) con `data-bs-target="#modal-<slug>"` y modales con ids únicos `modal-<slug>`, `aria-labelledby` al `h2` del título, botón de cierre con `aria-label="Cerrar"`; Bootstrap 5 gestiona foco y cierre con `Esc` de forma nativa. La frontera de escape es la decisión de diseño clave y está bien resuelta y documentada.

El código está limpio: sin `var`, sin `console.log` en el HTML generado, sin dependencias nuevas, `cms` conservado en rutas. La verificación del coder (build idempotente, 36 invitados, 0 fichas restantes, lint:a11y sin hallazgos en el estático) está documentada y es consistente con lo que verifiqué sobre el diff y el artefacto.

<details>
<summary>Issues (0)</summary>

No hay hallazgos bloqueantes ni acciones pendientes.

</details>

<details>
<summary>Details</summary>

### Una sola página y borrado idempotente de fichas

El `buildInvitados` anterior iteraba `invitados.forEach` escribiendo una ficha por slug más el índice. Ahora llama a `limpiarFichas()` y escribe únicamente `index.html`. Las funciones `renderFicha`, `renderBio`, `renderSecciones`, `renderFichaImg`, `renderCard`, `renderCardImg` y `renderSeccionListado` desaparecen del diff, lo que elimina el camino de código que producía fichas (confirmed, no queda emisión de `perfil-*.html` en el fuente).

`limpiarFichas` acota el borrado por partida doble: `readdirSync(INVITADOS_DIR)` lee un único directorio (no recursivo) y el filtro `/^perfil-.*\.html$/` exige el prefijo `perfil-` y la extensión `.html`. No puede alcanzar `img/`, `_originales/` ni subcarpetas. Es idempotente: si no hay fichas, el filtro devuelve lista vacía, no hay error y retorna 0. El segundo build documentado (0 fichas borradas, código 0) es coherente con esto. En el artefacto quedan 0 ficheros `perfil-*.html` (confirmed).

### Datos como variable JS real, no JSON embebido

`renderDatosScript` emite `const INVITADOS = <JSON.stringify(array, null, 2)>` dentro de un `<script>` normal — una variable JS real, no un `<script type="application/json">`. En el artefacto: `const INVITADOS` aparece 1 vez, `application/json` 0 veces, `fetch(` 0 veces, y hay 36 elementos `"slug":` (confirmed). Reparto por categoría: 6 internacional, 27 nacional, 3 moderación = 36, que casa con las tres grillas `data-grilla`.

El volcado escapa `<` como `\u003c` sobre toda la cadena serializada. Esto cubre el riesgo real de que una bio con markup (`<em>`) cierre prematuramente la etiqueta `</script>` y rompa el parser. En el artefacto hay 68 ocurrencias de `\u003c` dentro de las bios, p. ej. `\u003cem>Velo qué bonito...\u003c/em>` (confirmed). Como JavaScript interpreta `\u003c` como `<` al asignar la cadena, la bio llega íntegra al `innerHTML` del párrafo. Frontera correcta y documentada en el comentario de la función.

### Render de tarjetas y modales GOV.CO

`crearTarjeta` produce `<div class="col"> > <button class="tarjeta-govco vertical-tarjeta-govco w-100">` con `data-bs-toggle="modal"` y `data-bs-target="#modal-<slug>"`. El uso de `<button type="button">` en lugar del `<a href>` del componente de referencia es la elección correcta: abrir un diálogo es una acción, no navegación, y evita un enlace sin destino real. La imagen recibe `alt = inv.altCard || inv.alt`, y los `alt` en datos siguen el patrón "Retrato de \<Nombre\>".

`crearModal` sigue la estructura de `shared/components/modales/`: `.modal.fade` con `tabindex=-1`, `aria-labelledby="titulo-modal-<slug>"`, `aria-hidden="true"`; `modal-dialog modal-dialog-govco modal-dialog-centered`; header con botón `close-btn-modal` (`aria-label="Cerrar"`, icono `govco-times`); título como `h2.modal-title-govco` con el id referenciado por `aria-labelledby`. Los ids `modal-<slug>` son únicos porque los slugs lo son (36 modales, uno por invitado). Bootstrap 5 gestiona focus trap, retorno al disparador y cierre con `Esc`, por lo que no hace falta JS adicional de foco.

El título del modal es `h2` mientras la jerarquía del documento es `h1 → h2` por categoría. Es aceptable: cada `.modal` con `aria-labelledby` es un contexto de diálogo independiente cuyo `h2` no compite con la jerarquía del documento base; los subtítulos internos del modal usan `h3` bajo ese `h2`.

### Frontera texto-plano / HTML en el render

El texto plano de datos (nombre, resumen, categoría, subtítulo de sección) se asigna con `textContent`, de modo que el navegador escapa automáticamente cualquier carácter sensible; `img.alt`/`img.src` vía propiedad. Solo `parrafoHtml` usa `innerHTML`, y únicamente para `inv.bio` y `sec.parrafos`, que son HTML editorial verbatim de confianza (incluyen `<em>`). La función está comentada como tal. El subtítulo de sección, aun siendo de la misma fuente editorial, se trata como texto plano dentro de un `<em>` creado por código — más conservador, sin perder el énfasis visual.

### Limpieza de código

El fuente del generador no usa `var` (0) y los 4 `console.log` son progreso de build legítimo (`✓ eliminada ...`, `✓ index.html`, resumen final, pista de reejecución), no depuración. El HTML generado no contiene `console.log` (0) ni `var` (0) y no referencia `perfil-` en ningún enlace (0). El script de render usa IIFE con `'use strict'`, `const`/arrow functions y un `DocumentFragment` para inyectar los modales de una vez. No se añaden dependencias externas; sigue dependiendo solo de los CDN GOV.CO v5 y Bootstrap ya presentes. La cadena `cms` se conserva en las rutas (identificador fijo del sistema).

### Evidencia de verificación del coder

`verificacion.md` documenta: build que borra 36 fichas y escribe index (código 0); segundo build idempotente (0 borradas); conteos sobre el HTML (1 `h1`, 3 `h2`, `const INVITADOS` presente, `application/json` ausente, 36 slugs); fotos existentes en `img/`; lint:a11y sin hallazgos sobre el HTML estático base, con la limitación explícita de que jsdom corre con `runScripts: 'outside-only'` (el DOM renderizado no se evalúa por axe, se revisó la lógica/ARIA del script). La limitación está declarada honestamente; no la trato como cobertura del DOM renderizado. Todo lo que verifiqué de forma independiente sobre el diff y el artefacto es consistente con lo documentado, así que no reejecuto las suites.

No tratado por las suites: axe-core no evalúa el DOM que produce el script (tarjetas y modales reales). No es un bloqueo del cambio — la estructura ARIA se revisó a mano y sigue el patrón del componente — pero es la zona con menor cobertura automatizada si en el futuro se quiere endurecer.

</details>

<details>
<summary>Mapa de archivos</summary>

- `scripts/build-invitados.js` — reescritura del generador: elimina el render de fichas, añade `renderSeccionVacia`/`renderDatosScript`/`renderScriptRender`/`limpiarFichas`, produce una sola index autocontenida y borra `perfil-*.html`.
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/index.html` — índice regenerado: grillas vacías con `data-grilla`, `const INVITADOS` (36) y script de render de tarjetas+modales.
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/perfil-*.html` (36) — eliminadas.
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/.agents/tasks/plan.md`, `verificacion.md` — docs de tarea.

Diff completo: `git show c78ad68`.

</details>
