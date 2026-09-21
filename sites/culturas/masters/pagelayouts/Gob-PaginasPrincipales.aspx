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


          <asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
            <SharePointWebControls:FieldValue id="PageTitle" FieldName="Title" runat="server" />
          </asp:Content>
          <asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">

            <div class="container-fluid"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px;">
              <div data-name="WebPartZone">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Full PAGE" ID="ContenedorFull">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>

            <div id="Zona1" class="container home-zona1">

              <div class="row">
                <div class="col-12 col-md-12 col-xl-6">
                  <WebPartPages:WebPartZone runat="server" Title="Contenedor Noticias" ID="ContentNews">
                    <ZoneTemplate></ZoneTemplate>
                  </WebPartPages:WebPartZone>
                </div>
                <div id="zonaDestacados" class="col-12 col-md-12 col-xl-6"
                  style="background-color: rgb(75, 60, 140); color: rgb(240, 248, 255)!important; font-palette:var(white);">
                  <WebPartPages:WebPartZone runat="server" Title="Contenedor Destacados" ID="ContentPrincipals">
                    <ZoneTemplate></ZoneTemplate>
                  </WebPartPages:WebPartZone>
                </div>
              </div>

            </div>

            <div id="Zona2" class="container home-zona2">
              <div class="row">
                <div id="zonatemas" class="col-12 col-md-12 home-temasinteres"
                  style="background-color: rgb(234, 234, 254); color: rgb(240, 248, 255)!important; font-palette:var(white);">
                  <WebPartPages:WebPartZone runat="server" Title="Contenedor Destacados" ID="ContentTemas">
                    <ZoneTemplate></ZoneTemplate>
                  </WebPartPages:WebPartZone>
                </div>
              </div>
            </div>


            <div id="Zona3" class="home-zona3"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px;">
              <div id="zonaagenda" class="home-agenda">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Agenda" ID="ContentAgenda">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>

            <div id="Zona4" class="home-zona4"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px;">
              <div id="zonagaceta" class="home-gaceta">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Gaceta" ID="Contentgaceta">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>


            <div id="Zona5" class="home-zona5"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px;">
              <div id="zonaconvocatorias" class="home-convocatorias">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Convocatorias" ID="Contentconvocatorias">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>


            <div id="Zona6" class="home-zona6"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px; background:#F2F0FB;">
              <div id="zonasistemas" class="home-sistemas">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Sistemas" ID="Contentsistemas">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>


            <div id="Zona7" class="home-zona7"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px;">
              <div id="zonaejes" class="home-ejes">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Redes" ID="Contentejes">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>


            <div id="Zona8" class="home-zona8"
              style="margin-left:0px;margin-right:0px;padding-left:0px;padding-right:0px;padding-top: 0px; background:#281E52;">
              <div id="zonaredes" class="home-redes">
                <WebPartPages:WebPartZone runat="server" Title="Contenedor Redes" ID="Contentredes">
                  <ZoneTemplate></ZoneTemplate>
                </WebPartPages:WebPartZone>
              </div>
            </div>

            <div class="container-fluid">
              <!---->
              <WebPartPages:WebPartZone runat="server" Title="Contenedor Arriba" ID="Contenedor1">
                <ZoneTemplate></ZoneTemplate>
              </WebPartPages:WebPartZone>
              <WebPartPages:WebPartZone runat="server" Title="Contenedor Medio" ID="Contenedor2">
                <ZoneTemplate></ZoneTemplate>
              </WebPartPages:WebPartZone>
              <WebPartPages:WebPartZone runat="server" Title="Contenedor Abajo" ID="Contenedor3">
                <ZoneTemplate></ZoneTemplate>
              </WebPartPages:WebPartZone>
            </div>


          </asp:Content>