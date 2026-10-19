/* Room: Datastromen — crypto-witwassen: peel chains, chain-hopping & stablecoins */

// =======================================================================
//  Alles FICTIEF: verzonnen wallets, bedragen en diensten. Je oefent de
//  denkwijze; je volgt geen echte transacties of personen.
// =======================================================================

// --- Chaintrace: een peel chain (splitsen reinigt NIET) ---
const CW_LABELS = { D: 'Losgeld-wallet (vuil)', A: 'Rest-wallet 1', B: 'Rest-wallet 2', C1: 'Afgepelde cash-out 1', C2: 'Afgepelde cash-out 2', EX: 'Exchange (cash-out)' };
const CW_ORIGINS = [{ addr: 'D', amount: 10 }];
const CW_TXS = [
  { inputs: ['D'], outputs: [{ addr: 'A', amount: 9 }, { addr: 'C1', amount: 1 }], time: '10:00' },
  { inputs: ['A'], outputs: [{ addr: 'B', amount: 8 }, { addr: 'C2', amount: 1 }], time: '10:30' },
  { inputs: ['B'], outputs: [{ addr: 'EX', amount: 8 }], time: '11:00' },
];

// --- Flow: chain-hopping over ketens en een stablecoin ---
const CW_NODES = [
  { id: 'rw', type: 'wallet', label: 'Vuile BTC-wallet' },
  { id: 'mix', type: 'mixer', label: "Mixer 'CoinWas'" },
  { id: 'swap', type: 'service', label: 'Swap BTC → ETH (bridge)' },
  { id: 'stab', type: 'service', label: 'Omzetting naar USDT (stablecoin)' },
  { id: 'ex', type: 'exchange', label: 'Exchange met zwakke KYC (cash-out)' },
];
const CW_EDGES = [
  { from: 'rw', to: 'mix', amount: 100000, time: 'dag 1', note: 'waarde ±€ 100.000 de mixer in' },
  { from: 'mix', to: 'swap', amount: 97000, time: 'dag 1', note: 'mixer houdt €3.000' },
  { from: 'swap', to: 'stab', amount: 95000, time: 'dag 2', note: 'swap naar ETH, €2.000 kosten/slippage' },
  { from: 'stab', to: 'ex', amount: 94000, time: 'dag 3', note: 'omgezet in USDT (koersrisico weg), €1.000 kosten' },
];

// --- Ordering: de stappen van crypto-witwassen ---
const CW_STEPS = [
  { id: '1', label: 'Losgeld komt binnen op een wallet (placement)' },
  { id: '2', label: 'Het bedrag wordt via een peel chain opgeknipt (layering)' },
  { id: '3', label: 'De munten gaan door een mixer/CoinJoin om de link te verbergen' },
  { id: '4', label: 'Chain-hopping: swappen naar een andere blockchain (BTC → ETH)' },
  { id: '5', label: 'Omzetten in een stablecoin (USDT) om koersrisico te vermijden' },
  { id: '6', label: 'Cash-out bij een exchange met zwakke KYC' },
];

CS.registerRoom({
  id: 'crypto-witwassen',
  path: 'datastromen',
  order: 5,
  title: 'Crypto-witwassen: peel chains & chain-hopping',
  icon: '🪙',
  difficulty: 'Moeilijk',
  minutes: 60,
  summary: 'Een verdieping op het volgen van cryptostromen. Je leert waarom opknippen (peeling) de taint níét wegneemt, hoe chain-hopping en stablecoins het spoor versluieren, wat NFT-wash-trading is, en waar de off-ramp (exchange) het knelpunt blijft. Met de blockchain-tracer, een stroomanalyse en de witwas-volgorde.',
  objectives: [
    'Uitleggen waarom een peel chain de taint niet verlaagt (splitsen ≠ reinigen)',
    'Het verschil kennen tussen verdunnen (mixer + schoon geld) en versluieren (peeling/hopping)',
    'Chain-hopping en de rol van stablecoins in witwassen herkennen',
    'NFT-wash-trading als integratietruc uitleggen',
    'De off-ramp (exchange, KYC) als het beslissende knelpunt aanwijzen',
  ],
  terms: [
    { term: 'Peel chain', def: 'Een keten waarin telkens een klein bedrag wordt "afgepeld" naar een cash-out, terwijl de rest doorreist — om in stukjes uit te betalen zonder op te vallen.' },
    { term: 'Taint', def: 'De mate waarin het geld op een adres uit een vuile bron komt (als bedrag en percentage). Peeling splitst de taint, maar laat hem niet verdwijnen.' },
    { term: 'Mixer / CoinJoin', def: 'Dienst of techniek die munten van velen vermengt om de directe link tussen in- en uitgang te breken.' },
    { term: 'Chain-hopping', def: 'Waarde van de ene blockchain naar de andere verplaatsen (bijv. BTC → ETH via een bridge) om het spoor over ketens te verbreken.' },
    { term: 'Stablecoin', def: 'Een cryptomunt gekoppeld aan een valuta (bijv. USDT ↔ dollar). Witwassers gebruiken het om koersrisico te vermijden terwijl ze "geparkeerd" staan.' },
    { term: 'NFT-wash-trading', def: 'Een NFT aan jezelf verkopen voor een hoog bedrag om nepomzet/legitieme "winst" te creëren — een integratietruc.' },
    { term: 'Off-ramp / cash-out', def: 'De plek waar crypto naar gewoon geld gaat (exchange, pinautomaat). Door KYC/Wwft hangt daar een echte identiteit aan het spoor.' },
    { term: 'KYC', def: 'Know Your Customer: identiteitscontrole bij een exchange. Zwakke KYC maakt een exchange aantrekkelijk voor cash-out.' },
  ],
  resources: [
    { title: 'Chainalysis — Crypto Crime Report', url: 'https://www.chainalysis.com/' },
    { title: 'Elliptic — crypto-forensics', url: 'https://www.elliptic.co/' },
    { title: 'FATF — Virtual Assets', url: 'https://www.fatf-gafi.org/en/topics/virtual-assets.html' },
    { title: 'Bitcoin-wiki — CoinJoin', url: 'https://en.bitcoin.it/wiki/CoinJoin' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Peeling: splitsen reinigt niet',
      content: `
        <p>Een hardnekkig misverstand: als je crimineel geld in heel veel kleine stukjes opknipt, zou het "schoner"
        worden. Niet waar. Een <strong>peel chain</strong> pelt telkens een klein bedrag af naar een cash-out terwijl de
        rest doorreist — handig om onopvallend uit te betalen, maar de <strong>taint</strong> blijft 100%: je verdeelt het
        vuil, je laat het niet verdwijnen.</p>
        <p>Alleen <em>mengen met schoon geld</em> (een mixer met echte liquiditeit, of een CoinJoin) verlaagt het
        <em>percentage</em> — en zelfs dan blijft het vuile <em>bedrag</em> bestaan. Reken het na met de tracer.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de wallets, bedragen en diensten zijn verzonnen.</div>
        <div class="callout tip"><strong>Beloning:</strong> peeling splitst, het reinigt niet. Vlag: <code>NM{peelen_is_niet_reinigen}</code>.</div>
      `,
      lab: {
        type: 'chaintrace',
        title: 'de peel chain',
        unit: 'BTC',
        scenario: '10 BTC losgeld wordt in stapjes afgepeld. Blijft het vuil?',
        labels: CW_LABELS,
        exchanges: ['EX'],
        origins: CW_ORIGINS,
        txs: CW_TXS,
        ask: [
          { q: 'Hoeveel vuil geld (BTC) bereikt de exchange?', answer: ['8', '8.0', '8 btc'], hint: 'Lees de taint-kolom bij de exchange.' },
          { q: 'Wat is het taint-percentage op de exchange na het peelen? (in %)', answer: ['100%', '100', '100 %'], hint: 'Er kwam nergens schoon geld bij.' },
        ],
      },
      questions: [
        { q: 'Wat doet een peel chain met de taint?', options: ['Niets aan het percentage: het vuil wordt alleen opgesplitst, niet verwijderd', 'Het verlaagt de taint naar 0%', 'Het verdubbelt de taint', 'Het wist de blockchain'], answer: 0, explain: 'Splitsen verdeelt het vuile bedrag; zonder schoon geld blijft elk deel 100% vuil.' },
        { q: 'Hoeveel BTC vuil geld bereikt de exchange in deze keten?', answer: ['8', '8.0', '8 btc'], hint: 'De tracer toont het bij de exchange.', explain: 'Er kwam nooit schoon geld bij, dus de 8 BTC die de exchange bereikt is 100% vuil.' },
        { q: 'Wat verlaagt het taint-PERCENTAGE wél (maar niet het vuile bedrag)?', options: ['Mengen met schoon geld (een mixer met echte liquiditeit of CoinJoin)', 'Het geld langer laten staan', 'Meer peel-stappen', 'Een hogere transactiefee'], answer: 0, explain: 'Alleen schone liquiditeit verdunt het percentage; het vuile bedrag blijft in de mix aanwezig.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{peelen_is_niet_reinigen}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{peelen_is_niet_reinigen}.' },
      ],
    },
    {
      title: 'Taak 2 — Chain-hopping en stablecoins',
      content: `
        <p>Om het spoor echt lastig te maken verplaatsen witwassers waarde <strong>over blockchains</strong>
        (<em>chain-hopping</em>): van Bitcoin naar Ethereum via een bridge, dan naar een <strong>stablecoin</strong> als
        USDT. De stablecoin haalt het <em>koersrisico</em> eruit — je staat "geparkeerd" in iets dat een dollar waard
        blijft — en elke hop breekt de analyse op één keten. Onderweg kost het fees, maar dat nemen ze voor lief.</p>
        <p>Volg de waarde door de hops in het lab. Let op waar het uiteindelijk eruit gaat: de off-ramp blijft het
        knelpunt.</p>
        <div class="callout tip"><strong>Beloning:</strong> elke hop breekt de keten, de off-ramp niet. Vlag:
        <code>NM{hop_na_hop_naar_de_offramp}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'chain-hopping naar de cash-out',
        unit: '€',
        scenario: 'Waarde van ±€ 100.000 hopt van BTC via een mixer en ETH naar een stablecoin en dan de exchange uit.',
        nodes: CW_NODES,
        edges: CW_EDGES,
        ask: [
          { q: 'Hoeveel euro bereikt uiteindelijk de exchange? (alleen het getal)', answer: ['94000', '94.000'], hint: 'Volg tot de laatste knoop.' },
          { q: 'Hoeveel ging er in totaal verloren aan fees/kosten?', answer: ['6000', '6.000'], hint: '100.000 erin, hoeveel komt eruit?' },
          { q: 'Waarom zetten ze het om in een stablecoin?', answer: ['koersrisico', 'om koersrisico te vermijden', 'stabiel', 'koersstabiliteit', 'geen koersrisico'], hint: 'Wat wil je niet terwijl je geld "geparkeerd" staat?' },
        ],
      },
      questions: [
        { q: 'Wat is chain-hopping?', options: ['Waarde van de ene blockchain naar de andere verplaatsen om het spoor te breken', 'Een wallet vaak van naam veranderen', 'Transacties sneller maken', 'Een hash kraken'], answer: 0, explain: 'Door over ketens te springen moet een onderzoeker elke keten apart volgen — dat versluiert het spoor.' },
        { q: 'Waarom gebruiken witwassers een stablecoin als USDT?', options: ['Om koersrisico te vermijden terwijl het geld "geparkeerd" staat', 'Omdat het anoniemer is dan Bitcoin', 'Omdat het gratis is', 'Omdat het niet op een blockchain staat'], answer: 0, explain: 'Een stablecoin blijft ±1 dollar waard; zo verlies je geen waarde door koersschommelingen tijdens het wassen.' },
        { q: 'Hoeveel euro bereikt de exchange na alle hops?', answer: ['94000', '94.000', '€ 94.000', '€94000'], hint: 'De laatste transactie.', explain: 'Na mixer- en swapkosten blijft € 94.000 over bij de off-ramp.' },
        { q: 'Ondanks al het hoppen: waar grijpt de opsporing nog steeds aan?', options: ['Bij de off-ramp/exchange, waar via KYC een identiteit aan het spoor hangt', 'Bij de mixer', 'Bij de eerste wallet', 'Nergens, het is onvindbaar'], answer: 0, explain: 'Crypto moet uiteindelijk ergens naar gewoon geld; die off-ramp met KYC is het knelpunt.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{hop_na_hop_naar_de_offramp}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{hop_na_hop_naar_de_offramp}.' },
      ],
    },
    {
      title: 'Taak 3 — De volgorde en NFT-wash-trading',
      content: `
        <p>Zet de stappen van crypto-witwassen in de juiste volgorde, van binnenkomst tot cash-out. En let op een
        integratietruc die je nog niet zag: <strong>NFT-wash-trading</strong>. Daarbij verkoopt iemand een (vaak
        waardeloze) NFT aan <em>zichzelf</em> — via een tweede wallet — voor een hoog bedrag. Zo ontstaat op papier
        "legitieme winst uit kunsthandel", terwijl het gewoon het eigen vuile geld is dat rondpompt.</p>
        <div class="callout tip"><strong>Beloning:</strong> van losgeld tot "kunsthandel". Vlag: <code>NM{wassen_in_zes_stappen}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de volgorde van crypto-witwassen',
        prompt: 'Zet de zes stappen op volgorde, van binnenkomst van het losgeld tot de cash-out.',
        items: CW_STEPS,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{wassen_in_zes_stappen}',
        explain: 'Placement → peel chain → mixer → chain-hopping → stablecoin → cash-out.',
      },
      questions: [
        { q: 'Wat is NFT-wash-trading?', options: ['Een NFT aan jezelf verkopen voor een hoog bedrag om nepwinst/"legitieme" inkomsten te creëren', 'Een NFT schoonmaken', 'Een NFT door een mixer halen', 'Een NFT gratis weggeven'], answer: 0, explain: 'Door aan jezelf te "verkopen" lijkt het vuile geld opeens winst uit kunsthandel — een integratietruc.' },
        { q: 'In welke witwasfase past NFT-wash-trading het best?', options: ['Integration (het geld terug laten komen als schijnbaar legaal bezit/winst)', 'Placement', 'Layering', 'Geen enkele'], answer: 0, explain: 'Het doel is het gewassen geld een legitieme herkomst (kunsthandelwinst) te geven: dat is integration.' },
        { q: 'Wat is de eerste stap in de keten?', options: ['Het losgeld komt binnen op een wallet (placement)', 'De cash-out', 'Chain-hopping', 'De stablecoin-omzetting'], answer: 0, explain: 'Zonder binnenkomst (placement) is er niets om te wassen.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{wassen_in_zes_stappen}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{wassen_in_zes_stappen}.' },
      ],
    },
  ],
});
