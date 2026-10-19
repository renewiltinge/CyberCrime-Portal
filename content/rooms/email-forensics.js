/* Room: Datastromen — e-mail forensics (Received-keten, SPF/DKIM/DMARC, IOCs) */

// =======================================================================
//  Alles fictief: de bank "Nederbank", documentatie-IP's (RFC 5737) en
//  .nm.lab-domeinen zijn verzonnen. Je oefent het lezen van e-mailsporen.
// =======================================================================

const EF_HOPS = [
  { from: '[vervalst / onbekend]', ip: '203.0.113.66', by: 'mail.boos.nm.lab', time: '09:58:02' },
  { from: 'mail.boos.nm.lab', ip: '203.0.113.66', by: 'relay7.nm.lab', time: '09:59:11' },
  { from: 'relay7.nm.lab', ip: '198.51.100.5', by: 'mx.nm.lab (ontvanger)', time: '10:00:03' },
];

const EF_IOC_TEXT = [
  'Van: Nederbank Beveiliging <beveiliging@nederbank.nl>',
  'Return-Path: retour@mail.boos.nm.lab',
  'Ontvangen van 203.0.113.66 (mail.boos.nm.lab)',
  'Onderwerp: Uw rekening is geblokkeerd — verifieer direct',
  '',
  'Geachte klant, uw rekening is tijdelijk geblokkeerd.',
  'Verifieer binnen 24 uur via: https://nederbank.nl.verificatie-check.boos.nm.lab/inloggen',
  'Tweede link (reserve): https://inlog-nederbank.boos.nm.lab/klant',
  'Bijlage: rekening-verificatie.pdf.exe  (MD5: a3f1c0de9b7742e5aa10b4d8c6e2f9b1)',
  'Na uitvoering meldt de malware zich bij C2 203.0.113.66 en secundair 198.51.100.40.',
].join('\n');

CS.registerRoom({
  id: 'email-forensics',
  path: 'datastromen',
  order: 3,
  title: 'E-mail forensics',
  icon: '✉️',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Een e-mail draagt zijn eigen reisverslag mee. Je leert de Received-keten van onder naar boven lezen om de echte verzender te vinden, ontmaskert spoofing met SPF/DKIM/DMARC en de Return-Path, haalt de IOCs uit het bericht en ontleedt de phishinglink die zich voordoet als je bank.',
  objectives: [
    'De Received-keten lezen en het oorspronkelijke verzend-IP bepalen',
    'Spoofing herkennen door From, Return-Path en SPF/DKIM/DMARC te vergelijken',
    'Uitleggen wat SPF, DKIM en DMARC controleren',
    'IOCs (IP, domein, URL, e-mail, hash) uit een bericht halen en veilig defangen',
    'Een phishing-URL ontleden en de misleiding in het domein aanwijzen',
  ],
  terms: [
    { term: 'Header', def: 'De technische kop van een e-mail: afzender, ontvanger, onderwerp én het volledige reisverslag (Received-regels).' },
    { term: 'Received-keten', def: 'Elke mailserver plakt onderaan een Received-regel. Lees van onder (oorspronkelijke verzender) naar boven (jouw server).' },
    { term: 'From vs. Return-Path', def: 'From is de zichtbare afzender en vrij in te vullen; Return-Path is waar bounces heen gaan. Verschillen ze sterk, dan is spoofing waarschijnlijk.' },
    { term: 'SPF', def: 'Sender Policy Framework: controleert of het verzendende IP namens dat domein mág versturen (via een DNS-record). Fail = verdacht.' },
    { term: 'DKIM', def: 'DomainKeys Identified Mail: een digitale handtekening over de mail. Klopt de handtekening niet (of ontbreekt), dan is de afzender niet bewezen.' },
    { term: 'DMARC', def: 'Beleid dat SPF/DKIM combineert met "alignment" (past het domein bij de From?) en zegt wat te doen bij een mismatch (afwijzen/quarantaine).' },
    { term: 'Spoofing', def: 'Een afzender vervalsen zodat de mail van een vertrouwde partij lijkt te komen.' },
    { term: 'IOC', def: 'Indicator of Compromise: een concreet spoor (IP, domein, URL, hash) om dezelfde aanval elders te herkennen en te blokkeren.' },
    { term: 'Defangen', def: 'IOCs onschadelijk opschrijven (hxxp, 1[.]2[.]3[.]4) zodat niemand er per ongeluk op klikt bij het delen.' },
    { term: 'Dubbele extensie', def: 'Een truc als rekening.pdf.exe: het lijkt een PDF, maar het is een uitvoerbaar bestand (.exe).' },
  ],
  resources: [
    { title: 'Fraudehelpdesk — phishing herkennen en melden', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'MXToolbox — e-mailheaders analyseren', url: 'https://mxtoolbox.com/EmailHeaders.aspx' },
    { title: 'NCSC — phishing en e-mailbeveiliging', url: 'https://www.ncsc.nl/' },
    { title: 'DMARC.org — uitleg SPF/DKIM/DMARC', url: 'https://dmarc.org/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De anatomie van een e-mail',
      content: `
        <p>De <strong>From</strong>-regel van een e-mail is als de afzender op een envelop: iedereen kan er invullen wat hij
        wil. Gelukkig draagt elke mail een <em>reisverslag</em> mee: de <strong>Received</strong>-keten. Elke server die de
        mail doorgeeft, plakt er onderaan een regel bij. Je leest de keten dus <strong>van onder naar boven</strong>: de
        onderste regel is de oorspronkelijke verzender, de bovenste is jouw eigen server.</p>
        <p>Om spoofing te betrappen vergelijk je drie dingen:</p>
        <ul>
          <li><strong>From vs. Return-Path</strong> — wijzen ze naar hetzelfde domein?</li>
          <li><strong>SPF</strong> — mocht dit IP namens dat domein versturen?</li>
          <li><strong>DKIM/DMARC</strong> — klopt de handtekening en past het domein bij de From?</li>
        </ul>
        <div class="callout warn"><strong>Alles fictief:</strong> "Nederbank", de IP's (RFC 5737) en de
        <code>.nm.lab</code>-domeinen zijn verzonnen. Je oefent de methode.</div>
        <div class="callout tip"><strong>Beloning:</strong> lees de Received-keten van onder naar boven. Vlag:
        <code>NM{van_onder_naar_boven}</code>.</div>
      `,
      questions: [
        { q: 'In welke richting lees je de Received-keten om de oorspronkelijke verzender te vinden?', options: ['Van onder naar boven (onderste = oorsprong)', 'Van boven naar onder (bovenste = oorsprong)', 'Alfabetisch', 'Dat maakt niet uit'], answer: 0, explain: 'Elke server plakt zijn regel onderaan; de onderste Received-regel is dus de oorspronkelijke verzender.' },
        { q: 'Waarom is de From-regel alleen onvoldoende bewijs voor de afzender?', options: ['Omdat de From vrij in te vullen is en dus vervalst kan worden', 'Omdat de From versleuteld is', 'Omdat de From altijd klopt', 'Omdat de From door de ontvanger wordt ingevuld'], answer: 0, explain: 'From is cosmetisch; pas SPF/DKIM/DMARC en de Received-keten geven uitsluitsel.' },
        { q: 'Wat controleert SPF?', options: ['Of het verzendende IP namens dat domein mag versturen', 'Of de mail een virus bevat', 'Of de ontvanger bestaat', 'Of de mail te groot is'], answer: 0, explain: 'SPF toetst via een DNS-record of dit IP een toegestane verzender is voor het From-domein.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{van_onder_naar_boven}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{van_onder_naar_boven}.' },
      ],
    },
    {
      title: 'Taak 2 — Traceer de herkomst en betrap de spoofing',
      content: `
        <p>Hieronder staat de header van een alarmerende "bank"-mail. De <strong>From</strong> zegt
        <code>beveiliging@nederbank.nl</code>, maar klopt dat? Lees de Received-keten van onder naar boven, vind het
        oorspronkelijke verzend-IP, en vergelijk de From met de Return-Path en de authenticatie-resultaten.</p>
        <div class="callout tip"><strong>Beloning:</strong> ontmasker de vervalsing. Vlag: <code>NM{afzender_vervalst}</code>.</div>
      `,
      lab: {
        type: 'emailheader',
        title: 'header van de "Nederbank"-mail',
        scenario: 'De From zegt dat het de bank is. De keten, de Return-Path en SPF/DKIM/DMARC vertellen een ander verhaal.',
        from: 'Nederbank Beveiliging <beveiliging@nederbank.nl>',
        returnPath: 'retour@mail.boos.nm.lab',
        hops: EF_HOPS,
        auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
        ask: [
          { q: 'Wat is het oorspronkelijke verzend-IP (onderste Received)?', answer: ['203.0.113.66'], hint: 'De onderste regel van de keten (de oorsprong).' },
          { q: 'Slaagde de SPF-controle? (ja/nee)', answer: ['nee', 'nee, fail', 'fail', 'nee fail'], hint: 'Lees de authenticatie-badge.' },
          { q: 'Is dit waarschijnlijk spoofing? (ja/nee)', answer: ['ja'], hint: 'Vergelijk From met Return-Path en de auth-resultaten.' },
        ],
      },
      questions: [
        { q: 'Wat is het oorspronkelijke verzend-IP van deze mail?', answer: ['203.0.113.66'], hint: 'De onderste Received-regel.', explain: 'De keten begint (onderaan) bij 203.0.113.66 via mail.boos.nm.lab — dat is de echte bron.' },
        { q: 'Komt de From (nederbank.nl) overeen met de Return-Path?', options: ['Nee — de Return-Path wijst naar mail.boos.nm.lab', 'Ja, beide zijn nederbank.nl', 'Er is geen Return-Path', 'Dat kun je niet zien'], answer: 0, explain: 'From zegt nederbank.nl, maar bounces gaan naar boos.nm.lab: een duidelijk spoofing-signaal.' },
        { q: 'Wat betekenen SPF=fail, DKIM=none en DMARC=fail samen?', options: ['De afzender is niet geauthenticeerd — de mail is vrijwel zeker vervalst', 'De mail is veilig en authentiek', 'De mail is alleen te groot', 'De ontvanger bestaat niet'], answer: 0, explain: 'Geen enkele authenticatie slaagt; gecombineerd met de Return-Path-mismatch is dit spoofing.' },
        { q: 'Welk domein beheert de aanvaller werkelijk (het verzendende domein)?', answer: ['boos.nm.lab', 'mail.boos.nm.lab'], hint: 'Kijk naar de oorsprong en de Return-Path.', explain: 'De oorsprong en de Return-Path wijzen beide naar boos.nm.lab — het domein van de aanvaller.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{afzender_vervalst}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{afzender_vervalst}.' },
      ],
    },
    {
      title: 'Taak 3 — Haal de IOCs eruit',
      content: `
        <p>Nu je weet dat de mail kwaadaardig is, leg je de <strong>IOCs</strong> vast: de concrete sporen waarmee je
        dezelfde aanval elders herkent en blokkeert. Plak de mail in de extractor en kijk wat eruit komt: IP's, domeinen,
        URL's, e-mailadressen en de hash van de bijlage. Gebruik <strong>Defang</strong> voordat je ze deelt, zodat niemand
        er per ongeluk op klikt.</p>
        <div class="callout tip"><strong>Beloning:</strong> leg de sporen vast. Vlag: <code>NM{sporen_vastgelegd}</code>.</div>
      `,
      lab: {
        type: 'ioc',
        text: EF_IOC_TEXT,
      },
      questions: [
        { q: 'Hoeveel unieke IPv4-adressen haalt de extractor uit het bericht?', answer: ['2', 'twee'], hint: 'Het C2-IP en een secundair IP.', explain: 'Twee: 203.0.113.66 (oorsprong/C2) en 198.51.100.40 (secundaire C2).' },
        { q: 'Welke bijlagenaam verraadt met een dubbele extensie dat het geen PDF is?', answer: ['rekening-verificatie.pdf.exe', 'pdf.exe', '.pdf.exe'], hint: 'Let op wat er ná .pdf staat.', explain: 'rekening-verificatie.pdf.exe is een uitvoerbaar bestand (.exe) vermomd als PDF.' },
        { q: 'Waarom defang je IOCs voordat je ze deelt?', options: ['Zodat niemand er per ongeluk op klikt of ze automatisch aanklikbaar worden', 'Om ze korter te maken', 'Om ze te versleutelen', 'Omdat het verplicht is bij de bank'], answer: 0, explain: 'Defangen (hxxp, 1[.]2[.]3[.]4) maakt een IOC onschadelijk om te delen in rapporten en chats.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{sporen_vastgelegd}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{sporen_vastgelegd}.' },
      ],
    },
    {
      title: 'Taak 4 — Ontleed de phishinglink',
      content: `
        <p>De verleiding zit in de link. Hij begint met <code>nederbank.nl</code> — maar waar komt hij écht uit? Het echte
        domein staat altijd <strong>helemaal rechts</strong>, vlak vóór de eerste <code>/</code>. Alles daarvóór is subdomein
        en kan van alles beweren. Ontleed de URL in het lab en wijs de misleiding aan.</p>
        <div class="callout tip"><strong>Beloning:</strong> het merk in het subdomein is geen bewijs. Vlag:
        <code>NM{kijk_naar_rechts}</code>.</div>
      `,
      lab: {
        type: 'url',
        urls: [
          'https://nederbank.nl.verificatie-check.boos.nm.lab/inloggen',
          'https://inlog-nederbank.boos.nm.lab/klant',
        ],
      },
      questions: [
        { q: 'Waar in een URL vind je het échte domein?', options: ['Helemaal rechts, vlak vóór het pad (de laatste labels vóór de eerste /)', 'Helemaal links, direct na https://', 'In het midden', 'In het pad na de /'], answer: 0, explain: 'Het geregistreerde domein staat rechts; alles links daarvan is subdomein en kan van alles beweren.' },
        { q: 'Welk merk wordt in deze links nagebootst?', answer: ['nederbank', 'Nederbank'], hint: 'Het staat prominent in het subdomein.', explain: 'De links zetten "nederbank" in het subdomein om vertrouwen te wekken, maar het echte domein is boos.nm.lab.' },
        { q: 'Is https://nederbank.nl.verificatie-check.boos.nm.lab/inloggen de echte site van de bank?', options: ['Nee — het echte domein is boos.nm.lab; "nederbank.nl" is hier slechts een subdomein', 'Ja, het begint met nederbank.nl', 'Ja, want het gebruikt https', 'Dat valt niet te bepalen'], answer: 0, explain: 'De punten misleiden: nederbank.nl staat vóór boos.nm.lab, dus het is een subdomein van boos.nm.lab — niet de bank.' },
        { q: 'Waarom is "https" (het slotje) hier geen bewijs van echtheid?', options: ['Https versleutelt alleen de verbinding; ook phishingsites hebben een certificaat', 'Https betekent dat de site veilig is', 'Https controleert de eigenaar van het domein', 'Dat is het wel — https is altijd veilig'], answer: 0, explain: 'Een slotje zegt alleen dat de verbinding versleuteld is, niet wie de site beheert. Phishers gebruiken ook https.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{kijk_naar_rechts}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{kijk_naar_rechts}.' },
      ],
    },
  ],
});
