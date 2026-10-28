/* Room: Intelligence — IoT-botnet & de DDoS-economie */

// =======================================================================
//  Alles FICTIEF: verzonnen diensten en bedragen. Educatief/defensief —
//  je leert botnets en DDoS herkennen en tegenhouden, niet bouwen.
// =======================================================================

// --- Ordering: de levenscyclus van een IoT-botnet ---
const BD_STEPS = [
  { id: '1', label: 'Een scanner zoekt op internet naar IoT-apparaten met standaardwachtwoorden' },
  { id: '2', label: 'Een kwetsbaar apparaat wordt geïnfecteerd (een loader plaatst de bot)' },
  { id: '3', label: 'De bot meldt zich bij de command-and-control (C2)' },
  { id: '4', label: 'Het botnet wordt te huur aangeboden via een booter/stresser-dienst' },
  { id: '5', label: 'Een klant bestelt (en betaalt voor) een DDoS-aanval op een doelwit' },
  { id: '6', label: 'Het doelwit gaat offline; soms volgt afpersing (ransom-DDoS)' },
];

// --- Connections: begrijp de DDoS-wereld ---
const BD_GROUPS = [
  { name: 'DDoS-typen', items: ['Volumetrisch (bandbreedte vol)', 'Protocol (SYN-flood)', 'Applicatielaag (HTTP-flood)', 'Amplificatie (DNS/NTP)'] },
  { name: 'Botnet-onderdelen', items: ['Geïnfecteerde IoT-camera', 'C2-server', 'Loader/dropper', 'Scanner (default creds)'] },
  { name: 'De DDoS-dienst (markt)', items: ['Booter/stresser', 'Abonnement per maand', 'Betaling in crypto', '"Stress-test je eigen server"-smoes'] },
  { name: 'Mitigatie', items: ['Scrubbing-center', 'Rate limiting', 'Anycast-spreiding', 'Upstream-filtering (ISP)'] },
];

// --- Flow: de booter-economie ---
const BD_NODES = [
  { id: 'klant', type: 'account', label: 'Klant (huurt een aanval)' },
  { id: 'booter', type: 'service', label: 'Booter/stresser-dienst' },
  { id: 'infra', type: 'service', label: 'Gehuurde bots & bandbreedte' },
  { id: 'crypto', type: 'cashout', label: 'Crypto-winst operator' },
];
const BD_EDGES = [
  { from: 'klant', to: 'booter', amount: 50, time: 'maand 1', note: 'maandabonnement voor "stresstests"' },
  { from: 'booter', to: 'infra', amount: 30, time: 'maand 1', note: 'kosten voor infra/bandbreedte' },
  { from: 'booter', to: 'crypto', amount: 20, time: 'maand 1', note: 'winst operator (crypto)' },
];

CS.registerRoom({
  id: 'botnet-ddos-economie',
  path: 'intelligence',
  order: 13,
  title: 'IoT-botnet & de DDoS-economie',
  icon: '🌐',
  difficulty: 'Gemiddeld',
  minutes: 45,
  summary: 'Slecht beveiligde IoT-apparaten vormen samen een wapen. Je leert hoe een botnet ontstaat (scannen, infecteren, C2), hoe DDoS-aanvallen werken en als dienst te huur zijn (booters/stressers), hoe het geld daar loopt, en welke mitigaties een aanval opvangen. Educatief en defensief.',
  objectives: [
    'De levenscyclus van een IoT-botnet benoemen (scan → infectie → C2 → verhuur → aanval)',
    'De DDoS-typen onderscheiden (volumetrisch, protocol, applicatielaag, amplificatie)',
    'Uitleggen hoe booter/stresser-diensten DDoS als dienst aanbieden',
    'De geldstroom in de DDoS-economie volgen',
    'Mitigaties kiezen en je eigen IoT uit een botnet houden',
  ],
  terms: [
    { term: 'Botnet', def: 'Een netwerk van geïnfecteerde apparaten dat op afstand bestuurd wordt (bijv. voor DDoS of spam).' },
    { term: 'IoT', def: 'Internet of Things: camera\'s, routers, printers en andere apparaten online — vaak met zwakke standaardwachtwoorden.' },
    { term: 'C2', def: 'Command-and-control: de server waarmee de bots contact houden voor opdrachten.' },
    { term: 'DDoS', def: 'Distributed Denial of Service: een doelwit overspoelen met verkeer vanaf vele bronnen zodat het onbereikbaar wordt.' },
    { term: 'Amplificatie', def: 'Een klein verzoek naar een open server (DNS/NTP) uitlokken met een vervalst bron-IP, zodat een groot antwoord naar het slachtoffer gaat.' },
    { term: 'Booter/stresser', def: 'Een (illegale) dienst die DDoS-aanvallen te huur aanbiedt, vermomd als "stresstest-dienst".' },
    { term: 'Ransom-DDoS', def: 'Afpersing: betaal, anders (blijft) de aanval.' },
    { term: 'Scrubbing-center', def: 'Een dienst die het aanvalsverkeer "schoonwast" en alleen legitiem verkeer doorlaat.' },
  ],
  resources: [
    { title: 'NCSC — DDoS en weerbaarheid', url: 'https://www.ncsc.nl/' },
    { title: 'Cloudflare — wat is een DDoS-aanval', url: 'https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/' },
    { title: 'Nationale Beheersorganisatie Internet Providers (NBIP) — anti-DDoS', url: 'https://www.nbip.nl/' },
    { title: 'Europol — booter-takedowns', url: 'https://www.europol.europa.eu/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Van losse apparaten naar een wapen',
      content: `
        <p>Een enkele slecht beveiligde IP-camera is vooral een risico voor de eigenaar. Maar <em>honderdduizenden</em> ervan
        samen vormen een <strong>botnet</strong>: een leger van geïnfecteerde apparaten dat een aanvaller op afstand bestuurt.
        De klassieke route: een <strong>scanner</strong> zoekt apparaten met <strong>standaardwachtwoorden</strong>, een
        <strong>loader</strong> infecteert ze, en de bots melden zich bij de <strong>C2</strong>.</p>
        <p>Dat leger wordt verhuurd voor <strong>DDoS</strong>-aanvallen — vaak kant-en-klaar via een
        <strong>booter/stresser</strong>-dienst, vermomd als "stresstest". Het is een hele economie, met abonnementen en
        crypto-betalingen. Jij leert de keten herkennen, het geld volgen en de aanval mitigeren.</p>
        <div class="callout warn"><strong>Alles fictief en defensief:</strong> de diensten en bedragen zijn verzonnen. Deze
        room leert herkennen en tegenhouden, niet bouwen.</div>
        <div class="callout tip"><strong>Beloning:</strong> zwakke IoT wordt andermans wapen. Vlag: <code>NM{iot_wordt_wapen}</code>.</div>
      `,
      questions: [
        { q: 'Wat is een botnet?', options: ['Een netwerk van geïnfecteerde apparaten dat op afstand bestuurd wordt', 'Een firewall', 'Een soort back-up', 'Een wachtwoordmanager'], answer: 0, explain: 'Een botnet is een op afstand bestuurd leger van bots, inzetbaar voor o.a. DDoS.' },
        { q: 'Hoe komen de meeste IoT-apparaten in een botnet?', options: ['Via standaardwachtwoorden die nooit gewijzigd zijn', 'Door een dure exploit', 'Door fysieke diefstal', 'Dat kan niet'], answer: 0, explain: 'Standaard/ zwakke wachtwoorden op IoT zijn de klassieke ingang (bijv. Mirai-stijl).' },
        { q: 'Wat is een booter/stresser?', options: ['Een dienst die DDoS-aanvallen te huur aanbiedt (vermomd als "stresstest")', 'Een legale snelheidstest', 'Een back-updienst', 'Een VPN'], answer: 0, explain: 'Booters verkopen DDoS-as-a-service; de "stresstest"-smoes maakt het niet legaal.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{iot_wordt_wapen}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{iot_wordt_wapen}.' },
      ],
    },
    {
      title: 'Taak 2 — De levenscyclus',
      content: `
        <p>Zet de stappen van een IoT-botnet op volgorde, van het scannen tot de aanval en afpersing.</p>
        <div class="callout tip"><strong>Beloning:</strong> scan → infecteer → C2 → verhuur → aanval. Vlag: <code>NM{botnet_levenscyclus}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de levenscyclus van een botnet',
        prompt: 'Zet de zes stappen op volgorde, van scannen tot de DDoS-aanval.',
        items: BD_STEPS,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{botnet_levenscyclus}',
        explain: 'Scannen → infecteren → C2 → verhuren via booter → klant bestelt aanval → doelwit offline/afpersing.',
      },
      questions: [
        { q: 'Wat is de eerste stap?', options: ['Scannen naar apparaten met standaardwachtwoorden', 'De DDoS uitvoeren', 'Afpersen', 'De bot aan C2 melden'], answer: 0, explain: 'Eerst zoekt de scanner kwetsbare apparaten; daarna volgt de infectie.' },
        { q: 'Waar grijpt een takedown vaak aan?', options: ['De C2 en de booter-dienst offline halen', 'Elke IoT-camera apart', 'Het slachtoffer', 'Niets'], answer: 0, explain: 'Zonder C2/booter valt de aansturing en de verhuur stil; dat raakt het hele botnet.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{botnet_levenscyclus}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{botnet_levenscyclus}.' },
      ],
    },
    {
      title: 'Taak 3 — De DDoS-wereld in kaart',
      content: `
        <p>Groepeer de zestien begrippen in vier categorieën: de <strong>DDoS-typen</strong>, de
        <strong>botnet-onderdelen</strong>, de kenmerken van de <strong>DDoS-dienst</strong> en de
        <strong>mitigaties</strong>.</p>
        <div class="callout tip"><strong>Beloning:</strong> ken de typen én de tegenmaatregelen. Vlag: <code>NM{ddos_in_kaart}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'DDoS: begrippen → categorie',
        prompt: 'Vind de vier groepen van vier.',
        groups: BD_GROUPS,
      },
      questions: [
        { q: 'Wat is een amplificatie-aanval?', options: ['Een klein verzoek naar een open server lokt een groot antwoord naar het (vervalste) slachtoffer-IP', 'Een aanval met één pakket', 'Een phishingmail', 'Een wachtwoordaanval'], answer: 0, explain: 'DNS/NTP-amplificatie misbruikt open servers om het verkeer te vergroten richting het slachtoffer.' },
        { q: 'Waarom helpt een scrubbing-center of upstream-filtering tegen een volumetrische aanval?', options: ['Je eigen lijn is te klein; het verkeer moet stroomopwaarts worden schoongemaakt/gefilterd', 'Omdat je server dan sneller is', 'Omdat het gratis is', 'Dat helpt niet'], answer: 0, explain: 'Bij een volumetrische flood moet je bovenstrooms (ISP/scrubbing) filteren, want je eigen aansluiting raakt vol.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{ddos_in_kaart}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{ddos_in_kaart}.' },
      ],
    },
    {
      title: 'Taak 4 — De booter-economie',
      content: `
        <p>DDoS is een bedrijfsmodel geworden. Volg het geld: een klant betaalt een <strong>abonnement</strong>, de operator
        betaalt zijn infrastructuur en houdt de rest als <strong>winst</strong> — meestal in crypto. Klein per klant, groot
        over duizenden klanten.</p>
        <div class="callout tip"><strong>Beloning:</strong> DDoS als abonnement. Vlag: <code>NM{ddos_als_dienst}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'de booter-economie',
        unit: '€',
        scenario: 'Een klant huurt aanvallen; de operator betaalt infra en houdt winst (crypto).',
        nodes: BD_NODES,
        edges: BD_EDGES,
        ask: [
          { q: 'Hoeveel betaalt de klant per maand? (getal)', answer: ['50'], hint: 'De eerste transactie.' },
          { q: 'Hoeveel winst houdt de operator over? (getal)', answer: ['20'], hint: 'Wat er naar de crypto-cash-out gaat.' },
        ],
      },
      questions: [
        { q: 'Hoeveel houdt de operator over van de € 50 per klant?', answer: ['20', '€ 20', '€20'], hint: '50 − 30 infra = …', explain: 'Na € 30 infrakosten blijft € 20 winst per klant — schaalbaar over veel klanten.' },
        { q: 'Waarom is de booter-economie zo schaalbaar en hardnekkig?', options: ['Lage prijs per klant × veel klanten, en crypto-betaling verhult het geld', 'Omdat het legaal is', 'Omdat er geen infra nodig is', 'Dat is het niet'], answer: 0, explain: 'Veel kleine abonnementen tellen op; crypto en bulletproof-hosting maken opsporing lastiger.' },
        { q: 'Hoe houd je je eigen IoT uit een botnet?', options: ['Standaardwachtwoorden wijzigen, updaten en onnodige poorten/toegang sluiten', 'Niets, IoT is veilig', 'Het apparaat sneller maken', 'Meer camera\'s kopen'], answer: 0, explain: 'Sterke wachtwoorden, updates en minder blootstelling halen je apparaat uit het vizier van scanners.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{ddos_als_dienst}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{ddos_als_dienst}.' },
      ],
    },
  ],
});
