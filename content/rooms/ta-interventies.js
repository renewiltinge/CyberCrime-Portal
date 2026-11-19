/* Room: Interventiekansen en de integrale aanpak — leerpad Tactisch analist cybercrime */

CS.registerRoom({
  id: 'ta-interventies',
  path: 'tactisch-analist',
  order: 6,
  title: 'Interventiekansen en de integrale aanpak',
  icon: '🧰',
  difficulty: 'Moeilijk',
  minutes: 75,
  level: 'Gevorderd',
  checked: '2026-11-19',
  summary: 'Van analyse naar ingrijpen: het hele interventiepalet tegen ransomware, DDoS, malware en bulletproof hosting, de publiek-private en internationale partners met hun eigen knoppen, interventiekansen afleiden uit een crime script, de afweging vóór je ingrijpt, en een advies dat gevraagd én ongevraagd landt.',
  objectives: [
    'Het interventiepalet benoemen: daders vervolgen, infrastructuur verstoren, daders en afnemers afschrikken of ombuigen, en slachtoffers beschermen',
    'Per interventie de partner aanwijzen die de knop in handen heeft, publiek-privaat en internationaal',
    'Uit een crime script de barrières per fase afleiden, met een eigenaar per maatregel, en knelpunten herkennen',
    'Een interventie afwegen op effect, displacement, proportionaliteit, het risico op tipping-off, juridische grondslag en internationale afstemming',
    'Een korte adviesnotitie schrijven, gevraagd of ongevraagd, met opties, aanbeveling, eigenaar en risico\'s',
  ],
  tasks: [
    {
      title: 'Taak 1 — Het interventiepalet: meer dan aanhouden',
      tryFirst: true,
      intro: '<p>In het lab staan zestien acties uit fictieve cybercrimezaken. Ze horen bij vier lanen van het interventiepalet. Vraag je bij elke actie af <em>op wie</em> ze zich richt: op de dader voor de rechter, op de infrastructuur, op (potentiële) daders en klanten, of op slachtoffers.</p>',
      content: `
        <p>In de vacature voor tactisch analist bij een Team Cybercrime staat het zonder omwegen: je
        <strong>signaleert interventiekansen en adviseert over een integrale aanpak</strong>. Het team doet niet alleen
        opsporingsonderzoek, maar ook "aan de voorkant, veelal samen met publiek-private partners, verstoren of stoppen
        van criminele processen of het nemen van preventieve maatregelen". En dat op een
        <em>offensieve en creatieve</em> manier.</p>

        <p>In de room <em>Cybercrime als ecosysteem</em> zag je de vier interventietypen: strafrechtelijk, verstoren,
        preventief en alternatief. Hier bekijken we hetzelfde palet door de bril van een tactisch analist. De vraag is
        niet alleen "welk type?", maar vooral: <strong>op wie richt de actie zich, en wie drukt op de knop?</strong></p>

        <h3>Vier lanen</h3>
        <table>
          <thead><tr><th>Laan</th><th>Richt zich op</th><th>Voorbeelden</th></tr></thead>
          <tbody>
            <tr><td><strong>Daders vervolgen</strong></td><td>De verdachte, voor de rechter</td><td>Aanhouden, doorzoeken, beslag op servers, domeinen en cryptovaluta, rechtshulpverzoeken</td></tr>
            <tr><td><strong>Infrastructuur verstoren</strong></td><td>Servers, domeinen, panelen, fora</td><td>Takedown, sinkholing (een domein omleiden naar een server die de opsporing beheert), notice-and-takedown via hosters en registrars, een leksite overnemen</td></tr>
            <tr><td><strong>Daders en afnemers afschrikken of ombuigen</strong></td><td>Wie meedoet of wil gaan meedoen</td><td>Klanten van een DDoS-huurdienst waarschuwen, een waarschuwingsgesprek, een re-integratietraject zoals Hack_Right voor jonge first offenders</td></tr>
            <tr><td><strong>Slachtoffers beschermen en herstellen</strong></td><td>(Potentiële) slachtoffers</td><td>Organisaties waarschuwen voordat er versleuteld wordt, decryptietools via No More Ransom, doorverwijzen naar hulp</td></tr>
          </tbody>
        </table>

        <h3>Waarom "integraal"?</h3>
        <p>Een cybercrimezaak heeft bijna altijd een internationale kant: de dader zit elders, de server in een derde land,
        de slachtoffers overal. Aanhouden lukt dan soms pas na jaren, of nooit. Wie alleen op die ene knop let, laat
        intussen elke week nieuwe slachtoffers vallen. Een <strong>integrale aanpak</strong> combineert lanen: je
        verzamelt bewijs voor vervolging, haalt ondertussen infrastructuur weg, waarschuwt slachtoffers en ontmoedigt
        nieuwe klanten. Zo raak je de keten op meerdere plekken tegelijk.</p>

        <h3>Twee publieke voorbeelden</h3>
        <ul>
          <li><strong>Operation Cronos</strong> (februari 2024). Opsporingsdiensten uit meerdere landen namen de
          infrastructuur van de ransomwaregroep LockBit over en zetten op de eigen leksite van de groep berichten van de
          politie. Dat combineerde verstoren met vervolgen, en het ondermijnde het vertrouwen van affiliates in het
          platform.</li>
          <li><strong>Operation Endgame</strong> (mei 2024). Een internationale actie, met coördinatie via Europol en
          Eurojust, tegen de infrastructuur van een reeks <em>droppers</em> en <em>loaders</em>: de malware die andere
          malware binnenbrengt. Eén gedeelde schakel raken treft veel daders tegelijk.</li>
        </ul>

        <div class="callout tip">
          <strong>Offensief en creatief:</strong> het palet is geen menukaart waaruit je één gerecht kiest. De sterkste
          adviezen combineren twee of drie lanen en zeggen ook in welke <em>volgorde</em> ze moeten gebeuren.
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'vier lanen',
        prompt: 'Zestien acties, vier lanen. Op wie richt elke actie zich?',
        flag: 'NM{het_hele_palet_benutten}',
        groups: [
          { name: 'Daders vervolgen', items: ['Een verdachte aanhouden bij een doorzoeking', 'Servers in een datacenter in beslag nemen als bewijs', 'Cryptovaluta van een verdachte in beslag nemen', 'Een rechtshulpverzoek sturen voor gegevens van een buitenlandse hoster'] },
          { name: 'Infrastructuur verstoren', items: ['Een C2-domein laten sinkholen', 'Een hoster vragen een phishingserver offline te halen', 'Een registrar een frauduleus domein laten opschorten', 'De leksite van een ransomwaregroep overnemen'] },
          { name: 'Daders en afnemers afschrikken of ombuigen', items: ['Klanten van een DDoS-huurdienst een waarschuwingsmail sturen', 'Een jonge first offender een Hack_Right-traject aanbieden', 'Een jongere die net een booter gebruikte aanspreken in een waarschuwingsgesprek', 'Op een forum laten zien dat de politie heeft meegelezen'] },
          { name: 'Slachtoffers beschermen en herstellen', items: ['Een decryptietool publiceren via No More Ransom', 'Een bedrijf waarschuwen dat de aanvaller al binnen is', 'Gestolen inloggegevens laten resetten via de getroffen dienst', 'Slachtoffers doorverwijzen naar hulp bij herstel'] },
        ],
      },
      questions: [
        { q: 'Groepeer de zestien acties in het lab. Welke vlag verschijnt?', answer: ['NM{het_hele_palet_benutten}'],
          hints: ['Begin met de acties waarbij een rechter of bewijs om de hoek komt kijken.', 'Twijfel je tussen verstoren en afschrikken: raakt de actie een server of domein, of het gedrag en het vertrouwen van mensen?', 'Een forum laten zien dat de politie meelas, richt zich op het vertrouwen van daders. Dat is afschrikken.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag uit dit lab. Hij verschijnt zodra alle vier de groepen kloppen.' },
          explain: 'Vervolgen richt zich op de verdachte, verstoren op de infrastructuur, afschrikken en ombuigen op (potentiële) daders en afnemers, en beschermen op slachtoffers.' },
        { q: 'Wat betekent sinkholing?', options: ['Een kwaadaardig domein omleiden naar een server die de opsporing of een onderzoeker beheert', 'Een server fysiek in beslag nemen', 'Een verdachte laten afluisteren', 'Een domein voorgoed laten verwijderen uit de DNS'], answer: 0,
          wrong: { 1: 'Bij sinkholing blijft de server van de dader staan; alleen het domein wijst ergens anders naartoe.', 3: 'Bij sinkholing blijft het domein bestaan. Het verkeer gaat alleen naar een andere plek, waar je ook kunt zien welke besmette machines zich melden.' },
          why: 'Een sinkhole stopt het verkeer naar de dader én levert een lijst besmette machines op. Zo wordt een verstorende actie meteen een kans om slachtoffers te waarschuwen.',
          explain: 'Bij sinkholing wijst het domein naar een server van de verdediger. Besmette machines melden zich daar in plaats van bij de dader.' },
        { q: 'Een DDoS-huurdienst is offline gehaald en de klantenlijst is in beslag genomen. Welke laan zet je daarna het meest logisch in richting de honderden klanten?', options: ['Daders en afnemers afschrikken of ombuigen', 'Slachtoffers beschermen en herstellen', 'Infrastructuur verstoren', 'Geen: de dienst is al weg'], answer: 0,
          wrong: { 1: 'De klanten zijn hier geen slachtoffers, maar afnemers van een strafbare dienst.', 2: 'De infrastructuur is al weg. De vraag is wat je met de mensen doet.', 3: 'Een klant die niet merkt dat hij in beeld is, stapt vaak over naar de volgende dienst.' },
          explain: 'Klanten waarschuwen (en jonge first offenders een traject aanbieden) moet voorkomen dat zij naar een andere dienst overstappen.' },
      ],
    },

    {
      title: 'Taak 2 — Publiek-private en internationale partners: wie heeft welke knop?',
      tryFirst: true,
      intro: '<p>In het lab staan acht partners (P1 tot en met P8) met wat ze kunnen. De private partijen en de CERT zijn fictief. Lees ze en bepaal bij de vragen welke partner je nodig hebt.</p>',
      content: `
        <p>De politie heeft zelf maar een deel van de knoppen. De servers staan bij hosters, de domeinen bij registrars,
        het geld bij banken en exchanges, de kennis over malware vaak bij securitybedrijven. Een tactisch analist die
        interventiekansen signaleert, moet daarom ook weten <strong>bij wie</strong> de interventie kan worden belegd.
        Het woord dat je in de vacature leest, is niet voor niets "publiek-private partners".</p>

        <h3>Publiek en privaat</h3>
        <ul>
          <li><strong>Hostingproviders</strong> kunnen een server offline halen. In Nederland bestaat al sinds 2008 een
          gedragscode voor <em>notice-and-takedown</em>: na een melding over onrechtmatige inhoud handelt de tussenpersoon
          die melding af. Een bulletproof hoster negeert zulke meldingen juist, en dan heb je andere wegen nodig.</li>
          <li><strong>Registries en registrars</strong> beheren domeinnamen. Zij kunnen een frauduleus domein opschorten
          of laten omleiden. Voor .nl is SIDN de registry.</li>
          <li><strong>Banken en exchanges</strong> zien de geldstroom. Ze kunnen rekeningen van geldezels signaleren en
          melden ongebruikelijke transacties bij FIU-Nederland.</li>
          <li><strong>Het NCSC en sectorale CERTs</strong> kunnen organisaties in hun achterban waarschuwen en
          handelingsperspectief geven. Voor een slachtoffer dat nog niets doorheeft, is dat vaak het snelste kanaal.</li>
          <li><strong>Securitybedrijven</strong> hebben telemetrie, malware-analyse en soms een zwakte in de versleuteling
          waarmee een decryptor kan worden gebouwd. No More Ransom ontstond in 2016 als samenwerking van de Nederlandse
          politie, Europol en twee securitybedrijven.</li>
        </ul>

        <h3>Internationaal</h3>
        <ul>
          <li><strong>Europol EC3</strong>, het Europese cybercrimecentrum, ondersteunt onderzoeken en coördineert
          internationale actiedagen. Daar zit ook de <strong>J-CAT</strong> (Joint Cybercrime Action Taskforce), waarin
          verbindingsofficieren van verschillende landen zaken samen oppakken.</li>
          <li><strong>Eurojust</strong> ondersteunt de justitiële samenwerking: rechtshulpverzoeken, afstemming tussen
          officieren van justitie en gezamenlijke onderzoeksteams (<em>Joint Investigation Teams</em>, JIT's).</li>
        </ul>

        <div class="callout warn">
          <strong>Let op:</strong> een partner benaderen is zelf ook een interventie. Wat je deelt en wanneer, beslis je
          niet alleen. Afspraken over delen (wat mag naar buiten, met welke grondslag) komen terug in de room
          <em>Coachen, coördineren en het intelligence-netwerk</em>.
        </div>

        <p>Voorbeeld: een phishingkit draait op 203.0.113.44 bij een Nederlandse hoster, het domein is
        <code>mijnbank-veilig.nm.lab</code> en het geld loopt via drie rekeningen. Dan heb je drie knoppen bij drie
        partners: de hoster (server), de registrar (domein) en de banken (rekeningen). Wie ze alle drie op hetzelfde
        moment indrukt, voorkomt dat de dader de ene schakel snel vervangt terwijl de andere nog werkt.</p>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'de partnerkaart',
        scenario: 'Acht partners in het netwerk van een Team Cybercrime. De private partijen en de CERT zijn fictief; Europol, Eurojust en het NCSC bestaan echt, maar hun beschrijving hier is algemeen gehouden.',
        records: [
          { title: 'P1 · Duinrand Hosting BV', icon: '🖥️', lines: ['Nederlandse hoster met een abuse-desk.', 'Handelt meldingen af volgens notice-and-takedown.', 'Heeft klant- en betaalgegevens van huurders.'] },
          { title: 'P2 · Registrar Kortweg Domeinen', icon: '🌐', lines: ['Registreert domeinnamen voor klanten.', 'Kan een domein opschorten bij misbruik.'] },
          { title: 'P3 · NederBank', icon: '🏦', lines: ['Ziet rekeningen en transacties van eigen klanten.', 'Kan verdachte rekeningen signaleren en meldt ongebruikelijke transacties bij FIU-Nederland.'] },
          { title: 'P4 · NCSC', icon: '🛡️', lines: ['Nationaal CSIRT.', 'Kan organisaties via zijn netwerk waarschuwen en handelingsperspectief geven.'] },
          { title: 'P5 · Kestrel Labs', icon: '🔬', lines: ['Securitybedrijf met malware-analisten.', 'Vond eerder een fout in de versleuteling van een ransomwarefamilie.'] },
          { title: 'P6 · Europol EC3 en J-CAT', icon: '🇪🇺', lines: ['Ondersteunt internationale onderzoeken.', 'Coördineert gezamenlijke actiedagen van meerdere landen.'] },
          { title: 'P7 · Eurojust', icon: '⚖️', lines: ['Ondersteunt justitiële samenwerking tussen landen.', 'Helpt bij rechtshulpverzoeken en gezamenlijke onderzoeksteams (JIT).'] },
          { title: 'P8 · Zorg-CERT Midden', icon: '🏥', lines: ['Sectorale CERT voor aangesloten zorginstellingen.', 'Waarschuwt leden binnen enkele uren.'] },
        ],
      },
      questions: [
        { q: 'Een server staat bij een bulletproof hoster in een land buiten de EU die alle meldingen negeert. Je wilt de gegevens van die server via de justitie van dat land. Welke partner (code) ondersteunt die justitiële samenwerking?', answer: ['P7'],
          hints: ['Notice-and-takedown werkt hier niet. Je hebt een weg via justitie nodig.', 'Zoek de partner die rechtshulpverzoeken en samenwerking tussen officieren ondersteunt.', 'Het is niet Europol, maar de andere Europese organisatie.'],
          wrong: { 'P1': 'P1 is een Nederlandse hoster die meldingen wel afhandelt. De server staat hier ergens anders.', 'P6': 'Europol ondersteunt de politiekant en actiedagen. Voor de justitiële weg (rechtshulp, officieren) is er een andere organisatie.' },
          explain: 'Eurojust ondersteunt rechtshulpverzoeken en de afstemming tussen justitiële autoriteiten van verschillende landen.' },
        { q: 'Een ransomware-affiliate zit binnen bij drie ziekenhuizen, maar heeft nog niet versleuteld. Welke partner (code) waarschuwt die instellingen naar verwachting het snelst en het meest gericht?', answer: ['P8'],
          hints: ['Zoek een partner die precies deze sector als achterban heeft.', 'Het NCSC kan ook waarschuwen, maar er is een partner die dichter bij ziekenhuizen staat.', 'Een sectorale CERT.'],
          wrong: { 'P4': 'Het NCSC kan ook waarschuwen, maar hier staat een partner die alleen zorginstellingen bedient en dat binnen enkele uren doet.', 'P5': 'Een securitybedrijf heeft geen achterban van ziekenhuizen die het kan waarschuwen.' },
          why: 'De tijd tussen binnenkomen en versleutelen is je interventievenster. Het kanaal dat het snelst bij het slachtoffer is, wint.',
          explain: 'De sectorale CERT bedient precies de getroffen sector en waarschuwt binnen enkele uren.' },
        { q: 'Bij welke partner (code) ligt de grootste kans op een decryptor voor slachtoffers die al versleuteld zijn?', answer: ['P5'],
          hints: ['Een decryptor bouwen vraagt om malware-analyse.', 'Zoek de partner die eerder iets vond in de versleuteling zelf.', 'Het securitybedrijf.'],
          explain: 'Kestrel Labs vond eerder een fout in de versleuteling. Zo\'n decryptor kan daarna gratis worden aangeboden, bijvoorbeeld via No More Ransom.' },
        { q: 'Waarom druk je bij voorkeur de knoppen van hoster, registrar en bank op hetzelfde moment in?', options: ['Zodat de dader niet de ene schakel kan vervangen terwijl de andere nog werkt', 'Omdat de wet dat voorschrijft', 'Omdat partners anders niet willen meewerken', 'Om de kosten te delen'], answer: 0,
          wrong: { 1: 'Er is geen wet die gelijktijdigheid voorschrijft. Het is een tactische keuze.', 2: 'Partners werken ook mee als ze niet tegelijk gaan. Gelijktijdigheid gaat om het effect op de dader.' },
          explain: 'Een losse takedown wordt vaak binnen een dag hersteld. Gelijktijdig ingrijpen op meerdere schakels maakt herstel duurder en trager.' },
      ],
    },

    {
      title: 'Taak 3 — Van crime script naar interventiekansen',
      tryFirst: true,
      intro: '<p>In het lab werk je het script van een fictieve DDoS-huurdienst (een <em>booter</em>) uit. Vul per fase in wat er gebeurt en bedenk bij elke fase één barrière met een eigenaar. Vergelijk daarna met de voorbeelduitwerking.</p>',
      content: `
        <p>In de room <em>Crime scripting</em> leerde je een misdaad ontleden in zes fasen en per fase een interventie
        te bedenken. Als tactisch analist ga je een stap verder: je zoekt in dat script de <strong>interventiekansen</strong>.
        Dat zijn de plekken waar een maatregel veel effect heeft, waar een partner de knop heeft, en waar het moment
        gunstig is.</p>

        <h3>Drie vragen per fase</h3>
        <ol>
          <li><strong>Welke barrière past hier?</strong> Wat maakt deze stap moeilijker, riskanter of minder lonend?</li>
          <li><strong>Wie is de eigenaar?</strong> Politie, OM, hoster, registrar, bank, betaaldienst, CERT, of het
          slachtoffer zelf.</li>
          <li><strong>Hoeveel daders raak je?</strong> Een maatregel tegen één dader is iets anders dan een maatregel
          tegen een dienst waar honderden daders van afhankelijk zijn.</li>
        </ol>

        <h3>Knelpunten</h3>
        <p>Een <strong>knelpunt</strong> (<em>pinch point</em>) is een stap die veel daders delen en die moeilijk te
        vervangen is. Denk aan een bulletproof hoster, een loader-dienst of één betaalroute waar een hele dienst op
        draait. Daar heeft een interventie de grootste hefboom.</p>

        <h3>Voorbeeld: de fictieve booter StormKlok</h3>
        <table>
          <thead><tr><th>Fase</th><th>Wat gebeurt er</th><th>Barrière</th><th>Eigenaar</th></tr></thead>
          <tbody>
            <tr><td>1 · Voorbereiding</td><td>De beheerder huurt servers en registreert <code>stormklok.nm.lab</code></td><td>Domein opschorten; hoster weigert of beëindigt het contract</td><td>Registrar, hoster</td></tr>
            <tr><td>2 · Binnenkomen</td><td>Een scholier zoekt "booter kopen" en maakt een account</td><td>Waarschuwende boodschap bij zulke zoekopdrachten</td><td>Politie met online platforms</td></tr>
            <tr><td>3 · Uitvoeren</td><td>De klant betaalt en start een aanval op een gameserver</td><td>Betaalroute blokkeren</td><td>Betaaldienst</td></tr>
            <tr><td>4 · Buit</td><td>De beheerder int abonnementsgeld van honderden klanten</td><td>Beslag op de opbrengst</td><td>Politie en OM</td></tr>
            <tr><td>5 · Vertrek</td><td>Logs worden gewist; de dienst verhuist bij problemen</td><td>Bewijs veiligstellen vóór de actie</td><td>Politie</td></tr>
            <tr><td>6 · Cash-out</td><td>Crypto gaat via een exchange naar een bankrekening</td><td>Signaleren bij de exchange</td><td>Exchange, FIU-Nederland</td></tr>
          </tbody>
        </table>

        <p>Het knelpunt zit hier in de <strong>betaalroute</strong> van fase 3: alle klanten betalen via dezelfde
        weg, en zonder betaling geen aanval. De barrière in fase 2 is ook interessant, want die raakt nieuwe klanten
        nog vóór ze iets strafbaars doen.</p>

        <div class="callout tip">
          <strong>Tip:</strong> let op de eigenaar. Als de knop bij een partner ligt die jij niet kent, is je eerste
          stap niet de maatregel maar het contact. Dat is waarom de vacature analyse en netwerk in één functie
          zet.
        </div>
      `,
      lab: {
        type: 'crimescript',
        scenario: 'DDoS-huurdienst StormKlok (fictief): een beheerder verhuurt aanvallen via een website aan honderden klanten, veelal scholieren.',
        interventions: true,
        model: '<p><strong>Voorbeelduitwerking (kort).</strong></p><ul><li><strong>1 · Voorbereiding</strong>: servers en domein stormklok.nm.lab. Barrière: domein opschorten en contract beëindigen. Eigenaar: registrar en hoster.</li><li><strong>2 · Binnenkomen</strong>: klant zoekt een booter en maakt een account. Barrière: waarschuwing bij zoekopdrachten. Eigenaar: politie met platforms.</li><li><strong>3 · Uitvoeren</strong>: betaling en aanval. Barrière: betaalroute blokkeren. Eigenaar: betaaldienst. <em>Knelpunt: alle klanten betalen hier.</em></li><li><strong>4 · Buit</strong>: abonnementsgeld. Barrière: beslag. Eigenaar: politie en OM.</li><li><strong>5 · Vertrek</strong>: logs wissen, verhuizen. Barrière: bewijs eerst veiligstellen. Eigenaar: politie.</li><li><strong>6 · Cash-out</strong>: crypto naar bank. Barrière: signaleren bij de exchange. Eigenaar: exchange, FIU-Nederland.</li></ul><p>Na de actie: klanten waarschuwen (afschrikken) en jonge first offenders een traject aanbieden (ombuigen).</p>',
      },
      questions: [
        { q: 'In welke fase (nummer) zit in het voorbeeld van StormKlok het knelpunt?', answer: ['3', 'fase 3', 'drie'],
          hints: ['Een knelpunt is een stap die alle daders delen en die moeilijk te vervangen is.', 'Zoek de stap waar alle klanten langs moeten voordat er een aanval komt.', 'Het gaat om de betaling.'],
          wrong: { '1': 'Een domein is in een dag vervangen. Dat is een barrière, maar geen knelpunt.', '4': 'Beslag op de opbrengst raakt de beheerder, niet de honderden klanten.' },
          explain: 'In fase 3 betalen alle klanten via dezelfde route. Zonder betaling geen aanval: daar heeft een maatregel de grootste hefboom.' },
        { q: 'Welke vraag stel je per fase náást "welke barrière?" en "wie is de eigenaar?"', options: ['Hoeveel daders raak je met deze maatregel?', 'Hoe heet de dader?', 'Welk land heeft de mooiste wetgeving?', 'Hoe lang duurt het onderzoek al?'], answer: 0,
          explain: 'Een maatregel tegen een dienst waar honderden daders van afhankelijk zijn, heeft meer hefboom dan een maatregel tegen één dader.' },
        { q: 'Welke barrière uit het voorbeeld raakt nieuwe klanten nog vóór ze iets strafbaars hebben gedaan? Geef het fasenummer.', answer: ['2', 'fase 2', 'twee'],
          hints: ['Zoek de fase waarin iemand pas aan het zoeken is.', 'Kijk in de tabel bij "binnenkomen".', 'De waarschuwing bij zoekopdrachten.'],
          explain: 'De waarschuwing bij zoekopdrachten in fase 2 werkt preventief: de klant heeft nog niets gekocht of aangevallen.' },
      ],
    },

    {
      title: 'Taak 4 — Afwegen vóór je ingrijpt',
      tryFirst: true,
      intro: '<p>Je bent tactisch analist in de fictieve Operatie Kadewacht, tegen de bulletproof hoster NachtHaven. Vijf keer moet je een advies geven. Kies telkens de afweging die je zou verdedigen tegenover je teamleiding en de officier van justitie.</p>',
      content: `
        <p>Een interventiekans zien is één ding. Adviseren om hem ook te benutten, is iets anders. Elke interventie heeft
        een prijs, en een tactisch analist zet die prijs naast het effect. Zes vragen helpen je daarbij.</p>

        <h3>De zes afwegingen</h3>
        <ol>
          <li><strong>Effect.</strong> Wat verandert er echt, en hoe lang? Leg vóóraf vast waaraan je het effect meet:
          het aantal nieuwe slachtoffers, de tijd tot de dienst terug is, de prijs op fora, het aantal klanten.</li>
          <li><strong>Displacement.</strong> Wijkt de dader uit naar een andere hoster, een ander land, een andere
          methode? Uitwijken kost de dader wel tijd en geld, dus het is niet per se een mislukking. Maar reken erop.</li>
          <li><strong>Proportionaliteit en subsidiariteit.</strong> Staat het middel in verhouding tot het doel, en is er
          geen lichter middel dat ook werkt? Een hele IP-reeks blokkeren waar ook duizenden legitieme sites op staan, is
          meestal te zwaar.</li>
          <li><strong>Tipping-off.</strong> Waarschuw je met deze actie de verdachten? Een takedown midden in een lopend
          onderzoek kan bewijs laten verdwijnen en verdachten laten onderduiken.</li>
          <li><strong>Juridische grondslag.</strong> Is er een bevoegdheid, en wie beslist? Bij strafvorderlijke
          middelen is dat de officier van justitie, niet de analist.</li>
          <li><strong>Internationale afstemming.</strong> Lopen er onderzoeken in andere landen? Een solo-actie kan het
          werk van buitenlandse collega's beschadigen. Actiedagen worden daarom vaak gezamenlijk gepland, bijvoorbeeld
          via Europol.</li>
        </ol>

        <h3>Het dilemma van wachten</h3>
        <p>Het lastigste dilemma is bijna altijd hetzelfde: <strong>wachten</strong> geeft betere kansen op
        vervolging, maar kost intussen slachtoffers. Er is geen vaste regel, wel een vaste werkwijze: maak de prijs
        van wachten concreet ("ongeveer dertig nieuwe slachtoffers per dag"), zoek naar manieren om eerder in te grijpen
        zonder het onderzoek te schaden (slachtoffers stil waarschuwen, bewijs eerder veiligstellen), en leg de afweging
        voor aan wie erover beslist.</p>

        <div class="callout info">
          <strong>Jouw rol:</strong> de analist beslist niet, maar zorgt dat de beslisser met open ogen kiest. Dat
          betekent ook dat je ongevraagd aan de bel trekt als je ziet dat een afweging ontbreekt.
        </div>

        <p>Voorbeeld uit een fictieve zaak: een team wil een phishingserver bij de actiedag over drie weken in beslag
        nemen. Jij rekent uit dat er in die tijd zeshonderd nieuwe slachtoffers kunnen vallen, en stelt voor de
        betrokken bank nu al op de bestemmingsrekeningen te laten letten. Het onderzoek blijft heel, de schade
        daalt.</p>
      `,
      lab: {
        type: 'scenario',
        title: 'Operatie Kadewacht',
        scenario: 'NachtHaven (fictief) verhuurt servers aan criminelen en negeert alle meldingen. Het team bereidt met buitenlandse partners een actiedag voor. Jij adviseert.',
        pass: 5,
        flag: 'NM{eerst_afwegen_dan_ingrijpen}',
        steps: [
          { situation: 'Op een server van NachtHaven (198.51.100.23) draait een phishingpaneel dat elke dag zo\'n dertig nieuwe slachtoffers maakt. De actiedag is over drie weken. Wat adviseer je?', choices: [
            { label: 'Maak de prijs van wachten concreet en stel voor de slachtofferstroom nu al te beperken zonder de server aan te raken, bijvoorbeeld via de banken van de bestemmingsrekeningen. Leg dat voor aan teamleiding en officier.', good: true, feedback: 'Je laat het onderzoek heel en verkleint de schade. De beslissing ligt bij wie erover gaat.' },
            { label: 'Zelf contact opnemen met NachtHaven om de server offline te laten halen.', good: false, feedback: 'Een bulletproof hoster negeert meldingen, en je waarschuwt er de verdachten mee. Bovendien is dit niet jouw beslissing.' },
            { label: 'Niets zeggen: het opsporingsteam heeft de planning al gemaakt.', good: false, feedback: 'Ongevraagd adviseren hoort bij de rol. De prijs van wachten moet op tafel.' },
          ] },
          { situation: 'Bij een eerdere takedown verhuisde dezelfde groep binnen twee dagen naar een andere hoster. Een collega zegt: "Takedowns hebben dus geen zin."', choices: [
            { label: 'Eens: we stoppen met verstoren en richten ons alleen op aanhouden.', good: false, feedback: 'Uitwijken kost de groep tijd en geld. Eén laan laten vallen maakt de aanpak smaller, niet sterker.' },
            { label: 'Combineer de takedown met een maatregel op een knelpunt dat moeilijker te vervangen is, zoals de betaalroute, en meet het effect over meerdere weken.', good: true, feedback: 'Je rekent op displacement en maakt het uitwijken duurder door een tweede schakel te raken.' },
            { label: 'Dezelfde takedown herhalen, maar dan vaker.', good: false, feedback: 'Zolang de groep alleen een nieuwe hoster hoeft te zoeken, verandert er weinig.' },
          ] },
          { situation: 'Iemand stelt voor om op de actiedag de hele IP-reeks van NachtHaven te laten blokkeren. In die reeks staan ook ongeveer 4.000 legitieme websites van kleine ondernemers.', choices: [
            { label: 'Doen: het gaat om een criminele hoster, dus alles mag.', good: false, feedback: 'Disproportioneel: duizenden onschuldige ondernemers worden geraakt terwijl er gerichtere middelen zijn.' },
            { label: 'Gericht ingrijpen op de servers en domeinen die bij strafbare feiten horen, en de legitieme klanten ontzien.', good: true, feedback: 'Proportioneel en subsidiair: het lichtste middel dat het doel bereikt.' },
            { label: 'Helemaal afzien van de actiedag.', good: false, feedback: 'Een te zwaar voorstel betekent niet dat er niets moet gebeuren. Kies een gerichter middel.' },
          ] },
          { situation: 'Een buitenlandse partner laat via de internationale coördinatie weten dat zij in hetzelfde netwerk nog een week nodig hebben voor hun eigen aanhoudingen. Het Nederlandse team wil toch op de geplande datum gaan.', choices: [
            { label: 'Adviseer de timing af te stemmen via de internationale coördinatie en de prijs van een week uitstel in beeld te brengen.', good: true, feedback: 'Een solo-actie kan verdachten in het andere land waarschuwen. Afstemming is hier de kern.' },
            { label: 'Op de geplande datum gaan en de partner achteraf informeren.', good: false, feedback: 'Dan waarschuw je mogelijk de verdachten van de partner. Dat kost vertrouwen en zaken.' },
            { label: 'De partner vragen of zij hun aanhoudingen kunnen vervroegen, en anders niets doen.', good: false, feedback: 'Afstemmen is goed, maar "anders niets doen" laat de afweging voor de beslissers liggen.' },
          ] },
          { situation: 'De actiedag is voorbij. De teamleiding vraagt hoe je over drie maanden laat zien of het werkte.', choices: [
            { label: 'Het aantal persberichten en de media-aandacht tellen.', good: false, feedback: 'Aandacht is geen effect op de criminele keten.' },
            { label: 'Vergelijken met de nulmeting die je vóór de actie vastlegde: nieuwe slachtoffers, de tijd tot vervangende infrastructuur, prijzen en klanten op fora.', good: true, feedback: 'Zonder nulmeting kun je geen effect laten zien. Je legde de meetpunten vooraf vast.' },
            { label: 'Kijken of NachtHaven nog online is.', good: false, feedback: 'Terug online zegt weinig. De vraag is of de keten even goed draait als ervoor.' },
          ] },
        ],
      },
      questions: [
        { q: 'Maak in het lab alle vijf de afwegingen goed. Welke vlag verschijnt?', answer: ['NM{eerst_afwegen_dan_ingrijpen}'],
          hints: ['Vraag je bij elke keuze af welke van de zes afwegingen hier speelt.', 'Kies steeds de optie die de beslisser een eerlijke keuze geeft, en niet de optie waarin jij zelf beslist of zwijgt.', 'Bij een fout kun je met "Opnieuw" de reeks nog eens doorlopen.'],
          explain: 'Prijs van wachten, displacement, proportionaliteit, internationale afstemming en effectmeting: vijf afwegingen, vijf keer de beslisser goed informeren.' },
        { q: 'Hoe heet het risico dat een interventie verdachten waarschuwt, zodat ze bewijs vernietigen of onderduiken?', answer: ['tipping-off', 'tipping off', 'tippingoff'],
          hints: ['Het is een Engelse term.', 'Het staat in de lijst van zes afwegingen.', 'Je "tipt" de verdachte.'],
          explain: 'Tipping-off: de actie zelf vertelt de verdachte dat hij in beeld is.' },
        { q: 'Wat is subsidiariteit?', options: ['Kiezen voor het lichtste middel dat het doel nog bereikt', 'Ingrijpen zonder juridische grondslag', 'Een actie altijd internationaal plannen', 'De zwaarste maatregel kiezen voor het grootste effect'], answer: 0,
          wrong: { 3: 'Dat is het omgekeerde. Het zwaarste middel is alleen gerechtvaardigd als lichtere middelen niet volstaan.' },
          explain: 'Proportionaliteit vraagt of het middel in verhouding staat tot het doel, subsidiariteit of er geen lichter middel is dat ook werkt.' },
      ],
    },

    {
      title: 'Taak 5 — Adviseren, gevraagd en ongevraagd: de adviesnotitie',
      tryFirst: true,
      intro: '<p>In het lab staan je werkaantekeningen over de klantenlijst van een opgerolde DDoS-huurdienst. Niemand heeft je om een advies gevraagd. Schrijf toch een korte adviesnotitie voor de teamleiding: conclusie eerst, opties, aanbeveling met eigenaar en termijn, en de onzekerheid apart.</p>',
      content: `
        <p>De vacature vraagt om iemand die "goed kan adviseren (zowel gevraagd als ongevraagd)". Gevraagd advies is
        bekend terrein: iemand stelt een vraag, jij geeft antwoord. <strong>Ongevraagd advies</strong> is lastiger.
        Je ziet een kans of een risico dat niemand op de agenda heeft gezet, en jij brengt het in.</p>

        <h3>Ongevraagd adviseren zonder te duwen</h3>
        <ul>
          <li><strong>Kies het juiste kanaal.</strong> Breng het bij wie erover beslist, via de lijn die in je team
          gebruikelijk is. Niet via de wandelgang of een groepsapp.</li>
          <li><strong>Kies het juiste moment.</strong> Vlak voor een actiedag is er weinig ruimte. Een kans die over
          drie weken verloopt, breng je deze week in.</li>
          <li><strong>Maak het licht om "ja" te zeggen.</strong> Een half A4 met een concreet voorstel wint van een
          zorg zonder oplossing.</li>
          <li><strong>Bied aan, dring niet op.</strong> De beslisser mag nee zeggen. Leg wel vast dat je het hebt
          ingebracht.</li>
        </ul>

        <h3>De opbouw van een adviesnotitie</h3>
        <p>Je kent de onderdelen al uit de room <em>Intelligenceproducten</em>: de BLUF (conclusie eerst) en de vijf
        bouwstenen wat, waarom, wie, wanneer en risico's. Voor een interventieadvies voeg je twee dingen toe:</p>
        <ol>
          <li><strong>Opties naast elkaar.</strong> Geef twee of drie opties met hun voor- en nadelen, zodat de
          beslisser kan kiezen in plaats van alleen ja of nee te zeggen. Zet "niets doen" er eerlijk tussen.</li>
          <li><strong>De afweging uit taak 4.</strong> Benoem kort effect, displacement, proportionaliteit, risico op
          tipping-off, grondslag en internationale afstemming. Alleen wat speelt, niet als verplicht lijstje.</li>
        </ol>

        <div class="callout tip">
          <strong>Voorbeeldzin voor de BLUF:</strong> "Advies: stuur de 312 Nederlandse klanten van de opgerolde
          DDoS-dienst binnen twee weken een waarschuwingsbericht en bied de jongste een traject aan. Zonder dat stapt
          een deel waarschijnlijk over naar een andere dienst."
        </div>

        <p>Let in het lab op wat er in de aantekeningen staat en wat er níét staat. Een aanname (bijvoorbeeld over de
        leeftijd van de klanten) mag in je notitie, maar dan gelabeld als aanname, in het blok onzekerheid.</p>
      `,
      lab: {
        type: 'bluf',
        source: `WERKAANTEKENINGEN — klantenlijst DDoS-huurdienst VolleBak (fictief)

Maandag
- De servers van VolleBak zijn twee weken geleden bij een internationale actie in beslag genomen. De dienst is offline.
- In de in beslag genomen database staan 4.870 klantaccounts. Op basis van IP-adres en e-mailadres zijn er 312 aan Nederland te koppelen.
- Van die 312 hebben 41 accounts meer dan tien aanvallen uitgevoerd. De rest deed er één tot drie.

Dinsdag
- Op twee fora verschijnen berichten van ex-klanten die vragen "welke booter nu?". Een nieuwe dienst, Donderslag (fictief), adverteert er al.
- Uit eerdere zaken weten we dat klanten van zulke diensten vaak jong zijn. Voor deze lijst hebben we geen leeftijden; dat is dus een aanname.

Woensdag
- Een ander land heeft zijn eigen klanten al een waarschuwingsmail gestuurd. Er loopt geen Nederlands onderzoek naar individuele klanten; de officier weet nog niet van deze lijst.
- De 41 zware gebruikers verdienen mogelijk een eigen aanpak (gesprek, of een traject voor jonge first offenders).
- Niemand heeft gevraagd wat we met de lijst doen.`,
        model: `<p><strong>BLUF.</strong> Advies: stuur de 312 Nederlandse klanten van de opgerolde DDoS-dienst VolleBak binnen twee weken een waarschuwingsbericht, en geef de 41 zware gebruikers een persoonlijke aanpak (gesprek of traject voor jonge first offenders). Zonder dat stapt een deel <strong>waarschijnlijk</strong> over naar Donderslag, dat al adverteert.</p>
<p><strong>Opties.</strong> (1) Niets doen: geen inspanning, maar overstap naar Donderslag is waarschijnlijk. (2) Alleen een waarschuwingsbericht: licht en snel, maar te mager voor de zware gebruikers. (3) Bericht plus persoonlijke aanpak voor de 41 (aanbevolen).</p>
<ul>
  <li>Officier van justitie informeren over de lijst en de grondslag voor het bericht bespreken — <strong>eigenaar: teamleider</strong> — <strong>deze week</strong>.</li>
  <li>Waarschuwingsbericht aan 312 klanten — <strong>eigenaar: analyse en communicatie</strong> — <strong>binnen twee weken</strong>.</li>
  <li>Aanpak voor de 41 zware gebruikers voorbereiden — <strong>eigenaar: tactisch rechercheur</strong> — <strong>binnen een maand</strong>.</li>
</ul>
<p><strong>Onzekerheid (apart).</strong> De leeftijd van de klanten is een aanname uit eerdere zaken. De koppeling aan Nederland rust op IP- en e-mailadressen en kan fouten bevatten. Een ander land waarschuwde al; afstemmen over de tekst voorkomt tegenstrijdige berichten.</p>`,
      },
      questions: [
        { q: 'Hoeveel klanten van VolleBak zijn volgens de aantekeningen aan Nederland te koppelen? (getal)', answer: ['312'],
          hints: ['Kijk bij maandag.', 'Er staan twee getallen voor klanten: het totaal en het Nederlandse deel.', 'Niet 4.870 en niet 41.'],
          wrong: { '4870': 'Dat is het totaal aantal accounts wereldwijd.', '4.870': 'Dat is het totaal aantal accounts wereldwijd.', '41': 'Dat zijn de zware gebruikers onder de Nederlandse klanten.' },
          explain: 'Van de 4.870 accounts zijn er 312 aan Nederland te koppelen, op basis van IP- en e-mailadres.' },
        { q: 'Welke bewering uit de aantekeningen hoort in het blok onzekerheid, omdat het een aanname is?', options: ['Dat de klanten jong zijn', 'Dat de dienst offline is', 'Dat Donderslag adverteert', 'Dat 41 accounts meer dan tien aanvallen deden'], answer: 0,
          wrong: { 1: 'Dat de dienst offline is, is bekend: de servers zijn in beslag genomen.', 2: 'Dat zag je zelf op twee fora.', 3: 'Dat volgt uit de database.' },
          explain: 'Er zijn geen leeftijden voor deze lijst. De aanname komt uit eerdere zaken en moet dus gelabeld worden.' },
        { q: 'Waarom zet je "niets doen" eerlijk tussen de opties?', options: ['Zodat de beslisser ziet wat het kost om niet te handelen', 'Omdat niets doen altijd de beste keuze is', 'Om de notitie langer te maken', 'Omdat het wettelijk verplicht is'], answer: 0,
          explain: 'De prijs van niets doen maakt de afweging eerlijk. Hier: een deel van de klanten stapt over naar Donderslag.' },
        { q: 'Boss: in een lopend onderzoek naar ransomware-affiliate Grijsvalk (fictief) kan het team over drie weken aanhouden. Uit rechtmatig verkregen gegevens blijkt dat Grijsvalk al binnen is bij twee Nederlandse bedrijven, maar nog niet heeft versleuteld. Vier opties. A: de hoster van zijn C2-server nu om een takedown vragen. B: de twee bedrijven nu discreet laten waarschuwen met concreet handelingsperspectief, zonder het onderzoek te noemen. C: Grijsvalk met naam en foto publiek bekendmaken. D: niets doen tot de aanhouding. Welke optie adviseer je nu, en welke andere optie past pas ná de aanhouding? Antwoord als twee letters, bijvoorbeeld DC.', boss: true,
          answer: ['BA', 'B A', 'B, A', 'B en A', 'B-A'],
          hints: ['Loop elke optie langs de afwegingen uit taak 4: wie wordt er gewaarschuwd, en wat kost wachten?', 'Eén optie beschermt slachtoffers zonder de verdachte te laten merken dat hij in beeld is. Eén andere optie waarschuwt hem nu, maar niet meer als hij al vastzit.', 'Publiek bekendmaken met naam en foto is in geen van beide momenten de bedoeling.'],
          wrong: {
            'AB': 'Volgorde: een takedown nu waarschuwt Grijsvalk drie weken voor de aanhouding. Die past pas daarna.',
            'DA': 'Niets doen laat twee bedrijven versleutelen terwijl je het had kunnen voorkomen. De prijs van wachten is hier te hoog.',
            'DB': 'Niets doen laat twee bedrijven versleutelen terwijl je het had kunnen voorkomen.',
            'BC': 'Een verdachte met naam en foto publiek maken is disproportioneel en past ook na de aanhouding niet als interventie van een analist.',
            'BD': 'Na de aanhouding is er juist ruimte om de infrastructuur aan te pakken. Niets doen is dan geen logische vervolgstap.',
            'CA': 'Publiek bekendmaken waarschuwt de verdachte en is disproportioneel.',
          },
          why: 'De sterkste adviezen combineren lanen en zeggen ook in welke volgorde. Slachtoffers beschermen kan vaak al, verstoren soms pas later.',
          explain: 'B beschermt slachtoffers nu zonder tipping-off: de bedrijven krijgen handelingsperspectief en het onderzoek blijft buiten beeld. A (takedown) zou Grijsvalk nu waarschuwen, maar na de aanhouding is het de logische verstorende vervolgstap. C is disproportioneel en D laat vermijdbare schade toe.' },
      ],
    },

    {
      title: 'Taak 6: Zo komt dit voor op een examen of assessment',
      kind: 'examen',
      optional: true,
      content: `
        <p>In een vakinhoudelijk assessment of examen krijg je vaak een korte casus met de vraag welke interventie je
        adviseert, of welke afweging ontbreekt. De afleiders zijn bijna altijd verdedigbaar, maar missen één ding:
        een eigenaar, de prijs van wachten, het risico op tipping-off of de proportionaliteit.</p>

        <h3>Zo pak je zo'n vraag aan</h3>
        <ol>
          <li><strong>Lees eerst de situatie, niet de opties.</strong> Wat is er aan de hand, wie is in beeld, loopt er
          een onderzoek, en zijn er slachtoffers die nu schade lijden?</li>
          <li><strong>Bepaal de laan.</strong> Richt de vraag zich op de dader, de infrastructuur, de afnemers of de
          slachtoffers? Vaak is het antwoord een combinatie, met een volgorde.</li>
          <li><strong>Zoek de eigenaar.</strong> Wie heeft de knop: politie en OM, een hoster, een registrar, een bank,
          een CERT, een buitenlandse partner?</li>
          <li><strong>Loop de afwegingen langs.</strong> Effect, displacement, proportionaliteit en subsidiariteit,
          tipping-off, grondslag en internationale afstemming. Een afleider valt meestal op één daarvan af.</li>
          <li><strong>Kies het antwoord dat de beslisser het best informeert.</strong> Opties waarin de analist zelf
          beslist, of juist zwijgt, zijn zelden goed.</li>
        </ol>

        <div class="callout info">
          <strong>Let op absolute woorden:</strong> "altijd", "nooit", "alles mag" en "zinloos" zijn in dit vak bijna
          altijd fout. Interventies zijn afwegingen, geen regels.
        </div>

        <p>Een voorbeeld van zo'n redenering: "De dader zit in het buitenland, dus aanhouden duurt lang. Er zijn wel
        slachtoffers in Nederland die nu schade lijden, en de server staat bij een hoster die meldingen afhandelt. Dan
        ligt beschermen nu en verstoren op afstemming met het onderzoek voor de hand." Zo laat je zien dat je laan,
        eigenaar en afweging samen neemt.</p>

        <p>De vragen hieronder zijn zelf geschreven in die stijl. Alles is fictief.</p>
      `,
      questions: [
        { q: 'Een registrar wil een frauduleus domein pas opschorten na een officieel verzoek. Het opsporingsteam heeft het domein nodig om te zien welke slachtoffers inloggen. Wat is de beste eerste stap?', options: ['Met het team en de officier afwegen of sinkholen beter past dan opschorten, zodat je ziet wie zich meldt en de dader het domein kwijt is', 'Het domein zo snel mogelijk laten opschorten', 'De registrar vragen niets te doen en het domein te laten draaien', 'Een persbericht over het domein uitbrengen'], answer: 0,
          wrong: { 1: 'Opschorten stopt de dader, maar je verliest het zicht op slachtoffers die zich melden.', 2: 'Dan blijft de dader het domein gebruiken en vallen er meer slachtoffers.', 3: 'Een persbericht waarschuwt de dader en voegt hier weinig toe.' },
          explain: 'Bij sinkholen verliest de dader het domein en zie je welke slachtoffers zich melden. De keuze ligt bij team en officier.' },
        { q: 'Na een takedown van een phishingkit verschijnt dezelfde kit na twee dagen bij een andere hoster. Wat is de beste conclusie?', options: ['Er is displacement; het effect meet je over langere tijd en je zoekt een knelpunt dat moeilijker te vervangen is', 'De takedown was zinloos', 'De takedown was een volledig succes', 'De nieuwe hoster werkt samen met de politie'], answer: 0,
          wrong: { 1: 'Uitwijken kost de dader tijd en geld. Zinloos is het niet, maar het is ook niet genoeg.', 2: 'De dader is binnen twee dagen terug. Dat is geen volledig succes.', 3: 'Daar is geen enkele aanwijzing voor.' },
          explain: 'Displacement is te verwachten. Combineer met een maatregel op een knelpunt en meet tegen een nulmeting.' },
        { q: 'Welke partner zet je het eerst in als je slachtoffers in één sector binnen enkele uren wilt waarschuwen?', options: ['De sectorale CERT van die sector', 'Eurojust', 'De registrar', 'Een securitybedrijf zonder klanten in die sector'], answer: 0,
          wrong: { 1: 'Eurojust ondersteunt justitiële samenwerking, niet het waarschuwen van slachtoffers.', 2: 'Een registrar beheert domeinen, geen contacten met slachtoffers.', 3: 'Zonder klanten in de sector heeft het geen kanaal naar de slachtoffers.' },
          explain: 'Een sectorale CERT heeft het kanaal én het vertrouwen van de aangesloten organisaties.' },
      ],
    },
  ],
  terms: [
    { term: 'Interventiekans', def: 'Een plek in het criminele proces waar een maatregel veel effect heeft, een partner de knop heeft en het moment gunstig is.' },
    { term: 'Integrale aanpak', def: 'Een aanpak die meerdere lanen combineert (vervolgen, verstoren, afschrikken of ombuigen, slachtoffers beschermen) en meerdere partners betrekt.' },
    { term: 'Verstoren (disruption)', def: 'Ingrijpen op infrastructuur, diensten of onderling vertrouwen zodat het criminele proces stokt, ook als aanhouden (nog) niet lukt.' },
    { term: 'Notice-and-takedown', def: 'Werkwijze waarbij een tussenpersoon, zoals een hoster, na een melding over onrechtmatige inhoud die inhoud offline haalt.' },
    { term: 'Sinkholing', def: 'Een kwaadaardig domein omleiden naar een server die de verdediger beheert, zodat de dader het kwijt is en zichtbaar wordt welke machines zich melden.' },
    { term: 'Knelpunt (pinch point)', def: 'Een stap die veel daders delen en die moeilijk te vervangen is, zoals een betaalroute of een bulletproof hoster.' },
    { term: 'Displacement', def: 'Verplaatsing: na een maatregel wijkt de dader uit naar een ander doelwit, een andere plek, een ander moment of een andere methode.' },
    { term: 'Tipping-off', def: 'Het risico dat een actie verdachten laat merken dat ze in beeld zijn, waardoor ze bewijs vernietigen of onderduiken.' },
    { term: 'Proportionaliteit en subsidiariteit', def: 'Het middel moet in verhouding staan tot het doel, en er mag geen lichter middel zijn dat ook volstaat.' },
    { term: 'J-CAT', def: 'Joint Cybercrime Action Taskforce bij Europol EC3, waarin verbindingsofficieren van verschillende landen samen cybercrimezaken oppakken.' },
    { term: 'Eurojust', def: 'EU-agentschap voor justitiële samenwerking in strafzaken; ondersteunt onder meer rechtshulpverzoeken en gezamenlijke onderzoeksteams (JIT\'s).' },
  ],
  resources: [
    { title: 'No More Ransom — decryptietools en preventie', url: 'https://www.nomoreransom.org/' },
    { title: 'Europol — European Cybercrime Centre (EC3)', url: 'https://www.europol.europa.eu/about-europol/european-cybercrime-centre-ec3' },
    { title: 'Eurojust — justitiële samenwerking in de EU', url: 'https://www.eurojust.europa.eu/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
  check: [
    { q: 'Een ransomwaregroep is nog niet te vervolgen, maar haar leksite en panelen draaien bij één hoster. Welke laan ligt het meest voor de hand?', options: ['Infrastructuur verstoren', 'Daders vervolgen', 'Slachtoffers herstellen', 'Geen'], answer: 0, explain: 'Als aanhouden (nog) niet lukt, kun je de infrastructuur verstoren.' },
    { q: 'Wat maakt een stap in een crime script tot een knelpunt?', options: ['Veel daders delen hem en hij is moeilijk te vervangen', 'Hij laat de meeste sporen achter', 'Hij duurt het langst', 'Hij vindt in het buitenland plaats'], answer: 0, explain: 'Een knelpunt combineert bereik (veel daders) met lage vervangbaarheid.' },
    { q: 'Een takedown midden in een lopend onderzoek kan verdachten laten onderduiken. Welke afweging is dit?', options: ['Tipping-off', 'Displacement', 'Subsidiariteit', 'Effectmeting'], answer: 0, explain: 'De actie zelf waarschuwt de verdachte.' },
    { q: 'Waarom geef je in een adviesnotitie meerdere opties?', options: ['Zodat de beslisser kan kiezen in plaats van alleen ja of nee te zeggen', 'Om te laten zien hoeveel werk je deed', 'Omdat één optie nooit genoeg mag zijn', 'Om de beslissing uit te stellen'], answer: 0, explain: 'Opties met voor- en nadelen maken de afweging zichtbaar.' },
  ],
});
