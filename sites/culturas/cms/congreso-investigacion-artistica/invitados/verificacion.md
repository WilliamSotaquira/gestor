# Verificación — Refactor data-driven de `invitados/`

Micrositio: Primer Congreso Nacional e Internacional de Investigación Artística
Sección: `sites/culturas/cms/congreso-investigacion-artistica/invitados/`

La cadena `cms` en las rutas es un identificador fijo del sistema y se conserva
tal cual en todo el flujo (no se traduce ni renombra).

## Qué se hizo

Se pasó de ~36 fichas HTML escritas a mano + un `index.html` manual a un enfoque
dirigido por datos:

- **`invitados/invitados.json`** — fuente de verdad del contenido (array plano,
  un objeto por invitado, en el orden y agrupación del listado).
- **`scripts/build-invitados.js`** — generador ESM (estilo `build-cms.js`) que
  regenera las 36 fichas `perfil-<slug>.html` y el `index.html` a partir del JSON.
- **`package.json`** — se añadió `"build:invitados": "node scripts/build-invitados.js"`.

## Comandos ejecutados y resultados

### 1. Generación — `node scripts/build-invitados.js`

Salida: 36 fichas `perfil-<slug>.html` + `index.html`.
Resumen final: `✅ 36 ficha(s) + index generados`.

Distribución por categoría (del JSON):

- internacional: 6
- nacional: 27
- moderacion: 3
- **Total: 36**

### 2. Fidelidad verbatim contra los originales

Antes de regenerar se respaldaron los 37 HTML originales. Tras generar, se comparó
cada archivo (`Compare-Object`) con su original:

- Las **36 fichas** `perfil-<slug>.html` quedaron **idénticas** a las originales
  (0 líneas de diferencia).
- `index.html`: única diferencia = se eliminó la línea `<!DOCTYPE html>` duplicada
  del original (ver inconsistencia #1). El resto del archivo es idéntico.

### 3. Idempotencia

Dos corridas consecutivas del generador producen bytes idénticos: 37 archivos con
hash `SHA-256` igual tras la segunda corrida. ✅ Idempotente.

### 4. Accesibilidad — `npm run lint:a11y` (acotado a la sección)

Comando: `node scripts/lint-accessibility.js sites/culturas/cms/congreso-investigacion-artistica/invitados`

Resultado: **Archivos analizados: 37 — Problemas encontrados: 0**. Todas las fichas
e `index.html` salen "Sin problemas". (El mensaje `Not implemented: HTMLCanvasElement's getContext()`
es un aviso benigno de jsdom, no una violación de accesibilidad.)

### 5. Integridad de referencias

- Cada `perfil-<slug>.html` referencia una imagen existente en `invitados/img/`
  (34 `.jpg` + 2 `pendiente-foto.svg`).
- Los 36 `href` de tarjetas del `index.html` apuntan a fichas existentes.
- Problemas detectados: **0**.

## Invitados con placeholder de foto

Dos invitados usan `img/pendiente-foto.svg` (no tienen `.jpg` propio todavía):

- `jeffrey-amador`
- `nubia-florez`

En el JSON llevan `"fotoPendiente": true` y conservan los comentarios HTML
`PENDIENTE` verbatim (uno para la ficha, otro para la tarjeta; ver inconsistencia #3).

## Inconsistencias ficha-vs-index conservadas (no descartadas)

1. **Doble `<!DOCTYPE html>` en el `index.html` original.** El generador emite un
   solo `<!DOCTYPE html>` (lo correcto). Es la única diferencia intencional del diff.
   No afecta a SharePoint, donde solo se copia `#contenido-cms`.

2. **Alt distinto entre tarjeta y ficha en `ritzy-medina`.** La tarjeta del index
   usa `alt="Retrato de Ritzy Medina"`, mientras que la ficha usa
   `alt="Retrato de Ritzy Katherine Medina Cuentas"`. Ambos se conservan verbatim:
   el objeto guarda `alt` (ficha) y `altCard` (tarjeta). El resto de invitados tiene
   el mismo alt en ambos lados (no se añadió `altCard`).

3. **Comentario `PENDIENTE` distinto entre tarjeta y ficha** para los dos invitados
   sin foto. Se conservan verbatim en campos separados:
   - `jeffrey-amador` — ficha: `PENDIENTE: falta fotografía. Solicitar al comité organizador.`
     · tarjeta: `PENDIENTE: falta fotografía de Jeffrey Amador (solicitar al comité)`
   - `nubia-florez` — ficha: `PENDIENTE: falta fotografía. Solicitar al comité organizador.`
     · tarjeta: `PENDIENTE: falta fotografía de Nubia Flórez (solicitar al comité)`

4. **Etiqueta de categoría larga (ficha) vs corta (tarjeta), con variación de género.**
   Se guardan por separado y verbatim: `categoriaFicha` (p. ej. `Invitada internacional · Estados Unidos`,
   `Invitado nacional`, `Invitada nacional`, `Moderación`, `Colectivo · Nacional`) y
   `categoriaCard` (p. ej. `Internacional · Estados Unidos`, `Nacional`, `Moderación`,
   `Colectivo · Nacional`).

5. **Secciones adicionales de "Ponencia" en dos fichas** (`pedro-vilela` y
   `julieta-infantino`). Además de la bio, estas fichas tienen un bloque
   `<section class="py-3">` con un `<h2>`, un subtítulo `p.text1-govco` con `<em>`
   y párrafos. No existía en la plantilla base del plan; para no perder contenido se
   añadió al modelo de datos un campo opcional `secciones` (array de
   `{ titulo, subtitulo, parrafos }`) que el generador reproduce verbatim. El resto de
   fichas no tiene este campo.

> Nota de modelo de datos: el `nombre` (h1/title/breadcrumb) y el `nombreCard` (h3 de
> la tarjeta) coinciden en todos los invitados de este conjunto; aun así se mantienen
> como campos separados para preservar la distinción si en el futuro divergen.

## Escape de HTML (decisión de diseño)

- Campos de **texto plano** (`nombre`, `nombreCard`, `alt`, `altCard`, `categoriaFicha`,
  `categoriaCard`, `resumen`, títulos de sección) se emiten con `escapeHtml`
  (`&`→`&amp;`, `<`→`&lt;`, `>`→`&gt;`, `"`→`&quot;`).
- Campo **`bio`** y **`parrafos`/`subtitulo`** de `secciones`: HTML interno verbatim
  (puede incluir `<em>` intencional del repo), por lo que **no** se escapan; el generador
  los envuelve en `<p>` / `<em>`. Escaparlos corrompería las cursivas intencionales.

## Flujo de trabajo para el usuario

Para añadir, editar o quitar invitados ya no se tocan los HTML a mano:

1. Editar **`sites/culturas/cms/congreso-investigacion-artistica/invitados/invitados.json`**
   (añadir/editar un objeto; `categoria` define en qué grilla aparece; para una foto aún
   no disponible usar `"foto": "img/pendiente-foto.svg"` y `"fotoPendiente": true`).
2. Ejecutar **`npm run build:invitados`** desde `e:\gestor`.
3. Se regeneran las fichas `perfil-<slug>.html` y el `index.html`. En SharePoint solo
   se copia el HTML dentro de `#contenido-cms`.

## Restricciones respetadas

- NO se tocó `presentacion/index.html` ni otras páginas del micrositio (solo la sección
  `invitados/`).
- NO se borró `img/` ni `img/_originales/`.
- La cadena `cms` se conserva en todas las rutas.
- No se añadieron dependencias nuevas (solo `fs` y `path` del core).
- Se eliminaron los archivos temporales creados para la verificación.
