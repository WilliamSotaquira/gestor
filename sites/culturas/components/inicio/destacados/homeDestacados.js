const $jd = jQuery.noConflict();

// Configuración (prefijo "destacados" para no chocar con otras constantes globales de la página)
const destacadosConfig = {
  fields:
    "ID,Title,UrlDestino,UrlMedioMostrar,FechaOrden,Resumen,Visible,notaCiudadFecha,TipoMultimedia/ID,File/ServerRelativeUrl",
  top: 3, // máximo de destacados (una pestaña por cada uno)
  library: "Destacados",
  webUrl: _spPageContextInfo.webAbsoluteUrl,
  expand: "TipoMultimedia,File",
  orderBy: "FechaOrden desc",
  filter: "Visible eq 1",
  // Nombre interno de la columna de la lista con el texto corto de la pestaña.
  // Mientras esté vacío, la pestaña usa el Title del card.
  tabLabelField: "",
};

// Mensajes para el usuario
const MSG_SIN_DESTACADOS = "No hay contenidos destacados por el momento.";
const MSG_ERROR_DESTACADOS =
  "No pudimos cargar los contenidos destacados. Intenta nuevamente más tarde.";

// Tipos de multimedia (ID de la columna TipoMultimedia)
const TIPO_VIDEO = 2;
const TIPO_IMAGEN = 4;

// Si el DOM ya cargó (SharePoint puede inyectar el script tarde), se ejecuta de inmediato
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", getDestacados);
} else {
  getDestacados();
}

async function getDestacados() {
  const c = destacadosConfig;
  const fields = c.tabLabelField ? `${c.fields},${c.tabLabelField}` : c.fields;
  const requestUrl = `${c.webUrl}/_api/web/lists/GetByTitle('${c.library}')/items?$top=${c.top}&$select=${fields}&$orderby=${c.orderBy}&$filter=${c.filter}&$expand=${c.expand}`;

  try {
    const response = await fetch(requestUrl, {
      headers: {
        Accept: "application/json;odata=verbose",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setDestacados(data.d.results.slice(0, destacadosConfig.top));
  } catch (error) {
    console.error("Error fetching data:", error);
    showDestacadosMessage(MSG_ERROR_DESTACADOS);
  }
}

// Muestra un mensaje dentro del bloque de destacados
function showDestacadosMessage(text) {
  $jd(".SetDestacados").html(
    `<p class="destacados-mensaje" role="status">${escapeHTML(text)}</p>`,
  );
}

// Construye el contenido de un destacado (multimedia, fecha, resumen y enlace)
function buildDestacadoContent(item, index) {
  const title = escapeHTML(item.Title);
  const tipo = item.TipoMultimedia ? item.TipoMultimedia.ID : null;
  const urlDestino = item.UrlDestino ? escapeHTML(item.UrlDestino.Url) : "";
  let multimediaContent = "";

  switch (tipo) {
    case TIPO_VIDEO:
      if (item.UrlMedioMostrar && item.UrlMedioMostrar.Url) {
        // Los videos de pestañas no activas se cargan de forma diferida
        const lazy = index > 0 ? ' loading="lazy"' : "";
        multimediaContent = `<iframe class="pb-2" width="100%" style="border-radius: 8px; overflow: hidden;" height="334"
                src="${escapeHTML(item.UrlMedioMostrar.Url)}"
                title="${title}"${lazy}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>`;
      }
      break;

    case TIPO_IMAGEN:
      if (item.File && item.File.ServerRelativeUrl) {
        multimediaContent = `<img src="${escapeHTML(item.File.ServerRelativeUrl)}" alt="${title}" style="width:100%; height:auto;">`;
      }
      break;

    default:
      // Tipo no soportado: no se muestra multimedia
      break;
  }

  const linkHtml = urlDestino
    ? `<div class="btn-vermas-informacion"><a class="mt-5 mb-4 home-destacados-moreinformation" href="${urlDestino}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar información: ${title}">AMPLIAR INFORMACI&Oacute;N</a></div>`
    : "";

  // Fecha y resumen solo se dibujan si tienen contenido
  const dateHtml = item.notaCiudadFecha
    ? `<p class="pb-2 pt-2 home-destacados-date">${escapeHTML(item.notaCiudadFecha)}</p>`
    : "";
  const resumeHtml = item.Resumen
    ? `<p class="pb-2 home-destacados-resume">${escapeHTML(item.Resumen)}</p>`
    : "";

  return `
        <p class="pb-2 home-destacados-title">${title}</p>
        ${multimediaContent}
        ${dateHtml}
        ${resumeHtml}
        ${linkHtml}
    `;
}

function setDestacados(items) {
  const container = $jd(".SetDestacados");

  // Sin datos: se informa al usuario
  if (!items || items.length === 0) {
    showDestacadosMessage(MSG_SIN_DESTACADOS);
    return;
  }

  // Un solo destacado: se muestra directo, sin pestañas
  if (items.length === 1) {
    container.html(`<div class="destacados-single">${buildDestacadoContent(items[0], 0)}</div>`);
    return;
  }

  // Varios destacados: estructura de pestañas (Bootstrap 5)
  const tabs = items
    .map((item, i) => {
      const active = i === 0;
      // Texto de la pestaña: columna propia si está configurada; si no, el Title
      const labelField = destacadosConfig.tabLabelField;
      const title = escapeHTML((labelField && item[labelField]) || item.Title);
      return `
        <li class="nav-item" role="presentation">
          <button class="nav-link${active ? " active" : ""}" id="destacados-tab-${i}"
            data-bs-toggle="tab" data-bs-target="#destacados-panel-${i}" type="button"
            role="tab" aria-controls="destacados-panel-${i}" aria-selected="${active}"
            title="${title}">
            <span class="destacados-tab-text">${title}</span>
          </button>
        </li>`;
    })
    .join("");

  const panels = items
    .map((item, i) => {
      const active = i === 0;
      return `
        <div class="tab-pane fade${active ? " show active" : ""}" id="destacados-panel-${i}"
          role="tabpanel" aria-labelledby="destacados-tab-${i}" tabindex="0">
          ${buildDestacadoContent(item, i)}
        </div>`;
    })
    .join("");

  container.html(`
    <div id="destacadosTabs" class="destacados-tabs">
      <ul class="nav destacados-nav" role="tablist" aria-label="Contenidos destacados">${tabs}</ul>
      <div class="tab-content destacados-content">${panels}</div>
    </div>
  `);

  // Al salir de una pestaña, se detiene el video recargando su iframe
  const tabsRoot = document.getElementById("destacadosTabs");
  tabsRoot.addEventListener("hidden.bs.tab", function (event) {
    const targetSelector = event.target.getAttribute("data-bs-target");
    const panel = targetSelector ? tabsRoot.querySelector(targetSelector) : null;
    if (!panel) return;
    panel.querySelectorAll("iframe").forEach(function (frame) {
      frame.setAttribute("src", frame.getAttribute("src"));
    });
  });
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str).replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag,
  );
}
