# Revisión e implementación — Micrositio Observatorio

**Micrositio:** Observatorio de las economías en las culturas, las artes y los saberes
**Entidad:** DEDE — Grupo de Gestión del Conocimiento / Oficina Asesora de Comunicaciones
**Ubicación del código:** `sites/culturas/landings/observatorio/` (landing para SharePoint)
**Estado general:** maquetado previo construido; en revisión y depuración de contenidos.
**Etapa actual:** definición previa al montaje — consolidando el **concepto de diseño**
(línea del Manual de identidad) y las decisiones de alcance. El montaje inicia al cerrar esta etapa.

> Este documento organiza la revisión y deja listo el plan de montaje. **No se ejecutan
> cambios en las páginas hasta contar con el concepto de diseño.**

---

## 0. Resumen ejecutivo

- **Qué hay:** el micrositio ya está maquetado (7 páginas). La DEDE entregó 5 mockups y
  una matriz de montaje con los contenidos definitivos de 5 secciones.
- **Qué se hizo:** revisión completa cruzando cada página contra su pestaña de la matriz.
  Los textos definitivos quedaron organizados y listos para incorporar.
- **Hallazgo clave:** no es relleno de texto. Las páginas fueron construidas con otra
  estructura y otra identidad visual (paleta propia, no GOV.CO v5); hay que reestructurar
  y resolver la identidad. Publicaciones cambia de orden (Herramientas pasa antes de
  Ediciones) y absorbe el contenido de "Otras Publicaciones" y "Herramientas".
- **Etapa de definición previa al montaje (insumos a consolidar con la DEDE):**
  1. El **concepto de diseño / Manual de identidad** (insumo principal).
  2. Los **5 mockups (PNG)** cargados en `insumos/`.
  3. Las **URLs públicas** de los recursos (hoy apuntan a carpetas SharePoint internas).
  4. La respuesta a las **9 decisiones (D1–D9)** — ver `ACTA-DECISIONES-MESA.md`.
  Esta etapa es parte natural del flujo de trabajo articulado entre equipos; al cerrarla
  se habilita el montaje.
- **Esfuerzo estimado de montaje:** ~11–17 días hábiles una vez cerrada la etapa de
  definición (ver sección 7, incluye 40% de holgura). Es una estimación preliminar, no
  una fecha comprometida.

---

## 1. Insumos recibidos y faltantes

| Insumo | Estado | Observación |
|---|---|---|
| Hoja "Instrucciones generales" de la matriz | ✅ Recibida (texto) | Reglas de oro y cambios prioritarios documentados. |
| Pestaña "Observatorio" de la matriz | ✅ Recibida (texto) | 9 bloques definidos. |
| Pestaña "Mediciones" de la matriz | ✅ Recibida (texto) | 7 bloques definidos. |
| Pestaña "Publicaciones" de la matriz | ✅ Recibida (texto) | 17 bloques (incluye 6 mapas). |
| Pestaña "Investigaciones" de la matriz | ✅ Recibida (texto) | 16 bloques. |
| Pestaña "Repositorio" de la matriz | ✅ Recibida (texto) | 36 bloques (muchos PDF). |
| Contenido de las 5 pestañas de la matriz | ✅ Recibido (texto) | Observatorio, Mediciones, Publicaciones, Investigaciones y Repositorio documentados fila por fila. |
| 5 mockups (PNG) | ✅ Recibidos y revisados | Cargados en `insumos/`. Confirman estructura, identidad visual y buscador. |
| Mockup de Mediciones | ✅ Recibido (es el nº 2) | Responde D5: Mediciones sí tiene propuesta visual. |
| Concepto de diseño / identidad visual | ✅ Resuelto en los mockups | Morado Culturas + azul oscuro + amarillo, logo Culturas, barra GOV.CO. Ver D6. |
| BRIEF aprobado (Comunicaciones) | ✅ Recibido e integrado | Formato para solicitar contenido al Grupo de Divulgación y Prensa. Ver sección 9. |
| Matriz Excel (archivo) | ⏳ Pendiente | El contenido ya está integrado; falta el `.xlsx` versionado en `insumos/`. |
| Recursos (PDF, imágenes, gráficos) | ⏳ Pendientes | En carpetas SharePoint; falta URL pública de cada uno. |

---

## 2. Páginas existentes vs. alcance de la matriz

La matriz y los mockups cubren **5 secciones**: Observatorio, Mediciones,
Publicaciones, Investigaciones y Repositorio.

El micrositio actual tiene **7 páginas**, dos de las cuales no están en el alcance:

| Página actual | ¿En matriz/mockups? | Decisión pendiente |
|---|---|---|
| `observatorio.html` | Sí | Reestructurar a 9 bloques. |
| `mediciones.html` | Sí (pestaña, sin mockup propio) | Aplicar cambio prioritario (Cuadernillo ECC 2025). |
| `publicaciones.html` | Sí | Reordenar a la nueva secuencia. |
| `investigaciones.html` | Sí | Ajustar a mockup. |
| `repositorio.html` | Sí | Ajustar a mockup. |
| `otras-publicaciones.html` | **No** | ¿Eliminar, ocultar o fusionar? |
| `herramientas.html` | **No** | ¿Eliminar, ocultar o fusionar? En Publicaciones la matriz menciona "Herramientas" como bloque. |

---

## 3. Decisiones pendientes (requieren DEDE / Comunicaciones)

> Estas decisiones condicionan qué se elimina. No ejecutar sin respuesta.

- **D1. Menú de navegación.** ✅ **RESUELTA por el brief:** el alcance oficial son
  **4 líneas estratégicas** (Mediciones, Publicaciones, Investigaciones, Repositorio)
  más la vista de inicio Observatorio. El menú queda en esos 5 ítems; "Otras Publicaciones"
  y "Herramientas" se retiran.
- **D2. Páginas fuera de alcance.** ¿`otras-publicaciones.html` y `herramientas.html`
  se eliminan, se conservan ocultas, o su contenido se integra en otra sección?
  **Actualización (pestaña Publicaciones):** la matriz absorbe su contenido dentro de
  Publicaciones — Herramientas (Fuentes de Financiación + Propiedad Intelectual) como
  franja propia, y Revistas (La Abundancia, Tierra de Aguas) + Mapas (Story Maps) como
  secciones. Esto deja ambas páginas sin contenido propio. Decisión recomendada:
  **eliminar del menú y fusionar su contenido en Publicaciones.**
  ✅ **RESPALDADA por el brief:** el alcance oficial son solo las 4 líneas; ambas páginas
  no son líneas estratégicas, así que se integran/retiran. Procede la fusión en Publicaciones.
- **D3. Cifras destacadas (Observatorio).** La pestaña Observatorio de la matriz no
  incluye el bloque de 3 cifras. ¿Se elimina o se conserva verificando fuentes?
- **D4. Destino de botones del banner (Observatorio).** La matriz pide confirmar el
  destino real de "Explorar contenidos" y "Conocer el Observatorio".
- **D5. Mediciones sin mockup propio.** ✅ **RESUELTA al revisar los mockups:** el
  mockup nº 2 ("Mockup del Observatorio de Economías Culturales") es en realidad la
  propuesta de **Mediciones** (banner, "¿Qué es?", tablero CSECC con cifras, Cuadernillo
  ECC 2025). Mediciones sí tiene propuesta visual definida.
- **D6. Concepto de diseño.** ✅ **En gran parte RESUELTA al revisar los mockups:** la
  identidad visual está definida en las 5 pantallas — morado Culturas, azul oscuro,
  amarillo/dorado, logo "Culturas", barra GOV.CO superior, tipografía redondeada, e íconos
  ilustrados. Incluye el banner inferior "Información que inspira decisiones" (azul oscuro).
  Queda por confirmar solo si esa identidad se formaliza en un Manual y si se migra a
  tokens GOV.CO v5 o se mantiene como línea propia del Observatorio.
  ⚠️ **MATIZ del brief:** la línea gráfica es **NUEVA** y debe articularse con el **nuevo
  Manual de identidad visual del Ministerio**, con validación del **Grupo de Divulgación y
  Prensa**. Es decir, los mockups orientan, pero el concepto gráfico definitivo lo cierra
  ese grupo. D6 pasa a depender de Divulgación y Prensa, no solo de la DEDE.
- **D7. Diferenciación Repositorio vs. Investigaciones.** Ambas secciones comparten un
  "¿Qué es?" casi idéntico y las mismas tipologías documentales (artículos, diagnósticos,
  entrevistas). Definir con la DEDE qué contenido vive en cada una para evitar duplicación.
- **D8. Clasificaciones "propuestas" en Repositorio.** Las agrupaciones de Investigaciones
  y Estímulos (Artículos, Diagnósticos, Entrevistas, Prácticas y saberes, etc.) están
  marcadas como "Texto propuesto" / "validar con el equipo": requieren visto bueno antes de montar.
- **D9. Notas/placeholders visibles al público.** Varias secciones traen texto "Recursos en
  desarrollo..." o notas editoriales ("se habilitarán progresivamente"). Confirmar si son
  visibles al público o se ocultan hasta tener contenido real.

---

## 4. Comparación detallada — Observatorio (inicio)

Estructura objetivo según pestaña "Observatorio" de la matriz (orden de arriba
hacia abajo):

| Orden | Bloque | Estado actual en `observatorio.html` | Acción |
|---|---|---|---|
| 1 | Menú (5 ítems) | Menú con 7 ítems | Ajustar según D1. |
| 2 | Banner principal (título + bajada + 2 botones) | Presente; textos coinciden literal | Confirmar destino de botones (D4). |
| 3 | Objetivo (2 párrafos exactos) | Hay sección "Objetivos" con 3 tarjetas (Divulgar/Integrar/Fortalecer) | Reemplazar por el bloque de 2 párrafos de la matriz. |
| 4 | Encabezado "Líneas estratégicas del Observatorio" | Presente; subtítulo habla de "cinco ejes" | Ajustar a 4 tarjetas 2×2. |
| 5–8 | 4 tarjetas: Mediciones, Publicaciones, Investigaciones, Repositorio | Hay 6 tarjetas con otros textos y CTAs | Dejar 4 tarjetas con textos/CTAs de la matriz. |
| 9 | Banner inferior "Información que inspira decisiones" + CTA | No existe | Crear; depende del concepto de diseño (D6). |

**Bloques actuales no previstos en la matriz (candidatos a retirar/fusionar):**
- "¿Qué es el Observatorio?" — su texto coincide con el Objetivo de la matriz; se fusiona en el bloque 3.
- "Cifras destacadas" (3 stats) — decisión D3.
- "Información institucional" (acordeón, con "Historia del Observatorio" vacío) — placeholder; retirar hasta tener contenido.

**Textos definitivos (matriz, pestaña Observatorio) — listos para montar:**
- Banner, título: "Observatorio de las economías en las culturas, las artes y los saberes".
- Banner, bajada: "Generamos, sistematizamos y divulgamos información para comprender las dimensiones económicas, sociales y territoriales del sector cultural en Colombia."
- Objetivo (2 párrafos): "Es una plataforma a través de la cual se divulga información estratégica de las economías culturales en el país." / "Brinda insumos como mediciones, publicaciones, investigaciones, mapas y tableros, para fortalecer el conocimiento sectorial y la toma de decisiones de los diferentes actores."
- Tarjetas (título + texto + CTA):
  - Mediciones — "Información cuantitativa y análisis del sector." — CTA "Ir a Mediciones".
  - Publicaciones — "Documentos, informes y recursos de referencia." — CTA "Ir a Publicaciones".
  - Investigaciones — "Estudios, análisis y trabajos de investigación." — CTA "Ir a Investigaciones".
  - Repositorio — "Acceso a datos, herramientas y materiales del Observatorio." — CTA "Ir a Repositorio".
- Banner inferior: título "Información que inspira decisiones" / texto "Explora estudios, investigaciones y análisis sobre las dinámicas culturales, creativas, populares y comunitarias del país." / CTA "Explorar contenido".

**Enlaces/recursos pendientes en esta pestaña:**
- Imagen del banner principal: ruta en SharePoint (no es URL pública). Pendiente URL final.
- Ilustraciones de las 4 tarjetas: según mockup.

---

## 5. Comparación detallada — resto de secciones

> Las cinco pestañas de la matriz están integradas. Comparación de cada página
> contra su pestaña, con textos literales y verificaciones pendientes.

### Mediciones (`mediciones.html`) — comparación detallada

Estructura objetivo según pestaña "Mediciones" de la matriz (7 bloques):

| Orden | Bloque | Estado actual en `mediciones.html` | Acción |
|---|---|---|---|
| 1 | Menú (ítem Mediciones activo) | Presente | Mantener; ajustar menú global según D1. |
| 2 | Banner principal (título + descripción + 2 botones) | Presente; botones "Consultar mediciones" / "Volver al Observatorio" | Alinear textos a la matriz; imagen de banner pendiente (SharePoint). |
| 3 | "¿Qué es?" (2 párrafos) | Presente, pero con 4 párrafos + aside "Objetivo" con lista | Reemplazar por los 2 párrafos de la matriz. **Texto "Por validar"**: el mockup reciente muestra versión abreviada; confirmar si se conserva completo o se acorta. |
| 4 | CSECC (título + descripción + CTA "Explorar tablero CSECC") | Presente, con placeholder de dashboard Power BI | Mantener tablero; **cifras del mockup son referenciales, NO publicar sin validación.** |
| 5 | **Cuadernillo ECC** (título + CTA "Explorar cuadernillo") | La página tiene sección ECC con placeholder de dashboard | **Cambio prioritario:** SUSTITUIR el tablero ECC por el Cuadernillo (tarjeta de texto a la izquierda + portada turquesa "Cuadernillo Encuesta de Consumo Cultural 2025" a la derecha). |
| 6 | Descripción "Encuesta de Consumo Cultural" (párrafo largo) | Texto actual más breve | Reemplazar por el texto de la matriz (según mockup). |
| 7 | Banner inferior "Información que inspira decisiones" + CTA | No existe como tal | Crear; depende del concepto de diseño (D6). Mismo bloque que en Observatorio. |

**Bloques actuales no previstos en la matriz (candidatos a retirar/fusionar):**
- "Otras mediciones" (franja "Contenido en desarrollo") — placeholder; retirar hasta tener contenido.
- "Acceso rápido" (2 tarjetas CSECC/ECC) — no figura en la matriz; confirmar si se retira o se mantiene como navegación interna.
- Aside "Objetivo" con lista de viñetas — no está en la matriz; se absorbe en el bloque "¿Qué es?".

**Textos definitivos (matriz, pestaña Mediciones) — listos para montar:**
- Banner, bajada: "Consulta sistemas de información, indicadores, visualizaciones y herramientas de análisis relacionadas con las economías culturales, creativas y de los saberes en Colombia."
- "¿Qué es?" (2 párrafos): "Integramos sistemas de información, indicadores, visualizaciones y herramientas de análisis relacionadas con la medición de las economías culturales, creativas y de los saberes en Colombia." / "Fortalecemos la circulación de datos e indicadores que permitan comprender las dinámicas económicas del sector cultural y creativo facilitando la toma de decisiones, el análisis sectorial y la apropiación de información estratégica por parte de diferentes públicos." _(Estado: Por validar — posible versión abreviada.)_
- CSECC: "Cuenta Satélite de Cultura y Economía Creativa (CSECC)" / "Medición económica de las actividades y productos asociados a la cultura y la economía creativa en Colombia." — CTA "Explorar tablero CSECC".
- Cuadernillo ECC: "Cuadernillo Encuesta de Consumo Cultural" / "Documento principal con los resultados, análisis y hallazgos de la Encuesta de Consumo Cultural en Colombia." — CTA "Explorar cuadernillo".
- Descripción ECC (párrafo largo): disponible literal en la matriz (bloque 6), según mockup.
- Banner inferior: título "Información que inspira decisiones" / texto "Explora estudios, investigaciones y análisis sobre las dinámicas culturales, creativas, populares y comunitarias del país." / CTA "Explorar contenido".

**Enlaces/recursos pendientes en esta pestaña:**
- Imagen del banner (bloque 2): carpeta SharePoint, falta URL pública final.
- Recurso del bloque "¿Qué es?": archivos CSV de la CSECC en SharePoint (para tablero).
- Tablero CSECC (bloque 4): recurso del equipo; falta URL del tablero.
- Portada y PDF del Cuadernillo ECC (bloque 5): carpeta SharePoint, falta URL pública.
- Confirmar D5 (Mediciones no tiene mockup propio en el set de 5).

### Publicaciones (`publicaciones.html`) — comparación detallada

**Cambio prioritario — nueva secuencia obligatoria:**
Banner principal → **Herramientas** → Ediciones (FARO) → Revistas → Mapas para ilustrar la cultura → Cierre.

Estructura objetivo según pestaña "Publicaciones" de la matriz (17 bloques):

| Orden | Bloque | Estado actual en `publicaciones.html` | Acción |
|---|---|---|---|
| 1 | Menú (ítem Publicaciones activo) | Presente | Mantener; ajustar menú global según D1. |
| 2 | Banner principal (título + descripción + 2 botones "Explorar publicaciones" / "Conocer el Observatorio") | Presente, con otra bajada y botones "Conocer Revista Faro" / "Otros recursos" | Alinear textos/botones a la matriz; imagen de banner pendiente (SharePoint). |
| 3 | **Herramientas** — franja "Recursos para fortalecer la gestión cultural" | **No existe aquí** (vive en `herramientas.html`) | **IMPORTANTE:** crear sección ANTES de Ediciones, justo tras el banner. Resuelve parte de D2. |
| 4 | Herramientas — tarjeta "Fuentes de Financiación" (CTA "Consultar guía") | En `herramientas.html` | Traer como primera tarjeta de herramientas. |
| 5 | Herramientas — tarjeta "Propiedad Intelectual" (CTA "Consultar guía") | En `herramientas.html` | Traer como segunda tarjeta. |
| 6 | Ediciones — título + CTA "Ver todas las ediciones" | Sección "Ediciones" presente | Reordenar DESPUÉS de Herramientas. |
| 7 | Ediciones — galería Revista FARO (portada, número, año, CTA "Consultar edición") | Tarjetas con "Contenido editorial pendiente" y ediciones ocultas | Completar portadas/años/enlaces. **Cada portada su propio PDF; NO un único enlace para todas.** |
| 8 | Revistas — título de sección | No existe como sección aparte | Crear después de Ediciones. |
| 9 | Revistas — tarjeta "La Abundancia" (roja, CTA "Explorar revista") | Existe en `otras-publicaciones.html` como recurso | Traer a Publicaciones. |
| 10 | Revistas — tarjeta "Tierra de Aguas, Bioculturalidades en La Mojana" (verde, CTA "Ver publicación") | Existe en `otras-publicaciones.html` | Traer a Publicaciones. |
| 11 | Mapas — título "Mapas para ilustrar la cultura" (párrafo largo, CTA "Ver todos los mapas") | Existe en `otras-publicaciones.html` (Story Maps) | Traer; 5 tarjetas horizontales en una fila. |
| 12–16 (+1) | Mapas — 6 tarjetas de mapa (Story Maps ArcGIS) | Parcialmente en `otras-publicaciones.html` | Montar las 6 con sus enlaces; **confirmar que cada mapa exista y abra antes de habilitar.** |
| 17 | Cierre — "Continúa explorando el Observatorio" (CTA "Ir a Mediciones" / "Ir a Investigaciones") | Existe franja relacionada similar | Alinear textos y CTAs a la matriz. |

> La sección Mapas aparece en la matriz con numeración de bloque inconsistente
> (01, 02, 06, 07 Mapas) y una fila de orden en blanco: son **6 tarjetas de mapa**
> en total. Confirmar el orden exacto con el mockup redistribuido.

**Las 6 tarjetas de Mapas (Story Maps):**
1. Diversidad Biocultural en el Río Magdalena — `storymaps.arcgis.com/stories/d6c4fa69899b480a9d061ac050593621`
2. Turismo Cultural y Comunitario (Santa María la Antigua del Darién, Unguía y Acandí) — `.../1bcf9b4ef89545a1a553ebe5e9357352`
3. Mapa de Coca — `.../9748dbde131649b6b94b538f3bce0bcb`
4. Estación de la Sabana — `.../7c1b1f28544d42b8bd158e5841d65472`
5. Colombia Biocultural — `.../f7027cf16e664b898a2779c3c3ddf043`
6. Turismo Cultural y Comunitario en el Norte del Tolima — `.../03b5e728a07a4c06b70f19ae559fc87f`

**Textos definitivos (matriz, pestaña Publicaciones) — listos para montar:**
- Banner, bajada: "Consulta documentos, publicaciones y recursos que reúnen análisis, experiencias y datos clave sobre las economías culturales, creativas y de los saberes en Colombia."
- Herramientas, franja: "Recursos para fortalecer la gestión cultural" / "Consulta guías prácticas y contenidos especializados para orientar decisiones, fortalecer capacidades y apoyar la sostenibilidad del sector cultural."
- Herramientas, "Fuentes de Financiación": "Guía práctica para orientar a los agentes del sector cultural en la identificación y acceso a fuentes de financiación disponibles en Colombia."
- Herramientas, "Propiedad Intelectual": "Guía práctica para proteger y valorar la creación en las culturas, las artes y los saberes."
- Ediciones: "Publicaciones y documentos desarrollados por el Observatorio." — CTA "Ver todas las ediciones".
- Revistas: "Revistas especializadas que analizan y reflexionan sobre diversos temas culturales."
- Revistas, "La Abundancia": "Las economías culturales, comunitarias y populares de Colombia le hablan al mundo."
- Revistas, "Tierra de Aguas...": "Exploración de la relación entre agua, territorio y comunidades."
- Mapas, intro: párrafo largo disponible literal en la matriz (bloque 11).
- Cierre: "Continúa explorando el Observatorio" / "Encuentra más información estratégica sobre las economías en las culturas, las artes y los saberes."

**Enlaces/recursos pendientes y verificaciones:**
- Imagen del banner (bloques 1–2): carpeta SharePoint, falta URL pública final.
- Portadas y PDF de las guías de Herramientas (Fuentes de Financiación, Propiedad Intelectual): carpetas SharePoint. **Nota: la URL de Propiedad Intelectual aparece duplicada/concatenada en la matriz — depurar.**
- Galería FARO (bloques 6–7): carpeta SharePoint; **cada edición necesita su propio PDF** (números, años y vínculos por completar).
- Revistas La Abundancia / Tierra de Aguas (bloques 9–10): carpetas SharePoint, falta URL pública.
- 6 mapas Story Maps (bloques 12–16+1): enlaces ArcGIS ya presentes; **verificar que cada uno abra** antes de habilitar.
- **Relación con D2:** al traer Herramientas, La Abundancia, Tierra de Aguas y los Mapas a Publicaciones, las páginas `herramientas.html` y `otras-publicaciones.html` quedan vaciadas de contenido → refuerza la decisión de eliminarlas o fusionarlas.

### Investigaciones (`investigaciones.html`) — comparación detallada

Estructura objetivo según pestaña "Investigaciones" de la matriz (16 bloques):

| Orden | Bloque | Estado actual | Acción |
|---|---|---|---|
| 1 | Menú + buscador (ítem Investigaciones activo) | Menú presente, sin buscador | Activar buscador "si es técnicamente viable" (según mockup). |
| 2 | Banner "Investigaciones y Estudios" (descripción + 2 botones "Escuelas Taller" / "Economías de la Fiesta") | Hero presente | Alinear a la matriz; botones llevan a anclas internas. Imagen pendiente (SharePoint). |
| 3 | "¿Qué es?" (2 párrafos) | Presente | Reemplazar por los 2 párrafos de la matriz. **Mostrar en bloque simple, sin recuadro azul de objetivo.** |
| 4 | Investigación destacada "Economías culturales de la Fiesta" (CTA "Consultar documento" + "Autodiagnóstico para Fiestas") | Parcial | PRIMERA tarjeta destacada. El autodiagnóstico requiere **enlace independiente**. PDF "Cultura festiva_online.pdf" en SharePoint. |
| 5 | Investigación destacada "Evaluación Escuelas Taller" (CTA "Consultar documento") | Parcial | SEGUNDA tarjeta destacada. Documento **"En construcción"**. |
| 6 | Casos de estudio piloto — título | — | **Texto "Por validar"** ("Recursos en desarrollo..."); confirmar vigencia de la referencia temporal. |
| 7–10 | 4 tarjetas piloto (Fiesta de la Afrocolombianidad, Festival de la Expresión Cultural del Mar y del Volcán, Festival del Mango, Día del Pescador Artesanal) | — | **Solo habilitar si hay contenido publicado y datos territoriales verificados.** Todas "Por validar". |
| 11–15 | "Otras investigaciones asociadas" — título + 4 tarjetas | — | Tarjetas con texto placeholder "Recursos en desarrollo..."; **verificar existencia y URL de cada documento.** |
| 16 | Cierre "Continúa explorando el Observatorio" (CTA "Ir a Mediciones" / "Ir a Publicaciones") | Franja relacionada presente | Alinear a la matriz. |

**Textos definitivos (matriz, Investigaciones) — listos para montar:**
- Banner, bajada: "Documentos técnicos, diagnósticos, evaluaciones y producción de conocimiento del Grupo de Gestión del Conocimiento de la Dirección de Estrategia, Desarrollo y Emprendimiento."
- "¿Qué es?" (2 párrafos): disponibles literal en la matriz (bloque 3).
- "Economías culturales de la Fiesta" y "Evaluación Escuelas Taller": descripciones largas literales en la matriz (bloques 4–5).
- Cierre: "Continúa explorando el Observatorio" / "Consulta mediciones, publicaciones y herramientas de gestión cultural."

**Pendientes y verificaciones:**
- Imagen del banner: carpeta SharePoint, falta URL pública.
- PDF "Economías culturales de la Fiesta": en SharePoint; autodiagnóstico con enlace propio (falta URL).
- "Evaluación Escuelas Taller": documento en construcción.
- Bloques 6–15: casi todos "Por validar" / placeholder "Recursos en desarrollo...". **No publicar hasta tener contenido y URLs reales.**

### Repositorio (`repositorio.html`) — comparación detallada

Estructura objetivo según pestaña "Repositorio" de la matriz (36 bloques, agrupados):

| Grupo | Bloque | Contenido | Estado |
|---|---|---|---|
| 1 | Menú + buscador | Ítem Repositorio activo + buscador | Según mockup. |
| 2 | Banner "Repositorio" (descripción + 2 botones "Explorar contenidos" / "Volver al Observatorio") | — | Imagen de banner en SharePoint. |
| 3 | "¿Qué es?" (2 párrafos) | — | **Por validar:** revisar diferenciación frente a Investigaciones (texto muy similar). |
| 4 | **Trabajo en red** — encabezado + tarjetas | Red Nacional de Observatorios de Cultura (PDF), Red Internacional de Observatorios (2 PDF: Caracterización + Declaración de Cali) | PDF identificados en SharePoint. |
| 5 | **Investigaciones** — agrupación por tipo | Artículos (PDF: Cultura Festiva, Ritzy Medina), Diagnósticos (PDF: Economía Popular 2023 IPSOS), Entrevistas (PDF: DENAJI) | PDF identificados. |
| 6 | **Estímulos 2022–2023** — agrupación temática | Prácticas y saberes ancestrales, Participación/género/territorio, Relatos y memorias territoriales | Ver lista de PDF abajo. |
| 7 | Cierre | Nota editorial + franja "Continúa explorando" + pie institucional | **Nota "Por validar":** confirmar si visible al público. |

**Agrupaciones de Estímulos 2022–2023 y sus PDF (SharePoint):**
- *Prácticas y saberes ancestrales:* "De 'jutes' y saberes ancestrales"; "KIRIGAI – MI (tejidos y cestería)"; "Las dulces historias del bocadillo" _(sin URL asignada)_.
- *Participación, género y territorio:* "Destejer el silencio (Antioquia)"; "Permítame María (Ariguaní / San Jacinto)"; "Paisaje Cultural Guajiro".
- *Relatos y memorias territoriales:* "Bailes cantaos del palenque de Uré"; "Raíces vivas (Potosí)"; "Relatos entre montañas"; "Todos por la preservación del carnaval de los matachines (Guapi)" _(sin URL asignada)_.
- *Resultados de los estímulos:* tarjeta reservada para informes generales futuros (sin PDF).

**Textos definitivos (matriz, Repositorio) — listos para montar:**
- Banner, bajada: "Informes estratégicos, reportes institucionales y documentos de seguimiento sectorial para fortalecer la circulación de información y el acceso a análisis culturales."
- "¿Qué es?" (2 párrafos): literal en la matriz (bloque 3).
- Encabezados y descripciones de Trabajo en red, Investigaciones, Estímulos: literales en la matriz.
- Nota de cierre: "Los contenidos de esta sección se habilitarán progresivamente a medida que se validen los recursos documentales."

**Pendientes y verificaciones:**
- Imagen del banner: carpeta SharePoint, falta URL pública.
- **2 PDF sin URL asignada:** "Las dulces historias del bocadillo" (bloque 24) y "Todos por la preservación del carnaval de los matachines" (bloque 33).
- **Verificar título literal contra el PDF** en todos los documentos de Estímulos (la matriz lo exige fila por fila).
- Numeración de la matriz salta del bloque 16 al 19 (no hay 17–18): confirmar que no falte contenido.
- La columna "Nombre exacto PDF en SharePoint" repite "Caracterización red nacional" en bloques 6, 8 y 9 (posible error de la matriz): depurar antes de vincular.
- Varias agrupaciones ("Artículos", "Diagnósticos", "Entrevistas", clasificación temática de Estímulos) están marcadas "Texto propuesto" / "clasificación propuesta, validar con el equipo": requieren visto bueno de la DEDE.
- **Diferenciación Repositorio vs. Investigaciones:** ambos bloques "¿Qué es?" son casi idénticos y comparten tipologías documentales. Definir con la DEDE qué va en cada sección para no duplicar.

---

## 6. Observaciones transversales

- **Identidad visual:** las páginas usan una paleta propia (variables `--obs-*`:
  azul `#1a2744`, morado `#5a2a83`, amarillo `#f4c542`) y Nunito Sans, no la paleta
  GOV.CO v5 oficial (`--govcolor-cobalt` #0943B5, etc.). El concepto de diseño debe
  definir si se migra a tokens GOV.CO v5 o se conserva la identidad del Observatorio.
- **Componentes:** la regla del proyecto pide usar los componentes de
  `shared/components/` (GOV.CO v5). Las páginas actuales usan clases propias
  (`access-card`, `stat-card`, `faro-card`, etc.). A decidir en el concepto de diseño.
- **Placeholders a eliminar antes de publicar:** "Historia del Observatorio" (vacío),
  ediciones Faro con "contenido pendiente", dashboards CSECC/ECC reservados,
  "Otras mediciones" en desarrollo.
- **Accesibilidad:** verificación final pendiente (teclado, lector de pantalla,
  contraste, auditoría) una vez estabilizado el contenido.
- **Enlaces/botones:** auditar que ningún CTA apunte a carpetas internas de SharePoint;
  confirmar acceso público y apertura de cada PDF/tablero/mapa.
- **Buscador (hallazgo de los mockups):** Mediciones, Publicaciones, Investigaciones y
  Repositorio muestran un buscador en el menú ("Buscar en el Observatorio..."). La matriz
  lo condiciona a "si es técnicamente viable". En una landing de SharePoint un buscador
  real requiere definición técnica (alcance de indexación); confirmar si es buscador
  funcional o solo elemento visual. Observatorio (inicio) no lo lleva.
- **Identidad visual (hallazgo de los mockups):** la línea gráfica está definida y es
  coherente en las 5 pantallas. La paleta de los mockups coincide con la familia de la
  paleta propia actual (`--obs-*`), lo que reduce el retrabajo frente a una migración total.

---

## 7. Plan de ejecución (cuando llegue el concepto de diseño)

Orden sugerido, sección por sección, verificando cada página contra su mockup.

> **Nota sobre los tiempos:** la estimación en días hábiles es **preliminar** y asume que
> la etapa de definición (concepto de diseño, mockups, URLs públicas y decisiones D1–D9)
> ya está cerrada. El reloj empieza cuando esa etapa concluye; no es una fecha comprometida.

> Las estimaciones incluyen un **40% de holgura** sobre el cálculo base.

| # | Fase | Estimación | Depende de |
|---|---|---|---|
| 1 | **Base compartida.** Resolver identidad visual (tokens GOV.CO v5 vs. paleta Observatorio), actualizar `partials/` (head, header/menú, footer). | 1,5–3 días | D1, D6 |
| 2 | **Observatorio (piloto).** Reestructurar a los 9 bloques de la matriz. | 1,5–3 días | D3, D4 |
| 3 | **Mediciones.** Cambio prioritario (Cuadernillo ECC 2025) + pestaña de matriz. | 1,5 días | D5, URLs |
| 4 | **Publicaciones.** Reordenar a la nueva secuencia; integrar Herramientas, Revistas y Mapas. | 3–4 días | D2, URLs, mapas |
| 5 | **Investigaciones.** Ajustar a mockup + matriz. | 1,5 días | D9, URLs |
| 6 | **Repositorio.** Ajustar a mockup + matriz (muchos PDF). | 1,5–3 días | D7, D8, URLs |
| 7 | **Depuración de alcance.** Resolver `otras-publicaciones.html` y `herramientas.html`. | ~0,7 día | D2 |
| 8 | **Auditoría final.** Enlaces públicos, accesibilidad (teclado, lector de pantalla, contraste) y revisión editorial/funcional. | 1,5 días | — |

**Total estimado:** ~11–17 días hábiles de montaje efectivo (incluye 40% de holgura), sin
contar los tiempos de validación de contenidos por parte de la DEDE ni la espera de
insumos. Publicaciones y Observatorio son las fases más pesadas (reestructuración mayor).

---

## 8. BRIEF aprobado (DEDE → Grupo de Divulgación y Prensa)

El brief es el "Formato para solicitar contenido al Grupo de Divulgación y Prensa",
aprobado por Comunicaciones. Formaliza el proyecto y aporta definiciones que estaban
abiertas. Puntos relevantes para la implementación:

- **Programa:** DEDE — Grupo de Gestión del Conocimiento de Economías Culturales.
- **Tipo de solicitud:** Digital + Diseño + Estrategia de comunicaciones. Público: externo
  (agentes del sector, gestores, academia, entidades territoriales, tomadores de decisiones,
  ciudadanía) e interno (áreas del Ministerio).
- **Alcance oficial = 4 líneas estratégicas** + vista de inicio Observatorio:
  **Mediciones · Publicaciones · Investigaciones · Repositorio.** Declaración formal que
  respalda D1 y D2 (Otras Publicaciones y Herramientas no son líneas del micrositio).
- **Origen del rediseño:** diagnóstico estructural que identificó accesos inactivos,
  redundancia de contenidos, baja jerarquía visual, ausencia de arquitectura modular,
  desactualización y falta de articulación entre mediciones, publicaciones e investigaciones.
  (Coincide con lo que encontramos en la revisión del código.)
- **Estado declarado:** contenidos, recursos, enlaces y propuesta de organización **ya
  remitidos al webmaster** para implementación. Fase actual: implementación técnica +
  revisión comunicativa/gráfica + nueva propuesta de diseño.
- **Línea gráfica: NUEVA.** Debe articularse con el **nuevo Manual de identidad visual del
  Ministerio**. Estética contemporánea, clara y modular; coherencia entre secciones;
  recursos que identifiquen las 4 líneas; prioridad a fotografía de culturas, territorios,
  saberes y comunidades.
- **Actor nuevo: Grupo de Divulgación y Prensa** (enlace: Jazmín Rodríguez Céspedes).
  La DEDE le solicita acompañamiento para validar la propuesta visual/comunicativa,
  fortalecer la presentación gráfica, orientar banners/fotografías/mensajes y acompañar la
  revisión previa a la publicación.
- **Fecha de publicación:** "por definir de manera articulada con el webmaster y el Grupo
  de Divulgación y Prensa". Respalda el enfoque de cronograma condicionado.
- **Mensajes clave:** (1) conocimiento para la toma de decisiones; (2) información accesible
  y organizada; (3) diversidad cultural y territorial.

**Implicación para el equipo web (webmaster):** la implementación técnica (montaje de
contenidos según matriz y mockups) es nuestra; la **línea gráfica definitiva depende del
Grupo de Divulgación y Prensa** y su articulación con el nuevo Manual de identidad. Es decir,
la "etapa de definición" tiene ahora un responsable claro para el concepto gráfico.

---

## 9. Bitácora

| Fecha | Nota |
|---|---|
| 2026-10-20 | Revisión inicial. Documentados insumos, comparación de Observatorio contra la matriz, decisiones pendientes y plan. A la espera del concepto de diseño y de las pestañas faltantes de la matriz. |
| 2026-10-20 | Integrada la pestaña "Mediciones" (7 bloques) con comparación detallada, textos literales y recursos pendientes. Quedan por recibir: Publicaciones, Investigaciones y Repositorio. |
| 2026-10-20 | Integrada la pestaña "Publicaciones" (17 bloques, incl. 6 mapas). Nueva secuencia obligatoria con Herramientas antes de Ediciones. Aclara D2: Herramientas y Otras Publicaciones se fusionan en Publicaciones. Quedan por recibir: Investigaciones y Repositorio. |
| 2026-10-20 | Integradas las pestañas "Investigaciones" (16 bloques) y "Repositorio" (36 bloques). **Las 5 secciones de la matriz quedan documentadas.** Añadidas decisiones D7 (diferenciación Repositorio/Investigaciones), D8 (clasificaciones propuestas) y D9 (notas/placeholders visibles). Siguen pendientes los 5 mockups (PNG) y el concepto de diseño. |
| 2026-10-20 | Revisión del documento: añadido resumen ejecutivo (sección 0), actualizado el título de la sección 5 (ya no es preliminar) y agregada estimación de esfuerzo por fase en el plan (~8–12 días hábiles, preliminar). Creados `ACTA-DECISIONES-MESA.md` y `BORRADOR-RESPUESTA.md`. |
| 2026-10-20 | Aplicado 40% de holgura a las estimaciones: montaje ~11–17 días hábiles; proyección global ~3–4 semanas. Creado `CRONOGRAMA-IMPLEMENTACION.md` como entregable para la DEDE. |
| 2026-10-20 | **Revisados los 5 mockups** (ya cargados en `insumos/`). Confirman estructura de las 5 páginas e identidad visual. D5 y D6 quedan en gran parte resueltas. Hallazgos nuevos: Mediciones sí tiene mockup (es el nº 2); buscador en el menú de 4 secciones; cifras CSECC visibles con nota "datos de referencia". Recibido el BRIEF aprobado (Comunicaciones) en `.docx`, pendiente de incorporar en texto. |
| 2026-10-20 | **Integrado el BRIEF aprobado** (texto) como sección 8. Define alcance oficial = 4 líneas estratégicas (resuelve D1 y respalda D2). Línea gráfica NUEVA articulada con el nuevo Manual de identidad del Ministerio, validada por el Grupo de Divulgación y Prensa (actor nuevo; enlace Jazmín Rodríguez Céspedes): matiza D6. Confirma el diagnóstico de origen y el enfoque de cronograma condicionado. |
