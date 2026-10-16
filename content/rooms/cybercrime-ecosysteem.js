/* Room: Het cybercrime-ecosysteem */
CS.registerRoom({
  id: 'cybercrime-ecosysteem',
  path: 'intelligence',
  order: 1,
  title: 'Het cybercrime-ecosysteem',
  icon: '🕸️',
  difficulty: 'Makkelijk',
  minutes: 55,
  summary: 'Hoe moderne cybercrime werkt als een keten van gespecialiseerde diensten (crime-as-a-service): de rollen, het ransomware-verdienmodel met dubbele afpersing en leksites, de vier interventietypen en bekende opsporingsoperaties.',
  objectives: [
    'Uitleggen hoe crime-as-a-service als keten met arbeidsdeling werkt',
    'De belangrijkste rollen in het ecosysteem met een analogie beschrijven (ontwikkelaar, infostealer-operator, IAB, loader-dienst, RaaS-operator, affiliate, bulletproof hoster, witwasser)',
    'Het ransomware-verdienmodel (RaaS, dubbele afpersing) en leksites als intelligencebron uitleggen',
    'Een leksite-post en een anonieme tip beoordelen op betrouwbaarheid en geloofwaardigheid (Admiralty Code)',
    'De vier interventietypen onderscheiden: strafrechtelijk, verstoren, preventief en alternatief',
    'Bekende opsporingsoperaties aan een interventietype koppelen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Misdaad als keten: wat is crime-as-a-service?',
      content: `
        <p>Als je aan een cybercrimineel denkt, zie je misschien één genie met een hoodie dat in zijn eentje
        een bank leegtrekt. De werkelijkheid is bijna het tegenovergestelde. Moderne cybercrime is een hele
        <strong>economie</strong> met <strong>arbeidsdeling</strong>: net als in de gewone wereld bouwt niemand
        een auto helemaal alleen. De één maakt de motor, de ander de banden, een derde doet de verkoop. Elke
        schakel is gespecialiseerd en koopt diensten in bij de volgende.</p>

        <p>Die handel heeft een naam: <strong>crime-as-a-service</strong> (CaaS, "misdaad als dienst"). Criminelen
        verkopen elkaar kant-en-klare gereedschappen en diensten, precies zoals een gewoon bedrijf software "as a
        service" afneemt. Je hoeft geen malware te kunnen schrijven om een aanval uit te voeren &mdash; je huurt die
        kennis gewoon in. Dat verlaagt de drempel enorm: ook iemand met weinig technische kennis kan meedoen,
        zolang hij maar betaalt.</p>

        <figure class="diagram">
          <svg viewBox="0 0 690 118" role="img" aria-label="De cybercrime-keten in vijf schakels">
            <rect x="10" y="46" width="114" height="56" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5" />
            <rect x="148" y="46" width="114" height="56" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5" />
            <rect x="286" y="46" width="114" height="56" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5" />
            <rect x="424" y="46" width="114" height="56" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5" />
            <rect x="562" y="46" width="114" height="56" rx="8" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5" />
            <text x="67" y="72" text-anchor="middle" fill="currentColor" font-size="13">Bouwen</text>
            <text x="67" y="90" text-anchor="middle" fill="var(--muted)" font-size="11">ontwikkelaar</text>
            <text x="205" y="72" text-anchor="middle" fill="currentColor" font-size="13">Binnenkomen</text>
            <text x="205" y="90" text-anchor="middle" fill="var(--muted)" font-size="11">infostealer, IAB</text>
            <text x="343" y="72" text-anchor="middle" fill="currentColor" font-size="13">Uitvoeren</text>
            <text x="343" y="90" text-anchor="middle" fill="var(--muted)" font-size="11">loader, affiliate</text>
            <text x="481" y="72" text-anchor="middle" fill="currentColor" font-size="13">Verdienen</text>
            <text x="481" y="90" text-anchor="middle" fill="var(--muted)" font-size="11">RaaS-operator</text>
            <text x="619" y="72" text-anchor="middle" fill="currentColor" font-size="13">Verbergen</text>
            <text x="619" y="90" text-anchor="middle" fill="var(--muted)" font-size="11">hoster, witwasser</text>
            <line x1="124" y1="74" x2="140" y2="74" stroke="currentColor" stroke-width="1.5" />
            <polygon points="140,70 146,74 140,78" fill="currentColor" />
            <line x1="262" y1="74" x2="278" y2="74" stroke="currentColor" stroke-width="1.5" />
            <polygon points="278,70 284,74 278,78" fill="currentColor" />
            <line x1="400" y1="74" x2="416" y2="74" stroke="currentColor" stroke-width="1.5" />
            <polygon points="416,70 422,74 416,78" fill="currentColor" />
            <line x1="538" y1="74" x2="554" y2="74" stroke="currentColor" stroke-width="1.5" />
            <polygon points="554,70 560,74 554,78" fill="currentColor" />
          </svg>
          <figcaption>De keten in vijf schakels. In elke schakel verkoopt een specialist een dienst aan de volgende &mdash; en in elke schakel kan de opsporing ingrijpen.</figcaption>
        </figure>

        <p>Waarom is dit belangrijk voor de opsporing? Omdat een keten <em>breekpunten</em> heeft. Je hoeft niet
        elke crimineel afzonderlijk op te pakken. Haal je één belangrijke dienst uit de lucht &mdash; bijvoorbeeld een
        populaire loader of een hostingpartij &mdash; dan raak je in één klap tientallen criminelen die daarvan
        afhankelijk waren. Denk aan een smokkelroute: je hoeft niet elke smokkelaar te vangen als je de
        ene cruciale brug kunt sluiten. In de volgende taken kijken we per schakel wie welke rol speelt.</p>

        <div class="callout info">
          <p><strong>Belofte:</strong> dit portaal gebruikt alleen echte, publiek beschreven feiten over operaties
          en modellen. Namen van slachtofferbedrijven in oefeningen zijn altijd fictief (bijvoorbeeld "NederBank").</p>
        </div>

        <p>Als beloning voor het doorgronden van het ketenidee, hier je eerste vlag van dit leerpad:
        <strong>JVT{misdaad_als_keten}</strong>.</p>
      `,
      questions: [
        {
          q: 'Welke omschrijving past het best bij crime-as-a-service?',
          options: [
            'Eén hacker die in zijn eentje een complete aanval van begin tot eind uitvoert',
            'Een economie waarin criminelen gespecialiseerde gereedschappen en diensten aan elkaar verkopen',
            'Een legale beveiligingsdienst die bedrijven inhuren',
          ],
          answer: 1,
          explain: 'Crime-as-a-service draait om arbeidsdeling: specialisten verkopen elkaar diensten, zodat ook minder technische daders kunnen meedoen.',
        },
        {
          q: 'Noem in één woord het principe van taakverdeling en specialisatie waarop crime-as-a-service rust.',
          answer: ['arbeidsdeling', 'specialisatie', 'taakverdeling'],
          hint: 'Net als in een fabriek: iedereen doet zijn eigen deel.',
          explain: 'Arbeidsdeling (specialisatie) maakt de keten efficiënt — en geeft de opsporing meteen breekpunten.',
        },
        {
          q: 'Wat is de vlag die als beloning in deze taak staat?',
          answer: ['JVT{misdaad_als_keten}'],
          hint: 'Hij staat vetgedrukt onderaan de uitleg.',
          explain: 'JVT{misdaad_als_keten} — onthoud: een keten heeft breekpunten.',
        },
      ],
    },

    {
      title: 'Taak 2 — De rollen die bouwen en binnenkomen',
      content: `
        <p>We lopen de keten langs. De eerste schakels maken het gereedschap en zorgen dat iemand überhaupt
        <em>binnenkomt</em> in een netwerk. Elke rol krijgt een analogie uit het dagelijks leven.</p>

        <h3>De ontwikkelaar (de wapensmid)</h3>
        <p>De <strong>ontwikkelaar</strong> schrijft de kwaadaardige software: de ransomware, de infostealer, de
        loader. Vergelijk het met een <em>wapensmid</em> die zelf nooit een bank overvalt, maar wel het wapen maakt
        en het bouwpakket verkoopt. Ontwikkelaars zijn vaak de meest technische mensen in de keten en blijven liefst
        uit het zicht; ze leveren het "product" en laten anderen het vuile werk doen.</p>

        <h3>De infostealer-operator (de zakkenroller)</h3>
        <p>Een <strong>infostealer</strong> is malware die massaal inloggegevens, cookies, wachtwoorden en
        sessietokens van besmette computers steelt. De operator verspreidt die malware breed (bijvoorbeeld via nep-downloads)
        en oogst alles wat binnenkomt. Het is de <em>zakkenroller op het station</em>: hij weet van tevoren niet wiens
        portemonnee hij jat, pakt er zo veel mogelijk en verkoopt de buit daarna per partij door als "logs" op
        criminele marktplaatsen. In één zo'n log kan de toegang tot je werkmail én je bedrijfsnetwerk zitten.</p>

        <h3>De Initial Access Broker (de heler met de sleutel)</h3>
        <p>Een <strong>Initial Access Broker (IAB)</strong> is gespecialiseerd in het binnenkomen én dat verkopen.
        Hij breekt in &mdash; via gestolen wachtwoorden, een kwetsbare server of een gekochte infostealer-log &mdash; en verkoopt
        vervolgens de kant-en-klare <em>toegang</em> tot dat bedrijfsnetwerk aan de hoogste bieder. De analogie: een
        <em>heler die de sleutel van een gekraakt pand verkoopt</em>. Zelf steelt hij niets uit het pand; hij levert alleen
        de toegang, zodat de volgende partij naar binnen kan lopen. IAB's zijn een geliefde schakel voor ransomwarebendes:
        die kopen gewoon toegang in plaats van zelf in te breken.</p>

        <h3>De loader-dienst (de bezorgkoerier)</h3>
        <p>Een <strong>loader</strong> (of dropper) is een klein stukje malware dat al op een besmette computer staat
        en vervolgens <em>andere</em> malware binnenhaalt en start. De loader-dienst verkoopt dit per installatie
        ("pay-per-install"): heb jij ransomware die je op duizend machines wil laten landen, dan betaal je de
        loader-dienst om jouw payload af te leveren. Het is de <em>bezorgkoerier</em> van de onderwereld: zelf geen
        aanvaller, maar hij brengt het pakketje op het juiste adres. Loaders zijn daarom een favoriet doelwit van de
        opsporing: schakel je de bezorgdienst uit, dan ligt een hele waslijst aan aanvallen stil.</p>
      `,
      questions: [
        {
          q: 'Hoe heet malware die massaal inloggegevens, cookies en wachtwoorden van besmette computers steelt en als "logs" doorverkoopt?',
          answer: ['infostealer', 'infostealer-malware', 'info-stealer', 'info stealer'],
          hint: 'De Engelse term betekent letterlijk "informatiesteler".',
          explain: 'Een infostealer oogst gegevens die daarna per partij als logs worden verkocht.',
        },
        {
          q: 'Wat verkoopt een Initial Access Broker (IAB)?',
          options: [
            'De broncode van de malware',
            'Kant-en-klare toegang tot een gehackt netwerk',
            'Gratis decryptietools voor slachtoffers',
          ],
          answer: 1,
          explain: 'Een IAB breekt in en verkoopt vervolgens de toegang — als een heler die de sleutel van een gekraakt pand doorverkoopt.',
        },
        {
          q: 'Een loader-dienst werkt vaak volgens welk model?',
          options: ['Pay-per-install (betalen per besmette machine)', 'Gratis en open source', 'Vaste maandprijs voor slachtoffers'],
          answer: 0,
          explain: 'De loader is de bezorgkoerier: je betaalt per installatie om jouw payload op machines af te leveren.',
        },
      ],
    },

    {
      title: 'Taak 3 — De rollen die uitbaten en verbergen',
      content: `
        <p>De toegang is er; nu moet er geld worden verdiend en weggesluisd. Deze schakels maken van een inbraak
        een verdienmodel en zorgen dat niemand gepakt wordt.</p>

        <h3>De RaaS-operator (de franchisegever)</h3>
        <p><strong>RaaS</strong> staat voor <em>Ransomware-as-a-Service</em>. De RaaS-operator bouwt het complete
        platform: de ransomware zelf, een onderhandelingsportaal, klantenservice voor "betalende" slachtoffers en een
        leksite. Vergelijk het met een <em>franchisegever</em> zoals een bekende fastfoodketen: het hoofdkantoor levert
        het recept, de huisstijl en de systemen, maar bakt zelf geen hamburgers. De operator verhuurt zijn ransomware
        aan anderen en int een percentage van elke geslaagde afpersing.</p>

        <h3>De affiliate (de franchisenemer)</h3>
        <p>De <strong>affiliate</strong> is de <em>franchisenemer</em>: hij huurt het RaaS-platform en voert de echte
        aanvallen uit. Hij koopt toegang bij een IAB, laat de ransomware los, exfiltreert data en doet de afpersing.
        De buit wordt verdeeld, vaak volgens een afspraak als 70/30 (de affiliate houdt het grootste deel, de operator
        krijgt zijn snee). Dit model verklaart waarom één ransomwaremerk door héél verschillende daders kan worden
        ingezet: het zijn allemaal affiliates van dezelfde franchise. Voor de opsporing is dat lastig én nuttig:
        pak je de operator, dan raak je alle affiliates in één keer.</p>

        <h3>De bulletproof hoster (de huisbaas die niets vraagt)</h3>
        <p>Alle malware, leksites en C2-servers moeten ergens draaien. <strong>Bulletproof hosting</strong>
        ("kogelvrije hosting") is hosting die klachten en verzoeken tot verwijdering structureel negeert, vaak vanuit
        landen die lastig te bereiken zijn voor justitie. Het is de <em>huisbaas die geen vragen stelt</em> en de politie
        bij de voordeur tegenhoudt. Zolang je betaalt, blijft je criminele infrastructuur online. Deze schakel is
        cruciaal: zonder een plek om te draaien, valt de hele keten stil.</p>

        <h3>De witwasser en de moneymule (de geldloper)</h3>
        <p>Tot slot moet het geld "schoon" worden. De <strong>witwasser</strong> verhult de criminele herkomst van het
        geld. Een belangrijke hulp daarbij is de <strong>moneymule</strong> (geldezel): iemand die zijn bankrekening
        uitleent zodat crimineel geld erdoorheen wordt gesluisd &mdash; soms bewust, soms geronseld met een "snel bijverdienen"-advertentie.
        Bij cryptovaluta lopen de betalingen via mixers en wisseldiensten om het spoor te breken. De analogie: de
        <em>geldloper</em> die contant geld in kleine stapjes rondbrengt tot niemand meer ziet waar het vandaan kwam.
        Omdat crimineel geld uiteindelijk ergens de echte economie in moet, is dit vaak de plek waar het spoor
        tóch zichtbaar wordt &mdash; en waar de opsporing kan toeslaan.</p>
      `,
      questions: [
        {
          q: 'In het RaaS-model: wie voert de daadwerkelijke aanvallen uit?',
          options: [
            'De RaaS-operator (de franchisegever)',
            'De affiliate (de franchisenemer)',
            'De bulletproof hoster',
          ],
          answer: 1,
          explain: 'De operator levert het platform; de affiliate huurt het en voert de aanval uit, waarna de buit wordt gedeeld (bv. 70/30).',
        },
        {
          q: 'Hoe noem je hostingdiensten die klachten en verwijderverzoeken structureel negeren, zodat criminele infrastructuur online blijft?',
          answer: ['bulletproof hosting', 'bulletproof', 'bulletproof hoster', 'kogelvrije hosting', 'bulletproof-hosting'],
          hint: 'De naam suggereert dat de hosting "onkwetsbaar" is voor takedowns.',
          explain: 'Bulletproof hosting is de huisbaas die geen vragen stelt — een cruciale schakel om de keten draaiende te houden.',
        },
        {
          q: 'Iemand die zijn bankrekening uitleent zodat crimineel geld erdoorheen wordt gesluisd, heet een ...',
          answer: ['moneymule', 'money mule', 'geldezel', 'money-mule'],
          hint: 'Engels: letterlijk een "geld-ezel".',
          explain: 'Een moneymule (geldezel) helpt bij het witwassen — vaak geronseld via "snel bijverdienen"-advertenties.',
        },
      ],
    },

    {
      title: 'Taak 4 — Het ransomware-verdienmodel: RaaS, dubbele afpersing en leksites',
      content: `
        <p>Ransomware is het bekendste verdienmodel in het ecosysteem, en het is slim opgebouwd. Vroeger was het
        simpel: malware versleutelt je bestanden, je betaalt voor de sleutel. Had je een goede back-up, dan betaalde
        je niet. Daarom bedachten de bendes een extra pressiemiddel.</p>

        <h3>Dubbele afpersing</h3>
        <p>Bij <strong>dubbele afpersing</strong> (double extortion) doen de aanvallers twee dingen. Eerst
        <em>stelen</em> ze je gegevens (exfiltratie), dán <em>versleutelen</em> ze je systemen. De eis is dus dubbel:
        betaal je niet, dan (1) krijg je je bestanden niet terug <em>en</em> (2) publiceren we je gestolen data online.
        Zelfs met een perfecte back-up zit je klem, want het dreigement van een datalek &mdash; met boetes, reputatieschade
        en boze klanten &mdash; blijft staan. Sommige groepen gaan nog verder (drievoudige afpersing): ze bellen klanten,
        bedreigen bestuurders of leggen er een DDoS-aanval bovenop.</p>

        <div class="callout warn">
          <p><strong>Les voor verdedigers:</strong> back-ups beschermen tegen versleuteling, maar niet tegen een
          datalek. Voorkómen dat data wordt buitgemaakt (detectie van exfiltratie) is daarom net zo belangrijk als
          goede back-ups.</p>
        </div>

        <h3>De leksite</h3>
        <p>Om het dreigement kracht bij te zetten, heeft bijna elke grote groep een <strong>leksite</strong> (leak site):
        een website op het dark web waar ze slachtoffers met naam en toenaam "op de lijst" zetten, met een aftelklok en
        stukjes van de gestolen data als bewijs. Het doel is pure druk: betaal, of je staat straks voor iedereen te kijk.</p>

        <h3>De leksite als intelligencebron</h3>
        <p>Hier zit een interessante kant voor onderzoekers. Die leksites zijn óók een <strong>intelligencebron</strong>.
        Je kunt eruit afleiden welke groepen actief zijn, welke sectoren en landen worden geraakt, hoeveel slachtoffers
        er zijn en welke werkwijze een groep gebruikt. Onderzoekers volgen leksites daarom nauwgezet.</p>
        <p>Maar let op: de leksite wordt beheerd door de <em>daders zelf</em>. Dat is een partij met een duidelijk belang
        om geloofwaardig én angstaanjagend over te komen. Ze posten echte slachtoffers, maar overdrijven ook, recyclen
        oude zaken of claimen een inbraak die nooit heeft plaatsgevonden. Een leksite-post is dus een
        <strong>onbevestigde claim van een onbetrouwbare partij</strong> &mdash; nuttig als signaal, maar nooit zomaar als
        waarheid aan te nemen. Precies dat afwegen oefen je in de volgende taak.</p>

        <p>Beloning voor dit inzicht: <strong>JVT{dubbele_afpersing}</strong>.</p>
      `,
      questions: [
        {
          q: 'Wat kenmerkt dubbele afpersing (double extortion)?',
          options: [
            'De aanvaller vraagt losgeld van twee verschillende bedrijven tegelijk',
            'De aanvaller steelt én versleutelt data, en dreigt de gestolen data te publiceren als je niet betaalt',
            'De aanvaller versleutelt je data twee keer achter elkaar',
          ],
          answer: 1,
          explain: 'Bij dubbele afpersing wordt data eerst gestolen en dan versleuteld; de dreiging van publicatie blijft ook staan als je een back-up hebt.',
        },
        {
          q: 'Waarom is een leksite-post nuttig maar onbetrouwbaar als bron?',
          options: [
            'Omdat leksites altijd liegen en nooit kloppen',
            'Omdat de daders de site zelf beheren: nuttig als signaal, maar de claim is onbevestigd en soms overdreven of verzonnen',
            'Omdat de politie de sites vult met nepinformatie',
          ],
          answer: 1,
          explain: 'Een leksite is een intelligencebron, maar beheerd door de daders zelf — behandel elke post als een onbevestigde claim.',
        },
        {
          q: 'Wat is de vlag die als beloning in deze taak staat?',
          answer: ['JVT{dubbele_afpersing}'],
          hint: 'Hij staat vetgedrukt onderaan de uitleg.',
          explain: 'JVT{dubbele_afpersing} — het pressiemiddel dat zelfs een goede back-up omzeilt.',
        },
      ],
    },

    {
      title: 'Taak 5 — Oefening: beoordeel je bron (Admiralty Code)',
      content: `
        <p>Als onderzoeker krijg je voortdurend informatie uit heel verschillende bronnen: een anonieme tip, een
        post op een leksite, je eigen loggegevens. Ze zijn niet allemaal even betrouwbaar. Om daar grip op te houden
        gebruiken analisten de <strong>Admiralty Code</strong> (ook wel NATO-systeem). Het kerninzicht: je beoordeelt
        twee dingen <strong>apart</strong>.</p>
        <ul>
          <li><strong>Betrouwbaarheid van de bron</strong> (een letter A&ndash;F): hoe goed is de staat van dienst van
            de bron zelf?</li>
          <li><strong>Geloofwaardigheid van de informatie</strong> (een cijfer 1&ndash;6): hoe aannemelijk is déze
            bewering, los van wie hem doet?</li>
        </ul>

        <table>
          <thead>
            <tr><th>Betrouwbaarheid bron</th><th>Geloofwaardigheid informatie</th></tr>
          </thead>
          <tbody>
            <tr><td>A &ndash; volledig betrouwbaar</td><td>1 &ndash; bevestigd</td></tr>
            <tr><td>B &ndash; meestal betrouwbaar</td><td>2 &ndash; waarschijnlijk waar</td></tr>
            <tr><td>C &ndash; tamelijk betrouwbaar</td><td>3 &ndash; mogelijk waar</td></tr>
            <tr><td>D &ndash; niet altijd betrouwbaar</td><td>4 &ndash; twijfelachtig</td></tr>
            <tr><td>E &ndash; onbetrouwbaar</td><td>5 &ndash; onwaarschijnlijk</td></tr>
            <tr><td>F &ndash; niet te beoordelen</td><td>6 &ndash; niet te beoordelen</td></tr>
          </tbody>
        </table>

        <p>Een anonieme, niet te verifiëren tip scoort bijvoorbeeld rond <code>E4</code>. Je eigen, geverifieerde
        SIEM-log is een volledig betrouwbare bron (<code>A</code>), maar zolang één bron het beeld geeft, blijft de
        informatie "waarschijnlijk waar" (<code>2</code>) &mdash; pas als andere bronnen het bevestigen, wordt het
        "bevestigd" (<code>1</code>). Zo scheid je netjes <em>wie iets zegt</em> van <em>of het waar is</em>.</p>

        <div class="callout tip">
          <p><strong>Denk in labels:</strong> is iets wat je opschrijft <em>bekend</em> (feit/waarneming),
          <em>afgeleid</em> (jouw conclusie) of een <em>aanname</em> (nog onbewezen)? Een leksite-claim is een aanname
          tot je hem hebt geverifieerd.</p>
        </div>

        <p>Beoordeel in het lab hieronder drie bronnen op betrouwbaarheid én geloofwaardigheid, en vergelijk daarna
        met het expertoordeel. Lukt het? Dan verdien je: <strong>JVT{beoordeel_je_bron}</strong>.</p>
      `,
      lab: {
        type: 'admiralty',
        items: [
          {
            source: 'Post op de leksite van een ransomwaregroep: "Bedrijf X is gehackt, 200 GB data buitgemaakt"',
            info: 'Bedrijf X is daadwerkelijk slachtoffer van een inbraak',
            reliability: 'C',
            credibility: '3',
            explain: 'De leksite wordt door de daders zelf beheerd: ze posten vaak echte slachtoffers (een zeker track record, daarom C), maar hebben er belang bij geloofwaardig en angstaanjagend over te komen en overdrijven of verzinnen soms. De specifieke claim is onbevestigd tot je die zelf verifieert: mogelijk waar (3).',
          },
          {
            source: 'Anonieme tip via Meld Misdaad Anoniem',
            info: 'Een met naam genoemde persoon plant volgende week een ransomware-aanval',
            reliability: 'E',
            credibility: '4',
            explain: 'Een anonieme, onbekende bron kun je niet op betrouwbaarheid toetsen (E, onbetrouwbaar/niet vast te stellen). De onbevestigde bewering is twijfelachtig tot er onderbouwing is (4). Nuttig als startpunt, nooit als bewijs.',
          },
          {
            source: 'Je eigen, geverifieerde SIEM-log van het bedrijfsnetwerk',
            info: 'Er is op 3 oktober om 02:14 een verdachte aanmelding vanaf een extern IP-adres geweest',
            reliability: 'A',
            credibility: '2',
            explain: 'Je eigen, geverifieerde loggegevens zijn een volledig betrouwbare bron (A). Omdat voorlopig één bron het beeld geeft, blijft de informatie "waarschijnlijk waar" (2); pas als andere bronnen (bv. firewall- of VPN-logs) het bevestigen, wordt het "bevestigd" (1).',
          },
        ],
      },
      questions: [
        {
          q: 'Beoordeel je in de Admiralty Code de betrouwbaarheid van de bron en de geloofwaardigheid van de informatie samen of apart?',
          answer: ['apart', 'los', 'gescheiden', 'los van elkaar'],
          hint: 'Een letter voor de bron, een cijfer voor de informatie.',
          explain: 'Je scheidt wie iets zegt (A–F) van of het waar is (1–6). Een onbetrouwbare bron kan toevallig gelijk hebben, en andersom.',
        },
        {
          q: 'Welke betrouwbaarheidsletter (A–F) past bij je eigen, geverifieerde SIEM-log?',
          answer: ['A'],
          hint: 'Je eigen geverifieerde systeem is de meest betrouwbare bron die er is.',
          explain: 'Een volledig betrouwbare bron krijgt A. De informatie blijft wel 2 (waarschijnlijk waar) tot een tweede bron bevestigt.',
        },
        {
          q: 'Wat is de vlag die je verdient na deze oefening?',
          answer: ['JVT{beoordeel_je_bron}'],
          hint: 'Hij staat vetgedrukt boven het lab.',
          explain: 'JVT{beoordeel_je_bron} — altijd eerst wegen wie iets zegt én hoe aannemelijk het is.',
        },
        { q: 'Ik heb de drie bronnen in het lab beoordeeld en met het expertoordeel vergeleken.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 6 — Vier manieren om in te grijpen: de interventietypologie',
      content: `
        <p>Nu je weet hoe de keten werkt, komt de vraag: hoe grijp je in? De opsporing en haar partners hebben niet
        één knop, maar een gereedschapskist. Grofweg zijn er <strong>vier interventietypen</strong>. Ze sluiten elkaar
        niet uit &mdash; in de praktijk combineer je ze juist.</p>

        <table>
          <thead>
            <tr><th>Type</th><th>Doel</th><th>Voorbeeld van handelen</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Strafrechtelijk</strong></td>
              <td>Daders identificeren, aanhouden en vervolgen</td>
              <td>Opsporingsonderzoek, aanhoudingen, inbeslagname, een rechtszaak</td>
            </tr>
            <tr>
              <td><strong>Verstoren</strong><br>(disrupt)</td>
              <td>De keten onwerkbaar maken, ook zonder (directe) aanhoudingen</td>
              <td>Servers en domeinen overnemen of offline halen, infiltreren, het onderlinge vertrouwen breken</td>
            </tr>
            <tr>
              <td><strong>Preventief</strong></td>
              <td>Voorkomen dat er (nieuwe) slachtoffers vallen</td>
              <td>Waarschuwen, bewustwording, kwetsbaarheden dichten, phishing weghalen, slachtofferhulp</td>
            </tr>
            <tr>
              <td><strong>Alternatief</strong></td>
              <td>(Jonge) daders ombuigen in plaats van (alleen) straffen</td>
              <td>Een leer- of begeleidingstraject, talent naar legale paden leiden</td>
            </tr>
          </tbody>
        </table>

        <p>Even uitgewerkt. Een <strong>strafrechtelijke</strong> aanpak is wat de meeste mensen voor ogen hebben:
        bewijs verzamelen, verdachten aanhouden, voor de rechter brengen. Krachtig, maar traag en lastig als daders in
        het buitenland zitten.</p>

        <p><strong>Verstoren</strong> is de laatste jaren enorm belangrijk geworden. In plaats van (of náást) het
        pakken van personen richt je je op de <em>infrastructuur</em> en het <em>vertrouwen</em>. Neem je de servers van
        een ransomwaregroep over, dan ligt hun hele operatie plat &mdash; en als affiliates zien dat de politie mee kon
        kijken, durven ze de volgende keer niet meer. Soms is verstoren het enige wat kan als aanhouden (nog) niet lukt.</p>

        <p><strong>Preventie</strong> zet in aan de voorkant: potentiële slachtoffers waarschuwen, kwetsbaarheden
        dichten, kennis delen (de rol van bijvoorbeeld het NCSC) en slachtoffers helpen die wél geraakt zijn. Elk
        voorkomen slachtoffer ondermijnt bovendien het verdienmodel van de daders.</p>

        <p>Tot slot de <strong>alternatieve</strong> interventie. Veel cybercriminelen beginnen jong en getalenteerd.
        In plaats van een jonge first-offender meteen een strafblad te geven, kun je hem een begeleidingstraject
        aanbieden dat zijn talent naar een legale (bijvoorbeeld security-)carrière buigt. Dat is goedkoper, effectiever
        en voorkomt dat iemand doorgroeit in de criminaliteit.</p>
      `,
      questions: [
        {
          q: 'Welk interventietype haalt criminele infrastructuur offline en breekt het onderlinge vertrouwen, soms zonder directe aanhoudingen?',
          options: ['Strafrechtelijk', 'Verstoren', 'Alternatief'],
          answer: 1,
          explain: 'Verstoren (disrupt) richt zich op de infrastructuur en het vertrouwen in de keten, ook als aanhouden (nog) niet lukt.',
        },
        {
          q: 'Een traject dat een jonge first-offender hacker naar een legale carrière ombuigt in plaats van (alleen) te straffen, is een voorbeeld van welk interventietype?',
          answer: ['alternatief', 'alternatieve interventie', 'alternatieve afdoening', 'alternatieve aanpak'],
          hint: 'Het vierde type uit de tabel.',
          explain: 'Dit is een alternatieve interventie: goedkoper, effectiever en gericht op het voorkomen van een criminele loopbaan.',
        },
        {
          q: 'Waarom combineer je in de praktijk vaak meerdere interventietypen?',
          options: [
            'Omdat de wet dat verplicht',
            'Omdat de typen elkaar aanvullen: één knop is zelden genoeg tegen een hele keten',
            'Omdat het goedkoper is om alles tegelijk te doen',
          ],
          answer: 1,
          explain: 'De keten heeft meerdere schakels; een combinatie van aanhouden, verstoren, voorkomen en ombuigen werkt het best.',
        },
      ],
    },

    {
      title: 'Taak 7 — Casussen uit de praktijk, en afsluiting',
      content: `
        <p>Tot slot koppelen we de theorie aan een paar bekende, publiek beschreven operaties. We houden het
        bewust <strong>hoog-over</strong>: alleen goed-gevestigde feiten, zonder in te zoomen op details die per bron
        verschillen. Let bij elke casus op <em>welke schakel</em> werd geraakt en <em>welk interventietype</em> centraal stond.</p>

        <table>
          <thead>
            <tr><th>Operatie</th><th>Waar het zich op richtte</th><th>Interventietype (vooral)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Operatie Cronos</strong></td><td>De ransomwaregroep LockBit (RaaS): de infrastructuur werd overgenomen en verstoord</td><td>Verstoren (met strafrechtelijke component)</td></tr>
            <tr><td><strong>Operatie Endgame</strong></td><td>Grootschalige actie tegen malware-loaders en droppers &mdash; de toelevering van de keten</td><td>Verstoren</td></tr>
            <tr><td><strong>Operatie Magnus</strong></td><td>Infostealer-malware (onder meer Redline en Meta)</td><td>Verstoren</td></tr>
            <tr><td><strong>Operatie PowerOFF</strong></td><td>Internationale aanpak van DDoS-booter/stresser-diensten</td><td>Verstoren, strafrechtelijk én preventief (waarschuwen van gebruikers)</td></tr>
            <tr><td><strong>No More Ransom</strong></td><td>Publiek-privaat initiatief met gratis decryptietools (nomoreransom.org)</td><td>Preventief (slachtofferhulp, losgeldbetaling voorkomen)</td></tr>
            <tr><td><strong>Hack_Right</strong></td><td>Nederlands traject voor jonge first-offender hackers</td><td>Alternatief (en preventief)</td></tr>
          </tbody>
        </table>

        <p>Zie je het patroon? Veel recente operaties kiezen voor <strong>verstoren</strong>: raak de gedeelde
        schakels (loaders, infostealers, RaaS-infrastructuur, booters) en je treft in één klap heel veel daders die
        daarvan afhankelijk waren. Het <em>bekende</em> feit is telkens dát er is ingegrepen op infrastructuur; of een
        specifieke persoon is aangehouden, is per operatie verschillend &mdash; dat soort details hoort bij de bron, niet
        bij algemene kennis.</p>

        <p><strong>No More Ransom</strong> en <strong>Hack_Right</strong> laten de andere kant zien. Gratis
        decryptietools helpen slachtoffers én ondermijnen het verdienmodel (betaalt niemand losgeld, dan verdient de
        bende niets). En een alternatief traject houdt getalenteerde jongeren weg uit de keten. Zo dekt de
        gereedschapskist de hele keten af: van binnenkomen tot witwassen, van aanhouden tot ombuigen.</p>

        <div class="callout tip">
          <p><strong>Rode draad van dit leerpad:</strong> cybercrime is een ecosysteem met rollen, geld en
          breekpunten. Wie de keten begrijpt, snapt wáár en hóé je kunt ingrijpen &mdash; en kan informatie uit dat
          ecosysteem (zoals leksites) wegen als een echte analist.</p>
        </div>

        <p>In de volgende modules van dit pad bouw je hierop voort: je leert misdaad ontleden met een
        <em>crime script</em>, de <em>intelligencecyclus</em> doorlopen, modellen zoals de Cyber Kill Chain en
        MITRE ATT&amp;CK gebruiken, pivoten op infrastructuur, en je bevindingen omzetten in een helder
        intelligenceproduct. Blijf nieuwsgierig en werk ethisch: je oefent alleen in je eigen lab of met
        toestemming.</p>
      `,
      questions: [
        {
          q: 'Operatie Cronos richtte zich op de ransomwaregroep LockBit en nam de infrastructuur over. Onder welk interventietype valt dit vooral?',
          options: ['Strafrechtelijk', 'Verstoren', 'Alternatief'],
          answer: 1,
          explain: 'Het overnemen en platleggen van de infrastructuur is een klassiek voorbeeld van verstoren (met een strafrechtelijke component).',
        },
        {
          q: 'Operatie Endgame richtte zich vooral op welke schakel in de keten?',
          options: [
            'Witwassers en moneymules',
            'Malware-loaders en droppers (de toelevering)',
            'De slachtoffers zelf',
          ],
          answer: 1,
          explain: 'Endgame trof de loaders/droppers — een gedeelde schakel, dus één interventie raakt veel daders.',
        },
        {
          q: 'Onder welk interventietype valt Hack_Right?',
          answer: ['alternatief', 'alternatieve interventie', 'preventief', 'alternatief en preventief'],
          hint: 'Het gaat om het ombuigen van jonge first-offenders.',
          explain: 'Hack_Right is een alternatieve (en preventieve) interventie: jong talent weghouden uit de keten.',
        },
        { q: 'Ik kan nu de rollen in de keten en de vier interventietypen benoemen, en een bron wegen met de Admiralty Code. 🕸️', noAnswer: true },
      ],
    },
  ],
  terms: [
    { term: 'Crime-as-a-service (CaaS)', def: 'Misdaad als dienst: criminelen verkopen elkaar kant-en-klare gereedschappen en diensten, zodat ook minder technische daders kunnen meedoen.' },
    { term: 'RaaS', def: 'Ransomware-as-a-Service: een operator bouwt en verhuurt het complete ransomwareplatform (malware, leksite, onderhandelingsportaal) en int een percentage van elke afpersing.' },
    { term: 'Affiliate', def: 'De "franchisenemer" die een RaaS-platform huurt en de daadwerkelijke aanvallen uitvoert; de buit wordt met de operator gedeeld (bv. 70/30).' },
    { term: 'Initial Access Broker (IAB)', def: 'Een crimineel die inbreekt en vervolgens de kant-en-klare toegang tot een netwerk doorverkoopt — als een heler die de sleutel van een gekraakt pand verkoopt.' },
    { term: 'Infostealer', def: 'Malware die massaal inloggegevens, cookies, wachtwoorden en sessietokens van besmette computers steelt; de buit wordt als "logs" doorverkocht.' },
    { term: 'Loader / dropper', def: 'Een klein stukje malware op een besmette machine dat andere malware binnenhaalt en start; vaak verkocht als dienst per installatie (pay-per-install).' },
    { term: 'Dubbele afpersing', def: 'Double extortion: data wordt eerst gestolen en dan versleuteld, waarna de aanvaller dreigt de gestolen data te publiceren als er niet wordt betaald.' },
    { term: 'Leksite', def: 'Leak site: een website (vaak op het dark web) waar een ransomwaregroep slachtoffers en gestolen data publiceert om druk uit te oefenen — en tegelijk een intelligencebron voor onderzoekers.' },
    { term: 'Bulletproof hosting', def: 'Hosting die klachten en verwijderverzoeken structureel negeert, vaak buiten het bereik van justitie, zodat criminele infrastructuur online blijft.' },
    { term: 'Moneymule', def: 'Geldezel: iemand die zijn bankrekening uitleent zodat crimineel geld kan worden witgewassen, soms bewust en soms geronseld via "snel bijverdienen".' },
    { term: 'Admiralty Code', def: 'Een methode om bronnen te wegen: de betrouwbaarheid van de bron (A–F) en de geloofwaardigheid van de informatie (1–6) worden apart beoordeeld.' },
    { term: 'Interventietypologie', def: 'De vier manieren om tegen cybercrime op te treden: strafrechtelijk, verstoren (disrupt), preventief en alternatief.' },
  ],
  resources: [
    { title: 'Europol — Internet Organised Crime Threat Assessment (IOCTA)', url: 'https://www.europol.europa.eu/' },
    { title: 'No More Ransom — gratis decryptietools en preventie', url: 'https://www.nomoreransom.org/' },
    { title: 'Politie — aangifte en informatie over cybercrime', url: 'https://www.politie.nl/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
});
