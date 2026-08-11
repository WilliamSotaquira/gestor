/**
 * Genera el .aspx para un archivo CMS suelto de culturas.
 * Uso: node scripts/build-aspx-single.js <nombre-sin-extension>
 * Ejemplo: node scripts/build-aspx-single.js escenario-del-mundo
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const [,, name] = process.argv;

if (!name) {
  console.error('Uso: node scripts/build-aspx-single.js <nombre>');
  process.exit(1);
}

const sourceFile = resolve(process.cwd(), 'sites', 'culturas', 'cms', `${name}.html`);
const outputDir = resolve(process.cwd(), 'dist', 'culturas', 'cms');
const outputFile = resolve(outputDir, `${name}.aspx`);

if (!existsSync(sourceFile)) {
  console.error(`No existe: ${sourceFile}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

// Leer contenido HTML con encoding UTF-8
const htmlContent = readFileSync(sourceFile, 'utf-8');

// Construir el .aspx con la directiva de SharePoint y estructura correcta
const aspxContent = `<%@ Page Language="C#" AutoEventWireup="true" %>
<!DOCTYPE html>
<html lang="es" xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>#Colombia Escenario del Mundo</title>
<meta name="description" content="Escenario del Mundo - Culturas, artes y saberes en movimiento.">
<!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef,Comments,PublishingStartDate,PublishingExpirationDate,PublishingContactEmail,PublishingContactName,PublishingContactPicture,PublishingPageLayout,PublishingVariationGroupID,PublishingVariationRelationshipLinkFieldID,PublishingRollupImage,Audience,PublishingIsFurlPage,PublishingPageImage,PublishingPageContent,SummaryLinks,SummaryLinks2,SeoBrowserTitle,SeoMetaDescription,SeoKeywords,RobotsNoIndex"><xml><mso:CustomDocumentProperties><mso:PublishingPageContent msdt:dt="string"></mso:PublishingPageContent><mso:PublishingIsFurlPage msdt:dt="string">0</mso:PublishingIsFurlPage><mso:PublishingPageImage msdt:dt="string"></mso:PublishingPageImage><mso:SummaryLinks msdt:dt="string">&lt;div title=&quot;_schemaversion&quot; id=&quot;_3&quot;&gt;&lt;div title=&quot;_view&quot;&gt;&lt;span title=&quot;_columns&quot;&gt;1&lt;/span&gt;&lt;span title=&quot;_linkstyle&quot;&gt;&lt;/span&gt;&lt;span title=&quot;_groupstyle&quot;&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;</mso:SummaryLinks><mso:PublishingRollupImage msdt:dt="string"></mso:PublishingRollupImage><mso:Audience msdt:dt="string"></mso:Audience><mso:PublishingContactPicture msdt:dt="string"></mso:PublishingContactPicture><mso:SummaryLinks2 msdt:dt="string">&lt;div title=&quot;_schemaversion&quot; id=&quot;_3&quot;&gt;&lt;div title=&quot;_view&quot;&gt;&lt;span title=&quot;_columns&quot;&gt;1&lt;/span&gt;&lt;span title=&quot;_linkstyle&quot;&gt;&lt;/span&gt;&lt;span title=&quot;_groupstyle&quot;&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;</mso:SummaryLinks2><mso:ContentTypeId msdt:dt="string">0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF390064DEA0F50FC8C147B0B6EA0636C4A7D400CF70C6D52D94604DB591A9EE76D8832C</mso:ContentTypeId><mso:PublishingContactName msdt:dt="string"></mso:PublishingContactName><mso:Comments msdt:dt="string"></mso:Comments><mso:PublishingContactEmail msdt:dt="string"></mso:PublishingContactEmail></mso:CustomDocumentProperties></xml></SharePoint:CTFieldRefs><![endif]-->
</head>
<body>
${htmlContent}
</body>
</html>`;

// Escribir con BOM UTF-8 para garantizar tildes en SharePoint/IIS
const bom = '\ufeff';
writeFileSync(outputFile, bom + aspxContent, 'utf-8');

console.log(`✅ Generado: dist/culturas/cms/${name}.aspx`);
console.log('   Formato: SharePoint Publishing Page con CTFieldRefs');
console.log('   Encoding: UTF-8 con BOM');
