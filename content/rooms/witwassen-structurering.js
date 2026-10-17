/* Room: Datastromen — witwassen & structurering (smurfing, Wwft, follow-the-money) */

// =======================================================================
//  Alles in deze room is FICTIEF: verzonnen personen, rekeningen en
//  bedragen. Je oefent de denkwijze van een financieel rechercheur.
// =======================================================================

// --- Structuring: stortingen rond de meldgrens (de kern) ---
const WS_TX = [
  { date: '2026-03-02', who: 'M. de Groot (katvanger)', amount: 9800, kind: 'contant', note: 'kantoor Amsterdam' },
  { date: '2026-03-02', who: 'K. Visser (katvanger)', amount: 9500, kind: 'contant', note: 'kantoor Utrecht' },
  { date: '2026-03-03', who: 'M. de Groot (katvanger)', amount: 9900, kind: 'contant', note: 'kantoor Den Haag' },
  { date: '2026-03-03', who: 'R. Bakker', amount: 250, kind: 'pin', note: 'boodschappen (normaal)' },
  { date: '2026-03-04', who: 'K. Visser (katvanger)', amount: 9700, kind: 'contant', note: 'kantoor Rotterdam' },
  { date: '2026-03-04', who: 'S. el Amrani', amount: 1200, kind: 'overboeking', note: 'salaris (normaal)' },
  { date: '2026-03-05', who: 'M. de Groot (katvanger)', amount: 9600, kind: 'contant', note: 'kantoor Eindhoven' },
  { date: '2026-03-05', who: 'K. Visser (katvanger)', amount: 12000, kind: 'overboeking', note: 'boven de grens — hier geldt juist de meldplicht' },
];

// --- Flow: de gestructureerde buit (€48.500) wordt gelaagd en uitbetaald ---
const WS_NODES = [
  { id: 'g', type: 'mule', label: 'M. de Groot (katvanger)' },
  { id: 'v', type: 'mule', label: 'K. Visser (katvanger)' },
  { id: 'verz', type: 'account', label: 'Verzamelrekening (katvanger)' },
  { id: 'wissel', type: 'exchange', label: 'Wisselkantoor Zuid' },
  { id: 'buiten', type: 'cashout', label: 'Buitenlandse rekening (cash-out)' },
];
const WS_EDGES = [
  { from: 'g', to: 'verz', amount: 29300, time: 'week 10', note: 'drie contante stortingen samengevoegd (9800+9900+9600)' },
  { from: 'v', to: 'verz', amount: 19200, time: 'week 10', note: 'twee contante stortingen (9500+9700)' },
  { from: 'verz', to: 'wissel', amount: 48000, time: 'week 11', note: 'katvanger houdt 500 achter (vergoeding)' },
  { from: 'wissel', to: 'buiten', amount: 47500, time: 'week 11', note: 'wisselkantoor houdt 500 commissie; uitbetaling buitenland (cash-out)' },
];

// --- ACH: wie zit er achter de verzamelrekening? ---
const WS_HYPOS = ['Georganiseerde witwasdienst (money mule-netwerk)', 'Eén losse fraudeur', 'Boekhoudfout bij de bank'];
// expert-oordelen per hypothese: C=consistent, I=inconsistent, N=neutraal
const WS_EVIDENCE = [
  { text: 'Meerdere katvangers storten op dezelfde dagen net onder de meldgrens', expert: ['C', 'I', 'I'] },
  { text: 'Stortingen in vijf verschillende steden op vier dagen', expert: ['C', 'I', 'I'] },
  { text: 'Geld wordt direct gelaagd naar een wisselkantoor en het buitenland', expert: ['C', 'N', 'I'] },
  { text: 'Katvangers houden een vaste vergoeding (500) achter', expert: ['C', 'I', 'I'] },
  { text: 'De bedragen zijn exact en kloppen onderling', expert: ['C', 'C', 'I'] },
];

CS.registerRoom({
  id: 'witwassen-structurering',
  path: 'datastromen',
  order: 1,
  title: 'Witwassen & structurering',
  icon: '💶',
  difficulty: 'Gemiddeld',
  minutes: 55,
  summary: 'Volg het geld van crimineel naar schoon. Je leert de drie fasen van witwassen, betrapt structurering (smurfing) onder de Wwft-meldgrens, volgt de gelaagde geldstroom naar een cash-out in het buitenland, en weegt met ACH wie erachter zit — altijd met het juridische kader (Wwft, meldplicht, FIU-Nederland) voorop.',
  objectives: [
    'De drie fasen van witwassen (placement, layering, integration) herkennen en benoemen',
    'Structurering (smurfing) herkennen: meerdere stortingen net onder de meldgrens',
    'De Wwft-meldplicht en de rol van FIU-Nederland uitleggen',
    'Een gelaagde geldstroom volgen tot de cash-out en het knelpunt aanwijzen',
    'Met ACH afwegen welke hypothese over de daders het sterkst overeind blijft',
  ],
  terms: [
    { term: 'Witwassen', def: 'Crimineel geld een schijnbaar legale herkomst geven, zodat het bruikbaar wordt zonder argwaan te wekken. Strafbaar via art. 420bis e.v. Sr.' },
    { term: 'Placement', def: 'Fase 1: het criminele geld het financiële stelsel in brengen, bijvoorbeeld door contante stortingen.' },
    { term: 'Layering', def: 'Fase 2: de herkomst versluieren met veel transacties, rekeningen en omzettingen (lagen aanbrengen).' },
    { term: 'Integration', def: 'Fase 3: het gewassen geld terug laten komen als schijnbaar legaal bezit (vastgoed, een bedrijf, een "lening").' },
    { term: 'Structurering (smurfing)', def: 'Eén groot bedrag opknippen in meerdere stortingen net onder de meldgrens om een melding te ontlopen. Zelf een strafbaar signaal.' },
    { term: 'Katvanger / money mule', def: 'Iemand die zijn rekening of identiteit uitleent om geld door te sluizen, vaak tegen een kleine vergoeding.' },
    { term: 'Wwft', def: 'Wet ter voorkoming van witwassen en financieren van terrorisme: verplicht instellingen tot cliëntenonderzoek en het melden van ongebruikelijke transacties.' },
    { term: 'Meldgrens', def: 'Bedrag waarboven (of patroon waarbij) een transactie als ongebruikelijk geldt en gemeld moet worden. Hier als fictieve vuistregel € 10.000 voor contant.' },
    { term: 'FIU-Nederland', def: 'Financial Intelligence Unit: ontvangt ongebruikelijke transacties, analyseert ze en kan ze "verdacht" verklaren voor de opsporing.' },
    { term: 'Cash-out-knelpunt', def: 'De plek waar het gewassen geld het systeem verlaat (wisselkantoor, buitenlandse rekening); vaak het sterkste aangrijppunt voor opsporing.' },
    { term: 'ACH', def: 'Analysis of Competing Hypotheses: hypothesen naast elkaar leggen en weerleggen; wat de minste inconsistenties heeft, blijft het sterkst.' },
  ],
  resources: [
    { title: 'FIU-Nederland — ongebruikelijke transacties melden', url: 'https://www.fiu-nederland.nl/' },
    { title: 'De Nederlandsche Bank — Wwft', url: 'https://www.dnb.nl/' },
    { title: 'FATF — internationale standaarden tegen witwassen', url: 'https://www.fatf-gafi.org/' },
    { title: 'Rijksoverheid — aanpak witwassen', url: 'https://www.rijksoverheid.nl/onderwerpen/financiele-sector/aanpak-witwassen-en-financieren-terrorisme' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De drie fasen van witwassen',
      content: `
        <p>Crimineel geld is pas bruikbaar als niemand vraagt waar het vandaan komt. Dat "schoonmaken" heet
        <strong>witwassen</strong>, en het verloopt klassiek in drie fasen.</p>
        <ul>
          <li><strong>Placement</strong> — het geld het systeem in brengen (bijvoorbeeld contant storten).</li>
          <li><strong>Layering</strong> — lagen aanbrengen: veel transacties, rekeningen en omzettingen om het spoor te vertroebelen.</li>
          <li><strong>Integration</strong> — het terug laten komen als schijnbaar legaal bezit (vastgoed, een bedrijf, een "lening aan jezelf").</li>
        </ul>
        <p>Als rechercheur draai je dit om: je begint bij een vreemde geldstroom en werkt terug naar de bron. De rode draad
        van bijna elke cybercrimezaak is uiteindelijk <em>het geld</em>.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de personen, rekeningen en bedragen zijn verzonnen.
        De meldgrens van € 10.000 is hier een vuistregel om het patroon te oefenen, geen exacte wetsbepaling.</div>
        <div class="callout tip"><strong>Beloning:</strong> onthoud de volgorde placement → layering → integration. Vlag:
        <code>NM{volg_het_geld}</code>.</div>
      `,
      questions: [
        { q: 'In welke volgorde verlopen de drie klassieke fasen van witwassen?', options: ['Placement → layering → integration', 'Integration → layering → placement', 'Layering → placement → integration', 'Placement → integration → layering'], answer: 0, explain: 'Eerst het geld erin (placement), dan versluieren (layering), dan het schijnbaar legaal terug laten komen (integration).' },
        { q: 'Wat gebeurt er in de layering-fase?', options: ['De herkomst wordt versluierd met veel transacties, rekeningen en omzettingen', 'Het geld wordt voor het eerst contant gestort', 'Het geld wordt als legaal bezit geïntegreerd', 'Het geld wordt verbrand'], answer: 0, explain: 'Layering = lagen aanbrengen: hoe meer stappen, hoe lastiger het spoor terug te volgen is.' },
        { q: 'Welk wetsartikel stelt witwassen strafbaar in Nederland?', options: ['Art. 420bis e.v. Sr', 'Art. 138ab Sr', 'Art. 350 Sr', 'Art. 326 Sr'], answer: 0, explain: 'Witwassen is strafbaar via art. 420bis en verder van het Wetboek van Strafrecht.' },
        { q: 'Welke vlag staat als beloning in de tip-callout?', answer: ['NM{volg_het_geld}'], hint: 'Lees de tip-callout onderaan.', explain: 'De vlag is NM{volg_het_geld}.' },
      ],
    },
    {
      title: 'Taak 2 — Structurering betrappen (smurfing)',
      content: `
        <p>Banken en wisselkantoren moeten onder de <strong>Wwft</strong> ongebruikelijke transacties melden bij
        <strong>FIU-Nederland</strong>. Witwassers weten dat, dus knippen ze één groot bedrag op in meerdere stortingen
        <strong>net onder de meldgrens</strong>. Dat heet <strong>structurering</strong> of <em>smurfing</em> — en juist
        dat patroon verraadt ze.</p>
        <p>Hieronder zie je stortingen op de rekeningen van twee <strong>katvangers</strong>. Eén storting ligt juist
        bóven de grens (daar geldt de meldplicht); de rest kruipt er net onder. Lees het patroon.</p>
        <div class="callout tip"><strong>Beloning:</strong> herken je het smurf-patroon? Vlag:
        <code>NM{net_onder_de_grens}</code>.</div>
      `,
      lab: {
        type: 'structuring',
        title: 'stortingen rond de meldgrens',
        threshold: 10000,
        currency: '€',
        scenario: 'Zaak "Koekoek": twee katvangers storten in één week contant geld op meerdere kantoren. Zoek het structurering-patroon.',
        tx: WS_TX,
        ask: [
          { q: 'Hoeveel stortingen passen in het structurering-patroon (net onder de grens)?', answer: ['5'], hint: 'Tel de gemarkeerde rijen.' },
          { q: 'Wat is het totale gestructureerde bedrag (in euro, alleen het getal)?', answer: ['48500', '48.500', '€48500', '€ 48.500'], hint: '9800+9500+9900+9700+9600.' },
          { q: 'Over hoeveel verschillende dagen werd er gestructureerd?', answer: ['4', 'vier'], hint: 'Kijk naar de datums van de gemarkeerde rijen.' },
        ],
      },
      questions: [
        { q: 'Wat is structurering (smurfing)?', options: ['Eén groot bedrag opknippen in stortingen net onder de meldgrens om een melding te ontlopen', 'Geld in het buitenland parkeren', 'Een rekening op een valse naam openen', 'Contant geld omwisselen voor crypto'], answer: 0, explain: 'Smurfing = bewust onder de grens blijven met veel kleine stortingen. Het patroon zelf is het signaal.' },
        { q: 'Hoeveel stortingen passen in het structurering-patroon?', answer: ['5', 'vijf'], hint: 'De gemarkeerde rijen in het lab.', explain: 'Vijf stortingen (9800, 9500, 9900, 9700, 9600) liggen net onder de grens van € 10.000.' },
        { q: 'Wat is het totale gestructureerde bedrag?', answer: ['48500', '48.500', '€ 48.500', '€48500'], hint: 'Tel de vijf gemarkeerde bedragen op.', explain: '9800 + 9500 + 9900 + 9700 + 9600 = € 48.500.' },
        { q: 'De storting van € 12.000 valt juist bóven de grens. Wat betekent dat?', options: ['Daar geldt juist de meldplicht — die transactie hoort gemeld te worden', 'Die is per definitie legaal', 'Die telt mee als structurering', 'Die mag genegeerd worden'], answer: 0, explain: 'Boven de meldgrens geldt de meldplicht. Structurering is juist het vermijden daarvan door eronder te blijven.' },
        { q: 'Bij welke instantie worden ongebruikelijke transacties gemeld?', answer: ['FIU-Nederland', 'fiu', 'fiu nederland', 'fiu-nederland'], hint: 'De Financial Intelligence Unit.', explain: 'FIU-Nederland ontvangt en analyseert ongebruikelijke transacties en kan ze verdacht verklaren.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{net_onder_de_grens}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{net_onder_de_grens}.' },
      ],
    },
    {
      title: 'Taak 3 — Volg de gelaagde geldstroom',
      content: `
        <p>De gestructureerde buit (€ 48.500) verdwijnt niet in een kluis — hij wordt <strong>gelaagd</strong>. De
        katvangers sluizen het samen naar één <strong>verzamelrekening</strong>, die stuurt het door naar een
        <strong>wisselkantoor</strong>, dat uiteindelijk uitbetaalt op een <strong>buitenlandse rekening</strong>. Onderweg
        blijft er telkens een beetje "hangen" als vergoeding en commissie.</p>
        <p>Volg de stroom in het lab: klik knopen aan, lees de transactietabel, en let op waar het geld het systeem
        <em>verlaat</em> — dat is het cash-out-knelpunt waar de opsporing aangrijpt.</p>
        <div class="callout tip"><strong>Beloning:</strong> vind de cash-out. Vlag: <code>NM{cash_out_knelpunt}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'de gelaagde geldstroom',
        unit: '€',
        scenario: 'De € 48.500 stroomt van twee katvangers via een verzamelrekening en een wisselkantoor naar het buitenland.',
        nodes: WS_NODES,
        edges: WS_EDGES,
        ask: [
          { q: 'Hoeveel komt er in totaal binnen op de verzamelrekening? (alleen het getal)', answer: ['48500', '48.500'], hint: 'Klik de verzamelrekening aan: tel beide inkomende stromen op.' },
          { q: 'Hoeveel bereikt de buitenlandse rekening (de cash-out)?', answer: ['47500', '47.500'], hint: 'De laatste transactie in de tabel.' },
          { q: 'Waar stroomt het geld het systeem uit?', answer: ['buitenlandse rekening', 'buiten', 'de buitenlandse rekening', 'buitenland'], hint: 'Het laatste knooppunt in de keten.' },
        ],
      },
      questions: [
        { q: 'Hoeveel komt er in totaal binnen op de verzamelrekening?', answer: ['48500', '48.500', '€ 48.500', '€48500'], hint: '29300 (de Groot) + 19200 (Visser).', explain: '€ 29.300 + € 19.200 = € 48.500 — exact de gestructureerde buit.' },
        { q: 'Hoeveel geld bereikt uiteindelijk de buitenlandse rekening?', answer: ['47500', '47.500', '€ 47.500', '€47500'], hint: 'De cash-out in de laatste transactie.', explain: 'Na de aftrek bij de verzamelrekening en het wisselkantoor blijft € 47.500 over bij de cash-out.' },
        { q: 'Hoeveel bleef er in totaal als vergoeding en commissie achter?', answer: ['1000', '1.000', '€ 1.000', '€1000'], hint: '48500 binnen, 47500 eruit.', explain: 'De katvanger hield 500 en het wisselkantoor 500: samen € 1.000 "kosten" van het witwassen.' },
        { q: 'Welk knooppunt is het cash-out-knelpunt waar de opsporing aangrijpt?', options: ['De buitenlandse rekening / het wisselkantoor, waar het geld het systeem verlaat', 'De contante storting', 'De verzamelrekening', 'De pinbetaling van R. Bakker'], answer: 0, explain: 'De cash-out koppelt de stroom aan een concrete rekening en jurisdictie; daar grijp je aan met een vordering of rechtshulpverzoek.' },
        { q: 'Welke witwasfase herken je in deze doorsluizing via meerdere rekeningen?', options: ['Layering', 'Placement', 'Integration', 'Geen van alle'], answer: 0, explain: 'Het doorsluizen via verzamelrekening en wisselkantoor is layering: lagen aanbrengen om de herkomst te versluieren.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{cash_out_knelpunt}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{cash_out_knelpunt}.' },
      ],
    },
    {
      title: 'Taak 4 — Wie zit erachter? (ACH)',
      content: `
        <p>Je hebt het patroon en de stroom. Nu de vraag die telt: <strong>wie</strong> zit achter de verzamelrekening?
        Gok niet — gebruik <strong>Analysis of Competing Hypotheses (ACH)</strong>. Je legt de hypothesen naast elkaar en
        toetst per bewijsstuk of het <em>past</em> (+) of juist <em>wringt</em> (−). De hypothese met de minste
        inconsistenties blijft het sterkst overeind.</p>
        <div class="callout tip"><strong>Beloning:</strong> kies de sterkste hypothese. Vlag:
        <code>NM{minste_inconsistenties}</code>.</div>
      `,
      lab: {
        type: 'ach',
        title: 'wie zit achter de verzamelrekening?',
        hypotheses: WS_HYPOS,
        evidence: WS_EVIDENCE,
      },
      questions: [
        { q: 'Welke hypothese blijft volgens de ACH-matrix het sterkst overeind?', options: ['Georganiseerde witwasdienst (money mule-netwerk)', 'Eén losse fraudeur', 'Boekhoudfout bij de bank', 'Niet te bepalen'], answer: 0, explain: 'De gecoördineerde stortingen in vijf steden, de vaste vergoedingen en de directe layering passen alleen bij een georganiseerd netwerk.' },
        { q: 'Waarom is "boekhoudfout bij de bank" vrijwel uitgesloten?', options: ['Een fout verklaart geen gecoördineerde stortingen net onder de grens in vijf steden', 'Banken maken nooit fouten', 'Omdat het bedrag te klein is', 'Omdat er crypto in het spel is'], answer: 0, explain: 'Een fout is willekeurig; dit is juist een strak, doelbewust patroon — dat weerlegt de fouthypothese.' },
        { q: 'Wat is de kern van ACH?', options: ['Hypothesen weerleggen; de hypothese met de minste inconsistenties wint', 'De eerste hypothese bevestigen', 'Zoveel mogelijk bewijs voor je favoriet verzamelen', 'Altijd de meest spannende verklaring kiezen'], answer: 0, explain: 'ACH draait om falsificeren: je zoekt bewijs dat hypothesen onderuithaalt, niet bevestigt (minder confirmation bias).' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{minste_inconsistenties}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{minste_inconsistenties}.' },
      ],
    },
  ],
});
