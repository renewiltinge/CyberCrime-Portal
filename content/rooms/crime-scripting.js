/* Room: Crime scripting (Cornish) — leerpad Cyber-intelligence & opsporing */

CS.registerRoom({
  id: 'crime-scripting',
  path: 'intelligence',
  order: 2,
  title: 'Crime scripting',
  icon: '🎬',
  difficulty: 'Gemiddeld',
  minutes: 65,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Hoe je een (cyber)misdaad als een filmdraaiboek ontleedt: het crime script van Cornish, het universele script in zes fasen van voorbereiding tot cash-out, abstractieniveaus, subscripts en displacement, en hoe je er met situationele criminaliteitspreventie en een interventiematrix op ingrijpt.',
  objectives: [
    'Uitleggen wat een crime script is en een scène beschrijven met handeling, actoren, middelen, locatie, randvoorwaarden en sporen',
    'Een (cyber)misdaad in het universele script van zes fasen plaatsen, van voorbereiding tot cash-out',
    'De abstractieniveaus metascript, protoscript, script en track onderscheiden',
    'Subscripts herkennen en de soorten displacement (verplaatsing) benoemen',
    'De vijf situationele-preventiestrategieën van Cornish & Clarke toepassen',
    'Een interventiematrix (fase × strategie) opstellen met een eigenaar per maatregel en beweringen labelen als bekend, afgeleid of aanname',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is crime scripting? Het draaiboek van een misdaad',
      tryFirst: true,
      intro: '<p>Uit een dossier over bankhelpdeskfraude zijn acht losse notities gehaald over één stap van de dader: het telefoongesprek met het slachtoffer. Sorteer de notities: wat is de handeling, wie doet mee, wat is er nodig, waar speelt het, wat moet vooraf kloppen en wat blijft er achter? Gebruik de codes F1 tot en met F8.</p>',
      content: `
        <p>Stel je voor dat je een film maakt. Voordat er ook maar één camera draait, ligt er een
        <strong>draaiboek</strong> (script): scène voor scène staat erin wie er in beeld is, wat ze doen, welke
        spullen ze nodig hebben en waar het zich afspeelt. <strong>Crime scripting</strong> doet precies hetzelfde,
        maar dan voor een misdaad. Je schrijft als het ware het draaiboek van de dader: welke stappen zet iemand,
        in welke volgorde, om een misdaad van begin tot eind uit te voeren?</p>

        <p>De criminoloog <strong>Derek Cornish</strong> introduceerde dit idee in 1994. Zijn gedachte: een misdaad
        is geen losse gebeurtenis maar een <em>proces</em> van achtereenvolgende handelingen. Door dat proces op te
        knippen in scènes, zie je precies waar een dader keuzes maakt en wat er op elk moment moet kloppen. En waar
        keuzes zijn, kun je ingrijpen. Crime scripting komt uit de "gewone" criminologie (zakkenrollerij, inbraak,
        autodiefstal), maar het werkt uitstekend voor cybercrime, want ook een phishingcampagne of een
        ransomware-aanval verloopt in herkenbare stappen.</p>

        <h3>Een scène ontleed je op zes punten</h3>
        <p>Elke scène in een crime script beschrijf je zo volledig mogelijk. Gebruik deze zes velden als checklist:</p>
        <ul>
          <li><strong>Handeling</strong> — wat gebeurt er precies in deze stap?</li>
          <li><strong>Actoren</strong> — wie zijn erbij betrokken? Niet alleen de dader, maar ook het slachtoffer en
          eventuele <em>facilitators</em> (handlangers of dienstverleners, zoals een bulletproof hoster of een geronselde
          geldezel).</li>
          <li><strong>Middelen</strong> — welke tools, infrastructuur of hulpbronnen zijn nodig (een phishingkit, een
          domein, een botnet, een crypto-wallet)?</li>
          <li><strong>Locatie</strong> — waar speelt het zich af? Bij cybercrime vaak digitaal: op welk systeem,
          platform of netwerk.</li>
          <li><strong>Randvoorwaarden</strong> — wat moet er al waar zijn vóórdat deze stap kan slagen (het slachtoffer
          moet een account hebben, het malware-domein moet nog niet geblokkeerd zijn)?</li>
          <li><strong>Sporen</strong> — welke sporen laat deze stap achter? Dit veld is goud voor de opsporing:
          loginpogingen in een log, een geregistreerd domein, een transactie op de blockchain.</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> het veld <strong>sporen</strong> maakt het verschil tussen een leuk theoretisch
          plaatje en een bruikbaar opsporingsinstrument. Elke scène die sporen achterlaat, is een scène waar jij als
          onderzoeker kunt beginnen te graven.
        </div>

        <h3>Mini-voorbeeld</h3>
        <p>Scène "Slachtoffer klikt op de phishinglink". <strong>Handeling:</strong> medewerker opent de e-mail en
        klikt. <strong>Actoren:</strong> dader (verstuurder), slachtoffer, e-mailprovider. <strong>Middelen:</strong>
        nagemaakte inlogpagina, verzenddienst. <strong>Locatie:</strong> de mailbox en de browser van het slachtoffer.
        <strong>Randvoorwaarden:</strong> de mail passeert het spamfilter en het nepdomein is nog niet geblokkeerd.
        <strong>Sporen:</strong> de klik in de webserverlogs, het bezochte domein, het tijdstip.</p>

        <p>Zie je het? Eén zinnetje wordt een rijke, onderzoekbare stap. Een crime script is het draaiboek van een
        misdaad, scène voor scène.</p>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'één scène, acht notities',
        scenario: 'Scène: "de beller overtuigt het slachtoffer om geld over te maken" (bankhelpdeskfraude, fictief dossier). Elke notitie hoort bij één van de zes velden: handeling, actoren, middelen, locatie, randvoorwaarden of sporen.',
        records: [
          { title: 'F1', lines: ['De beller doet zich voor als medewerker van de fraudeafdeling van NederBank en vraagt het slachtoffer haar spaargeld naar een "veilige rekening" over te maken.'] },
          { title: 'F2', lines: ['Dit lukt alleen zolang het slachtoffer het nummer op haar scherm vertrouwt: het getoonde nummer is vervalst en lijkt dat van de bank.'] },
          { title: 'F3', lines: ['In de gespreksgegevens van de telecomaanbieder staat het werkelijke nummer waarvandaan is gebeld.'] },
          { title: 'F4', lines: ['De beller werkt met een uitgeschreven belscript en een gelekte lijst met namen, telefoonnummers en rekeningnummers.'] },
          { title: 'F5', lines: ['Een student heeft tegen betaling zijn bankrekening beschikbaar gesteld. Daar komt het geld binnen. Hij belt zelf niemand.'] },
          { title: 'F6', lines: ['De overboeking staat met tijdstip en tegenrekening in het transactieoverzicht van het slachtoffer.'] },
          { title: 'F7', lines: ['Het speelt zich af op de mobiele telefoon van het slachtoffer en in haar bankieren-app, thuis aan de keukentafel.'] },
          { title: 'F8', lines: ['In de sms-geschiedenis van het slachtoffer staat nog het bericht met de link die de beller tijdens het gesprek stuurde.'] },
        ],
      },
      questions: [
        { q: 'Welke criminoloog introduceerde crime scripting (in 1994)?', answer: ['Cornish', 'cornish', 'Derek Cornish'],
          hints: ['Een Britse criminoloog die misdaad als proces beschreef.', 'Zijn naam staat in de eerste alinea\'s van de uitleg.', 'Zijn achternaam begint met een C en zijn voornaam is Derek.'],
          explain: 'Derek Cornish beschreef in 1994 de misdaad als een proces van scènes: het crime script.' },
        { q: 'Hoeveel van de acht notities beschrijven een spoor?', answer: ['3', 'drie'],
          hints: ['Een spoor is iets wat na afloop nog ergens te vinden is.', 'Zoek notities die een registratie noemen: gegevens bij een aanbieder, een overzicht, een geschiedenis.', 'Het zijn F3, F6 en F8.'],
          wrong: { '2': 'Kijk nog eens naar F8: het sms-bericht staat nog op de telefoon. Dat is ook een spoor.', '4': 'F2 beschrijft wat vooraf moet kloppen (het vervalste nummer wordt vertrouwd). Dat is een randvoorwaarde, geen spoor.' },
          why: 'Sporen zijn de plekken waar een onderzoek kan beginnen. Een script zonder ingevuld sporenveld blijft een verhaal.',
          explain: 'F3 (gespreksgegevens), F6 (transactieoverzicht) en F8 (sms-geschiedenis) zijn sporen: alle drie op te vragen of veilig te stellen.' },
        { q: 'Welke notitie (code) beschrijft een facilitator: iemand die de misdaad mogelijk maakt zonder de hoofddader te zijn?', answer: ['F5'],
          hints: ['Zoek een persoon die meewerkt maar de kernhandeling niet zelf uitvoert.', 'Het gaat om iemand die iets beschikbaar stelt.', 'De student met de bankrekening.'],
          wrong: { 'F1': 'F1 beschrijft de beller zelf en wat hij doet. Dat is de dader en de handeling.', 'F4': 'F4 gaat over spullen (belscript, gelekte lijst). Dat zijn middelen, geen actoren.' },
          explain: 'De student is een geldezel: een facilitator. Hij hoort in het veld actoren.' },
        { q: 'Welke notitie (code) beschrijft een randvoorwaarde: iets wat al waar moet zijn voordat deze stap kan slagen?', answer: ['F2'],
          hints: ['Zoek de notitie met een voorwaarde erin ("alleen zolang ...").', 'Wat moet het slachtoffer geloven voordat ze naar de beller luistert?', 'De notitie over het vervalste nummer.'],
          wrong: { 'F7': 'F7 zegt waar het zich afspeelt. Dat is de locatie.', 'F4': 'Een belscript en een lijst zijn middelen. Een randvoorwaarde is een omstandigheid.' },
          explain: 'F2: het slachtoffer moet het getoonde nummer vertrouwen. Haal je die voorwaarde weg (bijvoorbeeld doordat aanbieders vervalste nummers blokkeren), dan mislukt de scène.' },
      ],
    },

    {
      title: 'Taak 2 — Het universele script: zes fasen van voorbereiding tot cash-out',
      tryFirst: true,
      intro: '<p>Bij het fictieve Vliet Installatietechniek is een factuur onderschept en aangepast. Het dossier bevat zes gebeurtenissen, door elkaar. Zet ze in de volgorde waarin de dader ze uitvoerde en bedenk bij elke stap wat voor soort stap het is.</p>',
      content: `
        <p>Elke misdaad heeft zijn eigen scènes, maar Cornish merkte op dat vrijwel álle scripts dezelfde grove
        bewegingen volgen. Dat noemen we het <strong>universele script</strong>: een vaste reeks fasen die je als
        sjabloon over elke misdaad heen legt. Voor cybercrime gebruiken we een praktische versie van
        <strong>zes fasen</strong>, van de eerste voorbereiding tot het moment waarop het geld echt besteedbaar is
        (de <strong>cash-out</strong>).</p>

        <figure class="diagram">
          <svg viewBox="0 0 802 110" role="img" aria-label="De zes fasen van het universele script">
            <rect x="8" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="142" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="276" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="410" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="544" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="678" y="40" width="116" height="50" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/>
            <text x="66" y="62" text-anchor="middle" fill="currentColor" font-size="13">1</text>
            <text x="66" y="79" text-anchor="middle" fill="currentColor" font-size="12">Voorbereiding</text>
            <text x="200" y="62" text-anchor="middle" fill="currentColor" font-size="13">2</text>
            <text x="200" y="79" text-anchor="middle" fill="currentColor" font-size="12">Binnenkomen</text>
            <text x="334" y="62" text-anchor="middle" fill="currentColor" font-size="13">3</text>
            <text x="334" y="79" text-anchor="middle" fill="currentColor" font-size="12">Uitvoeren</text>
            <text x="468" y="62" text-anchor="middle" fill="currentColor" font-size="13">4</text>
            <text x="468" y="79" text-anchor="middle" fill="currentColor" font-size="12">Buit</text>
            <text x="602" y="62" text-anchor="middle" fill="currentColor" font-size="13">5</text>
            <text x="602" y="79" text-anchor="middle" fill="currentColor" font-size="12">Vertrek</text>
            <text x="736" y="62" text-anchor="middle" fill="currentColor" font-size="13">6</text>
            <text x="736" y="79" text-anchor="middle" fill="currentColor" font-size="12">Cash-out</text>
            <line x1="126" y1="65" x2="138" y2="65" stroke="currentColor"/>
            <polygon points="142,65 136,61 136,69" fill="currentColor"/>
            <line x1="260" y1="65" x2="272" y2="65" stroke="currentColor"/>
            <polygon points="276,65 270,61 270,69" fill="currentColor"/>
            <line x1="394" y1="65" x2="406" y2="65" stroke="currentColor"/>
            <polygon points="410,65 404,61 404,69" fill="currentColor"/>
            <line x1="528" y1="65" x2="540" y2="65" stroke="currentColor"/>
            <polygon points="544,65 538,61 538,69" fill="currentColor"/>
            <line x1="662" y1="65" x2="674" y2="65" stroke="currentColor"/>
            <polygon points="678,65 672,61 672,69" fill="currentColor"/>
          </svg>
          <figcaption>Het universele script: zes fasen van voorbereiding tot cash-out.</figcaption>
        </figure>

        <h3>De zes fasen, toegepast op cybercrime</h3>
        <ol>
          <li><strong>Voorbereiding.</strong> De dader kiest een doelwit, verkent het, en regelt de middelen:
          infrastructuur huren, een phishingkit of malware kopen, domeinen registreren, een team samenstellen.</li>
          <li><strong>Binnenkomen (initiële toegang).</strong> De dader zet voet binnen: een slachtoffer klikt op een
          link, een gestolen wachtwoord werkt, of een kwetsbaarheid in een server wordt uitgebuit.</li>
          <li><strong>Uitvoeren (de daad).</strong> De kernhandeling: rechten uitbreiden, zich door het netwerk bewegen
          en de eigenlijke misdaad plegen — gegevens stelen, geld overboeken of bestanden versleutelen.</li>
          <li><strong>Buit veiligstellen.</strong> De dader haalt de opbrengst binnen: data wegsluizen (exfiltreren),
          het losgeld laten overmaken, of de frauduleuze transacties laten uitvoeren.</li>
          <li><strong>Vertrek en sporen wissen.</strong> De dader verlaat het toneel: logs opschonen, malware
          verwijderen, infrastructuur afbreken en verbindingen verbergen (bijvoorbeeld via tussenstations).</li>
          <li><strong>Cash-out en witwassen.</strong> De laatste, cruciale stap: de buit omzetten in besteedbaar,
          "schoon" geld. Via geldezels (<em>moneymules</em>), crypto-wisselaars, mixers of nepwebwinkels.</li>
        </ol>

        <div class="callout info">
          <strong>Waarom tot aan de cash-out?</strong> Veel onderzoekers stoppen hun script bij "de misdaad is
          gepleegd". Maar juist de cash-out is vaak de zwakste schakel: daar moet de dader uit de anonieme digitale
          wereld terug de echte wereld in, waar banken, exchanges en toezichthouders meekijken. Wie de hele keten tot
          en met de cash-out in kaart brengt, vindt de beste plekken om in te grijpen.
        </div>

        <p>Let op: niet elke misdaad doorloopt alle fasen even nadrukkelijk, en soms lopen fasen door elkaar. Het
        universele script is een <em>denkraam</em>, geen strak keurslijf — net als de kapstok die je uit andere rooms
        kent.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'factuurfraude bij Vliet',
        prompt: 'Zes gebeurtenissen uit het dossier Vliet Installatietechniek (fictief). Zet ze in de volgorde van het script van de dader.',
        items: [
          { id: 'a', label: 'De dader registreert het domein vliet-installatie.nm.lab en zoekt uit wie bij Vliet de facturen verstuurt.' },
          { id: 'b', label: 'Een medewerker van de administratie vult haar wachtwoord in op een nagemaakte inlogpagina.' },
          { id: 'c', label: 'De dader leest mee in haar mailbox en past in een lopende mailwisseling het rekeningnummer op een factuur aan.' },
          { id: 'd', label: 'De klant maakt € 48.000 over naar het rekeningnummer van de dader.' },
          { id: 'e', label: 'De dader verwijdert de doorstuurregel uit de mailbox en wist de verzonden berichten.' },
          { id: 'f', label: 'Een geldezel neemt het bedrag in delen contant op en draagt het af.' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
        flag: 'NM{van_voorbereiding_tot_cash_out}',
        explain: 'Voorbereiding, binnenkomen, uitvoeren, buit veiligstellen, vertrek en sporen wissen, cash-out.',
      },
      questions: [
        { q: 'Zet de zes gebeurtenissen in het lab in de juiste volgorde. Welke vlag verschijnt?', answer: ['NM{van_voorbereiding_tot_cash_out}'],
          hints: ['Begin met wat de dader moest regelen voordat hij iemand benaderde.', 'Het geld komt pas binnen nadat de factuur is aangepast, en het opnemen is de allerlaatste stap.', 'Domein registreren, wachtwoord buitmaken, factuur aanpassen, overboeking, sporen wissen, contant opnemen.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag uit dit lab. Hij verschijnt zodra alle zes op de juiste plek staan.' },
          explain: 'De zes gebeurtenissen volgen precies de zes fasen van het universele script.' },
        { q: 'Hoe heet de laatste fase, waarin de buit wordt omgezet in besteedbaar, "schoon" geld?', answer: ['cash-out', 'cash out', 'cashout'],
          hints: ['Het is de fase van de geldezel in het lab.', 'Een Engelse term.', 'Hij staat in de titel van deze taak.'],
          explain: 'De cash-out (en het witwassen) is de laatste fase en vaak de zwakste schakel in de keten.' },
        { q: 'In welke fase (nummer 1 tot en met 6) valt de gebeurtenis waarbij de klant € 48.000 overmaakt?', answer: ['4', 'vier', 'fase 4'],
          hints: ['Het is niet de kernhandeling van de dader zelf, maar het moment waarop de opbrengst binnenkomt.', 'De kernhandeling (fase 3) was het aanpassen van de factuur.', 'De fase heet "buit veiligstellen".'],
          wrong: { '3': 'Fase 3 is de daad zelf: het aanpassen van het rekeningnummer. De betaling is het binnenhalen van de opbrengst.', '6': 'Cash-out is het omzetten naar besteedbaar geld. Dat doet de geldezel pas daarna.' },
          explain: 'Fase 4, buit veiligstellen: de opbrengst komt binnen. Tussen fase 4 en 6 kan een bank het geld nog bevriezen.' },
      ],
    },

    {
      title: 'Taak 3 — Abstractieniveaus: metascript, protoscript, script en track',
      tryFirst: true,
      intro: '<p>In het lab staan zestien beschrijvingen van misdaad, van heel algemeen tot heel specifiek. Ze horen in vier groepen van vier, van grof naar fijn. Zoek de groepen.</p>',
      content: `
        <p>Een crime script kun je grof of juist heel gedetailleerd schrijven. Cornish onderscheidde daarom
        <strong>abstractieniveaus</strong>: van een zeer algemeen sjabloon tot een haarfijne beschrijving van één
        specifieke uitvoering. Vier niveaus, van abstract naar concreet:</p>

        <table>
          <thead><tr><th>Niveau</th><th>Wat het is</th><th>Cybervoorbeeld</th></tr></thead>
          <tbody>
            <tr><td><strong>Metascript</strong></td><td>Het meest abstracte van deze vier niveaus: een hele familie van misdaden met dezelfde grove logica. (Cornish zet daar nog het universele script boven, het sjabloon voor elk delict.)</td><td>"Online fraude" in het algemeen.</td></tr>
            <tr><td><strong>Protoscript</strong></td><td>Een generiek script voor één type misdaad, los van de precieze uitvoering.</td><td>"Phishing-fraude" als categorie.</td></tr>
            <tr><td><strong>Script</strong></td><td>De concrete manier waarop dat type wordt uitgevoerd.</td><td>"Bankphishing via een nagemaakte inlogpagina".</td></tr>
            <tr><td><strong>Track</strong></td><td>Een specifieke variant binnen hetzelfde script.</td><td>Phishing per sms (smishing) versus per e-mail: twee tracks van hetzelfde script.</td></tr>
          </tbody>
        </table>

        <h3>De analogie van het kookboek</h3>
        <p>Denk aan koken. Het <strong>metascript</strong> is "een maaltijd bereiden" — veel te algemeen om direct mee
        aan de slag te gaan, maar het geeft de grote lijn. Het <strong>protoscript</strong> is "pasta koken": al
        specifieker. Het <strong>script</strong> is het recept voor "spaghetti carbonara". En een <strong>track</strong>
        is een concrete variant van dat recept: carbonara met spek in plaats van pancetta. Zelfde recept, andere
        uitvoering.</p>

        <div class="callout tip">
          <strong>Waarom dit handig is:</strong> op een hoog niveau (meta/proto) herken je patronen die over veel zaken
          heen gelden — ideaal voor beleid en strategische interventies. Op een laag niveau (script/track) zie je de
          concrete details waarmee je één specifieke zaak kunt verstoren. Kies het niveau dat bij je vraag past.
        </div>

        <p>Een valkuil: als je te abstract blijft, wordt je script een nietszeggend plaatje ("dader bereidt voor, dader
        slaat toe"). Blijf je te concreet, dan geldt je script maar voor één enkele zaak en kun je er niets van
        generaliseren. Goede analisten schuiven bewust heen en weer tussen de niveaus: inzoomen voor details,
        uitzoomen voor patronen.</p>
      `,
      lab: {
        type: 'connections',
        title: 'van grof naar fijn',
        prompt: 'Zestien beschrijvingen, vier abstractieniveaus. Groepeer ze: een hele familie van misdaden, één type misdaad, een concrete uitvoeringswijze, of een variant van zo\'n uitvoeringswijze.',
        flag: 'NM{van_meta_tot_track}',
        groups: [
          { name: 'Metascript (familie van misdaden)', items: ['Online fraude', 'Digitale afpersing', 'Gegevensdiefstal', 'Digitale sabotage'] },
          { name: 'Protoscript (één type misdaad)', items: ['Phishing-fraude', 'Ransomware-afpersing', 'Accountovername', 'DDoS-aanval'] },
          { name: 'Script (concrete uitvoeringswijze)', items: ['Bankphishing via een nagemaakte inlogpagina', 'Ransomware via gekochte netwerktoegang', 'Accountovername met gelekte wachtwoorden', 'DDoS met een gehuurde booter-dienst'] },
          { name: 'Track (variant van één script)', items: ['Die bankphishing, maar dan per sms', 'Die bankphishing, maar dan via een QR-code', 'Die ransomware-aanval, maar binnen via RDP', 'Die ransomware-aanval, maar binnen via een VPN-lek'] },
        ],
      },
      questions: [
        { q: 'Vind in het lab de vier groepen van vier. Welke vlag verschijnt?', answer: ['NM{van_meta_tot_track}'],
          hints: ['Begin met de vier breedste begrippen: die passen op heel veel verschillende misdaden.', 'De vier specifiekste beschrijvingen verwijzen elk terug naar een andere beschrijving ("die ..., maar dan ...").', 'Het lab meldt het als je er drie van de vier goed hebt. Wissel er dan één.'],
          explain: 'Van abstract naar concreet: metascript, protoscript, script, track.' },
        { q: 'Smishing (phishing via sms) en phishing via e-mail zijn twee ... van hetzelfde script.', answer: ['tracks', 'track'],
          hints: ['Het gaat om het meest concrete van de vier niveaus.', 'In het lab is dat de groep met "die ..., maar dan ...".', 'Het Engelse woord voor spoor of baan.'],
          explain: 'Een track is een specifieke uitvoeringsvariant binnen één script.' },
        { q: 'Zet van abstract naar concreet: welke volgorde klopt?', options: ['Script, metascript, protoscript, track', 'Metascript, protoscript, script, track', 'Track, script, protoscript, metascript', 'Protoscript, metascript, track, script'], answer: 1, explain: 'Van abstract naar concreet: metascript, protoscript, script, track.' },
      ],
    },

    {
      title: 'Taak 4 — Subscripts en het herkennen van displacement',
      tryFirst: true,
      intro: '<p>Een bank en de politie hebben veertig phishingdomeinen van één bende offline gehaald. Zes weken later liggen er zes waarnemingen op je bureau (W1 tot en met W6). Bepaal per waarneming wat er met de misdaad is gebeurd: is die verdwenen, verschoven, of is er iets anders aan de hand?</p>',
      content: `
        <p>Sommige scènes uit een script zijn op zichzelf al een klein verhaal. Neem de scène "geldezels regelen" in de
        cash-outfase: dat is niet één handeling, maar een heel proces van werven, instrueren, rekeningen laten openen
        en uitbetalen. Zo'n op zichzelf uit te werken deelproces heet een <strong>subscript</strong>: je zoomt in op
        één scène en schrijft daar een compleet eigen script voor.</p>

        <p>Subscripts zijn krachtig omdat ze vaak <em>hergebruikt</em> worden. Het subscript "een phishingkit kopen op
        een crimineel forum" komt in talloze verschillende scripts terug. Verstoor je zo'n veelgebruikt subscript, dan
        raak je in één klap veel zaken tegelijk. Dat maakt subscripts interessante interventiepunten.</p>

        <h3>Displacement: de waterbed-waarschuwing</h3>
        <p>Grijp je ergens in, dan verdwijnt de misdaad lang niet altijd. Vaak <em>verplaatst</em> hij zich — als een
        waterbed waar je op duwt: op de ene plek zakt het, op de andere komt het omhoog. Dat heet
        <strong>displacement</strong> (verplaatsing). Er zijn vijf klassieke soorten (Reppetto, 1976):</p>
        <ul>
          <li><strong>Geografische verplaatsing</strong> (spatial) — zelfde misdaad, andere plek. Het phishingdomein
          wordt geblokkeerd, dus de dader zet een nieuwe server bij een andere hoster in een ander land neer.</li>
          <li><strong>Temporele verplaatsing</strong> (temporal) — zelfde misdaad, ander tijdstip. Monitoring is
          strak overdag, dus de aanval verschuift naar de nacht of het weekend.</li>
          <li><strong>Doelverplaatsing</strong> (target) — ander slachtoffer. De grootbank beveiligt zich goed, dus de
          dader richt zich op klanten van kleinere banken.</li>
          <li><strong>Tactische verplaatsing</strong> (tactical) — andere methode of modus operandi. E-mailfilters
          werken te goed, dus de dader stapt over op phishing via sms of QR-codes.</li>
          <li><strong>Misdaadverplaatsing</strong> (functional) — ander type misdaad. Ransomware wordt te risicovol,
          dus de groep schakelt over op gegevensdiefstal met afpersing.</li>
        </ul>
        <p>Barr &amp; Pease (1990) voegden daar nog een zesde aan toe: <strong>daderverplaatsing</strong> (perpetrator) —
        pak je de ene dader op, dan neemt een ander zijn plek in, zeker in een crime-as-a-service-markt.</p>

        <div class="callout info">
          <strong>Het goede nieuws — diffusion of benefits:</strong> het tegenovergestelde van displacement bestaat ook.
          Soms heeft een maatregel een <em>positieve uitstraling</em> naar plekken of doelen die je niet eens
          aanpakte. Camera's op één parkeerterrein verminderen soms ook de diefstal op het terrein ernaast. Dat heet
          <em>diffusion of benefits</em> (verspreiding van baten).
        </div>

        <p>De les voor een analist: ga er nooit automatisch van uit dat een interventie het probleem oplost. Vraag je
        bij elke maatregel af: <em>waarheen zou deze misdaad kunnen verschuiven?</em> Juist door displacement te
        voorspellen, kun je je interventies slim combineren zodat er geen makkelijke uitwijkroute overblijft.</p>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'zes weken na de takedown',
        scenario: 'Interventie: veertig phishingdomeinen van één bende zijn bij één hoster offline gehaald (fictief). Dit zijn de waarnemingen zes weken later.',
        records: [
          { title: 'W1', lines: ['De bende zet dezelfde phishingpagina\'s binnen een week neer bij een hoster in een ander land.'] },
          { title: 'W2', lines: ['De phishingberichten komen nu vooral in het weekend binnen, als het fraudeteam van de bank onderbezet is.'] },
          { title: 'W3', lines: ['Een deel van de daders stuurt geen e-mail meer, maar sms-berichten die naar dezelfde nagemaakte inlogpagina leiden.'] },
          { title: 'W4', lines: ['Bij een regionale bank die niet aan de actie meedeed, daalt het aantal phishingmeldingen ook.'] },
          { title: 'W5', lines: ['Klanten van een kleine kredietunie worden voor het eerst doelwit van dezelfde bende.'] },
          { title: 'W6', lines: ['Twee leden plegen zelf geen fraude meer en verkopen nu gestolen inloggegevens aan anderen.'] },
        ],
      },
      questions: [
        { q: 'Hoe heet een scène die je als een compleet eigen, op zichzelf uit te werken deelproces beschrijft (zoals "geldezels regelen")?', answer: ['subscript', 'een subscript'],
          hints: ['Je zoomt in op één scène en schrijft daar een eigen draaiboek voor.', 'Het woord staat in de titel van deze taak.', 'Een script binnen een script.'],
          explain: 'Een subscript werkt één scène uit tot een eigen script; het wordt vaak over meerdere zaken hergebruikt.' },
        { q: 'Welke waarneming (code) is tactische verplaatsing: zelfde misdaad, andere methode?', answer: ['W3'],
          hints: ['Zoek de waarneming waarin het middel verandert, niet de plek, het tijdstip of het slachtoffer.', 'Let op het kanaal waarlangs het slachtoffer wordt benaderd.', 'De waarneming over sms-berichten.'],
          wrong: { 'W1': 'Bij W1 verandert alleen de plek waar de pagina\'s staan. Dat is geografische verplaatsing.', 'W6': 'Bij W6 verandert het type misdaad zelf (van fraude plegen naar gegevens verkopen). Dat is misdaadverplaatsing.' },
          explain: 'W3: van e-mail naar sms, met dezelfde nagemaakte pagina. De methode verandert, de misdaad blijft. In de taal van taak 3 is dat ook een nieuwe track.' },
        { q: 'Welke waarneming (code) is geen displacement maar diffusion of benefits?', answer: ['W4'],
          hints: ['Zoek de waarneming waarin het ergens beter wordt in plaats van slechter.', 'Het effect treedt op bij een partij die zelf niets deed.', 'De regionale bank.'],
          wrong: { 'W5': 'Bij W5 krijgt een nieuwe groep slachtoffers er last van. Dat is doelverplaatsing.' },
          why: 'Wie alleen naar displacement zoekt, onderschat het effect van zijn maatregel. Meet bij een evaluatie altijd ook de omgeving.',
          explain: 'W4: de baten van de actie stralen uit naar een bank die niet meedeed.' },
        { q: 'Hoeveel van de zes waarnemingen zijn een vorm van displacement? (cijfer)', answer: ['5'],
          hints: ['Loop ze één voor één langs met de vraag: is de misdaad verschoven?', 'Er is precies één waarneming die geen verschuiving is.', 'Alles behalve W4.'],
          wrong: { '6': 'W4 is een verbetering bij een partij die niet meedeed. Dat is het tegenovergestelde van displacement.', '4': 'W6 telt ook: overstappen op een ander type misdaad is misdaadverplaatsing.' },
          explain: 'W1 geografisch, W2 temporeel, W3 tactisch, W5 doel, W6 misdaadtype. Alleen W4 is diffusion of benefits.' },
      ],
    },

    {
      title: 'Taak 5 — Situationele criminaliteitspreventie: de vijf strategieën',
      tryFirst: true,
      intro: '<p>In het lab staan zestien maatregelen. Elke maatregel maakt een misdaad op een andere manier minder aantrekkelijk: moeilijker, gevaarlijker voor de dader, minder lonend, of lastiger goed te praten. Sorteer ze in vier groepen van vier.</p>',
      content: `
        <p>Crime scripting is pas echt nuttig als je er iets mee doet. Hier komt <strong>situationele
        criminaliteitspreventie</strong> (SCP; Engels: <em>situational crime prevention</em>) om de hoek kijken. Het
        idee: in plaats van daders proberen te "genezen", maak je de <em>situatie</em> zo onaantrekkelijk mogelijk om
        de misdaad te plegen. Je verandert de omgeving, niet de mens. Omdat je crime script precies laat zien wélke
        situaties er in elke scène zijn, sluiten crime scripting en SCP perfect op elkaar aan.</p>

        <p><strong>Cornish &amp; Clarke</strong> (2003) brachten alle maatregelen onder in <strong>vijf
        strategieën</strong> (met daaronder 25 concrete technieken). Dit zijn de vijf knoppen waaraan je kunt
        draaien:</p>
        <ol>
          <li><strong>Inspanning verhogen</strong> (increase the effort) — maak de misdaad simpelweg moeilijker.
          Cybervoorbeeld: multifactor-authenticatie (MFA), zodat een gestolen wachtwoord alleen niet genoeg is.</li>
          <li><strong>Risico verhogen</strong> (increase the risks) — vergroot de pakkans en de kans dat de dader
          wordt opgemerkt. Cybervoorbeeld: monitoring, loggen, en snelle detectie met een SOC.</li>
          <li><strong>Opbrengst verlagen</strong> (reduce the rewards) — maak de buit minder waard of onbruikbaar.
          Cybervoorbeeld: gegevens versleutelen of tokeniseren, zodat gestolen data waardeloos is; of goede offline
          back-ups, zodat losgeld betalen zinloos wordt.</li>
          <li><strong>Provocaties verminderen</strong> (reduce provocations) — neem prikkels en verleidingen weg die tot
          de misdaad aanzetten. Cybervoorbeeld: geen onnodige druk of haast in processen, en geen openlijk gepronk met
          waardevolle "trofeeën" die daders uitdagen.</li>
          <li><strong>Excuses wegnemen</strong> (remove excuses) — maak duidelijk dat gedrag niet mag en haal de smoesjes
          weg. Cybervoorbeeld: heldere gebruiksvoorwaarden, loginbanners ("ongeautoriseerd gebruik is strafbaar"),
          en bewustwordingstraining.</li>
        </ol>

        <div class="callout tip">
          <strong>Ezelsbruggetje:</strong> <em>inspanning, risico, opbrengst, provocaties, excuses</em>. De eerste drie
          gaan over de rationele kosten-batenafweging van de dader (moeilijker, gevaarlijker, minder lonend). De laatste
          twee gaan over de prikkels en rechtvaardigingen eromheen.
        </div>

        <h3>SCP en de rationele keuze</h3>
        <p>Onder SCP ligt dezelfde aanname als onder crime scripting: de dader maakt (grofweg) <em>rationele keuzes</em>.
        Als de inspanning te groot, het risico te hoog of de opbrengst te klein wordt, kiest een dader eerder voor een
        ander doel — of ziet hij er helemaal van af. Dat is meteen de reden dat je displacement (vorige taak) steeds
        moet meewegen: duw je op één knop, dan kan de dader de druk elders zoeken.</p>

        <p>Onthoud deze vijf strategieën goed — ze vormen samen met de zes fasen straks de assen van je
        interventiematrix.</p>
      `,
      lab: {
        type: 'connections',
        title: 'welke knop is dit?',
        prompt: 'Zestien maatregelen, vier strategieën. De vijfde strategie (provocaties verminderen) doet in dit lab niet mee. Vraag je bij elke maatregel af wat er voor de dader verandert.',
        flag: 'NM{vijf_knoppen_van_scp}',
        groups: [
          { name: 'Inspanning verhogen', items: ['MFA op alle accounts', 'Macro\'s in Office-bestanden staan standaard uit', 'Beheerpoorten alleen bereikbaar via VPN', 'Lange, unieke wachtwoorden afgedwongen'] },
          { name: 'Risico verhogen', items: ['Een SOC bewaakt de logs dag en nacht', 'Alarm bij inloggen vanuit een onbekend land', 'Beheerhandelingen worden onwisbaar gelogd', 'Meldknop voor verdachte mail in de mailclient'] },
          { name: 'Opbrengst verlagen', items: ['Klantgegevens staan versleuteld in de database', 'Geteste offline back-ups', 'Gestolen betaalkaarten worden direct geblokkeerd', 'De bank bevriest verdachte overboekingen'] },
          { name: 'Excuses wegnemen', items: ['Loginbanner: ongeautoriseerd gebruik is strafbaar', 'Gebruiksvoorwaarden die elke medewerker ondertekent', 'Jaarlijkse bewustwordingstraining', 'Heldere regels voor het delen van klantdata'] },
        ],
      },
      questions: [
        { q: 'Welke van deze hoort NIET bij de vijf SCP-strategieën van Cornish & Clarke?', options: ['Inspanning verhogen', 'Risico verhogen', 'Daders opsluiten zonder proces', 'Excuses wegnemen'], answer: 2, explain: 'De vijf strategieën zijn: inspanning verhogen, risico verhogen, opbrengst verlagen, provocaties verminderen en excuses wegnemen.' },
        { q: 'Goede offline back-ups maken het betalen van losgeld zinloos. Welke SCP-strategie is dit vooral?', options: ['Inspanning verhogen', 'Opbrengst verlagen', 'Excuses wegnemen', 'Provocaties verminderen'], answer: 1, explain: 'Door de buit (afgedwongen losgeld) waardeloos te maken, verlaag je de opbrengst van de misdaad.' },
        { q: 'Multifactor-authenticatie (MFA) invoeren is vooral een voorbeeld van welke strategie?', answer: ['inspanning verhogen', 'de inspanning verhogen', 'increase the effort'],
          hints: ['Wat verandert er voor een dader die al een gestolen wachtwoord heeft?', 'In het lab staat MFA in dezelfde groep als lange wachtwoorden en afgeschermde beheerpoorten.', 'De misdaad wordt moeilijker: de dader moet meer moeite doen.'],
          wrong: { '/risico/i': 'MFA vergroot de pakkans niet. Het maakt de aanval zelf lastiger.', '/opbrengst/i': 'De buit blijft even veel waard. De dader komt er alleen moeilijker bij.' },
          explain: 'MFA maakt de aanval moeilijker uit te voeren: dat is "inspanning verhogen".' },
        { q: 'Vind in het lab de vier groepen van vier. Welke vlag verschijnt?', answer: ['NM{vijf_knoppen_van_scp}'],
          hints: ['Begin met de groep die je het makkelijkst herkent, bijvoorbeeld alles wat de dader vertelt dat het niet mag.', 'Twijfel je tussen moeilijker en gevaarlijker: wordt de dader tegengehouden, of wordt hij gezien?', 'Het lab meldt het als drie van de vier bij elkaar horen. Wissel er dan één.'],
          explain: 'De vijf strategieën zijn de vijf knoppen van situationele criminaliteitspreventie. Vier ervan heb je hier gesorteerd.' },
      ],
    },

    {
      title: 'Taak 6 — De interventiematrix en de labeling-conventie',
      content: `
        <p>Nu komt alles samen. Je hebt een misdaad opgeknipt in <strong>fasen</strong> (het universele script) en je
        kent de vijf <strong>strategieën</strong> van SCP. Zet die tegen elkaar af in een tabel, en je krijgt de
        <strong>interventiematrix</strong>: fase × strategie. In elke cel noteer je een concrete maatregel die in díé
        fase via díé strategie ingrijpt — plus, cruciaal, <strong>wie de eigenaar is</strong>.</p>

        <h3>Waarom een eigenaar per maatregel?</h3>
        <p>Een maatregel zonder eigenaar is een vrome wens (dat zag je ook bij lessons learned in de defensief-rooms).
        Cybercrime bestrijd je bovendien zelden alleen: een bank, een hostingprovider, het NCSC, een registrar, een
        crypto-exchange en de politie hebben elk hun eigen knoppen. De matrix maakt zichtbaar wie wat moet doen — en
        legt de verantwoordelijkheid ergens neer.</p>

        <table>
          <thead><tr><th>Fase</th><th>Strategie</th><th>Maatregel</th><th>Eigenaar</th></tr></thead>
          <tbody>
            <tr><td>Voorbereiding</td><td>Risico verhogen</td><td>Verdachte domeinregistraties monitoren en snel laten neerhalen (takedown)</td><td>Registrar / NCSC</td></tr>
            <tr><td>Binnenkomen</td><td>Inspanning verhogen</td><td>MFA afdwingen op alle accounts</td><td>Werkgever / IT-beheer</td></tr>
            <tr><td>Uitvoeren</td><td>Risico verhogen</td><td>Snelle detectie van afwijkend gedrag (SOC, EDR)</td><td>SOC / securityteam</td></tr>
            <tr><td>Buit veiligstellen</td><td>Opbrengst verlagen</td><td>Gegevens versleutelen/tokeniseren en exfiltratie blokkeren</td><td>Werkgever / IT-beheer</td></tr>
            <tr><td>Vertrek</td><td>Risico verhogen</td><td>Onveranderbare (append-only) logging, zodat sporen niet te wissen zijn</td><td>IT-beheer</td></tr>
            <tr><td>Cash-out</td><td>Opbrengst verlagen</td><td>Verdachte geldstromen bevriezen; mule-rekeningen signaleren</td><td>Bank / crypto-exchange</td></tr>
          </tbody>
        </table>

        <div class="callout tip">
          <strong>Tip:</strong> je hoeft niet elke cel te vullen. Zoek de cellen met de grootste hefboom: vaak zijn dat
          veelgebruikte subscripts (taak 4) en de cash-outfase, want daar komt de dader uit de anonimiteit tevoorschijn.
        </div>

        <h3>De labeling-conventie: bekend, afgeleid, aanname</h3>
        <p>Bij het invullen van een script of matrix mix je al snel feiten met interpretatie. Houd die scherp uit
        elkaar met drie labels — een gewoonte die je door het hele intelligence-leerpad heen gebruikt:</p>
        <ul>
          <li><strong>Bekend</strong> — een feit of directe waarneming (een log, een transactie, een e-mail die je zelf
          zag). Hard, controleerbaar.</li>
          <li><strong>Afgeleid</strong> — een analytische conclusie die je trekt uit het bekende ("de dader gebruikte
          waarschijnlijk een geautomatiseerde tool, want de acties volgden elkaar in milliseconden op").</li>
          <li><strong>Aanname</strong> — iets wat je (nog) niet hebt onderbouwd, maar wat je voorlopig aanneemt om
          verder te kunnen ("we nemen aan dat de geldezels niet wisten dat ze meehielpen").</li>
        </ul>

        <div class="callout warn">
          <strong>Waarom dit telt:</strong> wie bekend, afgeleid en aanname door elkaar haalt, bouwt een mooi verhaal op
          drijfzand. Door elk veld te labelen zie je in één oogopslag hoe stevig je script is — en waar je nog bewijs
          moet verzamelen voordat je een interventie op een <em>aanname</em> baseert.
        </div>

        <p>Tijd om het zelf te doen. In het lab hieronder werk je een phishing-fraude met geldezels uit in de zes fasen,
        met per fase een interventie. Label je velden netjes en vergelijk daarna met de voorbeelduitwerking.</p>
      `,
      lab: {
        type: 'crimescript',
        scenario: 'Phishing-fraude met moneymules (geldezels) — een bende stuurt bankphishing en sluist het buitgemaakte geld weg via geronselde geldezels.',
        phases: ['1 · Voorbereiding', '2 · Binnenkomen', '3 · Uitvoeren', '4 · Buit veiligstellen', '5 · Vertrek & sporen wissen', '6 · Cash-out & witwassen'],
        fields: ['Handeling', 'Actoren', 'Middelen', 'Locatie', 'Randvoorwaarden', 'Sporen'],
        interventions: true,
        model: `
          <p><em>Voorbeelduitwerking. Beweringen gelabeld als (bekend) / (afgeleid) / (aanname).</em></p>
          <table>
            <thead><tr><th>Fase</th><th>Scène &amp; velden</th><th>Interventie — eigenaar — strategie</th></tr></thead>
            <tbody>
              <tr><td><strong>1 · Voorbereiding</strong></td>
                <td><strong>Handeling:</strong> nepdomein registreren en inlogpagina klonen.
                <strong>Actoren:</strong> dader, registrar (facilitator).
                <strong>Middelen:</strong> phishingkit, lookalike-domein.
                <strong>Locatie:</strong> hostingprovider.
                <strong>Randvoorwaarden:</strong> domein lijkt op de echte bank (afgeleid).
                <strong>Sporen:</strong> domeinregistratie in WHOIS en certificate transparency (bekend).</td>
                <td>Lookalike-domeinen monitoren en snel laten neerhalen. <strong>Eigenaar:</strong> registrar/NCSC. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>2 · Binnenkomen</strong></td>
                <td><strong>Handeling:</strong> slachtoffer klikt en vult inloggegevens in.
                <strong>Actoren:</strong> slachtoffer, dader.
                <strong>Middelen:</strong> phishingmail, nep-inlogpagina.
                <strong>Locatie:</strong> mailbox en browser van het slachtoffer.
                <strong>Randvoorwaarden:</strong> mail passeert het spamfilter (aanname).
                <strong>Sporen:</strong> klik in webserverlog, tijdstip, IP (bekend).</td>
                <td>MFA afdwingen zodat gestolen wachtwoord niet volstaat. <strong>Eigenaar:</strong> bank. <strong>Strategie:</strong> inspanning verhogen.</td></tr>
              <tr><td><strong>3 · Uitvoeren</strong></td>
                <td><strong>Handeling:</strong> dader logt in en zet een overboeking klaar.
                <strong>Actoren:</strong> dader.
                <strong>Middelen:</strong> gestolen inloggegevens.
                <strong>Locatie:</strong> bankomgeving.
                <strong>Randvoorwaarden:</strong> sessie blijft geldig (afgeleid).
                <strong>Sporen:</strong> loginlog, afwijkend apparaat/locatie (bekend).</td>
                <td>Afwijkende login en transactie realtime detecteren en tegenhouden. <strong>Eigenaar:</strong> bank (fraudeteam). <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>4 · Buit veiligstellen</strong></td>
                <td><strong>Handeling:</strong> geld wordt overgemaakt naar een mule-rekening.
                <strong>Actoren:</strong> dader, geldezel (facilitator).
                <strong>Middelen:</strong> mule-rekening.
                <strong>Locatie:</strong> betaalsysteem.
                <strong>Randvoorwaarden:</strong> mule-rekening staat klaar (bekend).
                <strong>Sporen:</strong> transactiegegevens, tegenrekening (bekend).</td>
                <td>Transactielimieten en vertraagde uitbetaling bij nieuwe tegenrekeningen. <strong>Eigenaar:</strong> bank. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
              <tr><td><strong>5 · Vertrek &amp; sporen wissen</strong></td>
                <td><strong>Handeling:</strong> dader logt uit en verbreekt verbindingen.
                <strong>Actoren:</strong> dader.
                <strong>Middelen:</strong> VPN/proxy.
                <strong>Locatie:</strong> tussenstations.
                <strong>Randvoorwaarden:</strong> herkomst verbergbaar (aanname).
                <strong>Sporen:</strong> proxy-/VPN-exit-IP, sessieduur (bekend).</td>
                <td>Onveranderbare (append-only) logging voor volledige reconstructie. <strong>Eigenaar:</strong> bank/IT. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>6 · Cash-out &amp; witwassen</strong></td>
                <td><strong>Handeling:</strong> geldezel neemt geld op of boekt door.
                <strong>Actoren:</strong> geldezel, ronselaar, (crypto-)wisselaar.
                <strong>Middelen:</strong> pinautomaat, exchange.
                <strong>Locatie:</strong> fysieke wereld / exchange.
                <strong>Randvoorwaarden:</strong> ezel werkt mee (aanname).
                <strong>Sporen:</strong> camerabeelden, opnametijdstip, exchange-KYC (bekend).</td>
                <td>Verdachte geldstromen bevriezen en mule-rekeningen signaleren. <strong>Eigenaar:</strong> bank/exchange + politie. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
            </tbody>
          </table>
        `,
      },
      questions: [
        { q: 'Wat vormen de twee assen van de interventiematrix?', options: ['Dader × slachtoffer', 'Fase (universeel script) × strategie (SCP)', 'Metascript × track', 'Bekend × aanname'], answer: 1, explain: 'De interventiematrix zet de fasen van het universele script tegen de vijf SCP-strategieën af.' },
        { q: 'Open de voorbeelduitwerking in het lab. Hoeveel velden zijn daar als (aanname) gelabeld? (cijfer)', answer: ['3'],
          hints: ['Tel alleen de labels in de tabel, niet de regel erboven die de drie labels uitlegt.', 'Kijk in elke fase naar het veld randvoorwaarden.', 'De fasen 2, 5 en 6.'],
          wrong: { '4': 'De regel boven de tabel noemt het label ook, maar dat is uitleg en geen veld.', '6': 'Niet elke randvoorwaarde is een aanname: in fase 1 en 3 is hij afgeleid, in fase 4 bekend.' },
          why: 'Elke aanname in een script is een plek waar je interventie kan mislukken. Wie ze telt, weet waar hij nog bewijs moet halen.',
          explain: 'Drie: het spamfilter laat de mail door (fase 2), de herkomst is te verbergen (fase 5) en de geldezel werkt mee (fase 6).' },
        { q: 'Waarom hoort bij elke maatregel in de matrix een eigenaar?', options: ['Een maatregel zonder eigenaar wordt zelden uitgevoerd, en cybercrime bestrijd je met meerdere partijen', 'Omdat de wet dat eist', 'Om de tabel langer te maken', 'Dat hoeft niet, het is optioneel'], answer: 0, explain: 'Zonder eigenaar blijft een maatregel een vrome wens; de matrix legt de verantwoordelijkheid bij de juiste partij.' },
        { q: 'In welke fase (nummer) noemt de voorbeelduitwerking de politie als mede-eigenaar van de interventie?', answer: ['6', 'fase 6'],
          hints: ['Lees in de voorbeelduitwerking de kolom met interventie, eigenaar en strategie.', 'Zoek de fase waarin de dader uit de digitale wereld terug moet naar de echte.', 'De fase waarin geldstromen worden bevroren.'],
          wrong: { '1': 'In fase 1 zijn de registrar en het NCSC eigenaar.' },
          explain: 'Fase 6, cash-out: bank en exchange bevriezen geldstromen, samen met de politie. De matrix laat zien dat je daar meerdere partijen nodig hebt.' },
      ],
    },

    {
      title: 'Taak 7 — Oefening: een RaaS-affiliate-aanval scripten',
      content: `
        <p>Tot slot een pittigere casus. <strong>Ransomware-as-a-Service</strong> (RaaS) is een crimineel verdienmodel
        waarbij een kerngroep de ransomware bouwt en onderhoudt, en <strong>affiliates</strong> (partners) de
        daadwerkelijke aanvallen uitvoeren. De buit wordt gedeeld. Dit is crime-as-a-service ten voeten uit: de taken
        zijn verdeeld over gespecialiseerde partijen, elk met hun eigen subscript.</p>

        <h3>De keten in het kort</h3>
        <ul>
          <li>De <strong>kerngroep</strong> levert de ransomware, een leksite voor dubbele afpersing en de
          onderhandelingsinfrastructuur. (Een facilitator voor de affiliate.)</li>
          <li>De <strong>affiliate</strong> koopt of huurt initiële toegang (soms bij een <em>initial access broker</em>),
          dringt het netwerk binnen, versleutelt en steelt data, en eist losgeld.</li>
          <li>De <strong>cash-out</strong> loopt via crypto: betaling in een wallet, daarna mixers en exchanges om het
          spoor te vertroebelen.</li>
        </ul>

        <div class="callout info">
          <strong>Let op de abstractieniveaus:</strong> "ransomware-afpersing" is een protoscript. "RaaS-aanval via een
          gekochte toegang" is het script. En of de affiliate nu via RDP of via een VPN-kwetsbaarheid binnenkomt — dat
          zijn twee tracks. Zo hangt deze room aan elkaar.
        </div>

        <p>Werk nu in het lab de RaaS-affiliate-aanval uit in de zes fasen. Vul per fase de velden in (handeling,
        actoren, middelen, locatie, randvoorwaarden, sporen), label je beweringen als bekend/afgeleid/aanname, en
        bedenk per fase één interventie met een eigenaar en een SCP-strategie. Vergelijk daarna met de
        voorbeelduitwerking.</p>

        <h3>Samenvatting van de room</h3>
        <ul>
          <li>Een <strong>crime script</strong> (Cornish) ontleedt een misdaad scène voor scène, elk met handeling,
          actoren, middelen, locatie, randvoorwaarden en sporen.</li>
          <li>Het <strong>universele script</strong> telt zes fasen: voorbereiding, binnenkomen, uitvoeren, buit
          veiligstellen, vertrek en cash-out.</li>
          <li>Abstractieniveaus lopen van <strong>metascript</strong> via protoscript en script tot <strong>track</strong>;
          <strong>subscripts</strong> werken één scène verder uit.</li>
          <li><strong>Displacement</strong> waarschuwt dat misdaad kan verschuiven (geografisch, temporeel, doel,
          tactisch, misdaadtype, dader); <strong>diffusion of benefits</strong> is de positieve tegenhanger.</li>
          <li>Met de vijf <strong>SCP-strategieën</strong> (inspanning, risico, opbrengst, provocaties, excuses) en de
          <strong>interventiematrix</strong> (fase × strategie, mét eigenaar) kies je gericht waar je ingrijpt.</li>
        </ul>
      `,
      lab: {
        type: 'crimescript',
        scenario: 'RaaS-affiliate-aanval — een affiliate huurt ransomware van een kerngroep, koopt initiële toegang, versleutelt en steelt data (dubbele afpersing) en eist losgeld in crypto.',
        phases: ['1 · Voorbereiding', '2 · Binnenkomen', '3 · Uitvoeren', '4 · Buit veiligstellen', '5 · Vertrek & sporen wissen', '6 · Cash-out & witwassen'],
        fields: ['Handeling', 'Actoren', 'Middelen', 'Locatie', 'Randvoorwaarden', 'Sporen'],
        interventions: true,
        model: `
          <p><em>Voorbeelduitwerking. Beweringen gelabeld als (bekend) / (afgeleid) / (aanname).</em></p>
          <table>
            <thead><tr><th>Fase</th><th>Scène &amp; velden</th><th>Interventie — eigenaar — strategie</th></tr></thead>
            <tbody>
              <tr><td><strong>1 · Voorbereiding</strong></td>
                <td><strong>Handeling:</strong> affiliate huurt ransomware en koopt initiële toegang bij een broker.
                <strong>Actoren:</strong> affiliate, RaaS-kerngroep, initial access broker (facilitators).
                <strong>Middelen:</strong> ransomware-builder, gekochte toegang, leksite.
                <strong>Locatie:</strong> crimineel forum / marktplaats.
                <strong>Randvoorwaarden:</strong> toegang is nog geldig (aanname).
                <strong>Sporen:</strong> advertenties/verkoopberichten op fora (bekend, mits waargenomen).</td>
                <td>Toegangsmarkt verstoren en gelekte toegangen vroeg detecteren. <strong>Eigenaar:</strong> politie/NCSC + threat-intelteam. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>2 · Binnenkomen</strong></td>
                <td><strong>Handeling:</strong> affiliate logt in met de gekochte toegang (bv. via RDP of VPN).
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> geldige inloggegevens.
                <strong>Locatie:</strong> remote-toegangssysteem van het slachtoffer.
                <strong>Randvoorwaarden:</strong> geen MFA actief (afgeleid uit geslaagde login).
                <strong>Sporen:</strong> loginlog, bron-IP, ongebruikelijk tijdstip (bekend).</td>
                <td>MFA en geofencing op alle externe toegang. <strong>Eigenaar:</strong> IT-beheer slachtoffer. <strong>Strategie:</strong> inspanning verhogen.</td></tr>
              <tr><td><strong>3 · Uitvoeren</strong></td>
                <td><strong>Handeling:</strong> rechten uitbreiden, lateraal bewegen, back-ups saboteren, versleutelen.
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> tooling, credential-dumping, ransomware.
                <strong>Locatie:</strong> intern netwerk.
                <strong>Randvoorwaarden:</strong> onvoldoende segmentatie (afgeleid).
                <strong>Sporen:</strong> EDR-alerts, verwijderde schaduwkopieën, procesketen (bekend).</td>
                <td>EDR met automatische isolatie + netwerksegmentatie. <strong>Eigenaar:</strong> SOC/IT-beheer. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>4 · Buit veiligstellen</strong></td>
                <td><strong>Handeling:</strong> data exfiltreren vóór het versleutelen (dubbele afpersing).
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> exfiltratietool, C2-kanaal.
                <strong>Locatie:</strong> uitgaand netwerkverkeer.
                <strong>Randvoorwaarden:</strong> grote uploads vallen niet op (aanname).
                <strong>Sporen:</strong> uitgaand volume, verbinding met onbekende host (bekend).</td>
                <td>Exfiltratie detecteren/blokkeren (DLP, uitgaande filtering) en geteste offline back-ups. <strong>Eigenaar:</strong> IT-beheer. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
              <tr><td><strong>5 · Vertrek &amp; sporen wissen</strong></td>
                <td><strong>Handeling:</strong> logs opschonen, tooling verwijderen, losgeldbrief achterlaten.
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> wiper-/opschoonscripts.
                <strong>Locatie:</strong> getroffen systemen.
                <strong>Randvoorwaarden:</strong> lokale logs zijn wisbaar (afgeleid).
                <strong>Sporen:</strong> gaten in logs, losgeldbrief, tijdstempels (bekend).</td>
                <td>Logs centraal en onveranderbaar wegschrijven (SIEM, append-only). <strong>Eigenaar:</strong> SOC/IT-beheer. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>6 · Cash-out &amp; witwassen</strong></td>
                <td><strong>Handeling:</strong> slachtoffer betaalt in crypto; buit wordt verdeeld en witgewassen.
                <strong>Actoren:</strong> affiliate, kerngroep, mixer, exchange.
                <strong>Middelen:</strong> wallet, mixer, exchange.
                <strong>Locatie:</strong> blockchain / exchange.
                <strong>Randvoorwaarden:</strong> exchange doet geen strenge controle (aanname).
                <strong>Sporen:</strong> wallet-adres, transacties op de blockchain, KYC bij uitbetaling (bekend).</td>
                <td>Wallets volgen en markeren; samenwerken met exchanges om uitbetaling te blokkeren; niet betalen. <strong>Eigenaar:</strong> politie + exchange. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
            </tbody>
          </table>
        `,
      },
      questions: [
        { q: 'Wat doet een affiliate in een RaaS-model?', options: ['Bouwt en onderhoudt de ransomware', 'Voert de daadwerkelijke aanvallen uit en deelt de buit met de kerngroep', 'Is een toezichthouder', 'Verzekert de slachtoffers'], answer: 1, explain: 'De affiliate (partner) voert de aanvallen uit; de kerngroep levert de ransomware en infrastructuur en krijgt een deel van de buit.' },
        { q: 'In hoeveel van de zes fasen kiest de RaaS-voorbeelduitwerking in het lab voor de strategie "risico verhogen"?', answer: ['3', 'drie'],
          hints: ['Open de voorbeelduitwerking en lees per fase het woord na "Strategie:".', 'De andere fasen gebruiken inspanning verhogen of opbrengst verlagen.', 'De fasen 1, 3 en 5.'],
          wrong: { '2': 'Fase 5 (logs centraal en onwisbaar wegschrijven) is ook risico verhogen: de dader kan zijn sporen niet meer wissen.' },
          explain: 'Fase 1 (toegangsmarkt verstoren), fase 3 (EDR en segmentatie) en fase 5 (onwisbare logging) verhogen het risico voor de dader.' },
        { q: 'Ik heb de RaaS-aanval in de zes fasen uitgewerkt, mijn beweringen gelabeld als bekend/afgeleid/aanname, en per fase een interventie met eigenaar en strategie bedacht.', noAnswer: true },
        { q: 'Boss: na een takedown van phishingdomeinen ziet een bank drie dingen. (a) De bende zet dezelfde pagina\'s neer bij een hoster in een ander land. (b) Een deel van de daders stapt over van e-mail op sms, met dezelfde nagemaakte pagina. (c) Bij een buurbank die niet meedeed daalt de fraude ook. Hoeveel van de drie zijn displacement, en welke letter beschrijft een nieuwe variant binnen hetzelfde script? Antwoord als cijfer plus letter, bijvoorbeeld 3a.', boss: true, answer: ['2b', '2 b', '2-b', '2, b', '2 en b'],
          hints: ['Beantwoord eerst per waarneming of de misdaad verschoven is, en zo ja, wat er veranderde.', 'Gebruik voor de letter de vier abstractieniveaus: wat is het laagste niveau, en wat verandert er dan aan de uitvoering?', 'Eén waarneming is een verbetering en telt dus niet mee. De variant is de waarneming waarin alleen het kanaal verandert.'],
          wrong: { '/^3/': 'Niet alle drie zijn een verschuiving. Bij één waarneming wordt het ergens beter zonder dat daar is ingegrepen.', '/^2 ?a$/i': 'Het aantal klopt. Maar bij (a) verandert alleen de plek waar de pagina\'s staan; de uitvoering richting het slachtoffer blijft gelijk.', '/^1/': 'Een andere hoster in een ander land is ook een verschuiving: de misdaad gaat door op een andere plek.' },
          explain: '(a) is geografische en (b) tactische verplaatsing; (c) is diffusion of benefits. Twee dus. Sms in plaats van e-mail met dezelfde pagina is een andere uitvoeringsvariant van hetzelfde script, het laagste abstractieniveau.' },
      ],
    },

    {
      title: 'Taak 8: Verdieping: waar het script vandaan komt en waar het knelt',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Crime scripting ziet er in een tabel strak uit. In de praktijk is het rommeliger, en dat heeft met de
        herkomst van de methode te maken.</p>

        <h3>De theorie erachter</h3>
        <p>Het woord "script" komt uit de cognitieve psychologie. Schank en Abelson beschreven in 1977 hoe mensen
        vaste reeksen handelingen onthouden als een draaiboek; hun bekende voorbeeld is het restaurantbezoek (binnenkomen,
        bestellen, eten, betalen). Cornish paste dat idee in 1994 toe op misdaad. Het sluit aan op het
        rationelekeuzeperspectief dat hij met Ronald Clarke uitwerkte: een dader maakt bij elke stap een afweging
        van moeite, risico en opbrengst.</p>
        <p>De zes fasen in deze room zijn een vereenvoudiging. Cornish zelf beschreef een fijnmaziger reeks scènes,
        met onder meer aparte stappen voor het betreden van de plek, het afwachten van de juiste omstandigheden en de
        toestand direct na de daad.</p>

        <h3>Hoe de preventietabel groeide</h3>
        <p>De indeling van situationele preventie is drie keer uitgebreid: 12 technieken (Clarke, 1992), 16 (Clarke en
        Homel, 1997) en 25 (Cornish en Clarke, 2003). De laatste uitbreiding voegde "provocaties verminderen" toe, na
        kritiek dat de eerdere indeling alleen naar de kosten-batenafweging keek en niet naar wat een dader aanzet.</p>

        <h3>Wat we weten over displacement</h3>
        <p>Verplaatsing is een reëel risico, maar geen natuurwet. Guerette en Bowers (2009) bekeken ruim honderd
        evaluaties van situationele maatregelen. In ongeveer een kwart van de waarnemingen zagen zij verplaatsing, en
        ongeveer even vaak een gunstige uitstraling. Waar verplaatsing optrad, was die doorgaans kleiner dan de winst
        van de maatregel. Die cijfers komen grotendeels uit fysieke criminaliteit. Online is uitwijken goedkoper, dus
        reken daar eerder op meer verplaatsing dan op minder.</p>

        <h3>Hoe het in de praktijk gaat</h3>
        <ul>
          <li><strong>Je bronnen zijn scheef.</strong> Scripts worden gebouwd uit dossiers, verhoren, vonnissen en
          forumberichten. Daarin zitten vooral daders die gepakt zijn of die opscheppen.</li>
          <li><strong>Een script is een hypothese.</strong> Het veroudert zodra daders zich aanpassen. Zet er een
          datum op en herzie het.</li>
          <li><strong>Misdaad vertakt.</strong> Daders slaan fasen over, doen ze tegelijk of besteden ze uit. Teken
          vertakkingen in plaats van alles in één rechte lijn te persen.</li>
        </ul>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Eén dossier uitwerken en dat "het script" van een heel fenomeen noemen.</li>
          <li>Het sporenveld leeg laten, waardoor het script niets oplevert voor de opsporing.</li>
          <li>Per fase een maatregel bedenken zonder te vragen wie hem kan en mag uitvoeren.</li>
          <li>Na de interventie niet meten, zodat verplaatsing en uitstraling allebei onzichtbaar blijven.</li>
        </ul>
      `,
      questions: [
        { q: 'De huidige indeling telt 25 technieken, gelijk verdeeld over de strategieën uit taak 5. Hoeveel technieken zijn dat per strategie?', answer: ['5', 'vijf'],
          hints: ['Hoeveel strategieën kent situationele preventie sinds 2003?', 'Deel het aantal technieken door het aantal strategieën.', '25 gedeeld door 5.'],
          explain: 'Vijf strategieën met elk vijf technieken.' },
        { q: 'Je werkt één strafdossier over helpdeskfraude uit en presenteert dat als hét script van helpdeskfraude. Op welk van de vier abstractieniveaus uit taak 3 zit je beschrijving in werkelijkheid?', answer: ['track', 'een track', 'tracks'],
          hints: ['Eén dossier beschrijft één manier waarop het die keer ging.', 'Kijk in taak 3 naar het meest concrete niveau.', 'Het niveau van de specifieke uitvoeringsvariant.'],
          wrong: { 'script': 'Een script beschrijft de uitvoeringswijze over meerdere zaken heen. Eén dossier is daarvoor te smal.', 'protoscript': 'Een protoscript is juist algemener: het type misdaad los van de uitvoering.' },
          explain: 'Eén dossier is één uitvoeringsvariant. Pas als je meerdere zaken naast elkaar legt, zie je wat vast is en wat varieert.' },
        { q: 'Na een maatregel daalt het aantal incidenten bij jouw organisatie met dertig procent. Wat moet je nog weten voordat je de maatregel een succes noemt?', options: ['Of het aantal incidenten elders, op andere tijden of met andere methoden is gestegen', 'Of de daders zijn aangehouden', 'Of de maatregel in alle zes de fasen ingrijpt', 'Of de daling het jaar daarvoor ook al was ingezet bij dezelfde daders'], answer: 0,
          wrong: { 1: 'Situationele preventie werkt via de situatie. Aanhoudingen zijn geen voorwaarde voor effect.', 2: 'Een maatregel hoeft maar in één fase te werken. De matrix hoeft niet vol.', 3: 'Een trend controleren is zinnig, maar je kent de daders meestal niet. De eerste controle is of het probleem is verschoven.' },
          explain: 'Zonder meting van de omgeving weet je niet of de misdaad is verdwenen of verplaatst, en zie je ook een gunstige uitstraling niet.' },
      ],
    },

    {
      title: 'Taak 9: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examenvragen over crime scripting geven je een korte casus en vragen om een indeling: welke fase, welke
        strategie, welke soort verplaatsing, welk interventiepunt. De afleiders zijn bijna altijd echte begrippen uit
        dezelfde theorie. Vraag je daarom steeds af wat er precies verandert: de plek, het tijdstip, het doelwit, de
        methode of het type misdaad. En bij maatregelen: wat verandert er voor de dader?</p>
        <p>De vier vragen hieronder zijn zelf geschreven in die stijl. Alle organisaties zijn fictief.</p>
      `,
      questions: [
        { q: 'Een bank verplicht een app met MFA voor het inloggen. Binnen twee maanden bellen fraudeurs klanten op en praten hen ertoe om zelf geld over te maken naar een "veilige rekening". Welke soort displacement is dit?',
          options: ['Doelverplaatsing', 'Tactische verplaatsing', 'Misdaadverplaatsing', 'Diffusion of benefits'], answer: 1,
          wrong: { 0: 'Het doelwit is hetzelfde gebleven: klanten van dezelfde bank.', 2: 'Het blijft bankfraude. Alleen de manier waarop is veranderd.', 3: 'Dat is een gunstig neveneffect elders. Hier gaat de fraude door.' },
          explain: 'Zelfde misdaad, zelfde doelwit, andere methode: tactische verplaatsing.' },
        { q: 'Een webwinkel slaat geen kaartnummers meer op. De betaalprovider geeft een token terug dat alleen bij deze winkel bruikbaar is. Welke strategie van situationele preventie is dit vooral?',
          options: ['Inspanning verhogen', 'Risico verhogen', 'Opbrengst verlagen', 'Excuses wegnemen'], answer: 2,
          wrong: { 0: 'Inbreken in de database wordt er niet moeilijker door. Wat er te halen valt, is minder waard.', 1: 'De pakkans verandert niet.', 3: 'Dit richt zich niet op rechtvaardigingen van de dader.' },
          explain: 'Een gestolen token is buiten deze winkel waardeloos. De buit verliest zijn waarde: opbrengst verlagen.' },
        { q: 'Een analist levert een script van drie regels in: "dader bereidt voor, dader slaat toe, dader vertrekt". De teamleider kan er geen interventie uit halen. Wat is de beste verbetering?',
          options: ['Het script uitwerken per scène, met actoren, middelen, randvoorwaarden en sporen', 'Het script uitbreiden van drie naar zes fasen', 'Elke regel labelen als bekend, afgeleid of aanname', 'Het script een niveau abstracter maken, zodat het op meer zaken past'], answer: 0,
          wrong: { 1: 'Zes even lege regels helpen niet. Het probleem is het ontbreken van inhoud per stap.', 2: 'Labelen is nuttig, maar er staat nog niets om te labelen.', 3: 'Het script is al te abstract. Nog algemener maakt het nog minder bruikbaar.' },
          explain: 'Een interventie grijpt aan op een middel, een randvoorwaarde of een spoor. Die velden moeten dus eerst gevuld zijn.' },
        { q: 'In dertig phishingzaken blijken de daders dezelfde phishingkit te gebruiken, gekocht bij één verkoper op een forum. Je mag één interventie voorstellen. Welke heeft de grootste hefboom?',
          options: ['Elk phishingdomein afzonderlijk laten neerhalen zodra het opduikt', 'De verkoop van de kit verstoren, omdat dit deelproces in alle dertig zaken terugkomt', 'Eén geldezel aanhouden die in meerdere zaken voorkomt', 'Een bewustwordingscampagne voor alle bankklanten'], answer: 1,
          wrong: { 0: 'Nuttig, maar de daders registreren een nieuw domein. Dit lokt geografische verplaatsing uit en moet eindeloos herhaald worden.', 2: 'Een geldezel is snel vervangen: daderverplaatsing.', 3: 'Dit raakt slachtoffers, niet het script van de dader, en het effect is moeilijk te sturen.' },
          explain: 'Het kopen van de kit is een gedeeld subscript. Verstoor je dat, dan raak je alle zaken die ervan afhangen in één keer.' },
      ],
    },
  ],
  terms: [
    { term: 'Crime script', def: 'Draaiboek van een misdaad: een stapsgewijze (scène-voor-scène) ontleding van het misdaadproces, volgens Cornish (1994).' },
    { term: 'Scène', def: 'Eén stap in een crime script, beschreven op zes velden: handeling, actoren, middelen, locatie, randvoorwaarden en sporen.' },
    { term: 'Universeel script', def: 'Vast sjabloon van fasen dat vrijwel elke misdaad volgt; hier in zes fasen van voorbereiding tot cash-out.' },
    { term: 'Cash-out', def: 'De laatste fase: de buit omzetten in besteedbaar, witgewassen geld; vaak de zwakste schakel in de keten.' },
    { term: 'Metascript', def: 'Het meest abstracte niveau onder het universele script: een hele familie van misdaadvormen met dezelfde grove logica.' },
    { term: 'Protoscript', def: 'Een generiek script voor één type misdaad, los van de precieze uitvoering.' },
    { term: 'Track', def: 'Een specifieke uitvoeringsvariant binnen hetzelfde script (bijvoorbeeld smishing versus e-mailphishing).' },
    { term: 'Subscript', def: 'Een scène die als een compleet eigen script wordt uitgewerkt; vaak hergebruikt over meerdere zaken.' },
    { term: 'Displacement', def: 'Verplaatsing: een misdaad verschuift na een interventie (geografisch, temporeel, doel, tactisch, misdaadtype of dader).' },
    { term: 'Situationele criminaliteitspreventie (SCP)', def: 'Aanpak die de situatie onaantrekkelijk maakt voor de misdaad; vijf strategieën van Cornish & Clarke met 25 technieken.' },
    { term: 'Interventiematrix', def: 'Tabel fase (universeel script) × strategie (SCP) met per cel een concrete maatregel en een eigenaar.' },
    { term: 'RaaS / affiliate', def: 'Ransomware-as-a-Service: kerngroep levert de ransomware, affiliates voeren de aanvallen uit en delen de buit.' },
  ],
  resources: [
    { title: 'ASU Center for Problem-Oriented Policing (POP Center) — crime scripts en situationele preventie', url: 'https://popcenter.asu.edu/' },
    { title: 'College of Policing (VK) — Crime Reduction Toolkit', url: 'https://www.college.police.uk/' },
    { title: 'Dehghanniri & Borrion — Crime scripting: a systematic review (European Journal of Criminology, 2021)', url: 'https://doi.org/10.1177/1477370819850943' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
});
