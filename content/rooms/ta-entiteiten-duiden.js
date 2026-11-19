/* Room: Digitale entiteiten verzamelen en duiden — leerpad Tactisch analist cybercrime */

CS.registerRoom({
  id: 'ta-entiteiten-duiden',
  path: 'tactisch-analist',
  order: 2,
  title: 'Digitale entiteiten verzamelen en duiden',
  icon: '🧩',
  difficulty: 'Gemiddeld',
  minutes: 80,
  level: 'Praktijk',
  checked: '2026-11-19',
  summary: 'Uit losse bronnen een betrouwbaar beeld maken van IP-adressen, personen, bedrijven en organisaties: selectors herkennen, records veilig samenvoegen, een IP-adres duiden (ook achter CGNAT), bulletproof hosting herkennen en alles vastleggen met herkomst, geldigheid en bronbeoordeling.',
  objectives: [
    'Het verschil uitleggen tussen een entiteit, een kenmerk en een selector, en sterke van zwakke selectors onderscheiden',
    'Records over personen en organisaties samenvoegen (entity resolution) en het risico van een valse samenvoeging benoemen',
    'Een IP-adres duiden: ASN, soort netwerk (hosting, thuis, mobiel met CGNAT, VPN of Tor) en de rol van tijd, tijdzone en bronpoort',
    'De signalen van bulletproof hosting herkennen en met concurrerende hypothesen afwegen',
    'Een bevinding vastleggen met bron, periode, Admiralty-beoordeling en label, binnen de Wet politiegegevens',
  ],
  tasks: [
    {
      title: 'Taak 1 — Entiteiten en selectors',
      tryFirst: true,
      intro: `<p>In het lab liggen zestien gegevens uit een fraudedossier door elkaar. Elk gegeven wijst naar een ander soort
        entiteit: een persoon, een bedrijf, een stuk netwerk of geld. Groepeer ze per soort. Twijfel je, lees dan de uitleg.</p>`,
      content: `
        <p>In de vacature voor tactisch analist cybercrime staat een zin die deze hele room samenvat: <em>"Uit diverse bronnen
        verzamel en combineer je informatie over digitale entiteiten zoals IP-adressen, personen, bedrijven en organisaties en
        geeft hier duiding aan."</em> Drie werkwoorden: verzamelen, combineren, duiden. Om dat goed te doen, heb je eerst een
        paar woorden nodig die je strak uit elkaar houdt.</p>

        <h3>Entiteit, kenmerk, selector</h3>
        <ul>
          <li>Een <strong>entiteit</strong> is het ding in de echte wereld waar je iets over wilt weten: een persoon, een bedrijf,
          een organisatie, een server, een rekening.</li>
          <li>Een <strong>kenmerk</strong> (attribuut) is iets wat je over die entiteit weet: een geboortedatum, een vestigingsplaats,
          het land waar een server staat.</li>
          <li>Een <strong>selector</strong> is een kenmerk waarmee je in een bron kunt zoeken en dat naar een entiteit wijst: een
          e-mailadres, een telefoonnummer, een IBAN, een KvK-nummer, een IP-adres, een wallet-adres, een alias.</li>
        </ul>
        <p>Vergelijk het met een huis. Het huis is de entiteit. De kleur van de voordeur is een kenmerk. Het adres is een selector:
        daarmee vind je het huis terug in het kadaster, bij de gemeente en op de kaart. Maar een adres is niet de bewoner. Wie er
        vandaag woont, kan morgen verhuisd zijn.</p>

        <h3>Een selector is niet de entiteit</h3>
        <p>Dit is de belangrijkste les van de room. Een IP-adres is geen persoon, een e-mailadres is geen persoon, en een IBAN op
        naam van een student is nog geen dader. Twee dingen gaan vaak mis:</p>
        <ul>
          <li><strong>Eén selector, meerdere entiteiten.</strong> Een publiek IP-adres van een mobiele provider wordt tegelijk door
          honderden klanten gebruikt. Een wifi-netwerk in een studentenhuis deelt één adres met iedereen in huis.</li>
          <li><strong>Eén entiteit, meerdere selectors.</strong> Een actor gebruikt vijf aliassen, drie e-mailadressen en een
          handvol wallets. Wie die niet bij elkaar brengt, ziet vijf kleine verdachten in plaats van één grote.</li>
        </ul>

        <h3>Sterke en zwakke selectors</h3>
        <table>
          <thead><tr><th>Selector</th><th>Wijst naar</th><th>Hoe sterk?</th></tr></thead>
          <tbody>
            <tr><td>KvK-nummer</td><td>Een ingeschreven onderneming</td><td>Sterk: uniek en stabiel, maar zegt niets over wie er achter het bureau zit</td></tr>
            <tr><td>IBAN</td><td>Een rekening, en via de bank een rekeninghouder</td><td>Sterk voor de rekening; de houder kan een geronselde geldezel zijn</td></tr>
            <tr><td>E-mailadres</td><td>Een account</td><td>Wisselend: een eigen adres is sterk, een wegwerpadres zwak</td></tr>
            <tr><td>Alias</td><td>Een online identiteit</td><td>Zwak tot sterk: "admin" zegt niets, een zeldzame alias met dezelfde schrijffouten veel meer</td></tr>
            <tr><td>IP-adres</td><td>Een netwerkaansluiting op een moment</td><td>Zonder tijdstip vrijwel waardeloos; zie taak 3</td></tr>
          </tbody>
        </table>

        <h3>Een voorbeeld</h3>
        <p>Een klant van het fictieve NederBank meldt een nepbericht. In het dossier vind je: de alias <code>kelderkat</code>, het
        adres <code>kelderkat@post.example</code>, een IBAN, een KvK-nummer en het IP-adres <code>203.0.113.45</code>. Dat zijn vijf
        selectors, maar hoeveel entiteiten? Misschien één persoon met een bedrijf en een server. Misschien drie losse partijen.
        Dat weet je pas als je ze hebt gecombineerd en getoetst. Dat doe je in de volgende taken.</p>

        <div class="callout tip"><strong>Tip:</strong> schrijf bij elke selector op naar welk soort entiteit hij wijst. Dan zie je
        meteen of je een conclusie over een rekening ongemerkt hebt opgerekt tot een conclusie over een mens.</div>
      `,
      lab: {
        type: 'connections',
        title: 'zestien gegevens, vier soorten entiteiten',
        prompt: 'Vier soorten entiteiten: persoon, bedrijf of organisatie, netwerk, en geld. Zoek steeds de vier selectors of kenmerken die bij dezelfde soort horen.',
        flag: 'NM{selector_is_geen_entiteit}',
        groups: [
          { name: 'Persoon', items: ['Geboortedatum', 'Paspoortnummer', 'Roepnaam', 'Burgerlijke staat'] },
          { name: 'Bedrijf of organisatie', items: ['KvK-nummer', 'Btw-identificatienummer', 'Handelsnaam', 'Vestigingsadres'] },
          { name: 'Netwerk', items: ['IP-adres', 'ASN', 'Domeinnaam', 'Certificaatvingerafdruk'] },
          { name: 'Geld', items: ['IBAN', 'Wallet-adres', 'Transactie-hash', 'Kaartnummer'] },
        ],
      },
      questions: [
        { q: 'Welke vlag geeft het lab als alle zestien gegevens bij de juiste soort staan?', answer: ['NM{selector_is_geen_entiteit}'],
          hints: ['Begin met de groep waar je het zekerst van bent; het lab zegt het als drie van de vier goed zijn.', 'Alles wat een registratie bij de Kamer van Koophandel of de Belastingdienst heeft, hoort bij een onderneming.', 'Kaartnummer en transactie-hash horen bij geld, certificaatvingerafdruk bij netwerk.'],
          explain: 'Elk gegeven wijst naar één soort entiteit. Die soort bepaalt welke conclusie je eruit mag trekken.' },
        { q: 'Hoe noem je een kenmerk waarmee je in een bron kunt zoeken en dat naar een entiteit wijst, zoals een e-mailadres of IBAN?', answer: ['selector', 'een selector', 'selectors'],
          hints: ['Het is het woord dat in de titel van deze taak naast "entiteit" staat.', 'Je selecteert ermee in een bron.'],
          wrong: { 'entiteit': 'De entiteit is het ding in de echte wereld zelf. Het e-mailadres wijst ernaar.', 'attribuut': 'Elk attribuut is een kenmerk, maar niet elk kenmerk is geschikt om mee te zoeken. Er is een specifieker woord.' },
          explain: 'Een selector is een zoekbaar kenmerk dat naar een entiteit wijst, maar er niet mee samenvalt.' },
        { q: 'Een IBAN staat op naam van een student. Wat kun je op grond van alleen dat gegeven zeggen?', options: ['De student is de dader', 'Er is een rekening en een rekeninghouder; welke rol de student speelt, weet je nog niet', 'De student is zeker een geldezel', 'Het IBAN is vals'], answer: 1,
          wrong: { 0: 'De selector wijst naar een rekening. Wie de rekening gebruikt en waarom, volgt er niet uit.', 2: 'Dat is een mogelijke verklaring, geen conclusie uit één gegeven.', 3: 'Niets in het gegeven wijst op een vals IBAN.' },
          why: 'Een conclusie over een selector oprekken tot een conclusie over een mens is de snelste weg naar een onschuldige verdachte.',
          explain: 'Je weet dat de rekening bestaat en op wiens naam hij staat. De rol van die persoon is een volgende vraag.' },
      ],
    },

    {
      title: 'Taak 2 — Entity resolution: wanneer is het dezelfde?',
      tryFirst: true,
      intro: `<p>Vijf records uit verschillende bronnen gaan allemaal over iemand die "Kelderman" heet. Bepaal welke records over
        dezelfde entiteit gaan, met welke selector je dat kunt onderbouwen, en welk record je er beslist niet bij mag trekken.</p>`,
      content: `
        <p>Combineren klinkt simpel: je legt twee records naast elkaar en zegt "dit is dezelfde". In de praktijk is dat de stap
        waar de grootste fouten ontstaan. Het vak heet <strong>entity resolution</strong>: bepalen welke records over dezelfde
        entiteit in de echte wereld gaan.</p>

        <h3>Twee manieren om te koppelen</h3>
        <ul>
          <li><strong>Deterministisch</strong>: twee records delen een unieke, stabiele selector. Hetzelfde KvK-nummer, hetzelfde
          IBAN, hetzelfde paspoortnummer. Sterk, mits de selector echt uniek is en goed is overgenomen.</li>
          <li><strong>Probabilistisch</strong>: de records lijken op elkaar op meerdere zwakkere kenmerken. Zelfde achternaam,
          zelfde voorletter, zelfde woonplaats, ongeveer dezelfde leeftijd. Elk kenmerk telt een beetje mee; samen kunnen ze
          overtuigen, maar het blijft een kansuitspraak.</li>
        </ul>
        <p>Een naam is bijna nooit genoeg. In Nederland wonen veel mensen met dezelfde voorletter en achternaam, en bij een
        veelvoorkomende naam zelfs in dezelfde stad. Geboortedatum plus naam is sterker, maar ook die kan door een typefout of
        een verwisselde dag en maand misgaan.</p>

        <h3>Twee soorten fouten</h3>
        <table>
          <thead><tr><th>Fout</th><th>Wat er gebeurt</th><th>Gevolg</th></tr></thead>
          <tbody>
            <tr><td><strong>Valse samenvoeging</strong> (false merge)</td><td>Twee verschillende mensen worden één record</td><td>Een onschuldige erft de verdenking, het beeld klopt niet meer, en elke volgende koppeling bouwt op de fout voort</td></tr>
            <tr><td><strong>Valse splitsing</strong> (false split)</td><td>Eén persoon blijft verdeeld over meerdere records</td><td>Je mist verbanden en onderschat de rol van iemand</td></tr>
          </tbody>
        </table>
        <p>Beide fouten zijn vervelend, maar een valse samenvoeging is voor de burger het gevaarlijkst. De Wet politiegegevens
        vraagt dat politiegegevens juist en nauwkeurig zijn. Een record waarin twee mensen door elkaar lopen, is dat niet. Daarom
        de vuistregel: <strong>bij twijfel niet samenvoegen, maar een relatie "mogelijk dezelfde" vastleggen met de onderbouwing
        erbij</strong>. Samenvoegen kan later altijd nog; een foute samenvoeging terugdraaien is veel lastiger, zeker als anderen er
        al mee hebben gewerkt.</p>

        <h3>Een voorbeeld</h3>
        <p>Je hebt een aangifte met een verdachte rekening, een KvK-uittreksel waarop diezelfde rekening als zakelijke rekening
        staat, en een oud domeinregistratierecord met het e-mailadres van een forumalias. De rekening koppelt aangifte en bedrijf
        deterministisch. Het e-mailadres koppelt bedrijf en alias. Dan duikt er een ander dossier op met dezelfde voorletter en
        achternaam, maar een andere geboortedatum en woonplaats. Die naam is geen selector die iets bewijst: dat record blijft
        apart.</p>

        <div class="callout warn"><strong>Let op:</strong> een samenvoeging is een analytische conclusie, geen waarneming. Leg
        dus vast wie samenvoegde, op grond van welke selector, en hoe zeker je bent.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'vijf records over "Kelderman"',
        scenario: 'Fictief dossier rond nepberichten namens NederBank. Alle namen, nummers en adressen zijn verzonnen.',
        records: [
          { title: 'R1 · Aangifte NederBank', lines: ['Geld van slachtoffer overgemaakt naar rekening NL00 FICT 0123 4567 89', 'Rekeninghouder volgens bank: B. Kelderman'] },
          { title: 'R2 · KvK-uittreksel', lines: ['Handelsnaam: Kelderman Hosting & Advies (eenmanszaak)', 'Eigenaar: Bram Kelderman, geboren 12-04-1991', 'Vestiging: Delft', 'Zakelijke rekening: NL00 FICT 0123 4567 89'] },
          { title: 'R3 · Forumbericht (2026-02-03)', lines: ['Alias: kelderkat', '"Servers die niet platgaan, abuse komt bij mij niet aan"', 'Contact: kelderkat@post.example'] },
          { title: 'R4 · Domeinregistratie (2019, vóór afscherming)', lines: ['Domein: kelderman-hosting.example', 'Registrant: Kelderman Hosting & Advies', 'E-mail: kelderkat@post.example'] },
          { title: 'R5 · Ander dossier', lines: ['B. Kelderman, geboren 03-11-1987', 'Woonplaats: Zoetermeer', 'Verdacht van winkeldiefstal (2024)'] },
        ],
        ask: [
          { q: 'Welke selector staat in zowel R1 als R2?', answer: ['NL00 FICT 0123 4567 89', 'NL00FICT0123456789', 'iban', 'het iban', 'rekeningnummer'], hint: 'Het is een rekeningnummer.' },
          { q: 'Welk e-mailadres staat in zowel R3 als R4?', answer: ['kelderkat@post.example'], hint: 'Vergelijk de contactregels.' },
        ],
      },
      questions: [
        { q: 'Welk record (code) mag je níét samenvoegen met de andere vier?', answer: ['R5', 'r 5'],
          hints: ['Zoek een record dat alleen via een naam aan de rest hangt.', 'Vergelijk geboortedatum en woonplaats met het KvK-uittreksel.', 'Het record met geboortedatum 03-11-1987.'],
          wrong: { 'r1': 'R1 deelt een IBAN met het KvK-uittreksel: een deterministische koppeling.', 'r3': 'R3 hangt via het e-mailadres aan de domeinregistratie, en die via de handelsnaam aan het bedrijf. Dat is een afgeleide koppeling met een onderbouwing.', 'r4': 'R4 noemt de handelsnaam uit het KvK-uittreksel en het e-mailadres van de alias. Het is juist de schakel.' },
          why: 'Een gedeelde naam is de klassieke valse samenvoeging. Wie R5 erbij trekt, zet een winkeldief uit Zoetermeer in een cybercrimedossier.',
          explain: 'R5 deelt alleen voorletter en achternaam. Geboortedatum en woonplaats verschillen met R2. Dat is een andere persoon, of in elk geval geen onderbouwde koppeling.' },
        { q: 'Via welk soort selector koppel je de aangifte (R1) deterministisch aan het bedrijf (R2)?', options: ['De achternaam', 'Het IBAN', 'De woonplaats', 'Het e-mailadres'], answer: 1,
          wrong: { 0: 'Een achternaam is niet uniek. Dat zou een probabilistische koppeling zijn, en een zwakke.', 2: 'R1 noemt geen woonplaats.', 3: 'R1 noemt geen e-mailadres.' },
          explain: 'Het rekeningnummer staat letterlijk in beide records en is uniek: een deterministische koppeling.' },
        { q: 'Welke fout is voor een burger het gevaarlijkst?', options: ['Een valse splitsing: één persoon verdeeld over twee records', 'Een valse samenvoeging: twee personen in één record', 'Allebei even gevaarlijk', 'Geen van beide; je controleert het later toch'], answer: 1,
          wrong: { 0: 'Vervelend voor het onderzoek, want je mist verbanden, maar er wordt niemand onterecht verdacht.', 2: 'Bij een valse samenvoeging erft een onschuldige de verdenking. Dat weegt zwaarder.', 3: 'Een foute koppeling wordt vaak overgenomen voordat iemand haar controleert.' },
          explain: 'Bij een valse samenvoeging erft een onschuldige een verdenking, en elke volgende analyse bouwt op die fout voort.' },
      ],
    },

    {
      title: 'Taak 3 — Een IP-adres duiden',
      tryFirst: true,
      intro: `<p>Op een nagemaakte inlogpagina van NederBank logde iemand in op het beheerpaneel. De melding, registratiegegevens
        en een log van de provider staan in de terminal. Zoek uit wat voor adres het is en welk klant-ID erachter zat.</p>
        <p>Begin met <code>cat melding.txt</code> en <code>ls ripe</code>.</p>`,
      content: `
        <p>Een IP-adres is de selector die je als analist het vaakst tegenkomt en het vaakst verkeerd ziet gebruiken. "Het IP is
        van X" is bijna nooit waar. Een IP-adres is een netwerkaansluiting op een moment. Duiden betekent dat je vier vragen
        beantwoordt: van welk netwerk is het, wat voor soort netwerk is dat, wanneer was het in gebruik, en wat zegt dat over de
        mens erachter?</p>

        <h3>1. Van welk netwerk?</h3>
        <p>Elk publiek IP-adres valt in een blok dat een regionaal register (voor Europa het RIPE NCC) heeft uitgegeven aan een
        organisatie, en wordt op internet aangekondigd door een <strong>ASN</strong> (Autonomous System Number). In de
        RIPE-database lees je onder andere <code>inetnum</code> (het blok), <code>netname</code>, <code>descr</code>,
        <code>country</code> en het abuse-contact. Let op: <code>country</code> is het land van registratie, niet de plek waar de
        computer staat.</p>

        <h3>2. Wat voor netwerk?</h3>
        <table>
          <thead><tr><th>Soort</th><th>Wat het betekent voor je onderzoek</th></tr></thead>
          <tbody>
            <tr><td><strong>Hosting / datacenter</strong></td><td>Een server. De gebruiker is een klant van de hoster: de vervolgvraag gaat naar de hoster.</td></tr>
            <tr><td><strong>Vaste thuisaansluiting</strong></td><td>Vaak één huishouden, soms met een adres dat af en toe wisselt. Iedereen in huis en op de wifi deelt het.</td></tr>
            <tr><td><strong>Mobiel met CGNAT</strong></td><td>Honderden klanten delen één publiek adres. Zonder exacte tijd én bronpoort kun je niemand aanwijzen.</td></tr>
            <tr><td><strong>VPN, proxy of Tor-exit</strong></td><td>Je ziet de dienst, niet de gebruiker. Of een adres op een datum een Tor-exit was, kun je nagaan in de openbare gegevens van het Tor Project.</td></tr>
          </tbody>
        </table>

        <h3>3. CGNAT: tijd plus poort</h3>
        <p>Er zijn te weinig IPv4-adressen voor alle telefoons. Mobiele providers zetten daarom <strong>Carrier-Grade NAT</strong>
        (CGNAT) in: klanten krijgen intern een adres, vaak uit de gedeelde reeks <code>100.64.0.0/10</code> (RFC 6598), en delen
        naar buiten één publiek adres. Elke klant krijgt een blok bronpoorten. Wil een provider later zeggen wie het was, dan heeft
        hij drie dingen nodig: het publieke adres, het exacte tijdstip en de bronpoort. Ontbreekt de poort in de log van het
        slachtoffer, dan blijft het bij "een van de vele klanten". En de provider moet die toewijzing nog bewaard hebben: Nederland
        kent sinds 2015 geen algemene bewaarplicht voor telecomgegevens meer, dus bewaartermijnen verschillen per provider.</p>

        <h3>4. Tijdzones</h3>
        <p>Logs staan meestal in UTC, meldingen van mensen in Nederlandse tijd. In de winter is dat UTC+1 (CET), in de zomer UTC+2
        (CEST). In 2026 loopt de zomertijd van 29 maart tot 25 oktober. Een uur verschil is bij CGNAT het verschil tussen de juiste
        klant en een onschuldige.</p>

        <h3>Wie vraagt het op?</h3>
        <p>Welke klant achter een adres, tijd en poort zat, zijn gebruikersgegevens van een aanbieder van een communicatiedienst. In
        een strafrechtelijk onderzoek vordert de officier van justitie die (art. 126na Sv). In dit lab is die stap al gezet: je
        krijgt een uittreksel van de toewijzingslog.</p>

        <h3>Commando's</h3>
        <pre><code>cat melding.txt
ls ripe
cat ripe/198.51.100.23.txt
cat ripe/203.0.113.45.txt
cat tor-exits.txt
grep 198.51.100.23 cgnat-log.csv</code></pre>
        <div class="callout tip"><strong>Tip:</strong> zet de tijd uit de melding eerst om naar UTC, en zoek dan de regel waarvan
        zowel het tijdvak als het poortblok klopt.</div>
      `,
      lab: {
        type: 'terminal',
        user: 'analist', host: 'ta-lab',
        home: '/home/analist', cwd: '/home/analist',
        motd: 'Analyse-werkplek (fictief). Typ help voor de commando\'s. Begin met: cat melding.txt',
        fs: {
          '/home/analist/melding.txt': 'Melding fraudeteam NederBank (fictief)\n=====================================\nBetreft : beheerpaneel van nep-inlogpagina nederbank-veilig.nm.lab\nInlog   : zaterdag 14-03-2026 om 22:17:05 (Nederlandse tijd)\nBron-IP : 198.51.100.23\nPoort   : 40312 (bronpoort)\n\nAndere adressen in het paneellog:\n  203.0.113.45  (de server waarop het paneel draait)\n  192.0.2.77    (twee inlogs op 13-03-2026)\n',
          '/home/analist/ripe/198.51.100.23.txt': 'inetnum:     198.51.100.0 - 198.51.100.255\nnetname:     MOBINET-CGNAT-POOL\ndescr:       Mobinet Nederland B.V. (fictief)\ndescr:       Mobiel internet, publieke CGNAT-adressen\ncountry:     NL\nabuse-c:     ABUSE-MOBINET\norigin:      AS64510\nsource:      RIPE (fictief uittreksel)\n',
          '/home/analist/ripe/203.0.113.45.txt': 'inetnum:     203.0.113.0 - 203.0.113.255\nnetname:     KELDERHOST-DC1\ndescr:       Kelderhost (fictief) - VPS en dedicated servers\ndescr:       Postbusadres, geen bezoekadres\ncountry:     NL\nabuse-c:     ABUSE-KELDERHOST\norigin:      AS64505\nsource:      RIPE (fictief uittreksel)\n',
          '/home/analist/ripe/192.0.2.77.txt': 'inetnum:     192.0.2.0 - 192.0.2.255\nnetname:     ZEEWIND-HOSTING\ndescr:       Zeewind Hosting (fictief)\ncountry:     NL\norigin:      AS64501\nsource:      RIPE (fictief uittreksel)\n',
          '/home/analist/tor-exits.txt': '# Fictieve momentopname van de openbare lijst met Tor-exitrelays, 13-03-2026\n192.0.2.77\n192.0.2.140\n198.51.100.201\n',
          '/home/analist/cgnat-log.csv': 'start_utc,eind_utc,publiek_ip,poortblok,klant_id\n2026-03-14T20:00:00Z,2026-03-14T21:59:59Z,198.51.100.22,39936-40959,K-55120\n2026-03-14T20:00:00Z,2026-03-14T21:59:59Z,198.51.100.23,38912-39935,K-20931\n2026-03-14T20:00:00Z,2026-03-14T21:59:59Z,198.51.100.23,39936-40959,K-48213\n2026-03-14T20:00:00Z,2026-03-14T21:59:59Z,198.51.100.23,40960-41983,K-10577\n2026-03-14T20:00:00Z,2026-03-14T21:59:59Z,198.51.100.24,39936-40959,K-61802\n2026-03-14T22:00:00Z,2026-03-14T23:59:59Z,198.51.100.22,39936-40959,K-38842\n2026-03-14T22:00:00Z,2026-03-14T23:59:59Z,198.51.100.23,38912-39935,K-41769\n2026-03-14T22:00:00Z,2026-03-14T23:59:59Z,198.51.100.23,39936-40959,K-73390\n2026-03-14T22:00:00Z,2026-03-14T23:59:59Z,198.51.100.23,40960-41983,K-26154\n2026-03-14T22:00:00Z,2026-03-14T23:59:59Z,198.51.100.24,39936-40959,K-90215\n',
        },
      },
      questions: [
        { q: 'Onder welk ASN valt het bron-IP uit de melding?', answer: ['AS64510', '64510', 'AS 64510'],
          hints: ['De registratiegegevens staan in de map ripe.', 'Open het bestand met het bron-IP in de naam.', 'Kijk naar de regel origin.'],
          wrong: { 'as64505': 'Dat is het ASN van de server waarop het paneel draait, niet van het bron-IP.', '64505': 'Dat is het ASN van de server waarop het paneel draait, niet van het bron-IP.' },
          explain: 'cat ripe/198.51.100.23.txt toont origin AS64510: een fictieve mobiele provider met een CGNAT-pool.' },
        { q: 'Hoe laat was de inlog in UTC? (UU:MM:SS)', answer: ['21:17:05', '21.17.05'],
          hints: ['Kijk op welke datum de inlog was en of de zomertijd dan al gold.', 'In 2026 begint de zomertijd op 29 maart. Op 14 maart is het dus wintertijd.', 'Wintertijd is UTC+1: trek één uur af.'],
          wrong: { '22:17:05': 'Dat is de Nederlandse tijd uit de melding. Logs van de provider staan in UTC.', '20:17:05': 'Je trok twee uur af. Op 14 maart geldt nog wintertijd (UTC+1).' },
          explain: '14 maart valt voor 29 maart, dus CET (UTC+1). 22:17:05 Nederlandse tijd is 21:17:05 UTC.' },
        { q: 'Welk klant-ID gebruikte dat adres met die bronpoort op dat moment?', answer: ['K-48213', 'k48213', '48213'],
          hints: ['Filter het CGNAT-log op het bron-IP met grep.', 'Kies het tijdvak waar 21:17:05 UTC in valt, en daarbinnen het poortblok waar 40312 in valt.', 'Het blok is 39936-40959 in het vak van 20:00 tot 21:59:59 UTC.'],
          wrong: { 'k-73390': 'Dat is de klant in het vak van 22:00 UTC. Je hebt de Nederlandse tijd niet omgezet naar UTC.', 'k-10577': 'Juist tijdvak, maar poort 40312 valt niet in 40960-41983.', 'k-20931': 'Juist tijdvak, maar poort 40312 valt niet in 38912-39935.' },
          why: 'Bij CGNAT wijst één uur of één poortblok verschil een andere klant aan. Een fout hier zet een onschuldige in beeld.',
          explain: 'grep 198.51.100.23 cgnat-log.csv geeft zes regels. Alleen 2026-03-14 20:00:00 tot 21:59:59 UTC met blok 39936-40959 past: K-48213.' },
        { q: 'Wat kun je zeggen over de twee inlogs vanaf 192.0.2.77?', options: ['Ze komen van een thuisaansluiting in Nederland', 'Het adres was die dag een Tor-exit: je ziet de dienst, niet de gebruiker', 'Ze komen van dezelfde klant als de inlog van 14 maart', 'Ze komen van de hoster van het paneel'], answer: 1,
          wrong: { 0: 'country NL zegt waar het blok geregistreerd is, en het adres staat op de lijst met Tor-exits.', 2: 'Daar is geen enkele aanwijzing voor; het zijn verschillende netwerken.', 3: 'Het paneel draait op 203.0.113.45 bij een andere hoster.' },
          explain: 'cat tor-exits.txt toont 192.0.2.77 op 13-03-2026. Wie via Tor inlogt, verbergt zijn eigen adres achter dat van de exit.' },
      ],
    },

    {
      title: 'Taak 4 — Bulletproof hosting herkennen',
      tryFirst: true,
      intro: `<p>Het beheerpaneel uit taak 3 draait bij Kelderhost. Je teamleider vraagt: is dit een gewone hoster met een slordige
        abuse-afdeling, of een bulletproof hoster? Beoordeel in het lab zes bevindingen tegen drie hypothesen.</p>`,
      content: `
        <p>Bulletproof hosting staat in de vacature als een van de kernthema's van het team. Een <strong>bulletproof hoster</strong>
        biedt servers, domeinen of IP-ruimte aan en belooft klanten dat ze niet uit de lucht gaan, ook niet als er klachten komen of
        als de inhoud overduidelijk crimineel is. Hij verdient juist aan het negeren van meldingen. Daarmee is hij een
        <em>facilitator</em>: hij pleegt de phishing of ransomware niet zelf, maar maakt het voor vele klanten tegelijk mogelijk.</p>

        <h3>Signalen</h3>
        <ul>
          <li><strong>Genegeerde abuse-meldingen.</strong> Meldingen van slachtoffers, CERT's of blokkadelijsten blijven onbeantwoord,
          of de klant krijgt een seintje en verhuist zijn site.</li>
          <li><strong>Lagen van resellers.</strong> De hoster huurt ruimte bij een gewone provider en verhuurt die door via een of
          meer tussenpartijen, vaak brievenbusfirma's. Zo krijgt de echte provider klachten over "een klant van een klant".</li>
          <li><strong>Anonieme betaling.</strong> Alleen cryptovaluta, geen identificatie van klanten, geen vragen.</li>
          <li><strong>ASN- en adreswissels.</strong> Na een vermelding op een blokkadelijst of een opzegging verhuist de hele
          operatie naar een nieuw ASN of een nieuw IP-blok, soms gehuurd of overgenomen van een ander.</li>
          <li><strong>Reclame op criminele fora.</strong> Teksten als "abuse wordt genegeerd" of "DMCA ignored".</li>
        </ul>

        <h3>Waarom het lastig is</h3>
        <p>Elk signaal afzonderlijk heeft ook een onschuldige verklaring. Een kleine hoster kan een overbelaste abuse-afdeling hebben.
        Betalen in crypto is legaal. Een gewone hoster kan zelf slachtoffer zijn van één criminele reseller-klant. Een registratie in
        een ander land zegt weinig. Daarom weeg je de signalen met <strong>concurrerende hypothesen</strong> (ACH): je zoekt niet
        naar wat je vermoeden bevestigt, maar naar bewijs dat een hypothese tegenspreekt. De hypothese met de minste
        tegenstrijdigheden blijft staan.</p>

        <h3>Een voorbeeld van een niet-diagnostische bevinding</h3>
        <p>Op de website van de hoster staan algemene voorwaarden die phishing en malware verbieden. Dat klinkt als een pluspunt, maar
        vrijwel iedere hoster heeft zulke voorwaarden, ook een bulletproof hoster die ze nooit handhaaft. De bevinding past bij elke
        hypothese en helpt je dus niet kiezen. Zulk bewijs heet <em>niet-diagnostisch</em>.</p>

        <div class="callout info"><strong>Waarom dit telt voor interventie:</strong> een bulletproof hoster bedient vaak tientallen
        criminele klanten tegelijk. Wie hem verstoort, raakt al die klanten in één keer. Dat maakt hem een aantrekkelijk doelwit voor
        een integrale aanpak met partners, zoals de provider waar hij ruimte huurt.</div>
      `,
      lab: {
        type: 'ach',
        question: 'Wat voor partij is Kelderhost (fictief)?',
        hypotheses: ['H1 Bulletproof hoster', 'H2 Gewone hoster, zwak abuse-proces', 'H3 Gewone hoster, misbruikt door één reseller'],
        evidence: [
          { text: 'E1 Op een crimineel forum adverteert Kelderhost met "abuse-meldingen komen bij ons niet aan"', expert: ['C', 'I', 'I'] },
          { text: 'E2 Van 44 abuse-meldingen in zes maanden zijn er 41 onbeantwoord, verspreid over veel verschillende klanten', expert: ['C', 'C', 'I'] },
          { text: 'E3 Klanten betalen alleen in cryptovaluta en hoeven zich niet te identificeren', expert: ['C', 'N', 'N'] },
          { text: 'E4 In veertien maanden drie keer van ASN gewisseld, telkens kort na een vermelding op een blokkadelijst', expert: ['C', 'I', 'I'] },
          { text: 'E5 De algemene voorwaarden verbieden phishing en malware', expert: ['C', 'C', 'C'] },
          { text: 'E6 Het IP-blok is bij de RIR geregistreerd op een tussenpartij met alleen een postbusadres', expert: ['C', 'N', 'C'] },
        ],
      },
      questions: [
        { q: 'Welke hypothese (code) houdt volgens de expertbeoordeling de minste inconsistenties over?', answer: ['H1', 'h 1', 'hypothese 1'],
          hints: ['Tel per hypothese het aantal I\'s, niet het aantal C\'s.', 'Gebruik de knop "Vergelijk met expert" als je je eigen oordelen wilt controleren.', 'Eén hypothese heeft nul inconsistenties.'],
          wrong: { 'h2': 'H2 wordt tegengesproken door de forumadvertentie (E1) en de ASN-wissels (E4): twee inconsistenties.', 'h3': 'H3 heeft er drie: E1, E2 (meldingen over veel verschillende klanten, niet één reseller) en E4.' },
          why: 'ACH dwingt je naar tegenbewijs te kijken. Zo voorkom je dat je de eerste plausibele verklaring vasthoudt.',
          explain: 'H1 nul, H2 twee (E1, E4), H3 drie (E1, E2, E4). De conclusie blijft een oordeel met onzekerheid, geen bewijs.' },
        { q: 'Welke bevinding (code) is niet-diagnostisch?', answer: ['E5', 'e 5'],
          hints: ['Zoek een bevinding die bij elke hypothese past.', 'Kijk naar de rij waar drie keer C staat.', 'Het gaat om iets wat vrijwel elke hoster op zijn site heeft.'],
          wrong: { 'e3': 'E3 past goed bij H1 en is neutraal voor de andere twee. Het helpt een beetje.', 'e6': 'E6 past bij H1 en H3 maar is neutraal voor H2. Het onderscheidt weinig, maar niet niets.' },
          explain: 'De algemene voorwaarden passen bij alle drie de hypothesen. Ze helpen je niet kiezen.' },
        { q: 'Waarom is het verstoren van een bulletproof hoster vaak een effectieve interventie?', options: ['Omdat hij zelf de phishingmails verstuurt', 'Omdat hij als facilitator veel criminele klanten tegelijk bedient', 'Omdat hosting in Nederland verboden is', 'Omdat het altijd tot een aanhouding leidt'], answer: 1,
          wrong: { 0: 'Hij maakt het versturen mogelijk, maar doet het meestal niet zelf.', 2: 'Hosting is gewoon legaal. Het gaat om het bewust faciliteren van criminaliteit.', 3: 'Verstoren kan ook zonder aanhouding, bijvoorbeeld samen met de provider waar hij ruimte huurt.' },
          explain: 'Eén facilitator raakt veel klanten. Verstoren heeft daardoor een grote hefboom.' },
      ],
    },

    {
      title: 'Taak 5 — Vastleggen: herkomst, geldigheid en bronbeoordeling',
      tryFirst: true,
      intro: `<p>Vier bevindingen uit dit dossier moeten in het systeem. Beoordeel in het lab per bevinding de bron (A tot F) en de
        informatie (1 tot 6), elk apart.</p>`,
      content: `
        <p>Een bevinding die je niet goed vastlegt, is over een maand waardeloos. Jij weet nog waar ze vandaan kwam; je collega, de
        officier van justitie of een partner die er op moet handelen niet. Een goede vastlegging van een entiteit of relatie
        beantwoordt vijf vragen.</p>

        <table>
          <thead><tr><th>Vraag</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td><strong>Wat</strong> is de bewering?</td><td>198.51.100.23 met poort 40312 was toegewezen aan klant K-48213</td></tr>
            <tr><td><strong>Waar</strong> komt het vandaan (herkomst)?</td><td>CGNAT-log van Mobinet, verkregen na een vordering</td></tr>
            <tr><td><strong>Wanneer</strong> gold het (geldigheid)?</td><td>14-03-2026 20:00:00 tot 21:59:59 UTC</td></tr>
            <tr><td><strong>Hoe betrouwbaar</strong> (Admiralty)?</td><td>Bron B, informatie 2</td></tr>
            <tr><td><strong>Welk label</strong>?</td><td>Bekend (waarneming), afgeleid (conclusie) of aanname</td></tr>
          </tbody>
        </table>

        <h3>Twee tijden</h3>
        <p>Houd het moment waarop je iets vastlegt gescheiden van de periode waarin het waar was. "Op 19 november zag ik dat het domein
        naar dit adres wijst" is iets anders dan "het domein wees van 3 maart tot 2 april naar dit adres". Infrastructuur verhuist,
        abonnementen wisselen van eigenaar, telefoonnummers worden opnieuw uitgegeven. Een relatie zonder periode wordt na een tijdje
        vanzelf onwaar.</p>

        <h3>De Admiralty-code</h3>
        <p>Je beoordeelt de <strong>bron</strong> en de <strong>informatie</strong> apart. De bron krijgt een letter: A (volledig
        betrouwbaar) tot en met E (onbetrouwbaar), en F als je het niet kunt beoordelen. De informatie krijgt een cijfer: 1 (bevestigd
        door een andere, onafhankelijke bron) tot en met 5 (onwaarschijnlijk), en 6 als je het niet kunt beoordelen. Een betrouwbare
        bron kan iets doorgeven wat hij zelf niet heeft gecontroleerd. Een hoster die keurig levert wat een klant bij aanmelding
        intypte, is een goede bron voor onbetrouwbare informatie.</p>

        <h3>Binnen de Wet politiegegevens</h3>
        <p>Wat je vastlegt, zijn politiegegevens. De Wet politiegegevens (Wpg) koppelt elke verwerking aan een doel, zoals de
        dagelijkse politietaak, een onderzoek in een bijzonder geval of een onderzoek naar betrokkenheid bij ernstige misdrijven. Het
        doel bepaalt wie de gegevens mag zien en hoe lang ze bewaard blijven. Verzamel niet meer dan je voor dat doel nodig hebt, en
        leg vast op welk doel je verwerking rust. Blijf je langere tijd gericht informatie over één persoon verzamelen, ook uit open
        bronnen, dan kan dat stelselmatig worden; daar zijn in het Wetboek van Strafvordering aparte bevoegdheden voor nodig. Twijfel
        je, overleg dan met je teamleider of de officier van justitie voordat je doorgaat.</p>

        <div class="callout tip"><strong>Tip:</strong> leg ook vast wat je gezocht en niet gevonden hebt. "Niet in de Tor-exitlijst
        van 13 maart" is een bevinding, en het voorkomt dat een collega hetzelfde werk opnieuw doet.</div>
      `,
      lab: {
        type: 'admiralty',
        items: [
          { source: 'Toewijzingslog van de mobiele provider, verkregen na een vordering', info: '198.51.100.23 met poort 40312 was op 14-03-2026 om 21:17:05 UTC toegewezen aan klant K-48213', reliability: 'B', credibility: '2', explain: 'Een provider is doorgaans een betrouwbare bron voor zijn eigen technische registratie. De informatie is logisch en past bij de melding, maar is nog niet door een tweede, onafhankelijke bron bevestigd.' },
          { source: 'Klantregistratie van Kelderhost, verkregen na een vordering', info: 'Het paneel werd gehuurd door "J. Jansen", betaald in cryptovaluta', reliability: 'B', credibility: '4', explain: 'De hoster levert wat hij heeft (bron B), maar de naam is door de klant zelf ingetypt zonder enige controle. Twijfelachtig: 4.' },
          { source: 'Anoniem bericht op een crimineel forum', info: '"kelderkat woont in Delft"', reliability: 'F', credibility: '6', explain: 'Een onbekende forumgebruiker kun je niet beoordelen (F), en of de bewering waar is evenmin (6).' },
          { source: 'Eigen passive-DNS-opvraging, dezelfde dag bevestigd door de certificaatlogs', info: 'nederbank-veilig.nm.lab wees op 14-03-2026 naar 203.0.113.45', reliability: 'B', credibility: '1', explain: 'Een gevestigde dienst die meestal klopt (B), en de informatie is door een tweede, onafhankelijke bron bevestigd (1).' },
        ],
      },
      questions: [
        { q: 'Welke letter geef je een bron waarvan je de betrouwbaarheid niet kunt beoordelen?', answer: ['F'],
          hints: ['Het is de laatste letter van de schaal.', 'A tot en met E zijn oordelen; de laatste letter betekent "geen oordeel mogelijk".'],
          wrong: { 'e': 'E betekent onbetrouwbaar. Dat is een oordeel. Gevraagd is de letter voor "kan niet beoordeeld worden".' },
          explain: 'F: betrouwbaarheid kan niet worden beoordeeld. Dat is iets anders dan onbetrouwbaar (E).' },
        { q: 'Een hoster levert de klantnaam die een klant zelf invulde, zonder controle. Wat is de beste beoordeling?', options: ['A1', 'B4', 'E5', 'F6'], answer: 1,
          wrong: { 0: 'Niets is bevestigd, en een zelf ingevulde naam is zeker niet volledig betrouwbaar.', 2: 'De hoster is als bron niet onbetrouwbaar; hij levert precies wat hij heeft.', 3: 'Je kunt de hoster als bron wel beoordelen.' },
          why: 'Bron en informatie apart beoordelen voorkomt dat een betrouwbare bron een onbetrouwbare bewering geloofwaardig maakt.',
          explain: 'Betrouwbare bron (B), twijfelachtige informatie (4).' },
        { q: 'Wat leg je naast het moment van vastleggen altijd vast bij een relatie tussen een domein en een IP-adres?', options: ['De naam van de analist die het als eerste zag', 'De periode waarin de relatie gold', 'Het land van de hoster', 'Het aantal andere domeinen op het adres'], answer: 1,
          wrong: { 0: 'Wie het vastlegde is nuttig, maar het maakt de relatie zelf niet juist.', 2: 'Dat is een kenmerk van het IP, geen eigenschap van de relatie.', 3: 'Handig voor de zeldzaamheidstoets, maar niet wat de relatie in de tijd verankert.' },
          explain: 'Infrastructuur verhuist. Zonder periode wordt een relatie na verloop van tijd onwaar.' },
      ],
    },

    {
      title: 'Taak 6 — Eindcasus: van melding naar dossierkaart',
      tryFirst: true,
      intro: `<p>Een nieuwe melding van NederBank, nu in de zomer. Combineer de fragmenten in het lab tot één onderbouwde
        bevinding. Gebruik alles uit de vorige taken: tijdzone, CGNAT, records koppelen en het juiste label.</p>`,
      content: `
        <p>Dit is het werk in het klein. Je krijgt geen stappenplan, alleen fragmenten. Werk ze af in een vaste volgorde:</p>
        <ol>
          <li><strong>Duid het adres.</strong> Wat voor netwerk is het? Heb je een bronpoort nodig?</li>
          <li><strong>Zet de tijd om.</strong> Welke tijdzone gold op de datum van de melding?</li>
          <li><strong>Zoek de toewijzing.</strong> Welk tijdvak en welk poortblok passen allebei?</li>
          <li><strong>Koppel de klant.</strong> Naar welk soort entiteit wijst het klantnummer: een persoon of een organisatie?</li>
          <li><strong>Label je conclusie.</strong> Wat is bekend, wat is afgeleid, en wat is nog een aanname?</li>
        </ol>

        <h3>Waar het vaak misgaat</h3>
        <p>Bij een melding in de zomer trekken veel analisten uit gewoonte één uur af. Anderen vinden de juiste klant en schrijven
        vervolgens de naam van de eigenaar van het abonnement op als verdachte. Maar een zakelijk abonnement met meerdere
        simkaarten wijst naar een organisatie, niet naar een mens. Wie de simkaart op dat moment gebruikte, is een nieuwe vraag.</p>

        <p>En dan is er vaak nog een verleidelijk los eindje: een alias op een forum die "ongeveer" past. Zolang er geen selector
        is die hem aan de rest verbindt, is dat een aanname. Schrijf hem op, met dat label, en laat hem buiten je conclusie.</p>

        <div class="callout info"><strong>Dossierkaart:</strong> sluit af met één zin die een collega zonder uitleg kan lezen:
        wat je weet, waar het vandaan komt, voor welke periode het geldt en hoe zeker je bent.</div>
      `,
      lab: {
        type: 'osintpuzzle',
        title: 'melding 2 augustus 2026',
        scenario: 'Fictief. Iemand logde met gestolen gegevens in op het klantportaal van NederBank. Dit is wat het team tot nu toe heeft.',
        records: [
          { title: 'Melding NederBank', lines: ['Inlog met gestolen gegevens op het klantportaal', 'Tijd: zondag 2 augustus 2026, 03:41:12 Nederlandse tijd', 'Bron-IP: 198.51.100.88, bronpoort 51877'] },
          { title: 'RIPE-uittreksel', lines: ['198.51.100.0/24 · origin AS64510', 'Mobinet Nederland B.V. · publieke CGNAT-adressen'] },
          { title: 'Toewijzingslog Mobinet (UTC)', lines: ['01:00:00-01:59:59 · 198.51.100.88 · 50176-51199 · K-11846', '01:00:00-01:59:59 · 198.51.100.88 · 51200-52223 · K-77120', '01:00:00-01:59:59 · 198.51.100.88 · 52224-53247 · K-55901', '02:00:00-02:59:59 · 198.51.100.88 · 51200-52223 · K-62487', '03:00:00-03:59:59 · 198.51.100.88 · 51200-52223 · K-30418'] },
          { title: 'Gebruikersgegevens (na vordering)', lines: ['K-11846 · particulier abonnement', 'K-30418 · zakelijk · Stichting Duinrand · 12 simkaarten', 'K-55901 · particulier abonnement', 'K-62487 · particulier abonnement', 'K-77120 · zakelijk · Lindeboom Webbouw · 3 simkaarten'] },
          { title: 'Forumbericht (2026-07-28)', lines: ['Alias: duinvos', '"Koop inlogs NederBank, betaal per stuk"', 'Geen contactgegevens'] },
        ],
        ask: [
          { q: 'Hoe laat was de inlog in UTC? (UU:MM:SS)', answer: ['01:41:12', '1:41:12'], hint: 'Op 2 augustus geldt zomertijd: UTC+2.' },
          { q: 'Hoeveel simkaarten vallen onder het abonnement dat je vindt?', answer: ['3', 'drie'], hint: 'Zoek het klant-ID op in de gebruikersgegevens.' },
        ],
      },
      questions: [
        { q: 'Boss: welke organisatie hoort bij het abonnement dat op het moment van de inlog dit adres met deze bronpoort gebruikte?', boss: true, answer: ['Lindeboom Webbouw', 'lindeboom'],
          hints: ['Zet de tijd om naar UTC. Op 2 augustus geldt zomertijd.', 'Zoek in de toewijzingslog het vak waar 01:41:12 in valt, en daarin het blok waar poort 51877 in valt.', 'Het klant-ID is K-77120. Zoek het op in de gebruikersgegevens.'],
          wrong: { 'stichting duinrand': 'Dat is de klant van 03:00 UTC. Je hebt de Nederlandse tijd niet omgezet.', '/duinrand/i': 'Dat is de klant van 03:00 UTC. Je hebt de Nederlandse tijd niet omgezet.', 'k-62487': 'Dat is het vak van 02:00 UTC: je trok maar één uur af, maar in augustus geldt zomertijd (UTC+2).', 'duinvos': 'De alias hangt via geen enkele selector aan de inlog. Dat is een aanname, geen koppeling.', 'k-77120': 'Dat is het juiste klant-ID. Gevraagd is de organisatie die erbij hoort.' },
          why: 'Tijdzone, poortblok en het soort entiteit achter een klantnummer: elk van de drie kan een onschuldige in beeld brengen als je hem overslaat.',
          explain: '03:41:12 CEST is 01:41:12 UTC. Poort 51877 valt in 51200-52223: K-77120, een zakelijk abonnement van Lindeboom Webbouw met drie simkaarten.' },
        { q: 'Welke vastlegging is juist?', options: ['De eigenaar van Lindeboom Webbouw is de verdachte', 'Een simkaart onder het zakelijke abonnement K-77120 gebruikte op 02-08-2026 om 01:41:12 UTC dit adres en deze poort (afgeleid uit melding, CGNAT-log en gebruikersgegevens); wie de simkaart gebruikte, is onbekend', 'duinvos is de gebruiker van K-77120', 'Mobinet is betrokken bij de fraude'], answer: 1,
          wrong: { 0: 'Het abonnement wijst naar een organisatie met drie simkaarten. Wie er op dat moment gebruik van maakte, weet je nog niet.', 2: 'Er is geen selector die duinvos aan de inlog of het abonnement koppelt. Dat is een aanname.', 3: 'De provider is het doorgeefluik van het verkeer, geen partij in de fraude.' },
          explain: 'Je legt vast wat je kunt onderbouwen, met bronnen, tijd en label, en je benoemt wat nog open is.' },
        { q: 'Hoe label je de bewering "duinvos zit achter deze inlog"?', options: ['Bekend', 'Afgeleid', 'Aanname'], answer: 2,
          wrong: { 0: 'Niets in de bronnen laat dit rechtstreeks zien.', 1: 'Een afgeleide conclusie rust op meerdere bekende feiten. Hier is geen enkele selector die de alias aan de inlog verbindt.' },
          explain: 'Het onderwerp past, maar er is geen verbindende selector. Het blijft een aanname tot je er een vindt.' },
      ],
    },

    {
      title: 'Taak 7 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examen- en assessmentvragen over entiteiten geven je een kort geval en vragen wat je wel en niet mag concluderen. De
        afleiders zijn bijna altijd conclusies die te ver gaan: van selector naar persoon, van gelijke naam naar dezelfde persoon, of
        van één signaal naar een oordeel. De vragen hieronder zijn zelf geschreven in die stijl; alles is fictief.</p>
      `,
      questions: [
        { q: 'Een phishingsite draait op een IP-adres van een grote cloudprovider. Wat is de beste eerste stap?', options: ['De cloudprovider als verdachte aanmerken', 'De klant van de cloudprovider achter het adres en de periode laten achterhalen, en de provider via abuse informeren', 'Alle adressen van de provider laten blokkeren', 'Concluderen dat de dader in het land van de provider woont'], answer: 1,
          wrong: { 0: 'De provider verhuurt alleen; de klant is de partij die je zoekt.', 2: 'Dat treft duizenden onschuldige klanten.', 3: 'Het land van registratie zegt niets over waar de dader woont.' },
          explain: 'Bij hosting is de klant van de hoster de entiteit waar het om draait. Adres plus periode is de selector.' },
        { q: 'Twee records delen naam en woonplaats, maar de geboortedatum verschilt één dag. Wat doe je?', options: ['Direct samenvoegen, één dag is vast een typefout', 'Niet samenvoegen; een relatie "mogelijk dezelfde" vastleggen en een sterkere selector zoeken', 'Het record met de oudste datum verwijderen', 'Beide records negeren'], answer: 1,
          wrong: { 0: 'Misschien een typefout, misschien een andere persoon. Zonder sterkere selector is dit een valse samenvoeging in wording.', 2: 'Je weet niet welke datum juist is.', 3: 'Dan gooi je mogelijk relevante informatie weg.' },
          explain: 'Bij twijfel niet samenvoegen, wel de mogelijke koppeling met onderbouwing vastleggen.' },
        { q: 'Een slachtoffer levert een log met alleen het publieke IP-adres van een mobiele provider en een tijdstip, zonder bronpoort. Wat is het meest realistische vervolg?', options: ['De provider kan de klant altijd eenduidig aanwijzen', 'De provider kan waarschijnlijk alleen een groep klanten noemen die het adres toen deelden', 'Het adres is waardeloos en kan weg', 'Het adres wijst naar de zendmast en dus naar de woonplaats'], answer: 1,
          wrong: { 0: 'Bij CGNAT delen veel klanten tegelijk één adres. Zonder poort is er geen eenduidige toewijzing.', 2: 'Het blijft een bruikbaar gegeven, bijvoorbeeld in combinatie met andere sporen.', 3: 'Een publiek CGNAT-adres zegt niets over een zendmast of woonplaats.' },
          explain: 'Zonder bronpoort blijft het bij een groep klanten. Vraag het slachtoffer of de bron dus altijd om de poort en de tijdzone van de log.' },
      ],
    },
  ],

  check: [
    { q: 'Wat is het verschil tussen een entiteit en een selector?', options: ['Er is geen verschil', 'Een entiteit is het ding in de echte wereld; een selector is een zoekbaar kenmerk dat ernaar wijst', 'Een selector is altijd een persoon', 'Een entiteit is altijd een IP-adres'], answer: 1, explain: 'Een IBAN of IP-adres wijst naar een entiteit, maar is die entiteit niet.' },
    { q: 'Welke drie gegevens heeft een mobiele provider met CGNAT nodig om een klant aan te wijzen?', options: ['Publiek IP-adres, exact tijdstip en bronpoort', 'Alleen het IP-adres', 'IP-adres en land', 'Naam en woonplaats'], answer: 0, explain: 'Veel klanten delen één adres; pas tijd plus poort maken de toewijzing eenduidig.' },
    { q: 'Wat betekent de Admiralty-beoordeling B4?', options: ['Onbetrouwbare bron, bevestigde informatie', 'Meestal betrouwbare bron, twijfelachtige informatie', 'Niet te beoordelen bron, waarschijnlijke informatie', 'Volledig betrouwbare bron, onwaarschijnlijke informatie'], answer: 1, explain: 'B is meestal betrouwbaar, 4 is twijfelachtig. Bron en informatie beoordeel je los van elkaar.' },
    { q: 'Welk signaal past het minst bij een gewone hoster met een zwak abuse-proces?', options: ['Trage reactie op meldingen', 'Reclame op een crimineel forum met de belofte dat meldingen worden genegeerd', 'Een kleine abuse-afdeling', 'Klanten in meerdere landen'], answer: 1, explain: 'Bewust adverteren met het negeren van meldingen is een kenmerk van een bulletproof hoster.' },
  ],

  terms: [
    { term: 'Entiteit', def: 'Een ding in de echte wereld waar je informatie over verzamelt: persoon, bedrijf, organisatie, server, rekening.' },
    { term: 'Selector', def: 'Een zoekbaar kenmerk dat naar een entiteit wijst, zoals een e-mailadres, IBAN, KvK-nummer, IP-adres of alias. Het is niet de entiteit zelf.' },
    { term: 'Entity resolution', def: 'Bepalen welke records uit verschillende bronnen over dezelfde entiteit gaan, deterministisch (unieke selector) of probabilistisch (meerdere zwakke kenmerken).' },
    { term: 'Valse samenvoeging', def: 'False merge: twee verschillende entiteiten worden als één behandeld. Gevaarlijk, omdat een onschuldige een verdenking erft.' },
    { term: 'ASN', def: 'Autonomous System Number: het nummer van een netwerk dat een reeks IP-adressen op internet aankondigt.' },
    { term: 'CGNAT', def: 'Carrier-Grade NAT: veel klanten van een provider delen één publiek IPv4-adres, elk met een eigen blok bronpoorten.' },
    { term: 'Tor-exit', def: 'De laatste relay in het Tor-netwerk; het adres dat een website ziet. Het zegt iets over de dienst, niet over de gebruiker.' },
    { term: 'Bulletproof hosting', def: 'Hosting die bewust meldingen en klachten negeert en criminele klanten afschermt, vaak via resellers, crypto-betaling en wisselende ASN\'s.' },
    { term: 'Niet-diagnostisch bewijs', def: 'Bewijs dat bij elke hypothese past en je dus niet helpt kiezen.' },
    { term: 'Admiralty-code', def: 'Bronbeoordeling met een letter voor de bron (A-F) en een cijfer voor de informatie (1-6), apart van elkaar.' },
    { term: 'Geldigheidsperiode', def: 'De periode waarin een relatie waar was, los van het moment waarop je haar vastlegde.' },
    { term: 'Wet politiegegevens (Wpg)', def: 'De wet die regelt voor welke doelen de politie gegevens mag verwerken, wie ze mag inzien en hoe lang ze bewaard blijven.' },
  ],

  resources: [
    { title: 'RIPEstat — gegevens over IP-adressen, prefixen en ASN\'s', url: 'https://stat.ripe.net/' },
    { title: 'RFC 6598 — gedeelde adresruimte voor Carrier-Grade NAT (100.64.0.0/10)', url: 'https://www.rfc-editor.org/rfc/rfc6598' },
    { title: 'Tor Metrics: ExoneraTor — was een adres op een datum een Tor-relay?', url: 'https://metrics.torproject.org/exonerator.html' },
    { title: 'Wet politiegegevens — wetten.overheid.nl', url: 'https://wetten.overheid.nl/BWBR0022463' },
  ],
});
