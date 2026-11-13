/* Game room: Rood tegen Blauw — Operatie Gelijkspel (offensief + defensief) */
CS.registerRoom({
  id: 'range-rood-vs-blauw',
  path: 'gamerooms',
  order: 11,
  title: 'Rood tegen Blauw: Operatie Gelijkspel',
  difficulty: 'Moeilijk',
  level: 'Expert',
  checked: '2026-11-13',
  minutes: 45,
  summary: 'Eerst breek je als rood team in op een server. Daarna draai je om: je zoekt je eigen sporen terug in de logs die je zojuist hebt gemaakt. Zo leer je wat een aanvaller achterlaat.',
  objectives: [
    'Een server overnemen en twee vlaggen pakken (rood)',
    'Je eigen aanval terugvinden in de logs: welk adres, welk account, hoe laat (blauw)',
    'Elke aanvalsstap koppelen aan een detectie en een maatregel',
  ],
  tasks: [
    {
      title: 'Taak 1 — De oefening',
      content: `
        <p>Deze oefening heeft twee helften. In <strong>taak 2</strong> ben je het <strong>rode team</strong>: je neemt een server over,
        net als in de andere oefenranges. In <strong>taak 3</strong> ben je het <strong>blauwe team</strong>: je krijgt de logs van diezelfde
        server te zien, en je zoekt jouw eigen sporen terug.</p>
        <p>Dat is de beste les in wat een aanvaller achterlaat. Elke stap die je als rood zet, laat iets na: een verzoek in de
        webserverlog, een aanmelding in de auth-log, een sudo-regel. Als blauw leer je die te lezen.</p>
        <p>In deze oefening ligt het aanvalsadres vast (<code>203.0.113.133</code>), zodat de logs in taak 3 precies op jouw aanval
        aansluiten.</p>
        <div class="callout warn"><strong>Let op:</strong> dit mag alleen in dit lab of met schriftelijke toestemming. Ongeautoriseerd
        binnendringen is computervredebreuk (art. 138ab Sr).</div>
      `,
      questions: [
        { q: 'Je logt als aanvaller in met een gevonden wachtwoord en gebruikt daarna sudo. Welke twee logbronnen verraden dat het duidelijkst?',
          options: ['De DNS-log en de DHCP-log', 'De auth-log (aanmelding en sudo) en de webserverlog (hoe je het wachtwoord vond)', 'De printerlog en de mailserverlog', 'Alleen de firewalllog'],
          answer: 1,
          wrong: { 0: 'DNS en DHCP gaan over namen en adressen, niet over deze aanmelding.', 2: 'Printer en mail spelen hier geen rol.', 3: 'De firewall ziet verkeer, maar niet welk account inlogde of sudo gebruikte.' },
          explain: 'De auth-log toont de geslaagde aanmelding en het sudo-gebruik; de webserverlog toont hoe je bij het wachtwoord kwam.' },
      ],
    },
    {
      title: 'Taak 2 — Rood: de inbraak',
      content: `
        <p>Neem de server over. Begin met <code>scan ext</code>, bekijk de webserver, vind het wachtwoord, log in en word root. Twee
        vlaggen. Onthoud wat je doet: in de volgende taak zoek je het terug.</p>
      `,
      lab: {
        type: 'range',
        title: 'Operatie Gelijkspel · app-05',
        role: 'Rode-teamlid met opdracht om app-05 van Haven Analytics (fictief) te testen vanaf het vaste aanvalsadres 203.0.113.133.',
        story: 'Je valt aan vanaf een vast adres, zodat het blauwe team de oefening daarna kan naspelen op jouw sporen.',
        mandate: [
          'Alles in deze oefening is gesimuleerd. Doe dit nooit op systemen zonder schriftelijke toestemming.',
          'Je scope is uitsluitend app-05.',
          'Je werkt vanaf het afgesproken aanvalsadres 203.0.113.133.',
          'Leg je stappen vast: in taak 3 zoek je ze terug in de logs.',
        ],
        startNet: 'ext',
        startScan: 'ext',
        maxNoise: 100,
        quietUnder: 50,
        nets: { ext: { cidr: 'ext', label: 'internet' } },
        motd: 'Operatie Gelijkspel. Typ help. Begin met scan ext.',
        hosts: [
          {
            name: 'app-05', ip: '203.0.113.5', net: 'ext', role: 'Rapportageportaal (Apache)',
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH 8.9' }, { n: 80, svc: 'http', ver: 'Apache 2.4.52' }],
            pages: {
              '/': 'Haven Analytics - rapportageportaal\nAanmelden via /portal.',
              '/robots.txt': 'User-agent: *\nDisallow: /uploads',
              '/uploads': 'Index van /uploads:\n  db.conf.bak\n  logo.png',
              '/uploads/': 'Index van /uploads:\n  db.conf.bak\n  logo.png',
              '/uploads/db.conf.bak': "# databaseconfig (back-up, per ongeluk online)\nuser=wdeploy\npass=Deploy2025!\n# zelfde account als de serverlogin",
            },
            secrets: [
              { loc: 'web:/uploads/db.conf.bak', cred: { user: 'wdeploy', pass: 'Deploy2025!', target: 'app-05', note: 'uit db.conf.bak' } },
            ],
            accounts: { wdeploy: 'Deploy2025!' },
            files: {
              '/home/wdeploy/user.txt': 'NM{rood_eerste_vlag}',
              '/root/root.txt': 'NM{rood_root_gehaald}',
            },
            escalation: { via: 'sudo', token: 'env', show: '/usr/bin/env', note: 'env mag je als root draaien en kan een shell openen; zo word je root' },
            flags: [
              { id: 'user', value: 'NM{rood_eerste_vlag}', path: '/home/wdeploy/user.txt', root: false, points: 10 },
              { id: 'root', value: 'NM{rood_root_gehaald}', path: '/root/root.txt', root: true, points: 15 },
            ],
          },
        ],
        objectives: [
          { text: 'Een shell op app-05', found: ['shell:app-05'], points: 10 },
          { text: 'De gebruikersvlag', flags: ['user'], points: 10 },
          { text: 'Root en de rootvlag', flags: ['root'], points: 15 },
        ],
        flag: 'NM{rood_root_gehaald}',
        solution: ['scan ext', 'scan app-05', 'web app-05 /robots.txt', 'web app-05 /uploads/', 'web app-05 /uploads/db.conf.bak', 'ssh wdeploy@app-05', 'cat /home/wdeploy/user.txt', 'sudo -l', 'escalate env', 'cat /root/root.txt', 'done'],
        solutionNotes: [
          'Vind het doelwit.',
          'Open poorten: 22 en 80.',
          'robots.txt verraadt /uploads.',
          'Daar staat een back-up van de databaseconfig.',
          'Met het wachtwoord erin, dat ook de serverlogin is.',
          'Log in als wdeploy.',
          'De eerste vlag.',
          'sudo -l toont wat je als root mag draaien.',
          'Daarmee word je root.',
          'De tweede vlag.',
          'Rond af; ga nu naar taak 3.',
        ],
        debrief: `
          <p>Je bent binnen en weer root. Onthoud je stappen: in taak 3 zoek je ze terug in de logs die dit heeft achtergelaten.
          Elke stap die je zette, had het blauwe team kunnen zien; wat elke stap had gestopt, staat per stap uitgewerkt in taak 4.</p>
          <p>Verder leren: <a href="#/room/logs-detectie">Logs en detectie</a>, <a href="#/room/siem-threat-hunting">SIEM en threat hunting</a>.</p>
        `,
        ask: [
          { q: 'Welk account gebruikte je om in te loggen?', answer: ['wdeploy'] },
          { q: 'Via welk bestand vond je het wachtwoord?', answer: ['db.conf.bak', '/uploads/db.conf.bak'] },
        ],
      },
      questions: [
        { q: 'Pak beide vlaggen (rood). Welke rootvlag krijg je?', answer: ['NM{rood_root_gehaald}'], encoded: true,
          hints: ['De rootvlag staat in /root; lees hem als je root bent.', 'Het wachtwoord staat in de back-up in /uploads.', 'Word wdeploy, bekijk sudo -l en draai escalate met het programma dat je als root mag draaien.'],
          explain: 'Nu je weet welke stappen je zette, kun je ze in taak 3 terugvinden in de logs.' },
      ],
    },
    {
      title: 'Taak 3 — Blauw: zoek je eigen sporen',
      content: `
        <p>Nu ben je het blauwe team. Hieronder staan de logs van app-05 over het tijdvak van jouw aanval. Zoek je eigen sporen terug:
        vanaf welk adres kwam de aanval, welk account logde in, hoe laat werd er root gehaald, en via welk pad vond de aanvaller het
        wachtwoord. Gebruik het filter (tekst of <code>/regex/</code>).</p>
      `,
      lab: {
        type: 'logs',
        title: 'app-05 · gecombineerde logs (web + auth)',
        lines: `2026-11-13 09:58:11 [web] 198.51.100.24 GET /portal 200
2026-11-13 10:00:02 [web] 203.0.113.133 GET / 200
2026-11-13 10:00:14 [web] 203.0.113.133 GET /robots.txt 200
2026-11-13 10:00:31 [web] 203.0.113.133 GET /uploads/ 200
2026-11-13 10:00:48 [web] 203.0.113.133 GET /uploads/db.conf.bak 200
2026-11-13 10:01:20 [web] 77.12.9.4 GET /portal 200
2026-11-13 10:02:05 [auth] sshd: Failed password for admin from 45.9.18.2 port 51112
2026-11-13 10:02:40 [auth] sshd: Accepted password for wdeploy from 203.0.113.133 port 52033
2026-11-13 10:03:02 [auth] sshd: pam_unix session opened for user wdeploy
2026-11-13 10:03:55 [auth] sudo: wdeploy : TTY=pts/0 ; PWD=/home/wdeploy ; USER=root ; COMMAND=/usr/bin/env
2026-11-13 10:03:55 [auth] sudo: session opened for user root by wdeploy
2026-11-13 10:05:12 [web] 198.51.100.24 GET /portal 200
2026-11-13 10:07:40 [auth] sshd: Accepted password for jvries from 198.51.100.24 port 50440
2026-11-13 10:09:03 [web] 203.0.113.133 GET /uploads/logo.png 200
2026-11-13 10:12:19 [auth] sshd: Failed password for root from 61.4.200.7 port 40002`
      },
      questions: [
        { q: 'Vanaf welk IP-adres kwam de aanval?', answer: ['203.0.113.133'],
          hints: ['Zoek een adres dat zowel in de webregels als in de auth-regels terugkomt.', 'Filter op het adres dat /uploads/db.conf.bak opvroeg.', 'Het is hetzelfde adres dat daarna als wdeploy inlogt.'],
          wrong: { '45.9.18.2': 'Dat adres probeert admin en faalt; het hoort niet bij de geslaagde inbraak.', '198.51.100.24': 'Dat is een gewone gebruiker (jvries) die normaal werkt.' },
          why: 'Eén adres dat eerst een gevoelig bestand opvraagt en daarna inlogt, is een sterker signaal dan losse mislukte pogingen.',
          explain: 'Hetzelfde adres vraagt db.conf.bak op en logt daarna in als wdeploy: dat is de aanvaller.' },
        { q: 'Welk account werd overgenomen?', answer: ['wdeploy'],
          hints: ['Zoek de geslaagde aanmelding vanaf het aanvalsadres.', 'Filter op "Accepted password" en het aanvalsadres.', 'Het account staat ook in de back-up die werd opgevraagd.'],
          wrong: { 'admin': 'admin faalt juist (Failed password) vanaf een ander adres.', 'jvries': 'jvries is een gewone gebruiker vanaf een intern adres.' },
          explain: 'Accepted password for wdeploy from 203.0.113.133: dat account werd gebruikt.' },
        { q: 'Hoe laat (uu:mm:ss) werd er root gehaald?', answer: ['10:03:55'],
          hints: ['Zoek de regel waarin wdeploy naar root gaat.', 'Filter op "sudo" en "root".', 'De sudo-regel met USER=root draagt de tijd.'],
          wrong: { '10:02:40': 'Dat is de aanmelding als wdeploy, nog niet root.', '10:03:02': 'Dat is het openen van de sessie, nog niet de rechtenverhoging.' },
          why: 'Het exacte moment van rechtenverhoging is het ankerpunt van je tijdlijn: daarvoor was de aanvaller gewone gebruiker, daarna root.',
          explain: 'Om 10:03:55 draait wdeploy via sudo /usr/bin/env als root: het moment van de rechtenverhoging.' },
        { q: 'Welk bestand verraadt hoe de aanvaller het wachtwoord vond? (naam)', answer: ['db.conf.bak', '/uploads/db.conf.bak'], boss: true,
          hints: ['Kijk in de webregels van het aanvalsadres, net voor de aanmelding.', 'Het staat in /uploads en eindigt op .bak.', 'Het is de back-up van een databaseconfig.'],
          wrong: { 'logo.png': 'logo.png werd ook opgevraagd, maar daar staat geen wachtwoord in.' },
          explain: 'Vlak voor de aanmelding vraagt het aanvalsadres /uploads/db.conf.bak op: daar stond het wachtwoord.' },
      ],
    },
    {
      title: 'Taak 4 — De nabespreking: koppel aanval aan verdediging',
      content: `
        <p>Je hebt beide kanten gezien. Zet nu per aanvalsstap wat het blauwe team had kunnen zien en wat het had gestopt. Dat is
        precies het gesprek tussen rood en blauw dat een organisatie sterker maakt (<em>purple teaming</em>).</p>
        <table>
          <thead><tr><th>Aanvalsstap</th><th>Wat blauw ziet</th><th>Wat het stopt</th></tr></thead>
          <tbody>
            <tr><td>Verkenning en /uploads opvragen</td><td>Webverzoeken naar /robots.txt en /uploads van één extern adres</td><td>Geen back-ups in de webroot; alerteren op toegang tot gevoelige paden</td></tr>
            <tr><td>Inloggen als wdeploy</td><td>Accepted password vanaf een extern adres voor een serviceaccount</td><td>Sleutels in plaats van wachtwoorden; geen externe SSH; MFA</td></tr>
            <tr><td>sudo naar root</td><td>sudo met USER=root door een account dat dat normaal nooit doet</td><td>Geen ruime NOPASSWD-sudo; alerteren op sudo door serviceaccounts</td></tr>
          </tbody>
        </table>
      `,
      questions: [
        { q: 'Eén logregel is samen het sterkste alarm. Welke?',
          options: ['Een mislukte aanmelding voor admin vanaf een onbekend adres', 'Een geslaagde aanmelding voor wdeploy vanaf een extern adres, vlak na het opvragen van db.conf.bak', 'Een GET naar /logo.png', 'Een geslaagde aanmelding voor jvries vanaf een intern adres'],
          answer: 1,
          wrong: { 0: 'Mislukte pogingen zijn er altijd; op zichzelf zwak.', 2: 'Een plaatje opvragen is onschuldig.', 3: 'Een interne gebruiker die normaal inlogt, is geen alarm.' },
          why: 'Een detectie wordt sterk als hij twee signalen combineert: toegang tot een gevoelig bestand en daarna een geslaagde aanmelding, vanaf hetzelfde externe adres.',
          explain: 'De combinatie (gevoelig bestand opgevraagd, daarna geslaagde login vanaf hetzelfde externe adres) is het sterkste signaal.' },
        { q: 'Wat is de kortste samenvatting van de les van deze oefening?',
          options: ['Aanvallen is makkelijker dan verdedigen', 'Elke aanvalsstap laat een spoor na dat je kunt detecteren en afdekken', 'Logs zijn onbetrouwbaar', 'Alleen een firewall is genoeg'],
          answer: 1,
          wrong: { 0: 'Dat is geen les uit de oefening; het punt is dat beide kanten elkaar versterken.', 2: 'De logs waren juist het bewijs; ze zijn waardevol.', 3: 'Een firewall zag het account en de sudo niet eens.' },
          explain: 'Wie beide kanten kent, bouwt betere detectie: elke stap van rood is een kans voor blauw.' },
      ],
    },
  ],
  terms: [
    { term: 'Rood team', def: 'De aanvallende kant in een oefening: zoekt en benut zwakheden om te laten zien wat mogelijk is.' },
    { term: 'Blauw team', def: 'De verdedigende kant: detecteert, reageert en versterkt op basis van wat er gebeurt.' },
    { term: 'Purple teaming', def: 'Rood en blauw die samenwerken: elke aanvalsstap wordt meteen een detectie en een maatregel.' },
    { term: 'auth-log', def: 'Het logbestand met aanmeldingen en rechtenverhogingen (SSH, sudo) op een Linux-systeem.' },
    { term: 'Detectie', def: 'Een regel of signaal dat kwaadaardig gedrag zichtbaar maakt, het liefst door meerdere aanwijzingen te combineren.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Valid Accounts (T1078)', url: 'https://attack.mitre.org/techniques/T1078/' },
    { title: 'NCSC: logging en detectie', url: 'https://www.ncsc.nl/' },
  ],
});
