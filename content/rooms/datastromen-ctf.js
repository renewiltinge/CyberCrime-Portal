/* Room: Eindopdracht — de grote Datastromen-CTF: Operatie Spiegelglas */

// =======================================================================
//  Alles FICTIEF: "Operatie Spiegelglas", documentatie-IP's (RFC 5737),
//  .nm.lab-domeinen en verzonnen bedragen/wallets. Eén samenhangende zaak
//  die het hele Datastromen-pad combineert tot een CTF met zeven vlaggen.
// =======================================================================

// Vlag 1 — e-mailheader (de entree)
const CTF_HOPS = [
  { from: '[vervalst / onbekend]', ip: '203.0.113.200', by: 'mail.boos.nm.lab', time: '07:55:01' },
  { from: 'mail.boos.nm.lab', ip: '203.0.113.200', by: 'relay9.nm.lab', time: '07:55:40' },
  { from: 'relay9.nm.lab', ip: '198.51.100.5', by: 'mx.nm.lab (ontvanger)', time: '07:56:12' },
];

// Vlag 2 — netflow (beaconing & exfiltratie)
const CTF_FLOWS = [
  { dst: '203.0.113.150', dstLabel: 'cdn-x.nm.lab', port: 443, proto: 'tcp', conns: 360, intervalSec: 120, jitterPct: 5, bytesOut: 61000, bytesIn: 44000, note: 'elke ~120s een klein check-in' },
  { dst: '203.0.113.201', dstLabel: 'opslag-x9f3.nm.lab', port: 443, proto: 'tcp', conns: 4, intervalSec: null, jitterPct: null, bytesOut: 3400000000, bytesIn: 5200, note: 'grote nachtelijke uploads' },
  { dst: '198.51.100.12', dstLabel: 'intranet.nm.lab', port: 443, proto: 'tcp', conns: 88, intervalSec: null, jitterPct: 61, bytesOut: 3900000, bytesIn: 27000000, note: 'normaal portaalgebruik' },
];

// Vlag 3 — structuring (smurfing); grens € 10.000, band [8000,10000)
const CTF_TX = [
  { date: '2026-04-06', who: 'Katvanger A', amount: 9900, kind: 'contant' },
  { date: '2026-04-06', who: 'Katvanger B', amount: 9800, kind: 'contant' },
  { date: '2026-04-07', who: 'Katvanger A', amount: 9700, kind: 'contant' },
  { date: '2026-04-07', who: 'R. Bakker', amount: 250, kind: 'pin', note: 'normaal' },
  { date: '2026-04-08', who: 'Katvanger B', amount: 9600, kind: 'contant' },
  { date: '2026-04-08', who: 'Katvanger A', amount: 11000, kind: 'contant', note: 'contant boven de grens — meldplichtig' },
];

// Vlag 4 — flow (het geldspoor; de € 39.000 gestructureerd)
const CTF_NODES = [
  { id: 'a', type: 'mule', label: 'Katvanger A' },
  { id: 'b', type: 'mule', label: 'Katvanger B' },
  { id: 'verz', type: 'account', label: 'Verzamelrekening' },
  { id: 'ex', type: 'exchange', label: 'Crypto-exchange' },
  { id: 'cash', type: 'cashout', label: 'Cash-out' },
];
const CTF_EDGES = [
  { from: 'a', to: 'verz', amount: 19600, time: 'week 15', note: 'gestructureerde stortingen A (9.900 + 9.700)' },
  { from: 'b', to: 'verz', amount: 19400, time: 'week 15', note: 'gestructureerde stortingen B (9.800 + 9.600)' },
  { from: 'verz', to: 'ex', amount: 38500, time: 'week 15', note: 'katvanger houdt 500' },
  { from: 'ex', to: 'cash', amount: 38000, time: 'week 16', note: 'exchange-fee 500; cash-out' },
];

// Vlag 5 — chaintrace (taint door een mixer); 6 vuil + 6 schoon -> 50%
const CTF_LABELS = { D: 'Vuile bron', C: 'Schone mixer-liquiditeit', HOP: 'Hop-wallet', OUT1: 'Mixer-uitbetaling 1', OUT2: 'Mixer-uitbetaling 2', EX: 'Exchange (cash-out)' };
const CTF_ORIGINS = [{ addr: 'D', amount: 6 }, { addr: 'C', amount: 6, dirty: false }];
const CTF_TXS = [
  { inputs: ['D'], outputs: [{ addr: 'HOP', amount: 6 }], time: '10:00' },
  { inputs: ['HOP', 'C'], outputs: [{ addr: 'OUT1', amount: 6 }, { addr: 'OUT2', amount: 6 }], time: '11:00' },
  { inputs: ['OUT1'], outputs: [{ addr: 'EX', amount: 6 }], time: '12:00' },
];

// Vlag 6/7 — bluf (het eindproduct)
const CTF_BLUF_SOURCE = [
  '07:56 — BEC-phishingmail bij de financiële afdeling; From spooft een bekende leverancier, SPF=fail, oorsprong-IP 203.0.113.200 (mail.boos.nm.lab).',
  'Dag 1 — besmette werkplek beacont elke 120s naar cdn-x.nm.lab; ’s nachts ~3,4 GB geëxfiltreerd naar opslag-x9f3.nm.lab (203.0.113.201).',
  'Week 15 — twee katvangers storten € 39.000 gestructureerd (vier stortingen net onder de € 10.000-grens).',
  'Week 15-16 — het geld loopt via een verzamelrekening en een crypto-exchange naar een cash-out (€ 38.000).',
  'Chain — 6 BTC vuil + 6 BTC schoon door een mixer; 3 BTC (50% taint) bereikt de exchange.',
  'Attributie — de C2- en exfil-infrastructuur deelt certificaat A1B2C3D4 met een eerder BEC-dossier (afgeleid).',
].join('\n');
const CTF_BLUF_MODEL = [
  'BEOORDELING: Zeer waarschijnlijk is dit één georganiseerde operatie die BEC-fraude, data-exfiltratie en witwassen combineert (betrouwbaarheid: hoog; de keten en gedeelde infrastructuur grijpen op elkaar in).',
  'ONDERBOUWING: de spoofmail (SPF=fail) opende de toegang; de werkplek beaconde en exfiltreerde ~3,4 GB; de buit werd gestructureerd (€ 39.000) en via een exchange uitbetaald (€ 38.000); op de chain bereikt 3 BTC (50% taint) de exchange; het gedeelde certificaat A1B2C3D4 koppelt de infrastructuur aan een eerder dossier (afgeleid, geen persoonsattributie).',
  'ADVIES (eigenaar): (1) Terugboeking aanvragen en de exchange-tegoeden laten bevriezen — bank/betalingsverkeer + politie. (2) Werkplek isoleren, IOCs blokkeren (cdn-x.nm.lab, opslag-x9f3.nm.lab) — SOC/CSIRT. (3) Datalek melden bij de AP en aangifte doen — CISO/juridisch + politie. (4) Vordering richting de crypto-exchange (KYC) — OM.',
].join('\n\n');

CS.registerRoom({
  id: 'datastromen-ctf',
  path: 'eindopdracht',
  order: 3,
  title: 'De grote Datastromen-CTF: Operatie Spiegelglas',
  icon: '🏁',
  difficulty: 'Moeilijk',
  minutes: 90,
  summary: 'Het eindexamen van het Datastromen-pad. Eén samenhangende, fictieve zaak — van een BEC-phishingmail via beaconing en exfiltratie, structurering, het geldspoor en crypto-witwassen tot attributie en een BLUF-product — waarin je elk van je datastromen-vaardigheden achter elkaar inzet. Zeven vlaggen. Bewijs dat je de hele keten kunt lezen.',
  objectives: [
    'De herkomst van een phishingmail traceren (header)',
    'Beaconing en exfiltratie uit netwerkstromen halen',
    'Structurering betrappen en het geldspoor volgen tot de cash-out',
    'Crypto-taint door een mixer narekenen',
    'De bevindingen tot één BLUF-intelligenceproduct samenbrengen',
  ],
  terms: [
    { term: 'CTF', def: 'Capture The Flag: los uitdagingen op en verzamel "vlaggen" (NM{...}) als bewijs.' },
    { term: 'BEC', def: 'Business Email Compromise: fraude via een nagebootste/gekaapte zakelijke e-mail.' },
    { term: 'Beaconing', def: 'Het periodieke check-in-signaal van malware naar zijn C2 (regelmatig, klein).' },
    { term: 'Structurering', def: 'Smurfing: één bedrag opknippen in stortingen net onder de meldgrens.' },
    { term: 'Taint', def: 'De mate waarin geld op een adres uit een vuile bron komt (bedrag en percentage).' },
    { term: 'BLUF', def: 'Bottom Line Up Front: conclusie en advies eerst, onderbouwing eronder.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
    { title: 'FIU-Nederland', url: 'https://www.fiu-nederland.nl/' },
    { title: 'NCSC', url: 'https://www.ncsc.nl/' },
    { title: 'Chainalysis — crypto-onderzoek', url: 'https://www.chainalysis.com/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De opdracht',
      content: `
        <p>Welkom bij <strong>Operatie Spiegelglas</strong>, het eindexamen van het Datastromen-pad. Eén zaak, zeven vlaggen,
        elke taak een stuk van de keten: van de phishingmail die de deur opende, via het netwerkverkeer en de geldstroom, tot
        de crypto-witwas en je eindproduct. Gebruik alles wat je leerde — en verzamel elke <code>NM{...}</code>-vlag.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de zaak, IP's (RFC 5737), domeinen en bedragen zijn verzonnen.</div>
        <div class="callout tip"><strong>Vlag 0:</strong> je bent begonnen. <code>NM{spiegelglas_geopend}</code>.</div>
      `,
      questions: [
        { q: 'Wat ga je in deze CTF doen?', options: ['Eén zaak van begin tot eind onderzoeken en per stap een vlag verzamelen', 'Alleen één vraag beantwoorden', 'Een echte server aanvallen', 'Niets'], answer: 0, explain: 'De CTF combineert al je datastromen-vaardigheden in één samenhangend onderzoek.' },
        { q: 'Welke vlag hoort bij de start?', answer: ['NM{spiegelglas_geopend}'], hint: 'Lees de tip-callout.', explain: 'De startvlag is NM{spiegelglas_geopend}.' },
      ],
    },
    {
      title: 'Taak 2 — Vlag 1: de entree (e-mailheader)',
      content: `
        <p>Het begon met een e-mail. Traceer de herkomst via de header: wat is het oorspronkelijke verzend-IP, en is het
        spoofing?</p>
        <div class="callout tip"><strong>Vlag 1:</strong> <code>NM{ctf_entree_getraceerd}</code>.</div>
      `,
      lab: {
        type: 'emailheader',
        title: 'de openingsmail',
        scenario: 'Traceer de oorsprong en bepaal of het spoofing is.',
        from: 'Leverancier Noord <facturen@leverancier-noord.nl>',
        returnPath: 'retour@mail.boos.nm.lab',
        hops: CTF_HOPS,
        auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' },
        ask: [
          { q: 'Wat is het oorspronkelijke verzend-IP?', answer: ['203.0.113.200'], hint: 'De onderste Received-regel.' },
          { q: 'Is dit spoofing? (ja/nee)', answer: ['ja'], hint: 'From vs Return-Path + SPF/DMARC.' },
        ],
      },
      questions: [
        { q: 'Wat is het oorspronkelijke verzend-IP?', answer: ['203.0.113.200'], hint: 'De onderste Received-regel.', explain: 'De keten begint bij 203.0.113.200 via mail.boos.nm.lab.' },
        { q: 'Waaruit blijkt de spoofing?', options: ['SPF/DMARC=fail en een Return-Path naar boos.nm.lab i.p.v. de leverancier', 'De mail is te lang', 'Er zit een bijlage bij', 'Niets'], answer: 0, explain: 'De authenticatie faalt en het antwoordadres klopt niet met de afzender.' },
        { q: 'Welke vlag hoort bij deze taak?', answer: ['NM{ctf_entree_getraceerd}'], hint: 'Lees de tip-callout.', explain: 'Vlag 1: NM{ctf_entree_getraceerd}.' },
      ],
    },
    {
      title: 'Taak 3 — Vlag 2: beaconing & exfiltratie (NetFlow)',
      content: `
        <p>De besmette werkplek verraadt zich in het egressverkeer. Vind het C2-baken en de exfiltratie.</p>
        <div class="callout tip"><strong>Vlag 2:</strong> <code>NM{ctf_exfil_betrapt}</code>.</div>
      `,
      lab: {
        type: 'netflow',
        title: 'egress van de besmette werkplek',
        scenario: 'Eén bestemming beacont, één slokt gigabytes op.',
        flows: CTF_FLOWS,
        ask: [
          { q: 'Welke bestemming wijst op data-exfiltratie?', answer: ['opslag-x9f3.nm.lab', 'opslag-x9f3', '203.0.113.201'], hint: 'Grootste uitgaande volume.' },
          { q: 'Met welk interval (seconden) beacont de werkplek?', answer: ['120', '120s'], hint: 'De kolom Interval bij het baken.' },
        ],
      },
      questions: [
        { q: 'Welke bestemming is het C2-baken?', answer: ['cdn-x.nm.lab', 'cdn-x', '203.0.113.150'], hint: 'Laagste jitter, veel kleine check-ins.', explain: 'cdn-x.nm.lab: 360 verbindingen, elke ~120s, jitter 5%.' },
        { q: 'Ongeveer hoeveel data lekte er weg?', answer: ['3.4 GB', '3.4', '3,4 GB', '3,4'], hint: 'De kolom Uit bij opslag-x9f3.nm.lab.', explain: 'Ongeveer 3,4 GB ging uitgaand naar opslag-x9f3.nm.lab.' },
        { q: 'Welke vlag hoort bij deze taak?', answer: ['NM{ctf_exfil_betrapt}'], hint: 'Lees de tip-callout.', explain: 'Vlag 2: NM{ctf_exfil_betrapt}.' },
      ],
    },
    {
      title: 'Taak 4 — Vlag 3: de structurering',
      content: `
        <p>De buit moest het systeem in. Betrap het structurering-patroon onder de meldgrens van € 10.000.</p>
        <div class="callout tip"><strong>Vlag 3:</strong> <code>NM{ctf_smurf_gevonden}</code>.</div>
      `,
      lab: {
        type: 'structuring',
        title: 'stortingen rond de meldgrens',
        threshold: 10000,
        currency: '€',
        scenario: 'Twee katvangers storten net onder de grens; één storting valt er juist boven.',
        tx: CTF_TX,
        ask: [
          { q: 'Hoeveel stortingen passen in het smurf-patroon?', answer: ['4', 'vier'], hint: 'De gemarkeerde rijen.' },
          { q: 'Wat is het totale gestructureerde bedrag? (getal)', answer: ['39000', '39.000'], hint: '9900+9800+9700+9600.' },
        ],
      },
      questions: [
        { q: 'Hoeveel stortingen zijn gestructureerd (net onder de grens)?', answer: ['4', 'vier'], hint: 'De rode rijen.', explain: 'Vier stortingen (9900, 9800, 9700, 9600) liggen net onder € 10.000.' },
        { q: 'Wat is het totale gestructureerde bedrag?', answer: ['39000', '39.000', '€ 39.000', '€39000'], hint: 'Tel de vier op.', explain: '9900 + 9800 + 9700 + 9600 = € 39.000.' },
        { q: 'Welke vlag hoort bij deze taak?', answer: ['NM{ctf_smurf_gevonden}'], hint: 'Lees de tip-callout.', explain: 'Vlag 3: NM{ctf_smurf_gevonden}.' },
      ],
    },
    {
      title: 'Taak 5 — Vlag 4: het geldspoor',
      content: `
        <p>Volg de gestructureerde € 39.000 via een verzamelrekening en een crypto-exchange naar de cash-out.</p>
        <div class="callout tip"><strong>Vlag 4:</strong> <code>NM{ctf_geldspoor_gevolgd}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'het geldspoor',
        unit: '€',
        scenario: 'De € 39.000 loopt via een verzamelrekening en een exchange naar een cash-out.',
        nodes: CTF_NODES,
        edges: CTF_EDGES,
        ask: [
          { q: 'Hoeveel komt er binnen op de verzamelrekening? (getal)', answer: ['39000', '39.000'], hint: 'Tel de twee stortingen op (klik de verzamelrekening).' },
          { q: 'Hoeveel bereikt de cash-out?', answer: ['38000', '38.000'], hint: 'De laatste transactie.' },
        ],
      },
      questions: [
        { q: 'Hoeveel komt er binnen op de verzamelrekening?', answer: ['39000', '39.000', '€ 39.000', '€39000'], hint: '19600 + 19400.', explain: '€ 19.600 + € 19.400 = € 39.000 — precies de gestructureerde buit.' },
        { q: 'Hoeveel bereikt de cash-out?', answer: ['38000', '38.000', '€ 38.000', '€38000'], hint: 'Na de afdrachten.', explain: 'Na € 500 (katvanger) + € 500 (exchange) blijft € 38.000 over.' },
        { q: 'Welke vlag hoort bij deze taak?', answer: ['NM{ctf_geldspoor_gevolgd}'], hint: 'Lees de tip-callout.', explain: 'Vlag 4: NM{ctf_geldspoor_gevolgd}.' },
      ],
    },
    {
      title: 'Taak 6 — Vlag 5: de crypto-taint',
      content: `
        <p>Een deel liep via crypto door een mixer. Reken de taint na: hoeveel vuil geld bereikt de exchange, en bij welk
        percentage?</p>
        <div class="callout tip"><strong>Vlag 5:</strong> <code>NM{ctf_taint_berekend}</code>.</div>
      `,
      lab: {
        type: 'chaintrace',
        title: 'taint door de mixer',
        unit: 'BTC',
        scenario: '6 BTC vuil + 6 BTC schoon door een mixer. Hoeveel vuil bereikt de exchange?',
        labels: CTF_LABELS,
        exchanges: ['EX'],
        origins: CTF_ORIGINS,
        txs: CTF_TXS,
        ask: [
          { q: 'Hoeveel vuil geld (BTC) bereikt de exchange?', answer: ['3', '3.0', '3 btc'], hint: 'Lees de taint-kolom bij de exchange.' },
          { q: 'Wat is het taint-percentage op de exchange? (in %)', answer: ['50%', '50', '50 %'], hint: '6 vuil + 6 schoon = 12, fractie 6/12.' },
        ],
      },
      questions: [
        { q: 'Hoeveel BTC vuil geld bereikt de exchange?', answer: ['3', '3.0', '3 btc'], hint: 'De tracer toont het bij de exchange.', explain: 'De mixer verdunde 6 vuil + 6 schoon tot 50%; uitbetaling 1 (6 BTC @ 50% = 3 BTC vuil) bereikt de exchange.' },
        { q: 'Verdween het vuile geld door het mengen?', options: ['Nee — het percentage zakt naar 50%, maar het vuile bedrag blijft bestaan', 'Ja, het is nu schoon', 'Ja, de mixer wist het', 'Dat hangt van de fee af'], answer: 0, explain: 'Verdunnen verlaagt het percentage, niet het vuile bedrag.' },
        { q: 'Welke vlag hoort bij deze taak?', answer: ['NM{ctf_taint_berekend}'], hint: 'Lees de tip-callout.', explain: 'Vlag 5: NM{ctf_taint_berekend}.' },
      ],
    },
    {
      title: 'Taak 7 — Vlag 6: het BLUF-eindproduct',
      content: `
        <p>Breng alles samen. Herschrijf de chronologische bevindingen naar een <strong>BLUF</strong>: conclusie en advies
        eerst, dan de onderbouwing — met waarschijnlijkheidstaal en een eigenaar per advies. Daarmee sluit je Operatie
        Spiegelglas af.</p>
        <div class="callout tip"><strong>Vlag 6 (slot):</strong> <code>NM{spiegelglas_gesloten}</code>.</div>
      `,
      lab: {
        type: 'bluf',
        source: CTF_BLUF_SOURCE,
        model: CTF_BLUF_MODEL,
      },
      questions: [
        { q: 'Wat hoort bovenaan een BLUF-product?', options: ['De conclusie en het advies (de kernboodschap)', 'De volledige chronologie', 'Alle IP-adressen', 'De namen van de analisten'], answer: 0, explain: 'Bottom Line Up Front: eerst wat er speelt en wat er moet gebeuren.' },
        { q: 'Hoe schrijf je de attributie in dit product?', options: ['Met waarschijnlijkheidstaal; de infrastructuur koppelen zonder een persoon hard te beschuldigen', 'Noem gewoon een naam', 'Laat attributie weg', 'Zeg dat het zeker een insider is'], answer: 0, explain: 'Het gedeelde certificaat koppelt infrastructuur (afgeleid); een persoon aanwijzen vraagt meer bewijs.' },
        { q: 'Welke slotvlag sluit Operatie Spiegelglas af?', answer: ['NM{spiegelglas_gesloten}'], hint: 'Lees de tip-callout.', explain: 'Slotvlag: NM{spiegelglas_gesloten}. Gefeliciteerd — je las de hele keten.' },
      ],
    },
  ],
});
