# Recursos para el micrositio "Navidad con Prudencia" (Secretaría de Movilidad)

Base: propuesta C (artística), `propuesta-c-artistica.html`. Las medidas marcadas **(código)** salen del CSS del wireframe. Las marcadas **(recomendación)** no están en el código y se proponen aquí.

## Resumen

El micrositio tiene una sola página con cuatro bloques: portada, recomendaciones por perfil, actividades y acciones. Casi todo lo gráfico del wireframe es provisional. Se necesitan piezas del equipo de diseño, datos reales de las áreas de contenido y cuatro decisiones técnicas antes de maquetar.

Sobre la portada (hero): el fondo sí pasa a diseño, pero **por capas vectoriales** (guirnalda, formas, ilustración) y no como una imagen única. El **color base `#4C531F` se queda en código**.

Hay un riesgo por resolver: la forma verde `#BED000` puede quedar bajo el texto blanco entre 900 y 1300 px de ancho (contraste 1,7:1; el mínimo es 4,5:1).

## Estado general

| Recurso | Estado | Responsable |
|---|---|---|
| Color base del hero (`#4C531F`) y paleta | Definido | Desarrollo |
| Textos fijos: nombre de la campaña, anclas `#inicio`, `#reco`, `#act`, `#acc` | Definido | Desarrollo |
| Números de sección y flecha del botón | Definido (texto en CSS) | Desarrollo |
| Ilustración principal del hero | Por definir | Diseño |
| Guirnalda de luces y formas del hero | Por definir (hay versión provisional) | Diseño |
| 8 imágenes de actividades | Por definir | Diseño |
| 6 iconos de Acciones | Por definir (espacio reservado) | Diseño |
| Ilustraciones del selector de perfiles | Por definir, por confirmar si van | Diseño |
| Logo de la Secretaría | Por definir, por confirmar | Diseño o portal |
| Imagen para redes | Por definir | Diseño |
| Fechas, lugares y horarios de las 8 actividades | Dato de prueba | Áreas de contenido |
| Horarios de transporte público | Dato de prueba | Áreas de contenido |
| Zonas seguras de taxis | Dato de prueba | Áreas de contenido |
| Destino del QR de taxis | Por definir | Áreas de contenido |
| Contenido de los 6 temas de Acciones | Dato de prueba | Áreas de contenido |
| Escritura oficial de "Transmi app" y "TuLlave" | Por definir | Comunicaciones |
| Aprobación de textos (hero, botón, títulos, 5 perfiles) | Por aprobar | Comunicaciones |
| Tipografías | Dato de prueba (fuentes del sistema) | Diseño y desarrollo |
| Plataforma de publicación | Por confirmar | Desarrollo |
| Anclas en una sola página | Propuesto | Desarrollo y solicitante |
| Actualización durante diciembre | Por definir | Desarrollo y áreas |
| Accesibilidad y verificación de la paleta | Parcial | Desarrollo y diseño |

---

# Parte 1. Equipo de diseño: piezas gráficas a entregar

## 1.1 Sección inicial (hero)

El hero es el bloque `<header id="inicio" class="portada">`: alto mínimo 100vh, texto a la izquierda e ilustración a la derecha. Bajo 900 px pasa a una columna y la ilustración queda arriba del texto.

**Qué se entrega y qué no**

- El color base `#4C531F` **no se entrega**: se queda en código.
- El fondo **se entrega por capas vectoriales**, no como una imagen única. El hero cambia de proporción en cada dispositivo. Una imagen única se recortaría y movería el texto sobre zonas de distinto contraste. Con capas, el desarrollo posiciona cada pieza.

### Ilustración principal (camino con luces y estrella navideña)

| Aspecto | Escritorio | Móvil |
|---|---|---|
| Proporción | 1:1 (código) | 1:1 (código) |
| Tamaño en pantalla | 512 px con página de 1280 px o más; máximo 560 px (código). Entre 901 y 1279 px es menor. | Hasta 340 px (código) |
| Tamaño de entrega | **1120×1120 px** (@2x de 560) (recomendación) | **680×680 px** (@2x de 340) (recomendación) |
| Zona segura | Círculo central de 76 % del lado (código). Texto y detalles clave dentro. El 12 % exterior puede recortarse. | Igual: 76 % de 340 px = 258 px |
| Formato | SVG optimizado (recomendado). Si lleva texturas: WebP con transparencia; PNG solo si WebP no está disponible. | Misma pieza escalable. Si es raster, versión propia de 680 px |
| Peso objetivo | SVG ≤ 100 KB; WebP ≤ 150 KB (recomendación) | WebP ≤ 80 KB (recomendación) |
| Fondo de la pieza | Transparente (queda sobre `#4C531F`). Si trae círculo propio, que coincida con el recuadro actual `#EFF2D8`. | Igual |

No lleva texto encima. Los trazos deben distinguirse del oliva `#4C531F` con relación mínima 3:1 (recomendación WCAG). Si la ilustración incluye texto, que no sea esencial o vaya en HTML.

### Guirnalda de luces

| Aspecto | Valor |
|---|---|
| Caja actual (código) | 100 % de ancho y 90 px de alto, pegada al borde superior. Con `preserveAspectRatio="none"` los bulbos se deforman en pantallas anchas. |
| Entrega (recomendación) | SVG de 1920 px de ancho de referencia y 90 a 110 px de alto, que se repita o ancle a los bordes sin deformar los bulbos. Versión móvil: 750×90 px de referencia. |
| Peso | SVG ≤ 20 KB. Si se rasteriza (brillos complejos): WebP @2x ≤ 60 KB. |
| Zona segura | Solo los 90 px superiores. El hero tiene 5 rem (80 px) de relleno superior, así que el título no queda bajo la guirnalda en escritorio. Verificar en móvil. |
| Contraste | Decorativa, sin texto. Los bulbos deben diferenciarse de `#4C531F`. |

### Formas orgánicas (tres formas)

| Aspecto | Valor |
|---|---|
| Tamaño actual (código) | Forma 1: 60vw, máx. 760 px, `#BED000`. Forma 2: 28vw, máx. 340 px, `#818E26`. Forma 3: 14vw, mín. 90 px, `#E2E8AC`. |
| Recomendación | Dejarlas en CSS (cero peso). Si diseño quiere formas más complejas, un SVG por forma, ≤ 10 KB cada una. Diseño debe indicar cuál opción elige. |

### Advertencia de contraste: forma verde bajo el texto (900 a 1300 px)

- La forma 1 (`#BED000`) llega a solapar la columna de texto: unos 14 px en 1280 px de ancho y unos 13 px en 1000 px.
- Texto blanco sobre `#BED000`: 1,7:1 (mínimo 4,5:1). Insuficiente.
- El título en `#BED000` sobre `#4C531F` da 4,8:1, aceptable por ser texto grande.
- En móvil, la forma 2 puede quedar bajo el botón o el texto de apoyo.
- **Pedido a diseño:** entregar el fondo con una zona de texto despejada (mitad izquierda sin formas claras), o acordar con desarrollo mover la forma 1 a la derecha en anchos intermedios.

### Fondo como imagen única (no recomendado)

Solo si diseño insiste. Medidas (recomendación): escritorio 1920×1080 px, WebP ≤ 200 KB; móvil 750×1334 px, WebP ≤ 120 KB. La zona de texto (≈55 % del ancho en escritorio, ≈55 % del alto inferior en móvil) debe quedar libre de elementos claros.

## 1.2 Imágenes de las 8 actividades

| Aspecto | Valor |
|---|---|
| Cantidad | 8: Ciclovía nocturna, Cultura en novenas navideñas, Parche con Prudencia, Moviparque, Brindis por la vida, Curso teórico práctico para motociclistas, Registratón de bicis, Registro bici comercios |
| Proporción y medida | **16:9, 800×450 px** (recomendación) |
| Formato y peso | WebP ≤ 60 KB cada una (recomendación) |
| Fuente | Diseño o fotos aportadas por las áreas |
| Nota de desarrollo | El wireframe usa una caja de 120 px de alto con rótulo "16:9", que no es 16:9 real. Desarrollo la cambia a `aspect-ratio:16/9` con `object-fit:cover`. |

## 1.3 Iconos de Acciones (6)

El wireframe reserva un espacio de 76×76 px (código) marcado como "Ícono por definir". Es un espacio reservado, no un icono final.

| Tema |
|---|
| Pico y placa regional |
| Pico y placa |
| Horarios en Centros de Servicios de Movilidad |
| Horarios de concesiones y otros servicios |
| Personal en vía |
| Operativos de control |

Recomendación: SVG de un solo trazo, 152×152 px o vectorial, mismo estilo en los seis, todos con la misma jerarquía visual.

## 1.4 Ilustraciones del selector de perfiles (por confirmar si van)

El wireframe tiene una escena circular (`clamp(110px,18vw,220px)`) que cambia al elegir el perfil. Esta pieza no se mencionó en las decisiones del usuario. **Por confirmar si va.**

Si va: 5 piezas (Peatón, Ciclista, Motociclista, Conductor, Usuario de transporte público), 440×440 px @2x, SVG preferido (recomendación).

## 1.5 Logo de la Secretaría de Movilidad (por confirmar)

La propuesta C no lo incluye. Probablemente lo aporta la cabecera del portal. Confirmar si diseño lo entrega o si se usa el del portal.

## 1.6 Imagen para redes

No existe en el wireframe. Recomendación: 1200×630 px, WebP o JPG, para vista previa al compartir el enlace.

## 1.7 Piezas opcionales

- Ondas entre secciones (SVG de 60 px de alto, hoy provisional): diseño puede reemplazarlas.
- Iconos del dock de navegación (hoy caracteres de texto): diseño decide si hay iconos reales.

---

# Parte 2. Áreas de contenido: datos pendientes

Todos los valores actuales son de prueba. Cada área completa su fila y devuelve la tabla.

Las actividades del wireframe tienen fechas de diciembre de 2025 y lugares de ejemplo.

| N.º | Dato pendiente | Qué se necesita | Área responsable | Dato real entregado | Fecha de entrega | Aprobado por | Observaciones |
|---|---|---|---|---|---|---|---|
| 1 | Ciclovía nocturna | Fecha, lugar, horario | | | | | |
| 2 | Cultura en novenas navideñas | Fecha, lugar, horario | | | | | |
| 3 | Parche con Prudencia | Fecha, lugar, horario | | | | | |
| 4 | Moviparque | Fecha, lugar, horario | | | | | |
| 5 | Brindis por la vida | Fecha, lugar, horario | | | | | |
| 6 | Curso teórico práctico para motociclistas | Fecha, lugar, horario | | | | | |
| 7 | Registratón de bicis | Fecha, lugar, horario | | | | | |
| 8 | Registro bici comercios | Fecha, lugar, horario | | | | | |
| 9 | Horarios de transporte público | Líneas y horarios reales (hoy: troncal T1, ruta zonal Z25, domingos y festivos) | | | | | |
| 10 | Zonas seguras de taxis | Listado real (hoy hay dos zonas de ejemplo) | | | | | |
| 11 | Destino del QR de taxis | Enlace al que apunta el QR | | | | | |
| 12 | Acciones: Pico y placa regional | Texto y datos | | | | | |
| 13 | Acciones: Pico y placa | Texto y datos | | | | | |
| 14 | Acciones: Horarios en Centros de Servicios de Movilidad | Texto y horarios | | | | | |
| 15 | Acciones: Horarios de concesiones y otros servicios | Texto y horarios | | | | | |
| 16 | Acciones: Personal en vía | Texto y cifras (hoy: 350 agentes, de prueba) | | | | | |
| 17 | Acciones: Operativos de control | Texto, cifras (hoy: 20 puntos, de prueba) y operativos | | | | | |
| 18 | Escritura oficial de "Transmi app" y "TuLlave" | Forma oficial y mayúsculas (hoy: "app Transmi" y "tarjeta TuLlave") | | | | | |
| 19 | Textos de los 5 perfiles de Recomendaciones | Aprobación de las frases redactadas | | | | | |
| 20 | Texto de apoyo del hero, texto del botón y títulos de sección | Aprobación | | | | | |
| 21 | Enlaces desde las tarjetas (inscripción, Pico y placa, Centros de Servicios, app, TuLlave) | Definir si se necesitan y su destino | | | | | |

---

# Parte 3. Desarrollo y decisiones por confirmar

| Tema | Estado | Detalle | Decisión pendiente |
|---|---|---|---|
| Plataforma de publicación | Por confirmar | El repositorio tiene `sites/movilidad/cms/` (páginas del portal) y `sites/movilidad/landings/` (micrositios con carpeta `assets`). Un micrositio de una sola página encaja con el patrón de `landings/` (recomendación). | Confirmar con el equipo cómo se sube al gestor de contenidos de Movilidad (Drupal) y cuál es la URL final. |
| Anclas en una sola página | Propuesto | Las cuatro secciones comparten una página, con anclas `#inicio`, `#reco`, `#act`, `#acc` (código, según el README del wireframe). | Confirmar con el solicitante frente a páginas separadas. |
| Actualización durante diciembre | Por definir | Actividades y acciones pueden cambiar. | Definir quién edita, con qué frecuencia, y si los datos van en un bloque editable único (recomendación). |
| Fuente institucional | Por definir | El wireframe usa fuentes del sistema (Georgia para texto; Trebuchet MS o Segoe UI para títulos), no cargadas por el sitio. | Confirmar si el portal impone una fuente y si hay licencia web. |
| Accesibilidad | Parcial | Código: `aria-label`, `role=tablist`, foco visible y `prefers-reduced-motion`. | Validar contrastes del hero y definir textos alternativos de las ilustraciones finales. |
| Verificación de la paleta | Definido, falta verificar | Paleta alineada con los tokens `--sdm-color-*` de Movilidad (commit `c1112ca`): `#BED000`, `#A5B417`, `#818E26`, `#4C531F`, `#E2E8AC`, `#EFF2D8`, `#1A1A1A`, `#FFFFFF`. | Verificar en producción que coincida con la hoja de estilos oficial. |
| Carga de imágenes | Recomendación | `loading="lazy"` en las tarjetas y precarga solo de la ilustración del hero. | Aplicar al maquetar. |
| Limpieza de wireframe | Definido | Se eliminan la etiqueta "DATOS DE PRUEBA" y el pie "Wireframe C"; se usa el pie del portal. | Ninguna. |
