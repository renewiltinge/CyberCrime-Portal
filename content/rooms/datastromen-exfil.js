/* Room: Datastromen & exfiltratie herkennen — puzzelpad "Puzzels & uitdagingen" */

// --- Egress/proxy-log voor het logs-lab (taak 5) ---
// Een web-/egress-proxy ziet alleen uitgaand verkeer naar het internet. Erin verstopt:
//  * C2-beaconing: elke ~60s (met jitter) een piepklein POST'je naar cdn-telemetry.c2relay.nm.lab
//  * één gigantische PUT van exfil.7z (±450 MB) naar de zeldzame bestemming opslag-x9f3.nm.lab
//  * twee vlaggen: in een gedecodeerd C2-antwoord en in de soc_note bij de upload.
// Normaal surfverkeer (nos.nl, mail.google.com, o365, gemeente.nl, jsdelivr) zit ertussen als ruis.
const EXFIL_PROXY_LOG = `# egress-proxy  nm.lab  2026-10-11   kolommen: tijd | client | verdict | methode | bestemming | up=bytes_omhoog down=bytes_omlaag [note]
2026-10-11 02:00:11  WS-MKT-04  allow  GET   nos.nl                               up=612        down=48310
2026-10-11 02:00:52  WS-FIN-03  allow  GET   intranet.nm.lab                     up=410        down=12044
2026-10-11 02:01:40  WS-HR-02   allow  GET   mail.google.com                      up=1820       down=23110
2026-10-11 02:02:39  WS-MKT-04  allow  GET   cdn.jsdelivr.net                     up=180        down=88214
2026-10-11 02:03:05  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=228        down=96     note=klein_vast_pakketje
2026-10-11 02:03:51  WS-FIN-03  allow  GET   o365.portal.nm.lab                  up=940        down=15502
2026-10-11 02:04:01  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=231        down=96     note=klein_vast_pakketje
2026-10-11 02:04:48  WS-HR-02   allow  GET   portaal.gemeente.nl                  up=330        down=9900
2026-10-11 02:05:12  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=226        down=140    note=C2-antwoord_gedecodeerd:"sleep=60;jitter=10" tag=NM{baken_ritme}
2026-10-11 02:05:59  WS-MKT-04  allow  GET   weerdienst.nl                        up=210        down=7404
2026-10-11 02:06:03  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=233        down=96     note=klein_vast_pakketje
2026-10-11 02:07:09  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=227        down=96     note=klein_vast_pakketje
2026-10-11 02:08:02  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=229        down=96     note=klein_vast_pakketje
2026-10-11 02:21:17  WS-FIN-03  allow  GET   nos.nl                               up=560        down=51220
2026-10-11 02:40:33  WS-HR-02   allow  GET   mail.google.com                      up=2110       down=19877
2026-10-11 02:55:46  WS-MKT-04  allow  GET   cdn.jsdelivr.net                     up=175        down=64012
2026-10-11 03:01:58  WS-FIN-03  allow  GET   o365.portal.nm.lab                  up=880        down=14003
2026-10-11 03:05:02  WS-FIN-03  ALERT  PUT   opslag-x9f3.nm.lab                  up=471859200  down=512    note=exfil.7z_zeldzame_bestemming_nooit_eerder_gezien  soc_note=NM{egress_betrapt}
2026-10-11 03:05:49  WS-FIN-03  allow  GET   intranet.nm.lab                     up=402        down=11890
2026-10-11 03:09:12  WS-MKT-04  ALERT  POST  cdn-telemetry.c2relay.nm.lab        up=230        down=96     note=klein_vast_pakketje`;

CS.registerRoom({
  id: 'datastromen-exfil',
  path: 'puzzels',
  order: 2,
  title: 'Datastromen & exfiltratie herkennen',
  icon: '📤',
  difficulty: 'Moeilijk',
  minutes: 70,
  summary: 'Data gedraagt zich als een stroom: met een richting, een volume en een poort. Je leert hoe gestolen data naar buiten lekt — via beaconing/C2, DNS-tunneling en de klassieke keten staging → compressie → encryptie → upload — en hoe je dat spoor opspoort met volume-, timing- en bestemmingsanalyse.',
  objectives: [
    'Uitleggen hoe data door een netwerk "stroomt": richting (ingress/egress), volume en poorten',
    'C2-beaconing herkennen aan een regelmatig ritme, en begrijpen wat jitter doet',
    'DNS-tunneling herkennen aan veel lange, ongewone subdomeinen naar één domein',
    'De exfil-keten beschrijven: collectie → staging → compressie → encryptie → upload',
    'Exfiltratie opsporen met volume-, timing- en bestemmingsanalyse (baseline + zeldzame bestemmingen)',
    'Een exfil-tijdlijn reconstrueren en de bevindingen reproduceerbaar rapporteren',
  ],
  tasks: [
    {
      title: 'Taak 1 — Data als stroom: richting, volume, poort',
      content: `
        <p>Een netwerk lijkt op een waterleidingstelsel. Door de buizen stroomt geen water maar <strong>data</strong>, en
        net als water heeft die stroom drie eigenschappen die je kunt meten: een <strong>richting</strong> (waarheen gaat
        het?), een <strong>volume</strong> (hoeveel bytes?) en een <strong>poort</strong> (via welk "kanaal"?). Wie
        datadiefstal wil betrappen, leert eerst deze drie te lezen.</p>

        <h3>Richting: ingress en egress</h3>
        <p>Verkeer dat jouw netwerk <em>binnenkomt</em> heet <strong>ingress</strong>; verkeer dat naar buiten gaat heet
        <strong>egress</strong>. Bij normaal surfen is de download (ingress) veel groter dan de upload (egress): je haalt
        pagina's en video's op, je stuurt maar een paar toetsaanslagen terug. <strong>Exfiltratie draait dat om</strong>:
        plotseling gaat er veel data de deur <em>uit</em>. Een opvallend grote egress-stroom is daarom een klassiek alarm.</p>

        <figure class="diagram">
          <svg viewBox="0 0 640 170" role="img" aria-label="Datastroom: werkstation, staging-host en cloudopslag">
            <rect x="12" y="60" width="120" height="48" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="72" y="80" text-anchor="middle" fill="currentColor" font-size="13">Werkstation</text>
            <text x="72" y="97" text-anchor="middle" fill="currentColor" font-size="13">(bron)</text>
            <rect x="250" y="60" width="130" height="48" rx="8" fill="var(--accent-soft)" stroke="currentColor"/>
            <text x="315" y="80" text-anchor="middle" fill="currentColor" font-size="13">Staging-host</text>
            <text x="315" y="97" text-anchor="middle" fill="currentColor" font-size="13">(verzamelplaats)</text>
            <rect x="500" y="60" width="128" height="48" rx="8" fill="var(--surface-2)" stroke="currentColor"/>
            <text x="564" y="80" text-anchor="middle" fill="currentColor" font-size="13">Cloudopslag</text>
            <text x="564" y="97" text-anchor="middle" fill="currentColor" font-size="13">(buiten · egress)</text>
            <line x1="132" y1="84" x2="248" y2="84" stroke="var(--accent)" stroke-width="2"/>
            <polygon points="248,84 238,79 238,89" fill="var(--accent)"/>
            <line x1="380" y1="84" x2="498" y2="84" stroke="var(--bad)" stroke-width="2"/>
            <polygon points="498,84 488,79 488,89" fill="var(--bad)"/>
            <text x="190" y="50" text-anchor="middle" fill="currentColor" font-size="13">kopiëren</text>
            <text x="439" y="50" text-anchor="middle" fill="currentColor" font-size="13">upload (egress)</text>
            <line x1="315" y1="130" x2="315" y2="150" stroke="currentColor"/>
            <text x="315" y="165" text-anchor="middle" fill="currentColor" font-size="13">hier wordt gebundeld, gecomprimeerd en versleuteld</text>
          </svg>
          <figcaption>De data stroomt van veel bronnen naar één verzamelplaats, en verlaat daar in één keer het netwerk.</figcaption>
        </figure>

        <h3>Volume: bytes tellen</h3>
        <p>Een netwerkmonitor telt per verbinding het aantal verstuurde bytes. Dat maak je leesbaar met eenheden:
        1 <strong>KB</strong> ≈ duizend bytes, 1 <strong>MB</strong> ≈ miljoen bytes, 1 <strong>GB</strong> ≈ miljard
        bytes. Een enkele e-mail is kilobytes; een gestolen klantenbestand of een map vol documenten is al snel honderden
        megabytes. Omdat exacte bytes lastig lezen, reken je ze om: 471.859.200 bytes zijn ongeveer 450 MB
        (deel door 1.048.576).</p>

        <h3>Poort: via welk kanaal?</h3>
        <p>Elke stroom kiest een <strong>poort</strong>, een genummerd kanaal. Een paar die je vaak tegenkomt:</p>
        <table>
          <thead><tr><th>Poort</th><th>Protocol</th><th>Normaal gebruik</th></tr></thead>
          <tbody>
            <tr><td>53</td><td>DNS</td><td>Namen opzoeken — bijna nooit geblokkeerd (let op: tunneling)</td></tr>
            <tr><td>80</td><td>HTTP</td><td>Onversleuteld web — data leesbaar in de stroom</td></tr>
            <tr><td>443</td><td>HTTPS/TLS</td><td>Versleuteld web — inhoud verborgen, metadata zichtbaar</td></tr>
            <tr><td>22</td><td>SSH/SCP</td><td>Beheer en bestandsoverdracht</td></tr>
          </tbody>
        </table>
        <p>Aanvallers kiezen graag poort 443: versleuteld verkeer valt niet op en mag overal naar buiten. Maar ook door
        zo'n dichte buis verraadt de stroom zich — via zijn <em>richting</em>, <em>volume</em> en <em>ritme</em>, zoals je
        in deze room gaat zien.</p>

        <div class="callout info">
          <strong>Baseline eerst:</strong> "veel egress" betekent alleen iets als je weet wat normaal is. Daarom meet een
          SOC eerst een <strong>baseline</strong> (het gewone patroon per host en per tijdstip). Pas tegen die achtergrond
          springt een afwijking eruit. Alles in deze room is fictief: documentatie-domeinen (<code>*.nm.lab</code>) en een
          afgeschermd oefenlab.
        </div>
      `,
      questions: [
        { q: 'Hoe heet verkeer dat jouw netwerk verlaat (naar buiten gaat)?', answer: ['egress'], hint: 'Het tegenovergestelde van ingress.', explain: 'Egress = uitgaand verkeer. Bij exfiltratie is juist de egress-stroom ongewoon groot.' },
        { q: 'Waarom is een plotseling grote uitgaande stroom verdacht?', options: ['Bij normaal surfen download je veel meer dan je upload; veel egress kan datadiefstal zijn', 'Omdat upload altijd verboden is', 'Omdat DNS dan niet meer werkt', 'Omdat poort 443 kapot is'], answer: 0, explain: 'Normaal is ingress >> egress. Een grote egress-piek draait dat om en wijst mogelijk op exfiltratie.' },
        { q: 'Ongeveer hoeveel MB is 471.859.200 bytes (deel door 1.048.576)?', answer: ['450', '450 MB', '450 mb'], hint: '471.859.200 ÷ 1.048.576.', explain: '471.859.200 ÷ 1.048.576 = precies 450 MB. Bytes omrekenen maakt volumes leesbaar.' },
        { q: 'Welke poort gebruiken aanvallers graag omdat het verkeer versleuteld is en overal naar buiten mag?', answer: ['443'], hint: 'De standaardpoort voor HTTPS/TLS.', explain: 'Poort 443 (HTTPS/TLS): de inhoud is verborgen, dus C2 en exfil vallen minder op — maar de metadata verraadt ze alsnog.' },
      ],
    },

    {
      title: 'Taak 2 — Beaconing & C2: het ritme verraadt de malware',
      content: `
        <p>Nadat malware een computer heeft besmet, wil hij opdrachten ontvangen. Daarvoor belt hij regelmatig "naar huis",
        naar een <strong>command-and-control</strong>-server (<strong>C2</strong>). Dat regelmatige inchecken heet
        <strong>beaconing</strong>: als een vuurtoren die met vaste tussenpozen knippert. Elk baken is klein — "ik leef
        nog, heb je werk voor me?" — en het antwoord is meestal ook klein: "nee, slaap 60 seconden" of een opdracht.</p>

        <h3>Mensen surfen grillig, malware tikt als een klok</h3>
        <p>Een mens die browst, maakt onregelmatige, verschillend grote verbindingen: nu een artikel, dan drie minuten
        niets, dan een video. Een baken daarentegen is <strong>regelmatig</strong> en <strong>bijna even groot</strong>.
        Juist die saaie regelmaat is het signaal. In een egress-log zie je dan steeds hetzelfde interne werkstation op
        vaste intervallen een piepklein pakketje naar hetzelfde externe adres sturen.</p>

        <div class="callout tip">
          <strong>Voorbeeld:</strong> elke ~60 seconden een POST van ~230 bytes naar <code>cdn-telemetry.c2relay.nm.lab</code>.
          De naam klinkt als een onschuldige "telemetrie-CDN", maar het strakke ritme hoort bij geen enkele normale
          webdienst. Dat is een baken.
        </div>

        <h3>Jitter: het ritme expres rommelig maken</h3>
        <p>Slimme aanvallers weten dat een té perfect ritme opvalt. Daarom voegen ze <strong>jitter</strong> toe: een
        willekeurige variatie op het interval. In plaats van exact elke 60 seconden checkt het baken dan bijvoorbeeld na 54,
        67, 58 of 71 seconden in. Het blijft "ongeveer elke minuut", maar nét onregelmatig genoeg om een simpele "exact elke
        60s"-regel te misleiden. Een goede detectie kijkt daarom niet naar een exact interval, maar naar de
        <em>regelmaat van een smalle bandbreedte</em> rond een gemiddelde — en naar het feit dat het altijd hetzelfde,
        zelden-bezochte doel is.</p>

        <h3>Waarom metadata genoeg is</h3>
        <p>Ook als het beaconverkeer via poort 443 versleuteld is en je de inhoud niet kunt lezen, verraadt de
        <strong>metadata</strong> het baken: vast doel, vast (ongeveer) interval, vaste kleine grootte. Precies daarom werkt
        netwerkdetectie ook bij versleuteld verkeer.</p>

        <div class="callout warn">
          <strong>Let op de naam:</strong> aanvallers kiezen expres domeinen die op legitieme infrastructuur lijken
          (<code>cdn-</code>, <code>telemetry</code>, <code>update-</code>, <code>sync-</code>). Laat je niet geruststellen
          door een onschuldig ogende naam; kijk naar het gedrag en of het domein ooit eerder is gezien.
        </div>
      `,
      questions: [
        { q: 'Hoe heet het regelmatig "inchecken" van malware bij zijn C2-server?', answer: ['beaconing', 'beacon'], hint: 'Als een vuurtoren die steeds knippert.', explain: 'Beaconing: het besmette systeem checkt op (ongeveer) vaste intervallen in bij de command-and-control-server.' },
        { q: 'Waarvoor staat C2?', answer: ['command-and-control', 'command and control', 'command-control'], hint: 'De server die de besmette machines aanstuurt.', explain: 'C2 = command-and-control: de server waarmee besmette systemen contact houden om opdrachten te krijgen.' },
        { q: 'Wat doet jitter?', options: ['Het voegt willekeurige variatie aan het beacon-interval toe om detectie te bemoeilijken', 'Het versleutelt de inhoud van het baken', 'Het vergroot elk pakket tot 1 MB', 'Het blokkeert DNS'], answer: 0, explain: 'Jitter maakt het ritme expres rommelig (bijv. 54–71s i.p.v. exact 60s), zodat een "exact 60s"-regel het mist.' },
        { q: 'Waardoor valt een baken op, ook al is het verkeer via poort 443 versleuteld?', options: ['De metadata: vast doel, ongeveer vast interval, vaste kleine grootte', 'De leesbare inhoud van het pakket', 'Een foutmelding in de browser', 'Het wachtwoord in het pakket'], answer: 0, explain: 'Je hoeft de inhoud niet te zien: het gedrag (regelmaat, grootte, vast doel) verraadt het baken.' },
      ],
    },

    {
      title: 'Taak 3 — DNS-tunneling: data verstopt in subdomeinen',
      content: `
        <p>Soms lekt data niet via een dikke upload naar buiten, maar sijpelt ze weg door een kanaal dat bijna nooit
        geblokkeerd wordt: <strong>DNS</strong> (poort 53). Elk netwerk moet namen kunnen opzoeken, dus DNS mag meestal
        gewoon naar buiten. Aanvallers misbruiken dat met <strong>DNS-tunneling</strong>: ze stoppen de gestolen data in de
        <em>naam</em> die ze opvragen.</p>

        <h3>Het trucje</h3>
        <p>Normaal vraagt een computer af en toe een adres op: "welk IP hoort bij <code>nos.nl</code>?" Bij DNS-tunneling
        codeert de malware een stukje gestolen data en zet dat als <strong>subdomein</strong> vóór een domein dat hij zelf
        beheert. Dan vraagt hij dat op. De opvraging reist door elke firewall heen naar de kwaadaardige nameserver, die de
        data uit de naam pelt. Het ziet er zo uit:</p>
        <pre><code>mz2wk3-chunk00-aegh5t7q.exfil.nm.lab
nf4xq1-chunk01-k9plm2wd.exfil.nm.lab
pq7za9-chunk02-r3nxc8vb.exfil.nm.lab</code></pre>

        <h3>Waaraan je het herkent</h3>
        <ul>
          <li><strong>Veel, lange, willekeurig ogende subdomeinen</strong> — elk "stukje" (chunk) is een brok gecodeerde data.</li>
          <li><strong>Alles naar hetzelfde "domein"</strong> (hier <code>exfil.nm.lab</code>) en dezelfde nameserver.</li>
          <li><strong>Veel TXT-queries</strong>. Het TXT-record mag willekeurige tekst bevatten en is daarom geliefd voor
          tunneling, maar ook A- en CNAME-queries worden misbruikt.</li>
          <li><strong>Hoge frequentie en volume</strong> voor DNS: een gewone client vraagt niet tientallen lange namen per
          minuut naar één domein op.</li>
        </ul>

        <div class="callout info">
          <strong>Waarom dit werkt:</strong> firewalls laten DNS bijna altijd door. Door data in subdomeinen te verpakken,
          "tunnelt" de aanvaller zijn verkeer dwars door de firewall. Maar het patroon — veel lange namen naar één zelden
          gebruikt domein — is juist de manier om het te betrappen. Verdedigers kijken naar de hoeveelheid DNS per host, de
          lengte en entropie (willekeurigheid) van de namen, en naar nieuwe, onbekende domeinen.
        </div>

        <div class="callout tip">
          <strong>Tunnelen vs. beaconen:</strong> DNS-tunneling smokkelt <em>data</em> naar buiten via naamopvragingen;
          beaconing houdt vooral <em>contact</em> (kleine check-ins). Een aanvaller gebruikt soms beide tegelijk. In beide
          gevallen is de kern hetzelfde: een stroom met een ongewone richting, frequentie en bestemming.
        </div>
      `,
      questions: [
        { q: 'Welke techniek verstopt gestolen data in de naam die via DNS wordt opgevraagd?', answer: ['DNS-tunneling', 'dns-tunneling', 'dns tunneling', 'dns-tunnel'], hint: 'Data wordt door DNS heen "getunneld".', explain: 'DNS-tunneling verpakt data in (sub)domeinnamen die door de firewall mogen.' },
        { q: 'Welk DNS-recordtype kan willekeurige tekst bevatten en is daarom geliefd voor tunneling?', answer: ['TXT', 'txt'], hint: 'Niet A of MX; het type voor vrije tekst.', explain: 'Het TXT-record mag vrije tekst bevatten, ideaal om gecodeerde data in te vervoeren.' },
        { q: 'Welk "domein" wordt in het voorbeeld misbruikt als datakanaal (het deel achter de willekeurige subdomeinen)?', answer: ['exfil.nm.lab'], hint: 'Kijk wat er steeds achter de chunk-namen staat.', explain: 'Alle namen eindigen op exfil.nm.lab: dat is het kanaal naar de kwaadaardige nameserver.' },
        { q: 'Waarom is DNS een aantrekkelijk sluipkanaal voor aanvallers?', options: ['Firewalls laten DNS bijna altijd door, dus het verkeer mag ongehinderd naar buiten', 'DNS is altijd versleuteld', 'DNS kan geen data vervoeren', 'DNS werkt alleen binnen het LAN'], answer: 0, explain: 'Omdat naamopvragingen bijna overal mogen, tunnelt data via DNS dwars door de firewall.' },
      ],
    },

    {
      title: 'Taak 4 — De exfil-keten: staging → compressie → encryptie → upload',
      content: `
        <p>Grote datadiefstal gebeurt zelden in één klap. Aanvallers volgen meestal een vaste <strong>keten</strong>, en
        elke schakel laat sporen na. Wie de keten kent, weet waar hij moet kijken.</p>
        <ol>
          <li><strong>Collectie</strong> — de aanvaller zoekt waardevolle bestanden (klantgegevens, HR-dossiers, broncode)
          op meerdere machines en servers.</li>
          <li><strong>Staging</strong> — hij kopieert alles naar één <strong>verzamelplaats</strong> (een "staging-host"),
          vaak een interne server die toch al veel verkeer krijgt, zodat het kopiëren niet opvalt.</li>
          <li><strong>Compressie</strong> — hij bundelt en comprimeert de buit tot één archief (bijv. een
          <code>.7z</code> of <code>.zip</code>). Dat maakt het kleiner en handzamer: de upload is korter en valt minder op.</li>
          <li><strong>Encryptie</strong> — hij versleutelt het archief met een wachtwoord. Nu kun jij als verdediger niet
          meer zien wát er in zit, zelfs als je het archief onderschept.</li>
          <li><strong>Upload (exfiltratie)</strong> — hij stuurt het archief naar buiten, naar een cloudbucket, een
          bestandsdienst of zijn C2.</li>
        </ol>

        <h3>Datastromen optellen</h3>
        <p>Het lab hieronder toont de datastromen in <strong>MB</strong> als een stroomdiagram. Twee werkstations kopiëren
        hun buit naar de staging-host <code>SRV-ARCHIEF</code>; daar wordt alles gecomprimeerd en versleuteld tot
        <code>exfil.7z</code> en in één keer naar de cloudbucket <code>opslag-x9f3.nm.lab</code> geüpload. Let op: er loopt
        óók een legitieme nachtelijke back-up naar <code>SRV-BACKUP-01</code> — die hoort <em>niet</em> bij de aanval. Klik
        op een knoop om in- en uitgaand verkeer te zien, of lees de transactietabel.</p>

        <div class="callout tip">
          <strong>Reken na:</strong> de inkomende stromen op de staging-host tel je op. De uitgaande stroom (het
          gecomprimeerde archief) is kleiner dan de som van de bronnen — dat verschil is de
          <strong>compressie</strong>. Deel de inkomende data door de uitgaande en je kent de compressiefactor. Wat op de
          host achterblijft, is het <em>saldo</em> (in min uit).
        </div>

        <h3>Waarom dit voor jou goed nieuws is</h3>
        <p>Elke schakel is een kans om de aanval te zien of te stoppen: een werkstation dat ineens honderden MB naar een
        interne server kopieert (collectie/staging), een archiveringsprogramma dat op een rare plek draait (compressie), of
        een grote upload naar een nooit eerder geziene bestemming (exfiltratie). Eén gemiste schakel hoeft dus niet fataal
        te zijn; detectie werkt in lagen.</p>
      `,
      lab: {
        type: 'flow',
        title: 'Operatie Lekkende Kraan — datavolumes (MB)',
        unit: 'MB',
        scenario: 'Reconstructie van een exfiltratie bij het fictieve bedrijf NineMinds. Volg de data (in MB) van de werkstations, via de staging-host SRV-ARCHIEF, naar de cloudbucket. Eén stroom is een legitieme back-up — trap daar niet in.',
        nodes: [
          { id: 'ws1', type: 'victim', label: 'WS-FIN-03 (financiën)' },
          { id: 'ws2', type: 'victim', label: 'WS-HR-02 (HR)' },
          { id: 'stage', type: 'service', label: 'SRV-ARCHIEF (staging-host)' },
          { id: 'backup', type: 'service', label: 'SRV-BACKUP-01 (legitieme back-up)' },
          { id: 'cloud', type: 'cashout', label: 'opslag-x9f3.nm.lab (cloudbucket)' },
        ],
        edges: [
          { from: 'ws1', to: 'backup', amount: 300, time: '2026-10-11 01:00', note: 'nachtelijke back-up (legitiem)' },
          { from: 'ws1', to: 'stage', amount: 1200, time: '2026-10-11 02:34', note: 'klant-export .csv' },
          { from: 'ws2', to: 'stage', amount: 600, time: '2026-10-11 02:40', note: 'HR-dossiers .zip' },
          { from: 'stage', to: 'cloud', amount: 450, time: '2026-10-11 03:05', note: 'exfil.7z (gecomprimeerd + versleuteld)' },
        ],
        ask: [
          { q: 'Hoeveel MB komt er in totaal binnen op de staging-host SRV-ARCHIEF? (tel de inkomende stromen op)', answer: ['1800', '1800 MB', '1800 mb'], hint: 'Klik op SRV-ARCHIEF en lees "in", of tel de twee kwaadaardige inkomende pijlen: 1200 + 600.' },
          { q: 'Hoeveel MB verlaat het netwerk naar de cloudbucket opslag-x9f3.nm.lab?', answer: ['450', '450 MB', '450 mb'], hint: 'De enige stroom die écht de deur uit gaat, naar buiten.' },
          { q: 'Met welke factor kromp de buit door compressie op de staging-host? (inkomend ÷ uitgaand)', answer: ['4', '4x', 'factor 4', '4.0'], hint: '1800 ÷ 450.' },
          { q: 'Hoeveel MB bleef als ruwe kopie op SRV-ARCHIEF achter (het saldo: inkomend − uitgaand)?', answer: ['1350', '1350 MB', '1350 mb'], hint: '1800 − 450.' },
        ],
      },
      questions: [
        { q: 'Hoe heet de stap waarin de aanvaller de buit op één verzamelplaats samenbrengt vóór de upload?', answer: ['staging', 'stagen'], hint: 'Engels woord; de "verzamelplaats"-stap in de keten.', explain: 'Staging: de buit wordt op één host (de staging-host) samengebracht voordat hij naar buiten gaat.' },
        { q: 'Waarom comprimeert de aanvaller de data vóór de upload?', options: ['Kleiner archief = kortere, minder opvallende upload', 'Compressie versleutelt de data', 'Compressie maakt de data groter', 'Zonder compressie werkt DNS niet'], answer: 0, explain: 'Comprimeren maakt de buit handzamer en de upload korter en minder opvallend. Encryptie is een aparte, volgende stap.' },
        { q: 'Hoeveel MB kwam er volgens het lab binnen op de staging-host SRV-ARCHIEF?', answer: ['1800', '1800 MB', '1800 mb'], hint: '1200 (financiën) + 600 (HR). De back-up van 300 MB telt niet mee.', explain: 'In: 1200 + 600 = 1800 MB. De 300 MB naar SRV-BACKUP-01 is een legitieme back-up en hoort niet bij de keten.' },
        { q: 'Met welke factor kromp de buit door compressie (1800 MB in, 450 MB uit)?', answer: ['4', '4x', 'factor 4', '4.0'], hint: '1800 ÷ 450.', explain: '1800 ÷ 450 = 4: het archief was vier keer kleiner dan de ruwe buit.' },
      ],
    },

    {
      title: 'Taak 5 — Exfil opsporen in het egressverkeer',
      content: `
        <p>Tijd om zelf te speuren. In het lab staat een <strong>egress-proxy-log</strong>: een regel per uitgaande
        verbinding, met de tijd, het werkstation, de bestemming en hoeveel bytes omhoog (<code>up</code>) en omlaag
        (<code>down</code>) gingen. Verstopt in het normale surfverkeer zitten twee verhalen: een <strong>C2-baken</strong>
        en een <strong>grote upload</strong>. Je zoekt ze met de drie detectiehoeken: <strong>timing</strong>,
        <strong>volume</strong> en <strong>bestemming</strong>.</p>

        <h3>1. Timing — het baken vinden</h3>
        <p>Filter op <code>c2relay</code> of op <code>ALERT</code>. Je ziet steeds hetzelfde werkstation
        (<code>WS-MKT-04</code>) ongeveer elke minuut een piepklein POST'je (~230 bytes) naar
        <code>cdn-telemetry.c2relay.nm.lab</code> sturen. Kijk naar de seconden: 02:03:05, 02:04:01, 02:05:12, 02:06:03…
        geen exact interval, maar een strakke band rond de 60 seconden — dat is jitter. Eén van die bakenregels bevat een
        gedecodeerd C2-antwoord met een <code>tag=</code>: daar staat een vlag.</p>

        <h3>2. Volume — de upload vinden</h3>
        <p>Filter op <code>PUT</code> of zoek met een regex naar het grootste getal, bijvoorbeeld
        <code>/up=\\d{7,}/</code> (zeven cijfers of meer). Eén regel springt eruit: <code>up=471859200</code>, een upload van
        ongeveer 450 MB — duizenden keren groter dan al het andere egressverkeer. Dat is de exfiltratie van
        <code>exfil.7z</code>.</p>

        <h3>3. Bestemming — zeldzaam en nooit eerder gezien</h3>
        <p>Waar ging die upload heen? Naar <code>opslag-x9f3.nm.lab</code> — een domein dat verder nergens in de log
        voorkomt en dat de organisatie nog nooit had bezocht. Zo'n <strong>zeldzame bestemming</strong> (rare / newly-seen
        destination) is op zichzelf al een rode vlag; gecombineerd met een enorme upload is het een incident. De
        soc-analist heeft die regel al gemarkeerd met een <code>soc_note=</code>: daar staat de tweede vlag.</p>

        <div class="callout tip">
          <strong>Filtertips (tekst of /regex/):</strong> <code>c2relay</code> (het baken), <code>PUT</code> (de upload),
          <code>opslag-x9f3</code> (de rare bestemming), <code>/up=\\d{7,}/</code> (grote uploads),
          <code>ALERT</code> (alles wat de proxy al opmerkelijk vond).
        </div>
        <div class="callout warn">
          <strong>Precisie telt:</strong> de proxy zette <code>ALERT</code> op elk klein baken én op de upload. Een echte
          analist zou het baken-alarm willen aggregeren (één melding per host per uur) zodat de ene belangrijke
          upload-melding niet verdrinkt. Veel losse, loze alarmen leiden tot alertmoeheid.
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'egress-proxy.log — NineMinds, 11 okt 2026',
        lines: EXFIL_PROXY_LOG,
      },
      questions: [
        { q: 'Naar welk domein stuurt WS-MKT-04 ongeveer elke 60 seconden een klein, bijna even groot pakketje (beaconing)?', answer: ['cdn-telemetry.c2relay.nm.lab'], hint: 'Filter op c2relay of op ALERT en kijk naar het herhaalde kleine POST-verkeer.', explain: 'De regelmatige kleine POSTs van ~230 bytes gaan naar cdn-telemetry.c2relay.nm.lab: een C2-baken met jitter.' },
        { q: 'Wat is de vlag in het gedecodeerde C2-antwoord (de baken-regel met tag=)?', answer: ['NM{baken_ritme}'], encoded: true, hint: 'Filter op c2relay en zoek de regel met down=140 en een tag=.', explain: 'In het gedecodeerde antwoord "sleep=60;jitter=10" staat tag=NM{baken_ritme}.' },
        { q: 'Ongeveer hoeveel MB was de grote upload (up=471859200 bytes ÷ 1.048.576)?', answer: ['450', '450 MB', '450 mb'], hint: 'Filter op PUT of op /up=\\d{7,}/ en reken de bytes om.', explain: '471.859.200 ÷ 1.048.576 = 450 MB — exact het gecomprimeerde exfil.7z uit het flow-lab.' },
        { q: 'Wat is de vlag in de soc_note bij de exfil-regel (de grote PUT)?', answer: ['NM{egress_betrapt}'], encoded: true, hint: 'Filter op PUT of op opslag-x9f3 en lees het einde van die regel.', explain: 'De analist markeerde de upload naar de zeldzame bestemming met soc_note=NM{egress_betrapt}.' },
        { q: 'Waardoor is opslag-x9f3.nm.lab op zichzelf al verdacht?', options: ['Het is een zeldzame bestemming die verder nergens in de log voorkomt en nooit eerder is bezocht', 'Het staat op de witte lijst', 'Het is een bekende zoekmachine', 'Het gebruikt poort 53'], answer: 0, explain: 'Een nooit eerder geziene bestemming (rare/newly-seen destination) is een rode vlag, zeker samen met een enorme upload.' },
      ],
    },

    {
      title: 'Taak 6 — Match de boze domeinen, mijd de legitieme',
      content: `
        <p>Een krachtige detectie-aanpak is <strong>bestemmingsanalyse</strong>: alarmeer of blokkeer op basis van wáár het
        verkeer heen gaat. Maar je wilt alleen de kwaadaardige infrastructuur raken en de echte bedrijfsdomeinen met rust
        laten. Eén te brede regel blokkeert per ongeluk <code>mail.google.com</code> en legt het halve kantoor plat; één te
        smalle regel mist de aanvaller. Daarom oefen je het schrijven van een <strong>precies patroon</strong>.</p>

        <h3>Het signalement</h3>
        <p>Kijk eerst goed naar de twee lijsten in het lab. De kwaadaardige C2-/exfil-domeinen delen een kenmerk dat de
        legitieme domeinen níet hebben. Let op: je kunt niet simpelweg op <code>.nm.lab</code> matchen, want
        <code>intranet.nm.lab</code> is een gewoon, legitiem bedrijfsdomein. En een patroon dat alleen op "bevat een
        cijfer" let, faalt ook: het legitieme <code>o365.portal.nm.lab</code> (Office 365) bevat cijfers, en sommige boze
        domeinen juist niet. Zoek het <em>gemeenschappelijke woord</em> in de parentdomeinen van de aanvaller.</p>

        <div class="callout tip">
          <strong>Hint:</strong> alle kwaadaardige domeinen dragen in hun naam een verwijzing naar hun functie —
          <code>exfil</code>, <code>c2</code>, <code>beacon</code> of <code>datasink</code>. Eén regex met een
          <em>alternatie</em> (<code>a|b|c</code>) die precies die woorden matcht, raakt alle boze en geen enkel legitiem
          domein. Korter = mooier (dat is de "golf").
        </div>

        <h3>Zo werkt het lab</h3>
        <p>Typ je patroon in het veld. Links zie je live per regel een ✓ of ✗ bij "moet matchen", rechts bij "mag niet
        matchen". Zodra álle groene regels matchen en géén enkele rode, verschijnt "Opgelost" met de vlag. Je hebt geen
        vlaggen (<code>flags</code>) nodig; alle domeinen zijn al kleine letters.</p>

        <div class="callout info">
          <strong>In het echt:</strong> zo'n lijst met "known-bad" domeinen komt uit threat intelligence. Nog sterker is
          detecteren op <em>newly-seen domains</em> (domeinen die je organisatie nooit eerder bezocht) en op de
          <em>entropie</em> van namen (veel willekeurige tekens = mogelijk een DGA, een domeingenerende algoritme). Een
          patroon op vaste woorden is een begin, geen eindstation: aanvallers wisselen domeinen snel.
        </div>
      `,
      lab: {
        type: 'regexgolf',
        title: 'Match de C2-/exfil-domeinen',
        prompt: 'Schrijf één regex die álle kwaadaardige domeinen (links) matcht en géén enkel legitiem domein (rechts).',
        flags: '',
        match: [
          'kd3.exfil.nm.lab',
          'node7.c2relay.nm.lab',
          'sync.datasink.nm.lab',
          'out.beacon.nm.lab',
          'a1f.exfil.nm.lab',
        ],
        avoid: [
          'www.nederbank.nl',
          'intranet.nm.lab',
          'o365.portal.nm.lab',
          'mail.google.com',
          'cdn.jsdelivr.net',
          'portaal.gemeente.nl',
        ],
        flag: 'NM{boze_domeinen_gevangen}',
      },
      questions: [
        { q: 'Welk patroon lost het regexgolf-lab op (match alle boze, mijd alle legitieme)?', answer: ['exfil|c2|beacon|datasink'], hint: 'Een alternatie van de vier functiewoorden in de boze parentdomeinen.', explain: 'Het patroon exfil|c2|beacon|datasink raakt alle vijf kwaadaardige domeinen en geen enkel legitiem domein.' },
        { q: 'Waarom werkt een patroon dat alleen op "bevat een cijfer" (\\d) let hier niet?', options: ['Het legitieme o365.portal.nm.lab bevat cijfers, en sommige boze domeinen juist niet', 'Cijfers mogen niet in een regex', 'DNS staat geen cijfers toe', 'Omdat de flag i ontbreekt'], answer: 0, explain: 'o365.portal.nm.lab (legitiem) heeft cijfers en zou ten onrechte matchen; out.beacon.nm.lab (boos) heeft geen cijfer en zou gemist worden.' },
        { q: 'Waarom kun je niet simpelweg op .nm.lab matchen om de boze domeinen te vinden?', options: ['Omdat intranet.nm.lab een legitiem bedrijfsdomein is dat je niet wilt raken', 'Omdat .nm.lab niet bestaat', 'Omdat regex geen punten kent', 'Omdat alle boze domeinen op .nl eindigen'], answer: 0, explain: 'Legitiem en kwaadaardig verkeer delen hier hetzelfde .nm.lab; je moet op het onderscheidende kenmerk matchen, niet op het gedeelde domein.' },
        { q: 'Welke vlag verschijnt als je het regexgolf-lab oplost?', answer: ['NM{boze_domeinen_gevangen}'], encoded: true, hint: 'Los het lab op; de vlag staat bij "Opgelost".', explain: 'Bij een correcte oplossing toont het lab NM{boze_domeinen_gevangen}.' },
      ],
    },

    {
      title: 'Taak 7 — Reconstrueer de tijdlijn & rapporteer',
      content: `
        <p>Je hebt alle sporen verzameld: een baken, een staging-keten, datavolumes en een upload naar een rare bestemming.
        Nu zet je ze in de <strong>juiste volgorde</strong>. Een heldere tijdlijn is de ruggengraat van elk forensisch
        rapport: ze laat zien hoe de aanval zich ontvouwde en helpt de volgende keer eerder ingrijpen.</p>

        <h3>De exfil-tijdlijn</h3>
        <p>In het lab staan acht gebeurtenissen met hun tijdstip, geschud door elkaar. Zet ze chronologisch (▲/▼) en
        controleer. De keten die je herkent, is: initiale toegang → beaconing → verkenning → staging/collectie →
        compressie → encryptie → upload → opschonen. Bij een perfecte volgorde verschijnt de slotvlag.</p>

        <h3>Van sporen naar rapport</h3>
        <p>Scheid in je verslag <strong>feiten</strong> van <strong>interpretatie</strong>. Feit: "om 03:05 verstuurde
        WS-FIN-03 een PUT van 471.859.200 bytes (±450 MB) naar het nooit eerder geziene domein opslag-x9f3.nm.lab."
        Interpretatie: "dit is vermoedelijk de exfiltratie van een gecomprimeerd, versleuteld archief met klant- en
        HR-gegevens." Maak je werk <strong>reproduceerbaar</strong>: noem de bron (de pcap of het log), de hash ervan en de
        exacte filters die je gebruikte, zodat een collega bij dezelfde data tot dezelfde conclusie komt.</p>

        <div class="callout info">
          <strong>Melden en samenwerken:</strong> gaat het om een echt datalek met persoonsgegevens (zoals die klant- en
          HR-export), dan geldt mogelijk een meldplicht bij de <strong>Autoriteit Persoonsgegevens</strong>, en bij een
          strafbaar feit kun je aangifte doen bij de <strong>Politie</strong>. Het <strong>NCSC</strong> deelt indicatoren
          (zoals een C2-domein of een exfil-IP) zodat andere organisaties zich kunnen wapenen.
        </div>
        <div class="callout tip">
          <strong>Wat je meeneemt:</strong> data is een stroom met een richting, een volume en een ritme. Exfiltratie
          verraadt zich bijna altijd via minstens één daarvan — een ongewone egress-piek, een te regelmatig baken, een
          vloed aan DNS-namen, of een upload naar een onbekende bestemming. Oefen deze analyse alleen op je eigen data of
          met toestemming; afluisteren van netwerkverkeer raakt het telecommunicatiegeheim.
        </div>
      `,
      lab: {
        type: 'ordering',
        title: 'Reconstrueer de exfil-tijdlijn',
        prompt: 'Zet de acht gebeurtenissen in de juiste chronologische volgorde (van vroeg naar laat).',
        items: [
          { id: 'a', label: '01:58 — kwaadaardige macro in Factuur.docm start een verborgen PowerShell (initiale toegang)' },
          { id: 'b', label: '02:03 — PowerShell checkt in bij C2 cdn-telemetry.c2relay.nm.lab (beaconing begint)' },
          { id: 'c', label: '02:12 — gedeelde mappen en bestanden in kaart gebracht (verkenning)' },
          { id: 'd', label: '02:34 — klant-export en HR-dossiers gekopieerd naar SRV-ARCHIEF (staging/collectie)' },
          { id: 'e', label: '03:01 — 7-Zip bundelt en comprimeert de buit tot exfil.7z (compressie)' },
          { id: 'f', label: '03:03 — exfil.7z versleuteld met een wachtwoord (encryptie)' },
          { id: 'g', label: '03:05 — exfil.7z (±450 MB) geüpload naar opslag-x9f3.nm.lab (exfiltratie)' },
          { id: 'h', label: '03:12 — logboeken gewist en tijdelijke bestanden verwijderd (opschonen)' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        flag: 'NM{exfil_keten_compleet}',
        explain: 'De keten: initiale toegang (01:58) → beaconing (02:03) → verkenning (02:12) → staging (02:34) → compressie (03:01) → encryptie (03:03) → upload (03:05) → opschonen (03:12).',
      },
      questions: [
        { q: 'Welke stap komt in de exfil-keten direct ná de compressie?', options: ['Encryptie van het archief', 'De verkenning', 'De initiale toegang', 'Het beaconing'], answer: 0, explain: 'Volgorde: collectie/staging → compressie → encryptie → upload. Na comprimeren wordt het archief versleuteld.' },
        { q: 'Welke vlag verschijnt als je de tijdlijn perfect reconstrueert?', answer: ['NM{exfil_keten_compleet}'], encoded: true, hint: 'Los het ordering-lab op; de vlag staat bij een perfecte volgorde.', explain: 'Bij de juiste volgorde toont het lab NM{exfil_keten_compleet}.' },
        { q: 'Wat hoort in een forensisch rapport strikt gescheiden te blijven?', options: ['Feiten en interpretatie', 'Datum en tijd', 'Bytes en bits', 'Bron-IP en bestemmings-IP'], answer: 0, explain: 'Feiten (wat je zag) en interpretatie (wat het betekent) hou je uit elkaar, zodat je verslag controleerbaar blijft.' },
        { q: 'Ik kan exfiltratie herkennen aan een ongewone richting, een groot volume, een te regelmatig ritme of een zeldzame bestemming.', noAnswer: true },
      ],
    },
  ],
  terms: [
    { term: 'Datastroom (data flow)', def: 'Verkeer met een richting, een volume en een poort; te lezen als een stroom door het netwerk.' },
    { term: 'Egress / ingress', def: 'Uitgaand (egress) tegenover inkomend (ingress) verkeer. Bij exfiltratie is de egress ongewoon groot.' },
    { term: 'Data-egress', def: 'Het uitgaande datavolume van een organisatie; de hoek waarin exfiltratie zich het eerst verraadt.' },
    { term: 'Exfiltratie', def: 'Het ongeoorloofd naar buiten brengen van data, vaak als één grote upload of druppelsgewijs.' },
    { term: 'Beaconing', def: 'Het regelmatig "inchecken" van malware bij zijn C2-server; vaste intervallen en vaste kleine pakketgrootte.' },
    { term: 'C2 (command-and-control)', def: 'De server waarmee besmette systemen contact houden om opdrachten te ontvangen.' },
    { term: 'Jitter', def: 'Willekeurige variatie op het beacon-interval (bijv. 54–71s i.p.v. exact 60s) om detectie te bemoeilijken.' },
    { term: 'DNS-tunneling', def: 'Data wegsmokkelen door het in DNS-queries te verpakken (lange, willekeurige subdomeinen naar één domein).' },
    { term: 'Staging', def: 'De buit op één verzamelplaats (staging-host) samenbrengen vóór de upload.' },
    { term: 'Baseline', def: 'Het gemeten "normale" patroon per host en tijdstip, waartegen een afwijking opvalt.' },
    { term: 'Zeldzame bestemming (newly-seen domain)', def: 'Een nieuw of nooit eerder bezocht extern domein; op zichzelf al een rode vlag bij een grote upload.' },
    { term: 'Egress-filtering', def: 'Het beperken en controleren van uitgaand verkeer, zodat exfiltratie en C2 moeilijker naar buiten komen.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — T1041: Exfiltration Over C2 Channel', url: 'https://attack.mitre.org/techniques/T1041/' },
    { title: 'MITRE ATT&CK — T1567: Exfiltration Over Web Service', url: 'https://attack.mitre.org/techniques/T1567/' },
    { title: 'MITRE ATT&CK — T1071: Application Layer Protocol (C2)', url: 'https://attack.mitre.org/techniques/T1071/' },
    { title: 'MITRE ATT&CK — T1071.004: DNS (DNS-tunneling als kanaal)', url: 'https://attack.mitre.org/techniques/T1071/004/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
});
