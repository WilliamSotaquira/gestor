# Validación de biografías — Invitados Congreso de Investigación Artística

Comparación entre el documento aprobado por el Equipo Coordinador
(`PERFILES PARTICIPANTES 2.md`) y la fuente de render
(`invitados/datos.js`, array `INVITADOS`).

- **Alcance:** solo las biografías de invitados presentes en AMBAS fuentes.
- **Qué NO se reporta** (por decisión de diseño): el sufijo `&#160;&#160;`, las
  etiquetas `<em>`, el reordenamiento o la condensación de párrafos cuando el
  contenido factual se conserva, ni diferencias de puntuación/mayúsculas de
  estilo. En datos.js las bios suelen ser una versión **resumida** de las del
  documento; eso es editorial y solo se reporta cuando el resumen **elimina un
  dato factual** o **introduce un dato que no está en la fuente aprobada**.
- **Base64 de la columna Fotografía:** ignorada por completo.

Leyenda de ESTADO:
- **OK** — equivalente en contenido factual (puede estar resumido).
- **DISCREPANCIA** — diferencia factual o de nombre que conviene revisar.
- **SIN CONTRAPARTE** — invitado en datos.js que el documento no trae con bio.

---

## Invitados comparados

### 1. Gabriel Vélez — `gabriel-velez` — DISCREPANCIA (menor, nombre propio)
- **Nombre:** ambas fuentes escriben **"Gabriel Marío Vélez"** con tilde en
  "Marío". Lo correcto es **"Mario"** (sin tilde). El error está en las DOS
  fuentes, por lo que no es una divergencia doc↔datos.js, pero conviene
  corregirlo en datos.js. *(prioridad baja)*
- Contenido: el resumen de datos.js omite varias obras/cargos del documento
  (ej. "Transeúntes Medellín" como obra destacada, "presidente de la Asociación
  Colombiana de Facultades de Arte"). datos.js SÍ conserva presidente de ACFA y
  comisionado Conaces. Factualmente equivalente. **OK en contenido.**

### 2. Pedro Pablo Gómez — `pedro-pablo-gomez` — OK
- datos.js resume la lista de libros (omite "Agenciamientos músico-plásticos" y
  acorta títulos), pero no cambia datos factuales. Universidades, grados y
  coautoría con Walter Mignolo coinciden. Condensación editorial aceptable.

### 3. Ritzy Medina — `ritzy-medina-cuentas` — DISCREPANCIA (dato omitido)
- **Formación:** el documento dice antropóloga **"de la Universidad de Caldas,
  de Desarrollo y Cultura, y de la Fundación Universitaria Iberoamericana"**.
  datos.js dice "con formación en Desarrollo y Cultura y en **Educación**".
  El documento no menciona "Educación"; sí menciona la **Fundación
  Universitaria Iberoamericana**, que datos.js no recoge. *(prioridad media)*
- datos.js omite todo el párrafo intermedio sobre líneas de trabajo
  (investigación etnográfica, pedagogías situadas, memoria/muerte/territorialidad
  en el Caribe). Es resumen; no contradice datos. El punto a revisar es el
  cambio "Iberoamericana" → "Educación".

### 4. Tania Delgado — `tania-delgado` — OK
- datos.js conserva los datos clave (Red Académica de Diseño, Mesa I+C de
  Colciencias, libro *Ética en la creación*). Resumen aceptable.

### 5. Carlos Sepúlveda — `carlos-sepulveda` — OK
- Grados, "al menos 70 montajes", "más de 25 años", Teatro Occidente y líneas de
  investigación coinciden. Resumen aceptable.

### 6. Juan Alejandro Chindoy — `juan-alejandro-chindoy` — OK
- Grados, Southern Illinois University, Universidad de Caldas, pueblo kamëntšá,
  libros *Pensar desde Tierras Indígenas* (Herder, Feria del Libro 2026) y
  *Time, Beauty and Spirit in Kamëntšá Culture* (2020) coinciden.

### 7. Wilfran Barrios — `wilfran-barrios` — OK
- Texto idéntico (datos.js solo añade el sufijo `&#160;&#160;`). Coincide al 100 %.

### 8. Catalina del Castillo — `catalina-del-castillo-silva` — DISCREPANCIA (etiqueta de nombre + dato omitido)
- **Nombre:** el documento la nombra **"Catalina del Castillo"**; datos.js usa
  **"Catalina Del Castillo Silva"** (añade apellido "Silva" y "Del" con mayúscula).
  Verificar cuál es la forma deseada para el render. *(prioridad media)*
- **Obras:** el documento lista "Feroz, Carmen Buffa, Hermana República, **La
  Real Academia de las Buenas Maneras** y Planeta Rojo"; datos.js conserva Feroz,
  Carmen Buffa, Hermana República y Planeta Rojo, pero **omite "La Real Academia
  de las Buenas Maneras"**. *(prioridad baja)*
- datos.js omite "máster" vs "MA" (equivalente) y detalles de profesora invitada;
  es resumen aceptable.

### 9. Manuel Fernando García García — `manuel-fernando-garcia-garcia` — DISCREPANCIA (datos omitidos)
- datos.js omite los **años** de los títulos (antropólogo 2002, especialista
  2010, magíster 2018) y, sobre todo, el periodo **2019-2024 como director de la
  División de Investigación Tecnológica Aplicada (DITA) y la Editorial TEINCO de
  TEINCO**, cargo que el documento sí trae. Es omisión de contenido factual.
  *(prioridad media)*

### 10. Martín Inthamoussu — `martin-inthamoussu` — OK
- Grados, Yale World Fellow, DeVos Institute, Banco Mundial, BID, SODRE y ambas
  publicaciones del BID (2024 y 2025) coinciden.

### 11. Javier Machicado — `javier-machicado` — OK
- Texto prácticamente idéntico. Coincide.

### 12. Adriana González Hassig — `adriana-gonzalez-hassig` — OK
- Texto idéntico (solo sufijo `&#160;&#160;`). Coincide al 100 %.

### 13. Blanca Botero — `blanca-botero` — DISCREPANCIA (ortografía + datos omitidos)
- **"Sáhara" vs "Sahara":** el documento escribe **"desierto del Sáhara"**;
  datos.js **"desierto del Sahara"**. La RAE admite "Sáhara/Sahara"; es
  variante de tilde, revisar consistencia. *(prioridad baja)*
- datos.js omite datos: finalista de **Talents Contemporains de la Fondation
  François Schneider (Francia)** y la pertenencia a la **junta directiva de
  Amazon Aid Foundation**. Son omisiones de contenido. *(prioridad baja/media)*

### 14. Consejo Ancestral Willka Yaku — `consejo-ancestral-willka-yaku` — OK
- datos.js integra correctamente los nombres (Eyder Fabio Calambás y Phuyu Uma
  Jennifer Ávila). Resume hitos curatoriales; conserva los principales. El
  documento añade "Museo de Bellas Artes de Montreal" (datos.js lo conserva) y
  docencia en Misak Universidad (datos.js lo conserva). Aceptable.
- Nota ortográfica: el documento escribe "Pacifico" sin tilde; datos.js corrige
  a "Pacífico" (correcto).

### 15. Ana María Arango — `ana-maria-arango` — DISCREPANCIA (nombre de centro + obras)
- **"Corporaloteca" vs "Corporaloteca"/"Oraloteca":** la etiqueta del documento
  dice "**Oraloteca** UTCH" en la columna de participación, pero el cuerpo del
  perfil dice centro **"Corporaloteca"**; datos.js usa "Corporaloteca". Hay
  ambigüedad en la propia fuente (Oraloteca vs Corporaloteca). Verificar el
  nombre correcto del centro. *(prioridad media)*
- datos.js omite dos libros que trae el documento: **"Los hijos del Okendo"** y
  **"Dignificar lo que somos"**, y recorta el título de *Renacientes*. Omisión
  de contenido. *(prioridad baja)*

### 16. Óscar Hernández Salgar — `oscar-hernandez-salgar` — DISCREPANCIA (datos omitidos)
- datos.js es un resumen fuerte que omite datos del documento:
  secretaría técnica del **Foco de Industrias Creativas en la Misión de Sabios
  2019**, el subtítulo del libro premiado ("Poder y emoción en las músicas
  populares colombianas 1930-1960") y cargos previos en la Javeriana. No hay
  contradicción factual, pero sí pérdida de información aprobada. *(prioridad baja)*
- Nombre: documento "Oscar"; datos.js "Óscar" (con tilde, correcto).

### 17. Valentina Ruiz — `valentina-ruiz` — DISCREPANCIA (nombre inconsistente)
- **Inconsistencia interna en datos.js:** el campo `nombre`/`alt`/`slug` usa
  **"Valentina Ruiz"** (sin tilde), pero la bio escribe **"Valentina Ruíz"**
  (con tilde). El documento también escribe "Ruíz". La forma correcta del
  apellido es **"Ruiz"** (sin tilde). Unificar a "Ruiz" en la bio. *(prioridad media)*
- Contenido equivalente ("proto fotográficas y posfotográficas" → "proto y
  posfotográficas"; mismo sentido).

### 18. Edgar Puentes — `edgar-puentes` — OK
- Datos clave coinciden (Misión de Sabios 2019, Filarmónica 29 años, "Concierto
  Cerebro" con Rodolfo Llinás, Maleta "Viajeros de la Música"). Resumen aceptable.

### 19. Eliécer Arenas — `eliecer-arenas` — OK
- Texto casi idéntico; coincide en todos los datos.

### 20. Pilar Riaño Alcalá — `pilar-riano-alcala` — SIN BIO EN DOCUMENTO (revisar)
- En el documento, la **columna de perfil de Pilar Riaño quedó vacía de
  biografía**: solo contiene cargos sueltos y un enlace (Graduate Co-Chair,
  Social Justice Institute, Transformative Memory International Network, UBC).
  **No hay texto biográfico aprobado para comparar.**
- La bio de datos.js (profesora del Instituto de Justicia Social de la UBC,
  antropóloga, libros *Re-membering the Fragmented*, etc.) **no tiene respaldo en
  este documento**; proviene de otra fuente. **Acción recomendada: solicitar al
  comité la biografía definitiva de Pilar Riaño.** *(prioridad ALTA)*

### 21. Camila Camacho — `camila-camacho` — OK
- Texto idéntico. Coincide al 100 %.

### 22. Víctor Capador — `victor-capador` — OK
- Texto prácticamente idéntico. Coincide.

### 23. Paola Wilches — `paola-wilches` — OK (cambio de persona gramatical intencional)
- El documento está en primera persona ("Mi vida profesional…"); datos.js lo
  pasa a tercera persona ("Su vida profesional…"). Es ajuste editorial correcto;
  los datos coinciden. datos.js resume el cierre pero no cambia hechos.

### 24. Pedro Henrique Lira Vilela — `pedro-vilela` — DISCREPANCIA (varias divergencias factuales)
- Es el mismo Pedro Vilela (Brasil/Portugal). Las dos bios **divergen de forma
  importante** y no son resumen una de otra:
  - **Fecha/lugar de nacimiento:** datos.js añade **"(Recife, 1985)"**; el
    documento no lo trae.
  - **Trema!:** el documento lo describe como **"fundador y director artístico de
    Trema!, plataforma"** de curaduría/formación/investigación; datos.js dice
    **"Dirige el Trema! Festival desde 2012"** y **"Fundador de TREMA! Revista"**.
    Son descripciones distintas de la misma entidad; el **año 2012** y
    "Revista"/"Festival" no aparecen en el documento. *(prioridad media)*
  - **CRL – Central Eléctrica:** documento "entre 2019 y 2025 fue programador";
    datos.js "programador de CRL entre 2019 y 2025" ✓ coincide.
  - **Premio Magaly Muguercia:** el documento lo nombra **"primer galardonado con
    el Premio Magaly Muguercia, de Iberescena"**; datos.js solo lo menciona dentro
    de la ponencia como "Beca Magaly Muguercia". Dato del documento no reflejado
    en la bio. *(prioridad media)*
  - El documento menciona **FITEI – Festival Internacional de Expresión Ibérica**
    (ausente en datos.js) y datos.js menciona **"Performing Borders"** (ausente en
    el documento).
  - **Enfoque:** datos.js describe "pensamiento descolonial, políticas
    latinoamericanas y cuestiones identitarias y raciales"; el documento habla de
    "estudios decoloniales" y "prácticas epistemológicas, políticas y
    relacionales". Compatible.
  - **Recomendación:** reconciliar ambas versiones con el comité; el documento
    aprobado y datos.js cuentan historias distintas de Trema! y del premio.

### 25. Julieta Infantino — `julieta-infantino` — OK
- datos.js resume (abrevia los títulos de los tres libros y los subtítulos de
  EACUP/CircaInvestigAcción) pero conserva todos los datos factuales:
  UBA, CONICET, especialidad en circo, los tres libros con sus años (2024, 2021,
  2019). Aceptable.

### 26. Nubia Flórez — `nubia-florez` — OK
- Texto prácticamente idéntico; coincide en todos los datos (Universidad del
  Atlántico, Centro Cultural Jorge Eliécer Gaitán, *El cuerpo desatado*,
  proyecto Archivos D, ponencias en Madrid/Riverside/Nueva York).

### 27. Olga Lucía Olaya — `olga-lucia-olaya-parra` — DISCREPANCIA (datos omitidos)
- datos.js resume con fuerza y **omite** cargos que el documento sí trae:
  asesora del Grupo CREA del IDARTES (artes plásticas) y asesora del
  Viceministerio de las Artes / componente de Educación y Formación Artística
  (GEFAC) del Ministerio. Conserva CLEA y Ley 2555 de 2025 "Artes al Aula".
  Omisión de contenido, sin contradicción. *(prioridad baja)*
- Nombre: documento "Olga Lucía Olaya"; datos.js "Olga Lucía Olaya Parra"
  (añade apellido "Parra"). Verificar forma deseada. *(prioridad baja)*

### 28. Monique Martínez — `monique-martinez-thomas` — DISCREPANCIA (datos omitidos)
- datos.js resume con fuerza y omite varios datos del documento: nombres de las
  dos redes nacionales (Réseau des Collèges Doctoraux / Écoles Doctorales Arts et
  Médias), el programa TransMigrARTS con detalle, los títulos de sus libros en
  español, el programa sobre dolor crónico en mujeres y la tesis que dirige.
  No hay contradicción factual; es condensación amplia. *(prioridad baja)*
- Nombre: documento "Monique Martínez"; datos.js "Monique Martínez Thomas"
  (coincide con el nombre completo del documento "Monique Martínez Thomas").

### 29. María Teresa García Schlegel — `maria-teresa-garcia-schlegel` — DISCREPANCIA (dato omitido)
- datos.js **omite** que fue bailarina **"del Grupo Especial de Ballet ICEF"** y
  **"Maestra del Grupo Especial de Ballet ICEF"**, y la aclaración "(Priscilla
  Welton)" del Ballet Nacional de Colombia. Conserva grados y universidades
  (equivalentes). Omisión de contenido. *(prioridad baja)*
- datos.js dirige "Sonia Castillo Ballén" como directora del grupo (el documento
  lo menciona); datos.js no lo recoge, solo la línea de investigación. Aceptable.

### 30. Álvaro Hernández — `alvaro-hernandez` — OK
- datos.js resume (omite máster en Escritura Creativa UNAL, estudios de teatro en
  Japón, consejo Intercultural Roots, coordinación Unidad I+C 2020-2025). No hay
  contradicción factual; condensación amplia. Datos clave coinciden (UC Davis,
  Entrópico, RISE TransmigrArts 2021-2025, "Colombia más que humana").

### 31. Sandra Camacho — `sandra-camacho-lopez` — OK
- datos.js resume (omite Psicología U. Santo Tomás, lista completa de capítulos y
  revistas). Datos clave coinciden (Universidad de Antioquia, LLA-CRÉATIS
  Toulouse, Sorbonne-Nouvelle París 3, ASAB, TransMigrARTS, *Poéticas del
  desarraigo*). Aceptable. *Nota: el apellido "López" del slug/nombre no aparece
  en el documento, que solo dice "Sandra Camacho".* *(prioridad baja)*

### 32. Ramiro Osorio — `ramiro-osorio-fonseca` — OK
- Texto casi íntegro; coincide en todos los datos. datos.js omite "Académico de
  Honor de la Academia de las Artes Escénicas de España" en la lista final de
  condecoraciones. *(prioridad baja)*

### 33. Carolina Chacón — `carolina-chacon-bernal` — OK
- datos.js resume (omite publicaciones concretas y detalle del trabajo
  curatorial). Datos clave coinciden (U. Complutense, U. Distrital, Museo de
  Antioquia, 47 Salón Nacional "Kauka", U. Nacional sede Medellín). Aceptable.
- Nombre: documento "Carolina Chacón"; datos.js "Carolina Chacón Bernal".

### 34. Eider Yangana — `eider-yangana` — OK
- datos.js resume (omite The Box Gallery como "California", "Imagen regional 9",
  Artecámara, Artbo 2019, articulador EIAPV Cauca Sur, Cormacizo). Datos clave
  coinciden. Condensación aceptable.

### 35. Jaime Cerón Silva — `jaime-ceron-silva` — OK
- datos.js conserva los proyectos curatoriales y resume las publicaciones (deja
  los textos sobre Miler Lagos y Carlos Motta como referencias). Datos
  coinciden. Aceptable.

### 36. Lara Lookabaugh — `lara-lookabaugh` — OK
- datos.js conserva todos los datos (Vanderbilt, mayas mam en Guatemala,
  Desirable Futures, doctorado UNC Chapel Hill, maestrías Florida y Florida
  State). Solo omite la frase "que reúne a académicos para explorar las
  construcciones coloniales del tiempo". Equivalente.

### 37. Jeffrey Amador — `jeffrey-amador` — DISCREPANCIA (nombre propio, compartido)
- **"Carillo" vs "Carrillo":** ambas fuentes escriben **"Jeffrey Amador
  Carillo"** con una sola "r". El apellido correcto es casi con certeza
  **"Carrillo"** (doble "r"). El error está en las dos fuentes; conviene verificar
  con el invitado y corregir en datos.js. *(prioridad media)*
- Resto del texto: idéntico. Coincide.

### 38. Natalia Castellanos — `natalia-castellanos` — DISCREPANCIA (dato divergente)
- El documento tiene una redacción confusa: "universidades como la PUJ, la
  Universidad Central y el **Instituto de Ciencia, Tecnología e Innovación**…".
  datos.js lo interpreta como "la PUJ, la Universidad Central y **la UPN**, el
  **Ministerio de Ciencia, Tecnología e Innovación**…". Aparece la **UPN** en
  datos.js (no en el documento) y "Ministerio" donde el documento dice
  "Instituto". Verificar la lista correcta de entidades. *(prioridad media)*

### 39. Carlos Dueñas — `carlos-duenas` — OK
- Texto prácticamente íntegro; coincide en todos los datos (coordinador académico
  del Congreso, cantante lírico, Impromptus, Grupo Lírico Fusión 2000-2002).

---

## Invitados en datos.js SIN contraparte en el documento

Estos perfiles existen en `datos.js` pero el documento aprobado no los trae con
biografía, por lo que **no se compararon** (comité académico y moderación):

- Lina María Villegas Hincapié (`lina-maria-villegas-hincapie`, académico)
- Eduardo Sánchez Medina (`eduardo-sanchez-medina`, académico)
- Aníbal Maldonado Currea (`anibal-maldonado-currea`, académico)
- Sonia Castillo Ballen (`sonia-castillo-ballen`, académico)
- Claudia Salamanca (`claudia-salamanca`, académico)
- Mónica Marcell Romero Sánchez (`monica-marcell-romero-sanchez`, académico)
- Carlos Alberto Vasquez Rodríguez (`carlos-alberto-vasquez-rodriguez`, académico)
  — *nota: el slug/nombre escribe "Vasquez" sin tilde; la forma correcta es
  "Vásquez".*
- Leonidas Valencia Valencia (`leonidas-valencia-valencia`, académico)

---

## Resumen

**Totales (39 invitados comparados):**
- OK (contenido equivalente): **22**
- DISCREPANCIA (revisar): **16**
- Caso crítico sin bio en el documento: **1** (Pilar Riaño Alcalá)
- Sin contraparte en el documento: **8** (no comparados)

> Nota: Pilar Riaño cuenta tanto en "DISCREPANCIA/crítico" como en el recuento de
> prioridad ALTA; los 16 "DISCREPANCIA" incluyen ese caso.

### Correcciones recomendadas, priorizadas (NO aplicadas)

**Prioridad ALTA**
1. **Pilar Riaño Alcalá:** el documento aprobado NO trae biografía (solo cargos y
   un enlace). La bio de datos.js proviene de otra fuente. Solicitar al comité la
   biografía oficial y validar la de datos.js antes de publicar.

**Prioridad MEDIA (verificar dato/nombre antes de ajustar)**
2. **Pedro Vilela:** reconciliar las dos versiones divergentes (Trema!
   Festival/Revista vs "plataforma", año 2012, Premio/Beca Magaly Muguercia,
   "(Recife, 1985)", FITEI vs Performing Borders).
3. **Valentina Ruiz:** unificar el apellido en la bio ("Ruíz" → "Ruiz") para que
   coincida con `nombre`/`slug`/`alt`.
4. **Jeffrey Amador "Carillo" → "Carrillo":** verificar el apellido con el
   invitado; probable error de dedo compartido por ambas fuentes.
5. **Ritzy Medina:** revisar formación — documento dice "Fundación Universitaria
   Iberoamericana"; datos.js dice "Educación".
6. **Catalina del Castillo:** definir la etiqueta de nombre
   ("del Castillo" vs "Del Castillo Silva").
7. **Ana María Arango:** aclarar el nombre del centro ("Corporaloteca" vs
   "Oraloteca", ambiguo en la propia fuente).
8. **Manuel Fernando García García:** reponer, si el comité lo quiere, el periodo
   2019-2024 como director de DITA y Editorial TEINCO.
9. **Natalia Castellanos:** revisar la lista de entidades (UPN y
   Ministerio/Instituto de Ciencia, Tecnología e Innovación).

**Prioridad BAJA (ortografía / datos omitidos por resumen)**
10. **Gabriel "Marío" Vélez → "Mario":** corregir la tilde en datos.js.
11. **Blanca Botero:** "Sahara/Sáhara" (consistencia) y, si se desea, reponer
    Talents Contemporains y Amazon Aid Foundation.
12. Datos omitidos por condensación (sin contradicción) que el comité podría
    querer de vuelta: Óscar Hernández (Misión de Sabios 2019, subtítulo del
    libro), Olga Lucía Olaya (CREA/GEFAC), Monique Martínez (redes y libros),
    María Teresa García Schlegel (Grupo Especial de Ballet ICEF), Ramiro Osorio
    (Academia de las Artes Escénicas de España), Catalina del Castillo ("La Real
    Academia de las Buenas Maneras"), Ana María Arango ("Los hijos del Okendo",
    "Dignificar lo que somos").
13. **Carlos Alberto "Vasquez" → "Vásquez"** en el bloque de comité académico
    (sin contraparte, pero es un error de tilde en datos.js).

> Ninguna de estas correcciones fue aplicada. Este informe es solo de validación.
