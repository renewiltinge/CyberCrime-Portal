/* Room: Threat intelligence-modellen (Cyber Kill Chain, MITRE ATT&CK, Diamond Model, Pyramid of Pain) */

CS.registerRoom({
  id: 'ti-modellen',
  path: 'intelligence',
  order: 4,
  title: 'Threat intelligence-modellen',
  icon: '🔗',
  difficulty: 'Gemiddeld',
  minutes: 70,
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
        { q: 'In welke bestaande room staat het handwerk rond IOC\'s, defangen en TLP uitgebreid uitgelegd?', answer: ['Threat intelligence & MITRE ATT&CK', 'threat intelligence en mitre att&ck', 'Threat intelligence en MITRE ATT&CK', 'threat-intel-attack'], hint: 'Een defensieve room met het kompas-icoon.', explain: 'Deze room bouwt daarop voort met de modellen zelf, zonder dat werk te herhalen.' },
      ],
    },

    {
      title: 'Taak 2 — De Cyber Kill Chain',
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

        <div class="callout tip">
          <strong>Goed bezig:</strong> je kent nu de zeven schakels. Beloning: <code>JVT{zeven_schakels_een_keten}</code>.
        </div>
      `,
      questions: [
        { q: 'Hoeveel fasen (schakels) telt de Cyber Kill Chain?', answer: ['7', 'zeven'], hint: 'Van verkenning tot acties op het doel.', explain: 'Zeven: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control, Actions on Objectives.' },
        { q: 'In welke fase maakt de aanvaller zijn wapen klaar, bijvoorbeeld een kwaadaardig document met een exploit?', options: ['Reconnaissance', 'Weaponization', 'Delivery', 'Installation'], answer: 1, explain: 'Weaponization (bewapening) gebeurt bij de aanvaller zelf; als verdediger zie je er nog niets van.' },
        { q: 'Hoe heet de laatste fase, waarin de aanvaller zijn eigenlijke doel bereikt (zoals data stelen of versleutelen)?', answer: ['Actions on Objectives', 'actions on objectives', 'acties op het doel', 'acties op doel'], hint: 'De zevende schakel; in het Engels drie woorden.', explain: 'Actions on Objectives is de fase waarin de aanval zijn doel bereikt. De Kill Chain vat dit samen in één fase.' },
        { q: 'Wat is de vlag die als beloning in deze taak staat?', answer: ['JVT{zeven_schakels_een_keten}'], hint: 'Kijk in de groene tip onderaan de taak.' },
      ],
    },

    {
      title: 'Taak 3 — MITRE ATT&CK: tactieken, technieken en procedures',
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
          <li>Een <strong>procedure</strong> is de <em>precieze uitvoering</em> door een bepaalde groep: welk tool, welke
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
        <p>Hieronder zie je waarnemingen uit een (fictieve) inbraak bij een bedrijf. Koppel elke waarneming aan de juiste
        ATT&amp;CK-techniek. Kies de <em>techniek</em>, niet alleen de tactiek. Het lab toont bij controle de naam en de
        tactiek. Tip voor de laatste twee: data inpakken in een beveiligd archief is "Archive Collected Data", en
        bestanden versleutelen met een losgeldeis is "Data Encrypted for Impact".</p>

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
          { desc: 'Vanuit het Word-document start een verborgen powershell.exe met een gecodeerd (-enc) commando.', code: 'T1059.001', explain: 'PowerShell als uitvoerder van kwaadaardige code valt onder Command and Scripting Interpreter, tactiek Execution.' },
          { desc: 'De loader leest het geheugen van het proces lsass.exe uit om wachtwoorden en hashes te bemachtigen.', code: 'T1003.001', explain: 'LSASS Memory is een sub-techniek van OS Credential Dumping, tactiek Credential Access.' },
          { desc: 'Met een gestolen, geldig beheerdersaccount logt de aanvaller via RDP in op een fileserver.', code: 'T1021.001', explain: 'Inloggen via Remote Desktop Protocol is een sub-techniek van Remote Services, tactiek Lateral Movement.' },
          { desc: 'De aanvaller stopt de buitgemaakte bestanden in een met wachtwoord beveiligd 7z-archief voordat ze naar buiten gaan.', code: 'T1560', explain: 'Data inpakken voor exfiltratie is Archive Collected Data, tactiek Collection.' },
          { desc: 'Tot slot worden alle bestanden op de fileshares versleuteld en verschijnt er een losgeldbrief.', code: 'T1486', explain: 'Bestanden onbruikbaar maken voor losgeld is Data Encrypted for Impact, tactiek Impact.' },
        ],
      },
      questions: [
        { q: 'Welk techniek-ID hoort bij Phishing?', answer: ['T1566'], hint: 'Vier cijfers, geen punt.', explain: 'T1566 Phishing; de gerichte variant met bijlage is T1566.001.' },
        { q: 'Wat betekent de .001 in een ID als T1059.001?', options: ['Een sub-techniek: een specifiekere variant, hier PowerShell', 'De versie van ATT&CK', 'Het aantal slachtoffers', 'De naam van de aanvalsgroep'], answer: 0, explain: 'Na de punt staat de sub-techniek. T1059.001 is PowerShell binnen Command and Scripting Interpreter.' },
        { q: 'Waarvoor gebruik je de ATT&CK Navigator?', options: ['Technieken in de matrix inkleuren als heatmap, bijvoorbeeld je detectiedekking of blinde vlekken', 'Malware schrijven', 'Wachtwoorden kraken', 'Netwerkverkeer opnemen'], answer: 0, explain: 'De Navigator maakt een heatmap over de matrix: waar sta je sterk, waar zitten gaten?' },
        { q: 'Welke techniek hoort bij het uitlezen van het LSASS-geheugen (zie het lab en de tabel)?', answer: ['T1003.001'], hint: 'OS Credential Dumping, sub-techniek LSASS Memory.', explain: 'T1003.001 LSASS Memory valt onder de tactiek Credential Access.' },
      ],
    },

    {
      title: 'Taak 4 — Het Diamond Model',
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
          waarneming naar de volgende. Beloning: <code>JVT{pivot_langs_de_randen}</code>.
        </div>
      `,
      questions: [
        { q: 'Hoeveel hoekpunten heeft het Diamond Model?', answer: ['4', 'vier'], hint: 'Het is een ruit.', explain: 'Vier: Adversary, Capability, Infrastructure en Victim.' },
        { q: 'Welke vier hoekpunten zijn het?', options: ['Adversary, Capability, Infrastructure, Victim', 'Reconnaissance, Delivery, Exploitation, Impact', 'Hashes, IP-adressen, Domeinen, TTP\'s', 'Tactiek, Techniek, Procedure, Tool'], answer: 0, explain: 'In elke gebeurtenis gebruikt een tegenstander een vermogen via infrastructuur tegen een slachtoffer.' },
        { q: 'Je ontdekt dat twee aparte incidenten hetzelfde C2-domein gebruiken. Wat doe je volgens het Diamond Model?', options: ['Pivoten langs de rand: via de gedeelde infrastructuur verbind je de zaken en kom je bij nieuwe slachtoffers of capabilities', 'De incidenten negeren omdat domeinen makkelijk te wisselen zijn', 'Alleen het domein blokkeren en stoppen', 'De twee zaken apart houden, want ze mogen nooit verbonden worden'], answer: 0, explain: 'Een gedeeld hoekpunt (hier Infrastructure) is een brug: je pivoteert langs de randen en bouwt een activity group.' },
        { q: 'Welke vlag hoort bij deze taak over pivoten?', answer: ['JVT{pivot_langs_de_randen}'], hint: 'Kijk in de tip onderaan.' },
      ],
    },

    {
      title: 'Taak 5 — De Pyramid of Pain: prioriteit geven',
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
      questions: [
        { q: 'Welk niveau onderaan de Pyramid of Pain kan een aanvaller het makkelijkst veranderen?', options: ['Hashwaarden', 'Tools', 'TTP\'s', 'Netwerkartefacten'], answer: 0, explain: 'Eén bit wijzigen geeft al een nieuwe hash: voor de aanvaller bijna gratis.' },
        { q: 'Welk niveau verander je het moeilijkst, en kost de aanvaller dus de meeste pijn?', answer: ['TTP\'s', 'TTPs', 'ttp\'s', 'ttps', 'TTP', 'de TTP\'s'], hint: 'Het staat bovenaan de piramide; het is zijn hele werkwijze.', explain: 'Een nieuw IP of bestand is zo geregeld; een nieuwe werkwijze bedenken en oefenen niet.' },
        { q: 'Waarom combineer je de onderkant en de bovenkant van de piramide?', options: ['Onderaan is snel maar kort houdbaar; bovenaan is duur maar duurzaam — samen dek je beide af', 'Omdat je verplicht bent alles te blokkeren', 'Omdat hashes nooit verlopen', 'Omdat gedragsdetectie altijd goedkoper is dan een blocklist'], answer: 0, explain: 'Snelle IOC-blokkades vangen de luie aanvaller; gedragsdetectie op TTP\'s houdt stand als hij zijn infrastructuur wisselt.' },
      ],
    },

    {
      title: 'Taak 6 — De modellen naast elkaar',
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
      questions: [
        { q: 'Welk model is het meest gedetailleerd over wat er NÁ het binnenkomen gebeurt?', options: ['MITRE ATT&CK', 'Cyber Kill Chain', 'Pyramid of Pain', 'Geen van alle'], answer: 0, explain: 'De Kill Chain vat alles na de inbraak samen in één fase; ATT&CK beschrijft juist dat deel heel gedetailleerd.' },
        { q: 'Welk model is het sterkst in het verbinden van losse incidenten tot één campagne?', options: ['Het Diamond Model', 'De Cyber Kill Chain', 'De Pyramid of Pain', 'CVSS'], answer: 0, explain: 'Door te pivoten langs gedeelde hoekpunten bundel je diamanten tot een activity group.' },
        { q: 'Welk model gebruik je vooral om te beslissen waar je detectie-investering het meeste oplevert?', options: ['De Pyramid of Pain', 'Het Diamond Model', 'De Cyber Kill Chain', 'MITRE ATT&CK'], answer: 0, explain: 'De Pyramid of Pain rangschikt indicatoren naar impact, en helpt zo prioriteren.' },
      ],
    },

    {
      title: 'Taak 7 — Slotopdracht: één gebeurtenis in alle modellen',
      content: `
        <p>Tijd om alles samen te brengen. Je krijgt één concrete, fictieve gebeurtenis en plaatst die door elke bril
        tegelijk: welke Kill Chain-fase, welke ATT&amp;CK-techniek, welk Diamond-hoekpunt en welk Pyramid-niveau? Zo voel
        je dat elk model een ander stukje van dezelfde gebeurtenis beschrijft.</p>

        <h3>De gebeurtenis</h3>
        <div class="callout info">
          <strong>Waarneming (bekend):</strong> De aanvaller stuurt een nepfactuur met een kwaadaardige ZIP-bijlage
          (MD5 <code>3abad12a9579508025468c528c47a68c</code>) naar een medewerker. De mail komt binnen vanaf het account
          <code>facturen[at]boos[.]jvt[.]lab</code> en wordt in de inbox afgeleverd.
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
        kunt bekijken: <code>JVT{een_gebeurtenis_vier_lenzen}</code>.</p>

        <div class="callout tip">
          <strong>Wat je meeneemt:</strong> de Kill Chain geeft de fase, ATT&amp;CK het precieze gedrag, het Diamond
          Model de samenhang en de Pyramid of Pain de prioriteit. Samen zijn ze veel sterker dan elk afzonderlijk.
        </div>
      `,
      questions: [
        { q: 'In welke fase van de Cyber Kill Chain hoort "de kwaadaardige bijlage wordt in de inbox afgeleverd"?', options: ['Reconnaissance', 'Weaponization', 'Delivery', 'Exploitation'], answer: 2, explain: 'De bezorging van het wapen aan het slachtoffer is de Delivery-fase. Pas als de medewerker de bijlage opent, begint Exploitation.' },
        { q: 'Welke ATT&CK-techniek-ID hoort bij deze gerichte phishingmail met bijlage?', answer: ['T1566.001', 'T1566'], hint: 'Spearphishing Attachment (of de overkoepelende techniek Phishing).', explain: 'T1566.001 Spearphishing Attachment; de overkoepelende techniek is T1566 Phishing. Beide goed.' },
        { q: 'In welk hoekpunt van het Diamond Model plaats je de kwaadaardige bijlage zelf (het middel waarmee de aanvaller zijn doel bereikt)?', options: ['Adversary', 'Capability', 'Infrastructure', 'Victim'], answer: 1, explain: 'De malware/bijlage is de Capability (het vermogen). Het mailaccount waarmee hij verstuurt, is Infrastructure.' },
        { q: 'In de Pyramid of Pain: op welk niveau staat de MD5-hash van de bijlage?', answer: ['Hashwaarden', 'hashwaarden', 'hashes', 'hash', 'hashwaarde'], hint: 'Het allerlaagste niveau, het makkelijkst voor de aanvaller om te wisselen.', explain: 'Een bestandshash staat onderaan: snel te blokkeren, maar de aanvaller verandert hem zo. De vlag JVT{een_gebeurtenis_vier_lenzen} staat in de taaktekst.' },
      ],
    },
  ],
  terms: [
    { term: 'Cyber Kill Chain', def: 'Zevenstappenmodel van Lockheed Martin (2011) dat een aanval beschrijft van verkenning tot het bereiken van het doel; verbreek je één schakel, dan mislukt de aanval.' },
    { term: 'Weaponization', def: 'De tweede Kill Chain-fase: de aanvaller maakt zijn wapen klaar, bijvoorbeeld een kwaadaardig document met een exploit, nog bij zichzelf.' },
    { term: 'MITRE ATT&CK', def: 'Openbare kennisbank van aanvalsgedrag, geordend in tactieken (waarom) en technieken (hoe) met vaste ID\'s zoals T1566.' },
    { term: 'Tactiek (ATT&CK)', def: 'Het doel van de aanvaller in een stap, bijvoorbeeld Credential Access. ATT&CK Enterprise kent er 14.' },
    { term: 'Techniek en sub-techniek', def: 'De manier waarop een aanvaller een tactiek bereikt, met een ID als T1059; een sub-techniek krijgt er een punt bij, zoals T1059.001 (PowerShell).' },
    { term: 'Procedure', def: 'De precieze, concrete uitvoering van een techniek door een bepaalde groep: welk tool, welke commando\'s en opties.' },
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
