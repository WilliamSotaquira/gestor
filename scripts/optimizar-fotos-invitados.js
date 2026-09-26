/**
 * Optimiza las fotos de invitados del micrositio del Congreso de Investigación Artística.
 * - Recorta a proporción 3:2 (portada tipo tarjeta gov.co, 364x260) centrada.
 * - Redimensiona a un ancho uniforme.
 * - Convierte todo a JPG con compresión.
 * - Respalda los originales en img/_originales/ antes de sobrescribir.
 *
 * Uso: node scripts/optimizar-fotos-invitados.js
 */

import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, copyFileSync, statSync, rmSync } from 'fs';
import { resolve, join, parse } from 'path';

const IMG_DIR = resolve(
  process.cwd(),
  'sites/culturas/cms/congreso-investigacion-artistica/invitados/img'
);
const BACKUP_DIR = join(IMG_DIR, '_originales');

const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 533; // ~3:2
const QUALITY = 80;

function kb(bytes) {
  return (bytes / 1024).toFixed(0);
}

async function main() {
  if (!existsSync(IMG_DIR)) {
    console.error('No existe el directorio de imágenes:', IMG_DIR);
    process.exit(1);
  }
  if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR, { recursive: true });

  const files = readdirSync(IMG_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const src = join(IMG_DIR, file);
    const { name } = parse(file);
    const dest = join(IMG_DIR, `${name}.jpg`);
    const backup = join(BACKUP_DIR, file);

    // Respaldar original (una sola vez)
    if (!existsSync(backup)) copyFileSync(src, backup);

    const before = statSync(src).size;
    totalBefore += before;

    // Procesar desde el respaldo para no leer/escribir el mismo archivo a la vez
    const buffer = await sharp(backup)
      .rotate() // respeta orientación EXIF
      .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    // Si el origen era PNG, eliminar el .png original tras generar el .jpg
    await sharp(buffer).toFile(dest);
    if (src.toLowerCase().endsWith('.png') && existsSync(src)) {
      rmSync(src);
    }

    const after = statSync(dest).size;
    totalAfter += after;

    console.log(
      `${file.padEnd(38)} ${kb(before).padStart(6)} KB  ->  ${kb(after).padStart(5)} KB` +
        (file.toLowerCase().endsWith('.png') ? '  (png convertido a jpg)' : '')
    );
  }

  console.log('─'.repeat(64));
  console.log(
    `Total: ${kb(totalBefore)} KB  ->  ${kb(totalAfter)} KB ` +
      `(reducción ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );
  console.log(`Originales respaldados en: ${BACKUP_DIR}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
