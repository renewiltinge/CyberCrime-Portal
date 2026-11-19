/* Room: Tactisch analist cybercrime — Solliciteren en het assessment voorbereiden */

// =======================================================================
//  Gebaseerd op een politievacature voor tactisch analist bij Team
//  Cybercrime (Eenheid Den Haag), sluitingsdatum 6 november 2026.
//  De dojo zegt NIETS over de werkelijke inhoud van het politie-assessment:
//  alles over de procedure komt uit de vacaturetekst zelf. De casus in
//  taak 3 (meldingen, webshop, gemeente, school, booterdienst) is fictief.
// =======================================================================

// --- Ordering: de route van sollicitatie tot vaste aanstelling ---
const TAAV_STEPS = [
  { id: 'a', label: 'Je solliciteert vóór de sluitingsdatum via de sollicitatiebutton, met cv, motivatie en bewijs van je hbo-niveau' },
  { id: 'b', label: 'Selectie: gesprekken met het team, en mogelijk een vakinhoudelijk assessment' },
  { id: 'c', label: 'Toetsing vóór de opleiding: het verplichte assessment (positief afronden) en het betrouwbaarheids- en omgevingsonderzoek' },
  { id: 'd', label: 'Start als ambtenaar in opleiding: de 14-weekse opleiding specifieke inzetbaarheid aan de Politieacademie, eventueel met een aanvullend programma' },
  { id: 'e', label: 'Na het behalen van de opleiding: een tijdelijke aanstelling met een proeftijd van één jaar' },
  { id: 'f', label: 'Na de proeftijd: zo snel mogelijk een vaste aanstelling' },
];

// --- Scenario: zes gespreksvragen, kies steeds het sterkste antwoord ---
const TAAV_INTERVIEW = [
  {
    situation: 'Vraag 1 (motivatie): "Waarom wil je tactisch analist worden bij ons team cybercrime?"',
    choices: [
      { label: '"Ik zoek een vaste baan met een goed salaris, en de politie is een stabiele werkgever."', good: false, feedback: 'Eerlijk, maar het zegt niets over het werk. Arbeidsvoorwaarden zijn geen motivatie voor déze functie.' },
      { label: '"In mijn huidige werk zie ik losse phishingmeldingen binnenkomen die niemand met elkaar verbindt. Ik wil het werk doen waarin je dat beeld wél maakt en er een interventie aan koppelt. Laatst heb ik zelf zes meldingen naast elkaar gelegd en zag ik dat ze één afzender hadden; dat wil ik dagelijks doen, met de bevoegdheden en partners die een opsporingsteam heeft."', good: true, feedback: 'Sterk: concreet, gekoppeld aan de taken uit de vacature (beeldvorming, dwarsverbanden, interventiekansen) en onderbouwd met een eigen voorbeeld.' },
      { label: '"Cybercrime is het meest spannende vakgebied dat er is. Ik kijk alle documentaires over hackers."', good: false, feedback: 'Affiniteit is goed, maar het blijft algemeen en gaat over spanning, niet over wat jij komt doen.' },
    ],
  },
  {
    situation: 'Vraag 2 (analytisch): "Vertel over een keer dat je in veel informatie een verband vond dat anderen misten."',
    choices: [
      { label: '"Ik ben van nature heel analytisch, dat zeggen mijn collega\'s ook altijd."', good: false, feedback: 'Een bewering zonder voorbeeld. De interviewer wil gedrag horen, geen zelfbeeld.' },
      { label: '"Bij een woningcorporatie kwamen in drie maanden 140 klachten over nepverhuurders binnen (S). Ik moest bepalen of het om losse gevallen ging (T). Ik zette alle klachten in een tabel en zocht op gedeelde telefoonnummers en IBAN\'s; vier nummers kwamen in 61 klachten terug (A). We deden één gebundelde aangifte en de advertenties verdwenen binnen een maand (R). Achteraf zou ik eerder een collega laten meekijken op mijn aannames."', good: true, feedback: 'Sterk: een volledig STAR-antwoord met een methode, een getal, een resultaat en een korte reflectie.' },
      { label: '"Ik heb een keer een Python-script van 800 regels geschreven met pandas, regex en een eigen parser voor een logformaat en..." (en het verhaal stopt bij de techniek)', good: false, feedback: 'Techniek is welkom, maar zonder situatie, doel en resultaat weet de interviewer niet wat het opleverde.' },
    ],
  },
  {
    situation: 'Vraag 3 (verbinder): "Hoe kreeg je een partner die niet onder jou viel zover om iets te doen?"',
    choices: [
      { label: '"Ik heb de leidinggevende van die partner gebeld en laten weten dat het moest."', good: false, feedback: 'Opschalen kan een laatste stap zijn, maar zo bouw je geen brug. De vraag gaat over overtuigen zonder zeggenschap.' },
      { label: '"Ik ben eerst bij ze langsgegaan om te horen wat zíj nodig hadden. Daarna heb ik mijn analyse herschreven tot één pagina in hun taal, met wat het hen oplevert. Ze namen de maatregel over en vragen me nu zelf om updates."', good: true, feedback: 'Sterk: je begint bij het belang van de ander, maakt je product begrijpelijk voor minder gespecialiseerde partners en laat het resultaat zien. Dat is precies wat de vacature vraagt.' },
      { label: '"Ik stuur mijn rapport gewoon naar iedereen; wie het leest, leest het."', good: false, feedback: 'Zenden is geen verbinden. Er is geen afstemming en geen resultaat.' },
    ],
  },
  {
    situation: 'Vraag 4 (coach): "Een junior-analist levert een product waarin de conclusies niet uit de data volgen. Wat doe je?"',
    choices: [
      { label: '"Ik herschrijf het zelf, dan is het tenminste goed en snel klaar."', good: false, feedback: 'Het product is gered, de collega leert niets. De vacature noemt je juist een coach voor andere analisten.' },
      { label: '"Ik ga naast hem zitten en vraag per conclusie: welk gegeven draagt dit? Waar hij het zelf niet kan aanwijzen, laat ik hem labelen als aanname. Daarna spreken we af hoe we dat in het team standaard doen."', good: true, feedback: 'Sterk: je laat de ander het gat zelf vinden, je maakt de methode overdraagbaar en je verbetert het analyseproces voor het hele team.' },
      { label: '"Ik meld het bij de teamleider, die moet dit oppakken."', good: false, feedback: 'Doorschuiven zonder zelf te coachen. Pas bij een herhaald patroon ligt een gesprek met de leiding voor de hand.' },
    ],
  },
  {
    situation: 'Vraag 5 (ongevraagd adviseren en initiatief): "Je ziet dat een onderzoek een route kiest waarvan jij denkt dat een verstoring met een private partner meer oplevert. Niemand vraagt je mening. Wat doe je?"',
    choices: [
      { label: '"Ik zeg niets. Het is niet mijn onderzoek."', good: false, feedback: 'De vacature vraagt uitdrukkelijk om advies, ook ongevraagd, en om initiatief.' },
      { label: '"Ik bel de private partner alvast zelf, dan is het geregeld."', good: false, feedback: 'Initiatief, maar buiten de afspraken om. Dat kan een onderzoek schaden en het vertrouwen in het team ook.' },
      { label: '"Ik zet mijn advies kort op papier, met onderbouwing, kansen en risico\'s, en bespreek het met de teamleider of de zaaksofficier vóór het volgende overleg. Als er anders besloten wordt, steun ik dat besluit."', good: true, feedback: 'Sterk: onderbouwd, op het goede moment, bij de juiste persoon, en je accepteert dat een ander beslist.' },
    ],
  },
  {
    situation: 'Vraag 6 (onder druk, 24/7-mentaliteit): "Vrijdag 22:00 legt een DDoS het portaal van een gemeente plat. Morgen 08:00 wil de leiding een eerste beeld. Hoe pak je dat aan?"',
    choices: [
      { label: '"Ik zoek eerst alles tot op de bodem uit, zodat ik maandag een volledig rapport kan leveren."', good: false, feedback: 'Grondig, maar te laat. Onder tijdsdruk lever je eerst een kort beeld met de onzekerheid erbij.' },
      { label: '"Ik bepaal wat de leiding om 08:00 moet weten, verzamel de eerste gegevens van de gemeente en de provider, en lever een halve pagina: wat we weten, wat we denken en wat we nog niet weten. Daarna plan ik het vervolg."', good: true, feedback: 'Sterk: prioriteren, conclusie eerst en eerlijk over onzekerheid. Dat is werken onder druk zonder slordig te worden.' },
      { label: '"Buiten kantoortijd neem ik niet op. Maandag kijk ik ernaar."', good: false, feedback: 'De vacature vraagt een flexibele 24/7-mentaliteit: er zijn als je expertise nodig is.' },
    ],
  },
];

// --- BLUF: oefen-assessment met vier losse meldingen (fictief) ---
const TAAV_BLUF_SOURCE = [
  'Melding 1 (basisteam, maandag 09:10): aangifte van webshop Tegelhuis Noord. De site lag vrijdag, zaterdag en zondag telkens rond 20:00 zo\'n 15 minuten plat. De hostingprovider spreekt van een overbelastingsaanval (DDoS) met UDP-verkeer van duizenden adressen. Geen afpersingsbericht ontvangen.',
  'Melding 2 (gemeente Polderveen, dinsdag 10:30): het inschrijfportaal voor de zomerregeling lag dinsdag van 08:55 tot 09:40 plat, precies bij de opening. Het aanvalsverkeer was volgens de leverancier UDP-reflectie (amplificatie). Er is veel ophef op sociale media.',
  'Melding 3 (scholengemeenschap De Brug, woensdag 14:00): het schoolnetwerk viel tijdens de toetsweek twee keer uit. Een docent zag in een groepschat dat een leerling opschepte dat hij "voor 10 euro de school offline haalde" met StormStress.',
  'Melding 4 (open bron, woensdag 16:00): de booterdienst StormStress adverteert op Telegram met abonnementen vanaf 10 euro per maand. In het kanaal staat een schermafdruk van het onbereikbare portaal van Polderveen met de tekst "down". Een partner meldt dat de aanvalspatronen bij alle drie de slachtoffers lijken op elkaar: UDP-reflectie, korte aanvallen van 15 tot 45 minuten.',
].join('\n\n');

const TAAV_BLUF_MODEL = [
  'BEOORDELING: De DDoS-aanvallen op de gemeente Polderveen en op scholengemeenschap De Brug zijn zeer waarschijnlijk uitgevoerd via de booterdienst StormStress. De aanvallen op webshop Tegelhuis Noord passen in hetzelfde patroon, maar de koppeling is zwakker (reële kans): alleen techniek en duur komen overeen.',
  'ADVIES: (1) Behandel de drie meldingen als één fenomeen en koppel de dossiers. Eigenaar: team cybercrime. (2) Ga met de school en het basisteam in gesprek over de leerling; overweeg een preventieve of alternatieve aanpak. Eigenaar: basisteam, in overleg met het OM. (3) Breng de infrastructuur en betaalroute van StormStress in kaart als basis voor verstoring met partners. Eigenaar: team cybercrime. (4) Adviseer de gemeente en de school over DDoS-mitigatie bij hun leverancier. Eigenaar: gemeente en school.',
  'ONDERBOUWING EN ONZEKERHEID: Bekend: gelijk aanvalstype (UDP-reflectie) en korte duur bij alle drie; een schermafdruk van het Polderveen-portaal in het StormStress-kanaal; een leerling noemt StormStress. Afgeleid: dezelfde dienst, verschillende klanten. Aanname: de leerling heeft de schoolaanval zelf besteld (alleen een groepschat, niet geverifieerd).',
].join('\n\n');

CS.registerRoom({
  id: 'ta-assessment-voorbereiding',
  path: 'tactisch-analist',
  order: 8,
  title: 'Solliciteren en het assessment voorbereiden',
  icon: '🎯',
  difficulty: 'Gemiddeld',
  minutes: 75,
  level: 'Praktijk',
  checked: '2026-11-19',
  summary: 'Hoe de selectie voor tactisch analist cybercrime verloopt volgens de vacature, van sollicitatie via assessment en betrouwbaarheidsonderzoek tot de opleiding en de proeftijd. Je oefent je verhaal met de STAR-methode, doet een oefen-assessment met vier losse meldingen en maakt een ontwikkelplan met de rooms van de dojo.',
  objectives: [
    'De stappen van de selectieprocedure uit de vacature in de goede volgorde zetten en zeggen wat elke stap toetst',
    'De formele eisen benoemen: nationaliteit, hbo-niveau (diploma, EVC of aantoonbare werkervaring) en rijbewijs B',
    'Een gespreksantwoord opbouwen met de STAR-methode en koppelen aan een competentie uit de vacature',
    'Onder tijdsdruk losse meldingen omzetten in een kort product met de conclusie eerst',
    'Je eigen sterke en zwakke punten scannen en een ontwikkelplan maken met rooms uit de dojo',
  ],
  tasks: [
    {
      title: 'Taak 1 — De procedure stap voor stap',
      tryFirst: true,
      intro: '<p>In het lab staan zes stappen van de route naar tactisch analist, door elkaar. Zet ze in de volgorde die uit de vacature volgt: van je sollicitatie tot je vaste aanstelling. Bedenk bij elke stap wat er wordt getoetst.</p>',
      content: `
        <p>Een sollicitatie bij de politie lijkt op die bij elke andere werkgever, met een paar stappen erbij die
        je bij een bedrijf niet tegenkomt. Wie ze van tevoren kent, schrikt niet en kan zich gericht voorbereiden.
        Alles in deze taak komt uit de vacaturetekst voor tactisch analist bij Team Cybercrime (Eenheid Den Haag).</p>

        <div class="callout warn"><strong>Let op:</strong> deze vacature sloot op <strong>6 november 2026</strong>.
        Vandaag (19 november 2026) kun je er niet meer op reageren. Gebruik deze room als voorbereiding en houd
        werkenbijdepolitie.nl in de gaten voor een nieuwe vacature. Procedures veranderen: lees bij een nieuwe
        vacature altijd de actuele tekst en de informatiepagina waarnaar die verwijst.</div>

        <h3>De route en wat elke stap toetst</h3>
        <table>
          <thead><tr><th>Stap</th><th>Wat er gebeurt</th><th>Wat er wordt getoetst</th></tr></thead>
          <tbody>
            <tr><td><strong>Sollicitatie</strong></td><td>Reageren via de sollicitatiebutton, vóór de sluitingsdatum.</td><td>Of je aan de formele eisen voldoet en of je motivatie past bij de functie.</td></tr>
            <tr><td><strong>Selectie</strong></td><td>Gesprekken; volgens de vacature maakt een vakinhoudelijk assessment <em>mogelijk</em> deel uit van de procedure.</td><td>Je competenties, je verhaal en (bij een vakinhoudelijk assessment) je vakmanschap.</td></tr>
            <tr><td><strong>Verplicht assessment</strong></td><td>Positief afronden is voorwaarde om aan de opleiding te beginnen.</td><td>De vacature zegt niet wat erin zit; ze verwijst naar een informatiepagina over selectie, assessment en opleiding.</td></tr>
            <tr><td><strong>Betrouwbaarheids- en omgevingsonderzoek</strong></td><td>Onderdeel van de selectieprocedure.</td><td>Je betrouwbaarheid en integriteit; ook je omgeving wordt erbij betrokken.</td></tr>
            <tr><td><strong>Opleiding</strong></td><td>Afhankelijk van je achtergrond een 14-weekse opleiding voor specifieke inzetbaarheid aan de Politieacademie (36 uur per week), eventueel met een aanvullend programma. Je bent dan tijdelijk ambtenaar in opleiding en krijgt je salaris.</td><td>Het behalen is een vereiste om de functie uit te oefenen.</td></tr>
            <tr><td><strong>Aanstelling</strong></td><td>Na de opleiding een tijdelijke aanstelling met een jaar proeftijd; daarna zo snel mogelijk een vaste aanstelling.</td><td>Of je in de praktijk functioneert.</td></tr>
          </tbody>
        </table>
        <p>De vacature noemt de onderdelen, maar geen planning en geen exacte volgorde van gesprekken, assessments en
        onderzoek. De volgorde in het lab is de logische route: eerst selecteren, dan de toetsen die voorwaarde zijn
        voor de opleiding, dan opleiden, dan aanstellen.</p>

        <h3>De formele eisen</h3>
        <ul>
          <li><strong>Nederlandse nationaliteit</strong>; dat mag ook je tweede nationaliteit zijn.</li>
          <li><strong>Hbo-niveau (bachelor)</strong>: een diploma, een gelijkstelling via <strong>EVC</strong>
          (erkenning van verworven competenties), of minstens twee jaar werkervaring op dat niveau, aangetoond met een
          formeel bewijsstuk dat op jou herleidbaar is. Denk aan een werkgeversverklaring waarin het werk- en
          denkniveau staat, of een uittreksel uit een HR-systeem.</li>
          <li><strong>Rijbewijs B</strong>, goede kennis van het Engels in woord en geschrift, en kennis van
          analysemethoden (bij voorkeur crime scripting), programmeertalen, databases en visualisatiesoftware.</li>
        </ul>

        <h3>Extern en intern</h3>
        <p>De vacature bestond in twee versies. De <strong>externe</strong> stond open voor iedereen die aan de eisen
        voldoet. De <strong>interne</strong> stond alleen open voor politiemedewerkers met een vaste aanstelling,
        tijdelijke medewerkers die minstens een jaar bij de politie werken, en politievrijwilligers. Bij meerdere
        geschikte kandidaten krijgt daar een beroepsmedewerker voorrang op een vrijwilliger. Interne kandidaten
        tonen hun niveau ook aan met bijvoorbeeld een aanstellings- of waarnemingsbesluit, en ook voor hen geldt dat
        het politiediploma Specifieke Inzet nodig is.</p>

        <div class="callout info"><strong>Eerlijk:</strong> de dojo bereidt je voor op de vaardigheden uit de
        vacature. Over de werkelijke inhoud van het politie-assessment zegt deze room niets; die staat niet in de
        vacature en wij verzinnen hem niet.</div>
        <div class="callout tip"><strong>Beloning:</strong> zet de route in de goede volgorde en het lab toont de vlag.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'van sollicitatie tot vaste aanstelling',
        prompt: 'Zet de zes stappen in de volgorde die uit de vacature volgt.',
        items: TAAV_STEPS,
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
        flag: 'NM{route_naar_de_recherche}',
        explain: 'Solliciteren, selecteren, de toetsen die voorwaarde zijn voor de opleiding, de opleiding als ambtenaar in opleiding, een jaar proeftijd, en dan een vaste aanstelling.',
      },
      questions: [
        { q: 'Welke vlag toont het lab bij de juiste volgorde?', answer: ['NM{route_naar_de_recherche}'],
          hints: ['Zet de stappen goed en klik op Controleer volgorde.', 'Opleiden komt pas na de toetsen die er voorwaarde voor zijn.'],
          explain: 'De vlag is NM{route_naar_de_recherche}.' },
        { q: 'Hoeveel weken duurt de opleiding voor specifieke inzetbaarheid aan de Politieacademie volgens de vacature?', answer: ['14', 'veertien', '14 weken'],
          hints: ['Kijk in de tabel bij de stap Opleiding.'],
          wrong: { '52': 'Dat is de proeftijd van een jaar, die komt ná de opleiding.' },
          why: 'Veertien weken voltijd betekent dat je na je selectie nog een flinke tijd niet operationeel bent. Plan daar je overstap op.',
          explain: 'Veertien weken, 36 uur per week, eventueel gevolgd door een aanvullend programma.' },
        { q: 'Wat is volgens de vacature de voorwaarde om aan de opleiding te mogen beginnen?', options: ['Het verplichte assessment positief afronden', 'Een jaar proeftijd doorlopen', 'Een vakinhoudelijk assessment, dat altijd verplicht is', 'Een vaste aanstelling hebben'], answer: 0,
          wrong: { 1: 'De proeftijd komt ná de opleiding.', 2: 'Het vakinhoudelijk assessment is volgens de vacature "mogelijk" onderdeel van de procedure, niet altijd.', 3: 'De vaste aanstelling is het eindpunt, niet het begin.' },
          explain: 'De vacature: "Het positief afronden van het verplichte assessment is voorwaarde om aan de opleiding te kunnen beginnen."' },
        { q: 'Je hebt geen hbo-diploma, maar wel drie jaar ervaring als data-analist op hbo-niveau. Wat heb je volgens de vacature nodig?', options: ['Een formeel bewijsstuk, zoals een werkgeversverklaring waarin het werk- en denkniveau staat', 'Niets, ervaring telt niet', 'Een referentie van een vriend die bij de politie werkt', 'Een certificaat van een online cursus'], answer: 0,
          wrong: { 1: 'Ervaring telt wel: minstens twee jaar op het gevraagde niveau, als je het formeel aantoont.', 2: 'Een referentie is geen formeel bewijsstuk dat op jouw functie herleidbaar is.', 3: 'Een cursuscertificaat zegt niets over het niveau waarop je hebt gewerkt.' },
          explain: 'Twee jaar werkervaring op hbo-niveau telt, mits aangetoond met een formeel bewijsstuk dat op jou herleidbaar is.' },
      ],
    },

    {
      title: 'Taak 2 — Je verhaal: motivatie en STAR',
      tryFirst: true,
      intro: '<p>In het lab stelt een selectiecommissie je zes vragen. Bij elke vraag staan drie antwoorden. Kies steeds het sterkste. Haal je er minstens vijf goed, dan krijg je de vlag.</p>',
      content: `
        <p>In een sollicitatiegesprek wil de commissie weten hoe je je <em>gedraagt</em>, niet hoe je jezelf ziet.
        "Ik ben analytisch" bewijst niets. Een verhaal over een keer dat je analytisch wérkte, met een uitkomst, wel.
        Daarvoor is de <strong>STAR-methode</strong> handig:</p>
        <ul>
          <li><strong>S — Situatie</strong>: waar was je, wat speelde er? Eén of twee zinnen.</li>
          <li><strong>T — Taak</strong>: wat was jouw rol of opdracht?</li>
          <li><strong>A — Actie</strong>: wat deed <em>jij</em> concreet? Zeg "ik", niet "we".</li>
          <li><strong>R — Resultaat</strong>: wat leverde het op, het liefst met een getal of een gevolg. Een korte
          reflectie ("achteraf zou ik ...") maakt het sterker.</li>
        </ul>

        <h3>Koppel je verhalen aan de vacature</h3>
        <p>De vacature noemt de competenties letterlijk. Bereid voor elke competentie één STAR-verhaal voor:</p>
        <table>
          <thead><tr><th>Competentie uit de vacature</th><th>Waar je verhaal over gaat</th></tr></thead>
          <tbody>
            <tr><td><strong>Analytisch</strong></td><td>Een verband vinden in veel informatie, hoofd- en bijzaken scheiden, de juiste conclusie trekken.</td></tr>
            <tr><td><strong>Verbinder</strong></td><td>Een partner overtuigen zonder dat je er zeggenschap over hebt; vraag en aanbod bij elkaar brengen.</td></tr>
            <tr><td><strong>Coach</strong></td><td>Een collega beter maken in plaats van het werk over te nemen; een nieuwe methode invoeren.</td></tr>
            <tr><td><strong>Adviseren, gevraagd en ongevraagd</strong></td><td>Een advies geven dat niemand vroeg, onderbouwd en op het juiste moment.</td></tr>
            <tr><td><strong>Initiatief</strong></td><td>Iets in gang zetten wat anders was blijven liggen.</td></tr>
            <tr><td><strong>Flexibel, 24/7-mentaliteit</strong></td><td>Er zijn als het nodig is, ook buiten kantoortijd.</td></tr>
            <tr><td><strong>Werken onder druk</strong></td><td>Een strakke deadline halen zonder slordig te worden.</td></tr>
          </tbody>
        </table>

        <h3>Voorbeeld: van zwak naar sterk</h3>
        <p><em>Zwak:</em> "Ik werk goed samen met andere organisaties."<br>
        <em>Sterk:</em> "Bij de gemeente kwamen meldingen over nepfacturen binnen bij drie afdelingen die elkaar niet
        spraken (S). Ik moest de afhandeling verbeteren (T). Ik zette een kort maandoverleg op en maakte één
        meldformulier (A). Binnen een kwartaal ging de doorlooptijd van twee weken naar twee dagen (R)."</p>

        <h3>Je motivatie</h3>
        <p>De vraag "waarom deze functie?" komt vrijwel altijd. Een sterk antwoord noemt iets uit het werk zelf
        (beeldvorming, dwarsverbanden, interventiekansen, intelligenceproducten), laat zien dat je weet wat het team
        doet (ransomware, DDoS, malware, hacking, bulletproof hosting, vaak met een internationale kant) en geeft een
        eigen voorbeeld. Arbeidsvoorwaarden zijn prima om te weten, maar geen motivatie. De vacature vraagt ook:
        "met welke unieke blik kom jij ons versterken?" Zorg dat je daar één zin op hebt.</p>

        <div class="callout tip"><strong>Tip:</strong> schrijf je zeven verhalen op een kaartje van één regel per
        STAR-letter. Oefen ze hardop. Een verhaal dat je kunt vertellen in negentig seconden is lang genoeg.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'zes gespreksvragen',
        scenario: 'Je zit tegenover een selectiecommissie voor de functie tactisch analist cybercrime. Kies bij elke vraag het sterkste antwoord.',
        pass: 5,
        flag: 'NM{star_met_resultaat}',
        steps: TAAV_INTERVIEW,
      },
      questions: [
        { q: 'Welke vlag krijg je als je minstens vijf van de zes vragen goed beantwoordt?', answer: ['NM{star_met_resultaat}'],
          hints: ['Rond de beslissimulatie af met minstens vijf goede keuzes.'],
          explain: 'De vlag is NM{star_met_resultaat}.' },
        { q: 'Welke letter van STAR ontbreekt het vaakst in een zwak antwoord, waardoor de commissie niet weet wat je actie opleverde?', answer: ['R', 'resultaat'],
          hints: ['Denk aan het antwoord over het Python-script in het lab.', 'Het is de laatste letter.'],
          wrong: { 'a': 'In dat antwoord stond juist veel actie. Wat ontbrak, was de uitkomst.', 's': 'De situatie ontbreekt soms, maar het zwakke antwoord in het lab stopte bij de techniek.' },
          why: 'Zonder resultaat blijft een verhaal een opsomming van bezigheden. Een getal of gevolg maakt het geloofwaardig.',
          explain: 'Het resultaat (R) laat zien dat je actie ergens toe leidde.' },
        { q: 'Een kandidaat vertelt hoe hij een junior-collega liet zien waar zijn conclusies niet uit de data volgden, en daarna een teamafspraak maakte. Welke competentie uit de vacature toont dat vooral?', options: ['Coach', 'Flexibel inzetbaar', 'Werken onder druk', 'Affiniteit met cybercrime'], answer: 0,
          wrong: { 1: 'Flexibiliteit gaat over beschikbaar zijn als het nodig is.', 2: 'Er is in dit verhaal geen deadline.', 3: 'Affiniteit is een eis, maar het verhaal gaat over een collega beter maken.' },
          explain: 'Een collega laten leren en een methode in het team invoeren: dat is coachen.' },
      ],
    },

    {
      title: 'Taak 3 — Oefen-assessment: vier meldingen, dertig minuten',
      tryFirst: true,
      intro: '<p>Zet een timer op dertig minuten. In het lab staan vier losse meldingen over overbelastingsaanvallen (DDoS). Schrijf er een product van hooguit een halve pagina van: conclusie eerst, dan je advies met een eigenaar, dan de onderbouwing en wat je nog niet weet.</p>',
      content: `
        <p>De vacature zegt dat een vakinhoudelijk assessment mogelijk deel uitmaakt van de selectie. Hoe dat er bij
        de politie uitziet, weten we niet en verzinnen we niet. Wat we wel weten, is wat de vacature van je vraagt:
        snel inzicht genereren, dwarsverbanden tussen incidenten zien, hoofd- en bijzaken scheiden en helder
        rapporteren voor partners die minder gespecialiseerd zijn. Deze oefening traint precies dat. De casus is
        fictief.</p>

        <h3>Hoe je dertig minuten indeelt</h3>
        <ol>
          <li><strong>5 minuten lezen.</strong> Lees alle meldingen eerst helemaal. Onderstreep wat in meer dan één
          melding terugkomt: tijdstip, techniek, een naam.</li>
          <li><strong>5 minuten verbinden.</strong> Welke meldingen hangen aan elkaar, en hoe sterk is elke koppeling?
          Een schermafdruk in een advertentiekanaal is sterker dan "het leek op elkaar".</li>
          <li><strong>15 minuten schrijven.</strong> Begin met de conclusie (BLUF: <em>bottom line up front</em>).
          Gebruik waarschijnlijkheidstaal ("zeer waarschijnlijk", "reële kans"). Geef elk advies een eigenaar.</li>
          <li><strong>5 minuten controleren.</strong> Staat er iets in je conclusie dat niet uit de meldingen volgt?
          Haal het weg of label het als aanname.</li>
        </ol>

        <h3>Wat een booterdienst is</h3>
        <p>Een <strong>booter</strong> of <strong>stresser</strong> is een website of chatkanaal waar je voor een paar
        euro een DDoS-aanval bestelt. De klant hoeft niets te kunnen: hij vult een adres in en kiest een duur. De
        dienst gebruikt vaak <strong>reflectie en amplificatie</strong>: kleine verzoeken met een vervalst
        afzenderadres naar slecht ingestelde servers, die een veel groter antwoord naar het slachtoffer sturen. De
        klanten zijn opvallend vaak jongeren. Daarom hoort bij een goed advies niet alleen opsporing, maar ook
        preventie en soms een alternatieve aanpak voor jonge daders (zie de room <code>cybercrime-ecosysteem</code>).</p>

        <h3>Valkuilen</h3>
        <ul>
          <li><strong>Chronologisch navertellen.</strong> De lezer moet de conclusie zelf zoeken. Zet hem bovenaan.</li>
          <li><strong>Alles even zeker.</strong> De koppeling van de webshop aan de booter is zwakker dan die van de
          gemeente. Zeg dat.</li>
          <li><strong>Een advies zonder eigenaar.</strong> Dan doet niemand het.</li>
          <li><strong>Een naam noemen die je niet kunt dragen.</strong> Een opschepper in een groepschat is een
          aanwijzing, geen bewijs.</li>
        </ul>

        <div class="callout info"><strong>Rubric:</strong> het lab draait een heuristische checklist op je tekst
        (conclusie bovenaan, waarschijnlijkheidstaal, eigenaar per advies, korter dan de bron, onzekerheid apart). Het
        is geen AI-beoordeling. Vergelijk daarna met het modelantwoord en laat je tekst door iemand anders lezen.</div>
      `,
      lab: {
        type: 'bluf',
        source: TAAV_BLUF_SOURCE,
        model: TAAV_BLUF_MODEL,
      },
      questions: [
        { q: 'Welke melding legt de sterkste koppeling tussen een aanval en de booterdienst? Geef het nummer.', answer: ['4', 'melding 4', 'vier'],
          hints: ['Zoek de melding waarin de dienst zelf iets laat zien over een slachtoffer.', 'Een schermafdruk in het eigen advertentiekanaal van de dienst.'],
          wrong: { '3': 'Melding 3 noemt de dienst ook, maar via een opschepper in een groepschat. Dat is niet geverifieerd.', '2': 'Melding 2 beschrijft de aanval, maar noemt de dienst niet.' },
          why: 'Niet elke koppeling weegt even zwaar. Wie dat verschil in het product laat zien, is betrouwbaar voor de lezer.',
          explain: 'In melding 4 toont StormStress zelf een schermafdruk van het onbereikbare portaal van Polderveen.' },
        { q: 'Hoe sterk is de koppeling van webshop Tegelhuis Noord aan StormStress?', options: ['Zwakker dan de andere twee: alleen aanvalstype en duur komen overeen', 'Bewezen, want het was ook een DDoS', 'Even sterk als die van de gemeente', 'Er is geen enkele overeenkomst'], answer: 0,
          wrong: { 1: 'Veel DDoS-aanvallen gebruiken UDP-reflectie. Dat alleen bewijst niet dat het dezelfde dienst was.', 2: 'Bij de gemeente is er een schermafdruk in het kanaal van de dienst; bij de webshop niet.', 3: 'Het aanvalstype en de korte duur komen wel overeen.' },
          explain: 'Gedeelde techniek is een aanwijzing, geen bewijs. Je schrijft het op met "reële kans" en niet met "zeer waarschijnlijk".' },
        { q: 'Wat hoort in de eerste zin van je product?', options: ['Je beoordeling: wat er aan de hand is, met waarschijnlijkheidstaal', 'Melding 1, want die kwam het eerst binnen', 'Een uitleg van wat een DDoS-aanval is', 'De naam van de leerling'], answer: 0,
          wrong: { 1: 'Dat is chronologisch navertellen. De lezer wil eerst de conclusie.', 2: 'Achtergrond hoort in de onderbouwing, als het nodig is.', 3: 'Een niet-geverifieerde naam hoort niet in je conclusie, en zeker niet in de eerste zin.' },
          explain: 'BLUF: de conclusie en het advies bovenaan, daarna de onderbouwing.' },
        { q: 'Ik heb binnen dertig minuten een product geschreven, het tegen de rubric gehouden en vergeleken met het modelantwoord.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 4 — Zelfscan en ontwikkelplan',
      tryFirst: true,
      intro: '<p>Leg de eisen uit de vacature naast jezelf. Geef jezelf per eis een score van 1 (nog niet) tot 3 (dit kan ik aantonen met een voorbeeld). Kies voor je twee laagste scores een room uit de tabel en zet er een datum bij.</p>',
      content: `
        <p>Een ontwikkelplan is geen lijst met goede voornemens. Het is een korte tabel: welke eis, waar sta je nu,
        wat ga je doen en wanneer is het af. Bij een gesprek helpt het ook: "daar ben ik nog niet sterk in, en zo
        werk ik eraan" is een sterk antwoord op de vraag naar je ontwikkelpunten.</p>

        <h3>Eisen uit de vacature en rooms in de dojo</h3>
        <table>
          <thead><tr><th>Eis of taak uit de vacature</th><th>Rooms om te oefenen</th></tr></thead>
          <tbody>
            <tr><td>Kennis van crime scripting en Collect Store Analysis Engage (CSAE)</td><td><code>crime-scripting</code>, <code>intelligencecyclus</code></td></tr>
            <tr><td>Wat de functie inhoudt en waar je werkt</td><td><code>ta-de-functie</code></td></tr>
            <tr><td>Digitale entiteiten duiden (IP-adressen, personen, bedrijven)</td><td><code>ta-entiteiten-duiden</code>, <code>osint-pivoting</code></td></tr>
            <tr><td>Criminele samenwerkingsverbanden beschrijven</td><td><code>ta-samenwerkingsverbanden</code>, <code>cybercrime-ecosysteem</code></td></tr>
            <tr><td>IT-kennis om grote hoeveelheden data te doorgronden; kwantitatieve methoden</td><td><code>ta-data-doorgronden</code></td></tr>
            <tr><td>Kwalitatieve methoden; dwarsverbanden tussen onderzoeken of incidenten</td><td><code>ta-kwalitatief-dwarsverbanden</code></td></tr>
            <tr><td>Juiste conclusies trekken, ook bij onzekerheid</td><td><code>redeneren-met-kansen</code></td></tr>
            <tr><td>Interventiekansen signaleren en adviseren over een integrale aanpak</td><td><code>ta-interventies</code>, <code>opsporing-bevoegdheden</code></td></tr>
            <tr><td>Helder rapporteren in intelligenceproducten</td><td><code>intelligenceproducten</code></td></tr>
            <tr><td>Coachen en het intelligence-netwerk onderhouden</td><td><code>ta-coach-netwerk</code></td></tr>
            <tr><td>Alles samen in één zaak</td><td><code>ta-casus-bulletproof</code></td></tr>
          </tbody>
        </table>

        <h3>Voorbeeld van een ontwikkelplan</h3>
        <table>
          <thead><tr><th>Eis</th><th>Score</th><th>Actie</th><th>Klaar op</th></tr></thead>
          <tbody>
            <tr><td>Conclusies onder onzekerheid</td><td>1</td><td>Room <code>redeneren-met-kansen</code>; daarna drie oude rapporten herschrijven met waarschijnlijkheidstaal</td><td>15 december</td></tr>
            <tr><td>Samenwerkingsverbanden</td><td>2</td><td>Room <code>ta-samenwerkingsverbanden</code>; één openbaar vonnis over een cybercrimegroep uitwerken als netwerk</td><td>10 januari</td></tr>
            <tr><td>Engels</td><td>3</td><td>Bijhouden: elke week één Engelstalig dreigingsrapport lezen en samenvatten</td><td>doorlopend</td></tr>
          </tbody>
        </table>

        <h3>Breder dan de dojo</h3>
        <p>De vacature vraagt ook dat je "goed op de hoogte bent van wat er speelt in de maatschappij". Houd het
        nieuws over cybercrime bij, lees openbare rapporten (bijvoorbeeld van het NCSC en Europol) en volg uitspraken
        op rechtspraak.nl. Dat geeft je in een gesprek actuele voorbeelden.</p>

        <div class="callout warn"><strong>Let op:</strong> de dojo traint vaardigheden die in de vacature staan. Een
        room afronden is geen garantie dat je door een selectie komt, en de rooms zijn geen kopie van een
        politie-assessment.</div>
      `,
      questions: [
        { q: 'Je scoort jezelf een 1 op "conclusies trekken bij onzekerheid". Welke room-id uit de tabel past het best?', answer: ['redeneren-met-kansen'],
          hints: ['Zoek in de tabel de rij over conclusies en onzekerheid.'],
          wrong: { 'intelligenceproducten': 'Die room gaat over de vorm van het product. Voor het wegen van onzekerheid is er een eigen room.' },
          explain: 'In redeneren-met-kansen oefen je waarschijnlijkheidstaal en het bijwerken van een inschatting met nieuw bewijs.' },
        { q: 'Bij welke eis uit de vacature hoort de room osint-pivoting vooral?', options: ['Digitale entiteiten duiden, zoals IP-adressen, personen en bedrijven', 'Rijbewijs B', 'Coachen van collega-analisten', 'Werken onder druk'], answer: 0,
          wrong: { 1: 'Een rijbewijs haal je niet in de dojo.', 2: 'Coachen oefen je in ta-coach-netwerk.', 3: 'Druk oefen je in het oefen-assessment van taak 3.' },
          explain: 'Pivoteren is van het ene kenmerk naar het volgende springen: precies wat je doet als je entiteiten duidt.' },
        { q: 'Boss: een kandidaat antwoordt op de vraag "Vertel over een keer dat je iets in gang zette bij partners": "Bij mijn vorige werkgever kwamen phishingmeldingen binnen bij drie afdelingen die niets van elkaar wisten. Ik moest de meldingen afhandelen. Ik zette een maandelijks overleg op met IT, communicatie en de servicedesk, en maakte één meldformulier dat iedereen begreep." Welke STAR-letter ontbreekt, en welke competentie uit de vacature laat dit antwoord het duidelijkst zien? Antwoord als letter plus één woord, bijvoorbeeld: S analytisch.', boss: true,
          answer: ['R verbinder', 'R, verbinder', 'R - verbinder', 'R: verbinder', 'resultaat verbinder', 'resultaat, verbinder'],
          hints: ['Loop het antwoord langs S, T, A en R: welke zin hoort bij welke letter?', 'Het antwoord vertelt niet wat het overleg en het formulier opleverden.', 'De competentie gaat over bruggen bouwen tussen partners die niet onder jou vallen.'],
          wrong: { '/^[sta]\\b/i': 'Situatie, taak en actie staan er alle drie in. Er ontbreekt wat het opleverde.', '/^r\\W*(analytisch|analyse)/i': 'De letter klopt. Maar het verhaal gaat niet over een verband in data; het gaat over mensen bij elkaar brengen.', '/^r\\W*(initiatief)/i': 'De letter klopt en initiatief zit erin. Maar de kern is dat drie afdelingen die elkaar niet kenden nu samenwerken.', '/^r\\W*(coach)/i': 'De letter klopt. Maar er wordt geen collega beter gemaakt; er worden afdelingen verbonden.' },
          why: 'Een commissie scoort per competentie. Een verhaal zonder resultaat en zonder duidelijke competentie levert in geen enkele kolom punten op.',
          explain: 'Het resultaat (R) ontbreekt: wat leverde het overleg op? De kern van het verhaal is drie partijen verbinden die elkaar niet kenden: de competentie verbinder.' },
      ],
    },

    {
      title: 'Taak 5 — Zo kan het gevraagd worden',
      kind: 'examen',
      optional: true,
      content: `
        <p>Deze vragen toetsen of je de vacature goed hebt gelezen en of je je verhaal kunt toepassen. Het zijn
        eigen vragen in de stijl van een kennistoets; ze komen niet uit een politie-assessment. Lees elke optie
        helemaal, want de afleiders zijn bijna goed.</p>
        <p>Let vooral op woorden als "mogelijk", "verplicht", "afhankelijk van je achtergrond" en "zo snel mogelijk".
        Daar zit het verschil tussen een goede en een bijna goede optie.</p>
        <p>Een aanpak die helpt: lees eerst de vraag zonder de opties en bedenk zelf het antwoord. Zoek daarna de optie
        die daarop lijkt. Twijfel je tussen twee opties, vraag je dan af welke letterlijk in de vacature staat en welke
        alleen aannemelijk klinkt. Bij de gespreksvraag aan het eind gebruik je STAR: een echt ontwikkelpunt, wat je
        eraan doet en wat dat al opleverde.</p>
      `,
      questions: [
        { q: 'Je bent politievrijwilliger en reageert op de interne vacature. Er is ook een geschikte beroepsmedewerker. Wat zegt de vacature hierover?',
          options: ['Bij meerdere geschikte kandidaten heeft een beroepsmedewerker voorrang op een politievrijwilliger', 'Vrijwilligers mogen niet reageren', 'De vrijwilliger heeft voorrang omdat hij al bij de politie werkt', 'De kandidaat met de hoogste opleiding gaat altijd voor'], answer: 0,
          wrong: { 1: 'De interne vacature stond juist ook open voor politievrijwilligers.', 2: 'Het is andersom.', 3: 'Daar zegt de vacature niets over.' },
          explain: 'De interne versie stond open voor vrijwilligers, maar een geschikte beroepsmedewerker gaat voor.' },
        { q: 'Een kandidaat heeft een dubbele nationaliteit: de Nederlandse en een andere. Voldoet hij aan de nationaliteitseis?',
          options: ['Ja, de Nederlandse nationaliteit mag ook je tweede nationaliteit zijn', 'Nee, je mag alleen de Nederlandse nationaliteit hebben', 'Alleen na een extra assessment', 'Alleen als hij in Den Haag woont'], answer: 0,
          wrong: { 1: 'De vacature zegt letterlijk dat het ook je tweede nationaliteit mag zijn.', 2: 'Daar zegt de vacature niets over.', 3: 'Woonplaats is geen eis.' },
          explain: 'De Nederlandse nationaliteit is vereist, en dat mag ook je tweede nationaliteit zijn.' },
        { q: 'Je hebt de opleiding gehaald. Wat volgt er volgens de vacature?',
          options: ['Een tijdelijke aanstelling met een proeftijd van één jaar, daarna zo snel mogelijk een vaste aanstelling', 'Direct een vaste aanstelling', 'Een tweede assessment', 'Een tijdelijke aanstelling zonder uitzicht op een vaste'], answer: 0,
          wrong: { 1: 'Er zit eerst een proeftijd van een jaar tussen.', 2: 'De vacature noemt geen assessment na de opleiding.', 3: 'Na de proeftijd volgt zo snel mogelijk een vaste aanstelling.' },
          explain: 'Opleiding, dan een tijdelijke aanstelling met een jaar proeftijd, dan een vaste aanstelling.' },
        { q: 'In een gesprek vraagt de commissie naar je grootste ontwikkelpunt. Welk antwoord is het sterkst?',
          options: ['"Ik ben te perfectionistisch."', '"Ik formuleerde conclusies vaak te stellig. Ik oefen nu met waarschijnlijkheidstaal en laat mijn producten door een collega toetsen; mijn laatste drie rapporten heb ik zo herschreven."', '"Ik heb eigenlijk geen ontwikkelpunten."', '"Ik kan slecht tegen kritiek, maar dat valt wel mee."'], answer: 1,
          wrong: { 0: 'Een verkapte kwaliteit. Commissies herkennen dit en het levert niets op.', 2: 'Niet geloofwaardig, en de functie vraagt juist dat je je blijft ontwikkelen.', 3: 'Eerlijk, maar zonder actie of resultaat.' },
          explain: 'Een echt punt, een concrete actie en een eerste resultaat: STAR toegepast op jezelf.' },
      ],
    },
  ],
  terms: [
    { term: 'Selectieprocedure', def: 'Alle stappen tussen je sollicitatie en je aanstelling: gesprekken, assessments en onderzoeken.' },
    { term: 'Vakinhoudelijk assessment', def: 'Een toets van je vakkennis en -vaardigheid. Volgens de vacature maakt die mogelijk deel uit van de selectie.' },
    { term: 'Verplicht assessment', def: 'Het assessment dat je volgens de vacature positief moet afronden om aan de opleiding te mogen beginnen.' },
    { term: 'Betrouwbaarheids- en omgevingsonderzoek', def: 'Onderzoek naar je betrouwbaarheid en integriteit, waarbij ook je omgeving wordt betrokken. Het is onderdeel van de selectie bij de politie.' },
    { term: 'EVC', def: 'Erkenning van Verworven Competenties: een formele erkenning dat je door werk- en levenservaring een bepaald niveau hebt, gelijkgesteld aan een diploma.' },
    { term: 'Werk- en denkniveau', def: 'Het niveau waarop je werkt en redeneert; hier hbo (bachelor), aan te tonen met een diploma, EVC of een formeel bewijsstuk van werkervaring.' },
    { term: 'Opleiding specifieke inzetbaarheid', def: 'De 14-weekse opleiding aan de Politieacademie voor specialisten die van buiten instromen; behalen is vereist voor de functie.' },
    { term: 'Ambtenaar in opleiding', def: 'De tijdelijke aanstelling die je hebt tijdens de politieopleiding; je ontvangt dan al je salaris.' },
    { term: 'Proeftijd', def: 'De periode na de opleiding (hier één jaar) waarin je tijdelijk bent aangesteld voordat een vaste aanstelling volgt.' },
    { term: 'STAR-methode', def: 'Een manier om een gespreksantwoord op te bouwen: Situatie, Taak, Actie, Resultaat.' },
    { term: 'BLUF', def: 'Bottom Line Up Front: de conclusie en het advies staan bovenaan, de onderbouwing eronder.' },
    { term: 'Booter (stresser)', def: 'Een dienst waar je voor een klein bedrag een DDoS-aanval bestelt, zonder zelf iets te hoeven kunnen.' },
  ],
  resources: [
    { title: 'Werken bij de politie — vacatures en informatie over selectie en opleiding', url: 'https://www.werkenbijdepolitie.nl/' },
    { title: 'Politieacademie', url: 'https://www.politieacademie.nl/' },
    { title: 'Politie — informatie en aangifte over cybercrime', url: 'https://www.politie.nl/' },
  ],
  check: [
    { q: 'Wat gebeurt er als je het verplichte assessment niet positief afrondt?', options: ['Je kunt niet aan de opleiding beginnen', 'Je begint wel, maar met een langere proeftijd', 'Je mag het vakinhoudelijk assessment overslaan', 'Er gebeurt niets'], answer: 0, explain: 'Positief afronden is volgens de vacature voorwaarde om aan de opleiding te beginnen.' },
    { q: 'Wat maakt een STAR-antwoord sterker dan een bewering als "ik ben een verbinder"?', options: ['Het laat concreet gedrag zien met een resultaat', 'Het is korter', 'Het noemt meer competenties tegelijk', 'Het gaat over het team in plaats van over jou'], answer: 0, explain: 'Gedrag uit het verleden, met een uitkomst, is het beste bewijs voor gedrag in de toekomst.' },
    { q: 'Je hebt dertig minuten voor een casus met vier meldingen. Waar begint je product mee?', options: ['De conclusie, met waarschijnlijkheidstaal', 'De eerste melding', 'Een uitleg van de methode', 'Een lijst van alle IP-adressen'], answer: 0, explain: 'BLUF: de lezer ziet meteen wat er aan de hand is en wat er moet gebeuren.' },
    { q: 'De vacature voor deze functie sloot op 6 november 2026. Wat doe je nu?', options: ['Je bereidt je voor en houdt werkenbijdepolitie.nl in de gaten voor een nieuwe vacature', 'Je solliciteert toch via de oude link', 'Je belt een willekeurige politiemedewerker', 'Niets, er komt nooit meer een vacature'], answer: 0, explain: 'Een gesloten vacature is een kans om je voor te bereiden op de volgende.' },
  ],
});
