/* Game room: De ochtend erna (sporen lezen en opruimen) */
CS.registerRoom({
  id: 'game-ochtend-erna',
  path: 'gamerooms',
  order: 5,
  title: 'De ochtend erna: wat liet de indringer achter?',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-12',
  minutes: 40,
  summary: 'Vannacht is iemand binnengekomen op het klantportaal. Hij heeft drie manieren achtergelaten om terug te komen. Vind ze allemaal, stel eerst het bewijs veilig, en ruim op voordat hij terug is.',
  objectives: [
    'Een inbraak reconstrueren uit weblog, auth.log en het bestandssysteem',
    'Persistentie herkennen: een extra account, een SSH-sleutel, een geplande taak, een webshell',
    'Bewijs veiligstellen vóór je opruimt',
    'Uitleggen waarom één manier weghalen niet genoeg is',
  ],
  tasks: [
    {
      title: 'Taak 1 — Persistentie',
      content: `
        <p>Een aanvaller die binnen is, wil binnen blijven, ook als iemand het eerste lek dicht. Daarvoor laat hij
        <strong>persistentie</strong> achter. Op een Linux-webserver zijn de bekendste:</p>
        <ul>
          <li>een <strong>webshell</strong>: een bestand in de webmap waarmee hij via de browser opdrachten geeft (ATT&amp;CK T1505.003);</li>
          <li>een <strong>extra account</strong> (T1136.001);</li>
          <li>een eigen <strong>SSH-sleutel</strong> in <code>authorized_keys</code> (T1098.004);</li>
          <li>een <strong>geplande taak</strong> die steeds iets ophaalt of start (T1053.003).</li>
        </ul>
        <p>Haal je er één weg en de rest niet, dan is hij morgen terug en weet hij dat je hem gezien hebt. Daarom inventariseer je eerst
        alles, en stel je bewijs veilig voordat je iets verwijdert.</p>
      `,
      questions: [
        { q: 'Je vindt een onbekende sleutel in /root/.ssh/authorized_keys. Wat doe je eerst?',
          options: ['De sleutel direct verwijderen', 'Een kopie van de server maken, en daarna verder zoeken naar andere sporen', 'De server opnieuw installeren', 'Het root-wachtwoord wijzigen'],
          answer: 1,
          wrong: { 0: 'Dan is het bewijs weg, en je weet nog niet wat er nog meer is achtergelaten.', 2: 'Herinstalleren wist het bewijs en je weet niet hoe hij binnenkwam: je zet hetzelfde lek terug.', 3: 'Een sleutel werkt los van het wachtwoord. Dit helpt niet.' },
          explain: 'Eerst veiligstellen en het hele plaatje zien, dan in één keer opruimen.' },
      ],
    },
    {
      title: 'Taak 2 — Het klantportaal',
      content: `
        <p>Lees het mandaat en begin. Kijk in de logbestanden (<code>logs web</code>, <code>logs auth</code>) en het bestandssysteem
        (<code>show</code>). De aanvaller heeft om 09:30 een afspraak met zijn eigen server. Ben je dan niet klaar, dan komt hij terug.</p>
      `,
      lab: {
        type: 'incident',
        title: 'Zorgverzekeraar Rijnmond (fictief) · app-02',
        role: 'Incidentonderzoeker bij Zorgverzekeraar Rijnmond (fictief), met mandaat om app-02 te onderzoeken, bewijs veilig te stellen en op te ruimen.',
        story: 'Om 08:50 meldt de leverancier van het klantportaal dat er vannacht een onbekend bestand in de uploadmap is gekomen. De server draait nog.',
        mandate: [
          'Alles gebeurt in deze simulatie. Doe dit nooit op systemen waarvoor je geen opdracht en toestemming hebt.',
          'Je mag app-02 onderzoeken, een kopie maken, bestanden en accounts verwijderen en adressen blokkeren.',
          'Bewijs gaat voor opruimen: maak eerst een kopie.',
          'Het klantportaal is kritiek, maar ook besmet. Isoleren mag als het moet.',
        ],
        vars: {
          ip: ['203.0.113.201', '198.51.100.9', '192.0.2.77'],
          bduser: ['sysupd', 'backupsvc', 'monitor2'],
        },
        start: '08:55',
        deadline: 50,
        maxDamage: 30,
        motd: 'app-02 · klantportaal. Typ help. Begin met logs web.',
        hosts: [
          { name: 'app-02', ip: '10.4.0.12', role: 'Klantportaal', critical: true, compromised: true },
        ],
        accounts: [
          { name: 'beheer', role: 'Beheeraccount (sleutel)', critical: true },
          { name: 'deploy', role: 'Account voor uitrol door de leverancier', critical: true },
          { name: '{{bduser}}', role: 'Onbekend', compromised: true },
        ],
        logs: {
          web: [
            { t: -400, line: '{{ip}} POST /profiel/avatar 200 bestand=avatar.php (2 KB)' },
            { t: -399, line: '{{ip}} GET /uploads/avatar.php 200' },
            { t: -398, line: '{{ip}} GET /uploads/avatar.php?c=... 200 (14 keer in 6 minuten)' },
            { t: -120, line: '198.51.100.30 GET /profiel 200 (normaal verkeer)' },
            { t: -5, line: '{{ip}} GET /uploads/avatar.php 200' },
          ],
          auth: [
            { t: -392, line: 'useradd[1881]: new user: name={{bduser}}, UID=1002, home=/home/{{bduser}}' },
            { t: -391, line: 'passwd[1884]: password changed for {{bduser}}' },
            { t: -380, line: 'sshd[1902]: Accepted password for {{bduser}} from {{ip}} port 50122' },
            { t: -341, line: 'sshd[2210]: Accepted publickey for root from {{ip}} port 50190 (sleutel onbekend)' },
            { t: -60, line: 'sshd[3011]: Accepted publickey for beheer from 10.4.9.5 (beheer-VPN)' },
          ],
        },
        show: {
          bestanden: ['/var/www/portaal/uploads/avatar.php       aangemaakt 02:15, PHP-code, geen afbeelding', '/usr/local/bin/.sysupd                     aangemaakt 03:14, verborgen bestand', '/var/www/portaal/uploads/foto-1182.jpg     aangemaakt gisteren, afbeelding'],
          sleutels: ['/root/.ssh/authorized_keys:', '  ssh-ed25519 AAAA...k3 beheer@nm (bekend)', '  ssh-ed25519 AAAA...Zq onbekend, toegevoegd 03:12', '/home/{{bduser}}/.ssh/authorized_keys: leeg'],
          crontab: ['# /etc/crontab', '0 2 * * *     root  /usr/local/bin/backup-portaal', '*/10 * * * *  root  /usr/local/bin/.sysupd   # toegevoegd 03:14; het script haalt opdrachten op bij {{ip}}'],
          gebruikers: ['beheer       uid 1000  sleutel', 'deploy       uid 1001  sleutel, leverancier', '{{bduser}}   uid 1002  aangemaakt vannacht 02:22'],
          uploadconfig: ['# nginx: /uploads', 'location /uploads/ { try_files $uri =404; }   # PHP wordt hier gewoon uitgevoerd', 'Toegestane bestandstypen bij uploaden: alles'],
        },
        fixes: [
          { id: 'webshell-weg', good: true, text: 'avatar.php uit de uploadmap verwijderen', done: 'avatar.php is verwijderd. De kopie in je bewijs bevat hem nog.' },
          { id: 'account-weg', good: true, text: 'Het account dat vannacht is aangemaakt uitschakelen en verwijderen', done: 'Het account is uitgeschakeld en verwijderd.' },
          { id: 'sleutel-weg', good: true, text: 'De onbekende sleutel uit /root/.ssh/authorized_keys halen', done: 'Alleen de bekende sleutel van beheer staat er nog.' },
          { id: 'cron-weg', good: true, text: 'De cronregel voor .sysupd en het script zelf verwijderen', done: 'De cronregel en /usr/local/bin/.sysupd zijn weg.' },
          { id: 'upload-dicht', good: true, text: 'In /uploads geen PHP meer uitvoeren en alleen afbeeldingen toestaan', done: 'De uploadmap voert geen code meer uit en accepteert alleen afbeeldingen. Zo komt dezelfde weg niet terug.' },
          { id: 'logs-leeg', good: false, points: 20, text: 'De logbestanden leegmaken om de schijf op te ruimen', why: 'Je wist de tijdlijn en het bewijs. Logbestanden gaan naar het onderzoek, niet naar de prullenbak.' },
          { id: 'herinstalleren', good: false, points: 15, text: 'De server nu meteen opnieuw installeren', why: 'Zonder kopie is het bewijs weg, en zonder de uploadmap te dichten zet je hetzelfde lek terug.' },
          { id: 'deploy-weg', good: false, points: 10, text: 'Het account deploy verwijderen', why: 'deploy is van de leverancier en had niets met de inbraak te maken. De volgende uitrol mislukt.' },
        ],
        rules: [
          { on: 'fix:webshell-weg', unless: ['snapshot:app-02'], points: 10, text: 'Je verwijderde de webshell voordat er een kopie was: dat bewijsstuk is weg.' },
          { on: 'fix:account-weg', unless: ['snapshot:app-02'], points: 5, text: 'Je verwijderde het account voordat er een kopie was.' },
          { on: 'fix:sleutel-weg', unless: ['snapshot:app-02'], points: 5, text: 'Je verwijderde de sleutel voordat er een kopie was.' },
          { on: 'fix:cron-weg', unless: ['snapshot:app-02'], points: 5, text: 'Je verwijderde het script voordat er een kopie was; wat het deed, is nu niet meer na te gaan.' },
        ],
        threats: [
          { id: 'terug', at: 35, label: 'De aanvaller komt terug via wat er nog openstaat', text: 'De aanvaller komt terug via wat je liet staan, ziet dat je hem gevonden hebt, en wist de logbestanden.',
            stoppedByAll: ['fix:webshell-weg', 'fix:account-weg', 'fix:sleutel-weg', 'fix:cron-weg'], stoppedBy: ['isolate:app-02'], damage: 25 },
        ],
        objectives: [
          { text: 'Eerst een kopie van de server gemaakt', all: ['snapshot:app-02'], points: 10, required: true },
          { text: 'De webshell verwijderd', all: ['fix:webshell-weg'], points: 10 },
          { text: 'Het vannacht aangemaakte account verwijderd', all: ['fix:account-weg'], points: 10 },
          { text: 'De onbekende SSH-sleutel verwijderd', all: ['fix:sleutel-weg'], points: 10 },
          { text: 'De geplande taak en het script verwijderd', all: ['fix:cron-weg'], points: 10 },
          { text: 'De ingang gedicht: geen code meer in de uploadmap', all: ['fix:upload-dicht'], points: 10 },
          { text: 'Het adres van de aanvaller geblokkeerd', all: ['block:{{ip}}'], points: 5 },
        ],
        pass: 55,
        flag: 'NM{persistentie_opgeruimd}',
        solution: ['logs web', 'logs auth', 'show bestanden', 'show sleutels', 'show crontab', 'snapshot app-02', 'fix webshell-weg', 'fix account-weg', 'fix sleutel-weg', 'fix cron-weg', 'fix upload-dicht', 'block {{ip}}', 'report'],
        solutionNotes: [
          'De weblog: een "avatar" die een PHP-bestand is, en daarna steeds opgevraagd met een parameter. Dat is een webshell.',
          'De auth.log: kort daarna een nieuw account, en later een root-login met een onbekende sleutel. Vanaf hetzelfde adres.',
          'De bestanden: de webshell en een verborgen script.',
          'De sleutels: een onbekende naast die van beheer.',
          'De crontab: het verborgen script draait elke tien minuten als root.',
          'Nu je alles gezien hebt: eerst een kopie. Pas daarna opruimen.',
          'Webshell weg.',
          'Account weg.',
          'Sleutel weg.',
          'Geplande taak en script weg. Nu is elke weg terug dicht.',
          'En de ingang zelf: geen code meer uitvoeren in de uploadmap.',
          'Blokkeer het adres; hij komt waarschijnlijk van een ander terug, maar dit kost hem moeite.',
          'Sluit af.',
        ],
        debrief: `
          <h4>Wat de aanvaller deed</h4>
          <p>Hij uploadde een PHP-bestand als profielfoto. Omdat de uploadmap code uitvoert, had hij daarmee een webshell (T1505.003).
          Vandaar maakte hij een eigen account aan (T1136.001), zette zijn sleutel bij root (T1098.004) en een taak die elke tien minuten
          opdrachten ophaalt (T1053.003). Vier wegen terug: wie er één vergeet, is hem niet kwijt.</p>
          <h4>Wat je had kunnen zien</h4>
          <ul>
            <li>Een upload met de extensie <code>.php</code> in een map voor afbeeldingen, en daarna verzoeken naar dat bestand met een parameter.</li>
            <li><code>useradd</code> midden in de nacht, en een root-login met een sleutel die niemand kent.</li>
            <li>Een verborgen bestand (naam begint met een punt) in <code>/usr/local/bin</code>, aangeroepen door cron.</li>
          </ul>
          <h4>Wat het had gestopt of eerder gemeld</h4>
          <ul>
            <li>Uploads controleren op type én inhoud, en in de uploadmap nooit code uitvoeren.</li>
            <li>File integrity monitoring op <code>authorized_keys</code>, <code>/etc/crontab</code> en <code>/etc/passwd</code>.</li>
            <li>Een melding bij elke <code>useradd</code> en elke root-login via SSH.</li>
          </ul>
          <p>Verder leren: <a href="#/room/bewijs-veiligstellen">Bewijs veiligstellen</a>, <a href="#/room/logs-detectie">Logs en detectie</a>,
          <a href="#/room/linux-basis">Linux: de basis</a>, <a href="#/room/tijdlijnanalyse">Tijdlijnanalyse</a>.</p>
        `,
        ask: [
          { q: 'Welk account maakte de indringer aan?', answer: ['{{bduser}}'] },
          { q: 'Via welk bestand kwam hij binnen?', answer: ['avatar.php', '/var/www/portaal/uploads/avatar.php'] },
        ],
      },
      questions: [
        { q: 'Ruim alles op. Welke vlag krijg je in de nabespreking?', answer: ['NM{persistentie_opgeruimd}'],
          hints: ['Zonder kopie vooraf geen vlag. Kijk eerst rond, dan snapshot, dan pas fix.', 'Er zijn vier wegen terug: kijk in bestanden, sleutels, crontab en gebruikers.', 'Ruim alle vier op vóór 09:30, en dicht ook de uploadmap.'],
          explain: 'Elke variant heeft een andere accountnaam en een ander adres; de vier wegen terug zijn dezelfde.' },
        { q: 'Waarom ruim je alle vier de wegen terug in één keer op, en niet zodra je de eerste vindt?',
          options: ['Omdat het sneller typt', 'Omdat de aanvaller anders via een overgebleven weg terugkomt, en weet dat hij gezien is', 'Omdat het in de wet staat', 'Omdat cron anders vastloopt'],
          answer: 1,
          wrong: { 0: 'Snelheid is niet de reden; je zou zelfs sneller zijn met de eerste meteen.', 2: 'Er is geen wet die dit voorschrijft; het is vakmanschap.', 3: 'Cron heeft hier niets mee te maken.' },
          why: 'Halve opruimacties waarschuwen de aanvaller. Hij past zich aan, en de volgende keer zie je hem niet meer.',
          explain: 'Inventariseer eerst alles, stel veilig, en sluit dan alle deuren tegelijk. Dat heet ook wel een gecoördineerde eradicatie.' },
      ],
    },
  ],
  terms: [
    { term: 'Persistentie', def: 'Wat een aanvaller achterlaat om terug te kunnen komen, ook als het eerste lek gedicht is.' },
    { term: 'Webshell', def: 'Een script op een webserver waarmee een aanvaller via de browser opdrachten geeft (ATT&CK T1505.003).' },
    { term: 'authorized_keys', def: 'Het bestand met de publieke sleutels die zonder wachtwoord mogen inloggen op een account.' },
    { term: 'File integrity monitoring', def: 'Bewaking die meldt wanneer belangrijke bestanden veranderen, zoals authorized_keys, crontab of passwd.' },
    { term: 'Eradicatie', def: 'De fase waarin je de aanvaller er helemaal uit haalt: alle persistentie, alle gestolen toegang, in één keer.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Web Shell (T1505.003)', url: 'https://attack.mitre.org/techniques/T1505/003/' },
    { title: 'MITRE ATT&CK: SSH Authorized Keys (T1098.004)', url: 'https://attack.mitre.org/techniques/T1098/004/' },
  ],
});
