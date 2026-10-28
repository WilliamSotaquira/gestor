# Actualización de enlaces — Trámites y Servicios (Movilidad)

**Archivo intervenido:** `sites/movilidad/cms/tramites-y-servicios.html`
**Fecha:** 28 de octubre de 2026
**Rama:** `fix/links-tramites-movilidad`
**Origen de la solicitud:** correo de Camilo Garzón (DIAT) reenviando a Fabián Iguavita (Dirección de Atención al Ciudadano); listado verificado por Gino Buitrago. Motivo: la actualización del portal bogota.gov.co rompió los enlaces de los trámites enlazados desde el micrositio.

## Resumen
- La página tiene **27 tarjetas** de trámites/servicios (12 Trámites, 7 Servicios, 8 PQRSD).
- Se actualizaron **24 enlaces** al portal bogota.gov.co.
- **2 enlaces se conservaron sin cambio** por requerir consulta.
- **1 enlace quedó sin cambio** porque el trámite no está en el listado (consulta).

## Cambio principal aplicado
Todos los enlaces usaban la ruta antigua `bogota.gov.co/servicios/guia-de-tramites-y-servicios/<slug>`. El portal eliminó el segmento `guia-de-tramites-y-servicios/`, por lo que ahora apuntan a `bogota.gov.co/servicios/<slug>`.

## Cambios que fueron más allá del segmento (slug o dominio distinto)
| Trámite | Antes | Después |
|---|---|---|
| Emisión concepto a técnicas de señalización | `.../emision-de-concepto-propuestas-tecnicas-de-disenos-de-senalizacion` | `.../Atencion-a-solicitudes-en-materia-de-senalizacion-sdm` |
| Entrega de copias de informes policiales (IPAT) | `.../Entrega-de-las-copias-...` (con mayúsculas) | `.../entrega-de-las-copias-...` (minúsculas) |
| Solicitud de desembargo por multas | `...apropiaci%C3%B3n...` (encode roto) | `...apropiacion...` (slug corregido) |
| Certificación de Procesos de Investigaciones Administrativas | `www.movilidadbogota.gov.co/certificacion_de_procesos_...` | `bogota.gov.co/servicios/certificacion-de-procesos-de-investigaciones-administrativas` |

## Hallazgos y consultas a elevar al responsable de la información
Los siguientes casos NO se modificaron y requieren confirmación antes de publicar:

1. **Centro de conciliación para víctimas de siniestros viales** (línea 450): no aparece en ningún grupo del listado. Su enlace sigue apuntando a `www.movilidadbogota.gov.co`. ¿Tiene URL en el portal bogota.gov.co?

2. **Devolución y/o compensación de pagos en exceso y pagos de lo no debido** (línea 512): el listado lo unifica con la URL de "Devolución por conceptos no tributarios" (ambos al mismo destino). Se conservó el enlace actual para no perder la distinción entre las dos tarjetas. ¿Es correcto que ambas apunten al mismo destino, o cada una tiene URL propia?

3. **Revisión y aprobación de estudios de tránsito** (línea 999): el listado la marca como "NO ESTÁ CARGADA EN PORTAL BOGOTÁ". Se conservó el enlace actual. ¿Se mantiene, se retira el enlace o se apunta a otra parte?

4. **Sanciones por conducir en estado de embriaguez** (grupo Información del listado, no es una tarjeta actual de la página): el listado la enlaza a `seguros-de-accidentes-personales`, que no coincide temáticamente con el nombre del trámite. Verificar si el enlace es correcto.

5. **Solicitud de excepción** (grupo PQRSD del listado, slug `solicitud-de-excepcion-sdm`): confirmar que es un trámite distinto de "Inscripción o autorización para la circulación vial (excepciones pico y placa)" y que no hay duplicación.

### Otros trámites del listado marcados como no disponibles (informativo, no están como tarjeta en la página)
- Certificado de Accidentalidad (CAIP): NO EXISTE.
- Consulta de comparendos (CAIP): NO EXISTE.
- Renovación de la licencia de conducción (Trámites): NO EXISTE.
- Punto de contacto y gestión local en temas de movilidad (Servicios/PQRSD): NO ESTÁ CARGADA.

## Validación realizada
- `npm run build:cms`: generó `dist/cms/movilidad/cms/tramites-y-servicios.html` sin errores (27 archivos CMS en total).
- Integridad del HTML: se mantienen 27 tarjetas, 27 enlaces principales y 193 href totales (sin cambios estructurales). No se generaron rutas con doble slash.

## Nota de publicación
El contenido a copiar en el gestor de Drupal es el HTML dentro de `#contenido-cms` del archivo generado en `dist/cms/`.
