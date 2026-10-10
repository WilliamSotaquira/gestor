# Revisión — Alineación al TEXTO OFICIAL de Presentación y Programación

La edición alinea el contenido publicable de dos páginas del micrositio (portal de Culturas sobre SharePoint) al TEXTO OFICIAL: reescribe la sección Presentación y la de público, renombra los 11 temas de los tres ejes, añade la atribución de las citas del Plan Nacional de Cultura, corrige el salto de jerarquía de encabezados, y homogeneiza los `<h3>` de Programación que nombran temas de eje sin tocar datos de agenda. La verificación se hizo por lectura directa de ambos archivos y por conteo de etiquetas; no se ejecutaron builds (no permitido / sin toolchain).

Watch for: nada bloqueante. Se verificó tema por tema, cita por cita, y el balance de etiquetas. Un único punto fuera de alcance declarado en el plan (lista de "Aliados": 8 publicados vs. 7 del oficial) se mantiene intencionalmente sin tocar y no afecta el encargo.

**Verdict**: APPROVED

## High-level view

El `<h1>` conserva el título corto sin el subtítulo "Sur Global", y el primer párrafo de Presentación termina en "…Investigación Artística." sin arrastre del subtítulo. Los siete párrafos oficiales están presentes y en orden, con "en alianza con", el convenio No. 0968-2026, las fechas 3 al 6 de noviembre de 2026 y las seis universidades; el párrafo no oficial de "protocolos bioéticos" fue eliminado y las cuatro modalidades quedaron como lista `<ul>` con nombres y glosas exactos.

La sección de público refleja la sección 2 oficial, incluyendo "redes académicas", "asistentes y ponentes", "campo abierto" y "diálogo intercultural", sin los añadidos no oficiales.

Los 11 temas usan los nombres oficiales en los tres ejes y cada eje incluye su cita del Plan con atribución y página correcta (p. 62, p. 92, p. 122). El título de cada eje es ahora un `<h3>` dentro del `<summary>`, de modo que la jerarquía queda h1 > h2 > h3 > h4 sin saltos, conservando el acordeón `<details>/<summary>` nativo.

En Programación solo cambiaron los `<h3>` cuyo texto es exactamente el nombre de un tema de eje (ocho casos); horas, personas, entidades, descripciones y badges Virtual/Presencial quedaron intactos, y los dos casos marcados como "no cambiar" se conservaron.

Ambos archivos quedan con etiquetas balanceadas y todo el contenido dentro de `<div id="contenido-cms">`; no se introdujo `<script>`, `<link>`, CDN ni clases GOV.CO externas; los estilos nuevos van inline, coherentes con el aplanado de SharePoint.

<details>
<summary>Issues (1)</summary>

1. **Lista de aliados fuera de alcance** (informativo, no bloqueante) — "Aliados institucionales" publica 8 entidades frente a las 7 del oficial (añade Teatro Mayor Julio Mario Santo Domingo y usa la sigla UNIPAZ). El plan declara esto fuera del encargo; si el equipo de contenido quiere reconciliarlo, es una decisión aparte.

</details>

<details>
<summary>Details</summary>

### Parte 1 — Presentación: título y siete párrafos

El `<h1>` es `Primer Congreso Nacional e Internacional de Investigación Artística`, sin el subtítulo "La soberanía de los saberes… Sur Global". El párrafo 1 cierra en "…realizará del 3 al 6 de noviembre de 2026 el Primer Congreso Nacional e Internacional de Investigación Artística." sin arrastre del subtítulo, y usa "en alianza con" (no "en asocio con"). Se conservan el Convenio No. 0968-2026, las fechas y las seis universidades (Antioquia, Atlántico, Distrital Francisco José de Caldas, Javeriana, Tecnológica del Chocó, Instituto Universitario de la Paz) con el nombre completo del último, sin la sigla "(UNIPAZ)" que traía la versión anterior.

Los siete párrafos coinciden con la sección 1 del oficial, en orden. El párrafo no oficial de "protocolos bioéticos / capital de las comunidades territoriales" fue eliminado y no se inventó un octavo párrafo. Las cuatro modalidades quedaron como lista `<ul style="padding-left: 1.25rem;">` con cuatro `<li>`, cada uno con el nombre en `<strong>` y la glosa exacta del oficial: Investigación + Creación (I+C), Investigación por, en y a través de las artes, Creación investigadora, Investigación y creación aplicada. Las búsquedas de los textos descartados ("en asocio con", "saberes sensibles", "protocolos bioéticos", "cocrear", "Sur Global") no devuelven resultados en el archivo.

### Parte 1 — Público destinatario

El único `<p>` bajo "¿A qué público está dirigido este encuentro?" reproduce la sección 2 oficial en dos oraciones: incluye "redes académicas", "asistentes y ponentes", "campo abierto" y "diálogo intercultural". Los términos de la versión anterior ("campo expandido", "diversidad intercultural", "del sector artístico y cultural internacional", "amplio espectro de trayectorias") ya no aparecen.

### Parte 2 — Nombres y descripciones de los 11 temas

Los tres ejes conservan su título y cada tema usa el nombre oficial. Eje 1: Perspectivas ecológicas; Diálogo de saberes y equidad del conocimiento; Cuerpos, movimiento y lenguajes sensibles; Artes, culturas y memoria comunitaria. Eje 2: Pedagogías situadas y formación artística; Archivo, patrimonio y memoria viva; Curadurías críticas y mediación cultural. Eje 3: Conocimiento artístico como bien público; Economías creativas, culturales y sostenibilidad; Inteligencia Relacional; Ética de la investigación. Las descripciones leídas coinciden con las glosas oficiales y conservan los `style` inline de cada `<h4>` y los `&#160;&#160;` finales. No quedan rastros de los nombres antiguos ("saberes otros", "agencias posibles", "resistencias y contrarrelatos", "era generativa", "conocimiento situado y territorio", etc.).

### Parte 3 — Citas del Plan Nacional de Cultura

Cada eje abre con su cita entre comillas latinas « » y cierra con la atribución correcta antes del `</p>`: Eje 1 "(Plan Nacional de Cultura, 2024, p. 62)", Eje 2 "p. 92", Eje 3 "p. 122". Las tres aparecen una vez cada una.

### Parte 4 — Jerarquía de encabezados

El título de cada eje es ahora `<h3 style="flex: 1 1 auto; … margin: 0px;">Eje N: …</h3>` dentro del `<summary>`, conservando el `<span aria-hidden="true">N</span>` del número. La jerarquía queda h1 (congreso) > h2 (Ejes temáticos) > h3 (eje) > h4 (tema), sin saltar niveles, lo que resuelve el hallazgo `heading-order`. Los acordeones `<details>/<summary>` siguen siendo nativos y funcionales. El conteo arroja 4 `<h3>` (3 ejes + "Logos de los aliados" preexistente) y 11 `<h4>`, todos balanceados.

### Parte 5 — Programación: renombrados conservadores

Se renombraron solo los `<h3>` cuyo texto es exactamente el nombre de un tema de eje: Cuerpos, movimiento y lenguajes sensibles (138); Artes, culturas y memoria comunitaria (246); Conocimiento artístico como bien público (293 y, con su sufijo " — espacio de conversación interinstitucional", 396); Economías creativas, culturales y sostenibilidad (304); Inteligencia Relacional (191); Archivo, patrimonio y memoria viva (347); Curadurías críticas y mediación cultural (335). Perspectivas ecológicas (179) ya coincidía y se dejó igual.

Los casos marcados como no cambiar se conservan: "Justicia epistémica y ética de la investigación" (80, título propio de actividad) y "Pedagogías situadas — Proyecto TransMigrARTS (Fondos UE-H2020 No. 101007587)" (149). La ponencia de la línea 224, cuyo título empieza con "Cuerpos, movimiento, sensibilidades y afectos:" pero continúa con un subtítulo propio, no se tocó, respetando el criterio conservador. Las personas, entidades, horas, descripciones y badges Virtual/Presencial alrededor de los `<h3>` editados permanecen idénticos.

### Integridad estructural

El conteo de etiquetas está balanceado en ambos archivos: presentacion (div 6/6, details 3/3, summary 3/3, h3 4/4, h4 11/11, ul 3/3, li 15/15, p 24/24) y programacion (div 153/153, details 4/4, summary 4/4, h3 49/49, h4 5/5, ul 34/34, li 92/92, p 17/17). En ambos, `<div id="contenido-cms">` abre una sola vez y el documento cierra con su `</div>` seguido del `<br/>` final. No se introdujo `<script>`, `<link>`, CDN ni clases GOV.CO externas; los estilos nuevos (lista de modalidades) van inline. "Sur Global" y "saberes sensibles" no aparecen en Presentación.

</details>

<details>
<summary>Mapa de archivos</summary>

- `presentacion/index.html` — reescritura de los 7 párrafos de Presentación + 4 modalidades como lista; párrafo de público; 11 temas renombrados con descripciones oficiales; 3 citas con atribución; títulos de eje convertidos a `<h3>`.
- `programacion/index.html` — 8 `<h3>` de temas de eje homogeneizados a nombres oficiales; resto de la agenda intacto.

Fuente de verdad: TEXTO OFICIAL del encargo. Verificación por lectura y conteo de etiquetas (sin build).

</details>
