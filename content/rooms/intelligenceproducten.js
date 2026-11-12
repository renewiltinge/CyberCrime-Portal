/* Room: Intelligenceproducten & interventieadvies */

CS.registerRoom({
  id: 'intelligenceproducten',
  path: 'intelligence',
  order: 6,
  title: 'Intelligenceproducten & interventieadvies',
  icon: '📰',
  difficulty: 'Gemiddeld',
  minutes: 65,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Van analyse naar een product dat iemand kan gebruiken: schrijf voor het juiste niveau (strategisch, tactisch, operationeel), kies de juiste productsoort, zet de conclusie vooraan met BLUF, vertaal je jargon, bouw een interventieadvies (wat, waarom, wie, wanneer, risico\'s), coach je team en vertaal je eigen ervaring met STAR.',
  objectives: [
    'Het strategische, tactische en operationele niveau onderscheiden: wie leest wat, en welke beslissing neemt die lezer',
    'De gangbare productsoorten herkennen (fenomeenanalyse, dreigingsbeeld, netwerkanalyse, subjectanalyse, zaakoverstijgende analyse) en de juiste kiezen',
    'Een product volgens BLUF schrijven: conclusie en aanbeveling eerst, onderbouwing daarna',
    'Jargon vertalen zodat een niet-specialist je product begrijpt en kan gebruiken',
    'Een interventieadvies opbouwen met wat, waarom, wie (eigenaar), wanneer en risico\'s',
    'Je team laten groeien via peer review, ingebedde methoden en betere tooling',
    'Je eigen ervaring vertalen met de STAR-methode (Situatie, Taak, Actie, Resultaat)',
  ],
  tasks: [
    {
      title: 'Taak 1 — Strategisch, tactisch, operationeel: wie leest wat?',
      tryFirst: true,
      intro: '<p>In het postvak van het intelteam liggen zes fragmenten, elk met een geadresseerde. Bepaal per fragment voor welke beslissing het bruikbaar is en of het bij de juiste lezer ligt. Beantwoord daarna de vragen met de codes P1 tot en met P6.</p>',
      content: `
        <p>De beste analyse van de wereld is waardeloos als ze bij de verkeerde lezer belandt, of in de verkeerde taal.
        Een directeur heeft niets aan een lijst met 400 IP-adressen; een SOC-analist heeft niets aan de boodschap "cyber
        is een groeiend risico". Hetzelfde onderzoek levert dus <em>verschillende</em> producten op, afhankelijk van wie
        het leest en welke beslissing die persoon moet nemen. We onderscheiden drie niveaus.</p>

        <h3>De analogie van de kaart</h3>
        <p>Denk aan kaarten met verschillende zoomniveaus. Een <strong>wereldbol</strong> laat je grote stromen en trends
        zien: handig om te beslissen naar welk werelddeel je gaat. Een <strong>stadsplattegrond</strong> laat wijken en
        hoofdwegen zien: handig om een route te plannen. Een <strong>stratenkaart</strong> toont de stoeprand waar je
        moet afslaan: handig als je er nú bent. Alle drie kloppen, maar je kiest de kaart bij de beslissing die je moet
        nemen. Zo is het ook met intelligence.</p>

        <figure class="diagram">
          <svg viewBox="0 0 320 210" role="img" aria-label="Piramide met de drie intelligenceniveaus">
            <polygon points="160,20 280,190 40,190" fill="var(--accent-soft)" stroke="currentColor"/>
            <line x1="120" y1="77" x2="200" y2="77" stroke="currentColor"/>
            <line x1="80" y1="133" x2="240" y2="133" stroke="currentColor"/>
            <text x="160" y="56" text-anchor="middle" fill="currentColor" font-size="13">Strategisch</text>
            <text x="160" y="70" text-anchor="middle" fill="var(--muted)" font-size="11">directie, bestuur</text>
            <text x="160" y="106" text-anchor="middle" fill="currentColor" font-size="13">Tactisch</text>
            <text x="160" y="120" text-anchor="middle" fill="var(--muted)" font-size="11">teamleiding, coördinatie</text>
            <text x="160" y="159" text-anchor="middle" fill="currentColor" font-size="13">Operationeel</text>
            <text x="160" y="173" text-anchor="middle" fill="var(--muted)" font-size="11">rechercheur, analist, SOC</text>
            <text x="12" y="28" fill="var(--muted)" font-size="11">breed, lange termijn</text>
            <text x="12" y="203" fill="var(--muted)" font-size="11">concreet, nu</text>
          </svg>
          <figcaption>Dezelfde zaak levert op elk niveau een ander product op, voor een andere beslissing.</figcaption>
        </figure>

        <h3>De drie niveaus</h3>
        <ul>
          <li><strong>Strategisch</strong> — de lange termijn en het grote plaatje. Leest: directie, bestuur,
          beleidsmakers. Beslissing: <em>waar zetten we mensen, geld en aandacht op in?</em> Denk aan trends, fenomenen
          en een meerjarig dreigingsbeeld. Voorbeeld: "Helpdeskfraude tegen ouderen groeit al drie jaar; investeer in
          preventie en in een meldpunt."</li>
          <li><strong>Tactisch</strong> — de middellange termijn en de aanpak van een thema of type zaak. Leest:
          teamleiding, coördinatoren, opsporingsleiding. Beslissing: <em>hoe pakken we dit soort zaken aan, en wat
          prioriteren we?</em> Denk aan werkwijzen (modus operandi) en netwerken binnen een fenomeen. Voorbeeld: "Deze
          fraudegolf loopt telkens via dezelfde moneymule-structuur; richt de aanpak op die tussenschakel."</li>
          <li><strong>Operationeel</strong> — het hier en nu, één concrete zaak of één subject. Leest: rechercheurs,
          analisten, het SOC. Beslissing: <em>wat doen we nú, met déze zaak?</em> Denk aan concrete handvatten: IOC's,
          een verdachte verbinding, een eerstvolgende stap. Voorbeeld: "Blokkeer dit IP en isoleer werkplek WS-12."</li>
        </ul>

        <div class="callout tip">
          <strong>Vuistregel:</strong> schrijf altijd voor de lezer en de beslissing, niet voor jezelf.
        </div>

        <div class="callout warn">
          <strong>Veelgemaakte fout:</strong> hetzelfde product naar alle drie de niveaus sturen. De directie haakt af
          bij de techniek, en het SOC mist de concrete actie. Knip je bevindingen op naar niveau, of schrijf tenminste
          per lezer een eigen samenvatting.
        </div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'postvak van het intelteam',
        scenario: 'Zes fragmenten uit producten van deze week (fictief). Bij elk fragment staat aan wie het is verstuurd. Bepaal per fragment het niveau (strategisch, tactisch, operationeel) en of de lezer er een beslissing mee kan nemen.',
        records: [
          { title: 'P1', lines: ['Aan: dienstdoende SOC-analist', 'Blokkeer 198.51.100.77 op de firewall en isoleer werkplek WS-FIN-12. Hashes en domeinen staan in de bijlage.'] },
          { title: 'P2', lines: ['Aan: gemeentesecretaris', 'Lijst met 412 IP-adressen en 38 bestandshashes uit de campagne van deze week, gesorteerd op eerste waarneming.'] },
          { title: 'P3', lines: ['Aan: teamleider opsporing', 'Nepfactuurfraude loopt in 9 van de 12 zaken via dezelfde structuur van geldezels. Voorstel: richt het team de komende maanden op die tussenschakel.'] },
          { title: 'P4', lines: ['Aan: college van B en W', 'Helpdeskfraude tegen ouderen groeit drie jaar op rij. Advies: neem structureel budget voor preventie en een meldpunt op in de begroting van 2027.'] },
          { title: 'P5', lines: ['Aan: coördinator incidentrespons', 'Werkwijze van deze groep: binnen via gelekte VPN-accounts, gemiddeld vier dagen tot versleuteling. Controleer bij dit type zaak als eerste de MFA bij ketenpartners.'] },
          { title: 'P6', lines: ['Aan: directie, teamleiding en SOC', 'Cyber is een groeiend risico. We houden de ontwikkelingen in de gaten.'] },
        ],
      },
      questions: [
        { q: 'Welk fragment (code) ondersteunt een beslissing over geld en mensen voor de komende jaren?', answer: ['P4'],
          hints: ['Zoek het fragment met de langste tijdshorizon.', 'Kijk naar de geadresseerde: wie gaat er over een begroting?', 'Het fragment noemt de begroting van 2027.'],
          wrong: { 'P3': 'P3 gaat over de aanpak van een type zaak in de komende maanden. Dat is tactisch, voor een teamleider.', 'P6': 'P6 gaat wel naar de directie, maar er staat geen beslissing in die zij kan nemen.' },
          why: 'Een bestuurder beslist over budget en prioriteiten. Krijgt hij een product zonder die keuze erin, dan gebeurt er niets met je analyse.',
          explain: 'P4 is strategisch: een meerjarige trend met een investeringsbeslissing, gericht aan het bestuur.' },
        { q: 'Welk fragment is operationeel van inhoud, maar ligt bij de verkeerde lezer?', answer: ['P2'],
          hints: ['Operationeel betekent: concrete handvatten voor nu, in één zaak.', 'Er zijn twee operationele fragmenten. Kijk bij allebei naar de regel "Aan:".', 'Een gemeentesecretaris kan niets met een lijst hashes.'],
          wrong: { 'P1': 'P1 is operationeel en ligt precies goed: de dienstdoende SOC-analist kan er direct mee aan het werk.', 'P6': 'P6 heeft geen niveau: er staat geen handvat, aanpak of keuze in.' },
          explain: 'P2 is een IOC-lijst. Die hoort bij het SOC. De gemeentesecretaris heeft een oordeel en een beslispunt nodig.' },
        { q: 'Hoeveel van de zes fragmenten zijn tactisch?', answer: ['2', 'twee'],
          hints: ['Tactisch: de aanpak en prioriteiten voor een type zaak of thema.', 'Let op de lezers: teamleiding en coördinatie.', 'Het zijn P3 en P5.'],
          wrong: { '3': 'Je telt waarschijnlijk P6 mee omdat de teamleiding in de adresregel staat. P6 bevat geen aanpak.', '1': 'P5 beschrijft een werkwijze en een vaste eerste controle voor dit type zaak. Dat is ook tactisch.' },
          explain: 'P3 (richt het team op de tussenschakel) en P5 (werkwijze en prioriteit bij dit type zaak) zijn tactisch.' },
        { q: 'Welk fragment levert op geen enkel niveau een beslissing op en had zo niet verstuurd mogen worden?', answer: ['P6'],
          hints: ['Stel bij elk fragment de vraag: wat gaat de lezer hierdoor anders doen?', 'Eén fragment gaat naar drie soorten lezers tegelijk.', 'Het is het fragment zonder cijfer, termijn of advies.'],
          wrong: { 'P2': 'P2 ligt bij de verkeerde lezer, maar het SOC kan er wel iets mee.' },
          explain: 'P6 is hetzelfde product voor alle drie de niveaus, zonder inhoud waar iemand op kan handelen.' },
      ],
    },

    {
      title: 'Taak 2 — Productsoorten: kies het juiste gereedschap',
      tryFirst: true,
      intro: '<p>Er liggen drie losse phishingzaken: Alfa, Bravo en Charlie. Je teamleider wil weten of ze bij elkaar horen. Loop in het lab de kenmerken langs, let op herkomst en tijd, en bepaal welk kenmerk twee zaken echt verbindt.</p>',
      content: `
        <p>Binnen de drie niveaus bestaan vaste <strong>productsoorten</strong>. Ze verschillen in wat er centraal staat:
        een verschijnsel, een dreiging, een netwerk, een persoon, of een patroon over meerdere zaken heen. Weten welke
        soort je maakt, houdt je product scherp — je weet waar je naartoe schrijft en wat je weglaat.</p>

        <table>
          <thead><tr><th>Productsoort</th><th>Staat centraal</th><th>Typische vraag</th></tr></thead>
          <tbody>
            <tr><td><strong>Fenomeenanalyse</strong></td><td>Een verschijnsel in de breedte</td><td>Hoe werkt helpdeskfraude als geheel? Welke schakels, actoren en kwetsbaarheden zitten erin?</td></tr>
            <tr><td><strong>Dreigingsbeeld</strong></td><td>Welke dreigingen, hoe ernstig, welke trend</td><td>Wat bedreigt ons het komende jaar, en wat wordt groter of kleiner?</td></tr>
            <tr><td><strong>Netwerkanalyse</strong></td><td>Relaties en rollen tussen actoren</td><td>Wie werkt met wie samen, en wie is de spil of de zwakke schakel?</td></tr>
            <tr><td><strong>Subjectanalyse</strong></td><td>Eén persoon of entiteit</td><td>Wie is dit subject, wat doet het, en wat weten we met welke zekerheid?</td></tr>
            <tr><td><strong>Zaakoverstijgende analyse</strong></td><td>Patronen over meerdere zaken heen</td><td>Horen deze losse zaken bij elkaar? Welk gemeenschappelijk kenmerk verbindt ze?</td></tr>
          </tbody>
        </table>

        <h3>Kort toegelicht</h3>
        <ul>
          <li>Een <strong>fenomeenanalyse</strong> zoomt uit: niet één dader, maar hoe een crimineel verschijnsel werkt
          (vergelijk de crime script uit de eerdere room). Vaak strategisch of tactisch.</li>
          <li>Een <strong>dreigingsbeeld</strong> weegt dreigingen tegen elkaar af en benoemt de trend (stijgend,
          dalend, stabiel). Hier gebruik je waarschijnlijkheidstaal en een apart betrouwbaarheidsniveau. Vaak
          strategisch.</li>
          <li>Een <strong>netwerkanalyse</strong> tekent de relaties: wie stuurt aan, wie voert uit, wie int het geld.
          Je zoekt de spil én de kwetsbare tussenschakel waar een interventie het meeste effect heeft.</li>
          <li>Een <strong>subjectanalyse</strong> gaat de diepte in op één entiteit (persoon, groep, alias, infrastructuur).
          Label hier streng wat <em>bekend</em>, <em>afgeleid</em> en <em>aanname</em> is — een subjectanalyse die een
          aanname als feit presenteert, kan iemand onterecht raken.</li>
          <li>Een <strong>zaakoverstijgende analyse</strong> legt verbanden tussen losse zaken. Dit is precies het
          pivot-werk uit de OSINT-room: een gedeeld certificaat, een hergebruikte wallet of dezelfde werkwijze kan twee
          zaken aan elkaar koppelen.</li>
        </ul>

        <div class="callout info">
          <strong>Koppeling:</strong> de productsoort en het niveau hangen samen, maar zijn niet hetzelfde. Een
          dreigingsbeeld is meestal strategisch; een subjectanalyse kan zowel tactisch (hoe pakken we dit type dader aan)
          als operationeel (wat doen we met déze verdachte) zijn. Bepaal eerst de <em>vraag</em>, dan de soort, dan het
          niveau en de taal.
        </div>
      `,
      lab: {
        type: 'pivot',
        title: 'drie phishingzaken',
        scenario: 'Drie aangiften van phishing uit februari en maart 2026 (fictief). Elke zaak heeft een eigen phishingdomein. Zoek het kenmerk dat twee zaken verbindt en dat zeldzaam genoeg is om iets te betekenen.',
        entities: [
          { id: 'za', type: 'file', label: 'Zaak Alfa' },
          { id: 'zb', type: 'file', label: 'Zaak Bravo' },
          { id: 'zc', type: 'file', label: 'Zaak Charlie' },
          { id: 'd1', type: 'domain', label: 'mijn-pakketpost.nm.lab' },
          { id: 'd2', type: 'domain', label: 'toeslag-terug.nm.lab' },
          { id: 'd3', type: 'domain', label: 'pakket-herbezorgen.nm.lab' },
          { id: 'ip1', type: 'ip', label: '203.0.113.80' },
          { id: 'ip2', type: 'ip', label: '198.51.100.23' },
          { id: 'as1', type: 'asn', label: 'AS64500 (shared hosting, duizenden sites per IP)' },
          { id: 'c1', type: 'cert', label: '7C:41:D0:9E' },
          { id: 'e1', type: 'email', label: 'registratie@snelmail.example' },
          { id: 'al1', type: 'alias', label: 'koerier_77' },
        ],
        edges: [
          { from: 'za', to: 'd1', rel: 'phishingdomein in deze zaak', time: '2026-02', source: 'aangifte' },
          { from: 'zb', to: 'd2', rel: 'phishingdomein in deze zaak', time: '2026-02', source: 'aangifte' },
          { from: 'zc', to: 'd3', rel: 'phishingdomein in deze zaak', time: '2026-03', source: 'aangifte' },
          { from: 'd1', to: 'ip1', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
          { from: 'd2', to: 'ip1', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
          { from: 'ip1', to: 'as1', rel: 'valt onder', time: '2026-02', source: 'routeringsgegevens' },
          { from: 'd3', to: 'ip2', rel: 'resolvet naar', time: '2026-03', source: 'passive DNS' },
          { from: 'd1', to: 'c1', rel: 'presenteerde zelfondertekend certificaat met serienummer', time: '2026-02', source: 'eigen scan' },
          { from: 'd3', to: 'c1', rel: 'presenteerde zelfondertekend certificaat met serienummer', time: '2026-03', source: 'eigen scan' },
          { from: 'd2', to: 'e1', rel: 'geregistreerd met', time: '2026-02', source: 'WHOIS' },
          { from: 'd3', to: 'al1', rel: 'phishingkit voor dit domein aangeboden door', time: '2026-03', source: 'forumbericht (ongeverifieerd)' },
        ],
        goal: 'Welk kenmerk verbindt twee van de drie zaken echt? (typ het label)',
        bridge: ['7C:41:D0:9E', '7c41d09e'],
      },
      questions: [
        { q: 'Welk kenmerk verbindt zaak Alfa en zaak Charlie? (typ het label uit het lab)', answer: ['7C:41:D0:9E', '7c41d09e', '7C41D09E'],
          hints: ['Klik op het domein van Alfa en loop alle relaties langs. Doe daarna hetzelfde bij Charlie.', 'Zoek een entiteit die bij beide domeinen terugkomt en die niet door duizenden anderen wordt gedeeld.', 'Het is het serienummer van een zelfondertekend certificaat.'],
          wrong: { '203.0.113.80': 'Dat IP-adres delen Alfa en Bravo, maar het is shared hosting met duizenden sites. Zo\'n kenmerk verbindt niets.', '/koerier/i': 'De alias hangt alleen aan Charlie, en de bron is een ongeverifieerd forumbericht.' },
          why: 'Een zaakoverstijgende analyse staat of valt met de zeldzaamheid van het gedeelde kenmerk. Een gedeeld IP bij een grote hoster koppelt in de praktijk regelmatig zaken die niets met elkaar te maken hebben.',
          explain: 'Beide domeinen presenteerden hetzelfde zelfondertekende certificaat. Dat maakt iemand zelf aan, dus het wijst op dezelfde opzet.' },
        { q: 'Welke van de drie zaken laat je buiten de zaakoverstijgende analyse, omdat het enige gedeelde kenmerk niets zegt? (naam van de zaak)', answer: ['bravo', 'zaak bravo'],
          hints: ['Welke zaak deelt alleen een kenmerk dat heel veel anderen ook hebben?', 'Klik op het IP-adres 203.0.113.80 en kijk onder welk netwerk het valt.', 'De zaak met het domein toeslag-terug.nm.lab.'],
          wrong: { 'charlie': 'Charlie deelt het certificaat met Alfa. Dat is juist de sterke link.', 'alfa': 'Alfa deelt het certificaat met Charlie.' },
          explain: 'Bravo deelt met Alfa alleen een IP-adres bij een shared hoster. Dat is ruis, geen verband.' },
        { q: 'Je schrijft op dat Alfa en Charlie bij elkaar horen door het gedeelde certificaat. Welke productsoort is dit?', options: ['Zaakoverstijgende analyse', 'Fenomeenanalyse', 'Dreigingsbeeld', 'Subjectanalyse'], answer: 0,
          wrong: { 1: 'Een fenomeenanalyse beschrijft hoe een verschijnsel als geheel werkt, los van deze specifieke zaken.', 2: 'Een dreigingsbeeld weegt dreigingen tegen elkaar af en benoemt een trend.', 3: 'Een subjectanalyse gaat over één persoon of entiteit. Hier leg je een verband tussen zaken.' },
          explain: 'Patronen en verbanden over meerdere zaken heen zoeken is een zaakoverstijgende analyse (het pivot-werk).' },
        { q: 'Je opdrachtgever wil daarna alles weten over wie er achter de alias uit de graaf zit, met elk gegeven streng gelabeld als bekend, afgeleid of aanname. Welke productsoort maak je?', answer: ['subjectanalyse', 'Subjectanalyse', 'een subjectanalyse'],
          hints: ['Het product draait om één entiteit.', 'Kijk in de tabel met productsoorten onder "Staat centraal".', 'Het "subject" is het middelpunt.'],
          explain: 'Een subjectanalyse draait om één entiteit; onzuiver labelen kan iemand onterecht raken. Hier is de enige bron een ongeverifieerd forumbericht, dus bijna alles is nog aanname.' },
      ],
    },

    {
      title: 'Taak 3 — BLUF: zet de conclusie vooraan',
      tryFirst: true,
      intro: '<p>In het lab staat een chronologisch verslag van een incident bij de fictieve Gemeente Veldewoud. Herschrijf het voor de gemeentesecretaris zodat hij na drie regels weet wat er aan de hand is en wat hij moet doen. Zoek daarvoor eerst in het verslag welke regels je conclusie dragen en welke alleen onzekerheid bevatten.</p>',
      content: `
        <p>Analisten schrijven graag als een detectiveverhaal: eerst alle aanwijzingen, de verdachten, de twists, en op de
        laatste bladzijde de ontknoping. Spannend voor een roman, rampzalig voor een intelligenceproduct. Je lezer is
        druk, scrollt op zijn telefoon tussen twee vergaderingen door, en leest misschien alleen de eerste alinea. Zet de
        ontknoping dus bovenaan. Dat is <strong>BLUF</strong>: <em>Bottom Line Up Front</em> — de kern eerst.</p>

        <h3>Wat komt bovenaan?</h3>
        <p>In de eerste paar zinnen staat het antwoord op de vraag van de opdrachtgever, plus wat hij ermee moet. Concreet:</p>
        <ul>
          <li><strong>De conclusie</strong> — je oordeel, in één of twee zinnen. Met <strong>waarschijnlijkheidstaal</strong>
          (de yardstick) en een apart <strong>betrouwbaarheidsniveau</strong> (laag/midden/hoog).</li>
          <li><strong>De aanbeveling(en)</strong> — wat moet er gebeuren, en door wie. Dit is de "so what?" die het
          product bruikbaar maakt.</li>
          <li><strong>De onderbouwing daarna</strong> — pas daaronder volgt het bewijs, de tijdlijn, de details. Wie
          verder wil, leest door; wie genoeg heeft, is na drie regels klaar.</li>
        </ul>

        <div class="callout info">
          <strong>Omgekeerde piramide:</strong> journalisten schrijven zo al zo'n 150 jaar. Het belangrijkste eerst, daarna
          aflopend in belang. Snijdt de redactie onderaan iets weg, dan verlies je alleen detail — nooit de kern.
        </div>

        <h3>Vier vuistregels voor een goed BLUF-product</h3>
        <ol>
          <li><strong>Conclusie bovenaan.</strong> Geen opbouw naar een climax; het antwoord staat in regel één.</li>
          <li><strong>Waarschijnlijkheidstaal.</strong> Niet "misschien", maar "waarschijnlijk (55–75%)". Zeg erbij hoe
          stevig je oordeel is (betrouwbaarheidsniveau).</li>
          <li><strong>Eigenaar per advies.</strong> Een advies zonder naam erbij voert niemand uit. Zet achter elke
          aanbeveling wie het oppakt.</li>
          <li><strong>Onzekerheid apart.</strong> Zet wat je nog niet weet in een eigen blokje, zodat de lezer je
          conclusie niet verwart met je slagen om de arm.</li>
        </ol>

        <h3>Oefening: herschrijf de brontekst</h3>
        <p>In het lab hieronder staat een <strong>chronologisch</strong> verslag van een fictief incident — precies zoals
        het binnenkwam, van minuut tot minuut, met de belangrijke conclusie ergens verstopt. Herschrijf het naar een
        BLUF-product: conclusie en aanbevelingen bovenaan, onderbouwing eronder, onzekerheid apart. Klik daarna op
        "Toets tegen de rubric" voor een checklist (dat is geen AI-beoordeling, maar een geheugensteun), en vergelijk met
        het meegeleverde modelantwoord.</p>
      `,
      lab: {
        type: 'bluf',
        source: `CHRONOLOGISCH VERSLAG — fictief incident, Gemeente Veldewoud (fictief)

Maandag 6 oktober 2026
08:14  Een medewerker van de afdeling Financiën meldt dat ze een e-mail met een "factuurbijlage" heeft geopend. De bijlage leek een PDF maar deed niets zichtbaars.
08:20  De helpdesk krijgt een belletje: haar werkplek (WS-FIN-12) is traag geworden.
09:02  Het SOC ziet in de logs dat WS-FIN-12 om 08:17 verbinding maakte met een onbekend extern IP-adres (198.51.100.77) op poort 443.
10:30  Een beheerder meldt dat drie bestandsshares kortdurend onbereikbaar waren; ze doen het nu weer.
11:15  Op twee andere werkplekken op dezelfde afdeling worden dezelfde verbindingen naar 198.51.100.77 gezien.
12:40  Het EDR bevestigt dat op WS-FIN-12 het hulpmiddel "rclone" is uitgevoerd (een tool om bestanden in bulk naar externe opslag te kopiëren).
13:05  Uit passive DNS en een partnerrapport van vorige maand blijkt dat 198.51.100.77 ook opdook bij een incident bij een andere gemeente. De sectorpartner die dat IP aanleverde, heeft een goed trackrecord maar wij hebben het nog niet zelf geverifieerd.
13:30  De back-ups van de getroffen shares draaien elke nacht en staan offline; ze zijn intact.
14:00  Er zijn op dit moment GEEN aanwijzingen dat bestanden zijn versleuteld. Het uitgaande dataverkeer naar 198.51.100.77 wordt nog geanalyseerd; of er echt data is weggesluisd en hoeveel, is nog onbekend.

Op de afdeling Financiën staan ook persoonsgegevens (salaris- en declaratiebestanden).`,
        model: `<p><strong>BLUF.</strong> Er is <strong>waarschijnlijk (55–75%)</strong> sprake van datadiefstal op het netwerk van Gemeente Veldewoud. Vanaf werkplek WS-FIN-12 — en inmiddels nog twee werkplekken op Financiën — is verbinding gemaakt met een extern IP (198.51.100.77) dat eerder bij een incident bij een andere gemeente opdook, en op WS-FIN-12 is het exfiltratiehulpmiddel rclone uitgevoerd. Versleuteling is (nog) niet waargenomen en de offline back-ups zijn intact. <strong>Betrouwbaarheidsniveau: midden</strong> — eigen EDR-waarneming plus een partnerrapport, maar de exfiltratie zelf is nog niet in het uitgaand volume bevestigd.</p>
<p><strong>Aanbevelingen.</strong></p>
<ul>
  <li>Isoleer WS-FIN-12 en de twee andere werkplekken direct van het netwerk — <strong>eigenaar: SOC</strong> — <strong>vandaag</strong>.</li>
  <li>Blokkeer 198.51.100.77 op de firewall en analyseer al het verkeer naar dat IP — <strong>eigenaar: netwerkbeheer</strong> — <strong>vandaag</strong>.</li>
  <li>Bereid een datalekmelding bij de Autoriteit Persoonsgegevens voor; op Financiën staan persoonsgegevens en de 72-uursklok kan al lopen — <strong>eigenaar: functionaris gegevensbescherming</strong> — <strong>binnen 24 uur</strong>.</li>
  <li>Reset de wachtwoorden van de betrokken accounts — <strong>eigenaar: IT-beheer</strong> — <strong>binnen 24 uur</strong>.</li>
</ul>
<p><strong>Onzekerheid (apart).</strong> Of er daadwerkelijk data het netwerk heeft verlaten en zo ja hoeveel, is nog niet bevestigd; dat hangt af van de volume-analyse die loopt. De bron voor de koppeling aan een eerdere zaak is "meestal betrouwbaar" (Admiralty B) maar door ons nog niet geverifieerd; dat één actor achter beide zaken zit, blijft vooralsnog een aanname.</p>
<hr>
<p><em>Onderbouwing (chronologie) staat hieronder voor wie wil doorlezen: de bijlage om 08:14, de verbinding om 08:17, rclone om 12:40, de koppeling aan de eerdere zaak om 13:05, en de intacte offline back-ups om 13:30.</em></p>`,
      },
      questions: [
        { q: 'Op welk tijdstip in het verslag staat de waarneming die het sterkst op datadiefstal wijst en dus in je eerste zin thuishoort? (UU:MM)', answer: ['12:40', '12.40', '1240'],
          hints: ['Zoek de regel die iets zegt over wat de aanvaller met bestanden deed, niet over hoe hij binnenkwam.', 'Het gaat om een hulpmiddel dat bestanden in bulk naar externe opslag kopieert.', 'De regel waarin het EDR de uitvoering van rclone bevestigt.'],
          wrong: { '08:14': 'Dat is het begin van het verhaal. In een chronologisch verslag staat het bovenaan, maar het is niet de kern.', '09:02': 'Een verbinding met een onbekend IP is verdacht, maar zegt nog niets over diefstal.', '13:05': 'De koppeling met een eerdere zaak is context uit een nog niet geverifieerde bron. Het is niet je sterkste eigen waarneming.' },
          why: 'Wie chronologisch schrijft, begraaft zijn sterkste bewijs halverwege de pagina. Een lezer die na drie regels stopt, heeft het dan gemist.',
          explain: 'Om 12:40 bevestigt het EDR dat rclone is uitgevoerd op WS-FIN-12. Dat is een eigen waarneming van een exfiltratiehulpmiddel en draagt de conclusie.' },
        { q: 'Je eerste aanbeveling is: isoleer de getroffen werkplekken. Hoeveel werkplekken zijn dat volgens het verslag in totaal?', answer: ['3', 'drie'],
          hints: ['Eén werkplek wordt bij naam genoemd. Lees verder of er meer zijn.', 'Kijk naar de regel van 11:15.', 'WS-FIN-12 plus twee andere.'],
          wrong: { '1': 'Om 11:15 worden op twee andere werkplekken dezelfde verbindingen gezien.', '2': 'Tel WS-FIN-12 zelf ook mee.' },
          explain: 'WS-FIN-12 en de twee werkplekken van 11:15. Een advies is pas uitvoerbaar als het aantal en de eigenaar erin staan.' },
        { q: 'Waarom zet je achter elke aanbeveling een eigenaar?', options: ['Een advies zonder naam erbij voert niemand uit', 'Om het product langer te maken', 'Omdat dat verplicht is in de AVG', 'Om de bron te verbergen'], answer: 0,
          wrong: { 1: 'Een BLUF-product wordt juist korter dan de bron.', 2: 'De AVG zegt niets over de vorm van een intelligenceproduct.', 3: 'De eigenaar van een advies is de uitvoerder, niet de bron.' },
          explain: 'Met een eigenaar (en een termijn) wordt een advies een actie; zonder eigenaar blijft het een vrome wens.' },
        { q: 'Welke regel uit het verslag hoort in het aparte blok "onzekerheid" en niet in je conclusie? Geef het tijdstip (UU:MM).', answer: ['14:00', '14.00', '1400'],
          hints: ['Zoek de regel die vooral vertelt wat nog niet vaststaat.', 'Let op woorden als "nog onbekend" en "wordt nog geanalyseerd".', 'Het is de laatste regel met een tijdstip.'],
          wrong: { '13:05': 'Daar staat ook een voorbehoud (nog niet zelf geverifieerd), maar de regel levert vooral een feit: het IP dook eerder op.', '13:30': 'Dat de back-ups intact zijn is een vastgesteld feit.' },
          explain: 'Om 14:00 staat wat nog onbekend is: of er echt data weg is en hoeveel. Dat zet je apart, zodat de lezer je conclusie niet verwart met je voorbehoud.' },
      ],
    },

    {
      title: 'Taak 4 — Vertaal je jargon',
      content: `
        <p>Je weet wat een "C2-kanaal" is, wat "laterale beweging" betekent en waarom "T1486" eng is. Je lezer meestal
        niet. Jargon is efficiënt tussen specialisten, maar een muur voor iedereen daarbuiten — en juist de
        beslissers zitten daarbuiten. Een product dat de lezer niet begrijpt, kan hij niet gebruiken. Vertalen is dus
        geen bijzaak; het is de helft van je werk.</p>

        <h3>Van specialistentaal naar mensentaal</h3>
        <p>Kijk naar hetzelfde feit, twee keer opgeschreven:</p>
        <ul>
          <li><strong>Voor de specialist:</strong> "De actor voerde na initial access via T1566 laterale beweging uit en
          exfiltreerde data met rclone over een versleuteld C2-kanaal."</li>
          <li><strong>Voor de bestuurder:</strong> "De aanvaller kwam binnen via een nepmail, werkte zich door naar
          andere computers en kopieerde bestanden naar buiten met een gratis hulpmiddel, via een verborgen verbinding."</li>
        </ul>
        <p>Allebei kloppen. De tweede is langer in woorden maar korter in moeite: de lezer hoeft niets op te zoeken.</p>

        <h3>Vijf technieken</h3>
        <ol>
          <li><strong>Leg een term één keer uit</strong> en gebruik daarna de gewone taal. "Gijzelsoftware (ransomware)"
          — daarna gewoon "gijzelsoftware".</li>
          <li><strong>Schrap wat de lezer niet nodig heeft.</strong> Een bestuurder hoeft de naam van de tool of de
          ATT&CK-code niet; die hoort in een bijlage voor het SOC.</li>
          <li><strong>Gebruik een analogie.</strong> "Laterale beweging" = "de inbreker loopt van kamer naar kamer".</li>
          <li><strong>Vertaal het gevolg, niet het mechanisme.</strong> Niet "de shadow copies zijn gewist", maar "lokaal
          terugdraaien kan niet meer; we hebben de offline back-up nodig".</li>
          <li><strong>Doe de collega-test.</strong> Laat iemand buiten je vakgebied je samenvatting lezen. Struikelt die
          over een woord, dan vertaal je het. (Dit heet ook wel de "oma-test".)</li>
        </ol>

        <div class="callout warn">
          <strong>Pas op voor valse vertalingen.</strong> Vertalen mag nooit <em>verdraaien</em>. "Waarschijnlijk" wordt
          geen "zeker", en een aanname wordt geen feit omdat dat lekkerder leest. Vereenvoudig de taal, niet de inhoud of
          de onzekerheid.
        </div>

        <div class="callout tip">
          <strong>Tip:</strong> een handige structuur is twee lagen in één product. Bovenaan een samenvatting in gewone
          taal voor de beslisser; onderaan of in een bijlage de technische details (IOC's, tool-namen, ATT&CK-codes)
          voor de uitvoerders. Zo bedien je beide lezers zonder twee losse documenten te schrijven.
        </div>
      `,
      lab: {
        type: 'scenario',
        title: 'vertaal voor de wethouder',
        scenario: 'Je herschrijft vier zinnen uit een technische analyse voor een wethouder zonder IT-achtergrond. Kies steeds de versie die hij kan volgen en die nog precies hetzelfde beweert als de bron.',
        pass: 4,
        flag: 'NM{vertaal_niet_verdraai}',
        steps: [
          { situation: 'Bron: "De actor verkreeg initial access via T1566 en voerde daarna laterale beweging uit."', choices: [
            { label: 'De actor verkreeg initial access (T1566) en deed daarna aan lateral movement.', good: false, feedback: 'Dit is dezelfde zin met dezelfde vaktermen. De wethouder moet nog steeds alles opzoeken.' },
            { label: 'De aanvaller kwam binnen via een nepmail en werkte zich daarna van computer naar computer.', good: true, feedback: 'Zelfde bewering, gewone woorden, en een beeld dat de lezer meteen snapt.' },
            { label: 'Een medewerker heeft de aanvaller binnengelaten.', good: false, feedback: 'Dit staat niet in de bron en legt de schuld bij een persoon. Vertalen is geen moment om iets toe te voegen.' },
          ] },
          { situation: 'Bron: "Waarschijnlijk (55 tot 75%) is er data weggesluisd. Betrouwbaarheidsniveau: midden. De volume-analyse loopt nog."', choices: [
            { label: 'Er is data gestolen.', good: false, feedback: 'Van "waarschijnlijk" is "zeker" geworden. De wethouder gaat nu misschien een datalek melden dat er niet is.' },
            { label: 'Er is mogelijk iets met data gebeurd.', good: false, feedback: 'Dit is vager dan de bron. De lezer kan hier geen beslissing op nemen.' },
            { label: 'Er zijn waarschijnlijk bestanden naar buiten gekopieerd. Zeker weten we het nog niet: de meting loopt.', good: true, feedback: 'De waarschijnlijkheid blijft staan en de onzekerheid staat er apart bij.' },
          ] },
          { situation: 'Bron: "De shadow copies zijn gewist met vssadmin. Herstel uit de offline back-up kost circa twee dagen."', choices: [
            { label: 'Lokaal terugdraaien kan niet meer. Herstel moet uit de offline back-up en duurt ongeveer twee dagen.', good: true, feedback: 'Je vertaalt het gevolg in plaats van het mechanisme. Hiermee kan de lezer plannen.' },
            { label: 'De aanvaller heeft het programma vssadmin gebruikt.', good: false, feedback: 'De naam van het hulpmiddel zegt de wethouder niets. Wat betekent het voor de gemeente?' },
            { label: 'Er zijn kopieën gewist.', good: false, feedback: 'Zonder het gevolg (twee dagen herstel) weet de lezer niet waarom dit ertoe doet.' },
          ] },
          { situation: 'Je hebt ook 38 bestandshashes, de toolnaam rclone en zes ATT&CK-codes. Waar laat je die in het product voor de wethouder?', choices: [
            { label: 'In de samenvatting bovenaan, zodat hij ziet dat het onderzoek grondig was.', good: false, feedback: 'De samenvatting is voor de beslissing. Technische details bovenaan jagen de lezer weg.' },
            { label: 'Nergens. Een bestuurder heeft er niets aan.', good: false, feedback: 'De wethouder niet, maar het SOC wel. Weglaten kost de uitvoerders hun handvatten.' },
            { label: 'In een bijlage onderaan, voor de uitvoerders.', good: true, feedback: 'Twee lagen in één product: bovenaan gewone taal voor de beslisser, onderaan de techniek voor het SOC.' },
          ] },
        ],
      },
      questions: [
        { q: 'Je schrijft voor een bestuurder. Wat doe je met de zin "de actor exfiltreerde data met rclone over een versleuteld C2-kanaal"?', options: ['Je vertaalt het naar gewone taal, bijvoorbeeld "de aanvaller kopieerde bestanden naar buiten via een verborgen verbinding"', 'Je laat het precies zo staan', 'Je voegt nog meer afkortingen toe', 'Je laat de hele zin weg'], answer: 0,
          wrong: { 1: 'Dan moet de bestuurder drie termen opzoeken voordat hij kan beslissen.', 3: 'Dat er data naar buiten is gegaan is juist de kern. Alleen de toolnaam en de vakterm kunnen weg.' },
          explain: 'Vertaal naar het gevolg in gewone taal; de tool-naam en technische term horen in een bijlage voor de uitvoerders.' },
        { q: 'Maak in het lab alle vier de vertaalkeuzes goed. Welke vlag krijg je?', answer: ['NM{vertaal_niet_verdraai}'],
          hints: ['Lees bij elke keuze eerst de bron en vraag je af: beweert deze versie precies hetzelfde?', 'Er is steeds één versie die nog jargon is, één die de inhoud verandert en één die klopt.', 'Bij een fout kun je met "Opnieuw" de reeks nog eens doorlopen. De feedback zegt wat er misging.'],
          explain: 'Vier keer dezelfde regel: vereenvoudig de taal, niet de inhoud of de onzekerheid.' },
        { q: 'Wat mag je bij het vertalen van jargon nooit doen?', options: ['De inhoud of de onzekerheid verdraaien (bijvoorbeeld "waarschijnlijk" tot "zeker" maken)', 'Een analogie gebruiken', 'Een term één keer uitleggen', 'Technische details naar een bijlage verplaatsen'], answer: 0, explain: 'Je vereenvoudigt de taal, niet de inhoud: een aanname blijft een aanname en "waarschijnlijk" blijft "waarschijnlijk".' },
      ],
    },

    {
      title: 'Taak 5 — Een interventieadvies opbouwen',
      tryFirst: true,
      intro: '<p>Vijf collega\'s leveren elk een concept-advies in (A tot en met E). Vier ervan kunnen zo niet de deur uit, omdat er iets ontbreekt waardoor het advies niet wordt uitgevoerd of niet kan worden afgewogen. Zoek per concept uit wat er mist.</p>',
      content: `
        <p>Analyse zonder advies is een diagnose zonder recept. Het sluitstuk van bijna elk product is een
        <strong>interventieadvies</strong>: een voorstel voor wat er moet gebeuren. Een goed advies is geen losse kreet
        ("we moeten iets doen"), maar beantwoordt vijf vragen. Onthoud ze als <strong>wat, waarom, wie, wanneer,
        risico's</strong>.</p>

        <h3>De vijf bouwstenen</h3>
        <table>
          <thead><tr><th>Bouwsteen</th><th>De vraag</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td><strong>Wat</strong></td><td>Welke concrete maatregel?</td><td>Blokkeer uitvoerbare e-mailbijlagen (.exe, .scr) op de mailgateway.</td></tr>
            <tr><td><strong>Waarom</strong></td><td>Welke onderbouwing en welk effect? (de "so what?")</td><td>De laatste drie incidenten begonnen met zo'n bijlage; dit sluit die route af.</td></tr>
            <tr><td><strong>Wie</strong></td><td>Wie is de eigenaar?</td><td>Het team e-mailbeheer.</td></tr>
            <tr><td><strong>Wanneer</strong></td><td>Binnen welke termijn?</td><td>Binnen één week.</td></tr>
            <tr><td><strong>Risico's</strong></td><td>Welke neveneffecten, en wat als we niets doen?</td><td>Legitieme bijlagen kunnen sneuvelen (regel een uitzonderingsproces); niets doen houdt de instroom open.</td></tr>
          </tbody>
        </table>

        <h3>Waarom elke bouwsteen telt</h3>
        <ul>
          <li>Zonder <strong>wat</strong> is het geen advies maar een zorg.</li>
          <li>Zonder <strong>waarom</strong> kan de lezer je niet volgen en niet afwegen. Koppel het aan je bevinding en
          aan de "so what?"-test uit de intelligencecyclus-room.</li>
          <li>Zonder <strong>wie</strong> blijft het liggen. Een eigenaar is een naam of een rol, geen "iemand".</li>
          <li>Zonder <strong>wanneer</strong> is alles "ooit". Een termijn dwingt prioriteit af.</li>
          <li>Zonder <strong>risico's</strong> lijk je naïef. Benoem de neveneffecten (denk aan <em>displacement</em>: de
          dader wijkt uit naar een andere route) én de prijs van niets doen, zodat de beslisser een eerlijke afweging
          maakt.</li>
        </ul>

        <div class="callout info">
          <strong>Koppeling met de interventiematrix:</strong> in de crime-scripting-room koppelde je per fase van een
          crime script een maatregel aan een eigenaar. Een interventieadvies is precies zo'n cel, netjes uitgeschreven.
          Vaak geef je meer dan één optie, met de voor- en nadelen, zodat de beslisser kan kiezen in plaats van alleen
          ja/nee te zeggen.
        </div>

        <div class="callout tip">
          <strong>Vaakst vergeten:</strong> de eigenaar. Een advies zonder eigenaar en termijn gebeurt niet.
        </div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'vijf concept-adviezen',
        scenario: 'Vijf concept-adviezen uit verschillende zaken (fictief). Leg elk concept langs de vijf bouwstenen: wat, waarom, wie, wanneer, risico\'s.',
        records: [
          { title: 'Concept A', lines: ['Zet MFA aan op de VPN.', 'De laatste twee inbraken begonnen met een gelekt VPN-wachtwoord.', 'Uiterlijk 1 december.', 'Neveneffect: medewerkers zonder zakelijke telefoon kunnen niet inloggen; regel hardwaretokens.'] },
          { title: 'Concept B', lines: ['Blokkeer uitvoerbare bijlagen op de mailgateway.', 'De laatste drie incidenten begonnen met zo\'n bijlage.', 'Uitvoering: team e-mailbeheer, binnen één week.', 'Neveneffect: legitieme bijlagen kunnen sneuvelen; richt een uitzonderingsproces in. Niets doen houdt de route open.'] },
          { title: 'Concept C', lines: ['Laat de bank overboekingen naar nieuwe tegenrekeningen 24 uur vertragen.', 'In 9 van de 12 fraudes liep het geld via een pas geopende rekening.', 'Uitvoering: fraudeteam van de bank.', 'Neveneffect: daders wijken mogelijk uit naar betalingen in crypto.'] },
          { title: 'Concept D', lines: ['Zet het kassanetwerk in een eigen segment.', 'Uitvoering: netwerkbeheer, voor 1 maart.', 'Neveneffect: kans op storing tijdens de ombouw; plan het buiten openingstijd.'] },
          { title: 'Concept E', lines: ['Train de servicedesk op telefonische verzoeken om een wachtwoordreset.', 'De laatste inbraak begon met zo\'n telefoontje.', 'Uitvoering: hoofd servicedesk, dit kwartaal.'] },
        ],
      },
      questions: [
        { q: 'Welk concept (letter) is als enige compleet en kan zo naar de beslisser?', answer: ['B', 'concept B'],
          hints: ['Loop per concept de vijf bouwstenen af en streep af wat er staat.', 'Let ook op de prijs van niets doen: die hoort bij de risico\'s.', 'Het concept over de mailgateway.'],
          wrong: { 'A': 'A heeft een maatregel, een reden, een datum en een neveneffect. Maar wie gaat het doen?', 'C': 'C heeft geen termijn.' },
          explain: 'B noemt de maatregel, de onderbouwing, de eigenaar, de termijn en zowel het neveneffect als de prijs van niets doen.' },
        { q: 'Welk concept (letter) mist een eigenaar?', answer: ['A', 'concept A'],
          hints: ['Zoek het concept waarin geen team, rol of naam staat.', 'In vier concepten staat een regel die met "Uitvoering:" begint.', 'Het concept over MFA op de VPN.'],
          wrong: { 'D': 'D noemt netwerkbeheer als uitvoerder. D mist iets anders.' },
          why: 'In de praktijk is dit de fout die het vaakst voorkomt: iedereen is het eens met het advies en niemand voert het uit.',
          explain: 'Concept A zegt wat, waarom, wanneer en welk neveneffect, maar niet wie het oppakt.' },
        { q: 'In welk concept (letter) staat displacement als risico benoemd: de dader wijkt na de maatregel uit naar een andere route?', answer: ['C', 'concept C'],
          hints: ['Displacement betekent verplaatsing: het probleem verschuift.', 'Zoek een neveneffect dat over het gedrag van de dader gaat, niet over hinder voor de eigen organisatie.', 'Het concept waarin daders overstappen op crypto.'],
          wrong: { 'B': 'Bij B gaat het neveneffect over legitieme bijlagen die sneuvelen. Dat is hinder voor gebruikers, geen uitwijkgedrag van de dader.' },
          explain: 'Concept C benoemt dat daders kunnen uitwijken naar crypto. Dat is displacement, en het hoort bij de risico\'s.' },
        { q: 'Welk concept (letter) mist de onderbouwing, zodat de beslisser het niet kan afwegen?', answer: ['D', 'concept D'],
          hints: ['Zoek het concept dat niet zegt welke bevinding erachter zit.', 'Vier concepten noemen een incident, een patroon of een aantal als reden.', 'Het concept over het kassanetwerk.'],
          wrong: { 'E': 'E geeft wel een reden (de laatste inbraak begon met een telefoontje). E mist de risico\'s.' },
          explain: 'Concept D zegt wat, wie, wanneer en welk neveneffect, maar niet waarom. Zonder "waarom" is er geen koppeling met een bevinding en geen "so what?".' },
      ],
    },

    {
      title: 'Taak 6 — Coachen: til je team op',
      tryFirst: true,
      intro: '<p>Een collega vraagt je om zijn concept-notitie tegen te lezen voordat die naar de directie gaat. Het concept staat in het lab, met regelnummers. Zoek de regels waar je als reviewer een opmerking bij zou zetten.</p>',
      content: `
        <p>Naarmate je ervarener wordt, verschuift je waarde. Je maakt niet alleen betere producten, je maakt je
        <em>team</em> beter. Dat is coachen: niet het werk overnemen, maar ervoor zorgen dat de volgende analist het
        zelf goed doet — ook als jij er niet bent. Drie hefbomen werken bijzonder goed.</p>

        <h3>1. Peer review — vier ogen op elk oordeel</h3>
        <p>Laat een collega je product tegenlezen vóórdat het de deur uitgaat, en lees dat van anderen tegen. Een goede
        peer review is <strong>blame-vrij</strong> en gaat over het product, niet over de persoon. Vaste vragen:</p>
        <ul>
          <li>Staat de conclusie bovenaan (BLUF), en volgt de onderbouwing eruit?</li>
          <li>Zijn beweringen gelabeld als <em>bekend</em>, <em>afgeleid</em> of <em>aanname</em>? Wordt een aanname
          nergens als feit gepresenteerd?</li>
          <li>Klopt de waarschijnlijkheidstaal, en staat het betrouwbaarheidsniveau er apart bij?</li>
          <li>Heeft elk advies een eigenaar en een termijn? Beantwoordt het product de "so what?"</li>
        </ul>
        <p>Peer review vangt niet alleen fouten; het verspreidt ook de beste aanpak door het team. Wie andermans werk
        leest, leert minstens zoveel als wie het schrijft.</p>

        <h3>2. Methoden inbedden — maak goed gedrag de makkelijkste weg</h3>
        <p>Je wilt niet dat kwaliteit afhangt van wie toevallig de zaak draait. Bed de methoden daarom <em>in</em> het
        werkproces in, zodat ze vanzelf gebeuren:</p>
        <ul>
          <li>Een <strong>sjabloon</strong> met een vaste BLUF-kop, een labelkolom en een adviesblok (wat/waarom/wie/
          wanneer/risico's).</li>
          <li>Een korte <strong>checklist</strong> die de analist langsloopt: Admiralty-score ingevuld? ACH gedaan bij
          attributie? Gevoeligheidscheck uitgevoerd?</li>
          <li>Een gedeelde <strong>begrippenlijst</strong>, zodat iedereen "waarschijnlijk" hetzelfde gebruikt.</li>
        </ul>
        <p>Een methode in een cursus wordt vergeten; een methode in het sjabloon wordt gebruikt.</p>

        <h3>3. Tooling verbeteren — haal de sleur eruit</h3>
        <p>Let op waar het team tijd verliest aan saai, herhaald werk: handmatig IOC's overtikken, steeds dezelfde
        bronnen aflopen, defangen en refangen. Dát zijn kandidaten om te automatiseren of te verbeteren. Verzamel
        feedback ("waar loop je op vast?"), deel een handig script of een graaf-tool, en vier verbeteringen. Minder
        sleur betekent meer tijd voor het denkwerk dat alleen een mens kan doen.</p>

        <div class="callout tip">
          <strong>Onthoud:</strong> coachen is een <em>systeem</em> bouwen, geen heldendaad verrichten. Peer review,
          ingebedde methoden en betere tooling zorgen dat kwaliteit niet aan één persoon hangt, maar aan het team.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'concept-dreigingsnotitie.txt',
        lines: `CONCEPT dreigingsnotitie nepfactuurcampagne, voor: directie Noordkade Logistiek (fictief)
Op 3 maart kwam de eerste melding binnen, op 5 maart de tweede, op 9 maart nog vier.
Alle zes mails gebruikten dezelfde nepfactuur en hetzelfde afzenderdomein factuur-check.nm.lab. (bekend)
De mails komen van groep KOFFIEKAT.
Het afzenderdomein is op 1 maart geregistreerd. (bekend, bron: WHOIS)
Waarschijnlijk volgt er deze maand een nieuwe golf. (afgeleid; betrouwbaarheidsniveau: midden)
Advies: blokkeer factuur-check.nm.lab op de mailgateway. Eigenaar: team e-mailbeheer. Termijn: vandaag.
Advies: waarschuw de crediteurenadministratie voor de nepfactuur.
Conclusie: Noordkade is doelwit van een gerichte nepfactuurcampagne; er is nog geen betaling gedaan.`,
      },
      questions: [
        { q: 'Wat is het belangrijkste kenmerk van een goede peer review?', options: ['Blame-vrij en gericht op het product, niet op de persoon', 'Zo hard mogelijk kritiek geven op de collega', 'Alleen spelfouten zoeken', 'Pas doen nadat het product al verstuurd is'], answer: 0, explain: 'Een blame-vrije review op het product vangt fouten én verspreidt de beste aanpak door het team.' },
        { q: 'Op welke regel van het concept staat een aanname die als feit is opgeschreven? (regelnummer)', answer: ['4', 'regel 4'],
          hints: ['Zoek een bewering zonder label en zonder bron.', 'De meeste regels hebben (bekend) of (afgeleid) erachter. Welke stellige bewering heeft niets?', 'De regel waarin een groep bij naam wordt genoemd.'],
          wrong: { '6': 'Regel 6 is netjes gelabeld als afgeleid, met waarschijnlijkheidstaal en een betrouwbaarheidsniveau. Zo hoort het.', '9': 'Regel 9 staat op de verkeerde plek (de conclusie hoort bovenaan), maar het is geen aanname.' },
          explain: 'Regel 4 schrijft de mails zonder bron of label toe aan een groep. Attributie zonder onderbouwing is een aanname en moet zo gelabeld worden, of eruit.' },
        { q: 'Op welke regel staat een advies dat zo niet uitgevoerd wordt, omdat eigenaar en termijn ontbreken? (regelnummer)', answer: ['8', 'regel 8'],
          hints: ['Er staan twee adviezen in het concept. Vergelijk ze.', 'Eén advies noemt een team en een termijn, het andere niet.', 'Het advies over de crediteurenadministratie.'],
          wrong: { '7': 'Regel 7 heeft een eigenaar (team e-mailbeheer) en een termijn (vandaag).' },
          explain: 'Regel 8 zegt wat er moet gebeuren, maar niet wie het doet en wanneer. In een vast sjabloon met een adviesblok valt zo\'n gat meteen op.' },
      ],
    },

    {
      title: 'Taak 7 — STAR: vertaal je eigen ervaring',
      content: `
        <p>Tot nu toe ging het over het vertalen van <em>onderzoek</em> naar een product. Maar soms is jíj de bron. Bij
        een evaluatie (lessons learned), een overdracht, een functioneringsgesprek of een sollicitatie moet je je eigen
        ervaring overdragen. "Ik heb veel ransomware-zaken gedaan" zegt niemand iets. De <strong>STAR-methode</strong>
        geeft je ervaring structuur, zodat de luisteraar ziet wat je echt hebt gedaan en wat het opleverde.</p>

        <h3>De vier letters</h3>
        <ul>
          <li><strong>S — Situatie.</strong> De context, kort. Waar en wanneer speelde het, wat was er aan de hand?
          <em>"Tijdens een ransomware-incident bij een gemeente, vorig jaar, lagen drie bestandsservers plat."</em></li>
          <li><strong>T — Taak.</strong> Jouw opdracht of rol daarin. Wat was aan jou? <em>"Ik moest als analist binnen
          een dag bepalen of er ook data was weggesluisd, voor de datalekmelding."</em></li>
          <li><strong>A — Actie.</strong> Wat deed jíj concreet (niet "we", maar "ik")? <em>"Ik reconstrueerde de
          tijdlijn uit de EDR-logs, koppelde het externe IP via een partnerrapport aan een eerdere zaak en schreef een
          BLUF-advies."</em></li>
          <li><strong>R — Resultaat.</strong> De uitkomst, liefst meetbaar. <em>"Daardoor kon de FG de melding binnen de
          72 uur onderbouwd indienen, en blokkeerde het SOC het IP dezelfde middag."</em></li>
        </ul>

        <h3>Waarom STAR werkt</h3>
        <p>Het dwingt je weg van vaagheid ("ik ben goed in analyse") naar bewijs ("dit deed ik, dit kwam eruit"). Let op
        twee valkuilen:</p>
        <ul>
          <li><strong>Blijf bij "ik".</strong> Een team doet veel, maar de luisteraar wil jóúw aandeel horen. Gebruik bij
          de Actie bewust de ik-vorm.</li>
          <li><strong>Vergeet het Resultaat niet.</strong> Veel mensen stoppen na de Actie. Maar zonder resultaat weet
          niemand of het werkte. Maak het concreet: op tijd, voorkomen, teruggevonden, bespaard.</li>
        </ul>

        <div class="callout info">
          <strong>Koppeling:</strong> STAR is familie van BLUF en van lessons learned. Waar BLUF een <em>product</em>
          ordent (conclusie eerst), ordent STAR een <em>ervaring</em> (situatie, taak, actie, resultaat). Beide maken van
          een brij aan details iets wat een ander kan volgen en gebruiken.
        </div>

        <h3>Samenvatting van de room</h3>
        <ul>
          <li>Schrijf voor het juiste <strong>niveau</strong> (strategisch, tactisch, operationeel) en de bijbehorende
          beslissing.</li>
          <li>Kies de juiste <strong>productsoort</strong>: fenomeenanalyse, dreigingsbeeld, netwerkanalyse,
          subjectanalyse of zaakoverstijgende analyse.</li>
          <li>Zet met <strong>BLUF</strong> de conclusie en aanbeveling vooraan, met waarschijnlijkheidstaal, een
          eigenaar per advies en de onzekerheid apart.</li>
          <li>Vertaal je <strong>jargon</strong> zonder de inhoud te verdraaien.</li>
          <li>Bouw een <strong>interventieadvies</strong> met wat, waarom, wie, wanneer en risico's.</li>
          <li><strong>Coach</strong> je team via peer review, ingebedde methoden en betere tooling, en vertaal je eigen
          ervaring met <strong>STAR</strong>.</li>
        </ul>
      `,
      questions: [
        { q: 'Waar staat de A in de STAR-methode voor?', answer: ['Actie', 'actie', 'Action'], hint: 'Wat deed jíj concreet?', explain: 'A = Actie: wat je zelf concreet deed, bij voorkeur in de ik-vorm.' },
        { q: 'Welk onderdeel van STAR vergeten mensen het vaakst, terwijl het laat zien of het werkte?', options: ['Resultaat', 'Situatie', 'Taak', 'Actie'], answer: 0, explain: 'Zonder Resultaat (liefst meetbaar) weet de luisteraar niet wat je actie opleverde.' },
        { q: 'Waarom gebruik je bij de Actie bewust de ik-vorm in plaats van "we"?', options: ['De luisteraar wil jóúw aandeel horen, niet dat van het hele team', 'Omdat "we" grammaticaal fout is', 'Om het team te kleineren', 'Dat hoeft niet, "we" mag altijd'], answer: 0, explain: 'STAR draait om jouw bijdrage; de ik-vorm maakt duidelijk wat jij deed binnen het teamwerk.' },
        { q: 'Ik kan voor het juiste niveau een product kiezen, een BLUF-advies schrijven met eigenaar en onzekerheid, en mijn eigen ervaring met STAR vertellen.', noAnswer: true },
      ],
    },
  ],
  terms: [
    { term: 'Strategisch niveau', def: 'Producten voor directie en bestuur over de lange termijn en het grote plaatje; ondersteunen beleids- en investeringsbeslissingen.' },
    { term: 'Tactisch niveau', def: 'Producten voor teamleiding en coördinatie over de aanpak en prioriteiten van een thema of type zaak op de middellange termijn.' },
    { term: 'Operationeel niveau', def: 'Producten voor rechercheurs, analisten en het SOC over het hier en nu: één concrete zaak of subject, met directe handvatten.' },
    { term: 'Fenomeenanalyse', def: 'Analyse van een crimineel verschijnsel in de breedte: hoe het werkt, welke schakels, actoren en kwetsbaarheden erin zitten.' },
    { term: 'Dreigingsbeeld', def: 'Product dat dreigingen tegen elkaar afweegt, hun ernst inschat en de trend benoemt (stijgend, dalend, stabiel).' },
    { term: 'Netwerkanalyse', def: 'Analyse van de relaties en rollen tussen actoren: wie werkt met wie, wie is de spil en wie de kwetsbare tussenschakel.' },
    { term: 'Subjectanalyse', def: 'Analyse die in de diepte gaat over één persoon of entiteit, waarbij je bekend, afgeleid en aanname streng labelt.' },
    { term: 'Zaakoverstijgende analyse', def: 'Analyse die patronen en verbanden zoekt over meerdere zaken heen, bijvoorbeeld via een gedeeld kenmerk (pivot).' },
    { term: 'BLUF (Bottom Line Up Front)', def: 'Schrijfwijze waarbij conclusie en aanbeveling bovenaan staan en de onderbouwing daaronder; de kern eerst.' },
    { term: 'Interventieadvies', def: 'Voorstel voor een maatregel dat vijf vragen beantwoordt: wat, waarom, wie (eigenaar), wanneer en welke risico\'s.' },
    { term: 'Peer review', def: 'Blame-vrij tegenlezen van elkaars product op onder meer BLUF, labels, waarschijnlijkheidstaal en een eigenaar per advies.' },
    { term: 'STAR-methode', def: 'Structuur om je eigen ervaring over te brengen: Situatie, Taak, Actie en Resultaat, met de Actie in de ik-vorm.' },
  ],
  resources: [
    { title: 'NCSC — hulp, duiding en publicaties bij cyberdreigingen', url: 'https://www.ncsc.nl/' },
    { title: 'Europol — Main reports (o.a. IOCTA: een strategisch dreigingsbeeld)', url: 'https://www.europol.europa.eu/publications-events/main-reports' },
    { title: 'Animalz — Bottom Line Up Front: schrijven met de conclusie eerst', url: 'https://www.animalz.co/blog/bottom-line-up-front/' },
    { title: 'National Careers Service (UK) — The STAR method', url: 'https://nationalcareers.service.gov.uk/careers-advice/interview-advice/the-star-method' },
  ],
});
