/* Uitdaging ★: De nachtelijke inlog (zonder handleiding) */

// Alles FICTIEF: HC De Wielen, de site, de personen en alle adressen zijn verzonnen.
CS.registerRoom({
  id: 'uitdaging-nachtelijke-inlog',
  path: 'uitdagingen',
  order: 14,
  title: '★ De nachtelijke inlog',
  icon: '🦉',
  difficulty: 'Makkelijk',
  level: 'Instap',
  checked: '2026-11-12',
  minutes: 10,
  summary: 'Op zondagochtend staat er een vreemde regel op de homepage van een hockeyclub. Je krijgt één logbestand en één spoor dat de indringer achterliet. Je eerste uitdaging: geen stappenplan, wel een duidelijk antwoord.',
  objectives: [
    'In een toegangslog een reeks mislukte inlogpogingen herkennen en tellen',
    'Een geslaagde inbraak onderscheiden van een gebruiker die zich één keer vergist',
    'Een spoor met twee lagen codering in de juiste volgorde afpellen',
  ],
  terms: [
    { term: 'Toegangslog (access log)', def: 'Een bestand waarin een webserver elk verzoek bijhoudt: wie (IP-adres), wanneer, welk pad, en met welke statuscode de server antwoordde.' },
    { term: 'Statuscode 401', def: 'De server weigert omdat de inloggegevens ontbreken of niet kloppen.' },
    { term: 'Statuscode 302', def: 'Een doorverwijzing. Na een inlogformulier betekent dat vaak: gelukt, je wordt doorgestuurd naar de beveiligde pagina.' },
    { term: 'Brute force', def: 'Een aanval waarbij iemand, meestal met een script, snel achter elkaar wachtwoorden probeert tot er één werkt.' },
    { term: 'URL-codering', def: 'Tekens die in een webadres een speciale betekenis hebben, zoals = en &, worden geschreven als % met een hexadecimale code. Een = wordt %3D.' },
  ],
  resources: [
    { title: 'MDN: HTTP-statuscodes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status' },
  ],
  tasks: [
    {
      title: 'Spoor 1: het log van de clubsite',
      content: `
        <p>Hockeyclub HC De Wielen (fictief) heeft een eenvoudige website met een beheerpaneel voor de vrijwilligers. Op zondag
        8 november staat op de homepage ineens een regel onleesbare tekst in plaats van het wedstrijdprogramma. De webmaster
        stuurt je het toegangslog van het weekend.</p>
        <p>Zoek uit wie er binnenkwam, en hoe. Er is geen stappenplan.</p>
      `,
      lab: {
        type: 'logs',
        title: 'access.log · www.hcdewielen.nm.lab · 7 en 8 november 2026',
        lines: [
          '192.0.2.31 - - [07/Nov/2026:09:02:11 +0100] "GET / HTTP/1.1" 200 8812 "-" "Mozilla/5.0 (iPhone)"',
          '192.0.2.31 - - [07/Nov/2026:09:02:15 +0100] "GET /wedstrijden HTTP/1.1" 200 15220 "/" "Mozilla/5.0 (iPhone)"',
          '198.51.100.62 - - [07/Nov/2026:09:40:52 +0100] "GET /teams/jo11-2 HTTP/1.1" 200 6631 "-" "Mozilla/5.0 (Android)"',
          '198.51.100.23 - - [07/Nov/2026:10:14:02 +0100] "POST /beheer/login HTTP/1.1" 401 512 "/beheer" "Mozilla/5.0 (Windows NT 10.0)"',
          '198.51.100.23 - - [07/Nov/2026:10:14:30 +0100] "POST /beheer/login HTTP/1.1" 302 0 "/beheer" "Mozilla/5.0 (Windows NT 10.0)"',
          '198.51.100.23 - - [07/Nov/2026:10:14:31 +0100] "GET /beheer/ HTTP/1.1" 200 4410 "/beheer/login" "Mozilla/5.0 (Windows NT 10.0)"',
          '198.51.100.23 - - [07/Nov/2026:10:17:48 +0100] "POST /beheer/pagina?id=uitslagen HTTP/1.1" 200 210 "/beheer/" "Mozilla/5.0 (Windows NT 10.0)"',
          '192.0.2.80 - - [07/Nov/2026:13:05:00 +0100] "GET /robots.txt HTTP/1.1" 200 64 "-" "ZoekSpin/2.1"',
          '192.0.2.80 - - [07/Nov/2026:13:05:02 +0100] "GET /sitemap.xml HTTP/1.1" 200 1290 "-" "ZoekSpin/2.1"',
          '198.51.100.62 - - [07/Nov/2026:19:22:41 +0100] "GET /kantinerooster HTTP/1.1" 200 5120 "-" "Mozilla/5.0 (Android)"',
          '203.0.113.45 - - [08/Nov/2026:02:11:40 +0100] "GET /wp-login.php HTTP/1.1" 404 196 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:11:41 +0100] "GET /admin HTTP/1.1" 404 196 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:11:42 +0100] "GET /beheer HTTP/1.1" 200 2048 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:13:05 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:13:15 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:13:25 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:13:35 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:13:45 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:13:55 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:14:05 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:14:15 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:14:25 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:14:35 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:14:45 +0100] "POST /beheer/login HTTP/1.1" 401 512 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:15:07 +0100] "POST /beheer/login HTTP/1.1" 302 0 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:15:08 +0100] "GET /beheer/ HTTP/1.1" 200 4410 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:16:30 +0100] "POST /beheer/pagina?id=home&tekst=Tk17bmFjaHR1aWxfdmlhX2JlaGVlcnBhbmVlbH0%3D HTTP/1.1" 200 210 "-" "python-requests/2.31"',
          '203.0.113.45 - - [08/Nov/2026:02:16:31 +0100] "GET /beheer/uitloggen HTTP/1.1" 302 0 "-" "python-requests/2.31"',
          '192.0.2.31 - - [08/Nov/2026:08:47:19 +0100] "GET / HTTP/1.1" 200 391 "-" "Mozilla/5.0 (iPhone)"',
          '198.51.100.62 - - [08/Nov/2026:08:51:03 +0100] "GET / HTTP/1.1" 200 391 "-" "Mozilla/5.0 (Android)"',
          '198.51.100.62 - - [08/Nov/2026:08:51:09 +0100] "GET /wedstrijden HTTP/1.1" 200 15220 "/" "Mozilla/5.0 (Android)"',
        ].join('\n'),
      },
      questions: [
        { q: 'Vanaf welk IP-adres kwam de indringer binnen?', answer: ['203.0.113.45'],
          hints: ['Normale bezoekers lezen pagina\'s. Iemand anders klopt steeds opnieuw op dezelfde deur.', 'Filter het log op login en kijk welk adres vaak een 401 krijgt.', 'Het adres dat midden in de nacht met python-requests werkt, begint met 203.'],
          wrong: { '198.51.100.23': 'Dit adres typt op zaterdagochtend één keer een verkeerd wachtwoord en logt 28 seconden later gewoon in. Dat is een vrijwilliger die zich vergist, geen aanval.', '192.0.2.80': 'Dat is een zoekmachine die robots.txt en de sitemap ophaalt. Hij komt niet in de buurt van het beheerpaneel.' },
          why: 'Eén foute poging is een mens. Een reeks in een strak ritme, \'s nachts, met een scriptbibliotheek als user-agent, is een machine.',
          explain: '203.0.113.45 zoekt om 02:11 eerst naar bekende beheerpagina\'s, vindt /beheer en probeert dan om de tien seconden een wachtwoord. Na de reeks 401\'s volgt een 302: binnen.' },
        { q: 'Hoeveel mislukte inlogpogingen deed dat adres voordat het lukte?', answer: ['11', 'elf'],
          hints: ['Tel alleen wat de server weigerde.', 'Filter op het adres van de indringer en daarna op de statuscode van een geweigerde inlog.', 'Het zijn de regels met POST /beheer/login en 401, vóór de 302 van 02:15:07.'],
          wrong: { '12': 'Dan tel je de geslaagde poging (302) mee. Gevraagd zijn alleen de mislukte.', '14': 'Dan tel je ook de verkenning mee: de twee 404\'s en de GET /beheer zijn geen inlogpogingen.', '15': 'Dan tel je alle verzoeken vóór de inlog mee, ook de verkenning en de geslaagde poging.' },
          why: 'Een site die na elf foute pogingen in twee minuten niet ingrijpt, heeft geen rate limiting of tijdelijke blokkade. Dat is de eerste maatregel in je advies.',
          explain: 'Elf keer POST /beheer/login met 401, van 02:13:05 tot 02:14:45, telkens tien seconden na elkaar. De twaalfde poging om 02:15:07 krijgt 302.' },
        { q: 'Hoe laat slaagde de inlog van de indringer? (UU:MM:SS, zoals in het log)', answer: ['02:15:07', '2:15:07'],
          hints: ['Na een reeks weigeringen verandert het antwoord van de server.', 'Zoek de regel van de indringer met POST /beheer/login en een andere statuscode dan 401.', 'Het is de 302, een paar seconden na kwart over twee.'],
          wrong: { '02:16:30': 'Op dat moment past hij de homepage aan. Hij was toen al binnen.', '02:13:05': 'Dat is de eerste mislukte poging, niet de geslaagde.' },
          why: 'Het moment van binnenkomen is het ankerpunt van je tijdlijn: alles daarna gebeurde met de rechten van een beheerder.',
          explain: 'Om 02:15:07 antwoordt de server met 302 op het inlogformulier, en een seconde later haalt hetzelfde adres /beheer/ op met 200.' },
      ],
    },
    {
      title: 'Spoor 2: de regel op de homepage',
      content: `
        <p>Een minuut na het inloggen veranderde de indringer de homepage. De tekst die hij meestuurde, staat al in het
        werkblad hieronder, precies zoals hij in het log stond. Wat staat er?</p>
      `,
      lab: { type: 'cyberchef', input: 'Tk17bmFjaHR1aWxfdmlhX2JlaGVlcnBhbmVlbH0%3D' },
      questions: [
        { q: 'Welke vlag liet de indringer op de homepage achter?', boss: true, answer: ['NM{nachtuil_via_beheerpaneel}'], encoded: true,
          hints: ['De tekst is twee keer ingepakt: één keer om in een webadres te passen, één keer om onleesbaar te zijn.', 'Kijk naar het eind van de tekst. Welk teken hoort daar bij Base64, en hoe ziet dat eruit in een URL?', 'Eerst URL decoderen (van %3D wordt =), daarna Base64 decoderen.'],
          wrong: { '/%3d/i': 'Je bent er bijna. %3D is de URL-codering van het teken =. Pak die laag eerst af.', '/^tk17/i': 'Dat is nog de Base64-laag. Decodeer hem.' },
          why: 'Wie een spoor in de verkeerde volgorde decodeert, krijgt een foutmelding en denkt dat het onzin is. De volgorde van de lagen is het halve werk.',
          explain: 'In een URL wordt = geschreven als %3D. URL decoderen geeft Tk17bmFjaHR1aWxfdmlhX2JlaGVlcnBhbmVlbH0=, en Base64 decoderen daarvan geeft NM{nachtuil_via_beheerpaneel}. Advies voor de club: wachtwoord van het beheeraccount wijzigen, inlogpogingen beperken en tweestapsverificatie aanzetten.' },
      ],
    },
  ],
});
