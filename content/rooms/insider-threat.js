/* Room: Defensief — insider threat & datadiefstal */

// =======================================================================
//  Alles FICTIEF: een verzonnen medewerker en netwerk. Documentatie-IP's
//  (RFC 5737), .nm.lab-domeinen. Je oefent detectie en een zorgvuldig proces.
// =======================================================================

// --- NetFlow: betrap de insider-exfiltratie ---
const IT_FLOWS = [
  { dst: '198.51.100.88', dstLabel: 'drive-prive.nm.lab', port: 443, proto: 'tcp', conns: 6, intervalSec: null, jitterPct: null, bytesOut: 8200000000, bytesIn: 4000, note: 'grote uploads — ’s nachts, vlak voor zijn vertrekdatum' },
  { dst: '198.51.100.12', dstLabel: 'intranet.nm.lab', port: 443, proto: 'tcp', conns: 74, intervalSec: null, jitterPct: 55, bytesOut: 3100000, bytesIn: 24000000, note: 'normaal portaalgebruik' },
  { dst: '198.51.100.25', dstLabel: 'mail.nm.lab', port: 993, proto: 'tcp', conns: 33, intervalSec: null, jitterPct: 48, bytesOut: 700000, bytesIn: 9000000, note: 'IMAP-mail' },
];

// --- Connections: insider-threat in kaart ---
const IT_GROUPS = [
  { name: 'Soorten insider', items: ['Kwaadwillende insider', 'Nalatige insider', 'Gecompromitteerd account', 'Vertrekkende insider'] },
  { name: 'Gedragssignalen', items: ['Grote downloads vlak voor vertrek', 'Toegang buiten kantoortijd', 'Data naar privé-cloud/USB', 'Zoeken buiten de eigen rol'] },
  { name: 'Technische controles', items: ['DLP (data loss prevention)', 'Least privilege', 'Logging & UEBA', 'Netwerk-monitoring'] },
  { name: 'Proces & mens', items: ['Nette offboarding', 'Functiescheiding', 'Meldcultuur', 'Achtergrondcheck'] },
];

// --- Scenario: het zorgvuldige proces ---
const IT_SCEN = [
  {
    situation: 'Monitoring toont dat een medewerker ’s nachts gigabytes naar een privé-cloud uploadt, vlak voor zijn vertrekdatum. Wat is je eerste stap?',
    choices: [
      { label: 'Discreet escaleren naar security, HR en juridisch, en het bewijs veiligstellen — niet zelf confronteren', good: true, feedback: 'Precies: een insider-zaak vraagt een zorgvuldig, bewijsvast en juridisch correct proces.' },
      { label: 'De medewerker meteen aanspreken en beschuldigen', good: false, feedback: 'Voortijdig confronteren tipt de persoon, kan bewijs laten verdwijnen en schaadt de zaak (en hem, als je het mis hebt).' },
      { label: 'Zijn account direct verwijderen', good: false, feedback: 'Dan vernietig je mogelijk bewijs. Veiligstellen gaat vóór opruimen.' },
    ],
  },
  {
    situation: 'Waarom confronteer je niet meteen?',
    choices: [
      { label: 'Je hebt een zorgvuldig, bewijsvast proces nodig (privacy, arbeidsrecht); voortijdig handelen schaadt de zaak én de persoon', good: true, feedback: 'Juist: zonder goede onderbouwing en de juiste partijen (HR/juridisch) kan een actie onrechtmatig zijn.' },
      { label: 'Confronteren schrikt andere medewerkers af', good: false, feedback: 'Dat is niet de reden; het gaat om een rechtmatig, bewijsvast proces.' },
      { label: 'Omdat monitoren sowieso niet mag', good: false, feedback: 'Monitoren mag binnen kaders (doel, proportioneel, vastgelegd); het gaat om zorgvuldigheid, niet om niets doen.' },
    ],
  },
  {
    situation: 'Welk gedrag past het best bij een vertrekkende, kwaadwillende insider?',
    choices: [
      { label: 'Ongebruikelijke, grote data-toegang vlak voor vertrek, buiten kantoortijd', good: true, feedback: 'Precies: een piek in toegang/exfil rond de vertrekdatum is een klassiek signaal.' },
      { label: 'Normale 9-5-toegang binnen zijn eigen rol', good: false, feedback: 'Dat is juist normaal gedrag; het signaal is de afwijking daarvan.' },
      { label: 'Minder inloggen dan normaal', good: false, feedback: 'Datadiefstal gaat meestal gepaard met méér (en ongebruikelijke) toegang, niet minder.' },
    ],
  },
  {
    situation: 'Hoe beperk je insider-risico vooraf?',
    choices: [
      { label: 'Least privilege, DLP, logging/UEBA én een nette offboarding (toegang tijdig intrekken)', good: true, feedback: 'Goed: techniek én proces samen. Zeker bij vertrek is tijdig toegang intrekken cruciaal.' },
      { label: 'Iedereen admin-rechten geven voor het gemak', good: false, feedback: 'Dat vergroot het risico enorm; least privilege doet het tegenovergestelde.' },
      { label: 'Niets — insiders vertrouw je gewoon', good: false, feedback: 'Vertrouwen is goed, controle is nodig: de meeste insider-schade komt van (ex-)vertrouwde mensen.' },
    ],
  },
];

CS.registerRoom({
  id: 'insider-threat',
  path: 'defensief',
  order: 10,
  title: 'Insider threat & datadiefstal',
  icon: '🕵️',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'De gevaarlijkste dreiging heeft soms al een toegangspas. Je leert de soorten insider (kwaadwillend, nalatig, gecompromitteerd, vertrekkend), herkent de gedragssignalen, betrapt een data-exfiltratie in het netwerkverkeer, en — cruciaal — volgt het zorgvuldige, bewijsvaste proces: escaleren naar HR/juridisch, bewijs veiligstellen, niet voortijdig confronteren.',
  objectives: [
    'De vier soorten insider-dreiging onderscheiden',
    'Gedragssignalen van een (vertrekkende) insider herkennen',
    'Een insider-exfiltratie in het netwerkverkeer detecteren',
    'Het juiste, zorgvuldige responsproces volgen (escaleren, bewijs, geen eigenrichting)',
    'Insider-risico vooraf beperken (least privilege, DLP, offboarding)',
  ],
  terms: [
    { term: 'Insider threat', def: 'Een dreiging van binnenuit: iemand met legitieme toegang (medewerker, leverancier) die data steelt of schade aanricht.' },
    { term: 'Kwaadwillende insider', def: 'Iemand die bewust data steelt of saboteert (bijv. uit wraak of voor geld).' },
    { term: 'Nalatige insider', def: 'Iemand die per ongeluk een lek veroorzaakt (verkeerde mail, zwak wachtwoord).' },
    { term: 'Gecompromitteerd account', def: 'Een legitiem account dat door een aanvaller is overgenomen — van buiten, maar van binnen zichtbaar.' },
    { term: 'DLP', def: 'Data Loss Prevention: techniek die het weglekken van gevoelige data detecteert of blokkeert.' },
    { term: 'UEBA', def: 'User & Entity Behavior Analytics: detecteert afwijkend gedrag t.o.v. een normaalprofiel.' },
    { term: 'Least privilege', def: 'Iedereen krijgt alleen de rechten die nodig zijn — zo beperk je de schade van misbruik.' },
    { term: 'Offboarding', def: 'Het nette proces bij vertrek: toegang tijdig en volledig intrekken.' },
  ],
  resources: [
    { title: 'CISA — Insider Threat Mitigation', url: 'https://www.cisa.gov/topics/physical-security/insider-threat-mitigation' },
    { title: 'CERT Insider Threat Center (SEI/CMU)', url: 'https://www.sei.cmu.edu/' },
    { title: 'NCSC — interne dreigingen', url: 'https://www.ncsc.nl/' },
    { title: 'Autoriteit Persoonsgegevens — monitoring van werknemers', url: 'https://www.autoriteitpersoonsgegevens.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De dreiging van binnenuit',
      content: `
        <p>Firewalls kijken naar buiten, maar de gevaarlijkste dreiging heeft soms al een toegangspas. Een
        <strong>insider</strong> heeft legitieme toegang en weet waar de kroonjuwelen liggen. Er zijn vier smaken: de
        <strong>kwaadwillende</strong> insider (bewust), de <strong>nalatige</strong> (per ongeluk), het
        <strong>gecompromitteerde account</strong> (van buiten overgenomen), en de <strong>vertrekkende</strong> insider die
        "nog even" data meeneemt.</p>
        <p>Detectie draait om <strong>afwijkend gedrag</strong>: ongebruikelijke toegang, buiten kantoortijd, data naar een
        privé-cloud of USB — zeker rond een vertrekdatum. Maar minstens zo belangrijk is het <strong>proces</strong>: je
        confronteert niemand op eigen houtje. Je escaleert naar security, HR en juridisch, en stelt eerst bewijs veilig.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de medewerker en het netwerk zijn verzonnen oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> detecteren én zorgvuldig handelen. Vlag: <code>NM{dreiging_van_binnenuit}</code>.</div>
      `,
      questions: [
        { q: 'Wat kenmerkt een insider threat?', options: ['De dreiging komt van iemand met legitieme toegang', 'Het is altijd een externe hacker', 'Het is alleen malware', 'Het bestaat niet'], answer: 0, explain: 'Een insider heeft al toegang en kennis — dat maakt de dreiging lastig en potentieel groot.' },
        { q: 'Waarop draait insider-detectie vooral?', options: ['Afwijkend gedrag t.o.v. het normaalprofiel', 'Een langer wachtwoord', 'Een snellere pc', 'De kleur van de badge'], answer: 0, explain: 'UEBA en monitoring zoeken naar ongebruikelijke toegang, tijdstippen en datastromen.' },
        { q: 'Waarom confronteer je een verdachte insider niet zelf meteen?', options: ['Je hebt een zorgvuldig, bewijsvast en juridisch correct proces nodig (HR/juridisch)', 'Omdat het te eng is', 'Omdat monitoren verboden is', 'Dat moet je juist wel'], answer: 0, explain: 'Voortijdig handelen schaadt de zaak en kan onrechtmatig zijn; escaleer en stel bewijs veilig.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{dreiging_van_binnenuit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{dreiging_van_binnenuit}.' },
      ],
    },
    {
      title: 'Taak 2 — Betrap de exfiltratie',
      content: `
        <p>Het netwerkverkeer van één medewerker valt op. Lees de flows: wie stuurt er ’s nachts gigabytes naar buiten, en
        waarheen? Laat je niet afleiden door normaal intranet- en mailverkeer.</p>
        <div class="callout tip"><strong>Beloning:</strong> grote upload, verkeerde bestemming, verkeerd tijdstip. Vlag: <code>NM{exfil_voor_vertrek}</code>.</div>
      `,
      lab: {
        type: 'netflow',
        title: 'egress van de werkplek van een vertrekkende medewerker',
        scenario: 'Eén bestemming slokt ’s nachts gigabytes op; de rest is normaal.',
        flows: IT_FLOWS,
        ask: [
          { q: 'Naar welke bestemming lekt de data weg?', answer: ['drive-prive.nm.lab', 'drive-prive', '198.51.100.88'], hint: 'Het grootste uitgaande volume.' },
          { q: 'Ongeveer hoeveel data ging er uitgaand? (bijv. 8.2 GB)', answer: ['8.2 GB', '8.2', '8,2 GB', '8,2'], hint: 'De kolom "Uit" bij drive-prive.nm.lab.' },
        ],
      },
      questions: [
        { q: 'Welke bestemming wijst op insider-exfiltratie?', answer: ['drive-prive.nm.lab', 'drive-prive', '198.51.100.88'], hint: 'Groot uitgaand volume, buiten kantoortijd.', explain: 'drive-prive.nm.lab ontving ~8,2 GB uitgaand ’s nachts — een persoonlijke cloud, vlak voor vertrek.' },
        { q: 'Waarom is het tijdstip (’s nachts) een belangrijk signaal?', options: ['Het wijkt af van het normale werkpatroon — een klassieke red flag', 'Omdat ’s nachts internet goedkoper is', 'Omdat de server dan sneller is', 'Dat maakt niet uit'], answer: 0, explain: 'Afwijking van het normaalprofiel (tijd, volume, bestemming) is precies wat je zoekt.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{exfil_voor_vertrek}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{exfil_voor_vertrek}.' },
      ],
    },
    {
      title: 'Taak 3 — Insider-threat in kaart',
      content: `
        <p>Groepeer de zestien begrippen: de <strong>soorten insider</strong>, de <strong>gedragssignalen</strong>, de
        <strong>technische controles</strong> en de <strong>proces/mens</strong>-maatregelen.</p>
        <div class="callout tip"><strong>Beloning:</strong> techniek én proces samen. Vlag: <code>NM{techniek_en_proces}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'insider threat: begrippen → categorie',
        prompt: 'Vind de vier groepen van vier.',
        groups: IT_GROUPS,
      },
      questions: [
        { q: 'Wat is een "gecompromitteerd account" als insider-type?', options: ['Een legitiem account dat door een externe aanvaller is overgenomen', 'Een medewerker die ontslag neemt', 'Een nieuwe collega', 'Een printer'], answer: 0, explain: 'Van buiten overgenomen, maar van binnen zichtbaar — het gedraagt zich als een insider.' },
        { q: 'Welke technische controle beperkt de schade van misbruik het meest?', options: ['Least privilege (alleen de rechten die nodig zijn)', 'Iedereen admin', 'Een snellere pc', 'Meer e-mail'], answer: 0, explain: 'Hoe minder rechten, hoe kleiner de schade die een insider (of gekaapt account) kan aanrichten.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{techniek_en_proces}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{techniek_en_proces}.' },
      ],
    },
    {
      title: 'Taak 4 — Het zorgvuldige proces',
      content: `
        <p>Detectie is pas het begin. Een insider-zaak kan iemands loopbaan — en jouw bewijs — maken of breken. Loop door
        vier beslismomenten en kies de zorgvuldige, rechtmatige route. Drie van de vier goed = je handelt juist.</p>
        <div class="callout tip"><strong>Beloning:</strong> escaleren, bewijs veiligstellen, geen eigenrichting. Vlag: <code>NM{bewijs_voor_confrontatie}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'de insider-zaak',
        scenario: 'Vier beslismomenten in een insider-onderzoek. Kies zorgvuldig.',
        steps: IT_SCEN,
        pass: 3,
        flag: 'NM{bewijs_voor_confrontatie}',
      },
      questions: [
        { q: 'Je ziet nachtelijke uploads naar een privé-cloud vlak voor iemands vertrek. Eerste stap?', options: ['Discreet escaleren (security/HR/juridisch) en bewijs veiligstellen', 'De persoon meteen beschuldigen', 'Zijn account verwijderen', 'Niets doen'], answer: 0, explain: 'Een bewijsvast, juridisch correct proces gaat vóór confrontatie.' },
        { q: 'Waarom het account niet meteen verwijderen?', options: ['Dan vernietig je mogelijk bewijs; eerst veiligstellen', 'Omdat het duur is', 'Omdat het niet mag', 'Dat moet je juist wel'], answer: 0, explain: 'Bewaren en veiligstellen gaat vóór opruimen; anders verlies je je zaak.' },
        { q: 'Hoe beperk je insider-risico vooraf?', options: ['Least privilege, DLP, logging/UEBA en een nette offboarding', 'Iedereen admin', 'Monitoring uitzetten', 'Niets'], answer: 0, explain: 'Techniek én proces samen — en tijdig toegang intrekken bij vertrek.' },
        { q: 'Welke vlag hoort bij een goede afhandeling?', answer: ['NM{bewijs_voor_confrontatie}'], hint: 'Verschijnt bij ≥3/4 goed / staat in de tip-callout.', explain: 'De vlag is NM{bewijs_voor_confrontatie}.' },
      ],
    },
  ],
});
