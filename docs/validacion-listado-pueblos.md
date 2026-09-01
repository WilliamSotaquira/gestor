# Validación de usabilidad y accesibilidad — Componente "Listado de Pueblos"

**Fecha:** 27 de agosto de 2026
**Alcance:** Componente Angular de listado de pueblos (buscador + tabla + paginación) con modal de detalle de la lengua asociada
**Naturaleza:** Desarrollo tercerizado, **externo a este repositorio** (stack Angular, no HTML estático GOV.CO)
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, buenas prácticas del Ministerio de las Culturas

> **Nota de alcance.** Esta revisión se realiza por inspección del código de la plantilla (template) del componente. **No se dispone del CSS** (`btn-morado`, `fila-morada`, `modal-*`, `btn-lengua`, etc.), por lo que los contrastes de color se marcan como *pendientes de verificar*. La validación completa exige pruebas manuales con lector de pantalla y navegación por teclado sobre el componente en ejecución.

> **Relación con otras vistas.** Este componente es casi idéntico al "Listado de Lenguas Nativas" (ver `validacion-listado-lenguas.md`): comparte tabla, buscador, paginación y el mismo modal con footer de doble cierre. Difiere en las columnas (tabla más corta: #, Pueblo, Lengua, Departamentos, Ubicaciones) y en que el modal se abre desde la lengua del pueblo. Los hallazgos son, por tanto, los mismos.

---

## Resumen ejecutivo

El listado cumple su función (buscar, listar y paginar pueblos, y consultar el detalle de la lengua asociada en un modal organizado por secciones) y usa `<table>` semántica y `<button>` para las acciones. Como su vista gemela, el modal está bien estructurado y ofrece doble cierre. Sin embargo, arrastra los **bloqueantes de accesibilidad** comunes al patrón: modal sin `role="dialog"` ni gestión de foco, buscador sin etiqueta, "sin resultados" sin anuncio y emojis leídos por el lector. **No está alineado con GOV.CO v5.**

**Semáforo general**

| Dimensión | Estado |
|---|---|
| Usabilidad | Media |
| Accesibilidad | Baja |
| GOV.CO v5 | No cumple |

---

## Aciertos

- Tabla de datos con estructura semántica correcta (`<table>`/`<thead>`/`<tbody>`; `<thead class="table-light">`).
- La lengua y los cierres del modal son `<button>` reales.
- El modal ofrece **dos formas de cierre visibles** (`×` en la cabecera y "Cerrar" en el footer).
- Detalle organizado en secciones con encabezados `<h4>` y pares etiqueta/valor legibles.
- Manejo de valores vacíos consistente ("Sin información" / "No posee") y `[hidden]` para descartar denominaciones en blanco.

---

## Hallazgos bloqueantes (accesibilidad)

### B-1. El modal no es un diálogo accesible
El `div.modal-overlay` / `div.modal-tarjeta` no declara `role="dialog"`, `aria-modal="true"` ni `aria-labelledby` apuntando al `<h2>`. No hay gestión de foco (no entra al abrir, no vuelve al disparador al cerrar), *focus trap* ni cierre con `Esc`.
**Acción:** añadir `role="dialog"`, `aria-modal="true"`, `aria-labelledby` al `<h2>`, focus trap, `Esc` y devolución de foco.

### B-2. Botón de cierre `×` sin nombre accesible; cierre por overlay solo con ratón
El `btn-cerrar` (`×`) es un `<button>` (bien) pero sin texto accesible; se anunciará como "signo de multiplicación" o nada. El cierre por clic en el overlay no es operable por teclado (el botón "Cerrar" del footer sí lo cubre parcialmente).
**Acción:** añadir `aria-label="Cerrar"` al botón `×` y habilitar `Esc`.

### B-3. Buscador sin `<label>` asociado
El `<input>` de búsqueda solo tiene `placeholder="Buscar pueblo..."`. No hay `<label for>` ni `aria-label`. Incumple 1.3.1 y 3.3.2.
**Acción:** asociar un `<label>` visible o `aria-label` descriptivo.

### B-4. Estado "sin resultados" no anunciado
El bloque "No se encontraron resultados" aparece/desaparece sin `role="status"` ni `aria-live="polite"`.
**Acción:** marcar el contenedor con `role="status"` / `aria-live="polite"`.

### B-5. Emojis informativos sin texto alternativo
El `📍` antepuesto a ubicaciones (en la tabla y en el modal, secciones Departamentos y Lugares) se lee literalmente.
**Acción:** marcar el emoji con `aria-hidden="true"` o reemplazarlo por texto ("Ubicación: ...").

---

## Hallazgos altos (usabilidad / semántica)

### A-1. Jerarquía de encabezados
La página abre con `<h3>` ("Listado de Pueblos") sin `<h1>`/`<h2>` previos. En el modal se salta de `<h2>` a `<h4>` (sin `<h3>`).
**Acción:** incluir un `<h1>` de página y ordenar niveles sin saltos.

### A-2. Tabla de datos sin `scope` en los encabezados
Los `<th>` de las 5 columnas no declaran `scope="col"`.
**Acción:** añadir `scope="col"` a todos los `<th>`; considerar `<caption>` o `aria-label` para nombrar la tabla.

### A-3. `<br>` para maquetar y listas simuladas con viñetas de texto
Departamentos y ubicaciones en la tabla usan `<span>… <br></span>`; autodenominaciones/otras denominaciones usan `<div>• {{ nombre }}</div>` con viñeta de texto. Semánticamente son listas.
**Acción:** convertir esas enumeraciones en `<ul>`/`<li>` y dejar las viñetas al CSS.

### A-4. Contraste y foco visible (pendiente de verificar)
Sin el CSS no se puede confirmar el contraste de fila morada, `btn-lengua`, `btn-morado` ni el foco visible.
**Acción:** verificar contraste 4.5:1 (texto normal) y foco visible.

### A-5. Navegación en `<button>` y paginación sin contexto
"Volver a inicio"/"Ir al mapa" son navegación sobre `<button>` (encaja mejor en `<a>`). La paginación no anuncia el cambio de página ni relaciona los controles con la tabla.
**Acción:** valorar `<a routerLink>`; añadir `aria-live` al indicador de página y `aria-controls` a los botones.

---

## Hallazgo GOV.CO

### G-1. No usa el sistema de diseño GOV.CO v5
Combina utilidades Bootstrap (`table`, `form-control`, `text-end`, `me-2`, `mb-3`) con clases propias de paleta morada (`btn-morado`, `fila-morada`, `btn-lengua`, `modal-*`). El ecosistema del Ministerio exige componentes y variables GOV.CO (`.btn-govco`, `--govcolor-*`), azul cobalto institucional (`#0943B5`) y tipografía Nunito Sans / Verdana.
**Acción:** alinear identidad visual con GOV.CO v5. Al ser desarrollo tercerizado externo, coordinar con el proveedor.

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

1. **Corregir junto con el "Listado de Lenguas Nativas".** Ambas vistas comparten tabla y modal casi idénticos; deben resolverse con los mismos componentes reutilizables (tabla accesible + diálogo accesible) para no duplicar ni divergir.
2. **Compartir los hallazgos con el proveedor tercerizado**, priorizando accesibilidad (B-1 a B-5).
3. **Solicitar el CSS del componente** para cerrar la verificación de contraste y foco visible (A-4).
4. **Alinear con GOV.CO v5** (G-1).
5. Validar el resultado corregido con pruebas manuales de teclado y lector de pantalla, además de una herramienta automática (p. ej. axe-core), sobre el componente en ejecución.

> Esta validación cubre lo verificable por inspección de la plantilla del componente. No incluye la evaluación del CSS (no disponible) ni pruebas con tecnologías de asistencia en tiempo de ejecución.
