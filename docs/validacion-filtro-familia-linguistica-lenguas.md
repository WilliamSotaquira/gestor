# Validación de usabilidad y accesibilidad — Componente "Filtro por Familia Lingüística" (Lenguas nativas)

**Fecha:** 27 de agosto de 2026
**Alcance:** Componente Angular de tabla filtrable de lenguas nativas por familia lingüística + pop-up de denominaciones
**Naturaleza:** Desarrollo tercerizado, **externo a este repositorio** (stack Angular, no HTML estático GOV.CO)
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, buenas prácticas del Ministerio de las Culturas

> **Nota de alcance.** Esta revisión se realiza por inspección del código de la plantilla (template) del componente. **No se dispone del CSS** (`btn-morado`, `fila-morada`, `popup-*`, `selector-familia`), por lo que los contrastes de color se marcan como *pendientes de verificar* y no se pueden confirmar por números. La validación completa exige además pruebas manuales con lector de pantalla y navegación por teclado sobre el componente en ejecución.

> **Relación con otras vistas.** Este componente es prácticamente idéntico al de "Filtro por Departamento" (ver `validacion-filtro-departamento-lenguas.md`). Comparte la misma tabla, paginación, pop-up y clases de estilo; cambia el criterio de filtro (familia lingüística en lugar de departamento) y el manejo del estado de carga del pop-up. Por tanto, los hallazgos son en su mayoría comunes, con una diferencia específica anotada en **B-4**.

---

## Resumen ejecutivo

El componente cumple su función (filtrar lenguas por familia lingüística, buscar, paginar y consultar denominaciones en un pop-up) y hace un uso parcialmente correcto de elementos semánticos: usa `<table>`/`<thead>`/`<tbody>` y expone el nombre de la lengua y el cierre del modal como `<button>`. No obstante, arrastra los mismos **fallos de accesibilidad bloqueantes** de la vista hermana —pop-up no accesible, campos de filtro sin etiqueta y estados dinámicos sin anuncio— y **no está alineado con el sistema de diseño GOV.CO v5** del Ministerio.

**Semáforo general**

| Dimensión | Estado |
|---|---|
| Usabilidad | Media |
| Accesibilidad | Baja |
| GOV.CO v5 | No cumple |

---

## Hallazgos bloqueantes (accesibilidad)

### B-1. El pop-up no es un diálogo accesible
El contenedor `div.popup-overlay` / `div.popup-denominaciones` no declara `role="dialog"`, `aria-modal="true"` ni `aria-labelledby` apuntando al título. No hay gestión de foco: al abrir, el foco no entra al modal; al cerrar, no regresa al botón que lo disparó. No hay *focus trap* ni cierre con `Esc`. Un usuario de teclado o lector de pantalla queda desorientado o atrapado detrás del overlay.
**Acción:** añadir `role="dialog"`, `aria-modal="true"`, `aria-labelledby` al `<h2>`, atrapar el foco dentro del modal, cerrar con `Esc` y devolver el foco al disparador al cerrar.

### B-2. Cierre del modal solo por clic; botón cerrar sin nombre accesible
El overlay cierra con `(click)="cerrarPopup()"` sobre un `div`, que no es alcanzable ni activable por teclado. El botón `×` sí es `<button>` (correcto), pero su contenido `×` no aporta texto accesible: un lector de pantalla lo anunciará como "signo de multiplicación" o nada útil.
**Acción:** añadir `aria-label="Cerrar"` al botón `×` y garantizar el cierre por teclado (`Esc` + botón enfocable).

### B-3. Select e input de filtro sin `<label>` asociado
El `<select>` de familia lingüística y el `<input>` de búsqueda solo cuentan con una opción vacía y un `placeholder="Buscar lengua..."`. No hay `<label for>` ni `aria-label`. El `placeholder` no sustituye a una etiqueta (desaparece al escribir y no siempre se anuncia como nombre del campo). Incumple 1.3.1 (Información y relaciones) y 3.3.2 (Etiquetas o instrucciones).
**Acción:** asociar un `<label>` visible a cada control o, como mínimo, `aria-label` descriptivo.

### B-4. Estados dinámicos no anunciados y estado de "cargando" ambiguo
Los bloques `sin-resultados`, `popup-cargando` y `popup-sin-info` aparecen/desaparecen según el estado sin `role="status"` ni `aria-live="polite"`, por lo que el usuario de lector de pantalla no percibe los cambios.
**Diferencia respecto a la vista hermana:** aquí el estado "Cargando información..." se muestra únicamente con `*ngIf="!denominacionesSeleccionadas"`, sin una bandera dedicada (`cargandoDenominaciones`). Esto acopla el mensaje de carga a la ausencia del objeto de datos: si la petición falla o nunca resuelve, la vista quedará mostrando "Cargando información..." de forma indefinida, sin diferenciar entre *cargando*, *error* y *sin datos*. Es un patrón frágil de usabilidad además de inaccesible.
**Acción:** marcar los contenedores con `role="status"` / `aria-live="polite"` e introducir estados explícitos (cargando / error / vacío) en lugar de inferir "cargando" por la falta de datos.

### B-5. Emoji informativo sin texto alternativo
El `📍` antepuesto a cada lugar es leído literalmente por el lector de pantalla ("pin redondo/ubicación") y ensucia la lectura de datos.
**Acción:** marcar el emoji con `aria-hidden="true"`, o reemplazarlo por texto explícito ("Ubicación: ...").

---

## Hallazgos altos (usabilidad / semántica)

### A-1. Jerarquía de encabezados rota
La vista abre con `<h3>` ("Filtro por Familia Lingüística") sin `<h1>`/`<h2>` previos, y el pop-up usa `<h2>` seguido de `<h3>`. Falta un `<h1>` de página y el orden de niveles no es lógico. Incumple 1.3.1 / 2.4.6.
**Acción:** incluir un `<h1>` y ordenar los niveles de encabezado de forma jerárquica.

### A-2. Tabla de datos sin `scope` en los encabezados
Los `<th>` de las 9 columnas no declaran `scope="col"`. En una tabla ancha, sin `scope` la navegación por celdas con lector de pantalla pierde el contexto de columna.
**Acción:** añadir `scope="col"` a todos los `<th>` de cabecera. Considerar `<caption>` o `aria-label` para nombrar la tabla.

### A-3. Contraste de la fila morada (pendiente de verificar)
Las clases `fila-morada` / `fila-blanca` alternan color para legibilidad (patrón zebra, correcto como refuerzo). Sin el CSS no se puede confirmar el contraste texto/fondo.
**Acción:** verificar que el texto sobre fondo morado alcance 4.5:1 (texto normal). Ver también G-1 sobre paleta institucional.

### A-4. Paginación sin contexto para lector de pantalla
"Anterior"/"Siguiente" y "Página X de Y" funcionan visualmente y se deshabilitan bien en los extremos (`[disabled]`), pero el cambio de página no se anuncia y los botones no indican que controlan la tabla.
**Acción:** anunciar el cambio de página con `aria-live` y relacionar los controles con la tabla mediante `aria-controls`.

### A-5. Botón de lengua sin pista de que abre un diálogo
`btn-lengua` (correctamente un `<button>`) abre el pop-up, pero no comunica esa intención a la tecnología de asistencia.
**Acción:** añadir `aria-haspopup="dialog"` al botón.

---

## Hallazgo GOV.CO

### G-1. No usa el sistema de diseño GOV.CO v5
El componente emplea clases Bootstrap genéricas (`form-control`, `table table-bordered table-hover`) y clases propias con paleta morada (`btn-morado`, `fila-morada`, `selector-familia`, `popup-*`). El ecosistema del Ministerio exige componentes y variables GOV.CO (`.btn-govco`, `--govcolor-*`), azul cobalto institucional (`#0943B5`) y tipografía Nunito Sans / Verdana. El morado no pertenece a la paleta oficial.
**Acción:** alinear la identidad visual (colores, tipografías, botones) con GOV.CO v5. Al tratarse de un desarrollo tercerizado externo, coordinar con el proveedor la adopción de tokens y componentes oficiales.

---

## Tabla priorizada de hallazgos

### Bloqueantes (accesibilidad)

| ID | Hallazgo | Acción |
|----|----------|--------|
| B-1 | Pop-up sin `role="dialog"`, sin gestión de foco ni cierre con `Esc` | Añadir `role="dialog"`, `aria-modal`, `aria-labelledby`, focus trap, `Esc` y devolución de foco |
| B-2 | Cierre solo por clic; botón `×` sin nombre accesible | `aria-label="Cerrar"` y cierre por teclado |
| B-3 | Select e input de filtro sin etiqueta | `<label for>` visible o `aria-label` |
| B-4 | Estados dinámicos no anunciados + "cargando" inferido por ausencia de datos | `role="status"` / `aria-live` + estados explícitos (cargando/error/vacío) |
| B-5 | Emoji `📍` leído por el lector | `aria-hidden="true"` o texto alternativo |

### Altos (usabilidad / marca)

| ID | Hallazgo | Acción |
|----|----------|--------|
| A-1 | Jerarquía de encabezados rota (sin `<h1>`) | Incluir `<h1>` y ordenar niveles |
| A-2 | `<th>` sin `scope` | `scope="col"` en cabeceras + `<caption>` |
| A-3 | Contraste de fila morada sin verificar | Medir 4.5:1 sobre el CSS real |
| A-4 | Paginación sin anuncio de cambio | `aria-live` + `aria-controls` |
| A-5 | Botón de lengua sin pista de diálogo | `aria-haspopup="dialog"` |
| G-1 | No usa GOV.CO v5 ni paleta oficial | Migrar a componentes y tokens GOV.CO |

---

## Recomendaciones de siguiente paso

1. **Corregir los bloqueantes de forma común a ambas vistas.** Al ser componentes casi idénticos, la solución de B-1 a B-5 debería centralizarse (un único componente de tabla + un único componente de diálogo reutilizable) para no duplicar esfuerzo ni divergir.
2. **Atender específicamente B-4 en esta vista:** separar los estados de carga, error y vacío en lugar de inferir "cargando" por la ausencia de `denominacionesSeleccionadas`.
3. **Compartir los hallazgos con el proveedor tercerizado**, priorizando accesibilidad (B-1 a B-5), que no depende del diseño visual.
4. **Solicitar el CSS del componente** para cerrar la verificación de contraste (A-3) y de foco visible.
5. **Alinear con GOV.CO v5** (G-1): tokens de color, tipografías y botones oficiales.
6. Validar el resultado corregido con pruebas manuales de teclado y lector de pantalla, además de una herramienta automática (p. ej. axe-core), sobre el componente en ejecución.

> Esta validación cubre lo verificable por inspección de la plantilla del componente. No incluye la evaluación del CSS (no disponible) ni pruebas con tecnologías de asistencia en tiempo de ejecución.
