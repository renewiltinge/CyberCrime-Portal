/* Room: Security-kern — fraudevormen herkennen (helpdesk, marktplaats, investering, spoofing) */

// =======================================================================
//  Alles FICTIEF: verzonnen scenario's, personen en bedragen. Je oefent
//  het herkennen van fraudepatronen zodat je ze (en anderen) beschermt.
// =======================================================================

// --- Connections: koppel de signalen aan de juiste fraudevorm ---
const FV_GROUPS = [
  { name: 'Helpdeskfraude (bankhelpdesk)', items: ['Belt zogenaamd van de bank', 'Vraagt je in te loggen via AnyDesk', '"Uw rekening is gehackt"', 'Zet uw geld op een "kluisrekening"'] },
  { name: 'Marktplaatsfraude', items: ['Te mooie prijs om waar te zijn', 'Betaal €0,01 via een verificatielink', 'Chatten buiten het platform', 'Nep-bezorg-betaalpagina'] },
  { name: 'Investeringsfraude', items: ['Gegarandeerd hoog rendement', 'Crypto-"coach" via WhatsApp', 'Nep-dashboard dat winst toont', 'Druk om snel méér te storten'] },
  { name: 'CEO-/spoofingfraude', items: ['Spoofed afzender of beller-ID', '"Spoedbetaling, strikt vertrouwelijk"', 'Verzoek lijkt van de directeur', 'Buiten de normale procedure om'] },
];

// --- Ordering: het crime script van helpdeskfraude ---
const FV_STEPS = [
  { id: '1', label: 'Fraudeur verzamelt gegevens (naam, bank) uit een datalek of via OSINT' },
  { id: '2', label: 'Belt het slachtoffer en doet zich voor als bankmedewerker' },
  { id: '3', label: 'Creëert urgentie en angst: "uw rekening is gehackt"' },
  { id: '4', label: 'Laat het slachtoffer remote software (AnyDesk) installeren' },
  { id: '5', label: 'Laat het slachtoffer inloggen of codes doorgeven' },
  { id: '6', label: 'Sluist het geld naar een katvangerrekening' },
  { id: '7', label: 'Het geld wordt via money mules contant opgenomen' },
];

// --- Flow: de geldstroom na een geslaagde helpdeskfraude ---
const FV_NODES = [
  { id: 'v', type: 'victim', label: 'Slachtoffer' },
  { id: 'kat', type: 'account', label: 'Katvangerrekening' },
  { id: 'mule', type: 'mule', label: 'Money mule' },
  { id: 'cash', type: 'cashout', label: 'Contante opname' },
];
const FV_EDGES = [
  { from: 'v', to: 'kat', amount: 8000, time: '14:30', note: 'slachtoffer "beveiligt" geld op een kluisrekening' },
  { from: 'kat', to: 'mule', amount: 7700, time: '14:45', note: 'katvanger houdt 300' },
  { from: 'mule', to: 'cash', amount: 7500, time: '15:10', note: 'mule houdt 200; contant opgenomen' },
];

CS.registerRoom({
  id: 'fraudevormen',
  path: 'security-kern',
  order: 7,
  title: 'Fraudevormen herkennen',
  icon: '🎭',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Fraude draait niet om techniek maar om de mens: urgentie, autoriteit en afleiding. Je leert de vier vormen die je het vaakst tegenkomt — helpdeskfraude, marktplaatsfraude, investeringsfraude en CEO-/spoofingfraude — herkennen aan hun signalen, je ontleedt het "crime script" van helpdeskfraude, volgt de geldstroom en leert de simpele regels die bijna alles tegenhouden.',
  objectives: [
    'De vier veelvoorkomende fraudevormen herkennen aan hun kenmerkende signalen',
    'De rode draad benoemen: urgentie, autoriteit en handelen buiten officiële kanalen',
    'Het crime script van helpdeskfraude in de juiste volgorde zetten',
    'De geldstroom na fraude volgen via katvanger en mule tot de cash-out',
    'De gouden regels toepassen die slachtofferschap voorkomen',
  ],
  terms: [
    { term: 'Social engineering', def: 'Mensen manipuleren om iets te doen of prijs te geven, in plaats van techniek te kraken.' },
    { term: 'Helpdeskfraude', def: 'Een "bankmedewerker" belt, creëert paniek en laat je geld "veiligstellen" op een rekening van de fraudeur.' },
    { term: 'Marktplaatsfraude', def: 'Fraude rond online kopen/verkopen: nepkopers/-verkopers, valse betaallinks en betaalpagina\'s.' },
    { term: 'Investeringsfraude', def: 'Beloftes van gegarandeerd hoog rendement (vaak crypto) met een nep-platform en druk om te blijven storten.' },
    { term: 'CEO-fraude / spoofing', def: 'Een nagebootste directeur of leverancier vraagt om een spoedbetaling, buiten de normale procedure om.' },
    { term: 'Urgentie & autoriteit', def: 'De twee krachtigste hefbomen van fraude: tijdsdruk schakelt je nadenken uit, een "autoriteit" schakelt je twijfel uit.' },
    { term: 'Katvanger / money mule', def: 'Iemand die zijn rekening uitleent om gestolen geld door te sluizen, vaak tegen een vergoeding.' },
    { term: 'Kluisrekening-truc', def: 'De leugen dat je geld "veilig" op een aparte rekening gezet moet worden — die rekening is van de fraudeur.' },
  ],
  resources: [
    { title: 'Fraudehelpdesk — herkennen en melden', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'Politie — fraude en oplichting', url: 'https://www.politie.nl/informatie/fraude.html' },
    { title: 'Veilig bankieren (Betaalvereniging Nederland)', url: 'https://www.veiligbankieren.nl/' },
    { title: 'AFM — waarschuwingen beleggingsfraude', url: 'https://www.afm.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De rode draad van alle fraude',
      content: `
        <p>Fraudeurs kraken zelden techniek — ze kraken <strong>mensen</strong>. Vier vormen kom je het vaakst tegen:</p>
        <ul>
          <li><strong>Helpdeskfraude</strong> — een "bankmedewerker" belt, creëert paniek en laat je geld "veiligstellen".</li>
          <li><strong>Marktplaatsfraude</strong> — nepkopers/-verkopers, valse betaallinks en betaalpagina's.</li>
          <li><strong>Investeringsfraude</strong> — gegarandeerd hoog rendement, een nep-platform en druk om te storten.</li>
          <li><strong>CEO-/spoofingfraude</strong> — een nagebootste directeur vraagt om een geheime spoedbetaling.</li>
        </ul>
        <p>Hoe verschillend ook, de hefbomen zijn steeds dezelfde: <strong>urgentie</strong> (tijdsdruk schakelt je nadenken
        uit), <strong>autoriteit</strong> (een "bank" of "baas" schakelt je twijfel uit) en een duw om te handelen
        <strong>buiten de officiële kanalen</strong> om.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de scenario's en bedragen zijn verzonnen oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> urgentie + autoriteit + buiten de kanalen = fraude. Vlag:
        <code>NM{urgentie_en_autoriteit}</code>.</div>
      `,
      questions: [
        { q: 'Wat is de gemeenschappelijke hefboom achter deze fraudevormen?', options: ['Urgentie en autoriteit, en handelen buiten officiële kanalen om', 'Een zwak wachtwoord', 'Een verouderde browser', 'Een slechte firewall'], answer: 0, explain: 'Fraude is social engineering: tijdsdruk en een "autoriteit" zetten je gezonde verstand opzij.' },
        { q: 'Waarom werkt tijdsdruk zo goed voor een fraudeur?', options: ['Onder druk denk je minder kritisch na en controleer je niet', 'Omdat computers sneller zijn', 'Omdat de bank dicht is', 'Omdat het wettelijk moet'], answer: 0, explain: 'Haast schakelt reflectie uit; daarom pushen fraudeurs altijd op "nu meteen".' },
        { q: 'Wat is bij al deze vormen een rode vlag?', options: ['Een verzoek om buiten de normale/officiële weg te handelen', 'Een e-mail met een logo', 'Een telefoontje overdag', 'Een bericht in het Nederlands'], answer: 0, explain: 'Echte organisaties volgen procedures; "doe het stiekem/nu/anders" is juist verdacht.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{urgentie_en_autoriteit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{urgentie_en_autoriteit}.' },
      ],
    },
    {
      title: 'Taak 2 — Koppel de signalen aan de fraudevorm',
      content: `
        <p>Elk type fraude heeft zijn eigen verraderlijke signalen. Groepeer de zestien signalen in de vier fraudevormen
        waar ze bij horen.</p>
        <div class="callout tip"><strong>Beloning:</strong> vier vormen, vier signaalsets. Vlag: <code>NM{signalen_gekoppeld}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'signalen → fraudevorm',
        prompt: 'Vind de vier groepen van vier: welke signalen horen bij welke fraudevorm?',
        groups: FV_GROUPS,
      },
      questions: [
        { q: 'Een beller zegt "van de bank" te zijn en vraagt je AnyDesk te installeren. Welke fraude?', options: ['Helpdeskfraude', 'Marktplaatsfraude', 'Investeringsfraude', 'CEO-fraude'], answer: 0, explain: 'Remote software + "de bank" + paniek is het handtekeningpatroon van helpdeskfraude.' },
        { q: 'Een "coach" belooft via WhatsApp gegarandeerd rendement en toont een dashboard met winst. Welke fraude?', options: ['Investeringsfraude', 'Helpdeskfraude', 'Marktplaatsfraude', 'CEO-fraude'], answer: 0, explain: 'Gegarandeerd rendement + nep-dashboard + stortdruk = investeringsfraude.' },
        { q: 'Een "verkoper" wil €0,01 via een verificatielink en chat buiten het platform. Welke fraude?', options: ['Marktplaatsfraude', 'CEO-fraude', 'Helpdeskfraude', 'Investeringsfraude'], answer: 0, explain: 'De €0,01-verificatietruc en het platform verlaten zijn klassieke marktplaatsfraude.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{signalen_gekoppeld}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{signalen_gekoppeld}.' },
      ],
    },
    {
      title: 'Taak 3 — Het crime script van helpdeskfraude',
      content: `
        <p>Fraude is geen toeval maar een <strong>script</strong>: een vaste reeks stappen. Als je het script kent, herken je
        de fraude al halverwege — en weet je waar je hem kunt breken. Zet de stappen van helpdeskfraude op volgorde.</p>
        <div class="callout tip"><strong>Beloning:</strong> ken het script, breek het script. Vlag: <code>NM{ken_het_script}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'het crime script van helpdeskfraude',
        prompt: 'Zet de zeven stappen op volgorde, van voorbereiding tot cash-out.',
        items: FV_STEPS,
        correct: ['1', '2', '3', '4', '5', '6', '7'],
        flag: 'NM{ken_het_script}',
        explain: 'Gegevens verzamelen → bellen → urgentie → remote software → codes → doorsluizen → contant opnemen.',
      },
      questions: [
        { q: 'Wat is meestal de eerste stap?', options: ['Gegevens verzamelen (datalek/OSINT) om geloofwaardig over te komen', 'Het geld opnemen', 'Remote software installeren', 'Bellen met een spoedbetaling'], answer: 0, explain: 'Met jouw naam en bank klinkt de fraudeur betrouwbaar — die voorbereiding komt eerst.' },
        { q: 'Op welk moment kun je de fraude het makkelijkst breken?', options: ['Zodra iemand je onder druk remote software of codes laat geven: ophangen en zelf de bank bellen', 'Pas nadat het geld is opgenomen', 'Nooit', 'Alleen de bank kan dat'], answer: 0, explain: 'De stap "codes/remote toegang" is het kantelpunt; stoppen en zelf verifiëren breekt het script.' },
        { q: 'Waarom laat de fraudeur je AnyDesk installeren?', options: ['Om mee te kijken en zelf handelingen op jouw rekening te doen', 'Om je computer sneller te maken', 'Om een update te installeren', 'Om de bank te bellen'], answer: 0, explain: 'Met remote toegang ziet en bestuurt de fraudeur jouw scherm — levensgevaarlijk bij bankieren.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{ken_het_script}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{ken_het_script}.' },
      ],
    },
    {
      title: 'Taak 4 — Volg het geld',
      content: `
        <p>Na een geslaagde helpdeskfraude verdwijnt het geld snel: van het slachtoffer naar een
        <strong>katvangerrekening</strong>, via een <strong>money mule</strong>, en contant het systeem uit. Volg de stroom
        en zie waarom snelheid (direct de bank bellen om te blokkeren) zo belangrijk is.</p>
        <div class="callout tip"><strong>Beloning:</strong> snelheid redt het geld. Vlag: <code>NM{bel_direct_de_bank}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'de geldstroom na helpdeskfraude',
        unit: '€',
        scenario: 'Het slachtoffer "beveiligt" € 8.000; het loopt via een katvanger en mule naar een contante opname.',
        nodes: FV_NODES,
        edges: FV_EDGES,
        ask: [
          { q: 'Hoeveel werd er uiteindelijk contant opgenomen? (alleen het getal)', answer: ['7500', '7.500'], hint: 'De laatste transactie.' },
          { q: 'Naar welk type rekening ging het geld eerst?', answer: ['katvangerrekening', 'katvanger', 'de katvangerrekening'], hint: 'Het eerste knooppunt na het slachtoffer.' },
        ],
      },
      questions: [
        { q: 'Hoeveel werd er uiteindelijk contant opgenomen?', answer: ['7500', '7.500', '€ 7.500', '€7500'], hint: 'De laatste transactie in de keten.', explain: 'Na vergoedingen voor katvanger (300) en mule (200) bleef € 7.500 over om contant op te nemen.' },
        { q: 'Waarom is snel handelen (direct de bank bellen) cruciaal?', options: ['Zolang het geld nog op de katvangerrekening staat, kan de bank het soms blokkeren', 'Omdat de bank anders sluit', 'Omdat de rente oploopt', 'Dat maakt niet uit'], answer: 0, explain: 'Elke stap verder is het geld moeilijker terug te halen; snelheid vergroot de kans op blokkeren.' },
        { q: 'Wat is een "katvanger" in deze keten?', options: ['Iemand die zijn rekening uitleent om gestolen geld door te sluizen', 'De bankmedewerker', 'Het slachtoffer', 'De politie'], answer: 0, explain: 'Een katvanger/money mule verhuurt zijn rekening — soms uit nood, soms uit onwetendheid, en is zelf ook strafbaar.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{bel_direct_de_bank}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{bel_direct_de_bank}.' },
      ],
    },
    {
      title: 'Taak 5 — De gouden regels',
      content: `
        <p>Bijna alle fraude strandt op een paar simpele gewoontes:</p>
        <ul>
          <li>De <strong>bank vraagt nooit</strong> om je pincode, volledige inlogcodes of om software te installeren.</li>
          <li><strong>Hang op en bel zelf terug</strong> via het nummer op je bankpas of de officiële site — nooit het
          nummer dat zij geven.</li>
          <li><strong>Geen druk accepteren.</strong> Echt belangrijk? Dan mag het ook over vijf minuten, nadat je het hebt
          geverifieerd.</li>
          <li><strong>Geld "veiligstellen" bestaat niet.</strong> Een kluisrekening van de bank waar jij geld naartoe moet
          maken, is altijd fraude.</li>
          <li><strong>Betaal nooit €0,01 via een "verificatielink"</strong> en verlaat nooit het platform om te betalen.</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> ophangen en zelf terugbellen. Vlag: <code>NM{hang_op_bel_zelf}</code>.</div>
      `,
      questions: [
        { q: 'Wat is de veiligste reactie op een "bankmedewerker" die belt met spoed?', options: ['Ophangen en zelf terugbellen via het officiële nummer', 'De gevraagde codes geven om tijd te winnen', 'AnyDesk installeren zodat ze kunnen helpen', 'Snel het geld overmaken'], answer: 0, explain: 'Zelf terugbellen via een vertrouwd nummer doorbreekt de hele fraude in één stap.' },
        { q: 'Je moet geld "veiligstellen" op een aparte rekening. Wat is dit?', options: ['Altijd fraude — zo\'n kluisrekening-truc bestaat niet', 'Normale bankprocedure', 'Een slim idee', 'Alleen nodig bij grote bedragen'], answer: 0, explain: 'De bank laat je nooit geld naar een andere rekening "beveiligen"; dat is per definitie oplichting.' },
        { q: 'Een verkoper vraagt je €0,01 te betalen via een linkje "ter verificatie". Wat doe je?', options: ['Niet doen — dit is een phishinglink om je bankgegevens te stelen', 'Betalen, het is maar een cent', 'Je pincode doorgeven', 'Buiten het platform verder chatten'], answer: 0, explain: 'De "1-cent-verificatie" is een phishingtruc; de link leidt naar een nep-inlogpagina.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{hang_op_bel_zelf}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{hang_op_bel_zelf}.' },
      ],
    },
  ],
});
