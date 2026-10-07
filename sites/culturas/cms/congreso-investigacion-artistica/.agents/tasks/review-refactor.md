# Refactor data-driven de la sección Invitados (invitados.json + build-invitados.js)

El commit `016d653` extrae el contenido de las 36 fichas de invitados a un único `invitados.json` y añade `scripts/build-invitados.js` (ESM), que regenera las fichas `perfil-<slug>.html` y el `index.html` del listado desde ese JSON, más la clave `build:invitados` en `package.json`. El objetivo es dejar de editar 36 páginas a mano y pasar a una sola fuente de datos. El generador reproduce fielmente el patrón GOV.CO v5 + Bootstrap 5.3.3 escrito a mano, agrupa en tres grillas por categoría y conserva los placeholders de foto pendiente. El refactor no toca `presentacion/` ni borra `img/` ni `_originales/`, y la cadena `cms` se mantiene en todas las rutas como identificador fijo del sistema.

Watch for: nada bloqueante. El generador incluso corrige un `<!DOCTYPE html>` duplicado que traía el `index.html` original (confirmed). Única observación no bloqueante: las fichas regeneradas ganan un salto de línea final que los originales no tenían — normalización benigna y consistente (confirmed).

**Verdict**: APPROVED

## High-level view

La fuente de datos `invitados.json` contiene exactamente 36 objetos, uno por cada `perfil-<slug>.html` real: comparación bidireccional de slugs sin faltantes ni sobrantes, todas las categorías dentro de `internacional|nacional|moderacion` (6 / 27 / 3) y todas las fotos referenciadas existen en `invitados/img/`. No hay perfiles inventados ni omitidos.

El generador reconstruye el HTML con la misma estructura que la ficha de referencia (`perfil-blanca-botero.html`): head con CDN GOV.CO v5 + Bootstrap 5.3.3, `#contenido-cms`, breadcrumb Inicio/Invitados/<Nombre>, `row g-4 py-3` con `col-md-4` imagen + `col-md-8` texto, `span.text3-govco`, `h1`, bio en párrafos, botón Volver a Invitados y scripts. El escape HTML se aplica a los campos de texto plano (nombre, alt, categoría, resumen) mientras bio y secciones conservan markup inline verbatim (`<em>`), lo cual es intencional y está documentado en el propio script.

El `index.html` regenerado produce las tres grillas por categoría con `href` que resuelven 1:1 a fichas existentes (36 enlaces, 0 rotos, 0 huérfanos). Las dos fichas sin foto (Jeffrey Amador, Nubia Flórez) caen al placeholder `img/pendiente-foto.svg` con `alt` descriptivo y conservan el comentario PENDIENTE tanto en ficha como en tarjeta.

Accesibilidad correcta en lo revisado: imágenes con `alt` descriptivo, jerarquía h1→h2→h3 (el `h5` de las tarjetas usa `<h3 class="h5">`, nivel semántico correcto con tamaño visual), enlaces con texto visible.

El estilo ESM del generador es coherente con `build-cms.js` (mismos imports de `fs`/`path`, misma estructura de función + log). Es idempotente: el estado commiteado coincide con el disco sin drift pendiente.

<details>
<summary>Issues (1)</summary>

1. **Salto de línea final añadido** — las fichas regeneradas terminan con `\n` donde los originales no lo tenían; normalización benigna y uniforme, no requiere acción.

</details>

<details>
<summary>Details</summary>

## Fidelidad de la fuente de datos

El spot-check de `perfil-pedro-vilela.html` y `perfil-blanca-botero.html` contra el JSON confirma que la bio sale verbatim de los datos, incluido el markup inline `<em>` en los títulos de obras y en las secciones de ponencia. La separación entre `escapeHtml` (campos de texto plano) y render verbatim (bio/secciones) está documentada en el script y es la decisión correcta para permitir cursivas sin reescapar: un cambio en ese límite rompería tanto el escape de nombres como las cursivas de las bios.

## DOCTYPE duplicado corregido en el index

El diff del refactor muestra que el `index.html` original traía un `<!DOCTYPE html>` duplicado en las dos primeras líneas; la regeneración lo elimina. Es la única diferencia de contenido real en el `index.html` entre el estado previo y el regenerado.

## Placeholders de foto pendiente

Las dos fichas sin foto (`jeffrey-amador`, `nubia-florez`) usan `fotoPendiente: true`, lo que hace que el generador emita `img/pendiente-foto.svg` precedido del comentario PENDIENTE, tanto en la ficha (`renderFichaImg`) como en la tarjeta del listado (`renderCardImg`). El `alt` describe el contenido ("Fotografía pendiente de ..."). El SVG existe en `invitados/img/`.

## Restricciones e idempotencia

El diff del commit (`653ec84..016d653`) no incluye ningún archivo bajo `presentacion/` y no borra nada (`--diff-filter=D` vacío). `img/_originales/` y `pendiente-foto.svg` siguen presentes. Los cambios en los 15 `perfil-*.html` del diff son únicamente la adición del salto de línea final; el resto de fichas quedaron byte-idénticas, señal de que el generador reproduce el patrón existente. El estado en disco coincide con lo commiteado (sin drift sin confirmar en la sección invitados), lo que confirma idempotencia. La cadena `cms` se conserva en todas las rutas del script y de los artefactos.

`renderSeccionListado` emite un `row` vacío bien formado si una categoría quedara sin miembros, de modo que una sección vacía no rompería el markup; aquí no se ejercita porque las tres categorías tienen al menos un invitado.

## Evidencia de verificación

`.agents/tasks/verificacion.md` registra la ejecución de `build-invitados.js` y del lint de accesibilidad (`lint-accessibility.js` → 37 archivos, 0 problemas, exit 0), más la comprobación de integridad (0 `img src` faltantes, 0 `href` rotos, 36 fichas). Esa evidencia se acepta sin reejecutar las suites. El spot-check puntual permitido (comparar una ficha generada con la de referencia y verificar resolución de hrefs) confirma la evidencia y no deja dudas abiertas.

</details>

<details>
<summary>Archivos cambiados</summary>

- `scripts/build-invitados.js` — nuevo generador ESM (fichas + index desde JSON).
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/invitados.json` — nueva fuente de datos (36 perfiles).
- `package.json` — nueva clave `build:invitados`.
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/index.html` — regenerado (elimina DOCTYPE duplicado).
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/perfil-*.html` (15 archivos) — salto de línea final añadido por la regeneración.
- `sites/culturas/cms/congreso-investigacion-artistica/invitados/verificacion.md` — evidencia de verificación.

Diff completo: `git diff 653ec84 016d653`.

</details>
