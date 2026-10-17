/* Room: Security-kern — SIM-swap & accountovername (aanval, simulatie, verdediging) */

// =======================================================================
//  Alles FICTIEF: verzonnen slachtoffer, provider en bedragen. Je oefent
//  herkennen en verdedigen; er wordt niets echt aangevallen.
// =======================================================================

// --- Ordering: de SIM-swap-aanvalsketen ---
const SS_STEPS = [
  { id: '1', label: 'Aanvaller verzamelt persoonsgegevens (OSINT/datalek: naam, geboortedatum, telefoonnummer)' },
  { id: '2', label: 'Belt de telecomprovider, doet zich voor als het slachtoffer en vraagt een nieuwe SIM / nummerbehoud' },
  { id: '3', label: 'De provider porteert het nummer naar de SIM van de aanvaller' },
  { id: '4', label: 'De telefoon van het slachtoffer verliest bereik; de aanvaller ontvangt nu de sms-codes' },
  { id: '5', label: 'De aanvaller reset wachtwoorden via sms-OTP en neemt accounts over' },
  { id: '6', label: 'Geld/crypto wordt weggesluisd vóór het slachtoffer het doorheeft' },
];

// --- Scenario: herkennen en reageren ---
const SS_SCEN = [
  {
    situation: 'Midden op de dag valt je mobiele bereik weg ("Geen netwerk") en je krijgt een e-mail: "Je simkaart is gewijzigd." Wat doe je?',
    choices: [
      { label: 'Direct via een andere lijn je provider bellen om de SIM te blokkeren, en je bank bellen', good: true, feedback: 'Precies: dit is het signaal van een SIM-swap. Snelheid beperkt de schade; blokkeer de SIM en waarschuw de bank.' },
      { label: 'Wachten tot het bereik vanzelf terugkomt', good: false, feedback: 'Terwijl je wacht, ontvangt de aanvaller jouw sms-codes en neemt hij accounts over. Niet wachten — handelen.' },
      { label: 'Niets doen, het is vast een storing', good: false, feedback: 'Een "SIM gewijzigd"-mail plus plots geen bereik is zelden toeval. Behandel het als een aanval.' },
    ],
  },
  {
    situation: 'Welke vorm van 2FA is het veiligst tegen een SIM-swap?',
    choices: [
      { label: 'Een authenticator-app of een hardware-sleutel (FIDO2/passkey)', good: true, feedback: 'Juist: die zitten aan je apparaat/sleutel vast, niet aan een overdraagbaar telefoonnummer.' },
      { label: 'Sms-OTP (code per sms)', good: false, feedback: 'Juist dát is het doelwit van een SIM-swap: wie je nummer kaapt, ontvangt de sms-codes.' },
      { label: 'E-mail-OTP', good: false, feedback: 'Als je e-mail óók met sms-2FA beveiligd is, valt die net zo hard. App/hardware is sterker.' },
    ],
  },
  {
    situation: 'Hoe maak je een SIM-swap vooraf moeilijker?',
    choices: [
      { label: 'Een port-out-pin/poortblokkade bij je provider instellen en je nummer minder publiek delen', good: true, feedback: 'Goed: een extra geheim bij de provider en minder blootgestelde gegevens verkleinen de kans sterk.' },
      { label: 'Je telefoonnummer juist overal als 2FA gebruiken', good: false, feedback: 'Dan maak je het nummer tot een kroonjuweel én een single point of failure. Minder, niet meer.' },
      { label: 'Niets — dit overkomt alleen beroemdheden', good: false, feedback: 'SIM-swap treft ook gewone mensen met crypto of toegang. Onderschat het niet.' },
    ],
  },
  {
    situation: 'Ondanks alles blijkt je crypto-account geplunderd. Wat is je eerste stap?',
    choices: [
      { label: 'Melden bij de exchange en de politie, laten bevriezen wat kan en al het bewijs bewaren', good: true, feedback: 'Precies: snel melden vergroot de kans op bevriezen; bewaar e-mails, tijdstippen en transactie-ID\'s.' },
      { label: 'Zelf proberen de hacker op te sporen en te confronteren', good: false, feedback: 'Eigenrichting is onverstandig en riskant. Laat het aan de exchange en de opsporing.' },
      { label: 'Afwachten of het geld vanzelf terugkomt', good: false, feedback: 'Elke minuut telt bij bevriezen/terughalen. Direct melden.' },
    ],
  },
  {
    situation: 'Waarom is sms-2FA fundamenteel zwakker dan een app of hardware-sleutel?',
    choices: [
      { label: 'Het telefoonnummer is overdraagbaar en los van jou; wie het nummer kaapt, kaapt de codes', good: true, feedback: 'Precies: de beveiliging hangt aan een nummer dat een provider kan verplaatsen — buiten jouw controle.' },
      { label: 'Omdat sms traag aankomt', good: false, feedback: 'Snelheid is het punt niet; overdraagbaarheid van het nummer wel.' },
      { label: 'Omdat sms geld kost', good: false, feedback: 'Kosten zijn irrelevant; het risico zit in de overdraagbaarheid van het nummer.' },
    ],
  },
];

// --- Flow: het geld na de accountovername ---
const SS_NODES = [
  { id: 'acct', type: 'account', label: 'Gekaapte rekening/wallet' },
  { id: 'ex', type: 'exchange', label: 'Crypto-exchange' },
  { id: 'mix', type: 'mixer', label: "Mixer" },
  { id: 'cash', type: 'cashout', label: 'Cash-out' },
];
const SS_EDGES = [
  { from: 'acct', to: 'ex', amount: 15000, time: '13:05', note: 'direct na overname leeggehaald' },
  { from: 'ex', to: 'mix', amount: 14700, time: '13:20', note: 'exchange-fee 300' },
  { from: 'mix', to: 'cash', amount: 14300, time: '14:00', note: 'mixer houdt 400; cash-out' },
];

CS.registerRoom({
  id: 'simswap-aanval',
  path: 'security-kern',
  order: 9,
  title: 'SIM-swap & accountovername',
  icon: '📱',
  difficulty: 'Gemiddeld',
  minutes: 45,
  summary: 'Je telefoonnummer is vaker de sleutel tot je leven dan je denkt — en dat is precies het probleem. Je leert hoe een SIM-swap werkt (het nummer kapen om sms-codes te onderscheppen), waarom sms-2FA daardoor zwak is, en wat je doet om het te voorkomen én als het je toch overkomt. Met de aanvalsketen, een beslissimulatie en het geldspoor erna.',
  objectives: [
    'Uitleggen hoe een SIM-swap werkt en waarom sms-2FA er kwetsbaar voor is',
    'De SIM-swap-aanvalsketen op volgorde zetten',
    'De signalen herkennen en de juiste eerste reactie kiezen',
    'Sterkere 2FA (authenticator/hardware/passkey) en port-out-bescherming benoemen',
    'Het geldspoor na een accountovername volgen tot de cash-out',
  ],
  terms: [
    { term: 'SIM-swap', def: 'Een aanvaller laat (via social engineering bij de provider) jouw telefoonnummer naar zijn eigen SIM overzetten, zodat hij jouw sms en oproepen ontvangt.' },
    { term: '2FA / MFA', def: 'Tweestaps-/meervoudige verificatie: een tweede factor bovenop je wachtwoord.' },
    { term: 'sms-OTP', def: 'Een eenmalige code per sms. Zwak tegen SIM-swap omdat de code naar het (overdraagbare) nummer gaat.' },
    { term: 'Authenticator-app', def: 'Een app (TOTP) die codes op je apparaat genereert — niet gekoppeld aan je telefoonnummer.' },
    { term: 'FIDO2 / passkey', def: 'Een hardware- of apparaatgebonden sleutel; sterk tegen phishing én SIM-swap.' },
    { term: 'Port-out-pin', def: 'Een extra geheime code bij je provider die voorkomt dat je nummer zomaar wordt overgezet.' },
    { term: 'Accountovername (ATO)', def: 'Account Takeover: de aanvaller neemt met gekaapte codes je accounts over en haalt waarde weg.' },
    { term: 'Single point of failure', def: 'Eén zwakke schakel die, als hij valt, alles meeneemt — zoals je telefoonnummer als het overal je 2FA is.' },
  ],
  resources: [
    { title: 'NCSC — veilig inloggen en MFA', url: 'https://www.ncsc.nl/' },
    { title: 'FIDO Alliance — passkeys', url: 'https://fidoalliance.org/' },
    { title: 'Fraudehelpdesk — simswap en accountovername', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'Politie — fraude en identiteitsfraude', url: 'https://www.politie.nl/informatie/fraude.html' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Je nummer als sleutel',
      content: `
        <p>Zonder dat je het doorhebt, is je <strong>telefoonnummer</strong> vaak de hoofdsleutel tot je leven geworden:
        je bank, je e-mail, je crypto, je sociale media — allemaal sturen ze een <strong>sms-code</strong> als je inlogt of
        een wachtwoord reset. Een <strong>SIM-swap</strong> draait precies die sleutel om: de aanvaller laat (met social
        engineering bij de telecomprovider) jouw nummer naar <em>zijn</em> SIM overzetten. Vanaf dat moment krijgt híj je
        sms-codes — en jij geen bereik meer.</p>
        <p>De les is hard maar simpel: <strong>sms-2FA is zwak</strong>, omdat het aan een <em>overdraagbaar</em> nummer hangt
        in plaats van aan jóú. Een authenticator-app of een hardware-sleutel (passkey/FIDO2) zit vast aan je apparaat en is
        daardoor veel sterker.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> het slachtoffer, de provider en de bedragen zijn verzonnen
        oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> je nummer is overdraagbaar, jij niet. Vlag: <code>NM{nummer_is_geen_identiteit}</code>.</div>
      `,
      questions: [
        { q: 'Wat gebeurt er bij een SIM-swap?', options: ['Je telefoonnummer wordt naar de SIM van de aanvaller overgezet, zodat hij je sms-codes ontvangt', 'Je telefoon wordt gehackt met malware', 'Je simkaart gaat fysiek stuk', 'Je wachtwoord wordt geraden'], answer: 0, explain: 'De aanvaller kaapt het nummer via de provider; daarna ontvangt hij alle sms — inclusief je 2FA-codes.' },
        { q: 'Waarom is sms-2FA zwak tegen een SIM-swap?', options: ['De code gaat naar een overdraagbaar nummer, niet naar jou persoonlijk', 'Omdat sms te traag is', 'Omdat sms geld kost', 'Dat is het niet, sms is het veiligst'], answer: 0, explain: 'De beveiliging hangt aan een nummer dat een provider kan verplaatsen — buiten jouw controle.' },
        { q: 'Welke 2FA is sterker?', options: ['Een authenticator-app of hardware-sleutel (passkey/FIDO2)', 'Sms-OTP', 'Een beveiligingsvraag', 'Je geboortedatum'], answer: 0, explain: 'Apparaat-/sleutelgebonden factoren zijn niet te kapen via een telefoonnummer.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{nummer_is_geen_identiteit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{nummer_is_geen_identiteit}.' },
      ],
    },
    {
      title: 'Taak 2 — De aanvalsketen',
      content: `
        <p>Een SIM-swap is een keten van stappen. Zet ze op volgorde, van de voorbereiding tot de cash-out. Als je de keten
        kent, zie je ook waar je hem kunt breken (en waar de provider dat kan).</p>
        <div class="callout tip"><strong>Beloning:</strong> ken de keten, breek de keten. Vlag: <code>NM{swap_keten_compleet}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de SIM-swap-aanvalsketen',
        prompt: 'Zet de zes stappen op volgorde, van gegevens verzamelen tot het wegsluizen van geld.',
        items: SS_STEPS,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{swap_keten_compleet}',
        explain: 'Gegevens verzamelen → provider bellen → nummer porteren → sms onderscheppen → accounts overnemen → cash-out.',
      },
      questions: [
        { q: 'Wat is de eerste stap?', options: ['Persoonsgegevens verzamelen om geloofwaardig over te komen bij de provider', 'Het geld wegsluizen', 'Het nummer porteren', 'Een account overnemen'], answer: 0, explain: 'Met jouw gegevens klinkt de aanvaller overtuigend bij de helpdesk van de provider.' },
        { q: 'Waar ligt de cruciale schakel die de provider kan beschermen?', options: ['Het porteren van het nummer: strengere identiteitscontrole en een port-out-pin', 'Het wegsluizen van geld', 'Het verzamelen van gegevens', 'Niets, de provider kan niets doen'], answer: 0, explain: 'Als het porteren niet zonder sterke verificatie kan, valt de hele keten stil.' },
        { q: 'Wat merkt het slachtoffer als teken?', options: ['Plots geen mobiel bereik meer (en soms een "SIM gewijzigd"-bericht)', 'Een snellere telefoon', 'Meer opslagruimte', 'Niets, nooit'], answer: 0, explain: 'Zodra het nummer is verhuisd, verliest jouw toestel bereik — een belangrijk vroeg signaal.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{swap_keten_compleet}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{swap_keten_compleet}.' },
      ],
    },
    {
      title: 'Taak 3 — Herkennen en reageren',
      content: `
        <p>Nu jij. Loop door de vijf beslismomenten: van het eerste signaal tot de nasleep en de preventie. Kies telkens de
        verstandigste optie; je krijgt direct feedback. Vier van de vijf goed = je hebt het onder controle.</p>
        <div class="callout tip"><strong>Beloning:</strong> snel en koel reageren. Vlag: <code>NM{bereik_weg_alarm_aan}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'SIM-swap — herkennen, reageren, voorkomen',
        scenario: 'Vijf beslismomenten rond een SIM-swap. Kies verstandig.',
        steps: SS_SCEN,
        pass: 4,
        flag: 'NM{bereik_weg_alarm_aan}',
      },
      questions: [
        { q: 'Je verliest plots bereik én krijgt een "SIM gewijzigd"-mail. Eerste actie?', options: ['Via een andere lijn je provider bellen om te blokkeren en je bank waarschuwen', 'Wachten tot het bereik terugkomt', 'Niets doen', 'Je telefoon opnieuw opstarten en afwachten'], answer: 0, explain: 'Dit is het klassieke SIM-swap-signaal; blokkeren en waarschuwen beperkt de schade.' },
        { q: 'Hoe maak je een SIM-swap vooraf moeilijker?', options: ['Een port-out-pin instellen en je nummer minder publiek delen', 'Je nummer overal als 2FA gebruiken', 'Een langer wachtwoord', 'Niets, het is onvermijdelijk'], answer: 0, explain: 'Een extra geheim bij de provider en minder blootgestelde gegevens verkleinen de kans sterk.' },
        { q: 'Je account is geplunderd. Wat doe je eerst?', options: ['Melden bij exchange/bank en politie, bevriezen wat kan, bewijs bewaren', 'Zelf de hacker opsporen', 'Afwachten', 'Je account verwijderen'], answer: 0, explain: 'Snel melden vergroot de kans op bevriezen; bewaar bewijs voor de opsporing.' },
        { q: 'Welke vlag hoort bij een goede afhandeling?', answer: ['NM{bereik_weg_alarm_aan}'], hint: 'Verschijnt bij ≥4/5 goed / staat in de tip-callout.', explain: 'De vlag is NM{bereik_weg_alarm_aan}.' },
      ],
    },
    {
      title: 'Taak 4 — Volg het geld',
      content: `
        <p>Na de overname telt elke minuut. Volg het geldspoor in het lab: van de gekaapte rekening via een exchange en een
        mixer naar de cash-out. Zie je waarom zo snel mogelijk melden (om te bevriezen) het verschil maakt?</p>
        <div class="callout tip"><strong>Beloning:</strong> snelheid tegen de cash-out. Vlag: <code>NM{elke_minuut_telt}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'het geld na de accountovername',
        unit: '€',
        scenario: 'De gekaapte rekening wordt direct leeggehaald richting een exchange, mixer en cash-out.',
        nodes: SS_NODES,
        edges: SS_EDGES,
        ask: [
          { q: 'Hoeveel euro komt uiteindelijk bij de cash-out aan? (alleen het getal)', answer: ['14300', '14.300'], hint: 'De laatste transactie.' },
          { q: 'Waar werd het geld als eerste heen gesluisd?', answer: ['exchange', 'crypto-exchange', 'de exchange'], hint: 'Het eerste knooppunt na de rekening.' },
        ],
      },
      questions: [
        { q: 'Hoeveel euro bereikt de cash-out?', answer: ['14300', '14.300', '€ 14.300', '€14300'], hint: 'Na exchange- en mixerkosten.', explain: 'Na € 300 + € 400 kosten blijft € 14.300 over bij de cash-out.' },
        { q: 'Waarom is direct melden cruciaal?', options: ['Zolang het geld nog op de exchange staat, kan het soms bevroren worden', 'Omdat de exchange anders sluit', 'Omdat de rente oploopt', 'Dat maakt niet uit'], answer: 0, explain: 'Hoe eerder je meldt, hoe groter de kans dat de exchange de tegoeden bevriest vóór de cash-out.' },
        { q: 'Welke les over 2FA neem je mee uit deze hele room?', options: ['Gebruik app/hardware-2FA i.p.v. sms, en bescherm je nummer bij de provider', 'Gebruik overal hetzelfde wachtwoord', 'Deel je nummer vaker', 'Zet 2FA helemaal uit'], answer: 0, explain: 'Sterkere, niet-nummergebonden 2FA plus port-out-bescherming haalt de kern van SIM-swap weg.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{elke_minuut_telt}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{elke_minuut_telt}.' },
      ],
    },
  ],
});
