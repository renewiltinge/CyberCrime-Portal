/* Room: Intelligence — infostealers & gestolen-datamarkten */

// =======================================================================
//  Alles FICTIEF en EDUCATIEF: verzonnen bedragen en namen. Deze room legt
//  de keten en de verdediging uit — geen handleiding om te stelen.
// =======================================================================

// --- Ordering: de infostealer-keten ---
const IS_STEPS = [
  { id: '1', label: 'Slachtoffer downloadt gekraakte software of klikt een malvertising-link' },
  { id: '2', label: 'De infostealer draait en oogst wachtwoorden, cookies en crypto-wallets' },
  { id: '3', label: 'De "stealer log" wordt geüpload naar de operator' },
  { id: '4', label: 'Logs worden verkocht op een marktplaats (los, in bulk of als combolist)' },
  { id: '5', label: 'Kopers doen credential stuffing of nemen accounts over (ATO)' },
  { id: '6', label: 'De toegang wordt te gelde gemaakt: fraude, of initial access verkocht aan ransomware' },
];

// --- Connections: de infostealer-economie ---
const IS_GROUPS = [
  { name: 'Wat een infostealer oogst', items: ['Opgeslagen wachtwoorden', 'Sessie-cookies', 'Crypto-wallets', 'Autofill & creditcards'] },
  { name: 'Besmettingswegen', items: ['Gekraakte software', 'Malvertising', 'Nep-download in YouTube-beschrijving', 'Phishingbijlage'] },
  { name: 'Handelswaar', items: ['Stealer log', 'Combolist', 'Sessie-cookie (sessie-overname)', 'Initial access (aan ransomware)'] },
  { name: 'Verdediging', items: ['MFA / passkeys', 'Wachtwoordmanager + uniek wachtwoord', 'Geen gekraakte software', 'Uitloggen / sessies invalideren'] },
];

// --- Flow: de geldstroom rond de logverkoop ---
const IS_NODES = [
  { id: 'buyer', type: 'account', label: 'Koper (fraudeur)' },
  { id: 'market', type: 'service', label: 'Log-marktplaats' },
  { id: 'op', type: 'cashout', label: 'Stealer-operator (crypto)' },
  { id: 'fee', type: 'cashout', label: 'Platformfee (crypto)' },
];
const IS_EDGES = [
  { from: 'buyer', to: 'market', amount: 100, time: 'dag 1', note: 'koopt een pakket van 100 logs' },
  { from: 'market', to: 'op', amount: 70, time: 'dag 1', note: 'operatoraandeel (70%)' },
  { from: 'market', to: 'fee', amount: 30, time: 'dag 1', note: 'platformfee (30%)' },
];

CS.registerRoom({
  id: 'infostealers-datamarkten',
  path: 'intelligence',
  order: 14,
  title: 'Infostealers & gestolen-datamarkten',
  icon: '🪝',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Infostealers zijn de motor achter moderne cybercrime: goedkope malware die in één klap wachtwoorden, cookies en wallets oogst. De buit — "stealer logs" — wordt per bulk verhandeld en vormt de brandstof voor accountovername, fraude en zelfs ransomware (initial access). Je leert de keten, de handelswaar, de geldstroom en vooral: de verdediging. Educatief en defensief.',
  objectives: [
    'Uitleggen wat een infostealer is en wat hij oogst',
    'De infostealer-keten van besmetting tot te-gelde-maken benoemen',
    'De handelswaar (logs, combolists, cookies, initial access) herkennen',
    'De geldstroom rond de logverkoop volgen',
    'Je verdedigen: MFA/passkeys, unieke wachtwoorden, geen gekraakte software, sessie-invalidatie',
  ],
  terms: [
    { term: 'Infostealer', def: 'Malware die in één run opgeslagen wachtwoorden, sessie-cookies, autofill en crypto-wallets steelt.' },
    { term: 'Stealer log', def: 'Het buitpakket van één besmetting: alle gestolen credentials, cookies en gegevens van dat slachtoffer.' },
    { term: 'Combolist', def: 'Een grote lijst van gebruikersnaam/wachtwoord-combinaties, samengesteld uit lekken en logs.' },
    { term: 'Credential stuffing', def: 'Gelekte combinaties massaal uitproberen op andere sites (werkt door hergebruik van wachtwoorden).' },
    { term: 'Sessie-cookie / ATO', def: 'Een gestolen sessie-cookie laat een aanvaller inloggen zónder wachtwoord of MFA — account takeover.' },
    { term: 'Malvertising', def: 'Kwaadaardige advertenties die naar een nep-download of exploit leiden.' },
    { term: 'Initial access', def: 'Eerste toegang tot een organisatie; infostealer-logs worden hiervoor aan ransomwaregroepen verkocht.' },
    { term: 'Sessie-invalidatie', def: 'Overal uitloggen / sessies ongeldig maken, zodat een gestolen cookie niets meer waard is.' },
  ],
  resources: [
    { title: 'Have I Been Pwned — check of je in een lek zit', url: 'https://haveibeenpwned.com/' },
    { title: 'NCSC — wachtwoorden en MFA', url: 'https://www.ncsc.nl/' },
    { title: 'Krebs on Security — infostealers', url: 'https://krebsonsecurity.com/' },
    { title: 'FIDO Alliance — passkeys', url: 'https://fidoalliance.org/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De motor achter moderne cybercrime',
      content: `
        <p>Veel aanvallen beginnen tegenwoordig niet met een geniale exploit, maar met een <strong>infostealer</strong>:
        goedkope malware die in één run je <strong>opgeslagen wachtwoorden</strong>, <strong>sessie-cookies</strong>,
        <strong>autofill</strong> en <strong>crypto-wallets</strong> leegrooft. De buit — een <strong>stealer log</strong>
        — wordt per bulk verhandeld en is de brandstof voor accountovername, fraude en zelfs ransomware (als
        <strong>initial access</strong>).</p>
        <p>Extra gemeen: een gestolen <strong>sessie-cookie</strong> laat een aanvaller soms inloggen <em>zonder</em>
        wachtwoord én <em>zonder</em> MFA — want de sessie is al "ingelogd". Daarom is dit thema de kern van moderne
        datastromen. Je leert de keten én hoe je jezelf beschermt.</p>
        <div class="callout warn"><strong>Alles fictief en educatief:</strong> geen handleiding om te stelen; de nadruk ligt op
        begrijpen en verdedigen.</div>
        <div class="callout tip"><strong>Beloning:</strong> één besmetting, een hele buit. Vlag: <code>NM{een_log_een_buit}</code>.</div>
      `,
      questions: [
        { q: 'Wat oogst een infostealer?', options: ['Opgeslagen wachtwoorden, cookies, autofill en crypto-wallets', 'Alleen je IP-adres', 'Alleen je schermafbeeldingen', 'Niets'], answer: 0, explain: 'In één run rooft een infostealer een brede buit aan credentials en gegevens.' },
        { q: 'Waarom is een gestolen sessie-cookie zo gevaarlijk?', options: ['De aanvaller kan er soms mee inloggen zonder wachtwoord én zonder MFA', 'Cookies zijn versleuteld en dus veilig', 'Cookies bevatten nooit iets nuttigs', 'Dat is niet gevaarlijk'], answer: 0, explain: 'Een geldige sessie-cookie "is al ingelogd" en omzeilt zo zelfs MFA — tot je uitlogt/invalideert.' },
        { q: 'Waarvoor worden infostealer-logs óók verkocht?', options: ['Als initial access aan ransomwaregroepen', 'Als antivirus', 'Als back-up', 'Nergens voor'], answer: 0, explain: 'Toegang uit logs is vaak de eerste stap van een ransomware-aanval — een hele markt op zich.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{een_log_een_buit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{een_log_een_buit}.' },
      ],
    },
    {
      title: 'Taak 2 — De keten',
      content: `
        <p>Zet de infostealer-keten op volgorde: van de besmetting tot het te gelde maken van de buit.</p>
        <div class="callout tip"><strong>Beloning:</strong> van gekraakte download tot ransomware-toegang. Vlag: <code>NM{stealer_keten}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de infostealer-keten',
        prompt: 'Zet de zes stappen op volgorde, van besmetting tot te gelde maken.',
        items: IS_STEPS,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{stealer_keten}',
        explain: 'Besmetting → oogsten → log uploaden → verkopen → stuffing/ATO → te gelde maken (fraude/ransomware-toegang).',
      },
      questions: [
        { q: 'Wat is vaak de eerste stap?', options: ['Een besmetting via gekraakte software of malvertising', 'De ransomware-aanval', 'Het verkopen van logs', 'Credential stuffing'], answer: 0, explain: 'De stealer moet eerst draaien; dat begint met een download/klik.' },
        { q: 'Wat gebeurt er met de buit na de verkoop?', options: ['Kopers doen credential stuffing/ATO en maken de toegang te gelde', 'Hij wordt gewist', 'Hij wordt teruggegeven', 'Niets'], answer: 0, explain: 'Gekochte logs voeden accountovername, fraude en initial-access-verkoop.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{stealer_keten}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{stealer_keten}.' },
      ],
    },
    {
      title: 'Taak 3 — De economie in kaart',
      content: `
        <p>Groepeer de zestien begrippen: wat een infostealer <strong>oogst</strong>, de <strong>besmettingswegen</strong>, de
        <strong>handelswaar</strong>, en de <strong>verdediging</strong>.</p>
        <div class="callout tip"><strong>Beloning:</strong> ken de buit én de tegenmaatregel. Vlag: <code>NM{stealer_economie}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'infostealers: begrippen → categorie',
        prompt: 'Vind de vier groepen van vier.',
        groups: IS_GROUPS,
      },
      questions: [
        { q: 'Wat is een "combolist"?', options: ['Een grote lijst gebruikersnaam/wachtwoord-combinaties uit lekken en logs', 'Een antivirusregel', 'Een type cookie', 'Een wachtwoordmanager'], answer: 0, explain: 'Combolists voeden credential stuffing: massaal uitproberen op andere sites.' },
        { q: 'Welke verdediging stopt credential stuffing het best?', options: ['MFA/passkeys én unieke wachtwoorden per site', 'Overal hetzelfde wachtwoord', 'Een snellere browser', 'Gekraakte software'], answer: 0, explain: 'Uniek per site breekt hergebruik; MFA/passkeys stoppen het inloggen met alleen een wachtwoord.' },
        { q: 'Welke verdediging maakt een gestolen sessie-cookie waardeloos?', options: ['Uitloggen / sessies invalideren', 'Een langer wachtwoord', 'Een snellere pc', 'Niets'], answer: 0, explain: 'Een ongeldige sessie kan de aanvaller niet meer gebruiken, ook al heeft hij de cookie.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{stealer_economie}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{stealer_economie}.' },
      ],
    },
    {
      title: 'Taak 4 — De geldstroom',
      content: `
        <p>Stealer logs zijn spotgoedkoop per stuk, maar er gaan er miljoenen om. Volg het geld van één aankoop: een koper
        betaalt de marktplaats, die het aandeel doorsluist naar de operator en een platformfee houdt.</p>
        <div class="callout tip"><strong>Beloning:</strong> goedkoop per log, groot in volume. Vlag: <code>NM{goedkoop_maar_massaal}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'de logverkoop',
        unit: '€',
        scenario: 'Een koper betaalt € 100 voor 100 logs; de marktplaats splitst het tussen operator en platform.',
        nodes: IS_NODES,
        edges: IS_EDGES,
        ask: [
          { q: 'Hoeveel betaalt de koper voor het pakket? (getal)', answer: ['100'], hint: 'De eerste transactie.' },
          { q: 'Hoeveel gaat er naar de stealer-operator? (getal)', answer: ['70'], hint: 'Het operatoraandeel (70%).' },
        ],
      },
      questions: [
        { q: 'Hoeveel ontvangt de operator van de € 100?', answer: ['70', '€ 70', '€70'], hint: '70% operatoraandeel.', explain: 'De operator krijgt € 70; de marktplaats houdt € 30 platformfee.' },
        { q: 'Waarom is dit model zo winstgevend ondanks de lage prijs per log?', options: ['Het volume is enorm: een kleine marge × miljoenen logs', 'Omdat logs duur zijn', 'Omdat er geen kosten zijn', 'Dat is het niet'], answer: 0, explain: 'Spotgoedkoop per stuk, maar schaal maakt het lucratief — en houdt de hele economie draaiende.' },
        { q: 'Wat is jouw sterkste persoonlijke verdediging tegen deze keten?', options: ['Unieke wachtwoorden + MFA/passkeys, en geen gekraakte software installeren', 'Overal hetzelfde wachtwoord', 'Nooit uitloggen', 'Je cookies delen'], answer: 0, explain: 'Je breekt het hergebruik, stopt inloggen-met-alleen-een-wachtwoord en voorkomt de besmetting zelf.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{goedkoop_maar_massaal}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{goedkoop_maar_massaal}.' },
      ],
    },
  ],
});
