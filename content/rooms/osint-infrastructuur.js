/* Room: Intelligence — OSINT-infrastructuur: cluster en ontmantel het netwerk */

// =======================================================================
//  Alles FICTIEF: verzonnen domeinen (.nm.lab), hashes en ID's,
//  documentatie-IP's (RFC 5737). Alle OSINT is PASSIEF: je kijkt in open
//  bronnen, je breekt nergens in.
// =======================================================================

// --- Fingerprint: acht hosts, welke delen een ZELDZAAM kenmerk? ---
const OI_ATTRS = [
  { key: 'favicon', label: 'Favicon-hash' },
  { key: 'analytics', label: 'Analytics-ID' },
  { key: 'jarm', label: 'JARM (TLS-stack)' },
  { key: 'cert', label: 'TLS-cert' },
  { key: 'title', label: 'Paginatitel' },
];
const OI_HOSTS = [
  { host: 'nederbank-check.nm.lab', favicon: 'f7a1c9', analytics: 'G-6M61Q37X', jarm: '2ad2ad00', cert: 'LE-a1', title: 'Inloggen' },
  { host: 'inlog-nederbank.nm.lab', favicon: 'f7a1c9', analytics: 'G-6M61Q37X', jarm: '2ad2ad00', cert: 'LE-b2', title: 'Inloggen' },
  { host: 'verify-nederbank.nm.lab', favicon: 'f7a1c9', analytics: 'G-6M61Q37X', jarm: '2ad2ad00', cert: 'LE-c3', title: 'Inloggen' },
  { host: 'nederbank-secure.nm.lab', favicon: 'f7a1c9', analytics: 'G-6M61Q37X', jarm: '2ad2ad00', cert: 'LE-d4', title: 'Inloggen' },
  { host: 'webshop.nm.lab', favicon: '11bb20', analytics: 'G-2D011K1P', jarm: '2ad2ad00', cert: 'LE-e5', title: 'Webshop' },
  { host: 'blog.nm.lab', favicon: '22cc31', analytics: '', jarm: '2ad2ad00', cert: 'LE-f6', title: 'Blog' },
  { host: 'forum.nm.lab', favicon: '33dd42', analytics: 'G-55K00Q2R', jarm: '2ad2ad00', cert: 'LE-g7', title: 'Forum' },
  { host: 'intranet.nm.lab', favicon: '44ee53', analytics: '', jarm: '2ad2ad00', cert: 'LE-h8', title: 'Intranet' },
];

// --- Pivot: de brug naar een tweede dossier (hergebruikte analytics-ID) ---
const OI_ENTITIES = [
  { id: 'd1', type: 'domain', label: 'nederbank-check.nm.lab' },
  { id: 'ga', type: 'alias', label: 'G-6M61Q37X (Analytics-ID)' },
  { id: 'c2', type: 'domain', label: 'paneel-oud.nm.lab (oud C2-paneel)' },
  { id: 'wal', type: 'wallet', label: 'bc1q…crime (losgeld-adres)' },
  { id: 'mail', type: 'email', label: 'beheer@boos.nm.lab' },
];
const OI_EDGES = [
  { from: 'd1', to: 'ga', rel: 'laadt analytics', time: '2026-01', source: 'HTML-broncode' },
  { from: 'c2', to: 'ga', rel: 'laadde zelfde analytics', time: '2024-09', source: 'archive.org snapshot' },
  { from: 'c2', to: 'wal', rel: 'toont losgeld-adres', time: '2024-09', source: 'rapport' },
  { from: 'c2', to: 'mail', rel: 'WHOIS-contact', time: '2024-09', source: 'WHOIS-historie' },
];

CS.registerRoom({
  id: 'osint-infrastructuur',
  path: 'intelligence',
  order: 9,
  title: 'OSINT-infrastructuur: ontmantel het netwerk',
  icon: '🛰️',
  difficulty: 'Moeilijk',
  minutes: 60,
  summary: 'Aanvallers draaien zelden één domein — ze bouwen infrastructuur. Je leert die infrastructuur met passieve OSINT clusteren op gedeelde kenmerken (favicon-hash, analytics-ID, TLS/JARM, certificaat), past de zeldzaamheidstoets toe om ruis van echte links te scheiden, en pivoteert via een hergebruikt kenmerk naar een tweede dossier — altijd binnen de wettelijke en ethische grenzen van open bronnen.',
  objectives: [
    'Infrastructuur-kenmerken benoemen waarop je kunt clusteren (favicon, analytics, JARM, cert, titel)',
    'De zeldzaamheidstoets toepassen: een zeldzaam gedeeld kenmerk = sterke link, een algemeen = ruis',
    'Een operator-cluster afbakenen uit een mix van verdachte en legitieme hosts',
    'Pivoteren via een hergebruikt kenmerk naar een tweede dossier',
    'De juridische en ethische grenzen van passieve OSINT respecteren',
  ],
  terms: [
    { term: 'OSINT', def: 'Open Source Intelligence: onderzoek met openbaar beschikbare bronnen, zonder in te breken.' },
    { term: 'Passieve OSINT', def: 'Informatie verzamelen zonder het doel te "raken" (bijv. via archieven, certificate transparency, passive DNS) — in tegenstelling tot actief scannen.' },
    { term: 'Favicon-hash', def: 'Een hash van het website-icoontje. Aanvallers hergebruiken vaak hetzelfde favicon over hun domeinen — een verrassend sterke vingerafdruk (bijv. via Shodan).' },
    { term: 'Analytics-ID', def: 'Een tracking-ID (bijv. Google Analytics UA-/G-) in de broncode. Hetzelfde ID over meerdere sites verraadt dezelfde eigenaar.' },
    { term: 'JARM', def: 'Een fingerprint van hoe een server een TLS-handshake beantwoordt. Zegt iets over de stack, maar een default-stack delen héél veel servers — dus zwak als los kenmerk.' },
    { term: 'Certificate transparency', def: 'Openbare logs van uitgegeven TLS-certificaten (crt.sh) om hergebruik of patronen terug te vinden.' },
    { term: 'Zeldzaamheidstoets', def: 'De vraag of een gedeeld kenmerk zeldzaam genoeg is om een echte link te zijn. Een uniek favicon zegt meer dan "gebruikt nginx".' },
    { term: 'Pivoteren', def: 'Van één bekend kenmerk naar nieuwe, onbekende entiteiten springen die het delen — zo groeit het beeld van het netwerk.' },
    { term: 'Wet politiegegevens (Wpg)', def: 'Regelt hoe de politie persoonsgegevens (ook uit OSINT) mag verwerken: doelbinding, noodzaak en vastlegging.' },
  ],
  resources: [
    { title: 'crt.sh — certificate transparency', url: 'https://crt.sh/' },
    { title: 'Shodan — favicon- en servicezoektochten', url: 'https://www.shodan.io/' },
    { title: 'Internet Archive (Wayback Machine)', url: 'https://web.archive.org/' },
    { title: 'SpiderFoot — OSINT-automatisering', url: 'https://www.spiderfoot.net/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Clusteren op gedeelde kenmerken',
      content: `
        <p>Een phishing- of malware-operatie draait zelden op één domein. De aanvaller zet er tientallen op — en juist omdat
        hij <em>efficiënt</em> wil zijn, hergebruikt hij onderdelen: hetzelfde <strong>favicon</strong>, dezelfde
        <strong>analytics-ID</strong>, dezelfde templates. Met passieve OSINT (Shodan, certificate transparency, de Wayback
        Machine) maak je die hergebruikte kenmerken zichtbaar en <strong>cluster</strong> je de infrastructuur.</p>
        <p>De valkuil is de <strong>zeldzaamheidstoets</strong>. Een <em>uniek</em> favicon dat vier domeinen delen is een
        sterke link. Maar "gebruikt dezelfde TLS-stack (JARM)" of "staat bij dezelfde grote hoster" delen miljoenen servers —
        dat is ruis, geen link. Vraag altijd: <em>hoe zeldzaam is dit gedeelde kenmerk?</em></p>
        <div class="callout warn"><strong>Alles fictief en passief:</strong> de domeinen, hashes en ID's zijn verzonnen. Je
        kijkt alleen in open bronnen; je breekt nergens in en raakt het doel niet.</div>
        <div class="callout tip"><strong>Beloning:</strong> zeldzaam = sterk, algemeen = ruis. Vlag: <code>NM{zeldzaam_is_sterk}</code>.</div>
      `,
      questions: [
        { q: 'Wat is de zeldzaamheidstoets bij het clusteren van infrastructuur?', options: ['De vraag of een gedeeld kenmerk zeldzaam genoeg is om een echte link te zijn', 'Hoe oud een domein is', 'Of een site https gebruikt', 'Hoeveel pagina\'s een site heeft'], answer: 0, explain: 'Hoe zeldzamer het gedeelde kenmerk, hoe sterker het bewijs van dezelfde eigenaar.' },
        { q: 'Welk gedeeld kenmerk is doorgaans een STERKE link?', options: ['Een uniek favicon-hash of een hergebruikte analytics-ID', 'Dezelfde grote hostingprovider', 'Dezelfde default TLS-stack (JARM)', 'Allebei https'], answer: 0, explain: 'Een zeldzaam, specifiek kenmerk (favicon, analytics-ID) wijst op dezelfde maker; generieke infrastructuur niet.' },
        { q: 'Waarom is passieve OSINT belangrijk?', options: ['Je verzamelt informatie zonder het doel te waarschuwen of in te breken', 'Het is sneller dan actief scannen', 'Het is gratis', 'Het hoeft niet gelogd te worden'], answer: 0, explain: 'Passief (archieven, CT-logs, passive DNS) tipt de aanvaller niet en blijft binnen de wet.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{zeldzaam_is_sterk}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{zeldzaam_is_sterk}.' },
      ],
    },
    {
      title: 'Taak 2 — Vingerafdrukken vergelijken',
      content: `
        <p>Hier zijn acht hosts met hun kenmerken. Vier horen bij één phishingoperatie, vier zijn onschuldig. Klik op
        kenmerken om te zien wie ze delen en hoe zeldzaam dat is. Laat je niet foppen door het kenmerk dat <em>iedereen</em>
        deelt.</p>
        <div class="callout tip"><strong>Beloning:</strong> vier domeinen, één vingerafdruk. Vlag: <code>NM{vier_een_vingerafdruk}</code>.</div>
      `,
      lab: {
        type: 'fingerprint',
        title: 'acht hosts — wie hoort bij elkaar?',
        scenario: 'Vier phishingdomeinen delen een zeldzaam favicon én analytics-ID; de JARM deelt iedereen (ruis).',
        attrs: OI_ATTRS,
        hosts: OI_HOSTS,
        ask: [
          { q: 'Hoeveel hosts delen het favicon-hash f7a1c9?', answer: ['4', 'vier'], hint: 'Klik de favicon-waarde aan.' },
          { q: 'Welke (zeldzame) Analytics-ID koppelt de vier phishingdomeinen?', answer: ['G-6M61Q37X', 'g-6m61q37x'], hint: 'Klik een analytics-waarde aan en kijk naar de telling.' },
          { q: 'Welk gedeeld kenmerk is juist te algemeen om op te clusteren?', answer: ['jarm', '2ad2ad00', 'de jarm'], hint: 'Welk kenmerk delen álle acht hosts?' },
        ],
      },
      questions: [
        { q: 'Hoeveel hosts vormen de phishingcluster?', answer: ['4', 'vier'], hint: 'De hosts die het zeldzame favicon én analytics-ID delen.', explain: 'Vier hosts delen favicon f7a1c9 én analytics G-6M61Q37X — dat is de operator-cluster.' },
        { q: 'Waarom is de gedeelde JARM (2ad2ad00) hier geen bruikbare link?', options: ['Alle acht hosts delen hem — een default-stack is te algemeen', 'JARM bestaat niet', 'Hij is uniek per host', 'Omdat het een phishingkenmerk is'], answer: 0, explain: 'Een kenmerk dat iedereen deelt, onderscheidt niets. De zeldzaamheidstoets wijst het af als ruis.' },
        { q: 'Waarom is het hergebruikte favicon zo\'n sterke aanwijzing?', options: ['Het is zeldzaam en specifiek: dezelfde maker gebruikte hetzelfde icoon over zijn domeinen', 'Omdat favicons geheim zijn', 'Omdat het een virus bevat', 'Omdat het groot is'], answer: 0, explain: 'Een uniek favicon over meerdere domeinen verraadt één hand — efficiëntie van de aanvaller wordt zijn vingerafdruk.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{vier_een_vingerafdruk}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{vier_een_vingerafdruk}.' },
      ],
    },
    {
      title: 'Taak 3 — Pivoteer naar het tweede dossier',
      content: `
        <p>Je hebt de phishingcluster. Nu de grote vraag: is dit een bekende speler? Pivoteer via het zeldzame kenmerk. De
        analytics-ID <code>G-6M61Q37X</code> blijkt — volgens een oude <strong>archive.org</strong>-snapshot — ook gebruikt
        op een <em>oud C2-paneel</em> uit een ransomware-dossier van 2024. Dat is de brug tussen twee zaken.</p>
        <p>Klik door de entiteiten in het lab en volg de relaties. Let op de <strong>bron</strong> en de <strong>tijd</strong>
        van elke link — en of het kenmerk zeldzaam genoeg is om de brug te dragen.</p>
        <div class="callout tip"><strong>Beloning:</strong> één hergebruikt kenmerk verbindt twee dossiers. Vlag: <code>NM{brug_via_hergebruik}</code>.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'van phishingdomein naar oud C2-paneel',
        scenario: 'De analytics-ID G-6M61Q37X koppelt de phishingcluster aan een ransomware-C2 uit 2024.',
        entities: OI_ENTITIES,
        edges: OI_EDGES,
      },
      questions: [
        { q: 'Welk hergebruikt kenmerk verbindt de phishingcluster en het oude C2-paneel?', answer: ['G-6M61Q37X', 'g-6m61q37x', 'de analytics-id', 'analytics-id', 'analytics'], hint: 'Beide laadden dezelfde tracking-ID.', explain: 'Zowel nederbank-check.nm.lab als paneel-oud.nm.lab laadde analytics-ID G-6M61Q37X — de brug tussen de dossiers.' },
        { q: 'Via welke bron vond je dat het oude paneel die ID gebruikte?', options: ['Een archive.org-snapshot (de site is nu offline)', 'Door in te loggen op het paneel', 'Via de politie', 'Door het domein te scannen'], answer: 0, explain: 'Een Wayback-snapshot bewaart de oude broncode — passief, en daarom OSINT.' },
        { q: 'Waarom is deze brug sterker dan "beide gebruiken Let\'s Encrypt"?', options: ['Een specifieke tracking-ID is zeldzaam; een gratis certificaatprovider gebruikt iedereen', 'Let\'s Encrypt bestaat niet', 'Omdat het paneel offline is', 'Dat is het niet'], answer: 0, explain: 'Weer de zeldzaamheidstoets: een unieke ID bruggt, een alomtegenwoordige provider niet.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{brug_via_hergebruik}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{brug_via_hergebruik}.' },
      ],
    },
    {
      title: 'Taak 4 — Verantwoord rapporteren en de grenzen',
      content: `
        <p>Je hebt een cluster en een brug — maar wat schrijf je op? Twee dingen tegelijk: <strong>wees scherp</strong> over de
        techniek, en <strong>wees voorzichtig</strong> met de attributie. Een gedeelde analytics-ID koppelt
        <em>infrastructuur</em>; het bewijst nog niet <em>wie</em> erachter zit. Schrijf met waarschijnlijkheidstaal en
        benoem je aannames.</p>
        <p>En de grenzen: OSINT is krachtig maar niet grenzeloos. Je werkt uit <strong>open bronnen</strong> en breekt nergens
        in (inbreken is strafbaar, art. 138ab Sr). Verwerk je persoonsgegevens, dan geldt voor de politie de
        <strong>Wet politiegegevens</strong>: doelbinding, noodzaak en vastlegging. Hobbymatig "doxen" van verdachten hoort
        daar niet bij.</p>
        <div class="callout tip"><strong>Beloning:</strong> infra koppelen ≠ de dader aanwijzen. Vlag: <code>NM{infra_is_geen_persoon}</code>.</div>
      `,
      questions: [
        { q: 'Wat bewijst een gedeelde analytics-ID precies?', options: ['Dat de infrastructuur aan elkaar gekoppeld is — niet per se wíé erachter zit', 'De naam van de dader', 'Dat het zeker één persoon is', 'Niets'], answer: 0, explain: 'Je koppelt techniek aan techniek; de stap naar een persoon vraagt extra, onafhankelijk bewijs.' },
        { q: 'Binnen welke grens blijft deze OSINT legaal?', options: ['Alleen open bronnen raadplegen; niet inbreken (art. 138ab Sr)', 'Inloggen mag als het paneel zwak is', 'Alles mag als het voor onderzoek is', 'Er zijn geen grenzen'], answer: 0, explain: 'OSINT is open bronnen. Zodra je zonder recht binnendringt, pleeg je computervredebreuk.' },
        { q: 'Welke wet regelt hoe de politie persoonsgegevens uit OSINT mag verwerken?', options: ['De Wet politiegegevens (Wpg)', 'De Auteurswet', 'De Woningwet', 'De Wegenverkeerswet'], answer: 0, explain: 'De Wpg stelt doelbinding, noodzaak en vastlegging als eisen aan het verwerken van politiegegevens.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{infra_is_geen_persoon}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{infra_is_geen_persoon}.' },
      ],
    },
  ],
});
