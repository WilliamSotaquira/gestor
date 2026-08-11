---
inclusion: fileMatch
fileMatchPattern: "sites/**/*.html"
---

# Reglas para archivos de contenido HTML

## Identificación del contexto

Al abrir/editar un archivo en `sites/`:
- `sites/movilidad/cms/*` → Contenido que se pega en Drupal (campo de texto)
- `sites/movilidad/landings/*` → Landing page completa para servidor de Movilidad
- `sites/culturas/cms/*` → Contenido para plantilla SharePoint (salida .aspx)
- `sites/culturas/landings/*` → Landing page completa para SharePoint (salida .aspx)

## Repositorio de componentes GOV.CO v5

**OBLIGATORIO**: Al crear o editar contenido HTML para sitios .gov.co, usar los componentes documentados en `shared/components/` como referencia principal.

### Componentes disponibles (consultar antes de implementar)
- #[[file:shared/components/botones/index.html]] — Botones (fill, outline, icon, link)
- #[[file:shared/components/tarjetas/index.html]] — Tarjetas (vertical, horizontal, icono, módulo)
- #[[file:shared/components/acordeones/index.html]] — Acordeones (simple, numerado)
- #[[file:shared/components/alertas/index.html]] — Alertas y notificaciones
- #[[file:shared/components/formularios/index.html]] — Formularios (inputs, selects, checkbox, radio, switch)
- #[[file:shared/components/tablas/index.html]] — Tablas (scroll, responsive, expandible)
- #[[file:shared/components/buscador/index.html]] — Buscador (básico, predictivo)
- #[[file:shared/components/carrusel/index.html]] — Carrusel (simple, múltiple)
- #[[file:shared/components/modales/index.html]] — Modales (éxito, confirmación, error, advertencia)
- #[[file:shared/components/navegacion/barra-superior.html]] — Barra superior GOV.CO
- #[[file:shared/components/navegacion/cabecera.html]] — Cabecera institucional
- #[[file:shared/components/navegacion/menu.html]] — Menú de navegación
- #[[file:shared/components/navegacion/breadcrumb.html]] — Migas de pan
- #[[file:shared/components/pie-pagina/index.html]] — Pie de página institucional

### Regla de uso de componentes
1. **Siempre** consultar el componente en `shared/components/` antes de escribir HTML desde cero
2. Usar las clases GOV.CO v5 exactas (`.btn-govco`, `.tarjeta-govco`, `.accordion-govco`, etc.)
3. Respetar la estructura HTML documentada en cada componente
4. No inventar clases propias cuando existe un componente GOV.CO equivalente
5. Usar variables CSS oficiales: `--govcolor-cobalt`, `--govcolor-matterhorn`, etc.

## Reglas técnicas obligatorias

### Accesibilidad (todos los contenidos)
- Todas las imágenes requieren `alt` descriptivo
- Links deben tener texto visible o `aria-label`
- Usar encabezados en orden jerárquico (h1 → h2 → h3)
- Contraste mínimo 4.5:1 para texto normal
- Formularios con `<label>` asociado a cada `<input>`
- Tablas con `<caption>` y `<th scope>`
- Botones con `aria-label` cuando no tienen texto visible
- Estados `focus-visible` respetados (no remover outlines)

### CDN GOV.CO v5
- Usar componentes del CDN GOV.CO v5 cuando estén disponibles
- No sobreescribir estilos del CDN a menos que sea explícitamente solicitado
- CSS: `https://cdn.www.gov.co/layout-govco-v5/all.css`
- JS: `https://cdn.www.gov.co/layout-govco-v5/script.js`
- Tipografía: Nunito Sans (títulos, bold), Verdana (cuerpo, texto regular)
- Clases de texto: `.text1-govco` (20px SemiBold), `.text2-govco` (15px), `.text3-govco` (14px)

### Bootstrap 5
- Sistema de grillas: row > col-md-X
- Clases utilitarias antes que CSS custom
- Componentes semánticos (cards, alerts, badges)
- Versión: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/`

### Paleta de colores oficial
- Primario: `--govcolor-cobalt` (#0943B5)
- Hover: `--govcolor-havelock-lue` (#4672C8)
- Texto: `--govcolor-matterhorn` (#4C4C4C)
- Texto secundario: `--govcolor-grey` (#7E7E7E)
- Fondo: `--govcolor-white-smoke` (#F4F4F4)
- Éxito: `--govcolor-green` (#158361)
- Error: `--govcolor-red` (#A80521)
- Advertencia: `--govcolor-yellow` (#FDAA29)
- Decorativo: `--govcolor-tulip` (#E8A045)

## Al finalizar una edición

- Si el archivo está en `sites/culturas/`: recordar que se necesita `npm run build:aspx`
- Si el contenido es tipo CMS: indicar que el HTML dentro de `#contenido-cms` es lo que se copia al gestor
