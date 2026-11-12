/* Room: SIEM en threat hunting: van logregel tot nieuwe detectie */
CS.registerRoom({
  id: 'siem-threat-hunting',
  path: 'defensief',
  order: 12,
  title: 'SIEM en threat hunting',
  icon: '🔭',
  difficulty: 'Gemiddeld',
  minutes: 90,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Leer hoe een SIEM logs verzamelt, normaliseert, correleert en alarmeert. Schrijf en verfijn zoekvragen, stem een lawaaiige regel af en jaag met een hypothese op beaconing en een verdacht nieuw account.',
  objectives: [
    'De vier stappen van een SIEM uitleggen: verzamelen, normaliseren, correleren en alarmeren',
    'Een zoekvraag schrijven en stap voor stap verfijnen tot hij alleen het gezochte gedrag raakt',
    'Een correlatieregel lezen en voorspellen welke gebeurtenissen hem wel en niet laten afgaan',
    'Alarmmoeheid herkennen en een regel afstemmen met precisie, vals-positieven en dekking als maat',
    'Een threat hunt uitvoeren volgens de lus hypothese, data, zoekvraag, bevinding en nieuwe detectie',
  ],
  tasks: [
    {
      title: 'Taak 1: Wat een SIEM doet',
      tryFirst: true,
      intro: '<p>Het waterschap Polderwater (fictief) stuurt logs van de firewall, de VPN-gateway, de domeincontroller en de proxy naar één plek. In het lab staan twintig minuten van die ruwe logs, nog zonder bewerking. Volg de VPN-sessie van k.dijkstra door alle vier de bronnen heen. Let op: de firewall logt in Nederlandse tijd, de rest in UTC.</p>',
      content: `
        <p>Een <strong>SIEM</strong> (<em>Security Information and Event Management</em>) is de plek waar een
        securityteam de logs van een hele organisatie samenbrengt. Denk aan een meldkamer die niet naar één camera
        kijkt, maar naar honderden tegelijk, en die zelf een seintje geeft als er op drie camera's achter elkaar iets
        gebeurt. Een SIEM doet vier dingen.</p>
        <ol>
          <li><strong>Verzamelen.</strong> Agents en doorstuurprotocollen zoals syslog brengen logs van firewalls,
          servers, werkplekken, cloudomgevingen en applicaties naar het SIEM. Wat je niet verzamelt, kun je later
          ook niet doorzoeken.</li>
          <li><strong>Normaliseren.</strong> Elke bron schrijft anders. De firewall noemt het bronadres
          <code>src</code>, de VPN-gateway <code>client</code> en Windows <code>IpAddress</code>. De ene bron
          logt in UTC, de andere in lokale tijd. De gebruiker heet <code>k.dijkstra@...</code>,
          <code>kdijkstra</code> of <code>DOMEIN\\kdijkstra</code>. Bij het normaliseren zet het SIEM dit om naar
          vaste velden (bijvoorbeeld <code>bron_ip</code>, <code>gebruiker</code>, <code>tijd_utc</code>) en één
          tijdzone.</li>
          <li><strong>Correleren.</strong> Pas als de velden gelijk zijn, kun je gebeurtenissen uit verschillende
          bronnen aan elkaar koppelen: deze VPN-aanmelding hoort bij dat interne adres, en dat adres deed daarna die
          upload.</li>
          <li><strong>Alarmeren.</strong> Regels zoeken naar patronen en maken een alarm (<em>alert</em>) voor de
          analist, vaak met een ernst en een verwijzing naar een draaiboek.</li>
        </ol>

        <h3>Een voorbeeld van normaliseren</h3>
        <pre><code>ruw (firewall):  2026-11-03T09:14:02+01:00 ALLOW src=203.0.113.45:51234
genormaliseerd:  tijd_utc=2026-11-03 08:14:02  actie=toegestaan  bron_ip=203.0.113.45  bron_poort=51234</code></pre>
        <p>Het achtervoegsel <code>+01:00</code> betekent: deze klokwaarde loopt een uur voor op UTC. In november
        geldt in Nederland wintertijd (CET, UTC+1); in de zomer is het UTC+2. Wie dat vergeet, legt gebeurtenissen
        een uur naast elkaar en ziet verbanden die er niet zijn, of mist ze juist.</p>

        <div class="callout tip">
          <strong>Tip:</strong> een sessie volg je door bronnen heen via een gedeeld kenmerk. Hier is dat eerst het
          externe adres (firewall en VPN) en daarna het interne adres dat de VPN-gateway toewijst (domeincontroller en
          proxy). Een filter als <code>/adres-a|adres-b/</code> laat beide tegelijk zien.
        </div>
        <p>In de echte wereld heten SIEM-producten verschillend en heeft elk zijn eigen zoektaal. De principes in
        deze room gelden voor allemaal; daarom gebruiken we een eenvoudige, eigen notatie en de filters van het lab.</p>
      `,
      lab: {
        type: 'logs',
        title: 'ruwe logs Polderwater, 3 november 2026',
        lines: `[fw01]  2026-11-03T09:13:58+01:00 ALLOW src=198.51.100.20:40112 dst=192.0.2.10:443 proto=tcp
[fw01]  2026-11-03T09:14:02+01:00 ALLOW src=203.0.113.45:51234 dst=192.0.2.10:443 proto=tcp
[vpn]   2026-11-03 08:14:05Z vpn-gw01 auth=ok user=k.dijkstra@polderwater.nm.lab client=203.0.113.45 toegewezen=192.0.2.131
[win]   2026-11-03 08:14:40Z DC01 EventID=4624 LogonType=3 TargetUserName=kdijkstra IpAddress=192.0.2.131
[proxy] 03/Nov/2026:08:15:12 +0000 192.0.2.131 POLDERWATER\\kdijkstra GET https://intranet.polderwater.nm.lab/ 200
[fw01]  2026-11-03T09:15:30+01:00 ALLOW src=198.51.100.77:6001 dst=192.0.2.10:443 proto=tcp
[vpn]   2026-11-03 08:15:33Z vpn-gw01 auth=ok user=s.ozturk@polderwater.nm.lab client=198.51.100.77 toegewezen=192.0.2.140
[win]   2026-11-03 08:15:51Z DC01 EventID=4624 LogonType=3 TargetUserName=sozturk IpAddress=192.0.2.140
[proxy] 03/Nov/2026:08:17:44 +0000 192.0.2.140 POLDERWATER\\sozturk GET https://mail.polderwater.nm.lab/owa/ 200
[fw01]  2026-11-03T09:18:02+01:00 DENY src=198.51.100.200:49822 dst=192.0.2.10:445 proto=tcp
[proxy] 03/Nov/2026:08:19:10 +0000 192.0.2.131 POLDERWATER\\kdijkstra GET https://files-deel.example/s/q81/ 200
[win]   2026-11-03 08:19:40Z DC01 EventID=4624 LogonType=3 TargetUserName=kdijkstra IpAddress=192.0.2.131
[proxy] 03/Nov/2026:08:21:09 +0000 192.0.2.131 POLDERWATER\\kdijkstra POST https://files-deel.example/s/q81/upload 200
[fw01]  2026-11-03T09:22:47+01:00 ALLOW src=203.0.113.45:51290 dst=192.0.2.10:443 proto=tcp
[vpn]   2026-11-03 08:25:12Z vpn-gw01 auth=fail user=k.dijkstra@polderwater.nm.lab client=198.51.100.200
[vpn]   2026-11-03 08:25:40Z vpn-gw01 auth=fail user=k.dijkstra@polderwater.nm.lab client=198.51.100.200
[win]   2026-11-03 08:26:02Z DC01 EventID=4624 LogonType=3 TargetUserName=sozturk IpAddress=192.0.2.140
[fw01]  2026-11-03T09:27:15+01:00 ALLOW src=198.51.100.77:6044 dst=192.0.2.10:443 proto=tcp
[proxy] 03/Nov/2026:08:29:02 +0000 192.0.2.140 POLDERWATER\\sozturk GET https://intranet.polderwater.nm.lab/rooster 200
[vpn]   2026-11-03 08:30:41Z vpn-gw01 logout user=k.dijkstra@polderwater.nm.lab client=203.0.113.45 duur=16m`,
      },
      questions: [
        { q: 'Hoe laat was het in UTC toen de firewall voor het eerst verkeer van 203.0.113.45 toeliet? (UU:MM:SS)', answer: ['08:14:02', '8:14:02'],
          hints: ['Filter op het adres en kijk naar de bovenste firewallregel.', 'Die regel staat in lokale tijd met het achtervoegsel +01:00.', 'Trek één uur af van 09:14:02.'],
          wrong: { '09:14:02': 'Dat is de lokale klokwaarde. Het achtervoegsel +01:00 zegt dat je er een uur af moet halen voor UTC.', '10:14:02': 'Je telt het uur erbij op. +01:00 betekent dat de lokale klok voorloopt, dus UTC is een uur eerder.' },
          why: 'Zonder één tijdzone lijkt de firewallregel een uur na de VPN-aanmelding te gebeuren. Dan koppel je hem niet aan de sessie, of aan een verkeerde.',
          explain: '09:14:02+01:00 is 08:14:02 UTC: drie seconden voor de geslaagde VPN-aanmelding van k.dijkstra.' },
        { q: 'Hoeveel regels horen bij de sessie van k.dijkstra als je haar volgt via het externe én het interne adres?', answer: ['9', 'negen'],
          hints: ['De VPN-regel van 08:14:05 noemt beide adressen.', 'Filter met een regex die beide adressen toelaat, met een | ertussen. Escape de punten.', 'Probeer /203\\.0\\.113\\.45|192\\.0\\.2\\.131/'],
          wrong: { '5': 'Je filtert alleen op het interne adres 192.0.2.131. De firewall- en VPN-regels met het externe adres horen er ook bij.', '4': 'Je filtert alleen op het externe adres. Op de domeincontroller en de proxy verschijnt de sessie onder het interne adres.', '6': 'Je filtert op de naam. Op de firewall staat geen gebruikersnaam: daar vind je de sessie alleen via het adres.' },
          explain: 'Negen regels: twee firewallregels, de VPN-aanmelding en de afmelding, twee aanmeldingen op de domeincontroller en drie proxyregels, waaronder een upload naar files-deel.example.' },
        { q: 'Een ander extern adres probeerde in dezelfde periode in te loggen als k.dijkstra. Welk adres?', answer: ['198.51.100.200'],
          hints: ['Filter op het woord fail.', 'Beide mislukte pogingen komen van hetzelfde adres.', 'Hetzelfde adres werd eerder door de firewall op poort 445 tegengehouden.'],
          wrong: { '203.0.113.45': 'Dat is haar eigen, geslaagde sessie.', '198.51.100.77': 'Dat adres hoort bij de sessie van s.ozturk.' },
          explain: '198.51.100.200 probeerde twee keer in te loggen met haar account en was eerder al tegengehouden op poort 445. Twee bronnen, één adres: precies het soort verband dat je pas ziet als de velden genormaliseerd zijn.' },
        { q: 'In welke stap van de SIEM-keten zorg je ervoor dat kdijkstra, k.dijkstra@polderwater.nm.lab en POLDERWATER\\kdijkstra als één gebruiker worden herkend?', options: ['Verzamelen', 'Normaliseren', 'Correleren', 'Alarmeren'], answer: 1,
          wrong: { 0: 'Verzamelen brengt de logs binnen, maar laat elke bron zijn eigen schrijfwijze houden.', 2: 'Correleren koppelt gebeurtenissen, maar dat lukt pas als de velden al gelijkgetrokken zijn.', 3: 'Alarmeren komt aan het eind en leunt op de stappen ervoor.' },
          explain: 'Normaliseren zet verschillende schrijfwijzen om naar één veld, zoals gebruiker=kdijkstra. Correleren bouwt daarop voort.' },
      ],
    },

    {
      title: 'Taak 2: Zoekvragen schrijven en verfijnen',
      tryFirst: true,
      intro: '<p>Een collega vraagt: "Wie heeft vanochtend een uitvoerbaar bestand van internet gehaald?" In het lab staat het proxylog van 08:00 tot 08:35. Begin met het filter <code>exe</code> en verfijn tot je alleen echte downloads van .exe-bestanden overhoudt, en daarna alleen die van onbekende bronnen.</p>',
      content: `
        <p>Een <strong>zoekvraag</strong> (<em>query</em>) is een filter op je logs. Je begint breed, kijkt wat je
        terugkrijgt, en scherpt aan tot de uitkomst precies beschrijft wat je zoekt. Dat is geen teken van een slechte
        eerste poging; zo werkt elke analist.</p>

        <h3>Een eenvoudige notatie</h3>
        <p>Elk SIEM heeft een eigen zoektaal, maar ze lijken op elkaar: je kiest een bron, filtert op velden en
        bewerkt de uitkomst met een pijp (<code>|</code>). In deze room schrijven we het zo:</p>
        <pre><code>bron=proxy  url~/\\.exe$/  NIET domein IN lijst_updatebronnen
| tel per bron_ip
| sorteer aflopend</code></pre>
        <p>Lees het als: neem de proxylogs, houd regels over waarvan de URL eindigt op <code>.exe</code>, gooi bekende
        updatebronnen eruit, en tel per intern adres hoe vaak het voorkomt. In het lab doe je dezelfde stappen met
        het filterveld: tekst, of een reguliere expressie tussen schuine strepen.</p>

        <h3>Drie valkuilen bij verfijnen</h3>
        <ul>
          <li><strong>Te breed.</strong> Het filter <code>exe</code> raakt ook woorden waar die letters toevallig in
          zitten, zoals <em>executive</em> of een map die <em>executie</em> heet.</li>
          <li><strong>Te los.</strong> <code>.exe</code> zonder anker raakt ook <code>update.exe.sig</code>, een
          handtekeningbestand. Leg vast wat erna moet komen: in deze logs volgt na de URL een spatie, dus
          <code>/\\.exe /</code>. In een regex betekent een losse punt "elk teken"; met <code>\\.</code> bedoel je
          echt een punt.</li>
          <li><strong>Te smal.</strong> Wie alleen op <code>status 200</code> filtert, mist een download die met
          <code>304</code> (niet gewijzigd, uit de cache) werd bediend. Bedenk bij elke voorwaarde wat je erdoor mist.</li>
        </ul>

        <h3>Bekende bronnen eruit</h3>
        <p>Polderwater haalt software-updates bij twee leveranciers: <code>updates.kantoorsoft.example</code> en
        <code>dl.printdriver.example</code>. Downloads van die domeinen zijn verwacht. Een regex met een
        <em>negatieve lookahead</em> sluit ze uit: <code>/^(?!.*(kantoorsoft|printdriver)).*\\.exe /</code>.
        Je kunt ook eerst op <code>/\\.exe /</code> filteren en de bekende bronnen met het oog wegstrepen; bij twintig
        regels is dat prima, bij twintigduizend niet.</p>

        <div class="callout info">
          <strong>Let op dubbele extensies.</strong> Een bestand als <code>factuur_okt.pdf.exe</code> heet een PDF maar
          is een programma. Windows verbergt bekende extensies standaard, dus de gebruiker ziet vaak alleen
          <code>factuur_okt.pdf</code>.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'proxy.log Polderwater, 3 november 2026 (UTC)',
        lines: `2026-11-03T08:01:12Z 192.0.2.131 GET https://intranet.polderwater.nm.lab/ 200 18234
2026-11-03T08:02:40Z 192.0.2.140 GET https://updates.kantoorsoft.example/v24/kantoorsoft-update.exe 200 41203342
2026-11-03T08:03:05Z 192.0.2.152 GET https://nieuws.example/executive-summary-q3.pdf 200 803221
2026-11-03T08:04:19Z 192.0.2.131 GET https://mail.polderwater.nm.lab/owa/ 200 22110
2026-11-03T08:05:51Z 192.0.2.163 GET https://dl.printdriver.example/drivers/pd-installer.exe 200 9822110
2026-11-03T08:07:02Z 192.0.2.140 GET https://cdn.example/js/app.min.js 200 120334
2026-11-03T08:09:33Z 192.0.2.175 GET https://files-deel.example/s/8fk2/factuur_okt.pdf.exe 200 811520
2026-11-03T08:10:01Z 192.0.2.152 GET https://intranet.polderwater.nm.lab/executie/planning.xlsx 200 55102
2026-11-03T08:11:45Z 192.0.2.131 GET https://updates.kantoorsoft.example/v24/kantoorsoft-update.exe.sig 200 512
2026-11-03T08:12:10Z 192.0.2.188 GET https://zoek.example/?q=excel+export 200 3321
2026-11-03T08:13:27Z 192.0.2.163 GET https://intranet.polderwater.nm.lab/ 200 18234
2026-11-03T08:15:02Z 192.0.2.175 GET https://files-deel.example/s/8fk2/ 200 6620
2026-11-03T08:16:44Z 192.0.2.140 POST https://mail.polderwater.nm.lab/owa/send 200 2210
2026-11-03T08:18:09Z 192.0.2.199 GET https://tools-gratis.example/download/pdfconverter.exe 200 3354112
2026-11-03T08:19:55Z 192.0.2.131 GET https://nieuws.example/ 200 90211
2026-11-03T08:21:30Z 192.0.2.188 GET https://updates.kantoorsoft.example/v24/kantoorsoft-update.exe 304 0
2026-11-03T08:23:12Z 192.0.2.152 GET https://cdn.example/img/logo.png 200 12011
2026-11-03T08:24:48Z 192.0.2.175 GET https://203.0.113.80/a.exe 200 211456
2026-11-03T08:26:03Z 192.0.2.163 GET https://intranet.polderwater.nm.lab/handleidingen/vpn.pdf 200 330112
2026-11-03T08:27:40Z 192.0.2.199 GET https://nieuws.example/sport 200 77120
2026-11-03T08:29:15Z 192.0.2.140 GET https://cdn.example/js/app.min.js 304 0
2026-11-03T08:30:02Z 192.0.2.131 GET https://dl.printdriver.example/drivers/pd-installer.exe 200 9822110
2026-11-03T08:31:47Z 192.0.2.188 GET https://intranet.polderwater.nm.lab/ 200 18234
2026-11-03T08:33:20Z 192.0.2.175 GET https://mail.polderwater.nm.lab/owa/ 200 22110`,
      },
      questions: [
        { q: 'Hoeveel regels geeft het brede filter exe?', answer: ['10', 'tien'],
          hints: ['Typ alleen exe in het filterveld en lees de teller.', 'Het filter is hoofdletterongevoelig en zoekt overal in de regel.', 'Ook executive, executie en .exe.sig tellen mee.'],
          explain: 'Tien regels, waarvan drie geen download van een programma zijn: een PDF met executive in de naam, een map executie en een .sig-bestand.' },
        { q: 'Verfijn tot echte downloads van .exe-bestanden. Hoeveel regels houd je over?', answer: ['7', 'zeven'],
          hints: ['Na de URL volgt in deze logs een spatie.', 'Escape de punt en zet een spatie achter exe in een regex.', 'Probeer /\\.exe /'],
          wrong: { '8': 'Je telt de .exe.sig mee. Dat is een handtekeningbestand, geen programma.', '6': 'Je bent de download met status 304 kwijt. Ook die is een verzoek om een .exe, alleen uit de cache bediend.', '10': 'Dat is nog het brede filter. Leg vast wat er na exe moet komen.' },
          explain: 'Zeven: vier van de bekende updatebronnen (waarvan één met status 304) en drie van elders.' },
        { q: 'Hoeveel van die .exe-downloads komen niet van een van de twee bekende updatebronnen?', answer: ['3', 'drie'],
          hints: ['Streep alles weg met kantoorsoft of printdriver in de URL.', 'De lookahead uit de uitleg doet dat in één keer.', 'Een PDF met dubbele extensie, een gratis tool en een download van een kaal IP-adres.'],
          wrong: { '7': 'Je hebt de bekende updatebronnen nog niet uitgesloten.', '2': 'Ook een download vanaf een kaal IP-adres telt. Die heeft geen domeinnaam, maar staat zeker niet op de lijst.' },
          explain: 'Drie: factuur_okt.pdf.exe, pdfconverter.exe en a.exe vanaf 203.0.113.80.' },
        { q: 'Welk intern adres haalde zowel een bestand met een dubbele extensie als een .exe vanaf een kaal IP-adres binnen?', answer: ['192.0.2.175'],
          hints: ['Kijk naar het bronadres van de drie overgebleven regels.', 'Twee van de drie hebben hetzelfde bronadres.', 'Het adres dat ook files-deel.example bezocht.'],
          wrong: { '192.0.2.199': 'Die haalde pdfconverter.exe van een gratis-toolsite. Ongewenst, maar maar één download en geen dubbele extensie.', '203.0.113.80': 'Dat is de externe server waar a.exe vandaan kwam, niet het interne adres.' },
          why: 'Een gebruiker die een vermomd bestand opent en kort daarna een tweede programma van een kaal IP-adres krijgt, is het klassieke patroon van een eerste besmetting met een nageladen tweede fase. Dit adres komt in taak 5 en 6 terug.',
          explain: '192.0.2.175 opende om 08:09 factuur_okt.pdf.exe en haalde om 08:24 a.exe van 203.0.113.80.' },
      ],
    },

    {
      title: 'Taak 3: Correlatieregels',
      tryFirst: true,
      intro: '<p>Het SIEM van Polderwater heeft deze correlatieregel: <em>minstens 5 mislukte aanmeldingen voor hetzelfde account vanaf hetzelfde adres, binnen 10 minuten gevolgd door een geslaagde aanmelding van dat account vanaf dat adres.</em> Loop de tijdlijn van de nacht na en voorspel welk account de regel laat afgaan, en welk verdacht account hij mist.</p>',
      content: `
        <p>Eén mislukte aanmelding zegt niets. Mensen typen hun wachtwoord verkeerd. Pas een <em>combinatie</em> van
        gebeurtenissen vertelt een verhaal. Een <strong>correlatieregel</strong> beschrijft zo'n combinatie: welke
        gebeurtenissen, in welke volgorde, binnen welk tijdvenster en met welk gedeeld kenmerk.</p>

        <h3>De regel uit elkaar gehaald</h3>
        <pre><code>regel "Gok gevolgd door succes"
  A = aanmelding mislukt     (tel per account, bron_ip)
  B = aanmelding geslaagd
  als   aantal(A) &gt;= 5
  en    B volgt binnen 10 min na de laatste A
  en    A.account = B.account  en  A.bron_ip = B.bron_ip
  dan   alarm ernst=hoog  techniek=T1110 (Brute Force)</code></pre>
        <p>Vier onderdelen bepalen wat de regel ziet:</p>
        <ul>
          <li><strong>De drempel</strong> (5): lager vangt meer, maar ook meer vergissingen van gewone gebruikers.</li>
          <li><strong>Het venster</strong> (10 minuten): wie langzaam gokt, valt erbuiten. Daarom heet dat
          <em>low and slow</em>.</li>
          <li><strong>De sleutel</strong> waarop je koppelt (account en bron_ip). Elk extra gelijk-veld maakt de regel
          preciezer, maar ook makkelijker te ontwijken.</li>
          <li><strong>De volgorde</strong>: alleen mislukte pogingen zonder succes is ruis of een geblokkeerde
          aanval. Mislukt en daarna gelukt betekent dat iemand mogelijk binnen is.</li>
        </ul>

        <h3>Hoe aanvallers onder een regel door glippen</h3>
        <p>Aanvallers met een botnet of een pool van proxyadressen hoeven niet vanaf één adres te werken. Ze gokken
        vanaf het ene adres en loggen in vanaf een buuradres. Andersom kan password spraying (één wachtwoord op veel
        accounts) een regel die per account telt volledig ontlopen. Een goede analist leest een regel daarom ook als
        aanvaller: wat moet ik veranderen om hem niet te raken?</p>

        <div class="callout tip">
          <strong>Werken met de tijdlijn:</strong> filter op een accountnaam, zet daarna een van/tot-venster, en kijk
          naar de kolom met de tijd sinds de vorige gebeurtenis. Zo zie je in één oogopslag of iets binnen het venster
          valt.
        </div>
      `,
      lab: {
        type: 'timeline',
        title: 'Polderwater, nacht van 4 november 2026 (UTC)',
        events: [
          { t: '2026-11-04 00:52:10', src: 'VPN', host: 'vpn-gw01', user: 'j.bos', desc: 'aanmelding geslaagd vanaf 198.51.100.31' },
          { t: '2026-11-04 00:58:44', src: 'Proxy', host: '192.0.2.152', user: 'j.bos', desc: 'GET https://intranet.polderwater.nm.lab/ 200' },
          { t: '2026-11-04 01:02:05', src: 'VPN', host: 'vpn-gw01', user: 'svc-scan', desc: 'aanmelding mislukt vanaf 192.0.2.40' },
          { t: '2026-11-04 01:03:05', src: 'VPN', host: 'vpn-gw01', user: 'svc-scan', desc: 'aanmelding mislukt vanaf 192.0.2.40' },
          { t: '2026-11-04 01:04:05', src: 'VPN', host: 'vpn-gw01', user: 'svc-scan', desc: 'aanmelding mislukt vanaf 192.0.2.40' },
          { t: '2026-11-04 01:05:05', src: 'VPN', host: 'vpn-gw01', user: 'svc-scan', desc: 'aanmelding mislukt vanaf 192.0.2.40' },
          { t: '2026-11-04 01:06:05', src: 'VPN', host: 'vpn-gw01', user: 'svc-scan', desc: 'aanmelding mislukt vanaf 192.0.2.40' },
          { t: '2026-11-04 01:10:12', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding mislukt vanaf 203.0.113.61' },
          { t: '2026-11-04 01:10:49', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding mislukt vanaf 203.0.113.61' },
          { t: '2026-11-04 01:11:31', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding mislukt vanaf 203.0.113.61' },
          { t: '2026-11-04 01:12:02', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding mislukt vanaf 203.0.113.61' },
          { t: '2026-11-04 01:12:40', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding mislukt vanaf 203.0.113.61' },
          { t: '2026-11-04 01:13:15', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding mislukt vanaf 203.0.113.61' },
          { t: '2026-11-04 01:16:58', src: 'VPN', host: 'vpn-gw01', user: 'm.kok', desc: 'aanmelding geslaagd vanaf 203.0.113.61, toegewezen 192.0.2.150' },
          { t: '2026-11-04 01:19:30', src: 'Security', host: 'DC01', user: 'm.kok', desc: '4624 aanmelding type 3 vanaf 192.0.2.150' },
          { t: '2026-11-04 01:21:44', src: 'Firewall', host: 'fw01', desc: 'ALLOW 192.0.2.150 naar 192.0.2.10:445 (SMB)' },
          { t: '2026-11-04 01:22:03', src: 'Firewall', host: 'fw01', desc: 'ALLOW 192.0.2.150 naar 192.0.2.11:445 (SMB)' },
          { t: '2026-11-04 01:22:20', src: 'Firewall', host: 'fw01', desc: 'ALLOW 192.0.2.150 naar 192.0.2.12:445 (SMB)' },
          { t: '2026-11-04 01:40:02', src: 'VPN', host: 'vpn-gw01', user: 'j.bos', desc: 'aanmelding mislukt vanaf 198.51.100.31' },
          { t: '2026-11-04 01:40:19', src: 'VPN', host: 'vpn-gw01', user: 'j.bos', desc: 'aanmelding mislukt vanaf 198.51.100.31' },
          { t: '2026-11-04 01:40:41', src: 'VPN', host: 'vpn-gw01', user: 'j.bos', desc: 'aanmelding mislukt vanaf 198.51.100.31' },
          { t: '2026-11-04 01:41:20', src: 'VPN', host: 'vpn-gw01', user: 'j.bos', desc: 'aanmelding geslaagd vanaf 198.51.100.31' },
          { t: '2026-11-04 02:00:05', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:00:31', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:00:58', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:01:26', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:01:52', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:02:20', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:02:47', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:03:30', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding mislukt vanaf 198.51.100.23' },
          { t: '2026-11-04 02:06:44', src: 'VPN', host: 'vpn-gw01', user: 'a.smit', desc: 'aanmelding geslaagd vanaf 198.51.100.24, toegewezen 192.0.2.151' },
          { t: '2026-11-04 02:08:10', src: 'Proxy', host: '192.0.2.151', user: 'a.smit', desc: 'GET https://intranet.polderwater.nm.lab/hr/salarissen 200' },
          { t: '2026-11-04 02:30:00', src: 'Proxy', host: '192.0.2.152', user: 'j.bos', desc: 'GET https://intranet.polderwater.nm.lab/rooster 200' },
        ],
      },
      questions: [
        { q: 'Welk account laat de correlatieregel afgaan?', answer: ['m.kok', 'mkok'],
          hints: ['Zoek accounts met vijf of meer mislukte pogingen vanaf één adres.', 'Controleer daarna of er binnen tien minuten een geslaagde aanmelding vanaf hetzelfde adres volgt.', 'Drie accounts hebben een reeks mislukkingen; maar één voldoet aan alle voorwaarden.'],
          wrong: { 'a.smit': 'Verdacht, maar de geslaagde aanmelding komt van 198.51.100.24 en de mislukte van .23. De regel eist hetzelfde adres.', 'svc-scan': 'Vijf mislukkingen, maar geen geslaagde aanmelding. De regel eist dat er daarna een succes volgt.', 'j.bos': 'Drie mislukte pogingen en dan succes: een tikfout. De drempel is vijf.' },
          explain: 'm.kok: zes mislukte pogingen vanaf 203.0.113.61 en om 01:16:58 een geslaagde aanmelding vanaf hetzelfde adres.' },
        { q: 'Hoeveel minuten na de geslaagde VPN-aanmelding van m.kok zie je het eerste SMB-verkeer vanuit haar toegewezen adres? Rond af op hele minuten.', answer: ['5', 'vijf'],
          hints: ['Zoek het adres dat de VPN-gateway toewees.', 'Filter op dat adres of op 445.', 'Van 01:16:58 tot 01:21:44.'],
          wrong: { '3': 'Je rekent tot de aanmelding op de domeincontroller. Gevraagd is het eerste SMB-verkeer op poort 445.' },
          explain: 'Om 01:21:44, bijna vijf minuten na het succes, begint 192.0.2.150 achter elkaar drie servers op poort 445 te benaderen: verkenning of zijwaartse beweging.' },
        { q: 'Welke aanpassing laat de regel ook a.smit vangen, zonder dat j.bos of svc-scan een alarm geven?', options: ['Koppel alleen op account en niet ook op exact hetzelfde bronadres', 'Verlaag de drempel naar 3 mislukte pogingen', 'Laat de eis van een geslaagde aanmelding vallen', 'Verleng het venster naar 60 minuten'], answer: 0,
          wrong: { 1: 'Dan geeft j.bos met drie tikfouten ook een alarm, en a.smit valt er nog steeds buiten door het andere adres.', 2: 'Dan geeft svc-scan met vijf mislukkingen een alarm, en a.smit blijft gemist.', 3: 'Het venster is het probleem niet: a.smit logt binnen vier minuten in, maar vanaf een ander adres.' },
          why: 'Elke voorwaarde in een regel is ook een ontsnappingsroute. Het verschil tussen .23 en .24 kost een aanvaller niets; voor de regel is het een wereld van verschil.',
          explain: 'a.smit wordt gemist omdat de aanvaller van adres wisselde. Wie koppelt op account (of op hetzelfde /24-netwerk) vangt dit, zonder de drempel of de volgorde los te laten.' },
        { q: 'Waar ging a.smit om 02:08 als eerste naartoe? Geef het laatste deel van het pad.', answer: ['salarissen', '/hr/salarissen', 'hr/salarissen'],
          hints: ['Filter op a.smit en kijk na de geslaagde aanmelding.', 'De bron is de proxy.', 'Een HR-pagina.'],
          explain: 'Midden in de nacht, na acht mislukte pogingen, naar de salarispagina van HR. De regel zweeg, maar de tijdlijn vertelt genoeg voor een incident.' },
      ],
    },

    {
      title: 'Taak 4: Alarmmoeheid en regels afstemmen',
      tryFirst: true,
      intro: '<p>De regel "meer dan 10 mislukte aanmeldingen" geeft het SOC van Polderwater elke week tientallen alarmen. In het lab staan acht gebeurtenissen van één week. Bouw eerst de startregel <code>Mislukt &gt; 10</code> na en tel de vals-positieven. Stem hem daarna af tot je beide aanvallen vangt en geen enkel vals alarm overhoudt.</p>',
      content: `
        <p><strong>Alarmmoeheid</strong> (<em>alert fatigue</em>) ontstaat als analisten zoveel alarmen krijgen
        waarvan het merendeel onschuldig blijkt, dat ze ze niet meer serieus bekijken. Het gevaar is niet het werk
        zelf, maar dat het ene echte alarm tussen de ruis wordt weggeklikt.</p>

        <h3>De vier uitkomsten</h3>
        <table>
          <thead><tr><th></th><th>Echt kwaadaardig</th><th>Onschuldig</th></tr></thead>
          <tbody>
            <tr><td><strong>Alarm</strong></td><td>terecht-positief (TP)</td><td>vals-positief (FP)</td></tr>
            <tr><td><strong>Geen alarm</strong></td><td>vals-negatief (FN)</td><td>terecht-negatief (TN)</td></tr>
          </tbody>
        </table>
        <p>Twee maten helpen bij afstemmen:</p>
        <ul>
          <li><strong>Precisie</strong> = TP / (TP + FP): welk deel van de alarmen is terecht? Een regel met 4 alarmen
          waarvan 1 terecht heeft een precisie van 25%.</li>
          <li><strong>Dekking</strong> (<em>recall</em>) = TP / (TP + FN): welk deel van de aanvallen vang je?</li>
        </ul>
        <p>Afstemmen (<em>tuning</em>) betekent de precisie verhogen zonder dekking te verliezen.</p>

        <h3>Zo stem je af</h3>
        <ol>
          <li><strong>Lees de vals-positieven.</strong> Wat hebben ze gemeen dat de aanvallen niet hebben? Komen ze
          van binnen, van een bekend systeem, uit een vast proces?</li>
          <li><strong>Voeg context toe in plaats van alleen de drempel te verhogen.</strong> Een hogere drempel
          verlaagt ruis, maar ook dekking: een aanvaller gokt dan net een paar keer minder.</li>
          <li><strong>Los oorzaken op bij de bron.</strong> Een systeem dat elke nacht honderden keren met een
          verlopen wachtwoord inlogt, is een beheerprobleem. Repareer het account, in plaats van de regel er blind
          voor te maken.</li>
          <li><strong>Leg elke uitzondering vast</strong>: wie, waarom, tot wanneer. Een uitzondering zonder einddatum
          wordt een blinde vlek die aanvallers kunnen gebruiken.</li>
        </ol>

        <div class="callout warn">
          <strong>Let op:</strong> "uit" is ook een keuze. Een regel uitzetten omdat hij te veel lawaai maakt, haalt de
          ruis weg en de dekking ook. Meet eerst, stem dan af.
        </div>
        <p>In het lab combineer je voorwaarden met EN. Het lab toont live TP, FP, FN en TN, en laat een vlag zien
        zodra de regel perfect is.</p>
      `,
      lab: {
        type: 'detectrule',
        title: 'Week 45: alarmen van "veel mislukte aanmeldingen"',
        scenario: 'Acht gebeurtenissen uit één week. Twee zijn echte aanvallen: een brute-force-aanval op één account en password spraying op veel accounts. De rest is onschuldig.',
        fields: ['Account', 'Bronzone', 'Mislukt', 'Accounts_per_bron'],
        events: [
          { label: 'Brute force op administrator vanaf 203.0.113.77', malicious: true, fields: { Account: 'administrator', Bronzone: 'extern', Mislukt: 64, Accounts_per_bron: 1 } },
          { label: 'Password spraying vanaf 198.51.100.23', malicious: true, fields: { Account: '(38 verschillende)', Bronzone: 'extern', Mislukt: 41, Accounts_per_bron: 38 } },
          { label: 'Kwetsbaarheidsscanner met verlopen wachtwoord', malicious: false, fields: { Account: 'svc-scan', Bronzone: 'intern', Mislukt: 412, Accounts_per_bron: 1 } },
          { label: 'Caps Lock aan op maandagochtend', malicious: false, fields: { Account: 'j.bos', Bronzone: 'intern', Mislukt: 12, Accounts_per_bron: 1 } },
          { label: 'Back-uptaak met oud wachtwoord na wijziging', malicious: false, fields: { Account: 'svc-backup', Bronzone: 'intern', Mislukt: 22, Accounts_per_bron: 1 } },
          { label: 'Telefoon met oud wachtwoord na wachtwoordwijziging', malicious: false, fields: { Account: 'm.kok', Bronzone: 'extern', Mislukt: 14, Accounts_per_bron: 1 } },
          { label: 'Nieuwe medewerker, eerste dag thuiswerken', malicious: false, fields: { Account: 't.vermeer', Bronzone: 'extern', Mislukt: 11, Accounts_per_bron: 1 } },
          { label: 'Eén keer verkeerd getypt', malicious: false, fields: { Account: 'r.peters', Bronzone: 'intern', Mislukt: 3, Accounts_per_bron: 1 } },
        ],
        solution: [{ field: 'Bronzone', op: 'is', value: 'extern' }, { field: 'Mislukt', op: '>', value: '20' }],
        flag: 'NM{minder_ruis_zelfde_dekking}',
      },
      questions: [
        { q: 'Bouw de startregel Mislukt > 10. Hoeveel vals-positieven geeft hij?', answer: ['5', 'vijf'],
          hints: ['Kies het veld Mislukt, de operator > en de waarde 10.', 'Lees FP af onder de regel.', 'Zeven alarmen, waarvan twee terecht.'],
          wrong: { '7': 'Dat is het totale aantal alarmen. Trek de twee terechte eraf.', '6': 'r.peters met 3 mislukkingen valt niet onder de regel.' },
          explain: 'Vijf: svc-scan, j.bos, svc-backup, m.kok en t.vermeer. Van de zeven alarmen zijn er maar twee terecht.' },
        { q: 'Wat is de precisie van de startregel, in hele procenten?', answer: ['29', '29%', '28.6', '28,6'],
          hints: ['Precisie is TP gedeeld door alle alarmen.', '2 gedeeld door 7.', 'Ongeveer 0,286.'],
          wrong: { '40': 'Je deelt TP door FP (2/5). Deel door het totaal aantal alarmen: TP + FP.', '100': 'Dat is de dekking: beide aanvallen worden gevangen. Precisie gaat over het deel van de alarmen dat terecht is.' },
          why: 'Bij een precisie onder de 30% is de kans groot dat analisten dit alarm gaan negeren. Dan is de dekking van 100% op papier niets meer waard.',
          explain: '2 / 7 = 0,286, dus ongeveer 29%. Bijna drie op de vier alarmen zijn ruis.' },
        { q: 'Stem de regel af tot TP = 2 en FP = 0. Welke vlag verschijnt?', answer: ['NM{minder_ruis_zelfde_dekking}'],
          hints: ['Wat hebben beide aanvallen gemeen dat de meeste ruis niet heeft?', 'Voeg een voorwaarde toe op Bronzone. Er blijven dan nog twee onschuldige externe gebeurtenissen over.', 'Bronzone is extern EN Mislukt > 20.'],
          explain: 'Bronzone is extern EN Mislukt > 20 (alles tussen 14 en 41 werkt) vangt beide aanvallen zonder vals alarm.' },
        { q: 'Welk onschuldig account kun je beter bij de bron repareren dan met een uitzondering in de regel wegfilteren?', answer: ['svc-scan', 'svcscan'],
          hints: ['Zoek het account met verreweg de meeste mislukkingen.', 'Het probleem is een verlopen wachtwoord op een vast systeem.', 'Het account van de kwetsbaarheidsscanner.'],
          wrong: { 'j.bos': 'Een eenmalige tikfout van een mens. Daar valt niets structureel te repareren.', 'm.kok': 'Na een wachtwoordwijziging is dit vaak tijdelijk; het lost zich op als de telefoon het nieuwe wachtwoord krijgt.' },
          explain: 'svc-scan probeert met een verlopen wachtwoord in te loggen, 412 keer per week. Herstel het wachtwoord en het lawaai verdwijnt zonder dat de regel blind wordt voor dat account.' },
      ],
    },

    {
      title: 'Taak 5: Threat hunting met een hypothese',
      tryFirst: true,
      intro: '<p>Na taak 2 vermoed je dat werkplek WS-0231 (192.0.2.175) besmet is. Je hypothese: <em>"Als hier malware draait, maakt die met een vast ritme contact met een server van de aanvaller."</em> In het lab staat het uitgaande verkeer van WS-0231 over 24 uur. Toets je hypothese.</p>',
      content: `
        <p>Een SIEM wacht op alarmen. <strong>Threat hunting</strong> draait dat om: je gaat zelf zoeken naar een
        aanvaller die nog geen alarm heeft veroorzaakt. Niet door willekeurig te bladeren, maar met een
        <strong>hypothese</strong>: een toetsbare bewering over wat een aanvaller in jouw omgeving zou doen en welk
        spoor dat achterlaat.</p>

        <h3>De jachtlus</h3>
        <ol>
          <li><strong>Hypothese.</strong> Bijvoorbeeld: "Een besmette werkplek beacont via HTTPS naar een
          command-and-controlserver (MITRE ATT&amp;CK T1071.001, Web Protocols)." Bronnen voor hypothesen: threat
          intelligence, een recent incident, een techniek uit ATT&amp;CK waarvoor je nog geen detectie hebt.</li>
          <li><strong>Data.</strong> Welke logs laten dat spoor zien? Voor beaconing: netwerkstromen, proxy- of
          firewalllogs. Heb je die data niet, dan is dat al een bevinding.</li>
          <li><strong>Zoekvraag.</strong> Vertaal de hypothese naar een filter of een berekening: verbindingen met een
          vast interval en weinig variatie, naar een bestemming die weinig andere werkplekken bezoeken.</li>
          <li><strong>Bevinding.</strong> Bevestigd, weerlegd of onbeslist. Ook "niets gevonden" leg je vast, met de
          periode en de data die je hebt doorzocht.</li>
          <li><strong>Nieuwe detectie.</strong> Wat je met de hand vond, wil je de volgende keer automatisch zien.
          Een geslaagde jacht eindigt dus met een regel in het SIEM, of met een verbetering van de logging.</li>
        </ol>

        <h3>Beaconing herkennen</h3>
        <p>Malware die op instructies wacht, belt op vaste tijden naar huis. Twee kenmerken springen eruit: een
        <strong>regelmatig interval</strong> en een lage <strong>jitter</strong> (de spreiding rond dat interval,
        als percentage). Mensen surfen grillig; programma's tikken als een klok. Maar niet alles wat tikt is
        kwaadaardig: updatediensten en tijdsynchronisatie doen het ook. Vergelijk daarom met een
        <strong>baseline</strong>: wat is normaal voor deze werkplek en voor de rest van het netwerk?</p>
        <p>Polderwater houdt een lijst bij van bekende diensten die elke werkplek gebruikt: de antivirusupdates
        (<code>av-updates.example</code>), tijdsynchronisatie (<code>tijd.example</code>), videobellen
        (<code>vergaderen.example</code>) en het intranet.</p>

        <div class="callout info">
          <strong>Hunting is geen incidentrespons.</strong> Vind je tijdens een jacht een actieve aanvaller, dan stop
          je met jagen en schakel je over op het incidentproces. De jacht levert dan het startpunt van het onderzoek.
        </div>
      `,
      lab: {
        type: 'netflow',
        title: 'egress WS-0231 (192.0.2.175), 3 tot 4 november 2026',
        scenario: 'Alle uitgaande verbindingen van WS-0231 over 24 uur, gegroepeerd per bestemming.',
        flows: [
          { dst: '198.51.100.10', dstLabel: 'av-updates.example', port: 443, proto: 'tcp', conns: 24, intervalSec: 3600, jitterPct: 1, bytesOut: 48000, bytesIn: 9600000, note: 'antivirusupdates' },
          { dst: '198.51.100.44', dstLabel: 'vergaderen.example', port: 443, proto: 'tcp', conns: 640, jitterPct: 61, bytesOut: 380000000, bytesIn: 910000000, note: 'videobellen' },
          { dst: '203.0.113.80', dstLabel: 'cdn-statistiek.nm.lab', port: 443, proto: 'tcp', conns: 288, intervalSec: 300, jitterPct: 3, bytesOut: 410000, bytesIn: 290000 },
          { dst: '192.0.2.10', dstLabel: 'intranet.polderwater.nm.lab', port: 443, proto: 'tcp', conns: 190, jitterPct: 47, bytesOut: 2100000, bytesIn: 64000000 },
          { dst: '198.51.100.90', dstLabel: 'tijd.example', port: 123, proto: 'udp', conns: 24, intervalSec: 3600, jitterPct: 2, bytesOut: 2200, bytesIn: 2200, note: 'tijdsynchronisatie' },
          { dst: '198.51.100.120', dstLabel: 'nieuws.example', port: 443, proto: 'tcp', conns: 37, jitterPct: 72, bytesOut: 310000, bytesIn: 18000000 },
        ],
      },
      questions: [
        { q: 'Hoeveel bestemmingen hebben een zeer strak ritme (jitter van 8% of minder)?', answer: ['3', 'drie'],
          hints: ['Kijk in de kolom jitter.', 'Tel alles met een rode markering voor zeer strak.', 'Ook de bekende diensten tellen mee.'],
          wrong: { '1': 'Er zijn er meer. Ook de antivirusupdates en de tijdsynchronisatie tikken als een klok.' },
          explain: 'Drie: de antivirusupdates, de tijdsynchronisatie en cdn-statistiek.nm.lab. Een strak ritme alleen is dus geen bewijs.' },
        { q: 'Welke bestemming bevestigt je hypothese?', answer: ['cdn-statistiek.nm.lab', 'cdn-statistiek', '203.0.113.80'],
          hints: ['Streep de strakke bestemmingen weg die op de lijst van bekende diensten staan.', 'Er blijft één strakke bestemming over.', 'Hetzelfde adres als waar a.exe vandaan kwam in taak 2.'],
          wrong: { 'av-updates.example': 'Strak, maar een bekende dienst met veel inkomend verkeer: updates downloaden.', 'tijd.example': 'Strak, maar dit is tijdsynchronisatie op poort 123. Elke werkplek doet dit.' },
          why: 'Dezelfde server leverde in taak 2 het bestand a.exe. Twee onafhankelijke sporen naar één adres maken de hypothese veel sterker dan één spoor.',
          explain: 'cdn-statistiek.nm.lab (203.0.113.80): elke 300 seconden, jitter 3%, kleine hoeveelheden in beide richtingen, en niet op de lijst. Bovendien kwam a.exe van precies dit adres.' },
        { q: 'Met welk interval in minuten belt de malware naar huis?', answer: ['5', 'vijf'],
          hints: ['Het interval staat in seconden.', 'Deel door 60.', '300 / 60.'],
          explain: '300 seconden is vijf minuten. 288 verbindingen per dag past daar precies bij: 24 x 12.' },
        { q: 'Je hypothese is bevestigd. Wat is de volgende stap in de jachtlus?', options: ['Het incidentproces starten en van de bevinding een detectieregel maken die beaconing naar zeldzame bestemmingen signaleert', 'Het adres 203.0.113.80 blokkeren en de jacht als afgerond noteren', 'Wachten tot het SIEM er zelf een alarm over geeft', 'De hypothese aanscherpen tot "WS-0231 beacont naar 203.0.113.80" en opnieuw zoeken'], answer: 0,
          wrong: { 1: 'Blokkeren kan onderdeel zijn van de respons, maar dan is niemand bezig met de vraag wat er al gebeurd is, en de volgende keer zie je het weer niet.', 2: 'Juist omdat het SIEM niets zag, ging je jagen. Zonder nieuwe regel blijft het stil.', 3: 'Die bewering heb je net bevestigd. Opnieuw zoeken levert niets nieuws op.' },
          explain: 'Een actieve besmetting gaat naar het incidentproces. De jacht eindigt met een nieuwe detectie, zodat de volgende besmetting wel een alarm geeft.' },
      ],
    },

    {
      title: 'Taak 6: Jacht op een nieuw serviceaccount',
      tryFirst: true,
      intro: '<p>Tweede hypothese: <em>"Een aanvaller die op WS-0231 zit, maakt een account aan dat op een serviceaccount lijkt, om terug te kunnen komen."</em> In het lab staan de logs van domeincontroller DC01 en de goedgekeurde wijzigingen van die week. Zoek het account dat er niet hoort.</p>',
      content: `
        <p>Aanvallers willen blijven. Een eigen account is daarvoor een eenvoudige en stille manier (MITRE ATT&amp;CK
        T1136, Create Account). Om niet op te vallen kiezen ze een naam die past tussen de bestaande accounts:
        iets met <code>svc-</code>, <code>admin</code> of <code>backup</code>. Zo'n account krijgt vaak een
        wachtwoord dat nooit verloopt en wordt in een groep met veel rechten gezet.</p>

        <h3>De Windows-gebeurtenissen die je nodig hebt</h3>
        <table>
          <thead><tr><th>Event ID</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td>4720</td><td>Een gebruikersaccount is aangemaakt</td></tr>
            <tr><td>4738</td><td>Een gebruikersaccount is gewijzigd</td></tr>
            <tr><td>4728</td><td>Een lid is toegevoegd aan een beveiligingsgroep (globaal), zoals Domain Admins</td></tr>
            <tr><td>4624</td><td>Een account heeft zich aangemeld</td></tr>
          </tbody>
        </table>

        <h3>De zoekvraag</h3>
        <pre><code>bron=windows host=DC01 EventID IN (4720, 4728)
| koppel aan wijzigingen OP accountnaam
| toon waar wijziging ontbreekt</code></pre>
        <p>De kern is het <strong>koppelen aan een tweede bron</strong>: het wijzigingsbeheer. Een account aanmaken
        is niet verdacht; een account aanmaken zonder goedgekeurde wijziging wel. Daarna kijk je naar de context:
        wie maakte het aan, vanaf welke werkplek, op welk tijdstip, en wat gebeurde er direct daarna?</p>

        <div class="callout tip">
          <strong>Kijk naar de letters.</strong> Aanvallers kiezen namen die één letter verschillen van een bestaand
          account. Een snel oog leest wat het verwacht te zien. Zet de namen onder elkaar of filter op een deel van
          de naam, zodat je de verschillen echt ziet.
        </div>

        <h3>Van bevinding naar detectie</h3>
        <p>Bevestig je de hypothese, dan maak je er een regel van. Bijvoorbeeld: alarm bij elk 4728-event voor een
        groep met beheerrechten als er geen open wijziging voor die naam is, of als het gebeurt buiten kantoortijd.
        Daarmee wordt een eenmalige jacht een blijvende verbetering.</p>
      `,
      lab: {
        type: 'logs',
        title: 'DC01 Security + wijzigingsbeheer, 3 en 4 november 2026 (UTC)',
        lines: `WIJZIGING CHG-2026-311 goedgekeurd: account t.vermeer aanmaken (nieuwe medewerker Financiën), uitvoerder helpdesk-01
WIJZIGING CHG-2026-314 goedgekeurd: account svc-print2 aanmaken (nieuwe printserver), lid van Printbeheer, uitvoerder a.dekker-adm
2026-11-03 07:58:12Z DC01 4624 LogonType=3 TargetUserName=helpdesk-01 IpAddress=192.0.2.110 Werkstation=WS-0110
2026-11-03 08:01:40Z DC01 4720 Account aangemaakt: Nieuw=t.vermeer Door=helpdesk-01 Werkstation=WS-0110
2026-11-03 08:02:15Z DC01 4728 Lid toegevoegd: Groep=Financien-Medewerkers Lid=t.vermeer Door=helpdesk-01
2026-11-03 09:30:02Z DC01 4624 LogonType=3 TargetUserName=a.dekker-adm IpAddress=192.0.2.105 Werkstation=WS-0105
2026-11-03 09:34:51Z DC01 4720 Account aangemaakt: Nieuw=svc-print2 Door=a.dekker-adm Werkstation=WS-0105
2026-11-03 09:35:20Z DC01 4728 Lid toegevoegd: Groep=Printbeheer Lid=svc-print2 Door=a.dekker-adm
2026-11-03 13:12:44Z DC01 4624 LogonType=3 TargetUserName=helpdesk-02 IpAddress=192.0.2.112 Werkstation=WS-0112
2026-11-03 13:15:09Z DC01 4738 Account gewijzigd: Account=j.bos Wijziging=wachtwoord opnieuw ingesteld Door=helpdesk-02
2026-11-03 23:00:03Z DC01 4624 LogonType=5 TargetUserName=svc-backup IpAddress=192.0.2.30 Werkstation=BAK-01
2026-11-04 01:00:02Z DC01 4624 LogonType=5 TargetUserName=svc-print2 IpAddress=192.0.2.31 Werkstation=PRT-02
2026-11-04 02:47:10Z DC01 4624 LogonType=3 TargetUserName=helpdesk-02 IpAddress=192.0.2.175 Werkstation=WS-0231
2026-11-04 02:49:33Z DC01 4720 Account aangemaakt: Nieuw=svc-bckup Door=helpdesk-02 Werkstation=WS-0231
2026-11-04 02:50:05Z DC01 4738 Account gewijzigd: Account=svc-bckup Wijziging=wachtwoord verloopt nooit Door=helpdesk-02
2026-11-04 02:51:18Z DC01 4728 Lid toegevoegd: Groep=Domain Admins Lid=svc-bckup Door=helpdesk-02
2026-11-04 02:58:40Z DC01 4624 LogonType=3 TargetUserName=svc-bckup IpAddress=192.0.2.175 Werkstation=WS-0231
2026-11-04 23:00:04Z DC01 4624 LogonType=5 TargetUserName=svc-backup IpAddress=192.0.2.30 Werkstation=BAK-01`,
      },
      questions: [
        { q: 'Hoeveel accounts zijn er in deze twee dagen aangemaakt?', answer: ['3', 'drie'],
          hints: ['Welk Event ID hoort bij een nieuw account?', 'Filter op 4720.', 'Tel de regels.'],
          wrong: { '2': 'Dat is het aantal goedgekeurde wijzigingen. Tel de 4720-events zelf.', '4': 'Je telt ook de wijziging van j.bos (4738) mee. Dat is geen nieuw account.' },
          explain: 'Drie 4720-events: t.vermeer, svc-print2 en nog één, midden in de nacht.' },
        { q: 'Vanaf welke werkplek werd het nachtelijke account aangemaakt?', answer: ['WS-0231', 'ws0231', '192.0.2.175'],
          hints: ['Kijk naar het 4720-event buiten kantoortijd.', 'Het veld Werkstation staat in dezelfde regel.', 'Dezelfde werkplek als in taak 5.'],
          explain: 'WS-0231, met het account helpdesk-02. Dat account werkte de dag ervoor vanaf WS-0112; nu meldt het zich om 02:47 aan vanaf de besmette werkplek.' },
        { q: 'Welk account heeft de aanvaller aangemaakt?', answer: ['svc-bckup', 'svcbckup'], boss: true,
          hints: ['Vergelijk elk 4720-event met de lijst goedgekeurde wijzigingen bovenaan.', 'Eén nieuw account heeft geen wijziging, werd direct in Domain Admins gezet en kreeg een wachtwoord dat nooit verloopt.', 'Het lijkt op het bestaande back-upaccount, maar mist een letter.'],
          wrong: { 'svc-backup': 'Kijk letter voor letter. svc-backup is het bestaande account van de back-upserver BAK-01, dat elke nacht om 23:00 inlogt. De aanvaller koos een naam die er bijna hetzelfde uitziet.', 'svc-print2': 'Dat account is aangemaakt onder wijziging CHG-2026-314, overdag, door de juiste beheerder, en zit in Printbeheer.', 'helpdesk-02': 'Dat is het account waarmee de aanvaller werkte, niet het account dat hij aanmaakte.', 't.vermeer': 'Aangemaakt onder CHG-2026-311 voor een nieuwe medewerker.' },
          why: 'Een tweede beheeraccount met een wachtwoord dat nooit verloopt overleeft een reset van het gekaapte account. Wie alleen helpdesk-02 blokkeert, laat de achterdeur open.',
          explain: 'svc-bckup: aangemaakt om 02:49 vanaf WS-0231 zonder wijziging, wachtwoord verloopt nooit, lid van Domain Admins en negen minuten later al in gebruik. Je vond het door een zoekvraag op 4720 te koppelen aan een tweede bron (wijzigingsbeheer) en de namen nauwkeurig te vergelijken.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: waar je op jaagt en hoe volwassen je jacht is',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Niet elke detectie is even waardevol. David Bianco beschreef in 2013 de <strong>Pyramid of Pain</strong>:
        een rangorde van soorten indicatoren, naar hoeveel moeite het een aanvaller kost om ze te veranderen als jij
        erop detecteert.</p>
        <table>
          <thead><tr><th>Laag (van onder naar boven)</th><th>Moeite voor de aanvaller</th></tr></thead>
          <tbody>
            <tr><td>Hashwaarden</td><td>Triviaal: één byte veranderen geeft een nieuwe hash</td></tr>
            <tr><td>IP-adressen</td><td>Makkelijk: een nieuwe server huren</td></tr>
            <tr><td>Domeinnamen</td><td>Eenvoudig: een nieuw domein registreren</td></tr>
            <tr><td>Netwerk- en hostartefacten</td><td>Vervelend: patronen in verkeer of op het systeem</td></tr>
            <tr><td>Tools</td><td>Uitdagend: ander gereedschap zoeken of bouwen</td></tr>
            <tr><td>TTP's (tactieken, technieken, procedures)</td><td>Zwaar: een andere manier van werken</td></tr>
          </tbody>
        </table>
        <p>Een regel op het adres 203.0.113.80 werkt tot de aanvaller morgen een andere server neemt. Een regel op
        <em>gedrag</em>, zoals een strak ritme naar een bestemming die bijna niemand in je netwerk bezoekt, overleeft
        dat. Hunting richt zich daarom bij voorkeur op de bovenste lagen.</p>

        <h3>Stack counting: de lange staart</h3>
        <p>Een veelgebruikte jachttechniek is <strong>stack counting</strong> (ook <em>stacking</em>): tel hoe vaak
        elke waarde voorkomt over alle systemen heen en kijk naar de zeldzaamste. Een dienst die op 1.200 van de 1.200
        werkplekken draait is beleid; een dienst die op één werkplek draait is een vraag. In de notatie van deze room:</p>
        <pre><code>bron=windows EventID=7045
| tel per servicenaam, aantal_hosts
| sorteer oplopend op aantal_hosts</code></pre>
        <p>Event 7045 (Systeemlog) meldt dat er een nieuwe service is geïnstalleerd. Zeldzaam is niet hetzelfde als
        kwaadaardig, maar het is een goede plek om te beginnen.</p>

        <h3>Hoe volwassen is je jacht?</h3>
        <p>Het <strong>Hunting Maturity Model</strong> (ook van Bianco) kent vijf niveaus, van HMM0 tot HMM4. Op
        HMM0 vertrouwt een team volledig op automatische alarmen. Op HMM1 zoekt het met indicatoren uit threat
        intelligence. Op HMM2 volgt het jachtprocedures van anderen, op HMM3 maakt het eigen procedures, en op HMM4
        worden geslaagde jachten structureel omgezet in automatische detectie. Taak 5 en 6 lieten die laatste stap
        zien: van handwerk naar regel.</p>
        <p>Een praktische maat voor je regels is de precisie per week. Leg die vast; een regel waarvan de precisie
        wegzakt, vraagt om afstemming voordat de alarmmoeheid toeslaat.</p>
      `,
      questions: [
        { q: 'Een regel gaf vorige week 40 alarmen, waarvan 2 terecht. Wat was de precisie in procenten?', answer: ['5', '5%'],
          hints: ['Precisie is terecht gedeeld door alle alarmen.', '2 / 40.', '0,05.'],
          wrong: { '95': 'Dat is het aandeel vals-positieven. Precisie is het aandeel terechte alarmen.', '20': 'Je deelt 40 door 2. Andersom: 2 gedeeld door 40.' },
          explain: '2 / 40 = 0,05 = 5%. Negentien van de twintig alarmen waren ruis: tijd om af te stemmen.' },
        { q: 'Je jacht vond beaconing naar cdn-statistiek.nm.lab. Welke detectie houdt het langst stand als de aanvaller zijn infrastructuur vervangt?', options: ['Een regel op het adres 203.0.113.80', 'Een regel op de domeinnaam cdn-statistiek.nm.lab', 'Een regel op de hash van a.exe', 'Een regel op verbindingen met een strak interval naar een bestemming die bijna geen andere werkplek bezoekt'], answer: 3,
          wrong: { 0: 'Een IP-adres staat laag in de piramide. Een nieuwe server en de regel is blind.', 1: 'Een nieuw domein kost een aanvaller een paar euro en een paar minuten.', 2: 'De onderste laag: één byte anders en de hash klopt niet meer.' },
          explain: 'Gedrag staat hoog in de Pyramid of Pain. De aanvaller moet zijn manier van werken veranderen om deze regel te ontlopen.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examens voor SOC-analisten geven je een stukje log, een regel of een situatie en vragen wat je ziet of wat
        je nu doet. De afleiders zijn vaak handelingen die op zich goed zijn, maar op het verkeerde moment komen, of
        maten die op elkaar lijken (precisie en dekking). Lees elke vraag twee keer en reken mee.</p>
        <p>De vijf vragen zijn zelf geschreven in die stijl. Organisaties en adressen zijn fictief. In het lab staat
        een stukje log dat bij de eerste vraag hoort.</p>
      `,
      lab: {
        type: 'logs',
        title: 'vraag 1: firewall (lokale tijd) en VPN (UTC)',
        lines: `[fw]  2026-07-14T10:05:11+02:00 ALLOW src=203.0.113.9:50122 dst=192.0.2.10:443
[vpn] 2026-07-14 08:05:13Z auth=ok user=p.janssen client=203.0.113.9
[vpn] 2026-07-14 09:05:40Z auth=ok user=l.meijer client=198.51.100.5
[fw]  2026-07-14T11:05:38+02:00 ALLOW src=198.51.100.5:41002 dst=192.0.2.10:443`,
      },
      questions: [
        { q: 'Een analist ziet in het lab de firewallregel van 10:05:11 en zoekt de VPN-aanmelding die erbij hoort. Welke is het?',
          options: ['De aanmelding van p.janssen om 08:05:13 UTC', 'De aanmelding van l.meijer om 09:05:40 UTC', 'Geen van beide: de tijden liggen te ver uit elkaar', 'Beide, want ze vallen in hetzelfde uur'], answer: 0,
          wrong: { 1: 'Je hebt er één uur af gehaald. In juli geldt zomertijd: +02:00, dus twee uur eraf. Bovendien klopt het adres niet.', 2: 'Na omrekening naar UTC liggen de firewallregel en de aanmelding van p.janssen twee seconden uit elkaar.', 3: 'Een sessie koppel je op tijd én op een gedeeld kenmerk. Alleen het adres 203.0.113.9 komt in beide regels voor.' },
          explain: '10:05:11+02:00 is 08:05:11 UTC; twee seconden later meldt p.janssen zich aan vanaf hetzelfde adres.' },
        { q: 'Een regel geeft 50 alarmen per dag, waarvan 1 terecht. Het team stelt voor de regel uit te zetten. Wat is het beste advies?',
          options: ['Uitzetten, want een precisie van 2% helpt niemand', 'De drempel zo ver verhogen dat er nog maar 5 alarmen per dag overblijven', 'De vals-positieven analyseren, terugkerende onschuldige oorzaken bij de bron oplossen of met vastgelegde uitzonderingen uitsluiten, en de dekking opnieuw meten', 'Alle alarmen van deze regel automatisch sluiten en alleen de wekelijkse samenvatting lezen'], answer: 2,
          wrong: { 0: 'Dan verdwijnt het ene terechte alarm ook. Je ruilt ruis in voor een blinde vlek.', 1: 'Een hogere drempel zonder analyse verlaagt willekeurig de dekking: misschien zit de aanval juist onder de nieuwe drempel.', 3: 'Dat is uitzetten met extra stappen. Een terecht alarm wordt dan pas dagen later gezien.' },
          explain: 'Afstemmen is de precisie verhogen zonder dekking te verliezen. Daarvoor moet je eerst weten waar de ruis vandaan komt.' },
        { q: 'Een threat hunter wil weten of aanvallers in het netwerk WMI gebruiken voor zijwaartse beweging. Wat is de beste eerste stap?',
          options: ['Alle werkplekken laten scannen met de virusscanner', 'Een toetsbare hypothese formuleren en nagaan welke logs het spoor van WMI-gebruik op afstand zouden bevatten', 'Een regel schrijven die elk WMI-gebruik blokkeert', 'Wachten op een threat intelligence-rapport over WMI-misbruik'], answer: 1,
          wrong: { 0: 'Een virusscanner zoekt bekende bestanden. Misbruik van een ingebouwd beheerhulpmiddel laat vaak geen kwaadaardig bestand achter.', 2: 'Beheerders gebruiken WMI legitiem. Blokkeren zonder te weten wat normaal is, legt beheerwerk plat.', 3: 'Hunting is proactief. Je hoeft niet te wachten tot iemand anders het heeft gezien.' },
          explain: 'De jachtlus begint met een hypothese en de vraag welke data hem kan toetsen. Ontbreekt die data, dan is dat de eerste bevinding.' },
        { q: 'Een correlatieregel alarmeert bij 10 of meer mislukte aanmeldingen op één account binnen 5 minuten. Welke aanval ontloopt deze regel het makkelijkst?',
          options: ['Brute force met 500 pogingen per minuut op het beheerdersaccount', 'Password spraying: één veelgebruikt wachtwoord op 300 accounts, één poging per account', 'Een aanvaller die na 12 mislukte pogingen het goede wachtwoord raadt', 'Een gebruiker die zijn wachtwoord vergeten is en het 15 keer probeert'], answer: 1,
          wrong: { 0: 'Die valt er ruim boven. Dit is precies wat de regel vangt.', 2: 'Twaalf pogingen binnen vijf minuten op één account raakt de regel.', 3: 'Dat is geen aanval, en de regel zou er juist een vals-positief op geven.' },
          explain: 'De regel telt per account. Spraying spreidt de pogingen over veel accounts, zodat geen enkel account de drempel haalt. Tel daarom ook per bronadres over accounts heen.' },
        { q: 'Tijdens een jacht vindt een analist een werkplek die elke 60 seconden een kleine HTTPS-verbinding maakt met een domein dat drie dagen oud is. Wat doet hij nu?',
          options: ['De jacht afronden, het rapport schrijven en volgende week verder kijken', 'Zelf de werkplek opnieuw installeren zodat de besmetting weg is', 'Overschakelen naar het incidentproces, de bevinding met tijden en bronnen vastleggen, en daarna zorgen dat dit patroon een detectieregel krijgt', 'Het domein blokkeren en verder niets doen, want dan is het probleem opgelost'], answer: 2,
          wrong: { 0: 'Een mogelijk actieve aanvaller wacht niet een week. Dit is het moment om op te schalen.', 1: 'Dan vernietig je sporen die nodig zijn om te zien wat de aanvaller al deed, en het is niet aan de hunter om dat eigenhandig te besluiten.', 3: 'Blokkeren alleen laat open wat er al gebeurd is en of er meer werkplekken besmet zijn.' },
          explain: 'Een bevestigde, actieve dreiging gaat naar incidentrespons. De jacht levert de gegevens; de lus sluit met een nieuwe detectie.' },
      ],
    },
  ],

  terms: [
    { term: 'SIEM', def: 'Security Information and Event Management: systeem dat logs uit de hele organisatie verzamelt, normaliseert, correleert en daarop alarmeert.' },
    { term: 'Normaliseren', def: 'Logs met verschillende veldnamen, schrijfwijzen en tijdzones omzetten naar vaste velden en één tijdzone, zodat je ze kunt vergelijken.' },
    { term: 'Correlatieregel', def: 'Regel die meerdere gebeurtenissen, eventueel uit verschillende bronnen, binnen een tijdvenster en op een gedeeld kenmerk aan elkaar koppelt.' },
    { term: 'Vals-positief', def: 'Een alarm voor iets dat onschuldig blijkt te zijn.' },
    { term: 'Precisie', def: 'Het deel van de alarmen dat terecht is: TP / (TP + FP).' },
    { term: 'Alarmmoeheid', def: 'Toestand waarin analisten door te veel onterechte alarmen echte alarmen gaan negeren of wegklikken.' },
    { term: 'Threat hunting', def: 'Proactief en hypothesegedreven zoeken naar aanvallers die nog geen alarm hebben veroorzaakt.' },
    { term: 'Beaconing', def: 'Malware die met een regelmatig interval contact zoekt met een command-and-controlserver.' },
    { term: 'Baseline', def: 'Beschrijving van wat normaal is voor een systeem of netwerk, als vergelijkingspunt voor afwijkingen.' },
    { term: 'Stack counting', def: 'Jachttechniek: tel hoe vaak elke waarde voorkomt over alle systemen en onderzoek de zeldzaamste.' },
  ],

  resources: [
    { title: 'NIST SP 800-92: Guide to Computer Security Log Management (2006)', url: 'https://csrc.nist.gov/pubs/sp/800/92/final' },
    { title: 'MITRE ATT&CK: T1071.001 Application Layer Protocol: Web Protocols', url: 'https://attack.mitre.org/techniques/T1071/001/' },
    { title: 'MITRE ATT&CK: T1136 Create Account', url: 'https://attack.mitre.org/techniques/T1136/' },
  ],
});
