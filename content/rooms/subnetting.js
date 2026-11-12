/* Room: IP-adressen en subnetting */
CS.registerRoom({
  id: 'subnetting',
  path: 'fundamenten',
  order: 3,
  title: 'IP-adressen en subnetting',
  icon: '🧮',
  difficulty: 'Gemiddeld',
  level: 'Instap',
  checked: '2026-11-12',
  minutes: 65,
  summary: 'Reken met IP-adressen: binair en decimaal, subnetmaskers en CIDR, netwerk- en broadcastadres, het aantal hosts, de speciale adresblokken en het verkorten van IPv6.',
  objectives: [
    'Decimale getallen omrekenen naar binair en terug',
    'Een subnetmasker en de CIDR-notatie lezen en omrekenen',
    'Het netwerkadres, broadcastadres en aantal bruikbare hosts van een subnet berekenen',
    'De private ranges, loopback en APIPA herkennen',
    'Uitleggen waarom subnetten (segmentatie) ook een beveiligingsmaatregel is',
    'Een IPv6-adres correct verkorten',
  ],
  tasks: [
    {
      title: 'Taak 1 — Binair en decimaal',
      tryFirst: true,
      intro: '<p>Reken eerst zelf: welk decimaal getal is het octet <code>10101100</code>, en hoe schrijf je 202 in acht bits? Controleer daarna in de omzetter (binair typ je als <code>0b10101100</code>). Loop je vast, klap dan de uitleg open.</p>',
      content: `
        <p>Computers kennen maar twee toestanden: aan (1) en uit (0). Dat is het <strong>binaire</strong> talstelsel.
        Een enkele 0 of 1 heet een <strong>bit</strong>. Acht bits samen heten een <strong>byte</strong> of, als het om
        een deel van een IP-adres gaat, een <strong>octet</strong>. Een IPv4-adres bestaat uit vier van die octetten,
        dus uit 4 &times; 8 = 32 bits.</p>

        <p>Om binair te lezen hoef je maar één tabel te kennen: de plaatswaarden binnen een octet. Van links naar rechts
        verdubbelt elke plaats:</p>

        <table>
          <thead>
            <tr><th>Plaats</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Waarde</strong></td><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
          </tbody>
        </table>

        <p><strong>Van binair naar decimaal:</strong> tel de waarden op waar een 1 staat. Voorbeeld:
        <code>11000000</code>. Er staat een 1 op plaats 1 (128) en plaats 2 (64), de rest is 0. Dus 128 + 64 = <strong>192</strong>.</p>

        <p><strong>Nog een voorbeeld:</strong> <code>10101000</code> = 128 + 32 + 8 = <strong>168</strong>. En
        <code>00000001</code> = <strong>1</strong>. Zo is <code>192.168.1.10</code> binair:
        <code>11000000.10101000.00000001.00001010</code>.</p>

        <p><strong>Van decimaal naar binair:</strong> werk van links (128) naar rechts. Past de plaatswaarde in je
        getal, zet dan een 1 en trek hem af; past hij niet, zet een 0. Voorbeeld 200:</p>
        <ul>
          <li>128 past in 200 &rarr; 1, rest 72</li>
          <li>64 past in 72 &rarr; 1, rest 8</li>
          <li>32 past niet in 8 &rarr; 0; 16 past niet &rarr; 0; 8 past in 8 &rarr; 1, rest 0</li>
          <li>4 &rarr; 0; 2 &rarr; 0; 1 &rarr; 0</li>
        </ul>
        <p>Resultaat: 200 = <code>11001000</code>. Elk octet loopt zo van 0 (<code>00000000</code>) tot en met 255
        (<code>11111111</code>).</p>

        <div class="callout tip">
          <p><strong>Tip:</strong> leer alleen de rij 128-64-32-16-8-4-2-1 uit je hoofd. Daarmee reken je elk octet in
          enkele seconden om, en de rest van subnetting wordt veel makkelijker.</p>
        </div>
      `,
      lab: { type: 'numconv', value: '0b11000000' },
      questions: [
        {
          q: 'Zet het octet 10101100 om naar decimaal.',
          answer: ['172'],
          hints: ['Tel de plaatswaarden op waar een 1 staat.', 'De rij is 128-64-32-16-8-4-2-1; er staan enen op plaats 1, 3, 5 en 6.', '128 + 32 + 8 + 4.'],
          wrong: {
            '53': 'Je leest het octet van rechts naar links. De meest linkse bit is 128 waard, niet 1.',
            '176': 'Bijna. Je telt 16 mee in plaats van 4: de enen staan op 128, 32, 8 en 4.',
            '86': 'Je bent één plaats opgeschoven. De eerste bit is 128 waard, niet 64.',
          },
          explain: '128 + 32 + 8 + 4 = 172. Dit is het eerste octet van de private range 172.16.0.0/12.',
        },
        {
          q: 'Schrijf het decimale getal 202 als acht bits.',
          answer: ['11001010', '0b11001010'],
          hints: ['Werk van links naar rechts: past 128 erin, dan 64, enzovoort.', '202 - 128 = 74, 74 - 64 = 10. Welke plaatswaarden maken samen 10?', '128 + 64 + 8 + 2.'],
          wrong: {
            '11001000': 'Dat is 200. Er blijft nog 2 over: zet ook de bit van plaatswaarde 2 aan.',
            '01010011': 'Je hebt het octet omgedraaid. De hoogste plaatswaarde staat links.',
            '/^[01]{1,7}$/': 'Een octet schrijf je altijd met acht bits; vul links aan met nullen.',
          },
          explain: '202 = 128 + 64 + 8 + 2, dus 11001010.',
        },
        {
          q: 'Een netwerkbeheerder noteert een adres binair: 00001010.00010100.00011110.00101000. Schrijf het in gewone decimale notatie.',
          answer: ['10.20.30.40'],
          hints: ['Reken elk octet apart om; de punten blijven staan.', 'Het eerste octet is 8 + 2. Doe hetzelfde voor de andere drie.', 'De octetten zijn 10, 20, 30 en ...'],
          why: 'In packet captures en ACL-fouten zie je adressen soms binair of in hex. Wie een octet vlot omrekent, ziet meteen in welk subnet een adres valt.',
          explain: '00001010 = 10, 00010100 = 20, 00011110 = 30 en 00101000 = 40.',
        },
      ],
    },

    {
      title: 'Taak 2 — Het subnetmasker en de CIDR-notatie',
      tryFirst: true,
      intro: '<p>Een collega geeft je alleen een masker: <code>255.255.254.0</code>. Zoek uit welke CIDR-prefix daarbij hoort, en welk masker bij /22 past. De calculator rekent een adres met prefix uit, bijvoorbeeld <code>10.0.0.0/22</code>; probeer een paar prefixen en kijk wat er met het masker gebeurt.</p>',
      content: `
        <p>Een IP-adres heeft twee delen: een <strong>netwerkdeel</strong> (welk netwerk) en een <strong>hostdeel</strong>
        (welk apparaat binnen dat netwerk). Het <strong>subnetmasker</strong> vertelt waar de grens ligt. Op de plekken
        waar het masker een 1 heeft, hoort het bij het netwerkdeel; waar het een 0 heeft, bij het hostdeel.</p>

        <p>Het klassieke masker <code>255.255.255.0</code> is binair:</p>
        <p><code>11111111.11111111.11111111.00000000</code></p>
        <p>Dat zijn 24 enen gevolgd door 8 nullen. De eerste 24 bits zijn dus het netwerkdeel, de laatste 8 het
        hostdeel.</p>

        <p>Omdat zo'n masker lang is, gebruiken we de <strong>CIDR-notatie</strong> (Classless Inter-Domain Routing):
        je telt simpelweg het aantal enen (netwerkbits) en zet dat achter het adres met een schuine streep. Dus
        <code>255.255.255.0</code> = <strong>/24</strong>. Het adres schrijf je dan als <code>192.168.1.0/24</code>.</p>

        <p>De belangrijkste maskers om te herkennen:</p>
        <table>
          <thead><tr><th>CIDR</th><th>Subnetmasker</th><th>Netwerkbits</th><th>Hostbits</th></tr></thead>
          <tbody>
            <tr><td>/8</td><td>255.0.0.0</td><td>8</td><td>24</td></tr>
            <tr><td>/16</td><td>255.255.0.0</td><td>16</td><td>16</td></tr>
            <tr><td>/24</td><td>255.255.255.0</td><td>24</td><td>8</td></tr>
            <tr><td>/25</td><td>255.255.255.128</td><td>25</td><td>7</td></tr>
            <tr><td>/26</td><td>255.255.255.192</td><td>26</td><td>6</td></tr>
            <tr><td>/27</td><td>255.255.255.224</td><td>27</td><td>5</td></tr>
            <tr><td>/28</td><td>255.255.255.240</td><td>28</td><td>4</td></tr>
            <tr><td>/30</td><td>255.255.255.252</td><td>30</td><td>2</td></tr>
          </tbody>
        </table>

        <p>Zie je het laatste octet terug? 128, 192, 224, 240, 252: dat is telkens een bit erbij (128; 128+64; enzovoort).
        Hoe hoger de CIDR, hoe meer netwerkbits en hoe <em>minder</em> hosts per netwerk.</p>

        <div class="callout info">
          <p><strong>Voorbeeld:</strong> <code>255.255.255.192</code> is binair
          <code>11111111.11111111.11111111.11000000</code>. Tel de enen: 8 + 8 + 8 + 2 = 26. Dus dit masker is /26.</p>
        </div>
      `,
      lab: { type: 'subnet' },
      questions: [
        {
          q: 'Welk subnetmasker hoort bij de prefix /22?',
          answer: ['255.255.252.0'],
          hints: ['22 netwerkbits: twee volle octetten en nog 6 bits in het derde.', 'Zes enen in een octet: 128 + 64 + 32 + 16 + 8 + 4.', 'Het derde octet is 252, het vierde 0.'],
          wrong: {
            '255.255.255.252': 'Dat is /30. Bij /22 valt de grens in het derde octet, niet in het vierde.',
            '255.255.248.0': 'Dat is /21: vijf enen in het derde octet. Bij /22 zijn het er zes.',
            '255.255.254.0': 'Dat is /23: zeven enen in het derde octet.',
          },
          explain: '/22 = 8 + 8 + 6 bits. Zes enen in het derde octet is 252, dus 255.255.252.0.',
        },
        {
          q: 'Welke CIDR-prefix hoort bij het masker 255.255.254.0?',
          answer: ['/23', '23'],
          hints: ['Tel de enen in het hele masker.', '254 is binair 11111110: zeven enen.', '8 + 8 + 7.'],
          wrong: {
            '/24': '/24 is 255.255.255.0. Hier is het derde octet 254, dus één bit minder.',
            '24': '/24 is 255.255.255.0. Hier is het derde octet 254, dus één bit minder.',
            '/22': '/22 is 255.255.252.0. 254 heeft zeven enen, 252 heeft er zes.',
            '22': '/22 is 255.255.252.0. 254 heeft zeven enen, 252 heeft er zes.',
          },
          explain: '255 en 255 leveren 16 enen, 254 levert er 7: samen /23.',
        },
        {
          q: 'Hoeveel hostbits blijven er over bij het masker 255.255.255.248?',
          answer: ['3', 'drie'],
          hints: ['Hostbits zijn de nullen in het masker.', '248 is binair 11111000.', '32 min 29.'],
          explain: '248 = 11111000: vijf enen en drie nullen. Het masker is /29 en laat 3 hostbits over.',
        },
      ],
    },

    {
      title: 'Taak 3 — Netwerkadres, broadcast en bruikbare hosts',
      tryFirst: true,
      intro: '<p>De printer op de afdeling Planning heeft adres <code>10.14.77.200/27</code>. Zoek uit in welk subnet hij zit: netwerkadres, broadcastadres en hoeveel apparaten er nog bij passen. Reken eerst op papier, controleer daarna met de calculator.</p>',
      content: `
        <p>Binnen elk subnet zijn twee adressen gereserveerd en mag je de rest aan apparaten geven:</p>
        <ul>
          <li>Het <strong>netwerkadres</strong>: alle hostbits op 0. Dit is de "naam" van het netwerk; je geeft het niet
            aan een apparaat.</li>
          <li>Het <strong>broadcastadres</strong>: alle hostbits op 1. Hiermee bereik je alle apparaten in het subnet
            tegelijk; ook dit geef je niet aan een apparaat.</li>
          <li>Alle adressen daartussen zijn de <strong>bruikbare hosts</strong>.</li>
        </ul>

        <p>Omdat je er twee kwijt bent (netwerk en broadcast), geldt de formule:</p>
        <p><strong>bruikbare hosts = 2^(hostbits) &minus; 2</strong></p>
        <p>Bij /24 zijn er 8 hostbits: 2^8 &minus; 2 = 256 &minus; 2 = <strong>254</strong> hosts. Bij /26 zijn er 6
        hostbits: 2^6 &minus; 2 = 64 &minus; 2 = <strong>62</strong> hosts.</p>

        <h3>Stap voor stap: wat is het broadcastadres van 192.168.10.64/26?</h3>
        <ol>
          <li><strong>Masker en hostbits.</strong> /26 betekent masker 255.255.255.192 en 32 &minus; 26 = 6 hostbits.</li>
          <li><strong>Blokgrootte.</strong> Het interessante octet is het laatste (192). De blokgrootte is
            256 &minus; 192 = <strong>64</strong>. De subnetten in het laatste octet beginnen dus bij 0, 64, 128, 192.</li>
          <li><strong>Netwerkadres.</strong> Het adres .64 valt precies op een grens, dus het netwerkadres is
            <code>192.168.10.64</code>.</li>
          <li><strong>Broadcastadres.</strong> Het volgende blok begint bij .128, dus dit blok loopt tot en met .127.
            Het broadcastadres is <code>192.168.10.127</code>.</li>
          <li><strong>Bruikbare hosts.</strong> Van .65 tot en met .126, dat zijn er 62 (klopt met 2^6 &minus; 2).</li>
        </ol>

        <h3>Nog een voorbeeld: 172.16.34.200/20</h3>
        <p>/20 = masker 255.255.240.0. Het interessante octet is nu het derde (240). Blokgrootte = 256 &minus; 240 = 16,
        dus blokken beginnen bij 0, 16, 32, 48, ... in het derde octet. 34 valt tussen 32 en 48, dus het netwerkadres is
        <code>172.16.32.0</code> en het broadcastadres <code>172.16.47.255</code>. Dat zijn 2^12 &minus; 2 = 4094
        bruikbare hosts.</p>

        <div class="callout tip">
          <p><strong>Oefen in het lab hieronder.</strong> Gebruik de calculator om je antwoorden te controleren en de
          generator om willekeurige oefenvragen te maken. Reken ze eerst zelf uit met de stappen hierboven, en kijk daarna
          pas of het klopt.</p>
        </div>
      `,
      lab: { type: 'subnet' },
      questions: [
        {
          q: 'Wat is het broadcastadres van het subnet waarin 10.14.77.200/27 zit?',
          answer: ['10.14.77.223'],
          hints: ['Bepaal eerst de blokgrootte in het laatste octet.', '/27 is masker 224, dus blokken van 32: 0, 32, 64, ... In welk blok valt 200?', 'Het blok begint bij .192; het volgende begint bij .224.'],
          wrong: {
            '10.14.77.192': 'Dat is het netwerkadres (alle hostbits 0). Het broadcastadres is het laatste adres van het blok.',
            '10.14.77.224': 'Off-by-one: .224 is het netwerkadres van het volgende subnet. Het broadcastadres ligt er één onder.',
            '10.14.77.222': 'Dat is de laatste bruikbare host. Het broadcastadres is één hoger.',
            '10.14.77.255': 'Dat zou kloppen bij /24. Bij /27 is het blok maar 32 adressen groot.',
          },
          why: 'Wie het broadcastadres aan een apparaat geeft, krijgt een host die niet bereikbaar is. Dit is een van de meest gemaakte fouten bij het handmatig uitdelen van adressen.',
          explain: 'Blokgrootte 256 - 224 = 32. 200 valt in het blok 192 t/m 223, dus het broadcastadres is 10.14.77.223.',
        },
        {
          q: 'Hoeveel bruikbare hosts heeft een /23-netwerk?',
          answer: ['510'],
          hints: ['Gebruik de formule met het aantal hostbits.', '32 - 23 = 9 hostbits.', '2^9 = 512; trek er twee af.'],
          wrong: {
            '512': 'Dat is het totaal aantal adressen. Netwerkadres en broadcastadres gaan er nog af.',
            '254': 'Dat is /24. Een /23 heeft één hostbit meer en is dus twee keer zo groot.',
            '511': 'Je trekt er één af; je bent er twee kwijt: het netwerkadres en het broadcastadres.',
          },
          explain: '9 hostbits: 2^9 - 2 = 510 bruikbare hosts.',
        },
        {
          q: 'Wat is het netwerkadres van 172.20.93.140/21?',
          answer: ['172.20.88.0'],
          hints: ['Bij /21 ligt de grens in het derde octet.', 'Masker 255.255.248.0: blokken van 8 in het derde octet.', 'Welk veelvoud van 8 ligt net onder 93?'],
          wrong: {
            '172.20.93.0': 'Je behandelt het als /24. Bij /21 horen ook de laatste drie bits van het derde octet bij het hostdeel.',
            '172.20.95.255': 'Dat is het broadcastadres van dit subnet. Gevraagd is het netwerkadres.',
            '172.20.96.0': 'Dat is het volgende subnet. 93 valt in het blok 88 t/m 95.',
            '172.20.88.1': 'Dat is de eerste bruikbare host. Het netwerkadres eindigt hier op .0.',
          },
          explain: 'Blokgrootte 256 - 248 = 8. 93 valt tussen 88 en 96, dus het netwerkadres is 172.20.88.0 (broadcast 172.20.95.255).',
        },
        {
          q: 'Een nieuwe server krijgt het laatste bruikbare adres in het subnet van 192.168.44.75/28. Welk adres is dat?',
          answer: ['192.168.44.78'],
          hints: ['Zoek eerst het broadcastadres van dit subnet.', '/28 geeft blokken van 16: 64, 80, ... Het blok van .75 loopt tot en met .79.', 'Het is één lager dan het broadcastadres.'],
          wrong: {
            '192.168.44.79': 'Dat is het broadcastadres. Dat mag je niet aan een apparaat geven.',
            '192.168.44.80': 'Dat is het netwerkadres van het volgende subnet.',
            '192.168.44.65': 'Dat is de eerste bruikbare host. Gevraagd is de laatste.',
          },
          explain: 'Het subnet is 192.168.44.64/28, broadcast .79. De laatste bruikbare host is 192.168.44.78.',
        },
      ],
    },

    {
      title: 'Taak 4 — Speciale adresblokken en waarom je subnet',
      tryFirst: true,
      intro: '<p>In het lab staan zestien adressen uit een firewalllog door elkaar. Sorteer ze in vier groepen van vier. Welke soorten adressen het zijn, moet je zelf ontdekken; de uitleg helpt als je vastloopt.</p>',
      content: `
        <p>Niet elk IP-adres mag zomaar op het internet. Een aantal blokken is voor speciaal gebruik gereserveerd. Deze
        moet je kunnen herkennen.</p>

        <p><strong>Private ranges (RFC 1918).</strong> Deze adressen gebruik je binnen een eigen netwerk; ze zijn niet
        routeerbaar op het internet (daar komt NAT om de hoek kijken):</p>
        <table>
          <thead><tr><th>Blok</th><th>Bereik</th></tr></thead>
          <tbody>
            <tr><td><code>10.0.0.0/8</code></td><td>10.0.0.0 t/m 10.255.255.255</td></tr>
            <tr><td><code>172.16.0.0/12</code></td><td>172.16.0.0 t/m 172.31.255.255</td></tr>
            <tr><td><code>192.168.0.0/16</code></td><td>192.168.0.0 t/m 192.168.255.255</td></tr>
          </tbody>
        </table>
        <p>Let op bij de 172-range: alleen 172.<strong>16</strong> t/m 172.<strong>31</strong> is privé. Een adres als
        172.32.0.1 valt er net buiten en is dus publiek.</p>

        <p><strong>Loopback: <code>127.0.0.0/8</code>.</strong> Het bekendste adres is <code>127.0.0.1</code>
        ("localhost"): verkeer naar jezelf, dat je netwerkkaart nooit verlaat. Handig om te testen of een dienst lokaal
        draait.</p>

        <p><strong>APIPA: <code>169.254.0.0/16</code>.</strong> Krijgt een apparaat geen adres van een DHCP-server, dan
        geeft het zichzelf automatisch een adres in dit bereik. Zie je een 169.254-adres, dan weet je bijna zeker: de
        DHCP-server is onbereikbaar.</p>

        <p><strong>Documentatie: <code>192.0.2.0/24</code>, <code>198.51.100.0/24</code> en <code>203.0.113.0/24</code>.</strong>
        Deze drie blokken zijn in RFC 5737 (2010) gereserveerd voor voorbeelden in handleidingen en lesmateriaal. Je
        komt ze in dit portaal vaak tegen. Ze horen niet in een echt netwerk thuis.</p>

        <h3>Waarom zou je een netwerk opdelen?</h3>
        <p>Subnetten (segmenteren) doe je om drie redenen:</p>
        <ul>
          <li><strong>Overzicht en beheer</strong>: aparte subnetten voor servers, werkplekken, gasten en printers.</li>
          <li><strong>Prestaties</strong>: kleinere netwerken betekenen minder broadcastverkeer dat iedereen stoort.</li>
          <li><strong>Beveiliging</strong>: dit is cruciaal. Door netwerken te scheiden en er een firewall tussen te
            zetten, beperk je hoe ver een aanvaller kan komen. Breekt iemand in op het gastennetwerk, dan kan hij niet
            zomaar bij de servers. Dat heet het beperken van <em>laterale beweging</em> (lateral movement). Segmentatie
            is daarmee een echte beveiligingsmaatregel.</li>
        </ul>

        <div class="callout info">
          <p><strong>Voorbeeld:</strong> een ziekenhuis zet medische apparatuur in een apart, streng afgeschermd
          subnet. Raakt een gewone werkplek besmet met malware, dan kan die niet zomaar bij de apparatuur die aan
          patiënten vastzit. Segmentatie redt hier in het ergste geval levens.</p>
        </div>
      `,
      lab: {
        type: 'connections',
        title: 'welk adresblok?',
        prompt: 'Zestien adressen uit een firewalllog. Vier groepen van vier: privé (RFC 1918), loopback, APIPA en documentatie (RFC 5737).',
        flag: 'NM{vier_blokken_herkend}',
        groups: [
          { name: 'Privé (RFC 1918)', items: ['10.200.3.4', '172.20.5.9', '172.31.255.254', '192.168.77.1'] },
          { name: 'Loopback (127.0.0.0/8)', items: ['127.0.0.1', '127.0.1.1', '127.45.0.9', '127.255.255.254'] },
          { name: 'APIPA (169.254.0.0/16)', items: ['169.254.1.1', '169.254.77.20', '169.254.200.3', '169.254.0.99'] },
          { name: 'Documentatie (RFC 5737)', items: ['192.0.2.10', '198.51.100.7', '203.0.113.99', '192.0.2.200'] },
        ],
      },
      questions: [
        {
          q: 'Welke vlag krijg je als je alle vier de groepen in het lab hebt gevonden?',
          answer: ['NM{vier_blokken_herkend}'],
          hints: ['Begin met de groep die je het makkelijkst herkent: alles wat met 127 begint.', 'Let bij de 172-adressen op het tweede octet: alleen 16 t/m 31 is privé.', 'De vlag verschijnt onder het bord zodra de vierde groep klopt.'],
          explain: 'Privé: 10/8, 172.16/12 en 192.168/16. Loopback: 127/8. APIPA: 169.254/16. Documentatie: 192.0.2.0/24, 198.51.100.0/24 en 203.0.113.0/24.',
        },
        {
          q: 'In een log staan vijf bronadressen: 172.15.9.1, 172.16.9.1, 172.31.9.1, 172.32.9.1 en 192.169.0.5. Hoeveel daarvan zijn privé (RFC 1918)?',
          answer: ['2', 'twee'],
          hints: ['Leg elk adres naast de drie private blokken.', '172.16.0.0/12 loopt van 172.16 tot en met 172.31. En 192.168 is niet 192.169.', 'Alleen de adressen met tweede octet 16 en 31 vallen erin.'],
          wrong: {
            '4': 'Niet alles wat met 172 begint is privé. Het blok is een /12: alleen 172.16 t/m 172.31.',
            '5': 'Geen van de 172-adressen buiten 16 t/m 31 is privé, en 192.169 valt net buiten 192.168.0.0/16.',
            '3': 'Kijk nog eens naar 192.169.0.5: het private blok is 192.168.0.0/16, één lager.',
          },
          explain: 'Alleen 172.16.9.1 en 172.31.9.1 vallen binnen 172.16.0.0/12. De andere drie zijn publieke adressen.',
        },
        {
          q: 'Ik begrijp waarom netwerksegmentatie (subnetten met een firewall ertussen) ook een beveiligingsmaatregel is.',
          noAnswer: true,
        },
        {
          q: 'Hoeveel adressen telt het blok 172.16.0.0/12 in totaal? (alle adressen, dus zonder er twee af te trekken)',
          answer: ['1048576', '1.048.576', '2^20'],
          hints: ['Het aantal adressen is 2 tot de macht van het aantal hostbits.', '32 - 12 = 20 hostbits.', '2^20 is iets meer dan een miljoen.'],
          explain: '20 hostbits geven 2^20 = 1.048.576 adressen, van 172.16.0.0 tot en met 172.31.255.255.',
        },
      ],
    },

    {
      title: 'Taak 5 — IPv6-notatie verkorten',
      tryFirst: true,
      intro: '<p>Een netwerkkaart toont het adres <code>fe80:0000:0000:0000:0204:61ff:fe9d:f156</code>. Schrijf het zo kort mogelijk op. Er zijn maar twee regels; probeer ze zelf te bedenken voordat je de uitleg opent.</p>',
      content: `
        <p>Een IPv6-adres is 128 bits lang en wordt geschreven als acht groepen van vier hexadecimale tekens, gescheiden
        door dubbele punten. Voluit ziet dat er lang en onhandig uit, bijvoorbeeld:</p>
        <p><code>2001:0db8:0000:0000:0000:ff00:0042:8329</code></p>

        <p>Gelukkig mag je het verkorten met twee regels:</p>
        <ol>
          <li><strong>Voorloopnullen weglaten.</strong> In elke groep mag je nullen aan het begin schrappen. Zo wordt
            <code>0db8</code> &rarr; <code>db8</code>, <code>0000</code> &rarr; <code>0</code>, <code>0042</code> &rarr;
            <code>42</code>. Na deze stap: <code>2001:db8:0:0:0:ff00:42:8329</code>.</li>
          <li><strong>Eén reeks nulgroepen vervangen door <code>::</code>.</strong> De langste aaneengesloten reeks
            groepen die helemaal 0 zijn, mag je in zijn geheel vervangen door een dubbele dubbele punt. Dat mag maar
            <em>één keer</em> per adres (anders is het dubbelzinnig). Hier worden de drie nulgroepen in het midden
            <code>::</code>.</li>
        </ol>

        <p>Het eindresultaat is: <code>2001:db8::ff00:42:8329</code>. Reken maar na dat je er met het aantal groepen
        altijd weer op acht uitkomt als je <code>::</code> weer uitvouwt.</p>

        <p>Nog twee adressen die je vaak tegenkomt:</p>
        <ul>
          <li><code>::1</code> is de IPv6-loopback (de tegenhanger van 127.0.0.1).</li>
          <li><code>fe80::/10</code> zijn link-local adressen: alleen geldig binnen het eigen netwerksegment. Je zag er
            al eentje in de netwerken-room (<code>fe80::5054:ff:fea3:1f6b</code>).</li>
        </ul>

        <div class="callout warn">
          <p><strong>Let op:</strong> je mag <code>::</code> maar één keer gebruiken. <code>2001:db8::1::1</code> is
          ongeldig, want dan weet je niet meer hoeveel nulgroepen aan welke kant horen.</p>
        </div>
      `,
      questions: [
        {
          q: 'Verkort het IPv6-adres fe80:0000:0000:0000:0204:61ff:fe9d:f156 zo kort mogelijk.',
          answer: ['fe80::204:61ff:fe9d:f156'],
          hints: ['Er zijn twee stappen: nullen aan het begin van een groep, en een reeks groepen die helemaal nul zijn.', 'Schrap eerst de voorloopnul in 0204. Vervang daarna de drie nulgroepen door ::', 'Het resultaat begint met fe80:: en heeft daarna nog vier groepen.'],
          wrong: {
            'fe80::0204:61ff:fe9d:f156': 'De reeks nulgroepen is goed, maar in 0204 mag de voorloopnul ook weg.',
            'fe80:0:0:0:204:61ff:fe9d:f156': 'De voorloopnullen zijn weg, maar de drie nulgroepen kun je nog samen vervangen door ::',
            'fe8::204:61ff:fe9d:f156': 'Je mag alleen nullen aan het begin van een groep schrappen. De nul aan het eind van fe80 hoort bij de waarde.',
            'fe80::24:61ff:fe9d:f156': 'In 0204 mag alleen de eerste nul weg. De nul in het midden hoort bij de waarde.',
          },
          explain: '0204 wordt 204 en de drie nulgroepen worden samen ::, dus fe80::204:61ff:fe9d:f156. De fe80 verraadt een link-local adres.',
        },
        {
          q: 'Ik kan een IPv6-adres verkorten met de twee regels (voorloopnullen weg, één reeks nulgroepen als ::).',
          noAnswer: true,
        },
        {
          q: 'Hoeveel nulgroepen vervangt de :: in 2001:db8:85a3::8a2e:370:7334?',
          answer: ['2'],
          hints: ['Een volledig IPv6-adres heeft altijd acht groepen.', 'Tel hoeveel groepen er nu staan.', 'Acht min zes.'],
          explain: 'Er staan zes groepen; :: staat dus voor twee groepen 0000. Voluit: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.',
        },
        {
          q: 'Een router toont zijn interface binair: adres 10101100.00010011.11001010.01100101 met masker 255.255.252.0. Wat is het broadcastadres van het subnet waarin deze interface zit?',
          boss: true,
          answer: ['172.19.203.255'],
          hints: ['Dit zijn drie stappen achter elkaar: omrekenen, de prefix bepalen, het blok zoeken.', 'Het adres is 172.19.202.101. Het masker heeft zes enen in het derde octet.', 'Blokken van 4 in het derde octet: 202 valt in het blok 200 t/m 203.'],
          wrong: {
            '172.19.202.255': 'Je rekent alsof het een /24 is. Bij 255.255.252.0 horen ook de laatste twee bits van het derde octet bij het hostdeel.',
            '172.19.200.0': 'Dat is het netwerkadres. Het broadcastadres heeft alle hostbits op 1.',
            '172.19.204.0': 'Off-by-one: dat is het netwerkadres van het volgende subnet.',
            '172.19.203.254': 'Dat is de laatste bruikbare host. Het broadcastadres is één hoger.',
          },
          explain: 'Het adres is 172.19.202.101, het masker is /22. Blokgrootte 256 - 252 = 4 in het derde octet: het subnet is 172.19.200.0/22 en eindigt op 172.19.203.255.',
        },
      ],
    },

    {
      title: 'Taak 6 — Verdieping: randgevallen en subnetten in de praktijk',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>De regels uit deze room kloppen voor bijna elk subnet. Hier staan de uitzonderingen en de manier waarop
        beheerders er echt mee werken.</p>

        <h3>Waar komt "min twee" vandaan, en wanneer geldt het niet?</h3>
        <p>Het netwerkadres en het broadcastadres zijn afspraken, geen natuurwet. Op een verbinding tussen precies twee
        routers heb je geen broadcast nodig. RFC 3021 (2000) staat daarom toe dat je op zo'n punt-tot-puntverbinding
        een <strong>/31</strong> gebruikt: twee adressen, allebei bruikbaar. Een <strong>/32</strong> is één enkel
        adres; je ziet het in routetabellen (een hostroute) en in firewallregels die precies één apparaat bedoelen. De
        calculator in deze room toont bij /31 en /32 nul bruikbare hosts, omdat hij de klassieke formule volgt.</p>

        <h3>Van klassen naar CIDR</h3>
        <p>Vroeger bepaalde het eerste octet hoe groot een netwerk was: klasse A (/8), B (/16) of C (/24). Dat gaf
        veel verspilling. Sinds 1993 geldt CIDR (nu beschreven in RFC 4632 uit 2006): de prefix mag overal liggen.
        Termen als "een klasse C-netwerk" hoor je nog steeds, maar ze betekenen alleen nog "een /24".</p>

        <h3>VLSM en samenvatten</h3>
        <p>Met <strong>VLSM</strong> (Variable Length Subnet Mask) geef je elk deel van het netwerk een subnet op maat.
        Je begint met het grootste subnet en werkt naar het kleinste, zodat de blokken netjes op een grens beginnen en
        niet overlappen. Het omgekeerde heet <strong>samenvatten</strong> (supernetting): aansluitende subnetten die
        samen precies één groter blok vormen, schrijf je als één route. Vier aansluitende /24's die op een veelvoud
        van vier beginnen, worden één /22.</p>

        <h3>Hoe het in de praktijk gaat</h3>
        <ul>
          <li>Niemand rekent grote adresplannen uit het hoofd. Beheerders gebruiken een rekenhulp of een
            IPAM-systeem (IP Address Management). Het hoofdrekenen heb je nodig om een fout te <em>herkennen</em>.</li>
          <li>Cloudplatformen reserveren soms meer dan twee adressen per subnet. AWS houdt er in elk VPC-subnet vijf
            achter: de eerste vier en het laatste.</li>
          <li>Een subnet is pas een beveiligingsgrens als er een firewall of ACL tussen staat. Twee subnetten op
            dezelfde router zonder regels ertussen houden niemand tegen.</li>
        </ul>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Het broadcastadres of het netwerkadres aan een apparaat geven.</li>
          <li>Het verkeerde octet nemen: bij /17 tot en met /23 ligt de grens in het derde octet.</li>
          <li>Twee apparaten in hetzelfde VLAN een verschillend masker geven. Ze bereiken elkaar dan soms wel en soms
            niet, afhankelijk van de richting.</li>
          <li>Overlappende subnetten uitdelen, bijvoorbeeld 10.0.0.0/23 en 10.0.1.0/24.</li>
        </ul>
      `,
      questions: [
        {
          q: 'Je hebt 192.168.50.0/24. Met VLSM maak je eerst een subnet voor 100 hosts en direct daarna een subnet voor 50 hosts. Welk netwerkadres met prefix krijgt het tweede subnet?',
          answer: ['192.168.50.128/26'],
          hints: ['Bepaal eerst hoe groot het eerste subnet moet zijn en waar het eindigt.', '100 hosts passen in een /25 (126 hosts): 192.168.50.0 t/m .127.', 'Het tweede begint op .128 en moet 50 hosts kunnen bevatten.'],
          wrong: {
            '192.168.50.128/25': 'Een /25 past, maar is twee keer zo groot als nodig. Voor 50 hosts volstaat een kleiner blok.',
            '192.168.50.100/26': 'Een subnet begint altijd op een blokgrens. Het eerste subnet is een /25 en loopt tot en met .127.',
            '192.168.50.64/26': 'Dat blok ligt binnen het eerste subnet (192.168.50.0/25) en overlapt dus.',
          },
          explain: 'Het eerste subnet is 192.168.50.0/25. Het tweede begint op .128; 50 hosts passen in een /26 (62 hosts).',
        },
        {
          q: 'Vat de vier netwerken 10.8.4.0/24, 10.8.5.0/24, 10.8.6.0/24 en 10.8.7.0/24 samen in één route.',
          answer: ['10.8.4.0/22'],
          hints: ['Vier aansluitende /24-netwerken vormen samen een blok van 4 in het derde octet.', 'Welk masker geeft blokken van 4 in het derde octet?', 'Het blok begint bij het laagste netwerk.'],
          explain: 'Vier /24\'s die op een veelvoud van vier beginnen, vormen samen een /22: 10.8.4.0 t/m 10.8.7.255.',
        },
        {
          q: 'Hoeveel adressen kun je in een AWS-subnet van /28 aan je eigen servers geven?',
          answer: ['11'],
          hints: ['Reken eerst het totaal aantal adressen van een /28 uit.', 'Een /28 heeft 16 adressen.', 'Trek er het aantal af dat AWS zelf reserveert.'],
          explain: 'Een /28 telt 16 adressen. AWS reserveert er vijf, dus er blijven 11 over.',
        },
      ],
    },

    {
      title: 'Taak 7 — Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examens over netwerken vragen zelden naar een definitie. Je krijgt een korte situatie en vier antwoorden
        die allemaal plausibel lijken. De afleiders zijn bijna altijd dezelfde fouten: het netwerkadres of
        broadcastadres in plaats van een host, één blok te ver, of een prefix die net te groot of te klein is.</p>
        <p>Werkwijze: schrijf de blokgrootte op, zoek het blok, en streep dan pas antwoorden weg. Deze vier vragen
        zijn zelf geschreven in examenstijl.</p>
      `,
      questions: [
        {
          q: 'Een bedrijf heeft 192.168.8.0/24 en wil vier afdelingen elk een eigen subnet geven. De grootste afdeling heeft 50 apparaten. Welke prefix past het best voor alle vier de subnetten?',
          options: ['/25', '/26', '/27', '/28'],
          answer: 1,
          wrong: {
            0: 'Een /25 biedt 126 hosts, maar in een /24 passen maar twee /25-subnetten. Je hebt er vier nodig.',
            2: 'Een /27 geeft acht subnetten, maar elk met 30 hosts. Dat is te weinig voor 50 apparaten.',
            3: 'Een /28 biedt 14 hosts per subnet: veel te klein.',
          },
          explain: 'Een /26 verdeelt de /24 in precies vier subnetten van elk 62 bruikbare hosts.',
        },
        {
          q: 'Een router heeft op een punt-tot-puntverbinding het adres 10.1.2.77/30. Welk adres heeft de router aan de andere kant?',
          options: ['10.1.2.76', '10.1.2.78', '10.1.2.79', '10.1.2.80'],
          answer: 1,
          wrong: {
            0: '10.1.2.76 is het netwerkadres van dit /30-subnet.',
            2: '10.1.2.79 is het broadcastadres van dit subnet.',
            3: '10.1.2.80 is het netwerkadres van het volgende /30-subnet.',
          },
          explain: 'Een /30 heeft blokken van 4: 76 t/m 79. Bruikbaar zijn alleen .77 en .78.',
        },
        {
          q: 'Een medewerker meldt dat haar laptop geen netwerk heeft. Je ziet dat de laptop het adres 169.254.33.7 heeft. Wat is de meest waarschijnlijke oorzaak?',
          options: ['De DNS-server geeft verkeerde antwoorden', 'De laptop kan de DHCP-server niet bereiken', 'Een ander apparaat gebruikt hetzelfde IP-adres', 'De firewall blokkeert uitgaand webverkeer'],
          answer: 1,
          wrong: {
            0: 'Bij een DNS-probleem heeft de laptop wel een normaal adres, maar lukt het omzetten van namen niet.',
            2: 'Een adresconflict geeft een melding, maar geen 169.254-adres.',
            3: 'Een firewall blokkeert verkeer, maar verandert het adres van de laptop niet.',
          },
          explain: '169.254.0.0/16 is APIPA: de laptop gaf zichzelf een adres omdat er geen antwoord van een DHCP-server kwam.',
        },
        {
          q: 'Een firewallregel moet precies de adressen 172.16.5.0 tot en met 172.16.5.31 toelaten. Welke notatie gebruik je?',
          options: ['172.16.5.0/26', '172.16.5.0/27', '172.16.5.0/28', '172.16.5.31/32'],
          answer: 1,
          wrong: {
            0: 'Een /26 loopt van .0 tot en met .63 en laat dus twee keer zoveel adressen toe.',
            2: 'Een /28 loopt van .0 tot en met .15: de helft ontbreekt.',
            3: 'Een /32 is precies één adres, hier alleen .31.',
          },
          explain: 'Een /27 is een blok van 32 adressen: 172.16.5.0 t/m 172.16.5.31.',
        },
      ],
    },
  ],
  terms: [
    { term: 'Bit', def: 'De kleinste eenheid: een 0 of een 1.' },
    { term: 'Octet', def: 'Acht bits samen; een IPv4-adres bestaat uit vier octetten (32 bits).' },
    { term: 'Subnetmasker', def: 'Geeft met enen en nullen aan welk deel van een IP-adres het netwerkdeel is en welk deel het hostdeel.' },
    { term: 'CIDR', def: 'Notatie die het aantal netwerkbits achter een schuine streep zet, bijvoorbeeld /24 voor 255.255.255.0.' },
    { term: 'Netwerkadres', def: 'Het adres met alle hostbits op 0; de naam van het subnet, niet voor een apparaat.' },
    { term: 'Broadcastadres', def: 'Het adres met alle hostbits op 1; bereikt alle apparaten in het subnet tegelijk.' },
    { term: 'Bruikbare hosts', def: 'Het aantal adressen voor apparaten in een subnet: 2^(hostbits) min 2.' },
    { term: 'Private range', def: 'Adresblokken (RFC 1918) voor eigen netwerken: 10.0.0.0/8, 172.16.0.0/12 en 192.168.0.0/16; niet routeerbaar op internet.' },
    { term: 'Loopback', def: 'Het blok 127.0.0.0/8 (meestal 127.0.0.1), verkeer naar jezelf dat de netwerkkaart niet verlaat.' },
    { term: 'APIPA', def: 'Het blok 169.254.0.0/16 dat een apparaat zichzelf geeft als er geen DHCP-server bereikbaar is.' },
    { term: 'Segmentatie', def: 'Een netwerk opdelen in subnetten, onder meer om de bewegingsvrijheid van een aanvaller te beperken.' },
    { term: 'IPv6', def: '128-bits adres, geschreven als acht hexadecimale groepen, te verkorten met voorloopnullen weglaten en één :: voor een reeks nulgroepen.' },
  ],
  resources: [
    { title: 'Cloudflare Learning Center', url: 'https://www.cloudflare.com/learning/' },
    { title: 'OverTheWire: Bandit', url: 'https://overthewire.org/wargames/bandit/' },
    { title: 'TryHackMe', url: 'https://tryhackme.com/' },
  ],
});
