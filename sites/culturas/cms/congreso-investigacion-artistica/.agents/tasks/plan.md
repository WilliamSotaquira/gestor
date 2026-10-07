# Plan de implementación — Montaje de perfiles del Congreso de Investigación Artística

Micrositio Culturas (SharePoint). Raíz de trabajo: `e:\gestor`. Todas las rutas `cms` son identificadores fijos del sistema: NO renombrarlas.

## Contexto verificado durante la exploración

- **Fuente de datos:** `e:\gestor\sites\culturas\cms\congreso-investigacion-artistica\PERFILES PARTICIPANTES.md` (8,4 MB; tabla Markdown `EJE | Participación | Perfil | Fotografía`). No cargar entero: usar `Select-String -Pattern '^\|'` o lectura por secciones.
- **Herramientas disponibles (confirmado en `package.json` y `node_modules`):** `sharp` ^0.35.3, `axe-core` ^4.9.0, `jsdom` ^29.1.1. Scripts: `npm run lint:a11y` → `node scripts/lint-accessibility.js`; `scripts/optimizar-fotos-invitados.js` (recorta 800×533, mozjpeg, respalda en `invitados/img/_originales/`, borra el `.png` origen tras generar `.jpg`). `package.json` tiene `"type": "module"`.
- **Patrón de ficha (leído):** `invitados/perfil-blanca-botero.html`. Estructura: DOCTYPE, head con CDN GOV.CO v5 + Bootstrap 5.3.3, `#contenido-cms` con comentario de plantilla, `<main id="contenido-principal">`, breadcrumb (Inicio `../index.html` / Invitados `index.html` / Nombre), `div.row.g-4.py-3` con `col-12 col-md-4` (imagen `img-fluid rounded`) + `col-12 col-md-8` (`span.text3-govco` categoría, `<h1>`, 1-3 `<p>`), botón `a.btn-govco.outline-btn-govco` "Volver a Invitados", scripts CDN. Una ficha (`perfil-julieta-infantino.html`) añade un `<section class="py-3">` opcional con ponencia; no es obligatorio para las nuevas.
- **Patrón de tarjeta (leído en `invitados/index.html`):** `div.col > a.tarjeta-govco.vertical-tarjeta-govco.w-100 > div.container-img-tarjeta-govco (img.image-tarjeta-govco) + div.body-tarjeta-govco (span categoría, h3.h5 nombre, p resumen 1-2 líneas)`. Secciones existentes: "Invitados internacionales", "Invitados nacionales", "Moderación". Las tarjetas pendientes usan comentario `<!-- PENDIENTE... -->` y `src="img/pendiente-foto.svg"`.
- **Reglas de contenido (steering):** usar componentes GOV.CO v5 exactos; toda imagen con `alt` descriptivo; jerarquía de encabezados; no inventar clases. Solo el contenido dentro de `#contenido-cms` se publica.

### Mapa de filas de la fuente (verificado con detección de firma de bytes)

El prefijo del data URI siempre dice `image/png`, pero los bytes reales son JPEG en casi todas las filas. **Detectar extensión por cabecera de bytes**, no por el prefijo: `FF D8 FF` → `.jpg`; `89 50 4E 47` (base64 empieza con `iVBOR`) → `.png`.

- **Filas NUEVAS con imagen base64 (17):** Gabriel Vélez (JPEG), Pedro Pablo Gómez (JPEG), Tania Delgado (JPEG), Carlos Sepúlveda (JPEG), Juan Alejandro Chindoy (JPEG), Martín Inthamoussu (JPEG, internacional), Consejo Ancestral Willka Yaku (JPEG, colectivo), Valentina Ruiz (JPEG), Edgar Puentes (JPEG), Eliécer Arenas (JPEG), Pilar Riaño Alcalá (JPEG, internacional), Camila Camacho (JPEG), Víctor Capador (JPEG), Paola Wilches (JPEG), Jaime Cerón Silva (JPEG), Natalia Castellanos (JPEG), Carlos Dueñas (JPEG).
- **Filas NUEVAS sin imagen base64 (2) → placeholder:** Jeffrey Amador (bio presente, sin foto), Nubia Flórez (bio presente, celda Fotografía sin base64). Confirmado: ninguna de las dos filas contiene `data:image`.
- **Filas con placeholder que AHORA traen base64 real (3):** Julieta Infantino (bytes JPEG), Ramiro Osorio (bytes **PNG**), Ana María Arango (bytes JPEG). Su base64 reemplaza el placeholder.
- **Filas ya montadas con foto (no sobrescribir salvo que sea placeholder):** Blanca Botero, Carolina Chacón, Catalina del Castillo, Eider Yangana, María Teresa García Schlegel, Ritzy Medina, Sandra Camacho, Álvaro Hernández, Óscar Hernández Salgar, Lara Lookabaugh, Monique Martínez, Pedro Vilela, Manuel Fernando García (bytes PNG), Olga Lucía Olaya.
- **Filas EXCLUIDAS (POR CONFIRMAR, sin bio) — no crear nada:** Relato Expandido 1/2/4, Mesa de Saberes (Victoria Uriana, Jhon Jairo Chota, Omaira Anacona), Wilfran Barrios, Javier Machicado, Adriana González Hassig, Carolina Correa.

### Tabla nombre → slug (usar EXACTAMENTE)

Nuevos: Gabriel Vélez→`gabriel-velez`; Pedro Pablo Gómez→`pedro-pablo-gomez`; Tania Delgado→`tania-delgado`; Carlos Sepúlveda→`carlos-sepulveda`; Juan Alejandro Chindoy→`juan-alejandro-chindoy`; Martín Inthamoussu→`martin-inthamoussu`; Consejo Ancestral Willka Yaku→`consejo-ancestral-willka-yaku`; Valentina Ruiz→`valentina-ruiz`; Edgar Puentes→`edgar-puentes`; Eliécer Arenas→`eliecer-arenas`; Pilar Riaño Alcalá→`pilar-riano-alcala`; Camila Camacho→`camila-camacho`; Víctor Capador→`victor-capador`; Paola Wilches→`paola-wilches`; Nubia Flórez→`nubia-florez`; Jaime Cerón Silva→`jaime-ceron-silva`; Jeffrey Amador→`jeffrey-amador`; Natalia Castellanos→`natalia-castellanos`; Carlos Dueñas→`carlos-duenas`.
Placeholder→foto real: Julieta Infantino→`julieta-infantino`; Ramiro Osorio→`ramiro-osorio`; Ana María Arango→`ana-maria-arango`.

---

## Pasos

- [ ] 1. **Crear el script temporal de extracción** `e:\gestor\scripts\_extraer-fotos-perfiles.mjs`.
      El script (ES module): lee `sites/culturas/cms/congreso-investigacion-artistica/PERFILES PARTICIPANTES.md` como texto; parte en líneas y toma solo las que empiezan con `|`; por fila toma la 2.ª celda (nombre, limpiando `**`, enlaces Markdown y texto pegado) y la 4.ª celda (Fotografía); si la celda de Fotografía contiene `data:image/...;base64,<payload>`, decodifica el payload a Buffer; **detecta la extensión por los primeros bytes del Buffer** (`FF D8 FF` → `.jpg`; `89 50 4E 47` → `.png`; otro → avisar y omitir); mapea el nombre al slug con una tabla embebida (la de arriba); escribe `sites/culturas/cms/congreso-investigacion-artistica/invitados/img/<slug>.<ext>`. Omite filas sin imagen o `POR CONFIRMAR`. Para evitar sobrescribir fotos ya optimizadas: escribir SOLO los slugs nuevos + los tres que pasan de placeholder a foto (`julieta-infantino`, `ramiro-osorio`, `ana-maria-arango`); NO escribir slugs de la lista "ya montadas con foto". Imprime cada archivo escrito con su tamaño en bytes y un resumen final (cuántos escritos, cuántos omitidos y por qué).
      Archivos: `e:\gestor\scripts\_extraer-fotos-perfiles.mjs` (crear).
      Verificar: `node scripts/_extraer-fotos-perfiles.mjs` desde `e:\gestor` corre sin excepción e imprime el listado (paso 2 confirma el resultado en disco).

- [ ] 2. **Ejecutar la extracción.** Correr `node scripts/_extraer-fotos-perfiles.mjs` desde `e:\gestor`.
      Archivos: genera `invitados/img/<slug>.jpg|.png` para los 17 nuevos + 2 (Jeffrey Amador y Nubia Flórez NO generan imagen; quedarán con placeholder) + 3 de placeholder a foto. Esperado: `ramiro-osorio.png` y los demás `.jpg`/`.png` según firma.
      Verificar: `Get-ChildItem sites/culturas/cms/congreso-investigacion-artistica/invitados/img` lista los nuevos slugs; confirmar que NO existen `jeffrey-amador.*` ni `nubia-florez.*` (van con placeholder) y que las 14 fotos previas conservan su tamaño original (no fueron tocadas).

- [ ] 3. **Optimizar las fotos.** Correr `node scripts/optimizar-fotos-invitados.js` desde `e:\gestor`.
      Archivos: convierte todas las imágenes de `invitados/img/` a `.jpg` 800×533 mozjpeg, respalda originales nuevos en `invitados/img/_originales/`, elimina los `.png` origen (p. ej. `ramiro-osorio.png` → `ramiro-osorio.jpg`).
      Verificar: la salida del script muestra cada archivo con su reducción de tamaño; tras correr, `invitados/img/` contiene `<slug>.jpg` para cada perfil nuevo con foto y para los tres rescatados; no quedan `.png` sueltos (salvo en `_originales/`).

- [ ] 4. **Borrar el script temporal** `e:\gestor\scripts\_extraer-fotos-perfiles.mjs`.
      Archivos: eliminar `e:\gestor\scripts\_extraer-fotos-perfiles.mjs`.
      Verificar: `Test-Path scripts/_extraer-fotos-perfiles.mjs` devuelve `False`; `Get-ChildItem scripts` ya no lo lista.

- [ ] 5. **Crear fichas NUEVAS de invitados nacionales con foto** (14 fichas) siguiendo EXACTAMENTE el patrón de `invitados/perfil-blanca-botero.html`.
      Para cada uno: `title='<Nombre> - Invitados del Congreso de Investigación Artística'`; breadcrumb Inicio/Invitados/`<Nombre>`; `img src="img/<slug>.jpg"` `alt="Retrato de <Nombre>"`; `span.text3-govco`="Invitado nacional" o "Invitada nacional" según género; `<h1>` con el nombre; cuerpo = texto de la columna **Perfil** VERBATIM en lo sustancial, repartido en 1-3 `<p>`, limpiando artefactos de copiado (nombre/cargo pegados al inicio, URLs safelinks de Outlook, asteriscos sueltos, dobles espacios). No inventar datos.
      Participantes y slugs: Gabriel Vélez→`gabriel-velez` (Invitado nacional; es presidente de ACOFARTES / charla inaugural, SÍ lleva ficha), Pedro Pablo Gómez→`pedro-pablo-gomez`, Tania Delgado→`tania-delgado` (Invitada), Carlos Sepúlveda→`carlos-sepulveda`, Juan Alejandro Chindoy→`juan-alejandro-chindoy`, Valentina Ruiz→`valentina-ruiz` (Invitada), Edgar Puentes→`edgar-puentes`, Eliécer Arenas→`eliecer-arenas`, Camila Camacho→`camila-camacho` (Invitada), Víctor Capador→`victor-capador`, Paola Wilches→`paola-wilches` (Invitada), Jaime Cerón Silva→`jaime-ceron-silva`, Natalia Castellanos→`natalia-castellanos` (Invitada), Carlos Dueñas→`carlos-duenas`.
      Archivos: crear `invitados/perfil-<slug>.html` para cada uno de los 14.
      Verificar: cada archivo existe y su `img src` apunta a un `invitados/img/<slug>.jpg` existente (confirmar con `Test-Path`); el linter de a11y del paso 11 debe pasar sobre ellos.

- [ ] 6. **Crear ficha del colectivo Consejo Ancestral Willka Yaku** → `invitados/perfil-consejo-ancestral-willka-yaku.html`.
      Reglas específicas: `<h1>Consejo Ancestral Willka Yaku</h1>`; `span.text3-govco`="Colectivo · Nacional"; `alt="Retrato del Consejo Ancestral Willka Yaku"`; `img src="img/consejo-ancestral-willka-yaku.jpg"`; cuerpo verbatim de la columna Perfil (mencionando a Eyder Fabio Calambás y Phuyu Uma Jennifer Ávila como integrantes, sin inventar).
      Archivos: crear `invitados/perfil-consejo-ancestral-willka-yaku.html`.
      Verificar: existe y referencia `img/consejo-ancestral-willka-yaku.jpg` (existente tras el paso 3).

- [ ] 7. **Crear fichas NUEVAS de invitados internacionales** (2 fichas).
      Martín Inthamoussu→`martin-inthamoussu`: `span.text3-govco`="Invitado internacional · Uruguay"; `alt="Retrato de Martín Inthamoussu"`; `img src="img/martin-inthamoussu.jpg"`.
      Pilar Riaño Alcalá→`pilar-riano-alcala`: `span.text3-govco`="Invitada internacional · Canadá"; `alt="Retrato de Pilar Riaño Alcalá"`; `img src="img/pilar-riano-alcala.jpg"`. Al limpiar su Perfil, eliminar las URLs safelinks de Outlook y el cargo pegado ("Professor | Graduate Co-Chair…"), dejando prosa legible.
      Archivos: crear `invitados/perfil-martin-inthamoussu.html` y `invitados/perfil-pilar-riano-alcala.html`.
      Verificar: ambos existen y referencian sus `img/<slug>.jpg` existentes.

- [ ] 8. **Crear fichas NUEVAS sin foto (placeholder)** (2 fichas) replicando el patrón de ficha pendiente (comentario `<!-- PENDIENTE: ... -->` sobre la imagen y `src="img/pendiente-foto.svg"`).
      Jeffrey Amador→`jeffrey-amador`: `span.text3-govco`="Invitado nacional"; `alt="Fotografía pendiente de Jeffrey Amador"`; cuerpo = bio real de la columna Perfil (la fila SÍ trae bio; solo falta la foto).
      Nubia Flórez→`nubia-florez`: `span.text3-govco`="Invitada nacional"; `alt="Fotografía pendiente de Nubia Leonor Flórez Forero"`; cuerpo = bio real de la columna Perfil. (Confirmado en la fuente: su celda Fotografía no trae base64.)
      Archivos: crear `invitados/perfil-jeffrey-amador.html` y `invitados/perfil-nubia-florez.html`.
      Verificar: ambos existen y referencian `img/pendiente-foto.svg` (existente).

- [ ] 9. **Completar las 3 fichas que pasaron de placeholder a foto real.** Los archivos ya existen: `invitados/perfil-julieta-infantino.html`, `invitados/perfil-ramiro-osorio.html`, `invitados/perfil-ana-maria-arango.html`.
      Para cada una: cambiar `img src` a `img/<slug>.jpg`, actualizar `alt` a `"Retrato de <Nombre>"`, quitar el comentario `<!-- PENDIENTE... -->`. Reemplazar el texto provisional por la bio real de la columna Perfil del `.md` (verbatim en lo sustancial, limpiando artefactos). Julieta Infantino: conservar/ajustar su `<section>` de ponencia existente si el `.md` la respalda; mantener `span`="Invitada internacional · Argentina". Ramiro Osorio: `span`="Invitado nacional", `<h1>Ramiro Osorio Fonseca</h1>`. Ana María Arango: `span`="Moderación".
      Archivos: modificar los 3 archivos citados.
      Verificar: ninguno contiene ya `pendiente-foto.svg` ni comentarios `PENDIENTE`; cada `img src` apunta a su `img/<slug>.jpg` existente.

- [ ] 10. **Actualizar el listado** `invitados/index.html` (leerlo completo antes de editar).
      a) En "Invitados internacionales": agregar tarjetas de Martín Inthamoussu (span "Internacional · Uruguay") y Pilar Riaño Alcalá (span "Internacional · Canadá"), con `href="perfil-<slug>.html"`, `img src="img/<slug>.jpg"`, `alt="Retrato de <Nombre>"`, `h3.h5` nombre y `p` resumen de 1-2 líneas redactado a partir de la bio (no la bio entera).
      b) En "Invitados nacionales": agregar tarjetas (span "Nacional") de Gabriel Vélez, Pedro Pablo Gómez, Tania Delgado, Carlos Sepúlveda, Juan Alejandro Chindoy, Consejo Ancestral Willka Yaku (span "Colectivo · Nacional"), Valentina Ruiz, Edgar Puentes, Eliécer Arenas, Camila Camacho, Víctor Capador, Paola Wilches, Jaime Cerón Silva, Natalia Castellanos, Carlos Dueñas — cada una con su `img/<slug>.jpg`. Añadir también Jeffrey Amador y Nubia Flórez como tarjetas PENDIENTE (comentario `<!-- PENDIENTE... -->` + `src="img/pendiente-foto.svg"`).
      c) Actualizar las tarjetas de Julieta Infantino, Ramiro Osorio y Ana María Arango: cambiar `src` a `img/<slug>.jpg`, quitar el comentario PENDIENTE, mejorar el `<p>` resumen.
      Archivos: modificar `invitados/index.html`.
      Verificar: todos los `href` de tarjetas nuevas apuntan a `perfil-*.html` existentes (confirmar con `Test-Path` por cada href); todos los `img src` de tarjetas con foto apuntan a `img/*.jpg` existentes; el HTML sigue bien formado (sin `<div>` sin cerrar).

- [ ] 11. **Validar accesibilidad.** Correr `node scripts/lint-accessibility.js sites/culturas/cms/congreso-investigacion-artistica/invitados` desde `e:\gestor` y corregir toda violación reportada en los archivos nuevos/editados (típicamente `alt`, orden de encabezados o contraste).
      Archivos: según hallazgos del linter (fichas y/o `index.html`).
      Verificar: el linter termina con "Problemas encontrados: 0" para la carpeta `invitados` (exit code 0).

- [ ] 12. **Verificación final de integridad.**
      Archivos: ninguno (solo comprobaciones).
      Verificar: (a) `Test-Path scripts/_extraer-fotos-perfiles.mjs` → `False`; (b) por cada `invitados/perfil-*.html` nuevo o editado, su `img src` existe en `invitados/img/` o es `img/pendiente-foto.svg`; (c) cada `href="perfil-*.html"` de `invitados/index.html` corresponde a un archivo existente; (d) re-correr `node scripts/lint-accessibility.js sites/culturas/cms/congreso-investigacion-artistica/invitados` y confirmar 0 problemas.

## Notas y supuestos

- Jeffrey Amador y Nubia Flórez son perfiles NUEVOS con bio pero **sin** foto en la fuente: se montan con placeholder (verificado: sus filas no contienen `data:image`).
- El prefijo del data URI (`image/png`) no es fiable; la extensión real sale de la firma de bytes. Dos imágenes son PNG real (Manuel García —ya montado— y Ramiro Osorio); el resto JPEG.
- No se tocan las 14 fotos ya optimizadas ni sus fichas, salvo las tres de placeholder→foto.
- Solo el contenido dentro de `#contenido-cms` se publica en SharePoint; mantener los comentarios de plantilla y los scripts CDN como en las fichas existentes.
- La columna Perfil se transcribe verbatim en lo sustancial; limpiar artefactos de copiado pero no reescribir ni inventar credenciales.
