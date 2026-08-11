# Requirements Document

## Introduction

Este documento describe los requerimientos para el sitio multi-página de **Cámaras de Fotodetección Bogotá**, un proyecto informativo institucional de la Secretaría Distrital de Movilidad. El sitio consta de 7 páginas HTML independientes con navegación compartida, diseño visual consistente (institucional, limpio, moderno) y contenido educativo sobre el sistema de fotodetección de la ciudad.

El sitio se aloja dentro del gestor multi-sitio existente en `sites/fotodeteccion/landings/fotodeteccion-landing/` y se construye como un conjunto de archivos HTML estáticos con CSS y JS compartidos. El mapa de ubicaciones es una imagen estática (no interactivo).

## Glossary

- **Sitio_Fotodeteccion**: Conjunto de 7 páginas HTML que conforman el sitio informativo de Cámaras de Fotodetección Bogotá, ubicado en `sites/fotodeteccion/landings/fotodeteccion-landing/`.
- **Manager**: El proyecto multi-sitio basado en Vite que administra y construye páginas HTML para sitios institucionales GOV.CO.
- **Página_Home**: Página principal del sitio (`index.html`) con hero, mensaje institucional, bloque distribuidor y resumen del proceso.
- **Página_Entender**: Página "Entender el sistema" (`entender-el-sistema.html`) con información sobre qué son las cámaras, su propósito, tipos y estadísticas de impacto.
- **Página_Proceso**: Página "Cómo funciona" (`como-funciona.html`) con el proceso de 6 pasos desde captura hasta notificación.
- **Página_Ubicacion**: Página "Ubicación e infracciones" (`ubicacion-e-infracciones.html`) con criterios de instalación, mapa estático y categorías de infracciones.
- **Página_Comparendos**: Página "¿Recibiste un comparendo?" (`comparendos.html`) con flujos de consulta, pago, curso pedagógico e impugnación.
- **Página_Transparencia**: Página "Transparencia" (`transparencia.html`) con normativa, certificados, calibración y documentos técnicos.
- **Página_FAQ**: Página "Preguntas frecuentes" (`preguntas-frecuentes.html`) con accordions agrupados por categoría.
- **Navbar_Principal**: Barra de navegación fija en la parte superior con logo de la Alcaldía, título del sitio y 6 enlaces de navegación.
- **Footer_Navegacion**: Pie de página con enlaces de navegación secuencial (Anterior / Volver al inicio / Siguiente) para flujo entre páginas.
- **Sistema_Diseño**: Conjunto de colores, tipografías, componentes y patrones visuales que mantienen la consistencia visual del sitio.
- **Script_Build_CMS**: Script de Node.js (`scripts/build-cms.js`) que genera versiones limpias de archivos CMS para el gestor Drupal.
- **Script_New_Content**: Script de Node.js (`scripts/new-content.js`) que genera la estructura de un nuevo contenido a partir de plantillas.
- **Configuración_Vite**: Archivo `vite.config.js` que descubre automáticamente las páginas HTML de los sitios para el servidor de desarrollo y build.
- **Archivo_Rutas**: Archivo `sites/routes.json` que mapea contenidos locales a rutas públicas del sitio.
- **CTA_Comparendo**: Botón de llamada a la acción persistente y visible para "Consultar comparendo".
- **Bloque_Distribuidor**: Componente visual en la página Home que presenta 4 caminos de navegación con tarjetas enlazadas a secciones internas.
- **Timeline_Proceso**: Componente visual que muestra los 6 pasos del proceso de fotodetección en formato de línea de tiempo con iconos numerados.
- **Mapa_Estático**: Imagen estática que muestra la ubicación de las cámaras de fotodetección (no interactivo, placeholder permitido).

## Requirements

### Requirement 1: Estructura de archivos del sitio

**User Story:** Como desarrollador del equipo, quiero que el sitio de fotodetección tenga una estructura de archivos multi-página clara y organizada, para facilitar el desarrollo y mantenimiento del contenido.

#### Acceptance Criteria

1. THE Manager SHALL contener la carpeta `sites/fotodeteccion/landings/fotodeteccion-landing/` con los archivos `index.html`, `entender-el-sistema.html`, `como-funciona.html`, `ubicacion-e-infracciones.html`, `comparendos.html`, `transparencia.html`, `preguntas-frecuentes.html`, `styles.css` y `scripts.js`.
2. THE Sitio_Fotodeteccion SHALL contener una subcarpeta `assets/` destinada a imágenes, iconos y recursos estáticos del sitio.
3. THE Sitio_Fotodeteccion SHALL incluir en la carpeta `assets/` los archivos de imagen necesarios (reales o placeholders) referenciados por las páginas, incluyendo al menos: logo de la Alcaldía, imagen hero de cámara y imagen del mapa estático.
4. THE Manager SHALL contener adicionalmente la estructura `sites/fotodeteccion/cms/` con un archivo `.gitkeep` y `sites/fotodeteccion/landings/` con un archivo `.gitkeep`, para mantener la convención del proyecto.

### Requirement 2: Página Home (index.html)

**User Story:** Como ciudadano, quiero acceder a una página principal clara y bien organizada, para entender rápidamente qué es el sistema de fotodetección y navegar hacia la información que necesito.

#### Acceptance Criteria

1. THE Página_Home SHALL contener una sección hero con una imagen de fondo o ilustración representativa de las cámaras de fotodetección, un titular principal (`<h1>`) y un subtítulo descriptivo.
2. THE Página_Home SHALL contener una sección de mensaje institucional que presente 3 estadísticas destacadas (números grandes con descripción) sobre el impacto del sistema de fotodetección.
3. THE Página_Home SHALL contener un Bloque_Distribuidor con 4 tarjetas enlazadas que dirijan a las secciones principales del sitio: Entender el sistema, Cómo funciona, Ubicación e infracciones, y ¿Recibiste un comparendo?
4. THE Página_Home SHALL contener una sección de resumen del proceso que presente de forma condensada los pasos principales del sistema de fotodetección.
5. THE Página_Home SHALL contener una sección con 3 preguntas frecuentes destacadas, cada una enlazada a la Página_FAQ para la respuesta completa.
6. THE Página_Home SHALL incluir el CTA_Comparendo visible en un lugar prominente de la página.

### Requirement 3: Página Entender el Sistema

**User Story:** Como ciudadano, quiero entender qué son las cámaras de fotodetección y cuál es su propósito, para comprender por qué existen y cómo contribuyen a la seguridad vial.

#### Acceptance Criteria

1. THE Página_Entender SHALL contener una sección que explique qué son las cámaras de fotodetección y cuál es su propósito dentro del sistema de movilidad de Bogotá.
2. THE Página_Entender SHALL contener una sección que presente los tipos de sistemas de fotodetección (cámaras de velocidad, de semáforo en rojo, de detección electrónica) mediante tarjetas con imagen e icono representativo.
3. THE Página_Entender SHALL contener una sección de estadísticas de impacto que muestre datos sobre la efectividad del sistema (porcentajes grandes con descripción).
4. THE Página_Entender SHALL incluir breadcrumbs de navegación que muestren la ruta "Inicio > Entender el sistema".
5. THE Página_Entender SHALL incluir el Footer_Navegacion con enlaces a la página anterior y la página siguiente en el flujo del sitio.

### Requirement 4: Página Cómo Funciona

**User Story:** Como ciudadano, quiero conocer el proceso completo desde que una cámara captura una infracción hasta que recibo la notificación, para entender la transparencia del sistema.

#### Acceptance Criteria

1. THE Página_Proceso SHALL contener un Timeline_Proceso que presente 6 pasos secuenciales: Captura, Carga al sistema, Consulta RUNT, Validación, Firma del comparendo y Notificación al ciudadano.
2. THE Timeline_Proceso SHALL presentar cada paso con un número secuencial, un icono representativo, un título corto y una descripción breve del paso.
3. THE Página_Proceso SHALL presentar los pasos del timeline de forma visualmente secuencial (vertical o en zigzag) con conectores visuales entre cada paso.
4. THE Página_Proceso SHALL incluir breadcrumbs de navegación que muestren la ruta "Inicio > Cómo funciona".
5. THE Página_Proceso SHALL incluir el Footer_Navegacion con enlaces a la página anterior y la página siguiente en el flujo del sitio.

### Requirement 5: Página Ubicación e Infracciones

**User Story:** Como ciudadano, quiero saber dónde están instaladas las cámaras y qué tipo de infracciones detectan, para conocer las zonas monitoreadas y las reglas que aplican.

#### Acceptance Criteria

1. THE Página_Ubicacion SHALL contener una sección que explique los criterios de instalación de cámaras de fotodetección (zonas de alta siniestralidad, corredores principales, zonas escolares).
2. THE Página_Ubicacion SHALL contener una sección de consulta de mapa que muestre un Mapa_Estático (imagen) con la ubicación de las cámaras en Bogotá, acompañado de texto explicativo.
3. THE Página_Ubicacion SHALL contener una sección de infracciones organizadas por categorías mediante un componente de tabs o pestañas con 3 categorías: Automáticas (velocidad, semáforo en rojo), Semiautomáticas (giro prohibido, invasión de carril) y Carril preferencial (invasión de carril bus, TransMilenio).
4. WHEN el usuario selecciona una pestaña de categoría de infracción, THE Página_Ubicacion SHALL mostrar la lista de infracciones correspondiente a esa categoría sin recargar la página.
5. THE Página_Ubicacion SHALL incluir breadcrumbs de navegación que muestren la ruta "Inicio > Ubicación e infracciones".
6. THE Página_Ubicacion SHALL incluir el Footer_Navegacion con enlaces a la página anterior y la página siguiente en el flujo del sitio.

### Requirement 6: Página Comparendos

**User Story:** Como ciudadano que recibió un comparendo, quiero saber qué opciones tengo (consultar, pagar, tomar curso, impugnar), para resolver mi situación de manera informada.

#### Acceptance Criteria

1. THE Página_Comparendos SHALL contener una sección para consultar el estado del comparendo con un enlace o instrucciones claras para acceder al sistema de consulta.
2. THE Página_Comparendos SHALL contener una sección que explique las opciones de pago disponibles y los plazos aplicables.
3. THE Página_Comparendos SHALL contener una sección que explique el curso pedagógico como alternativa de descuento, incluyendo requisitos y beneficios.
4. THE Página_Comparendos SHALL contener una sección que explique el proceso de impugnación, incluyendo plazos y requisitos.
5. THE Página_Comparendos SHALL contener una sección que explique por qué se recibe un comparendo de fotodetección, con enlace cruzado a la Página_Ubicacion para detalle de infracciones.
6. THE Página_Comparendos SHALL incluir breadcrumbs de navegación que muestren la ruta "Inicio > ¿Recibiste un comparendo?".
7. THE Página_Comparendos SHALL incluir el Footer_Navegacion con enlaces a la página anterior y la página siguiente en el flujo del sitio.

### Requirement 7: Página Transparencia

**User Story:** Como ciudadano, quiero acceder a la normativa, certificados de calibración y documentos técnicos del sistema, para verificar la legitimidad y precisión de las cámaras.

#### Acceptance Criteria

1. THE Página_Transparencia SHALL contener una sección de normativa con referencias a las leyes, decretos y resoluciones que respaldan el sistema de fotodetección.
2. THE Página_Transparencia SHALL contener una sección de certificados y calibración que explique el proceso de certificación de los equipos y provea enlaces o referencias a los documentos.
3. THE Página_Transparencia SHALL contener una sección de documentos técnicos y estudios de soporte con enlaces o referencias a estudios de impacto y documentación técnica.
4. THE Página_Transparencia SHALL incluir breadcrumbs de navegación que muestren la ruta "Inicio > Transparencia".
5. THE Página_Transparencia SHALL incluir el Footer_Navegacion con enlaces a la página anterior y la página siguiente en el flujo del sitio.

### Requirement 8: Página Preguntas Frecuentes

**User Story:** Como ciudadano, quiero encontrar respuestas rápidas a mis dudas sobre el sistema de fotodetección, agrupadas por tema, para resolver mis inquietudes sin buscar en múltiples páginas.

#### Acceptance Criteria

1. THE Página_FAQ SHALL contener preguntas y respuestas organizadas en accordions (expandibles/colapsables) agrupados por categoría: Velocidad, Precisión del sistema, Motos, Comparendos y Proceso legal.
2. WHEN el usuario hace clic en una pregunta del accordion, THE Página_FAQ SHALL expandir la respuesta correspondiente y colapsar las demás preguntas del mismo grupo.
3. THE Página_FAQ SHALL incluir enlaces cruzados desde las respuestas relevantes hacia la Página_Comparendos y la Página_Transparencia para información complementaria.
4. THE Página_FAQ SHALL incluir breadcrumbs de navegación que muestren la ruta "Inicio > Preguntas frecuentes".
5. THE Página_FAQ SHALL incluir el Footer_Navegacion con enlaces a la página anterior y un enlace a "Volver al inicio".

### Requirement 9: Navegación y estructura UX

**User Story:** Como ciudadano, quiero navegar el sitio de forma intuitiva con un menú claro y navegación secuencial entre páginas, para encontrar la información sin perderme.

#### Acceptance Criteria

1. THE Navbar_Principal SHALL mostrarse en todas las páginas del sitio con el logo de la Alcaldía (o placeholder), el título "CÁMARAS DE FOTODETECCIÓN BOGOTÁ" y exactamente 6 enlaces de navegación: Entender el sistema, Cómo funciona, Ubicación e infracciones, Comparendos, Transparencia, Preguntas frecuentes.
2. THE Navbar_Principal SHALL resaltar visualmente el enlace correspondiente a la página activa del usuario.
3. THE Sitio_Fotodeteccion SHALL incluir un CTA_Comparendo persistente y visible (botón o enlace destacado para "Consultar comparendo") accesible desde todas las páginas.
4. WHILE el usuario se encuentra en cualquier subpágina (no Home), THE Sitio_Fotodeteccion SHALL mostrar breadcrumbs indicando la ruta de navegación desde Inicio.
5. THE Footer_Navegacion SHALL contener en todas las subpáginas enlaces de navegación secuencial con etiquetas "Anterior" (página previa en el flujo), "Volver al inicio" (enlace a index.html) y "Siguiente" (próxima página en el flujo).
6. WHEN el usuario está en la primera subpágina del flujo (Entender el sistema), THE Footer_Navegacion SHALL omitir el enlace "Anterior" y mostrar solo "Volver al inicio" y "Siguiente".
7. WHEN el usuario está en la última subpágina del flujo (Preguntas frecuentes), THE Footer_Navegacion SHALL omitir el enlace "Siguiente" y mostrar solo "Anterior" y "Volver al inicio".

### Requirement 10: Sistema de diseño visual

**User Story:** Como diseñador/desarrollador, quiero que el sitio tenga un sistema de diseño consistente y bien definido, para garantizar coherencia visual en todas las páginas.

#### Acceptance Criteria

1. THE Sistema_Diseño SHALL definir una paleta de colores institucional basada en azul oscuro (aproximadamente #1a3a5c) como color primario, blanco como color de fondo principal y verde como color de acento para estadísticas e iconos.
2. THE Sistema_Diseño SHALL definir una tipografía con titulares grandes en negrita y texto de cuerpo limpio y legible, usando fuentes del sistema o las provistas por el CDN GOV.CO.
3. THE Sistema_Diseño SHALL aplicarse de forma consistente en todas las 7 páginas del sitio a través del archivo `styles.css` compartido.
4. THE Sitio_Fotodeteccion SHALL utilizar Bootstrap 5 como framework base de componentes y sistema de grillas, complementado con los estilos personalizados definidos en `styles.css`.
5. THE Sistema_Diseño SHALL incluir estilos para los componentes reutilizables: tarjetas con imagen, estadísticas destacadas (número grande + descripción), timeline con pasos numerados, accordions para FAQ, tabs para categorías de infracciones y breadcrumbs.

### Requirement 11: Responsividad y accesibilidad

**User Story:** Como ciudadano que accede desde diferentes dispositivos, quiero que el sitio sea usable en móviles, tablets y escritorio, y que sea accesible para personas con discapacidades.

#### Acceptance Criteria

1. THE Sitio_Fotodeteccion SHALL ser responsive, adaptando su layout para dispositivos móviles (< 768px), tablets (768px - 1024px) y escritorio (> 1024px) usando el sistema de grillas de Bootstrap 5.
2. THE Navbar_Principal SHALL colapsar en un menú hamburguesa en dispositivos con ancho menor a 992px, con un botón toggler que expanda la navegación al hacer clic.
3. THE Sitio_Fotodeteccion SHALL incluir atributos `alt` descriptivos en todas las imágenes.
4. THE Sitio_Fotodeteccion SHALL usar una jerarquía de encabezados correcta en cada página (un solo `<h1>` por página, seguido de `<h2>`, `<h3>` en orden descendente sin saltar niveles).
5. THE Sitio_Fotodeteccion SHALL incluir atributos `aria-label` en los elementos interactivos que no tengan texto visible suficiente (botón hamburguesa, iconos clicables, accordions).
6. THE Sitio_Fotodeteccion SHALL usar elementos semánticos HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) para estructurar cada página.
7. THE Sitio_Fotodeteccion SHALL mantener un contraste mínimo de 4.5:1 entre el texto y su fondo en todos los componentes del sitio.

### Requirement 12: Configuración del build de Vite

**User Story:** Como desarrollador del equipo, quiero que Vite descubra automáticamente los contenidos del sitio fotodeteccion, para previsualizar y compilar las páginas sin configuración adicional.

#### Acceptance Criteria

1. THE Configuración_Vite SHALL incluir `"fotodeteccion"` en el array `sites` de la función `discoverPages()`, junto a `"movilidad"` y `"culturas"`.
2. WHEN el servidor de desarrollo se inicia, THE Configuración_Vite SHALL descubrir y registrar automáticamente los archivos HTML dentro de subcarpetas de `sites/fotodeteccion/cms/` y `sites/fotodeteccion/landings/`, así como archivos `.html` sueltos en dichas carpetas.
3. WHEN se ejecuta el build de producción, THE Configuración_Vite SHALL incluir los archivos HTML del sitio fotodeteccion como entradas en `rollupOptions.input` con claves con formato `fotodeteccion-<tipo>-<nombre>`.

### Requirement 13: Integración con el script de build CMS

**User Story:** Como desarrollador del equipo, quiero que el script de build CMS procese los contenidos del sitio fotodeteccion, para generar las versiones limpias listas para copiar al gestor Drupal.

#### Acceptance Criteria

1. THE Script_Build_CMS SHALL incluir `"fotodeteccion"` en el array `sites`, de modo que `npm run build:cms` procese los archivos HTML ubicados en `sites/fotodeteccion/cms/`.
2. WHEN se procesa un archivo CMS de fotodeteccion, THE Script_Build_CMS SHALL generar la salida en `dist/cms/fotodeteccion/` removiendo los patrones de preview local definidos en `PREVIEW_PATTERNS`.
3. IF la carpeta `sites/fotodeteccion/cms/` no contiene archivos HTML, THEN THE Script_Build_CMS SHALL continuar la ejecución sin errores y sin generar archivos de salida para fotodeteccion.

### Requirement 14: Integración con el script de generación de contenido

**User Story:** Como desarrollador del equipo, quiero poder usar el script `new-content` para crear contenidos adicionales en el sitio fotodeteccion, para agilizar la creación de nuevas páginas.

#### Acceptance Criteria

1. WHEN se ejecuta `node scripts/new-content.js fotodeteccion cms <nombre>`, THE Script_New_Content SHALL crear la carpeta `sites/fotodeteccion/cms/<nombre>/` con un archivo `index.html` generado a partir del layout `shared/layouts/fotodeteccion-cms.html`, reemplazando el placeholder `{{TITULO}}` con el nombre formateado en Title Case.
2. WHEN se ejecuta `node scripts/new-content.js fotodeteccion landings <nombre>`, THE Script_New_Content SHALL crear la carpeta `sites/fotodeteccion/landings/<nombre>/` con los archivos `index.html`, `styles.css`, `scripts.js` y la subcarpeta `assets/` con un archivo `.gitkeep`.
3. IF se proporciona un nombre de sitio que no sea "movilidad", "culturas" o "fotodeteccion", THEN THE Script_New_Content SHALL mostrar un mensaje de error que incluya la lista de sitios válidos y terminar con código de salida 1.
4. IF ya existe la carpeta destino al momento de ejecutar el script, THEN THE Script_New_Content SHALL mostrar un mensaje de error y terminar con código de salida 1 sin modificar la carpeta existente.

### Requirement 15: Registro en el archivo de rutas

**User Story:** Como desarrollador del equipo, quiero que el sitio fotodeteccion esté registrado en `routes.json`, para mantener el mapa centralizado de rutas públicas.

#### Acceptance Criteria

1. THE Archivo_Rutas SHALL contener una entrada con la clave `"fotodeteccion"` dentro del objeto `sites`, con las propiedades `baseUrl`, `localPrefix` y `contents`, y el archivo completo SHALL ser JSON válido.
2. THE entrada de fotodeteccion en el Archivo_Rutas SHALL definir `baseUrl` con una URL válida de tipo string (formato `https://...`).
3. THE entrada de fotodeteccion en el Archivo_Rutas SHALL definir `localPrefix` con el valor exacto `"sites/fotodeteccion"`.
4. THE entrada de fotodeteccion en el Archivo_Rutas SHALL incluir en el arreglo `contents` las entradas correspondientes a las 7 páginas del sitio de fotodetección con sus respectivos `slug`, `type`, `localPath`, `publicPath` y `description`.

### Requirement 16: Layouts compartidos para fotodeteccion

**User Story:** Como desarrollador del equipo, quiero que el sitio fotodeteccion tenga sus propios layouts base (CMS y landing), para que el contenido nuevo generado con `new-content` use plantillas consistentes.

#### Acceptance Criteria

1. THE Manager SHALL contener un archivo `shared/layouts/fotodeteccion-cms.html` que sea un documento HTML5 válido con `lang="es"`, que incluya referencias al CDN GOV.CO y Bootstrap 5, un elemento `div#contenido-cms` con marcadores de inicio y fin, y el placeholder `{{TITULO}}` en `<title>` y `<h1>`.
2. THE Manager SHALL contener un archivo `shared/layouts/fotodeteccion-landing.html` que sea un documento HTML5 válido con `lang="es"`, que incluya Bootstrap 5, referencias a `./styles.css` y `./scripts.js`, un `<nav>` con la marca del sitio, un `<main>` vacío y un `<footer>` con identificación de la entidad.
3. THE Layout_Landing de fotodeteccion SHALL incluir en el `<nav>` el logo de la Alcaldía, el título "CÁMARAS DE FOTODETECCIÓN BOGOTÁ" y los 6 enlaces de navegación del sitio, replicando la Navbar_Principal del diseño.

### Requirement 17: Contenido y assets

**User Story:** Como desarrollador del equipo, quiero claridad sobre qué assets son reales y cuáles son placeholders, para organizar correctamente los recursos del sitio.

#### Acceptance Criteria

1. THE Sitio_Fotodeteccion SHALL usar imágenes placeholder (dimensiones correctas con texto indicativo) para aquellos assets que aún no se han proporcionado en versión final.
2. THE Sitio_Fotodeteccion SHALL usar los assets reales proporcionados (logo de la Alcaldía, imágenes institucionales) cuando estén disponibles, referenciándolos desde la carpeta `assets/`.
3. THE Mapa_Estático SHALL ser una imagen (placeholder o real) con un atributo `alt` descriptivo que indique "Mapa de ubicación de cámaras de fotodetección en Bogotá", sin funcionalidad interactiva de mapa.
4. WHEN un asset placeholder necesite ser reemplazado por la versión final, THE Sitio_Fotodeteccion SHALL requerir únicamente el reemplazo del archivo en la carpeta `assets/` sin modificar el código HTML (siempre que se mantenga el mismo nombre de archivo).
