# Partials - Artes para la Paz

Componentes reutilizables para todas las páginas del tema Artes para la Paz.

## Archivos

| Archivo | Contenido |
|---------|-----------|
| `head.html` | `<!DOCTYPE>` hasta `</head>` — meta tags, CDNs, preconnects |
| `styles-base.html` | `<style>` con variables CSS y clases base del tema |
| `header.html` | Barra GOV.CO + Navbar con logos y menú |
| `footer.html` | Footer institucional + botón "Volver arriba" + scripts Bootstrap/AOS |

## Variables de plantilla (placeholders)

Cada partial usa placeholders `{{VARIABLE}}` que se reemplazan al ensamblar:

| Variable | Dónde | Descripción |
|----------|-------|-------------|
| `{{TITULO}}` | head.html | Título de la página |
| `{{DESCRIPCION}}` | head.html | Meta description / OG description |
| `{{ESTILOS_EXTRA}}` | head.html | CSS adicionales específicos de la página (o vacío) |
| `{{NAV_ITEMS}}` | header.html | Items `<li>` del menú de navegación |
| `{{SCRIPTS_EXTRA}}` | footer.html | JS adicional específico de la página (o vacío) |

## Cómo crear una nueva página

### Flujo de trabajo

```
content.html + page.json → build-artes-page.cjs → index.html → build-aspx.js → index.aspx
```

1. Tú editas solo `content.html` (contenido) y `page.json` (config)
2. `node scripts/build-artes-page.cjs sonidos` ensambla el HTML completo
3. `npm run build:aspx` convierte todo a `.aspx` en `dist/`

### Pasos

1. Crear carpeta `sites/culturas/landings/artes/sonidos/`
2. Crear `content.html` con el contenido del `<main>` (sin head, header ni footer)
3. Crear `page.json` con título, descripción y menú de navegación
4. Ejecutar:
```bash
node scripts/build-artes-page.cjs sonidos
npm run build:aspx
```
5. El archivo final está en `dist/culturas/landings/sonidos/index.aspx`

### Links internos

En el `page.json`, los links entre páginas deben usar extensión `.aspx`:
```json
{ "label": "Inicio", "href": "../index.aspx" }
```

### Opción: compilar todas las subpáginas

```bash
node scripts/build-artes-page.cjs --all
npm run build:aspx
```

## Estructura de una página nueva

```
sites/culturas/landings/artes/
├── partials/           ← Componentes compartidos
│   ├── head.html
│   ├── styles-base.html
│   ├── header.html
│   └── footer.html
├── index.html          ← Página principal (ya armada)
├── sonidos/
│   ├── content.html    ← Solo el contenido de <main>
│   └── page.json       ← Metadata (título, descripción, nav items)
├── danza/
│   ├── content.html
│   └── page.json
└── ...
```

### Ejemplo de `page.json`

```json
{
    "titulo": "Sonidos - Artes para la Paz",
    "descripcion": "Formación musical en establecimientos educativos públicos de Colombia.",
    "navItems": [
        { "label": "Inicio", "href": "../index.aspx" },
        { "label": "Sobre Sonidos", "href": "#sobre" },
        { "label": "Galería", "href": "#galeria" },
        { "label": "Noticias", "href": "#noticias" }
    ],
    "estilosExtra": "",
    "scriptsExtra": ""
}
```

## Notas importantes

- Los paths de assets (`assets/img/`, `assets/css/`) son relativos al directorio de la página.
  Si la página está en una subcarpeta, ajustar a `../assets/img/` etc.
- El `id="contenido-principal"` en el `<main>` debe coincidir con el href del skip-link del header.
- Mantener siempre la barra GOV.CO como primer elemento visible.
