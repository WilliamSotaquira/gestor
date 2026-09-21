<%@ Page language="C#"
  Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c"
  meta:progid="SharePoint.WebPartPage.Document" meta:webpartpageexpansion="full" %>
  <%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls"
    Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
    <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages"
      Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
      <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls"
        Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"
        %>
        <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation"
          Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"
          %>

          <asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">

            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />


            <asp:literal ID="ogType" runat="server"
              Text="&lt;meta property=&quot;og&#58;type&quot; content=&quot;article&quot;&gt;" />

            <asp:literal ID="ogTitle1" runat="server"
              Text="&lt;meta property=&quot;og&#58;title&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="ogTitle" FieldName="titleOG" runat="server" />
            <asp:literal id="ogTitle2" runat="server" Text="&quot;&gt;" />
            <asp:literal ID="ogImage1" runat="server" Text="&lt;meta property=&quot;og&#58;image&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="ogImage" FieldName="ogImage" runat="server" />
            <asp:literal id="ogImage2" runat="server" Text="&quot;&gt;" />
            <asp:literal ID="ogUrl1" runat="server" Text="&lt;meta property=&quot;og&#58;url&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="ogUrl" FieldName="ogUrl" runat="server" />
            <asp:literal id="ogUrl2" runat="server" Text="&quot;&gt;" />
            <asp:literal ID="ogDescription1" runat="server"
              Text="&lt;meta property=&quot;og&#58;description&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="DescriptionOG" FieldName="DescriptionOG" runat="server" />
            <asp:literal id="ogDescription2" runat="server" Text="&quot;&gt;" />

            <asp:literal ID="twCard" runat="server"
              Text="&lt;meta name=&quot;twitter&#58;card&quot; content=&quot;summary_large_image&quot;&gt;" />
            <asp:literal ID="twTitle1" runat="server"
              Text="&lt;meta name=&quot;twitter&#58;title&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="twTitle" FieldName="titleOG" runat="server" />
            <asp:literal id="twTitle2" runat="server" Text="&quot;&gt;" />
            <asp:literal ID="twImage1" runat="server"
              Text="&lt;meta name=&quot;twitter&#58;image&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="twImage" FieldName="ogImage" runat="server" />
            <asp:literal id="twImage2" runat="server" Text="&quot;&gt;" />
            <asp:literal ID="twDescription1" runat="server"
              Text="&lt;meta name=&quot;twitter&#58;description&quot; content=&quot;" />
            <SharePointWebControls:FieldValue id="twDescription" FieldName="DescriptionOG" runat="server" />
            <asp:literal id="twDescription2" runat="server" Text="&quot;&gt;" />





          </asp:Content>


          <asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
            <SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server" />
          </asp:Content>

          <asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
            <a href="settings.aspx">
              <SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,settings_pagetitle%>"
                EncodeMethod="HtmlEncode" />
            </a>




          </asp:Content>




          <asp:Content contentplaceholderid="PlaceHolderTitleBreadcrumb" runat="server">
            <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigationSwitchableProvider"
              RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb"
              NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode"
              RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=289 NodeImageWidth=16
              NodeImageHeight=16 NodeImageUrl="/_layouts/15/images/fgimg.png?rev=43" HideInteriorRootNodes="true"
              SkipLinkText="" />
          </asp:Content>

          <asp:Content ContentPlaceholderID="PlaceHolderLeftNavBar" runat="server"></asp:Content>



          <asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">






            <asp:PlaceHolder runat="server" id="PlaceHolder1">
            </asp:PlaceHolder>
            <link rel="stylesheet" type="text/css" href="/_catalogs/masterpage/Gobierno/css/internas/imaster.css">
            <link rel="stylesheet" type="text/css" href="/_catalogs/masterpage/Gobierno/css/templates/template1.css" />


            <script src="https://cdn.jsdelivr.net/npm/lightbox2@2.11.3/dist/js/lightbox-plus-jquery.min.js"></script>
            <link href="https://cdn.jsdelivr.net/npm/lightbox2@2.11.3/dist/css/lightbox.min.css" rel="stylesheet">

            <!-- Gallery -->
            <link href="/_catalogs/masterpage/Gobierno/css/templates/gallery.css" rel="stylesheet">
            <script src="/_catalogs/masterpage/Gobierno/js/templates/gallery.js"></script>

            <div class="container-fluid banner">
              <WebPartPages:WebPartZone runat="server" Title="Contenedor Banner Noticias" ID="ContenedorBannerNoticias">
                <ZoneTemplate></ZoneTemplate>
              </WebPartPages:WebPartZone>
            </div>
            <WebPartPages:SPProxyWebPartManager runat="server" id="spproxywebpartmanager">
            </WebPartPages:SPProxyWebPartManager>



            <div class="container noticias-interna-layout p-4 col-xl-8 justify-content-center">
              <div class="row">
                <div class="col-12">
                  <!-- Zona Miga de pan -->
                  <div class="breadcrumb">
                    <asp:SiteMapPath id="ContentMap" SkipLinkText="" NodeStyle-CssClass="ms-sitemapdirectional"
                      runat="server" />
                  </div>
                  <!-- MODO DE EDICION -->
                  <PublishingWebControls:EditModePanel runat="server" CssClass="edit-mode-panel roll-up">
                    <section id="zonaEdicion">

                      <div class="container text-center my-5 "
                        style="background-color:#EAEAFE; border:1px #9900CC solid">
                        <asp:Label text="SECCION DE CONFIGURACIÓN DE LA PAGINA - MODO DE EDICIÓN"
                          CssClass="ms-textSmall" runat="server" />
                        <div class="row align-items-start">
                          <div class="col">
                            <!-- titulo en el explorador -->
                            <label>Titulo en la ventana del explorador </label>
                            <SharePointWebControls:TextField FieldName="ff92f929-d18b-46d4-9879-521378c689ef"
                              runat="server"></SharePointWebControls:TextField>
                            <label>Fecha para Ordenar y Publicar </label>
                            <SharePointWebControls:DateTimeField FieldName="9eb86354-25e3-4330-95af-18909137c2af"
                              runat="server"></SharePointWebControls:DateTimeField>

                          </div>
                          <div class="col">
                            <!--fecha del articulo -->
                            <label>Fecha creación del articulo o Publicación </label>
                            <SharePointWebControls:DateTimeField FieldName="71316cea-40a0-49f3-8659-f0cefdbdbd4f"
                              runat="server"></SharePointWebControls:DateTimeField>
                          </div>
                          <div class="col"> <!-- nombre -->
                            <label>nombre del archivo </label>
                            <SharePointWebControls:FileField FieldName="8553196d-ec8d-4564-9861-3dbe931050c8"
                              runat="server"></SharePointWebControls:FileField>

                          </div>
                        </div>
                        <div class="row align-items-start">
                          <div class="col"><label>Pagina visible en resultados: </label>
                            <SharePointWebControls:BooleanField FieldName="Visible" runat="server">
                            </SharePointWebControls:BooleanField>
                          </div>
                          <div class="col"><!-- ocultar en los motores de busqueda --> <label>Ocultar en los motores de
                              Busqueda </label>
                            <SharePointWebControls:BooleanField FieldName="325c00dd-fd91-468b-81cf-5bb9951abba1"
                              runat="server"></SharePointWebControls:BooleanField>
                          </div>
                          <div class="col"><label>Descripcion para buscadores: </label>
                            <SharePointWebControls:TextField FieldName="d83897e5-2430-4df7-8e5a-9bc06c664992"
                              runat="server"></SharePointWebControls:TextField>
                          </div>
                        </div>

                      </div>
                      <div class="sectionOG">
                        <div class="row">
                          <div class="col">
                            <SharePointWebControls:TextField FieldName="titleOG" runat="server">
                            </SharePointWebControls:TextField>
                          </div>
                          <div class="col">
                            <SharePointWebControls:TextField FieldName="ogImage" runat="server">
                            </SharePointWebControls:TextField>
                          </div>
                          <div class="col">
                            <SharePointWebControls:NoteField FieldName="DescriptionOG" runat="server">
                            </SharePointWebControls:NoteField>
                          </div>
                        </div>
                      </div>


                    </section>

                  </PublishingWebControls:EditModePanel>
                  <!-- FIN DEL MODO EDICION -->


                  <!-- End Zona Miga de pan -->
                  <h1 class="news-title py-3">
                    <SharePointWebControls:TextField FieldName="fa564e0f-0c70-4ab9-b863-0177e6ddd247" runat="server">
                    </SharePointWebControls:TextField>
                  </h1>

                  <!-- Redes -->

                  <div class="btn-group" role="group" aria-label="Compartir en redes sociales">

                    <a class="btn" href="javascript:void(0);" role="button" id="getlink"
                      aria-label="Copiar enlace de la noticia">
                      <img src="/_catalogs/masterpage/Gobierno/img/icons/icon-share.png" alt="Compartir">
                    </a>

                    &nbsp;&nbsp;<!--<a class="btn" href="#" id="share-instagram" role="button"><img src="/_catalogs/masterpage/Gobierno/img/icons/purpura/icon-instagram-purpura.png" alt="Compartir en Instagram"></a>--><a
                      class="btn" href="javascript:void(0);" id="share-facebook" role="button"
                      aria-label="Compartir en Facebook"><img
                        src="/_catalogs/masterpage/Gobierno/img/icons/purpura/icon-facebook-purpura.png"
                        alt="Compartir en Facebook">
                    </a>
                    &nbsp;&nbsp;<a class="btn" href="javascript:void(0);" id="share-x" role="button"
                      aria-label="Compartir en X"><img
                        src="/_catalogs/masterpage/Gobierno/img/icons/purpura/icon-twitter-purpura.png"
                        alt="Compartir en X">
                    </a>
                    &nbsp;&nbsp;<a class="btn" href="javascript:void(0);" id="share-whatsapp" role="button"
                      aria-label="Compartir en WhatsApp"><img
                        src="/_catalogs/masterpage/Gobierno/img/icons/purpura/icon-wa-violeta-contorno.png"
                        alt="Compartir en WhatsApp">
                    </a>

                    &nbsp;&nbsp;
                  </div>

                  <script>
                    (function () {
                      // URL limpia de la noticia (sin query ni hash)
                      function getUrlLimpia() {
                        return window.location.href.split('?')[0].split('#')[0];
                      }

                      // Aviso temporal tipo toast
                      function mostrarAviso(mensaje) {
                        var aviso = document.createElement('div');
                        aviso.setAttribute('role', 'status');
                        aviso.style.cssText = [
                          'position:fixed',
                          'z-index:9999999',
                          'left:50%',
                          'bottom:32px',
                          'transform:translateX(-50%) translateY(12px)',
                          'display:flex',
                          'align-items:center',
                          'gap:10px',
                          'padding:12px 20px',
                          'background:#0943B5',
                          'color:#ffffff',
                          'border-radius:8px',
                          'box-shadow:0 4px 16px rgba(0,0,0,0.18)',
                          'font-family:"Nunito Sans", Verdana, sans-serif',
                          'font-size:15px',
                          'font-weight:600',
                          'opacity:0',
                          'transition:opacity .2s ease, transform .2s ease'
                        ].join(';');
                        aviso.innerHTML = '<span aria-hidden="true" style="font-size:18px; line-height:1;">&#10003;</span>' +
                          '<span></span>';
                        aviso.lastChild.textContent = mensaje;
                        document.body.appendChild(aviso);

                        // Forzar el reflow para que la transición de entrada se aplique
                        requestAnimationFrame(function () {
                          aviso.style.opacity = '1';
                          aviso.style.transform = 'translateX(-50%) translateY(0)';
                        });

                        setTimeout(function () {
                          aviso.style.opacity = '0';
                          aviso.style.transform = 'translateX(-50%) translateY(12px)';
                          setTimeout(function () {
                            if (aviso.parentNode) {
                              aviso.parentNode.removeChild(aviso);
                            }
                          }, 200);
                        }, 2000);
                      }

                      // Copiar enlace al portapapeles
                      var botonCopiar = document.getElementById('getlink');
                      if (botonCopiar) {
                        botonCopiar.addEventListener('click', function () {
                          var url = getUrlLimpia();
                          if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(url).then(function () {
                              mostrarAviso('URL copiada');
                            }).catch(function () {
                              alert('No fue posible copiar el enlace.');
                            });
                          } else {
                            alert('Tu navegador no soporta la función de copiar.');
                          }
                        });
                      }

                      // Compartir en redes sociales
                      function abrirVentana(url) {
                        window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
                      }

                      var enlace = encodeURIComponent(getUrlLimpia());
                      var titulo = encodeURIComponent(document.title || '');

                      var botonFacebook = document.getElementById('share-facebook');
                      if (botonFacebook) {
                        botonFacebook.addEventListener('click', function () {
                          abrirVentana('https://www.facebook.com/sharer/sharer.php?u=' + enlace);
                        });
                      }

                      var botonX = document.getElementById('share-x');
                      if (botonX) {
                        botonX.addEventListener('click', function () {
                          abrirVentana('https://twitter.com/intent/tweet?url=' + enlace + '&text=' + titulo);
                        });
                      }

                      var botonWhatsapp = document.getElementById('share-whatsapp');
                      if (botonWhatsapp) {
                        botonWhatsapp.addEventListener('click', function () {
                          abrirVentana('https://api.whatsapp.com/send?text=' + titulo + '%20' + enlace);
                        });
                      }
                    })();
                  </script>


                  <!-- Resume -->
                  <h2 class="news-resume py-3">
                    <SharePointWebControls:NoteField FieldName="Resumen" runat="server">
                    </SharePointWebControls:NoteField>
                  </h2>
                  <!-- Date -->
                  <div class="news-date py-2">
                    <SharePointWebControls:TextField FieldName="notaCiudadFecha" runat="server">
                    </SharePointWebControls:TextField>
                  </div>
                  <!-- Image -->
                  <div class="news-img d-flex justify-content-center">
                    <PublishingWebControls:RichImageField FieldName="3de94b06-4120-41a5-b907-88773e493458"
                      runat="server"></PublishingWebControls:RichImageField>
                  </div>
                  <!-- Label Image -->
                  <div class="p3-1 fst-italic">
                    <PublishingWebControls:RichHtmlField FieldName="66f500e9-7955-49ab-abb1-663621727d10"
                      runat="server"></PublishingWebControls:RichHtmlField>
                  </div>

                  <div class="text-left">
                    <p class="m-1 my-4"><a class="btn-segundario " href="/noticias" alt="Mas noticias">
                        VER MÁS NOTICIAS</a></p>
                  </div>



                  <!-- Content -->
                  <PublishingWebControls:RichHtmlField FieldName="f55c4d88-1f2e-4ad9-aaa8-819af4ee7ee8" runat="server">
                  </PublishingWebControls:RichHtmlField>

                  <p class="text-center m-5"><a class="btn-segundario " href="/noticias" alt="Mas noticias">
                      VER MÁS NOTICIAS</a></p>

                </div>
              </div>
            </div>

          </asp:Content>