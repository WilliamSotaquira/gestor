# Plan de implementación — Sección "Programación" (micrositio Congreso, Culturas / SharePoint)

Patrón de referencia obligatorio: la sección "Invitados" ya implementada
(`scripts/build-invitados.js` → `invitados/index.html` autocontenido con
`const INVITADOS = [...]` embebido y render en el navegador). Esta sección
"Programación" replica EXACTAMENTE ese patrón data-driven autocontenido, con
pestañas por día en lugar de grillas de tarjetas.

Trabajo directo sobre `e:\gestor` (sin worktree). Proyecto ESM (`package.json`
tiene `"type":"module"`). Node 24 verificado.

## Decisiones de diseño (grounded en el código leído)

1. **Mismo patrón que Invitados, no fetch.** El portal solo copia lo que está
   dentro de `#contenido-cms`; por eso los datos van embebidos como variable JS
   real (`const PROGRAMACION = {...}`), NO `type="application/json"`, y se vuelca
   con `JSON.stringify(data, null, 2).replace(/</g, '\\u003c')` igual que
   `renderDatosScript` en `build-invitados.js`. Razón: evita que una cadena de
   datos cierre `</script>` prematuramente.

2. **Frontera texto/HTML idéntica a Invitados.** El render usa DOM API
   (`createElement` + `textContent`) para TODO el texto de datos (horas,
   títulos, nombres, entidades, temas). No se concatena `innerHTML` con datos.
   La agenda no tiene HTML editorial verbatim (a diferencia de las bios de
   invitados), así que **no se usa `innerHTML` con datos en absoluto** — todo es
   texto plano vía `textContent`. Esto es más seguro y suficiente para esta
   sección. (Decisión: no replicar `parrafoHtml`/innerHTML porque no hay markup
   embebido en los datos de agenda.)

3. **Pestañas Bootstrap declarativas en el markup estático.** El `lint:a11y`
   (`scripts/lint-accessibility.js`) corre jsdom con `runScripts: 'outside-only'`,
   es decir **el script de render NO se ejecuta durante la validación**. Por tanto
   TODA la estructura accesible (nav de pestañas con roles/aria, 4 tabpanels, h1,
   breadcrumb, nav de secciones) debe estar en el HTML estático que genera el
   build, no inyectada por JS. El render solo *llena* el interior de cada panel
   (que arranca vacío). Las pestañas usan `data-bs-toggle="tab"` (Bootstrap
   5.3.3), sin JS propio.

4. **Modelo de datos `dias[].bloques[].actividades[]`.** 1 actividad = franja
   simple; 2 actividades = franjas en paralelo (dos columnas). Franjas logísticas
   (montaje, registro, receso, almuerzo, póster, cierre) son bloques con `tipo`
   y título corto, sin lista de personas. Esto cubre todos los casos de la fuente.

5. **Línea de tiempo, no tabla.** Cada bloque es una fila flex: franja horaria a
   la izquierda (destacada), contenido a la derecha. Apilado en móvil
   (`flex-column`), horizontal en escritorio (`flex-md-row`), sin scroll
   horizontal. Clases Bootstrap utilitarias + GOV.CO.

6. **Ponentes por confirmar.** Las franjas "Ponente 1..16" se modelan con
   `porConfirmar: true` y título "Ponencias (por confirmar)"; NO se inventan
   nombres. Se conserva `eje`/`tema` si lo hay. El render muestra una etiqueta
   (badge) "Por confirmar".

7. **Inauguración agrupada.** Un bloque `tipo: "inauguracion"` con
   `grupos: [{entidad, personas: [...]}]`. El render pinta cada grupo con un
   subtítulo (entidad) y una lista de personas. No párrafo corrido.

8. **Mesa de Saberes.** Bloque con los 6 sabedores y su pueblo/territorio
   (`sabedores: [{nombre, pueblo, territorio}]`). El render los pinta como lista.

9. **Decisiones sobre franjas ambiguas (documentadas en los datos con `nota`):**
   - Día 1 08:30–09:15 "Relato expandido 1 / artista invitado (Circo)" y
     18:00–19:00 "Relato expandido 1 - Circo": se modelan como dos bloques
     `tipo: "relato"` separados (apertura y cierre del día), ambos con el campo
     `espacios`.
   - Día 3 cierre ~17:00–17:40: bloque `tipo: "cierre"`, `espacios: "Edificio
     Corredor / Pablo VI"`.
   - Día 4 14:00–19:35 "franjas de cierre sin actividad confirmada": UN bloque
     `tipo: "porConfirmar"` con rango 14:00–19:35 y título "Cierre y actividades
     por confirmar" + `nota`. No se inventan sub-bloques.
   - "En paralelo" se marca a nivel de bloque con `paralelo: true` (derivable de
     `actividades.length === 2`, pero se deja explícito para claridad del render).

## Entregables

### 1. `programacion/programacion.json` — modelo de datos de los 4 días

Crear `sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json`.

Estructura raíz (objeto, NO array):

```json
{
  "titulo": "Programación del Congreso",
  "intro": "Agenda del Primer Congreso Nacional e Internacional de Investigación Artística, del 3 al 6 de noviembre de 2026 en Bogotá. Seleccione un día para ver su programación.",
  "dias": [
    {
      "id": "dia-1",
      "numero": 1,
      "fecha": "3 de noviembre de 2026",
      "etiquetaTab": "Día 1",
      "bloques": [ /* ... */ ]
    }
    /* dia-2, dia-3, dia-4 */
  ]
}
```

Forma de cada **bloque** (todos los campos de texto son texto plano):

```json
{
  "inicio": "10:20",
  "fin": "11:35",
  "tipo": "charla",            // ver vocabulario abajo
  "paralelo": false,            // true si hay 2 actividades simultáneas
  "actividades": [
    {
      "titulo": "Charla inaugural: El estado de la investigación artística en Colombia 2010-2026",
      "tema": "",               // opcional, eje o subtítulo
      "porConfirmar": false,
      "personas": [             // ponentes/invitados; omitir o [] si no aplica
        { "nombre": "Gabriel Jaime Vélez", "rol": "Presidente de ACOFARTES" }
      ],
      "moderacion": [           // opcional, lista de moderadores
        { "nombre": "Tania Delgado", "rol": "Editora académica" }
      ]
    }
  ]
}
```

Campos opcionales adicionales según `tipo`:
- `espacios` (string): para montaje / relato / cierre (p. ej. "Jaime Hoyos / José Félix Restrepo").
- `nota` (string): aclaración de franja ambigua.
- `grupos` (array): SOLO para `tipo: "inauguracion"`, forma
  `[{ "entidad": "Ministerio de las Culturas, las Artes y los Saberes", "personas": [{ "nombre": "Paola Holguín", "rol": "Ministra" }, ...] }]`.
- `sabedores` (array): SOLO para `tipo: "mesaSaberes"`, forma
  `[{ "nombre": "Victoria Uriana", "pueblo": "Wayúu", "territorio": "La Guajira" }, ...]`.

**Vocabulario de `tipo`** (string corto, controla el ícono/estilo del render):
`montaje`, `registro`, `relato`, `inauguracion`, `receso`, `almuerzo`,
`poster`, `charla`, `encuentro`, `conferencia`, `conversatorio`, `ponencias`,
`mesaSaberes`, `cierre`, `porConfirmar`.

**Contenido a modelar (completo, desde la FUENTE DE DATOS de la tarea):**

- **Día 1 (3 nov)** — 15 bloques en orden:
  1. 07:00–08:00 `montaje`, "Montaje", `espacios: "Jaime Hoyos / José Félix Restrepo"`.
  2. 08:00–09:00 `registro`, "Registro y bienvenida".
  3. 08:30–09:15 `relato`, "Relato expandido 1 / artista invitado (Circo)".
  4. 09:15–10:00 `inauguracion`, "Inauguración (protocolo)", con `grupos`:
     - "Ministerio de las Culturas, las Artes y los Saberes": Paola Holguín (Ministra), Ana María Abello (Viceministra de Cultura).
     - "Ministerio de Educación": Ilva Myriam Hoyos (Ministra), Camilo Noguera (Viceministro de Educación Superior).
     - "Ministerio de Ciencias": Claudia Benavides (Ministra), César Darío Guerrero (Viceministro de Apropiación social del conocimiento).
     - "ACOFARTES": Gabriel Jaime Vélez (Presidente).
     - "Pontificia Universidad Javeriana (anfitriona)": Padre Luis Fernando Múnera (Rector), Claudia Salamanca (Decana Facultad de Artes), Mónica Marcell Romero (Profesora Depto. de Artes).
  5. 10:00–10:20 `receso`, "Receso".
  6. 10:20–11:35 `charla`, "Charla inaugural: El estado de la investigación artística en Colombia 2010-2026", persona Gabriel Jaime Vélez (Presidente de ACOFARTES).
  7. 11:35–13:20 `encuentro`, "Justicia epistémica y ética de la investigación", personas: Juan Alejandro Chindoy Chindoy (U. Nacional de Colombia), Ritzi Medina (Ministerio de las Culturas), Carlos Sepúlveda (U. Pedagógica), Pedro Pablo Gómez (U. Distrital Francisco José de Caldas); moderación: Tania Delgado (editora académica del libro "Ética en la creación: hacia una práctica íntegra y responsable").
  8. 13:20–14:20 `almuerzo`, "Almuerzo".
  9. 14:20–14:30 `poster`, "Reel de pósteres".
  10. 14:30–15:30 `ponencias`, "Ponencias (por confirmar)", `porConfirmar: true` (Ponente 1, Ponente 2).
  11. 15:30–18:00 `mesaSaberes`, "Mesa de Saberes", `sabedores`: Victoria Uriana (Wayúu), Jhon Jairo Chota (Ticuna), Omaira Anacona (Yanacona), Irwin Cárdenas (Waunán), Joaquín Prince (Wayúu), Hugo Jamioy (Kamëntšá). (Día 1 no trae departamento → `territorio` vacío o el del día 2; usar el del día 2 por consistencia: Guajira, Amazonas, Cauca, Chocó, Guajira, Putumayo.)
  12. 18:00–19:00 `relato`, "Relato expandido 1 - Circo", `espacios: "Jaime Hoyos / José Félix Restrepo"`.

- **Día 2 (4 nov)** — bloques en orden (varios `paralelo: true` con 2 actividades):
  1. 07:00–09:00 `montaje`.
  2. 09:00–10:00 `encuentro` paralelo:
     (A) "Cuerpos, movimiento, sensibilidades y afectos" — Catalina del Castillo (PUJ), Wilfran Barrios (Corporación Cultural Atabaques); moderación Manuel García-Conno Tisoy (Ministerio de las Culturas).
     (B) "Pedagogías situadas — Proyecto TransMigrARTS (Fondos UE-H2020 No. 101007587)" — Monique Martínez Thomas (coordinadora, U. de Toulouse Jean Jaurès, Francia), Sonia Castillo (responsable científica, U. Distrital), María Teresa García Schlegel (U. Distrital), Álvaro Hernández (U. Distrital), Sandra Camacho (U. de Antioquia).
  3. 10:00–11:00 `ponencias` paralelo, `porConfirmar: true`: (Ponente 3, Ponente 4) y (Ponente 5, Ponente 6).
  4. 11:00–11:15 `receso`.
  5. 11:15–12:15 `encuentro` paralelo:
     (A) "Perspectivas ecológicas" — Blanca Botero (Artist for Amazonía), Consejo Ancestral Willka Yaku: Eyder Fabio Calambás, Phuyu Uma (Jennifer Ávila); moderación Ana María Arango (U. Tecnológica del Chocó).
     (B) "Inteligencia relacional e investigación artística en la era generativa" — Óscar Hernández Salgar (PUJ - Instituto Pensar), Valentina Ruiz (Proyecto_555), Eliécer Arenas (U. Pedagógica Nacional), Edgar Puentes (Orquesta Filarmónica de Bogotá).
  6. 12:15–13:15 `ponencias` paralelo, `porConfirmar: true`: (Ponente 7, Ponente 8) y (Ponente 9, Ponente 10).
  7. 13:15–14:15 `almuerzo`.
  8. 14:15–14:30 `poster`, "Reel de pósteres".
  9. 14:30–15:30 paralelo:
     (A) `conferencia` "Cuerpos, movimiento, sensibilidades y afectos: ¿Desde hace cuánto tiempo no estamos aquí? Notas sobre ausencia, ruina y reexistencia como prácticas de permanencia en las artes escénicas portuguesas" — Pedro Vilela (Trema Festival, Portugal).
     (B) `mesaSaberes` con los 6 sabedores + pueblo + departamento (ver lista completa abajo).
  10. 15:30–18:00 paralelo:
      (A) `encuentro` "Artes, culturas y memoria" — Pilar Riaño Alcalá (The University of British Columbia, Vancouver), La Rotativa (colectivo artístico de la Serranía del Perijá), Camila Camacho (mediadora del Mapa de Saberes); moderación Paola Wilches y Víctor Capador.
      (B) `mesaSaberes` (los 6 sabedores).
  11. 18:00–18:15 `receso`, "Receso / Reel de pósteres".
  12. 18:15–19:00 `relato`, "Relato expandido 2 - Música", `espacios: "Jaime Hoyos / Marino Troncoso"`.

  Lista canónica de sabedores (día 2 en adelante): Victoria Uriana (Wayúu, La Guajira), Jhon Jairo Chota (Ticuna, Amazonas), Omaira Anacona (Yanacona, Cauca), Irwin Cárdenas (Waunán, Chocó), Joaquín Prince (Wayúu, La Guajira), Hugo Jamioy (Kamëntšá, Putumayo).

- **Día 3 (5 nov)** — bloques en orden:
  1. 07:00–09:00 `montaje`.
  2. 09:00–10:00 `encuentro` paralelo:
     (A) "Conocimiento sensible como bien público" — Julieta Infantino (U. de Buenos Aires, Argentina), Nubia Leonor Flórez (U. del Atlántico); moderación Olga Lucía Olaya (Ministerio de las Culturas).
     (B) "Economías culturales basadas en las artes" — Martín Inthamoussu (curador adjunto del Programa de Arte del Banco Mundial, Uruguay), Javier Machicado (Lado B); moderación Adriana González Hassig (Secretaría de Cultura, Recreación y Deporte, Bogotá).
  3. 10:00–10:15 `receso`.
  4. 10:15–11:15 `ponencias` paralelo, `porConfirmar: true`: (Ponente 11, Ponente 12) y (Ponente 13, Ponente 14).
  5. 11:15–12:15 `encuentro` paralelo:
     (A) "Curadurías críticas" — Carolina Chacón (U. Nacional de Colombia, Sede Medellín), Ramiro Osorio (Teatro Mayor Julio Mario Santo Domingo), Eider Yangana ("Yanacroma" cuerpo colectivo); moderación Jaime Cerón Silva (curador independiente).
     (B) "Archivo y memoria viva" — Carolina Correa (Centro de Documentación Musical, Biblioteca Nacional de Colombia), Lara Lookabaugh (U. de Vanderbilt, EE.UU.), Jeffrey Amador (mediador del Mapa de Saberes); moderación Natalia Castellanos (Ministerio de las Culturas).
  6. 12:15–14:00 `almuerzo`.
  7. 14:00–15:00 `ponencias`, "Ponencias (por confirmar)", `porConfirmar: true` (Ponentes 15 y 16).
  8. 15:00–17:00 `mesaSaberes` (los 6 sabedores).
  9. 17:00–17:40 `cierre`, "Cierre del día", `espacios: "Edificio Corredor / Pablo VI"`.

- **Día 4 (6 nov)** — bloques en orden:
  1. 07:00–08:30 `montaje`.
  2. 08:30–09:55 `conversatorio` "Conocimiento sensible como bien público — espacio de conversación interinstitucional", personas: Ministerio de las Culturas, las Artes y los Saberes; Ministerio de Educación Nacional; Ministerio de Ciencia, Tecnología e Innovación; moderación Víctor Manuel Rodríguez. (Las entidades se modelan como `personas` con `nombre`=entidad y `rol`="Entidad participante", o como `tema`; decisión: `personas` con rol "Entidad participante" para que el render las liste.)
  3. 09:55–11:20 `conversatorio` "Reflexiones finales del Comité Académico: hacia un ecosistema de la investigación artística", personas: Mónica Romero (PUJ), Sonia Castillo (U. Distrital Francisco José de Caldas), Eduardo Sánchez (U. de Antioquia), Aníbal Maldonado (U. del Atlántico), Carlos Vázquez (Instituto Universitario de la Paz UNIPAZ); moderación Carlos Dueñas (Fundación Arteria).
  4. 11:20–11:35 `receso`.
  5. 11:35–13:00 `mesaSaberes` (los 6 sabedores).
  6. 13:00–14:00 `relato`, "Relato expandido 3 - Danza".
  7. 14:00–19:35 `porConfirmar`, "Cierre y actividades por confirmar", `porConfirmar: true`, `nota: "Franjas de cierre sin actividad confirmada al momento de publicar."`.

**Verificación del item:** `node -e "JSON.parse(require('fs').readFileSync('sites/culturas/cms/congreso-investigacion-artistica/programacion/programacion.json','utf-8')); console.log('JSON válido')"` imprime "JSON válido" sin lanzar. (Se usa `require('fs')` vía `node -e` con sintaxis compatible; alternativamente `node --input-type=module -e "import('fs')..."`.)

### 2. `scripts/build-programacion.js` — generador ESM

Crear `scripts/build-programacion.js`, mismo estilo que `scripts/build-invitados.js`.

**Imports y rutas:**
```js
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const PROGRAMACION_DIR = resolve(
  process.cwd(),
  'sites', 'culturas', 'cms', 'congreso-investigacion-artistica', 'programacion'
);
const DATA_FILE = resolve(PROGRAMACION_DIR, 'programacion.json');
```

**Funciones (firmas):**

- `escapeHtml(str)` — idéntica a la de `build-invitados.js` (para texto fijo del
  generador que va al HTML estático: título de pestañas, intro, labels).
- `renderDatosScript(programacion)` — devuelve el `<script> const PROGRAMACION = ...`
  con `JSON.stringify(programacion, null, 2).replace(/</g, '\\u003c')`. Igual que
  en invitados pero objeto en vez de array.
- `renderTabsEstaticas(dias)` — devuelve el markup estático de las pestañas
  (nav-tabs) + los 4 tabpanels VACÍOS. Ver "markup de pestañas" abajo. Cada
  panel contiene solo `<div class="..." data-timeline="dia-1"></div>` que el
  render llena. El primer tab lleva `active`/`aria-selected="true"`; el resto
  `aria-selected="false"` y el panel con `d-none`/sin `show active`.
- `renderScriptRender()` — devuelve el `<script>` IIFE de render del navegador
  (ver "lógica de render" abajo).
- `renderIndex(programacion)` — ensambla el documento completo autocontenido:
  `<!DOCTYPE html>` + head con los 2 CDN (GOV.CO all.css, Bootstrap CSS) +
  comentario de plantilla CULTURAS + `#contenido-cms` > `main#contenido-principal`
  con: nav de secciones (Programación `aria-current="page"`), breadcrumb
  (Inicio › Programación), `<h1>` (de `programacion.titulo`), `<p class="text1-govco">`
  (de `programacion.intro`), `renderTabsEstaticas(...)`, y al final del body los
  scripts CDN (GOV.CO script.js, Bootstrap bundle), `renderDatosScript(...)`,
  `renderScriptRender()`.
- `buildProgramacion()` — lee y parsea el JSON, escribe `index.html`, imprime
  mensajes `✓`/`✅` con el conteo de días y bloques. Idempotente (solo
  sobrescribe `index.html`; no hay fichas que borrar como en invitados, así que
  NO se necesita `limpiarFichas`). Se invoca al final del módulo:
  `buildProgramacion();`.

**Mensajes de consola** (fieles al estilo invitados):
`console.log('  ✓ index.html')` y
`console.log('\n✅ 1 página autocontenida (N días, M bloques) en sites/culturas/cms/congreso-investigacion-artistica/programacion/')`.

**Markup de pestañas estático (dentro de `renderTabsEstaticas`), roles/aria Bootstrap 5.3.3:**
```html
<nav>
  <div class="nav nav-tabs" id="tabs-dias" role="tablist" aria-label="Días del congreso">
    <button class="nav-link active" id="tab-dia-1" data-bs-toggle="tab"
            data-bs-target="#panel-dia-1" type="button" role="tab"
            aria-controls="panel-dia-1" aria-selected="true">Día 1 · 3 nov</button>
    <!-- Día 2..4: active ausente, aria-selected="false" -->
  </div>
</nav>
<div class="tab-content pt-4" id="contenido-dias">
  <div class="tab-pane fade show active" id="panel-dia-1" role="tabpanel"
       aria-labelledby="tab-dia-1" tabindex="0">
    <h2>Día 1 · 3 de noviembre de 2026</h2>
    <div class="d-flex flex-column gap-3" data-timeline="dia-1"></div>
  </div>
  <!-- Día 2..4: "tab-pane fade" (sin show active) -->
</div>
```
Notas: el `<h2>` de cada día va EN EL MARKUP ESTÁTICO (no inyectado) para que la
jerarquía h1→h2→h3 sea válida bajo el lint que no ejecuta JS. El texto de la
etiqueta del tab = `etiquetaTab` + fecha corta; el texto de `escapeHtml` aplica a
estos literales derivados de datos fijos del build.

**Lógica de render (`renderScriptRender`, IIFE `'use strict'`, DOM API, textContent):**
- Helper `crear(tag, clase)` idéntico a invitados.
- `const badge = (texto, clase) => { ... textContent ... }` para etiquetas
  "En paralelo" / "Por confirmar" (usar `span class="badge ..."` Bootstrap +
  color GOV.CO; p. ej. `bg-warning text-dark` para "Por confirmar", `bg-info` o
  color cobalt para "En paralelo"; sin remover focus).
- `crearActividad(act)` → devuelve un elemento (tarjeta/contenido) con:
  `h3` título (textContent), `tema` opcional (`p`), badge "Por confirmar" si
  `act.porConfirmar`, lista `ul` de `personas` ("Nombre — rol" con textContent),
  bloque de `moderacion` ("Modera: ..."), `grupos` (para inauguración: por cada
  grupo un `h4`/subtítulo con la entidad + `ul` de personas), `sabedores` (lista
  "Nombre — pueblo, territorio").
  - **Jerarquía de encabezados dentro del panel:** panel tiene `h2` (día), el
    título de actividad es `h3`; los subtítulos de entidad en inauguración usan
    `h4`. Mantener este orden.
- `crearBloque(bloque)` → fila línea de tiempo:
  `div.d-flex.flex-column.flex-md-row.gap-3` con
  (izq) `div` franja horaria `inicio–fin` destacada (clase utilitaria, p. ej.
  `fw-bold text1-govco` + ancho fijo en `md`), y
  (der) contenido. Si `bloque.actividades.length === 2` (o `bloque.paralelo`):
  badge "En paralelo" + `div.row.g-3` con dos `div.col-12.col-md-6`, cada una con
  una actividad (dos tarjetas lado a lado, apiladas en móvil). Si 1 actividad:
  render directo. Para bloques logísticos sin actividades (montaje/receso/
  almuerzo/registro/poster/cierre), mostrar solo la franja + el título corto
  (tomar `bloque.actividades[0].titulo` o un campo `titulo` de bloque — decisión:
  los bloques logísticos también usan `actividades:[{titulo:"..."}]` de un solo
  elemento para uniformidad del render; `espacios`/`nota` se muestran como texto
  secundario si existen).
- Bucle principal: `PROGRAMACION.dias.forEach(dia => { const cont =
  document.querySelector('[data-timeline="'+dia.id+'"]'); dia.bloques.forEach(b
  => cont.appendChild(crearBloque(b))); })`.

**Verificación del item:**
`npm run build:programacion` imprime `✓ index.html` y `✅ ...` sin error, y
genera `programacion/index.html` (comprobar que el archivo existe y contiene
`const PROGRAMACION =` y las 4 pestañas). Depende del item 1 (JSON) y del item 3
(script registrado en package.json) para el alias npm; se puede probar primero
con `node scripts/build-programacion.js`.

### 3. `package.json` — registrar el script

Añadir en `"scripts"`, tras `"build:invitados"`:
```json
"build:programacion": "node scripts/build-programacion.js",
```
No duplicar claves ni romper el JSON (mantener comas correctas).

**Verificación:** `node -e "const p=require('./package.json'); if(!p.scripts['build:programacion']) throw new Error('falta script'); console.log('ok')"` → "ok". Y `npm run build:programacion` ejecuta el generador.

### 4. Actualizar navegación del micrositio ("Programación" pasa a enlace activo)

En los tres lugares, reemplazar el `<span ...>Programación (en preparación)</span>`
por un enlace activo, respetando la ruta relativa de cada archivo. `programacion/`
es hermana de `invitados/` y `presentacion/`.

- **4a. `congreso-investigacion-artistica/index.html` (portada).** Dos cambios:
  1. En la `<nav>` de secciones:
     `<span class="btn-govco link-btn-govco disabled" aria-disabled="true">Programación (en preparación)</span>`
     →
     `<a href="programacion/index.html" class="btn-govco link-btn-govco">Programación</a>`
  2. En la grilla de tarjetas de secciones, la tarjeta "Programación (en
     preparación)" (`<div class="tarjeta-govco ..." aria-disabled="true">`) →
     tarjeta-enlace disponible:
     `<a href="programacion/index.html" class="tarjeta-govco vertical-tarjeta-govco w-100">`
     con `<span>Disponible</span>` en lugar de `En preparación`, manteniendo el
     `<h3 class="h5">Programación</h3>` y el `<p>`.

- **4b. `congreso-investigacion-artistica/presentacion/index.html`.** En la `<nav>`:
  `<span ...>Programación (en preparación)</span>` →
  `<a href="../programacion/index.html" class="btn-govco link-btn-govco">Programación</a>`.

- **4c. `scripts/build-invitados.js` (NO editar el HTML a mano).** En
  `renderIndex`, dentro de la `<nav>` de secciones, cambiar:
  `<span class="btn-govco link-btn-govco disabled" aria-disabled="true">Programación (en preparación)</span>`
  →
  `<a href="../programacion/index.html" class="btn-govco link-btn-govco">Programación</a>`.
  Luego re-ejecutar `npm run build:invitados` para regenerar
  `invitados/index.html`. Dejar el resto del nav igual (Convocatoria y
  Publicaciones siguen "en preparación").

**Verificación del item:**
- `npm run build:invitados` corre sin error y `invitados/index.html` ahora
  contiene `href="../programacion/index.html"` y ya NO contiene
  "Programación (en preparación)".
- `grep` de confirmación NO cuenta como verificación suficiente; la verificación
  real es el lint a11y (item 5) sobre los tres archivos + apertura visual.

### 5. `programacion/.agents/tasks/verificacion.md` — documentar verificación

Crear `sites/culturas/cms/congreso-investigacion-artistica/programacion/.agents/tasks/verificacion.md`
documentando los pasos ejecutados y sus resultados:
1. `node -e` de validación JSON de `programacion.json`.
2. `npm run build:programacion` (salida ✓/✅, archivo generado).
3. `npm run build:invitados` (regeneración tras cambio de nav en el generador).
4. `npm run lint:a11y sites/culturas/cms/congreso-investigacion-artistica/programacion`
   y también sobre `.../index.html` (portada) y `.../presentacion/` — registrar
   que axe-core no reporta violaciones nuevas (recordando que el render JS no se
   ejecuta bajo jsdom `outside-only`, por lo que lo validado es el markup
   estático: pestañas con roles/aria, h1/h2, breadcrumb, nav).
5. Verificación manual en navegador: las 4 pestañas cambian de día, la línea de
   tiempo se pinta, los bloques en paralelo muestran dos columnas con badge "En
   paralelo", la inauguración se agrupa por entidad, los ponentes muestran "Por
   confirmar", no hay scroll horizontal en móvil.
6. Confirmar que solo el contenido dentro de `#contenido-cms` es lo que se copia
   al gestor de contenidos (SharePoint).

## Orden de ejecución (por dependencia)

1. Item 1 — `programacion.json` (fuente de datos).
2. Item 2 — `build-programacion.js` (consume el JSON).
3. Item 3 — `package.json` (alias npm) — puede hacerse junto con el 2.
4. Ejecutar `npm run build:programacion` → genera `programacion/index.html`.
5. Item 4 — cambios de nav (4a, 4b, 4c) + re-ejecutar `npm run build:invitados`.
6. Item 5 — `verificacion.md` tras correr lint y pruebas.

## Verificación global (comandos reales del proyecto)

- `npm run build:programacion` — genera la hoja sin error.
- `npm run build:invitados` — regenera invitados con el nav actualizado.
- `npm run lint:a11y sites/culturas/cms/congreso-investigacion-artistica` — axe-core
  sobre todo el micrositio; sin violaciones nuevas.

## Restricciones recordadas

- Todo autocontenido; sin `fetch` ni archivos externos en runtime; datos como
  `const PROGRAMACION = {...}` en el cuerpo.
- Sin dependencias nuevas (solo `fs`/`path` de Node, como invitados).
- La cadena "cms" en rutas es identificador fijo: NO renombrar.
- Componentes GOV.CO v5 + Bootstrap 5.3.3; accesibilidad obligatoria
  (alt, jerarquía h1→h2→h3, nombres accesibles, tabs/paneles con roles/aria).
- No inventar nombres de ponentes por confirmar.
```
