/* Game room: Eerste inbraak (offensief, gesimuleerd) */
CS.registerRoom({
  id: 'range-eerste-inbraak',
  path: 'gamerooms',
  order: 6,
  title: 'Eerste inbraak',
  difficulty: 'Makkelijk',
  level: 'Praktijk',
  checked: '2026-11-13',
  minutes: 30,
  summary: 'Je mag als pentester één webserver van Kade Transport testen. Verken hem, vind de verborgen map, log in met wat je vindt, en word root. Twee vlaggen.',
  objectives: [
    'Een doelwit verkennen met een poortscan en de webserver bekijken',
    'Inloggegevens vinden die ergens zijn blijven slingeren',
    'Van een gewone gebruiker root worden via een verkeerd ingestelde sudo-regel',
    'Begrijpen wat de beheerder bij elke stap had kunnen zien en voorkomen',
  ],
  tasks: [
    {
      title: 'Taak 1 — De opdracht',
      content: `
        <p>Dit is je eerste <strong>oefenrange</strong>: een nagebootst doelwit in je browser. Je typt opdrachten in een console,
        en de "aanval" is een puzzel. Er wordt niets echt uitgevoerd en er gaat niets het netwerk op; het is een simulatie om te
        leren hoe een aanvaller denkt, zodat je het kunt tegenhouden.</p>
        <p>De aanpak is bijna altijd dezelfde keten:</p>
        <ol>
          <li><strong>Verkennen</strong>: welke poorten en diensten staan open? (<code>scan</code>)</li>
          <li><strong>Een ingang vinden</strong>: een verborgen map, een vergeten bestand, een zwak wachtwoord. (<code>web</code>)</li>
          <li><strong>Binnenkomen</strong>: inloggen met wat je vond. (<code>ssh</code>)</li>
          <li><strong>Rechten verhogen</strong>: van gewone gebruiker naar root. (<code>sudo -l</code>, <code>escalate</code>)</li>
        </ol>
        <p>Let op de <strong>ontdekkingsmeter</strong> rechtsboven: hoe luidruchtiger je bent (een breed scan, blind wachtwoorden
        proberen), hoe sneller de verdediger je ziet. Staat hij vol, dan ben je betrapt en ben je de range kwijt.</p>
        <div class="callout warn"><strong>Let op:</strong> dit mag je alleen in dit lab of op systemen met schriftelijke toestemming.
        Ongeautoriseerd binnendringen is computervredebreuk (art. 138ab Sr).</div>
      `,
      questions: [
        { q: 'Je vindt een databasewachtwoord in een vergeten back-upbestand op de webserver, en het blijkt ook het SSH-wachtwoord van de beheerder. Welke fout maakt dit mogelijk?',
          options: ['Een te sterk wachtwoord', 'Wachtwoordhergebruik en een gevoelig bestand in de webroot', 'Een verouderde nginx-versie', 'Een open poort 22'],
          answer: 1,
          wrong: { 0: 'Een sterk wachtwoord is juist goed; het probleem is dat hetzelfde wachtwoord op meer plekken geldt.', 2: 'Een oude versie kan een risico zijn, maar hier is het de combinatie van een gelekt bestand en hergebruik.', 3: 'Poort 22 open is normaal; het wachtwoord dat uitlekt is het probleem.' },
          explain: 'Een geheim in de webroot plus hetzelfde wachtwoord voor database en SSH: twee fouten die samen de inbraak maken.' },
      ],
    },
    {
      title: 'Taak 2 — De range',
      content: `
        <p>Lees de rules of engagement, start de oefening en typ <code>help</code>. Begin met <code>scan ext</code> om het doelwit te
        vinden, en daarna <code>scan</code> op het adres zelf. Bekijk de webserver met <code>web</code>, en vergeet
        <code>/robots.txt</code> niet. Elke leerling krijgt een eigen variant; de walkthrough komt vrij na je eerste poging.</p>
      `,
      lab: {
        type: 'range',
        title: 'Kade Transport · web-01',
        role: 'Pentester met een getekende opdracht om alleen web-01 (de publieke webserver van Kade Transport BV, fictief) te testen.',
        story: 'De klant wil weten of een aanvaller vanaf internet bij de server kan. Je krijgt alleen het begin van het netwerk; de rest zoek je zelf.',
        mandate: [
          'Alles in deze oefening is gesimuleerd. Doe dit nooit op systemen zonder schriftelijke toestemming.',
          'Je scope is uitsluitend web-01. Blijf erbinnen.',
          'Werk zo stil mogelijk: een goede pentester maakt niet onnodig lawaai.',
          'Leg vast wat je doet, zodat de klant het incident later kan naspelen.',
        ],
        vars: {
          ip: ['203.0.113.10', '198.51.100.10', '192.0.2.10', '203.0.113.60'],
          pass: ['Zomer2024!', 'Welkom-2025', 'Fiets#Blauw7', 'Koffie@0800', 'R0zenstruik'],
          tool: ['tar', 'awk', 'less'],
        },
        startNet: 'ext',
        startScan: 'ext',
        maxNoise: 100,
        quietUnder: 45,
        nets: { ext: { cidr: 'ext', label: 'internet' } },
        motd: 'Oefenrange web-01. Typ help. Begin met scan ext.',
        hosts: [
          {
            name: 'web-01', ip: '{{ip}}', net: 'ext', role: 'Publieke webserver (nginx)',
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH 8.9' }, { n: 80, svc: 'http', ver: 'nginx 1.18.0', note: 'webshop' }],
            pages: {
              '/': 'Kade Transport BV - vrachten over water\nWelkom op ons portaal. Log in via /beheer.',
              '/robots.txt': 'User-agent: *\nDisallow: /backup\nDisallow: /beheer',
              '/beheer': 'Beheerdersaanmelding. Gebruikersnaam en wachtwoord vereist.',
              '/backup': 'Index van /backup:\n  config.php.bak\n  readme.txt',
              '/backup/': 'Index van /backup:\n  config.php.bak\n  readme.txt',
              '/backup/readme.txt': 'Tijdelijke back-up voor de migratie. NIET online laten staan. (staat er nog steeds)',
              '/backup/config.php.bak': "<?php\n$db_host='localhost';\n$db_user='webadmin';\n$db_pass='{{pass}}';  // zelfde als serverlogin, moet ik nog scheiden\n?>",
            },
            secrets: [
              { loc: 'web:/backup/config.php.bak', cred: { user: 'webadmin', pass: '{{pass}}', target: 'web-01', note: 'uit config.php.bak' } },
            ],
            accounts: { webadmin: '{{pass}}' },
            files: {
              '/home/webadmin/user.txt': 'NM{eerste_voet_binnen}',
              '/home/webadmin/notities.txt': 'todo: wachtwoorden scheiden, back-upmap weghalen',
              '/root/root.txt': 'NM{kade_tot_root}',
            },
            escalation: { via: 'sudo', token: '{{tool}}', show: '/usr/bin/{{tool}}', note: '{{tool}} mag je als root draaien en kan een shell openen; zo word je root' },
            flags: [
              { id: 'user', value: 'NM{eerste_voet_binnen}', path: '/home/webadmin/user.txt', root: false, points: 10 },
              { id: 'root', value: 'NM{kade_tot_root}', path: '/root/root.txt', root: true, points: 15 },
            ],
          },
        ],
        objectives: [
          { text: 'Een shell op web-01 gekregen', found: ['shell:web-01'], points: 10 },
          { text: 'De gebruikersvlag gevonden', flags: ['user'], points: 10 },
          { text: 'Root geworden en de rootvlag gevonden', flags: ['root'], points: 15 },
        ],
        flag: 'NM{kade_tot_root}',
        solution: ['scan ext', 'scan web-01', 'web web-01', 'web web-01 /robots.txt', 'web web-01 /backup/', 'web web-01 /backup/config.php.bak', 'ssh webadmin@web-01', 'cat /home/webadmin/user.txt', 'sudo -l', 'escalate {{tool}}', 'cat /root/root.txt', 'done'],
        solutionNotes: [
          'Vind het doelwit op internet.',
          'Open poorten: 22 (SSH) en 80 (web).',
          'De voorpagina wijst naar /beheer.',
          'robots.txt verraadt een map die niet gevonden had mogen worden: /backup.',
          'In /backup staat een back-up van een configuratiebestand.',
          'Daarin staat het wachtwoord, met de opmerking dat het ook de serverlogin is.',
          'Log in als webadmin; het wachtwoord staat nu in je kladblok.',
          'De eerste vlag staat in de thuismap.',
          'sudo -l laat zien welk programma je als root mag draaien.',
          'Dat programma brengt je naar root.',
          'De tweede vlag staat in /root.',
          'Rond af.',
        ],
        debrief: `
          <h4>De keten die je liep</h4>
          <ol>
            <li>Verkenning van een publieke server (ATT&CK T1595).</li>
            <li>Een gevoelig bestand in de webroot, gevonden via robots.txt (T1083, T1552.001: inloggegevens in een bestand).</li>
            <li>Inloggen met een geldig, hergebruikt wachtwoord (T1078).</li>
            <li>Rechtenverhoging via een verkeerd ingestelde sudo-regel (T1548.003).</li>
          </ol>
          <h4>Wat de beheerder had kunnen zien</h4>
          <ul>
            <li>Verzoeken naar <code>/backup</code> en <code>/robots.txt</code> in de webserverlogs.</li>
            <li>Een SSH-aanmelding van het webadmin-account vanaf een extern adres.</li>
            <li>Het gebruik van sudo door een account dat dat normaal nooit doet.</li>
          </ul>
          <h4>Wat elke stap had gestopt</h4>
          <ul>
            <li>Geen back-ups of configuratiebestanden in de webroot, en een strak <code>robots.txt</code> is geen beveiliging.</li>
            <li>Verschillende wachtwoorden voor database en serverlogin, en liever sleutels dan wachtwoorden voor SSH.</li>
            <li>Geen <code>NOPASSWD</code>-sudo op programmas die een shell kunnen openen; alleen precies wat nodig is.</li>
          </ul>
          <p>Verder leren: <a href="#/room/verkenning-scannen">Verkenning en scannen</a>,
          <a href="#/room/linux-container-hardening">Linux- en containerhardening</a>,
          <a href="#/room/wachtwoorden-authenticatie">Wachtwoorden en authenticatie</a>.</p>
        `,
        ask: [
          { q: 'Welk account gebruikte je om in te loggen?', answer: ['webadmin'] },
          { q: 'Via welke map vond je het wachtwoord? (begin met /)', answer: ['/backup', '/backup/'] },
        ],
      },
      questions: [
        { q: 'Pak beide vlaggen. Welke rootvlag krijg je in de nabespreking?', answer: ['NM{kade_tot_root}'], encoded: true,
          hints: ['De rootvlag staat in /root en kun je pas lezen als je root bent.', 'Word eerst webadmin via het gevonden wachtwoord, bekijk dan sudo -l.', 'Draai escalate met het programma dat sudo -l je als root laat draaien, en lees daarna /root/root.txt.'],
          explain: 'De rootvlag verschijnt in de nabespreking zodra je root bent en hem leest. Elke variant heeft een eigen vlagwoord; probeer een andere variant zonder walkthrough.' },
        { q: 'Een breed poortscan over het hele internetblok leek sneller, maar je deed het gericht. Waarom?',
          options: ['Omdat een gericht scan meer poorten vindt', 'Omdat een breed, luidruchtig scan de ontdekkingsmeter snel vult en je buiten scope brengt', 'Omdat scannen verboden is', 'Omdat de server dan crasht'],
          answer: 1,
          wrong: { 0: 'Een gericht scan vindt niet meer poorten; het valt alleen minder op.', 2: 'Scannen binnen je scope mag; het gaat om hoe luid je het doet.', 3: 'De server crasht er niet van; het gaat om opvallen en om je scope.' },
          why: 'Een pentester werkt binnen scope en zo stil als kan. Onnodig lawaai waarschuwt de verdediger en kan buiten de afspraak vallen.',
          explain: 'Gericht blijven scheelt ruis op de ontdekkingsmeter en houdt je binnen de afgesproken scope (alleen web-01).' },
      ],
    },
    {
      title: 'Taak 3 — De nabespreking',
      content: `
        <p>Lees de nabespreking onder de console. Als pentester is dat het belangrijkste deel: niet dat je binnenkwam, maar wat de
        klant eraan heeft. Elke bevinding krijgt een advies dat de volgende aanvaller tegenhoudt.</p>
        <p>In een echt rapport schrijf je dit uit met risico, bewijs en advies per bevinding. Zie
        <a href="#/room/pentest-methodiek-rapportage">Pentest-methodiek en rapportage</a>.</p>
      `,
      questions: [
        { q: 'Welke maatregel had deze hele keten het vroegst gestopt?',
          options: ['Een sterker rootwachtwoord', 'Geen back-up- en configuratiebestanden in de webroot', 'Een andere webserver dan nginx', 'Poort 80 sluiten'],
          answer: 1,
          wrong: { 0: 'De aanvaller werd nooit gevraagd het rootwachtwoord te raden; hij werd root via sudo.', 2: 'De webserver zelf was niet het probleem.', 3: 'Dan is er geen webshop meer; de fout zat in wat er in de webroot stond.' },
          why: 'Het vroegste punt in de keten is meestal het goedkoopst om te dichten. Zonder het gelekte bestand was er geen wachtwoord en geen ingang.',
          explain: 'Zonder dat gelekte configuratiebestand had de aanvaller geen wachtwoord, en begon de rest van de keten nooit.' },
        { q: 'Welke ATT&CK-techniek hoort bij het vinden van een wachtwoord dat in een bestand op het systeem staat? (ID)', answer: ['T1552.001', 't1552.001'],
          hints: ['Het valt onder Unsecured Credentials, T1552.', 'De eerste subtechniek gaat over inloggegevens in bestanden.', 'Het is T1552 punt nul nul een.'],
          wrong: { 't1552': 'Dat is de techniek; gevraagd is de subtechniek voor inloggegevens in bestanden.', 't1078': 'Dat is Valid Accounts: het gebruiken van het wachtwoord, niet het vinden ervan.' },
          explain: 'T1552.001 Credentials In Files: wachtwoorden en sleutels die in gewone bestanden staan.' },
      ],
    },
  ],
  terms: [
    { term: 'Oefenrange', def: 'Een nagebootst doelwit of netwerk om legaal op te oefenen, hier volledig in de browser gesimuleerd.' },
    { term: 'Webroot', def: 'De map die de webserver aan bezoekers toont. Alles wat er staat, kan opgevraagd worden; gevoelige bestanden horen er niet.' },
    { term: 'Rechtenverhoging', def: 'Van een gewone gebruiker naar root of beheerder, meestal via een verkeerde instelling (privilege escalation).' },
    { term: 'sudo', def: 'Een opdracht als een andere gebruiker (vaak root) uitvoeren. Een te ruime sudo-regel is een veelgemaakte fout.' },
    { term: 'Wachtwoordhergebruik', def: 'Hetzelfde wachtwoord op meer plekken. Lekt het op één plek, dan vallen de andere ook.' },
    { term: 'Ontdekkingsmeter', def: 'In deze range: hoe zichtbaar je bezig bent. Luidruchtig scannen en blind proberen vullen hem.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Unsecured Credentials (T1552)', url: 'https://attack.mitre.org/techniques/T1552/' },
    { title: 'OWASP: Testing for Exposed Backup and Old Files (WSTG)', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
  ],
});
