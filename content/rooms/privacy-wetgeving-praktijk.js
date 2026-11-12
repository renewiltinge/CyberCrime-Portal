/* Room: Privacy en wetgeving in de praktijk: AVG, NIS2/Cyberbeveiligingswet en Wwft */
CS.registerRoom({
  id: 'privacy-wetgeving-praktijk',
  path: 'forensie',
  order: 13,
  title: 'Privacy en wetgeving in de praktijk',
  icon: '⚖️',
  difficulty: 'Gemiddeld',
  minutes: 90,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'De AVG breder dan de meldplicht, NIS2 en de Cyberbeveiligingswet, en de Wwft. Je kiest grondslagen, schrapt overbodige gegevens, rekent termijnen uit, loopt een DPIA door en vindt de UBO die geld opknipt.',
  objectives: [
    'Bij een verwerking de passende grondslag uit artikel 6 AVG kiezen en uitleggen waarom',
    'Doelbinding, dataminimalisatie en opslagbeperking toepassen op een echt formulier, en bijzondere persoonsgegevens herkennen',
    'Verzoeken van betrokkenen herkennen, de termijn berekenen en weten wanneer je (deels) mag weigeren',
    'Uitleggen wanneer een DPIA en een verwerkersovereenkomst nodig zijn en wat de Autoriteit Persoonsgegevens doet',
    'De meldtermijnen van de AVG en NIS2 naast elkaar zetten en voor een incident uitrekenen',
    'Het cliëntenonderzoek en de meldplicht van de Wwft toepassen, inclusief het vaststellen van de UBO',
  ],
  tasks: [
    {
      title: 'Taak 1: De AVG en de zes grondslagen',
      tryFirst: true,
      intro: '<p>In het lab staan zestien verwerkingen van persoonsgegevens. Vier ervan rusten op een overeenkomst, vier op een wettelijke verplichting, vier op toestemming en vier op een gerechtvaardigd belang. Zet ze in de juiste groep. Twijfel je, vraag je dan af: wat gebeurt er als de persoon nee zegt?</p>',
      content: `
        <p>De <strong>Algemene verordening gegevensbescherming</strong> (AVG; Verordening (EU) 2016/679, in het
        Engels GDPR) geldt sinds 25 mei 2018 in de hele EU. Nederland vult haar aan met de Uitvoeringswet AVG (UAVG).
        Een <strong>persoonsgegeven</strong> is alle informatie over een geïdentificeerde of identificeerbare
        persoon: een naam, maar ook een IP-adres, een klantnummer of een foto.</p>
        <p>Twee rollen komen steeds terug. De <strong>verwerkingsverantwoordelijke</strong> bepaalt het doel en de
        middelen. De <strong>verwerker</strong> verwerkt in opdracht, bijvoorbeeld een cloudleverancier of
        salarisbureau.</p>

        <h3>Zonder grondslag geen verwerking</h3>
        <p>Artikel 6 lid 1 AVG noemt zes grondslagen. Elke verwerking moet op minstens één ervan rusten, en je kiest
        hem vooraf, per doel.</p>
        <ol type="a">
          <li><strong>Toestemming</strong>: vrij, specifiek, geïnformeerd en ondubbelzinnig, en net zo makkelijk in te
          trekken als te geven.</li>
          <li><strong>Uitvoering van een overeenkomst</strong> met de betrokkene, of stappen op diens verzoek
          voordat die wordt gesloten.</li>
          <li><strong>Wettelijke verplichting</strong> die op de verantwoordelijke rust.</li>
          <li><strong>Vitaal belang</strong>: het leven of de gezondheid van iemand beschermen.</li>
          <li><strong>Algemeen belang of openbaar gezag</strong>: een publieke taak.</li>
          <li><strong>Gerechtvaardigd belang</strong> van de verantwoordelijke of een derde, na een afweging tegen de
          belangen en grondrechten van de betrokkene.</li>
        </ol>

        <h3>Drie vuistregels</h3>
        <ul>
          <li>Toestemming is alleen geldig als nee zeggen echt kan, zonder nadeel. Tussen werkgever en werknemer is
          dat zelden zo, door de gezagsverhouding.</li>
          <li>"Noodzakelijk voor de overeenkomst" is strenger dan het klinkt: het moet nodig zijn om de afspraak
          zelf na te komen, niet alleen handig voor de onderneming.</li>
          <li>Een gerechtvaardigd belang vraagt een afweging in drie stappen (is het belang legitiem, is de
          verwerking noodzakelijk, wegen de belangen van de betrokkene niet zwaarder?) en die leg je vast.
          Overheidsorganen kunnen deze grondslag niet gebruiken voor het uitvoeren van hun publieke taken.</li>
        </ul>

        <div class="callout info">
          <strong>Voorbeeld:</strong> een webshop gebruikt het adres van een klant om een pakket te bezorgen
          (overeenkomst), bewaart de factuur voor de Belastingdienst (wettelijke verplichting) en mag dezelfde
          klant later per post wijzen op een vergelijkbaar product, mits hij daar bezwaar tegen kan maken. Eén klant,
          drie doelen, drie grondslagen.
        </div>
        <p>De Europese toezichthouders hebben in hun gezamenlijke richtsnoeren (EDPB) uitgewerkt hoe je deze
        grondslagen toepast. In Nederland is de <strong>Autoriteit Persoonsgegevens</strong> (AP) de toezichthouder.</p>
      `,
      lab: {
        type: 'connections',
        title: 'Zestien verwerkingen, vier grondslagen',
        prompt: 'Zoek de vier groepen van vier. Elke verwerking hoort bij precies één grondslag.',
        flag: 'NM{grondslag_per_doel}',
        groups: [
          { name: 'Uitvoering van een overeenkomst', items: ['Bezorgadres gebruiken om een bestelling te leveren', 'IBAN van een werknemer gebruiken om salaris over te maken', 'Klant bellen om de monteursafspraak te bevestigen', 'Factuur van een abonnement naar het e-mailadres sturen'] },
          { name: 'Wettelijke verplichting', items: ['Loonadministratie bewaren voor de fiscale bewaarplicht', 'Identiteit van een nieuwe bankklant vaststellen', 'Ongebruikelijke transactie melden bij FIU-Nederland', 'Datalek melden bij de Autoriteit Persoonsgegevens'] },
          { name: 'Toestemming', items: ['Nieuwsbrief mailen aan iemand die nooit klant was', 'Advertentiecookies die surfgedrag volgen', 'Locatie volgen voor een optionele functie in een app', 'Foto in het openbare ledenoverzicht van de sportclub'] },
          { name: 'Gerechtvaardigd belang', items: ['Camera bij de ingang van een magazijn tegen diefstal', 'Firewall- en inloglogs bewaren om aanvallen te onderzoeken', 'Bestellingen van een webshop analyseren op fraudesignalen', 'Bestaande klanten per post wijzen op een vergelijkbaar product'] },
        ],
      },
      questions: [
        { q: 'Los de vier groepen op. Welke vlag verschijnt?', answer: ['NM{grondslag_per_doel}'],
          hints: ['Begin met de groep die je het zekerst weet: wat moet een organisatie doen omdat een wet het zegt?', 'Bij toestemming kan de persoon nee zeggen zonder dat de dienst stopt. Bij een overeenkomst valt de afspraak om als je de gegevens niet gebruikt.', 'Camerabewaking, logging, fraudeanalyse en postreclame aan bestaande klanten vragen allemaal om een belangenafweging.'],
          explain: 'Vier groepen, vier grondslagen. Een organisatie die per doel de grondslag vastlegt, kan bij een vraag van de AP direct laten zien waarom ze iets mag.' },
        { q: 'Een werkgever vraagt alle medewerkers een formulier te tekenen waarin ze "toestemming" geven om hun e-mail te laten scannen op datalekken. Wat is het probleem?', options: ['Toestemming is hier waarschijnlijk niet vrij gegeven, omdat medewerkers afhankelijk zijn van hun werkgever; een andere grondslag met een belangenafweging past beter', 'Toestemming moet altijd mondeling worden gegeven', 'Scannen op datalekken is onder de AVG altijd verboden', 'Er is geen probleem: met een handtekening is toestemming altijd geldig'], answer: 0,
          wrong: { 1: 'De AVG schrijft geen vorm voor. Een organisatie moet toestemming wel kunnen aantonen, en daarvoor is iets op schrift juist handig.', 2: 'Beveiliging van e-mail kan een gerechtvaardigd belang zijn, mits noodzakelijk, proportioneel en vastgelegd.', 3: 'Een handtekening maakt toestemming niet vrij. Wie nee zegt tegen de baas, voelt zich zelden vrij.' },
          why: 'Toestemming die niet vrij is, is ongeldig. Dan heeft de verwerking achteraf geen grondslag, terwijl een goed onderbouwd gerechtvaardigd belang er wel had kunnen zijn.',
          explain: 'Door de gezagsverhouding is toestemming van werknemers zelden vrij. Beveiliging van e-mail kan wel rusten op een gerechtvaardigd belang, met een vastgelegde afweging en waar nodig instemming van de ondernemingsraad.' },
        { q: 'Een gemeente wil camerabewaking in het stadhuis baseren op "gerechtvaardigd belang". Welke letter van artikel 6 lid 1 kan zij voor haar publieke taak niet gebruiken?', answer: ['f', '(f)', 'f.'],
          hints: ['Kijk naar de genummerde lijst in de uitleg.', 'Het is de grondslag met een belangenafweging.', 'De laatste letter van de lijst.'],
          wrong: { 'e': 'Juist (e), algemeen belang of openbaar gezag, is de grondslag die een overheid voor haar taken gebruikt.', 'a': 'Toestemming kan een overheid in sommige gevallen wel gebruiken, al is ze ook daar vaak niet vrij.' },
          explain: 'Grondslag (f), gerechtvaardigd belang, staat niet open voor overheidsorganen bij de uitvoering van hun taken. De gemeente moet een grondslag in de wet vinden, meestal via (e).' },
      ],
    },

    {
      title: 'Taak 2: Doelbinding, dataminimalisatie en bijzondere gegevens',
      tryFirst: true,
      intro: '<p>Sportschool FitPolder (fictief) vraagt je het inschrijfformulier na te lopen. In het lab staat elk veld met wat ermee gebeurt. Zoek uit welke velden niet nodig zijn voor het doel, welke bijzondere persoonsgegevens bevatten, en wat er mis is met de bewaartermijn.</p>',
      content: `
        <p>Artikel 5 AVG noemt de beginselen waar elke verwerking aan moet voldoen. Je kunt ze zien als de
        bouwvoorschriften: ook met een geldige grondslag (taak 1) moet het gebouw nog aan de regels voldoen.</p>
        <ul>
          <li><strong>Rechtmatigheid, behoorlijkheid en transparantie</strong>: een grondslag, eerlijk handelen, en
          mensen vertellen wat je doet (de privacyverklaring).</li>
          <li><strong>Doelbinding</strong>: je verzamelt voor een welbepaald, uitdrukkelijk omschreven doel, en
          gebruikt de gegevens niet voor iets wat daar niet mee verenigbaar is. "Misschien later handig" is geen doel.</li>
          <li><strong>Minimale gegevensverwerking</strong> (dataminimalisatie): niet meer dan nodig voor dat doel.</li>
          <li><strong>Juistheid</strong>: kloppende en zo nodig bijgewerkte gegevens.</li>
          <li><strong>Opslagbeperking</strong>: niet langer bewaren dan nodig. Leg per soort gegeven een termijn vast.</li>
          <li><strong>Integriteit en vertrouwelijkheid</strong>: passende beveiliging.</li>
          <li><strong>Verantwoordingsplicht</strong>: je moet kunnen aantonen dat je aan dit alles voldoet.</li>
        </ul>

        <h3>Bijzondere persoonsgegevens</h3>
        <p>Artikel 9 AVG verbiedt in beginsel het verwerken van gegevens over ras of etnische afkomst, politieke
        opvattingen, religie of levensovertuiging, lidmaatschap van een vakbond, genetische gegevens,
        <em>biometrische gegevens met het oog op unieke identificatie</em>, gezondheid, en seksueel gedrag of
        gerichtheid. Er zijn uitzonderingen, zoals uitdrukkelijke toestemming. Biometrie voor identificatie mag in
        Nederland volgens de UAVG alleen als het noodzakelijk is voor authenticatie of beveiliging. De AP legt die
        lat hoog: als een pasje of code volstaat, is biometrie meestal niet noodzakelijk.</p>
        <p>Een gewone foto is niet automatisch biometrisch. Dat wordt hij pas als hij met speciale techniek wordt
        verwerkt om iemand uniek te identificeren, zoals bij gezichtsherkenning.</p>

        <h3>Het burgerservicenummer</h3>
        <p>Het BSN is geen bijzonder persoonsgegeven, maar wel extra beschermd: een organisatie mag het alleen
        gebruiken als een wet dat voorschrijft of toestaat. Werkgevers, zorgverleners en de overheid hebben zo'n
        wettelijke basis; een webwinkel of vereniging niet.</p>

        <div class="callout tip">
          <strong>Werkwijze:</strong> zet het doel bovenaan en loop elk veld af met drie vragen. Is het nodig voor
          dit doel? Is het bijzonder of extra beschermd? Hoe lang heb ik het nodig?
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'inschrijfformulier FitPolder (fictief)',
        lines: `DOEL: lidmaatschap beheren, toegang tot de sportschool, contributie innen
veld 01  naam                              gebruikt voor: ledenadministratie, ledenpas
veld 02  adres                             gebruikt voor: contract, post
veld 03  e-mailadres                       gebruikt voor: bevestigingen, facturen
veld 04  IBAN                              gebruikt voor: incasso contributie
veld 05  geboortedatum                     gebruikt voor: jeugdtarief tot 18 jaar
veld 06  burgerservicenummer               gebruikt voor: niets (stond in het oude formulier)
veld 07  kopie paspoort                    gebruikt voor: niets ("voor de zekerheid")
veld 08  vingerafdruk                      gebruikt voor: toegangspoortje bij de ingang
veld 09  religie                           gebruikt voor: niets
veld 10  noodcontact (naam, telefoon)      gebruikt voor: bellen bij een ongeval in de zaal
veld 11  medische bijzonderheden (vrijwillig) gebruikt voor: instructeur houdt rekening met blessures
veld 12  beroep en werkgever               gebruikt voor: "misschien later voor zakelijke abonnementen"
veld 13  pasfoto                           gebruikt voor: ledenpas, controle aan de balie
BEWAARTERMIJN: alle velden worden onbeperkt bewaard, ook na opzegging`,
      },
      questions: [
        { q: 'Hoeveel velden worden niet gebruikt voor het doel dat bovenaan staat?', answer: ['4', 'vier'],
          hints: ['Zoek de velden zonder echt gebruik.', 'Filter op niets, en kijk ook naar het veld met "misschien later".', 'Drie keer niets en één keer een toekomstig, nog niet bestaand doel.'],
          wrong: { '3': 'Ook veld 12 telt: "misschien later" is geen welbepaald doel. Dat is in strijd met doelbinding én dataminimalisatie.', '5': 'De pasfoto wordt wel gebruikt: op de ledenpas en voor controle aan de balie.' },
          explain: 'Vier: het BSN (06), de paspoortkopie (07), religie (09) en beroep en werkgever (12). Die gaan van het formulier af.' },
        { q: 'Hoeveel velden bevatten bijzondere persoonsgegevens in de zin van artikel 9 AVG?', answer: ['3', 'drie'],
          hints: ['Loop de lijst uit de uitleg langs: religie, gezondheid, biometrie voor identificatie, en zo verder.', 'Het BSN is extra beschermd, maar staat niet in artikel 9.', 'Religie, de vingerafdruk en de medische bijzonderheden.'],
          wrong: { '4': 'Je telt het BSN of de pasfoto mee. Het BSN is extra beschermd maar niet bijzonder; een pasfoto is pas biometrisch als hij met speciale techniek voor unieke identificatie wordt verwerkt.', '2': 'Een vingerafdruk voor het toegangspoortje is biometrie met het oog op unieke identificatie.' },
          why: 'Voor bijzondere gegevens is een gewone grondslag niet genoeg: je hebt daarnaast een uitzondering op het verbod nodig. Wie dat mist, verwerkt onrechtmatig, ook als het formulier verder klopt.',
          explain: 'Drie: religie (09), de vingerafdruk (08) en de medische bijzonderheden (11). Voor de medische gegevens is uitdrukkelijke toestemming hier de route; de religie hoort er helemaal niet op.' },
        { q: 'Welk veldnummer mag FitPolder ook met toestemming van het lid niet verwerken, omdat daarvoor een wettelijke basis nodig is?', answer: ['06', '6', 'veld 06', 'veld 6'],
          hints: ['Het gaat om een nummer dat de overheid uitgeeft.', 'Lees het stukje over het burgerservicenummer.', 'Het veld dat "in het oude formulier stond".'],
          wrong: { '07': 'Een paspoortkopie is niet nodig en dus in strijd met dataminimalisatie, maar het extra wettelijke slot zit op het nummer dat erin staat, het BSN.', '08': 'Voor de vingerafdruk gelden strenge eisen, maar dat is een andere regel: noodzaak voor authenticatie of beveiliging.' },
          explain: 'Veld 06, het BSN. Alleen een wet kan het gebruik ervan toestaan, en voor een sportschool bestaat die niet.' },
        { q: 'Welk beginsel uit artikel 5 schendt de regel over de bewaartermijn het duidelijkst?', options: ['Juistheid', 'Opslagbeperking', 'Transparantie', 'Integriteit en vertrouwelijkheid'], answer: 1,
          wrong: { 0: 'Juistheid gaat over kloppende gegevens. Het probleem is hier niet dat ze onjuist zijn, maar dat ze nooit weggaan.', 2: 'Als FitPolder dit netjes in de privacyverklaring zet, is het transparant, maar nog steeds niet toegestaan.', 3: 'Beveiliging staat hier niet ter discussie.' },
          explain: 'Onbeperkt bewaren na opzegging is in strijd met opslagbeperking. Leg per veld een termijn vast: de IBAN en facturen voor de fiscale bewaarplicht, de vingerafdruk direct weg bij opzegging.' },
      ],
    },

    {
      title: 'Taak 3: Rechten van betrokkenen',
      tryFirst: true,
      intro: '<p>De privacymailbox van FitPolder bevat zes verzoeken van oktober 2026. Bepaal per verzoek welk recht er wordt ingeroepen, wanneer je uiterlijk moet antwoorden, en welk verzoek je niet zomaar mag uitvoeren.</p>',
      content: `
        <p>De AVG geeft mensen over wie je gegevens verwerkt, de <strong>betrokkenen</strong>, een reeks rechten. Ze
        hoeven daarvoor geen formulier te gebruiken, geen wetsartikel te noemen en niets te betalen. Een mail of een
        opmerking aan de balie is genoeg.</p>
        <table>
          <thead><tr><th>Artikel</th><th>Recht</th><th>In gewone woorden</th></tr></thead>
          <tbody>
            <tr><td>15</td><td>Inzage</td><td>Welke gegevens heb je, waarvoor, van wie, aan wie, hoe lang?</td></tr>
            <tr><td>16</td><td>Rectificatie</td><td>Verbeter wat niet klopt.</td></tr>
            <tr><td>17</td><td>Wissing ("vergetelheid")</td><td>Verwijder mijn gegevens.</td></tr>
            <tr><td>18</td><td>Beperking</td><td>Gebruik ze even niet, bijvoorbeeld zolang een geschil loopt.</td></tr>
            <tr><td>20</td><td>Overdraagbaarheid</td><td>Geef mijn gegevens in een gangbaar, machineleesbaar bestand.</td></tr>
            <tr><td>21</td><td>Bezwaar</td><td>Stop met deze verwerking.</td></tr>
            <tr><td>22</td><td>Geen besluit alleen door een computer</td><td>Een mens moet meekijken bij besluiten met grote gevolgen.</td></tr>
          </tbody>
        </table>

        <h3>De termijn</h3>
        <p>Je reageert zonder onnodige vertraging en uiterlijk <strong>binnen één maand</strong> na ontvangst
        (artikel 12). Bij complexe of veel verzoeken mag je die termijn met twee maanden verlengen, maar dat meld je
        binnen de eerste maand, met redenen. Een maand loopt van datum tot dezelfde datum: een verzoek van 10 maart
        moet uiterlijk 10 april beantwoord zijn.</p>

        <h3>Grenzen</h3>
        <ul>
          <li><strong>Wissing</strong> geldt niet als je de gegevens moet bewaren voor een wettelijke verplichting,
          zoals de fiscale bewaarplicht voor facturen. Je wist dan wat je kunt en legt uit wat blijft.</li>
          <li><strong>Overdraagbaarheid</strong> geldt alleen voor gegevens die de betrokkene zelf heeft verstrekt
          of door zijn gebruik zijn ontstaan, en die je op basis van toestemming of een overeenkomst geautomatiseerd
          verwerkt.</li>
          <li><strong>Bezwaar tegen direct marketing</strong> is absoluut: je stopt, zonder afweging.</li>
          <li><strong>Identiteit</strong>: heb je redelijke twijfel over wie het verzoek doet, dan mag je om aanvullende
          informatie vragen. Gegevens van iemand anders sturen naar wie erom vraagt, is zelf een datalek.</li>
        </ul>
        <div class="callout warn">
          <strong>Let op:</strong> geen antwoord binnen de termijn is een klacht bij de AP waard, ook als het antwoord
          uiteindelijk "we hebben niets" had moeten zijn.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'privacy@fitpolder.nm.lab, oktober 2026',
        lines: `V-01 ontvangen 2026-10-02  van: l.hendriks@mail.example   "Welke gegevens hebben jullie over mij en aan wie geven jullie die door?"
V-02 ontvangen 2026-10-05  van: s.yilmaz@mail.example     "Mijn adres klopt niet meer, het is nu Dijkstraat 4."
V-03 ontvangen 2026-10-09  van: p.dewit@mail.example      "Ik heb opgezegd. Verwijder al mijn gegevens, ook mijn facturen van 2025."
V-04 ontvangen 2026-10-14  van: r.bakker@mail.example     "Stuur mijn trainingsgegevens uit de app in een bestand dat ik bij een andere sportschool kan inladen."
V-05 ontvangen 2026-10-20  van: m.visser@mail.example     "Stop met het gebruiken van mijn gegevens voor jullie reclamefolders."
V-06 ontvangen 2026-10-31  van: snelmail4471@gratis.example "Stuur alle gegevens die jullie hebben over mijn buurman J. Kramer naar dit adres."`,
      },
      questions: [
        { q: 'Wanneer moet FitPolder uiterlijk antwoorden op V-01? (JJJJ-MM-DD)', answer: ['2026-11-02', '2 november 2026', '02-11-2026', '2-11-2026'],
          hints: ['Zoek de ontvangstdatum van V-01.', 'De termijn is één maand, van datum tot dezelfde datum.', 'Van 2 oktober naar 2 ...'],
          wrong: { '2026-10-30': 'Je rekent met dertig dagen. De AVG rekent in maanden: van datum tot dezelfde datum in de volgende maand.', '2027-01-02': 'Dat is de termijn mét verlenging. Verlengen mag alleen bij complexe of veel verzoeken, en moet binnen de eerste maand worden gemeld.' },
          explain: '2 november 2026. Een inzageverzoek is meestal niet complex genoeg voor verlenging.' },
        { q: 'Welk verzoek kan FitPolder maar deels uitvoeren, omdat een wettelijke plicht voorgaat?', answer: ['V-03', 'v03', 'v3'],
          hints: ['Zoek een verzoek om te wissen.', 'Facturen vallen onder de fiscale bewaarplicht.', 'Het verzoek van iemand die heeft opgezegd.'],
          wrong: { 'V-05': 'Bezwaar tegen direct marketing is absoluut. Daar voer je het hele verzoek uit.', 'V-04': 'Trainingsgegevens die door gebruik van de app zijn ontstaan, vallen onder overdraagbaarheid. Daar staat geen wettelijke plicht tegenover.' },
          explain: 'V-03. De profielgegevens, de vingerafdruk en de rest gaan weg; de facturen blijven tot de fiscale bewaartermijn verstreken is. Leg dat uit in het antwoord.' },
        { q: 'Welk verzoek voer je niet uit zoals gevraagd, omdat je daarmee zelf een datalek zou veroorzaken?', answer: ['V-06', 'v06', 'v6'],
          hints: ['Zoek een verzoek over iemand anders dan de afzender.', 'Een recht op inzage geldt voor je eigen gegevens.', 'Het laatste verzoek in de mailbox.'],
          wrong: { 'V-01': 'Een gewoon inzageverzoek van de betrokkene zelf. Bij twijfel over de identiteit mag je om aanvullende informatie vragen, maar het verzoek is legitiem.' },
          why: 'Social engineers gebruiken privacyverzoeken als ingang: een officieel ogend verzoek, een beetje druk, en een organisatie stuurt zelf de gegevens op. Controleer altijd wie vraagt en over wie.',
          explain: 'V-06 vraagt de gegevens van de buurman. Inzage geldt alleen voor eigen gegevens; die van J. Kramer opsturen is een inbreuk op zijn gegevens.' },
        { q: 'FitPolder wil bij V-05 eerst afwegen of de folders echt zo belastend zijn. Mag dat?', options: ['Nee, bezwaar tegen direct marketing is absoluut: FitPolder stopt zonder afweging', 'Ja, bij elk bezwaar mag de organisatie eerst haar eigen belang afwegen', 'Ja, maar alleen als het lid langer dan een jaar klant is', 'Nee, want reclame aan leden is onder de AVG altijd verboden'], answer: 0,
          wrong: { 1: 'Bij gewoon bezwaar tegen een verwerking op grond van gerechtvaardigd belang mag dat. Voor direct marketing maakt artikel 21 een uitzondering: dan stop je altijd.', 2: 'Hoe lang iemand klant is, speelt geen rol bij het bezwaarrecht.', 3: 'Reclame aan bestaande klanten kan op een gerechtvaardigd belang rusten, zolang iemand er bezwaar tegen kan maken. Dat heeft dit lid nu gedaan.' },
          explain: 'Bij direct marketing geeft de AVG geen ruimte voor een afweging. De gegevens van M. Visser gaan van de verzendlijst.' },
      ],
    },

    {
      title: 'Taak 4: DPIA, verwerkers en de Autoriteit Persoonsgegevens',
      tryFirst: true,
      intro: '<p>De directie van het fictieve Kade Logistiek BV wil de schermen en toetsaanslagen van 300 medewerkers laten vastleggen om "de productiviteit te meten", met software van het (ook fictieve) WerkInzicht BV. Jij bent privacyadviseur. Doorloop de vijf beslismomenten in het lab.</p>',
      content: `
        <h3>De DPIA</h3>
        <p>Een <strong>gegevensbeschermingseffectbeoordeling</strong> (DPIA, <em>data protection impact
        assessment</em>, artikel 35 AVG) is verplicht als een verwerking waarschijnlijk een hoog risico oplevert
        voor de rechten en vrijheden van mensen. De AVG noemt onder meer: systematisch en uitgebreid evalueren of
        profileren met grote gevolgen, grootschalig bijzondere gegevens verwerken, en grootschalig en
        systematisch openbare ruimten monitoren. De AP heeft daarnaast een lijst gepubliceerd van soorten
        verwerkingen waarvoor in Nederland altijd een DPIA nodig is; stelselmatig volgen van werknemers staat
        daarop.</p>
        <p>Een DPIA bevat minstens: een beschrijving van de verwerking en het doel, een toets op
        <strong>noodzaak en evenredigheid</strong>, een beoordeling van de risico's, en de maatregelen om die te
        beperken. Je doet hem <em>voordat</em> je begint, niet als verantwoording achteraf. Blijft er na maatregelen
        een hoog risico over, dan moet je de AP vooraf raadplegen (artikel 36).</p>

        <h3>De verwerker en de verwerkersovereenkomst</h3>
        <p>Laat je een ander bedrijf gegevens voor jou verwerken, dan is dat bedrijf een <strong>verwerker</strong>
        en jij blijft verantwoordelijk. Artikel 28 eist een schriftelijke overeenkomst: de
        <strong>verwerkersovereenkomst</strong>. Daarin staat onder meer dat de verwerker alleen op jouw instructie
        werkt, geheimhouding afdwingt, passend beveiligt, alleen met jouw toestemming subverwerkers inschakelt, je
        helpt bij verzoeken en datalekken, en aan het eind alles teruggeeft of verwijdert. Gaan gegevens naar een
        land buiten de Europese Economische Ruimte, dan is daarvoor een aparte basis nodig, zoals een
        adequaatheidsbesluit van de Europese Commissie of standaardcontractbepalingen.</p>

        <h3>De Autoriteit Persoonsgegevens</h3>
        <p>De AP houdt toezicht op de AVG in Nederland. Ze behandelt klachten en datalekmeldingen, doet onderzoek,
        geeft voorlichting en kan maatregelen opleggen: een waarschuwing, een berisping, een verbod op een verwerking,
        een last onder dwangsom of een boete. De hoogste boetecategorie in de AVG is 20 miljoen euro of, voor een
        onderneming, 4% van de wereldwijde jaaromzet als dat hoger is.</p>

        <div class="callout info">
          <strong>Medezeggenschap:</strong> een systeem waarmee een werkgever gedrag of prestaties van personeel kan
          volgen, vraagt in Nederland ook de instemming van de ondernemingsraad (Wet op de ondernemingsraden,
          artikel 27). Dat staat naast de AVG, niet in plaats ervan.
        </div>
      `,
      lab: {
        type: 'scenario',
        title: 'Kade Logistiek BV: personeelsvolgsysteem',
        scenario: 'Kade Logistiek BV (fictief, 300 medewerkers) wil software van WerkInzicht BV (fictief) invoeren die schermen en toetsaanslagen registreert. De gegevens staan in de cloud van WerkInzicht.',
        pass: 5,
        flag: 'NM{eerst_dpia_dan_kiezen}',
        steps: [
          { situation: 'De directie wil volgende maand starten. Wat doe je eerst?', choices: [
            { label: 'Een DPIA uitvoeren voordat er een besluit valt', good: true, feedback: 'Goed. Stelselmatig volgen van werknemers is een verwerking met een hoog risico; de DPIA moet vooraf.' },
            { label: 'Eerst een maand proefdraaien bij één afdeling, dan beoordelen', good: false, feedback: 'Een proef is al een echte verwerking van echte gegevens. De DPIA hoort ervoor.' },
            { label: 'Alle medewerkers om toestemming vragen', good: false, feedback: 'Toestemming van werknemers is zelden vrij. Het lost bovendien niet op dat de verwerking zelf noodzakelijk en evenredig moet zijn.' },
          ] },
          { situation: 'Uit de DPIA blijkt dat toetsaanslagen vastleggen niet nodig is om werkdruk en doorlooptijden te meten. Een overzicht per team van afgehandelde orders volstaat. Wat adviseer je?', choices: [
            { label: 'Het minder ingrijpende middel kiezen: geen toetsaanslagen of schermen, alleen geaggregeerde cijfers per team', good: true, feedback: 'Goed. Als een minder ingrijpend middel het doel ook bereikt, is het zwaardere middel niet noodzakelijk.' },
            { label: 'Toch alles vastleggen, want de directie heeft een gerechtvaardigd belang', good: false, feedback: 'Een gerechtvaardigd belang vraagt dat de verwerking noodzakelijk is. Dat is ze hier aantoonbaar niet.' },
            { label: 'Alles vastleggen, maar de gegevens versleutelen', good: false, feedback: 'Versleutelen is goede beveiliging, maar maakt een onnodige verwerking niet nodig.' },
          ] },
          { situation: 'WerkInzicht BV gaat de teamcijfers in zijn cloud verwerken. Wat regel je?', choices: [
            { label: 'Een verwerkersovereenkomst met instructies, beveiliging, regels voor subverwerkers en verwijdering aan het einde', good: true, feedback: 'Goed. Kade Logistiek blijft verantwoordelijk; WerkInzicht is verwerker.' },
            { label: 'Niets extra, want WerkInzicht heeft een ISO 27001-certificaat', good: false, feedback: 'Een certificaat zegt iets over beveiliging, maar vervangt de verplichte overeenkomst niet.' },
            { label: 'Alleen een geheimhoudingsverklaring', good: false, feedback: 'Geheimhouding is één onderdeel. Artikel 28 vraagt veel meer.' },
          ] },
          { situation: 'In de bijlage staat dat WerkInzicht de opslag uitbesteedt aan een hostingbedrijf buiten de EER. Wat controleer je?', choices: [
            { label: 'Of die subverwerker met toestemming is ingeschakeld en of er een geldige basis is voor doorgifte buiten de EER', good: true, feedback: 'Goed. Beide moeten kloppen voordat de gegevens daar terechtkomen.' },
            { label: 'Niets, dat is de verantwoordelijkheid van WerkInzicht', good: false, feedback: 'Jij blijft verantwoordelijk, ook voor wat je verwerker doorgeeft.' },
            { label: 'Of het hostingbedrijf groot en bekend is', good: false, feedback: 'Bekendheid is geen juridische basis voor doorgifte.' },
          ] },
          { situation: 'Stel dat er na alle maatregelen toch een hoog restrisico overblijft. Wat dan?', choices: [
            { label: 'De AP vooraf raadplegen voordat de verwerking start', good: true, feedback: 'Goed. Dat is de voorafgaande raadpleging van artikel 36.' },
            { label: 'Starten en het risico noteren in het register', good: false, feedback: 'Een hoog restrisico mag je niet zomaar accepteren. Daar is de raadpleging voor.' },
            { label: 'De DPIA herschrijven tot het risico laag lijkt', good: false, feedback: 'Dat is het papier aanpassen in plaats van de verwerking.' },
          ] },
        ],
      },
      questions: [
        { q: 'Doorloop alle vijf beslismomenten goed. Welke vlag verschijnt?', answer: ['NM{eerst_dpia_dan_kiezen}'],
          hints: ['Kies steeds de stap die vooraf toetst in plaats van achteraf repareert.', 'Bij twijfel tussen een zwaar en een licht middel: de AVG kiest het lichtste dat het doel bereikt.', 'De laatste stap gaat over artikel 36.'],
          explain: 'DPIA vooraf, het lichtste middel, een verwerkersovereenkomst, controle op subverwerkers en doorgifte, en bij hoog restrisico de AP raadplegen.' },
        { q: 'Wie is in dit scenario de verwerkingsverantwoordelijke?', options: ['WerkInzicht BV, omdat de software en de cloud van hen zijn', 'Kade Logistiek BV, omdat zij doel en middelen bepaalt', 'Het hostingbedrijf buiten de EER', 'De ondernemingsraad, omdat die moet instemmen'], answer: 1,
          wrong: { 0: 'Wie de techniek levert, is daarmee niet verantwoordelijk. WerkInzicht werkt in opdracht en is verwerker.', 2: 'Dat is een subverwerker: de verwerker van de verwerker.', 3: 'De ondernemingsraad heeft instemmingsrecht, maar bepaalt niet het doel en de middelen.' },
          why: 'Bij een datalek of een klacht is de verantwoordelijke het aanspreekpunt voor de AP. Wie de rollen verkeerd inschat, weet niet wie moet melden en wie aansprakelijk is.',
          explain: 'Kade Logistiek bepaalt waarom en hoe er gegevens worden verwerkt. WerkInzicht verwerkt in opdracht.' },
        { q: 'Na de tweede beslissing verwerkt Kade Logistiek alleen nog cijfers per team, waarin geen individuele medewerker herkenbaar is. Welke vraag uit de DPIA beantwoordde die keuze?', options: ['De vraag naar de bewaartermijn', 'De vraag naar noodzaak en evenredigheid', 'De vraag naar doorgifte buiten de EER', 'De vraag wie de functionaris gegevensbescherming is'], answer: 1,
          wrong: { 0: 'Bewaren is een ander punt. De keuze ging over wat je überhaupt verwerkt.', 2: 'Doorgifte komt pas aan bod bij beslissing vier.', 3: 'Die vraag hoort niet bij de kern van de DPIA.' },
          explain: 'Toetsaanslagen waren niet nodig voor het doel en dus niet evenredig. Het lichtere middel haalt het doel ook.' },
      ],
    },

    {
      title: 'Taak 5: Meldplichten na een incident: AVG en NIS2',
      tryFirst: true,
      intro: '<p>Bij drinkwaterbedrijf Waterleiding Lage Landen NV (fictief) is ransomware gevonden op de klantenserver. Het bedrijf valt onder NIS2. In het lab staat de tijdlijn. Bepaal wanneer de klok begon te lopen en reken de meldtermijnen uit.</p>',
      content: `
        <h3>Twee meldplichten, twee klokken</h3>
        <p>Een cyberincident kan tegelijk een <strong>datalek</strong> onder de AVG zijn en een
        <strong>significant incident</strong> onder NIS2. Dat zijn twee meldingen, aan verschillende instanties,
        met eigen termijnen.</p>
        <table>
          <thead><tr><th></th><th>AVG (art. 33 en 34)</th><th>NIS2 (art. 23)</th></tr></thead>
          <tbody>
            <tr><td>Wat</td><td>Inbreuk op persoonsgegevens</td><td>Significant incident</td></tr>
            <tr><td>Aan wie</td><td>Autoriteit Persoonsgegevens</td><td>CSIRT of bevoegde autoriteit</td></tr>
            <tr><td>Termijn</td><td>Zonder onredelijke vertraging, zo mogelijk binnen 72 uur na kennisneming</td><td>Vroegtijdige waarschuwing binnen 24 uur; incidentmelding binnen 72 uur; eindverslag uiterlijk een maand na de incidentmelding</td></tr>
            <tr><td>Betrokkenen</td><td>Informeren zonder onredelijke vertraging bij een waarschijnlijk hoog risico</td><td>Afnemers informeren als dat nodig is</td></tr>
          </tbody>
        </table>
        <p>Beide klokken lopen vanaf het moment dat de organisatie <strong>kennis</strong> krijgt: als ze met
        redelijke zekerheid weet dat er een incident is. Niet vanaf het moment van de inbraak, en ook niet pas als
        het onderzoek klaar is. Wie bij de eerste melding nog niet alles weet, meldt wat bekend is en vult later aan.
        Ook versleutelde, onbereikbare persoonsgegevens zijn een datalek: de beschikbaarheid is aangetast.</p>

        <h3>NIS2 en de Cyberbeveiligingswet</h3>
        <p>NIS2 is <strong>Richtlijn (EU) 2022/2555</strong>. Lidstaten moesten haar uiterlijk 17 oktober 2024 in
        nationale wet omzetten. Nederland doet dat met de <strong>Cyberbeveiligingswet</strong> (Cbw), die de Wet
        beveiliging netwerk- en informatiesystemen (Wbni) vervangt. De Nederlandse omzetting liep vertraging op.
        <strong>Controleer de actuele status en datum van inwerkingtreding</strong> op wetten.overheid.nl of
        ncsc.nl voordat je erop bouwt.</p>
        <p>De hoofdlijnen van NIS2:</p>
        <ul>
          <li><strong>Reikwijdte</strong>: veel meer sectoren dan onder de oude regels, waaronder energie, vervoer,
          drinkwater, afvalwater, digitale infrastructuur, zorg, overheid en delen van de maakindustrie. Entiteiten
          zijn <em>essentieel</em> of <em>belangrijk</em>, grotendeels afhankelijk van sector en omvang.</li>
          <li><strong>Zorgplicht</strong> (art. 21): passende maatregelen op basis van risico's, zoals
          incidentbehandeling, bedrijfscontinuïteit en back-ups, beveiliging van de toeleveringsketen, versleuteling
          en multifactorauthenticatie.</li>
          <li><strong>Bestuur</strong> (art. 20): de bestuurders keuren de maatregelen goed, houden toezicht, volgen
          training en kunnen aansprakelijk worden gesteld.</li>
          <li><strong>Toezicht en boetes</strong>: voor essentiële entiteiten moet het maximum minstens 10 miljoen euro
          of 2% van de wereldwijde jaaromzet zijn, voor belangrijke entiteiten minstens 7 miljoen euro of 1,4%.</li>
        </ul>
      `,
      lab: {
        type: 'timeline',
        title: 'Waterleiding Lage Landen NV, oktober 2026 (UTC)',
        events: [
          { t: '2026-10-09 14:22:10', src: 'Mail', host: 'mx01', user: 'h.mulder', desc: 'mail met bijlage "offerte_pompen.zip" afgeleverd (achteraf vastgesteld)' },
          { t: '2026-10-09 14:31:45', src: 'EDR', host: 'WS-112', user: 'h.mulder', desc: 'onbekend programma gestart uit de map Downloads (geen alarm, lage ernst)' },
          { t: '2026-10-11 02:10:03', src: 'Security', host: 'DC01', desc: '4624 aanmelding svc-backup vanaf WS-112 (achteraf als verdacht aangemerkt)' },
          { t: '2026-10-12 21:40:00', src: 'Back-up', host: 'BAK-01', desc: 'back-uptaak klantenserver traag, geen foutmelding' },
          { t: '2026-10-12 23:58:12', src: 'Firewall', host: 'fw01', desc: '6,2 GB uitgaand van KS-01 naar 203.0.113.140 (achteraf vastgesteld)' },
          { t: '2026-10-13 03:15:40', src: 'EDR', host: 'KS-01', desc: 'massaal hernoemen van bestanden naar .lockd' },
          { t: '2026-10-13 07:55:00', src: 'SOC', host: 'KS-01', user: 'dienstdoend analist', desc: 'analist bevestigt versleutelde klantbestanden en losgeldbrief: incident vastgesteld' },
          { t: '2026-10-13 08:30:00', src: 'Crisisteam', host: '-', desc: 'crisisteam bijeen; klantenserver bevat namen, adressen, IBAN en verbruik van 48.000 klanten' },
          { t: '2026-10-13 11:05:00', src: 'Crisisteam', host: '-', desc: 'besluit: klantenserver geïsoleerd, onderzoek naar exfiltratie gestart' },
          { t: '2026-10-14 16:20:00', src: 'Forensisch', host: 'KS-01', desc: 'exfiltratie van het klantenbestand naar 203.0.113.140 bevestigd' },
          { t: '2026-10-15 09:00:00', src: 'Crisisteam', host: '-', desc: 'drinkwaterlevering niet geraakt; productie draait op gescheiden OT-netwerk' },
        ],
      },
      questions: [
        { q: 'Op welk moment kreeg het bedrijf kennis van het incident, zodat de klokken gingen lopen? (JJJJ-MM-DD UU:MM)', answer: ['2026-10-13 07:55', '13-10-2026 07:55', '2026-10-13 7:55', '13 oktober 2026 07:55'],
          hints: ['Zoek het moment waarop iemand met redelijke zekerheid wist dat er een incident was.', 'Niet de eerste besmetting, en niet het einde van het onderzoek.', 'Filter op SOC.'],
          wrong: { '2026-10-09 14:22': 'Toen kwam de mail binnen, maar niemand wist van een incident. Dat is pas achteraf vastgesteld.', '2026-10-14 16:20': 'Toen werd de exfiltratie bevestigd. Maar al op 13 oktober waren de klantgegevens onbereikbaar: ook dat is een datalek. Je wacht niet tot het onderzoek klaar is.', '2026-10-13 03:15': 'Het EDR zag iets, maar nog niemand had vastgesteld dat er een incident was.' },
          why: 'De termijnen zijn kort. Wie de start verkeerd legt, meldt te laat, of meent dat hij nog dagen heeft terwijl de eerste deadline al voorbij is.',
          explain: 'Op 13 oktober om 07:55 stelde de analist het incident vast. Vanaf dan lopen beide klokken.' },
        { q: 'Wanneer moet de vroegtijdige waarschuwing onder NIS2 uiterlijk binnen zijn? (JJJJ-MM-DD UU:MM)', answer: ['2026-10-14 07:55', '14-10-2026 07:55', '2026-10-14 7:55', '14 oktober 2026 07:55'],
          hints: ['De vroegtijdige waarschuwing heeft de kortste termijn uit de tabel.', '24 uur na kennisneming.', 'Eén dag na 13 oktober 07:55.'],
          wrong: { '2026-10-16 07:55': 'Dat is 72 uur: de incidentmelding onder NIS2, en de AVG-melding. De vroegtijdige waarschuwing komt eerder.' },
          explain: '14 oktober 07:55. De vroegtijdige waarschuwing mag kort zijn: is er een vermoeden van een criminele daad, en kan het grensoverschrijdende gevolgen hebben?' },
        { q: 'Wanneer moet de melding bij de Autoriteit Persoonsgegevens uiterlijk binnen zijn? (JJJJ-MM-DD UU:MM)', answer: ['2026-10-16 07:55', '16-10-2026 07:55', '2026-10-16 7:55', '16 oktober 2026 07:55'],
          hints: ['De AVG noemt een termijn in uren.', '72 uur na kennisneming.', 'Drie dagen na 13 oktober 07:55.'],
          wrong: { '2026-10-17 16:20': 'Je laat de klok lopen vanaf de bevestigde exfiltratie. De onbereikbaarheid van de klantgegevens was al een datalek.', '2026-10-14 07:55': 'Dat is de NIS2-termijn voor de vroegtijdige waarschuwing. De AVG geeft 72 uur.' },
          explain: '16 oktober 07:55. De exfiltratie die op 14 oktober werd bevestigd, meld je als aanvulling; die verlengt de termijn niet.' },
        { q: 'Moeten de 48.000 klanten worden geïnformeerd?', options: ['Ja: namen, adressen en IBAN in handen van criminelen geven waarschijnlijk een hoog risico, bijvoorbeeld op gerichte phishing', 'Nee, want de drinkwaterlevering is niet geraakt', 'Nee, want het bedrijf heeft al gemeld bij de AP', 'Alleen als de AP daar opdracht toe geeft'], answer: 0,
          wrong: { 1: 'Of het water blijft stromen, is relevant voor NIS2. Voor de AVG gaat het om het risico voor de klanten zelf.', 2: 'De melding aan de AP en het informeren van betrokkenen zijn twee aparte plichten.', 3: 'De AP kan het opdragen, maar de plicht bestaat zelf al als er een hoog risico is.' },
          explain: 'Met namen, adressen en rekeningnummers kunnen criminelen geloofwaardige phishing en fraude plegen. Dat is een hoog risico: klanten krijgen zonder onredelijke vertraging bericht, met concrete tips.' },
      ],
    },

    {
      title: 'Taak 6: De Wwft: cliëntenonderzoek en melden',
      tryFirst: true,
      intro: '<p>Je werkt bij de afdeling cliëntenonderzoek van een fictieve bank. Klant Kade Import BV en de mensen eromheen storten veel contant geld. In het lab staan de stortingen en de uitkomst van het cliëntenonderzoek. Zoek het patroon en bepaal wie van belang is voor de melding.</p>',
      content: `
        <p>De <strong>Wet ter voorkoming van witwassen en financieren van terrorisme</strong> (Wwft, 2008) maakt
        banken, betaalinstellingen, verzekeraars, accountants, notarissen, advocaten bij bepaalde diensten,
        makelaars, handelaren die grote bedragen contant aannemen en een aantal andere beroepen tot
        <strong>poortwachters</strong>: zij moeten weten met wie ze zakendoen en ongebruikelijke transacties melden.</p>

        <h3>Cliëntenonderzoek</h3>
        <p>Voordat een instelling een zakelijke relatie aangaat, en daarna doorlopend, doet ze
        <strong>cliëntenonderzoek</strong> (in het Engels <em>customer due diligence</em>, CDD):</p>
        <ul>
          <li>de cliënt <strong>identificeren</strong> en de identiteit <strong>verifiëren</strong>;</li>
          <li>de <strong>uiteindelijk belanghebbende</strong> (UBO, <em>ultimate beneficial owner</em>) vaststellen:
          de natuurlijke persoon die uiteindelijk eigenaar is of zeggenschap heeft. Bij een BV is dat in elk geval wie
          meer dan 25% van de aandelen of stemrechten houdt, of op een andere manier feitelijk zeggenschap heeft;</li>
          <li>het <strong>doel en de beoogde aard</strong> van de relatie vaststellen;</li>
          <li>de relatie en de transacties <strong>doorlopend controleren</strong>: past wat er gebeurt bij wat je
          van deze cliënt weet?</li>
        </ul>
        <p>Bij een hoger risico, bijvoorbeeld een politiek prominent persoon (PEP) of een hoogrisicoland, doe je
        <strong>verscherpt</strong> onderzoek. Lukt het cliëntenonderzoek niet, dan ga je de relatie niet aan of
        beëindig je haar.</p>

        <h3>Melden bij FIU-Nederland</h3>
        <p>Een <strong>ongebruikelijke transactie</strong> meld je onverwijld bij <strong>FIU-Nederland</strong>. Wat
        ongebruikelijk is, staat in indicatoren bij de wet: objectieve (een vaste situatie, zoals bepaalde
        transacties boven een grensbedrag) en subjectieve (de instelling heeft aanleiding om aan witwassen te denken).
        Een vast bedrag waaronder je nooit hoeft te melden bestaat dus niet. Juist het
        <strong>opknippen</strong> van een bedrag in stortingen net onder een grens (structureren of
        <em>smurfing</em>) is een sterk subjectief signaal.</p>
        <p>FIU-Nederland analyseert de meldingen. Verklaart zij een transactie <strong>verdacht</strong>, dan gaat
        die naar opsporingsdiensten zoals de politie en de FIOD. De melder vertelt de cliënt niet dat er is gemeld:
        dat zou het onderzoek verraden.</p>

        <div class="callout info">
          <strong>In het lab</strong> gebruikt de bank een interne signaleringsgrens van €10.000 voor contante
          stortingen. Dat is een keuze van deze fictieve bank, geen wettelijk bedrag.
        </div>
      `,
      lab: {
        type: 'structuring',
        title: 'Contante stortingen rond Kade Import BV, september 2026',
        threshold: 10000,
        currency: '€',
        bandLow: 0.8,
        scenario: 'Uit het cliëntenonderzoek: Kade Import BV (groothandel in keukenapparatuur) heeft drie aandeelhouders: L. Verbeek 60%, F. Aydin 30% en J. Mol 10%. Geen andere vormen van zeggenschap bekend. Opgegeven doel van de relatie: betalingsverkeer met leveranciers in de EU; weinig contant geld verwacht. K. Smits is een andere klant van de bank.',
        tx: [
          { date: '2026-09-01', who: 'J. Mol', amount: 9500, kind: 'contant' },
          { date: '2026-09-02', who: 'F. Aydin', amount: 9800, kind: 'contant' },
          { date: '2026-09-02', who: 'L. Verbeek', amount: 2150, kind: 'overboeking', note: 'privé naar zakelijk' },
          { date: '2026-09-04', who: 'F. Aydin', amount: 9400, kind: 'contant' },
          { date: '2026-09-07', who: 'J. Mol', amount: 9900, kind: 'contant' },
          { date: '2026-09-08', who: 'L. Verbeek', amount: 15000, kind: 'overboeking', note: 'betaling factuur klant' },
          { date: '2026-09-09', who: 'F. Aydin', amount: 9950, kind: 'contant' },
          { date: '2026-09-11', who: 'K. Smits', amount: 4000, kind: 'contant', note: 'andere klant' },
          { date: '2026-09-14', who: 'J. Mol', amount: 8700, kind: 'contant' },
          { date: '2026-09-15', who: 'F. Aydin', amount: 9600, kind: 'contant' },
          { date: '2026-09-16', who: 'L. Verbeek', amount: 7200, kind: 'contant', note: 'verkoop showroommodel' },
        ],
      },
      questions: [
        { q: 'Hoeveel stortingen vallen in de band net onder de signaleringsgrens?', answer: ['7', 'zeven'],
          hints: ['Het lab markeert ze.', 'De band loopt van €8.000 tot €10.000.', 'Twee personen doen samen alle stortingen in de band.'],
          wrong: { '8': 'Je telt de €7.200 van L. Verbeek mee. Die ligt onder de band, en de €15.000 is een overboeking boven de grens.' },
          explain: 'Zeven stortingen van J. Mol en F. Aydin, elk tussen €8.700 en €9.950.' },
        { q: 'Hoeveel euro stortte F. Aydin in totaal in de band?', answer: ['38750', '38.750', '€38.750', '€ 38.750', '38750 euro'],
          hints: ['Filter de stortingen van F. Aydin.', 'Er zijn er vier.', '9.800 + 9.400 + 9.950 + 9.600'],
          wrong: { '66850': 'Dat is het totaal van alle gemarkeerde stortingen, inclusief die van J. Mol.', '/^(28800|28950|29150|29350|28\\.800|28\\.950|29\\.150|29\\.350)$/': 'Je mist er één. F. Aydin deed vier stortingen in de band.' },
          explain: '€38.750 in vier stortingen binnen twee weken, terwijl de klant "weinig contant geld" had opgegeven.' },
        { q: 'De bank meldt de stortingen. Een week later belt J. Mol en vraagt waarom de bank zo veel vragen stelt over zijn geld. Wat zegt de medewerker?', options: ['Dat de bank verplicht is gemeld te hebben bij FIU-Nederland, zodat Mol weet waar hij aan toe is', 'Niets over de melding; de bank kan wel algemeen uitleggen dat zij vragen stelt in het kader van het wettelijk verplichte cliëntenonderzoek', 'Dat Mol zijn gegevens via een inzageverzoek kan opvragen, inclusief de melding', 'Dat de bank niets met contant geld te maken wil hebben'], answer: 1,
          wrong: { 0: 'Dan verraad je de melding. De melder mag de cliënt niet laten weten dat er is gemeld.', 2: 'Een inzageverzoek onder de AVG geeft geen recht op informatie over een Wwft-melding; de geheimhoudingsplicht gaat voor.', 3: 'Dat is geen antwoord op zijn vraag en lost niets op: het cliëntenonderzoek loopt gewoon door.' },
          explain: 'De bank mag uitleggen dat zij wettelijk verplicht onderzoek doet, maar zegt niets over de melding. Anders kan de cliënt sporen wissen.' },
        { q: 'Welke natuurlijke persoon is UBO van Kade Import BV én stort zelf contant net onder de grens?', answer: ['F. Aydin', 'f aydin', 'aydin', 'f.aydin'], boss: true,
          hints: ['Bepaal eerst met het cliëntenonderzoek in het lab wie UBO is: meer dan 25%.', 'Twee aandeelhouders halen die grens. Kijk daarna wie van hen in de band stort.', 'Niet de grootste aandeelhouder, en niet degene met 10%.'],
          wrong: { 'J. Mol': 'Mol stort ook in de band, maar heeft 10% van de aandelen en verder geen bekende zeggenschap. Hij is geen UBO.', 'mol': 'Mol stort ook in de band, maar heeft 10% van de aandelen en verder geen bekende zeggenschap. Hij is geen UBO.', 'L. Verbeek': 'Verbeek is UBO met 60%, maar zijn stortingen vallen niet in de band: een overboeking boven de grens en een contante storting van €7.200 met een verklaring.', 'verbeek': 'Verbeek is UBO met 60%, maar zijn stortingen vallen niet in de band.' },
          why: 'Een UBO die zelf geld opknipt, raakt het hart van de relatie. Dat vraagt om verscherpt onderzoek naar de hele klant, niet alleen om een losse melding.',
          explain: 'F. Aydin houdt 30% en is dus UBO; hij stortte vier keer net onder de grens, samen €38.750. Je combineerde de UBO-toets uit het cliëntenonderzoek met het herkennen van structurering.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: als wetten elkaar raken',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>In de praktijk staan deze wetten niet naast elkaar, maar door elkaar heen. Drie botsingen kom je vaak
        tegen.</p>

        <h3>1. Inzagerecht tegenover de Wwft-geheimhouding</h3>
        <p>Een cliënt kan onder de AVG inzage vragen in zijn gegevens. Maar wie een ongebruikelijke transactie heeft
        gemeld, mag dat niet aan de cliënt vertellen. De AVG laat lidstaten toe rechten van betrokkenen bij wet te
        beperken, onder meer ter voorkoming en opsporing van strafbare feiten (artikel 23 AVG). In Nederland gaat de
        geheimhouding uit de Wwft voor: de bank geeft de overige gegevens, maar niet de melding. Leg vast waarom je
        iets weglaat, zodat je dat aan de AP kunt uitleggen.</p>

        <h3>2. Logging tegenover dataminimalisatie</h3>
        <p>NIS2 vraagt om incidentbehandeling, en daarvoor heb je logs nodig. De AVG vraagt om zo min mogelijk
        persoonsgegevens. Dat is geen tegenspraak: je bewaart wat nodig is voor detectie en onderzoek, met een
        vastgelegde termijn en beperkte toegang. Wat je niet doet, is "alles voor altijd voor het geval dat". Een
        bewaartermijn van een paar maanden voor beveiligingslogs is gangbaar; welke termijn past, volgt uit je eigen
        risicoanalyse en leg je vast.</p>

        <h3>3. Drie meldingen bij één incident</h3>
        <p>Een ransomware-aanval bij een essentiële entiteit kan leiden tot een AVG-melding bij de AP, een NIS2-melding
        bij de CSIRT of toezichthouder, en een aangifte bij de politie. Ook de Wwft kan meedoen: een bank die
        losgeldbetalingen in crypto ziet passeren, kan die als ongebruikelijk moeten melden. Elke melding heeft een
        ander doel. Een draaiboek dat ze naast elkaar zet, met wie, wat en wanneer, voorkomt dat er één vergeten wordt.</p>

        <h3>Boetes in perspectief</h3>
        <p>De AVG kent twee boetecategorieën: tot 10 miljoen euro of 2% van de wereldwijde jaaromzet voor onder meer
        fouten in beveiliging, DPIA of verwerkersafspraken, en tot 20 miljoen euro of 4% voor onder meer het schenden
        van de beginselen, de grondslagen en de rechten van betrokkenen. Steeds geldt het hoogste bedrag van de twee.
        Dat betekent niet dat elke fout zo'n boete oplevert: de AP weegt onder meer ernst, duur, opzet en de
        maatregelen die de organisatie zelf nam.</p>
      `,
      questions: [
        { q: 'Een onderneming met een wereldwijde jaaromzet van 2 miljard euro schendt de rechten van betrokkenen. Wat is het wettelijke maximum van de AVG-boete in miljoenen euro?', answer: ['80', '80 miljoen', '€80 miljoen', '80000000'],
          hints: ['Rechten van betrokkenen vallen in de hoogste categorie.', 'Die is 20 miljoen of 4%, het hoogste van de twee.', '4% van 2.000 miljoen.'],
          wrong: { '20': 'Je neemt het vaste bedrag. Er geldt het hoogste van de twee, en 4% van deze omzet is meer.', '40': 'Dat is 2%: de lagere categorie. Rechten van betrokkenen vallen in de categorie van 4%.' },
          explain: '4% van 2 miljard is 80 miljoen euro, en dat is meer dan 20 miljoen. Het is een maximum, geen tarief.' },
        { q: 'Een bank ontvangt een inzageverzoek van een cliënt over wie zij een melding bij FIU-Nederland heeft gedaan. Wat doet zij?', options: ['Ze geeft alle gegevens, inclusief de melding, want de AVG gaat voor', 'Ze weigert het hele verzoek, want er loopt een melding', 'Ze geeft de gegevens die ze mag geven, laat de melding weg en legt intern vast waarom', 'Ze stuurt het verzoek door naar FIU-Nederland'], answer: 2,
          wrong: { 0: 'De Wwft-geheimhouding beperkt het inzagerecht op dit punt.', 1: 'De beperking geldt voor de melding, niet voor de rest van het dossier.', 3: 'Het verzoek is gericht aan de bank als verwerkingsverantwoordelijke; zij moet het zelf beantwoorden.' },
          explain: 'Beperk alleen wat nodig is, geef de rest, en documenteer de afweging.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examenvragen over privacy en wetgeving zijn meestal korte casussen: een organisatie doet iets, wat is de
        juiste grondslag, termijn of stap? De afleiders zijn antwoorden die in een andere situatie wel kloppen: een
        termijn uit een andere wet, een grondslag die op het eerste gezicht past, of een stap op het verkeerde
        moment. Vraag je steeds af onder welke wet de vraag valt en wie de verantwoordelijke is.</p>
        <p>De vijf vragen zijn zelf geschreven in die stijl. Alle organisaties zijn fictief. Het lab bevat de korte
        logregels die bij vraag 2 horen.</p>
      `,
      lab: {
        type: 'logs',
        title: 'vraag 2: incidentlog Zorggroep Rivierland (fictief)',
        lines: `2026-03-02 09:10  helpdesk  medewerker meldt: laptop met onversleutelde patiëntlijst (1.200 patiënten, met diagnoses) in de trein laten liggen
2026-03-02 09:40  privacy   privacy officer bevestigt: geen versleuteling, geen wissen op afstand mogelijk
2026-03-03 15:00  directie  besluit: eerst afwachten of de laptop wordt teruggevonden`,
      },
      questions: [
        { q: 'Een webwinkel wil klantgegevens doorverkopen aan een databroker en stelt dat dit een gerechtvaardigd belang is, omdat het extra omzet oplevert. Wat is het beste oordeel?',
          options: ['Toegestaan, want omzet is een legitiem belang', 'Toegestaan, mits het in de privacyverklaring staat', 'Waarschijnlijk niet toegestaan: klanten verwachten dit niet en hun belangen wegen naar alle waarschijnlijkheid zwaarder; toestemming is hier de aangewezen route', 'Toegestaan, omdat de gegevens al rechtmatig zijn verzameld'], answer: 2,
          wrong: { 0: 'Een legitiem belang is pas de eerste van drie stappen. Noodzaak en de afweging tegen de belangen van de klant volgen nog.', 1: 'Transparantie maakt een verwerking niet rechtmatig. Ook een netjes vermelde verwerking heeft een geldige grondslag nodig.', 3: 'Rechtmatig verzameld voor bezorging betekent niet dat je ze voor een ander doel mag gebruiken. Dat raakt de doelbinding.' },
          explain: 'Doorverkoop aan derden valt buiten wat klanten redelijkerwijs verwachten. De belangenafweging valt dan zelden in het voordeel van de webwinkel uit.' },
        { q: 'Bekijk het incidentlog in het lab. Wat is de juiste beoordeling?',
          options: ['De directie mag afwachten; pas als de laptop echt weg blijft, is er een datalek', 'Er is een datalek met gezondheidsgegevens zonder versleuteling: melden bij de AP binnen 72 uur na 2 maart 09:10 en de patiënten informeren, want het risico is hoog', 'Melden is niet nodig, want het was een ongeluk en geen hack', 'Alleen een interne registratie is nodig, want het gaat om minder dan 10.000 personen'], answer: 1,
          wrong: { 0: 'De klok loopt vanaf de kennisneming. Afwachten verschuift het begin niet.', 2: 'Een datalek hoeft geen aanval te zijn. Verlies van een onbeveiligd apparaat is een klassiek voorbeeld.', 3: 'De AVG kent geen ondergrens in aantallen. Bovendien zijn diagnoses bijzondere persoonsgegevens.' },
          explain: 'Onversleutelde diagnoses van 1.200 patiënten op een verloren laptop: melden bij de AP binnen 72 uur na kennisneming, en de patiënten informeren.' },
        { q: 'Een gemeente laat haar salarisadministratie verzorgen door een extern bureau. Wat moet de gemeente in elk geval regelen?',
          options: ['Toestemming van alle medewerkers', 'Een verwerkersovereenkomst met het bureau', 'Een melding bij de AP dat zij een verwerker inschakelt', 'Een DPIA, omdat salarisgegevens altijd een hoog risico opleveren'], answer: 1,
          wrong: { 0: 'De salarisbetaling rust op de arbeidsovereenkomst en wettelijke verplichtingen, niet op toestemming.', 2: 'Een verwerker inschakelen hoef je niet bij de AP te melden.', 3: 'Een DPIA is verplicht bij een waarschijnlijk hoog risico. Een gewone salarisadministratie valt daar meestal niet onder.' },
          explain: 'Het bureau verwerkt in opdracht van de gemeente. Artikel 28 AVG eist dan een schriftelijke verwerkersovereenkomst.' },
        { q: 'Een middelgroot energiebedrijf dat onder NIS2 valt, stelt op maandag om 10:00 vast dat zijn klantportaal door een aanval onbereikbaar is. Er zijn geen persoonsgegevens getroffen. Welke melding moet als eerste de deur uit, en wanneer?',
          options: ['Een melding bij de AP, uiterlijk donderdag 10:00', 'Een vroegtijdige waarschuwing aan de CSIRT of bevoegde autoriteit, uiterlijk dinsdag 10:00', 'Een eindverslag aan de toezichthouder, uiterlijk binnen een maand', 'Een aangifte bij de politie, uiterlijk maandag 22:00'], answer: 1,
          wrong: { 0: 'Zonder persoonsgegevens geen AVG-melding. En 72 uur is de termijn van de incidentmelding, niet van de eerste.', 2: 'Het eindverslag komt als laatste, na de vroegtijdige waarschuwing en de incidentmelding.', 3: 'Aangifte doen is verstandig, maar daar geldt geen wettelijke termijn van twaalf uur voor.' },
          explain: 'NIS2 begint met een vroegtijdige waarschuwing binnen 24 uur na kennisneming, gevolgd door een incidentmelding binnen 72 uur.' },
        { q: 'Een makelaar verkoopt een pand aan een BV die eigendom is van een stichting op Curaçao. Wie de stichting bestuurt, wil de koper niet zeggen. Wat doet de makelaar onder de Wwft?',
          options: ['De koop gewoon begeleiden; het geld komt toch via een Nederlandse bank', 'De transactie melden en daarna gewoon doorgaan zonder verder onderzoek', 'Verscherpt cliëntenonderzoek doen; lukt het niet om de UBO vast te stellen, dan de dienstverlening niet voortzetten en beoordelen of een melding bij FIU-Nederland nodig is', 'De koper vragen een verklaring te tekenen dat er niets aan de hand is'], answer: 2,
          wrong: { 0: 'De makelaar is zelf Wwft-instelling. Hij kan zijn onderzoeksplicht niet doorschuiven naar de bank.', 1: 'Melden ontslaat niet van het cliëntenonderzoek. Zonder vastgestelde UBO mag de relatie niet doorgaan.', 3: 'Een eigen verklaring van de cliënt vervangt het onderzoek niet, zeker niet bij een ondoorzichtige structuur.' },
          explain: 'Ondoorzichtige eigendom is een reden voor verscherpt onderzoek. Lukt het cliëntenonderzoek niet, dan stopt de dienstverlening, en de weigering zelf kan aanleiding zijn voor een melding.' },
      ],
    },
  ],

  terms: [
    { term: 'AVG', def: 'Algemene verordening gegevensbescherming, Verordening (EU) 2016/679; geldt sinds 25 mei 2018 in de hele EU.' },
    { term: 'Grondslag', def: 'Een van de zes rechtvaardigingen uit artikel 6 lid 1 AVG zonder welke een verwerking van persoonsgegevens niet mag.' },
    { term: 'Dataminimalisatie', def: 'Beginsel uit artikel 5 AVG: niet meer persoonsgegevens verwerken dan nodig voor het doel.' },
    { term: 'Bijzondere persoonsgegevens', def: 'Gegevens uit artikel 9 AVG, zoals gezondheid, religie en biometrie voor unieke identificatie; verwerken is in beginsel verboden.' },
    { term: 'DPIA', def: 'Gegevensbeschermingseffectbeoordeling (artikel 35 AVG), verplicht vooraf bij een verwerking met een waarschijnlijk hoog risico.' },
    { term: 'Verwerkersovereenkomst', def: 'Schriftelijke afspraak (artikel 28 AVG) tussen een verwerkingsverantwoordelijke en een partij die in haar opdracht persoonsgegevens verwerkt.' },
    { term: 'NIS2', def: 'Richtlijn (EU) 2022/2555 over cyberbeveiliging van essentiële en belangrijke entiteiten; in Nederland omgezet via de Cyberbeveiligingswet.' },
    { term: 'Cliëntenonderzoek', def: 'Wwft-plicht om de cliënt en de UBO vast te stellen, doel en aard van de relatie te kennen en transacties doorlopend te controleren.' },
    { term: 'UBO', def: 'Ultimate beneficial owner: natuurlijke persoon die uiteindelijk eigenaar is of zeggenschap heeft, bij een BV in elk geval wie meer dan 25% houdt.' },
    { term: 'FIU-Nederland', def: 'Financial Intelligence Unit: ontvangt meldingen van ongebruikelijke transacties en verklaart transacties zo nodig verdacht.' },
  ],

  resources: [
    { title: 'EUR-Lex: Verordening (EU) 2016/679 (AVG)', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
    { title: 'EUR-Lex: Richtlijn (EU) 2022/2555 (NIS2)', url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj' },
    { title: 'Autoriteit Persoonsgegevens', url: 'https://www.autoriteitpersoonsgegevens.nl/' },
    { title: 'wetten.overheid.nl: Wet ter voorkoming van witwassen en financieren van terrorisme', url: 'https://wetten.overheid.nl/BWBR0024282/' },
  ],
});
