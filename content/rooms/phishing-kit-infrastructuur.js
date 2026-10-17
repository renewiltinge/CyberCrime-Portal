/* Room: Defensief — phishing-kit & -infrastructuur ontleden (tot de takedown) */

// =======================================================================
//  Alles FICTIEF: .nm.lab-domeinen, documentatie-IP's (RFC 5737) en een
//  verzonnen phishing-kit. Passieve analyse; je breekt nergens in.
// =======================================================================

// --- IOC-extractor: de configuratie van de phishing-kit ---
const PK_IOC_TEXT = [
  '// config.php — gevonden phishing-kit (passief uit een open directory)',
  '$victim_brand = "nederbank.nl";',
  '$exfil_endpoint = "https://opslag-x9f3.nm.lab/collect.php";',
  '$notify_email = "beheer@boos.nm.lab";',
  '$telegram_note = "stuurt buit ook naar @boos_exfil_bot";',
  '// drop-IPs voor de buit: 203.0.113.77 en secundair 198.51.100.40',
  '// kit-signatuur in de footer: "kit by rxkit v3"',
].join('\n');

// --- Pivot: twee phishingsites, één operator (gedeeld exfil-endpoint + cert) ---
const PK_ENTITIES = [
  { id: 'p1', type: 'domain', label: 'nederbank-verificatie.boos.nm.lab' },
  { id: 'p2', type: 'domain', label: 'inlog-pakketpost.boos.nm.lab' },
  { id: 'exfil', type: 'domain', label: 'opslag-x9f3.nm.lab (exfil-endpoint)' },
  { id: 'cert', type: 'cert', label: 'A1B2C3D4 (TLS-cert)' },
  { id: 'mail', type: 'email', label: 'beheer@boos.nm.lab' },
];
const PK_EDGES = [
  { from: 'p1', to: 'exfil', rel: 'POST buit naar', time: '2026-02', source: 'kit-config' },
  { from: 'p2', to: 'exfil', rel: 'POST buit naar', time: '2026-02', source: 'kit-config' },
  { from: 'p1', to: 'cert', rel: 'presenteert cert', time: '2026-02', source: 'crt.sh' },
  { from: 'p2', to: 'cert', rel: 'presenteert cert', time: '2026-02', source: 'crt.sh' },
  { from: 'p1', to: 'mail', rel: 'WHOIS-contact', time: '2026-02', source: 'WHOIS' },
];

CS.registerRoom({
  id: 'phishing-kit-infrastructuur',
  path: 'defensief',
  order: 8,
  title: 'Phishing-kit & -infrastructuur ontleden',
  icon: '🧪',
  difficulty: 'Gemiddeld',
  minutes: 55,
  summary: 'Moderne phishing is industrie: kant-en-klare "kits" (phishing-as-a-service) maken nep-inlogpagina\'s en sturen de buit automatisch weg. Je ontleedt zo\'n kit van buitenaf: je analyseert de phishing-URL, haalt de IOCs uit de kit-configuratie, pivoteert de infrastructuur naar één operator, en zet de stappen voor een takedown. Alles passief en lawful.',
  objectives: [
    'Uitleggen wat een phishing-kit / phishing-as-a-service is en hoe de infrastructuur eruitziet',
    'Een phishing-URL ontleden en de misleiding aanwijzen',
    'IOCs uit een kit-configuratie halen (exfil-endpoint, drop-IPs, e-mail)',
    'De infrastructuur pivoteren om meerdere sites aan één operator te koppelen',
    'De stappen van een takedown benoemen (abuse, registrar, host, blocklists)',
  ],
  terms: [
    { term: 'Phishing-kit', def: 'Een kant-en-klaar pakket (HTML/PHP) dat een nep-inlogpagina nabootst en ingevoerde gegevens wegstuurt.' },
    { term: 'Phishing-as-a-Service (PhaaS)', def: 'Phishing-kits en -diensten die als abonnement worden verkocht, zodat ook onervaren criminelen kunnen phishen.' },
    { term: 'Landingspagina', def: 'De nep-inlogpagina die het slachtoffer ziet; vaak een pixel-perfecte kopie van de echte site.' },
    { term: 'Exfil-endpoint', def: 'De plek waar de kit de buitgemaakte gegevens naartoe stuurt (een URL, e-mail of Telegram-bot).' },
    { term: 'Open directory', def: 'Een verkeerd geconfigureerde map op de server waardoor onderzoekers de kit-bestanden (soms de config) passief kunnen inzien.' },
    { term: 'Kit-signatuur', def: 'Een herkenbaar kenmerk in de kit (een commentaar, bestandsnaam, variabele) dat kits van dezelfde maker verbindt.' },
    { term: 'Pivoteren', def: 'Van één bekend kenmerk (exfil-endpoint, cert) naar andere sites van dezelfde operator springen.' },
    { term: 'Takedown', def: 'Een kwaadaardige site offline laten halen via de hostingpartij/registrar (abuse-melding) en op blocklists zetten.' },
  ],
  resources: [
    { title: 'APWG — Anti-Phishing Working Group', url: 'https://apwg.org/' },
    { title: 'PhishTank — phishing melden en opzoeken', url: 'https://phishtank.org/' },
    { title: 'crt.sh — certificate transparency', url: 'https://crt.sh/' },
    { title: 'NCSC — phishing melden', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Phishing is een industrie',
      content: `
        <p>Phishing is allang geen handwerk meer. Criminelen kopen kant-en-klare <strong>phishing-kits</strong> — of huren
        <strong>Phishing-as-a-Service</strong> — die een pixel-perfecte nep-inlogpagina leveren en de buit automatisch
        wegsturen. De infrastructuur heeft vaste onderdelen: een <strong>landingspagina</strong> (de nep-site), een
        <strong>exfil-endpoint</strong> (waar de gegevens heen gaan), en vaak een <strong>C2/Telegram-bot</strong> voor
        meldingen.</p>
        <p>Als verdediger ontleed je zo'n operatie <strong>van buitenaf en passief</strong>: de URL, de kit-configuratie (als
        die via een open directory zichtbaar is), de gedeelde infrastructuur. Zo koppel je losse sites aan één operator — en
        zet je de takedown in gang.</p>
        <div class="callout warn"><strong>Alles fictief en passief:</strong> de domeinen, IP's en kit zijn verzonnen. Je kijkt
        in open bronnen; je breekt nergens in.</div>
        <div class="callout tip"><strong>Beloning:</strong> phishing is schaalbaar geworden. Vlag: <code>NM{kit_maakt_het_schaalbaar}</code>.</div>
      `,
      questions: [
        { q: 'Wat is een phishing-kit?', options: ['Een kant-en-klaar pakket dat een nep-inlogpagina nabootst en gegevens wegstuurt', 'Een antivirusprogramma', 'Een wachtwoordmanager', 'Een firewall-regel'], answer: 0, explain: 'De kit bevat de nep-pagina én de logica om ingevoerde gegevens te exfiltreren.' },
        { q: 'Wat maakt Phishing-as-a-Service gevaarlijk?', options: ['Ook onervaren criminelen kunnen tegen een abonnement grootschalig phishen', 'Het is legaal', 'Het werkt alleen op mainframes', 'Het is heel duur en dus zeldzaam'], answer: 0, explain: 'PhaaS verlaagt de drempel enorm — phishing wordt een schaalbare dienst.' },
        { q: 'Hoe ontleed je zo\'n operatie als verdediger?', options: ['Passief en van buitenaf: URL, kit-config (open directory), gedeelde infrastructuur', 'Door in te breken op de server', 'Door de kit zelf te kopen en te gebruiken', 'Dat kan niet'], answer: 0, explain: 'Lawful onderzoek blijft passief: open bronnen, geen ongeautoriseerde toegang.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{kit_maakt_het_schaalbaar}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{kit_maakt_het_schaalbaar}.' },
      ],
    },
    {
      title: 'Taak 2 — Ontleed de phishing-URL',
      content: `
        <p>Je vindt twee links die naar de nep-site leiden. Ontleed ze: waar staat het echte domein, en welk merk wordt
        nagebootst? Onthoud: het echte domein staat <strong>rechts</strong>, vlak vóór het pad.</p>
        <div class="callout tip"><strong>Beloning:</strong> het merk zit in het subdomein, niet in het domein. Vlag: <code>NM{merk_in_subdomein}</code>.</div>
      `,
      lab: {
        type: 'url',
        urls: [
          'https://nederbank.nl.secure-login.boos.nm.lab/inloggen',
          'https://nederbank-verificatie.boos.nm.lab/klant',
        ],
      },
      questions: [
        { q: 'Wat is het echte geregistreerde domein van deze links (rechts, vlak vóór het pad)?', answer: ['boos.nm.lab', 'nm.lab'], hint: 'Kijk naar de laatste labels vóór de eerste /.', explain: 'Het domein is boos.nm.lab; "nederbank.nl" staat er slechts als subdomein voor om te misleiden.' },
        { q: 'Welk merk wordt nagebootst?', answer: ['nederbank', 'Nederbank'], hint: 'Het staat prominent in het subdomein.', explain: 'De links zetten "nederbank" in het subdomein om vertrouwen te wekken.' },
        { q: 'Waarom is het "https"-slotje geen bewijs van echtheid?', options: ['Https versleutelt alleen de verbinding; ook phishingsites hebben een certificaat', 'Https betekent dat de site veilig is', 'Https controleert de eigenaar', 'Dat is het wel'], answer: 0, explain: 'Een certificaat is gratis en zegt niets over wie de site beheert.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{merk_in_subdomein}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{merk_in_subdomein}.' },
      ],
    },
    {
      title: 'Taak 3 — Haal de IOCs uit de kit',
      content: `
        <p>Door een <strong>open directory</strong> is de configuratie van de kit zichtbaar. Plak hem in de extractor en haal
        de indicatoren eruit: waar gaat de buit heen (exfil-endpoint), welke drop-IP's, welk meldadres? Defang voordat je ze
        deelt.</p>
        <div class="callout tip"><strong>Beloning:</strong> de config verraadt de buitroute. Vlag: <code>NM{config_verraadt_de_buit}</code>.</div>
      `,
      lab: {
        type: 'ioc',
        text: PK_IOC_TEXT,
      },
      questions: [
        { q: 'Naar welk endpoint stuurt de kit de buit?', answer: ['opslag-x9f3.nm.lab', 'https://opslag-x9f3.nm.lab/collect.php', 'opslag-x9f3.nm.lab/collect.php'], hint: 'De $exfil_endpoint-regel.', explain: 'De kit POST de gestolen gegevens naar https://opslag-x9f3.nm.lab/collect.php.' },
        { q: 'Hoeveel unieke IPv4-adressen staan er als drop-IP in de config?', answer: ['2', 'twee'], hint: 'De drop-IP-regel.', explain: 'Twee: 203.0.113.77 en 198.51.100.40.' },
        { q: 'Welk meldadres (e-mail) gebruikt de operator?', answer: ['beheer@boos.nm.lab'], hint: 'De $notify_email-regel.', explain: 'beheer@boos.nm.lab ontvangt een melding bij elke buit.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{config_verraadt_de_buit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{config_verraadt_de_buit}.' },
      ],
    },
    {
      title: 'Taak 4 — Pivoteer naar de operator',
      content: `
        <p>Eén phishingsite is zelden alleen. Pivoteer de infrastructuur: welke andere site deelt hetzelfde
        <strong>exfil-endpoint</strong> en hetzelfde <strong>certificaat</strong>? Dat gedeelde, zeldzame kenmerk koppelt de
        sites aan <em>één operator</em> — en dat maakt een bredere takedown mogelijk.</p>
        <div class="callout tip"><strong>Beloning:</strong> één exfil-endpoint, één operator. Vlag: <code>NM{een_endpoint_een_operator}</code>.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'twee phishingsites, één operator',
        scenario: 'Twee nep-sites (verschillende merken) POSTen naar hetzelfde exfil-endpoint en delen een certificaat.',
        entities: PK_ENTITIES,
        edges: PK_EDGES,
      },
      questions: [
        { q: 'Welk gedeeld kenmerk koppelt de twee phishingsites aan één operator?', answer: ['opslag-x9f3.nm.lab', 'exfil-endpoint', 'het exfil-endpoint', 'A1B2C3D4', 'het certificaat', 'cert'], hint: 'Beide sites POSTen hun buit naar hetzelfde adres (en delen een cert).', explain: 'Beide sturen de buit naar opslag-x9f3.nm.lab en presenteren cert A1B2C3D4 — zelfde operator.' },
        { q: 'Waarom is een gedeeld exfil-endpoint een sterke link?', options: ['Het is specifiek en zelden toevallig gedeeld: dezelfde operator oogst op één plek', 'Omdat endpoints geheim zijn', 'Omdat het een IP is', 'Dat is het niet'], answer: 0, explain: 'Verschillende merk-sites die naar hetzelfde oogst-adres sturen, horen vrijwel zeker bij dezelfde hand.' },
        { q: 'Wat levert deze pivot op voor de verdediging?', options: ['Een bredere takedown: je haalt het hele cluster neer in plaats van één site', 'De naam van de dader', 'Een decryptor', 'Niets'], answer: 0, explain: 'Door het cluster te kennen, kun je alle sites én het exfil-endpoint laten blokkeren/offline halen.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{een_endpoint_een_operator}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{een_endpoint_een_operator}.' },
      ],
    },
    {
      title: 'Taak 5 — Zet de takedown in',
      content: `
        <p>Analyse zonder actie helpt niemand. Zet de <strong>takedown</strong> in gang:</p>
        <ul>
          <li><strong>Meld</strong> de phishing-URL's bij blocklists en meldpunten (PhishTank, APWG, de nagebootste bank, het
          NCSC), zodat browsers en filters ze blokkeren.</li>
          <li><strong>Abuse-melding</strong> naar de <strong>hostingpartij</strong> en de <strong>registrar</strong> van de
          domeinen (abuse@…), met bewijs, om de sites offline te halen.</li>
          <li>Laat ook het <strong>exfil-endpoint</strong> blokkeren — zonder oogstplek is de kit waardeloos.</li>
          <li>Deel de <strong>IOCs</strong> (gedefangd) met je eigen SOC en sectorpartners zodat anderen beschermd zijn.</li>
          <li>Doe waar passend <strong>aangifte</strong>; laat de verdere opsporing aan het bevoegde gezag.</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> melden, blokkeren, offline. Vlag: <code>NM{meld_blokkeer_offline}</code>.</div>
      `,
      questions: [
        { q: 'Wat is een effectieve eerste takedown-stap?', options: ['De URL\'s melden bij blocklists/meldpunten en een abuse-melding naar host en registrar sturen', 'Zelf de server hacken', 'Niets, wachten tot het vanzelf stopt', 'De nep-site bezoeken en je gegevens invoeren'], answer: 0, explain: 'Blocklists beschermen snel veel mensen; de abuse-melding laat de site offline halen.' },
        { q: 'Waarom wil je ook het exfil-endpoint laten blokkeren?', options: ['Zonder oogstplek voor de buit is de kit waardeloos', 'Omdat het mooi staat', 'Dat hoeft niet', 'Om de snelheid te verhogen'], answer: 0, explain: 'Als de buit nergens heen kan, stop je de schade ook bij nog-actieve pagina\'s.' },
        { q: 'Wat doe je met de verzamelde IOCs?', options: ['Gedefangd delen met je SOC en sectorpartners, en waar passend aangifte doen', 'Publiek online zetten met namen', 'Weggooien', 'Zelf de operator confronteren'], answer: 0, explain: 'Delen beschermt anderen; opsporing en attributie laat je aan het bevoegde gezag.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{meld_blokkeer_offline}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{meld_blokkeer_offline}.' },
      ],
    },
  ],
});
