

/* === Slider Principal — GobBannerSliderHome24.js === */
var $j = jQuery.noConflict();
var s_urlPath = _spPageContextInfo.webAbsoluteUrl;
var s_list = "SliderHome";

jQuery(document).ready(function() {
    getImagesForSlider();
    initCarouselControls();
});

function getImagesForSlider() {
    var fields = "ID,Title,Subtitulo,Caption,LinkDestino,TextoBoton,imgLogo,FechaOrden,File/ServerRelativeUrl";
    var filter = "Visible eq 1";
    var expand = "File";
    var orderBy = "FechaOrden asc";
    var url = s_urlPath + "/_api/web/lists/GetByTitle('" + s_list + "')/items?$select=" + fields + "&$filter=" + filter + "&$OrderBy=" + orderBy + "&$expand=" + expand;

    $j.ajax({
        url: url,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function(data) {
            var items = data.d.results;
            if (items.length > 0) {
                setSliderCount(items);
                setSlider(items);
            }
        },
        error: function(error) {
            console.error("Error fetching slider data:", JSON.stringify(error));
        }
    });
}

function setSlider(items) {
    $j("#carouselPrincipal .carousel-inner").empty();
    items.forEach(function(item, index) {
        var isActive = index === 0 ? 'active' : '';
        var altText = item.Title || 'Banner Ministerio de las Culturas';
        var logoHtml = '';
        if (item.imgLogo && item.imgLogo.Url) {
            logoHtml = '<img class="linklogo" src="' + item.imgLogo.Url + '" alt="" aria-hidden="true"/>';
        }
        var linkHtml = '';
        if (item.LinkDestino && item.TextoBoton) {
            linkHtml = '<a class="linkdestino" href="' + item.LinkDestino + '">' + item.TextoBoton + '</a>';
        }
        var itemHtml = '<div class="carousel-item ' + isActive + '" role="group" aria-roledescription="diapositiva" aria-label="' + (index + 1) + ' de ' + items.length + '">' +
            '<img class="slider-img" src="' + item.File.ServerRelativeUrl + '" alt="' + altText + '" loading="' + (index === 0 ? 'eager' : 'lazy') + '">' +
            '<div class="carousel-caption">' +
                '<p class="h1-slider">' + (item.Title || '') + '</p>' +
                '<p class="h4-slider">' + (item.Subtitulo || '') + '</p>' +
                '<p class="text-content">' + (item.Caption || '') + '</p>' +
                '<div class="div-button-logo">' + linkHtml + logoHtml + '</div>' +
            '</div>' +
        '</div>';
        $j("#carouselPrincipal .carousel-inner").append(itemHtml);
    });
}

function setSliderCount(items) {
    $j("#carouselPrincipal .carousel-indicators").empty();
    items.forEach(function(item, index) {
        var isActive = index === 0 ? ' class="active" aria-current="true"' : '';
        var buttonHtml = '<button type="button" role="tab" data-bs-target="#carouselPrincipal" data-bs-slide-to="' + index + '" aria-label="Diapositiva ' + (index + 1) + '"' + isActive + '></button>';
        $j("#carouselPrincipal .carousel-indicators").append(buttonHtml);
    });
}

function initCarouselControls() {
    var el = document.getElementById('carouselPrincipal');
    if (!el) return;

    var checkInterval = setInterval(function() {
        var items = el.querySelectorAll('.carousel-item');
        if (items.length === 0) return;
        clearInterval(checkInterval);

        // Desactivar auto-play nativo de Bootstrap
        el.removeAttribute('data-bs-ride');
        var existingInstance = bootstrap.Carousel.getInstance(el);
        if (existingInstance) existingInstance.dispose();

        // Crear instancia SIN auto-play (lo manejamos nosotros)
        var carousel = new bootstrap.Carousel(el, {
            interval: false,
            ride: false,
            pause: false,
            wrap: true
        });

        // Control manual del auto-play
        var autoPlayTimer = null;
        var isPlaying = false;

        function startAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(function() {
                carousel.next();
            }, 6000);
            isPlaying = true;
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
            isPlaying = false;
        }

        // Arrancar auto-play (a menos que prefiera movimiento reducido)
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            startAutoPlay();
        }

        // Botón de pausa/play
        var toggleBtn = document.getElementById('toggleButton');
        if (!toggleBtn) return;

        function updateButton() {
            if (isPlaying) {
                toggleBtn.innerHTML = '&#9208;';
                toggleBtn.setAttribute('aria-pressed', 'false');
                toggleBtn.setAttribute('aria-label', 'Pausar rotación automática');
                toggleBtn.setAttribute('title', 'Pausar');
            } else {
                toggleBtn.innerHTML = '&#9654;';
                toggleBtn.setAttribute('aria-pressed', 'true');
                toggleBtn.setAttribute('aria-label', 'Reanudar rotación automática');
                toggleBtn.setAttribute('title', 'Reproducir');
            }
        }

        updateButton();

        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (isPlaying) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
            updateButton();
        });

    }, 300);
}
