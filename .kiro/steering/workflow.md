---
inclusion: auto
---

# Flujo de trabajo — Administración de sitios GOV.CO

## Contexto

Este proyecto administra contenidos para dos portales institucionales:

1. **Secretaría Distrital de Movilidad (SDM)** — CMS Drupal, Bootstrap 5, CDN GOV.CO
2. **Ministerio de las Culturas** — CMS SharePoint, Bootstrap, CDN GOV.CO

## Cómo trabaja el usuario

William (administrador web) normalmente proporciona:
- Una **ruta pública** del contenido (URL o path del sitio publicado)
- Una **descripción breve** de lo que necesita (crear nuevo contenido, modificar existente, ajustar diseño)

## Mapeo de rutas públicas a archivos locales

### Movilidad (SDM)
| Ruta pública | Archivo local |
|---|---|
| `/movilidad/cms/<slug>/` | `sites/movilidad/cms/<slug>/index.html` |
| `/movilidad/landings/<slug>/` | `sites/movilidad/landings/<slug>/index.html` |

### Culturas
| Ruta pública | Archivo local |
|---|---|
| `/culturas/cms/<slug>/` | `sites/culturas/cms/<slug>/index.html` |
| `/culturas/landings/<slug>/` | `sites/culturas/landings/<slug>/index.html` |

## Reglas al generar o modificar contenido

### Para contenido CMS (ambos sitios)
- Todo el contenido editable va **dentro de `<div id="contenido-cms">`**
- No modificar la estructura externa (head, scripts CDN, etc.) a menos que se pida explícitamente
- Usar componentes de Bootstrap 5 y CDN GOV.CO
- Cumplir accesibilidad: atributos `alt`, `aria-label`, roles semánticos, contraste
- Para Movilidad: el HTML resultante se pega en un campo de texto en Drupal
- Para Culturas: el HTML resultante se pega en el gestor de SharePoint

### Para landing pages (ambos sitios)
- Son páginas completas con HTML, CSS y JS propios
- Estructura fija: navbar + contenido libre + footer
- Se puede usar cualquier recurso (imágenes, videos, etc.) dentro de la carpeta `assets/`
- Cada landing es una carpeta autocontenida

### Convenciones generales
- Nombres de carpetas en **slug** (minúsculas, guiones): `semana-movilidad`, `festival-musica`
- Si el contenido no existe localmente, **crearlo** usando la plantilla correspondiente
- Si el usuario pega una URL y el contenido ya existe localmente, **editarlo** directamente
- Siempre validar que el HTML sea semántico y accesible
- Comentar el código solo cuando aporte claridad

## Respuesta esperada

Cuando William proporcione una ruta y una descripción:
1. Determinar si es contenido nuevo o existente
2. Identificar sitio (movilidad/culturas) y tipo (cms/landings)
3. Si es nuevo: crear la estructura con `scripts/new-content.js` o directamente
4. Si es existente: leer el archivo, entender el estado actual, aplicar cambios
5. Mostrar brevemente qué se hizo
