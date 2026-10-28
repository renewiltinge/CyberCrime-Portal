/* Room: Datastromen — financiële recherche: reconstrueer de rekeningen */

// =======================================================================
//  Alles FICTIEF: verzonnen bedrijf, rekeningen en bedragen. Je oefent
//  het reconciliëren van administraties, niet een echte zaak.
// =======================================================================

// --- Recon: bankafschrift vs. boekhouding (één post ontbreekt) ---
const FR_BANK = [
  { date: '2026-02-03', amount: 12000, desc: 'Klantbetaling factuur 2026-114' },
  { date: '2026-02-05', amount: -3500, desc: 'Leverancier Noord BV' },
  { date: '2026-02-08', amount: -4500, desc: 'Onbekende BV' },
  { date: '2026-02-25', amount: -1200, desc: 'Salaris K. Visser' },
  { date: '2026-02-28', amount: 800, desc: 'Rente' },
];
const FR_BOEK = [
  { date: '2026-02-03', amount: 12000, desc: 'Klantbetaling factuur 2026-114' },
  { date: '2026-02-05', amount: -3500, desc: 'Leverancier Noord BV' },
  { date: '2026-02-25', amount: -1200, desc: 'Salaris K. Visser' },
  { date: '2026-02-28', amount: 800, desc: 'Rente' },
];

// --- Flow: waar ging de onverklaarde € 4.500 heen? ---
const FR_NODES = [
  { id: 'comp', type: 'account', label: 'Bedrijfsrekening' },
  { id: 'shell', type: 'account', label: 'Onbekende BV (katvanger)' },
  { id: 'mule', type: 'mule', label: 'Money mule' },
  { id: 'cash', type: 'cashout', label: 'Contante opname' },
];
const FR_EDGES = [
  { from: 'comp', to: 'shell', amount: 4500, time: '08-02', note: 'onverklaarde betaling (niet geboekt)' },
  { from: 'shell', to: 'mule', amount: 4300, time: '09-02', note: 'katvanger houdt 200' },
  { from: 'mule', to: 'cash', amount: 4200, time: '10-02', note: 'mule houdt 100; contant opgenomen' },
];

CS.registerRoom({
  id: 'financiele-recherche',
  path: 'datastromen',
  order: 6,
  title: 'Financiële recherche: reconstrueer de rekeningen',
  icon: '📒',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Fraude verstopt zich vaak in het verschil tussen twee administraties. Je leert reconciliëren: een bankafschrift en de boekhouding naast elkaar leggen om de post te vinden die nergens klopt — en dat onverklaarde bedrag vervolgens als geldstroom volgen tot de cash-out. Je sluit af met de interne controles die dit hadden voorkomen.',
  objectives: [
    'Uitleggen wat reconciliatie is en waarom het fraude blootlegt',
    'Twee administraties matchen en de onverklaarde post vinden',
    'Een saldoverschil verklaren uit een ontbrekende boeking',
    'Het onverklaarde bedrag als geldstroom volgen tot de cash-out',
    'Interne controles benoemen (functiescheiding, vier-ogen-principe) die verduistering via ongeboekte betalingen tegengaan',
  ],
  terms: [
    { term: 'Reconciliatie', def: 'Twee administraties die hetzelfde zouden moeten weergeven naast elkaar leggen en afstemmen; verschillen zijn verdacht.' },
    { term: 'Ongeboekte uitbetaling (fraudulent disbursement)', def: 'Interne fraude waarbij geld via een betaling die niet (of vals) wordt geboekt uit de organisatie verdwijnt. Verwant aan skimming, waarbij ontvangsten worden afgeroomd vóórdat ze geboekt worden.' },
    { term: 'Katvanger / shell', def: 'Een tussenrekening of lege BV die alleen dient om geld door te sluizen en de bestemming te verhullen.' },
    { term: 'Onverklaarde post', def: 'Een transactie die op de ene administratie staat maar niet op de andere — de kern van veel fraudezaken.' },
    { term: 'Saldoverschil', def: 'Het verschil tussen twee saldi dat precies gelijk is aan de ontbrekende boeking(en).' },
    { term: 'Functiescheiding', def: 'Taken verdelen zodat één persoon niet én betaalt én boekt én controleert — de belangrijkste rem op interne fraude.' },
    { term: 'Vier-ogen-principe', def: 'Een tweede persoon moet een betaling goedkeuren; alleen handelen wordt zo moeilijker.' },
    { term: 'Audit trail', def: 'Het volledige, onveranderbare spoor van wie wat wanneer deed — nodig om een onverklaarde post terug te leiden.' },
  ],
  resources: [
    { title: 'ACFE — Association of Certified Fraud Examiners', url: 'https://www.acfe.com/' },
    { title: 'FIU-Nederland', url: 'https://www.fiu-nederland.nl/' },
    { title: 'Rijksoverheid — aanpak fraude', url: 'https://www.rijksoverheid.nl/onderwerpen/fraude' },
    { title: 'NBA — accountancy en fraude', url: 'https://www.nba.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Waarom reconciliatie fraude vindt',
      content: `
        <p>Een boekhouding kan er perfect uitzien en tóch liegen — als er geld is weggesluisd <em>buiten de boeking om</em>.
        Dat heet een <strong>ongeboekte uitbetaling</strong> (fraudulent disbursement); de verwante truc waarbij
        ontvangsten vóór de boeking worden afgeroomd, heet <em>skimming</em>. Je vindt het niet door de boekhouding alléén te lezen, maar door haar te
        <strong>reconciliëren</strong>: naast een onafhankelijke bron leggen (het bankafschrift) en afstemmen.</p>
        <p>De logica is simpel: het bankafschrift en de boekhouding horen dezelfde transacties te tonen. Een post die wél op
        de bank staat maar niet in de boeken (of andersom) is <strong>onverklaard</strong> — en vaak precies het spoor van
        de fraude. Het <strong>saldoverschil</strong> is dan exact gelijk aan die ontbrekende boeking.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> het bedrijf, de rekeningen en de bedragen zijn verzonnen.</div>
        <div class="callout tip"><strong>Beloning:</strong> fraude zit in het verschil. Vlag: <code>NM{zit_in_het_verschil}</code>.</div>
      `,
      questions: [
        { q: 'Wat is reconciliatie?', options: ['Twee administraties naast elkaar leggen en afstemmen om verschillen te vinden', 'De boekhouding opnieuw typen', 'Een wachtwoord resetten', 'Een back-up maken'], answer: 0, explain: 'Reconciliëren stemt bron en boeking op elkaar af; het verschil is het signaal.' },
        { q: 'Waarom vind je een ongeboekte uitbetaling niet door alleen de boekhouding te lezen?', options: ['Omdat het geld juist buiten de boeking om is weggesluisd — het ontbreekt daar', 'Omdat de boekhouding versleuteld is', 'Omdat boekhoudingen altijd kloppen', 'Omdat het bedrag te klein is'], answer: 0, explain: 'Zo\'n fraude laat de boeking er netjes uitzien; alleen een onafhankelijke bron (de bank) onthult het.' },
        { q: 'Waaraan is het saldoverschil gelijk?', options: ['Aan de ontbrekende boeking(en)', 'Aan de btw', 'Aan de rente', 'Aan het hoogste bedrag'], answer: 0, explain: 'Als één post ontbreekt, verschillen de saldi precies met dat bedrag.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{zit_in_het_verschil}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{zit_in_het_verschil}.' },
      ],
    },
    {
      title: 'Taak 2 — Leg de administraties naast elkaar',
      content: `
        <p>Hier zijn het <strong>bankafschrift</strong> en de <strong>boekhouding</strong> van één maand. Het lab matcht de
        posten op bedrag en markeert wat niet klopt. Zoek de onverklaarde post en kijk naar het saldoverschil.</p>
        <div class="callout tip"><strong>Beloning:</strong> vind de post die nergens klopt. Vlag: <code>NM{onverklaarde_post}</code>.</div>
      `,
      lab: {
        type: 'recon',
        title: 'bankafschrift vs. boekhouding — februari',
        currency: '€',
        leftName: 'Bankafschrift',
        rightName: 'Boekhouding',
        scenario: 'Vier posten matchen netjes; één staat alleen op de bank. Welke, en voor hoeveel?',
        left: FR_BANK,
        right: FR_BOEK,
        ask: [
          { q: 'Welk bedrag staat wel op het bankafschrift maar niet in de boekhouding? (alleen het getal)', answer: ['4500', '4.500'], hint: 'De rode, niet-gematchte regel.' },
          { q: 'Naar welke begunstigde ging die onverklaarde betaling?', answer: ['Onbekende BV', 'onbekende bv'], hint: 'Lees de omschrijving van de niet-gematchte regel.' },
          { q: 'Hoe groot is het verschil tussen beide saldi?', answer: ['4500', '4.500'], hint: 'Staat onder de twee kolommen.' },
        ],
      },
      questions: [
        { q: 'Welk bedrag is onverklaard?', answer: ['4500', '4.500', '€ 4.500', '€4500'], hint: 'De niet-gematchte regel op het bankafschrift.', explain: 'De betaling van € 4.500 aan "Onbekende BV" staat wel op de bank, maar niet in de boekhouding.' },
        { q: 'Naar wie ging de onverklaarde betaling?', answer: ['Onbekende BV', 'onbekende bv', 'onbekende b.v.'], hint: 'De omschrijving van de rode regel.', explain: 'Naar "Onbekende BV" — een lege vennootschap die als doorsluisrekening dient.' },
        { q: 'Waarom is het saldoverschil precies € 4.500?', options: ['Omdat die ene betaling wel van de bank ging, maar niet werd geboekt', 'Door afrondingsverschillen', 'Door de rente', 'Door de btw'], answer: 0, explain: 'Eén ontbrekende boeking van € 4.500 maakt de twee saldi precies € 4.500 verschillend.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{onverklaarde_post}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{onverklaarde_post}.' },
      ],
    },
    {
      title: 'Taak 3 — Volg de onverklaarde betaling',
      content: `
        <p>Je hebt de onverklaarde € 4.500 en de begunstigde ("Onbekende BV"). Nu volg je waar dat geld heen ging. Zoals zo
        vaak loopt het via een katvanger naar een <strong>money mule</strong> en uiteindelijk contant het systeem uit.</p>
        <div class="callout tip"><strong>Beloning:</strong> volg tot het contant verdwijnt. Vlag: <code>NM{tot_het_contant_verdwijnt}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'het spoor van de onverklaarde € 4.500',
        unit: '€',
        scenario: 'De € 4.500 loopt via "Onbekende BV" en een money mule naar een contante opname.',
        nodes: FR_NODES,
        edges: FR_EDGES,
        ask: [
          { q: 'Hoeveel werd er uiteindelijk contant opgenomen? (alleen het getal)', answer: ['4200', '4.200'], hint: 'De laatste transactie.' },
          { q: 'Via welke tussenpartij liep het geld eerst?', answer: ['Onbekende BV', 'onbekende bv', 'de katvanger', 'katvanger'], hint: 'Het eerste knooppunt na de bedrijfsrekening.' },
        ],
      },
      questions: [
        { q: 'Hoeveel werd er uiteindelijk contant opgenomen?', answer: ['4200', '4.200', '€ 4.200', '€4200'], hint: 'De laatste transactie in de keten.', explain: 'Na een vergoeding voor de katvanger (200) en de mule (100) bleef € 4.200 over om contant op te nemen.' },
        { q: 'Welke rol speelt "Onbekende BV" in de keten?', options: ['Doorsluisrekening (katvanger) die de bestemming verhult', 'De uiteindelijke ontvanger', 'De bank', 'De accountant'], answer: 0, explain: 'Een lege BV als tussenstap maakt het lastiger om de echte bestemming te zien.' },
        { q: 'Waarom is een contante opname aantrekkelijk als laatste stap?', options: ['Contant geld is moeilijk verder te volgen dan een rekening', 'Het levert rente op', 'Het is verplicht', 'Het is sneller geboekt'], answer: 0, explain: 'Zodra het geld contant is, stopt het digitale spoor — daarom is het een klassieke cash-out.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{tot_het_contant_verdwijnt}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{tot_het_contant_verdwijnt}.' },
      ],
    },
    {
      title: 'Taak 4 — Welke controle had dit voorkomen?',
      content: `
        <p>Een onverklaarde betaling kan alleen ongezien blijven als één persoon te veel macht heeft. De belangrijkste
        remmen zijn <strong>functiescheiding</strong> (dezelfde persoon mag niet én betalen én boeken én controleren) en het
        <strong>vier-ogen-principe</strong> (een tweede persoon keurt betalingen goed). Een onafhankelijke, periodieke
        <strong>reconciliatie</strong> en een onveranderbare <strong>audit trail</strong> maken de cirkel rond.</p>
        <div class="callout tip"><strong>Beloning:</strong> scheid de taken. Vlag: <code>NM{functiescheiding_wint}</code>.</div>
      `,
      questions: [
        { q: 'Welke controle maakt interne fraude het moeilijkst?', options: ['Functiescheiding: niet één persoon mag betalen, boeken én controleren', 'Een langer wachtwoord', 'Een snellere computer', 'Meer back-ups'], answer: 0, explain: 'Als taken gescheiden zijn, kan niemand alleen een betaling doen én verbergen.' },
        { q: 'Wat houdt het vier-ogen-principe in?', options: ['Een tweede persoon moet een betaling goedkeuren', 'Je controleert alles vier keer', 'Je gebruikt vier wachtwoorden', 'Je bewaart alles vier jaar'], answer: 0, explain: 'Een verplichte tweede goedkeuring voorkomt dat één persoon ongezien geld wegsluist.' },
        { q: 'Waarom helpt een periodieke, onafhankelijke reconciliatie?', options: ['Ze legt een onverklaarde post snel bloot, voordat het spoor koud wordt', 'Ze versnelt de boekhouding', 'Ze verlaagt de belasting', 'Ze is wettelijk verboden'], answer: 0, explain: 'Regelmatig afstemmen met de bank vangt zulke fraude vroeg — precies wat je in dit lab deed.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{functiescheiding_wint}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{functiescheiding_wint}.' },
      ],
    },
  ],
});
