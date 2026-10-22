/* Room: Datastromen — capstone: Operatie Spiegelstroom (synthese) */

// =======================================================================
//  Alles FICTIEF: "Zuidkust Logistiek", de personen, rekeningen, IP's
//  (RFC 5737) en .nm.lab-domeinen zijn verzonnen. Eén samenhangende casus
//  die alle datastromen-vaardigheden samenbrengt tot een BLUF-product.
// =======================================================================

// --- Ordering: de volledige keten van phishing tot cash-out ---
const SP_STEPS = [
  { id: '1', label: 'BEC-phishingmail met nep-factuur bereikt de financiële afdeling (spoofing: SPF fail)' },
  { id: '2', label: 'Medewerker opent de bijlage; de malware nestelt zich op de werkplek (initial access)' },
  { id: '3', label: 'De malware meldt zich periodiek bij de C2 (beaconing) en wacht op opdrachten' },
  { id: '4', label: 'De aanvaller verkent het netwerk en vindt het klantenbestand' },
  { id: '5', label: 'Het klantenbestand wordt geëxfiltreerd naar externe opslag (groot uitgaand volume)' },
  { id: '6', label: 'Een frauduleuze betaalopdracht (€ 48.500) wordt namens de CFO verstuurd' },
  { id: '7', label: 'Het geld wordt via katvangers gestructureerd en doorgesluisd (layering)' },
  { id: '8', label: 'De buit gaat via een wisselkantoor naar een crypto cash-out in het buitenland' },
];

// --- Flow: het complete geldspoor van de frauduleuze betaling ---
const SP_NODES = [
  { id: 'bedrijf', type: 'victim', label: 'Zuidkust Logistiek (slachtoffer)' },
  { id: 'katvanger', type: 'account', label: 'Katvangerrekening' },
  { id: 'm1', type: 'mule', label: 'Money mule A' },
  { id: 'm2', type: 'mule', label: 'Money mule B' },
  { id: 'ex', type: 'exchange', label: 'Crypto-exchange' },
  { id: 'buiten', type: 'cashout', label: 'Buitenlandse cash-out' },
];
const SP_EDGES = [
  { from: 'bedrijf', to: 'katvanger', amount: 48500, time: 'dag 1', note: 'frauduleuze betaalopdracht namens de CFO' },
  { from: 'katvanger', to: 'm1', amount: 24000, time: 'dag 2', note: 'splitsing 1 (layering); katvanger houdt 500' },
  { from: 'katvanger', to: 'm2', amount: 24000, time: 'dag 2', note: 'splitsing 2 (layering)' },
  { from: 'm1', to: 'ex', amount: 23800, time: 'dag 3', note: 'mule houdt 200' },
  { from: 'm2', to: 'ex', amount: 23800, time: 'dag 3', note: 'mule houdt 200' },
  { from: 'ex', to: 'buiten', amount: 47000, time: 'dag 4', note: 'exchange houdt 600; uitbetaling buitenland (cash-out)' },
];

// --- ACH: wie zit achter Operatie Spiegelstroom? ---
const SP_HYPOS = ['Georganiseerde cybercrimegroep (BEC + witwasnetwerk)', 'Een ontevreden insider', 'Toeval: losse, niet-gerelateerde incidenten'];
const SP_EVIDENCE = [
  { text: 'Spoofing-mail, malware, exfiltratie én een frauduleuze betaling grijpen op elkaar in', expert: ['C', 'N', 'I'] },
  { text: 'Het geld loopt direct via meerdere katvangers naar een crypto cash-out', expert: ['C', 'I', 'I'] },
  { text: 'De C2-infrastructuur deelt een certificaat met een eerder BEC-dossier', expert: ['C', 'I', 'I'] },
  { text: 'De aanvaller kende de naam en schrijfstijl van de CFO', expert: ['C', 'C', 'I'] },
  { text: 'De exfiltratie gebeurde ’s nachts, buiten kantoortijden', expert: ['C', 'N', 'N'] },
];

const SP_BLUF_SOURCE = [
  'Dag 1 10:02 — BEC-phishingmail "openstaande factuur" bij de financiële afdeling; From cfo@zuidkust-logistiek.nl, maar SPF=fail en Return-Path naar mail.boos.nm.lab. Oorspronkelijk IP 203.0.113.88.',
  'Dag 1 10:14 — Medewerker opent bijlage factuur.pdf.exe; malware actief op werkplek FIN-07.',
  'Dag 1 10:15+ — Beaconing naar cdn-telemetry.nm.lab (203.0.113.50), elke 300s, lage jitter.',
  'Dag 1 02:40 (nacht) — ~180 MB klantenbestand geëxfiltreerd naar opslag-x9f3.nm.lab (203.0.113.77).',
  'Dag 1 16:20 — Frauduleuze betaalopdracht € 48.500 namens de CFO naar een katvangerrekening.',
  'Dag 2-4 — Geld gesplitst over twee money mules, via een crypto-exchange, cash-out in het buitenland (€ 47.000).',
  'Certificate transparency: de C2 deelt certificaat A1B2C3D4 met een eerder BEC-dossier.',
].join('\n');

const SP_BLUF_MODEL = [
  'BEOORDELING: Zeer waarschijnlijk is Zuidkust Logistiek getroffen door één georganiseerde cybercrimegroep die BEC-fraude combineert met een witwasnetwerk (betrouwbaarheid: hoog; de aanval-, exfiltratie- en geldstromen grijpen op elkaar in en delen infrastructuur).',
  'ONDERBOUWING: de spoofing-mail (SPF fail), de beaconing en nachtelijke exfiltratie, en de frauduleuze betaling van € 48.500 die via katvangers naar een crypto cash-out liep, vormen één keten. Het gedeelde certificaat A1B2C3D4 koppelt de C2 aan een eerder BEC-dossier (afgeleid, geen zekere attributie van een persoon).',
  'ADVIES (eigenaar): (1) Terugboeking/kickback aanvragen — eigenaar: bank/betalingsverkeer. (2) Werkplek FIN-07 isoleren en forensisch veiligstellen, IOCs blokkeren — eigenaar: SOC/CSIRT. (3) Aangifte en vordering richting de crypto-exchange (KYC) — eigenaar: politie/OM. (4) Awareness + DMARC afdwingen op afrejectie — eigenaar: IT/CISO.',
].join('\n\n');

CS.registerRoom({
  id: 'operatie-spiegelstroom',
  path: 'datastromen',
  order: 7,
  title: 'Capstone: Operatie Spiegelstroom',
  icon: '🌊',
  difficulty: 'Moeilijk',
  minutes: 70,
  summary: 'De proef op de som voor dit pad. Eén samenhangende, fictieve zaak — van een BEC-phishingmail via malware-exfiltratie tot een frauduleuze betaling die wordt witgewassen — waarin je alle datastromen-vaardigheden samenbrengt: de keten reconstrueren, het geldspoor volgen tot de cash-out, de attributie wegen met ACH en een bruikbaar BLUF-product schrijven.',
  objectives: [
    'Losse bevindingen (e-mail, netwerk, betaling) tot één samenhangende keten reconstrueren',
    'Het volledige geldspoor volgen van de frauduleuze betaling tot de cash-out',
    'De attributie onderbouwen met ACH en gedeelde infrastructuur (certificaat)',
    'Een BLUF-intelligenceproduct schrijven met conclusie eerst, waarschijnlijkheidstaal en een eigenaar per advies',
    'De juiste interventies en hun eigenaren benoemen',
  ],
  terms: [
    { term: 'BEC', def: 'Business Email Compromise: fraude waarbij een aanvaller zich voordoet als een leidinggevende of leverancier om een betaling te laten doen.' },
    { term: 'Keten (kill chain)', def: 'De opeenvolgende fasen van een aanval, van initiële toegang tot het uiteindelijke doel (hier: de cash-out).' },
    { term: 'Exfiltratie', def: 'Het wegsluizen van data naar buiten, vaak ’s nachts of in brokken.' },
    { term: 'Layering', def: 'De witwasfase waarin de herkomst wordt versluierd met veel transacties en omzettingen.' },
    { term: 'Cash-out-knelpunt', def: 'De plek waar het geld het systeem verlaat (exchange, buitenlandse rekening); het sterkste aangrijpingspunt voor opsporing.' },
    { term: 'Certificate transparency', def: 'Openbare logs van TLS-certificaten waarmee je een hergebruikt certificaat over dossiers terugvindt (zeldzaamheidstoets).' },
    { term: 'ACH', def: 'Analysis of Competing Hypotheses: hypothesen weerleggen; wat de minste inconsistenties heeft, blijft het sterkst.' },
    { term: 'BLUF', def: 'Bottom Line Up Front: conclusie en advies bovenaan, onderbouwing eronder.' },
  ],
  resources: [
    { title: 'FBI — Business Email Compromise', url: 'https://www.ic3.gov/' },
    { title: 'NCSC — incidentrespons', url: 'https://www.ncsc.nl/' },
    { title: 'FIU-Nederland', url: 'https://www.fiu-nederland.nl/' },
    { title: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De casus',
      content: `
        <p><strong>Zuidkust Logistiek</strong> (fictief, Rotterdam) meldt een verdachte betaling van <strong>€ 48.500</strong>.
        Jij krijgt losse bevindingen op je bureau: een alarmerende e-mail, vreemd netwerkverkeer van één werkplek, en een
        geldspoor dat het land uit loopt. Jouw taak: maak er één verhaal van, volg het geld, weeg wie erachter zit en lever
        een kort, bruikbaar product.</p>
        <p>Dit is de <strong>capstone</strong> van het Datastromen-pad: je gebruikt alles wat je leerde over e-mailherkomst,
        netwerkstromen en witwassen — nu in één zaak.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> het bedrijf, de personen, de IP's (RFC 5737) en de
        <code>.nm.lab</code>-domeinen zijn verzonnen. Je oefent de werkwijze, je volgt geen echte zaak.</div>
        <div class="callout tip"><strong>Beloning:</strong> maak van losse sporen één keten. Vlag: <code>NM{een_keten_een_verhaal}</code>.</div>
      `,
      questions: [
        { q: 'Wat is het doel van deze capstone?', options: ['Losse bevindingen tot één keten verbinden en een bruikbaar product leveren', 'Zoveel mogelijk tools los uitproberen', 'Eén vlag raden', 'De malware zelf schrijven'], answer: 0, explain: 'Synthese is de kern: van losse sporen naar één verhaal, een geldspoor en een advies.' },
        { q: 'Welk type fraude staat centraal in deze zaak?', options: ['BEC (Business Email Compromise)', 'Ransomware', 'DDoS', 'Cryptojacking'], answer: 0, explain: 'Een aanvaller doet zich voor als de CFO om een betaling te laten doen: dat is BEC.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{een_keten_een_verhaal}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{een_keten_een_verhaal}.' },
      ],
    },
    {
      title: 'Taak 2 — Reconstrueer de keten',
      content: `
        <p>Je hebt acht losse bevindingen. Zet ze in de juiste volgorde, van de eerste toegang tot de uiteindelijke
        cash-out. Denk in fasen: eerst binnenkomen, dan verkennen en stelen, dan het geld eruit halen en wegsluizen.</p>
        <div class="callout tip"><strong>Beloning:</strong> de juiste volgorde onthult de vlag: <code>NM{keten_gereconstrueerd}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de keten van Operatie Spiegelstroom',
        prompt: 'Zet de acht fasen in de juiste volgorde: van de phishingmail tot de cash-out.',
        items: SP_STEPS,
        correct: ['1', '2', '3', '4', '5', '6', '7', '8'],
        flag: 'NM{keten_gereconstrueerd}',
        explain: 'De keten: phishing → initial access → beaconing → verkenning → exfiltratie → frauduleuze betaling → structurering → cash-out.',
      },
      questions: [
        { q: 'Wat is de eerste fase van de keten?', options: ['De BEC-phishingmail die de financiële afdeling bereikt', 'De exfiltratie van het klantenbestand', 'De frauduleuze betaling', 'De cash-out'], answer: 0, explain: 'Alles begint bij de phishingmail: zonder initial access geen vervolg.' },
        { q: 'Wat gebeurt er vlak vóór de cash-out?', options: ['Het geld wordt via katvangers gestructureerd en doorgesluisd (layering)', 'De malware nestelt zich', 'De phishingmail komt binnen', 'Het netwerk wordt verkend'], answer: 0, explain: 'Layering via katvangers gaat vooraf aan de uiteindelijke cash-out in het buitenland.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{keten_gereconstrueerd}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{keten_gereconstrueerd}.' },
      ],
    },
    {
      title: 'Taak 3 — Volg het geldspoor',
      content: `
        <p>De frauduleuze betaling van <strong>€ 48.500</strong> verdween snel. Volg het spoor in het lab: van het bedrijf
        via een katvangerrekening en twee money mules naar een crypto-exchange, en uiteindelijk het land uit. Let op hoeveel
        er onderweg "blijft hangen" en waar het geld het systeem verlaat.</p>
        <div class="callout tip"><strong>Beloning:</strong> vind de cash-out. Vlag: <code>NM{spoor_tot_de_grens}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'het geldspoor van de frauduleuze betaling',
        unit: '€',
        scenario: 'De € 48.500 loopt via een katvanger en twee mules naar een crypto-exchange en het buitenland.',
        nodes: SP_NODES,
        edges: SP_EDGES,
        ask: [
          { q: 'Hoeveel bedroeg de frauduleuze betaling? (alleen het getal)', answer: ['48500', '48.500'], hint: 'De eerste transactie, van het bedrijf.' },
          { q: 'Hoeveel bereikt de crypto-exchange in totaal?', answer: ['47600', '47.600'], hint: 'Tel beide mule-stromen op (klik de exchange aan).' },
          { q: 'Hoeveel komt er uiteindelijk bij de buitenlandse cash-out aan?', answer: ['47000', '47.000'], hint: 'De laatste transactie.' },
        ],
      },
      questions: [
        { q: 'Hoeveel geld bereikt de crypto-exchange in totaal?', answer: ['47600', '47.600', '€ 47.600', '€47600'], hint: '23.800 (mule A) + 23.800 (mule B).', explain: '€ 23.800 + € 23.800 = € 47.600 komt binnen bij de exchange.' },
        { q: 'Hoeveel komt er bij de buitenlandse cash-out aan?', answer: ['47000', '47.000', '€ 47.000', '€47000'], hint: 'De exchange hield 600 in.', explain: 'Na de exchange-fee van € 600 blijft € 47.000 over bij de cash-out.' },
        { q: 'Hoeveel bleef er in totaal als vergoeding/commissie hangen in de keten?', answer: ['1500', '1.500', '€ 1.500', '€1500'], hint: '48.500 betaald, 47.000 eruit.', explain: 'Katvanger 500 + mule A 200 + mule B 200 + exchange 600 = € 1.500.' },
        { q: 'Waar grijpt de opsporing het sterkst aan?', options: ['Bij de crypto-exchange en de buitenlandse cash-out (KYC/vordering)', 'Bij de phishingmail', 'Bij de katvanger', 'Nergens'], answer: 0, explain: 'De cash-out koppelt de keten aan een identiteit (KYC) en jurisdictie; daar werkt een vordering of rechtshulpverzoek.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{spoor_tot_de_grens}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{spoor_tot_de_grens}.' },
      ],
    },
    {
      title: 'Taak 4 — Wie en wat? (ACH)',
      content: `
        <p>Drie sporen, één vraag: zit hier één georganiseerde groep achter, een insider, of is het toeval? Weeg het met
        <strong>ACH</strong>. Let vooral op het bewijs dat de hypothesen <em>uit elkaar trekt</em> — zoals de gedeelde
        C2-infrastructuur (een certificaat dat ook in een eerder BEC-dossier opdook).</p>
        <div class="callout tip"><strong>Beloning:</strong> kies de houdbaarste hypothese. Vlag: <code>NM{een_groep_een_keten}</code>.</div>
      `,
      lab: {
        type: 'ach',
        title: 'wie zit achter Operatie Spiegelstroom?',
        hypotheses: SP_HYPOS,
        evidence: SP_EVIDENCE,
      },
      questions: [
        { q: 'Welke hypothese blijft het sterkst overeind?', options: ['Georganiseerde cybercrimegroep (BEC + witwasnetwerk)', 'Een ontevreden insider', 'Toeval: losse incidenten', 'Niet te bepalen'], answer: 0, explain: 'De samenhang tussen aanval, exfiltratie en geldstroom plus de gedeelde C2-infrastructuur passen alleen bij één georganiseerde groep.' },
        { q: 'Welk bewijs trekt de hypothesen het sterkst uit elkaar (is het meest diagnostisch)?', options: ['De C2 deelt een certificaat met een eerder BEC-dossier', 'De exfiltratie gebeurde ’s nachts', 'De aanvaller kende de naam van de CFO', 'Er was een phishingmail'], answer: 0, explain: 'Een gedeeld, zeldzaam certificaat koppelt deze zaak aan georganiseerde activiteit en sluit "toeval" en "insider" vrijwel uit.' },
        { q: 'Hoe schrijf je de attributie verantwoord op?', options: ['Met waarschijnlijkheidstaal; een specifieke persoon niet aanwijzen zonder bewijs', 'Noem gewoon een naam', 'Laat attributie weg', 'Zeg dat het zeker een insider is'], answer: 0, explain: 'Je benoemt de best passende hypothese met waarschijnlijkheidstaal en vermijdt een onbewezen persoonsattributie.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{een_groep_een_keten}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{een_groep_een_keten}.' },
      ],
    },
    {
      title: 'Taak 5 — Lever het BLUF-product',
      content: `
        <p>Tot slot het échte werk van een analist: een kort, bruikbaar product. Herschrijf de chronologische bevindingen
        naar een <strong>BLUF</strong>: de conclusie en het advies bovenaan, daarna de onderbouwing — met
        <strong>waarschijnlijkheidstaal</strong> en een <strong>eigenaar per advies</strong>. De checklist is heuristisch
        (geen AI-beoordeling); de inhoudelijke kwaliteit beoordeel je zelf of met een collega.</p>
        <div class="callout tip"><strong>Beloning:</strong> conclusie eerst, eigenaar per advies. Vlag: <code>NM{bottom_line_up_front}</code>.</div>
      `,
      lab: {
        type: 'bluf',
        source: SP_BLUF_SOURCE,
        model: SP_BLUF_MODEL,
      },
      questions: [
        { q: 'Wat hoort in een BLUF-product bovenaan?', options: ['De conclusie en het advies (de kernboodschap)', 'De volledige chronologie', 'Alle IP-adressen', 'De namen van de analisten'], answer: 0, explain: 'BLUF = Bottom Line Up Front: eerst wat er aan de hand is en wat er moet gebeuren.' },
        { q: 'Waarom benoem je een eigenaar per advies?', options: ['Zodat duidelijk is wie welke actie uitvoert — anders gebeurt er niets', 'Om het product langer te maken', 'Omdat het verplicht is', 'Om de analist te beschermen'], answer: 0, explain: 'Een advies zonder actiehouder blijft liggen; de eigenaar maakt het uitvoerbaar.' },
        { q: 'Welke interventie hoort bij de eigenaar "bank/betalingsverkeer"?', options: ['Terugboeking/kickback van de frauduleuze betaling aanvragen', 'Werkplek FIN-07 isoleren', 'Aangifte doen bij de politie', 'DMARC afdwingen'], answer: 0, explain: 'Snelheid telt: een kickback-verzoek bij de bank kan de betaling soms nog terughalen.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{bottom_line_up_front}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{bottom_line_up_front}.' },
      ],
    },
  ],
});
