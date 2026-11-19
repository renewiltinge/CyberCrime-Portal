/* Room: De functie — tactisch analist cybercrime (leerpad Tactisch analist cybercrime) */

CS.registerRoom({
  id: 'ta-de-functie',
  path: 'tactisch-analist',
  order: 1,
  title: 'De functie: tactisch analist cybercrime',
  icon: '🧭',
  difficulty: 'Makkelijk',
  minutes: 45,
  level: 'Instap',
  checked: '2026-11-19',
  summary: 'Wat doet een tactisch analist bij een politieteam cybercrime precies, waar in de organisatie werk je, wat wordt er van je gevraagd en wat krijg je ervoor terug? De vacature van het Team Cybercrime in Den Haag ontleed, met per eis de rooms in de dojo waarmee je je voorbereidt.',
  objectives: [
    'De taken van een tactisch analist cybercrime indelen in beeldvorming, advies, coaching en netwerk',
    'Uitleggen hoe het cluster Cybercrime Intelligence (DRIO) en het Team Cybercrime (DRR) samenwerken, en welke landelijke partners erbij horen',
    'Het verschil benoemen tussen strategische, tactische en operationele beeldvorming',
    'De functie-eisen koppelen aan de rooms in dit leerpad en daarbuiten',
    'De arbeidsvoorwaarden, de opleiding en de stappen van de selectieprocedure noemen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat doe je eigenlijk? De functie in vier rollen',
      tryFirst: true,
      intro: '<p>Hieronder staan zestien werkzaamheden die letterlijk of bijna letterlijk uit de vacature komen. Ze horen bij vier rollen die je als tactisch analist tegelijk vervult. Groepeer ze in vier groepen van vier voordat je de uitleg leest.</p>',
      content: `
        <p>Een vacaturetekst leest snel als een lange opsomming. Wie hem goed leest, ziet dat de functie
        <strong>tactisch analist cybercrime</strong> uit vier rollen bestaat die door elkaar heen lopen. Het helpt om
        ze uit elkaar te halen, want in een sollicitatiegesprek en later in je werk word je op alle vier aangesproken.</p>

        <h3>1. Beeldvorming: zien wat er speelt</h3>
        <p>De kern van het werk. Je bent "verantwoordelijk voor strategische en tactische beeldvorming op het gebied van
        cybercrime". Concreet: je verzamelt en combineert informatie over <strong>digitale entiteiten</strong>
        (IP-adressen, domeinen, personen, bedrijven en organisaties) en geeft er duiding aan. Je brengt
        <strong>informatiestromen</strong> in kaart, beschrijft kenmerken van verdachten en
        <strong>criminele samenwerkingsverbanden</strong>, en herkent afwijkende patronen en ontwikkelingen.</p>

        <h3>2. Advies en product: zorgen dat er iets gebeurt</h3>
        <p>Beeldvorming is pas waardevol als iemand er iets mee doet. Je signaleert <strong>interventiekansen</strong>
        en adviseert over een <strong>integrale aanpak</strong>: niet alleen strafrecht, maar ook verstoren en
        voorkomen, vaak met publiek-private partners. Je legt je bevindingen vast in
        <strong>intelligenceproducten</strong>, en wel zo dat ook minder gespecialiseerde partners in actie komen.
        Samen met de andere domeinexperts in het team geef je <strong>richting aan opsporingsonderzoeken</strong>.</p>

        <h3>3. Coachen en het analyseproces</h3>
        <p>Je hebt een coachende en coördinerende rol richting de andere analisten. Je ontwikkelt en implementeert nieuwe
        methoden en technieken en doet voorstellen om het analyseproces te verbeteren. Dit is een functie met
        <em>senioriteit</em>: je bent niet alleen zelf goed, je maakt anderen beter.</p>

        <h3>4. Netwerk en intermediair</h3>
        <p>Je "initieert, bouwt, onderhoudt en regisseert" samenwerking in het regionale en (inter)nationale
        intelligence- en cybernetwerk. Je brengt als intermediair <strong>vraag en aanbod</strong> bij elkaar: het ene
        team heeft informatie die een ander team zoekt, en jij ziet dat.</p>

        <h3>Strategisch, tactisch, operationeel</h3>
        <table>
          <thead><tr><th>Niveau</th><th>Vraag</th><th>Voorbeeld in cybercrime</th></tr></thead>
          <tbody>
            <tr><td>Strategisch</td><td>Wat speelt er, waar gaat het heen, waar zetten we op in?</td><td>Een beeld van ransomware tegen het mkb in de regio voor het komende jaar</td></tr>
            <tr><td>Tactisch</td><td>Hoe pakken we dit fenomeen of netwerk aan?</td><td>Welke ransomware-affiliates raken onze regio, via welke infrastructuur, en waar zit de beste interventiekans?</td></tr>
            <tr><td>Operationeel</td><td>Wat doen we morgen in deze zaak?</td><td>Welke server stellen we veilig, welke verdachte houden we aan?</td></tr>
          </tbody>
        </table>
        <p>De functie zit op het <strong>tactische</strong> niveau, met een voet in het strategische. Je vertaalt het
        grote beeld naar keuzes voor onderzoeken, en je haalt uit losse zaken de lijnen die het grote beeld voeden.
        De room <em>Intelligenceproducten & interventieadvies</em> gaat dieper in op de drie niveaus.</p>

        <div class="callout tip">
          <strong>Tip:</strong> lees de vacature met een markeerstift in vier kleuren, één per rol. Je ziet dan meteen
          dat "beeldvorming" de meeste ruimte krijgt, maar dat coaching en netwerk de functie van een gewone
          analistenfunctie onderscheiden.
        </div>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien werkzaamheden uit de vacature in de vier rollen van de tactisch analist.',
        groups: [
          { name: 'Beeldvorming', items: ['IP-adressen en bedrijven duiden', 'Informatiestromen in kaart brengen', 'Afwijkende patronen herkennen', 'Samenwerkingsverbanden beschrijven'] },
          { name: 'Advies en product', items: ['Interventiekansen signaleren', 'Adviseren over een integrale aanpak', 'Een intelligenceproduct schrijven', 'Richting geven aan opsporingsonderzoeken'] },
          { name: 'Coachen en analyseproces', items: ['Collega-analisten coachen', 'Analysewerk coördineren', 'Nieuwe methoden invoeren', 'Het analyseproces verbeteren'] },
          { name: 'Netwerk en intermediair', items: ['Vraag en aanbod verbinden', 'Samenwerking regisseren', 'Internationale contacten onderhouden', 'Bruggen bouwen met partners'] },
        ],
      },
      questions: [
        { q: 'Op welke twee niveaus van beeldvorming is de tactisch analist volgens de vacature verantwoordelijk?', options: ['Operationeel en tactisch', 'Strategisch en tactisch', 'Alleen operationeel', 'Strategisch en operationeel'], answer: 1,
          wrong: { 0: 'Operationele keuzes (welke server morgen) liggen vooral bij het onderzoeksteam. De vacature noemt strategisch en tactisch.', 2: 'Dan zou het een zaaksanalist zijn. De vacature vraagt juist het bredere beeld.', 3: 'Het tactische niveau is de kern van de functie; dat staat zelfs in de titel.' },
          explain: '"Verantwoordelijk voor strategische en tactische beeldvorming op het gebied van cybercrime."' },
        { q: 'Welke rol onderscheidt deze functie het meest van een beginnende analist: beeldvorming, of coachen en coördineren?', options: ['Beeldvorming', 'Coachen en coördineren'], answer: 1,
          explain: 'Elke analist doet aan beeldvorming. De coachende en coördinerende rol richting andere analisten, en het verbeteren van het analyseproces, maken dit een functie met senioriteit.' },
        { q: 'Een gemeente vraagt welke soorten cybercrime de komende twee jaar het meest zullen toenemen in de regio. Op welk niveau ligt die vraag?', answer: ['strategisch', 'strategische'],
          hints: ['Het gaat om een richting en een termijn van jaren, niet om één onderzoek.', 'Kijk in de tabel naar de vraag "waar gaat het heen".'],
          wrong: { '/tactisch/i': 'Tactisch gaat over de aanpak van een concreet fenomeen of netwerk. Een meerjarige verwachting voor een hele regio is breder.', '/operationeel/i': 'Operationeel gaat over wat je morgen in één zaak doet.' },
          explain: 'Een beeld van ontwikkelingen over jaren, voor beleid en prioriteiten, is strategisch.' },
      ],
    },

    {
      title: 'Taak 2 — Waar werk je? DRIO, DRR en het landelijke netwerk',
      content: `
        <p>De vacature beschrijft een constructie die je moet snappen om te weten voor wie je werkt. Je wordt
        <strong>geplaatst</strong> bij het cluster <strong>Cybercrime Intelligence</strong> van de
        <strong>Dienst Regionale Intelligence Organisatie (DRIO)</strong>, maar je <strong>werkt</strong> bij het
        <strong>Team Cybercrime</strong> in Den Haag. Dat team valt onder de <strong>Dienst Regionale Recherche
        (DRR)</strong>. In elke regionale eenheid zit zo'n cybercrimeteam binnen de DRR.</p>

        <figure class="diagram">
          <svg viewBox="0 0 640 300" role="img" aria-label="Plaatsing van de tactisch analist tussen DRIO en DRR, met het landelijke netwerk">
            <rect x="20" y="20" width="250" height="110" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="145" y="45" text-anchor="middle" fill="currentColor" font-size="13">DRIO</text>
            <text x="145" y="65" text-anchor="middle" fill="currentColor" font-size="12">Dienst Regionale Intelligence</text>
            <rect x="45" y="80" width="200" height="38" fill="var(--accent-soft)" stroke="var(--accent)"/>
            <text x="145" y="104" text-anchor="middle" fill="currentColor" font-size="12">cluster Cybercrime Intelligence</text>
            <rect x="370" y="20" width="250" height="110" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="495" y="45" text-anchor="middle" fill="currentColor" font-size="13">DRR</text>
            <text x="495" y="65" text-anchor="middle" fill="currentColor" font-size="12">Dienst Regionale Recherche</text>
            <rect x="395" y="80" width="200" height="38" fill="var(--accent-soft)" stroke="var(--accent)"/>
            <text x="495" y="104" text-anchor="middle" fill="currentColor" font-size="12">Team Cybercrime</text>
            <line x1="245" y1="99" x2="395" y2="99" stroke="currentColor" stroke-width="2"/>
            <text x="320" y="90" text-anchor="middle" fill="currentColor" font-size="12">jij</text>
            <text x="320" y="118" text-anchor="middle" fill="currentColor" font-size="11">gelijkwaardig</text>
            <rect x="20" y="190" width="140" height="44" fill="none" stroke="currentColor"/>
            <text x="90" y="216" text-anchor="middle" fill="currentColor" font-size="12">cybercrimeteams</text>
            <rect x="180" y="190" width="130" height="44" fill="none" stroke="currentColor"/>
            <text x="245" y="216" text-anchor="middle" fill="currentColor" font-size="12">THTC (LE)</text>
            <rect x="330" y="190" width="140" height="44" fill="none" stroke="currentColor"/>
            <text x="400" y="216" text-anchor="middle" fill="currentColor" font-size="12">LOCO-analyse</text>
            <rect x="490" y="190" width="130" height="44" fill="none" stroke="currentColor"/>
            <text x="555" y="216" text-anchor="middle" fill="currentColor" font-size="12">basisteams, DRR</text>
            <line x1="320" y1="130" x2="320" y2="170" stroke="currentColor"/>
            <line x1="90" y1="170" x2="555" y2="170" stroke="currentColor"/>
            <line x1="90" y1="170" x2="90" y2="190" stroke="currentColor"/>
            <line x1="245" y1="170" x2="245" y2="190" stroke="currentColor"/>
            <line x1="400" y1="170" x2="400" y2="190" stroke="currentColor"/>
            <line x1="555" y1="170" x2="555" y2="190" stroke="currentColor"/>
            <text x="320" y="270" text-anchor="middle" fill="currentColor" font-size="12">landelijk netwerk, vaak met een internationale component</text>
          </svg>
          <figcaption>Je hoort bij de intelligenceorganisatie, maar je werkplek is het rechercheteam. Daaromheen ligt het landelijke netwerk.</figcaption>
        </figure>

        <h3>Gelijkwaardig, met één opdracht</h3>
        <p>De vacature noemt dit een "unieke constructie": DRIO en DRR werken "op basis van gelijkwaardigheid" samen
        vanuit een gezamenlijke opdracht. Voor jou betekent dat: je bent geen ondersteuner die op bestelling analyses
        levert, maar een volwaardig teamlid dat mee richting geeft. Tegelijk blijf je verbonden met de
        intelligenceorganisatie, met haar werkwijzen, bronnen en kwaliteitseisen.</p>
        <p>De DRR bestaat volgens de vacature uit de afdelingen Generieke Opsporing, Thematische Opsporing,
        Vreemdelingenpolitie en Specialistische Ondersteuning. Het Team Cybercrime staat in verbinding met
        basisteams, districtsrecherche en opsporingsteams van de DRR.</p>

        <h3>Het landelijke netwerk</h3>
        <ul>
          <li><strong>De cybercrimeteams van de andere eenheden</strong>: zelfde werk, andere regio. Een
          ransomwaregroep houdt zich niet aan eenheidsgrenzen.</li>
          <li><strong>Team High Tech Crime (THTC)</strong> van de Landelijke Eenheid: het landelijke team voor de
          zwaarste en meest complexe zaken.</li>
          <li><strong>Het analysecluster van het Landelijk Operationeel Cybercrime Overleg (LOCO)</strong>: waar de
          analyse over zaken en teams heen bij elkaar komt.</li>
        </ul>
        <p>Samen vormen ze volgens de vacature "een uniek nationaal netwerk". Een internationale component is "eerder
        regel dan uitzondering": servers, verdachten en slachtoffers zitten vaak in verschillende landen.</p>

        <h3>Wat het team doet</h3>
        <p>Het Team Cybercrime is <strong>multidisciplinair</strong>, met expertise op digitaal, intelligence, tactisch
        en financieel gebied. De core business: onderzoeken naar <strong>ransomware, DDoS-aanvallen, malware, hacking
        en bulletproof hosting</strong>. Het team doet projectmatige en complexe (fenomeen)onderzoeken, en verstoort of
        stopt criminele processen "aan de voorkant", vaak samen met publiek-private partners. Ook preventieve
        maatregelen horen erbij.</p>
        <div class="callout info">
          <strong>Goed om te weten:</strong> een <em>fenomeenonderzoek</em> richt zich niet op één verdachte of één
          slachtoffer, maar op een verschijnsel (bijvoorbeeld een DDoS-dienst die door honderden jongeren wordt
          gebruikt). Juist daar is de tactisch analist onmisbaar: zonder beeld van het fenomeen weet niemand waar je
          moet ingrijpen.
        </div>
      `,
      questions: [
        { q: 'Bij welke dienst (afkorting) word je geplaatst?', answer: ['DRIO'],
          hints: ['Het is de intelligencedienst van de eenheid.', 'De afkorting staat in de eerste alinea en in het linkerblok van het schema.'],
          wrong: { 'drr': 'Bij de DRR werk je wel, maar je wordt er niet geplaatst. Je plaatsing is bij de intelligencedienst.', 'thtc': 'THTC is een landelijk team van de Landelijke Eenheid; daarmee werk je samen.' },
          why: 'Wie je "eigenaar" is, bepaalt welke werkwijzen, bronnen en kwaliteitseisen voor jou gelden. Dat speelt mee in je dagelijkse afwegingen.',
          explain: 'Je wordt geplaatst bij het cluster Cybercrime Intelligence van de DRIO en werkt bij het Team Cybercrime van de DRR.' },
        { q: 'Welk landelijk team van de Landelijke Eenheid noemt de vacature als partner (afkorting)?', answer: ['THTC'],
          hints: ['Het team richt zich op de zwaarste, meest complexe cybercrime.', 'High Tech Crime.'],
          explain: 'Het Team High Tech Crime (THTC) van de Landelijke Eenheid.' },
        { q: 'Welke van deze noemt de vacature NIET als core business van het Team Cybercrime?', options: ['Ransomware', 'Bulletproof hosting', 'Witwassen via crypto', 'DDoS-aanvallen'], answer: 2,
          wrong: { 0: 'Ransomware staat als eerste in de lijst.', 1: 'Bulletproof hosting wordt expliciet genoemd.', 3: 'DDoS-aanvallen worden expliciet genoemd.' },
          explain: 'Ransomware, DDoS, malware, hacking en bulletproof hosting zijn de core business. Financiële expertise zit wel in het team, maar witwassen is geen genoemde kern.' },
      ],
    },

    {
      title: 'Taak 3 — Wat vragen ze van je, en waar oefen je dat?',
      content: `
        <p>De vacature vraagt een <strong>hbo-werk- en denkniveau</strong>, <strong>sterke affiniteit met
        cybercrime</strong>, goede beheersing van het <strong>Engels</strong> in woord en geschrift en een
        <strong>rijbewijs B</strong>. Daarnaast drie inhoudelijke blokken. Hieronder staat per eis waar je in de dojo
        kunt oefenen. De rooms met <code>ta-</code> zijn de rooms van dit leerpad.</p>

        <table>
          <thead><tr><th>Eis uit de vacature</th><th>Wat het in de praktijk betekent</th><th>Oefenen in de dojo</th></tr></thead>
          <tbody>
            <tr><td>Kennis van crime scripting</td><td>Een delict als draaiboek ontleden en per fase een interventie vinden</td><td>Crime scripting; Het cybercrime-ecosysteem</td></tr>
            <tr><td>Collect, Store, Analyse, Engage (CSAE)</td><td>Gericht verzamelen, met herkomst en tijd opslaan, duiden, partners betrekken</td><td>Intelligencecyclus, CSAE & analyse</td></tr>
            <tr><td>Digitale entiteiten duiden</td><td>Wat zegt een IP-adres, een domein, een bedrijf; wanneer is iets dezelfde entiteit</td><td>Digitale entiteiten duiden; Infrastructuur-OSINT & pivoting</td></tr>
            <tr><td>Samenwerkingsverbanden beschrijven</td><td>Netwerkanalyse, rollen, brokers en kwetsbare plekken</td><td>Criminele samenwerkingsverbanden</td></tr>
            <tr><td>Programmeertaal, databases, visualisatie</td><td>Grote datasets opschonen, tellen, koppelen en zichtbaar maken</td><td>Grote datasets doorgronden</td></tr>
            <tr><td>Kwantitatieve en kwalitatieve methoden</td><td>Tellen en meten, maar ook chats en verhoren coderen; dwarsverbanden tussen zaken</td><td>Kwalitatief onderzoek en dwarsverbanden; Redeneren met kansen</td></tr>
            <tr><td>Interventiekansen en integrale aanpak</td><td>Strafrecht, verstoren en voorkomen afwegen, met partners</td><td>Interventiekansen en de integrale aanpak</td></tr>
            <tr><td>Helder rapporteren en presenteren</td><td>Conclusie eerst, waarschijnlijkheidstaal, een eigenaar per advies</td><td>Intelligenceproducten & interventieadvies</td></tr>
            <tr><td>Coachen, verbinden, adviseren</td><td>Collega's beter maken, vraag en aanbod verbinden, het netwerk regisseren</td><td>Coachen, coördineren en het intelligence-netwerk</td></tr>
          </tbody>
        </table>

        <h3>De competenties achter de eisen</h3>
        <p>Naast kennis vraagt de vacature om gedrag: analytisch en motiverend "ijzersterk", hoofd- van bijzaken
        scheiden, initiatief nemen, gevraagd en ongevraagd adviseren, samenwerkingsgericht en open-minded zijn, en een
        brede blik op wat er in de maatschappij speelt. En je bent <strong>flexibel inzetbaar</strong>: het werk is
        onvoorspelbaar, soms onder druk met strakke deadlines, en de vacature spreekt van een "flexibele 24/7
        mentaliteit".</p>
        <p>Ten slotte: je blijft leren. "Constant op zoek blijven naar nieuwe werkwijzen, procedures, methoden en
        technieken en deze direct in je werk toe te passen" staat er letterlijk. Wie dit leerpad doorloopt, doet
        precies dat.</p>

        <div class="callout warn">
          <strong>Let op:</strong> de dojo bereidt je voor op de inhoud van het vak. Hij zegt niets over de inhoud van
          het politie-assessment en vervangt de opleiding aan de Politieacademie niet.
        </div>
      `,
      questions: [
        { q: 'Welke analysemethode noemt de vacature bij naam als voorkeurskennis (twee woorden)?', answer: ['crime scripting', 'crimescripting'],
          hints: ['Het staat ook in de allereerste zin van de vacature.', 'Een methode van Cornish, die een delict als draaiboek ontleedt.'],
          explain: 'Crime scripting wordt in de openingszin en bij de eisen genoemd. Daarnaast Collect Store Analyse Engage (CSAE).' },
        { q: 'Waar staat de A in CSAE voor?', answer: ['Analyse', 'Analysis', 'Analyze', 'Analyseren'],
          hints: ['De vier stappen zijn Collect, Store, ..., Engage.'],
          explain: 'Collect, Store, Analyse, Engage. De room Intelligencecyclus, CSAE & analyse werkt dit uit.' },
        { q: 'Ik heb in de tabel gekeken welke eisen voor mij het meest nieuw zijn, en weet met welke room ik begin.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 4 — Voorwaarden, opleiding en procedure',
      content: `
        <p>Een functie kiezen is ook een praktische afweging. Dit is wat de vacature (Eenheid Den Haag, sluitingsdatum
        6 november 2026) zegt.</p>

        <table>
          <thead><tr><th>Onderwerp</th><th>Wat de vacature zegt</th></tr></thead>
          <tbody>
            <tr><td>Standplaats en omvang</td><td>Den Haag, 1 fte, 36 uur per week</td></tr>
            <tr><td>Formele functie</td><td>Operationeel specialist B in het Landelijk Functiegebouw Nederlandse Politie (LFNP)</td></tr>
            <tr><td>Salaris</td><td>Schaal 10 Bbp: bruto minimaal € 3.743 en maximaal € 5.882 per maand bij 36 uur</td></tr>
            <tr><td>Individueel Keuzebudget (IKB)</td><td>Een bruto deel van 17,86% van je salaris en een netto deel van € 515,91 per jaar</td></tr>
            <tr><td>Pensioen en verlof</td><td>Pensioenopbouw bij ABP en betaald ouderschapsverlof</td></tr>
            <tr><td>Opleiding</td><td>Afhankelijk van je achtergrond een 14-weekse opleiding aan de Politieacademie voor specifieke inzetbaarheid (36 uur per week), eventueel gevolgd door een aanvullend programma; je krijgt tijdens de opleiding je salaris</td></tr>
          </tbody>
        </table>

        <h3>De selectie</h3>
        <ol>
          <li>Je solliciteert vóór de sluitingsdatum via de sollicitatieknop.</li>
          <li>Een vakinhoudelijk assessment maakt <em>mogelijk</em> deel uit van de selectie.</li>
          <li>Het <strong>positief afronden van het verplichte assessment</strong> is voorwaarde om aan de opleiding te
          beginnen, en het behalen van de opleiding is vereist om de functie uit te oefenen.</li>
          <li>Een <strong>betrouwbaarheids- en omgevingsonderzoek</strong> hoort bij de selectie.</li>
          <li>Je hebt de Nederlandse nationaliteit (dit mag je tweede nationaliteit zijn).</li>
        </ol>
        <p>Het hbo-niveau toon je aan met een diploma, via een EVC-procedure, of met minstens twee jaar werkervaring op
        dat niveau, onderbouwd met een formeel bewijsstuk zoals een werkgeversverklaring.</p>

        <h3>Twee versies: extern en intern</h3>
        <p>De vacature bestaat in twee versies. In de <strong>externe</strong> versie word je tijdens de opleiding
        tijdelijk aangesteld als ambtenaar in opleiding, daarna volgt een tijdelijke aanstelling met <strong>een jaar
        proeftijd</strong>, en daarna zo snel mogelijk een vaste aanstelling. De <strong>interne</strong> versie staat
        alleen open voor politiemedewerkers met een vaste aanstelling, tijdelijke medewerkers die minstens een jaar
        bij de politie werken en politievrijwilligers. Bij gelijke geschiktheid gaat een beroepsmedewerker voor een
        vrijwilliger, en eventuele preferente kandidaten worden eerst geplaatst.</p>

        <div class="callout warn">
          <strong>Let op:</strong> de sluitingsdatum van deze vacature (6 november 2026) is voorbij. Gebruik dit
          leerpad om je voor te bereiden op een volgende, vergelijkbare vacature. Controleer de voorwaarden altijd in
          de actuele vacaturetekst; bedragen en regelingen veranderen. Voor vragen over de inhoud of de procedure
          noemt elke vacature eigen contactpersonen.
        </div>
        <p>Hoe je het assessment en de gesprekken voorbereidt, oefen je in de room <em>Solliciteren en het assessment
        voorbereiden</em>.</p>
      `,
      questions: [
        { q: 'In welke salarisschaal (Bbp) is de functie ingedeeld? Geef het getal.', answer: ['10'],
          hints: ['Kijk in de tabel bij "Salaris".'],
          explain: 'Schaal 10 Bbp, de LFNP-functie operationeel specialist B.' },
        { q: 'Hoeveel weken duurt de opleiding voor specifieke inzetbaarheid aan de Politieacademie?', answer: ['14', 'veertien'],
          hints: ['Kijk in de tabel bij "Opleiding".'],
          explain: 'Een 14-weekse opleiding van 36 uur per week, afhankelijk van je achtergrond, eventueel met een aanvullend programma.' },
        { q: 'Wat moet je positief afronden voordat je aan de opleiding mag beginnen?', options: ['Een proeftijd van een jaar', 'Het verplichte assessment', 'Een stage bij THTC', 'Een Engelse taaltoets'], answer: 1,
          wrong: { 0: 'De proeftijd volgt pas ná de opleiding, in de externe versie.', 2: 'Daar zegt de vacature niets over.', 3: 'Goed Engels is een eis, maar een taaltoets wordt niet genoemd als voorwaarde voor de opleiding.' },
          explain: '"Het positief afronden van het verplichte assessment is voorwaarde om aan de opleiding te kunnen beginnen."' },
      ],
    },

    {
      title: 'Taak 5 — Zo komt dit voor in een gesprek',
      kind: 'examen',
      optional: true,
      content: `
        <p>In een sollicitatiegesprek of assessment krijg je zelden de vraag "wat is DRIO?". Je krijgt een situatie en
        moet laten zien dat je de rol begrijpt. Beantwoord de vragen hieronder alsof je in dat gesprek zit. Lees bij
        elk fout antwoord waarom het niet het beste is.</p>
      `,
      questions: [
        { q: 'Een rechercheteam vraagt je om "even alle IP-adressen uit deze zaak na te trekken". Je ziet dat dezelfde adressen ook in twee zaken van een andere eenheid voorkomen. Wat doe je als tactisch analist eerst?',
          options: ['De adressen natrekken en het lijstje terugsturen', 'De overlap signaleren en de andere eenheid en het team bij elkaar brengen', 'De zaak van de andere eenheid overnemen', 'Niets melden, want het is hun zaak'], answer: 1,
          wrong: { 0: 'Dan ben je een uitvoerder op bestelling. De meerwaarde zit in het dwarsverband dat je zag.', 2: 'Je regisseert samenwerking; je neemt geen zaken over.', 3: 'Je bent juist intermediair van vraag en aanbod. Een overlap verzwijgen is een gemiste kans.' },
          explain: 'Dwarsverbanden tussen onderzoeken identificeren en vraag en aanbod bij elkaar brengen, staat letterlijk in de functie.' },
        { q: 'Je collega-analist levert een product af met een sterke conclusie maar zonder bronvermelding. Wat past het best bij je coachende rol?',
          options: ['Het product zelf herschrijven en versturen', 'Samen nalopen waar elke bewering op rust, en de collega het zelf laten aanpassen', 'Het product tegenhouden zonder uitleg', 'Het laten gaan, de conclusie klopt waarschijnlijk wel'], answer: 1,
          wrong: { 0: 'Dan leert je collega niets en blijf jij de flessenhals.', 2: 'Kwaliteit bewaken mag, maar coachen vraagt uitleg.', 3: 'Een conclusie zonder herleidbare bron is niet te toetsen; dat is een kwaliteitsprobleem.' },
          explain: 'Coachen is iemand beter maken, niet het werk overnemen.' },
        { q: 'Een partner zonder technische achtergrond moet op basis van jouw product actie ondernemen. Wat is het belangrijkst?',
          options: ['Alle technische details opnemen zodat niets ontbreekt', 'Conclusie en gevraagde actie eerst, in begrijpelijke taal, met de onderbouwing erachter', 'Het product alleen mondeling toelichten', 'Een lijst met IOC\'s sturen'], answer: 1,
          wrong: { 0: 'Volledigheid helpt niet als de lezer de kern niet vindt.', 2: 'Mondeling kan aanvullend, maar je bevindingen leg je "helder en gestructureerd" vast.', 3: 'Een IOC-lijst zegt een niet-technische partner weinig over wat hij moet doen.' },
          explain: 'De vacature vraagt producten waarmee "ook minder gespecialiseerde in- en externe partners aangezet worden tot actie".' },
        { q: 'Een DDoS-dienst wordt door honderden jongeren gebruikt. Het team wil niet honderd losse zaken. Welke combinatie past het best bij de tactische rol?',
          options: ['Alleen de beheerder aanhouden', 'Het fenomeen in kaart brengen, de beheerders aanpakken en de gebruikers waarschuwen met partners', 'Elke gebruiker apart vervolgen', 'De dienst laten draaien om meer bewijs te verzamelen'], answer: 1,
          boss: true,
          wrong: { 0: 'Dat stopt de dienst misschien even, maar laat de vraag en de gebruikers buiten beeld. Een integrale aanpak combineert.', 2: 'Dat is precies het "honderd losse zaken"-scenario, en zelden het meest effectief.', 3: 'Doorlaten kan een tactische afweging zijn, maar zonder plan voor schade en interventie is het geen advies.' },
          why: 'Een fenomeenonderzoek met een integrale aanpak (strafrecht, verstoren en preventie samen) is waar beeldvorming, interventieadvies en het netwerk samenkomen.',
          explain: 'Beeld van het fenomeen, strafrechtelijke aanpak van de kern, verstoring en preventie richting gebruikers, met publiek-private partners: dat is de integrale aanpak uit de vacature.' },
      ],
    },
  ],
  check: [
    { q: 'Wat is het verschil tussen plaatsing en werkplek in deze functie?', options: ['Geplaatst bij de DRR, werkzaam bij de DRIO', 'Geplaatst bij de DRIO, werkzaam bij het Team Cybercrime van de DRR', 'Geplaatst en werkzaam bij THTC', 'Geplaatst bij de Politieacademie'], answer: 1, explain: 'Cluster Cybercrime Intelligence (DRIO) is je plaatsing; het Team Cybercrime (DRR) je werkplek.' },
    { q: 'Welke rol hoort NIET bij de functie volgens de vacature?', options: ['Collega-analisten coachen', 'Interventiekansen signaleren', 'Zelfstandig verdachten aanhouden', 'Het intelligencenetwerk regisseren'], answer: 2, explain: 'Aanhouden is werk voor de opsporing. De analist geeft richting en adviseert.' },
    { q: 'Wat betekent "integrale aanpak" in deze context?', options: ['Alleen strafrechtelijk optreden', 'Strafrecht, verstoren en voorkomen combineren, vaak met partners', 'Alles intern oplossen', 'Alle zaken samenvoegen tot één onderzoek'], answer: 1, explain: 'Integraal = meerdere interventies en partners in samenhang.' },
    { q: 'Welke uitspraak over de opleiding klopt?', options: ['Je betaalt de opleiding zelf', 'Je krijgt tijdens de opleiding je overeengekomen salaris', 'De opleiding is optioneel', 'De opleiding duurt een jaar'], answer: 1, explain: 'Tijdens de opleiding(en) ontvang je al het overeengekomen salaris; de opleiding behalen is verplicht.' },
  ],
  terms: [
    { term: 'Tactische beeldvorming', def: 'Een beeld van een fenomeen of netwerk dat richting geeft aan de aanpak: wie, hoe, waar is de beste interventiekans.' },
    { term: 'Strategische beeldvorming', def: 'Een beeld van ontwikkelingen op langere termijn, als basis voor prioriteiten en beleid.' },
    { term: 'DRIO', def: 'Dienst Regionale Intelligence Organisatie: de intelligencedienst van een regionale eenheid; plaatsing van de tactisch analist (cluster Cybercrime Intelligence).' },
    { term: 'DRR', def: 'Dienst Regionale Recherche: de recherchedienst van een eenheid, waar de cybercrimeteams zijn gepositioneerd.' },
    { term: 'THTC', def: 'Team High Tech Crime van de Landelijke Eenheid: landelijk team voor de zwaarste en meest complexe cybercrimezaken.' },
    { term: 'LOCO', def: 'Landelijk Operationeel Cybercrime Overleg; heeft een analysecluster waarmee de regionale teams samenwerken.' },
    { term: 'Fenomeenonderzoek', def: 'Onderzoek dat zich richt op een verschijnsel (bijv. een DDoS-dienst) in plaats van op één verdachte of één incident.' },
    { term: 'Integrale aanpak', def: 'Strafrechtelijke, verstorende en preventieve interventies in samenhang, vaak met publiek-private partners.' },
    { term: 'Operationeel specialist B', def: 'De formele functie in het Landelijk Functiegebouw Nederlandse Politie (LFNP), ingedeeld in schaal 10 Bbp.' },
    { term: 'Betrouwbaarheids- en omgevingsonderzoek', def: 'Onderdeel van de selectie waarin de betrouwbaarheid van de kandidaat en diens omgeving wordt onderzocht.' },
  ],
  resources: [
    { title: 'Kom bij de politie: vacatures en selectieprocedure', url: 'https://kombijde.politie.nl/' },
    { title: 'Politie: cybercrime', url: 'https://www.politie.nl/onderwerpen/cybercrime.html' },
    { title: 'Politieacademie', url: 'https://www.politieacademie.nl/' },
  ],
});
