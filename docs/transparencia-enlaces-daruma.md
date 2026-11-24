# Reemplazo de enlaces a DARUMA en Transparencia (caso RF-MDS-56468)

Fuente: hoja 2 "MIPG_enlacesDARUMA" del archivo "REVISIÓN PUBLICACIÓN PAGINA WEB OAPI (1)", enviada por la OAPI el 17/11/2026.
Revisión de enlaces: 23/11/2026. Cada enlace se probó sin iniciar sesión.

## Convenciones

**Prefijo de enlaces.** Todos los enlaces empiezan por `https://daruma.movilidadbogota.gov.co/app.php/staff/document/`. En la tabla se abrevian así:
- `index=N` es `viewPublic?index=N`
- `id=N` es `tree/viewPublic?id=N`

**Acciones.**
- **Reemplazar:** cambiar el enlace por el de DARUMA y el texto por el nombre nuevo.
- **Reemplazar (nombre igual):** cambiar solo el enlace. La OAPI indicó "mantener igual" para el nombre.
- **Reemplazar (nombre propuesto):** la OAPI no dio nombre. Se aplica su regla (sin código, versión ni fecha).
- **Mantener actual:** el enlace de DARUMA no es público ("Usted no tiene los permisos requeridos"). Confirmado el 23/11/2026: los 11 documentos tienen acceso restringido. Se deja el enlace que tiene hoy la página hasta que la OAPI los publique.
- **Eliminar:** retirar el ítem de la página.
- **Pendiente:** sin enlace ni instrucción. Se consulta a la OAPI.

**Nombres.** Se corrigieron tildes en los nombres de la OAPI (Secretaría, género, Víctimas). Las mayúsculas quedan como las propuso la OAPI hasta que confirme el criterio.

## Patrón de nombres (validado el 23/11/2026)

Estructura: **tipo de documento + objeto + (sigla) + vigencia**. Ejemplo: "Plan Institucional de Capacitación (PIC) 2026".

| # | Regla | Estado |
|---|---|---|
| 1 | Mayúscula inicial en los nombres propios de personas, lugares, entidades o entes singularizados, lo que incluye el nombre de cada documento, plan, programa o campaña. Los artículos, preposiciones y conjunciones internos (de, del, la, para, y, entre otros) van en minúscula, salvo cuando el artículo forma parte inseparable del nombre o lo inicia (por ejemplo, La Habana o Al Colegio en Bici). La primera palabra siempre lleva mayúscula. Las siglas van en mayúscula | Validada (ajustada el 23/11/2026) |
| 2 | Sigla al final, entre paréntesis | Validada |
| 3 | Sin mención de la entidad (SDM, Secretaría Distrital de Movilidad) | Validada (reconfirmada el 23/11/2026) |
| 4 | Vigencia al final ("2026" o "2024-2027") | Validada |
| 5 | Sin numeración en el texto. Los anexos (cronogramas, planes de acción, formatos) se muestran como subítems de su plan, en una lista anidada | **Validada (opción b)** |
| 6 | Conector después del tipo ("de", "para", "del") | Validada |
| 7 | Sin guiones separadores | Validada |
| 8 | El mismo documento lleva el mismo nombre en todas las páginas | Validada |

Nombres propios que conservan mayúsculas: "Programa de Transparencia y Ética Pública (PTEP)" y "Centro de Orientación a Víctimas de Siniestros Viales (ORVI)". Los nombres de programas se tratan como nombres propios: Al Colegio en Bici (el artículo "Al" inicia el nombre), BiciParceros y Ciempiés.

**Alcance:** todos los documentos de las cinco páginas, por etapas, revisando cada una antes de avanzar.

| Etapa | Contenido | Estado |
|---|---|---|
| 1 | Documentos de la lista de la OAPI, página por página: Políticas, Seguridad de la información, Manuales, Protocolos y Planes | En curso (Políticas, Seguridad de la información y Manuales aprobadas; Manuales publicada el 23/11/2026; Protocolos aprobada, en edición) |
| 2 | Anexos de Planes como subítems | Pendiente |
| 3 | Bloque histórico de integridad en Protocolos | Pendiente |
| 4 | Documentos de las páginas que no están en la lista (por ejemplo PA05-M04 en Manuales) | Pendiente |

Efecto de la regla 5 en `/planes-institucionales-y-estrategicos`: anexos que pasan a subítems de su plan.

| Plan | Anexos |
|---|---|
| Programa de Transparencia y Ética Pública (PTEP) 2026 | Mapa de riesgos de corrupción 2026 |
| Plan institucional de archivos (PINAR) 2024-2027 | PINAR 2026 |
| Plan institucional de capacitación (PIC) 2026 | Plan de acción del PIC 2026 (xlsx) |
| Plan de trabajo anual de SST 2026 | Cronograma anual de trabajo SST 2026 (xlsx); Plan de capacitación SST 2026 (xlsx) |
| Plan institucional del sistema integrado de conservación (SIC) 2024-2027 | SIC 2026 |
| Plan institucional de gestión ambiental (PIGA) 2026 | Cronograma PIGA 2026 |
| Plan institucional de participación ciudadana 2026 | Cronograma de actividades de participación ciudadana 2026 (xlsx) |
| Programa de gestión documental (PGD) 2024-2027 | Cronograma PGD 2026 |

Los nombres de los anexos están en propuesta. Los anexos no están en la lista de la OAPI, así que sus enlaces no cambian.

---

## 1. Políticas internas y lineamientos SDM
Página: `/politicas-internas-y-lineamientos-sdm` (numeral 2.1.5)

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 1 | Política de gestión del riesgo de soborno | index=2166 | Política para la Gestión Integral de Riesgos | Reemplazar |
| 2 | PA04-P01 Política General del Sistema de Gestión de Seguridad de la Información SDM | index=847 | Política General de Seguridad de la Información | Reemplazar |
| 3 | PA01-M02-P01 Política ambiental V2.0 del 05-05-2022 | index=578 | Política Ambiental | Reemplazar |
| 4 | PA02-P01 Política de seguridad y salud en el trabajo V1.0 de 23-11-2021 | index=601 | Política de Seguridad y Salud en el Trabajo | Reemplazar |
| 5 | Política de genero para el talento humano V1.0 de 22-12-2021 | index=603 | Política de Género para el Talento Humano | Reemplazar |
| 6 | PA01-P02 - Política de Uso y Consumo Responsable del Papel | id=2151 | Política de Uso y Consumo Responsable del Papel | Reemplazar |
| 7 | PA01-P03 - Política de Gestión Documental | id=2024 | Política de Gestión Documental | Reemplazar |
| 8 | PA02-P04 - Política de Desconexión Laboral SDM | index=604 (no público) | Política de Desconexión Laboral | Mantener actual |
| 9 | PA02-P05 - Política de Prevención del Acoso Laboral | index=605 | Política de Prevención del Acoso Laboral | Reemplazar (nombre propuesto) |
| 10 | PA02-P06 - Política del Sistema de Administración de Riesgos de Lavado de Activos y Financiación del Terrorismo (SARLAFT) | index=606 | Política del Sistema de Administración de Riesgos de Lavado de Activos y Financiación del Terrorismo (SARLAFT) | Reemplazar |
| 11 | PA01-P01. Política de Seguridad Vial V 1.0 del 04-09-2023 | id=2264 | Política de Seguridad Vial | Reemplazar |

## 2. Manuales
Página: `/manuales-sdm` (numeral 2.1.5)

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 1 | Manual de contratación | index=1022 | Manual de Contratación | Reemplazar (nombre igual). Ya está en la página |
| 2 | Manual de supervisión | index=1024 | Manual de Supervisión | Reemplazar (nombre igual). Ya está en la página |
| 3 | MANUAL MODELO INTEGRADO DE PLANEACIÓN Y GESTIÓN VERSIÓN 24,0 DE 26-06-2026 | id=2263 | Manual del Modelo Integrado de Planeación y Gestión (MIPG) | Reemplazar |
| 4 | Manual cobro administrativo coactivo (2021) | index=1021 | Manual de Cobro Administrativo Coactivo | Reemplazar |
| 5 | PA04-M03 Manual para la protección de los datos personales en la Secretaría Distrital de Movilidad V2.0 del 05/12/2025 | index=1355 | Manual para la Protección de los Datos Personales | Reemplazar |
| 6 | Manual de Servicio a la Ciudadanía | index=328 | Manual de Servicio a la Ciudadanía | Reemplazar (nombre igual). Ya está en la página |
| 7 | Manual de Integridad | index=673 | Manual de Integridad | Reemplazar (nombre igual) |
| 8 | Manual del Sistema de Gestión de la Seguridad y Salud en el Trabajo V5.0 de 13-02-2024 | index=667 | Manual del Sistema de Gestión de la Seguridad y Salud en el Trabajo | Reemplazar |
| 9 | Manual Operativo del Centro de Orientación a Victimas de Siniestro Vial - ORVI Versión 4.0 | index=336 | Manual Operativo del Centro de Orientación a Víctimas de Siniestros Viales (ORVI) | Reemplazar |
| 10 | Manual de gestión documental | index=559 (no público) | Manual de Gestión Documental | Mantener actual |
| 11 | Manual del Sistema de Gestión Ambiental | id=2037 | Manual del Sistema de Gestión Ambiental | Reemplazar (nombre igual) |
| 12 | Manual para manipulación de cargas | index=672 | Manual para la Manipulación de Cargas | Reemplazar (nombre propuesto) |
| 13 | Manual de convivencia laboral | index=679 | Manual de Convivencia Laboral | Reemplazar (nombre propuesto) |
| 14 | Manual de políticas específicas de seguridad de la información | index=854 (no público) | Manual de Políticas Específicas de Seguridad de la Información | Mantener actual |
| 15 | Manual de arquitectura de desarrollo seguro para la secretaría distrital de movilidad | index=857 (no público) | Manual de Arquitectura de Desarrollo Seguro | Mantener actual |
| 16 | Manual de Comunicaciones y Cultura para la Movilidad | id=2255 | Manual de Comunicaciones y Cultura para la Movilidad | Reemplazar (nombre igual) |
| 17 | Manual de ruta pila | index=150 | Manual de Ruta Pila | Reemplazar (nombre propuesto) |
| 18 | Manual de cooperación internacional V 1.0 2023 | index=117 | Manual de Cooperación Internacional | Reemplazar |
| 19 | Manual del buen ciclista - 2023 | Sin enlace | Manual del Buen Ciclista 2023 | Pendiente |
| 20 | Manual para la elaboración de ejercicios de Rendición de Cuentas Locales de la Secretaría Distrital de Movilidad | index=1518 | Manual para la Elaboración de Ejercicios de Rendición de Cuentas Locales | Reemplazar (nombre propuesto). Agregar a la página (hoy no está) |
| 21 | (nuevo) | id=2091 | Manual de Estilo | Publicar nuevo en esta página (decidido el 23/11/2026) |
| 22 | Manual de adopción de políticas de prevención del daño antijurídico | Sin cambio (no está en la lista) | Manual de Adopción de Políticas de Prevención del Daño Antijurídico | Etapa 4: solo nombre |

## 3. Protocolos
Página: `/protocolos` (numeral 2.1.5)

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 1 | PM06-PT01-Protocolo para el Fortalecimiento de los Mecanismos de Consulta-Participativos | | | Eliminar (repetido; se usa el #40) |
| 2 | Protocolo para el cumplimiento de la política de transparencia y acceso a la información pública | id=2002 | Protocolo para el Cumplimiento de la Política de Transparencia y Acceso a la Información Pública | Reemplazar (nombre igual) |
| 3 | Protocolo operación centro de gestión | index=152 (no público) | Protocolo de Operación Centro de Gestión | Mantener actual |
| 4 | Protocolo operación GOGEV | index=174 (no público) | Protocolo de Operación GOGEV | Mantener actual |
| 5 | PM02-PR07-PT01 PROTOCOLO DE COMUNICACIONES – OPERACIÓN EN VÍA AL COLEGIO EN BICI | index=185 | Protocolo de Comunicaciones para la Operación en Vía Al Colegio en Bici | Reemplazar |
| 6 | PM02-PR07-PT02 PROTOCOLO PARA LA ATENCIÓN DE EMERGENCIAS Y DESASTRES AL COLEGIO EN BICI | index=186 | Protocolo para la Atención de Emergencias y Desastres Al Colegio en Bici | Reemplazar |
| 7 | Protocolo de eventos Al Colegio en Bici y BiciParceros | index=188 | Protocolo de Eventos Al Colegio en Bici | Reemplazar |
| 8 | Protocolo de funcionamiento puntos de encuentro | index=189 | Protocolo de Funcionamiento Puntos de Encuentro | Reemplazar (nombre propuesto) |
| 9 | Protocolo operación en vía bici-parceros | index=190 | Protocolo de Operación en Vía BiciParceros | Reemplazar (nombre propuesto) |
| 10 | Protocolo operación en vía ciempiés | index=210 (no público) | Protocolo de Operación en Vía Ciempiés | Mantener actual |
| 11 | Protocolo de juegos CIEMPIÉS | index=211 (no público) | Protocolo de Juegos Ciempiés | Mantener actual |
| 12 | Protocolo eventos CIEMPIÉS | index=212 (no público) | Protocolo de Eventos Ciempiés | Mantener actual |
| 13 | Protocolo de sitio de espera CIEMPIÉS | index=213 (no público) | Protocolo de Sitio de Espera Ciempiés | Mantener actual |
| 14 | Protocolo de emergencias, desastres y atención en salud | index=214 (no público) | Protocolo de Emergencias, Desastres y Atención en Salud | Mantener actual |
| 15 | PM02-PR16-PT01 PROTOCOLO DE VERIFICACIÓN, FISCALIZACIÓN Y CONTROL DURANTE EL SERVICIO | index=225 | Protocolo de Verificación, Fiscalización y Control durante el Servicio | Reemplazar (nombre propuesto) |
| 16 | PM02-PR16-PT02 PROTOCOLO DE IMPOSICIÓN DE ORDEN COMPARENDO NACIONAL, INFORME ÚNICO DE INFRACCIONES AL TRANSPORTE | index=226 | Protocolo de Imposición de Orden Comparendo Nacional, Informe Único de Infracciones al Transporte | Reemplazar (nombre propuesto) |
| 17 | PM02-PR16-PT03 PROTOCOLO DE CENTRAL DE COMUNICACIONES | index=227 | Protocolo de Central de Comunicaciones | Reemplazar (nombre propuesto) |
| 18 | Protocolo de Eventos y Emergencias | | | Eliminar (repetido con el #39) |
| 19 | PM02-PR16-PT05 PROTOCOLO DE DOCUMENTOS ABANDONADOS Y CITACIÓN DE ENTE JUDICIAL - AUTORIDAD DE TRÁNSITO | index=229 | Protocolo de Documentos Abandonados y Citación de Ente Judicial por la Autoridad de Tránsito | Reemplazar (nombre propuesto) |
| 20 | Protocolo de Actividades para la operación de CEPOS | Sin enlace | Protocolo de Actividades para la Operación de CEPOS | Pendiente. Nota OAPI: "No sale en la caracterización pero el documento está público" |
| 21 | PM02-PR16-PT08 PROTOCOLO DE PROGRAMACIÓN | index=232 | Protocolo de Programación | Reemplazar (nombre propuesto) |
| 22 | Protocolo para la Captura y procesamiento de información de campo | index=236 | Protocolo para la Captura y Procesamiento de Información de Campo | Reemplazar (nombre propuesto) |
| 23 | Protocolo implementación mecanismos de medición | Sin enlace | Protocolo de Implementación Mecanismos de Medición | Pendiente |
| 24 | Protocolo para la implementación de la figura del defensor del ciudadano en la SDM | Sin enlace | Protocolo para la Implementación de la Figura del Defensor del Ciudadano | Pendiente |
| 25 | Protocolo para la evaluación del cumplimiento del manual de servicio a la ciudadanía | index=333 | Protocolo para la Evaluación del Cumplimiento del Manual de Servicio a la Ciudadanía | Reemplazar (nombre propuesto) |
| 26 | Protocolo de primer contacto con víctimas directas e indirectas de siniestros viales | index=337 | Protocolo de Primer Contacto con Víctimas Directas e Indirectas de Siniestros Viales | Reemplazar (nombre propuesto) |
| 27 | Protocolo de Contingencia de Incidentes en los Centros de Servicios de Movilidad | Sin enlace | Protocolo de Contingencia de Incidentes en los Centros de Servicios de Movilidad | Pendiente |
| 28 | Protocolo para recepción, gestión y respuesta de peticiones formales realizadas por la ciudadanía a través de las redes sociales | Sin enlace | Protocolo para Recepción, Gestión y Respuesta de Peticiones Formales Realizadas por la Ciudadanía a través de las Redes Sociales | Pendiente |
| 29 | Protocolo para el desarrollo de audiencias virtuales | index=354 | Protocolo para el Desarrollo de Audiencias Virtuales | Reemplazar (nombre propuesto) |
| 30 | Protocolo para la salida de vehículos inmovilizados | index=359 | Protocolo para la Salida de Vehículos Inmovilizados | Reemplazar (nombre propuesto) |
| 31 | Protocolo para la realización de Reuniones Virtuales | | | Eliminar |
| 32 | Protocolo de denuncias por actos de soborno | index=677 | Protocolo de Denuncias por Actos de Soborno | Reemplazar |
| 33 | Protocolo descanso compensado | index=680 | Protocolo de Descanso Compensado | Reemplazar (nombre propuesto) |
| 34 | Protocolo para la prevención de accidentes de trabajo de origen deportivo | index=682 | Protocolo para la Prevención de Accidentes de Trabajo de Origen Deportivo | Reemplazar (nombre propuesto) |
| 35 | Protocolo de atención primeros auxilios psicológicos | index=685 | Protocolo de Atención Primeros Auxilios Psicológicos | Reemplazar (nombre propuesto) |
| 36 | Protocolo de atención punto de primeros auxilios | index=686 | Protocolo de Atención Punto de Primeros Auxilios | Reemplazar (nombre propuesto) |
| 37 | PM02-PR16-PT07 UNIFORMES Y ELEMENTOS DE SERVICIO | index=231 | Protocolo de Uniformes y Elementos de Servicio | Reemplazar |
| 38 | Protocolo de operación en vía Al Colegio en Bici | index=187 | Protocolo de Operación en Vía Al Colegio en Bici | Reemplazar |
| 39 | PM02-PR16-PT04 PROTOCOLO DE MEDIDAS DE ACCIÓN ANTE EVENTOS Y EMERGENCIAS | index=228 | Protocolo de Medidas de Acción ante Eventos y Emergencias | Reemplazar |
| 40 | PM06-PT01 Protocolo para el fortalecimiento de los mecanismos de consulta participativos | index=472 | Protocolo para el Fortalecimiento de los Mecanismos de Consulta Participativos frente a la Información de Ley de Transparencia y Acceso a la Información | Reemplazar |
| 41 | Gestión de la Continuidad en la SDM | Sin enlace | Gestión de la Continuidad | Pendiente |

Nota: en la lista de la OAPI, "Protocolo de Eventos y Emergencias" remite a "ver fila 77". Se interpreta como el protocolo PM02-PR16-PT04 (#39). Los números de esta tabla no son los de la hoja de la OAPI.

**Protocolos de integridad** (subsección de la misma página, por confirmar)

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 42 | PA02-M03-CD01 CODIGO DE INTEGRIDAD - SDM | index=675 | Código de Integridad | Reemplazar |

## 4. Manual y políticas de seguridad de la información
Página: `/politicas-de-seguridad-y-proteccion-de-datos-personales` (numeral 2.1.5)

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 1 | MANUAL PARA LA PROTECCIÓN DE LOS DATOS PERSONALES | index=1355 | Manual para la Protección de los Datos Personales | Reemplazar |
| 2 | POLÍTICA GENERAL DEL SISTEMA DE GESTION DE SEGURIDAD DE LA INFORMACION SECRETARIA DISTRITAL DE MOVILIDAD | index=847 | Política General de Seguridad de la Información | Reemplazar |
| 3 | MANUAL DE POLÍTICAS ESPECÍFICAS DE SEGURIDAD DE LA INFORMACIÓN | index=854 (no público) | Manual de Políticas Específicas de Seguridad de la Información | Mantener actual |

## 5. Planes institucionales y estratégicos
Página: `/planes-institucionales-y-estrategicos` (numeral 4.3)

**Planes del Decreto 612 de 2018, vigencia 2026**

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 1 | 1. PE01-PG01 Programa de Transparencia y Ética Pública 2026 | id=2122 | Programa de Transparencia y Ética Pública (PTEP) 2026 | Reemplazar |
| 2 | 2. PA01-PL04 Plan Institucional de Archivos PINAR 2024-2027 V.2.0.pdf | id=2118 | Plan Institucional de Archivos (PINAR) 2024-2027 | Reemplazar |
| 3 | 3. Plan Anual de Adquisiciones SDM 2026 | Enlace actual (SECOP) | | Mantener actual (instrucción OAPI) |
| 4 | 4. PA02-PL04 Plan Anual de Vacantes SDM 2026.pdf | id=2061 | Plan Anual de Vacantes 2026 | Reemplazar |
| 5 | 5. PA02-PL05 Plan de Previsión de Recursos Humanos SDM 2026.pdf | index=2047 | Plan de Previsión de Recursos Humanos 2026 | Reemplazar |
| 6 | 6. PA02-PL03 Plan Estratégico de Talento Humano 2026.pdf | index=2063 | Plan Estratégico de Talento Humano 2026 | Reemplazar |
| 7 | 7. PA02-PL01 Plan Institucional de Capacitación PIC 2026.pdf | index=2050 | Plan Institucional de Capacitación (PIC) 2026 | Reemplazar |
| 8 | 8. PA02-PL06 Plan de Bienestar Social e Incentivos SDM 2026.pdf | index=2064 | Plan de Bienestar Social e Incentivos 2026 | Reemplazar |
| 9 | 9. PA02-PL07 Plan de Trabajo Anual del SST SDM 2026.pdf | index=2051 | Plan de Trabajo Anual de Seguridad y Salud en el Trabajo (SST) 2026 | Reemplazar |
| 10 | 10. PA04-PL01 Plan Estratégico de las Tecnologías de la Información y Comunicaciones - PETI 2025-2028.pdf | index=1664 | Plan Estratégico de las Tecnologías de la Información y las Comunicaciones (PETI) 2025-2028 | Reemplazar |
| 11 | 10.1 PA04-PL02 Plan Estratégico de Tecnologías de la Información PETI 2026.pdf | index=2084 | Plan Estratégico de Tecnologías de la Información y las Comunicaciones (PETI) 2026 | Reemplazar. Pasa a subítem del plan 2025-2028 (antes 10.1) |
| 12 | 11. PA04-PL05 Plan de Tratamiento de Riesgos de Seguridad de la Información 2026.pdf | index=2087 | Plan de Tratamiento de Riesgos de Seguridad de la Información 2026 | Reemplazar |
| 13 | 12. PA04-PL03 Plan Estratégico de Seguridad de la Información (PESI) 2026.pdf | index=2085 | Plan Estratégico de Seguridad y Privacidad de la Información (PESI) 2026 | Reemplazar |

**Planes vigencia 2026**

| # | Nombre actual | Enlace nuevo | Nombre nuevo | Acción |
|---|---|---|---|---|
| 14 | 1. PE02-PL01 Plan Estratégico de comunicaciones y cultura para la movilidad 2026.pdf | index=2078 | Plan Estratégico de Comunicaciones y Cultura para la Movilidad 2026 | Reemplazar |
| 15 | 2. Plan marco para el fortalecimiento e implementación del Modelo Integrado de Planeación y Gestión MIPG 2026.pdf | Enlace actual | | Mantener actual (instrucción OAPI) |
| 16 | 3. PA01-PL01 Plan Institucional del Sistema Integrado de Conservación de Documentos SIC 2024-2027.pdf | id=2119 | Plan Institucional del Sistema Integrado de Conservación de Documentos (SIC) 2024-2027 | Reemplazar |
| 17 | 4. PA04-PL06 Plan de Mantenimiento de Servicios Tecnológicos 2026.pdf | index=2088 | Plan de Mantenimiento de Servicios Tecnológicos 2026 | Reemplazar |
| 18 | 5. PA01-PL09 Plan de Austeridad e Indicadores 2026.pdf | id=2161 | Plan de Austeridad 2026 | Reemplazar |
| 19 | 6. PA01-PL03 Plan Institucional de Gestión Ambiental PIGA 2026.pdf | id=2114 | Plan Institucional de Gestión Ambiental (PIGA) 2026 | Reemplazar |
| 20 | 7. PA04-PL04 Plan de Datos Abiertos 2026.pdf | index=2086 | Plan de Datos Abiertos 2026 | Reemplazar |
| 21 | 8. PM06-PL01 Plan Institucional de Participación Ciudadana SDM 2026.pdf | index=2066 | Plan Institucional de Participación Ciudadana 2026 | Reemplazar |
| 22 | 9. PA02-PL02 Plan Cuatrienal de Gestión Estratégica del Talento Humano 2025-2028.pdf | index=706 | Plan Cuatrienal de Gestión Estratégica del Talento Humano 2025-2028 | Reemplazar |
| 23 | 12. PA01-PG03 Programa de Gestión Documental PGD 2024-2027.pdf | index=1643 | Programa de Gestión Documental (PGD) 2024-2027 | Reemplazar |
| 24 | (nuevo) | id=1693 | Plan Institucional de Gestión Ambiental (PIGA) Cuatrienio | Publicar nuevo |

Nota: por la regla 5 se quita la numeración. Los títulos se tomaron de la ficha de DARUMA (23/11/2026) y se les aplicó el patrón.

---

## Resumen

| Acción | Cantidad |
|---|---|
| Reemplazar (con nombre de la OAPI) | 47 |
| Reemplazar (nombre igual) | 7 |
| Reemplazar (nombre propuesto) | 21 |
| Mantener actual, enlace no público | 12 (11 documentos; el 854 está en dos páginas) |
| Mantener actual, instrucción OAPI | 2 |
| Eliminar | 3 |
| Publicar nuevo | 2 |
| Pendiente | 7 |

## Consultas a la OAPI
1. Los 11 enlaces no públicos: index 604, 559, 854, 857, 152, 174, 210, 211, 212, 213 y 214.
2. Las 7 filas pendientes: Manual del buen ciclista, CEPOS, mecanismos de medición, defensor del ciudadano, contingencia en Centros de Servicios, peticiones por redes sociales y Gestión de la Continuidad.
3. Criterio de mayúsculas en los nombres.
4. Numeración de "Planes vigencia 2026".
5. Ubicación del "Manual de estilo" y de "Código de Integridad".
6. Validar los 21 nombres propuestos.

---

## Novedades para la respuesta a la OAPI (acumuladas al 23/11/2026)

### Decisiones tomadas (informar)
1. Patrón de nombres validado (ver sección "Patrón de nombres"): tipo de documento, objeto, sigla entre paréntesis y vigencia; sin código, versión, fecha, numeración ni mención de la entidad.
2. Mayúsculas: inicial mayúscula en los nombres propios, incluido el nombre de cada documento, plan, programa o campaña. Artículos, preposiciones y conjunciones internos en minúscula, salvo cuando el artículo forma parte del nombre o lo inicia (Al Colegio en Bici). Siglas en mayúscula. Esto ajusta el criterio de "minúscula" de la solicitud de la OAPI.
3. Nombres propios con mayúsculas: Programa de Transparencia y Ética Pública (PTEP) y Centro de Orientación a Víctimas de Siniestros Viales (ORVI).
4. Planes: sin numeración en el texto; los anexos (cronogramas, planes de acción) pasan a subítems de su plan.
5. Alcance: todos los documentos de las cinco páginas, por etapas, incluido el bloque histórico de Protocolos y los documentos que no están en la lista.
6. Manuales: se agrega el Manual de Rendición de Cuentas Locales y se publica el Manual de Estilo en /manuales-sdm. Se conserva la sigla (MIPG) y el nombre Manual de Ruta Pila.
7. Títulos: se toma el título oficial de la ficha de DARUMA y se le aplica el patrón, en las cinco páginas.

### Enlaces con acceso restringido (solicitar publicación)
Los 11 enlaces muestran "Usted no tiene los permisos requeridos". Se mantiene el enlace actual hasta que se publiquen: index 604, 559, 854, 857, 152, 174, 210, 211, 212, 213 y 214.

### Consultas abiertas
1. Documentos sin enlace ni instrucción: Manual del Buen Ciclista 2023; Protocolo de Actividades para la Operación de CEPOS; Protocolo de Implementación de Mecanismos de Medición; Protocolo para la Implementación de la Figura del Defensor del Ciudadano; Protocolo de Contingencia de Incidentes en los Centros de Servicios de Movilidad; Protocolo para Recepción, Gestión y Respuesta de Peticiones Formales por Redes Sociales; Gestión de la Continuidad.
2. Ubicación del Código de Integridad (hoy en Protocolos).
3. Planes: ¿el PTEP enlaza a su página o a la ficha id=2122? ¿Qué es el bloque de 15 enlaces subidos el 11/08/2026? ¿Los anexos se pasan a DARUMA?
4. Manual de Adopción de Políticas de Prevención del Daño Antijurídico (PA05-M04): no está en la lista. ¿Se pasa a DARUMA?
5. Bloque histórico de integridad en Protocolos (informes 2019 a 2025, códigos anteriores y resoluciones): confirmar que se mantiene.
6. Validar los nombres que no propuso la OAPI.

### Verificación de títulos contra las fichas de DARUMA (23/11/2026)
- Se revisaron las 75 fichas públicas. Los nombres de la tabla coinciden con el título oficial una vez aplicado el patrón, salvo los casos de abajo. Las 11 fichas restringidas no se pudieron verificar.
- Errores en fichas de DARUMA (informar al dueño del documento):
  - index=2084, PETI 2026: dice "Tecnologías de la información y las Comunicación". En la web se publica "Comunicaciones".
  - index=847, Política General de Seguridad de la Información: dice "LASECRETARIA" (falta un espacio).
- Títulos oficiales que difieren de la tabla (por decidir):
  - Protocolos #22 (index=236): el título oficial agrega "del Grupo de Aforadores de la Dirección de Gestión de Tránsito y Control de Tránsito y Transporte".
  - Protocolos #37 (index=231): la ficha dice solo "Uniformes y Elementos de Servicio", sin "Protocolo".
  - Protocolos #9 (index=190): la ficha escribe "Bici-parceros".
  - Planes, PESI 2026 (index=2085): la sigla PESI no está en la ficha; se tomó de la página publicada.
  - Planes, Plan Cuatrienal de Talento Humano (index=706): la ficha no trae los años; se conservó 2025-2028 del nombre del archivo.
  - Planes, PIGA Cuatrienio (id=1693): la ficha no trae los años.
- Planes: el PETI 2026 (antes 10.1) pasa a subítem del PETI 2025-2028.

### Otras novedades del caso
- Subtítulo del histórico del Plan Sectorial: corregir "Decreto 319 de 2006" por "Decreto Distrital 497 de 2023".
- Consultas a otras dependencias: 4.10 (Atención al Ciudadano), 4.6 (Administrativa y Financiera), 7.2.2 (OTIC), viñetas 6 y 8 (Contratación) y 1.5 (Talento Humano).
- Esquema: dependencia que aprueba el documento técnico (parágrafo del artículo 3 de la Resolución 1132851 de 2026) y versión base del archivo.
- Pendientes de recibir: Word de cambios del 4.11 y documento de Políticas Públicas Distritales.

### Decisiones de Protocolos (23/11/2026)
- #22: versión corta del título.
- #37: se antepone "Protocolo de" al título de la ficha.
- Grafía oficial del programa: BiciParceros.
- No se agregan conectores que la ficha no trae; solo se aplica la regla 6 (conector después del tipo de documento) y la regla 7 (el guion se reemplaza en #5 y #19).


### Gestión de riesgos (4.11): renombrado de subtítulos en otra etapa (23/11/2026)
Decisión del usuario: el cambio de nombre de los subtítulos se hará en una etapa posterior. Correspondencia identificada:

| OAPI | Subtítulo actual en la página | Nombre propuesto por la OAPI |
|---|---|---|
| 4.11.1.1 | Mapas riesgos de gestión por proceso ("Mapa de gestión" no existe) | Mapa de riesgos de gestión y de tipo fiscal |
| 4.11.1.2 | Monitoreo segunda linea de defensa | Monitoreo Riesgos de gestión y de tipo fiscal |
| 4.11.1.3 | Seguimiento tercera linea de defensa | Seguimiento tercera línea de defensa |
| 4.11.2.1 | Mapa de riesgos de corrupción, fraude y conflicto de Interés | Mapa de riesgos de SIGRIP (Corrupción, fraude y conflicto de Interés) |
| 4.11.2.2 | Monitoreo segunda linea de defensa (repetido) | Monitoreo Riesgos de SIGRIP (Corrupción, fraude y conflicto de Interés) |

Sin instrucción de la OAPI: Seguimiento tercera línea de defensa de SIGRIP, Riesgos de Soborno y Mapa de riesgos SARLAFT. Pendiente el Word adjunto de la OAPI. Detalle: .agents/tasks/numeral-4/report.md.
