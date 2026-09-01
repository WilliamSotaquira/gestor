# Validación de usabilidad, accesibilidad y GOV.CO — Portal Cautivo WiFi (Movilidad)

**Fecha:** 27 de agosto de 2026
**Alcance:** 5 vistas del portal cautivo WiFi de la Secretaría Distrital de Movilidad
**Criterios aplicados:** Usabilidad, Accesibilidad (WCAG 2.1 AA / Resolución 1519 de 2020), Sistema de diseño GOV.CO v5, Ley 1581 de 2012 (protección de datos)

## Vistas evaluadas

| # | Vista | Descripción |
|---|-------|-------------|
| 1 | Bienvenida | Pantalla inicial con banner de video y tarjeta de registro |
| 2 | Registro | Formulario de datos personales y detalle del trámite |
| 3 | Conexión exitosa | Temporizador de sesión + campaña institucional |
| 4 | Agradecimiento | Calificación del servicio por estrellas |
| 5 | Modal de política | Política de privacidad y tratamiento de datos |

---

## Resumen ejecutivo

Las vistas tienen una propuesta visual cuidada, pero presentan desviaciones importantes frente a las directrices del proyecto y varios fallos de accesibilidad que deben corregirse antes de publicar.

El punto estructural más relevante: **las vistas no usan el sistema de diseño GOV.CO v5**. Están construidas con Tailwind vía CDN y un tema Material Design personalizado (colores marrón/ámbar y rojo, tipografías Work Sans / IBM Plex Sans), sin las clases (`.btn-govco`), variables (`--govcolor-*`) ni tipografías oficiales (Nunito Sans / Verdana) que exige el repositorio.

**Semáforo general por vista**

| Vista | Usabilidad | Accesibilidad | GOV.CO | Estado |
|-------|:----------:|:-------------:|:------:|--------|
| 1. Bienvenida | Media | Baja | No cumple | Requiere cambios |
| 2. Registro | Baja | Media | No cumple | Requiere cambios críticos |
| 3. Conexión exitosa | Media | Baja | No cumple | Requiere cambios |
| 4. Agradecimiento | Baja | Muy baja | No cumple | Requiere cambios críticos |
| 5. Modal política | Media | Media-alta | No cumple | Requiere ajustes |

---

## Hallazgos transversales (afectan a las 5 vistas)

### T-1. No se usa GOV.CO v5 ni la paleta oficial (incumple regla del proyecto)
El proyecto exige clases y variables GOV.CO y tipografía Nunito Sans / Verdana. Las vistas usan:
- Tailwind CDN (`https://cdn.tailwindcss.com`), que el propio Tailwind desaconseja para producción.
- Tema Material Design: `primary` = `#7e5700` (marrón/ámbar), `secondary` = `#bb0023` (rojo), fuentes Work Sans / IBM Plex Sans.
- Ninguna variable `--govcolor-*`. El azul cobalto institucional (`#0943B5`) no aparece.

**Impacto:** identidad visual desalineada del ecosistema gov.co.

### T-2. Contradicción semántica del color
El token `primary` es un marrón dorado (`#7e5700`) y las acciones principales ("Registrarse para navegar", "Registrar solicitud") usan `secondary` rojo (`#bb0023`). En convenciones GOV.CO y de usabilidad, el rojo comunica error/peligro, no acción primaria. Genera ambigüedad.

### T-3. Falta la barra superior GOV.CO
Ninguna pantalla incluye la franja / bloque de identidad estatal estándar del ecosistema gov.co.

### T-4. Enlaces del pie de página vacíos
"Políticas de privacidad", "Términos y condiciones", "Mapa del sitio" y "Atención a la ciudadanía" usan `href="#"` en las 5 vistas. En un portal público estos enlaces deben ser funcionales.

### T-5. Correcto
`<html lang="es">` está presente y bien definido en las 5 vistas.

---

## Documento 1 — Bienvenida

### Accesibilidad
- **[Crítico] Banner de video no operable.** Es un `<div class="cursor-pointer">` con ícono `play_arrow` decorativo. No es `<button>`, no tiene `role`, `aria-label`, foco por teclado ni acción real. Un usuario con teclado o lector de pantalla no puede reproducir nada.
- **Imágenes de fondo con `data-alt` en vez de `alt`.** `data-alt` no es accesible; los lectores de pantalla lo ignoran. Aceptable solo si son puramente decorativas.
- **Contraste del hero:** texto `#181b27` sobre foto difuminada al 70% de opacidad. No hay garantía de 4.5:1 sobre las zonas más claras de la imagen; depende de la foto.

### Usabilidad
- Botón principal en rojo (ver T-2).
- "Conexión segura y encriptada" con ícono aporta confianza. **Correcto.**

---

## Documento 2 — Registro (formulario)

### Correcto
- Cada `<input>`/`<select>` tiene `<label for>` asociado.
- Uso adecuado de `required`, `type="email"` y explicación del asterisco.

### Accesibilidad
- **[Alto] Radios sin foco visible.** Los `radio` usan `appearance-none` con el punto dibujado por un `<div>`; no hay estado `focus-visible`. El usuario por teclado no ve dónde está el foco.
- **[Alto] Checkbox de política mal etiquetado.** El `<input type="checkbox">` está en un `<label>` que no contiene el texto ("He leído y acepto…" está en un `<p>` hermano). No hay asociación programática con la etiqueta descriptiva y el área clicable no incluye el texto.

### Usabilidad y lógica (críticos)
- **[Crítico] "Tipo de discapacidad" obligatorio y siempre visible.** Se exige incluso a quien responde "No" o "Prefiero no responder" en la pregunta previa. Error lógico: debería mostrarse condicionalmente solo si respondió "Sí". No hay JS que lo controle.
- **[Crítico] Datos sensibles obligatorios.** Discapacidad, tipo de discapacidad, pertenencia étnica, LGBTIQ+ y condición de víctima están marcados `required`. Bajo la Ley 1581 de 2012, los datos sensibles requieren autorización explícita y **no se puede condicionar** un servicio a entregarlos. Obligarlos para acceder a WiFi es un riesgo legal. Recomendación: hacerlos opcionales, con "Prefiero no responder" como valor por defecto.
- **[Alto] Exceso de campos obligatorios** (~9 a 11 campos) para un flujo cuya meta es dar internet rápido. Alta fricción. Datos estadísticos (género, edad, grupo poblacional) podrían ser opcionales.
- Uso de JS inline (`onsubmit`, `onclick`); aceptable en prototipo, no ideal para mantenimiento.

### Modal en Doc 2
- El modal de esta vista es distinto al del Doc 5 (aquí es corto con botón "Entendido"; en Doc 5 es completo con checkbox y "Aceptar/Cancelar"). **Inconsistencia entre vistas.**
- No tiene `role="dialog"` ni `aria-modal`, no gestiona foco (focus trap) ni cierra con `Esc`.

---

## Documento 3 — Conexión exitosa (temporizador)

### Funcional
- **[Crítico] Duración inconsistente.** El HTML muestra `40:00`, el `stroke-dashoffset` del SVG está calculado para otro valor y el JS arranca en `DURATION_MINUTES = 60`. Los tres valores no coinciden. Debe unificarse la duración real de la sesión.

### Accesibilidad
- **[Alto] Temporizador no accesible.** Se actualiza cada segundo sin anuncio para lectores de pantalla y sin aviso previo al cierre (p. ej. "quedan 5 minutos"). Cortar la sesión sin preaviso es mal patrón de usabilidad.
- **`viewbox` en minúsculas** en el SVG (lo correcto es `viewBox`, camelCase).
- **`alt` genérico:** "Campaña de prevención" no describe el contenido real del afiche.
- Imagen de campaña con `background-image` + `data-alt` (no accesible) y `mix-blend-luminosity` que puede reducir el contraste del texto.

---

## Documento 4 — Agradecimiento / calificación

### Accesibilidad (críticos)
- **[Crítico] Calificación por estrellas inaccesible y no funcional.** Son 5 `<span>` con ícono `star`, sin `<button>`, sin `role="radio"`/`radiogroup`, sin `aria-label` ("1 de 5"), sin foco ni evento. No se puede calificar por teclado, con lector de pantalla ni con mouse (no hay handler).
- **[Crítico] `<div>` dentro de `<h1>`.** `¡Gracias por navegar por la red<div>de la ciudadanía!</div>` es HTML inválido (bloque anidado en encabezado). Debe ser `<br>` o `<span>`.
- **[Crítico] Script de temporizador huérfano.** Esta vista copió el `<script>` del temporizador del Doc 3, pero no existen los elementos `timer-display` ni `timer-progress`. El script opera sobre `null` y lanza un error de JS que interrumpe el resto del `DOMContentLoaded`. Debe eliminarse.

### Usabilidad
- Las 5 estrellas aparecen rellenas por defecto, lo que sugiere 5/5 preseleccionado y sesga la calificación.
- No hay confirmación ni estado de selección tras "Calificar".

---

## Documento 5 — Modal de Política de Privacidad

### Correcto (la vista mejor lograda en accesibilidad)
- Tiene `role="dialog"`, `aria-modal="true"` y `aria-labelledby` al título.
- Botón cerrar con `aria-label="Cerrar modal"`.
- Checkbox con `id` + `<label for>`; el botón "Aceptar" arranca `disabled` y se habilita al marcar (buen patrón de consentimiento).
- Estados `focus:ring` presentes en botones y checkbox.

### Accesibilidad
- **[Alto] Contraste del botón "Aceptar política".** Blanco sobre `#E4032E` da aproximadamente 4.0–4.3:1, por debajo del 4.5:1 requerido para texto normal. Oscurecer el rojo (p. ej. `--govcolor-red #A80521`) o aumentar tamaño/peso del texto.
- **Banner informativo al límite:** `#5c3e41` sobre `#ffebee` ronda ~4.9:1; pasa AA pero conviene verificar.
- **Focus trap ausente:** con `role=dialog` pero el foco no queda atrapado dentro del modal ni se devuelve al disparador al cerrar; no cierra con `Esc`.

### Consistencia
- El rojo `#E4032E` de esta vista difiere del `secondary #bb0023` de las otras. **Inconsistencia de marca entre vistas.**

---

## Tabla priorizada de hallazgos

### Bloqueantes (accesibilidad / legal)

| ID | Vista | Hallazgo | Acción |
|----|-------|----------|--------|
| B-1 | Doc 4 | Estrellas de calificación no operables | Convertir en `<button>`/`radiogroup` con `aria-label` |
| B-2 | Doc 1 | Banner de video no operable | Convertir en `<button>` con `aria-label` y foco |
| B-3 | Doc 2 | Datos sensibles obligatorios (Ley 1581) | Hacer opcionales, "Prefiero no responder" por defecto |
| B-4 | Doc 4 | `<div>` dentro de `<h1>` (HTML inválido) | Reemplazar por `<br>` o `<span>` |
| B-5 | Doc 4 | Script de temporizador huérfano rompe JS | Eliminar el `<script>` sobrante |
| B-6 | Doc 5 | Contraste botón "Aceptar política" < 4.5:1 | Oscurecer rojo o ajustar tipografía |

### Altos (usabilidad / marca)

| ID | Vista | Hallazgo | Acción |
|----|-------|----------|--------|
| A-1 | Todas | No usa GOV.CO v5 ni paleta oficial | Migrar a componentes y variables GOV.CO |
| A-2 | Todas | Rojo usado como acción primaria | Usar color primario institucional |
| A-3 | Doc 2 | "Tipo de discapacidad" obligatorio con "No" | Mostrar condicionalmente |
| A-4 | Doc 3 | Temporizador con duración inconsistente y sin preaviso | Unificar duración; avisar antes de cerrar |
| A-5 | Todas | Inconsistencias (2 modales, 2 rojos, "WiFi Gratis"/"WiFi gratis") | Unificar componentes y textos |
| A-6 | Doc 2 | Radios sin foco visible | Añadir `focus-visible` |

### Medios

| ID | Vista | Hallazgo | Acción |
|----|-------|----------|--------|
| M-1 | Todas | Enlaces de pie vacíos (`href="#"`) | Enlazar destinos reales |
| M-2 | Varias | `data-alt` en imágenes; `alt` genéricos | Usar `alt` descriptivo real |
| M-3 | Docs 2 y 5 | Falta focus trap y cierre con `Esc` en modales | Implementar gestión de foco |
| M-4 | Todas | Tailwind CDN no apto para producción | Compilar CSS o migrar a GOV.CO v5 |

---

## Recomendaciones de siguiente paso

1. **Reconstruir las 5 vistas con GOV.CO v5** usando los componentes de `shared/components/` (formularios, modales, botones, alertas, pie de página), manteniendo el flujo del portal cautivo. Es la opción alineada con las directrices del proyecto.
2. **Alternativa mínima:** corregir solo los bloqueantes sobre el código actual (B-1 a B-6) sin cambiar el stack.

En ambos casos, definir dónde vivirán los archivos (landing de movilidad o CMS) y validar el resultado con `scripts/lint-accessibility.js`.

> Nota: La validación completa de accesibilidad requiere además pruebas manuales con tecnologías de asistencia (lector de pantalla, navegación por teclado) y revisión experta; este documento cubre lo verificable por inspección del código.
