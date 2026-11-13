/* Game room: De vergeten server (hardening onder druk) */
CS.registerRoom({
  id: 'game-vergeten-server',
  path: 'gamerooms',
  order: 4,
  title: 'De vergeten server',
  difficulty: 'Gemiddeld',
  level: 'Praktijk',
  checked: '2026-11-12',
  minutes: 30,
  summary: 'Een webshopserver die jaren niemand heeft aangeraakt, staat op internet. Scanners hebben hem al gevonden. Vind de zwakke plekken en dicht ze, zonder de webshop plat te leggen.',
  objectives: [
    'Een Linux-server doorlopen op de bekende zwakke plekken: SSH, accounts, poorten, rechten, updates',
    'Kiezen tussen een maatregel die het risico weghaalt en een die ook het werk stopt',
    'Begrijpen waarom een script dat iedereen mag aanpassen en root uitvoert, een risico is',
  ],
  tasks: [
    {
      title: 'Taak 1 — Waar je naar kijkt',
      content: `
        <p>Hardening betekent: weghalen wat niet nodig is, en dichtzetten wat wel nodig is maar te ruim openstaat. Bij een
        Linux-server op internet kijk je in elk geval naar:</p>
        <ul>
          <li><strong>SSH</strong>: mag root direct inloggen, en mag dat met een wachtwoord?</li>
          <li><strong>Accounts</strong>: welke accounts bestaan er nog, en wie gebruikt ze?</li>
          <li><strong>Poorten</strong>: wat luistert er, en op welk adres (<code>0.0.0.0</code> is iedereen, <code>127.0.0.1</code> alleen de server zelf)?</li>
          <li><strong>Geplande taken en rechten</strong>: wat draait er als root, en wie mag die bestanden aanpassen?</li>
          <li><strong>Updates</strong>: welke pakketten hebben beveiligingsupdates openstaan?</li>
        </ul>
        <p>De CIS Benchmarks zijn een bekende, gratis checklist hiervoor. De kunst is niet alles dichtgooien, maar dichtzetten wat niet
        hoeft open te staan, terwijl de webshop blijft draaien.</p>
      `,
      questions: [
        { q: 'Een database luistert op 127.0.0.1:5432. Moet je die poort voor internet dichtzetten?',
          options: ['Ja, elke open poort is een risico', 'Nee, hij is alleen vanaf de server zelf bereikbaar', 'Ja, maar alleen \'s nachts', 'Nee, databases zijn altijd versleuteld'],
          answer: 1,
          wrong: { 0: '127.0.0.1 is het loopback-adres: van buiten kan niemand erbij.', 2: 'Hij is overdag net zo onbereikbaar van buiten als \'s nachts.', 3: 'Versleuteling van de verbinding staat los van de vraag wie erbij kan.' },
          explain: 'Op 127.0.0.1 luisteren betekent alleen bereikbaar vanaf de machine zelf. Dat is precies hoe een database achter een webshop hoort te staan.' },
      ],
    },
    {
      title: 'Taak 2 — De server',
      content: `
        <p>Lees het mandaat en begin. <code>show</code> geeft de onderwerpen, <code>fix</code> de maatregelen die klaarstaan. Niet
        elke maatregel in de lijst is een goed idee. Over twintig minuten vindt de eerste scanner je server.</p>
      `,
      lab: {
        type: 'incident',
        title: 'Bloemenhuis Veldkamp · web-03',
        role: 'Beheerder bij Bloemenhuis Veldkamp (fictief), net aangenomen, met mandaat om de webshopserver web-03 te beveiligen.',
        story: 'Niemand weet nog precies wat er op web-03 draait; de vorige beheerder is twee jaar weg. De webshop moet open blijven: vandaag is de drukste dag van de maand.',
        mandate: [
          'Alles gebeurt in deze simulatie. Wijzig nooit systemen waarvoor je geen opdracht en toestemming hebt.',
          'Je mag instellingen, accounts, rechten en de firewall van web-03 aanpassen en updates installeren.',
          'De webshop (poort 443) moet bereikbaar blijven, en beheer moet via SSH kunnen blijven inloggen.',
          'Verwijder niets wat je niet begrijpt; zet het eerst dicht en vraag het na.',
        ],
        vars: {
          port: ['8080', '8443', '9090'],
          olduser: ['test', 'stagiair', 'demo'],
        },
        start: '13:00',
        deadline: 60,
        maxDamage: 40,
        motd: 'web-03 · Bloemenhuis Veldkamp. Typ help, show en fix.',
        hosts: [
          { name: 'web-03', ip: '198.51.100.45', role: 'Webshopserver', critical: true },
        ],
        show: {
          ssh: ['# /etc/ssh/sshd_config (uittreksel)', 'Port 22', 'PermitRootLogin yes', 'PasswordAuthentication yes', 'PubkeyAuthentication yes'],
          gebruikers: ['root      uid 0     laatst ingelogd: 3 jaar geleden', 'beheer    uid 1000  sleutel, laatst ingelogd: gisteren', '{{olduser}}  uid 1001  wachtwoord "Welkom01", laatst ingelogd: 14 maanden geleden', 'www-data  uid 33    systeemaccount van de webserver'],
          poorten: ['tcp  0.0.0.0:22       sshd', 'tcp  0.0.0.0:443      nginx (webshop)', 'tcp  0.0.0.0:{{port}}  java (oude beheerconsole, versie uit 2019)', 'tcp  127.0.0.1:5432   postgres (database van de webshop)'],
          cron: ['# /etc/crontab', '*/30 * * * *  root  /opt/scripts/opschonen.sh   # oude logbestanden weg', '0 2 * * *     root  /usr/local/bin/backup-db'],
          rechten: ['-rwxrwxrwx  beheer beheer  /opt/scripts/opschonen.sh   (iedereen mag dit bestand aanpassen)', '-rwxr-xr-x  root   root    /usr/local/bin/backup-db', 'drwxr-xr-x  www-data       /var/www/shop/uploads'],
          updates: ['openssl  3.0.2 -> 3.0.15  (beveiligingsupdates)', 'nginx    actueel', 'kernel   actueel'],
          firewall: ['standaardbeleid inkomend: alles toestaan', 'geen regels'],
        },
        fixes: [
          { id: 'poort-dicht', good: true, text: 'Poort {{port}} dicht voor internet; alleen bereikbaar via de beheer-VPN', done: 'Poort {{port}} is nu alleen via de beheer-VPN bereikbaar. De webshop draait gewoon door.' },
          { id: 'ssh-root', good: true, text: 'PermitRootLogin no', done: 'Root kan niet meer direct via SSH inloggen; beheer logt in als beheer en gebruikt sudo.' },
          { id: 'ssh-wachtwoord', good: true, text: 'PasswordAuthentication no (alleen sleutels)', done: 'SSH accepteert alleen nog sleutels. Het account beheer heeft er een, dus beheer kan er gewoon in.' },
          { id: 'ssh-uit', good: false, points: 15, text: 'SSH helemaal uitzetten', why: 'Zonder SSH kan beheer er niet meer in; de volgende storing betekent een rit naar het datacenter. Wachtwoorden en root uitzetten haalt het risico weg zonder dat.' },
          { id: 'account-oud', good: true, text: 'Account {{olduser}} uitschakelen', done: 'Account {{olduser}} is uitgeschakeld. Het was al veertien maanden niet gebruikt.' },
          { id: 'script-rechten', good: true, text: 'opschonen.sh van root maken en alleen voor root schrijfbaar (chmod 755)', done: 'opschonen.sh is nu van root en alleen root kan het aanpassen. De taak draait gewoon door.' },
          { id: 'cron-weg', good: false, points: 10, text: 'De cronregel voor opschonen.sh verwijderen', why: 'Dan loopt de schijf vol met oude logbestanden. Het risico zat in de rechten op het script, niet in de taak zelf.' },
          { id: 'update', good: true, text: 'Beveiligingsupdates voor openssl installeren', done: 'openssl is bijgewerkt naar 3.0.15. nginx is daarna netjes herladen.' },
          { id: 'firewall-alles', good: false, points: 20, text: 'Firewall: al het inkomende verkeer weigeren', why: 'Ook 443 en 22 gaan dicht: de webshop is onbereikbaar op de drukste dag van de maand. Een goede regel zegt wat wél mag.' },
          { id: 'firewall-regels', good: true, text: 'Firewall: inkomend alleen 443, en 22 vanaf het beheer-VPN', done: 'De firewall laat nu alleen 443 van iedereen en 22 vanaf het beheer-VPN toe.' },
          { id: 'db-herstart', good: false, points: 5, text: 'Postgres herstarten', why: 'Daar was niets mis mee: hij luistert alleen op 127.0.0.1. Een herstart midden op de dag breekt lopende bestellingen af.' },
        ],
        threats: [
          { id: 'console', at: 20, label: 'Scanner vindt de oude beheerconsole (T1190)', text: 'Een scanner op internet vindt de beheerconsole op poort {{port}} en logt in met het standaardwachtwoord.', stoppedBy: ['fix:poort-dicht', 'fix:firewall-regels', 'fix:firewall-alles'], damage: 15 },
          { id: 'spray', at: 35, label: 'Wachtwoorden raden op SSH (T1110)', text: 'Een botnet raadt wachtwoorden op SSH en komt binnen met {{olduser}} / Welkom01.', stoppedBy: ['fix:ssh-wachtwoord', 'fix:account-oud', 'fix:ssh-uit'], damage: 15 },
          { id: 'script', at: 50, label: 'Een script dat root uitvoert, aangepast (T1053.003)', text: 'Via een lek in een webshop-plug-in schrijft www-data in opschonen.sh. Een halfuur later voert root het uit.', stoppedBy: ['fix:script-rechten', 'fix:cron-weg'], damage: 10 },
        ],
        objectives: [
          { text: 'De oude beheerconsole niet meer bereikbaar vanaf internet, vóór 13:20', any: ['fix:poort-dicht', 'fix:firewall-regels'], before: 20, points: 10, required: true },
          { text: 'SSH alleen met sleutels en zonder directe root-login', all: ['fix:ssh-root', 'fix:ssh-wachtwoord'], points: 10 },
          { text: 'Het vergeten account uitgeschakeld', all: ['fix:account-oud'], points: 10 },
          { text: 'Het script dat root uitvoert, alleen nog door root aan te passen', all: ['fix:script-rechten'], points: 10 },
          { text: 'De openstaande beveiligingsupdates geïnstalleerd', all: ['fix:update'], points: 10 },
          { text: 'Een firewall die zegt wat wél mag', all: ['fix:firewall-regels'], points: 10 },
        ],
        pass: 45,
        flag: 'NM{server_gehard}',
        solution: ['show poorten', 'fix poort-dicht', 'show ssh', 'show gebruikers', 'fix ssh-root', 'fix ssh-wachtwoord', 'fix account-oud', 'show cron', 'show rechten', 'fix script-rechten', 'show updates', 'fix update', 'fix firewall-regels', 'report'],
        solutionNotes: [
          'Poorten eerst: wat van buiten zichtbaar is, wordt als eerste gevonden. Een beheerconsole uit 2019 hoort niet op internet.',
          'Zet hem achter de beheer-VPN. Niet weghalen: misschien gebruikt iemand hem nog.',
          'SSH: root mag direct in, en wachtwoorden werken.',
          'Er is een oud account met een zwak wachtwoord, en beheer heeft een sleutel.',
          'Root-login uit.',
          'Alleen sleutels. Beheer heeft er een, dus niemand sluit zichzelf buiten.',
          'Het oude account uit.',
          'Een script dat elk halfuur als root draait.',
          'En iedereen mag het aanpassen. Wie er iets in zet, laat root het uitvoeren.',
          'Maak het van root en alleen voor root schrijfbaar. De taak zelf blijft nodig.',
          'Openstaande beveiligingsupdates voor openssl.',
          'Installeren.',
          'Tot slot een firewall die alleen 443 en beheer-SSH toelaat.',
          'Sluit af.',
        ],
        debrief: `
          <h4>Wat er op de server misging</h4>
          <p>Niets hiervan is een geavanceerde aanval. Het zijn vergeten dingen: een oude beheerconsole op internet (T1190), een account
          met een zwak wachtwoord en SSH met wachtwoorden (T1110), en een script dat root elk halfuur uitvoert terwijl iedereen het mag
          aanpassen (T1053.003). Scanners op internet vinden zo'n server binnen uren.</p>
          <h4>Waarom de verleidelijke maatregelen fout zijn</h4>
          <ul>
            <li><strong>Alles dicht</strong> haalt het risico weg, maar ook de webshop. Een firewall zegt wat wél mag.</li>
            <li><strong>SSH uit</strong> sluit ook de beheerder buiten. Sleutels en geen root-login doen hetzelfde voor de aanvaller.</li>
            <li><strong>De taak weghalen</strong> verplaatst het probleem naar een volle schijf. Het risico zat in de rechten.</li>
          </ul>
          <h4>Hoe je dit volhoudt</h4>
          <ul>
            <li>Een inventaris: welke servers, wie is eigenaar, wat draait erop. Vergeten servers zijn de makkelijkste ingang.</li>
            <li>Een basisconfiguratie volgens de CIS Benchmark, en een maandelijkse controle van open poorten van buitenaf.</li>
            <li>Automatische beveiligingsupdates, of een vast patchmoment.</li>
          </ul>
          <p>Verder leren: <a href="#/room/linux-basis">Linux: de basis</a>, <a href="#/room/veilig-thuis-werk">Veilig thuis en op het werk</a>,
          <a href="#/room/kwetsbaarheden-cvss">Kwetsbaarheden en CVSS</a>.</p>
        `,
        ask: [
          { q: 'Op welke poort draaide de vergeten beheerconsole?', answer: ['{{port}}'] },
          { q: 'Welk account was vergeten?', answer: ['{{olduser}}'] },
        ],
      },
      questions: [
        { q: 'Hard de server. Welke vlag krijg je in de nabespreking?', answer: ['NM{server_gehard}'],
          hints: ['Begin met wat van buiten zichtbaar is: de eerste scanner komt om 13:20.', 'Bekijk show poorten, ssh, gebruikers, cron, rechten en updates; fix toont de maatregelen.', 'Drie maatregelen in de lijst lijken stevig maar leggen werk stil. Kies de maatregel die precies het risico weghaalt.'],
          explain: 'Elke variant heeft een andere poort en een ander vergeten account; de aanpak is dezelfde.' },
        { q: 'Een script dat root elk halfuur uitvoert, heeft de rechten -rwxrwxrwx. Wat is het risico?',
          options: ['Het script kan per ongeluk verwijderd worden', 'Iedereen die iets op de server mag schrijven, kan zo commando\'s als root laten uitvoeren', 'Het script draait te vaak', 'Er is geen risico, cron draait alleen als root'],
          answer: 1,
          wrong: { 0: 'Dat kan ook, maar het grote risico is dat iemand er iets aan toevoegt.', 2: 'Hoe vaak het draait, maakt voor het risico niet uit.', 3: 'Juist omdat root het uitvoert, telt mee wie het bestand mag aanpassen.' },
          why: 'Een geplande taak is zo sterk als het zwakste bestand dat hij uitvoert. Dit is een van de vaste punten in elke Linux-controle.',
          explain: 'Wie het bestand mag aanpassen, bepaalt wat root uitvoert. Maak het van root en alleen voor root schrijfbaar.' },
      ],
    },
  ],
  terms: [
    { term: 'Hardening', def: 'Een systeem veiliger maken door weg te halen wat niet nodig is en dicht te zetten wat te ruim openstaat.' },
    { term: 'CIS Benchmark', def: 'Een gratis, veelgebruikte lijst met aanbevolen instellingen per besturingssysteem en product, van het Center for Internet Security.' },
    { term: 'Loopback (127.0.0.1)', def: 'Het adres waarmee een machine zichzelf bereikt. Een dienst die daarop luistert, is van buiten niet bereikbaar.' },
    { term: 'Aanvalsoppervlak', def: 'Alles waarlangs een aanvaller iets kan proberen: open poorten, accounts, diensten, bestanden met te ruime rechten.' },
    { term: 'Sleutelauthenticatie', def: 'Inloggen met een sleutelpaar in plaats van een wachtwoord. Niet te raden, wel kwijt te raken: bewaar de privésleutel goed.' },
  ],
  resources: [
    { title: 'CIS Benchmarks', url: 'https://www.cisecurity.org/cis-benchmarks' },
    { title: 'MITRE ATT&CK: Exploit Public-Facing Application (T1190)', url: 'https://attack.mitre.org/techniques/T1190/' },
  ],
});
