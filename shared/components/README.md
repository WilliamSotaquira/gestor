# Componentes GOV.CO v5

Repositorio de componentes HTML reutilizables basados en el sistema de diseno oficial GOV.CO v5 del Gobierno de Colombia.

## CDN de referencia

```html
<!-- Estilos GOV.CO v5 -->
<link href="https://cdn.www.gov.co/layout-govco-v5/all.css" rel="stylesheet">

<!-- Bootstrap 5 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Scripts -->
<script src="https://cdn.www.gov.co/layout-govco-v5/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

## Estructura

```
shared/components/
├── base.html              - Plantilla base con dependencias
├── botones/               - Botones (fill, outline, icon, link)
├── tarjetas/              - Tarjetas (vertical, horizontal, icono, modulo)
├── acordeones/            - Acordeones (simple, numerado)
├── alertas/               - Alertas y notificaciones
├── formularios/           - Inputs, selects, checkbox, radio, switch
├── navegacion/            - Barra superior, cabecera, menu, breadcrumb
├── pie-pagina/            - Footer institucional
├── tablas/                - Tablas con scroll y responsive
├── buscador/              - Buscador basico y predictivo
├── carrusel/              - Carrusel simple y multiple
└── modales/               - Modales (exito, confirmacion, error, advertencia)
```

## Reglas de uso

1. **CDN GOV.CO v5**: Usar exclusivamente clases del framework (`btn-govco`, `govco-bg-*`, etc.)
2. **Variables CSS**: Colores via `--govcolor-*` (cobalt, matterhorn, grey, etc.)
3. **Tipografia**: Nunito Sans (titulos), Verdana (cuerpo). Clases: `text1-govco`, `text2-govco`, `text3-govco`
4. **Iconos**: Usar `govco-svg govco-{nombre}` o `govco-icon govco-{nombre}`
5. **Accesibilidad**: `focus-visible`, atributos `aria-*`, contraste minimo 4.5:1
6. **Bootstrap 5**: Solo para layout (grillas `row > col-*`) y utilities
7. **No sobreescribir** estilos del CDN GOV.CO a menos que sea explicitamente solicitado

## Paleta de colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--govcolor-cobalt` | #0943B5 | Primario / enlaces |
| `--govcolor-havelock-lue` | #4672C8 | Hover primario |
| `--govcolor-tropical-blue` | #B5C7E9 | Fondos claros |
| `--govcolor-matterhorn` | #4C4C4C | Texto principal |
| `--govcolor-grey` | #7E7E7E | Texto secundario |
| `--govcolor-white-smoke` | #F4F4F4 | Fondos neutros |
| `--govcolor-solitude` | #E5ECF8 | Fondos highlight |
| `--govcolor-green` | #158361 | Exito |
| `--govcolor-red` | #A80521 | Error |
| `--govcolor-yellow` | #FDAA29 | Advertencia |
| `--govcolor-golden-brown` | #9D7700 | Acento dorado |
| `--govcolor-tulip` | #E8A045 | Bordes decorativos |

## Como usar

1. Abrir el archivo HTML del componente deseado
2. Copiar el bloque HTML necesario
3. Pegar dentro de `#contenido-cms` (para CMS) o en la landing
4. Ajustar textos, imagenes y enlaces segun necesidad
