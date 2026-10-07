# Verificación — Montaje de perfiles del Congreso de Investigación Artística

Iteración: primera (no existía `review.json`). Tarea implementada desde cero.

## Parte 1 — Fotos

Comandos ejecutados desde `e:\gestor`:

1. `node scripts/_extraer-fotos-perfiles.mjs` (script temporal, ya borrado)
   - **20 imágenes escritas** en `invitados/img/` (slugs nuevos + 3 de placeholder→foto).
   - **2 omitidas** por no traer base64 → quedan con placeholder: `nubia-florez`, `jeffrey-amador`.
   - Extensión detectada por firma de bytes (no por el prefijo del data URI):
     - `ramiro-osorio` → PNG real (`89 50 4E 47`).
     - El resto → JPEG (`FF D8 FF`), incluida `pilar-riano-alcala` (prefijo decía `image/png` pero los bytes son `/9j/`).
   - Nota técnica: la fila de Pilar Riaño tiene `|` incrustados en el texto pegado de Outlook, por lo que el `data:image` cae en una celda posterior a la 4.ª. El script busca el base64 en toda la línea, no en un índice fijo.

2. `node scripts/optimizar-fotos-invitados.js`
   - 34 imágenes procesadas a 800×533 mozjpeg; originales respaldados en `invitados/img/_originales/`.
   - `ramiro-osorio.png` convertido a `ramiro-osorio.jpg` (PNG origen eliminado).
   - Reducción total: 4592 KB → 1617 KB (−64,8 %). No quedan `.png` sueltos en `img/`.

3. Script temporal `scripts/_extraer-fotos-perfiles.mjs` **borrado** (`Test-Path` → False).

## Parte 2 — Fichas nuevas

- 14 fichas de invitados nacionales con foto: gabriel-velez, pedro-pablo-gomez, tania-delgado,
  carlos-sepulveda, juan-alejandro-chindoy, valentina-ruiz, edgar-puentes, eliecer-arenas,
  camila-camacho, victor-capador, paola-wilches, jaime-ceron-silva, natalia-castellanos, carlos-duenas.
- 1 ficha de colectivo: consejo-ancestral-willka-yaku (`span` "Colectivo · Nacional").
- 2 fichas internacionales: martin-inthamoussu (Uruguay), pilar-riano-alcala (Canadá; se limpiaron
  los safelinks de Outlook y el cargo pegado en inglés).
- 2 fichas con placeholder (bio real, sin foto): jeffrey-amador, nubia-florez (`img/pendiente-foto.svg`).
- 3 fichas rescatadas de placeholder a foto real con bio del `.md`: julieta-infantino, ramiro-osorio,
  ana-maria-arango (se quitó el comentario PENDIENTE y se actualizó `img src` y `alt`).

## Parte 3 — index.html

- Internacionales: + Martín Inthamoussu, + Pilar Riaño Alcalá; tarjeta de Julieta Infantino actualizada a foto.
- Nacionales: + 15 tarjetas con foto (incluye el colectivo) y + 2 pendientes (Jeffrey Amador, Nubia Flórez);
  tarjeta de Ramiro Osorio actualizada a foto.
- Moderación: tarjeta de Ana María Arango actualizada a foto.

## Verificación final

- `node scripts/lint-accessibility.js sites/culturas/cms/congreso-investigacion-artistica/invitados`
  → **37 archivos analizados, 0 problemas** (exit 0). (El aviso "HTMLCanvasElement getContext" es ruido de jsdom, no es una violación.)
- Comprobación de integridad (PowerShell): **0** `img src` faltantes en las fichas, **0** `href="perfil-*.html"`
  rotos en `index.html`, 36 fichas `perfil-*.html` en total.
- Placeholders restantes solo en Jeffrey Amador y Nubia Flórez (fichas e index), según lo esperado.
