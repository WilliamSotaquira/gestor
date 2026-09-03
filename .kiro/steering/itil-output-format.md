---
inclusion: always
---

# Formato de salida ITIL

Cuando el usuario comparta un correo, chat de WhatsApp, mensaje reenviado, invitación, resumen de llamada telefónica o texto libre para generar una solicitud ITIL (según los prompts en `storage/app/prompts/`):

- Entrega **siempre** el resultado ITIL dentro de un único bloque de código (```) para que sea copiable y pegable directo en el sistema.
- El bloque debe contener **solo** la solicitud ITIL en su formato línea por línea (asunto, descripción, fecha, solicitante, subservicio, enlaces, título de actividad y acciones). Nada más.
- No agregues texto explicativo, encabezados ni comentarios dentro del bloque de código.
- Cualquier aclaración sobre clasificación, entidad o supuestos va **fuera** del bloque (antes o después), nunca dentro.
- Determina la entidad (Movilidad o Culturas) por el contenido; si es ambiguo, pregunta antes de generar.
