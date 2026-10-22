/* Room: Casus — het cryptomixer-onderzoek (taint, CoinJoin, attributie) */

// =======================================================================
//  Alles in deze room is FICTIEF: documentatie-IP's (RFC 5737), .nm.lab-
//  domeinen en verzonnen wallets/bedrijven. Je oefent de denkwijze.
// =======================================================================

// --- Chaintrace: de vereenvoudigde UTXO-keten (de kern van de casus) ---
// Vuile bron (losgeld) 6 BTC + schone mixer-liquiditeit 6 BTC -> 50% taint.
const KETEN_LABELS = {
  RW: 'Losgeld-wallet (vuil)',
  CL: 'Schone mixer-liquiditeit',
  HOP_A: 'Hop-wallet A',
  HOP_B: 'Hop-wallet B',
  MIX_IN: 'Mixer-deposit',
  OUT1: 'Mixer-uitbetaling 1',
  OUT2: 'Mixer-uitbetaling 2',
  EX: 'Exchange-account (cash-out)',
};
const KETEN_ORIGINS = [
  { addr: 'RW', amount: 6 },               // losgeld: 100% vuil
  { addr: 'CL', amount: 6, dirty: false }, // schone liquiditeit van de mixer: 0% vuil
];
const KETEN_TXS = [
  { inputs: ['RW'], outputs: [{ addr: 'HOP_A', amount: 4 }, { addr: 'HOP_B', amount: 2 }], time: '10:00' },
  { inputs: ['HOP_A', 'HOP_B'], outputs: [{ addr: 'MIX_IN', amount: 6 }], time: '11:00' },
  { inputs: ['MIX_IN', 'CL'], outputs: [{ addr: 'OUT1', amount: 6 }, { addr: 'OUT2', amount: 6 }], time: '12:00' },
  { inputs: ['OUT1'], outputs: [{ addr: 'EX', amount: 6 }], time: '13:00' },
];

// --- Flow: dezelfde operatie op hoog niveau, mét kosten ---
const FLOW_NODES = [
  { id: 'v', type: 'victim', label: 'Zuidwaard Zorggroep (slachtoffer)' },
  { id: 'rw', type: 'wallet', label: 'Losgeld-wallet (aanvaller)' },
  { id: 'h1', type: 'wallet', label: 'Hop-wallet A' },
  { id: 'h2', type: 'wallet', label: 'Hop-wallet B' },
  { id: 'mix', type: 'mixer', label: "Mixer 'CoinMenger'" },
  { id: 'ex', type: 'exchange', label: "Exchange 'EuroMunt' (cash-out)" },
];
const FLOW_EDGES = [
  { from: 'v', to: 'rw', amount: 6.0, time: '09:40', note: 'losgeldbetaling na ransomware (placement)' },
  { from: 'rw', to: 'h1', amount: 4.0, time: '10:00', note: 'splitsing 1 (layering)' },
  { from: 'rw', to: 'h2', amount: 2.0, time: '10:02', note: 'splitsing 2 (layering)' },
  { from: 'h1', to: 'mix', amount: 3.95, time: '10:40', note: 'hop-wallet houdt 0.05 commissie' },
  { from: 'h2', to: 'mix', amount: 1.95, time: '10:45', note: 'hop-wallet houdt 0.05 commissie' },
  { from: 'mix', to: 'ex', amount: 5.80, time: '12:30', note: 'mixer houdt 0.10; uitbetaling op exchange-account (cash-out)' },
];

// --- Pivot: twee zaken verbonden door één hergebruikt certificaat (INTEL-REF) ---
const CMX_ENTITIES = [
  { id: 'dA', type: 'domain', label: 'betaal-controle.nm.lab' },
  { id: 'ipA', type: 'ip', label: '203.0.113.10' },
  { id: 'dB', type: 'domain', label: 'inlog-verificatie.nm.lab' },
  { id: 'ipB', type: 'ip', label: '198.51.100.20' },
  { id: 'cert', type: 'cert', label: 'A1B2C3D4' },
  { id: 'wal', type: 'wallet', label: 'bc1qfictief0alpha' },
  { id: 'mail', type: 'email', label: 'beheer@betaal-controle.nm.lab' },
];
const CMX_EDGES = [
  { from: 'dA', to: 'ipA', rel: 'resolvet naar', time: '2026-01', source: 'passive DNS' },
  { from: 'dA', to: 'cert', rel: 'staat in cert (SAN)', time: '2026-01', source: 'crt.sh' },
  { from: 'dA', to: 'mail', rel: 'WHOIS-contact', time: '2026-01', source: 'WHOIS' },
  { from: 'dA', to: 'wal', rel: 'losgeld-adres', time: '2026-01', source: 'rapport' },
  { from: 'dB', to: 'ipB', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
  { from: 'dB', to: 'cert', rel: 'staat in cert (SAN)', time: '2026-02', source: 'crt.sh' },
];

CS.registerRoom({
  id: 'cryptomixer-onderzoek',
  path: 'puzzels',
  order: 8,
  title: 'Casus: het cryptomixer-onderzoek',
  icon: '⛓️',
  difficulty: 'Moeilijk',
  minutes: 75,
  summary: 'Eén samenhangende, fictieve casus: zorggroep Zuidwaard betaalt losgeld, de aanvaller wast het via een CoinJoin-mixer en betaalt uit bij een exchange. Jij traceert de taint met de haircut-methode, ziet waarom een mixer het vuil verdunt maar niet wist, koppelt de zaak via certificate transparency aan een tweede zaak, weegt de attributie met ACH en levert een BLUF-product.',
  objectives: [
    'Taint en de haircut-methode uitleggen en narekenen op een transactieketen',
    'Uitleggen hoe een mixer/CoinJoin de taint verdunt maar niet wist, en hoe de common-input-heuristiek bij een mixer juist een vals cluster oplevert',
    'De vuile fractie tot aan een exchange volgen en de cash-out als knelpunt aanwijzen',
    'Twee zaken aan elkaar koppelen via een hergebruikt TLS-certificaat (certificate transparency)',
    'Attributie afwegen met ACH en de unieke hypothese met de minste inconsistenties kiezen',
    'Een BLUF-intelligenceproduct schrijven met conclusie eerst en een eigenaar per advies',
  ],
  terms: [
    { term: 'Taint', def: 'De mate waarin het geld op een adres oorspronkelijk uit een vuile (criminele) bron komt, uitgedrukt als bedrag en als percentage van het saldo.' },
    { term: 'Haircut-methode', def: 'Manier om taint te verdelen: bij elke transactie krijgt elke output dezelfde vuile fractie als het gemiddelde van de inputs (vuil / totaal in).' },
    { term: 'Mixer/tumbler', def: 'Dienst die crypto van veel gebruikers vermengt en door elkaar uitbetaalt om de directe link tussen in- en uitgang te verbergen.' },
    { term: 'CoinJoin', def: 'Een mixvorm zonder centrale dienst: meerdere partijen tekenen samen één grote transactie, zodat niet duidelijk is welke input bij welke output hoort.' },
    { term: 'Taint-verdunning', def: 'Het effect dat schone liquiditeit bijmengen het vuile percentage verlaagt (6 vuil + 6 schoon = 50%) zonder het vuile bedrag te laten verdwijnen.' },
    { term: 'Common-input-heuristiek', def: 'Vuistregel: adressen die samen als input in één transactie zitten, horen waarschijnlijk bij dezelfde eigenaar — behalve bij CoinJoin, waar vreemden bewust samen tekenen.' },
    { term: 'Clustering', def: 'Het samentrekken van losse adressen tot één entiteit/eigenaar op basis van heuristieken zoals common-input.' },
    { term: 'Exchange (cash-out-knelpunt)', def: 'De cryptobeurs waar crypto naar euro\'s gaat; door KYC/Wwft hangt daar een echte identiteit aan het spoor, dus daar grijpt de opsporing aan.' },
    { term: 'Certificate transparency', def: 'Openbare logs van uitgegeven TLS-certificaten (bijv. via crt.sh), waarmee je een hergebruikt certificaat over meerdere domeinen terugvindt.' },
    { term: 'Zeldzaamheidstoets', def: 'De vraag of een gedeeld kenmerk zeldzaam genoeg is om een echte link te zijn: een hergebruikt certificaat zegt meer dan een gedeelde hostingprovider.' },
    { term: 'ACH', def: 'Analysis of Competing Hypotheses: je legt hypothesen naast elkaar en weerlegt ze; de hypothese met de minste inconsistenties blijft het sterkst overeind.' },
    { term: 'BLUF', def: 'Bottom Line Up Front: de conclusie en het advies staan bovenaan, de onderbouwing eronder.' },
  ],
  resources: [
    { title: 'Chainalysis — blockchain-analyse en crypto-onderzoek', url: 'https://www.chainalysis.com/' },
    { title: 'Elliptic — crypto-forensics en risicobronnen', url: 'https://www.elliptic.co/' },
    { title: 'Bitcoin-wiki — CoinJoin (mixen zonder centrale dienst)', url: 'https://en.bitcoin.it/wiki/CoinJoin' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De casus en de taint',
      content: `
        <p>Welkom bij een echte rechercheklus in zakformaat. Zorggroep <strong>Zuidwaard</strong> (fictief) werd getroffen
        door ransomware en betaalde onder druk <strong>6,0 BTC</strong> losgeld. Het geld verdween razendsnel door een
        reeks wallets en een <strong>mixer</strong>, en dook later op bij een <strong>exchange</strong>. Jouw opdracht:
        volg het geld, bewijs hoeveel ervan "vuil" is als het de beurs bereikt, koppel de zaak aan een tweede dossier en
        lever een kort, bruikbaar product.</p>

        <div class="callout warn"><strong>Alles fictief:</strong> Zuidwaard, de wallets, de mixer "CoinMenger" en de
        exchange "EuroMunt" zijn verzonnen. De IP-adressen zijn documentatie-adressen en de domeinen eindigen op
        <code>.nm.lab</code>. Je volgt geen echte mensen; je oefent de methode.</div>

        <h3>Wat is "taint"?</h3>
        <p>Op de blockchain is elke munt gelijk, maar voor een onderzoeker niet. <strong>Taint</strong> (letterlijk:
        "besmetting") is de mate waarin het geld op een adres oorspronkelijk uit een <em>vuile</em> bron komt — hier: de
        losgeld-wallet. Taint druk je uit als een <strong>bedrag</strong> (bijvoorbeeld 3 BTC vuil) én als een
        <strong>percentage</strong> van het saldo (bijvoorbeeld 50%).</p>

        <h3>De haircut-methode</h3>
        <p>Hoe verdeel je taint als vuil en schoon geld in één transactie samenkomen? De meest gebruikte regel is de
        <strong>haircut-methode</strong>. Het idee is eerlijk delen: elke output van een transactie krijgt dezelfde vuile
        fractie als het <em>gemiddelde</em> van alle inputs samen.</p>

        <div class="callout info"><strong>De formule:</strong> vuile fractie van een transactie =
        <code>(vuil bedrag in de inputs) / (totaal bedrag in de inputs)</code>. Elke output erft die fractie. Komt er
        6 BTC vuil en 6 BTC schoon binnen (samen 12), dan is de fractie 6/12 = <strong>0,5</strong>, dus elke output is
        voor 50% vuil.</div>

        <h3>De analogie van de verfpot</h3>
        <p>Denk aan een liter rode verf (het vuile geld) die je uitgiet in een emmer met een liter witte verf (schone
        liquiditeit). Je krijgt twee liter <strong>roze</strong> verf. Het rood is niet verdwenen — het zit nog steeds in
        de emmer, alleen verdund. Giet je de helft van die roze verf in een nieuwe pot, dan neemt die pot precies de helft
        van het rood mee. Zo werkt taint: <strong>verdunnen is niet wissen</strong>. Precies die eigenschap gaan we
        narekenen.</p>

        <div class="callout tip"><strong>Startschot:</strong> als bewijs dat je de zaak oppakt, krijg je de eerste
        aanwijzing cadeau. De rest verdien je onderweg.</div>
      `,
      questions: [
        { q: 'Wat is "taint" van een adres?', options: ['Het aantal transacties van een adres', 'De mate waarin het geld op dat adres oorspronkelijk uit een vuile bron komt', 'De fee die je betaalt', 'Het wachtwoord van de wallet'], answer: 1, explain: 'Taint is de besmetting: welk deel van het saldo uit de criminele bron stamt, als bedrag en als percentage.' },
        { q: 'Een transactie krijgt 6 BTC vuil en 6 BTC schoon binnen. Welke vuile fractie geeft de haircut-methode aan elke output?', answer: ['0.5', '0,5', '50%', '50', '0.50'], hint: 'Vuil gedeeld door totaal: 6 / (6+6).', explain: '6 / 12 = 0,5. Elke output erft 50% taint.' },
        { q: 'Waar staat de haircut-regel voor?', options: ['Elke output erft de gemiddelde vuile fractie van de inputs', 'De eerste output is 100% vuil, de rest schoon', 'Taint verdwijnt na één transactie', 'Alleen de grootste output is vuil'], answer: 0, explain: 'Haircut verdeelt de taint evenredig: elke output krijgt dezelfde fractie als het inputgemiddelde.' },
        { q: 'Volgens de verfpot-analogie: verdwijnt het vuile geld door het te verdunnen met schoon geld?', options: ['Nee, het wordt alleen verdund — het vuile bedrag blijft bestaan', 'Ja, het rood verdwijnt helemaal', 'Ja, maar alleen bij een mixer', 'Dat hangt af van de fee'], answer: 0, explain: 'Verdunnen verlaagt het percentage, maar het vuile bedrag blijft in het mengsel aanwezig.' },
      ],
    },

    {
      title: 'Taak 2 — Mixers, CoinJoin en het valse cluster',
      content: `
        <p>De aanvaller stuurde het losgeld niet rechtstreeks naar de beurs. Dat zou te makkelijk te volgen zijn. In
        plaats daarvan ging het door een <strong>mixer</strong>. Je moet begrijpen wat zo'n mixer doet met taint én met
        de heuristieken van de analist, want juist daar zit de truc van deze casus.</p>

        <h3>Mixer en CoinJoin</h3>
        <p>Een <strong>mixer</strong> (of tumbler) gooit de crypto van veel gebruikers op één hoop en betaalt door elkaar
        weer uit. Een variant zonder centrale dienst is <strong>CoinJoin</strong>: meerdere partijen tekenen
        <em>samen</em> één grote transactie. Je stopt er vuil geld in samen met de <strong>schone liquiditeit</strong> van
        andere gebruikers, en je krijgt outputs terug die op papier niet meer één-op-één aan je inleg hangen.</p>

        <h3>Verdunnen is niet wissen</h3>
        <p>De haircut-methode laat zien waarom een mixer geen wondermiddel is. Meng 6 BTC vuil met 6 BTC schone
        liquiditeit, dan zakt het vuile <em>percentage</em> naar 50%. Maar het vuile <em>bedrag</em> — 6 BTC, verdeeld over
        de outputs — is er nog steeds. Een analist die de haircut narekent, ziet dus nog altijd precies hoeveel vuil geld
        er bij de uiteindelijke exchange aankomt. De mixer koopt verwarring, geen onzichtbaarheid.</p>

        <figure class="diagram">
          <svg viewBox="0 0 560 150" role="img" aria-label="Vuil en schoon geld mengen in een mixer">
            <rect x="8" y="20" width="150" height="34" rx="6" stroke="var(--bad)" fill="none" />
            <text x="83" y="42" fill="currentColor" font-size="13" text-anchor="middle">6 BTC vuil</text>
            <rect x="8" y="96" width="150" height="34" rx="6" stroke="var(--good)" fill="none" />
            <text x="83" y="118" fill="currentColor" font-size="13" text-anchor="middle">6 BTC schoon</text>
            <rect x="220" y="58" width="120" height="34" rx="6" stroke="var(--accent)" fill="none" />
            <text x="280" y="80" fill="currentColor" font-size="13" text-anchor="middle">mixer (50%)</text>
            <rect x="402" y="58" width="150" height="34" rx="6" stroke="currentColor" fill="none" />
            <text x="477" y="80" fill="currentColor" font-size="13" text-anchor="middle">uit: elk 50% vuil</text>
            <line x1="158" y1="37" x2="220" y2="68" stroke="currentColor" />
            <line x1="158" y1="113" x2="220" y2="82" stroke="currentColor" />
            <line x1="340" y1="75" x2="402" y2="75" stroke="currentColor" />
          </svg>
          <figcaption>Schoon bijmengen verlaagt het percentage, maar de 6 BTC vuil blijft in het mengsel.</figcaption>
        </figure>

        <h3>De common-input-heuristiek — en haar valkuil</h3>
        <p>Analisten koppelen adressen aan één eigenaar met de <strong>common-input-heuristiek</strong>: adressen die
        <em>samen</em> als input in één transactie zitten, horen waarschijnlijk bij dezelfde persoon (want die moest ze
        allemaal ondertekenen). Dat werkt prima bij gewone transacties. Maar bij een <strong>CoinJoin tekenen vreemden
        juist bewust samen</strong>. De heuristiek trekt dan ten onrechte de mixer-deposit van de aanvaller en de schone
        liquiditeit van een onschuldige gebruiker in <em>één</em> cluster. Dat is een <strong>vals cluster</strong>: een
        klassieke valkuil die je moet herkennen, anders beschuldig je de verkeerde.</p>

        <div class="callout info"><strong>Beloning — tussenvlag:</strong> je snapt nu dat een mixer het vuil verdunt maar
        niet wist. Noteer <code>NM{taint_verdunt_maar_wist_niet}</code>.</div>
      `,
      questions: [
        { q: 'Wat gebeurt er met het vuile BEDRAG als je 6 BTC vuil met 6 BTC schoon mengt?', options: ['Het blijft 6 BTC vuil, alleen het percentage zakt naar 50%', 'Het verdwijnt helemaal', 'Het verdubbelt naar 12 BTC vuil', 'Het wordt 0 BTC'], answer: 0, explain: 'Het percentage zakt (50%), maar het vuile bedrag van 6 BTC blijft in de outputs aanwezig.' },
        { q: 'Waarom levert de common-input-heuristiek bij een CoinJoin een vals cluster op?', options: ['Omdat vreemden daar bewust samen één transactie tekenen, terwijl de heuristiek aanneemt dat co-inputs één eigenaar hebben', 'Omdat CoinJoin de blockchain wist', 'Omdat mixers geen inputs hebben', 'Omdat de fee te hoog is'], answer: 0, explain: 'CoinJoin breekt de aanname "co-inputs = één eigenaar"; de deposit en de schone liquiditeit worden dan onterecht samengeklonterd.' },
        { q: 'Hoe heet een mixvorm zonder centrale dienst waarbij meerdere partijen samen één transactie tekenen?', answer: ['CoinJoin', 'coinjoin', 'coin join'], hint: 'Munten "samenvoegen" in één transactie.', explain: 'CoinJoin: meerdere partijen ondertekenen samen één transactie, zodat in- en outputs niet meer één-op-één koppelen.' },
        { q: 'Welke vlag staat als beloning in de info-callout van deze taak?', answer: ['NM{taint_verdunt_maar_wist_niet}'], hint: 'Lees de info-callout onderaan de uitleg.', explain: 'De tussenvlag is NM{taint_verdunt_maar_wist_niet}.' },
      ],
    },

    {
      title: 'Taak 3 — Tracer de keten: taint narekenen',
      content: `
        <p>Tijd om de tracer open te trekken. Hieronder staat de <strong>on-chain keten</strong> van de zaak-Zuidwaard in
        een vereenvoudigd UTXO-model: elke input besteedt zijn volledige saldo, en voor de helderheid laten we hier even de
        kosten (fees) weg — die komen in de volgende taak terug. De tracer rekent voor jou de <strong>taint</strong>
        (haircut) en de <strong>clusters</strong> (common-input) uit. Jouw taak is om die getallen te lezen, te snappen en
        na te rekenen.</p>

        <h3>De keten in woorden</h3>
        <ul>
          <li>De <strong>losgeld-wallet</strong> (6 BTC, 100% vuil) splitst het geld over <strong>hop-wallet A</strong>
          (4) en <strong>hop-wallet B</strong> (2) — layering.</li>
          <li>A en B worden <strong>samen</strong> uitgegeven naar de <strong>mixer-deposit</strong> (6). Let op: dit is
          een echt common-input-cluster — A en B horen bij dezelfde eigenaar (de aanvaller).</li>
          <li>In de mixer komt de deposit (6, vuil) samen met <strong>6 BTC schone liquiditeit</strong> (dirty:false) in
          één CoinJoin-transactie, die uitbetaalt naar <strong>uitbetaling 1</strong> (6) en <strong>uitbetaling 2</strong>
          (6). Hier verdunt de taint naar 50%.</li>
          <li><strong>Uitbetaling 1</strong> gaat door naar het <strong>exchange-account</strong> (6) — de cash-out.</li>
        </ul>

        <h3>Wat je in het lab moet aflezen</h3>
        <p>Open het adres-overzicht en de callout onderaan. Reken mee met de haircut:</p>
        <ul>
          <li>De mixtransactie heeft 6 vuil + 6 schoon = 12 binnen, fractie <strong>0,5</strong>. Beide uitbetalingen van
          6 BTC zijn dus <strong>50%</strong> vuil (3 BTC taint elk).</li>
          <li>Uitbetaling 1 (6 BTC, 3 vuil) gaat één-op-één naar de exchange. Dus de exchange ontvangt een saldo van 6 BTC
          waarvan <strong>3 BTC vuil</strong> is — en dat is precies wat de tracer onderaan meldt.</li>
          <li>Kijk ook naar het aantal <strong>clusters</strong> dat de tracer vindt: één is echt (de hop-wallets van de
          aanvaller), één is het <em>valse</em> cluster uit de CoinJoin (deposit samen met schone liquiditeit).</li>
        </ul>

        <div class="callout tip"><strong>Beloning:</strong> reken je de haircut goed na, dan verdien je de vlag
        <code>NM{haircut_wijst_de_weg}</code> — want de haircut wijst, ondanks de mixer, nog altijd de weg naar het vuile
        geld bij de cash-out.</div>

        <div class="callout warn"><strong>Let op het valse cluster:</strong> de tracer meldt een cluster met de schone
        liquiditeit erin. Dat is de CoinJoin-valkuil uit taak 2 — niet de onschuldige gebruiker beschuldigen, wél de
        taint-fractie volgen.</div>
      `,
      lab: {
        type: 'chaintrace',
        title: 'Zaak-Zuidwaard — de witwasketen',
        unit: 'BTC',
        scenario: 'De losgeld-wallet (6 BTC vuil) wast via twee hop-wallets en een CoinJoin-mixer (met 6 BTC schone liquiditeit) uit bij een exchange. Reken de taint (haircut) na en let op het valse cluster bij de mixer.',
        labels: KETEN_LABELS,
        exchanges: ['EX'],
        origins: KETEN_ORIGINS,
        txs: KETEN_TXS,
        ask: [
          { q: 'Hoeveel vuil geld (taint) bereikt de exchange? (lees de callout onderaan)', answer: ['3', '3.0', '3,0', '3 btc', '3.0 btc'], hint: 'Uitbetaling 1 is 50% van 6 BTC vuil en gaat één-op-één naar de exchange.' },
          { q: 'Wat is het taint-percentage op het exchange-account? (lees de taint-tabel)', answer: ['50%', '50', '50 %', '50.0%'], hint: '6 vuil + 6 schoon = 12 in de mix, fractie 6/12.' },
          { q: 'Hoeveel clusters (common-input-heuristiek) vindt de tracer in totaal?', answer: ['2', 'twee'], hint: 'Klik de clusters-sectie open: één echt cluster (de hop-wallets) en één vals cluster (de CoinJoin).' },
        ],
      },
      questions: [
        { q: 'Hoeveel BTC vuil geld bereikt de exchange volgens de tracer?', answer: ['3', '3.0', '3,0', '3 btc'], hint: 'Staat in de callout "Vuil geld dat een exchange bereikt".', explain: 'Uitbetaling 1 (6 BTC, 50% vuil = 3 BTC) gaat naar de exchange: 3 BTC taint bij de cash-out.' },
        { q: 'Wat is de taint op het exchange-account in procenten?', answer: ['50%', '50', '50 %'], hint: 'Lees de kolom Taint in het adres-overzicht.', explain: 'De mix verdunde 6 vuil + 6 schoon tot 50%, en die fractie reist mee naar de exchange.' },
        { q: 'De tracer meldt een cluster waarin de schone mixer-liquiditeit zit. Wat is dat?', options: ['Een vals cluster door de CoinJoin (de common-input-heuristiek faalt hier)', 'Bewijs dat de liquiditeit-eigenaar de dader is', 'Een rekenfout van de tracer', 'Het echte cluster van de aanvaller'], answer: 0, explain: 'CoinJoin laat vreemden samen tekenen; de heuristiek klontert dan onterecht de deposit en de schone liquiditeit samen.' },
        { q: 'Welke vlag hoort bij het goed narekenen van de haircut?', answer: ['NM{haircut_wijst_de_weg}'], hint: 'Staat in de tip-callout van deze taak.', explain: 'De vlag is NM{haircut_wijst_de_weg}: de haircut wijst ondanks de mixer de weg naar het vuile geld.' },
      ],
    },

    {
      title: 'Taak 4 — De geldstroom op hoog niveau',
      content: `
        <p>De tracer uit taak 3 liet de kosten even weg om de taint zuiver te houden. In het echte dossier hield elke
        schakel natuurlijk een <strong>commissie</strong> in. In deze taak bekijk je dezelfde operatie op hoog niveau,
        <em>mét</em> fees, en reken je de bedragen na. Dit is de klassieke "follow the money"-blik: tel per knoop op wat
        erin komt en wat eruit gaat; het verschil is wat die knoop voor zichzelf hield.</p>

        <h3>Zo lees je het lab</h3>
        <ul>
          <li><strong>Klik een knoop</strong> (bijvoorbeeld de mixer) om in- en uitgaand verkeer en het saldo te zien.</li>
          <li><strong>Lees de transactietabel</strong>: elke regel is één overboeking met bedrag, tijd en notitie.</li>
          <li><strong>Reken na.</strong> De mixer ontvangt van hop-wallet A én hop-wallet B — tel beide stromen op. Het
          verschil tussen wat de mixer binnenkrijgt en weer uitbetaalt, is de mixer-fee.</li>
        </ul>

        <p>Volg zo het geld van de losgeldbetaling (6,0 BTC) tot het <strong>cash-out-punt</strong>: de exchange
        "EuroMunt". Dáár, waar crypto naar euro's gaat en KYC/Wwft geldt, hangt opeens een echte identiteit aan het
        spoor — het knelpunt waar de opsporing aangrijpt.</p>

        <div class="callout info"><strong>Tip bij het rekenen:</strong> hop-wallet A krijgt 4,0 en stuurt 3,95 door
        (0,05 commissie), hop-wallet B krijgt 2,0 en stuurt 1,95 door. De mixer ontvangt dus 3,95 + 1,95 en houdt daarna
        zelf nog 0,10 in.</div>
      `,
      lab: {
        type: 'flow',
        title: 'Zaak-Zuidwaard — follow the money (met kosten)',
        unit: 'BTC',
        scenario: 'Zuidwaard betaalde 6.0 BTC losgeld. Volg de stroom door de hop-wallets en de mixer tot de exchange. Reken de bedragen per knoop na; let op de commissies.',
        nodes: FLOW_NODES,
        edges: FLOW_EDGES,
        ask: [
          { q: 'Hoeveel BTC betaalde Zuidwaard Zorggroep als losgeld?', answer: ['6', '6.0', '6,0', '6 btc', '6.0 btc'], hint: 'De eerste regel: van het slachtoffer naar de losgeld-wallet.' },
          { q: 'Hoeveel BTC komt er in totaal binnen bij de mixer "CoinMenger"? (tel beide stromen op)', answer: ['5.9', '5,9', '5.90', '5.9 btc', '5.90 btc'], hint: 'Hop-wallet A brengt 3.95, hop-wallet B brengt 1.95. Klik de mixer-knoop voor het totaal.' },
          { q: 'Hoeveel BTC bereikt uiteindelijk de exchange "EuroMunt" (de cash-out)?', answer: ['5.8', '5,8', '5.80', '5.8 btc', '5.80 btc'], hint: 'De laatste transactie: de mixer houdt 0.10 in en betaalt de rest uit.' },
          { q: 'Welke knoop is het cash-out-knelpunt waar de opsporing aangrijpt (KYC/Wwft)?', answer: ['exchange', 'de exchange', 'euromunt', 'exchange euromunt', 'de exchange euromunt'], hint: 'De plek waar crypto naar euro\'s gaat en identiteitscontrole plaatsvindt.' },
        ],
      },
      questions: [
        { q: 'Hoeveel BTC komt er in totaal binnen bij de mixer "CoinMenger"?', answer: ['5.9', '5,9', '5.90', '5.9 btc'], hint: '3.95 (van hop A) + 1.95 (van hop B).', explain: '3.95 + 1.95 = 5.9 BTC komt de mixer binnen.' },
        { q: 'Hoeveel BTC bereikt de exchange "EuroMunt"?', answer: ['5.8', '5,8', '5.80', '5.8 btc'], hint: 'De mixer kreeg 5.9 binnen en hield 0.10 in.', explain: 'De mixer betaalt 5.9 − 0.10 = 5.8 BTC uit op het exchange-account.' },
        { q: 'Hoeveel commissie hield hop-wallet A voor zichzelf achter?', answer: ['0.05', '0,05'], hint: 'Binnen 4.0, doorgestuurd 3.95.', explain: '4.0 − 3.95 = 0.05 BTC bleef als commissie hangen (het saldo van die knoop).' },
        { q: 'Waarom is de exchange het knelpunt waar de opsporing aangrijpt?', options: ['Omdat crypto daar naar euro\'s gaat én KYC/Wwft geldt, zodat de pseudonieme keten aan een echte identiteit wordt gekoppeld', 'Omdat de exchange de blockchain kan wissen', 'Omdat mixers daar verboden zijn', 'Omdat de fee daar het hoogst is'], answer: 0, explain: 'De off-ramp koppelt het openbare spoor aan een KYC-identiteit; met een vordering krijgt de politie de naam.' },
      ],
    },

    {
      title: 'Taak 5 — Pivoten: koppel de zaak via het certificaat',
      content: `
        <p>De losgeld-wallet en de phishinginfrastructuur waarmee Zuidwaard werd binnengedrongen, laten sporen na. Met
        <strong>pivoten</strong> spring je van het ene kenmerk naar het andere — domein &rarr; IP &rarr; certificaat
        &rarr; e-mail &rarr; wallet — om verborgen verbanden tussen zaken te vinden. Je doet dit <strong>passief</strong>:
        open bronnen (WHOIS, passive DNS, certificate transparency via crt.sh), nooit de infrastructuur van de verdachte
        zelf benaderen (opsec).</p>

        <h3>Twee zaken, één dwarsverband</h3>
        <p>In het lab staan twee fictieve phishingzaken. <strong>Zaak Alpha</strong> (<code>betaal-controle.nm.lab</code>)
        is de infrastructuur rond de aanval op Zuidwaard; daar hangt ook de losgeld-wallet <code>bc1qfictief0alpha</code>
        aan vast. <strong>Zaak Bravo</strong> (<code>inlog-verificatie.nm.lab</code>) is een losse phishingzaak van een
        ander team. De IP-adressen verschillen (<code>203.0.113.10</code> vs. <code>198.51.100.20</code>), dus op het
        eerste gezicht lijken ze niet verbonden.</p>

        <h3>De zeldzaamheidstoets</h3>
        <p>Pivoteer door de entiteiten aan te klikken en let op <strong>tijd</strong> en <strong>herkomst</strong> bij elke
        relatie. Je vindt één kenmerk dat in beide zaken terugkomt: hetzelfde <strong>TLS-certificaat</strong>
        (<code>A1B2C3D4</code>), gevonden in de certificate-transparency-logs van crt.sh. Een hergebruikt certificaat is
        <strong>zeldzaam</strong> genoeg om een echte link te zijn: dezelfde fingerprint op twee los lijkende domeinen
        wijst sterk op dezelfde hand. Dat is de kern van de zeldzaamheidstoets — <em>hoe zeldzamer het gedeelde kenmerk,
        hoe sterker de link</em>. Een gedeelde hostingprovider zou veel te algemeen zijn.</p>

        <div class="callout tip"><strong>Beloning:</strong> herken je dat het certificaat de twee zaken bruggt, dan
        verdien je de vlag <code>NM{cert_bruggt_de_zaken}</code>.</div>

        <div class="callout warn"><strong>Blijf kritisch (bekend/afgeleid/aanname):</strong> "beide domeinen presenteren
        certificaat A1B2C3D4" is <em>bekend</em>. "Dezelfde actor beheert beide" is <em>afgeleid</em>. "Het is dezelfde
        persoon als in een zaak van vorig jaar" zou een <em>aanname</em> zijn tot je meer zeldzame overlap vindt.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'Zaak Alpha (Zuidwaard-phishing) vs. Zaak Bravo',
        scenario: 'Zaak Alpha hoort bij de aanval op Zuidwaard (met de losgeld-wallet). Zaak Bravo is een losse phishingzaak. Wat verbindt ze? Toets de zeldzaamheid van elk gedeeld kenmerk.',
        entities: CMX_ENTITIES,
        edges: CMX_EDGES,
        goal: 'Welk kenmerk verbindt Zaak Alpha en Zaak Bravo? (typ het label of het type)',
        bridge: ['A1B2C3D4', 'cert', 'certificaat'],
      },
      questions: [
        { q: 'Welk zeldzaam kenmerk verbindt Zaak Alpha en Zaak Bravo?', answer: ['certificaat', 'cert', 'A1B2C3D4', 'a1b2c3d4', 'het certificaat', 'tls-certificaat'], hint: 'Hetzelfde kenmerk staat in crt.sh bij beide domeinen; de IP-adressen verschillen juist.', explain: 'Beide domeinen presenteren hetzelfde TLS-certificaat A1B2C3D4 (bekend). Een hergebruikt certificaat is zeldzaam, dus een sterke brug.' },
        { q: 'Via welke openbare bron vind je een hergebruikt TLS-certificaat terug?', options: ['Certificate transparency (crt.sh)', 'De blockchain', 'Het telefoonboek', 'De firewall-logs van het slachtoffer'], answer: 0, explain: 'Certificate transparency-logs (zoals crt.sh) bevatten alle uitgegeven certificaten; zo vind je hergebruik over domeinen.' },
        { q: 'Waarom is een hergebruikt certificaat een sterkere brug dan een gedeelde hostingprovider?', options: ['Omdat een gedeeld certificaat zeldzaam is en een gedeelde hoster veel te algemeen', 'Omdat certificaten nooit worden hergebruikt', 'Omdat hosting niets met domeinen te maken heeft', 'Dat is het niet — de hoster is sterker'], answer: 0, explain: 'De zeldzaamheidstoets: hoe zeldzamer het gedeelde kenmerk, hoe sterker het bewijs.' },
        { q: 'Welke vlag verdien je door de zaken via het certificaat te koppelen?', answer: ['NM{cert_bruggt_de_zaken}'], hint: 'Staat in de tip-callout van deze taak.', explain: 'De vlag is NM{cert_bruggt_de_zaken}.' },
      ],
    },

    {
      title: 'Taak 6 — Attributie met ACH',
      content: `
        <p>Je weet nu <em>hoe</em> het geld liep en dat twee zaken samenhangen. De lastigste vraag komt nu: <strong>wie
        beheert de cash-out-infrastructuur</strong> die het losgeld via de mixer naar de exchange bracht? Attributie is
        gevaarlijk terrein. Je gebruikt <strong>Analysis of Competing Hypotheses (ACH)</strong>: je zet de hypothesen
        naast elkaar en je <em>weerlegt</em> ze. De hypothese met de <strong>minste inconsistenties (I)</strong> blijft het
        sterkst overeind — je zoekt tegenspraak, geen bevestiging.</p>

        <h3>Drie hypothesen</h3>
        <p>In het lab staan drie hypothesen: een <strong>professionele witwasdienst</strong> (cash-out-as-a-service die
        voor meerdere bendes wast), de <strong>ransomware-affiliate zelf</strong>, en een <strong>niet-betrokken
        exchange-klant</strong> (toeval / vals spoor). Vul de matrix in met C (consistent), I (inconsistent) of N
        (neutraal), tel de inconsistenties en vergelijk daarna met het expertoordeel.</p>

        <h3>Let op het niet-diagnostische bewijs</h3>
        <p>Eén waarneming — "de mixer mengt schone liquiditeit bij, de taint zakt naar 50%" — is bij <em>alle drie</em> de
        hypothesen consistent. Die helpt je dus niet kiezen; het is <strong>niet-diagnostisch</strong>. Het lab markeert
        zulke rijen. Richt je op het bewijs dat de hypothesen juist uit elkaar trekt: het terugkerende cash-out-cluster
        over drie zaken, de vaste 10%-commissie, de forumadvertentie en de batching wijzen samen één kant op.</p>

        <p>Reken mee: in het expertoordeel houdt de <strong>professionele witwasdienst</strong> als enige <strong>0</strong>
        inconsistenties over; de affiliate en de exchange-klant houden er elk 3 over. Er is dus één <em>unieke</em>
        duidelijke winnaar. Dat de witwasdienst het sterkst staat, is <em>afgeleid</em>; een specifieke naam of groep
        aanwijzen puur omdat ze dezelfde mixer gebruiken, zou een <em>aanname</em> (en de tool=actor-valkuil) zijn.</p>

        <div class="callout danger"><strong>Verantwoord attribueren:</strong> schrijf nooit "het is persoon X" als je dat
        niet kunt onderbouwen. Schrijf: "de waarnemingen passen het best bij een professionele cash-out-dienst (afgeleid);
        een specifieke beheerder kunnen we op dit moment niet met zekerheid aanwijzen (aanname)."</div>
      `,
      lab: {
        type: 'ach',
        question: 'Wie beheert de cash-out-infrastructuur die het losgeld van Zuidwaard via de mixer naar de exchange bracht?',
        hypotheses: ['Professionele witwasdienst (cash-out-as-a-service voor meerdere bendes)', 'De ransomware-affiliate zelf (wast eigen buit)', 'Een niet-betrokken exchange-klant (toeval / vals spoor)'],
        evidence: [
          { text: 'Hetzelfde mixer-uitbetaalcluster komt terug in drie losstaande ransomwarezaken van verschillende groepen.', expert: ['C', 'I', 'I'] },
          { text: 'Het cash-out-cluster houdt telkens een vaste commissie van circa 10% in en betaalt de rest door naar de opdrachtgever.', expert: ['C', 'I', 'N'] },
          { text: 'De mixer mengt aantoonbaar schone liquiditeit van niet-criminele herkomst bij; de taint zakt naar 50%.', expert: ['C', 'C', 'C'] },
          { text: 'Op een crimineel forum wordt een "cash-out service" geadverteerd met exact dit commissietarief en deze werkwijze.', expert: ['C', 'I', 'I'] },
          { text: 'De uitbetalingen gebeuren in vaste blokken op gezette tijden, los van wanneer het losgeld binnenkwam (batching van meerdere klanten).', expert: ['C', 'N', 'N'] },
          { text: 'Het exchange-account staat op naam van een katvanger zonder enige relatie tot Zuidwaard.', expert: ['C', 'C', 'I'] },
        ],
      },
      questions: [
        { q: 'Welke hypothese houdt in het expertoordeel als enige de minste inconsistenties over?', options: ['Professionele witwasdienst (cash-out-as-a-service)', 'De ransomware-affiliate zelf', 'Een niet-betrokken exchange-klant', 'Ze eindigen gelijk'], answer: 0, explain: 'De witwasdienst houdt 0 inconsistenties over, de andere twee elk 3. De witwasdienst is de unieke winnaar.' },
        { q: 'De waarneming "de mixer mengt schone liquiditeit bij" is consistent met alle drie de hypothesen. Hoe heet zulk bewijs?', options: ['Niet-diagnostisch', 'Doorslaggevend', 'Een vals spoor', 'Een aanname'], answer: 0, explain: 'Bewijs dat overal past, helpt je niet kiezen: het is niet-diagnostisch. Het lab markeert die rij.' },
        { q: 'Welke letter tel je in ACH om de zwakste hypothesen weg te strepen?', answer: ['I', 'i', 'inconsistent', 'inconsistenties'], hint: 'Je weerlegt, je bevestigt niet.', explain: 'Je telt de inconsistenties (I); de hypothese met de minste I\'s blijft het sterkst overeind.' },
        { q: 'Mag je de operatie aan één specifieke persoon toeschrijven puur omdat dezelfde mixer is gebruikt?', options: ['Nee — gedeelde tooling is een aanwijzing, geen identiteitsbewijs (tool is niet gelijk aan actor)', 'Ja, de mixer bepaalt de dader', 'Ja, maar alleen bij een hoog losgeld', 'Alleen als de taint boven de 50% ligt'], answer: 0, explain: 'De tool=actor-valkuil: dezelfde dienst of mixer zegt iets over de werkwijze, niet over de identiteit.' },
      ],
    },

    {
      title: 'Taak 7 — Het BLUF-eindproduct',
      content: `
        <p>Je hebt alles: de taint-trace, de geldstroom met kosten, de certificaat-pivot en de attributie. Nu lever je het
        <strong>intelligenceproduct</strong>. De ontvanger (de rechercheleider, een officier van justitie, de CISO van
        Zuidwaard) heeft geen tijd voor een chronologisch verhaal. Daarom schrijf je <strong>BLUF</strong>: <em>Bottom
        Line Up Front</em> — de conclusie en het advies staan <strong>bovenaan</strong>, de onderbouwing eronder.</p>

        <h3>Wat een goed BLUF-product bevat</h3>
        <ul>
          <li>De <strong>kernboodschap eerst</strong>: wat is er gebeurd en wat moet er nu gebeuren.</li>
          <li><strong>Waarschijnlijkheidstaal</strong> ("waarschijnlijk", "zeer waarschijnlijk") in plaats van vage
          woorden.</li>
          <li>Een <strong>eigenaar per advies</strong>: wie doet wat, en wanneer.</li>
          <li><strong>Onzekerheid apart</strong> benoemd, met de labels bekend/afgeleid/aanname.</li>
          <li><strong>Beknopter</strong> dan de bron: schrappen is een vak.</li>
        </ul>

        <h3>De kern van deze zaak</h3>
        <p>Het sterkste, meest bruikbare inzicht is het <strong>knelpunt</strong>: ondanks de mixer bereikt
        <strong>3 BTC vuil</strong> (50% van 6 BTC) het exchange-account. Juist dáár — bij de cash-out met KYC/Wwft —
        krijgt de opsporing grip. Dat zet je bovenaan, met een concreet advies (een vordering aan de exchange) en een
        eigenaar.</p>

        <p>In het lab staat het chronologische bronmateriaal. Herschrijf het naar een BLUF-product: conclusie eerst,
        waarschijnlijkheidstaal, een eigenaar per advies en de onzekerheid apart. Toets daarna tegen de rubric (een
        heuristische checklist, geen AI-oordeel) en vergelijk met het modelantwoord.</p>

        <div class="callout tip"><strong>Slotvlag:</strong> rond je de zaak af met een echt BLUF-product dat de cash-out
        als aangrijpingspunt benoemt, dan verdien je de laatste vlag: <code>NM{cash_out_is_het_knelpunt}</code>.</div>

        <div class="callout danger"><strong>Nooit blind betalen, en denk aan privacy:</strong> losgeld betalen financiert
        de volgende aanval en geeft geen garantie. Deel indicatoren onder het juiste TLP-label en haal persoonsgegevens
        eruit voordat je ze deelt — de AVG geldt ook voor je responsteam. Blockchain-onderzoek voor opsporing gebeurt door
        Politie en FIOD onder juridische waarborgen (zoals een vordering aan de exchange).</div>
      `,
      lab: {
        type: 'bluf',
        source: 'Op 18 september betaalde zorggroep Zuidwaard 6,0 BTC losgeld na een ransomware-aanval. De losgeld-wallet splitste het geld over twee hop-wallets (4,0 en 2,0 BTC), die het samen naar een mixer-deposit stuurden. In de mixer werd de 6 BTC vuile deposit vermengd met circa 6 BTC schone liquiditeit in een CoinJoin-transactie; de taint zakte daardoor naar 50%. Eén mixer-uitbetaling van 6 BTC ging door naar een exchange-account bij EuroMunt; volgens de haircut-methode is daarvan 3 BTC vuil. In het hoge-niveau-overzicht (met commissies) bereikte uiteindelijk 5,8 BTC de exchange. Een hergebruikt TLS-certificaat (A1B2C3D4), gevonden in crt.sh, verbindt de phishinginfrastructuur van deze zaak met een tweede, losse phishingzaak. Uit de ACH blijkt dat de cash-out-infrastructuur het best past bij een professionele witwasdienst (cash-out-as-a-service): hetzelfde uitbetaalcluster, een vaste commissie van circa 10% en batching komen in meerdere zaken terug. Een specifieke beheerder is niet met zekerheid aan te wijzen, want dezelfde mixer wordt door veel partijen gebruikt.',
        model: 'BEOORDELING (BLUF): Het losgeld van Zuidwaard (6,0 BTC) is via twee hop-wallets en een CoinJoin-mixer witgewassen; ondanks de mixer bereikt zeer waarschijnlijk 3 BTC vuil geld (50% taint) een exchange-account bij EuroMunt. Dat exchange-account is het knelpunt: daar kunnen we met een vordering een echte identiteit aan het spoor koppelen.\n\nADVIES (met eigenaar):\n1. Vordering aan exchange EuroMunt op het ontvangende account (KYC-gegevens, uitbetaalrekening) — eigenaar: opsporing, met spoed.\n2. Losgeld-wallet en het cash-out-cluster blijvend monitoren; het certificaat A1B2C3D4 delen met het team van de tweede zaak — eigenaar: analyse/intel.\n3. Zuidwaard: niet betalen, offline back-ups verifiëren, MFA afdwingen — eigenaar: CISO.\n\nONDERBOUWING: bekend = de keten en de bedragen uit de tracer (6 BTC losgeld, 50% taint na de mix, 3 BTC vuil bij de exchange, 5,8 BTC na kosten). Afgeleid = een professionele cash-out-dienst (ACH: als enige 0 inconsistenties) en één actor achter beide phishingzaken (hergebruikt certificaat). Aanname te vermijden: een specifieke beheerder aanwijzen puur op basis van de gedeelde mixer (tool is niet gelijk aan actor).',
      },
      questions: [
        { q: 'Wat hoort in een BLUF-product bovenaan te staan?', options: ['De conclusie en het advies (de kernboodschap)', 'De volledige chronologie', 'De lijst met alle transactie-ID\'s', 'De namen van alle analisten'], answer: 0, explain: 'BLUF = Bottom Line Up Front: eerst de conclusie en wat er moet gebeuren, daarna de onderbouwing.' },
        { q: 'Wat is in deze zaak het belangrijkste aangrijpingspunt voor de opsporing?', options: ['Het exchange-account, waar via KYC/Wwft een identiteit aan het spoor hangt', 'De mixer, die je offline kunt halen', 'De hop-wallets', 'De losgeldbrief'], answer: 0, explain: 'De cash-out bij de exchange koppelt het pseudonieme spoor aan een echte naam; daar grijp je aan met een vordering.' },
        { q: 'Hoe schrijf je de attributie in het eindproduct verantwoord?', options: ['Waarschijnlijk een professionele cash-out-dienst (afgeleid); een specifieke beheerder niet aan te wijzen (aanname vermijden)', 'Het is zeker persoon X', 'De mixer bepaalt de dader', 'Attributie laat je weg'], answer: 0, explain: 'Je benoemt de best passende hypothese met waarschijnlijkheidstaal en vermijdt de tool=actor-valkuil.' },
        { q: 'Welke slotvlag hoort bij het afronden van het BLUF-eindproduct?', answer: ['NM{cash_out_is_het_knelpunt}'], hint: 'Staat in de tip-callout van deze taak.', explain: 'De slotvlag is NM{cash_out_is_het_knelpunt}.' },
      ],
    },
  ],
});
