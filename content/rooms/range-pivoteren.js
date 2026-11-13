/* Game room: Pivoteren (offensief, gesimuleerd) */
CS.registerRoom({
  id: 'range-pivoteren',
  path: 'gamerooms',
  order: 8,
  title: 'Pivoteren',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-13',
  minutes: 45,
  summary: 'Twee netten. Je bereikt alleen de DMZ-host van Noorderlicht Energie; daarachter ligt een intern net dat je nergens anders kunt raken. Neem de DMZ-host over, gebruik hem als springplank en haal de eindvlag van een interne server. Drie vlaggen.',
  objectives: [
    'Een DMZ-host overnemen die als enige vanaf buiten bereikbaar is',
    'Root worden op de DMZ-host en daar de inloggegevens voor het interne net vinden',
    'Via de DMZ-host het interne net openen, scannen en een interne server bereiken',
    'Begrijpen waarom netsegmentatie de aanval had moeten stoppen',
  ],
  tasks: [
    {
      title: 'Taak 1 - De opdracht',
      content: `
        <p>Tot nu toe stond je doelwit op een net. Nu zijn er twee: een <strong>DMZ</strong> (de zone met servers die vanaf
        buiten bereikbaar zijn) en een <strong>intern net</strong> dat je vanaf je startplek niet kunt zien. De eindvlag staat
        binnen. Hoe kom je daar?</p>
        <p>Het antwoord is <strong>pivoteren</strong>: je neemt eerst een host over die aan beide netten hangt, en gebruikt die
        als springplank naar het net erachter. De keten is:</p>
        <ol>
          <li>De DMZ-host overnemen (verkennen, binnenkomen, root worden).</li>
          <li>Op die host de inloggegevens voor het interne net vinden (vaak laten beheerders die slingeren).</li>
          <li>Het interne net openen en scannen; dat kan pas vanaf de DMZ-host.</li>
          <li>Inloggen op de interne server en de eindvlag pakken.</li>
        </ol>
        <p>De les voor de verdediging zit in stap 3: een goed ingericht netwerk laat een overgenomen DMZ-host <em>niet</em>
        zomaar bij het interne net. Dat heet netsegmentatie, en het is precies wat hier ontbreekt.</p>
        <div class="callout warn"><strong>Let op:</strong> dit mag je alleen in dit lab of op systemen met schriftelijke toestemming.
        Ongeautoriseerd binnendringen en doorstappen naar andere systemen is computervredebreuk (art. 138ab Sr).</div>
      `,
      questions: [
        { q: 'Wat betekent pivoteren in een aanval?',
          options: ['Een server opnieuw opstarten', 'Een overgenomen host als springplank gebruiken om een net te bereiken dat je direct niet kunt raken', 'Een wachtwoord kraken', 'Meerdere poorten tegelijk scannen'],
          answer: 1,
          wrong: { 0: 'Opnieuw opstarten heeft er niets mee te maken.', 2: 'Een wachtwoord kraken kan een stap zijn, maar pivoteren is het doorstappen naar een ander net.', 3: 'Dat is scannen; pivoteren is het bereiken van een net via een tussenliggende host.' },
          explain: 'Pivoteren is een overgenomen host gebruiken als bruggenhoofd naar een net dat je van buitenaf niet kunt zien.' },
        { q: 'Welke verdedigende maatregel maakt pivoteren vanaf een DMZ-host naar het interne net veel moeilijker?',
          options: ['Een sterker wachtwoord op de DMZ-host', 'Netsegmentatie: de DMZ mag het interne net niet zomaar benaderen', 'Een snellere server', 'Meer logging op de webserver'],
          answer: 1,
          wrong: { 0: 'Een sterker wachtwoord vertraagt de eerste stap, maar stopt het doorstappen niet.', 2: 'Logging helpt je het zien, maar houdt het verkeer niet tegen.', 3: 'Snelheid verandert niets aan de bereikbaarheid tussen netten.' },
          explain: 'Met strakke netsegmentatie en een firewall tussen DMZ en intern net loopt de aanvaller na de DMZ-host vast.' },
      ],
    },
    {
      title: 'Taak 2 - De range',
      content: `
        <p>Lees de rules of engagement, start de oefening en typ <code>help</code>. Begin met <code>scan dmz</code> om de
        bereikbare host te vinden. Neem die volledig over (tot root). Zoek daarna op die host de inloggegevens voor het interne
        net. Pas als je een shell op de DMZ-host hebt, kun je <code>scan intern</code> doen. Elke leerling krijgt een eigen
        variant; de walkthrough komt vrij na je eerste poging.</p>
      `,
      lab: {
        type: 'range',
        title: 'Noorderlicht Energie · DMZ en intern net',
        role: 'Pentester met een getekende opdracht om het publieke segment van Noorderlicht Energie BV (fictief) te testen, inclusief doorstappen naar achterliggende netten voor zover de afspraak dat toestaat.',
        story: 'De klant wil weten of een aanvaller die de DMZ haalt, verder kan tot de interne fileserver. Je bereikt alleen de DMZ; de rest moet je verdienen.',
        mandate: [
          'Alles in deze oefening is gesimuleerd. Doe dit nooit op systemen zonder schriftelijke toestemming.',
          'Je scope is de DMZ-host en, na overname, de interne server die eraan vastzit. Blijf erbinnen.',
          'Werk zo stil mogelijk: een breed scan en blind proberen vallen op.',
          'Leg elke stap vast, zodat de klant de pivot later kan naspelen.',
        ],
        vars: {
          ip: ['203.0.113.40', '198.51.100.40', '203.0.113.88'],
          iip: ['10.10.20.15', '10.10.20.31', '10.10.20.52'],
          pass: ['Noorderlicht-2025!', 'Wind#Zee8', 'Kust@0592', 'Duin-Grijs6'],
          ipass: ['Fileserver#2024', 'Intern-Kluis7', 'Archief@Noord3', 'Depot-Geel5'],
          job: ['/opt/scripts/backup.sh', '/usr/local/bin/sync.sh', '/opt/jobs/opschonen.sh'],
          leak: ['/.env', '/config/proxy.env', '/intern/deploy.env'],
        },
        startNet: 'dmz',
        startScan: 'dmz',
        maxNoise: 100,
        quietUnder: 45,
        nets: { dmz: { cidr: '203.0.113.0/24', label: 'DMZ (publiek bereikbaar)' }, intern: { cidr: '10.10.20.0/24', label: 'intern net' } },
        motd: 'Oefenrange Noorderlicht. Typ help. Begin met scan dmz.',
        hosts: [
          {
            name: 'dmz-01', ip: '{{ip}}', net: 'dmz', role: 'Reverse proxy en jumphost (Linux)', bridges: ['intern'],
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH 9.2' }, { n: 80, svc: 'http', ver: 'nginx 1.24.0', note: 'reverse proxy' }],
            pages: {
              '/': 'Noorderlicht Energie - serviceportaal\nDeze host verwijst door naar interne diensten. Beheer: zie /robots.txt.',
              '/robots.txt': 'User-agent: *\nDisallow: {{leak}}\nDisallow: /status',
              '/status': 'proxy: online\nupstream: fs-01 (intern)\nlaatste deploy: geslaagd',
              '{{leak}}': "# Omgevingsbestand van de reverse proxy - per ongeluk bereikbaar\nPROXY_USER=wsmit\nPROXY_PASS={{pass}}\n# wsmit is ook het Linux-account op deze host",
            },
            secrets: [
              { loc: 'web:{{leak}}', cred: { user: 'wsmit', pass: '{{pass}}', target: 'dmz-01', note: 'uit het omgevingsbestand van de proxy' } },
            ],
            accounts: { wsmit: '{{pass}}' },
            files: {
              '/home/wsmit/user.txt': 'NM{dmz_voet_aan_de_grond}',
              '/home/wsmit/leesmij.txt': 'todo: proxy-omgevingsbestand uit de webroot halen',
              '/root/root.txt': 'NM{dmz_volledig_overgenomen}',
              '/root/deploy-notities.txt': 'Deploy naar fs-01 (intern) gaat met account beheer. Wachtwoord staat in de deploysleutel; moet naar een kluis.',
            },
            escalation: { via: 'cron', token: '{{job}}', show: '*/5 * * * * root {{job}}', note: 'deze taak draait als root en voert {{job}} uit, een script dat op deze host door jouw gebruiker aan te passen is; daarmee word je root' },
            onRoot: [
              { cred: { user: 'beheer', pass: '{{ipass}}', target: 'fs-01', note: 'uit de deploysleutel op dmz-01; geeft toegang tot de interne fileserver' }, text: 'Loot: inloggegevens voor beheer op fs-01 (intern net). Hiermee kun je pivoteren.' },
            ],
            flags: [
              { id: 'foothold', value: 'NM{dmz_voet_aan_de_grond}', path: '/home/wsmit/user.txt', root: false, points: 10 },
              { id: 'rootdmz', value: 'NM{dmz_volledig_overgenomen}', path: '/root/root.txt', root: true, points: 15 },
            ],
          },
          {
            name: 'fs-01', ip: '{{iip}}', net: 'intern', role: 'Interne fileserver (Linux)',
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH 9.2' }, { n: 445, svc: 'smb', ver: 'Samba 4.19', note: 'bestandsdeling' }],
            accounts: { beheer: '{{ipass}}' },
            files: {
              '/home/beheer/eindvlag.txt': 'NM{dwars_het_netwerk_door}',
              '/home/beheer/gedeeld/overzicht.txt': 'Interne fileserver. Alleen bereikbaar vanaf het interne net.',
            },
            flags: [
              { id: 'kroon', value: 'NM{dwars_het_netwerk_door}', path: '/home/beheer/eindvlag.txt', root: false, points: 20 },
            ],
          },
        ],
        objectives: [
          { text: 'Een shell op de DMZ-host (dmz-01)', found: ['shell:dmz-01'], points: 10 },
          { text: 'Root geworden op dmz-01', flags: ['rootdmz'], points: 15 },
          { text: 'De eindvlag op de interne fileserver fs-01', flags: ['kroon'], points: 20 },
        ],
        flag: 'NM{dwars_het_netwerk_door}',
        solution: ['scan dmz', 'scan dmz-01', 'web dmz-01', 'web dmz-01 /robots.txt', 'web dmz-01 {{leak}}', 'ssh wsmit@dmz-01', 'cat /home/wsmit/user.txt', 'crontab -l', 'escalate {{job}}', 'cat /root/root.txt', 'scan intern', 'scan fs-01', 'ssh beheer@fs-01', 'cat /home/beheer/eindvlag.txt', 'done'],
        solutionNotes: [
          'Alleen de DMZ is vanaf je startplek bereikbaar.',
          'Open poorten op de DMZ-host: 22 (SSH) en 80 (proxy).',
          'De voorpagina wijst naar beheerpaden in robots.txt.',
          'robots.txt verraadt een omgevingsbestand van de proxy.',
          'Daarin staat het wachtwoord van wsmit, ook zijn serverlogin.',
          'Log in als wsmit; door deze shell opent zich het interne net.',
          'De eerste vlag staat in de thuismap.',
          'crontab -l toont een taak die als root draait en te beinvloeden is.',
          'Via die taak word je root; in /root vind je de loot voor de pivot.',
          'De tweede vlag staat in /root.',
          'Nu de DMZ-host je springplank is, kun je het interne net scannen.',
          'Scan de interne fileserver die je nu ziet.',
          'Log in op fs-01 met de inloggegevens die je als root vond.',
          'De eindvlag staat op de interne server.',
          'Rond af.',
        ],
        debrief: `
          <h4>De keten die je liep</h4>
          <ol>
            <li>Verkenning van de enige bereikbare host in de DMZ (ATT&CK T1595).</li>
            <li>Een omgevingsbestand met een wachtwoord in de webroot (T1552.001: inloggegevens in een bestand).</li>
            <li>Inloggen met een geldig, hergebruikt wachtwoord (T1078).</li>
            <li>Rechtenverhoging via een beinvloedbare cronjob die als root draait (T1548 en T1053.003: Cron).</li>
            <li>Inloggegevens voor het interne net gevonden op de DMZ-host (T1552.001).</li>
            <li>Pivoteren naar het interne net en inloggen op fs-01 via SSH (T1021.004: Remote Services, SSH).</li>
          </ol>
          <h4>Wat de beheerder had kunnen zien</h4>
          <ul>
            <li>Verzoeken naar het omgevingsbestand en <code>/robots.txt</code> in de proxylogs.</li>
            <li>Een SSH-aanmelding van wsmit vanaf een extern adres, en kort daarna een rootproces uit de cronjob (T1078, T1053.003).</li>
            <li>Nieuw SSH-verkeer van de DMZ-host naar het interne net: verkeer dat er nooit had mogen zijn.</li>
          </ul>
          <h4>Wat elke stap had gestopt</h4>
          <ul>
            <li>Geen omgevingsbestanden in de webroot, en verschillende wachtwoorden voor proxy en serverlogin.</li>
            <li>Een cronjob die als root draait mag geen script uitvoeren dat een gewone gebruiker kan aanpassen; zet de rechten strak.</li>
            <li>Geen inloggegevens voor het interne net op een DMZ-host laten staan; gebruik kortlevende, afgeschermde sleutels.</li>
            <li>De grootste maatregel: netsegmentatie. Een firewall tussen DMZ en intern net die alleen de noodzakelijke diensten toelaat, had de pivot tegengehouden, ook nadat de DMZ-host al over was.</li>
          </ul>
          <p>Verder leren: <a href="#/room/netwerksegmentatie">Netwerksegmentatie</a>,
          <a href="#/room/linux-container-hardening">Linux- en containerhardening</a>,
          <a href="#/room/range-rechten-verhogen">Rechten verhogen</a>.</p>
        `,
        ask: [
          { q: 'Op welk net stond de eindvlag? (dmz of intern)', answer: ['intern'] },
          { q: 'Welk account gebruikte je op de interne fileserver?', answer: ['beheer'] },
        ],
      },
      questions: [
        { q: 'Pak alle drie de vlaggen. Welke eindvlag (op de interne server) krijg je in de nabespreking?', answer: ['NM{dwars_het_netwerk_door}'], encoded: true,
          hints: ['De eindvlag staat op fs-01, en fs-01 zie je pas nadat je een shell op de DMZ-host hebt.', 'Neem dmz-01 volledig over; de inloggegevens voor fs-01 vind je pas als je root bent op dmz-01.', 'Na root op dmz-01 heb je de loot: scan intern, log in op fs-01 als beheer, en lees de eindvlag.'],
          explain: 'De eindvlag verschijnt in de nabespreking zodra je hem op fs-01 leest. Elke variant heeft een eigen vlagwoord; probeer een andere variant zonder walkthrough.' },
        { q: 'Je probeerde meteen scan intern, nog voordat je een shell op de DMZ-host had. Waarom lukte dat niet?',
          options: ['Omdat het interne net niet bestaat', 'Omdat het interne net pas bereikbaar is via een host die eraan grenst; zonder springplank zie je het niet', 'Omdat scannen te luidruchtig is', 'Omdat je geen scan-opdracht mag gebruiken'],
          answer: 1,
          wrong: { 0: 'Het interne net bestaat wel; het is alleen niet direct bereikbaar.', 2: 'Een scan is luidruchtig, maar dat is niet de reden dat het interne net onzichtbaar bleef.', 3: 'Scannen mag; het net was alleen nog niet bereikbaar.' },
          why: 'Een intern net is per ontwerp afgeschermd. Je bereikt het pas via een host die aan beide netten hangt, en die moet je eerst overnemen.',
          explain: 'Pas na een shell op dmz-01 (die aan het interne net grenst) opent zich dat net en kun je het scannen.' },
      ],
    },
    {
      title: 'Taak 3 - De nabespreking',
      content: `
        <p>Lees de nabespreking onder de console. De pivot is het leermoment: de DMZ-host overnemen was vervelend, maar het
        doorstappen naar het interne net had nooit mogen kunnen. Een goed rapport legt de nadruk daar, want een laag die de
        aanval in het midden breekt, is vaak meer waard dan tien kleine fixes aan de buitenkant.</p>
        <p>In een echt rapport schrijf je per bevinding risico, bewijs en advies uit. Zie
        <a href="#/room/pentest-methodiek-rapportage">Pentest-methodiek en rapportage</a>.</p>
      `,
      questions: [
        { q: 'Welke maatregel had de aanval het meest ingeperkt, ook nadat de DMZ-host al was overgenomen?',
          options: ['Een sterker wachtwoord voor wsmit', 'Netsegmentatie: een firewall die de DMZ niet zomaar bij het interne net laat', 'Een nieuwere nginx-versie', 'Poort 445 op fs-01 sluiten'],
          answer: 1,
          wrong: { 0: 'Dat vertraagt de eerste stap, maar na overname van de DMZ-host had de pivot alsnog gekund.', 2: 'De versie was niet het probleem; de bereikbaarheid tussen netten wel.', 3: 'Alleen poort 445 sluiten helpt niet; de pivot ging via SSH naar poort 22.' },
          why: 'Maatregelen aan de buitenkant vertragen, maar een harde grens tussen DMZ en intern net breekt de keten in het midden, ook als de voorkant al valt.',
          explain: 'Netsegmentatie houdt een overgenomen DMZ-host weg bij het interne net. Dat stopt de pivot, los van hoe de host zelf werd gekraakt.' },
        { q: 'Welke ATT&CK-techniek hoort bij het inloggen op de interne server via SSH, vanaf de overgenomen host? (ID)', answer: ['T1021.004', 't1021.004'],
          hints: ['Het valt onder Remote Services, T1021.', 'De subtechniek gaat specifiek over SSH.', 'Het is T1021 punt nul nul vier.'],
          wrong: { 't1021': 'Dat is de techniek; gevraagd is de subtechniek voor SSH.', 't1078': 'Dat is Valid Accounts: het geldige account. Gevraagd is het doorstappen via SSH.' },
          explain: 'T1021.004 Remote Services: SSH, het laterale doorstappen naar een andere host via SSH.' },
      ],
    },
  ],
  terms: [
    { term: 'Pivoteren', def: 'Een overgenomen host als springplank gebruiken om een net te bereiken dat je direct niet kunt zien (lateral movement).' },
    { term: 'DMZ', def: 'Demilitarized zone: de netzone met servers die vanaf buiten bereikbaar zijn, gescheiden van het interne net.' },
    { term: 'Netsegmentatie', def: 'Het netwerk opdelen in zones met firewalls ertussen, zodat een overgenomen zone niet zomaar bij de andere kan.' },
    { term: 'Springplank', def: 'Een host die aan meerdere netten hangt en waarmee een aanvaller van het ene net naar het andere stapt (jumphost).' },
    { term: 'Cronjob', def: 'Een taak die automatisch op gezette tijden draait. Draait hij als root en kun jij het script aanpassen, dan is dat een weg naar root.' },
    { term: 'Lateraal bewegen', def: 'Binnen een netwerk van host naar host stappen nadat je ergens binnen bent, richting het echte doel.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Remote Services, SSH (T1021.004)', url: 'https://attack.mitre.org/techniques/T1021/004/' },
    { title: 'MITRE ATT&CK: Scheduled Task/Job, Cron (T1053.003)', url: 'https://attack.mitre.org/techniques/T1053/003/' },
  ],
});
