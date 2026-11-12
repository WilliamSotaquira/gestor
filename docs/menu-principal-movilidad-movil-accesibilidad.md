# Menú principal de Movilidad: comportamiento móvil, accesibilidad y megamenú

**Fecha:** 12 de noviembre de 2026
**Rama:** `fix/menu-principal-movilidad-movil`
**Portal:** https://www.movilidadbogota.gov.co (Drupal, tema `custom_barrio`)
**Archivos intervenidos:**

| Archivo | Uso |
|---|---|
| `sites/movilidad/cms/menu-principal.html` | HTML del bloque del menú (se pega en el bloque de Drupal) |
| `sites/movilidad/assets/asset-injector/menu-principal.css` | Estilos, se cargan con el módulo Asset Injector (CSS) |
| `sites/movilidad/assets/asset-injector/menu-principal.js` | Comportamiento, se carga con Asset Injector (JS, en el pie de página) |

## Resumen

El menú principal tenía fallas en celular: el botón de menú no informaba su estado, los submenús se abrían y cerraban solos, el menú se cortaba al bajar la página, las áreas táctiles medían unos 20 px y los submenús no eran operables con teclado. Además, sin desplazar la página quedaba por debajo de otros elementos del sitio (asistente «Prudencia», redes sociales, barra de accesibilidad de GOV.CO).

Se corrigió sin tocar el tema del portal: el HTML del bloque se ajustó y los estilos y el comportamiento nuevos se cargan con Asset Injector, después de los del tema. También se mejoró la jerarquía visual del megamenú de escritorio.

## Dónde estaban el CSS y el JS originales

El HTML del bloque no trae estilos ni scripts propios. Los aporta el tema `custom_barrio` en sus archivos agregados de Drupal (`/sites/default/files/css/css_*.css` y `/sites/default/files/js/js_*.js`). Esos nombres cambian cada vez que Drupal reconstruye la agregación, por eso las correcciones no se hicieron sobre ellos.

## Problemas encontrados (estado anterior)

1. **Botón de menú:** `data-bs-toggle="collapse"` apuntaba a `#navbarScroll`, un id que no existía; el menú lo abría un script del tema cambiando `style.display`. `aria-expanded` estaba fijo en `true`.
2. **Submenús en móvil:** el CSS pasa a modo móvil por debajo de 1024 px, pero el script del tema solo reaccionaba por debajo de 768 px. Entre 769 y 1023 px los submenús no abrían. Además el script agregaba un nuevo listener de clic en cada evento `resize` (que en celular se dispara al ocultarse la barra del navegador), y un mismo toque abría y cerraba el submenú.
3. **Corte del menú:** al bajar más de 144 px el tema fija la barra (`position: fixed`), pero el menú abierto no tenía altura máxima ni scroll: medía 1.046 px en una pantalla de 542 px y lo de abajo no se alcanzaba. El contenido saltaba 69 px al fijarse la barra.
4. **Área táctil:** los ítems de primer nivel medían unos 20 px de alto (solo el texto era táctil).
5. **Accesibilidad:** los ítems con submenú eran `<p><span>` sin foco ni rol; los submenús no se podían abrir con teclado; `role="menu"` sin el patrón completo; `aria-labelledby` hacia ids inexistentes; tres `aria-current="page"` fijos; textos en inglés o de plantilla (`Toggle navigation`, `Menú ejemplo entidad`).
6. **Apilamiento:** sin desplazar la página, el tema deja el menú en `z-index: 10` y quedaban encima «Prudencia» (1000), redes sociales, la barra de accesibilidad de GOV.CO y otros bloques.

## Cambios realizados

### HTML (`menu-principal.html`)
- Botón de menú sin `data-bs-toggle`, con `aria-expanded="false"`, `aria-controls="navbarScroll"` y `aria-label="Menú principal"`; el icono pasa a ser decorativo (`alt=""`).
- `<nav>` con `id="navbarScroll"` y `aria-label="Menú principal"`; se quitó `role="navigation"` (redundante).
- Los cuatro ítems con submenú pasan a `<button class="sdm-item-boton">` con `aria-expanded` y `aria-controls` hacia el id de su submenú (`sdm-sub-atencion`, `sdm-sub-participa`, `sdm-sub-entidad`, `sdm-sub-normatividad`).
- Se quitaron `role="menu"`, los `aria-labelledby` rotos y los `aria-current` fijos (el JS marca la página actual).

### JS (`menu-principal.js`)
- Anula los listeners del tema sobre el botón y los ítems (clona los nodos) y gestiona el menú con clases, sin `style.display`.
- Si el HTML guardado no trae `<button>` (HTML anterior, o si el editor de Drupal lo elimina al guardar), lo construye en el navegador.
- Botón y submenús sincronizan `aria-expanded`. Submenús en modo acordeón en móvil.
- Teclado: Enter/Espacio abren, **Escape** cierra y devuelve el foco al botón; clic fuera cierra.
- **Sin trampa de foco:** al salir con Tab o Shift+Tab, el menú móvil y el megamenú se cierran para no tapar el elemento enfocado. El foco nunca se retiene.
- Altura máxima con scroll interno en móvil y espaciador que evita el salto de contenido cuando el tema fija la barra.
- Agrupa cada lista bajo su título (`role="group"` + `aria-labelledby`).
- Iguala la altura de los títulos de grupo que comparten fila en el megamenú.
- Detecta enlaces sueltos sin lista (p. ej. «Histórico de Noticias») y los marca como enlace destacado.
- Construye el ícono del botón de menú (barras + texto «Menú»). Se crea por JS porque el editor de Drupal elimina los `<span>` vacíos al guardar.
- `aria-current="page"` en el enlace que coincide con la URL actual.

### CSS (`menu-principal.css`)
- Foco visible en todo el menú: contorno negro de 3 px con anillo blanco interior.
- Móvil: filas de 48 px, enlaces de submenú de 44 px, botón de menú de 44 × 44 px, submenú a ancho completo sin el margen de 40 px del tema, flecha que rota al abrir, sin hover «pegado» en pantallas táctiles.
- **Bloque blindado:** selectores específicos con `!important` en las propiedades de tamaño y posición, para no depender del orden de carga ni de otras hojas del sitio.
- **Apilamiento:** `z-index: 2147483000 !important` en `.sdm-navbar-container`. Excepción: con un modal de Bootstrap abierto (`body.modal-open`) baja a 1040 para que el modal quede encima.
- **Títulos de grupo** (Notificaciones, Contratación…): verde oscuro `#4C531F`, 15 px, negrita, línea inferior de 2 px y barra de acento lima `#BED000`; enlaces hijos con sangría de 14 px.
- Separador único para todos los enlaces de submenú: 1 px gris `#C7CACC` (incluye «Participa»).
- Megamenú de escritorio con columnas alineadas a la izquierda y 24 px entre columnas.
- **Enlace destacado** («Histórico de Noticias»): enlace de texto semibold, subrayado, en `#4C531F` (7,1:1 sobre el gris del menú), con flecha dibujada en CSS que no leen los lectores de pantalla; sin caja ni fondo para no competir con los grupos; alineado con la fila de títulos; 44 px de área táctil.
- Los títulos de grupo no heredan el blanco subrayado que el tema aplica a todos los `span` al pasar el mouse.
- **Botón de menú (móvil):** el JS reemplaza la imagen de barras grises del tema por un ícono dibujado en CSS (tres barras que pasan a X al abrir) y el texto visible «Menú». Borde de 2 px y texto `#4C531F` sobre blanco (8,2:1); abierto, se rellena en `#4C531F` con texto blanco. El hover solo aplica con puntero real, para que no quede pegado tras tocar. La animación se desactiva con «reducir movimiento». El nombre accesible «Menú principal» contiene el texto visible (WCAG 2.5.3). Si el JS no carga, se mantiene la imagen original.
- **Barra de escritorio:** texto y flechas de todos los ítems centrados verticalmente en la fila, también los de una línea («Inicio», «Participa») junto a los de dos.

## Publicación

1. Pegar el HTML de `sites/movilidad/cms/menu-principal.html` en el bloque del menú en Drupal (bloque de marcado personalizado de la región superior). Este archivo no usa el contenedor `#contenido-cms`: se pega completo.
2. Asset Injector → CSS: crear o actualizar el recurso con el contenido completo de `menu-principal.css`.
3. Asset Injector → JS: crear o actualizar el recurso con el contenido completo de `menu-principal.js`, en el pie de página.
4. Borrar todas las cachés de Drupal (Configuración → Rendimiento).
5. Verificar en un celular en ventana privada.

Durante la implementación se detectó que una versión anterior del JS seguía publicada mientras el CSS ya era el nuevo. Si un cambio no se ve, conviene revisar primero que los dos recursos de Asset Injector tengan la versión del repositorio y que la caché se haya borrado.

## Validación realizada

Pruebas automatizadas en Chrome sin interfaz, con la portada real del portal, el HTML y los archivos de Asset Injector del repositorio. Se emuló un celular de 390 × 844 con eventos táctiles y escritorio a 1024, 1140 y 1280 px.

| Prueba | Resultado |
|---|---|
| Toque abre y cierra menú y submenús; `aria-expanded` correcto | OK |
| Menú abierto por encima de todo el sitio, con y sin desplazar (3.200 a 4.700 puntos muestreados) | OK, ningún elemento ajeno encima |
| Tab y Shift+Tab entran y salen del menú (sin trampa de foco) | OK en móvil y escritorio |
| Foco nunca tapado (ni por el menú abierto ni por la barra fija) | OK |
| Indicador de foco visible en cada control | OK (contorno de 3 px) |
| Escape cierra el submenú y devuelve el foco al botón | OK |
| Botón de menú oculto en escritorio no recibe foco | OK |
| Área táctil: filas 48 px, enlaces 44 px, botón 44 × 44 px | OK |
| Títulos de grupo alineados por fila (clic y hover, 1024/1140/1280 px) | OK |
| Separadores iguales en los cuatro submenús | OK |
| Barra de escritorio: texto y flechas centrados (1024/1140/1280 px) | OK, desvío 0 px |
| Botón de menú: 103 × 44 px, X al abrir, sin hover pegado tras tocar, nombre accesible contiene «Menú» | OK |
| «Histórico de Noticias»: enlace de texto alineado con los títulos vecinos | OK, desvío 0,9 px |
| Contraste de texto (incluido con hover): mínimo 7,1:1 | OK |
| axe-core, reglas WCAG 2.0, 2.1 y 2.2 A/AA, menú cerrado y abierto | 0 violaciones |

### Límites de la validación
- No se probó con lectores de pantalla reales (NVDA, VoiceOver, TalkBack) ni en celulares físicos. Una validación completa de WCAG requiere pruebas manuales con tecnologías de apoyo y revisión experta.
- El ancho mínimo probado con eventos táctiles fue 390 px.
- No se probó con un modal real abierto (la excepción de apilamiento se definió por CSS).
- El contraste se calculó con la fórmula de luminancia de WCAG sobre los colores calculados por el navegador.

## Pendientes y observaciones
- El asistente «Prudencia» y la barra de redes sociales son de otros bloques; quedan por debajo del menú abierto, como se pidió, pero no se modificaron.
- Las correcciones de fondo (umbral de 768 px, listeners en `resize`) están en el tema `custom_barrio`. Si el tema se actualiza, conviene llevarlas allí y retirar el recurso de Asset Injector.

## Cómo revertir
Desactivar los dos recursos de Asset Injector y volver a pegar en el bloque el HTML anterior (versión del commit previo de `sites/movilidad/cms/menu-principal.html`). Borrar cachés de Drupal.
