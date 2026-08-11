# GOV Sites Workspace

Espacio de trabajo unificado para la administración de contenidos de dos portales institucionales:

- **Secretaría Distrital de Movilidad** (Drupal / Bootstrap 5 / CDN GOV.CO)
- **Ministerio de las Culturas** (SharePoint / Bootstrap / CDN GOV.CO / .aspx)

## Estructura del proyecto

```
├── sites/
│   ├── movilidad/
│   │   ├── cms/          → Contenidos para campo de texto Drupal
│   │   └── landings/     → Landing pages libres (HTML/CSS/JS)
│   └── culturas/
│       ├── cms/          → Contenidos para SharePoint
│       └── landings/     → Landing pages / contenido especial
├── shared/
│   ├── layouts/          → Plantillas base por sitio y tipo
│   └── styles/           → Estilos compartidos y overrides CDN
├── scripts/              → Utilidades (build .aspx, accesibilidad, scaffolding)
├── vite.config.js        → Configuración del servidor de desarrollo
└── package.json
```

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo con hot-reload
npm run dev
```

## Crear nuevo contenido

```bash
# Sintaxis: node scripts/new-content.js <sitio> <tipo> <nombre-slug>

# Ejemplos:
node scripts/new-content.js movilidad cms semana-movilidad
node scripts/new-content.js movilidad landings campana-bici
node scripts/new-content.js culturas cms convocatoria-2026
node scripts/new-content.js culturas landings festival-musica
```

Esto crea la estructura de carpetas con la plantilla correspondiente lista para editar.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor local en http://localhost:3000 |
| `npm run build` | Build de producción |
| `npm run build:aspx` | Genera archivos .aspx para Culturas |
| `npm run lint:a11y` | Validación de accesibilidad con axe-core |
| `npm run new:content` | Crear nuevo contenido desde plantilla |

## Flujo de trabajo (optimizado para chat)

El flujo principal es conversar con el asistente. Solo necesitas:

1. **Pegar la ruta pública** del contenido (o indicar que es nuevo)
2. **Describir brevemente** qué necesitas

El asistente se encarga de:
- Identificar si es Movilidad o Culturas, CMS o Landing
- Crear el contenido si no existe o editarlo si ya existe
- Aplicar las reglas de accesibilidad y CDN GOV.CO
- Generar el .aspx si es para Culturas

### Ejemplos de peticiones válidas

```
"En /movilidad/cms/semana-sostenible necesito agregar una sección 
con tres tarjetas de actividades."

"Crea una nueva landing para culturas: festival de teatro 2026. 
Ruta: /culturas/landings/festival-teatro-2026"

"En la landing de la campaña bici, cambia el color del hero 
a verde y agrega un botón de inscripción."
```

### Mapa de rutas

Las rutas del servidor local corresponden directamente a las rutas del proyecto:

| URL local (dev) | Archivo |
|---|---|
| `http://localhost:3000/sites/movilidad/cms/<slug>/` | `sites/movilidad/cms/<slug>/index.html` |
| `http://localhost:3000/sites/movilidad/landings/<slug>/` | `sites/movilidad/landings/<slug>/index.html` |
| `http://localhost:3000/sites/culturas/cms/<slug>/` | `sites/culturas/cms/<slug>/index.html` |
| `http://localhost:3000/sites/culturas/landings/<slug>/` | `sites/culturas/landings/<slug>/index.html` |

### Después de editar

- **Movilidad CMS:** copiar el HTML de `<div id="contenido-cms">` al campo de Drupal
- **Movilidad Landings:** subir la carpeta completa al servidor
- **Culturas (ambos):** ejecutar `npm run build:aspx` → subir carpeta de `dist/culturas/` a SharePoint

## Tecnologías

- **Vite** — Servidor de desarrollo con hot-reload
- **Bootstrap 5** — Framework CSS
- **CDN GOV.CO** — Componentes normativos gubernamentales
- **axe-core** — Validación automática de accesibilidad
