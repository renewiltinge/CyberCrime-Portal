/* Game room: Ochtendspits in de mailbox (verdedigen onder druk) */
CS.registerRoom({
  id: 'game-ochtendspits',
  path: 'gamerooms',
  order: 2,
  title: 'Ochtendspits in de mailbox',
  difficulty: 'Makkelijk',
  level: 'Instap',
  checked: '2026-11-12',
  minutes: 25,
  summary: 'Drie collega\'s melden een vreemde mail. Eén van hen heeft al iets ingevuld. Haal de mail weg, vind wie zijn wachtwoord afgaf, en laat de echte loonstrook staan.',
  objectives: [
    'Een phishingmail herkennen aan headers, afzender en link',
    'In de proxylog zien wie alleen klikte en wie ook iets invulde',
    'Een campagne indammen zonder echte mail weg te gooien',
  ],
  tasks: [
    {
      title: 'Taak 1 — Gemeld',
      content: `
        <p>Woonstichting <strong>De Linde</strong> (fictief) heeft een meldknop in de mail. Om half negen komen er drie meldingen binnen.
        Jij beheert de mailomgeving en hebt de incidentconsole: je kunt mails bekijken met headers, een mail uit álle postvakken halen
        (<code>purge</code>), domeinen blokkeren en wachtwoorden resetten.</p>
        <p>Het verschil tussen klikken en invullen is groot. Wie alleen op een link klikte, zag een nep-inlogpagina. Wie daar zijn
        wachtwoord invulde, heeft het weggegeven. In een proxylog zie je dat als een <code>GET</code> (pagina opvragen) tegenover een
        <code>POST</code> (formulier versturen).</p>
      `,
      questions: [
        { q: 'In de proxylog staat voor dezelfde phishingpagina bij Anne een GET en bij Bram een GET én een POST. Wie moet je in elk geval direct resetten?',
          options: ['Alleen Anne', 'Alleen Bram', 'Allebei', 'Geen van beiden, eerst de mail weghalen'],
          answer: 1,
          wrong: { 0: 'Anne vroeg de pagina alleen op (GET). Bram verstuurde het formulier (POST): hij gaf iets af.', 2: 'Anne resetten kan geen kwaad, maar de haast zit bij Bram: hij verstuurde het formulier.', 3: 'De mail weghalen is belangrijk, maar het wachtwoord van Bram is al weg. Elke minuut telt.' },
          explain: 'Een POST naar de phishingpagina betekent dat het formulier verstuurd is. Dat account is gecompromitteerd tot je het reset.' },
      ],
    },
    {
      title: 'Taak 2 — De ochtendspits',
      content: `
        <p>Lees het mandaat en begin. <code>mail</code> toont de wachtrij, <code>mail &lt;id&gt;</code> één mail met headers,
        <code>logs proxy</code> wie waarheen ging. Niet alles wat gemeld wordt, is phishing.</p>
      `,
      lab: {
        type: 'incident',
        title: 'Woonstichting De Linde · mailbeheer',
        role: 'Beheerder van de mailomgeving bij Woonstichting De Linde (fictief), met mandaat om mails te verwijderen, domeinen te blokkeren en wachtwoorden te resetten.',
        story: 'Het is 08:30. In de meldmap staan drie meldingen van collega\'s. De salarisverwerker heeft vanochtend ook de loonstroken verstuurd.',
        mandate: [
          'Alles gebeurt in deze simulatie. Doe dit nooit op een omgeving waarvoor je geen opdracht en toestemming hebt.',
          'Je mag mails uit postvakken verwijderen, domeinen blokkeren en wachtwoorden resetten.',
          'Een mail uit 100 postvakken halen is ingrijpend: doe het alleen als je zeker weet dat hij kwaadaardig is.',
          'Lees nooit de inhoud van postvakken van collega\'s; headers en logs zijn genoeg.',
        ],
        vars: {
          dom: ['linde-portaal.nm.lab', 'delinde-login.nm.lab', 'mijnlinde-verify.nm.lab', 'linde-mailbox.nm.lab'],
          victim: ['a.peters', 'k.yilmaz', 'j.devos', 'm.koster'],
          clicker: ['b.smits', 'e.vermeer', 'h.bos'],
          ip: ['203.0.113.19', '198.51.100.77', '192.0.2.58'],
        },
        start: '08:30',
        deadline: 45,
        maxDamage: 50,
        motd: 'Mailbeheer De Linde. Typ help, en begin met alerts en mail.',
        accounts: [
          { name: '{{victim}}', role: 'Medewerker verhuur', compromised: true },
          { name: '{{clicker}}', role: 'Medewerker onderhoud' },
          { name: 'r.hendriks', role: 'Medewerker financiën' },
          { name: 'svc-mailscan', role: 'Serviceaccount van de mailfilter', critical: true, lockText: 'svc-mailscan is het account van het mailfilter. Er komt nu geen mail meer binnen.' },
        ],
        legit: [
          { value: 'payflow.example', text: 'payflow.example is de echte salarisverwerker. Collega\'s kunnen hun loonstrook nu niet openen en de servicedesk loopt vol.' },
        ],
        mails: [
          { id: 'm-4471', t: -25, from: 'ICT Servicedesk <servicedesk@{{dom}}>', subject: 'Actie vereist: uw mailbox is bijna vol', to: 38, reported: 3, malicious: true,
            detail: ['From: ICT Servicedesk <servicedesk@{{dom}}>', 'Return-Path: <bounce@{{dom}}>', 'Received: from mail.{{dom}} ({{ip}})', 'Authentication-Results: spf=fail dkim=none dmarc=fail (header.from={{dom}})', 'Subject: Actie vereist: uw mailbox is bijna vol', 'Link in de tekst: https://{{dom}}/login?u=<uw-adres>', 'Ontvangers: 38 (afdelingen verhuur en onderhoud)'] },
          { id: 'm-4472', t: -10, from: 'Salarisadministratie <loon@payflow.example>', subject: 'Je loonstrook van november staat klaar', to: 112, reported: 2, malicious: false,
            purgeText: 'Dit was de echte loonstrookmail: payflow.example is de salarisverwerker, SPF, DKIM en DMARC kloppen. 112 collega\'s missen nu hun loonstrook.',
            detail: ['From: Salarisadministratie <loon@payflow.example>', 'Return-Path: <bounce@payflow.example>', 'Received: from smtp.payflow.example (198.51.100.30)', 'Authentication-Results: spf=pass dkim=pass dmarc=pass (header.from=payflow.example)', 'Subject: Je loonstrook van november staat klaar', 'Link in de tekst: https://mijn.payflow.example/loonstrook', 'Ontvangers: 112 (iedereen); payflow.example staat in de leverancierslijst'] },
          { id: 'm-4473', t: -5, from: 'Communicatie <nieuws@delinde.example>', subject: 'Nieuwsbrief: de nieuwe huurdersraad', to: 112, reported: 0, malicious: false,
            purgeText: 'Dit was de nieuwsbrief van je eigen afdeling communicatie.',
            detail: ['From: Communicatie <nieuws@delinde.example>', 'Authentication-Results: spf=pass dkim=pass dmarc=pass', 'Subject: Nieuwsbrief: de nieuwe huurdersraad'] },
        ],
        alerts: [
          { t: -4, text: 'Meldknop: 3 meldingen over "Actie vereist: uw mailbox is bijna vol" en 2 over "Je loonstrook van november staat klaar"' },
          { t: 13, text: 'Aanmelding op de mailbox van {{victim}} vanaf {{ip}} (buitenland), zonder MFA', after: 'overname' },
          { t: 14, text: 'Mailbox {{victim}}: nieuwe regel stuurt alle mail door naar een extern adres', after: 'overname' },
        ],
        logs: {
          proxy: [
            { t: -60, line: 'GET https://intranet.delinde.example/ user=r.hendriks 200' },
            { t: -19, line: 'GET https://{{dom}}/login user={{clicker}} 200' },
            { t: -15, line: 'GET https://{{dom}}/login user={{victim}} 200' },
            { t: -14, line: 'POST https://{{dom}}/login user={{victim}} 302 (formulier verstuurd)' },
            { t: -8, line: 'GET https://mijn.payflow.example/loonstrook user=r.hendriks 200' },
            { t: -7, line: 'GET https://mijn.payflow.example/loonstrook user={{clicker}} 200' },
            { t: -6, line: 'POST https://mijn.payflow.example/inloggen user={{clicker}} 200' },
            { t: 3, line: 'GET https://{{dom}}/login user=r.hendriks 200', unless: ['purge:m-4471', 'block:{{dom}}'] },
          ],
          aanmeldingen: [
            { t: -200, line: 'ok user={{victim}} src=intern mfa=niet ingesteld' },
            { t: -190, line: 'ok user={{clicker}} src=intern mfa=app' },
            { t: 12, line: 'ok user={{victim}} src={{ip}} land=buitenland mfa=niet ingesteld', after: 'overname' },
          ],
        },
        threats: [
          { id: 'overname', at: 12, label: 'Mailbox overgenomen met het buitgemaakte wachtwoord (T1078.004)', text: 'Iemand meldt zich aan op de mailbox van {{victim}} vanaf {{ip}} en zet een doorstuurregel naar buiten.', stoppedBy: ['reset:{{victim}}', 'disable:{{victim}}'], damage: 20 },
          { id: 'kliks', at: 15, label: 'Meer collega\'s klikken op de phishingmail (T1566.002)', text: 'Nog vier collega\'s openen de phishingmail en vullen het formulier in.', stoppedBy: ['purge:m-4471', 'block:{{dom}}'], damage: 10 },
          { id: 'intern', at: 22, requires: 'overname', label: 'Phishing vanuit een vertrouwd adres (T1534)', text: 'Vanuit de mailbox van {{victim}} gaat dezelfde phishing naar 240 contacten, nu van een afzender die iedereen kent.', stoppedBy: ['reset:{{victim}}', 'disable:{{victim}}'], damage: 20 },
        ],
        objectives: [
          { text: 'De phishingmail uit alle postvakken gehaald, vóór 08:45', all: ['purge:m-4471'], before: 15, points: 10 },
          { text: 'Het phishingdomein geblokkeerd', all: ['block:{{dom}}'], points: 10 },
          { text: 'Het account dat zijn wachtwoord afgaf gereset, vóór 08:42', any: ['reset:{{victim}}', 'disable:{{victim}}'], before: 12, points: 10, required: true },
        ],
        pass: 25,
        flag: 'NM{phishing_ingedamd}',
        solution: ['alerts', 'mail', 'mail m-4471', 'purge m-4471', 'block {{dom}}', 'logs proxy {{dom}}', 'reset {{victim}}', 'report'],
        solutionNotes: [
          'Twee onderwerpen zijn gemeld. Dat betekent niet dat ze allebei phishing zijn.',
          'De wachtrij: drie mails, met afzender en aantal ontvangers.',
          'De headers: een onbekend domein, SPF, DKIM en DMARC falen, en de link gaat naar hetzelfde domein. De loonstrook (m-4472) klopt aan alle kanten.',
          'Haal de phishingmail uit alle 38 postvakken, zodat niemand meer klikt.',
          'Blokkeer het domein, voor wie de mail al open heeft staan.',
          'De proxylog: twee collega\'s vroegen de pagina op, maar maar één verstuurde het formulier (POST).',
          'Reset dat account: nieuw wachtwoord, sessies weg. Het andere account hoeft niet, al kan het geen kwaad.',
          'Sluit af.',
        ],
        debrief: `
          <h4>Wat de aanvaller deed</h4>
          <p>Een mail met een geloofwaardige aanleiding ("je mailbox is vol") en een link naar een nagemaakte inlogpagina (T1566.002). Eén
          collega vulde zijn wachtwoord in. Zonder MFA kon de aanvaller daarmee direct inloggen (T1078.004), een doorstuurregel zetten
          (T1114.003) en vanuit een vertrouwd adres verder phishen (T1534).</p>
          <h4>Wat je had kunnen zien</h4>
          <ul>
            <li>Een afzenderdomein dat niet van jullie is, en SPF, DKIM en DMARC die alle drie falen.</li>
            <li>Een link naar datzelfde domein, met je eigen mailadres erin.</li>
            <li>In de proxylog een <code>POST</code> naar dat domein: daar is iets verstuurd.</li>
          </ul>
          <h4>Wat het had gestopt</h4>
          <ul>
            <li>MFA, het liefst phishingbestendig (passkeys of een hardwaresleutel), zodat een wachtwoord alleen niet genoeg is.</li>
            <li>DMARC met <code>p=reject</code> op je eigen domein, en mails van buiten die als "extern" gemarkeerd worden.</li>
            <li>Een meldknop die mensen ook echt gebruiken. Hier kwamen de eerste meldingen binnen een kwartier.</li>
          </ul>
          <p>Verder leren: <a href="#/room/social-engineering-phishing">Social engineering en phishing</a>,
          <a href="#/room/phishing-gevorderd">Phishing gevorderd</a>, <a href="#/room/email-forensics">E-mail forensics</a>.</p>
        `,
        ask: [
          { q: 'Welk domein gebruikte de phishing?', answer: ['{{dom}}'] },
          { q: 'Welk account gaf zijn wachtwoord af?', answer: ['{{victim}}'] },
        ],
      },
      questions: [
        { q: 'Dam de campagne in. Welke vlag krijg je in de nabespreking?', answer: ['NM{phishing_ingedamd}'],
          hints: ['De vlag komt pas als je het overgenomen account op tijd hebt gereset.', 'Vergelijk de headers van de gemelde mails: welke faalt op SPF, DKIM en DMARC?', 'Zoek in de proxylog naar een POST naar het phishingdomein; dat account reset je.'],
          explain: 'Speel daarna een andere variant zonder walkthrough: andere namen, hetzelfde patroon.' },
        { q: 'Ook de loonstrookmail werd twee keer gemeld. Waarom laat je hem staan?',
          options: ['Omdat hij minder vaak gemeld werd', 'Omdat SPF, DKIM en DMARC kloppen en de afzender de bekende salarisverwerker is', 'Omdat hij naar iedereen ging', 'Omdat er geen link in staat'],
          answer: 1,
          wrong: { 0: 'Het aantal meldingen zegt iets over hoe opvallend een mail is, niet of hij kwaadaardig is.', 2: 'Phishing gaat ook vaak naar iedereen.', 3: 'Er staat wel een link in, maar die gaat naar het domein van de salarisverwerker.' },
          why: 'Wie elke gemelde mail weggooit, leert collega\'s dat melden lastig is en dat echte mail verdwijnt. Beoordelen gaat voor verwijderen.',
          explain: 'Meldingen zijn een signaal, geen oordeel. De headers en de bekende leverancierslijst maken het verschil.' },
      ],
    },
  ],
  terms: [
    { term: 'Purge', def: 'Een mail achteraf uit alle postvakken halen waarin hij is afgeleverd. Krachtig en ingrijpend.' },
    { term: 'SPF, DKIM en DMARC', def: 'Drie controles op de afzender: mag deze server namens het domein mailen, is de mail ondertekend, en wat doe je als dat niet klopt.' },
    { term: 'GET en POST', def: 'Een pagina opvragen (GET) of een formulier versturen (POST). In een proxylog het verschil tussen kijken en invullen.' },
    { term: 'Doorstuurregel', def: 'Een regel in een mailbox die mail automatisch doorstuurt. Na een overname vaak gebruikt om mee te blijven lezen.' },
    { term: 'Phishingbestendige MFA', def: 'Een tweede factor die niet op een nagemaakte site te gebruiken is, zoals een passkey of hardwaresleutel (FIDO2).' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Spearphishing Link (T1566.002)', url: 'https://attack.mitre.org/techniques/T1566/002/' },
    { title: 'NCSC: Factsheet e-mailbeveiliging', url: 'https://www.ncsc.nl/' },
  ],
});
