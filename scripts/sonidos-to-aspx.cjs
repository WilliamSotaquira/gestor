const fs = require('fs');

const source = 'sites/culturas/landings/artes/sonidos.html';
const template = 'sites/culturas/landings/artes/partials/paz.html';

const html = fs.readFileSync(source, 'utf8');
const lines = html.split('\n');

// Content starts at line 67 (0-indexed: 66) - first <section> after nav closes
// Content ends before line 339 (0-indexed: 338) - <footer>
const contentStartIdx = html.indexOf('    <section>\n        <div class="container"><img class="img-fluid"');
const contentEndIdx = html.indexOf('    <footer class="page-footer"');

const content = html.substring(contentStartIdx, contentEndIdx).trim();

// Read template
let aspx = fs.readFileSync(template, 'utf8');

// Fill title
aspx = aspx.replace('Demo - Artes para la Paz', 'Sonidos - Artes para la Paz');

// No custom styles - leave empty or add link refs
aspx = aspx.replace(
    `<style type="text/css">

    </style>`,
    `<!-- CSS externo del tema -->
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:400,600,800">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito+Sans&amp;display=swap">
    <link rel="stylesheet" href="assets/fonts/ionicons.min.css">
    <link rel="stylesheet" href="assets/css/bss-overrides.css">
    <link rel="stylesheet" href="assets/css/aos.min.css">
    <link rel="stylesheet" href="assets/css/Article-Cards.css">
    <link rel="stylesheet" href="assets/css/Simple-Slider-swiper-bundle.min.css">
    <link rel="stylesheet" href="assets/css/untitled.css">`
);

// Fill content in PlaceHolderMain
aspx = aspx.replace(
    `<main>


    </main>`,
    `<main id="contenido-principal">
${content}
    </main>`
);

fs.writeFileSync(source, aspx);
console.log('Done! sonidos.html converted to SharePoint template format.');
console.log('Content:', content.split('\n').length, 'lines');
