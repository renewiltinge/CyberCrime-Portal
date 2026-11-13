/* Room: Veilig ontwikkelen en code-review */
CS.registerRoom({
  id: 'veilig-ontwikkelen-codereview',
  path: 'offensief',
  order: 9,
  title: 'Veilig ontwikkelen en code-review',
  icon: '🧑‍💻',
  difficulty: 'Gemiddeld',
  minutes: 80,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Kwetsbaarheden vind je het goedkoopst voordat ze live staan. Maak een dreigingsmodel met STRIDE, wijs in echte codefragmenten de kwetsbare regel aan, zoek gelekte sleutels in een commitgeschiedenis, lees een SBOM tegen advisories en review een pull request.',
  objectives: [
    'Uitleggen hoe een secure development lifecycle werkt en waar dreigingsmodellering, review en testen erin passen',
    'Dreigingen in een ontwerp indelen met STRIDE en er een passende maatregel bij kiezen',
    'In een codefragment de regel aanwijzen waar invoer onveilig in HTML of SQL terechtkomt, en de juiste fix kiezen',
    'Een gelekt geheim in een commitgeschiedenis vinden en de juiste herstelstappen in de goede volgorde zetten',
    'Met een SBOM en advisories bepalen welke afhankelijkheden, ook transitieve, bijgewerkt moeten worden',
    'Een pull request reviewen op autorisatie, invoerverwerking en geheimen',
  ],
  tasks: [
    {
      title: 'Taak 1: Dreigingsmodellering met STRIDE',
      tryFirst: true,
      intro: '<p>Het fictieve installatiebedrijf Dijkstra bouwt een declaratieportaal. In het lab staat het ontwerp en een lijst met acht dreigingen die het team in een workshop bedacht, nog zonder indeling. Deel ze in met STRIDE en zoek uit welke dreiging over het ontkennen van een handeling gaat en welke over het verkrijgen van meer rechten.</p>',
      content: `
        <p>Een kwetsbaarheid die je in het ontwerp ziet, kost een gesprek. Dezelfde kwetsbaarheid na livegang kost een
        incident, een spoedpatch en soms een melding bij de Autoriteit Persoonsgegevens. Daarom hoort beveiliging in
        elke fase van het ontwikkelproces, niet alleen in een pentest vlak voor de release. Dat heet een
        <strong>secure development lifecycle</strong> (SDL).</p>
        <h3>De fasen op hoofdlijnen</h3>
        <ol>
          <li><strong>Eisen:</strong> welke gegevens verwerkt de applicatie, wie mag wat, welke wet- en regelgeving geldt?
          Een bruikbare bron voor concrete eisen is de OWASP Application Security Verification Standard (ASVS).</li>
          <li><strong>Ontwerp:</strong> een dreigingsmodel maken (hieronder).</li>
          <li><strong>Bouwen:</strong> veilige standaarden en bibliotheken gebruiken, geheimen buiten de code houden,
          afhankelijkheden bewust kiezen.</li>
          <li><strong>Controleren:</strong> code-review, statische analyse (SAST), analyse van afhankelijkheden (SCA),
          dynamische tests (DAST) en waar nodig een pentest.</li>
          <li><strong>Uitbrengen en onderhouden:</strong> veilige standaardinstellingen, een SBOM per release, en een
          vast proces om meldingen over kwetsbaarheden af te handelen.</li>
        </ol>
        <h3>Dreigingsmodellering</h3>
        <p>Een dreigingsmodel beantwoordt vier vragen, zoals de Threat Modeling Manifesto en Adam Shostack ze
        formuleren: <em>waar werken we aan, wat kan er misgaan, wat doen we eraan, en hebben we dat goed gedaan?</em>
        Je tekent de applicatie als een dataflowdiagram: gebruikers, processen, opslag en de stromen ertussen. Waar
        gegevens een grens van vertrouwen overgaan (van de browser naar de server, van de app naar een externe
        koppeling), daar zitten de meeste dreigingen.</p>
        <h3>STRIDE</h3>
        <p>STRIDE is eind jaren negentig bij Microsoft bedacht als geheugensteun. Elke letter is een soort dreiging, en
        elke soort tast een beveiligingseigenschap aan:</p>
        <table>
          <thead><tr><th>Letter</th><th>Dreiging</th><th>Eigenschap die het aantast</th><th>Typische maatregel</th></tr></thead>
          <tbody>
            <tr><td>S</td><td>Spoofing: je voordoen als een ander (persoon of systeem)</td><td>Authenticatie</td><td>Sterke authenticatie, wederzijdse controle tussen systemen</td></tr>
            <tr><td>T</td><td>Tampering: gegevens of code ongemerkt wijzigen</td><td>Integriteit</td><td>Toegangscontrole, handtekeningen, controle aan de serverkant</td></tr>
            <tr><td>R</td><td>Repudiation: een handeling ontkennen zonder dat het tegendeel te bewijzen is</td><td>Onweerlegbaarheid</td><td>Audit-trail die vastlegt wie wat wanneer deed, beschermd tegen wijziging</td></tr>
            <tr><td>I</td><td>Information disclosure: informatie komt bij wie haar niet mag zien</td><td>Vertrouwelijkheid</td><td>Autorisatie per object, versleuteling, geen details in foutmeldingen</td></tr>
            <tr><td>D</td><td>Denial of service: de dienst onbruikbaar maken</td><td>Beschikbaarheid</td><td>Limieten op grootte en aantal, quota</td></tr>
            <tr><td>E</td><td>Elevation of privilege: meer rechten krijgen dan toegekend</td><td>Autorisatie</td><td>Rechten aan de serverkant bepalen, nooit uit invoer van de client</td></tr>
          </tbody>
        </table>
        <p>STRIDE is een hulpmiddel om niets te vergeten, geen wiskundige indeling. Sommige dreigingen passen bij twee
        letters. Kies dan de letter die het gevolg het best beschrijft en noteer de andere erbij.</p>
        <div class="callout tip"><strong>Tip:</strong> vraag bij elke dreiging "wat is er stuk als dit lukt?". Is het de
        vraag wie iemand is, of iets klopt, wie iets deed, wie iets ziet, of het werkt, of wat iemand mag?</div>
      `,
      lab: {
        type: 'logs',
        title: 'dreigingsmodel-declaratieportaal.txt',
        lines: `ONTWERP DECLARATIEPORTAAL DIJKSTRA (fictief), versie 0.3
Gebruikers: medewerker (dient in), teamleider (keurt goed), salarisadministratie (betaalt uit)
Stromen: browser -> portaal (HTTPS) | portaal -> database | portaal -> opslag bonnetjes | salarissysteem -> portaal (koppeling)
Grenzen van vertrouwen: internet/portaal, portaal/salarissysteem

DREIGINGEN UIT DE WORKSHOP VAN 2026-11-05 (nog niet ingedeeld)
D-01  Iemand gebruikt een buitgemaakt sessiecookie en werkt verder als een collega.
D-02  Een beheerder past via het gedeelde databaseaccount het bedrag van een al goedgekeurde declaratie aan.
D-03  Een teamleider zegt dat hij declaratie 7781 nooit heeft goedgekeurd. Het portaal legt niet vast wie op Goedkeuren klikte.
D-04  Bij een databasefout toont het portaal de volledige query en de naam van de databaseserver.
D-05  Een upload van een bestand van 2 GB laat het portaal minutenlang vastlopen.
D-06  Een medewerker verandert in het verzoek het veld rol=medewerker in rol=teamleider en kan daarna goedkeuren.
D-07  Bonnetjes staan in opslag met voorspelbare adressen (/bonnen/000123.pdf) en zonder controle wie ze opvraagt.
D-08  Iemand stuurt berichten naar de koppeling alsof hij het salarissysteem is. De koppeling controleert de afzender niet.`,
      },
      questions: [
        { q: 'Welke dreiging valt onder Repudiation? (ID)', answer: ['D-03', 'd03', 'd-03'],
          hints: ['Zoek een dreiging waarin iemand een handeling ontkent.', 'Het probleem is dat er geen bewijs is van wie iets deed.', 'Een teamleider en een goedkeuring.'],
          wrong: { 'D-02': 'Dat is Tampering: gegevens worden gewijzigd. Wel is het een reden om ook databasewijzigingen te loggen.', 'D-01': 'Dat is Spoofing: iemand doet zich voor als een collega.' },
          explain: 'D-03. Zonder audit-trail kan niemand bewijzen wie de declaratie goedkeurde. De maatregel is een log van wie, wat en wanneer, dat de teamleider zelf niet kan wijzigen.' },
        { q: 'Welke dreiging is Elevation of privilege? (ID)', answer: ['D-06', 'd06', 'd-06'],
          hints: ['Zoek een dreiging waarin iemand meer mag dan toegekend.', 'Wie bepaalt hier de rol: de server of de client?', 'Een veld in het verzoek.'],
          wrong: { 'D-01': 'Bij D-01 krijgt de aanvaller de rechten van een collega, niet meer rechten dan die collega. Dat is Spoofing.', 'D-08': 'Dat is Spoofing van een systeem: de koppeling weet niet wie er spreekt.' },
          why: 'Rechten die uit een veld in het verzoek komen, zijn rechten die de gebruiker zelf kiest. Dit is een van de meest gevonden fouten in webapplicaties en hij is in het ontwerp al te zien.',
          explain: 'D-06. De rol moet aan de serverkant uit de sessie en de rechtenadministratie komen, nooit uit wat de browser meestuurt.' },
        { q: 'Hoeveel van de acht dreigingen vallen onder Information disclosure?', answer: ['2', 'twee'],
          hints: ['Zoek dreigingen waarin informatie terechtkomt bij wie haar niet mag zien.', 'Denk aan foutmeldingen en aan opslag zonder controle.', 'D-04 is er een. Er is er nog een over bonnetjes.'],
          wrong: { '1': 'D-04 is er één. Kijk ook naar de bonnetjes met voorspelbare adressen.', '3': 'D-01 levert ook informatie op, maar de kern is dat iemand zich voordoet als een ander: Spoofing.' },
          explain: 'D-04 (details in foutmeldingen) en D-07 (bonnetjes zonder controle per object). Beide tasten de vertrouwelijkheid aan.' },
        { q: 'Welke maatregel pakt D-08 het best aan?', options: ['De koppeling laat alleen berichten toe van een systeem dat zich aantoonbaar identificeert, bijvoorbeeld met een clientcertificaat (mutual TLS) of een ondertekend bericht', 'De berichten van het salarissysteem met AES versleutelen op de database', 'Een limiet op het aantal berichten per minuut', 'De foutmeldingen van de koppeling inkorten'], answer: 0,
          wrong: { 1: 'Versleuteling in de database beschermt opgeslagen gegevens, maar zegt niets over wie het bericht stuurde.', 2: 'Een limiet helpt tegen Denial of service. Eén vals bericht is al genoeg.', 3: 'Dat helpt tegen Information disclosure, niet tegen een valse afzender.' },
          explain: 'D-08 is Spoofing van een systeem. De maatregel is authenticatie van de afzender aan de grens van vertrouwen.' },
      ],
    },

    {
      title: 'Taak 2: Invoervalidatie en uitvoercodering',
      tryFirst: true,
      intro: '<p>In het lab staat een stuk Python-code (Flask) uit het declaratieportaal, met het bijbehorende sjabloon. Zoek de regels waar tekst van een gebruiker zonder codering in een webpagina belandt. Let op: niet elke regel met invoer is fout.</p>',
      content: `
        <p>Bijna elke injectie-aanval werkt op dezelfde manier: invoer van een gebruiker wordt ergens geïnterpreteerd
        als code in plaats van als gegevens. In SQL heet dat SQL-injectie, in HTML heet het cross-site scripting (XSS).
        Er zijn twee verdedigingen, en je hebt ze allebei nodig.</p>
        <h3>Invoervalidatie: bij de ingang</h3>
        <p>Controleer invoer zo vroeg mogelijk tegen wat je verwacht. Werk met een <strong>allowlist</strong>: beschrijf
        wat mag (een bedrag is een getal met hooguit twee decimalen, een bestandstype is pdf, jpg of png) en weiger de
        rest. Een <strong>denylist</strong> die gevaarlijke tekens of woorden probeert weg te filteren, mist altijd een
        variant. Validatie gebeurt aan de serverkant; controle in de browser is gebruiksgemak, geen beveiliging.</p>
        <p>Validatie is niet genoeg tegen XSS. Een omschrijving of een naam mag vrije tekst zijn, met aanhalingstekens en
        punthaken. Die kun je niet weigeren zonder de functie te breken.</p>
        <h3>Uitvoercodering: bij de uitgang</h3>
        <p>Op het moment dat je tekst in een pagina zet, codeer je hem voor de plek waar hij terechtkomt. In de tekst
        van een HTML-element wordt <code>&lt;</code> dan <code>&amp;lt;</code>, zodat de browser het als teken toont en
        niet als begin van een tag leest. Elke context heeft zijn eigen codering: HTML-tekst, een HTML-attribuut,
        JavaScript, een URL. Codering voor de ene context beschermt niet in de andere.</p>
        <p>Moderne sjabloonsystemen doen dit vanzelf. Flask zet voor sjablonen die op <code>.html</code> eindigen
        automatische codering aan (<em>autoescaping</em>): <code>{{ naam }}</code> wordt gecodeerd. Het gevaar zit in
        de uitzonderingen:</p>
        <ul>
          <li>HTML zelf in elkaar plakken met tekstbewerkingen in Python, buiten het sjabloon om.</li>
          <li>De codering bewust uitzetten, in Jinja met het filter <code>| safe</code> of met <code>Markup()</code>.</li>
          <li>Een adres van de gebruiker in een <code>href</code> zetten. Autoescaping codeert de tekens, maar een
          adres dat met <code>javascript:</code> begint, blijft een werkende link. Controleer daarom ook het schema
          (alleen <code>https:</code>).</li>
        </ul>
        <div class="callout warn"><strong>Let op:</strong> een Content Security Policy (CSP) is een goede tweede laag
        tegen XSS, maar geen vervanging van codering. Een review die "we hebben toch een CSP" als antwoord accepteert,
        laat de fout staan.</div>
      `,
      lab: {
        type: 'logs',
        title: 'review: bonnen/views.py en templates/bon.html',
        lines: `01  import re
02  from flask import request, render_template, abort
03
04  TOEGESTANE_TYPES = {"pdf", "jpg", "png"}
05
06  @app.route("/bon/upload", methods=["POST"])
07  def upload():
08      bestand = request.files["bon"]
09      ext = bestand.filename.rsplit(".", 1)[-1].lower()
10      if ext not in TOEGESTANE_TYPES:
11          abort(400)
12      bedrag = request.form.get("bedrag", "")
13      if not re.fullmatch(r"\\d{1,5}(,\\d{2})?", bedrag):
14          abort(400)
15      bewaar_bon(bestand, bedrag)
16      return render_template("klaar.html", bedrag=bedrag)
17
18  @app.route("/bon/zoek")
19  def zoek():
20      term = request.args.get("q", "")
21      treffers = zoek_bonnen(term)
22      return "<h2>Resultaten voor: " + term + "</h2>" + lijst_html(treffers)
23
24
25  @app.route("/bon/<int:bon_id>")
26  def toon(bon_id):
27      bon = haal_bon_van_gebruiker(bon_id, huidige_gebruiker)
28      return render_template("bon.html", bon=bon)
29
30  ---- templates/bon.html ----
31  <h2>{{ bon.omschrijving }}</h2>
32  <p>Leverancier: <a href="{{ bon.website }}">{{ bon.leverancier }}</a></p>
33  <div class="notitie">{{ bon.notitie | safe }}</div>
34  <p>Bedrag: {{ bon.bedrag }}</p>`,
      },
      questions: [
        { q: 'Op welke regel komt de zoekterm van de gebruiker zonder codering in de HTML van het antwoord? (regelnummer)', answer: ['22'],
          hints: ['Zoek de route die de invoer meteen terugstuurt.', 'Wordt hier een sjabloon gebruikt, of wordt HTML met plustekens aan elkaar geplakt?', 'De functie zoek().'],
          wrong: { '20': 'Op regel 20 wordt de invoer alleen gelezen. Het probleem ontstaat waar hij in de HTML belandt.', '13': 'Regel 13 is juist een goede allowlist-controle op het bedrag.' },
          explain: 'Regel 22 plakt de zoekterm rechtstreeks in een HTML-string. Wie een link maakt met een script in de parameter q, laat dat script draaien in de browser van wie erop klikt: reflected XSS.' },
        { q: 'Welke regel in het sjabloon zet de automatische codering bewust uit? (regelnummer)', answer: ['33'],
          hints: ['Zoek een filter achter een variabele.', 'Het filter vertelt Jinja dat de inhoud al veilig is.', 'Kijk naar de notitie.'],
          wrong: { '31': 'Regel 31 gebruikt gewone dubbele accolades: die worden gecodeerd.', '32': 'Regel 32 heeft een ander probleem, maar de codering staat daar aan.' },
          why: 'Een notitie wordt opgeslagen en later aan anderen getoond, bijvoorbeeld aan de teamleider. Een script in een notitie draait dan bij iedereen die de bon opent: stored XSS, vaak ernstiger dan reflected.',
          explain: 'Regel 33: | safe. Haal het filter weg. Moet de notitie opmaak hebben, gebruik dan een sanitizer met een allowlist van toegestane tags.' },
        { q: 'Regel 32 is gecodeerd, maar volgens de review toch riskant. Wat moet er bij het opslaan van bon.website gecontroleerd worden?', options: ['Dat het adres met https:// begint, zodat een link met een ander schema zoals javascript: wordt geweigerd', 'Dat het adres geen punthaken bevat', 'Dat het adres korter is dan 2000 tekens', 'Niets: autoescaping in het attribuut is voldoende'], answer: 0,
          wrong: { 1: 'Punthaken worden al gecodeerd. Een javascript:-link heeft er geen nodig.', 2: 'Een lengtelimiet is prima, maar een kort adres kan nog steeds javascript: gebruiken.', 3: 'Autoescaping codeert tekens, maar laat het schema van het adres ongemoeid.' },
          explain: 'Valideer adressen met een allowlist op het schema. Codering en validatie vullen elkaar hier aan.' },
        { q: 'Welke fix voor regel 22 is de juiste?', options: ['Het resultaat via een sjabloon met autoescaping tonen, of de zoekterm met escape() coderen voordat hij in de HTML komt', 'Met een reguliere expressie het woord script uit de zoekterm halen', 'De zoekterm in de browser met JavaScript controleren', 'De zoekterm beperken tot 50 tekens'], answer: 0,
          wrong: { 1: 'Een denylist: er zijn tientallen manieren om script uit te voeren zonder het woord script, bijvoorbeeld met een event-attribuut.', 2: 'Controle in de browser is te omzeilen door het verzoek zelf te sturen.', 3: 'Ook in 50 tekens past een werkende aanval.' },
          explain: 'Codering voor de juiste context bij de uitgang. Het eenvoudigst: geen HTML in Python bouwen, maar het sjabloon het werk laten doen.' },
      ],
    },

    {
      title: 'Taak 3: Parameterized queries',
      tryFirst: true,
      intro: '<p>Zes ontwikkelaars schreven elk een databasequery voor het portaal. In het lab staan de zes fragmenten, A tot en met F. Bepaal welke veilig zijn zoals ze er staan, en welk fragment er veilig uitziet maar het niet is.</p>',
      content: `
        <p>SQL-injectie ontstaat als invoer in de tekst van een query wordt geplakt. De database kan dan niet meer zien
        waar de query ophoudt en de gegevens beginnen. De fundamentele oplossing is die twee gescheiden te houden:
        de query gaat met plaatshouders naar de database, en de waarden gaan er apart naast. Dat heet een
        <strong>parameterized query</strong> of <strong>prepared statement</strong>. De database behandelt een
        parameter altijd als waarde, wat er ook in staat.</p>
        <table>
          <thead><tr><th>Taal of bibliotheek</th><th>Plaatshouder</th></tr></thead>
          <tbody>
            <tr><td>Python met psycopg (PostgreSQL)</td><td><code>%s</code>, met de waarden als tweede argument</td></tr>
            <tr><td>Python met sqlite3</td><td><code>?</code></td></tr>
            <tr><td>Java JDBC</td><td><code>?</code> in <code>prepareStatement</code>, daarna <code>setString</code> of <code>setInt</code></td></tr>
            <tr><td>C# ADO.NET</td><td><code>@naam</code> met <code>Parameters.Add</code></td></tr>
          </tbody>
        </table>
        <h3>Waar het toch misgaat</h3>
        <ul>
          <li><strong>De naam zegt niets.</strong> Een functie die <code>prepareStatement</code> heet, beschermt alleen
          als je de invoer als parameter meegeeft. Plak je de invoer eerst in de string, dan bereidt de database
          gewoon de geïnjecteerde query voor.</li>
          <li><strong>Python-opmaak in plaats van parameters.</strong> <code>"... %s" % naam</code> of een f-string
          vult de waarde in Python in, vóórdat de database iets ziet. Het lijkt op een plaatshouder, maar het is
          plakken.</li>
          <li><strong>Zelf escapen.</strong> Aanhalingstekens verdubbelen werkt soms, afhankelijk van de database, de
          tekenset en de instellingen. OWASP raadt het af als primaire verdediging: het is foutgevoelig en lastig te
          reviewen.</li>
          <li><strong>Namen van kolommen en tabellen.</strong> Een plaatshouder kan alleen een waarde vervangen, geen
          kolomnaam of sorteerrichting. Moet de gebruiker kunnen kiezen waarop gesorteerd wordt, vertaal de keuze dan
          via een vaste lijst naar een kolomnaam die jij hebt geschreven.</li>
        </ul>
        <p>Een ORM (een laag die database-objecten als gewone objecten aanbiedt) gebruikt onder water parameters, en is
        dan veilig. Tot iemand een ruwe query schrijft om iets sneller te maken. Die ruwe queries zijn bij een review de
        eerste plek waar je kijkt.</p>
        <div class="callout tip"><strong>Reviewtip:</strong> zoek in een diff naar plustekens, f-strings, procenttekens
        en <code>format</code> in de buurt van <code>SELECT</code>, <code>WHERE</code> en <code>ORDER BY</code>.</div>
      `,
      lab: {
        type: 'logs',
        title: 'zes-queries.txt',
        lines: `--- A (Python, psycopg) ---
cur.execute("SELECT id, bedrag FROM declaraties WHERE medewerker = '" + naam + "'")

--- B (Python, psycopg) ---
cur.execute("SELECT id, bedrag FROM declaraties WHERE medewerker = %s", (naam,))

--- C (Python, psycopg) ---
naam_veilig = naam.replace("'", "''")
cur.execute("SELECT id, bedrag FROM declaraties WHERE medewerker = '" + naam_veilig + "'")

--- D (Python, psycopg) ---
sorteer = request.args.get("sorteer", "datum")
cur.execute("SELECT id, bedrag FROM declaraties WHERE team_id = %s ORDER BY " + sorteer, (team_id,))

--- E (Java, JDBC) ---
PreparedStatement ps = conn.prepareStatement(
    "SELECT id, bedrag FROM declaraties WHERE id = " + request.getParameter("id"));
ResultSet rs = ps.executeQuery();

--- F (Java, JDBC) ---
PreparedStatement ps = conn.prepareStatement(
    "SELECT id, bedrag FROM declaraties WHERE status = ? AND team_id = ?");
ps.setString(1, status);
ps.setInt(2, teamId);
ResultSet rs = ps.executeQuery();`,
      },
      questions: [
        { q: 'Welke twee fragmenten zijn veilig zoals ze er staan? (twee letters)', answer: ['B en F', 'B,F', 'B, F', 'BF', 'B F', 'F en B', 'F,B', 'F, B', 'FB', 'B&F', 'B/F'],
          hints: ['Zoek fragmenten waarin geen enkele invoer in de querytekst wordt geplakt.', 'De waarden moeten apart van de query naar de database gaan.', 'Eén Python-fragment met een tuple als tweede argument, en één Java-fragment met setString.'],
          wrong: { '/^(b|f)?\\s*(en|,)?\\s*d$|^d/i': 'D gebruikt wel een parameter voor team_id, maar plakt de sorteerkolom uit het verzoek achter ORDER BY.', '/\\bc\\b/i': 'C escapet zelf. Dat werkt misschien, maar OWASP raadt het af als verdediging en het hangt af van database en instellingen.', '/\\be\\b/i': 'E heet een prepared statement, maar de invoer zit al in de string voordat die wordt voorbereid.' },
          explain: 'B en F. In beide gaat de query met plaatshouders naar de database en de waarden apart.' },
        { q: 'Welk fragment gebruikt prepareStatement en is toch kwetsbaar? (letter)', answer: ['E'],
          hints: ['Kijk naar de Java-fragmenten.', 'Waar staat de invoer: in de querytekst of in een set-methode?', 'request.getParameter staat in de string.'],
          wrong: { 'F': 'F gebruikt plaatshouders en setString en setInt. Dat is de juiste vorm.' },
          why: 'Reviewers die alleen naar de functienaam kijken, keuren E goed. De vraag is altijd: komt invoer in de tekst van de query terecht?',
          explain: 'E plakt de parameter id in de querytekst. prepareStatement bereidt dan de query voor zoals de aanvaller hem schreef.' },
        { q: 'Hoe los je fragment D het best op?', options: ['De gebruiker kiest uit een vaste lijst (datum, bedrag, status) en de code vertaalt die keuze naar een kolomnaam die in de code staat; al het andere wordt geweigerd', 'De sorteerkolom als tweede %s-parameter meegeven', 'Aanhalingstekens uit de sorteerwaarde verwijderen', 'De query in een stored procedure zetten die de sorteerkolom met dynamische SQL toevoegt'], answer: 0,
          wrong: { 1: 'Een plaatshouder vervangt een waarde, geen kolomnaam. De database sorteert dan op een vaste tekst en de sortering werkt niet.', 2: 'Voor een injectie na ORDER BY zijn geen aanhalingstekens nodig.', 3: 'Dynamische SQL in een stored procedure heeft precies hetzelfde probleem, alleen op een andere plek.' },
          explain: 'Voor namen van kolommen, tabellen en sorteerrichtingen is een allowlist de oplossing.' },
      ],
    },

    {
      title: 'Taak 4: Geheimen in de broncode',
      tryFirst: true,
      intro: '<p>De secretscanner van Dijkstra is afgegaan op de repository van het portaal. In het lab staat een deel van de commitgeschiedenis. Bouw een patroon dat alleen echte live-sleutels van de fictieve betaaldienst BetaalNu vindt: <code>nmk_live_</code> gevolgd door precies 20 hexadecimale tekens. Bepaal daarna hoeveel sleutels moeten worden ingetrokken.</p>',
      content: `
        <p>API-sleutels, databasewachtwoorden en privésleutels horen niet in broncode. Code wordt gekopieerd, gedeeld
        met leveranciers, in back-ups bewaard en soms per ongeluk openbaar gezet. Een geheim in een Git-repository
        is bovendien een geheim in de <em>geschiedenis</em>: een latere commit die het verwijdert, haalt het niet uit
        eerdere commits, en ook niet uit klonen die anderen al hebben.</p>
        <h3>Waar geheimen dan wel staan</h3>
        <ul>
          <li>In een <strong>secretmanager</strong> of kluis (bijvoorbeeld HashiCorp Vault of de kluisdienst van een
          cloudplatform). De applicatie haalt het geheim bij het starten op, met een eigen identiteit.</li>
          <li>Als dat niet kan: in omgevingsvariabelen of een configuratiebestand buiten de repository, met
          <code>.gitignore</code> als vangnet.</li>
          <li>Met zo kort mogelijke geldigheid en zo weinig mogelijk rechten per sleutel, zodat een lek klein blijft.</li>
        </ul>
        <h3>Voorkomen en vinden</h3>
        <p>Een secretscanner zoekt met patronen en met entropie (hoe willekeurig een string is) naar dingen die op
        geheimen lijken. Laat hem op drie plekken draaien: vóór de commit op de laptop van de ontwikkelaar (een
        pre-commit hook), bij de push op het Git-platform, en periodiek over de hele geschiedenis. Een goed patroon is
        specifiek: het herkent het vaste voorvoegsel van een sleutel en de exacte lengte, zodat voorbeelden in
        documentatie en testsleutels geen alarm geven.</p>
        <h3>Als het toch gebeurt</h3>
        <ol>
          <li><strong>Intrekken en vervangen</strong> (roteren), meteen. Ga ervan uit dat het geheim bekend is. Bots
          zoeken openbare repositories binnen minuten af naar sleutels.</li>
          <li>De logs van de dienst nakijken: is de sleutel gebruikt door iemand anders dan de applicatie?</li>
          <li>De nieuwe sleutel in de secretmanager zetten, en de code laten lezen uit die manager.</li>
          <li>Pas daarna, als het beleid dat vraagt, de geschiedenis opschonen. Dat is opruimen, geen herstel.</li>
        </ol>
        <div class="callout info"><strong>Regex-tip:</strong> <code>[0-9a-f]</code> is één hexadecimaal teken in kleine
        letters, <code>{20}</code> betekent precies twintig keer. Let op wat er direct achter de sleutel staat: een
        patroon zonder einde vindt ook het begin van een langere string.</div>
      `,
      lab: {
        type: 'regex',
        text: `commit 9c41e7a  2026-11-03 16:12  r.bakker  "Koppeling BetaalNu toegevoegd"
+ BETAALNU_KEY = "nmk_live_7d2f9a41c08e4b6a9f35"
+ BETAALNU_URL = "https://api.betaalnu.example/v2"

commit 1b8e03d  2026-11-04 09:40  s.amrani  "Testsleutel voor lokale ontwikkeling"
+ BETAALNU_KEY = "nmk_test_0a1b2c3d4e5f60718293"

commit e5fa220  2026-11-04 10:02  r.bakker  "Sleutel uit de code gehaald, nu via omgeving"
- BETAALNU_KEY = "nmk_live_7d2f9a41c08e4b6a9f35"
+ BETAALNU_KEY = os.environ["BETAALNU_KEY"]

commit 44c0d9b  2026-11-06 11:15  j.devries  "README bijgewerkt"
+ Zet je sleutel in .env, bijvoorbeeld: BETAALNU_KEY=nmk_live_xxxxxxxxxxxxxxxxxxxx

commit 52bd7e1  2026-11-06 14:30  j.devries  "Logregel bij mislukte betaling"
+ log.warning("betaling mislukt, sleutel begint met nmk_live_7d2f")

commit 7aa31f6  2026-11-07 08:55  s.amrani  "Deployscript"
+ export BETAALNU_KEY=nmk_live_c3e18b07d95a4f21be60
+ export DB_WACHTWOORD='Najaar-fictief-2026'`,
        pattern: 'nmk_',
        flags: 'g',
      },
      questions: [
        { q: 'Hoeveel treffers geeft een patroon dat alleen nmk_live_ gevolgd door precies 20 hexadecimale tekens vindt?', answer: ['3', 'drie'],
          hints: ['Begin met nmk_live_ en voeg een tekenklasse met een aantal toe.', 'nmk_live_[0-9a-f]{20}', 'De README-regel en de logregel horen er niet bij. De verwijderde regel wel.'],
          wrong: { '2': 'Je telt verschillende sleutels. De vraag is het aantal treffers: ook de regel met een minteken bevat een sleutel.', '5': 'Je patroon is te ruim. De x-en zijn geen hexadecimale tekens en de logregel heeft maar vier tekens na het voorvoegsel.', '4': 'Je patroon vindt nog iets te veel. Controleer de lengte: precies twintig.' },
          explain: 'Drie treffers: de sleutel in 9c41e7a, dezelfde sleutel op de verwijderde regel in e5fa220, en een tweede sleutel in 7aa31f6.' },
        { q: 'Hoeveel verschillende live-sleutels moeten worden ingetrokken?', answer: ['2', 'twee'],
          hints: ['Kijk naar de sleutels die je patroon vond, niet naar het aantal treffers.', 'Twee treffers zijn dezelfde sleutel.', 'Een sleutel die in een latere commit is verwijderd, staat nog in de geschiedenis.'],
          wrong: { '1': 'De sleutel uit 9c41e7a is wel uit de code gehaald, maar staat nog in de geschiedenis. Die moet ook worden ingetrokken.', '3': 'De treffers in 9c41e7a en e5fa220 zijn dezelfde sleutel.' },
          why: 'Een commit die "sleutel verwijderd" heet, geeft een vals gevoel van veiligheid. Wie de repository kloont, heeft de oude commit gewoon.',
          explain: 'Twee: 7d2f... en c3e1.... Daarnaast staat er een databasewachtwoord in het deployscript. Ook dat wordt vervangen.' },
        { q: 'De repository blijkt een week openbaar te hebben gestaan. Wat doe je als eerste met sleutel c3e1...?', options: ['De sleutel bij BetaalNu intrekken en een nieuwe aanmaken, en daarna in de logs van BetaalNu kijken of de oude is misbruikt', 'De commit 7aa31f6 uit de geschiedenis verwijderen met een force push', 'De repository op privé zetten', 'Het deployscript aan .gitignore toevoegen'], answer: 0,
          wrong: { 1: 'Geschiedenis herschrijven helpt niet tegen klonen en kopieën die al bestaan. Het is opruimen na het herstel.', 2: 'Privé maken stopt nieuwe kijkers, maar wie de sleutel al heeft, houdt hem.', 3: '.gitignore voorkomt toekomstige commits van het bestand, maar doet niets met de sleutel die al gelekt is.' },
          explain: 'Een gelekt geheim is een bekend geheim. Intrekken en vervangen is de enige stap die de sleutel waardeloos maakt.' },
      ],
    },

    {
      title: 'Taak 5: Afhankelijkheden, SCA en de SBOM',
      tryFirst: true,
      intro: '<p>Bij release 3.4.0 van het portaal hoort een SBOM. Vanochtend kwamen er vier (fictieve) advisories binnen. Leg de versies uit de SBOM naast de versiebereiken in de advisories en bepaal welke echt raken, en via welke directe afhankelijkheid je moet bijwerken.</p>',
      content: `
        <p>Een gemiddelde webapplicatie bestaat voor het grootste deel uit code die het team niet zelf schreef:
        frameworks, bibliotheken en hun afhankelijkheden. Je kiest zelf een handvol <strong>directe</strong>
        afhankelijkheden. Die halen elk weer hun eigen afhankelijkheden binnen: de <strong>transitieve</strong>
        afhankelijkheden. Een kwetsbaarheid zit vaak diep in die boom, in een pakket waar niemand in het team ooit van
        heeft gehoord.</p>
        <h3>SCA</h3>
        <p><strong>Software composition analysis</strong> (SCA) vergelijkt de afhankelijkheden van je project met
        databases van bekende kwetsbaarheden. Een SCA-tool in de pipeline geeft een melding als een pakket in een
        kwetsbaar versiebereik zit. Het lezen van zo'n bereik is een vaardigheid: <code>&gt;= 1.8.0, &lt; 1.9.2</code>
        betekent dat 1.8.0 tot en met 1.9.1 kwetsbaar zijn en dat 1.9.2 de fix bevat.</p>
        <h3>SBOM</h3>
        <p>Een <strong>software bill of materials</strong> (SBOM) is de ingrediëntenlijst van een release: elke
        component met naam, versie, herkomst en hoe hij binnenkomt. Er zijn twee gangbare formaten: SPDX (ook
        gestandaardiseerd als ISO/IEC 5962:2021) en CycloneDX (een OWASP-project). Het nut zit in het moment dat er een
        nieuwe kwetsbaarheid wordt bekendgemaakt. Wie per release een SBOM bewaart, weet binnen minuten welke versies
        van welke applicaties geraakt zijn. Wie dat niet heeft, gaat met de hand zoeken.</p>
        <h3>Goede gewoonten</h3>
        <ul>
          <li>Versies vastleggen in een lockfile, zodat elke build dezelfde componenten gebruikt.</li>
          <li>Een transitieve afhankelijkheid bijwerken via de directe afhankelijkheid die hem binnenhaalt, of, als die
          nog geen nieuwe versie heeft, met een expliciete override in de pakketbeheerder.</li>
          <li>Nieuwe pakketten kiezen met beleid: wordt het onderhouden, hoeveel beheerders zijn er, heet het écht zo
          (let op namen die op een bekend pakket lijken: <em>typosquatting</em>)?</li>
          <li>Niet elke melding is even urgent. Kijk naar de ernst en naar de vraag of de kwetsbare functie in jouw
          gebruik bereikbaar is, maar laat "niet bereikbaar" onderbouwen en niet aannemen.</li>
        </ul>
      `,
      lab: {
        type: 'logs',
        title: 'sbom-declaratieportaal-3.4.0.txt + advisories',
        lines: `SBOM declaratieportaal 3.4.0 (CycloneDX, vereenvoudigd weergegeven)
component        versie   relatie      binnengehaald door
webkader         4.2.1    direct       -
sjabloonmotor    3.1.2    transitief   webkader
pdfmaker         2.0.7    direct       -
beeldlezer       1.9.0    transitief   pdfmaker
dbconnector      5.4.0    direct       -
datumtools       2.8.3    transitief   dbconnector, webkader
logregel         1.2.0    direct       -

ADVISORIES 2026-11-12 (fictief)
NMSA-2026-031  beeldlezer     kwetsbaar: >= 1.8.0, < 1.9.2   ernst: kritiek  geheugenfout bij het verwerken van een gemanipuleerde afbeelding. Opgelost in 1.9.2.
NMSA-2026-034  sjabloonmotor  kwetsbaar: < 3.0.0             ernst: hoog     codeuitvoering via sjablonen uit onbetrouwbare bron. Opgelost in 3.0.0.
NMSA-2026-040  datumtools     kwetsbaar: >= 2.9.0, < 2.9.4   ernst: middel   vastlopen bij extreem lange datumstrings. Opgelost in 2.9.4.
NMSA-2026-044  logregel       kwetsbaar: >= 1.0.0, < 1.2.1   ernst: hoog     invoer in logberichten kan opmaakcodes uitvoeren. Opgelost in 1.2.1.

pdfmaker 2.0.8 (uitgebracht 2026-11-11): vereist beeldlezer >= 1.9.2`,
      },
      questions: [
        { q: 'Hoeveel van de vier advisories raken release 3.4.0?', answer: ['2', 'twee'],
          hints: ['Leg per advisory de versie uit de SBOM naast het bereik.', 'Kleiner dan 3.0.0: valt 3.1.2 daarin? Vanaf 2.9.0: valt 2.8.3 daarin?', 'Twee vallen erbuiten.'],
          wrong: { '4': 'Elk pakket staat in de SBOM, maar niet elke versie valt in het kwetsbare bereik. Kijk naar sjabloonmotor en datumtools.', '3': 'Kijk nog eens naar datumtools: 2.8.3 ligt onder de ondergrens 2.9.0.', '1': 'Kijk nog eens naar logregel: 1.2.0 valt in het bereik tot 1.2.1.' },
          explain: 'Twee: beeldlezer 1.9.0 (NMSA-2026-031) en logregel 1.2.0 (NMSA-2026-044). sjabloonmotor 3.1.2 en datumtools 2.8.3 vallen buiten de bereiken.' },
        { q: 'Welke geraakte component komt alleen transitief binnen?', answer: ['beeldlezer'],
          hints: ['Kijk bij de geraakte componenten naar de kolom relatie.', 'Eén van de twee is een directe afhankelijkheid.', 'De kritieke.'],
          wrong: { 'logregel': 'logregel is een directe afhankelijkheid: die werk je zelf bij naar 1.2.1.', 'datumtools': 'datumtools is transitief, maar 2.8.3 valt buiten het kwetsbare bereik.' },
          why: 'De kritieke kwetsbaarheid zit in een pakket dat niemand bewust heeft gekozen. Zonder SBOM of SCA had niemand geweten dat het portaal het gebruikte.',
          explain: 'beeldlezer 1.9.0, binnengehaald door pdfmaker.' },
        { q: 'Via welke directe afhankelijkheid werk je de kritieke component het netst bij?', answer: ['pdfmaker', 'pdfmaker 2.0.8'],
          hints: ['Kijk in de kolom "binnengehaald door".', 'Staat er onderaan een nieuwe versie die het probleem oplost?', 'Die versie vereist beeldlezer 1.9.2 of hoger.'],
          wrong: { 'webkader': 'webkader haalt sjabloonmotor en datumtools binnen, niet de kritieke component.' },
          explain: 'pdfmaker bijwerken naar 2.0.8, die beeldlezer 1.9.2 of hoger vereist. Daarna de SCA opnieuw draaien en een nieuwe SBOM maken.' },
      ],
    },

    {
      title: 'Taak 6: Een pull request reviewen',
      tryFirst: true,
      intro: '<p>Pull request #212 voegt een exportfunctie voor teamleiders toe. Jij bent de reviewer. Lees de diff in het lab en vind wat niet door de review mag. Gebruik alles uit deze room: autorisatie, invoer in queries, invoer in bestandspaden en geheimen.</p>',
      content: `
        <p>Code-review is de plek waar een tweede paar ogen de fouten vindt die tools missen. Een SAST-tool vindt een
        query waarin invoer wordt geplakt. Hij vindt zelden een functie waarin de controle "mag deze gebruiker dit
        team zien?" ontbreekt, want de tool weet niet wat de regel had moeten zijn. Dat weet de reviewer wel.</p>
        <h3>Een korte checklist voor beveiliging in een review</h3>
        <ul>
          <li><strong>Autorisatie:</strong> controleert elke nieuwe route niet alleen <em>of</em> iemand is ingelogd,
          maar ook <em>of hij bij dit object mag</em>? Een id in de URL is invoer. Vergelijk nieuwe routes met
          bestaande routes die op hetzelfde object werken.</li>
          <li><strong>Invoer naar een interpreter:</strong> komt invoer in SQL, HTML, een shellcommando of een
          bestandspad terecht? Dan hoort daar een parameter, een codering of een allowlist bij.</li>
          <li><strong>Bestandspaden:</strong> een bestandsnaam van de gebruiker die aan een map wordt geplakt, kan met
          <code>../</code> uit die map stappen (<em>path traversal</em>). Gebruik een id dat de server naar een bestand
          vertaalt, of controleer dat het genormaliseerde pad binnen de map blijft.</li>
          <li><strong>Geheimen:</strong> staan er sleutels, wachtwoorden of tokens in de diff?</li>
          <li><strong>Logging:</strong> worden beveiligingsrelevante handelingen gelogd, en staan er geen geheimen of
          onnodige persoonsgegevens in de logregels?</li>
          <li><strong>Foutafhandeling:</strong> lekken foutmeldingen interne details?</li>
        </ul>
        <h3>Hoe je een bevinding opschrijft</h3>
        <p>Een goede reviewopmerking noemt de plek, wat er mis kan gaan en de fix. "Dit is onveilig" helpt niemand.
        "Regel X: de route controleert niet of de gebruiker teamleider van dit team is; vergelijk met de route
        ernaast, die doet het wel" helpt wel. Wees streng op de inhoud en vriendelijk in de toon: de auteur moet
        volgende keer zelf aan die controle denken.</p>
        <div class="callout tip"><strong>Tip:</strong> een review vindt meer als hij klein is. Een pull request van
        duizend regels wordt goedgekeurd; een van vijftig regels wordt gelezen.</div>
      `,
      lab: {
        type: 'logs',
        title: 'PR #212: Export van declaraties voor teamleiders',
        lines: `diff --git a/portaal/team.py b/portaal/team.py
@@ bestaande route (ongewijzigd, ter vergelijking) @@
  @app.route("/team/<int:team_id>/overzicht")
  @login_vereist
  def overzicht(team_id):
      if not huidige_gebruiker.is_teamleider_van(team_id):
          abort(403)
      rijen = db.execute("SELECT * FROM declaraties WHERE team_id = %s", (team_id,))
      return render_template("overzicht.html", rijen=rijen)

@@ nieuw @@
+ @app.route("/team/<int:team_id>/export")
+ @login_vereist
+ def export_csv(team_id):
+     jaar = request.args.get("jaar", "2026")
+     rijen = db.execute(
+         "SELECT * FROM declaraties WHERE team_id = %s AND jaar = " + jaar, (team_id,))
+     log.info("export team %s door %s", team_id, huidige_gebruiker.naam)
+     return maak_csv(rijen)
+
+ @app.route("/team/<int:team_id>/grafiek")
+ @login_vereist
+ def grafiek(team_id):
+     if not huidige_gebruiker.is_teamleider_van(team_id):
+         abort(403)
+     jaar = int(request.args.get("jaar", "2026"))
+     rijen = db.execute("SELECT maand, SUM(bedrag) FROM declaraties WHERE team_id = %s AND jaar = %s GROUP BY maand", (team_id, jaar))
+     return render_template("grafiek.html", rijen=rijen)
+
+ @app.route("/bijlage")
+ @login_vereist
+ def bijlage():
+     naam = request.args.get("bestand")
+     return send_file("/srv/bonnen/" + naam)
+
diff --git a/portaal/config.py b/portaal/config.py
+ MAIL_SERVER = "smtp.dijkstra.nm.lab"
+ MAIL_WACHTWOORD = "Dijkstra-Mail-fictief-01"`,
      },
      questions: [
        { q: 'Welke nieuwe route laat een ingelogde gebruiker met een aangepaste bestandsnaam buiten de map met bonnetjes lezen? (functienaam)', answer: ['bijlage', 'bijlage()', '/bijlage'],
          hints: ['Zoek een route die een bestandsnaam van de gebruiker aan een pad plakt.', 'Wat gebeurt er met ../ in de naam?', 'send_file.'],
          wrong: { 'grafiek': 'grafiek controleert de rechten en zet het jaar om naar een getal. Die is in orde.' },
          explain: 'bijlage plakt de parameter bestand aan /srv/bonnen/. Met ../ stapt een gebruiker uit die map. Bovendien controleert de route niet of de bon van deze gebruiker is. Fix: een bon-id dat de server opzoekt en controleert.' },
        { q: 'Welk geheim staat in de diff en hoort in de secretmanager? (naam van de variabele)', answer: ['MAIL_WACHTWOORD', 'mail_wachtwoord'],
          hints: ['Kijk naar het tweede bestand in de diff.', 'Een servernaam is geen geheim.', 'Het wachtwoord van de mailserver.'],
          wrong: { 'MAIL_SERVER': 'Een servernaam is configuratie, geen geheim. Die mag in de code.' },
          explain: 'MAIL_WACHTWOORD. Haal het uit de diff vóór de merge, laat de code het uit de secretmanager lezen en vervang het wachtwoord, want het staat nu in de branch.' },
        { q: 'Waarom is de route grafiek wel in orde, terwijl hij ook het jaar uit het verzoek gebruikt?', options: ['De route controleert of de gebruiker teamleider van het team is, zet het jaar om naar een getal en geeft het als parameter aan de database', 'Omdat het jaar een standaardwaarde heeft', 'Omdat grafiek alleen sommen teruggeeft en geen losse declaraties', 'Omdat de route het decorator login_vereist heeft'], answer: 0,
          wrong: { 1: 'Een standaardwaarde geldt alleen als de parameter ontbreekt. Wie hem meestuurt, bepaalt zelf de waarde.', 2: 'Ook sommen per team zijn gevoelig. De bescherming zit in de controle en de parameter.', 3: 'Ingelogd zijn is niet genoeg: de vraag is of je bij dit team mag. Ook de kwetsbare route heeft die decorator.' },
          explain: 'Autorisatie per object, validatie tot een getal en een parameter in de query: drie lagen.' },
        { q: 'Eén nieuwe route combineert een ontbrekende controle op het team met invoer die in de querytekst wordt geplakt. Welke functie moet de auteur als eerste aanpassen? (functienaam)', answer: ['export_csv', 'export_csv()', 'export'],
          boss: true, xp: 25,
          hints: ['Vergelijk elke nieuwe route met de bestaande route overzicht: welke mist de regel met is_teamleider_van?', 'Kijk in diezelfde route naar de query: worden alle waarden als parameter meegegeven?', 'De route die een CSV maakt.'],
          wrong: { 'bijlage': 'bijlage heeft ook een ontbrekende controle, maar daar gaat de invoer naar een bestandspad, niet naar een query.', 'grafiek': 'grafiek controleert het team en geeft het jaar als parameter mee.', 'overzicht': 'overzicht is de bestaande route ter vergelijking. Die doet het goed.' },
          why: 'Twee fouten in één route versterken elkaar: elke ingelogde gebruiker kan de export van elk team opvragen, en via de parameter jaar de query zelf aanpassen. Een review die alleen op één soort fout let, vindt de helft.',
          explain: 'export_csv mist de controle is_teamleider_van(team_id), en plakt jaar in de querytekst terwijl team_id wel als parameter gaat. Fix: dezelfde controle als in overzicht, jaar naar int en als tweede parameter.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: het NIST Secure Software Development Framework',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Wie veilig ontwikkelen in een organisatie wil verankeren, heeft meer nodig dan een checklist voor reviews.
        Het Amerikaanse NIST beschreef in <strong>SP 800-218, het Secure Software Development Framework (SSDF), versie
        1.1</strong> uit februari 2022, welke praktijken daarbij horen. Het is geen stappenplan voor één methode:
        het werkt naast Scrum, waterval of DevOps. Het beschrijft <em>wat</em> je doet, niet met welk gereedschap.
        De Amerikaanse federale overheid gebruikt het in eisen aan softwareleveranciers, en veel organisaties gebruiken het om hun eigen proces
        tegen te toetsen.</p>
        <p>De praktijken zijn verdeeld in vier groepen:</p>
        <table>
          <thead><tr><th>Groep</th><th>Waar het over gaat</th><th>Voorbeelden</th></tr></thead>
          <tbody>
            <tr><td>PO: Prepare the Organization</td><td>Mensen, rollen, eisen en gereedschap klaarzetten</td><td>Beveiligingseisen vastleggen, ontwikkelaars trainen, een veilige pipeline inrichten</td></tr>
            <tr><td>PS: Protect the Software</td><td>De code en de releases zelf beschermen</td><td>Toegang tot de repository beperken, releases ondertekenen, herkomstgegevens per release bewaren</td></tr>
            <tr><td>PW: Produce Well-Secured Software</td><td>Software maken met zo min mogelijk kwetsbaarheden</td><td>Dreigingsmodel, bestaande veilige componenten hergebruiken, code reviewen en analyseren, testen, veilige standaardinstellingen</td></tr>
            <tr><td>RV: Respond to Vulnerabilities</td><td>Omgaan met kwetsbaarheden na de release</td><td>Meldingen ontvangen en beoordelen, fixen en uitbrengen, de oorzaak analyseren zodat dezelfde fout niet terugkomt</td></tr>
          </tbody>
        </table>
        <p>Twee dingen vallen op. Ten eerste staat de organisatie voorop: een ontwikkelaar die geen tijd krijgt voor
        een review of geen budget voor een SCA-tool, kan de PW-praktijken niet uitvoeren. Ten tweede houdt het niet op
        bij de release. Een team zonder vast proces voor meldingen van buitenaf (een beveiligingscontact, een
        <code>security.txt</code>, een beleid voor coordinated vulnerability disclosure) hoort pas van een kwetsbaarheid
        als hij al misbruikt wordt.</p>
        <p>De praktijk "analyseer de oorzaak" verdient extra aandacht. Wie in een review een SQL-injectie vindt, kan
        die ene regel repareren. Wie vraagt waarom hij er stond, ontdekt misschien dat het team geen voorbeeldcode met
        parameters had, of dat de SAST-regel uitstond. Dan repareer je de bron van tien toekomstige fouten.</p>
        <p>Het SSDF verwijst per praktijk naar andere bronnen, zoals de OWASP ASVS en Microsofts SDL. Het is dus
        geen concurrent van die bronnen, maar een kapstok waar ze aan hangen.</p>
      `,
      questions: [
        { q: 'Na de fout in export_csv uit taak 6 besluit het team dat elke nieuwe route een autorisatietest in de pipeline krijgt, en zoekt het uit waarom de controle werd vergeten. Bij welke SSDF-groep hoort het zoeken naar de oorzaak? (twee letters)', answer: ['RV'],
          hints: ['Het gaat om een kwetsbaarheid die al gevonden is.', 'Welke groep gaat over het omgaan met kwetsbaarheden en het voorkomen van herhaling?', 'Respond ...'],
          wrong: { 'PW': 'De nieuwe test zelf is PW. Het analyseren van de oorzaak van een gevonden kwetsbaarheid valt onder een andere groep.', 'PO': 'PO gaat over het klaarzetten van de organisatie. De oorzaakanalyse volgt op een gevonden kwetsbaarheid.' },
          explain: 'RV, Respond to Vulnerabilities. Daar hoort ook het analyseren van de oorzaak bij, zodat dezelfde soort fout niet terugkomt.' },
        { q: 'Een leverancier ondertekent zijn releases en bewaart per release welke componenten erin zitten. Bij welke SSDF-groep hoort dat? (twee letters)', answer: ['PS'],
          hints: ['Het gaat om de bescherming van de software zelf, niet om hoe hij gemaakt wordt.', 'Ondertekenen voorkomt dat iemand de release ongemerkt wijzigt.', 'Protect ...'],
          wrong: { 'PW': 'PW gaat over het maken van software met weinig kwetsbaarheden. Releases ondertekenen en bewaren beschermt de software zelf.', 'RV': 'RV komt in beeld als er een kwetsbaarheid is. De gegevens per release helpen dan wel, maar het bewaren ervan hoort bij een andere groep.' },
          explain: 'PS, Protect the Software: de integriteit en herkomst van code en releases bewaken.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Security+ en vergelijkbare examens vragen bij veilig ontwikkelen zelden naar de syntax van een query. Ze
        geven een situatie en vier maatregelen of testsoorten, en vragen welke het beste past. De afleiders zijn bijna
        altijd echte maatregelen die in een andere fase of tegen een ander probleem horen: een WAF waar codering
        gevraagd wordt, DAST waar naar afhankelijkheden gevraagd wordt.</p>
        <h3>Waar je op let</h3>
        <ul>
          <li><strong>Wanneer en wat:</strong> SAST leest de broncode zonder hem uit te voeren. DAST test de draaiende
          applicatie van buitenaf. SCA kijkt naar de componenten van anderen. Fuzzing voert de applicatie uit met grote
          hoeveelheden onverwachte invoer.</li>
          <li><strong>Oorzaak of pleister:</strong> een WAF is een nuttige extra laag, maar bijna nooit het
          <em>beste</em> antwoord als de vraag gaat over het oplossen van de fout in de code.</li>
          <li><strong>Herstel of opruimen:</strong> bij een gelekt geheim wint intrekken het altijd van verbergen.</li>
        </ul>
        <p>Warm op met het lab: zet de activiteiten in de volgorde waarin ze voor het eerst gebeuren in de levenscyclus
        van een nieuwe functie. De vijf vragen eronder zijn zelf geschreven in examenstijl; alle organisaties zijn
        fictief.</p>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de activiteiten in de volgorde waarin ze voor het eerst gebeuren bij een nieuwe functie.',
        items: [
          { id: 'a', label: 'Beveiligingseisen voor de functie vastleggen' },
          { id: 'b', label: 'Een dreigingsmodel van het ontwerp maken' },
          { id: 'c', label: 'De code schrijven met parameters, codering en geheimen uit de kluis' },
          { id: 'd', label: 'Code-review, SAST en SCA op de pull request' },
          { id: 'e', label: 'DAST tegen de testomgeving' },
          { id: 'f', label: 'Release ondertekenen en de SBOM bewaren' },
          { id: 'g', label: 'Een melding over een kwetsbaarheid ontvangen en afhandelen' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        explain: 'Eisen, ontwerp en dreigingsmodel, bouwen, controleren op de code, testen op de draaiende applicatie, uitbrengen, en daarna reageren op wat er na de release gevonden wordt.',
      },
      questions: [
        { q: 'Een fictief softwarebedrijf wil bij elke build weten of er bibliotheken met bekende kwetsbaarheden in de applicatie zitten, ook als ze indirect worden binnengehaald. Welke aanpak past het beste?',
          options: ['Statische analyse van de eigen broncode (SAST)', 'Software composition analysis (SCA)', 'Dynamische applicatietests (DAST)', 'Fuzzing van de invoervelden'], answer: 1,
          wrong: { 0: 'SAST zoekt fouten in de code die het team zelf schreef, niet bekende kwetsbaarheden in componenten van anderen.', 2: 'DAST test de draaiende applicatie van buitenaf en ziet niet welke versie van welke bibliotheek erin zit.', 3: 'Fuzzing vindt onbekende fouten door onverwachte invoer, maar vergelijkt niets met een lijst van bekende kwetsbaarheden.' },
          explain: 'SCA vergelijkt de directe en transitieve afhankelijkheden met databases van bekende kwetsbaarheden.' },
        { q: 'Een fictieve webwinkel toont na een mislukte zoekopdracht de zoekterm terug op de pagina. Een tester laat zien dat er zo script in de pagina kan worden gezet. Wat lost de oorzaak het beste op?',
          options: ['Een web application firewall voor de webwinkel plaatsen', 'De zoekterm coderen voor de HTML-context op het moment dat hij in de pagina wordt gezet', 'De zoekterm in de browser met JavaScript controleren', 'Alle verkeer via HTTPS laten lopen'], answer: 1,
          wrong: { 0: 'Een WAF is een extra laag die varianten kan missen. De fout in de code blijft bestaan.', 2: 'Controle in de browser is te omzeilen door zelf een verzoek te sturen.', 3: 'HTTPS beschermt het transport. Het script komt via de applicatie zelf in de pagina.' },
          explain: 'Uitvoercodering voor de juiste context lost reflected XSS bij de bron op.' },
        { q: 'Een ontwikkelaar bij een fictieve gemeente heeft per ongeluk een API-sleutel in een openbare repository gezet. Hij merkt het twee uur later. Wat moet hij als eerste doen?',
          options: ['De commit uit de geschiedenis verwijderen en een force push doen', 'De repository op privé zetten', 'De sleutel intrekken en een nieuwe aanmaken', 'Een .gitignore-regel toevoegen voor het configuratiebestand'], answer: 2,
          wrong: { 0: 'De sleutel kan in twee uur al gekopieerd zijn. Geschiedenis herschrijven verwijdert geen kopieën.', 1: 'Wie de sleutel al heeft, houdt hem. Privé maken maakt de sleutel niet ongeldig.', 3: 'Dat voorkomt een volgende fout, maar doet niets aan de sleutel die al gelekt is.' },
          explain: 'Intrekken en vervangen maakt de gelekte sleutel waardeloos. De rest is opruimen en voorkomen.' },
        { q: 'Een fictief zorgbedrijf ontwerpt een nieuwe koppeling met een laboratorium. Het team wil vóór er code is, per gegevensstroom systematisch bedenken wat er mis kan gaan. Welke activiteit past het beste?',
          options: ['Een penetratietest op de acceptatieomgeving', 'Een kwetsbaarhedenscan van de servers', 'Dreigingsmodellering, bijvoorbeeld met STRIDE', 'Een code-review van de koppeling'], answer: 2,
          wrong: { 0: 'Een pentest vraagt om een werkende applicatie. Die is er nog niet.', 1: 'Een scan vindt bekende zwakheden op bestaande systemen, niet ontwerpfouten in een koppeling die nog moet worden gebouwd.', 3: 'Er is nog geen code om te reviewen.' },
          explain: 'Dreigingsmodellering werkt op het ontwerp, per stroom en per grens van vertrouwen.' },
        { q: 'In een fictieve applicatie kan de gebruiker kiezen op welke kolom een tabel gesorteerd wordt. De ontwikkelaar merkt dat een plaatshouder voor de kolomnaam niet werkt. Wat is de veiligste oplossing?',
          options: ['Aanhalingstekens en puntkomma\'s uit de invoer verwijderen', 'De keuze van de gebruiker via een vaste lijst vertalen naar een kolomnaam uit de code', 'De query in een stored procedure met dynamische SQL zetten', 'Een WAF-regel die SQL-woorden in de parameter blokkeert'], answer: 1,
          wrong: { 0: 'Een denylist. Na ORDER BY zijn voor een injectie geen aanhalingstekens of puntkomma\'s nodig.', 2: 'Dynamische SQL in de database plakt de invoer net zo goed in de query.', 3: 'Een WAF is een pleister en mist varianten. De fout in de code blijft.' },
          explain: 'Plaatshouders werken alleen voor waarden. Voor namen van kolommen en tabellen gebruik je een allowlist.' },
      ],
    },
  ],

  terms: [
    { term: 'Secure development lifecycle (SDL)', def: 'Ontwikkelproces waarin beveiliging in elke fase zit: eisen, ontwerp, bouwen, controleren, uitbrengen en onderhouden.' },
    { term: 'Dreigingsmodellering', def: 'Systematisch bedenken wat er in een ontwerp mis kan gaan en wat je eraan doet, meestal per gegevensstroom en grens van vertrouwen.' },
    { term: 'STRIDE', def: 'Indeling van dreigingen: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.' },
    { term: 'Uitvoercodering', def: 'Output encoding: tekens omzetten voor de context waarin ze terechtkomen (HTML, attribuut, JavaScript, URL), zodat ze als gegevens worden gelezen en niet als code.' },
    { term: 'Allowlist', def: 'Beschrijving van wat toegestaan is; al het andere wordt geweigerd. Sterker dan een denylist, die probeert het verbodene op te sommen.' },
    { term: 'Parameterized query', def: 'Query waarin waarden als parameters los van de querytekst naar de database gaan, zodat invoer nooit als SQL wordt gelezen.' },
    { term: 'Secretmanager', def: 'Kluisdienst waaruit een applicatie geheimen zoals sleutels en wachtwoorden ophaalt, in plaats van ze in de code of het image te zetten.' },
    { term: 'SCA', def: 'Software composition analysis: de componenten van een project, ook transitieve, vergelijken met bekende kwetsbaarheden.' },
    { term: 'SBOM', def: 'Software bill of materials: de lijst van alle componenten en versies in een release, bijvoorbeeld in het formaat SPDX of CycloneDX.' },
    { term: 'SAST en DAST', def: 'Statische analyse van broncode zonder hem uit te voeren, tegenover dynamische tests op de draaiende applicatie.' },
  ],

  resources: [
    { title: 'NIST SP 800-218: Secure Software Development Framework (SSDF) versie 1.1', url: 'https://csrc.nist.gov/pubs/sp/800/218/final' },
    { title: 'OWASP Cheat Sheet: Query Parameterization', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html' },
    { title: 'OWASP Cheat Sheet: Threat Modeling', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html' },
    { title: 'OWASP Application Security Verification Standard (ASVS)', url: 'https://owasp.org/www-project-application-security-verification-standard/' },
  ],
});
