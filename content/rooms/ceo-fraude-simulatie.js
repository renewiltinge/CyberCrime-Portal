/* Room: Security-kern — CEO-/BEC-fraude: de onderhandeling onder druk (simulatie) */

// =======================================================================
//  Alles FICTIEF: "Hanzevaart Groep", de personen, de mail en bedragen
//  zijn verzonnen. Documentatie-IP's (RFC 5737), .nm.lab-domeinen.
// =======================================================================

// --- Emailheader: het "spoed"-verzoek van de "CEO" ---
const CF_HOPS = [
  { from: '[vervalst / onbekend]', ip: '203.0.113.91', by: 'mail.boos.nm.lab', time: '08:41:10' },
  { from: 'mail.boos.nm.lab', ip: '203.0.113.91', by: 'relay3.nm.lab', time: '08:41:55' },
  { from: 'relay3.nm.lab', ip: '198.51.100.5', by: 'mx.hanzevaart.nl (ontvanger)', time: '08:42:30' },
];

// --- Scenario: de beslissingen van de financieel medewerker ---
const CF_STEPS = [
  {
    situation: 'Om 08:42 krijg je als financieel medewerker een e-mail van "D. Hanzen (CEO)": een spoedbetaling van € 45.000 naar een nieuwe leverancier, vandaag nog, strikt vertrouwelijk. Wat doe je als eerste?',
    choices: [
      { label: 'Verifieer via een bekend kanaal: bel de CEO op zijn vaste, bekende nummer', good: true, feedback: 'Precies: een onafhankelijke terugbel-verificatie doorbreekt vrijwel elke CEO-fraude.' },
      { label: 'Meteen overmaken — de CEO heeft duidelijk haast', good: false, feedback: 'Urgentie is juist het drukmiddel. Nooit betalen op basis van alleen een e-mail.' },
      { label: 'Antwoord op de e-mail om te bevestigen', good: false, feedback: 'Een reply gaat (via de Reply-To) naar de aanvaller — die "bevestigt" natuurlijk. Verifieer buiten de mail om.' },
    ],
  },
  {
    situation: 'De "CEO" benadrukt geheimhouding: "Het gaat om een vertrouwelijke overname, vertel dit aan niemand en sla de normale goedkeuring over."',
    choices: [
      { label: 'Houd je aan de normale procedure en het vier-ogen-principe, ook nu', good: true, feedback: 'Goed: geheimhouding die de controles omzeilt is juist het rode vlaggetje. Procedures gelden altijd.' },
      { label: 'Respecteer de geheimhouding en sla de tweede fiatteur over', good: false, feedback: 'Precies wat de fraudeur wil. Het doel van "geheim" is het uitschakelen van je controle.' },
      { label: 'Vraag per e-mail waarom het geheim moet', good: false, feedback: 'Je blijft in het kanaal van de aanvaller hangen. Stap eruit en verifieer.' },
    ],
  },
  {
    situation: 'Je bekijkt de e-mailheader (zie het vorige lab): SPF=fail, DMARC=fail, en de Return-Path wijst naar een lookalike-domein. Je conclusie?',
    choices: [
      { label: 'Dit is spoofing — niet betalen en melden bij security', good: true, feedback: 'Correct: de authenticatie faalt en het antwoordadres klopt niet. Dit is fraude.' },
      { label: 'Waarschijnlijk een mailserverfoutje, gewoon doorgaan', good: false, feedback: 'SPF/DMARC=fail plus een lookalike Return-Path is geen "foutje" — het is het bewijs van spoofing.' },
      { label: 'Het logo en de ondertekening kloppen, dus het is echt', good: false, feedback: 'Logo en handtekening zijn triviaal te kopiëren. Alleen authenticatie en verificatie tellen.' },
    ],
  },
  {
    situation: 'Even later belt "de CEO" (met een spoofed beller-ID) en zet druk op de deadline: "Het moet nú."',
    choices: [
      { label: 'Blijf bij je besluit en verifieer via een onafhankelijk, bekend nummer', good: true, feedback: 'Sterk: ook een beller-ID is te vervalsen. Bel zelf terug op een nummer dat je al kende.' },
      { label: 'Nu de CEO zelf belt is het vast echt — betalen', good: false, feedback: 'Beller-ID-spoofing is eenvoudig. Een inkomend telefoontje is geen verificatie.' },
      { label: 'Betalen maar de helft, als compromis', good: false, feedback: 'Elk bedrag naar een frauduleuze rekening is verlies. Niet betalen; verifiëren.' },
    ],
  },
  {
    situation: 'Je ontdekt dat een collega de betaling al klaar heeft gezet. Wat doe je?',
    choices: [
      { label: 'Direct stoppen, security en de bank inschakelen (terugboeking aanvragen) en het bewijs bewaren', good: true, feedback: 'Precies: snelheid kan de betaling nog blokkeren; bewaar de mail/headers als bewijs.' },
      { label: 'Stil houden om gedoe te voorkomen', good: false, feedback: 'Verzwijgen kost tijd en geld, en bij een datalek ben je meldplichtig. Direct escaleren.' },
      { label: 'Eerst zelf uitzoeken of het echt fraude is, voor je iemand stoort', good: false, feedback: 'Elke minuut telt bij het terughalen. Escaleer meteen; uitzoeken kan parallel.' },
    ],
  },
  {
    situation: 'Het incident is afgewend. Hoe voorkom je dit structureel?',
    choices: [
      { label: 'Betaalproces met vier-ogen én verplichte terugbel-verificatie bij nieuwe/gewijzigde begunstigden, DMARC op reject, en awareness', good: true, feedback: 'Precies: proces + techniek + mens samen. Een verplichte callback bij een nieuwe begunstigde stopt bijna alle BEC.' },
      { label: 'Niets veranderen — het ging toch goed', good: false, feedback: 'Deze keer wel, door jou. Zonder proces hangt het van toeval af; borg het.' },
      { label: 'Alleen de ene afzender blokkeren', good: false, feedback: 'De volgende komt van een ander lookalike-domein. Je hebt een proces nodig, geen losse blokkade.' },
    ],
  },
];

CS.registerRoom({
  id: 'ceo-fraude-simulatie',
  path: 'security-kern',
  order: 8,
  title: 'CEO-fraude: de onderhandeling onder druk',
  icon: '👔',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Business Email Compromise (BEC/CEO-fraude) kost organisaties wereldwijd miljarden — zonder één regel malware. In deze simulatie ben jij de financieel medewerker die een "spoedbetaling" van de CEO krijgt. Je controleert de e-mailheader, weerstaat de druk en geheimhouding, en neemt stap voor stap de juiste beslissingen. Je sluit af met de betaalcontroles die BEC structureel stoppen.',
  objectives: [
    'BEC/CEO-fraude herkennen aan autoriteit, urgentie en gedwongen geheimhouding',
    'Een spoed-betaalverzoek verifiëren via de e-mailheader (SPF/DMARC, Return-Path)',
    'De druk weerstaan: terugbellen via een bekend kanaal in plaats van reageren',
    'Snel en juist handelen als een betaling al (bijna) is gedaan',
    'De betaalcontroles benoemen die BEC voorkomen (vier-ogen, callback, DMARC)',
  ],
  terms: [
    { term: 'BEC', def: 'Business Email Compromise: fraude waarbij iemand zich voordoet als leidinggevende of leverancier om een betaling te laten doen. Geen malware nodig.' },
    { term: 'CEO-fraude', def: 'Een vorm van BEC waarbij de "directeur" een spoed- en geheime betaling vraagt, buiten de procedure om.' },
    { term: 'Spoofing', def: 'Een afzender (of beller-ID) vervalsen zodat het van een vertrouwde persoon lijkt te komen.' },
    { term: 'Lookalike-domein', def: 'Een domein dat sterk lijkt op het echte (bijv. met een extra woord of andere TLD), gebruikt in de Reply-To of Return-Path.' },
    { term: 'Terugbel-verificatie (callback)', def: 'Een betaalverzoek bevestigen door zélf terug te bellen op een vooraf bekend nummer — niet op een nummer uit de mail.' },
    { term: 'Vier-ogen-principe', def: 'Een tweede persoon keurt de betaling goed; "geheimhouding" die dit omzeilt is een rode vlag.' },
    { term: 'DMARC (reject)', def: 'E-mailbeleid dat spoofmails van je eigen domein laat weigeren — de techniek die BEC aan de voordeur tegenhoudt.' },
    { term: 'Terugboeking (recall)', def: 'Een verzoek aan de bank om een zojuist gedane (frauduleuze) betaling terug te halen; hoe sneller, hoe groter de kans.' },
  ],
  resources: [
    { title: 'FBI — Business Email Compromise (IC3)', url: 'https://www.ic3.gov/' },
    { title: 'Fraudehelpdesk — CEO-fraude', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'NCSC — e-mailbeveiliging (DMARC/SPF/DKIM)', url: 'https://www.ncsc.nl/' },
    { title: 'Betaalvereniging Nederland — veilig betalingsverkeer', url: 'https://www.betaalvereniging.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Waarom CEO-fraude werkt',
      content: `
        <p><strong>Business Email Compromise</strong> is een van de duurste vormen van cybercrime — en er komt geen malware
        aan te pas. De aanvaller doet zich voor als de <strong>CEO</strong> (of een leverancier) en vraagt een
        <strong>spoedbetaling</strong>. De kracht zit in drie knoppen tegelijk: <strong>autoriteit</strong> (de baas),
        <strong>urgentie</strong> (nu meteen) en <strong>geheimhouding</strong> ("vertel niemand, het is vertrouwelijk") —
        precies die geheimhouding schakelt je controles uit.</p>
        <p>De tegenmaatregel is simpel en bijna onfeilbaar: <strong>verifieer buiten de mail om</strong>. Bel de CEO terug op
        een nummer dat je al kende. Geen enkele echte, legitieme spoedbetaling lijdt onder één extra telefoontje.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> "Hanzevaart Groep", de CEO en de mail zijn verzonnen
        oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> verifieer buiten de mail om. Vlag: <code>NM{verifieer_buiten_de_mail}</code>.</div>
      `,
      questions: [
        { q: 'Welke drie knoppen gebruikt CEO-fraude tegelijk?', options: ['Autoriteit, urgentie en geheimhouding', 'Malware, exploits en C2', 'Phishing, vishing en smishing', 'Firewall, VPN en MFA'], answer: 0, explain: 'De "baas", "nu meteen" en "vertel niemand" zetten samen je gezonde verstand én je controles opzij.' },
        { q: 'Waarom is malware niet nodig voor BEC?', options: ['Het is pure social engineering: een overtuigende e-mail en druk volstaan', 'Omdat de bank meewerkt', 'Omdat de firewall uitstaat', 'Dat klopt niet, er is altijd malware'], answer: 0, explain: 'BEC kraakt de mens, niet de techniek; daarom vangen antivirus en firewalls het vaak niet.' },
        { q: 'Wat is de bijna onfeilbare tegenmaatregel?', options: ['Verifiëren buiten de mail om (terugbellen op een bekend nummer)', 'Snel betalen om van het gezeur af te zijn', 'Het logo controleren', 'De mail doorsturen naar collega\'s'], answer: 0, explain: 'Een onafhankelijke callback bevestigt (of ontmaskert) het verzoek; echte spoed overleeft dat prima.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{verifieer_buiten_de_mail}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{verifieer_buiten_de_mail}.' },
      ],
    },
    {
      title: 'Taak 2 — Controleer de header van het verzoek',
      content: `
        <p>Voordat je ook maar iets doet: open de header van de "spoed"-mail. De <strong>From</strong> zegt
        <code>d.hanzen@hanzevaart.nl</code>, maar klopt dat? Lees de Received-keten, vergelijk met de Return-Path en bekijk
        SPF/DKIM/DMARC.</p>
        <div class="callout tip"><strong>Beloning:</strong> de techniek ontmaskert de "CEO". Vlag: <code>NM{spoed_is_spoof}</code>.</div>
      `,
      lab: {
        type: 'emailheader',
        title: 'de "spoedbetaling"-mail van de CEO',
        scenario: 'De From zegt dat het de CEO is. De keten, de Return-Path en SPF/DMARC vertellen iets anders.',
        from: 'D. Hanzen (CEO) <d.hanzen@hanzevaart.nl>',
        returnPath: 'd.hanzen@hanzevaart-groep.nm.lab',
        hops: CF_HOPS,
        auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
        ask: [
          { q: 'Wat is het oorspronkelijke verzend-IP (onderste Received)?', answer: ['203.0.113.91'], hint: 'De onderste regel van de keten.' },
          { q: 'Slaagde de SPF-controle? (ja/nee)', answer: ['nee', 'nee, fail', 'fail'], hint: 'Lees de auth-badge.' },
          { q: 'Is dit spoofing? (ja/nee)', answer: ['ja'], hint: 'Vergelijk de From met de Return-Path en de auth-resultaten.' },
        ],
      },
      questions: [
        { q: 'Komt de From (hanzevaart.nl) overeen met de Return-Path?', options: ['Nee — de Return-Path is een lookalike (hanzevaart-groep.nm.lab)', 'Ja, beide zijn hanzevaart.nl', 'Er is geen Return-Path', 'Dat is niet te zien'], answer: 0, explain: 'De Return-Path wijst naar een lookalike-domein van de aanvaller: een duidelijk spoofing-signaal.' },
        { q: 'Wat betekenen SPF=fail en DMARC=fail samen?', options: ['De mail is niet geauthenticeerd namens hanzevaart.nl — vrijwel zeker vervalst', 'De mail is veilig', 'De mail is alleen te groot', 'De ontvanger bestaat niet'], answer: 0, explain: 'Geen authenticatie slaagt; gecombineerd met de lookalike Return-Path is dit spoofing.' },
        { q: 'Wat doe je met dit verzoek?', options: ['Niet betalen, melden bij security en verifiëren via een bekend kanaal', 'Betalen want de deadline nadert', 'Doorsturen naar de hele afdeling', 'Antwoorden met een vraag'], answer: 0, explain: 'Bij bewezen spoofing stopt de betaling en begint de verificatie/melding.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{spoed_is_spoof}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{spoed_is_spoof}.' },
      ],
    },
    {
      title: 'Taak 3 — De simulatie: hou je hoofd koel',
      content: `
        <p>Nu de echte test: de druk loopt op. Loop door de zes beslismomenten vanaf het eerste verzoek tot de nasleep en
        kies telkens de verstandigste optie. Je krijgt bij elke keuze directe feedback. Haal je minstens vijf van de zes goed,
        dan heb je de fraude netjes afgewend.</p>
        <div class="callout tip"><strong>Beloning:</strong> druk weerstaan is een vaardigheid. Vlag: <code>NM{druk_weerstaan}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'de spoedbetaling — jouw beslissingen',
        scenario: 'Zes beslismomenten onder oplopende druk. Kies verstandig.',
        steps: CF_STEPS,
        pass: 5,
        flag: 'NM{druk_weerstaan}',
      },
      questions: [
        { q: 'Wat is de juiste eerste reactie op het spoedverzoek?', options: ['Verifiëren via een bekend kanaal (de CEO terugbellen op zijn vaste nummer)', 'Meteen overmaken', 'Op de e-mail antwoorden', 'De tweede fiatteur overslaan'], answer: 0, explain: 'Een onafhankelijke callback doorbreekt de fraude vóór er geld weg is.' },
        { q: 'De "CEO" eist geheimhouding en wil de goedkeuring overslaan. Wat doe je?', options: ['Je houdt je aan de normale procedure en het vier-ogen-principe', 'Je respecteert de geheimhouding', 'Je vraagt per mail om uitleg', 'Je betaalt alvast de helft'], answer: 0, explain: 'Geheimhouding die controles omzeilt is het rode vlaggetje; procedures gelden altijd.' },
        { q: 'Een telefoontje van "de CEO" zet extra druk. Is dat verificatie?', options: ['Nee — beller-ID is te vervalsen; bel zelf terug op een bekend nummer', 'Ja, een telefoontje is altijd echt', 'Ja, want het is spoed', 'Alleen als het mobiel is'], answer: 0, explain: 'Spoofing van beller-ID is triviaal; alleen een zelf-geïnitieerde callback telt.' },
        { q: 'Welke vlag hoort bij een goede afhandeling?', answer: ['NM{druk_weerstaan}'], hint: 'Verschijnt bij ≥5/6 goed / staat in de tip-callout.', explain: 'De vlag is NM{druk_weerstaan}.' },
      ],
    },
    {
      title: 'Taak 4 — Borg het in het betaalproces',
      content: `
        <p>Eén alerte medewerker is mooi, maar je wilt niet van toeval afhangen. BEC stop je structureel met proces, techniek
        en mens samen:</p>
        <ul>
          <li><strong>Verplichte terugbel-verificatie</strong> bij elke nieuwe of gewijzigde begunstigde/rekening — de
          belangrijkste rem.</li>
          <li><strong>Vier-ogen-principe</strong> op betalingen; geen uitzonderingen "omdat het geheim is".</li>
          <li><strong>DMARC op reject</strong> (met SPF/DKIM) zodat spoofmails van je eigen domein geweigerd worden.</li>
          <li>Een duidelijke, veilige manier om verdachte verzoeken te <strong>melden</strong> zonder drempel.</li>
          <li><strong>Awareness</strong>: iedereen weet dat "spoed + geheim + nieuwe rekening" altijd om verificatie vraagt.</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> callback bij elke nieuwe begunstigde. Vlag: <code>NM{callback_bij_nieuw}</code>.</div>
      `,
      questions: [
        { q: 'Welke controle stopt BEC het effectiefst?', options: ['Verplichte terugbel-verificatie bij nieuwe/gewijzigde begunstigden', 'Een langer wachtwoord', 'Een snellere mailserver', 'Meer back-ups'], answer: 0, explain: 'De meeste BEC vraagt betaling naar een nieuwe rekening; een verplichte callback daarop vangt het.' },
        { q: 'Wat doet DMARC op "reject" voor je organisatie?', options: ['Laat spoofmails die jouw domein nabootsen weigeren bij de ontvanger', 'Versleutelt alle mail', 'Maakt mail sneller', 'Blokkeert alle externe mail'], answer: 0, explain: 'Met SPF/DKIM + DMARC-reject worden vervalste mails namens je domein geweigerd — de voordeur dicht.' },
        { q: 'Waarom is één geblokkeerde afzender onvoldoende?', options: ['De volgende poging komt van een ander lookalike-domein; je hebt een proces nodig', 'Omdat blokkades niet werken', 'Omdat de CEO dat niet wil', 'Dat is wél voldoende'], answer: 0, explain: 'Losse blokkades zijn dweilen met de kraan open; proces + techniek + mens is de structurele oplossing.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{callback_bij_nieuw}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{callback_bij_nieuw}.' },
      ],
    },
  ],
});
