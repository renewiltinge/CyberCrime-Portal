/* Room: Tactisch analist — Kwalitatief onderzoek en dwarsverbanden tussen zaken */

// =======================================================================
//  Alles FICTIEF: de chatgroep, de aliassen (vogel- en dierennamen), de
//  incidenten, de teams, de contact-ID's en de wallets. Wallets zijn bewust
//  afgekort en bestaan niet.
// =======================================================================

CS.registerRoom({
  id: 'ta-kwalitatief-dwarsverbanden',
  path: 'tactisch-analist',
  order: 5,
  title: 'Kwalitatief onderzoek en dwarsverbanden tussen zaken',
  icon: '🧩',
  difficulty: 'Gemiddeld',
  minutes: 75,
  level: 'Praktijk',
  checked: '2026-11-19',
  summary: 'Getallen vertellen wat er gebeurt, woorden vertellen waarom en hoe. Je combineert kwantitatieve en kwalitatieve methoden, beoordeelt kwalitatieve bronnen, codeert chatberichten van open naar axiaal, legt dwarsverbanden tussen incidenten van verschillende teams met de zeldzaamheidstoets en rafelt een vaag vraagstuk uiteen tot een hoofdvraag met deelvragen.',
  objectives: [
    'Kwantitatieve en kwalitatieve methoden onderscheiden en combineren (mixed methods, triangulatie)',
    'Validiteit en betrouwbaarheid uitleggen en bedreigingen ervan herkennen',
    'Kwalitatieve bronnen (chats, verhoren, dossiers, expertinterviews) beoordelen met de Admiralty Code',
    'Chatberichten open en axiaal coderen tot bruikbare categorieën',
    'Incidenten van verschillende teams koppelen op specifieke kenmerken en generieke kenmerken als ruis herkennen',
    'Een vraagstuk uiteenrafelen in een hoofdvraag, deelvragen (issue tree) en hoofd- en bijzaken',
  ],
  tasks: [
    {
      title: 'Taak 1 — Kwantitatief, kwalitatief en de combinatie',
      tryFirst: true,
      intro: '<p>In het lab staan zestien uitspraken uit het werk van een analist. Vier ervan zijn kwantitatieve methoden, vier kwalitatieve, vier zijn een bedreiging van de validiteit en vier een bedreiging van de betrouwbaarheid. Sorteer ze.</p>',
      content: `
        <p>In de vorige room telde je: hits per uur, per operator, per bank. Dat is <strong>kwantitatief</strong> onderzoek:
        je werkt met getallen, meet en vergelijkt, en je antwoord is een hoeveelheid, een verhouding of een trend. Het is
        sterk in de vragen <em>hoeveel</em>, <em>hoe vaak</em> en <em>wanneer</em>.</p>
        <p><strong>Kwalitatief</strong> onderzoek werkt met woorden, beelden en betekenis: chatgesprekken, verhoren,
        processen-verbaal, interviews met rechercheurs. Het is sterk in de vragen <em>hoe</em> en <em>waarom</em>. Hoe is
        de groep georganiseerd? Waarom kozen ze deze slachtoffers? Wat bedoelen ze met "de werkplaats"?</p>

        <h3>Mixed methods en triangulatie</h3>
        <p>De vacature vraagt om ervaring met allebei, en dat is geen toeval. De piek om 09:00 uit de vorige room is
        een kwantitatief feit; pas een chatbericht ("sms-golf gaat morgen om negen uur de deur uit") verklaart hem. Wie
        beide methoden doelbewust combineert, doet <strong>mixed methods</strong>-onderzoek.</p>
        <p><strong>Triangulatie</strong> betekent: een bevinding van meerdere kanten benaderen, zodat ze niet op één
        bron of één blik rust. Denzin onderscheidde vier soorten:</p>
        <ul>
          <li><strong>Datatriangulatie</strong> — verschillende bronnen (panelexport, bankgegevens, chats).</li>
          <li><strong>Onderzoekerstriangulatie</strong> — twee analisten coderen of beoordelen onafhankelijk.</li>
          <li><strong>Theorietriangulatie</strong> — dezelfde data bekijken vanuit verschillende verklaringen.</li>
          <li><strong>Methodentriangulatie</strong> — tellen én lezen, enquête én interview.</li>
        </ul>

        <h3>Validiteit en betrouwbaarheid</h3>
        <p><strong>Validiteit</strong>: meet je wat je wilt meten, en mag je je conclusie trekken? Wie meldingen telt en
        denkt dat hij fraude telt, heeft een validiteitsprobleem: niet elke fraude wordt gemeld. Wie alleen dossiers van
        gepakte daders leest, kan niet zomaar generaliseren naar alle daders (selectiebias).</p>
        <p><strong>Betrouwbaarheid</strong>: krijg je hetzelfde resultaat als je de meting herhaalt, of als een collega
        hem doet? Bij kwalitatief werk is dat de grote uitdaging. Twee analisten die hetzelfde chatlog verschillend
        coderen, maken het resultaat onbetrouwbaar. De oplossing: een <strong>codeboek</strong> met heldere definities en
        een controle van de overeenstemming tussen codeurs (intercodeursbetrouwbaarheid, bijvoorbeeld met Cohen's kappa).</p>

        <div class="callout tip"><strong>Ezelsbruggetje:</strong> een weegschaal die altijd precies twee kilo te veel
        aanwijst, is betrouwbaar (steeds hetzelfde) maar niet valide (het klopt niet). Betrouwbaarheid is nodig voor
        validiteit, maar niet genoeg.</div>
      `,
      lab: {
        type: 'connections',
        title: 'methode of bedreiging?',
        prompt: 'Zestien uitspraken, vier groepen: kwantitatieve methode, kwalitatieve methode, bedreiging van de validiteit (meet je het goede?) en bedreiging van de betrouwbaarheid (komt er steeds hetzelfde uit?).',
        flag: 'NM{tellen_en_lezen}',
        groups: [
          { name: 'Kwantitatieve methode', items: ['Hits per uur tellen in een panelexport', 'Het aandeel slachtoffers per bank berekenen', 'Aangiftes per maand vergelijken met vorig jaar', 'Bedragen per mule-rekening optellen'] },
          { name: 'Kwalitatieve methode', items: ['Chatgesprekken tussen verdachten coderen', 'Een expertinterview met een rechercheur', 'Verhoren doorlezen op de werkwijze', 'Een dossierstudie naar de rolverdeling'] },
          { name: 'Bedreiging van de validiteit', items: ['Meldingen tellen en denken dat je fraude telt', 'Alleen dossiers van gepakte daders bestuderen', 'Uit één eenheid conclusies trekken over het hele land', 'Een vraag stellen die iets anders meet dan bedoeld'] },
          { name: 'Bedreiging van de betrouwbaarheid', items: ['Twee analisten coderen hetzelfde chatlog verschillend', 'Codes gebruiken zonder vastgelegde definitie', 'Een telling die bij elke run anders uitkomt', 'Een export die afhangt van wie hem draait'] },
        ],
      },
      questions: [
        { q: 'Vind in het lab de vier groepen van vier. Welke vlag verschijnt?', answer: ['NM{tellen_en_lezen}'],
          hints: ['Begin met de methoden: werk je met getallen of met woorden?', 'Bij de bedreigingen: gaat het om de vraag of je het goede meet, of om de vraag of er steeds hetzelfde uitkomt?', 'Het lab meldt het als drie van de vier goed zijn. Wissel er dan één.'],
          explain: 'Tellen en lezen zijn twee methoden; validiteit en betrouwbaarheid zijn de twee toetsstenen voor allebei.' },
        { q: 'Je controleert een conclusie uit chatberichten met bankgegevens en met een verhoor. Welke soort triangulatie is dat vooral?', options: ['Datatriangulatie', 'Onderzoekerstriangulatie', 'Theorietriangulatie', 'Geen triangulatie'], answer: 0,
          wrong: { 1: 'Dan zouden meerdere analisten hetzelfde materiaal beoordelen.', 2: 'Dan zou je dezelfde data vanuit verschillende verklaringen bekijken.', 3: 'Drie onafhankelijke bronnen voor één bevinding is juist het schoolvoorbeeld van triangulatie.' },
          explain: 'Verschillende bronnen voor dezelfde bevinding: datatriangulatie.' },
        { q: 'Twee analisten coderen hetzelfde chatlog en zijn het in de helft van de gevallen oneens. Wat is vooral in het geding?', answer: ['betrouwbaarheid', 'de betrouwbaarheid', 'intercodeursbetrouwbaarheid'],
          hints: ['Gaat het erom of je het goede meet, of of er steeds hetzelfde uitkomt?', 'Een collega die hetzelfde doet, zou hetzelfde moeten vinden.', 'Het woord begint met "betrouw".'],
          wrong: { 'validiteit': 'Validiteit gaat over de vraag of je het goede meet. Hier is het probleem dat de uitkomst afhangt van wie codeert.' },
          why: 'Een codering die van de analist afhangt, kun je niet verdedigen in een rapport of voor de rechter.',
          explain: 'De uitkomst hangt af van wie codeert: een betrouwbaarheidsprobleem. Een codeboek met definities en een kappa-meting helpen.' },
      ],
    },

    {
      title: 'Taak 2 — Kwalitatieve bronnen beoordelen',
      tryFirst: true,
      intro: '<p>Vier kwalitatieve bronnen uit een fictief ransomwaredossier. Beoordeel per bron de betrouwbaarheid van de bron (A–F) en, los daarvan, de geloofwaardigheid van de informatie (1–6). Vergelijk daarna met het expertoordeel.</p>',
      content: `
        <p>Kwalitatief materiaal is rijk, maar ook gekleurd. Iedereen die iets zegt of schrijft, heeft een reden om het
        zo te zeggen. Daarom beoordeel je elke bron voordat je er conclusies op bouwt.</p>

        <h3>Vier veelgebruikte kwalitatieve bronnen</h3>
        <table>
          <thead><tr><th>Bron</th><th>Sterk in</th><th>Let op</th></tr></thead>
          <tbody>
            <tr><td><strong>Chatgesprekken</strong> (uit een in beslag genomen toestel of server)</td><td>Hoe de groep werkt, rollen, taalgebruik, afspraken. Geschreven zonder publiek.</td><td>Opschepperij en jargon. Een bericht is echt verstuurd, maar wat erin staat is niet automatisch waar.</td></tr>
            <tr><td><strong>Verhoren</strong></td><td>Motieven, werkwijze, de rol van anderen.</td><td>Eigenbelang: een verdachte verkleint zijn rol, een getuige kan zich vergissen.</td></tr>
            <tr><td><strong>Dossierstudie</strong> (processen-verbaal, eerdere zaken)</td><td>Vastgestelde feiten, patronen over zaken heen.</td><td>Selectie: je ziet alleen wat ooit onderzocht en vastgelegd is.</td></tr>
            <tr><td><strong>Expertinterview</strong> (bijvoorbeeld met een ervaren rechercheur of digitaal specialist)</td><td>Context, ervaringskennis, wat "normaal" is in dit fenomeen.</td><td>Ervaring is geen bewijs; vraag door naar concrete zaken waarop het oordeel rust.</td></tr>
          </tbody>
        </table>

        <h3>De Admiralty Code: twee aparte oordelen</h3>
        <p>Je kent hem uit het intelligence-pad. De <strong>betrouwbaarheid van de bron</strong> (A volledig betrouwbaar
        tot E onbetrouwbaar, F kan niet worden beoordeeld) zegt iets over de leverancier. De <strong>geloofwaardigheid van de
        informatie</strong> (1 bevestigd tot 5 onwaarschijnlijk, 6 kan niet worden beoordeeld) zegt iets over deze ene
        bewering. Houd ze uit elkaar: een betrouwbare bron kan zich vergissen, en een onbekende bron kan gelijk hebben.</p>

        <h3>Bij chats: het kanaal en de spreker</h3>
        <p>Bij een forensisch uitgelezen chat is het kanaal betrouwbaar: het bericht is aantoonbaar verstuurd. Maar de
        bewering ín het bericht beoordeel je apart. "We hebben deze maand veertig bedrijven geraakt" kan opschepperij zijn.
        Zoek bevestiging in een andere bron (triangulatie), bijvoorbeeld het aantal aangiftes met dezelfde losgeldnotitie.</p>

        <div class="callout warn"><strong>Let op:</strong> verhoren en chats van verdachten zijn persoonsgegevens en vaak
        strafvorderlijk verkregen. Je gebruikt ze binnen het doel waarvoor ze zijn verkregen, en je citeert in een product
        alleen wat nodig is.</div>
      `,
      lab: {
        type: 'admiralty',
        items: [
          { source: 'Chatbericht, forensisch uitgelezen van de werktelefoon van een verdachte', info: '"We hebben deze maand veertig bedrijven geraakt."', reliability: 'B', credibility: '3', explain: 'Het kanaal is betrouwbaar: het bericht is aantoonbaar verstuurd (B). Maar het getal is niet bevestigd, en opscheppen tegen mededaders komt veel voor: mogelijk waar (3). Zoek bevestiging in aangiftes.' },
          { source: 'Verhoor van een geldezel, eerste contact met de politie', info: '"Ik wist niet dat het om fraudegeld ging."', reliability: 'F', credibility: '4', explain: 'Over deze persoon als bron is nog niets bekend (F). Hij heeft groot eigenbelang bij deze bewering, en in de chats kreeg hij instructies om juist dit te zeggen: twijfelachtig (4).' },
          { source: 'Expertinterview met een rechercheur die al jaren ransomwarezaken doet', info: 'In drie eerdere zaken zag hij dezelfde affiliate onder twee ransomwaremerken werken.', reliability: 'B', credibility: '2', explain: 'Een ervaren collega met een goed trackrecord (B). Hij noemt concrete zaken die je kunt nalezen, maar je hebt ze nog niet zelf bevestigd: waarschijnlijk waar (2).' },
          { source: 'Proces-verbaal van bevindingen uit een eerdere zaak (2025)', info: 'Een bepaalde wallet ontving losgeld van twee slachtoffers; de transacties staan op de blockchain.', reliability: 'A', credibility: '1', explain: 'Een vastgelegd ambtsedig proces-verbaal (A), en de transacties zijn onafhankelijk na te gaan op de openbare blockchain: bevestigd (1).' },
        ],
      },
      questions: [
        { q: 'Een forensisch uitgelezen chat toont dat een verdachte schreef: "we hebben deze maand veertig bedrijven geraakt". Wat is de juiste houding?', options: ['Het bericht is echt, maar de bewering is pas mogelijk waar; zoek bevestiging in een andere bron', 'Het bericht komt uit een betrouwbaar kanaal, dus het getal klopt', 'Chats van verdachten zijn onbruikbaar', 'Het getal is waarschijnlijk te laag, want daders verzwijgen altijd'], answer: 0,
          wrong: { 1: 'Een betrouwbaar kanaal betekent dat het bericht echt is, niet dat de inhoud waar is.', 2: 'Chats zijn juist een rijke bron over werkwijze en rollen. Je beoordeelt ze alleen apart.', 3: 'Ook dat is een aanname. Zonder bevestiging weet je het niet.' },
          explain: 'Betrouwbaarheid van het kanaal en geloofwaardigheid van de inhoud zijn twee aparte oordelen.' },
        { q: 'Welke letter in de Admiralty Code gebruik je voor een bron waarover je nog niets weet?', answer: ['F'],
          hints: ['Niet E: dat betekent dat de bron bewezen onbetrouwbaar is.', 'Het is de laatste letter van de schaal.', 'Kan niet worden beoordeeld.'],
          wrong: { 'e': 'E betekent onbetrouwbaar: daar is juist wel iets over bekend. Over een nieuwe bron weet je nog niets.' },
          explain: 'F: de betrouwbaarheid kan (nog) niet worden beoordeeld.' },
        { q: 'Wat is het grootste risico van een dossierstudie als basis voor een beeld van een fenomeen?', options: ['Je ziet alleen wat ooit onderzocht en vastgelegd is (selectie)', 'Processen-verbaal zijn meestal onjuist', 'Dossiers bevatten geen kwalitatieve informatie', 'Een dossierstudie is per definitie kwantitatief'], answer: 0,
          wrong: { 1: 'Een proces-verbaal is juist een sterke bron. Het probleem zit in wat er níét in de dossiers staat.', 2: 'Dossiers zitten vol kwalitatief materiaal: verhoren, bevindingen, chats.', 3: 'Je kunt dossiers tellen én lezen.' },
          why: 'Wie alleen gepakte daders bestudeert, beschrijft vooral de daders die zich lieten pakken.',
          explain: 'Selectiebias: zaken die nooit werden opgepakt, komen in je studie niet voor.' },
      ],
    },

    {
      title: 'Taak 3 — Chatberichten coderen: van open naar axiaal',
      tryFirst: true,
      intro: '<p>Twaalf berichten uit een in beslag genomen groepschat (fictief). Geef elk bericht eerst in je eigen woorden een kort label. Breng die labels daarna onder in vier categorieën: werving, betaling, OPSEC en rolverdeling. Beantwoord de vragen in het lab.</p>',
      content: `
        <p>Duizend chatberichten lees je niet "even door". Je <strong>codeert</strong> ze: je geeft stukjes tekst een
        label, zodat je ze kunt groeperen, tellen en vergelijken. Zo maak je van kwalitatief materiaal iets wat je
        systematisch kunt analyseren. De werkwijze komt uit de <em>grounded theory</em> (Glaser en Strauss, later uitgewerkt
        door Strauss en Corbin).</p>

        <h3>Drie rondes</h3>
        <ol>
          <li><strong>Open coderen.</strong> Je leest regel voor regel en plakt er een kort, beschrijvend label op, dicht bij
          de tekst: "nieuwe mensen via kanaal", "proefweek", "vers adres per klant", "logs wissen". Nog niet ordenen; eerst
          alles benoemen.</li>
          <li><strong>Axiaal coderen.</strong> Je zoekt verbanden tussen de open codes en brengt ze onder in bredere
          categorieën. "Nieuwe mensen via kanaal", "proefweek" en "advertentie op forum" worden samen
          <strong>werving</strong>. "Vers adres per klant" en "omzetten via swaps" worden <strong>betaling</strong>.</li>
          <li><strong>Selectief coderen.</strong> Je kiest de kerncategorie die het verhaal draagt en beschrijft hoe de rest
          eraan hangt, bijvoorbeeld: "een kleine kern regelt werving en geld; de uitvoerders zijn vervangbaar".</li>
        </ol>

        <h3>Het codeboek</h3>
        <p>Leg elke categorie vast met een definitie, een voorbeeld en een grensgeval. Bijvoorbeeld:
        <strong>OPSEC</strong> = maatregelen om zelf buiten beeld te blijven (werktelefoons, logs wissen, geen namen).
        Grensgeval: "VPN aan voor je de wallet opent" gaat over geld, maar codeer je als OPSEC, want het doel is
        verbergen. Met zo'n codeboek kan een collega jouw codering herhalen (taak 1: betrouwbaarheid).</p>

        <h3>Een voorbeeld</h3>
        <pre><code>bericht                                         open code                axiale categorie
"Nieuwe jongens via het kanaal binnen"          nieuwe mensen via kanaal werving
"Betaling op een vers adres per klant"          vers adres per klant     betaling
"Logs op de server wis ik elke zondag"          logs wissen              OPSEC</code></pre>

        <div class="callout tip"><strong>Tip:</strong> een bericht kan meer dan één code krijgen. Maar als de helft van
        je berichten in alle categorieën tegelijk valt, zijn je definities te vaag. Scherp ze dan aan.</div>

        <div class="callout info"><strong>Kwalitatief wordt kwantitatief:</strong> zodra alles gecodeerd is, kun je tellen.
        Wie praat het meest over geld? Neemt OPSEC toe na een aanhouding? Zo schakel je tussen de twee methoden.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'groepschat "werkplaats"',
        scenario: 'Twaalf berichten uit een in beslag genomen groepschat (fictief). Codeer elk bericht in één van vier categorieën: werving, betaling, OPSEC of rolverdeling.',
        records: [
          { title: 'C1 · steenuil', lines: ['Nieuwe jongens via het kanaal binnen, twee met eigen RDP-toegang. Proefweek begint maandag.'] },
          { title: 'C2 · grijsreiger', lines: ['De notitie blijft hetzelfde sjabloon. Contact alleen via tox 7F3A9C, die gesprekken doe ik.'] },
          { title: 'C3 · bosmuis', lines: ['Betaling komt binnen op een vers adres per klant. Binnen 24 uur schuif ik het door naar de swap.'] },
          { title: 'C4 · nachtzwaluw', lines: ['Mijn klanten praten met mij op mijn eigen tox 21D0E8. Zelfde builder, eigen deal.'] },
          { title: 'C5 · steenuil', lines: ['Niemand gebruikt zijn eigen telefoon voor deze groep. Alleen werktelefoons, elke maand nieuwe.'] },
          { title: 'C6 · grijsreiger', lines: ['Klant biedt 20 procent van de vraag. Ik zeg nee tot ze betalen voor de testdecryptie.'] },
          { title: 'C7 · bosmuis', lines: ['Logs op de server wis ik elke zondag. En we noemen nooit echte namen.'] },
          { title: 'C8 · steenuil', lines: ['Wie de proefweek haalt, mag door naar de echte doelwitten. Wie faalt, ligt eruit.'] },
          { title: 'C9 · grijsreiger', lines: ['Even helder: steenuil doet de nieuwe mensen, bosmuis het geld, ik de klanten.'] },
          { title: 'C10 · bosmuis', lines: ['Vorige week 38k omgezet via twee swaps, contant via de koerier.'] },
          { title: 'C11 · nachtzwaluw', lines: ['Zet nooit je eigen handle in een bestandsnaam of notitie.'] },
          { title: 'C12 · steenuil', lines: ['Advertentie staat weer op het forum: "pentesters gezocht, goed betaald".'] },
        ],
        ask: [
          { q: 'Hoeveel berichten codeer je als werving?', answer: ['3', 'drie'], hint: 'Zoek berichten over nieuwe mensen, een proefweek en een advertentie.', explain: 'C1, C8 en C12.' },
          { q: 'Hoeveel berichten codeer je als OPSEC?', answer: ['3', 'drie'], hint: 'Zoek maatregelen om buiten beeld te blijven.', explain: 'C5 (werktelefoons), C7 (logs wissen, geen namen) en C11 (geen handle in bestandsnamen).' },
          { q: 'Welke alias schrijft het vaakst over betaling (geld binnenhalen en omzetten)?', answer: ['bosmuis'], hint: 'Kijk wie de berichten over adressen, swaps en de koerier stuurt.', explain: 'bosmuis: C3 en C10. In C9 krijgt hij die rol ook expliciet toegewezen.' },
        ],
      },
      questions: [
        { q: 'Hoe heet de coderingsronde waarin je open codes samenbrengt in bredere categorieën zoals werving en betaling?', answer: ['axiaal coderen', 'axiaal', 'axiale codering', 'axial coding'],
          hints: ['Het is de tweede van de drie rondes.', 'Na het open coderen en vóór het selectief coderen.', 'Het woord lijkt op "as".'],
          wrong: { '/selectief/i': 'Selectief coderen is de derde ronde: je kiest de kerncategorie die het verhaal draagt.', '/^open/i': 'Open coderen is de eerste ronde: labels dicht bij de tekst, nog zonder ordening.' },
          explain: 'Axiaal coderen: verbanden leggen tussen open codes en ze onderbrengen in categorieën.' },
        { q: 'Welke alias verdeelt in de chat expliciet de rollen?', answer: ['grijsreiger'],
          hints: ['Zoek het bericht waarin drie taken aan drie mensen worden gekoppeld.', 'Het is bericht C9.', 'De alias van een grote, grijze vogel.'],
          wrong: { 'steenuil': 'steenuil krijgt in C9 een rol toegewezen, maar verdeelt ze niet zelf.' },
          explain: 'In C9 wijst grijsreiger de rollen toe: werving, geld en klanten.' },
        { q: 'Je codeboek zegt dat "VPN aan voor je de wallet opent" onder OPSEC valt en niet onder betaling. Waarom leg je zulke grensgevallen vast?', options: ['Zodat een collega dezelfde keuze maakt en de codering herhaalbaar is', 'Omdat een bericht maar één code mag hebben', 'Omdat OPSEC belangrijker is dan betaling', 'Omdat de rechter dat eist'], answer: 0,
          wrong: { 1: 'Een bericht mag meerdere codes hebben. Het gaat om consistentie.', 2: 'Het gaat niet om belang, maar om een eenduidige afspraak.', 3: 'Het is goede methodologie, geen wettelijke eis.' },
          explain: 'Vastgelegde grensgevallen maken de codering herhaalbaar: dat is de betrouwbaarheid uit taak 1.' },
      ],
    },

    {
      title: 'Taak 4 — Dwarsverbanden tussen incidenten (case linkage)',
      tryFirst: true,
      intro: '<p>Vijf teams cybercrime hebben elk één of twee ransomware-incidenten (fictief). Niemand heeft de zaken nog naast elkaar gelegd. Klik in het lab op de kenmerken en zoek welke incidenten bij dezelfde dader horen, en welke kenmerken alleen maar ruis zijn.</p>',
      content: `
        <p>Een van de sterkste dingen die een analist kan doen, is zien dat losse zaken bij elkaar horen. Een incident bij
        team West en een bij team Oost lijken elk een kleine zaak; samen zijn ze een reeks van één dader, en dat verandert
        de prioriteit, de aanpak en de kans op succes. Dat koppelen heet <strong>case linkage</strong>.</p>

        <h3>Twee aannames</h3>
        <p>Case linkage rust op twee aannames uit het onderzoek naar daderwerkwijzen:</p>
        <ul>
          <li><strong>Consistentie</strong> — een dader doet dingen van zaak tot zaak grotendeels op dezelfde manier.</li>
          <li><strong>Onderscheidendheid</strong> — die werkwijze verschilt genoeg van die van andere daders.</li>
        </ul>
        <p>De tweede aanname vergeten mensen. Dat twee incidenten via RDP binnenkwamen, is consistent, maar het zegt
        niets: bijna iedere ransomwaregroep gebruikt het. Het is een generiek kenmerk, dus ruis.</p>

        <h3>De zeldzaamheidstoets op incidenten</h3>
        <p>Je kent de zeldzaamheidstoets van infrastructuur (favicons, analytics-ID's). Op incidenten werkt het precies
        zo. Leg de zaken als rijen naast elkaar en de kenmerken als kolommen:</p>
        <table>
          <thead><tr><th>Kenmerk</th><th>Typisch</th><th>Waarom</th></tr></thead>
          <tbody>
            <tr><td>Initiële toegang (RDP, phishing)</td><td>Ruis</td><td>Gedeeld door een groot deel van alle zaken.</td></tr>
            <tr><td>Exfiltratietool (bijv. rclone)</td><td>Meestal ruis</td><td>Legitieme, veelgebruikte tool; veel groepen kiezen hem.</td></tr>
            <tr><td>Sjabloon van de losgeldnotitie</td><td>Familie</td><td>Hoort bij de ransomwarebouwer. Bij ransomware-as-a-service delen alle affiliates hetzelfde sjabloon.</td></tr>
            <tr><td>Contact-ID in de notitie (bijv. een Tox-ID)</td><td>Sterk</td><td>Specifiek: hoort bij wie de onderhandeling doet.</td></tr>
            <tr><td>Wallet</td><td>Zeer sterk, maar zeldzaam gedeeld</td><td>Veel groepen gebruiken een vers adres per slachtoffer. Een gedeeld adres is een harde link.</td></tr>
          </tbody>
        </table>

        <div class="callout info"><strong>Familie is geen dader:</strong> twee incidenten met hetzelfde notitiesjabloon
        kunnen van twee verschillende affiliates zijn die hetzelfde ransomwaremerk huren. Het sjabloon bakent de familie af;
        het contact-ID of de wallet wijst de uitvoerder aan.</div>

        <p>Werk van zeldzaam naar algemeen: begin bij de kenmerken die maar door enkele zaken worden gedeeld, en controleer
        of andere kenmerken het beeld bevestigen of tegenspreken. Noteer bij elke koppeling waarop ze rust, en hoe sterk dat
        is. Een koppeling op één kenmerk is een hypothese; op twee onafhankelijke specifieke kenmerken wordt ze stevig.</p>
      `,
      lab: {
        type: 'fingerprint',
        title: 'acht incidenten, vijf teams',
        scenario: 'Acht ransomware-incidenten (fictief) bij vijf teams cybercrime. Klik een kenmerk aan om te zien welke incidenten het delen en hoe zeldzaam het is.',
        attrs: [
          { key: 'toegang', label: 'Initiële toegang' },
          { key: 'tool', label: 'Exfiltratietool' },
          { key: 'sjabloon', label: 'Notitiesjabloon' },
          { key: 'contact', label: 'Contact-ID in notitie' },
          { key: 'wallet', label: 'Wallet (afgekort)' },
        ],
        hosts: [
          { host: 'INC-01 · team Noord', toegang: 'RDP', tool: 'rclone', sjabloon: 'tmpl-a19', contact: 'tox-11A4B2', wallet: 'bc1q…a1f3' },
          { host: 'INC-02 · team West', toegang: 'RDP', tool: 'rclone', sjabloon: 'tmpl-herstel-v2', contact: 'tox-7F3A9C', wallet: 'bc1q…77d0' },
          { host: 'INC-03 · team Oost', toegang: 'RDP', tool: 'rclone', sjabloon: 'tmpl-c07', contact: 'tox-5C8E01', wallet: 'bc1q…c2e9' },
          { host: 'INC-04 · team Zuid', toegang: 'RDP', tool: 'WinSCP', sjabloon: 'tmpl-herstel-v2', contact: 'tox-21D0E8', wallet: 'bc1q…0b5a' },
          { host: 'INC-05 · team Midden', toegang: 'VPN-lek', tool: 'rclone', sjabloon: 'tmpl-herstel-v2', contact: 'tox-7F3A9C', wallet: 'bc1q…k4m2' },
          { host: 'INC-06 · team Noord', toegang: 'RDP', tool: 'rclone', sjabloon: 'tmpl-e44', contact: 'tox-90F7D3', wallet: 'bc1q…5e11' },
          { host: 'INC-07 · team Oost', toegang: 'RDP', tool: 'MEGAsync', sjabloon: 'tmpl-herstel-v2', contact: 'tox-7F3A9C', wallet: 'bc1q…k4m2' },
          { host: 'INC-08 · team Zuid', toegang: 'RDP', tool: 'rclone', sjabloon: 'tmpl-f62', contact: 'tox-3B6D2F', wallet: 'bc1q…9c40' },
        ],
        ask: [
          { q: 'Hoeveel incidenten delen het contact-ID tox-7F3A9C?', answer: ['3', 'drie'], hint: 'Klik de waarde tox-7F3A9C aan.', explain: 'INC-02, INC-05 en INC-07.' },
          { q: 'Welk incident deelt het notitiesjabloon van die drie, maar niet hun contact-ID?', answer: ['INC-04', 'inc-04', 'inc04', 'inc 04'], hint: 'Klik tmpl-herstel-v2 aan en vergelijk met de contactkolom.', explain: 'INC-04: zelfde ransomwarefamilie, ander contact. Waarschijnlijk een andere affiliate.' },
          { q: 'Welke initiële toegang delen zeven van de acht incidenten (ruis)?', answer: ['RDP', 'rdp'], hint: 'Klik een waarde in de kolom initiële toegang aan.', explain: 'RDP: te algemeen om op te koppelen.' },
        ],
      },
      questions: [
        { q: 'Over hoeveel verschillende teams is de reeks met contact-ID tox-7F3A9C verspreid?', answer: ['3', 'drie'],
          hints: ['Zoek eerst de incidenten met dat contact-ID.', 'Kijk achter de puntjes in de naam van elk incident.', 'Team West, team Midden en team Oost.'],
          wrong: { '2': 'Kijk nog eens naar INC-05: dat zit bij een ander team dan INC-02.', '1': 'Juist niet: de reeks is verspreid, daarom zag niemand hem.' },
          why: 'Zolang drie teams elk één incident zien, ziet niemand een reeks. Dwarsverbanden leggen is daarom een kerntaak van de analist.',
          explain: 'INC-02 (West), INC-05 (Midden) en INC-07 (Oost): drie teams, één dader.' },
        { q: 'INC-05 en INC-07 delen ook een wallet, INC-02 niet. Wat is de beste lezing?', options: ['De koppeling van alle drie blijft staan; de groep gebruikt vaak een vers adres, en een gedeelde wallet versterkt de link tussen 05 en 07', 'INC-02 hoort er niet bij, want de wallet verschilt', 'De wallet is ruis, want hij is maar door twee incidenten gedeeld', 'De drie incidenten zijn van drie verschillende daders'], answer: 0,
          wrong: { 1: 'Een ontbrekende match is geen tegenbewijs als de groep vaak per slachtoffer een nieuw adres maakt. Het contact-ID blijft een specifieke link.', 2: 'Juist omdat hij zeldzaam gedeeld is, is een gedeelde wallet sterk.', 3: 'Een gedeeld specifiek contact-ID wijst op dezelfde onderhandelaar.' },
          explain: 'Zeldzaam en specifiek is sterk. Het ontbreken van een gedeeld kenmerk weegt minder als dat kenmerk toch vaak per zaak wisselt.' },
        { q: 'Waarom koppel je INC-04 niet aan de reeks, terwijl het hetzelfde notitiesjabloon heeft?', options: ['Het sjabloon hoort bij de ransomwarefamilie; het eigen contact-ID wijst op een andere affiliate', 'Omdat INC-04 bij een ander team zit', 'Omdat INC-04 WinSCP gebruikte', 'Omdat sjablonen nooit iets zeggen'], answer: 0,
          wrong: { 1: 'Het team zegt iets over wie de zaak behandelt, niet over de dader.', 2: 'De tool is één generiek verschil; het doorslaggevende verschil is het contact-ID.', 3: 'Het sjabloon zegt wel iets: het bakent de familie af.' },
          explain: 'Familie is geen dader. Bij ransomware-as-a-service delen affiliates het sjabloon, niet hun contact-ID.' },
      ],
    },

    {
      title: 'Taak 5 — Een vraagstuk uiteenrafelen: hoofdvraag, deelvragen, hoofd- en bijzaken',
      tryFirst: true,
      intro: '<p>Je teamleider zegt: "Doe eens iets met die ransomwaregolf." Zet in het lab de zes stappen in de volgorde waarin je zo\'n vaag verzoek omzet in een analyse waarop iemand kan beslissen.</p>',
      content: `
        <p>"Doe eens iets met die ransomwaregolf" is geen onderzoeksvraag. De vacature vraagt om iemand die vraagstukken
        "uiteenrafelt" en "hoofd- van bijzaken" onderscheidt. Dat begint niet bij de data, maar bij de beslissing die de
        opdrachtgever moet nemen.</p>

        <h3>Van verzoek naar hoofdvraag</h3>
        <p>Vraag eerst door: wat wil je kunnen besluiten, en wanneer? Stel dat het antwoord is: "Ik moet volgende week
        kiezen of we de drie incidenten als één onderzoek oppakken, samen met de andere teams." Dan wordt de hoofdvraag
        bijvoorbeeld: <em>Zijn de incidenten bij team West, Midden en Oost het werk van één dader, en waar liggen de beste
        interventiekansen?</em></p>

        <h3>De issue tree</h3>
        <p>Een <strong>issue tree</strong> (vraagboom) splitst de hoofdvraag in deelvragen, en die zo nodig weer verder. Een
        goede splitsing is <strong>MECE</strong> (<em>mutually exclusive, collectively exhaustive</em>): de deelvragen
        overlappen elkaar niet, en samen dekken ze de hoofdvraag. De term komt uit de adviespraktijk (Barbara Minto, de
        piramide-methode).</p>
        <pre><code>Hoofdvraag: één dader, en waar ingrijpen?
├─ 1. Horen de incidenten bij elkaar?         (case linkage, kwantitatief + kwalitatief)
├─ 2. Wie doet wat in de groep?               (chats coderen, verhoren)
├─ 3. Hoe loopt het geld?                     (wallets, transacties)
└─ 4. Welke interventies zijn haalbaar?       (crime script, partners)</code></pre>
        <p>Per deelvraag noteer je welke bron en welke methode het antwoord geven. Zo zie je meteen of je
        mixed methods nodig hebt, en waar gegevens ontbreken.</p>

        <h3>Hoofd- en bijzaken</h3>
        <p>Niet elke deelvraag is even belangrijk. De toets: <strong>verandert het antwoord de beslissing?</strong> Of de
        groep rclone of MEGAsync gebruikt, is interessant, maar verandert niets aan de keuze voor één onderzoek. Of de drie
        incidenten echt bij elkaar horen, verandert alles. Dat is de hoofdzaak. Werk hoofdzaken eerst uit en zet bijzaken in
        een bijlage of op een lijst voor later.</p>

        <div class="callout tip"><strong>Tip:</strong> schrijf je antwoord straks met de conclusie vooraan (BLUF), in de
        volgorde van de hoofdvraag. Een lezer die na de eerste alinea stopt, moet het belangrijkste al weten.</div>

        <h3>Alles bij elkaar</h3>
        <p>Deelvraag 1 heb je in taak 4 beantwoord, deelvraag 2 grotendeels in taak 3. De laatste vraag van deze room legt
        die twee naast elkaar.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'van vaag verzoek naar analyse',
        prompt: 'Zet de zes stappen in de volgorde waarin je een vaag verzoek ("doe eens iets met die ransomwaregolf") omzet in een bruikbare analyse.',
        items: [
          { id: 'a', label: 'Vraag de opdrachtgever wat hij wil kunnen besluiten, en wanneer.' },
          { id: 'b', label: 'Formuleer één hoofdvraag die bij die beslissing past.' },
          { id: 'c', label: 'Splits de hoofdvraag in deelvragen die niet overlappen en samen alles dekken.' },
          { id: 'd', label: 'Scheid hoofd- van bijzaken: welke deelvragen veranderen de beslissing?' },
          { id: 'e', label: 'Kies per prioritaire deelvraag de bron en de methode (tellen, lezen of allebei).' },
          { id: 'f', label: 'Analyseer en beantwoord de hoofdvraag met de conclusie vooraan.' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
        flag: 'NM{hoofdzaak_eerst}',
        explain: 'Eerst de beslissing, dan de hoofdvraag, de deelvragen, de prioriteiten, de methoden en pas dan de analyse.',
      },
      questions: [
        { q: 'Zet de zes stappen in het lab in de juiste volgorde. Welke vlag verschijnt?', answer: ['NM{hoofdzaak_eerst}'],
          hints: ['Begin bij de opdrachtgever, niet bij de data.', 'Je kunt pas kiezen welke deelvragen prioriteit hebben als je de deelvragen hebt.', 'Beslissing, hoofdvraag, deelvragen, prioriteren, bron en methode, analyseren.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag uit dit lab. Hij verschijnt zodra alle zes stappen op de juiste plek staan.' },
          explain: 'Wie bij de data begint, beantwoordt vaak een vraag die niemand stelde.' },
        { q: 'Wat betekent de M van MECE die zegt dat deelvragen elkaar niet mogen overlappen?', answer: ['mutually exclusive', 'mutually', 'elkaar uitsluitend', 'wederzijds uitsluitend'],
          hints: ['MECE heeft twee delen: niet overlappen en samen alles dekken.', 'Het eerste deel, in het Engels.', 'Mutually ...'],
          explain: 'Mutually exclusive: geen overlap. Collectively exhaustive: samen dekken ze de hele hoofdvraag.' },
        { q: 'Boss: welke alias uit de groepschat van taak 3 voert de gesprekken met de slachtoffers van de reeks die je in taak 4 over drie teams vond?', boss: true, answer: ['grijsreiger'],
          hints: ['Zoek eerst het contact-ID dat de drie incidenten verbindt.', 'Zoek in de chatberichten wie dat contact-ID noemt, en welke rol hij heeft volgens je codering.', 'Let op: twee aliassen noemen een Tox-ID, maar slechts één daarvan hoort bij de reeks. De ander hoort bij het incident met alleen hetzelfde sjabloon.'],
          wrong: { 'nachtzwaluw': 'nachtzwaluw onderhandelt ook, maar via een ander Tox-ID: dat van het incident dat alleen het sjabloon deelt.', 'bosmuis': 'bosmuis doet het geld, niet de gesprekken met slachtoffers.', 'steenuil': 'steenuil werft nieuwe mensen; hij praat niet met slachtoffers.' },
          why: 'Eén specifiek kenmerk verbindt drie zaken én een persoon uit een vierde bron. Zo wordt een reeks incidenten een tactisch aanknopingspunt.',
          explain: 'De reeks deelt tox-7F3A9C. In C2 noemt grijsreiger dat ID en zegt hij de gesprekken te doen; in C9 bevestigt hij die rol. nachtzwaluw gebruikt tox-21D0E8, het contact van INC-04.' },
      ],
    },

    {
      title: 'Taak 6 — Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examenvragen over onderzoeksmethoden en dwarsverbanden geven een korte situatie en vragen welk begrip of welke
        stap past. De afleiders zijn echte begrippen die net naast de situatie liggen. Vraag je af: gaat het om meten of om
        begrijpen, om het goede meten of om herhaalbaar meten, om een familie of om een dader?</p>
        <p>De vragen hieronder zijn zelf geschreven in die stijl. Alle zaken en namen zijn fictief.</p>
      `,
      questions: [
        { q: 'Een analist wil weten waarom geldezels meedoen aan fraude. Welke methode past het best als eerste stap?',
          options: ['Halfgestructureerde interviews of verhoren analyseren op motieven', 'Het aantal mule-rekeningen per bank tellen', 'Een tijdreeks van transacties maken', 'Een linkchart van alle rekeningen'], answer: 0,
          wrong: { 1: 'Tellen vertelt hoeveel, niet waarom.', 2: 'Een tijdreeks toont wanneer, niet waarom.', 3: 'Een linkchart toont verbanden, niet motieven.' },
          explain: 'Een waarom-vraag over beweegredenen vraagt om kwalitatieve methoden.' },
        { q: 'Twee incidenten komen allebei binnen via een phishingmail met een Office-bijlage. Een collega wil ze daarom als één reeks behandelen. Wat is je reactie?',
          options: ['Dat kenmerk is te algemeen; zoek eerst een specifiek gedeeld kenmerk', 'Akkoord, de werkwijze is consistent', 'Akkoord, als de incidenten in dezelfde maand vielen', 'Niet doen, want phishing wordt nooit gekoppeld'], answer: 0,
          wrong: { 1: 'Consistentie alleen is niet genoeg; het kenmerk moet ook onderscheidend zijn.', 2: 'Dezelfde maand is ook een algemeen kenmerk.', 3: 'Phishing kun je wel koppelen, maar dan op iets specifieks zoals een uniek domein of afzenderadres.' },
          explain: 'Case linkage vraagt consistentie én onderscheidendheid. Phishing met een bijlage deelt een groot deel van alle zaken.' },
        { q: 'Een analist codeert 500 chatberichten alleen. Wat is de beste manier om de betrouwbaarheid van zijn codering te toetsen?',
          options: ['Een collega codeert een steekproef onafhankelijk en je meet de overeenstemming', 'Hij codeert alles nog een keer', 'Hij telt hoeveel berichten in elke categorie vallen', 'Hij laat de verdachte de codes bevestigen'], answer: 0,
          wrong: { 1: 'Opnieuw coderen door dezelfde persoon herhaalt vaak dezelfde keuzes.', 2: 'Tellen zegt niets over de kwaliteit van de codering.', 3: 'Dat is geen methodologische toets, en het is in een opsporingsonderzoek ook geen optie.' },
          explain: 'Onderzoekerstriangulatie met een maat als Cohen\'s kappa toetst de intercodeursbetrouwbaarheid.' },
        { q: 'Welke deelvraag is in een onderzoek naar "één dader of meerdere?" een bijzaak?',
          options: ['Welke exfiltratietool de dader gebruikte, als veel groepen die tool gebruiken', 'Of de incidenten een specifiek contact-ID delen', 'Of de wallets elkaar raken', 'Of de chats de rolverdeling tonen'], answer: 0,
          wrong: { 1: 'Een gedeeld contact-ID beslist mee over de koppeling: hoofdzaak.', 2: 'Een gedeelde wallet is een harde link: hoofdzaak.', 3: 'De rolverdeling bepaalt waar je ingrijpt: hoofdzaak.' },
          explain: 'Een algemeen kenmerk verandert de beslissing niet. Dat maakt het een bijzaak.' },
      ],
    },
  ],
  terms: [
    { term: 'Kwantitatief onderzoek', def: 'Onderzoek met getallen: meten, tellen en vergelijken. Sterk in hoeveel, hoe vaak en wanneer.' },
    { term: 'Kwalitatief onderzoek', def: 'Onderzoek met woorden en betekenis: chats, verhoren, dossiers, interviews. Sterk in hoe en waarom.' },
    { term: 'Mixed methods', def: 'Kwantitatieve en kwalitatieve methoden doelbewust combineren in één onderzoek.' },
    { term: 'Triangulatie', def: 'Een bevinding van meerdere kanten benaderen: met andere data, andere onderzoekers, andere theorieën of andere methoden (Denzin).' },
    { term: 'Validiteit', def: 'De mate waarin je meet wat je wilt meten en je conclusie mag trekken.' },
    { term: 'Betrouwbaarheid', def: 'De mate waarin een meting bij herhaling of door een ander hetzelfde oplevert.' },
    { term: 'Open coderen', def: 'Eerste coderingsronde: korte, beschrijvende labels dicht bij de tekst, nog zonder ordening.' },
    { term: 'Axiaal coderen', def: 'Tweede coderingsronde: open codes met elkaar verbinden en onderbrengen in bredere categorieën.' },
    { term: 'Codeboek', def: 'Vastlegging van elke code met definitie, voorbeeld en grensgevallen, zodat de codering herhaalbaar is.' },
    { term: 'Case linkage', def: 'Losse zaken of incidenten koppelen aan dezelfde dader op basis van consistente en onderscheidende kenmerken.' },
    { term: 'Issue tree', def: 'Vraagboom die een hoofdvraag splitst in deelvragen, bij voorkeur MECE: zonder overlap en samen volledig.' },
    { term: 'Hoofd- en bijzaken', def: 'Onderscheid tussen deelvragen die de beslissing veranderen (hoofdzaak) en deelvragen die dat niet doen (bijzaak).' },
  ],
  resources: [
    { title: 'Scribbr — Triangulation in research', url: 'https://www.scribbr.com/methodology/triangulation/' },
    { title: 'Scribbr — Thematic analysis (kwalitatief coderen)', url: 'https://www.scribbr.com/methodology/thematic-analysis/' },
    { title: 'UK Government — The Aqua Book: guidance on producing quality analysis', url: 'https://www.gov.uk/government/publications/the-aqua-book-guidance-on-producing-quality-analysis-for-government' },
    { title: 'ASU Center for Problem-Oriented Policing (POP Center)', url: 'https://popcenter.asu.edu/' },
  ],
  check: [
    { q: 'Een weegschaal wijst altijd precies twee kilo te veel aan. Wat is hij?', options: ['Betrouwbaar maar niet valide', 'Valide maar niet betrouwbaar', 'Valide en betrouwbaar', 'Geen van beide'], answer: 0, explain: 'Hij geeft steeds hetzelfde (betrouwbaar), maar niet het juiste gewicht (niet valide).' },
    { q: 'Welk kenmerk is het sterkst om twee ransomware-incidenten aan dezelfde affiliate te koppelen?', options: ['Een gedeeld, specifiek contact-ID in de losgeldnotitie', 'Allebei binnen via RDP', 'Hetzelfde notitiesjabloon', 'Allebei rclone voor exfiltratie'], answer: 0, explain: 'RDP en rclone zijn generiek; het sjabloon bakent de familie af; het contact-ID wijst de affiliate aan.' },
    { q: 'Wat doe je bij axiaal coderen?', options: ['Open codes verbinden en onderbrengen in bredere categorieën', 'Elke regel een eerste label geven', 'De kerncategorie kiezen', 'Berichten tellen per afzender'], answer: 0, explain: 'Axiaal coderen is de tweede ronde, tussen open en selectief coderen.' },
    { q: 'Wat is de toets voor hoofd- en bijzaken?', options: ['Verandert het antwoord de beslissing van de opdrachtgever?', 'Hoeveel data er over de deelvraag is', 'Of de deelvraag kwantitatief is', 'Hoe moeilijk de deelvraag is'], answer: 0, explain: 'Een hoofdzaak verandert de beslissing; een bijzaak niet.' },
  ],
});
