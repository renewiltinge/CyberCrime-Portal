/* Room: Infrastructuur-OSINT & pivoting */

// =====================================================================
//  Fictieve pivot-dataset — twee phishingzaken, gebrugd door een
//  HERGEBRUIKT TLS-certificaat (certificate transparency-pivot).
//  Alles fictief: documentatie-IP's (RFC 5737) en .nm.lab-domeinen.
// =====================================================================
const PIVOT_ENTITIES = [
  { id: 'dA', type: 'domain', label: 'betaal-controle.nm.lab' },   // Zaak Alpha
  { id: 'ipA', type: 'ip', label: '203.0.113.10' },
  { id: 'dB', type: 'domain', label: 'inlog-verificatie.nm.lab' }, // Zaak Bravo
  { id: 'ipB', type: 'ip', label: '198.51.100.20' },
  { id: 'cert', type: 'cert', label: 'A1B2C3D4' },                  // ZELFDE cert op beide zaken = de brug
  { id: 'wal', type: 'wallet', label: 'bc1qfictief0alpha' },
  { id: 'mail', type: 'email', label: 'beheer@betaal-controle.nm.lab' },
  // --- twee toegevoegde entiteiten (brug blijft intact) ---
  { id: 'asnA', type: 'asn', label: 'AS64500 · FICTIEF-NET' },
  { id: 'walB', type: 'wallet', label: 'bc1qfictief0bravo' },
];

const PIVOT_EDGES = [
  // Zaak Alpha (januari 2026)
  { from: 'dA', to: 'ipA', rel: 'resolvet naar', time: '2026-01', source: 'passive DNS' },
  { from: 'dA', to: 'cert', rel: 'staat in cert (SAN)', time: '2026-01', source: 'crt.sh' },
  { from: 'dA', to: 'mail', rel: 'WHOIS-contact', time: '2026-01', source: 'WHOIS' },
  { from: 'dA', to: 'wal', rel: 'losgeld-adres in rapport', time: '2026-01', source: 'rapport' },
  { from: 'ipA', to: 'asnA', rel: 'hoort bij ASN', time: '2026-01', source: 'RIPEstat' },
  // Zaak Bravo (februari 2026) — ander IP, maar ZELFDE cert
  { from: 'dB', to: 'ipB', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
  { from: 'dB', to: 'cert', rel: 'staat in cert (SAN)', time: '2026-02', source: 'crt.sh' },
  { from: 'dB', to: 'walB', rel: 'losgeld-adres in rapport', time: '2026-02', source: 'rapport' },
];

CS.registerRoom({
  id: 'osint-pivoting',
  path: 'intelligence',
  order: 5,
  title: 'Infrastructuur-OSINT & pivoting',
  icon: '📡',
  difficulty: 'Moeilijk',
  minutes: 75,
  level: 'Gevorderd',
  checked: '2026-11-12',
  summary: 'Van één aanwijzing naar een heel netwerk: je leert IP\'s, domeinen, certificaten, hashes en wallets als een graaf van entiteiten te zien, met open bronnen stap voor stap te pivoten, de zeldzaamheidstoets toe te passen en binnen de juridische en opsec-grenzen te blijven.',
  objectives: [
    'Het entiteitenmodel van infrastructuur-OSINT benoemen (IP, ASN, domein, certificaat, hash, wallet, alias, e-mail) en als graaf tekenen',
    'Per bron (RIPEstat/WHOIS, passive DNS, crt.sh, Shodan/Censys, VirusTotal, abuse.ch, urlscan) uitleggen wat die oplevert',
    'Fingerprints (JARM, JA3/JA4, favicon-hash, response-headers) herkennen en gebruiken om infrastructuur te clusteren',
    'Pivoten als iteratief proces uitvoeren en elk kenmerk toetsen op zeldzaamheid voordat je het een echte link noemt',
    'Een onderzoek als relatietabel (met tijd en herkomst) vastleggen en uitleggen hoe pandas/networkx bruggen en centrale knopen vinden',
    'De blockchain-basis (common-input- en change-heuristiek, exchanges als knelpunt) en de juridische/opsec-grenzen (art. 126g en 126j Sv, Wet politiegegevens) toepassen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Het entiteitenmodel: alles is een knoop',
      tryFirst: true,
      intro: `<p>Er is een phishingmelding binnengekomen. In het lab liggen zes fragmenten uit verschillende bronnen. Leg ze
        naast elkaar en spring van het ene gegeven naar het volgende om de vragen te beantwoorden. Let op de datums.</p>`,
      content: `
        <p>In de OSINT-room uit het forensie-pad leerde je mensen opsporen: foto's, metadata, gebruikersnamen. Hier draait het om de <strong>infrastructuur</strong> achter een aanval: de servers, domeinen en certificaten die een crimineel gebruikt. De centrale gedachte is simpel maar krachtig: je ziet alles als een <strong>graaf</strong> van <em>entiteiten</em> (knopen) en <em>relaties</em> (lijnen ertussen).</p>

        <p>Denk aan het klassieke prikbord van een rechercheur: foto's en briefjes met touwtjes ertussen. Elk briefje is een entiteit, elk touwtje een relatie. Infrastructuur-OSINT is precies dat, maar dan digitaal en controleerbaar.</p>

        <h3>De acht bouwstenen</h3>
        <table>
          <thead><tr><th>Entiteit</th><th>Wat het is</th></tr></thead>
          <tbody>
            <tr><td><strong>IP-adres</strong></td><td>Het numerieke adres van een server, bijv. <code>203.0.113.10</code>.</td></tr>
            <tr><td><strong>ASN</strong></td><td>Autonomous System Number: het netwerkblok van een provider waar een IP onder valt (bijv. een hostingpartij).</td></tr>
            <tr><td><strong>Domein</strong></td><td>De naam die naar een IP wijst, bijv. <code>betaal-controle.nm.lab</code>.</td></tr>
            <tr><td><strong>Certificaat</strong></td><td>Het TLS-certificaat dat een site aanbiedt voor HTTPS; heeft een unieke vingerafdruk en geldigheid.</td></tr>
            <tr><td><strong>Hash</strong></td><td>De vingerafdruk van een bestand (bijv. een malwaremonster), zoals een SHA-256.</td></tr>
            <tr><td><strong>Wallet</strong></td><td>Een cryptovaluta-adres waar losgeld of buit naartoe gaat.</td></tr>
            <tr><td><strong>Alias</strong></td><td>Een gebruikersnaam, handle of bijnaam die een actor hergebruikt.</td></tr>
            <tr><td><strong>E-mail</strong></td><td>Een adres uit een WHOIS-registratie, een afperserbrief of een registratieformulier.</td></tr>
          </tbody>
        </table>

        <p>Het mooie: deze knopen hangen aan elkaar. Een <em>domein</em> resolvet naar een <em>IP</em>, dat IP valt onder een <em>ASN</em>, het domein presenteert een <em>certificaat</em> en is geregistreerd met een <em>e-mail</em>. Vind je één knoop, dan kun je via de relaties naar de buren springen. Dat springen heet <strong>pivoten</strong>, en daar gaat deze hele room over.</p>

        <h3>Label wat je weet: bekend, afgeleid, aanname</h3>
        <p>Een valkuil is dat je waarnemingen en conclusies door elkaar gaat halen. Houd ze streng uit elkaar met drie labels:</p>
        <ul>
          <li><strong>Bekend</strong> — een harde waarneming uit een bron. "Domein <code>betaal-controle.nm.lab</code> staat in certificaat <code>A1B2C3D4</code> (bron: crt.sh)."</li>
          <li><strong>Afgeleid</strong> — een analytische conclusie uit meerdere bekende feiten. "Beide zaken gebruiken hetzelfde certificaat, dus ze draaien waarschijnlijk op dezelfde opzet."</li>
          <li><strong>Aanname</strong> — iets wat je vermoedt maar niet bewijst. "Het is dezelfde dadergroep." (Nog niet bewezen.)</li>
        </ul>
        <div class="callout tip"><strong>Tip:</strong> schrijf achter elke regel in je dossier welk label hij heeft. Een rechter, een collega of jijzelf over een maand moet kunnen zien wat feit is en wat gok.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'melding 12 juni 2026',
        scenario: 'Op 12 juni 2026 meldt een klant van het fictieve PakketPost een sms met een betaallink. Dit is wat de open bronnen opleveren.',
        records: [
          { title: 'Melding (12-06-2026)', lines: ['sms: "Uw pakket wacht, betaal de toeslag"', 'link: hxxps://mijn-pakket-volgen[.]nm[.]lab/betaal'] },
          { title: 'Passive DNS', lines: ['mijn-pakket-volgen.nm.lab A 198.51.100.140', 'gezien: 2026-05-20 t/m 2026-06-02', 'mijn-pakket-volgen.nm.lab A 192.0.2.61', 'gezien: 2026-06-03 t/m 2026-06-19'] },
          { title: 'RIPEstat', lines: ['198.51.100.0/24: AS64499 NOORDWOLK', '192.0.2.0/24: AS64507 KELDERHOST'] },
          { title: 'WHOIS', lines: ['domein: mijn-pakket-volgen.nm.lab', 'geregistreerd: 2026-05-19', 'contact: domeinen@kwikmail.example'] },
          { title: 'crt.sh', lines: ['certificaat 4C:7E:02:D1, uitgegeven 2026-05-20', 'SAN: mijn-pakket-volgen.nm.lab', 'SAN: pakket-herbezorgen.nm.lab'] },
          { title: 'Forumpost (2026-05-11)', lines: ['gebruiker: vrachtbrief', '"pakket-kit v3 te koop, inclusief hosting"', 'contact: domeinen@kwikmail.example'] },
        ],
      },
      questions: [
        { q: 'Hoe modelleer je infrastructuur-OSINT, in één woord?', options: ['Als een lijstje', 'Als een graaf van entiteiten en relaties', 'Als een tijdlijn', 'Als een foto'], answer: 1, explain: 'Entiteiten zijn knopen, relaties zijn de lijnen ertussen; vind je één knoop, dan pivoteer je langs de relaties naar de buren.' },
        { q: 'Onder welk ASN viel het domein uit de melding op de dag van de melding (12 juni 2026)?', answer: ['AS64507', '64507', 'AS 64507'],
          hints: ['Een domein valt niet onder een ASN; het IP-adres waar het naar wijst wel. Je hebt dus twee sprongen nodig.', 'Passive DNS geeft twee IP-adressen, elk met een periode. Kies het adres dat op 12 juni gold en zoek dat netwerk op in RIPEstat.', 'Op 12 juni wees het domein naar 192.0.2.61.'],
          wrong: { 'as64499': 'Dat was het ASN tot en met 2 juni. Op 3 juni verhuisde het domein naar een ander IP-adres. Daarom hoort er bij elke relatie een tijd.', '64499': 'Dat was het ASN tot en met 2 juni. Op 3 juni verhuisde het domein naar een ander IP-adres. Daarom hoort er bij elke relatie een tijd.', '192.0.2.61': 'Dat is het IP-adres. Zoek in RIPEstat onder welk ASN dat netwerk valt.' },
          why: 'Een verzoek aan de verkeerde hoster kost dagen. Infrastructuur verhuist, dus je kijkt altijd naar de relatie die gold op het moment van het feit.',
          explain: 'Domein naar IP (passive DNS, periode 3 t/m 19 juni: 192.0.2.61), IP naar ASN (RIPEstat: AS64507).' },
        { q: 'Welke alias hangt via één gedeelde entiteit aan het domein uit de melding?', answer: ['vrachtbrief'],
          hints: ['Zoek een gegeven dat in twee fragmenten letterlijk hetzelfde is.', 'Vergelijk het WHOIS-contact met de forumpost.', 'Het e-mailadres domeinen@kwikmail.example staat in beide.'],
          wrong: { 'domeinen@kwikmail.example': 'Dat is de gedeelde entiteit zelf (een e-mailadres). Gevraagd is de alias die eraan hangt.', 'kelderhost': 'Dat is de naam van de hoster, geen alias van een persoon.' },
          explain: 'Het WHOIS-contact en het contactadres in de forumpost zijn hetzelfde e-mailadres. Dat is een afgeleide link, nog geen bewijs dat "vrachtbrief" de dader is.' },
        { q: 'Welk tweede domein staat in hetzelfde certificaat als het domein uit de melding?', answer: ['pakket-herbezorgen.nm.lab', 'pakket-herbezorgen[.]nm[.]lab'],
          hints: ['Eén bron laat zien welke hostnamen samen in een certificaat staan.', 'Kijk naar de SAN-regels in het fragment van crt.sh.', 'Het begint met pakket-.'],
          explain: 'crt.sh toont twee SAN-namen in certificaat 4C:7E:02:D1. Het tweede domein is een nieuwe knoop om vanaf verder te zoeken.' },
      ],
    },

    {
      title: 'Taak 2 — De bronnen: wat levert elke put op?',
      tryFirst: true,
      intro: `<p>In het lab staan zestien onderzoeksvragen. Elke vraag beantwoord je met één van vier bronnen. Groepeer ze
        per bron. Weet je bij een vraag niet waar je moet zijn, dan staat de tabel met bronnen in de uitleg.</p>`,
      content: `
        <p>Een rechercheur die niet weet wélke la hij moet opentrekken, graaft eindeloos. Infrastructuur-OSINT heeft een vaste set open bronnen, en elke bron levert een ander soort entiteit of relatie. Ken ze, dan weet je bij elke vraag meteen waar je moet zijn.</p>

        <table>
          <thead><tr><th>Bron</th><th>Wat je eruit haalt</th><th>Levert vooral</th></tr></thead>
          <tbody>
            <tr><td><strong>RIPEstat / WHOIS</strong></td><td>Wie bezit of beheert een IP, ASN of domein: netblokken, registratiedatum, contactgegevens.</td><td>ASN, IP, e-mail</td></tr>
            <tr><td><strong>Passive DNS</strong></td><td>Historische koppelingen tussen domein en IP: welk domein wees wanneer naar welk IP.</td><td>domein &harr; IP (met tijd)</td></tr>
            <tr><td><strong>Certificate Transparency / crt.sh</strong></td><td>Alle uitgegeven TLS-certificaten voor een domein, plus de extra hostnamen (SAN's) en gedeelde certificaten.</td><td>certificaat, domein</td></tr>
            <tr><td><strong>Shodan / Censys</strong></td><td>Welke diensten, poorten en banners op een IP draaien, plus fingerprints zoals JARM.</td><td>IP, dienst, fingerprint</td></tr>
            <tr><td><strong>VirusTotal</strong></td><td>Of een bestand, URL, domein of IP kwaadaardig is, en de relaties (gecontacteerde domeinen, droppers).</td><td>hash, domein, IP</td></tr>
            <tr><td><strong>abuse.ch</strong></td><td>Bekende malware- en C2-indicatoren via o.a. URLhaus, ThreatFox, Feodo Tracker en de SSL Blacklist (kwaadaardige TLS-certificaten).</td><td>IP, domein, cert, hash</td></tr>
            <tr><td><strong>urlscan.io</strong></td><td>Wat een pagina dóét bij bezoek: screenshots, geladen resources, redirects en de favicon-hash — zonder dat jij hem hoeft te openen.</td><td>domein, IP, favicon-hash</td></tr>
          </tbody>
        </table>

        <h3>Twee bronnen uitgelicht</h3>
        <p><strong>crt.sh</strong> is je favoriet voor deze room. Certificate Transparency verplicht uitgevers om elk TLS-certificaat in een openbaar logboek te zetten. Daardoor kun je opzoeken welke certificaten voor een domein bestaan — én, andersom, welke <em>andere</em> domeinen in hetzelfde certificaat staan. Dat laatste is pivotgoud.</p>
        <p><strong>urlscan.io</strong> is bijzonder omdat het de pagina voor je bezoekt. Je ziet de favicon, de geladen scripts en eventuele doorverwijzingen zonder zelf naar het verdachte adres te surfen. Dat is ook <em>opsec</em>: jij blijft uit het zicht van de dader (meer daarover in de laatste taak).</p>

        <div class="callout info"><strong>Passief &ne; gratis van consequenties:</strong> de meeste van deze bronnen zijn <em>passief</em> — je bevraagt een archief, niet de server van de dader. Maar één bron is dat níét zonder meer: een bestand uploaden naar VirusTotal is een actieve handeling die sporen achterlaat. Onthoud dat alvast.</div>
      `,
      lab: {
        type: 'connections',
        title: 'welke bron bij welke vraag',
        prompt: 'Vier bronnen: passive DNS, Certificate Transparency (crt.sh), Shodan of Censys, en RIPEstat of WHOIS. Zoek steeds de vier vragen die je met dezelfde bron beantwoordt.',
        flag: 'NM{elke_vraag_zijn_bron}',
        groups: [
          { name: 'Passive DNS', items: ['Waar wees dit domein in maart naar?', 'Welke domeinen stonden ooit op dit IP?', 'Sinds wanneer bestaat dit A-record?', 'Wisselt dit domein vaak van IP?'] },
          { name: 'Certificate Transparency (crt.sh)', items: ['Welke hostnamen staan in de SAN?', 'Wanneer is dit certificaat uitgegeven?', 'Welke CA gaf dit certificaat uit?', 'Welke subdomeinen kregen een certificaat?'] },
          { name: 'Shodan of Censys', items: ['Welke poorten staan open?', 'Welke banner geeft de SSH-dienst?', 'Wat is de JARM van deze server?', 'Welke hosts delen deze favicon-hash?'] },
          { name: 'RIPEstat of WHOIS', items: ['Onder welk ASN valt dit IP?', 'Wie beheert dit netblok?', 'Wanneer is dit domein geregistreerd?', 'Welk abuse-adres hoort bij dit netwerk?'] },
        ],
      },
      questions: [
        { q: 'Welke bron gebruik je om te vinden welke andere domeinen hetzelfde TLS-certificaat presenteren?', options: ['RIPEstat', 'crt.sh (Certificate Transparency)', 'VirusTotal', 'Passive DNS'], answer: 1, explain: 'crt.sh bevraagt de openbare Certificate Transparency-logs; daarmee vind je gedeelde certificaten tussen domeinen.' },
        { q: 'Welke vlag geeft het lab als alle zestien vragen bij de juiste bron staan?', answer: ['NM{elke_vraag_zijn_bron}'],
          hints: ['Begin met de groep waar je zeker van bent. Het lab meldt het als drie van de vier kloppen.', 'Alles met "ooit", "sinds" en "in maart" gaat over geschiedenis van domein en IP. Alles over wat er op een server draait, komt uit een scanner.', 'SAN, CA en uitgiftedatum horen bij crt.sh; ASN, netblok, registratiedatum en abuse-adres bij RIPEstat of WHOIS.'],
          explain: 'Passive DNS geeft geschiedenis van domein en IP, crt.sh alles over certificaten, Shodan en Censys wat er op een server draait, RIPEstat en WHOIS wie iets beheert.' },
        { q: 'Welke dienst laat je zien welke poorten en banners op een IP draaien, inclusief een JARM-fingerprint?', options: ['crt.sh', 'Shodan of Censys', 'WHOIS', 'urlscan.io'], answer: 1, explain: 'Shodan en Censys scannen het internet en tonen open diensten, banners en server-fingerprints zoals JARM.' },
        { q: 'Welke bron geeft specifiek bekende malware- en C2-indicatoren (o.a. URLhaus, ThreatFox, SSL Blacklist)?', answer: ['abuse.ch', 'abuse ch'], hint: 'Een non-profit met projecten als URLhaus en Feodo Tracker.', explain: 'abuse.ch bundelt threat-intel-feeds zoals URLhaus (malware-URL\'s), ThreatFox (IOC\'s) en SSLBL (kwaadaardige certificaten).' },
      ],
    },

    {
      title: 'Taak 3 — Fingerprinting: infrastructuur herkennen aan zijn handtekening',
      tryFirst: true,
      intro: `<p>Een scan leverde acht hosts op met elk vier kenmerken. Een deel hoort bij dezelfde phishing-kit. Klik in het
        lab kenmerken aan om te zien hoeveel hosts ze delen, en bepaal welke hosts bij elkaar horen.</p>`,
      content: `
        <p>Criminelen hergebruiken graag dezelfde opzet. Dezelfde phishing-kit, hetzelfde C2-framework, dezelfde serverconfiguratie — want nieuw bouwen kost tijd. Een <strong>fingerprint</strong> is een korte handtekening die zo'n opzet samenvat. Vind je dezelfde fingerprint op twee plekken, dan heb je een kandidaat-link.</p>

        <h3>De vier die je moet kennen</h3>
        <ul>
          <li><strong>JARM</strong> — een <em>actieve</em> fingerprint van de TLS-<strong>server</strong>. JARM stuurt een paar speciale TLS-hello's en vat samen hoe de server antwoordt. Twee servers met dezelfde JARM draaien waarschijnlijk dezelfde software/config — bijvoorbeeld hetzelfde C2-raamwerk. Let op: JARM is actief, dus het raakt de server van de dader (opsec).</li>
          <li><strong>JA3 / JA4</strong> — een fingerprint van de TLS-<strong>client</strong>: hoe een programma zijn TLS-verbinding opbouwt. Malware die altijd dezelfde bibliotheek gebruikt, heeft steeds dezelfde JA3/JA4. <strong>JA4</strong> is de nieuwere, robuustere opvolger van JA3.</li>
          <li><strong>Favicon-hash</strong> — de hash van het kleine website-icoontje. Phishing-kits kopiëren vaak het hele pakket inclusief favicon, dus dezelfde favicon-hash kan panels aan elkaar knopen. Shodan gebruikt hiervoor een MurmurHash (mmh3).</li>
          <li><strong>Response-headers</strong> — de <code>Server</code>-header, de volgorde van headers, een eigengemaakte header, de titel van de pagina of de precieze 404-pagina. Samen vormen ze een herkenbaar profiel van een panel of kit.</li>
        </ul>

        <div class="callout warn"><strong>Server of client?</strong> Verwar JARM en JA3/JA4 niet. <em>JARM</em> beschrijft de <strong>server</strong> (wat jij scant). <em>JA3/JA4</em> beschrijft de <strong>client</strong> (bijvoorbeeld de malware die verbinding maakt). Een geheugensteun: JAR<strong>M</strong> &rarr; de <strong>M</strong>achine aan de serverkant; JA3/JA4 &rarr; de bezoeker.</div>

        <h3>Fingerprints zijn niet gelijk sterk</h3>
        <p>Een fingerprint is pas bewijs als hij <em>zeldzaam genoeg</em> is. De <code>Server</code>-header <code>nginx</code> staat op miljoenen servers — die zegt niets. Een JARM die hoort bij een populaire standaardconfiguratie is ook zwak. Maar een ongebruikelijke favicon van een zelfgebouwd phishing-panel, of een JARM van een nichetool, kan juist sterk zijn. Die afweging — hoe bijzonder is dit kenmerk? — is de kern van de volgende taak.</p>
      `,
      lab: {
        type: 'fingerprint',
        title: 'acht hosts, vier kenmerken',
        scenario: 'Vertrekpunt is pakket-volgen.nm.lab, een bevestigde phishingsite. Welke andere hosts draaien dezelfde kit?',
        attrs: [
          { key: 'server', label: 'Server-header' },
          { key: 'jarm', label: 'JARM (ingekort)' },
          { key: 'favicon', label: 'Favicon-hash' },
          { key: 'title', label: 'Paginatitel' },
        ],
        hosts: [
          { host: 'pakket-volgen.nm.lab', server: 'nginx', jarm: '29d29d00', favicon: '771204551', title: 'Volg uw pakket' },
          { host: 'pakket-herbezorgen.nm.lab', server: 'nginx', jarm: '29d29d00', favicon: '771204551', title: 'Volg uw pakket' },
          { host: 'zending-status.nm.lab', server: 'nginx', jarm: '29d29d00', favicon: '771204551', title: 'Zending: status' },
          { host: 'webshop-vandijk.example', server: 'nginx', jarm: '29d29d00', favicon: '-305179312', title: 'Van Dijk Fietsen' },
          { host: 'blog.tuinclub.example', server: 'nginx', jarm: '29d29d00', favicon: '116323821', title: 'Tuinclub Oost' },
          { host: 'intranet.kade.example', server: 'Apache', jarm: '07d14d16', favicon: '-98110044', title: 'Welkom' },
          { host: 'forum.schaakbond.example', server: 'nginx', jarm: '29d29d00', favicon: '904417726', title: 'Forum' },
          { host: 'mijn-zending.nm.lab', server: 'cloudflare', jarm: '3fd3fd15', favicon: '771204551', title: 'Volg uw pakket' },
        ],
      },
      questions: [
        { q: 'Hoeveel van de acht hosts delen de favicon-hash van pakket-volgen.nm.lab?', answer: ['4'],
          hints: ['Klik in de tabel op de favicon-hash van de eerste host.', 'Het lab markeert alle rijen met dezelfde waarde en telt ze.', 'Tel de eerste host zelf ook mee.'],
          wrong: { '3': 'Je mist er één. Eén host heeft een andere Server-header en JARM, maar wel dezelfde favicon.', '6': 'Zes is het aantal hosts met dezelfde JARM. De vraag gaat over de favicon-hash.' },
          explain: 'Vier hosts delen favicon-hash 771204551. Het lab noemt dat een onderscheidend kenmerk: gedeeld door een deel van de hosts, niet door bijna allemaal.' },
        { q: 'Wat is JA4 ten opzichte van JA3?', options: ['Een server-fingerprint', 'De nieuwere, robuustere opvolger van de JA3-clientfingerprint', 'Een hashalgoritme voor favicons', 'Een DNS-recordtype'], answer: 1, explain: 'JA3 en JA4 zijn beide client-fingerprints; JA4 is de modernere, robuustere versie.' },
        { q: 'Eén host draait dezelfde kit, maar staat achter een CDN, waardoor zijn Server-header en JARM afwijken. Welke host?', answer: ['mijn-zending.nm.lab', 'mijn-zending[.]nm[.]lab', 'mijn-zending'],
          hints: ['Zoek een host die op de zwakke kenmerken afwijkt maar op de sterke overeenkomt.', 'Klik op de favicon-hash en op de paginatitel van pakket-volgen.nm.lab. Welke gemarkeerde host heeft een andere JARM?', 'Zijn Server-header is cloudflare.'],
          wrong: { 'intranet.kade.example': 'Deze host wijkt overal af: andere header, andere JARM, andere favicon, andere titel. Hij hoort er gewoon niet bij.', 'zending-status.nm.lab': 'Deze host hoort bij het cluster, maar staat niet achter een CDN: Server-header en JARM zijn gelijk aan de rest.' },
          why: 'Achter een CDN zie je de TLS-stack van het CDN, niet die van de server erachter. Wie alleen op JARM clustert, mist precies de hosts die zich het best verstoppen.',
          explain: 'mijn-zending.nm.lab: Server-header cloudflare en een andere JARM, maar dezelfde favicon-hash en paginatitel als de kit.' },
        { q: 'Hoeveel van de acht hosts delen de JARM van pakket-volgen.nm.lab?', answer: ['6'],
          hints: ['Klik op de JARM-waarde van de eerste host.', 'Lees het oordeel dat het lab erbij zet.', 'Het zijn alle hosts met Server-header nginx.'],
          wrong: { '4': 'Vier is het aantal hosts met dezelfde favicon-hash. Klik op de JARM-waarde.', '3': 'Dat is het aantal kit-hosts met deze JARM, maar ook een webshop, een blog en een forum hebben hem.' },
          explain: 'Zes van de acht, waaronder een fietsenwinkel, een tuinclub en een schaakforum. Deze JARM hoort bij een standaardinstallatie van nginx en is dus ruis. Een fingerprint telt pas als hij zeldzaam is.' },
      ],
    },

    {
      title: 'Taak 4 — Pivoten als lus, en de zeldzaamheidstoets',
      tryFirst: true,
      intro: `<p>Je seed is één bestandshash uit een sandboxrapport. Klik in het lab van entiteit naar entiteit en kijk hoe ver
        je komt. Onderweg kom je een zwakke en een sterke link tegen: bepaal zelf welke je vertrouwt.</p>`,
      content: `
        <p>Pivoten is geen rechte lijn maar een <strong>lus</strong>. Je begint met één aanwijzing (een <em>seed</em>: een domein, IP of hash), haalt er een kenmerk bij uit een bron, krijgt nieuwe entiteiten, en springt dáár weer vanaf verder. Elke ronde groeit je graaf — en bij elke nieuwe link stel je dezelfde kritische vraag.</p>

        <figure class="diagram">
          <svg viewBox="0 0 560 170" role="img" aria-label="De pivot-lus: seed, kenmerk ophalen, nieuwe entiteiten, zeldzaamheidstoets">
            <rect x="12" y="66" width="104" height="40" rx="6" stroke="var(--accent)" fill="none" />
            <text x="64" y="90" fill="currentColor" font-size="13" text-anchor="middle">Seed</text>
            <rect x="150" y="66" width="120" height="40" rx="6" stroke="currentColor" fill="none" />
            <text x="210" y="84" fill="currentColor" font-size="13" text-anchor="middle">Kenmerk</text>
            <text x="210" y="99" fill="currentColor" font-size="13" text-anchor="middle">ophalen (bron)</text>
            <rect x="304" y="66" width="120" height="40" rx="6" stroke="currentColor" fill="none" />
            <text x="364" y="84" fill="currentColor" font-size="13" text-anchor="middle">Nieuwe</text>
            <text x="364" y="99" fill="currentColor" font-size="13" text-anchor="middle">entiteiten</text>
            <rect x="452" y="66" width="100" height="40" rx="6" stroke="var(--good)" fill="none" />
            <text x="502" y="84" fill="currentColor" font-size="13" text-anchor="middle">Zeldzaam-</text>
            <text x="502" y="99" fill="currentColor" font-size="13" text-anchor="middle">heidstoets</text>
            <line x1="116" y1="86" x2="150" y2="86" stroke="currentColor" />
            <line x1="270" y1="86" x2="304" y2="86" stroke="currentColor" />
            <line x1="424" y1="86" x2="452" y2="86" stroke="currentColor" />
            <path d="M502 106 L502 140 L64 140 L64 106" stroke="var(--muted)" fill="none" />
            <text x="283" y="156" fill="currentColor" font-size="13" text-anchor="middle">zeldzaam genoeg? leg vast als link en pivoteer verder</text>
          </svg>
          <figcaption>Elke ronde voegt entiteiten toe. De lus stopt niet vanzelf — jij bepaalt met de zeldzaamheidstoets wat een echte link is.</figcaption>
        </figure>

        <h3>De zeldzaamheidstoets</h3>
        <p>De belangrijkste vaardigheid van een pivoteur is <em>niet</em> zoveel mogelijk links leggen, maar de zwakke links eruit gooien. Voor elk gedeeld kenmerk vraag je: <strong>is dit uniek genoeg om een echte verbinding te zijn?</strong></p>
        <ul>
          <li><strong>Sterk (zeldzaam):</strong> een hergebruikt TLS-certificaat, een ongewone zelfgebouwde favicon, een specifiek wallet-adres, een eigengemaakte header.</li>
          <li><strong>Zwak (algemeen):</strong> een gedeelde provider/ASN (duizenden klanten), een <code>Server: nginx</code>-header, een populaire favicon, Cloudflare als IP.</li>
        </ul>
        <p>Een voorbeeld: twee phishingsites delen een <em>favicon</em>. Klinkt verdacht — totdat blijkt dat het de standaard-favicon van een populair CMS is die op tienduizenden sites staat. Zwakke link. Delen diezelfde twee sites een <em>certificaat</em>, dan is dat veel bijzonderder: certificaten zijn specifiek. Sterke link. <strong>Een gedeeld certificaat weegt dus zwaarder dan een gedeelde populaire favicon.</strong></p>

        <div class="callout tip"><strong>Vuistregel:</strong> hoe meer willekeurige dingen een kenmerk zou kunnen delen met toeval, hoe zwakker het is. Twee huizen in dezelfde stad zegt weinig; twee huizen met exact hetzelfde (zelfgemaakte) slot zegt veel.</div>

      `,
      lab: {
        type: 'pivot',
        title: 'van één hash naar een derde domein',
        scenario: 'Seed: de hash van factuur_juli.zip uit een sandboxrapport. Het slachtoffer kent alleen cdn-update.nm.lab en portaal-inlog.nm.lab uit de eigen logs.',
        entities: [
          { id: 'h', type: 'hash', label: '9c1e44af (factuur_juli.zip)' },
          { id: 'd1', type: 'domain', label: 'cdn-update.nm.lab' },
          { id: 'd2', type: 'domain', label: 'portaal-inlog.nm.lab' },
          { id: 'd3', type: 'domain', label: 'factuur-inzien.nm.lab' },
          { id: 'i1', type: 'ip', label: '203.0.113.77' },
          { id: 'i2', type: 'ip', label: '203.0.113.78' },
          { id: 'as', type: 'asn', label: 'AS64502' },
          { id: 'ct', type: 'cert', label: 'B7:44:1C:0E' },
          { id: 'm', type: 'email', label: 'r.verhage@snelpost.example' },
        ],
        edges: [
          { from: 'h', to: 'd1', rel: 'maakt verbinding met', time: '2026-07', source: 'sandboxrapport' },
          { from: 'd1', to: 'i1', rel: 'resolvet naar', time: '2026-07', source: 'passive DNS' },
          { from: 'd1', to: 'ct', rel: 'staat in cert (SAN)', time: '2026-07', source: 'crt.sh' },
          { from: 'd2', to: 'i1', rel: 'resolvet naar', time: '2026-07', source: 'passive DNS; in totaal 2 domeinen op dit adres' },
          { from: 'i1', to: 'as', rel: 'hoort bij ASN', time: '2026-07', source: 'RIPEstat; grote hoster, ruim 40.000 adressen' },
          { from: 'i2', to: 'as', rel: 'hoort bij ASN', time: '2026-07', source: 'RIPEstat; grote hoster, ruim 40.000 adressen' },
          { from: 'd3', to: 'i2', rel: 'resolvet naar', time: '2026-07', source: 'passive DNS' },
          { from: 'd2', to: 'm', rel: 'WHOIS-contact', time: '2026-06', source: 'WHOIS' },
          { from: 'd3', to: 'm', rel: 'WHOIS-contact', time: '2026-07', source: 'WHOIS' },
        ],
      },
      questions: [
        { q: 'Waarom is pivoten een "lus" en geen rechte lijn?', options: ['Omdat je altijd terugkeert naar de eerste bron', 'Omdat elke nieuwe entiteit weer een nieuw vertrekpunt is om verder te pivoten', 'Omdat het eindeloos duurt', 'Omdat de volgorde niet uitmaakt'], answer: 1, explain: 'Elke gevonden entiteit is een nieuwe seed; je haalt er weer een kenmerk bij en de graaf groeit ronde na ronde.' },
        { q: 'Twee verdachte sites delen hetzelfde kenmerk. Welk kenmerk is het STERKSTE bewijs voor een echte link?', options: ['Dezelfde provider (ASN)', 'Een "Server: nginx"-header', 'Een hergebruikt, specifiek TLS-certificaat', 'Een populaire standaard-favicon'], answer: 2, explain: 'Een specifiek certificaat is zeldzaam; provider, nginx-header en een populaire favicon komen massaal voor en zijn dus zwak.' },
        { q: 'Pivoteer vanaf de hash. Welk derde domein, dat het slachtoffer nog niet kende, vind je?', answer: ['factuur-inzien.nm.lab', 'factuur-inzien[.]nm[.]lab', 'factuur-inzien'],
          hints: ['Klik op de hash en volg telkens een relatie naar een buur die je nog niet hebt bekeken.', 'Van de hash naar het eerste domein, dan naar het IP-adres. Welk ander domein staat op dat adres, en wat hangt daar weer aan?', 'Het WHOIS-contact van portaal-inlog.nm.lab heeft nog een domein geregistreerd.'],
          explain: 'Hash, cdn-update.nm.lab, 203.0.113.77, portaal-inlog.nm.lab, het WHOIS-contact, en dan factuur-inzien.nm.lab. Vijf sprongen vanaf één hash.' },
        { q: 'Er lopen twee routes naar dat derde domein. Via welke entiteit is de link sterk genoeg om vast te leggen? (label)', answer: ['r.verhage@snelpost.example', 'r.verhage[at]snelpost.example', 'r.verhage'],
          hints: ['Pas op elke tussenliggende entiteit de zeldzaamheidstoets toe: hoeveel anderen delen dit kenmerk?', 'Lees bij de relaties de opmerking achter de bron. Eén entiteit wordt gedeeld door tienduizenden adressen.', 'De sterke route loopt via het WHOIS-contact.'],
          wrong: { 'as64502': 'Dit ASN is van een grote hoster met ruim 40.000 adressen. Dat twee IP-adressen eronder vallen, zegt niets.', '203.0.113.78': 'Dit adres hangt alleen via het ASN aan de rest, en dat ASN is een zwakke link.', '203.0.113.77': 'Dit adres verbindt de eerste twee domeinen (sterk: maar twee domeinen op het adres), niet het derde.' },
          why: 'Een graaf laat elke verbinding even dik zien. Leg je een link via een grote hoster vast als bewijs, dan hangt straks half het internet aan je zaak.',
          explain: 'Het e-mailadres r.verhage@snelpost.example registreerde beide domeinen: specifiek en zeldzaam. De route via AS64502 is ruis.' },
      ],
    },

    {
      title: 'Taak 5 — De pivot-sandbox: verbind Zaak Alpha en Zaak Bravo',
      tryFirst: true,
      intro: `<p>Twee fictieve phishingzaken: Zaak Alpha rond <code>betaal-controle.nm.lab</code> en Zaak Bravo rond
        <code>inlog-verificatie.nm.lab</code>. Je teamleider vraagt: horen ze bij elkaar? Zoek het uit in de sandbox.</p>`,
      content: `
        <p>Tijd om het te doen. Je hebt twee fictieve phishingzaken op je bord. Alles hieronder is verzonnen: documentatie-IP's en <code>.nm.lab</code>-domeinen, nooit echte infrastructuur.</p>
        <ul>
          <li><strong>Zaak Alpha</strong> (januari 2026): het domein <code>betaal-controle.nm.lab</code>, dat naar <code>203.0.113.10</code> resolvet.</li>
          <li><strong>Zaak Bravo</strong> (februari 2026): het domein <code>inlog-verificatie.nm.lab</code>, dat naar <code>198.51.100.20</code> resolvet.</li>
        </ul>
        <p>De vraag van je teamleider: <em>horen deze twee zaken bij elkaar?</em> De IP-adressen verschillen, dus op het eerste gezicht lijken het losse incidenten. Maar pivoteer verder.</p>

        <h3>Zo gebruik je de sandbox</h3>
        <ol>
          <li>Klik links een entiteit aan. Je ziet rechts zijn relaties, telkens <strong>mét tijd en herkomst</strong> (bijv. "staat in cert (SAN) · 2026-01 · bron: crt.sh").</li>
          <li>Klik in de relatielijst door naar een buur-entiteit om verder te pivoten.</li>
          <li>Begin bij <code>betaal-controle.nm.lab</code> (Alpha), bekijk zijn kenmerken, en doe hetzelfde voor <code>inlog-verificatie.nm.lab</code> (Bravo).</li>
          <li>Zoek het ene kenmerk dat in <strong>beide</strong> zaken terugkomt. Pas de zeldzaamheidstoets toe: is het uniek genoeg?</li>
        </ol>

        <div class="callout info"><strong>Denk in labels:</strong> wat je in de sandbox ziet is <em>bekend</em> (waarnemingen uit bronnen). Dat beide domeinen in hetzelfde certificaat staan terwijl hun IP's verschillen, is <em>afgeleid</em> bewijs dat het dezelfde opzet is. Dat het dezelfde persoon of groep is, blijft voorlopig een <em>aanname</em> — daarvoor heb je meer nodig.</div>

        <p>Typ je antwoord in het controleveld van de sandbox (het label of het type van het bruggende kenmerk). Noteer daarna je conclusie ook hieronder bij de vragen.</p>
      `,
      lab: {
        type: 'pivot',
        title: 'Zaak Alpha vs. Zaak Bravo',
        scenario: 'Twee fictieve phishingzaken met verschillende IP-adressen. Pivoteer langs de relaties (let op tijd en herkomst) en vind het ene kenmerk dat beide zaken verbindt. Alles is fictief: documentatie-IP\'s en .nm.lab-domeinen.',
        entities: PIVOT_ENTITIES,
        edges: PIVOT_EDGES,
        goal: 'Welk kenmerk verbindt Zaak Alpha en Zaak Bravo? (typ het label of het type)',
        bridge: ['A1B2C3D4', 'cert', 'certificaat'],
      },
      questions: [
        { q: 'Welk gedeeld kenmerk (het label) verbindt Zaak Alpha en Zaak Bravo?', answer: ['A1B2C3D4', 'certificaat a1b2c3d4', 'cert a1b2c3d4'],
          hints: ['De IP-adressen verschillen. Zoek een entiteit die aan allebei de domeinen hangt.', 'Klik beide domeinen aan en vergelijk hun relaties. Let op de bron crt.sh.', 'Het is de entiteit van het type cert; typ het label van acht tekens.'],
          wrong: { 'certificaat': 'Dat is het type. Gevraagd is het label: in een dossier wil je precies weten wélk certificaat.', 'cert': 'Dat is het type. Gevraagd is het label: in een dossier wil je precies weten wélk certificaat.', '/^as64500/': 'Het ASN hangt alleen aan het IP-adres van Zaak Alpha, en een provider is bovendien een zwak kenmerk.', '/^bc1q/': 'Elke zaak heeft een eigen wallet; ze overlappen niet.' },
          explain: 'Beide domeinen staan in hetzelfde TLS-certificaat A1B2C3D4 (bron: crt.sh). De IP-adressen (203.0.113.10 en 198.51.100.20) verschillen, maar het hergebruikte, zeldzame certificaat verbindt de zaken.' },
        { q: 'Onder welk ASN valt het IP-adres van Zaak Alpha?', answer: ['AS64500', '64500', 'AS64500 · FICTIEF-NET', 'AS64500 FICTIEF-NET'],
          hints: ['Een ASN hangt aan een IP-adres, niet aan een domein.', 'Klik op 203.0.113.10 en lees de relatie met bron RIPEstat.', 'Het begint met AS645.'],
          explain: 'betaal-controle.nm.lab resolvet naar 203.0.113.10, en dat adres hoort volgens RIPEstat bij AS64500. Voor Zaak Bravo is het ASN niet opgezocht: dat gat hoort in je dossier te staan.' },
        { q: 'De IP-adressen van Alpha en Bravo verschillen. Waarom is dat geen bewijs dat het losse zaken zijn?', options: ['IP-adressen zijn nooit betrouwbaar', 'Omdat een ander, zeldzamer kenmerk (het certificaat) juist wél overlapt en zwaarder weegt', 'Omdat IP-adressen niet bestaan in OSINT', 'Omdat het toeval is'], answer: 1, explain: 'Verschillende IP\'s sluiten een link niet uit. Het gedeelde, zeldzame certificaat is sterker bewijs dan het verschil in (makkelijk te wisselen) IP-adressen.' },
        { q: 'Welk label hoort bij de uitspraak "het is dezelfde dadergroep" in deze zaak?', options: ['Bekend', 'Afgeleid', 'Aanname', 'Bewezen'], answer: 2, explain: 'Het gedeelde certificaat is bekend; "dezelfde opzet" is afgeleid; "dezelfde dadergroep" blijft een aanname tot je het onderbouwt met meer bewijs.' },
      ],
    },

    {
      title: 'Taak 6 — De graaf vastleggen en laten rekenen',
      tryFirst: true,
      intro: `<p>In het lab staat een relatietabel van twee phishingzaken, één uit augustus en één uit september 2026. Zoek uit
        welke knoop de twee clusters verbindt, en controleer of elke regel als bewijs bruikbaar is.</p>`,
      content: `
        <p>Een onderzoek dat alleen in je hoofd zit, is niet navolgbaar. Leg je graaf daarom vast als een <strong>relatietabel</strong>: één regel per relatie, met altijd <strong>tijd</strong> en <strong>herkomst</strong> erbij. Precies zoals de sandbox het toonde.</p>

        <table>
          <thead><tr><th>Van</th><th>Relatie</th><th>Naar</th><th>Tijd</th><th>Herkomst</th></tr></thead>
          <tbody>
            <tr><td>betaal-controle.nm.lab</td><td>staat in cert (SAN)</td><td>A1B2C3D4</td><td>2026-01</td><td>crt.sh</td></tr>
            <tr><td>inlog-verificatie.nm.lab</td><td>staat in cert (SAN)</td><td>A1B2C3D4</td><td>2026-02</td><td>crt.sh</td></tr>
            <tr><td>betaal-controle.nm.lab</td><td>resolvet naar</td><td>203.0.113.10</td><td>2026-01</td><td>passive DNS</td></tr>
          </tbody>
        </table>

        <p>Waarom tijd en herkomst verplicht zijn: <strong>tijd</strong> omdat infrastructuur verandert (een domein wees in januari naar een ander IP dan in juni), en <strong>herkomst</strong> omdat een collega moet kunnen controleren waar een regel vandaan komt. Zonder die twee kolommen is je tabel een mening, geen bewijs.</p>

        <h3>Laat de computer het zware werk doen</h3>
        <p>Bij een handvol knopen zie je de brug zo. Bij honderden knopen niet meer. Dan laad je de tabel in <strong>pandas</strong> (een Python-bibliotheek voor tabellen) en bouw je er met <strong>networkx</strong> (voor grafen) een graaf van. Twee berekeningen zijn hier goud waard:</p>
        <ul>
          <li><strong>Scharnierpunten vinden.</strong> Een <em>scharnierpunt</em> (articulation point) is een knoop die, als je hem weghaalt, de graaf in stukken laat vallen. (Een <em>brug</em> is hetzelfde voor een lijn; in een graaf zonder lussen is élke lijn een brug, dus daar zegt dat weinig.) In onze zaak is het gedeelde certificaat precies zo'n scharnierpunt: hij is de enige verbinding tussen cluster Alpha en cluster Bravo.</li>
          <li><strong>Centraliteit meten.</strong> Centraliteit zegt hoe "belangrijk" een knoop is. Een knoop waar veel verbindingen doorheen lopen (hoge <em>betweenness</em>) is vaak een spil — bijvoorbeeld een server of wallet die meerdere zaken verbindt.</li>
        </ul>

        <p>Zo zou je het opzetten (ter illustratie — we draaien dit hier niet en tonen geen uitvoer):</p>
        <pre><code>import pandas as pd
import networkx as nx

df = pd.read_csv("relaties.csv")          # kolommen: van, naar, relatie, tijd, herkomst
G = nx.from_pandas_edgelist(df, "van", "naar")

list(nx.articulation_points(G))           # welke knopen houden de graaf bij elkaar? (in een boom is elke lijn een 'brug')
nx.betweenness_centrality(G)              # welke knoop is de spil?</code></pre>

        <div class="callout tip"><strong>Tip:</strong> de code is het gereedschap, niet de conclusie. Een gevonden "brug" is een <em>afgeleide</em> die je nog moet toetsen op zeldzaamheid: een brug via een gedeeld certificaat is sterk, een brug via een gedeelde Cloudflare-IP is zwak.</div>
      `,
      lab: {
        type: 'logs',
        title: 'relaties.csv',
        lines: `van;relatie;naar;tijd;herkomst
toeslag-check.nm.lab;resolvet naar;203.0.113.150;2026-08;passive DNS
toeslag-check.nm.lab;staat in cert (SAN);C9:02:AA:31;2026-08;crt.sh
toeslag-check.nm.lab;WHOIS-contact;hostmaster@toeslag-check.nm.lab;2026-08;WHOIS
203.0.113.150;hoort bij ASN;AS64503;2026-08;RIPEstat
toeslag-check.nm.lab;laadt script van;stat-teller.nm.lab;2026-08;urlscan
stat-teller.nm.lab;resolvet naar;203.0.113.151;2026-08;passive DNS
stat-teller.nm.lab;stuurt formulierdata naar;inbox-7731@postduif.example;2026-08;urlscan
energie-teruggave.nm.lab;resolvet naar;198.51.100.88;2026-09;passive DNS
energie-teruggave.nm.lab;staat in cert (SAN);41:7B:D0:5E;2026-09;crt.sh
198.51.100.88;hoort bij ASN;AS64509;2026-09;RIPEstat
energie-teruggave.nm.lab;laadt script van;klik-meter.nm.lab;2026-09;urlscan
klik-meter.nm.lab;resolvet naar;198.51.100.89;2026-09;
klik-meter.nm.lab;stuurt formulierdata naar;inbox-7731@postduif.example;2026-09;urlscan`,
      },
      questions: [
        { q: 'Eén regel in relaties.csv is niet navolgbaar. Welk regelnummer in de viewer?', answer: ['13', 'regel 13'],
          hints: ['Elke regel hoort vijf gevulde velden te hebben.', 'Zoek een regel die op een puntkomma eindigt: daar is het laatste veld leeg.', 'Het is een regel over klik-meter.nm.lab.'],
          wrong: { '12': 'De kopregel is regel 1 in de viewer. Kijk naar het regelnummer dat links staat.' },
          explain: 'Regel 13: klik-meter.nm.lab resolvet naar 198.51.100.89, zonder herkomst. Een collega kan niet nagaan waar dit vandaan komt.' },
        { q: 'Wat is een "brug" in een graaf?', options: ['De grootste knoop', 'Een lijn die, weggehaald, de graaf in twee losse delen laat vallen', 'Een dubbele relatie', 'Een knoop zonder relaties'], answer: 1, explain: 'Een brug is de enige verbinding tussen twee clusters; in onze zaak is dat de lijn naar het gedeelde certificaat.' },
        { q: 'Welke knoop verbindt het cluster van augustus met dat van september? Haal je hem weg, dan valt de graaf in twee stukken.', answer: ['inbox-7731@postduif.example', 'inbox-7731', 'inbox-7731[at]postduif.example'],
          hints: ['Zoek een waarde in de kolom "naar" die zowel bij 2026-08 als bij 2026-09 voorkomt.', 'Certificaten, IP-adressen en ASN\'s verschillen per zaak. Filter eens op urlscan.', 'Het is een e-mailadres waar de formulierdata naartoe gaat.'],
          wrong: { '/^as645/': 'De twee zaken staan bij verschillende ASN\'s (AS64503 en AS64509).', '/nm\\.lab$/': 'Elk domein komt maar in één van de twee clusters voor. Zoek een knoop die in beide maanden opduikt.' },
          why: 'Een scharnierpunt is ook het beste aangrijppunt: één vordering bij de mailprovider raakt hier beide zaken tegelijk.',
          explain: 'Beide scripts sturen de ingevulde gegevens naar inbox-7731@postduif.example. In networkx zou nx.articulation_points(G) deze knoop teruggeven, naast de knopen binnen elk cluster.' },
      ],
    },

    {
      title: 'Taak 7 — Blockchain-pivots, en de grenzen van de wet en opsec',
      content: `
        <p>De laatste entiteit uit onze zaak is de <strong>wallet</strong>: het cryptovaluta-adres waar het losgeld naartoe moest. Veel mensen denken dat crypto anoniem is. Het is beter gezegd <em>pseudoniem</em>: elke transactie staat openbaar en voor altijd op de blockchain. Dat is <strong>bekend</strong> bewijs dat je kunt volgen — mits je de heuristieken kent.</p>

        <h3>Twee basisheuristieken</h3>
        <ul>
          <li><strong>Common-input-heuristiek.</strong> Als één transactie geld uit meerdere adressen tegelijk uitgeeft, moet de verzender de sleutels van al die adressen hebben. <em>Afgeleid:</em> die adressen horen waarschijnlijk bij dezelfde entiteit. Zo "cluster" je losse adressen tot één portemonnee.</li>
          <li><strong>Change-heuristiek (wisselgeld).</strong> Betaal je met een groot briefje, dan krijg je wisselgeld terug. Bij crypto gaat het wisselgeld naar een nieuw adres van de betaler zelf. Herken je die wisselgeld-output (vaak een vers adres, geen rond bedrag), dan weet je welk nieuw adres óók weer van de dader is — en kun je verder volgen.</li>
        </ul>

        <h3>Exchanges: waar het pseudoniem breekt</h3>
        <p>Zolang geld tussen zelfgemaakte adressen rondgaat, blijft het pseudoniem. Maar op een gegeven moment wil een crimineel cashen, en dan komt het geld binnen bij een <strong>exchange</strong> (een wisselkantoor). Daar geldt vaak een identificatieplicht (KYC — Know Your Customer). De exchange is daardoor het <strong>knelpunt</strong>: het punt waar het pseudonieme spoor een echte identiteit kan krijgen. Niet door jou met OSINT, maar via een <em>justitieel verzoek</em> aan de exchange. <em>Aanname om te vermijden:</em> dat een cluster altijd precies één persoon is — mixers en CoinJoin kunnen clusters juist samenvoegen of verknippen.</p>

        <h3>De grenzen: wet en opsec</h3>
        <p>Infrastructuur-OSINT lijkt vrijblijvend, maar je werkt met persoonsgegevens en raakt aan opsporingsbevoegdheden. Twee kaders:</p>
        <ul>
          <li><strong>Stelselmatig observeren (art. 126g Sv; met heimelijke interactie art. 126j Sv).</strong> Af en toe iets opzoeken is iets anders dan iemand <em>stelselmatig</em> volgen tot je een compleet beeld van zijn leven krijgt. Stelselmatige informatie-inwinning door opsporing is een bevoegdheid met voorwaarden; zie <a href="https://wetten.overheid.nl/BWBR0001903" target="_blank" rel="noopener">het Wetboek van Strafvordering</a>. Als leerling of burger doe je dit niet op eigen houtje.</li>
          <li><strong>Wet politiegegevens (Wpg).</strong> Politiegegevens mogen alleen voor een bepaald doel worden verwerkt en bewaard; zie <a href="https://wetten.overheid.nl/BWBR0022463" target="_blank" rel="noopener">de Wet politiegegevens</a>. Verzamel niet meer dan nodig (dataminimalisatie) en leg je grondslag vast.</li>
          <li><strong>Passief vs. actief.</strong> Een archief bevragen (crt.sh, passive DNS, RIPEstat) is <em>passief</em>: de dader merkt er niets van. De verdachte server zélf benaderen (hem bezoeken, scannen, een JARM nemen) is <em>actief</em> en kan je verraden of zelfs strafbaar zijn.</li>
        </ul>

        <div class="callout danger"><strong>Het uploadrisico — onthoud dit goed:</strong> gooi je een verdacht bestand naar VirusTotal, dan wordt die sample zichtbaar voor anderen (ook voor de dader, die zijn eigen hashes in de gaten houdt). Je tipt hem dat hij ontdekt is, en hij ruimt zijn infrastructuur op vóór je klaar bent. Hetzelfde geldt voor het actief bezoeken van zijn site. Daarom geldt de regel: <strong>NM{deel_geen_sample}</strong> — upload of bezoek niets zonder je af te vragen wie er meekijkt.</div>
      `,
      lab: {
        type: 'chaintrace',
        title: 'losgeld van Alpha en Bravo',
        unit: 'BTC',
        scenario: 'De losgeld-adressen uit Zaak Alpha (1,2 BTC) en Zaak Bravo (0,8 BTC) zijn leeggehaald. Volg het geld. Alles is fictief.',
        labels: { A: 'bc1qfictief0alpha', B: 'bc1qfictief0bravo', V: 'bc1qfictief5m2k', W: 'bc1qfictief9x4t', M: 'bc1qfictief3p7d', K: 'bc1qfictief8s1n', R: 'bc1qfictief2h6c', X: 'bc1qfictief4j9w', Y: 'bc1qfictief6q0z', EX1: 'Exchange Noordzee (stortadres)', EX2: 'Exchange Polder (stortadres)' },
        exchanges: ['EX1', 'EX2'],
        origins: [
          { addr: 'A', amount: 1.2 },
          { addr: 'B', amount: 0.8 },
          { addr: 'K', amount: 2.0, dirty: false },
          { addr: 'X', amount: 0.7, dirty: false },
        ],
        txs: [
          { inputs: ['A', 'B'], outputs: [{ addr: 'V', amount: 1.5 }, { addr: 'W', amount: 0.5 }], time: '2026-02-10' },
          { inputs: ['V'], outputs: [{ addr: 'EX1', amount: 1.0 }, { addr: 'M', amount: 0.5 }], time: '2026-02-11' },
          { inputs: ['X'], outputs: [{ addr: 'Y', amount: 0.7 }], time: '2026-02-12' },
          { inputs: ['M', 'K'], outputs: [{ addr: 'EX2', amount: 2.2 }, { addr: 'R', amount: 0.3 }], time: '2026-02-14' },
        ],
      },
      questions: [
        { q: 'Hoeveel vuil geld (in BTC) bereikt het stortadres bij Exchange Polder volgens het lab?', answer: ['0.44', '0,44', '0.44 BTC', '0,44 BTC'],
          hints: ['Het saldo op een adres is niet hetzelfde als het vuile deel ervan.', 'Kijk in het adres-overzicht naar de kolom Taint bij Exchange Polder.', 'Het is 20% van 2,2 BTC.'],
          wrong: { '2.2': 'Dat is het hele saldo. Het grootste deel komt van een adres met schoon geld; alleen het vuile deel telt.', '2,2': 'Dat is het hele saldo. Het grootste deel komt van een adres met schoon geld; alleen het vuile deel telt.', '0.5': 'Er ging 0,5 BTC vuil geld de transactie in, maar 0,3 BTC van de uitvoer bleef achter op een wisselgeldadres. De taint wordt naar rato verdeeld.', '0,5': 'Er ging 0,5 BTC vuil geld de transactie in, maar 0,3 BTC van de uitvoer bleef achter op een wisselgeldadres. De taint wordt naar rato verdeeld.' },
          explain: 'In transactie 4 gaat 0,5 BTC vuil en 2,0 BTC schoon geld samen op: 20% vuil. Van de 2,2 BTC die bij Exchange Polder aankomt, is dus 0,44 BTC vuil. Dit is een rekenmodel (haircut), geen natuurwet.' },
        { q: 'Waarom is een exchange het "knelpunt" in een crypto-onderzoek?', options: ['Daar is het geld weg', 'Daar geldt vaak een identificatieplicht (KYC), dus daar kan het pseudonieme spoor aan een echte identiteit worden gekoppeld', 'Exchanges zijn illegaal', 'Daar stopt de blockchain'], answer: 1, explain: 'Bij een exchange met KYC kan via een justitieel verzoek de identiteit achter een adres bovenkomen; zelfgemaakte adressen blijven pseudoniem.' },
        { q: 'Wat is het risico van een verdacht bestand naar VirusTotal uploaden?', options: ['Het bestand wordt gewist', 'De sample wordt zichtbaar voor anderen, waaronder de dader, die dan gewaarschuwd is', 'VirusTotal is illegaal', 'Er gebeurt niets'], answer: 1, explain: 'Een upload wordt deelbaar/zichtbaar; een alerte dader ziet zijn eigen hash opduiken en ruimt zijn infra op. Dat is een actieve, verradende handeling.' },
        { q: 'Bij welke exchange komt het meeste vuile geld binnen, zodat een vordering daar het meest oplevert? (naam)', answer: ['Exchange Noordzee', 'noordzee'],
          hints: ['Vergelijk de twee stortadressen in het adres-overzicht.', 'Kijk niet naar het saldo maar naar het bedrag tussen haakjes in de kolom Taint.', 'Bij de ene exchange is 100% van het saldo vuil.'],
          wrong: { 'exchange polder': 'Polder heeft het grootste saldo, maar daarvan is maar 20% vuil (0,44 BTC). Bij Noordzee komt 1 BTC vuil geld aan.', 'polder': 'Polder heeft het grootste saldo, maar daarvan is maar 20% vuil (0,44 BTC). Bij Noordzee komt 1 BTC vuil geld aan.' },
          explain: 'Exchange Noordzee ontvangt 1,0 BTC, volledig afkomstig uit het losgeld. Het echte opvragen van klantgegevens loopt via justitie, niet via OSINT.' },
        { q: 'Na transactie 4 staat er op drie adressen buiten de exchanges nog geld. Welk adres hoort bij de eigenaar van béíde losgeld-wallets? (label)', boss: true,
          answer: ['bc1qfictief9x4t'],
          hints: ['Stel eerst vast of de twee losgeld-wallets wel één eigenaar hebben. Welke transactie zegt daar iets over?', 'Adressen die samen input zijn van één transactie horen waarschijnlijk bij elkaar. Kijk daarna naar de uitvoer van diezelfde transactie: één deel wordt verder gestuurd, één deel blijft liggen.', 'Het gezochte adres is uitvoer van transactie 1 en heeft 100% taint.'],
          wrong: { 'bc1qfictief2h6c': 'Dit is het wisselgeld van transactie 4. De invoer daarvan komt van een ander cluster (met schoon geld erbij), dus dit adres hoort bij die eigenaar, niet aantoonbaar bij de eigenaar van de losgeld-wallets.', 'bc1qfictief6q0z': 'Dit adres heeft 0% taint en hangt nergens aan het losgeld. Het is een toevallige transactie van iemand anders.', 'bc1qfictief5m2k': 'Dit adres is leeg: het is in transactie 2 volledig uitgegeven.', '/exchange/': 'Een stortadres is van de exchange. Gevraagd is een adres buiten de exchanges.' },
          why: 'Geld dat nog op een eigen adres van de verdachte staat, kan in beslag worden genomen zodra de sleutel wordt gevonden. Het is ook het adres dat je in de gaten houdt voor de volgende beweging.',
          explain: 'Transactie 1 geeft de wallets van Alpha en Bravo samen uit: volgens de common-input-heuristiek één eigenaar. Dat is naast het gedeelde certificaat een tweede, onafhankelijke aanwijzing dat de zaken bij elkaar horen. Van de uitvoer gaat 1,5 BTC verder en blijft 0,5 BTC liggen op bc1qfictief9x4t: het wisselgeld, dus van dezelfde eigenaar.' },
      ],
    },

    {
      title: 'Taak 8: Waar pivoten in de praktijk misgaat',
      kind: 'verdieping', optional: true,
      content: `
        <p>In het lab is elke relatie netjes en volledig. Echte bronnen hebben gaten, vertragingen en valse vrienden. Wie
        die kent, legt minder verkeerde verbanden.</p>

        <h3>Certificate Transparency ziet niet alles</h3>
        <ul>
          <li>In de CT-logs staan certificaten van publieke certificaatautoriteiten. Een <strong>zelfondertekend</strong>
          certificaat, zoals veel C2-servers gebruiken, staat er niet in. Dat vind je alleen in scandata (Shodan, Censys).</li>
          <li>Een <strong>wildcardcertificaat</strong> (<code>*.voorbeeld.example</code>) verraadt geen losse subdomeinen.</li>
          <li>Gedeelde certificaten zijn niet altijd verdacht. Hosters en CDN's zetten soms tientallen klanten, die niets met
          elkaar te maken hebben, in één certificaat. Kijk dus wie de uitgever is en hoeveel namen erin staan voordat je een
          gedeeld certificaat een link noemt.</li>
        </ul>

        <h3>Passive DNS is een steekproef</h3>
        <p>Passive DNS bevat alleen wat de sensoren van die aanbieder hebben zien langskomen. Staat een koppeling er niet in,
        dan is ze niet waargenomen; dat is iets anders dan dat ze niet bestond. "Eerst gezien" is de eerste waarneming, niet
        de dag waarop het record werd aangemaakt.</p>

        <h3>Tijd: overlap is verplicht</h3>
        <p>Twee domeinen op hetzelfde IP-adres zijn alleen een link als ze er <em>in dezelfde periode</em> stonden. IP-adressen
        bij hosters worden hergebruikt: de huurder van maart is niet de huurder van september.</p>

        <h3>Valse clusters</h3>
        <ul>
          <li><strong>Sinkholes.</strong> Na een inbeslagname laten opsporingsdiensten of beveiligingsbedrijven
          kwaadaardige domeinen naar één eigen adres wijzen. Tientallen ongerelateerde domeinen delen dan een IP zonder dat
          ze één eigenaar hebben.</li>
          <li><strong>Parkeerpagina's.</strong> Verlopen of ongebruikte domeinen wijzen massaal naar het adres van de registrar.</li>
          <li><strong>WHOIS-afscherming.</strong> Sinds de AVG (2018) zijn contactgegevens in WHOIS meestal afgeschermd.
          Duizenden domeinen delen dan hetzelfde afschermingsadres van de registrar. Dat is geen registrant.</li>
          <li><strong>Standaardwaarden.</strong> Een JARM, favicon of header van een standaardinstallatie delen duizenden
          servers. Zoek op hoe vaak een waarde in de hele dataset voorkomt, niet alleen binnen jouw zaak.</li>
        </ul>

        <h3>Hoe het echt gaat</h3>
        <p>Een ervaren analist combineert altijd minstens twee onafhankelijke kenmerken voordat hij een link vastlegt,
        noteert bij elke relatie een periode in plaats van één datum, en schrijft ook op wat hij heeft gezocht en
        <em>niet</em> gevonden. Dat laatste voorkomt dat een collega hetzelfde werk opnieuw doet, en het maakt zichtbaar
        waar het beeld gaten heeft.</p>
      `,
      questions: [
        { q: 'Domein A stond van januari tot en met maart 2026 op een IP-adres. Domein B staat er sinds september 2026. Hoeveel maanden overlappen ze?', answer: ['0', 'nul'],
          hints: ['Zet de twee perioden naast elkaar.', 'Maart eindigt ruim voor september.', 'Er is geen enkele gezamenlijke maand.'],
          wrong: { '1': 'Er is geen maand waarin beide domeinen op het adres stonden.' },
          explain: 'Nul. Zonder overlap is een gedeeld IP-adres geen link: het adres kan in de tussentijd aan een andere klant zijn verhuurd.' },
        { q: 'Een C2-server gebruikt een zelfondertekend certificaat. In welk soort bron vind je dat certificaat wél?', options: ['In crt.sh', 'In scandata van Shodan of Censys', 'In passive DNS', 'In WHOIS'], answer: 1,
          wrong: { 0: 'crt.sh doorzoekt de CT-logs, en daar staan alleen certificaten van publieke certificaatautoriteiten in.', 2: 'Passive DNS bevat koppelingen tussen namen en adressen, geen certificaten.', 3: 'WHOIS gaat over registratie van domeinen en netblokken.' },
          explain: 'Scanners leggen vast welk certificaat een server daadwerkelijk aanbiedt, ook als geen enkele autoriteit het heeft uitgegeven.' },
        { q: 'Je vindt 60 domeinen met hetzelfde WHOIS-contactadres. Het adres blijkt van de afschermingsdienst van een registrar. Hoeveel van die 60 domeinen mag je op grond hiervan aan één registrant koppelen?', answer: ['0', 'nul'],
          hints: ['Vraag je af van wie het adres is.', 'Een afschermingsadres wordt gedeeld door alle klanten die afscherming gebruiken.', 'Het kenmerk zakt voor de zeldzaamheidstoets.'],
          explain: 'Geen enkel. Het adres is van de registrar, niet van een registrant. Het is een standaardwaarde en dus ruis.' },
      ],
    },

    {
      title: 'Taak 9: Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examenvragen over OSINT en infrastructuuranalyse geven je een situatie en vragen wat de beste bron, de sterkste
        aanwijzing of de veiligste handeling is. De afleiders zijn meestal dingen die óók waar of óók nuttig zijn, maar net
        niet het beste antwoord op deze vraag.</p>
      `,
      questions: [
        { q: 'Een analist onderzoekt twee phishingsites. Ze hebben vier dingen gemeen. Welke overeenkomst is de sterkste aanwijzing dat ze door dezelfde partij zijn opgezet?',
          options: ['Beide domeinen zijn bij dezelfde grote registrar geregistreerd', 'Beide gebruiken een gratis certificaat van dezelfde certificaatautoriteit', 'Beide pagina\'s bevatten hetzelfde, verder nergens gevonden, volg-ID van een statistiekendienst', 'Beide staan bij dezelfde cloudprovider'], answer: 2,
          wrong: { 0: 'Een grote registrar heeft miljoenen klanten. Dit kenmerk is veel te algemeen.', 1: 'Een populaire gratis autoriteit geeft enorme aantallen certificaten uit. Dezelfde uitgever is iets anders dan hetzelfde certificaat.', 3: 'Een cloudprovider is gedeelde infrastructuur. Twee klanten van dezelfde provider hebben niets met elkaar te maken.' },
          explain: 'Een volg-ID hoort bij één account. Komt het verder nergens voor, dan is het een zeldzaam en specifiek kenmerk: precies wat de zeldzaamheidstoets vraagt.' },
        { q: 'Een domein dat in maart voor phishing is gebruikt, wijst vandaag naar een parkeerpagina. De analist wil weten op welk IP-adres de phishingpagina in maart stond. Welke bron geeft het antwoord?',
          options: ['Een actuele DNS-opvraging', 'Passive DNS', 'Certificate Transparency', 'De WHOIS-gegevens van het domein'], answer: 1,
          wrong: { 0: 'Die geeft het adres van vandaag: de parkeerpagina.', 2: 'CT laat zien welke certificaten voor het domein zijn uitgegeven, niet naar welk adres het domein wees.', 3: 'WHOIS zegt wie het domein registreerde en wanneer, niet waar het in maart naar resolvete.' },
          explain: 'Passive DNS bewaart historische koppelingen tussen domein en IP-adres, met de periode erbij.' },
        { q: 'Een opsporingsteam onderzoekt heimelijk een server die vermoedelijk van een verdachte is. Welke handeling brengt het grootste risico mee dat de verdachte merkt dat hij wordt onderzocht?',
          options: ['Het domein opzoeken in crt.sh', 'Het IP-adres opzoeken in RIPEstat', 'Vanaf het eigen kantoornetwerk een TLS-fingerprint van de server nemen', 'De geschiedenis van het domein opvragen in passive DNS'], answer: 2,
          wrong: { 0: 'crt.sh is een archief. De server van de verdachte merkt niets van die opvraging.', 1: 'RIPEstat bevraagt registratiegegevens, niet de server zelf.', 3: 'Passive DNS is een archief van eerdere waarnemingen. Er gaat geen verkeer naar de verdachte.' },
          explain: 'Een fingerprint zoals JARM nemen is actief: er gaat verkeer van jouw adres naar de server, en dat staat in zijn log. De andere drie bevragen archieven.' },
        { q: 'In een bitcointransactie worden drie adressen samen als invoer gebruikt, en er zijn twee uitvoeradressen. Welke conclusie volgt uit de common-input-heuristiek?',
          options: ['De twee uitvoeradressen horen waarschijnlijk bij dezelfde eigenaar', 'De drie invoeradressen horen waarschijnlijk bij dezelfde eigenaar', 'Alle vijf adressen horen bij dezelfde eigenaar', 'Het grootste uitvoerbedrag is het wisselgeld'], answer: 1,
          wrong: { 0: 'Meestal is één uitvoer de betaling en de andere het wisselgeld. De heuristiek zegt niets over de uitvoer als geheel.', 2: 'De ontvanger van de betaling is doorgaans iemand anders dan de verzender.', 3: 'Dat is geen regel. De change-heuristiek kijkt naar zaken als een vers adres en een niet-rond bedrag, en hoort niet bij common-input.' },
          explain: 'Wie meerdere adressen samen uitgeeft, heeft de sleutels van al die adressen. Let op: bij CoinJoin-transacties gaat deze aanname bewust niet op.' },
      ],
    },
  ],

  terms: [
    { term: 'Pivoten', def: 'Van één bekende entiteit via een relatie naar nieuwe entiteiten springen, en dat iteratief herhalen tot je graaf groeit.' },
    { term: 'Entiteit', def: 'Een knoop in de OSINT-graaf: IP, ASN, domein, certificaat, hash, wallet, alias of e-mail.' },
    { term: 'ASN', def: 'Autonomous System Number: het netwerkblok van een provider waar een reeks IP-adressen onder valt.' },
    { term: 'Certificate Transparency (crt.sh)', def: 'Openbaar logboek van uitgegeven TLS-certificaten; laat zien welke domeinen hetzelfde certificaat delen.' },
    { term: 'Passive DNS', def: 'Historisch archief van domein-naar-IP-koppelingen, inclusief wanneer een domein naar welk IP wees.' },
    { term: 'JARM', def: 'Actieve fingerprint van een TLS-server; gelijke JARM wijst op gelijke serverconfiguratie (bv. hetzelfde C2-framework).' },
    { term: 'JA3 / JA4', def: 'Fingerprint van een TLS-client; JA4 is de nieuwere, robuustere opvolger van JA3. Herkent tooling of malware.' },
    { term: 'Favicon-hash', def: 'Hash van het website-icoontje; kan phishing-panels clusteren, maar alleen als de favicon zeldzaam genoeg is.' },
    { term: 'Zeldzaamheidstoets', def: 'De controle of een gedeeld kenmerk uniek genoeg is om een echte link te zijn; een certificaat weegt zwaarder dan een populaire favicon.' },
    { term: 'Relatietabel', def: 'Vastlegging van de graaf als regels van-relatie-naar, altijd met tijd en herkomst erbij, zodat het navolgbaar is.' },
    { term: 'Brug (bridge)', def: 'Een lijn die, als je hem weghaalt, de graaf in twee losse clusters uiteen laat vallen; vaak de kritische verbinding.' },
    { term: 'Common-input-heuristiek', def: 'Blockchain-aanname dat alle input-adressen van één transactie bij dezelfde eigenaar horen; basis voor adres-clustering.' },
    { term: 'Change-heuristiek', def: 'Herkennen van de wisselgeld-output van een transactie, die terugkeert naar een nieuw adres van de betaler zelf.' },
    { term: 'Passief vs. actief', def: 'Passief onderzoek bevraagt archieven (dader merkt niets); actief onderzoek benadert de verdachte server zelf en kan je verraden.' },
  ],

  resources: [
    { title: 'crt.sh — Certificate Transparency search', url: 'https://crt.sh/' },
    { title: 'RIPEstat — data over IP-adressen, ASN\'s en domeinen', url: 'https://stat.ripe.net/' },
    { title: 'abuse.ch — threat-intel-feeds (URLhaus, ThreatFox, SSLBL)', url: 'https://abuse.ch/' },
    { title: 'Wetboek van Strafvordering (art. 126g en 126j Sv) & Wet politiegegevens — wetten.overheid.nl', url: 'https://wetten.overheid.nl/BWBR0001903' },
  ],
});
