/* Room: Redeneren met kansen — Bayes, basispercentages en kalibratie voor analisten */

// =======================================================================
//  Alles in deze room is FICTIEF: de organisaties, incidenten en kansen zijn
//  verzonnen om de rekenwijze te oefenen.
// =======================================================================

CS.registerRoom({
  id: 'redeneren-met-kansen',
  path: 'meesterproeven',
  order: 4,
  title: 'Redeneren met kansen: Bayes voor analisten',
  icon: '🎲',
  difficulty: 'Moeilijk',
  minutes: 90,
  summary: 'Elk alarm, elke tip en elk spoor verandert hoe waarschijnlijk een verklaring is — maar hoeveel? Leer rekenen met basispercentages, likelihood ratios en de stelling van Bayes, ontdek waarom een "99% betrouwbare" aanwijzing vaak maar 9% zegt, werk meerdere hypothesen tegelijk bij, en meet hoe goed je eigen inschattingen zijn met de Brier-score.',
  objectives: [
    'Een basispercentage meenemen en uitrekenen hoeveel een positieve aanwijzing werkelijk zegt',
    'De stelling van Bayes toepassen in de odds-vorm: posterior odds = prior odds × likelihood ratio',
    'Meerdere stukken bewijs na elkaar verwerken en herkennen wanneer bewijs niet onafhankelijk is',
    'Eigen voorspellingen beoordelen met de Brier-score en over- of onderzekerheid herkennen',
    'Kansen vertalen naar waarschijnlijkheidstaal en kernaannames expliciet maken',
  ],
  terms: [
    { term: 'Basispercentage (base rate)', def: 'Hoe vaak iets voorkomt vóór je naar het specifieke bewijs kijkt. Wie het negeert, overschat de waarde van een aanwijzing (base rate fallacy).' },
    { term: 'Prior', def: 'De kans op een hypothese vóór het nieuwe bewijs.' },
    { term: 'Posterior', def: 'De kans op een hypothese ná het verwerken van het bewijs.' },
    { term: 'Likelihood', def: 'P(E | H): hoe waarschijnlijk het bewijs is als de hypothese waar is. Niet te verwarren met P(H | E).' },
    { term: 'Likelihood ratio (LR)', def: 'P(E | H1) / P(E | H2): hoeveel keer waarschijnlijker het bewijs is onder de ene hypothese dan onder de andere. LR > 1 steunt H1, LR < 1 steunt H2.' },
    { term: 'Odds', def: 'Kansverhouding: p / (1 − p). Een kans van 20% is odds 1 : 4. In odds-vorm is Bayes een vermenigvuldiging.' },
    { term: 'Natuurlijke frequenties', def: 'Kansen uitgedrukt als aantallen ("9 van de 1.000"). Mensen redeneren daarmee aantoonbaar beter dan met percentages (Gigerenzer).' },
    { term: 'Brier-score', def: 'Het gemiddelde van (voorspelde kans − uitkomst)². 0 is perfect, 0,25 is wat je haalt door altijd 50% te zeggen.' },
    { term: 'Kalibratie', def: 'De mate waarin je kansen kloppen: van alle keren dat je "70%" zei, moet ongeveer 70% uitkomen.' },
    { term: 'Kernaanname (key assumption)', def: 'Een aanname waar je conclusie op rust. Bij een Key Assumptions Check maak je ze expliciet en test je wat er gebeurt als ze niet kloppen.' },
  ],
  resources: [
    { title: 'Wikipedia — Stelling van Bayes', url: 'https://nl.wikipedia.org/wiki/Theorema_van_Bayes' },
    { title: 'Good Judgment Project — onderzoek naar voorspellen en kalibratie', url: 'https://goodjudgment.com/' },
    { title: 'Wikipedia — Brier-score', url: 'https://en.wikipedia.org/wiki/Brier_score' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De 99%-aanwijzing die maar 9% zegt',
      content: `
        <p>Een fraudeteam gebruikt een model dat bij een transactie zegt: "dit is een money mule". Het model vangt
        <strong>99%</strong> van de echte mules en slaat bij <strong>1%</strong> van de gewone klanten vals alarm. Gemiddeld
        is <strong>1 op de 1.000</strong> rekeninghouders een mule. Het model slaat aan bij rekening X. Hoe waarschijnlijk is
        het dat X een mule is?</p>
        <p>De meeste mensen, ook professionals, zeggen "99%". Het juiste antwoord ligt rond de 9%.</p>
        <h3>Reken met mensen in plaats van procenten</h3>
        <p>Psycholoog Gerd Gigerenzer liet zien dat je dit soort vragen veel beter beantwoordt met <strong>natuurlijke
        frequenties</strong>. Neem 100.000 rekeninghouders:</p>
<pre><code>100.000 rekeninghouders
├──     100 mules        → 99% alarm  →     99 terecht alarm
└──  99.900 gewone klanten → 1% alarm →    999 vals alarm

Alarm in totaal: 99 + 999 = 1.098
Kans dat een alarm een mule is: 99 / 1.098 ≈ 9,0%</code></pre>
        <h3>De stelling van Bayes</h3>
<pre><code>             P(E | H) · P(H)
P(H | E) = ─────────────────────────────────────
           P(E | H) · P(H) + P(E | niet H) · P(niet H)

         = 0,99 · 0,001 / (0,99 · 0,001 + 0,01 · 0,999)  ≈ 0,090</code></pre>
        <div class="callout warn"><strong>De kern:</strong> P(alarm | mule) = 99% is iets heel anders dan P(mule | alarm) =
        9%. Die twee verwisselen heet de <em>verwisseling van de voorwaardelijke kans</em>. In de rechtszaal heet het de
        <em>prosecutor's fallacy</em> (zie de volgende room).</div>
        <p>Wat betekent dit voor de praktijk? Het alarm is waardevol: de kans steeg van 0,1% naar 9%, een factor 90. Maar
        het is een reden voor onderzoek, geen reden om een rekening te bevriezen en iemand te beschuldigen.</p>
      `,
      questions: [
        { q: 'Hoeveel valse alarmen geeft het model bij 100.000 rekeninghouders?', answer: ['999'], hint: '1% van de 99.900 gewone klanten.', explain: '0,01 × 99.900 = 999.' },
        { q: 'Hoe groot is de kans (in procenten, afgerond op een geheel getal) dat een rekening met een alarm echt een mule is?', answer: ['9', '9%', '9,0', '9.0'], hint: '99 / (99 + 999).', explain: '99 / 1.098 ≈ 9%.' },
        { q: 'Het basispercentage stijgt naar 1 op de 100 (een risicovolle doelgroep). Wat gebeurt er met de waarde van een alarm?', options: ['Die stijgt flink: bij een hogere base rate is een alarm vaker terecht', 'Die blijft gelijk: het model is hetzelfde', 'Die daalt', 'Die wordt 99%'], answer: 0, explain: 'Per 100.000: 990 terecht en 990 vals alarm, dus ongeveer 50%. Dezelfde test, een heel andere betekenis.' },
      ],
    },
    {
      title: 'Taak 2 — Odds en likelihood ratios: Bayes als vermenigvuldiging',
      content: `
        <p>Met de breukvorm van Bayes rekenen is omslachtig. Analisten en forensisch onderzoekers gebruiken liever de
        <strong>odds-vorm</strong>:</p>
<pre><code>posterior odds  =  prior odds  ×  likelihood ratio

prior odds   = P(H1) / P(H2)
LR           = P(E | H1) / P(E | H2)</code></pre>
        <p>De likelihood ratio is de <strong>kracht van het bewijs</strong>, los van wat je vooraf dacht. Elk nieuw stuk
        (onafhankelijk) bewijs is gewoon een extra vermenigvuldiging. De volgorde maakt dan niet uit.</p>
        <h3>De casus</h3>
        <p>Bij de fictieve gemeente Zeeweide is een vertrouwelijk bestand van een beheeromgeving gekopieerd. Twee
        hypothesen: een <strong>insider</strong> (de beheerder zelf) of een <strong>externe aanvaller</strong> met een gestolen
        beheeraccount. Op basis van eerdere zaken schat het team de insider vooraf op 20%. Er komt bewijs binnen; per stuk
        hebben de analisten geschat hoe waarschijnlijk het onder elke hypothese is.</p>
        <div class="callout tip"><strong>Opdracht:</strong> vink het bewijs één voor één aan en volg de kansen. Probeer daarna
        een andere volgorde. Zet ook eens de prior op 50/50: hoeveel maakt de startkans uit nadat al het bewijs binnen is?</div>
      `,
      lab: {
        type: 'bayes',
        title: 'Gemeente Zeeweide',
        scenario: 'Wie kopieerde het bestand: de beheerder zelf, of een externe aanvaller met een gestolen beheeraccount?',
        hypotheses: ['Insider', 'Extern'],
        prior: [0.2, 0.8],
        evidence: [
          { short: 'nacht', text: 'De aanmelding gebeurde buiten werktijd (02:40)', likelihood: [0.3, 0.6] },
          { short: 'thuis-IP', text: 'Het IP-adres hoort bij de internetaansluiting van de beheerder thuis', likelihood: [0.7, 0.05] },
          { short: 'MFA', text: 'De MFA-melding werd direct goedgekeurd, zonder eerdere mislukte pogingen', likelihood: [0.9, 0.3] },
        ],
      },
      questions: [
        { q: 'Wat is de likelihood ratio (Insider : Extern) van het thuis-IP-adres?', answer: ['14', '14:1', '14 : 1'], hint: '0,7 / 0,05.', explain: 'LR = 0,7 / 0,05 = 14: dit bewijs is 14 keer waarschijnlijker als de beheerder het zelf deed.' },
        { q: 'Het nachtelijke tijdstip heeft een LR van 0,5. Wat betekent dat?', options: ['Het bewijs pleit licht vóór een externe aanvaller', 'Het bewijs pleit vóór de insider', 'Het bewijs is neutraal', 'Het bewijs is ongeldig'], answer: 0, explain: 'LR < 1 steunt de tweede hypothese: nachtelijk werk is twee keer waarschijnlijker bij een buitenstaander.' },
        { q: 'Hoe groot is de kans op de insider-hypothese na alle drie de bewijsstukken? (procent, geheel getal)', answer: ['84', '84%', '84,00', '84.00'], hint: 'Vink alle drie aan, met de prior 20/80.', explain: '84%: prior odds 1 : 4, maal 0,5, maal 14, maal 3 = 21 : 4, ofwel 84%.' },
        { q: 'Maakt de volgorde waarin je onafhankelijk bewijs verwerkt uit voor de eindkans?', options: ['Nee, vermenigvuldigen is volgorde-onafhankelijk', 'Ja, het eerste bewijs weegt zwaarder', 'Ja, het laatste bewijs weegt zwaarder', 'Alleen bij drie hypothesen'], answer: 0, explain: 'Prior odds × LR1 × LR2 × LR3: de volgorde doet er niet toe. In het hoofd van een analist helaas wel (anchoring).' },
      ],
    },
    {
      title: 'Taak 3 — Meer hypothesen, en bewijs dat niet onafhankelijk is',
      content: `
        <p>Bayes werkt ook met drie of meer hypothesen: je vermenigvuldigt elke prior met de likelihood van het bewijs
        onder die hypothese, en deelt daarna door het totaal (normaliseren).</p>
        <h3>De casus: een aanval die zich als ransomware voordoet</h3>
        <p>Een fictief ingenieursbureau dat werkt aan defensieaanbestedingen wordt getroffen. Er verschijnt een losgeldbrief.
        Vooraf schat het team: criminele groep 50%, statelijke actor 30%, hacktivisten 20%. Verwerk het bewijs.</p>
        <p>Dit lijkt op wat in 2017 met NotPetya gebeurde: het zag eruit als ransomware, maar betalen had geen zin, omdat
        de schade bewust niet te herstellen was. Overheden schreven de aanval later toe aan een statelijke actor.</p>
        <h3>De valkuil: hetzelfde bewijs twee keer tellen</h3>
        <p>Bayes in deze eenvoudige vorm gaat ervan uit dat de bewijsstukken <strong>onafhankelijk</strong> zijn, gegeven de
        hypothese. Dat is vaak niet zo:</p>
        <ul>
          <li>Twee securityleveranciers melden dezelfde toeschrijving, maar baseren zich op dezelfde gedeelde IOC-feed: dat is
          <em>één</em> bewijsstuk, geen twee.</li>
          <li>"De malware compileerde in UTC+3-werkuren" en "de aanvaller was actief in UTC+3-werkuren" komen allebei uit het
          ritme van één groep.</li>
          <li>Een nieuwsbericht dat een eerder rapport citeert, voegt niets toe.</li>
        </ul>
        <div class="callout warn"><strong>Vuistregel:</strong> vraag bij elk bewijsstuk: "Zou ik dit ook zien als het vorige
        bewijs er niet was geweest?" Zo niet, dan is het afhankelijk en mag je het niet opnieuw vermenigvuldigen. Dubbel
        tellen maakt analisten structureel te zeker.</div>
      `,
      lab: {
        type: 'bayes',
        title: 'Ingenieursbureau',
        scenario: 'Een aanval met een losgeldbrief bij een fictief ingenieursbureau in de defensieketen. Wie zit erachter?',
        hypotheses: ['Crimineel', 'Statelijk', 'Hacktivist'],
        prior: [0.5, 0.3, 0.2],
        evidence: [
          { short: 'brief', text: 'Er verschijnt een losgeldbrief met een betaaladres', likelihood: [0.8, 0.2, 0.1] },
          { short: 'geen-geld', text: 'Er wordt nooit geprobeerd om te onderhandelen of geld te innen; de versleuteling is niet terug te draaien', likelihood: [0.1, 0.6, 0.7] },
          { short: 'maanden', text: 'De aanvaller was al maanden onopvallend aanwezig en kopieerde vooral aanbestedingsdossiers', likelihood: [0.2, 0.7, 0.1] },
        ],
      },
      questions: [
        { q: 'Welke hypothese is het sterkst na alle drie de bewijsstukken?', options: ['Statelijk', 'Crimineel', 'Hacktivist'], answer: 0, explain: 'Statelijk ≈ 73%, crimineel ≈ 23%, hacktivist ≈ 4%.' },
        { q: 'Hoe groot is de kans op "Crimineel" na alleen de losgeldbrief? (procent, afgerond op een geheel getal)', answer: ['83', '83%'], hint: 'Vink alleen het eerste bewijs aan.', explain: 'Na de brief: 0,5·0,8 = 0,40 tegen 0,06 en 0,02; 0,40 / 0,48 ≈ 83%. Het eerste bewijs leek beslissend, maar was het niet.' },
        { q: 'Twee leveranciers schrijven de aanval toe aan dezelfde groep, allebei op basis van dezelfde gedeelde IOC-feed. Hoe verwerk je dat?', options: ['Als één bewijsstuk, want ze zijn afhankelijk', 'Als twee onafhankelijke bewijsstukken', 'Helemaal niet, rapporten tellen nooit', 'Als bewijs tegen de toeschrijving'], answer: 0, explain: 'Dezelfde onderliggende bron telt één keer. Dubbel tellen maakt je ten onrechte zeker.' },
      ],
    },
    {
      title: 'Taak 4 — Hoe goed zijn jouw kansen? De Brier-score',
      content: `
        <p>Een analist die "70% waarschijnlijk" schrijft, maakt een voorspelling die je kunt toetsen. Niet aan één zaak — dan
        weet je niets — maar aan een reeks. De bekendste maat is de <strong>Brier-score</strong>:</p>
<pre><code>Brier = gemiddelde van (voorspelde kans − uitkomst)²        (uitkomst = 1 als het gebeurde, 0 als niet)

0      = perfect
0,25   = altijd "50%" zeggen
1      = altijd volledig zeker en altijd fout</code></pre>
        <h3>Rekenvoorbeeld</h3>
        <table>
          <thead><tr><th>Voorspelling</th><th>Kans</th><th>Gebeurd?</th><th>(kans − uitkomst)²</th></tr></thead>
          <tbody>
            <tr><td>Groep X claimt de aanval binnen een week</td><td>0,90</td><td>ja (1)</td><td>0,0100</td></tr>
            <tr><td>Data verschijnt op de leksite</td><td>0,70</td><td>ja (1)</td><td>0,0900</td></tr>
            <tr><td>De back-ups blijken ook versleuteld</td><td>0,60</td><td>nee (0)</td><td>0,3600</td></tr>
            <tr><td>Een tweede organisatie in de sector wordt getroffen</td><td>0,20</td><td>nee (0)</td><td>0,0400</td></tr>
            <tr><td>De initiële toegang was een VPN-account zonder MFA</td><td>0,95</td><td>ja (1)</td><td>0,0025</td></tr>
          </tbody>
        </table>
        <p>Tel de laatste kolom op en deel door 5.</p>
        <h3>Kalibratie en het Good Judgment Project</h3>
        <p>In een groot, door de Amerikaanse inlichtingengemeenschap gefinancierd voorspellingstoernooi (2011–2015) bleek dat
        een groep zorgvuldig getrainde "superforecasters" structureel beter scoorde dan andere deelnemers. Hun gewoonten:
        beginnen bij het basispercentage, kleine stappen bijstellen bij nieuw bewijs, in getallen denken in plaats van in
        vage woorden, en hun scores bijhouden.</p>
        <div class="callout tip"><strong>Voor jezelf:</strong> houd een eenvoudig logboek bij van je inschattingen met een
        percentage. Na twintig stuks zie je of je "90%" ook echt ongeveer negen van de tien keer uitkomt. De meeste mensen
        zijn te zeker (overconfident).</div>
      `,
      questions: [
        { q: 'Wat is de Brier-score van deze vijf voorspellingen? (twee decimalen)', answer: ['0.10', '0,10', '0.1', '0,1', '0.1005', '0,1005'], hint: '(0,01 + 0,09 + 0,36 + 0,04 + 0,0025) / 5.', explain: '0,5025 / 5 ≈ 0,10: ruim beter dan de 0,25 van "altijd 50%".' },
        { q: 'Welke voorspelling kost het meeste in de score?', options: ['De back-ups blijken ook versleuteld (60%, gebeurde niet)', 'Groep X claimt (90%, gebeurde)', 'VPN zonder MFA (95%, gebeurde)', 'Tweede organisatie (20%, gebeurde niet)'], answer: 0, explain: 'Een vrij zekere voorspelling die niet uitkwam: (0,6 − 0)² = 0,36.' },
        { q: 'Van alle keren dat een analist "90%" zei, kwam het in 60% uit. Wat is er aan de hand?', options: ['Overconfidence: de analist is te zeker', 'Perfecte kalibratie', 'Onderzekerheid', 'Dat zegt niets'], answer: 0, explain: 'Gekalibreerd zou ongeveer 90% uitkomen. 60% betekent: de analist moet voorzichtiger formuleren.' },
      ],
    },
    {
      title: 'Taak 5 — Van getal naar woord, en de aannames eronder',
      content: `
        <p>Beleidsmakers lezen geen posteriors. Ze lezen woorden als "waarschijnlijk" en "vrijwel zeker". Daarom koppelen
        inlichtingendiensten die woorden aan vaste kansbanden (een <em>yardstick</em>), zodat "waarschijnlijk" bij iedereen
        hetzelfde betekent. Oefen dat in het lab.</p>
        <h3>Key Assumptions Check</h3>
        <p>Elke berekening in deze room rust op aannames: de prior, de geschatte likelihoods en de onafhankelijkheid van het
        bewijs. Een <strong>Key Assumptions Check</strong> maakt ze zichtbaar:</p>
        <ol>
          <li>Schrijf elke aanname op waar je conclusie op leunt.</li>
          <li>Vraag per aanname: hoe zeker ben ik? Waarop baseer ik die?</li>
          <li>Vraag: wat gebeurt er met mijn conclusie als deze aanname niet klopt? (Probeer het in het Bayes-lab: verander één likelihood.)</li>
          <li>Rapporteer de aannames waar de conclusie het gevoeligst voor is.</li>
        </ol>
        <div class="callout info"><strong>Gevoeligheidsanalyse in de praktijk:</strong> in taak 2 hing de conclusie vooral
        aan het thuis-IP (LR 14). Als een aanvaller via de thuisrouter van de beheerder werkte, is die LR veel lager, en
        zakt de insider-hypothese hard. Dat is precies de aanname die je moet benoemen én moet laten onderzoeken.</div>
      `,
      lab: { type: 'probability' },
      questions: [
        { q: 'Je berekening komt op 84% uit. Welk woord hoort daar volgens de standaardbanden van het lab bij?', options: ['Zeer waarschijnlijk (80–90%)', 'Waarschijnlijk (55–75%)', 'Vrijwel zeker (95–100%)', 'Reële kans (40–50%)'], answer: 0, explain: '84% valt in de band 80–90%: zeer waarschijnlijk.' },
        { q: 'Op welke aanname in taak 2 is de conclusie het gevoeligst?', options: ['Dat het thuis-IP-adres echt op de beheerder zelf wijst (LR 14)', 'Dat het 02:40 was', 'Dat MFA aanstond', 'Dat het een gemeente is'], answer: 0, explain: 'Het bewijsstuk met de grootste LR bepaalt de uitkomst het meest; als die aanname niet klopt, kantelt de conclusie.' },
        { q: 'Ik kan een kans omzetten naar waarschijnlijkheidstaal en de aannames benoemen waar mijn conclusie het gevoeligst voor is.', noAnswer: true },
      ],
    },
  ],
});
