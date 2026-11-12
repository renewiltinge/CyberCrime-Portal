/* Uitdaging ★★★: De zijwaartse stap (zonder handleiding) */

// Alles FICTIEF: Veldman & Ko, de accounts, de hosts en de adressen zijn verzonnen.
// Let op bij het nalopen: in de nacht van 24 op 25 oktober 2026 gaat om 01:00 UTC de klok in Nederland van 03:00 terug naar 02:00.
CS.registerRoom({
  id: 'uitdaging-zijwaartse-stap',
  path: 'uitdagingen',
  order: 6,
  title: '★★★ De zijwaartse stap',
  icon: '🪟',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-12',
  minutes: 60,
  summary: 'Een accountantskantoor vindt op maandag een onbekende dienst op een server. Het SIEM heeft alles gezien, in UTC. Hoe kwam de aanvaller binnen, waar ging hij heen, en hoe laat was dat echt in Nederland? Geen stappenplan.',
  objectives: [
    'In Windows-beveiligingslogs een brute-force-aanval en de geslaagde aanmelding daarna herkennen',
    'Laterale beweging volgen via expliciete inloggegevens, een netwerkaanmelding en een nieuwe service',
    'Tijden correct van UTC naar Nederlandse tijd omrekenen, ook in de nacht dat de klok verzet wordt',
  ],
  terms: [
    { term: '4624 en 4625', def: 'Windows-gebeurtenissen voor een geslaagde en een mislukte aanmelding. SubStatus 0xC000006A betekent een fout wachtwoord, 0xC0000064 een onbekende gebruiker.' },
    { term: 'LogonType', def: 'Hoe iemand zich aanmeldde: 3 is via het netwerk (bijvoorbeeld een share), 10 is via Remote Desktop, 5 is een service.' },
    { term: '4648', def: 'Een aanmelding met expliciete inloggegevens: een ingelogde gebruiker gebruikt het wachtwoord van een ander account, bijvoorbeeld met runas of PsExec.' },
    { term: 'Laterale beweging', def: 'Vanaf een eerste overgenomen systeem doorstappen naar andere systemen in hetzelfde netwerk (ATT&CK-tactiek TA0008).' },
    { term: 'Zomertijd en wintertijd', def: 'Nederland is in de zomer UTC+2 en in de winter UTC+1. De klok gaat op de laatste zondag van oktober om 01:00 UTC terug.' },
  ],
  resources: [
    { title: 'Microsoft Learn: 4624(S) An account was successfully logged on', url: 'https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624' },
    { title: 'MITRE ATT&CK: Remote Services (T1021)', url: 'https://attack.mitre.org/techniques/T1021/' },
  ],
  tasks: [
    {
      title: 'Bewijs 1: de export van het SIEM',
      content: `
        <p>Op maandag 26 oktober ziet de systeembeheerder van Accountantskantoor Veldman &amp; Ko (fictief) een onbekende dienst op
        een van de servers. De terminalserver van het kantoor is van buitenaf bereikbaar via Remote Desktop. Het SIEM heeft de
        beveiligingslogs van het weekend bewaard.</p>
        <p>Zoek uit hoe de aanvaller binnenkwam en waar hij daarna heen ging. Er is geen stappenplan.</p>
      `,
      lab: { type: 'logs', title: 'siem-export-security-2026-10-24_25.log', lines: "# Export SIEM Veldman & Ko: Security-log van DC01, RDS01, FS01 en werkplekken. Tijden in UTC.\n# DC01 10.20.0.10 \u00b7 RDS01 10.20.0.15 (extern bereikbaar via RDP) \u00b7 FS01 10.20.0.21 \u00b7 WS-0xx 10.20.1.x\n2026-10-24T16:58:20Z  RDS01  4624  LogonType=10 TargetUser=j.veldman SourceIp=192.0.2.60\n2026-10-24T17:41:03Z  RDS01  4634  LogonType=10 TargetUser=j.veldman\n2026-10-24T22:00:01Z  DC01   4624  LogonType=5 TargetUser=svc-backup\n2026-10-24T22:00:02Z  FS01   4624  LogonType=3 TargetUser=svc-backup SourceIp=10.20.0.10\n2026-10-24T23:58:14Z  RDS01  4625  LogonType=3 TargetUser=admin SourceIp=198.51.100.9 SubStatus=0xC0000064\n2026-10-24T23:58:16Z  RDS01  4625  LogonType=3 TargetUser=admin SourceIp=198.51.100.9 SubStatus=0xC0000064\n2026-10-24T23:58:19Z  RDS01  4625  LogonType=3 TargetUser=test SourceIp=198.51.100.9 SubStatus=0xC0000064\n2026-10-25T00:31:05Z  RDS01  4625  LogonType=3 TargetUser=administrator SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:31:07Z  RDS01  4625  LogonType=3 TargetUser=admin SourceIp=203.0.113.45 SubStatus=0xC0000064\n2026-10-25T00:31:09Z  RDS01  4625  LogonType=3 TargetUser=scanner SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:31:11Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:31:13Z  RDS01  4625  LogonType=3 TargetUser=stagiair SourceIp=203.0.113.45 SubStatus=0xC0000064\n2026-10-25T00:32:40Z  RDS01  4625  LogonType=3 TargetUser=administrator SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:32:42Z  RDS01  4625  LogonType=3 TargetUser=scanner SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:32:44Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:33:10Z  RDS01  4740  TargetUser=administrator (account vergrendeld)\n2026-10-25T00:35:02Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:36:48Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:38:31Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:40:15Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:41:57Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:43:40Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:45:22Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:46:58Z  RDS01  4625  LogonType=3 TargetUser=receptie SourceIp=203.0.113.45 SubStatus=0xC000006A\n2026-10-25T00:47:12Z  RDS01  4624  LogonType=10 TargetUser=receptie SourceIp=203.0.113.45\n2026-10-25T00:49:30Z  RDS01  4688  User=receptie Process=C:\\Windows\\System32\\cmd.exe\n2026-10-25T00:50:02Z  RDS01  4688  User=receptie Process=C:\\Windows\\System32\\net.exe CommandLine=\"net group \"Domain Admins\" /domain\"\n2026-10-25T00:53:02Z  RDS01  4688  User=receptie Process=C:\\Windows\\System32\\notepad.exe CommandLine=\"notepad C:\\Users\\Public\\Documents\\beheer-wachtwoorden.txt\"\n2026-10-25T00:55:41Z  WS-014 4624  LogonType=7 TargetUser=m.kaya\n2026-10-25T01:14:02Z  RDS01  4648  SubjectUser=receptie TargetUser=adm.jbakker TargetServer=FS01\n2026-10-25T01:14:05Z  DC01   4768  TargetUser=adm.jbakker ClientIp=10.20.0.15 (Kerberos-ticket aangevraagd)\n2026-10-25T01:14:09Z  FS01   4624  LogonType=3 TargetUser=adm.jbakker SourceIp=10.20.0.15\n2026-10-25T01:14:09Z  FS01   4672  TargetUser=adm.jbakker (speciale rechten toegekend)\n2026-10-25T01:14:11Z  FS01   7045  ServiceName=PSEXESVC ImagePath=%SystemRoot%\\PSEXESVC.exe\n2026-10-25T01:16:40Z  FS01   5140  User=adm.jbakker Share=\\\\*\\Klanten SourceIp=10.20.0.15\n2026-10-25T02:00:01Z  DC01   4624  LogonType=5 TargetUser=svc-backup\n2026-10-25T02:00:02Z  FS01   4624  LogonType=3 TargetUser=svc-backup SourceIp=10.20.0.10\n" },
      questions: [
        { q: 'Welk account nam de aanvaller als eerste over?',
          answer: ['receptie'],
          hints: ['Kijk waar de reeks mislukte aanmeldingen ophoudt.',
                  'Filter op 4624 en zoek de geslaagde aanmelding die van buiten het netwerk komt.',
                  'Het is een gedeeld account dat bij de balie hoort.'],
          wrong: { 'administrator': 'Daar werd op geprobeerd, maar elke poging mislukte en het account werd vergrendeld (4740).',
                   '/^adm\\./': 'Dat account komt pas later in beeld. Gevraagd is het account waarmee de aanvaller binnenkwam.',
                   'admin': 'Dat account bestaat niet eens: SubStatus 0xC0000064 betekent een onbekende gebruiker.' },
          explain: 'Na een rondje wachtwoordraden op vijf namen richtte 203.0.113.45 zich op receptie. Na tien mislukte pogingen volgde om 00:47:12 UTC een 4624 met LogonType 10 (Remote Desktop).',
          why: 'Een gedeeld account zonder MFA op een server die vanaf internet bereikbaar is, is een open deur. Een vergrendeling na een paar pogingen had hier tijd gekocht.' },
        { q: 'Op welke host meldde de aanvaller zich daarna aan met een ander account?',
          answer: ['FS01', '10.20.0.21'],
          hints: ['Wie eenmaal binnen is, zoekt een account met meer rechten en een volgende machine.',
                  'Zoek naar aanmeldingen waarvan de bron het interne adres van de terminalserver is.',
                  'Een netwerkaanmelding vanaf 10.20.0.15, twee seconden later gevolgd door een nieuwe service.'],
          wrong: { 'dc01': 'Op DC01 staat alleen het aanvragen van een Kerberos-ticket (4768). Zo werkt aanmelden in een domein: de aanmelding zelf (4624) staat op de host waar de aanvaller naartoe ging.',
                   'rds01': 'Daar kwam de aanvaller binnen. Gevraagd is de volgende host.',
                   'ws-014': 'Dat is een gewone aanmelding van een medewerker op haar eigen werkplek (LogonType 7: scherm ontgrendeld).' },
          explain: 'Om 01:14:09 UTC staat op FS01 een 4624 (LogonType 3) vanaf 10.20.0.15, het adres van RDS01, gevolgd door 4672 (beheerrechten) en 7045: de service PSEXESVC, het spoor van PsExec.' },
        { q: 'Met welk account meldde hij zich daar aan?',
          answer: ['adm.jbakker'],
          hints: ['Niet het account waarmee hij binnenkwam.',
                  'Op de terminalserver staat een gebeurtenis waarin het ene account de inloggegevens van een ander gebruikt. Kijk ook wat hij kort daarvoor opende.',
                  'Een beheeraccount; de naam begint met adm.'],
          wrong: { 'receptie': 'Met dat account kwam hij op de terminalserver. Op de tweede host gebruikte hij de gegevens van iemand anders (zie 4648).' },
          explain: 'Om 00:53 opende receptie het bestand beheer-wachtwoorden.txt in een openbare map. Om 01:14:02 volgt 4648: receptie gebruikt de inloggegevens van adm.jbakker voor FS01.',
          why: 'Wachtwoorden van beheerders in een tekstbestand maken van één zwak account een domeinbrede inbraak. Beheeraccounts horen alleen te werken vanaf beheerwerkplekken.' },
      ],
    },
    {
      title: 'Bewijs 2: de tijdlijn voor de directie',
      content: `
        <p>De directie wil de tijdlijn in Nederlandse tijd. Een collega heeft de tijden uit het SIEM alvast omgerekend: "UTC plus
        twee, want het is nog zomertijd." Controleer dat voordat het rapport de deur uitgaat.</p>
      `,
      lab: { type: 'timestamp', value: '2026-10-25T00:31:05Z' },
      questions: [
        { q: 'Hoe laat was het in Nederland toen de aanvaller binnenkwam op de terminalserver? (UU:MM:SS)',
          answer: ['02:47:12', '2:47:12'],
          hints: ['Neem de tijd van de geslaagde aanmelding uit bewijs 1, niet die van de eerste poging.',
                  'Zet de volledige tijd mét de Z erachter in de omrekenaar en lees de regel voor Nederland.',
                  'Om 00:47 UTC gold nog zomertijd.'],
          wrong: { '00:47:12': 'Dat is UTC. Gevraagd is de Nederlandse tijd.',
                   '01:47:12': 'Je rekende met wintertijd (UTC+1). Om 00:47 UTC was de klok nog niet verzet: het was zomertijd, UTC+2.',
                   '/^0?2:31/': 'Dat is de eerste mislukte poging. Gevraagd is de geslaagde aanmelding.' },
          explain: '00:47:12 UTC is 02:47:12 zomertijd (UTC+2). Hier had de collega nog gelijk.' },
        { q: 'Hoe laat was het in Nederland toen de aanvaller zich op de tweede host aanmeldde? (UU:MM:SS)',
          answer: ['02:14:09', '2:14:09'],
          boss: true,
          hints: ['Rekenen met een vaste verschuiving gaat deze nacht één keer mis.',
                  'Gebruik de aanmelding op de tweede host uit bewijs 1 en laat de omrekenaar het werk doen. Vergelijk met de vorige vraag.',
                  'Om 01:00 UTC ging de klok van 03:00 terug naar 02:00. Daarna is het UTC+1.'],
          wrong: { '03:14:09': 'Zo rekende de collega: UTC plus twee. Maar om 01:00 UTC ging die nacht de klok terug en gold wintertijd, UTC+1.',
                   '01:14:09': 'Dat is UTC. Gevraagd is de Nederlandse tijd.',
                   '/^0?2:4/': 'Dat is de aanmelding op de terminalserver. Gevraagd is de tweede host.' },
          explain: '01:14:09 UTC valt na de klokwissel van 01:00 UTC, dus wintertijd: 02:14:09. In Nederlandse tijd lijkt de stap naar FS01 (02:14) dus 33 minuten vóór de inbraak (02:47) te gebeuren, terwijl hij er in werkelijkheid 26 minuten en 57 seconden na kwam.',
          why: 'Gemengde of verkeerd omgerekende tijden maken een tijdlijn onlogisch en kunnen een verdediging in de rechtszaal helpen. Werk intern altijd in UTC en reken pas in het eindrapport om, met de juiste regel per moment.' },
      ],
    },
  ],
});
