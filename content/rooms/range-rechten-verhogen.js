/* Game room: Rechten verhogen (offensief, gesimuleerd) */
CS.registerRoom({
  id: 'range-rechten-verhogen',
  path: 'gamerooms',
  order: 7,
  title: 'Rechten verhogen',
  difficulty: 'Gemiddeld',
  level: 'Praktijk',
  checked: '2026-11-13',
  minutes: 35,
  summary: 'Je hebt al snel een shell als gewone gebruiker op een Linux-host van Gemeente Meerdijk. De kunst is de weg naar root: er liggen meerdere sporen (sudo -l, find-suid, crontab -l), maar maar een ervan werkt echt. Twee vlaggen.',
  objectives: [
    'Een gelekt wachtwoord vinden en als gewone gebruiker inloggen',
    'Alle drie de bekende sporen naar root onderzoeken en de valkuilen herkennen',
    'Root worden via een verkeerd gezette SUID-bit en de rootvlag pakken',
    'Begrijpen wat de beheerder bij elke stap had kunnen zien en voorkomen',
  ],
  tasks: [
    {
      title: 'Taak 1 - De opdracht',
      content: `
        <p>In de vorige range kwam je binnen. Deze range gaat over de stap daarna: <strong>rechten verhogen</strong>
        (privilege escalation). Je krijgt het makkelijke deel bijna cadeau. Een gewone gebruiker ben je zo, want zijn
        wachtwoord staat voor het oprapen op de webserver. De echte puzzel is: hoe word je van die gewone gebruiker
        <strong>root</strong>?</p>
        <p>Op een Linux-host zijn er drie klassieke plekken om te kijken:</p>
        <ol>
          <li><code>sudo -l</code>: welke opdrachten mag je als root draaien zonder je eigen wachtwoord?</li>
          <li><code>find-suid</code>: welke programmas draaien altijd als hun eigenaar (vaak root), door de SUID-bit?</li>
          <li><code>crontab -l</code>: welke taken draaien automatisch, en als wie?</li>
        </ol>
        <p>Niet elk spoor leidt ergens heen. Je komt een SUID-programma tegen dat niets oplevert (zo hoort het: <code>passwd</code>
        en <code>sudo</code> hebben die bit met een goede reden) en een geplande taak die je niet kunt beinvloeden. Precies een
        van de drie sporen is de echte fout. Dat scheiden van de valse sporen is de vaardigheid die je hier oefent.</p>
        <p>Let weer op de <strong>ontdekkingsmeter</strong>: blind wachtwoorden proberen of een mislukte escalatie valt op.
        Zoek eerst, raad niet.</p>
        <div class="callout warn"><strong>Let op:</strong> dit mag je alleen in dit lab of op systemen met schriftelijke toestemming.
        Ongeautoriseerd binnendringen en rechten verhogen is computervredebreuk (art. 138ab Sr).</div>
      `,
      questions: [
        { q: 'Een programma heeft ten onrechte de SUID-bit en kan andere opdrachten starten. Waarom is dat gevaarlijk?',
          options: ['Het programma draait trager', 'Het draait met de rechten van de eigenaar (vaak root), dus elke opdracht die het start, start ook als root', 'Het is zichtbaar in de proceslijst', 'Het gebruikt meer geheugen'],
          answer: 1,
          wrong: { 0: 'Snelheid heeft er niets mee te maken; het gaat om de rechten waarmee het draait.', 2: 'Zichtbaarheid in ps is normaal en niet het probleem.', 3: 'Geheugengebruik is niet de zwakte; de rechten zijn dat.' },
          explain: 'De SUID-bit laat een programma draaien als zijn eigenaar. Staat die bit op een programma dat andere opdrachten kan starten, dan draaien die opdrachten ook als de eigenaar, en dus als root.' },
        { q: 'Je hebt een shell als gewone gebruiker en wilt root worden. Wat doe je eerst?',
          options: ['Blind het rootwachtwoord raden', 'De bekende sporen onderzoeken (sudo -l, find-suid, crontab -l) voordat je iets probeert', 'De server opnieuw opstarten', 'Meteen escalate typen'],
          answer: 1,
          wrong: { 0: 'Blind raden vult de ontdekkingsmeter en levert zelden iets op.', 2: 'Opnieuw opstarten helpt niet en valt enorm op.', 3: 'escalate werkt pas als je de zwakte eerst hebt gezien; zoeken gaat voor.' },
          explain: 'Eerst verkennen welke zwakte er is, dan pas handelen. Zo voorkom je lawaai en mislukte pogingen.' },
      ],
    },
    {
      title: 'Taak 2 - De range',
      content: `
        <p>Lees de rules of engagement, start de oefening en typ <code>help</code>. Zoek eerst het doelwit en het gelekte
        wachtwoord, en kom binnen als gewone gebruiker. Onderzoek daarna <strong>alle drie</strong> de sporen naar root voordat
        je conclusies trekt: <code>sudo -l</code>, <code>find-suid</code> en <code>crontab -l</code>. Maar een ervan is de echte
        fout. Elke leerling krijgt een eigen variant; de walkthrough komt vrij na je eerste poging.</p>
      `,
      lab: {
        type: 'range',
        title: 'Gemeente Meerdijk · app-03',
        role: 'Pentester met een getekende opdracht om alleen app-03 (een interne applicatieserver van Gemeente Meerdijk, fictief) te testen.',
        story: 'De gemeente wil weten hoever een aanvaller komt die al een gewoon account heeft bemachtigd. Je start met toegang tot het netwerk waar app-03 aan hangt; de rest zoek je zelf.',
        mandate: [
          'Alles in deze oefening is gesimuleerd. Doe dit nooit op systemen zonder schriftelijke toestemming.',
          'Je scope is uitsluitend app-03. Blijf erbinnen.',
          'Werk zo stil mogelijk: blind proberen en mislukte pogingen vallen op.',
          'Leg vast wat je doet, zodat de gemeente het incident later kan naspelen.',
        ],
        vars: {
          ip: ['203.0.113.23', '198.51.100.23', '192.0.2.23', '203.0.113.71'],
          pass: ['Meerdijk-2025!', 'Lente#Groen4', 'Tulp@0318', 'Kaasstolp7', 'Gracht-Blauw9'],
          tool: ['find', 'env', 'vim'],
          leak: ['/.env', '/config/app.env', '/intern/settings.env'],
        },
        startNet: 'ext',
        startScan: 'ext',
        maxNoise: 100,
        quietUnder: 45,
        nets: { ext: { cidr: 'ext', label: 'intern netwerk' } },
        motd: 'Oefenrange app-03. Typ help. Begin met scan ext.',
        hosts: [
          {
            name: 'app-03', ip: '{{ip}}', net: 'ext', role: 'Interne applicatieserver (Linux, nginx + Node)',
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH 9.2' }, { n: 80, svc: 'http', ver: 'nginx 1.24.0', note: 'aanvraagportaal' }],
            pages: {
              '/': 'Gemeente Meerdijk - intern aanvraagportaal\nAanmelden via /portaal. Ontwikkelaarsnotities: zie /robots.txt.',
              '/robots.txt': 'User-agent: *\nDisallow: {{leak}}\nDisallow: /backup',
              '/portaal': 'Aanmeldscherm. Gebruikersnaam en wachtwoord vereist.',
              '/backup': 'Index van /backup:\n  dump-2023.sql.gz  (0 bytes, leeg)\n  oud-logo.png',
              '/backup/': 'Index van /backup:\n  dump-2023.sql.gz  (0 bytes, leeg)\n  oud-logo.png',
              '{{leak}}': "# Omgevingsbestand - per ongeluk via de webserver bereikbaar\nAPP_USER=jdevries\nAPP_PASS={{pass}}\n# NB: dit is ook het Linux-wachtwoord van jdevries, nog scheiden",
            },
            secrets: [
              { loc: 'web:{{leak}}', cred: { user: 'jdevries', pass: '{{pass}}', target: 'app-03', note: 'uit het omgevingsbestand op de webserver' } },
            ],
            accounts: { jdevries: '{{pass}}' },
            files: {
              '/home/jdevries/user.txt': 'NM{voet_aan_de_grond}',
              '/home/jdevries/leesmij.txt': 'todo: APP_PASS niet in de webroot laten staan, en apart van mijn serverwachtwoord zetten',
              '/root/root.txt': 'NM{suid_naar_root}',
              '/root/overdracht.txt': 'Herinnering: het back-upaccount gebruikt nog hetzelfde wachtwoord als hier. Scheiden!',
            },
            escalation: { via: 'suid', token: '{{tool}}', show: '/usr/bin/{{tool}}', note: '{{tool}} heeft hier ten onrechte de SUID-bit, draait dus als de eigenaar (root) en kan andere opdrachten starten; zo word je root' },
            onRoot: [
              { cred: { user: 'backupsvc', pass: '{{pass}}', target: 'backup-01', note: 'uit /root/overdracht.txt; hergebruikt wachtwoord' }, text: 'Loot: het back-upaccount backupsvc (voor backup-01) gebruikt hetzelfde wachtwoord. Buiten scope hier, maar wel een bevinding voor het rapport.' },
            ],
            flags: [
              { id: 'user', value: 'NM{voet_aan_de_grond}', path: '/home/jdevries/user.txt', root: false, points: 10 },
              { id: 'root', value: 'NM{suid_naar_root}', path: '/root/root.txt', root: true, points: 15 },
            ],
          },
        ],
        objectives: [
          { text: 'Een shell op app-03 gekregen als jdevries', found: ['shell:app-03'], points: 10 },
          { text: 'De gebruikersvlag gevonden', flags: ['user'], points: 10 },
          { text: 'Root geworden via de SUID-fout en de rootvlag gevonden', flags: ['root'], points: 15 },
        ],
        flag: 'NM{suid_naar_root}',
        solution: ['scan ext', 'scan app-03', 'web app-03', 'web app-03 /robots.txt', 'web app-03 {{leak}}', 'ssh jdevries@app-03', 'cat /home/jdevries/user.txt', 'sudo -l', 'crontab -l', 'find-suid', 'escalate {{tool}}', 'cat /root/root.txt', 'done'],
        solutionNotes: [
          'Vind het doelwit op het interne netwerk.',
          'Open poorten: 22 (SSH) en 80 (web).',
          'De voorpagina wijst naar ontwikkelaarsnotities in robots.txt.',
          'robots.txt verraadt een omgevingsbestand dat niet online had mogen staan.',
          'In dat bestand staat het wachtwoord van jdevries, ook zijn serverlogin.',
          'Log in als jdevries; het wachtwoord staat nu in je kladblok.',
          'De eerste vlag staat in de thuismap.',
          'Spoor 1: sudo -l geeft hier niets; geen bruikbare sudo-regel.',
          'Spoor 3: crontab -l toont geen taak die je kunt beinvloeden.',
          'Spoor 2: find-suid toont een programma met de SUID-bit dat er niet hoort.',
          'Dat programma draait als root en brengt je naar root.',
          'De tweede vlag staat in /root; daar vind je ook de loot voor het rapport.',
        ],
        debrief: `
          <h4>De keten die je liep</h4>
          <ol>
            <li>Verkenning van een interne server (ATT&CK T1595).</li>
            <li>Een omgevingsbestand met een wachtwoord in de webroot, gevonden via robots.txt (T1083, T1552.001: inloggegevens in een bestand).</li>
            <li>Inloggen met een geldig, hergebruikt wachtwoord (T1078).</li>
            <li>Rechtenverhoging via een verkeerd gezette SUID-bit (T1548.001: Setuid and Setgid).</li>
          </ol>
          <h4>De valse sporen</h4>
          <ul>
            <li><code>sudo -l</code> gaf niets: er was geen te ruime sudo-regel. Een leeg resultaat is ook informatie.</li>
            <li><code>crontab -l</code> toonde geen taak die je kon beinvloeden. Een geplande taak die als root draait is pas een
            risico als jij het script of een pad erin kunt aanpassen; dat kon hier niet.</li>
            <li><code>find-suid</code> toonde ook <code>passwd</code> en <code>sudo</code>. Die horen de SUID-bit te hebben en
            leveren je niets op. De fout was het derde programma, dat die bit niet hoort te hebben.</li>
          </ul>
          <h4>Wat de beheerder had kunnen zien</h4>
          <ul>
            <li>Een verzoek naar het omgevingsbestand en <code>/robots.txt</code> in de webserverlogs.</li>
            <li>Een SSH-aanmelding van jdevries vanaf een ongebruikelijk adres (T1078).</li>
            <li>Een proces dat via het SUID-programma een shell als root startte, zichtbaar in auditd of EDR (T1548.001).</li>
          </ul>
          <h4>Wat elke stap had gestopt</h4>
          <ul>
            <li>Geen omgevings- of configuratiebestanden in de webroot, en verschillende wachtwoorden voor applicatie en serverlogin.</li>
            <li>Een strak SUID-beleid: regelmatig <code>find</code> op onverwachte SUID-bestanden, en die bit alleen waar hij echt nodig is.</li>
            <li>Geen wachtwoordhergebruik tussen accounts (het back-upaccount deelde het wachtwoord), liefst aparte sleutels per dienst.</li>
          </ul>
          <p>Verder leren: <a href="#/room/linux-container-hardening">Linux- en containerhardening</a>,
          <a href="#/room/wachtwoorden-authenticatie">Wachtwoorden en authenticatie</a>,
          <a href="#/room/range-eerste-inbraak">Eerste inbraak</a>.</p>
        `,
        ask: [
          { q: 'Welk van de drie sporen naar root werkte echt? (sudo, suid of cron)', answer: ['suid', 'find-suid', 'find suid'] },
          { q: 'Welk account gebruikte je om in te loggen?', answer: ['jdevries'] },
        ],
      },
      questions: [
        { q: 'Pak beide vlaggen. Welke rootvlag krijg je in de nabespreking?', answer: ['NM{suid_naar_root}'], encoded: true,
          hints: ['De rootvlag staat in /root en kun je pas lezen als je root bent.', 'Word eerst jdevries via het gelekte wachtwoord, en onderzoek daarna alle drie de sporen.', 'Alleen find-suid levert iets op; escalate met het SUID-programma dat er niet hoort, en lees dan /root/root.txt.'],
          explain: 'De rootvlag verschijnt in de nabespreking zodra je root bent en hem leest. Elke variant heeft een eigen vlagwoord en een eigen SUID-programma; probeer een andere variant zonder walkthrough.' },
        { q: 'Je typte escalate voordat je een spoor had onderzocht, en kreeg een foutmelding plus ruis op de meter. Waarom werkt het zo?',
          options: ['Omdat escalate altijd eerst mislukt', 'Omdat je pas kunt escaleren als je de zwakte hebt gezien; blind proberen valt op', 'Omdat de server traag is', 'Omdat je geen shell had'],
          answer: 1,
          wrong: { 0: 'escalate mislukt niet altijd; het lukt zodra je de juiste zwakte hebt gevonden en benoemt.', 2: 'Snelheid speelt geen rol; het gaat om de volgorde zoeken, dan handelen.', 3: 'Je had wel een shell; je had alleen de zwakte nog niet onderzocht.' },
          why: 'Een echte escalatie begint met weten welke fout je misbruikt. Zonder die kennis is escalate blind proberen, en dat is luidruchtig.',
          explain: 'De range eist dat je de zwakte eerst ziet (via sudo -l, find-suid of crontab -l). Dat spiegelt de werkelijkheid: eerst de fout vinden, dan pas misbruiken.' },
      ],
    },
    {
      title: 'Taak 3 - De nabespreking',
      content: `
        <p>Lees de nabespreking onder de console. Het belangrijkste is niet dat je root werd, maar wat de gemeente eraan heeft:
        waarom de twee valse sporen geen risico waren, en waarom het derde dat wel was. Een goed rapport legt ook uit wat je
        probeerde en niets opleverde, zodat de beheerder weet wat al in orde is.</p>
        <p>In een echt rapport schrijf je per bevinding risico, bewijs en advies uit. Zie
        <a href="#/room/pentest-methodiek-rapportage">Pentest-methodiek en rapportage</a>.</p>
      `,
      questions: [
        { q: 'Waarom was de gevonden cronjob hier geen risico, terwijl een cronjob soms juist de weg naar root is?',
          options: ['Omdat cronjobs nooit als root draaien', 'Omdat je het script of een pad erin niet kon aanpassen; een taak als root is pas misbruikbaar als jij invloed hebt op wat hij uitvoert', 'Omdat crontab verboden is', 'Omdat de taak te vaak draaide'],
          answer: 1,
          wrong: { 0: 'Cronjobs kunnen juist wel als root draaien; dat maakt ze soms gevaarlijk.', 2: 'crontab -l lezen is gewoon toegestaan en nuttig.', 3: 'Hoe vaak de taak draait, bepaalt het risico niet; invloed op wat hij uitvoert wel.' },
          why: 'Een geplande taak die als root draait is pas een probleem als een gewone gebruiker het uitgevoerde script, of een pad daarin, kan aanpassen. Zonder die invloed verandert er niets.',
          explain: 'De cronjob draaide als root, maar je kon niet beinvloeden wat hij deed. Daarom was het een vals spoor en geen bevinding.' },
        { q: 'Welke ATT&CK-techniek hoort bij rechten verhogen via een verkeerd gezette SUID-bit? (ID)', answer: ['T1548.001', 't1548.001'],
          hints: ['Het valt onder Abuse Elevation Control Mechanism, T1548.', 'De eerste subtechniek gaat over Setuid en Setgid.', 'Het is T1548 punt nul nul een.'],
          wrong: { 't1548': 'Dat is de techniek; gevraagd is de subtechniek voor Setuid en Setgid.', 't1548.003': 'Dat is Sudo and Sudo Caching; hier ging het om de SUID-bit, niet om sudo.' },
          explain: 'T1548.001 Setuid and Setgid: misbruik van de SUID- of SGID-bit om met hogere rechten te draaien.' },
      ],
    },
  ],
  terms: [
    { term: 'Rechtenverhoging', def: 'Van een gewone gebruiker naar root of beheerder, meestal via een verkeerde instelling (privilege escalation).' },
    { term: 'SUID-bit', def: 'Een bestandsrecht waardoor een programma draait als zijn eigenaar in plaats van als wie het start. Op een programma dat opdrachten kan uitvoeren is dat gevaarlijk.' },
    { term: 'sudo -l', def: 'Toont welke opdrachten je als een andere gebruiker (vaak root) mag draaien. Een te ruime regel is een veelgemaakte fout.' },
    { term: 'cronjob', def: 'Een taak die automatisch op gezette tijden draait. Draait hij als root en kun jij het script beinvloeden, dan is dat een weg naar root.' },
    { term: 'Vals spoor', def: 'Een aanwijzing die veelbelovend lijkt maar nergens heen leidt. Herkennen scheelt tijd en lawaai.' },
    { term: 'Ontdekkingsmeter', def: 'In deze range: hoe zichtbaar je bezig bent. Blind proberen en mislukte escalaties vullen hem.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Abuse Elevation Control Mechanism (T1548)', url: 'https://attack.mitre.org/techniques/T1548/' },
    { title: 'MITRE ATT&CK: Setuid and Setgid (T1548.001)', url: 'https://attack.mitre.org/techniques/T1548/001/' },
  ],
});
