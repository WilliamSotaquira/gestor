/**
 * Build script para páginas de Artes para la Paz
 * 
 * Uso:
 *   node scripts/build-artes-page.cjs <nombre-pagina>
 *   node scripts/build-artes-page.cjs --all
 * 
 * Ejemplo:
 *   node scripts/build-artes-page.cjs sonidos
 *   → Lee sites/culturas/landings/artes/sonidos/content.html + page.json
 *   → Genera sites/culturas/landings/artes/sonidos/index.html
 */

const fs = require('fs');
const path = require('path');

const ARTES_DIR = 'sites/culturas/landings/artes';
const PARTIALS_DIR = path.join(ARTES_DIR, 'partials');

function readPartial(name) {
    return fs.readFileSync(path.join(PARTIALS_DIR, name), 'utf8');
}

function buildNavItems(items) {
    return items.map(item => {
        if (item.dropdown) {
            const dropdownItems = item.dropdown.map(d => 
                `<a class="dropdown-item" href="${d.href}" style="color:var(--bs-black);">${d.label}</a>`
            ).join('');
            return `<li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">${item.label}</a><div class="dropdown-menu">${dropdownItems}</div></li>`;
        }
        const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const active = item.active ? ' active' : '';
        return `<li class="nav-item"><a class="nav-link${active}" href="${item.href}"${target}>${item.label}</a></li>`;
    }).join('\n                    ');
}

function buildPage(pageName) {
    const pageDir = path.join(ARTES_DIR, pageName);
    const contentFile = path.join(pageDir, 'content.html');
    const configFile = path.join(pageDir, 'page.json');

    if (!fs.existsSync(contentFile)) {
        console.error(`ERROR: ${contentFile} not found.`);
        return false;
    }

    // Read config (optional, defaults provided)
    let config = {
        titulo: pageName.charAt(0).toUpperCase() + pageName.slice(1),
        descripcion: 'Artes para la Paz - Ministerio de las Culturas',
        navItems: [
            { label: 'Inicio', href: '../index.aspx', active: true },
            { label: 'Volver', href: '../index.aspx' }
        ],
        estilosExtra: '',
        scriptsExtra: ''
    };

    if (fs.existsSync(configFile)) {
        config = { ...config, ...JSON.parse(fs.readFileSync(configFile, 'utf8')) };
    }

    // Read partials
    const head = readPartial('head.html');
    const stylesBase = readPartial('styles-base.html');
    const header = readPartial('header.html');
    const footer = readPartial('footer.html');
    const content = fs.readFileSync(contentFile, 'utf8');

    // Assemble
    let html = head
        .replace(/\{\{TITULO\}\}/g, config.titulo)
        .replace(/\{\{DESCRIPCION\}\}/g, config.descripcion)
        .replace('{{ESTILOS_EXTRA}}', stylesBase + '\n' + (config.estilosExtra || ''));

    html += '\n<body>\n';
    html += header.replace('{{NAV_ITEMS}}', buildNavItems(config.navItems));
    html += '\n\n    <main id="contenido-principal">\n';
    html += content;
    html += '\n    </main>\n\n';
    html += footer.replace('{{SCRIPTS_EXTRA}}', config.scriptsExtra || '');

    // Write output (as .html, build-aspx.js converts to .aspx)
    const outputFile = path.join(pageDir, 'index.html');
    fs.writeFileSync(outputFile, html);
    console.log(`  ✓ ${pageName}/index.html generado (se convierte a .aspx con npm run build:aspx)`);
    return true;
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Uso: node scripts/build-artes-page.cjs <nombre-pagina>');
    console.log('     node scripts/build-artes-page.cjs --all');
    process.exit(0);
}

if (args[0] === '--all') {
    // Build all pages that have content.html
    const entries = fs.readdirSync(ARTES_DIR, { withFileTypes: true });
    let count = 0;
    console.log('🔄 Generando páginas de Artes para la Paz...');
    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== 'partials' && entry.name !== 'assets') {
            const contentPath = path.join(ARTES_DIR, entry.name, 'content.html');
            if (fs.existsSync(contentPath)) {
                if (buildPage(entry.name)) count++;
            }
        }
    }
    console.log(`✅ ${count} páginas generadas.`);
} else {
    console.log('🔄 Generando página...');
    buildPage(args[0]);
    console.log('✅ Listo.');
}
