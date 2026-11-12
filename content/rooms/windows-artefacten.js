/* Room: Forensische Windows-artefacten */

// Taak 5: Security/System-eventlog (UTC) voor het logs-lab (brute force -> login -> nieuw account -> nieuwe service).
// De vlag NM{sporen_in_de_eventlog} zit in het pad van een 4688-proces. 12 mislukte aanmeldingen, waarvan één
// op een account dat niet bestaat (SubStatus 0xC0000064).
const WINART_LOG = `2026-10-01 22:14:03  Security  EventID=4624  Geslaagde aanmelding   Account=rene      Bron-IP=192.0.2.21  LogonType=2   (console)
2026-10-01 23:02:55  Security  EventID=4634  Afmelding              Account=rene      LogonType=2
2026-10-02 02:57:58  Security  EventID=4625  MISLUKTE aanmelding    Account=Administrator  Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:57:59  Security  EventID=4625  MISLUKTE aanmelding    Account=admin          Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC0000064
2026-10-02 02:58:00  Security  EventID=4625  MISLUKTE aanmelding    Account=Administrator  Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:02  Security  EventID=4625  MISLUKTE aanmelding    Account=Administrator  Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:05  Security  EventID=4625  MISLUKTE aanmelding    Account=administrator  Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:07  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:10  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:12  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:15  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:18  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:21  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 02:58:24  Security  EventID=4625  MISLUKTE aanmelding    Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   Status=0xC000006D  SubStatus=0xC000006A
2026-10-02 03:01:42  Security  EventID=4624  Geslaagde aanmelding   Account=beheerder      Bron-IP=203.0.113.66  LogonType=3   (netwerk)
2026-10-02 03:01:44  Security  EventID=4672  Speciale rechten toegekend  Account=beheerder   Rechten=SeDebugPrivilege,SeBackupPrivilege
2026-10-02 03:02:07  Security  EventID=4720  Gebruikersaccount AANGEMAAKT  NieuwAccount=hulpje  Door=beheerder
2026-10-02 03:02:09  Security  EventID=4732  Lid toegevoegd aan groep  Groep=Administrators  Account=hulpje  Door=beheerder
2026-10-02 03:03:20  Security  EventID=4688  Nieuw proces aangemaakt   Proces=C:\\Users\\Public\\svc\\NM{sporen_in_de_eventlog}.exe  Account=hulpje
2026-10-02 03:03:55  System    EventID=7045  Nieuwe SERVICE geïnstalleerd  Service=SvcUpdater  Pad=C:\\Users\\Public\\svc\\updater.exe  Type=own process  Start=auto
2026-10-02 03:04:10  Security  EventID=4688  Nieuw proces aangemaakt   Proces=C:\\Windows\\System32\\cmd.exe  Account=hulpje
2026-10-02 03:05:33  Security  EventID=1102  Beveiligingslogboek GEWIST  Door=hulpje
2026-10-02 07:45:10  Security  EventID=4624  Geslaagde aanmelding   Account=rene      Bron-IP=192.0.2.21  LogonType=2   (console)
2026-10-02 08:12:40  Security  EventID=4624  Geslaagde aanmelding   Account=fatima    Bron-IP=192.0.2.24  LogonType=2   (console)
2026-10-02 09:03:18  Security  EventID=4634  Afmelding              Account=fatima    LogonType=2
2026-10-02 09:20:01  Security  EventID=4688  Nieuw proces aangemaakt   Proces=C:\\Program Files\\Firefox\\firefox.exe  Account=rene`;

// Taak 2: UserAssist-waardenamen van gebruiker rene, zoals ze in NTUSER.DAT staan (ROT13).
// Gedecodeerd: UEME_CTLSESSION, {System32}\cmd.exe, {ProgramFilesX64}\Mozilla Firefox\firefox.exe,
// E:\tools\wipe-tool.exe, Microsoft.Windows.Explorer, {System32}\notepad.exe.
const WINART_USERASSIST = `HRZR_PGYFRFFVBA
{1NP14R77-02R7-4R5Q-O744-2RO1NR5198O7}\\pzq.rkr
{6Q809377-6NS0-444O-8957-N3773S02200R}\\Zbmvyyn Sversbk\\sversbk.rkr
R:\\gbbyf\\jvcr-gbby.rkr
Zvpebfbsg.Jvaqbjf.Rkcybere
{1NP14R77-02R7-4R5Q-O744-2RO1NR5198O7}\\abgrcnq.rkr`;

// Taak 3: bevindingen van drie parsers over hetzelfde werkstation (tijden UTC).
const WINART_EXEC = `[ShimCache]  C:\\Users\\Public\\svc\\evil.exe              bestand gewijzigd: 2026-09-28 20:11:44
[ShimCache]  C:\\Users\\rene\\Downloads\\rclone.exe          bestand gewijzigd: 2026-09-30 14:02:11
[ShimCache]  C:\\Temp\\dumper.exe                          bestand gewijzigd: 2026-09-29 09:15:37
[ShimCache]  C:\\Program Files\\Firefox\\firefox.exe        bestand gewijzigd: 2026-09-21 06:30:02
[ShimCache]  C:\\Windows\\System32\\cmd.exe                 bestand gewijzigd: 2026-08-14 11:02:50
[Amcache]    C:\\Users\\Public\\svc\\evil.exe              SHA-1 3a7ba6da29ca3e787a17dc968950b3a4aaa95a5f
[Amcache]    C:\\Users\\rene\\Downloads\\rclone.exe          SHA-1 9c41e2a07f5d3b8e1a6c0d24f7b9e3a518c6d702
[Amcache]    C:\\Program Files\\Firefox\\firefox.exe        SHA-1 4e1f0c7a9b2d58e3c6a1f04b7d9e2c853a6b1f90
[Prefetch]   EVIL.EXE-1F3A2B4C.pf                         run count 7   laatste: 2026-10-02 03:04:02
[Prefetch]   FIREFOX.EXE-A1B2C3D4.pf                      run count 41  laatste: 2026-10-02 09:20:01
[Prefetch]   CMD.EXE-4A81B364.pf                          run count 12  laatste: 2026-10-02 03:04:10`;

// Taak 4: USBSTOR, gekoppelde volumes en LECmd-uitvoer (tijden UTC). Beide sticks kregen letter E:.
const WINART_USB = `=== USBSTOR (SYSTEM\\CurrentControlSet\\Enum\\USBSTOR) ===
Disk&Ven_NineMinds&Prod_Werkstick&Rev_1.10\\NM00420017&0   naam: NineMinds Werkstick USB Device   eerste: 2026-09-14 07:02:11   laatste: 2026-10-02 07:52:40
Disk&Ven_OpslagPro&Prod_Mini32&Rev_1.00\\0401A7731&0      naam: OpslagPro Mini32 USB Device      eerste: 2026-10-02 13:58:03   laatste: 2026-10-02 13:58:03
=== Gekoppelde volumes ===
2026-10-02 07:52:41  apparaat NM00420017   letter E:   volume-serienummer 1A2B-3C4D   label WERK
2026-10-02 13:58:05  apparaat 0401A7731    letter E:   volume-serienummer 6C3E-91D2   label PRIVE
=== LECmd: C:\\Users\\rene\\AppData\\Roaming\\Microsoft\\Windows\\Recent ===
offerte-gemeente.docx.lnk     doel: E:\\offertes\\offerte-gemeente.docx      schijftype: verwisselbaar  volume-serienr: 1A2B-3C4D  label: WERK   lnk aangemaakt: 2026-10-02 08:00:15
notulen-mt.docx.lnk           doel: C:\\Users\\rene\\Documents\\notulen-mt.docx  schijftype: vast         volume-serienr: 5C1F-0A9E  label: (geen)  lnk aangemaakt: 2026-10-02 10:31:02
klantenlijst.xlsx.lnk         doel: E:\\export\\klantenlijst.xlsx             schijftype: verwisselbaar  volume-serienr: 6C3E-91D2  label: PRIVE  lnk aangemaakt: 2026-10-02 14:03:11
prijsafspraken-2027.docx.lnk  doel: E:\\export\\prijsafspraken-2027.docx      schijftype: verwisselbaar  volume-serienr: 6C3E-91D2  label: PRIVE  lnk aangemaakt: 2026-10-02 14:05:40
planning-q4.xlsx.lnk          doel: E:\\offertes\\planning-q4.xlsx           schijftype: verwisselbaar  volume-serienr: 1A2B-3C4D  label: WERK   lnk aangemaakt: 2026-10-02 08:04:52`;

CS.registerRoom({
  id: 'windows-artefacten',
  path: 'forensie',
  order: 6,
  title: 'Forensische Windows-artefacten',
  icon: '🪟',
  difficulty: 'Moeilijk',
  minutes: 100,
  level: 'Gevorderd',
  checked: '2026-11-12',
  summary: 'Windows laat overal sporen na: in de registry, Prefetch, Amcache, LNK-bestanden, USB-geschiedenis en event logs. Leer waar ze staan, wat ze bewijzen, en wat uitvoering écht aantoont.',
  objectives: [
    'De belangrijkste Windows-artefacten benoemen met hun locatie en wat ze bewijzen',
    'De registry-hives (SAM, SYSTEM, SOFTWARE, NTUSER.DAT) en sleutels als ShellBags, UserAssist en Run herkennen',
    'Uitvoeringsbewijs lezen uit Prefetch, Amcache en ShimCache, en hun betrouwbaarheid wegen',
    'De "execution evidence hierarchy" toepassen: wat bewijst uitvoering en wat alleen aanwezigheid',
    'Sporen van accounts, services en inbraak lezen uit de Windows Event Logs (event-ID\'s)',
    'De standaard Eric Zimmerman-tools koppelen aan het juiste artefact',
  ],
  tasks: [
    {
      title: 'Taak 1 — Windows is een dagboek dat zichzelf bijhoudt',
      tryFirst: true,
      intro: `<p>Zestien kaartjes: tools, bestandsnamen, mappen en kenmerken. Ze horen bij vier soorten artefacten: Prefetch, Amcache, LNK-bestanden en Jump Lists, en de event logs. Maak vier groepen van vier. Ken je een kaartje niet, zoek het dan op in de uitleg.</p>`,
      lab: { type: 'connections', prompt: 'Vier groepen: Prefetch, Amcache, LNK en Jump Lists, event logs.', flag: 'NM{elk_artefact_zijn_eigen_tool}',
        groups: [
          { name: 'Prefetch', items: ['PECmd', '.pf-bestand', 'C:\\Windows\\Prefetch', 'Tot 8 uitvoertijden'] },
          { name: 'Amcache', items: ['AmcacheParser', 'Amcache.hve', 'SHA-1 van het programma', 'C:\\Windows\\AppCompat\\Programs'] },
          { name: 'LNK en Jump Lists', items: ['LECmd', 'JLECmd', 'Map Recent', 'Snelkoppeling (.lnk)'] },
          { name: 'Event logs', items: ['EvtxECmd', '.evtx-bestand', 'Event-ID 4624', 'C:\\Windows\\System32\\winevt\\Logs'] },
        ] },
      content: `
        <p>Een gebruiker denkt dat hij een programma heeft gedraaid en weer verwijderd, een USB-stick heeft ingestoken en eruit gehaald, een map heeft bekeken en gesloten. Maar Windows noteert dat allemaal, vaak zonder dat iemand het weet, en soms op plekken die een wis-actie niet raakt. Als <strong>digitaal rechercheur</strong> leer je dat dagboek lezen.</p>

        <div class="callout tip"><strong>Analogie:</strong> Windows is als een huis met overal stille camera's. Zelfs als iemand de gastenlijst verscheurt (een bestand wist), staat op tien andere beelden nog dat hij binnen was, hoe vaak, en wat hij aanraakte. Een artefact is zo'n camerabeeld.</div>

        <h3>Wat is een artefact?</h3>
        <p>Een <strong>forensisch artefact</strong> is een spoor dat het systeem automatisch achterlaat bij normaal gebruik. Niet bedoeld als bewijs, maar wel bruikbaar als bewijs. In deze room lopen we de belangrijkste categorieën langs:</p>
        <table>
          <thead><tr><th>Categorie</th><th>Waar</th><th>Vertelt je vooral iets over</th></tr></thead>
          <tbody>
            <tr><td>Registry (ShellBags, UserAssist, Run)</td><td>hives in <code>System32\\config</code> en per gebruiker</td><td>Mapnavigatie, gestarte GUI-programma's, persistentie</td></tr>
            <tr><td>Prefetch</td><td><code>C:\\Windows\\Prefetch</code>, bestanden op <code>.pf</code></td><td>Welke programma's zijn uitgevoerd, hoe vaak en wanneer (tot 8 tijden)</td></tr>
            <tr><td>Amcache &amp; ShimCache</td><td><code>C:\\Windows\\AppCompat\\Programs\\Amcache.hve</code>; ShimCache in de SYSTEM-hive</td><td>Aanwezige of uitgevoerde programma's, met hashes</td></tr>
            <tr><td>LNK &amp; Jump Lists</td><td>map <code>Recent</code> in het profiel</td><td>Welke bestanden zijn geopend (ook van USB of netwerk)</td></tr>
            <tr><td>Event Logs</td><td><code>C:\\Windows\\System32\\winevt\\Logs</code>, bestanden op <code>.evtx</code></td><td>Aanmeldingen, nieuwe accounts, services, gewiste logs</td></tr>
            <tr><td>USB-geschiedenis</td><td>SYSTEM-hive</td><td>Welke externe apparaten zijn aangesloten</td></tr>
          </tbody>
        </table>

        <h3>Het gereedschap: de Eric Zimmerman-tools</h3>
        <p>In de forensische wereld zijn de gratis tools van <strong>Eric Zimmerman</strong> een veelgebruikte standaard voor het uitlezen van Windows-artefacten. Je ziet ze in deze room steeds terugkomen:</p>
        <ul>
          <li><strong>PECmd</strong> leest <em>Prefetch</em>-bestanden.</li>
          <li><strong>AmcacheParser</strong> leest de <em>Amcache</em> (met SHA-1-hashes).</li>
          <li><strong>SBECmd</strong> leest <em>ShellBags</em>.</li>
          <li><strong>LECmd</strong> leest <em>LNK</em>-bestanden; <strong>JLECmd</strong> leest <em>Jump Lists</em>.</li>
          <li><strong>EvtxECmd</strong> leest <em>event logs</em> (<code>.evtx</code>).</li>
          <li><strong>MFTECmd</strong> leest de <em>$MFT</em> en andere NTFS-metadata.</li>
        </ul>

        <div class="callout info"><strong>Nederlandse context:</strong> net als bij schijfforensie werk je op een forensische kopie (image), met een sluitende <strong>chain of custody</strong> en de juiste <strong>machtiging</strong>. Complexe zaken lopen via de cybercrimeteams van de Politie en het <strong>NFI</strong>. Een artefact is pas bewijs als je kunt uitleggen waar het vandaan komt en wat het wel en niet aantoont.</div>
      `,
      questions: [
        { q: 'Wat is een forensisch artefact?', options: ['Een virus dat Windows installeert', 'Een spoor dat het systeem automatisch achterlaat bij normaal gebruik en als bewijs bruikbaar is', 'Een back-up die de gebruiker maakt', 'Een versleuteld bestand'], answer: 1, explain: 'Artefacten ontstaan vanzelf bij gebruik; ze zijn niet als bewijs bedoeld maar wel bruikbaar als bewijs.' },
        { q: 'Welke vlag krijg je als de vier groepen in het lab kloppen?', answer: ['NM{elk_artefact_zijn_eigen_tool}'],
          hints: ['Begin met de tools: elke groep heeft er één of twee.', 'Let op de extensies en mappen: .pf, .hve, .evtx en de map Recent horen elk bij één artefact.', 'JLECmd hoort bij de groep van de snelkoppelingen; EvtxECmd bij de logboeken.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag die het lab toont. Hij verschijnt pas als alle vier de groepen kloppen.' },
          explain: 'Elk artefact heeft zijn eigen plek, bestandsvorm en tool. Wie dat paar weet, weet ook waar hij moet zoeken als een vraag over uitvoering, bestanden of aanmeldingen gaat.' },
        { q: 'Ik snap dat Windows veel sporen achterlaat die een wis-actie vaak niet raakt.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 2 — De registry: SAM, SYSTEM, SOFTWARE en NTUSER.DAT',
      tryFirst: true,
      intro: `<p>In het lab staan de namen van de UserAssist-waarden uit de <code>NTUSER.DAT</code> van gebruiker rene, precies zoals ze in de registry staan. Ze zijn onleesbaar gemaakt met ROT13. Draai ze terug en zoek uit welke programma's rene via de grafische schil heeft gestart, en vanaf welke schijf.</p>`,
      lab: { type: 'cipher', text: WINART_USERASSIST },
      content: `
        <p>De <strong>Windows-registry</strong> is een grote centrale database met instellingen van het systeem en van elke gebruiker. Voor forensie is het een schatkist: veel gedrag van gebruikers belandt hier automatisch.</p>

        <h3>De hives: waar de registry fysiek staat</h3>
        <p>De registry is opgedeeld in bestanden die <strong>hives</strong> heten. De belangrijkste:</p>
        <table>
          <thead><tr><th>Hive</th><th>Bevat</th></tr></thead>
          <tbody>
            <tr><td><strong>SAM</strong></td><td>Lokale gebruikersaccounts en hun (gehashte) wachtwoorden</td></tr>
            <tr><td><strong>SYSTEM</strong></td><td>Systeeminstellingen, services en de USB-geschiedenis</td></tr>
            <tr><td><strong>SOFTWARE</strong></td><td>Geïnstalleerde software en systeembrede instellingen</td></tr>
            <tr><td><strong>NTUSER.DAT</strong></td><td>De instellingen en het gedrag van één specifieke gebruiker</td></tr>
          </tbody>
        </table>
        <p>SAM, SYSTEM en SOFTWARE staan in <code>C:\\Windows\\System32\\config\\</code>. Elke gebruiker heeft een eigen <code>NTUSER.DAT</code> in zijn profielmap (<code>C:\\Users\\&lt;naam&gt;\\</code>) en daarnaast een <code>UsrClass.dat</code> in <code>AppData\\Local\\Microsoft\\Windows</code>. In de "live" registry heten de takken <code>HKLM</code> (de machine) en <code>HKCU</code> (de huidige gebruiker).</p>

        <h3>Vier sleutels die een rechercheur blij maken</h3>
        <ul>
          <li><strong>ShellBags</strong>: <code>...\\Shell\\BagMRU</code>, sinds Windows 7 vooral in <code>UsrClass.dat</code>. Windows onthoudt hier hoe je mappen in Verkenner bekeek (grootte, positie, weergave). Het gevolg: er blijft bewijs dat een gebruiker een bepaalde map <em>heeft geopend</em>, zelfs van mappen die inmiddels <strong>verwijderd</strong> zijn of op een losgekoppelde USB-stick stonden. Uit te lezen met <strong>SBECmd</strong>.</li>
          <li><strong>UserAssist</strong>: <code>HKCU\\...\\Explorer\\UserAssist</code>. Houdt bij welke programma's een gebruiker via de grafische schil heeft gestart (dubbelklik, startmenu, snelkoppeling), met een teller en een laatste-uitvoeringstijd. De namen van de waarden staan <strong>ROT13</strong>-gecodeerd: elke letter schuift 13 plaatsen op in het alfabet. Cijfers en tekens blijven gelijk. Het is geen beveiliging; twee keer ROT13 geeft weer de oorspronkelijke tekst.</li>
          <li><strong>Run-keys</strong>: <code>HKCU\\...\\CurrentVersion\\Run</code> en de HKLM-variant. Alles wat hier staat, start automatisch mee bij het opstarten of inloggen. Een klassieke plek voor <strong>persistentie</strong>: malware zet zichzelf hier neer om elke keer terug te komen.</li>
          <li><strong>SAM</strong>: bevat de lokale accounts; handig om te zien welke gebruikers er zijn en wanneer ze voor het laatst inlogden.</li>
        </ul>

        <h3>GUID's in plaats van mappen</h3>
        <p>Staat een programma in een bekende Windows-map, dan schrijft UserAssist die map niet uit, maar als een vaste code (een <em>Known Folder GUID</em>). Twee die je vaak ziet:</p>
        <table>
          <thead><tr><th>GUID</th><th>Map</th></tr></thead>
          <tbody>
            <tr><td><code>{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}</code></td><td><code>C:\\Windows\\System32</code></td></tr>
            <tr><td><code>{6D809377-6AF0-444B-8957-A3773F02200E}</code></td><td><code>C:\\Program Files</code></td></tr>
          </tbody>
        </table>
        <p>Een programma op een USB-stick of in een eigen map staat er gewoon met stationsletter en pad. Let op: ook de letters van de GUID zijn met ROT13 verschoven.</p>

        <div class="callout warn"><strong>Let op het verschil:</strong> ShellBags en UserAssist laten zien dat een gebruiker iets <em>bekeek of via de GUI startte</em>, maar een Run-key bewijst alleen dat iets <em>ingesteld staat om te starten</em>, niet dat het ook echt heeft gedraaid. In taak 3 scherpen we dat onderscheid verder aan.</div>
      `,
      questions: [
        { q: 'In welke registry-hive staan de lokale gebruikersaccounts en hun gehashte wachtwoorden?', options: ['SOFTWARE', 'SAM', 'NTUSER.DAT', 'SYSTEM'], answer: 1, explain: 'De SAM-hive bevat de lokale accounts en hun wachtwoord-hashes.' },
        { q: 'Welk programma startte rene vanaf station E:?', answer: ['wipe-tool.exe', 'wipe-tool', 'e:\\tools\\wipe-tool.exe'],
          hints: ['Kies in het lab Caesar/ROT met een verschuiving van 13.', 'Zoek in de uitkomst de regel die met E: begint.', 'De naam bestaat uit twee Engelse woorden met een streepje ertussen.'],
          wrong: { 'r:\\gbbyf\\jvcr-gbby.rkr': 'Dat is nog de gecodeerde vorm. Draai hem eerst terug met ROT13.', 'jvcr-gbby.rkr': 'Dat is nog de gecodeerde vorm. Draai hem eerst terug met ROT13.', 'cmd.exe': 'cmd.exe staat in System32 (de GUID), niet op station E:.' },
          why: 'Een wisprogramma dat vanaf een USB-stick wordt gestart, laat op de computer zelf weinig achter. UserAssist in het profiel van de gebruiker is dan een van de weinige sporen.',
          explain: 'R:\\gbbyf\\jvcr-gbby.rkr wordt E:\\tools\\wipe-tool.exe. Dat programma staat niet op de schijf van de computer: het werd van een verwisselbare schijf gestart. Welke stick dat was, zoek je later uit.' },
        { q: 'Waarvoor misbruiken aanvallers de Run-keys?', options: ['Om bestanden te versleutelen', 'Voor persistentie: automatisch meestarten bij het opstarten/inloggen', 'Om de klok te verzetten', 'Om logs te wissen'], answer: 1, explain: 'Alles in een Run-key start automatisch mee; ideaal voor persistentie van malware.' },
        { q: 'Welk programma uit C:\\Windows\\System32 startte rene behalve kladblok (notepad.exe)?', answer: ['cmd.exe', 'cmd'],
          hints: ['Zoek na het decoderen de regels die met dezelfde GUID beginnen.', 'De GUID {1AC14E77-...} staat voor System32. Twee regels beginnen ermee.', 'Het is de klassieke opdrachtprompt.'],
          wrong: { 'pzq.rkr': 'Dat is de gecodeerde vorm. Draai hem terug met ROT13.', 'firefox.exe': 'Firefox staat onder de GUID van Program Files, niet van System32.', 'notepad.exe': 'Die stond al in de vraag. Er is nog één.' },
          explain: '{1NP14R77-...}\\pzq.rkr wordt {1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\\cmd.exe: de opdrachtprompt in System32. Bij een gewone kantoorgebruiker is dat het noteren waard.' },
      ],
    },

    {
      title: 'Taak 3 — Uitvoeringsbewijs: Prefetch, Amcache en ShimCache',
      tryFirst: true,
      intro: `<p>Drie parsers hebben hetzelfde werkstation doorzocht: ShimCache, Amcache en Prefetch. In het lab staan hun bevindingen onder elkaar. Zoek per programma op in welke bronnen het voorkomt. Van welk programma kun je hard zeggen dat het heeft gedraaid, en van welk alleen dat het er stond?</p>`,
      lab: { type: 'logs', title: 'parser-bevindingen WS-FIN-07 (UTC)', lines: WINART_EXEC },
      content: `
        <p>De vraag die een rechercheur het vaakst moet beantwoorden is: <em>"Is dit programma echt uitgevoerd op deze computer, en wanneer?"</em> Windows heeft daar meerdere artefacten voor, maar ze zijn niet allemaal even bewijzend. Dit is de kern van de room.</p>

        <h3>Prefetch: bewijs van uitvoering</h3>
        <p><strong>Prefetch</strong> is een snelheidstruc van Windows: bij het starten van een programma legt het in <code>C:\\Windows\\Prefetch\\</code> een <code>.pf</code>-bestand aan met wat het programma nodig had, zodat het de volgende keer sneller start. Forensisch goud, want een <code>.pf</code>-bestand laat zien: dit programma <strong>is uitgevoerd</strong>, <strong>hoe vaak</strong> (een run count) en de <strong>laatste (tot 8) uitvoeringstijden</strong>. Het bestand bevat ook het volume-serienummer van de schijf waar het programma vandaan kwam. Uit te lezen met <strong>PECmd</strong>.</p>
        <p>Geen <code>.pf</code>-bestand betekent niet dat het programma nooit draaide. Prefetch kan uitgeschakeld zijn (op servers vaak standaard), oude bestanden worden opgeruimd als er te veel zijn, en een aanvaller kan ze wissen.</p>

        <h3>Amcache: bestand en hash, zelfs na verwijdering</h3>
        <p><strong>Amcache</strong> (<code>Amcache.hve</code>) houdt gegevens bij over programma's op het systeem, inclusief de <strong>SHA-1-hash</strong> van het uitvoerbare bestand. Het sterke punt: die informatie blijft vaak staan <em>nadat het programma is verwijderd</em>. Met de hash kun je het programma koppelen aan een bekende malware-sample (bijvoorbeeld via een IOC-lijst). Uit te lezen met <strong>AmcacheParser</strong>.</p>

        <h3>ShimCache / AppCompatCache: aanwezigheid, niet per se uitvoering</h3>
        <p><strong>ShimCache</strong> (ook wel <strong>AppCompatCache</strong>, in de SYSTEM-hive) legt vast welke uitvoerbare bestanden Windows is <em>tegengekomen</em>, vooral voor compatibiliteitsredenen. Een vermelding betekent dat het bestand <strong>bestond</strong> op die plek, niet per se dat het is uitgevoerd. De tijd die erbij staat is de wijzigingstijd van het bestand zelf, niet een uitvoertijd.</p>

        <div class="callout danger"><strong>De execution evidence hierarchy, onthoud dit goed:</strong>
          <ul>
            <li><strong>Prefetch</strong> (en voor via Verkenner gestarte programma's: <strong>UserAssist</strong>) laten <em>uitvoering</em> zien, met tijden en aantallen.</li>
            <li><strong>Amcache</strong> toont het bestand met SHA-1-hash; vaak een sterke aanwijzing voor uitvoering, maar op recente Windows-versies vooral voor <em>aanwezigheid</em>. Combineer het met Prefetch.</li>
            <li><strong>ShimCache</strong> en <strong>ShellBags</strong> laten <em>niet per se uitvoering</em> zien (aanwezigheid of navigatie).</li>
          </ul>
          Een rechercheur die zegt "het programma is uitgevoerd" leunt op Prefetch, aangevuld met Amcache of UserAssist, en niet op ShimCache alleen.
        </div>

        <p>Waarom dit zo belangrijk is: in een zaak maakt het verschil of je kunt aantonen dat een verdachte een tool <em>daadwerkelijk heeft gedraaid</em>, of alleen dat die tool ergens op de schijf <em>stond</em>. Het eerste is veel sterker bewijs dan het tweede.</p>
      `,
      questions: [
        { q: 'Van welk programma in het lab is alleen aangetoond dat het op de schijf stond, en verder niets?', answer: ['dumper.exe', 'dumper', 'c:\\temp\\dumper.exe'],
          hints: ['Zoek per programma in welke van de drie bronnen het voorkomt.', 'Filter op elke bestandsnaam. Eén programma komt maar één keer voor.', 'Het staat alleen in ShimCache, in de map C:\\Temp.'],
          wrong: { 'rclone.exe': 'rclone.exe staat ook in Amcache, met een hash. Dat is meer dan alleen aanwezigheid in ShimCache.', 'evil.exe': 'evil.exe staat in alle drie de bronnen, ook in Prefetch.' },
          explain: 'dumper.exe staat alleen in ShimCache. Je weet dat het bestand op 29 september in C:\\Temp stond. Of het ooit is gestart, laat deze bron niet zien.' },
        { q: 'Wat kun je uit een Prefetch (.pf)-bestand aflezen?', options: ['Alleen de bestandsgrootte', 'Dat een programma is uitgevoerd, hoe vaak en de laatste uitvoeringstijden', 'Het wachtwoord van de gebruiker', 'De inhoud van het programma'], answer: 1, explain: 'Prefetch bewijst uitvoering, met een run count en de laatste uitvoeringstijden.' },
        { q: 'Waarom is een vermelding in ShimCache (AppCompatCache) zwakker bewijs dan Prefetch?', options: ['ShimCache is versleuteld', 'Het bewijst dat het bestand bestond, niet per se dat het is uitgevoerd', 'ShimCache bestaat niet op moderne Windows', 'Het bevat geen tijden'], answer: 1, explain: 'ShimCache toont aanwezigheid/compatibiliteitscontacten, geen harde uitvoering.' },
        { q: 'Welk programma staat in Amcache met een hash, maar heeft geen Prefetch-bestand?', answer: ['rclone.exe', 'rclone'],
          hints: ['Vergelijk de Amcache-regels met de Prefetch-regels.', 'Drie programma\'s staan in Amcache; twee daarvan hebben ook een .pf-bestand.', 'Het programma staat in de map Downloads.'],
          wrong: { 'firefox.exe': 'Firefox heeft een .pf-bestand met run count 41.', 'evil.exe': 'evil.exe heeft een .pf-bestand met run count 7.', 'dumper.exe': 'dumper.exe staat niet in Amcache, alleen in ShimCache.' },
          why: 'Hier zit de valkuil van het vak. Schrijf je "rclone.exe is uitgevoerd", dan moet je dat kunnen onderbouwen. Schrijf je "rclone.exe is niet uitgevoerd", dan ook. Met deze bronnen kun je geen van beide hard maken.',
          explain: 'rclone.exe staat in ShimCache en Amcache, maar er is geen .pf-bestand. Dat kan betekenen dat het niet draaide, of dat Prefetch is gewist of uitstaat. Zoek verder, bijvoorbeeld in event 4688 of in UserAssist.' },
      ],
    },

    {
      title: 'Taak 4 — LNK-bestanden, Jump Lists, Recent en USB-geschiedenis',
      tryFirst: true,
      intro: `<p>Rene wordt ervan verdacht klantgegevens mee naar huis te hebben genomen. In het lab staan de USB-geschiedenis, de volumes die zijn aangekoppeld en de LNK-bestanden uit zijn map Recent. Beide sticks kregen letter E:. Zoek uit vanaf welke stick welke bestanden zijn geopend.</p>`,
      lab: { type: 'logs', title: 'USBSTOR, volumes en LECmd (UTC)', lines: WINART_USB },
      content: `
        <p>Deze artefacten beantwoorden vooral de vraag: <em>"Welke bestanden en apparaten heeft deze gebruiker gebruikt?"</em>, ook als die bestanden op een USB-stick of netwerkschijf stonden die er nu niet meer is.</p>

        <h3>LNK-bestanden: snelkoppelingen die meer verraden dan je denkt</h3>
        <p>Als je een bestand opent, maakt Windows vaak automatisch een <strong>LNK-bestand</strong> aan (een snelkoppeling). Dat LNK onthoudt het <strong>volledige pad</strong> van het geopende bestand, de grootte, tijdstempels, het soort schijf (vast of verwisselbaar) en het <strong>volume-serienummer</strong> en label van de schijf waar het op stond. Gevolg: je kunt aantonen dat iemand <code>geheim.docx</code> opende <em>vanaf een USB-stick</em>, ook al is die stick allang weg. Uit te lezen met <strong>LECmd</strong>.</p>

        <h3>Jump Lists en Recent</h3>
        <p><strong>Jump Lists</strong> zijn de lijstjes met "recente bestanden" die je ziet als je rechtsklikt op een programma in de taakbalk. Ze bewaren per programma welke bestanden recent zijn geopend. De map <strong>Recent</strong> (<code>C:\\Users\\&lt;naam&gt;\\AppData\\Roaming\\Microsoft\\Windows\\Recent</code>) verzamelt de LNK-snelkoppelingen van recent geopende bestanden. Samen geven ze een beeld van wat iemand de laatste tijd heeft bekeken.</p>

        <h3>USB-geschiedenis</h3>
        <p>Elke USB-opslag die ooit is aangesloten, laat een spoor na in de registry onder <code>SYSTEM\\...\\USBSTOR</code>: merk, model en serienummer van het apparaat, plus tijdstippen. Het <strong>volume-serienummer</strong> is iets anders: dat hoort bij het bestandssysteem op de stick en verandert bij formatteren. Andere bronnen (zoals sommige event logs, of de stick zelf als je hem in beslag neemt) koppelen het ene nummer aan het andere.</p>
        <p>De stationsletter zegt weinig: Windows geeft de eerstvolgende vrije letter, dus twee verschillende sticks kunnen op dezelfde dag allebei E: zijn. Werk daarom met serienummers, niet met letters.</p>

        <div class="callout info"><strong>Voorbeeld uit de praktijk:</strong> een medewerker wordt verdacht van het meenemen van bedrijfsgeheimen. Via USBSTOR zie je dat op 2 oktober om 17:58 een onbekende USB-stick (serienummer <code>NMUSB-00FA</code>) is aangesloten. Een LNK-bestand toont dat kort daarna een bestand werd geopend vanaf een volume dat bij die stick hoort. De twee artefacten versterken elkaar en vormen samen een sterk verhaal.</div>

        <h3>Browser-artefacten</h3>
        <p>Vergeet de browser niet: <strong>geschiedenis</strong> (bezochte sites met tijdstip), <strong>cache</strong> (lokaal opgeslagen pagina-onderdelen) en <strong>downloads</strong> (wat en wanneer gedownload, van welke URL). Deze staan in de profielmap van de browser en zijn vaak cruciaal om online gedrag te reconstrueren.</p>
      `,
      questions: [
        { q: 'Wat kan een LNK-bestand bewijzen, zelfs als de USB-stick allang weg is?', options: ['Het wachtwoord van de gebruiker', 'Dat een bestand vanaf die stick is geopend, met pad en volume-serienummer', 'Welke website is bezocht', 'Hoeveel RAM de computer heeft'], answer: 1, explain: 'Een LNK onthoudt het volledige pad, tijden en het volume-serienummer, dus ook een geopend bestand van een verdwenen stick.' },
        { q: 'Welk serienummer heeft het USB-apparaat waarvan klantenlijst.xlsx is geopend?', answer: ['0401A7731', '0401a7731&0'],
          hints: ['De stationsletter helpt niet: beide sticks waren E:.', 'Neem het volume-serienummer uit de LNK van klantenlijst.xlsx en zoek het op bij de gekoppelde volumes.', 'Het volume 6C3E-91D2 met label PRIVE hoort bij een apparaat van OpslagPro.'],
          wrong: { 'nm00420017': 'Dat is de werkstick met volume 1A2B-3C4D. De klantenlijst kwam van volume 6C3E-91D2.', '6c3e-91d2': 'Dat is het volume-serienummer. Gevraagd is het serienummer van het apparaat zelf, uit USBSTOR.', 'e:': 'Beide sticks kregen letter E:. Daarmee kun je ze niet uit elkaar houden.' },
          why: 'Een stationsletter verwijst naar het moment, een serienummer naar het apparaat. Wie op letters vertrouwt, beschuldigt misschien de verkeerde stick, en daarmee de verkeerde persoon.',
          explain: 'klantenlijst.xlsx.lnk wijst naar volume 6C3E-91D2 (PRIVE). Dat volume werd om 13:58:05 aangekoppeld voor apparaat 0401A7731, een OpslagPro Mini32 die die dag voor het eerst werd aangesloten.' },
        { q: 'Hoeveel bestanden zijn volgens de LNK-bestanden geopend vanaf de stick met label PRIVE?', answer: ['2', 'twee'],
          hints: ['Filter op het volume-serienummer of het label.', 'Tel alleen de regels uit LECmd, niet de regel bij de gekoppelde volumes.', 'Een spreadsheet en een document over prijzen.'],
          wrong: { '4': 'Dat zijn alle bestanden op een verwisselbare schijf. Twee daarvan kwamen van de werkstick (WERK).', '3': 'Tel je de regel bij de gekoppelde volumes mee? Die is geen geopend bestand.' },
          explain: 'klantenlijst.xlsx en prijsafspraken-2027.docx, beide vanaf E:\\export op volume 6C3E-91D2, binnen tweeënhalve minuut. Een map met de naam export op een nieuwe, privé-stick: dat vraagt om een gesprek.' },
        { q: 'Welke browser-artefacten helpen online gedrag te reconstrueren?', options: ['Alleen de bladwijzers', 'Geschiedenis, cache en downloads', 'Alleen cookies', 'De browserversie'], answer: 1, explain: 'Geschiedenis, cache en downloads samen tonen bezochte sites, opgeslagen onderdelen en gedownloade bestanden.' },
      ],
    },

    {
      title: 'Taak 5 — Windows Event Logs lezen',
      content: `
        <p>De <strong>Windows Event Logs</strong> zijn de officiële logboeken van het systeem, opgeslagen als <code>.evtx</code>-bestanden in <code>C:\\Windows\\System32\\winevt\\Logs\\</code>. Voor een rechercheur is het <strong>Security</strong>-logboek het belangrijkst: daar staan aanmeldingen, nieuwe accounts en rechtenwijzigingen in. Elk type gebeurtenis heeft een vast <strong>event-ID</strong>. Windows slaat de tijden op in UTC; Logboeken (Event Viewer) toont ze in de tijdzone van de computer waarop je kijkt.</p>

        <h3>De event-ID's die je uit je hoofd wilt kennen</h3>
        <table>
          <thead><tr><th>Event-ID</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td><strong>4624</strong></td><td>Geslaagde aanmelding (logon)</td></tr>
            <tr><td><strong>4625</strong></td><td>Mislukte aanmelding; veel op rij = brute force</td></tr>
            <tr><td><strong>4720</strong></td><td>Een gebruikersaccount is aangemaakt</td></tr>
            <tr><td><strong>4688</strong></td><td>Een nieuw proces is gestart (alleen als die controle aanstaat)</td></tr>
            <tr><td><strong>7045</strong></td><td>Een nieuwe service is geïnstalleerd (System-logboek)</td></tr>
          </tbody>
        </table>
        <p>Bonus om te herkennen: <strong>4672</strong> (speciale of beheerrechten toegekend bij een aanmelding) en <strong>1102</strong> (het beveiligingslogboek is gewist, op zichzelf al een rode vlag).</p>

        <h3>Een inbraak lezen als een verhaal</h3>
        <p>De kracht zit in de volgorde. Een klassiek aanvalsverhaal in de logs ziet er zo uit:</p>
        <ol>
          <li>Een stortvloed aan <strong>4625</strong> (mislukte aanmeldingen) vanaf één IP: een brute-force-aanval.</li>
          <li>Plotseling een <strong>4624</strong> (geslaagde aanmelding) vanaf datzelfde IP: de aanval is gelukt.</li>
          <li>Een <strong>4720</strong> (nieuw account aangemaakt): de aanvaller maakt een eigen toegang.</li>
          <li>Een <strong>7045</strong> (nieuwe service): persistentie, zodat hij terug kan komen.</li>
        </ol>

        <h3>Lees nu zelf de logs</h3>
        <p>Hieronder staat een stuk Security/System-logboek (geëxporteerd, tijden in UTC). Gebruik de filter (typ bijvoorbeeld <code>4625</code>, <code>4720</code>, of <code>/4624|4720|7045/</code> als regex). Reconstrueer het aanvalsverhaal en let op: in een <strong>4688</strong>-regel heeft de aanvaller een proces gestart waarvan de bestandsnaam een vlag bevat.</p>
      `,
      lab: {
        type: 'logs',
        title: 'Security.evtx en System.evtx (geëxporteerd, UTC)',
        lines: WINART_LOG,
      },
      questions: [
        { q: 'Vanaf welk IP-adres kwam de brute-force-aanval (veel 4625 gevolgd door een 4624)?', answer: ['203.0.113.66'],
          hints: ['Filter op 4625.', 'Eén IP-adres herhaalt zich bij alle mislukte pogingen.', 'Controleer of datzelfde adres terugkomt bij de geslaagde 4624 om 03:01:42.'],
          wrong: { '192.0.2.21': 'Dat is de werkplek van rene, die gewoon via de console inlogt (LogonType 2).', '192.0.2.24': 'Dat is de werkplek van fatima.' },
          explain: 'Alle mislukte aanmeldingen en de uiteindelijke geslaagde login komen van 203.0.113.66.' },
        { q: 'Welk account maakte de aanvaller aan (event 4720)?', answer: ['hulpje'],
          hints: ['Filter op 4720.', 'Kijk naar het veld NieuwAccount.', 'Het account wordt direct daarna lid van Administrators.'],
          wrong: { 'beheerder': 'Dat is het account waarmee de aanvaller binnenkwam. Het nieuwe account staat achter NieuwAccount.' },
          explain: 'Na de geslaagde login verschijnt event 4720: het nieuwe account "hulpje", meteen toegevoegd aan Administrators.' },
        { q: 'Welke vlag staat in de bestandsnaam van het proces in de 4688-regel?', answer: ['NM{sporen_in_de_eventlog}'], hint: 'Filter op 4688 of op NM; lees het pad van het gestarte proces.', explain: 'Het proces C:\\Users\\Public\\svc\\NM{sporen_in_de_eventlog}.exe verraadt de vlag in de 4688-gebeurtenis.' },
        { q: 'Hoeveel mislukte aanmeldingen (4625) gingen aan de geslaagde inlog van de aanvaller vooraf?', answer: ['12', 'twaalf'],
          hints: ['Filter op 4625.', 'De teller van het lab telt de regels die door het filter komen.', 'Tel ook de poging op het account admin mee.'],
          wrong: { '11': 'Je mist er één: de poging op admin om 02:57:59.', '7': 'Dat zijn alleen de pogingen op beheerder. Tel alle 4625-regels.' },
          explain: 'Twaalf mislukte pogingen in 26 seconden, op verschillende accountnamen, en drie minuten later één geslaagde. Dat is geen vergissing van een gebruiker.' },
        { q: 'Met welk account kwam de aanvaller uiteindelijk binnen?', answer: ['beheerder'],
          hints: ['Zoek de 4624 vanaf hetzelfde IP-adres als de mislukte pogingen.', 'Filter op 203.0.113.66 en kijk naar de laatste aanmelding van die reeks.', 'Het is een Nederlandse naam voor een beheerdersaccount.'],
          wrong: { 'administrator': 'Op Administrator lukte geen enkele poging.', 'hulpje': 'Dat account maakte de aanvaller pas aan nadat hij binnen was.' },
          explain: 'Om 03:01:42 lukt de aanmelding op beheerder, LogonType 3 (via het netwerk), en direct daarna volgt 4672: het account heeft beheerrechten.' },
      ],
    },

    {
      title: 'Taak 6 — Artefacten uitlezen met parsers (PowerShell)',
      tryFirst: true,
      intro: `<p>Je zit op een forensisch werkstation met PowerShell en de Eric Zimmerman-tools. Beantwoord twee vragen: is <code>evil.exe</code> echt uitgevoerd, en zo ja, hoe laat was dat in Nederlandse tijd? En heeft de aanvaller iets neergezet dat bij het inloggen automatisch meestart? Begin met <code>PECmd.exe -f evil.exe.pf</code> en <code>reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"</code>.</p>`,
      content: `
        <p>Tijd om de tools uit taak 1 in actie te zien. Je zit op een forensisch werkstation met een PowerShell-venster en de Eric Zimmerman-tools geïnstalleerd.</p>

        <h3>Stap 1: bewijs van uitvoering met PECmd</h3>
        <p>Je vond een verdacht Prefetch-bestand van <code>evil.exe</code>. Laat <strong>PECmd</strong> het ontleden. Typ exact:</p>
        <pre><code>PECmd.exe -f evil.exe.pf</code></pre>
        <p>Let op de <strong>run count</strong> en de <strong>laatste uitvoeringstijd</strong>. PECmd toont tijden in UTC. Nederland liep op 2 oktober 2026 twee uur voor op UTC (zomertijd, CEST).</p>

        <h3>Stap 2: zoek persistentie in de Run-key</h3>
        <p>Controleer of er iets automatisch meestart bij het inloggen. Bevraag de Run-key van de gebruiker. Typ exact:</p>
        <pre><code>reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"</code></pre>
        <p>Bekijk de waarden. Er staat een verdachte vermelding tussen; in het pad van die vermelding is een vlag verwerkt.</p>

        <div class="callout tip"><strong>Extra:</strong> wil je de hash van een uitgevoerd programma koppelen aan een IOC-lijst? Dan draai je <code>AmcacheParser.exe -f Amcache.hve --csv .</code> en vergelijk je de SHA-1 met je lijst. Probeer dat commando ook.</div>
      `,
      lab: {
        type: 'terminal',
        shell: 'powershell',
        user: 'rechercheur', host: 'FORENSIE-WS01',
        home: 'C:\\Cases\\2026-0442', cwd: 'C:\\Cases\\2026-0442',
        motd: 'Forensisch werkstation (PowerShell). EZ-tools staan in het pad. Start met: PECmd.exe -f evil.exe.pf',
        commands: {
          'PECmd.exe -f evil.exe.pf': `PECmd version 1.5 (Eric Zimmerman)
Processing evil.exe.pf

Executable name: EVIL.EXE
Hash: 1F3A2B4C
Run count: 7
Last run: 2026-10-02 03:04:02
Other run times: 2026-10-02 03:03:50, 2026-10-02 03:03:41, 2026-10-02 03:03:05, 2026-10-02 03:02:44, 2026-10-02 03:02:31, 2026-10-02 03:02:20

Volume information:
  #0: \\VOLUME{01d9c2a4e5b7f310-a4c19f02}  Serial: A4C19F02  Created: 2026-03-11 09:14:22
Directories referenced: 6
Files referenced: 14  (o.a. \\VOLUME{01d9c2a4e5b7f310-a4c19f02}\\USERS\\PUBLIC\\SVC\\UPDATER.EXE)

Processed evil.exe.pf in 0,0412 seconds`,
          'reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"': `
HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
    OneDrive          REG_SZ    C:\\Users\\rene\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background
    SvcUpdater        REG_SZ    C:\\Users\\Public\\svc\\NM{run_key_persistentie}.exe

Einde van zoekresultaten.`,
          'AmcacheParser.exe -f Amcache.hve --csv .': `AmcacheParser version 1.5 (Eric Zimmerman)
Processing Amcache.hve

Name          : evil.exe
Path          : C:\\Users\\Public\\svc\\evil.exe
SHA-1         : 3a7ba6da29ca3e787a17dc968950b3a4aaa95a5f
Compiled      : 2026-09-28 20:11:44

1 bestand verwerkt. Tip: vergelijk de SHA-1 met je IOC-lijst.`,
        },
      },
      questions: [
        { q: 'Hoe vaak is evil.exe uitgevoerd volgens PECmd (de run count)?', answer: ['7', 'zeven'], hint: 'Lees de regel "Run count" in de PECmd-uitvoer.', explain: 'PECmd toont een run count van 7: hard bewijs dat evil.exe meerdere keren is uitgevoerd.' },
        { q: 'Welke vlag zit verwerkt in de verdachte Run-key-vermelding?', answer: ['NM{run_key_persistentie}'], hint: 'Draai de reg query en lees het pad van de SvcUpdater-waarde.', explain: 'De SvcUpdater-waarde wijst naar C:\\Users\\Public\\svc\\NM{run_key_persistentie}.exe: persistentie, met de vlag erin.' },
        { q: 'Waarom is de PECmd-uitkomst sterker bewijs van uitvoering dan een ShimCache-vermelding?', options: ['Omdat PowerShell betrouwbaarder is', 'Omdat Prefetch uitvoering bewijst (met run count en tijden), terwijl ShimCache alleen aanwezigheid toont', 'Omdat ShimCache versleuteld is', 'Dat is het niet'], answer: 1, explain: 'Prefetch (via PECmd) bewijst echte uitvoering; ShimCache toont slechts dat het bestand aanwezig was.' },
        { q: 'Hoe laat draaide evil.exe voor het laatst, in Nederlandse tijd? Geef UU:MM:SS.', answer: ['05:04:02', '5:04:02', '05.04.02'],
          hints: ['Lees de regel Last run in de PECmd-uitvoer.', 'PECmd geeft UTC. Op 2 oktober gold in Nederland nog zomertijd.', 'Tel twee uur op bij 03:04:02.'],
          wrong: { '03:04:02': 'Dat is UTC. In Nederland was het op 2 oktober zomertijd: UTC plus twee uur.', '04:04:02': 'Je telt één uur op, maar op 2 oktober gold nog zomertijd: UTC+2.', '03:03:20': 'Dat is de tijd van het 4688-event uit taak 5, een ander proces. Kijk naar Last run in PECmd.' },
          explain: '03:04:02 UTC is 05:04:02 Nederlandse tijd (CEST). Vermeld in een rapport altijd welke tijdzone je gebruikt.' },
      ],
    },

    {
      title: 'Taak 7 — Alles samen: de aanpak van een artefact-onderzoek',
      tryFirst: true,
      intro: `<p>In het lab staat de super-timeline van het werkstation van rene op 2 oktober: event logs, Prefetch, USB-geschiedenis, LNK-bestanden, UserAssist en het NTFS-wijzigingslogboek ($UsnJrnl), allemaal in UTC. Er zitten twee verhalen in: een inbraak 's nachts en iets wat overdag gebeurde. Gebruik de bronchips en het tijdvenster om ze uit elkaar te halen.</p>`,
      lab: { type: 'timeline', title: 'Zaak 2026-0442, WS-FIN-07 (UTC)',
        events: [
          { t: '2026-10-02 02:57:58', src: 'Security', host: 'WS-FIN-07', desc: '4625 mislukte aanmelding Administrator vanaf 203.0.113.66 (eerste van 12)' },
          { t: '2026-10-02 03:01:42', src: 'Security', host: 'WS-FIN-07', user: 'beheerder', desc: '4624 aanmelding type 3 (netwerk) vanaf 203.0.113.66' },
          { t: '2026-10-02 03:02:07', src: 'Security', host: 'WS-FIN-07', user: 'beheerder', desc: '4720 account hulpje aangemaakt' },
          { t: '2026-10-02 03:02:20', src: 'Prefetch', host: 'WS-FIN-07', desc: 'EVIL.EXE-1F3A2B4C.pf eerste uitvoering (volume A4C19F02, C:)' },
          { t: '2026-10-02 03:03:55', src: 'System', host: 'WS-FIN-07', desc: '7045 service SvcUpdater geïnstalleerd (C:\\Users\\Public\\svc\\updater.exe)' },
          { t: '2026-10-02 03:04:02', src: 'Prefetch', host: 'WS-FIN-07', desc: 'EVIL.EXE-1F3A2B4C.pf laatste uitvoering (run count 7)' },
          { t: '2026-10-02 03:05:33', src: 'Security', host: 'WS-FIN-07', user: 'hulpje', desc: '1102 beveiligingslogboek gewist' },
          { t: '2026-10-02 06:58:12', src: 'System', host: 'WS-FIN-07', desc: '19 Windows Update: update geïnstalleerd' },
          { t: '2026-10-02 07:45:10', src: 'Security', host: 'WS-FIN-07', user: 'rene', desc: '4624 aanmelding type 2 (console)' },
          { t: '2026-10-02 07:46:02', src: 'Prefetch', host: 'WS-FIN-07', desc: 'OUTLOOK.EXE-6C1D0F2A.pf uitgevoerd' },
          { t: '2026-10-02 07:52:40', src: 'USB', host: 'WS-FIN-07', desc: 'USBSTOR NineMinds Werkstick, serienr NM00420017 aangesloten' },
          { t: '2026-10-02 07:52:41', src: 'USB', host: 'WS-FIN-07', desc: 'volume 1A2B-3C4D (label WERK) gekoppeld als E: (apparaat NM00420017)' },
          { t: '2026-10-02 08:00:15', src: 'LNK', host: 'WS-FIN-07', user: 'rene', desc: 'offerte-gemeente.docx.lnk aangemaakt, doel E:\\offertes\\offerte-gemeente.docx (volume 1A2B-3C4D)' },
          { t: '2026-10-02 08:12:40', src: 'Security', host: 'WS-FIN-07', user: 'fatima', desc: '4624 aanmelding type 2 (console)' },
          { t: '2026-10-02 08:30:05', src: 'USB', host: 'WS-FIN-07', desc: 'apparaat NM00420017 ontkoppeld' },
          { t: '2026-10-02 09:03:18', src: 'Security', host: 'WS-FIN-07', user: 'fatima', desc: '4634 afmelding' },
          { t: '2026-10-02 09:20:01', src: 'Prefetch', host: 'WS-FIN-07', desc: 'FIREFOX.EXE-A1B2C3D4.pf uitgevoerd' },
          { t: '2026-10-02 10:31:02', src: 'LNK', host: 'WS-FIN-07', user: 'rene', desc: 'notulen-mt.docx.lnk aangemaakt, doel C:\\Users\\rene\\Documents\\notulen-mt.docx' },
          { t: '2026-10-02 12:30:44', src: 'Browser', host: 'WS-FIN-07', user: 'rene', desc: 'download klantenlijst.xlsx van https://crm.nm.lab/export?format=xlsx naar C:\\Users\\rene\\Downloads' },
          { t: '2026-10-02 13:58:03', src: 'USB', host: 'WS-FIN-07', desc: 'USBSTOR OpslagPro Mini32, serienr 0401A7731 voor het eerst aangesloten' },
          { t: '2026-10-02 13:58:05', src: 'USB', host: 'WS-FIN-07', desc: 'volume 6C3E-91D2 (label PRIVE) gekoppeld als E: (apparaat 0401A7731)' },
          { t: '2026-10-02 14:01:37', src: 'ShellBags', host: 'WS-FIN-07', user: 'rene', desc: 'map E:\\export geopend in Verkenner' },
          { t: '2026-10-02 14:03:11', src: 'LNK', host: 'WS-FIN-07', user: 'rene', desc: 'klantenlijst.xlsx.lnk aangemaakt, doel E:\\export\\klantenlijst.xlsx (volume 6C3E-91D2)' },
          { t: '2026-10-02 14:05:40', src: 'LNK', host: 'WS-FIN-07', user: 'rene', desc: 'prijsafspraken-2027.docx.lnk aangemaakt, doel E:\\export\\prijsafspraken-2027.docx (volume 6C3E-91D2)' },
          { t: '2026-10-02 14:09:02', src: 'USB', host: 'WS-FIN-07', desc: 'apparaat 0401A7731 ontkoppeld' },
          { t: '2026-10-02 14:22:10', src: 'Prefetch', host: 'WS-FIN-07', desc: 'TEAMS.EXE-2B7E9A10.pf uitgevoerd' },
          { t: '2026-10-02 14:38:20', src: 'USB', host: 'WS-FIN-07', desc: 'USBSTOR Generic Flash Disk, serienr 7F3C0009B2 voor het eerst aangesloten' },
          { t: '2026-10-02 14:38:22', src: 'USB', host: 'WS-FIN-07', desc: 'volume D4F0-2291 (label TOOLS) gekoppeld als E: (apparaat 7F3C0009B2)' },
          { t: '2026-10-02 14:41:09', src: 'UserAssist', host: 'WS-FIN-07', user: 'rene', desc: 'E:\\tools\\wipe-tool.exe gestart via Verkenner (teller 1)' },
          { t: '2026-10-02 14:41:09', src: 'Prefetch', host: 'WS-FIN-07', desc: 'WIPE-TOOL.EXE-3B1C55A0.pf eerste uitvoering (volume D4F02291, pad \\VOLUME{...}\\TOOLS\\WIPE-TOOL.EXE)' },
          { t: '2026-10-02 14:41:31', src: '$UsnJrnl', host: 'WS-FIN-07', desc: 'C:\\Users\\rene\\Downloads\\klantenlijst.xlsx FILE_DELETE|CLOSE' },
          { t: '2026-10-02 14:41:32', src: '$UsnJrnl', host: 'WS-FIN-07', desc: 'C:\\Users\\rene\\Downloads\\~$antenlijst.xlsx FILE_DELETE|CLOSE' },
          { t: '2026-10-02 14:50:12', src: 'USB', host: 'WS-FIN-07', desc: 'apparaat 7F3C0009B2 ontkoppeld' },
          { t: '2026-10-02 15:10:48', src: 'Prefetch', host: 'WS-FIN-07', desc: 'OUTLOOK.EXE-6C1D0F2A.pf uitgevoerd' },
          { t: '2026-10-02 16:02:19', src: 'Security', host: 'WS-FIN-07', user: 'rene', desc: '4634 afmelding' },
        ] },
      content: `
        <p>Je hebt nu de belangrijkste Windows-artefacten gezien. Tot slot breng je ze samen tot een werkwijze.</p>

        <h3>Een logische volgorde van onderzoek</h3>
        <ol>
          <li><strong>Tijdlijn</strong>: bouw een tijdlijn uit de $MFT (MFTECmd), het NTFS-wijzigingslogboek <code>$UsnJrnl</code> en de event logs. Wanneer gebeurde wat?</li>
          <li><strong>Uitvoering</strong>: wat heeft echt gedraaid? Prefetch (PECmd), Amcache (AmcacheParser) en UserAssist.</li>
          <li><strong>Gebruikersgedrag</strong>: welke mappen, bestanden en apparaten? ShellBags (SBECmd), LNK en Jump Lists (LECmd, JLECmd), USBSTOR.</li>
          <li><strong>Toegang en persistentie</strong>: accounts en services uit de event logs (4624, 4625, 4720, 7045) en de Run-keys.</li>
          <li><strong>Koppelen</strong>: leg verbanden. Dezelfde hash in Amcache en een IOC-lijst, hetzelfde volume-serienummer in een LNK en bij een gekoppeld volume, of in een Prefetch-bestand en bij een USB-apparaat.</li>
        </ol>
        <p>Een <strong>super-timeline</strong> zet al die bronnen op één tijdas. Zet altijd alles in dezelfde tijdzone (meestal UTC) voordat je bronnen naast elkaar legt. Kijk vervolgens naar clusters: gebeurtenissen uit verschillende bronnen die binnen een paar seconden of minuten op elkaar volgen, horen vaak bij één handeling.</p>
        <p><code>$UsnJrnl</code> is een logboek van NTFS dat bijhoudt welke bestanden worden aangemaakt, gewijzigd, hernoemd of verwijderd, met een reden zoals <code>FILE_DELETE</code>. Het is daardoor een van de weinige bronnen die laten zien wanneer een bestand is gewist.</p>

        <h3>De gouden denkregel</h3>
        <div class="callout danger"><strong>Scheid "aanwezig" van "uitgevoerd".</strong> Als je in een rapport schrijft dat een programma is <em>uitgevoerd</em>, onderbouw dat dan met <strong>Prefetch</strong>, bij voorkeur samen met Amcache of UserAssist. ShimCache en ShellBags zijn waardevol, maar bewijzen uitvoering niet. Een goede rechercheur formuleert precies wat een artefact wel en niet aantoont, anders sneuvelt de conclusie bij de eerste kritische vraag.</div>

        <h3>Ethiek en zorgvuldigheid</h3>
        <p>Alles wat je hier leert, pas je toe binnen de grenzen van je <strong>machtiging</strong> en met een sluitende <strong>chain of custody</strong>. Je werkt op een forensische kopie, je legt je hash-waarden vast, en je documenteert elke stap zodat een collega (of de rechter) je werk kan controleren. Zonder die zorgvuldigheid is zelfs het beste technische bewijs waardeloos.</p>

        <div class="callout tip"><strong>Tip voor verder leren:</strong> oefen met echte images op CyberDefenders en Forensic Focus (zie de bronnen). Download de Eric Zimmerman-tools en lees per tool welk artefact hij ontsluit; dan gaat de theorie uit deze room pas echt leven.</div>
      `,
      questions: [
        { q: 'Welke bron gebruik je om hard te onderbouwen dat een programma is uitgevoerd?', options: ['ShimCache of ShellBags', 'Amcache of Prefetch', 'Alleen de bestandsnaam', 'De browsergeschiedenis'], answer: 1, explain: 'Prefetch bewijst uitvoering, Amcache versterkt het met de hash; ShimCache en ShellBags tonen aanwezigheid of navigatie.' },
        { q: 'Welk bestand verdween ruim twintig seconden nadat wipe-tool.exe was gestart?', answer: ['klantenlijst.xlsx', 'c:\\users\\rene\\downloads\\klantenlijst.xlsx'],
          hints: ['Kijk wat er direct na 14:41:09 gebeurt.', 'Zet de bronchip $UsnJrnl aan en zoek FILE_DELETE.', 'Het is de kopie in de map Downloads van een bestand dat eerder die dag werd gedownload.'],
          wrong: { '~$antenlijst.xlsx': 'Dat is een tijdelijk bestand dat Excel naast een geopend bestand zet. Het gaat om het bestand zelf.', 'wipe-tool.exe': 'wipe-tool.exe stond op de stick en is niet verwijderd.' },
          explain: 'Om 14:41:31 wordt C:\\Users\\rene\\Downloads\\klantenlijst.xlsx verwijderd. Op de computer is het bestand weg, maar de download, de LNK naar de kopie op de stick en het verwijderen zelf staan nog in de tijdlijn.' },
        { q: 'Waarom moet je in een rapport precies formuleren wat een artefact wél en níét aantoont?', options: ['Dat hoeft niet', 'Omdat een te sterke conclusie bij een kritische vraag onderuitgaat en het bewijs verzwakt', 'Om het rapport langer te maken', 'Omdat de software dat eist'], answer: 1, explain: 'Precisie houdt je conclusie overeind; "aanwezig" verwarren met "uitgevoerd" ondermijnt de hele zaak.' },
        { q: 'Van welk USB-apparaat (serienummer) is wipe-tool.exe gestart?', boss: true, answer: ['7F3C0009B2', '7f3c0009b2&0'],
          hints: ['Je hebt twee soorten sporen nodig: een spoor van uitvoering dat vertelt van welk volume het programma kwam, en de USB-geschiedenis die een volume aan een apparaat koppelt.', 'Twee verschillende sticks waren vandaag E:. Lees in het Prefetch-event van WIPE-TOOL het volume-serienummer en zoek dat volume bij de USB-events.', 'Het Prefetch-bestand noemt volume D4F02291. Dat is volume D4F0-2291, label TOOLS.'],
          wrong: { '0401a7731': 'Die stick (PRIVE, volume 6C3E-91D2) was om 14:09 al ontkoppeld en heeft een ander volume-serienummer dan in het Prefetch-bestand staat.', 'nm00420017': 'De werkstick was al om 08:30 ontkoppeld.', 'd4f0-2291': 'Dat is het volume-serienummer. Gevraagd is het serienummer van het apparaat zelf.', 'd4f02291': 'Dat is het volume-serienummer. Gevraagd is het serienummer van het apparaat zelf.', 'e:': 'Drie sticks kregen die dag letter E:. De letter wijst geen apparaat aan.' },
          why: 'Wie alleen op de stationsletter afgaat, wijst de PRIVE-stick aan, die net zo goed E: was. Door uitvoeringsbewijs (Prefetch met volume-serienummer) te koppelen aan de USB-geschiedenis, wijs je het juiste apparaat aan: het apparaat dat je bij een huiszoeking wilt vinden.',
          explain: 'WIPE-TOOL.EXE-3B1C55A0.pf noemt volume D4F02291. Dat volume (label TOOLS) werd om 14:38:22 gekoppeld voor apparaat 7F3C0009B2, een Generic Flash Disk die om 14:50 weer werd ontkoppeld. UserAssist bevestigt dat rene het programma via Verkenner startte.' },
      ],
    },

    {
      title: 'Taak 8 — Verdieping: wat een aanmelding in de event log je nog meer vertelt',
      kind: 'verdieping', optional: true,
      content: `
        <p>In taak 5 las je vooral welk event-ID er stond. Een 4624 of 4625 bevat veel meer velden. Twee daarvan maken het verschil tussen "er is ingelogd" en een verhaal dat je kunt uitleggen.</p>

        <h3>Logon type: hoe kwam iemand binnen?</h3>
        <table>
          <thead><tr><th>Type</th><th>Betekenis</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td>2</td><td>Interactief</td><td>Iemand achter het toetsenbord van de computer zelf</td></tr>
            <tr><td>3</td><td>Netwerk</td><td>Toegang tot een gedeelde map, of een tool die op afstand inlogt</td></tr>
            <tr><td>4</td><td>Batch</td><td>Een geplande taak</td></tr>
            <tr><td>5</td><td>Service</td><td>Een service die onder een account start</td></tr>
            <tr><td>7</td><td>Ontgrendelen</td><td>Het vergrendelde scherm weer openen</td></tr>
            <tr><td>10</td><td>Remote interactief</td><td>Extern bureaublad (RDP)</td></tr>
            <tr><td>11</td><td>Gecachet interactief</td><td>Inloggen met opgeslagen gegevens als de domeincontroller niet bereikbaar is</td></tr>
          </tbody>
        </table>
        <p>Een reeks type 3-pogingen vanaf een onbekend adres past bij een tool die wachtwoorden probeert. Type 10 vanaf internet betekent dat iemand via RDP binnenkwam. Type 2 betekent dat iemand fysiek achter de machine zat, of dat in elk geval zo leek.</p>

        <h3>Status en substatus: waarom mislukte het?</h3>
        <p>Een 4625 vertelt ook waarom de aanmelding mislukte. Het veld <code>Status</code> is vaak <code>0xC000006D</code> ("aanmelding mislukt"), en het veld <code>SubStatus</code> zegt preciezer wat er misging. Twee waarden die je veel ziet:</p>
        <ul>
          <li><code>0xC000006A</code>: het account bestaat, maar het wachtwoord is fout.</li>
          <li><code>0xC0000064</code>: het account bestaat niet.</li>
        </ul>
        <p>Daarmee lees je mee met de aanvaller. Een reeks met <code>0xC0000064</code> betekent dat hij namen gokt. Schakelt hij over op één naam met <code>0xC000006A</code>, dan weet hij welk account er is en gokt hij nu het wachtwoord. Andere waarden wijzen op een uitgeschakeld of vergrendeld account, of een verlopen wachtwoord.</p>

        <h3>4672 direct na 4624</h3>
        <p>Volgt een 4672 binnen een seconde op een 4624 voor hetzelfde account, dan kreeg die aanmelding beheerrechten. Bij een gewone gebruiker hoort dat niet. Bij een aanvaller die een beheerdersaccount heeft geraden, is het de eerste stap naar volledige controle over de machine.</p>

        <h3>Let op tijden</h3>
        <p>Het <code>.evtx</code>-bestand bewaart tijden in UTC. Exporteer je via Logboeken, dan krijg je de tijd van je eigen werkstation. Noteer daarom bij elke export in welke tijdzone de tijden staan.</p>
      `,
      questions: [
        { q: 'Welke accountnaam uit de log van taak 5 bestond niet op de machine?', answer: ['admin'],
          hints: ['Kijk naar het veld SubStatus van de 4625-regels.', 'Zoek de regel met 0xC0000064.', 'Het is een korte, Engelse naam en hij komt maar één keer voor.'],
          wrong: { 'administrator': 'Bij Administrator staat SubStatus 0xC000006A: het account bestaat, het wachtwoord was fout.', 'beheerder': 'Bij beheerder staat 0xC000006A: het account bestaat. Daarom bleef de aanvaller het proberen.' },
          explain: 'Alleen bij admin staat 0xC0000064. Daarna richt de aanvaller zich op namen die wel bestaan.' },
        { q: 'Welk logon type zou je zien als de aanvaller via extern bureaublad (RDP) was binnengekomen?', answer: ['10'],
          hints: ['Kijk in de tabel.', 'RDP is een remote, interactieve sessie.', 'Het is het hoogste getal op één na.'],
          wrong: { '3': 'Type 3 is netwerktoegang zonder bureaublad, zoals in deze zaak.', '2': 'Type 2 is achter het toetsenbord van de computer zelf.' },
          explain: 'Type 10 (RemoteInteractive). In deze zaak staat type 3: een tool die via het netwerk inlogde.' },
        { q: 'Een 4625-reeks bevat eerst twintig verschillende namen met SubStatus 0xC0000064 en daarna honderd pogingen op één naam met 0xC000006A. Wat is de beste lezing?',
          options: ['De aanvaller gokt eerst welke accounts bestaan, en daarna het wachtwoord van één bestaand account', 'Twintig gebruikers zijn hun wachtwoord vergeten', 'Het account is vergrendeld', 'Er is ingelogd met een verkeerd logon type'], answer: 0,
          wrong: { 1: 'Bij twintig echte gebruikers zou je bestaande accounts zien (0xC000006A), niet accounts die niet bestaan.', 2: 'Voor een vergrendeld account geeft Windows een andere substatus.', 3: 'Het logon type zegt hoe iemand inlogt, niet waarom het mislukt.' },
          explain: '0xC0000064 is "account bestaat niet", 0xC000006A is "verkeerd wachtwoord". De overgang laat zien dat de aanvaller een bestaand account heeft gevonden.' },
      ],
    },

    {
      title: 'Taak 9 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examenvragen over Windows-artefacten gaan bijna altijd over de vraag wat een spoor wel en niet bewijst. De afleiders zijn conclusies die te ver gaan ("dus is het uitgevoerd"), of bronnen die op het eerste gezicht hetzelfde zeggen maar iets anders meten. Vraag je bij elk antwoord af: welk artefact zegt dit precies, en wat zegt het niet?</p>
        <p>De vier vragen hieronder zijn voor deze room geschreven, in de stijl van zulke examens.</p>
      `,
      questions: [
        { q: 'Op een werkstation staat tool.exe in ShimCache. Er is geen Prefetch-bestand, Prefetch staat aan en er zijn veel andere .pf-bestanden. Wat schrijf je in je rapport?',
          options: ['tool.exe is uitgevoerd', 'tool.exe was op de schijf aanwezig; uitvoering is met deze bronnen niet aangetoond', 'tool.exe is nooit uitgevoerd', 'tool.exe is gewist om sporen te verbergen'], answer: 1,
          wrong: { 0: 'ShimCache bewijst aanwezigheid, geen uitvoering. Dit is precies de te sterke conclusie die bij een kritische vraag sneuvelt.', 2: 'Ook dat gaat te ver: een .pf-bestand kan gewist zijn. Afwezigheid van een spoor bewijst niets.', 3: 'Er is geen aanwijzing voor wissen. Je zou een verklaring verzinnen voor iets wat je niet hebt waargenomen.' },
          explain: 'Formuleer precies wat de bron zegt. Zoek daarna verder in Amcache, UserAssist of event 4688.' },
        { q: 'Een LNK-bestand wijst naar E:\\geheim.docx op een volume met serienummer 9A11-04C2. USBSTOR toont twee sticks die die dag allebei als E: zijn gekoppeld. Wat is de beste volgende stap?',
          options: ['De stick die het laatst was aangesloten aanwijzen', 'Het volume-serienummer koppelen aan een apparaat via een andere bron, of via de in beslag genomen sticks zelf', 'Concluderen dat het bestand van de C:-schijf kwam', 'De LNK negeren, want stationsletters zijn onbetrouwbaar'], answer: 1,
          wrong: { 0: 'Het laatst aangesloten apparaat is niet per se het apparaat van dit volume. Tijd en serienummer moeten allebei kloppen.', 2: 'De LNK zegt E: en een eigen volume-serienummer. Niets wijst op C:.', 3: 'De letter is onbetrouwbaar, het volume-serienummer niet. Juist dat maakt de LNK waardevol.' },
          explain: 'Het volume-serienummer is de sleutel. Vind je het terug bij een van de sticks, dan wijs je het apparaat aan.' },
        { q: 'Event Viewer op jouw werkstation in Nederland toont een 4624 om 14:12 in januari. Je collega in Londen ziet in dezelfde .evtx dezelfde aanmelding om 13:12. Wat is er aan de hand?',
          options: ['Een van de twee bestanden is gemanipuleerd', 'Event Viewer toont de tijd in de tijdzone van de computer waarop je kijkt; de UTC-tijd is 13:12', 'De aanmelding is twee keer gebeurd', 'Windows slaat tijden op in de tijdzone van de laptop van de verdachte'], answer: 1,
          wrong: { 0: 'Beide zien hetzelfde bestand. Het verschil zit in de weergave, niet in de data.', 2: 'Eén gebeurtenis, twee weergaven: het record-ID is hetzelfde.', 3: 'Event logs slaan tijden op in UTC. De weergave past zich aan je eigen computer aan.' },
          explain: 'In januari is Nederland UTC+1 en Londen UTC+0. Zet in je rapport alles om naar één tijdzone en vermeld welke.' },
        { q: 'Na een inbraak zie je event 1102 en daarna bijna niets meer in het Security-logboek. Wat is de juiste conclusie?',
          options: ['Er is na het wissen niets meer gebeurd', 'Het logboek is gewist; dat is zelf een aanwijzing voor kwade opzet, en je zoekt verder in andere bronnen', 'Event 1102 betekent dat het logboek vol was', 'De aanvaller kan geen Prefetch-sporen meer hebben achtergelaten'], answer: 1,
          wrong: { 0: 'Een leeg logboek na een wis-actie zegt alleen dat er niets is vastgelegd, of dat het is verwijderd.', 2: '1102 betekent dat het logboek is gewist, met daarbij het account dat het deed.', 3: 'Het wissen van een event log raakt Prefetch, Amcache, de registry en $UsnJrnl niet. Daar zoek je verder.' },
          explain: 'Gewiste logs zijn een spoor op zich. Andere artefacten vullen het gat: daarom combineer je bronnen.' },
      ],
    },
  ],

  terms: [
    { term: 'Artefact', def: 'Spoor dat Windows automatisch achterlaat bij normaal gebruik en dat als bewijs bruikbaar is.' },
    { term: 'Registry-hive', def: 'Bestand waarin een deel van de registry staat: SAM, SYSTEM, SOFTWARE of (per gebruiker) NTUSER.DAT en UsrClass.dat.' },
    { term: 'ShellBags', def: 'Registry-sporen (BagMRU) van mapnavigatie in Verkenner, ook van verwijderde of losgekoppelde locaties; lezen met SBECmd.' },
    { term: 'UserAssist', def: 'Registry-teller van via de GUI gestarte programma\'s, met aantal en laatste uitvoeringstijd (namen ROT13-gecodeerd).' },
    { term: 'Run-key', def: 'Registry-sleutel waarvan alles automatisch meestart bij inloggen; klassieke plek voor persistentie.' },
    { term: 'Prefetch', def: 'Snelheidsbestanden (.pf) in C:\\Windows\\Prefetch die uitvoering bewijzen, met run count, laatste uitvoeringstijden en volume-serienummer; lezen met PECmd.' },
    { term: 'Amcache', def: 'Artefact (Amcache.hve) met gegevens over programma\'s inclusief SHA-1, vaak ook na verwijdering; lezen met AmcacheParser.' },
    { term: 'ShimCache', def: 'AppCompatCache in de SYSTEM-hive; bewijst dat een bestand aanwezig was, niet per se dat het is uitgevoerd.' },
    { term: 'Execution evidence hierarchy', def: 'Rangorde van bewijs: Prefetch (en UserAssist) laten uitvoering zien, Amcache versterkt dat met de hash; ShimCache/ShellBags niet per se.' },
    { term: 'LNK-bestand', def: 'Snelkoppeling die pad, tijden en volume-serienummer van een geopend bestand bewaart; lezen met LECmd.' },
    { term: 'Jump List', def: 'Lijst met recent geopende bestanden per programma, zichtbaar via de taakbalk; lezen met JLECmd.' },
    { term: 'USBSTOR', def: 'Registry-locatie in de SYSTEM-hive met merk, model en serienummer van aangesloten USB-opslag.' },
    { term: 'Volume-serienummer', def: 'Nummer van het bestandssysteem op een schijf (verandert bij formatteren); verbindt LNK- en Prefetch-sporen met een specifiek volume.' },
    { term: 'Event-ID', def: 'Vast nummer per soort gebeurtenis in de Windows Event Logs, bijv. 4624 (login), 4625 (mislukt), 4720 (nieuw account), 4688 (proces), 7045 (service).' },
    { term: 'Logon type', def: 'Veld in 4624/4625 dat zegt hoe iemand inlogde, bijv. 2 (console), 3 (netwerk), 10 (RDP).' },
    { term: 'Eric Zimmerman-tools', def: 'Veelgebruikte gratis forensische tools: PECmd, AmcacheParser, SBECmd, LECmd, JLECmd, EvtxECmd, MFTECmd.' },
  ],

  resources: [
    { title: 'Eric Zimmerman — forensische tools (PECmd, AmcacheParser, SBECmd, LECmd, MFTECmd)', url: 'https://ericzimmerman.github.io/' },
    { title: 'SANS — Digital Forensics & Incident Response', url: 'https://www.sans.org/' },
    { title: 'Forensic Focus — artikelen over Windows-forensie', url: 'https://www.forensicfocus.com/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
});
