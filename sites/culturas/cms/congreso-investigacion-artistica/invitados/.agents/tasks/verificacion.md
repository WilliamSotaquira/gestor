# Verificación — Invitados en una sola página autocontenida

## Qué cambió

`scripts/build-invitados.js` ahora produce **una sola** `invitados/index.html`
autocontenida y **borra** las fichas `perfil-*.html` de la versión anterior.
Los datos se embeben como variable JS real (`const INVITADOS = [...]`) y un
script en el navegador pinta las tarjetas GOV.CO y un modal Bootstrap por
invitado. No hay `fetch` ni JSON externo en runtime.

## Comandos ejecutados y resultados

### (a) Primer build — `node scripts/build-invitados.js`

- Borró **36** fichas `perfil-*.html` (una ✓ por cada una).
- Escribió `index.html`.
- Mensaje final: `✅ 1 página autocontenida (36 invitados) + 36 ficha(s) eliminada(s)`.
- Código de salida: 0.

### (b) Confirmación de eliminación de fichas

```
Get-ChildItem invitados -Filter perfil-*.html  →  0 resultados
```

Ya no existe ninguna `invitados/perfil-*.html`.

### (c) Inspección del HTML generado

Conteos sobre `index.html`:

- `<h1`: **1** (jerarquía raíz).
- `<h2`: **3** (una por categoría: Invitados internacionales, Invitados
  nacionales, Moderación).
- `data-grilla="…"`: **3** grillas vacías en el HTML estático (el 4.º match del
  patrón es el `querySelector('[data-grilla="…"]')` dentro del script de render).
- `const INVITADOS`: **1** aparición; `application/json`: **0** (es variable JS
  real, no `<script type="application/json">`).
- `"slug":` dentro de `INVITADOS`: **36** elementos.
- Cada `foto` referenciada existe en `invitados/img/` (34 `.jpg` + `pendiente-foto.svg`
  usado por los 2 invitados con `fotoPendiente`).
- El script de render genera, por cada invitado: una tarjeta
  `<button type="button" class="tarjeta-govco vertical-tarjeta-govco w-100">`
  con `data-bs-toggle="modal"` + `data-bs-target="#modal-<slug>"`, y un modal
  `id="modal-<slug>"` único inyectado al final del `<main>`.

### (d) Idempotencia — segundo `node scripts/build-invitados.js`

- Mismo resultado; borró **0** fichas (ya no quedaban), sin error, código 0.

### (e) Accesibilidad — `node scripts/lint-accessibility.js` (npm run lint:a11y)

```
✅ …/invitados/index.html — Sin problemas
Problemas encontrados: 0
```

(La advertencia `HTMLCanvasElement's getContext()` proviene de jsdom/axe-core y
no se relaciona con el contenido; no es un hallazgo de accesibilidad.)

#### Alcance del lint y verificación del DOM renderizado

`lint-accessibility.js` usa jsdom con `runScripts: 'outside-only'`, por lo que el
script de render **no se ejecuta**: axe-core evalúa únicamente el **HTML estático
base** (encabezados, landmarks, grillas vacías), que pasa **sin hallazgos**.

Como las tarjetas y modales se construyen en runtime, la accesibilidad del DOM
renderizado se verificó revisando la lógica del script y los atributos ARIA de
las plantillas JS:

- Tarjetas: son `<button type="button">` (abrir un diálogo es acción, no
  navegación), con nombre accesible dado por el nombre del invitado dentro del
  cuerpo. Cada `<img>` recibe `alt` (`altCard || alt`) vía propiedad `img.alt`.
- Modales: `role="dialog"` implícito de `.modal`, `tabindex="-1"`,
  `aria-labelledby="titulo-modal-<slug>"` apuntando al `h2.modal-title-govco`
  del propio diálogo, `aria-hidden="true"` en reposo. Botón de cierre con
  `aria-label="Cerrar"`. Bootstrap 5 gestiona el foco (focus trap, retorno al
  disparador y cierre con `Esc`) de forma nativa.
- Imágenes del modal: `alt = inv.alt`.
- Chequeo manual del markup generado: ids `modal-<slug>` únicos (36), un modal
  por invitado, estructura GOV.CO según `shared/components/modales/`.

### (f) Enlaces rotos

Búsqueda de `perfil-…\.html` en `sites/**/*.html`: **sin coincidencias**. No hay
enlaces rotos hacia las fichas eliminadas en ninguna sección.

## Datos

- **36** invitados: 6 internacionales, 27 nacionales, 3 de moderación.
- Con placeholder de foto (`fotoPendiente: true`, `img/pendiente-foto.svg`):
  **Jeffrey Amador** y **Nubia Flórez**.
- Datos embebidos como **variable JS real** `const INVITADOS` (volcado de
  `invitados.json` con `JSON.stringify(array, null, 2)`). `invitados.json` sigue
  siendo la fuente editable.

## Decisiones documentadas

### Encabezados del modal

Jerarquía del documento: `h1` (título de página) → `h2` por sección (3) → `h3`
en cada tarjeta. El **título del modal** (nombre del invitado) es un `h2`
(`modal-title-govco`, patrón de `shared/components/modales/`). Se acepta porque
cada modal es un contexto de diálogo independiente (`.modal` con
`aria-labelledby`), por lo que su `h2` no compite con la jerarquía del documento
base. Los subtítulos de `secciones` dentro del modal usan `h3` bajo ese `h2`.

### Frontera texto plano vs HTML

- `textContent` para todo texto plano de datos: nombre, resumen, categoría,
  título/subtítulo de secciones; `img.alt` vía propiedad. Así el navegador
  escapa automáticamente y se evita inyección de markup roto.
- `innerHTML` solo para los párrafos de `bio` y `secciones.parrafos`, que son
  **HTML editorial verbatim de confianza** (incluyen `<em>`). Esta frontera está
  comentada en el script (`parrafoHtml`).
- El volcado de `INVITADOS` escapa `<` como `\u003c` para que ninguna cadena de
  datos pueda cerrar la etiqueta `</script>` y romper el parser.

## Nota de contexto (CMS)

Solo el HTML dentro de `#contenido-cms` se copia al gestor de contenidos
(SharePoint, Culturas). El documento completo se genera para previsualización
local. La cadena `cms` en las rutas se conserva (identificador fijo del sistema).
