/* Room: Bedrijfscontinuïteit en herstel */
CS.registerRoom({
  id: 'bedrijfscontinuiteit-herstel',
  path: 'defensief',
  order: 16,
  title: 'Bedrijfscontinuïteit en herstel',
  icon: '🛟',
  difficulty: 'Gemiddeld',
  minutes: 80,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Wat moet het eerst weer draaien, hoeveel gegevens mag je kwijt, en lukt dat ook echt? Leid hersteldoelen af uit een business impact analysis, reken een back-upschema door tegen een ransomware-aanval, licht een continuïteitsplan door, bepaal de herstelvolgorde en leid een tabletop-oefening.',
  objectives: [
    'Een business impact analysis uitvoeren en daaruit per systeem een RTO en RPO afleiden (NIST SP 800-34 Rev. 1)',
    'Een back-upschema doorrekenen: welk gegevensverlies en welke hersteltijd levert het op bij een bepaald scenario',
    'Back-ups beoordelen op de 3-2-1-regel, onveranderbaarheid en scheiding van beheer',
    'Systemen in een verantwoorde herstelvolgorde zetten op basis van afhankelijkheden en hersteldoelen',
    'Een continuïteitsplan en een uitwijkvorm (hot, warm, cold) beoordelen tegen de hersteldoelen',
    'Een tabletop-oefening en crisiscommunicatie inrichten, inclusief meldplichten',
  ],
  tasks: [
    {
      title: 'Taak 1: Business impact analysis',
      tryFirst: true,
      intro: '<p>Het fictieve Vermeer Groothandel levert vers en gekoeld voedsel aan horeca en zorginstellingen. Je hebt met de afdelingshoofden gesproken: hoe lang kan elk proces stilliggen, hoeveel gegevens mogen ze kwijt, en op welke systemen leunen ze? De antwoorden staan in het lab. Leid daaruit af welke hersteldoelen de IT-systemen moeten halen.</p>',
      content: `
        <p>Bedrijfscontinuïteit begint niet bij techniek maar bij de vraag: wat doet deze organisatie, en wat gebeurt er
        als dat stopt? Die vraag beantwoord je met een <strong>business impact analysis</strong> (BIA). NIST SP 800-34
        Rev. 1, de Amerikaanse handleiding voor continuïteitsplanning van informatiesystemen, beschrijft drie stappen:</p>
        <ol>
          <li><strong>Processen en hun kritikaliteit bepalen.</strong> Per bedrijfsproces: wat is de schade als het
          stilvalt, en vanaf wanneer is die schade onaanvaardbaar? Denk aan omzet, contractboetes, veiligheid,
          wettelijke eisen en reputatie.</li>
          <li><strong>Benodigde middelen vaststellen.</strong> Welke systemen, gegevens, mensen en leveranciers heeft
          elk proces nodig?</li>
          <li><strong>Herstelprioriteiten bepalen.</strong> Welke systemen moeten het eerst terug, en hoe snel?</li>
        </ol>
        <h3>De drie getallen</h3>
        <table>
          <thead><tr><th>Begrip</th><th>Vraag</th><th>Geldt voor</th></tr></thead>
          <tbody>
            <tr><td><strong>MTD</strong> (<em>maximum tolerable downtime</em>; ISO 22301 zegt MTPD)</td><td>Hoe lang kan het proces stilliggen voordat de schade onaanvaardbaar is?</td><td>Het bedrijfsproces</td></tr>
            <tr><td><strong>RTO</strong> (<em>recovery time objective</em>)</td><td>Binnen hoeveel tijd moet het systeem weer werken?</td><td>Het systeem</td></tr>
            <tr><td><strong>RPO</strong> (<em>recovery point objective</em>)</td><td>Tot hoe ver terug in de tijd mag je gegevens kwijtraken?</td><td>De gegevens</td></tr>
          </tbody>
        </table>
        <p>De MTD komt van het bedrijf, de RTO en RPO zijn de doelen die IT daaruit afleidt. De RTO moet korter zijn dan
        de MTD, want na het technisch herstel moeten mensen nog controleren, achterstanden wegwerken en weer opstarten.</p>
        <h3>Van proces naar systeem</h3>
        <p>Eén systeem draagt vaak meerdere processen. Dan geldt het <strong>strengste</strong> doel van al die
        processen: als één proces na vier uur onaanvaardbare schade lijdt, helpt het niet dat een ander proces een
        week kan wachten. Hetzelfde voor gegevensverlies: de kleinste toegestane hoeveelheid wint.</p>
        <p>Vergeet de afhankelijkheden niet. Een applicatie die zonder domeincontroller of netwerk niet start, maakt de
        domeincontroller en het netwerk minstens zo kritiek als de applicatie zelf.</p>
        <div class="callout tip"><strong>Praktijk:</strong> afdelingshoofden zeggen bij de eerste vraag vaak "alles moet
        meteen terug". Vraag daarom niet "hoe snel wil je het terug?", maar "wat gebeurt er na een uur, na een dag, na
        een week?". Dan komen de echte grenzen boven, en kun je ook vragen wat de kosten zijn van een kortere RTO.</div>
      `,
      lab: {
        type: 'logs',
        title: 'bia-vermeer-2026-10.txt',
        lines: `# BIA Vermeer Groothandel (fictief), interviews oktober 2026
# PROCESSEN
proces=Orderintake         eigenaar=Verkoop      MTD=8 uur     max-gegevensverlies=15 minuten  systemen=ERP, webshop, telefonie (SaaS)
proces=Uitlevering         eigenaar=Logistiek    MTD=12 uur    max-gegevensverlies=1 uur       systemen=ERP, WMS, handscanners
proces=Koelcelbewaking     eigenaar=Kwaliteit    MTD=30 minuten max-gegevensverlies=0 (doorlopend) systemen=koelbewakingsserver kb01, temperatuursensoren
proces=Facturatie          eigenaar=Financien    MTD=5 werkdagen max-gegevensverlies=1 werkdag systemen=ERP
proces=Inkoop              eigenaar=Inkoop       MTD=2 werkdagen max-gegevensverlies=4 uur      systemen=ERP, mail
proces=Salarisadministratie eigenaar=HR          MTD=10 werkdagen (loonrun op de 23e) max-gegevensverlies=1 werkdag systemen=salarisdienst (SaaS)
proces=Marketingwebsite    eigenaar=Marketing    MTD=7 dagen   max-gegevensverlies=1 week      systemen=website (extern gehost)
# AFHANKELIJKHEDEN VAN SYSTEMEN
ERP          draait op erp-app01 + erp-db01, aanmelding via domeincontroller dc01
WMS          leest en schrijft orders in het ERP
webshop      zet orders in het ERP
kb01         werkt met lokale accounts, geen domein; alarmering via mail en sms-gateway
mail         SaaS, aanmelding via dc01 (federatie)
# OPMERKINGEN UIT DE INTERVIEWS
Kwaliteit: "Zonder bewaking mogen we gekoelde producten niet uitleveren. Na een half uur zonder registratie moeten we de partij als onzeker behandelen."
Verkoop: "Na een werkdag zonder orders bestellen de grote zorgklanten bij de concurrent."`,
      },
      questions: [
        { q: 'Welke RTO moet het ERP minimaal halen, op basis van de processen die ervan afhangen? (in uren)', answer: ['8', '8 uur', 'acht'],
          hints: ['Zoek alle processen met ERP bij hun systemen.', 'Neem van die processen de kortste MTD.', 'Orderintake, uitlevering, facturatie en inkoop: welke is het kortst?'],
          wrong: { '12': 'Dat is de MTD van uitlevering. Orderintake hangt ook aan het ERP en verdraagt minder.', '24': 'Er staat geen proces met een MTD van 24 uur in de BIA.' },
          why: 'Wie per systeem één eigenaar vraagt "hoe snel wil je het terug?", krijgt het antwoord van één proces. De BIA dwingt je alle processen op één systeem naast elkaar te leggen.',
          explain: 'Orderintake heeft een MTD van 8 uur en hangt aan het ERP. De RTO van het ERP moet daarom korter dan 8 uur zijn, met ruimte voor controle en opstarten.' },
        { q: 'Welke RPO geldt voor de ERP-gegevens? (in minuten)', answer: ['15', '15 minuten'],
          hints: ['Kijk naar max-gegevensverlies bij de processen die het ERP gebruiken.', 'De kleinste waarde wint.', 'Orderintake.'],
          wrong: { '60': 'Dat is de grens van uitlevering. Orderintake mag minder kwijt.', '240': 'Dat is inkoop. Kijk naar het strengste proces.' },
          explain: '15 minuten, van orderintake. Een back-up die eens per nacht wordt gemaakt, haalt dat nooit.' },
        { q: 'Welk systeem heeft volgens de BIA de kortste RTO nodig?', answer: ['kb01', 'koelbewakingsserver', 'koelbewaking'],
          hints: ['Zoek het proces met de kortste MTD.', 'Het gaat om minuten, niet om uren.', 'Het proces van de afdeling Kwaliteit.'],
          wrong: { 'erp': 'Het ERP draagt de meeste processen, maar één proces verdraagt veel minder dan 8 uur.', 'dc01': 'De domeincontroller is belangrijk voor het ERP en de mail, maar het strengste proces hangt er niet van af.' },
          explain: 'kb01: koelcelbewaking verdraagt 30 minuten. En omdat kb01 zonder domein werkt, hoeft hij bij herstel niet te wachten op de domeincontroller. Dat komt in taak 4 terug.' },
        { q: 'Waarom moet de RTO van een systeem korter zijn dan de MTD van het proces?', options: ['Na het technisch herstel zijn nog controle, achterstanden en opstarten nodig voordat het proces echt weer loopt', 'Omdat de RTO in uren wordt gemeten en de MTD in dagen', 'Omdat de RPO anders niet gehaald kan worden', 'Dat hoeft niet: RTO en MTD zijn twee namen voor hetzelfde'], answer: 0,
          wrong: { 1: 'Beide zijn tijdsduren in dezelfde eenheid. In de BIA zie je MTD\'s van minuten tot dagen.', 2: 'RPO gaat over gegevensverlies, niet over hersteltijd. Die twee zijn onafhankelijk.', 3: 'De MTD hoort bij het proces en komt van het bedrijf, de RTO hoort bij het systeem.' },
          explain: 'Een ERP dat om 22:00 weer draait, betekent niet dat er om 22:00 orders binnenkomen. Er moet gecontroleerd en opgestart worden.' },
      ],
    },

    {
      title: 'Taak 2: RTO en RPO doorrekenen',
      tryFirst: true,
      intro: '<p>Op woensdag 11 november 2026 om 14:52 versleutelt ransomware de ERP-server én de back-upserver van Vermeer. In het lab staat het back-upschema van de ERP-database en de uitkomst van de laatste hersteltest. Reken uit hoeveel gegevens Vermeer kwijt is en hoe lang het herstel duurt, en vergelijk dat met de doelen uit taak 1.</p>',
      content: `
        <p>Een back-upschema bepaalt je werkelijke RPO, een hersteltest je werkelijke RTO. Wat in het beleid staat, is
        een wens. Wat de techniek kan, is de werkelijkheid.</p>
        <h3>Soorten back-ups</h3>
        <ul>
          <li><strong>Volledig</strong> (<em>full</em>): alles. Groot en traag, maar herstellen is eenvoudig.</li>
          <li><strong>Incrementeel</strong>: alleen wat is veranderd sinds de vorige back-up, van welk soort ook. Klein en
          snel, maar bij herstel heb je de laatste volledige plus alle incrementele daarna nodig.</li>
          <li><strong>Differentieel</strong>: alles wat is veranderd sinds de laatste volledige back-up. Groeit elke dag,
          maar bij herstel heb je alleen de volledige plus de laatste differentiële nodig.</li>
          <li><strong>Transactielog-back-up</strong>: bij databases kun je daarnaast het transactielog vaak back-uppen,
          bijvoorbeeld elk kwartier. Daarmee kun je herstellen tot vlak voor het incident.</li>
        </ul>
        <h3>Gegevensverlies uitrekenen</h3>
        <p>Het verlies is de tijd tussen het laatste <em>bruikbare</em> herstelpunt en het moment van het incident. Het
        woord bruikbaar is belangrijk: een back-up die op dezelfde server staat als het systeem, of op een server die
        mee versleuteld is, telt niet. Kijk dus per herstelpunt ook <em>waar</em> het staat.</p>
        <h3>Hersteltijd uitrekenen</h3>
        <p>Herstel bestaat uit stappen die je achter elkaar optelt, tenzij ze echt parallel kunnen:</p>
        <ul>
          <li>gegevens ophalen (hoeveel data, met welke snelheid);</li>
          <li>terugzetten en opstarten (uit een hersteltest);</li>
          <li>controleren door de eigenaar van de applicatie.</li>
        </ul>
        <p>Let op eenheden: 1 TB is 1.000.000 MB, en een snelheid in MB per seconde moet je delen door 60 voor minuten.
        Daarbovenop komt de tijd voordat herstel begint: ontdekken, besluiten, een schone omgeving klaarzetten. Die tijd
        staat in geen enkele hersteltest.</p>
        <div class="callout warn"><strong>Hersteltest:</strong> een test die alleen controleert of de back-uptaak
        "geslaagd" meldt, zegt niets over herstellen. Meet de echte tijd van een volledig herstel, uit de kopie die je
        bij een ramp ook echt zou gebruiken.</div>
      `,
      lab: {
        type: 'logs',
        title: 'back-upschema-erp-db01.txt',
        lines: `# BACK-UPSCHEMA ERP-database erp-db01 (1,2 TB), Vermeer Groothandel (fictief)
volledig        zondag 01:00                       doel=bak01 (on-site)
incrementeel    maandag t/m zaterdag 01:00         doel=bak01 (on-site)
transactielog   elk kwartier (:00 :15 :30 :45), 06:00-22:00   doel=bak01 (on-site)
kopie offsite   dagelijks 05:00: de back-up van 01:00 gaat naar objectopslag offsite (onveranderbaar, 14 dagen)
# HERSTELTEST 2026-09-18 (uit bak01)
volledig herstel erp-db01 inclusief incrementeel: 5 uur 40 minuten
controle door applicatiebeheer na herstel: 1 uur
# GEMETEN DOORVOER OFFSITE
download uit objectopslag naar herstelomgeving: 250 MB/s
# OVERIGE HERSTELTIJDEN (uit hersteltest)
dc01 (domeincontroller) volledig herstel en controle vanaf offsite: 45 minuten
# WERKAFSPRAAK HERSTELPLAN
herstel gebeurt stap voor stap: één herstelteam, één verbinding naar de offsite opslag; een stap begint pas als de vorige klaar is
# INCIDENT
2026-11-11 14:52 erp-app01, erp-db01 en bak01 versleuteld; objectopslag offsite niet aangetast`,
      },
      questions: [
        { q: 'Stel dat bak01 níet was versleuteld. Hoeveel minuten aan ERP-gegevens was Vermeer dan maximaal kwijt?', answer: ['7', '7 minuten', 'zeven'],
          hints: ['Zoek de back-up met de hoogste frequentie.', 'De laatste transactielog-back-up vóór 14:52.', '14:45 tot 14:52.'],
          wrong: { '15': 'Dat is het interval. Het laatste herstelpunt was 14:45, zeven minuten voor het incident.', '52': 'De back-ups gaan per kwartier, niet per uur.' },
          explain: 'Laatste log-back-up 14:45, incident 14:52: zeven minuten. Binnen de RPO van 15 minuten. Op papier klopt het schema dus.' },
        { q: 'Maar bak01 is wel versleuteld. Hoeveel gegevens is Vermeer nu kwijt? (uren en minuten, bijvoorbeeld 2:30)', answer: ['13:52', '13 uur 52 minuten', '13u52', '13.52', '832'],
          hints: ['Welke kopieën staan niet op bak01?', 'Alleen de offsite kopie is over. Van welk tijdstip is de inhoud?', 'De kopie van 05:00 bevat de back-up van 01:00. Reken van 01:00 tot 14:52.'],
          wrong: { '9:52': 'Je rekent vanaf 05:00, het moment van kopiëren. De inhoud is de back-up van 01:00.', '0:07': 'De log-back-ups stonden op bak01. Die zijn mee versleuteld.' },
          why: 'Een RPO die alleen wordt gehaald zolang de back-upserver heel is, wordt bij ransomware niet gehaald. Juist dan heb je hem nodig. Toets je RPO daarom tegen het scenario waarin alles on-site weg is.',
          explain: 'Van 01:00 tot 14:52: 13 uur en 52 minuten, ruim 50 keer de RPO van 15 minuten. Alle orders van woensdag moeten opnieuw worden ingevoerd uit mail, telefoonnotities en de webshop.' },
        { q: 'Hoeveel minuten kost het ophalen van de ERP-database uit de offsite opslag?', answer: ['80', '80 minuten'],
          hints: ['Grootte gedeeld door snelheid.', '1,2 TB is 1.200.000 MB.', '1.200.000 / 250 = 4.800 seconden.'],
          wrong: { '4800': 'Dat zijn seconden. Deel door 60.', '8': 'Controleer de eenheden: 1,2 TB is 1.200.000 MB, niet 120.000.' },
          explain: '1.200.000 MB / 250 MB/s = 4.800 s = 80 minuten. Plus 5 uur 40 herstel en 1 uur controle is de ERP-database 8 uur na de start terug.' },
        { q: 'Welke aanpassing laat het ERP de RPO van 15 minuten ook halen als bak01 verloren gaat?', options: ['De transactielog-back-ups elk kwartier ook naar de onveranderbare offsite opslag kopiëren', 'De volledige back-up van zondag naar woensdag verplaatsen', 'Het transactielog elke vijf minuten op bak01 zetten', 'De offsite kopie langer bewaren, bijvoorbeeld 90 dagen'], answer: 0,
          wrong: { 1: 'Dan verschuift alleen het moment van de grote back-up. Het herstelpunt offsite blijft één keer per dag.', 2: 'Vaker naar bak01 helpt niet als bak01 zelf het slachtoffer is.', 3: 'Langere bewaring helpt tegen een aanvaller die al lang binnen zat, maar niet tegen het verlies van de laatste uren.' },
          explain: 'De RPO wordt bepaald door het meest recente herstelpunt dat de ramp overleeft. Dat moet dus net zo vaak buiten bereik worden gebracht.' },
      ],
    },

    {
      title: 'Taak 3: De 3-2-1-regel en onveranderbare back-ups',
      tryFirst: true,
      intro: '<p>Na het incident wil de directie weten waarom de back-upserver mee versleuteld kon worden, en welke systemen nog meer risico lopen. In het lab staat de back-upinventaris met de configuratie van bak01. Beoordeel elk systeem tegen de 3-2-1-regel, en zoek de instelling die de aanvaller bij de back-ups bracht.</p>',
      content: `
        <p>De <strong>3-2-1-regel</strong> ken je misschien uit de room <em>Veilig thuis en op het werk</em>: drie
        kopieën, op twee soorten media of plekken, waarvan één offsite. In een organisatie komt daar bij dat de
        aanvaller niet een losse schijf maar een beheerder met domeinrechten kan zijn. Daarom kijk je ook naar
        <strong>wie</strong> bij de back-ups kan.</p>
        <h3>Wat telt als een kopie</h3>
        <ul>
          <li>Een kopie telt alleen als ze <strong>onafhankelijk</strong> faalt van het origineel. Snapshots op hetzelfde
          volume of dezelfde opslag zijn handig voor snel terugzetten, maar gaan mee verloren als dat volume of het
          beheeraccount ervan wordt geraakt.</li>
          <li>Synchronisatie en replicatie zijn geen back-up: een versleutelde of gewiste map wordt keurig mee
          gesynchroniseerd.</li>
          <li>Bij SaaS zorgt de leverancier voor beschikbaarheid van de dienst, maar dat betekent niet dat jij een
          gewiste mailbox van drie maanden terug kunt herstellen. Lees de voorwaarden en regel zo nodig een eigen
          back-up.</li>
        </ul>
        <h3>Onveranderbaar en offline</h3>
        <p>Een <strong>onveranderbare</strong> (<em>immutable</em>) back-up kan gedurende een ingestelde bewaartermijn
        niet worden gewijzigd of gewist, ook niet door een beheerder. Bij objectopslag heet dat vaak <em>object
        lock</em> of WORM (<em>write once, read many</em>). Sommige producten kennen een strenge stand waarin zelfs de
        hoofdbeheerder de termijn niet kan inkorten; controleer welke stand je gebruikt. Een <strong>offline</strong>
        kopie (een tape in een kluis, een losgekoppelde schijf) is op een andere manier buiten bereik: er is geen
        netwerkverbinding naar toe. In de praktijk kom je ook de uitbreiding <strong>3-2-1-1-0</strong> tegen: één
        kopie offline of onveranderbaar, en nul fouten bij de controle van het herstel.</p>
        <h3>Scheiding van beheer</h3>
        <p>Ransomwaregroepen zoeken gericht naar de back-upomgeving, om herstel onmogelijk te maken en de druk om te
        betalen op te voeren. Wat helpt:</p>
        <ul>
          <li>De back-upserver <strong>niet</strong> lid van het gewone domein, met eigen beheeraccounts die niet in
          Domain Admins zitten.</li>
          <li>MFA op de beheerconsole van de back-upsoftware en op de offsite opslag.</li>
          <li>Een bewaartermijn die langer is dan de tijd die een aanvaller vaak binnen zit voordat hij toeslaat. Die tijd
          verschilt sterk per incident; dagen tot weken is geen uitzondering.</li>
          <li>Versleutelde back-ups, met de sleutels op een andere plek dan de back-ups zelf.</li>
        </ul>
      `,
      lab: {
        type: 'logs',
        title: 'back-upinventaris-vermeer-2026-11-12.txt',
        lines: `# BACK-UPINVENTARIS Vermeer Groothandel (fictief)
systeem=ERP-db        origineel=erp-db01 (SAN)   kopie-2=bak01 (schijf, on-site)          kopie-3=objectopslag offsite, object lock 14 dagen (strenge stand)
systeem=fileserver    origineel=fs01             kopie-2=snapshots op fs01 (zelfde volume) kopie-3=bak01 (schijf, on-site)
systeem=koelbewaking  origineel=kb01             kopie-2=bak01 (schijf, on-site)          kopie-3=geen
systeem=mail          origineel=SaaS-mailbox     kopie-2=geen                             kopie-3=geen (prullenbak van de dienst: 30 dagen)
systeem=dc01          origineel=dc01             kopie-2=bak01 (schijf, on-site)          kopie-3=objectopslag offsite, object lock 14 dagen (strenge stand)
# CONFIGURATIE bak01
domeinlid=ja (VERMEER)
beheeraccount=VERMEER\\adm-backup  groepen=Domain Admins, Backup Operators
console-mfa=nee
versleuteling-in-rust=aan  sleutel=opgeslagen op bak01
# CONFIGURATIE OFFSITE OBJECTOPSLAG
beheeraccount=backup-offsite@vermeer.nm.lab  mfa=ja  apart van domein=ja
# HERSTELTESTS
2026-09-18 erp-db01 volledig herstel uit bak01: geslaagd, 5u40m
2024-02-12 fs01 herstel van één map uit bak01: geslaagd
kb01: nooit getest
dc01: herstel uit offsite getest 2026-09-18: geslaagd, 45m`,
      },
      questions: [
        { q: 'Hoeveel systemen in de inventaris voldoen volledig aan de 3-2-1-regel?', answer: ['2', 'twee'],
          hints: ['Per systeem: drie onafhankelijke kopieën, twee soorten opslag, één offsite.', 'Snapshots op hetzelfde volume tellen niet als aparte kopie.', 'Kijk welke systemen een offsite kopie hebben.'],
          wrong: { '3': 'De fileserver lijkt drie kopieën te hebben, maar de snapshots staan op hetzelfde volume en geen enkele kopie is offsite.', '1': 'Ook dc01 heeft een kopie op bak01 en een onveranderbare kopie offsite.' },
          explain: 'ERP-db en dc01. De fileserver heeft geen offsite kopie en de snapshots zijn niet onafhankelijk, kb01 heeft maar één kopie, en mail heeft alleen de prullenbak van de dienst.' },
        { q: 'Welke instelling van bak01 gaf een aanvaller met beheerrechten in het domein direct toegang tot de back-ups?', options: ['bak01 is domeinlid en het beheeraccount zit in Domain Admins', 'De back-ups op bak01 zijn versleuteld', 'De offsite opslag heeft een apart account met MFA', 'De ERP-database is 1,2 TB groot'], answer: 0,
          wrong: { 1: 'Versleuteling in rust beschermt tegen diefstal van schijven, niet tegen een aanvaller die als beheerder inlogt. Wel is de plek van de sleutel een tweede probleem.', 2: 'Dat is juist waarom de offsite kopie overleefde.', 3: 'De grootte bepaalt de hersteltijd, niet wie erbij kan.' },
          why: 'De offsite opslag overleefde omdat hij een eigen account met MFA had, buiten het domein. Hetzelfde verschil tussen bak01 en de offsite opslag is de hele les van deze taak.',
          explain: 'Wie Domain Admin is, is op een domeinlid beheerder, en adm-backup zit zelf ook in Domain Admins. Haal bak01 uit het domein, geef hem eigen accounts met MFA.' },
        { q: 'Welk systeem heeft na het incident geen enkele bruikbare back-up meer?', answer: ['kb01', 'koelbewaking', 'koelbewakingsserver'],
          hints: ['Welke kopieën gingen mee met bak01?', 'Zoek een systeem waarvan alle kopieën op bak01 stonden.', 'Het systeem met de kortste RTO uit taak 1.'],
          wrong: { 'mail': 'De mailbox zelf draait nog bij de SaaS-leverancier en is niet versleuteld. Wel ontbreekt een eigen back-up.', 'fs01': 'Voor de fileserver zijn er nog snapshots, als fs01 zelf niet is aangetast. Onafhankelijk zijn ze niet, maar in dit incident bestaan ze nog.' },
          explain: 'kb01 had alleen een kopie op bak01, en die herstel is nooit getest. Uitgerekend het proces met een MTD van 30 minuten. Gelukkig is kb01 zelf niet geraakt; in taak 4 zie je hoe Vermeer het toch veilig stelt.' },
      ],
    },

    {
      title: 'Taak 4: De herstelvolgorde',
      tryFirst: true,
      intro: '<p>Het netwerk van Vermeer is opnieuw ingericht en schoon. Nu moeten de systemen terug, één voor één, in een geïsoleerde herstelomgeving. In het lab staan acht stappen met hun afhankelijkheden. Zet ze in volgorde: eerst wat andere systemen nodig hebben, en bij gelijke afhankelijkheid wat de kortste MTD heeft.</p>',
      content: `
        <p>Na een grote verstoring wil iedereen zijn eigen systeem als eerste terug. De herstelvolgorde beslis je daarom
        niet tijdens de crisis, maar vooraf, in het herstelplan. Twee principes bepalen haar.</p>
        <h3>1. Afhankelijkheden eerst</h3>
        <p>Een systeem kan pas werken als alles waar het op leunt al werkt. Een gebruikelijke laagopbouw:</p>
        <ol>
          <li>Netwerk, firewalls en externe verbindingen.</li>
          <li>Identiteit en naamgeving: domeincontrollers, DNS, de identity provider.</li>
          <li>Gegevens: databases en opslag.</li>
          <li>Applicaties die op die gegevens draaien.</li>
          <li>Systemen die weer op die applicaties leunen, en daarna de werkplekken.</li>
        </ol>
        <p>Een systeem dat buiten deze lagen valt, bijvoorbeeld met eigen lokale accounts, hoeft niet op de lagen te
        wachten waar het niet van afhangt.</p>
        <h3>2. Binnen een laag: de kortste MTD</h3>
        <p>Staan twee systemen op dezelfde laag, dan gaat het systeem met het strengste hersteldoel uit de BIA voor.</p>
        <h3>Schoon herstellen na ransomware</h3>
        <p>Na een brand zet je de back-up terug en ben je klaar. Na een aanval moet je er zeker van zijn dat je de
        aanvaller niet terugzet. Daarom:</p>
        <ul>
          <li>Herstel in een <strong>geïsoleerde omgeving</strong>, niet in het netwerk waar de aanvaller nog kan zitten.</li>
          <li>Kies een herstelpunt van vóór de inbraak als dat kan, en controleer herstelde systemen op achtergelaten
          accounts, geplande taken en andere vormen van persistentie.</li>
          <li>Herbouw de identiteitslaag zorgvuldig: wachtwoorden van beheer- en serviceaccounts vervangen, en in
          Active Directory ook het wachtwoord van het krbtgt-account (twee keer, met tussenpozen).</li>
          <li>Leg eerst forensisch bewijs vast van de getroffen systemen (zie de room <em>Ransomware-respons</em>).
          Herstellen over het bewijs heen maakt het onderzoek onmogelijk.</li>
        </ul>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de herstelstappen van Vermeer in volgorde. Het netwerk is al schoon; begin bij de eerste stap daarna.',
        items: [
          { id: 'n', label: 'Firewalls en verbinding naar de offsite opslag controleren en vrijgeven (alles hangt hiervan af)' },
          { id: 'k', label: 'kb01 koelbewaking veiligstellen en vrijgeven (lokale accounts, geen domein nodig; MTD 30 minuten)' },
          { id: 'd', label: 'dc01 domeincontroller met DNS herstellen, beheerwachtwoorden en krbtgt vervangen' },
          { id: 'b', label: 'erp-db01 ERP-database herstellen (aanmelding via dc01)' },
          { id: 'a', label: 'erp-app01 ERP-applicatie herstellen (heeft de database nodig)' },
          { id: 'w', label: 'Webshop weer aan het ERP koppelen (orderintake, MTD 8 uur)' },
          { id: 'm', label: 'WMS en handscanners weer aan het ERP koppelen (uitlevering, MTD 12 uur)' },
          { id: 'p', label: 'Kantoorwerkplekken opnieuw uitrollen vanaf een schoon image' },
        ],
        correct: ['n', 'k', 'd', 'b', 'a', 'w', 'm', 'p'],
        flag: 'NM{eerst_wat_alles_draagt}',
        explain: 'Netwerk eerst. kb01 kan meteen daarna, omdat hij geen domein nodig heeft en de kortste MTD heeft. Dan identiteit, gegevens en applicatie. Webshop gaat voor WMS vanwege de kortere MTD. Werkplekken als laatste.',
      },
      questions: [
        { q: 'Zet de stappen in de goede volgorde. Welke vlag krijg je?', answer: ['NM{eerst_wat_alles_draagt}'],
          hints: ['Kijk bij elke stap waar hij van afhangt.', 'Eén systeem hangt niet af van het domein en heeft de kortste MTD van allemaal.', 'Netwerk, kb01, dc01, database, applicatie, dan de twee koppelingen op volgorde van MTD, dan werkplekken.'],
          explain: 'Afhankelijkheden bepalen de grove volgorde, de BIA de fijne.' },
        { q: 'Waarom komt kb01 al vóór de domeincontroller?', options: ['Hij heeft het domein niet nodig en zijn proces verdraagt de kortste stilstand', 'Omdat de domeincontroller pas mag terugkomen als alle servers schoon zijn', 'Omdat kb01 de kleinste server is en dus het snelst klaar', 'Omdat kb01 de back-ups van dc01 bevat'], answer: 0,
          wrong: { 1: 'Veel servers hebben de domeincontroller juist nodig om te starten. Hij komt vroeg, alleen niet vóór een systeem dat er niet van afhangt.', 2: 'Hersteltijd per systeem is een overweging, maar de reden hier is de afhankelijkheid en de MTD.', 3: 'kb01 bevat geen back-ups van andere systemen.' },
          explain: 'kb01 werkt met lokale accounts. Wachten op dc01 zou de MTD van 30 minuten nutteloos overschrijden.' },
        { q: 'Een beheerder wil de herstelde ERP-database meteen terugzetten in het oude servernetwerk, "dan zijn we sneller". Wat is het belangrijkste bezwaar?', options: ['Als de aanvaller daar nog toegang heeft, kan hij de herstelde systemen opnieuw versleutelen', 'De database is te groot voor het oude netwerk', 'Het oude netwerk heeft andere IP-adressen', 'Dan verloopt het object lock van de offsite kopie'], answer: 0,
          wrong: { 1: 'De grootte heeft niets met het netwerk te maken.', 2: 'Adressen zijn een praktisch punt, geen veiligheidsbezwaar, en vaak juist gelijk.', 3: 'Het object lock hangt aan de opslag en de termijn, niet aan waar je terugzet.' },
          explain: 'Zolang niet vaststaat hoe de aanvaller binnenkwam en of hij nog binnen is, herstel je in een geïsoleerde omgeving en sluit je eerst de toegangsweg.' },
      ],
    },

    {
      title: 'Taak 5: Het continuïteitsplan en de uitwijk',
      tryFirst: true,
      intro: '<p>Vermeer had een continuïteitsplan. Het crisisteam probeerde het woensdag te gebruiken, en dat lukte niet. In het lab staan de belangrijkste onderdelen van dat plan, naast wat er sindsdien is veranderd. Zoek wat het plan onbruikbaar maakte, en beoordeel de afgesproken uitwijk.</p>',
      content: `
        <p>NIST SP 800-34 Rev. 1 beschrijft zeven stappen voor continuïteitsplanning: beleid vaststellen, de BIA
        uitvoeren, preventieve maatregelen kiezen, herstelstrategieën ontwikkelen, het plan schrijven, het plan testen
        en oefenen, en het plan onderhouden. De internationale norm voor een managementsysteem voor
        bedrijfscontinuïteit is ISO 22301.</p>
        <h3>Welke plannen er zijn</h3>
        <p>De termen lopen in de praktijk door elkaar. NIST onderscheidt onder meer:</p>
        <ul>
          <li>het <strong>bedrijfscontinuïteitsplan</strong> (BCP): hoe de bedrijfsprocessen doorgaan tijdens en na
          een verstoring, ook met noodprocedures zonder IT;</li>
          <li>het <strong>disaster recovery plan</strong> (DRP): hoe je IT na een grote verstoring herstelt, vaak op een
          andere locatie;</li>
          <li>het <strong>incidentresponsplan</strong>: hoe je een cyberincident onderzoekt en indamt (zie de room
          <em>Incident response</em>);</li>
          <li>het <strong>crisiscommunicatieplan</strong>: wie wat tegen wie zegt.</li>
        </ul>
        <h3>Wat er in een bruikbaar plan staat</h3>
        <ul>
          <li>Wanneer het plan wordt geactiveerd, en door wie.</li>
          <li>Rollen met namen én plaatsvervangers.</li>
          <li>Contactgegevens die werken als de eigen systemen plat liggen.</li>
          <li>Noodprocedures per kritiek proces, hersteldoelen en de herstelvolgorde.</li>
          <li>Een versie en een datum, en een eigenaar die het bijhoudt.</li>
        </ul>
        <p>Het plan moet beschikbaar zijn als de organisatie dat niet is: op papier, en op een plek buiten de eigen
        infrastructuur.</p>
        <h3>Uitwijk</h3>
        <table>
          <thead><tr><th>Vorm</th><th>Wat staat er klaar</th><th>Tijd tot draaien</th><th>Kosten</th></tr></thead>
          <tbody>
            <tr><td><strong>Hot site</strong></td><td>Volledige infrastructuur met actuele gegevens, vaak gerepliceerd</td><td>Minuten tot uren</td><td>Hoog</td></tr>
            <tr><td><strong>Warm site</strong></td><td>Hardware en verbindingen, gegevens moeten nog worden teruggezet</td><td>Uren tot dagen</td><td>Middel</td></tr>
            <tr><td><strong>Cold site</strong></td><td>Ruimte, stroom en koeling; hardware moet nog komen</td><td>Dagen tot weken</td><td>Laag</td></tr>
          </tbody>
        </table>
        <p>Daarnaast bestaan wederzijdse afspraken met een andere organisatie, mobiele uitwijk, en herstel in de cloud,
        waarbij je pas betaalt voor rekenkracht als je hem gebruikt. Kies per systeem: de uitwijk moet de RTO halen, en
        een duurdere uitwijk dan nodig is geld dat je niet aan iets anders uitgeeft.</p>
      `,
      lab: {
        type: 'logs',
        title: 'bcp-vermeer-v1.3-uittreksel.txt',
        lines: `# CONTINUITEITSPLAN Vermeer Groothandel, versie 1.3, vastgesteld 2023-03-14 (fictief)
opslag: \\\\fs01\\directie\\continuiteit\\BCP-v1.3.docx (enige exemplaar)
activering: door de leider crisisteam, na advies van het hoofd ICT
leider crisisteam: J. Pauw (financieel directeur)   plaatsvervanger: geen
hoofd ICT: R. Dekker   plaatsvervanger: S. Aydin
contactlijst: zie het adresboek in de mail; vaste toestelnummers via de telefooncentrale op kantoor
noodprocedure orderintake: orders op papier, invoer achteraf
noodprocedure koelcelbewaking: niet beschreven
uitwijk ICT: koude uitwijk, lege hal Logistiekpark Oost; servers bestellen bij leverancier, levertijd circa 10 werkdagen
hersteldoelen: niet opgenomen
laatste oefening: geen
# WIJZIGINGEN SINDS 2023 (bron: HR en ICT)
2025-06-30 J. Pauw uit dienst; opvolger financieel directeur: M. Hoekstra
2024-09-01 telefooncentrale vervangen door telefonie als SaaS, aanmelding via het domein
2026-10 BIA uitgevoerd: MTD orderintake 8 uur, MTD koelcelbewaking 30 minuten`,
      },
      questions: [
        { q: 'Op welke server stond het enige exemplaar van het plan?', answer: ['fs01'],
          hints: ['Kijk naar de regel opslag.', 'Het is een netwerkpad.', 'De servernaam staat direct na de twee backslashes.'],
          wrong: { 'bak01': 'Daar stonden de back-ups. Het plan stond op een andere server, die ook onbereikbaar was.' },
          why: 'Een plan dat op de getroffen infrastructuur staat, is weg op het moment dat je het nodig hebt. Het is een van de meest voorkomende en meest vermijdbare fouten.',
          explain: 'fs01, de fileserver. Leg het plan ook op papier bij de leden van het crisisteam en op een plek buiten de eigen omgeving.' },
        { q: 'Hoeveel onderdelen van het plan werkten woensdag niet omdat ze afhingen van de eigen IT of het domein? Tel: de opslag van het plan, de contactlijst en de telefoonnummers.', answer: ['3', 'drie'],
          hints: ['Loop de drie genoemde onderdelen langs en kijk waar ze van afhangen.', 'Het adresboek zit in de mail, en de mail meldt aan via het domein.', 'De telefonie meldt sinds 2024 ook aan via het domein.'],
          wrong: { '2': 'Ook de telefoonnummers werkten niet: de telefonie hangt sinds 2024 aan het domein.', '1': 'Niet alleen het plan zelf. Ook de contactlijst en de telefonie leunden op de eigen omgeving.' },
          explain: 'Alle drie. Het crisisteam kon het plan niet openen, niet in het adresboek kijken en niet via de vaste toestellen bellen. Een papieren lijst met mobiele nummers had dat opgelost.' },
        { q: 'Past de afgesproken uitwijk bij de hersteldoelen uit de BIA?', options: ['Nee: een koude uitwijk met tien werkdagen levertijd haalt een MTD van 8 uur voor orderintake nooit; voor het ERP is minstens een warme uitwijk of herstel in de cloud nodig', 'Ja: zolang er een uitwijklocatie is, voldoet het plan', 'Nee: voor alle systemen is een hot site nodig', 'Ja: de noodprocedure op papier vangt de tien werkdagen op'], answer: 0,
          wrong: { 1: 'Een uitwijk die pas na weken draait, voldoet alleen voor systemen met een MTD van weken.', 2: 'Voor facturatie (MTD 5 werkdagen) of de marketingwebsite is een hot site verspilling. Kies per systeem.', 3: 'Orders op papier helpen een paar uur, niet tien werkdagen, en voor de koelcel is niet eens een noodprocedure beschreven.' },
          explain: 'Het plan dateert van vóór de BIA en heeft geen hersteldoelen. Stel per systeem de uitwijk af op de RTO: warm of cloud voor het ERP, iets eenvoudigers voor systemen die dagen kunnen wachten.' },
      ],
    },

    {
      title: 'Taak 6: Oefenen en crisiscommunicatie',
      tryFirst: true,
      intro: '<p>Twee weken na het incident leid jij een tabletop-oefening met het nieuwe crisisteam van Vermeer. Je speelt het incident van 11 november opnieuw na, met de verbeterde plannen. Maak in het lab zes keuzes zoals het crisisteam ze zou moeten maken.</p>',
      content: `
        <h3>Oefenen</h3>
        <p>Een plan dat nooit is geoefend, bevat fouten die je pas ontdekt als het misgaat. NIST SP 800-84 beschrijft
        hoe je oefeningen opzet. De gangbare vormen, van licht naar zwaar:</p>
        <ul>
          <li><strong>Tabletop-oefening</strong>: het team bespreekt aan tafel een scenario dat stap voor stap wordt
          uitgespeeld. Niemand raakt een systeem aan. Goedkoop en geschikt om rollen, besluiten en communicatie te
          toetsen.</li>
          <li><strong>Functionele oefening</strong>: het team voert onderdelen echt uit, bijvoorbeeld de crisisruimte
          inrichten of de noodcommunicatie gebruiken.</li>
          <li><strong>Technische hersteltest</strong>: een systeem echt herstellen uit de back-up, en de tijd meten. Dat
          is de enige manier om je werkelijke RTO te kennen.</li>
          <li><strong>Volledige onderbrekingstest</strong>: de productie echt stilleggen en uitwijken. Het meest
          realistisch, maar met eigen risico op schade; zelden gedaan.</li>
        </ul>
        <p>Na elke oefening volgt een evaluatie met concrete verbeterpunten, een eigenaar en een datum. Een oefening
        zonder verbeterpunten was te makkelijk.</p>
        <h3>Crisiscommunicatie</h3>
        <ul>
          <li><strong>Eén woordvoerder</strong> en één lijn. Tegenstrijdige berichten kosten meer vertrouwen dan het
          incident.</li>
          <li><strong>Een kanaal buiten de eigen IT</strong>: vooraf afgesproken mobiele nummers, een alternatief
          berichtenkanaal, een papieren lijst. Ga ervan uit dat de aanvaller de eigen mail kan meelezen.</li>
          <li><strong>Eerst intern</strong>: medewerkers horen het niet uit de krant. Daarna klanten, leveranciers en
          partners.</li>
          <li><strong>Feiten, geen speculatie</strong>: zeg wat je weet, wat je doet en wanneer je weer iets laat weten.
          Beweer niet dat er "geen gegevens zijn gelekt" voordat het onderzoek dat uitwijst.</li>
        </ul>
        <h3>Meldplichten</h3>
        <ul>
          <li>De <strong>AVG</strong> (artikel 33): een datalek dat een risico vormt voor betrokkenen, meld je binnen
          72 uur na ontdekking bij de Autoriteit Persoonsgegevens. Bij een hoog risico informeer je ook de betrokkenen
          zelf.</li>
          <li><strong>NIS2</strong> (artikel 23), in Nederland omgezet in de Cyberbeveiligingswet: organisaties die eronder
          vallen, doen bij een significant incident binnen 24 uur een vroege waarschuwing, binnen 72 uur een
          incidentmelding en binnen een maand een eindrapport, bij de aangewezen CSIRT of toezichthouder.</li>
          <li>Doe aangifte bij de politie. Politie en NCSC adviseren om geen losgeld te betalen.</li>
        </ul>
        <div class="callout info"><strong>Noodprocedures zijn ook continuïteit:</strong> niet elk proces wacht op IT.
        Orders op papier, temperaturen met de hand opnemen, uitleveren op basis van een uitgeprinte lijst. Leg ze vast
        en oefen ze, want onder druk improviseert niemand goed.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'Tabletop: woensdag 11 november, opnieuw',
        scenario: 'Vermeer Groothandel (fictief). Je speelt het incident na: om 14:52 versleutelt ransomware de ERP-server en de back-upserver. Het nieuwe plan staat op papier bij elk lid van het crisisteam, met een lijst mobiele nummers. Jij bent de oefenleider; kies per inject wat het crisisteam hoort te doen.',
        pass: 6,
        flag: 'NM{oefenen_voor_het_echt_is}',
        steps: [
          { situation: '15:05. ICT meldt: ERP en back-upserver versleuteld, losgeldbericht op het scherm. Wat gebeurt er nu?', choices: [
            { label: 'De leider crisisteam (of de plaatsvervanger) activeert het plan en roept het team bijeen', good: true, feedback: 'Een duidelijk moment van activering zet de afgesproken rollen in werking. Anders blijft ICT alleen doormodderen.' },
            { label: 'ICT probeert het eerst zelf op te lossen en meldt het als het niet lukt', good: false, feedback: 'Dan beginnen communicatie, noodprocedures en meldtermijnen te laat. Activeer liever één keer te vaak.' },
          ] },
          { situation: '15:20. De mail en het chatplatform werken nog, maar ze melden aan via het getroffen domein. Hoe communiceert het team?', choices: [
            { label: 'Gewoon via de bedrijfsmail, die werkt nog', good: false, feedback: 'Een aanvaller met domeinrechten kan meelezen, en het systeem kan elk moment uitvallen.' },
            { label: 'Via het vooraf afgesproken kanaal buiten de eigen IT, met de papieren lijst mobiele nummers', good: true, feedback: 'Out-of-band, en dat kanaal is vooraf getest. Precies waarvoor het is.' },
          ] },
          { situation: '15:40. De koelbewaking draait nog, maar de alarmen gaan via de mailserver en die is onbetrouwbaar.', choices: [
            { label: 'Noodprocedure: elk uur temperaturen met de hand opnemen en vastleggen, tot de alarmering is hersteld', good: true, feedback: 'De MTD van 30 minuten gaat over de registratie. Met de hand registreren houdt het proces binnen de grens.' },
            { label: 'Niets doen: de bewaking zelf draait nog', good: false, feedback: 'Een bewaking die niemand waarschuwt, is geen bewaking. Een kapotte koelcel valt dan pas op bij de volgende levering.' },
          ] },
          { situation: '16:10. Een grote zorgklant belt: "Zijn onze gegevens gelekt?" Er is nog geen onderzoek gedaan.', choices: [
            { label: '"Nee, er is niets gelekt", om de klant gerust te stellen', good: false, feedback: 'Dat weet je niet. Blijkt het later anders, dan ben je ook je geloofwaardigheid kwijt.' },
            { label: 'De woordvoerder antwoordt: wat er bekend is, wat er wordt gedaan, en wanneer de klant weer bericht krijgt', good: true, feedback: 'Feiten, acties, een volgend moment. En alle klantcontacten via één lijn.' },
          ] },
          { situation: '16:20. Op de fileserver stonden ook personeelsdossiers. Het onderzoek naar mogelijke diefstal kost zeker een week.', choices: [
            { label: 'Wachten met melden tot het onderzoek klaar is, dan weet je pas wat je moet melden', good: false, feedback: 'De termijn van 72 uur loopt vanaf het moment van ontdekken. Je kunt melden met wat je weet en later aanvullen.' },
            { label: 'Een eerste melding bij de AP binnen 72 uur voorbereiden, aangifte doen, en nagaan of Vermeer onder NIS2 valt voor de 24-uursmelding', good: true, feedback: 'Melden kan in stappen. Aanvullen mag; te laat melden niet.' },
          ] },
          { situation: '16:30. Er komt een voorstel om het losgeld te betalen, "dan zijn we sneller terug".', choices: [
            { label: 'Betalen: herstel uit back-ups kost een nacht', good: false, feedback: 'Er is geen garantie dat de sleutel werkt of dat gestolen gegevens worden vernietigd, en je financiert de volgende aanval. Politie en NCSC adviseren niet te betalen.' },
            { label: 'Niet betalen; volgens plan herstellen vanaf de onveranderbare offsite kopie, nadat bewijs is vastgelegd', good: true, feedback: 'Daar is de offsite kopie voor. Het crisisteam besluit om 16:30 te beginnen.' },
          ] },
        ],
      },
      questions: [
        { q: 'Maak alle zes keuzes goed. Welke vlag krijg je?', answer: ['NM{oefenen_voor_het_echt_is}'],
          hints: ['Bij elke stap is één keuze goed. Lees de feedback bij een foute keuze.', 'Denk aan activering, out-of-band, noodprocedures, feiten en meldtermijnen.', 'Je hebt zes van de zes nodig.'],
          explain: 'In een tabletop maak je deze fouten goedkoop. Woensdag 11 november maakte Vermeer ze duur.' },
        { q: 'Welke vorm van oefenen vertelt je de werkelijke hersteltijd van het ERP?', options: ['Een technische hersteltest waarbij je het ERP echt terugzet en de tijd meet', 'Een tabletop-oefening met het crisisteam', 'Het controleren of de nachtelijke back-uptaak "geslaagd" meldt', 'Een functionele oefening met de noodcommunicatie'], answer: 0,
          wrong: { 1: 'Een tabletop toetst besluiten en rollen. Er wordt niets hersteld, dus er wordt ook niets gemeten.', 2: 'Een geslaagde back-uptaak zegt niets over hoe lang terugzetten duurt, of dat het lukt.', 3: 'Die toetst of de communicatie werkt, niet het herstel van een systeem.' },
          explain: 'Alleen een echte hersteltest geeft een echte tijd. Die tijd gebruik je in het plan, niet de schatting van de leverancier.' },
        { q: 'Boss: het crisisteam begint om 16:30 aan herstel vanaf de offsite opslag. Het netwerk is al schoon, maar de domeincontroller moet nog terug voordat de ERP-database kan worden hersteld. Alles duurt zo lang als in de hersteltests, en het herstelteam werkt stap voor stap. Hoe laat kan orderintake op zijn vroegst weer (UU:MM)?', boss: true, answer: ['01:15', '1:15', '01.15', '0115'],
          hints: ['Je hebt de tijden uit taak 2 nodig, en de volgorde uit taak 4.', 'Tel op: dc01 herstellen, de ERP-database ophalen uit de offsite opslag, terugzetten en controleren.', '45 minuten + 80 minuten + 5 uur 40 + 1 uur, vanaf 16:30.'],
          wrong: { '00:30': 'Je bent de domeincontroller vergeten. Zonder dc01 start het ERP niet, en het herstelteam werkt stap voor stap.', '0:30': 'Je bent de domeincontroller vergeten. Zonder dc01 start het ERP niet, en het herstelteam werkt stap voor stap.', '22:52': 'Dat is het moment waarop de MTD van 8 uur na het incident verstrijkt, niet het moment van herstel.', '23:55': 'Je hebt het ophalen uit de offsite opslag (80 minuten) niet meegeteld: de hersteltest kwam uit bak01.' },
          why: 'Een RTO in het plan is een belofte. Pas als je de echte hersteltijden achter elkaar zet, met de afhankelijkheden en het moment waarop je begint, zie je of je hem kunt waarmaken.',
          explain: '16:30 + 0:45 (dc01) = 17:15. Daarna 80 minuten download, 5 uur 40 herstel en 1 uur controle: 8 uur, dus 01:15. De MTD van orderintake verstreek al om 22:52. Conclusie voor het plan: sneller herstellen kan alleen met een warme uitwijk of herstel in de cloud, en de nachtelijke uren moeten de orders op papier opvangen.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: een herstelpunt van vóór de inbraak',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Bij een brand is het moment van de schade het moment waarop het misging. Bij een cyberaanval niet. Een
        aanvaller zit vaak al dagen of weken in het netwerk voordat hij versleutelt: hij verkent, verzamelt
        wachtwoorden, schakelt beveiliging uit en kopieert gegevens. De versleuteling is het eind, niet het begin.</p>
        <p>Dat heeft twee gevolgen voor herstel. Ten eerste: een back-up van gisteren bevat misschien al de achterdeur van
        de aanvaller, een extra beheeraccount of een geplande taak. Wie die terugzet, zet de aanvaller terug. Ten tweede:
        als je een herstelpunt van vóór de inbraak wilt, moet dat herstelpunt nog bestaan. Daar gaat het mis bij korte
        bewaartermijnen.</p>
        <h3>Een rekenvoorbeeld</h3>
        <p>Bij Vermeer blijkt uit het onderzoek dat de aanvaller op 21 oktober om 23:10 binnenkwam, via een
        VPN-account zonder MFA. De offsite kopieën worden dagelijks om 05:00 gemaakt en 14 dagen onveranderbaar
        bewaard. Op 11 november, de dag van de versleuteling, is de oudste beschikbare offsite kopie die van 28
        oktober. Die is van ná de inbraak. Er is geen kopie meer van een moment waarop de aanvaller er zeker niet was.</p>
        <p>Dat betekent niet dat herstel onmogelijk is. Je kunt herstellen uit een recente kopie en daarna grondig zoeken
        naar wat de aanvaller achterliet. Voor gegevens (een database, documenten) is dat goed te doen: daar zit zelden
        een achterdeur in. Voor systemen (een domeincontroller, een server) is het riskanter. Daarom wordt na een ernstige
        aanval een domeincontroller vaak niet blind teruggezet, maar zorgvuldig opnieuw opgebouwd of na herstel grondig
        opgeschoond.</p>
        <h3>Hoe lang bewaren?</h3>
        <p>Er is geen termijn die altijd genoeg is. Wat wel helpt:</p>
        <ul>
          <li>Een gelaagde bewaring: dagelijkse kopieën voor een paar weken, wekelijkse voor een paar maanden, maandelijkse
          langer. Dat kost veel minder opslag dan alles lang bewaren.</li>
          <li>Detectie die een inbraak eerder vindt. Elke dag die je sneller ontdekt, is een dag minder die je
          bewaartermijn moet overbruggen.</li>
          <li>Gegevens en systemen apart behandelen: gegevens herstel je uit de back-up, systemen bouw je bij voorkeur
          opnieuw op vanuit een schoon image en configuratie die je kunt herhalen.</li>
        </ul>
      `,
      questions: [
        { q: 'Hoeveel dagen bewaartermijn had Vermeer op 11 november minimaal nodig gehad om de offsite kopie van 21 oktober nog te hebben?', answer: ['21', '21 dagen'],
          hints: ['De kopie van 21 oktober 05:00 is van vóór de inbraak (23:10 die avond).', 'Tel de dagen van 21 oktober tot 11 november.', 'Oktober heeft 31 dagen: 10 dagen tot het einde van oktober, plus 11.'],
          wrong: { '20': 'Dan is de oudste kopie op 11 november die van 22 oktober, en die is van na de inbraak.', '14': 'Dat is de huidige termijn. Daarmee is 28 oktober de oudste kopie.' },
          explain: '21 dagen. Een gelaagde bewaring, bijvoorbeeld 14 dagen dagelijks en 3 maanden wekelijks, had een kopie van vóór de inbraak bewaard.' },
        { q: 'Vermeer moet uit een kopie van ná de inbraak herstellen. Wat is de verstandigste aanpak?', options: ['Gegevens uit de back-up halen, maar systemen zoals de domeincontroller opnieuw opbouwen of grondig opschonen, en de toegangsweg (het VPN-account zonder MFA) eerst dichten', 'Alles terugzetten zoals het was, want de kopie is onveranderbaar en dus schoon', 'Niet herstellen en het losgeld betalen, want de back-ups zijn besmet', 'Wachten tot de bewaartermijn een oudere kopie oplevert'], answer: 0,
          wrong: { 1: 'Onveranderbaar betekent dat niemand de kopie achteraf kon wijzigen, niet dat de aanvaller er niet al in zat toen hij werd gemaakt.', 2: 'Een besmette kopie is nog bruikbaar voor gegevens, en betalen geeft geen garantie en geen schone systemen.', 3: 'Een bewaartermijn gaat alleen vooruit: oudere kopieën komen niet terug.' },
          why: 'Onveranderbaarheid beschermt tegen het wissen of versleutelen van back-ups, niet tegen het terugzetten van een aanvaller die al binnen was. Die twee worden in de praktijk vaak verward.',
          explain: 'Gegevens herstellen, systemen opnieuw opbouwen, en eerst de ingang sluiten. Anders zit de aanvaller er binnen een dag weer.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Security+ en ISC2 CC toetsen continuïteit met korte scenario's waarin je een begrip moet herkennen of een
        keuze moet maken. De afleiders zijn begrippen die er net naast liggen: RTO waar RPO wordt bedoeld, een warme
        uitwijk waar een koude volstaat, een tabletop waar een technische test nodig is. Vraag je bij elke vraag af:
        gaat het om <em>tijd</em> (RTO, MTD), om <em>gegevens</em> (RPO), om <em>plaats</em> (uitwijk) of om
        <em>toetsen</em> (oefenvorm)?</p>
        <h3>Drie valkuilen</h3>
        <ul>
          <li><strong>RTO en RPO.</strong> Een getal over "hoeveel werk opnieuw moet" is een RPO, een getal over "hoe lang
          het systeem plat ligt" is een RTO.</li>
          <li><strong>Duurste is niet beste.</strong> Een hot site voor een systeem met een MTD van een week is een fout
          antwoord.</li>
          <li><strong>Back-up en replicatie.</strong> Replicatie helpt tegen uitval van hardware, niet tegen versleuteling
          of per ongeluk wissen.</li>
        </ul>
        <p>Warm op met het lab en maak daarna de vijf vragen. Ze zijn zelf geschreven in examenstijl, alle organisaties
        zijn fictief.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien begrippen in vier groepen van vier.',
        groups: [
          { name: 'Hersteldoelen en analyse', items: ['RTO', 'RPO', 'MTD', 'BIA'] },
          { name: 'Uitwijkvormen', items: ['Hot site', 'Warm site', 'Cold site', 'Wederzijdse uitwijkafspraak'] },
          { name: 'Oefenvormen', items: ['Tabletop', 'Functionele oefening', 'Technische hersteltest', 'Volledige onderbrekingstest'] },
          { name: 'Back-upbegrippen', items: ['3-2-1-regel', 'Object lock', 'Incrementele back-up', 'Transactielog-back-up'] },
        ],
      },
      questions: [
        { q: 'Een fictieve webwinkel spreekt af dat bij een storing hooguit het laatste half uur aan bestellingen opnieuw moet worden ingevoerd. Welk begrip legt dit vast?',
          options: ['Recovery time objective', 'Recovery point objective', 'Maximum tolerable downtime', 'Mean time between failures'], answer: 1,
          wrong: { 0: 'De RTO gaat over hoe snel het systeem weer werkt, niet over hoeveel gegevens verloren gaan.', 2: 'De MTD gaat over hoe lang het proces stil mag liggen.', 3: 'MTBF is een maat voor betrouwbaarheid van hardware, geen hersteldoel.' },
          explain: 'Een half uur gegevensverlies is een RPO van 30 minuten. Daar hoort een herstelpunt bij dat minstens elk half uur buiten bereik wordt gebracht.' },
        { q: 'Een fictieve gemeente heeft een archiefsysteem dat volgens de BIA twee weken kan stilliggen. Welke uitwijkvorm past het beste?',
          options: ['Een hot site met continue replicatie', 'Een warm site met hardware die permanent klaarstaat', 'Een cold site of herstel op afroep', 'Geen uitwijk: met een MTD van twee weken is herstel niet nodig'], answer: 2,
          wrong: { 0: 'Een hot site haalt minuten tot uren. Voor twee weken betaal je dan voor snelheid die niemand nodig heeft.', 1: 'Ook een warm site is duurder dan nodig voor een MTD van twee weken.', 3: 'Een MTD van twee weken betekent dat herstel binnen twee weken moet. Zonder plan haal je ook dat niet.' },
          explain: 'Stem de uitwijk af op het hersteldoel. Een lage MTD vraagt een dure uitwijk, een hoge MTD een goedkope.' },
        { q: 'Het crisisteam van een fictieve zorginstelling wil toetsen of iedereen zijn rol kent en of de besluiten in het plan logisch zijn, zonder systemen te raken. Welke oefenvorm past?',
          options: ['Een volledige onderbrekingstest', 'Een technische hersteltest', 'Een tabletop-oefening', 'Een penetratietest'], answer: 2,
          wrong: { 0: 'Daarbij leg je de productie echt stil. Dat raakt systemen en zorg.', 1: 'Die toetst of een systeem kan worden hersteld en hoe lang dat duurt, niet de besluiten van het team.', 3: 'Een pentest zoekt kwetsbaarheden. Het oefent geen continuïteitsplan.' },
          explain: 'Een tabletop bespreekt een scenario aan tafel: rollen, besluiten en communicatie, zonder risico voor de productie.' },
        { q: 'Een fictief transportbedrijf repliceert zijn fileserver elke minuut naar een tweede datacenter. Na een ransomware-aanval blijken beide kopieën versleuteld. Wat ontbrak?',
          options: ['Een snellere replicatie', 'Een back-up met herstelpunten in het verleden die niet door de aanvaller kon worden gewijzigd', 'Een derde datacenter met dezelfde replicatie', 'Een hot site'], answer: 1,
          wrong: { 0: 'Snellere replicatie brengt de versleuteling alleen sneller over.', 2: 'Nog een replica wordt net zo goed versleuteld.', 3: 'Een hot site met gerepliceerde gegevens heeft hetzelfde probleem.' },
          explain: 'Replicatie beschermt tegen uitval, niet tegen versleuteling of wissen. Daarvoor zijn herstelpunten in het verleden nodig, onveranderbaar of offline.' },
        { q: 'Na een storing bij een fictieve logistieke dienstverlener willen alle afdelingen hun systeem als eerste terug. Wat had dit conflict moeten voorkomen?',
          options: ['Een herstelvolgorde in het plan, gebaseerd op de BIA en de afhankelijkheden tussen systemen', 'Snellere servers, zodat alles tegelijk kan', 'De IT-afdeling laten kiezen op het moment zelf', 'Het systeem met de meeste gebruikers eerst'], answer: 0,
          wrong: { 1: 'Ook met snelle servers wacht een applicatie op de systemen waar ze van afhangt, en het herstelteam is niet oneindig groot.', 2: 'Kiezen onder druk leidt tot de ruzie die de vraag beschrijft. De keuze hoort vooraf en met het bedrijf.', 3: 'Het aantal gebruikers zegt weinig over de schade per uur. Daar is de BIA voor.' },
          explain: 'De herstelvolgorde is een besluit van het bedrijf, vooraf vastgelegd, gebaseerd op MTD en afhankelijkheden.' },
      ],
    },
  ],

  terms: [
    { term: 'Business impact analysis', def: 'Analyse van de bedrijfsprocessen, de schade bij stilstand, de benodigde middelen en de herstelprioriteiten (NIST SP 800-34 Rev. 1).' },
    { term: 'MTD', def: 'Maximum tolerable downtime: hoe lang een bedrijfsproces stil kan liggen voordat de schade onaanvaardbaar is. In ISO 22301 MTPD.' },
    { term: 'RTO', def: 'Recovery time objective: binnen hoeveel tijd een systeem na een verstoring weer moet werken. Korter dan de MTD van de processen die erop leunen.' },
    { term: 'RPO', def: 'Recovery point objective: hoeveel gegevensverlies, uitgedrukt in tijd, maximaal aanvaardbaar is. Bepaalt hoe vaak een herstelpunt buiten bereik moet worden gebracht.' },
    { term: '3-2-1-regel', def: 'Drie kopieën van de gegevens, op twee soorten opslag, waarvan één offsite; in organisaties ook één offline of onveranderbaar.' },
    { term: 'Onveranderbare back-up', def: 'Back-up die gedurende een bewaartermijn niet kan worden gewijzigd of gewist, ook niet door een beheerder (object lock, WORM).' },
    { term: 'Hot, warm en cold site', def: 'Uitwijkvormen: volledig klaar met actuele gegevens (hot), hardware klaar maar gegevens nog terugzetten (warm), alleen ruimte en voorzieningen (cold).' },
    { term: 'Tabletop-oefening', def: 'Oefening waarin een team aan tafel een scenario doorloopt om rollen, besluiten en communicatie te toetsen, zonder systemen aan te raken.' },
    { term: 'Herstelvolgorde', def: 'Vooraf vastgelegde volgorde waarin systemen terugkomen, bepaald door afhankelijkheden en de hersteldoelen uit de BIA.' },
  ],

  resources: [
    { title: 'NIST SP 800-34 Rev. 1: Contingency Planning Guide for Federal Information Systems', url: 'https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final' },
    { title: 'NIST SP 800-84: Guide to Test, Training, and Exercise Programs for IT Plans and Capabilities', url: 'https://csrc.nist.gov/pubs/sp/800/84/final' },
    { title: 'NIST SP 1800-11: Data Integrity: Recovering from Ransomware and Other Destructive Events', url: 'https://csrc.nist.gov/pubs/sp/1800/11/final' },
  ],
});
