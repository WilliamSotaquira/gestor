/**
 * Build: Consolida las páginas de fotodetección.
 * Incrusta styles.css y scripts.js directamente en cada HTML.
 * Output: dist/sites/fotodeteccion/landings/fotodeteccion-landing/
 */
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '../sites/fotodeteccion/landings/fotodeteccion-landing');
const DIST = path.resolve(__dirname, '../dist/sites/fotodeteccion/landings/fotodeteccion-landing');

// Leer CSS y JS
const css = fs.readFileSync(path.join(SRC, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(SRC, 'scripts.js'), 'utf8');

// Obtener todos los HTML
const htmlFiles = fs.readdirSync(SRC).filter(f => f.endsWith('.html'));

// Crear directorio dist si no existe
fs.mkdirSync(DIST, { recursive: true });

htmlFiles.forEach(file => {
  let html = fs.readFileSync(path.join(SRC, file), 'utf8');

  // Reemplazar link a styles.css por <style> inline
  html = html.replace(
    /\s*<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>/i,
    `\n  <style>\n${css}\n  </style>`
  );

  // Reemplazar script src a scripts.js por <script> inline
  html = html.replace(
    /\s*<script\s+(?:type="module"\s+)?src="\.\/scripts\.js"\s*><\/script>/i,
    `\n  <script>\n${js}\n  </script>`
  );

  // Escribir archivo consolidado
  fs.writeFileSync(path.join(DIST, file), html, 'utf8');
  console.log('OK ' + file);
});

console.log('\nBuild completo: ' + htmlFiles.length + ' archivos en ' + DIST);
