# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Usuario principal: William Sotaquirá, administrador web de dos portales institucionales. Recibe solicitudes (correos, mensajes, solicitudes ITIL) y las convierte en contenido publicable, ya sea creando páginas nuevas o editando las existentes.

Visitantes finales: ciudadanía que usa el portal de la Secretaría Distrital de Movilidad y el del Ministerio de las Culturas. La accesibilidad es requisito, no preferencia (ver Accesibilidad).

## Product Purpose
Workspace para construir, previsualizar y validar localmente el contenido de dos portales institucionales, y entregarlo en el formato que cada plataforma de publicación acepta. El éxito es publicar sin romper la plantilla del portal y cumpliendo la normativa de accesibilidad.

## Positioning
Un único espacio de trabajo que respeta las reglas distintas de dos entidades (colores, tecnologías, plataformas de publicación) y distingue dos regímenes de diseño dentro de cada una: contenido institucional y landings.

## Operating Context
- Dos entidades: **Secretaría Distrital de Movilidad** (portal sobre Drupal) y **Ministerio de las Culturas** (portal sobre SharePoint).
- Dos tipos de pieza por entidad:
  - **Contenido para el gestor de contenidos** (`sites/<entidad>/cms/<slug>/`): fragmento HTML dentro de `<div id="contenido-cms">`. En Movilidad se pega en un campo de texto de Drupal; en Culturas se genera `.aspx` con `npm run build:cms` y se sube a SharePoint.
  - **Landings** (`sites/<entidad>/landings/<slug>/`): páginas completas y autocontenidas (HTML, CSS, JS, `assets/`), con estructura fija de navbar, contenido libre y footer.
- Rutas públicas se mapean a carpetas locales por slug (minúsculas y guiones).
- Desarrollo local con Vite (`npm run dev`, puerto 3000).

## Capabilities and Constraints
Tres reglas jerárquicas que gobiernan todo el diseño:

1. **Marco normativo común.** Todo diseño se basa en las resoluciones MinTIC 1519 de 2020 y 2893 de 2020, y en las directrices de accesibilidad web de Gobierno Digital (https://gobiernodigital.mintic.gov.co/692/articles-160770_Directrices_Accesibilidad_web.pdf).
2. **Reglas por entidad.** Movilidad y Culturas tienen cada una sus propias reglas de color y de tecnología. No se mezclan. El Anexo 2.1 de la Resolución 2893 (ver Evidence on Hand) las separa por orden. Confirmado por el usuario: Culturas es Orden Nacional y Movilidad (distrital) es Orden Territorial.
   - **Orden Nacional (Culturas):** el color de la entidad solo va en el contenedor de texto del carrusel, la barra inferior del menú, el footer, la iconografía y recursos complementarios usados con moderación. No puede ir en botones, texto, campos de formulario, fondos ni etiquetas, que conservan los estilos del KIT UI de GOV.CO (azul GOV.CO). Logo de hasta 50 px de alto.
   - **Orden Territorial (Movilidad):** la autoridad puede usar un color plano propio también en botones, texto, fondos y etiquetas, con moderación y respetando dimensiones, proporciones y ubicaciones de la guía. Debe derivar una paleta afín con 3 intensidades: (1) texto y botones en hover; (2) call to action, botones activos, enlaces y campos seleccionados; (3) fondo de dropdown en hover, trazo de contenedores informativos, tabs laterales y encabezados de tabla. No puede ir en las barras superior e inferior de GOV.CO ni en campos de formulario. Logo rectangular de hasta 50 px de alto; cuadrado o circular de hasta 80–90 px de ancho.
   - **Ambos órdenes:** jerarquía tipográfica de GOV.CO, títulos de galería como enlace (título máx. 150 caracteres, descripción máx. 200), imágenes 4:3 o 16:9, fecha en noticias y eventos, lenguaje claro, carrusel con indicadores de posición, play/stop y flechas, menú con máximo 7 ítems incluyendo Transparencia y acceso a información pública, Atención y servicios a la ciudadanía, y Participa, y pie con datos de contacto con prefijo +57.
3. **Las landings tienen reglas de diseño propias.** Cada landing de cada entidad define su propio color, tipografía y estilo, y no se somete a las reglas de color y tecnología de su entidad ni al Anexo 2.1. Siguen sujetas a accesibilidad (WCAG 2.1 AA), usabilidad y responsive (confirmado por el usuario).

Restricciones técnicas del contenido institucional (no landings), según los lineamientos del repositorio:
- CDN GOV.CO v5 (`layout-govco-v5`), Bootstrap 5.3.3.
- Componentes de referencia en `shared/components/`; no inventar clases si existe el componente GOV.CO.
- Tipografía: Nunito Sans para títulos, Verdana para cuerpo.
- Paleta con variables `--govcolor-*` (cobalt, matterhorn, white-smoke, entre otras).
- No sobrescribir estilos del CDN salvo petición explícita.
- Accesibilidad verificable con `npm run lint:a11y` (axe-core).
- Idioma: español.

Decisiones abiertas:
- Paleta y tecnologías exactas de cada entidad (el código muestra los tokens GOV.CO genéricos, pero no hay un documento por entidad). Pendiente de que el usuario las indique o se documenten.
- Reglas de diseño propias de las landings: varían por landing, sin norma común.
- Paleta de Movilidad: vigente en Brand Commitments. Falta confirmar si el azul noche `#191C3A` y el verde `#66E026` de `puntos-de-atencion.html` son una excepción de esa pieza o una desviación del manual.
- Paleta de Culturas: el manual define lila, azul cobalto, rosa y gris azulado (ver Brand Commitments). El código de las piezas de `inicio` usa además violetas (`#281E52`, `#6B21A8`, `#4A0E9E`, `#7730C1`) y lima `#C8E600`, que no figuran en el manual. Falta aclarar si son derivaciones, excepciones de una pieza o desviaciones.
- Culturas es Orden Nacional: el Anexo 2.1 asigna a cada entidad un color según el Sistema de Diseño de GOV.CO y solo permite aplicarlo en carrusel, barra inferior del menú, footer e iconografía. No está confirmado si el lila del manual coincide con el color asignado por GOV.CO ni si hay botones o texto en lila que deban pasar al azul GOV.CO.

## Brand Commitments
Identidad institucional de cada entidad y de GOV.CO. En contenido institucional se respeta la del CDN; en landings aplica la identidad definida para cada una.

**Secretaría de Movilidad (manual de identidad, página 127, "Paleta de color", aportada por el usuario):**
- Versión vigente (actualizada; reemplaza la de la página 127, que daba `#BED000` como único color con hex). Paleta principal:
  - `#BED000` verde limón institucional (verde principal, confirmado por el usuario; la captura mostraba `#BACB00`, que se descarta).
  - `#C6D11F` verde lima.
  - `#818E26` verde oliva.
  - `#4C531F` verde oscuro.
  - `#A5B417` verde amarillo.
- Degradado de verdes: `#B9CC00`, `#C9D64E`, `#D6DD80`, `#E2E8AC`, `#EFF2D8`.
- Los demás hex salen de una captura de pantalla de la paleta; conviene confirmar los dígitos contra el archivo fuente del manual.
- El manual anterior asociaba el verde limón con desarrollo, renovación, equilibrio, energía y ambiente.
- El código usa `#BED000` (coincide con el principal), y `#4D541F`, `#8A9A12`, `#A6B517`, muy cercanos a `#4C531F`, `#818E26` y `#A5B417` pero no idénticos; esos tres son candidatos a migrar.
- Logotipo: Alcaldía Mayor de Bogotá D.C., Secretaría de Movilidad y marca Bogotá, los tres en verde limón.
- Contraste calculado a partir de la luminancia, no medido con herramienta. Sobre blanco: `#BED000` ~1,7:1, `#C6D11F` ~1,7:1 y `#A5B417` ~2,3:1 no sirven como texto ni contorno informativo; `#818E26` ~3,6:1 solo cumple para texto grande; `#4C531F` ~8,2:1 sirve para texto y enlaces. Con `#4C531F` encima: sobre `#BED000` ~4,8:1, sobre `#C6D11F` ~4,9:1, sobre `#A5B417` ~3,6:1 (no alcanza). Los tonos claros son fondos; el texto sobre claro usa `#4C531F`.

**Ministerio de las Culturas (Manual de identidad visual, "Paleta de colores de Cultura", aportado por el usuario):**
- Color principal, Lila Cultura: `#4B3C89` (RGB 75, 60, 140; Pantone 7672 C).
- Secundarios: Azul cobalto `#2E3192` (Pantone 2736 C), Rosa creativo `#FF8999` (Pantone 177 C) y Esperanza `#BFD2D8` (Pantone 5527 C).
- Nota del manual: la versión del logo con nombre completo solo se usa con aprobación de la Secretaría para las Comunicaciones y Prensa. Para impresión se recomienda prueba de color a partir del archivo original.
- Contraste calculado a partir de la luminancia, no medido con herramienta: lila sobre blanco, unos 9:1; azul cobalto sobre blanco, unos 10,7:1; ambos sirven como texto. Rosa sobre blanco, unos 2,3:1, no sirve como texto. Lila sobre rosa, unos 4,0:1, no alcanza 4,5:1 para texto normal. Esperanza es claro y admite texto oscuro.

## Evidence on Hand
- `shared/components/`: repositorio de componentes GOV.CO v5.
- `shared/layouts/`: plantillas base por entidad y tipo (incluye variantes de fotodetección).
- `shared/styles/gov-co-overrides.css`: overrides y variables.
- `docs/` y `.tmp-solicitudes/`: documentación y casos de solicitudes reales.
- Anexo 2.1 de la Resolución 2893 de 2020, "Guía de diseño gráfico para sedes electrónicas" (versión nov/2020), en https://www.cundinamarca.gov.co/wcm/connect/fec559a3-9b33-4a73-b2a0-52befd3e33e5/Anexo_2_1_Resolucion_2893_2020_Diseno_Grafico_Sedes.pdf . Leído para este registro. Remite al KIT UI y al CDN de GOV.CO como fuente de los componentes.
- El enlace de Teams compartido antes no se pudo leer (requiere autenticación) y el PDF de directrices de accesibilidad de Gobierno Digital no se ha leído. Su contenido no está verificado.

## Product Principles
- La normativa MinTIC 1519 y 2893 de 2020 y la accesibilidad mandan sobre el gusto estético en el contenido institucional.
- Cada entidad conserva sus propias reglas; nada se unifica por comodidad.
- Las landings son el espacio de libertad de diseño (color, tipografía, estilo) y no heredan reglas del contenido institucional, pero siempre cumplen accesibilidad, usabilidad y responsive.
- El resultado debe ser publicable tal cual en la plataforma de destino.

## Accessibility & Inclusion
Nivel de conformidad requerido: WCAG 2.1 AA (confirmado por el usuario). Cumplimiento de las resoluciones MinTIC 1519 de 2020 y 2893 de 2020 y de las directrices de accesibilidad web de Gobierno Digital. Reglas operativas vigentes: `alt` descriptivo, jerarquía de encabezados, contraste mínimo 4.5:1 en texto normal, `label` en formularios, `caption` y `th scope` en tablas, foco visible siempre, `aria-label` donde no hay texto visible.
