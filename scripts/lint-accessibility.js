/**
 * Script: lint-accessibility.js
 * Ejecuta validaciones de accesibilidad usando axe-core
 * sobre los contenidos HTML del proyecto.
 *
 * Uso: node scripts/lint-accessibility.js [ruta-opcional]
 * Ejemplo: node scripts/lint-accessibility.js sites/movilidad/cms/pagina-ejemplo
 */

import { readdirSync, existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'sites';
const targetPath = resolve(process.cwd(), TARGET);

async function findHtmlFiles(dir) {
  const files = [];

  function walk(currentDir) {
    if (!existsSync(currentDir)) return;
    const entries = readdirSync(currentDir, { withFileTypes: true });

    entries.forEach(entry => {
      const fullPath = resolve(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    });
  }

  walk(dir);
  return files;
}

async function runAxeOnFile(filePath) {
  const html = readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });

  // Inyectar axe-core
  const axeSource = readFileSync(
    resolve(process.cwd(), 'node_modules', 'axe-core', 'axe.min.js'),
    'utf-8'
  );
  dom.window.eval(axeSource);

  const results = await dom.window.axe.run(dom.window.document);
  return results;
}

async function main() {
  console.log('♿ Validación de accesibilidad (axe-core)\n');
  console.log(`📁 Analizando: ${TARGET}\n`);

  const htmlFiles = await findHtmlFiles(targetPath);

  if (htmlFiles.length === 0) {
    console.log('⚠️  No se encontraron archivos HTML para analizar.');
    return;
  }

  let totalViolations = 0;

  for (const file of htmlFiles) {
    const relativePath = file.replace(process.cwd() + '\\', '').replace(process.cwd() + '/', '');
    try {
      const results = await runAxeOnFile(file);
      const violations = results.violations;

      if (violations.length > 0) {
        console.log(`❌ ${relativePath} — ${violations.length} problema(s)`);
        violations.forEach(v => {
          console.log(`   • [${v.impact}] ${v.description}`);
          console.log(`     Ayuda: ${v.helpUrl}`);
        });
        totalViolations += violations.length;
      } else {
        console.log(`✅ ${relativePath} — Sin problemas`);
      }
    } catch (err) {
      console.log(`⚠️  ${relativePath} — Error al analizar: ${err.message}`);
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Archivos analizados: ${htmlFiles.length}`);
  console.log(`Problemas encontrados: ${totalViolations}`);

  if (totalViolations > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
