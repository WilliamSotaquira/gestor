<?php
/**
 * CMS Wrapper - Inyecta los CDN que Drupal provee en producción.
 * 
 * Los archivos en sites/X/cms/*.html son fragmentos HTML copiados
 * del gestor de contenidos. Este wrapper agrega Bootstrap 5 y GOV.CO
 * para que se visualicen correctamente en desarrollo local.
 */

$file = $_GET['file'] ?? '';

// Validar que sea un archivo CMS válido
if (!preg_match('#^sites/(movilidad|culturas)/cms/[^/]+\.html$#', $file)) {
    http_response_code(404);
    echo 'Archivo no encontrado.';
    exit;
}

$site = explode('/', $file)[1]; // movilidad o culturas
$filePath = __DIR__ . '/' . $file;

if (!file_exists($filePath)) {
    http_response_code(404);
    echo 'Archivo no encontrado.';
    exit;
}

$content = file_get_contents($filePath);

// Base URL para resolver imágenes con rutas /sites/default/files/...
$baseUrls = [
    'movilidad' => 'https://www.movilidadbogota.gov.co',
    'culturas'  => 'https://www.mincultura.gov.co',
];
$baseUrl = $baseUrls[$site] ?? '';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base href="<?= $baseUrl ?>/">
<title>CMS - <?= ucfirst($site) ?></title>
<link rel="stylesheet" href="https://cdn.gov.co/v3/css/gov-co-style.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
<?= $content ?>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.gov.co/v3/js/gov-co-script.min.js"></script>
</body>
</html>
