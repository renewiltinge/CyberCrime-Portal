/* Game room: Zes uur, de eerste bestanden zijn op slot (verdedigen onder druk) */
CS.registerRoom({
  id: 'game-ransomware-zes-uur',
  path: 'gamerooms',
  order: 3,
  title: 'Zes uur: de bestanden gaan op slot',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-12',
  minutes: 40,
  summary: 'Op de bestandsserver krijgen bestanden een nieuwe extensie, in een hoog tempo. Vind de bron, stop de versleuteling, red de back-up en zet terug in de goede volgorde.',
  objectives: [
    'Patient zero van een ransomware-aanval vinden in meldingen en processen',
    'Containment in de juiste volgorde: bron, account, back-up',
    'Begrijpen waarom je pas terugzet als de bron dicht is',
    'Uitleggen waarom offline back-ups en een apart beheeraccount het verschil maken',
  ],
  tasks: [
    {
      title: 'Taak 1 — Voor je begint',
      content: `
        <p>Bij ransomware gaat het om minuten. De versleuteling draait vaak niet op de server zelf, maar op één werkplek die via
        het netwerk (SMB) de bestanden op de server overschrijft. Die werkplek heet <em>patient zero</em>. Haal je alleen de server
        van het netwerk, dan stopt het daar, maar gaat het elders door.</p>
        <p>Moderne ransomwaregroepen proberen ook de back-ups te wissen voordat ze versleutelen (ATT&amp;CK T1490, <em>Inhibit System
        Recovery</em>). Daarvoor gebruiken ze een beheeraccount. Wie dat account stillegt, of de back-upserver op tijd afschermt,
        houdt een herstelpunt over.</p>
      `,
      questions: [
        { q: 'Op de bestandsserver worden bestanden versleuteld door de gebruiker adm-x vanaf werkplek ws-31. Wat stopt de versleuteling het snelst bij de bron?',
          options: ['De bestandsserver uitzetten', 'Werkplek ws-31 isoleren', 'Het losgeld betalen', 'Alle werkplekken uitzetten'],
          answer: 1,
          wrong: { 0: 'Dan stopt het op die server, maar ws-31 zoekt verder naar andere shares. En je verliest vluchtig bewijs.', 2: 'Betalen stopt niets wat al loopt, en garandeert geen sleutel.', 3: 'Dat stopt het ook, maar je legt het hele bedrijf stil voor één bron die je al kent.' },
          explain: 'Isoleer de bron. Daarna het account dat gebruikt wordt, want daarmee kan de aanvaller van elke andere machine verder.' },
      ],
    },
    {
      title: 'Taak 2 — De ochtend',
      content: `
        <p>Lees het mandaat en begin. Er is een offline back-up van vannacht. <code>restore</code> kost tien minuten.
        Zet je terug terwijl de bron nog actief is, dan gaat het herstelde ook weer op slot.</p>
      `,
      lab: {
        type: 'incident',
        title: 'Drukkerij Westhaven BV · vroege dienst',
        role: 'Systeembeheerder met de vroege dienst bij Drukkerij Westhaven BV (fictief), met mandaat om systemen te isoleren, accounts uit te schakelen en terug te zetten uit de back-up.',
        story: 'Om 05:49 belt de nachtploeg: orderbestanden openen niet meer en hebben de extensie .lck. Om 06:00 begint de eerste ploeg en moet de pers draaien.',
        mandate: [
          'Alles gebeurt in deze simulatie. Doe dit nooit op systemen waarvoor je geen opdracht en toestemming hebt.',
          'Je mag systemen isoleren, accounts uitschakelen, processen stoppen en terugzetten uit de offline back-up.',
          'Over betalen beslist de directie, niet de beheerder. Je legt alleen vast wat de afperser vraagt.',
          'Het ERP stuurt de pers aan: haal het alleen offline met een duidelijke reden.',
        ],
        vars: {
          ws: ['ws-31', 'ws-38', 'ws-44', 'ws-52'],
          adm: ['adm-pvd', 'adm-jk', 'adm-rb'],
          pid: ['3388', '4170', '5562'],
          ip: ['203.0.113.66', '198.51.100.140', '192.0.2.33'],
        },
        start: '05:52',
        deadline: 60,
        maxDamage: 60,
        motd: 'Vroege dienst Drukkerij Westhaven. Typ help, en begin met alerts.',
        hosts: [
          { name: 'dc-01', ip: '10.1.0.10', role: 'Domeincontroller', critical: true },
          { name: 'fs-01', ip: '10.1.0.20', role: 'Bestandsserver (orders)', critical: true, compromised: true },
          { name: 'fs-02', ip: '10.1.0.21', role: 'Bestandsserver (ontwerp)', critical: true, compromisedBy: 'fs02' },
          { name: 'erp-01', ip: '10.1.0.40', role: 'ERP en aansturing van de pers', critical: true },
          { name: 'bak-01', ip: '10.1.0.30', role: 'Back-upserver (online kopieën)', critical: true, safeToIsolate: true },
          { name: '{{ws}}', ip: '10.1.2.17', role: 'Werkplek receptie', compromised: true },
        ],
        accounts: [
          { name: '{{adm}}', role: 'Domeinbeheerder', critical: true, compromised: true },
          { name: 'svc-erp', role: 'Serviceaccount van het ERP', critical: true, lockText: 'svc-erp stuurt de pers aan; de eerste ploeg kan niet beginnen.' },
          { name: 'receptie', role: 'Gedeeld account receptie' },
        ],
        restore: ['fs-01', 'fs-02'],
        rules: [
          { on: 'restore:fs-01', unless: ['isolate:{{ws}}', 'kill:{{ws}}:{{pid}}'], points: 20, text: 'Je zette fs-01 terug terwijl {{ws}} nog versleutelde. Tien minuten herstelwerk gaat direct weer op slot.' },
          { on: 'restore:fs-02', unless: ['isolate:{{ws}}', 'kill:{{ws}}:{{pid}}'], points: 20, text: 'Je zette fs-02 terug terwijl {{ws}} nog versleutelde.' },
        ],
        alerts: [
          { t: -3, text: 'fs-01: 1.240 bestanden hernoemd naar *.lck in 3 minuten, gebruiker {{adm}}, bron {{ws}}' },
          { t: 0, text: 'fs-01: LEESMIJ-HERSTEL.txt verschijnt in elke map' },
          { t: 2, text: 'EDR {{ws}}: svch0st.exe (pid {{pid}}) opent duizenden bestanden op \\\\fs-01', unless: ['isolate:{{ws}}', 'kill:{{ws}}:{{pid}}'] },
          { t: 9, text: 'fs-02: bestanden hernoemd naar *.lck, gebruiker {{adm}}', after: 'fs02' },
          { t: 16, text: 'bak-01: alle online kopieën verwijderd door {{adm}}', after: 'backup' },
        ],
        logs: {
          'fs-01': [
            { t: -4, line: 'SMB sessie {{adm}} vanaf {{ws}} (10.1.2.17)' },
            { t: -3, line: '4663 schrijven en hernoemen door {{adm}}: \\\\orders\\2026\\*.pdf -> *.pdf.lck (1.240 bestanden)' },
            { t: 0, line: 'nieuw bestand LEESMIJ-HERSTEL.txt in 214 mappen' },
          ],
          '{{ws}}': [
            { t: -40, line: 'Security 4624 aanmelding {{adm}} type 10 (RDP) bron=10.1.2.99' },
            { t: -38, line: 'Sysmon 1 proces svch0st.exe pid={{pid}} vanuit C:\\ProgramData\\ (niet ondertekend)' },
            { t: -12, line: 'Sysmon 1 vssadmin.exe delete shadows /all /quiet door {{adm}}' },
            { t: -5, line: 'Sysmon 3 svch0st.exe -> {{ip}}:443' },
          ],
          'bak-01': [
            { t: -300, line: 'back-up voltooid: fs-01, fs-02, erp-01 (online kopie en offline tape)' },
            { t: 15, line: 'aanmelding {{adm}}: verwijder alle herstelpunten', after: 'backup' },
          ],
          firewall: [
            { t: -30, line: 'ALLOW 10.1.2.17 -> {{ip}}:443 bytes_out=4kB' },
            { t: -5, line: 'ALLOW 10.1.2.17 -> {{ip}}:443 bytes_out=2kB' },
            { t: 5, line: 'ALLOW 10.1.2.17 -> {{ip}}:443 bytes_out=2kB', unless: ['isolate:{{ws}}', 'block:{{ip}}'] },
          ],
          leesmij: [
            { t: 0, line: 'Uw bestanden zijn versleuteld. Neem binnen 72 uur contact op via het portaal in de bijlage. Niet zelf herstellen.' },
          ],
        },
        procs: {
          '{{ws}}': [
            { pid: '640', name: 'lsass.exe', user: 'SYSTEM', critical: true, killText: 'lsass.exe stoppen laat Windows herstarten; het werkgeheugen is weg.' },
            { pid: '2210', name: 'explorer.exe', user: 'receptie' },
            { pid: '{{pid}}', name: 'svch0st.exe', user: '{{adm}}', note: 'C:\\ProgramData\\svch0st.exe, met een nul in plaats van een o' },
          ],
          'erp-01': [
            { pid: '1450', name: 'erpserver.exe', user: 'svc-erp', critical: true, killText: 'erpserver.exe stuurt de pers aan. De eerste ploeg kan niet beginnen.' },
          ],
        },
        threats: [
          { id: 'fs02', at: 8, label: 'Versleuteling springt naar de tweede bestandsserver (T1486)', text: 'De versleuteling gaat verder op fs-02: alle ontwerpbestanden gaan op slot.', stoppedBy: ['isolate:{{ws}}', 'kill:{{ws}}:{{pid}}', 'disable:{{adm}}', 'reset:{{adm}}'], damage: 20 },
          { id: 'backup', at: 15, label: 'Online back-ups wissen (T1490)', text: 'Met {{adm}} worden alle online kopieën op bak-01 verwijderd.', stoppedBy: ['disable:{{adm}}', 'reset:{{adm}}', 'isolate:bak-01'], damage: 20 },
          { id: 'fs01', at: 25, label: 'Bestandsserver orders volledig versleuteld (T1486)', text: 'fs-01 is helemaal versleuteld.', stoppedBy: ['isolate:{{ws}}', 'kill:{{ws}}:{{pid}}', 'isolate:fs-01'], damage: 15 },
        ],
        objectives: [
          { text: 'Patient zero van het netwerk, vóór 06:00', any: ['isolate:{{ws}}'], before: 8, points: 10, required: true },
          { text: 'Het misbruikte beheeraccount uitgeschakeld of gereset, vóór 06:07', any: ['disable:{{adm}}', 'reset:{{adm}}'], before: 15, points: 10 },
          { text: 'Geheugen en schijf van patient zero veiliggesteld', all: ['snapshot:{{ws}}'], points: 10 },
          { text: 'Het commandokanaal van de aanvaller geblokkeerd', all: ['block:{{ip}}'], points: 5 },
          { text: 'fs-01 teruggezet uit de offline back-up', all: ['restore:fs-01'], points: 10 },
        ],
        pass: 33,
        flag: 'NM{ransomware_gestopt}',
        solution: ['alerts', 'ps {{ws}}', 'isolate {{ws}}', 'disable {{adm}}', 'snapshot {{ws}}', 'logs firewall', 'block {{ip}}', 'restore fs-01', 'report'],
        solutionNotes: [
          'De eerste melding noemt het account en de bron: de werkplek die via het netwerk versleutelt.',
          'Op die werkplek draait svch0st.exe (met een nul), uit ProgramData, onder het beheeraccount.',
          'Isoleer de werkplek: de versleuteling stopt, en de EDR blijft verbonden voor onderzoek.',
          'Schakel het beheeraccount uit. Het is misbruikt, dus dit is geen misgreep; het beschermt ook de back-ups.',
          'Stel het geheugen veilig: de sleutel van de versleuteling kan nog in het geheugen staan.',
          'De firewall laat zien waar de werkplek mee praatte.',
          'Blokkeer dat adres.',
          'Pas nu terugzetten: de bron is dicht.',
          'Sluit af. Betalen is niet nodig: er is een schone kopie.',
        ],
        debrief: `
          <h4>Wat de aanvaller deed</h4>
          <p>Hij had al een domeinbeheeraccount (T1078.002) en meldde zich daarmee via RDP aan op een werkplek (T1021.001). Daar zette
          hij een programma neer met een naam die op een Windows-proces lijkt (T1036.005), wiste de schaduwkopieën (T1490) en
          versleutelde via SMB de bestanden op de servers (T1486). Daarna wilde hij met hetzelfde account de online back-ups weghalen.</p>
          <h4>Wat je had kunnen zien</h4>
          <ul>
            <li><code>vssadmin delete shadows</code> veertig minuten vóór de versleuteling: een van de duidelijkste voortekens.</li>
            <li>Een domeinbeheerder die zich met RDP op een receptiewerkplek aanmeldt.</li>
            <li>Een niet-ondertekend programma in <code>C:\\ProgramData</code> met een naam die bijna klopt.</li>
          </ul>
          <h4>Wat het had gestopt</h4>
          <ul>
            <li><strong>Gescheiden beheeraccounts</strong> (tiering): een domeinbeheerder meldt zich nooit aan op een werkplek.</li>
            <li><strong>Offline of onveranderbare back-ups</strong>: wat de aanvaller niet kan bereiken, kan hij niet wissen. Hier redde de tape je.</li>
            <li>Een detectieregel op het wissen van schaduwkopieën, met automatische isolatie.</li>
          </ul>
          <p>Verder leren: <a href="#/room/ransomware-respons">Ransomware: incident en onderhandeling</a>,
          <a href="#/room/incident-response">Incident response</a>, <a href="#/room/windows-basis">Windows en Active Directory</a>.</p>
        `,
        ask: [
          { q: 'Welke werkplek was patient zero?', answer: ['{{ws}}'] },
          { q: 'Welk account gebruikte de aanvaller?', answer: ['{{adm}}'] },
        ],
      },
      questions: [
        { q: 'Stop de aanval en zet terug. Welke vlag krijg je in de nabespreking?', answer: ['NM{ransomware_gestopt}'],
          hints: ['De vlag komt pas als patient zero vóór 06:00 van het netwerk is.', 'De eerste melding noemt de bron van de versleuteling. Kijk daar naar de processen.', 'Volgorde: bron isoleren, beheeraccount uit, geheugen veiligstellen, blokkeren, en pas dan terugzetten.'],
          explain: 'Speel ook een variant waarin je eerst terugzet: dan zie je waarom de volgorde ertoe doet.' },
        { q: 'Waarom zet je pas terug als patient zero geïsoleerd is?',
          options: ['Omdat terugzetten dan sneller gaat', 'Omdat de bron anders ook de herstelde bestanden weer versleutelt', 'Omdat de back-up anders niet start', 'Omdat de verzekeraar dat eist'],
          answer: 1,
          wrong: { 0: 'De snelheid hangt af van de back-up, niet van de werkplek.', 2: 'Technisch kan het wel; het herstelde gaat alleen direct weer op slot.', 3: 'Kan in een polis staan, maar de echte reden is technisch.' },
          why: 'Herstellen voor de bron dicht is, kost uren en een schone kopie die je misschien maar één keer hebt.',
          explain: 'Eerst insluiten (containment), dan uitroeien, dan herstellen. Die volgorde staat ook in NIST SP 800-61.' },
      ],
    },
  ],
  terms: [
    { term: 'Patient zero', def: 'De eerste besmette machine; bij ransomware vaak de machine die via het netwerk de servers versleutelt.' },
    { term: 'Schaduwkopieën', def: 'Herstelpunten van Windows (Volume Shadow Copies). Aanvallers wissen ze vóór het versleutelen.' },
    { term: 'Offline back-up', def: 'Een kopie die niet via het netwerk bereikbaar is, zoals een tape in een kluis. Een aanvaller kan hem niet wissen.' },
    { term: 'Tiering', def: 'Beheeraccounts scheiden per niveau: een domeinbeheerder meldt zich alleen aan op domeincontrollers, nooit op een werkplek.' },
    { term: 'Containment', def: 'De fase waarin je de schade beperkt: isoleren, blokkeren, accounts uitschakelen. Vóór uitroeien en herstellen.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Inhibit System Recovery (T1490)', url: 'https://attack.mitre.org/techniques/T1490/' },
    { title: 'No More Ransom', url: 'https://www.nomoreransom.org/' },
  ],
});
