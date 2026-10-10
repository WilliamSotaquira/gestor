# Plan de implementación — Alineación al TEXTO OFICIAL

Tarea de edición de contenido HTML (micrositio GOV.CO del portal de Culturas, publicado sobre SharePoint). Se edita directamente en el workspace, sin worktree.

## Fuente de verdad

El **TEXTO OFICIAL** incluido en el encargo es la fuente de verdad definitiva (duda ya resuelta por el usuario). El informe `analisis-presentacion.md` se usa solo como mapa de ubicaciones y diferencias, no como fuente de contenido.

## Restricciones de edición (aplican a TODAS las ediciones)

- Formato APLANADO de SharePoint: estilos inline (`style="..."`) y acordeones nativos `<details>`/`<summary>`.
- NO introducir clases GOV.CO nuevas, ni `<link>`, `<script>` o CDN. Cualquier markup nuevo va inline, replicando los estilos ya presentes en el mismo archivo.
- Solo se publica el HTML dentro de `<div id="contenido-cms">`. No tocar nada fuera de ahí.
- `node` no está instalado: no ejecutar builds ni npm.
- NO ejecutar `git commit` ni `push`.
- Conservar las entidades `&#160;` y el espaciado del archivo tal como aparecen alrededor de los bloques editados (son parte del aplanado de SharePoint).
- La cadena `cms` en rutas es un identificador fijo del sistema; no renombrarla.

## Método de verificación (sin build)

Como no hay toolchain, cada ítem se verifica por **lectura**:
- Releer el bloque editado y confirmar que el texto coincide carácter por carácter con el TEXTO OFICIAL (incluida la puntuación).
- Conteo balanceado de etiquetas del bloque tocado: cada `<p>`/`</p>`, `<ul>`/`</ul>`, `<li>`/`</li>`, `<h3>`/`</h3>`, `<h4>`/`</h4>`, `<details>`/`</details>`, `<summary>`/`</summary>`, `<div>`/`</div>` abre y cierra.
- Confirmar que el `<div id="contenido-cms">` sigue abriendo una sola vez al inicio y cerrando una sola vez al final (sin `</div>` de más ni de menos).
- Herramienta sugerida para apoyo: `grep` sobre el archivo para confirmar que los textos viejos ya no existen y los nuevos sí.

---

# ARCHIVO 1: `presentacion/index.html`

Orden recomendado dentro del archivo: trabajar de arriba hacia abajo (Parte 1 → Parte 4). Las Partes 1, 2, 3 y 4 son independientes entre sí a nivel de bloque; se agrupan por archivo para una sola pasada de verificación.

- [ ] 1. **(Parte 1a) Quitar el subtítulo "La soberanía de los saberes…" del `<h1>` y del primer párrafo.**
      El `<h1>` ya es correcto ("Primer Congreso Nacional e Internacional de Investigación Artística") y NO lleva subtítulo: dejarlo igual. En el párrafo 1 de la sección Presentación (el que empieza "El Ministerio de las Culturas…"), eliminar el fragmento final del título largo de modo que termine en "…el Primer Congreso Nacional e Internacional de Investigación Artística." sin ": La soberanía de los saberes culturales y los conocimientos sensibles del Sur Global.". Esta eliminación queda absorbida por el ítem 2 (que reescribe el párrafo 1 completo); se lista aparte solo para dejar explícito el requisito.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: `grep` del archivo NO debe devolver ninguna aparición de "Sur Global" ni de "soberanía de los saberes" dentro de `#contenido-cms`.

- [ ] 2. **(Parte 1b) Reescribir los 7 párrafos de la sección "Presentación" al TEXTO OFICIAL, con las 4 modalidades como lista `<ul>` inline.**
      El HTML actual tiene 8 `<p>` entre el `<h2>Presentación</h2>` y el `<h2>¿A qué público…</h2>`. Consolidar a los 7 párrafos del TEXTO OFICIAL (sección 1). El párrafo 4 incluye la lista de 4 modalidades. El párrafo publicado 6 ("…reconocer el conocimiento de las comunidades territoriales como capital… protocolos bioéticos…") NO está en el oficial: se elimina. No inventar un 8.º párrafo.
      Reemplazar el bloque completo de los 8 `<p>` por exactamente estos 7 (respetando el patrón ` <p> …texto… </p> ` con los espacios del aplanado):
      - P1: `El Ministerio de las Culturas, las Artes y los Saberes, a través de la Dirección de Artes, en el marco del Convenio de Asociación No. 0968-2026 suscrito con la Fundación Arteria, y en alianza con la Universidad de Antioquia, la Universidad del Atlántico, la Universidad Distrital Francisco José de Caldas, la Pontificia Universidad Javeriana, la Universidad Tecnológica del Chocó y el Instituto Universitario de la Paz, realizará del 3 al 6 de noviembre de 2026 el Primer Congreso Nacional e Internacional de Investigación Artística.` (nota: "en alianza con", NO "en asocio con"; quitar "(UNIPAZ)"; quitar el subtítulo).
      - P2: `Este espacio está orientado a fortalecer el diálogo colaborativo para la apropiación social del conocimiento artístico mediante la circulación de reflexiones y resultados provenientes de experiencias de investigación, con miras a consolidar el posicionamiento de las prácticas artísticas y culturales como formas legítimas de producción de conocimiento.`
      - P3: `En este marco, el Congreso busca dinamizar la articulación intersectorial e interinstitucional entre el Ministerio de las Culturas, las Artes y los Saberes, el Ministerio de Ciencia, Tecnología e Innovación y el Ministerio de Educación Nacional, en consonancia con las políticas públicas que promueven el fomento y el reconocimiento de la investigación artística desde una perspectiva local, nacional e internacional.`
      - P4: `El Congreso promueve una comprensión amplia de la investigación artística y cultural, cuyo potencial creativo radica en la diversidad de lenguajes, comunidades, territorios, formatos, técnicas y metodologías. En este sentido, el encuentro acoge las diversas modalidades de trabajo del sector, tales como:` seguido INMEDIATAMENTE (dentro del mismo bloque, tras cerrar el `<p>`) de una lista `<ul>` inline con 4 `<li>`, usando el mismo estilo visual que las otras listas del archivo (ver la `<ul style="list-style: none; padding-left: 0px;">` de la ficha superior y las `<ul>` simples de "Aliados"; para esta lista usar viñeta estándar con sangría, p. ej. `<ul style="padding-left: 1.25rem;">` para mantener coherencia con listas de contenido). Los 4 `<li>` con el nombre en `<strong>` y la glosa exacta:
        - `<li><strong>Investigación + Creación (I+C):</strong> según los marcos del Sistema Nacional de Ciencia, Tecnología e Innovación (MinCiencias).</li>`
        - `<li><strong>Investigación por, en y a través de las artes:</strong> como ejercicio de indagación disciplinar e interinstitucional.</li>`
        - `<li><strong>Creación investigadora:</strong> orientada a los intercambios interdisciplinares y a la experiencia estética.</li>`
        - `<li><strong>Investigación y creación aplicada:</strong> enfocada en la transformación y el aporte a las realidades territoriales.</li>`
      - P5: `Este espacio fomentará la reflexión metodológica sobre los procesos de realización, registro, sistematización e interpretación de la investigación artística. Con ello, se busca consolidar memorias y documentos accesibles para su circulación, la comunicación de resultados y la apropiación social, respondiendo a la complejidad de las prácticas artísticas contemporáneas y a la necesidad de articular acciones entre las artes, la ciencia y la gobernanza cultural.`
      - P6: `En la prospectiva, el Congreso busca consolidar una línea de continuidad que reactive el debate académico y sectorial sobre la investigación artística a nivel nacional e internacional. De igual forma, permitirá trazar un panorama actualizado del estado del arte que abarque las dimensiones de las artes expandidas, los aportes del campo estético, el diálogo entre los conocimientos formales y los saberes locales, y el papel de las artes en la cohesión social.`
      - P7: `Estos enfoques se enmarcan en los ejes estratégicos del Plan Nacional de Cultura (2024-2038), articulando criterios territoriales, diferenciales, de equidad e intersectoriales para el desarrollo sostenible y el bienestar colectivo.`
      Nota de dato: la ficha superior (`<ul>` con Entidad/Fecha/Lugar) y el bloque "Aliados institucionales" NO se tocan en este ítem (ver ítem de alcance al final del archivo).
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: releer la sección Presentación y confirmar 7 `<p>` + 1 `<ul>` con 4 `<li>`; `grep` NO debe hallar "en asocio con", "saberes sensibles", "protocolos bioéticos", "cocrear"; sí debe hallar "en alianza con" e "Investigación + Creación (I+C)". Conteo balanceado de `<ul>`/`</ul>` y `<li>`/`</li>` del nuevo bloque.

- [ ] 3. **(Parte 1c) Reescribir el párrafo de "¿A qué público está dirigido este encuentro?" al TEXTO OFICIAL (sección 2).**
      Reemplazar el único `<p>` bajo ese `<h2>` por el texto oficial, en dos oraciones:
      `Invitamos a investigadores, gestores culturales, artistas, educadores, estudiantes, redes académicas y organizaciones sociales y culturales a participar en las áreas temáticas del Congreso como asistentes y ponentes. El encuentro concibe la investigación artística como un campo abierto, situado y contextualizado que articula la creación, la memoria, el territorio, la gobernanza y el diálogo intercultural a través de dimensiones teóricas, prácticas e históricas.`
      Debe incluir "redes académicas" y "asistentes y ponentes"; usar "campo abierto" (no "expandido") y "diálogo intercultural" (no "diversidad intercultural"). Quitar "del sector artístico y cultural internacional" y "acoge un amplio espectro de trayectorias".
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: `grep` NO debe hallar "campo expandido", "diversidad intercultural", "participantes activos", "amplio espectro de trayectorias"; sí "redes académicas", "campo abierto", "diálogo intercultural", "asistentes y ponentes".

- [ ] 4. **(Parte 2 — EJE 1) Renombrar temas del Eje 1 y alinear sus descripciones al oficial.**
      Dentro del `<details>` del "Eje 1: Diversidad y diálogo intercultural" (NO cambiar el título del eje; solo normalizar capitalización si hiciera falta — ya está correcto). Para cada tema, reemplazar el texto del `<h4>` y el `<p>` de descripción que le sigue:
      - `<h4>Perspectivas ecológicas: agencias posibles de los ecosistemas</h4>` → `<h4>…>Perspectivas ecológicas</h4>` (conservar el `style` inline del `<h4>`). Descripción → `Concibe la investigación artística como un campo de producción de conocimiento para la preservación ambiental, el desarrollo biocultural y la sostenibilidad de los ecosistemas.`
      - `Justicia epistémica: saberes otros` → `Diálogo de saberes y equidad del conocimiento`. Descripción → `Analiza la investigación artística desde enfoques críticos y contextualizados, promoviendo la escucha, la reciprocidad y el reconocimiento entre los saberes locales, tradicionales y los sistemas formales de conocimiento.`
      - `Cuerpos, movimiento, sensibilidades y afectos` → `Cuerpos, movimiento y lenguajes sensibles`. Descripción → `Explora el cuerpo como espacio de inscripción de memorias, expresiones e identidades. Comprende la memoria corporal como un proceso relacional activado por vínculos, gestos y dinámicas colectivas.`
      - `Artes, culturas y memoria` → `Artes, culturas y memoria comunitaria`. Descripción → `Indaga el papel del arte y la cultura en contextos de transformación social y en escenarios complejos. Analiza las respuestas artísticas ante el impacto en los derechos culturales, así como los procesos de resistencia, resiliencia y reconstrucción del tejido social.`
      Conservar en todos los `<h4>` el atributo `style="color: #0943b5; font-size: 1rem; margin-top: 1rem;"` existente, y mantener los `&#160;&#160;` finales de cada `<p>` tal como están.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: `grep` dentro del Eje 1 NO debe hallar "agencias posibles", "saberes otros", "sensibilidades y afectos", ni "Artes, culturas y memoria<"; sí los 4 nombres oficiales. Confirmar que siguen siendo 4 `<h4>` + 4 `<p>` dentro del `<details>` del Eje 1.

- [ ] 5. **(Parte 2 — EJE 2) Renombrar temas del Eje 2 y alinear descripciones.**
      Dentro del `<details>` del "Eje 2: Memoria y creación":
      - `Pedagogías situadas: la producción de sentido en los territorios` → `Pedagogías situadas y formación artística`. Descripción → `Investiga modelos pedagógicos e itinerarios formativos en artes que emergen de las dinámicas territoriales y dialogan con las prácticas socioculturales regionales.`
      - `Archivo y memoria viva: resistencias y contrarrelatos` → `Archivo, patrimonio y memoria viva`. Descripción → `Propone una noción ampliada del archivo como insumo para la creación y la investigación. Aborda la preservación y la reactivación de documentos, artefactos y testimonios orales, transformándolos en experiencias compartidas.`
      - `Curadurías críticas: mediación social para la producción de sentido` → `Curadurías críticas y mediación cultural`. Descripción → `Analiza las prácticas curatoriales que trascienden la exhibición para constituirse en dispositivos de mediación social, de producción de conocimiento y de articulación entre lenguajes y comunidades.`
      Conservar estilos inline de `<h4>` y los `&#160;&#160;` finales.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: `grep` NO debe hallar "producción de sentido en los territorios", "resistencias y contrarrelatos", "mediación social para la producción de sentido"; sí los 3 nombres oficiales. 3 `<h4>` + 3 `<p>` en el Eje 2.

- [ ] 6. **(Parte 2 — EJE 3) Renombrar temas del Eje 3 y alinear descripciones.**
      Dentro del `<details>` del "Eje 3: Gobernanza y sostenibilidad cultural":
      - `Conocimiento sensible como bien público` → `Conocimiento artístico como bien público`. Descripción → `Aborda la dimensión pública del conocimiento generado por las artes y su impacto en la legislación, las políticas públicas y el fortalecimiento de la ciudadanía.`
      - `Economías creativas y culturales basadas en las artes` → `Economías creativas, culturales y sostenibilidad`. Descripción → `Investiga modelos de gestión, fomento y sostenibilidad financiera, social y organizativa que garanticen el bienestar de los artistas, creadores y agentes del ecosistema cultural.`
      - `Inteligencia relacional e investigación artística en la era generativa` → `Inteligencia Relacional`. Descripción → `Analiza las dinámicas de la creación y la investigación artísticas en la era digital y de la inteligencia artificial, abordando sus dimensiones éticas, estéticas, normativas y técnicas en la interacción humano-tecnología.`
      - `Ética de la investigación: conocimiento situado y territorio` → `Ética de la investigación`. Descripción → `Examina las pautas éticas, los derechos de autor y las buenas prácticas en la gestión del conocimiento local y en la investigación colaborativa, a fin de prevenir la apropiación indebida y promover la coautoría.`
      Conservar estilos inline de `<h4>` y los `&#160;&#160;` finales.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: `grep` NO debe hallar "Conocimiento sensible como bien público", "basadas en las artes", "era generativa" (dentro del `<h4>`), "conocimiento situado y territorio"; sí los 4 nombres oficiales. 4 `<h4>` + 4 `<p>` en el Eje 3.

- [ ] 7. **(Parte 3) Añadir la atribución del Plan Nacional de Cultura a la cita introductoria de cada eje.**
      Cada `<details>` de eje abre su `<div style="padding…">` con un `<p>` que es una cita del Plan sin atribución. Formatear como cita: envolver el texto existente entre comillas tipográficas (« » o " ", de forma coherente; el archivo usa comillas tipográficas «…» en Programación, pero en Presentación no hay precedente — usar comillas latinas «…» para consistencia con el proyecto) y añadir al final, antes del cierre `</p>` (y antes de los `&#160;&#160;`), la referencia:
      - Eje 1: ` (Plan Nacional de Cultura, 2024, p. 62)`
      - Eje 2: ` (Plan Nacional de Cultura, 2024, p. 92)`
      - Eje 3: ` (Plan Nacional de Cultura, 2024, p. 122)`
      No alterar el texto de la cita salvo el entrecomillado. Decisión: se mantiene el texto de la cita tal como está publicado (coincide en lo esencial con el oficial); solo se agrega comillas + atribución, que es lo que pide la Parte 3.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: `grep` debe hallar las 3 cadenas "Plan Nacional de Cultura, 2024, p. 62/92/122", cada una exactamente una vez. Confirmar que cada cita quedó entre comillas.

- [ ] 8. **(Parte 4) Corregir el salto de jerarquía h2 → h4 convirtiendo el título de cada eje en `<h3>`.**
      Hoy el título del eje vive como `<span style="flex: 1 1 auto; font-weight: 700; font-size: 1.05rem; line-height: 1.3; color: #ffffff;">Eje N: …</span>` dentro del `<summary>`, y el número va en un `<span aria-hidden="true" …>N</span>`. Cambio: envolver el texto del eje en un `<h3>` con los MISMOS estilos inline que tenía el `<span>` de título, más `margin: 0px;` para que no rompa el layout flex del `<summary>`. Es decir, reemplazar ese `<span>` de título por `<h3 style="flex: 1 1 auto; font-weight: 700; font-size: 1.05rem; line-height: 1.3; color: #ffffff; margin: 0px;">Eje N: …</h3>`. Conservar intacto el `<span aria-hidden="true">` del número. Hacerlo en los 3 ejes. Los temas siguen siendo `<h4>`, de modo que la jerarquía queda h1 > h2 (Ejes temáticos) > h3 (eje) > h4 (tema), sin saltos. No alterar `<details>`/`<summary>` ni su funcionamiento.
      Decisión de diseño: se usa `<h3>` dentro del `<summary>` (en vez de migrar al acordeón GOV.CO del design system) porque el requisito es mantener el formato aplanado de SharePoint y no introducir clases/JS nuevos; un `<h3>` inline resuelve `heading-order` sin cambiar el patrón del archivo.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/presentacion/index.html`
      Verify: releer los 3 `<summary>` y confirmar que cada uno contiene `<span aria-hidden="true">N</span>` + `<h3 …>Eje N: …</h3>`; `grep` NO debe hallar el `<span>` de título de eje con `font-size: 1.05rem` sin `aria-hidden`; conteo balanceado `<h3>`/`</h3>` (3 nuevos pares, más el `<h3>Logos de los aliados</h3>` ya existente). Confirmar que no hay ningún `<h4>` sin un `<h3>` previo en el flujo del documento.

---

# ARCHIVO 2: `programacion/index.html`

Criterio CONSERVADOR: cambiar SOLO los `<h3>` cuyo texto ES exactamente el nombre del tema/eje. No tocar títulos de ponencias, nombres de personas, entidades, descripciones, horas ni badges de modalidad (Virtual/Presencial). Cada reemplazo es sobre el contenido textual del `<h3>`; conservar íntegro el atributo `style` del `<h3>`.

- [ ] 9. **(Parte 5) Homogeneizar los `<h3>` que nombran el tema del eje a su nombre OFICIAL.**
      Aplicar estos reemplazos exactos (ubicaciones aproximadas confirmadas por grep):
      - Línea ~138, `<h3>`: `Cuerpos, movimiento, sensibilidades y afectos` → `Cuerpos, movimiento y lenguajes sensibles` (encuentro cuyo título ES el tema → cambiar).
      - Línea ~246, `<h3>`: `Artes, culturas y memoria` → `Artes, culturas y memoria comunitaria`.
      - Línea ~293, `<h3>`: `Conocimiento sensible como bien público` → `Conocimiento artístico como bien público`.
      - Línea ~396, `<h3>`: `Conocimiento sensible como bien público — espacio de conversación interinstitucional` → `Conocimiento artístico como bien público — espacio de conversación interinstitucional` (conservar " — espacio de conversación interinstitucional" y el separador `—` tal cual).
      - Línea ~304, `<h3>`: `Economías culturales basadas en las artes` → `Economías creativas, culturales y sostenibilidad`.
      - Línea ~191, `<h3>`: `Inteligencia relacional e investigación artística en la era generativa` → `Inteligencia Relacional`.
      - Línea ~347, `<h3>`: `Archivo y memoria viva` → `Archivo, patrimonio y memoria viva`.
      - Línea ~335, `<h3>`: `Curadurías críticas` (texto exacto del `<h3>`) → `Curadurías críticas y mediación cultural`.
      Files: `sites/culturas/cms/congreso-investigacion-artistica/programacion/index.html`
      Verify: `grep` tras editar: NO deben quedar en NINGÚN `<h3>` las cadenas "Conocimiento sensible", "Economías culturales basadas", "Archivo y memoria viva<", ni "Cuerpos, movimiento, sensibilidades y afectos<" (nótese el `<` que marca fin de `<h3>`, para no confundir con la ponencia de la línea ~224). Confirmar presencia de los 8 nombres oficiales. Hacer cada reemplazo con contexto suficiente (incluir parte del `style` o el cierre `</h3>`) para no afectar otras apariciones.

- [ ] 10. **(Parte 5 — exclusiones, verificación de que NO se tocaron) Confirmar que los títulos propios quedaron intactos.**
      Verificar explícitamente que NO se modificaron:
      - Línea ~80: `Justicia epistémica y ética de la investigación` (título propio de actividad del Día 1).
      - Línea ~149: `Pedagogías situadas — Proyecto TransMigrARTS (Fondos UE-H2020 No. 101007587)` (título de actividad concreta).
      - Línea ~179: `Perspectivas ecológicas` (ya coincide con el oficial → se deja igual).
      - Línea ~224: `Cuerpos, movimiento, sensibilidades y afectos: ¿Desde hace cuánto tiempo no estamos aquí? …` (ponencia individual con subtítulo propio → NO cambiar, pese a empezar con el nombre del tema; el criterio conservador solo toca los `<h3>` cuyo texto ES el nombre del tema).
      Files: `sites/culturas/cms/congreso-investigacion-artistica/programacion/index.html` (solo lectura/verificación)
      Verify: `grep` debe seguir hallando esas 4 cadenas sin cambios. Confirmar que las badges "Virtual"/"Presencial", horas, personas y entidades alrededor de los `<h3>` editados en el ítem 9 permanecen idénticas.

---

# Verificación final (ambos archivos)

- [ ] 11. **Chequeo estructural de cierre.**
      En cada archivo, confirmar que `<div id="contenido-cms">` abre exactamente una vez y que el documento cierra con el `</div>` correspondiente seguido del `​<br/>` final que ya existía; que no se agregó ni perdió ningún `</div>`. Releer de principio a fin los dos archivos para detectar texto residual de la versión "Sur Global" dentro de `#contenido-cms`.
      Files: ambos.
      Verify: conteo global de `<div>` vs `</div>` igualado en cada archivo (respecto al conteo original, que no debe cambiar salvo por el `<ul>` de modalidades, que no añade `<div>`); `grep` final de "Sur Global" y "saberes sensibles" en `presentacion/index.html` → 0 resultados.

---

## Notas / supuestos

- **Aliados institucionales (fuera de alcance del encargo):** el TEXTO OFICIAL nombra 7 entidades; el HTML publica 8 (añade "Teatro Mayor Julio Mario Santo Domingo" y la sigla "UNIPAZ" en lugar del nombre completo). El encargo (Parte 1) solo pide alinear el párrafo 1 de Presentación, no la lista de aliados ni los logos. Supuesto: NO se modifica la sección "Aliados institucionales" ni los logos. Si el equipo quiere reconciliarla, es una decisión de contenido aparte.
- **Comillas de las citas (Parte 3):** se usan comillas latinas «…» por coherencia con el uso en Programación; si el equipo prefiere comillas rectas, es un ajuste trivial.
- **Ficha superior de Presentación** (Entidad/Fecha/Lugar): los datos ya coinciden con el oficial; no se tocan.
