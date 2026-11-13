/* Game room: Active Directory-lite (offensief, gesimuleerd) */
CS.registerRoom({
  id: 'range-active-directory',
  path: 'gamerooms',
  order: 9,
  title: 'Active Directory-lite: één account, het hele domein',
  difficulty: 'Moeilijk',
  level: 'Expert',
  checked: '2026-11-13',
  minutes: 40,
  summary: 'Je staat als pentester binnen op het kantoornetwerk. Vind een vergeten helpdeskaccount, steel een serviceaccount dat te veel mag, en zie hoe één wachtwoord het hele domein opent.',
  objectives: [
    'Een eerste werkplek overnemen met een vergeten standaardwachtwoord',
    'Een serviceaccount vinden dat te veel rechten heeft (over-privileged service account)',
    'Zien hoe wachtwoordhergebruik één account overal laat passen',
    'Begrijpen wat tiering, LAPS en sterke serviceaccounts hadden gestopt',
  ],
  tasks: [
    {
      title: 'Taak 1 — De opdracht',
      content: `
        <p>Dit is een <strong>oefenrange</strong> op een nagebootst Windows-domein. Je bent al binnen op het kantoornetwerk (zoals
        een aanvaller na een geslaagde phishingmail), en je zoekt de weg naar de <strong>domeinbeheerder</strong>: wie dat account
        heeft, bezit het hele domein.</p>
        <p>In deze range leer je conceptueel hoe zo'n keten loopt. Je gebruikt <code>connect &lt;gebruiker&gt;@&lt;host&gt;</code> om je
        aan te melden op een host waarvan je het wachtwoord hebt gevonden (dat is hier de aanmeld-opdracht). Er wordt niets echt
        aangevallen; de stappen zijn een puzzel.</p>
        <p>Twee fouten maken deze range mogelijk, en ze komen in het echt vaak voor:</p>
        <ul>
          <li>Een <strong>serviceaccount met te veel rechten</strong>: een account voor een achtergronddienst dat per ongeluk in de
          groep Domain Admins zit. Aanvallers jagen hierop (onder meer met <em>kerberoasting</em>; hier vind je het wachtwoord al
          hersteld, zodat je je op de les kunt richten).</li>
          <li><strong>Wachtwoordhergebruik</strong>: hetzelfde wachtwoord op meer machines. Eén gestolen account past dan overal.</li>
        </ul>
        <div class="callout warn"><strong>Let op:</strong> dit mag alleen in dit lab of met schriftelijke toestemming. Ongeautoriseerd
        binnendringen is computervredebreuk (art. 138ab Sr).</div>
      `,
      questions: [
        { q: 'Een serviceaccount voor een SQL-back-up blijkt lid van Domain Admins. Waarom is dat gevaarlijk?',
          options: ['Serviceaccounts hebben geen wachtwoord', 'Als iemand dat ene account steelt, heeft hij meteen het hele domein', 'Domain Admins kunnen niet inloggen', 'Een back-up hoort nooit versleuteld te zijn'],
          answer: 1,
          wrong: { 0: 'Serviceaccounts hebben wel degelijk een wachtwoord, vaak een zwak en zelden gewijzigd.', 2: 'Domain Admins kunnen juist overal inloggen; dat is het probleem.', 3: 'Dat gaat niet over dit risico.' },
          explain: 'Een dienst heeft zelden domeinbeheer nodig. Zit het serviceaccount toch in Domain Admins, dan is dat account de sleutel tot alles.' },
      ],
    },
    {
      title: 'Taak 2 — De range',
      content: `
        <p>Lees de rules of engagement en start. Begin met <code>scan corp</code> om de machines te vinden. Er is een intranet met een
        helpdeskpagina, een werkplek, een bestandsserver en een domeincontroller. Zoek eerst een eerste account, en volg van daar de
        inloggegevens. Aanmelden doe je met <code>connect &lt;gebruiker&gt;@&lt;host&gt;</code>.</p>
      `,
      lab: {
        type: 'range',
        title: 'Rijnmond Zorg · kantoordomein nm.lab',
        role: 'Pentester met opdracht om het interne domein van Rijnmond Zorg (fictief) te testen vanaf een werkplek binnen het netwerk.',
        story: 'De klant wil weten hoe ver een aanvaller komt die al één werkplek heeft. Je begint op het kantoornetwerk en zoekt de weg naar de domeinbeheerder.',
        mandate: [
          'Alles in deze oefening is gesimuleerd. Doe dit nooit op een echt domein zonder schriftelijke toestemming.',
          'Je scope is het kantoornetwerk corp en de domeinaccounts.',
          'Werk gericht: breed en luid scannen valt op en kan buiten de afspraak vallen.',
          'Leg vast welke accounts je gebruikte, zodat de klant het kan naspelen en opschonen.',
        ],
        vars: {
          hpass: ['Welkom2019', 'Helpdesk!01', 'Start123!', 'Zorg2020'],
          spass: ['Zomer2019', 'Backup#2018', 'SqlService1', 'Winter2020'],
          ws: ['12', '18', '27', '33'],
        },
        startNet: 'corp',
        startScan: 'corp',
        maxNoise: 100,
        quietUnder: 55,
        nets: { corp: { cidr: '10.20.0.0/24', label: 'kantoornetwerk' } },
        motd: 'Oefenrange kantoordomein. Typ help. Begin met scan corp. Aanmelden: connect <gebruiker>@<host>.',
        hosts: [
          {
            name: 'intranet', ip: '10.20.0.5', net: 'corp', role: 'Intranet / helpdeskportaal',
            ports: [{ n: 80, svc: 'http', ver: 'IIS 10.0' }],
            pages: {
              '/': 'Rijnmond Zorg - intranet\nHelpdesk: /helpdesk',
              '/helpdesk': 'Veelgestelde vragen.\n- Wachtwoord vergeten? Zie de handleiding: /helpdesk/handleiding',
              '/helpdesk/handleiding': "Nieuwe medewerker aanmelden op de werkplek:\n  gebruiker: helpdesk\n  tijdelijk wachtwoord: {{hpass}}  (wijzigen bij eerste aanmelding - gebeurt bijna nooit)\n  werkplek: ws-{{ws}}",
            },
            secrets: [
              { loc: 'web:/helpdesk/handleiding', cred: { user: 'helpdesk', pass: '{{hpass}}', target: 'ws-{{ws}}', note: 'standaard helpdeskwachtwoord uit de handleiding' } },
            ],
          },
          {
            name: 'ws-{{ws}}', ip: '10.20.0.{{ws}}', net: 'corp', role: 'Werkplek (Windows 11)',
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH (Windows)' }, { n: 445, svc: 'smb', ver: 'Windows' }],
            accounts: { helpdesk: '{{hpass}}' },
            files: {
              '/home/helpdesk/user.txt': 'NM{eerste_werkplek_binnen}',
              '/opt/scripts/sql-backup.ps1': "# Dagelijkse SQL-back-up naar dc-01\n# draait onder serviceaccount:\n#   gebruiker: svc-sql\n#   wachtwoord: {{spass}}\n# svc-sql is lid van Domain Admins (moet iemand nog terugzetten)",
            },
            secrets: [
              { loc: 'file:/opt/scripts/sql-backup.ps1', cred: { user: 'svc-sql', pass: '{{spass}}', target: 'dc-01', note: 'serviceaccount, lid van Domain Admins' }, text: 'Let op: svc-sql is domeinbeheerder. Dat is veel te veel voor een back-updienst.' },
            ],
            flags: [{ id: 'user', value: 'NM{eerste_werkplek_binnen}', path: '/home/helpdesk/user.txt', root: false, points: 10 }],
          },
          {
            name: 'fs-01', ip: '10.20.0.20', net: 'corp', role: 'Bestandsserver',
            ports: [{ n: 445, svc: 'smb', ver: 'Windows' }, { n: 22, svc: 'ssh', ver: 'OpenSSH (Windows)' }],
            accounts: { 'svc-sql': '{{spass}}' },
            files: { '/share/hr/salarissen.txt': 'Vertrouwelijk - salarisoverzicht\nNM{overal_hetzelfde_wachtwoord}' },
            flags: [{ id: 'share', value: 'NM{overal_hetzelfde_wachtwoord}', path: '/share/hr/salarissen.txt', root: false, points: 10 }],
          },
          {
            name: 'dc-01', ip: '10.20.0.10', net: 'corp', role: 'Domeincontroller (nm.lab)',
            ports: [{ n: 22, svc: 'ssh', ver: 'OpenSSH (Windows)' }, { n: 389, svc: 'ldap', ver: 'Active Directory' }, { n: 445, svc: 'smb', ver: 'Windows' }],
            accounts: { 'svc-sql': '{{spass}}' },
            files: { '/domein/beheer/flag.txt': 'Domeincontroller nm.lab\nNM{domein_overgenomen}' },
            flags: [{ id: 'domein', value: 'NM{domein_overgenomen}', path: '/domein/beheer/flag.txt', root: false, points: 20 }],
          },
        ],
        objectives: [
          { text: 'Een werkplek overgenomen', found: ['shell:ws-{{ws}}'], points: 10 },
          { text: 'De gebruikersvlag op de werkplek', flags: ['user'], points: 10 },
          { text: 'Met het serviceaccount de bestandsserver geopend', flags: ['share'], points: 10 },
          { text: 'De domeincontroller overgenomen', flags: ['domein'], points: 20 },
        ],
        flag: 'NM{domein_overgenomen}',
        solution: ['scan corp', 'web intranet /helpdesk', 'web intranet /helpdesk/handleiding', 'connect helpdesk@ws-{{ws}}', 'cat /home/helpdesk/user.txt', 'cat /opt/scripts/sql-backup.ps1', 'connect svc-sql@fs-01', 'cat /share/hr/salarissen.txt', 'connect svc-sql@dc-01', 'cat /domein/beheer/flag.txt', 'done'],
        solutionNotes: [
          'Vind de machines op het kantoornetwerk.',
          'De helpdeskpagina verwijst naar een handleiding.',
          'In de handleiding staat het standaard helpdeskwachtwoord en op welke werkplek.',
          'Meld je aan op de werkplek met dat account.',
          'De eerste vlag staat in de thuismap.',
          'Een back-upscript op de werkplek bevat het wachtwoord van het serviceaccount svc-sql, en verraadt dat het domeinbeheerder is.',
          'Hetzelfde wachtwoord opent de bestandsserver: wachtwoordhergebruik.',
          'Daar staat vertrouwelijke data (en een vlag).',
          'Hetzelfde account opent de domeincontroller.',
          'De domeinvlag.',
          'Rond af.',
        ],
        debrief: `
          <h4>De keten die je liep</h4>
          <ol>
            <li>Een geldig standaardaccount van de helpdesk (ATT&CK T1078: valid accounts).</li>
            <li>Inloggegevens van een serviceaccount in een script op de werkplek (T1552.001). In het echt haal je zo'n
            serviceaccount vaak via kerberoasting (T1558.003) en kraak je het offline, juist omdat het wachtwoord zwak en oud is.</li>
            <li>Wachtwoordhergebruik waardoor datzelfde account op meerdere machines paste (T1078).</li>
            <li>Een serviceaccount dat in Domain Admins zat, dus meteen het hele domein (T1078.002).</li>
          </ol>
          <h4>Wat de beheerder had kunnen zien</h4>
          <ul>
            <li>Een helpdeskaccount dat zich op een werkplek aanmeldt, en daarna een serviceaccount dat zich op een bestandsserver en een domeincontroller aanmeldt waar het niets te zoeken heeft.</li>
            <li>Veel aanvragen voor service-tickets (kerberoasting) in de logs van de domeincontroller (gebeurtenis 4769).</li>
          </ul>
          <h4>Wat elke stap had gestopt</h4>
          <ul>
            <li>Standaardwachtwoorden afdwingen te wijzigen, en per werkplek een uniek lokaal beheerwachtwoord (LAPS).</li>
            <li>Serviceaccounts met een lang, willekeurig wachtwoord (group managed service accounts), en nooit in Domain Admins: alleen de rechten die de dienst echt nodig heeft.</li>
            <li>Tiering: beheeraccounts gescheiden per niveau, zodat een werkplek nooit een domeinbeheerder ziet. Geen wachtwoordhergebruik tussen machines.</li>
          </ul>
          <p>Verder leren: <a href="#/room/active-directory-verdedigen">Active Directory verdedigen</a>,
          <a href="#/room/iam-zero-trust">IAM en Zero Trust</a>, <a href="#/room/wachtwoorden-authenticatie">Wachtwoorden en authenticatie</a>.</p>
        `,
        ask: [
          { q: 'Welk serviceaccount gaf je de domeincontroller?', answer: ['svc-sql'] },
          { q: 'Op welke werkplek kwam je als eerste binnen? (bijv. ws-12)', answer: ['ws-{{ws}}'] },
        ],
      },
      questions: [
        { q: 'Neem het domein over. Welke domeinvlag krijg je in de nabespreking?', answer: ['NM{domein_overgenomen}'], encoded: true,
          hints: ['De domeinvlag staat op dc-01; daar kom je pas met het juiste account.', 'Zoek op de werkplek naar een script of taak die onder een serviceaccount draait.', 'Het serviceaccount svc-sql is domeinbeheerder en gebruikt overal hetzelfde wachtwoord: meld je daarmee aan op dc-01.'],
          explain: 'De domeinvlag verschijnt zodra je dc-01 opent met het serviceaccount. Probeer een andere variant zonder walkthrough.' },
        { q: 'Je kwam op de bestandsserver met hetzelfde wachtwoord als op de domeincontroller. Welke zwakte is dat?',
          options: ['Een te complex wachtwoord', 'Wachtwoordhergebruik tussen machines', 'Een verouderd SMB-protocol', 'Een open poort 389'],
          answer: 1,
          wrong: { 0: 'Complexiteit was het probleem niet; het was overal hetzelfde.', 2: 'SMB-versie speelt hier geen rol; het account paste gewoon overal.', 3: 'Poort 389 (LDAP) hoort bij een domeincontroller en is hier niet de fout.' },
          why: 'Eén gestolen account dat overal past, vergroot de schade enorm. Uniek per machine beperkt de blast radius.',
          explain: 'Hetzelfde wachtwoord op meer machines (password reuse): één gestolen account opent ze allemaal.' },
      ],
    },
    {
      title: 'Taak 3 — De nabespreking',
      content: `
        <p>Lees de nabespreking onder de console. De kracht van deze zaak zit niet in een exploit, maar in twee beheerfouten die je
        in heel veel organisaties vindt: een serviceaccount met te veel rechten, en wachtwoordhergebruik.</p>
        <p>De verdedigende kant staat uitgewerkt in <a href="#/room/active-directory-verdedigen">Active Directory verdedigen</a>: hoe je
        kerberoasting en dit soort aanmeldingen herkent in de logs en wat je dichtzet.</p>
      `,
      questions: [
        { q: 'Wat had deze keten het grondigst gestopt?',
          options: ['De domeincontroller achter een firewall', 'Serviceaccounts met een sterk, uniek wachtwoord en zonder domeinbeheer, plus tiering', 'Een langer wachtwoord voor de helpdesk', 'De bestandsserver uitschakelen'],
          answer: 1,
          wrong: { 0: 'De aanvaller zat al binnen op het kantoornetwerk; een firewall aan de rand helpt dan niet.', 2: 'Dat vertraagt alleen de eerste stap; de echte schade kwam van het serviceaccount.', 3: 'Dan werkt de bestandsserver niet meer, en het domein was nog steeds te nemen.' },
          why: 'De grootste hefboom in de keten was het over-privileged serviceaccount met een hergebruikt wachtwoord. Dat wegnemen breekt de keten op het duurste punt voor de aanvaller.',
          explain: 'Sterke, unieke serviceaccountwachtwoorden, geen onnodig domeinbeheer, en tiering nemen de hefboom weg waarmee één account het hele domein opende.' },
        { q: 'Welke ATT&CK-techniek beschrijft het stelen van een serviceaccount via zijn Kerberos-service-tickets? (ID)', answer: ['T1558.003', 't1558.003'],
          hints: ['Het valt onder Steal or Forge Kerberos Tickets, T1558.', 'De subtechniek heet Kerberoasting.', 'Het is T1558 punt nul nul drie.'],
          wrong: { 't1558': 'Dat is de techniek; gevraagd is de subtechniek Kerberoasting.', 't1078': 'Dat is Valid Accounts: het gebruiken van een account, niet het stelen van het ticket.' },
          explain: 'T1558.003 Kerberoasting: service-tickets opvragen en offline kraken, juist bij serviceaccounts met een zwak wachtwoord.' },
      ],
    },
  ],
  terms: [
    { term: 'Active Directory', def: 'De centrale gebruikers- en rechtenadministratie van een Windows-netwerk, beheerd door een domeincontroller.' },
    { term: 'Domeinbeheerder (Domain Admin)', def: 'Een account dat het hele domein beheert. Wie dit heeft, bezit vrijwel alles.' },
    { term: 'Serviceaccount', def: 'Een account waaronder een achtergronddienst draait. Vaak met een zwak, zelden gewijzigd wachtwoord.' },
    { term: 'Kerberoasting', def: 'Service-tickets van serviceaccounts opvragen en offline kraken (ATT&CK T1558.003). Werkt vooral bij zwakke wachtwoorden.' },
    { term: 'Tiering', def: 'Beheeraccounts scheiden per niveau, zodat een werkplek nooit inloggegevens van een domeinbeheerder ziet.' },
    { term: 'LAPS', def: 'Windows Local Administrator Password Solution: per machine een uniek, automatisch beheerd lokaal beheerwachtwoord.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Kerberoasting (T1558.003)', url: 'https://attack.mitre.org/techniques/T1558/003/' },
    { title: 'Microsoft: beveiligen van Active Directory (tiering, gelaagd beheer)', url: 'https://learn.microsoft.com/security/' },
  ],
});
