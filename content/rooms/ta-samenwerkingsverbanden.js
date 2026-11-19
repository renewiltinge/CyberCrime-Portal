/* Room: Criminele samenwerkingsverbanden in kaart brengen — leerpad Tactisch analist cybercrime */

CS.registerRoom({
  id: 'ta-samenwerkingsverbanden',
  path: 'tactisch-analist',
  order: 3,
  title: 'Criminele samenwerkingsverbanden in kaart brengen',
  icon: '🕸️',
  difficulty: 'Gemiddeld',
  minutes: 80,
  level: 'Praktijk',
  checked: '2026-11-19',
  summary: 'Van losse chats, forumberichten en transacties naar een netwerk dat je kunt lezen: knopen en relaties met bron en periode, sociale netwerkanalyse met degree, betweenness en closeness, de rollen in een cybercrimenetwerk, en verdachten beschrijven op gedrag in plaats van vooroordeel, met oog voor waar het netwerk kwetsbaar is.',
  objectives: [
    'Informatie-, geld- en goederenstromen uit ruwe bronnen omzetten naar een graaf met gerichte en gewogen relaties, elk met bron en periode',
    'Degree, betweenness en closeness uitleggen en berekenen, en een broker herkennen',
    'Met cut, sort en uniq in een berichtenbestand tellen wie het meest communiceert, en uitleggen waarom dat niet de belangrijkste persoon hoeft te zijn',
    'De rollen in een cybercrimenetwerk benoemen: kern, affiliates, en facilitators zoals bulletproof hoster, crypter, initial access broker en geldezelronselaar',
    'Kenmerken van verdachten beschrijven op rol, vaardigheden, middelen, OPSEC en ritme, met gelabelde aannames en zonder vooroordeel',
    'Aangeven waar een netwerk kwetsbaar is voor interventie, rekening houdend met vervangbaarheid',
  ],
  tasks: [
    {
      title: 'Taak 1 — Van netwerk naar graaf',
      tryFirst: true,
      intro: `<p>Uit het fictieve onderzoek "Lantaarn" zijn vier fragmenten binnengekomen. Lees ze en bepaal welke aliassen er
        meedoen, wie met wie in verbinding staat, in welke richting en hoe vaak. Dat is het begin van elke netwerkanalyse.</p>`,
      content: `
        <p>In de vacature staat: <em>"je brengt informatiestromen in kaart en je beschrijft kenmerken van verdachten en criminele
        samenwerkingsverbanden."</em> Een samenwerkingsverband zie je niet in één bron. Je bouwt het op uit chats, forumberichten,
        transacties en verklaringen. Om dat overzichtelijk te houden, teken je het als een <strong>graaf</strong>.</p>

        <h3>Knopen en relaties</h3>
        <ul>
          <li>Een <strong>knoop</strong> is een actor of een ding: een persoon, een alias, een account, een bedrijf, een wallet. Let
          op het verschil met de vorige room: een alias is een selector. Twee aliassen kunnen dezelfde persoon zijn, en dan teken je
          ze pas samen als je dat kunt onderbouwen.</li>
          <li>Een <strong>relatie</strong> (lijn) verbindt twee knopen. Een relatie kan <strong>gericht</strong> zijn (A stuurt B een
          bericht, A betaalt B) of <strong>ongericht</strong> (A en B zitten samen in een chatgroep). Een relatie kan
          <strong>gewogen</strong> zijn: het aantal berichten, het bedrag, het aantal keren dat ze samen online waren.</li>
          <li>Twee knopen kunnen meerdere soorten relaties hebben: ze chatten én betalen elkaar. Teken die apart, want ze zeggen iets
          anders.</li>
        </ul>

        <h3>Drie soorten stromen</h3>
        <table>
          <thead><tr><th>Stroom</th><th>Wat stroomt er</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td>Informatiestroom</td><td>Berichten, opdrachten, kennis</td><td>Een operator stuurt een affiliate de nieuwe versie van de ransomware</td></tr>
            <tr><td>Geldstroom</td><td>Betalingen, losgeld, commissies</td><td>Een affiliate betaalt een crypter per maand</td></tr>
            <tr><td>Goederen- of datastroom</td><td>Gestolen gegevens, toegang, malware</td><td>Een initial access broker levert inloggegevens van een bedrijfsnetwerk</td></tr>
          </tbody>
        </table>
        <p>Informatiestromen in kaart brengen betekent: wie weet wat, van wie heeft hij het, via welk kanaal, en waar gaat het daarna
        naartoe? Juist op die plekken zie je wie het overzicht heeft en wie alleen een onderdeel kent.</p>

        <h3>Elke lijn heeft een bron en een periode</h3>
        <p>Een lijn op een plaat ziet er altijd even overtuigend uit, of hij nu uit een inbeslaggenomen telefoon komt of uit een
        anonieme tip. Schrijf daarom bij elke relatie op waar ze vandaan komt, in welke periode ze gold en hoe zeker je bent. Een
        bruikbaar formaat is een relatietabel:</p>
        <pre><code>van    naar    soort     gewicht  periode        bron
vos    das     bericht   7        april 2026     chatexport telefoon vos
vos    uil     betaling  0,4 BTC  12-04-2026     blockchainanalyse</code></pre>
        <p>Zo'n tabel kun je later tellen, filteren en in visualisatiesoftware laden. Een plaat zonder tabel eronder is een
        tekening; een tabel met bronnen is analyse.</p>

        <div class="callout warn"><strong>Let op:</strong> wie in een bericht wordt genoemd, heeft daarmee nog geen relatie met de
        afzender. "das zegt dat kraai ook meedoet" is een bewering van das, geen waargenomen contact tussen das en kraai.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'onderzoek Lantaarn, vier fragmenten',
        scenario: 'Fictief onderzoek naar een ransomware-affiliate en zijn cash-out. Alle aliassen zijn verzonnen.',
        records: [
          { title: 'F1 · Chatexport telefoon van vos (april 2026)', lines: ['vos → das: 7 berichten ("nieuwe build staat klaar")', 'vos → uil: 1 bericht, uil → vos: 2 berichten ("de levering")'] },
          { title: 'F2 · Forum-pm (april 2026)', lines: ['uil → reiger: 2 berichten ("cash-out NL, 30 procent")', 'reiger → uil: 1 bericht'] },
          { title: 'F3 · Blockchainanalyse (12-04-2026)', lines: ['wallet toegeschreven aan vos → wallet toegeschreven aan uil', 'bedrag: 0,4 BTC'] },
          { title: 'F4 · Bankgegevens (april 2026)', lines: ['rekening van fuut ontvangt drie contante stortingen', 'in een chat van reiger: "fuut heeft zijn pas ingeleverd"'] },
        ],
        ask: [
          { q: 'Hoeveel berichten stuurde vos naar das?', answer: ['7', 'zeven'], hint: 'Staat in F1.' },
          { q: 'Welke alias komt in drie van de vier fragmenten voor?', answer: ['uil'], hint: 'Tel per alias in hoeveel fragmenten hij staat.' },
        ],
      },
      questions: [
        { q: 'Hoeveel verschillende aliassen (knopen) komen in de vier fragmenten voor?', answer: ['5', 'vijf'],
          hints: ['Schrijf per fragment de aliassen op en streep dubbele door.', 'F1 en F3 hebben samen drie aliassen, F2 en F4 voegen er nog twee toe.', 'vos, das, uil, reiger en fuut.'],
          wrong: { '4': 'Je mist er één. Kijk ook in F4: daar staat een alias die alleen geld ontvangt.', '6': 'Tel elke alias maar één keer, ook als hij in meerdere fragmenten staat.' },
          explain: 'vos, das, uil, reiger en fuut: vijf knopen.' },
        { q: 'Welk fragment (code) beschrijft een geldstroom tussen twee aliassen uit de chats?', answer: ['F3', 'f 3'],
          hints: ['Zoek een fragment met een bedrag.', 'Twee fragmenten gaan over geld, maar één daarvan noemt geen tegenpartij.', 'Het fragment met BTC.'],
          wrong: { 'f4': 'In F4 ontvangt fuut contante stortingen, maar er staat niet van wie. Dat is geen relatie tussen twee aliassen.' },
          explain: 'F3: een betaling van een wallet van vos naar een wallet van uil. Let op: "toegeschreven aan" is zelf al een afgeleide conclusie.' },
        { q: 'vos stuurde das zeven berichten. Wat voor relatie is dat?', options: ['Ongericht en ongewogen', 'Gericht en gewogen', 'Ongericht en gewogen', 'Gericht en ongewogen'], answer: 1,
          wrong: { 0: 'Er is een afzender en een ontvanger, en er is een aantal.', 2: 'Een bericht heeft een richting: van vos naar das.', 3: 'Het aantal van zeven is het gewicht.' },
          explain: 'Gericht (van vos naar das) en gewogen (zeven berichten).' },
      ],
    },

    {
      title: 'Taak 2 — Sociale netwerkanalyse: wie is belangrijk?',
      tryFirst: true,
      intro: `<p>In de terminal staat <code>berichten.csv</code>: veertig berichten tussen zeven aliassen uit onderzoek Lantaarn.
        Tel wie het meest verstuurt en ontvangt, en zoek de alias die als enige met beide groepen praat.</p>
        <p>Begin met <code>head -n 5 berichten.csv</code>.</p>`,
      content: `
        <p>Een netwerk met zeven knopen kun je nog met het blote oog lezen. Bij zevenhonderd niet meer. <strong>Sociale
        netwerkanalyse</strong> (SNA) geeft je maten om te bepalen welke knopen een bijzondere positie hebben. Drie heb je altijd
        nodig.</p>

        <h3>Degree: hoeveel contacten?</h3>
        <p><strong>Degree</strong> is het aantal directe contacten van een knoop. Bij gerichte relaties onderscheid je
        <em>out-degree</em> (naar hoeveel anderen stuur je) en <em>in-degree</em> (van hoeveel anderen ontvang je). Tel je het aantal
        berichten in plaats van het aantal contacten, dan heb je de <em>gewogen</em> degree. Hoge degree betekent: actief, zichtbaar,
        veel contact. Het betekent niet automatisch: belangrijk.</p>

        <h3>Betweenness: wie zit ertussen?</h3>
        <p><strong>Betweenness</strong> meet hoe vaak een knoop op de kortste route tussen twee andere knopen ligt. Een knoop met hoge
        betweenness is een doorgeefluik: informatie, geld of opdrachten tussen groepen lopen via hem. Zo'n knoop die twee anders
        losse groepen verbindt, heet een <strong>broker</strong>. Een broker heeft vaak weinig contacten, maar wel de juiste.</p>

        <h3>Closeness: wie is dichtbij iedereen?</h3>
        <p><strong>Closeness</strong> meet hoe dicht een knoop gemiddeld bij alle anderen ligt. Wie een hoge closeness heeft, hoort
        nieuws snel en kan snel iets verspreiden.</p>

        <figure class="diagram">
          <svg viewBox="0 0 560 190" role="img" aria-label="Netwerk Lantaarn: groep links (vos, das, egel), groep rechts (reiger, meeuw, fuut), uil verbindt vos en reiger">
            <line x1="170" y1="95" x2="70" y2="40" stroke="currentColor" />
            <line x1="170" y1="95" x2="70" y2="150" stroke="currentColor" />
            <line x1="70" y1="40" x2="70" y2="150" stroke="currentColor" />
            <line x1="170" y1="95" x2="280" y2="95" stroke="var(--accent)" stroke-width="2" />
            <line x1="280" y1="95" x2="390" y2="95" stroke="var(--accent)" stroke-width="2" />
            <line x1="390" y1="95" x2="490" y2="40" stroke="currentColor" />
            <line x1="390" y1="95" x2="490" y2="150" stroke="currentColor" />
            <line x1="490" y1="40" x2="490" y2="150" stroke="currentColor" />
            <circle cx="70" cy="40" r="22" fill="var(--surface-2)" stroke="currentColor" />
            <circle cx="70" cy="150" r="22" fill="var(--surface-2)" stroke="currentColor" />
            <circle cx="170" cy="95" r="22" fill="var(--surface-2)" stroke="currentColor" />
            <circle cx="280" cy="95" r="22" fill="var(--accent-soft)" stroke="var(--accent)" />
            <circle cx="390" cy="95" r="22" fill="var(--surface-2)" stroke="currentColor" />
            <circle cx="490" cy="40" r="22" fill="var(--surface-2)" stroke="currentColor" />
            <circle cx="490" cy="150" r="22" fill="var(--surface-2)" stroke="currentColor" />
            <text x="70" y="44" fill="currentColor" font-size="13" text-anchor="middle">das</text>
            <text x="70" y="154" fill="currentColor" font-size="13" text-anchor="middle">egel</text>
            <text x="170" y="99" fill="currentColor" font-size="13" text-anchor="middle">vos</text>
            <text x="280" y="99" fill="currentColor" font-size="13" text-anchor="middle">?</text>
            <text x="390" y="99" fill="currentColor" font-size="13" text-anchor="middle">reiger</text>
            <text x="490" y="44" fill="currentColor" font-size="13" text-anchor="middle">meeuw</text>
            <text x="490" y="154" fill="currentColor" font-size="13" text-anchor="middle">fuut</text>
            <text x="280" y="180" fill="currentColor" font-size="13" text-anchor="middle">ongericht getekend; de knoop in het midden zoek je zelf</text>
          </svg>
          <figcaption>Onderzoek Lantaarn als ongerichte graaf. Twee groepen van drie, en één knoop ertussen.</figcaption>
        </figure>

        <p>Reken het na voor deze graaf. De knoop in het midden heeft maar twee contacten, net zo weinig als das of fuut. Maar alle
        negen kortste routes tussen een knoop links en een knoop rechts lopen via hem: betweenness 9. vos en reiger liggen elk op
        acht kortste routes, de overige vier op geen enkele. Haal je de middelste knoop weg, dan valt het netwerk in twee stukken
        uiteen.</p>

        <h3>Tellen in de terminal</h3>
        <p>Je hebt geen speciale software nodig om te beginnen. Met drie klassieke commando's tel je de gewogen degree:</p>
        <pre><code>cut -d , -f 2 berichten.csv | sort | uniq -c | sort -rn</code></pre>
        <ul>
          <li><code>cut -d , -f 2</code> knipt elke regel op de komma's en houdt het tweede veld over: de afzender.</li>
          <li><code>sort</code> zet gelijke namen onder elkaar. Dat is nodig, want <code>uniq</code> telt alleen regels die direct
          op elkaar volgen.</li>
          <li><code>uniq -c</code> telt per naam hoe vaak hij voorkomt.</li>
          <li><code>sort -rn</code> sorteert op dat getal, van hoog naar laag.</li>
        </ul>
        <p>Met <code>-f 3</code> tel je de ontvangers. Met <code>grep vos berichten.csv</code> zie je alle regels waar een naam in
        voorkomt, als afzender of als ontvanger. Let op: de kopregel telt mee als je die niet weglaat, en <code>wc -l</code> telt
        hem ook.</p>
      `,
      lab: {
        type: 'terminal',
        user: 'analist', host: 'ta-lab',
        home: '/home/analist', cwd: '/home/analist',
        motd: 'Onderzoek Lantaarn (fictief). Typ help voor de commando\'s. Begin met: head -n 5 berichten.csv',
        fs: {
          '/home/analist/berichten.csv': 'tijd,van,naar,kanaal\n2026-04-01T09:08,reiger,fuut,sms\n2026-04-01T10:09,vos,egel,chat\n2026-04-01T12:09,vos,uil,pm\n2026-04-01T19:50,vos,egel,chat\n2026-04-01T21:24,reiger,meeuw,sms\n2026-04-01T23:09,meeuw,reiger,sms\n2026-04-02T00:11,egel,vos,chat\n2026-04-02T01:03,das,vos,chat\n2026-04-03T01:10,reiger,fuut,sms\n2026-04-03T02:29,uil,reiger,pm\n2026-04-03T16:58,das,vos,chat\n2026-04-03T20:30,reiger,meeuw,sms\n2026-04-03T22:26,das,vos,chat\n2026-04-05T04:33,vos,das,chat\n2026-04-05T17:54,uil,reiger,pm\n2026-04-06T09:02,vos,egel,chat\n2026-04-07T22:38,reiger,meeuw,sms\n2026-04-08T09:48,vos,das,chat\n2026-04-08T14:12,vos,das,chat\n2026-04-09T08:36,vos,das,chat\n2026-04-09T15:41,reiger,meeuw,sms\n2026-04-10T05:22,reiger,uil,pm\n2026-04-10T09:51,vos,das,chat\n2026-04-10T10:21,egel,vos,chat\n2026-04-11T00:44,reiger,fuut,sms\n2026-04-11T08:13,fuut,reiger,sms\n2026-04-11T09:03,das,egel,chat\n2026-04-11T09:28,uil,vos,pm\n2026-04-12T05:43,meeuw,reiger,sms\n2026-04-12T08:01,das,egel,chat\n2026-04-12T10:43,meeuw,fuut,sms\n2026-04-12T16:50,uil,vos,pm\n2026-04-13T02:02,meeuw,fuut,sms\n2026-04-13T04:17,vos,das,chat\n2026-04-13T11:49,meeuw,reiger,sms\n2026-04-13T19:32,das,vos,chat\n2026-04-13T22:28,egel,vos,chat\n2026-04-14T19:39,vos,das,chat\n2026-04-14T21:34,vos,egel,chat\n2026-04-14T23:07,das,vos,chat\n',
          '/home/analist/lees-mij.txt': 'Velden in berichten.csv: tijd (UTC), van (afzender), naar (ontvanger), kanaal.\nBron: chatexports en forum-pm uit onderzoek Lantaarn (fictief), periode 1-14 april 2026.\n',
        },
      },
      questions: [
        { q: 'Welke alias verstuurt de meeste berichten?', answer: ['vos'],
          hints: ['Tel de afzenders: dat is het tweede veld.', 'Gebruik cut -d , -f 2 berichten.csv | sort | uniq -c | sort -rn', 'Bovenaan staat de alias met 12 berichten.'],
          wrong: { 'reiger': 'reiger staat op twee met 8 berichten.', 'van': 'Dat is de kopregel van het bestand, geen alias.' },
          explain: 'vos verstuurt 12 berichten, gevolgd door reiger (8) en das (7).' },
        { q: 'Hoeveel berichten staan er in het bestand?', answer: ['40', 'veertig'],
          hints: ['wc -l telt de regels.', 'Eén regel is geen bericht.', 'Trek de kopregel af van wat wc -l geeft.'],
          wrong: { '41': 'wc -l telt ook de kopregel tijd,van,naar,kanaal mee.' },
          explain: 'wc -l berichten.csv geeft 41; zonder de kopregel zijn het 40 berichten.' },
        { q: 'Welke alias heeft als enige contact met beide groepen?', answer: ['uil'],
          hints: ['De groepen zijn vos, das en egel aan de ene kant en reiger, meeuw en fuut aan de andere kant.', 'Zoek een alias die zowel met vos als met reiger berichten uitwisselt. Je kunt de kandidaten één voor één met grep bekijken.', 'Hij stuurt vier berichten en gebruikt alleen het kanaal pm.'],
          wrong: { 'vos': 'vos praat met das, egel en de broker, maar met niemand uit de andere groep.', 'reiger': 'reiger praat met meeuw, fuut en de broker, maar met niemand uit de andere groep.' },
          why: 'De meest actieve knoop is zelden de knoop waar het netwerk op leunt. Wie alleen telt, mist de broker.',
          explain: 'grep uil berichten.csv toont zes regels: berichten met vos en met reiger. uil is de broker: lage degree, hoogste betweenness.' },
        { q: 'Waarom staat sort vóór uniq -c in de pijplijn?', options: ['Omdat uniq alleen regels telt die direct op elkaar volgen', 'Omdat uniq anders hoofdletters niet herkent', 'Omdat sort de kopregel verwijdert', 'Dat maakt niet uit, het is alleen voor de netheid'], answer: 0,
          wrong: { 1: 'uniq kijkt naar opeenvolgende gelijke regels; hoofdletters spelen hier geen rol.', 2: 'sort verwijdert niets; de kopregel blijft gewoon staan.', 3: 'Probeer cut -d , -f 2 berichten.csv | uniq -c maar eens: je krijgt tientallen losse tellingen.' },
          explain: 'uniq voegt alleen aangrenzende gelijke regels samen. Zonder sort tel je per reeksje, niet per naam.' },
      ],
    },

    {
      title: 'Taak 3 — Rollen in cybercrimenetwerken',
      tryFirst: true,
      intro: `<p>Zestien beschrijvingen uit dossiers over ransomware en fraude. Elke beschrijving hoort bij één van vier rollen.
        Groepeer ze in het lab.</p>`,
      content: `
        <p>Een cybercrimenetwerk lijkt zelden op een piramide met een baas bovenin. Het lijkt meer op een markt: losse partijen die
        diensten aan elkaar verkopen. Dat heet ook wel <strong>crime-as-a-service</strong>. Wie de rollen kent, ziet sneller wie
        onmisbaar is en wie morgen vervangen is.</p>

        <h3>De kern</h3>
        <p>Bij <strong>ransomware-as-a-service</strong> (RaaS) bouwt en onderhoudt een kerngroep de ransomware, het
        onderhandelingsportaal en de lekwebsite waar gestolen gegevens worden gepubliceerd. De kern werft affiliates en bepaalt de
        verdeling van de buit. Kernleden zijn er weinig en ze zijn moeilijk te vervangen: zij hebben de broncode en de reputatie.</p>

        <h3>Affiliates</h3>
        <p><strong>Affiliates</strong> huren de ransomware en voeren de aanvallen uit: binnendringen, rondkijken, gegevens wegsluizen,
        versleutelen. Zij krijgen vaak het grootste deel van het losgeld en staan de rest af aan de kern. Affiliates wisselen soms
        van RaaS-merk als dat beter uitkomt.</p>

        <h3>Facilitators</h3>
        <p>Facilitators doen niet de aanval zelf, maar leveren iets wat de aanval mogelijk maakt. Ze bedienen vaak meerdere groepen
        tegelijk.</p>
        <table>
          <thead><tr><th>Facilitator</th><th>Wat hij levert</th></tr></thead>
          <tbody>
            <tr><td><strong>Bulletproof hoster</strong></td><td>Servers en IP-ruimte die niet offline gaan na klachten</td></tr>
            <tr><td><strong>Crypter</strong></td><td>Een dienst die malware zo verpakt dat antivirus en EDR hem niet herkennen</td></tr>
            <tr><td><strong>Initial access broker</strong> (IAB)</td><td>Toegang tot bedrijfsnetwerken: VPN-inloggegevens, een webshell, een gekaapt account</td></tr>
            <tr><td><strong>Geldezelronselaar</strong></td><td>Mensen die hun bankrekening beschikbaar stellen om buit door te sluizen</td></tr>
            <tr><td>Wisselaar of cash-outdienst</td><td>Cryptovaluta omzetten in geld zonder vragen te stellen</td></tr>
          </tbody>
        </table>
        <p>Facilitators zijn analytisch interessant omdat ze bruggen vormen tussen groepen die elkaar verder niet kennen. Sommige zijn
        schaars en goed (een betrouwbare crypter), andere zijn makkelijk te vervangen (er zijn veel ronselaars en veel geldezels).</p>

        <h3>Een voorbeeld</h3>
        <p>In een fictief dossier koopt affiliate "vos" toegang tot een bedrijfsnetwerk bij een IAB, laat zijn loader verpakken door
        een crypter, zet zijn lekdata op een server van een bulletproof hoster, en laat het losgeld via een ronselaar door geldezels
        omzetten. Vijf partijen, één aanval. Wie alleen vos aanhoudt, laat vier diensten intact die morgen een andere affiliate
        bedienen.</p>

        <div class="callout tip"><strong>Tip:</strong> beschrijf rollen, niet namen. Een alias kan meerdere rollen hebben, en een rol
        kan door verschillende aliassen worden ingevuld. Je analyse blijft bruikbaar als iemand stopt en een ander zijn plek inneemt.</div>
      `,
      lab: {
        type: 'connections',
        title: 'zestien beschrijvingen, vier rollen',
        prompt: 'Vier rollen: kern (RaaS-operator), affiliate, technische facilitator en financiële facilitator. Zoek steeds de vier beschrijvingen die bij dezelfde rol horen.',
        flag: 'NM{rollen_niet_namen}',
        groups: [
          { name: 'Kern (RaaS-operator)', items: ['Onderhoudt de broncode van de ransomware', 'Beheert de lekwebsite', 'Bepaalt de verdeling van het losgeld', 'Werft nieuwe partners op een forum'] },
          { name: 'Affiliate', items: ['Huurt het ransomwarepakket', 'Beweegt zich zijwaarts door het netwerk van het slachtoffer', 'Start de versleuteling', 'Draagt een deel van het losgeld af'] },
          { name: 'Technische facilitator', items: ['Verhuurt servers die meldingen negeren', 'Verpakt malware tegen detectie', 'Verkoopt VPN-toegang tot bedrijven', 'Verhuurt een botnet voor verspreiding'] },
          { name: 'Financiële facilitator', items: ['Ronselt studenten voor hun bankpas', 'Wisselt crypto om zonder identificatie', 'Stelt een eigen rekening beschikbaar', 'Neemt contant geld op bij automaten'] },
        ],
      },
      questions: [
        { q: 'Welke vlag geeft het lab als alle beschrijvingen bij de juiste rol staan?', answer: ['NM{rollen_niet_namen}'],
          hints: ['Begin bij de financiële rollen: daar gaat het steeds over geld of rekeningen.', 'De kern bezit iets wat anderen huren; de affiliate doet de aanval.', 'Alles wat een dienst aan meerdere groepen levert zonder zelf aan te vallen, is facilitator.'],
          explain: 'Rollen beschrijven wat iemand in het netwerk doet. Dat blijft bruikbaar, ook als de alias wisselt.' },
        { q: 'Hoe heet de facilitator die toegang tot gehackte bedrijfsnetwerken verkoopt?', answer: ['initial access broker', 'IAB', 'access broker', 'een initial access broker'],
          hints: ['Drie Engelse woorden.', 'Hij verkoopt de eerste toegang.', 'De afkorting is IAB.'],
          wrong: { 'crypter': 'Een crypter verpakt malware tegen detectie. Hij levert geen toegang.', 'affiliate': 'De affiliate koopt die toegang juist.' },
          explain: 'Een initial access broker verkoopt de eerste toegang tot een netwerk aan wie de rest van de aanval uitvoert.' },
        { q: 'Waarom levert het aanhouden van een geldezel meestal weinig op voor het netwerk als geheel?', options: ['Geldezels kennen altijd de kern', 'Geldezels zijn makkelijk te vervangen; de ronselaar zoekt een nieuwe', 'Geldezels zijn nooit strafbaar', 'Geldezels hebben de hoogste betweenness'], answer: 1,
          wrong: { 0: 'Geldezels kennen meestal alleen hun ronselaar, als ze die al kennen.', 2: 'Een geldezel kan wel degelijk strafbaar zijn, bijvoorbeeld voor witwassen.', 3: 'Een geldezel zit aan de rand van het netwerk, met één of twee contacten.' },
          why: 'Vervangbaarheid bepaalt of een interventie het netwerk raakt of alleen één schakel.',
          explain: 'Een geldezel is snel vervangen. Wie het netwerk wil raken, kijkt naar schaarse rollen en naar wie meerdere groepen bedient.' },
      ],
    },

    {
      title: 'Taak 4 — Verdachten beschrijven zonder vooroordeel',
      tryFirst: true,
      intro: `<p>Een collega heeft een conceptbeschrijving gemaakt van de aliassen uit onderzoek Lantaarn. Loop in het lab vier
        passages langs en kies telkens de beste formulering.</p>`,
      content: `
        <p>In een intelligenceproduct beschrijf je kenmerken van verdachten. Dat is geen portret van een mens, maar een beschrijving van
        <strong>gedrag in het netwerk</strong>. Hoe preciezer en neutraler je dat doet, hoe bruikbaarder het is voor het team, en hoe
        kleiner de kans dat je onterecht iemand in beeld brengt.</p>

        <h3>Wat je beschrijft</h3>
        <ul>
          <li><strong>Rol</strong>: wat doet deze actor in het netwerk? Kern, affiliate, facilitator, broker.</li>
          <li><strong>Vaardigheden</strong>: wat kan hij aantoonbaar? "Past de loader zelf aan" is iets anders dan "koopt alles kant-en-klaar".</li>
          <li><strong>Middelen</strong>: welke infrastructuur, diensten en geldstromen gebruikt hij?</li>
          <li><strong>OPSEC</strong> (operationele veiligheid): hoe voorzichtig is hij? Hergebruikt hij aliassen, logt hij zonder VPN
          in, gebruikt hij een adres dat ook op een webwinkel staat? OPSEC-fouten zijn vaak de ingang voor identificatie.</li>
          <li><strong>Ritme</strong>: wanneer is hij actief? Een vast patroon kan op een tijdzone of een baan overdag wijzen, maar het
          blijft een aanwijzing.</li>
          <li><strong>Relaties</strong>: met wie, via welk kanaal, en hoe vaak?</li>
        </ul>

        <h3>Wat je niet doet</h3>
        <p>Je trekt geen conclusies uit uiterlijk, afkomst, taal of nationaliteit die niet uit het gedrag volgen. "Schrijft Nederlands
        met fouten die passen bij iemand die het niet als moedertaal heeft" is een waarneming. "Is waarschijnlijk een Oost-Europese
        crimineel" is een stereotype dat je niet kunt onderbouwen en dat het onderzoek kan sturen naar de verkeerde mensen. Artikel 1
        van de Grondwet verbiedt discriminatie, en de Wet politiegegevens vraagt dat je gegevens juist en ter zake dienend zijn.</p>

        <h3>Labels en kanstaal</h3>
        <p>Label elke bewering als <em>bekend</em>, <em>afgeleid</em> of <em>aanname</em>, en gebruik vaste waarschijnlijkheidstermen
        ("waarschijnlijk", "reële kans") in plaats van "lijkt" of "vermoedelijk". Wie het meest berichten stuurt, is niet vanzelf de
        leider. Dat is een aanname tot iets anders het onderbouwt.</p>

        <h3>Waar is het netwerk kwetsbaar?</h3>
        <p>Een goede beschrijving eindigt met de vraag waar ingrijpen het meest oplevert. Kijk naar:</p>
        <ul>
          <li><strong>Brokers en bruggen</strong>: knopen waarvan het wegvallen het netwerk in stukken breekt.</li>
          <li><strong>Schaarse facilitators</strong>: een dienst die meerdere groepen gebruiken en die niet snel te vervangen is.</li>
          <li><strong>Knelpunten in de geldstroom</strong>: de plek waar buit in bruikbaar geld verandert.</li>
        </ul>
        <p>En denk aan verplaatsing: haal je een vervangbare schakel weg, dan neemt een ander zijn plek in en is je inzicht in het
        netwerk verouderd. De beste interventie raakt iets wat niet snel terugkomt.</p>
      `,
      lab: {
        type: 'scenario',
        title: 'vier passages uit een conceptbeschrijving',
        scenario: 'Je leest het concept van een collega mee voordat het naar het team gaat. Kies bij elke passage de beste formulering.',
        pass: 4,
        flag: 'NM{beschrijf_gedrag_niet_mensen}',
        steps: [
          { situation: 'Concept: "uil is waarschijnlijk een Oost-Europese crimineel, want hij schrijft gebrekkig Nederlands."', choices: [
            { label: 'Laten staan; het is een nuttige aanwijzing voor het team', good: false, feedback: 'Van taalfouten naar afkomst en dan naar "crimineel" is een stereotype, geen analyse.' },
            { label: '"uil schrijft Nederlands met fouten die passen bij een niet-moedertaalspreker (afgeleid, 4 berichten)"', good: true, feedback: 'Je beschrijft wat je ziet, met label en bron, en trekt geen conclusie over afkomst.' },
            { label: 'De hele passage schrappen; taal zeg je nooit iets over', good: false, feedback: 'Taalgebruik kan een bruikbaar kenmerk zijn, bijvoorbeeld om aliassen te koppelen. Het gaat om hoe je het formuleert.' } ] },
          { situation: 'Concept: "vos is de leider van het netwerk."', choices: [
            { label: '"vos is de leider (bekend)"', good: false, feedback: 'Niets in de bronnen laat een leidersrol rechtstreeks zien.' },
            { label: '"vos stuurt de meeste berichten (bekend, 12 van 40); of hij leiding geeft, is een aanname"', good: true, feedback: 'Activiteit is een waarneming, leiderschap een interpretatie. Je houdt ze uit elkaar.' },
            { label: '"vos is de leider, want hij heeft de hoogste betweenness"', good: false, feedback: 'Dat klopt niet: uil heeft de hoogste betweenness. En betweenness is ook geen bewijs van leiderschap.' } ] },
          { situation: 'Concept: "specht (uit een ander onderzoek) is alleen actief tussen 02:00 en 06:00 Nederlandse tijd, dus hij woont in Azië."', choices: [
            { label: '"specht is vooral \'s nachts Nederlandse tijd actief; dat past bij een andere tijdzone, maar ook bij nachtwerk of een ander ritme (aanname)"', good: true, feedback: 'Een ritme is een aanwijzing. Je noemt de alternatieven en labelt het als aanname.' },
            { label: 'Laten staan; tijdzones liegen niet', good: false, feedback: 'Mensen werken \'s nachts, plannen berichten in of gebruiken een server elders. Het ritme bewijst geen woonplaats.' },
            { label: 'Vervangen door "uil woont in Nederland"', good: false, feedback: 'Daar is evenmin bewijs voor. Je ruilt de ene onderbouwde gok in voor een andere.' } ] },
          { situation: 'Concept, laatste alinea: "Advies: houd eerst vos aan, want hij is het actiefst."', choices: [
            { label: 'Laten staan; wie het meest doet, is het belangrijkst', good: false, feedback: 'Activiteit zegt weinig over hoe kwetsbaar het netwerk op die plek is.' },
            { label: 'Vervangen door "Advies: houd alle zeven aliassen tegelijk aan"', good: false, feedback: 'Een advies zonder afweging van wat het oplevert en wat het kost, helpt het team niet kiezen.' },
            { label: '"Advies: richt je op de verbinding via uil, die als enige beide groepen verbindt; toets eerst hoe vervangbaar die rol is"', good: true, feedback: 'Je onderbouwt het advies met de netwerkpositie en benoemt de onzekerheid.' } ] },
        ],
      },
      questions: [
        { q: 'Welke vlag geeft het lab als je alle vier de passages goed verbetert?', answer: ['NM{beschrijf_gedrag_niet_mensen}'],
          hints: ['Kies steeds de formulering die beschrijft wat je ziet en de rest labelt.', 'Pas op voor formuleringen die van een waarneming direct een conclusie over een persoon maken.', 'Bij het advies kies je de netwerkpositie, niet de activiteit.'],
          explain: 'Beschrijf gedrag in het netwerk, label wat je niet zeker weet, en onderbouw advies met positie en vervangbaarheid.' },
        { q: 'Een alias logt één keer in zonder VPN, vanaf een vaste thuisaansluiting. Onder welk kenmerk beschrijf je dat?', options: ['Rol', 'Vaardigheden', 'OPSEC', 'Middelen'], answer: 2,
          wrong: { 0: 'Het zegt niets over wat hij in het netwerk doet.', 1: 'Het gaat niet om wat hij kan, maar om hoe voorzichtig hij is.', 3: 'De aansluiting is een middel, maar het punt is dat hij zijn voorzorg liet varen.' },
          why: 'OPSEC-fouten zijn vaak de eerste ingang voor identificatie, maar alleen als je ze apart vastlegt.',
          explain: 'Een OPSEC-fout: de alias liet één keer zijn eigen verbinding zien.' },
        { q: 'Welke formulering is een waarneming en geen interpretatie?', options: ['"reiger is het financiële brein van de groep"', '"reiger stuurde in april 8 berichten, waarvan 4 aan meeuw"', '"reiger is gevaarlijk"', '"reiger is waarschijnlijk de oudste van de groep"'], answer: 1,
          wrong: { 0: 'Een rol als "brein" is een interpretatie die je moet onderbouwen.', 2: 'Een oordeel, geen waarneming.', 3: 'Een aanname zonder zichtbare onderbouwing.' },
          explain: 'Een telling uit een bron met een periode erbij is een waarneming.' },
      ],
    },

    {
      title: 'Taak 5 — Eindcasus: waar raak je het netwerk?',
      tryFirst: true,
      intro: `<p>Drie onderzoeken blijken met elkaar te maken te hebben. Je teamleider vraagt één advies: op welke actor richt je
        een verstoring, als je zoveel mogelijk zaken tegelijk wilt raken? Combineer netwerkpositie, rol en vervangbaarheid.</p>`,
      content: `
        <p>Dit is het moment waarop je analyse een advies wordt. Je hebt de fragmenten in het lab. Werk ze af in drie stappen.</p>
        <ol>
          <li><strong>Teken de graaf over de zaken heen.</strong> Welke actoren komen in meer dan één onderzoek voor? Zo'n actor is een
          brug tussen groepen die elkaar verder niet kennen.</li>
          <li><strong>Bepaal de rol.</strong> Is het kern, affiliate of facilitator? Wat levert hij, en aan wie?</li>
          <li><strong>Toets de vervangbaarheid.</strong> Hoeveel anderen bieden hetzelfde aan? Een rol die op elke straathoek te koop
          is, komt na een interventie meteen terug.</li>
        </ol>

        <h3>De valkuil van de teller</h3>
        <p>De berichtentellingen staan er niet voor niets bij. Het is verleidelijk om de actor met de meeste berichten aan te wijzen.
        Maar je hebt in taak 2 gezien dat de meest actieve knoop vaak midden in zijn eigen groep zit en weinig met de buitenwereld te
        maken heeft. Zijn wegvallen raakt één cel.</p>

        <h3>Een advies dat een team kan gebruiken</h3>
        <p>Schrijf je advies in één zin, met de reden erbij: "Richt de verstoring op X, omdat X als enige ... levert aan ... en er
        weinig alternatieven voor zijn (afgeleid uit ...)." Noem daarna wat je niet weet: wie er achter de alias zit, of hij snel
        een opvolger heeft, en welke partner de interventie het best kan uitvoeren. Een verstoring hoeft geen aanhouding te zijn;
        het kan ook een hoster, platform of bank zijn die op basis van jouw analyse een dienst beëindigt.</p>

        <div class="callout warn"><strong>Let op:</strong> een alias die in drie zaken opduikt, kan ook drie verschillende mensen
        zijn die toevallig dezelfde naam kozen. Controleer of er een selector is die de optredens verbindt, zoals hetzelfde
        contactadres of dezelfde wallet.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'drie onderzoeken naast elkaar',
        scenario: 'Fictief. Drie teams werkten los van elkaar. Bij het samenvoegen van hun bevindingen kwamen deze fragmenten boven.',
        records: [
          { title: 'Onderzoek Lantaarn (ransomware-affiliate)', lines: ['Leden: vos, das, egel', 'Chat vos: "ijsvogel heeft de nieuwe stub gestuurd, scanners zien niks"', 'Cash-out via reiger'] },
          { title: 'Onderzoek Heide (andere ransomware-affiliate)', lines: ['Leden: mus, merel', 'Chat mus: "zonder ijsvogel komen we niet langs de EDR"', 'Betaling aan wallet bc1q-fictief-ijs-01'] },
          { title: 'Onderzoek Kade (phishingcrew)', lines: ['Leden: specht, kauw', 'Maandelijkse betaling aan wallet bc1q-fictief-ijs-01 met omschrijving "FUD"'] },
          { title: 'Forumprofielen', lines: ['ijsvogel: "crypter, FUD, max. 5 klanten tegelijk", actief sinds 2023, contact via bc1q-fictief-ijs-01', 'reiger: "cash-out NL, geldezels beschikbaar"', 'Op hetzelfde forum bieden nog minstens 20 anderen cash-out met geldezels aan'] },
          { title: 'Berichtentelling (alle drie de onderzoeken)', lines: ['vos 112 · mus 87 · specht 64 · reiger 41 · ijsvogel 9'] },
        ],
        ask: [
          { q: 'Welke alias stuurde de meeste berichten?', answer: ['vos'], hint: 'Kijk in de berichtentelling.' },
          { q: 'Hoeveel anderen bieden op het forum minstens hetzelfde aan als reiger?', answer: ['20', 'twintig'], hint: 'Zie de forumprofielen.' },
        ],
      },
      questions: [
        { q: 'Boss: op welke alias richt je de verstoring om met één interventie de meeste onderzoeken tegelijk te raken?', boss: true, answer: ['ijsvogel'],
          hints: ['Zoek de alias die in alle drie de onderzoeken terugkomt, direct of via een selector.', 'Let op de wallet in onderzoek Heide en Kade en het contact in de forumprofielen.', 'Het is de crypter met negen berichten.'],
          wrong: { 'vos': 'vos stuurt de meeste berichten, maar zit alleen in onderzoek Lantaarn. Zijn wegvallen raakt één cel.', 'reiger': 'reiger zit alleen in Lantaarn en is makkelijk te vervangen: minstens twintig anderen bieden hetzelfde aan.', 'mus': 'mus zit alleen in onderzoek Heide.', 'specht': 'specht zit alleen in onderzoek Kade.' },
          why: 'De sterkste interventie raakt een schaarse facilitator die meerdere groepen verbindt, niet de luidste deelnemer van één groep.',
          explain: 'ijsvogel wordt in Lantaarn genoemd in de chat van vos (een bewering, nog geen waargenomen contact), en in Heide en Kade via wallet bc1q-fictief-ijs-01, die ook in zijn forumprofiel staat. Hij levert een schaarse dienst (crypter, maximaal vijf klanten) aan drie groepen: lage degree, hoge betweenness, moeilijk te vervangen.' },
        { q: 'Welke selector verbindt de optredens in onderzoek Heide en Kade met het forumprofiel?', answer: ['bc1q-fictief-ijs-01', 'de wallet', 'wallet'],
          hints: ['Zoek een gegeven dat letterlijk in drie fragmenten staat.', 'Het is geen alias maar een cryptoadres.', 'Het begint met bc1q.'],
          explain: 'Hetzelfde wallet-adres staat in Heide, Kade en het forumprofiel. Dat maakt de koppeling sterker dan alleen een gelijke alias.' },
        { q: 'Waarom is reiger een minder goed doelwit dan het aantal berichten doet vermoeden?', options: ['Omdat reiger in alle drie de onderzoeken voorkomt', 'Omdat cash-out met geldezels breed wordt aangeboden en reiger dus snel te vervangen is', 'Omdat reiger geen berichten stuurt', 'Omdat reiger de kern van de RaaS is'], answer: 1,
          wrong: { 0: 'reiger komt alleen in onderzoek Lantaarn voor.', 2: 'reiger stuurde 41 berichten.', 3: 'Niets wijst erop dat reiger ransomware ontwikkelt; hij biedt cash-out aan.' },
          explain: 'Minstens twintig anderen bieden hetzelfde aan. Valt reiger weg, dan neemt een ander zijn plek in.' },
      ],
    },

    {
      title: 'Taak 6 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examen- en assessmentvragen over netwerkanalyse geven je een kleine graaf of een casus en vragen welke maat of welke
        actor ertoe doet. De afleiders zijn meestal echte begrippen die net een andere vraag beantwoorden. Vraag je steeds af: gaat
        het om activiteit, om positie tussen groepen, of om afstand tot iedereen? De vragen hieronder zijn zelf geschreven; alles is
        fictief.</p>
      `,
      questions: [
        { q: 'Een analist wil weten welke actor de meeste verschillende mensen rechtstreeks spreekt. Welke maat gebruikt hij?', options: ['Degree', 'Betweenness', 'Closeness', 'Gewicht van één relatie'], answer: 0,
          wrong: { 1: 'Betweenness gaat over op hoeveel kortste routes iemand ligt, niet over het aantal directe contacten.', 2: 'Closeness gaat over de gemiddelde afstand tot iedereen.', 3: 'Het gewicht zegt hoe sterk één relatie is, niet hoeveel relaties er zijn.' },
          explain: 'Degree telt de directe contacten.' },
        { q: 'Twee cellen hebben onderling geen contact, behalve via één persoon. Hoe heet die persoon in netwerktermen?', options: ['Een isolaat', 'Een broker', 'Een kliek', 'Een geldezel'], answer: 1,
          wrong: { 0: 'Een isolaat heeft geen enkele verbinding.', 2: 'Een kliek is een groep waarin iedereen met iedereen verbonden is.', 3: 'Een geldezel is een rol in de geldstroom, geen netwerkpositie.' },
          explain: 'Een broker verbindt groepen die anders los van elkaar staan, en heeft daardoor een hoge betweenness.' },
        { q: 'Een analist schrijft: "X is de leider, want X heeft de hoogste degree." Wat is de beste kritiek?', options: ['Degree moet je altijd gewogen berekenen', 'Een hoge degree laat activiteit zien; leiderschap is een interpretatie die aanvullende onderbouwing vraagt', 'Leiders hebben altijd de laagste degree', 'De kritiek is onterecht; dit is een standaardconclusie'], answer: 1,
          wrong: { 0: 'Gewogen of niet, het blijft een maat voor activiteit.', 2: 'Dat is net zo goed een ongeldige regel.', 3: 'Het is juist een veelgemaakte denkfout.' },
          explain: 'Netwerkmaten beschrijven posities. Wat iemand met die positie doet, onderbouw je met andere bronnen.' },
      ],
    },
  ],

  check: [
    { q: 'Wat meet betweenness?', options: ['Het aantal directe contacten', 'Hoe vaak een knoop op de kortste route tussen twee andere knopen ligt', 'De gemiddelde afstand tot alle anderen', 'Het aantal berichten dat iemand stuurt'], answer: 1, explain: 'Hoge betweenness betekent: veel verkeer tussen anderen loopt via deze knoop.' },
    { q: 'Wat is een gerichte, gewogen relatie?', options: ['A en B zitten in dezelfde chatgroep', 'A betaalt B in totaal 0,4 BTC', 'A en B wonen in dezelfde stad', 'A noemt B in een bericht aan C'], answer: 1, explain: 'Een betaling heeft een richting (van A naar B) en een gewicht (het bedrag).' },
    { q: 'Welke rol levert malware een verpakking die antivirus en EDR omzeilt?', options: ['Initial access broker', 'Crypter', 'Geldezelronselaar', 'Affiliate'], answer: 1, explain: 'Een crypter is een technische facilitator die vaak meerdere groepen bedient.' },
    { q: 'Waarom is vervangbaarheid belangrijk bij het kiezen van een interventie?', options: ['Omdat vervangbare rollen na een interventie snel door een ander worden ingevuld', 'Omdat vervangbare actoren altijd onschuldig zijn', 'Omdat het netwerk dan groter wordt', 'Het is niet belangrijk'], answer: 0, explain: 'Een interventie op een vervangbare schakel lokt vooral verplaatsing uit.' },
  ],

  terms: [
    { term: 'Graaf', def: 'Een model van knopen (actoren of dingen) en relaties (lijnen) ertussen.' },
    { term: 'Gerichte relatie', def: 'Een relatie met een richting, zoals een bericht of betaling van A naar B.' },
    { term: 'Gewogen relatie', def: 'Een relatie met een sterkte, zoals het aantal berichten of het bedrag.' },
    { term: 'Informatiestroom', def: 'De weg die berichten, opdrachten en kennis door een netwerk afleggen: wie weet wat, van wie en via welk kanaal.' },
    { term: 'Degree', def: 'Het aantal directe contacten van een knoop; bij gerichte relaties in- en out-degree, en gewogen als je berichten telt.' },
    { term: 'Betweenness', def: 'Hoe vaak een knoop op de kortste route tussen twee andere knopen ligt.' },
    { term: 'Closeness', def: 'Hoe dicht een knoop gemiddeld bij alle andere knopen ligt.' },
    { term: 'Broker', def: 'Een knoop die groepen verbindt die anders los van elkaar staan; vaak weinig contacten maar hoge betweenness.' },
    { term: 'Affiliate', def: 'Een partij die een ransomwarepakket huurt van een RaaS-kern, de aanvallen uitvoert en een deel van de buit afdraagt.' },
    { term: 'Initial access broker', def: 'Een facilitator die toegang tot gehackte netwerken verkoopt aan wie de aanval verder uitvoert.' },
    { term: 'Crypter', def: 'Een dienst die malware zo verpakt dat beveiligingssoftware hem niet herkent.' },
    { term: 'OPSEC', def: 'Operationele veiligheid: hoe voorzichtig een actor is met sporen die naar hem kunnen leiden.' },
  ],

  resources: [
    { title: 'Europol — Internet Organised Crime Threat Assessment (IOCTA)', url: 'https://www.europol.europa.eu/publications-events/main-reports' },
    { title: 'NCSC — Cybersecuritybeeld Nederland en dreigingsinformatie', url: 'https://www.ncsc.nl/' },
    { title: 'Politie — cybercrime', url: 'https://www.politie.nl/onderwerpen/cybercrime.html' },
  ],
});
