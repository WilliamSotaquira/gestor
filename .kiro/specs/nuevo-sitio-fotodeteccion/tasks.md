# Implementation Plan: Nuevo Sitio Fotodetección

## Overview

Implementar el sitio multi-página "Cámaras de Fotodetección Bogotá" dentro del gestor multi-sitio existente. Se sigue el patrón de convención sobre configuración: agregar `'fotodeteccion'` a los arrays de sitios y crear la estructura de carpetas con 7 páginas HTML, estilos y scripts compartidos.

## Tasks

- [x] 1. Configuración del proyecto y estructura base
  - [x] 1.1 Crear estructura de carpetas del sitio fotodeteccion
    - Crear `sites/fotodeteccion/cms/` con `.gitkeep`
    - Crear `sites/fotodeteccion/landings/` con `.gitkeep`
    - Crear `sites/fotodeteccion/landings/fotodeteccion-landing/` con subcarpeta `assets/` y `.gitkeep`
    - Crear archivos vacíos iniciales: `styles.css` y `scripts.js` en `sites/fotodeteccion/landings/fotodeteccion-landing/`
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 1.2 Crear layouts compartidos para fotodeteccion
    - Crear `shared/layouts/fotodeteccion-cms.html` basado en `movilidad-cms.html` con sufijo ` - Fotodetección`, CDN GOV.CO, Bootstrap 5, `div#contenido-cms` con marcadores, placeholder `{{TITULO}}`
    - Crear `shared/layouts/fotodeteccion-landing.html` basado en `movilidad-landing.html` con marca "CÁMARAS DE FOTODETECCIÓN BOGOTÁ", 6 enlaces de navegación del sitio, `<nav>`, `<main>`, `<footer>`, Bootstrap 5, `./styles.css` y `./scripts.js`
    - _Requirements: 16.1, 16.2, 16.3_

  - [x] 1.3 Modificar configuración de Vite, build CMS y new-content
    - Agregar `'fotodeteccion'` al array `sites` en `vite.config.js` dentro de `discoverPages()`
    - Agregar `'fotodeteccion'` al array `sites` en `scripts/build-cms.js` dentro de `buildCms()`
    - Agregar `'fotodeteccion'` al array `VALID_SITES` en `scripts/new-content.js`
    - _Requirements: 12.1, 13.1, 14.1, 14.2, 14.3_

  - [x] 1.4 Registrar fotodeteccion en routes.json
    - Agregar entrada `"fotodeteccion"` al objeto `sites` con `baseUrl`, `localPrefix: "sites/fotodeteccion"` y array `contents` con las 7 páginas del landing
    - Verificar que el archivo resultante sea JSON válido
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [x] 2. Checkpoint - Verificar infraestructura base
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que `npm run build:cms` ejecuta sin errores
  - Verificar que `sites/routes.json` es JSON válido

- [x] 3. Implementar estilos compartidos y sistema de diseño
  - [x] 3.1 Crear el archivo styles.css con el sistema de diseño completo
    - Definir variables CSS con paleta institucional: azul oscuro (#1a3a5c) primario, blanco fondo, verde acento
    - Estilos para navbar personalizada, breadcrumbs, footer de navegación secuencial
    - Estilos para componentes reutilizables: tarjetas distribuidoras, estadísticas destacadas (número grande + descripción), timeline con pasos numerados, accordions FAQ, tabs de infracciones
    - Estilos responsive (móvil < 768px, tablet 768-1024px, escritorio > 1024px) complementando Bootstrap 5
    - CTA "Consultar comparendo" persistente y visible
    - Garantizar contraste mínimo 4.5:1
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 11.1, 11.7_

- [x] 4. Implementar la Página Home (index.html)
  - [x] 4.1 Crear index.html con estructura completa
    - Incluir Navbar_Principal con logo placeholder, título "CÁMARAS DE FOTODETECCIÓN BOGOTÁ" y 6 enlaces de navegación, responsive con menú hamburguesa en < 992px
    - Sección hero con imagen de fondo placeholder, `<h1>` titular y subtítulo descriptivo
    - Sección de mensaje institucional con 3 estadísticas destacadas (números grandes con descripción)
    - Bloque distribuidor con 4 tarjetas enlazadas: Entender el sistema, Cómo funciona, Ubicación e infracciones, ¿Recibiste un comparendo?
    - Sección resumen del proceso (pasos condensados)
    - Sección con 3 preguntas frecuentes destacadas enlazadas a preguntas-frecuentes.html
    - CTA_Comparendo visible y prominente
    - Footer con información institucional
    - Usar elementos semánticos HTML5 (`<nav>`, `<main>`, `<section>`, `<footer>`), jerarquía de encabezados correcta, `alt` en imágenes
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 9.1, 9.2, 9.3, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 4.2 Crear assets placeholder para el sitio
    - Crear imagen placeholder para hero de cámara en `assets/`
    - Crear imagen placeholder para logo de la Alcaldía en `assets/`
    - Crear imagen placeholder para mapa estático en `assets/`
    - Todos con dimensiones correctas y texto indicativo
    - _Requirements: 1.3, 17.1, 17.2_

- [x] 5. Implementar la Página Entender el Sistema
  - [x] 5.1 Crear entender-el-sistema.html
    - Incluir Navbar_Principal con enlace activo resaltado en "Entender el sistema"
    - Breadcrumbs: "Inicio > Entender el sistema"
    - Sección explicativa sobre qué son las cámaras y su propósito
    - Sección de tipos de sistemas de fotodetección con tarjetas (imagen + icono): velocidad, semáforo en rojo, detección electrónica
    - Sección de estadísticas de impacto (porcentajes grandes con descripción)
    - Footer_Navegacion: "Volver al inicio" + "Siguiente" (sin "Anterior" por ser la primera subpágina)
    - CTA_Comparendo persistente
    - Elementos semánticos, jerarquía de encabezados, atributos `alt` y `aria-label`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 11.3, 11.4, 11.5, 11.6_

- [x] 6. Implementar la Página Cómo Funciona
  - [x] 6.1 Crear como-funciona.html
    - Incluir Navbar_Principal con enlace activo en "Cómo funciona"
    - Breadcrumbs: "Inicio > Cómo funciona"
    - Timeline_Proceso con 6 pasos secuenciales: Captura, Carga al sistema, Consulta RUNT, Validación, Firma del comparendo, Notificación al ciudadano
    - Cada paso con número, icono representativo, título corto y descripción breve
    - Presentación visualmente secuencial (vertical) con conectores visuales entre pasos
    - Footer_Navegacion: "Anterior" (entender-el-sistema.html) + "Volver al inicio" + "Siguiente" (ubicacion-e-infracciones.html)
    - CTA_Comparendo persistente
    - Elementos semánticos, jerarquía de encabezados, accesibilidad
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 9.1, 9.2, 9.3, 9.4, 9.5, 11.3, 11.4, 11.5, 11.6_

- [x] 7. Implementar la Página Ubicación e Infracciones
  - [x] 7.1 Crear ubicacion-e-infracciones.html
    - Incluir Navbar_Principal con enlace activo en "Ubicación e infracciones"
    - Breadcrumbs: "Inicio > Ubicación e infracciones"
    - Sección de criterios de instalación (zonas de alta siniestralidad, corredores principales, zonas escolares)
    - Sección de mapa estático: imagen placeholder con `alt="Mapa de ubicación de cámaras de fotodetección en Bogotá"` y texto explicativo
    - Sección de infracciones con componente tabs/pestañas de 3 categorías: Automáticas (velocidad, semáforo en rojo), Semiautomáticas (giro prohibido, invasión de carril), Carril preferencial (invasión de carril bus, TransMilenio)
    - El cambio de pestaña muestra la lista sin recargar la página (Bootstrap tabs + contenido)
    - Footer_Navegacion: "Anterior" (como-funciona.html) + "Volver al inicio" + "Siguiente" (comparendos.html)
    - CTA_Comparendo persistente
    - Elementos semánticos, accesibilidad, `aria-label` en tabs
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 9.1, 9.2, 9.3, 9.4, 9.5, 11.3, 11.4, 11.5, 11.6, 17.3_

- [x] 8. Implementar la Página Comparendos
  - [x] 8.1 Crear comparendos.html
    - Incluir Navbar_Principal con enlace activo en "Comparendos"
    - Breadcrumbs: "Inicio > ¿Recibiste un comparendo?"
    - Sección de consulta del estado del comparendo con enlace/instrucciones
    - Sección de opciones de pago y plazos
    - Sección de curso pedagógico (requisitos y beneficios)
    - Sección de impugnación (plazos y requisitos)
    - Sección explicativa de por qué se recibe comparendo, con enlace cruzado a ubicacion-e-infracciones.html
    - Footer_Navegacion: "Anterior" (ubicacion-e-infracciones.html) + "Volver al inicio" + "Siguiente" (transparencia.html)
    - CTA_Comparendo persistente
    - Elementos semánticos, accesibilidad
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 9.1, 9.2, 9.3, 9.4, 9.5, 11.3, 11.4, 11.5, 11.6_

- [x] 9. Implementar la Página Transparencia
  - [x] 9.1 Crear transparencia.html
    - Incluir Navbar_Principal con enlace activo en "Transparencia"
    - Breadcrumbs: "Inicio > Transparencia"
    - Sección de normativa (leyes, decretos, resoluciones)
    - Sección de certificados y calibración (proceso de certificación y enlaces)
    - Sección de documentos técnicos y estudios de soporte
    - Footer_Navegacion: "Anterior" (comparendos.html) + "Volver al inicio" + "Siguiente" (preguntas-frecuentes.html)
    - CTA_Comparendo persistente
    - Elementos semánticos, accesibilidad
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3, 9.4, 9.5, 11.3, 11.4, 11.5, 11.6_

- [x] 10. Checkpoint - Verificar páginas principales
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que todas las páginas (index, entender, como-funciona, ubicacion, comparendos, transparencia) cargan sin errores en el dev server
  - Verificar navegación secuencial entre páginas
  - Verificar que los breadcrumbs son correctos en cada página

- [x] 11. Implementar la Página Preguntas Frecuentes
  - [x] 11.1 Crear preguntas-frecuentes.html
    - Incluir Navbar_Principal con enlace activo en "Preguntas frecuentes"
    - Breadcrumbs: "Inicio > Preguntas frecuentes"
    - Accordions agrupados por categoría: Velocidad, Precisión del sistema, Motos, Comparendos, Proceso legal
    - Cada accordion expandible/colapsable; al abrir una pregunta se colapsan las demás del mismo grupo
    - Incluir enlaces cruzados en respuestas hacia comparendos.html y transparencia.html
    - Footer_Navegacion: "Anterior" (transparencia.html) + "Volver al inicio" (sin "Siguiente" por ser última subpágina)
    - CTA_Comparendo persistente
    - Atributos `aria-label` en accordions, elementos semánticos, accesibilidad
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4, 9.5, 9.7, 11.3, 11.4, 11.5, 11.6_

- [x] 12. Implementar scripts.js con interactividad
  - [x] 12.1 Crear scripts.js con funcionalidad compartida
    - Lógica para resaltar enlace activo en la navbar según la página actual
    - Lógica para tabs de infracciones en ubicacion-e-infracciones.html (cambio sin recarga)
    - Lógica para accordions de FAQ (expandir/colapsar, comportamiento de grupo)
    - CTA_Comparendo: si se implementa como componente flotante, agregar lógica de visibilidad
    - _Requirements: 5.4, 8.2, 9.2_

- [x] 13. Final checkpoint - Verificación completa
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que las 7 páginas HTML cargan correctamente en el dev server de Vite
  - Verificar navegación completa (navbar, breadcrumbs, footer secuencial)
  - Verificar que tabs de infracciones funcionan sin recarga
  - Verificar que accordions de FAQ se expanden/colapsan correctamente
  - Verificar responsive: navbar colapsa en hamburguesa bajo 992px
  - Verificar que `npm run build:cms` procesa sin errores
  - Verificar que `routes.json` es JSON válido con entrada fotodeteccion

## Notes

- No se requieren property-based tests. El feature es scaffolding de configuración y HTML estático.
- Se usa Bootstrap 5 como framework base; los estilos personalizados complementan sin sobreescribir.
- Las imágenes usan placeholders con dimensiones correctas. Reemplazar por versión final solo requiere cambiar el archivo en `assets/`.
- Los componentes interactivos (tabs, accordions) usan Bootstrap 5 nativamente, con JS mínimo de soporte.
- Cada tarea referencia los requerimientos específicos para trazabilidad.
- Checkpoints aseguran validación incremental del progreso.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["4.1", "4.2"] },
    { "id": 4, "tasks": ["5.1", "6.1"] },
    { "id": 5, "tasks": ["7.1", "8.1"] },
    { "id": 6, "tasks": ["9.1", "11.1"] },
    { "id": 7, "tasks": ["12.1"] }
  ]
}
```
