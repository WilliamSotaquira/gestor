/**
 * Script: build-cms.js
 * Genera versiones limpias de archivos CMS (sin tags de preview local)
 * listas para copiar y pegar en el gestor de contenidos de Drupal.
 *
 * Uso: npm run build:cms
 * Salida: dist/cms/<sitio>/<archivo>.html
 */

import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, join, basename } from 'path';

const SITES_DIR = resolve(process.cwd(), 'sites');
const OUTPUT_DIR = resolve(process.cwd(), 'dist', 'cms');

// Tags que se inyectan solo para preview local y se deben remover
const PREVIEW_PATTERNS = [
  /^<meta\s+name="viewport"[^>]*>\n?/gim,
  /^<meta\s+charset="[^"]*">\n?/gim,
  /^<base\s+href="[^"]*">\n?/gim,
  /<!--\s*\[PREVIEW LOCAL[^\]]*\].*?-->\n?/gis,
  /<!--\s*\[\/PREVIEW LOCAL\].*?-->\n?/gis,
];

function cleanForProduction(html) {
  let result = html;
  for (const pattern of PREVIEW_PATTERNS) {
    result = result.replace(pattern, '');
  }
  return result.trim() + '\n';
}

function buildCms() {
  const sites = ['movilidad', 'culturas', 'fotodeteccion'];

  let count = 0;

  sites.forEach(site => {
    const cmsDir = resolve(SITES_DIR, site, 'cms');
    if (!existsSync(cmsDir)) return;

    const outDir = resolve(OUTPUT_DIR, site);
    mkdirSync(outDir, { recursive: true });

    readdirSync(cmsDir, { withFileTypes: true }).forEach(entry => {
      let filePath;

      if (entry.isDirectory()) {
        filePath = resolve(cmsDir, entry.name, 'index.html');
        if (!existsSync(filePath)) return;
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        filePath = resolve(cmsDir, entry.name);
      } else {
        return;
      }

      const html = readFileSync(filePath, 'utf-8');
      const clean = cleanForProduction(html);
      const outFile = resolve(outDir, entry.isDirectory() ? `${entry.name}.html` : entry.name);

      writeFileSync(outFile, clean, 'utf-8');
      count++;
      console.log(`  ✓ ${site}/cms/${basename(outFile)}`);
    });
  });

  console.log(`\n✅ ${count} archivo(s) CMS generados en dist/cms/`);
  console.log('   Copia el contenido de estos archivos al gestor de Drupal.\n');
}

buildCms();
