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
  { from: 'dA', to: 'cert', rel: 'presenteert cert', time: '2026-01', source: 'crt.sh' },
  { from: 'dA', to: 'mail', rel: 'WHOIS-contact', time: '2026-01', source: 'WHOIS' },
  { from: 'dA', to: 'wal', rel: 'losgeld-adres in rapport', time: '2026-01', source: 'rapport' },
  { from: 'ipA', to: 'asnA', rel: 'hoort bij ASN', time: '2026-01', source: 'RIPEstat' },
  // Zaak Bravo (februari 2026) — ander IP, maar ZELFDE cert
  { from: 'dB', to: 'ipB', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
  { from: 'dB', to: 'cert', rel: 'presenteert cert', time: '2026-02', source: 'crt.sh' },
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
  summary: 'Van één aanwijzing naar een heel netwerk: je leert IP\'s, domeinen, certificaten, hashes en wallets als een graaf van entiteiten te zien, met open bronnen stap voor stap te pivoten, de zeldzaamheidstoets toe te passen en binnen de juridische en opsec-grenzen te blijven.',
  objectives: [
    'Het entiteitenmodel van infrastructuur-OSINT benoemen (IP, ASN, domein, certificaat, hash, wallet, alias, e-mail) en als graaf tekenen',
    'Per bron (RIPEstat/WHOIS, passive DNS, crt.sh, Shodan/Censys, VirusTotal, abuse.ch, urlscan) uitleggen wat die oplevert',
    'Fingerprints (JARM, JA3/JA4, favicon-hash, response-headers) herkennen en gebruiken om infrastructuur te clusteren',
    'Pivoten als iteratief proces uitvoeren en elk kenmerk toetsen op zeldzaamheid voordat je het een echte link noemt',
    'Een onderzoek als relatietabel (met tijd en herkomst) vastleggen en uitleggen hoe pandas/networkx bruggen en centrale knopen vinden',
    'De blockchain-basis (common-input- en change-heuristiek, exchanges als knelpunt) en de juridische/opsec-grenzen (art. 126j Sv, Wet politiegegevens) toepassen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Het entiteitenmodel: alles is een knoop',
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
          <li><strong>Bekend</strong> — een harde waarneming uit een bron. "Domein <code>betaal-controle.nm.lab</code> presenteert certificaat <code>A1B2C3D4</code> (bron: crt.sh)."</li>
          <li><strong>Afgeleid</strong> — een analytische conclusie uit meerdere bekende feiten. "Beide zaken gebruiken hetzelfde certificaat, dus ze draaien waarschijnlijk op dezelfde opzet."</li>
          <li><strong>Aanname</strong> — iets wat je vermoedt maar niet bewijst. "Het is dezelfde dadergroep." (Nog niet bewezen.)</li>
        </ul>
        <div class="callout tip"><strong>Tip:</strong> schrijf achter elke regel in je dossier welk label hij heeft. Een rechter, een collega of jijzelf over een maand moet kunnen zien wat feit is en wat gok.</div>
      `,
      questions: [
        { q: 'Hoe modelleer je infrastructuur-OSINT, in één woord?', options: ['Als een lijstje', 'Als een graaf van entiteiten en relaties', 'Als een tijdlijn', 'Als een foto'], answer: 1, explain: 'Entiteiten zijn knopen, relaties zijn de lijnen ertussen; vind je één knoop, dan pivoteer je langs de relaties naar de buren.' },
        { q: 'Onder welk netwerkbegrip valt een IP-adres bij een provider (het netwerkblok)?', answer: ['ASN', 'asn', 'autonomous system number'], hint: 'Drie letters; "Autonomous System ...".', explain: 'Een ASN (Autonomous System Number) is het netwerkblok van een provider; meerdere IP\'s vallen onder één ASN.' },
        { q: '"Beide domeinen gebruiken hetzelfde certificaat, dus het is waarschijnlijk dezelfde opzet." Welk label hoort bij deze uitspraak?', options: ['Bekend', 'Afgeleid', 'Aanname', 'Bewezen feit'], answer: 1, explain: 'Het is een afgeleide: een conclusie die je trekt uit bekende feiten (het gedeelde certificaat). "Dezelfde dadergroep" zou daarentegen nog een aanname zijn.' },
      ],
    },

    {
      title: 'Taak 2 — De bronnen: wat levert elke put op?',
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
        <p><strong>crt.sh</strong> is je favoriet voor deze room. Certificate Transparency verplicht uitgevers om elk TLS-certificaat in een openbaar logboek te zetten. Daardoor kun je opzoeken welke certificaten voor een domein bestaan — én, andersom, welke <em>andere</em> domeinen hetzelfde certificaat presenteren. Dat laatste is pivotgoud.</p>
        <p><strong>urlscan.io</strong> is bijzonder omdat het de pagina voor je bezoekt. Je ziet de favicon, de geladen scripts en eventuele doorverwijzingen zonder zelf naar het verdachte adres te surfen. Dat is ook <em>opsec</em>: jij blijft uit het zicht van de dader (meer daarover in de laatste taak).</p>

        <div class="callout info"><strong>Passief &ne; gratis van consequenties:</strong> de meeste van deze bronnen zijn <em>passief</em> — je bevraagt een archief, niet de server van de dader. Maar één bron is dat níét zonder meer: een bestand uploaden naar VirusTotal is een actieve handeling die sporen achterlaat. Onthoud dat alvast.</div>
      `,
      questions: [
        { q: 'Welke bron gebruik je om te vinden welke andere domeinen hetzelfde TLS-certificaat presenteren?', options: ['RIPEstat', 'crt.sh (Certificate Transparency)', 'VirusTotal', 'Passive DNS'], answer: 1, explain: 'crt.sh bevraagt de openbare Certificate Transparency-logs; daarmee vind je gedeelde certificaten tussen domeinen.' },
        { q: 'Waarvoor gebruik je passive DNS?', answer: ['historische domein-ip-koppelingen', 'historische koppelingen tussen domein en ip', 'welk domein wanneer naar welk ip wees'], hint: 'Het gaat om de koppeling domein &harr; IP, mét tijd.', explain: 'Passive DNS bewaart historisch welk domein wanneer naar welk IP resolvete — handig als een domein inmiddels is verhuisd.' },
        { q: 'Welke dienst laat je zien welke poorten en banners op een IP draaien, inclusief een JARM-fingerprint?', options: ['crt.sh', 'Shodan of Censys', 'WHOIS', 'urlscan.io'], answer: 1, explain: 'Shodan en Censys scannen het internet en tonen open diensten, banners en server-fingerprints zoals JARM.' },
        { q: 'Welke bron geeft specifiek bekende malware- en C2-indicatoren (o.a. URLhaus, ThreatFox, SSL Blacklist)?', answer: ['abuse.ch', 'abuse ch'], hint: 'Een non-profit met projecten als URLhaus en Feodo Tracker.', explain: 'abuse.ch bundelt threat-intel-feeds zoals URLhaus (malware-URL\'s), ThreatFox (IOC\'s) en SSLBL (kwaadaardige certificaten).' },
      ],
    },

    {
      title: 'Taak 3 — Fingerprinting: infrastructuur herkennen aan zijn handtekening',
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
      questions: [
        { q: 'Welke fingerprint beschrijft de TLS-server (en is dus actief: je raakt de server zelf)?', answer: ['JARM', 'jarm'], hint: 'Denk aan de M van Machine aan de serverkant.', explain: 'JARM stuurt actief TLS-hello\'s en vat de antwoorden van de server samen; gelijke JARM wijst op gelijke serverconfig.' },
        { q: 'Wat is JA4 ten opzichte van JA3?', options: ['Een server-fingerprint', 'De nieuwere, robuustere opvolger van de JA3-clientfingerprint', 'Een hashalgoritme voor favicons', 'Een DNS-recordtype'], answer: 1, explain: 'JA3 en JA4 zijn beide client-fingerprints; JA4 is de modernere, robuustere versie.' },
        { q: 'Waarom is de response-header "Server: nginx" een zwakke fingerprint?', options: ['Omdat nginx niet bestaat', 'Omdat hij op miljoenen servers voorkomt en dus niet onderscheidend is', 'Omdat hij versleuteld is', 'Omdat hij alleen bij phishing voorkomt'], answer: 1, explain: 'Een kenmerk dat overal voorkomt onderscheidt niets. Een fingerprint telt pas mee als hij zeldzaam genoeg is.' },
      ],
    },

    {
      title: 'Taak 4 — Pivoten als lus, en de zeldzaamheidstoets',
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

        <p>Leg deze toets in je geheugen. Je beloning voor wie dit onthoudt: <strong>NM{pivot_toets_de_zeldzaamheid}</strong>.</p>
      `,
      questions: [
        { q: 'Waarom is pivoten een "lus" en geen rechte lijn?', options: ['Omdat je altijd terugkeert naar de eerste bron', 'Omdat elke nieuwe entiteit weer een nieuw vertrekpunt is om verder te pivoten', 'Omdat het eindeloos duurt', 'Omdat de volgorde niet uitmaakt'], answer: 1, explain: 'Elke gevonden entiteit is een nieuwe seed; je haalt er weer een kenmerk bij en de graaf groeit ronde na ronde.' },
        { q: 'Twee verdachte sites delen hetzelfde kenmerk. Welk kenmerk is het STERKSTE bewijs voor een echte link?', options: ['Dezelfde provider (ASN)', 'Een "Server: nginx"-header', 'Een hergebruikt, specifiek TLS-certificaat', 'Een populaire standaard-favicon'], answer: 2, explain: 'Een specifiek certificaat is zeldzaam; provider, nginx-header en een populaire favicon komen massaal voor en zijn dus zwak.' },
        { q: 'Welke vlag is de beloning voor de zeldzaamheidstoets?', answer: ['NM{pivot_toets_de_zeldzaamheid}'], hint: 'Hij staat onderaan de uitleg over zeldzaamheid.', explain: 'NM{pivot_toets_de_zeldzaamheid} — de kern van de taak: toets elk kenmerk op uniciteit voordat je het een link noemt.' },
      ],
    },

    {
      title: 'Taak 5 — De pivot-sandbox: verbind Zaak Alpha en Zaak Bravo',
      content: `
        <p>Tijd om het te doen. Je hebt twee fictieve phishingzaken op je bord. Alles hieronder is verzonnen: documentatie-IP's en <code>.nm.lab</code>-domeinen, nooit echte infrastructuur.</p>
        <ul>
          <li><strong>Zaak Alpha</strong> (januari 2026): het domein <code>betaal-controle.nm.lab</code>, dat naar <code>203.0.113.10</code> resolvet.</li>
          <li><strong>Zaak Bravo</strong> (februari 2026): het domein <code>inlog-verificatie.nm.lab</code>, dat naar <code>198.51.100.20</code> resolvet.</li>
        </ul>
        <p>De vraag van je teamleider: <em>horen deze twee zaken bij elkaar?</em> De IP-adressen verschillen, dus op het eerste gezicht lijken het losse incidenten. Maar pivoteer verder.</p>

        <h3>Zo gebruik je de sandbox</h3>
        <ol>
          <li>Klik links een entiteit aan. Je ziet rechts zijn relaties, telkens <strong>mét tijd en herkomst</strong> (bijv. "presenteert cert · 2026-01 · bron: crt.sh").</li>
          <li>Klik in de relatielijst door naar een buur-entiteit om verder te pivoten.</li>
          <li>Begin bij <code>betaal-controle.nm.lab</code> (Alpha), bekijk zijn kenmerken, en doe hetzelfde voor <code>inlog-verificatie.nm.lab</code> (Bravo).</li>
          <li>Zoek het ene kenmerk dat in <strong>beide</strong> zaken terugkomt. Pas de zeldzaamheidstoets toe: is het uniek genoeg?</li>
        </ol>

        <div class="callout info"><strong>Denk in labels:</strong> wat je in de sandbox ziet is <em>bekend</em> (waarnemingen uit bronnen). Dat beide domeinen hetzelfde certificaat presenteren terwijl hun IP's verschillen, is <em>afgeleid</em> bewijs dat het dezelfde opzet is. Dat het dezelfde persoon of groep is, blijft voorlopig een <em>aanname</em> — daarvoor heb je meer nodig.</div>

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
        { q: 'Welk gedeeld kenmerk (het label) bruggt Zaak Alpha en Zaak Bravo?', answer: ['A1B2C3D4', 'cert', 'certificaat', 'het certificaat', 'certificaat a1b2c3d4'], hint: 'De IP\'s verschillen. Welke ENE entiteit hangt aan allebei de domeinen? Kijk naar de bron crt.sh.', explain: 'Beide domeinen presenteren hetzelfde TLS-certificaat A1B2C3D4 (bron: crt.sh). De IP\'s (203.0.113.10 vs 198.51.100.20) verschillen, maar het hergebruikte, zeldzame certificaat bruggt de zaken.' },
        { q: 'Via welke bron zie je dat beide domeinen hetzelfde certificaat presenteren?', answer: ['crt.sh', 'crt sh', 'certificate transparency'], hint: 'Staat als herkomst bij de "presenteert cert"-relatie.', explain: 'De relatie "presenteert cert" is afkomstig uit crt.sh (Certificate Transparency) — precies de bron die gedeelde certificaten zichtbaar maakt.' },
        { q: 'De IP-adressen van Alpha en Bravo verschillen. Waarom is dat geen bewijs dat het losse zaken zijn?', options: ['IP-adressen zijn nooit betrouwbaar', 'Omdat een ander, zeldzamer kenmerk (het certificaat) juist wél overlapt en zwaarder weegt', 'Omdat IP-adressen niet bestaan in OSINT', 'Omdat het toeval is'], answer: 1, explain: 'Verschillende IP\'s sluiten een link niet uit. Het gedeelde, zeldzame certificaat is sterker bewijs dan het verschil in (makkelijk te wisselen) IP-adressen.' },
        { q: 'Welk label hoort bij de uitspraak "het is dezelfde dadergroep" in deze zaak?', options: ['Bekend', 'Afgeleid', 'Aanname', 'Bewezen'], answer: 2, explain: 'Het gedeelde certificaat is bekend; "dezelfde opzet" is afgeleid; "dezelfde dadergroep" blijft een aanname tot je het onderbouwt met meer bewijs.' },
      ],
    },

    {
      title: 'Taak 6 — De graaf vastleggen en laten rekenen',
      content: `
        <p>Een onderzoek dat alleen in je hoofd zit, is niet navolgbaar. Leg je graaf daarom vast als een <strong>relatietabel</strong>: één regel per relatie, met altijd <strong>tijd</strong> en <strong>herkomst</strong> erbij. Precies zoals de sandbox het toonde.</p>

        <table>
          <thead><tr><th>Van</th><th>Relatie</th><th>Naar</th><th>Tijd</th><th>Herkomst</th></tr></thead>
          <tbody>
            <tr><td>betaal-controle.nm.lab</td><td>presenteert cert</td><td>A1B2C3D4</td><td>2026-01</td><td>crt.sh</td></tr>
            <tr><td>inlog-verificatie.nm.lab</td><td>presenteert cert</td><td>A1B2C3D4</td><td>2026-02</td><td>crt.sh</td></tr>
            <tr><td>betaal-controle.nm.lab</td><td>resolvet naar</td><td>203.0.113.10</td><td>2026-01</td><td>passive DNS</td></tr>
          </tbody>
        </table>

        <p>Waarom tijd en herkomst verplicht zijn: <strong>tijd</strong> omdat infrastructuur verandert (een domein wees in januari naar een ander IP dan in juni), en <strong>herkomst</strong> omdat een collega moet kunnen controleren waar een regel vandaan komt. Zonder die twee kolommen is je tabel een mening, geen bewijs.</p>

        <h3>Laat de computer het zware werk doen</h3>
        <p>Bij een handvol knopen zie je de brug zo. Bij honderden knopen niet meer. Dan laad je de tabel in <strong>pandas</strong> (een Python-bibliotheek voor tabellen) en bouw je er met <strong>networkx</strong> (voor grafen) een graaf van. Twee berekeningen zijn hier goud waard:</p>
        <ul>
          <li><strong>Bruggen vinden.</strong> Een <em>brug</em> is een lijn die, als je hem weghaalt, de graaf in twee stukken laat vallen. In onze zaak is de lijn naar het gedeelde certificaat precies zo'n brug: hij is de enige verbinding tussen cluster Alpha en cluster Bravo.</li>
          <li><strong>Centraliteit meten.</strong> Centraliteit zegt hoe "belangrijk" een knoop is. Een knoop waar veel verbindingen doorheen lopen (hoge <em>betweenness</em>) is vaak een spil — bijvoorbeeld een server of wallet die meerdere zaken verbindt.</li>
        </ul>

        <p>Zo zou je het opzetten (ter illustratie — we draaien dit hier niet en tonen geen uitvoer):</p>
        <pre><code>import pandas as pd
import networkx as nx

df = pd.read_csv("relaties.csv")          # kolommen: van, naar, relatie, tijd, herkomst
G = nx.from_pandas_edgelist(df, "van", "naar")

list(nx.bridges(G))                       # welke lijnen verbinden anders losse clusters?
nx.betweenness_centrality(G)              # welke knoop is de spil?</code></pre>

        <div class="callout tip"><strong>Tip:</strong> de code is het gereedschap, niet de conclusie. Een gevonden "brug" is een <em>afgeleide</em> die je nog moet toetsen op zeldzaamheid: een brug via een gedeeld certificaat is sterk, een brug via een gedeelde Cloudflare-IP is zwak.</div>
      `,
      questions: [
        { q: 'Welke twee kolommen horen altijd bij elke regel in je relatietabel?', answer: ['tijd en herkomst', 'tijd en bron', 'herkomst en tijd', 'bron en tijd'], hint: 'De één omdat infra verandert, de ander zodat een collega het kan controleren.', explain: 'Tijd (infrastructuur verandert) en herkomst/bron (navolgbaarheid) maken van je tabel bewijs in plaats van een mening.' },
        { q: 'Wat is een "brug" in een graaf?', options: ['De grootste knoop', 'Een lijn die, weggehaald, de graaf in twee losse delen laat vallen', 'Een dubbele relatie', 'Een knoop zonder relaties'], answer: 1, explain: 'Een brug is de enige verbinding tussen twee clusters; in onze zaak is dat de lijn naar het gedeelde certificaat.' },
        { q: 'Welke networkx-maat gebruik je om de "spil" te vinden waar veel verbindingen doorheen lopen?', options: ['bridges', 'betweenness-centraliteit', 'read_csv', 'from_pandas_edgelist'], answer: 1, explain: 'Betweenness-centraliteit meet hoeveel kortste paden door een knoop lopen; een hoge waarde wijst op een spil in het netwerk.' },
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
          <li><strong>Stelselmatig observeren (art. 126j Sv-sfeer).</strong> Af en toe iets opzoeken is iets anders dan iemand <em>stelselmatig</em> volgen tot je een compleet beeld van zijn leven krijgt. Stelselmatige informatie-inwinning door opsporing is een bevoegdheid met voorwaarden; zie <a href="https://wetten.overheid.nl/BWBR0001903" target="_blank" rel="noopener">het Wetboek van Strafvordering</a>. Als leerling of burger doe je dit niet op eigen houtje.</li>
          <li><strong>Wet politiegegevens (Wpg).</strong> Politiegegevens mogen alleen voor een bepaald doel worden verwerkt en bewaard; zie <a href="https://wetten.overheid.nl/BWBR0022463" target="_blank" rel="noopener">de Wet politiegegevens</a>. Verzamel niet meer dan nodig (dataminimalisatie) en leg je grondslag vast.</li>
          <li><strong>Passief vs. actief.</strong> Een archief bevragen (crt.sh, passive DNS, RIPEstat) is <em>passief</em>: de dader merkt er niets van. De verdachte server zélf benaderen (hem bezoeken, scannen, een JARM nemen) is <em>actief</em> en kan je verraden of zelfs strafbaar zijn.</li>
        </ul>

        <div class="callout danger"><strong>Het uploadrisico — onthoud dit goed:</strong> gooi je een verdacht bestand naar VirusTotal, dan wordt die sample zichtbaar voor anderen (ook voor de dader, die zijn eigen hashes in de gaten houdt). Je tipt hem dat hij ontdekt is, en hij ruimt zijn infrastructuur op vóór je klaar bent. Hetzelfde geldt voor het actief bezoeken van zijn site. Daarom geldt de regel: <strong>NM{deel_geen_sample}</strong> — upload of bezoek niets zonder je af te vragen wie er meekijkt.</div>
      `,
      questions: [
        { q: 'Welke heuristiek zegt dat adressen die samen in één transactie worden uitgegeven, waarschijnlijk van dezelfde eigenaar zijn?', answer: ['common-input-heuristiek', 'common input', 'common-input', 'common input heuristiek'], hint: 'Je moet alle sleutels hebben om die inputs samen uit te geven.', explain: 'De common-input-ownership-heuristiek clustert alle input-adressen van één transactie als één entiteit.' },
        { q: 'Waarom is een exchange het "knelpunt" in een crypto-onderzoek?', options: ['Daar is het geld weg', 'Daar geldt vaak een identificatieplicht (KYC), dus daar kan het pseudonieme spoor aan een echte identiteit worden gekoppeld', 'Exchanges zijn illegaal', 'Daar stopt de blockchain'], answer: 1, explain: 'Bij een exchange met KYC kan via een justitieel verzoek de identiteit achter een adres bovenkomen; zelfgemaakte adressen blijven pseudoniem.' },
        { q: 'Wat is het risico van een verdacht bestand naar VirusTotal uploaden?', options: ['Het bestand wordt gewist', 'De sample wordt zichtbaar voor anderen, waaronder de dader, die dan gewaarschuwd is', 'VirusTotal is illegaal', 'Er gebeurt niets'], answer: 1, explain: 'Een upload wordt deelbaar/zichtbaar; een alerte dader ziet zijn eigen hash opduiken en ruimt zijn infra op. Dat is een actieve, verradende handeling.' },
        { q: 'Welk verschil maakt "passief vs. actief" in infrastructuur-OSINT?', answer: ['passief raakt de dader niet, actief wel', 'bij passief merkt de dader niets, bij actief wel', 'passief is onzichtbaar, actief niet'], hint: 'Denk aan een archief bevragen versus de server van de dader zelf benaderen.', explain: 'Passief = een archief bevragen (crt.sh, passive DNS); actief = de verdachte server zelf benaderen of scannen, wat je kan verraden en soms strafbaar is.' },
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
    { title: 'Wetboek van Strafvordering (art. 126j Sv) & Wet politiegegevens — wetten.overheid.nl', url: 'https://wetten.overheid.nl/BWBR0001903' },
  ],
});
