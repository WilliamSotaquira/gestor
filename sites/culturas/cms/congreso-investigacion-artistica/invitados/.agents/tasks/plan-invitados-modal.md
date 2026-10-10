# Plan de implementación — Página de invitados con modal sin JS (portal de Culturas, SharePoint)

Archivo único a reconstruir: `c:\gestor\sites\culturas\cms\congreso-investigacion-artistica\invitados\index.html`

Este plan reconstruye la página para que cada perfil se abra en un **modal sin JavaScript** (el patrón que el usuario pidió recuperar), reemplazando los acordeones `<details>` actuales, y preservando TODO el contenido textual verbatim.

---

## (a) Decisión del patrón de modal y su justificación

**Decisión: Opción (2) — un único `<style>` scoped bajo `#contenido-cms` con reglas `:target`, y el resto de estilos inline.**

### Evidencia encontrada en el micrositio / portal

Se confirmó que el gestor de contenidos de Culturas (publicado sobre SharePoint) **sí tolera un bloque `<style>` embebido dentro de `#contenido-cms`**. Precedentes publicados en el mismo portal:

- `sites/culturas/cms/direcciones/dede/convocatoria.html` — es el precedente más cercano: abre con `<div id="contenido-cms">` e **inmediatamente** incluye un `<style>` con un comentario explícito: "ESTILOS ESCOPADOS — no afectan al layout SharePoint". Todas sus reglas van prefijadas con `#contenido-cms ...` y usa pseudo-selectores (`:focus-visible`, `:hover`, `:not(.collapsed)`, `@media`). Demuestra exactamente el patrón que necesitamos: reglas CSS reales, scoped al contenedor, conviviendo con el tema de SharePoint.
- Uso de `<style>` embebido en muchos otros archivos cms publicados del portal: `participa/*.html` (consulta, control, colaboracion, planeacion, general, rendicion, participacion), `transparencia/preguntas.html`, `direcciones/patrimonio-y-memoria/directorio.html`, `direcciones/artes/grupo-de-circo/directorio.html`, `ejes-estrategicos.html`, `guia-del-usuario.html`, `inicio/directorio-principal.html`, `especiales/index.html`, `escenario-del-mundo.html`. Varios usan `!important` para pisar el tema (p. ej. `participa/consulta.html` con `#accordionHerramientas .accordion-button { background-color:#EAEAFE !important; }`).

### Por qué `:target` y no checkbox-hack

- La Opción (1) **checkbox-hack puro** requiere `<input type="checkbox">` + `<label>` + un selector de hermanos (`:checked ~ ...`) que **igualmente necesita una regla CSS externa**: no se puede expresar inline. No ahorra el `<style>`, y añade controles de formulario superfluos que SharePoint podría reescribir. Se descarta frente a `:target`, que es más semántico (navegación por hash) y más simple.
- `:target` **no se puede expresar inline** (`#id:target{display:flex}` es una regla, no un atributo `style`). Por tanto el único camino para un modal real sin JS es un pequeño `<style>` scoped. La evidencia anterior confirma que es admisible.
- **Sin JS, sin CDN, autocontenido**: el patrón `:target` abre el overlay cuando la URL termina en `#id-invitado` (al hacer clic en la tarjeta `<a href="#id-invitado">`) y lo cierra con un enlace a `#` o `#cerrar` (o clic en el overlay, que también es un `<a href="#cerrar">` a pantalla completa detrás del panel).

### Fallback declarado

Si el editor de SharePoint llegara a **rechazar o eliminar el `<style>`** al pegar/publicar, el fallback es la **Opción (3)**: conservar `<details>` rediseñados como **tarjetas en grilla** (contenedor `flex-wrap` inline; cada `<details>` es una tarjeta con foto miniatura + nombre + país siempre visibles en el `<summary>`, y la biografía/ponencia en el cuerpo desplegable). Es 100% inline, sin `<style>`, degradación aceptable de "modal" a "tarjeta expandible". **En ningún caso introducir dependencias de CDN, `<script>`, `<link>`, `<dialog>` ni `onclick`.**

> Nota de verificación: en este entorno NO hay render de navegador ni node; la verificación es por inspección estructural del HTML (ver cada feature). La prueba real de aceptación del `<style>` sólo ocurre al pegar en SharePoint; por eso el fallback queda documentado.

---

## (b) Lista completa y ordenada de invitados

Orden de secciones (idéntico al actual): **Invitados internacionales → Invitados nacionales → Moderación**.

Convención de `id` del modal: `inv-<slug>` (slug derivado del nombre, en minúsculas, sin tildes, con guiones). Los `src`/`alt` se copian VERBATIM del archivo actual. "Bio ¶" = número de párrafos de biografía (no incluye el `<p>` de etiqueta categoría/país ni los bloques de ponencia).

### Invitados internacionales (6)

| # | Nombre | Categoría | País | id modal | src foto | alt foto (modal) | Bio ¶ | Ponencia |
|---|--------|-----------|------|----------|----------|------------------|-------|----------|
| 1 | Lara Lookabaugh | Internacional | Estados Unidos | `inv-lara-lookabaugh` | `/especiales/primer-congreso-nacional-internacional-investigacion-artistica/PublishingImages/lara-lookabaugh.jpg` | Retrato de Lara Lookabaugh | 3 | No |
| 2 | Monique Martínez Thomas | Internacional | Francia | `inv-monique-martinez-thomas` | `.../PublishingImages/monique-martinez.jpg` | Retrato de Monique Martínez Thomas | 3 | No |
| 3 | Pedro Vilela | Internacional | Brasil / Portugal | `inv-pedro-vilela` | `.../PublishingImages/pedro-vilela.jpg` | Retrato de Pedro Vilela | 2 | **Sí** (título: "Ponencia: ¿Desde hace cuánto tiempo no estamos aquí?" + subtítulo en `<em>` + 2 párrafos) |
| 4 | Julieta Infantino | Internacional | Argentina | `inv-julieta-infantino` | `.../PublishingImages/julieta-infantino.jpg` | Retrato de Julieta Infantino | 2 | **Sí** (título: "Ponencia (Eje 3: Gobernanza y sostenibilidad cultural)" + subtítulo en `<em>` + 2 párrafos) |
| 5 | Martín Inthamoussu | Internacional | Uruguay | `inv-martin-inthamoussu` | `.../PublishingImages/martin-inthamoussu.jpg` | Retrato de Martín Inthamoussu | 2 | No |
| 6 | Pilar Riaño Alcalá | Internacional | Canadá | `inv-pilar-riano-alcala` | `.../PublishingImages/pilar-riano-alcala.jpg` | Retrato de Pilar Riaño Alcalá | 2 | No |

### Invitados nacionales (27)

| # | Nombre | Categoría | id modal | src foto (archivo) | alt foto (modal) | Bio ¶ | Ponencia |
|---|--------|-----------|----------|--------------------|------------------|-------|----------|
| 7 | Blanca Botero | Nacional | `inv-blanca-botero` | `.../blanca-botero.jpg` | Retrato de Blanca Botero | 2 | No |
| 8 | Carolina Chacón Bernal | Nacional | `inv-carolina-chacon-bernal` | `.../carolina-chacon-bernal.jpg` | Retrato de Carolina Chacón Bernal | 2 | No |
| 9 | Catalina Del Castillo Silva | Nacional | `inv-catalina-del-castillo-silva` | `.../catalina-del-castillo.jpg` | Retrato de Catalina Del Castillo Silva | 2 | No |
| 10 | Eider Yangana | Nacional | `inv-eider-yangana` | `.../eider-yangana.jpg` | Retrato de Eider Yangana | 2 | No |
| 11 | María Teresa García Schlegel | Nacional | `inv-maria-teresa-garcia-schlegel` | `.../maria-teresa-garcia-schlegel.jpg` | Retrato de María Teresa García Schlegel | 2 | No |
| 12 | Ramiro Osorio Fonseca | Nacional | `inv-ramiro-osorio-fonseca` | `.../ramiro-osorio.jpg` | Retrato de Ramiro Osorio Fonseca | 3 | No |
| 13 | Ritzy Katherine Medina Cuentas | Nacional | `inv-ritzy-medina-cuentas` | `.../ritzy-medina.jpg` | Retrato de Ritzy Katherine Medina Cuentas | 2 | No |
| 14 | Sandra Camacho López | Nacional | `inv-sandra-camacho-lopez` | `.../sandra-camacho-lopez.jpg` | Retrato de Sandra Camacho López | 2 | No |
| 15 | Álvaro Hernández | Nacional | `inv-alvaro-hernandez` | `.../alvaro-hernandez.jpg` | Retrato de Álvaro Hernández | 2 | No |
| 16 | Óscar Hernández Salgar | Nacional | `inv-oscar-hernandez-salgar` | `.../oscar-hernandez-salgar.jpg` | Retrato de Óscar Hernández Salgar | 2 | No |
| 17 | Gabriel Vélez | Nacional | `inv-gabriel-velez` | `.../gabriel-velez.jpg` | Retrato de Gabriel Vélez | 2 | No |
| 18 | Pedro Pablo Gómez | Nacional | `inv-pedro-pablo-gomez` | `.../pedro-pablo-gomez.jpg` | Retrato de Pedro Pablo Gómez | 2 | No |
| 19 | Tania Delgado | Nacional | `inv-tania-delgado` | `.../tania-delgado.jpg` | Retrato de Tania Delgado | 2 | No |
| 20 | Carlos Sepúlveda | Nacional | `inv-carlos-sepulveda` | `.../carlos-sepulveda.jpg` | Retrato de Carlos Sepúlveda | 3 | No |
| 21 | Juan Alejandro Chindoy | Nacional | `inv-juan-alejandro-chindoy` | `.../juan-alejandro-chindoy.jpg` | Retrato de Juan Alejandro Chindoy | 2 | No |
| 22 | Consejo Ancestral Willka Yaku | Colectivo · Nacional | `inv-consejo-ancestral-willka-yaku` | `.../consejo-ancestral-willka-yaku.jpg` | Retrato del Consejo Ancestral Willka Yaku | 3 | No |
| 23 | Valentina Ruiz | Nacional | `inv-valentina-ruiz` | `.../valentina-ruiz.jpg` | Retrato de Valentina Ruiz | 2 | No |
| 24 | Edgar Puentes | Nacional | `inv-edgar-puentes` | `.../edgar-puentes.jpg` | Retrato de Edgar Puentes | 2 | No |
| 25 | Eliécer Arenas | Nacional | `inv-eliecer-arenas` | `.../eliecer-arenas.jpg` | Retrato de Eliécer Arenas | 2 | No |
| 26 | Camila Camacho | Nacional | `inv-camila-camacho` | `.../camila-camacho.jpg` | Retrato de Camila Camacho | 1 | No |
| 27 | Víctor Capador | Nacional | `inv-victor-capador` | `.../victor-capador.jpg` | Retrato de Víctor Capador | 2 | No |
| 28 | Paola Wilches | Nacional | `inv-paola-wilches` | `.../paola-wilches.jpg` | Retrato de Paola Wilches | 2 | No |
| 29 | Jaime Cerón Silva | Nacional | `inv-jaime-ceron-silva` | `.../jaime-ceron-silva.jpg` | Retrato de Jaime Cerón Silva | 2 | No |
| 30 | Natalia Castellanos | Nacional | `inv-natalia-castellanos` | `.../natalia-castellanos.jpg` | Retrato de Natalia Castellanos | 2 | No |
| 31 | Carlos Dueñas | Nacional | `inv-carlos-duenas` | `.../carlos-duenas.jpg` | Retrato de Carlos Dueñas | 2 | No |
| 32 | Jeffrey Amador | Nacional | `inv-jeffrey-amador` | `.../pendiente-foto.svg` | **Fotografía pendiente de Jeffrey Amador** (conservar; NO cambiar a "Retrato de") | 2 | No |
| 33 | Nubia Flórez | Nacional | `inv-nubia-florez` | `.../pendiente-foto.svg` | **Fotografía pendiente de Nubia Leonor Flórez Forero** (conservar) | 2 | No |

Nota: el nombre visible de #33 en el `<summary>` actual es "Nubia Flórez"; el `alt` dice "Nubia Leonor Flórez Forero". Conservar AMBOS tal cual (nombre visible = "Nubia Flórez"; alt verbatim).

### Moderación (3)

| # | Nombre | Categoría | id modal | src foto | alt foto (modal) | Bio ¶ | Ponencia |
|---|--------|-----------|----------|----------|------------------|-------|----------|
| 34 | Manuel Fernando García García | Moderación | `inv-manuel-fernando-garcia-garcia` | `.../manuel-garcia-conno.jpg` | Retrato de Manuel Fernando García García | 2 | No |
| 35 | Olga Lucía Olaya Parra | Moderación | `inv-olga-lucia-olaya-parra` | `.../olga-lucia-olaya.jpg` | Retrato de Olga Lucía Olaya Parra | 2 | No |
| 36 | Ana María Arango | Moderación | `inv-ana-maria-arango` | `.../ana-maria-arango.jpg` | Retrato de Ana María Arango | 2 | No |

> Todos los `src` conservan el prefijo completo `/especiales/primer-congreso-nacional-internacional-investigacion-artistica/PublishingImages/` (abreviado con `.../` en las tablas nacionales/moderación por espacio). La miniatura de la tarjeta usa el MISMO `src`, pero con `alt=""` (decorativa). La foto del modal usa el `alt` descriptivo de la tabla.

---

## (c) Conteos

- Invitados internacionales: **6**
- Invitados nacionales: **27** (incluye el colectivo Willka Yaku; incluye las 2 fichas con foto pendiente: Jeffrey Amador y Nubia Flórez)
- Moderación: **3**
- **Gran total: 36 perfiles**
- Con ponencia: **2** (Pedro Vilela, Julieta Infantino) — ambos internacionales.
- Con foto pendiente (`pendiente-foto.svg`): **2** (Jeffrey Amador, Nubia Flórez).

---

## (d) Estructura HTML objetivo (tarjeta + modal) y uso de `!important`

### Estructura general del documento (dentro de `#contenido-cms`)

```
<div id="contenido-cms">
  <style> /* reglas :target scoped — ver abajo */ </style>
  <nav ...> ... </nav>                 <!-- reutilizar VERBATIM el actual -->
  <h1>Invitados del Congreso</h1>      <!-- reutilizar VERBATIM -->
  <p ...>Conozca a las y los invitados ...</p>  <!-- reutilizar VERBATIM -->

  <h2>Invitados internacionales</h2>
  <div ...grilla flex-wrap...>
     <!-- 6 tarjetas <a href="#inv-...">; ver tarjeta -->
  </div>

  <h2>Invitados nacionales</h2>
  <div ...grilla...> <!-- 27 tarjetas --> </div>

  <h2>Moderación</h2>
  <div ...grilla...> <!-- 3 tarjetas --> </div>

  <!-- 36 overlays modales, uno por invitado, al final del contenedor -->
  <div id="inv-lara-lookabaugh" ...overlay...> ... </div>
  ...
</div>
```

### Bloque `<style>` scoped (único; al inicio de `#contenido-cms`)

Reglas mínimas, todas prefijadas con `#contenido-cms` para no tocar el tema de SharePoint:

```html
<style>
  /* Modal sin JS vía :target — scoped a #contenido-cms, no afecta el layout de SharePoint */
  #contenido-cms .inv-modal{
    display:none; position:fixed; inset:0; z-index:1000;
    align-items:flex-start; justify-content:center;
    padding:2rem 1rem; overflow-y:auto;
    background:rgba(0,0,0,0.6);
  }
  #contenido-cms .inv-modal:target{ display:flex; }
  #contenido-cms .inv-modal__backdrop{ position:fixed; inset:0; }
  #contenido-cms .inv-modal__panel{
    position:relative; z-index:1; max-width:640px; width:100%;
    background:#ffffff; border:1px solid #d1d1d1; border-radius:8px;
    padding:1.5rem 1.5rem 1.75rem; margin:auto;
  }
</style>
```

Notas:
- `:target` es la ÚNICA capacidad que obliga al `<style>`; todo lo demás podría ir inline, pero se agrupa aquí para legibilidad y para el backdrop a pantalla completa. Mantener el bloque corto.
- No usar `<dialog>`, `<script>`, `onclick`, `<link>` ni clases GOV.CO/Bootstrap/CDN.

### Tarjeta (disparador) — grilla

Contenedor de sección (inline): `style="display:flex; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;"`.

Cada tarjeta es un `<a href="#inv-...">` que envuelve foto miniatura + nombre + (país si internacional):

```html
<a href="#inv-lara-lookabaugh"
   style="display:flex; align-items:center; gap:0.75rem; flex:0 1 320px;
          text-decoration:none; border:1px solid #d1d1d1; border-radius:6px;
          background:#ffffff; padding:0.75rem 1rem;
          font-family:'nunito sans',verdana,sans-serif;">
  <img src=".../lara-lookabaugh.jpg" alt=""
       style="flex:0 0 auto; height:3rem; width:3rem; object-fit:cover; border-radius:4px;"/>
  <span style="display:flex; flex-direction:column;">
    <span style="font-weight:700; color:#0943b5;">Lara Lookabaugh</span>
    <span style="font-size:0.85rem; color:#7e7e7e;">Internacional · Estados Unidos</span>
  </span>
</a>
```

- Miniatura: `alt=""` (decorativa; el nombre va al lado como texto).
- Para nacionales sin país: la segunda línea es "Nacional"; colectivo: "Colectivo · Nacional"; moderación: "Moderación".

### Modal (overlay) — uno por invitado

```html
<div id="inv-lara-lookabaugh" class="inv-modal" role="dialog" aria-modal="true"
     aria-labelledby="inv-lara-lookabaugh-h">
  <a href="#cerrar" class="inv-modal__backdrop" aria-label="Cerrar" tabindex="-1"></a>
  <div class="inv-modal__panel">
    <a href="#cerrar" aria-label="Cerrar"
       style="position:absolute; top:0.5rem; right:0.75rem;
              font-size:1.5rem !important; line-height:1 !important;
              color:#0943b5; text-decoration:none; font-weight:700;">&#215;</a>

    <img src=".../lara-lookabaugh.jpg" alt="Retrato de Lara Lookabaugh"
         style="max-width:180px; width:100%; height:auto; border-radius:6px; margin-bottom:0.75rem;"/>

    <h3 id="inv-lara-lookabaugh-h"
        style="color:#0943b5 !important; font-size:1.3rem !important;
               line-height:1.3 !important; margin:0 0 0.25rem !important;
               font-family:'nunito sans',verdana,sans-serif;">Lara Lookabaugh</h3>

    <p style="color:#7e7e7e; font-weight:600; margin:0 0 0.75rem;">Invitada internacional · Estados Unidos</p>

    <!-- biografía VERBATIM: cada párrafo tal cual del archivo actual -->
    <p style="color:#4c4c4c; line-height:1.6;">...¶1...</p>
    <p style="color:#4c4c4c; line-height:1.6;">...¶2...</p>
    <p style="color:#4c4c4c; line-height:1.6;">...¶3...</p>

    <!-- Bloque de ponencia SÓLO si aplica (Pedro Vilela, Julieta Infantino): -->
    <!-- <h3 style="color:#0943b5 !important; font-size:1rem !important; margin-top:1rem !important;">Ponencia: ...</h3> -->
    <!-- <p style="color:#4c4c4c; line-height:1.6;"><em>subtítulo</em></p> + párrafos -->
  </div>
</div>
```

### Reglas de `!important` inline (BUG recurrente del tema de SharePoint)

- `<h3>` del nombre del invitado (está dentro del panel blanco pero el tema pisa color/tamaño con alta especificidad): forzar con `!important` → `color`, `font-size`, `line-height`, `margin`.
- `<h3>` de "Ponencia" (Pedro Vilela, Julieta Infantino): forzar `font-size`, `margin-top` (y `color` ya que lleva color cobalto) con `!important`.
- Enlace de cerrar (×): forzar `font-size` y `line-height` con `!important` para que el tema no lo sobredimensione.
- Los `<h2>` de sección (sobre fondo blanco): al menos forzar `font-size` y `margin` con `!important` para evitar el sobredimensionado reportado por el usuario. (El `<h1>` se reutiliza del original tal cual.)
- Contraste: cobalto `#0943b5` sobre blanco ≈ 7:1; `#4c4c4c` sobre blanco ≈ 9:1; `#7e7e7e` sobre blanco ≈ 4.6:1 (cumple 4.5:1 para texto normal). Mantener estos colores.

### Accesibilidad

- Jerarquía: `h1` (página) → `h2` (categoría) → `h3` (nombre en modal y título de ponencia). Sin saltos.
- Miniatura `alt=""`; foto del modal con `alt` descriptivo real (verbatim del archivo; "Fotografía pendiente de ..." para los 2 casos pendientes).
- Tarjeta y cierre son enlaces con texto visible / `aria-label="Cerrar"`.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apuntando al `<h3>` del nombre.

---

## Pasos de implementación (orden por dependencia)

> Entorno: NO hay node; NO ejecutar npm/builds/scripts; NO git commit/push. La verificación es por inspección estructural del HTML generado.

- [ ] 1. **Esqueleto + `<style>` + pattern probado en 3 fichas.** Reconstruir el inicio de `index.html`: `<div id="contenido-cms">`, el bloque `<style>` scoped con las reglas `:target`, y reutilizar VERBATIM el `<nav>`, el `<h1>` y el `<p>` introductorio del archivo actual. Implementar el `<h2>Invitados internacionales</h2>` con su grilla y las 3 primeras tarjetas + sus 3 modales (Lara Lookabaugh, Monique Martínez Thomas, Pedro Vilela — este último incluye el bloque de ponencia). Esto fija el patrón tarjeta+modal, incluido el caso con ponencia.
      Archivos: `sites/culturas/cms/congreso-investigacion-artistica/invitados/index.html`
      Verificar: inspección estructural — existe exactamente un `<style>` dentro de `#contenido-cms`; no hay `<script>`/`<link>`/`<dialog>`/`onclick`/`cdn`/clases `*-govco`; los 3 modales tienen `id` único que coincide con el `href` de su tarjeta; `h1→h2→h3` sin saltos; biografías de las 3 fichas idénticas al archivo original (comparar texto).

- [ ] 2. **Puerto masivo del contenido (36 perfiles).** Completar las 3 tarjetas internacionales restantes + sus modales (incluida la ponencia de Julieta Infantino), luego la sección `<h2>Invitados nacionales</h2>` con sus 27 tarjetas+modales (conservando "Colectivo · Nacional" y las 2 fichas con `pendiente-foto.svg` + alt "Fotografía pendiente de ..."), y la sección `<h2>Moderación</h2>` con sus 3 tarjetas+modales. Copiar TODO el texto de biografía/ponencia VERBATIM del archivo original (sin resumir, incluyendo los `<em>` y los `&#160;` tal como estén). Mantener el orden exacto.
      Archivos: `sites/culturas/cms/congreso-investigacion-artistica/invitados/index.html`
      Verificar: inspección estructural — 36 tarjetas y 36 modales; cada `href="#inv-..."` tiene su `id` correspondiente; conteos 6/27/3; los 2 `alt` "Fotografía pendiente de ..." intactos; sólo 2 bloques de ponencia (Vilela, Infantino); diff textual de cada biografía contra el original sin cambios de contenido.

- [ ] 3. **Verificación integral y accesibilidad.** Revisar el documento completo: unicidad de todos los `id`, correspondencia 1:1 tarjeta↔modal, ausencia total de JS/CDN/clases prohibidas, `!important` aplicado donde corresponde (h3 de nombre, h3 de ponencia, cierre, h2), jerarquía de encabezados, `alt` de miniaturas vacío y `alt` de modales descriptivo, contraste de la paleta.
      Archivos: `sites/culturas/cms/congreso-investigacion-artistica/invitados/index.html`
      Verificar: inspección final + checklist de accesibilidad; confirmar que el contenido textual total coincide con el original (ninguna biografía alterada).
