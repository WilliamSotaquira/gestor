import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, existsSync, readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Descubre automáticamente todos los archivos HTML
 * en las carpetas de contenido para generar entradas multi-página.
 */
function discoverPages() {
  const pages = {};
  const sitesDir = resolve(__dirname, 'sites');
  const sites = ['movilidad', 'culturas', 'fotodeteccion'];
  const types = ['cms', 'landings'];

  sites.forEach(site => {
    types.forEach(type => {
      const dir = resolve(sitesDir, site, type);
      if (!existsSync(dir)) return;

      readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        if (entry.isDirectory()) {
          const indexPath = resolve(dir, entry.name, 'index.html');
          if (existsSync(indexPath)) {
            const key = `${site}-${type}-${entry.name}`;
            pages[key] = indexPath;
          }
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
          const key = `${site}-${type}-${entry.name.replace('.html', '')}`;
          pages[key] = resolve(dir, entry.name);
        }
      });
    });
  });

  return pages;
}

// Ruta pública que ahora actúa como vista principal del proyecto.
const HOME_ROUTE = '/sites/culturas/landings/observatorio/observatorio.html';

/**
 * Redirige la raíz "/" hacia el Observatorio, que pasa a ser la vista
 * principal. El panel de administración (index.html raíz) queda desvinculado
 * pero se conserva y sigue accesible en su propia ruta si se solicita directo.
 */
function homeRedirectPlugin() {
  return {
    name: 'home-redirect-observatorio',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          res.writeHead(302, { Location: HOME_ROUTE });
          res.end();
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  root: '.',
  plugins: [homeRedirectPlugin()],
  build: {
    rollupOptions: {
      input: {
        // El panel de administración (index.html raíz) queda desvinculado del
        // build. El archivo se conserva; solo deja de ser una entrada.
        preview: resolve(__dirname, 'shared/preview/index.html'),
        ...discoverPages()
      }
    },
    outDir: 'dist'
  },
  server: {
    port: 8090,
    host: true,
    open: false,
    allowedHosts: ['workspace.sapp']
  }
});
