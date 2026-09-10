# Prompts para Kiro — Micrositio "Historias sobre la bici"

> Conjunto de instrucciones para construir el micrositio **dentro de este repositorio** (`gestor`),
> respetando el stack real: **HTML + Bootstrap 5 + CDN GOV.CO + JavaScript vanilla**, servido con **Vite**.
>
> **Ubicación del micrositio:** `sites/movilidad/landings/historias-sobre-la-bici/`
>
> **Cómo usar este documento:** pega primero el PROMPT 0 (contexto maestro), luego avanza fase por fase
> (PROMPT 1 → 12). No pegues todo de una vez. Al final hay dos reglas permanentes (No Invención y Wireframe).

---

## Adaptaciones clave al proyecto (léelo antes de empezar)

Este repo **NO usa React/Vue/TypeScript**. Por lo tanto, en todos los prompts:

- **"Componente"** = función de render en JS vanilla que devuelve markup (ej. `renderStoryCard(story)`), **no** un componente de framework.
- **"Tipado"** = anotaciones **JSDoc** (`@typedef`) sobre objetos JS planos. No se instala TypeScript.
- **"Datos"** = módulos JS que exportan arrays/objetos (`data/historias.js`, `data/cifras.js`), consumidos por `scripts.js`. No se duplica markup a mano.
- **"Ejecuta pruebas"** = verificación manual + `npm run lint:a11y` (axe-core, ya existe en el repo). **No** se instala Jest/Vitest ni otro test runner (eso cambiaría el stack).
- **Estilos** = Bootstrap 5 (CDN) + CDN GOV.CO + `styles.css` propio de la landing. Reutilizar tokens y utilidades de `shared/styles/gov-co-overrides.css` cuando aplique (`--gov-co-primary`, `--gov-co-secondary`, `--gov-co-accent`, `.skip-to-content`, `:focus-visible`).
- **Entornos** = al ser HTML estático no hay `NODE_ENV` en runtime. La configuración (endpoint del formulario, URL de política, límite de caracteres, etc.) vive en un `config.js` con banderas explícitas.

### Estructura de archivos objetivo

```
sites/movilidad/landings/historias-sobre-la-bici/
├── index.html          → estructura semántica única (header, hero, cifras, historias, form, footer)
├── styles.css          → tokens + estilos propios sobre Bootstrap / GOV.CO
├── scripts.js          → orquesta render, modal, validación de formulario, analítica
├── config.js           → endpoint, URLs configurables, límites, banderas de entorno
├── data/
│   ├── historias.js     → las 20 Story (con JSDoc @typedef)
│   └── cifras.js        → las 6 StatCard (datos oficiales)
├── services/
│   └── submitStory.js   → abstracción de envío del formulario (+ mock solo en dev)
├── components/
│   ├── storyCard.js     → renderStoryCard(story)
│   ├── statCard.js      → renderStatCard(stat)
│   └── storyModal.js    → lógica del modal accesible
└── assets/             → fotos, placeholders, íconos
```

> Nota: si Vite/Bootstrap requieren ajustar rutas relativas, respeta el patrón de las landings existentes en `sites/movilidad/landings/ejemplo-landing/`.

---

## PROMPT 0 — Instrucciones maestras (contexto del proyecto)

```
# PROYECTO
Micrositio "Historias sobre la bici" — Secretaría Distrital de Movilidad de Bogotá.

# STACK Y UBICACIÓN (OBLIGATORIO)
Este micrositio se construye DENTRO del repositorio existente, como una landing:
  sites/movilidad/landings/historias-sobre-la-bici/

Stack real del repo (NO cambiarlo sin justificación técnica aprobada):
- HTML semántico + Bootstrap 5 (CDN jsdelivr) + CDN GOV.CO.
- JavaScript vanilla (ES modules), servido con Vite (npm run dev).
- Estilos propios en styles.css, reutilizando shared/styles/gov-co-overrides.css.

PROHIBIDO introducir React, Vue, Svelte, TypeScript, Tailwind u otro framework/build nuevo.

Traducción de términos para este stack:
- "Componente"  = función de render en JS que devuelve markup (ej. renderStoryCard(story)).
- "Tipado"      = JSDoc (@typedef), no TypeScript.
- "Datos"       = módulos JS (data/*.js) que exportan arrays/objetos.
- "Pruebas"     = verificación manual + `npm run lint:a11y` (axe-core). No instalar test runners.

# OBJETIVO
Micrositio single-page, responsive, accesible y listo para producción que presenta historias
reales de personas que viven Bogotá en bicicleta y permite que la ciudadanía comparta la suya.
Prioridad: personas, fotografías, relatos y contenido audiovisual.

# FUENTES DE VERDAD (en este orden)
1. Documento funcional "Historias sobre la bici – insumo webmaster".
2. Archivo maestro de historias/personajes.
3. Material gráfico y audiovisual suministrado.
4. Wireframe de referencia.

El wireframe es SOLO referencia de composición, jerarquía y UX.
NO usar como contenido definitivo: nombres, cifras, fotografías ni textos del wireframe.
Los números que aparecen en el wireframe son ilustrativos y NO coinciden con los oficiales.

No inventes información faltante. Cuando falte foto, URL de YouTube, PDF, descripción, enlace o
dato técnico: deja placeholder claramente identificado y un TODO en el código, y usa null en datos.

# ESTRUCTURA DE LA PÁGINA (index.html único)
1. Header / navegación (logo SDM-Bogotá, menú ancla, buscador opcional).
2. Hero / introducción.
3. Bloque de cifras (6).
4. Sección de historias (20).
5. Modal de detalle de historia.
6. Formulario "Cuéntanos tu historia sobre la bici".
7. Footer institucional.

# NAVEGACIÓN
Single-page con anchors: Inicio, Historias, Cifras, Participa.
Scroll suave permitido solo si: respeta prefers-reduced-motion, no daña la accesibilidad y los
anchors funcionan sin JavaScript.

# PRINCIPIOS
Mobile-first · responsive · accesibilidad WCAG 2.1 AA como referencia mínima · funciones de render
reutilizables · separar contenido y presentación · las 20 historias provienen de data/historias.js
(nunca duplicadas a mano en HTML) · sin valores de contenido hardcodeados dentro del markup ·
preparado para agregar más historias después.

# CONFIGURACIÓN (config.js)
Centraliza: endpoint del formulario (null si no existe), URL de política de datos (null si no existe),
límite de caracteres de la historia, y una bandera de entorno para habilitar el mock solo en desarrollo.

# SEGURIDAD
No exponer credenciales/tokens/API keys. No guardar datos del formulario en localStorage/sessionStorage/
cookies. Escapar/sanitizar contenido introducido por el usuario al renderizarlo.

# REGLA DE TRABAJO
Antes de escribir código: analiza, explica arquitectura, identifica lo que falta y los riesgos, propón
estructura de archivos y espera confirmación para cambios estructurales importantes.
Durante: cambios pequeños y explicados; no refactorices áreas ajenas; no elimines código sin justificar.
Después de cada módulo: ejecuta `npm run lint:a11y`, informa qué quedó listo, qué queda pendiente y los TODO reales.
No declares terminada una funcionalidad si depende de un recurso aún no suministrado.
```

---

## PROMPT 1 — Análisis previo (sin implementar)

```
Analiza el proyecto completo antes de escribir código. Ten en cuenta que el micrositio vive en
sites/movilidad/landings/historias-sobre-la-bici/ y usa HTML + Bootstrap 5 + CDN GOV.CO + JS vanilla.

Entrega:
1. Arquitectura propuesta (archivos y responsabilidades), coherente con el patrón de landings del repo.
2. Funciones de render necesarias (storyCard, statCard, storyModal, form).
3. Modelo de datos (Story, Stat) con JSDoc.
4. Estructura de carpetas concreta dentro de la landing.
5. Qué del CDN GOV.CO / Bootstrap se reutiliza (evitar dependencias nuevas).
6. Qué NO hace falta instalar.
7. Riesgos técnicos.
8. Información que todavía falta (fotos, URLs de YouTube, PDFs, endpoint, política de datos, copy oficial).
9. Plan de implementación por etapas (mapea a los PROMPT 2–8).
10. Criterios de aceptación por módulo.

No escribas la implementación todavía. Distingue: contenido confirmado / pendiente / decisiones técnicas /
placeholders temporales. No cambies el stack.
```

---

## PROMPT 2 — Modelo de datos de historias

```
Implementa el modelo de datos en data/historias.js (NO construyas las tarjetas todavía).

Usa JSDoc para tipar:

/**
 * @typedef {Object} Story
 * @property {number} id
 * @property {string} slug
 * @property {string} name
 * @property {string} profile
 * @property {string} shortDescription
 * @property {string|null} image        // null si no hay foto definitiva
 * @property {string} imageAlt
 * @property {string|null} videoUrl      // URL final de YouTube o null
 * @property {string|null} articleUrl    // URL del PDF/publicación o null
 * @property {('pdf'|'web'|null)} articleType
 * @property {boolean} published
 * @property {number} order
 */

Exporta un array `historias` con las 20 personas oficiales (perfiles y descripciones SOLO de la
documentación oficial; no inventar):
1. Mauricio Jiménez  2. Jorge Monroy  3. Luz Marina Ramirez  4. Jose Luis Díaz  5. Bryan Garzón
6. Adrian Chávez Andrade  7. Eliana González  8. Carolina Castro  9. Lorena Nieto  10. Diego Rodríguez
11. Oscar Jesus Murillo  12. Juan David Quitian  13. Julián Sierra  14. Dayana Villalobos
15. Oriana Barreto  16. David Torres  17. Andrés Gómez  18. Diana Piraquive  19. Tomás Villescas
20. Juan Felipe Lamus

Reglas:
- Recursos pendientes -> null (nunca URL ficticia ni "#").
- Añade una función de validación (utils) que, para historias published=true, detecte enlaces inválidos
  y avise en consola durante desarrollo (no romper la página en producción).

Después explícame, en texto: dónde viven los datos, cómo se agrega una historia nueva, cómo se cambia
el orden (campo order) y cómo ocultar temporalmente una historia (published=false).
Ejecuta `npm run lint:a11y` no aplica aquí; en su lugar verifica que el módulo importa sin errores.
```

---

## PROMPT 3 — Layout general

```
Construye el layout general en index.html + styles.css. El wireframe es solo referencia estructural.

Secciones (semánticas, con landmarks y anchors): header/nav, hero (#inicio), cifras (#cifras),
historias (#historias), participa (#participa), footer.

Requisitos:
- Mobile-first y responsive con la grilla de Bootstrap 5.
- Reutiliza shared/styles/gov-co-overrides.css (tokens --gov-co-*, .skip-to-content, :focus-visible).
- Añade el enlace "Saltar al contenido" (.skip-to-content) al inicio del body.
- max-width consistente, sistema de espaciado reutilizable, variables CSS para tipografía/espaciado/colores.
- HTML semántico; una sola jerarquía correcta de headings.
- Anchors que funcionen sin JavaScript.

Evita: posiciones absolutas innecesarias, alturas fijas de sección, valores mágicos repetidos, CSS
duplicado y librerías UI nuevas.

Aún NO implementes el modal completo ni la conexión real del formulario.

Verifica en 320, 375, 768, 1024 y 1440 px e informa problemas. Ejecuta `npm run lint:a11y`.
```

---

## PROMPT 4 — Hero

```
Implementa el Hero.

IMPORTANTE (corrección respecto al wireframe):
- eyebrow (texto pequeño superior): "HISTORIAS SOBRE LA BICI"
- título principal (h1): "Más personas, mejores ciudades"
- copy introductorio: usar el texto oficial del documento (no el del wireframe).
- CTA: "Conoce las historias" -> ancla a #historias.

Contenedor preparado para fotografía o pieza audiovisual de ciclistas reales, configurable desde datos/
config. Si no hay asset definitivo, usar placeholder de desarrollo claramente identificado (no una foto
ficticia de producción).

El Hero debe: ser responsive, mantener legibilidad y contraste sobre la imagen, funcionar sin JavaScript
y respetar prefers-reduced-motion. Ejecuta `npm run lint:a11y`.
```

---

## PROMPT 5 — Cifras oficiales

```
Implementa las cifras en data/cifras.js + components/statCard.js.

ADVERTENCIA ANTI-INVENCIÓN: los números del wireframe son ILUSTRATIVOS y NO coinciden con los oficiales.
Usa EXCLUSIVAMENTE estas cifras del documento (ignora las del wireframe):

| Wireframe (NO usar) | Oficial (USAR)          | Etiqueta / apoyo                                            |
|---------------------|-------------------------|-------------------------------------------------------------|
| 880.000             | 886.000+                | Viajes diarios en bici — 7,3 % de los desplazamientos       |
| 661 km              | 683 km                  | Cicloinfraestructura permanente — 87 km nuevos hacia 2027   |
| 867.245             | 550.000+                | Bicicletas registradas en Registro Bici Bogotá              |
| 20.978              | 85.000+                 | Cicloparqueaderos (bicis y micromovilidad)                  |
| 115.000             | 6.660                   | Estudiantes de Al Colegio en Bici y BiciParceros — 416.667 viajes acompañados |
| 7.722               | 2.400+                  | Bicicletas hurtadas recuperadas gracias al Registro Bici    |

Fuente visible: "Secretaría Distrital de Movilidad de Bogotá, junio de 2026."

Los datos van en data/cifras.js (JSDoc @typedef Stat). renderStatCard es reutilizable.
Íconos decorativos -> aria-hidden="true". No animar números aún (prioriza exactitud, accesibilidad,
responsive y performance). Ejecuta `npm run lint:a11y`.

NOTA: verifica que el sub-dato "416.667 viajes acompañados" provenga del documento oficial; si no está
confirmado, márcalo como TODO y no lo muestres.
```

---

## PROMPT 6 — Grilla de historias

```
Implementa la sección de historias + components/storyCard.js, consumiendo data/historias.js
(render con .map, sin duplicar markup).

StoryCard muestra: image, name, profile, shortDescription y CTA "Conoce su historia".

Responsive con Bootstrap grid:
- desktop: 4 tarjetas por fila (puede adaptarse según ancho)
- tablet: 2
- mobile: 1
Relación de aspecto consistente en las fotos; sin scroll horizontal.

image=null -> placeholder neutro de desarrollo (que NO parezca foto real de la persona).
Cada botón debe identificar qué historia abre (data-attribute con id/slug).

ALCANCE (decisión doc vs wireframe):
El wireframe muestra un filtro "Filtrar por perfil" y un botón "Ver más historias". El documento oficial
NO los exige. Por defecto NO los implementes en el MVP: muestra las 20 historias completas.
Déjalos anotados como mejora post-MVP (TODO). Si el equipo confirma que entran al alcance, se activan luego.

Ejecuta `npm run lint:a11y`.
```

> **Pendiente de tu decisión:** si finalmente quieres el filtro y "Ver más" en el MVP, cambia el bloque
> ALCANCE de este prompt para pedir su implementación. Hoy quedan fuera por criterio doc-sobre-wireframe.

---

## PROMPT 7 — Modal de historia

```
Implementa components/storyModal.js. Al pulsar "Conoce su historia" se abre el detalle sin cambiar de página.

Muestra: nombre, perfil, descripción completa, recurso multimedia cuando exista, botón "Ver el video en
YouTube" y botón "Leer la historia (PDF)".

Reglas de datos:
- videoUrl=null   -> no mostrar botón de video.
- articleUrl=null -> no mostrar botón de artículo.
- articleType define el texto del botón (PDF vs publicación web).
- Nunca href="#" ni URLs ficticias.

Accesibilidad obligatoria: role="dialog", aria-modal="true", aria-labelledby, focus trap, ESC cierra,
botón cerrar visible ("X"), retorno de foco al trigger al cerrar, scroll del fondo bloqueado.
Al abrir, el foco pasa al modal. Video embebido de YouTube SIN autoplay (ver también PROMPT 10 sobre
carga diferida del iframe).

Puedes usar el componente modal de Bootstrap 5 como base, pero verifica que cumpla el focus trap y el
retorno de foco (ajusta con JS si hace falta).

Verificación manual (documenta el resultado): abrir, cerrar, ESC, botón cerrar, cambiar entre historias,
comportamiento con URLs faltantes. Ejecuta `npm run lint:a11y`.
```

---

## PROMPT 8 — Formulario de participación

```
Implementa la sección "Participa" (#participa) con el formulario "Cuéntanos tu historia sobre la bici".

Campos:
- Nombre completo *      (requerido)
- Correo electrónico *   (requerido, formato válido)
- Teléfono / WhatsApp *  (requerido)
- Localidad de Bogotá    (opcional, select)
- Cuéntanos tu historia *(textarea, máximo configurable en config.js, por defecto 500) con contador "0 / 500"
- Autorización de tratamiento de datos * (checkbox requerido)

Texto del checkbox: "Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y a la
Política de Tratamiento de Datos Personales de la Secretaría Distrital de Movilidad."
Enlace configurable a la política (config.js). Si la URL no fue suministrada -> null + TODO, no inventarla.

Validación client-side accesible: errores visibles, asociados al campo (aria-describedby) y anunciables por
lector de pantalla. Nunca usar placeholder como sustituto de label.

Servicio services/submitStory.js: función submitStory(formData). Lee el endpoint desde config.js.
Si el endpoint es null -> usar mock SOLO en modo desarrollo (bandera de config). NO simular éxito en producción.
Estados: idle, submitting, success, error. Durante submitting, deshabilitar el botón (evitar doble envío).

Éxito: "¡Gracias por compartir tu historia! Nuestro equipo la leerá y se pondrá en contacto contigo pronto."
Error: mensaje comprensible que NO borre los datos ingresados.

NO guardar datos personales en localStorage/sessionStorage/cookies. Escapar el contenido del usuario.
Verificación manual + `npm run lint:a11y`.
```

---

## PROMPT 9 — Auditoría de accesibilidad

```
Audita la accesibilidad de todo lo construido. No hagas cambios visuales arbitrarios.

Ejecuta primero `npm run lint:a11y` (axe-core, ya está en el repo) y usa sus resultados como base.
Revisa además manualmente: headings, landmarks, labels reales, alt text, navegación por teclado, foco
visible (:focus-visible), contraste, modal (focus trap/ESC/retorno de foco), errores del formulario,
botones y enlaces, targets táctiles, zoom 200 %, prefers-reduced-motion, contenido sin JavaScript,
orden lógico de tabulación y skip-to-content.

Clasifica por severidad: BLOCKER / HIGH / MEDIUM / LOW.
Corrige BLOCKER y HIGH. Antes de tocar MEDIUM o LOW, explícame el cambio propuesto.
```

---

## PROMPT 10 — Performance

```
Audita performance (sin instalar librerías grandes para cosas simples).

Revisa: peso de la página, imágenes (loading="lazy", dimensiones declaradas, formatos, object-fit),
fuentes, JS innecesario, dependencias del CDN, CLS, LCP, render de las 20 tarjetas, carga del video y modal.

Regla clave del video: el iframe de YouTube NO debe cargarse en el arranque. Cárgalo solo cuando el
usuario abre la historia / pulsa reproducir (facade/lite-embed con imagen + botón). Evita autoplay.

Entrega por hallazgo: problema · impacto · solución · archivo afectado. Aplica solo optimizaciones seguras.
Vuelve a correr `npm run lint:a11y` para confirmar que nada de accesibilidad se rompió.
```

---

## PROMPT 11 — QA funcional

```
Realiza QA integral. No corrijas contenido editorial por inferencia (si algo falta, se reporta, no se inventa).

Verifica:
- HEADER: navegación, anchors, comportamiento móvil, skip-to-content.
- HERO: eyebrow "HISTORIAS SOBRE LA BICI", h1 "Más personas, mejores ciudades", copy oficial, CTA a #historias, responsive.
- CIFRAS: las 6 son exactamente las oficiales (886.000+, 683 km, 550.000+, 85.000+, 6.660, 2.400+), fuente visible.
- HISTORIAS: 20 registros, nombres correctos, orden por `order`, perfiles, tarjetas, placeholders cuando image=null.
- MODAL: abre la historia correcta, cierra, ESC, teclado, video (carga diferida), PDF, manejo de URLs faltantes.
- FORMULARIO: requeridos, email, teléfono, límite/contador, autorización, envío, error, éxito, doble submit.
- RESPONSIVE: 320, 375, 768, 1024, 1440 px.

Devuelve una tabla: ID · Componente · Prueba · Resultado · Severidad · Archivo · Corrección propuesta.
Ejecuta `npm run lint:a11y` como parte del QA.
```

---

## PROMPT 12 — Preparación para producción

```
Revisión PRE-PRODUCCIÓN. No despliegues.

Clasifica cada punto: READY / BLOCKED / PENDING CONTENT / PENDING TECHNICAL DECISION.

Revisa: URLs finales, assets/fotos definitivos, alt texts, videos de YouTube, PDFs, cifras, formulario,
endpoint real, política de datos, SEO (title, meta description, canonical configurable, OpenGraph básico),
analítica (puntos de evento: story_open, story_video_click, story_article_click, form_start, form_submit,
form_success, form_error — sin conectar plataforma hasta confirmarla), accesibilidad, manejo de errores,
config.js, `npm run build` (Vite), errores de consola y enlaces rotos.

Genera un checklist final de publicación.

NO marques listo para producción si: hay enlaces ficticios, faltan recursos obligatorios, el formulario
usa mock, hay errores de consola importantes o falta configuración necesaria en config.js.
```

---

## REGLA PERMANENTE — No Invención

```
En este proyecto existe contenido editorial, institucional y estadístico.
Nunca completes automáticamente información faltante. No inventes: nombres, cifras, URLs, fotografías,
biografías, testimonios, videos, PDFs, datos de contacto, endpoints, políticas, logos ni créditos.
Cuando no exista información aprobada, usa: null · placeholder · TODO.
Una interfaz que muestra claramente un pendiente es preferible a una aparentemente completa con datos inventados.
```

## REGLA PERMANENTE — Identidad institucional (Movilidad ≠ Culturas)

```
Movilidad y Culturas son entidades DISTINTAS y NO comparten identidad visual ni marca institucional.

- Movilidad = Secretaría Distrital de Movilidad de Bogotá => identidad DISTRITAL (marca "Bogotá").
  Logo tipo "logo_bogota_*", assets de www.movilidadbogota.gov.co.
  NO usar el pie/cabecera GOV.CO nacional con "Colombia Potencia de la Vida" ni logos de ministerio.

- Culturas = Ministerio de las Culturas => identidad NACIONAL.
  Aquí sí aplican los sellos nacionales (Potencia de la Vida, logo de ministerio, .aspx/SharePoint).

Reglas:
- El sello/portal GOV.CO (transversal) SÍ puede aparecer en ambos.
- Los COMPONENTES GOV.CO neutros (botones .btn-govco, formularios .entradas-de-texto-govco, etc.)
  son transversales y se usan en ambos sitios.
- Lo que NUNCA se mezcla es la MARCA institucional: cabecera de logos y pie de página.
- Ante duda de a qué entidad pertenece un micrositio, mirar la ruta (sites/movilidad/ vs sites/culturas/)
  y NO inventar logos ni datos institucionales: usar placeholder + TODO.
```

## REGLA PERMANENTE — Wireframe

```
El wireframe define: jerarquía, ubicación aproximada, flujo, componentes y relación entre secciones.
NO define contenido definitivo. Cuando haya contradicción entre wireframe y documentación, MANDA la documentación oficial.
En particular: las cifras del wireframe son ilustrativas (no coinciden con las oficiales), el título real
es "Más personas, mejores ciudades" (no "Historias sobre la bici", que es el eyebrow), y la sección debe
contener las 20 historias reales, no personajes ilustrativos. Filtro por perfil y "Ver más historias" del
wireframe quedan fuera del MVP salvo confirmación del equipo.
```
```

---

## Decisiones tomadas (por criterio doc-sobre-wireframe)

- **Ubicación:** `sites/movilidad/landings/historias-sobre-la-bici/` (landing dentro del repo).
- **Stack:** el existente (HTML + Bootstrap 5 + CDN GOV.CO + JS vanilla + Vite). Sin frameworks nuevos.
- **Filtro por perfil y "Ver más historias":** **fuera del MVP** (el wireframe los muestra, el documento no los exige). Quedan como mejora post-MVP en el PROMPT 6.

Si prefieres incluir el filtro y "Ver más" en el MVP, avísame y ajusto el PROMPT 6.
