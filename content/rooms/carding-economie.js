/* Room: Intelligence — carding & de fraude-economie (rollen, markten, geldstroom) */

// =======================================================================
//  Alles FICTIEF en EDUCATIEF: deze room legt de criminele economie en de
//  verdediging uit. Geen handleiding om fraude te plegen — de nadruk ligt
//  op herkennen, volgen en tegenhouden.
// =======================================================================

// --- Connections: begrijp de economie in vier categorieën ---
const CA_GROUPS = [
  { name: 'Rollen in de keten', items: ['Carder', 'Vendor (dataverkoper)', 'Reshipping mule', 'Cash-out specialist'] },
  { name: 'Soorten kaartdata', items: ['Dump (magneetspoor)', 'CVV (nummer + code)', 'Fullz (volledig profiel)', 'BIN (uitgevende bank)'] },
  { name: 'Hoe kaartdata wordt verkregen', items: ['Skimming (pinautomaat)', 'Magecart (webshop-skim)', 'Phishing', 'Groot datalek'] },
  { name: 'Cash-out-methoden', items: ['Giftcards kopen', 'Reshipping van goederen', 'Doorverkopen met korting', 'Omzetten in crypto'] },
];

// --- Flow: de waarde-erosie van gestolen kaart tot cash ---
const CA_NODES = [
  { id: 'card', type: 'victim', label: 'Gestolen kaart (€ 2.000 limiet)' },
  { id: 'merch', type: 'merchant', label: 'Online winkel (goederen besteld)' },
  { id: 'mule', type: 'mule', label: 'Reshipping mule' },
  { id: 'resale', type: 'service', label: 'Doorverkoop-kanaal' },
  { id: 'cash', type: 'cashout', label: 'Cash-out' },
];
const CA_EDGES = [
  { from: 'card', to: 'merch', amount: 2000, time: 'dag 1', note: 'voor € 2.000 aan goederen besteld met de gestolen kaart' },
  { from: 'merch', to: 'mule', amount: 2000, time: 'dag 3', note: 'goederen verzonden naar een reshipping-adres' },
  { from: 'mule', to: 'resale', amount: 2000, time: 'dag 5', note: 'mule stuurt door naar het doorverkoop-kanaal' },
  { from: 'resale', to: 'cash', amount: 1400, time: 'dag 8', note: 'doorverkocht voor ~70%: € 1.400 cash' },
];

CS.registerRoom({
  id: 'carding-economie',
  path: 'intelligence',
  order: 11,
  title: 'Carding & de fraude-economie',
  icon: '💳',
  difficulty: 'Gemiddeld',
  minutes: 55,
  summary: 'Achter één frauduleuze afschrijving zit een hele economie. Je leert de rollen (carder, dataverkoper, reshipping mule, cash-out), de soorten gestolen kaartdata en hoe ze worden verkregen, je ontleedt het carding-"crime script", en je volgt hoe gestolen waarde onderweg erodeert tot cash. Afsluitend: de techniek en gewoontes die carding tegenhouden. Educatief en defensief — geen handleiding.',
  objectives: [
    'De rollen in de carding-economie benoemen en aan elkaar relateren',
    'Soorten kaartdata (dump, CVV, fullz, BIN) en verwervingsmethoden onderscheiden',
    'Het carding-delict als crime script ontleden en de zwakste schakel kiezen',
    'De waarde-erosie van gestolen kaart tot cash-out volgen',
    'De verdediging benoemen: EMV-chip, 3-D Secure, tokenisatie en fraudemonitoring',
  ],
  terms: [
    { term: 'Carding', def: 'Het frauduleus gebruiken van gestolen betaalkaartgegevens om goederen, giftcards of geld te verkrijgen.' },
    { term: 'Dump', def: 'De data van de magneetstrip van een kaart (track 1/2), waarmee een fysieke kaart kan worden nagemaakt.' },
    { term: 'CVV', def: 'In carding-jargon: kaartnummer + vervaldatum + CVV-code, genoeg voor online aankopen (card-not-present).' },
    { term: 'Fullz', def: 'Een volledig profiel van een slachtoffer (naam, adres, geboortedatum, kaart, soms BSN) — meer waard dan losse kaartdata.' },
    { term: 'BIN', def: 'Bank Identification Number: de eerste cijfers die de uitgevende bank/kaartsoort verraden; carders filteren hierop.' },
    { term: 'Reshipping mule', def: 'Iemand die (vaak misleid) met gestolen kaarten gekochte goederen ontvangt en doorstuurt, om het echte adres te verbergen.' },
    { term: 'Magecart', def: 'Kwaadaardige scripts die in een webshop-afrekenpagina kaartgegevens meelezen (digitale skimming).' },
    { term: 'EMV-chip', def: 'De chip op je kaart; maakt het klonen van de magneetstrip waardeloos voor betalingen aan de terminal.' },
    { term: '3-D Secure', def: 'Extra verificatie (bijv. een push in je bank-app) bij online betalen, tegen card-not-present-fraude.' },
    { term: 'Tokenisatie', def: 'Het kaartnummer vervangen door een token (bijv. in Apple/Google Pay), zodat de echte gegevens nooit bij de winkel komen.' },
  ],
  resources: [
    { title: 'Europol — payment fraud', url: 'https://www.europol.europa.eu/' },
    { title: 'Krebs on Security — carding en skimming', url: 'https://krebsonsecurity.com/' },
    { title: 'PCI Security Standards Council', url: 'https://www.pcisecuritystandards.org/' },
    { title: 'Betaalvereniging Nederland — veilig betalen', url: 'https://www.betaalvereniging.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Een hele economie achter één afschrijving',
      content: `
        <p>Een frauduleuze afschrijving op je rekening lijkt één gebeurtenis, maar erachter zit een hele
        <strong>arbeidsdeling</strong>. De een steelt de data (via skimming, een webshop-skim of een datalek), de ander
        <strong>verkoopt</strong> hem op een markt, een <strong>carder</strong> koopt en gebruikt hem, een
        <strong>reshipping mule</strong> verbergt het echte adres, en een <strong>cash-out specialist</strong> maakt er
        bruikbaar geld van. Net als een legale economie: specialisatie maakt het efficiënt — en kwetsbaar op de knooppunten.</p>
        <p>Deze room is <strong>educatief en defensief</strong>. Je leert de economie herkennen, volgen en tegenhouden —
        niet hoe je hem gebruikt. Juist omdat je de keten begrijpt, zie je waar hij breekt.</p>
        <div class="callout warn"><strong>Alles fictief en educatief:</strong> geen handleiding om fraude te plegen; de nadruk
        ligt op begrijpen en verdedigen.</div>
        <div class="callout tip"><strong>Beloning:</strong> achter één afschrijving zit een keten. Vlag: <code>NM{een_keten_van_specialisten}</code>.</div>
      `,
      questions: [
        { q: 'Wat kenmerkt de carding-economie?', options: ['Arbeidsdeling: gespecialiseerde rollen die samen de keten vormen', 'Eén persoon doet alles alleen', 'Het is volledig geautomatiseerd zonder mensen', 'Er is geen geld mee gemoeid'], answer: 0, explain: 'Specialisatie (stelen, verkopen, carden, reshippen, cash-out) maakt het efficiënt — en biedt aangrijppunten.' },
        { q: 'Wat doet een reshipping mule?', options: ['Ontvangt met gestolen kaarten gekochte goederen en stuurt ze door, om het echte adres te verbergen', 'Steelt de kaartdata', 'Maakt de website', 'Beheert de bank'], answer: 0, explain: 'De mule zet een tussenstap tussen de koop en de echte bestemming — vaak zonder te beseffen dat het fraude is.' },
        { q: 'Waarom is deze room defensief ingestoken?', options: ['Om de keten te leren herkennen en tegenhouden, niet om hem te gebruiken', 'Omdat carding legaal is', 'Omdat het niet voorkomt', 'Dat is het niet'], answer: 0, explain: 'Inzicht in de economie dient opsporing en verdediging; het is geen operationele handleiding.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{een_keten_van_specialisten}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{een_keten_van_specialisten}.' },
      ],
    },
    {
      title: 'Taak 2 — De bouwstenen van de economie',
      content: `
        <p>Om de keten te volgen moet je de taal kennen. Groepeer de zestien begrippen in vier categorieën: de
        <strong>rollen</strong>, de soorten <strong>kaartdata</strong>, hoe die data wordt <strong>verkregen</strong>, en de
        <strong>cash-out-methoden</strong>.</p>
        <div class="callout tip"><strong>Beloning:</strong> ken de taal van de economie. Vlag: <code>NM{taal_van_de_economie}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'begrippen → categorie',
        prompt: 'Vind de vier groepen van vier: rollen, kaartdata, verwerving en cash-out.',
        groups: CA_GROUPS,
      },
      questions: [
        { q: 'Wat is het verschil tussen een "dump" en een "CVV"?', options: ['Een dump is magneetstripdata (fysiek klonen); een CVV is nummer+code voor online (card-not-present)', 'Ze zijn hetzelfde', 'Een dump is een wachtwoord', 'Een CVV is een bank'], answer: 0, explain: 'Een dump dient voor fysieke kaarten aan terminals; een CVV voor online betalingen.' },
        { q: 'Wat is een BIN?', options: ['Het Bank Identification Number: de eerste cijfers die bank/kaartsoort verraden', 'Een reshipping-adres', 'Een soort mule', 'Een cash-out-methode'], answer: 0, explain: 'Carders filteren op BIN om kaarten van bepaalde banken/landen te selecteren.' },
        { q: 'Wat is Magecart?', options: ['Kwaadaardige scripts die kaartgegevens meelezen op een webshop-afrekenpagina', 'Een legale betaalmethode', 'Een reshipping-dienst', 'Een type giftcard'], answer: 0, explain: 'Magecart is digitale skimming: de data wordt bij het afrekenen online afgetapt.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{taal_van_de_economie}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{taal_van_de_economie}.' },
      ],
    },
    {
      title: 'Taak 3 — Het carding-crime-script',
      content: `
        <p>Ontleed carding als een <strong>crime script</strong>: per fase wie wat doet, met welke middelen, waar, onder welke
        randvoorwaarden en welke sporen het nalaat — én een <strong>interventie</strong> die de keten in die fase breekt. Vul
        de fasen in; met "Toon een voorbeelduitwerking" vergelijk je achteraf.</p>
        <div class="callout tip"><strong>Beloning:</strong> elke fase heeft een zwakke plek. Vlag: <code>NM{elke_fase_een_interventie}</code>.</div>
      `,
      lab: {
        type: 'crimescript',
        title: 'carding van data tot cash',
        scenario: 'Een carder koopt gestolen kaartdata, bestelt goederen, laat ze via een reshipping mule doorsturen en verkoopt ze door voor cash.',
        phases: ['1 · Voorbereiding (data kopen)', '2 · Toegang (kaart gebruiken)', '3 · Uitvoering (bestellen)', '4 · Buit veiligstellen (reshipping)', '5 · Na afloop (sporen)', '6 · Cash-out (doorverkoop)'],
        model: '<ul><li><strong>Voorbereiding:</strong> carder koopt CVV/fullz op een shop, filtert op BIN. Interventie: shops verstoren, BIN-monitoring bij banken.</li><li><strong>Toegang:</strong> kaart testen met een kleine aankoop. Interventie: 3-D Secure, anomaliedetectie op testbetalingen.</li><li><strong>Uitvoering:</strong> dure, courante goederen bestellen. Interventie: fraudescoring, verzendadres ≠ factuuradres markeren.</li><li><strong>Reshipping:</strong> mule ontvangt en stuurt door. Interventie: mules herkennen/voorlichten, adrespatronen detecteren.</li><li><strong>Sporen:</strong> wegwerp-e-mail, VPN, gemengde betaling. Interventie: device-fingerprinting, correlatie over bestellingen.</li><li><strong>Cash-out:</strong> doorverkopen voor ~70%. Interventie: marktplaatsmonitoring, chargeback-processen.</li></ul>',
      },
      questions: [
        { q: 'Wat levert een crime script op voor de verdediging?', options: ['Per fase een aangrijppunt (interventie) om de keten te breken', 'Een handleiding om zelf te carden', 'Een lijst met slachtoffers', 'Niets bruikbaars'], answer: 0, explain: 'Door het delict in fasen te ontleden, zie je in elke fase een mogelijke interventie.' },
        { q: 'Welke interventie past bij de "toegang/kaart testen"-fase?', options: ['3-D Secure en anomaliedetectie op kleine testbetalingen', 'Een reshipping mule inhuren', 'De giftcards doorverkopen', 'Niets'], answer: 0, explain: 'Carders testen vaak eerst met een klein bedrag; extra verificatie en detectie daarop breekt de keten vroeg.' },
        { q: 'Waarom is het verzendadres ≠ factuuradres een nuttig signaal?', options: ['Het wijst vaak op reshipping/fraude en kan een bestelling laten markeren', 'Het betekent altijd een cadeau', 'Het is irrelevant', 'Het versnelt de levering'], answer: 0, explain: 'Afwijkende adressen zijn een klassiek fraudesignaal dat fraudescoring meeweegt.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{elke_fase_een_interventie}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{elke_fase_een_interventie}.' },
      ],
    },
    {
      title: 'Taak 4 — De waarde erodeert',
      content: `
        <p>Crimineel verdiende waarde lekt weg onderweg. Volg in het lab hoe € 2.000 "gestolen limiet" via goederen, een
        reshipping mule en een doorverkoop-kanaal eindigt als een veel kleiner bedrag cash. Die erosie (en de vele
        tussenschakels) is precies waar opsporing en fraudepreventie kunnen aangrijpen.</p>
        <div class="callout tip"><strong>Beloning:</strong> gestolen waarde smelt tot cash. Vlag: <code>NM{waarde_smelt_tot_cash}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'van gestolen kaart tot cash',
        unit: '€',
        scenario: 'De waarde van een gestolen kaart (€ 2.000) erodeert via goederen en doorverkoop tot cash.',
        nodes: CA_NODES,
        edges: CA_EDGES,
        ask: [
          { q: 'Hoeveel cash houdt de fraudeur netto over van € 2.000 gestolen waarde? (alleen het getal)', answer: ['1400', '1.400'], hint: 'De laatste transactie (doorverkoop ~70%).' },
          { q: 'Welke schakel verbergt het echte afleveradres?', answer: ['reshipping mule', 'mule', 'de reshipping mule'], hint: 'Het knooppunt tussen de winkel en de doorverkoop.' },
        ],
      },
      questions: [
        { q: 'Hoeveel cash levert € 2.000 gestolen waarde netto op?', answer: ['1400', '1.400', '€ 1.400', '€1400'], hint: 'Doorverkoop voor ~70%.', explain: 'Door de doorverkoop tegen ~70% blijft ongeveer € 1.400 cash over — de rest is "verlies".' },
        { q: 'Waarom is de waarde-erosie nuttig voor de verdediging?', options: ['De vele tussenschakels en de erosie bieden aangrijppunten om te detecteren en te onderbreken', 'Omdat het de fraudeur rijker maakt', 'Omdat het niets uitmaakt', 'Omdat het de kaart herstelt'], answer: 0, explain: 'Elke schakel (merchant, mule, doorverkoop) is een plek waar monitoring of een chargeback kan ingrijpen.' },
        { q: 'Welke rol maakt cashen van goederen mogelijk zonder het echte adres te tonen?', options: ['De reshipping mule', 'De uitgevende bank', 'De kaarthouder', 'De webshop'], answer: 0, explain: 'De mule ontvangt en stuurt door, zodat het eindadres van de fraudeur verborgen blijft.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{waarde_smelt_tot_cash}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{waarde_smelt_tot_cash}.' },
      ],
    },
    {
      title: 'Taak 5 — De verdediging',
      content: `
        <p>De economie klinkt geolied, maar de verdediging is de afgelopen jaren sterk verbeterd — en dat zie je in de cijfers.
        De belangrijkste lagen:</p>
        <ul>
          <li><strong>EMV-chip</strong> maakt het klonen van de magneetstrip waardeloos aan de terminal.</li>
          <li><strong>3-D Secure</strong> voegt bij online betalen een extra verificatie toe (push in je bank-app) tegen
          card-not-present-fraude.</li>
          <li><strong>Tokenisatie</strong> (Apple/Google Pay) zorgt dat je echte kaartnummer nooit bij de winkel komt.</li>
          <li><strong>Fraudemonitoring</strong> scoort transacties op anomalieën (afwijkend bedrag, land, adres) en blokkeert
          of vraagt om verificatie.</li>
          <li>Als consument: <strong>controleer je afschriften</strong>, gebruik <strong>virtuele/wegwerpkaarten</strong> voor
          online, en meld fraude meteen (chargeback).</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> chip, 3-D Secure en tokenisatie samen. Vlag: <code>NM{lagen_breken_de_keten}</code>.</div>
      `,
      questions: [
        { q: 'Wat maakt een gekloonde magneetstrip waardeloos aan de terminal?', options: ['De EMV-chip', 'Een langer wachtwoord', 'Een snellere kassa', 'Een giftcard'], answer: 0, explain: 'EMV-chiptransacties zijn niet te reproduceren uit magneetstripdata, dus klonen loont niet meer.' },
        { q: 'Wat doet 3-D Secure?', options: ['Voegt bij online betalen een extra verificatie toe (bijv. push in de bank-app)', 'Versnelt de levering', 'Vervangt je pincode', 'Maakt kaarten gratis'], answer: 0, explain: '3-D Secure vraagt een tweede bevestiging, wat card-not-present-fraude sterk bemoeilijkt.' },
        { q: 'Waarom helpt tokenisatie (Apple/Google Pay)?', options: ['Je echte kaartnummer komt nooit bij de winkel; een gelekt token is nutteloos', 'Het maakt betalen langzamer maar veiliger', 'Het verhoogt je limiet', 'Het is hetzelfde als een magneetstrip'], answer: 0, explain: 'De winkel krijgt alleen een token; lekt dat, dan is er geen bruikbaar kaartnummer gestolen.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{lagen_breken_de_keten}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{lagen_breken_de_keten}.' },
      ],
    },
  ],
});
