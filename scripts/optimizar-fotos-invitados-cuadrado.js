/**
 * optimizar-fotos-invitados-cuadrado.js
 *
 * Genera las fotos de invitados del micrositio del Congreso en formato
 * CUADRADO 1:1 (500x500), que es el que necesita datos.js:
 *   - miniatura de tarjeta: cuadrado 48x48 con object-fit:cover
 *   - foto del modal: 180px de ancho, altura automática
 *
 * Lee los ORIGINALES desde invitados/img/_originales/ y escribe las versiones
 * optimizadas en invitados/img/_optimizadas-500/ (no sobrescribe originales).
 * Recorta centrado en el rostro (fit:cover, position:attention) y comprime JPG.
 *
 * Uso: node scripts/optimizar-fotos-invitados-cuadrado.js
 */

import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, statSync } from 'fs';
import { resolve, join, parse } from 'path';

const IMG_DIR = resolve(
  process.cwd(),
  'sites/culturas/cms/congreso-investigacion-artistica/invitados/img'
);
const SRC_DIR = join(IMG_DIR, '_originales');
const OUT_DIR = join(IMG_DIR, '_optimizadas-500');

const SIZE = 500;      // cuadrado 1:1
const QUALITY = 80;

function kb(bytes) {
  return (bytes / 1024).toFixed(0);
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error('No existe el directorio de originales:', SRC_DIR);
    process.exit(1);
  }
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  // Solo imágenes raster; si hay .png y .jpg con el mismo nombre, prioriza .jpg.
  const files = readdirSync(SRC_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));
  const porNombre = new Map();
  for (const f of files) {
    const { name, ext } = parse(f);
    const prev = porNombre.get(name);
    // prioriza .jpg/.jpeg sobre .png si existe duplicado
    if (!prev || /\.png$/i.test(prev)) porNombre.set(name, f);
    if (!/\.png$/i.test(f)) porNombre.set(name, f);
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const [name, file] of porNombre) {
    const src = join(SRC_DIR, file);
    const dest = join(OUT_DIR, `${name}.jpg`);

    const before = statSync(src).size;
    totalBefore += before;

    const buffer = await sharp(src)
      .rotate() // respeta orientación EXIF
      .resize(SIZE, SIZE, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    await sharp(buffer).toFile(dest);

    const after = statSync(dest).size;
    totalAfter += after;
    count++;

    console.log(
      `${(name + '.jpg').padEnd(38)} ${kb(before).padStart(6)} KB  ->  ${kb(after).padStart(5)} KB`
    );
  }

  console.log('─'.repeat(64));
  console.log(
    `${count} fotos  |  Total: ${kb(totalBefore)} KB  ->  ${kb(totalAfter)} KB ` +
      `(reducción ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );
  console.log(`Optimizadas (500x500 JPG) en: ${OUT_DIR}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
