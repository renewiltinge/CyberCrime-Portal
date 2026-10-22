/* Room: Intelligence — dark-web vendor OSINT: attributie via OPSEC-fouten */

// =======================================================================
//  Alles FICTIEF: "rxshadow", de markt, sleutels, adressen en handles zijn
//  verzonnen. PASSIEVE OSINT: geen aankopen, geen inbraak, geen toegang tot
//  illegale diensten. Je oefent de denkwijze van een rechercheur — lawful.
// =======================================================================

// --- Osintpuzzle: de sporen van één vendor over meerdere bronnen ---
const DV_RECORDS = [
  {
    title: 'Darkweb-marktplaats — vendorpagina', icon: '🏴',
    lines: [
      'alias: rxshadow',
      'PGP-fingerprint: 7C4D 9A1E 2B88 F03A 55D1 0E6B 3C27 A9F4 18D5 6B02',
      'verzendt vanuit: EU',
      'stijl-tic in beschrijving: eindigt elke post met "cheerz!"',
    ],
  },
  {
    title: 'Clearnet-forum (openbaar) — profiel', icon: '💬',
    lines: [
      'gebruiker: rx_shadow',
      'PGP-fingerprint (in bio): 7C4D 9A1E 2B88 F03A 55D1 0E6B 3C27 A9F4 18D5 6B02',
      'ondertekening: "cheerz!"',
      'posts over: versleuteling en "stealth shipping"',
    ],
  },
  {
    title: 'Blockchain-explorer — uitbetaaladres', icon: '🪙',
    lines: [
      'adres: bc1qrxshadowvendor000xmpl',
      'crowdsourced label: "rxshadow uitbetaaladres"',
      'eerste transactie: 2022-07-11',
    ],
  },
  {
    title: 'Pastebin-lek (oud) — gelekte gegevens', icon: '📋',
    lines: [
      'username: rxshadow',
      'e-mail: rxshadow@mail.nm.lab',
      'bron: datalek van een onbekend forum, 2021',
    ],
  },
  {
    title: 'Code-repo (clearnet) — profiel', icon: '💾',
    lines: [
      'gebruiker: rxshadow',
      'commit-e-mail: rxshadow@mail.nm.lab',
      'repo: "pgp-helper-scripts"',
    ],
  },
];

// --- Pivot: de brug naar een echte-identiteit-lead via een hergebruikte PGP-sleutel ---
const DV_ENTITIES = [
  { id: 'v', type: 'alias', label: 'rxshadow (vendor)' },
  { id: 'pgp', type: 'hash', label: '7C4D…55D1 (PGP-sleutel)' },
  { id: 'mkt', type: 'domain', label: 'markt-paneel.nm.lab' },
  { id: 'btc', type: 'wallet', label: 'bc1qrxshadowvendor000xmpl' },
  { id: 'old', type: 'file', label: 'oud clearnet-project (2019)' },
  { id: 'lead', type: 'alias', label: 'handle: m.devries' },
];
const DV_EDGES = [
  { from: 'v', to: 'mkt', rel: 'vendorpagina op', time: '2022', source: 'marktplaats' },
  { from: 'v', to: 'pgp', rel: 'publiceert PGP-sleutel', time: '2022', source: 'vendorpagina + forum' },
  { from: 'v', to: 'btc', rel: 'uitbetaaladres', time: '2022', source: 'blockchain-explorer' },
  { from: 'old', to: 'pgp', rel: 'commits gesigneerd met zelfde sleutel', time: '2019', source: 'git-historie (archive)' },
  { from: 'old', to: 'lead', rel: 'commit-author handle', time: '2019', source: 'git-historie (archive)' },
];

// --- Admiralty: niet alle OSINT-bronnen zijn gelijk ---
const DV_SOURCES = [
  { source: 'De transactie op de blockchain-explorer zelf', info: 'Adres bc1qrx… ontving 2022–2024 meerdere betalingen', reliability: 'A', credibility: '1', explain: 'De keten is onveranderbaar en publiek verifieerbaar: een volledig betrouwbare bron (A), de gebeurtenis is bevestigd (1): A1.' },
  { source: 'Een crowdsourced wallet-label op de explorer', info: 'Dit adres is "rxshadow"', reliability: 'D', credibility: '3', explain: 'Door gebruikers toegevoegde labels kunnen fout of kwaadwillig zijn: niet altijd betrouwbaar (D), onbevestigd (3): D3.' },
  { source: 'De reviews van de vendor op de marktplaats zelf', info: 'rxshadow is "100% betrouwbaar"', reliability: 'E', credibility: '4', explain: 'Reviews op de markt zijn te manipuleren en self-serving: onbetrouwbaar (E), twijfelachtig (4): E4.' },
  { source: 'Een PGP-handtekening die valideert tegen de gepubliceerde sleutel', info: 'Dit bericht komt van de houder van sleutel 7C4D…', reliability: 'B', credibility: '2', explain: 'Cryptografisch sterk dat het van de sleutelhouder komt (B2) — maar let op: het bewijst de sleutel, niet de persoon erachter.' },
  { source: 'Een rapport van een gerenommeerd threat-intel-bedrijf met IOCs', info: 'rxshadow hergebruikt sleutel 7C4D… sinds 2019', reliability: 'B', credibility: '2', explain: 'Een gerenommeerde bron met onderbouwing is doorgaans betrouwbaar (B); nog niet door jou onafhankelijk bevestigd (2): B2.' },
];

CS.registerRoom({
  id: 'darkweb-vendor-osint',
  path: 'intelligence',
  order: 10,
  title: 'Dark-web vendor OSINT: attributie via OPSEC-fouten',
  icon: '🏴',
  difficulty: 'Moeilijk',
  minutes: 65,
  summary: 'Anonimiteit op het dark web is broos: vendors verraden zichzelf met OPSEC-fouten. Je correleert de openbare sporen van één vendor (alias, PGP-sleutel, bitcoin-adres, schrijfstijl) over markten, fora en de clearnet, pivoteert via een hergebruikte PGP-sleutel naar een echte-identiteit-lead, en weegt de betrouwbaarheid van elke bron met de Admiralty Code — strikt binnen de wettelijke en ethische grenzen van passieve OSINT.',
  objectives: [
    'Uitleggen hoe OPSEC-fouten (hergebruik, schrijfstijl) attributie mogelijk maken',
    'De openbare sporen van één operator over meerdere bronnen correleren',
    'Pivoteren via een hergebruikt kenmerk naar een echte-identiteit-lead',
    'De betrouwbaarheid en geloofwaardigheid van OSINT-bronnen apart wegen (Admiralty)',
    'Het verschil kennen tussen een lead en bewijs, en de wettelijke grenzen respecteren',
  ],
  terms: [
    { term: 'Dark-web marktplaats', def: 'Een (vaak via Tor bereikbare) handelsplaats voor illegale goederen/diensten. Hier alleen als onderzoeksobject — passief, van buitenaf.' },
    { term: 'Vendor', def: 'Een verkoper op zo\'n markt, die onder een alias opereert en betalingen in crypto ontvangt.' },
    { term: 'OPSEC', def: 'Operational Security: de discipline om geen sporen na te laten die je identiteit prijsgeven. OPSEC-fouten zijn de kern van veel attributie.' },
    { term: 'Hergebruik (reuse)', def: 'Dezelfde alias, PGP-sleutel, e-mail of bitcoin-adres over meerdere plekken gebruiken — de meestvoorkomende OPSEC-fout.' },
    { term: 'PGP-fingerprint', def: 'Een unieke vingerafdruk van een PGP-sleutel. Dezelfde sleutel op een markt én in een oud clearnet-project is een sterke brug.' },
    { term: 'Stylometrie', def: 'Schrijfstijl-analyse: terugkerende tics (zoals "cheerz!") kunnen dezelfde auteur over accounts heen verraden.' },
    { term: 'Attributie', def: 'De stap van sporen naar een actor. Infrastructuur/kenmerken koppelen is één ding; een persoon aanwijzen vraagt veel meer.' },
    { term: 'Admiralty Code', def: 'Weegt een bron op betrouwbaarheid (A–F) en de informatie op geloofwaardigheid (1–6), apart van elkaar.' },
    { term: 'Lead vs. bewijs', def: 'Een aanwijzing (lead) opent een onderzoekslijn; bewijs houdt stand in rechte. Verwar ze nooit.' },
    { term: 'Lawful OSINT', def: 'Alleen open bronnen; geen aankopen, geen inbraak (art. 138ab Sr). Voor de politie geldt de Wet politiegegevens.' },
  ],
  resources: [
    { title: 'Bellingcat — open-source onderzoeksmethoden', url: 'https://www.bellingcat.com/' },
    { title: 'OSINT Framework', url: 'https://osintframework.com/' },
    { title: 'Krebs on Security — cybercrime-onderzoek', url: 'https://krebsonsecurity.com/' },
    { title: 'Europol — darkweb en cybercrime', url: 'https://www.europol.europa.eu/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Anonimiteit is broos',
      content: `
        <p>Een dark-web vendor leunt op anonimiteit: een alias, een PGP-sleutel, betalingen in crypto. Maar mensen zijn
        gewoontedieren, en <strong>OPSEC-fouten</strong> stapelen op. Dezelfde alias op een forum. Dezelfde PGP-sleutel in een
        oud hobbyproject. Hetzelfde bitcoin-adres. Een terugkerende <strong>schrijf-tic</strong>. Elk los spoortje zegt weinig;
        samen tekenen ze een persoon.</p>
        <p>Jij werkt hier als onderzoeker, en strikt <strong>lawful</strong>: je kijkt alleen in <strong>open bronnen</strong>,
        je koopt niets, je breekt nergens in en je gebruikt geen illegale diensten. Je oefent de <em>denkwijze</em> van
        attributie — en leert meteen waar de grens ligt tussen een <strong>lead</strong> en echt <strong>bewijs</strong>.</p>
        <div class="callout warn"><strong>Alles fictief en passief:</strong> "rxshadow", de markt en de sleutels zijn verzonnen.
        Deze room leert opsporen en verdedigen, niet hoe je iets koopt of toegang krijgt.</div>
        <div class="callout tip"><strong>Beloning:</strong> OPSEC-fouten verraden de operator. Vlag: <code>NM{opsec_fouten_verraden}</code>.</div>
      `,
      questions: [
        { q: 'Wat maakt attributie van een anonieme vendor mogelijk?', options: ['OPSEC-fouten: hergebruik van alias, sleutel, adres of schrijfstijl', 'De firewall van de markt', 'De snelheid van Tor', 'Het weer'], answer: 0, explain: 'Hergebruik en gewoontes laten sporen na die je over bronnen heen kunt correleren.' },
        { q: 'Binnen welke grens blijft dit onderzoek legaal?', options: ['Alleen open bronnen; niets kopen, niet inbreken, geen illegale diensten gebruiken', 'Je mag kopen als het voor onderzoek is', 'Inbreken mag bij criminelen', 'Er zijn geen grenzen'], answer: 0, explain: 'Lawful OSINT is passief: open bronnen raadplegen. Kopen of binnendringen is zelf strafbaar.' },
        { q: 'Wat is het verschil tussen een lead en bewijs?', options: ['Een lead opent een onderzoekslijn; bewijs houdt stand in rechte', 'Niets, het is hetzelfde', 'Een lead is sterker dan bewijs', 'Bewijs is een soort lead'], answer: 0, explain: 'Correlaties geven leads; voor attributie van een persoon is onafhankelijk, standhoudend bewijs nodig.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{opsec_fouten_verraden}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{opsec_fouten_verraden}.' },
      ],
    },
    {
      title: 'Taak 2 — Correleer de sporen',
      content: `
        <p>Hier zijn vijf openbare fragmenten over vendor <strong>rxshadow</strong>, uit verschillende bronnen. Zoek de
        kenmerken die telkens terugkeren — die vormen de rode draad die de accounts aan elkaar knoopt.</p>
        <div class="callout tip"><strong>Beloning:</strong> één draad door alle bronnen. Vlag: <code>NM{een_draad_door_alles}</code>.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'de sporen van rxshadow',
        scenario: 'Vijf fictieve fragmenten over één vendor. Welke kenmerken keren terug?',
        records: DV_RECORDS,
        ask: [
          { q: 'Welke alias keert op (vrijwel) elke bron terug?', answer: ['rxshadow', 'rx_shadow'], hint: 'Lees de alias/username op elke kaart.' },
          { q: 'Welke PGP-fingerprint koppelt de marktplaats aan het clearnet-forum?', answer: ['7C4D 9A1E 2B88 F03A 55D1 0E6B 3C27 A9F4 18D5 6B02', '7C4D9A1E2B88F03A55D10E6B3C27A9F418D56B02', '7c4d 9a1e 2b88 f03a 55d1 0e6b 3c27 a9f4 18d5 6b02'], hint: 'Staat op de vendorpagina én in de forum-bio.' },
          { q: 'Welk e-mailadres koppelt het pastebin-lek aan de code-repo?', answer: ['rxshadow@mail.nm.lab'], hint: 'Hetzelfde adres op de paste-kaart én de repo-kaart.' },
          { q: 'Welk bitcoin-adres is publiek aan de vendor gelabeld?', answer: ['bc1qrxshadowvendor000xmpl'], hint: 'Staat op de blockchain-explorer-kaart.' },
        ],
      },
      questions: [
        { q: 'Welk kenmerk is de sterkste rode draad tussen de markt en het forum?', options: ['De gedeelde PGP-fingerprint (7C4D…55D1)', 'Dat beide Nederlands zijn', 'Dat beide https gebruiken', 'De kleur van de pagina'], answer: 0, explain: 'Een gedeelde PGP-sleutel is zeldzaam en specifiek — een veel sterkere link dan een alias alleen.' },
        { q: 'Waarom is de schrijf-tic "cheerz!" ook bruikbaar?', options: ['Stylometrie: een terugkerende stijltic kan dezelfde auteur over accounts verraden', 'Omdat het een wachtwoord is', 'Omdat het illegaal is', 'Dat is het niet'], answer: 0, explain: 'Schrijfstijl is een zwakker maar bruikbaar signaal dat correlaties ondersteunt.' },
        { q: 'Welk spoor koppelt het oude datalek aan de code-repo?', answer: ['rxshadow@mail.nm.lab', 'het e-mailadres', 'de e-mail'], hint: 'Hetzelfde e-mailadres staat op beide.', explain: 'Een hergebruikt e-mailadres bruggt het pastebin-lek en de clearnet-repo.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{een_draad_door_alles}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{een_draad_door_alles}.' },
      ],
    },
    {
      title: 'Taak 3 — Pivoteer naar een echte-identiteit-lead',
      content: `
        <p>De vendor is intern consistent, maar nog steeds een alias. Nu de doorbraak: de <strong>PGP-sleutel</strong>
        <code>7C4D…55D1</code> blijkt — volgens de openbare git-historie — al in <strong>2019</strong> gebruikt om commits te
        signeren in een <em>clearnet</em>-hobbyproject, lang vóór rxshadow bestond. En die commits dragen een
        author-handle: <code>m.devries</code>. Dat is de brug van de anonieme vendor naar een echte-identiteit-<strong>lead</strong>.</p>
        <p>Klik door de entiteiten en volg de relaties. Let op bron en tijd — en onthoud: dit is een lead, nog geen bewijs.</p>
        <div class="callout tip"><strong>Beloning:</strong> een hergebruikte sleutel is een tijdmachine. Vlag: <code>NM{sleutel_als_tijdmachine}</code>.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'van vendor naar een clearnet-handle',
        scenario: 'Dezelfde PGP-sleutel signeerde in 2019 commits in een clearnet-project met handle m.devries.',
        entities: DV_ENTITIES,
        edges: DV_EDGES,
      },
      questions: [
        { q: 'Welk hergebruikt kenmerk bruggt de vendor en het oude clearnet-project?', answer: ['PGP', 'de PGP-sleutel', 'pgp-sleutel', '7C4D 9A1E 2B88 F03A 55D1 0E6B 3C27 A9F4 18D5 6B02', 'de pgp-fingerprint', 'pgp-fingerprint'], hint: 'Dezelfde sleutel signeerde beide.', explain: 'De PGP-sleutel 7C4D…55D1 koppelt de vendor aan commits uit 2019 — de brug naar een echte-identiteit-lead.' },
        { q: 'Waarom is een PGP-sleutel uit 2019 zo waardevol?', options: ['Van vóór de vendor-OPSEC: toen was de maker vaak minder voorzichtig (bijv. een echte handle)', 'Omdat oude sleutels sterker zijn', 'Omdat 2019 een bijzonder jaar was', 'Dat is het niet'], answer: 0, explain: 'Vroege sporen stammen uit een tijd met slordiger OPSEC; daar liggen de echte-identiteit-leads.' },
        { q: 'Wat is "m.devries" in dit onderzoek precies?', options: ['Een lead (onderzoekslijn), nog geen bewezen identiteit', 'De bewezen dader', 'Een wachtwoord', 'Een bitcoin-adres'], answer: 0, explain: 'De handle opent een lijn; hem aan een echt persoon koppelen vraagt onafhankelijk bewijs.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{sleutel_als_tijdmachine}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{sleutel_als_tijdmachine}.' },
      ],
    },
    {
      title: 'Taak 4 — Weeg je bronnen (Admiralty)',
      content: `
        <p>Niet elke OSINT-bron is even sterk. Een onveranderbare transactie op de blockchain is iets heel anders dan een
        crowdsourced label of de reviews van de vendor zelf. Weeg elke bron met de <strong>Admiralty Code</strong>:
        <strong>betrouwbaarheid</strong> van de bron (A–F) en <strong>geloofwaardigheid</strong> van de informatie (1–6),
        apart van elkaar.</p>
        <div class="callout tip"><strong>Beloning:</strong> de keten is A1, een vendor-review is E4. Vlag: <code>NM{weeg_je_bronnen}</code>.</div>
      `,
      lab: {
        type: 'admiralty',
        title: 'de bronnen in de rxshadow-zaak',
        items: DV_SOURCES,
      },
      questions: [
        { q: 'Welke bron scoort het hoogst (ongeveer A1)?', options: ['De transactie op de blockchain-explorer zelf', 'De reviews van de vendor', 'Een crowdsourced wallet-label', 'Een anonieme tip'], answer: 0, explain: 'De keten is onveranderbaar en publiek verifieerbaar: volledig betrouwbaar en bevestigd (A1).' },
        { q: 'Wat bewijst een geldige PGP-handtekening precies?', options: ['Dat het bericht van de sleutelhouder komt — niet wie die persoon is', 'De echte naam van de dader', 'Dat de markt veilig is', 'Niets'], answer: 0, explain: 'Cryptografisch sterk (B2) voor de sleutel, maar de koppeling sleutel→persoon is een aparte, zwakkere stap.' },
        { q: 'Waarom scoren de vendor-reviews laag (E4)?', options: ['Ze zijn self-serving en te manipuleren', 'Ze zijn te lang', 'Ze staan op clearnet', 'Ze zijn versleuteld'], answer: 0, explain: 'Een partij die over zichzelf rapporteert en belang heeft bij het beeld, is onbetrouwbaar.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{weeg_je_bronnen}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{weeg_je_bronnen}.' },
      ],
    },
    {
      title: 'Taak 5 — Van lead naar verantwoord product',
      content: `
        <p>Je hebt een sterke correlatie en een echte-identiteit-lead. Maar wat je oplevert, moet <strong>kloppen én
        verantwoord</strong> zijn. Drie principes:</p>
        <ul>
          <li><strong>Lead ≠ bewijs.</strong> Een hergebruikte sleutel en handle openen een lijn; een persoon aanwijzen vraagt
          onafhankelijk, standhoudend bewijs. Schrijf met waarschijnlijkheidstaal.</li>
          <li><strong>Blijf lawful.</strong> Alles kwam uit open bronnen. Geen aankopen, geen inbraak (art. 138ab Sr). Voor de
          politie geldt de <strong>Wet politiegegevens</strong>: doelbinding, noodzaak, vastlegging.</li>
          <li><strong>Geen eigenrichting.</strong> Je publiceert geen namen en gaat niet "zelf de verdachte confronteren";
          je levert je onderbouwde bevindingen aan het bevoegde gezag.</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> een lead geef je door, geen naam publiceer je. Vlag: <code>NM{lead_niet_oordeel}</code>.</div>
      `,
      questions: [
        { q: 'Je hebt handle "m.devries" als lead. Wat schrijf je op?', options: ['Een onderbouwde, met waarschijnlijkheidstaal geformuleerde lead — geen harde beschuldiging', 'De naam als bewezen dader', 'Niets, je houdt het voor jezelf', 'Een publieke aanklacht online'], answer: 0, explain: 'Een lead meld je verantwoord met onzekerheid benoemd; de bewijsvoering is aan het bevoegde gezag.' },
        { q: 'Mag je, om het bewijs rond te krijgen, inloggen op het verlaten account van de vendor?', options: ['Nee — dat is computervredebreuk (art. 138ab Sr), ook bij een crimineel', 'Ja, als het account zwak beveiligd is', 'Ja, voor onderzoek mag alles', 'Alleen \'s nachts'], answer: 0, explain: 'Ongeautoriseerde toegang is strafbaar, ongeacht wie de eigenaar is. Blijf bij open bronnen.' },
        { q: 'Aan wie lever je je bevindingen?', options: ['Aan het bevoegde gezag (politie/OM); je doet niet aan eigenrichting', 'Je publiceert ze op sociale media', 'Je confronteert de verdachte zelf', 'Je verkoopt ze'], answer: 0, explain: 'OSINT-bevindingen horen bij de opsporing; doxen of zelf confronteren is onverantwoord en vaak onrechtmatig.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{lead_niet_oordeel}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{lead_niet_oordeel}.' },
      ],
    },
  ],
});
