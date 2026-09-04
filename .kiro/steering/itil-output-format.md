---
inclusion: always
---

# Formato de salida ITIL

## Cuándo generar una solicitud ITIL

**No generes solicitudes ITIL de forma automática.** Genera una solicitud ITIL **solo cuando el usuario lo pida explícitamente** (por ejemplo: "genera la ITIL", "pásalo a ITIL", "arma la solicitud").

Si el usuario comparte un correo, chat de WhatsApp, mensaje reenviado, invitación, resumen de llamada o texto libre sin pedir la ITIL, atiende la solicitud de trabajo (edición de contenido, publicación, etc.) sin producir el bloque ITIL.

## Formato (cuando el usuario sí lo solicite)

Al generar una solicitud ITIL (según los prompts en `storage/app/prompts/`):

- Entrega **siempre** el resultado ITIL dentro de un único bloque de código (```) para que sea copiable y pegable directo en el sistema.
- El bloque debe contener **solo** la solicitud ITIL en su formato línea por línea (asunto, descripción, fecha, solicitante, subservicio, enlaces, título de actividad y acciones). Nada más.
- No agregues texto explicativo, encabezados ni comentarios dentro del bloque de código.
- Cualquier aclaración sobre clasificación, entidad o supuestos va **fuera** del bloque (antes o después), nunca dentro.
- Determina la entidad (Movilidad o Culturas) por el contenido; si es ambiguo, pregunta antes de generar.
