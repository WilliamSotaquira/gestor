/**
 * Script: build-aspx.js
 * Convierte los archivos .html de la carpeta culturas a .aspx
 * y empaqueta cada landing en su carpeta autocontenida lista para subir a SharePoint.
 */

import { readdirSync, existsSync, copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join, basename } from 'path';

const SITES_DIR = resolve(process.cwd(), 'sites', 'culturas');
const OUTPUT_DIR = resolve(process.cwd(), 'dist', 'culturas');
const TYPES = ['cms', 'landings'];

function processDirectory(type) {
  const sourceDir = resolve(SITES_DIR, type);
  if (!existsSync(sourceDir)) return;

  const contents = readdirSync(sourceDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== '.gitkeep');

  contents.forEach(content => {
    const contentDir = resolve(sourceDir, content.name);
    const outputContentDir = resolve(OUTPUT_DIR, type, content.name);

    // Crear directorio de salida
    mkdirSync(outputContentDir, { recursive: true });

    // Copiar todos los archivos
    const files = readdirSync(contentDir, { withFileTypes: true });
    files.forEach(file => {
      if (file.isDirectory()) {
        // Copiar subdirectorios (assets, etc.)
        copyDirectoryRecursive(
          resolve(contentDir, file.name),
          resolve(outputContentDir, file.name)
        );
      } else {
        const sourcePath = resolve(contentDir, file.name);
        let targetName = file.name;

        // Convertir .html a .aspx
        if (file.name.endsWith('.html')) {
          targetName = file.name.replace('.html', '.aspx');
          const htmlContent = readFileSync(sourcePath, 'utf-8');
          writeFileSync(resolve(outputContentDir, targetName), htmlContent, 'utf-8');
          console.log(`  ✓ ${file.name} → ${targetName}`);
        } else {
          copyFileSync(sourcePath, resolve(outputContentDir, targetName));
        }
      }
    });
  });
}

function copyDirectoryRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  entries.forEach(entry => {
    const srcPath = resolve(src, entry.name);
    const destPath = resolve(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  });
}

console.log('🔄 Generando archivos .aspx para Culturas...\n');

TYPES.forEach(type => {
  console.log(`📂 Procesando ${type}/`);
  processDirectory(type);
});

console.log('\n✅ Build completado. Archivos en: dist/culturas/');
