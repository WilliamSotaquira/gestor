# Micrositio Congreso de Investigación Artística — Pendientes

Estado al 22-09-2026. Sección construida: **Invitados**.

## Listo y montado

**Sección Invitados**
- `invitados/index.html` — listado con tarjetas gov.co (internacionales, nacionales, moderación).
- 17 fichas individuales (`invitados/perfil-*.html`).
- 14 fotos normalizadas y optimizadas en `invitados/img/` (800×533 JPG, ~96% más livianas). Originales en `img/_originales/` (no publicar).
- Todas las páginas pasan el linter de accesibilidad (`npm run lint:a11y`).

**Sección Presentación**
- `presentacion/index.html` — datos clave, objetivo, 3 ejes temáticos y aliados institucionales (del documento de arquitectura).
- Pendiente: reemplazar el texto de objetivo por la redacción final del comité si la hay, y sumar la pieza gráfica del congreso cuando se defina su formato.

**Encabezado gráfico**
- `img/banner-congreso.jpg` (1920×198, 29 KB) — banner colocado en portada y Presentación.
- Origen: imagen embebida en el .docx de arquitectura (es una franja apaisada, no el afiche completo).
- Pendiente: si se requiere el afiche completo, exportarlo desde `Imagen-Congreso...final.pdf`. No se pudo rasterizar automáticamente (no hay ghostscript/imagemagick/poppler en el equipo); hacerlo con una herramienta externa o pedir la versión JPG/PNG al comité.

**Portada y navegación**
- `index.html` (raíz del micrositio) — portada con menú interno y tarjetas hacia cada sección.
- Menú de navegación gov.co replicado en portada, Presentación e Invitados, con rutas relativas.
- Secciones marcadas "En preparación" (Convocatoria, Programación, Publicaciones y memorias, Galería y prensa): las tarjetas no enlazan y el menú apunta a rutas que aún no existen (`convocatoria/`, `programacion/`, `resultados/`). Crear esas carpetas/páginas cuando llegue el material.

## Pendiente de material (solicitar al comité — Susana Restrepo)

### Perfiles incompletos
| Invitado | Falta | Nota |
|---|---|---|
| Julieta Infantino (internacional) | Fotografía | Bio y ponencia sí están; ficha usa foto placeholder. |
| Ramiro Osorio Fonseca (nacional) | Bio + foto legibles | Llegaron en PDF comprimido; no se pudieron extraer. Reenviar en Word/JPG o transcribir. |
| Ana María Arango (moderación) | Todo (bio + foto) | La carpeta llegó vacía. |

### Otras secciones del micrositio (carpetas de Drive vacías)
- **Ponentes seleccionados** — dependía del comité académico (18–20 sep). Sin esto no se arma la Programación.
- **Programación** — agenda por día (falta).
- **Textos de presentación** — texto "Sobre el congreso" para la portada.
- **Logos Alianzas del Congreso** — 7 logos (Fundación Arteria, U. de Antioquia, U. del Atlántico, U. Distrital, Javeriana, UT del Chocó, UNIPAZ).
- **Formulario de inscripción participantes** — enlace del Google Forms.
- **Enlace del Streaming en Redes Sociales** — coordinar con Ángela Pineda.
- **RESULTADOS DERIVADOS** — memorias, Revista Calle 14, libro ACOFARTES (poscongreso).

## Requisitos técnicos de piezas gráficas (responder al comité)

El documento de arquitectura dejó vacío el bloque de requisitos. Definir y enviar:
- Formatos: JPG/PNG para fotos; SVG/PNG para logos.
- Fotos de invitados: proporción uniforme (sugerido 364×260 o 3:2), mínimo ~1000 px de ancho, máx. ~500 KB.
- Texto alternativo (alt) descriptivo por cada imagen.
- Respeto del manual de marca institucional y contraste mínimo 4.5:1.

## Notas técnicas para la publicación en el portal

- Solo se copia al gestor el contenido dentro de `#contenido-cms` de cada archivo.
- Las fotos de `invitados/img/` deben subirse a la biblioteca de imágenes del portal y ajustar las rutas `src` a la ubicación final.
- DOI / ISBN / ISSN de las memorias son trámites editoriales externos; el portal solo enlaza los documentos publicados.
