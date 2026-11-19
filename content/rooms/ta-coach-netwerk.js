/* Room: Coachen, coördineren en het intelligence-netwerk — leerpad Tactisch analist cybercrime */

CS.registerRoom({
  id: 'ta-coach-netwerk',
  path: 'tactisch-analist',
  order: 7,
  title: 'Coachen, coördineren en het intelligence-netwerk',
  icon: '🧭',
  difficulty: 'Gemiddeld',
  minutes: 70,
  level: 'Gevorderd',
  checked: '2026-11-19',
  summary: 'De tactisch analist als spil: analysewerk coördineren van vraagintake tot kwaliteitscheck, collega-analisten coachen met feedback en GROW, als intermediair vraag en aanbod in het regionale en (inter)nationale netwerk bij elkaar brengen, en het analyseproces stap voor stap verbeteren.',
  objectives: [
    'Een analysevraag scherp krijgen met een intake en een opdrachtformulering, en werk prioriteren en verdelen',
    'Een collega coachen met feedback volgens SBI en een gesprek volgens GROW, zonder het eigenaarschap over te nemen',
    'De lagen van het intelligence-netwerk benoemen en stakeholders plaatsen op een macht-belangmatrix',
    'Uitleggen hoe TLP en need-to-know zich verhouden tot de Wet politiegegevens',
    'Een verbetering in het analyseproces invoeren: signaal, nulmeting, kleine pilot, evaluatie en borging',
  ],
  tasks: [
    {
      title: 'Taak 1 — Analysewerk coördineren: van vraag tot product',
      tryFirst: true,
      intro: '<p>Je bent de tactisch analist met een coördinerende rol in een fictief cybercrimeteam. In het lab komt een week vol verzoeken op je af. Kies bij elke situatie wat je doet. Je hebt alle vijf goed nodig voor de vlag.</p>',
      content: `
        <p>In de vacature staat dat de tactisch analist "een coachende en coördinerende rol ten aanzien van de andere
        analist(en)" heeft. Coördineren klinkt als plannen, maar het begint eerder: bij de <strong>vraag</strong>. Een
        team dat aan de verkeerde vraag werkt, levert een goed product dat niemand gebruikt.</p>

        <h3>1. Vraagintake en opdrachtformulering</h3>
        <p>Een verzoek als "zoek alles uit over groep X" is geen opdracht. Voer een kort intakegesprek en leg daarna
        een <strong>opdrachtformulering</strong> vast die de vrager bevestigt:</p>
        <ul>
          <li><strong>Vrager en beslissing.</strong> Wie vraagt het, en welke beslissing wil die persoon met het
          antwoord nemen?</li>
          <li><strong>Kernvraag en deelvragen.</strong> Eén hoofdvraag, opgeknipt in deelvragen die je kunt
          verdelen.</li>
          <li><strong>Afbakening.</strong> Welke periode, welke bronnen, wat valt erbuiten?</li>
          <li><strong>Deadline en vorm.</strong> Wanneer, en in welk product: een mondelinge update, een notitie, een
          netwerkanalyse?</li>
          <li><strong>Verspreiding.</strong> Wie mag het product lezen? (Zie taak 3.)</li>
        </ul>
        <p>Dit is de fase "richting en planning" uit de room <em>De intelligencecyclus</em>, maar dan als vaste
        gewoonte van het team.</p>

        <h3>2. Prioriteren</h3>
        <p>Er komen altijd meer vragen binnen dan je aankunt. Prioriteer op <strong>impact</strong> (hoeveel schade of
        hoeveel slachtoffers), <strong>urgentie</strong> (wat verloopt er als je wacht) en
        <strong>haalbaarheid</strong> (kun je het met de beschikbare mensen en bronnen beantwoorden?). Doe dat
        zichtbaar en samen met de teamleiding, niet stilletjes op volgorde van binnenkomst.</p>

        <h3>3. Werkverdeling</h3>
        <p>Verdeel deelvragen op basis van wat iemand kan én wat iemand wil leren. Een junior collega een complexe
        vraag geven kan prima, mits de deelvraag duidelijk is afgebakend en er een vast <strong>checkmoment</strong>
        is. Alles zelf doen is geen coördinatie: dan wordt jij het knelpunt.</p>

        <h3>4. Kwaliteitsstandaarden</h3>
        <p>Spreek als team een paar vaste regels af: elk product krijgt een <strong>vier-ogencontrole</strong> op de
        kernconclusie en de bronvermelding; beweringen zijn gelabeld als bekend, afgeleid of aanname; onzekerheid staat
        apart. Onder tijdsdruk maak je de check korter, maar je slaat hem niet over.</p>

        <div class="callout tip">
          <strong>Voorbeeld:</strong> de vraag "alles over booterdienst StormKlok" wordt na een intake: "Welke
          Nederlandse klanten van StormKlok voerden in 2026 meer dan tien aanvallen uit? Voor de officier, die beslist
          over een persoonsgerichte aanpak. Notitie uiterlijk vrijdag."
        </div>
      `,
      lab: {
        type: 'scenario',
        title: 'een week coördineren',
        scenario: 'Een fictief Team Cybercrime met drie analisten. Jij coördineert het analysewerk. Kies bij elke situatie de beste aanpak.',
        pass: 5,
        flag: 'NM{eerst_de_vraag_dan_het_werk}',
        steps: [
          { situation: 'Een teamleider van een opsporingsonderzoek loopt binnen: "Zoek alles uit over ransomwaregroep Zwartwater, liefst snel."', choices: [
            { label: 'Meteen alle bronnen over Zwartwater verzamelen; dan heb je in elk geval iets.', good: false, feedback: 'Zonder vraag weet je niet wat genoeg is. "Alles" is nooit af.' },
            { label: 'Een korte intake: welke beslissing wil hij nemen, wat is al bekend, wanneer en in welke vorm? Daarna een opdrachtformulering die hij bevestigt.', good: true, feedback: 'Zo weet je wat de vrager echt nodig heeft en kun je het werk afbakenen en verdelen.' },
            { label: 'Zeggen dat het team vol zit en dat hij het later nog eens moet vragen.', good: false, feedback: 'Misschien zit je vol, maar zonder intake weet je niet hoe belangrijk de vraag is.' },
          ] },
          { situation: 'Deze week komen er drie vragen binnen. Je hebt capaciteit voor twee. Eén vraag gaat over een lopende afpersing met een deadline van de daders over vier dagen.', choices: [
            { label: 'De vragen oppakken op volgorde van binnenkomst.', good: false, feedback: 'Binnenkomst zegt niets over impact of urgentie.' },
            { label: 'Alle drie een beetje doen, zodat niemand teleurgesteld is.', good: false, feedback: 'Dan worden alle drie te laat of te mager. Ook de afpersing.' },
            { label: 'Prioriteren op impact, urgentie en haalbaarheid, de afpersing voorop, en samen met de teamleiding bepalen wat er schuift. De vrager van de derde vraag hoort het meteen.', good: true, feedback: 'Zichtbaar prioriteren en het eerlijk melden aan wie moet wachten.' },
          ] },
          { situation: 'Een junior collega, Ravi (fictief), heeft nog nooit een netwerkanalyse gedaan. De volgende deelvraag vraagt er juist om.', choices: [
            { label: 'De deelvraag aan Ravi geven met een duidelijke afbakening, een voorbeeld van een eerder product en een checkmoment na twee dagen.', good: true, feedback: 'Ravi leert iets nieuws en het risico blijft beheersbaar.' },
            { label: 'Hem de deelvraag geven en zeggen dat hij het zelf maar moet uitzoeken: zo leert hij het het snelst.', good: false, feedback: 'Zonder afbakening en checkmoment zet je Ravi en het product onnodig op het spel.' },
            { label: 'Het zelf doen, dat is sneller.', good: false, feedback: 'Vandaag sneller, maar Ravi leert niets en jij wordt het knelpunt van het team.' },
          ] },
          { situation: 'Het is 15:30. Een notitie moet om 16:00 bij de officier zijn. De vaste vier-ogencontrole kost normaal een uur.', choices: [
            { label: 'De controle overslaan; de deadline gaat voor.', good: false, feedback: 'Juist onder druk sluipen fouten in de kernconclusie. Die gaat nu ongecontroleerd naar de officier.' },
            { label: 'Een collega vijftien minuten laten kijken naar de kernconclusie, de labels en de bronvermelding, en de onzekerheid expliciet vermelden.', good: true, feedback: 'Een kortere check op wat het zwaarst weegt. De standaard blijft overeind.' },
            { label: 'De deadline op eigen houtje een dag opschuiven.', good: false, feedback: 'Een deadline verzetten doe je in overleg met de vrager, niet alleen.' },
          ] },
          { situation: 'Halverwege meldt de vrager dat de officier nu vooral wil weten waar het losgeld naartoe ging, niet wie de groep is.', choices: [
            { label: 'Doorwerken aan de oorspronkelijke vraag; die was afgesproken.', good: false, feedback: 'Dan lever je een product dat niet meer bij de beslissing past.' },
            { label: 'De nieuwe vraag er gewoon bij doen.', good: false, feedback: 'Zonder te zeggen wat er dan vervalt, is de planning niet meer te halen.' },
            { label: 'De opdrachtformulering bijwerken, met de vrager afspreken wat er vervalt of schuift, en het werk opnieuw verdelen.', good: true, feedback: 'Een vraag mag veranderen. Je legt alleen vast wat dat betekent.' },
          ] },
        ],
      },
      questions: [
        { q: 'Coördineer de week in het lab met vijf goede keuzes. Welke vlag verschijnt?', answer: ['NM{eerst_de_vraag_dan_het_werk}'],
          hints: ['Vraag je bij elke stap af: wat zou de vrager én het team op de lange termijn helpen?', 'Kies steeds de optie die zichtbaar maakt wat er gebeurt: intake, prioriteit, afbakening, check, aangepaste opdracht.', 'Bij een fout kun je met "Opnieuw" de reeks nog eens doorlopen.'],
          explain: 'Intake, zichtbaar prioriteren, afgebakend delegeren, een kortere maar echte check, en een bijgewerkte opdracht als de vraag verandert.' },
        { q: 'Wat leg je als eerste vast in een opdrachtformulering, nog vóór de deelvragen?', options: ['Wie de vrager is en welke beslissing hij met het antwoord wil nemen', 'Welke software je gaat gebruiken', 'Hoeveel pagina\'s het product wordt', 'Welke analist het leukst vindt'], answer: 0,
          explain: 'De beslissing van de vrager bepaalt wat genoeg is. Daaruit volgen de kernvraag en de deelvragen.' },
        { q: 'Op welke drie criteria prioriteer je binnenkomende vragen in deze taak? Noem het criterium dat gaat over "wat verloopt er als je wacht".', answer: ['urgentie', 'de urgentie'],
          hints: ['Er zijn drie criteria: impact, ... en haalbaarheid.', 'Het gaat om tijdsdruk.', 'Het woord begint met een u.'],
          wrong: { 'impact': 'Impact gaat over hoeveel schade of hoeveel slachtoffers.', 'haalbaarheid': 'Haalbaarheid gaat over mensen en bronnen.' },
          explain: 'Impact, urgentie en haalbaarheid. Urgentie gaat over wat er verloopt als je wacht, zoals een deadline van afpersers.' },
      ],
    },

    {
      title: 'Taak 2 — Coachen: feedback, GROW en eigenaarschap',
      tryFirst: true,
      intro: '<p>In het lab staan acht uitspraken (G1 tot en met G8) uit een coachgesprek met collega Sanne (fictief) over haar concept-notitie. Bepaal per uitspraak wat ze doet: is het goede feedback, een stap uit GROW, of neemt de coach het werk over?</p>',
      content: `
        <p>"Voor je collega-analisten ben je een coach," staat in de vacature. In de room <em>Intelligenceproducten</em>
        zag je al hoe peer review, sjablonen en betere tooling kwaliteit in het team verankeren. Hier gaat het om het
        gesprek zelf: hoe geef je feedback en hoe help je iemand verder zonder het werk over te nemen?</p>

        <h3>Vier ogen, en dan een gesprek</h3>
        <p>De vier-ogencontrole op een intelligenceproduct levert opmerkingen op. Die opmerkingen worden pas waardevol
        als je ze zo terugbrengt dat de collega er de volgende keer zelf op let. Twee eenvoudige modellen helpen.</p>

        <h3>Feedback met SBI</h3>
        <p><strong>SBI</strong> staat voor <em>Situation, Behaviour, Impact</em>:</p>
        <ul>
          <li><strong>Situatie.</strong> Wanneer en waar: "In je notitie van dinsdag, eerste alinea."</li>
          <li><strong>Gedrag.</strong> Wat je zag, zonder oordeel: "Daar staat de naam van een verdachte zonder bron of
          label."</li>
          <li><strong>Impact.</strong> Het gevolg: "Daardoor kan de officier niet zien hoe stevig dat is."</li>
        </ul>
        <p>"Je notitie is slordig" is geen SBI: geen situatie, geen waarneembaar gedrag, alleen een oordeel. SBI werkt
        ook voor positieve feedback, en dat is minstens zo belangrijk: dan weet iemand wat hij moet blijven doen.</p>

        <h3>Een coachgesprek met GROW</h3>
        <p><strong>GROW</strong> is een gespreksstructuur in vier stappen:</p>
        <ol>
          <li><strong>Goal</strong> (doel): wat wil de collega aan het eind bereikt hebben?</li>
          <li><strong>Reality</strong> (huidige situatie): waar staat ze nu, wat heeft ze al geprobeerd?</li>
          <li><strong>Options</strong> (mogelijkheden): welke wegen ziet ze? Wat nog meer?</li>
          <li><strong>Will</strong> (of <em>way forward</em>): wat gaat ze doen, wanneer, en hoe weet je dat het
          gelukt is?</li>
        </ol>

        <h3>Eigenaarschap laten waar het hoort</h3>
        <p>De grootste valkuil voor een ervaren analist is het werk overnemen: "Geef maar, ik herschrijf het wel."
        Het product wordt er vandaag beter van, maar de collega leert niets en komt de volgende keer weer bij jou. Een
        coach stelt vragen, geeft voorbeelden en laat de pen bij de ander. Alleen bij acuut risico (een fout die
        morgen naar de officier gaat) grijp je direct in, en dan leg je achteraf uit waarom.</p>

        <div class="callout tip">
          <strong>Tip:</strong> eindig een coachgesprek altijd met een afspraak die de collega zelf formuleert, plus
          een moment waarop jullie terugkijken.
        </div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'coachgesprek met Sanne',
        scenario: 'Acht uitspraken uit één coachgesprek over een concept-notitie (fictief). Niet elke uitspraak is goed coachen.',
        records: [
          { title: 'G1', icon: '💬', lines: ['"Wat wil jij aan het eind van dit gesprek hebben bereikt met je notitie?"'] },
          { title: 'G2', icon: '💬', lines: ['"In je notitie van dinsdag staat in de eerste alinea de naam van een verdachte zonder bron of label. Daardoor kan de officier niet zien hoe stevig dat is."'] },
          { title: 'G3', icon: '💬', lines: ['"Je notitie is gewoon slordig."'] },
          { title: 'G4', icon: '💬', lines: ['"Hoe ver ben je nu met de onderbouwing? Wat heb je al geprobeerd?"'] },
          { title: 'G5', icon: '💬', lines: ['"Welke manieren zie je om die bewering te onderbouwen? En wat nog meer?"'] },
          { title: 'G6', icon: '💬', lines: ['"Wat ga je doen, en wanneer kijken we er samen naar?"'] },
          { title: 'G7', icon: '💬', lines: ['"Geef maar hier, ik herschrijf die alinea wel even."'] },
          { title: 'G8', icon: '💬', lines: ['"Je tijdlijn in de bijlage van vorige week had bij elke regel een bron. Daardoor kon het opsporingsteam meteen verder."'] },
        ],
      },
      questions: [
        { q: 'Welke uitspraak (code) neemt het eigenaarschap van de collega over?', answer: ['G7'],
          hints: ['Zoek de uitspraak waarin de coach zelf aan de slag gaat.', 'Wie houdt in die uitspraak de pen vast?', 'Het gaat om herschrijven.'],
          wrong: { 'G3': 'G3 is slechte feedback (alleen een oordeel), maar de coach neemt hier niets over.' },
          why: 'Wie het werk overneemt, maakt het team afhankelijk van zichzelf. Dat is precies het tegenovergestelde van coachen.',
          explain: 'In G7 pakt de coach het werk af. Sanne leert er niets van en het product blijft van de coach.' },
        { q: 'Welke uitspraak (code) hoort bij de GROW-stap Options?', answer: ['G5'],
          hints: ['Options gaat over mogelijkheden.', 'Zoek de vraag naar verschillende wegen, met "wat nog meer?".', 'Niet G4 (huidige situatie) en niet G6 (afspraak).'],
          wrong: { 'G4': 'G4 vraagt waar Sanne nu staat. Dat is Reality.', 'G6': 'G6 vraagt wat ze gaat doen en wanneer. Dat is Will.', 'G1': 'G1 vraagt naar het doel van het gesprek. Dat is Goal.' },
          explain: 'G5 vraagt naar mogelijke wegen en daagt uit om er meer te bedenken: de stap Options.' },
        { q: 'Welke twee uitspraken zijn feedback volgens SBI? Geef de twee codes, bijvoorbeeld G1 G4.', answer: ['G2 G8', 'G8 G2', 'G2, G8', 'G8, G2', 'G2 en G8', 'G8 en G2', 'G2G8', 'G2,G8'],
          hints: ['SBI noemt een situatie, waarneembaar gedrag en het gevolg.', 'Eén is kritisch en één is positief.', 'G3 noemt geen situatie en geen gedrag, alleen een oordeel.'],
          wrong: { 'G2 G3': 'G3 is alleen een oordeel. Er staat geen situatie, geen gedrag en geen gevolg in.', 'G2': 'Er is nog een tweede, positieve.' },
          explain: 'G2 (kritisch) en G8 (positief) noemen allebei een situatie, het gedrag en het gevolg.' },
      ],
    },

    {
      title: 'Taak 3 — Intermediair in het netwerk: vraag, aanbod en wat je mag delen',
      tryFirst: true,
      intro: '<p>In het lab staan zestien partners uit het netwerk van een Team Cybercrime. Groepeer ze in de vier lagen van het netwerk: de eigen eenheid, landelijk politie en justitie, publiek-private partners, en internationaal.</p>',
      content: `
        <p>De vacature beschrijft de tactisch analist als iemand die "als intermediair vraag en aanbod bij elkaar"
        brengt, en die samenwerking "vanuit het regionale en (inter)nationale intelligence(cyber)netwerk" initieert,
        bouwt, onderhoudt en regisseert. Je bent een <strong>verbinder</strong> die bruggen bouwt.</p>

        <h3>Het netwerk in lagen</h3>
        <p>Volgens de vacature werk je vanuit het cluster Cybercrime Intelligence van de Dienst Regionale Intelligence
        Organisatie (DRIO) bij het Team Cybercrime van de Dienst Regionale Recherche (DRR). Daaromheen liggen
        lagen:</p>
        <ul>
          <li><strong>De eigen eenheid:</strong> basisteams, districtelijke rechercheteams, opsporingsteams van de DRR en
          collega-analisten.</li>
          <li><strong>Landelijk:</strong> de cybercrimeteams van de andere eenheden, het Team High Tech Crime (THTC) van
          de Landelijke Eenheid, het analysecluster van het Landelijk Operationeel Cybercrime Overleg (LOCO), en het
          Openbaar Ministerie.</li>
          <li><strong>Publiek-privaat:</strong> onder meer het NCSC, hosters, banken en securitybedrijven (zie de room
          <em>Interventiekansen en de integrale aanpak</em>).</li>
          <li><strong>Internationaal:</strong> Europol EC3 met de J-CAT, Eurojust en buitenlandse cybercrime-eenheden.</li>
        </ul>

        <h3>Vraag en aanbod bij elkaar brengen</h3>
        <p>Een basisteam heeft veertig aangiftes van DDoS bij webwinkels en weet niet wat ermee te doen (<em>vraag</em>).
        Een andere eenheid heeft net een booterdienst in beeld (<em>aanbod</em>). Niemand weet van de ander. Een
        intermediair ziet dat, legt het verband en zorgt dat de juiste mensen elkaar spreken. Daarvoor moet je weten wie
        wat heeft. En het netwerk werkt alleen als je ook geeft: wie alleen haalt, krijgt op den duur niets meer.</p>

        <h3>Stakeholders op een kaart</h3>
        <p>Met een <strong>macht-belangmatrix</strong> (naar Mendelow) zet je partners op twee assen: hoeveel invloed
        hebben ze op jouw doel, en hoeveel belang hebben ze erbij? Veel macht en veel belang: <em>nauw betrekken</em>.
        Veel macht, weinig belang: <em>tevreden houden</em>. Weinig macht, veel belang: <em>goed informeren</em>.
        Weinig van beide: <em>in de gaten houden</em>.</p>

        <h3>Wat mag je delen?</h3>
        <p>Binnen de politie regelt de <strong>Wet politiegegevens (Wpg)</strong> wie politiegegevens mag verwerken en
        aan wie je ze mag verstrekken. Delen met een externe partner kan alleen als de wet daar een grondslag voor
        biedt. Daarbovenop geldt <strong>need-to-know</strong>: ook binnen de politie deel je alleen met wie het voor
        zijn taak nodig heeft.</p>
        <p>Het <strong>Traffic Light Protocol</strong> (TLP 2.0, FIRST) is een afspraak over verder delen:
        TLP:RED (alleen de ontvangers zelf), TLP:AMBER+STRICT (alleen binnen de eigen organisatie), TLP:AMBER (eigen
        organisatie en haar klanten, voor wie het moet weten), TLP:GREEN (binnen de gemeenschap) en TLP:CLEAR (vrij te
        delen).</p>

        <div class="callout warn">
          <strong>Let op:</strong> TLP is een etiket, geen wettelijke grondslag. Een rapport met TLP:CLEAR van een
          partner mag je vrij delen, maar politiegegevens worden niet deelbaar doordat jij er TLP:GREEN op zet. De Wpg
          bepaalt óf je mag delen; TLP zegt hoe ver de ontvanger het mag doorgeven.
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'vier lagen van het netwerk',
        prompt: 'Zestien partners, vier lagen. Waar hoort elke partner bij?',
        flag: 'NM{netwerk_in_vier_lagen}',
        groups: [
          { name: 'De eigen eenheid', items: ['Basisteams', 'Districtelijke rechercheteams', 'Opsporingsteams van de DRR', 'Collega-analisten van de DRIO'] },
          { name: 'Landelijk politie en justitie', items: ['Team High Tech Crime (Landelijke Eenheid)', 'Analysecluster van het LOCO', 'Cybercrimeteams van andere eenheden', 'Openbaar Ministerie'] },
          { name: 'Publiek-private partners', items: ['NCSC', 'Hostingproviders', 'Banken', 'Securitybedrijven'] },
          { name: 'Internationaal', items: ['Europol EC3', 'J-CAT', 'Eurojust', 'Buitenlandse cybercrime-eenheden'] },
        ],
      },
      questions: [
        { q: 'Groepeer de zestien partners in het lab. Welke vlag verschijnt?', answer: ['NM{netwerk_in_vier_lagen}'],
          hints: ['Begin met de partners die buiten Nederland zitten.', 'Twijfel je tussen de eigen eenheid en landelijk: werkt de partner voor één regio of voor het hele land?', 'Het Openbaar Ministerie hoort bij de landelijke laag van politie en justitie.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag uit dit lab. Hij verschijnt zodra alle vier de groepen kloppen.' },
          explain: 'Eigen eenheid, landelijk politie en justitie, publiek-privaat en internationaal. Een intermediair weet in elke laag wie wat heeft.' },
        { q: 'Een partner deelt een dreigingsrapport dat alleen de mensen in het overleg zelf mogen horen. Welk TLP-label hoort daarbij?', answer: ['TLP:RED', 'TLP RED', 'RED', 'TLP:ROOD', 'rood'],
          hints: ['Het is het strengste label.', 'Denk aan een stoplicht.', 'De kleur die "stop" betekent.'],
          wrong: { 'TLP:AMBER+STRICT': 'Dat mag binnen de hele eigen organisatie gedeeld worden. Hier mogen alleen de aanwezigen het horen.', 'TLP:AMBER': 'Dat mag binnen de organisatie en naar klanten die het moeten weten.' },
          explain: 'TLP:RED: alleen voor de ontvangers zelf, niet verder te delen.' },
        { q: 'Een partner heeft veel invloed op het slagen van je aanpak, maar weinig belang bij deze specifieke zaak. In welk kwadrant van de macht-belangmatrix plaats je hem?', options: ['Tevreden houden', 'Nauw betrekken', 'Goed informeren', 'In de gaten houden'], answer: 0,
          wrong: { 1: 'Nauw betrekken past bij veel macht én veel belang.', 2: 'Goed informeren past bij weinig macht en veel belang.', 3: 'In de gaten houden past bij weinig van beide.' },
          explain: 'Veel macht, weinig belang: tevreden houden. Je vraagt niet te veel tijd, maar zorgt dat hij geen bezwaar krijgt.' },
        { q: 'Je wilt politiegegevens met een hoster delen en zet er TLP:GREEN op. Wat is het probleem?', options: ['TLP is geen grondslag: of je mag verstrekken, bepaalt de Wet politiegegevens', 'TLP:GREEN is te streng voor een hoster', 'Hosters mogen nooit iets van de politie ontvangen', 'Er is geen probleem'], answer: 0,
          wrong: { 2: 'Dat is te absoluut. Verstrekken kan als de wet daar een grondslag voor biedt.', 3: 'Het label zegt hoe ver de ontvanger mag doorgeven, niet of jij mag verstrekken.' },
          why: 'Wie TLP als toestemming leest, deelt meer dan mag. Eerst de grondslag, dan het etiket.',
          explain: 'De Wpg bepaalt of je politiegegevens aan een derde mag verstrekken. TLP regelt daarna alleen het verder delen.' },
      ],
    },

    {
      title: 'Taak 4 — Het analyseproces verbeteren en nieuwe methoden invoeren',
      tryFirst: true,
      intro: '<p>Je collega\'s klagen dat ze per zaak uren kwijt zijn aan het handmatig verrijken van IP-adressen. Je wilt dat verbeteren. In het lab staan zes stappen door elkaar. Zet ze in de volgorde waarin je zo\'n verbetering invoert.</p>',
      content: `
        <p>De vacature vraagt dat je "voorstellen tot verbeteringen in het analyseproces" formuleert, en dat je "nieuwe
        methoden en technieken" ontwikkelt én implementeert. Dat tweede woord is het lastige: een goed idee dat niemand
        gebruikt, is geen verbetering.</p>

        <h3>1. Evalueren: waar zit de pijn?</h3>
        <p>Verbeteringen beginnen bij een <strong>signaal</strong>. Haal ze actief op: na elke grote zaak een korte
        evaluatie (<em>lessons learned</em> of <em>after action review</em>) met vier vragen. Wat was het plan? Wat
        gebeurde er echt? Waarom verschilt dat? Wat nemen we mee? Houd het blame-vrij: het gaat om het proces, niet
        om de persoon.</p>

        <h3>2. Meten vóór je verandert</h3>
        <p>Leg een <strong>nulmeting</strong> vast. Hoeveel tijd kost het verrijken van een IP-adres nu? Hoe vaak
        gaat het mis? Zonder nulmeting kun je straks niet laten zien dat het beter is, en wordt je voorstel een
        mening.</p>

        <h3>3. Klein experimenteren</h3>
        <p>Begin met een <strong>pilot</strong>: een paar collega's, een paar weken, een duidelijke vraag ("scheelt
        dit tijd zonder kwaliteitsverlies?") en een terugvaloptie. Een klein experiment is goedkoop als het mislukt,
        en het levert ervaringen op die je voor de rest van het team nodig hebt.</p>

        <h3>4. Automatiseren van terugkerend werk</h3>
        <p>De vacature noemt kennis van programmeertalen en databasesoftware niet voor niets. Terugkerend werk, zoals
        IP-adressen of domeinen verrijken, aangiftes in één tabel zetten of tijdlijnen opbouwen, is een kandidaat voor
        een script. Let wel op drie dingen: gebruik alleen goedgekeurde tooling en bronnen, houd je aan de regels voor
        informatiebeveiliging en de Wpg, en zorg dat het script niet alleen in jouw hoofd bestaat.</p>

        <h3>5. Borgen</h3>
        <p>Een verbetering is pas ingevoerd als ze blijft bestaan als jij er niet bent. Dat vraagt om een
        <strong>werkinstructie</strong>, een <strong>eigenaar</strong> die het onderhoudt, een korte
        <strong>training</strong> voor nieuwe collega's en een vast <strong>evaluatiemoment</strong>.</p>

        <div class="callout info">
          <strong>Voorbeeld uit een fictief team:</strong> de nulmeting liet zien dat een analist gemiddeld twintig
          minuten per IP-adres kwijt was aan handmatig opzoeken in vier systemen. Na een pilot van vier weken met een
          script dat de bekende bronnen in één overzicht zet, was dat vier minuten. De evaluatie leverde ook een
          verbeterpunt op: het script liet niet zien uit welke bron elke waarde kwam. Dat werd eerst aangepast,
          daarna volgde de borging.
        </div>

        <p>Herken je de lijn? Het is dezelfde houding als bij een interventie: eerst de vraag en de nulmeting, dan
        klein ingrijpen, dan meten, dan pas opschalen.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'een verbetering invoeren',
        prompt: 'Zet de zes stappen in de volgorde waarin je een verbetering in het analyseproces invoert.',
        items: [
          { id: 'a', label: 'Signaal ophalen: collega\'s zijn per zaak uren kwijt aan het handmatig verrijken van IP-adressen' },
          { id: 'b', label: 'Nulmeting: een week bijhouden hoeveel tijd het verrijken kost en hoe vaak het misgaat' },
          { id: 'c', label: 'Voorstel aan de teamleiding: verwachte winst, risico\'s en wat er nodig is' },
          { id: 'd', label: 'Pilot: twee analisten gebruiken vier weken een script, met de oude werkwijze als terugvaloptie' },
          { id: 'e', label: 'Evalueren tegen de nulmeting, samen met de gebruikers' },
          { id: 'f', label: 'Borgen: werkinstructie, een eigenaar voor het script, een korte training en een evaluatiemoment' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
        flag: 'NM{klein_beginnen_dan_borgen}',
        explain: 'Signaal, nulmeting, voorstel, pilot, evaluatie, borging. Zonder nulmeting kun je niet evalueren, en zonder borging verdwijnt de verbetering weer.',
      },
      questions: [
        { q: 'Zet de zes stappen in het lab in de goede volgorde. Welke vlag verschijnt?', answer: ['NM{klein_beginnen_dan_borgen}'],
          hints: ['Wat moet je weten voordat je iemand een voorstel doet?', 'Je kunt pas evalueren als er iets is om tegen af te zetten, en pas borgen als de pilot is geëvalueerd.', 'Signaal, meten, voorstel, pilot, evalueren, borgen.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag uit dit lab. Hij verschijnt zodra alle zes op de juiste plek staan.' },
          explain: 'Eerst het signaal en de nulmeting, dan het voorstel en een kleine pilot, dan de evaluatie en tot slot de borging.' },
        { q: 'In het voorbeeld uit de tekst: hoeveel minuten per IP-adres kostte het verrijken vóór de pilot? (getal)', answer: ['20', 'twintig'],
          hints: ['Kijk in het blok met het voorbeeld.', 'Er staan twee getallen: ervoor en erna.', 'Het grootste van de twee.'],
          wrong: { '4': 'Dat is de tijd ná de pilot.', 'vier': 'Dat is de tijd ná de pilot.' },
          explain: 'Twintig minuten vóór, vier minuten na de pilot. Dankzij de nulmeting is die winst aan te tonen.' },
        { q: 'Welke vier vragen horen bij een korte evaluatie (after action review)?', options: ['Wat was het plan, wat gebeurde er, waarom verschilt dat, wat nemen we mee?', 'Wie had de schuld, wat kostte het, wie moet het oplossen, wanneer is het klaar?', 'Welke tool, welke bron, welke analist, welke deadline?', 'Was het goed, was het slecht, wat vond de baas, wat vond de klant?'], answer: 0,
          wrong: { 1: 'Een evaluatie is blame-vrij. Schuld zoeken zorgt dat mensen fouten verstoppen.' },
          explain: 'Plan, werkelijkheid, het verschil en de les. Gericht op het proces, niet op personen.' },
        { q: 'Boss: een rechercheur van een basisteam mailt: "Kun je deze week de veertig aangiftes van DDoS-aanvallen op webwinkels in onze regio analyseren?" Je weet dat het analysecluster van het LOCO aan een landelijk beeld van dezelfde booterdienst werkt, dat junior collega Ravi (fictief) graag een eerste eigen analyse wil doen, en dat jullie planning vol zit. Vijf acties. A: Ravi de veertig aangiftes geven en hem laten beginnen. B: met de rechercheur een korte intake doen: welke beslissing wil hij nemen en wat is deze week echt nodig? C: bij het LOCO-analysecluster nagaan wat er al ligt en of de regionale aangiftes hun beeld aanvullen. D: de aangiftes zelf in een avond doorwerken. E: de rechercheur zonder verdere uitleg naar het LOCO doorsturen. Welke twee acties doe je als eerste? Antwoord met twee letters, bijvoorbeeld AE.', boss: true,
          answer: ['BC', 'CB', 'B C', 'C B', 'B, C', 'C, B', 'B en C', 'C en B', 'B-C'],
          hints: ['Wat moet je weten voordat je werk verdeelt of uitvoert? Denk aan taak 1.', 'Een intermediair kijkt of het aanbod al ergens ligt voordat er dubbel werk wordt gedaan. Denk aan taak 3.', 'Ravi kan later een goede rol krijgen, maar pas als de vraag en het bestaande werk helder zijn.'],
          wrong: {
            'AB': 'Ravi is een mooie kans, maar zonder heldere vraag en zonder te weten wat het LOCO al heeft, zet je hem op een onduidelijke opdracht.',
            'BA': 'Ravi is een mooie kans, maar eerst check je bij het LOCO wat er al ligt. Anders doet hij misschien dubbel werk.',
            'AC': 'Eerst de vraag scherp. Ravi zonder opdrachtformulering laten beginnen is geen afgebakende deelvraag.',
            'CA': 'Eerst de vraag scherp. Ravi zonder opdrachtformulering laten beginnen is geen afgebakende deelvraag.',
            'BD': 'Zelf een avond doorwerken is geen coördinatie en geen coaching, en mogelijk dubbel werk met het LOCO.',
            'CD': 'Zelf een avond doorwerken is geen coördinatie en geen coaching.',
            'BE': 'Doorsturen zonder uitleg is geen intermediair zijn. Jij brengt vraag en aanbod samen, je schuift de vraag niet door.',
            'CE': 'Doorsturen zonder uitleg is geen intermediair zijn. Jij brengt vraag en aanbod samen, je schuift de vraag niet door.',
          },
          why: 'Coördineren, verbinden en coachen zijn geen losse taken. In één mailtje komen ze alle drie samen.',
          explain: 'B (intake) maakt de vraag scherp; C (LOCO) voorkomt dubbel werk en kan het regionale beeld aan het landelijke koppelen. Daarna kan Ravi een afgebakende deelvraag krijgen, met een checkmoment. D maakt jou het knelpunt en E is doorschuiven, geen verbinden.' },
      ],
    },

    {
      title: 'Taak 5: Zo komt dit voor op een examen of assessment',
      kind: 'examen',
      optional: true,
      content: `
        <p>In een assessment voor een functie met een coachende en coördinerende rol krijg je vaak een situatie uit de
        praktijk: een collega die vastloopt, een vraag die te breed is, een partner die iets wil weten. De vraag is dan
        wat je als eerste doet, of welke reactie het best past. De afleiders zijn meestal gedrag dat op korte termijn
        werkt maar op lange termijn het team zwakker maakt.</p>

        <h3>Zo pak je zo'n vraag aan</h3>
        <ol>
          <li><strong>Wie is de eigenaar?</strong> Van de vraag (de vrager), van het werk (de collega), van de
          beslissing (de leiding of de officier). Een goed antwoord laat eigenaarschap waar het hoort.</li>
          <li><strong>Is de vraag helder?</strong> Als dat niet zo is, begint het goede antwoord bijna altijd met een
          intake of een verduidelijkende vraag.</li>
          <li><strong>Wie heeft het al?</strong> Voordat het team iets nieuws begint: bestaat het aanbod al ergens in
          het netwerk?</li>
          <li><strong>Mag het gedeeld worden?</strong> Bij alles wat naar buiten gaat: eerst de grondslag, dan het
          etiket.</li>
          <li><strong>Blijft het bestaan?</strong> Bij verbeteringen: is er een nulmeting, een pilot en een
          borging?</li>
        </ol>

        <div class="callout info">
          <strong>Let op de valkuil "zelf doen":</strong> in een assessment klinkt "ik los het zelf op" vaak daadkrachtig.
          Voor een rol als coach en coördinator is het bijna altijd het verkeerde antwoord.
        </div>

        <p>Een voorbeeld van zo'n redenering: "De vraag is te breed en ik weet niet of het LOCO hier al aan werkt. Ik
        doe eerst een korte intake met de vrager en check het netwerk. Daarna geef ik een junior collega een afgebakende
        deelvraag met een checkmoment." Zo laat je zien dat je coördineren, verbinden en coachen samen neemt.</p>

        <p>De vragen hieronder zijn zelf geschreven in die stijl. Alles is fictief.</p>
      `,
      questions: [
        { q: 'Een collega-analist levert voor de derde keer een product in waarin aannames als feiten staan. Wat doe je eerst?', options: ['Een gesprek met concrete SBI-feedback en samen met GROW kijken hoe ze dit zelf voortaan opmerkt', 'Haar producten voortaan zelf herschrijven', 'Het bij de teamleiding melden zonder het eerst met haar te bespreken', 'Niets: ze leert het vanzelf'], answer: 0,
          wrong: { 1: 'Dan neem je haar eigenaarschap over en leert ze het nooit.', 2: 'Eerst het gesprek met de collega zelf. Escaleren kan later, als het niet verbetert.', 3: 'Drie keer dezelfde fout laat zien dat het niet vanzelf gaat.' },
          explain: 'Concrete feedback en een coachgesprek geven haar het inzicht en de verantwoordelijkheid om het zelf op te lossen.' },
        { q: 'Een bank vraagt of je de namen van verdachten uit een lopend onderzoek kunt delen, "onder TLP:RED". Wat is je reactie?', options: ['Eerst nagaan of de Wet politiegegevens een grondslag voor verstrekking biedt; TLP:RED verandert daar niets aan', 'Delen, want TLP:RED is het strengste label', 'Weigeren, want politiegegevens mogen nooit naar buiten', 'Delen als de bank belooft het niet door te sturen'], answer: 0,
          wrong: { 1: 'TLP regelt het verder delen door de ontvanger, niet of jij mag verstrekken.', 2: 'Te absoluut: verstrekken kan als de wet er een grondslag voor biedt.', 3: 'Een belofte is geen wettelijke grondslag.' },
          explain: 'De Wpg bepaalt of je mag verstrekken. Pas daarna speelt het TLP-label een rol.' },
        { q: 'Je hebt een script gebouwd dat het team veel tijd bespaart. Alleen jij weet hoe het werkt. Wat ontbreekt er nog?', options: ['Borging: een werkinstructie, een eigenaar, een korte training en een evaluatiemoment', 'Niets: het werkt toch', 'Een nieuwe pilot met een ander script', 'Een persbericht'], answer: 0,
          wrong: { 1: 'Als jij ziek bent of vertrekt, werkt niemand er meer mee.' },
          explain: 'Een verbetering die aan één persoon hangt, is niet geborgd.' },
      ],
    },
  ],
  terms: [
    { term: 'Opdrachtformulering', def: 'Vastgelegde afspraak over een analysevraag: vrager en beslissing, kernvraag en deelvragen, afbakening, deadline, vorm en verspreiding.' },
    { term: 'Vier-ogencontrole', def: 'Een tweede analist controleert een product vóór verzending, vooral op de kernconclusie, de labels en de bronvermelding.' },
    { term: 'SBI-feedback', def: 'Feedback in drie delen: Situation (wanneer en waar), Behaviour (wat je zag, zonder oordeel) en Impact (het gevolg).' },
    { term: 'GROW-model', def: 'Structuur voor een coachgesprek: Goal (doel), Reality (huidige situatie), Options (mogelijkheden) en Will of way forward (afspraak).' },
    { term: 'Eigenaarschap', def: 'Wie verantwoordelijk blijft voor het werk. Een coach laat het eigenaarschap bij de collega en neemt het werk niet over.' },
    { term: 'Intermediair', def: 'Iemand die vraag en aanbod in een netwerk bij elkaar brengt: hij ziet wie iets nodig heeft en wie het al heeft.' },
    { term: 'Macht-belangmatrix', def: 'Stakeholderkaart (naar Mendelow) met de assen invloed en belang: nauw betrekken, tevreden houden, goed informeren of in de gaten houden.' },
    { term: 'Traffic Light Protocol (TLP)', def: 'Afspraak over verder delen van informatie, versie 2.0: RED, AMBER+STRICT, AMBER, GREEN en CLEAR. Geen wettelijke grondslag.' },
    { term: 'Need-to-know', def: 'Je deelt informatie alleen met wie het voor zijn taak nodig heeft, ook binnen de eigen organisatie.' },
    { term: 'Wet politiegegevens (Wpg)', def: 'Wet die regelt hoe de politie politiegegevens verwerkt en aan wie ze die mag verstrekken.' },
    { term: 'Nulmeting', def: 'Meting van de situatie vóór een verandering, zodat je daarna kunt aantonen wat de verandering opleverde.' },
  ],
  resources: [
    { title: 'FIRST — Traffic Light Protocol (TLP) 2.0', url: 'https://www.first.org/tlp/' },
    { title: 'Wet politiegegevens (wetten.overheid.nl)', url: 'https://wetten.overheid.nl/BWBR0022463/' },
    { title: 'Politie — werken bij de politie', url: 'https://www.politie.nl/' },
    { title: 'Center for Creative Leadership — feedback en leiderschap', url: 'https://www.ccl.org/' },
  ],
  check: [
    { q: 'Een vraag luidt "zoek alles uit over groep X". Wat doe je eerst?', options: ['Een intake en een opdrachtformulering', 'Alle bronnen verzamelen', 'Het werk verdelen', 'De vraag weigeren'], answer: 0, explain: 'Zonder heldere vraag weet je niet wat genoeg is.' },
    { q: 'Welke GROW-stap vraagt "wat ga je doen, en wanneer?"', options: ['Will', 'Goal', 'Reality', 'Options'], answer: 0, explain: 'Will (of way forward) is de afspraak aan het eind.' },
    { q: 'Wat bepaalt of je politiegegevens met een externe partner mag delen?', options: ['De Wet politiegegevens', 'Het TLP-label', 'De wens van de partner', 'Of het rapport kort is'], answer: 0, explain: 'TLP is een etiket voor verder delen; de grondslag komt uit de wet.' },
    { q: 'Waarom begin je een verbetering met een nulmeting?', options: ['Om straks te kunnen laten zien wat de verandering opleverde', 'Om de verbetering uit te stellen', 'Omdat een pilot anders niet mag', 'Om collega\'s te beoordelen'], answer: 0, explain: 'Zonder nulmeting blijft het effect een mening.' },
  ],
});
