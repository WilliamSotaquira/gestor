# Análisis de la sección Presentación vs. Texto Oficial

Análisis en **modo solo lectura**. No se modificó ningún archivo.

Archivos revisados (rutas absolutas):
- `c:\gestor\sites\culturas\cms\congreso-investigacion-artistica\presentacion\index.html`
- `c:\gestor\sites\culturas\cms\congreso-investigacion-artistica\programacion\index.html`
- `c:\gestor\sites\culturas\cms\congreso-investigacion-artistica\PENDIENTES.md`

---

## Resumen ejecutivo (respuesta primero)

El HTML publicado de Presentación **NO corresponde al "TEXTO OFICIAL" entregado en este encargo**. Lo publicado es una versión de redacción **más extensa y distinta**, articulada en torno al concepto "**La soberanía de los saberes culturales y los conocimientos sensibles del Sur Global**" (subtítulo que el texto oficial no incluye). Las diferencias no son erratas puntuales: son **dos versiones de contenido diferentes**.

Hallazgos de mayor impacto:

1. **Título del congreso**: lo publicado añade un subtítulo ("La soberanía de los saberes…") que no está en el texto oficial.
2. **Los 8 párrafos de Presentación difieren en redacción** (no solo matices), y los párrafos 6 y 8 publicados tienen un contenido conceptual que no aparece en el texto oficial.
3. **Las 4 modalidades de trabajo del sector** aparecen redactadas de forma distinta y embebidas en un solo párrafo (no como lista), con nombres y glosas que no coinciden con el oficial.
4. **Los nombres de los temas de los 3 ejes son el problema central**: casi ninguno de los 11 temas publicados coincide exactamente con el nombre oficial. El HTML usa nombres alternativos (p. ej. "Justicia epistémica: saberes otros" en vez de "Diálogo de saberes y equidad del conocimiento").
5. **Programación usa todavía otras variantes** de esos mismos nombres, de modo que hay **tres fuentes de nomenclatura distintas** (texto oficial, Presentación publicada, Programación publicada) que no se homogeneizan entre sí.
6. **Accesibilidad**: el salto de jerarquía de encabezados **sigue presente** (`h2` del bloque "Ejes temáticos" salta a `h4` dentro de los acordeones, omitiendo `h3`).

> Nota de datos: la lista de aliados publicada incluye 8 entidades (añade UNIPAZ como sigla y "Teatro Mayor Julio Mario Santo Domingo"), lo cual coincide con lo descrito en `PENDIENTES.md` pero **excede** las 7 entidades nombradas en el texto oficial.

**Decisión pendiente antes de corregir**: hay que confirmar cuál es la fuente de verdad. Si el "TEXTO OFICIAL" de este encargo es la versión definitiva, la página de Presentación debe reescribirse casi por completo. Si la versión "Sur Global" publicada es la vigente (es más reciente y detallada según `PENDIENTES.md`), entonces el "texto oficial" de este encargo estaría desactualizado. **Esta ambigüedad debe resolverla el equipo de contenido.**

---

## 1. Párrafos de Presentación (sección 1) — comparación

Recordatorio: solo el HTML dentro de `#contenido-cms` se publica en el portal (SharePoint).

### Título

- **Oficial**: "Primer Congreso Nacional e Internacional de Investigación Artística."
- **Publicado** (`<h1>` + fin del párrafo 1): "…el Primer Congreso Nacional e Internacional de Investigación Artística: **La soberanía de los saberes culturales y los conocimientos sensibles del Sur Global**."
- **Diferencia**: subtítulo añadido en lo publicado. El `<h1>` sí es el título corto, pero el primer párrafo cierra con el subtítulo largo.

### Párrafo 1 (entidades, convenio, aliados, fecha)

- Convenio **No. 0968-2026**: coincide en ambos. ✔
- Fecha **3 al 6 de noviembre de 2026**: coincide en ambos. ✔
- Lista de universidades (Antioquia, Atlántico, Distrital Francisco José de Caldas, Javeriana, Tecnológica del Chocó, Instituto Universitario de la Paz): coincide. ✔
- **Diferencias de redacción**:
  - Oficial: "…y **en alianza con** la Universidad de Antioquia…".
  - Publicado: "…y **en asocio con** la Universidad de Antioquia… y el Instituto Universitario de la Paz **(UNIPAZ)**…".
  - Lo publicado agrega la sigla "(UNIPAZ)" y añade el subtítulo "Sur Global" al final.

### Párrafo 2 (objetivo del espacio)

- **Oficial**: "…resultados provenientes de experiencias de investigación, con miras a **consolidar el posicionamiento** de las prácticas artísticas y culturales como formas legítimas de **producción de conocimiento**."
- **Publicado**: "…experiencias de **investigación artística**, con miras a **contribuir al posicionamiento** … como formas legítimas de **producción de conocimientos y saberes sensibles**."
- **Diferencia**: matices de redacción ("consolidar" → "contribuir al"; "conocimiento" → "conocimientos y saberes sensibles").

### Párrafo 3 (articulación intersectorial / tres ministerios)

- Los **tres ministerios** aparecen en ambos: Ministerio de las Culturas, las Artes y los Saberes; Ministerio de Ciencia, Tecnología e Innovación; Ministerio de Educación Nacional. ✔
- **Diferencias de redacción**:
  - Oficial: "…dinamizar la **articulación** intersectorial e interinstitucional… en consonancia con las **políticas públicas** … desde una perspectiva **local, nacional e internacional**."
  - Publicado: "…dinamizar la **acción colaborativa** intersectorial e interinstitucional… en relación con las **políticas sectoriales que les competen** … con una mirada sobre **lo local, lo nacional y lo regional, en la perspectiva que convoca la agenda del Sur Global**."

### Párrafo 4 (comprensión amplia + 4 modalidades)

Este es un punto sensible: **las 4 modalidades difieren en forma y en nombre.**

- **Oficial**: introduce las modalidades como **lista** ("tales como:") con 4 ítsems nominados:
  1. **Investigación + Creación (I+C)**: según los marcos del Sistema Nacional de Ciencia, Tecnología e Innovación (MinCiencias).
  2. **Investigación por, en y a través de las artes**: como ejercicio de indagación disciplinar e interinstitucional.
  3. **Creación investigadora**: orientada a los intercambios interdisciplinares y a la experiencia estética.
  4. **Investigación y creación aplicada**: enfocada en la transformación y el aporte a las realidades territoriales.

- **Publicado**: redactado como **un solo párrafo corrido** (no lista), con glosas distintas:
  - "la **Investigación + Creación** propuesta por el Ministerio de Ciencia, Tecnología e Innovación, resultado del debate y diálogo intersectorial" (oficial menciona "MinCiencias" / Sistema Nacional CTI).
  - "la **Investigación disciplinar por, en y a través de las artes**".
  - "la **Creación Investigadora** o de la creación artística como investigación inter-, trans- y multidisciplinar de los intercambios sensibles".
  - "la **Investigación Creación Aplicada** a partir del arte como fuerza transformadora de las realidades".
- **Diferencia**: coinciden las 4 figuras conceptuales, pero el **formato (lista vs. párrafo)**, los **nombres exactos** y las **glosas** difieren. Lo publicado agrega además "las múltiples formas de relacionamiento…".

### Párrafo 5 (reflexión metodológica)

- **Oficial**: "…fomentará la reflexión metodológica sobre los procesos de realización, registro, sistematización e interpretación… consolidar **memorias y documentos accesibles**… articular acciones entre las artes, la ciencia y la gobernanza cultural."
- **Publicado**: "…fomentará la reflexión y respaldará metodologías para realizar, registrar, sistematizar e interpretar… que los **conocimientos sensibles y la soberanía de los saberes culturales** se conviertan en **materialidades accesibles**… cocrear acciones entre las artes, los sistemas de conocimiento, las culturas, las gentes y los territorios para la protección de la vida."
- **Diferencia**: redacción sustancialmente distinta y con el marco conceptual "Sur Global / protección de la vida".

### Párrafo 6

- **Oficial (párrafo 6 = "En la prospectiva…")**: trata la **línea de continuidad / estado del arte / artes expandidas**.
- **Publicado (párrafo 6)**: trata un tema **distinto** — "reconocer el conocimiento de las comunidades territoriales como capital…", **protocolos bioéticos y metodológicos**, agenciamiento, reciprocidad. **Este contenido no aparece en el texto oficial.**
- **Diferencia**: el párrafo 6 publicado es un contenido adicional/distinto; el equivalente del párrafo 6 oficial aparece desplazado al párrafo 7 publicado.

### Párrafo 7 (prospectiva / estado del arte)

- **Oficial** (su párrafo 6): "En la prospectiva… reactive el debate académico y sectorial… panorama actualizado del estado del arte… artes expandidas… campo estético… conocimientos formales y saberes locales… cohesión social."
- **Publicado** (su párrafo 7): "En prospectiva… reactivar los debates locales, nacionales e internacionales… **constituirse en un punto de referencia histórico**… **cartografía** del estado del arte… artes expandidas… experiencia estética… **conocimientos legitimados por los centros de poder y los saberes situados**… transformación social."
- **Diferencia**: misma idea general, redacción y énfasis distintos.

### Párrafo 8 (Plan Nacional de Cultura)

- **Oficial**: "Estos enfoques se enmarcan en los ejes estratégicos del **Plan Nacional de Cultura (2024-2038)**, articulando criterios **territoriales, diferenciales, de equidad e intersectoriales** para el desarrollo sostenible y el bienestar colectivo."
- **Publicado**: "…en el marco del **Plan Nacional de Cultura (2024-2038)**, el cual integra los enfoques **biocultural, territorial, diferencial, de género e intersectorial**… **justicia ambiental, social y epistémica para la protección de la vida**."
- **Diferencia**: los enfoques enumerados difieren (oficial: "de equidad"; publicado: "biocultural … de género") y el cierre conceptual es distinto.

---

## 2. Público destinatario (sección 2) — comparación

- **Oficial**: "Invitamos a investigadores, gestores culturales, artistas, educadores, estudiantes, **redes académicas** y organizaciones sociales y culturales a participar… como **asistentes y ponentes**. El encuentro concibe la investigación artística como un campo **abierto**, situado y contextualizado que articula la creación, la memoria, el territorio, la gobernanza y el **diálogo intercultural** a través de dimensiones teóricas, prácticas e históricas."
- **Publicado**: "Invitamos a investigadores, gestores culturales, artistas, educadores, estudiantes y organizaciones sociales y culturales **del sector artístico y cultural internacional** a participar… como **asistentes y participantes activos en nuestros diálogos colectivos**. El congreso reconoce la investigación artística como un campo **expandido**, situado y contextualizado que articula la creación, la memoria, el territorio, la gobernanza y la **diversidad intercultural**, y que **acoge un amplio espectro de trayectorias** a través de dimensiones teóricas, prácticas e históricas."
- **Diferencias**:
  - Oficial incluye "**redes académicas**"; publicado lo omite.
  - "asistentes y **ponentes**" (oficial) → "asistentes y **participantes activos en nuestros diálogos colectivos**" (publicado).
  - "campo **abierto**" → "campo **expandido**".
  - "**diálogo** intercultural" → "**diversidad** intercultural".
  - Publicado añade "del sector artístico y cultural internacional" y "acoge un amplio espectro de trayectorias".

---

## 3. Ejes temáticos (sección 3) — comparación por tema

Convención: "Coincide" = sí solo si el nombre del tema del HTML es **idéntico** al nombre oficial.

### EJE 1: Diversidad y diálogo intercultural

- **Título del eje**: Oficial "DIVERSIDAD Y DIÁLOGO INTERCULTURAL" / Publicado "Eje 1: Diversidad y diálogo intercultural" → coincide (solo difiere capitalización). ✔
- **Cita Plan Nacional de Cultura, p. 62**: el texto de la cita coincide prácticamente palabra por palabra. **Pero el HTML publicado NO incluye la atribución "(Plan Nacional de Cultura, 2024, p. 62)"** — presenta la cita como párrafo introductorio sin referencia ni número de página. ⚠

| Tema oficial | ¿Aparece en HTML? | Nombre en HTML | ¿Coincide? | Nota |
|---|---|---|---|---|
| Perspectivas ecológicas | Sí | "Perspectivas ecológicas: agencias posibles de los ecosistemas" | **No (parcial)** | Añade subtítulo ": agencias posibles de los ecosistemas". La descripción difiere (oficial habla de "preservación ambiental, desarrollo biocultural y sostenibilidad de los ecosistemas"; HTML habla de "preservación de la vida y reconocimiento de la interdependencia ecosistémica"). |
| Diálogo de saberes y equidad del conocimiento | Sí (renombrado) | "Justicia epistémica: saberes otros" | **No** | Nombre distinto. Descripción también difiere (HTML: perspectiva decolonial, Sur Global). |
| Cuerpos, movimiento y lenguajes sensibles | Sí (renombrado) | "Cuerpos, movimiento, sensibilidades y afectos" | **No** | "lenguajes sensibles" → "sensibilidades y afectos". Descripción difiere. |
| Artes, culturas y memoria comunitaria | Sí (renombrado) | "Artes, culturas y memoria" | **No** | Falta "comunitaria". Descripción publicada centra en conflicto armado / hechos victimizantes (más extensa que la oficial). |

### EJE 2: Memoria y creación

- **Título del eje**: coincide (solo capitalización). ✔
- **Cita Plan Nacional de Cultura, p. 92**: texto coincide en lo esencial (pequeñas variantes "dirigidos a la convergencia **en** los contenidos culturales/artísticos" vs oficial "orientados a la convergencia **de** los contenidos culturales y artísticos"). **Sin atribución ni número de página en el HTML.** ⚠

| Tema oficial | ¿Aparece en HTML? | Nombre en HTML | ¿Coincide? | Nota |
|---|---|---|---|---|
| Pedagogías situadas y formación artística | Sí (renombrado) | "Pedagogías situadas: la producción de sentido en los territorios" | **No** | Nombre y descripción difieren. |
| Archivo, patrimonio y memoria viva | Sí (renombrado) | "Archivo y memoria viva: resistencias y contrarrelatos" | **No** | Falta "patrimonio"; añade subtítulo. Descripción difiere. |
| Curadurías críticas y mediación cultural | Sí (renombrado) | "Curadurías críticas: mediación social para la producción de sentido" | **No** | "mediación cultural" → "mediación social para la producción de sentido". |

### EJE 3: Gobernanza y sostenibilidad cultural

- **Título del eje**: coincide (solo capitalización). ✔
- **Cita Plan Nacional de Cultura, p. 122**: texto coincide en lo esencial. **Sin atribución ni número de página en el HTML.** ⚠

| Tema oficial | ¿Aparece en HTML? | Nombre en HTML | ¿Coincide? | Nota |
|---|---|---|---|---|
| Conocimiento artístico como bien público | Sí (renombrado) | "Conocimiento sensible como bien público" | **No** | "artístico" → "sensible". Descripción difiere. |
| Economías creativas, culturales y sostenibilidad | Sí (renombrado) | "Economías creativas y culturales basadas en las artes" | **No** | "…y sostenibilidad" → "…basadas en las artes". |
| Inteligencia Relacional | Sí (renombrado) | "Inteligencia relacional e investigación artística en la era generativa" | **No** | Nombre ampliado. Descripción enfatiza "era generativa" / cocreación humano-máquina. |
| Ética de la investigación | Sí (renombrado) | "Ética de la investigación: conocimiento situado y territorio" | **No** | Añade subtítulo. Descripción difiere. |

**Conclusión del punto 3**: los **títulos de los 3 ejes coinciden**; las **citas del Plan coinciden en texto pero les falta la atribución y el número de página (p. 62 / p. 92 / p. 122)** en el HTML; y **los 11 temas usan nombres distintos de los oficiales** (ninguno coincide exacto). Hay que decidir qué nomenclatura es la válida.

---

## 4. Consistencia de nomenclatura con Programación

En `programacion/index.html` aparecen títulos de actividades que reutilizan nombres de temas de los ejes. Comparados con los **nombres oficiales** (sección 3 del encargo):

| Tema oficial (sección 3) | Nombre usado en Programación | Línea aprox. | ¿Coincide con oficial? |
|---|---|---|---|
| Cuerpos, movimiento y lenguajes sensibles | "Cuerpos, movimiento, sensibilidades y afectos" | 138, 224 | **No** |
| Perspectivas ecológicas | "Perspectivas ecológicas" | 179 | **Sí** (coincide exacto) |
| Pedagogías situadas y formación artística | "Pedagogías situadas — Proyecto TransMigrARTS (…)" | 149 | **No** |
| Inteligencia Relacional | "Inteligencia relacional e investigación artística en la era generativa" | 191 | **No** |
| Artes, culturas y memoria comunitaria | "Artes, culturas y memoria" | 246 | **No** (falta "comunitaria") |
| Conocimiento artístico como bien público | "Conocimiento sensible como bien público" | 293 | **No** |
| Conocimiento artístico como bien público | "Conocimiento sensible como bien público — espacio de conversación interinstitucional" | 396 | **No** |
| Economías creativas, culturales y sostenibilidad | "Economías culturales basadas en las artes" | 304 | **No** |
| Curadurías críticas y mediación cultural | "Curadurías críticas" | 335 | **No** (truncado) |
| Archivo, patrimonio y memoria viva | "Archivo y memoria viva" | 347 | **No** |
| Diálogo de saberes y equidad del conocimiento | "Justicia epistémica y ética de la investigación" (actividad del Día 1) | 80 | **No** (nombre de actividad, mezcla EJE1+EJE3) |

Observaciones:
- Programación tiende a coincidir con la **Presentación publicada** ("Sur Global"), no con el texto oficial de este encargo (p. ej. "Cuerpos, movimiento, sensibilidades y afectos", "Conocimiento sensible como bien público", "Inteligencia relacional e investigación artística en la era generativa", "Economías… basadas en las artes").
- Aun así hay **inconsistencias internas** entre Presentación publicada y Programación: p. ej. Presentación dice "Economías creativas **y culturales** basadas en las artes" y Programación "Economías **culturales** basadas en las artes"; Presentación dice "Curadurías críticas: mediación social…" y Programación solo "Curadurías críticas".
- `PENDIENTES.md` ya anticipa este tipo de divergencia ("hay un `verificacion.md` por sección… con notas de inconsistencias heredadas").

> No se proponen cambios en Programación en este informe (fuera de alcance); solo se documentan las discrepancias para una futura homogeneización.

---

## 5. Estructura y accesibilidad

Construcción de la sección de ejes en `presentacion/index.html`:

- Jerarquía de encabezados actual:
  - `<h1>` Primer Congreso Nacional e Internacional de Investigación Artística
  - `<h2>` Presentación
  - `<h2>` ¿A qué público está dirigido este encuentro?
  - `<h2>` Ejes temáticos del Congreso
  - Dentro de los ejes: cada eje es un `<details>`/`<summary>` (acordeón nativo, no el componente `.accordion-govco` del repositorio de componentes GOV.CO). El título del eje vive **dentro del `<summary>` como `<span>`**, no como encabezado.
  - Dentro del `<div>` del acordeón, cada tema usa `<h4>`.
  - `<h2>` Aliados institucionales → `<h3>` Logos de los aliados
  - `<h2>` Explore el congreso

- **Salto de jerarquía h2 → h4 (heading-order): SIGUE PRESENTE.** ⚠ Confirmado: tras el `<h2>` "Ejes temáticos del Congreso" no hay `<h3>`; los títulos de eje están en `<span>` dentro del `<summary>` y los temas saltan directamente a `<h4>`. Esto omite el nivel `<h3>` y viola el orden de encabezados (criterio WCAG de estructura de encabezados).

- Otras notas de accesibilidad:
  - El acordeón usa `<details>`/`<summary>` nativo en lugar del acordeón GOV.CO documentado en `shared/components/acordeones/index.html`. Funciona sin JS, pero no sigue el patrón del design system del workspace.
  - Las imágenes de logos tienen `alt` descriptivo. ✔
  - El número del eje está en un `<span aria-hidden="true">`, correcto para evitar lectura redundante.

---

## Correcciones sugeridas (priorizadas — NO aplicadas)

1. **(Bloqueante) Resolver la fuente de verdad del contenido.** Confirmar con el equipo si rige el "TEXTO OFICIAL" de este encargo o la versión "Sur Global" ya publicada (más reciente según `PENDIENTES.md`). Todo lo demás depende de esta decisión.
2. **(Alta) Homogeneizar los nombres de los 11 temas de los ejes.** Elegir un único juego de nombres y aplicarlo igual en Presentación y en Programación. Hoy hay tres variantes distintas.
3. **(Alta) Corregir el salto de jerarquía h2 → h4** en el acordeón de ejes: introducir `<h3>` para los títulos de eje (o convertir el `<summary>` en encabezado accesible) de modo que los temas en `<h4>` queden bajo un `<h3>`. Esto resuelve el hallazgo `heading-order`.
4. **(Media) Añadir la atribución de las citas del Plan Nacional de Cultura** con su número de página (p. 62, p. 92, p. 122) dentro de cada acordeón, como en el texto oficial.
5. **(Media) Si rige el texto oficial**: reescribir los 8 párrafos de Presentación y el párrafo de Público, incluyendo "redes académicas", "asistentes y ponentes", y presentar las 4 modalidades como **lista** con sus nombres y glosas oficiales.
6. **(Media) Reconciliar la lista de aliados** (8 publicados vs 7 del texto oficial): decidir si Teatro Mayor Julio Mario Santo Domingo y la sigla UNIPAZ se mantienen; alinear con la decisión del punto 1.
7. **(Baja) Alinear el acordeón al componente GOV.CO** (`shared/components/acordeones/index.html`) si se busca consistencia con el design system, respetando que solo se publica el HTML dentro de `#contenido-cms`.

---

*Nota de publicación: en este micrositio solo se copia al portal (SharePoint) el HTML contenido dentro de `#contenido-cms`. La cadena "cms" en las rutas es un identificador fijo del sistema y no debe renombrarse.*
*Content was rephrased for compliance with licensing restrictions where external phrasing applied; las citas internas provienen de los archivos del propio proyecto.*
