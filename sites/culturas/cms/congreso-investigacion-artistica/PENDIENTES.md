# Micrositio Congreso de Investigación Artística — Pendientes

Estado al 06-10-2026. Secciones construidas: **Portada, Presentación, Invitados, Programación**.

## Arquitectura data-driven (importante para retomar)

Las secciones con muchos registros se generan desde un JSON de datos + un script
Node, y producen UNA SOLA página autocontenida (los datos van embebidos como una
variable JS en el cuerpo; nada de fetch ni archivos externos, porque SharePoint
solo copia el HTML dentro de `#contenido-cms` y no admite muchas hojas sueltas).

Flujo de trabajo:
- Invitados: editar `invitados/invitados.json` → `npm run build:invitados` → sube `invitados/index.html`.
- Programación: editar `programacion/programacion.json` → `npm run build:programacion` → sube `programacion/index.html`.

## Listo y montado

**Portada** `index.html` — menú interno + tarjetas a cada sección.

**Presentación** `presentacion/index.html`
- Texto oficial COMPLETO en español (del documento del comité): presentación (8 párrafos), público destinatario, y los 3 ejes temáticos con sus temas desplegados en acordeón GOV.CO numerado.
- Lista de aliados = 8 (los 7 del convenio + Teatro Mayor Julio Mario Santo Domingo).
- Franja de logos ACTIVA con 6 logos (PNG en `presentacion/img/aliados/`): Fundación Arteria, U. de Antioquia, U. del Atlántico, U. Distrital (recorte horizontal), Javeriana, U. Tecnológica del Chocó.
- Logos pendientes (comentados en el HTML): UNIPAZ (solo hay versión blanca, invisible en fondo claro) y Teatro Mayor (sin archivo).
- Versión en inglés: pendiente (solo español por ahora).

**Invitados** `invitados/index.html` — UNA sola página autocontenida.
- Datos en `invitados/invitados.json` (36 invitados: 6 internacionales, 27 nacionales incl. colectivo Willka Yaku, 3 moderación).
- Generador `scripts/build-invitados.js` (`npm run build:invitados`). Variable embebida `const INVITADOS`.
- Render en navegador: tarjetas GOV.CO + un modal Bootstrap por invitado con foto + bio completa.
- Las antiguas fichas `perfil-*.html` fueron eliminadas (SharePoint no admite tantas hojas).
- Fotos optimizadas en `invitados/img/` (800×533 JPG). Originales en `img/_originales/` (no publicar).

**Programación** `programacion/index.html` — UNA sola página autocontenida.
- Datos en `programacion/programacion.json` (4 días, 3–6 nov 2026, 40 bloques).
- Generador `scripts/build-programacion.js` (`npm run build:programacion`). Variable embebida `const PROGRAMACION`.
- UX: pestañas Bootstrap por día + agenda vertical; actividades en paralelo en dos columnas; inauguración con autoridades agrupadas por entidad; ponentes 1–16 como "Por confirmar".
- Nav del micrositio actualizado: Programación ya enlaza (dejó de estar "en preparación").
- Commit 415fcc3. REVISIÓN semántica quedó PENDIENTE (se paró la jornada antes de que el revisor terminara). Mañana: relanzar revisión o revisar a mano `programacion/index.html` antes de publicar.

## Pendiente — para retomar mañana

### Revisión Programación (primero)
- Falta cerrar la revisión del commit 415fcc3. Verificar que las pestañas por día, los paralelos y la inauguración se ven bien, y que el lint a11y sigue en verde.

### Logos de aliados (Presentación) — faltan 2
- UNIPAZ: conseguir versión en COLOR/oscuro (la que hay, `logos/LOGOBLANCOUNIPAZ-02-02.png`, es blanca e invisible en fondo claro).
- Teatro Mayor Julio Mario Santo Domingo: conseguir el archivo del logo.
- Al llegar: convertir a PNG altura ~128px en `presentacion/img/aliados/` (nombres `unipaz.png`, `teatro-mayor.png`) y descomentar sus dos `<img>` en `presentacion/index.html`.
- Nota: en `logos/` hay un `.ai` de la U. Distrital (versiones vectoriales oficiales) por si se quiere reemplazar el recorte actual; y un `ACOFARTES LOGO.png` que NO es aliado del convenio (asociación organizadora), por eso no está en la franja.

### Versión en inglés de Presentación
- Tenemos el PDF en inglés. Montar la versión EN cuando se decida (bilingüe o página aparte).

### Perfiles de invitados por completar (del correo de Susana)
- Sin foto (ya montados con placeholder, solo falta la imagen): Jeffrey Amador, Nubia Flórez.
- Sin bio ni foto (no montados, esperan material): Mesa de Saberes (Victoria Uriana, Jhon Jairo Chota, Omaira Anacona, y en programación: Irwin Cárdenas, Joaquín Prince, Hugo Jamioy); relatos expandidos 1/2/3; Wilfran Barrios; Javier Machicado; Adriana González Hassig; Carolina Correa; Víctor Manuel Rodríguez; Pilar Riaño (revisar); comité académico.
- Cuando lleguen: agregar como objeto en el JSON correspondiente y correr el build.

### Programación — datos por confirmar
- Nombres/títulos de los 16 ponentes seleccionados (hoy "Por confirmar").
- Reseñas breves de cada intervención (para asociar a la agenda).
- Franjas de cierre del Día 4 (14:00–19:35) sin actividad confirmada.

### Bloqueado (espera a terceros)
- Formulario de inscripción (lo diseña Fundación Arteria).
- Transmisión/streaming (enlaces vía Ángela Pineda).
- Publicaciones y memorias (poscongreso: memorias, Revista Calle 14, libro ACOFARTES).

## Notas de calidad de datos (de `PERFILES PARTICIPANTES.md`)
- Varias filas traían el nombre pegado al cargo; revisar al completar fichas.
- El último relato expandido está rotulado "RELATO EXPANDIDO 4" pero el texto dice "Relato Expandido 3".
- Hay un `verificacion.md` por sección en `.agents/tasks/` con notas de inconsistencias heredadas (nombres h1 vs h3, etiquetas de categoría), por si se quiere homogeneizar.

## Notas técnicas de publicación
- Solo se copia al gestor el contenido dentro de `#contenido-cms`.
- Las fotos de `img/` deben subirse a la biblioteca de imágenes del portal y ajustar las rutas `src` a la ubicación final.
- La cadena "cms" en las rutas es identificador fijo del sistema: no renombrar.
