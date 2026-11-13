/* Room: Cloudbeveiliging */
CS.registerRoom({
  id: 'cloudbeveiliging',
  path: 'defensief',
  order: 11,
  title: 'Cloudbeveiliging: verantwoordelijkheid, rechten en sporen',
  icon: '☁️',
  difficulty: 'Gemiddeld',
  minutes: 75,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'De cloud is iemand anders zijn computer, maar jouw configuratie. Verdeel de verantwoordelijkheid tussen provider en klant, licht cloud-identiteiten door, vind openbare opslag en sleutels in code, volg een gestolen sleutel door een auditlog en handel het incident af.',
  objectives: [
    'Het model van gedeelde verantwoordelijkheid toepassen op IaaS, PaaS en SaaS',
    'Cloud-identiteiten en rechtenbeleid beoordelen op least privilege, MFA en langlevende sleutels',
    'De bekendste misconfiguraties herkennen: openbare opslag, te ruime rollen, open beheerpoorten en sleutels in code',
    'Een cloud-auditlog doorzoeken op misbruik van een toegangssleutel en de stappen van een aanvaller reconstrueren',
    'De eerste stappen van een cloudincident in de juiste volgorde zetten',
  ],
  tasks: [
    {
      title: 'Taak 1: Gedeelde verantwoordelijkheid',
      tryFirst: true,
      intro: '<p>Het fictieve verhuurbedrijf Veldkamp gebruikt een mix van cloudmodellen. In het lab staan zestien beveiligingstaken. Groepeer ze naar wie ervoor verantwoordelijk is, en tel daarna hoeveel taken bij elk model nog bij Veldkamp liggen.</p>',
      content: `
        <p>Cloud betekent niet dat beveiliging iemand anders zijn probleem wordt. Het betekent dat het werk wordt
        verdeeld. Die verdeling heet het <strong>model van gedeelde verantwoordelijkheid</strong> (<em>shared
        responsibility model</em>). De grote providers publiceren er elk een eigen versie van, maar de kern is overal
        gelijk: de provider beveiligt de cloud zelf, de klant beveiligt wat hij <em>in</em> de cloud zet.</p>
        <p>NIST beschreef in SP 800-145 (2011) de drie klassieke servicemodellen. Vergelijk ze met wonen:</p>
        <ul>
          <li><strong>IaaS</strong> (<em>Infrastructure as a Service</em>): je huurt een kaal huis. De verhuurder
          zorgt voor fundering, dak en leidingen (datacenter, hardware, netwerk, virtualisatie). Jij zorgt voor alles
          daarbinnen: het besturingssysteem van je virtuele machines, de software erop, de configuratie, de
          gegevens.</li>
          <li><strong>PaaS</strong> (<em>Platform as a Service</em>): je huurt een gemeubileerd appartement. De
          provider beheert ook het besturingssysteem en de runtime, bijvoorbeeld een beheerde database of een
          platform waarop je alleen je code neerzet. Jij zorgt voor je applicatie, je gegevens en wie erbij mag.</li>
          <li><strong>SaaS</strong> (<em>Software as a Service</em>): je verblijft in een hotel. De provider levert de
          complete applicatie, zoals een online kantoorpakket of een CRM. Jij beslist nog steeds wie een account krijgt,
          welke rechten die heeft en welke gegevens je erin zet.</li>
        </ul>
        <h3>Wat altijd bij de klant blijft</h3>
        <p>Hoe hoger in de stapel je gaat, hoe meer de provider overneemt. Maar drie dingen blijven in elk model bij
        jou: <strong>je gegevens</strong> (wat je opslaat en hoe gevoelig het is), <strong>je identiteiten</strong>
        (wie een account heeft, met welke rechten en met welke authenticatie) en <strong>je configuratie</strong>
        (welke instellingen je kiest). Daarom gaan de meeste cloudincidenten niet over een gehackte provider, maar
        over een klant die een opslagcontainer openzette of een sleutel liet slingeren.</p>
        <h3>Waar het wringt</h3>
        <p>Het grijze gebied zit in de details. Bij IaaS levert de provider een firewallfunctie, maar jij schrijft de
        regels. Bij SaaS kun je logging vaak alleen gebruiken als je het juiste abonnement hebt en het aanzet. Lees
        dus per dienst wat de provider belooft, en wat hij uitdrukkelijk aan jou overlaat.</p>
        <div class="callout info"><strong>Aansprakelijkheid:</strong> ook als een provider een taak uitvoert, blijft
        jouw organisatie verantwoordelijk tegenover klanten en toezichthouders. Onder de AVG ben je
        verwerkingsverantwoordelijke, en is de cloudprovider in de regel verwerker.</div>
      `,
      lab: {
        type: 'connections',
        prompt: 'Wie is verantwoordelijk? Vorm vier groepen van vier taken.',
        flag: 'NM{gedeeld_is_niet_overgedragen}',
        groups: [
          { name: 'Altijd de provider', items: ['Fysieke toegang tot het datacenter', 'Stroom en koeling', 'Defecte schijven vervangen', 'De hypervisor patchen'] },
          { name: 'Altijd de klant', items: ['Bepalen wie bij de gegevens mag', 'MFA afdwingen voor eigen gebruikers', 'Accounts van vertrekkers intrekken', 'Gegevens classificeren'] },
          { name: 'Klant bij IaaS, provider bij PaaS en SaaS', items: ['Het besturingssysteem van de server patchen', 'De runtime (bijv. Java) bijwerken', 'De databasesoftware updaten', 'Antimalware op de server installeren'] },
          { name: 'Klant bij IaaS en PaaS, provider bij SaaS', items: ['Fouten in de applicatiecode herstellen', 'Kwetsbare bibliotheken in de applicatie vervangen', 'Nieuwe versies van de applicatie uitrollen', 'Invoervalidatie in de applicatie bouwen'] },
        ],
      },
      questions: [
        { q: 'Los het lab op. Welke vlag verschijnt?', answer: ['NM{gedeeld_is_niet_overgedragen}'],
          hints: ['Begin met wat de provider altijd doet: alles wat fysiek is.', 'Zoek dan wat de klant nooit kwijtraakt: gegevens en identiteiten.', 'Het onderscheid tussen de laatste twee groepen: gaat het om het platform onder de app, of om de app zelf?'],
          explain: 'Gedeelde verantwoordelijkheid is verdeeld werk, geen overgedragen werk.' },
        { q: 'Veldkamp gebruikt een SaaS-boekhoudpakket. Hoeveel van de zestien taken uit het lab liggen daar nog bij Veldkamp?', answer: ['4', 'vier'],
          hints: ['Bij SaaS levert de provider de applicatie zelf.', 'Alleen één groep blijft bij de klant.', 'De groep met gegevens en identiteiten.'],
          wrong: { '8': 'Dat is het aantal bij PaaS. Bij SaaS is ook de applicatiecode van de provider.', '0': 'Gegevens, toegang en accounts blijven altijd bij de klant, ook bij SaaS.' },
          explain: 'Vier: wie bij de gegevens mag, MFA, vertrekkers en classificatie. Precies daar gaan SaaS-incidenten meestal over.' },
        { q: 'Veldkamp zet een eigen planningsapp op een PaaS-platform. Hoeveel van de zestien taken liggen dan bij Veldkamp?', answer: ['8', 'acht'],
          hints: ['Tel de groepen die bij PaaS bij de klant liggen.', 'De groep "altijd de klant" telt mee, en nog één andere.', 'Ook de applicatiecode is van Veldkamp.'],
          wrong: { '12': 'Bij PaaS beheert de provider het besturingssysteem, de runtime en de databasesoftware.', '4': 'Bij PaaS schrijft Veldkamp de applicatie zelf. Die taken horen er ook bij.' },
          explain: 'Acht: gegevens en identiteiten, plus alles aan de eigen applicatie.' },
        { q: 'Na een datalek bij een SaaS-dienst blijkt dat een medewerker van Veldkamp een openbare deellink naar een klantenbestand had gemaakt. Wie is verantwoordelijk tegenover de klanten?', options: ['Veldkamp, want het delen van gegevens is een klanttaak in elk model', 'De SaaS-provider, want het is zijn applicatie', 'Niemand, want de functie werkte zoals bedoeld', 'De provider en Veldkamp ieder voor de helft'], answer: 0,
          wrong: { 1: 'De provider levert de deelfunctie, maar Veldkamp besliste wat er gedeeld werd.', 2: 'Dat de functie werkt, maakt het niet minder een datalek. Iemand moet het melden.', 3: 'Verantwoordelijkheid voor een eigen configuratiekeuze wordt niet gedeeld.' },
          explain: 'Gegevens en toegang blijven bij de klant. Veldkamp moet het datalek beoordelen en zo nodig melden bij de Autoriteit Persoonsgegevens.' },
      ],
    },

    {
      title: 'Taak 2: Cloud-identiteit en rechten',
      tryFirst: true,
      intro: '<p>In het lab staat een export van alle identiteiten in de cloudomgeving van Veldkamp, met hun MFA-status, hun toegangssleutels en het rechtenbeleid dat eraan hangt. Zoek de identiteiten die je vandaag nog wilt aanpakken.</p>',
      content: `
        <p>In de cloud is identiteit de nieuwe netwerkrand. Er is geen kantoor waar je de stekker uit kunt trekken:
        wie een geldige identiteit met de juiste rechten heeft, kan vanaf elke plek ter wereld je omgeving beheren.
        Daarom begint cloudbeveiliging bij identiteits- en toegangsbeheer.</p>
        <h3>Soorten identiteiten</h3>
        <ul>
          <li><strong>Het hoofdaccount.</strong> Het account waarmee de omgeving ooit is aangemaakt, met onbeperkte
          rechten. Bij AWS heet dat de <em>root user</em>. Dit account gebruik je bijna nooit, beveilig je met sterke
          MFA en geef je geen toegangssleutels.</li>
          <li><strong>Mensen</strong>, bij voorkeur via de centrale identity provider van de organisatie, zodat het
          leaverproces ook de cloud dekt. Bij Azure is dat Microsoft Entra ID.</li>
          <li><strong>Werklasten</strong>: applicaties, functies en pipelines. Die hebben ook een identiteit nodig. De
          oude manier is een <strong>langlevende toegangssleutel</strong>: een sleutel-ID plus een geheim, dat
          jarenlang geldig blijft. De betere manier is een rol of beheerde identiteit die <strong>tijdelijke
          inloggegevens</strong> krijgt, die na korte tijd vanzelf verlopen. Bij AWS herken je dat aan het
          voorvoegsel van de sleutel-ID: <code>AKIA</code> voor langlevend, <code>ASIA</code> voor tijdelijk.</li>
        </ul>
        <h3>Rechtenbeleid lezen</h3>
        <p>Rechten worden toegekend met een beleid: een lijst regels die zegt welke acties op welke resources mogen.
        Een vereenvoudigd voorbeeld:</p>
        <pre><code>{ "effect": "toestaan", "actie": "opslag:Lees*", "resource": "veldkamp-facturen/*" }
{ "effect": "toestaan", "actie": "*",          "resource": "*" }</code></pre>
        <p>De eerste regel is netjes beperkt: alleen lezen, alleen in één container. De tweede is in de praktijk een
        beheerdersrol: alle acties op alle resources. Zo'n jokerregel is soms handig tijdens het bouwen en blijft
        daarna vaak staan.</p>
        <p>Bij de grote providers geldt: wat niet expliciet is toegestaan, is geweigerd. En bij AWS wint een
        expliciete weigering altijd van een toestemming, ook als die toestemming in een ander beleid staat.</p>
        <h3>Waar je op let</h3>
        <ul>
          <li>Heeft elke menselijke identiteit met beheerrechten MFA?</li>
          <li>Heeft het hoofdaccount toegangssleutels? Dan moeten die weg.</li>
          <li>Welke sleutels zijn ouder dan een jaar, of al maanden niet gebruikt?</li>
          <li>Welke identiteiten hebben een jokerbeleid, en waarom?</li>
        </ul>
      `,
      lab: {
        type: 'logs',
        title: 'identiteiten-export-veldkamp-2026-11-12.txt',
        lines: `identiteit      type       mfa   sleutel-id            leeftijd  laatst-gebruikt  beleid
hoofdaccount    hoofd      nee   WKAK1H0EXAMPLE0ROOT   1490d     2026-03-02       volledige toegang (ingebouwd)
l.jansen        mens       ja    -                     -         -                lezer-alles
b.okafor        mens       ja    -                     -         -                beheerder-netwerk
r.hendriks      mens       nee   -                     -         -                beheerder-alles
svc-facturatie  werklast   n.v.t WKAK5D3EXAMPLE8FCTR   812d      2026-11-12       opslag:* op veldkamp-facturen/*
svc-deploy      werklast   n.v.t WKAK7Q2EXAMPLE9XK4LM  455d      2026-11-12       * op *
svc-export      werklast   n.v.t WKAK2V6EXAMPLE4EXPT   402d      2025-12-30       opslag:Lees* op veldkamp-hr-export/*
ci-pipeline     werklast   n.v.t -                     -         -                rol met tijdelijke gegevens: bouwen:* op veldkamp-build/*
app-planning    werklast   n.v.t -                     -         -                beheerde identiteit: database:Lees* op planning-db`,
      },
      questions: [
        { q: 'Welke menselijke identiteit met volledige beheerrechten heeft geen MFA?', answer: ['r.hendriks', 'hendriks'],
          hints: ['Filter op "mfa" en kijk naar de kolom met nee.', 'Het hoofdaccount is geen persoon; zoek een mens.', 'Het beleid beheerder-alles.'],
          wrong: { 'hoofdaccount': 'Ook een groot probleem, maar gevraagd is een menselijke identiteit (type mens).' },
          explain: 'r.hendriks heeft beheerder-alles zonder MFA. Eén gephisht wachtwoord en de hele omgeving ligt open.' },
        { q: 'Hoeveel toegangssleutels in de export zijn ouder dan 365 dagen?', answer: ['4', 'vier'],
          hints: ['Kijk naar de kolom leeftijd.', 'Tel alle waarden boven 365d, ook die van het hoofdaccount.', '1490, 812, 455 en 402.'],
          wrong: { '3': 'Ook het hoofdaccount heeft een sleutel, en die is het oudst.', '5': 'Er zijn maar vier sleutels. De andere werklasten gebruiken tijdelijke inloggegevens of een beheerde identiteit.' },
          explain: 'Vier. Alle langlevende sleutels in deze omgeving zijn dus ouder dan een jaar: niemand roteert ze.' },
        { q: 'Welke werklast heeft feitelijk volledige beheerrechten?', answer: ['svc-deploy'],
          hints: ['Zoek een beleid met jokers.', 'Een jokerregel op zowel actie als resource.', '"* op *".'],
          wrong: { 'svc-facturatie': 'opslag:* is breed, maar beperkt tot opslag en tot één container.', 'ci-pipeline': 'bouwen:* is beperkt tot één dienst en één resource, en gebruikt tijdelijke gegevens.' },
          why: 'Een werklast met * op * en een langlevende sleutel is het meest gezochte doel in een cloudomgeving: één gelekte sleutel geeft alles.',
          explain: 'svc-deploy heeft * op * met een langlevende sleutel van 455 dagen oud. Onthoud deze sleutel-ID: hij komt terug.' },
        { q: 'Een identiteit heeft twee beleidsregels: "toestaan opslag:* op *" en "weigeren opslag:Verwijder* op veldkamp-backups/*". Mag deze identiteit bij AWS een back-up uit veldkamp-backups verwijderen?', options: ['Nee, een expliciete weigering wint van een toestemming', 'Ja, de toestemming op * gaat voor', 'Ja, want de laatste regel telt', 'Alleen als de identiteit MFA heeft'], answer: 0,
          wrong: { 1: 'Een jokertoestemming wint niet van een gerichte weigering.', 2: 'De volgorde van de regels doet niet ter zake. Weigeren wint altijd.', 3: 'MFA kan als voorwaarde in een beleid staan, maar dat is hier niet zo.' },
          explain: 'Bij AWS wint een expliciete weigering altijd. Dat maakt een weigerregel op back-ups een goede vangrail tegen ransomware.' },
      ],
    },

    {
      title: 'Taak 3: De bekendste misconfiguraties',
      tryFirst: true,
      intro: '<p>Je krijgt leestoegang tot een kopie van de configuratie van Veldkamp: de opslagcontainers, de netwerkregels en de broncode van de planningsapp. Zoek een container die openbaar is terwijl dat niet de bedoeling is, een beheerpoort die voor heel internet openstaat en een sleutel in de code. Begin met <code>cat LEESMIJ.txt</code>.</p>',
      content: `
        <p>Publicaties van onder meer de NSA (2020) en de Cloud Security Alliance schetsen telkens hetzelfde beeld:
        de meeste cloudincidenten beginnen bij een configuratiefout of een gestolen identiteit, niet bij een
        geavanceerde aanval op de provider. De vier bekendste:</p>
        <h3>1. Openbaar leesbare opslag</h3>
        <p>Objectopslag (bij AWS een S3-bucket, bij Azure een Blob Storage-container) kan zo worden ingesteld dat
        iedereen op internet de bestanden kan lezen, zonder in te loggen. Voor de plaatjes van een website is dat
        prima. Voor facturen, back-ups of HR-exports is het een datalek dat wacht op iemand die de naam raadt. Er
        zijn scanners die niets anders doen dan bekende naampatronen proberen. Nieuwe containers staan bij de grote
        providers inmiddels standaard dicht, maar oude containers en bewuste uitzonderingen blijven bestaan.</p>
        <h3>2. Te ruime rollen</h3>
        <p>Zie taak 2: een jokerbeleid is snel gemaakt en zelden opgeruimd.</p>
        <h3>3. Beheerpoorten open naar internet</h3>
        <p>Een netwerkregel die SSH (22) of RDP (3389) toestaat vanaf <code>0.0.0.0/0</code>, betekent: vanaf elk
        adres ter wereld. Binnen minuten na het openzetten komen de eerste geautomatiseerde inlogpogingen. Beheer
        hoort via een VPN, een bastionhost of een beheerdienst van de provider te lopen.</p>
        <h3>4. Sleutels in code</h3>
        <p>Een ontwikkelaar zet een toegangssleutel "even" in een configuratiebestand om iets te testen, en pusht het
        naar een repository. Ook als hij de regel later weghaalt, blijft de sleutel in de geschiedenis staan. Op
        openbare platforms zoeken bots en aanvallers continu naar dit soort patronen. De oplossing: geheimen in een
        kluis (<em>secrets manager</em>), tijdelijke inloggegevens voor werklasten, en een scanner die commits met
        sleutels tegenhoudt.</p>
        <h3>Handige commando's in het lab</h3>
        <pre><code>ls opslag
cat opslag/veldkamp-facturen.conf
grep -r openbaar opslag
grep -r 0.0.0.0/0 netwerk
grep -r WKAK repo</code></pre>
        <div class="callout tip"><strong>Denk na over de bedoeling.</strong> Niet elke openbare container is fout.
        Kijk naar de classificatie en het doel dat erbij staat, en beoordeel dan of openbaar past.</div>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student', host: 'veldkamp-audit',
        home: '/home/student', cwd: '/home/student',
        motd: 'Leeskopie van de cloudconfiguratie van Veldkamp Verhuur (fictief). Begin met: cat LEESMIJ.txt',
        fs: {
          '/home/student/LEESMIJ.txt': 'CONFIGURATIEREVIEW VELDKAMP (fictief)\n1. opslag/   : configuratie van alle opslagcontainers\n2. netwerk/  : netwerkregels per groep\n3. repo/     : broncode van de planningsapp\nZoek: openbare opslag die niet openbaar hoort te zijn, beheerpoorten open naar internet, sleutels in code.\n',
          '/home/student/opslag/veldkamp-website.conf': 'naam = veldkamp-website\ndoel = afbeeldingen en stijlbladen voor www.veldkamp.nm.lab\nclassificatie = openbaar\ntoegang = openbaar-lezen\nversiebeheer = aan\nversleuteling = aan\n',
          '/home/student/opslag/veldkamp-facturen.conf': 'naam = veldkamp-facturen\ndoel = pdf-facturen aan klanten (naam, adres, IBAN)\nclassificatie = vertrouwelijk\ntoegang = openbaar-lezen\nversiebeheer = uit\nversleuteling = aan\n# toegang tijdelijk openbaar gezet voor koppeling met drukkerij (2025-04-11), daarna vergeten terug te zetten\n',
          '/home/student/opslag/veldkamp-backups.conf': 'naam = veldkamp-backups\ndoel = nachtelijke back-ups planning-db\nclassificatie = vertrouwelijk\ntoegang = prive\nversiebeheer = aan\nobjectvergrendeling = aan (30 dagen)\nversleuteling = aan\n',
          '/home/student/opslag/veldkamp-hr-export.conf': 'naam = veldkamp-hr-export\ndoel = maandelijkse export voor salarisverwerker\nclassificatie = geheim\ntoegang = prive\nversiebeheer = aan\nversleuteling = aan\n',
          '/home/student/netwerk/groep-web.conf': 'groep = web\nregel 1: toestaan tcp 443 van 0.0.0.0/0\nregel 2: toestaan tcp 80 van 0.0.0.0/0 (doorsturen naar 443)\n',
          '/home/student/netwerk/groep-beheer.conf': 'groep = beheer (vm-beheer01)\nregel 1: toestaan tcp 22 van 192.0.2.0/24 (kantoor)\nregel 2: toestaan tcp 3389 van 0.0.0.0/0\n# regel 2 toegevoegd voor externe leverancier, zie ticket 4471\n',
          '/home/student/netwerk/groep-db.conf': 'groep = database\nregel 1: toestaan tcp 5432 van groep web\n',
          '/home/student/repo/planning-app/README.md': '# Planning-app Veldkamp\nDeploy via de pipeline. Geheimen staan in de kluis.\n',
          '/home/student/repo/planning-app/app.py': 'from instellingen import laad\n\ndef main():\n    cfg = laad()\n    print("planning-app gestart")\n',
          '/home/student/repo/planning-app/instellingen.py': 'import os\n\ndef laad():\n    return {"db": os.environ.get("PLANNING_DB")}\n',
          '/home/student/repo/planning-app/scripts/deploy_test.py': '# snel testen zonder pipeline - NIET COMMITTEN\nWOLK_SLEUTEL_ID = "WKAK7Q2EXAMPLE9XK4LM"\nWOLK_GEHEIM = "fictief-oefengeheim-zonder-waarde"\nREGIO = "eu-noord"\n',
          '/home/student/repo/planning-app/.env.voorbeeld': 'PLANNING_DB=postgres://planning@db.veldkamp.nm.lab/planning\n',
        },
        denied: ['/root', '/etc/shadow'],
      },
      questions: [
        { q: 'Hoeveel opslagcontainers zijn openbaar leesbaar?', answer: ['2', 'twee'],
          hints: ['Zoek in de map opslag naar de instelling toegang.', 'grep -r openbaar-lezen opslag', 'Let op: classificatie = openbaar is iets anders dan toegang = openbaar-lezen.'],
          wrong: { '1': 'Ook de websitecontainer is openbaar. Dat is daar de bedoeling, maar hij telt wel mee.', '3': 'Je telt waarschijnlijk de regel classificatie = openbaar mee. Tel alleen de toegang.' },
          explain: 'veldkamp-website en veldkamp-facturen. Bij de eerste past dat, bij de tweede niet.' },
        { q: 'Welke openbare container bevat gegevens die niet openbaar mogen zijn?', answer: ['veldkamp-facturen'],
          hints: ['Vergelijk bij de openbare containers de classificatie.', 'cat opslag/veldkamp-facturen.conf', 'Facturen met naam, adres en IBAN.'],
          wrong: { 'veldkamp-website': 'Die is openbaar en geclassificeerd als openbaar. Dat klopt.', 'veldkamp-hr-export': 'Die bevat de gevoeligste gegevens, maar staat op prive.' },
          why: 'Een tijdelijke uitzondering die nooit wordt teruggedraaid, is een van de meest voorkomende oorzaken van een cloud-datalek. Hier staan persoonsgegevens en IBAN\'s al anderhalf jaar open.',
          explain: 'veldkamp-facturen is vertrouwelijk maar openbaar leesbaar sinds april 2025, voor een koppeling die allang niet meer nodig is.' },
        { q: 'Welke beheerpoort staat open voor heel internet?', answer: ['3389', 'rdp', 'tcp 3389'],
          hints: ['Zoek naar 0.0.0.0/0 in de netwerkregels.', 'grep -r 0.0.0.0/0 netwerk', 'Poorten 80 en 443 van de webgroep zijn geen beheerpoorten.'],
          wrong: { '22': 'SSH staat alleen open vanaf het kantoornetwerk 192.0.2.0/24.', '443': 'HTTPS naar de webserver mag openstaan. Dat is geen beheerpoort.' },
          explain: 'RDP (3389) op vm-beheer01 staat open vanaf 0.0.0.0/0, toegevoegd voor een leverancier. Beperk het tot vaste adressen of laat de leverancier via een VPN of bastion werken.' },
        { q: 'In welk bestand staat een toegangssleutel in de code? (alleen de bestandsnaam)', answer: ['deploy_test.py', 'scripts/deploy_test.py'],
          hints: ['Sleutel-ID\'s bij deze provider beginnen met WKAK.', 'grep -r WKAK repo', 'Het staat in de map scripts.'],
          wrong: { 'instellingen.py': 'Dat bestand haalt de database-instelling netjes uit een omgevingsvariabele.', '.env.voorbeeld': 'Daar staat een databaseadres, geen toegangssleutel.' },
          explain: 'deploy_test.py bevat de sleutel van svc-deploy, met "NIET COMMITTEN" erboven. Dezelfde sleutel had in taak 2 * op * als beleid.' },
      ],
    },

    {
      title: 'Taak 4: Sporen in het cloud-auditlog',
      tryFirst: true,
      intro: '<p>Op dinsdagochtend ziet Veldkamp een factuur van de cloudprovider die drie keer zo hoog is als normaal. In het lab staat het auditlog van de avond ervoor. Zoek uit vanaf welk adres de sleutel van svc-deploy werd misbruikt, wat de aanvaller deed en hoe hij probeerde binnen te blijven.</p>',
      content: `
        <p>Elke actie in een cloudomgeving is een API-aanroep, ook een klik in de webconsole. De provider kan die
        aanroepen vastleggen in een <strong>auditlog</strong>. Dat is voor een cloudonderzoek wat het eventlog is voor
        een Windows-onderzoek: de belangrijkste bron.</p>
        <h3>De bekende logbronnen</h3>
        <ul>
          <li><strong>AWS CloudTrail</strong> legt beheeracties (<em>management events</em>) vast, zoals het
          aanmaken van een gebruiker of het wijzigen van een beleid. Acties op de gegevens zelf, zoals het lezen van een
          object uit S3 (<em>data events</em>), worden standaard niet vastgelegd: die moet je aanzetten.</li>
          <li><strong>Azure</strong> kent het <em>Activity Log</em> voor beheeracties op een abonnement, de aanmeld- en
          auditlogs van Microsoft Entra ID voor identiteiten, en resourcelogs per dienst, die je via diagnostische
          instellingen aanzet.</li>
        </ul>
        <p>Het patroon is bij elke provider gelijk: beheeracties zie je meestal standaard, toegang tot gegevens vaak
        pas als je het hebt ingesteld. En de standaardbewaartermijn is beperkt. Stuur logs daarom naar een aparte,
        afgeschermde opslag of naar je SIEM.</p>
        <h3>Wat er in een regel staat</h3>
        <p>Wie (identiteit en sleutel-ID), wat (de actie), waarop (de resource), vanaf waar (bron-IP en user agent),
        wanneer, en of het lukte. Het log van Veldkamp gebruikt een vereenvoudigd, providerneutraal formaat.</p>
        <h3>Het typische verloop na een gelekte sleutel</h3>
        <ol>
          <li><strong>Wie ben ik?</strong> De aanvaller controleert eerst van wie de sleutel is en wat hij mag. Bij
          AWS is dat de aanroep <code>GetCallerIdentity</code>.</li>
          <li><strong>Verkennen:</strong> lijsten van opslag, gebruikers en machines opvragen.</li>
          <li><strong>Buit:</strong> gegevens downloaden.</li>
          <li><strong>Blijven:</strong> een eigen gebruiker of een extra sleutel aanmaken, zodat hij binnen blijft
          als de gelekte sleutel wordt ingetrokken.</li>
          <li><strong>Geld verdienen:</strong> vaak met dure rekenkracht voor cryptomining, op jouw rekening.</li>
          <li><strong>Sporen wissen:</strong> logging stopzetten of verwijderen. Bij CloudTrail heet dat
          <code>StopLogging</code> of <code>DeleteTrail</code>.</li>
        </ol>
        <p>De sterkste signalen: een bekende werklast die ineens vanaf een onbekend adres en met een andere user agent
        werkt, het aanmaken van identiteiten of sleutels buiten de normale pipeline, en elke poging om logging uit te
        zetten.</p>
        <div class="callout tip"><strong>Werkwijze:</strong> filter eerst op de sleutel-ID, dan op het afwijkende
        IP-adres. Gebruik <code>/regex/</code> om op meerdere acties tegelijk te zoeken, bijvoorbeeld
        <code>/create|stop/</code>.</div>
      `,
      lab: {
        type: 'logs',
        title: 'wolkdienst-audit-veldkamp-2026-11-09.log',
        lines: `2026-11-09T09:02:11Z ok   identiteit=l.jansen    sleutel=-                    bron=198.51.100.14 ua=browser-console   actie=console.aanmelden mfa=ja
2026-11-09T09:15:40Z ok   identiteit=svc-facturatie sleutel=WKAK5D3EXAMPLE8FCTR bron=192.0.2.10   ua=facturatie/2.4    actie=opslag.object.schrijven resource=veldkamp-facturen/F-2026-11-0412.pdf
2026-11-09T11:30:05Z ok   identiteit=svc-facturatie sleutel=WKAK5D3EXAMPLE8FCTR bron=192.0.2.10   ua=facturatie/2.4    actie=opslag.object.schrijven resource=veldkamp-facturen/F-2026-11-0413.pdf
2026-11-09T14:00:02Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=192.0.2.20   ua=deploy-tool/3.1   actie=compute.app.bijwerken resource=planning-app
2026-11-09T14:00:09Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=192.0.2.20   ua=deploy-tool/3.1   actie=opslag.object.schrijven resource=veldkamp-build/planning-2.8.1.zip
2026-11-09T16:44:51Z ok   identiteit=b.okafor    sleutel=-                    bron=192.0.2.33   ua=browser-console   actie=netwerk.regel.bekijken resource=groep-beheer
2026-11-09T21:12:37Z fout identiteit=onbekend    sleutel=-                    bron=203.0.113.200 ua=onbekend          actie=console.aanmelden gebruiker=r.hendriks reden=wachtwoord-onjuist
2026-11-09T23:41:07Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=identiteit.wie-ben-ik
2026-11-09T23:41:30Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=opslag.containers.opsommen
2026-11-09T23:41:52Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=iam.gebruikers.opsommen
2026-11-09T23:42:02Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=opslag.objecten.opsommen resource=veldkamp-hr-export
2026-11-09T23:43:15Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=opslag.object.lezen resource=veldkamp-hr-export/salarissen-2026-10.csv
2026-11-09T23:44:01Z fout identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=opslag.object.verwijderen resource=veldkamp-backups/planning-db-2026-11-09.dump reden=objectvergrendeling
2026-11-09T23:47:40Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=iam.gebruiker.aanmaken resource=onderhoud-svc
2026-11-09T23:47:58Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=iam.sleutel.aanmaken resource=onderhoud-svc nieuwe-sleutel=WKAK3M8EXAMPLE5RT1VA
2026-11-09T23:48:20Z ok   identiteit=svc-deploy  sleutel=WKAK7Q2EXAMPLE9XK4LM  bron=203.0.113.58  ua=script/1.0       actie=iam.beleid.koppelen resource=onderhoud-svc beleid=beheerder-alles
2026-11-09T23:49:12Z ok   identiteit=onderhoud-svc sleutel=WKAK3M8EXAMPLE5RT1VA bron=203.0.113.58  ua=script/1.0       actie=compute.machines.starten aantal=12 type=gpu-xl regio=eu-noord
2026-11-09T23:52:30Z ok   identiteit=onderhoud-svc sleutel=WKAK3M8EXAMPLE5RT1VA bron=203.0.113.58  ua=script/1.0       actie=audit.logging.stoppen resource=veldkamp-audit`,
      },
      questions: [
        { q: 'Vanaf welk IP-adres werd de sleutel van svc-deploy misbruikt?', answer: ['203.0.113.58'],
          hints: ['Filter op de sleutel-ID van svc-deploy.', 'Normaal werkt svc-deploy vanaf de pipeline, met deploy-tool als user agent.', 'Kijk naar de regels vanaf 23:41.'],
          wrong: { '192.0.2.20': 'Dat is de pipeline zelf, met de normale user agent, om 14:00.', '203.0.113.200': 'Dat adres probeerde in te loggen als r.hendriks en faalde. Het gebruikte de sleutel van svc-deploy niet.' },
          explain: 'Om 23:41 gebruikt de sleutel ineens 203.0.113.58 met user agent script/1.0, in plaats van de pipeline met deploy-tool.' },
        { q: 'Welke actie voerde de aanvaller als eerste uit met de gestolen sleutel?', answer: ['identiteit.wie-ben-ik', 'wie-ben-ik', 'wie ben ik'],
          hints: ['Filter op 203.0.113.58 en lees de eerste regel.', 'De aanvaller wil weten van wie de sleutel is.', 'Het lijkt op GetCallerIdentity bij AWS.'],
          wrong: { 'opslag.containers.opsommen': 'Dat is de tweede stap. Daarvoor controleert hij van wie de sleutel is.' },
          explain: 'identiteit.wie-ben-ik. Een werklast die dit ineens doet vanaf een nieuw adres, is een sterk signaal: een pipeline weet allang wie hij is.' },
        { q: 'Welke identiteit maakte de aanvaller aan om binnen te blijven?', answer: ['onderhoud-svc'],
          hints: ['Zoek naar aanmaken.', 'Filter op /aanmaken/.', 'Een naam die op een gewoon serviceaccount moet lijken.'],
          wrong: { 'svc-deploy': 'Dat is de bestaande identiteit waarvan de sleutel lekte.' },
          explain: 'onderhoud-svc, met een eigen sleutel en het beleid beheerder-alles. Wie alleen de gelekte sleutel intrekt, laat deze deur open.' },
        { q: 'Welke maatregel uit taak 3 voorkwam dat de aanvaller de back-up kon wissen?', options: ['Objectvergrendeling op veldkamp-backups', 'MFA op het hoofdaccount', 'De privé-instelling van veldkamp-hr-export', 'De netwerkregel voor SSH vanaf kantoor'], answer: 0,
          wrong: { 1: 'De aanvaller gebruikte een sleutel van een werklast, niet het hoofdaccount.', 2: 'Die container werd juist wél gelezen: de sleutel had * op *.', 3: 'De aanvaller werkte via de API, niet via SSH.' },
          explain: 'De verwijderpoging om 23:44 faalt met reden objectvergrendeling. Zonder die instelling was de back-up weg geweest.' },
      ],
    },

    {
      title: 'Taak 5: Een cloudincident afhandelen',
      tryFirst: true,
      intro: '<p>Het is dinsdag 08:30 en jij leidt de afhandeling. Je weet nu wat er in het auditlog staat. Maak in het lab vijf keuzes en sluit af met de vraag welke sleutel je naast de gelekte sleutel moet intrekken.</p>',
      content: `
        <p>Een cloudincident volgt dezelfde fasen als elk ander incident: voorbereiden, detecteren en analyseren,
        inperken, uitroeien en herstellen, en leren. Een paar dingen werken in de cloud wel anders.</p>
        <h3>Inperken gaat via identiteit</h3>
        <p>Er is geen netwerkkabel om los te trekken. Je perkt in door identiteiten en sleutels uit te schakelen.
        <strong>Deactiveer</strong> een gelekte sleutel eerst, in plaats van hem meteen te verwijderen: een
        gedeactiveerde sleutel werkt niet meer, maar blijft herkenbaar in logs en kun je terugzetten als blijkt dat een
        kritieke applicatie er onverwacht van afhing. Kijk ook wat de aanvaller zelf heeft aangemaakt: gebruikers,
        sleutels, rollen, beleid. Een aanvaller die weet dat hij gezien kan worden, maakt een tweede ingang voordat hij
        lawaai maakt.</p>
        <h3>Bewijs is vluchtig en ligt bij de provider</h3>
        <p>Je hebt geen schijf om te imagen, maar logs bij de provider, met een beperkte bewaartermijn. Zet logging
        weer aan als de aanvaller hem stopte, en exporteer wat er is naar een afgeschermde plek. Van verdachte
        machines maak je een snapshot voordat je ze verwijdert: dan kun je later nog onderzoeken wat erop draaide.</p>
        <h3>De rekening loopt door</h3>
        <p>Machines die een aanvaller start, kosten geld zolang ze draaien. Na de snapshot zet je ze uit. Meld een
        incident met misbruik van rekenkracht ook bij de provider: die heeft er vaak procedures voor.</p>
        <h3>Persoonsgegevens</h3>
        <p>Zijn er persoonsgegevens gelezen, dan is er sprake van een inbreuk in de zin van de AVG. Beoordeel of je
        die moet melden bij de Autoriteit Persoonsgegevens: binnen 72 uur na ontdekking, tenzij het niet waarschijnlijk
        is dat de inbreuk een risico oplevert voor de betrokkenen. Bij een hoog risico informeer je ook de betrokkenen
        zelf.</p>
        <h3>De oorzaak wegnemen</h3>
        <p>Een nieuwe sleutel in hetzelfde script is geen oplossing. Haal het geheim uit de code en uit de
        geschiedenis van de repository, laat de pipeline met tijdelijke inloggegevens werken, beperk het beleid van de
        werklast tot wat hij nodig heeft, en bouw een detectieregel op werklasten die vanaf een onbekend adres werken
        en op elke poging om logging te stoppen.</p>
        <div class="callout warn"><strong>Let op de volgorde:</strong> wie eerst de code repareert en pas daarna de
        sleutel intrekt, geeft de aanvaller uren extra.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'De sleutel van svc-deploy',
        scenario: 'Veldkamp Verhuur (fictief), dinsdag 08:30. De sleutel van svc-deploy is maandagavond misbruikt vanaf 203.0.113.58. Twaalf dure machines draaien nog. Logging staat sinds 23:52 uit.',
        pass: 5,
        flag: 'NM{sleutel_dicht_logs_veilig}',
        steps: [
          { situation: 'Wat doe je als eerste?', choices: [
            { label: 'De sleutel van svc-deploy deactiveren', good: true, feedback: 'Inperken eerst. Deactiveren in plaats van verwijderen, zodat hij herkenbaar blijft in logs en zo nodig terug te zetten is.' },
            { label: 'Het script deploy_test.py uit de repository halen', good: false, feedback: 'Nodig, maar de sleutel blijft werken zolang je hem niet intrekt. De aanvaller heeft hem al.' },
            { label: 'De hele cloudomgeving verwijderen en opnieuw opbouwen', good: false, feedback: 'Daarmee vernietig je bewijs en leg je het bedrijf plat. Eerst gericht inperken.' },
          ] },
          { situation: 'De sleutel is uit. Wat nu met de identiteit die de aanvaller aanmaakte?', choices: [
            { label: 'Laten staan: zonder de gelekte sleutel kan de aanvaller er niet meer bij', good: false, feedback: 'De nieuwe identiteit heeft een eigen sleutel en eigen beheerrechten. Die werkt gewoon door.' },
            { label: 'De identiteit en haar sleutel uitschakelen en het gekoppelde beleid vastleggen', good: true, feedback: 'Precies de tweede ingang die de aanvaller voor zichzelf maakte.' },
          ] },
          { situation: 'Logging staat sinds 23:52 uit.', choices: [
            { label: 'Logging weer aanzetten en het bestaande log naar afgeschermde opslag exporteren', good: true, feedback: 'Zonder logs zie je niet wat er nog gebeurt, en verlies je bewijs als de bewaartermijn verloopt.' },
            { label: 'Eerst afwachten of de aanvaller nog terugkomt', good: false, feedback: 'Zonder logging zie je dat niet eens.' },
          ] },
          { situation: 'Er draaien nog twaalf gpu-machines van de aanvaller.', choices: [
            { label: 'Van één machine een snapshot maken, daarna alle twaalf stoppen en de provider informeren', good: true, feedback: 'Bewijs bewaren, dan de kosten stoppen.' },
            { label: 'Laten draaien om de aanvaller niet te alarmeren', good: false, feedback: 'De aanvaller weet het al: zijn sleutels werken niet meer. En elk uur kost geld.' },
            { label: 'Meteen alle twaalf verwijderen', good: false, feedback: 'Dan weet je nooit wat erop draaide en waar het verkeer heen ging.' },
          ] },
          { situation: 'Het salarisbestand van oktober is gedownload.', choices: [
            { label: 'Niets melden: het was maar één bestand', good: false, feedback: 'Eén bestand met salarissen van alle medewerkers is een inbreuk met een reëel risico.' },
            { label: 'De inbreuk vastleggen, de privacyfunctionaris inschakelen en binnen 72 uur beoordelen en melden bij de AP', good: true, feedback: 'Salarisgegevens zijn persoonsgegevens met een duidelijk risico. Ook de medewerkers zelf verdienen uitleg.' },
          ] },
        ],
      },
      questions: [
        { q: 'Speel het scenario foutloos uit. Welke vlag krijg je?', answer: ['NM{sleutel_dicht_logs_veilig}'],
          hints: ['Inperken, dan opruimen, dan bewijs, dan kosten, dan melden.', 'Bij elke stap is één keuze goed. Lees de feedback.', 'Vijf van de vijf.'],
          explain: 'Inperken via identiteit, bewijs veiligstellen voordat het verdwijnt, en de meldplicht beoordelen.' },
        { q: 'Waarom deactiveer je een gelekte sleutel eerst, in plaats van hem direct te verwijderen?', options: ['Hij werkt dan niet meer, maar blijft herkenbaar in de logs en is terug te zetten als een kritieke applicatie er onverwacht op leunt', 'Verwijderen kan pas na 30 dagen', 'Een gedeactiveerde sleutel kan de aanvaller niet meer zien', 'Deactiveren is goedkoper dan verwijderen'], answer: 0,
          wrong: { 1: 'Verwijderen kan meteen. Het is alleen onomkeerbaar.', 2: 'Wat de aanvaller ziet, doet er niet toe. Het gaat om wat jij nog kunt herleiden en herstellen.', 3: 'Sleutels kosten niets. Het gaat om herleidbaarheid en herstel.' },
          explain: 'Deactiveren stopt het misbruik direct en houdt de weg terug open. Verwijderen doe je als de rust is weergekeerd.' },
        { q: 'Boss: welke toegangssleutel moet je naast die van svc-deploy ook intrekken? (sleutel-ID)', boss: true, answer: ['WKAK3M8EXAMPLE5RT1VA'],
          hints: ['Deze taak noemt alleen de gelekte sleutel. Het antwoord staat in het auditlog van taak 4.', 'Wat deed de aanvaller om binnen te blijven? Filter daar op /sleutel.aanmaken/.', 'De sleutel die bij onderhoud-svc hoort.'],
          wrong: { 'WKAK7Q2EXAMPLE9XK4LM': 'Dat is de gelekte sleutel zelf. Gevraagd is de andere.', 'WKAK5D3EXAMPLE8FCTR': 'Dat is de sleutel van svc-facturatie. Die werd in het log niet misbruikt. Roteren is verstandig omdat hij oud is, maar het is niet de tweede ingang van de aanvaller.', 'onderhoud-svc': 'Dat is de identiteit. Gevraagd is de sleutel-ID.' },
          why: 'Aanvallers maken een tweede ingang voordat ze opvallen. Wie alleen de bekende sleutel intrekt, denkt dat het incident voorbij is terwijl de aanvaller met beheerrechten binnen zit.',
          explain: 'Om 23:47:58 maakte de aanvaller voor onderhoud-svc de sleutel WKAK3M8EXAMPLE5RT1VA aan, koppelde beheerder-alles en gebruikte hem om machines te starten en logging te stoppen.' },
      ],
    },

    {
      title: 'Taak 6: Verdieping: het metadata-endpoint en SSRF',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Een virtuele machine in de cloud moet weten wie hij is: zijn naam, zijn netwerk, en de tijdelijke
        inloggegevens van de rol die eraan hangt. Daarvoor heeft elke grote provider een
        <strong>instance metadata service</strong>: een speciaal adres dat alleen vanaf de machine zelf bereikbaar is.
        Bij AWS, Azure en Google Cloud is dat het link-local-adres <code>169.254.169.254</code>.</p>
        <p>Dat is handig: een applicatie op de machine haalt daar tijdelijke inloggegevens op en hoeft geen sleutel in
        een configuratiebestand te hebben. Het is precies wat je in taak 2 en 5 als goede praktijk zag.</p>
        <h3>Waar het misgaat</h3>
        <p>Stel dat de webapplicatie op die machine een functie heeft als "haal een plaatje op van deze URL". Als de
        applicatie niet controleert welke URL je opgeeft, vraag je haar om
        <code>http://169.254.169.254/...</code> op te halen. De applicatie doet dat netjes, vanaf de machine zelf, en
        stuurt je de tijdelijke inloggegevens terug. Dit heet <strong>server-side request forgery</strong> (SSRF). Het
        bekendste voorbeeld is het datalek bij de Amerikaanse bank Capital One in 2019. Volgens openbare analyses liep
        de aanval via een verkeerd ingestelde webapplicatiefirewall en de metadata-service, en werden gegevens van
        ongeveer honderd miljoen klanten buitgemaakt.</p>
        <h3>De verdediging</h3>
        <ul>
          <li><strong>IMDSv2 bij AWS</strong>: de nieuwere versie van de metadata-service vraagt eerst een sessietoken
          op met een <code>PUT</code>-verzoek, en verwacht dat token in een header bij elke volgende vraag. Een
          eenvoudige SSRF, die alleen een <code>GET</code> naar een URL laat doen, komt daar niet doorheen. Je kunt
          IMDSv2 per machine verplicht stellen.</li>
          <li><strong>Least privilege op de rol van de machine</strong>: als de gestolen gegevens alleen één container
          mogen lezen, is de schade beperkt.</li>
          <li><strong>Invoer valideren</strong> in de applicatie: alleen URL's naar toegestane domeinen ophalen, en
          interne en link-local-adressen weigeren.</li>
          <li><strong>Detectie</strong>: tijdelijke inloggegevens van een machinerol die ineens van buiten de cloud
          worden gebruikt, zijn verdacht. Ze horen alleen vanaf die machine te komen.</li>
        </ul>
        <p>Dit voorbeeld laat zien hoe de lagen van gedeelde verantwoordelijkheid samenkomen: de provider levert een
        veilige metadata-service, maar de klant moet de nieuwe versie aanzetten, de rol beperken en de applicatie
        veilig bouwen.</p>
      `,
      questions: [
        { q: 'Een aanvaller laat via SSRF de applicatie een GET doen naar het metadata-adres. Op de machine is alleen IMDSv2 toegestaan. Welke HTTP-methode had de aanvaller eerst moeten kunnen laten uitvoeren om toch bij de gegevens te komen?', answer: ['PUT'],
          hints: ['IMDSv2 werkt met een sessietoken.', 'Dat token wordt met een andere methode dan GET opgevraagd.', 'Een methode van drie letters.'],
          wrong: { 'GET': 'Een losse GET is precies wat IMDSv2 tegenhoudt.', 'POST': 'Het is een andere methode die ook data verstuurt.' },
          explain: 'PUT. Een simpele SSRF die alleen GET-verzoeken naar een opgegeven URL doet, kan geen token ophalen en dus geen gegevens lezen.' },
        { q: 'In een fictieve omgeving zijn tijdelijke inloggegevens van een machinerol 6 uur geldig. Ze werden om 09:10 uitgegeven en om 10:25 via SSRF gestolen. Hoeveel minuten kan de aanvaller ze nog gebruiken als niemand iets doet?', answer: ['285', '285 minuten'],
          hints: ['De geldigheid loopt vanaf de uitgifte, niet vanaf de diefstal.', 'Ze verlopen om 15:10.', 'Van 10:25 tot 15:10.'],
          wrong: { '360': 'Je rekent zes uur vanaf de diefstal. De klok liep al vanaf 09:10.', '75': 'Dat is de tijd tussen uitgifte en diefstal.' },
          explain: '4 uur en 45 minuten: 285 minuten. Tijdelijk is beter dan langlevend, maar tijdelijk is niet onschuldig. Detectie op gebruik buiten de machine blijft nodig.' },
      ],
    },

    {
      title: 'Taak 7: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Cloudvragen op examens als Security+ en CySA+ draaien meestal om drie dingen: wie is waarvoor
        verantwoordelijk, welke configuratie is fout, en wat is de eerste stap bij een incident. De afleiders zijn
        maatregelen die bij een ander servicemodel horen, of stappen die op zichzelf goed zijn maar te vroeg of te laat
        komen.</p>
        <h3>Zo pak je ze aan</h3>
        <ul>
          <li>Bepaal eerst het servicemodel uit het scenario. Een "beheerde database" is PaaS, een "virtuele machine"
          is IaaS, een "online kantoorpakket" is SaaS.</li>
          <li>Vraag je af wat er in elk model bij de klant blijft: gegevens, identiteiten en configuratie.</li>
          <li>Bij een incidentvraag wint inperken bijna altijd van onderzoeken, en onderzoeken van herbouwen.</li>
          <li>Bij een keuze tussen een langlevende sleutel en een rol met tijdelijke gegevens, kies je de rol.</li>
        </ul>
        <p>Let ook op woorden als "eerst", "beste" en "meest". Vaak zijn drie van de vier opties verdedigbaar, maar
        is er maar één die het probleem bij de bron aanpakt of die in de juiste fase van het incident valt. Een
        maatregel die de klant niet zelf kan nemen, zoals "de provider vragen het te repareren" bij een eigen
        configuratiefout, is bijna altijd een afleider.</p>
        <p>Warm op met het lab: zet de stappen na een gelekte sleutel in de goede volgorde. De vijf vragen eronder zijn
        zelf geschreven in examenstijl. Alle organisaties zijn fictief.</p>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Een toegangssleutel is uitgelekt via een openbare repository. Zet de stappen in de juiste volgorde.',
        items: [
          { id: 'a', label: 'Inperken: de gelekte sleutel deactiveren' },
          { id: 'b', label: 'Analyseren: in het auditlog alles opzoeken wat met de sleutel is gedaan' },
          { id: 'c', label: 'Uitroeien: door de aanvaller aangemaakte identiteiten, sleutels en machines verwijderen' },
          { id: 'd', label: 'Herstellen: de pipeline laten werken met tijdelijke inloggegevens uit een rol' },
          { id: 'e', label: 'Leren: evaluatie houden en een detectieregel toevoegen' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e'],
        explain: 'Eerst het lek dicht, dan de omvang bepalen, dan alles opruimen wat de aanvaller achterliet, dan duurzaam herstellen, en daarna leren.',
      },
      questions: [
        { q: 'Een fictieve gemeente gebruikt een beheerde databasedienst (PaaS). Er verschijnt een kwetsbaarheid in de databasesoftware zelf. Wie zorgt voor de patch?',
          options: ['De gemeente, want het zijn haar gegevens', 'De provider, want bij PaaS beheert die de databasesoftware', 'De leverancier van de applicatie die de database gebruikt', 'Niemand: een beheerde dienst is per definitie gepatcht'], answer: 1,
          wrong: { 0: 'De gegevens zijn van de gemeente, maar de software van het platform is bij PaaS de taak van de provider.', 2: 'De applicatie gebruikt de database, maar beheert de databasesoftware niet.', 3: 'Iemand moet de patch nog steeds uitrollen. Bij PaaS is dat de provider.' },
          explain: 'Bij PaaS beheert de provider het platform, inclusief de databasesoftware. De gemeente blijft verantwoordelijk voor toegang, configuratie en gegevens.' },
        { q: 'Een fictief webbureau ontdekt dat een opslagcontainer met klantcontracten voor iedereen leesbaar is. Wat is de beste eerste stap?',
          options: ['De container op privé zetten en daarna in de logs nagaan of er van buiten is gelezen', 'De container verwijderen', 'De provider vragen het lek te dichten', 'Alle bestanden versleutelen en de container openbaar laten'], answer: 0,
          wrong: { 1: 'Dan verdwijnen de bestanden en het bewijs van wie erbij kon.', 2: 'Het is een configuratiekeuze van de klant. De provider gaat daar niet over.', 3: 'Versleutelen in de container zelf helpt niet als iedereen kan lezen wat er staat; bovendien laat je het lek bestaan.' },
          explain: 'Eerst dicht, dan bepalen of er misbruik was. Daarna beoordeel je of het een meldplichtig datalek is.' },
        { q: 'Een fictieve webwinkel wil dat een applicatie op een virtuele machine bij een opslagcontainer kan, zonder dat er een sleutel in de code staat. Wat is de beste oplossing?',
          options: ['De sleutel in een omgevingsvariabele zetten', 'De sleutel versleuteld in de repository opslaan', 'Een rol of beheerde identiteit aan de machine koppelen die tijdelijke inloggegevens krijgt', 'De container openbaar maken, dan is geen sleutel nodig'], answer: 2,
          wrong: { 0: 'Beter dan in de code, maar het blijft een langlevende sleutel die kan lekken.', 1: 'Dan heb je een tweede geheim nodig om de eerste te ontsleutelen, en de sleutel blijft langlevend.', 3: 'Dan kan iedereen erbij. Dat is het probleem verplaatsen naar een groter probleem.' },
          explain: 'Een rol of beheerde identiteit geeft tijdelijke inloggegevens die vanzelf verlopen. Er is niets om te lekken in de code.' },
        { q: 'Een SOC-analist ziet in het cloud-auditlog dat een serviceaccount dat normaal alleen om 14:00 vanaf de pipeline werkt, om 02:00 vanaf een onbekend adres een nieuwe gebruiker aanmaakt. Welke techniek past hier het best?',
          options: ['Een aanvaller creëert persistentie met een eigen account', 'Een normale geplande taak die is verschoven', 'Een denial-of-service-aanval', 'Een fout in de klok van de logging'], answer: 0,
          wrong: { 1: 'Een geplande taak verandert niet van adres en maakt geen nieuwe gebruikers aan.', 2: 'Er wordt niets overbelast. Er wordt iets aangemaakt.', 3: 'Een klokfout verklaart het andere adres en de nieuwe gebruiker niet.' },
          explain: 'Een nieuwe identiteit door een werklast die dat nooit doet, vanaf een vreemd adres: klassieke persistentie (in ATT&CK: Create Account).' },
        { q: 'Na een incident wil een fictieve zorgaanbieder voorkomen dat een aanvaller de cloudlogging opnieuw kan uitzetten en de logs kan wissen. Wat helpt het meest?',
          options: ['De bewaartermijn van de logs verlengen', 'Logs doorsturen naar een aparte, afgeschermde omgeving waar beheerders van de productieomgeving geen schrijfrechten hebben', 'Elke dag handmatig controleren of de logging nog aanstaat', 'MFA instellen voor alle medewerkers'], answer: 1,
          wrong: { 0: 'Een langere termijn helpt niet als de aanvaller de logs kan verwijderen.', 2: 'Dan ontdek je het pas na een dag, en de logs van die dag zijn al weg.', 3: 'Goed, maar de aanvaller gebruikte een sleutel van een werklast. MFA beschermt die niet.' },
          explain: 'Scheiding: wie de productieomgeving overneemt, kan dan nog steeds niet bij de logs. Combineer dat met een alarm op elke poging om logging te stoppen.' },
      ],
    },
  ],

  terms: [
    { term: 'Gedeelde verantwoordelijkheid', def: 'Verdeling van beveiligingstaken tussen cloudprovider en klant; de provider beveiligt de cloud, de klant wat hij erin zet.' },
    { term: 'IaaS, PaaS, SaaS', def: 'Servicemodellen uit NIST SP 800-145: infrastructuur, platform of complete software als dienst.' },
    { term: 'Langlevende toegangssleutel', def: 'Sleutel-ID plus geheim dat geldig blijft tot het wordt ingetrokken; bij AWS herkenbaar aan het voorvoegsel AKIA.' },
    { term: 'Tijdelijke inloggegevens', def: 'Inloggegevens die een rol of beheerde identiteit krijgt en die na korte tijd vanzelf verlopen.' },
    { term: 'Objectopslag', def: 'Opslagdienst voor bestanden in containers, zoals S3 bij AWS of Blob Storage bij Azure.' },
    { term: 'Auditlog', def: 'Log van API-aanroepen in een cloudomgeving: wie deed wat, waarop, vanaf waar en met welk resultaat, zoals AWS CloudTrail of het Azure Activity Log.' },
    { term: 'Objectvergrendeling', def: 'Instelling die voorkomt dat opgeslagen objecten binnen een termijn worden gewijzigd of verwijderd; beschermt back-ups.' },
    { term: 'SSRF', def: 'Server-side request forgery: een aanvaller laat een server verzoeken doen naar adressen die hij zelf niet kan bereiken, zoals het metadata-endpoint.' },
  ],

  resources: [
    { title: 'NIST SP 800-145: The NIST Definition of Cloud Computing (2011)', url: 'https://csrc.nist.gov/pubs/sp/800/145/final' },
    { title: 'AWS: Shared Responsibility Model', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/' },
    { title: 'Microsoft Learn: Shared responsibility in the cloud', url: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility' },
  ],
});
