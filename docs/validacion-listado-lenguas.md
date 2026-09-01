# Validación de usabilidad y accesibilidad — Componente "Listado de Lenguas Nativas"

**Fecha:** 27 de agosto de 2026
**Alcance:** Componente Angular de listado general de lenguas nativas (buscador + tabla + paginación) con modal de detalle completo de la lengua
**Naturaleza:** Desarrollo tercerizado, **externo a este repositorio** (stack Angular, no HTML estático GOV.CO)
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, buenas prácticas del Ministerio de las Culturas

> **Nota de alcance.** Esta revisión se realiza por inspección del código de la plantilla (template) del componente. **No se dispone del CSS** (`btn-morado`, `fila-morada`, `modal-*`, `btn-lengua`, etc.), por lo que los contrastes de color se marcan como *pendientes de verificar*. La validación completa exige pruebas manuales con lector de pantalla y navegación por teclado sobre el componente en ejecución.

> **Relación con otras vistas.** Comparte el patrón de las vistas de filtro (`validacion-filtro-departamento-lenguas.md`, `validacion-filtro-familia-linguistica-lenguas.md`): misma tabla, buscador, paginación y overlay. La diferencia principal es que aquí el modal de detalle es más completo (cabecera con título y pueblo, secciones de información, y **footer con botón "Cerrar" explícito** además del `×`).

---

## Resumen ejecutivo

El listado cumple su función (buscar, listar y paginar lenguas, y consultar el detalle en un modal bien organizado por secciones) y hace un uso correcto de `<table>` semántica y de `<button>` para las acciones. El modal está mejor estructurado que el de las vistas de filtro (secciones con `<h4>`, footer con acción de cierre clara). Aun así, arrastra los **bloqueantes de accesibilidad** comunes: modal sin `role="dialog"` ni gestión de foco, buscador sin etiqueta, estados dinámicos sin anuncio y emojis leídos por el lector. Como el resto, **no está alineado con GOV.CO v5**.

**Semáforo general**

| Dimensión | Estado |
|---|---|
| Usabilidad | Media |
| Accesibilidad | Baja |
| GOV.CO v5 | No cumple |

---

## Aciertos

- Tabla de datos con estructura semántica correcta (`<table>`/`<thead>`/`<tbody>`); `<thead class="table-light">`.
- El nombre de la lengua y los cierres del modal son `<button>` reales.
- El modal ofrece **dos formas de cierre visibles** (`×` en la cabecera y botón "Cerrar" en el footer): buena práctica de usabilidad.
- Detalle organizado en secciones con encabezados `<h4>` y pares etiqueta/valor legibles.
- Incluye **nota de fuente** (UNESCO), buen aporte de transparencia y confianza.

---

## Hallazgos bloqueantes (accesibilidad)

### B-1. El modal no es un diálogo accesible
El `div.modal-overlay` / `div.modal-tarjeta` no declara `role="dialog"`, `aria-modal="true"` ni `aria-labelledby` apuntando al `<h2>` del título. No hay gestión de foco: al abrir, el foco no entra al modal; al cerrar, no regresa a la fila/botón que lo disparó. No hay *focus trap* ni cierre con `Esc`.
**Acción:** añadir `role="dialog"`, `aria-modal="true"`, `aria-labelledby` al `<h2>`, atrapar el foco dentro del modal, cerrar con `Esc` y devolver el foco al disparador.

### B-2. Botón de cierre `×` sin nombre accesible; cierre por overlay solo con ratón
El `btn-cerrar` (`×`) es un `<button>` (bien), pero su contenido `×` no aporta texto accesible; se anunciará como "signo de multiplicación" o nada. El cierre por clic en el overlay (`div` con `(click)`) no es operable por teclado (el botón "Cerrar" del footer sí lo es, lo cual mitiga parcialmente).
**Acción:** añadir `aria-label="Cerrar"` al botón `×`. El botón "Cerrar" del footer ya cubre el cierre por teclado; aun así, habilitar `Esc`.

### B-3. Buscador sin `<label>` asociado
El `<input>` de búsqueda solo tiene `placeholder="Buscar lengua..."`. No hay `<label for>` ni `aria-label`. El `placeholder` no sustituye a una etiqueta. Incumple 1.3.1 y 3.3.2.
**Acción:** asociar un `<label>` visible o, como mínimo, `aria-label` descriptivo.

### B-4. Estado "sin resultados" no anunciado
El bloque "No se encontraron resultados" aparece/desaparece sin `role="status"` ni `aria-live="polite"`, por lo que el usuario de lector de pantalla no percibe el cambio tras buscar.
**Acción:** marcar el contenedor con `role="status"` / `aria-live="polite"`.

### B-5. Emojis informativos sin texto alternativo
El `📍` antepuesto a ubicaciones (en la tabla y en el modal, secciones Departamentos y Lugares) se lee literalmente y ensucia la lectura de datos.
**Acción:** marcar el emoji con `aria-hidden="true"` o reemplazarlo por texto ("Ubicación: ...").

---

## Hallazgos altos (usabilidad / semántica)

### A-1. Jerarquía de encabezados
La página abre con `<h3>` ("Listado de Lenguas Nativas") sin `<h1>`/`<h2>` previos. Dentro del modal la jerarquía sí es coherente (`<h2>` título → `<h4>` secciones), aunque salta el nivel `<h3>`.
**Acción:** incluir un `<h1>` de página y ordenar niveles (evitar saltar de `<h2>` a `<h4>`).

### A-2. Tabla de datos sin `scope` en los encabezados
Los `<th>` de las 8 columnas no declaran `scope="col"`. Sin `scope`, la navegación por celdas con lector de pantalla pierde el contexto de columna.
**Acción:** añadir `scope="col"` a todos los `<th>`. Considerar `<caption>` o `aria-label` para nombrar la tabla.

### A-3. Uso de `<br>` para maquetar y listas simuladas con viñetas de texto
Las ubicaciones en la celda usan `<span>… <br></span>` para separar elementos, y las autodenominaciones/otras denominaciones usan `<div>• {{ nombre }}</div>` con una viñeta `•` de texto. Semánticamente son listas y deberían ser `<ul>`/`<li>` para que el lector anuncie "lista de N elementos". El `<br>` como separador de ítems es maquetación, no estructura.
**Acción:** convertir esas enumeraciones en `<ul><li>` y eliminar las viñetas de texto (dejarlas al CSS).

### A-4. Contraste y foco visible (pendiente de verificar)
Sin el CSS no se puede confirmar el contraste de fila morada, `btn-lengua`, `btn-morado` ni el foco visible de los elementos interactivos.
**Acción:** verificar contraste 4.5:1 (texto normal) y foco visible.

### A-5. Botones superiores y paginación sin contexto para lector de pantalla
Los botones "Volver a inicio"/"Ir al mapa" usan `routerLink` sobre `<button>` (funcional, aunque semánticamente una navegación encaja mejor en `<a>`). La paginación ("Anterior"/"Siguiente", "Página X de Y") no anuncia el cambio de página ni relaciona los controles con la tabla.
**Acción:** valorar `<a routerLink>` para navegación; añadir `aria-live` al indicador de página y `aria-controls` a los botones.

---

## Hallazgo GOV.CO

### G-1. No usa el sistema de diseño GOV.CO v5
El componente combina utilidades Bootstrap (`table`, `form-control`, `text-end`, `me-2`, `mb-3`) con clases propias de paleta morada (`btn-morado`, `fila-morada`, `btn-lengua`, `modal-*`). El ecosistema del Ministerio exige componentes y variables GOV.CO (`.btn-govco`, `--govcolor-*`), azul cobalto institucional (`#0943B5`) y tipografía Nunito Sans / Verdana. El morado no pertenece a la paleta oficial.
**Acción:** alinear identidad visual (colores, tipografías, botones, modal) con GOV.CO v5. Al ser desarrollo tercerizado externo, coordinar con el proveedor la adopción de tokens y componentes oficiales.

---

## Tabla priorizada de hallazgos

### Bloqueantes (accesibilidad)

| ID | Hallazgo | Acción |
|----|----------|--------|
| B-1 | Modal sin `role="dialog"`, sin gestión de foco ni cierre con `Esc` | Añadir `role="dialog"`, `aria-modal`, `aria-labelledby`, focus trap, `Esc` y devolución de foco |
| B-2 | Botón `×` sin nombre accesible; cierre por overlay solo con ratón | `aria-label="Cerrar"` en `×`; habilitar `Esc` |
| B-3 | Buscador sin etiqueta | `<label for>` visible o `aria-label` |
| B-4 | Estado "sin resultados" no anunciado | `role="status"` / `aria-live="polite"` |
| B-5 | Emoji `📍` leído por el lector | `aria-hidden="true"` o texto alternativo |

### Altos (usabilidad / marca)

| ID | Hallazgo | Acción |
|----|----------|--------|
| A-1 | Jerarquía de encabezados (sin `<h1>`, salto a `<h4>`) | Incluir `<h1>` y ordenar niveles |
| A-2 | `<th>` sin `scope` | `scope="col"` en cabeceras + `<caption>` |
| A-3 | `<br>` y viñetas de texto en lugar de listas | Usar `<ul>`/`<li>` |
| A-4 | Contraste y foco visible sin verificar | Medir 4.5:1 y confirmar foco sobre el CSS real |
| A-5 | Navegación en `<button>` y paginación sin anuncio | Valorar `<a routerLink>`; `aria-live` + `aria-controls` |
| G-1 | No usa GOV.CO v5 ni paleta oficial | Migrar a componentes y tokens GOV.CO |

---

## Recomendaciones de siguiente paso

1. **Centralizar la corrección con las demás vistas.** El modal y la tabla se repiten en varias vistas del proyecto; conviene un componente de diálogo accesible y un componente de tabla reutilizables para corregir B-1 a B-5 una sola vez.
2. **Aprovechar lo ya bien resuelto de este modal** (doble cierre, secciones con encabezados) como base del componente de diálogo común, sumándole la capa de accesibilidad.
3. **Compartir los hallazgos con el proveedor tercerizado**, priorizando accesibilidad (B-1 a B-5).
4. **Solicitar el CSS del componente** para cerrar la verificación de contraste y foco visible (A-4).
5. **Alinear con GOV.CO v5** (G-1): tokens de color, tipografías, botones y modal.
6. Validar el resultado corregido con pruebas manuales de teclado y lector de pantalla, además de una herramienta automática (p. ej. axe-core), sobre el componente en ejecución.

> Esta validación cubre lo verificable por inspección de la plantilla del componente. No incluye la evaluación del CSS (no disponible) ni pruebas con tecnologías de asistencia en tiempo de ejecución.
