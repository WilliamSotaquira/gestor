# Validación de usabilidad y accesibilidad — Componente "Inicio" (Mapa de Lenguas Nativas)

**Fecha:** 27 de agosto de 2026
**Alcance:** Componente Angular de página de inicio (landing): hero, saludos rotativos, tarjetas de módulos de consulta, objetivo y aviso de construcción
**Naturaleza:** Desarrollo tercerizado, **externo a este repositorio** (stack Angular, no HTML estático GOV.CO)
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, buenas prácticas del Ministerio de las Culturas

> **Nota de alcance.** Esta revisión se realiza por inspección del código de la plantilla (template) del componente. **No se dispone del CSS** (`hero-header`, `tarjeta-saludos`, `card-modulo`, `btn-morado`, etc.) ni de la lógica del componente TypeScript (animación de saludos, contenido de `modulos`), por lo que los contrastes de color y ciertos comportamientos se marcan como *pendientes de verificar*. La validación completa exige pruebas manuales con lector de pantalla y navegación por teclado sobre el componente en ejecución.

---

## Resumen ejecutivo

La página de inicio comunica bien su propósito (presentar la plataforma, ofrecer módulos de consulta y declarar el objetivo) y usa un `<h1>` correcto y una estructura de secciones con encabezados. Sin embargo, presenta un **bloqueante de accesibilidad importante en las tarjetas de módulos** —son `<div>` con `routerLink` que además contienen un `<button>` interno, lo que crea un control no operable por teclado y un anidamiento problemático— y varios problemas de semántica (uso de `<h3>` para íconos, saludos rotativos sin anuncio, ausencia de landmarks). Como las demás vistas, **no está alineado con GOV.CO v5**.

**Semáforo general**

| Dimensión | Estado |
|---|---|
| Usabilidad | Media |
| Accesibilidad | Baja |
| GOV.CO v5 | No cumple |

---

## Aciertos

- **`<h1>` presente y único** ("MAPA DE LENGUAS NATIVAS"), correcto como título principal de la página.
- Estructura de contenido en secciones con `<h2>` ("Módulos de consulta", "Objetivo").
- Texto introductorio claro y orientado al usuario.

---

## Hallazgos bloqueantes (accesibilidad)

### B-1. Tarjetas de módulo no operables por teclado y con control anidado
Cada `card-modulo` es un `<div>` con `[routerLink]="modulo.ruta"` (navegable solo con clic de ratón, sin `tabindex`, sin `role`, sin activación por `Enter`/`Espacio`) y **dentro** contiene un `<button>` con el título. Esto genera dos problemas:
- El `<div>` clicable no es alcanzable ni activable por teclado; un usuario de teclado no puede navegar a los módulos.
- Hay un control interactivo (`<button>`) anidado dentro de otro elemento con acción (`div[routerLink]`), lo que es un antipatrón: se solapan objetivos de clic y confunde a la tecnología de asistencia.
**Acción:** convertir cada tarjeta en un único elemento navegable accesible. Lo más limpio: usar un enlace real (`<a [routerLink]>`) que envuelva el contenido de la tarjeta, **eliminando el `<button>` interno**, o bien dejar solo el `<button>` con la navegación por código. No ambos.

### B-2. Íconos marcados como encabezado `<h3>`
El ícono de cada módulo se renderiza dentro de un `<h3>{{ modulo.icono }}</h3>`. Un ícono (probablemente un emoji o glifo) no es un encabezado de contenido: esto ensucia la jerarquía de encabezados y hace que el lector de pantalla anuncie un "encabezado nivel 3" que no aporta estructura. Además, si el ícono es un emoji, se leerá literalmente.
**Acción:** sacar el ícono del `<h3>`, colocarlo en un `<span aria-hidden="true">` (si es decorativo) y usar el nivel de encabezado real para el título del módulo, o prescindir del encabezado si el título va en el enlace/botón.

### B-3. Saludos rotativos sin anuncio ni control
El `<h2 [class.cambiando]="animando">` muestra un saludo en distintas lenguas que cambia por animación/temporizador. No hay `aria-live` para anunciar el cambio, y si la rotación es automática y continua puede incumplir 2.2.2 (Pausar, detener, ocultar) al no ofrecer forma de pausarla. Además, cambiar el texto de un `<h2>` de forma continua altera la percepción de estructura de la página.
**Acción:** anunciar el cambio con `aria-live="polite"` si es informativo; si es puramente decorativo, marcarlo `aria-hidden`. Si la rotación es automática, ofrecer control para pausarla. Valorar no usar un `<h2>` para contenido que muta constantemente.

### B-4. Emojis informativos leídos por el lector de pantalla
El aviso de construcción abre con `🚧` y las tarjetas usan íconos como texto. Estos glifos se anuncian literalmente ("señal de obras"), ensuciando la lectura.
**Acción:** envolver los emojis decorativos en `aria-hidden="true"`; si aportan significado, acompañarlos de texto equivalente.

---

## Hallazgos altos (usabilidad / semántica)

### A-1. Ausencia de landmarks / estructura semántica
Toda la página se compone de `<div>` (`contenido`, `hero-header`, `seccion`). No hay `<main>`, `<header>`, `<section>` ni `<nav>`. Sin landmarks, los usuarios de lector de pantalla no pueden saltar directamente al contenido principal.
**Acción:** envolver el contenido principal en `<main>`, usar `<section>` con encabezado asociado y `<header>` para el hero.

### A-2. Aviso de "Sistema en construcción" sin rol informativo
El `div.mensaje-construccion` comunica una advertencia relevante (funcionalidades no disponibles) pero es un `<div>` neutro. No se anuncia como aviso.
**Acción:** darle `role="status"` o `role="note"` según corresponda, y considerar el componente de alerta GOV.CO.

### A-3. Contraste y foco visible (pendiente de verificar)
Sin el CSS no se puede confirmar el contraste del texto del hero, de los saludos, del `btn-morado` ni de la tarjeta, ni si existe estado de foco visible al navegar por teclado (relevante una vez corregido B-1).
**Acción:** verificar contraste 4.5:1 (texto normal) y foco visible en todos los elementos interactivos.

### A-4. Consistencia ortográfica y de mayúsculas del contenido
El texto introductorio contiene "colombia" y "busqueda" en minúscula/sin tilde. El `<h1>` va todo en mayúsculas ("MAPA DE LENGUAS NATIVAS"): si el efecto es estético conviene lograrlo con CSS (`text-transform`) y no en el contenido, para que el lector de pantalla no lea el texto letra por letra en algunos motores.
**Acción:** corregir "Colombia" y "búsqueda"; mover el efecto de mayúsculas a CSS.

---

## Hallazgo GOV.CO

### G-1. No usa el sistema de diseño GOV.CO v5
El componente emplea clases propias con paleta morada (`btn-morado`, `hero-header`, `card-modulo`, etc.). El ecosistema del Ministerio exige componentes y variables GOV.CO (`.btn-govco`, `--govcolor-*`), azul cobalto institucional (`#0943B5`) y tipografía Nunito Sans / Verdana. El morado no pertenece a la paleta oficial. Un aviso de "sistema en construcción" debería usar el componente de alerta GOV.CO.
**Acción:** alinear identidad visual (colores, tipografías, botones, alertas) con GOV.CO v5. Al ser desarrollo tercerizado externo, coordinar con el proveedor la adopción de tokens y componentes oficiales.

---

## Tabla priorizada de hallazgos

### Bloqueantes (accesibilidad)

| ID | Hallazgo | Acción |
|----|----------|--------|
| B-1 | Tarjeta `div[routerLink]` no operable por teclado + `<button>` anidado | Usar un único `<a [routerLink]>` accesible; eliminar el control anidado |
| B-2 | Ícono dentro de `<h3>` (encabezado falso) | Sacar el ícono a `<span aria-hidden>`; usar encabezado real para el título |
| B-3 | Saludos rotativos sin `aria-live` ni pausa | `aria-live="polite"` o `aria-hidden`; permitir pausar si es automático |
| B-4 | Emojis (`🚧`, íconos) leídos por el lector | `aria-hidden="true"` o texto equivalente |

### Altos (usabilidad / marca)

| ID | Hallazgo | Acción |
|----|----------|--------|
| A-1 | Sin landmarks (`<main>`, `<section>`, `<header>`) | Añadir estructura semántica |
| A-2 | Aviso de construcción sin rol informativo | `role="status"`/`note` o alerta GOV.CO |
| A-3 | Contraste y foco visible sin verificar | Medir 4.5:1 y confirmar foco sobre el CSS real |
| A-4 | Ortografía ("colombia", "busqueda") y mayúsculas en contenido | Corregir texto; mayúsculas por CSS |
| G-1 | No usa GOV.CO v5 ni paleta oficial | Migrar a componentes y tokens GOV.CO |

---

## Recomendaciones de siguiente paso

1. **Priorizar B-1**, que es el bloqueante más grave de esta vista: las tarjetas de módulo son la navegación principal de la plataforma y hoy no son usables por teclado.
2. **Compartir los hallazgos con el proveedor tercerizado**, priorizando accesibilidad (B-1 a B-4).
3. **Solicitar el CSS y el TypeScript del componente** para cerrar la verificación de contraste, foco visible y comportamiento de los saludos rotativos (A-3, B-3).
4. **Alinear con GOV.CO v5** (G-1): tokens de color, tipografías, botones y componente de alerta.
5. Validar el resultado corregido con pruebas manuales de teclado y lector de pantalla, además de una herramienta automática (p. ej. axe-core), sobre el componente en ejecución.

> Esta validación cubre lo verificable por inspección de la plantilla del componente. No incluye la evaluación del CSS ni del TypeScript (no disponibles) ni pruebas con tecnologías de asistencia en tiempo de ejecución.
