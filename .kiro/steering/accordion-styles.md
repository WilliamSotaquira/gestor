---
inclusion: manual
---

# Estilos de acordeón para secciones CMS Culturas

## Acordeón Bootstrap 5 con colores GOV.CO personalizados

Cuando se necesite crear una sección con acordeones desplegables en archivos de `sites/culturas/cms/`, usar este patrón:

### CSS (colocar en un `<style>` antes del HTML)

```css
#[ID_SECCION] .accordion-button {
    background-color: #EAEAFE !important;
    color: #4B3C8C !important;
    font-weight: 700;
    border: none;
    box-shadow: none;
}
#[ID_SECCION] .accordion-button:not(.collapsed) {
    background-color: #4B3C8C !important;
    color: #fff !important;
}
#[ID_SECCION] .accordion-button::after {
    filter: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%234B3C8C' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e") !important;
}
#[ID_SECCION] .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M2 5L8 11L14 5'/%3e%3c/svg%3e") !important;
}
#[ID_SECCION] .accordion-button:focus {
    box-shadow: 0 0 0 0.25rem rgba(75, 60, 140, 0.25);
}
#[ID_SECCION] .accordion-item {
    border: 1px solid #d4d2dc;
    border-radius: 0.375rem !important;
    margin-bottom: 8px;
    overflow: hidden;
}
```

### HTML (estructura Bootstrap 5 accordion)

```html
<div class="accordion" id="[ID_SECCION]">
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading[N]">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse[N]" aria-expanded="false" aria-controls="collapse[N]">[Título del item]</button>
        </h2>
        <div id="collapse[N]" class="accordion-collapse collapse" aria-labelledby="heading[N]" data-bs-parent="#[ID_SECCION]">
            <div class="accordion-body">
                [Contenido]
            </div>
        </div>
    </div>
</div>
```

### Colores de referencia

| Propiedad | Cerrado | Abierto |
|-----------|---------|---------|
| Fondo botón | `#EAEAFE` | `#4B3C8C` |
| Texto botón | `#4B3C8C` | `#fff` |
| Chevron | `#4B3C8C` | `#fff` |
| Borde item | `#d4d2dc` | `#d4d2dc` |
| Focus ring | `rgba(75, 60, 140, 0.25)` | — |

### Reglas

- font-weight: 700 (bold) en los títulos
- margin-bottom entre items: 8px
- border-radius: 0.375rem
- Usar `!important` para forzar sobre estilos del tema GOV.CO
- Contraste WCAG AA: `#4B3C8C` sobre `#EAEAFE` = ~5.3:1 ✓
