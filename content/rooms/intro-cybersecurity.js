/* Room: Welkom in cybersecurity */
CS.registerRoom({
  id: 'intro-cybersecurity',
  path: 'fundamenten',
  order: 1,
  title: 'Welkom in cybersecurity',
  icon: '🛡️',
  difficulty: 'Makkelijk',
  level: 'Instap',
  checked: '2026-11-12',
  minutes: 55,
  summary: 'Wat cybersecurity is, waarom het ertoe doet, de kernbegrippen (CIA, AAA, risico), wie de aanvallers zijn, welke rollen er bestaan en hoe je hier veilig en legaal leert.',
  objectives: [
    'Uitleggen wat cybersecurity is en waarom het voor organisaties en jezelf belangrijk is',
    'De CIA-triade, authenticiteit en onweerlegbaarheid benoemen en met voorbeelden uitleggen',
    'Het verschil tussen dreiging, kwetsbaarheid en risico beschrijven',
    'De belangrijkste soorten dreigingsactoren en hun motieven herkennen',
    'Veelvoorkomende rollen en loopbanen in security benoemen',
    'De ethische en wettelijke regels in Nederland toepassen (toestemming, 138ab Sr, CVD)',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is cybersecurity en waarom het ertoe doet',
      content: `
        <p><strong>Cybersecurity</strong> (informatiebeveiliging) is alles wat je doet om computers, netwerken,
        apparaten en gegevens te beschermen tegen misbruik, diefstal en uitval. Denk aan het beveiligen van een huis:
        je zet sloten op de deuren (toegangscontrole), hangt camera's op (monitoring), sluit een verzekering af
        (back-ups) en je oefent wat je doet bij inbraak (incident response). Digitaal is het precies zo, alleen zijn
        de "deuren" netwerkpoorten, inlogschermen en software.</p>

        <p>Waarom is dit belangrijk? Vrijwel alles draait tegenwoordig op software: je bank, het ziekenhuis, de
        waterzuivering, je werkgever. Als zo'n systeem plat ligt of gegevens uitlekken, kost dat geld, vertrouwen en
        soms mensenlevens. Een paar <em>echte</em>, gedocumenteerde voorbeelden:</p>
        <ul>
          <li><strong>Universiteit Maastricht (december 2019)</strong>: een ransomware-aanval legde de hele
            universiteit lam vlak voor de kerst. De universiteit betaalde losgeld (enkele tientallen bitcoins) om weer
            toegang tot de eigen bestanden te krijgen.</li>
          <li><strong>DigiNotar (2011)</strong>: bij dit Nederlandse bedrijf dat digitale certificaten uitgaf werd
            ingebroken, waarna valse certificaten werden gemaakt. Het vertrouwen was weg en het bedrijf ging failliet.</li>
          <li><strong>WannaCry (2017)</strong>: een ransomware-worm verspreidde zich wereldwijd en raakte onder meer
            ziekenhuizen in het Verenigd Koninkrijk.</li>
          <li><strong>Log4Shell (2021)</strong>: een kwetsbaarheid in de veelgebruikte softwarebibliotheek Log4j
            waardoor aanvallers op talloze servers code konden uitvoeren.</li>
        </ul>

        <div class="callout info">
          <p><strong>Let op:</strong> dit zijn bestaande, publiek beschreven incidenten. In deze cursus verzinnen we
          nooit "nepnieuws" en presenteren we geen fictieve aanval als echt gebeurd. Oefenverhalen zijn altijd duidelijk
          als oefening herkenbaar (fictieve bedrijven zoals "NederBank").</p>
        </div>

        <p>Cybersecurity gaat niet alleen over hackers die inbreken. Het gaat net zo goed over een stagiair die per
        ongeluk een verkeerd bestand deelt, een harde schijf die stuk gaat, of een leverancier die zijn beveiliging
        niet op orde heeft. Goede beveiliging is dus techniek <em>en</em> mensen <em>en</em> processen samen.</p>

        <p>In Nederland speelt het <strong>NCSC</strong> (Nationaal Cyber Security Centrum) een centrale rol: het
        waarschuwt organisaties, deelt kennis en coördineert bij grote incidenten. Sinds de invoering van Europese
        regels (NIS2, in Nederland de Cyberbeveiligingswet) moeten steeds meer organisaties hun beveiliging aantoonbaar
        op orde hebben en incidenten melden.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'vier incidenten op tijd',
        prompt: 'Zet deze vier echte incidenten in de volgorde waarin ze gebeurden, het oudste bovenaan.',
        items: [
          { id: 'dn', label: 'Inbraak bij certificaatuitgever DigiNotar' },
          { id: 'wc', label: 'Ransomware-worm WannaCry raakt Britse ziekenhuizen' },
          { id: 'um', label: 'Ransomware legt de Universiteit Maastricht plat' },
          { id: 'l4', label: 'Kwetsbaarheid Log4Shell in Log4j wordt bekend' },
        ],
        correct: ['dn', 'wc', 'um', 'l4'],
        flag: 'NM{tien_jaar_incidenten}',
        explain: 'DigiNotar (2011), WannaCry (2017), Universiteit Maastricht (2019) en Log4Shell (2021).',
      },
      questions: [
        {
          q: 'Welke omschrijving past het best bij cybersecurity?',
          options: [
            'Alleen het installeren van antivirussoftware op laptops',
            'Het beschermen van systemen, netwerken en gegevens tegen misbruik, diefstal en uitval, met techniek, mensen en processen',
            'Het bouwen van zo snel mogelijke websites',
          ],
          answer: 1,
          explain: 'Cybersecurity is breder dan techniek alleen: het combineert techniek, mensen en processen om vertrouwelijkheid, integriteit en beschikbaarheid te waarborgen.',
        },
        {
          q: 'Ik begrijp waarom cybersecurity voor een organisatie belangrijk is.',
          noAnswer: true,
        },
        {
          q: 'Zet de vier incidenten in het lab in de juiste volgorde. Welke vlag krijg je?',
          answer: ['NM{tien_jaar_incidenten}'],
          hints: ['De jaartallen staan in de tekst van deze taak.', 'Het oudste incident ging over valse certificaten, het jongste over een softwarebibliotheek.', 'Volgorde: DigiNotar, WannaCry, Maastricht, Log4Shell.'],
          explain: 'Vier heel verschillende incidenten in tien jaar: een inbraak bij een vertrouwde partij, een worm, gerichte ransomware en een fout in een bouwsteen die bijna iedereen gebruikt.',
        },
      ],
    },

    {
      title: 'Taak 2 — De bouwstenen: CIA-triade, authenticiteit, onweerlegbaarheid en AAA',
      tryFirst: true,
      intro: '<p>In het lab staan zestien kaartjes: twaalf dingen die misgaan en vier manieren om te bewijzen wie je bent. Sorteer ze in vier groepen van vier. Bedenk bij elk incident wat er precies beschadigd is: de geheimhouding, de juistheid of de bereikbaarheid.</p>',
      content: `
        <p>Om over beveiliging te praten hebben we een kompas nodig. Het bekendste model is de <strong>CIA-triade</strong>.
        Die heeft niets met de geheime dienst te maken; het staat voor drie eigenschappen die je van informatie wilt
        beschermen:</p>
        <ul>
          <li><strong>Vertrouwelijkheid (Confidentiality)</strong>: alleen wie het mag zien, ziet de gegevens.
            Voorbeeld: je medisch dossier is niet in te zien voor je buurman. Technieken: versleuteling, toegangsrechten,
            wachtwoorden.</li>
          <li><strong>Integriteit (Integrity)</strong>: de gegevens kloppen en zijn niet ongemerkt gewijzigd.
            Voorbeeld: het bedrag op je bankoverschrijving is niet onderweg veranderd. Technieken: hashes,
            digitale handtekeningen, versiebeheer.</li>
          <li><strong>Beschikbaarheid (Availability)</strong>: het systeem werkt wanneer je het nodig hebt.
            Voorbeeld: de webshop ligt niet plat tijdens een uitverkoop. Technieken: back-ups, redundantie,
            bescherming tegen DDoS.</li>
        </ul>

        <figure class="diagram">
          <svg viewBox="0 0 320 210" role="img" aria-label="CIA-triade">
            <polygon points="160,20 290,185 30,185" fill="var(--surface-2)" stroke="currentColor" stroke-width="1.5" />
            <text x="160" y="14" text-anchor="middle" fill="currentColor" font-size="13">Vertrouwelijkheid</text>
            <text x="26" y="200" text-anchor="start" fill="currentColor" font-size="13">Integriteit</text>
            <text x="294" y="200" text-anchor="end" fill="currentColor" font-size="13">Beschikbaarheid</text>
            <text x="160" y="120" text-anchor="middle" fill="currentColor" font-size="13">CIA</text>
          </svg>
          <figcaption>De drie pijlers die je samen in balans wilt houden.</figcaption>
        </figure>

        <p>De triade is een goed begin, maar in de praktijk voegen we er vaak twee eigenschappen aan toe:</p>
        <ul>
          <li><strong>Authenticiteit (Authenticity)</strong>: is iemand of iets echt wie/wat het beweert te zijn?
            Een inlog met je wachtwoord plus een code uit een app bewijst beter dat jij het echt bent.</li>
          <li><strong>Onweerlegbaarheid (non-repudiation)</strong>: achteraf kan iemand niet ontkennen dat hij een
            actie heeft uitgevoerd. Een digitale handtekening op een contract zorgt daarvoor, net als een goed logbestand.</li>
        </ul>

        <p>Een tweede handig model gaat over toegang: <strong>AAA</strong>.</p>
        <ul>
          <li><strong>Authentication (authenticatie)</strong>: bewijzen wie je bent (bijvoorbeeld inloggen).</li>
          <li><strong>Authorization (autorisatie)</strong>: bepalen wat je mag (mag je alleen lezen, of ook verwijderen?).</li>
          <li><strong>Accounting (vastlegging)</strong>: bijhouden wat er is gebeurd (logboeken: wie deed wat, wanneer?).</li>
        </ul>

        <div class="callout tip">
          <p><strong>Ezelsbruggetje:</strong> authenticatie = "wie ben jij?", autorisatie = "wat mag jij?",
          accounting = "wat heb je gedaan?".</p>
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'wat is hier geraakt?',
        prompt: 'Vier groepen van vier: vertrouwelijkheid geschonden, integriteit geschonden, beschikbaarheid geschonden, en authenticatie (bewijzen wie je bent).',
        flag: 'NM{cia_plus_authenticatie}',
        groups: [
          { name: 'Vertrouwelijkheid geschonden', items: ['Klantenlijst staat op een openbaar forum', 'Collega leest het dossier van zijn buurvrouw', 'Onversleutelde laptop gestolen uit de trein', 'Wifi-verkeer in een café afgeluisterd'] },
          { name: 'Integriteit geschonden', items: ['Rekeningnummer op factuur aangepast', 'Cijfer in het studentensysteem veranderd', 'Homepage vervangen door een leus', 'Dosering in een medicatielijst gewijzigd'] },
          { name: 'Beschikbaarheid geschonden', items: ['DDoS legt de webshop plat', 'Stroomstoring in de serverruimte', 'Enige back-upschijf is defect', 'Kassasysteem valt uit op zaterdag'] },
          { name: 'Authenticatie', items: ['Pincode intypen', 'Vingerafdruk op je telefoon', 'Code uit een authenticator-app', 'Toegangspas scannen bij de deur'] },
        ],
      },
      questions: [
        {
          q: 'Sorteer de zestien kaartjes in het lab. Welke vlag krijg je als alle vier de groepen kloppen?',
          answer: ['NM{cia_plus_authenticatie}'],
          hints: ['Begin met de vier kaartjes die geen incident zijn.', 'Vraag je bij elk incident af: is er iets uitgelekt, iets veranderd, of werkt iets niet meer?', 'Een bekladde homepage is veranderde inhoud: integriteit.'],
          wrong: {
            '/^nm\\{cia/': 'Bijna. Neem de vlag precies over zoals hij onder het bord staat.',
          },
          why: 'Bij elk incident is dit de eerste vraag van een analist: wat is er geraakt? Het antwoord bepaalt wie je moet waarschuwen en welke maatregel helpt.',
          explain: 'Uitgelekt is vertrouwelijkheid, ongemerkt veranderd is integriteit, niet bereikbaar is beschikbaarheid. De vierde groep bewijst wie je bent: authenticatie.',
        },
        {
          q: 'Een aanvaller verandert stiekem het rekeningnummer in een factuur. Welke eigenschap is hier geschonden?',
          options: ['Vertrouwelijkheid', 'Integriteit', 'Beschikbaarheid'],
          answer: 1,
          explain: 'De gegevens zijn ongemerkt gewijzigd, dus de integriteit is aangetast.',
        },
        {
          q: 'Een helpdeskmedewerker (1) logt in met wachtwoord en code, (2) opent een klantdossier waar zijn functie recht op geeft, en (3) het systeem schrijft dat weg in een logboek. Welke stap is autorisatie? Geef het nummer.',
          answer: ['2'],
          hints: ['De drie stappen zijn precies de drie A\'s, in volgorde.', 'Autorisatie gaat over wat je mag, niet over wie je bent.', 'Inloggen is stap 1; het logboek is stap 3.'],
          wrong: {
            '1': 'Inloggen bewijst wie je bent: dat is authenticatie.',
            '3': 'Wegschrijven in een logboek is accounting (vastlegging).',
          },
          explain: 'Stap 1 is authenticatie (wie ben je?), stap 2 autorisatie (wat mag je?) en stap 3 accounting (wat heb je gedaan?).',
        },
        {
          q: 'Welk begrip zorgt dat iemand achteraf niet kan ontkennen dat hij een bericht of actie heeft uitgevoerd?',
          answer: ['onweerlegbaarheid', 'non-repudiation', 'non repudiation'],
          hint: 'Denk aan een digitale handtekening.',
          explain: 'Onweerlegbaarheid (non-repudiation) maakt een actie onloochenbaar, bijvoorbeeld via een digitale handtekening.',
        },
      ],
    },

    {
      title: 'Taak 3 — Dreiging, kwetsbaarheid en risico',
      tryFirst: true,
      intro: '<p>Je adviseert de eigenaar van de fictieve Fietsenwinkel De Vaart. In het lab neem je vijf beslissingen over zijn risico\'s. Kies steeds wat je zou doen en lees de feedback. Daarna reken je twee risicoscores uit.</p>',
      content: `
        <p>Drie woorden die vaak door elkaar worden gebruikt, maar die iets heel verschillends betekenen. Snap je het
        verschil, dan snap je het hart van security.</p>
        <ul>
          <li><strong>Dreiging (threat)</strong>: iets of iemand dat schade <em>kan</em> veroorzaken. Bijvoorbeeld een
            ransomwaregroep, een boze oud-medewerker, of een brand in het serverhok.</li>
          <li><strong>Kwetsbaarheid (vulnerability)</strong>: een zwakke plek die misbruikt kan worden. Bijvoorbeeld
            een niet-gepatchte server, een zwak wachtwoord, of een deur die niet op slot kan.</li>
          <li><strong>Risico (risk)</strong>: de kans dat een dreiging een kwetsbaarheid misbruikt, maal de impact die
            dat heeft. Kort gezegd: <strong>risico &asymp; kans &times; impact</strong>.</li>
        </ul>

        <p>Een analogie: een dief in de buurt is de <em>dreiging</em>. Een raam dat niet op slot kan is de
        <em>kwetsbaarheid</em>. Het <em>risico</em> is hoe waarschijnlijk het is dat die dief via dat raam binnenkomt,
        en hoeveel schade dat dan oplevert. Woon je op de tiende verdieping, dan is de kans (en dus het risico) laag,
        ook al bestaan de dreiging en de kwetsbaarheid allebei.</p>

        <p>Hierdoor kun je verstandig kiezen. Je kunt nooit alles tegelijk oplossen, dus je pakt eerst de risico's met
        de grootste kans <em>en</em> de grootste impact aan. Dit heet <strong>risicomanagement</strong>. Je kunt een
        risico:</p>
        <ul>
          <li><strong>verkleinen</strong> (patchen, wachtwoord sterker maken) &mdash; een <em>maatregel</em> (control);</li>
          <li><strong>overdragen</strong> (een verzekering afsluiten);</li>
          <li><strong>accepteren</strong> (bewust besluiten ermee te leven als kans en impact klein zijn);</li>
          <li><strong>vermijden</strong> (de riskante activiteit helemaal niet doen).</li>
        </ul>

        <div class="callout info">
          <p><strong>Voorbeeld:</strong> een webserver draait een oude versie met een bekende kwetsbaarheid
          (<em>vulnerability</em>). Er zijn actieve aanvallers die daar scripts voor hebben (<em>threat</em>). De kans
          dat de server wordt overgenomen is hoog en de impact (klantgegevens lekken) is groot, dus het
          <em>risico</em> is hoog. De maatregel: direct updaten.</p>
        </div>
      `,
      lab: {
        type: 'scenario',
        title: 'risico\'s wegen bij Fietsenwinkel De Vaart',
        scenario: 'Fietsenwinkel De Vaart (fictief) heeft een webshop, een kassa-pc en een klantenbestand. De eigenaar heeft weinig tijd en geld. Jij helpt kiezen.',
        pass: 4,
        flag: 'NM{risico_is_kans_maal_impact}',
        steps: [
          { situation: 'De webshop draait op software die twee jaar geen updates kreeg. Op internet zoeken scanners actief naar precies deze versie. Wat is hier de kwetsbaarheid?', choices: [
            { label: 'De verouderde, ongepatchte software', good: true, feedback: 'De zwakke plek zit in de software zelf.' },
            { label: 'De scanners die het internet afzoeken', feedback: 'Dat is de dreiging: iets dat de zwakke plek kan misbruiken.' },
            { label: 'Het uitlekken van klantgegevens', feedback: 'Dat is de mogelijke impact, niet de zwakke plek.' },
          ] },
          { situation: 'Twee risico\'s, elk gescoord van 1 tot 5. Risico A: kans 4, impact 2. Risico B: kans 2, impact 5. Welke pak je eerst aan?', choices: [
            { label: 'Risico A, want de kans is het grootst', feedback: 'Kans alleen zegt te weinig. A scoort 4 x 2 = 8.' },
            { label: 'Risico B, want kans maal impact is het hoogst', good: true, feedback: 'B scoort 2 x 5 = 10, A scoort 8.' },
            { label: 'Het maakt niet uit, ze zijn even groot', feedback: 'Reken het uit: 8 tegen 10.' },
          ] },
          { situation: 'De kassa-pc draait een besturingssysteem dat geen updates meer krijgt. Vervangen kan pas volgend jaar. De kassa heeft geen internet nodig.', choices: [
            { label: 'Niets doen tot de vervanging', feedback: 'Dat is accepteren zonder dat de kans of impact klein is.' },
            { label: 'De kassa in een eigen netwerk zonder internet zetten', good: true, feedback: 'Je verkleint de kans dat iemand de zwakke plek kan bereiken.' },
            { label: 'Alleen een cyberverzekering afsluiten', feedback: 'Overdragen dekt de schade, maar de kassa blijft even bereikbaar voor een aanvaller.' },
          ] },
          { situation: 'De eigenaar wil geboortedatums van klanten verzamelen voor een verjaardagsmail. Het levert weinig op en het bestand wordt gevoeliger.', choices: [
            { label: 'Verzamelen en het bestand versleutelen', feedback: 'Dat verkleint het risico, maar het nut blijft klein. Er is een eenvoudiger keuze.' },
            { label: 'De geboortedatums niet verzamelen', good: true, feedback: 'Vermijden: wat je niet hebt, kan niet lekken.' },
            { label: 'Verzamelen en het risico accepteren', feedback: 'Accepteren past bij een kleine kans en kleine impact. Hier maak je de impact juist groter.' },
          ] },
          { situation: 'Het reserveringsbord in de werkplaats is een losse tablet zonder klantgegevens. Hij kan uitvallen; dan schrijft de monteur het op papier.', choices: [
            { label: 'Een tweede tablet en een onderhoudscontract kopen', feedback: 'De maatregel kost meer dan de schade die je voorkomt.' },
            { label: 'Het risico bewust accepteren en dat opschrijven', good: true, feedback: 'Kleine kans, kleine impact: accepteren is hier een nette, bewuste keuze.' },
            { label: 'De werkplaats sluiten als de tablet uitvalt', feedback: 'Dat maakt de impact groter dan het probleem.' },
          ] },
        ],
      },
      questions: [
        {
          q: 'Een risicomatrix scoort kans en impact elk van 1 tot 5. Risico A: kans 4, impact 2. Risico B: kans 2, impact 5. Welke score heeft het grootste risico?',
          answer: ['10'],
          hints: ['Reken voor beide risico\'s de score uit.', 'De score is kans maal impact.', 'A is 8. Wat is B?'],
          wrong: {
            '8': 'Dat is de score van risico A. Risico B scoort hoger.',
            '7': 'Je telt kans en impact op. De vuistregel is kans maal impact.',
            'b': 'Klopt, B is het grootste. Gevraagd is de score van B.',
          },
          explain: 'A = 4 x 2 = 8 en B = 2 x 5 = 10. Een kleine kans op grote schade kan zwaarder wegen dan een grote kans op kleine schade.',
        },
        {
          q: 'Neem de vijf beslissingen in het lab. Welke vlag krijg je bij minstens vier goede keuzes?',
          answer: ['NM{risico_is_kans_maal_impact}'],
          hints: ['Lees bij een foute keuze de feedback en speel het scenario opnieuw.', 'De vier behandelingen zijn verkleinen, overdragen, accepteren en vermijden. Elke situatie past bij één ervan.', 'Een verzekering verkleint de kans niet; niet verzamelen is vermijden.'],
          explain: 'Je koos per situatie tussen verkleinen, overdragen, accepteren en vermijden. Accepteren is alleen een nette keuze als je het bewust doet en vastlegt.',
        },
        {
          q: 'Een risico scoort kans 4 en impact 5. Na een maatregel is de kans 1; de impact blijft gelijk. Met hoeveel punten daalt de risicoscore?',
          answer: ['15', 'vijftien'],
          hints: ['Reken de score voor en na de maatregel uit.', 'Voor: 4 x 5. Na: 1 x 5.', '20 min 5.'],
          wrong: {
            '5': 'Dat is de score na de maatregel. Gevraagd is het verschil.',
            '3': 'De kans daalt met 3, maar de score is kans maal impact.',
          },
          explain: 'De score gaat van 20 naar 5: een daling van 15 punten. De maatregel pakt alleen de kans aan; de impact blijft even groot.',
        },
      ],
    },

    {
      title: 'Taak 4 — Wie zijn de aanvallers? Dreigingsactoren en motieven',
      tryFirst: true,
      intro: '<p>Hieronder staat het incidentenregister van de fictieve gemeente Waterdam. Lees de tien meldingen en bedenk bij elke melding wie erachter zit en wat die wil. Het filter boven het log helpt bij het zoeken.</p>',
      content: `
        <p>"Hackers" is een te breed woord. Om je te verdedigen helpt het om te weten <em>wie</em> je mogelijk aanvalt
        en <em>waarom</em>. Dat noemen we <strong>dreigingsactoren</strong> (threat actors). De belangrijkste soorten:</p>

        <table>
          <thead>
            <tr><th>Actor</th><th>Motief</th><th>Typisch gedrag</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Cybercriminelen</strong></td><td>Geld</td><td>Ransomware, bankfraude, phishing, verkoop van gestolen data</td></tr>
            <tr><td><strong>Statelijke actoren</strong><br>(nation-state / APT)</td><td>Spionage, sabotage, geopolitiek</td><td>Geduldig, goed gefinancierd, langdurig verborgen (Advanced Persistent Threat)</td></tr>
            <tr><td><strong>Hacktivisten</strong></td><td>Een ideaal of protest</td><td>Websites platleggen (DDoS), defacement, datalekken uit protest</td></tr>
            <tr><td><strong>Insiders</strong></td><td>Wraak, geld, of per ongeluk</td><td>Misbruik van eigen toegang; soms gewoon een fout</td></tr>
            <tr><td><strong>Script kiddies</strong></td><td>Status, nieuwsgierigheid, verveling</td><td>Gebruiken kant-en-klare tools zonder de techniek echt te begrijpen</td></tr>
          </tbody>
        </table>

        <p>Een paar nuances die in de praktijk belangrijk zijn:</p>
        <ul>
          <li><strong>Insiders</strong> worden vaak onderschat. Lang niet elke insider is kwaadwillend: iemand die op
            een phishinglink klikt of een usb-stick van de parkeerplaats insteekt, veroorzaakt ook schade. Daarom zijn
            bewustwording (awareness) en minimale rechten (least privilege) zo belangrijk.</li>
          <li><strong>Statelijke actoren</strong> (ook APT genoemd) hebben veel tijd en geld. Ze vallen niet lukraak
            aan, maar richten zich op specifieke doelen zoals overheden, defensie of kennisinstellingen.</li>
          <li><strong>Script kiddies</strong> zijn technisch zwak, maar niet ongevaarlijk: de tools die ze downloaden
            zijn soms krachtig genoeg om een slecht beveiligd systeem over te nemen.</li>
        </ul>

        <p>Het begrip <strong>hacker</strong> zelf is niet per definitie slecht. We onderscheiden vaak
        <em>black hat</em> (kwaadwillend), <em>white hat</em> (ethisch, met toestemming) en <em>grey hat</em>
        (ertussenin, zoekt soms zonder toestemming maar zonder kwade bedoeling). In deze cursus leer je de white-hat
        aanpak.</p>
      `,
      lab: {
        type: 'logs',
        title: 'incidentenregister gemeente Waterdam (fictief)',
        lines: `2026-03-02  INC-0141  Website 4 uur onbereikbaar door DDoS. Op sociale media opgeeist door de groep "VrijeDijk", uit protest tegen het raadsbesluit over de dijkverzwaring.
2026-03-09  INC-0147  Medewerker p.jansen mailt per ongeluk een bestand met 212 adressen naar de verkeerde ontvanger.
2026-03-15  INC-0152  Fileserver Burgerzaken versleuteld. Losgeldbrief eist betaling in bitcoin.
2026-03-21  INC-0158  9.400 inlogpogingen in 3 minuten op het beheerportaal vanaf 198.51.100.44, met een bekend gratis scanscript en standaardwachtwoorden. Geen succes.
2026-04-02  INC-0163  Mailbox van een wethouder blijkt 7 maanden heimelijk meegelezen. Op maat gemaakte malware, geen losgeldeis. Alleen dossiers over de havenuitbreiding zijn gekopieerd.
2026-04-11  INC-0170  Phishingmail met nepfactuur van "PakketPost". Twee medewerkers vulden hun wachtwoord in; daarna pogingen om betaalopdrachten te versturen.
2026-04-19  INC-0174  Homepage vervangen door een leus tegen de dijkverzwaring, ondertekend met "VrijeDijk was hier".
2026-04-27  INC-0181  Vertrekkend medewerker k.smit kopieert 3.100 dossiers naar een eigen opslagdienst, twee dagen voor zijn laatste werkdag.
2026-05-06  INC-0188  Medewerker steekt een op de parkeerplaats gevonden usb-stick in haar werkplek. De antivirus blokkeert het bestand.
2026-05-14  INC-0193  Nepfactuur met gewijzigd rekeningnummer betaald: 18.400 euro kwijt.
`,
      },
      questions: [
        {
          q: 'Hoeveel meldingen in het register passen bij een insider, bewust of per ongeluk?',
          answer: ['3', 'drie'],
          hints: ['Een insider is iemand met eigen toegang. Die hoeft niet kwaadwillend te zijn.', 'Zoek naar meldingen waarin een medewerker zelf iets doet.', 'INC-0147, INC-0181 en nog een melding in mei.'],
          wrong: {
            '1': 'Je telt alleen de bewuste insider. Een fout van een medewerker telt ook.',
            '2': 'Je mist er een. Ook de gevonden usb-stick is een insider die per ongeluk een risico veroorzaakt.',
            '5': 'De phishing en de nepfactuur komen van buiten: daar is de medewerker het doelwit, niet de bron.',
          },
          explain: 'INC-0147 (verkeerd gemaild), INC-0181 (dossiers meegenomen) en INC-0188 (usb-stick). Twee van de drie zijn ongelukken.',
        },
        {
          q: 'Welk incidentnummer past het best bij een statelijke actor?',
          answer: ['INC-0163', '0163', 'inc0163', 'inc 0163'],
          hints: ['Statelijke actoren zijn geduldig en zoeken informatie, geen geld.', 'Zoek een melding zonder losgeldeis die maanden duurde.', 'Het gaat om de mailbox van een wethouder.'],
          wrong: {
            'inc-0152': 'Ransomware met een losgeldeis wijst op cybercriminelen: het motief is geld.',
            'inc-0141': 'Een DDoS uit protest, openlijk opgeeist, past bij hacktivisten.',
            'inc-0158': 'Veel lawaai met een gratis script en standaardwachtwoorden past bij een script kiddie.',
          },
          explain: 'Zeven maanden onopgemerkt, maatwerk, geen geldeis en alleen dossiers over een strategisch onderwerp: dat is het profiel van spionage.',
        },
        {
          q: 'Welk account hoort bij de insider die bewust gegevens meenam?',
          answer: ['k.smit', 'ksmit', 'k smit'],
          hints: ['Er zijn twee medewerkers met naam genoemd.', 'Eén maakte een fout, de ander handelde vlak voor zijn vertrek.', 'Filter op "dossiers".'],
          wrong: {
            'p.jansen': 'p.jansen mailde per ongeluk een bestand naar de verkeerde ontvanger. Dat is een fout, geen opzet.',
          },
          explain: 'k.smit kopieerde 3.100 dossiers twee dagen voor zijn laatste werkdag. Het moment en de omvang wijzen op opzet.',
        },
        {
          q: 'Hoeveel meldingen zijn het werk van de hacktivistengroep?',
          answer: ['2', 'twee'],
          hints: ['Hacktivisten willen gehoord worden: ze eisen hun actie op.', 'Filter op de naam van de groep.', 'Een DDoS in maart en een bekladde homepage in april.'],
          explain: 'INC-0141 (DDoS) en INC-0174 (defacement) zijn allebei opgeeist door VrijeDijk, met hetzelfde protest als motief.',
        },
      ],
    },

    {
      title: 'Taak 5 — Rollen en loopbanen in cybersecurity',
      content: `
        <p>Security is een vak met heel veel richtingen. Of je nu graag aanvalt, verdedigt, onderzoekt of beleid maakt:
        er is een plek voor je. De grote tweedeling is <strong>offensief</strong> (red) versus <strong>defensief</strong>
        (blue).</p>

        <ul>
          <li><strong>Red team</strong>: speelt de aanvaller. Zoekt zwakke plekken door een echte aanval na te bootsen,
            zodat de organisatie leert waar het misgaat. Een <strong>pentester</strong> (penetratietester) doet
            afgebakende, afgesproken tests op systemen of applicaties.</li>
          <li><strong>Blue team</strong>: verdedigt. Houdt systemen in de gaten, zet verdediging op en reageert op
            aanvallen. Hieronder vallen de <strong>SOC-analist</strong> (bewaakt meldingen in een Security Operations
            Center), de <strong>incident responder</strong> (onderzoekt en bestrijdt actieve incidenten) en de
            <strong>security engineer</strong> (bouwt en beheert de beveiligingstechniek, zoals firewalls en logging).</li>
          <li><strong>Purple team</strong>: geen apart team maar een <em>samenwerking</em> tussen red en blue. Rood valt
            aan en deelt direct wat werkte; blauw verbetert meteen de detectie en verdediging. Zo leer je het snelst.</li>
        </ul>

        <p>Daarnaast zijn er rollen die minder met de techniek en meer met organisatie en beleid te maken hebben:</p>
        <ul>
          <li><strong>GRC / security officer</strong>: Governance, Risk &amp; Compliance. Zorgt dat de organisatie zich
            aan wetten, normen (zoals ISO 27001) en eigen beleid houdt, en dat risico's bewust worden beheerd.</li>
          <li><strong>Security engineer / architect</strong>: ontwerpt en bouwt veilige systemen en infrastructuur.</li>
        </ul>

        <div class="callout tip">
          <p><strong>Tip:</strong> je hoeft niet te kiezen op dag één. Veel mensen beginnen als SOC-analist of in de IT
          (zoals jij) en groeien van daaruit door naar red of blue, of naar GRC. De basis die je hier leert &mdash;
          netwerken, systemen, denken als aanvaller &eacute;n verdediger &mdash; heb je overal nodig.</p>
        </div>
      `,
      questions: [
        {
          q: 'Welk team speelt de aanvaller om de verdediging te testen?',
          options: ['Blue team', 'Red team', 'Purple team'],
          answer: 1,
          explain: 'Het red team bootst een aanval na. Het blue team verdedigt; purple is de samenwerking tussen beide.',
        },
        {
          q: 'Hoe heet de analist die in een Security Operations Center de binnenkomende meldingen bewaakt?',
          answer: ['soc-analist', 'soc analist', 'socanalist', 'soc-analyst'],
          hint: 'De afkorting staat voor Security Operations Center.',
          explain: 'Een SOC-analist monitort meldingen en alarmeert wanneer er iets verdachts gebeurt.',
        },
      ],
    },

    {
      title: 'Taak 6 — Ethiek en de wet in Nederland',
      tryFirst: true,
      intro: '<p>Je bestelt een fietsbel bij de fictieve webshop fietsenwinkel-devaart.example en ziet per ongeluk de bestelling van een andere klant. In de map <code>melding/</code> staat wat de winkel zelf over meldingen publiceert. Zoek uit waar je moet melden en aan welke voorwaarden je je houdt. Gebruik <code>ls</code>, <code>cd</code> en <code>cat</code>.</p>',
      content: `
        <p>Dit is misschien wel de belangrijkste taak van de hele cursus. De technieken die je gaat leren, zijn krachtig.
        Ze op de verkeerde plek gebruiken is <strong>strafbaar</strong>, ook als je "alleen even wilde kijken" en niets
        kapotmaakt.</p>

        <div class="callout danger">
          <p><strong>Belangrijk:</strong> inbreken in een computer of netwerk dat niet van jou is, zonder toestemming,
          heet <strong>computervredebreuk</strong> en is strafbaar onder <strong>artikel 138ab van het Wetboek van
          Strafrecht (Sr)</strong>. Je hoeft geen schade aan te richten; alleen al binnendringen is genoeg.</p>
        </div>

        <p>De gouden regel: <strong>je hackt alleen je eigen systemen, of systemen waarvoor je vooraf schriftelijke
        toestemming hebt</strong>. Bij een professionele pentest wordt dit vastgelegd in een opdracht met een duidelijke
        <em>scope</em> (wat mag wel en niet) en een periode. Geen toestemming op papier betekent: niet doen.</p>

        <p>Wat als je per ongeluk een kwetsbaarheid vindt in een systeem van iemand anders, bijvoorbeeld in een website?
        Dan is er een nette weg: <strong>Coordinated Vulnerability Disclosure (CVD)</strong>. Je meldt de kwetsbaarheid vertrouwelijk bij de
        eigenaar, volgens diens CVD-beleid (vaak te vinden via <code>/.well-known/security.txt</code>, een vast formaat uit RFC 9116 van 2022); het <strong>NCSC</strong> neemt meldingen
        aan over de Rijksoverheid en vitale aanbieders en kan bemiddelen, geeft ze tijd om het op te lossen en maakt het niet meteen wereldkundig. Je gaat ook niet verder graven
        dan nodig om het probleem aan te tonen. Veel organisaties hebben hiervoor een <em>responsible disclosure</em>- of
        CVD-beleid op hun website staan.</p>

        <p>Nog een paar belangrijke spelers en regels in Nederland:</p>
        <ul>
          <li><strong>Autoriteit Persoonsgegevens (AP)</strong>: houdt toezicht op de bescherming van persoonsgegevens
            (AVG/GDPR). Een datalek met persoonsgegevens moet je vaak melden.</li>
          <li><strong>Politie</strong>: het Team High Tech Crime pakt zware cybercriminaliteit aan.</li>
          <li><strong>Cyberbeveiligingswet (NIS2)</strong>: verplicht veel organisaties om hun beveiliging op orde te
            hebben en incidenten te melden.</li>
        </ul>

        <p>Kortom: wees nieuwsgierig, oefen volop &mdash; maar doe dat in je eigen lab (zoals dit portaal) of met
        expliciete toestemming. Ethiek is niet het saaie deel; het is wat een hacker onderscheidt van een crimineel.</p>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student',
        host: 'nm-lab',
        home: '/home/student',
        cwd: '/home/student',
        motd: 'In de map melding/ staat wat de webshop publiceert. Typ help voor de commando\'s.',
        fs: {
          '/home/student/melding/security.txt': '# security.txt van fietsenwinkel-devaart.example\nContact: mailto:security@fietsenwinkel-devaart.example\nExpires: 2027-06-30T22:00:00.000Z\nPreferred-Languages: nl, en\nPolicy: https://fietsenwinkel-devaart.example/cvd-beleid\nCanonical: https://fietsenwinkel-devaart.example/.well-known/security.txt\n',
          '/home/student/melding/cvd-beleid.txt': 'CVD-BELEID FIETSENWINKEL DE VAART (fictief)\n\nHeb je een zwakke plek gevonden? Meld het ons.\n\nWat wij van jou vragen:\n- Meld het zo snel mogelijk via het adres in security.txt.\n- Kijk niet verder dan nodig is om het probleem aan te tonen.\n- Kopieer, wijzig of verwijder geen gegevens van anderen.\n- Geen denial-of-service, geen social engineering, geen fysieke toegang.\n- Maak het probleem niet openbaar voordat wij het hebben opgelost. Wij vragen daarvoor 90 dagen.\n\nWat jij van ons mag verwachten:\n- Een reactie binnen 5 werkdagen.\n- Houd je je aan deze regels, dan doen wij geen aangifte.\n',
          '/home/student/melding/mijn-notities.txt': 'Bestelling 10482 geopend, per ongeluk 10481 in de adresbalk getypt.\nZag naam en adres van een andere klant.\nNiet verder geklikt. Schermafbeelding gemaakt van de adresbalk, zonder de gegevens.\n',
        },
      },
      questions: [
        {
          q: 'Welk artikel uit het Wetboek van Strafrecht maakt computervredebreuk (binnendringen zonder toestemming) strafbaar? Geef het artikelnummer.',
          answer: ['138ab', '138ab sr', 'art. 138ab sr', 'artikel 138ab sr', 'art 138ab'],
          hints: ['Het staat in het rode kader van de uitleg.', 'Het nummer begint met 138 en heeft twee letters erachter.', '138 en dan a en b.'],
          wrong: {
            '138': 'Artikel 138 Sr gaat over huisvredebreuk. De digitale variant heeft twee letters achter het nummer.',
            '138a': 'Bijna. Het artikel over computervredebreuk heeft twee letters: ab.',
          },
          why: 'Dit artikel is de grens tussen oefenen en een strafbaar feit. Een pentester werkt daarom alleen met een schriftelijke opdracht waarin de scope staat.',
          explain: 'Artikel 138ab Sr stelt computervredebreuk strafbaar; alleen binnendringen is al genoeg.',
        },
        {
          q: 'Je ontdekt per ongeluk een kwetsbaarheid in de website van een ander bedrijf. Wat is de juiste eerste stap?',
          options: [
            'De kwetsbaarheid meteen misbruiken om te kijken hoe ver je komt',
            'Het vertrouwelijk melden via Coordinated Vulnerability Disclosure (eigenaar of NCSC)',
            'Direct online publiceren met een kant-en-klare exploit',
          ],
          answer: 1,
          wrong: {
            0: 'Verder graven dan nodig is om het probleem aan te tonen valt buiten elk CVD-beleid en kan strafbaar zijn.',
            2: 'Publiceren voordat de eigenaar het kan oplossen brengt alle gebruikers in gevaar.',
          },
          explain: 'Via CVD meld je het vertrouwelijk en geef je de eigenaar tijd om het op te lossen. Verder graven of publiceren mag niet.',
        },
        {
          q: 'Naar welk e-mailadres meld je de kwetsbaarheid bij deze webshop?',
          answer: ['security@fietsenwinkel-devaart.example', 'mailto:security@fietsenwinkel-devaart.example'],
          hints: ['De winkel publiceert een bestand met een vaste naam.', 'Lees melding/security.txt met cat.', 'Kijk naar de regel die met Contact begint.'],
          wrong: {
            '/^https?:/': 'Dat is de regel Policy of Canonical. Het meldadres staat achter Contact.',
            '/info@|klantenservice/': 'Een algemeen adres komt vaak niet bij de juiste persoon terecht. Gebruik het adres uit security.txt.',
          },
          explain: 'In security.txt staat achter Contact het adres waar de winkel meldingen wil ontvangen.',
        },
        {
          q: 'Hoeveel dagen vraagt het CVD-beleid van de winkel voordat je iets openbaar maakt?',
          answer: ['90', '90 dagen'],
          hints: ['Dit staat niet in security.txt zelf, maar in het beleid waar het naar verwijst.', 'Lees melding/cvd-beleid.txt.', 'Zoek de regel over openbaar maken.'],
          wrong: {
            '5': 'Vijf werkdagen is de termijn waarbinnen de winkel reageert. De termijn voor openbaar maken is langer.',
          },
          explain: 'De winkel vraagt 90 dagen om het probleem op te lossen. Reageren doet ze binnen 5 werkdagen.',
        },
      ],
    },

    {
      title: 'Taak 7 — Hoe dit portaal werkt: jouw eerste vlag',
      content: `
        <p>Tijd om te oefenen. Dit portaal werkt net als bekende oefenplatforms: je leest, je doet, en je bewijst dat je
        iets kunt vinden door een <strong>vlag</strong> (flag) in te leveren. Zo werkt het:</p>
        <ul>
          <li><strong>Vlaggen</strong> hebben altijd het formaat <code>NM{iets_met_kleine_letters}</code>. Vind je zo'n
            tekst, dan plak je die in het antwoordveld. Hoofdletters en spaties aan het begin of eind maken niet uit.</li>
          <li><strong>Labs</strong> zijn kleine, veilige oefenomgevingen in je browser: een terminal, een loginformulier,
            een logviewer, enzovoort. Alles is nagebootst; je breekt dus nergens echt in.</li>
          <li><strong>XP</strong> (ervaringspunten) verdien je met elke goed beantwoorde vraag. Zo zie je je voortgang.</li>
        </ul>

        <p>Hieronder staat een echte terminal (bash). De belangrijkste vaardigheid in security is: <em>rondkijken</em>.
        Doe het volgende, precies in deze volgorde. Typ elk commando en druk op Enter:</p>
        <ol>
          <li>Typ <code>ls</code> om te zien welke bestanden er in je map staan.</li>
          <li>Je ziet onder andere <code>welkom.txt</code>. Typ <code>cat welkom.txt</code> om de inhoud te lezen.</li>
          <li>In dat bestand staat jouw eerste vlag. Kopieer die (de hele tekst vanaf <code>NM{</code> tot en met de
            <code>}</code>) naar het antwoordveld.</li>
        </ol>

        <div class="callout tip">
          <p><strong>Handig:</strong> <code>ls</code> = "list", toont bestanden en mappen. <code>cat</code> = "concatenate",
          toont de inhoud van een bestand. Met <code>cat README.txt</code> lees je ook meteen de uitleg in de map.</p>
        </div>

        <p>Twee dingen die je daarna nodig hebt: <code>ls -a</code> toont ook verborgen bestanden (namen die met een punt
        beginnen), en met <code>cd mapnaam</code> ga je een map in (<code>cd ..</code> brengt je terug).</p>

        <p>Lukt het niet meteen? Typ <code>help</code> voor een overzicht van de beschikbare commando's. Rustig
        rondkijken mag altijd: in een lab kun je niets stukmaken.</p>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student',
        host: 'nm-lab',
        home: '/home/student',
        cwd: '/home/student',
        motd: 'Welkom in je eerste lab! Typ "ls" en daarna "cat welkom.txt". Typ help voor alle commando\'s.',
        fs: {
          '/home/student/welkom.txt': 'Gefeliciteerd, je hebt je eerste bestand geopend!\n\nJouw eerste vlag is:\nNM{jouw_eerste_vlag}\n\nPlak deze hierboven in het antwoordveld.\n',
          '/home/student/.notitie': 'Verborgen bestanden beginnen met een punt.\nNM{verborgen_maar_niet_weg}\n',
          '/home/student/opdracht/scope.txt': 'PENTESTOPDRACHT 2026-017 (fictief)\nOpdrachtgever: directie Kadewerk Logistiek BV, schriftelijk akkoord d.d. 2026-10-28\nPeriode: 2026-11-02 t/m 2026-11-13, werkdagen 08:00-18:00\n\nIn scope:\n  shop.kadewerk.example\n  portaal.kadewerk.example\n  api.kadewerk.example\n\nAlles wat hier niet staat, valt buiten de opdracht.\nGeen denial-of-service, geen social engineering.\n',
          '/home/student/opdracht/.testlog': '2026-11-03 09:12 portscan  shop.kadewerk.example\n2026-11-03 10:40 webtest   portaal.kadewerk.example\n2026-11-04 13:05 webtest   api.kadewerk.example\n2026-11-05 14:31 inlogtest beheer.kadewerk.example\n2026-11-06 09:55 webtest   shop.kadewerk.example\n2026-11-09 11:20 webtest   portaal.kadewerk.example\n2026-11-10 15:02 hertest   api.kadewerk.example\n',
          '/home/student/README.txt': 'Welkom op het NineMinds-leerportaal.\n\n- "ls" toont de bestanden in deze map.\n- "cat <bestand>" toont de inhoud van een bestand.\n- Vlaggen zien er zo uit: NM{...}\n- Typ "help" voor alle commando\'s.\n\nVeel plezier en blijf ethisch!\n',
        },
      },
      questions: [
        {
          q: 'Wat is de vlag in welkom.txt?',
          answer: ['NM{jouw_eerste_vlag}'],
          hint: 'Typ eerst ls, daarna cat welkom.txt.',
          explain: 'Met cat welkom.txt lees je het bestand en vind je NM{jouw_eerste_vlag}. Zo werkt "zoek de vlag".',
        },
        {
          q: 'Er staat ook een verborgen bestand in je thuismap. Welke vlag staat erin?',
          answer: ['NM{verborgen_maar_niet_weg}'],
          hints: ['Een gewone ls laat niet alles zien.', 'Typ ls -a en kijk naar namen die met een punt beginnen.', 'Lees het bestand .notitie met cat.'],
          wrong: {
            'NM{jouw_eerste_vlag}': 'Dat is de vlag uit welkom.txt. Er staat nog een bestand in de map dat ls niet toont.',
          },
          explain: 'ls -a toont ook .notitie. Verborgen is niet hetzelfde als beveiligd: iedereen die de map mag lezen, kan het bestand openen.',
        },
        {
          q: 'In de map opdracht/ staat een pentestopdracht. De tester hield ook een logboek bij. Eén test had hij niet mogen uitvoeren. Op welke host was dat?',
          boss: true,
          answer: ['beheer.kadewerk.example', 'beheer'],
          hints: ['Je hebt twee bestanden nodig, en één daarvan zie je niet meteen.', 'Kijk in opdracht/ met ls -a en leg het logboek naast de lijst "In scope".', 'Het gaat om de test van 5 november.'],
          wrong: {
            'shop.kadewerk.example': 'Die host staat in de scope. Zoek een host uit het logboek die niet in de opdracht staat.',
            'hr.kadewerk.example': 'Die host komt in het logboek niet voor. Lees .testlog regel voor regel.',
            '/^2026-/': 'Je geeft een datum. Gevraagd is de host.',
          },
          explain: 'In opdracht/.testlog staat op 5 november een inlogtest op beheer.kadewerk.example. Die host staat niet in scope.txt. Zonder toestemming is dat computervredebreuk (art. 138ab Sr), ook al had de tester voor de andere drie hosts wel een opdracht.',
        },
      ],
    },

    {
      title: 'Taak 8 — Verdieping: van model naar praktijk',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>De modellen uit deze room zijn bewust eenvoudig. Hier lees je waar ze schuren en hoe organisaties er in
        de praktijk mee werken.</p>

        <h3>CIA is een kapstok, geen checklist</h3>
        <p>Eén incident raakt vaak meer eigenschappen tegelijk. Ransomware maakt bestanden onbereikbaar
        (beschikbaarheid). Kopiëren de aanvallers de bestanden eerst om met publicatie te dreigen, dan is ook de
        vertrouwelijkheid geschonden. Het model helpt je de juiste vragen te stellen; het geeft geen antwoord.
        Er bestaan ook uitgebreidere modellen. Donn Parker stelde in 1998 zes eigenschappen voor (de Parkerian
        hexad), met onder meer <em>bezit</em> en <em>bruikbaarheid</em> als aparte begrippen. In de praktijk blijft
        de triade de gemeenschappelijke taal.</p>

        <h3>Risico in cijfers</h3>
        <p>"Kans maal impact" met scores van 1 tot 5 is een <strong>kwalitatieve</strong> methode: snel, maar grof.
        Wie een investering moet verantwoorden, rekent soms <strong>kwantitatief</strong>:</p>
        <ul>
          <li><strong>SLE</strong> (Single Loss Expectancy): de schade van één incident, in euro's.</li>
          <li><strong>ARO</strong> (Annualized Rate of Occurrence): hoe vaak per jaar je het incident verwacht. Eens
            per vier jaar is een ARO van 0,25.</li>
          <li><strong>ALE</strong> (Annualized Loss Expectancy) = SLE &times; ARO: de verwachte schade per jaar.</li>
        </ul>
        <p>Een maatregel is financieel zinvol als hij de ALE met meer verlaagt dan hij zelf per jaar kost. De
        zwakte van deze methode: de invoer is een schatting. Een precieze uitkomst is niet hetzelfde als een
        betrouwbare uitkomst.</p>

        <h3>Raamwerken</h3>
        <p>Organisaties verzinnen hun aanpak niet zelf. Veelgebruikte kapstokken zijn ISO/IEC 27001:2022 (eisen aan
        een managementsysteem voor informatiebeveiliging) en het NIST Cybersecurity Framework 2.0 (2024), dat het
        werk verdeelt in zes functies: Govern, Identify, Protect, Detect, Respond en Recover.</p>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li><strong>Dreiging en kwetsbaarheid verwisselen.</strong> "Hackers" zijn geen kwetsbaarheid en "een zwak
            wachtwoord" is geen dreiging.</li>
          <li><strong>Voldoen aan een norm verwarren met veilig zijn.</strong> Een certificaat zegt dat het proces
            op orde is, niet dat er nooit iets misgaat.</li>
          <li><strong>Vertrouwen op geheimhouding.</strong> Een verborgen beheerpagina is niet beveiligd; je zag in
            taak 7 hoe snel een verborgen bestand gevonden is.</li>
          <li><strong>Eén laag.</strong> Elke maatregel faalt een keer. Daarom stapel je lagen (defense in depth):
            voorkomen, opmerken en herstellen.</li>
        </ul>
      `,
      questions: [
        {
          q: 'Een uitval van de webshop kost naar schatting 20.000 euro per keer en wordt eens per vier jaar verwacht. Wat is de ALE in euro\'s?',
          answer: ['5000', '5.000', '€5000', '€ 5.000'],
          hints: ['Zoek de formule voor de verwachte schade per jaar.', 'Eens per vier jaar is een ARO van 0,25.', '20.000 maal 0,25.'],
          wrong: {
            '80000': 'Je vermenigvuldigt met 4. Eens per vier jaar is een kwart keer per jaar: 0,25.',
            '20000': 'Dat is de SLE, de schade van één incident. De ALE is de verwachte schade per jaar.',
          },
          explain: 'ALE = SLE x ARO = 20.000 x 0,25 = 5.000 euro per jaar.',
        },
        {
          q: 'Een incident kost 30.000 euro per keer. Een maatregel van 8.000 euro per jaar verlaagt de verwachte frequentie van 0,5 naar 0,1 per jaar. Hoeveel euro bespaart de maatregel netto per jaar?',
          answer: ['4000', '4.000', '€4000', '€ 4.000'],
          hints: ['Reken de ALE voor en na de maatregel uit.', 'Voor: 15.000 euro. Na: 3.000 euro.', 'Trek van de daling de kosten van de maatregel af.'],
          wrong: {
            '12000': 'Dat is de daling van de ALE. De maatregel kost zelf ook 8.000 euro per jaar.',
            '7000': 'Controleer de ALE na de maatregel: 30.000 maal 0,1.',
          },
          explain: 'De ALE daalt van 15.000 naar 3.000 euro: 12.000 euro minder. Na aftrek van 8.000 euro kosten blijft 4.000 euro over.',
        },
      ],
    },

    {
      title: 'Taak 9 — Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Instapexamens in security toetsen de begrippen uit deze room bijna altijd met een korte situatie. De
        afleiders zijn begrippen die er dicht tegenaan liggen: integriteit tegenover onweerlegbaarheid, dreiging
        tegenover kwetsbaarheid, overdragen tegenover verkleinen.</p>
        <p>Lees eerst wat er precies is gebeurd of gevraagd wordt, en kies dan pas. Deze vier vragen zijn zelf
        geschreven in examenstijl.</p>
      `,
      questions: [
        {
          q: 'Het patiëntenportaal van een ziekenhuis is zes uur onbereikbaar door een DDoS-aanval. Er zijn geen gegevens ingezien of gewijzigd. Welke eigenschap is geschonden?',
          options: ['Vertrouwelijkheid', 'Integriteit', 'Beschikbaarheid', 'Onweerlegbaarheid'],
          answer: 2,
          wrong: {
            0: 'Er zijn geen gegevens ingezien door onbevoegden.',
            1: 'Er is niets gewijzigd; de gegevens kloppen nog.',
            3: 'Onweerlegbaarheid gaat over het kunnen bewijzen wie iets deed, niet over bereikbaarheid.',
          },
          explain: 'Het systeem werkte niet toen het nodig was: beschikbaarheid.',
        },
        {
          q: 'Een medewerker ontkent dat hij een betaling heeft goedgekeurd. De goedkeuring is gezet met zijn persoonlijke digitale handtekening. Welke eigenschap maakt dat hij dit niet kan ontkennen?',
          options: ['Vertrouwelijkheid', 'Onweerlegbaarheid', 'Beschikbaarheid', 'Autorisatie'],
          answer: 1,
          wrong: {
            0: 'Vertrouwelijkheid gaat over wie de gegevens mag zien.',
            2: 'Beschikbaarheid gaat over of het systeem werkt wanneer het nodig is.',
            3: 'Autorisatie bepaalt of hij mocht goedkeuren, niet of hij het achteraf kan ontkennen.',
          },
          explain: 'Een digitale handtekening koppelt de actie aantoonbaar aan één persoon: onweerlegbaarheid (non-repudiation).',
        },
        {
          q: 'Een transportbedrijf sluit een cyberverzekering af die de herstelkosten na ransomware dekt. Aan de techniek verandert niets. Welke risicobehandeling is dit?',
          options: ['Verkleinen', 'Overdragen', 'Vermijden', 'Accepteren'],
          answer: 1,
          wrong: {
            0: 'Verkleinen doe je met een maatregel die de kans of de impact zelf verlaagt, zoals patchen of back-ups.',
            2: 'Vermijden betekent stoppen met de riskante activiteit.',
            3: 'Bij accepteren draag je de schade zelf. Hier betaalt de verzekeraar een deel.',
          },
          explain: 'Met een verzekering leg je de financiële gevolgen bij een andere partij: overdragen. De kans op het incident blijft gelijk.',
        },
        {
          q: 'Een student ziet dat de beheerpagina van de website van haar school zonder wachtwoord bereikbaar is. Ze heeft geen opdracht om de site te testen. Wat is de juiste handelwijze?',
          options: [
            'Alle leerlinggegevens downloaden als bewijs en daarna melden',
            'Niets melden: kijken zonder iets te wijzigen is niet strafbaar',
            'Stoppen, vastleggen wat nodig is om het aan te tonen en het vertrouwelijk melden bij de school',
            'Het lek op sociale media zetten zodat de school snel ingrijpt',
          ],
          answer: 2,
          wrong: {
            0: 'Meer gegevens kopiëren dan nodig is om het probleem aan te tonen gaat verder dan een CVD-melding toelaat.',
            1: 'Binnendringen is ook zonder schade strafbaar (art. 138ab Sr), en het lek blijft zo bestaan.',
            3: 'Publiceren voordat het is opgelost brengt de leerlingen in gevaar.',
          },
          explain: 'Coordinated Vulnerability Disclosure: niet verder kijken dan nodig, vertrouwelijk melden en de eigenaar tijd geven.',
        },
      ],
    },
  ],
  terms: [
    { term: 'Cybersecurity', def: 'Het beschermen van computers, netwerken, apparaten en gegevens tegen misbruik, diefstal en uitval, met techniek, mensen en processen.' },
    { term: 'CIA-triade', def: 'Drie kerneigenschappen van informatiebeveiliging: vertrouwelijkheid (Confidentiality), integriteit (Integrity) en beschikbaarheid (Availability).' },
    { term: 'Authenticiteit', def: 'De zekerheid dat iemand of iets echt is wie of wat het beweert te zijn.' },
    { term: 'Onweerlegbaarheid', def: 'Non-repudiation: achteraf kan iemand niet ontkennen dat hij een actie heeft uitgevoerd, bijvoorbeeld via een digitale handtekening.' },
    { term: 'AAA', def: 'Authentication (wie ben je?), Authorization (wat mag je?) en Accounting (wat heb je gedaan?).' },
    { term: 'Dreiging', def: 'Een threat: iets of iemand dat schade kan veroorzaken.' },
    { term: 'Kwetsbaarheid', def: 'Een vulnerability: een zwakke plek die misbruikt kan worden.' },
    { term: 'Risico', def: 'De kans dat een dreiging een kwetsbaarheid misbruikt, maal de impact. Vuistregel: risico is ongeveer kans maal impact.' },
    { term: 'Dreigingsactor', def: 'Een threat actor: een partij die een aanval uitvoert, zoals een cybercrimineel, statelijke actor, hacktivist, insider of script kiddie.' },
    { term: 'Pentester', def: 'Een penetratietester die met toestemming en binnen een afgesproken scope systemen op zwakke plekken test.' },
    { term: 'Computervredebreuk', def: 'Het zonder toestemming binnendringen in een computer of netwerk; in Nederland strafbaar onder artikel 138ab Sr.' },
    { term: 'CVD', def: 'Coordinated Vulnerability Disclosure: een kwetsbaarheid vertrouwelijk melden bij de eigenaar (het NCSC kan bemiddelen) en de eigenaar tijd geven om het op te lossen.' },
  ],
  resources: [
    { title: 'NCSC (Nationaal Cyber Security Centrum)', url: 'https://www.ncsc.nl/' },
    { title: 'TryHackMe', url: 'https://tryhackme.com/' },
    { title: 'Cloudflare Learning Center', url: 'https://www.cloudflare.com/learning/' },
  ],
});
