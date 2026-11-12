/* Room: OWASP Top 10 (editie 2025) */
CS.registerRoom({
  id: 'owasp-top-10',
  path: 'offensief',
  order: 1,
  title: 'OWASP Top 10 (2025)',
  icon: '🕸️',
  difficulty: 'Gemiddeld',
  minutes: 70,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Leer de tien grootste risico\'s voor webapplicaties kennen uit de OWASP Top 10 van 2025, met per categorie een concreet voorbeeld, een maatregel en een IDOR-lab.',
  objectives: [
    'Uitleggen wat OWASP is en waarom de Top 10 een bewustwordingsdocument is en geen afvinklijst',
    'De tien categorieën van de OWASP Top 10 (2025) herkennen met per categorie een voorbeeld en een maatregel',
    'Een IDOR-kwetsbaarheid (onderdeel van Broken Access Control) uitbuiten in een veilige labomgeving',
    'Benoemen wat er in de editie 2025 is veranderd: Supply Chain Failures en Mishandling of Exceptional Conditions zijn nieuw/verschoven en SSRF valt nu onder Broken Access Control',
    'Beschrijven welke basismaatregelen de meeste webrisico\'s tegelijk beperken (least privilege, invoer valideren, veilige standaardinstellingen)',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is OWASP en wat is de Top 10?',
      content: `
        <p><strong>OWASP</strong> staat voor <em>Open Worldwide Application Security Project</em>: een wereldwijde,
        non-profit gemeenschap die gratis kennis, tools en documentatie over softwarebeveiliging maakt. Iedereen
        mag meehelpen, en alles is open en gratis te gebruiken. Je kunt OWASP zien als een soort open encyclopedie
        voor veilige software, geschreven door de mensen die er dagelijks mee werken.</p>

        <p>Het bekendste product van OWASP is de <strong>OWASP Top 10</strong>: een lijst met de tien belangrijkste
        beveiligingsrisico\'s voor webapplicaties. De lijst wordt elke paar jaar opnieuw samengesteld op basis van
        echte data (tienduizenden geteste applicaties) plus een enquête onder beveiligingsexperts. De editie die
        we hier behandelen is die van <strong>2025</strong>.</p>

        <div class="callout info">
          <strong>Belangrijk:</strong> de Top 10 is een <em>bewustwordingsdocument</em>, geen volledige checklist.
          Als je alle tien punten afvinkt, ben je niet automatisch "veilig". Zie het als de tien meest voorkomende
          valkuilen waar je in elk geval van op de hoogte moet zijn — niet als het complete recept voor veilige
          software. Voor een echte checklist bestaat de uitgebreidere <strong>OWASP ASVS</strong>
          (Application Security Verification Standard).
        </div>

        <h3>Hoe lees je zo\'n lijst?</h3>
        <p>Elke categorie heeft een code (A01 tot en met A10). A01 staat bovenaan omdat het het grootste en meest
        voorkomende risico is. De categorieën zijn vrij breed: binnen één categorie vallen vaak meerdere concrete
        kwetsbaarheden. In de volgende taken lopen we ze allemaal langs met een concreet voorbeeld en een maatregel.</p>

        <div class="callout warn">
          <strong>Ethiek vooraf:</strong> in deze room leer je hoe webkwetsbaarheden werken. Je oefent <em>alleen</em>
          in het lab van dit portaal of op systemen waarvoor je schriftelijke toestemming hebt. Een echte website
          zonder toestemming testen is in Nederland strafbaar (computervredebreuk, art. 138ab Sr). Kennis gebruik
          je om te beschermen, niet om schade te doen.
        </div>
      `,
      questions: [
        { q: 'Waar staat de afkorting OWASP voor?', options: ['Open Worldwide Application Security Project', 'Official Web Application Safety Program', 'Online Web Attack Simulation Platform'], answer: 0, explain: 'OWASP is een open, non-profit gemeenschap die gratis kennis over softwarebeveiliging deelt.' },
        { q: 'Is de OWASP Top 10 een volledige checklist voor veilige software?', options: ['Nee, het is vooral een bewustwordingsdocument', 'Ja, als je alles afvinkt ben je veilig', 'Ja, het vervangt alle andere standaarden'], answer: 0, explain: 'De Top 10 maakt je bewust van de grootste risico\'s. Voor een echte checklist bestaat OWASP ASVS.' },
        { q: 'Ik begrijp dat ik aanvalstechnieken alleen in dit lab of met schriftelijke toestemming oefen.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 2 — A01 Broken Access Control (met IDOR-lab)',
      tryFirst: true,
      intro: `<p>Je bent ingelogd als klant 1001 bij de nep-webwinkel <code>shop.nm.lab</code>. Het verzoek in het lab haalt je
        eigen bestelling op. Onderzoek of de winkel jouw gegevens goed afschermt van andere klanten, en vergelijk daarna met
        de verbeterde versie onder <code>/v2</code>.</p>`,
      content: `
        <p><strong>A01 Broken Access Control</strong> staat op nummer 1 en is al jaren het grootste webrisico.
        "Access control" (toegangscontrole) bepaalt <em>wie wat mag</em>. Is die controle kapot of afwezig, dan
        kan een gebruiker dingen zien of doen die niet voor hem bedoeld zijn: data van anderen inzien, acties van
        een beheerder uitvoeren, of beveiligde pagina\'s openen.</p>

        <h3>IDOR: het klassieke voorbeeld</h3>
        <p>Een veelvoorkomende vorm is <strong>IDOR</strong> (<em>Insecure Direct Object Reference</em>, oftewel
        een onveilige directe verwijzing naar een object). De app gebruikt een id in de URL om iets op te halen,
        bijvoorbeeld <code>/bestelling?id=1001</code>, maar controleert niet of die bestelling wel van jóu is.
        Verander je het id in <code>1002</code>, dan krijg je de bestelling van een andere klant te zien. Analogie:
        een garderobe die je jas geeft zodra je een nummer noemt, zonder te controleren of dat bonnetje van jou is.</p>

        <h3>SSRF hoort hier nu ook bij</h3>
        <p>In de editie 2025 valt <strong>SSRF</strong> (<em>Server-Side Request Forgery</em>) onder Broken Access
        Control. Bij SSRF laat je de server namens jou een verzoek doen naar een adres dat jij normaal niet mag
        bereiken, bijvoorbeeld een interne dienst. Ook dat is in de kern een toegangscontroleprobleem: de server
        omzeilt een grens die er zou moeten zijn.</p>

        <h3>Maatregelen</h3>
        <ul>
          <li><strong>Controleer bij elke actie</strong> of de ingelogde gebruiker dit specifieke object mag zien
          (eigenaarschapscontrole op de server, niet alleen in de interface).</li>
          <li><strong>Standaard weigeren</strong> (deny by default): alleen expliciet toegestane dingen mogen.</li>
          <li><strong>Gebruik moeilijk te raden verwijzingen</strong> waar nuttig, maar leun daar niet op als enige
          verdediging — de echte oplossing is de controle op de server.</li>
        </ul>

        <div class="callout tip">
          <strong>Lab:</strong> hieronder staat de nep-webwinkel <code>shop.nm.lab</code>. Je bent ingelogd als
          klant 1001. Het verzoek begint op <code>/bestelling?id=1001</code> — dat is je eigen bestelling. Verander
          nu het id in het pad naar <code>/bestelling?id=1002</code> en verstuur het verzoek. Je ziet dan de
          bestelling van een andere klant, inclusief een interne notitie met een vlag. De winkel controleert nergens
          of de bestelling wel van jou is: dat is de IDOR-fout.
        </div>
      `,
      lab: {
        type: 'http',
        host: 'shop.nm.lab',
        start: { method: 'GET', path: '/bestelling?id=1001', headers: { 'Cookie': 'session=7b2f9c; klant=1001; role=user' }, body: '' },
        routes: [
          { method: 'GET', path: '/', status: 200, headers: { 'Content-Type': 'text/html' }, body: 'Welkom bij shop.nm.lab\n\nJe bestellingen staan onder /bestelling?id=<nummer>\nProbeer: /bestelling?id=1001' },
          { method: 'GET', path: '/bestelling?id=1001', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Bestelling 1001\nKlant: Jan Jansen (klant 1001 - dit ben jij)\nArtikel: USB-stick 64GB\nTotaal: EUR 12,95\nStatus: verzonden' },
          { method: 'GET', path: '/bestelling?id=1002', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Bestelling 1002\nKlant: Fatima El Amrani (klant 1002)\nArtikel: Mechanisch toetsenbord\nTotaal: EUR 89,00\nStatus: in behandeling\nInterne notitie: NM{idor_andermans_bestelling}' },
          { method: 'GET', path: '/bestelling?id=1003', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Bestelling 1003\nKlant: Pieter de Vries (klant 1003)\nArtikel: Webcam 1080p\nTotaal: EUR 34,50\nStatus: geannuleerd' },
          { method: 'GET', path: '/robots.txt', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'User-agent: *\nDisallow: /beheer' },
          { method: 'GET', path: '/v2/bestelling?id=1001', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Bestelling 1001 (API v2)\nKlant: Jan Jansen (klant 1001 - dit ben jij)\nArtikel: USB-stick 64GB\nTotaal: EUR 12,95\nStatus: verzonden' },
          { method: 'GET', path: '/v2/bestelling?id=1002', status: 403, headers: { 'Content-Type': 'text/plain' }, body: 'Geen toegang.\nDeze bestelling hoort niet bij het ingelogde account (klant 1001).' },
          { method: 'GET', path: '/v2/bestelling?id=1003', status: 403, headers: { 'Content-Type': 'text/plain' }, body: 'Geen toegang.\nDeze bestelling hoort niet bij het ingelogde account (klant 1001).' },
        ],
      },
      questions: [
        { q: 'Verander het id in het pad naar 1002. Welke vlag staat in de interne notitie van die bestelling?', answer: ['NM{idor_andermans_bestelling}'], hint: 'Zet in het padveld /bestelling?id=1002 en verstuur het verzoek.', explain: 'De winkel controleert niet of de bestelling van jou is. Zo kun je andermans gegevens inzien: dat is IDOR.' },
        { q: 'De ontwikkelaars hebben een verbeterde versie onder /v2 gezet. Vraag /v2/bestelling?id=1002 op. Welke HTTP-statuscode krijg je terug?', answer: ['403', '403 Forbidden'],
          hints: ['Zet /v2 vóór het pad en verstuur het verzoek opnieuw.', 'Het volledige pad is /v2/bestelling?id=1002. De statuscode staat bovenaan het antwoord.', 'Het is de code voor "verboden".'],
          wrong: { '200': 'Dat is het antwoord van de oude versie, of van je eigen bestelling. Controleer of /v2 in het pad staat en het id 1002 is.', '404': 'Dan klopt het pad niet. Het is /v2/bestelling?id=1002.', '401': 'Een 401 betekent: je bent niet ingelogd. Hier ben je wel ingelogd, maar mag je dit object niet zien.' },
          why: 'Zo ziet de oplossing eruit: de server vergelijkt de eigenaar van de bestelling met het ingelogde account. Een tester controleert altijd of die weigering er ook echt is.',
          explain: '403 Forbidden. De server weet wie je bent (klant 1001) en weigert omdat bestelling 1002 niet van jou is. Dat is de eigenaarschapscontrole die in de oude versie ontbreekt.' },
        { q: 'Terug naar de oude versie. Probeer de id\'s 1002 tot en met 1005. Hoeveel bestellingen van andere klanten krijg je te zien?', answer: ['2'],
          hints: ['Verander alleen het getal achter id= en verstuur telkens opnieuw.', 'Let op de statuscode: 200 betekent dat je de bestelling ziet, 404 dat hij niet bestaat.', 'Twee id\'s geven 404.'],
          wrong: { '4': 'Niet elk id bestaat. Kijk naar de statuscode: bij 404 is er geen bestelling.', '3': 'Je eigen bestelling (1001) telt niet mee, en 1004 en 1005 bestaan niet.', '1': 'Naast 1002 is er nog een bestelling van een andere klant zichtbaar.' },
          explain: 'Twee: 1002 en 1003. Omdat de nummers oplopen, kan iemand met een eenvoudig script alle bestellingen van de winkel ophalen. Daarom staat dit risico op nummer 1.' },
        { q: 'Wat is de belangrijkste maatregel tegen IDOR?', options: ['Op de server controleren of de gebruiker dit specifieke object mag zien', 'De id onzichtbaar maken in de interface', 'De id langer maken'], answer: 0, explain: 'De echte oplossing is een eigenaarschapscontrole op de server bij elke actie, niet alleen iets verbergen.' },
      ],
    },

    {
      title: 'Taak 3 — A02 Security Misconfiguration & A03 Software Supply Chain Failures',
      tryFirst: true,
      intro: `<p>In het lab staat de lijst van bibliotheken die <code>shop.nm.lab</code> gebruikt (een SBOM), met daaronder vier
        fictieve beveiligingsadviezen. Zoek uit welke bibliotheken een probleem zijn en welke als eerste moet worden bijgewerkt.</p>`,
      content: `
        <h3>A02 Security Misconfiguration</h3>
        <p>Dit gaat over onveilige <strong>instellingen</strong>. De software zelf is misschien prima, maar hij
        staat verkeerd ingesteld: standaardwachtwoorden die nooit zijn gewijzigd, uitgebreide foutmeldingen die
        interne details lekken, een beheerpaneel dat open op internet staat, onnodige functies die aan staan, of
        mappen die per ongeluk toegankelijk zijn (bijvoorbeeld een zichtbare <code>.git</code>-map of een
        backupbestand). Analogie: een gloednieuw, stevig slot op je voordeur, maar de sleutel ligt onder de mat.</p>
        <p><strong>Voorbeeld:</strong> een testserver van <code>shop.nm.lab</code> gaat live met de ingebouwde
        beheerder <code>admin/admin</code> en met gedetailleerde foutmeldingen aan. Een aanvaller logt in met het
        standaardwachtwoord en leest in een foutmelding zo de databasestructuur af.</p>
        <p><strong>Maatregel:</strong> werk met veilige standaardinstellingen (secure defaults), verwijder wat je
        niet gebruikt, zet uitgebreide foutmeldingen uit in productie, en leg je configuratie vast zodat elke
        omgeving hetzelfde en gecontroleerd wordt opgezet (hardening).</p>

        <h3>A03 Software Supply Chain Failures (nieuw/verschoven)</h3>
        <p>Dit is een <strong>nieuwe, bredere categorie</strong> in 2025 (voortgekomen uit het eerdere
        "Vulnerable and Outdated Components"). Moderne software bouw je niet helemaal zelf: je gebruikt tientallen
        tot honderden externe bibliotheken, frameworks en bouwtools. Je <em>toeleveringsketen</em> (supply chain)
        is alles wat je code binnenkomt van buiten. Zit daar ergens een lek of een kwaadaardige update in, dan erft
        jouw applicatie dat probleem — ook al heb jij geen fout gemaakt.</p>
        <p><strong>Voorbeeld:</strong> je app gebruikt een populaire logging-bibliotheek. Er wordt een ernstig lek
        in gevonden, maar jij draait nog een oude versie. Of: een onderhouder van een klein pakketje wordt gehackt
        en er wordt stiekem schadelijke code in een update gestopt, die jij automatisch binnenhaalt.</p>
        <p><strong>Maatregel:</strong> houd een <strong>SBOM</strong> bij (Software Bill of Materials — een
        complete inventaris van alles wat je gebruikt), scan je afhankelijkheden automatisch op bekende
        kwetsbaarheden (CVE\'s), werk tijdig bij, en haal pakketten alleen uit vertrouwde bronnen met vastgezette
        versies.</p>

        <div class="callout info">
          <strong>Waarom nieuw?</strong> Grote incidenten (zoals aanvallen via gecompromitteerde updates en lekken
          in veelgebruikte bibliotheken) lieten zien dat de keten zélf een hoofddoelwit is geworden. Daarom kreeg
          dit onderwerp in 2025 een eigen, hogere plek in de lijst.
        </div>
      `,
      questions: [
        { q: 'Welke van deze voorbeelden is een Security Misconfiguration?', options: ['Een beheerpaneel dat met standaardwachtwoord admin/admin op internet staat', 'Een gebruiker met een sterk, uniek wachtwoord', 'Een correct ingesteld TLS-certificaat'], answer: 0, explain: 'Niet-gewijzigde standaardinstellingen en open beheerpanelen zijn klassieke misconfiguraties.' },
        { q: 'Hoeveel componenten uit de SBOM vallen onder een van de vier adviezen?', answer: ['2'],
          hints: ['Een advies geldt alleen voor versies onder de genoemde grens.', 'Zoek elk component uit de adviezen op in de SBOM en vergelijk het versienummer met de grens achter het kleiner-dan-teken.', 'json-snel en betaal-sdk zijn al nieuwer dan de grens.'],
          wrong: { '4': 'Dat een component in een advies wordt genoemd, betekent nog niet dat jouw versie kwetsbaar is. Vergelijk de versienummers.', '3': 'Eén te veel. Versie 1.9.3 van json-snel is nieuwer dan 1.8.0, en 5.4.1 van betaal-sdk is nieuwer dan 5.0.0.', '1': 'Er is er nog één. Let op kleine verschillen: 1.3.0 is ouder dan 1.3.1.' },
          why: 'Dit is het dagelijkse werk bij supply chain-beveiliging: niet elke melding raakt jou. Zonder SBOM weet je het niet; met een SBOM is het een kwestie van vergelijken.',
          explain: 'Twee: logboek-lib 2.14.0 (grens 2.17.1) en sessie-koek 1.3.0 (grens 1.3.1). De andere twee componenten zijn al nieuwer dan de kwetsbare versies.' },
        { q: 'Waarom is Software Supply Chain Failures in 2025 een belangrijker, apart risico geworden?', options: ['Omdat aanvallers steeds vaker de externe componenten en updates zelf aanvallen', 'Omdat software minder bibliotheken gebruikt dan vroeger', 'Omdat het niets met beveiliging te maken heeft'], answer: 0, explain: 'De keten (bibliotheken, build-tools, updates) is zelf een geliefd doelwit geworden.' },
        { q: 'Welk component moet als eerste worden bijgewerkt?', answer: ['logboek-lib', 'logboek lib', 'logboeklib'],
          hints: ['Kijk naar de ernst die bij elk advies staat.', 'Van de twee kwetsbare componenten heeft er één de ernst kritiek.', 'Het is de bibliotheek die logregels wegschrijft.'],
          wrong: { 'sessie-koek': 'Ook kwetsbaar, maar met ernst midden. Het andere kwetsbare component is kritiek.', 'betaal-sdk': 'Het advies geldt voor versies onder 5.0.0. De winkel gebruikt 5.4.1.', 'json-snel': 'Het advies geldt voor versies onder 1.8.0. De winkel gebruikt 1.9.3.' },
          explain: 'logboek-lib: kritiek, met code-uitvoering op afstand. Daarna sessie-koek.' },
        { q: 'Eén component komt niet uit het vaste register en staat ook niet op een versie vastgezet. Welk?', answer: ['kleur-tekst', 'kleur tekst', 'kleurtekst'],
          hints: ['Kijk naar de kolommen bron en vastgezet.', 'Zeven componenten komen van registry.pakket.example. Eén niet.', 'Het wordt rechtstreeks uit een git-repository van een onbekende beheerder gehaald.'],
          wrong: { 'plaatje-schaal': 'Dit component is ook niet strak vastgezet (^0.7.0), maar het komt wel uit het vaste register.' },
          explain: 'kleur-tekst komt uit een git-repository van een onbekende partij en volgt altijd de laatste versie. Wordt dat account overgenomen, dan haalt de winkel bij de volgende build automatisch kwaadaardige code binnen.' },
      ],
      lab: {
        type: 'logs',
        title: 'SBOM van shop.nm.lab met beveiligingsadviezen (fictief)',
        lines: `SBOM shop.nm.lab (uittreksel), gegenereerd 2026-11-10
component            versie   bron                                      vastgezet
webkader-express-nm  4.18.2   registry.pakket.example                   ja
logboek-lib          2.14.0   registry.pakket.example                   ja
json-snel            1.9.3    registry.pakket.example                   ja
plaatje-schaal       0.7.1    registry.pakket.example                   nee (^0.7.0)
kleur-tekst          3.2.0    git: gitforge.example/onbekend/kleur-tekst  nee (altijd laatste)
betaal-sdk           5.4.1    registry.pakket.example                   ja
sessie-koek          1.3.0    registry.pakket.example                   ja
datum-nl             2.0.5    registry.pakket.example                   ja

Beveiligingsadviezen (fictief)
NM-ADV-2026-014  logboek-lib  versies < 2.17.1  ernst: kritiek  code-uitvoering op afstand via een logregel
NM-ADV-2026-021  json-snel    versies < 1.8.0   ernst: hoog     denial of service
NM-ADV-2026-033  sessie-koek  versies < 1.3.1   ernst: midden   voorspelbaar sessie-id
NM-ADV-2026-040  betaal-sdk   versies < 5.0.0   ernst: hoog     ontbrekende handtekeningcontrole`,
      },
    },

    {
      title: 'Taak 4 — A04 Cryptographic Failures & A05 Injection',
      tryFirst: true,
      intro: `<p>Je doet een code-review. In het lab staan tien korte fragmenten (pseudocode). Sommige zijn veilig, andere niet.
        Bepaal per fragment wat er mis is, en beantwoord de vragen.</p>`,
      content: `
        <h3>A04 Cryptographic Failures</h3>
        <p>Dit gaat over fouten rond versleuteling en gevoelige gegevens. Niet alleen "verkeerde wiskunde", maar
        vooral de praktische fouten: gevoelige data (wachtwoorden, burgerservicenummers, betaalgegevens) die
        onversleuteld wordt opgeslagen of verstuurd, verouderde algoritmen (zoals MD5 of SHA-1 voor wachtwoorden),
        of verkeerd omgaan met sleutels.</p>
        <p><strong>Voorbeeld:</strong> een webshop verstuurt een inlogformulier over gewoon <code>http</code> in
        plaats van <code>https</code>. Iemand op hetzelfde wifi-netwerk leest de wachtwoorden rechtstreeks mee.</p>
        <p><strong>Maatregel:</strong> gebruik overal TLS (HTTPS), versleutel gevoelige data ook in opslag, en hash
        wachtwoorden met een moderne, langzame functie (bcrypt, scrypt of Argon2) met een unieke salt per gebruiker.</p>

        <h3>A05 Injection</h3>
        <p><strong>Injection</strong> (injectie) is misschien wel de beroemdste klasse webkwetsbaarheden. Het gebeurt
        wanneer invoer van een gebruiker wordt vermengd met een commando of query, zodat de aanvaller stiekem
        extra instructies "injecteert". De bekendste vorm is <strong>SQL-injectie</strong> (waar een hele aparte
        room over gaat), maar ook commando-injectie en — in 2025 nog steeds hier ondergebracht — veel vormen van
        <strong>XSS</strong> (cross-site scripting) horen in deze familie.</p>
        <p><strong>Voorbeeld:</strong> een zoekveld plakt jouw tekst rechtstreeks in een databasequery. Typ je
        <code>' OR '1'='1</code>, dan verander je de betekenis van de query en krijg je resultaten te zien die niet
        voor jou bedoeld zijn.</p>
        <p><strong>Maatregel:</strong> meng invoer nooit rechtstreeks met code. Gebruik <strong>geparametriseerde
        queries</strong> (prepared statements), zodat invoer altijd als dom gegeven wordt behandeld en nooit als
        instructie. Valideer en saneer invoer, en beperk wat de app mag doen (least privilege).</p>

        <div class="callout warn">
          <strong>Onthoud het principe:</strong> bijna alle injectie ontstaat doordat <em>data</em> en
          <em>code</em> door elkaar lopen. Houd je die strikt gescheiden, dan verdwijnt het probleem grotendeels.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'code-review: tien fragmenten',
        lines: `F01  query = "SELECT * FROM klanten WHERE naam = '" + invoer + "'"; db.execute(query)
F02  query = "SELECT * FROM klanten WHERE naam = ?"; db.execute(query, [invoer])
F03  db.execute("SELECT * FROM orders WHERE id = " + request.params.id)
F04  stmt = db.prepare("UPDATE klanten SET email = ? WHERE id = ?"); stmt.run(email, id)
F05  db.execute(f"DELETE FROM mandje WHERE klant = {klant_id}")
F06  opslaan(gebruiker, md5(wachtwoord))
F07  opslaan(gebruiker, argon2id(wachtwoord, salt=willekeurig_per_gebruiker))
F08  opslaan(gebruiker, sha1(wachtwoord + "vastezout"))
F09  os.system("ping -c 1 " + host)
F10  subprocess.run(["ping", "-c", "1", host])`,
      },
      questions: [
        { q: 'Een inlogformulier wordt over http in plaats van https verstuurd. Onder welke categorie valt dit?', options: ['Cryptographic Failures', 'Injection', 'Security Logging & Alerting Failures'], answer: 0, explain: 'Gevoelige data onversleuteld versturen is een klassiek voorbeeld van Cryptographic Failures.' },
        { q: 'Wat is de kern van elke injectie-kwetsbaarheid?', options: ['Invoer (data) loopt door elkaar met code/instructies', 'Het wachtwoord is te kort', 'De server staat in een ander land'], answer: 0, explain: 'Als data als instructie wordt uitgevoerd, kan een aanvaller de betekenis van een commando veranderen.' },
        { q: 'Hoeveel van de tien fragmenten zijn kwetsbaar voor SQL-injectie?', answer: ['3'],
          hints: ['Kijk bij elke query hoe de invoer erin terechtkomt.', 'Wordt de invoer aan de tekst van de query geplakt (met + of tussen accolades), of apart meegegeven bij een vraagteken?', 'F02 en F04 gebruiken vraagtekens en zijn veilig.'],
          wrong: { '2': 'Kijk nog eens naar F05: een f-string plakt de waarde ook rechtstreeks in de query.', '4': 'F09 is ook injectie, maar in een besturingssysteemcommando, niet in SQL.', '5': 'F02 en F04 gebruiken parameters (vraagtekens). Daar wordt de invoer nooit als SQL gelezen.' },
          why: 'Het patroon is altijd hetzelfde, in elke taal: tekst aan elkaar plakken is kwetsbaar, parameters meegeven is veilig. Wie dat ziet, vindt SQL-injectie in een review binnen seconden.',
          explain: 'Drie: F01, F03 en F05 plakken invoer in de querytekst. F02 en F04 gebruiken parameters.' },
        { q: 'Welk fragment slaat wachtwoorden op de aanbevolen manier op? (bijvoorbeeld F01)', answer: ['F07', 'F7', '7'],
          hints: ['Drie fragmenten slaan een wachtwoord op.', 'Let op twee dingen: is de functie bedoeld voor wachtwoorden (langzaam), en is de salt per gebruiker anders?', 'Eén fragment gebruikt Argon2.'],
          wrong: { 'f06': 'MD5 is snel en heeft geen salt. Gelekte MD5-hashes van wachtwoorden zijn in korte tijd te kraken.', 'f08': 'SHA-1 is snel, en één vaste salt voor iedereen beschermt niet: gelijke wachtwoorden geven nog steeds gelijke hashes.', 'f6': 'MD5 is snel en heeft geen salt. Gelekte MD5-hashes van wachtwoorden zijn in korte tijd te kraken.', 'f8': 'SHA-1 is snel, en één vaste salt voor iedereen beschermt niet: gelijke wachtwoorden geven nog steeds gelijke hashes.' },
          explain: 'F07: Argon2id met een willekeurige salt per gebruiker. F06 (MD5) en F08 (SHA-1 met vaste salt) vallen onder A04 Cryptographic Failures.' },
        { q: 'Welk fragment is kwetsbaar voor commando-injectie? (bijvoorbeeld F01)', answer: ['F09', 'F9', '9'],
          hints: ['Zoek fragmenten die een programma van het besturingssysteem starten.', 'Vergelijk F09 en F10: in welke wordt de invoer aan een commandoregel geplakt?', 'In F10 is de hostnaam een los element in een lijst.'],
          wrong: { 'f10': 'In F10 is host een los argument in een lijst. Er komt geen shell aan te pas die de invoer als commando kan lezen.' },
          explain: 'F09 plakt de invoer aan een commandoregel die door een shell wordt uitgevoerd. F10 geeft de invoer als los argument mee: hetzelfde principe als een parameter in SQL.' },
      ],
    },

    {
      title: 'Taak 5 — A06 Insecure Design & A07 Authentication Failures',
      tryFirst: true,
      intro: `<p>In het lab staat het inloglog van <code>mijn.shop.nm.lab</code> van afgelopen nacht. Er is iets misgegaan met
        het account <code>beheer</code>. Zoek uit wat er gebeurde en welke maatregelen ontbraken.</p>`,
      content: `
        <h3>A06 Insecure Design</h3>
        <p>Niet elke kwetsbaarheid is een <em>bug</em> in de code. Soms is het <strong>ontwerp</strong> zelf fout:
        er is nooit nagedacht over wat er mis kan gaan. Je kunt zo\'n ontwerpfout niet "wegpatchen", want de code
        doet precies wat bedoeld was — alleen was het idee onveilig. Analogie: een bank die geld uitbetaalt zonder
        ooit het saldo te controleren. Dat is geen typefout, dat is een verkeerd plan.</p>
        <p><strong>Voorbeeld:</strong> een "wachtwoord vergeten"-functie die alleen om je geboortedatum vraagt om
        je account te resetten. De code werkt foutloos, maar het ontwerp is onveilig: geboortedata zijn makkelijk
        te vinden.</p>
        <p><strong>Maatregel:</strong> denk al tijdens het ontwerp na over misbruik (<em>threat modeling</em>:
        "hoe zou een aanvaller dit misbruiken?"), bouw veilige standaardpatronen in, en gebruik beproefde ontwerpen
        in plaats van zelf iets te verzinnen.</p>

        <h3>A07 Authentication Failures</h3>
        <p>Dit gaat over fouten in het <strong>vaststellen wie iemand is</strong> (authenticatie). Denk aan: zwakke
        wachtwoorden toestaan, onbeperkt mogen blijven proberen (geen bescherming tegen brute force), sessietokens
        die niet verlopen of te raden zijn, of geen meervoudige verificatie (MFA) bieden.</p>
        <p><strong>Voorbeeld:</strong> een inlogpagina laat onbeperkt pogingen toe. Een aanvaller probeert
        automatisch duizenden veelgebruikte wachtwoorden tot er een past (een <em>brute-force</em>- of
        <em>credential-stuffing</em>-aanval met gelekte wachtwoorden).</p>
        <p><strong>Maatregel:</strong> dwing sterke wachtwoorden af, bied <strong>MFA</strong> aan, beperk en
        vertraag mislukte pogingen (rate limiting), beheer sessies veilig (korte levensduur, netjes uitloggen) en
        controleer wachtwoorden tegen lijsten met bekende gelekte wachtwoorden.</p>

        <div class="callout tip">
          <strong>Tip:</strong> het verschil tussen A06 en A07 is handig om te onthouden. A06 (Insecure Design)
          gaat over een fout <em>plan</em>; A07 (Authentication Failures) gaat specifiek over fouten in het
          <em>inlogproces</em>.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'inloglog mijn.shop.nm.lab, 12 november 2026 (UTC)',
        lines: `02:07:44 LOGIN OK    user=klant1004  ip=198.51.100.14  mfa=n.v.t.
02:08:19 LOGIN FAIL  user=klant1012  ip=192.0.2.201    reden=wachtwoord
02:08:31 LOGIN OK    user=klant1012  ip=192.0.2.201    mfa=n.v.t.
02:10:01 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:03 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:05 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:07 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:09 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:11 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:12 LOGIN OK    user=klant1020  ip=192.0.2.88     mfa=n.v.t.
02:10:13 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:15 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:17 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:19 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:21 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:23 LOGIN FAIL  user=beheer     ip=198.51.100.77  reden=wachtwoord
02:10:25 LOGIN OK    user=beheer     ip=198.51.100.77  mfa=niet ingesteld
02:10:40 PAGINA      user=beheer     ip=198.51.100.77  pad=/beheer/klanten/export
02:11:02 LOGOUT      user=klant1004  ip=198.51.100.14
02:12:30 LOGIN OK    user=klant1031  ip=192.0.2.140    mfa=n.v.t.`,
      },
      questions: [
        { q: 'Een accountherstel vraagt alleen om je geboortedatum. De code werkt perfect, maar het is onveilig. Welke categorie?', options: ['Insecure Design', 'Cryptographic Failures', 'Security Misconfiguration'], answer: 0, explain: 'Het ontwerp zelf is onveilig bedacht; dat is geen bug maar een ontwerpfout (A06).' },
        { q: 'Hoeveel mislukte pogingen op het account beheer gingen vooraf aan de geslaagde aanmelding?', answer: ['12'],
          hints: ['Filter het log zodat je alleen de regels van dit account ziet.', 'Filter op FAIL en daarna op beheer, of gebruik /FAIL.*beheer/. De teller van de viewer doet de rest.', 'Tussen 02:10:01 en 02:10:23, om de twee seconden.'],
          wrong: { '13': 'Je telt de geslaagde aanmelding mee, of de mislukte poging van klant1012.', '11': 'Tel opnieuw: tussen de pogingen door staat een regel van een andere gebruiker, maar de reeks loopt daarna verder.' },
          why: 'Twaalf pogingen in 24 seconden is geen mens die zijn wachtwoord vergeten is. Een grens van een handvol pogingen per minuut had dit gestopt.',
          explain: 'Twaalf mislukte pogingen vanaf 198.51.100.77, daarna één geslaagde. Er is geen vertraging en geen blokkade: Authentication Failures (A07).' },
        { q: 'Een inlogpagina staat onbeperkt veel pogingen toe. Welke categorie en welke maatregel passen?', options: ['Authentication Failures; rate limiting en MFA', 'Injection; prepared statements', 'Cryptographic Failures; TLS'], answer: 0, explain: 'Onbeperkt proberen hoort bij A07; beperk pogingen (rate limiting) en bied MFA aan.' },
        { q: 'Hoeveel seconden zaten er tussen de eerste mislukte poging op beheer en de geslaagde aanmelding?', answer: ['24', '24 seconden', '24s'],
          hints: ['Zoek het tijdstip van de eerste FAIL en van de OK voor dit account.', 'De eerste poging is om 02:10:01.', 'De geslaagde aanmelding is om 02:10:25.'],
          wrong: { '22': 'Dat is tot de laatste mislukte poging (02:10:23). De geslaagde aanmelding volgt twee seconden later.' },
          explain: '24 seconden. Kijk ook naar de regel erna: "mfa=niet ingesteld" en vijftien seconden later een export van alle klanten. Met MFA was het geraden wachtwoord alleen niet genoeg geweest.' },
      ],
    },

    {
      title: 'Taak 6 — A08 Integrity Failures, A09 Logging & Alerting Failures, A10 Mishandling of Exceptional Conditions',
      tryFirst: true,
      intro: `<p>De API van de webwinkel controleert kortingscodes. In het lab staat een geldig verzoek klaar. Kijk wat de server
        antwoordt als de code ontbreekt (verstuur <code>/korting</code> zonder iets erachter), en vergelijk dat met dezelfde
        aanroep op <code>/v2/korting</code>.</p>`,
      content: `
        <h3>A08 Software or Data Integrity Failures</h3>
        <p><strong>Integriteit</strong> betekent dat gegevens of software niet ongemerkt zijn gewijzigd. Deze
        categorie gaat over het <em>blind vertrouwen</em> op code, updates of data zonder te controleren of ze
        echt onveranderd en van de juiste bron zijn.</p>
        <p><strong>Voorbeeld:</strong> een app haalt automatisch een update op van een server zonder de digitale
        handtekening te controleren. Een aanvaller zet er een valse update neer, en de app installeert die klakkeloos.</p>
        <p><strong>Maatregel:</strong> controleer digitale handtekeningen en hashes van updates en componenten,
        haal code alleen uit vertrouwde bronnen, en bescherm je build- en deploystraat (CI/CD).</p>

        <h3>A09 Security Logging & Alerting Failures</h3>
        <p>Als je niet <strong>logt</strong> wat er gebeurt en niet <strong>alarmeert</strong> bij iets verdachts,
        merk je een aanval veel te laat of helemaal niet. Onderzoek wijst keer op keer uit dat inbraken vaak pas na
        weken of maanden worden ontdekt — meestal door een buitenstaander.</p>
        <p><strong>Voorbeeld:</strong> honderden mislukte inlogpogingen op het beheerdersaccount worden nergens
        vastgelegd en niemand krijgt een melding. De aanvaller heeft alle tijd van de wereld.</p>
        <p><strong>Maatregel:</strong> log beveiligingsrelevante gebeurtenissen (inloggen, mislukte pogingen,
        rechtenwijzigingen), bescherm die logs tegen manipulatie, en stel <strong>alerts</strong> in zodat iemand
        echt gewaarschuwd wordt. Log nooit gevoelige data zoals wachtwoorden in platte tekst.</p>

        <h3>A10 Mishandling of Exceptional Conditions (nieuw)</h3>
        <p>Dit is een <strong>nieuwe categorie</strong> in 2025. Het gaat over hoe een applicatie reageert op
        <em>uitzonderlijke situaties</em>: fouten, onverwachte invoer, time-outs en crashes. Verkeerd omgaan met
        zulke momenten leidt tot beveiligingsproblemen — denk aan een foutmelding die interne details prijsgeeft,
        of een systeem dat bij een fout per ongeluk toegang <em>toestaat</em> in plaats van weigert (een fout die
        de verkeerde kant op "faalt").</p>
        <p><strong>Voorbeeld:</strong> de controle of iemand mag inloggen gooit een onverwachte fout, en de code
        behandelt die fout als "ga maar door" (fail-open). De gebruiker is zo per ongeluk ingelogd.</p>
        <p><strong>Maatregel:</strong> vang fouten netjes af, kies altijd voor <strong>fail-safe / fail-closed</strong>
        (bij twijfel weigeren), en toon de gebruiker nette foutmeldingen zonder interne details terwijl je de
        details wél naar je (beschermde) logs schrijft.</p>

        <div class="callout info">
          <strong>Wat veranderde er in 2025?</strong> Supply Chain Failures (A03) en Mishandling of Exceptional
          Conditions (A10) zijn de grote nieuwkomers/verschuivingen, en SSRF is verhuisd naar Broken Access Control.
          De lijst volgt zo de echte dreigingen van dit moment.
        </div>
      `,
      lab: {
        type: 'http',
        host: 'api.shop.nm.lab',
        start: { method: 'GET', path: '/korting?code=ZOMER10', headers: { 'Accept': 'text/plain' }, body: '' },
        routes: [
          { method: 'GET', path: '/', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'api.shop.nm.lab\n\nGET /korting?code=<code>      (huidige versie)\nGET /v2/korting?code=<code>   (verbeterde versie)' },
          { method: 'GET', path: '/korting?code=ZOMER10', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Kortingscode geldig: 10% korting.' },
          { method: 'GET', path: '/korting?code=', status: 500, headers: { 'Content-Type': 'text/plain', 'X-Powered-By': 'webkader-express-nm 4.18.2' }, body: 'TypeError: Cannot read properties of undefined (reading "trim")\n    at kortingController (/srv/shop-api/controllers/korting.js:27:19)\n    at Layer.handle (/srv/shop-api/node_modules/webkader-express-nm/lib/router.js:95:5)\n\nDatabase: postgres://shop_rw@db-intern-02.nm.lab:5432/shop\nNODE_ENV=development' },
          { method: 'GET', path: '/korting', status: 500, headers: { 'Content-Type': 'text/plain', 'X-Powered-By': 'webkader-express-nm 4.18.2' }, body: 'TypeError: Cannot read properties of undefined (reading "trim")\n    at kortingController (/srv/shop-api/controllers/korting.js:27:19)\n    at Layer.handle (/srv/shop-api/node_modules/webkader-express-nm/lib/router.js:95:5)\n\nDatabase: postgres://shop_rw@db-intern-02.nm.lab:5432/shop\nNODE_ENV=development' },
          { method: 'GET', path: '/v2/korting?code=ZOMER10', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Kortingscode geldig: 10% korting.' },
          { method: 'GET', path: '/v2/korting?code=', status: 400, headers: { 'Content-Type': 'text/plain' }, body: 'Ongeldig verzoek: de parameter code ontbreekt.\nReferentie voor de helpdesk: 7f3a-0c21' },
          { method: 'GET', path: '/v2/korting', status: 400, headers: { 'Content-Type': 'text/plain' }, body: 'Ongeldig verzoek: de parameter code ontbreekt.\nReferentie voor de helpdesk: 7f3a-0c21' },
        ],
      },
      questions: [
        { q: 'Een app installeert automatische updates zonder de digitale handtekening te controleren. Welke categorie?', options: ['Software or Data Integrity Failures', 'Authentication Failures', 'Injection'], answer: 0, explain: 'Blind vertrouwen op ongecontroleerde code/updates valt onder A08 Integrity Failures.' },
        { q: 'Honderden mislukte inlogpogingen worden nergens vastgelegd en niemand krijgt een melding. Welke categorie?', options: ['Security Logging & Alerting Failures', 'Cryptographic Failures', 'Insecure Design'], answer: 0, explain: 'Zonder logging en alerting ontdek je aanvallen veel te laat (A09).' },
        { q: 'Verstuur GET /korting zonder code. Welke interne hostnaam staat in de foutmelding?', answer: ['db-intern-02.nm.lab', 'db-intern-02'],
          hints: ['Haal alles vanaf het vraagteken uit het pad en verstuur het verzoek.', 'Lees het hele antwoord, ook de regels onder de foutmelding zelf.', 'De hostnaam staat in de regel die met Database begint.'],
          wrong: { 'api.shop.nm.lab': 'Dat is de publieke naam van de API zelf. De foutmelding noemt een server die van buiten niet zichtbaar hoort te zijn.', 'shop_rw': 'Dat is de naam van het database-account, ook gelekt. Gevraagd is de hostnaam erachter.' },
          why: 'Een aanvaller hoeft hier niets te kraken: de server vertelt zelf waar de database staat, met welk account en welke bibliotheekversie er draait. Dat is gratis verkenning.',
          explain: 'db-intern-02.nm.lab. De foutmelding lekt ook het database-account, de bestandspaden en de bibliotheekversie. Verkeerd omgaan met een uitzondering (A10) wordt zo een informatielek.' },
        { q: 'Verstuur hetzelfde verzoek naar /v2/korting. Welke statuscode geeft de verbeterde versie?', answer: ['400', '400 Bad Request'],
          hints: ['Zet /v2 vóór het pad.', 'Het pad is /v2/korting, zonder code.', 'Het is een code uit de 4xx-reeks: de fout ligt bij het verzoek, niet bij de server.'],
          wrong: { '500': 'Dat is de oude versie. Controleer of /v2 in het pad staat.', '200': 'Je hebt de code er nog achter staan. Haal ?code=ZOMER10 weg.', '404': 'Dan klopt het pad niet. Het is /v2/korting.' },
          explain: '400 Bad Request, met een korte melding en een referentienummer. De details staan in het log van de server; de gebruiker krijgt alleen wat hij nodig heeft.' },
        { q: 'Welke waarde van NODE_ENV in de oude foutmelding laat zien dat de server in productie verkeerd is ingesteld?', answer: ['development', 'NODE_ENV=development'],
          hints: ['Het staat op de laatste regel van het antwoord van /korting.', 'Een productieserver hoort niet in de stand voor ontwikkelaars te staan.', 'Het Engelse woord voor ontwikkeling.'],
          explain: 'development. In die stand tonen veel frameworks volledige foutdetails. Dat is A02 Security Misconfiguration, en het maakt de fout uit A10 erger: categorieën overlappen vaak.' },
      ],
    },

    {
      title: 'Taak 7 — Samenvatting, rode draad en ethiek',
      tryFirst: true,
      intro: `<p>Tot slot kijk je als verdediger. In het lab staat het toegangslog van <code>shop.nm.lab</code> van afgelopen
        nacht. Reconstrueer wat het adres 203.0.113.45 deed. De laatste vraag van deze taak heeft geen stappenplan.</p>`,
      content: `
        <p>Je hebt nu alle tien categorieën van de OWASP Top 10 (2025) gezien. Even het complete overzicht op een rij:</p>
        <table>
          <thead><tr><th>Code</th><th>Categorie</th></tr></thead>
          <tbody>
            <tr><td>A01</td><td>Broken Access Control (nu inclusief SSRF)</td></tr>
            <tr><td>A02</td><td>Security Misconfiguration</td></tr>
            <tr><td>A03</td><td>Software Supply Chain Failures (nieuw/verschoven)</td></tr>
            <tr><td>A04</td><td>Cryptographic Failures</td></tr>
            <tr><td>A05</td><td>Injection</td></tr>
            <tr><td>A06</td><td>Insecure Design</td></tr>
            <tr><td>A07</td><td>Authentication Failures</td></tr>
            <tr><td>A08</td><td>Software or Data Integrity Failures</td></tr>
            <tr><td>A09</td><td>Security Logging &amp; Alerting Failures</td></tr>
            <tr><td>A10</td><td>Mishandling of Exceptional Conditions (nieuw)</td></tr>
          </tbody>
        </table>

        <h3>De rode draad</h3>
        <p>Als je goed kijkt, komen een paar principes telkens terug. Beheers je deze, dan dek je een groot deel
        van de Top 10 tegelijk af:</p>
        <ul>
          <li><strong>Vertrouw nooit invoer</strong> en houd data en code strikt gescheiden (tegen injectie).</li>
          <li><strong>Controleer rechten op de server</strong> bij elke actie (tegen broken access control).</li>
          <li><strong>Standaard weigeren en veilig falen</strong> (deny by default, fail-closed).</li>
          <li><strong>Least privilege:</strong> geef elk onderdeel zo min mogelijk rechten.</li>
          <li><strong>Houd je spullen bij:</strong> ken je componenten (SBOM), werk bij en controleer herkomst.</li>
          <li><strong>Log en alarmeer</strong> zodat je aanvallen op tijd ziet.</li>
        </ul>

        <div class="callout danger">
          <strong>Ethiek en recht:</strong> alle technieken uit deze room oefen je uitsluitend in dit lab of op
          systemen waarvoor je uitdrukkelijke, schriftelijke toestemming hebt. Ongeautoriseerd binnendringen of
          testen is in Nederland strafbaar als computervredebreuk (art. 138ab Sr). Vind je per ongeluk een echt lek?
          Meld het verantwoord via <em>Coordinated Vulnerability Disclosure</em> (CVD) bij de eigenaar of het NCSC,
          en misbruik het niet. Zo blijf je aan de goede kant van de streep en help je het internet veiliger maken.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'toegangslog shop.nm.lab, 12 november 2026 (UTC)',
        lines: `03:12:40 198.51.100.14 "GET /" 200 -
03:12:58 198.51.100.14 "POST /login" 200 klant1004
03:13:05 198.51.100.14 "GET /bestelling?id=1004" 200 klant1004
03:13:30 192.0.2.201 "POST /login" 401 klant1012
03:13:41 192.0.2.201 "POST /login" 200 klant1012
03:13:50 192.0.2.201 "GET /bestelling?id=1012" 200 klant1012
03:14:01 203.0.113.45 "POST /login" 401 klant1003
03:14:02 203.0.113.45 "POST /login" 401 klant1008
03:14:03 203.0.113.45 "POST /login" 401 klant1011
03:14:04 203.0.113.45 "POST /login" 401 klant1015
03:14:05 203.0.113.45 "POST /login" 401 klant1016
03:14:06 203.0.113.45 "POST /login" 401 klant1019
03:14:07 203.0.113.45 "POST /login" 401 klant1021
03:14:08 203.0.113.45 "POST /login" 401 klant1025
03:14:09 203.0.113.45 "POST /login" 401 klant1030
03:14:10 203.0.113.45 "POST /login" 200 klant1017
03:14:15 198.51.100.14 "GET /product?id=88" 200 klant1004
03:14:20 203.0.113.45 "GET /bestelling?id=1017" 200 klant1017
03:14:21 203.0.113.45 "GET /bestelling?id=1018" 200 klant1017
03:14:22 203.0.113.45 "GET /bestelling?id=1019" 200 klant1017
03:14:23 203.0.113.45 "GET /bestelling?id=1020" 404 klant1017
03:14:24 203.0.113.45 "GET /bestelling?id=1021" 200 klant1017
03:14:25 203.0.113.45 "GET /bestelling?id=1022" 200 klant1017
03:14:26 192.0.2.201 "GET /product?id=12" 200 klant1012
03:14:27 203.0.113.45 "GET /bestelling?id=1023" 200 klant1017
03:14:28 203.0.113.45 "GET /bestelling?id=1024" 404 klant1017
03:14:29 203.0.113.45 "GET /bestelling?id=1025" 200 klant1017
03:14:30 203.0.113.45 "GET /bestelling?id=1026" 200 klant1017
03:14:31 203.0.113.45 "GET /bestelling?id=1027" 200 klant1017
03:14:32 203.0.113.45 "GET /bestelling?id=1028" 404 klant1017
03:14:33 203.0.113.45 "GET /bestelling?id=1029" 200 klant1017
03:14:34 203.0.113.45 "GET /bestelling?id=1030" 200 klant1017
03:14:35 203.0.113.45 "GET /bestelling?id=1031" 429 klant1017
03:14:36 203.0.113.45 "GET /bestelling?id=1032" 429 klant1017
03:14:50 198.51.100.14 "POST /uitloggen" 200 klant1004
03:21:10 WAF ALERT regel=veel-verzoeken ip=203.0.113.45 (eerste melding aan de beheerder)`,
      },
      questions: [
        { q: 'Met welk account kwam het adres 203.0.113.45 uiteindelijk binnen?', answer: ['klant1017', 'klant 1017', '1017'],
          hints: ['Filter op het IP-adres en kijk naar de inlogpogingen.', 'Een 401 is een mislukte aanmelding. Zoek de POST /login met een 200.', 'Het is de tiende poging.'],
          wrong: { 'klant1004': 'Dat is een gewone klant vanaf een ander adres (198.51.100.14).', 'klant1030': 'Voor dat account mislukte de aanmelding (401).', 'klant1003': 'Voor dat account mislukte de aanmelding (401).' },
          explain: 'klant1017. Negen accounts, elk één poging, en de tiende slaagt: dat patroon heet credential stuffing, met elders gelekte wachtwoorden. Authentication Failures (A07).' },
        { q: 'Welk principe dekt het grootste deel van injectie-problemen af?', options: ['Data en code strikt gescheiden houden', 'Langere wachtwoorden', 'Meer servers gebruiken'], answer: 0, explain: 'Als invoer nooit als instructie wordt uitgevoerd, verdwijnt het grootste deel van de injectierisico\'s.' },
        { q: 'Wat doe je als je per ongeluk een echt lek in een website van een ander vindt?', options: ['Verantwoord melden via CVD bij de eigenaar of het NCSC, en niet misbruiken', 'Het lek zelf uitbuiten om te bewijzen dat het werkt', 'Het online zetten voor iedereen'], answer: 0, explain: 'Responsible disclosure / CVD: meld het netjes en misbruik het niet. Ongeautoriseerd misbruik is strafbaar.' },
        { q: 'Ik kan de tien categorieën van de OWASP Top 10 2025 benoemen en weet dat ik technieken alleen ethisch en legaal toepas.', noAnswer: true },
        { q: 'Hoeveel minuten na de geslaagde aanmelding kreeg de beheerder de eerste melding?', answer: ['7', '7 minuten'],
          hints: ['Je hebt het tijdstip van de geslaagde aanmelding en van de eerste alert nodig.', 'Filter op ALERT voor het tweede tijdstip.', 'Van 03:14:10 tot 03:21:10.'],
          wrong: { '0': 'De begrenzing (429) greep na 25 seconden in, maar dat is geen melding aan een mens. De alert kwam later.' },
          explain: 'Zeven minuten. De begrenzing op het aantal verzoeken (429) werkte eerder, maar toen was de schade al gedaan. En op de negen mislukte aanmeldingen kwam helemaal geen alert: Security Logging & Alerting Failures (A09).' },
        { q: 'Hoeveel bestellingen van ándere klanten heeft de bezoeker op 203.0.113.45 daadwerkelijk te zien gekregen?', boss: true,
          answer: ['10', 'tien'],
          hints: ['Bepaal eerst wie de bezoeker is geworden, en welke bestelling dus van hemzelf is.', 'Filter op het IP-adres en op /bestelling. Niet elk verzoek leverde een bestelling op: kijk naar de statuscode.', 'Tel alleen de regels met 200, en haal de bestelling van het eigen account eraf.'],
          wrong: { '11': 'Je telt de bestelling van het account zelf mee (id 1017). Die mag de ingelogde klant zien.', '14': 'Je telt ook de verzoeken met 404 mee. Bij een 404 bestaat de bestelling niet en is er niets getoond.', '13': 'Je telt de verzoeken met 404 mee. Bij een 404 bestaat de bestelling niet en is er niets getoond.', '16': 'De twee laatste verzoeken kregen een 429 (te veel verzoeken) en drie kregen een 404. Die leverden geen gegevens op.', '0': 'De winkel controleert niet van wie een bestelling is. Elke 200 op een ander id is een ingeziene bestelling.' },
          why: 'Dit getal is wat er in de melding aan de Autoriteit Persoonsgegevens komt te staan: van hoeveel klanten zijn gegevens ingezien. Het log is de enige bron om dat vast te stellen.',
          explain: 'Na de geslaagde aanmelding als klant1017 vraagt de bezoeker de id\'s 1017 tot en met 1032 op. Zestien verzoeken: 1017 is van hemzelf, drie geven 404 en twee 429. Blijven over: 1018, 1019, 1021, 1022, 1023, 1025, 1026, 1027, 1029 en 1030. Een gestolen wachtwoord (A07) gaf toegang tot één account; de ontbrekende eigenaarschapscontrole (A01) maakte er tien van.' },
      ],
    },

    {
      title: 'Taak 8: Wat de Top 10 wel en niet is',
      kind: 'verdieping', optional: true,
      content: `
        <p>De Top 10 is een ranglijst van risicocategorieën. Wie hem als checklist of als testplan gebruikt, komt bedrogen
        uit. Hier lees je hoe de lijst in elkaar zit, welke misverstanden er vaak over bestaan en welke "oplossingen" in de
        praktijk niet werken.</p>

        <h3>Categorieën zijn bakken met CWE's</h3>
        <p>Elke categorie groepeert een aantal <strong>CWE's</strong> (Common Weakness Enumeration): genummerde soorten
        zwakheden. IDOR is bijvoorbeeld CWE-639, SSRF is CWE-918, SQL-injectie CWE-89 en cross-site scripting CWE-79. Een
        pentestrapport noemt vaak beide: de CWE voor de precieze zwakheid, de Top 10-categorie voor de lezer die het
        grote plaatje wil.</p>
        <p>Categorieën overlappen. De foutmelding uit taak 6 is een verkeerd afgehandelde uitzondering (A10), mogelijk
        gemaakt door een verkeerde instelling (A02). Dat is geen fout in de lijst: sinds de editie van 2021 probeert OWASP
        categorieën te benoemen naar de <em>oorzaak</em> in plaats van het symptoom, en één bevinding kan meerdere oorzaken hebben.</p>

        <h3>Andere lijsten voor andere vragen</h3>
        <ul>
          <li><strong>OWASP ASVS</strong>: een lijst met controleerbare eisen. Dit is wél een checklist.</li>
          <li><strong>OWASP Web Security Testing Guide (WSTG)</strong>: hoe je test.</li>
          <li><strong>OWASP API Security Top 10 (2023)</strong>: een aparte lijst voor API's. IDOR heet daar
          <em>Broken Object Level Authorization</em> (BOLA) en staat ook op nummer 1.</li>
        </ul>

        <h3>Oplossingen die het niet zijn</h3>
        <ul>
          <li><strong>Willekeurige id's tegen IDOR.</strong> Een UUID is moeilijker te raden, maar wie er één in handen
          krijgt (uit een gedeelde link, een log, een mail) komt nog steeds binnen. De controle op de server blijft nodig.</li>
          <li><strong>Controle in de browser.</strong> Een knop verbergen of invoer in JavaScript valideren is gebruiksgemak.
          Een aanvaller praat rechtstreeks met de server, zoals jij in het http-lab deed.</li>
          <li><strong>Een WAF als reparatie.</strong> Een web application firewall koopt tijd, maar de kwetsbare code staat
          er nog. Filters zijn te omzeilen; een geparametriseerde query niet.</li>
          <li><strong>Begrenzen per IP-adres alleen.</strong> Bij credential stuffing komen de pogingen vaak van duizenden
          adressen, elk met een paar pogingen. Begrens ook per account, en controleer op gelekte wachtwoorden.</li>
          <li><strong>Parameters voor alles.</strong> Een prepared statement kan waarden parametriseren, geen namen van
          tabellen of kolommen. Komt een sorteerkolom uit de URL, dan vergelijk je die met een vaste lijst van toegestane
          namen (allow-list).</li>
          <li><strong>Eén soort codering tegen XSS.</strong> Uitvoer moet worden gecodeerd voor de plek waar ze terechtkomt:
          HTML, een attribuut, JavaScript of een URL vragen elk iets anders. Laat dat aan het template-systeem over.</li>
        </ul>

        <h3>Hoe het in de praktijk gaat</h3>
        <p>De meeste teams vinden deze fouten niet met een pentest aan het eind, maar eerder: door code-review (zoals in
        taak 4), door afhankelijkheden automatisch te scannen bij elke build (taak 3), en door bij elk nieuw onderdeel de
        vraag te stellen wie het mag gebruiken en wat er gebeurt als het misgaat.</p>
      `,
      questions: [
        { q: 'Een ontwikkelaar vervangt de oplopende bestelnummers door willekeurige UUID\'s en verandert verder niets. Is de IDOR daarmee verholpen? (ja of nee)', answer: ['nee', 'nee.'],
          hints: ['Vraag je af wat de server nu controleert dat hij eerst niet controleerde.', 'Raden wordt moeilijker. Maar wat als iemand een geldig id te zien krijgt?', 'De eigenaarschapscontrole ontbreekt nog steeds.'],
          wrong: { 'ja': 'Het id is moeilijker te raden, maar de server controleert nog steeds niet van wie de bestelling is. Wie een id onderschept of doorgestuurd krijgt, ziet de bestelling.' },
          explain: 'Nee. Het lek is de ontbrekende controle, niet het voorspelbare nummer. Een willekeurig id is hooguit een extra laag.' },
        { q: 'Een pagina sorteert op een kolomnaam uit de URL (?sorteer=prijs). Kun je die kolomnaam als vraagteken-parameter in een prepared statement meegeven? (ja of nee)', answer: ['nee', 'nee.'],
          hints: ['Bedenk wat een parameter in een prepared statement mag vervangen.', 'Parameters staan op de plek van waarden, niet van onderdelen van de query zelf.', 'Voor namen van kolommen en tabellen is een andere aanpak nodig.'],
          wrong: { 'ja': 'Een parameter vervangt een waarde. Een kolomnaam is onderdeel van de structuur van de query en kan zo niet worden meegegeven.' },
          explain: 'Nee. Vergelijk de invoer met een vaste lijst van toegestane kolomnamen en gebruik alleen een naam uit die lijst.' },
        { q: 'Een opdrachtgever vraagt: "Aan welke concrete eisen moet onze applicatie voldoen, zodat we dat kunnen laten toetsen?" Naar welk document verwijs je?', options: ['De OWASP Top 10', 'OWASP ASVS', 'De OWASP API Security Top 10', 'De CWE-lijst'], answer: 1,
          wrong: { 0: 'De Top 10 is een bewustwordingsdocument met risicocategorieën, geen lijst met toetsbare eisen.', 2: 'Ook dat is een ranglijst van risico\'s, gericht op API\'s.', 3: 'CWE is een catalogus van soorten zwakheden, geen eisenpakket.' },
          explain: 'ASVS (Application Security Verification Standard) bevat controleerbare eisen op verschillende niveaus.' },
      ],
    },

    {
      title: 'Taak 9: Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examens over webbeveiliging geven je een bevinding of een stukje code en vragen naar de categorie of de beste
        maatregel. De afleiders zijn meestal categorieën die er dicht tegenaan liggen (inloggen tegenover rechten,
        instelling tegenover ontwerp) of maatregelen die helpen maar de oorzaak laten bestaan.</p>
      `,
      questions: [
        { q: 'Tijdens een test verandert een ingelogde gebruiker in een API-aanroep accountId=4471 in accountId=4472. Hij krijgt de facturen van een andere klant te zien. Onder welke categorie van de OWASP Top 10 2025 valt deze bevinding?',
          options: ['A01 Broken Access Control', 'A07 Authentication Failures', 'A05 Injection', 'A04 Cryptographic Failures'], answer: 0,
          wrong: { 1: 'De gebruiker is correct ingelogd; het vaststellen van zijn identiteit ging goed. Wat ontbreekt, is de controle op wat hij daarna mag.', 2: 'Er wordt geen code of commando in de invoer gesmokkeld. De waarde is een gewoon, geldig nummer.', 3: 'Er is niets mis met versleuteling of opslag van geheimen.' },
          explain: 'De server controleert niet of het opgevraagde object bij de ingelogde gebruiker hoort: IDOR, onderdeel van Broken Access Control.' },
        { q: 'In een code-review staat: query = "SELECT * FROM gebruikers WHERE naam = \'" + naam + "\'". Welke aanpassing neemt de oorzaak weg?',
          options: ['Enkele aanhalingstekens uit de invoer verwijderen voordat de query wordt samengesteld', 'De query herschrijven met een parameter en de invoer apart meegeven', 'Een web application firewall voor de applicatie zetten', 'De invoer in de browser controleren met JavaScript'], answer: 1,
          wrong: { 0: 'Een eigen filter mist altijd varianten (andere tekens, coderingen) en beschadigt geldige invoer zoals de naam O\'Brien.', 2: 'Een WAF kan aanvallen tegenhouden, maar de kwetsbare code blijft bestaan en filters zijn te omzeilen.', 3: 'Controle in de browser is te omzeilen door het verzoek rechtstreeks naar de server te sturen.' },
          explain: 'Een geparametriseerde query houdt data en code gescheiden. De andere drie zijn hooguit extra lagen.' },
        { q: 'Een applicatie vraagt bij elke aanroep aan een aparte autorisatiedienst of de gebruiker de actie mag uitvoeren. Als die dienst niet binnen twee seconden antwoordt, vangt de code de time-out af en voert de actie alsnog uit. Welke categorie (2025) en welk principe horen hierbij?',
          options: ['A10 Mishandling of Exceptional Conditions; fail-closed', 'A09 Security Logging & Alerting Failures; meer logging', 'A02 Security Misconfiguration; hardening', 'A07 Authentication Failures; MFA'], answer: 0,
          wrong: { 1: 'Logging is nuttig, maar het probleem is niet dat de time-out onopgemerkt blijft. Het probleem is wat de code ermee doet.', 2: 'Het is geen instelling die verkeerd staat; de code is zo geschreven dat een fout tot toestaan leidt.', 3: 'Het gaat niet om inloggen. De gebruiker is bekend; de vraag is of de actie mag.' },
          explain: 'Bij een fout kiest de code voor toestaan (fail-open). De veilige keuze is weigeren als de controle niet kan worden uitgevoerd. Het gevolg is een toegangsprobleem, maar de oorzaak is de foutafhandeling.' },
        { q: 'Een externe partij meldt een organisatie dat klantgegevens te koop staan. Onderzoek laat zien dat de inbraak vier maanden eerder begon. De mislukte en geslaagde aanmeldingen van de aanvaller stonden al die tijd in een logbestand op de server, maar niemand keek ernaar en er waren geen meldingen ingesteld. Welke categorie beschrijft deze tekortkoming het best?',
          options: ['A07 Authentication Failures', 'A08 Software or Data Integrity Failures', 'A09 Security Logging & Alerting Failures', 'A06 Insecure Design'], answer: 2,
          wrong: { 0: 'Dat kan de manier zijn waarop de aanvaller binnenkwam, maar de vraag gaat over waarom het vier maanden onopgemerkt bleef.', 1: 'Die categorie gaat over ongecontroleerd vertrouwen op code, updates of data.', 3: 'Te algemeen. Er is een categorie die precies dit beschrijft.' },
          explain: 'Er werd wel gelogd, maar niet gealarmeerd. Sinds 2025 staat "Alerting" daarom in de naam van de categorie: een log waar niemand naar kijkt, detecteert niets.' },
      ],
    },
  ],
  terms: [
    { term: 'OWASP', def: 'Open Worldwide Application Security Project: een open, non-profit gemeenschap die gratis kennis en tools over softwarebeveiliging deelt.' },
    { term: 'OWASP Top 10', def: 'Bewustwordingsdocument met de tien belangrijkste beveiligingsrisico\'s voor webapplicaties; geen volledige checklist.' },
    { term: 'Broken Access Control', def: 'A01: toegangscontrole is kapot of afwezig, waardoor gebruikers dingen kunnen zien of doen die niet voor hen bedoeld zijn.' },
    { term: 'IDOR', def: 'Insecure Direct Object Reference: rechtstreeks verwijzen naar een object (bijv. een id in de URL) zonder dat de server je rechten controleert.' },
    { term: 'SSRF', def: 'Server-Side Request Forgery: de server namens jou een verzoek laten doen naar een adres dat je zelf niet mag bereiken; in 2025 onder Broken Access Control.' },
    { term: 'Security Misconfiguration', def: 'A02: onveilige instellingen zoals standaardwachtwoorden, open beheerpanelen of te uitgebreide foutmeldingen.' },
    { term: 'Software Supply Chain Failures', def: 'A03 (nieuw/verschoven): risico\'s door externe bibliotheken, componenten en updates die je code binnenkomen.' },
    { term: 'SBOM', def: 'Software Bill of Materials: een inventaris van alle componenten en bibliotheken die je software gebruikt.' },
    { term: 'Cryptographic Failures', def: 'A04: fouten rond versleuteling en gevoelige data, zoals onversleuteld versturen of verouderde algoritmen gebruiken.' },
    { term: 'Injection', def: 'A05: invoer die wordt vermengd met code/commando\'s, zodat een aanvaller extra instructies injecteert (bijv. SQL-injectie, XSS).' },
    { term: 'Insecure Design', def: 'A06: het ontwerp zelf is onveilig bedacht; geen bug in de code maar een fout plan. Tegengif: threat modeling.' },
    { term: 'Authentication Failures', def: 'A07: fouten in het inlogproces, zoals zwakke wachtwoorden toestaan, geen rate limiting of geen MFA.' },
    { term: 'Integrity Failures', def: 'A08: blind vertrouwen op code, updates of data zonder te controleren of ze onveranderd en van de juiste bron zijn.' },
    { term: 'Mishandling of Exceptional Conditions', def: 'A10 (nieuw): verkeerd omgaan met fouten en uitzonderingen, zoals fail-open of foutmeldingen die details lekken.' },
  ],
  resources: [
    { title: 'OWASP Top Ten (officiële projectpagina)', url: 'https://owasp.org/www-project-top-ten/' },
    { title: 'OWASP Cheat Sheet Series', url: 'https://cheatsheetseries.owasp.org/' },
    { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' },
    { title: 'NCSC (Nederland)', url: 'https://www.ncsc.nl/' },
  ],
});
