# Verificación — Sección "Programación" (micrositio Congreso, Culturas / SharePoint)

Implementación data-driven autocontenida de la sección "Programación", replicando
el patrón de la sección "Invitados" (`const PROGRAMACION` embebido + render en el
navegador, sin `fetch` ni archivos externos). Trabajo directo sobre `e:\gestor`.

## Archivos creados / modificados

Creados:
- `sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json` — agenda de los 4 días (fuente de datos).
- `scripts/build-programacion.js` — generador ESM (mismo estilo que `build-invitados.js`).
- `sites/culturas/cms/congreso-investigacion-artistica/programacion/index.html` — página autocontenida generada por el build.
- `sites/culturas/cms/congreso-investigacion-artistica/programacion/.agents/tasks/verificacion.md` — este documento.

Modificados:
- `package.json` — añadido `"build:programacion": "node scripts/build-programacion.js"` tras `build:invitados`.
- `sites/culturas/cms/congreso-investigacion-artistica/index.html` — nav de secciones y tarjeta "Programación" pasan de "en preparación" a enlace activo (`programacion/index.html`).
- `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html` — nav: enlace activo (`../programacion/index.html`).
- `scripts/build-invitados.js` — en `renderIndex`, el `<span>Programación (en preparación)</span>` del nav pasó a `<a href="../programacion/index.html" ...>Programación</a>`.
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/index.html` — regenerado con `npm run build:invitados` (NO editado a mano) para reflejar el nav actualizado.

## Modelo de datos

- **4 días** (3, 4, 5, 6 de noviembre de 2026) → `dias[].bloques[].actividades[]`.
- **40 bloques** en total (día 1: 12, día 2: 12, día 3: 9, día 4: 7).
- 1 actividad = franja simple; 2 actividades = franjas en paralelo (`paralelo: true`).
- Franjas logísticas (`montaje`, `registro`, `receso`, `almuerzo`, `poster`, `cierre`)
  modeladas como bloque con una sola actividad de título corto; `espacios`/`nota`
  como texto secundario.
- Inauguración (`tipo: "inauguracion"`) con `grupos:[{entidad, personas:[...]}]`
  agrupando Ministerios / ACOFARTES / universidad anfitriona.
- Mesa de Saberes (`tipo: "mesaSaberes"`) con los 6 sabedores y su pueblo/departamento.

### Qué quedó "por confirmar" (`porConfirmar: true`)

NO se inventó ningún nombre. Se modelaron como "Ponencias (por confirmar)":
- Día 1: 1 bloque de ponencias (Ponentes 1–2).
- Día 2: 3 bloques de ponencias en paralelo (Ponentes 3–10).
- Día 3: 1 bloque en paralelo (Ponentes 11–14) + 1 bloque simple (Ponentes 15–16).
- Día 4: 1 bloque "Cierre y actividades por confirmar" 14:00–19:35 con `nota`.

## Comandos ejecutados y resultados

### 1. Validación del JSON

```
node -e "JSON.parse(require('fs').readFileSync('sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json','utf-8')); console.log('JSON valido')"
```
Salida:
```
JSON valido
```

### 2. `node scripts/build-programacion.js`

```
  ✓ index.html
✅ 1 página autocontenida (4 días, 40 bloques) en sites/culturas/cms/congreso-investigacion-artistica/programacion/
   Edita programacion.json y vuelve a correr: npm run build:programacion
```

### 3. Idempotencia (dos corridas → mismo archivo)

Se comparó el hash SHA-256 de `programacion/index.html` antes y después de una
segunda corrida del generador:
```
IDEMPOTENTE OK: D24DF34597EF04A4A0DCEAB48392D30E6EDD21547C7280117A8937F57952D36A
```
El archivo no cambia en la segunda corrida.

### 4. `npm run build:invitados` (regeneración tras tocar su generador)

```
  ✓ index.html
✅ 1 página autocontenida (36 invitados) + 0 ficha(s) eliminada(s) en sites/culturas/cms/congreso-investigacion-artistica/invitados/
```
`invitados/index.html` ahora contiene `href="../programacion/index.html"` y ya
NO contiene "Programación (en preparación)".

### 5. `npm run lint:a11y sites/culturas/cms/congreso-investigacion-artistica`

```
✅ sites\culturas\cms\congreso-investigacion-artistica\index.html — Sin problemas
✅ sites\culturas\cms\congreso-investigacion-artistica\invitados\index.html — Sin problemas
✅ sites\culturas\cms\congreso-investigacion-artistica\presentacion\index.html — Sin problemas
✅ sites\culturas\cms\congreso-investigacion-artistica\programacion\index.html — Sin problemas
──────────────────────────────────────────────────
Archivos analizados: 4
Problemas encontrados: 0
```
(El aviso "HTMLCanvasElement's getContext()" es ruido de jsdom sin el paquete
`canvas`; no es una violación de accesibilidad.)

### 6. Comprobaciones de contenido del HTML generado

```
const PROGRAMACION: True        (existe la variable JS; NO application/json)
application/json ausente: True
fetch ausente: True
num role="tab": 4
num role="tabpanel": 4
```
Y en el `<script>` de render embebido: `col-12 col-md-6` (dos columnas en
paralelo), badges `'En paralelo'` y `'Por confirmar'`, helpers `listaGrupos` y
`listaSabedores` presentes.

## Accesibilidad del DOM renderizado por JS

El lint (`scripts/lint-accessibility.js`) corre jsdom con
`runScripts: 'outside-only'`, por lo que **el script de render NO se ejecuta**
durante la validación. Lo que axe-core valida es el **markup estático** generado
por el build. Por eso la estructura accesible vive en el HTML estático:

- **Pestañas:** `<div class="nav nav-tabs" role="tablist" aria-label="Días del congreso">`
  con 4 `<button role="tab">`, cada uno con `aria-selected`, `aria-controls` y
  `data-bs-toggle="tab"` (Bootstrap 5.3.3, sin JS propio). El primer tab lleva
  `active`/`aria-selected="true"`.
- **Paneles:** 4 `<div role="tabpanel" aria-labelledby="tab-dia-N" tabindex="0">`;
  el primero con `show active`, el resto solo `tab-pane fade` (ocultos).
- **Jerarquía de encabezados:** un solo `<h1>` (título de la sección); un `<h2>`
  por día **en el markup estático** (no inyectado) para que la jerarquía sea
  válida bajo el lint que no ejecuta JS.

Para el contenido pintado por JS, la accesibilidad se garantizó por revisión de
las plantillas DOM en `renderScriptRender()` de `scripts/build-programacion.js`:

- Cada título de actividad se crea como `<h3 class="h6">` (continúa h1→h2→h3);
  los subtítulos de entidad en la inauguración usan `<h4 class="h6">` (h3→h4).
- Todo el texto de datos (horas, títulos, nombres, roles, entidades, pueblos,
  territorios, notas) se asigna con `textContent` y la estructura se arma con el
  DOM API (`createElement` + `append`); **no se concatena `innerHTML` con datos**,
  evitando inyección y preservando el texto literal.
- Las etiquetas "En paralelo" (`bg-info text-dark`) y "Por confirmar"
  (`bg-warning text-dark`) son `<span class="badge">` con texto visible (no
  dependen de color para su significado).
- No se remueven outlines ni estados `focus-visible`.

## Verificación manual pendiente (en navegador)

Como las pestañas se pintan en runtime, conviene abrir `programacion/index.html`
en un navegador y confirmar visualmente:
- Las 4 pestañas cambian de día (comportamiento Bootstrap).
- La línea de tiempo se pinta en cada panel (franja horaria a la izquierda,
  contenido a la derecha; apilado en móvil con `flex-column`).
- Los bloques en paralelo muestran dos columnas (`col-12 col-md-6`) con el badge
  "En paralelo".
- La inauguración se agrupa por entidad; los ponentes por confirmar muestran el
  badge "Por confirmar"; la Mesa de Saberes lista los 6 sabedores con pueblo y
  territorio.
- No hay scroll horizontal en móvil.

## Nota para el usuario — flujo de trabajo

Esta sección es data-driven. Para actualizarla:

1. Editar `sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json`.
2. Ejecutar `npm run build:programacion` (regenera `programacion/index.html`).
3. Subir `programacion/index.html` a SharePoint. **Solo** se copia el contenido
   dentro de `#contenido-cms`.

La cadena `cms` en las rutas es un identificador fijo del sistema y se conserva
tal cual.
