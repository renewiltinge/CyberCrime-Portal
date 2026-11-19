/* Room: Tactisch analist cybercrime — Casus: Operatie Zwarte Rots (afsluitende praktijkcasus) */

// =======================================================================
//  Alles FICTIEF: RotsHost, de reseller "kaapstander", Dijkgraaf
//  Koeltechniek, de gemeente Lekmond, de booter DonderBoot, NederBank,
//  personen, aliassen en wallets zijn verzonnen. IP's uit de
//  documentatiebereiken (RFC 5737), ASN's uit 64496-64511, domeinen op
//  .nm.lab en .example. Je oefent de werkwijze, je volgt geen echte zaak.
// =======================================================================

// --- Fingerprint: twaalf hosts uit drie dossiers, wat clustert echt? ---
const TACB_ATTRS = [
  { key: 'asn', label: 'ASN' },
  { key: 'ssh', label: 'SSH-hostkey' },
  { key: 'jarm', label: 'JARM (TLS-stack)' },
  { key: 'cert', label: 'TLS-certificaat' },
];
const TACB_HOSTS = [
  { host: '203.0.113.14 · A: ransomware-C2', asn: 'AS64511', ssh: 'SHA256:Zw3kR0tsH0stImg', jarm: '27d40d40d00', cert: 'LE-7f21' },
  { host: '203.0.113.15 · A: exfil-opslag', asn: 'AS64511', ssh: 'SHA256:Zw3kR0tsH0stImg', jarm: '27d40d40d00', cert: 'LE-7f22' },
  { host: '203.0.113.80 · A: update-server back-upsoftware (legitiem)', asn: 'AS64500', ssh: 'SHA256:Qm4aT8vLp2Ns', jarm: '27d40d40d00', cert: 'LE-11a0' },
  { host: '203.0.113.81 · A: mailprovider slachtoffer (legitiem)', asn: 'AS64501', ssh: 'SHA256:Hy7cB1oWq9Ze', jarm: '27d40d40d00', cert: 'LE-11a1' },
  { host: '198.51.100.23 · B: booterpaneel DonderBoot', asn: 'AS64511', ssh: 'SHA256:Zw3kR0tsH0stImg', jarm: '27d40d40d00', cert: 'LE-9a03' },
  { host: '198.51.100.24 · B: booter-API', asn: 'AS64511', ssh: 'SHA256:Zw3kR0tsH0stImg', jarm: '27d40d40d00', cert: 'LE-9a04' },
  { host: '198.51.100.90 · B: CDN van de gemeente (legitiem)', asn: 'AS64502', ssh: 'SHA256:Lp0dE5xRk3Ma', jarm: '27d40d40d00', cert: 'LE-22b0' },
  { host: '198.51.100.91 · B: DNS-resolver provider (legitiem)', asn: 'AS64503', ssh: 'SHA256:Vb6sN2qTy8Kc', jarm: '3fd21b20d00', cert: 'LE-22b1' },
  { host: '192.0.2.41 · C: phishingpagina', asn: 'AS64511', ssh: 'SHA256:Zw3kR0tsH0stImg', jarm: '27d40d40d00', cert: 'LE-c510' },
  { host: '192.0.2.42 · C: phishingpaneel', asn: 'AS64511', ssh: 'SHA256:Zw3kR0tsH0stImg', jarm: '27d40d40d00', cert: 'LE-c511' },
  { host: '192.0.2.98 · C: webmail slachtoffer (legitiem)', asn: 'AS64504', ssh: 'SHA256:Gt1fM7wXc4Pa', jarm: '2ad2ad16d2a', cert: 'LE-33c0' },
  { host: '192.0.2.99 · C: URL-verkorter (legitiem)', asn: 'AS64505', ssh: 'SHA256:Ku9hJ3rDn6Ve', jarm: '27d40d40d00', cert: 'LE-33c1' },
];

// --- Pivot: van drie incident-IP's naar de hoster ---
const TACB_ENTITIES = [
  { id: 'ipa', type: 'ip', label: '203.0.113.14 (zaak A)' },
  { id: 'ipb', type: 'ip', label: '198.51.100.23 (zaak B)' },
  { id: 'ipc', type: 'ip', label: '192.0.2.41 (zaak C)' },
  { id: 'ra', type: 'domain', label: 'vps-0412.cust.rotshost.example' },
  { id: 'rb', type: 'domain', label: 'vps-0577.cust.rotshost.example' },
  { id: 'rc', type: 'domain', label: 'vps-0630.cust.rotshost.example' },
  { id: 'rh', type: 'domain', label: 'rotshost.example' },
  { id: 'as', type: 'asn', label: 'AS64511' },
  { id: 'org', type: 'alias', label: 'Rots Holding Ltd (registrant van het ASN)' },
  { id: 'abuse', type: 'email', label: 'abuse@rotshost.example' },
  { id: 'cert', type: 'cert', label: 'TLS-certificaat klantenportaal rotshost.example' },
  { id: 'ks', type: 'alias', label: 'kaapstander (forumalias)' },
  { id: 'wal', type: 'wallet', label: 'betaaladres bestelpagina (fictief: xmr-rots-0001)' },
];
const TACB_EDGES = [
  { from: 'ipa', to: 'ra', rel: 'reverse DNS (PTR)', time: '2026-10', source: 'passive DNS' },
  { from: 'ipb', to: 'rb', rel: 'reverse DNS (PTR)', time: '2026-10', source: 'passive DNS' },
  { from: 'ipc', to: 'rc', rel: 'reverse DNS (PTR)', time: '2026-11', source: 'passive DNS' },
  { from: 'ra', to: 'rh', rel: 'subdomein van', source: 'DNS' },
  { from: 'rb', to: 'rh', rel: 'subdomein van', source: 'DNS' },
  { from: 'rc', to: 'rh', rel: 'subdomein van', source: 'DNS' },
  { from: 'ipa', to: 'as', rel: 'aangekondigd door', time: '2026-10', source: 'BGP-routeringsdata' },
  { from: 'ipb', to: 'as', rel: 'aangekondigd door', time: '2026-10', source: 'BGP-routeringsdata' },
  { from: 'ipc', to: 'as', rel: 'aangekondigd door', time: '2026-11', source: 'BGP-routeringsdata' },
  { from: 'as', to: 'org', rel: 'geregistreerd op', source: 'WHOIS van de IP-registry' },
  { from: 'rh', to: 'abuse', rel: 'abuse-contact', source: 'WHOIS' },
  { from: 'rh', to: 'cert', rel: 'certificaat klantenportaal', time: '2025-02', source: 'certificate transparency' },
  { from: 'rh', to: 'ks', rel: 'aangeprezen als "officiële reseller"', time: '2025-03', source: 'forumarchief' },
  { from: 'rh', to: 'wal', rel: 'betaaladres op bestelpagina', time: '2025-06', source: 'archive.org-snapshot' },
];

// --- OSINT-puzzel: wie is de broker? ---
const TACB_RECORDS = [
  { title: 'R1 · Forumadvertentie (archief, maart 2025)', lines: ['alias: kaapstander', '"Offshore VPS, abuse-meldingen gaan bij ons de prullenbak in. Betaling alleen in crypto. Officiële reseller van RotsHost."', 'contact: kaapstander@chat.example'] },
  { title: 'R2 · Administratie ransomware-affiliate (zaak A, beslag)', lines: ['factuur juli 2026: 4 x VPS', 'klantaccount bij reseller: KS-07-0412', 'betaald aan: kaapstander'] },
  { title: 'R3 · Telegramkanaal DonderBoot (zaak B, open bron)', lines: ['"Onze servers draaien via een vaste partner. Zelf ook een VPS? Gebruik code KS07 voor korting."', 'beheerder kanaal: d0nderadmin'] },
  { title: 'R4 · Chatberichten phishingcrew (zaak C, uit een in beslag genomen telefoon)', lines: ['"Hosting regelen we weer bij die gast van de kaap, die vraagt niks."', 'opgeslagen contact: kaapstander@chat.example'] },
  { title: 'R5 · Website RotsHost (archive.org, 2025)', lines: ['"Partnerprogramma: resellers betalen twee derde van de catalogusprijs en krijgen een eigen code."', 'bekende codes in voorbeelden: KS07, RT11'] },
  { title: 'R6 · Forumpost (archief, 2024)', lines: ['alias: kaapvaarder', 'verkoopt gestolen accounts van streamingdiensten', 'contact: kaapvaarder@mail.example'] },
];

// --- Flow: de huur van klanten via de reseller naar de hoster ---
const TACB_NODES = [
  { id: 'ka', type: 'source', label: 'Klant A: ransomware-affiliate' },
  { id: 'kb', type: 'source', label: 'Klant B: booterdienst DonderBoot' },
  { id: 'kc', type: 'source', label: 'Klant C: phishingcrew' },
  { id: 'res', type: 'wallet', label: 'Reseller kaapstander (wallet)' },
  { id: 'rots', type: 'service', label: 'RotsHost (betaalwallet)' },
  { id: 'dc', type: 'merchant', label: 'Datacenter (huur rackruimte)' },
  { id: 'ex', type: 'exchange', label: 'Exchange Pelikaan (fictief)' },
  { id: 'bank', type: 'cashout', label: 'Bankrekening Rots Holding Ltd' },
];
const TACB_FLOWS = [
  { from: 'ka', to: 'res', amount: 2400, time: '2026-07-02', note: '4 x VPS, eerste maand' },
  { from: 'kb', to: 'res', amount: 4500, time: '2026-07-03', note: '15 x VPS voor de booter' },
  { from: 'kc', to: 'res', amount: 900, time: '2026-07-05', note: '3 x VPS' },
  { from: 'res', to: 'rots', amount: 5200, time: '2026-07-10', note: 'inkoop juli (twee derde van 7.800)' },
  { from: 'ka', to: 'res', amount: 1200, time: '2026-08-02', note: '2 x VPS, verlenging' },
  { from: 'kb', to: 'res', amount: 4500, time: '2026-08-03', note: '15 x VPS, verlenging' },
  { from: 'kc', to: 'res', amount: 900, time: '2026-08-05', note: '3 x VPS, verlenging' },
  { from: 'res', to: 'rots', amount: 4400, time: '2026-08-10', note: 'inkoop augustus (twee derde van 6.600)' },
  { from: 'kc', to: 'res', amount: 900, time: '2026-09-05', note: '3 x VPS, verlenging' },
  { from: 'res', to: 'rots', amount: 600, time: '2026-09-10', note: 'inkoop september (twee derde van 900)' },
  { from: 'rots', to: 'dc', amount: 2200, time: '2026-09-12', note: 'huur rackruimte en stroom' },
  { from: 'rots', to: 'ex', amount: 8000, time: '2026-09-15', note: 'omzetten naar euro' },
  { from: 'ex', to: 'bank', amount: 7900, time: '2026-09-16', note: 'exchange houdt 100 aan kosten' },
];

// --- Scenario: interventieadvies ---
const TACB_STEPS = [
  {
    situation: 'Team B stelt voor een mail te sturen naar abuse@rotshost.example met het verzoek het booterpaneel offline te halen. Dat gaat snel. Wat adviseer je?',
    choices: [
      { label: 'Doen: het is de snelste manier om het paneel uit de lucht te krijgen.', good: false, feedback: 'Een bulletproof hoster negeert abuse-meldingen bewust en adverteert daar zelfs mee. De kans is groot dat hij de klant waarschuwt (tip-off) en dat bewijs verdwijnt.' },
      { label: 'Niet doen. RotsHost is in deze zaak een verdachte facilitator, geen partner. Eerst afstemmen met de drie teams en het OM over een gezamenlijke aanpak.', good: true, feedback: 'Goed. De hoster is het doelwit. Een melding zou het onderzoek verraden en lost het probleem niet op: de klant zit morgen op een ander IP-adres.' },
      { label: 'Een publieke waarschuwing op sociale media plaatsen dat RotsHost criminelen helpt.', good: false, feedback: 'Daarmee tip je de hoster, de reseller en alle klanten tegelijk, zonder dat er iets offline gaat.' },
    ],
  },
  {
    situation: 'Waar zit het sterkste publiek-private aangrijpingspunt om de dienst te verstoren?',
    choices: [
      { label: 'Bij het gewone datacenter en de netwerkproviders waar RotsHost rackruimte en verbindingen huurt.', good: true, feedback: 'Goed. Een bulletproof hoster draait vaak op de infrastructuur van legitieme partijen. Die hebben voorwaarden en een eigen belang, en kunnen in overleg en op het goede moment de stekker eruit trekken.' },
      { label: 'Bij de reseller kaapstander: vraag hem om mee te werken.', good: false, feedback: 'De reseller is zelf onderdeel van het samenwerkingsverband. Hem benaderen is een tip-off.' },
      { label: 'Bij de klanten: stuur ze een brief dat ze moeten stoppen.', good: false, feedback: 'Voor de jonge booterklanten kan een waarschuwing later passend zijn, maar het raakt de dienst zelf niet.' },
    ],
  },
  {
    situation: 'De officier van justitie vraagt: strafrechtelijk onderzoek of verstoren?',
    choices: [
      { label: 'Alleen verstoren, vandaag nog: alles offline.', good: false, feedback: 'Dan is de dienst even weg, maar zijn servers en administratie niet veiliggesteld. De beheerders beginnen elders opnieuw.' },
      { label: 'Alleen strafrechtelijk: rustig twee jaar onderzoek doen en de dienst laten draaien.', good: false, feedback: 'Ondertussen maken de klanten nieuwe slachtoffers. Een integrale aanpak weegt dat mee.' },
      { label: 'Combineren: in overleg met het OM eerst bewijs veiligstellen, daarna gecoördineerd offline halen met de datacenterpartner en internationale partners, en de klanten in beeld houden.', good: true, feedback: 'Goed. Verstoren en opsporen versterken elkaar als de timing klopt: eerst zekerstellen, dan in één keer ingrijpen.' },
    ],
  },
  {
    situation: 'Team A wil morgen de ransomware-affiliate aanhouden. Die is klant van de reseller. Wat adviseer je?',
    choices: [
      { label: 'Gewoon doen: zaak A staat los van de rest.', good: false, feedback: 'Een aanhouding valt op. De reseller en de hoster kunnen gewaarschuwd raken en servers wissen voordat ze zijn veiliggesteld.' },
      { label: 'Afstemmen in een gezamenlijk overleg (deconflictie), zodat acties elkaar niet verstoren. Is er acuut gevaar, dan gaat dat voor en stem je de rest daarop af.', good: true, feedback: 'Goed. Als intermediair breng je de teams bij elkaar. Afstemmen betekent niet alles uitstellen: acuut gevaar weegt zwaarder.' },
      { label: 'Team A laten wachten tot het hele onderzoek klaar is, wat er ook gebeurt.', good: false, feedback: 'Te star. Een integrale aanpak weegt ook nieuwe slachtoffers en acuut gevaar mee.' },
    ],
  },
  {
    situation: 'De administratie van DonderBoot laat honderden klanten zien, vaak tieners. Wat adviseer je voor deze groep?',
    choices: [
      { label: 'Iedereen vervolgen: een DDoS bestellen is strafbaar.', good: false, feedback: 'Strafbaar, maar niet altijd de beste reactie. Voor honderden jonge klanten is dat niet uitvoerbaar en vaak niet effectief.' },
      { label: 'Een gelaagde aanpak: klanten waarschuwen en aanspreken, voor jonge first-offenders een alternatief traject zoals Hack_Right, en de zwaarste gebruikers en de beheerders strafrechtelijk aanpakken.', good: true, feedback: 'Goed. Preventie, een alternatieve interventie en strafrecht naast elkaar. Internationale acties tegen booters doen dit ook: diensten offline halen en gebruikers waarschuwen.' },
      { label: 'Niets doen met de klanten; alleen de dienst telt.', good: false, feedback: 'Zonder aandacht voor de klanten stappen ze over naar de volgende booter.' },
    ],
  },
  {
    situation: 'Je hebt een lijst met IP-adressen en de gedeelde SSH-hostkey van RotsHost. Wat doe je ermee?',
    choices: [
      { label: 'Meteen publiek delen, zodat iedereen kan blokkeren.', good: false, feedback: 'Openbaar publiceren vóór de actie is een tip-off. Na de actie kan het wel.' },
      { label: 'Niets delen tot het onderzoek helemaal klaar is.', good: false, feedback: 'Dan worden er intussen slachtoffers gemaakt die je had kunnen beschermen.' },
      { label: 'Delen met partners zoals het NCSC, onder afspraken over gebruik en timing, zodat zij kunnen beschermen zonder de actie te verraden.', good: true, feedback: 'Goed. Delen is beschermen, maar met afspraken over wie wat wanneer mag gebruiken.' },
    ],
  },
];

// --- BLUF: het eindproduct ---
const TACB_BLUF_SOURCE = [
  'Oktober 2026: Team A onderzoekt een ransomware-aanval op Dijkgraaf Koeltechniek BV. C2 en exfiltratie liepen via 203.0.113.14 en 203.0.113.15.',
  'Oktober 2026: Team B onderzoekt DDoS-aanvallen op het portaal van de gemeente Lekmond. Het verkeer kwam via de booter DonderBoot; panel en API op 198.51.100.23 en 198.51.100.24.',
  'November 2026: Team C onderzoekt een phishingcampagne tegen klanten van NederBank. Pagina en paneel op 192.0.2.41 en 192.0.2.42.',
  'Analyse: alle zes de verdachte hosts zitten in AS64511 en delen SSH-hostkey SHA256:Zw3kR0tsH0stImg. De JARM delen ook legitieme hosts (ruis). Reverse DNS van alle drie wijst naar rotshost.example. RotsHost adverteert dat abuse-meldingen worden genegeerd.',
  'De reseller kaapstander verkoopt RotsHost-capaciteit aan alle drie de klanten (factuur zaak A, code KS07 bij zaak B, opgeslagen contact bij zaak C). Een alias met een vergelijkbare naam, kaapvaarder, heeft geen aantoonbare link.',
  'Geldstroom juli tot september: klanten betaalden 15.300 euro aan de reseller, de reseller betaalde 10.200 euro aan RotsHost, RotsHost zette 8.000 euro om via Exchange Pelikaan naar een bankrekening van Rots Holding Ltd en betaalde 2.200 euro huur aan een gewoon datacenter.',
].join('\n\n');

const TACB_BLUF_MODEL = [
  'BEOORDELING: De drie lopende onderzoeken (ransomware, DDoS, phishing) gebruiken vrijwel zeker dezelfde bulletproof-hostingdienst, RotsHost (AS64511), via één reseller (alias kaapstander). Het gaat waarschijnlijk om drie verschillende klanten van dezelfde facilitator, niet om één dadergroep.',
  'ADVIES: (1) Bundel de drie onderzoeken rond de facilitator in één gezamenlijk overleg; stem acties af om een tip-off te voorkomen. Eigenaar: Team Cybercrime, met de drie teams en het OM. (2) Bereid in overleg met het OM het veiligstellen en daarna het gecoördineerd offline halen voor met het datacenter waar RotsHost huurt. Eigenaar: Team Cybercrime en OM, met de datacenterpartner. (3) Vorder gegevens bij Exchange Pelikaan over de uitbetaling aan Rots Holding Ltd. Eigenaar: financieel rechercheur van het team. (4) Deel de indicatoren onder afspraken over timing met het NCSC. Eigenaar: Team Cybercrime. (5) Gelaagde aanpak voor de booterklanten (waarschuwen, Hack_Right, strafrecht). Eigenaar: Team B met het OM.',
  'ONDERBOUWING EN ONZEKERHEID: Bekend: gedeelde SSH-hostkey en ASN op zes hosts, reverse DNS naar rotshost.example, betalingen 15.300 / 10.200 / 8.000 euro. Afgeleid: één reseller voor drie klanten (drie onafhankelijke bronnen). Aanname: kaapstander is één persoon; dat is niet vastgesteld. De gelijkende alias kaapvaarder is niet gekoppeld.',
].join('\n\n');

CS.registerRoom({
  id: 'ta-casus-bulletproof',
  path: 'tactisch-analist',
  order: 9,
  title: 'Casus: Operatie Zwarte Rots',
  icon: '🪨',
  difficulty: 'Moeilijk',
  minutes: 100,
  level: 'Gevorderd',
  checked: '2026-11-19',
  summary: 'De afsluitende praktijkcasus. Drie teams melden drie losse incidenten: ransomware, een DDoS op een gemeente en een phishingcampagne. Jij ontdekt dat ze dezelfde bulletproof-hostingdienst gebruiken. Je koppelt de incidenten, pivoteert naar de hoster, ontmaskert de reseller, volgt het geld, adviseert over de interventie en levert het intelligenceproduct.',
  objectives: [
    'Dwarsverbanden tussen incidenten van verschillende teams vinden met een zeldzaamheidstoets op infrastructuurkenmerken',
    'Van incident-IP\'s pivoteren naar de facilitator achter de infrastructuur',
    'Een samenwerkingsverband van hoster, reseller en klanten beschrijven uit losse bronnen',
    'Een geldstroom van klanten via een reseller naar een hoster en een exchange narekenen',
    'Een crime script van een criminele dienst opstellen en een integraal interventieadvies geven zonder tip-off',
    'Een intelligenceproduct schrijven dat drie teams en een officier van justitie tot actie aanzet',
  ],
  tasks: [
    {
      title: 'Taak 1 — Intake: drie meldingen, één spoor?',
      tryFirst: true,
      intro: '<p>Drie teams leveren elk een lijst met IP-adressen uit hun dossier, verdacht en onschuldig door elkaar. In het lab staan twaalf hosts met vier kenmerken. Klik de kenmerken aan. Welk kenmerk verbindt de drie dossiers echt, en welk kenmerk lijkt dat alleen maar te doen?</p>',
      content: `
        <p>Het is maandagochtend. Als tactisch analist bij het team cybercrime krijg je in één week drie meldingen
        uit verschillende onderzoeken op je bureau:</p>
        <ul>
          <li><strong>Zaak A</strong> (rechercheteam): ransomware bij <strong>Dijkgraaf Koeltechniek BV</strong>. Data is
          weggesluisd en de servers zijn versleuteld.</li>
          <li><strong>Zaak B</strong> (basisteam en districtsrecherche): het inschrijfportaal van de <strong>gemeente
          Lekmond</strong> ligt herhaaldelijk plat door een DDoS, besteld bij de booterdienst <strong>DonderBoot</strong>.</li>
          <li><strong>Zaak C</strong> (team digitale opsporing): een phishingcampagne tegen klanten van
          <strong>NederBank</strong>.</li>
        </ul>
        <p>Drie fenomenen, drie teams, drie dossiers. Niemand denkt dat ze iets met elkaar te maken hebben. Precies
        daar zit jouw waarde: de vacature noemt het letterlijk, "dwarsverbanden tussen meerdere onderzoeken of
        incidenten identificeren".</p>

        <h3>De zeldzaamheidstoets</h3>
        <p>Je legt de infrastructuur uit de drie dossiers naast elkaar. Overeenkomsten zijn er altijd, dus de vraag is
        steeds: <em>hoe zeldzaam is dit gedeelde kenmerk?</em></p>
        <ul>
          <li><strong>JARM</strong> is een vingerafdruk van hoe een server TLS praat. Een standaardinstallatie van een
          populaire webserver geeft bij duizenden servers dezelfde waarde. Delen bijna al je hosts hem, ook de
          onschuldige? Dan is het ruis.</li>
          <li><strong>Een TLS-certificaat</strong> dat per host anders is, verbindt niets. Uniek is geen link.</li>
          <li><strong>Een SSH-hostkey</strong> hoort per server uniek te zijn: hij wordt bij de installatie gegenereerd.
          Delen meerdere servers dezelfde sleutel, dan zijn ze gekloond uit één <em>golden image</em> zonder de sleutel
          te vernieuwen. Dat is een sterke, specifieke vingerafdruk van wie de servers heeft uitgerold.</li>
          <li><strong>Een ASN</strong> (het nummer van een netwerk op internet) zegt bij een grote cloudprovider weinig:
          daar zitten miljoenen klanten. Bij een kleine hoster met een slechte reputatie zegt het veel meer.</li>
        </ul>

        <h3>Let op wat je eigenlijk vindt</h3>
        <p>Een gedeelde hostkey koppelt servers aan degene die ze <em>uitrolde</em>. Dat is de hoster, niet per se
        de klant. Je hebt dus nog niet bewezen dat één dader achter de drie zaken zit. Je hebt een gemeenschappelijke
        <strong>facilitator</strong> gevonden. Houd dat verschil de hele casus vast.</p>

        <div class="callout warn"><strong>Alles fictief:</strong> bedrijven, gemeente, diensten, aliassen en adressen
        zijn verzonnen. IP's komen uit documentatiebereiken en ASN's uit de reeks voor documentatie.</div>
        <div class="callout tip"><strong>Beloning:</strong> één gekloonde sleutel, drie dossiers. Vlag:
        <code>NM{gouden_image_verraadt_de_hoster}</code>.</div>
      `,
      lab: {
        type: 'fingerprint',
        title: 'twaalf hosts uit drie dossiers',
        scenario: 'Hosts uit zaak A (ransomware), zaak B (DDoS) en zaak C (phishing), verdacht en legitiem door elkaar. Welk kenmerk clustert echt?',
        attrs: TACB_ATTRS,
        hosts: TACB_HOSTS,
        ask: [
          { q: 'Hoeveel hosts delen SSH-hostkey SHA256:Zw3kR0tsH0stImg?', answer: ['6', 'zes'], hint: 'Klik de hostkey aan bij de ransomware-C2.' },
          { q: 'Welk ASN delen de verdachte hosts uit alle drie de zaken?', answer: ['AS64511', '64511'], hint: 'Kijk in de ASN-kolom van de hosts met de gedeelde hostkey.' },
          { q: 'Welk kenmerk delen ook bijna alle legitieme hosts, zodat het ruis is?', answer: ['jarm', 'de jarm', '27d40d40d00'], hint: 'Welke waarde delen tien van de twaalf hosts?' },
        ],
      },
      questions: [
        { q: 'Hoeveel van de twaalf hosts delen de JARM-waarde 27d40d40d00?', answer: ['10', 'tien'],
          hints: ['Klik in het lab de JARM-waarde van de eerste host aan.', 'Tel ook de legitieme hosts mee.'],
          wrong: { '6': 'Zes is het aantal verdachte hosts. De JARM delen ook vier legitieme hosts.' },
          why: 'Een kenmerk dat ook onschuldige hosts delen, onderscheidt niets. Wie daarop clustert, trekt onschuldige partijen een dossier in.',
          explain: 'Tien van de twaalf: zes verdachte en vier legitieme hosts. Dat is ruis.' },
        { q: 'Waarom is de gedeelde SSH-hostkey zo\'n sterke aanwijzing?', options: ['Een hostkey hoort per server uniek te zijn; een gedeelde sleutel wijst op servers die uit één image zijn uitgerold', 'SSH is een zeldzaam protocol', 'De sleutel bevat de naam van de dader', 'Omdat alle twaalf hosts hem delen'], answer: 0,
          wrong: { 1: 'SSH draait op vrijwel elke server. Het gaat om de specifieke sleutel.', 2: 'Een hostkey bevat geen naam.', 3: 'Alleen de zes verdachte hosts delen hem. Als iedereen hem deelde, was het ruis.' },
          explain: 'Een gekloonde sleutel is een fout in het uitrolproces: de vingerafdruk van degene die de servers neerzette.' },
        { q: 'Wat heb je met het cluster bewezen?', options: ['Dat de drie zaken dezelfde facilitator gebruiken, niet dat het dezelfde dader is', 'Dat één dader alle drie de aanvallen pleegde', 'Dat RotsHost de aanvallen zelf uitvoerde', 'Niets, want de certificaten verschillen'], answer: 0,
          wrong: { 1: 'De hostkey wijst naar wie de servers uitrolde, niet naar wie ze huurde.', 2: 'Een hoster levert de infrastructuur; wat klanten ermee doen, is een andere vraag.', 3: 'Verschillende certificaten zijn normaal. Ze maken de link via de hostkey niet ongedaan.' },
          explain: 'Infrastructuur koppelen is niet hetzelfde als een dader aanwijzen.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{gouden_image_verraadt_de_hoster}'],
          hints: ['Open de uitleg en lees de callout onderaan.'],
          explain: 'De vlag is NM{gouden_image_verraadt_de_hoster}.' },
      ],
    },

    {
      title: 'Taak 2 — Pivoteer naar de hoster',
      tryFirst: true,
      intro: '<p>Begin in het lab bij één incident-IP per zaak en pivoteer verder. Zoek de entiteit die alle drie de zaken met de hostingdienst verbindt. Let op de bron en de tijd bij elke relatie.</p>',
      content: `
        <p>Je weet dat de drie zaken infrastructuur delen. Nu wil je weten <em>van wie</em>. Daarvoor
        <strong>pivoteer</strong> je: je springt van een kenmerk dat je kent naar kenmerken die je nog niet kent. Dat
        doe je passief, met open bronnen en eigen dossiergegevens. Je raakt de servers van de verdachte niet aan.</p>

        <h3>De bronnen</h3>
        <ul>
          <li><strong>Reverse DNS (PTR)</strong>: welke naam hoort bij een IP-adres? Hosters geven klantservers vaak
          een naam als <code>vps-0412.cust.hoster.example</code>. Passive DNS bewaart die koppelingen door de tijd.</li>
          <li><strong>BGP-routeringsdata</strong>: welk netwerk (ASN) kondigt dit IP-blok aan op internet? Tools als
          RIPEstat laten dat zien.</li>
          <li><strong>WHOIS van de IP-registry</strong>: op welke organisatie is het ASN geregistreerd? Bij een
          bulletproof hoster is dat vaak een brievenbusfirma.</li>
          <li><strong>Certificate transparency, forumarchieven en archive.org</strong>: het klantenportaal, de
          advertenties en de bestelpagina van de hoster.</li>
        </ul>

        <h3>Wat een bulletproof hoster is</h3>
        <p>Een gewone hoster haalt een server offline als hij een gegronde melding van misbruik krijgt. Een
        <strong>bulletproof hoster</strong> belooft klanten het tegenovergestelde: hij negeert abuse-meldingen,
        vraagt geen identiteit, neemt alleen crypto aan en waarschuwt klanten soms als autoriteiten vragen stellen.
        Daarmee is hij een <strong>facilitator</strong>: hij pleegt de aanvallen niet zelf, maar maakt ze mogelijk voor
        veel klanten tegelijk. Daarom staat bulletproof hosting in de vacature tussen ransomware, DDoS en malware als
        kernwerk van het team.</p>

        <h3>Voorbeeld van een pivot</h3>
        <p><code>203.0.113.14</code> &rarr; PTR <code>vps-0412.cust...</code> &rarr; het domein erboven &rarr; het
        abuse-contact, het certificaat van het portaal, de reseller op een forum. Elke stap noteer je met
        <strong>bron en datum</strong>, zodat een collega hem kan herhalen en een rechter hem kan volgen.</p>

        <div class="callout danger"><strong>Geen contact met de verdachte:</strong> mail het abuse-adres niet en log
        niet in op het klantenportaal. Dat tipt de hoster en kan buiten je bevoegdheden vallen. Verzamelen voor een
        opsporingsonderzoek gebeurt binnen de kaders van het Wetboek van Strafvordering en de Wet politiegegevens.</div>
        <div class="callout tip"><strong>Beloning:</strong> drie zaken, één huisbaas. Vlag:
        <code>NM{alle_wegen_naar_de_rots}</code>.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'van drie incidenten naar de hoster',
        scenario: 'Start bij de incident-IP\'s van zaak A, B en C. Pivoteer via reverse DNS, routering en WHOIS naar de dienst erachter.',
        entities: TACB_ENTITIES,
        edges: TACB_EDGES,
        goal: 'Welk domein verbindt de reverse DNS van alle drie de zaken met de hostingdienst?',
        bridge: ['rotshost.example'],
      },
      questions: [
        { q: 'Welk domein verbindt de reverse DNS van de drie zaken?', answer: ['rotshost.example'],
          hints: ['Klik een incident-IP aan en volg de PTR-relatie.', 'Elke PTR-naam is een subdomein van hetzelfde domein.'],
          wrong: { 'as64511': 'Het ASN verbindt de zaken ook, maar gevraagd is het domein.', '/^vps-/i': 'Dat is de naam van één klantserver. Ga één stap hoger.' },
          explain: 'Alle drie de PTR-namen zijn subdomeinen van rotshost.example.' },
        { q: 'Op welke organisatie is AS64511 geregistreerd?', answer: ['Rots Holding Ltd', 'rots holding', 'rots holding ltd.'],
          hints: ['Klik AS64511 aan in het lab.', 'De bron is de WHOIS van de IP-registry.'],
          explain: 'Rots Holding Ltd: het bedrijf achter het netwerk, waarschijnlijk een brievenbusfirma.' },
        { q: 'Een collega wil het abuse-adres mailen "om te kijken of ze reageren". Wat is je advies?', options: ['Niet doen: een bulletproof hoster negeert dat en kan zijn klanten waarschuwen', 'Doen, het kan geen kwaad', 'Doen, maar vanaf een privé-adres', 'Doen, en meteen ook de reseller mailen'], answer: 0,
          wrong: { 1: 'Het kan wel kwaad: het verraadt dat er onderzoek loopt.', 2: 'Een privé-adres maakt het niet minder een tip-off, en het valt buiten je werkkaders.', 3: 'Dat verdubbelt het risico op een tip-off.' },
          explain: 'Bij een facilitator die opzettelijk misbruik toelaat, is een abuse-melding geen interventie maar een waarschuwing.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{alle_wegen_naar_de_rots}'],
          hints: ['Open de uitleg en lees de callout onderaan.'],
          explain: 'De vlag is NM{alle_wegen_naar_de_rots}.' },
      ],
    },

    {
      title: 'Taak 3 — Het samenwerkingsverband: wie is de broker?',
      tryFirst: true,
      intro: '<p>In het lab liggen zes fragmenten uit de drie dossiers en uit open bronnen. Eén alias komt in alle drie de zaken terug als tussenpersoon. Zoek die alias, de code waarmee de booter korting geeft, en het contactadres dat de phishingcrew opsloeg. Eén fragment is een afleider.</p>',
      content: `
        <p>De vacature vraagt je "kenmerken van verdachten en criminele samenwerkingsverbanden" te beschrijven. Een
        samenwerkingsverband in cybercrime is zelden een vaste bende met een baas. Het is vaker een
        <strong>netwerk van diensten</strong>: wie levert wat aan wie, en wie verdient eraan?</p>

        <h3>Rollen in deze zaak</h3>
        <table>
          <thead><tr><th>Rol</th><th>Wie</th><th>Wat hij doet</th></tr></thead>
          <tbody>
            <tr><td><strong>Facilitator</strong></td><td>RotsHost</td><td>Levert servers die niet offline gaan bij klachten.</td></tr>
            <tr><td><strong>Broker of reseller</strong></td><td>nog onbekend</td><td>Koopt capaciteit in bij de hoster en verkoopt die door. Is het aanspreekpunt van de klanten.</td></tr>
            <tr><td><strong>Klanten</strong></td><td>de ransomware-affiliate, de booter, de phishingcrew</td><td>Plegen de delicten die de slachtoffers raken.</td></tr>
          </tbody>
        </table>
        <p>Waarom is de broker interessant? Hij is een <strong>knooppunt</strong>: hij kent de hoster én alle klanten.
        Zijn administratie kan in één keer drie (en waarschijnlijk meer) zaken verbinden. In netwerktermen heeft hij een
        hoge <em>betweenness</em>: veel verbindingen lopen via hem.</p>

        <h3>Correleren zonder te overschatten</h3>
        <p>Je hebt fragmenten uit verschillende bronnen: een forumarchief, beslagen administratie, een open
        Telegramkanaal, berichten uit een in beslag genomen telefoon en een archiefversie van een website. Een link is
        sterk als hij in <strong>onafhankelijke</strong> bronnen terugkomt via een <strong>specifiek</strong> kenmerk:
        een exact contactadres, een klantnummer, een kortingscode. Een alias die er alleen op lijkt, is geen link.
        Aliassen als "kaap-iets" zijn er veel; een gelijkende naam zonder gedeeld adres of code bewijst niets.</p>

        <h3>Voorbeeld van een correlatie</h3>
        <p>Een factuur in zaak A noemt een klantaccount bij een reseller. Een Telegramkanaal in zaak B noemt een
        kortingscode. De website van de hoster legt uit dat elke reseller een eigen code krijgt. Als het voorvoegsel
        van het klantaccount en de code hetzelfde zijn, heb je twee onafhankelijke bronnen die naar dezelfde
        reseller wijzen.</p>

        <div class="callout info"><strong>Labels:</strong> schrijf bij elke bewering of hij <em>bekend</em>
        (direct waargenomen), <em>afgeleid</em> (uit meerdere waarnemingen) of een <em>aanname</em> is. "De reseller is
        één persoon" is hier nog een aanname.</div>
        <div class="callout tip"><strong>Beloning:</strong> de spin in het web. Vlag:
        <code>NM{de_kaapstander_bemiddelt}</code>.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'zes fragmenten, één tussenpersoon',
        scenario: 'Fragmenten uit zaak A, B en C en uit open bronnen (fictief). Wie verkoopt de RotsHost-capaciteit door aan alle drie de klanten?',
        records: TACB_RECORDS,
        ask: [
          { q: 'Welke alias is de reseller die alle drie de klanten bedient?', answer: ['kaapstander'], hint: 'Zoek de alias die in zaak A, B én C terugkomt, direct of via een code of adres.' },
          { q: 'Welke resellercode noemt de booterdienst?', answer: ['KS07', 'ks-07', 'ks 07'], hint: 'Lees het Telegramfragment.' },
          { q: 'Welk contactadres koppelt de phishingcrew aan de reseller?', answer: ['kaapstander@chat.example'], hint: 'Vergelijk het opgeslagen contact in R4 met de advertentie in R1.' },
        ],
      },
      questions: [
        { q: 'Welk fragment is de afleider zonder aantoonbare link met de zaak? Geef de code (R1 tot en met R6).', answer: ['R6', 'r 6', '6'],
          hints: ['Zoek een alias die op de reseller lijkt maar niets met hem deelt.', 'Kijk of het contactadres of een code overeenkomt.'],
          wrong: { 'r5': 'R5 is de website van de hoster zelf. Die legt uit hoe de resellercodes werken.', 'r3': 'R3 noemt de code KS07, die via R5 en R2 naar de reseller wijst.' },
          why: 'Een gelijkende naam is een klassieke valkuil. Wie hem toch koppelt, sleept een onschuldige of een andere zaak het dossier in.',
          explain: 'R6 (kaapvaarder) lijkt op de alias, maar deelt geen adres, code of handel. Geen link.' },
        { q: 'Welke rol heeft kaapstander in het samenwerkingsverband?', options: ['Broker of reseller: hij koopt in bij de hoster en verkoopt door aan de klanten', 'Facilitator: hij beheert de servers zelf', 'Klant: hij pleegt zelf de ransomware-aanval', 'Slachtoffer'], answer: 0,
          wrong: { 1: 'De servers zijn van RotsHost (AS64511, Rots Holding Ltd). Kaapstander verkoopt ze door.', 2: 'De ransomware-aanval pleegt de affiliate, die bij hem huurt.', 3: 'Er is niets dat daarop wijst.' },
          explain: 'Hij is de tussenpersoon tussen de facilitator en de klanten: de broker.' },
        { q: 'Waarom is het klantaccount KS-07-0412 uit zaak A zo waardevol?', options: ['Het voorvoegsel past bij code KS07 uit zaak B en "0412" bij de servernaam vps-0412 uit de pivot: drie onafhankelijke bronnen sluiten op elkaar aan', 'Het is een wachtwoord', 'Het bewijst wie de affiliate is', 'Het is niet waardevol'], answer: 0,
          wrong: { 1: 'Het is een klantnummer, geen wachtwoord.', 2: 'Het koppelt de affiliate aan de reseller, maar zegt niets over zijn identiteit.', 3: 'Juist een specifiek nummer dat in meerdere bronnen terugkomt, is waardevol.' },
          explain: 'Specifieke kenmerken die in onafhankelijke bronnen terugkomen, maken een link sterk.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{de_kaapstander_bemiddelt}'],
          hints: ['Open de uitleg en lees de callout onderaan.'],
          explain: 'De vlag is NM{de_kaapstander_bemiddelt}.' },
      ],
    },

    {
      title: 'Taak 4 — Volg de huur: de geldstroom',
      tryFirst: true,
      intro: '<p>In het lab staan alle betalingen van juli tot en met september. Reken na: hoeveel ontving de reseller, hoeveel hield hij zelf over, en hoeveel bereikte de exchange? De bedragen zijn omgerekend naar euro.</p>',
      content: `
        <p>Een criminele dienst draait op geld. Wie de betalingen volgt, ziet het verdienmodel, de rollen en het
        punt waar het geld het criminele circuit verlaat. Dat laatste punt, de <strong>cash-out</strong>, is vaak het
        sterkste aangrijpingspunt: daar zit een partij met een identiteitscontrole (KYC) en een administratie.</p>

        <h3>Het model van deze dienst</h3>
        <ol>
          <li>Klanten betalen de reseller per VPS per maand, in crypto. In het lab zijn de bedragen omgerekend naar
          euro op het moment van betalen.</li>
          <li>De reseller betaalt de hoster. Volgens de website van RotsHost (fragment R5) betalen resellers twee derde
          van de catalogusprijs. De rest is zijn marge.</li>
          <li>De hoster betaalt zijn eigen kosten, zoals rackruimte bij een gewoon datacenter, en zet de winst om
          naar euro via een exchange.</li>
          <li>De exchange stort het bedrag op een bankrekening van de holding.</li>
        </ol>

        <h3>Rekenvoorbeeld</h3>
        <p>De phishingcrew huurt 3 VPS'en van 300 euro per maand: 900 euro. De reseller betaalt daarvan twee derde
        door, 600 euro, en houdt 300 euro marge. Klopt de verhouding in het hele lab? Controleer het zelf: deel wat de
        reseller doorbetaalde door wat hij ontving.</p>

        <h3>Waar let je op?</h3>
        <ul>
          <li><strong>Wie betaalt het meest?</strong> Dat zegt iets over de afhankelijkheid van de dienst. Valt de
          grootste klant weg, dan voelt de reseller dat direct.</li>
          <li><strong>Klopt het per maand?</strong> De reseller rekent elke maand af met de hoster. Komt de
          doorbetaling niet overeen met wat hij ontving, dan mis je data of verdient hij ook nog op een andere manier.</li>
          <li><strong>Waar raakt het de legale wereld?</strong> Het datacenter en de exchange zijn gewone bedrijven.
          Bij hen kan een vordering of een gesprek over voorwaarden het verschil maken.</li>
        </ul>

        <div class="callout info"><strong>Financiële expertise:</strong> het team heeft volgens de vacature ook
        financiële expertise. Als analist hoef je niet zelf een vordering op te stellen, maar je moet wel kunnen zeggen
        waar het geld loopt en welke vraag de financieel rechercheur moet stellen.</div>
        <div class="callout tip"><strong>Beloning:</strong> volg de huur, vind de holding. Vlag:
        <code>NM{volg_de_huur}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'van klanthuur naar holding',
        unit: '€',
        scenario: 'Drie klanten betalen de reseller; de reseller betaalt RotsHost; RotsHost betaalt het datacenter en zet de rest om via een exchange.',
        nodes: TACB_NODES,
        edges: TACB_FLOWS,
        ask: [
          { q: 'Hoeveel ontving de reseller in totaal van de drie klanten? (alleen het getal)', answer: ['15300', '15.300'], hint: 'Klik de reseller aan en lees het totaal bij "in".' },
          { q: 'Hoeveel hield de reseller zelf over?', answer: ['5100', '5.100'], hint: 'Ontvangen min doorbetaald aan RotsHost.' },
          { q: 'Hoeveel bereikte de exchange?', answer: ['8000', '8.000'], hint: 'Klik Exchange Pelikaan aan.' },
        ],
      },
      questions: [
        { q: 'Welke klant betaalde de reseller het meest? Geef de letter.', answer: ['B', 'klant b', 'booter', 'donderboot'],
          hints: ['Klik elke klant aan en vergelijk het uitgaande totaal.', 'Twee keer 4.500 euro.'],
          wrong: { 'a': 'Klant A betaalde 3.600 euro, minder dan de booter.', 'c': 'Klant C betaalde drie keer 900 euro: 2.700.' },
          why: 'De grootste klant laat zien waar de dienst van afhangt. Een actie tegen die klant raakt ook de reseller.',
          explain: 'Klant B (DonderBoot) betaalde 9.000 euro, ruim de helft van de 15.300 euro die de reseller ontving.' },
        { q: 'Klopt de verhouding van twee derde uit fragment R5 voor wat de reseller doorbetaalde?', options: ['Ja: 10.200 is twee derde van 15.300', 'Nee: hij betaalde de helft door', 'Nee: hij betaalde alles door', 'Niet te zeggen'], answer: 0,
          wrong: { 1: 'De helft van 15.300 is 7.650. Hij betaalde 10.200.', 2: 'Hij hield 5.100 over.', 3: 'Alle bedragen staan in het lab.' },
          explain: '15.300 x 2/3 = 10.200. De administratie bevestigt het partnerprogramma op de website: twee bronnen die elkaar steunen.' },
        { q: 'Waar zit het sterkste aangrijpingspunt om de opbrengst van RotsHost aan een identiteit te koppelen?', options: ['Bij Exchange Pelikaan en de bankrekening van de holding', 'Bij de wallets van de klanten', 'Bij het datacenter', 'Bij de reseller'], answer: 0,
          wrong: { 1: 'Daar begint de stroom, maar het zegt niets over wie de hoster runt.', 2: 'Het datacenter is belangrijk voor verstoring, maar de opbrengst loopt via de exchange.', 3: 'De reseller is een verdachte, geen partij die je om gegevens vraagt.' },
          explain: 'Bij de cash-out zitten partijen met KYC-gegevens en een administratie: daar kan een vordering iets opleveren.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{volg_de_huur}'],
          hints: ['Open de uitleg en lees de callout onderaan.'],
          explain: 'De vlag is NM{volg_de_huur}.' },
      ],
    },

    {
      title: 'Taak 5 — Crime script en interventieadvies',
      tryFirst: true,
      intro: '<p>Het team wil handelen. In het lab krijg je zes beslismomenten, van de vraag of je de hoster mailt tot wat je met de booterklanten doet. Kies steeds het beste advies. Bij minstens vijf goede keuzes verschijnt de vlag.</p>',
      content: `
        <p>Een interventie kies je niet op gevoel. Je schrijft eerst het <strong>crime script</strong> van de dienst:
        de stappen die RotsHost moet zetten om te kunnen draaien. Daarna zoek je per stap waar je kunt ingrijpen en
        wie dat kan.</p>

        <h3>Het crime script van een bulletproof hoster</h3>
        <table>
          <thead><tr><th>Fase</th><th>Wat de dienst doet</th><th>Sporen</th><th>Interventie (soort, eigenaar)</th></tr></thead>
          <tbody>
            <tr><td><strong>1 · Voorbereiding</strong></td><td>Brievenbusfirma oprichten, ASN en IP-ruimte registreren, rackruimte huren bij een gewoon datacenter.</td><td>Registraties, contracten, WHOIS.</td><td>Registry en datacenter informeren over misbruik van voorwaarden (verstoren; publiek-privaat).</td></tr>
            <tr><td><strong>2 · Werving</strong></td><td>Adverteren op fora; resellers werven met korting en codes.</td><td>Forumposts, aliassen, codes.</td><td>Reseller in beeld brengen (strafrechtelijk; team cybercrime).</td></tr>
            <tr><td><strong>3 · Levering</strong></td><td>VPS'en uitrollen uit één image; betaling in crypto; geen identiteitscontrole.</td><td>Gedeelde hostkey, betaaladres.</td><td>Indicatoren delen onder afspraken (preventief; NCSC en partners).</td></tr>
            <tr><td><strong>4 · Gebruik</strong></td><td>Klanten draaien C2, booterpanelen en phishing.</td><td>Incidenten bij slachtoffers.</td><td>Klanten aanpakken: strafrecht, waarschuwen, alternatief traject (eigenaar per zaak).</td></tr>
            <tr><td><strong>5 · Afscherming</strong></td><td>Abuse negeren, IP's roteren, klanten waarschuwen bij vragen.</td><td>Onbeantwoorde meldingen.</td><td>Geen contact met de hoster: tip-off voorkomen (team, OM).</td></tr>
            <tr><td><strong>6 · Cash-out</strong></td><td>Crypto omzetten via een exchange naar de holding.</td><td>Exchange-administratie, bankrekening.</td><td>Vorderen en beslag (strafrechtelijk; financieel rechercheur, OM).</td></tr>
          </tbody>
        </table>

        <h3>Verstoren of opsporen?</h3>
        <p>De vacature noemt beide: "aan de voorkant, veelal samen met publiek-private partners, verstoren of stoppen
        van criminele processen" én opsporingsonderzoek. Ze sluiten elkaar niet uit, maar de <strong>volgorde</strong>
        telt. Haal je de servers te vroeg offline, dan is het bewijs weg en beginnen de beheerders elders opnieuw. Wacht
        je te lang, dan maken de klanten nieuwe slachtoffers. Hoe het OM en het team dat afwegen, is maatwerk.</p>

        <h3>Het grootste risico: de tip-off</h3>
        <p>Een bulletproof hoster leeft van het vertrouwen van zijn klanten. Elk signaal dat er onderzoek loopt,
        stuurt hij door: een abuse-mail, een aanhouding bij één klant, een publicatie van indicatoren. Daarom breng je
        als intermediair de teams bij elkaar (deconflictie) en stem je de timing af.</p>

        <h3>Hoe het in de praktijk kan lopen</h3>
        <p>In de Duitse CyberBunker-zaak werden de beheerders van een bulletproof hoster eind 2021 veroordeeld voor het
        vormen van een criminele organisatie. Medeplichtigheid aan de afzonderlijke misdrijven van hun klanten bleek
        veel lastiger te bewijzen. Ook dat hoort bij je advies: wat is haalbaar?</p>

        <div class="callout tip"><strong>Beloning:</strong> de vlag verschijnt in het lab bij minstens vijf goede keuzes.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'interventieadvies Operatie Zwarte Rots',
        scenario: 'Jij adviseert de teamleiding, de drie teams en de officier van justitie. Kies bij elk beslismoment het beste advies.',
        pass: 5,
        flag: 'NM{verstoor_zonder_tip_off}',
        steps: TACB_STEPS,
      },
      questions: [
        { q: 'Welke vlag toont de beslissimulatie bij minstens vijf goede keuzes?', answer: ['NM{verstoor_zonder_tip_off}'],
          hints: ['Rond de simulatie af met minstens vijf goede keuzes.'],
          explain: 'De vlag is NM{verstoor_zonder_tip_off}.' },
        { q: 'In welke fase van het crime script hoort "VPS\'en uitrollen uit één image zonder identiteitscontrole"? Geef het nummer.', answer: ['3', 'drie', 'fase 3'],
          hints: ['Kijk in de tabel naar de fase waarin de dienst iets aan de klant overdraagt.'],
          wrong: { '1': 'Fase 1 gaat over het opzetten van de dienst zelf.', '4': 'In fase 4 gebruiken de klanten de servers.' },
          explain: 'Fase 3, levering. Daar ontstond ook het spoor dat de drie zaken verbond: de gedeelde hostkey.' },
        { q: 'Waarom is het datacenter een betere partner dan de hoster zelf?', options: ['Het is een gewoon bedrijf met voorwaarden en een eigen belang; de hoster is een verdachte facilitator', 'Het datacenter is eigendom van de politie', 'De hoster reageert sneller', 'Er is geen verschil'], answer: 0,
          wrong: { 1: 'Nee, het is een gewoon commercieel bedrijf.', 2: 'De hoster reageert misschien snel, maar dan door zijn klanten te waarschuwen.', 3: 'Het verschil is groot: de een is partner, de ander doelwit.' },
          explain: 'Publiek-private verstoring werkt via partijen die geen belang hebben bij het misbruik.' },
      ],
    },

    {
      title: 'Taak 6 — Het intelligenceproduct',
      tryFirst: true,
      intro: '<p>Schrijf het product voor het overleg met de drie teams en de officier van justitie. Hooguit een halve pagina: beoordeling eerst, dan advies met een eigenaar per punt, dan onderbouwing met labels en onzekerheid.</p>',
      content: `
        <p>Alles komt samen. Je hebt een cluster, een pivot naar de hoster, een reseller, een geldstroom en een
        interventieadvies. Nu moet een groep mensen die elk één stuk kennen, in tien minuten hetzelfde beeld hebben en
        weten wat ze moeten doen. De vacature zegt het zo: bevindingen "helder en gestructureerd" vastleggen, zodat
        "ook minder gespecialiseerde in- en externe partners aangezet worden tot actie".</p>

        <h3>Wat erin moet</h3>
        <ul>
          <li><strong>De beoordeling eerst</strong>, met waarschijnlijkheidstaal. Wat is er zeker, wat waarschijnlijk?</li>
          <li><strong>De juiste duiding van het dwarsverband.</strong> De incidenten delen een dienstverlener. Schrijf
          niet op wat je niet hebt aangetoond.</li>
          <li><strong>Een advies per partij, met een eigenaar</strong>: de teams, het OM, de financieel rechercheur,
          partners.</li>
          <li><strong>Labels</strong>: bekend, afgeleid, aanname. En wat je niet weet.</li>
          <li><strong>Kort.</strong> Het bronmateriaal in het lab is langer dan je product mag zijn.</li>
        </ul>

        <h3>Valkuilen in deze casus</h3>
        <ul>
          <li>De drie zaken presenteren als het werk van één groep, omdat ze dezelfde servers gebruiken.</li>
          <li>De alias kaapvaarder toch noemen "omdat hij erop lijkt".</li>
          <li>Een advies "verstoren" zonder eigenaar en zonder timing.</li>
          <li>De indicatoren als bijlage meesturen naar iedereen, zonder afspraken over gebruik.</li>
        </ul>

        <h3>Voorbeeld van een sterke eerste zin</h3>
        <p>"De drie lopende onderzoeken gebruiken vrijwel zeker dezelfde bulletproof-hostingdienst, via één reseller;
        bundeling rond deze facilitator biedt de grootste interventiekans." Daarna volgen de adviezen.</p>

        <div class="callout info"><strong>Rubric:</strong> het lab draait een heuristische checklist (conclusie
        bovenaan, waarschijnlijkheidstaal, eigenaar per advies, korter dan de bron, onzekerheid apart). Het is geen
        AI-beoordeling. Vergelijk daarna met het modelantwoord.</div>
        <div class="callout tip"><strong>Slotvlag:</strong> lever je product af en sluit de operatie. Vlag:
        <code>NM{een_hoster_drie_zaken}</code>.</div>
      `,
      lab: {
        type: 'bluf',
        source: TACB_BLUF_SOURCE,
        model: TACB_BLUF_MODEL,
      },
      questions: [
        { q: 'Welke vlag staat in de slotvlag-callout?', answer: ['NM{een_hoster_drie_zaken}'],
          hints: ['Open de uitleg en lees de callout onderaan.'],
          explain: 'De vlag is NM{een_hoster_drie_zaken}.' },
        { q: 'Welke waarschijnlijkheidsterm past het best bij "de drie zaken gebruiken dezelfde hostingdienst"?', options: ['Vrijwel zeker', 'Reële kans', 'Onwaarschijnlijk', 'Vrijwel uitgesloten'], answer: 0,
          wrong: { 1: 'Te voorzichtig: drie onafhankelijke kenmerken (hostkey, ASN, reverse DNS) wijzen dezelfde kant op.', 2: 'Het bewijs wijst juist sterk in deze richting.', 3: 'Het tegendeel is aangetoond.' },
          explain: 'Gedeelde hostkey, ASN en reverse DNS: dat is vrijwel zeker dezelfde dienst.' },
        { q: 'Boss: een collega schrijft in het concept: "De drie incidenten zijn gepleegd door één criminele groep, want ze delen het ASN en de SSH-hostkey." Hoeveel verschillende betalende klanten van de reseller tel je in de geldstroom, en wie wijzen die gedeelde kenmerken dan aan: dezelfde dader of dezelfde facilitator? Antwoord als getal plus één woord, bijvoorbeeld: 2 dader.', boss: true,
          answer: ['3 facilitator', '3, facilitator', 'drie facilitator', '3 dezelfde facilitator', '3 hoster', 'drie hoster'],
          hints: ['Tel in de geldstroom de knopen die de reseller betalen.', 'Denk terug aan taak 1: wie zet de hostkey op een server, de huurder of degene die de server uitrolt?', 'Drie aparte klanten met elk een eigen delict; de gedeelde kenmerken horen bij de partij die hun servers levert.'],
          wrong: { '/^\\D*3\\b.*(dader|groep|bende)/i': 'Het aantal klopt. Maar drie aparte betalende klanten wijzen er juist op dat het verschillende daders zijn. De gedeelde kenmerken horen bij wie de servers uitrolde.', '/^\\D*1\\b/': 'In de geldstroom betalen drie verschillende klanten apart aan de reseller.', '/^\\D*(2|4|5)\\b/': 'Tel opnieuw de knopen die naar de reseller betalen.' },
          why: 'Een dwarsverband verkeerd duiden kan drie teams op een verkeerd spoor zetten en leiden tot een verkeerde interventie: je zoekt één bende in plaats van de facilitator aan te pakken.',
          explain: 'In de geldstroom betalen drie klanten apart (A, B en C). De hostkey en het ASN horen bij de hoster die hun servers uitrolde. Het dwarsverband wijst dus naar één facilitator, niet naar één dader.' },
      ],
    },
  ],
  terms: [
    { term: 'Bulletproof hosting', def: 'Hosting die bewust misbruik toelaat: abuse-meldingen worden genegeerd, klanten hoeven zich niet te identificeren en betalen vaak in crypto.' },
    { term: 'Facilitator', def: 'Een partij die een delict niet zelf pleegt, maar het mogelijk maakt voor anderen, zoals een bulletproof hoster.' },
    { term: 'Reseller (broker)', def: 'Een tussenpersoon die capaciteit van een hoster inkoopt en doorverkoopt aan klanten; vaak het aanspreekpunt van die klanten.' },
    { term: 'ASN', def: 'Autonomous System Number: het nummer van een netwerk op internet. Via routeringsdata zie je welk netwerk een IP-adres aankondigt.' },
    { term: 'SSH-hostkey', def: 'De sleutel waarmee een server zich bij SSH identificeert. Hoort per server uniek te zijn; een gedeelde sleutel wijst op klonen uit één image.' },
    { term: 'Golden image', def: 'Een standaard schijfkopie waaruit een hoster servers uitrolt. Worden sleutels daarna niet vernieuwd, dan delen alle servers dezelfde vingerafdruk.' },
    { term: 'Reverse DNS (PTR)', def: 'De naam die bij een IP-adres hoort. Hosters geven klantservers vaak een naam onder hun eigen domein.' },
    { term: 'Zeldzaamheidstoets', def: 'De vraag of een gedeeld kenmerk zeldzaam genoeg is om een echte link te zijn. Wat ook onschuldige hosts delen, is ruis.' },
    { term: 'Tip-off', def: 'Een signaal waardoor verdachten merken dat er onderzoek loopt, met het risico dat ze bewijs wissen of verhuizen.' },
    { term: 'Deconflictie', def: 'Afstemmen tussen teams die op hetzelfde netwerk werken, zodat de acties van het ene team die van het andere niet verstoren.' },
    { term: 'Publiek-private verstoring', def: 'Samen met bedrijven, zoals datacenters, providers of exchanges, een crimineel proces stoppen, naast of in plaats van strafrechtelijk optreden.' },
    { term: 'Cash-out', def: 'Het punt waar crimineel geld het circuit verlaat, bijvoorbeeld bij een exchange; vaak het sterkste aangrijpingspunt.' },
  ],
  resources: [
    { title: 'RIPEstat — routerings- en registratiegegevens van IP-adressen en ASN\'s', url: 'https://stat.ripe.net/' },
    { title: 'Europol — Internet Organised Crime Threat Assessment (IOCTA)', url: 'https://www.europol.europa.eu/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
  check: [
    { q: 'Tien van twaalf hosts delen dezelfde JARM, ook legitieme. Wat concludeer je?', options: ['Het is ruis: het kenmerk onderscheidt niets', 'Het is een sterk clusterkenmerk', 'Alle tien zijn verdacht', 'JARM is altijd uniek'], answer: 0, explain: 'Wat ook onschuldige hosts delen, faalt voor de zeldzaamheidstoets.' },
    { q: 'Waarom mail je het abuse-adres van een bulletproof hoster niet?', options: ['Hij negeert het en kan zijn klanten waarschuwen', 'Het adres bestaat niet', 'Mailen is altijd verboden', 'Het duurt te lang'], answer: 0, explain: 'Bij een opzettelijke facilitator is een melding een tip-off, geen interventie.' },
    { q: 'Wat maakt een reseller interessant voor de analyse?', options: ['Hij is een knooppunt dat de hoster en veel klanten verbindt', 'Hij heeft de meeste servers', 'Hij pleegt zelf de aanvallen', 'Hij is altijd de leider'], answer: 0, explain: 'Via de broker lopen veel verbindingen: zijn administratie verbindt zaken.' },
    { q: 'Wat is de beste volgorde bij een integrale aanpak van een criminele dienst?', options: ['In overleg met het OM eerst bewijs veiligstellen, daarna gecoördineerd verstoren', 'Eerst alles offline halen, daarna kijken wat er nog over is', 'Alleen jarenlang onderzoek, niets verstoren', 'Elk team doet zijn eigen actie wanneer het uitkomt'], answer: 0, explain: 'Opsporen en verstoren versterken elkaar als de timing klopt.' },
  ],
});
