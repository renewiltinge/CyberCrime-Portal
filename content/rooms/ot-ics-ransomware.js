/* Room: Defensief — OT/ICS & ransomware op kritieke infrastructuur */

// =======================================================================
//  Alles FICTIEF: een verzonnen fabriek/incident. Je leert waarom OT
//  anders is dan IT en hoe je kritieke infra beschermt.
// =======================================================================

// --- Connections: IT vs OT ---
const OT_GROUPS = [
  { name: 'IT-systemen', items: ['Kantoor-pc', 'E-mailserver', 'Active Directory', 'Webserver'] },
  { name: 'OT/ICS-systemen', items: ['PLC (aansturing)', 'SCADA-server', 'HMI (bedienpaneel)', 'Historian (procesdata)'] },
  { name: 'Gevolg van een OT-aanval', items: ['Productielijn stilgelegd', 'Veiligheidssysteem uit', 'Fysieke schade', 'Gevaar voor mens/omgeving'] },
  { name: 'OT-bescherming', items: ['IT/OT-segmentatie', 'Unidirectionele gateway', 'Geen directe internettoegang', 'Streng wijzigingsbeheer'] },
];

// --- Ordering: de weg van IT naar OT ---
const OT_STEPS = [
  { id: '1', label: 'Phishing geeft de aanvaller toegang tot het IT-kantoornetwerk' },
  { id: '2', label: 'De aanvaller beweegt lateraal en vindt de koppeling tussen IT en OT' },
  { id: '3', label: 'Zwakke segmentatie laat een doorsteek naar het OT-netwerk toe' },
  { id: '4', label: 'De aanvaller bereikt de SCADA/HMI-laag' },
  { id: '5', label: 'Commando\'s naar de PLC\'s verstoren het fysieke proces' },
  { id: '6', label: 'De productie ligt stil / de veiligheid is in gevaar; er volgt een losgeldeis' },
];

// --- Scenario: beslissen in een OT-incident ---
const OT_SCEN = [
  {
    situation: 'Ransomware raast door het IT-netwerk van de fabriek; de productie (OT) draait nog. Wat is je eerste zorg?',
    choices: [
      { label: 'De koppeling tussen IT en OT dichtzetten zodat het OT-netwerk beschermd blijft', good: true, feedback: 'Precies: isoleer OT van het besmette IT-netwerk om het fysieke proces veilig te houden.' },
      { label: 'Alle OT-systemen meteen uitzetten', good: false, feedback: 'Een harde noodstop kan zelf gevaarlijk zijn. Isoleer gericht; coördineer met OT-engineers.' },
      { label: 'Niets doen — het is "alleen IT"', good: false, feedback: 'Zonder segmentatie springt ransomware over naar OT. Handel juist nu om dat te voorkomen.' },
    ],
  },
  {
    situation: 'In OT geldt een andere prioriteitsvolgorde dan in IT. Welke?',
    choices: [
      { label: 'Beschikbaarheid en veiligheid (safety) gaan vóór vertrouwelijkheid', good: true, feedback: 'Juist: in OT kan downtime of een uitgeschakelde beveiliging levens kosten. Safety eerst.' },
      { label: 'Vertrouwelijkheid eerst, net als in IT', good: false, feedback: 'In OT is de CIA-driehoek omgedraaid: availability/safety boven confidentiality.' },
      { label: 'Snelheid van patchen eerst', good: false, feedback: 'Patchen in OT is juist lastig (24/7-processen); het vraagt planning en test, geen haast.' },
    ],
  },
  {
    situation: 'Een getroffen PLC hapert. Mag je hem zomaar herstarten of patchen zoals een pc?',
    choices: [
      { label: 'Nee — coördineer met de OT-engineers; een herstart kan het fysieke proces en de veiligheid raken', good: true, feedback: 'Precies: in OT heeft elke actie fysieke gevolgen. Nooit "even herstarten" zonder OT-kennis.' },
      { label: 'Ja, gewoon herstarten — dat lost meestal alles op', good: false, feedback: 'Een blinde herstart kan een proces ontregelen of een veiligheidsfunctie uitschakelen.' },
      { label: 'Direct een firmware-update forceren', good: false, feedback: 'Ongeteste updates op draaiende OT zijn riskant; dit vergt zorgvuldig wijzigingsbeheer.' },
    ],
  },
  {
    situation: 'Hoe voorkom je dat IT-ransomware volgende keer OT raakt?',
    choices: [
      { label: 'Strikte netwerksegmentatie met een unidirectionele gateway tussen IT en OT', good: true, feedback: 'Goed: een sterke IT/OT-scheiding (en eenrichtingskoppeling) stopt de oversprong.' },
      { label: 'IT en OT in één plat netwerk zetten voor het gemak', good: false, feedback: 'Een plat netwerk laat ransomware vrij overspringen — precies wat je wilt voorkomen.' },
      { label: 'OT direct aan internet hangen voor remote beheer', good: false, feedback: 'Directe internettoegang tot OT is een groot risico; gebruik strikte, bewaakte toegang.' },
    ],
  },
];

CS.registerRoom({
  id: 'ot-ics-ransomware',
  path: 'defensief',
  order: 9,
  title: 'OT/ICS & ransomware op kritieke infra',
  icon: '🏭',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Fabrieken, ziekenhuizen, waterzuiveringen en energienetten draaien op OT (operationele techniek): PLC\'s, SCADA en HMI\'s. Daar heeft een cyberaanval fysieke gevolgen. Je leert waarom OT fundamenteel anders beveiligd wordt dan IT, hoe ransomware via het kantoornetwerk naar OT springt, en hoe je dat tegenhoudt — met de veiligheid (safety) altijd voorop.',
  objectives: [
    'IT- en OT-systemen onderscheiden en benoemen',
    'Uitleggen waarom in OT beschikbaarheid/veiligheid vóór vertrouwelijkheid gaan',
    'De aanvalsweg van IT naar OT reconstrueren',
    'De juiste beslissingen nemen in een OT-incident (isoleren, coördineren)',
    'OT beschermen met segmentatie, unidirectionele koppeling en wijzigingsbeheer',
  ],
  terms: [
    { term: 'OT', def: 'Operational Technology: de techniek die fysieke processen aanstuurt en meet (fabriek, net, zuivering).' },
    { term: 'ICS', def: 'Industrial Control System: de besturingssystemen binnen OT.' },
    { term: 'PLC', def: 'Programmable Logic Controller: stuurt kleppen, motoren en sensoren direct aan.' },
    { term: 'SCADA', def: 'Supervisory Control and Data Acquisition: het systeem dat processen bewaakt en bedient.' },
    { term: 'HMI', def: 'Human-Machine Interface: het bedienpaneel waarmee operators het proces aansturen.' },
    { term: 'Purdue-model', def: 'Een referentiemodel dat IT en OT in lagen (zones) scheidt, met strikte koppelingen ertussen.' },
    { term: 'Safety vs. security', def: 'In OT staat fysieke veiligheid (safety) voorop; een beveiligingsmaatregel mag die nooit in gevaar brengen.' },
    { term: 'Unidirectionele gateway', def: 'Een koppeling die data maar één kant op laat (bijv. OT → IT voor monitoring), zodat een aanval niet terug kan.' },
  ],
  resources: [
    { title: 'NCSC — vitale infrastructuur', url: 'https://www.ncsc.nl/' },
    { title: 'MITRE ATT&CK for ICS', url: 'https://attack.mitre.org/matrices/ics/' },
    { title: 'CISA — Industrial Control Systems', url: 'https://www.cisa.gov/topics/industrial-control-systems' },
    { title: 'ENISA — OT/ICS security', url: 'https://www.enisa.europa.eu/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Waarom OT anders is',
      content: `
        <p>In de IT-wereld draait beveiliging vooral om <strong>data</strong>. In de <strong>OT</strong>-wereld draait het om
        <strong>fysieke processen</strong>: een klep die opengaat, een turbine die draait, een infuus dat loopt. Een aanval
        heeft daar <em>fysieke</em> gevolgen — stilstand, schade, of gevaar voor mensen. Daarom is de prioriteit omgedraaid:
        <strong>beschikbaarheid en veiligheid (safety) gaan vóór vertrouwelijkheid</strong>.</p>
        <p>Dat maakt OT lastig te beveiligen: systemen draaien 24/7 en zijn moeilijk te patchen, apparatuur is soms decennia
        oud, en "even herstarten" kan een proces ontregelen. De grootste dreiging: ransomware die via het
        <strong>IT-kantoornetwerk</strong> naar OT springt als de scheiding zwak is.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de fabriek en het incident zijn verzonnen oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> in OT staat veiligheid voorop. Vlag: <code>NM{safety_gaat_voor}</code>.</div>
      `,
      questions: [
        { q: 'Wat is het verschil tussen IT en OT?', options: ['IT draait om data; OT stuurt fysieke processen aan, met fysieke gevolgen bij een aanval', 'Er is geen verschil', 'OT is alleen software', 'IT is gevaarlijker'], answer: 0, explain: 'In OT kan een aanval leiden tot stilstand, schade of gevaar — niet "alleen" dataverlies.' },
        { q: 'Welke prioriteit geldt in OT?', options: ['Beschikbaarheid en veiligheid (safety) vóór vertrouwelijkheid', 'Vertrouwelijkheid eerst', 'Snelheid eerst', 'Kosten eerst'], answer: 0, explain: 'De CIA-driehoek is in OT omgedraaid: availability/safety boven confidentiality.' },
        { q: 'Waarom is patchen in OT lastig?', options: ['Systemen draaien 24/7, zijn vaak oud, en een herstart kan het proces ontregelen', 'Omdat het te duur is', 'Omdat OT geen software heeft', 'Dat is het niet'], answer: 0, explain: 'Continu draaiende, soms verouderde systemen maken ongeplande wijzigingen riskant.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{safety_gaat_voor}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{safety_gaat_voor}.' },
      ],
    },
    {
      title: 'Taak 2 — IT versus OT',
      content: `
        <p>Groepeer de zestien begrippen: welke zijn <strong>IT-systemen</strong>, welke <strong>OT/ICS-systemen</strong>, wat
        zijn de <strong>gevolgen</strong> van een OT-aanval, en wat zijn de <strong>beschermingen</strong>?</p>
        <div class="callout tip"><strong>Beloning:</strong> ken het verschil, bescherm de koppeling. Vlag: <code>NM{it_ot_gescheiden}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'IT/OT: begrippen → categorie',
        prompt: 'Vind de vier groepen van vier.',
        groups: OT_GROUPS,
      },
      questions: [
        { q: 'Welke hoort bij OT/ICS?', options: ['PLC', 'E-mailserver', 'Active Directory', 'Kantoor-pc'], answer: 0, explain: 'Een PLC stuurt het fysieke proces aan en is een kern-OT-component.' },
        { q: 'Wat doet een unidirectionele gateway?', options: ['Laat data maar één kant op (bijv. OT → IT), zodat een aanval niet terug kan', 'Versnelt het netwerk', 'Versleutelt e-mail', 'Blokkeert alle data'], answer: 0, explain: 'Eenrichtingsverkeer laat monitoring toe zonder een terugweg voor een aanvaller.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{it_ot_gescheiden}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{it_ot_gescheiden}.' },
      ],
    },
    {
      title: 'Taak 3 — Van IT-phishing naar het fysieke proces',
      content: `
        <p>Een OT-incident begint zelden in OT zelf. Zet de stappen op volgorde: van een phishingmail in het kantoornetwerk
        tot commando's die het fysieke proces verstoren. Zie je waar de <strong>segmentatie</strong> de keten had moeten
        breken?</p>
        <div class="callout tip"><strong>Beloning:</strong> de oversprong zit bij de zwakke scheiding. Vlag: <code>NM{it_naar_ot_pad}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de weg van IT naar OT',
        prompt: 'Zet de zes stappen op volgorde, van phishing tot verstoord proces.',
        items: OT_STEPS,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{it_naar_ot_pad}',
        explain: 'Phishing (IT) → lateraal → IT/OT-doorsteek → SCADA/HMI → PLC-commando\'s → proces verstoord/losgeld.',
      },
      questions: [
        { q: 'Waar begint het incident meestal?', options: ['In het IT-kantoornetwerk (bijv. via phishing)', 'In de PLC zelf', 'Bij de HMI', 'In de cloud'], answer: 0, explain: 'De toegang komt meestal via IT; de sprong naar OT volgt als de scheiding zwak is.' },
        { q: 'Welke stap had de keten het best gebroken?', options: ['Strikte IT/OT-segmentatie die de doorsteek blokkeert', 'Een snellere PLC', 'Een langer wachtwoord op de HMI', 'Meer e-mail'], answer: 0, explain: 'Zonder doorsteek van IT naar OT bereikt de aanvaller het fysieke proces niet.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{it_naar_ot_pad}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{it_naar_ot_pad}.' },
      ],
    },
    {
      title: 'Taak 4 — Beslissen in het incident',
      content: `
        <p>Nu jij. Loop door vier beslismomenten van een OT-incident en kies telkens de verstandigste optie — met de veiligheid
        voorop. Drie van de vier goed = je houdt het proces veilig.</p>
        <div class="callout tip"><strong>Beloning:</strong> isoleren, coördineren, safety eerst. Vlag: <code>NM{ot_incident_veilig}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'ransomware bij de fabriek',
        scenario: 'Vier beslismomenten in een OT-incident. Kies met safety voorop.',
        steps: OT_SCEN,
        pass: 3,
        flag: 'NM{ot_incident_veilig}',
      },
      questions: [
        { q: 'Ransomware in IT, de fabriek draait nog. Eerste zorg?', options: ['De IT/OT-koppeling dichtzetten om OT te beschermen', 'Alle OT uitzetten', 'Niets, het is alleen IT', 'De PLC herstarten'], answer: 0, explain: 'Isoleer OT van het besmette IT-netwerk; een harde noodstop kan zelf gevaarlijk zijn.' },
        { q: 'Mag je een haperende PLC zomaar herstarten?', options: ['Nee — coördineer met OT-engineers; het raakt het fysieke proces en de veiligheid', 'Ja, net als een pc', 'Ja, met een firmware-update', 'Alleen \'s nachts'], answer: 0, explain: 'Elke actie in OT heeft fysieke gevolgen; nooit blind herstarten of patchen.' },
        { q: 'Hoe voorkom je de oversprong volgende keer?', options: ['Strikte segmentatie met een unidirectionele gateway tussen IT en OT', 'IT en OT in één plat netwerk', 'OT aan internet hangen', 'Niets'], answer: 0, explain: 'Een sterke IT/OT-scheiding stopt dat ransomware van IT naar OT springt.' },
        { q: 'Welke vlag hoort bij een goede afhandeling?', answer: ['NM{ot_incident_veilig}'], hint: 'Verschijnt bij ≥3/4 goed / staat in de tip-callout.', explain: 'De vlag is NM{ot_incident_veilig}.' },
      ],
    },
  ],
});
