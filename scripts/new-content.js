/**
 * Script: new-content.js
 * Genera la estructura de un nuevo contenido a partir de las plantillas base.
 *
 * Uso: node scripts/new-content.js <sitio> <tipo> <nombre>
 *
 * Ejemplos:
 *   node scripts/new-content.js movilidad cms semana-movilidad
 *   node scripts/new-content.js movilidad landings campana-bici
 *   node scripts/new-content.js culturas cms convocatoria-2026
 *   node scripts/new-content.js culturas landings festival-musica
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const [,, site, type, name] = process.argv;

const VALID_SITES = ['movilidad', 'culturas', 'fotodeteccion'];
const VALID_TYPES = ['cms', 'landings'];

// Validaciones
if (!site || !type || !name) {
  console.error('❌ Uso: node scripts/new-content.js <sitio> <tipo> <nombre>');
  console.error('   Sitios: movilidad, culturas');
  console.error('   Tipos:  cms, landings');
  process.exit(1);
}

if (!VALID_SITES.includes(site)) {
  console.error(`❌ Sitio inválido: "${site}". Opciones: ${VALID_SITES.join(', ')}`);
  process.exit(1);
}

if (!VALID_TYPES.includes(type)) {
  console.error(`❌ Tipo inválido: "${type}". Opciones: ${VALID_TYPES.join(', ')}`);
  process.exit(1);
}

const contentDir = resolve(process.cwd(), 'sites', site, type, name);

if (existsSync(contentDir)) {
  console.error(`❌ Ya existe el contenido: sites/${site}/${type}/${name}`);
  process.exit(1);
}

// Crear estructura
mkdirSync(contentDir, { recursive: true });

// Leer plantilla base
const templateName = `${site}-${type === 'landings' ? 'landing' : 'cms'}.html`;
const templatePath = resolve(process.cwd(), 'shared', 'layouts', templateName);
let template = '';

if (existsSync(templatePath)) {
  template = readFileSync(templatePath, 'utf-8');
  // Reemplazar placeholders
  template = template.replace(/\{\{TITULO\}\}/g, formatTitle(name));
} else {
  template = `<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>${formatTitle(name)}</title>\n</head>\n<body>\n  <h1>${formatTitle(name)}</h1>\n</body>\n</html>`;
}

// Escribir index.html
writeFileSync(resolve(contentDir, 'index.html'), template, 'utf-8');

// Para landings, crear archivos adicionales
if (type === 'landings') {
  mkdirSync(resolve(contentDir, 'assets'), { recursive: true });
  writeFileSync(resolve(contentDir, 'styles.css'), `/* Estilos para ${formatTitle(name)} */\n`, 'utf-8');
  writeFileSync(resolve(contentDir, 'scripts.js'), `// Scripts para ${formatTitle(name)}\n`, 'utf-8');
  writeFileSync(resolve(contentDir, 'assets', '.gitkeep'), '', 'utf-8');
}

console.log(`\n✅ Contenido creado: sites/${site}/${type}/${name}/`);
console.log(`   📄 index.html`);
if (type === 'landings') {
  console.log(`   🎨 styles.css`);
  console.log(`   ⚡ scripts.js`);
  console.log(`   📁 assets/`);
}
console.log(`\n💡 Previsualiza con: npm run dev → http://localhost:3000/sites/${site}/${type}/${name}/`);

function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
