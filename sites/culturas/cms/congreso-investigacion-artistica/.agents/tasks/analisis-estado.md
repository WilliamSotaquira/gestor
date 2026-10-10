# Análisis de estado — Micrositio Congreso de Investigación Artística

Análisis en modo solo lectura. Ubicación: `sites/culturas/cms/congreso-investigacion-artistica/`.
Portal de Culturas (publicado sobre SharePoint). Fecha del análisis sobre el commit
`8fd58bc` (HEAD = origin/main).

> Terminología: en este informe «gestor de contenidos» / «el portal» / «SharePoint»
> se usan como términos genéricos. La cadena `cms` se conserva solo en rutas
> (`sites/culturas/cms/...`) y comandos (`npm run build:cms`), por ser identificador
> fijo del sistema.

---

## Resumen ejecutivo (hallazgo principal)

El micrositio tiene **cuatro secciones construidas** (Portada, Presentación, Invitados,
Programación) con contenido real y abundante, y una arquitectura data-driven bien
documentada (JSON + script Node → página autocontenida). **Pero el estado en disco ya
no coincide con esa arquitectura**: el último commit (`8fd58bc`, "optimizar paginas del
Congreso") **reemplazó los cuatro `index.html` generados por el build** por versiones
adaptadas y pegadas desde SharePoint (estilos en línea, acordeones `<details>`, enlaces
`.aspx`, imágenes en `/PublishingImages/`). Esos HTML publicados **ya no contienen** la
variable embebida (`const INVITADOS` / `const PROGRAMACION`), ni el CDN GOV.CO/Bootstrap,
ni los modales/pestañas que describen los scripts y los `verificacion.md`.

Consecuencia crítica: **el flujo "editar JSON → `npm run build:*` → subir index.html" está
roto en la práctica**. Volver a correr el build hoy **sobrescribiría** la versión publicada
en SharePoint con una estructura distinta (la autocontenida con JS), no con una actualización
de la que está en línea. El JSON sigue siendo una buena fuente de datos, pero ya no genera el
HTML que efectivamente se publica.

Para publicar faltan sobre todo cierres de contenido (revisión semántica de Programación,
2 logos, versión EN, perfiles incompletos, 16 ponentes y franjas Día 4 por confirmar) y
**una decisión de arquitectura**: o se reparan los generadores para que emitan el formato
SharePoint, o se declara el build como herramienta de borrador y la fuente de verdad pasa a
ser el HTML pegado.

Nota de verificación: **`node` no está disponible en el entorno** (`where node` → no
encontrado), por lo que no fue posible ejecutar los builds ni `lint:a11y`. Todas las
afirmaciones de conteo y estructura se obtuvieron leyendo archivos y con conteos sobre el
texto; el análisis de accesibilidad es por lectura del código del linter y del HTML, no por
ejecución.

---

## 1. Arquitectura data-driven: cómo funciona y si está sincronizada

### Flujo diseñado (según scripts y PENDIENTES.md)

- **Invitados** — `scripts/build-invitados.js` lee `invitados/invitados.json`, vuelca el
  array como variable JS real `const INVITADOS = [...]` (con `JSON.stringify(..,null,2)` y
  escape de `<` como `\u003c`), y escribe `invitados/index.html`. El HTML estático trae tres
  grillas vacías `data-grilla="internacional|nacional|moderacion"`; un `<script>` de render
  recorre `INVITADOS`, crea una tarjeta `.tarjeta-govco` por invitado y un modal Bootstrap
  `#modal-<slug>` con la bio. Además borra fichas `perfil-*.html` heredadas (idempotente).
- **Programación** — `scripts/build-programacion.js` lee `programacion/programacion.json`,
  vuelca `const PROGRAMACION = {...}` y escribe `programacion/index.html`. El HTML estático
  trae las pestañas Bootstrap (`role="tablist"`, 4 `role="tab"` + 4 `role="tabpanel"`) con
  contenedores `data-timeline="dia-N"` vacíos; un `<script>` pinta la línea de tiempo por día
  (franjas, paralelos en `col-12 col-md-6`, inauguración por entidad, Mesa de Saberes).
- Regla común: nada de `fetch` ni hojas sueltas; solo se publica el HTML dentro de
  `#contenido-cms`.
- `scripts/build-cms.js` es un paso aparte (limpia tags de preview y escribe en `dist/cms/`);
  itera sobre `['movilidad','culturas','fotodeteccion']`. No es el generador de estas secciones.

### Estado real de sincronización — DESINCRONIZADO

Comparación de los `index.html` en disco contra lo que el build produciría:

| Marcador esperado del build | ¿Presente en el `index.html` en disco? |
|---|---|
| `const INVITADOS` / `const PROGRAMACION` | **No** (0 coincidencias) |
| `data-grilla=` / `data-timeline=` | **No** |
| `role="tab"` / `role="tabpanel"` (pestañas) | **No** |
| CDN `cdn.www.gov.co/layout-govco-v5` + Bootstrap 5.3.3 | **No** |
| `#contenido-cms` | Sí (es el único envoltorio que quedó) |

Lo que **sí** hay en disco es HTML "aplanado" de SharePoint: estilos en línea, acordeones
nativos `<details>/<summary>`, navegación con enlaces `.aspx`
(`/especiales/primer-congreso-nacional-internacional-investigacion-artistica/Paginas/*.aspx`)
e imágenes absolutas en `/especiales/.../PublishingImages/`.

Evidencia en git:
- `git log` de la carpeta: `016d653` y `c78ad68` crean/consolidan Invitados data-driven;
  `415fcc3` agrega Programación data-driven; `a380061` fija Presentación; y el más reciente
  **`8fd58bc "refactor: optimizar paginas del Congreso (Culturas)…"`** reescribe los cuatro
  HTML.
- `git show --stat 8fd58bc`: `invitados/index.html` 1270 líneas, `programacion/index.html`
  1684, `presentacion/index.html` 492, `index.html` 184 — con fuerte signo de borrado neto
  (`1684 +---`), coherente con sustituir las páginas autocontenidas (grandes, con JS embebido)
  por el HTML plano de SharePoint.

El **contenido** (datos de personas, textos, agenda) de los HTML publicados **sí coincide**
con los JSON — p. ej. la inauguración del Día 1 lista las mismas entidades y personas que
`programacion.json`. Es decir: alguien tomó el output del build, lo adaptó/pegó en SharePoint
y volvió a comprometer el resultado. La divergencia es de **formato y de pipeline**, no de
datos.

---

## 2. Inventario de contenido por sección

Conteos tomados de los JSON fuente (que coinciden con lo que muestran los HTML publicados).

| Sección | Fuente | Volumen | Estado |
|---|---|---|---|
| **Portada** (`index.html`) | HTML a mano | Menú interno + 6 tarjetas de sección (Presentación y Invitados "Disponible"; Programación "Disponible"; Convocatoria, Publicaciones y memorias, y Galería y prensa "En preparación") | Completa |
| **Presentación** (`presentacion/index.html`) | HTML a mano | 8 párrafos de presentación + público destinatario + 3 ejes en acordeón + lista de 8 aliados + franja con 6 logos | Completa en ES; faltan 2 logos en la franja y versión EN |
| **Invitados** (`invitados/invitados.json`) | JSON + build | **36** invitados: **6** internacionales, **27** nacionales (incl. colectivo Willka Yaku), **3** moderación | Casi completa; 2 sin foto |
| **Programación** (`programacion/programacion.json`) | JSON + build | **4** días (3–6 nov 2026), **40** bloques (Día 1: 12, Día 2: 12, Día 3: 9, Día 4: 7) | Estructura completa; datos clave por confirmar |

### Detalle Invitados (36)

- **Internacionales (6):** Lara Lookabaugh (EE. UU.), Monique Martínez Thomas (Francia),
  Pedro Vilela (Brasil/Portugal), Julieta Infantino (Argentina), Martín Inthamoussu (Uruguay),
  Pilar Riaño Alcalá (Canadá).
- **Nacionales (27):** incluye el colectivo "Consejo Ancestral Willka Yaku".
- **Moderación (3):** Manuel Fernando García García, Olga Lucía Olaya Parra, Ana María Arango.
- **Sin foto (placeholder `img/pendiente-foto.svg`, `fotoPendiente: true`):** **Jeffrey Amador**
  y **Nubia Flórez** (tienen bio; solo falta la imagen).
- Todos los 36 tienen bio. Dos traen sección "Ponencia" (Pedro Vilela, Julieta Infantino).

### Detalle Programación (40 bloques)

- Actividades marcadas `porConfirmar: true`: **9** bloques/actividades de "Ponencias (por
  confirmar)" repartidas en los 4 días, más el bloque de cierre del Día 4.
- Inauguración (Día 1) completa con autoridades por entidad.
- Mesa de Saberes con 6 sabedores, repetida en varios días.
- **Día 4, 14:00–19:35:** bloque único "Cierre y actividades por confirmar" con
  `nota: "Franjas de cierre sin actividad confirmada al momento de publicar."`

---

## 3. Accesibilidad GOV.CO

### Qué valida `scripts/lint-accessibility.js`

- Recorre recursivamente los `.html` de una ruta (por defecto `sites`), carga cada archivo en
  **jsdom** con `runScripts: 'outside-only'` e inyecta **axe-core** (`node_modules/axe-core/axe.min.js`),
  luego ejecuta `axe.run(document)` y reporta `violations` por archivo (impacto + descripción +
  `helpUrl`). Sale con código 1 si hay violaciones.
- **Es de solo lectura** (solo `readFileSync`/`readdirSync`; no escribe nada), por lo que sería
  seguro ejecutarlo. **No se ejecutó aquí porque `node` no está instalado en el entorno.**
- Límite importante: con `runScripts: 'outside-only'`, **el script de render no se ejecuta**;
  axe solo evalúa el **HTML estático**. En la arquitectura del build esto se compensa dejando
  la estructura accesible (encabezados, landmarks, roles de pestaña) en el HTML estático. En
  los HTML publicados actuales **todo el contenido ya es estático**, así que el linter evaluaría
  el contenido real (ventaja incidental del formato aplanado).

### Observaciones sobre el HTML publicado (por lectura)

- **`#contenido-cms`:** presente en las cuatro páginas (único patrón del pipeline que sobrevive).
- **Imágenes con `alt`:** sí; cada `<img>` de invitados y de logos lleva `alt` descriptivo.
- **CDN GOV.CO / Bootstrap:** **ausentes** en los HTML publicados. El micrositio ya no referencia
  `all.css` ni `bootstrap`; usa estilos en línea y componentes nativos (`<details>`). Esto no es
  una violación de axe por sí mismo, pero **se aparta de la regla del workspace** de usar los
  componentes GOV.CO v5 (`shared/components/`) y las clases oficiales.
- **Jerarquía de encabezados — hallazgo:** en `presentacion/index.html` el acordeón de ejes usa
  `h2` → `h4` (los temas de cada eje son `<h4>` sin `h3` intermedio) y más abajo aparece un `<h3>`
  "Logos de los aliados". El salto `h2→h4` rompe el orden jerárquico y axe lo marca como
  `heading-order` (moderate). Portada e Invitados mantienen `h1→h2→h3` razonable.
- **Estructura de modales/pestañas:** ya no existe en el publicado, así que los riesgos ARIA de
  esos componentes dejan de aplicar; a cambio, los `<details>` nativos son accesibles por defecto.

### ¿Pasaría el lint?

Según los `verificacion.md`, las versiones **generadas por el build** pasaban con **0 problemas**.
Los HTML **publicados actuales son distintos** y no se han vuelto a lintar aquí (no hay `node`).
Riesgo concreto a revisar: `heading-order` por el `h2→h4` de Presentación. Recomendación: ejecutar
`node scripts/lint-accessibility.js sites/culturas/cms/congreso-investigacion-artistica` en una
máquina con Node (es solo lectura) y resolver lo que marque.

---

## 4. Consistencia y deuda técnica (notas vs. estado real)

| Tema (de PENDIENTES / verificacion / review) | Estado verificado en disco |
|---|---|
| "`index.html` autocontenido con `const INVITADOS`/`PROGRAMACION`" (verificacion.md) | **Ya no se cumple**: los HTML publicados no tienen esa variable (ver §1). Las notas describen el output del build, no lo que está publicado. |
| "RELATO EXPANDIDO 4" rotulado como "Relato Expandido 3" | En `programacion.json` el Día 4 (13:00–14:00) dice **"Relato expandido 3 - Danza"**. Hay relato 1 (Día 1, Circo), relato 2 (Día 2, Música) y relato 3 (Día 4, Danza): la numeración visible es 1/2/3 coherente. El rótulo "RELATO EXPANDIDO 4" vivía en el `.md` fuente de perfiles; **no está** en el JSON ni en el HTML. Inconsistencia **no presente** en lo publicado (sí conviene confirmar si falta un cuarto relato). |
| Nombres pegados al cargo / safelinks de Outlook (Pilar Riaño) | `verificacion.md` dice que se limpiaron al montar las fichas; el `invitados.json` de Pilar Riaño se ve limpio. **Resuelto** en la fuente. |
| Perfiles sin foto | **Presente**: Jeffrey Amador y Nubia Flórez con `pendiente-foto.svg`. |
| Nombres h1 vs h3 / etiquetas de categoría (notas heredadas) | En invitados publicado, el nombre va como texto destacado dentro del `<summary>` del `<details>` (no como encabezado), y la categoría como `Internacional · País`. Coherente; sin el conflicto h1/h3 que mencionaban las notas antiguas. |
| Discrepancia de logo UNIPAZ | PENDIENTES dice que UNIPAZ (color) faltaba; **ahora existe** `presentacion/img/aliados/unipaz.png` en disco, pero **no está** en la franja del HTML publicado (la franja sigue con 6 logos y apunta a `/PublishingImages/`, no a `aliados/`). Ver §5 y §6. |

Deuda técnica adicional detectada:

- **Dos juegos de assets de logos en paralelo:** `presentacion/img/aliados/*.png` (optimizados,
  7 archivos incl. `unipaz.png`) **vs.** `logos/` (originales: `logo FundacionArteria.jpg`,
  `LOGO UTCH.jpeg`, `.ai`, etc.). El HTML publicado referencia los **originales** vía
  `/PublishingImages/`, no los optimizados de `aliados/`. Mantener ambos invita a divergencia.
- **Fotos de invitados:** 35 archivos en `invitados/img/` y 35 en `invitados/img/_originales/`
  (respaldo "no publicar"). El HTML publicado apunta a `/PublishingImages/<slug>.jpg`, no a
  `invitados/img/`.
- **Carpetas `.agents/tasks/`** con `plan*.md`, `review*.{md,json}`, `verificacion.md`: son
  artefactos de trabajo; no deberían subirse al portal (no afectan a `#contenido-cms`).

---

## 5. Riesgos de publicación a SharePoint

- **Rutas de imágenes:** los HTML publicados ya usan rutas absolutas del portal
  (`/especiales/.../PublishingImages/...`). Esto implica que **las imágenes deben existir en esa
  biblioteca** con esos nombres exactos (incluidos espacios codificados como `%20` y mayúsculas:
  `LOGO%20UTCH.jpeg`, `logos-UD-vertical-horizontal%20ASAB.png`). Riesgo: nombres con espacios y
  mayúsculas son frágiles; cualquier diferencia rompe la imagen. Las carpetas locales
  `invitados/img/` y `presentacion/img/aliados/` **no** se usan desde el HTML actual.
- **Página autocontenida vs. regla SharePoint:** la versión publicada es HTML estático plano, sin
  `fetch` ni recursos externos salvo imágenes del propio portal → **cumple** la regla de "solo
  HTML dentro de `#contenido-cms`". (La versión del build cumplía de otra forma, con JS embebido.)
- **Peso del HTML:** los HTML publicados son grandes por el contenido inline y los estilos
  repetidos en cada elemento (especialmente invitados y programación, cientos de líneas con
  `style="..."`). No es bloqueante, pero infla el campo de contenido y dificulta el mantenimiento
  manual.
- **Sin dependencia de JS propio:** positivo para SharePoint (no hay riesgo de que el portal
  bloquee `<script>`); negativo para el pipeline, porque se perdió la ventaja data-driven.
- **CDN GOV.CO ausente:** si el portal no inyecta globalmente el layout GOV.CO v5, la página se ve
  solo con los estilos en línea (apariencia aceptable pero fuera del sistema de diseño oficial).

---

## 6. Pendientes: bloqueantes vs. no bloqueantes para publicar

### Bloqueantes
1. **Decisión de arquitectura del pipeline (nuevo, el más importante).** Resolver la
   desincronización de §1 antes de volver a tocar el contenido: definir si (a) se reparan
   `build-invitados.js`/`build-programacion.js` para emitir el formato SharePoint, o (b) se
   congela el build como borrador y el HTML pegado pasa a ser la fuente de verdad. Hoy correr el
   build **sobrescribiría** lo publicado.
2. **Revisión semántica de Programación sin cerrar** (commit `415fcc3`, PENDIENTES.md): verificar
   pestañas por día, paralelos, inauguración y que el lint a11y siga en verde. Sigue pendiente.

### Recomendados (no bloquean, pero conviene antes de difundir)
3. **2 logos de aliados en la franja de Presentación.** UNIPAZ y Teatro Mayor **no aparecen** en
   la franja del HTML publicado (muestra 6). Matiz: `aliados/unipaz.png` **ya existe** en disco,
   así que UNIPAZ color podría estar resuelto a nivel de asset; falta integrarlo en la página
   publicada y conseguir el de **Teatro Mayor Julio Mario Santo Domingo**.
4. **16 ponentes "Por confirmar"** en Programación (nombres, títulos y reseñas).
5. **Franjas de cierre del Día 4 (14:00–19:35)** sin actividad confirmada.
6. **Perfiles de invitados incompletos:** fotos de **Jeffrey Amador** y **Nubia Flórez**; y los
   perfiles que esperan material (Mesa de Saberes: Victoria Uriana, Jhon Jairo Chota, Omaira
   Anacona, Irwin Cárdenas, Joaquín Prince, Hugo Jamioy; relatos expandidos; Wilfran Barrios;
   Javier Machicado; Adriana González Hassig; Carolina Correa; Víctor Manuel Rodríguez; comité
   académico). Varias de estas personas ya aparecen en `programacion.json` pero **no** tienen
   ficha en `invitados.json`.
7. **Versión en inglés de Presentación** (hay PDF; decidir bilingüe o página aparte).
8. **`heading-order` en Presentación** (`h2→h4` en el acordeón de ejes) — corregir para a11y.
9. **Consolidar assets de imágenes** (un solo juego) y confirmar que los nombres en
   `/PublishingImages/` existen en el portal.

### Bloqueado por terceros (fuera del alcance de publicación del micrositio)
- Formulario de inscripción (Fundación Arteria), transmisión/streaming (vía Ángela Pineda),
  publicaciones y memorias (poscongreso).

---

## Veredicto: ¿qué falta para publicar?

El micrositio **tiene contenido suficiente y presentable** para las cuatro secciones y, en su
forma publicada actual, **respeta la regla de SharePoint** (HTML estático dentro de
`#contenido-cms`, sin fetch). En ese sentido, Portada, Presentación (ES) e Invitados están
**listas o casi listas** para publicar, y Programación está lista en estructura.

Antes de dar por publicable el conjunto, resolver en este orden:

1. **Tomar la decisión de pipeline (§6.1)** para no sobrescribir lo publicado con un build.
2. **Cerrar la revisión semántica de Programación (§6.2)** y pasar el lint de a11y (requiere
   un entorno con Node; el linter es de solo lectura y seguro de ejecutar).
3. **Completar los recomendados de contenido** (logos, 16 ponentes, Día 4, fotos faltantes,
   versión EN) según prioridad editorial; estos no impiden una primera publicación pero sí la
   dejan incompleta.

Dicho de otro modo: **publicable hoy en estado "beta"** (con avisos "por confirmar" visibles),
pero con una **deuda de pipeline** que hay que decidir ya para que las futuras ediciones del
contenido no choquen con el build.

---

## Apéndice — Archivos y evidencia citada

- Datos: `invitados/invitados.json` (36 registros), `programacion/programacion.json` (4 días,
  40 bloques).
- Generadores: `scripts/build-invitados.js`, `scripts/build-programacion.js`,
  `scripts/build-cms.js`, `scripts/lint-accessibility.js`.
- HTML publicado: `index.html`, `presentacion/index.html`, `invitados/index.html`,
  `programacion/index.html` (todos reescritos por el commit `8fd58bc`).
- Notas de trabajo: `PENDIENTES.md`, `.agents/tasks/verificacion.md`,
  `.agents/tasks/review-refactor.{md,json}`, `invitados/.agents/tasks/verificacion.md`,
  `programacion/.agents/tasks/verificacion.md`.
- Assets: `invitados/img/` (35) + `invitados/img/_originales/` (35);
  `presentacion/img/aliados/` (7, incl. `unipaz.png`); `logos/` (originales + `.ai`).
- Git: `git log` de la carpeta y `git show --stat 8fd58bc` (reescritura de los 4 HTML).
- Limitación del entorno: `node` no disponible (`where node` sin resultados); builds y
  `lint:a11y` **no ejecutados**; conteos y estructura verificados por lectura de archivos.

> Contenido reformulado y resumido para cumplir con las reglas de terminología del workspace.
