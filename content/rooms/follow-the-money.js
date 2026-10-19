/* Room: Follow the money — cryptostromen volgen */

// --- De fictieve witwasketen (alle adressen/partijen zijn verzonnen) ---
const KETEN_NODES = [
  { id: 'v', type: 'victim', label: 'VrachtVlot BV (slachtoffer)' },
  { id: 'w1', type: 'wallet', label: 'Ransom-wallet (aanvaller)' },
  { id: 'm1', type: 'mule', label: "Mule 'KoeriersKoen'" },
  { id: 'm2', type: 'mule', label: "Mule 'SnelleSaar'" },
  { id: 'h1', type: 'wallet', label: 'Tussenwallet (hop)' },
  { id: 'mix', type: 'mixer', label: "Mixer 'WasStraat'" },
  { id: 'ex', type: 'exchange', label: "Exchange 'MuntMarkt' (cash-out)" },
];

const KETEN_EDGES = [
  { from: 'v', to: 'w1', amount: 4.0, time: '09:02', note: 'losgeldbetaling na ransomware (placement)' },
  { from: 'w1', to: 'm1', amount: 2.4, time: '10:10', note: 'splitsing 1 naar money mule (layering)' },
  { from: 'w1', to: 'm2', amount: 1.6, time: '10:12', note: 'splitsing 2 naar money mule (layering)' },
  { from: 'm1', to: 'h1', amount: 2.35, time: '11:30', note: 'mule houdt 0.05 commissie; hopt door (chain-hop)' },
  { from: 'm2', to: 'mix', amount: 1.55, time: '11:45', note: 'mule houdt 0.05 commissie; recht naar de mixer' },
  { from: 'h1', to: 'mix', amount: 2.30, time: '12:20', note: 'tussenwallet houdt 0.05; rest naar de mixer' },
  { from: 'mix', to: 'ex', amount: 3.75, time: '14:05', note: 'mixer houdt 0.10; uitbetaling op exchange-account (cash-out)' },
];

CS.registerRoom({
  id: 'follow-the-money',
  path: 'puzzels',
  order: 1,
  title: 'Follow the money: cryptostromen volgen',
  icon: '💸',
  difficulty: 'Gemiddeld',
  minutes: 60,
  summary: 'Crypto is geen anoniem zakgeld maar een doorzichtig kasboek. Je leert hoe transacties werken, hoe criminelen in drie stappen witwassen, welke truucs (mixers, peel chains, chain-hopping) de keten vertroebelen, en hoe een rechercheur met heuristieken en het exchange-knelpunt de buit toch terugvolgt.',
  objectives: [
    'Uitleggen hoe een cryptotransactie werkt: adressen, inputs/outputs (UTXO) en het publieke grootboek',
    'De drie witwasfasen (placement, layering, integration) herkennen en toepassen op crypto',
    'Mixers/tumblers, peel chains en chain-hopping herkennen als verhullingstechnieken',
    'De common-input- en de change-heuristiek gebruiken om adressen aan één eigenaar te koppelen',
    'Uitleggen waarom de exchange (KYC/Wwft) het knelpunt is waar de opsporing aangrijpt',
    'Een geldstroom door de keten narekenen en de buit tot het cash-out-punt volgen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Het doorzichtige kasboek: hoe cryptotransacties werken',
      content: `
        <p>Veel mensen denken dat cryptovaluta zoals Bitcoin "anoniem" is. Dat klopt maar half, en juist dat halve maakt
        het zo leuk voor een rechercheur. Bitcoin heeft namelijk één groot, <strong>openbaar kasboek</strong> dat
        <em>iedereen</em> mag inzien: de <strong>blockchain</strong> (het publieke grootboek). Elke betaling die ooit is
        gedaan, staat erin — voor altijd.</p>

        <h3>De analogie van de glazen spaarpot</h3>
        <p>Stel je een stad voor waarin iedereen zijn geld bewaart in een <strong>glazen spaarpot met een nummer erop</strong>
        (geen naam). Iedereen kan zien hoeveel er in elke pot zit en welke pot naar welke pot geld schuift. Je ziet alleen
        de <em>nummers</em>, niet meteen de namen. Dat nummer is een <strong>wallet-adres</strong>: een lange reeks
        tekens zoals <code>1Fh7…k9Qd</code> (fictief). Zolang niemand weet van wie een adres is, lijkt het anoniem. Maar
        zodra je één adres aan een echte persoon kunt koppelen, kun je al zijn glazen potten volgen. Dat heet
        <strong>pseudonimiteit</strong>: niet anoniem, maar onder een schuilnaam.</p>

        <h3>Een transactie: inputs en outputs</h3>
        <p>Een cryptotransactie werkt niet zoals je bankrekening (een lopend saldo dat op- en afgaat). In Bitcoin werkt het
        met <strong>UTXO's</strong> (Unspent Transaction Outputs): losse "briefjes" van ontvangen bedragen. Als je iets
        betaalt, pak je een of meer hele briefjes (de <strong>inputs</strong>), en de transactie maakt er nieuwe briefjes
        van (de <strong>outputs</strong>): één naar de ontvanger, en meestal één terug naar jezelf als
        <strong>wisselgeld</strong> (change).</p>

        <div class="callout info">
          <strong>Voorbeeld:</strong> je hebt een briefje van 1,0 BTC en wilt iemand 0,6 BTC betalen. Je kunt een briefje
          niet "scheuren", dus je gebruikt het hele briefje (input 1,0) en de transactie maakt twee outputs: 0,6 naar de
          ontvanger en 0,4 terug naar een eigen (wissel)adres. Dat wisselgeld-briefje van 0,4 is later een belangrijk spoor.
        </div>

        <p>Omdat álles in het grootboek staat, kan een onderzoeker de briefjes van transactie naar transactie volgen, net
        als een boekhouder die elke euro door de administratie traceert. Dat is de kern van "follow the money".</p>
      `,
      questions: [
        { q: 'Hoe heet het openbare kasboek waarin alle Bitcoin-transacties voor altijd staan?', answer: ['blockchain', 'de blockchain', 'publiek grootboek', 'het publieke grootboek'], hint: 'Een keten van blokken; ook wel "publiek grootboek" genoemd.', explain: 'De blockchain is het publieke grootboek: iedereen kan elke transactie inzien.' },
        { q: 'Waarom is Bitcoin pseudoniem en niet echt anoniem?', options: ['Omdat de politie alle wachtwoorden heeft', 'Omdat adressen nummers zonder naam zijn, maar één koppeling adres-persoon maakt alle transacties volgbaar', 'Omdat transacties na een dag verdwijnen', 'Omdat je geen adres nodig hebt'], answer: 1, explain: 'Adressen zijn schuilnamen. Koppel je één adres aan een persoon, dan liggen al zijn stromen open.' },
        { q: 'Hoe heten de losse "briefjes" van ontvangen bedragen die je als input in een nieuwe transactie gebruikt?', answer: ['UTXO', 'utxo', "UTXO's", 'unspent transaction output'], hint: 'Afkorting van Unspent Transaction Output.', explain: 'Een UTXO is een nog niet uitgegeven output; die gebruik je als input in een volgende transactie.' },
        { q: 'Wat is de change-output van een transactie?', options: ['Een boete', 'Het wisselgeld dat terugkomt naar een eigen adres van de betaler', 'Het bedrag naar de ontvanger', 'Een mislukte transactie'], answer: 1, explain: 'Wie een te groot briefje gebruikt, krijgt het restant als change terug op een eigen adres — een belangrijk spoor.' },
      ],
    },

    {
      title: 'Taak 2 — Witwassen in drie stappen',
      content: `
        <p>Crimineel geld is "heet": je kunt er niet zomaar een huis mee kopen zonder vragen. <strong>Witwassen</strong>
        (money laundering) is het proces om misdaadgeld er schoon en legaal uit te laten zien. Klassiek gebeurt dat in
        <strong>drie fasen</strong>. Ze gelden voor een koffer vol contant geld én voor een wallet vol crypto.</p>

        <figure class="diagram">
          <svg viewBox="0 0 560 120" role="img" aria-label="De drie fasen van witwassen">
            <rect x="8" y="42" width="150" height="40" rx="6" stroke="var(--accent)" fill="none" />
            <text x="83" y="66" fill="currentColor" font-size="13" text-anchor="middle">1 · Placement</text>
            <rect x="205" y="42" width="150" height="40" rx="6" stroke="currentColor" fill="none" />
            <text x="280" y="66" fill="currentColor" font-size="13" text-anchor="middle">2 · Layering</text>
            <rect x="402" y="42" width="150" height="40" rx="6" stroke="var(--good)" fill="none" />
            <text x="477" y="66" fill="currentColor" font-size="13" text-anchor="middle">3 · Integration</text>
            <line x1="158" y1="62" x2="205" y2="62" stroke="currentColor" />
            <line x1="355" y1="62" x2="402" y2="62" stroke="currentColor" />
          </svg>
          <figcaption>Placement = erin, layering = door elkaar husselen, integration = er schoon weer uit.</figcaption>
        </figure>

        <h3>1. Placement — het geld het systeem in</h3>
        <p>De misdaadopbrengst komt het financiële systeem binnen. Bij crypto is dit vaak het moment dat een slachtoffer
        losgeld in Bitcoin naar de wallet van de aanvaller stuurt, of dat contant drugsgeld bij een (katvanger-)handelaar
        wordt omgezet in crypto.</p>

        <h3>2. Layering — het spoor vertroebelen</h3>
        <p>Dit is de kern. Het geld wordt in vele laagjes (layers) rondgepompt om het spoor te verbergen: opsplitsen over
        tientallen wallets, door <strong>mixers</strong> halen, van de ene munt naar de andere springen. Hoe meer hops,
        hoe moeilijker te volgen — denkt de crimineel. Jij leert dat het grootboek elke hop onthoudt.</p>

        <h3>3. Integration — er schoon weer uit</h3>
        <p>Het "gewassen" geld komt terug in de echte economie met een schijnbaar legale herkomst: het wordt bij een
        <strong>exchange</strong> omgezet naar euro's, er wordt een auto of vastgoed mee gekocht, of het wordt als
        "winst" van een nepbedrijf geboekt.</p>

        <div class="callout tip">
          <strong>Ezelsbruggetje:</strong> denk aan een echte wasmachine. <em>Placement</em> = vuile was in de trommel,
          <em>layering</em> = het rondtollen zodat je niet meer ziet welk sokje van wie was, <em>integration</em> = schone
          was keurig in de kast.
        </div>
      `,
      questions: [
        { q: 'In welke witwasfase wordt het geld opgesplitst en door mixers gehaald om het spoor te vertroebelen?', answer: ['layering', 'de layering', 'layering-fase'], hint: 'De middelste fase; "laagjes" aanbrengen.', explain: 'Layering is het rondpompen in vele laagjes om de herkomst te verbergen.' },
        { q: 'Een slachtoffer stuurt losgeld in Bitcoin naar de wallet van de aanvaller. Welke fase is dat?', options: ['Integration', 'Placement', 'Layering', 'Geen van de fasen'], answer: 1, explain: 'Placement: de misdaadopbrengst komt het (financiële) systeem binnen.' },
        { q: 'In welke fase komt het "schone" geld terug in de echte economie, bijvoorbeeld als auto of als omzetting naar euro\'s?', answer: ['integration', 'de integration', 'integratie'], hint: 'De laatste fase; het geld wordt weer "geïntegreerd".', explain: 'Integration: het gewassen geld krijgt een schijnbaar legale herkomst en keert terug in de economie.' },
      ],
    },

    {
      title: 'Taak 3 — De trucendoos: mixers, peel chains en chain-hopping',
      content: `
        <p>In de layering-fase gebruiken criminelen een vaste trucendoos om de keten te vertroebelen. Je moet ze op naam
        kennen, want straks herken je ze in een echt grootboek.</p>

        <h3>Mixers en tumblers</h3>
        <p>Een <strong>mixer</strong> (of <strong>tumbler</strong>) is een dienst die de crypto van heel veel mensen op één
        grote hoop gooit en daarna weer uitbetaalt. Het idee: je stopt er 1 BTC in, en je krijgt 1 BTC terug — maar andere
        "munten" dan je erin deed, zodat de directe link tussen in en uit doorgeknipt lijkt. Een variant die zónder centrale
        dienst werkt is <strong>CoinJoin</strong>: veel mensen ondertekenen samen één grote transactie, zodat niet duidelijk
        is welke input bij welke output hoort.</p>

        <div class="callout info">
          <strong>Toch niet waterdicht:</strong> mixers kosten geld (een fee), hebben vaak herkenbare bedragen en timing, en
          analysebedrijven zoals Chainalysis en Elliptic hebben veel mixer-adressen in kaart. Een "gewassen" bedrag dat
          verdacht dicht bij het ingelegde bedrag uitkomt, verraadt alsnog de link.
        </div>

        <h3>Peel chains</h3>
        <p>Een <strong>peel chain</strong> (afpelketen) is een lange rij transacties waarbij je telkens een klein stukje
        "afpelt" naar een cash-out en de grote rest doorschuift naar een volgend adres. Zoals je een ui pelt: laagje voor
        laagje. In het grootboek zie je dan een lange keten waarbij steeds een beetje afsplitst en een grote "change" verder
        reist. Het patroon is juist herkenbaar.</p>

        <h3>Chain-hopping</h3>
        <p><strong>Chain-hopping</strong> is overspringen van de ene cryptomunt of blockchain naar de andere (bijvoorbeeld
        Bitcoin → een privacymunt → weer terug), vaak via een beurs of een swap-dienst. Elke "hop" naar een andere keten
        maakt het volgen lastiger, omdat je het spoor op een ándere blockchain moet oppikken.</p>

        <p>Onthoud: elk van deze trucs kost tijd, geld en laat een <em>patroon</em> na. De crimineel wil onzichtbaar worden,
        maar juist de moeite die hij doet, tekent zich af in het grootboek.</p>
      `,
      questions: [
        { q: 'Hoe heet een dienst die crypto van veel gebruikers op één hoop gooit en door elkaar uitbetaalt om de link tussen in en uit te verbergen?', answer: ['mixer', 'tumbler', 'een mixer', 'mixer of tumbler'], hint: 'Ook wel "tumbler" genoemd.', explain: 'Een mixer/tumbler vermengt de munten van veel gebruikers om de directe in-uit-link door te knippen.' },
        { q: 'Wat is een peel chain?', options: ['Een lijst wachtwoorden', 'Een lange keten waarbij telkens een klein deel wordt afgesplitst en de grote rest doorschuift', 'Een versleutelde chatgroep', 'Een type wallet'], answer: 1, explain: 'Bij een peel chain "pel" je steeds een stukje af naar cash-out terwijl de grote rest doorreist.' },
        { q: 'Wat betekent chain-hopping?', answer: ['overspringen naar een andere blockchain', 'van de ene munt naar de andere springen', 'chain-hopping'], hint: 'Je "hopt" van de ene keten/munt naar de andere.', explain: 'Chain-hopping is overspringen naar een andere cryptomunt/blockchain om het spoor te breken.' },
        { q: 'Waarom zijn mixers in de praktijk niet zo onzichtbaar als ze lijken?', options: ['Ze zijn gratis en snel', 'Fees, herkenbare bedragen/timing en in kaart gebrachte mixer-adressen verraden alsnog de link', 'Ze bestaan niet', 'Ze wissen de hele blockchain'], answer: 1, explain: 'Kosten, timing, bedragen en bekende adressen laten een patroon na dat analisten kunnen oppikken.' },
      ],
    },

    {
      title: 'Taak 4 — Follow the money: volg de keten',
      content: `
        <p>Tijd om rechercheur te spelen. Hieronder staat de <strong>geldstroom</strong> van een fictieve zaak. Logistiek
        bedrijf <strong>VrachtVlot BV</strong> werd getroffen door ransomware en betaalde losgeld in BTC. De aanvaller
        probeerde het geld te wassen via twee <strong>money mules</strong>, een <strong>tussenwallet</strong> en een
        <strong>mixer</strong>, om ten slotte uit te betalen op een <strong>exchange</strong>.</p>

        <div class="callout warn">
          <strong>Alles fictief:</strong> de wallets, mules, de mixer "WasStraat" en de exchange "MuntMarkt" zijn verzonnen
          voor de oefening. Je oefent de denkwijze, je volgt geen echte mensen.
        </div>

        <h3>Zo lees je het lab</h3>
        <ul>
          <li><strong>Klik een knoop</strong> (bijvoorbeeld de mixer) om te zien wat er in- en uitgaat en wat het saldo is.</li>
          <li><strong>Lees de transactietabel</strong> onderaan: elke regel is één transactie met bedrag, tijd en een notitie.</li>
          <li><strong>Reken na.</strong> Een knoop die van meerdere kanten geld ontvangt, tel je op. Een "commissie" die een
          mule achterhoudt, is het verschil tussen wat er binnenkomt en wat er weer uitgaat.</li>
        </ul>

        <p>De beste manier om de stroom te snappen: tel per knoop op wat erin komt en wat eruit gaat. Het verschil is wat die
        knoop voor zichzelf houdt. Volg zo het geld tot het cash-out-punt — de <strong>exchange</strong>.</p>
      `,
      lab: {
        type: 'flow',
        title: 'Operatie Spookvracht — de witwasketen',
        unit: 'BTC',
        scenario: 'VrachtVlot BV betaalde 4.0 BTC losgeld. Volg de stroom door de mules, de tussenwallet en de mixer tot het cash-out-punt. Reken de bedragen per knoop na.',
        nodes: KETEN_NODES,
        edges: KETEN_EDGES,
        ask: [
          { q: 'Hoeveel BTC betaalde VrachtVlot BV in totaal als losgeld?', answer: ['4', '4.0', '4,0'], hint: 'Kijk naar de eerste transactie (van het slachtoffer naar de ransom-wallet).' },
          { q: 'Hoeveel BTC komt er in totaal binnen bij de mixer "WasStraat"? (tel beide inkomende stromen op)', answer: ['3.85', '3,85'], hint: 'De mixer ontvangt van mule 2 (1.55) én van de tussenwallet (2.30). Klik de mixer-knoop voor het totaal.' },
          { q: 'Hoeveel BTC bereikt uiteindelijk de exchange "MuntMarkt" (het cash-out-punt)?', answer: ['3.75', '3,75'], hint: 'De laatste transactie: van de mixer naar de exchange.' },
          { q: 'Welke knoop is het knelpunt waar de opsporing kan aangrijpen (KYC)?', answer: ['exchange', 'de exchange', 'muntmarkt', 'exchange muntmarkt'], hint: 'De plek waar crypto naar euro\'s gaat en identiteitscontrole plaatsvindt.' },
        ],
      },
      questions: [
        { q: 'Hoeveel BTC betaalde VrachtVlot BV in totaal als losgeld?', answer: ['4', '4.0', '4,0'], hint: 'De eerste regel in de transactietabel.', explain: 'Het slachtoffer stuurde 4.0 BTC naar de ransom-wallet.' },
        { q: 'Hoeveel BTC komt er in totaal binnen bij de mixer "WasStraat"?', answer: ['3.85', '3,85'], hint: 'Mule 2 brengt 1.55, de tussenwallet brengt 2.30. Tel op: 1.55 + 2.30.', explain: '1.55 (van mule 2) + 2.30 (van de tussenwallet) = 3.85 BTC komt de mixer binnen.' },
        { q: 'Hoeveel BTC bereikt uiteindelijk de exchange "MuntMarkt"?', answer: ['3.75', '3,75'], hint: 'De mixer houdt 0.10 in en betaalt de rest uit.', explain: 'De mixer kreeg 3.85 binnen, hield 0.10 en betaalde 3.75 BTC uit op de exchange — dat is het cash-out-punt.' },
        { q: 'Hoeveel "commissie" hield mule "KoeriersKoen" (m1) voor zichzelf achter?', answer: ['0.05', '0,05'], hint: 'Het verschil tussen wat de mule binnenkreeg (2.4) en weer doorstuurde (2.35).', explain: 'KoeriersKoen kreeg 2.4 binnen en stuurde 2.35 door: 2.4 − 2.35 = 0.05 BTC bleef als commissie hangen (het saldo van die knoop).' },
      ],
    },

    {
      title: 'Taak 5 — De heuristieken: adressen aan één eigenaar koppelen',
      content: `
        <p>Een rechercheur ziet in het grootboek alleen nummers. Toch kan hij vaak bewijzen dat verschillende adressen van
        <em>dezelfde</em> eigenaar zijn. Daarvoor gebruikt hij <strong>heuristieken</strong>: slimme vuistregels die bijna
        altijd kloppen. Twee zijn beroemd.</p>

        <h3>1. De common-input-heuristiek (co-spend)</h3>
        <p>Als één transactie <strong>meerdere inputs</strong> tegelijk uitgeeft, dan moet iemand al die briefjes hebben
        kunnen ondertekenen — dus ze horen hoogstwaarschijnlijk bij <strong>dezelfde eigenaar</strong>. Immers: om een
        briefje uit te geven heb je de bijbehorende private sleutel nodig. Worden briefje A én briefje B in één transactie
        uitgegeven, dan beheert dezelfde partij waarschijnlijk beide. Zo kun je losse adressen samentrekken tot één
        <strong>cluster</strong> (één "portemonnee").</p>

        <div class="callout info">
          <strong>Voorbeeld:</strong> adres X (0,3 BTC) en adres Y (0,7 BTC) worden sámen uitgegeven in één transactie van
          1,0 BTC. Conclusie: X en Y horen vrijwel zeker bij dezelfde eigenaar. De uitzondering is CoinJoin, waar
          vreemden juist bewust samen tekenen — daarom checkt een analist of de transactie op een mixer lijkt.
        </div>

        <h3>2. De change-heuristiek</h3>
        <p>Weet je nog, het wisselgeld (change) uit taak 1? Als een transactie één betaling doet en één restbedrag
        terugstuurt, dan is dat restbedrag meestal de change — en die gaat terug naar een <strong>eigen (nieuw) adres</strong>
        van de betaler. Door de change-output te herkennen, volg je de eigenaar naar zijn <em>volgende</em> adres, zelfs als
        hij steeds een vers adres gebruikt. Zo rijg je een hele peel chain aan elkaar.</p>

        <p>Met deze twee heuristieken plus het publieke grootboek bouwt een analist een kaart: welke adressen bij elkaar
        horen, waar het geld heen stroomt, en bij welke bekende dienst (mixer, exchange) het uitkomt. Precies dat doen
        bedrijven als Chainalysis en de FIOD in het echt.</p>
      `,
      questions: [
        { q: 'Wat zegt de common-input-heuristiek?', options: ['Alle transacties zijn anoniem', 'Als meerdere inputs in één transactie samen worden uitgegeven, horen ze waarschijnlijk bij dezelfde eigenaar', 'Elke input hoort bij een andere persoon', 'Inputs bestaan niet in Bitcoin'], answer: 1, explain: 'Samen uitgeven vereist alle bijbehorende sleutels, dus de inputs horen vrijwel zeker bij één eigenaar (één cluster).' },
        { q: 'Welke heuristiek gebruik je om de eigenaar naar zijn volgende adres te volgen via het wisselgeld van een transactie?', answer: ['change-heuristiek', 'de change-heuristiek', 'change heuristiek'], hint: 'Ze is vernoemd naar het wisselgeld (change).', explain: 'De change-heuristiek herkent de wisselgeld-output, die teruggaat naar een eigen adres van de betaler.' },
        { q: 'Het samentrekken van losse adressen tot één "portemonnee" van dezelfde eigenaar heet...', answer: ['clustering', 'clusteren', 'cluster'], hint: 'Je vormt een "cluster" van adressen.', explain: 'Clustering: adressen die bij elkaar horen bundel je tot één entiteit/eigenaar.' },
        { q: 'Bij welke techniek faalt de common-input-heuristiek juist, omdat vreemden expres samen één transactie tekenen?', options: ['Bij CoinJoin', 'Bij een gewone betaling', 'Bij een change-output', 'Bij een losgeldbetaling'], answer: 0, explain: 'CoinJoin laat vreemden samen tekenen, precies om de common-input-aanname te breken; daarom checkt een analist of het op een mixer lijkt.' },
      ],
    },

    {
      title: 'Taak 6 — Het knelpunt: de exchange en KYC',
      content: `
        <p>Al die mixers en hops zijn uiteindelijk zinloos als de crimineel zijn crypto niet kan <strong>uitgeven</strong>.
        En om crypto om te zetten in gewone euro's die je op je bankrekening krijgt, moet het bijna altijd langs een
        <strong>exchange</strong> (cryptobeurs). Dat is de zwakke plek in het hele plan — het <strong>knelpunt</strong>
        waar de opsporing aangrijpt.</p>

        <h3>Waarom de exchange het knelpunt is</h3>
        <p>Een nette exchange is in Nederland en de EU verplicht om te weten wie zijn klanten zijn. Dat heet <strong>KYC</strong>
        (Know Your Customer): je moet je identiteit bewijzen met een paspoort of ID voordat je kunt handelen en uitbetalen.
        Daarnaast geldt de <strong>Wwft</strong> (Wet ter voorkoming van witwassen en financieren van terrorisme): de
        exchange moet <strong>ongebruikelijke transacties melden</strong>. Zodra "gewassen" crypto binnenkomt op een
        KYC-account, hangt er dus opeens een <em>echte naam</em> aan het spoor.</p>

        <div class="callout tip">
          <strong>Het hele punt van follow-the-money:</strong> de blockchain is openbaar, dus een analist volgt het geld tot
          aan de exchange. Dáár wordt de pseudonieme keten gekoppeld aan een KYC-identiteit. Met een <strong>vordering</strong>
          aan de exchange krijgt de politie de naam, de inloggegevens en de uitbetaalrekening. De on-ramp/off-ramp is waar
          crypto en de echte wereld elkaar raken — en dus waar je grip krijgt.
        </div>

        <p>Criminelen proberen dit knelpunt te omzeilen met beurzen zonder KYC, met OTC-handelaren (over-the-counter) of met
        katvangers die hun account uitlenen. Maar elke legale off-ramp vergroot de pakkans. Daarom concentreert de opsporing
        zich op het cash-out-moment.</p>

        <div class="callout info">
          <strong>Beloning — tussenvlag:</strong> je hebt het knelpunt doorzien. Noteer <code>NM{kyc_is_het_knelpunt}</code>.
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'Cryptowitwas-begrippen',
        prompt: 'Sleep 16 begrippen in vier groepen van vier. Elk begrip hoort bij precies één categorie.',
        flag: 'NM{grootboek_liegt_niet}',
        groups: [
          { name: 'Bouwstenen van een transactie', items: ['UTXO', 'Wallet-adres', 'Publiek grootboek', 'Private sleutel'] },
          { name: 'Verhullingstechnieken (layering)', items: ['Mixer/tumbler', 'CoinJoin', 'Peel chain', 'Chain-hopping'] },
          { name: 'Heuristieken van de analist', items: ['Common-input-heuristiek', 'Change-heuristiek', 'Clustering', 'Taint-analyse'] },
          { name: 'Exchange & compliance (het knelpunt)', items: ['Centrale exchange (CEX)', 'KYC-identiteitscheck', 'Fiat-offramp', 'Wwft-meldplicht'] },
        ],
      },
      questions: [
        { q: 'Hoe heet de verplichting van een exchange om te weten wie zijn klant is (identiteit bewijzen)?', answer: ['KYC', 'kyc', 'know your customer'], hint: 'Drie letters; "Know Your ..."', explain: 'KYC (Know Your Customer): de klant moet zijn identiteit bewijzen, waardoor er een echte naam aan het spoor komt.' },
        { q: 'Welke Nederlandse wet verplicht een exchange om ongebruikelijke transacties te melden?', answer: ['Wwft', 'wwft', 'de wwft'], hint: 'Wet ter voorkoming van witwassen en financieren van terrorisme.', explain: 'De Wwft verplicht melden van ongebruikelijke transacties; samen met KYC maakt dat de exchange het knelpunt.' },
        { q: 'Waarom is de exchange het knelpunt waar de opsporing aangrijpt?', options: ['Omdat exchanges gratis zijn', 'Omdat crypto daar naar euro\'s gaat én er KYC/Wwft geldt, zodat de pseudonieme keten aan een echte identiteit wordt gekoppeld', 'Omdat de blockchain daar wordt gewist', 'Omdat mixers daar verboden zijn'], answer: 1, explain: 'De off-ramp koppelt het openbare spoor aan een KYC-identiteit; met een vordering krijgt de politie de naam.' },
        { q: 'Welke vlag staat in de callout als beloning voor deze taak?', answer: ['NM{kyc_is_het_knelpunt}'], hint: 'Lees de groene info-callout onderaan de uitleg.', explain: 'De beloningsvlag is NM{kyc_is_het_knelpunt}.' },
        { q: 'Los de verbanden-puzzel op. Welke vlag verschijnt als alle vier de groepen goed zijn?', answer: ['NM{grootboek_liegt_niet}'], hint: 'Groepeer de 16 begrippen in vier groepen van vier; bij succes toont het lab de vlag.', explain: 'De connections-puzzel beloont je met NM{grootboek_liegt_niet}.' },
      ],
    },

    {
      title: 'Taak 7 — Reconstrueer de operatie en sluit de zaak',
      content: `
        <p>Je hebt alle stukken: transacties, de drie witwasfasen, de trucendoos, de heuristieken en het exchange-knelpunt.
        Laat nu zien dat je de héle operatie "Spookvracht" kunt reconstrueren als een tijdlijn — van de losgeldbetaling tot
        het moment waarop de opsporing toeslaat.</p>

        <h3>Van grootboek naar rapport</h3>
        <p>Een goede rechercheur scheidt <strong>feit</strong> van <strong>interpretatie</strong>. Feit: "om 09:02 ging 4.0
        BTC van VrachtVlot BV naar de ransom-wallet". Interpretatie: "dit is de losgeldbetaling (placement)". Je werk is
        <strong>reproduceerbaar</strong>: iedere transactie-ID staat in het openbare grootboek, dus een collega kan jouw
        keten exact nalopen. Dat maakt blockchain-bewijs zo sterk.</p>

        <div class="callout tip">
          <strong>Tip voor de puzzel:</strong> gebruik de tijdstempels uit de transactietabel van taak 4. De operatie loopt
          van placement (het geld erin) via layering (splitsen, hoppen, mixen) naar de cash-out en de integration bij de
          exchange, waar KYC/Wwft de opsporing een naam geeft.
        </div>

        <p>Zet hieronder de zes stappen van de operatie in de juiste volgorde. Lukt dat, dan heb je de zaak rond.</p>

        <div class="callout info">
          <strong>Eindbeloning:</strong> wie de hele keten doorgrondt, verdient de hoofdvlag: <code>NM{follow_the_money}</code>.
        </div>

        <h3>Ethiek en samenwerking</h3>
        <p>Dit soort onderzoek doe je niet op eigen houtje op echte mensen. Blockchain-analyse voor opsporing gebeurt door de
        <strong>Politie</strong>, de <strong>FIOD</strong> en met gespecialiseerde bedrijven, onder juridische waarborgen
        (zoals een vordering aan een exchange). Jij oefent hier de denkwijze op een fictieve zaak — netjes binnen de regels.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'Operatie Spookvracht — de tijdlijn',
        prompt: 'Zet de zes stappen van de witwasoperatie in de juiste volgorde (gebruik de tijdstempels uit taak 4).',
        flag: 'NM{volg_de_keten}',
        explain: 'De keten loopt: placement (09:02) → splitsen over mules (10:10) → chain-hop naar de tussenwallet (11:30) → alles samen in de mixer (12:20) → uitbetaling op de exchange (14:05) → KYC/Wwft koppelt een naam (integration).',
        items: [
          { id: 'a', label: '09:02 — VrachtVlot BV betaalt 4.0 BTC losgeld naar de ransom-wallet (placement)' },
          { id: 'b', label: '10:10 — De aanvaller splitst de buit over twee money mules (layering begint)' },
          { id: 'c', label: '11:30 — Mule "KoeriersKoen" hopt door naar een tussenwallet (chain-hop)' },
          { id: 'd', label: '12:20 — Alle deelstromen landen in de mixer "WasStraat" en worden vermengd' },
          { id: 'e', label: '14:05 — De mixer betaalt 3.75 BTC uit op een exchange-account (cash-out)' },
          { id: 'f', label: '16:40 — De exchange vraagt KYC-gegevens; hier grijpt de opsporing aan (integration)' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
      },
      questions: [
        { q: 'Met welke gebeurtenis begint de tijdlijn van de operatie?', options: ['Met de uitbetaling op de exchange', 'Met de losgeldbetaling naar de ransom-wallet (placement)', 'Met de KYC-controle', 'Met de mixer'], answer: 1, explain: 'De operatie begint om 09:02 met de losgeldbetaling: de placement-fase.' },
        { q: 'Wat hoort in een forensisch rapport gescheiden te blijven?', options: ['Feit en interpretatie', 'Bedrag en tijd', 'Input en output', 'Euro en bitcoin'], answer: 0, explain: 'Feit (wat je in het grootboek ziet) en interpretatie (wat het betekent) hou je uit elkaar, zodat je conclusie controleerbaar blijft.' },
        { q: 'Los de volgorde-puzzel op. Welke vlag verschijnt bij de juiste tijdlijn?', answer: ['NM{volg_de_keten}'], hint: 'Zet de zes stappen op tijd; bij succes toont het lab de vlag.', explain: 'De ordening-puzzel beloont de juiste tijdlijn met NM{volg_de_keten}.' },
        { q: 'Welke hoofdvlag staat als eindbeloning in deze taak genoemd?', answer: ['NM{follow_the_money}'], hint: 'Lees de info-callout "Eindbeloning".', explain: 'De hoofdvlag van de room is NM{follow_the_money}.' },
      ],
    },
  ],
  terms: [
    { term: 'Blockchain (publiek grootboek)', def: 'Het openbare, onveranderlijke kasboek waarin alle transacties staan; iedereen kan het inzien.' },
    { term: 'Wallet-adres', def: 'Een pseudoniem "rekeningnummer" (lange reeks tekens) waar crypto naartoe gaat; zonder naam, maar wel volgbaar.' },
    { term: 'Private sleutel', def: 'De geheime sleutel waarmee je een transactie ondertekent; wie hem heeft, kan de bijbehorende munten uitgeven.' },
    { term: 'UTXO', def: 'Unspent Transaction Output: een nog niet uitgegeven "briefje" dat je als input in een volgende transactie gebruikt.' },
    { term: 'Change (wisselgeld)', def: 'De restoutput die terugkomt naar een eigen adres van de betaler; een belangrijk spoor voor onderzoekers.' },
    { term: 'Placement', def: 'Fase 1 van witwassen: het misdaadgeld komt het (financiële) systeem binnen, bijv. een losgeldbetaling in BTC.' },
    { term: 'Layering', def: 'Fase 2: het geld in vele laagjes rondpompen (splitsen, mixen, hoppen) om de herkomst te verbergen.' },
    { term: 'Integration', def: 'Fase 3: het "gewassen" geld keert met schijnbaar legale herkomst terug in de economie.' },
    { term: 'Mixer/tumbler', def: 'Dienst die crypto van veel gebruikers vermengt en door elkaar uitbetaalt om de in-uit-link te verbergen.' },
    { term: 'Peel chain', def: 'Lange transactieketen die telkens een klein deel afsplitst naar cash-out en de grote rest doorschuift.' },
    { term: 'Chain-hopping', def: 'Overspringen naar een andere cryptomunt of blockchain om het spoor moeilijker te volgen te maken.' },
    { term: 'Common-input-heuristiek', def: 'Vuistregel: inputs die samen in één transactie worden uitgegeven, horen waarschijnlijk bij dezelfde eigenaar.' },
    { term: 'Change-heuristiek', def: 'Vuistregel die de wisselgeld-output herkent om de eigenaar naar zijn volgende adres te volgen.' },
    { term: 'KYC', def: 'Know Your Customer: verplichte identiteitscontrole bij een exchange, waardoor er een echte naam aan het spoor komt.' },
    { term: 'Wwft', def: 'Nederlandse anti-witwaswet die o.a. exchanges verplicht ongebruikelijke transacties te melden.' },
  ],
  resources: [
    { title: 'Chainalysis — blockchain-analyse en crypto-onderzoek', url: 'https://www.chainalysis.com/' },
    { title: 'Elliptic — crypto-forensics en risicobronnen', url: 'https://www.elliptic.co/' },
    { title: 'Bitcoin-whitepaper (Nakamoto) — transacties en het publieke grootboek', url: 'https://bitcoin.org/bitcoin.pdf' },
    { title: 'FIOD — opsporing van financiële criminaliteit (o.a. crypto)', url: 'https://www.fiod.nl/' },
  ],
});
