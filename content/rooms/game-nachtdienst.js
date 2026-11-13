/* Game room: De Nachtdienst (verdedigen onder druk) */
CS.registerRoom({
  id: 'game-nachtdienst',
  path: 'gamerooms',
  order: 1,
  title: 'De Nachtdienst',
  difficulty: 'Gemiddeld',
  level: 'Praktijk',
  checked: '2026-11-12',
  minutes: 35,
  summary: 'Het is 02:10 en jij hebt dienst. Iemand is via de VPN binnengekomen en de klok loopt. Stop de aanval, stel bewijs veilig en leg het bedrijf niet stil.',
  objectives: [
    'Een aanval in logs en meldingen terugvinden terwijl hij nog loopt',
    'Kiezen tussen isoleren, uitzetten en eerst bewijs veiligstellen',
    'Echte sporen onderscheiden van gepland nachtwerk',
    'Uitleggen welke maatregel deze aanval aan het begin had gestopt',
  ],
  tasks: [
    {
      title: 'Taak 1 — De overdracht',
      content: `
        <p>Je neemt de nachtdienst over in het SOC van <strong>Kade Transport BV</strong> (fictief). In de taak hierna zit je in de
        <strong>incidentconsole</strong>: je typt opdrachten, en elke opdracht kost tijd. Lezen kost een minuut, een host isoleren twee,
        een geheugenbeeld maken vijf. Ondertussen gaat de aanvaller door.</p>
        <p>Drie dingen tellen:</p>
        <ul>
          <li><strong>Doelen</strong>: wat je moet bereiken. Ze staan bovenaan de console.</li>
          <li><strong>Schade</strong>: wat de aanvaller bereikt omdat je te laat was.</li>
          <li><strong>Gevolgen</strong>: wat jij kapotmaakt met een verkeerde ingreep, zoals een server zonder reden offline halen.</li>
        </ul>
        <p>Isoleren via de EDR haalt een machine van het netwerk, maar laat hem aan: de aanvaller kan niets meer, en jij kunt nog
        onderzoeken. Uitzetten stopt de aanval ook, maar wist het werkgeheugen, en daarmee de processen, verbindingen en vaak de sleutel tot
        de rest van het onderzoek.</p>
      `,
      questions: [
        { q: 'Een werkplek is besmet en de aanvaller is nog actief. Welke eerste ingreep stopt hem én bewaart het meeste bewijs?',
          options: ['De werkplek uitzetten', 'De werkplek isoleren via de EDR', 'De netwerkkabel eruit trekken en daarna uitzetten', 'De werkplek opnieuw installeren'],
          answer: 1,
          wrong: { 0: 'Uitzetten stopt de aanval, maar het werkgeheugen is daarna weg: processen, verbindingen, sleutels.', 2: 'De kabel eruit is beter dan niets, maar door daarna uit te zetten verlies je alsnog het geheugen.', 3: 'Herinstalleren wist al het bewijs en je weet nog niet hoe de aanvaller binnenkwam.' },
          explain: 'Isoleren knipt het netwerk af, maar de machine blijft aan. De EDR-agent houdt contact, dus je kunt nog een geheugenbeeld maken.' },
      ],
    },
    {
      title: 'Taak 2 — De dienst',
      content: `
        <p>Lees het mandaat, begin de dienst en typ <code>help</code>. Begin met <code>alerts</code>. Er is meer aan de hand dan de
        meldingen laten zien, en niet alles wat er 's nachts gebeurt, is verdacht.</p>
        <p>Lukt het niet? Na je eerste poging gaat de walkthrough open. Elke leerling krijgt een eigen variant met andere adressen en
        namen; met "Andere variant" speel je een nieuwe.</p>
      `,
      lab: {
        type: 'incident',
        title: 'Kade Transport BV · nachtdienst',
        role: 'Dienstdoend SOC-analist bij Kade Transport BV (fictief), met mandaat om systemen te isoleren, adressen te blokkeren en accounts te resetten.',
        story: 'Om 02:04 sloegen de VPN-meldingen aan. De dagdienst is naar huis, de nachtplanner werkt nog, en de back-up van vannacht loopt.',
        mandate: [
          'Alles gebeurt in deze simulatie. Doe dit nooit op systemen waarvoor je geen opdracht en toestemming hebt.',
          'Je mag hosts isoleren, IP-adressen blokkeren en accounts resetten of uitschakelen.',
          'Kritieke systemen (domeincontroller, bestandsserver, back-up) haal je alleen offline als je kunt onderbouwen dat ze besmet zijn.',
          'Bewijs gaat voor opruimen: wat je uitzet of wist, is weg.',
        ],
        vars: {
          ip: ['203.0.113.47', '203.0.113.88', '198.51.100.61', '192.0.2.143', '203.0.113.214'],
          user: ['m.jansen', 's.bakker', 'r.visser', 'l.mulder', 't.smit'],
          ws: ['07', '11', '14', '19', '23'],
          vpnip: ['10.8.0.23', '10.8.0.31', '10.8.0.42', '10.8.0.57'],
          pid: ['4412', '5180', '6624', '7036'],
        },
        start: '02:10',
        deadline: 50,
        maxDamage: 60,
        motd: 'Nachtdienst Kade Transport. Typ help voor de opdrachten, en begin met alerts.',
        hosts: [
          { name: 'vpn-gw', ip: '10.0.0.1', role: 'VPN-gateway', critical: true },
          { name: 'dc-01', ip: '10.0.1.10', role: 'Domeincontroller', critical: true },
          { name: 'fs-01', ip: '10.0.1.20', role: 'Bestandsserver (planning, facturen)', critical: true, compromisedBy: 'zijwaarts' },
          { name: 'bak-01', ip: '10.0.1.30', role: 'Back-upserver', critical: true },
          { name: 'ws-02', ip: '10.0.2.102', role: 'Werkplek nachtplanner', critical: true },
          { name: 'ws-{{ws}}', ip: '10.0.2.1{{ws}}', role: 'Werkplek planning (dagdienst)', compromised: true },
        ],
        accounts: [
          { name: '{{user}}', role: 'Planner, dagdienst', compromised: true },
          { name: 'n.dekker', role: 'Nachtplanner, nu aan het werk', critical: true, lockText: 'n.dekker is de nachtplanner: de ritten voor morgenochtend worden nu niet ingepland.' },
          { name: 'svc-backup', role: 'Serviceaccount voor de nachtelijke back-up', critical: true, lockText: 'svc-backup is het account van de geplande back-up. Die is nu afgebroken, en morgen is er geen herstelpunt van vannacht.' },
          { name: 'adm-ict', role: 'Beheeraccount ICT', critical: true },
        ],
        legit: [
          { value: '198.51.100.20', text: '198.51.100.20 is de externe back-upleverancier. De nachtelijke upload is gepland werk en staat in het wijzigingsrooster; de back-up van vannacht is nu mislukt.' },
        ],
        alerts: [
          { t: -6, text: 'VPN: 41 mislukte aanmeldingen in 4 minuten vanaf {{ip}}, verdeeld over 9 accounts' },
          { t: -3, text: 'VPN: geslaagde aanmelding vanaf {{ip}} direct na de reeks mislukte pogingen (land: onbekend)' },
          { t: 3, text: 'EDR ws-{{ws}}: niet-ondertekend programma u.exe draait vanuit C:\\Users\\Public (pid {{pid}})', unless: ['isolate:ws-{{ws}}'] },
          { t: 9, text: 'Back-up: svc-backup uploadt 38 GB naar 198.51.100.20 (back-upleverancier)' },
          { t: 12, text: 'Firewall: ws-{{ws}} maakt elke 3 minuten een korte verbinding met {{ip}}:443', unless: ['isolate:ws-{{ws}}', 'kill:ws-{{ws}}:{{pid}}', 'block:{{ip}}'] },
          { t: 17, text: 'EDR ws-{{ws}}: u.exe heeft het geheugen van lsass.exe gelezen', after: 'dump' },
          { t: 25, text: 'EDR fs-01: aanmelding {{user}} via SMB vanaf ws-{{ws}}', after: 'zijwaarts' },
        ],
        logs: {
          'vpn-gw': (function () {
            const names = ['j.devries', 'a.bos', 'p.kok', '{{user}}', 'b.meijer', 'k.dijkstra', 'h.vos', 'e.smits', 'administrator'];
            const out = [{ t: -95, line: 'auth ok user=r.kuiper src=198.51.100.140 (thuis) tunnel=10.8.0.12' }, { t: -71, line: 'session closed user=r.kuiper duur=24m' }];
            for (let i = 0; i < 41; i++) out.push({ t: -8 + Math.floor(i / 9), line: 'auth FAILED user=' + names[i % names.length] + ' src={{ip}} reden=onjuist wachtwoord' });
            out.push({ t: -3, line: 'auth ok user={{user}} src={{ip}} tunnel={{vpnip}} mfa=niet ingesteld' });
            return out;
          })(),
          'ws-{{ws}}': [
            { t: -2, line: 'Security 4624 aanmelding type 10 (RDP) user={{user}} bron={{vpnip}}' },
            { t: -1, line: 'Sysmon 11 bestand aangemaakt C:\\Users\\Public\\u.exe door {{user}}' },
            { t: -1, line: 'Sysmon 1 proces gestart u.exe pid={{pid}} user={{user}} ouder=explorer.exe handtekening=geen' },
            { t: 1, line: 'Sysmon 3 u.exe pid={{pid}} verbinding naar {{ip}}:443' },
            { t: 11, line: 'Sysmon 10 u.exe pid={{pid}} vraagt toegang tot lsass.exe (0x1010)', unless: ['isolate:ws-{{ws}}', 'kill:ws-{{ws}}:{{pid}}'] },
            { t: 16, line: 'Sysmon 10 u.exe pid={{pid}} leest geheugen van lsass.exe', after: 'dump' },
          ],
          'ws-02': [
            { t: -40, line: 'Security 4624 aanmelding type 2 (aan het toetsenbord) user=n.dekker' },
            { t: 4, line: 'planbord.exe: 18 ritten ingepland voor morgen 06:00' },
          ],
          'fs-01': [
            { t: 24, line: 'Security 4624 aanmelding type 3 (netwerk) user={{user}} bron=10.0.2.1{{ws}}', after: 'zijwaarts' },
            { t: 30, line: 'SMB: 1.874 bestanden gelezen door {{user}} in \\\\planning en \\\\facturen', after: 'zijwaarts' },
          ],
          'firewall': (function () {
            const out = [];
            for (let t = 5; t <= 45; t += 5) out.push({ t, line: 'ALLOW 10.0.1.30 -> 198.51.100.20:443 user=svc-backup bytes_out=4.1GB (back-up, gepland)' });
            for (let t = 1; t <= 46; t += 3) out.push({ t, line: 'ALLOW 10.0.2.1{{ws}} -> {{ip}}:443 bytes_out=1.2kB', unless: ['isolate:ws-{{ws}}', 'kill:ws-{{ws}}:{{pid}}', 'block:{{ip}}'] });
            out.push({ t: 34, line: 'ALLOW 10.0.1.20 -> {{ip}}:443 bytes_out=2.3GB', after: 'exfil' });
            return out;
          })(),
        },
        procs: {
          'ws-{{ws}}': [
            { pid: '612', name: 'lsass.exe', user: 'SYSTEM', critical: true, killText: 'lsass.exe stoppen laat Windows direct herstarten: het werkgeheugen en daarmee je bewijs is weg.' },
            { pid: '2240', name: 'explorer.exe', user: '{{user}}' },
            { pid: '3020', name: 'rdpclip.exe', user: '{{user}}' },
            { pid: '{{pid}}', name: 'u.exe', user: '{{user}}', note: 'C:\\Users\\Public\\u.exe, niet ondertekend' },
          ],
          'ws-02': [
            { pid: '1876', name: 'planbord.exe', user: 'n.dekker', critical: true, killText: 'planbord.exe is het planprogramma van de nachtplanner; zijn werk van het afgelopen uur is weg.' },
            { pid: '2104', name: 'explorer.exe', user: 'n.dekker' },
          ],
        },
        threats: [
          { id: 'dump', at: 16, label: 'Wachtwoorden uit het geheugen lezen (T1003.001)', text: 'ws-{{ws}}: u.exe leest het geheugen van lsass.exe. De wachtwoordhashes van iedereen die hier was aangemeld, liggen nu bij de aanvaller.', stoppedBy: ['isolate:ws-{{ws}}', 'kill:ws-{{ws}}:{{pid}}'], damage: 15 },
          { id: 'zijwaarts', at: 24, label: 'Zijwaartse beweging naar de bestandsserver (T1021.002)', text: 'ws-{{ws}} → fs-01: aanmelding via SMB met {{user}}. De aanvaller zit nu ook op de bestandsserver.', stoppedBy: ['isolate:ws-{{ws}}', 'reset:{{user}}', 'disable:{{user}}'], damage: 20 },
          { id: 'exfil', at: 34, requires: 'zijwaarts', label: 'Gegevens naar buiten (T1041)', text: 'fs-01 → {{ip}}: 2,3 GB aan planning en facturen gaat naar de aanvaller.', stoppedBy: ['block:{{ip}}'], damage: 25 },
        ],
        objectives: [
          { text: 'Het IP-adres van de aanvaller geblokkeerd', all: ['block:{{ip}}'], points: 10 },
          { text: 'Het overgenomen account gereset of uitgeschakeld', any: ['reset:{{user}}', 'disable:{{user}}'], points: 10 },
          { text: 'Geheugen en schijf van de besmette werkplek veiliggesteld', all: ['snapshot:ws-{{ws}}'], points: 10 },
          { text: 'De besmette werkplek van het netwerk, vóór 02:26', any: ['isolate:ws-{{ws}}'], before: 16, points: 10, required: true },
        ],
        pass: 30,
        flag: 'NM{nachtdienst_beheerst}',
        solution: ['alerts', 'logs vpn-gw {{ip}}', 'block {{ip}}', 'reset {{user}}', 'snapshot ws-{{ws}}', 'isolate ws-{{ws}}', 'report'],
        solutionNotes: [
          'Twee meldingen: een reeks mislukte VPN-aanmeldingen en daarna één die lukt, vanaf hetzelfde adres.',
          'De VPN-log laat zien welk account lukte, vanaf welk adres, en dat er geen MFA op stond.',
          'Blokkeer het adres van de aanvaller. Niet het adres van de back-upleverancier: dat is gepland werk.',
          'Reset het overgenomen account: nieuw wachtwoord, alle sessies weg. Nu verschijnt de EDR-melding over de werkplek.',
          'Stel eerst het geheugen veilig. Het kost vijf minuten, maar de aanval op lsass komt pas om 02:26.',
          'Isoleer de werkplek. Niet uitzetten: dan was het geheugenbeeld onmogelijk geweest.',
          'Sluit af. Alles wat de aanvaller nog wilde, is gestopt.',
        ],
        debrief: `
          <h4>Wat de aanvaller deed</h4>
          <p>Hij probeerde één of twee veelgebruikte wachtwoorden op veel accounts tegelijk (<em>password spraying</em>, T1110.003). Eén
          account had een zwak wachtwoord en geen MFA, en zo kwam hij binnen via de VPN (geldig account, T1078). Daarna RDP naar de
          werkplek van dat account (T1021.001), een eigen programma in een map waar iedereen mag schrijven, en de stap naar het
          geheugen van lsass.exe om wachtwoorden van anderen te halen (T1003.001). Met die buit wilde hij naar de bestandsserver
          (T1021.002) en de gegevens naar buiten (T1041).</p>
          <h4>Wat je had kunnen zien</h4>
          <ul>
            <li>Veel mislukte aanmeldingen op verschillende accounts vanaf één adres, en daarna één die lukt.</li>
            <li>Een dagdienst-account dat midden in de nacht via de VPN en RDP actief is.</li>
            <li>Een niet-ondertekend programma in <code>C:\\Users\\Public</code> met een verbinding naar buiten in een vast ritme.</li>
          </ul>
          <h4>Wat het had gestopt</h4>
          <ul>
            <li><strong>MFA op de VPN.</strong> Dan was het geraden wachtwoord alleen niet genoeg geweest.</li>
            <li>Vergrendeling of vertraging na mislukte pogingen per bronadres, en een melding bij spraying.</li>
            <li>LSASS-bescherming (RunAsPPL, Credential Guard) en geen lokale beheerrechten voor gewone accounts.</li>
            <li>Segmentatie: een werkplek hoeft niet via SMB op elke map van de bestandsserver te kunnen.</li>
          </ul>
          <p>Verder leren: <a href="#/room/logs-detectie">Logs en detectie</a>, <a href="#/room/incident-response">Incident response</a>,
          <a href="#/room/wachtwoorden-authenticatie">Wachtwoorden en authenticatie</a>.</p>
        `,
        ask: [
          { q: 'Vanaf welk IP-adres kwam de aanval?', answer: ['{{ip}}'] },
          { q: 'Welk account was overgenomen?', answer: ['{{user}}'] },
        ],
      },
      questions: [
        { q: 'Beheers het incident. Welke vlag krijg je in de nabespreking?', answer: ['NM{nachtdienst_beheerst}'],
          hints: ['Je krijgt de vlag pas als je genoeg punten haalt en de werkplek op tijd van het netwerk hebt.', 'Kijk welk adres in de VPN-log eerst veel faalt en dan één keer lukt. Dat adres en dat account zijn de sleutel.', 'Volgorde die werkt: blokkeren, account resetten, snapshot van de werkplek, isoleren, afsluiten.'],
          explain: 'De vlag staat onder de nabespreking zodra je wint. Probeer daarna een andere variant zonder walkthrough.' },
        { q: 'Om 02:19 meldt de back-up een upload van 38 GB naar buiten. Wat doe je ermee?',
          options: ['Het adres blokkeren: 38 GB naar buiten is exfiltratie', 'Het account svc-backup uitschakelen', 'Nagaan of het gepland werk is en het met rust laten', 'De back-upserver isoleren'],
          answer: 2,
          wrong: { 0: 'Groot volume naar buiten is verdacht, maar dit is de geplande upload naar de back-upleverancier. Blokkeren breekt de back-up van vannacht af.', 1: 'Dan breekt de geplande back-up af, zonder dat er een aanwijzing was dat het account misbruikt werd.', 3: 'Er is geen aanwijzing dat de back-upserver besmet is. Je haalt een kritiek systeem offline voor niets.' },
          why: 'Een SOC verdrinkt in meldingen die niets betekenen. Kennen wat normaal is (het wijzigingsrooster, de bekende leveranciers) scheelt je dure misgrepen.',
          explain: 'Het volume valt op, maar adres, account en tijd kloppen met het rooster van de back-up. Echte exfiltratie zie je pas later, vanaf de bestandsserver naar het adres van de aanvaller.' },
      ],
    },
    {
      title: 'Taak 3 — De nabespreking',
      content: `
        <p>Lees de nabespreking onder de console. Een incident is pas klaar als je weet hoe het begon, en wat het een volgende keer
        aan het begin stopt. Dat is het verschil tussen blussen en voorkomen.</p>
        <p>In het echte werk schrijf je dit op in een incidentrapport: tijdlijn, wat je deed en waarom, wat er nog openstaat, en
        maatregelen met een eigenaar. Zie <a href="#/room/incident-response">Incident response</a> voor de fasen volgens NIST SP 800-61.</p>
      `,
      questions: [
        { q: 'Welke maatregel had deze aanval helemaal aan het begin gestopt?',
          options: ['MFA op de VPN', 'Een betere virusscanner op de werkplekken', 'Logbestanden langer bewaren', 'De VPN alleen overdag openzetten'],
          answer: 0,
          wrong: { 1: 'Een scanner had u.exe misschien gevonden, maar de aanvaller was dan al binnen met een geldig account.', 2: 'Langer bewaren helpt het onderzoek, niet het voorkomen.', 3: 'Dan kan de nachtploeg niet thuiswerken, en spraying kan net zo goed overdag.' },
          why: 'Het begin van de keten is bijna altijd het goedkoopste punt om in te grijpen. Een geraden wachtwoord zonder tweede factor is genoeg om binnen te komen.',
          explain: 'Met MFA was het geraden wachtwoord alleen niet genoeg geweest. De rest van de keten was dan nooit begonnen.' },
        { q: 'Welke ATT&CK-subtechniek hoort bij één of twee wachtwoorden proberen op veel accounts? (ID)', answer: ['T1110.003', 't1110.003'],
          hints: ['Het valt onder Brute Force, T1110.', 'Er zijn vier subtechnieken: guessing, cracking, spraying en credential stuffing.', 'Spraying is de derde.'],
          wrong: { 't1110.001': 'Dat is Password Guessing: veel wachtwoorden op één account.', 't1110.004': 'Dat is Credential Stuffing: gelekte combinaties van gebruikersnaam en wachtwoord uitproberen.', 't1110': 'Dat is de techniek; gevraagd is de subtechniek.' },
          explain: 'T1110.003 Password Spraying: weinig wachtwoorden, veel accounts, zodat geen enkel account vergrendeld raakt.' },
      ],
    },
  ],
  terms: [
    { term: 'Password spraying', def: 'Eén of twee veelgebruikte wachtwoorden proberen op veel accounts, zodat geen account vergrendeld raakt (ATT&CK T1110.003).' },
    { term: 'EDR-isolatie', def: 'Een machine van het netwerk halen via de EDR-agent, terwijl die agent zelf verbonden blijft. De aanvaller kan niets meer, het onderzoek kan door.' },
    { term: 'Vluchtig bewijs', def: 'Bewijs dat verdwijnt als de machine uitgaat: werkgeheugen, draaiende processen, open verbindingen.' },
    { term: 'LSASS', def: 'Het Windows-proces dat aanmeldingen afhandelt en daarvoor wachtwoordgegevens in het geheugen houdt. Een geliefd doelwit om wachtwoorden te stelen.' },
    { term: 'Zijwaartse beweging', def: 'Vanaf de eerste besmette machine verder het netwerk in, meestal met gestolen inloggegevens (lateral movement).' },
    { term: 'Wijzigingsrooster', def: 'Het overzicht van gepland werk, zoals back-ups en updates. Wat erin staat, is normaal; wat niet, is een vraag.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Password Spraying (T1110.003)', url: 'https://attack.mitre.org/techniques/T1110/003/' },
    { title: 'NIST SP 800-61 Rev. 3: Incident Response', url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final' },
  ],
});
