/* Room: Het cybercrime-ecosysteem */
CS.registerRoom({
  id: 'cybercrime-ecosysteem',
  path: 'intelligence',
  order: 1,
  title: 'Het cybercrime-ecosysteem',
  icon: '🕸️',
  difficulty: 'Makkelijk',
  minutes: 55,
  level: 'Instap',
  checked: '2026-11-12',
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
      tryFirst: true,
      intro: '<p>Bij de fictieve Kompas Zorggroep is ransomware ingezet. Achter die ene aanval zitten zes partijen die elk hun eigen stukje deden. In het lab staan hun bijdragen door elkaar. Zet ze in de volgorde waarin ze elkaar nodig hadden.</p>',
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

      `,
      lab: {
        type: 'ordering',
        title: 'wie had wie nodig?',
        prompt: 'Zes bijdragen aan één ransomware-aanval op Kompas Zorggroep (fictief). Zet ze in de volgorde van de keten: wie moest eerst iets leveren voordat de volgende aan de slag kon?',
        items: [
          { id: 'a', label: 'Een ontwikkelaar verhuurt zijn infostealer voor een vast bedrag per maand.' },
          { id: 'b', label: 'Een huurder van die infostealer maakt het VPN-wachtwoord van een medewerker van Kompas buit.' },
          { id: 'c', label: 'Een tussenhandelaar koopt dat wachtwoord, controleert dat het werkt en biedt de toegang tot het netwerk te koop aan.' },
          { id: 'd', label: 'Een aanvaller koopt de toegang, steelt gegevens en zet gehuurde ransomware in.' },
          { id: 'e', label: 'De groep achter de ransomware voert de onderhandeling en houdt een deel van het losgeld.' },
          { id: 'f', label: 'Het losgeld gaat via een mixer en een wisseldienst naar gewone bankrekeningen.' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
        flag: 'NM{misdaad_als_keten}',
        explain: 'Bouwen, binnenkomen (twee stappen), uitvoeren, verdienen, verbergen. Geen van de zes kon zonder de vorige.',
      },
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
          hints: ['In het lab deed elke partij maar één ding.', 'Het woord staat vetgedrukt in de eerste alinea van de uitleg.', 'Net als in een fabriek: iedereen doet zijn eigen deel van de arbeid.'],
          explain: 'Arbeidsdeling (specialisatie) maakt de keten efficiënt — en geeft de opsporing meteen breekpunten.',
        },
        {
          q: 'Zet de zes bijdragen in het lab in de juiste volgorde. Welke vlag verschijnt?',
          answer: ['NM{misdaad_als_keten}'],
          hints: ['Begin bij degene die het gereedschap maakt en eindig bij het geld.', 'Het wachtwoord moet eerst gestolen zijn voordat iemand het kan doorverkopen.', 'Verhuren, wachtwoord stelen, toegang doorverkopen, aanvallen, onderhandelen, witwassen.'],
          why: 'Elke overgang tussen twee stappen is een koop of een huur. Daar laat de keten sporen na, en daar kan de opsporing ingrijpen.',
          explain: 'Onthoud: een keten heeft breekpunten. Haal één schakel weg en alles erna valt stil.',
        },
      ],
    },

    {
      title: 'Taak 2 — De rollen die bouwen en binnenkomen',
      tryFirst: true,
      intro: '<p>Volg het geld. In het lab staan vier betalingen tussen de partijen die vóór de eigenlijke aanval hun werk doen. Klik op de knopen en zoek uit wie aan wie betaalt, waarvoor, en wat de tussenhandelaar eraan overhoudt.</p>',
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
          q: 'Hoeveel euro houdt de Initial Access Broker in het lab over aan deze ene toegang?',
          answer: ['2960', '2.960', '€2960', '€ 2960', '€ 2.960'],
          hints: ['Klik in het lab op de Initial Access Broker en kijk wat er binnenkomt en wat eruit gaat.', 'Hij koopt een log met een wachtwoord en verkoopt de toegang tot het netwerk.', '3000 min 40.'],
          wrong: { '3000': 'Dat is wat de affiliate hem betaalt. Trek de inkoop van het log eraf.', '40': 'Dat is wat hij zelf voor het log betaalde.' },
          why: 'Een gestolen wachtwoord is weinig waard. Gecontroleerde toegang tot een bedrijfsnetwerk is een veelvoud waard. Die marge verklaart waarom deze rol bestaat.',
          explain: 'De broker koopt het log voor € 40 en verkoopt de toegang voor € 3.000: € 2.960 voor het controleren en doorverkopen.',
        },
        {
          q: 'Wat verkoopt een Initial Access Broker (IAB)?',
          options: [
            'De broncode van de malware',
            'Kant-en-klare toegang tot een gehackt netwerk',
            'Gratis decryptietools voor slachtoffers',
          ],
          answer: 1,
          wrong: { 0: 'De broncode is van de ontwikkelaar. Een IAB verkoopt een ingang, geen gereedschap.', 2: 'Decryptietools komen van de opsporing en securitybedrijven, niet uit de keten.' },
          explain: 'Een IAB breekt in en verkoopt vervolgens de toegang — als een heler die de sleutel van een gekraakt pand doorverkoopt.',
        },
        {
          q: 'De affiliate betaalt in het lab ook een loader-dienst. Hoeveel euro is dat per installatie?',
          answer: ['0,50', '0.50', '0,5', '0.5', '€0,50', '€ 0,50', '50 cent'],
          hints: ['Zoek de betaling van de affiliate aan de loader-dienst en lees de notitie erbij.', 'Je hebt het bedrag en het aantal installaties nodig.', '600 gedeeld door 1.200.'],
          wrong: { '600': 'Dat is het totaalbedrag. Deel het door het aantal installaties.', '2': 'Je hebt de deling omgedraaid: het is bedrag gedeeld door aantal.' },
          explain: '€ 600 voor 1.200 installaties is € 0,50 per stuk. Dat is pay-per-install: de loader-dienst is de bezorgkoerier en rekent per afgeleverd pakketje.',
        },
      ],
      lab: {
        type: 'flow',
        title: 'wie betaalt wie, vóór de aanval',
        unit: '€',
        scenario: 'Vier betalingen in de aanloop naar één aanval (fictief, bedragen in euro). Elke pijl is een aankoop van een dienst.',
        nodes: [
          { id: 'dev', type: 'service', label: 'Ontwikkelaar' },
          { id: 'st', type: 'service', label: 'Infostealer-operator' },
          { id: 'iab', type: 'service', label: 'Initial Access Broker' },
          { id: 'ld', type: 'service', label: 'Loader-dienst' },
          { id: 'af', type: 'source', label: 'Affiliate' },
        ],
        edges: [
          { from: 'st', to: 'dev', amount: 200, time: '1 mrt', note: 'maandhuur van de infostealer' },
          { from: 'iab', to: 'st', amount: 40, time: '4 mrt', note: 'koopt één log met een VPN-wachtwoord' },
          { from: 'af', to: 'iab', amount: 3000, time: '9 mrt', note: 'koopt gecontroleerde toegang tot een bedrijfsnetwerk' },
          { from: 'af', to: 'ld', amount: 600, time: '9 mrt', note: 'pay-per-install: 1.200 installaties in een andere campagne' },
        ],
      },
    },

    {
      title: 'Taak 3 — De rollen die uitbaten en verbergen',
      tryFirst: true,
      intro: '<p>Kompas Zorggroep heeft in dit fictieve scenario € 200.000 losgeld betaald. Volg in het lab waar dat geld heen gaat: wie krijgt welk deel, wie houdt onderweg iets in, en hoeveel komt er aan het eind op gewone bankrekeningen terecht?</p>',
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
          wrong: { 0: 'De operator bouwt en verhuurt het platform. In het lab zie je dat hij 30% krijgt zonder zelf aan te vallen.', 2: 'De hoster verhuurt alleen de servers waarop het platform draait.' },
          explain: 'De operator levert het platform; de affiliate huurt het en voert de aanval uit, waarna de buit wordt gedeeld (bv. 70/30).',
        },
        {
          q: 'Hoeveel euro houdt de RaaS-operator in het lab over, nadat hij de bulletproof hoster heeft betaald?',
          answer: ['58000', '58.000', '€58000', '€ 58000', '€ 58.000'],
          hints: ['Klik op de RaaS-operator: wat komt er binnen en wat gaat eruit?', 'Hij krijgt 30% van het losgeld en betaalt de huur van de leksite en de servers.', '60.000 min 2.000.'],
          wrong: { '60000': 'Dat is zijn deel van het losgeld. Trek de betaling aan de hoster er nog af.', '140000': 'Dat is het deel van de affiliate.' },
          explain: '30% van € 200.000 is € 60.000. Na € 2.000 voor de hoster blijft € 58.000 over. De operator verdient dus aan elke aanval zonder zelf in te breken.',
        },
        {
          q: 'Hoeveel euro van het deel van de affiliate komt uiteindelijk bij de twee geldezels samen aan?',
          answer: ['132000', '132.000', '€132000', '€ 132000', '€ 132.000'],
          hints: ['Volg het geld van de affiliate door de mixer en de wisseldienst.', 'Zowel de mixer als de wisseldienst houdt iets in. Tel wat de wisseldienst uitbetaalt.', 'Twee keer 66.000.'],
          wrong: { '140000': 'Dat is wat de affiliate kreeg. Onderweg houden de mixer en de wisseldienst geld in.', '133000': 'Dat is wat bij de wisseldienst aankomt. Die houdt zelf ook nog iets in.', '66000': 'Dat is één geldezel. Het zijn er twee.' },
          why: 'Bij de geldezels komt het geld de gewone economie in, op rekeningen met een naam. Daar wordt het spoor het vaakst zichtbaar.',
          explain: 'Van € 140.000 blijft na de mixer € 133.000 over en na de wisseldienst € 132.000, verdeeld over twee geldezels. Witwassen kost de dader dus geld en laat op elk punt een spoor na.',
        },
      ],
      lab: {
        type: 'flow',
        title: 'waar blijft het losgeld?',
        unit: '€',
        scenario: 'Kompas Zorggroep betaalt € 200.000 losgeld (fictief, omgerekend naar euro). Volg het geld tot het op gewone bankrekeningen staat.',
        nodes: [
          { id: 'v', type: 'victim', label: 'Kompas Zorggroep' },
          { id: 'w', type: 'wallet', label: 'Losgeldwallet' },
          { id: 'op', type: 'service', label: 'RaaS-operator' },
          { id: 'bh', type: 'service', label: 'Bulletproof hoster' },
          { id: 'af', type: 'account', label: 'Affiliate' },
          { id: 'mx', type: 'mixer', label: 'Mixer' },
          { id: 'ex', type: 'exchange', label: 'Wisseldienst' },
          { id: 'm1', type: 'mule', label: 'Geldezel 1' },
          { id: 'm2', type: 'mule', label: 'Geldezel 2' },
        ],
        edges: [
          { from: 'v', to: 'w', amount: 200000, time: '10:00', note: 'losgeld' },
          { from: 'w', to: 'op', amount: 60000, time: '10:30', note: '30% voor de operator' },
          { from: 'w', to: 'af', amount: 140000, time: '10:31', note: '70% voor de affiliate' },
          { from: 'op', to: 'bh', amount: 2000, time: '11:00', note: 'huur van leksite en servers' },
          { from: 'af', to: 'mx', amount: 140000, time: '12:00', note: 'spoor vertroebelen' },
          { from: 'mx', to: 'ex', amount: 133000, time: '15:00', note: 'de mixer houdt 5% in' },
          { from: 'ex', to: 'm1', amount: 66000, time: '17:00', note: 'uitbetaling naar bankrekening' },
          { from: 'ex', to: 'm2', amount: 66000, time: '17:05', note: 'uitbetaling naar bankrekening' },
        ],
      },
    },

    {
      title: 'Taak 4 — Het ransomware-verdienmodel: RaaS, dubbele afpersing en leksites',
      tryFirst: true,
      intro: '<p>Kompas Zorggroep staat op een leksite: de groep zegt 300 GB aan patiëntgegevens te hebben. De directie vraagt jou wat daarvan waar is. In het lab liggen de post, het "bewijs" van de groep en je eigen gegevens naast elkaar. Zoek uit wat je kunt bevestigen en wat niet.</p>',
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

      `,
      lab: {
        type: 'osintpuzzle',
        title: 'de claim tegenover je eigen gegevens',
        scenario: 'Vijf fragmenten rond de leksite-post over Kompas Zorggroep (fictief). Vergelijk wat de groep beweert met wat je zelf kunt vaststellen.',
        records: [
          { title: 'Leksite-post', lines: ['Slachtoffer: Kompas Zorggroep', '"Wij hebben 300 GB aan patiëntgegevens. Publicatie over 5 dagen."', 'Als bewijs toont de groep een lijst met vijf bestandsnamen.'] },
          { title: 'Het getoonde bewijs', lines: ['rooster_2023_week14.xlsx', 'jaarverslag_2023.pdf', 'personeelsfeest_2023.jpg', 'inkoop_2023_q2.xlsx', 'notulen_OR_2023-11.docx'] },
          { title: 'Eigen firewall-log', lines: ['Uitgaand naar 198.51.100.140 in de nacht van de inbraak: 42 GB.', 'Geen ander ongewoon uitgaand verkeer in de afgelopen 30 dagen.'] },
          { title: 'Eigen bestandsserver', lines: ['Map Algemeen/Archief 2023: volledig uitgelezen door het gecompromitteerde account.', 'Map Patiëntdossiers: geen toegang door het gecompromitteerde account.'] },
          { title: 'Back-upstatus', lines: ['De offline back-up van gisteren is intact en getest. Herstel kan vandaag beginnen.'] },
        ],
      },
      questions: [
        {
          q: 'Wat kenmerkt dubbele afpersing (double extortion)?',
          options: [
            'De aanvaller vraagt losgeld van twee verschillende bedrijven tegelijk',
            'De aanvaller steelt én versleutelt data, en dreigt de gestolen data te publiceren als je niet betaalt',
            'De aanvaller versleutelt je data twee keer achter elkaar',
          ],
          answer: 1,
          wrong: { 0: 'Het "dubbele" slaat op twee drukmiddelen tegen één slachtoffer, niet op twee slachtoffers.', 2: 'Twee keer versleutelen voegt geen druk toe. Het tweede drukmiddel is de dreiging met publicatie.' },
          explain: 'Bij dubbele afpersing wordt data eerst gestolen en dan versleuteld; de dreiging van publicatie blijft ook staan als je een back-up hebt.',
        },
        {
          q: 'De groep claimt 300 GB. Hoeveel GB uitgaand verkeer kun je met je eigen log bevestigen?',
          answer: ['42', '42 GB', '42gb'],
          hints: ['Zoek het fragment dat van jezelf komt en over uitgaand verkeer gaat.', 'Kijk in het eigen firewall-log naar de nacht van de inbraak.', 'Het is veel minder dan de groep beweert.'],
          wrong: { '300': 'Dat is de claim van de daders. Die hebben er belang bij om zo angstaanjagend mogelijk over te komen.', '0': 'Er is wel degelijk data naar buiten gegaan. De goede back-up verandert daar niets aan.' },
          why: 'Zo werkt het in de praktijk: de leksite is het signaal, je eigen logs zijn het bewijs. Rapporteer wat je kunt bevestigen en label de rest als claim.',
          explain: 'Je eigen log bevestigt 42 GB. Er is dus data gestolen, maar ongeveer een zevende van wat de groep zegt.',
        },
        {
          q: 'Uit welk jaar komen alle bestanden die de groep als bewijs toont?',
          answer: ['2023'],
          hints: ['Lees de bestandsnamen in het getoonde bewijs.', 'In elke naam zit een jaartal.', 'Het komt overeen met de archiefmap die is uitgelezen.'],
          wrong: { '2026': 'Dat is het jaar van de inbraak. Kijk naar het jaartal in de bestandsnamen.' },
          explain: 'Alles komt uit 2023, en volgens je bestandsserver is alleen de archiefmap van 2023 uitgelezen en niet de map met patiëntdossiers. De claim "patiëntgegevens" is dus onbevestigd. De back-up helpt bij herstel, maar niet tegen het lek dat er wel is: daarvoor blijft een melding nodig.',
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

        <p>Een anonieme, niet te verifiëren tip scoort bijvoorbeeld <code>F4</code>. Je eigen, geverifieerde
        SIEM-log is een volledig betrouwbare bron (<code>A</code>), maar zolang één bron het beeld geeft, blijft de
        informatie "waarschijnlijk waar" (<code>2</code>) &mdash; pas als andere bronnen het bevestigen, wordt het
        "bevestigd" (<code>1</code>). Zo scheid je netjes <em>wie iets zegt</em> van <em>of het waar is</em>.</p>

        <div class="callout tip">
          <p><strong>Denk in labels:</strong> is iets wat je opschrijft <em>bekend</em> (feit/waarneming),
          <em>afgeleid</em> (jouw conclusie) of een <em>aanname</em> (nog onbewezen)? Een leksite-claim is een aanname
          tot je hem hebt geverifieerd.</p>
        </div>

        <p>Beoordeel in het lab hieronder drie bronnen op betrouwbaarheid én geloofwaardigheid, en vergelijk daarna
        met het expertoordeel.</p>
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
            reliability: 'F',
            credibility: '4',
            explain: 'Een anonieme, onbekende bron kun je niet op betrouwbaarheid toetsen (F, niet te beoordelen; E is voor een bron die eerder onbetrouwbaar bleek). De onbevestigde bewering is twijfelachtig tot er onderbouwing is (4). Nuttig als startpunt, nooit als bewijs.',
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
          q: 'Scoor in het lab de post op de leksite. Welke score geeft het expertoordeel? (letter plus cijfer)',
          answer: ['C3'],
          hints: ['Scoor eerst de bron: de groep noemt vaak echte slachtoffers, maar overdrijft ook.', 'Scoor daarna de claim los daarvan: is hij bevestigd, waarschijnlijk, mogelijk of twijfelachtig?', 'Tamelijk betrouwbaar, mogelijk waar.'],
          wrong: { '/^f/i': 'F is voor een bron die je niet kunt beoordelen. Van deze groep is bekend dat ze vaak echte slachtoffers noemt.', '/^a/i': 'Een partij met belang bij overdrijven is geen volledig betrouwbare bron.', '/1$/': 'Bevestigd is het pas als een andere, onafhankelijke bron hetzelfde zegt.' },
          why: 'In taak 4 zag je waarom: de groep had gelijk dat er data weg was, en ongelijk over hoeveel en wat.',
          explain: 'C3: je scheidt wie iets zegt (A tot F) van of het waar is (1 tot 6). De bron heeft een zeker trackrecord (C), de claim is onbevestigd (3).',
        },
        {
          q: 'Welke betrouwbaarheidsletter (A–F) past bij je eigen, geverifieerde SIEM-log?',
          answer: ['A'],
          hints: ['Hoe goed ken je de staat van dienst van deze bron?', 'Het is je eigen systeem en het is geverifieerd.', 'De hoogste letter van de schaal.'],
          explain: 'Een volledig betrouwbare bron krijgt A. De informatie blijft wel 2 (waarschijnlijk waar) tot een tweede bron bevestigt.',
        },
        {
          q: 'Hoeveel van de drie bronnen in het lab krijgen in het expertoordeel geloofwaardigheid 1 (bevestigd)? (cijfer)',
          answer: ['0'],
          hints: ['Vergelijk bij alle drie het cijfer in het expertoordeel.', 'Bevestigd betekent: een tweede, onafhankelijke bron zegt hetzelfde.', 'Ook je eigen log is hier nog maar één bron.'],
          wrong: { '1': 'Je eigen log is een A-bron, maar de informatie blijft een 2 zolang geen tweede bron haar bevestigt.' },
          explain: 'Geen enkele. Zelfs je eigen geverifieerde log krijgt een 2 tot bijvoorbeeld de firewall of de VPN-log hetzelfde laat zien. Weeg altijd wie iets zegt én hoe aannemelijk het is.',
        },
        { q: 'Ik heb de drie bronnen in het lab beoordeeld en met het expertoordeel vergeleken.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 6 — Vier manieren om in te grijpen: de interventietypologie',
      tryFirst: true,
      intro: '<p>In het lab staan zestien acties van politie, justitie en hun partners. Ze vallen in vier soorten ingrijpen, vier per soort. Bedenk bij elke actie wat het doel is: iemand voor de rechter krijgen, de keten onwerkbaar maken, slachtoffers voorkomen, of een dader een andere kant op sturen.</p>',
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
          q: 'Vind in het lab de vier groepen van vier. Welke vlag verschijnt?',
          answer: ['NM{vier_knoppen_tegen_de_keten}'],
          hints: ['Begin met de acties die over één persoon en een rechtszaak gaan.', 'Twijfel je tussen verstoren en preventief: richt de actie zich op de infrastructuur van de daders, of op mogelijke slachtoffers?', 'Het lab meldt het als drie van de vier bij elkaar horen. Wissel er dan één.'],
          explain: 'Strafrechtelijk, verstoren, preventief en alternatief. Een traject dat een jonge first-offender naar een legale carrière ombuigt, hoort bij de laatste groep.',
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
      lab: {
        type: 'connections',
        title: 'welk soort ingrijpen?',
        prompt: 'Zestien acties, vier interventietypen. Vraag je bij elke actie af wat het directe doel is.',
        flag: 'NM{vier_knoppen_tegen_de_keten}',
        groups: [
          { name: 'Strafrechtelijk', items: ['Een verdachte aanhouden', 'Laptops en telefoons in beslag nemen als bewijs', 'Om uitlevering van een verdachte vragen', 'Een zaak voor de rechter brengen'] },
          { name: 'Verstoren', items: ['De servers van een leksite overnemen', 'De domeinen van een botnet offline halen', 'Op een forum laten zien dat de politie meelas', 'Het beheerpaneel van een ransomwaregroep infiltreren'] },
          { name: 'Preventief', items: ['Bedrijven waarschuwen voor een kwetsbare VPN', 'Een gratis decryptietool aanbieden aan slachtoffers', 'Voorlichting op scholen over geldezels', 'Een phishingpagina laten weghalen voordat er slachtoffers vallen'] },
          { name: 'Alternatief', items: ['Een leertraject voor een jonge first-offender', 'Een jonge hacker koppelen aan een mentor uit de securitybranche', 'Een stage bij een securitybedrijf als onderdeel van het traject', 'Begeleiding en een gesprek met de ouders in plaats van vervolging'] },
        ],
      },
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
          hints: ['Kijk in de tabel met operaties.', 'Het gaat om jonge first-offenders.', 'Ombuigen in plaats van (alleen) straffen.'],
          explain: 'Hack_Right is een alternatieve (en preventieve) interventie: jong talent weghouden uit de keten.',
        },
        { q: 'Ik kan nu de rollen in de keten en de vier interventietypen benoemen, en een bron wegen met de Admiralty Code. 🕸️', noAnswer: true },
        {
          q: 'Boss: in het lab staan vier fragmenten over de fictieve Operatie Windstil. Ze spreken elkaar tegen. Weeg de bronnen zoals in taak 5 en ga af op wat de best scorende bronnen samen laten zien. Welke rol uit de keten is hier uitgeschakeld?',
          boss: true,
          answer: ['bulletproof hoster', 'bulletproof hosting', 'bulletproof', 'bulletproof-hoster', 'de bulletproof hoster', 'hoster', 'kogelvrije hosting'],
          hints: ['Geef elk fragment eerst een letter voor de bron. Welke twee bronnen kun je het best vertrouwen?', 'Kijk wat er volgens je eigen meting plat ligt. Zijn dat diensten van één groep of van veel verschillende?', 'Zoek in taak 3 de rol die verwijderverzoeken negeert en waar alle anderen hun servers huren.'],
          wrong: {
            '/ontwikkelaar|infostealer|stealer/i': 'Dat beweert alleen het anonieme forumbericht: een bron die je niet kunt beoordelen, en geen ander fragment bevestigt het.',
            '/raas|operator|ransomware/i': 'Eén ransomwaregroep verklaart niet waarom ook phishingpanelen en C2-servers van andere groepen sinds dezelfde nacht onbereikbaar zijn.',
            '/loader/i': 'Een loader-dienst levert malware af. Hier vallen websites en servers van allerlei groepen weg: het gaat om de plek waar ze draaien.',
          },
          explain: 'Het persbericht (officiële bron) en je eigen meting bevestigen elkaar: servers in beslag genomen bij een aanbieder die verwijderverzoeken negeerde, en tegelijk infrastructuur van veel losse groepen offline. Dat is de bulletproof hoster. Het anonieme bericht en de ontkenning op de leksite scoren laag en worden door niets gesteund. Zonder aanhoudingen is dit een verstorende interventie.',
        },
      ],
      lab: {
        type: 'osintpuzzle',
        title: 'Operatie Windstil',
        scenario: 'Vier fragmenten over dezelfde nacht (alles fictief). Niet elke bron is even betrouwbaar, en niet elke bewering even geloofwaardig.',
        records: [
          { title: 'Fragment A', lines: ['Bron: anoniem forumbericht van een nieuw account zonder eerdere berichten.', '"De politie heeft vannacht de maker van een bekende infostealer opgepakt. Alles ligt plat."'] },
          { title: 'Fragment B', lines: ['Bron: persbericht van het Landelijk Parket.', '"In een datacentrum zijn 127 servers in beslag genomen van een aanbieder die verwijderverzoeken jarenlang onbeantwoord liet en zijn klanten anonimiteit beloofde. Er zijn geen aanhoudingen verricht."'] },
          { title: 'Fragment C', lines: ['Bron: je eigen monitoring van bekende criminele infrastructuur.', 'Sinds dezelfde nacht onbereikbaar: 14 leksites, 9 phishingpanelen en 3 C2-servers, van groepen die voor zover bekend niets met elkaar te maken hebben.'] },
          { title: 'Fragment D', lines: ['Bron: bericht op de leksite van een ransomwaregroep.', '"Gepland onderhoud. Wij zijn niet geraakt."'] },
        ],
      },
    },

    {
      title: 'Taak 8: Verdieping: hoe de markt in het echt werkt',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>De keten uit deze room is een model. Het klopt in grote lijnen, maar de werkelijkheid is rommeliger. Wie
        dat weet, trekt minder snel de verkeerde conclusie uit een leksite of een nieuwsbericht.</p>

        <h3>Vertrouwen is de schaarste</h3>
        <p>Criminelen kunnen elkaar niet voor de rechter slepen als een koop misloopt. Markten lossen dat op met
        reputatie (hoe lang bestaat een account, hoeveel deals zijn er gedaan) en met een tussenpersoon die het geld
        vasthoudt tot de koper tevreden is. Toch gaan aanbieders er regelmatig met het geld vandoor. Daarom werkt
        verstoren: als de politie laat zien dat ze in een dienst zat, weet geen klant meer wie hij kan vertrouwen.
        Bij Operatie Cronos (februari 2024) gebruikten de opsporingsdiensten de leksite van LockBit zelf om dat te
        tonen.</p>

        <h3>Rollen lopen door elkaar</h3>
        <p>Eén persoon kan meerdere rollen hebben, en affiliates werken soms voor meerdere ransomwaremerken. Groepen
        stoppen, splitsen en komen onder een andere naam terug. Een merknaam is dus geen dader. Ook de verdeling
        ligt niet vast: 70/30 is een voorbeeld, en de percentages verschillen per programma.</p>

        <h3>Wat een leksite niet laat zien</h3>
        <p>Op een leksite staan in de regel de slachtoffers die niet hebben betaald. Wie snel betaalt, verschijnt
        meestal niet. Tel je posts, dan tel je dus een deel van de aanvallen, en juist niet de succesvolste. Daar
        komen overdreven, oude en verzonnen claims nog bij. Gebruik de aantallen als ondergrens en als trend, niet
        als telling.</p>

        <h3>Wat verstoren oplevert</h3>
        <p>Na een takedown komen diensten vaak terug. LockBit had binnen een week een nieuwe site, en na Operatie
        Endgame (mei 2024) doken sommige loaders in aangepaste vorm weer op. Dat maakt de actie niet zinloos:
        klanten lopen weg, kennis en sleutels komen bij de opsporing terecht, en daders moeten opnieuw investeren.
        Het effect meet je over maanden, aan het aantal affiliates en slachtoffers, niet aan de vraag of de site
        weer online is.</p>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Het ransomwaremerk gelijkstellen aan de dader, terwijl de aanval van een affiliate komt.</li>
          <li>Een leksite-claim overnemen als feit, of juist wegwuiven omdat de bron crimineel is.</li>
          <li>Alleen naar de aanvaller kijken en de toeleveranciers vergeten, terwijl daar de breekpunten zitten.</li>
          <li>Een takedown "mislukt" noemen omdat de dienst na een week weer bereikbaar is.</li>
        </ul>
      `,
      questions: [
        {
          q: 'Een RaaS-programma geeft de affiliate 80% van het losgeld. Een slachtoffer betaalt € 250.000. Hoeveel euro krijgt de operator?',
          answer: ['50000', '50.000', '€50000', '€ 50000', '€ 50.000'],
          hints: ['Welk percentage blijft over voor de operator?', 'De operator krijgt 20%.', 'Een vijfde van 250.000.'],
          wrong: { '200000': 'Dat is het deel van de affiliate. Gevraagd is wat de operator krijgt.', '75000': 'Je rekent met 70/30. Dit programma verdeelt 80/20.' },
          explain: '20% van € 250.000 is € 50.000. De verdeling verschilt per programma; lees dus de bron en neem 70/30 niet als vast gegeven aan.',
        },
        {
          q: 'Een leksite toont deze maand 40 slachtoffers. Stel dat één op de vijf slachtoffers snel betaalt en daarom nooit op de site verschijnt. Hoeveel slachtoffers maakte de groep dan naar schatting?',
          answer: ['50', '50 slachtoffers'],
          hints: ['De 40 getoonde slachtoffers zijn niet het geheel.', 'Als één op de vijf ontbreekt, zie je vier op de vijf.', '40 gedeeld door 4, maal 5.'],
          wrong: { '48': 'Je telt een vijfde van 40 erbij. Maar de 40 zijn zelf vier vijfde van het totaal.', '40': 'Dat zijn alleen de slachtoffers die niet betaalden.', '200': 'Je vermenigvuldigt met vijf. De 40 zijn vier van de vijf delen.' },
          explain: 'De 40 zijn vier vijfde van het totaal, dus het totaal is 50. Het echte aandeel betalers ken je niet; het punt is dat een telling van posts altijd te laag uitkomt.',
        },
        {
          q: 'Een week na een grote takedown heeft de ransomwaregroep een nieuwe leksite online. Een collega zegt: "De operatie is dus mislukt." Wat is de beste reactie?',
          options: [
            'Dat is te vroeg: het effect zit in vertrouwen en capaciteit, en dat meet je over maanden aan affiliates en slachtoffers',
            'Dat klopt: verstoren werkt alleen als de dienst definitief offline blijft',
            'Dat klopt niet: een nieuwe site bewijst dat de groep zwakker is geworden',
            'Dat is niet te zeggen: het effect van verstoren is per definitie onmeetbaar',
          ],
          answer: 0,
          wrong: { 1: 'Verstoren mikt op meer dan bereikbaarheid: klanten lopen weg en daders moeten opnieuw investeren.', 2: 'Een nieuwe site bewijst niets, in geen van beide richtingen.', 3: 'Het is lastig, maar niet onmeetbaar: aantallen affiliates, slachtoffers en betalingen zijn te volgen.' },
          explain: 'Terug online is niet hetzelfde als terug op het oude niveau. Oordeel pas als je de ontwikkeling over langere tijd ziet.',
        },
      ],
    },

    {
      title: 'Taak 9: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examenvragen over het cybercrime-ecosysteem beschrijven een persoon, een dienst of een actie en vragen
        welke rol of welk interventietype dat is. De afleiders zijn andere rollen uit dezelfde keten. Let daarom op
        wat iemand precies verkoopt of doet: gereedschap, gestolen gegevens, toegang, aflevering, een platform, een
        plek om te draaien of schoon geld.</p>
        <p>De vier vragen hieronder zijn zelf geschreven in die stijl. Alle organisaties zijn fictief.</p>
      `,
      questions: [
        {
          q: 'Op een forum biedt iemand voor een vaste prijs aan: "RDP-toegang tot een Nederlands accountantskantoor, 50 werkplekken, beheerrechten op het domein." Hij heeft zelf niets gestolen of versleuteld. Welke rol is dit?',
          options: ['Affiliate', 'Infostealer-operator', 'Initial Access Broker', 'Loader-dienst'],
          answer: 2,
          wrong: { 0: 'Een affiliate koopt zulke toegang en voert daarmee de aanval uit.', 1: 'Een infostealer-operator verkoopt losse logs met wachtwoorden in bulk, geen gecontroleerde toegang tot één netwerk.', 3: 'Een loader-dienst levert malware af op al besmette machines, per installatie.' },
          explain: 'Wie kant-en-klare toegang tot een netwerk verkoopt en verder niets doet, is een Initial Access Broker.',
        },
        {
          q: 'Een ziekenhuis wordt getroffen door ransomware. De offline back-ups zijn intact en na een dag draait alles weer. Toch houdt de groep haar eis staande. Welk drukmiddel heeft ze nog?',
          options: [
            'Geen: met werkende back-ups is de afpersing voorbij',
            'De dreiging om de eerder gestolen gegevens te publiceren',
            'De dreiging om dezelfde bestanden opnieuw te versleutelen',
            'De dreiging om de decryptiesleutel te vernietigen',
          ],
          answer: 1,
          wrong: { 0: 'Dat gold bij enkelvoudige afpersing. Bij dubbele afpersing zijn de gegevens al weg voordat er iets is versleuteld.', 2: 'Dat kan alleen als de aanvaller nog binnen is, en het is niet het drukmiddel waar dit model op rust.', 3: 'Die sleutel heeft het ziekenhuis niet meer nodig.' },
          explain: 'Back-ups beschermen tegen versleuteling, niet tegen een datalek. Dat is de kern van dubbele afpersing.',
        },
        {
          q: 'De politie neemt de servers van een DDoS-huurdienst over en stuurt daarna alle geregistreerde klanten een bericht dat hun gegevens bekend zijn en dat het gebruik strafbaar is. Welke combinatie van interventietypen is dit vooral?',
          options: ['Strafrechtelijk en alternatief', 'Alleen strafrechtelijk', 'Preventief en alternatief', 'Verstoren en preventief'],
          answer: 3,
          wrong: { 0: 'Er wordt niemand vervolgd en er is geen begeleidingstraject.', 1: 'Er zijn in deze beschrijving geen aanhoudingen of rechtszaken.', 2: 'Het waarschuwen is preventief, maar het overnemen van de servers ontbreekt in dit antwoord.' },
          explain: 'De infrastructuur weghalen is verstoren. De klanten waarschuwen moet voorkomen dat zij doorgaan: preventief.',
        },
        {
          q: 'Een ransomwaregroep die eerder vaak echte slachtoffers op haar leksite zette, claimt nu 500 GB te hebben gestolen bij een waterbedrijf. Het bedrijf ontkent en er is geen andere bron. Welke Admiralty-score past het best bij deze claim?',
          options: ['A1', 'C3', 'E5', 'F6'],
          answer: 1,
          wrong: { 0: 'De daders zijn geen volledig betrouwbare bron en de claim is door niemand bevestigd.', 2: 'De groep heeft een trackrecord van echte slachtoffers, en een inbraak is niet onwaarschijnlijk.', 3: 'Je weet wel wie de bron is en hoe die zich eerder gedroeg, dus je kunt beide beoordelen.' },
          explain: 'Tamelijk betrouwbare bron (C) met een belang bij overdrijven, en een onbevestigde claim die mogelijk waar is (3).',
        },
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
