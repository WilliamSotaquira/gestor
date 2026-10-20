(function () {
  "use strict";

  /* ============================================================
   * Invitados del Primer Congreso Nacional e Internacional de
   * Investigación Artística — render por JS externo.
   *
   * Script de navegador CLÁSICO: sin import/export ni type=module.
   * El portal (SharePoint) SÍ ejecuta este <script src> externo,
   * pero BLOQUEA <style>, CSS de CDN y clases govco; por eso los
   * estilos se inyectan en runtime con document.createElement('style').
   *
   * Frontera texto/HTML (documentada por decisión de diseño):
   *   - texto plano  -> textContent : nombre, etiquetaCard, alt
   *   - HTML verbatim -> innerHTML  : bio[], ponencia.titulo,
   *                                    ponencia.parrafos[]
   *     (contienen <em> y entidades &#160; que deben preservarse)
   *   - etiquetaFicha: el original trae "&#160;&#160;" al final. Para
   *     mantenerla fiel carácter por carácter se asigna por innerHTML
   *     (es contenido editorial sin interacción, controlado por el dato).
   * ============================================================ */

  var BASE = "/especiales/primer-congreso-nacional-internacional-investigacion-artistica/PublishingImages/invitados/congreso/";
  var BASE_ACADEMICO = "/especiales/primer-congreso-nacional-internacional-investigacion-artistica/PublishingImages/invitados/academico/";
  var BASE_POSTERES = "/especiales/primer-congreso-nacional-internacional-investigacion-artistica/PublishingImages/invitados/posteres/";
  var BASE_PONENCIAS = "/especiales/primer-congreso-nacional-internacional-investigacion-artistica/PublishingImages/invitados/ponencias/";

  /* MAPA DE EJES TEMÁTICOS
   * Cada invitado referencia un eje por su clave (campo `eje`). Aquí se define
   * el nombre visible y el color de la etiqueta. Los colores son tonos oscuros
   * para que el texto BLANCO encima cumpla contraste AA (>= 4.5:1), según la
   * regla de accesibilidad del repo. Un invitado sin `eje` (p. ej. comité
   * académico) simplemente no muestra etiqueta de eje. */
  var EJES = {
    "estado-cuestion":        { nombre: "Estado de la cuestión",            color: "#0943B5" },
    "justicia-epistemica":    { nombre: "Justicia epistémica / Ética",      color: "#6A1B9A" },
    "cuerpos-movimiento":     { nombre: "Cuerpos, movimiento y afectos",    color: "#AD1457" },
    "economias-culturales":   { nombre: "Economías culturales",            color: "#00695C" },
    "perspectivas-ecologicas":{ nombre: "Perspectivas ecológicas",          color: "#2E7D32" },
    "inteligencia-relacional":{ nombre: "Inteligencia relacional",          color: "#1565C0" },
    "artes-culturas-memoria": { nombre: "Artes, culturas y memoria",        color: "#B23A00" },
    "conocimiento-sensible":  { nombre: "Conocimiento sensible",            color: "#4527A0" },
    "pedagogias-situadas":    { nombre: "Pedagogías situadas",              color: "#00838F" },
    "curadurias-criticas":    { nombre: "Curadurías críticas",              color: "#C2185B" },
    "archivo-memoria-viva":   { nombre: "Archivo y memoria viva",           color: "#5D4037" }
  };

  /* 1) DATOS — internacional (6) -> nacional (33, incluye los 3 que antes
   *    eran "moderacion") -> academico (8) -> posteres (11) -> ponencias (15). */
  const INVITADOS = [
    /* ---------- INTERNACIONALES (6) ---------- */
    {
      slug: "lara-lookabaugh",
      eje: "archivo-memoria-viva",
      categoria: "internacional",
      nombre: "Lara Lookabaugh",
      etiquetaFicha: "Invitada internacional · Estados Unidos&#160;&#160;",
      etiquetaCard: "Internacional · Estados Unidos",
      foto: BASE + "lara-lookabaugh.jpg",
      alt: "Retrato de Lara Lookabaugh",
      bio: [
        "Lara Lookabaugh es bibliotecaria y curadora de estudios latinoamericanos, ibéricos y latinx en las Bibliotecas de la Universidad de Vanderbilt. Es una geógrafa feminista interdisciplinaria especializada en la memoria y los futuros políticos; su agenda de investigación se centra en un trabajo de memoria colaborativo y basado en las artes con un colectivo de mujeres mayas mam en Guatemala, así como en el examen de las políticas temporales de los archivos.&#160;&#160;",
        "Su trabajo busca comprender cómo las comunidades de América Latina y el sur de Estados Unidos imaginan y construyen futuros alternativos en el contexto de la colonización, el capitalismo neoliberal y los regímenes políticos cambiantes. Es miembro fundador del colectivo editorial y de escritura Desirable Futures.&#160;&#160;",
        "Posee un doctorado en Geografía por la Universidad de Carolina del Norte en Chapel Hill, una maestría en Estudios Latinoamericanos por la Universidad de Florida y una maestría en Bibliotecología y Ciencias de la Información por la Universidad Estatal de Florida.&#160;&#160;"
      ]
    },
    {
      slug: "monique-martinez-thomas",
      eje: "pedagogias-situadas",
      categoria: "internacional",
      nombre: "Monique Martínez Thomas",
      etiquetaFicha: "Invitada internacional · Francia&#160;&#160;",
      etiquetaCard: "Internacional · Francia",
      foto: BASE + "monique-martinez.jpg",
      alt: "Retrato de Monique Martínez Thomas",
      bio: [
        "Monique Martínez Thomas es profesora en la Universidad Toulouse Jean Jaurès en Francia. Especialista en teatro, cine y literatura en lengua española, ha desarrollado desde 1988 una intensa labor de difusión del teatro contemporáneo en lengua española en Francia mediante la compañía Les Anachroniques, la colección teatral Nouvelles Scènes y una colección en Bélgica (Hispania).&#160;&#160;",
        "Ha creado y dirigido la Escuela Doctoral de Toulouse, que reúne 15 Escuelas Doctorales, y ha fundado dos redes nacionales. Dirigió el programa europeo TransMigrARTS, donde se desarrollaron metodologías de Investigación Creación Aplicada. Junto con Flore Garcin creó el primer Máster en Teatro Aplicado de Francia.&#160;&#160;",
        "Es profesora invitada en el doctorado de Investigación-Creación de la Universidad Distrital de Bogotá desde su creación. Ha sido distinguida como Caballera en la Orden Nacional del Mérito y Oficial de la Orden de las Palmas Académicas.&#160;&#160;"
      ]
    },
    {
      slug: "pedro-vilela",
      eje: "cuerpos-movimiento",
      categoria: "internacional",
      nombre: "Pedro Vilela",
      etiquetaFicha: "Invitado internacional · Brasil / Portugal&#160;&#160;",
      etiquetaCard: "Internacional · Brasil / Portugal",
      foto: BASE + "pedro-vilela.jpg",
      alt: "Retrato de Pedro Vilela",
      bio: [
        "Pedro Vilela (Recife, 1985) desarrolla su trayectoria científica y artística en las artes escénicas, articulando curaduría, creación escénica e investigación académica con un enfoque en el pensamiento descolonial, las políticas latinoamericanas y las cuestiones identitarias y raciales. Doctor en Educación Artística por la Universidad de Oporto y máster en Artes Escénicas por la Universidad Federal de Bahía, trabaja entre Brasil y Portugal.&#160;&#160;",
        "Dirige el Trema! Festival desde 2012 y fue programador de CRL – Central Eléctrica entre 2019 y 2025. En 2023 concibió el Quilombo_TREMA!, dedicado a artistas negros, racializados e indígenas. Fundador de TREMA! Revista, colabora con plataformas críticas transnacionales como Performing Borders.&#160;&#160;"
      ],
      ponencia: {
        titulo: "Ponencia: ¿Desde hace cuánto tiempo no estamos aquí?",
        parrafos: [
          "\n            <em>Notas sobre ausencia, ruina y reexistencia como prácticas de permanencia en las artes escénicas portuguesas</em>&#160;&#160;",
          "Esta intervención resulta de la reelaboración de una parte de la investigación desarrollada en la tesis doctoral del autor, en el marco de la Beca Magaly Muguercia del Programa Iberescena. Desde una perspectiva situada, interroga la permanencia de la colonialidad como régimen activo de organización del presente.&#160;&#160;",
          "El concepto de performar la ruptura constituye el eje central de la reflexión: una práctica corporal, temporal y política que interviene en las formas de ver, sentir, narrar y validar la experiencia histórica y social. Propone pensar la curaduría como una práctica de mediación, confrontación y reparación simbólica.&#160;&#160;"
        ]
      }
    },
    {
      slug: "julieta-infantino",
      eje: "conocimiento-sensible",
      categoria: "internacional",
      nombre: "Julieta Infantino",
      etiquetaFicha: "Invitada internacional · Argentina&#160;&#160;",
      etiquetaCard: "Internacional · Argentina",
      foto: BASE + "julieta-infantino.jpg",
      alt: "Retrato de Julieta Infantino",
      bio: [
        "Julieta Infantino es profesora, licenciada y doctora en Ciencias Antropológicas por la Facultad de Filosofía y Letras de la Universidad de Buenos Aires (UBA), donde también se desempeña como profesora de grado y posgrado. Es investigadora independiente del Consejo Nacional de Investigaciones Científicas y Técnicas (CONICET) y dirige proyectos de investigación en la UBA y el CONICET. Forma parte del Equipo de Antropología de la Cultura y el Patrimonio (EACUP) y de CircaInvestigAcción, Círculo de Investigación en Circo y Género.&#160;&#160;",
        "Sus líneas de investigación se vinculan con las prácticas artísticas populares, las políticas culturales y los procesos de politización de la cultura desde la antropología. Es especialista en los estudios de las artes del circo en Argentina y Latinoamérica, abordando sus dimensiones estéticas, identitarias y políticas. Entre sus publicaciones destacan \n            <em>El arte del circo en América del Sur</em> (2024), \n            <em>Pedagogías circenses</em> (2021) y \n            <em>Disputar la cultura. Arte y transformación social</em> (2019).&#160;&#160;"
      ],
      ponencia: {
        titulo: "Ponencia (Eje 3: Gobernanza y sostenibilidad cultural)",
        parrafos: [
          "La ponencia propone reflexionar sobre las formas en que las prácticas artísticas y los procesos de organización colectiva producen saberes situados capaces de incidir en la construcción, gestión y transformación de las políticas culturales, a partir de una trayectoria de investigación centrada en las artes circenses en Argentina y América Latina.&#160;&#160;",
          "El circo atraviesa un proceso de reactivación y diversificación en la escena cultural latinoamericana, ocupando plazas, calles, salas teatrales y espacios de enseñanza. La presentación ofrece un panorama sobre la constitución actual del campo circense en Latinoamérica y sobre los avances y limitaciones en las políticas públicas para el sector.&#160;&#160;"
        ]
      }
    },
    {
      slug: "martin-inthamoussu",
      eje: "economias-culturales",
      categoria: "internacional",
      nombre: "Martín Inthamoussu",
      etiquetaFicha: "Invitado internacional · Uruguay&#160;&#160;",
      etiquetaCard: "Internacional · Uruguay",
      foto: BASE + "martin-inthamoussu.jpg",
      alt: "Retrato de Martín Inthamoussu",
      bio: [
        "Martín Inthamoussu es gestor cultural, coreógrafo, docente e investigador uruguayo. Es doctorando en Desarrollo Inclusivo y Sostenible en la Universidad Loyola Andalucía y magíster en Comunicación y MBA por la Universidad Católica del Uruguay. Fue seleccionado como Yale World Fellow y realizó el programa de gestión de las artes del DeVos Institute.&#160;&#160;",
        "Actualmente es curador adjunto del Programa de Arte del Banco Mundial. Fue consultor del Banco Interamericano de Desarrollo y presidente del SODRE en Uruguay, y desarrolla su actividad docente en la Universidad Católica del Uruguay. Sus líneas de investigación articulan la cultura y el desarrollo sostenible en el MERCOSUR, las políticas culturales, la economía creativa y la gestión de las artes. Entre sus publicaciones destacan \n            <em>Políticas públicas para las industrias culturales y creativas: de la teoría a la práctica</em> (BID, 2024) e \n            <em>Industrias creativas y patrimonio: manual de políticas para la gestión sostenible</em> (BID, 2025).&#160;&#160;"
      ]
    },
    {
      slug: "pilar-riano-alcala",
      eje: "artes-culturas-memoria",
      categoria: "internacional",
      nombre: "Pilar Riaño Alcalá",
      etiquetaFicha: "Invitada internacional · Canadá&#160;&#160;",
      etiquetaCard: "Internacional · Canadá",
      foto: BASE + "pilar-riano-alcala.jpg",
      alt: "Retrato de Pilar Riaño Alcalá",
      bio: [
        "Pilar Riaño-Alcalá es profesora del Instituto de Justicia Social de la Universidad de Columbia Británica (Canadá) y codirectora de la Red Internacional de Memoria Transformativa. Es antropóloga y académica interdisciplinaria. Su investigación examina las experiencias humanas y no humanas de la violencia; los paisajes, las huellas y las prácticas cotidianas de la memoria y la reparación social; y las ecologías de la ausencia y la presencia.&#160;&#160;",
        "Es autora de \n            <em>Re-membering the Fragmented. Guerra, Memoria y Violencia en Colombia</em>; \n            <em>Avanzar a tientas: Memorias, violencias y producción de conocimiento</em>; y \n            <em>Jóvenes, memoria y violencia en Medellín. Una antropología del recuerdo y el olvido</em>, entre otros. Ha llevado a cabo una amplia labor de investigación colaborativa con diversas organizaciones sociales e iniciativas de memoria. Fue investigadora del Grupo de Memoria Histórica (2008-2013) y asesora del Museo de Memoria Histórica de Colombia (2015-2018).&#160;&#160;"
      ]
    },

    /* ---------- NACIONALES (27) ---------- */
    {
      slug: "blanca-botero",
      eje: "perspectivas-ecologicas",
      categoria: "nacional",
      nombre: "Blanca Botero",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "blanca-botero.jpg",
      alt: "Retrato de Blanca Botero",
      bio: [
        "Blanca Botero es artista visual interdisciplinar e investigadora en creación. Su práctica se articula en torno al dibujo expandido como herramienta de observación, conocimiento y traducción entre materia, territorio, memoria y tecnologías de percepción. Su trabajo surge de experiencias de campo en la Orinoquía y la Amazonía colombianas, los Everglades, el desierto del Sahara y el Altiplano Cundiboyacense.&#160;&#160;",
        "Es Maestra en Artes Plásticas, Electrónicas y del Tiempo de la Universidad de los Andes y LL.M. de la University of Virginia. Ha realizado residencias en AIRIE (Everglades National Park) y LABVERDE (Manaos). Su obra integra colecciones como Everglades National Park, el Congreso de la República de Colombia y FENALCO. Actualmente colabora como Artist for the Amazon.&#160;&#160;"
      ]
    },
    {
      slug: "carolina-chacon-bernal",
      eje: "curadurias-criticas",
      categoria: "nacional",
      nombre: "Carolina Chacón Bernal",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "carolina-chacon-bernal.jpg",
      alt: "Retrato de Carolina Chacón Bernal",
      bio: [
        "Curadora y docente. Magíster en Historia del Arte Contemporáneo y Cultura Visual de la Universidad Complutense (Madrid) y artista plástica de la Universidad Distrital Francisco José de Caldas. Su trabajo aborda la curaduría como una práctica performativa, de mediación y situada, desde perspectivas descoloniales del Sur.&#160;&#160;",
        "Fue curadora adjunta del Museo de Antioquia y co-curadora del 47 Salón Nacional de Artistas de Colombia: Kauka, Asamblea de mundos posibles. Actualmente es profesora auxiliar de la Universidad Nacional de Colombia, Sede Medellín.&#160;&#160;"
      ]
    },
    {
      slug: "catalina-del-castillo-silva",
      eje: "cuerpos-movimiento",
      categoria: "nacional",
      nombre: "Catalina Del Castillo Silva",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "catalina-del-castillo.jpg",
      alt: "Retrato de Catalina Del Castillo Silva",
      bio: [
        "Artista escénica, docente e investigadora: su trabajo integra la somática, la danza contemporánea, el teatro físico y el circo. Profesora de tiempo completo en la Pontificia Universidad Javeriana desde 2009, ha sido directora del Departamento de Artes Escénicas y líder de investigación y creación.&#160;&#160;",
        "Su formación incluye una licenciatura en danza contemporánea, un MA en Performance Making del Goldsmiths College (University of London) y un Doctorado en Humanidades de la Universitat Pompeu Fabra. Obras como Feroz, Carmen Buffa, Hermana República y Planeta Rojo han recibido reconocimientos y becas del Ministerio de Cultura, Iberescena, Idartes y la Pontificia Universidad Javeriana.&#160;&#160;"
      ]
    },
    {
      slug: "eider-yangana",
      eje: "curadurias-criticas",
      categoria: "nacional",
      nombre: "Eider Yangana",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "eider-yangana.jpg",
      alt: "Retrato de Eider Yangana",
      bio: [
        "Maestro en Artes Plásticas de la Universidad del Cauca y Magíster en Estudios Interdisciplinarios del Desarrollo. Sus principales áreas de investigación-creación son las artes integradas. Su obra ha sido expuesta en La Cité Internationale des Arts (París), The Box Gallery (Los Ángeles) y Bienal Sur (Argentina), y en el Salón Nacional de Artistas.&#160;&#160;",
        "Es director de la plataforma Yanacroma, que moviliza procesos pedagógicos y de co-creación itinerantes teniendo como eje el cuerpo colectivo, con un programa de residencias en el Resguardo Yanakuna de Rioblanco Sotará, territorio al que pertenece el artista.&#160;&#160;"
      ]
    },
    {
      slug: "maria-teresa-garcia-schlegel",
      eje: "pedagogias-situadas",
      categoria: "nacional",
      nombre: "María Teresa García Schlegel",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "maria-teresa-garcia-schlegel.jpg",
      alt: "Retrato de María Teresa García Schlegel",
      bio: [
        "Bailarina del Ballet de Camagüey (Cuba) y del Ballet Nacional de Colombia. Directora de ARTBALLET (Bogotá) y Maestra Ilustre del Premio Compartir al Maestro 2005. Filósofa (Universidad de los Andes), Especialista en Gestión y Gerencia Cultural (Universidad del Rosario), Magíster en Docencia Universitaria (UPN) y Doctora en Antropología (Universidad Nacional).&#160;&#160;",
        "Co-creadora y maestra del Arte Danzario, la Maestría en Estudios Artísticos y el Doctorado en Estudios Artísticos de la Universidad Distrital Francisco José de Caldas, donde es profesora titular. Integra la Línea de Investigación en Estudios Críticos de las Corporeidades, Sensibilidades y Performatividades.&#160;&#160;"
      ]
    },
    {
      slug: "ramiro-osorio-fonseca",
      eje: "curadurias-criticas",
      categoria: "nacional",
      nombre: "Ramiro Osorio Fonseca",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "ramiro-osorio.jpg",
      alt: "Retrato de Ramiro Osorio Fonseca",
      bio: [
        "Ramiro Osorio Fonseca es maestro en Letras Españolas de la Universidad de Guanajuato, director y maestro de teatro que ha dirigido más de 30 obras, tanto clásicas como contemporáneas. Con una trayectoria de cinco décadas en la gestión y promoción cultural, ha liderado prestigiosos certámenes internacionales, destacándose como fundador y director del Festival Iberoamericano de Teatro de Bogotá y del Festival Internacional de Teatro de San José por la Paz en Costa Rica, además de dirigir el Festival Internacional Cervantino y el Gran Festival Ciudad de México.&#160;&#160;",
        "En el ámbito público e institucional se desempeñó como el primer ministro de Cultura de Colombia, tras haber sido director general de Colcultura, embajador en México y asesor del presidente de la República en la Ley General de Cultura. Fue director de Cultura de la Secretaría General Iberoamericana en Madrid —donde impulsó la creación de programas multilaterales como Iberescena e Ibermuseos— y, desde 2010, ejerce como director general del Teatro Mayor Julio Mario Santo Domingo en Bogotá.&#160;&#160;",
        "Su perfil se complementa con una amplia labor académica, ensayística y de consultoría para organismos internacionales como la UNESCO, la OEI y el BID, así como con la docencia de cátedra en universidades de México y Colombia. Ha recibido elevadas condecoraciones nacionales e internacionales, entre ellas la Gran Cruz de la Orden de Boyacá, la Legión de Honor de Francia, la Orden de Isabel la Católica de España y un Doctorado Honoris Causa de la Universidad Soka de Japón.&#160;&#160;"
      ]
    },
    {
      slug: "ritzy-medina-cuentas",
      eje: "justicia-epistemica",
      categoria: "nacional",
      nombre: "Ritzy Katherine Medina Cuentas",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "ritzy-medina.jpg",
      alt: "Retrato de Ritzy Katherine Medina Cuentas",
      bio: [
        "Antropóloga de la Universidad de Caldas, con formación en Desarrollo y Cultura y en Educación. Su trayectoria se ha desarrollado en torno a la investigación sobre cultura, territorio, memoria, identidad y saberes comunitarios, con especial interés en el Caribe colombiano y las poblaciones afrodescendientes.&#160;&#160;",
        "Es fundadora de la Fundación Cultural Orígenes y creadora de Libro Playa: un mar de saberes, experiencia de lectura infantil desarrollada en las playas de Tolú, orientada al reconocimiento de saberes locales y al autorreconocimiento étnico y cultural de niñas y niños.&#160;&#160;"
      ]
    },
    {
      slug: "sandra-camacho-lopez",
      eje: "pedagogias-situadas",
      categoria: "nacional",
      nombre: "Sandra Camacho López",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "sandra-camacho-lopez.jpg",
      alt: "Retrato de Sandra Camacho López",
      bio: [
        "Artista escénica e investigadora docente vinculada a la Facultad de Artes de la Universidad de Antioquia. Realizó su estancia postdoctoral en el laboratorio LLA-CRÉATIS de la Universidad de Toulouse. Es Doctora y Magíster en Teatro y Artes del Espectáculo de la Universidad Sorbonne-Nouvelle (París 3) y Maestra en Artes Escénicas de la Facultad de Artes ASAB.&#160;&#160;",
        "Sus intereses por las dramaturgias contemporáneas y la investigación-creación se han encaminado por temas como lo trágico, el desarraigo, la migración y la memoria. Fue investigadora del proyecto TransMigrARTS. Ha publicado libros como Poéticas del desarraigo y artículos en revistas como Calle 14 y Corpo-Grafías.&#160;&#160;"
      ]
    },
    {
      slug: "alvaro-hernandez",
      eje: "pedagogias-situadas",
      categoria: "nacional",
      nombre: "Álvaro Hernández",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "alvaro-hernandez.jpg",
      alt: "Retrato de Álvaro Hernández",
      bio: [
        "Profesor de la Facultad de Artes ASAB de la Universidad Distrital, en los programas de Artes Escénicas, la Maestría y el Doctorado en Estudios Artísticos. Director del grupo Dramaturgias del Cuerpo y Escrituras del Espacio y director artístico de Entrópico Teatro. Doctor en Estudios del Performance por la Universidad de California, Davis.&#160;&#160;",
        "Investiga modos de hacer ecológicos que involucran sensorios otros que humanos frente a la crisis ecológica. Fue investigador principal del proyecto RISE TransmigrArts (2021-2025) y dirige Prácticas artísticas para una Colombia más que humana. Coordina el programa de Artes Escénicas de la Facultad de Artes ASAB.&#160;&#160;"
      ]
    },
    {
      slug: "oscar-hernandez-salgar",
      eje: "inteligencia-relacional",
      categoria: "nacional",
      nombre: "Óscar Hernández Salgar",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "oscar-hernandez-salgar.jpg",
      alt: "Retrato de Óscar Hernández Salgar",
      bio: [
        "Maestro en Música, Magíster en Estudios Culturales y Doctor en Ciencias Sociales y Humanas por la Pontificia Universidad Javeriana. Ganador del Premio de Musicología Casa de las Américas 2014 con el libro Los mitos de la música nacional.&#160;&#160;",
        "Fue miembro de la Mesa de Investigación-Creación del Ministerio de Ciencia, Tecnología e Innovación (2013-2024). En 2026 publicó El fin de la técnica. Ensayos sobre cultura e inteligencia artificial. Actualmente es director del Instituto de Estudios Sociales y Culturales Pensar de la Universidad Javeriana.&#160;&#160;"
      ]
    },
    {
      slug: "gabriel-velez",
      eje: "estado-cuestion",
      categoria: "nacional",
      nombre: "Gabriel Vélez",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "gabriel-velez.jpg",
      alt: "Retrato de Gabriel Vélez",
      bio: [
        "Gabriel Mario Vélez es artista, docente universitario e investigador. Docente de la Facultad de Artes de la Universidad de Antioquia y líder del grupo de investigación de Teoría, Práctica e Historia del Arte en Colombia. Sus proyectos artísticos han sido expuestos en distintos eventos de alcance nacional e internacional, entre ellos Transeúntes Medellín. Entre sus publicaciones se pueden mencionar los libros \n            <em>La Fotografía como Dispositivo Mágico</em>, publicado en Medellín, y \n            <em>La Huella Digital. Del Efecto Sujeto en la Génesis Digital</em>, publicado en Córdoba, Argentina.&#160;&#160;",
        "Entre 2016 y 2025 ejerció como decano de la Facultad de Artes de la Universidad de Antioquia. Actualmente se desempeña como presidente de la Asociación Colombiana de Facultades de Arte y es uno de los comisionados de la Sala Conaces de Arte y Humanidades del Ministerio de Educación. Su más reciente exposición se realizó en São Paulo (Brasil) con el proyecto Transeuntis Mundi, en colaboración con la artista brasileña Cândida Borges.&#160;&#160;"
      ]
    },
    {
      slug: "pedro-pablo-gomez",
      eje: "justicia-epistemica",
      categoria: "nacional",
      nombre: "Pedro Pablo Gómez",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "pedro-pablo-gomez.jpg",
      alt: "Retrato de Pedro Pablo Gómez",
      bio: [
        "Es doctor en Estudios Culturales Latinoamericanos por la Universidad Andina Simón Bolívar, sede Ecuador; magíster en Filosofía por la Pontificia Universidad Javeriana y maestro en Bellas Artes por la Universidad Nacional de Colombia. Es docente titular en la Facultad de Artes ASAB de la Universidad Distrital Francisco José de Caldas, en Bogotá, donde ejerce la cátedra en Artes Plásticas y Visuales, en la Maestría y el Doctorado en Estudios Artísticos, y dirige el grupo de investigación «Poiesis XXI». Es docente invitado en varias universidades de Colombia y de América Latina, y ha participado como jurado de tesis de maestría y doctorado en México, Ecuador y Brasil.&#160;&#160;",
        "Entre sus publicaciones se encuentran los libros \n            <em>El surrealismo: pensamiento del objeto y construcción de mundo</em>; \n            <em>Avatares de la investigación-creación</em>; \n            <em>Arte y etnografía</em>; \n            <em>La investigación en Arte y el Arte como investigación</em>; \n            <em>Estéticas y opción decolonial</em>; \n            <em>Estéticas fronterizas</em> y \n            <em>Reconstitución estética decolonial</em>, este último en coautoría con Walter Mignolo. Su actividad artística incluye curadurías y exposiciones individuales y colectivas. Es director de Calle14, revista de investigación sobre arte, coordinador del Doctorado en Estudios Artísticos y editor de la revista \n            <em>Estudios artísticos: revista de investigación creadora</em>.&#160;&#160;"
      ]
    },
    {
      slug: "tania-delgado",
      eje: "justicia-epistemica",
      categoria: "nacional",
      nombre: "Tania Delgado",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "tania-delgado.jpg",
      alt: "Retrato de Tania Delgado",
      bio: [
        "Consultora con amplia experiencia en el diseño, gestión y evaluación de iniciativas que promueven la generación, circulación y apropiación social del conocimiento a través de la Investigación + Creación. Su trayectoria integra el trabajo con comunidades académicas, artísticas y creativas en procesos de cocreación, así como la formulación e implementación de políticas e instrumentos para fortalecer el sector creativo y cultural.&#160;&#160;",
        "En los sectores público y privado ha impulsado el posicionamiento de las prácticas y oficios de la creación como formas de experimentación, indagación y pensamiento que, integradas a la investigación, generan conocimiento capaz de trascender el contexto académico. Fue representante nacional de la Red Académica de Diseño en la Mesa de Investigación + Creación de Colciencias, un espacio que posicionó la Creación Artística en el Sistema Nacional de Ciencia, Tecnología e Innovación. Es editora académica del libro \n            <em>Ética en la creación: hacia una práctica íntegra y responsable</em>.&#160;&#160;"
      ]
    },
    {
      slug: "carlos-sepulveda",
      eje: "justicia-epistemica",
      categoria: "nacional",
      nombre: "Carlos Sepúlveda",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "carlos-sepulveda.jpg",
      alt: "Retrato de Carlos Sepúlveda",
      bio: [
        "Profesor de la Licenciatura en Artes Escénicas, con espacios en la Maestría en Artes, Educación y Cultura y en el Doctorado Interinstitucional en Educación. Doctor en Filosofía con distinción Magna Cum Laude, magíster en Teatro y Artes Vivas, especialista en Educación Artística, con pregrados en Dirección Escénica y Filosofía y Licenciatura en Educación Artística.&#160;&#160;",
        "Artista escénico de amplia trayectoria que ha concebido su trabajo creativo de manera integral e interdisciplinaria, articulando la creación con una investigación teórica y pedagógica permanente y reconociendo que el teatro contemporáneo se cruza con el diseño sonoro, plástico y visual, el cine, la danza y las nuevas tecnologías. Es parte del equipo que fundó el Teatro Occidente. Su trabajo se ha centrado en la dirección de al menos 70 montajes de diversos autores, géneros y momentos de la historia del teatro.&#160;&#160;",
        "Ha sido profesor universitario en pregrado y posgrado durante más de 25 años en diversas instituciones. Su investigación se ha centrado en las poéticas teatrales contemporáneas y en la relación entre arte y política.&#160;&#160;"
      ]
    },
    {
      slug: "juan-alejandro-chindoy",
      eje: "justicia-epistemica",
      categoria: "nacional",
      nombre: "Juan Alejandro Chindoy",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "juan-alejandro-chindoy.jpg",
      alt: "Retrato de Juan Alejandro Chindoy",
      bio: [
        "Ph.D. en Filosofía y Máster en Filosofía por la Southern Illinois University, Carbondale (Estados Unidos), y profesional en Filosofía y Letras por la Universidad de Caldas, Manizales. Fue asistente posdoctoral en el Departamento de Filosofía de la Universidad de los Andes y actualmente es profesor asistente de tiempo completo en el Departamento de Filosofía de la Universidad Nacional de Colombia, sede Bogotá.&#160;&#160;",
        "Ha sido profesor de filosofía en distintas universidades de Colombia, principalmente en las áreas de filosofía política, derecho y filosofía latinoamericana, como integrante del pueblo indígena kamëntšá, tanto en Sibundoy como en Bogotá. Su más reciente libro, lanzado en la Feria del Libro de Bogotá 2026, se titula \n            <em>Pensar desde Tierras Indígenas</em> y fue publicado por la editorial Herder de Barcelona. Antes había publicado el libro en inglés \n            <em>Time, Beauty and Spirit in Kamëntšá Culture</em> (2020).&#160;&#160;"
      ]
    },
    {
      slug: "consejo-ancestral-willka-yaku",
      eje: "perspectivas-ecologicas",
      categoria: "nacional",
      nombre: "Consejo Ancestral Willka Yaku",
      etiquetaFicha: "Colectivo · Nacional&#160;&#160;",
      etiquetaCard: "Colectivo · Nacional",
      foto: BASE + "consejo-ancestral-willka-yaku.jpg",
      alt: "Retrato del Consejo Ancestral Willka Yaku",
      bio: [
        "Colectivo artístico, curatorial y comunitario integrado por Eyder Fabio Calambás y Phuyu Uma Jennifer Ávila, que aborda la curaduría y la creación como herramientas situadas para la decolonialidad orgánica de la memoria, las luchas y los procesos creativos colectivos, mambeando la vida y sanando las heridas coloniales a través del tejido entre el ser humano y los ciclos de la Jallapamama Madre Tierra.&#160;&#160;",
        "Su trabajo curatorial e investigativo incluye hitos como la cocuraduría de la renovación del Museo del Oro Calima del Banco de la República, el equipo curatorial del 47 Salón Nacional de Artistas Kauka y del 18 Salón Regional de Artistas Pacífico, así como la curaduría con el Colectivo de Participación e Investigación Social CPAIS desde la verdad, memoria y resistencia del pueblo Nasa, y diversas asesorías para el Museo de Arte Moderno de Medellín. Como ponentes y creadores han expuesto en Berlín, Nueva York y Montreal, con obras en las colecciones del Museo de Arte Moderno La Tertulia de Cali, el Museo de Arte Moderno de Bucaramanga y el Museo de Bellas Artes de Montreal.&#160;&#160;",
        "Desde el territorio actúan como docentes solidarios en Ala Kusreik Ya Misak Universidad, en Wampia, y en la gestión cultural comunitaria en el Valle, Cauca y Putumayo, a través de mingas muralistas, celebraciones ancestrales andinas y recorridos territoriales en defensa del agua sagrada.&#160;&#160;"
      ]
    },
    {
      slug: "valentina-ruiz",
      eje: "inteligencia-relacional",
      categoria: "nacional",
      nombre: "Valentina Ruiz",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "valentina-ruiz.jpg",
      alt: "Retrato de Valentina Ruiz",
      bio: [
        "Valentina Ruíz es artista, docente, investigadora y curadora colombiana, con una década de trayectoria en el arte contemporáneo. Su práctica articula la investigación sobre el residuo de la imagen contemporánea mediante instalaciones, esculturas, objetos cinéticos, videoinstalaciones y estructuras proto y posfotográficas. Explora la relación entre la materia digital y la imagen física, abordando la degradación de los datos, la oxidación de los circuitos y la transformación de lo inmaterial en ceniza, pólvora, grasa, fuego y fantasmagorías.&#160;&#160;",
        "Es Magíster en Artes Plásticas, Electrónicas y del Tiempo por la Universidad de los Andes, con tesis meritoria y grado Cum Laude (2022), y Maestra en Artes Plásticas por la Universidad Jorge Tadeo Lozano (2019). Es fundadora de Proyecto_555 junto con Juan David Mora Lozano. Su trayectoria incluye Artecámara-ARTBO, Galería Santa Fe, VOLTAJE, MAMU-El Parqueadero, Casa Hoffmann, Fragmentos y el Festival Internacional de la Imagen. En 2024 obtuvo el segundo lugar en el XI Premio Uniandino a las Artes.&#160;&#160;"
      ]
    },
    {
      slug: "edgar-puentes",
      eje: "inteligencia-relacional",
      categoria: "nacional",
      nombre: "Edgar Puentes",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "edgar-puentes.jpg",
      alt: "Retrato de Edgar Puentes",
      bio: [
        "Edgar Leonardo Puentes es un perfil multidisciplinar que integra arte, ciencia, tecnología y educación. Es licenciado en Pedagogía Musical, pianista, compositor e ingeniero de sonido, con formación en programación, neurociencia y gestión directiva. A lo largo de su trayectoria ha liderado iniciativas transdisciplinares de gran impacto nacional e internacional, entre ellas la coordinación del Foco de Industrias Creativas y Culturales en la Misión Internacional de Sabios (2019) y su labor en la Orquesta Filarmónica de Bogotá durante más de 29 años, donde concibió el «Concierto Cerebro» junto a Rodolfo Llinás y dirigió el programa \n            <em>Construcción de Comunidad</em>.&#160;&#160;",
        "Su trabajo ha sido pionero en el desarrollo de metodologías de aprendizaje y de políticas públicas, en articulación con entidades como el Ministerio de Ciencias, el Ministerio de Educación y diversas universidades internacionales. Como pedagogo e investigador cocreó la Maleta Pedagógica «Viajeros de la Música» e impulsó proyectos de experimentación sonora con tecnologías no convencionales, posicionándose como un referente en la integración del patrimonio cultural y el conocimiento científico en Colombia.&#160;&#160;"
      ]
    },
    {
      slug: "eliecer-arenas",
      eje: "inteligencia-relacional",
      categoria: "nacional",
      nombre: "Eliécer Arenas",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "eliecer-arenas.jpg",
      alt: "Retrato de Eliécer Arenas",
      bio: [
        "Eliecer Arenas Monsalve es profesor de planta e investigador en la Universidad Pedagógica Nacional, con una destacada trayectoria dedicada a profundizar en las relaciones entre la música, la cultura y la educación en Colombia. Cuenta con estudios avanzados en Antropología Social en la Universidad Complutense de Madrid, así como formación en Psicología (Pontificia Universidad Javeriana) y en Pedagogía Musical. Actualmente adelanta su Doctorado Interinstitucional en Educación y orienta sus búsquedas hacia una educación musical centrada en el cuidado, el empoderamiento y el desarrollo de las capacidades del músico.&#160;&#160;",
        "A lo largo de su carrera ha sido conferencista principal en múltiples congresos nacionales e internacionales de educación y música, y participó como relator académico en la Misión Internacional de Sabios de 2019, en el foco de Industrias Culturales y Creativas. Es miembro del grupo de investigación Cuestionarte (Categoría A en el Ministerio de Ciencias), coautor de diversas publicaciones sobre música popular, políticas y memorias culturales en Bogotá, y cofundador de Sonido Colectivo, una comunidad de conocimiento dedicada a reflexionar sobre la función social de la música.&#160;&#160;"
      ]
    },
    {
      slug: "camila-camacho",
      eje: "artes-culturas-memoria",
      categoria: "nacional",
      nombre: "Camila Camacho",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "camila-camacho.jpg",
      alt: "Retrato de Camila Camacho",
      bio: [
        "Antropóloga, artista visual y documentalista. Su trabajo articula la investigación comunitaria, la creación audiovisual y la gestión cultural. Ha liderado y acompañado procesos de investigación y creación colectiva, de educación popular e incidencia política con comunidades, especialmente con mujeres diversas y en contextos rurales, en torno a temas como la memoria, los afectos, el género, el territorio y la representación.&#160;&#160;"
      ]
    },
    {
      slug: "victor-capador",
      eje: "artes-culturas-memoria",
      categoria: "nacional",
      nombre: "Víctor Capador",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "victor-capador.jpg",
      alt: "Retrato de Víctor Capador",
      bio: [
        "Profesional en psicología social, con posgrado en desarrollo integral de la infancia y la adolescencia, y trayectoria en investigación social, cultural y comunitaria en territorios afectados por el conflicto armado. Lidera el proyecto «Mapa de Sabedores de Expresiones Artísticas» del Ministerio de las Culturas, una apuesta por la identificación, visibilización y preservación del patrimonio cultural inmaterial y de los saberes asociados a diversas expresiones artísticas y comunitarias.&#160;&#160;",
        "Su experiencia articula la investigación cualitativa y cuantitativa, la lectura territorial, la sistematización y el análisis de experiencias, así como la documentación y la producción audiovisual. Ha participado en la dirección de documentales orientados a la construcción de memoria y a la visibilización de narrativas comunitarias. Sus líneas de interés comprenden la memoria social y cultural, el patrimonio inmaterial, el territorio y la comunidad, las expresiones artísticas, las narrativas audiovisuales, los derechos humanos, los enfoques diferenciales y la participación comunitaria.&#160;&#160;"
      ]
    },
    {
      slug: "paola-wilches",
      eje: "artes-culturas-memoria",
      categoria: "nacional",
      nombre: "Paola Wilches",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "paola-wilches.jpg",
      alt: "Retrato de Paola Wilches",
      bio: [
        "Antropóloga y Magíster en Estudios Políticos. Su vida profesional ha girado en torno a la educación, el arte y la diversidad cultural, a través de ejercicios de investigación, pedagogías diversas y propias, y aportes a políticas públicas como la Política de Cero a Siempre. Durante cuatro años se formó realizando etnografía con infancias, lo que le ha permitido profundizar en la observación, la escritura y el diálogo como formas de construcción de conocimiento. Ha realizado numerosos procesos de sistematización de proyectos artísticos, culturales y pedagógicos.&#160;&#160;",
        "Coordinó el Programa Nidos: Arte en Primera Infancia y fue consultora para Unicef en la creación de la Ruta Integral de Atención para la Primera Infancia en Emergencia. Su interés por la diversidad cultural y el arte la ha llevado a participar en procesos de construcción de conocimiento sobre formación musical y sobre la relación entre arte y paz, con el Ministerio de las Culturas, las Artes y los Saberes, en el Plan Nacional de Música para la Convivencia y en la coordinación del programa Artes y Saberes del PDET.&#160;&#160;"
      ]
    },
    {
      slug: "jaime-ceron-silva",
      eje: "curadurias-criticas",
      categoria: "nacional",
      nombre: "Jaime Cerón Silva",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "jaime-ceron-silva.jpg",
      alt: "Retrato de Jaime Cerón Silva",
      bio: [
        "Estudió artes plásticas en la Universidad Nacional de Colombia, donde cursó la Maestría en Historia y Teoría del Arte. Su trabajo se ha centrado en la docencia, la crítica, la curaduría, la investigación teórica y la gestión cultural desde 1994. Entre sus proyectos de investigación curatorial se destacan Materialismos - proyecto Pentágono (Ministerio de Cultura, 2000), MDE07 Espacios de Hospitalidad (2007), Casa de citas (2010), Pasado tiempo futuro, arte colombiano en el siglo XXI (Medellín, 2019), Humboldt, Traspasar el Mito (Quito, 2019), 46SNA Inaudito Magdalena (2022) y Bog25 Ensayos sobre la felicidad (2025).&#160;&#160;",
        "Entre sus publicaciones se destacan \n            <em>Desbordando la objetividad</em> (Fotográfica Bogotá, 2007), \n            <em>Doce artistas colombianos</em> (Enfoques, 2008), \n            <em>Contraindicaciones del discurso</em> (Errata 2, 2010), \n            <em>Sueños con Álvaro Barrios</em> (2011), \n            <em>Colombia y sus modernidades artísticas</em> (2016), \n            <em>El espectador como escritor</em> (Museo Nacional, 2017) y textos sobre Miler Lagos (2021) y Carlos Motta (2024). Actualmente es curador y crítico de arte independiente.&#160;&#160;"
      ]
    },
    {
      slug: "natalia-castellanos",
      eje: "archivo-memoria-viva",
      categoria: "nacional",
      nombre: "Natalia Castellanos",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "natalia-castellanos.jpg",
      alt: "Retrato de Natalia Castellanos",
      bio: [
        "Natalia Castellanos Camacho es maestra en música y magíster en Filosofía por la Pontificia Universidad Javeriana, y doctoranda en Formación en la Sociedad del Conocimiento de la Universidad de Salamanca. Su trayectoria académica y profesional se ha concentrado en la investigación en artes, la Investigación + Creación y la educación artística y cultural, con especial interés en las formas de producción, organización y circulación del conocimiento sensible. Ha trabajado en universidades como la PUJ, la Universidad Central y la UPN, el Ministerio de Ciencia, Tecnología e Innovación y el Ministerio de las Culturas, las Artes y los Saberes, liderando procesos de investigación, memoria social y gestión del conocimiento.&#160;&#160;",
        "Su trabajo reciente incorpora perspectivas de las humanidades digitales y la integración de sistemas de información para pensar los archivos, repositorios y observatorios no solo como dispositivos de conservación, sino también como espacios para relacionar memorias, saberes, prácticas y territorios. Es autora y editora académica de diversas publicaciones sobre investigación artística, música, educación y producción de conocimiento.&#160;&#160;"
      ]
    },
    {
      slug: "carlos-duenas",
      categoria: "nacional",
      nombre: "Carlos Dueñas",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "carlos-duenas.jpg",
      alt: "Retrato de Carlos Dueñas",
      bio: [
        "Licenciado en Pedagogía Musical por la Universidad Pedagógica Nacional y comunicador social-periodista por la Universidad Jorge Tadeo Lozano. Especialista en Comunicación-Educación y Magíster en Investigación en Problemas Sociales Contemporáneos de la Universidad Central. Docente en las áreas de la comunicación y las artes en pregrado y asesor de proyectos de grado en pregrado y maestría en las universidades Pedagógica Nacional, Javeriana, Jorge Tadeo Lozano y Politécnico Grancolombiano. Investigador en líneas de identidad, usos y consumos de medios y tecnologías de la información y la comunicación.&#160;&#160;",
        "Exdecano de la Facultad de Artes de la Universidad Pedagógica Nacional y director del Departamento de Educación Musical de la misma universidad. Es docente de planta en la Facultad de Comunicación Social de la Universidad Jorge Tadeo Lozano y asesor en Educación Artística de la Dirección de Artes del Ministerio de las Culturas, las Artes y los Saberes durante los últimos 11 años. Actualmente se desempeña como coordinador académico del Primer Congreso Nacional e Internacional de Investigación Artística. Cantante lírico, fue solista de la Fundación Arte Lírico (1993-2002), integrante del Conjunto Vocal Instrumental Impromptus de música andina colombiana y director del Grupo Lírico Fusión (2000-2002).&#160;&#160;"
      ]
    },
    {
      slug: "jeffrey-amador",
      eje: "archivo-memoria-viva",
      categoria: "nacional",
      nombre: "Jeffrey Amador",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "jeffrey-amador.png",
      alt: "Retrato de Jeffrey Amador",
      bio: [
        "Jeffrey Amador Carillo es tecnólogo en Producción Audiovisual Multimedia y estudiante de Administración Pública Territorial en la Escuela Superior de Administración Pública (ESAP). Su trayectoria profesional se ha construido en torno a la fotografía, el lenguaje audiovisual, la memoria social, el territorio y las historias de vida.&#160;&#160;",
        "Desde hace una década ha desarrollado una propuesta de cartografía social y audiovisual que sitúa a las personas en el centro para visibilizar sus entornos a través de sus relatos, saberes, oficios y vínculos con los lugares que habitan. Su trabajo busca visibilizar particularidades y realidades locales que suelen omitirse en las representaciones generales, las estadísticas o las agendas informativas, concibiendo su labor fundamentalmente como un ejercicio de escucha, aprendizaje y circulación de conocimientos que valoran el aporte de las comunidades en la construcción de la sociedad.&#160;&#160;"
      ]
    },
    {
      slug: "nubia-florez",
      eje: "conocimiento-sensible",
      categoria: "nacional",
      nombre: "Nubia Flórez",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "nubia-florez.png",
      alt: "Retrato de Nubia Leonor Flórez Forero",
      bio: [
        "Nubia Leonor Flórez Forero es antropóloga, investigadora y gestora cultural con más de 20 años de trayectoria. Formada en la Universidad Nacional de Colombia y con una maestría en Investigación Social Interdisciplinaria, concibe el cuerpo como un archivo vivo donde convergen memoria, identidad y creación, enfocándose en el Caribe colombiano. Ha ejercido como docente e investigadora en la Universidad del Atlántico, consolidando los estudios académicos en danza.&#160;&#160;",
        "En el sector público destacó en la Coordinación Nacional de Danza del Ministerio de Cultura, la dirección del Centro Cultural Jorge Eliécer Gaitán y la Jefatura de Formación del Instituto Distrital de Cultura y Turismo de Barranquilla. Autora de \n            <em>El cuerpo desatado</em> y líder del proyecto Archivos D, ha investigado la historiografía dancística regional y publicado sobre expresiones como el fandango y los bailes zapateados en Colombia. Su labor, respaldada por becas y ponencias internacionales en Madrid, Riverside (Los Ángeles) y Nueva York, le ha permitido posicionar la danza como espacio de resistencia y construcción de memoria.&#160;&#160;"
      ]
    },
    {
      slug: "adriana-gonzalez-hassig",
      eje: "economias-culturales",
      categoria: "nacional",
      nombre: "Adriana González Hassig",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "adriana-gonzalez-hassig.png",
      alt: "Retrato de Adriana González Hassig",
      bio: [
        "Profesional en cine y televisión y magíster en gestión audiovisual. Se ha desempeñado en la coproducción, el montaje financiero, la producción de contenidos, la planeación estratégica, la dirección de publicidad y la selección musical en proyectos de largometrajes en Colombia y Europa. Ha sido coordinadora del Grupo de Emprendimiento Cultural del Viceministerio de Creatividad y Economía Naranja de Colombia, jefe de Industrias Culturales y Creativas de la Cámara de Comercio de Bogotá, programadora del Festival Centro y gerente del Concurso Internacional de Violín de Bogotá. Actualmente es la Gerente de la Bienal de Arte y Ciudad que organiza la Secretaría de Cultura, Recreación y Deporte de Bogotá.&#160;&#160;"
      ]
    },
    {
      slug: "javier-machicado",
      eje: "economias-culturales",
      categoria: "nacional",
      nombre: "Javier Machicado",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "javier-machicado.png",
      alt: "Retrato de Javier Machicado",
      bio: [
        "Javier Machicado es economista de la Universidad de los Andes y magíster en Estudios Iberoamericanos de la Universidad París X–Nanterre. Es cofundador y director asociado de Lado B, economía creativa, y cuenta con más de 20 años de experiencia en investigación, consultoría y formulación de políticas y estrategias para el sector cultural y creativo.&#160;&#160;",
        "Su trayectoria se ha centrado en el análisis de las industrias culturales y creativas, con especial énfasis en sus dinámicas económicas, modelos de sostenibilidad, mercados, circulación y mecanismos de financiación. Sus líneas de investigación incluyen la economía de la cultura, las políticas públicas, el desarrollo de organizaciones culturales, la internacionalización y la evaluación de programas e instrumentos de fomento cultural.&#160;&#160;",
        "Ha dirigido investigaciones, evaluaciones y proyectos estratégicos para entidades como el Ministerio de Cultura, Proimágenes Colombia, la Organización Mundial de la Propiedad Intelectual (OMPI), el British Council, la UNESCO, Comfama y la Secretaría de Cultura de Bogotá.&#160;&#160;"
      ]
    },
    {
      slug: "wilfran-barrios",
      eje: "cuerpos-movimiento",
      categoria: "nacional",
      nombre: "Wilfran Barrios",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "wilfran-barrios.png",
      alt: "Retrato de Wilfran Barrios",
      bio: [
        "Licenciado en Educación Básica en Danza por la Universidad de Antioquia. Magíster en Estudios Teóricos de la Danza por la Universidad de las Artes ISA, Cuba. Su trabajo se ha caracterizado por la búsqueda constante de sus raíces afrocolombianas, lo que lo ha llevado a profundizar en diversas vertientes de la danza de nuestros litorales colombianos. Es director de la Corporación Cultural Atabaques de Cartagena y del colectivo Desaldabar, y cuenta con una amplia experiencia como maestro y coordinador en diversas instituciones y universidades, tanto privadas como públicas, nacionales e internacionales. Ha tenido una amplia participación como conferencista en seminarios y simposios. Asimismo, está comprometido con el trabajo popular y formativo junto a organizaciones sociales de sectores populares y ONG. Wilfran Barrios es reconocido por su trabajo de creación y producción, y es autor de un significativo repertorio de obras de danza afro contemporánea, como “Canto a la libertad”, “Homilía”, “Cuando alguien muere”, “Exilio”, “De piel a piel”, “El día es hoy”, “Revuelo”, “Animeros”, “Clasificadys”, “Mako: retorno sin fuego”, “Desalambrar”, “Azul” y “La tertulia”, entre otras. También es maestro asesor de las escuelas dotadas y comunitarias de danza en el país, dentro del programa Danza Viva y de la Expedición Sensorial de Montes de María del Ministerio de Cultura de Colombia (2013-2021), y es docente en el programa de Danza de la Universidad del Atlántico.&#160;&#160;"
      ]
    },

    /* ---------- MODERACIÓN — unificada con NACIONALES (3) ----------
     * Antes eran categoria:"moderacion" con sección propia. Se fusionaron
     * en "nacional" (los tres son colombianos); extranjeros habrían ido a
     * "internacional". La sección "Moderación" se retiró de index.html y del
     * array `categorias` del render. */
    {
      slug: "manuel-fernando-garcia-garcia",
      eje: "cuerpos-movimiento",
      categoria: "nacional",
      nombre: "Manuel Fernando García García",
      etiquetaFicha: "Invitado nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "manuel-garcia-conno.jpg",
      alt: "Retrato de Manuel Fernando García García",
      bio: [
        "Antropólogo y especialista en Educación Integral de la Universidad Nacional de Colombia, magíster en Estudios Artísticos de la Universidad Distrital Francisco José de Caldas y estudiante de doctorado en Artes de la Universidad de Antioquia. Desde 2016 es docente del Proyecto Curricular de Arte Danzario de la Facultad de Artes ASAB.&#160;&#160;",
        "Desde 2024 se desempeña como líder del componente de investigación del grupo de danza del Ministerio de las Culturas, las Artes y los Saberes. Dirige el GrupLAC de Investigación MOT y participa como coinvestigador en INNOVATEC (Minciencias).&#160;&#160;"
      ]
    },
    {
      slug: "olga-lucia-olaya-parra",
      eje: "conocimiento-sensible",
      categoria: "nacional",
      nombre: "Olga Lucía Olaya Parra",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "olga-lucia-olaya.jpg",
      alt: "Retrato de Olga Lucía Olaya Parra",
      bio: [
        "Licenciada en Bellas Artes, Especialista en Historia y Teoría del Arte, Especialista en Crítica del Arte y Magíster en Educación; realizó estudios doctorales en Ciencias del Arte. Asesora, consultora y conferencista internacional en educación artística desde 1985.&#160;&#160;",
        "Coordinó el equipo artístico-pedagógico del Proyecto Tejedores de Vida del Instituto Distrital de las Artes. Es miembro honorario del Consejo Latinoamericano de Educación por el Arte (CLEA). Actualmente acompaña la formulación de la política pública interministerial de la Ley 2555 de 2025, Artes al Aula.&#160;&#160;"
      ]
    },
    {
      slug: "ana-maria-arango",
      eje: "perspectivas-ecologicas",
      categoria: "nacional",
      nombre: "Ana María Arango",
      etiquetaFicha: "Invitada nacional&#160;&#160;",
      etiquetaCard: "Nacional",
      foto: BASE + "ana-maria-arango.jpg",
      alt: "Retrato de Ana María Arango",
      bio: [
        "Antropóloga de la Universidad de los Andes, DEA en Antropología Social de la Universidad de Barcelona, magíster en Gestión Cultural y estudiante del doctorado en Diseño, Arte y Ciencia de la Universidad Jorge Tadeo Lozano. Desde 2008 vive en el Chocó, donde se desempeña como investigadora de ASINCH y docente del programa de Educación Artística de la Universidad Tecnológica del Chocó. Allí mismo, en 2010, creó junto con Leonidas Valencia el centro de investigaciones «Corporaloteca».&#160;&#160;",
        "Entre sus libros e investigaciones se encuentran \n            <em>Velo qué bonito: prácticas sonoro-corporales de la primera infancia en poblaciones afrochocoanas</em> (2014), \n            <em>Renacientes: arte, verdad y reparación</em> (2017), \n            <em>Catiá, catiadora, cantos de río y selva</em> (2010), \n            <em>La Tambora Mágica: sentipensando la gestión cultural en el departamento del Chocó</em> (2022) y \n            <em>Cocorobé, cantos y arrullos del Pacífico colombiano</em> (Libro al Viento, IDARTES, 2013), entre otros.&#160;&#160;"
      ]
    },

    /* ---------- COMITÉ ACADÉMICO (8) ---------- */
    {
      slug: "lina-maria-villegas-hincapie",
      categoria: "academico",
      nombre: "Lina María Villegas Hincapié",
      etiquetaFicha: "Universidad de Antioquia&#160;&#160;",
      etiquetaCard: "Universidad de Antioquia",
      foto: BASE_ACADEMICO + "lina-maria-villegas-hincapie.jpg",
      alt: "Retrato de Lina María Villegas Hincapié",
      bio: [
        "Decana de la Facultad de Artes de la Universidad de Antioquia, docente de planta e integrante fundadora de la Licenciatura en Danza. Antropóloga (2000), Especialista en Artes (2005), Magíster en Dramaturgia y Dirección (2012, Tesis Meritoria) y Doctora en Artes (2024, Tesis Meritoria) por la UdeA. Integra los grupos de investigación \n            <em>Laboratorio de Investigación en Danza</em> y \n            <em>Artes Escénicas y del Espectáculo</em>. Ha liderado proyectos del área, ganando la Beca de Investigación de la Alcaldía de Medellín (2013), la Beca de Investigación en Danza del Ministerio de Cultura (2022) y la Beca de Investigación-Publicación de la Bienal de Danza de Cali (2022).&#160;&#160;",
        "En gestión académica, fue Coordinadora de Investigación de la Facultad de Artes (2012-2015 / 2023-2024), jefa del Departamento de Artes Escénicas, editora de la \n            <em>Colección de textos sobre pensamiento y creación en artes</em>, Par Académico del Ministerio de Educación Nacional y delegada de la ministra en el Consejo Nacional de Danza (2023-2025). Desde 2001 imparte docencia en pregrados de danza y teatro, así como en posgrados de Artes, Comunicaciones, y Motricidad y Desarrollo Humano.&#160;&#160;",
        "Como creadora e investigadora, ha organizado eventos académicos, participado como ponente y dirigido obras coreográficas (\n            <em>Enleche-ser</em>, \n            <em>Bálsamo</em>, \n            <em>Blanco sobre blanco</em>, \n            <em>Irene Calle/76</em>) y videodanzas (\n            <em>La Orilla</em>). Sus publicaciones abordan la creación en danza contemporánea, los registros, la investigación artística y la construcción de conocimiento.&#160;&#160;",
        "Entre sus proyectos de investigación se destacan: “Historia de la danza en Medellín en las décadas 70 y 80, y su influencia en la producción artística” (2013) en el marco de la Beca de Investigación de la Alcaldía de Medellín y CODI UdeA. De otra parte, \"Reelaboración y recontextualización de referentes simbólicos. Rituales de migrantes de la ciudad de Medellín” (2001), encabezado por el Instituto de Estudios Regionales. Además, entre sus publicaciones se subraya el libro “Relatos no contados. Historia de la danza en Medellín, 1930-1990\" (2023) o “A propósito de la dramaturgia para danza. Entrevista a Juliana Reyes” (2024).&#160;&#160;"
      ]
    },
    {
      slug: "eduardo-sanchez-medina",
      categoria: "academico",
      nombre: "Eduardo Sánchez Medina",
      etiquetaFicha: "Universidad de Antioquia&#160;&#160;",
      etiquetaCard: "Universidad de Antioquia",
      foto: BASE_ACADEMICO + "eduardo-sanchez-medina.jpg",
      alt: "Retrato de Eduardo Sánchez Medina",
      bio: [
        "Realizó estudios de actuación en la Escuela de Teatro de la Facultad de Artes de la Universidad de Antioquia (1983-1986). Es Director de Teatro Drama y Máster \n            <em>of Fine Arts</em> por el Instituto de Teatro, Música y Cinematografía «Cherkasov» de San Petersburgo, Rusia (1986-1992). Es Especialista en Dramaturgia (1999-2000), título obtenido con mención honorífica; Magíster en Dramaturgia y Dirección (2010-2012), con mención sobresaliente; y Doctor en Artes, graduado \n            <em>Summa cum laude</em> (2022), todos ellos estudios realizados en la Facultad de Artes de la Universidad de Antioquia.&#160;&#160;",
        "Es creador del laboratorio de creación e investigación \n            <em>Ópera Urbana</em> en Medellín (2005) y socio fundador del proyecto cultural \n            <em>Cruzando la Frontera</em>, dedicado al pensamiento y la dirección escénica. Actualmente se desempeña como docente titular del Departamento de Artes Escénicas de la Facultad de Artes de la Universidad de Antioquia.&#160;&#160;",
        "Es autor de diversos artículos y textos dramatúrgicos publicados en revistas y medios especializados como \n            <em>Paso de Gato</em> (México), \n            <em>Papel en Escena</em> (Cali), \n            <em>Gestus</em> (Bogotá) y \n            <em>A Teatro</em> (Medellín), entre otras publicaciones.&#160;&#160;"
      ]
    },
    {
      slug: "anibal-maldonado-currea",
      categoria: "academico",
      nombre: "Aníbal Maldonado Currea",
      etiquetaFicha: "Universidad del Atlántico&#160;&#160;",
      etiquetaCard: "Universidad del Atlántico",
      foto: BASE_ACADEMICO + "anibal-maldonado-currea.jpg",
      alt: "Retrato de Aníbal Maldonado Currea",
      bio: [
        "Artista visual y educador colombiano cuyo trabajo explora las intersecciones entre el dibujo y la pedagogía. Sus investigaciones y creaciones se caracterizan por su compromiso con la exploración del papel del arte en contextos sociales, haciendo hincapié en la importancia de las metodologías participativas y el poder transformador de la expresión creativa. Posee una maestría en Artes Visuales por la Universidad Nacional de Colombia, donde también cursó sus estudios de pregrado en Artes Plásticas, con especialización en historia y teoría del arte. Su práctica artística y académica profundiza en el potencial expresivo del dibujo, abordando a menudo temas como el espacio urbano, la memoria y la presencia del cuerpo en contextos públicos.&#160;&#160;"
      ]
    },
    {
      slug: "sonia-castillo-ballen",
      categoria: "academico",
      nombre: "Sonia Castillo Ballen",
      etiquetaFicha: "Universidad Distrital Francisco José de Caldas&#160;&#160;",
      etiquetaCard: "Universidad Distrital Francisco José de Caldas",
      foto: BASE_ACADEMICO + "sonia-castillo-ballen.jpg",
      alt: "Retrato de Sonia Castillo Ballen",
      bio: [
        "Es investigadora, artista y formadora en estudios feministas de la Eco performance, la acción plástica y los modos de los relacionamientos corporales sensibles y sintientes de lo viviente. Doctora en Ciencias del Arte, Historia, Teoría y Crítica. Profesora del Doctorado y la Maestría en Estudios Artísticos de la Universidad Distrital Francisco José de Caldas (UDFJC); dirige la Línea de Investigación en Estudios Críticos de las Corporeidades, las Sensibilidades y las Performatividades el Grupo de Investigación para la Creación Artística y el proyecto Escuela de Performance y Performatividades: Pasarela. Cocreadora de la Revista Corpo-Grafías; miembro del Comité Organizador de la Red Nacional del Giro Corporal y del Comité Académico de la Red Latinoamericana de Investigación De y Desde los Cuerpos. Responsable científico por la UDFJC del proyecto TransMigrARTS/UE.&#160;&#160;"
      ]
    },
    {
      slug: "claudia-salamanca",
      categoria: "academico",
      nombre: "Claudia Salamanca",
      etiquetaFicha: "Pontificia Universidad Javeriana&#160;&#160;",
      etiquetaCard: "Pontificia Universidad Javeriana",
      foto: BASE_ACADEMICO + "claudia-salamanca.jpg",
      alt: "Retrato de Claudia Salamanca",
      bio: [
        "Claudia Salamanca es artista visual y escritora, y crítica de arte, política, geografía geopolítica y nuevos medios. Actualmente es profesora asociada y decana de la Facultad de Artes de la Pontificia Universidad Javeriana, Colombia. Además, ha sido docente en la Universidad Jorge Tadeo Lozano, Arkansas State University y la Universidad Nacional de Colombia, y artista y docente invitada en la Universidad de Zúrich, el Instituto de Estudios Latinoamericanos, el ITESO, la Universidad Católica Portuguesa, la Pontificia Universidad Católica del Perú, la Universidad del Valle, la Universidad del Cauca y la Universidad de Nariño, en Colombia. Su interés académico se da en la intersección entre los estudios visuales y la teoría política, como, por ejemplo, el análisis de los modos de percepción y de puesta en escena del territorio colombiano en el marco del conflicto y del posconflicto colombianos, y del espíritu de la juventud en este mismo contexto desde un giro pedagógico.&#160;&#160;",
        "Como investigadora y creadora en la Pontificia Universidad Javeriana, examina la imagen operativa y el archivo como campos de disputa. Su obra explora cómo las narrativas visuales de la guerra configuran la memoria colectiva, cuestionando los mecanismos de administración de la violencia y la representación del trauma en el contexto latinoamericano contemporáneo. Como docente, está interesada en los procesos de escritura desde las artes y puede, desde ellos —siguiendo a Trinh T. Minh-ha—, surgir formas de creación que hablan con la imagen y no sobre ella. Es doctora en Filosofía en Retórica, con énfasis en Nuevos Medios, de la Universidad de California, Berkeley, y egresada de la Universidad de Rutgers, con una maestría en ciencia, tecnología y cultura, realizada con una beca Fulbright y con el apoyo de la Pontificia Universidad Javeriana.&#160;&#160;",
        "Ha sido beneficiaria en dos ocasiones de la beca de investigación curatorial Zona Centro, como co-curadora del 12.º y del 16.º Salón Regional de Artistas Zona Centro. Entre sus curadurías están los procesos de investigación en las artes visuales desde la academia, con la exposición “Artistas al Tablero” en el marco de la II Bienal de Arte y Creatividad, Universidad Javeriana (2016), y la más reciente, “Latitudes”, exposición de Rosario López, Clemencia Echeverri y Eulalia de Valdenebro (2020), entre otras. En 2014, mediante las Becas de Monografía de Artistas Colombianos otorgadas por el Ministerio de Cultura, escribió un libro sobre la obra del artista François Bucher y los fenómenos de percepción conocidos como apofenia y pareidolia. En el 2006 fue premiada con el IV Premio Ensayo Crítico, Histórico o Teórico, del IDCT, con el texto “Me veo y me reflejo, me ves y me refracto.” Su obra audiovisual se ha exhibido internacionalmente en Canadá, Estados Unidos, Alemania, España, Francia, Argentina, Suiza, Inglaterra y Brasil, entre otros, y también ha publicado en revistas académicas y ha desarrollado comisiones artísticas.&#160;&#160;"
      ]
    },
    {
      slug: "monica-marcell-romero-sanchez",
      categoria: "academico",
      nombre: "Mónica Marcell Romero Sánchez",
      etiquetaFicha: "Pontificia Universidad Javeriana&#160;&#160;",
      etiquetaCard: "Pontificia Universidad Javeriana",
      foto: BASE_ACADEMICO + "monica-marcell-romero-sanchez.jpg",
      alt: "Retrato de Mónica Marcell Romero Sánchez",
      bio: [
        "Artista, docente, investigadora, mamá. Doctora en Artes y Educación. Profesora de planta, actual Directora del Departamento Artes Visuales, Pontificia Universidad Javeriana (Bogotá). Se vincula a proyectos colaborativos de investigación/creación con artistas de distintas disciplinas abordando relaciones críticas y poéticas entre el arte, las comunidades, la educación y la gestión de los afectos, desde perspectivas no coloniales y feministas.&#160;&#160;",
        "Participa en redes de investigación que amplían, cuestionan y potencian las relaciones entre arte y educación: Another Roadmap School; Red ReSonar (Doctores en Artes y Educación) y KReporters en alianza con la Comisión Europea. Ha participado en el diseño e implementación de planes, proyectos y programas de política educativa y cultural como laboratorios de investigación-creación en artes visuales, el Plan Nacional de Educación Artística del Ministerio de Cultura y el actual Sistema de Formación Artística en el Distrito en Idartes.&#160;&#160;"
      ]
    },
    {
      slug: "carlos-alberto-vasquez-rodriguez",
      categoria: "academico",
      nombre: "Carlos Alberto Vasquez Rodríguez",
      etiquetaFicha: "Instituto Universitario de la Paz&#160;&#160;",
      etiquetaCard: "Instituto Universitario de la Paz",
      foto: BASE_ACADEMICO + "carlos-alberto-vasquez-rodriguez.jpg",
      alt: "Retrato de Carlos Alberto Vasquez Rodríguez",
      bio: [
        "Doctor en Gerencia de Proyectos Culturales, Magíster en Investigación Creación, Arte/Contexto, Especialista en Educación, Cultura y Política, Comunicador Social con énfasis en Comunicación Comunitaria y Licenciado en Educación Básica con énfasis en Educación Artística. Es docente universitario, investigador, director, escritor y jurado en eventos regionales y nacionales de danza, teatro y literatura.&#160;&#160;",
        "Su trayectoria docente y creativa se centra en la formación del actor-bailarín y en la investigación-creación con un profundo arraigo territorial. Ha liderado el rescate de las danzas tradicionales y cantos de tambora de los pueblos ribereños del río Magdalena, así como la reconstrucción de tradiciones centenarias como la fiesta del \n            <em>Corpus Christi</em> en San Vicente de Chucurí (cordillera de los Yariguíes).&#160;&#160;",
        "Cuenta con más de diez obras de creación escénica y cinco becas de investigación-creación del Ministerio de las Culturas, las Artes y los Saberes. Es autor de diversos textos y sistematizaciones sobre fiestas patronales, comparsas y saberes populares. Entre sus trabajos recientes de investigación-creación destaca la obra \n            <em>La Miguelina la forastera</em>, enfocada en explorar el universo simbólico y la memoria de las mujeres cantadoras del territorio.&#160;&#160;"
      ]
    },
    {
      slug: "leonidas-valencia-valencia",
      categoria: "academico",
      nombre: "Leonidas Valencia Valencia",
      etiquetaFicha: "Universidad Tecnológica del Chocó&#160;&#160;",
      etiquetaCard: "Universidad Tecnológica del Chocó",
      foto: BASE_ACADEMICO + "leonidas-valencia-valencia.jpg",
      alt: "Retrato de Leonidas Valencia Valencia",
      bio: [
        "Leonidas es músico, investigador, docente y gestor cultural chocoano, vinculado a la Universidad Tecnológica del Chocó Diego Luis Córdoba (UTCH), donde se desempeña en la Licenciatura en Educación Artística y participa en procesos académicos, curriculares y de investigación. Asimismo, desarrolla actividades de investigación, formación, documentación y salvaguardia cultural desde la Corporaloteca UTCH y la Asociación para las Investigaciones Culturales del Chocó (ASINCH).&#160;&#160;",
        "Sus principales líneas de investigación se centran en las músicas tradicionales del Pacífico colombiano, la chirimía chocoana, el patrimonio cultural y biocultural, la memoria musical afrocolombiana, la educación artística y los procesos de investigación-creación. Su trayectoria articula investigación académica, práctica musical, formación comunitaria y gestión del patrimonio.&#160;&#160;",
        "Entre sus trabajos editoriales se destacan estudios sobre la funcionalidad de las músicas, bailes y sonoridades del Pacífico colombiano, la influencia de instrumentos musicales africanos, la chirimía chocoana, la educación musical y la vida y obra de músicos representativos del Chocó.&#160;&#160;"
      ]
    },

    /* ---------- PÓSTERES (11) ---------- */
    /* NOTA DE FUENTE (para revisión humana): en el JSON origen, los autores
     * con id 1, 2 y 3 (Andrés Montoya-Tobón, Erika Imbett-Vargas y
     * Fausto Zuleta-Montoya) traen la observación: «El campo "Nombre del Autor"
     * de esta fila dice "Fausto Alonso Zuleta Montoya", aunque contiene tres
     * perfiles diferentes.» Se conservan los nombres tal cual vienen; no se
     * corrige ni se inventan datos. */
    {
      slug: "andres-montoya-tobon",
      categoria: "posteres",
      nombre: "Andrés Montoya-Tobón",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "andres-montoya-tobon.jpg",
      alt: "Fotografía de Andrés Montoya-Tobón",
      bio: [
        "Ingeniero de Diseño de Producto y Magíster en Ingeniería. Docente e investigador universitario enfocado en manufactura avanzada, diseño paramétrico, automatización y desarrollo tecnológico sostenible."
      ]
    },
    {
      slug: "erika-imbett-vargas",
      categoria: "posteres",
      nombre: "Erika Imbett-Vargas",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "erika-imbett-vargas.jpg",
      alt: "Fotografía de Erika Imbett-Vargas",
      bio: [
        "Ingeniera en Diseño Industrial, Magister en Estudios de CTS, Doctora en Complejidad. Jefa del Departamento de Diseño del ITM. Docente e investigadora en la Facultad de Artes y Humanidades. Actual vicepresidenta del consejo de la Red Académica de Diseño."
      ]
    },
    {
      slug: "fausto-zuleta-montoya",
      categoria: "posteres",
      nombre: "Fausto Zuleta-Montoya",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "fausto-zuleta-montoya.jpg",
      alt: "Fotografía de Fausto Zuleta-Montoya",
      bio: [
        "Diseñador Industrial, PhD en Bioingeniería, Magíster en Ingeniería de Diseño, Especialista en Ergonomía; docente investigador enfocado en ingeniería de productos y materiales. Ha sido representante de Ministerio de Ciencias y MinCIT como delegado de la Red Académica de Diseño. Experiencia en la planificación y ejecución de proyectos en diversos campos disciplinares, especialmente en Investigación+Creación."
      ]
    },
    {
      slug: "maria-angelica-manosalva-sandoval",
      categoria: "posteres",
      nombre: "María Angélica Manosalva Sandoval",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "maria-angelica-manosalva-sandoval.jpg",
      alt: "Fotografía de María Angélica Manosalva Sandoval",
      bio: [
        "Arquitecta, historiadora de la arquitectura de la Bartlett School of Architecture (UCL) e investigadora del Observatorio de Arquitectura Latinoamericana Contemporánea (ODALC), con más de 2 años de experiencia como profesora de cátedra en la Pontificia Universidad Javeriana y en la Universidad del Rosario. Especializada en historia y teoría de la arquitectura, e interesada en el análisis crítico del patrimonio arquitectónico del siglo XX y su interacción con contextos sociales, culturales y políticos. Reconocida por fomentar el pensamiento crítico y la transdisciplinariedad en sus proyectos."
      ]
    },
    {
      slug: "carmenza-roa-de-la-rosa",
      categoria: "posteres",
      nombre: "Carmenza Roa de la Rosa",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "carmenza-roa-de-la-rosa.jpg",
      alt: "Fotografía de Carmenza Roa de la Rosa",
      bio: [
        "Carmenza Roa de la Rosa es representante legal de la Asociación de etnoeducadores del Municipio de Becerril – ASOETBEC, organización de base sin ánimo de lucro creada en 2012, que acompaña procesos de etnoeducación, fortalecimiento de la identidad cultural, memoria histórica, participación comunitaria y reconocimiento de los saberes de las comunidades afrodescendientes. Su trayectoria se ha desarrollado en procesos comunitarios orientados a la promoción de los derechos étnicos, culturales y humanos, así como a la recuperación y visibilización de conocimientos construidos desde el territorio. Ha participado en iniciativas culturales y artísticas relacionadas con la memoria, la oralidad, las prácticas tradicionales y la creación comunitaria. Entre sus experiencias se encuentran “De la Vista al Lente”, un proceso de creación y documentación audiovisual que contribuye a preservar y divulgar saberes afrodescendientes, y “La Mudanza Folclórica Recorre Nuestro Territorio”, orientado al reconocimiento y la circulación de expresiones culturales propias. Su trabajo articula la educación, la cultura, la memoria y la participación comunitaria."
      ]
    },
    {
      slug: "monica-andrea-velandia-poveda",
      categoria: "posteres",
      nombre: "Mónica Andrea Velandia Poveda",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "monica-andrea-velandia-poveda.jpg",
      alt: "Fotografía de Mónica Andrea Velandia Poveda",
      bio: [
        "Mónica Andrea Velandia Poveda es maestra en Artes Plásticas y Visuales por la Universidad Distrital Francisco José de Caldas (ASAB) y cursante de la Maestría en Educación en la Universidad El Bosque. Cuenta con una trayectoria de más de ocho años en docencia artística, diseño curricular y gestión cultural en la región de Sabana Centro. Su labor ha sido reconocida al ganar el Programa Municipal de Estímulos de Zipaquirá y al ser nominada a la Orden al Mérito Guillermo Quevedo Zornoza.",
        "Sus líneas de investigación y creación se centran en la articulación entre las artes plásticas, la pedagogía inclusiva y la salvaguarda de la memoria ancestral. Destacan sus proyectos de investigación-creación orientados al patrimonio arqueológico de El Abra y a la transformación de las prácticas educativas contemporáneas en la educación superior."
      ]
    },
    {
      slug: "angela-maria-moya-rodriguez",
      categoria: "posteres",
      nombre: "Angela María Moya Rodríguez",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "angela-maria-moya-rodriguez.jpg",
      alt: "Fotografía de Angela María Moya Rodríguez",
      bio: [
        "Angela María Moya Rodríguez es licenciada en arte, folclor y cultura y magíster en pedagogía. Es docente universitaria de la Facultad de Bellas Artes de la Universidad Popular del Cesar, donde está vinculada desde 2016 y desarrolla procesos de docencia, investigación con acompañamiento académico. Su trayectoria se ha orientado hacia la educación artística, las artes escénicas, la pedagogía y la investigación, con experiencia en teatro, lenguaje corporal, práctica pedagógica, investigación y escritura creativa con expresión oral y corporal. Es tutora y líder del Semillero de Investigación Tras-Escena, acompañando procesos de formación investigativa y proyectos relacionados con la pedagogía y la didáctica de las artes, el patrimonio, la memoria, la identidad, así como con la cultura del Caribe colombiano. Cuenta con experiencia en investigación y creación, producción académica, acompañamiento de trabajos de grado, participación como jurado y evaluadora en procesos culturales y académicos."
      ]
    },
    {
      slug: "valeria-gissell-palacio-rico",
      categoria: "posteres",
      nombre: "Valeria Gissell Palacio Rico",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "valeria-gissell-palacio-rico.jpg",
      alt: "Fotografía de Valeria Gissell Palacio Rico",
      bio: [
        "Valeria Gissell Palacio Rico es Licenciada en Artes, egresada de la Universidad Popular del Cesar, donde actualmente participa como investigadora activa y ha desarrollado su trayectoria en investigación aplicada a las artes y cultura. Se desempeña como artista formadora del programa Artes para la Paz, iniciativa del Ministerio de Cultura, las Artes y los Saberes que promueve procesos de formación artística orientados a la construcción de paz. Sus líneas de investigación se centran en preservación del patrimonio colombiano, codiseño y articulación entre arte, herramientas digitales con fortalecimiento cultural. En 2025 fue ganadora de la convocatoria Jóvenes por el Cambio con su colectivo Tejido Digital, propuesta que integra creación artística con tecnologías digitales."
      ]
    },
    {
      slug: "claudia-marcela-arias-mejia",
      categoria: "posteres",
      nombre: "Claudia Marcela Arias Mejia",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "grupoclaudiadanielmauricio.jpg",
      alt: "Fotografía grupal de Claudia Marcela Arias Mejia, Daniel Plata Becerra, Mauricio Hoyos Gómez",
      bio: [
        "Claudia M. Arias Mejia es diseñadora gráfica Universidad Nacional de Colombia, Especialista en Pedagogía de la comunicación Universidad Distrital, Magister en educación Universidad Nacional de Colombia. Docente catedrática Universidad Jorge Tadeo Lozano, Investigadora en el grupo Designio, estudios de la imagen. Con trabajo investigativo y escritos en el área de la historia del Diseño Gráfico en Colombia, la identidad de marca y la educación en Diseño."
      ]
    },
    {
      slug: "daniel-plata-becerra",
      categoria: "posteres",
      nombre: "Daniel Plata Becerra",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "grupoclaudiadanielmauricio.jpg",
      alt: "Fotografía grupal de Claudia Marcela Arias Mejia, Daniel Plata Becerra, Mauricio Hoyos Gómez",
      bio: [
        "Daniel Plata Becerra es diseñador gráfico de la Universidad Jorge Tadeo Lozano, magíster en Diseño Multimedia de la Universidad Nacional de Colombia, doctorante en Ciencias de la Información y la Comunicación de la Universidad Paris Nanterre. Su trabajo de investigación se focaliza en el fenómeno marcario, por un lado, en Colombia, con una aproximación desde la historiografía del diseño; y, por otro lado, en las condiciones e implicaciones de su implementación en las industrias creativas y culturales, con una aproximación comunicacional. Hace parte del grupo de Investigación de la Escuela Superior de Artes Decorativas de París GoDART, que emplea principalmente la investigación-creación y está enfocado en el estudio de Gameart. Ha trabajado como diseñador gráfico del Museo de Arte Moderno de Bogotá, la Ópera de Colombia y el Archivo General de la Nación, y como director de marca y comunicaciones de varias instituciones en Colombia y Francia."
      ]
    },
    {
      slug: "mauricio-hoyos-gomez",
      categoria: "posteres",
      nombre: "Mauricio Hoyos Gómez",
      etiquetaFicha: "Póster",
      etiquetaCard: "Póster",
      foto: BASE_POSTERES + "grupoclaudiadanielmauricio.jpg",
      alt: "Fotografía grupal de Claudia Marcela Arias Mejia, Daniel Plata Becerra, Mauricio Hoyos Gómez",
      bio: [
        "Mauricio Hoyos Gómez es docente investigador asociado de la Facultad de Diseño Gráfico de la Escuela de Arquitectura y Diseño. Magíster en Historia del Arte, Universidad de Antioquia; doctorante en Historia, Facultad de Ciencias Humanas y Económicas, Universidad Nacional de Colombia."
      ]
    },

    /* ---------- PONENCIAS SELECCIONADAS (15) ---------- */
    /* NOTA DE FUENTE (para revisión humana): las observaciones del README del
     * paquete original señalan discrepancias entre el "Nombre del Autor" (columna
     * del Word) y el nombre que aparece dentro de la biografía. Se conservan los
     * nombres y las biografías tal cual; no se corrigen ni se inventan datos:
     *   - John Jairo Nomesqui Delgado: la bio inicia como "John Nomesqui".
     *   - María Camila Roso Guata: la bio dice "María Camila Rosso Gauta".
     *   - Rafael Adolfo Llano Parias: la bio dice "Rafael Adolfo Llanos Parias".
     *   - Jhon Alexander Barreto: la bio dice "Jhon Alexander Barreto Guerra".
     *   - Diego Germán Romero Bonilla: el perfil describe al colectivo
     *     "Oficina Tripalar" (foto grupal); validar la asociación.
     *   - Fernando Montes: el perfil es de la "Fundación Teatro Varasanta",
     *     no una biografía individual. */
    {
      slug: "mauricio-calle-cometa",
      categoria: "ponencias",
      nombre: "Mauricio Calle Cometa",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "mauricio-calle-cometa.jpg",
      alt: "Fotografía de Mauricio Calle Cometa",
      bio: [
        "Mauricio Calle Cometa es maestro en Artes Escénicas, licenciado en Humanidades, especialista y magíster en Educación, y candidato a doctor en Educación. Cuenta con más de 31 años de trayectoria en los campos artístico, pedagógico, cultural e investigativo, especialmente en danza folclórica colombiana, educación artística, memoria cultural y patrimonio. Su trabajo articula la práctica corporal, la investigación cualitativa, la documentación de fuentes, la memoria oral, el territorio y la transmisión de saberes tradicionales. Ha participado en procesos de campo con el Patronato Colombiano de Artes y Ciencias para sistematizar saberes. Trabaja con metodologías de investigación como las historias de vida, la IAP, los estudios de caso y la fenomenología. Orienta foros de diálogo continuos y procura recopilar y documentar información mediante repositorios en su plataforma Folklore.Net. Entre sus escritos destacan el libro “Huellas de una pasión por el folclor” y los artículos sobre el vestuario en Cundinamarca, “Virtud o fama (en la danza)” y “Educación del folclore en el aula contemporánea”. Actualmente desarrolla la investigación “Pedagogía del saber encarnado para la enseñanza de la danza folclórica”, centrada en la relación entre el saber práctico, la experiencia, la memoria, el territorio y la formación."
      ]
    },
    {
      slug: "paola-andrea-cruz-jimenez",
      categoria: "ponencias",
      nombre: "Paola Andrea Cruz Jiménez",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "paola-andrea-cruz-jimenez.jpg",
      alt: "Fotografía de Paola Andrea Cruz Jiménez",
      bio: [
        "Paola Andrea Cruz Jiménez es docente, investigadora y gestora de procesos de formación artística y cultural, con experiencia en pedagogía, danza, investigación y construcción curricular. Su trayectoria se ha orientado al reconocimiento de las artes como campos de conocimiento y herramientas para la preservación de la memoria y del patrimonio cultural. Es autora de la investigación “La importancia de la danza tradicional en la educación superior para preservar nuestro patrimonio cultural”, publicada en la revista Ciencia Latina Revista Científica Multidisciplinar en 2025, relacionada con la transformación académica y curricular del Instituto Popular de Cultura de Cali y de sus Escuelas de Danza y Música. Su experiencia articula educación, investigación artística y cultura popular, y actualmente proyecta estos aprendizajes hacia la ruralidad, promoviendo el reconocimiento del territorio como espacio pedagógico, creativo y de producción de conocimiento."
      ]
    },
    {
      slug: "carolina-martinez-uzeta",
      categoria: "ponencias",
      nombre: "Carolina Martínez Uzeta",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "carolina-martinez-uzeta.jpg",
      alt: "Fotografía de Carolina Martínez Uzeta",
      bio: [
        "Estudiante doctoral en Estudios Sociales; Especialista en Desarrollo Humano (2017); Artista plástica (2001) y docente (2008 hasta hoy) [UD-FJC]; Magíster en Comunicación (2020) y Docente del Departamento de Estética (2008-2020) [PUJ]. Investiga la realidad social del desplazamiento forzado en Colombia. Libro –La invención del raspachín. Trashumancia de un conflicto: entre la tierra y el territorio (2021); ponencia y capítulo –Mut(u)ación del cuerpo cierto: escrituras del desarraigo– en –Viaje por el planeta de la paz. Miradas para un mundo mejor desde la investigación para la paz, Granada, España (2026). Ponencias en La Sapienza, Roma, y en la Universidad Jagellónica, Polonia. Colectivo artístico –Marca de Aqua–, premio –La koka no es cocaína– (2011) y mención –En el borde del limbo– (2013); Bienal Internacional de Arte –Desde Aquí–; práctica artística –Devenir pájaro: poéticas del desarraigo–; Congreso –Perspectivas críticas del cuidado y afirmación de la vida– (2023) y capítulo –Estudios Sociales del Cuidado: desafíos latinoamericanos–, CLACSO-DES-UD (2025)."
      ]
    },
    {
      slug: "diego-german-romero-bonilla",
      categoria: "ponencias",
      nombre: "Oficina Tripaliar",
      etiquetaFicha: "Ponencia seleccionada · Colectivo",
      etiquetaCard: "Ponencia · Colectivo",
      foto: BASE_PONENCIAS + "diego-german-romero-bonilla.jpg",
      alt: "Fotografía del colectivo Oficina Tripaliar",
      bio: [
        "Oficina Tripalar es un colectivo conformado por docentes y estudiantes de licenciatura en artes visuales de la Universidad Pedagógica Nacional, derivado de 'Excrituras Tripaliares Autoficcionales. Investigar para sobrevivir', un proyecto de investigación-creación apoyado por la Dirección de Investigaciones de la UPN durante 2026. Desde la Oficina Tripaliar creamos un espacio que investiga, crea y reflexiona sobre el trabajo intelectual, la tristeza burocrática, la desafección académica y la soledad institucional en el trabajo docente, investigativo y administrativo, en la búsqueda de experiencias de trabajo más humanas, afectivas y placenteras. Esto lo hacemos desde la exploración e innovación de modos de hacer propios de la investigación artística como levantamiento y activación de archivos vivos, work in progress,  reenactment, escritura expandida y la autoficción. Un ejemplo de nuestro interés en proponer otros modos de socializar el conocimiento artístico se encuentra el IV Congreso de Avatares."
      ]
    },
    {
      slug: "santiago-sepulveda-gonzalez",
      categoria: "ponencias",
      nombre: "Santiago Sepúlveda González",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "santiago-sepulveda-gonzalez.jpg",
      alt: "Fotografía de Santiago Sepúlveda González",
      bio: [
        "Santiago Sepúlveda es un artista posdisciplinar con estudios en artes plásticas y en artes vivas. Ha construido su poética a partir de la relación entre el cuerpo, el espacio y la imagen cinematográfica. En este ámbito, se mueve por diferentes esferas de la creación artística: la fotografía, el teatro, el videoarte, la videoinstalación, la performance y el cine vivo, bajo la lente de las artes vivas. Desde 2009, hace parte del Laboratorio de artistas Mapa Teatro, con el que ha establecido una estrecha relación de pensamiento y creación. Actualmente, su trabajo personal se centra en las relaciones entre lo humano y lo otro viviente-no-humano en el marco de las posibilidades de la voz en situación de sordera congénita. Esto se ha materializado en un contra-dispositivo de cine vivo que cuestiona el tiempo de la imagen, su plasticidad, sus movimientos en el espacio y su relación con el cuerpo en vivo. Su trabajo ha sido invitado a diversos festivales y museos tanto a nivel nacional como internacional. Destaca su obra Una estación fisiomágica, seleccionada por la revista Gaceta como una de las cinco mejores obras de artes vivas del país en 2024. En paralelo a su trabajo artístico, Sepúlveda ha sido docente en diversas universidades del país. Actualmente está vinculado a la Maestría en Artes de la Universidad de Caldas, donde también es candidato a doctor en Diseño y creación."
      ]
    },
    {
      slug: "john-jairo-nomesqui-delgado",
      categoria: "ponencias",
      nombre: "John Jairo Nomesqui Delgado",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "john-jairo-nomesqui-delgado.jpg",
      alt: "Fotografía de John Jairo Nomesqui Delgado",
      bio: [
        "John Nomesqui. Doctor en Estudios Artísticos, Mg. Ciencias de la Educación, Especialista en Docencia Universitaria y Maestro en Artes Plásticas (Universidad Nacional de Colombia). Su trayectoria articula la creación artística, la investigación y la educación, con interés en las relaciones entre el arte, el medio ambiente y los derechos de la Naturaleza. Su producción artística comprende exposiciones individuales y colectivas, con obras centradas en las relaciones entre la naturaleza, la materialidad y las prácticas contemporáneas. Ha participado como ponente en congresos nacionales e internacionales de educación artística y de educación superior. Entre sus publicaciones destacan Hacia una fenomenología de la praxis vital en el arte (2022), Sostenibilidad de la vida en la Casa Común (2025) y Árboltelarizar: tejerse con un árbol talado. Creación artística ante la solastalgia (2026), trabajos que consolidan su investigación sobre las posibilidades del arte frente a las problemáticas socioambientales contemporáneas."
      ]
    },
    {
      slug: "gloria-ocampo-ramirez",
      categoria: "ponencias",
      nombre: "Gloria Ocampo Ramírez",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "gloria-ocampo-ramirez.jpg",
      alt: "Fotografía de Gloria Ocampo Ramírez",
      bio: [
        "Gloria Ocampo Ramírez es Maestra en Artes Plásticas y Doctora en Artes por la Universidad de Antioquia, así como Magíster en Estética por la Universidad Nacional de Colombia. Actualmente, se desempeña como profesora asociada en la Facultad de Artes de la Universidad de Antioquia, donde lidera la coordinación del área de fotografía.",
        "Su enfoque investigativo aborda la estética fotográfica y la teoría de la imagen, explorando en profundidad las imbricaciones entre la memoria, el archivo personal, la epigenética y la fotografía híbrida o expandida. En este ámbito creativo y académico, se destaca como líder del semillero de investigación-creación \"Desenfocados\", adscrito al Grupo de Investigación Hipertrópico, que reúne arte y tecnología de la Universidad de Antioquia.",
        "De su extensa producción bibliográfica destacan artículos sobre Diane Arbus y Duane Michals, así como capítulos recientes como \"Fotografía y memoria familiar. Reflexión desde la epigenética y el arte\" (2023) y \"Herencias invisibles: una revisión semiótica del álbum familiar\" (2025). A estos textos críticos se suman publicaciones detalladas como \"La fotografía en tiempos de pandemia: Posibilidad de creación o frustración ante el encierro\" (2023) y \"El sufrimiento como experiencia estética y proceso transformador: exploraciones desde la fotografía expandida\" (2025), en las que consolida sus aportes sobre las poéticas del archivo y el poder resignificado de la imagen."
      ]
    },
    {
      slug: "valerie-osorio-restrepo",
      categoria: "ponencias",
      nombre: "Valeríe Osorio Restrepo",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "valerie-osorio-restrepo.jpg",
      alt: "Fotografía de Valeríe Osorio Restrepo",
      bio: [
        "Profesional en estudios literarios, magíster en Educación y magíster en Literatura de la Universidad Javeriana. Doctora en Lenguas y Culturas Ibéricas y Latinoamericanas de la Universidad de Texas en Austin. Especialista en literatura, cinematografía y dramaturgias latinoamericanas contemporáneas, teoría de los afectos, estudios de género y estudios de la vigilancia. Ha publicado artículos en revistas como Latin American Literary Review; Perífrasis, de la Universidad de los Andes; Cuadernos de Literatura, de la Universidad Javeriana; y la Revista Escrita, de la Pontificia Universidad Católica de Río. Ha participado en procesos de formación en el Teatro Occidente, donde es la coordinadora académica del Simposio Internacional de Investigación en Teatro. Actualmente es profesora de la Maestría en Arte, Educación y Cultura de la Universidad Pedagógica Nacional. Su libro Intimidades en red: narrativas de la internet y ciudadanías digitales será publicado en 2027 por la editorial de la Universidad Pedagógica."
      ]
    },
    {
      slug: "fernando-montes",
      categoria: "ponencias",
      nombre: "Fernando Montes",
      etiquetaFicha: "Ponencia seleccionada · Fundación Teatro Varasanta",
      etiquetaCard: "Ponencia · Entidad",
      foto: BASE_PONENCIAS + "fernando-montes.jpg",
      alt: "Fotografía de Fernando Montes",
      bio: [
        "La Fundación Teatro Varasanta, centro para la transformación del actor, creado en 1994, nació como un centro permanente de investigación y exploración de las artes escénicas. El trabajo desplegado por el Teatro Varasanta se fundamenta en el actor creador, con énfasis en el entrenamiento para ampliar la energía y modelarla en la obra de arte. En su experiencia de investigación destacan proyectos ganadores de estímulos distritales y nacionales, como Esculpir el presente: el legado vivo de las acciones físicas (2025), Cartografías a la deriva (2022), Núcleo de Investigación y Formación, Arte y Conocimiento (2020), El trabajo sobre sí: relaciones entre el arte y el ser (que, además, fue publicada físicamente en 2017) y El legado vivo de Grotowski (2015), entre otros. Asimismo, aportó a publicaciones como Jerzy Grotowski: lo que fue (Ministerio de Cultura, sin fecha)."
      ]
    },
    {
      slug: "francisco-alexander-llerena-avendano",
      categoria: "ponencias",
      nombre: "Francisco Alexander Llerena Avendaño",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "francisco-alexander-llerena-avendano.jpg",
      alt: "Fotografía de Francisco Alexander Llerena Avendaño",
      bio: [
        "Francisco Alexánder Llerena Avendaño es actor, director, dramaturgo, investigador y profesor de teatro. Doctor en Educación por la Universidad Antonio Nariño, magíster en Escrituras Creativas por la Universidad Nacional de Colombia, especialista en Docencia Universitaria por la Universidad de San Buenaventura y maestro en Artes Escénicas de la Facultad de Artes ASAB de la Universidad Distrital Francisco José de Caldas. Es Investigador Asociado y par evaluador reconocido por Minciencias. Desde 1999 integra Polymnia Teatro y desde 2014 es coordinador académico del Departamento de Artes Escénicas de la Universidad Antonio Nariño, donde ha liderado la creación de los programas Profesional Universitario en Danza–Teatro y Maestría en Didáctica de las Artes Escénicas. Su trayectoria articula creación escénica, investigación-creación, dramaturgia y pedagogía artística. Entre sus publicaciones se encuentran los artículos Laboratorio de creación y pedagogía intercultural (2025), Consideraciones para una educación artística intercultural (2025), Coordenadas de la fiesta popular para una educación artística propia (2024) y La vivencia como principio artístico-pedagógico (2018). Es coautor de los libros de Polymnia Teatro: Escribir para atrás (2022), El Mal: Estéticas y Dramaturgias (2020) y Dramaturgia de Escenario (2016)."
      ]
    },
    {
      slug: "maria-camila-roso-guata",
      categoria: "ponencias",
      nombre: "María Camila Rosso Gauta",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "maria-camila-roso-guata.jpg",
      alt: "Fotografía de María Camila Rosso Gauta",
      bio: [
        "María Camila Rosso Gauta es artista, gestora cultural y abogada, con formación posgradual en curso en Memorias Colectivas, Derechos Humanos y Resistencias (CLACSO) y en Derecho de Familia (UNAB). Su trabajo ha considerado los derechos humanos como un tema transversal a los análisis de género, del conflicto armado y de la cultura en Colombia. Actualmente cursa la maestría en Intervención Social en la Universidad Industrial de Santander. Coordina el proyecto La Montaña Lee, en el que indaga la relación territorial con las prácticas de memoria colectiva y, como resultado de uno de sus procesos, editó el libro “Cartas a la Montaña”. Ha publicado artículos científicos centrados en analizar el derecho desde nuevos enfoques descoloniales: «Constitucionalismo descolonial en la pluma y la resistencia de Ochy Curiel y Adriana Guzmán. Enfoques epistemológicos y metodológicos desde Abya Yala» y «La Pachamama o la naturaleza como sujeto de derechos. Asimetrías en el constitucionalismo del \"buen vivir\" de América Latina»."
      ]
    },
    {
      slug: "rafael-adolfo-llano-parias",
      categoria: "ponencias",
      nombre: "Rafael Adolfo Llano Parias",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "rafael-adolfo-llano-parias.jpg",
      alt: "Fotografía de Rafael Adolfo Llano Parias",
      bio: [
        "Rafael Adolfo Llanos Parias es compositor, investigador y performer colombiano. Candidato a Doctor en Estudios Artísticos, su trabajo se sitúa en la intersección entre la investigación-creación, la genealogía de la escucha atenta e íntima, los paisajes sonoros expandidos y la performatividad somática. Es magíster en composición y licenciado en música, con una trayectoria enfocada en la composición contemporánea, experimental y electroacústica, la exploración vocal e instrumental, y la aplicación de prácticas meditativas y performativas en los procesos creativos con un alto componente de improvisación. Ha participado en diversos proyectos de investigación y difusión de la música contemporánea en América Latina y Europa, vinculándose a redes como el Círculo Colombiano de Música Contemporánea (CCMC) y el grupo “Investigación para la creación artística” de la Universidad Distrital. Su línea de indagación actual profundiza en el concepto del Cuerpo Aural (Auris Corpus), el cuerpo como un oído gigante que diluye el sentido de la escucha en múltiples dimensiones de lo intersensible."
      ]
    },
    {
      slug: "jhon-alexander-barreto",
      categoria: "ponencias",
      nombre: "Jhon Alexander Barreto",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "jhon-alexander-barreto.jpg",
      alt: "Fotografía de Jhon Alexander Barreto",
      bio: [
        "Jhon Alexander Barreto Guerra es unx artista marica y campesinx, oriundx de Málaga, Santander, criadx por familias campesinas de la provincia de García Rovira. Performer, intérprete escénicx, gestor cultural e investigadore cultural, es Magíster en Artes (Universidad de Antioquia, 2024, tesis meritoria Cum Laude) y Licenciado en Educación Básica en Danza (2017). Su trabajo articula la danza, la investigación-creación y la gestión cultural desde una mirada situada en las prácticas festivas y populares del interior de Colombia, con énfasis en cuerpos disidentes y maricas. Es autor de la investigación Jiesta y de la Propagación Matachinezca para el contagio de las experiencias festivas (2024), ganadora de la Beca de Investigación en Danza de la Gobernación de Santander. Dirige el ecosistema creativo Rancho A Parte, desde el cual desarrolla procesos de investigación, creación y memoria en torno al Gran Carnaval del Oriente Colombiano y la figura de los matachines."
      ]
    },
    {
      slug: "maria-alejandra-valencia",
      categoria: "ponencias",
      nombre: "María Alejandra Valencia",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "maria-alejandra-valencia.jpg",
      alt: "Fotografía de María Alejandra Valencia",
      bio: [
        "Egresada y actualmente docente de la Maestría en Educación Artística de la Universidad Nacional de Colombia, cuenta con 14 años de experiencia en diversos contextos educativos, editoriales y de evaluación. Su trabajo investigativo reúne una mirada sobre las narrativas contrahegemónicas que pueden construirse en comunidad como posibilidad de creación conjunta. Las infancias son el eje de su reflexión, así como la posibilidad de resignificar la experiencia en la escuela a través del arte, con la palabra como centro, materia de creación y espacio de reflexión. En este recorrido, cobra especial importancia el registro, entendido como la posibilidad de documentar y, a la vez, expandir las experiencias de creación en el rol de docente-artista, dentro de un entramado de construcción simbólica a partir del lenguaje. Cuenta con publicaciones conjuntas, entre ellas Exploraciones espaciales: reconfigurando realidades a través del arte, y presentó su experiencia en el Encuentro para la Prevención del Hostigamiento Escolar, organizado por la Secretaría de Educación de Bogotá en 2024, como una forma de reivindicar la capacidad de las profesionales que trabajan con niños y niñas para responder a los retos sociales y políticos contemporáneos."
      ]
    },
    {
      slug: "raul-hernando-parra-gaitan",
      categoria: "ponencias",
      nombre: "Raúl Hernando Parra Gaitán",
      etiquetaFicha: "Ponencia seleccionada",
      etiquetaCard: "Ponencia",
      foto: BASE_PONENCIAS + "raul-hernando-parra-gaitan.jpg",
      alt: "Fotografía de Raúl Hernando Parra Gaitán",
      bio: [
        "Bailarín, docente e investigador en historia cultural de la danza; Premio Nacional de Danza 2024; Doctorante en Artes (U. de Antioquia); Máster en Estética e Historia del Arte (U. Jorge Tadeo Lozano); Especialista y Licenciado en Artes del Espectáculo, mención en danza (U. París 8). Ha sido parte de las redes Cátedra de Historia de la Danza Latinoamericana y Red de Investigación Cuerpo Danza Movimiento, y es fundador del Congreso Nacional e Internacional de Danza. Ganador en varias ocasiones de becas de investigación en danza, ha publicado artículos en libros y revistas especializadas y, fruto de su investigación histórica, los libros: El potro azul: vestigios de una insurrección coreográfica (2015), Revelaciones: un siglo de la escena dancística colombiana (2019) y Ficción dorada: danza, folclorización e identidad (2023). Ha sido docente de la ASAB y de las universidades: Distrital Francisco José de Caldas, CENDA, del Atlántico, de Antioquia."
      ]
    }
  ];

  /* 2) ESTILOS EN RUNTIME
   * Se crean con document.createElement('style') y se agregan a <head>.
   * Válido porque lo genera el JS y no pasa por el sanitizador de SharePoint.
   * Paleta: cobalto #0943B5, texto #4C4C4C, secundario #7E7E7E, blanco #ffffff,
   * bordes #d1d1d1. Tipografía 'nunito sans', verdana, sans-serif.
   * h2/h3 fuerzan estilos con !important porque el tema del portal los pisa. */
  function inyectarEstilos() {
    if (document.getElementById("inv-estilos-js")) {
      return;
    }
    var css = [
      /* Tarjetas y grilla: viven DENTRO de #contenido-cms -> conservan el prefijo */
      "#contenido-cms .inv-grid{display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;}",
      "#contenido-cms .inv-card{display:flex;align-items:center;gap:0.75rem;flex:0 1 320px;text-align:left;text-decoration:none;border:1px solid #d1d1d1;border-radius:6px;background:#ffffff;padding:0.75rem 1rem;font-family:'nunito sans',verdana,sans-serif;cursor:pointer;color:#4c4c4c;}",
      "#contenido-cms .inv-card:hover,#contenido-cms .inv-card:focus-visible{border-color:#0943b5;outline:2px solid #0943b5;outline-offset:1px;}",
      "#contenido-cms .inv-card__img{flex:0 0 auto;height:3rem;width:3rem;object-fit:cover;border-radius:4px;}",
      "#contenido-cms .inv-card__text{display:flex;flex-direction:column;}",
      "#contenido-cms .inv-card__name{font-weight:700;color:#0943b5;}",
      "#contenido-cms .inv-card__tag{font-size:0.85rem;color:#7e7e7e;}",
      /* Etiqueta de eje: estilo sobrio/empresarial. Sin relleno de color: el
       * eje se nombra en texto, con un punto de color del eje como indicador y
       * may\u00fasculas peque\u00f1as con tracking. El color del texto es gris oscuro
       * (contraste AA sobre blanco); el punto aporta el c\u00f3digo de color. */
      "#contenido-cms .inv-card__eje{display:inline-flex;align-items:center;gap:0.4rem;align-self:flex-start;margin-top:0.3rem;font-size:0.68rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#4c4c4c;}",
      "#contenido-cms .inv-card__eje::before{content:'';flex:0 0 auto;width:0.5rem;height:0.5rem;border-radius:50%;background:var(--eje-color,#7e7e7e);}",
      "#contenido-cms h2{font-size:1.6rem !important;}",
      /* Modal: se agrega a <body>, FUERA de #contenido-cms -> SIN prefijo
       * (si llevara el prefijo, el selector nunca lo alcanzaría y el modal
       * se vería como contenido plano al final de la pagina). */
      ".inv-overlay{display:none;position:fixed;inset:0;top:0;left:0;right:0;bottom:0;z-index:100000;align-items:flex-start;justify-content:center;padding:2rem 1rem;overflow-y:auto;background:rgba(0,0,0,0.6);}",
      ".inv-overlay.is-open{display:flex;}",
      ".inv-panel{position:relative;z-index:1;max-width:640px;width:100%;box-sizing:border-box;background:#ffffff;border:1px solid #d1d1d1;border-radius:8px;padding:1.5rem 1.5rem 1.75rem;margin:auto;font-family:'nunito sans',verdana,sans-serif;}",
      ".inv-close{position:absolute;top:0.5rem;right:0.75rem;font-size:1.5rem !important;line-height:1 !important;color:#0943b5;background:transparent;border:0;cursor:pointer;font-weight:700;}",
      ".inv-panel img{max-width:180px;width:100%;height:auto;border-radius:6px;margin-bottom:0.75rem;}",
      ".inv-panel h3{color:#0943b5 !important;font-size:1.3rem !important;line-height:1.3 !important;margin:0 0 0.25rem !important;font-family:'nunito sans',verdana,sans-serif;}",
      ".inv-panel h3.inv-ponencia-tit{font-size:1rem !important;margin-top:1rem !important;}",
      ".inv-panel .inv-ficha{color:#7e7e7e;font-weight:600;}",
      ".inv-panel .inv-eje{display:inline-block;margin:0 0 0.9rem;padding:0.15rem 0 0.15rem 0.6rem;border-left:3px solid var(--eje-color,#7e7e7e);color:#4c4c4c;font-size:0.72rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;}",
      ".inv-panel .inv-bio{color:#4c4c4c;line-height:1.6;}"
    ].join("");
    var style = document.createElement("style");
    style.id = "inv-estilos-js";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  /* 3) MODAL ÚNICO REUTILIZABLE
   * Decisión: UN solo modal en el DOM que se rellena al abrir, en vez de 36.
   * Centraliza focus-trap/escape/scroll-lock y evita duplicar subárboles. */
  var overlay, panel, imgEl, nameEl, fichaEl, ejeEl, bodyEl, closeBtn, tituloId;
  var ultimoDisparador = null;

  function construirModal() {
    overlay = document.createElement("div");
    overlay.className = "inv-overlay";

    panel = document.createElement("div");
    panel.className = "inv-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    tituloId = "inv-modal-titulo";

    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "inv-close";
    closeBtn.setAttribute("aria-label", "Cerrar");
    closeBtn.innerHTML = "&#215;";

    imgEl = document.createElement("img");

    nameEl = document.createElement("h3");
    nameEl.id = tituloId;
    panel.setAttribute("aria-labelledby", tituloId);

    fichaEl = document.createElement("p");
    fichaEl.className = "inv-ficha";

    ejeEl = document.createElement("span");
    ejeEl.className = "inv-eje";

    bodyEl = document.createElement("div");

    panel.appendChild(closeBtn);
    panel.appendChild(imgEl);
    panel.appendChild(nameEl);
    panel.appendChild(fichaEl);
    panel.appendChild(ejeEl);
    panel.appendChild(bodyEl);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    closeBtn.addEventListener("click", cerrarModal);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        cerrarModal();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (overlay.classList.contains("is-open")) {
        if (e.key === "Escape" || e.keyCode === 27) {
          cerrarModal();
        } else if (e.key === "Tab" || e.keyCode === 9) {
          atraparFoco(e);
        }
      }
    });
  }

  function focoables() {
    return panel.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  function atraparFoco(e) {
    var items = focoables();
    if (!items.length) {
      return;
    }
    var primero = items[0];
    var ultimo = items[items.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      }
    } else {
      if (document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }
  }

  /* Frontera texto/HTML aplicada aquí:
   *  textContent -> nombre, alt (texto plano)
   *  innerHTML   -> etiquetaFicha, bio[], ponencia.titulo, ponencia.parrafos[] */
  function abrirModal(inv, disparador) {
    ultimoDisparador = disparador || null;

    imgEl.src = inv.foto;
    imgEl.alt = inv.alt;                 // texto plano -> textContent del atributo
    nameEl.textContent = inv.nombre;     // texto plano
    fichaEl.innerHTML = inv.etiquetaFicha; // conserva "&#160;&#160;" verbatim

    var ejeInfo = inv.eje ? EJES[inv.eje] : null;
    if (ejeInfo) {
      ejeEl.textContent = ejeInfo.nombre;        // texto plano
      ejeEl.style.setProperty("--eje-color", ejeInfo.color);
      ejeEl.style.display = "inline-block";
    } else {
      ejeEl.textContent = "";
      ejeEl.style.display = "none";
    }

    bodyEl.innerHTML = "";
    var i;
    for (i = 0; i < inv.bio.length; i++) {
      var p = document.createElement("p");
      p.className = "inv-bio";
      p.innerHTML = inv.bio[i];          // HTML verbatim (<em>, &#160;)
      bodyEl.appendChild(p);
    }
    if (inv.ponencia) {
      var h = document.createElement("h3");
      h.className = "inv-ponencia-tit";
      h.innerHTML = inv.ponencia.titulo;
      bodyEl.appendChild(h);
      for (i = 0; i < inv.ponencia.parrafos.length; i++) {
        var pp = document.createElement("p");
        pp.className = "inv-bio";
        pp.innerHTML = inv.ponencia.parrafos[i];
        bodyEl.appendChild(pp);
      }
    }

    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";   // bloquea scroll de fondo
    closeBtn.focus();                           // foco al abrir
  }

  function cerrarModal() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";          // restaura scroll
    if (ultimoDisparador && typeof ultimoDisparador.focus === "function") {
      ultimoDisparador.focus();                 // retorno de foco
    }
    ultimoDisparador = null;
  }

  /* 4) RENDER — una tarjeta por invitado dentro de su contenedor por categoría. */
  function crearTarjeta(inv) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "inv-card";

    var img = document.createElement("img");
    img.className = "inv-card__img";
    img.src = inv.foto;
    img.alt = "";                               // miniatura decorativa

    var wrap = document.createElement("span");
    wrap.className = "inv-card__text";

    var nombre = document.createElement("span");
    nombre.className = "inv-card__name";
    nombre.textContent = inv.nombre;            // texto plano

    var tag = document.createElement("span");
    tag.className = "inv-card__tag";
    tag.textContent = inv.etiquetaCard;         // texto plano

    wrap.appendChild(nombre);
    wrap.appendChild(tag);

    var ejeInfo = inv.eje ? EJES[inv.eje] : null;
    if (ejeInfo) {
      var ejeTag = document.createElement("span");
      ejeTag.className = "inv-card__eje";
      ejeTag.textContent = ejeInfo.nombre;       // texto plano
      ejeTag.style.setProperty("--eje-color", ejeInfo.color);
      wrap.appendChild(ejeTag);
    }

    card.appendChild(img);
    card.appendChild(wrap);

    card.addEventListener("click", function () {
      abrirModal(inv, card);
    });
    return card;
  }

  function render() {
    inyectarEstilos();
    construirModal();

    var categorias = ["internacional", "nacional", "academico", "posteres", "ponencias"];
    for (var c = 0; c < categorias.length; c++) {
      var cat = categorias[c];
      var cont = document.querySelector('#contenido-cms [data-invitados="' + cat + '"]');
      if (!cont) {
        continue;
      }
      cont.classList.add("inv-grid");
      for (var i = 0; i < INVITADOS.length; i++) {
        if (INVITADOS[i].categoria === cat) {
          cont.appendChild(crearTarjeta(INVITADOS[i]));
        }
      }
    }
  }

  /* 5) ARRANQUE — en DOMContentLoaded, o inmediato si el DOM ya cargó. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
