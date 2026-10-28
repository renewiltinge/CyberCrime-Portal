/* Room: Datastromen — netwerkstromen: beaconing & exfiltratie opsporen */

// =======================================================================
//  Alles fictief: documentatie-IP's (RFC 5737), .nm.lab-domeinen en een
//  verzonnen besmette werkplek. Je oefent het lezen van datastromen.
// =======================================================================

const NS_FLOWS = [
  { dst: '203.0.113.50', dstLabel: 'cdn-telemetry.nm.lab', port: 443, proto: 'tcp', conns: 480, intervalSec: 60, jitterPct: 4, bytesOut: 52000, bytesIn: 38000, note: 'elke ~60s een klein, gelijkvormig check-in-berichtje' },
  { dst: '203.0.113.77', dstLabel: 'opslag-x9f3.nm.lab', port: 443, proto: 'tcp', conns: 3, intervalSec: null, jitterPct: null, bytesOut: 2100000000, bytesIn: 4200, note: 'drie grote nachtelijke uploads' },
  { dst: '203.0.113.9', dstLabel: 'updates.nm.lab', port: 443, proto: 'tcp', conns: 2, intervalSec: null, jitterPct: null, bytesOut: 1500000, bytesIn: 850000000, note: 'software-update (vooral inkomend)' },
  { dst: '198.51.100.12', dstLabel: 'intranet.nm.lab', port: 443, proto: 'tcp', conns: 95, intervalSec: null, jitterPct: 58, bytesOut: 4200000, bytesIn: 31000000, note: 'intern portaal, grillig gebruik' },
  { dst: '198.51.100.25', dstLabel: 'mail.nm.lab', port: 993, proto: 'tcp', conns: 40, intervalSec: null, jitterPct: 47, bytesOut: 900000, bytesIn: 12000000, note: 'IMAP-mail ophalen' },
];

const NS_PACKETS = [
  { no: 1, time: '02:00:00', src: '10.0.0.23', dst: '203.0.113.50', proto: 'TLS', len: 220, info: 'Client Hello (SNI=cdn-telemetry.nm.lab)' },
  { no: 2, time: '02:00:01', src: '203.0.113.50', dst: '10.0.0.23', proto: 'TLS', len: 190, info: 'Server Hello, Certificate' },
  { no: 3, time: '02:00:01', src: '10.0.0.23', dst: '203.0.113.50', proto: 'TLS', len: 180, info: 'Application Data (check-in)', stream: 'GET /beacon?id=WRK-23 HTTP/1.1\nHost: cdn-telemetry.nm.lab\nUser-Agent: Mozilla/5.0\n\n(server) 204 No Content' },
  { no: 4, time: '02:01:00', src: '10.0.0.23', dst: '203.0.113.50', proto: 'TLS', len: 182, info: 'Application Data (check-in)' },
  { no: 5, time: '02:02:00', src: '10.0.0.23', dst: '203.0.113.50', proto: 'TLS', len: 179, info: 'Application Data (check-in)' },
  { no: 6, time: '02:03:00', src: '10.0.0.23', dst: '203.0.113.50', proto: 'TLS', len: 181, info: 'Application Data (check-in)' },
  { no: 7, time: '02:14:10', src: '10.0.0.23', dst: '203.0.113.77', proto: 'TLS', len: 1460, info: 'Application Data (grote upload)', stream: 'POST /upload/chunk-00 HTTP/1.1\nHost: opslag-x9f3.nm.lab\nContent-Length: 734003200\n\n[~700 MB binaire data: klantenbestand.7z]\nNM{exfil_in_de_stroom}' },
  { no: 8, time: '02:41:52', src: '10.0.0.23', dst: '203.0.113.77', proto: 'TLS', len: 1460, info: 'Application Data (grote upload, chunk 2)' },
  { no: 9, time: '03:09:33', src: '10.0.0.23', dst: '203.0.113.77', proto: 'TLS', len: 1460, info: 'Application Data (grote upload, chunk 3)' },
  { no: 10, time: '08:12:04', src: '10.0.0.23', dst: '203.0.113.9', proto: 'TLS', len: 1460, info: 'Software-update downloaden (vooral inkomend)' },
];

CS.registerRoom({
  id: 'netwerkstromen-analyse',
  path: 'datastromen',
  order: 2,
  title: 'Netwerkstromen: beaconing & exfiltratie',
  icon: '📡',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'Een besmette werkplek verraadt zich in het netwerkverkeer. Je leert beaconing (het ritmische check-in-signaal van malware naar zijn C2) onderscheiden van data-exfiltratie (een groot uitgaand volume) en van normaal verkeer, eerst via NetFlow-samenvattingen en daarna op pakketniveau. Je sluit af met de juiste eerste reactie.',
  objectives: [
    'Uitleggen wat beaconing is en hoe je het herkent aan ritme (lage jitter) en kleine, gelijkvormige pakketten',
    'Data-exfiltratie herkennen aan een groot uitgaand volume naar één bestemming',
    'Normaal verkeer (updates, mail, browsing) onderscheiden van kwaadaardig verkeer',
    'Een NetFlow-overzicht en een pakketcapture lezen en combineren',
    'De juiste eerste reactie op een besmette host bepalen (isoleren, IOC vastleggen)',
  ],
  terms: [
    { term: 'NetFlow', def: 'Samenvatting van netwerkstromen: per verbinding wie met wie praatte, op welke poort, hoeveel bytes en hoe vaak — zonder de volledige inhoud.' },
    { term: 'Egress-verkeer', def: 'Uitgaand verkeer, van binnen het netwerk naar buiten. Exfiltratie en C2-verkeer zitten hier.' },
    { term: 'Beaconing', def: 'Het periodieke "ik leef nog"-signaal van malware naar zijn command-and-control (C2): regelmatig, klein en gelijkvormig.' },
    { term: 'Jitter', def: 'De variatie in het tijdsinterval tussen beacons. Lage jitter = strak ritme (machine); hoge jitter = grillig (mens).' },
    { term: 'C2 (command-and-control)', def: 'De server waarmee besmette machines contact houden voor opdrachten en om data af te geven.' },
    { term: 'Exfiltratie', def: 'Het wegsluizen van data naar buiten, vaak als een groot uitgaand volume of in stilletjes opgeknipte brokken.' },
    { term: 'IOC', def: 'Indicator of Compromise: een concreet spoor (IP, domein, hash) waarmee je dezelfde aanval elders herkent en blokkeert.' },
    { term: 'ATT&CK T1071 / T1041', def: 'MITRE ATT&CK-technieken: Application Layer Protocol (C2-verkeer) en Exfiltration Over C2 Channel.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — Command and Control (TA0011)', url: 'https://attack.mitre.org/tactics/TA0011/' },
    { title: 'MITRE ATT&CK — Exfiltration (TA0010)', url: 'https://attack.mitre.org/tactics/TA0010/' },
    { title: 'Wireshark — netwerkanalyse', url: 'https://www.wireshark.org/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Beaconing, exfiltratie en normaal verkeer',
      content: `
        <p>Een besmette werkplek ziet er van buiten normaal uit, maar <em>praat</em> anders. In het netwerkverkeer vallen
        twee signalen op.</p>
        <ul>
          <li><strong>Beaconing</strong> — malware meldt zich periodiek bij zijn <strong>C2</strong>: "ik leef nog, zijn er
          opdrachten?". Dat verkeer is <em>regelmatig</em> (lage jitter), <em>klein</em> en <em>gelijkvormig</em>. Een mens
          surft grillig; een machine tikt als een klok.</li>
          <li><strong>Exfiltratie</strong> — op enig moment gaat de buit naar buiten: een <em>groot uitgaand volume</em> naar
          één bestemming, vaak 's nachts of in opgeknipte brokken.</li>
        </ul>
        <p>De kunst is ze te scheiden van <strong>normaal</strong> verkeer: een software-update is juist vooral
        <em>inkomend</em>, en browsen is grillig. Richt je op de <strong>egress</strong> (uitgaande) kant.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> IP's zijn documentatie-adressen (RFC 5737), domeinen
        eindigen op <code>.nm.lab</code>. Je oefent het lezen van stromen, je volgt geen echte host.</div>
        <div class="callout tip"><strong>Beloning:</strong> onthoud — ritme = C2, volume = exfil. Vlag:
        <code>NM{ritme_of_volume}</code>.</div>
      `,
      questions: [
        { q: 'Waaraan herken je beaconing het best?', options: ['Een regelmatig ritme (lage jitter) met kleine, gelijkvormige pakketten', 'Een eenmalige grote download', 'Veel inkomend verkeer van een updateserver', 'Grillig verkeer op willekeurige tijden'], answer: 0, explain: 'Beaconing is machineregelmaat: strak interval, klein en gelijkvormig. Dat onderscheidt het van menselijk verkeer.' },
        { q: 'Waaraan herken je data-exfiltratie?', options: ['Een groot uitgaand (egress) volume naar één bestemming', 'Veel kleine inkomende pakketjes', 'Een lage jitter', 'DNS-verkeer naar de interne resolver'], answer: 0, explain: 'Exfiltratie is volume dat naar buiten gaat. Let op de verhouding uit/in per bestemming.' },
        { q: 'Een software-update genereert vooral welk soort verkeer?', options: ['Inkomend (je downloadt veel, je stuurt weinig)', 'Uitgaand (je upload veel)', 'Een strak beacon-ritme', 'Geen enkel verkeer'], answer: 0, explain: 'Bij een update is het volume vooral inkomend; dat helpt je het te onderscheiden van exfiltratie.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{ritme_of_volume}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{ritme_of_volume}.' },
      ],
    },
    {
      title: 'Taak 2 — Lees het NetFlow-overzicht',
      content: `
        <p>Hieronder staat een <strong>NetFlow</strong>-samenvatting van één werkplek over een nacht: per bestemming hoe
        vaak er contact was, met welk interval en welke jitter, en hoeveel data er uit en in ging. Geen pakketinhoud — puur
        de stromen. Vind het baken en de exfiltratie, en laat je niet afleiden door het normale verkeer.</p>
        <div class="callout tip"><strong>Beloning:</strong> betrap beide. Vlag: <code>NM{baken_en_buit}</code>.</div>
      `,
      lab: {
        type: 'netflow',
        title: 'egress van werkplek WRK-23 (10.0.0.23), één nacht',
        scenario: 'Eén bestemming tikt als een klok; één slokt gigabytes op; de rest is normaal. Welke is welke?',
        flows: NS_FLOWS,
        ask: [
          { q: 'Welke bestemming is het C2-baken?', answer: ['cdn-telemetry.nm.lab', 'cdn-telemetry', '203.0.113.50'], hint: 'Strak ritme, lage jitter, honderden kleine check-ins.' },
          { q: 'Welke bestemming wijst op data-exfiltratie?', answer: ['opslag-x9f3.nm.lab', 'opslag-x9f3', '203.0.113.77'], hint: 'Het grootste uitgaande volume.' },
          { q: 'Met welk interval (in seconden) meldt het baken zich?', answer: ['60', '60s', '60 seconden'], hint: 'Lees de kolom "Interval" bij de baken-rij.' },
        ],
      },
      questions: [
        { q: 'Welke bestemming is het C2-baken?', answer: ['cdn-telemetry.nm.lab', 'cdn-telemetry', '203.0.113.50'], hint: 'Zoek de laagste jitter en de meeste kleine verbindingen.', explain: 'cdn-telemetry.nm.lab: 480 verbindingen, elke ~60s, jitter 4% — een klassiek beacon-ritme.' },
        { q: 'Welke bestemming wijst op data-exfiltratie?', answer: ['opslag-x9f3.nm.lab', 'opslag-x9f3', '203.0.113.77'], hint: 'Kijk naar de kolom "Uit".', explain: 'opslag-x9f3.nm.lab ontving ~2,1 GB uitgaand in slechts drie verbindingen — dat is exfiltratie.' },
        { q: 'Ongeveer hoeveel data lekte er weg naar de exfiltratie-bestemming?', answer: ['2.1 GB', '2.1', '2,1 GB', '2.1gb', '2,1'], hint: 'De kolom "Uit" bij opslag-x9f3.nm.lab.', explain: 'Ongeveer 2,1 GB ging uitgaand naar opslag-x9f3.nm.lab.' },
        { q: 'Waarom is updates.nm.lab géén exfiltratie, ondanks het grote volume?', options: ['Omdat het volume vooral inkomend is (een download), niet uitgaand', 'Omdat het een .nm.lab-domein is', 'Omdat het overdag gebeurde', 'Omdat er maar twee verbindingen waren'], answer: 0, explain: 'Bij updates.nm.lab is het grote volume inkomend (850 MB in, 1,5 MB uit): een download, geen wegsluizing.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{baken_en_buit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{baken_en_buit}.' },
      ],
    },
    {
      title: 'Taak 3 — Bevestig het op pakketniveau',
      content: `
        <p>NetFlow gaf je de verdenking; de <strong>pakketcapture</strong> levert het bewijs. Filter op de verdachte
        bestemmingen en bekijk de inhoud. Let op de <strong>tijdstempels</strong> van de check-ins (het ritme wordt nu
        zichtbaar) en volg de stream van de grote upload.</p>
        <ul>
          <li>Filter op <code>cdn-telemetry</code> of <code>203.0.113.50</code> en kijk naar de tijden van de check-ins.</li>
          <li>Filter op <code>opslag-x9f3</code> of <code>203.0.113.77</code> en klik de grote upload aan; lees de stream.</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> de vlag zit verstopt in de stream van de exfiltratie-upload.
        Vind hem: <code>NM{exfil_in_de_stroom}</code>.</div>
      `,
      lab: {
        type: 'pcap',
        title: 'capture-WRK-23.pcap',
        packets: NS_PACKETS,
      },
      questions: [
        { q: 'Met welk interval (in seconden) herhaalt het baken zijn check-in, te zien aan de tijdstempels?', answer: ['60', '60s', '60 seconden', '1 minuut'], hint: 'Kijk naar de tijden 02:00:00, 02:01:00, 02:02:00, 02:03:00.', explain: 'De check-ins staan precies 60 seconden uit elkaar — een strak beacon-ritme.' },
        { q: 'Naar welke bestemming gaat de grote nachtelijke upload?', answer: ['opslag-x9f3.nm.lab', 'opslag-x9f3', '203.0.113.77'], hint: 'Filter op de grote uploads.', explain: 'De POST /upload-pakketten gaan naar opslag-x9f3.nm.lab (203.0.113.77).' },
        { q: 'Wat werd er volgens de stream weggesluisd?', options: ['Een klantenbestand (klantenbestand.7z)', 'Een software-update', 'Een e-mail', 'Niets, het was leeg'], answer: 0, explain: 'De follow-stream toont een POST met ~700 MB "klantenbestand.7z" — de buit.' },
        { q: 'Welke vlag zit verstopt in de stream van de exfiltratie-upload?', answer: ['NM{exfil_in_de_stroom}'], hint: 'Klik pakket 7 aan en lees de follow-stream.', explain: 'De vlag NM{exfil_in_de_stroom} staat onderaan de upload-stream.' },
      ],
    },
    {
      title: 'Taak 4 — Eerste reactie en IOCs',
      content: `
        <p>Je hebt beaconing én exfiltratie bevestigd. Nu telt snelheid en zorgvuldigheid tegelijk. De juiste eerste reactie
        bij een besmette host is <strong>isoleren</strong> (van het netwerk halen, maar niet uitzetten — dan verlies je
        geheugen en lopende verbindingen als bewijs), en de <strong>IOCs</strong> vastleggen zodat je dezelfde aanval elders
        herkent en blokkeert.</p>
        <p>De IOCs uit deze zaak: de C2 <code>cdn-telemetry.nm.lab</code> (203.0.113.50) en de exfil-bestemming
        <code>opslag-x9f3.nm.lab</code> (203.0.113.77).</p>
        <div class="callout tip"><strong>Beloning:</strong> isoleren, niet uitzetten. Vlag: <code>NM{isoleer_niet_uit}</code>.</div>
      `,
      questions: [
        { q: 'Wat is de juiste eerste reactie op de besmette werkplek?', options: ['Isoleren van het netwerk, maar aan laten staan (geheugen en bewijs behouden)', 'Direct uitzetten', 'Niets doen en verder monitoren', 'De harde schijf meteen wissen'], answer: 0, explain: 'Isoleren stopt de schade; aan laten staan bewaart vluchtig bewijs (geheugen, verbindingen) voor forensie.' },
        { q: 'Welke twee IOCs blokkeer je direct op de firewall/proxy?', options: ['cdn-telemetry.nm.lab (203.0.113.50) en opslag-x9f3.nm.lab (203.0.113.77)', 'updates.nm.lab en mail.nm.lab', 'intranet.nm.lab en mail.nm.lab', 'Alle .nm.lab-domeinen'], answer: 0, explain: 'De C2 en de exfil-bestemming zijn de kwaadaardige IOCs; de rest is legitiem verkeer dat je niet wilt blokkeren.' },
        { q: 'Welke ATT&CK-tactiek hoort bij het beacon-verkeer naar de C2?', options: ['Command and Control (TA0011)', 'Initial Access', 'Impact', 'Reconnaissance'], answer: 0, explain: 'Het ritmische C2-verkeer valt onder de tactiek Command and Control (TA0011); de techniek is Application Layer Protocol (T1071).' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{isoleer_niet_uit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{isoleer_niet_uit}.' },
      ],
    },
  ],
});
