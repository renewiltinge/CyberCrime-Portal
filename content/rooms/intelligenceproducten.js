/* Room: Intelligenceproducten & interventieadvies */

CS.registerRoom({
  id: 'intelligenceproducten',
  path: 'intelligence',
  order: 6,
  title: 'Intelligenceproducten & interventieadvies',
  icon: '📰',
  difficulty: 'Gemiddeld',
  minutes: 65,
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
          <strong>Beloning:</strong> de eerste vlag van deze room vat het in één zin samen —
          <code>NM{juiste_lezer_juist_niveau}</code>. Schrijf altijd voor de lezer en de beslissing, niet voor jezelf.
        </div>

        <div class="callout warn">
          <strong>Veelgemaakte fout:</strong> hetzelfde product naar alle drie de niveaus sturen. De directie haakt af
          bij de techniek, en het SOC mist de concrete actie. Knip je bevindingen op naar niveau, of schrijf tenminste
          per lezer een eigen samenvatting.
        </div>
      `,
      questions: [
        { q: 'Een bestuurder moet beslissen waar de organisatie de komende jaren geld en mensen op inzet. Welk niveau product past daarbij?', options: ['Strategisch', 'Tactisch', 'Operationeel', 'Geen enkel'], answer: 0, explain: 'Lange termijn, groot plaatje, een investerings- of beleidsbeslissing: dat is strategisch.' },
        { q: 'Een SOC-analist moet nú iets doen met een verdachte verbinding in één zaak. Welk niveau past daarbij?', options: ['Strategisch', 'Tactisch', 'Operationeel'], answer: 2, explain: 'Het hier en nu, één concrete zaak met directe handvatten (IOC\'s, een blokkade): dat is operationeel.' },
        { q: 'Op welk niveau bepaal je de aanpak en prioriteiten voor een heel type zaak of thema (bijvoorbeeld de moneymule-structuur)?', answer: ['tactisch', 'Tactisch', 'tactisch niveau'], hint: 'Tussen het grote plaatje en de losse zaak in.', explain: 'Het tactische niveau gaat over de aanpak van een thema of type zaak, voor teamleiding en coördinatie.' },
        { q: 'Wat is de eerste vlag van deze room (zie de groene tip)?', answer: ['NM{juiste_lezer_juist_niveau}'], hint: 'Staat in de beloning onderaan de taak.' },
      ],
    },

    {
      title: 'Taak 2 — Productsoorten: kies het juiste gereedschap',
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
      questions: [
        { q: 'Je wilt weten welke dreigingen het komende jaar op je afkomen en welke groter worden. Welke productsoort maak je?', options: ['Dreigingsbeeld', 'Subjectanalyse', 'Netwerkanalyse', 'Fenomeenanalyse'], answer: 0, explain: 'Een dreigingsbeeld weegt dreigingen af en benoemt de trend, vaak op strategisch niveau.' },
        { q: 'Welke productsoort brengt in kaart wie met wie samenwerkt en wie de spil of zwakke schakel is?', answer: ['netwerkanalyse', 'Netwerkanalyse'], hint: 'Het gaat om relaties en rollen tussen actoren.', explain: 'Een netwerkanalyse tekent relaties en rollen; je zoekt de spil en de kwetsbare tussenschakel.' },
        { q: 'Je vermoedt dat drie losse phishingzaken bij elkaar horen door een gedeeld certificaat. Welke productsoort past?', options: ['Zaakoverstijgende analyse', 'Fenomeenanalyse', 'Dreigingsbeeld', 'Subjectanalyse'], answer: 0, explain: 'Patronen en verbanden over meerdere zaken heen zoeken is een zaakoverstijgende analyse (het pivot-werk).' },
        { q: 'Welke productsoort gaat in de diepte over één persoon of entiteit, waarbij je bekend/afgeleid/aanname streng labelt?', answer: ['subjectanalyse', 'Subjectanalyse'], hint: 'Het "subject" is het middelpunt.', explain: 'Een subjectanalyse draait om één entiteit; onzuiver labelen kan iemand onterecht raken.' },
      ],
    },

    {
      title: 'Taak 3 — BLUF: zet de conclusie vooraan',
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
          <strong>Omgekeerde piramide:</strong> journalisten schrijven zo al eeuwen. Het belangrijkste eerst, daarna
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

        <div class="callout tip">
          <strong>Beloning:</strong> de tweede vlag is de hele les in twee woorden — <code>NM{conclusie_bovenaan}</code>.
        </div>
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
        { q: 'Waar staat "BLUF" voor?', answer: ['Bottom Line Up Front', 'bottom line up front', 'bottom line upfront'], hint: 'Engels; letterlijk "de kern vooraan".', explain: 'BLUF = Bottom Line Up Front: de conclusie en aanbeveling bovenaan, de onderbouwing daaronder.' },
        { q: 'Wat hoort volgens de vuistregels NIET in de eerste zinnen van een BLUF-product, maar pas daaronder?', options: ['De gedetailleerde chronologie en het bewijs', 'De conclusie', 'De aanbeveling', 'Het betrouwbaarheidsniveau'], answer: 0, explain: 'Conclusie, aanbeveling en de mate van zekerheid staan bovenaan; de details en de tijdlijn komen eronder.' },
        { q: 'Waarom zet je achter elke aanbeveling een eigenaar?', options: ['Een advies zonder naam erbij voert niemand uit', 'Om het product langer te maken', 'Omdat dat verplicht is in de AVG', 'Om de bron te verbergen'], answer: 0, explain: 'Met een eigenaar (en een termijn) wordt een advies een actie; zonder eigenaar blijft het een vrome wens.' },
        { q: 'Wat is de tweede vlag van deze room (zie de groene tip)?', answer: ['NM{conclusie_bovenaan}'], hint: 'Staat in de beloning onderaan de taak.' },
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
      questions: [
        { q: 'Je schrijft voor een bestuurder. Wat doe je met de zin "de actor exfiltreerde data met rclone over een versleuteld C2-kanaal"?', options: ['Je vertaalt het naar gewone taal, bijvoorbeeld "de aanvaller kopieerde bestanden naar buiten via een verborgen verbinding"', 'Je laat het precies zo staan', 'Je voegt nog meer afkortingen toe', 'Je laat de hele zin weg'], answer: 0, explain: 'Vertaal naar het gevolg in gewone taal; de tool-naam en technische term horen in een bijlage voor de uitvoerders.' },
        { q: 'Hoe heet de controle waarbij je je samenvatting laat lezen door iemand buiten je vakgebied?', answer: ['collega-test', 'collegatest', 'oma-test', 'de collega-test'], hint: 'Ook wel de "oma-test" genoemd.', explain: 'Struikelt een niet-specialist over een woord, dan vertaal je het. Dat is de collega- of oma-test.' },
        { q: 'Wat mag je bij het vertalen van jargon nooit doen?', options: ['De inhoud of de onzekerheid verdraaien (bijvoorbeeld "waarschijnlijk" tot "zeker" maken)', 'Een analogie gebruiken', 'Een term één keer uitleggen', 'Technische details naar een bijlage verplaatsen'], answer: 0, explain: 'Je vereenvoudigt de taal, niet de inhoud: een aanname blijft een aanname en "waarschijnlijk" blijft "waarschijnlijk".' },
      ],
    },

    {
      title: 'Taak 5 — Een interventieadvies opbouwen',
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
          <strong>Beloning:</strong> de derde vlag herinnert je aan de bouwsteen die het vaakst wordt vergeten —
          <code>NM{advies_met_eigenaar}</code>. Een advies zonder eigenaar en termijn gebeurt niet.
        </div>
      `,
      questions: [
        { q: 'Welke vijf bouwstenen horen in een volledig interventieadvies?', answer: ['wat waarom wie wanneer risico\'s', 'wat, waarom, wie, wanneer, risico\'s', 'wat waarom wie wanneer risicos'], hint: 'Een concrete maatregel, de onderbouwing, de eigenaar, de termijn en de neveneffecten.', explain: 'Wat, waarom, wie (eigenaar), wanneer (termijn) en risico\'s maken van een zorg een uitvoerbaar advies.' },
        { q: 'Welke bouwsteen koppelt het advies aan je bevinding en aan de "so what?"-test?', options: ['Waarom', 'Wat', 'Wanneer', 'Wie'], answer: 0, explain: 'Het "waarom" geeft de onderbouwing en het verwachte effect; zonder dat kan de lezer niet afwegen.' },
        { q: 'Een dader wijkt na je maatregel uit naar een andere route. Hoe heet dit neveneffect dat je bij de risico\'s benoemt?', answer: ['displacement', 'verplaatsing'], hint: 'Engelse term uit de crime-scripting-room; het probleem verplaatst zich.', explain: 'Displacement (verplaatsing) hoort bij de risico\'s: de interventie verplaatst het probleem in plaats van het op te lossen.' },
        { q: 'Wat is de derde vlag van deze room (zie de groene tip)?', answer: ['NM{advies_met_eigenaar}'], hint: 'Staat in de beloning onderaan de taak.' },
      ],
    },

    {
      title: 'Taak 6 — Coachen: til je team op',
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
      questions: [
        { q: 'Wat is het belangrijkste kenmerk van een goede peer review?', options: ['Blame-vrij en gericht op het product, niet op de persoon', 'Zo hard mogelijk kritiek geven op de collega', 'Alleen spelfouten zoeken', 'Pas doen nadat het product al verstuurd is'], answer: 0, explain: 'Een blame-vrije review op het product vangt fouten én verspreidt de beste aanpak door het team.' },
        { q: 'Waarom bed je methoden in een sjabloon en checklist in plaats van ze alleen in een cursus te behandelen?', options: ['Een methode in het sjabloon wordt gebruikt; een methode in een cursus wordt vergeten', 'Sjablonen zijn goedkoper dan cursussen', 'Omdat cursussen verboden zijn', 'Zodat niemand de methode hoeft te kennen'], answer: 0, explain: 'Door de methode in het werkproces te bedden, gebeurt goed gedrag vanzelf en hangt kwaliteit niet af van wie de zaak draait.' },
        { q: 'Welk soort werk is de beste kandidaat om te automatiseren of met betere tooling aan te pakken?', answer: ['saai herhaald werk', 'herhaald werk', 'repeterend werk', 'sleur'], hint: 'Denk aan IOC\'s overtikken of steeds dezelfde bronnen aflopen.', explain: 'Saai, herhaald werk (zoals IOC\'s overtikken of defangen) kost tijd en voegt weinig denkwerk toe; automatiseer dat.' },
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
