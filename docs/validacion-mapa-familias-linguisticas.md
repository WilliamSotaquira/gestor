# Validación de usabilidad y accesibilidad — Componente "Mapa de Familias Lingüísticas"

**Fecha:** 27 de agosto de 2026
**Alcance:** Componente Angular de mapa interactivo de familias lingüísticas: mapa, banner, navegación, leyenda por color, panel lateral de familia con tarjetas de lenguas, tira multimedia y modales de preview de imagen y video
**Naturaleza:** Desarrollo tercerizado, **externo a este repositorio** (stack Angular, no HTML estático GOV.CO)
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, buenas prácticas del Ministerio de las Culturas

> **Nota de alcance.** Esta revisión se realiza por inspección del código de la plantilla (template) del componente. **No se dispone del CSS ni del TypeScript** (librería de mapa, `getColor`, manejo de eventos del mapa), por lo que los contrastes de color, el foco visible y la interacción real del mapa quedan como *pendientes de verificar*. La validación completa exige pruebas manuales con lector de pantalla y navegación por teclado sobre el componente en ejecución.

> **Relación con otras vistas.** Es la vista más compleja de la plataforma y la que más se aparta del patrón tabla + modal. Comparte con el resto el modal por overlay (aquí en los preview de imagen/video) y la paleta/estilo propios (no GOV.CO), pero introduce elementos nuevos: mapa interactivo, leyenda por color, panel lateral y multimedia. Por ello suma varios hallazgos que no aparecen en las otras vistas.

---

## Resumen ejecutivo

El componente ofrece una experiencia rica (explorar familias lingüísticas en un mapa, ver sus lenguas y territorios en un panel, y consultar multimedia), pero es también **la vista con más barreras de accesibilidad de la plataforma**. Introduce tres problemas graves que no existían en las demás: **el mapa interactivo no tiene alternativa accesible ni operabilidad por teclado**, **la leyenda transmite el significado únicamente mediante color** (incumple 1.4.1) y **el iframe de video carece de título**. A ello se suman los bloqueantes ya conocidos del patrón (modales sin `role="dialog"`, botones `✕` sin nombre, emojis leídos) y la desalineación con GOV.CO v5.

**Semáforo general**

| Dimensión | Estado |
|---|---|
| Usabilidad | Media |
| Accesibilidad | Muy baja |
| GOV.CO v5 | No cumple |

---

## Aciertos

- El banner y los títulos orientan al usuario sobre cómo interactuar con el mapa.
- El panel lateral usa `<h2>` para el nombre de la familia y organiza las lenguas en tarjetas legibles.
- Las imágenes de multimedia incluyen atributo `alt` (aunque genérico; ver H-4).
- Navegación agrupada y consistente en la zona superior.

---

## Hallazgos bloqueantes (accesibilidad)

### B-1. Mapa interactivo sin alternativa accesible ni operación por teclado
El `<div id="map">` es el eje de la vista: se pasa el cursor sobre regiones y se hace clic sobre familias. Toda esa interacción es de ratón sobre un contenedor no semántico. Sin el CSS/TS no se puede confirmar, pero por el patrón habitual (Leaflet/Google Maps sobre `<div>`) es muy probable que **no sea operable por teclado** ni exponga las familias/regiones a la tecnología de asistencia, y que la información ("hover para consultar lenguas") **solo esté disponible con ratón**. Incumpliría 2.1.1 (Teclado) y 1.1.1 (Contenido no textual).
**Acción:** ofrecer una **alternativa accesible equivalente** al mapa (por ejemplo, la lista de familias como botones/enlaces reales que abran el mismo panel), garantizar operación por teclado y describir el mapa con texto. El mapa puede permanecer como complemento visual marcado apropiadamente.

### B-2. Leyenda: el color es el único medio para transmitir información
La `legend-box` asocia cada familia a un color mediante un `<span class="legend-color" style="background:...">` vacío junto al nombre. En el mapa, la familia se identifica **solo por color** (`getColor`). Los usuarios con baja visión o daltonismo no pueden distinguir familias que compartan tonos cercanos (p. ej. varios verdes: Arawak `#00C853`, Guahibo `#AEEA00`, Tupí `#8BC34A`, Aislada `#006400`). Incumple 1.4.1 (Uso del color).
**Acción:** añadir un segundo indicador además del color (patrón, etiqueta, número o icono) tanto en la leyenda como en el mapa, y verificar que los swatches tengan un texto/`aria` asociado, no solo fondo.

### B-3. Iframe de video sin `title`
El `<iframe [src]="videoSeleccionado">` no tiene atributo `title`. Un lector de pantalla anunciará "marco sin título", sin indicar que es el reproductor de video de la familia. Incumple 4.1.2 / 2.4.1.
**Acción:** añadir `title` descriptivo al iframe (p. ej. `title="Reproductor de video de la familia {{ familiaSeleccionada }}"`).

### B-4. Modales (panel, preview de imagen y video) no accesibles
El panel lateral y los dos overlays de preview no declaran `role="dialog"`, `aria-modal="true"` ni `aria-labelledby`. No hay gestión de foco (no entra al abrir, no vuelve al disparador al cerrar), *focus trap* ni cierre con `Esc`. El cierre por clic en el overlay (`div` con `(click)`) no es operable por teclado.
**Acción:** convertirlos en diálogos accesibles (role/aria, focus trap, `Esc`, devolución de foco), reutilizando el componente de diálogo común de la plataforma.

### B-5. Botones de cierre `✕` sin nombre accesible
Los botones `close-btn` y `close` (`✕`) son `<button>` (bien), pero su contenido `✕` no aporta texto accesible; se anunciará como "signo de multiplicación" o nada.
**Acción:** añadir `aria-label="Cerrar"` a cada botón de cierre.

### B-6. Miniaturas de multimedia clicables sin rol de botón ni teclado
Las miniaturas se abren con `<img (click)="verImagen(img)">` / `<img (click)="verVideo(v)">`. Una `<img>` con `(click)` no es enfocable ni activable por teclado y no se anuncia como control. Un usuario de teclado no puede abrir la multimedia.
**Acción:** envolver cada miniatura en un `<button>` (o usar `role="button"` + `tabindex="0"` + manejo de `Enter`/`Espacio`), con nombre accesible que indique qué abre.

### B-7. Emojis informativos sin texto alternativo
El `📍` antepuesto a cada territorio se lee literalmente por el lector de pantalla.
**Acción:** marcar el emoji con `aria-hidden="true"` o reemplazarlo por texto ("Ubicación: ...").

---

## Hallazgos altos (usabilidad / semántica)

### A-1. Jerarquía de encabezados y landmarks
La vista usa `<h2>` (nombre de familia en el panel) pero **no hay `<h1>`** de página. Los títulos "Mapa vivo de lenguas nativas", "Familias lingüísticas" (banner y leyenda) y "Territorios"/"Multimedia" son `<div>` con clase, no encabezados. No hay landmarks (`<main>`, `<nav>`, `<aside>`). La estructura no es navegable por regiones ni por encabezados.
**Acción:** añadir `<h1>`, convertir los títulos de sección en encabezados reales con jerarquía, usar `<nav>` para la navegación superior y `<aside>`/`<section>` para leyenda y panel.

### A-2. Navegación implementada en `<button>` en vez de `<a>`
Los `btn-nav` ("Familias lingüísticas", "Lenguas nativas", "Departamentos", "Volver a inicio") y "Ver ubicaciones" usan `routerLink` sobre `<button>`. Una navegación entre rutas encaja semánticamente en `<a>`.
**Acción:** usar `<a routerLink>` para la navegación.

### A-3. Estados dinámicos no anunciados
"No hay registros disponibles", "Sin territorios registrados" y "No hay multimedia disponible" cambian según el estado sin `role="status"` ni `aria-live`.
**Acción:** anunciar estos estados con `role="status"` / `aria-live="polite"`.

### A-4. Textos alternativos genéricos en imágenes
Las miniaturas usan `alt="Imagen de la familia"` y `alt="Video de YouTube"`, y el preview `alt="Imagen"`. Son genéricos y no identifican el contenido concreto.
**Acción:** generar `alt` descriptivos por elemento (incluir nombre de familia y, si existe, descripción del recurso); para video, indicar de qué trata.

### A-5. Territorios como listas y color en texto
Los territorios se listan como `<div class="location-item">` (deberían ser `<ul>`/`<li>`). Además, el nombre de la lengua y el contador toman su color de `getColor`; hay que verificar contraste de ese color sobre el fondo (ligado a B-2 y H-6).
**Acción:** usar listas reales; verificar contraste del texto coloreado.

### A-6. Contraste y foco visible (pendiente de verificar)
Sin el CSS no se puede confirmar el contraste de los colores de familia sobre sus fondos (texto de tarjeta, botón "Ver ubicaciones" con fondo dinámico), ni el foco visible de los elementos interactivos.
**Acción:** verificar contraste 4.5:1 (texto) y 3:1 (componentes/estados), y foco visible; atención especial al botón con `background` dinámico y texto encima.

---

## Hallazgo GOV.CO

### G-1. No usa el sistema de diseño GOV.CO v5
El componente usa clases propias (`btn-nav`, `panel`, `legend-*`, `card`, `overlay`, `modal-box`) y una paleta de 14 colores definida inline por familia, ajena a GOV.CO. El ecosistema del Ministerio exige componentes y variables GOV.CO (`.btn-govco`, `--govcolor-*`), azul cobalto institucional (`#0943B5`) y tipografía Nunito Sans / Verdana.
**Acción:** alinear identidad visual con GOV.CO v5. La paleta de familias puede conservarse como codificación temática del dato, pero debe cumplir contraste y acompañarse de un segundo indicador (ver B-2); los controles y modales deben usar componentes oficiales.

---

## Tabla priorizada de hallazgos

### Bloqueantes (accesibilidad)

| ID | Hallazgo | Acción |
|----|----------|--------|
| B-1 | Mapa interactivo sin alternativa accesible ni teclado | Alternativa equivalente (lista navegable), operación por teclado, descripción textual |
| B-2 | Leyenda/mapa transmiten familia solo por color | Segundo indicador (patrón/etiqueta/número) + verificar contraste |
| B-3 | Iframe de video sin `title` | Añadir `title` descriptivo |
| B-4 | Panel y previews sin `role="dialog"`, foco ni `Esc` | Diálogo accesible reutilizable |
| B-5 | Botones `✕` sin nombre accesible | `aria-label="Cerrar"` |
| B-6 | Miniaturas `<img (click)>` no operables por teclado | Envolver en `<button>` con nombre accesible |
| B-7 | Emoji `📍` leído por el lector | `aria-hidden="true"` o texto alternativo |

### Altos (usabilidad / marca)

| ID | Hallazgo | Acción |
|----|----------|--------|
| A-1 | Sin `<h1>`, títulos en `<div>`, sin landmarks | Encabezados reales + `<nav>`/`<aside>`/`<section>` |
| A-2 | Navegación en `<button>` | Usar `<a routerLink>` |
| A-3 | Estados dinámicos no anunciados | `role="status"` / `aria-live` |
| A-4 | `alt` genéricos en imágenes/videos | `alt` descriptivos por elemento |
| A-5 | Territorios sin `<ul>`/`<li>`; texto coloreado | Listas reales; verificar contraste |
| A-6 | Contraste y foco visible sin verificar | Medir 4.5:1 / 3:1 y foco sobre el CSS real |
| G-1 | No usa GOV.CO v5 ni paleta oficial | Migrar a componentes y tokens GOV.CO |

---

## Recomendaciones de siguiente paso

1. **Priorizar B-1 y B-2**, que son los hallazgos más graves y propios de esta vista: sin alternativa al mapa y con la información codificada solo por color, la funcionalidad central queda inaccesible para una parte de los usuarios.
2. **Reutilizar el componente de diálogo accesible** de la plataforma para el panel y los previews (B-4, B-5), y el mismo tratamiento de emojis (B-7) del resto de vistas.
3. **Añadir `title` al iframe y roles de botón a las miniaturas** (B-3, B-6) — correcciones puntuales de bajo costo y alto impacto.
4. **Compartir los hallazgos con el proveedor tercerizado**, priorizando accesibilidad (B-1 a B-7).
5. **Solicitar el CSS y el TypeScript del componente** para cerrar contraste, foco visible y el análisis real de la interacción del mapa (B-1, A-6).
6. **Alinear con GOV.CO v5** (G-1).
7. Validar el resultado corregido con pruebas manuales de teclado y lector de pantalla, más una herramienta automática (p. ej. axe-core), sobre el componente en ejecución.

> Esta validación cubre lo verificable por inspección de la plantilla del componente. No incluye la evaluación del CSS ni del TypeScript (no disponibles) ni pruebas con tecnologías de asistencia en tiempo de ejecución. El mapa interactivo requiere verificación específica en ejecución.
