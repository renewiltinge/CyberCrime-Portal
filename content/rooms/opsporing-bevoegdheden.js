/* Room: Opsporingsbevoegdheden: wat een digitaal rechercheur mag en niet mag */
CS.registerRoom({
  id: 'opsporing-bevoegdheden',
  path: 'forensie',
  order: 12,
  title: 'Opsporingsbevoegdheden in het digitale onderzoek',
  icon: '🏛️',
  difficulty: 'Moeilijk',
  minutes: 90,
  level: 'Gevorderd',
  checked: '2026-11-12',
  summary: 'Wat mag een digitaal rechercheur, en wie moet toestemming geven? De hackbevoegdheid uit de Wet computercriminaliteit III, vorderen van gegevens, doorzoeken en in beslag nemen, verbaliseren, en het herkennen van een onrechtmatig spoor. Op hoofdlijnen; geen juridisch advies.',
  objectives: [
    'De rollen van opsporingsambtenaar, officier van justitie, rechter-commissaris en zittingsrechter uit elkaar houden',
    'Uitleggen wat de Wet computercriminaliteit III veranderde en onder welke voorwaarden heimelijk binnendringen (art. 126nba Sv) mag',
    'Bij een vordering van gegevens bepalen wie mag vorderen, van wie, en wanneer een machtiging van de rechter-commissaris nodig is',
    'Proportionaliteit en subsidiariteit toepassen bij doorzoeken, inbeslagnemen en onderzoek aan een smartphone',
    'Een proces-verbaal beoordelen en verbeteren op wat, wanneer, hoe, door wie en met welke middelen',
    'Een handeling buiten de grenzen van een bevel herkennen en de mogelijke gevolgen benoemen (art. 359a Sv)',
  ],
  tasks: [
    {
      title: 'Taak 1: Het kader: legaliteit en wie wat beslist',
      tryFirst: true,
      intro: '<p>In het lab staan zestien handelingen en beslissingen uit een digitaal opsporingsonderzoek. Zet ze bij de juiste rol: opsporingsambtenaar, officier van justitie, rechter-commissaris of zittingsrechter. Denk steeds: hoe zwaarder de inbreuk op iemands privacy, hoe hoger in de keten de beslissing ligt.</p>',
      content: `
        <div class="callout warn">
          <strong>Geen juridisch advies.</strong> Deze room geeft een overzicht op hoofdlijnen, bedoeld om te leren
          denken als een zorgvuldige rechercheur. Wetten en rechtspraak veranderen, en elk geval hangt af van de
          omstandigheden. Raadpleeg voor een echte zaak de actuele wettekst op wetten.overheid.nl, de aanwijzingen
          van het Openbaar Ministerie en een jurist.
        </div>

        <h3>Legaliteit: geen bevoegdheid zonder wet</h3>
        <p>Artikel 1 van het Wetboek van Strafvordering (Sv) zegt dat strafvordering alleen plaatsvindt op de wijze die
        de wet voorziet. Wie als overheid inbreuk maakt op iemands privéleven, heeft daarvoor een wettelijke basis
        nodig (ook artikel 8 van het Europees Verdrag voor de Rechten van de Mens eist dat). Voor lichte inbreuken
        volstaat de algemene politietaak uit artikel 3 Politiewet 2012, zoals openbare bronnen bekijken of
        kortstondig waarnemen. Hoe ingrijpender en stelselmatiger de inbreuk, hoe specifieker de bevoegdheid moet
        zijn, en hoe hoger de toestemming ligt.</p>

        <h3>De rollen</h3>
        <ul>
          <li><strong>Opsporingsambtenaar</strong>: de rechercheur zelf. Voert het onderzoek uit, gebruikt de
          lichtere bevoegdheden, en legt alles vast in een proces-verbaal.</li>
          <li><strong>Officier van justitie</strong> (OvJ): heeft het gezag over het opsporingsonderzoek, geeft
          bevelen voor zwaardere bevoegdheden en beslist over vervolging.</li>
          <li><strong>Rechter-commissaris</strong> (RC): een onafhankelijke rechter die al tijdens het onderzoek
          meekijkt. Voor de meest ingrijpende bevoegdheden moet de RC vooraf een machtiging geven.</li>
          <li><strong>Zittingsrechter</strong>: beoordeelt achteraf het hele dossier, ook hoe het bewijs is
          verkregen, en beslist over schuld en straf.</li>
        </ul>

        <h3>Twee toetsen bij elke stap</h3>
        <p><strong>Proportionaliteit</strong>: staat de inbreuk in verhouding tot het doel en de ernst van het
        feit? <strong>Subsidiariteit</strong>: kan het doel ook met een minder ingrijpend middel worden bereikt?
        Een voorbeeld: wie de naam bij een klantaccount zoekt, vraagt die op bij de webshop (vorderen), en dringt
        niet heimelijk het systeem van de webshop binnen.</p>

        <div class="callout info">
          <strong>Ook een rechercheur heeft grenzen.</strong> Computervredebreuk (art. 138ab Wetboek van
          Strafrecht) geldt voor iedereen. Een rechercheur die zonder bevoegdheid een systeem binnendringt, maakt geen
          uitzondering op die regel, maar verzamelt bovendien bewijs dat de zaak kan schaden.
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'Wie mag wat?',
        prompt: 'Vier rollen, vier handelingen per rol. Elke handeling hoort bij de rol die hem in de regel uitvoert of beslist.',
        flag: 'NM{wie_mag_wat}',
        groups: [
          { name: 'Opsporingsambtenaar', items: ['Maakt ten spoedigste proces-verbaal op', 'Vordert naam en adres bij een klantaccount', 'Doet beperkt onderzoek aan een in beslag genomen telefoon', 'Neemt bij heterdaad voorwerpen in beslag'] },
          { name: 'Officier van justitie', items: ['Heeft het gezag over het opsporingsonderzoek', 'Vordert transactiegegevens van een betaalbedrijf', 'Geeft het bevel om heimelijk binnen te dringen', 'Beslist of de zaak wordt vervolgd'] },
          { name: 'Rechter-commissaris', items: ['Machtigt vooraf de hackbevoegdheid', 'Machtigt het vorderen van gezondheidsgegevens', 'Beoordeelt vooraf zeer ingrijpend onderzoek aan een telefoon', 'Kan getuigen horen vóór de zitting'] },
          { name: 'Zittingsrechter', items: ['Bepaalt het gevolg van een vormverzuim', 'Kan onrechtmatig verkregen bewijs uitsluiten', 'Beslist over schuld en straf', 'Weegt de betrouwbaarheid van het proces-verbaal'] },
        ],
      },
      questions: [
        { q: 'Los de vier groepen op. Welke vlag verschijnt?', answer: ['NM{wie_mag_wat}'],
          hints: ['Begin bij de zittingsrechter: wat gebeurt er pas als de zaak op zitting komt?', 'De rechter-commissaris geeft machtigingen; de officier geeft bevelen en vorderingen.', 'De rechercheur doet de lichte, alledaagse handelingen zelf.'],
          explain: 'Vier rollen met elk een eigen gewicht. Hoe zwaarder de inbreuk, hoe meer onafhankelijke controle vooraf.' },
        { q: 'Een rechercheur wil weten wie er achter het e-mailadres van een fictieve webshopklant zit. Wat past het best bij proportionaliteit en subsidiariteit?', options: ['De naam en het adres bij de webshop vorderen', 'Heimelijk binnendringen in de server van de webshop', 'Het huis van de klant doorzoeken', 'De klant een week stelselmatig observeren'], answer: 0,
          wrong: { 1: 'Veel te zwaar voor deze vraag, en de webshop zelf is niet verdacht. Een vordering bereikt hetzelfde met een veel kleinere inbreuk.', 2: 'Een doorzoeking is een van de zwaarste inbreuken. Eerst moet je weten wie het is.', 3: 'Observeren veronderstelt dat je al weet wie je moet volgen.' },
          why: 'Een rechter die achteraf ziet dat een lichter middel had volstaan, kan het verkregen bewijs anders waarderen. Subsidiariteit is dus ook bescherming van je eigen zaak.',
          explain: 'Identificerende gegevens vorder je bij wie ze heeft. Dat is het minst ingrijpende middel dat het doel bereikt.' },
        { q: 'Een rechercheur ziet in het lab dat "beperkt onderzoek aan een telefoon" bij hem hoort. Wie beslist als het onderzoek zeer ingrijpend wordt, bijvoorbeeld een volledig beeld van iemands privéleven?', options: ['De rechercheur zelf, want de telefoon is al in beslag genomen', 'Zijn teamleider', 'De rechter-commissaris, op vordering van de officier van justitie', 'De zittingsrechter, achteraf'], answer: 2,
          wrong: { 0: 'De inbeslagneming geeft je de telefoon, niet automatisch het recht om er alles uit te halen.', 1: 'Een teamleider is geen onafhankelijke toetser in de zin van de wet.', 3: 'De zittingsrechter beoordeelt achteraf of het goed ging; de toestemming moet vooraf.' },
          explain: 'Hoe dieper het onderzoek in iemands privéleven, hoe hoger de toestemming: rechercheur, officier, rechter-commissaris.' },
      ],
    },

    {
      title: 'Taak 2: De Wet computercriminaliteit III en de hackbevoegdheid',
      tryFirst: true,
      intro: '<p>Een team onderzoekt een phishingpanel waarmee klanten van de fictieve NederBank worden opgelicht. Het team wil de server van het panel in. Doorloop in het lab vijf beslismomenten. Kies telkens wat de wet vraagt, niet wat het snelst is.</p>',
      content: `
        <p>De <strong>Wet computercriminaliteit III</strong> (CC III) is op <strong>1 maart 2019</strong> in werking
        getreden. Ze voegde nieuwe strafbare feiten toe (onder meer heling van niet-openbare gegevens) en gaf de
        opsporing nieuwe bevoegdheden. De bekendste is de bevoegdheid om <strong>heimelijk binnen te dringen in een
        geautomatiseerd werk</strong>: de hackbevoegdheid in <strong>artikel 126nba Sv</strong>.</p>

        <h3>Wanneer mag het?</h3>
        <ul>
          <li><strong>Bevel van de officier van justitie</strong>, en daarvoor eerst een
          <strong>machtiging van de rechter-commissaris</strong>.</li>
          <li>Bij <strong>verdenking van een ernstig misdrijf</strong> dat een ernstige inbreuk op de rechtsorde
          oplevert. Voor de zwaardere doelen gelden strengere drempels.</li>
          <li>Alleen voor de <strong>doelen die de wet noemt</strong>. Op hoofdlijnen: kenmerken vaststellen, zoals de
          identiteit of de locatie van het systeem of de gebruiker; vertrouwelijke communicatie opnemen; stelselmatig
          observeren; gegevens vastleggen; en gegevens ontoegankelijk maken. Het bevel noemt het doel. Wie meer wil,
          heeft een nieuw of aangevuld bevel nodig.</li>
          <li>Met een <strong>technisch hulpmiddel</strong> dat vooraf is gekeurd en dat vastlegt wat ermee gebeurt,
          zodat achteraf te controleren is wat het team deed.</li>
          <li><strong>Proportioneel en subsidiair</strong>: kan het ook met een vordering, een doorzoeking of een
          verzoek aan een hostingbedrijf, dan gaat dat voor.</li>
        </ul>

        <h3>Voorbeeld: het phishingpanel</h3>
        <p>Een phishingpanel draait achter een anonimiseringsdienst. Niemand weet waar de server staat. Een
        vordering aan een hostingbedrijf kan dan niet, want het hostingbedrijf is onbekend. In zo'n situatie kan
        het vaststellen van de locatie en de identiteit via binnendringen het enige middel zijn. Blijkt de server
        daarna in een ander land te staan, dan raakt het onderzoek aan de soevereiniteit van dat land en zijn
        internationale afspraken en rechtshulp aan de orde.</p>

        <h3>Waarom zo streng?</h3>
        <p>Binnendringen is een van de zwaarste inbreuken die er bestaan: het raakt vaak ook onschuldige gebruikers
        van hetzelfde systeem, het kan het systeem beschadigen, en een kwetsbaarheid die de overheid gebruikt, blijft
        intussen open voor anderen. Daarom kijkt er een onafhankelijke rechter vooraf mee, en wordt de inzet achteraf
        verantwoord.</p>
      `,
      lab: {
        type: 'scenario',
        title: 'Operatie Valse Kluis (fictief)',
        scenario: 'Een phishingpanel onderschept inloggegevens van klanten van de fictieve NederBank. Je bent tactisch rechercheur in het team. Er is een verdenking van oplichting en computervredebreuk in georganiseerd verband.',
        pass: 5,
        flag: 'NM{bevel_machtiging_doel}',
        steps: [
          { situation: 'Een collega heeft ontdekt dat het panel een Nederlands hostingbedrijf gebruikt, dat bereikbaar is en meewerkt. Wat is de volgende stap?', choices: [
            { label: 'De gegevens van het klantaccount en de serverlogs vorderen bij het hostingbedrijf', good: true, feedback: 'Goed. Een minder ingrijpend middel dat het doel kan bereiken, gaat voor (subsidiariteit).' },
            { label: 'Meteen binnendringen, dat is sneller', good: false, feedback: 'Sneller is geen wettelijke grond. Als een vordering werkt, is binnendringen niet subsidiair.' },
            { label: 'De server zelf offline halen via een DDoS', good: false, feedback: 'Daar is geen bevoegdheid voor, en je vernietigt sporen.' },
          ] },
          { situation: 'De hostinggegevens blijken een doorgeefluik. De echte server zit achter een anonimiseringsdienst; de locatie is onbekend. Het team wil binnendringen om de locatie en identiteit vast te stellen. Wie moet wat doen?', choices: [
            { label: 'De officier vraagt een machtiging aan de rechter-commissaris en geeft daarna het bevel', good: true, feedback: 'Goed. Machtiging van de RC vooraf, bevel van de OvJ.' },
            { label: 'De teamleider geeft het bevel, de officier tekent achteraf', good: false, feedback: 'Een teamleider kan dit bevel niet geven, en toestemming achteraf is te laat.' },
            { label: 'De rechter-commissaris geeft zelf het bevel', good: false, feedback: 'De RC machtigt; het bevel komt van de officier.' },
          ] },
          { situation: 'Het bevel noemt als doel: kenmerken vaststellen (locatie en identiteit). Eenmaal binnen ziet een collega de database met slachtoffergegevens en wil die meteen helemaal kopiëren. Wat doe je?', choices: [
            { label: 'Stoppen bij het doel uit het bevel en de officier vragen om een aangevuld bevel voor vastleggen van gegevens', good: true, feedback: 'Goed. Gegevens vastleggen is een ander doel. Daarvoor is een bevel nodig dat dat doel noemt.' },
            { label: 'Kopiëren, want de slachtoffers hebben er belang bij', good: false, feedback: 'Het belang is echt, maar de bevoegdheid ontbreekt. Wat je nu kopieert, kan later als onrechtmatig worden aangemerkt.' },
            { label: 'Alleen een paar records kopiëren, dat valt niet op', good: false, feedback: 'Een beetje buiten het bevel is nog steeds buiten het bevel.' },
          ] },
          { situation: 'Uit de vastgestelde kenmerken blijkt dat de server in een ander land staat. Wat nu?', choices: [
            { label: 'De officier inschakelen voor internationale afstemming en rechtshulp met dat land', good: true, feedback: 'Goed. De bevoegdheid stopt niet aan de grens als vraag, maar de soevereiniteit van het andere land telt mee.' },
            { label: 'Doorgaan alsof het een Nederlandse server is', good: false, feedback: 'Zodra de locatie bekend is, moet het onderzoek rekening houden met het andere land.' },
            { label: 'Het onderzoek stoppen en het dossier sluiten', good: false, feedback: 'Te snel opgegeven. Via rechtshulp en samenwerking kan het onderzoek verder.' },
          ] },
          { situation: 'De inzet is afgerond. Wat leg je vast?', choices: [
            { label: 'Een proces-verbaal met het bevel, de tijden, de handelingen, de logbestanden van het technisch hulpmiddel en wat er is vastgesteld', good: true, feedback: 'Goed. Zo kan de rechter controleren wat er precies is gebeurd.' },
            { label: 'Alleen het resultaat: de locatie en de identiteit', good: false, feedback: 'Zonder de weg ernaartoe is het resultaat niet te toetsen.' },
            { label: 'Niets, het was heimelijk', good: false, feedback: 'Heimelijk betekent: zonder dat de verdachte het weet. Niet: zonder verantwoording.' },
          ] },
        ],
      },
      questions: [
        { q: 'Neem alle vijf de beslissingen goed. Welke vlag verschijnt?', answer: ['NM{bevel_machtiging_doel}'],
          hints: ['Kies steeds het lichtste middel dat werkt, en de juiste volgorde van machtiging en bevel.', 'Het bevel bepaalt het doel. Alles daarbuiten vraagt om een nieuw bevel.', 'Bij een buitenlandse server: de officier en internationale afstemming.'],
          explain: 'Eerst vorderen, dan binnendringen met machtiging en bevel, binnen het doel blijven, internationaal afstemmen en alles verbaliseren.' },
        { q: 'Welke combinatie is nodig voordat een team heimelijk mag binnendringen op grond van artikel 126nba Sv?', options: ['Een bevel van de officier van justitie na een machtiging van de rechter-commissaris', 'Een bevel van de rechter-commissaris na een verzoek van de politie', 'Toestemming van de hulpofficier van justitie', 'Een vordering aan de eigenaar van de server'], answer: 0,
          wrong: { 1: 'De rollen zijn omgedraaid: de RC machtigt, de officier beveelt.', 2: 'Een hulpofficier heeft deze bevoegdheid niet.', 3: 'Een vordering is een ander, openlijk middel. Bij binnendringen weet de eigenaar het juist niet.' },
          explain: 'Machtiging van de RC vooraf, bevel van de OvJ, en alleen voor de doelen die in het bevel staan.' },
        { q: 'In beslismoment 3 wil een collega de database kopiëren. Welk doel uit de wet zou het bevel daarvoor moeten noemen?', options: ['Kenmerken vaststellen', 'Gegevens vastleggen', 'Gegevens ontoegankelijk maken', 'Stelselmatig observeren'], answer: 1,
          wrong: { 0: 'Dat is het doel dat het bevel al noemt: locatie en identiteit. Daar valt het kopiëren van een database niet onder.', 2: 'Ontoegankelijk maken betekent de gegevens onbruikbaar maken, bijvoorbeeld het panel uitschakelen. Kopiëren is iets anders.', 3: 'Observeren gaat over het volgen van gedrag, niet over het overnemen van een database.' },
          why: 'Rechters toetsen of wat er gebeurde binnen het bevel viel. Een kopie die buiten het doel valt, is precies het soort vormverzuim waar de verdediging naar zoekt.',
          explain: 'Kopiëren is gegevens vastleggen. Dat moet als doel in het bevel staan, met de machtiging die daarbij hoort.' },
      ],
    },

    {
      title: 'Taak 3: Gegevens vorderen',
      tryFirst: true,
      intro: '<p>Op je bureau liggen zeven concept-vorderingen in een fictieve oplichtingszaak. Controleer ze voordat ze de deur uitgaan: is de juiste persoon de afzender, gaat de vordering naar de juiste partij, en is er een machtiging als die nodig is?</p>',
      content: `
        <p>Veel digitaal bewijs ligt bij bedrijven: webshops, banken, hostingbedrijven, verhuurders. Met een
        <strong>vordering</strong> verplicht de opsporing zo'n partij om gegevens te verstrekken. De artikelen
        <strong>126nc tot en met 126nh Sv</strong> regelen dat voor gegevens die bedrijven en instellingen verwerken.
        Voor aanbieders van communicatiediensten, zoals telecomproviders, gelden aparte artikelen (126n en 126na).</p>

        <h3>Een trap van lichter naar zwaarder</h3>
        <table>
          <thead><tr><th>Soort gegevens</th><th>Wie vordert</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td>Identificerende gegevens: naam, adres, woonplaats, nummer, soort dienst (art. 126nc)</td><td>Opsporingsambtenaar, bij verdenking van een misdrijf</td><td>Wie is de klant achter een account?</td></tr>
            <tr><td>Andere opgeslagen gegevens (art. 126nd)</td><td>Officier van justitie, bij verdenking van een ernstiger misdrijf (waarvoor voorlopige hechtenis is toegelaten)</td><td>Transacties, inlogtijden met IP-adressen</td></tr>
            <tr><td>Gevoelige gegevens: godsdienst, ras, politieke gezindheid, gezondheid, seksueel leven, vakbondslidmaatschap (art. 126nf)</td><td>Officier van justitie, na schriftelijke machtiging van de rechter-commissaris</td><td>Een medisch dossier, lidmaatschap van een kerkgenootschap</td></tr>
          </tbody>
        </table>
        <p>Daarnaast kan de officier onder voorwaarden iemand die weet hoe een versleuteling werkt, vragen mee te
        werken aan ontsleutelen.</p>

        <h3>Grenzen die altijd gelden</h3>
        <ul>
          <li><strong>Niet aan de verdachte.</strong> Een vordering richt je niet aan de verdachte zelf. Niemand hoeft
          mee te werken aan zijn eigen veroordeling (het <em>nemo tenetur</em>-beginsel). Een verdachte kan dus niet
          met een vordering worden gedwongen zijn wachtwoord te geven.</li>
          <li><strong>Verschoningsgerechtigden</strong>, zoals advocaten, artsen en notarissen, hebben een
          beroepsgeheim. Voor gegevens die onder dat geheim vallen gelden bijzondere regels.</li>
          <li><strong>Proportioneel en subsidiair</strong>: vorder niet meer dan nodig. "Alle transacties van de
          afgelopen tien jaar" voor een fraude van drie maanden is te veel.</li>
          <li><strong>Vastleggen</strong>: wie vorderde, op welke grond, wanneer, wat werd gevraagd en wat werd
          ontvangen. Dat komt in het proces-verbaal.</li>
        </ul>

        <div class="callout tip">
          <strong>Werkwijze bij het controleren:</strong> bepaal per vordering eerst de soort gegevens, kijk dan in de
          trap welke rol daarbij hoort, en controleer tot slot aan wie de vordering is gericht.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'concept-vorderingen zaak 2026-204 (fictief), verdenking: oplichting (art. 326 Sr)',
        lines: `VG-1  aan: webshop PolderParts BV        gegevens: naam en afleveradres bij klantaccount "kooltje88"          afzender: rechercheur T. de Boer   machtiging RC: n.v.t.
VG-2  aan: betaalbedrijf PayStroom BV     gegevens: alle transacties van rekening NL00FICT0000000001, jan t/m mrt 2026   afzender: rechercheur T. de Boer   machtiging RC: n.v.t.
VG-3  aan: huisartsenpost De Linde        gegevens: medisch dossier van de verdachte                          afzender: officier van justitie    machtiging RC: nee
VG-4  aan: hostingbedrijf Kadehost BV     gegevens: inloglogs met IP-adres en tijdstip van klantaccount 4471  afzender: officier van justitie    machtiging RC: n.v.t.
VG-5  aan: de verdachte                   gegevens: wachtwoord van zijn versleutelde laptop                   afzender: officier van justitie    machtiging RC: n.v.t.
VG-6  aan: kerkgenootschap Het Anker      gegevens: lidmaatschap en contributiebetalingen van de verdachte   afzender: officier van justitie    machtiging RC: ja, d.d. 2026-06-02
VG-7  aan: autoverhuur Rijwiel BV         gegevens: naam en adres van de huurder van kenteken XX-000-X op 3 mei afzender: rechercheur T. de Boer   machtiging RC: n.v.t.`,
      },
      questions: [
        { q: 'Hoeveel van de zeven concept-vorderingen kunnen niet zo de deur uit?', answer: ['3', 'drie'],
          hints: ['Bepaal per regel de soort gegevens en zoek in de trap wie daarbij hoort.', 'Let ook op de geadresseerde en op de kolom machtiging RC.', 'Eén zit fout in de afzender, één in de machtiging, één in de geadresseerde.'],
          wrong: { '2': 'Kijk ook naar de geadresseerde. Een vordering aan de verdachte zelf kan niet.', '4': 'VG-6 is in orde: gevoelige gegevens, gevorderd door de officier, mét machtiging van de rechter-commissaris.' },
          explain: 'Drie: VG-2 (transacties zijn geen identificerende gegevens, dus de officier moet vorderen), VG-3 (gezondheidsgegevens zonder machtiging) en VG-5 (gericht aan de verdachte).' },
        { q: 'Welke vordering mist een machtiging van de rechter-commissaris?', answer: ['VG-3', 'vg3', 'vg 3'],
          hints: ['Zoek gegevens uit de categorie gevoelig.', 'Gezondheid hoort daarbij.', 'De regel met machtiging RC: nee.'],
          wrong: { 'VG-6': 'Ook gevoelig (godsdienst), maar hier is de machtiging er wel.', 'VG-2': 'Die zit fout in de afzender, niet in de machtiging. Transacties vragen een vordering van de officier, geen machtiging.' },
          explain: 'VG-3 vraagt een medisch dossier. Gezondheidsgegevens zijn gevoelig: de officier vordert, maar pas na schriftelijke machtiging van de rechter-commissaris.' },
        { q: 'Welke vordering is aan de verkeerde partij gericht?', answer: ['VG-5', 'vg5', 'vg 5'],
          hints: ['Lees de kolom "aan".', 'Een vordering kan niet naar één bepaalde persoon in de zaak.', 'Niemand hoeft mee te werken aan zijn eigen veroordeling.'],
          explain: 'VG-5 is gericht aan de verdachte. Een vordering kan niet aan de verdachte worden gericht; voor de laptop zijn andere wegen nodig, zoals onderzoek aan de in beslag genomen gegevensdrager.' },
        { q: 'Hoe maak je VG-2 in orde?', options: ['De officier van justitie laat de vordering uitgaan in plaats van de rechercheur', 'Een machtiging van de rechter-commissaris toevoegen', 'De vordering richten aan de verdachte, die de transacties ook kent', 'De periode uitbreiden naar het hele jaar, dan is hij volledig'], answer: 0,
          wrong: { 1: 'Transacties zijn geen gevoelige gegevens. Een machtiging is niet nodig; wel een andere afzender.', 2: 'Een vordering kan niet aan de verdachte worden gericht.', 3: 'Meer vragen maakt de vordering niet rechtmatiger. Vraag wat nodig is voor de verdenking.' },
          explain: 'Transacties zijn andere opgeslagen gegevens. Die vordert de officier van justitie; oplichting met een strafmaximum van vier jaar is een misdrijf waarvoor voorlopige hechtenis is toegelaten.' },
      ],
    },

    {
      title: 'Taak 4: Doorzoeken, in beslag nemen en de smartphone',
      tryFirst: true,
      intro: '<p>Je bent bij een doorzoeking in de woning van een verdachte. Op het bureau staat een draaiende computer, ernaast een ontgrendelde telefoon. Zet in het lab de zeven stappen in de juiste volgorde. Vraag je bij elke stap af wat er verloren gaat als je hem te laat zet.</p>',
      content: `
        <h3>Inbeslagneming en doorzoeking</h3>
        <p>Voorwerpen die kunnen dienen om de waarheid aan het licht te brengen, kunnen in beslag worden genomen
        (art. 94 Sv). Een opsporingsambtenaar mag dat onder meer bij ontdekking op heterdaad. Een
        <strong>doorzoeking</strong> gaat verder: actief zoeken in een plaats. In een woning is dat een zware inbreuk
        op het huisrecht, die de wet in de regel bij de rechter-commissaris legt; alleen bij spoed en onder strikte
        voorwaarden bij de officier van justitie.</p>
        <p>Voor gegevens gelden aanvullende regels. Tijdens een doorzoeking mogen gegevens die op de plaats aanwezig
        zijn, worden vastgelegd (art. 125i Sv). Met een <strong>netwerkzoeking</strong> (art. 125j Sv) mag vanaf
        die plaats ook worden gezocht in gegevens die elders zijn opgeslagen, zoals een cloudmap, voor zover die
        vanaf die plaats rechtmatig toegankelijk zijn voor wie daar woont of werkt. Staat die opslag in het
        buitenland, dan spelen internationale vragen mee.</p>

        <h3>De volgorde van vluchtig naar vast</h3>
        <p>Digitaal bewijs verdwijnt in een vaste volgorde: eerst het werkgeheugen (open verbindingen, sleutels,
        draaiende processen), dan wat alleen bereikbaar is zolang het apparaat aan staat (ingelogde cloudsessies),
        en pas daarna wat op de schijf staat. Zet je een computer met volledige schijfversleuteling uit, dan is de
        sleutel uit het werkgeheugen verdwenen. Een telefoon die verbinding houdt met het netwerk, kan op afstand
        worden gewist; een afgeschermde zak (Faraday-zak) of vliegtuigmodus voorkomt dat.</p>

        <h3>De smartphone: drie niveaus</h3>
        <p>De Hoge Raad oordeelde op 4 april 2017 over onderzoek aan een in beslag genomen smartphone. Het
        uitgangspunt sindsdien:</p>
        <ul>
          <li><strong>Beperkt onderzoek</strong>, een geringe inbreuk op de privacy: de opsporingsambtenaar.
          Bijvoorbeeld de laatst gebelde nummers bekijken.</li>
          <li><strong>Meer ingrijpend onderzoek</strong>, waarmee een min of meer compleet beeld van aspecten van
          het privéleven ontstaat: de officier van justitie.</li>
          <li><strong>Zeer ingrijpend onderzoek</strong>, met een zeer verregaand beeld van het privéleven: de
          rechter-commissaris, op vordering van de officier.</li>
        </ul>
        <p>Het gaat dus niet om de techniek, maar om hoeveel van iemands leven je ziet. Leg in het proces-verbaal
        vast wat je zocht, met welke afbakening en wie toestemming gaf.</p>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de stappen bij de doorzoeking in de juiste volgorde, van eerste naar laatste.',
        items: [
          { id: 'a', label: 'Controleren dat er een geldige last is en wat die dekt' },
          { id: 'b', label: 'Plaats vastleggen: foto\'s van de werkplek en van wat er op het scherm staat' },
          { id: 'c', label: 'Werkgeheugen van de draaiende computer kopiëren' },
          { id: 'd', label: 'Netwerkzoeking: de ingelogde cloudmap vastleggen' },
          { id: 'e', label: 'Computer uitschakelen; telefoon in een Faraday-zak' },
          { id: 'f', label: 'Labelen, verzegelen en hashwaarden van kopieën berekenen' },
          { id: 'g', label: 'Proces-verbaal opmaken met tijden, middelen en hashwaarden' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        flag: 'NM{eerst_vluchtig_dan_uit}',
        explain: 'Eerst de grondslag, dan de toestand vastleggen zoals je hem aantreft, dan van vluchtig naar vast, en pas daarna uitschakelen, verzegelen en verbaliseren.',
      },
      questions: [
        { q: 'Zet de stappen in de goede volgorde. Welke vlag verschijnt?', answer: ['NM{eerst_vluchtig_dan_uit}'],
          hints: ['Begin met de vraag of je hier wel mag zijn.', 'Wat verdwijnt als de stroom eraf gaat, komt vóór het uitschakelen. Wat alleen bereikbaar is via een ingelogde sessie ook.', 'a, b, c, d, e, f, g.'],
          explain: 'Last controleren, vastleggen, geheugen, cloudmap, uitschakelen, verzegelen met hashwaarden, verbaliseren.' },
        { q: 'Een collega wil de computer direct uitschakelen "zodat er niets meer verandert". Wat gaat er dan waarschijnlijk verloren?', options: ['De inhoud van het werkgeheugen, waaronder mogelijk de sleutel van een versleutelde schijf, en de toegang tot de ingelogde cloudmap', 'Niets, alles staat ook op de harde schijf', 'Alleen de datum en tijd van de computer', 'De hashwaarden van de bestanden'], answer: 0,
          wrong: { 1: 'Werkgeheugen staat niet op de schijf, en bij volledige schijfversleuteling is de schijf zonder sleutel onleesbaar.', 2: 'Die kun je ook later uitlezen. Het grote verlies zit in wat vluchtig is.', 3: 'Hashwaarden bereken je over je kopie; die gaan niet verloren door uitschakelen.' },
          why: 'Een uitgeschakelde, versleutelde laptop kan voor altijd dicht blijven. Wie de volgorde kent, kiest bewust; wie hem niet kent, beslist per ongeluk.',
          explain: 'Uitschakelen bevriest de schijf, maar wist het werkgeheugen en verbreekt ingelogde sessies. Daarom komt het veiligstellen daarvan eerst.' },
        { q: 'Een rechercheur wil op de in beslag genomen telefoon alle chats, foto\'s en locatiegegevens van de afgelopen twee jaar doornemen om een volledig beeld van het leven van de verdachte te krijgen. Wie beslist daarover?', options: ['De rechercheur zelf', 'De officier van justitie', 'De rechter-commissaris, op vordering van de officier van justitie', 'Niemand: dit onderzoek is nooit toegestaan'], answer: 2,
          wrong: { 0: 'Dat zou alleen gelden voor beperkt onderzoek, zoals een blik op de laatst gebelde nummers.', 1: 'De officier beslist over meer ingrijpend onderzoek. Een volledig beeld van twee jaar privéleven is zeer ingrijpend.', 3: 'Het kan wel, maar alleen met toetsing door de rechter-commissaris vooraf.' },
          explain: 'Een zeer verregaand beeld van iemands privéleven is zeer ingrijpend onderzoek. Dan toetst de rechter-commissaris vooraf.' },
      ],
    },

    {
      title: 'Taak 5: Goed verbaliseren',
      tryFirst: true,
      intro: '<p>Een collega heeft een concept-proces-verbaal geschreven over het onderzoek aan een telefoon. In het lab staat het, regel voor regel. Zoek de regels waar een rechter, een advocaat of een tweede onderzoeker niet mee uit de voeten kan, en die ene regel die de hele zaak in gevaar kan brengen.</p>',
      content: `
        <p>Een opsporingsambtenaar maakt <strong>ten spoedigste</strong> proces-verbaal op van wat hij heeft gedaan en
        waargenomen (art. 152 Sv). Het proces-verbaal is een wettig bewijsmiddel en de rechter mag het bewijs dat de
        verdachte het feit heeft begaan in beginsel zelfs aannemen op het proces-verbaal van één opsporingsambtenaar
        (art. 344 lid 2 Sv). Juist daarom moet het kloppen, volledig zijn en controleerbaar.</p>

        <h3>Wat erin moet</h3>
        <ul>
          <li><strong>Wie</strong>: naam, functie en dienstnummer of registratienummer van de verbalisant.</li>
          <li><strong>Wanneer</strong>: datum en tijd van elke handeling, met de tijdzone als die ertoe doet.</li>
          <li><strong>Waar en waarop</strong>: welke gegevensdrager, met een uniek kenmerk (beslagnummer, IMEI).</li>
          <li><strong>Op grond waarvan</strong>: welke bevoegdheid, welk bevel of welke machtiging, met kenmerk.</li>
          <li><strong>Hoe en met welke middelen</strong>: welke software en welke versie, welke hardware (zoals een
          schrijfblokkering), welke methode.</li>
          <li><strong>Integriteit</strong>: hashwaarden van het origineel of de kopie, zodat iedereen kan controleren
          dat er niets is veranderd.</li>
          <li><strong>Herhaalbaar</strong>: een andere onderzoeker moet met dezelfde stappen tot dezelfde uitkomst
          kunnen komen.</li>
        </ul>

        <h3>Waarneming en conclusie apart</h3>
        <p>Schrijf wat je zag, niet wat je denkt dat het betekent. "In de map Downloads trof ik het bestand
        <code>panel.zip</code> aan, aangemaakt op 2026-04-02 21:14 UTC" is een waarneming. "De verdachte heeft het
        phishingpanel gebouwd" is een conclusie die de rechter trekt, op basis van alle waarnemingen samen. Een
        conclusie vermomd als waarneming ondermijnt de geloofwaardigheid van het hele stuk.</p>

        <h3>Een voorbeeld van een goede regel</h3>
        <pre><code>Op dinsdag 14 april 2026 omstreeks 10:12 uur (CEST) heb ik, [naam], [dienstnummer],
de telefoon met beslagnummer B-2026-0412-02 (IMEI 35XXXXXXXXXXXXX) onderzocht op grond
van het bevel van de officier van justitie d.d. 11 april 2026, kenmerk OvJ-2026-188.
Ik maakte een logische kopie met [programma] versie [x.y] op werkstation FR-03.
SHA-256 van het kopiebestand: [64 hexadecimale tekens].</code></pre>

        <div class="callout warn">
          <strong>Een handeling zonder grondslag in het proces-verbaal</strong> is twee problemen tegelijk: de
          handeling zelf kan onrechtmatig zijn, en het verbaal laat de rechter dat ook zien. Weglaten is geen optie:
          een proces-verbaal moet naar waarheid zijn.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'concept PV-2026-0412-03 (fictief)',
        lines: `r01  PROCES-VERBAAL VAN BEVINDINGEN, nummer PV-2026-0412-03
r02  Verbalisant: rechercheur, team Digitale Recherche
r03  Op dinsdag heb ik de telefoon van de verdachte onderzocht.
r04  Ik heb een kopie gemaakt met een forensisch programma.
r05  SHA-256 van het kopiebestand: 4e1f0a9c7b23d8e5f61a02bc94d7e3a8c5b06f12d9e47a3b8c01f5e6d2a97b4c
r06  Uit de chats blijkt dat de verdachte de dader is.
r07  Het onderzoek vond plaats op grond van het bevel van de officier van justitie d.d. 2026-04-11, kenmerk OvJ-2026-188.
r08  In de map WhatsApp/Media trof ik 214 afbeeldingen aan; 3 daarvan tonen de inlogpagina van "NederBank" (bijlage 2).
r09  Daarna heb ik via de app nog even in zijn cloudaccount gekeken; daar stond niets bijzonders.
r10  Dit proces-verbaal is door mij opgemaakt op ambtseed en gesloten op 2026-04-14.`,
      },
      questions: [
        { q: 'Hoeveel regels moeten worden aangepast voordat dit proces-verbaal klaar is?', answer: ['5', 'vijf'],
          hints: ['Loop de lijst "Wat erin moet" langs en zoek per punt de regel die het niet haalt.', 'Kijk ook naar een conclusie vermomd als waarneming, en naar een handeling zonder genoemde grondslag.', 'Wie, wanneer, welk programma, een conclusie, en de cloud.'],
          wrong: { '4': 'Je mist er één. Let op r02: zonder naam en nummer weet niemand wie er verbaliseert.', '3': 'Er zijn er meer. Wie, wanneer en met welk programma ontbreken alle drie, en dan zijn er nog r06 en r09.', '6': 'r05, r07, r08 en r10 zijn in orde. Een hashwaarde van 64 tekens is een volledige SHA-256.' },
          explain: 'Vijf: r02 (naam en nummer ontbreken), r03 (geen datum, tijd of beslagnummer), r04 (geen programma en versie), r06 (conclusie in plaats van waarneming) en r09 (handeling zonder genoemde grondslag).' },
        { q: 'Welke regel beschrijft een handeling waarvoor uit het proces-verbaal geen bevoegdheid blijkt? (bijvoorbeeld r01)', answer: ['r09', 'r 09', '9', '09'],
          hints: ['Het bevel in r07 gaat over de telefoon.', 'Zoek een handeling die verder reikt dan het toestel zelf.', 'Gegevens die niet op de telefoon staan, maar elders.'],
          wrong: { 'r06': 'r06 is een slechte formulering, geen handeling. Die repareer je door de waarneming te beschrijven.', 'r04': 'Onvolledig, maar het kopiëren van de telefoon valt onder het bevel uit r07.' },
          why: 'Een cloudaccount staat niet op de telefoon. Het bevel voor het onderzoek aan het toestel dekt dat niet vanzelf. Een rechter zal vragen op welke grond dat gebeurde, en dat het niets opleverde, maakt de vraag niet minder.',
          explain: 'r09: via de app in een cloudaccount kijken gaat verder dan het onderzoek aan de telefoon waarvoor het bevel was gegeven. Dat moet de officier weten; het proces-verbaal moet het naar waarheid vermelden.' },
        { q: 'Hoe herschrijf je r06 het best?', options: ['In de chat met contact "Bram" van 2 april 2026 om 21:30 staat het bericht "panel staat live, eerste logins binnen" (bijlage 3)', 'Uit de chats blijkt overduidelijk dat de verdachte de dader is', 'De verdachte is volgens mij betrokken bij de phishing', 'Regel r06 schrappen, want conclusies horen er niet in en de chats zijn niet relevant'], answer: 0,
          wrong: { 1: 'Nog steeds een conclusie, nu met nadruk. De rechter moet zelf kunnen zien waarop je je baseert.', 2: 'Een mening is geen waarneming, ook niet als je hem voorzichtig formuleert.', 3: 'De conclusie gaat eruit, maar de waarneming waarop hij rust, hoort er juist in.' },
          explain: 'Beschrijf wat je zag: welk bericht, van wie, wanneer, en waar het te vinden is. Dan kan de rechter zelf de conclusie trekken.' },
      ],
    },

    {
      title: 'Taak 6: Een spoor buiten de grenzen',
      tryFirst: true,
      intro: '<p>In het lab staat de tijdlijn van een fictief onderzoek naar een phishingpanel, met per handeling het nummer van het proces-verbaal. Eén handeling valt buiten het doel van het bevel waarop ze rust, en één gebeurt nadat een bevel was verlopen. Vind ze allebei.</p>',
      content: `
        <h3>Vormverzuimen en artikel 359a Sv</h3>
        <p>Als bij het voorbereidend onderzoek een vormvoorschrift niet is nageleefd en dat niet meer te herstellen
        is, kan de rechter daar volgens <strong>artikel 359a Sv</strong> gevolgen aan verbinden. De wet noemt:</p>
        <ul>
          <li><strong>strafvermindering</strong>, als het nadeel daarmee kan worden gecompenseerd;</li>
          <li><strong>bewijsuitsluiting</strong>: wat door het verzuim is verkregen, mag niet bijdragen aan het bewijs;</li>
          <li><strong>niet-ontvankelijkheid</strong> van het Openbaar Ministerie: de zaak stopt. Dat gebeurt alleen in
          uitzonderlijke gevallen.</li>
        </ul>
        <p>De rechter kan ook volstaan met de vaststelling dát er een verzuim is. Hij weegt daarbij het belang van het
        geschonden voorschrift, de ernst van het verzuim en het nadeel dat erdoor is veroorzaakt. Er is dus geen
        automatisme: niet elk verzuim kost bewijs, maar je kunt er nooit op rekenen dat het meevalt.</p>

        <h3>Zo zoek je een verzuim in een dossier</h3>
        <ol>
          <li>Zet elk bevel en elke machtiging op de tijdlijn met <strong>doel, reikwijdte en geldigheidsduur</strong>.</li>
          <li>Leg elke handeling ernaast: valt ze binnen het doel, binnen de tijd, bij de juiste persoon of het
          juiste systeem?</li>
          <li>Volg wat er uit een twijfelachtige handeling voortkwam. Bewijs dat rechtstreeks uit een verzuim volgt,
          kan ook worden geraakt.</li>
        </ol>

        <h3>Andere bevoegdheden die in de tijdlijn voorkomen</h3>
        <p>Een rechercheur die met een niet als politie herkenbaar profiel <strong>stelselmatig</strong> informatie
        inwint over een verdachte, bijvoorbeeld wekenlang chatten, heeft een bevel van de officier nodig
        (art. 126j Sv). Hetzelfde geldt voor stelselmatige observatie (art. 126g Sv). Eén keer een openbaar profiel
        bekijken is niet stelselmatig; een maand lang een vertrouwensband opbouwen wel.</p>

        <div class="callout tip">
          <strong>Tip voor het lab:</strong> markeer de bevelen met een ster, noteer hun doel en einddatum, en
          filter daarna op de handelingen die erop steunen.
        </div>
      `,
      lab: {
        type: 'timeline',
        title: 'Zaak 2026-118, phishingpanel NederBank (fictief)',
        events: [
          { t: '2026-05-04 10:00:00', src: 'Aangifte', host: '-', desc: 'Aangifte door NederBank (fictief): klanten krijgen sms met link naar valse inlogpagina. PV-118-01' },
          { t: '2026-05-06 14:00:00', src: 'Vordering', host: 'Kadehost BV', user: 'rechercheur', desc: 'Vordering identificerende gegevens klantaccount bij hostingbedrijf: naam en adres. PV-118-02' },
          { t: '2026-05-07 09:15:00', src: 'Vordering', host: 'Kadehost BV', desc: 'Antwoord: account op naam van een niet-bestaand bedrijf, betaald met cryptovaluta. Server is doorgeefluik. PV-118-02' },
          { t: '2026-05-08 09:30:00', src: 'Bevel', host: 'panel-server', user: 'officier van justitie', desc: 'Na machtiging RC: bevel 126nba, doel: kenmerken vaststellen (locatie en identiteit). Geldig tot 2026-06-05. PV-118-03' },
          { t: '2026-05-12 22:10:00', src: 'Binnendringen', host: 'panel-server', user: 'team DR', desc: 'Binnengedrongen met gekeurd hulpmiddel; IP-adres 198.51.100.66 en hostnaam vastgesteld; logbestand hulpmiddel bewaard. PV-118-04' },
          { t: '2026-05-13 01:40:00', src: 'Binnendringen', host: 'panel-server', user: 'team DR', desc: 'Volledige database van het panel gekopieerd: 31.000 records met inloggegevens van slachtoffers. PV-118-05' },
          { t: '2026-05-14 11:00:00', src: 'Bevel', host: '-', user: 'officier van justitie', desc: 'Bevel 126j: stelselmatig informatie inwinnen via een niet herkenbaar profiel op een chatdienst. Geldig tot 2026-07-14. PV-118-06' },
          { t: '2026-05-15 20:00:00', src: 'Infiltratie', host: 'chatdienst', user: 'rechercheur', desc: 'Start gesprekken met beheerder van het panel als "geïnteresseerde koper". PV-118-07' },
          { t: '2026-05-20 10:00:00', src: 'Vordering', host: 'PayStroom BV', user: 'officier van justitie', desc: 'Vordering transacties van de rekening waarop de panelhuur werd betaald. PV-118-08' },
          { t: '2026-05-27 07:00:00', src: 'Doorzoeking', host: 'woning verdachte', user: 'rechter-commissaris', desc: 'Doorzoeking onder leiding van de RC; laptop en telefoon in beslag genomen. PV-118-09' },
          { t: '2026-05-28 09:00:00', src: 'Onderzoek', host: 'laptop', user: 'team DR', desc: 'Kopie laptop met schrijfblokkering; hashwaarden vastgelegd. PV-118-10' },
          { t: '2026-06-03 14:20:00', src: 'Infiltratie', host: 'chatdienst', user: 'rechercheur', desc: 'Beheerder noemt een tweede panel voor een andere bank. PV-118-07' },
          { t: '2026-06-10 23:05:00', src: 'Binnendringen', host: 'panel-server', user: 'team DR', desc: 'Opnieuw binnengedrongen om te controleren of het panel nog draait. PV-118-11' },
        ],
      },
      questions: [
        { q: 'Welk proces-verbaal beschrijft een handeling die plaatsvond nadat het bevel waarop ze steunt, was verlopen?', answer: ['PV-118-11', 'pv11', 'pv-11', '118-11', 'pv 118-11'],
          hints: ['Zoek de einddatum van elk bevel.', 'Het hackbevel liep tot 5 juni.', 'Filter op Binnendringen en kijk naar de datum.'],
          wrong: { 'PV-118-07': 'De gesprekken op 3 juni vallen binnen het bevel 126j, dat liep tot 14 juli.', 'PV-118-05': 'Die handeling viel binnen de tijd van het bevel, maar er is iets anders mee aan de hand.' },
          explain: 'PV-118-11: op 10 juni drong het team opnieuw binnen, terwijl het bevel op 5 juni was verlopen. Daarvoor was een nieuw of verlengd bevel nodig.' },
        { q: 'Een advocaat stelt dat PV-118-07 onrechtmatig is omdat de rechercheur zich niet als politie bekendmaakte. Klopt dat, op basis van de tijdlijn?', options: ['Nee: er lag een bevel van de officier voor stelselmatige informatie-inwinning en de gesprekken vielen binnen de geldigheid', 'Ja: een rechercheur moet zich altijd als politie bekendmaken', 'Ja: hiervoor is altijd een machtiging van de rechter-commissaris nodig', 'Nee: chatten is nooit stelselmatig'], answer: 0,
          wrong: { 1: 'Dan zou elke vorm van heimelijk inwinnen onmogelijk zijn. De wet staat het toe met een bevel.', 2: 'Voor stelselmatige informatie-inwinning is een bevel van de officier de eis; een machtiging van de RC niet.', 3: 'Wekenlang gesprekken voeren om informatie te krijgen is juist stelselmatig. Daarom was het bevel nodig.' },
          explain: 'Het bevel 126j van 14 mei dekte de gesprekken van 15 mei tot en met 3 juni.' },
        { q: 'Wat gebeurt er naar alle waarschijnlijkheid met een verzuim zoals in deze tijdlijn, als de zaak voor de rechter komt?', options: ['Het bewijs wordt automatisch uitgesloten en de zaak stopt', 'De rechter weegt het belang van het voorschrift, de ernst van het verzuim en het nadeel, en kiest dan een gevolg, of volstaat met de vaststelling', 'Niets, want de verdachte is een crimineel', 'De officier kan het verzuim achteraf herstellen door alsnog een bevel te tekenen'], answer: 1,
          wrong: { 0: 'Er is geen automatisme. Niet-ontvankelijkheid is uitzonderlijk.', 2: 'Wie verdachte is, doet niet ter zake voor de vraag of de overheid zich aan de regels hield.', 3: 'Een bevel achteraf maakt een handeling zonder bevel niet alsnog rechtmatig.' },
          explain: 'Artikel 359a Sv geeft de rechter ruimte: van de vaststelling van het verzuim tot strafvermindering, bewijsuitsluiting of in uitzonderlijke gevallen niet-ontvankelijkheid.' },
        { q: 'Welk proces-verbaal beschrijft een handeling die wel binnen de tijd viel, maar buiten het doel van het bevel waarop ze steunde?', answer: ['PV-118-05', 'pv05', 'pv-05', '118-05', 'pv 118-05', 'pv5'], boss: true,
          hints: ['Lees bij elk bevel wat het doel is, niet alleen de datum.', 'Het hackbevel noemt één doel. Welke handeling op de panelserver gaat verder dan dat doel?', 'Vergelijk met beslismoment 3 in taak 2: kenmerken vaststellen is iets anders dan gegevens vastleggen.'],
          wrong: { 'PV-118-04': 'Daar stelde het team IP-adres en hostnaam vast: precies het doel van het bevel.', 'PV-118-11': 'Die viel buiten de tijd, niet buiten het doel. Gevraagd is de handeling die binnen de geldigheid viel.', 'PV-118-09': 'De doorzoeking stond onder leiding van de RC en is in orde.' },
          why: 'De database met 31.000 slachtofferrecords is misschien het sterkste bewijs in de zaak. Juist daarom is het zo kostbaar als het is verkregen buiten het doel van het bevel: de verdediging zal er als eerste naar kijken.',
          explain: 'PV-118-05: het bevel noemde alleen kenmerken vaststellen, maar het team kopieerde de hele database. Dat is gegevens vastleggen, een ander doel waarvoor een aangevuld bevel nodig was. Je vond het door het doel van het bevel naast de handeling op de tijdlijn te leggen.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: grenzen, landen en een nieuw wetboek',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Digitaal bewijs houdt zich niet aan grenzen. Een Nederlandse verdachte gebruikt een mailbox die bij een
        Amerikaans bedrijf staat, op servers in Ierland, terwijl het phishingpanel in weer een ander land draait.
        Drie ontwikkelingen bepalen hoe de opsporing daarmee omgaat.</p>

        <h3>1. Het Cybercrimeverdrag van Budapest</h3>
        <p>Het Verdrag inzake cybercriminaliteit van de Raad van Europa (Boedapest, 2001) is het oudste en breedste
        verdrag op dit gebied. Het harmoniseert strafbare feiten, zoals computervredebreuk, en regelt samenwerking
        tussen landen, onder meer het snel bewaren van gegevens in afwachting van een rechtshulpverzoek. Een Tweede
        Aanvullend Protocol (2022) maakt directe samenwerking met dienstverleners in andere verdragslanden makkelijker.
        Ook landen buiten Europa zijn partij.</p>

        <h3>2. De e-evidence-verordening</h3>
        <p>Binnen de EU regelt Verordening (EU) 2023/1543 Europese verstrekkings- en bewaringsbevelen: een
        justitiële autoriteit in het ene land kan een dienstverlener in een ander EU-land rechtstreeks opdragen
        gegevens te bewaren of te verstrekken, met waarborgen en in sommige gevallen een melding aan het andere land.
        De verordening is van toepassing vanaf augustus 2026; controleer de actuele stand van de uitvoering.</p>

        <h3>3. Een nieuw Wetboek van Strafvordering</h3>
        <p>Het huidige wetboek dateert in de kern uit 1926 en is talloze keren aangepast. Daarom is er een volledig
        nieuw Wetboek van Strafvordering in de maak, dat de bevoegdheden opnieuw ordent en onder meer het onderzoek
        aan in beslag genomen gegevensdragers, zoals de smartphone uit taak 4, in de wet zelf regelt in plaats van via
        rechtspraak. Het is nog niet in werking. Controleer de actuele status en de beoogde datum van inwerkingtreding
        op rijksoverheid.nl of wetten.overheid.nl. Tot die tijd gelden de artikelen uit deze room.</p>

        <h3>Wat dit betekent voor de rechercheur</h3>
        <ul>
          <li>Vraag bij elk spoor: waar staan de gegevens, wie beheert ze, en welk land heeft er zeggenschap over?</li>
          <li>Laat een buitenlandse dienstverlener eerst gegevens bewaren, zodat ze er nog zijn als het rechtshulpverzoek
          of bevel rond is.</li>
          <li>Een netwerkzoeking vanaf een plaats in Nederland naar opslag in het buitenland is juridisch gevoelig. Leg
          vast wat je wist over de locatie op het moment dat je zocht, en overleg met de officier.</li>
          <li>Bij twijfel: niet doen, eerst vragen. Een uur wachten kost minder dan een zaak die strandt op een
          vormverzuim.</li>
        </ul>
      `,
      questions: [
        { q: 'Een mailbox van een verdachte staat bij een dienstverlener in een ander EU-land. Je vreest dat de gegevens worden gewist voordat een verstrekkingsbevel rond is. Wat vraag je het eerst?', options: ['Dat de dienstverlener de gegevens bewaart (een bewaringsbevel)', 'Dat de verdachte zijn wachtwoord afgeeft', 'Niets: een buitenlandse dienstverlener valt buiten bereik', 'Een netwerkzoeking vanaf het politiebureau'], answer: 0,
          wrong: { 1: 'Een verdachte kan niet worden gedwongen mee te werken aan zijn eigen veroordeling.', 2: 'Juist daarvoor zijn het Cybercrimeverdrag en de e-evidence-verordening er.', 3: 'Een netwerkzoeking vertrekt vanaf de plaats van een doorzoeking, niet vanaf het bureau, en raakt bij buitenlandse opslag aan de soevereiniteit van een ander land.' },
          explain: 'Eerst bewaren, dan verstrekken. Zo blijft het bewijs bestaan terwijl de formele weg wordt gevolgd.' },
        { q: 'Het verdrag van Boedapest is uit 2001. Hoeveel jaar later kwam het Tweede Aanvullend Protocol?', answer: ['21', 'eenentwintig'],
          hints: ['Zoek beide jaartallen in de tekst.', '2022 min 2001.', 'Iets meer dan twintig.'],
          explain: '21 jaar. In die tijd veranderde digitaal bewijs van vooral lokale schijven naar vooral gegevens bij dienstverleners in andere landen.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Vragen over opsporingsbevoegdheden geven je een korte casus en vragen wie toestemming moet geven, welke
        bevoegdheid past, of wat er mis is gegaan. De afleiders zijn bijna-goede antwoorden: de juiste persoon met de
        verkeerde handeling (de rechter-commissaris die een bevel geeft), of een bevoegdheid die bij een ander soort
        gegevens hoort. Vraag je steeds af hoe zwaar de inbreuk is en waar de gegevens zich bevinden.</p>
        <p>De vijf vragen zijn zelf geschreven in die stijl. Alle zaken en organisaties zijn fictief, en de vragen zijn
        geen juridisch advies. Het lab bevat het dossierfragment bij vraag 5.</p>
      `,
      lab: {
        type: 'logs',
        title: 'vraag 5: dossierfragment zaak 2026-301 (fictief)',
        lines: `2026-09-01  Bevel OvJ 126nba, doel: kenmerken vaststellen (locatie, identiteit) van server "markt-x". Geldig tot 2026-09-29.
2026-09-03  Binnengedrongen; IP-adres en hostingland vastgesteld. Logbestand hulpmiddel bewaard.
2026-09-03  Tijdens dezelfde inzet: alle berichten van de beheerder van "markt-x" gekopieerd (12.400 berichten).
2026-09-10  Op basis van die berichten: verdachte aangehouden.`,
      },
      questions: [
        { q: 'Een rechercheur wil weten op wiens naam een prepaid telefoonnummer staat. Welke combinatie past?',
          options: ['De rechercheur vordert de gebruikersgegevens bij de telecomaanbieder', 'De officier vordert de inhoud van alle berichten na machtiging van de rechter-commissaris', 'De rechter-commissaris geeft een bevel tot binnendringen in de telefoon', 'De rechercheur doorzoekt de woning van de vermoedelijke gebruiker'], answer: 0,
          wrong: { 1: 'Veel zwaarder dan nodig: de vraag is alleen wie de gebruiker is.', 2: 'De rollen kloppen niet, en binnendringen is niet subsidiair als een vordering werkt.', 3: 'Een doorzoeking vraagt eerst een verdachte en een machtiging. De naam opvragen is de eerste stap.' },
          explain: 'Gebruikersgegevens zoals naam en adres bij een communicatieaanbieder vordert de opsporingsambtenaar. Dat is de lichtste weg naar het antwoord.' },
        { q: 'Een officier van justitie wil het patiëntendossier van een verdachte bij een ziekenhuis vorderen. Wat is nodig?',
          options: ['Alleen een vordering van de officier', 'Een vordering van de officier na schriftelijke machtiging van de rechter-commissaris, met oog voor het beroepsgeheim van de arts', 'Toestemming van de verdachte', 'Een bevel van de hulpofficier van justitie'], answer: 1,
          wrong: { 0: 'Gezondheidsgegevens zijn gevoelig. Een vordering zonder machtiging volstaat niet.', 2: 'Toestemming van de verdachte is geen wettelijke basis voor een vordering, en je kunt hem er niet toe dwingen.', 3: 'Een hulpofficier heeft deze bevoegdheid niet.' },
          explain: 'Voor gevoelige gegevens vordert de officier na machtiging van de rechter-commissaris. Bij een arts komt het beroepsgeheim er nog bij.' },
        { q: 'Bij een doorzoeking staat een laptop aan met een geopende, versleutelde container. Wat doet de digitaal rechercheur het eerst?',
          options: ['De stekker eruit trekken om wijzigingen te voorkomen', 'De laptop dichtklappen en meenemen naar het lab', 'De toestand vastleggen en het werkgeheugen en de geopende container veiligstellen voordat het apparaat uitgaat', 'De verdachte vragen het wachtwoord op te schrijven'], answer: 2,
          wrong: { 0: 'Dan verdwijnt de sleutel uit het geheugen en is de container mogelijk nooit meer te openen.', 1: 'Dichtklappen kan de slaapstand activeren en de container vergrendelen.', 3: 'De verdachte hoeft niet mee te werken, en zijn antwoord verandert niets aan wat er nu verloren dreigt te gaan.' },
          explain: 'Van vluchtig naar vast: eerst vastleggen wat alleen nu bereikbaar is, dan pas uitschakelen.' },
        { q: 'In een proces-verbaal staat: "Met een forensisch programma heb ik een kopie van de telefoon gemaakt. Daarna heb ik de chats bekeken." Wat is het grootste probleem?',
          options: ['Het is te kort', 'Het is niet herhaalbaar: datum, tijd, beslagnummer, programma, versie en hashwaarde ontbreken', 'Het woord "chats" is informeel', 'Een proces-verbaal hoort in de derde persoon geschreven te zijn'], answer: 1,
          wrong: { 0: 'Lengte is niet het punt. Een korte, volledige regel is beter dan een lange, vage.', 2: 'Spreektaal is niet ideaal, maar maakt het stuk niet oncontroleerbaar.', 3: 'Een proces-verbaal wordt juist in de ik-vorm geschreven door de verbalisant zelf.' },
          explain: 'Zonder die gegevens kan niemand controleren of herhalen wat er gebeurde. Dat raakt de betrouwbaarheid van het bewijs.' },
        { q: 'Bekijk het dossierfragment in het lab. Wat is de juiste beoordeling?',
          options: ['Alles is in orde: de inzet viel binnen de geldigheid van het bevel', 'Het kopiëren van de berichten viel buiten het doel van het bevel; de rechter kan daar op grond van artikel 359a Sv gevolgen aan verbinden, ook voor wat eruit voortkwam', 'De aanhouding is automatisch onrechtmatig en de verdachte moet direct vrij', 'Het verzuim is hersteld als de officier achteraf een bevel voor vastleggen van gegevens tekent'], answer: 1,
          wrong: { 0: 'De tijd klopt, maar het doel niet. Het bevel noemt alleen kenmerken vaststellen.', 2: 'Er is geen automatisme. De rechter weegt belang, ernst en nadeel.', 3: 'Een bevel achteraf maakt een eerdere handeling niet rechtmatig.' },
          explain: 'Berichten kopiëren is gegevens vastleggen, een ander doel dan in het bevel staat. Omdat de aanhouding op die berichten steunde, kan ook dat deel van het onderzoek worden geraakt.' },
      ],
    },
  ],

  terms: [
    { term: 'Legaliteitsbeginsel', def: 'Strafvordering vindt alleen plaats op de wijze die de wet voorziet (art. 1 Sv); een inbreuk op privacy vraagt een wettelijke basis.' },
    { term: 'Proportionaliteit', def: 'De inbreuk staat in redelijke verhouding tot het doel en de ernst van het feit.' },
    { term: 'Subsidiariteit', def: 'Het doel kan niet met een minder ingrijpend middel worden bereikt.' },
    { term: 'Rechter-commissaris', def: 'Onafhankelijke rechter die tijdens het opsporingsonderzoek toetst en vooraf machtiging geeft voor de meest ingrijpende bevoegdheden.' },
    { term: 'Hackbevoegdheid', def: 'Bevoegdheid om heimelijk binnen te dringen in een geautomatiseerd werk (art. 126nba Sv), ingevoerd met de Wet computercriminaliteit III per 1 maart 2019.' },
    { term: 'Vordering', def: 'Verplichting die de opsporing oplegt aan een partij om bepaalde gegevens te verstrekken (o.a. art. 126nc tot en met 126nh Sv).' },
    { term: 'Netwerkzoeking', def: 'Vanaf de plaats van een doorzoeking zoeken in gegevens die elders zijn opgeslagen maar vanaf die plaats rechtmatig toegankelijk zijn (art. 125j Sv).' },
    { term: 'Proces-verbaal', def: 'Schriftelijk verslag op ambtseed of -belofte van wat een opsporingsambtenaar deed en waarnam; een wettig bewijsmiddel.' },
    { term: 'Vormverzuim', def: 'Niet nageleefd vormvoorschrift in het voorbereidend onderzoek; de rechter kan er gevolgen aan verbinden op grond van art. 359a Sv.' },
  ],

  resources: [
    { title: 'wetten.overheid.nl: Wetboek van Strafvordering', url: 'https://wetten.overheid.nl/BWBR0001903/' },
    { title: 'EUR-Lex: Verordening (EU) 2023/1543 (e-evidence)', url: 'https://eur-lex.europa.eu/eli/reg/2023/1543/oj' },
    { title: 'Raad van Europa: Verdrag inzake cybercriminaliteit (Boedapest)', url: 'https://www.coe.int/en/web/cybercrime/the-budapest-convention' },
    { title: 'Openbaar Ministerie', url: 'https://www.om.nl/' },
  ],
});
