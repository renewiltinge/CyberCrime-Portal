/* Room: Netwerken — de basis */

// Taak 4: een korte capture met een geslaagde handshake, een geweigerde poort en een poort die zwijgt.
const NWB_PCAP_TCP = [
  { no: 1, time: '0.000', src: '192.0.2.10', dst: '192.0.2.53', proto: 'DNS', len: 74, info: 'Standard query A www.nm.lab' },
  { no: 2, time: '0.021', src: '192.0.2.53', dst: '192.0.2.10', proto: 'DNS', len: 90, info: 'Standard query response A 198.51.100.20' },
  { no: 3, time: '0.024', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TCP', len: 74, info: '51514 → 443 [SYN] Seq=0' },
  { no: 4, time: '0.047', src: '198.51.100.20', dst: '192.0.2.10', proto: 'TCP', len: 74, info: '443 → 51514 [SYN, ACK] Seq=0 Ack=1' },
  { no: 5, time: '0.048', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TCP', len: 66, info: '51514 → 443 [ACK] Seq=1 Ack=1' },
  { no: 6, time: '0.050', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TLSv1.3', len: 583, info: 'Client Hello (SNI=www.nm.lab)' },
  { no: 7, time: '0.074', src: '198.51.100.20', dst: '192.0.2.10', proto: 'TLSv1.3', len: 1514, info: 'Server Hello, Change Cipher Spec, Application Data' },
  { no: 8, time: '0.079', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TLSv1.3', len: 146, info: 'Change Cipher Spec, Application Data' },
  { no: 9, time: '0.081', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TLSv1.3', len: 215, info: 'Application Data' },
  { no: 10, time: '0.110', src: '198.51.100.20', dst: '192.0.2.10', proto: 'TLSv1.3', len: 1203, info: 'Application Data' },
  { no: 11, time: '1.502', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TCP', len: 66, info: '51514 → 443 [FIN, ACK]' },
  { no: 12, time: '1.524', src: '198.51.100.20', dst: '192.0.2.10', proto: 'TCP', len: 66, info: '443 → 51514 [FIN, ACK]' },
  { no: 13, time: '1.525', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TCP', len: 66, info: '51514 → 443 [ACK]' },
  { no: 14, time: '2.300', src: '192.0.2.10', dst: '198.51.100.20', proto: 'TCP', len: 74, info: '51520 → 23 [SYN] Seq=0' },
  { no: 15, time: '2.322', src: '198.51.100.20', dst: '192.0.2.10', proto: 'TCP', len: 60, info: '23 → 51520 [RST, ACK]' },
  { no: 16, time: '3.100', src: '192.0.2.10', dst: '198.51.100.30', proto: 'TCP', len: 74, info: '51526 → 3389 [SYN] Seq=0' },
  { no: 17, time: '4.101', src: '192.0.2.10', dst: '198.51.100.30', proto: 'TCP', len: 74, info: '[TCP Retransmission] 51526 → 3389 [SYN] Seq=0' },
  { no: 18, time: '6.103', src: '192.0.2.10', dst: '198.51.100.30', proto: 'TCP', len: 74, info: '[TCP Retransmission] 51526 → 3389 [SYN] Seq=0' },
  { no: 19, time: '6.900', src: '192.0.2.10', dst: '192.0.2.53', proto: 'DNS', len: 72, info: 'Standard query A tijd.nm.lab' },
  { no: 20, time: '6.918', src: '192.0.2.53', dst: '192.0.2.10', proto: 'DNS', len: 88, info: 'Standard query response A 198.51.100.40' },
  { no: 21, time: '6.920', src: '192.0.2.10', dst: '198.51.100.40', proto: 'NTP', len: 90, info: 'NTP Version 4, client' },
  { no: 22, time: '6.944', src: '198.51.100.40', dst: '192.0.2.10', proto: 'NTP', len: 90, info: 'NTP Version 4, server' },
];

// Taak 5: firewalllog van een fictief kantoor. Normaal verkeer, plus één bron die poorten afloopt.
const NWB_FWLOG = `2026-11-10 14:01:58 ALLOW TCP 198.51.100.7:50122 -> 192.0.2.20:443
2026-11-10 14:02:03 ALLOW TCP 198.51.100.91:61804 -> 192.0.2.20:443
2026-11-10 14:02:09 ALLOW TCP 203.0.113.12:44310 -> 192.0.2.21:25
2026-11-10 14:02:15 ALLOW TCP 198.51.100.7:50130 -> 192.0.2.20:80
2026-11-10 14:02:31 ALLOW UDP 198.51.100.44:39120 -> 192.0.2.53:53
2026-11-10 14:03:02 DENY  TCP 203.0.113.50:40001 -> 192.0.2.25:21
2026-11-10 14:03:02 DENY  TCP 203.0.113.50:40002 -> 192.0.2.25:22
2026-11-10 14:03:02 DENY  TCP 203.0.113.50:40003 -> 192.0.2.25:23
2026-11-10 14:03:03 DENY  TCP 203.0.113.50:40004 -> 192.0.2.25:25
2026-11-10 14:03:03 DENY  TCP 203.0.113.50:40005 -> 192.0.2.25:80
2026-11-10 14:03:03 ALLOW TCP 198.51.100.91:61811 -> 192.0.2.20:443
2026-11-10 14:03:04 DENY  TCP 203.0.113.50:40006 -> 192.0.2.25:110
2026-11-10 14:03:04 DENY  TCP 203.0.113.50:40007 -> 192.0.2.25:445
2026-11-10 14:03:04 DENY  TCP 203.0.113.50:40008 -> 192.0.2.25:3306
2026-11-10 14:03:05 ALLOW TCP 203.0.113.50:40009 -> 192.0.2.25:3389
2026-11-10 14:03:40 ALLOW TCP 203.0.113.12:44318 -> 192.0.2.21:25
2026-11-10 14:04:12 ALLOW UDP 198.51.100.44:39155 -> 192.0.2.53:53
2026-11-10 14:05:27 ALLOW TCP 198.51.100.130:52270 -> 192.0.2.20:443
2026-11-10 14:06:10 ALLOW TCP 203.0.113.50:40112 -> 192.0.2.25:3389
2026-11-10 14:06:44 ALLOW TCP 203.0.113.50:40118 -> 192.0.2.25:3389
2026-11-10 14:07:02 DENY  TCP 198.51.100.200:33900 -> 192.0.2.20:8080
2026-11-10 14:07:19 ALLOW TCP 203.0.113.50:40131 -> 192.0.2.25:3389
2026-11-10 14:08:05 ALLOW TCP 198.51.100.7:50177 -> 192.0.2.20:443
2026-11-10 14:09:48 ALLOW TCP 203.0.113.12:44325 -> 192.0.2.21:25`;

// Taak 6: een apparaat komt op het netwerk (DHCP), zoekt de gateway (ARP), en later meldt zich een tweede "gateway".
const NWB_PCAP_LAN = [
  { no: 1, time: '0.000', src: '0.0.0.0', dst: '255.255.255.255', proto: 'DHCP', len: 342, info: 'DHCP Discover - Transaction ID 0x3d1e' },
  { no: 2, time: '0.310', src: '192.0.2.1', dst: '255.255.255.255', proto: 'DHCP', len: 342, info: 'DHCP Offer - 192.0.2.57 - Transaction ID 0x3d1e' },
  { no: 3, time: '0.312', src: '0.0.0.0', dst: '255.255.255.255', proto: 'DHCP', len: 342, info: 'DHCP Request - 192.0.2.57 - Transaction ID 0x3d1e' },
  { no: 4, time: '0.330', src: '192.0.2.1', dst: '255.255.255.255', proto: 'DHCP', len: 342, info: 'DHCP ACK - 192.0.2.57, lease 86400 s, router 192.0.2.1, DNS 192.0.2.53' },
  { no: 5, time: '1.002', src: '52:54:00:a3:1f:6b', dst: 'ff:ff:ff:ff:ff:ff', proto: 'ARP', len: 42, info: 'Who has 192.0.2.1? Tell 192.0.2.57' },
  { no: 6, time: '1.003', src: 'aa:bb:cc:11:22:33', dst: '52:54:00:a3:1f:6b', proto: 'ARP', len: 60, info: '192.0.2.1 is at aa:bb:cc:11:22:33' },
  { no: 7, time: '1.010', src: '192.0.2.57', dst: '192.0.2.1', proto: 'ICMP', len: 98, info: 'Echo (ping) request' },
  { no: 8, time: '1.011', src: '192.0.2.1', dst: '192.0.2.57', proto: 'ICMP', len: 98, info: 'Echo (ping) reply' },
  { no: 9, time: '2.400', src: '192.0.2.57', dst: '192.0.2.53', proto: 'DNS', len: 74, info: 'Standard query A intranet.nm.lab' },
  { no: 10, time: '2.419', src: '192.0.2.53', dst: '192.0.2.57', proto: 'DNS', len: 90, info: 'Standard query response A 192.0.2.80' },
  { no: 11, time: '2.421', src: '52:54:00:a3:1f:6b', dst: 'ff:ff:ff:ff:ff:ff', proto: 'ARP', len: 42, info: 'Who has 192.0.2.80? Tell 192.0.2.57' },
  { no: 12, time: '2.422', src: 'de:ad:be:ef:00:3c', dst: '52:54:00:a3:1f:6b', proto: 'ARP', len: 60, info: '192.0.2.80 is at de:ad:be:ef:00:3c' },
  { no: 13, time: '31.500', src: 'de:ad:be:ef:00:99', dst: '52:54:00:a3:1f:6b', proto: 'ARP', len: 60, info: '192.0.2.1 is at de:ad:be:ef:00:99' },
  { no: 14, time: '33.500', src: 'de:ad:be:ef:00:99', dst: '52:54:00:a3:1f:6b', proto: 'ARP', len: 60, info: '192.0.2.1 is at de:ad:be:ef:00:99' },
  { no: 15, time: '35.500', src: 'de:ad:be:ef:00:99', dst: '52:54:00:a3:1f:6b', proto: 'ARP', len: 60, info: '192.0.2.1 is at de:ad:be:ef:00:99' },
  { no: 16, time: '36.020', src: '192.0.2.57', dst: '192.0.2.53', proto: 'DNS', len: 74, info: 'Standard query A www.nm.lab' },
];

CS.registerRoom({
  id: 'netwerken-basis',
  path: 'fundamenten',
  order: 2,
  title: 'Netwerken: de basis',
  icon: '🌐',
  difficulty: 'Makkelijk',
  minutes: 100,
  level: 'Instap',
  checked: '2026-11-12',
  summary: 'Hoe apparaten met elkaar praten: LAN en WAN, MAC- en IP-adressen, het OSI- en TCP/IP-model, TCP vs UDP, poorten, en protocollen als DHCP, ARP en NAT.',
  objectives: [
    'Uitleggen wat een netwerk is en het verschil tussen LAN, WAN en internet',
    'Het verschil tussen een MAC-adres en een IP-adres (IPv4 en IPv6) beschrijven',
    'De zeven lagen van het OSI-model benoemen en koppelen aan het TCP/IP-model',
    'Het verschil tussen TCP en UDP en de three-way handshake uitleggen',
    'Veelgebruikte poorten herkennen en de rol van DHCP, ARP en NAT beschrijven',
    'Netwerkcommando\'s lezen en informatie uit de uitvoer halen',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is een netwerk?',
      content: `
        <p>Een <strong>netwerk</strong> is niets anders dan twee of meer apparaten die met elkaar kunnen praten om
        gegevens uit te wisselen. Je telefoon die muziek streamt, je laptop die een bestand naar de printer stuurt, een
        server die een webpagina terugstuurt: allemaal netwerkverkeer. Je kunt een netwerk vergelijken met het
        wegennet: apparaten zijn adressen, kabels en wifi zijn de wegen, en de regels van het verkeer heten protocollen.</p>

        <p>Netwerken verschillen in grootte:</p>
        <ul>
          <li><strong>LAN (Local Area Network)</strong>: een netwerk op één locatie, bijvoorbeeld bij jou thuis of op
            kantoor. Snel, en volledig onder eigen beheer.</li>
          <li><strong>WAN (Wide Area Network)</strong>: een netwerk over grote afstanden dat meerdere locaties verbindt.
            Het <strong>internet</strong> is het grootste WAN ter wereld: een netwerk van miljoenen netwerken die met
            elkaar verbonden zijn.</li>
        </ul>

        <p>De belangrijkste apparaten die een netwerk opbouwen:</p>
        <ul>
          <li><strong>Switch</strong>: verbindt apparaten <em>binnen</em> hetzelfde netwerk (LAN) en stuurt verkeer
            gericht naar het juiste apparaat op basis van MAC-adressen.</li>
          <li><strong>Router</strong>: verbindt <em>verschillende</em> netwerken met elkaar, bijvoorbeeld je
            thuisnetwerk met het internet. Een router kiest de route tussen netwerken op basis van IP-adressen.</li>
          <li><strong>Access point (AP)</strong>: zet een bedraad netwerk om naar draadloos (wifi), zodat apparaten
            zonder kabel kunnen verbinden.</li>
          <li><strong>Firewall</strong>: een poortwachter die verkeer toestaat of blokkeert op basis van regels. De
            eerste en belangrijkste beveiligingslaag van een netwerk.</li>
        </ul>

        <p>Bij jou thuis zitten switch, router, access point en firewall vaak in één kastje (het "modem" van je
        provider). In een bedrijf zijn dit meestal aparte, krachtigere apparaten. Het mooie is: de principes blijven
        hetzelfde, of je nu één thuisnetwerk hebt of een datacenter beheert.</p>

        <div class="callout tip">
          <p><strong>Onthoud het verschil:</strong> een <em>switch</em> werkt binnen één netwerk (met MAC-adressen),
          een <em>router</em> werkt tussen netwerken (met IP-adressen). Die twee haal je straks nooit meer door elkaar.</p>
        </div>
      `,
      questions: [
        {
          q: 'Welk apparaat verbindt twee verschillende netwerken met elkaar, bijvoorbeeld je thuisnetwerk met het internet?',
          options: ['Switch', 'Router', 'Access point'],
          answer: 1,
          explain: 'Een router verbindt verschillende netwerken en kiest de route op basis van IP-adressen.',
        },
        {
          q: 'Ik begrijp het verschil tussen een LAN (lokaal netwerk) en een WAN zoals het internet.',
          noAnswer: true,
        },
      ],
    },

    {
      title: 'Taak 2 — MAC- en IP-adressen (IPv4 en IPv6)',
      tryFirst: true,
      intro: `<p>In een rauw netwerkpakket staat het bronadres niet als nette punten-notatie, maar als vier bytes in hex: <code>C6 33 64 4D</code>. Zet in het lab elke byte om naar een decimaal getal (typ bijvoorbeeld <code>0xC6</code>) en schrijf het IPv4-adres op. Bekijk daarna hoe het laatste getal er binair uitziet.</p>`,
      lab: { type: 'numconv', value: '0xC6' },
      content: `
        <p>Om een pakketje bij het juiste apparaat te krijgen, heb je adressen nodig. Er zijn er twee soorten, en ze
        doen iets anders.</p>

        <p>Een <strong>MAC-adres</strong> (Media Access Control) is het <em>fysieke</em> adres dat de fabrikant in de
        netwerkkaart heeft "ingebakken". Het verandert normaal niet en is uniek per netwerkkaart. Het bestaat uit 48
        bits, meestal geschreven als zes paren hexadecimale tekens, bijvoorbeeld <code>52:54:00:a3:1f:6b</code>. De
        eerste helft verraadt vaak de fabrikant. MAC-adressen worden gebruikt <em>binnen</em> één netwerk (door de
        switch).</p>

        <p>Een <strong>IP-adres</strong> (Internet Protocol) is het <em>logische</em> adres dat een apparaat krijgt
        <em>in</em> een netwerk. Het kan veranderen: thuis krijg je er meestal eentje van je router. IP-adressen
        worden gebruikt om verkeer <em>tussen</em> netwerken te routeren. Vergelijk: je MAC-adres is als het
        serienummer van je huis dat nooit verandert; je IP-adres is als je straatnaam en huisnummer, die anders zijn
        als je verhuist.</p>

        <p>Er bestaan twee versies van IP:</p>
        <ul>
          <li><strong>IPv4</strong>: <strong>32 bits</strong>, geschreven als vier getallen van 0&ndash;255 (octetten),
            bijvoorbeeld <code>192.168.1.42</code>. Dat geeft ongeveer 4,3 miljard adressen &mdash; te weinig voor alle
            apparaten ter wereld, vandaar trucs als NAT (zie verderop).</li>
          <li><strong>IPv6</strong>: <strong>128 bits</strong>, geschreven als acht groepen hexadecimale tekens,
            bijvoorbeeld <code>2001:0db8:0000:0000:0000:ff00:0042:8329</code>. Dat zijn astronomisch veel adressen, meer
            dan genoeg voor elk apparaat. IPv6-notatie kun je verkorten; dat leer je in de subnetting-room.</li>
        </ul>

        <table>
          <thead>
            <tr><th></th><th>MAC-adres</th><th>IP-adres</th></tr>
          </thead>
          <tbody>
            <tr><td>Type</td><td>Fysiek (hardware)</td><td>Logisch (software)</td></tr>
            <tr><td>Verandert?</td><td>Nee (vast)</td><td>Ja (kan wisselen)</td></tr>
            <tr><td>Werkt</td><td>Binnen één netwerk (switch)</td><td>Tussen netwerken (router)</td></tr>
            <tr><td>Grootte</td><td>48 bits</td><td>32 bits (IPv4) / 128 bits (IPv6)</td></tr>
          </tbody>
        </table>
      `,
      questions: [
        {
          q: 'Uit hoeveel bits bestaat een IPv4-adres?',
          answer: ['32', '32 bits'],
          hint: 'Vier octetten van 8 bits.',
          explain: 'Een IPv4-adres is 32 bits (vier octetten van 8 bits). IPv6 is 128 bits.',
        },
        {
          q: 'Welk adres is vast in de netwerkkaart "ingebakken" en verandert normaal gesproken niet?',
          options: ['Het IP-adres', 'Het MAC-adres', 'De poort'],
          answer: 1,
          explain: 'Het MAC-adres is het fysieke, vaste adres van de netwerkkaart.',
        },
        {
          q: 'Welk IPv4-adres hoort bij de vier hex-bytes C6 33 64 4D?',
          answer: ['198.51.100.77'],
          hints: ['Elke byte is één van de vier getallen van het adres.', 'Typ in het lab 0xC6, daarna 0x33, 0x64 en 0x4D, en lees telkens de regel "Decimaal".', 'Het adres begint met 198.51 en eindigt op 77.'],
          wrong: { 'c6.33.64.4d': 'Je hebt de bytes alleen met punten gescheiden. Reken elke byte om naar decimaal.', '/^0x/': 'Gevraagd is de gewone notatie met vier decimale getallen en punten.', '3325256781': 'Dat zijn de vier bytes als één groot getal. Reken ze per byte om.' },
          why: 'In hex-dumps, logregels en pakketten staan adressen vaak als losse bytes. Wie dit niet vlot omrekent, ziet een adres over het hoofd.',
          explain: 'C6 = 198, 33 = 51, 64 = 100, 4D = 77. Vier bytes van 8 bits: samen de 32 bits van een IPv4-adres.',
        },
        {
          q: 'Schrijf het laatste getal van dat adres (77) binair, als acht bits.',
          answer: ['01001101', '0b01001101', '1001101', '0b1001101'],
          hints: ['Een octet is altijd acht bits, ook als het getal klein is.', 'Typ 77 in het lab en lees de regel "Binair".', 'Het lab toont zeven cijfers; zet er vooraan een nul bij om op acht te komen.'],
          wrong: { '4d': 'Dat is de hex-schrijfwijze. Gevraagd is binair: alleen enen en nullen.', '77': 'Dat is decimaal. Gevraagd is binair.' },
          explain: '77 = 64 + 8 + 4 + 1, dus 01001101. Die voorloopnul doet ertoe zodra je met subnetmaskers gaat rekenen.',
        },
      ],
    },

    {
      title: 'Taak 3 — Het OSI-model, het TCP/IP-model en encapsulatie',
      tryFirst: true,
      intro: `<p>Zestien kaartjes: protocollen, adressen, apparaten en namen voor een brok data. Ze horen bij vier lagen van het OSI-model. Maak vier groepen van vier. Lukt het niet meteen, kijk dan in het schema in de uitleg.</p>`,
      lab: { type: 'connections', prompt: 'Vier lagen: applicatie (7), transport (4), netwerk (3) en datalink (2).', flag: 'NM{elke_laag_zijn_taak}',
        groups: [
          { name: 'Laag 7 · Applicatie', items: ['HTTP', 'DNS', 'SMTP', 'IMAP'] },
          { name: 'Laag 4 · Transport', items: ['TCP', 'UDP', 'Poortnummer', 'Segment'] },
          { name: 'Laag 3 · Netwerk', items: ['IP-adres', 'Router', 'ICMP', 'Pakket'] },
          { name: 'Laag 2 · Datalink', items: ['MAC-adres', 'Switch', 'Ethernet', 'Frame'] },
        ] },
      content: `
        <p>Netwerken zijn ingewikkeld, dus we delen ze op in lagen. Elke laag doet één ding en praat alleen met de laag
        erboven en eronder. Het bekendste model is het <strong>OSI-model</strong> met zeven lagen.</p>

        <figure class="diagram">
          <svg viewBox="0 0 560 300" role="img" aria-label="De zeven lagen van het OSI-model">
            <rect x="12" y="12" width="250" height="34" rx="4" fill="var(--surface-2)" stroke="currentColor" />
            <text x="24" y="33" fill="currentColor" font-size="13">7 · Applicatie</text>
            <text x="280" y="33" fill="currentColor" font-size="13">HTTP, DNS, SMTP</text>
            <rect x="12" y="50" width="250" height="34" rx="4" fill="var(--surface-2)" stroke="currentColor" />
            <text x="24" y="71" fill="currentColor" font-size="13">6 · Presentatie</text>
            <text x="280" y="71" fill="currentColor" font-size="13">TLS, JPEG, ASCII</text>
            <rect x="12" y="88" width="250" height="34" rx="4" fill="var(--surface-2)" stroke="currentColor" />
            <text x="24" y="109" fill="currentColor" font-size="13">5 · Sessie</text>
            <text x="280" y="109" fill="currentColor" font-size="13">sessies op- en afbouwen</text>
            <rect x="12" y="126" width="250" height="34" rx="4" fill="var(--accent-soft)" stroke="currentColor" />
            <text x="24" y="147" fill="currentColor" font-size="13">4 · Transport</text>
            <text x="280" y="147" fill="currentColor" font-size="13">TCP, UDP — segment</text>
            <rect x="12" y="164" width="250" height="34" rx="4" fill="var(--accent-soft)" stroke="currentColor" />
            <text x="24" y="185" fill="currentColor" font-size="13">3 · Netwerk</text>
            <text x="280" y="185" fill="currentColor" font-size="13">IP, ICMP — pakket (router)</text>
            <rect x="12" y="202" width="250" height="34" rx="4" fill="var(--surface-2)" stroke="currentColor" />
            <text x="24" y="223" fill="currentColor" font-size="13">2 · Datalink</text>
            <text x="280" y="223" fill="currentColor" font-size="13">Ethernet, MAC — frame (switch)</text>
            <rect x="12" y="240" width="250" height="34" rx="4" fill="var(--surface-2)" stroke="currentColor" />
            <text x="24" y="261" fill="currentColor" font-size="13">1 · Fysiek</text>
            <text x="280" y="261" fill="currentColor" font-size="13">kabel, radio — bits</text>
          </svg>
          <figcaption>Het OSI-model van boven (7) naar beneden (1), met per laag een voorbeeld.</figcaption>
        </figure>

        <p>Van onder naar boven:</p>
        <ol>
          <li><strong>Fysieke laag</strong>: de kabels, de wifi-signalen, de enen en nullen (bits). Voorbeeld: een
            UTP-kabel.</li>
          <li><strong>Datalinklaag</strong>: verkeer binnen één netwerk met MAC-adressen. Voorbeeld: Ethernet, de switch.</li>
          <li><strong>Netwerklaag</strong>: routeren tussen netwerken met IP-adressen. Voorbeeld: IP, de router.</li>
          <li><strong>Transportlaag</strong>: betrouwbaar of snel leveren met poorten. Voorbeeld: TCP en UDP.</li>
          <li><strong>Sessielaag</strong>: een gesprek (sessie) op- en afbouwen en beheren.</li>
          <li><strong>Presentatielaag</strong>: vertalen, versleutelen en comprimeren. Voorbeeld: TLS, JPEG.</li>
          <li><strong>Applicatielaag</strong>: wat de gebruiker ziet en gebruikt. Voorbeeld: HTTP, DNS, e-mail.</li>
        </ol>

        <div class="callout tip">
          <p><strong>Ezelsbruggetje (laag 1 &rarr; 7):</strong> "Please Do Not Throw Sausage Pizza Away" &mdash;
          Physical, Data link, Network, Transport, Session, Presentation, Application. Een Nederlandse variant:
          "Fijne Dieren Nemen Toch Soms Prachtige Avonturen" (Fysiek, Datalink, Netwerk, Transport, Sessie,
          Presentatie, Applicatie).</p>
        </div>

        <p>In de praktijk gebruiken we vaak het eenvoudigere <strong>TCP/IP-model</strong> met vier lagen: Applicatie
        (OSI 5&ndash;7), Transport (OSI 4), Internet (OSI 3) en Netwerktoegang (OSI 1&ndash;2). Het OSI-model is ideaal
        om over te praten en te leren; TCP/IP beschrijft hoe het internet echt werkt.</p>

        <p>Als je data verstuurt, voegt elke laag zijn eigen informatie toe. Dat heet <strong>encapsulatie</strong>: het
        verpakt de data laag voor laag, zoals een brief in een envelop in een postzak in een vrachtwagen. De data
        krijgt onderweg andere namen:</p>
        <ul>
          <li>Op de <strong>transportlaag</strong> heet het een <strong>segment</strong> (TCP) of datagram (UDP).</li>
          <li>Op de <strong>netwerklaag</strong> heet het een <strong>pakket</strong> (packet).</li>
          <li>Op de <strong>datalinklaag</strong> heet het een <strong>frame</strong>.</li>
          <li>Op de <strong>fysieke laag</strong> zijn het gewoon <strong>bits</strong>.</li>
        </ul>
      `,
      questions: [
        {
          q: 'Op welke laag van het OSI-model werkt een router? Geef het laagnummer.',
          answer: ['3', 'laag 3', 'netwerklaag'],
          hint: 'De router werkt met IP-adressen.',
          explain: 'Een router werkt op de netwerklaag (laag 3), waar met IP-adressen wordt gerouteerd.',
        },
        {
          q: 'Welke vlag krijg je als de vier lagen kloppen?',
          answer: ['NM{elke_laag_zijn_taak}'],
          hints: ['Begin met de vier protocollen die een gebruiker direct merkt: web, namen en mail.', 'Elke laag heeft een eigen adres of nummer en een eigen naam voor de data: frame, pakket, segment.', 'Het MAC-adres, de switch, Ethernet en het frame horen bij elkaar op laag 2.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag die het lab toont. Hij verschijnt pas als alle vier de groepen kloppen; neem hem letterlijk over.' },
          explain: 'Laag 2 werkt met MAC-adressen en frames (de switch), laag 3 met IP-adressen en pakketten (de router), laag 4 met poorten en segmenten, laag 7 met de protocollen die toepassingen spreken.',
        },
      ],
    },

    {
      title: 'Taak 4 — TCP en UDP en de three-way handshake',
      tryFirst: true,
      intro: `<p>In het lab staat een capture van een paar seconden verkeer van één werkplek (192.0.2.10). Die werkplek doet drie pogingen om een TCP-verbinding op te zetten: één lukt, één wordt geweigerd en één krijgt nooit antwoord. Zoek uit welke welke is. Klik een pakket aan voor de details.</p>`,
      lab: { type: 'pcap', title: 'werkplek-10.pcap', packets: NWB_PCAP_TCP },
      content: `
        <p>Op de transportlaag kies je hoe je data verstuurt. Er zijn twee hoofdrolspelers: TCP en UDP.</p>

        <p><strong>TCP (Transmission Control Protocol)</strong> is <em>verbindingsgericht</em> en betrouwbaar. Voordat
        er data gaat, bouwen zender en ontvanger eerst een verbinding op. TCP controleert of alles aankomt, in de
        juiste volgorde, en vraagt opnieuw om wat verloren ging. Je gebruikt TCP waar het moet kloppen: webpagina\'s
        (HTTP/HTTPS), e-mail, bestandsoverdracht, SSH.</p>

        <p><strong>UDP (User Datagram Protocol)</strong> is <em>verbindingsloos</em>: het schiet de pakketjes gewoon weg,
        zonder handshake en zonder garantie dat ze aankomen. Daardoor is het sneller en lichter. Je gebruikt UDP waar
        snelheid belangrijker is dan een enkel verloren pakketje: videobellen, livestreams, online games, en DNS.</p>

        <table>
          <thead><tr><th></th><th>TCP</th><th>UDP</th></tr></thead>
          <tbody>
            <tr><td>Verbinding</td><td>Ja (handshake vooraf)</td><td>Nee (verbindingsloos)</td></tr>
            <tr><td>Betrouwbaar?</td><td>Ja, met bevestiging</td><td>Nee, geen garantie</td></tr>
            <tr><td>Snelheid</td><td>Iets trager (meer overhead)</td><td>Snel, weinig overhead</td></tr>
            <tr><td>Gebruik</td><td>Web, e-mail, SSH, bestanden</td><td>DNS, streaming, games, VoIP</td></tr>
          </tbody>
        </table>

        <p>TCP bouwt een verbinding op met de beroemde <strong>three-way handshake</strong> (driewegsgroet):</p>

        <figure class="diagram">
          <svg viewBox="0 0 460 250" role="img" aria-label="TCP three-way handshake">
            <defs>
              <marker id="hsArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" />
              </marker>
            </defs>
            <text x="100" y="26" text-anchor="middle" fill="currentColor" font-size="13">Client</text>
            <text x="360" y="26" text-anchor="middle" fill="currentColor" font-size="13">Server</text>
            <line x1="100" y1="36" x2="100" y2="220" stroke="currentColor" stroke-dasharray="4 4" />
            <line x1="360" y1="36" x2="360" y2="220" stroke="currentColor" stroke-dasharray="4 4" />
            <line x1="100" y1="70" x2="356" y2="100" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hsArrow)" />
            <text x="230" y="78" text-anchor="middle" fill="currentColor" font-size="13">1. SYN</text>
            <line x1="360" y1="130" x2="104" y2="160" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hsArrow)" />
            <text x="230" y="138" text-anchor="middle" fill="currentColor" font-size="13">2. SYN-ACK</text>
            <line x1="100" y1="190" x2="356" y2="210" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hsArrow)" />
            <text x="230" y="198" text-anchor="middle" fill="currentColor" font-size="13">3. ACK</text>
          </svg>
          <figcaption>De verbinding staat na stap 3; daarna kan de echte data stromen.</figcaption>
        </figure>

        <ol>
          <li><strong>SYN</strong>: de client vraagt een verbinding aan ("mag ik met je praten?").</li>
          <li><strong>SYN-ACK</strong>: de server bevestigt en vraagt zelf ook ("ja, en jij met mij?").</li>
          <li><strong>ACK</strong>: de client bevestigt. De verbinding staat (established).</li>
        </ol>

        <p>Afsluiten gaat netjes met <strong>FIN</strong>-berichten (elke kant zegt "ik ben klaar" met een FIN, de
        ander bevestigt met ACK). Gaat er iets mis of weigert een poort de verbinding abrupt, dan zie je een
        <strong>RST</strong> (reset): de verbinding wordt hard dichtgegooid.</p>
      `,
      questions: [
        {
          q: 'Welk protocol is verbindingsloos en stuurt data zonder handshake vooraf?',
          options: ['TCP', 'UDP'],
          answer: 1,
          explain: 'UDP is verbindingsloos: het verstuurt zonder handshake en zonder garantie, maar wel snel.',
        },
        {
          q: 'Na welk pakket (nummer) staat de TCP-verbinding met de webserver op poort 443?',
          answer: ['5'],
          hints: ['Een verbinding staat pas als alle drie de stappen van de handshake zijn geweest.', 'Filter op 51514 en zoek de pakketten met SYN, dan SYN en ACK, dan ACK.', 'Het is het pakket vlak voor de Client Hello.'],
          wrong: { '3': 'Pakket 3 is de SYN: de client vraagt een verbinding aan. De server heeft nog niet geantwoord.', '4': 'Pakket 4 is het antwoord van de server (SYN, ACK). De client moet dat nog bevestigen.', '6': 'Pakket 6 is al data (de Client Hello van TLS). De verbinding stond één pakket eerder.' },
          why: 'Wie de drie stappen herkent, ziet in een capture meteen welke verbindingen echt tot stand kwamen en welke alleen zijn geprobeerd. Een poortscan bestaat vooral uit SYN-pakketten zonder vervolg.',
          explain: 'Pakket 3 (SYN), 4 (SYN, ACK) en 5 (ACK). Daarna pas gaat er data over de lijn.',
        },
        {
          q: 'Op welke poort weigert de server 198.51.100.20 de verbinding direct?',
          answer: ['23', 'poort 23'],
          hints: ['Een weigering is een antwoord. Zoek een antwoord dat geen SYN, ACK is.', 'Filter op RST.', 'Het is de poort van een verouderd, onversleuteld protocol om op afstand in te loggen.'],
          wrong: { '3389': 'Op 3389 komt helemaal geen antwoord. Zwijgen is iets anders dan weigeren: daar gooit waarschijnlijk een firewall de pakketten weg.', '443': 'Op 443 slaagt de handshake juist.', '51520': 'Dat is de tijdelijke poort van de client. Gevraagd is de poort op de server.' },
          explain: 'Op de SYN naar poort 23 volgt meteen RST, ACK: de machine is bereikbaar, maar er luistert niets op die poort.',
        },
        {
          q: 'Hoeveel SYN-pakketten naar poort 3389 blijven onbeantwoord?',
          answer: ['3'],
          hints: ['Als er geen antwoord komt, probeert TCP het opnieuw.', 'Filter op 3389 en tel de regels.', 'Eén eerste poging en twee herhalingen.'],
          wrong: { '1': 'Er is één eerste poging, maar de twee herhalingen (Retransmission) zijn ook SYN-pakketten zonder antwoord.', '2': 'Tel de eerste poging mee.' },
          explain: 'Eén SYN en twee herhalingen, met steeds langere tussenpozen. Geen RST en geen SYN, ACK: de pakketten verdwijnen onderweg.',
        },
        {
          q: 'Hoeveel pakketten in deze capture reizen over UDP in plaats van TCP?',
          answer: ['6', 'zes'],
          hints: ['De kolom Protocol noemt de toepassing. Je moet zelf weten welk transport eronder ligt.', 'DNS-vragen als deze en NTP gaan over UDP; TLS gaat over TCP.', 'Tel de regels met DNS en NTP.'],
          wrong: { '4': 'Dat zijn de DNS-pakketten. De twee NTP-pakketten gaan ook over UDP.', '0': 'UDP staat niet als woord in de kolom, maar DNS en NTP gebruiken het wel.', '16': 'Dat zijn de pakketten die bij TCP horen. Gevraagd is de rest.' },
          explain: 'Vier DNS-pakketten en twee NTP-pakketten. Geen handshake, geen afsluiting: vraag en antwoord, klaar.',
        },
      ],
    },

    {
      title: 'Taak 5 — Poorten en veelgebruikte poortnummers',
      tryFirst: true,
      intro: `<p>Dit is een stuk uit het firewalllog van een fictief kantoor. Elke regel: tijd, besluit (ALLOW of DENY), protocol, bron met poort, bestemming met poort. Tussen het gewone verkeer zit één bron die een hele reeks poorten afloopt op dezelfde server. Zoek die bron, en zoek uit wat de firewall daarbij doorlaat.</p>`,
      lab: { type: 'logs', title: 'firewall.log (rand van het kantoornetwerk)', lines: NWB_FWLOG },
      content: `
        <p>Een IP-adres brengt je bij het juiste apparaat, maar op dat apparaat draaien vaak meerdere diensten tegelijk:
        een webserver, een mailserver, een database. Hoe weet een pakketje bij welke dienst het moet zijn? Via een
        <strong>poort</strong> (port). Een poort is een nummer tussen 0 en 65535. Vergelijk: het IP-adres is het
        gebouw, de poort is het kamernummer.</p>

        <p>Diensten luisteren op vaste, afgesproken poorten. Die onder de 1024 heten <em>well-known ports</em>. Deze
        moet je uit je hoofd leren, want je komt ze overal tegen &mdash; ook bij een poortscan tijdens een pentest:</p>

        <table>
          <thead><tr><th>Poort</th><th>Protocol</th><th>Waarvoor</th></tr></thead>
          <tbody>
            <tr><td>21</td><td>FTP</td><td>Bestandsoverdracht (onversleuteld)</td></tr>
            <tr><td>22</td><td>SSH</td><td>Veilig op afstand inloggen / bestanden (SCP, SFTP)</td></tr>
            <tr><td>23</td><td>Telnet</td><td>Op afstand inloggen (onversleuteld, verouderd)</td></tr>
            <tr><td>25</td><td>SMTP</td><td>E-mail versturen</td></tr>
            <tr><td>53</td><td>DNS</td><td>Namen naar IP-adressen vertalen (UDP en TCP)</td></tr>
            <tr><td>80</td><td>HTTP</td><td>Webverkeer (onversleuteld)</td></tr>
            <tr><td>110</td><td>POP3</td><td>E-mail ophalen (oudere manier)</td></tr>
            <tr><td>143</td><td>IMAP</td><td>E-mail ophalen (met mappen op de server)</td></tr>
            <tr><td>443</td><td>HTTPS</td><td>Webverkeer, versleuteld met TLS</td></tr>
            <tr><td>445</td><td>SMB</td><td>Windows-bestandsdeling</td></tr>
            <tr><td>3389</td><td>RDP</td><td>Windows Remote Desktop</td></tr>
            <tr><td>3306</td><td>MySQL</td><td>MySQL-database</td></tr>
          </tbody>
        </table>

        <div class="callout info">
          <p><strong>Beveiligingstip:</strong> onversleutelde protocollen zoals Telnet (23), FTP (21) en HTTP (80)
          sturen wachtwoorden en data leesbaar over het netwerk. Gebruik hun veilige broertjes: SSH (22) in plaats van
          Telnet, SFTP in plaats van FTP, en HTTPS (443) in plaats van HTTP. Poorten als 445 (SMB) en 3389 (RDP) wil je
          nooit zomaar open naar het internet hebben staan; die worden volop aangevallen.</p>
        </div>

        <p>Een dienst "luistert" op een poort (hij staat open en wacht op verbindingen). Een <em>poortscan</em>
        (bijvoorbeeld met Nmap) kijkt welke poorten openstaan en verraadt zo welke diensten er draaien. Dat is vaak de
        eerste stap van een aanvaller &mdash; en dus ook van een verdediger die wil weten wat er blootstaat.</p>
      `,
      questions: [
        {
          q: 'Vanaf welk IP-adres komt de poortscan?',
          answer: ['203.0.113.50'],
          hints: ['Een scan herken je aan één bron die in korte tijd veel verschillende poorten op dezelfde bestemming probeert.', 'Filter op DENY en kijk welke bron steeds terugkomt.', 'Het adres begint met 203.0.113 en is niet de mailserver die poort 25 gebruikt.'],
          wrong: { '192.0.2.25': 'Dat is de server die gescand wordt, de bestemming. Gevraagd is de bron.', '203.0.113.12': 'Dat adres levert alleen mail af op poort 25 van de mailserver: gewoon verkeer.', '198.51.100.200': 'Die bron probeert één keer poort 8080. Eén geweigerde poging is nog geen scan.' },
          explain: '203.0.113.50 probeert binnen drie seconden negen poorten op 192.0.2.25. De bronpoorten lopen netjes op: een script.',
        },
        {
          q: 'Welke dienst op 192.0.2.25 laat de firewall door voor de scanner? Geef de gangbare afkorting van het protocol.',
          answer: ['RDP', 'remote desktop', 'remote desktop protocol'],
          hints: ['Zoek de regels van de scanner met ALLOW in plaats van DENY.', 'Filter met /ALLOW.*203\\.0\\.113\\.50/ en lees de bestemmingspoort.', 'Zoek die poort op in de poortentabel in de uitleg: het is toegang op afstand tot een Windows-bureaublad.'],
          wrong: { '3389': 'Dat is de poort. Gevraagd is het protocol dat daar standaard op luistert.', 'smb': 'SMB is poort 445; die wordt hier tegengehouden.', 'mysql': 'MySQL is 3306; die wordt hier tegengehouden.', 'ssh': 'SSH is poort 22; die wordt hier tegengehouden.' },
          why: 'Een open RDP-poort naar internet is een van de meest gebruikte ingangen bij ransomware. In een log van honderden regels is dit de ene regel die ertoe doet.',
          explain: 'Poort 3389 staat open naar internet: RDP. Na de scan komt dezelfde bron er nog drie keer op terug.',
        },
        {
          q: 'Hoeveel verschillende poorten probeert de scanner op 192.0.2.25?',
          answer: ['9', 'negen'],
          hints: ['Tel bestemmingspoorten, geen regels.', 'Filter op 203.0.113.50 en noteer elke poort achter 192.0.2.25 één keer.', 'Acht poorten worden geweigerd en één wordt doorgelaten.'],
          wrong: { '12': 'Dat is het aantal regels van deze bron. Poort 3389 komt vier keer voor, maar telt als één poort.', '8': 'Dat zijn de geweigerde poorten. De doorgelaten poort hoort er ook bij.' },
          explain: '21, 22, 23, 25, 80, 110, 445, 3306 en 3389: de bekende poorten uit de tabel.',
        },
      ],
    },

    {
      title: 'Taak 6 — DHCP, ARP en NAT',
      tryFirst: true,
      intro: `<p>Een laptop wordt aangesloten op een netwerk. In de capture zie je wat er dan gebeurt: hij vraagt een adres, zoekt de router en gaat aan het werk. Een halve minuut later gebeurt er iets wat niet klopt. Volg de pakketten van boven naar beneden en beantwoord de vragen.</p>`,
      lab: { type: 'pcap', title: 'nieuw-apparaat.pcap', packets: NWB_PCAP_LAN },
      content: `
        <p>Drie protocollen die onzichtbaar hun werk doen, maar die je thuisnetwerk laten functioneren. Je komt ze
        gegarandeerd tegen.</p>

        <h3>DHCP: automatisch een IP-adres krijgen</h3>
        <p>Als je een apparaat op een netwerk aansluit, krijgt het meestal vanzelf een IP-adres. Dat regelt
        <strong>DHCP (Dynamic Host Configuration Protocol)</strong>. Het verloopt in vier stappen, te onthouden als
        <strong>DORA</strong>:</p>
        <ol>
          <li><strong>Discover</strong>: de client roept over het netwerk "is hier een DHCP-server?"</li>
          <li><strong>Offer</strong>: een server biedt een vrij IP-adres aan.</li>
          <li><strong>Request</strong>: de client zegt "dat adres wil ik graag".</li>
          <li><strong>Acknowledge</strong>: de server bevestigt en geeft het adres (met looptijd, de lease).</li>
        </ol>
        <p>DHCP gebruikt UDP: de server luistert op poort 67, de client op poort 68.</p>

        <h3>ARP: van IP-adres naar MAC-adres</h3>
        <p>Binnen een netwerk praten apparaten met MAC-adressen, maar je kent vaak alleen het IP-adres. <strong>ARP
        (Address Resolution Protocol)</strong> overbrugt dat. Wil je naar <code>192.168.1.1</code>, dan stuurt je
        apparaat een ARP-verzoek rond: "wie heeft 192.168.1.1?" Het apparaat met dat IP-adres antwoordt met zijn
        MAC-adres. Dat koppelt het logische adres (IP) aan het fysieke adres (MAC). Let op: ARP is van zichzelf
        onbeveiligd, waardoor <em>ARP-spoofing</em> (je voordoen als een ander) een bekende aanval is.</p>

        <h3>NAT: veel apparaten, één publiek adres</h3>
        <p>Er zijn te weinig IPv4-adressen voor alle apparaten. De oplossing is <strong>NAT (Network Address
        Translation)</strong>. Je router geeft elk apparaat een privé-IP-adres (zoals <code>192.168.1.x</code>) en
        vertaalt dat naar één gedeeld publiek adres zodra verkeer naar het internet gaat. De router onthoudt welk
        intern apparaat bij welke verbinding hoort, zodat antwoorden bij de juiste terugkomen. Zo delen al je apparaten
        thuis één publiek IP-adres. NAT geeft ook een beetje afscherming: van buitenaf zie je de interne apparaten niet
        direct.</p>

        <div class="callout tip">
          <p><strong>Snelle samenvatting:</strong> DHCP <em>geeft</em> je een IP-adres, ARP <em>vertaalt</em> een
          IP-adres naar een MAC-adres, en NAT <em>verbergt</em> je privé-adressen achter één publiek adres.</p>
        </div>
      `,
      questions: [
        {
          q: 'Welk protocol vertaalt binnen een netwerk een IP-adres naar het bijbehorende MAC-adres?',
          options: ['DNS', 'ARP', 'DHCP'],
          answer: 1,
          explain: 'ARP (Address Resolution Protocol) koppelt een IP-adres aan een MAC-adres binnen het netwerk.',
        },
        {
          q: 'Welk IP-adres krijgt de laptop van de DHCP-server?',
          answer: ['192.0.2.57'],
          hints: ['De server doet een aanbod, de client vraagt erom, de server bevestigt.', 'Filter op DHCP en lees de kolom Info bij Offer en ACK.', 'Het adres eindigt op .57.'],
          wrong: { '192.0.2.1': 'Dat is de DHCP-server zelf, die ook de router is.', '0.0.0.0': 'Dat is het bronadres van een apparaat dat nog geen adres heeft.', '255.255.255.255': 'Dat is het broadcast-adres: het bericht gaat naar iedereen omdat de client nog niemand kent.' },
          explain: 'Discover, Offer, Request, ACK: in het aanbod en de bevestiging staat 192.0.2.57.',
        },
        {
          q: 'Hoeveel uur is het uitgedeelde adres geldig (de lease)?',
          answer: ['24', '24 uur'],
          hints: ['De looptijd staat in de bevestiging van de server.', 'Lees pakket 4: de lease staat er in seconden.', 'Deel 86400 door 3600.'],
          wrong: { '86400': 'Dat zijn seconden. Gevraagd is het aantal uren.', '1440': 'Dat zijn minuten.' },
          explain: '86.400 seconden is precies één dag. Daarna moet de laptop het adres verlengen.',
        },
        {
          q: 'Later in de capture beweert een tweede apparaat dat het IP-adres van de router bij hem hoort. Welk MAC-adres heeft dat apparaat?',
          answer: ['de:ad:be:ef:00:99', 'de-ad-be-ef-00-99', 'deadbeef0099'],
          hints: ['Vergelijk alle ARP-antwoorden over 192.0.2.1.', 'Filter op "192.0.2.1 is at" en kijk of het MAC-adres steeds hetzelfde is.', 'Het echte antwoord kwam in pakket 6. De andere drie komen ongevraagd, om de twee seconden.'],
          wrong: { 'aa:bb:cc:11:22:33': 'Dat is het MAC-adres uit het eerste antwoord, direct na de vraag van de laptop. Dat is de echte router.', 'de:ad:be:ef:00:3c': 'Dat is de intranetserver op 192.0.2.80. Die claimt alleen zijn eigen adres.', '52:54:00:a3:1f:6b': 'Dat is de laptop zelf.' },
          why: 'Als de laptop het tweede antwoord gelooft, stuurt hij al zijn verkeer naar buiten via het verkeerde apparaat. Zo werkt een man-in-the-middle op een lokaal netwerk.',
          explain: 'de:ad:be:ef:00:99 stuurt drie keer ongevraagd "192.0.2.1 is at ...". Niemand vroeg erom: dat is ARP-spoofing.',
        },
      ],
    },

    {
      title: 'Taak 7 — Lab: verken je netwerk',
      content: `
        <p>Tijd om de theorie te zien in echte commando\'s. Hieronder staat een Linux-terminal. Typ de volgende
        commando\'s precies zoals hier staat (elk gevolgd door Enter) en lees de uitvoer aandachtig &mdash; de
        antwoorden op de vragen staan er letterlijk in.</p>

        <ol>
          <li><code>ip a</code> &mdash; toont de netwerkkaarten met hun IP- en MAC-adres. Zoek bij <code>eth0</code>
            naar de regel die begint met <code>inet</code> (dat is het IPv4-adres) en <code>link/ether</code> (dat is
            het MAC-adres).</li>
          <li><code>ping -c 4 nm.lab</code> &mdash; stuurt vier testpakketjes naar een server en meet de reactietijd.</li>
          <li><code>arp -a</code> &mdash; toont de ARP-tabel: welk IP-adres hoort bij welk MAC-adres in je netwerk,
            inclusief je <em>gateway</em> (de router).</li>
          <li><code>ss -tuln</code> &mdash; toont welke poorten op deze machine <em>luisteren</em> (openstaan).</li>
          <li><code>traceroute nm.lab</code> &mdash; toont de route (de "hops") die je pakketjes afleggen naar de
            server. Lees elke hop; ergens onderweg is een vlag verstopt in een hostnaam.</li>
        </ol>

        <div class="callout tip">
          <p><strong>Tip:</strong> in <code>ss -tuln</code> staat per regel het lokale adres met de poort erachter
          (bijvoorbeeld <code>0.0.0.0:22</code>). Het nummer na de dubbele punt is de poort. Vergelijk dat met de
          poortentabel uit de vorige taak.</p>
        </div>

        <p>Zie je niet meteen wat je zoekt? Scroll rustig door de uitvoer. In een lab kun je zo vaak typen als je wilt.</p>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student',
        host: 'nm-lab',
        home: '/home/student',
        cwd: '/home/student',
        motd: 'Netwerk-lab. Typ: ip a | ping -c 4 nm.lab | arp -a | ss -tuln | traceroute nm.lab',
        commands: {
          'ip a': `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:a3:1f:6b brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.42/24 brd 192.168.1.255 scope global dynamic eth0
       valid_lft 86309sec preferred_lft 86309sec
    inet6 fe80::5054:ff:fea3:1f6b/64 scope link
       valid_lft forever preferred_lft forever`,
          'ping -c 4 nm.lab': `PING nm.lab (10.10.20.1) 56(84) bytes of data.
64 bytes from 10.10.20.1: icmp_seq=1 ttl=63 time=11.8 ms
64 bytes from 10.10.20.1: icmp_seq=2 ttl=63 time=12.1 ms
64 bytes from 10.10.20.1: icmp_seq=3 ttl=63 time=11.9 ms
64 bytes from 10.10.20.1: icmp_seq=4 ttl=63 time=12.0 ms

--- nm.lab ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 11.802/11.950/12.100/0.112 ms`,
          'arp -a': `gateway (192.168.1.1) at aa:bb:cc:11:22:33 [ether] on eth0
printer.nm.lab (192.168.1.50) at de:ad:be:ef:00:21 [ether] on eth0
nas.nm.lab (192.168.1.60) at de:ad:be:ef:00:3c [ether] on eth0`,
          'ss -tuln': `Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  Process
udp    UNCONN  0       0            0.0.0.0:68           0.0.0.0:*
udp    UNCONN  0       0      127.0.0.53%lo:53           0.0.0.0:*
tcp    LISTEN  0       128          0.0.0.0:22           0.0.0.0:*
tcp    LISTEN  0       128        127.0.0.1:631          0.0.0.0:*
tcp    LISTEN  0       511          0.0.0.0:80           0.0.0.0:*`,
          'traceroute nm.lab': `traceroute to nm.lab (10.10.20.1), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)  0.482 ms  0.451 ms  0.603 ms
 2  10.0.0.1 (10.0.0.1)  4.112 ms  4.087 ms  4.201 ms
 3  core-rtr.nm.lab (10.10.0.1)  8.774 ms  8.690 ms  8.812 ms
 4  NM{netwerk_verkend}.hop.nm.lab (10.10.20.254)  11.902 ms  11.880 ms  12.004 ms
 5  nm.lab (10.10.20.1)  12.110 ms  12.201 ms  12.088 ms`,
        },
      },
      questions: [
        {
          q: 'Welk IPv4-adres heeft deze machine op eth0? (zie ip a)',
          answer: ['192.168.1.42'],
          hint: 'Kijk bij eth0 naar de regel die met inet begint.',
          explain: 'Bij eth0 staat inet 192.168.1.42/24; dat is het IPv4-adres van deze machine.',
        },
        {
          q: 'Wat is het MAC-adres van de gateway (de router)? (zie arp -a)',
          answer: ['aa:bb:cc:11:22:33'],
          hint: 'De gateway staat als eerste in de ARP-tabel, achter "at".',
          explain: 'In arp -a staat: gateway (192.168.1.1) at aa:bb:cc:11:22:33.',
        },
        {
          q: 'Op welke TCP-poort luistert de SSH-server volgens ss -tuln?',
          answer: ['22'],
          hint: 'Zoek de tcp LISTEN-regel met de poort die bij SSH hoort.',
          explain: 'De regel tcp LISTEN 0.0.0.0:22 laat zien dat SSH op poort 22 luistert.',
        },
        {
          q: 'Welke vlag is verstopt in de uitvoer van traceroute nm.lab?',
          answer: ['NM{netwerk_verkend}'],
          hint: 'Kijk goed naar de hostnaam bij hop 4.',
          explain: 'Bij hop 4 staat de hostnaam NM{netwerk_verkend}.hop.nm.lab; dat is de vlag.',
        },
        {
          q: 'Eén dienst op deze machine is vanaf het hele netwerk bereikbaar en verstuurt alles onversleuteld. Welk protocol is dat?',
          boss: true,
          answer: ['http', 'http (80)', 'poort 80', '80'],
          hints: ['Niet elke luisterende poort is voor iedereen bereikbaar. Kijk in de uitvoer van ss naar wat er vóór de poort staat.', 'Een dienst op 127.0.0.1 is alleen vanaf de machine zelf te bereiken; een dienst op 0.0.0.0 vanaf elke netwerkkaart. Zoek daarna de poorten op in de tabel van taak 5.', 'Twee TCP-diensten luisteren op 0.0.0.0. Eén daarvan is de veilige manier om op afstand in te loggen; de andere is het antwoord.'],
          wrong: { 'ssh': 'SSH luistert wel op alle netwerkkaarten, maar versleutelt alles.', '22': 'Poort 22 is SSH: bereikbaar, maar versleuteld.', '631': 'Poort 631 luistert op 127.0.0.1 en is dus alleen vanaf de machine zelf bereikbaar.', 'dns': 'De regel met poort 53 luistert op een lokaal adres (127.0.0.53). Die is niet vanaf het netwerk bereikbaar.', 'https': 'HTTPS zou poort 443 zijn. Die staat niet in de lijst.', 'telnet': 'Telnet is poort 23. Die staat niet in de lijst.' },
          why: 'Zo beoordeelt een beheerder of een aanvaller een machine: wat luistert er, voor wie is het bereikbaar, en is het versleuteld?',
          explain: 'Op 0.0.0.0 luisteren poort 22 en poort 80. Poort 22 is SSH (versleuteld); poort 80 is de webserver zonder TLS. De printerdienst op 631 en de lokale DNS-resolver luisteren alleen op de machine zelf.',
        },
      ],
    },

    {
      title: 'Taak 8 — Verdieping: wat de modellen weglaten',
      kind: 'verdieping', optional: true,
      content: `
        <h3>Een model is een kapstok</h3>
        <p>Het OSI-model (ISO/IEC 7498-1, 1994) is een manier om over netwerken te praten. Het internet is gebouwd op
        TCP/IP, en echte protocollen houden zich niet netjes aan de zeven lagen. TLS wordt vaak op laag 6 gezet, maar
        zit in de praktijk tussen transport en toepassing in. ARP hangt tussen laag 2 en 3. Gebruik het model om een
        probleem af te bakenen ("is de kabel goed, is er een adres, is de poort bereikbaar?"), niet als natuurwet.</p>

        <h3>Adressen die je moet herkennen</h3>
        <ul>
          <li><strong>Privé-adressen</strong> (RFC 1918, 1996): 10.0.0.0/8, 172.16.0.0/12 en 192.168.0.0/16. Die worden
          op internet niet gerouteerd.</li>
          <li><strong>169.254.x.x</strong> (RFC 3927, 2005): een apparaat dat geen antwoord van een DHCP-server kreeg,
          kiest zelf zo'n adres. Zie je dit, dan is DHCP het probleem.</li>
          <li><strong>100.64.0.0/10</strong> (RFC 6598, 2012): adressen die providers gebruiken om veel klanten achter
          één publiek adres te zetten.</li>
          <li><strong>192.0.2.x, 198.51.100.x en 203.0.113.x</strong> (RFC 5737, 2010): gereserveerd voor
          documentatie. Daarom gebruiken de labs in deze room ze: ze kunnen nooit van iemand zijn.</li>
          <li><strong>127.0.0.1</strong>: de machine zelf. Een dienst die alleen daarop luistert, is van buitenaf niet te
          bereiken. Luistert hij op <code>0.0.0.0</code>, dan neemt hij verbindingen aan op elke netwerkkaart.</li>
        </ul>

        <h3>Poorten: de andere kant</h3>
        <p>De tabel in taak 5 gaat over de poort waarop een dienst luistert. De client kiest voor zijn kant een
        tijdelijke poort. IANA reserveert daarvoor 49152 tot en met 65535 (RFC 6335, 2011); Linux gebruikt
        standaard een ruimer bereik dat lager begint. Een poortnummer is ook maar een afspraak: niets houdt
        een beheerder of een aanvaller tegen om SSH op poort 443 te laten luisteren. Een open poort 443 bewijst dus
        niet dat er een webserver draait.</p>

        <h3>Wat er in de praktijk anders gaat</h3>
        <ul>
          <li><strong>NAT is geen firewall.</strong> Het verbergt adressen, maar een apparaat dat zelf naar buiten
          belt, is gewoon bereikbaar voor het antwoord. Een firewall beslist op regels.</li>
          <li><strong>DNS is niet alleen UDP.</strong> Grote antwoorden en zoneoverdrachten gaan over TCP, ook op
          poort 53.</li>
          <li><strong>Web is niet alleen TCP.</strong> HTTP/3 loopt over QUIC (RFC 9000, 2021), en dat gebruikt UDP
          op poort 443.</li>
          <li><strong>MAC-adressen zijn niet heilig.</strong> Telefoons en laptops gebruiken per wifi-netwerk vaak een
          willekeurig adres, en een MAC-adres is met één commando aan te passen. Buiten het eigen netwerksegment
          zie je het ook niet meer: elke router vervangt het door zijn eigen adres.</li>
          <li><strong>TTL.</strong> Elk IP-pakket heeft een teller die bij elke router één omlaag gaat. Bij nul gooit
          de router het weg en stuurt hij een melding terug. <code>traceroute</code> gebruikt precies dat om de
          route zichtbaar te maken.</li>
        </ul>
      `,
      questions: [
        { q: 'Een dienst luistert op 127.0.0.1:631. Vanaf hoeveel andere apparaten in het netwerk is hij bereikbaar?', answer: ['0', 'geen'],
          hints: ['Kijk naar het adres waarop de dienst luistert.', '127.0.0.1 is een bijzonder adres. De uitleg hierboven noemt het.', 'Alleen de machine zelf kan dit adres bereiken.'],
          wrong: { '/^[1-9]/': '127.0.0.1 bestaat alleen binnen de machine zelf. Geen enkel ander apparaat kan er verbinding mee maken.' },
          explain: 'Geen enkel. Pas als de dienst op 0.0.0.0 of op het adres van een netwerkkaart luistert, kunnen anderen erbij.' },
        { q: 'Hoeveel poortnummers telt het bereik 49152 tot en met 65535?', answer: ['16384', '16.384'],
          hints: ['Bij "tot en met" tellen beide grenzen mee.', 'Trek de grenzen van elkaar af en tel er één bij op.', 'Het is een macht van twee: een kwart van alle 65536 poorten.'],
          wrong: { '16383': 'Je bent er één vergeten: beide grenzen tellen mee.', '65535': 'Dat is het hoogste poortnummer. Gevraagd is de grootte van het bereik.' },
          explain: '65535 − 49152 + 1 = 16384.' },
        { q: 'Een pakket vertrekt met TTL 64 en passeert zes routers. Met welke TTL komt het aan?', answer: ['58'],
          hints: ['Elke router verlaagt de teller.', 'Per router gaat er één af.', '64 min 6.'],
          wrong: { '64': 'De TTL blijft niet gelijk: elke router haalt er één af.', '57': 'Zes routers, zes keer één eraf. De ontvanger zelf verlaagt de teller niet.' },
          explain: '64 − 6 = 58. Uit de TTL van een ontvangen pakket kun je zo ruwweg afleiden hoeveel routers ertussen zaten.' },
      ],
    },

    {
      title: 'Taak 9 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examens over netwerken beschrijven meestal een storing of een stukje verkeer en vragen wat er aan de hand
        is. De afleiders zijn protocollen die je wel kent, maar die een ander probleem oplossen. Werk van onder naar
        boven: is er een adres, is de bestemming bereikbaar, klopt de naam, luistert de poort?</p>
        <p>De vier vragen hieronder zijn voor deze room geschreven, in de stijl van zulke examens.</p>
      `,
      questions: [
        { q: 'Een werkplek heeft na het opstarten het adres 169.254.18.40 en bereikt geen enkele server. Andere werkplekken aan dezelfde switch werken wel. Welke dienst heeft deze werkplek niet bereikt?',
          options: ['DNS', 'DHCP', 'ARP', 'NAT'], answer: 1,
          wrong: { 0: 'Zonder DNS werken namen niet, maar de werkplek zou dan nog wel een gewoon adres uit het netwerk hebben.', 2: 'ARP gebruikt een apparaat pas als het een adres heeft en een buurman zoekt. Het deelt zelf geen adressen uit.', 3: 'NAT speelt bij de router, op weg naar internet. Het verklaart niet waarom de werkplek dit adres heeft.' },
          explain: 'Een adres dat met 169.254 begint, kiest een apparaat zelf als er geen antwoord van een DHCP-server komt.' },
        { q: 'Een gebruiker kan de webserver bereiken via https://198.51.100.20, maar niet via https://www.nm.lab. Een ping naar 198.51.100.20 werkt ook. Wat is de meest waarschijnlijke oorzaak?',
          options: ['De standaardgateway van de werkplek is fout ingesteld', 'De firewall blokkeert poort 443', 'De naam wordt niet of verkeerd omgezet door DNS', 'De three-way handshake met de server mislukt'], answer: 2,
          wrong: { 0: 'Met een foute gateway zou het adres 198.51.100.20 in een ander netwerk ook niet bereikbaar zijn.', 1: 'De site werkt via het IP-adres over HTTPS, dus poort 443 is open.', 3: 'De handshake lukt aantoonbaar, want via het IP-adres komt de verbinding tot stand. Het gaat mis vóór er een verbinding wordt opgezet.' },
          explain: 'Alles werkt zodra de naam uit beeld is. Dan ligt het aan de vertaling van naam naar adres.' },
        { q: 'In een capture zie je: werkplek stuurt SYN naar 192.0.2.25 poort 445, en krijgt direct RST, ACK terug. Wat weet je nu?',
          options: ['Een firewall gooit het verkeer stil weg', 'De host is bereikbaar, maar er luistert geen dienst op die poort', 'De verbinding is opgezet en daarna netjes afgesloten', 'De dienst gebruikt UDP in plaats van TCP'], answer: 1,
          wrong: { 0: 'Bij stil weggooien komt er geen antwoord en zie je herhaalde SYN-pakketten. Hier komt meteen antwoord.', 2: 'Een opgezette verbinding heeft SYN, SYN-ACK en ACK. Netjes afsluiten gaat met FIN. Geen van beide is hier gebeurd.', 3: 'Een RST is een TCP-antwoord. Over UDP zegt dit niets.' },
          explain: 'Een RST op een SYN betekent: ik ben er, maar deze poort is dicht.' },
        { q: 'Twee computers hangen aan dezelfde switch, in hetzelfde netwerk. Computer A kent alleen het IP-adres van computer B. Wat heeft A nog nodig om een frame af te leveren, en hoe komt A eraan?',
          options: ['Het MAC-adres van B, via een ARP-verzoek', 'Het MAC-adres van de router, via DHCP', 'De hostnaam van B, via DNS', 'Het publieke adres van B, via NAT'], answer: 0,
          wrong: { 1: 'De router is nodig voor verkeer naar een ander netwerk. A en B zitten in hetzelfde netwerk, dus A levert rechtstreeks af. DHCP deelt bovendien geen MAC-adressen uit.', 2: 'Een naam is handig voor mensen, maar de switch werkt met MAC-adressen. A heeft het IP-adres al.', 3: 'NAT vertaalt adressen aan de rand van het netwerk. Binnen één netwerk speelt het geen rol.' },
          explain: 'Binnen één netwerk bezorgt de switch op MAC-adres. ARP vertaalt het bekende IP-adres naar dat MAC-adres.' },
      ],
    },
  ],
  terms: [
    { term: 'LAN', def: 'Local Area Network: een netwerk op één locatie, zoals thuis of op kantoor.' },
    { term: 'WAN', def: 'Wide Area Network: een netwerk over grote afstanden; het internet is het grootste WAN.' },
    { term: 'Switch', def: 'Apparaat dat apparaten binnen één netwerk verbindt en verkeer stuurt op basis van MAC-adressen.' },
    { term: 'Router', def: 'Apparaat dat verschillende netwerken verbindt en verkeer routeert op basis van IP-adressen.' },
    { term: 'MAC-adres', def: 'Fysiek, vast adres (48 bits) van een netwerkkaart, gebruikt binnen één netwerk.' },
    { term: 'IP-adres', def: 'Logisch adres van een apparaat in een netwerk. IPv4 is 32 bits, IPv6 is 128 bits.' },
    { term: 'OSI-model', def: 'Model met zeven lagen (fysiek, datalink, netwerk, transport, sessie, presentatie, applicatie) om netwerken te beschrijven.' },
    { term: 'Encapsulatie', def: 'Het laag voor laag inpakken van data; het heet dan segment (L4), pakket (L3), frame (L2) en bits (L1).' },
    { term: 'TCP', def: 'Verbindingsgericht, betrouwbaar transportprotocol dat een three-way handshake gebruikt.' },
    { term: 'UDP', def: 'Verbindingsloos, snel transportprotocol zonder handshake of leveringsgarantie.' },
    { term: 'Poort', def: 'Nummer (0-65535) dat aangeeft bij welke dienst op een apparaat het verkeer hoort.' },
    { term: 'DHCP', def: 'Protocol dat apparaten automatisch een IP-adres geeft, in vier stappen: Discover, Offer, Request, Acknowledge (DORA).' },
    { term: 'ARP', def: 'Address Resolution Protocol: vertaalt binnen een netwerk een IP-adres naar een MAC-adres.' },
    { term: 'NAT', def: 'Network Address Translation: vertaalt privé-IP-adressen naar één gedeeld publiek IP-adres.' },
  ],
  resources: [
    { title: 'Cloudflare Learning Center', url: 'https://www.cloudflare.com/learning/' },
    { title: 'TryHackMe', url: 'https://tryhackme.com/' },
    { title: 'NCSC (Nationaal Cyber Security Centrum)', url: 'https://www.ncsc.nl/' },
  ],
});
