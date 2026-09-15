---
inclusion: always
---

# Terminología de contenido (evitar "CMS")

## Regla general

En **textos de cara al usuario, solicitudes ITIL, explicaciones, informes y comunicaciones**, evita usar la palabra "CMS".

"CMS" es un término técnico y ambiguo: cada portal usa un gestor distinto (Culturas sobre SharePoint, Movilidad sobre Drupal), por lo que no comunica bien a un lector no técnico.

## Reemplazos preferidos

Usa alguno de estos términos genéricos, según el contexto:

- **"gestor de contenidos"** — término general recomendado, no ata a ninguna tecnología.
- **"el portal"** / **"portal institucional"** — cuando el contexto ya deja claro que se habla del sitio publicado.
- **"contenido publicable"** / **"contenido para publicación"** — para referirse a los archivos que luego se suben.
- **"plataforma de publicación"** — cuando se necesita nombrar el sistema donde se sube.

Menciona **SharePoint** (Culturas) o **Drupal** (Movilidad) únicamente cuando sea estrictamente necesario distinguir la entidad o dar una instrucción técnica específica.

## Excepción: identificadores técnicos del proyecto

NO traduzcas ni reemplaces "cms" cuando forme parte de un identificador fijo del sistema, porque ahí es un nombre propio de ruta o comando:

- Rutas: `sites/culturas/cms/`, `sites/movilidad/cms/`
- Comandos: `npm run build:cms`
- Nombres de archivos, layouts o reglas existentes que contengan "cms"

En esos casos se conserva "cms" tal cual.
