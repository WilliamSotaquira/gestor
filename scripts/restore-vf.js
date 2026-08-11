/**
 * Script para restaurar "Informes consolidados" a su estado original.
 * Toma el contenido que está dentro del sub-acordeón "VF aprobadas 2025..."
 * en "Informes detallados" y lo devuelve a "Informes consolidados".
 * Luego elimina ese sub-acordeón de detallados.
 *
 * Uso: node scripts/restore-vf.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const filePath = resolve(process.cwd(), 'sites/movilidad/cms/informes-de-gestion-y-evaluacion/index.html');
const html = readFileSync(filePath, 'utf-8');
const lines = html.split('\n');

console.log(`📄 Archivo cargado: ${lines.length} líneas`);

// Encontrar el accordion interno que fue movido (data-accordion-id="e2fa3b3d2015cdd91315fb0941f1dd507")
let movedAccordionStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('data-accordion-id="e2fa3b3d2015cdd91315fb0941f1dd507"')) {
    movedAccordionStart = i;
    break;
  }
}

if (movedAccordionStart === -1) {
  console.error('❌ No se encontró el accordion movido');
  process.exit(1);
}

// Encontrar el final de ese accordion
let depth = 0;
let movedAccordionEnd = -1;
for (let i = movedAccordionStart; i < lines.length; i++) {
  const openMatches = lines[i].match(/<div/g);
  const closeMatches = lines[i].match(/<\/div>/g);
  if (openMatches) depth += openMatches.length;
  if (closeMatches) depth -= closeMatches.length;
  if (depth === 0) {
    movedAccordionEnd = i;
    break;
  }
}

console.log(`✅ Accordion movido encontrado: líneas ${movedAccordionStart + 1} a ${movedAccordionEnd + 1}`);

// Extraer el contenido (quitando la indentación extra de 6 espacios que se añadió)
const movedContent = lines.slice(movedAccordionStart, movedAccordionEnd + 1)
  .map(l => l.startsWith('      ') ? l.slice(6) : l);

// Encontrar el placeholder en "Informes consolidados"
let placeholderLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Los informes consolidados semestrales y anuales')) {
    placeholderLine = i;
    break;
  }
}

console.log(`✅ Placeholder encontrado en línea ${placeholderLine + 1}`);

// Encontrar el accordion-item wrapper de "VF aprobadas 2025..." para eliminarlo completo
// Subir desde movedAccordionStart para encontrar el accordion-item padre
let vfItemStart = -1;
for (let i = movedAccordionStart; i >= 0; i--) {
  if (lines[i].includes('VF aprobadas 2025')) {
    // Go back a few more to find the accordion-item div
    for (let j = i; j >= 0; j--) {
      if (lines[j].includes('class="accordion-item"')) {
        vfItemStart = j;
        break;
      }
    }
    break;
  }
}

// Encontrar el cierre de ese accordion-item
let vfItemEnd = -1;
depth = 0;
for (let i = vfItemStart; i < lines.length; i++) {
  const openMatches = lines[i].match(/<div/g);
  const closeMatches = lines[i].match(/<\/div>/g);
  if (openMatches) depth += openMatches.length;
  if (closeMatches) depth -= closeMatches.length;
  if (depth === 0) {
    vfItemEnd = i;
    break;
  }
}

console.log(`✅ Item "VF aprobadas..." a eliminar: líneas ${vfItemStart + 1} a ${vfItemEnd + 1}`);

// Reconstruir el archivo:
// 1. Reemplazar placeholder por el contenido original
// 2. Eliminar el accordion-item "VF aprobadas 2025..."

const newLines = [];

for (let i = 0; i < lines.length; i++) {
  if (i === placeholderLine) {
    // Insertar el contenido original con indentación correcta (nivel de consolidados body)
    const indent = '                      '; // 22 spaces to match original
    movedContent.forEach(l => {
      newLines.push(indent + l.trim() ? indent + l.trimStart() : l);
    });
    continue;
  }
  if (i >= vfItemStart && i <= vfItemEnd) {
    // Saltar el item "VF aprobadas..."
    continue;
  }
  newLines.push(lines[i]);
}

writeFileSync(filePath, newLines.join('\n'), 'utf-8');
console.log(`\n✅ Archivo restaurado: ${newLines.length} líneas`);
