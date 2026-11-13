/* Room: Linux en containers harden */
CS.registerRoom({
  id: 'linux-container-hardening',
  path: 'defensief',
  order: 18,
  title: 'Linux en containers harden',
  icon: '🧱',
  difficulty: 'Gemiddeld',
  minutes: 80,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Een server of container is zo veilig als zijn standaardinstellingen. Lees een baseline-audit, inventariseer sudo-regels en SUID-bestanden, volg een wijziging in auditd, beoordeel een Dockerfile en containerinstellingen, en kies welke workload in Kubernetes als eerste aandacht krijgt.',
  objectives: [
    'De uitvoer van een baseline-audit (in de stijl van een CIS Benchmark) lezen en de bevindingen prioriteren',
    'sudo-regels en SUID-bestanden doorlichten als controlepunt, en uitleggen wanneer een regel in feite volledige rootrechten geeft',
    'Met auditd-regels en de audit-uid (auid) vaststellen wie een gevoelig bestand wijzigde, ook na sudo',
    'Een Dockerfile beoordelen op basisimage, geheimen, gebruiker en onnodige inhoud, en een veilige versie kiezen',
    'Containerinstellingen en Kubernetes-workloads toetsen op root, privileged, mounts, read-only en limieten',
  ],
  tasks: [
    {
      title: 'Taak 1: Een baseline-audit lezen',
      tryFirst: true,
      intro: '<p>Het fictieve installatiebedrijf Veldhuis heeft een nieuwe applicatieserver, app-02, die volgende week aan internet gaat. Een auditscript heeft hem vergeleken met de interne baseline. Lees de uitvoer in het lab: hoeveel controles falen, welk bestand kan iedereen wijzigen, en wat los je als eerste op?</p>',
      content: `
        <p>Hardening is het verkleinen van het aanvalsoppervlak: alles wat niet nodig is gaat uit, en wat overblijft
        krijgt veilige instellingen. Dat doe je niet uit je hoofd, maar met een <strong>baseline</strong>: een vaste
        lijst controlepunten waaraan elke server moet voldoen. De bekendste bron zijn de <strong>CIS
        Benchmarks</strong> van het Center for Internet Security, met een aparte benchmark per Linux-distributie,
        voor Docker en voor Kubernetes. Ze hebben profielen: niveau 1 is een redelijke basis die weinig breekt, niveau 2
        is strenger voor gevoelige omgevingen.</p>
        <h3>De onderwerpen van een Linux-baseline</h3>
        <ul>
          <li><strong>Minimale installatie:</strong> geen printdienst, grafische omgeving of ontwikkeltools op een
          server die ze niet gebruikt. Wat niet geïnstalleerd is, hoeft niet gepatcht te worden.</li>
          <li><strong>Bestandssystemen:</strong> tijdelijke mappen met opties als <code>noexec</code> en
          <code>nosuid</code>.</li>
          <li><strong>Netwerk en firewall:</strong> standaard weigeren, alleen openzetten wat nodig is.</li>
          <li><strong>Logging en audit:</strong> lokale logs, doorsturen naar een centrale server, en auditd voor
          wijzigingen aan gevoelige bestanden (taak 3).</li>
          <li><strong>Toegang:</strong> SSH zonder directe rootaanmelding en zonder wachtwoorden, beperkte sudo-regels
          (taak 2).</li>
          <li><strong>Bestandsrechten:</strong> <code>/etc/shadow</code> alleen leesbaar voor root (en op Debian-achtige
          systemen de groep shadow), geen bestanden die iedereen mag wijzigen, een bekende lijst SUID-bestanden.</li>
          <li><strong>Updates:</strong> beveiligingsupdates automatisch of op een vast, kort ritme.</li>
        </ul>
        <h3>Prioriteren</h3>
        <p>Een audit levert al snel tientallen bevindingen. Niet alles is even dringend. Vraag bij elke bevinding: is het
        van buiten bereikbaar, en geeft het bij misbruik direct hoge rechten? Een open firewall en een SSH-server
        met een bekende kwetsbaarheid op een server die aan internet gaat, gaan voor een leesbaar
        bootloaderbestand.</p>
        <div class="callout info"><strong>Eén server stap voor stap:</strong> in de game room
        <em>De vergeten server</em> hard je onder tijdsdruk één webserver die al online staat, inclusief SSH en
        firewall. Deze room gaat over de baseline voor een hele vloot servers en over containers.</div>
      `,
      lab: {
        type: 'logs',
        title: 'nm-baseline rapport app-02 (fictief script)',
        lines: `nm-baseline 2.3   profiel: server-niveau-1   host: app-02.veldhuis.nm.lab   2026-11-12 09:14
[1.1] PASS  /tmp op eigen partitie met nodev,nosuid,noexec
[1.4] FAIL  Bootloaderconfiguratie leesbaar voor iedereen (/boot/grub/grub.cfg 0644, verwacht 0600)
[2.1] WARN  Onnodige diensten actief: cups (printen), avahi-daemon (mDNS)
[2.2] PASS  Geen telnet- of rsh-server geïnstalleerd
[3.1] PASS  IP-forwarding uit
[3.4] FAIL  Firewall: standaardbeleid inkomend is ACCEPT
[4.1] FAIL  auditd niet geïnstalleerd
[4.2] PASS  rsyslog actief
[4.3] WARN  Logs worden niet doorgestuurd naar een centrale logserver
[5.1] PASS  crontab alleen door root te beheren
[5.2] FAIL  sshd: PermitRootLogin yes
[5.2] PASS  sshd: PasswordAuthentication no
[5.2] WARN  sshd: MaxAuthTries 10 (baseline: 4 of lager)
[5.3] FAIL  sudo: regel NOPASSWD: ALL voor groep deploy (/etc/sudoers.d/deploy)
[6.1] PASS  /etc/shadow 0640 root:shadow
[6.1] FAIL  Bestand schrijfbaar voor iedereen: /opt/app/bin/start.sh (0777, uitgevoerd door systemd-dienst app als root)
[6.2] WARN  SUID-bestanden buiten de baselinelijst gevonden (zie taak 2)
[7.1] FAIL  Beveiligingsupdates beschikbaar: 7 (waaronder openssh-server en sudo)
Samenvatting: 7 PASS, 6 FAIL, 4 WARN`,
      },
      questions: [
        { q: 'Welk bestand kan iedereen op de server wijzigen, terwijl het als root wordt uitgevoerd? (volledig pad)', answer: ['/opt/app/bin/start.sh'],
          hints: ['Zoek de controle over bestandsrechten die faalt.', 'Filter op 6.1.', 'Een startscript van de applicatie.'],
          wrong: { '/grub\\.cfg/i': 'Dat bestand is leesbaar voor iedereen, niet schrijfbaar. Gevraagd is een bestand dat iedereen kan wijzigen.', 'start.sh': 'Bijna: geef het volledige pad.' },
          why: 'Een script dat iedereen mag aanpassen en dat root uitvoert, is een rechtstreekse weg van elk account naar root. Het komt in audits steeds weer terug.',
          explain: '/opt/app/bin/start.sh staat op 0777 en wordt door een systemd-dienst als root gestart. Eigenaar root maken, rechten 0755, en de dienst zo mogelijk onder een eigen account laten draaien.' },
        { q: 'De samenvatting is fout. Hoeveel controles falen er echt?', answer: ['7', 'zeven'],
          hints: ['Tel de regels met FAIL zelf.', 'Filter op FAIL.', 'Let op dat de samenvatting zelf ook het woord FAIL bevat.'],
          wrong: { '6': 'Dat zegt de samenvatting. Tel de regels zelf.', '8': 'Je telt de samenvattingsregel mee.' },
          explain: 'Zeven: 1.4, 3.4, 4.1, 5.2 (root via SSH), 5.3, 6.1 (start.sh) en 7.1. Wie alleen de samenvatting leest, mist er een. Lees de bevindingen, niet het totaal.' },
        { q: 'app-02 gaat volgende week aan internet. Welke combinatie pak je als eerste aan?', options: ['De firewall op standaard weigeren zetten en de beveiligingsupdates voor openssh-server en sudo installeren', 'De bootloaderconfiguratie op 0600 zetten en cups verwijderen', 'MaxAuthTries naar 4 en logs naar de centrale server sturen', 'auditd installeren en daarna pas verder kijken'], answer: 0,
          wrong: { 1: 'Goede maatregelen, maar ze gaan over lokale toegang en een onnodige dienst. Ze zijn minder direct bereikbaar van buiten.', 2: 'Nuttig, maar SSH accepteert al geen wachtwoorden. De open firewall en de ontbrekende updates wegen zwaarder.', 3: 'auditd helpt je zien wat er gebeurt, maar voorkomt niets aan de buitenkant.' },
          explain: 'Wat van buiten bereikbaar is en direct misbruikt kan worden, gaat eerst: de open firewall en kwetsbare software op de dienst die aan internet hangt.' },
      ],
    },

    {
      title: 'Taak 2: sudo-regels en SUID-bestanden inventariseren',
      tryFirst: true,
      intro: '<p>Je hebt een leesaccount op app-02. Loop de sudo-regels in <code>/etc/sudoers.d/</code> na en vergelijk de SUID-bestanden op de server met de baselinelijst in je thuismap. Welke regels geven in feite volledige root, en welke SUID-bestanden horen er niet?</p>',
      content: `
        <p>Er zijn twee gangbare manieren waarop een gewoon account op Linux iets met rootrechten doet:
        <strong>sudo</strong> en <strong>SUID-bestanden</strong>. Beide zijn nodig, en beide zijn een controlepunt in
        elke audit.</p>
        <h3>sudo</h3>
        <p>De regels staan in <code>/etc/sudoers</code> en in losse bestanden in <code>/etc/sudoers.d/</code>. Je bewerkt
        ze met <code>visudo</code>, dat de syntax controleert voordat het opslaat. De vorm is:
        <code>wie waar=(als wie) welke commando's</code>. Een <code>%</code> voor de naam betekent een groep.</p>
        <ul>
          <li><code>ALL</code> als commando is volledige root. Met <code>NOPASSWD:</code> erbij vraagt sudo niet eens
          meer om het wachtwoord, dus wie een sessie van dat account overneemt, is direct root.</li>
          <li>Een regel voor één script is pas veilig als <strong>alleen root dat script kan wijzigen</strong>. Mag
          het account zelf het script aanpassen, dan kan het er alles in zetten en dat als root uitvoeren.</li>
          <li>Sommige programma's kunnen zelf een shell of een ander programma starten: pagers, editors, en tools die
          commando's uitvoeren. Een sudo-regel voor zo'n programma is in de praktijk vaak volledige root. Een
          jokerteken (<code>*</code>) in de argumenten maakt een regel bovendien veel ruimer dan hij eruitziet.</li>
        </ul>
        <h3>SUID</h3>
        <p>Een bestand met de SUID-bit draait met de rechten van de <em>eigenaar</em>, niet van wie het start. In
        <code>ls -l</code> zie je dat aan een <code>s</code> op de plek van de x van de eigenaar:
        <code>-rwsr-xr-x</code>. <code>passwd</code> heeft dat nodig, omdat een gewone gebruiker zo zijn eigen
        wachtwoord in een bestand van root kan wijzigen. Elk SUID-bestand van root is wel een plek waar een fout direct
        rootrechten oplevert.</p>
        <p>Daarom inventariseer je ze en vergelijk je de lijst met een bekende baseline van het image. Een standaardcommando
        voor de inventaris:</p>
        <pre><code>find / -perm -4000 -type f 2&gt;/dev/null</code></pre>
        <p>Alles wat niet in de baseline staat, onderzoek je: wie heeft het geïnstalleerd, wanneer, en waarom? Een
        algemeen programma dat bestanden doorzoekt of commando's uitvoert, hoort nooit SUID te zijn.</p>
        <div class="callout tip"><strong>In het lab:</strong> gebruik <code>ls -l /etc/sudoers.d</code>,
        <code>cat</code> op de bestanden daarin, <code>cat suid-baseline.txt</code>, het find-commando hierboven en
        <code>ls -l /usr/local/sbin</code> en <code>ls -l /usr/local/bin</code>.</div>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'auditor', host: 'app-02',
        home: '/home/auditor', cwd: '/home/auditor',
        motd: 'app-02.veldhuis.nm.lab (fictief), leesaccount voor de audit. Begin met: cat LEESMIJ.txt',
        fs: {
          '/home/auditor/LEESMIJ.txt': 'AUDIT APP-02\n1. Loop /etc/sudoers.d/ na: welke regels geven in feite volledige root?\n2. Vergelijk de SUID-bestanden op deze server met suid-baseline.txt.\n3. Kijk bij scripts in sudo-regels wie ze mag wijzigen.\n',
          '/home/auditor/suid-baseline.txt': '# SUID-bestanden in het goedgekeurde image (Debian 12, server-niveau-1)\n/usr/bin/chfn\n/usr/bin/chsh\n/usr/bin/gpasswd\n/usr/bin/mount\n/usr/bin/newgrp\n/usr/bin/passwd\n/usr/bin/su\n/usr/bin/sudo\n/usr/bin/umount\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper\n/usr/lib/openssh/ssh-keysign\n',
          '/etc/sudoers.d/beheer': '# Beheerders: alles, met wachtwoord\n%beheer ALL=(ALL:ALL) ALL\n',
          '/etc/sudoers.d/deploy': '# Tijdelijk voor de migratie (2025-09), daarna weghalen\n%deploy ALL=(ALL) NOPASSWD: ALL\n',
          '/etc/sudoers.d/backup': '# Nachtelijke back-up\nbackup ALL=(root) NOPASSWD: /usr/local/sbin/backup.sh\n',
          '/etc/sudoers.d/monitor': '# Monitoring mag logs lezen\nmonitor ALL=(root) NOPASSWD: /usr/bin/less /var/log/*\n',
          '/usr/local/sbin/backup.sh': '#!/bin/sh\ntar czf /srv/backup/app-$(date +%F).tgz /opt/app/data\n',
          '/usr/local/bin/logtool': '(binair bestand)\n',
          '/usr/local/bin/app-healthcheck': '#!/bin/sh\ncurl -fs http://127.0.0.1:8080/health\n',
        },
        denied: ['/etc/shadow', '/root'],
        modes: {
          '/usr/local/sbin/backup.sh': '-rwxr-xr-x',
          '/usr/local/bin/logtool': '-rwsr-xr-x',
          '/usr/local/bin/app-healthcheck': '-rwxr-xr-x',
          '/etc/sudoers.d/beheer': '-r--r-----',
          '/etc/sudoers.d/deploy': '-r--r-----',
          '/etc/sudoers.d/backup': '-r--r-----',
          '/etc/sudoers.d/monitor': '-r--r-----',
        },
        owners: {
          '/usr/local/sbin/backup.sh': 'backup',
          '/usr/local/bin/logtool': 'root',
          '/usr/local/bin/app-healthcheck': 'root',
          '/etc/sudoers.d/beheer': 'root',
          '/etc/sudoers.d/deploy': 'root',
          '/etc/sudoers.d/backup': 'root',
          '/etc/sudoers.d/monitor': 'root',
        },
        commands: {
          'find / -perm -4000 -type f 2>/dev/null': '/usr/bin/chfn\n/usr/bin/chsh\n/usr/bin/find\n/usr/bin/gpasswd\n/usr/bin/mount\n/usr/bin/newgrp\n/usr/bin/passwd\n/usr/bin/su\n/usr/bin/sudo\n/usr/bin/umount\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper\n/usr/lib/openssh/ssh-keysign\n/usr/local/bin/logtool',
          'find / -perm -4000 -type f': '/usr/bin/chfn\n/usr/bin/chsh\n/usr/bin/find\n/usr/bin/gpasswd\n/usr/bin/mount\n/usr/bin/newgrp\n/usr/bin/passwd\n/usr/bin/su\n/usr/bin/sudo\n/usr/bin/umount\n/usr/lib/dbus-1.0/dbus-daemon-launch-helper\n/usr/lib/openssh/ssh-keysign\n/usr/local/bin/logtool\nfind: \'/root\': Permission denied',
          'ls -l /usr/bin/find': '-rwsr-xr-x 1 root root 224848 Nov 12 03:15 /usr/bin/find',
        },
      },
      questions: [
        { q: 'Welke groep krijgt via sudo volledige root zonder wachtwoord?', answer: ['deploy', '%deploy'],
          hints: ['Bekijk de bestanden in /etc/sudoers.d.', 'Zoek ALL als commando, samen met NOPASSWD.', 'Een tijdelijke regel die nooit is weggehaald.'],
          wrong: { 'beheer': 'beheer heeft ook alles, maar sudo vraagt daar om het wachtwoord. En het is de bedoelde beheergroep.' },
          explain: 'deploy: ALL met NOPASSWD, "tijdelijk" sinds september 2025. Weghalen, en de deploy-pipeline alleen het ene commando geven dat hij nodig heeft.' },
        { q: 'Welk account kan root worden via een script dat het zelf mag aanpassen?', answer: ['backup'],
          hints: ['Zoek een sudo-regel die één script toestaat.', 'Kijk met ls -l /usr/local/sbin wie de eigenaar van dat script is.', 'De eigenaar is hetzelfde account als in de sudo-regel.'],
          wrong: { 'monitor': 'monitor heeft ook een riskante regel, maar die gaat over een pager met een jokerteken, niet over een script dat het zelf kan wijzigen.' },
          why: 'Deze fout ziet er in een review onschuldig uit: één script, met een duidelijk doel. Pas als je de eigenaar van het script controleert, zie je dat het een volledige rootregel is.',
          explain: 'backup mag /usr/local/sbin/backup.sh als root uitvoeren en is zelf eigenaar van dat script. Script van root maken, rechten 0755, en de map ook alleen door root laten wijzigen.' },
        { q: 'Hoeveel SUID-bestanden op de server staan niet in de baseline?', answer: ['2', 'twee'],
          hints: ['Draai het find-commando uit de uitleg.', 'Vergelijk de uitvoer regel voor regel met suid-baseline.txt.', 'Eén in /usr/local/bin en één standaardprogramma.'],
          wrong: { '1': 'logtool valt het meest op, maar kijk ook goed naar de programma\'s in /usr/bin.', '13': 'Dat is het totaal. Gevraagd is het verschil met de baseline.' },
          explain: 'Twee: /usr/local/bin/logtool en /usr/bin/find.' },
        { q: 'Welk standaardprogramma heeft hier de SUID-bit, terwijl het die nooit hoort te hebben? (volledig pad)', answer: ['/usr/bin/find'],
          hints: ['Het is een van de twee afwijkingen, en het staat niet in /usr/local.', 'Een programma dat bestanden doorzoekt en commando\'s kan uitvoeren.', 'Kijk met ls -l wanneer het is gewijzigd.'],
          wrong: { 'find': 'Bijna: geef het volledige pad.', '/logtool/i': 'logtool hoort er ook niet, maar het is geen standaardprogramma van de distributie.' },
          explain: '/usr/bin/find, met de SUID-bit sinds 12 november 03:15. Een zoekprogramma dat commando\'s kan uitvoeren en als root draait, is een achterdeur. Bit weghalen, en uitzoeken wie dat deed. Op app-01 zie je in de volgende taak hetzelfde tijdstip terug.' },
      ],
    },

    {
      title: 'Taak 3: auditd: wie heeft het gedaan?',
      tryFirst: true,
      intro: '<p>Op app-02 ontbrak auditd, maar op app-01, die met hetzelfde image en dezelfde accounts draait, stond het wel aan. In het lab staat de geïnterpreteerde uitvoer van <code>ausearch -i</code> voor de sleutels sudoers en identiteit. Zoek welk account achter de nachtelijke wijzigingen zit, ook al draaide alles als root.</p>',
      content: `
        <p>Gewone logs vertellen dat een dienst start of dat iemand inlogt. <strong>auditd</strong>, het audit-systeem
        van de Linux-kernel, legt vast wie welk bestand wijzigde of welke systeemaanroep deed. Je geeft het regels mee in
        <code>/etc/audit/rules.d/</code>. Een paar voorbeelden:</p>
        <pre><code>-w /etc/sudoers -p wa -k sudoers
-w /etc/sudoers.d/ -p wa -k sudoers
-w /etc/passwd -p wa -k identiteit
-w /etc/shadow -p wa -k identiteit</code></pre>
        <p><code>-w</code> bewaakt een bestand of map, <code>-p wa</code> zegt welke handelingen: <code>w</code> voor
        schrijven en <code>a</code> voor het wijzigen van eigenschappen zoals rechten en eigenaar. Met <code>-k</code>
        geef je de regel een zoeksleutel, zodat je later met <code>ausearch -k sudoers</code> precies die
        gebeurtenissen terugvindt. Met <code>-i</code> zet ausearch nummers om in namen.</p>
        <h3>De audit-uid</h3>
        <p>Het belangrijkste veld in een auditregel is <code>auid</code>, de <em>audit user id</em> of login-uid. Die
        wordt gezet op het moment dat iemand zich aanmeldt, en verandert daarna niet meer, ook niet door
        <code>sudo</code> of <code>su</code>. In een gebeurtenis zie je dus <code>uid=root</code> (wie het nu is) én
        <code>auid</code> (wie zich oorspronkelijk aanmeldde). Zo is "root heeft het gedaan" geen eindpunt van een
        onderzoek. Een <code>auid</code> van <code>unset</code> betekent dat het proces niet uit een aanmelding komt,
        bijvoorbeeld een dienst die bij het opstarten begon.</p>
        <h3>Wat je ermee doet</h3>
        <ul>
          <li>Stuur de auditlogs door naar een centrale logserver, zodat iemand met root ze niet ongemerkt kan wissen.</li>
          <li>Bewaak naast sudoers en accounts ook de SSH-configuratie, cron en de map met systemd-diensten.</li>
          <li>Begin klein: te veel regels geven zoveel gebeurtenissen dat niemand ze leest. Kies de bestanden die rechten
          bepalen.</li>
        </ul>
        <div class="callout info"><strong>Leesadvies:</strong> een gebeurtenis bestaat uit meerdere regels met hetzelfde
        volgnummer achter de tijd (bijvoorbeeld <code>:4410</code>). De regel <code>type=SYSCALL</code> bevat
        <code>auid</code>, <code>uid</code>, het programma en de sleutel.</div>
      `,
      lab: {
        type: 'logs',
        title: 'ausearch -i, sleutels sudoers, identiteit en suid-wijziging (app-01, 11 en 12 november)',
        lines: `----
type=PROCTITLE msg=audit(11/11/2026 10:02:13.511:3920) : proctitle=/usr/bin/python3 /tmp/ansible-module
type=PATH msg=audit(11/11/2026 10:02:13.511:3920) : item=1 name=/etc/sudoers.d/monitor nametype=CREATE mode=file,440 ouid=root
type=SYSCALL msg=audit(11/11/2026 10:02:13.511:3920) : arch=x86_64 syscall=rename success=yes exit=0 auid=ansible uid=root gid=root euid=root tty=(none) comm=python3 exe=/usr/bin/python3.11 key=sudoers
----
type=PROCTITLE msg=audit(12/11/2026 03:14:07.221:4410) : proctitle=vim /etc/sudoers.d/deploy
type=PATH msg=audit(12/11/2026 03:14:07.221:4410) : item=0 name=/etc/sudoers.d/deploy nametype=NORMAL mode=file,440 ouid=root
type=SYSCALL msg=audit(12/11/2026 03:14:07.221:4410) : arch=x86_64 syscall=openat success=yes exit=3 auid=r.dekker uid=root gid=root euid=root tty=pts1 comm=vim exe=/usr/bin/vim.basic key=sudoers
----
type=PROCTITLE msg=audit(12/11/2026 03:15:40.108:4417) : proctitle=chmod u+s /usr/bin/find
type=PATH msg=audit(12/11/2026 03:15:40.108:4417) : item=0 name=/usr/bin/find nametype=NORMAL mode=file,755 ouid=root
type=SYSCALL msg=audit(12/11/2026 03:15:40.108:4417) : arch=x86_64 syscall=fchmodat success=yes exit=0 auid=r.dekker uid=root gid=root euid=root tty=pts1 comm=chmod exe=/usr/bin/chmod key=suid-wijziging
----
type=PROCTITLE msg=audit(12/11/2026 03:16:02.540:4421) : proctitle=useradd -m -s /bin/bash support2
type=PATH msg=audit(12/11/2026 03:16:02.540:4421) : item=0 name=/etc/passwd nametype=NORMAL mode=file,644 ouid=root
type=SYSCALL msg=audit(12/11/2026 03:16:02.540:4421) : arch=x86_64 syscall=rename success=yes exit=0 auid=r.dekker uid=root gid=root euid=root tty=pts1 comm=useradd exe=/usr/sbin/useradd key=identiteit
----
type=PROCTITLE msg=audit(12/11/2026 03:16:09.002:4424) : proctitle=usermod -aG deploy support2
type=PATH msg=audit(12/11/2026 03:16:09.002:4424) : item=0 name=/etc/group nametype=NORMAL mode=file,644 ouid=root
type=SYSCALL msg=audit(12/11/2026 03:16:09.002:4424) : arch=x86_64 syscall=rename success=yes exit=0 auid=r.dekker uid=root gid=root euid=root tty=pts1 comm=usermod exe=/usr/sbin/usermod key=identiteit
----
type=PROCTITLE msg=audit(12/11/2026 06:00:01.330:4502) : proctitle=/usr/sbin/logrotate /etc/logrotate.conf
type=PATH msg=audit(12/11/2026 06:00:01.330:4502) : item=0 name=/etc/passwd nametype=NORMAL mode=file,644 ouid=root
type=SYSCALL msg=audit(12/11/2026 06:00:01.330:4502) : arch=x86_64 syscall=openat success=yes exit=3 auid=unset uid=root gid=root euid=root tty=(none) comm=logrotate exe=/usr/sbin/logrotate key=identiteit`,
      },
      questions: [
        { q: 'Welk aangemeld account zit achter de nachtelijke wijzigingen, ook al draaide alles als root?', answer: ['r.dekker', 'dekker'],
          hints: ['Kijk naar de gebeurtenissen rond 03:15.', 'uid is overal root. Welk ander veld vertelt wie zich aanmeldde?', 'Het veld auid in de SYSCALL-regels.'],
          wrong: { 'root': 'root is de uid na sudo. De vraag is wie zich aanmeldde: dat staat in auid.', 'ansible': 'ansible deed om 10:02 op 11 november een geplande wijziging overdag. Gevraagd is de nacht.' },
          why: 'Met alleen uid=root eindigt elk onderzoek bij "iemand met beheerrechten". De auid wijst een persoon aan, en dat maakt verantwoording en vervolgstappen mogelijk.',
          explain: 'r.dekker opende om 03:14 het sudoers-bestand van deploy, zette om 03:15 de SUID-bit op find en maakte om 03:16 een nieuw account aan dat in de groep deploy kwam.' },
        { q: 'Welk nieuw account is die nacht aangemaakt en in de groep met volledige sudo-rechten gezet?', answer: ['support2'],
          hints: ['Zoek de sleutel identiteit.', 'Kijk naar proctitle: welke commando\'s draaiden er?', 'useradd en daarna usermod.'],
          wrong: { 'deploy': 'deploy is de groep. Gevraagd is het account dat erin is gezet.' },
          explain: 'support2, aangemaakt met useradd en toegevoegd aan deploy, de groep met NOPASSWD: ALL. Samen met de SUID-bit op find zijn dat twee manieren om terug te komen. Uitschakelen, bewijs bewaren en het incidentproces starten.' },
        { q: 'Waarom is de gebeurtenis van logrotate om 06:00 waarschijnlijk geen probleem?', options: ['auid is unset: het proces komt niet uit een aanmelding maar uit een geplande taak, en het opent /etc/passwd alleen om te lezen', 'Omdat logrotate een programma van de distributie is en daarom niet kan worden misbruikt', 'Omdat de gebeurtenis na 06:00 plaatsvond, binnen werktijd', 'Omdat de sleutel identiteit alleen leesacties registreert'], answer: 0,
          wrong: { 1: 'Ook programma\'s van de distributie kunnen worden misbruikt. Het gaat om wat dit proces deed en waar het vandaan kwam.', 2: 'Tijd zegt weinig: ook overdag kan iemand misbruik maken.', 3: 'De regels met -p wa registreren schrijven en wijzigingen van eigenschappen.' },
          explain: 'Een geplande taak heeft geen login-uid en logrotate leest de accountgegevens om eigenaren op te zoeken. Geen schrijfactie, geen persoon.' },
        { q: 'Je wilt ook wijzigingen aan de SSH-configuratie zien. Welke regel past?', options: ['-w /etc/ssh/sshd_config -p wa -k sshd', '-w /etc/ssh/sshd_config -p r -k sshd', '-a always,exit -F arch=b64 -S execve -k sshd', '-w /var/log/auth.log -p wa -k sshd'], answer: 0,
          wrong: { 1: '-p r registreert alleen lezen. sshd leest zijn configuratie bij elke start: veel ruis en je mist de wijziging zelf.', 2: 'Dat registreert elke uitvoering van elk programma. Veel te breed, en het zegt niets over de configuratie.', 3: 'Dat bewaakt het logbestand, niet de configuratie.' },
          explain: 'Bewaken (-w) op schrijven en eigenschappen (-p wa), met een eigen sleutel om op te zoeken.' },
      ],
    },

    {
      title: 'Taak 4: Een Dockerfile beoordelen',
      tryFirst: true,
      intro: '<p>Het team van Veldhuis wil de planningsapplicatie in een container draaien. In het lab staan het Dockerfile en de inhoud van de bouwmap. Wijs de regel aan waar een geheim in het image terechtkomt, zoek het bestand dat ongemerkt meekomt, en kies daarna de verbeterde versie.</p>',
      content: `
        <p>Een container-image is een pakket met een applicatie en alles wat ze nodig heeft, gebouwd volgens een
        Dockerfile. Wat erin zit, gaat overal mee naartoe: naar het register, naar elke server en naar iedereen die het
        image kan ophalen. Hardening begint daarom bij het bouwen.</p>
        <h3>Waar je op let</h3>
        <ul>
          <li><strong>Basisimage minimaal en vastgepind.</strong> Een tag als <code>latest</code> verandert ongemerkt,
          waardoor twee builds van dezelfde code verschillende software bevatten. Kies een specifieke versie, liefst
          vastgelegd met de digest (<code>image:versie@sha256:...</code>), en een kleine variant (slim, distroless) met
          zo min mogelijk pakketten.</li>
          <li><strong>Geen geheimen in het image.</strong> Een waarde in <code>ENV</code> wordt deel van de
          configuratie van het image en is te lezen door iedereen die het image heeft. Ook een bestand dat in een laag is
          gekopieerd en later verwijderd, zit nog in die laag. Geheimen komen bij het starten uit een secretmanager of
          als runtime-secret binnen. Is er bij het bouwen een geheim nodig, gebruik dan een build-secret (bij BuildKit:
          <code>RUN --mount=type=secret</code>), dat niet in een laag belandt.</li>
          <li><strong>Let op wat je kopieert.</strong> <code>COPY . /app</code> neemt de hele bouwmap mee, inclusief
          configuratiebestanden met wachtwoorden en de Git-geschiedenis, tenzij een <code>.dockerignore</code> ze
          uitsluit.</li>
          <li><strong>Niet als root.</strong> Zonder <code>USER</code>-instructie draait de applicatie als root in de
          container. Maak een gewone gebruiker aan en schakel daarnaar over.</li>
          <li><strong>Geen onnodige tools.</strong> Een compiler, een editor of netwerkgereedschap in een productie-image
          helpen vooral wie de container overneemt. Een multi-stage build compileert in een eerste fase en kopieert
          alleen het resultaat naar een kleine eindfase.</li>
          <li><strong>Bekende herkomst.</strong> Iets van internet downloaden tijdens de build, zonder controle van een
          checksum of handtekening, maakt het image zo betrouwbaar als die download.</li>
        </ul>
        <div class="callout tip"><strong>Controleren:</strong> een image-scanner (bijvoorbeeld Trivy of Grype) zoekt in
        de pakketten van het image naar bekende kwetsbaarheden, en vaak ook naar geheimen en riskante instellingen.
        Laat hem in de pipeline draaien en opnieuw op images die al in het register staan, want er komen elke dag
        nieuwe kwetsbaarheden bij.</div>
      `,
      lab: {
        type: 'logs',
        title: 'planning/Dockerfile en de bouwmap',
        lines: `--- Dockerfile ---
1  FROM python:latest
2  ENV DB_WACHTWOORD=Zomer-fictief-2026
3  WORKDIR /app
4  COPY . /app
5  RUN apt-get update && apt-get install -y gcc vim curl netcat-openbsd
6  RUN pip install -r requirements.txt
7  ADD https://downloads.example/tools/rapport-tool.tar.gz /opt/
8  EXPOSE 8080
9  CMD ["python", "app.py"]

--- inhoud bouwmap (ls -a) ---
.git/
.dockerignore        (0 bytes)
.env                 (DB_WACHTWOORD=..., MAIL_TOKEN=..., 2 regels)
app.py
requirements.txt
tests/
notities-migratie.txt`,
      },
      questions: [
        { q: 'Op welke regel komt een wachtwoord in de configuratie van het image? (regelnummer)', answer: ['2', 'regel 2'],
          hints: ['Zoek een instructie die een waarde in het image vastlegt.', 'ENV.', 'Het is een databasewachtwoord.'],
          wrong: { '4': 'Regel 4 neemt ook geheimen mee, maar via een bestand. De vraag is waar het wachtwoord rechtstreeks in de configuratie staat.' },
          explain: 'Regel 2: ENV DB_WACHTWOORD. Iedereen die het image kan ophalen, kan dit lezen. Het wachtwoord vervangen en bij het starten laten aanleveren.' },
        { q: 'Welk bestand uit de bouwmap komt via regel 4 mee in het image en bevat geheimen? (bestandsnaam)', answer: ['.env', 'env'],
          hints: ['Kijk naar de inhoud van de bouwmap.', 'Wat sluit de .dockerignore uit? Hij is leeg.', 'Een verborgen bestand met twee regels.'],
          wrong: { '.git': '.git hoort er ook niet in, maar het is een map met geschiedenis. Gevraagd is het bestand met geheimen.', '.dockerignore': 'Dat bestand is leeg, en dat is juist het probleem.' },
          why: 'COPY . kopieert wat er in de map staat, niet wat de ontwikkelaar denkt dat er staat. Een lege .dockerignore is een veelvoorkomende reden dat geheimen en Git-geschiedenis in een openbaar image belanden.',
          explain: '.env, met twee geheimen. Een .dockerignore met in elk geval .env, .git en tests, en de geheimen vervangen.' },
        { q: 'Op welke regel wordt software van internet in het image gezet zonder controle van een checksum of handtekening? (regelnummer)', answer: ['7', 'regel 7'],
          hints: ['Zoek een URL in het Dockerfile.', 'ADD kan een bestand van een adres ophalen.', 'Een tar-bestand van downloads.example.'],
          wrong: { '5': 'Regel 5 installeert pakketten uit de pakketbron van de distributie, die zijn ondertekend. Wel onnodig, maar dat is een ander probleem.' },
          explain: 'Regel 7. Beter: het bestand downloaden met een vaste versie en een controle van de checksum, of het uit een eigen register met bekende herkomst halen.' },
        { q: 'Welke versie van het begin van het Dockerfile pakt de meeste problemen aan?', options: ['FROM python:3.12-slim@sha256:... ; COPY alleen app.py en requirements.txt ; RUN pip install ; RUN useradd app ; USER app ; geen ENV met geheimen', 'FROM python:latest ; ENV DB_WACHTWOORD wordt een ARG ; rest gelijk', 'FROM python:3.12 ; COPY . /app ; RUN rm .env ; USER root', 'FROM ubuntu:latest ; alles zelf installeren voor volledige controle'], answer: 0,
          wrong: { 1: 'Ook een ARG-waarde kan in de geschiedenis van het image terechtkomen, en latest blijft onvoorspelbaar.', 2: 'rm .env in een latere laag haalt het bestand niet uit de laag van COPY. En USER root verandert niets.', 3: 'Een groter basisimage zonder vaste versie geeft meer pakketten om te patchen, niet minder.' },
          explain: 'Vastgepind slim-image, alleen de nodige bestanden, een gewone gebruiker en geen geheimen. Voeg er nog een image-scan in de pipeline aan toe.' },
      ],
    },

    {
      title: 'Taak 5: Containers draaien met zo min mogelijk rechten',
      tryFirst: true,
      intro: '<p>Op de containerhost van Veldhuis draaien zes containers. In het lab staat een samenvatting van hun instellingen. Zoek de containers die bij een overname de host zelf in gevaar brengen, en tel hoeveel er geen geheugenlimiet hebben.</p>',
      content: `
        <p>Een container is geen virtuele machine. Alle containers op een host delen dezelfde kernel. Het isoleren
        gebeurt met kernelfuncties: <em>namespaces</em> (wat een proces ziet), <em>cgroups</em> (hoeveel het mag
        gebruiken) en <em>capabilities</em> (welke stukjes van de rootrechten het heeft). Hoe sterk de scheiding is,
        hangt van de instellingen af waarmee je de container start.</p>
        <h3>Instellingen die de scheiding opheffen</h3>
        <ul>
          <li><strong><code>--privileged</code>:</strong> geeft de container vrijwel alle capabilities en toegang tot de
          apparaten van de host. Wie zo'n container overneemt, kan in de praktijk de host overnemen. Bijna nooit
          nodig.</li>
          <li><strong>De Docker-socket mounten</strong> (<code>/var/run/docker.sock</code>): wie de socket kan
          gebruiken, kan zelf nieuwe containers starten, ook met de schijf van de host erin. Dat staat gelijk aan root op
          de host.</li>
          <li><strong>Mappen van de host mounten</strong>, zoals <code>/</code> of <code>/etc</code>, zeker met
          schrijfrechten.</li>
          <li><strong>Het netwerk of de processen van de host delen</strong> (<code>--network host</code>,
          <code>--pid host</code>).</li>
        </ul>
        <h3>Instellingen die schade beperken</h3>
        <table>
          <thead><tr><th>Instelling</th><th>Effect</th></tr></thead>
          <tbody>
            <tr><td><code>--user 10001</code> of <code>USER</code> in het image</td><td>Niet als root in de container.</td></tr>
            <tr><td><code>--read-only</code></td><td>Het bestandssysteem van de container is alleen-lezen; een aanvaller kan geen tools neerzetten. Schrijfbare plekken geef je apart (een tmpfs of volume).</td></tr>
            <tr><td><code>--cap-drop ALL</code> en alleen terugzetten wat nodig is</td><td>Geen overbodige rootrechten.</td></tr>
            <tr><td><code>--security-opt no-new-privileges</code></td><td>Een proces kan geen extra rechten krijgen, bijvoorbeeld via een SUID-bestand.</td></tr>
            <tr><td><code>--memory</code>, <code>--cpus</code>, <code>--pids-limit</code></td><td>Eén ontspoorde of misbruikte container kan de host niet uithongeren.</td></tr>
          </tbody>
        </table>
        <p>Geheimen geef je mee als runtime-secret of via een secretmanager, niet als omgevingsvariabele in een
        opstartscript dat in een repository staat.</p>
        <div class="callout warn"><strong>Let op:</strong> monitoring- en beheertools vragen in hun installatie-instructies
        vaak om de Docker-socket of om privileged. Vraag na waarom, en of een smallere variant bestaat (bijvoorbeeld
        een proxy die alleen leesopdrachten op de socket doorlaat).</div>
      `,
      lab: {
        type: 'logs',
        title: 'containerhost ch-01: samenvatting docker inspect (fictief)',
        lines: `naam             image                              gebruiker  privileged  read-only  cap-add       mounts                                      geheugenlimiet
planning-web     veldhuis/planning:3.4.1            10001      nee         ja         -             (geen)                                      512M
planning-worker  veldhuis/planning:3.4.1            10001      nee         ja         -             /srv/planning/uploads (rw)                  512M
proxy            nginx:1.26-alpine                  101        nee         ja         NET_BIND_SERVICE  /srv/proxy/conf (ro)                    256M
metrics-agent    leverancier/metrics-agent:latest   root       nee         nee        -             /var/run/docker.sock (rw)                   geen
db-backup        veldhuis/db-backup:1.2             root       ja          nee        -             /srv/backup (rw)                            geen
rapport          veldhuis/rapport:2.0               root       nee         nee        -             (geen)                                      1G`,
      },
      questions: [
        { q: 'Welke container draait privileged?', answer: ['db-backup'],
          hints: ['Kijk naar de kolom privileged.', 'Er staat één keer ja.', 'Een back-uptool.'],
          wrong: { 'metrics-agent': 'metrics-agent is ook gevaarlijk, maar via een mount, niet via privileged.' },
          explain: 'db-backup. Een back-up van een database heeft geen apparaten van de host nodig. Privileged eraf, een eigen gebruiker en alleen de map /srv/backup.' },
        { q: 'Welke container kan via een mount zelf nieuwe containers op de host starten?', answer: ['metrics-agent'],
          hints: ['Kijk naar de mounts.', 'Welke socket geeft toegang tot de Docker-daemon?', 'De container van een leverancier.'],
          wrong: { 'db-backup': 'db-backup is privileged, maar heeft geen toegang tot de Docker-daemon.', 'planning-worker': 'planning-worker mount een map met uploads, niet de socket van de daemon.' },
          why: 'De Docker-socket ziet er in een lijst met mounts uit als een onschuldig bestand. Wie er schrijftoegang toe heeft, bestuurt de daemon, en daarmee de host.',
          explain: 'metrics-agent heeft /var/run/docker.sock met schrijfrechten, draait als root en gebruikt een image met de tag latest. Navragen bij de leverancier of een alleen-lezen-variant of een socketproxy mogelijk is.' },
        { q: 'Hoeveel containers hebben geen geheugenlimiet?', answer: ['2', 'twee'],
          hints: ['Kijk in de laatste kolom.', 'Zoek het woord geen in die kolom.', 'Het zijn dezelfde twee containers als in de vorige vragen.'],
          wrong: { '3': 'rapport heeft een limiet van 1G. Ruim, maar wel een limiet.' },
          explain: 'Twee: metrics-agent en db-backup. Een geheugenlek of misbruik in een van beide kan de hele host laten vastlopen.' },
        { q: 'De container rapport draait als root en is niet read-only, maar heeft geen gevaarlijke mounts. Welke aanpassing beperkt de schade van een overname het meest?', options: ['Een gewone gebruiker, een read-only bestandssysteem met een tmpfs voor tijdelijke bestanden, en alle capabilities laten vallen', 'De geheugenlimiet verhogen naar 2G', 'De container privileged maken zodat hij beter te monitoren is', 'De container op het netwerk van de host zetten zodat de firewall hem ziet'], answer: 0,
          wrong: { 1: 'Meer geheugen helpt de beschikbaarheid, niet de beveiliging.', 2: 'Privileged maakt een overname juist erger.', 3: 'Het hostnetwerk delen haalt een laag isolatie weg.' },
          explain: 'Niet als root, niets schrijfbaar behalve wat nodig is, en geen overbodige rechten. Een aanvaller in de container kan dan weinig neerzetten en weinig bereiken.' },
      ],
    },

    {
      title: 'Taak 6: Kubernetes en image-scanning op hoofdlijnen',
      tryFirst: true,
      intro: '<p>Veldhuis draait een deel van de applicaties in een klein Kubernetes-cluster. In het lab staat een overzicht van de workloads met hun beveiligingsinstellingen, en daaronder het resultaat van de nachtelijke image-scan. Bepaal welke workloads het profiel Restricted niet halen en welke als eerste moet worden aangepakt.</p>',
      content: `
        <p>Kubernetes draait containers op een groep machines (<em>nodes</em>) en regelt zelf waar ze starten. De
        bouwstenen uit de vorige taak keren terug, maar dan als velden in een YAML-beschrijving. Voor een pod of
        container staan ze in de <code>securityContext</code>:</p>
        <ul>
          <li><code>runAsNonRoot: true</code> en een <code>runAsUser</code> anders dan 0.</li>
          <li><code>privileged: false</code> en <code>allowPrivilegeEscalation: false</code>.</li>
          <li><code>readOnlyRootFilesystem: true</code>.</li>
          <li><code>capabilities: drop: ["ALL"]</code>.</li>
          <li>Een seccomp-profiel, bijvoorbeeld <code>RuntimeDefault</code>.</li>
        </ul>
        <p>Daarnaast horen bij elke container <code>resources</code> met limieten voor CPU en geheugen.</p>
        <h3>Pod Security Standards</h3>
        <p>Kubernetes beschrijft drie niveaus, die je per namespace kunt afdwingen met <em>Pod Security Admission</em>:</p>
        <table>
          <thead><tr><th>Niveau</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td>Privileged</td><td>Geen beperkingen. Alleen voor systeemcomponenten die het echt nodig hebben.</td></tr>
            <tr><td>Baseline</td><td>Blokkeert de bekende manieren om uit een container te breken, zoals privileged, het delen van het hostnetwerk en mappen van de node (hostPath).</td></tr>
            <tr><td>Restricted</td><td>Daarbovenop de best practices: niet als root, geen escalatie van rechten, alle capabilities eraf, een seccomp-profiel.</td></tr>
          </tbody>
        </table>
        <h3>Geheimen en toegang</h3>
        <p>Een Kubernetes-Secret is standaard alleen base64-gecodeerd, niet versleuteld. Zet versleuteling van gegevens
        in de clusteropslag aan, beperk met RBAC wie Secrets mag lezen, en gebruik waar het kan een externe
        secretmanager. Geef pods die de Kubernetes-API niet nodig hebben ook geen token voor die API.</p>
        <h3>Image-scanning</h3>
        <p>Een scan geeft per image een lijst kwetsbare pakketten, met de ernst en of er een versie met een fix
        bestaat. Een kritieke kwetsbaarheid met een beschikbare fix in een image dat draait, gaat voor. Maar weeg ook
        mee hoe de workload draait: dezelfde kwetsbaarheid is erger in een pod die als root draait en bij de node kan,
        dan in een pod die read-only en zonder rechten draait.</p>
        <div class="callout info"><strong>Bron:</strong> NIST SP 800-190 (Application Container Security Guide, 2017)
        beschrijft de risico's van images, registers, orchestrators, containers en hosts. De CIS Kubernetes Benchmark
        geeft concrete controlepunten voor het cluster zelf.</div>
      `,
      lab: {
        type: 'logs',
        title: 'cluster prod-veldhuis: workloads en nachtelijke image-scan (fictief)',
        lines: `WORKLOADS (namespace productie)
pod                       image                          runAsNonRoot  privileged  allowPrivEsc  readOnlyRootFS  hostPath          limieten
planning-web-6d8f         veldhuis/planning:3.4.1        true          false       false         true            -                 ja
planning-worker-71ac      veldhuis/planning:3.4.1        true          false       false         true            -                 ja
facturen-api-5b20         veldhuis/facturen:1.8.0        true          false       false         true            -                 ja
rapportage-9c4e           veldhuis/rapport:2.0           false         false       true          false           /var/log (rw)     nee
klantportaal-2f17         veldhuis/klantportaal:5.1.3    false         false       true          false           -                 ja
log-collector-8e02        leverancier/logs:4.2           false         true        true          false           /var/lib (rw)     ja

IMAGE-SCAN 2026-11-12 02:00
image                          kritiek  hoog  midden  fix beschikbaar voor kritiek
veldhuis/planning:3.4.1        0        1     4       -
veldhuis/facturen:1.8.0        0        0     2       -
veldhuis/rapport:2.0           2        3     7       ja (basisimage bijwerken)
veldhuis/klantportaal:5.1.3    1        2     5       nee (leverancier werkt eraan)
leverancier/logs:4.2           0        1     3       -`,
      },
      questions: [
        { q: 'Hoeveel workloads halen het profiel Restricted niet omdat ze als root mogen draaien?', answer: ['3', 'drie'],
          hints: ['Kijk naar de kolom runAsNonRoot.', 'Tel de keren false.', 'Eén daarvan is bovendien privileged.'],
          wrong: { '1': 'Je telt alleen de privileged workload. Kijk naar runAsNonRoot.', '2': 'Tel ook de workload van de leverancier mee.' },
          explain: 'Drie: rapportage, klantportaal en log-collector. Ze halen ook allowPrivilegeEscalation en readOnlyRootFilesystem niet.' },
        { q: 'Welke workload zou al door het niveau Baseline worden tegengehouden, vanwege privileged?', answer: ['log-collector-8e02', 'log-collector'],
          hints: ['Baseline blokkeert privileged.', 'Kijk in de kolom privileged.', 'De pod van de leverancier.'],
          wrong: { 'rapportage-9c4e': 'rapportage gebruikt een hostPath, en dat blokkeert Baseline ook. Maar hij is niet privileged.' },
          explain: 'log-collector-8e02 is privileged en mount /var/lib van de node. Navragen welke rechten de leverancier echt nodig heeft; een logcollector heeft meestal genoeg aan leesrechten op een specifieke map.' },
        { q: 'Het team heeft vandaag tijd voor één workload. Welke combineert een kritieke kwetsbaarheid waarvoor al een fix bestaat met instellingen waarmee een aanvaller na een overname bij de node kan? (podnaam)', answer: ['rapportage-9c4e', 'rapportage', 'veldhuis/rapport:2.0'],
          boss: true, xp: 25,
          hints: ['Zoek in de image-scan de images met kritieke kwetsbaarheden en kijk of er een fix is.', 'Leg die naast de workloads: welke draait als root, kan schrijven en heeft een hostPath?', 'Er is één image met twee kritieke kwetsbaarheden en een fix.'],
          wrong: { 'klantportaal-2f17': 'klantportaal heeft een kritieke kwetsbaarheid, maar nog geen fix, en geen hostPath. Wel op de lijst, maar je kunt hem vandaag niet patchen.', 'klantportaal': 'klantportaal heeft een kritieke kwetsbaarheid, maar nog geen fix, en geen hostPath.', 'log-collector-8e02': 'log-collector heeft de gevaarlijkste instellingen, maar het image heeft geen kritieke kwetsbaarheid.', 'log-collector': 'log-collector heeft de gevaarlijkste instellingen, maar het image heeft geen kritieke kwetsbaarheid.' },
          why: 'Prioriteren in containeromgevingen is twee lijsten combineren: wat kwetsbaar is, en wat een overname oplevert. Een scanner zonder blik op de instellingen, of een audit van instellingen zonder scan, ziet maar de helft.',
          explain: 'rapportage-9c4e: het image heeft twee kritieke kwetsbaarheden met een fix in het basisimage, de pod draait als root, kan zijn rechten verhogen, is niet read-only, heeft schrijfrechten op /var/log van de node en geen limieten. Basisimage bijwerken, opnieuw bouwen en uitrollen met de instellingen van planning-web.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: waarom root in een container toch root is',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>"Het draait toch in een container" is een veelgehoord argument om een applicatie als root te laten draaien.
        Om te zien waarom dat argument niet opgaat, moet je weten wat een container eigenlijk is.</p>
        <p>Een virtuele machine heeft een eigen kernel, die op gesimuleerde hardware draait. Een container heeft dat
        niet. Een container is een gewoon proces op de host, dat door de kernel een beperkt beeld van de wereld krijgt.
        <strong>Namespaces</strong> zorgen dat het proces alleen zijn eigen processen, netwerk, bestandssysteem en
        hostnaam ziet. <strong>cgroups</strong> beperken hoeveel CPU, geheugen en processen het mag gebruiken.
        <strong>Capabilities</strong> knippen de alleskunner root op in losse rechten, zoals het binden aan een lage
        poort of het wijzigen van de systeemtijd, en de container krijgt er standaard maar een deel van.
        <strong>seccomp</strong> filtert welke systeemaanroepen het proces mag doen.</p>
        <p>Zonder extra maatregel is de gebruiker met uid 0 in de container dezelfde uid 0 als op de host. Al die lagen
        staan tussen dat proces en de rest van de machine, maar het blijft één kernel. Een kwetsbaarheid in de kernel,
        een verkeerde mount of een te ruime capability is genoeg om de scheiding te doorbreken, en dan ben je als root
        uitgebroken. Als gewone gebruiker uitbreken levert veel minder op.</p>
        <h3>User namespaces en rootless</h3>
        <p>Twee technieken halen de koppeling tussen root in de container en root op de host weg. Met <strong>user
        namespaces</strong> wordt uid 0 in de container vertaald naar een gewone, ongebruikte uid op de host. Bij
        <strong>rootless</strong> containers draait zelfs de container-runtime als gewone gebruiker. Docker, Podman
        en Kubernetes ondersteunen dit in verschillende vormen, met beperkingen die per versie verschillen. Ze zijn een
        sterke extra laag, maar geen reden om de applicatie zelf als root te laten draaien.</p>
        <h3>De volgorde van verdediging</h3>
        <ol>
          <li>De applicatie draait als gewone gebruiker, met een read-only bestandssysteem.</li>
          <li>Alle capabilities eraf, geen escalatie van rechten, een seccomp-profiel.</li>
          <li>Geen privileged, geen socket van de runtime, geen mappen van de host.</li>
          <li>Waar mogelijk user namespaces of rootless.</li>
          <li>De kernel en de runtime van de host bijgewerkt houden, want daar zit de laatste scheiding.</li>
        </ol>
        <p>Elke laag vangt fouten in de laag ervoor. Dat is defense in depth, toegepast op één proces.</p>
      `,
      questions: [
        { q: 'Een container draait als uid 0 zonder user namespaces. Een kwetsbaarheid in de kernel laat het proces de scheiding doorbreken. Welke uid heeft het proces dan op de host? (getal)', answer: ['0'],
          hints: ['Heeft de container een eigen kernel?', 'Zonder user namespaces wordt de uid niet vertaald.', 'Root is uid 0.'],
          wrong: { '1000': 'Dat zou zo kunnen zijn met user namespaces, die hier niet aanstaan.', '10001': 'Dat is een gewone uid, zoals planning-web uit taak 5. Deze container draait als root.' },
          explain: 'uid 0. Zonder vertaling is root in de container root op de host, zodra de scheiding wegvalt.' },
        { q: 'Welke kernelfunctie bepaalt hoeveel geheugen en hoeveel processen een container mag gebruiken?', options: ['cgroups', 'namespaces', 'capabilities', 'seccomp'], answer: 0,
          wrong: { 1: 'Namespaces bepalen wat een proces ziet, niet hoeveel het mag gebruiken.', 2: 'Capabilities bepalen welke rootrechten een proces heeft.', 3: 'seccomp filtert systeemaanroepen.' },
          explain: 'cgroups. Daarop werken --memory, --cpus en --pids-limit.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Security+, CySA+ en ISC2 CC vragen naar hardening meestal met een situatie en vier maatregelen. Alle vier
        zijn ergens goed voor, maar één pakt het genoemde risico bij de bron aan. De afleiders zijn maatregelen die
        detecteren waar voorkomen gevraagd wordt, of die een ander deel van de stapel beschermen: het netwerk waar het
        image het probleem is, of de host waar het om de container gaat.</p>
        <h3>Waar je op let</h3>
        <ul>
          <li><strong>Baseline en afwijking:</strong> een vaste, gedocumenteerde configuratie (zoals een CIS Benchmark)
          plus periodieke controle op afwijkingen.</li>
          <li><strong>Build tegenover runtime:</strong> geheimen en onnodige pakketten los je op in het image; root,
          privileged en mounts in de manier van starten.</li>
          <li><strong>Voorkomen tegenover zien:</strong> auditd en logs vertellen wat er gebeurde, ze houden het niet
          tegen.</li>
        </ul>
        <p>Warm op met het lab: groepeer de zestien begrippen in vier groepen van vier. De vijf vragen eronder zijn zelf
        geschreven in examenstijl. Alle organisaties zijn fictief.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien begrippen in vier groepen van vier.',
        groups: [
          { name: 'Hardening bij het starten van een container', items: ['--read-only', '--cap-drop ALL', '--pids-limit', '--security-opt no-new-privileges'] },
          { name: 'Risico\'s in een Dockerfile', items: ['FROM met tag latest', 'ENV met een wachtwoord', 'Geen USER-instructie', 'ADD van een URL'] },
          { name: 'Controlepunten in een Linux-baseline', items: ['SUID-inventaris', 'PermitRootLogin', 'auditd-regels', 'Beveiligingsupdates'] },
          { name: 'Eisen van het profiel Restricted', items: ['runAsNonRoot', 'allowPrivilegeEscalation false', 'seccomp RuntimeDefault', 'capabilities drop ALL'] },
        ],
      },
      questions: [
        { q: 'Een fictieve hostingpartij beheert 400 Linux-servers. Bij elke audit blijken de instellingen per server anders. Wat helpt het meest om dit structureel op te lossen?',
          options: ['Een vastgestelde baseline, bijvoorbeeld op basis van een CIS Benchmark, automatisch uitrollen en periodiek op afwijkingen controleren', 'Op alle servers auditd installeren', 'Een extra firewall voor het hele netwerk plaatsen', 'Alle beheerders een training Linux laten volgen'], answer: 0,
          wrong: { 1: 'auditd laat zien wat er verandert, maar legt niet vast hoe het hoort te zijn.', 2: 'Een firewall beschermt het netwerk, niet de configuratie van de servers.', 3: 'Kennis helpt, maar zonder vastgelegde baseline blijft elke server anders.' },
          explain: 'Configuratiebeheer: een gedocumenteerde baseline, automatisch toegepast en gecontroleerd.' },
        { q: 'Bij een fictief webbureau blijkt een databasewachtwoord te lezen in de configuratie van een container-image dat in een openbaar register staat. Wat is de beste structurele oplossing, naast het vervangen van het wachtwoord?',
          options: ['Het register op privé zetten', 'Het wachtwoord niet meer in het image zetten, maar bij het starten aanleveren via een secretmanager of runtime-secret', 'Het image versleutelen', 'Het image vaker opnieuw bouwen'], answer: 1,
          wrong: { 0: 'Dan kan minder mensen erbij, maar iedereen met toegang tot het register leest het wachtwoord nog steeds.', 2: 'Wie het image mag draaien, moet het kunnen ontsleutelen, en leest het wachtwoord dan alsnog.', 3: 'Elke nieuwe build bevat het wachtwoord opnieuw.' },
          explain: 'Geheimen horen niet in images. Ze komen bij het starten binnen.' },
        { q: 'Een fictieve gemeente installeert een monitoringtool die volgens de handleiding de Docker-socket nodig heeft. Wat is het grootste risico?',
          options: ['De tool kan het geheugen van de host vullen', 'Wie de container van de tool overneemt, kan via de socket nieuwe containers starten en zo de host overnemen', 'De tool kan het netwerkverkeer van andere containers afluisteren', 'De logbestanden worden te groot'], answer: 1,
          wrong: { 0: 'Dat los je op met een geheugenlimiet. Het grotere risico zit in de socket.', 2: 'Dat vraagt om andere rechten, zoals het hostnetwerk. De socket geeft iets ergers.', 3: 'Lastig, maar geen beveiligingsrisico van de orde van een overname van de host.' },
          explain: 'Toegang tot de socket van de runtime staat gelijk aan root op de host.' },
        { q: 'Een fictief ziekenhuis wil weten wie er wijzigingen aanbrengt in /etc/sudoers, ook als beheerders sudo gebruiken. Welk veld in auditd geeft dat antwoord?',
          options: ['uid', 'euid', 'auid', 'gid'], answer: 2,
          wrong: { 0: 'Na sudo is de uid root. Daarmee weet je niet wie het was.', 1: 'De effectieve uid is na sudo ook root.', 3: 'De groep zegt niets over de persoon.' },
          explain: 'auid, de login-uid, blijft gelijk na sudo en su.' },
        { q: 'Een fictieve webwinkel wil in Kubernetes afdwingen dat geen enkele pod in de namespace productie als root draait of zijn rechten kan verhogen. Wat past het beste?',
          options: ['Een NetworkPolicy die al het verkeer tussen pods weigert', 'Pod Security Admission met het niveau Restricted op de namespace', 'Versleuteling van Secrets in de clusteropslag', 'Een image-scanner in de pipeline'], answer: 1,
          wrong: { 0: 'Een NetworkPolicy regelt verkeer, niet onder welke gebruiker een pod draait.', 2: 'Dat beschermt geheimen in opslag, niet de manier waarop pods draaien.', 3: 'Een scanner vindt kwetsbare pakketten, maar houdt een pod met root niet tegen.' },
          explain: 'Het niveau Restricted eist onder meer runAsNonRoot en geen escalatie van rechten, en Pod Security Admission dwingt het af per namespace.' },
      ],
    },
  ],

  terms: [
    { term: 'Baseline', def: 'Vastgestelde, gedocumenteerde set instellingen waaraan elk systeem van een soort moet voldoen, vaak gebaseerd op een CIS Benchmark.' },
    { term: 'CIS Benchmark', def: 'Configuratierichtlijn van het Center for Internet Security per besturingssysteem of platform, met profielen niveau 1 en 2.' },
    { term: 'SUID', def: 'Bestandsrecht waardoor een programma draait met de rechten van de eigenaar in plaats van degene die het start; zichtbaar als s in ls -l.' },
    { term: 'auditd', def: 'Het audit-systeem van de Linux-kernel dat vastlegt wie welke bestanden wijzigt of welke systeemaanroepen doet, op basis van regels met een zoeksleutel.' },
    { term: 'auid', def: 'Audit user id of login-uid: de gebruiker die zich oorspronkelijk aanmeldde; verandert niet door sudo of su.' },
    { term: 'Privileged container', def: 'Container die vrijwel alle capabilities en toegang tot de apparaten van de host krijgt, waardoor de scheiding met de host grotendeels wegvalt.' },
    { term: 'Capabilities', def: 'Opdeling van rootrechten in losse rechten, zodat een proces alleen krijgt wat het nodig heeft.' },
    { term: 'Pod Security Standards', def: 'De drie Kubernetes-beveiligingsniveaus Privileged, Baseline en Restricted, af te dwingen per namespace met Pod Security Admission.' },
    { term: 'Image-scanning', def: 'Het doorzoeken van de pakketten in een container-image op bekende kwetsbaarheden, en vaak ook op geheimen en riskante instellingen.' },
  ],

  resources: [
    { title: 'CIS Benchmarks (Linux, Docker, Kubernetes)', url: 'https://www.cisecurity.org/cis-benchmarks' },
    { title: 'NIST SP 800-190: Application Container Security Guide (2017)', url: 'https://csrc.nist.gov/pubs/sp/800/190/final' },
    { title: 'OWASP Cheat Sheet: Docker Security', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html' },
    { title: 'Kubernetes: Pod Security Standards', url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/' },
  ],
});
