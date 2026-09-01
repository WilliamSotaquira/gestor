# Informe consolidado de validación de usabilidad y accesibilidad — Plataforma "Mapa de Lenguas Nativas"

**Fecha:** 27 de agosto de 2026
**Entidad:** Ministerio de las Culturas, las Artes y los Saberes
**Producto evaluado:** Plataforma web "Mapa de Lenguas Nativas" (aplicación Angular)
**Naturaleza:** Desarrollo tercerizado, **externo a este repositorio** (stack Angular, no HTML estático GOV.CO)
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, buenas prácticas del Ministerio.

> **Nota de alcance.** Todas las revisiones se realizaron por inspección del código de las plantillas (templates) de los componentes. **No se dispone del CSS ni del TypeScript** de los componentes, por lo que los contrastes de color, el foco visible y ciertos comportamientos (rotación de saludos, estados de carga) quedan como *pendientes de verificar*. La validación completa exige pruebas manuales con lector de pantalla y navegación por teclado sobre la aplicación en ejecución, más una herramienta automática (p. ej. axe-core).

Este documento consolida las seis validaciones individuales:

| # | Vista | Documento |
|---|-------|-----------|
| 1 | Inicio (landing) | `validacion-inicio-lenguas.md` |
| 2 | Filtro por Departamento | `validacion-filtro-departamento-lenguas.md` |
| 3 | Filtro por Familia Lingüística | `validacion-filtro-familia-linguistica-lenguas.md` |
| 4 | Listado de Lenguas Nativas | `validacion-listado-lenguas.md` |
| 5 | Listado de Pueblos | `validacion-listado-pueblos.md` |
| 6 | Mapa de Familias Lingüísticas | `validacion-mapa-familias-linguisticas.md` |


## 1. Resumen ejecutivo

La plataforma es funcional y cumple su propósito de consulta y exploración de las lenguas nativas de Colombia. No obstante, **presenta barreras de accesibilidad de nivel bloqueante repetidas en todas las vistas** y **no está alineada con el sistema de diseño GOV.CO v5** exigido para los productos digitales del Estado colombiano y del Ministerio.

El hallazgo central del análisis transversal es que **la mayoría de los fallos no son aislados: son defectos de los componentes base reutilizados** (una tabla de datos, un diálogo/modal y un buscador que se repiten en cuatro de las seis vistas). Esto es una buena noticia para la remediación: **corregir los componentes compartidos una sola vez resuelve buena parte de los hallazgos en toda la plataforma.** Las dos vistas que se apartan del patrón (Inicio y, sobre todo, el Mapa de Familias Lingüísticas) concentran los hallazgos más graves y requieren corrección a medida.

**Semáforo consolidado**

| Dimensión | Estado global | Observación |
|---|---|---|
| Usabilidad | Media | Funcional, pero con barreras de teclado y estados poco claros |
| Accesibilidad | Baja | Bloqueantes repetidos: diálogo no accesible, campos sin etiqueta, navegación por teclado. El Mapa agrava el promedio (accesibilidad muy baja) |
| Cumplimiento GOV.CO v5 | No cumple | Todas las vistas usan paleta propia y clases propias/Bootstrap, no tokens oficiales |

**Riesgo de cumplimiento normativo.** Al ser un producto del Estado, la Resolución 1519 de 2020 (que adopta WCAG 2.1 nivel AA) es de obligatorio cumplimiento. En el estado actual, la plataforma **no cumpliría una auditoría de accesibilidad**, principalmente por los bloqueantes de teclado y de diálogo.


## 2. Patrón de arquitectura observado

Las seis vistas se agrupan en tres familias:

- **Vista de contenido (1):** Inicio / landing. Estructura propia (hero, tarjetas de navegación, secciones informativas).
- **Vistas de datos (2 a 5):** comparten el mismo esqueleto — botones superiores de navegación, buscador, tabla paginada y un modal/pop-up de detalle abierto desde el nombre de la lengua.
- **Vista de mapa (6):** Mapa de Familias Lingüísticas. La más compleja y singular: mapa interactivo, leyenda por color, panel lateral, tira multimedia y modales de preview de imagen/video.

Dentro de las vistas de datos:
- Las **vistas de filtro (2 y 3)** usan un pop-up de denominaciones más simple (`popup-*`).
- Los **listados (4 y 5)** usan un modal de detalle más completo (`modal-*`) con doble cierre y secciones.

Esta duplicación es la causa de que los mismos hallazgos aparezcan una y otra vez en las vistas de datos. El Mapa (6), al no seguir el patrón, aporta hallazgos propios adicionales (mapa sin alternativa accesible, color como único indicador, iframe sin título, miniaturas no operables por teclado).


## 3. Matriz de hallazgos por vista

Leyenda: ● aplica · ○ no aplica · ◑ aplica con matiz propio

### 3.1. Bloqueantes de accesibilidad

| ID | Hallazgo | Inicio | Filtro Dpto. | Filtro Familia | List. Lenguas | List. Pueblos | Mapa |
|----|----------|:---:|:---:|:---:|:---:|:---:|:---:|
| C-1 | Diálogo/modal no accesible (`role="dialog"`, `aria-modal`, `aria-labelledby`, focus trap, `Esc`, devolución de foco) | ○ | ● | ● | ● | ● | ● |
| C-2 | Botón cerrar `×`/`✕` sin nombre accesible; cierre por overlay solo con ratón | ○ | ● | ● | ● | ● | ● |
| C-3 | Campos de filtro/búsqueda sin `<label>` asociado | ○ | ● | ● | ● | ● | ○ |
| C-4 | Estados dinámicos (sin resultados / cargando / vacío) sin `aria-live`/`role="status"` | ○ | ● | ◑ | ● | ● | ● |
| C-5 | Emojis informativos (`📍`, `🚧`, íconos) leídos literalmente por el lector | ● | ● | ● | ● | ● | ● |
| C-6 | Tarjetas/miniaturas no operables por teclado (`div[routerLink]` con `<button>` dentro; `<img (click)>`) | ● | ○ | ○ | ○ | ○ | ● |
| C-7 | Íconos dentro de `<h3>` (encabezado falso) | ● | ○ | ○ | ○ | ○ | ○ |
| C-8 | Contenido rotativo (saludos) sin `aria-live` ni pausa (posible incumplimiento 2.2.2) | ● | ○ | ○ | ○ | ○ | ○ |
| C-9 | Mapa interactivo sin alternativa accesible ni operación por teclado (2.1.1 / 1.1.1) | ○ | ○ | ○ | ○ | ○ | ● |
| C-10 | Información transmitida solo por color (leyenda/mapa de familias) (1.4.1) | ○ | ○ | ○ | ○ | ○ | ● |
| C-11 | Iframe de video sin `title` (4.1.2 / 2.4.1) | ○ | ○ | ○ | ○ | ○ | ● |

### 3.2. Hallazgos altos (usabilidad / semántica)

| ID | Hallazgo | Inicio | Filtro Dpto. | Filtro Familia | List. Lenguas | List. Pueblos | Mapa |
|----|----------|:---:|:---:|:---:|:---:|:---:|:---:|
| H-1 | Jerarquía de encabezados (falta `<h1>`, saltos de nivel) | ◑ | ● | ● | ● | ● | ● |
| H-2 | Tabla de datos sin `scope` en `<th>` (+ `<caption>`) | ○ | ● | ● | ● | ● | ○ |
| H-3 | `<br>` y viñetas de texto en lugar de listas `<ul>`/`<li>` | ○ | ○ | ○ | ● | ● | ● |
| H-4 | Paginación sin `aria-live` ni `aria-controls` | ○ | ● | ● | ● | ● | ○ |
| H-5 | Botón que abre diálogo sin `aria-haspopup="dialog"` | ○ | ● | ● | ● | ● | ○ |
| H-6 | Navegación implementada en `<button>` en vez de `<a>` | ● | ● | ● | ● | ● | ● |
| H-7 | Ausencia de landmarks (`<main>`, `<section>`, `<header>`, `<nav>`) | ● | ◑ | ◑ | ◑ | ◑ | ● |
| H-8 | Aviso "en construcción" sin rol informativo | ● | ○ | ○ | ○ | ○ | ○ |
| H-9 | Errores de ortografía/mayúsculas en contenido ("colombia", "busqueda") | ● | ○ | ○ | ○ | ○ | ○ |
| H-10 | Contraste de color y foco visible sin verificar (falta CSS) | ● | ● | ● | ● | ● | ● |
| H-11 | Textos alternativos (`alt`) genéricos en imágenes/videos | ○ | ○ | ○ | ○ | ○ | ● |
| H-12 | Títulos de sección en `<div>` en lugar de encabezados reales | ○ | ○ | ○ | ○ | ○ | ● |

### 3.3. Cumplimiento de marca

| ID | Hallazgo | Inicio | Filtro Dpto. | Filtro Familia | List. Lenguas | List. Pueblos | Mapa |
|----|----------|:---:|:---:|:---:|:---:|:---:|:---:|
| G-1 | No usa GOV.CO v5: paleta propia, clases propias/Bootstrap, tipografía y tokens no oficiales | ● | ● | ● | ● | ● | ● |


## 4. Hallazgos transversales (afectan a toda o casi toda la plataforma)

**C-5 (emojis), G-1 (GOV.CO v5), H-10 (contraste/foco) y H-6 (navegación en `<button>`) están en las seis vistas.** C-1 y C-2 (diálogo/cierre) están en las cinco vistas con modal. Estos son los de mayor alcance:

- **C-1 y C-2 (diálogo/cierre)** afectan a las cinco vistas con modal (2 a 6). Un solo componente de diálogo accesible los resuelve en bloque.
- **C-3, C-4, H-2, H-4, H-5** provienen del componente de tabla + buscador de las vistas de datos (2 a 5). Un solo componente de tabla/buscador accesible los resuelve en bloque.
- **C-5 (emojis)** aparece en todas; se resuelve con una convención simple: todo emoji decorativo va en `<span aria-hidden="true">`.
- **G-1 (GOV.CO v5)** es transversal y de fondo: la plataforma entera debe adoptar la identidad oficial.
- **H-10 (contraste/foco)** no puede cerrarse sin el CSS; queda pendiente de entrega por el proveedor.
- **C-9, C-10, C-11 (mapa, color, iframe)** son exclusivos del Mapa y requieren corrección a medida; son, además, los hallazgos de mayor gravedad de la plataforma.

## 5. Hallazgos específicos por vista

- **Inicio** concentra los hallazgos propios más graves: **C-6** (tarjetas de módulo no usables por teclado, que son la navegación principal de la plataforma), **C-7** (íconos como `<h3>`) y **C-8** (saludos rotativos). Es la vista que más se aparta del patrón y la que requiere corrección a medida.
- **Filtro por Familia Lingüística** tiene el matiz **C-4 (◑)**: el estado "Cargando..." se infiere de la ausencia de datos (`*ngIf="!denominacionesSeleccionadas"`), sin bandera dedicada, por lo que un fallo de red deja la vista "cargando" de forma indefinida. Debe separar los estados cargando / error / vacío.
- **Listados de Lenguas y de Pueblos** aportan **H-3** (uso de `<br>` y viñetas de texto donde corresponden listas) pero son también los que mejor resuelven el modal (doble cierre, secciones, nota de fuente UNESCO): su modal es la mejor base para el componente de diálogo común.
- **Mapa de Familias Lingüísticas** es **la vista más grave de la plataforma (accesibilidad muy baja)** y la que más hallazgos propios concentra: **C-9** (mapa interactivo sin alternativa accesible ni teclado, siendo la funcionalidad central), **C-10** (las familias se distinguen solo por color, con tonos cercanos entre sí), **C-11** (iframe de video sin `title`), miniaturas de multimedia no operables por teclado (C-6), `alt` genéricos (H-11) y títulos de sección en `<div>` (H-12). Requiere corrección a medida además de reutilizar el diálogo común para el panel y los previews.


## 6. Aciertos a conservar

- Uso de `<table>`/`<thead>`/`<tbody>` semántico en todas las vistas de datos.
- Acciones expuestas como `<button>` reales (nombre de lengua, cierres de modal).
- Modales de los listados con **doble forma de cierre** y secciones con encabezados.
- **Nota de fuente (UNESCO)** en el detalle: buena práctica de transparencia.
- Inicio tiene un **`<h1>` único y correcto** y secciones con `<h2>`.
- Manejo consistente de valores vacíos ("Sin información" / "No posee" / "No hay registros disponibles").
- El Mapa incluye `alt` en las imágenes (aunque genérico) y un banner con instrucciones de uso: buena base para una alternativa textual.


## 7. Plan de remediación priorizado

### Prioridad 1 — Bloqueantes de accesibilidad (obligatorio para cumplimiento normativo)

1. **Crear un componente de diálogo accesible reutilizable** que resuelva C-1 y C-2 (role/aria, focus trap, `Esc`, devolución de foco, `×` con `aria-label`). Base recomendada: el modal de los listados. Sustituir con él los `popup-*` y `modal-*` de las vistas de datos y los del Mapa (panel lateral y previews de imagen/video).
2. **Etiquetar todos los campos** de filtro y búsqueda (C-3) con `<label>` visible o `aria-label`.
3. **Anunciar los estados dinámicos** (C-4) con `role="status"`/`aria-live` y, en Filtro por Familia, separar cargando/error/vacío.
4. **Corregir la navegación por teclado** (C-6): en Inicio, tarjetas como un único `<a [routerLink]>` accesible sin control anidado; en el Mapa, miniaturas de multimedia como `<button>` operables por teclado.
5. **Convención de emojis** (C-5): `aria-hidden="true"` en todos los decorativos.
6. Resolver C-7 (íconos fuera de `<h3>`) y C-8 (saludos con `aria-live`/pausa) en Inicio.
7. **Corregir los bloqueantes propios del Mapa** (C-9, C-10, C-11): alternativa accesible y operable por teclado al mapa interactivo con descripción textual; segundo indicador además del color en leyenda y mapa; `title` descriptivo en el iframe de video.

### Prioridad 2 — Semántica y usabilidad

8. Jerarquía de encabezados con `<h1>` por página y sin saltos (H-1); convertir títulos de sección en `<div>` a encabezados reales, especialmente en el Mapa (H-12).
9. `scope="col"` y `<caption>` en las tablas (H-2).
10. Listas reales `<ul>`/`<li>` en lugar de `<br>`/viñetas de texto (H-3), incluidos los territorios del Mapa.
11. Paginación con `aria-live` + `aria-controls` (H-4) y `aria-haspopup="dialog"` en el botón que abre el detalle (H-5).
12. Landmarks (`<main>`, `<section>`, `<header>`, `<nav>`, `<aside>`) (H-7); navegación con `<a>` (H-6); aviso de construcción con rol informativo (H-8); corrección ortográfica (H-9); `alt` descriptivos por elemento en la multimedia del Mapa (H-11).

### Prioridad 3 — Identidad GOV.CO y verificación final

13. **Migrar a GOV.CO v5** (G-1): tokens de color (azul cobalto `#0943B5`), tipografía Nunito Sans / Verdana, botones `.btn-govco`, componente de alerta oficial. La paleta temática de familias del Mapa puede conservarse como codificación del dato, pero debe cumplir contraste y llevar un segundo indicador (ver C-10). **Antes de esta migración debe cerrarse la armonización de paletas descrita en el punto 8.6** (identidad GOV.CO vs. paleta de diseño lilas/amarillo/beige), para no implementar con dos criterios de marca en conflicto.
14. **Solicitar CSS/TypeScript al proveedor** para cerrar contraste y foco visible (H-10) y para analizar la interacción real del mapa (C-9).
15. **Verificación final:** pruebas manuales de teclado y lector de pantalla + auditoría automática (axe-core) sobre la aplicación en ejecución.


## 8. Recomendaciones del área de diseño

Como complemento a la validación técnica de accesibilidad y usabilidad, el área de diseño aporta las siguientes recomendaciones desde la noción de diseño visual. Se reconoce el trabajo realizado, que es extenso, y estas anotaciones buscan fortalecer la armonía y la calidez visual de la plataforma.

### 8.1. Contraste sobre fondo lila
Cuando el fondo sea lila, el texto debe ser de color **blanco**. Esta recomendación es coherente con el hallazgo **H-10** del informe (contraste pendiente de verificar): el texto blanco sobre lila mejora la legibilidad y ayuda a alcanzar la relación de contraste mínima exigida por WCAG 2.1 AA.

### 8.2. Limitar y unificar la paleta de colores
En la sección del **Mapa** hay unos botones azules que se salen de la paleta. La sugerencia es identificar un color que esté **dentro de la paleta** para reemplazarlos; esto aportará armonía al conjunto.

### 8.3. Fondo del mapa
Se sugiere no dejar el fondo del mapa netamente **blanco**, sino usar un **beige**. Esto ayuda a bajar la rigidez y aporta calidez visual.

### 8.4. Paleta de referencia (basada en la vista de Lenguas Nativas)
En la vista de **Lenguas Nativas** el lila cambia de tono, se satura más y se juega con el **amarillo** como color complementario. La sugerencia es tomar esa vista como **modelo de diagramación general** y de variación de la gama de color, de modo que la plataforma quede con una paleta más completa y cálida, compuesta por:

- **Dos lilas** (uno base y uno más saturado)
- **Un amarillo** (complementario)
- **Blanco**

### 8.5. Menú de inicio
El menú de inicio merece un desarrollo visual más amplio, ya que esta entrada debe ser visualmente más atractiva. Conviene mejorar la **iconografía** y la **diagramación** para dar una mejor experiencia. El área de diseño se ofrece a apoyar este desarrollo.

### 8.6. Armonización entre la paleta de diseño y GOV.CO v5 (punto por definir)
Existe una **tensión que debe resolverse antes de implementar**: la paleta propuesta por el área de diseño (dos lilas, amarillo y blanco, con fondo beige) y la identidad institucional **GOV.CO v5** (azul cobalto `#0943B5`, tipografía Nunito Sans / Verdana, componentes oficiales) exigida por el hallazgo **G-1**. Son dos criterios de marca que, tal como están, pueden entrar en conflicto y dar instrucciones contradictorias al proveedor.

No es una contradicción irresoluble; conviven si se define claramente el rol de cada paleta:

- **Identidad institucional (GOV.CO v5):** debe regir los elementos de marco y sistema — cabecera/pie institucionales, botones de acción principales, enlaces, focos, estados y alertas. Es de cumplimiento obligatorio para un producto del Estado.
- **Paleta temática del producto (lilas, amarillo, beige):** puede usarse como **codificación de contenido y ambientación** de la plataforma (fondos de sección, acentos, diferenciación temática), siempre que:
  - Cumpla el contraste mínimo WCAG 2.1 AA en cada combinación fondo/texto (4.5:1 texto normal; 3:1 componentes/estados), en línea con **H-10**.
  - No se use el color como **único** medio para transmitir información (ver **C-10**, leyenda del Mapa).

**Acción recomendada:** acordar entre el área de diseño, la dependencia de comunicaciones/marca y el proveedor un **único documento de identidad visual** que fije qué elementos siguen GOV.CO y dónde se admite la paleta temática, con sus valores de color y sus relaciones de contraste ya verificadas. Ese documento debe cerrarse **antes** de la migración descrita en el punto 13 del plan.

> Estas recomendaciones de diseño son complementarias a los hallazgos de accesibilidad. Al aplicar la paleta (lilas, amarillo, blanco, beige) debe verificarse en cada combinación fondo/texto que se cumpla el contraste mínimo WCAG 2.1 AA (4.5:1 para texto normal), en línea con **H-10**, y debe conciliarse con la identidad GOV.CO v5 según lo indicado en 8.6 y en el hallazgo **G-1**.


## 9. Recomendación de fondo para el proveedor

La duplicación de componentes es el origen de la mayoría de los hallazgos y el mayor riesgo a futuro (las vistas divergen y los arreglos se repiten o se olvidan). Se recomienda **consolidar en componentes reutilizables** — un diálogo accesible, una tabla de datos accesible y un buscador etiquetado — y construir sobre ellos las vistas. Corregir accesibilidad una sola vez, en el componente base, es más barato, más consistente y más fácil de auditar que parchear seis plantillas. El Mapa es la excepción: por su naturaleza requiere trabajo específico (alternativa accesible al mapa, codificación no solo por color), que debe planificarse aparte.

> Este informe consolida validaciones realizadas por inspección de plantillas. No incluye evaluación de CSS/TypeScript (no disponibles) ni pruebas con tecnologías de asistencia en tiempo de ejecución. Para una certificación de conformidad con la Resolución 1519 de 2020 se requiere la verificación final descrita en el punto 15.
