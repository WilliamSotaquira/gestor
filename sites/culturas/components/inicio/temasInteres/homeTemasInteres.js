const $jt = jQuery.noConflict();

const fields = "ID,Title,FechaOrden,Resumen,UrlDestino,File/ServerRelativeUrl";
const topCount = 5;
const libraryName = "Temas%20de%20interes";
const webUrl = _spPageContextInfo.webAbsoluteUrl;
const expand = "Properties,File";
const orderby = "FechaOrden desc";
const filter = ""; // Example: "Visible eq 1"

document.addEventListener("DOMContentLoaded", getTemasInteres);

async function getTemasInteres() {
  try {
    const response = await fetch(
      `${webUrl}/_api/web/lists/GetByTitle('${libraryName}')/items?$top=${topCount}&$select=${fields}&$orderby=${orderby}&$filter=${filter}&$expand=${expand}`,
      {
        headers: {
          Accept: "application/json;odata=verbose",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setTemasInteres(data.d.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function setTemasInteres(items) {
  const cardTemplate = (item, linkClass) => `
        <div class="temas-p">
            <p class="home-temas-title mb-2">${escapeHTML(item.Title)}</p>
            <p class="home-temas-resume mb-3">${escapeHTML(item.Resumen)}.</p>
            <a class="${linkClass}" href="${item.UrlDestino.Url}" class="card-link">Ver más</a>
        </div><br>`;

  const container = $jt(".setTemasInteres");
  container.empty();
  var cont = 0;
  items.forEach((item) => {
    //  const linkClass = (item.Title === "" || item.Title === "")  /// tenia unos temas de galeon colocados por david, ya se corrigio
    const linkClass =
      cont === 0 || cont === 3
        ? "home-temas-link-destacado"
        : "home-temas-link";
    container.append(cardTemplate(item, linkClass));
    cont += 1;
  });
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(
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
