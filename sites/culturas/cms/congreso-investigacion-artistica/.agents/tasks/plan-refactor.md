# Plan de implementación — Refactor data-driven de `invitados/`

Micrositio: Primer Congreso Nacional e Internacional de Investigación Artística
Sección: `e:\gestor\sites\culturas\cms\congreso-investigacion-artistica\invitados`
Trabajo directo sobre el workspace `e:\gestor` (sin worktree).

Objetivo: pasar de ~36 fichas HTML escritas a mano + un `index.html` manual a un enfoque
dirigido por datos: un `invitados.json` (fuente de verdad del contenido) + un generador Node ESM
`scripts/build-invitados.js` que reproduce EXACTAMENTE las mismas fichas y el mismo listado.

---

## 0. Hallazgos de la exploración (base del plan)

### 0.1 Fichas reales detectadas: 36 archivos `perfil-<slug>.html`

Internacionales (6, según sección del index, en orden):
1. `lara-lookabaugh` — Estados Unidos
2. `monique-martinez` — Francia (h1 "Monique Martínez Thomas")
3. `pedro-vilela` — Brasil / Portugal
4. `julieta-infantino` — Argentina
5. `martin-inthamoussu` — Uruguay
6. `pilar-riano-alcala` — Canadá

Nacionales (27, en orden del index):
7. `blanca-botero`
8. `carolina-chacon-bernal`
9. `catalina-del-castillo` (h1 "Catalina Del Castillo Silva")
10. `eider-yangana`
11. `maria-teresa-garcia-schlegel`
12. `ramiro-osorio` (h1 "Ramiro Osorio Fonseca")
13. `ritzy-medina` (h1 "Ritzy Katherine Medina Cuentas")
14. `sandra-camacho-lopez`
15. `alvaro-hernandez`
16. `oscar-hernandez-salgar`
17. `gabriel-velez`
18. `pedro-pablo-gomez`
19. `tania-delgado`
20. `carlos-sepulveda`
21. `juan-alejandro-chindoy`
22. `consejo-ancestral-willka-yaku` — COLECTIVO (categoría nacional, etiqueta "Colectivo · Nacional")
23. `valentina-ruiz`
24. `edgar-puentes`
25. `eliecer-arenas`
26. `camila-camacho`
27. `victor-capador`
28. `paola-wilches`
29. `jaime-ceron-silva`
30. `natalia-castellanos`
31. `carlos-duenas`
32. `jeffrey-amador` — SIN foto (usa `pendiente-foto.svg`)
33. `nubia-florez` — SIN foto (usa `pendiente-foto.svg`)

Moderación (3, en orden del index):
34. `manuel-garcia-conno` (h1 "Manuel Fernando García García")
35. `olga-lucia-olaya` (h1 "Olga Lucía Olaya Parra")
36. `ana-maria-arango`

> Total 36. Las imágenes `img/<slug>.jpg` existen para 34 slugs; `jeffrey-amador` y
> `nubia-florez` NO tienen `.jpg` y apuntan a `img/pendiente-foto.svg`.

### 0.2 Patrón HTML EXACTO de una ficha (`perfil-<slug>.html`)

Estructura literal a reproducir (verificada en `perfil-blanca-botero.html`,
`perfil-lara-lookabaugh.html`, `perfil-manuel-garcia-conno.html`,
`perfil-consejo-ancestral-willka-yaku.html`, `perfil-jeffrey-amador.html`,
`perfil-nubia-florez.html`):

```
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{NOMBRE} - Invitados del Congreso de Investigación Artística</title>
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
        <li class="breadcrumb-item-govco active" aria-current="page">{NOMBRE}</li>
      </ol>
    </nav>

    <div class="row g-4 py-3">
      <div class="col-12 col-md-4">
        {COMENTARIO_PENDIENTE_SI_APLICA}
        <img class="img-fluid rounded" src="img/{FOTO}" alt="{ALT}">
      </div>
      <div class="col-12 col-md-8">
        <span class="text3-govco">{CATEGORIA_FICHA}</span>
        <h1>{NOMBRE}</h1>
        {PARRAFOS_BIO}
      </div>
    </div>

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
```

Detalles del patrón:
- `{NOMBRE}` = nombre que aparece en el `<h1>`, en el `<title>` y en el breadcrumb activo
  (es el mismo string en los tres sitios dentro de una misma ficha).
- Caso foto presente: `{FOTO}` = `<slug>.jpg`, `{ALT}` = `Retrato de <nombreAlt>`
  (para el colectivo el alt real es `Retrato del Consejo Ancestral Willka Yaku`), sin comentario.
- Caso foto pendiente (`jeffrey-amador`, `nubia-florez`): `{FOTO}` = `pendiente-foto.svg`,
  `{ALT}` = `Fotografía pendiente de <nombreAltPendiente>`, y ANTES del `<img>` va el comentario
  `<!-- PENDIENTE: falta fotografía. Solicitar al comité organizador. -->`.
- `{CATEGORIA_FICHA}` = etiqueta larga verbatim del `span.text3-govco`. Varía por género y tipo:
  `Invitada internacional · Estados Unidos`, `Invitado nacional`, `Invitada nacional`,
  `Moderación`, `Colectivo · Nacional`. Se guarda VERBATIM, no se deduce por regla.
- `{PARRAFOS_BIO}` = uno o más `<p>...</p>`. **Algunos párrafos contienen HTML inline**
  (`<em>`), p. ej. `perfil-ana-maria-arango.html`, `perfil-edgar-puentes.html`,
  `perfil-gabriel-velez.html`, `perfil-nubia-florez.html`. El contenido interno de cada `<p>`
  debe conservarse VERBATIM (incluyendo `<em>`), ver decisión de escape en §0.4.
- Indentación: 2 espacios por nivel; los `<p>` de bio van con 8 espacios de sangría
  (`        <p>...`), igual que en los originales.

### 0.3 Patrón HTML EXACTO del listado (`index.html`)

Observaciones (verificadas en `index.html`):
- Tiene una **doble línea `<!DOCTYPE html>`** al inicio (líneas 1 y 2). Es una anomalía del
  original. DECISIÓN: el generador emite UN SOLO `<!DOCTYPE html>` (lo correcto); se anota como
  corrección menor en `verificacion.md` para que el revisor sepa que el diff elimina la línea
  duplicada a propósito. No afecta a SharePoint (solo se copia `#contenido-cms`).
- `<head>` idéntico al de las fichas salvo `<title>`:
  `Invitados - Primer Congreso Nacional e Internacional de Investigación Artística`.
- Comentario de plantilla del listado (más largo, menciona subir fotos a la biblioteca). Se
  reproduce verbatim.
- Dentro de `#contenido-cms > main#contenido-principal`:
  - `<nav class="d-flex flex-wrap gap-2 py-3" aria-label="Secciones del congreso">` con los
    enlaces/estados fijos (Inicio, Presentación, Invitados [aria-current], y 3 `span.disabled`).
    Es markup FIJO; se reproduce verbatim (no se genera por datos).
  - `<nav class="breadcrumb-nav-govco">` con breadcrumb Inicio / Invitados(activo).
  - `<h1>Invitados del Congreso</h1>` + `<p class="text1-govco">...</p>` (intro fija, verbatim).
  - 3 secciones, cada una: `<h2 class="pt-4">Invitados internacionales</h2>` (la 1.ª usa
    `pt-4`; las siguientes `pt-5`: "Invitados nacionales" y "Moderación"), seguida de
    `<div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3"> ... </div>`.
- Cada tarjeta del grid:

```
      <div class="col">
        <a href="perfil-{SLUG}.html" class="tarjeta-govco vertical-tarjeta-govco w-100">
          <div class="container-img-tarjeta-govco">
            {COMENTARIO_PENDIENTE_SI_APLICA}
            <img class="image-tarjeta-govco" src="img/{FOTO}" alt="{ALT}">
          </div>
          <div class="body-tarjeta-govco">
            <span>{CATEGORIA_CARD}</span>
            <h3 class="h5">{NOMBRE_CARD}</h3>
            <p>{RESUMEN}</p>
          </div>
        </a>
      </div>
```

Detalles del listado:
- `{CATEGORIA_CARD}` = etiqueta CORTA del `<span>` de la tarjeta, distinta de la de la ficha:
  internacionales `Internacional · <País>`; nacionales `Nacional`; colectivo `Colectivo · Nacional`;
  moderación `Moderación`. Se guarda VERBATIM aparte de la etiqueta de ficha.
- `{NOMBRE_CARD}` = texto del `<h3 class="h5">`. En varios casos difiere del `{NOMBRE}` del `<h1>`
  de la ficha (p. ej. tarjeta "Monique Martínez Thomas" vs h1 "Monique Martínez Thomas" coincide,
  pero tarjeta "Nubia Flórez" vs alt de ficha "Nubia Leonor Flórez Forero"; tarjeta
  "Ritzy Katherine Medina Cuentas" vs ...). Se guardan ambos nombres verbatim.
- `{RESUMEN}` = texto del `<p>` de la tarjeta (resumen de 1–2 líneas); es DISTINTO de la bio de la
  ficha. Se guarda aparte (campo `resumen`).
- Comentario pendiente en tarjetas: para `jeffrey-amador` el original trae
  `<!-- PENDIENTE: falta fotografía de Jeffrey Amador (solicitar al comité) -->` y para
  `nubia-florez` `<!-- PENDIENTE: falta fotografía de Nubia Flórez (solicitar al comité) -->`.
  OJO: el texto del comentario en la TARJETA difiere del comentario en la FICHA. Se guardan los
  dos textos verbatim (ver §0.5, inconsistencias).
- Scripts finales idénticos a los de la ficha (comentario `<!-- Scripts CDN GOV.CO v5 -->` presente
  en el index; en las fichas NO hay ese comentario). Se reproduce cada uno como en su original.

### 0.4 DECISIÓN de diseño: escape de HTML vs. contenido inline

Problema: el requisito pide "escapar HTML (&, <, >)", pero algunos párrafos de bio contienen
`<em>...</em>` intencional que NO debe escaparse (romperlo corrompería el contenido y además
dejaría `&lt;em&gt;` visible en la página).

DECISIÓN (elegida; alternativas descartadas abajo):
- Separar los campos por su naturaleza:
  - Campos de **texto plano** (se escapan con `escapeHtml`): `nombre`, `nombreCard`, `alt`,
    `categoriaFicha`, `categoriaCard`, `resumen`, `pais`. Estos nunca llevan markup; escaparlos
    protege contra `&`, `<`, `>` sin alterar el render actual (hoy no contienen esos caracteres,
    pero el escape los deja a prueba de futuros datos).
  - Campo **bio**: array de strings donde cada string es el **HTML interno de un `<p>` verbatim**
    (puede incluir `<em>`). Se emite SIN escapar (el generador lo envuelve en `<p>...</p>`).
    Es contenido autor-controlado del propio repo, no entrada de usuario externa.
- `escapeHtml(str)` reemplaza en orden: `&`→`&amp;`, `<`→`&lt;`, `>`→`&gt;`, `"`→`&quot;`.
  Función pura, sin dependencias.

Alternativas descartadas:
- (A) Escapar TODO incluyendo bio: rompe `<em>` → contenido corrupto. Descartada.
- (B) Guardar bio como texto plano y "reintroducir" cursivas por heurística: frágil y pierde
  fidelidad verbatim. Descartada.

Esta decisión mantiene el verbatim exigido y cumple el escape donde sí corresponde (texto plano).

### 0.5 Inconsistencias ficha-vs-index a registrar en `verificacion.md`

Durante la extracción se deben anotar (sin descartarlas en silencio):
1. `index.html` tiene **doble `<!DOCTYPE html>`**; el generador emite uno solo (corrección a propósito).
2. Nombres distintos entre tarjeta (`<h3>`) y ficha (`<h1>`/alt) cuando ocurran
   (p. ej. `nubia-florez`: tarjeta "Nubia Flórez" vs alt ficha "Nubia Leonor Flórez Forero").
   Se guardan `nombre` (h1), `nombreCard` (h3) y `alt` verbatim; el JSON preserva ambos.
3. Texto del **comentario PENDIENTE** distinto entre tarjeta y ficha para `jeffrey-amador` y
   `nubia-florez`. Se guardan `comentarioFicha` y `comentarioCard` (o se derivan de un flag
   `fotoPendiente` + textos verbatim; ver §2).
4. Etiqueta de categoría larga (ficha) vs corta (tarjeta), con variación de género
   (`Invitada`/`Invitado`). Ambas se guardan verbatim.
5. Cualquier otra diferencia de resumen/bio o de orden detectada al extraer los 36 archivos.

### 0.6 Comandos reales del proyecto (de `package.json`, `"type": "module"`)

- Generar: `node scripts/build-invitados.js` (añadir script `build:invitados`).
- Validar accesibilidad: `npm run lint:a11y` → `node scripts/lint-accessibility.js`
  (usa jsdom + axe-core; recorre `sites/` por defecto). Para acotar:
  `node scripts/lint-accessibility.js sites/culturas/cms/congreso-investigacion-artistica/invitados`.
- Estilo del generador: ESM con `import { ... } from 'fs'` y `from 'path'`, funciones puras,
  `console.log` con checkmarks `✓` y resumen final `✅` (ver `scripts/build-cms.js`,
  `scripts/new-content.js`).

### 0.7 Restricciones (recordatorio)

- NO tocar `presentacion/index.html` ni otras páginas del micrositio.
- NO borrar `img/` ni `img/_originales/`.
- Conservar la cadena `cms` en todas las rutas (identificador fijo del sistema).
- "cms" en rutas/comandos/nombres NO se traduce.

---

## Pasos de implementación

- [ ] 1. Extraer el contenido de los 36 `perfil-*.html` + `index.html` a
      `invitados/invitados.json`.
      Leer los 36 archivos `perfil-<slug>.html` y el `index.html` y volcar, por invitado, un objeto
      con todos los campos verbatim. Mantener el ORDEN y la AGRUPACIÓN del index (6 internacionales,
      27 nacionales, 3 moderación). Para cada invitado capturar: `slug`, `categoria`
      (`internacional`|`nacional`|`moderacion`), `pais` (opcional; solo internacionales),
      `foto` (`<slug>.jpg` o `pendiente-foto.svg`), `fotoPendiente` (bool), `nombre` (h1/title/breadcrumb),
      `nombreCard` (h3 de la tarjeta), `alt` (alt de la ficha), `altCard` (alt de la tarjeta, si difiere),
      `categoriaFicha` (span largo verbatim), `categoriaCard` (span corto verbatim),
      `resumen` (p de la tarjeta verbatim), `bio` (array de HTML interno de cada `<p>` de la ficha,
      verbatim, incluyendo `<em>`), y para los pendientes `comentarioFicha` / `comentarioCard` verbatim.
      El colectivo Willka Yaku: `categoria: "nacional"`, etiqueta visible "Colectivo · Nacional".
      Estructura sugerida del JSON: `{ "invitados": [ {..}, .. ] }` o un array plano `[ {..} ]`
      (DECISIÓN: array plano en orden del index; la categoría de cada objeto define su grilla).
      Files: sites/culturas/cms/congreso-investigacion-artistica/invitados/invitados.json
      Verify: `node -e "const d=require('./sites/culturas/cms/congreso-investigacion-artistica/invitados/invitados.json'); console.log(Array.isArray(d)?d.length:d.invitados.length)"`
      debe imprimir `36`. (Nota: con `"type":"module"`, usar `node --input-type=commonjs` o un
      pequeño chequeo ESM equivalente; alternativamente validar con `JSON.parse(readFileSync(...))`
      dentro del propio generador en el paso 3.)

- [ ] 2. Registrar inconsistencias ficha-vs-index en `verificacion.md`.
      Crear `invitados/.agents/tasks/verificacion.md` (o `invitados/verificacion.md` según convención
      del repo; DECISIÓN: `invitados/verificacion.md` junto al contenido para que acompañe la sección)
      listando cada punto de §0.5 encontrado al extraer, con el slug afectado y el valor verbatim de
      ambos lados. Debe quedar explícito que: (a) el generador emite un solo DOCTYPE a propósito;
      (b) se conservan `nombre` vs `nombreCard`; (c) comentarios PENDIENTE distintos por slug.
      Files: sites/culturas/cms/congreso-investigacion-artistica/invitados/verificacion.md
      Verify: lectura manual; el archivo lista al menos los puntos 1–4 de §0.5 con sus slugs.

- [ ] 3. Crear el generador `scripts/build-invitados.js` (ESM, estilo `build-cms.js`).
      Implementar funciones puras: `escapeHtml(str)` (§0.4); `renderBio(bioArray)` →
      concatena `        <p>${p}</p>` (bio verbatim, sin escapar); `renderFicha(inv)` → devuelve el
      HTML completo de la ficha según el patrón de §0.2 (title/breadcrumb/row/img con comentario
      pendiente condicional/span `categoriaFicha`/h1/bio/botón Volver/scripts); `renderCard(inv)` →
      el bloque `<div class="col">...</div>` de §0.3 (comentario pendiente condicional, `categoriaCard`,
      `nombreCard`, `resumen`); `renderIndex(invitados)` → head + navs fijos + intro + las 3 secciones
      (`h2` con `pt-4` la primera y `pt-5` las otras dos) agrupando por `categoria` y respetando el orden
      del array. El script: lee `invitados.json` con `readFileSync`+`JSON.parse`, resuelve rutas con
      `resolve(process.cwd(), 'sites','culturas','cms','congreso-investigacion-artistica','invitados')`
      (conservar `cms`), escribe cada `perfil-<slug>.html` y el `index.html`, imprime cada archivo
      generado con `  ✓ perfil-<slug>.html` y un resumen final `✅ N fichas + index generados`.
      Debe ser IDEMPOTENTE (volver a correrlo produce exactamente los mismos bytes). Escapar en campos
      de texto plano; emitir bio verbatim. NO escribir fuera de la carpeta `invitados/`.
      Files: scripts/build-invitados.js
      Verify: `node scripts/build-invitados.js` corre sin error e imprime 36 fichas + index.

- [ ] 4. Añadir el script `build:invitados` a `package.json`.
      Agregar en `"scripts"`: `"build:invitados": "node scripts/build-invitados.js"` (junto a
      `build:cms`). No alterar otros scripts ni `"type": "module"`.
      Files: package.json
      Verify: `npm run build:invitados` ejecuta el generador y termina con código 0.

- [ ] 5. Regenerar y verificar fidelidad verbatim contra los originales.
      Antes de sobrescribir, respaldar los originales (p. ej. copiar `invitados/*.html` a una carpeta
      temporal fuera de `invitados/`, o apoyarse en git si el repo está versionado) para poder hacer
      diff. Ejecutar `npm run build:invitados` y comparar los HTML regenerados con los originales:
      el contenido dentro de `#contenido-cms` de cada ficha y del index debe ser idéntico salvo las
      correcciones intencionales documentadas en `verificacion.md` (DOCTYPE único). Resolver cualquier
      diferencia no intencional ajustando el JSON (datos) o las plantillas (formato), nunca perdiendo
      texto. Si git está disponible: `git --no-pager diff --stat sites/.../invitados` y revisar diffs.
      Files: (regenera) sites/culturas/cms/congreso-investigacion-artistica/invitados/perfil-*.html, index.html
      Verify: el diff solo muestra cambios intencionales (DOCTYPE); correr el generador dos veces
      seguidas no cambia bytes (idempotencia): segundo `git diff` vacío o `fc`/hash idéntico.

- [ ] 6. Validar accesibilidad con el linter del proyecto.
      Ejecutar `npm run lint:a11y` (o acotado a la carpeta: `node scripts/lint-accessibility.js
      sites/culturas/cms/congreso-investigacion-artistica/invitados`). Toda ficha e index deben
      salir "Sin problemas": imágenes con `alt` (incluidas las pendientes), jerarquía `h1`→`h2`→`h3`,
      enlaces con texto. Si axe reporta violaciones introducidas por el refactor, corregir plantilla
      o datos y re-generar hasta 0 problemas en los archivos de `invitados/`.
      Files: (sin cambios de archivo salvo correcciones necesarias)
      Verify: `npm run lint:a11y` reporta 0 problemas en los archivos de `invitados/`
      (código de salida 0 para esa ruta).

- [ ] 7. Cierre y nota de verificación final.
      Actualizar `verificacion.md` con el resultado: nº de fichas regeneradas (36) + index,
      confirmación de idempotencia, resultado del linter y lista final de inconsistencias conservadas
      en el JSON. Confirmar que NO se tocaron `presentacion/` ni otras páginas, ni `img/` /
      `img/_originales/`, y que la cadena `cms` se conserva en todas las rutas.
      Files: sites/culturas/cms/congreso-investigacion-artistica/invitados/verificacion.md
      Verify: lectura manual del resumen; `git status` (si aplica) muestra solo:
      `invitados.json`, `scripts/build-invitados.js`, `package.json`, los `perfil-*.html`/`index.html`
      regenerados y `verificacion.md`.

---

## Notas para quien implementa

- La fuente de verdad del CONTENIDO hoy son los 36 `perfil-*.html` + `index.html`. El paso 1 debe
  extraerlos con máxima fidelidad (bio verbatim con `<em>` incluido). No inventar ni "mejorar" texto.
- Solo el HTML dentro de `#contenido-cms` se copia a SharePoint; aun así se regenera el documento
  completo (head/scripts) para preview local, replicando el patrón original.
- Mantener el estilo ESM y los mensajes de consola con checkmarks como en `scripts/build-cms.js`.
- No usar dependencias nuevas: `fs` y `path` del core bastan.
