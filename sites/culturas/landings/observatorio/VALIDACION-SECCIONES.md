# Validación de secciones — Observatorio (landings)

Lista de secciones y componentes identificados como potencialmente irrelevantes, redundantes o sin contenido real.  
Marcar con ✅ para conservar, ❌ para eliminar, o ✏️ para modificar.

---

## index.html (Inicio DEDE)

| # | Sección / Componente | Motivo de revisión | Decisión |
|---|---|---|---|
| 1 | Hero → aside "Ámbitos de trabajo" (mini-grid) | Decorativo. Repite info del párrafo sin enlaces ni datos concretos. | ☐ |
| 2 | Tarjeta 02 "Programas y proyectos" | Placeholder sin contenido. Solo muestra aviso de pendiente. | ☐ |
| 3 | Tarjeta 04 "Convocatorias" | Placeholder sin contenido. Solo muestra aviso de pendiente. | ☐ |
| 4 | Callout "Observatorio" (sección completa) | CTA duplicado: ya está en hero y en tarjeta 03. Triple repetición. | ☐ |
| 5 | Panel lateral "Publicaciones" (en Servicios e información) | Redundante: los mismos enlaces están en nav y en tarjeta 05. | ☐ |
| 6 | Notice "cuarto registro Margarita Cediel" | Nota interna de desarrollo, no contenido público. | ☐ |

---

## observatorio.html

| # | Sección / Componente | Motivo de revisión | Decisión |
|---|---|---|---|
| 7 | Hero → aside orbital (Datos / Artes / Saberes) | Decorativo sin función informativa ni interactiva. | ☐ |
| 8 | Sección "Cifras destacadas" (3 stats) | Datos sin fuente verificada ("por validar"). Riesgo de desinformación. | ☐ |
| 9 | Accordion "Historia del Observatorio" | Dice explícitamente que no tiene contenido. Placeholder vacío. | ☐ |
| 10 | Callout "La cultura también se mide" | Redundante: mismo CTA a mediciones.html ya presente en tarjeta 01. | ☐ |

---

## mediciones.html

| # | Sección / Componente | Motivo de revisión | Decisión |
|---|---|---|---|
| 11 | Hero → visual orbital (etiquetas flotantes) | Decorativo. Palabras sueltas sin función ni enlace. | ☐ |
| 12 | Sección "Cómo consultar la información" (4 pasos) | Contenido genérico/obvio tipo onboarding. No aporta valor. | ☐ |
| 13 | Panel "Fuentes de Financiación" (#detalle-financiacion) | Sin contenido real. Solo informa que está pendiente. | ☐ |
| 14 | Tarjeta 03 "Fuentes de Financiación" (en grid) | Enlaza a un ancla que solo muestra aviso de vacío. | ☐ |

---

## publicaciones.html

| # | Sección / Componente | Motivo de revisión | Decisión |
|---|---|---|---|
| 15 | Hero → portada CSS de "FARO" | Decorativa. No aporta info que no esté en el texto. | ☐ |
| 16 | Sección "Edición destacada" (featured) | Todos los campos "Pendiente de validación", botones disabled. | ☐ |
| 17 | 8 tarjetas "Edición por identificar" (catalogue-grid) | Placeholders idénticos sin contenido diferenciador. | ☐ |
| 18 | Sección "Información editorial" (3 tarjetas) | Requerimientos internos presentados como contenido público. | ☐ |
| 19 | catalogue-note (aviso amarillo) | Nota interna dirigida al equipo, no al usuario. | ☐ |

---

## otras-publicaciones.html

| # | Sección / Componente | Motivo de revisión | Decisión |
|---|---|---|---|
| 20 | Hero → visual orbital (ABORDA / MAPAS / ABUNDANCIA) | Decorativo. La misma info está en las tarjetas de recursos. | ☐ |
| 21 | Sección "Condiciones de consulta accesible" (3 tarjetas) | Lineamientos técnicos internos, no contenido para ciudadanía. | ☐ |
| 22 | fact-box "Antes de abrir un recurso" | Reglas internas presentadas como información pública. | ☐ |

---

## Patrones transversales

| Patrón | Ocurrencias | Recomendación |
|---|---|---|
| Placeholders "pendiente de validación" | #2, #3, #8, #9, #13, #14, #16, #17 | Eliminar hasta tener contenido real |
| Visuales orbitales/decorativos en hero | #1, #7, #11, #15, #20 | Evaluar si aportan identidad visual o solo ocupan espacio |
| CTAs duplicados en misma página | #4, #5, #10 | Conservar máximo 2 apariciones del mismo enlace |
| Notas internas como contenido | #6, #18, #19, #21, #22 | Mover a documentación interna o eliminar |
| Secciones genéricas tipo onboarding | #12 | Eliminar si el contenido es autoevidente |

---

## Instrucciones

1. Revisar cada ítem y marcar la columna "Decisión"
2. Devolver este archivo con las decisiones para proceder con la limpieza
3. Los ítems sin marcar se conservarán por defecto
