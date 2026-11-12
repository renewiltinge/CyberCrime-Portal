/* Room: Risicomanagement en frameworks */
CS.registerRoom({
  id: 'risicomanagement-frameworks',
  path: 'security-kern',
  order: 13,
  title: 'Risicomanagement en frameworks: ISO 27001, NIST CSF en BIO',
  icon: '⚖️',
  difficulty: 'Gemiddeld',
  minutes: 70,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Niet alles kan tegelijk. Scoor en orden risico\'s, controleer een risicoregister, besluit of een risico geaccepteerd mag worden, sorteer de maatregelen uit ISO/IEC 27001:2022 en koppel maatregelen aan de functies van NIST CSF 2.0, de CIS Controls v8 en de BIO.',
  objectives: [
    'Risico\'s scoren als kans maal impact en ordenen met een risicomatrix',
    'Een risicoregister beoordelen op eigenaar, restrisico en risicobereidheid',
    'De vier behandelopties toepassen en beargumenteren wanneer een risico geaccepteerd mag worden',
    'De opbouw van een ISMS volgens ISO/IEC 27001:2022 en de vier thema\'s van Annex A uitleggen',
    'Maatregelen koppelen aan de zes functies van NIST CSF 2.0 en aan de CIS Controls v8',
    'Uitleggen welke rol de BIO speelt voor Nederlandse overheden',
  ],
  tasks: [
    {
      title: 'Taak 1: Risico is kans maal impact',
      tryFirst: true,
      intro: '<p>De fictieve gemeente Waterdijk heeft zes risico\'s op een rij gezet, elk met een kans en een impact op een schaal van 1 tot 5. In het lab staan ze door elkaar. Reken de scores uit en zet ze van hoog naar laag.</p>',
      content: `
        <p>Een organisatie heeft altijd meer dreigingen dan geld en mensen. Risicomanagement is de manier om te kiezen:
        waar besteden we onze beperkte middelen het eerst aan? Daarvoor heb je een gemeenschappelijke maat nodig.</p>
        <h3>Drie begrippen</h3>
        <ul>
          <li>Een <strong>dreiging</strong> is iets wat schade kan veroorzaken: een crimineel met ransomware, een
          stroomstoring, een medewerker die een fout maakt.</li>
          <li>Een <strong>kwetsbaarheid</strong> is een zwakte waardoor die dreiging kan toeslaan: geen MFA, een
          verouderd systeem, geen back-up.</li>
          <li>Een <strong>risico</strong> ontstaat als een dreiging een kwetsbaarheid kan raken bij iets wat waarde
          heeft. Zonder kwetsbaarheid of zonder waarde is er weinig risico.</li>
        </ul>
        <h3>Kans maal impact</h3>
        <p>De gangbare vuistregel is <strong>risico = kans × impact</strong>. Vergelijk het met een verzekeraar die
        inschat hoe vaak er ingebroken wordt in een wijk en wat er gemiddeld wordt meegenomen. In een
        <strong>kwalitatieve</strong> analyse geef je beide een score, bijvoorbeeld van 1 (zeer laag) tot 5 (zeer
        hoog), en vermenigvuldig je die. Een risico met kans 3 en impact 4 scoort zo 12.</p>
        <p>De uitkomst zet je in een <strong>risicomatrix</strong>, vaak 5 bij 5, met kleuren. Waterdijk gebruikt deze
        indeling:</p>
        <table>
          <thead><tr><th>Score</th><th>Niveau</th><th>Wat dan?</th></tr></thead>
          <tbody>
            <tr><td>1 tot en met 6</td><td>Laag</td><td>Accepteren of meenemen in regulier beheer</td></tr>
            <tr><td>8 tot en met 12</td><td>Midden</td><td>Maatregelen plannen, eigenaar volgt het op</td></tr>
            <tr><td>15 tot en met 25</td><td>Hoog</td><td>Direct aanpakken, rapporteren aan de directie</td></tr>
          </tbody>
        </table>
        <p>Scores als 7, 11 en 13 komen niet voor: met twee hele getallen van 1 tot 5 kun je ze niet maken.</p>
        <h3>De beperkingen</h3>
        <p>Kwalitatief scoren is snel en begrijpelijk, maar grof. Twee risico's met dezelfde score kunnen heel
        verschillend zijn: een kleine kans op een ramp is iets anders dan een grote kans op een kleine schade. En
        scores zijn meningen. Leg daarom vast <em>waarom</em> een kans een 4 is, en wat een impact van 5 concreet
        betekent, bijvoorbeeld "meer dan een week geen dienstverlening aan inwoners" of "gegevens van meer dan
        10.000 inwoners op straat".</p>
        <div class="callout tip"><strong>Tip:</strong> scoor met meerdere mensen apart en bespreek de verschillen. Daar
        zit de echte informatie.</div>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de risico\'s van Waterdijk van hoogste naar laagste score (kans × impact).',
        items: [
          { id: 'r1', label: 'R1 Ransomware via phishing op werkplekken (kans 4, impact 5)' },
          { id: 'r2', label: 'R2 Datalek door een openbare deellink in het samenwerkingsplatform (kans 3, impact 4)' },
          { id: 'r3', label: 'R3 Uitval van het zaaksysteem door een storing bij de leverancier (kans 2, impact 4)' },
          { id: 'r4', label: 'R4 Diefstal van een laptop van een handhaver (kans 3, impact 3)' },
          { id: 'r5', label: 'R5 DDoS-aanval op de gemeentelijke website (kans 3, impact 2)' },
          { id: 'r6', label: 'R6 Medewerker raadpleegt zonder reden gegevens in de BRP (kans 2, impact 5)' },
        ],
        correct: ['r1', 'r2', 'r6', 'r4', 'r3', 'r5'],
        flag: 'NM{kans_maal_impact}',
        explain: 'R1 20, R2 12, R6 10, R4 9, R3 8, R5 6.',
      },
      questions: [
        { q: 'Zet de risico\'s goed op volgorde. Welke vlag krijg je?', answer: ['NM{kans_maal_impact}'],
          hints: ['Vermenigvuldig bij elk risico de kans met de impact.', 'De hoogste is 20, de laagste 6.', 'R6 (2 × 5) staat boven R4 (3 × 3).'],
          explain: 'R1 20, R2 12, R6 10, R4 9, R3 8, R5 6.' },
        { q: 'Hoeveel van de zes risico\'s vallen volgens de matrix van Waterdijk in het niveau Midden?', answer: ['4', 'vier'],
          hints: ['Midden loopt van 8 tot en met 12.', 'Gebruik de scores die je net hebt uitgerekend.', 'R2, R6, R4 en R3.'],
          wrong: { '3': 'Ook 8 hoort bij Midden. R3 telt mee.', '5': 'R5 scoort 6 en is dus Laag.', '2': 'Midden loopt van 8 tot en met 12. Tel ook R6 en R4.' },
          explain: 'Vier: 12, 10, 9 en 8. Alleen R1 is Hoog en alleen R5 is Laag.' },
        { q: 'Na een nieuwe maatregel daalt de kans op R1 van 4 naar 2. De impact blijft gelijk. In welk niveau valt R1 dan?', options: ['Midden, met score 10', 'Laag, met score 5', 'Hoog, met score 15', 'Midden, met score 8'], answer: 0,
          wrong: { 1: 'Je hebt kans en impact opgeteld en gehalveerd. Vermenigvuldig: 2 × 5.', 2: 'Dat zou kans 3 zijn.', 3: 'De impact blijft 5, niet 4.' },
          explain: '2 × 5 = 10: Midden. Let op: een maatregel die alleen de kans verlaagt, laat de impact gelijk. Bij ransomware is impact verlagen (goede back-ups) net zo belangrijk.' },
        { q: 'R3 (kans 2, impact 4) en een nieuw risico R7 (kans 4, impact 2) scoren allebei 8. Wat is de beste conclusie?', options: ['Ze krijgen dezelfde score, maar vragen om andere maatregelen: bij R3 vooral de impact beperken, bij R7 vooral de kans', 'Ze zijn even belangrijk en mogen dus samen worden behandeld', 'R7 is altijd belangrijker omdat de kans hoger is', 'De score is fout, want twee risico\'s mogen niet hetzelfde scoren'], answer: 0,
          wrong: { 1: 'Gelijke score betekent niet gelijke aanpak.', 2: 'Een kleine kans op grote schade kan juist zwaarder wegen, bijvoorbeeld als de schade onherstelbaar is.', 3: 'Gelijke scores komen veel voor. Dat is een beperking van de methode, geen fout.' },
          why: 'Wie alleen naar de score kijkt, mist waar de maatregel moet aangrijpen. De score helpt bij het ordenen; de onderdelen helpen bij het kiezen van de maatregel.',
          explain: 'Bij een lage kans en hoge impact (R3) zoek je herstel en continuïteit. Bij een hoge kans en lage impact (R7) zoek je preventie.' },
      ],
    },

    {
      title: 'Taak 2: Het risicoregister',
      tryFirst: true,
      intro: '<p>De auditor vraagt het risicoregister van Waterdijk op. De risicobereidheid is vastgesteld door het college: een restrisico van 9 of lager is aanvaardbaar, alles daarboven moet verder omlaag of door de directie worden geaccepteerd. Zoek in het lab wat de auditor gaat aantekenen.</p>',
      content: `
        <p>Een risicoanalyse is een momentopname. Het <strong>risicoregister</strong> is de plek waar je de uitkomst
        bijhoudt en volgt, zodat risico's niet na de workshop in een la verdwijnen. Een goed register beantwoordt per
        risico zes vragen.</p>
        <ol>
          <li><strong>Wat is het risico?</strong> Beschrijf het als dreiging, kwetsbaarheid en gevolg: "Een
          crimineel versleutelt werkplekken via phishing, omdat er geen MFA is, waardoor de dienstverlening een week
          stilligt."</li>
          <li><strong>Wie is de eigenaar?</strong> De <strong>risico-eigenaar</strong> is degene die het mandaat en
          het budget heeft om over het risico te beslissen. Meestal een manager uit de lijn, niet de security officer.
          De security officer adviseert, de eigenaar besluit.</li>
          <li><strong>Hoe groot is het inherente risico?</strong> Het <strong>inherente</strong> of bruto risico is
          het risico zonder (nieuwe) maatregelen.</li>
          <li><strong>Welke maatregelen?</strong> Wat is er afgesproken, door wie, voor wanneer?</li>
          <li><strong>Hoe groot is het restrisico?</strong> Het <strong>restrisico</strong> (<em>residual
          risk</em>) is wat overblijft na de maatregelen. Dat is het getal dat je vergelijkt met de risicobereidheid.</li>
          <li><strong>Welk besluit?</strong> Verminderen, vermijden, overdragen of accepteren, en wie dat besluit nam.</li>
        </ol>
        <h3>Risicobereidheid</h3>
        <p>De <strong>risicobereidheid</strong> (<em>risk appetite</em>) is hoeveel risico de organisatie bewust wil
        lopen. Die stelt de top vast, niet de IT-afdeling. Bij Waterdijk is dat een restrisico van 9: wat daarboven
        uitkomt, moet verder omlaag, of de directie moet het uitdrukkelijk accepteren. Zo voorkom je dat een
        afdelingshoofd een risico accepteert waarvan de gevolgen voor de hele gemeente zijn.</p>
        <h3>Waar een auditor naar kijkt</h3>
        <ul>
          <li>Heeft elk risico een eigenaar met naam of functie?</li>
          <li>Is het restrisico echt lager dan het inherente risico, en is uitgelegd waarom?</li>
          <li>Zijn risico's boven de risicobereidheid geaccepteerd door iemand die dat mag?</li>
          <li>Is er een datum waarop het risico opnieuw wordt bekeken?</li>
        </ul>
        <div class="callout warn"><strong>Let op:</strong> een maatregel als "awareness" of "beleid opstellen" klinkt
        goed, maar verlaagt het risico pas als hij werkt. Een restrisico dat na de maatregel even hoog is als ervoor,
        is een signaal dat de maatregel niets doet, of dat niemand heeft nagedacht.</div>
      `,
      lab: {
        type: 'logs',
        title: 'risicoregister-waterdijk-2026-q4.txt',
        lines: `ID  risico                                         eigenaar               inherent  maatregel                                     rest     besluit       geaccepteerd-door
R1  ransomware via phishing op werkplekken         directeur bedrijfsvoering  4x5=20  EDR, MFA, offline back-ups, hersteltest      2x4=8    verminderen   -
R2  datalek via openbare deellink                  manager informatievoorziening 3x4=12 deellinks alleen intern, DLP-melding     2x4=8    verminderen   -
R3  uitval zaaksysteem door storing leverancier    manager publiekszaken  2x4=8     SLA met boeteclausule, uitwijkprocedure       2x3=6    overdragen + verminderen  -
R4  diefstal laptop handhaver                      teamleider handhaving  3x3=9     volledige schijfversleuteling, wissen op afstand  3x1=3  verminderen   -
R5  DDoS op de gemeentelijke website               manager communicatie   3x2=6     geen extra maatregel                          3x2=6    accepteren    manager communicatie
R6  medewerker raadpleegt BRP zonder reden         -                      2x5=10    logging, steekproefcontrole                   2x5=10   verminderen   -
R7  phishing via berichtenapp op bestuurders       afdelingshoofd ICT     3x4=12    awareness-sessie                              3x4=12   accepteren    afdelingshoofd ICT
R8  verouderd parkeersysteem (besturingssysteem buiten ondersteuning) manager parkeren 4x3=12 systeem uitfaseren per 2027-03-01 n.v.t.  vermijden     -`,
      },
      questions: [
        { q: 'Welk risico heeft geen eigenaar?', answer: ['R6'],
          hints: ['Kijk naar de kolom eigenaar.', 'Zoek een streepje in die kolom.', 'Het gaat om de BRP.'],
          wrong: { 'R5': 'R5 heeft wel een eigenaar: de manager communicatie.' },
          explain: 'R6 heeft geen eigenaar. Dan besluit niemand en volgt niemand het op. Juist bij een risico met impact 5 is dat ernstig.' },
        { q: 'Hoeveel risico\'s hebben na de maatregelen nog een restrisico boven de risicobereidheid van 9?', answer: ['2', 'twee'],
          hints: ['Vergelijk de kolom rest met 9.', 'Reken de producten uit: alleen hoger dan 9 telt.', 'R6 en R7.'],
          wrong: { '3': 'R8 heeft geen restrisico: het systeem wordt uitgefaseerd. En R4 eindigt op 3.', '1': 'Ook R7 eindigt op 12: de awareness-sessie verlaagde niets.' },
          explain: 'R6 (10) en R7 (12). Die moeten verder omlaag, of de directie moet ze uitdrukkelijk accepteren.' },
        { q: 'Welk risico is geaccepteerd door iemand die dat volgens de afspraak van Waterdijk niet mocht?', answer: ['R7'],
          hints: ['Kijk naar de risico\'s met besluit accepteren.', 'Vergelijk het restrisico met de risicobereidheid.', 'Boven de 9 mag alleen de directie accepteren.'],
          wrong: { 'R5': 'R5 eindigt op 6, binnen de risicobereidheid. Daar mag de eigenaar zelf accepteren.' },
          why: 'Acceptatie op het verkeerde niveau is een van de meest voorkomende auditbevindingen. Het risico bestaat nog steeds, maar degene die de gevolgen draagt, weet er niets van.',
          explain: 'R7 eindigt op 12 en is geaccepteerd door het afdelingshoofd ICT. Boven de 9 hoort dat bij de directie, en de maatregel verlaagde het risico niet.' },
        { q: 'Bij R3 staat "overdragen": er is een SLA met boeteclausule. Wat verandert dat aan de uitval zelf?', options: ['Niets aan kans of duur van de uitval; het compenseert alleen een deel van de financiële schade', 'De leverancier wordt verantwoordelijk tegenover de inwoners', 'De kans op uitval daalt, omdat de leverancier boetes wil voorkomen', 'Het risico verdwijnt uit het register van de gemeente'], answer: 0,
          wrong: { 1: 'Tegenover inwoners blijft de gemeente verantwoordelijk.', 2: 'Een boete kan een prikkel zijn, maar daar kun je niet op rekenen. Daarom staat er ook een uitwijkprocedure.', 3: 'Het risico blijft van de gemeente. Het staat terecht in het register.' },
          explain: 'Overdragen verschuift een deel van de financiële gevolgen, niet het risico zelf. Daarom combineert Waterdijk het met een uitwijkprocedure.' },
      ],
    },

    {
      title: 'Taak 3: Behandelen of accepteren',
      tryFirst: true,
      intro: '<p>Het verouderde parkeersysteem van Waterdijk (R8) kan pas in maart 2027 worden vervangen. Tot die tijd moet het blijven draaien. De manager parkeren wil het risico accepteren. Speel in het lab vijf beslismomenten door.</p>',
      content: `
        <p>Voor elk risico kies je een behandeling. Er zijn er vier, en ISO/IEC 27001:2022 vraagt dat je de keuze
        vastlegt en onderbouwt.</p>
        <table>
          <thead><tr><th>Optie</th><th>Wat je doet</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td>Verminderen</td><td>Maatregelen nemen die kans of impact verlagen</td><td>MFA invoeren, back-ups maken</td></tr>
            <tr><td>Vermijden</td><td>Stoppen met de activiteit die het risico veroorzaakt</td><td>Een onveilige koppeling met internet schrappen</td></tr>
            <tr><td>Overdragen of delen</td><td>De financiële gevolgen bij een ander leggen</td><td>Een cyberverzekering, een contract met een boeteclausule</td></tr>
            <tr><td>Accepteren</td><td>Bewust besluiten het risico te dragen</td><td>Een website zonder DDoS-bescherming, omdat de schade beperkt is</td></tr>
          </tbody>
        </table>
        <h3>Wanneer mag je accepteren?</h3>
        <p>Accepteren is een volwaardige keuze, geen nederlaag. Niet elk risico is het waard om geld aan uit te geven.
        Maar acceptatie is alleen geldig als aan vier voorwaarden is voldaan:</p>
        <ol>
          <li>Het besluit wordt genomen door iemand met het mandaat voor dat risiconiveau.</li>
          <li>Het is gebaseerd op een eerlijke inschatting van kans en impact, inclusief wat er gebeurt als het
          misgaat.</li>
          <li>Het is schriftelijk vastgelegd, met de redenering erbij.</li>
          <li>Het heeft een einddatum of een moment van herbeoordeling. "Voor altijd geaccepteerd" bestaat niet:
          dreigingen veranderen.</li>
        </ol>
        <p>Vaak is de beste route een combinatie: eerst verminderen wat redelijkerwijs kan, en dan het
        <em>restrisico</em> accepteren. Bij een verouderd systeem dat nog even moet blijven draaien, heten de
        tijdelijke maatregelen <strong>compenserende maatregelen</strong>: ze nemen de plaats in van wat het systeem
        zelf niet meer kan, zoals updates.</p>
        <h3>Wat overdragen niet doet</h3>
        <p>Een verzekering betaalt een deel van de schade, maar neemt je wettelijke plichten niet over. Een datalek
        moet je nog steeds zelf beoordelen en zo nodig melden bij de Autoriteit Persoonsgegevens, en de schade aan je
        reputatie draag je zelf. Verzekeraars stellen bovendien vaak eisen, zoals MFA en back-ups, voordat ze dekking
        geven.</p>
        <div class="callout info"><strong>Verschil met negeren:</strong> een risico negeren is niets doen zonder het
        te weten of zonder het te besluiten. Accepteren is niets (extra) doen terwijl je het weet, en daarvoor
        tekent.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'Het parkeersysteem van Waterdijk',
        scenario: 'Gemeente Waterdijk (fictief). Het parkeersysteem draait op een besturingssysteem dat geen beveiligingsupdates meer krijgt. Het verwerkt kentekens en betalingen en is via internet bereikbaar voor de leverancier. Vervanging is gepland per 1 maart 2027. Risico R8: kans 4, impact 3.',
        pass: 5,
        flag: 'NM{accepteren_met_handtekening}',
        steps: [
          { situation: 'De manager parkeren zegt: "Ik accepteer het risico, het is maar tot maart." Wat adviseer je?', choices: [
            { label: 'Eerst kijken welke compenserende maatregelen de kans verlagen, en daarna het restrisico laten accepteren', good: true, feedback: 'Accepteren is pas aan de orde als je redelijke maatregelen hebt overwogen.' },
            { label: 'Akkoord, het is zijn systeem', good: false, feedback: 'Met een score van 12 ligt het boven de risicobereidheid. De manager mag het niet alleen accepteren, en er zijn goedkope maatregelen mogelijk.' },
            { label: 'Het systeem vandaag uitzetten', good: false, feedback: 'Dan kan niemand meer parkeren betalen. Vermijden kan, maar niet ten koste van een dienst die nog vier maanden nodig is, zonder alternatief.' },
          ] },
          { situation: 'Welke compenserende maatregel verlaagt de kans het meest?', choices: [
            { label: 'Het systeem in een apart netwerksegment plaatsen en de toegang van de leverancier beperken tot een vast adres via een VPN', good: true, feedback: 'Zonder bereikbaarheid vanaf internet is het systeem voor de meeste aanvallers onzichtbaar.' },
            { label: 'Een extra awareness-sessie voor het parkeerteam', good: false, feedback: 'Het probleem zit in het systeem en de bereikbaarheid, niet in het gedrag van het team.' },
            { label: 'Een cyberverzekering afsluiten', good: false, feedback: 'Dat raakt de financiële gevolgen, niet de kans.' },
          ] },
          { situation: 'Na segmentatie schat het team de kans op 2. Het restrisico is 2 × 3 = 6. Wie accepteert het?', choices: [
            { label: 'De manager parkeren als risico-eigenaar, want 6 ligt binnen de risicobereidheid', good: true, feedback: 'Binnen de risicobereidheid mag de eigenaar zelf besluiten.' },
            { label: 'De security officer', good: false, feedback: 'De security officer adviseert. Hij is geen eigenaar van het parkeerproces.' },
            { label: 'Niemand, dat hoeft niet meer bij een lage score', good: false, feedback: 'Ook een laag restrisico wordt bewust geaccepteerd en vastgelegd.' },
          ] },
          { situation: 'Hoe leg je het besluit vast?', choices: [
            { label: 'In het register: de maatregelen, het restrisico, de naam van de eigenaar, de datum en een einddatum van 1 maart 2027', good: true, feedback: 'Met einddatum, zodat het besluit vanzelf terugkomt als de vervanging uitloopt.' },
            { label: 'Mondeling afgesproken in het teamoverleg', good: false, feedback: 'Bij een audit of na een incident kan niemand aantonen wat er besloten is.' },
          ] },
          { situation: 'In januari 2027 meldt de leverancier dat de vervanging een halfjaar uitloopt.', choices: [
            { label: 'Het risico opnieuw beoordelen en het besluit opnieuw laten nemen', good: true, feedback: 'De acceptatie had een einddatum met een reden. Die reden is veranderd.' },
            { label: 'Niets doen, het risico was al geaccepteerd', good: false, feedback: 'Een acceptatie geldt voor de situatie waarin hij is genomen. Een halfjaar langer met een verouderd systeem is een nieuwe situatie.' },
          ] },
        ],
      },
      questions: [
        { q: 'Doorloop het scenario foutloos. Welke vlag krijg je?', answer: ['NM{accepteren_met_handtekening}'],
          hints: ['Verminderen voordat je accepteert.', 'Kijk bij de acceptatie naar de risicobereidheid uit taak 2.', 'Een acceptatie heeft een einddatum.'],
          explain: 'Eerst verminderen, dan het restrisico op het juiste niveau accepteren, vastleggen met einddatum, en herbeoordelen als de situatie verandert.' },
        { q: 'Waterdijk besluit de online betaalfunctie van het parkeersysteem helemaal te schrappen en betalen alleen nog via de parkeerapp van een andere leverancier te laten lopen. Welke behandeling is dat voor het risico van de oude betaalfunctie?', options: ['De activiteit die het risico veroorzaakt stoppen', 'De kans verlagen met een technische maatregel', 'De financiële gevolgen bij een ander leggen', 'Het risico bewust dragen'], answer: 0,
          wrong: { 1: 'Er wordt niets aan de functie verbeterd. Hij verdwijnt.', 2: 'Er wordt geen schade verzekerd of contractueel verschoven. De activiteit zelf stopt.', 3: 'Er wordt juist iets veranderd.' },
          explain: 'Vermijden: de activiteit die het risico veroorzaakt, houdt op. Let op: het nieuwe betaalkanaal heeft zijn eigen risico\'s, die in het register horen.' },
        { q: 'Een directeur zegt: "We hebben een cyberverzekering, dus een datalek is ons probleem niet meer." Wat klopt er niet?', options: ['De verzekering vergoedt hooguit een deel van de schade; de meldplicht en de verantwoordelijkheid tegenover betrokkenen blijven bij de organisatie', 'Niets, de verzekeraar neemt de meldplicht over', 'Verzekeringen dekken nooit datalekken', 'Een verzekering verlaagt de kans op een datalek, dus het klopt deels'], answer: 0,
          wrong: { 1: 'De meldplicht bij de AP ligt bij de verwerkingsverantwoordelijke. Die kun je niet verzekeren.', 2: 'Veel cyberverzekeringen dekken kosten rond een datalek. Dat is het punt niet.', 3: 'Een verzekering verlaagt geen kans. Hij verschuift een deel van de financiële gevolgen.' },
          explain: 'Overdragen gaat over geld. Verantwoordelijkheid, meldplicht en reputatieschade blijven.' },
      ],
    },

    {
      title: 'Taak 4: ISO/IEC 27001:2022 en het ISMS',
      tryFirst: true,
      intro: '<p>Waterdijk wil aantonen dat het informatiebeveiliging op orde heeft en werkt met ISO/IEC 27001:2022. In het lab staan zestien beheersmaatregelen uit Annex A. Sorteer ze in de vier thema\'s. Eén ervan staat waarschijnlijk niet waar je hem verwacht.</p>',
      content: `
        <p>ISO/IEC 27001 is de internationale norm voor een <strong>managementsysteem voor
        informatiebeveiliging</strong> (ISMS). De huidige versie is van 2022. Het woord managementsysteem is de kern:
        de norm schrijft niet voor welke firewall je koopt, maar hoe je als organisatie structureel bepaalt welke
        risico's er zijn, wat je eraan doet, en of dat werkt.</p>
        <h3>De opbouw</h3>
        <p>De eisen staan in de hoofdstukken 4 tot en met 10:</p>
        <ul>
          <li><strong>4 Context:</strong> wat is de organisatie, wie zijn de belanghebbenden, wat valt binnen de
          reikwijdte (<em>scope</em>)?</li>
          <li><strong>5 Leiderschap:</strong> de top stelt beleid vast en is aanspreekbaar.</li>
          <li><strong>6 Planning:</strong> risicobeoordeling en risicobehandeling, en doelstellingen.</li>
          <li><strong>7 Ondersteuning:</strong> mensen, middelen, bewustzijn, communicatie, documentatie.</li>
          <li><strong>8 Uitvoering:</strong> de plannen uitvoeren en de risicobeoordeling herhalen.</li>
          <li><strong>9 Evaluatie:</strong> meten, interne audits, directiebeoordeling.</li>
          <li><strong>10 Verbetering:</strong> afwijkingen corrigeren en continu verbeteren.</li>
        </ul>
        <p>Dat volgt de cyclus <strong>Plan-Do-Check-Act</strong>: plannen, uitvoeren, controleren, bijsturen.</p>
        <h3>Annex A</h3>
        <p>Achterin de norm staat <strong>Annex A</strong>: een lijst van 93 beheersmaatregelen, sinds de versie van
        2022 ingedeeld in vier thema's. De nummering verraadt het thema: hoofdstuk 5 is organisatorisch, 6 gaat over
        mensen, 7 is fysiek en 8 is technologisch. De versie van 2013 had nog 114 maatregelen in 14 domeinen. Bij de
        herziening zijn maatregelen samengevoegd en kwamen er nieuwe bij, zoals threat intelligence en
        informatiebeveiliging voor het gebruik van clouddiensten. De uitwerking per maatregel staat in een aparte
        norm: ISO/IEC 27002:2022.</p>
        <p>Let op hoe de indeling werkt. Een thema zegt iets over <em>wie</em> of <em>wat</em> de maatregel vooral
        draagt: een beleid of proces, mensen, de fysieke omgeving, of techniek. Een onderwerp dat je technisch vindt
        klinken, kan dus organisatorisch zijn als het vooral om regels en afspraken gaat.</p>
        <h3>De verklaring van toepasselijkheid</h3>
        <p>Je hoeft niet alle 93 maatregelen te nemen. Je moet ze wel allemaal langslopen in de
        <strong>verklaring van toepasselijkheid</strong> (<em>Statement of Applicability</em>, SoA): per maatregel of
        hij nodig is, of hij is ingevoerd, en waarom je hem eventueel uitsluit. Een gemeente zonder eigen
        softwareontwikkeling kan bijvoorbeeld een deel van de maatregelen over veilig ontwikkelen onderbouwd
        uitsluiten.</p>
        <h3>Certificering</h3>
        <p>Een geaccrediteerde certificerende instelling toetst of het ISMS aan de eisen voldoet. Een certificaat is
        doorgaans drie jaar geldig, met jaarlijkse controle-audits. Let op de scope: een certificaat voor "het
        rekencentrum" zegt niets over de rest van de organisatie.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Sorteer zestien maatregelen uit ISO/IEC 27001:2022 Annex A in de vier thema\'s.',
        flag: 'NM{vier_themas_drieennegentig}',
        groups: [
          { name: 'Organisatorisch (5)', items: ['Threat intelligence', 'Toegangsbeveiliging', 'Informatiebeveiliging bij gebruik van clouddiensten', 'ICT-gereedheid voor bedrijfscontinuïteit'] },
          { name: 'Mensen (6)', items: ['Screening', 'Bewustwording, opleiding en training', 'Werken op afstand', 'Melden van informatiebeveiligingsgebeurtenissen'] },
          { name: 'Fysiek (7)', items: ['Fysieke toegangsbeveiliging', 'Monitoren van fysieke beveiliging', 'Clear desk en clear screen', 'Opslagmedia'] },
          { name: 'Technologisch (8)', items: ['Beveiligde authenticatie', 'Back-up van informatie', 'Veilig coderen', 'Monitoren van activiteiten'] },
        ],
      },
      questions: [
        { q: 'Los het lab op. Welke vlag verschijnt?', answer: ['NM{vier_themas_drieennegentig}'],
          hints: ['Begin met de groep die het makkelijkst is: wat gaat duidelijk over gebouwen en spullen?', 'Gaat iets vooral over wat mensen doen of melden, dan hoort het bij Mensen.', 'Toegangsbeveiliging als beleid hoort niet bij Technologisch.'],
          explain: 'De verrassing zit vaak bij toegangsbeveiliging: als beleid en proces is die organisatorisch. Beveiligde authenticatie, de techniek, is technologisch.' },
        { q: 'Het thema Mensen telt 8 maatregelen, Fysiek 14 en Technologisch 34. Hoeveel maatregelen telt het thema Organisatorisch?', answer: ['37', 'zevenendertig'],
          hints: ['Je weet het totaal van Annex A.', '93 min de drie andere thema\'s.', '93 - 8 - 14 - 34'],
          wrong: { '93': 'Dat is het totaal voor alle vier de thema\'s.', '39': 'Reken het nog eens na: 8 + 14 + 34 = 56.' },
          explain: '93 - 56 = 37. Het organisatorische thema is het grootste: veel van informatiebeveiliging is beleid, rollen en afspraken.' },
        { q: 'Een collega zoekt het toegangsbeleid tussen de technologische maatregelen en vindt het niet. Wat vertel je hem?', options: ['Toegangsbeveiliging als beleid staat bij de organisatorische maatregelen; de techniek van het inloggen staat bij de technologische', 'Toegangsbeveiliging is in de versie van 2022 geschrapt', 'Het staat bij Fysiek, omdat het om toegang gaat', 'Het staat in hoofdstuk 9 van de norm, bij evaluatie'], answer: 0,
          wrong: { 1: 'Het is niet geschrapt. Het is samengevoegd en ondergebracht in het organisatorische thema.', 2: 'Fysieke toegang is een aparte maatregel. Het toegangsbeleid voor informatie hoort daar niet.', 3: 'Hoofdstuk 9 gaat over meten en audits, niet over maatregelen uit Annex A.' },
          explain: 'In de 2022-versie is toegangsbeveiliging een organisatorische maatregel. Beveiligde authenticatie en de rechten op systeemniveau staan bij Technologisch.' },
        { q: 'Waterdijk besteedt alle softwareontwikkeling uit en sluit daarom een deel van de maatregelen over veilig ontwikkelen uit. Waar moet die uitsluiting met onderbouwing staan?', options: ['In de verklaring van toepasselijkheid', 'In het risicoregister, als geaccepteerd risico', 'In het informatiebeveiligingsbeleid', 'Nergens: een maatregel die je niet nodig hebt, hoef je niet te noemen'], answer: 0,
          wrong: { 1: 'Het register gaat over risico\'s, niet over welke maatregelen uit Annex A van toepassing zijn.', 2: 'Het beleid geeft richting. Het overzicht per maatregel hoort in een eigen document.', 3: 'Juist niet: elke maatregel uit Annex A moet je langslopen, ook om uit te sluiten.' },
          explain: 'De verklaring van toepasselijkheid (SoA) bevat elke maatregel uit Annex A met de keuze en de reden. Een auditor begint er vaak mee.' },
      ],
    },

    {
      title: 'Taak 5: NIST CSF 2.0, CIS Controls v8 en de BIO',
      tryFirst: true,
      intro: '<p>De CISO van Waterdijk wil weten of de maatregelen evenwichtig verdeeld zijn. In het lab staat het maatregelenoverzicht, met per maatregel het risico waaraan hij gekoppeld is. Koppel elke maatregel aan een functie van NIST CSF 2.0 en zoek de zwakke plekken.</p>',
      content: `
        <p>ISO/IEC 27001 is een eisennorm waarop je je kunt laten certificeren. Er zijn ook frameworks die vooral
        helpen om te ordenen en te prioriteren. Twee daarvan kom je overal tegen, en voor de Nederlandse overheid komt
        er een derde bij.</p>
        <h3>NIST Cybersecurity Framework 2.0</h3>
        <p>Het Amerikaanse NIST publiceerde in februari 2024 versie 2.0 van het Cybersecurity Framework. Het is
        bedoeld voor organisaties van elke omvang en elke sector, niet alleen voor vitale infrastructuur. De kern
        bestaat uit zes <strong>functies</strong>:</p>
        <table>
          <thead><tr><th>Functie</th><th>Vraag</th><th>Voorbeelden</th></tr></thead>
          <tbody>
            <tr><td>Govern (GV)</td><td>Hoe sturen we?</td><td>Beleid, rollen, risicobereidheid, toezicht, ketenrisico's van leveranciers</td></tr>
            <tr><td>Identify (ID)</td><td>Wat hebben we en wat bedreigt het?</td><td>Inventaris van systemen en gegevens, risicobeoordeling</td></tr>
            <tr><td>Protect (PR)</td><td>Hoe voorkomen we schade?</td><td>Toegangsbeheer, versleuteling, training, veilige configuratie</td></tr>
            <tr><td>Detect (DE)</td><td>Hoe merken we het?</td><td>Monitoring, analyse van afwijkingen</td></tr>
            <tr><td>Respond (RS)</td><td>Wat doen we als het gebeurt?</td><td>Incidentafhandeling, communicatie, melden</td></tr>
            <tr><td>Recover (RC)</td><td>Hoe komen we terug?</td><td>Herstelplannen uitvoeren, communicatie over herstel</td></tr>
          </tbody>
        </table>
        <p><strong>Govern</strong> is nieuw in 2.0. Onderwerpen die eerder verspreid stonden, zoals het beheer van
        risico's in de keten van leveranciers, vallen daar nu onder. Govern staat in het midden van de andere vijf:
        het stuurt alles. Organisaties beschrijven met het framework hun huidige en gewenste situatie in een
        <em>profiel</em>, en het verschil ertussen wordt hun werkplan.</p>
        <h3>CIS Controls v8</h3>
        <p>Het Center for Internet Security publiceerde in 2021 de CIS Controls v8: 18 controls met daaronder concrete
        <em>safeguards</em>, geprioriteerd naar wat in de praktijk de meeste aanvallen tegenhoudt. Een paar voorbeelden: Control 1 gaat over de
        inventaris van apparaten, Control 3 over gegevensbescherming, Control 6 over toegangsbeheer en Control 17 over
        incidentrespons. De safeguards zijn ingedeeld in drie <strong>Implementation Groups</strong>: IG1 is de basis
        die elke organisatie zou moeten hebben, IG2 en IG3 bouwen daarop voort. Wie klein begint, begint bij IG1.</p>
        <h3>De BIO</h3>
        <p>De <strong>Baseline Informatiebeveiliging Overheid</strong> (BIO) is het gemeenschappelijke normenkader
        voor informatiebeveiliging van Rijk, provincies, gemeenten en waterschappen. De BIO is gebaseerd op ISO/IEC
        27001 en 27002 en voegt overheidsspecifieke eisen toe. De eerste versie sloot aan op de normen van 2013; de
        opvolger, BIO2, sluit aan op de versies van 2022. Controleer op de site van de overheid welke versie op dit
        moment geldt. Gemeenten leggen onder meer via ENSIA verantwoording af over de BIO, en kunnen voor advies
        terecht bij de Informatiebeveiligingsdienst (IBD) van de VNG.</p>
        <div class="callout tip"><strong>Samenhang:</strong> ISO/IEC 27001 is het managementsysteem, de BIO de
        overheidsbaseline daarbinnen, NIST CSF de kaart om gaten te zien en CIS Controls de takenlijst om mee te
        beginnen.</div>
      `,
      lab: {
        type: 'logs',
        title: 'maatregelenoverzicht-waterdijk.txt',
        lines: `ID   maatregel                                                                 gekoppeld-risico
M01  Informatiebeveiligingsbeleid vastgesteld door het college, rollen belegd   alle
M02  Risicobereidheid vastgesteld en jaarlijks herzien door de directie         alle
M03  Actuele inventaris van alle apparaten en software                          R1, R4
M04  MFA op alle toegang van buiten het gemeentehuis                            R1, R2
M05  Volledige schijfversleuteling op alle laptops                              R4
M06  Bewustwordingstraining voor alle medewerkers, twee keer per jaar           R1, R2, R7
M07  SIEM met alarm op afwijkend aanmeldgedrag                                  R1
M08  Steekproefcontrole op raadplegingen in de BRP via de logging               R6
M09  Incidentresponsplan met meldprocedure naar de AP en de IBD                 R1, R2
M10  Herstelplan voor het zaaksysteem met geoefende terugzetprocedure           R1, R3
M11  Beoordeling van leveranciers op informatiebeveiliging bij inkoop           R3, R8`,
      },
      questions: [
        { q: 'Hoeveel maatregelen in het overzicht horen bij de functie Govern van NIST CSF 2.0?', answer: ['3', 'drie'],
          hints: ['Govern gaat over sturen: beleid, rollen, risicobereidheid.', 'M01 en M02 zijn duidelijk. Kijk ook naar wat in 2.0 naar Govern is verhuisd.', 'Ketenrisico\'s van leveranciers vallen in 2.0 onder Govern.'],
          wrong: { '2': 'De beoordeling van leveranciers (M11) valt in CSF 2.0 ook onder Govern.', '4': 'Een inventaris (M03) hoort bij Identify, niet bij Govern.' },
          explain: 'M01, M02 en M11. Leveranciersrisico\'s stonden in CSF 1.1 bij Identify en zijn in 2.0 naar Govern verplaatst.' },
        { q: 'Bij welke functie hoort M10, het herstelplan voor het zaaksysteem?', options: ['Recover', 'Protect', 'Respond', 'Identify'], answer: 0,
          wrong: { 1: 'Protect gaat over voorkomen. Een herstelplan gaat over terugkomen na schade.', 2: 'Respond gaat over de afhandeling van het incident zelf. Het terugzetten van de dienst is herstel.', 3: 'Identify gaat over in kaart brengen wat je hebt en wat het bedreigt.' },
          explain: 'Recover: herstelplannen uitvoeren en de dienstverlening terugbrengen.' },
        { q: 'Welk nummer heeft de CIS Control die het beste past bij M03?', answer: ['1', 'control 1', 'cis control 1'],
          hints: ['M03 gaat over een inventaris.', 'De uitleg noemt een paar CIS Controls als voorbeeld.', 'De allereerste control.'],
          wrong: { '6': 'Control 6 gaat over toegangsbeheer.', '3': 'Control 3 gaat over gegevensbescherming, niet over de inventaris van apparaten.' },
          explain: 'Control 1: inventaris en beheer van apparaten (en Control 2 voor software). Wat je niet kent, kun je niet beschermen.' },
        { q: 'Boss: het risico uit het register van taak 2 dat geen eigenaar heeft en boven de risicobereidheid blijft, is in dit overzicht maar aan één maatregel gekoppeld. Die maatregel maakt misbruik zichtbaar, maar voorkomt het niet. Welke maatregel? (ID)', boss: true, answer: ['M08'],
          hints: ['Zoek eerst in het register van taak 2 welk risico het is.', 'Het risico zonder eigenaar met restrisico 10. Filter in dit overzicht op dat risico-ID.', 'Filter op R6.'],
          wrong: { 'M07': 'M07 hoort bij R1. Het gaat om het risico zonder eigenaar uit taak 2.', 'M06': 'M06 is gekoppeld aan R1, R2 en R7, niet aan het risico zonder eigenaar.', 'R6': 'Dat is het risico. Gevraagd is de ID van de maatregel.' },
          why: 'Met alleen een detectiemaatregel blijft de kans gelijk; je ziet het misbruik pas achteraf. Dat verklaart waarom het restrisico van R6 even hoog is als het inherente risico, en waarom het een eigenaar nodig heeft die extra preventieve maatregelen kan afdwingen.',
          explain: 'R6 (BRP-raadplegingen) heeft geen eigenaar en eindigt op 10. Het enige wat eraan gekoppeld is, is M08: een steekproef achteraf, een Detect-maatregel. Een Protect-maatregel, zoals toegang tot de BRP beperken tot wie die voor zijn taak nodig heeft, ontbreekt.' },
      ],
    },

    {
      title: 'Taak 6: Verdieping: kwantitatief rekenen met risico',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Kwalitatieve scores van 1 tot 5 zijn handig om te ordenen, maar een bestuurder vraagt vaak iets anders:
        "Wat kost dit risico ons per jaar, en is die maatregel van 8.000 euro het waard?" Daarvoor is er
        <strong>kwantitatieve</strong> risicoanalyse. De klassieke formules kom je tegen in examens als Security+ en
        CISSP.</p>
        <h3>De formules</h3>
        <ul>
          <li><strong>AV</strong> (<em>asset value</em>): de waarde van wat je beschermt, in euro's.</li>
          <li><strong>EF</strong> (<em>exposure factor</em>): welk deel van die waarde verloren gaat bij één
          incident, als percentage.</li>
          <li><strong>SLE</strong> (<em>single loss expectancy</em>) = AV × EF: de verwachte schade van één
          incident.</li>
          <li><strong>ARO</strong> (<em>annualized rate of occurrence</em>): hoe vaak per jaar je het incident
          verwacht. Eens in de vijf jaar is 0,2.</li>
          <li><strong>ALE</strong> (<em>annualized loss expectancy</em>) = SLE × ARO: de verwachte schade per
          jaar.</li>
        </ul>
        <p>Een maatregel is financieel de moeite waard als de daling van de ALE groter is dan de jaarlijkse kosten van
        de maatregel. Die vergelijking heet een kosten-batenanalyse.</p>
        <h3>Voorbeeld</h3>
        <p>Een laptop met herinstallatie en vervanging vertegenwoordigt 2.000 euro. Bij diefstal is hij volledig
        weg: EF is 100%, dus SLE is 2.000 euro. Gaan er per jaar gemiddeld vier verloren, dan is de ALE 8.000 euro.
        Schijfversleuteling verandert daar niets aan: de laptop is nog steeds weg. Wel verandert het de impact op de
        gegevens erop, en die waren in deze rekensom niet meegenomen. Zo zie je meteen de grenzen: de uitkomst is zo
        goed als wat je meetelt.</p>
        <h3>Waar het wringt</h3>
        <p>De formules zijn eenvoudig, de getallen niet. Hoe vaak komt ransomware voor bij een gemeente van deze
        omvang? Wat is de waarde van vertrouwen van inwoners? Daarom werken organisaties vaak met bandbreedtes in
        plaats van één getal. Een uitgewerkte methode daarvoor is FAIR (<em>Factor Analysis of Information
        Risk</em>), een open standaard van The Open Group, die met kansverdelingen en simulaties rekent.</p>
        <p>In de praktijk combineer je beide: kwalitatief om breed te ordenen, kwantitatief voor de paar grote
        beslissingen waar het geld om draait.</p>
      `,
      questions: [
        { q: 'Het zaaksysteem van Waterdijk vertegenwoordigt 400.000 euro. Een ransomware-incident vernietigt naar schatting 25% daarvan. Je verwacht zo\'n incident eens in de vijf jaar. Wat is de ALE in euro\'s?', answer: ['20000', '20.000', '€20.000', '20000 euro', '20.000 euro'],
          hints: ['Bereken eerst de SLE: AV × EF.', 'SLE is 100.000 euro. Eens in de vijf jaar is een ARO van 0,2.', '100.000 × 0,2'],
          wrong: { '100000': 'Dat is de SLE: de schade van één incident. Vermenigvuldig nog met de ARO.', '500000': 'Je hebt de SLE met 5 vermenigvuldigd. Eens in de vijf jaar is 0,2 per jaar.', '80000': 'Dat is 400.000 × 0,2. De exposure factor ontbreekt.' },
          explain: 'SLE = 400.000 × 0,25 = 100.000. ALE = 100.000 × 0,2 = 20.000 euro per jaar.' },
        { q: 'Een maatregel kost 8.000 euro per jaar en verlaagt de ARO van 0,2 naar 0,05. De SLE blijft 100.000 euro. Wat levert de maatregel netto per jaar op, in euro\'s?', answer: ['7000', '7.000', '€7.000', '7000 euro', '7.000 euro'],
          hints: ['Bereken de nieuwe ALE.', 'Nieuwe ALE: 100.000 × 0,05 = 5.000. De daling is 20.000 min 5.000.', '15.000 min de kosten van de maatregel.'],
          wrong: { '15000': 'Dat is de daling van de ALE. Trek de kosten van de maatregel er nog af.', '12000': 'Je trekt de kosten af van de oude ALE. Het gaat om de daling.' },
          explain: 'De ALE daalt van 20.000 naar 5.000: 15.000 euro. Min 8.000 euro kosten is netto 7.000 euro per jaar. De maatregel is financieel verdedigbaar.' },
      ],
    },

    {
      title: 'Taak 7: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Vragen over risicomanagement en frameworks zijn op examens als Security+ en ISC2 CC vaak begripsvragen
        in de vorm van een scenario. De organisatie doet iets, en jij moet benoemen wat het is: welke behandeling,
        welk document, welke functie. De afleiders zijn begrippen uit dezelfde familie die net iets anders betekenen.</p>
        <h3>Zo pak je ze aan</h3>
        <ul>
          <li>Bij behandelopties: vraag je af wat er gebeurt met de activiteit zelf (vermijden), met de kans of impact
          (verminderen), met het geld (overdragen) of met niets (accepteren).</li>
          <li>Bij ISO-vragen: maatregelen uit Annex A en hun keuze staan in de verklaring van toepasselijkheid; de
          eisen aan het managementsysteem staan in de hoofdstukken.</li>
          <li>Bij NIST CSF 2.0: alles wat met sturen, rollen, beleid en leveranciers te maken heeft, is Govern.</li>
          <li>Bij acceptatie: let op wie besluit. Een antwoord waarin de IT-afdeling of de security officer een
          bedrijfsrisico accepteert, is bijna altijd fout.</li>
        </ul>
        <p>Rekenvragen komen ook voor: een kans en een impact, of een SLE en een ARO, met als afleiders de uitkomsten
        van de meest gemaakte rekenfouten. Schrijf de tussenstap altijd op, ook als je het antwoord meteen denkt te
        zien.</p>
        <p>Warm op met het lab: zet de stappen van het risicoproces in de juiste volgorde. De vijf vragen eronder zijn
        zelf geschreven in examenstijl. Alle organisaties zijn fictief.</p>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de stappen van het risicoproces in de juiste volgorde.',
        items: [
          { id: 'a', label: 'Context en scope bepalen, risicobereidheid vaststellen' },
          { id: 'b', label: 'Risico\'s identificeren: wat kan er misgaan?' },
          { id: 'c', label: 'Risico\'s analyseren: kans en impact inschatten' },
          { id: 'd', label: 'Risico\'s evalueren: vergelijken met de risicobereidheid en prioriteren' },
          { id: 'e', label: 'Risico\'s behandelen: kiezen, uitvoeren en het restrisico laten accepteren' },
          { id: 'f', label: 'Monitoren en opnieuw beoordelen' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
        explain: 'Dit is de volgorde uit ISO 31000 en ISO/IEC 27005: context, identificeren, analyseren, evalueren, behandelen, en daarna blijven volgen.',
      },
      questions: [
        { q: 'Een fictief transportbedrijf sluit een cyberverzekering af die de kosten van een ransomware-incident vergoedt. Welke risicobehandeling is dit?',
          options: ['Verminderen', 'Overdragen', 'Accepteren', 'Vermijden'], answer: 1,
          wrong: { 0: 'De kans en de impact op de bedrijfsvoering blijven gelijk. Alleen de financiële gevolgen verschuiven.', 2: 'Er wordt wel iets gedaan: een deel van het risico wordt bij een ander gelegd.', 3: 'Het bedrijf blijft dezelfde systemen en activiteiten gebruiken.' },
          explain: 'Overdragen (of delen): de financiële gevolgen gaan deels naar de verzekeraar. De verantwoordelijkheid blijft bij het bedrijf.' },
        { q: 'Een fictieve hogeschool scoort een risico met kans 4 en impact 4. De risicobereidheid is een score van 12 of lager. Het afdelingshoofd ICT wil het risico accepteren. Wat is de beste reactie?',
          options: ['Akkoord, omdat hij de technische kennis heeft', 'Eerst maatregelen overwegen, en een restrisico boven 12 laten accepteren door het bestuur', 'Het risico uit het register halen, omdat het toch geaccepteerd wordt', 'De score verlagen tot 12, zodat het binnen de risicobereidheid valt'], answer: 1,
          wrong: { 0: 'Technische kennis is niet hetzelfde als mandaat. Boven de risicobereidheid besluit het bestuur.', 2: 'Een geaccepteerd risico blijft in het register, met het besluit erbij.', 3: 'De score aanpassen aan de uitkomst is geen risicomanagement maar cosmetica.' },
          explain: '4 × 4 = 16, boven de 12. Eerst verminderen, en wat dan nog boven de grens ligt, hoort bij het bestuur.' },
        { q: 'Een fictief adviesbureau wil volgens NIST CSF 2.0 vastleggen hoe het de risico\'s van zijn IT-leveranciers beheert. Onder welke functie valt dat?',
          options: ['Identify', 'Protect', 'Govern', 'Respond'], answer: 2,
          wrong: { 0: 'In CSF 1.1 stond ketenrisicobeheer bij Identify. In 2.0 is het verhuisd.', 1: 'Protect gaat over maatregelen die schade voorkomen, zoals toegangsbeheer en versleuteling.', 3: 'Respond gaat over de afhandeling van incidenten.' },
          explain: 'In CSF 2.0 valt het beheer van ketenrisico\'s onder Govern.' },
        { q: 'Een auditor vraagt een fictief ziekenhuis om een document waarin voor elke maatregel uit ISO/IEC 27001:2022 Annex A staat of die is ingevoerd en waarom een uitsluiting gerechtvaardigd is. Welk document is dat?',
          options: ['Het risicoregister', 'Het informatiebeveiligingsbeleid', 'Het risicobehandelplan', 'De verklaring van toepasselijkheid'], answer: 3,
          wrong: { 0: 'Het register beschrijft risico\'s, niet de keuze per maatregel uit Annex A.', 1: 'Het beleid geeft de richting op hoofdlijnen.', 2: 'Het behandelplan beschrijft hoe risico\'s worden aangepakt. Het overzicht per maatregel met uitsluitingen is een ander document.' },
          explain: 'De verklaring van toepasselijkheid (Statement of Applicability) bevat alle 93 maatregelen met de keuze en de reden.' },
        { q: 'Een fictieve stichting met twee IT-medewerkers wil met de CIS Controls v8 beginnen, maar kan niet alles tegelijk. Wat is het beste advies?',
          options: ['Beginnen bij Control 18, penetratietesten, om te zien waar het misgaat', 'Beginnen met de safeguards van Implementation Group 1', 'Alle 18 controls tegelijk half invoeren', 'Eerst een ISO/IEC 27001-certificaat halen'], answer: 1,
          wrong: { 0: 'Een pentest zonder basis levert vooral een lange lijst bekende gaten op.', 2: 'Half invoeren levert overal een beetje en nergens bescherming op.', 3: 'Een certificaat is een groot traject en geen startpunt voor een kleine organisatie zonder basismaatregelen.' },
          explain: 'IG1 is de basis van de CIS Controls: de maatregelen die elke organisatie zou moeten hebben, ook met weinig mensen.' },
      ],
    },
  ],

  terms: [
    { term: 'Risico', def: 'De combinatie van de kans dat een dreiging een kwetsbaarheid raakt en de impact die dat heeft; vaak geschat als kans × impact.' },
    { term: 'Restrisico', def: 'Het risico dat overblijft na het nemen van maatregelen; dit vergelijk je met de risicobereidheid.' },
    { term: 'Risicobereidheid', def: 'Hoeveel risico een organisatie bewust wil lopen; vastgesteld door de top (risk appetite).' },
    { term: 'Risico-eigenaar', def: 'Degene met het mandaat en budget om over een risico te besluiten.' },
    { term: 'Risicobehandeling', def: 'De keuze tussen verminderen, vermijden, overdragen of delen, en accepteren.' },
    { term: 'ISMS', def: 'Managementsysteem voor informatiebeveiliging; de eisen staan in ISO/IEC 27001:2022.' },
    { term: 'Verklaring van toepasselijkheid', def: 'Statement of Applicability: overzicht van alle maatregelen uit Annex A met de keuze en de onderbouwing.' },
    { term: 'NIST CSF 2.0', def: 'Cybersecurity Framework van NIST (2024) met zes functies: Govern, Identify, Protect, Detect, Respond, Recover.' },
    { term: 'CIS Controls v8', def: 'Geprioriteerde lijst van 18 controls met safeguards van het Center for Internet Security, ingedeeld in drie Implementation Groups.' },
    { term: 'BIO', def: 'Baseline Informatiebeveiliging Overheid: het gemeenschappelijke normenkader voor Nederlandse overheden, gebaseerd op ISO/IEC 27001 en 27002.' },
  ],

  resources: [
    { title: 'ISO: ISO/IEC 27001:2022 Information security management systems', url: 'https://www.iso.org/standard/82875.html' },
    { title: 'NIST: Cybersecurity Framework 2.0 (2024)', url: 'https://www.nist.gov/cyberframework' },
    { title: 'CIS: Critical Security Controls', url: 'https://www.cisecurity.org/controls' },
    { title: 'Digitale Overheid: informatie over de BIO en ENSIA', url: 'https://www.digitaleoverheid.nl/' },
  ],
});
