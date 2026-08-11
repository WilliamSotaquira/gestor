---
inclusion: fileMatch
fileMatchPattern: "sites/movilidad/cms/**"
---

# Patrón de acordeones para nodos CMS de Movilidad

## Contexto

Los nodos CMS de Movilidad se pegan como HTML crudo en un campo de texto de Drupal. El CMS ya carga sus propios estilos (GOV.CO, Bootstrap) que pueden interferir con componentes de Bootstrap como `accordion`. 

## Regla: Usar `<details>/<summary>` en vez de Bootstrap accordion

Para desplegables en nodos CMS de movilidad, usar **siempre** el patrón `<details>/<summary>` nativo de HTML5:

```html
<details>
  <summary>Título del desplegable</summary>
  <div class="panel-body">
    <!-- contenido -->
  </div>
</details>
```

### Por qué

- No depende de JS ni de Bootstrap
- Funciona sin conflictos con los estilos del CMS de Drupal
- Los títulos siempre son visibles (no los oculta ningún CSS externo)
- Compatible con todos los navegadores modernos

### Estilos inline requeridos

Incluir un `<style>` dentro del wrapper con:
- `summary` con fondo `#A6B517`, color `#000`, font-weight 600
- `summary::after` con chevron `▼` que rota al abrir
- `.panel-body` con fondo blanco y padding
- Ocultar el marcador nativo con `summary::-webkit-details-marker { display: none; }`

### Referencia

Ver `sites/movilidad/cms/rlu/index.html` como ejemplo canónico de este patrón.
