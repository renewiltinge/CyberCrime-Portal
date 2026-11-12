/* Uitdaging ★★★: De wolk van de vertrekker (zonder handleiding) */

// Alles FICTIEF: Brugman & Kalf Ingenieurs, de medewerkers, de clouddiensten, hosts en adressen zijn verzonnen.
CS.registerRoom({
  id: 'uitdaging-wolk-van-de-vertrekker',
  path: 'uitdagingen',
  order: 16,
  title: '★★★ De wolk van de vertrekker',
  icon: '☁️',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-12',
  minutes: 50,
  summary: 'Een ingenieursbureau ziet veel uploads vanaf één werkplek, kort nadat een projectleider zijn ontslag indiende. Een proxylog, een printerlog en een tijdlijn. Wie nam wat mee, hoeveel, en sinds wanneer? Pas op: niet elke grote upload is een lek.',
  objectives: [
    'In een proxylog een geplande, toegestane synchronisatie onderscheiden van uploads naar persoonlijke opslag',
    'Een IP-adres aan een persoon koppelen met een tweede bron, en daarbij rekening houden met wisselende adressen',
    'In een tijdlijn het echte begin van een exfiltratie vinden, voorbij het venster van je eerste bron',
  ],
  terms: [
    { term: 'Exfiltratie', def: 'Het ongeoorloofd wegsluizen van gegevens uit een organisatie, bijvoorbeeld naar een eigen cloudaccount of een usb-stick.' },
    { term: 'Shadow IT', def: 'Diensten die medewerkers gebruiken zonder dat de organisatie ze heeft goedgekeurd, zoals een persoonlijke cloudopslag.' },
    { term: 'DHCP-lease', def: 'De tijdelijke uitgifte van een IP-adres aan een apparaat. Na afloop kan hetzelfde adres bij een ander apparaat terechtkomen.' },
    { term: 'Geplande synchronisatie', def: 'Een goedgekeurde clouddienst die op vaste tijden bestanden van werkplekken naar de bedrijfsopslag kopieert. Groot volume, maar binnen de organisatie.' },
    { term: 'Insider threat', def: 'Een dreiging van iemand met legitieme toegang, zoals een medewerker of oud-medewerker, die die toegang misbruikt.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: T1567.002 Exfiltration to Cloud Storage', url: 'https://attack.mitre.org/techniques/T1567/002/' },
    { title: 'CISA: Insider Threat Mitigation', url: 'https://www.cisa.gov/topics/physical-security/insider-threat-mitigation' },
  ],
  tasks: [
    {
      title: 'Bron 1: de proxy',
      content: `
        <p>Brugman &amp; Kalf Ingenieurs (fictief) maakt constructieberekeningen voor bruggen. Op vrijdag 6 november 2026
        meldt de proxy dat één werkplek die week veel data naar buiten stuurde. Het bedrijf gebruikt een goedgekeurde
        clouddienst die elke avond de projectmappen van alle werkplekken synchroniseert. De proxy registreert geen
        gebruikersnamen, alleen IP-adressen.</p>
        <p>Zoek uit waar de data heen ging en hoeveel het was. Er is geen stappenplan.</p>
      `,
      lab: {
        type: 'logs',
        title: 'proxy-export 2 t/m 6 november 2026 (UTC) · tijd bron-ip methode url status out=bytes in=bytes user-agent',
        lines: [
          '2026-11-02T08:05:11Z 10.30.2.44 GET https://intranet.brugmankalf.nm.lab/ 200 out=812 in=20311 "Mozilla/5.0 Firefox/131"',
          '2026-11-02T08:30:47Z 10.30.2.17 GET https://intranet.brugmankalf.nm.lab/rooster 200 out=790 in=9120 "Mozilla/5.0 Edge/130"',
          '2026-11-02T09:12:20Z 10.30.2.51 GET https://wolkdoos.example/s/tekeningen-gemeente 200 out=640 in=48200000 "Mozilla/5.0 Edge/130"',
          '2026-11-02T13:20:05Z 10.30.2.44 GET https://nieuws.example/economie 200 out=702 in=54120 "Mozilla/5.0 Firefox/131"',
          '2026-11-02T19:00:04Z 10.30.2.39 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=30000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-02T19:00:09Z 10.30.2.17 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=35000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-02T19:00:12Z 10.30.2.51 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=12000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-03T08:41:02Z 10.30.2.44 GET https://intranet.brugmankalf.nm.lab/ 200 out=812 in=20311 "Mozilla/5.0 Firefox/131"',
          '2026-11-03T08:52:16Z 10.30.2.62 GET https://intranet.brugmankalf.nm.lab/ 200 out=812 in=20311 "Mozilla/5.0 Edge/130"',
          '2026-11-03T10:15:33Z 10.30.2.44 GET https://wolkdoos.example/login 200 out=930 in=14820 "Mozilla/5.0 Firefox/131"',
          '2026-11-03T10:16:05Z 10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=214000000 in=512 "Mozilla/5.0 Firefox/131"',
          '2026-11-03T12:02:44Z 10.30.2.17 GET https://normen.example/eurocode-1 200 out=740 in=88120 "Mozilla/5.0 Edge/130"',
          '2026-11-03T19:00:05Z 10.30.2.44 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=2400000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-03T19:00:08Z 10.30.2.17 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=41000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-03T19:00:11Z 10.30.2.62 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=6000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-03T19:00:15Z 10.30.2.51 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=9000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-04T08:50:30Z 10.30.2.44 GET https://intranet.brugmankalf.nm.lab/ 200 out=812 in=20311 "Mozilla/5.0 Firefox/131"',
          '2026-11-04T11:03:12Z 10.30.2.51 GET https://wolkdoos.example/s/tekeningen-gemeente 200 out=640 in=3100000 "Mozilla/5.0 Edge/130"',
          '2026-11-04T12:30:41Z 10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=388000000 in=512 "Mozilla/5.0 Firefox/131"',
          '2026-11-04T12:31:20Z 10.30.2.44 GET https://wolkdoos.example/mijn-bestanden 200 out=880 in=31200 "Mozilla/5.0 Firefox/131"',
          '2026-11-04T19:00:03Z 10.30.2.44 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=150000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-04T19:00:10Z 10.30.2.17 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=28000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-04T19:00:13Z 10.30.2.62 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=4000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-05T07:58:19Z 10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=96000000 in=512 "Mozilla/5.0 Firefox/131"',
          '2026-11-05T10:44:51Z 10.30.2.17 GET https://intranet.brugmankalf.nm.lab/formulieren 200 out=760 in=7741 "Mozilla/5.0 Edge/130"',
          '2026-11-05T17:44:20Z 10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=552000000 in=512 "Mozilla/5.0 Firefox/131"',
          '2026-11-05T19:00:06Z 10.30.2.44 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=80000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-05T19:00:09Z 10.30.2.17 PUT https://sync.kantoorwolk.nm.lab/api/v2/blocks 201 out=22000000 in=1024 "KantoorwolkSync/5.2"',
          '2026-11-06T08:20:14Z 10.30.2.44 GET https://wolkdoos.example/login 200 out=930 in=14820 "Mozilla/5.0 Firefox/131"',
          '2026-11-06T09:00:00Z 10.30.1.2 PROXY-01 INFO categorie-update: wolkdoos.example -> persoonlijke opslag (geblokkeerd)',
          '2026-11-06T09:14:37Z 10.30.2.44 POST https://upload.wolkdoos.example/api/upload 403 out=0 in=220 "Mozilla/5.0 Firefox/131"',
          '2026-11-06T09:15:02Z 10.30.2.44 POST https://upload.wolkdoos.example/api/upload 403 out=0 in=220 "Mozilla/5.0 Firefox/131"',
        ].join('\n'),
      },
      questions: [
        { q: 'Naar welk domein lekten de gegevens weg?', answer: ['upload.wolkdoos.example', 'wolkdoos.example'],
          hints: ['Het grootste volume is niet vanzelf het lek.', 'Vergelijk de user-agents: welk verkeer komt van de goedgekeurde synchronisatie, en welk verkeer van een browser?', 'Het is een persoonlijke opslagdienst die de proxy op vrijdag alsnog blokkeert.'],
          wrong: { 'sync.kantoorwolk.nm.lab': 'Dat is de goedgekeurde synchronisatie van het bedrijf zelf: elke avond om 19:00, vanaf alle werkplekken, met de user-agent KantoorwolkSync. Groot, maar binnen de organisatie.', 'kantoorwolk.nm.lab': 'Dat is de goedgekeurde synchronisatie van het bedrijf zelf: elke avond om 19:00, vanaf alle werkplekken.' },
          why: 'Volume alleen is een slechte detector: back-ups en synchronisatie zijn altijd de grootste stromen. Bestemming, tijdstip en het programma dat verstuurt zeggen meer.',
          explain: 'Om 19:00 uploaden alle werkplekken via KantoorwolkSync naar sync.kantoorwolk.nm.lab: dat is de geplande synchronisatie. Overdag stuurt alleen 10.30.2.44 via de browser grote bestanden naar upload.wolkdoos.example, een persoonlijke clouddienst.' },
        { q: 'Hoeveel MB stuurde 10.30.2.44 in deze export naar die dienst? (1 MB = 1.000.000 bytes)', answer: ['1250', '1250 MB', '1.250', '1.250 MB', '1250MB'],
          hints: ['Tel alleen wat er echt aankwam.', 'Filter op upload.wolkdoos en tel de out=-waarden op van de verzoeken met status 200.', 'Vier uploads, waarvan de grootste 552 MB is. De pogingen met 403 versturen niets.'],
          wrong: { '3880': 'Dan tel je de avondelijke synchronisatie van 3, 4 en 5 november mee. Die gaat naar de eigen clouddienst van het bedrijf.', '214': 'Dat is alleen de eerste upload. Er volgen er nog drie.', '/^1301/': 'Dan tel je ook de downloads van 10.30.2.51 mee (in=). Gevraagd is wat 10.30.2.44 verstuurde.' },
          why: 'In een rapport moet het volume kloppen en verdedigbaar zijn: alleen geslaagde uploads naar de verdachte bestemming, met de eenheid erbij.',
          explain: 'Vier geslaagde POST-verzoeken naar upload.wolkdoos.example: 214 + 388 + 96 + 552 = 1250 MB (1,25 GB). De twee pogingen op 6 november krijgen 403 met out=0: geblokkeerd.' },
      ],
    },
    {
      title: 'Bron 2: de printer',
      content: `
        <p>De proxy kent alleen IP-adressen, en die worden per dag uitgedeeld. Het printerlog van de tweede verdieping
        registreert bij elke afdruk de gebruiker, de werkplek en het IP-adres. Wie zat er achter de uploads?</p>
      `,
      lab: {
        type: 'logs',
        title: 'printerlog PRN-2E-01 · 2 t/m 6 november 2026 (UTC)',
        lines: [
          '2026-11-02 07:51:40 PRN-2E-01 job=7702 user=d.mulder host=LT-ENG-14 ip=10.30.2.39 doc="Weekplanning A27.docx" pages=2',
          '2026-11-02 08:31:12 PRN-2E-01 job=7710 user=p.smit host=LT-ENG-09 ip=10.30.2.44 doc="Berekening ligger 4.xlsx" pages=6',
          '2026-11-02 11:04:55 PRN-2E-01 job=7715 user=a.bos host=LT-ENG-03 ip=10.30.2.51 doc="Tekening gemeente rev C.pdf" pages=12',
          '2026-11-02 16:50:31 PRN-2E-01 job=7721 user=p.smit host=LT-ENG-09 ip=10.30.2.44 doc="Notitie overleg.docx" pages=1',
          '2026-11-02 17:12:00 PRN-2E-01 INFO servicedesk: LT-ENG-09 ingenomen voor vervanging (p.smit), nieuw toestel LT-ENG-22',
          '2026-11-03 08:02:40 PRN-2E-01 job=7731 user=p.smit host=LT-ENG-22 ip=10.30.2.62 doc="Berekening ligger 4.xlsx" pages=6',
          '2026-11-03 09:20:18 PRN-2E-01 job=7736 user=d.mulder host=LT-ENG-14 ip=10.30.2.44 doc="Projectoverzicht A27.pdf" pages=6',
          '2026-11-03 13:41:07 PRN-2E-01 job=7744 user=k.demir host=LT-ENG-05 ip=10.30.2.17 doc="Eurocode notities.pdf" pages=3',
          '2026-11-04 09:15:52 PRN-2E-01 job=7751 user=a.bos host=LT-ENG-03 ip=10.30.2.51 doc="Offerte brug Zuidkade.pdf" pages=4',
          '2026-11-04 18:12:09 PRN-2E-01 job=7760 user=d.mulder host=LT-ENG-14 ip=10.30.2.44 doc="Klantcontacten 2026.xlsx" pages=31',
          '2026-11-05 08:44:30 PRN-2E-01 job=7768 user=k.demir host=LT-ENG-05 ip=10.30.2.17 doc="Rooster december.pdf" pages=1',
          '2026-11-05 17:20:44 PRN-2E-01 job=7772 user=d.mulder host=LT-ENG-14 ip=10.30.2.44 doc="Tarievenoverzicht 2027 VERTROUWELIJK.pdf" pages=9',
          '2026-11-06 08:10:03 PRN-2E-01 job=7780 user=p.smit host=LT-ENG-22 ip=10.30.2.62 doc="Weekplanning.docx" pages=2',
        ].join('\n'),
      },
      questions: [
        { q: 'Welke gebruiker zat achter de uploads? (gebruikersnaam)', answer: ['d.mulder'],
          hints: ['Een IP-adres is geen persoon, en ook niet elke dag hetzelfde apparaat.', 'Zoek in het printerlog op 10.30.2.44 en let op de datum van elke regel.', 'Vanaf 3 november hoort dat adres bij laptop LT-ENG-14.'],
          wrong: { 'p.smit': 'Op 2 november had p.smit dat adres, maar zijn laptop werd die middag ingenomen. Vanaf 3 november werkt hij vanaf 10.30.2.62. De uploads waren op 3, 4 en 5 november.', 'a.bos': 'a.bos werkt vanaf 10.30.2.51. Die haalt alleen tekeningen op bij wolkdoos (in=), en stuurt niets.', '/lt-eng/i': 'Dat is een apparaat. Gevraagd is de gebruikersnaam.' },
          why: 'Wie een IP-adres zonder datum aan een persoon koppelt, kan de verkeerde beschuldigen. Leg altijd vast welk apparaat het adres op dat moment had.',
          explain: 'Op 2 november hoort 10.30.2.44 bij p.smit (LT-ENG-09), maar die laptop wordt die middag ingenomen. Vanaf 3 november print d.mulder vanaf LT-ENG-14 met 10.30.2.44, precies op de dagen van de uploads. Hij print in die week ook klantcontacten en een vertrouwelijk tarievenoverzicht.' },
      ],
    },
    {
      title: 'Bron 3: de tijdlijn',
      content: `
        <p>HR wil weten sinds wanneer dit speelt, want het bepaalt welke afspraken uit de vaststellingsovereenkomst nog
        gelden. Het securityteam heeft een tijdlijn gemaakt van oktober en begin november, met gegevens van HR, de VPN, de
        endpointbeveiliging (EDR), de bedrijfscloud en de proxy. Let op: vanaf de VPN krijgt een gebruiker een ander adres
        dan op kantoor.</p>
      `,
      lab: {
        type: 'timeline',
        title: 'Zaak BK-2026-031 · oktober en november 2026 (UTC)',
        events: [
          { t: '2026-10-05 09:00:00', src: 'HR', user: 'd.mulder', desc: 'Jaargesprek; geen bijzonderheden' },
          { t: '2026-10-07 07:30:00', src: 'EDR', host: 'LT-ENG-14', desc: 'Definitie-update antivirus' },
          { t: '2026-10-12 18:30:00', src: 'Bedrijfscloud', host: 'LT-ENG-14', user: 'd.mulder', desc: 'Map Projecten\\A27 toegevoegd aan synchronisatie; eerste volledige synchronisatie naar sync.kantoorwolk.nm.lab (3,1 GB)' },
          { t: '2026-10-14 10:00:00', src: 'Bedrijfscloud', desc: 'IT stelt nachtelijke synchronisatie in voor alle werkplekken, dagelijks 19:00 UTC' },
          { t: '2026-10-15 08:12:44', src: 'VPN', user: 'k.demir', desc: 'Aangemeld vanaf 192.0.2.140, adres uit pool: 10.99.0.12' },
          { t: '2026-10-15 16:40:02', src: 'VPN', user: 'k.demir', desc: 'Afgemeld' },
          { t: '2026-10-20 13:12:51', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.39 POST https://wolkdoos.example/signup 200 out=1840 (account aangemaakt)' },
          { t: '2026-10-20 13:14:03', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.39 GET https://wolkdoos.example/welkom 200 in=22140' },
          { t: '2026-10-22 20:05:31', src: 'VPN', user: 'j.peeters', desc: 'Aangemeld vanaf 203.0.113.61, adres uit pool: 10.99.0.31' },
          { t: '2026-10-22 20:11:47', src: 'Proxy', desc: '10.99.0.31 GET https://wolkdoos.example/s/aanlevering-gemeente 200 in=22000000' },
          { t: '2026-10-22 21:02:10', src: 'VPN', user: 'j.peeters', desc: 'Afgemeld' },
          { t: '2026-10-26 10:00:00', src: 'HR', user: 'd.mulder', desc: 'Ontslagbrief ontvangen; laatste werkdag 30-11-2026; nieuwe werkgever niet genoemd' },
          { t: '2026-10-27 14:22:18', src: 'EDR', host: 'LT-ENG-14', user: 'd.mulder', desc: '7-Zip geïnstalleerd door gebruiker' },
          { t: '2026-10-28 21:41:10', src: 'VPN', user: 'd.mulder', desc: 'Aangemeld vanaf 198.51.100.88, adres uit pool: 10.99.0.23' },
          { t: '2026-10-28 21:47:33', src: 'EDR', host: 'LT-ENG-14', user: 'd.mulder', desc: '7z.exe maakt archief Downloads\\A27_deel1.7z (180 MB) van Projecten\\A27' },
          { t: '2026-10-28 21:52:08', src: 'Proxy', desc: '10.99.0.23 POST https://upload.wolkdoos.example/api/upload 200 out=180000000' },
          { t: '2026-10-28 22:30:55', src: 'VPN', user: 'd.mulder', desc: 'Afgemeld' },
          { t: '2026-10-29 09:01:12', src: 'EDR', host: 'LT-ENG-14', user: 'd.mulder', desc: 'Bestand Downloads\\A27_deel1.7z verwijderd' },
          { t: '2026-10-30 19:00:04', src: 'Bedrijfscloud', host: 'LT-ENG-14', user: 'd.mulder', desc: 'Geplande synchronisatie voltooid (210 MB)' },
          { t: '2026-11-02 17:12:00', src: 'Servicedesk', host: 'LT-ENG-09', user: 'p.smit', desc: 'Laptop ingenomen voor vervanging; nieuw toestel LT-ENG-22' },
          { t: '2026-11-03 07:40:10', src: 'DHCP', host: 'LT-ENG-14', desc: 'Lease 10.30.2.44 uitgegeven aan LT-ENG-14 (was 10.30.2.39)' },
          { t: '2026-11-03 07:52:31', src: 'DHCP', host: 'LT-ENG-22', desc: 'Lease 10.30.2.62 uitgegeven aan LT-ENG-22' },
          { t: '2026-11-03 10:16:05', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=214000000' },
          { t: '2026-11-03 19:00:05', src: 'Bedrijfscloud', host: 'LT-ENG-14', user: 'd.mulder', desc: 'Geplande synchronisatie voltooid (2,4 GB: nieuwe submap Projecten\\A27\\Revisies)' },
          { t: '2026-11-04 12:30:41', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=388000000' },
          { t: '2026-11-05 07:58:19', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=96000000' },
          { t: '2026-11-05 17:44:20', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.44 POST https://upload.wolkdoos.example/api/upload 200 out=552000000' },
          { t: '2026-11-06 09:00:00', src: 'Proxy', desc: 'Categorie-update: wolkdoos.example -> persoonlijke opslag (geblokkeerd)' },
          { t: '2026-11-06 09:14:37', src: 'Proxy', host: 'LT-ENG-14', desc: '10.30.2.44 POST https://upload.wolkdoos.example/api/upload 403 out=0' },
          { t: '2026-11-06 10:30:00', src: 'Security', desc: 'Melding aan HR en directie; laptop LT-ENG-14 veiliggesteld' },
        ],
      },
      questions: [
        { q: 'Op welke datum begon de exfiltratie naar de persoonlijke opslag? (JJJJ-MM-DD, UTC)', boss: true, answer: ['2026-10-28', '28-10-2026', '28 oktober 2026', '28 oktober'],
          hints: ['De proxy-export uit bron 1 begint niet bij het begin.', 'Zoek de eerste geslaagde upload naar de persoonlijke opslag, ook als die niet vanaf een kantooradres kwam. Wie had dat VPN-adres op dat moment?', 'Het gebeurde \'s avonds, thuis, twee dagen na de ontslagbrief.'],
          wrong: { '2026-10-12': 'Dat is de eerste synchronisatie naar de goedgekeurde bedrijfscloud. Dat is geen exfiltratie: de data blijft binnen de organisatie.', '2026-10-20': 'Toen werd het account aangemaakt. Er ging alleen een aanmeldformulier van 1840 bytes heen, nog geen data.', '2026-10-22': 'Op die dag haalde j.peeters via de VPN een bestand op bij die dienst (in=). Er ging niets heen, en het is een andere gebruiker.', '2026-11-03': 'Dat is de eerste upload in de proxy-export van bron 1. De tijdlijn gaat verder terug.', '2026-10-26': 'Toen kwam de ontslagbrief binnen. Dat is een motief, nog geen exfiltratie.' },
          why: 'Een onderzoek dat stopt bij het venster van de eerste bron, mist vaak het begin. Juist uploads vanuit huis via de VPN vallen buiten een kantoorexport.',
          explain: 'Op 2026-10-28 om 21:41 meldt d.mulder zich via de VPN aan en krijgt 10.99.0.23. Om 21:47 pakt hij Projecten\\A27 in, om 21:52 gaat 180 MB van 10.99.0.23 naar upload.wolkdoos.example. Het account bestond sinds 20 oktober, maar toen ging er nog geen data heen. De synchronisatie van 12 oktober was de goedgekeurde bedrijfscloud. Totaal bekend lek: 180 + 1250 = 1430 MB.' },
      ],
    },
  ],
});
