/* Room: Forensie gevorderd — tegenstrijdige sporen en misleidend bewijs */

// =======================================================================
//  Alles in deze room is FICTIEF: Havenlicht BV, server FS-02, de accounts,
//  documentatie-IP's (RFC 5737) en de bestanden zijn verzonnen.
// =======================================================================

const MPF_TIMELINE = [
  { t: '2026-09-14 07:58:02', src: 'Security', host: 'FS-02', user: 'svc_backup', desc: '4624 aanmelding type 3 (netwerk) vanaf 10.20.0.15 — dagelijkse back-up' },
  { t: '2026-09-14 08:00:00', src: 'Taakplanner', host: 'FS-02', desc: 'Taak "Nachtelijke back-up" gestart' },
  { t: '2026-09-14 08:41:19', src: 'Security', host: 'FS-02', user: 'j.vermeer', desc: '4624 aanmelding type 3 vanaf 10.20.1.33 (werkplek financiën)' },
  { t: '2026-09-14 16:05:44', src: 'USN', host: 'FS-02', desc: 'D:\\Financien\\Q3-rapportage.xlsx — DATA_OVERWRITE' },
  { t: '2019-03-07 10:22:15', src: 'MFT-$SI', host: 'FS-02', desc: 'C:\\Windows\\System32\\igfxtray.exe — aangemaakt ($STANDARD_INFORMATION)' },
  { t: '2019-03-07 10:22:15', src: 'MFT-$FN', host: 'FS-02', desc: 'C:\\Windows\\System32\\igfxtray.exe — aangemaakt ($FILE_NAME)' },
  { t: '2019-03-07 10:22:15', src: 'MFT-$SI', host: 'FS-02', desc: 'C:\\ProgramData\\Intel\\igfxsvc.exe — aangemaakt ($STANDARD_INFORMATION) — subseconden: .0000000' },
  { t: '2026-09-15 01:12:44', src: 'Security', host: 'FS-02', user: 'beheer.k', desc: '4624 aanmelding type 10 (RDP) vanaf 10.20.0.77 (jumphost)' },
  { t: '2026-09-15 01:13:30', src: 'Prefetch', host: 'FS-02', desc: 'RDPCLIP.EXE — uitvoering' },
  { t: '2026-09-15 01:14:09', src: 'MFT-$FN', host: 'FS-02', desc: 'C:\\ProgramData\\Intel\\igfxsvc.exe — aangemaakt ($FILE_NAME)' },
  { t: '2026-09-15 01:14:09', src: 'USN', host: 'FS-02', desc: 'igfxsvc.exe — FILE_CREATE' },
  { t: '2026-09-15 01:14:10', src: 'USN', host: 'FS-02', desc: 'igfxsvc.exe — DATA_EXTEND | CLOSE' },
  { t: '2026-09-15 01:15:30', src: 'USN', host: 'FS-02', desc: 'igfxsvc.exe — BASIC_INFO_CHANGE (tijdstempels/attributen gewijzigd)' },
  { t: '2026-09-15 01:16:02', src: 'Prefetch', host: 'FS-02', desc: 'IGFXSVC.EXE-3F1A2B7C.pf — eerste uitvoering' },
  { t: '2026-09-15 01:16:05', src: 'Sysmon', host: 'FS-02', desc: 'EID 3 — igfxsvc.exe maakt verbinding met 203.0.113.140:443' },
  { t: '2026-09-15 01:19:48', src: 'USN', host: 'FS-02', desc: 'C:\\ProgramData\\Intel\\cache.7z — FILE_CREATE' },
  { t: '2026-09-15 01:23:57', src: 'USN', host: 'FS-02', desc: 'cache.7z — DATA_EXTEND | CLOSE (1,8 GB)' },
  { t: '2026-09-15 01:24:30', src: 'Proxy', host: 'FS-02', desc: 'POST naar upload.opslagbox.example (198.51.100.23) — 1,8 GB uitgaand' },
  { t: '2026-09-15 01:38:12', src: 'USN', host: 'FS-02', desc: 'cache.7z — FILE_DELETE | CLOSE' },
  { t: '2026-09-15 01:40:03', src: 'Security', host: 'FS-02', user: 'beheer.k', desc: '4634 afmelding' },
  { t: '2026-09-15 07:58:01', src: 'Security', host: 'FS-02', user: 'svc_backup', desc: '4624 aanmelding type 3 vanaf 10.20.0.15 — dagelijkse back-up' },
  { t: '2026-09-15 08:00:00', src: 'Taakplanner', host: 'FS-02', desc: 'Taak "Nachtelijke back-up" gestart' },
  { t: '2026-09-15 09:12:40', src: 'Security', host: 'FS-02', user: 'j.vermeer', desc: '4624 aanmelding type 3 vanaf 10.20.1.33' },
];

// Een PNG van 69 bytes (1×1 pixel) met data ná het IEND-blok.
const MPF_PNG_HEX = '89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 01 00 00 00 01 08 02 00 00 00 90 77 53 de 00 00 00 0c 49 44 41 54 78 9c 63 90 f7 eb 02 00 01 87 00 f8 1d d3 d1 20 00 00 00 00 49 45 4e 44 ae 42 60 82 63 66 67 3d 54 6b 31 37 5a 47 46 30 59 56 39 75 59 56 39 70 5a 57 35 6b 66 51 3d 3d 3b 63 32 3d 62 6d 6c 6c 64 43 31 6b 61 58 51 3d';

CS.registerRoom({
  id: 'forensie-misleiding',
  path: 'meesterproeven',
  order: 2,
  title: 'Forensie gevorderd: tegenstrijdige sporen en misleidend bewijs',
  icon: '🧭',
  difficulty: 'Moeilijk',
  minutes: 95,
  summary: 'Een indringer heeft zijn sporen bewust verdoezeld: tijdstempels zijn vervalst, tijdzones lopen door elkaar, er zit data verstopt achter een plaatje en er liggen valse aanwijzingen over de dader. Jij zoekt de tegenstrijdigheden tussen bronnen, rekent tijden om, vindt de verborgen data en weegt de attributie met ACH — zonder in de val van het makkelijke verhaal te lopen.',
  objectives: [
    'Uitleggen wat timestomping is en het betrappen via de verschillen tussen $STANDARD_INFORMATION, $FILE_NAME, het USN-journaal en Prefetch',
    'Tijdstempels uit verschillende formaten en tijdzones naar één UTC-tijdlijn omrekenen',
    'Data die achter het einde van een bestand is geplakt herkennen in een hex-dump',
    'Valse aanwijzingen (false flags) herkennen en attributie wegen met ACH in plaats van op het eerste spoor te vertrouwen',
    'Bevindingen rapporteren met bronbeoordeling en eerlijke onzekerheid',
  ],
  terms: [
    { term: 'Anti-forensie', def: 'Alle technieken waarmee een dader sporen probeert te wissen, te verbergen of te vervalsen: logs wissen, tijdstempels wijzigen, data verstoppen of valse aanwijzingen achterlaten.' },
    { term: 'Timestomping', def: 'Het bewust wijzigen van de tijdstempels van een bestand, zodat het oud of onschuldig lijkt (MITRE ATT&CK T1070.006).' },
    { term: '$STANDARD_INFORMATION ($SI)', def: 'NTFS-attribuut met de tijdstempels die Verkenner toont. Gewone programma\'s kunnen ze via de Windows-API aanpassen.' },
    { term: '$FILE_NAME ($FN)', def: 'NTFS-attribuut met een tweede set tijdstempels, die alleen het besturingssysteem bijwerkt (bij aanmaken, hernoemen, verplaatsen). Moeilijker te vervalsen.' },
    { term: 'USN-journaal ($UsnJrnl)', def: 'Logboek van NTFS dat elke wijziging aan bestanden vastlegt (aanmaken, schrijven, hernoemen, attributen wijzigen), met eigen tijdstempels.' },
    { term: 'FILETIME', def: 'Windows-tijdformaat: het aantal intervallen van 100 nanoseconden sinds 1 januari 1601 (UTC).' },
    { term: 'Appended data', def: 'Data die achter het formele einde van een bestand is geplakt (bijv. na het IEND-blok van een PNG). Viewers negeren het; het bestand lijkt normaal.' },
    { term: 'False flag', def: 'Bewust achtergelaten aanwijzing die naar een andere dader wijst, zoals taal in de code of een tijdzone die niet klopt.' },
    { term: 'Diagnostisch bewijs', def: 'Bewijs dat verschil maakt tussen hypothesen. Bewijs dat bij alle hypothesen past, helpt niet bij de keuze.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — T1070.006 Timestomp', url: 'https://attack.mitre.org/techniques/T1070/006/' },
    { title: 'SANS — Windows Forensic Analysis poster', url: 'https://www.sans.org/posters/windows-forensic-analysis/' },
    { title: 'Nederlands Forensisch Instituut (NFI)', url: 'https://www.forensischinstituut.nl/' },
    { title: 'Wikipedia — Analysis of Competing Hypotheses (Heuer)', url: 'https://en.wikipedia.org/wiki/Analysis_of_competing_hypotheses' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Timestomping: als de tijdstempels liegen',
      content: `
        <p>Fileserver <strong>FS-02</strong> van het fictieve logistiekbedrijf <strong>Havenlicht BV</strong> stuurde 's nachts
        1,8 GB naar buiten. Het IT-team vond een onbekend programma, <code>C:\\ProgramData\\Intel\\igfxsvc.exe</code>, maar
        haalde de schouders op: "volgens Verkenner staat dat er al sinds 2019, dat is een Intel-driver." Klopt dat?</p>

        <h3>Twee sets tijdstempels in NTFS</h3>
        <p>Elk bestand in NTFS heeft in de Master File Table (MFT) minstens <strong>twee</strong> sets van vier tijdstempels
        (MACB: Modified, Accessed, Changed, Born):</p>
        <table>
          <thead><tr><th>Attribuut</th><th>Wie werkt het bij?</th><th>Te vervalsen?</th></tr></thead>
          <tbody>
            <tr><td><code>$STANDARD_INFORMATION</code> ($SI)</td><td>Bij bijna elke bewerking; dit toont Verkenner</td><td>Ja, met een gewone API-aanroep</td></tr>
            <tr><td><code>$FILE_NAME</code> ($FN)</td><td>Alleen het besturingssysteem, bij aanmaken, hernoemen of verplaatsen</td><td>Veel lastiger</td></tr>
          </tbody>
        </table>
        <p>Een dader die een tool "oud" wil laten lijken, past meestal alleen de $SI aan. Dan ontstaat een onmogelijke
        situatie: het bestand zou volgens $SI in 2019 geboren zijn, terwijl de $FN zegt: 2026.</p>

        <h3>Andere bronnen die niet meedoen met de leugen</h3>
        <ul>
          <li><strong>USN-journaal:</strong> legt het aanmaken (<code>FILE_CREATE</code>) vast, en ook het moment waarop
          tijdstempels worden gewijzigd (<code>BASIC_INFO_CHANGE</code>).</li>
          <li><strong>Prefetch:</strong> het moment waarop een programma voor het eerst draaide.</li>
          <li><strong>Subseconden:</strong> echte NTFS-tijden hebben een precisie van 100 ns, bijvoorbeeld
          <code>10:22:15.4831207</code>. Een tijdstempel van precies <code>.0000000</code> is verdacht: veel tools zetten alleen hele seconden.</li>
          <li><strong>Geleende tijden:</strong> daders kopiëren vaak de tijdstempel van een legitiem systeembestand ernaast.
          Een exact gelijke tijd tot op de seconde, bij een bestand dat veel later verscheen, is een sterke aanwijzing.</li>
        </ul>
        <div class="callout tip"><strong>Werkwijze:</strong> filter de tijdlijn op <code>igfx</code> en leg de bronnen naast
        elkaar. Welke bronnen zeggen 2019, welke 2026? Welke zou een dader makkelijk kunnen aanpassen?</div>
      `,
      lab: { type: 'timeline', title: 'Zaak 2026-311 — FS-02 (Havenlicht BV)', events: MPF_TIMELINE },
      questions: [
        { q: 'Welk bestand is getimestompt? (alleen de bestandsnaam)', answer: ['igfxsvc.exe'], hint: 'Zoek een bestand met $SI en $FN in verschillende jaren.', explain: '$SI zegt 2019-03-07, maar $FN, USN en Prefetch zeggen allemaal 15 september 2026.' },
        { q: 'Van welk legitiem bestand heeft de dader de tijdstempel geleend? (bestandsnaam)', answer: ['igfxtray.exe'], hint: 'Welk ander bestand heeft exact dezelfde tijd tot op de seconde?', explain: 'igfxtray.exe heeft $SI én $FN op 2019-03-07 10:22:15 — die is echt. igfxsvc.exe kreeg die tijd gekopieerd.' },
        { q: 'Wanneer is igfxsvc.exe echt aangemaakt? (UU:MM:SS op 15 september, UTC)', answer: ['01:14:09'], hint: 'Kijk naar $FN en FILE_CREATE in het USN-journaal.', explain: 'Om 01:14:09 UTC, twee minuten na de RDP-aanmelding van beheer.k.' },
        { q: 'Welke USN-gebeurtenis legt het vervalsen zelf vast?', answer: ['BASIC_INFO_CHANGE', 'basic_info_change'], hint: 'Om 01:15:30.', explain: 'BASIC_INFO_CHANGE: de tijdstempels of attributen werden gewijzigd, ruim een minuut na het aanmaken.' },
        { q: 'Waarom is het subseconden-deel ".0000000" verdacht?', options: ['Echte NTFS-tijden hebben een precisie van 100 ns, en veel vervalstools zetten alleen hele seconden', 'Omdat het bestand dan leeg is', 'Omdat Windows geen subseconden opslaat', 'Dat is niet verdacht'], answer: 0, explain: 'De kans dat een echte tijd precies op .0000000 valt, is klein. Moderne tools vervalsen ook subseconden, dus het is een aanwijzing, geen bewijs.' },
      ],
    },
    {
      title: 'Taak 2 — Eén tijdlijn, vijf klokken',
      content: `
        <p>De bronnen van een onderzoek spreken zelden dezelfde tijdtaal. Een tijdlijn is pas betrouwbaar als alles naar
        <strong>één referentie</strong> is omgerekend: in de forensie is dat altijd <strong>UTC</strong>.</p>
        <table>
          <thead><tr><th>Bron</th><th>Formaat</th><th>Valkuil</th></tr></thead>
          <tbody>
            <tr><td>NTFS, registry, eventlogs (intern)</td><td>FILETIME: 100-ns-intervallen sinds 1601-01-01 UTC</td><td>Tools tonen het soms in lokale tijd</td></tr>
            <tr><td>Chrome/Edge-geschiedenis</td><td>WebKit-tijd: microseconden sinds 1601-01-01 UTC</td><td>Lijkt op FILETIME, maar is 10× kleiner</td></tr>
            <tr><td>Linux, veel webapps</td><td>Unix-tijd: seconden sinds 1970-01-01 UTC</td><td>Soms in milliseconden</td></tr>
            <tr><td>Apache/nginx-logs</td><td><code>15/Sep/2026:03:16:05 +0200</code></td><td>Lokale tijd met de afwijking erbij: trek die af</td></tr>
            <tr><td>Logs zonder zone</td><td><code>2026-09-15 03:16:05</code></td><td>Onbekend! Zoek uit wat de klok van het systeem was</td></tr>
          </tbody>
        </table>
        <div class="callout warn"><strong>Zomertijd:</strong> Nederland is in de zomer UTC+2 (CEST) en in de winter UTC+1
        (CET). Een tijdlijn rond de laatste zondag van oktober bevat een uur dat twee keer voorkomt, en eind maart een uur dat
        niet bestaat. Rapporteer daarom altijd in UTC en noem de omrekening.</div>
        <p>Gebruik de omrekenaar hieronder voor de drie artefacten die het team aanleverde:</p>
        <ol>
          <li>Een registerwaarde <code>LastWrite</code> als FILETIME: <code>134339084490000000</code></li>
          <li>Een Edge-geschiedenisregel met <code>last_visit_time</code> = <code>13433909070000000</code></li>
          <li>Een regel uit de webserverlog van de dader: <code>[15/Sep/2026:03:16:05 +0200] "GET /beacon"</code></li>
        </ol>
        <p>Klopt het met de tijdlijn uit taak 1? Een tijdlijn die over meerdere bronnen consistent is, is sterk bewijs. Een
        tijdlijn waarin één bron uren afwijkt, betekent meestal: een verkeerde zone, geen vervalsing.</p>
      `,
      lab: { type: 'timestamp', value: '134339084490000000' },
      questions: [
        { q: 'Welke UTC-tijd is FILETIME 134339084490000000? (UU:MM:SS)', answer: ['01:14:09'], hint: 'Plak het getal in de omrekenaar en lees de FILETIME-regel.', explain: '2026-09-15 01:14:09 UTC: precies het echte aanmaakmoment van igfxsvc.exe.' },
        { q: 'Welke UTC-tijd is WebKit-tijd 13433909070000000? (UU:MM:SS)', answer: ['01:24:30'], hint: 'Kies de Chrome/WebKit-interpretatie.', explain: '01:24:30 UTC — het moment van de upload naar opslagbox.example in de proxylog.' },
        { q: 'De webserverlog zegt 03:16:05 +0200. Hoe laat is dat in UTC? (UU:MM:SS)', answer: ['01:16:05'], hint: 'Trek de afwijking van twee uur eraf.', explain: '03:16:05 − 2 uur = 01:16:05 UTC, dezelfde seconde als de eerste C2-verbinding in Sysmon.' },
        { q: 'Eén bron in je tijdlijn loopt precies één of twee uur achter op alle andere. Wat is de meest waarschijnlijke verklaring?', options: ['Een verkeerd geïnterpreteerde tijdzone of zomertijd', 'De dader heeft die bron vervalst', 'De bron is onbruikbaar', 'Er is data verloren'], answer: 0, explain: 'Een verschuiving van precies hele uren wijst bijna altijd op een zone-fout. Vervalsing levert zelden zo\'n nette afwijking.' },
      ],
    },
    {
      title: 'Taak 3 — Data achter het einde van een bestand',
      content: `
        <p>Op FS-02 stond naast de tool ook een klein plaatje, <code>logo.png</code>. Het opent normaal: een pixel. Maar het
        is 113 bytes groot, en een PNG van 1×1 pixel heeft er veel minder nodig. Waar zit de rest?</p>

        <h3>Hoe een PNG eindigt</h3>
        <p>Een PNG begint met een vaste handtekening (<code>89 50 4E 47 0D 0A 1A 0A</code>) en bestaat daarna uit
        <strong>blokken</strong> (chunks): lengte (4 bytes) · type (4 tekens) · data · CRC (4 bytes). Het laatste blok heet
        <code>IEND</code>, met lengte 0, dus altijd precies deze 12 bytes:</p>
<pre><code>00 00 00 00   49 45 4E 44   AE 42 60 82
lengte = 0    "IEND"        CRC</code></pre>
        <p>Alles wat daarna komt, wordt door elke viewer genegeerd. Dat maakt het een handige verstopplek, voor
        configuratie, een tweede bestand (bijvoorbeeld een ZIP, dan heet het een <em>polyglot</em>) of een boodschap.</p>

        <h3>Zo vind je het</h3>
        <ol>
          <li>Zoek in de hex-dump naar <code>49 45 4E 44</code> ("IEND"). Het blok eindigt 8 bytes na het begin van dat woord: 4 bytes type plus 4 bytes CRC (de lengte stond ervoor).</li>
          <li>Vergelijk die eindpositie met de bestandsgrootte. Is het bestand langer, dan is er data aangeplakt.</li>
          <li>Lees de ASCII-kolom: herken je codering? Base64 eindigt vaak op <code>=</code> of <code>==</code>.</li>
        </ol>
        <div class="callout info"><strong>Voor detectie:</strong> hetzelfde idee werkt bij JPEG (eindigt op
        <code>FF D9</code>), ZIP (end-of-central-directory) en PDF (<code>%%EOF</code>). Tools als <code>binwalk</code> en
        YARA-regels met <code>filesize</code> zoeken hier systematisch naar. Let op valse sporen: niet alles wat je vindt is
        het echte geheim.</div>
      `,
      lab: { type: 'hexviewer', filename: 'logo.png', hex: MPF_PNG_HEX },
      questions: [
        { q: 'Op welke offset (hexadecimaal, bv. 0x10) begint de aangeplakte data?', answer: ['0x45', '45', '0x0045', '69'], hint: 'Het IEND-blok eindigt met AE 42 60 82. Welke offset heeft de byte daarna?', explain: 'De echte PNG is 69 bytes (0x45); vanaf 0x45 begint de aangeplakte tekst "cfg=...".' },
        { q: 'De aangeplakte data bevat twee waarden. Decodeer de waarde achter cfg= (Base64). Wat is de vlag?', answer: ['NM{data_na_iend}'], encoded: true, hint: 'Kopieer de tekst tussen "cfg=" en ";" naar CyberChef → Base64 decoderen.', explain: 'Tk17ZGF0YV9uYV9pZW5kfQ== → NM{data_na_iend}. De waarde achter c2= decodeert naar "niet-dit": een afleiding.', xp: 25 },
        { q: 'Hoe heet een bestand dat tegelijk een geldige PNG én een geldig ander formaat (zoals ZIP) is?', answer: ['polyglot', 'een polyglot', 'polyglot bestand'], hint: 'Staat in de tekst.', explain: 'Een polyglot. Een ZIP wordt van achteren gelezen, een PNG van voren — beide kunnen in één bestand bestaan.' },
      ],
    },
    {
      title: 'Taak 4 — False flags: wie wil dat je denkt dat hij het was?',
      content: `
        <p>Drie dagen na de diefstal verschijnt de data op een leksite, met een losgeldeis. Het management wil vooral weten
        <strong>wie</strong> het was. Er liggen aanwijzingen die alle kanten op wijzen, en sommige zijn te mooi om waar te zijn.</p>

        <h3>Goedkope en dure aanwijzingen</h3>
        <p>Niet elke aanwijzing kost een dader evenveel moeite om te vervalsen:</p>
        <table>
          <thead><tr><th>Goedkoop te vervalsen</th><th>Duur te vervalsen</th></tr></thead>
          <tbody>
            <tr><td>Taal in commentaar of foutmeldingen</td><td>Hergebruik van dezelfde infrastructuur of betaaladressen over meerdere zaken</td></tr>
            <tr><td>Een compileertijd of tijdzone</td><td>Geldstromen die clusteren met eerdere zaken</td></tr>
            <tr><td>Een "handtekening" of groepsnaam</td><td>Een fysiek alibi, zoals een boardingpass met camerabeelden</td></tr>
            <tr><td>Een openbaar beschikbare tool</td><td>Unieke, niet-openbare code die al jaren door één groep wordt gebruikt</td></tr>
          </tbody>
        </table>
        <p>Een bekend voorbeeld is de aanval op de Olympische Winterspelen van 2018 ("Olympic Destroyer"): de code bevatte
        bewust kenmerken die naar andere landen wezen. Onderzoekers die alleen naar die kenmerken keken, trokken de verkeerde
        conclusie.</p>

        <h3>ACH: weerleggen in plaats van bevestigen</h3>
        <p>Met <strong>Analysis of Competing Hypotheses</strong> zet je alle hypothesen naast elkaar en scoor je elk bewijsstuk
        als consistent (C), inconsistent (I) of neutraal (N). Je kiest niet de hypothese met de meeste C's — die wint vaak
        door bewijs dat overal bij past — maar de hypothese met de <strong>minste I's</strong>. Bewijs dat in elke kolom C
        is, is <strong>niet diagnostisch</strong>: het voelt overtuigend, maar onderscheidt niets.</p>
        <div class="callout tip"><strong>Opdracht:</strong> vul de matrix eerst zelf in, en vergelijk daarna met het
        expertoordeel. Let bij elke regel op de vraag: "hoe duur was dit om te vervalsen?"</div>
      `,
      lab: {
        type: 'ach',
        question: 'Wie zit achter de diefstal en afpersing bij Havenlicht BV?',
        hypotheses: ['Financieel gemotiveerde criminele groep', 'Statelijke actor', 'Insider (beheer.k)'],
        evidence: [
          { text: 'RDP-aanmelding met account beheer.k om 01:12 vanaf de interne jumphost', expert: ['C', 'C', 'C'] },
          { text: 'Op de jumphost werd een week eerder een infostealer gevonden die beheerwachtwoorden buitmaakte', expert: ['C', 'C', 'I'] },
          { text: 'Beheer.k zat op dat moment aantoonbaar in een vliegtuig (boardingpass, camerabeelden, geen VPN-sessie)', expert: ['C', 'C', 'I'] },
          { text: 'Russischtalig commentaar in de tool; compileertijd valt in werkuren van UTC+3', expert: ['N', 'C', 'N'] },
          { text: 'De gestolen data wordt te koop aangeboden op een leksite, met een losgeldeis', expert: ['C', 'I', 'N'] },
          { text: 'De tool is een openbaar verkrijgbare RAT die door veel criminele groepen wordt gebruikt', expert: ['C', 'N', 'N'] },
          { text: 'Het betaaladres van het losgeld clustert met drie eerdere ransomwarezaken', expert: ['C', 'I', 'I'] },
        ],
      },
      questions: [
        { q: 'Welke hypothese heeft volgens het expertoordeel de minste inconsistenties?', options: ['Financieel gemotiveerde criminele groep', 'Statelijke actor', 'Insider (beheer.k)'], answer: 0, explain: 'Criminele groep: 0 I\'s. Statelijke actor: 2 (leksite met losgeld, clusterende betaaladressen). Insider: 3.' },
        { q: 'Welk bewijsstuk is niet diagnostisch?', options: ['De RDP-aanmelding met beheer.k vanaf de jumphost', 'Het alibi van beheer.k', 'Het clusterende betaaladres', 'De leksite met losgeldeis'], answer: 0, explain: 'Die aanmelding past bij alle drie de hypothesen (C, C, C): ze voelt belangrijk, maar onderscheidt niets.' },
        { q: 'Welk bewijsstuk is het goedkoopst te vervalsen en dus het meest verdacht als false flag?', options: ['Russischtalig commentaar en de compileertijd', 'De clusterende betaaladressen', 'Het alibi met camerabeelden', 'De geldstroom'], answer: 0, explain: 'Taal en tijdzone kosten een dader niets om aan te passen. Clusterende geldstromen over meerdere zaken zijn veel lastiger te faken.' },
        { q: 'Volgens welke regel kies je in ACH de sterkste hypothese?', options: ['De minste inconsistenties', 'De meeste consistente punten', 'De hypothese die het management verwacht', 'De eerste hypothese die opkwam'], answer: 0, explain: 'ACH weerlegt: een hypothese die nergens mee in strijd is, blijft overeind.' },
      ],
    },
    {
      title: 'Taak 5 — Rapporteren onder onzekerheid',
      content: `
        <p>Je bevindingen gaan naar de directie, de verzekeraar en mogelijk de politie. Elk van die lezers wil zekerheid,
        en die heb je niet volledig. Goed forensisch rapporteren betekent: <strong>scheid wat je waarneemt van wat je
        concludeert</strong>, beoordeel je bronnen, en druk onzekerheid uit in afgesproken woorden.</p>

        <h3>Waarneming, interpretatie, conclusie</h3>
        <ul>
          <li><strong>Waarneming:</strong> "$FN geeft 2026-09-15 01:14:09 UTC; $SI geeft 2019-03-07 10:22:15."</li>
          <li><strong>Interpretatie:</strong> "De $SI-tijd is vermoedelijk gewijzigd; het USN-journaal registreert om 01:15:30 een BASIC_INFO_CHANGE."</li>
          <li><strong>Conclusie (met waarschijnlijkheid):</strong> "Het is <em>zeer waarschijnlijk</em> dat igfxsvc.exe op 15 september is geplaatst en bewust oud is gemaakt."</li>
        </ul>

        <h3>Bronnen wegen met de Admiralty-code</h3>
        <p>Je beoordeelt de <strong>betrouwbaarheid van de bron</strong> (A–F) los van de <strong>geloofwaardigheid van de
        informatie</strong> (1–6). Een betrouwbare bron kan onjuiste informatie doorgeven, en een onbekende bron kan gelijk
        hebben. Beoordeel de vier meldingen in het lab.</p>
        <div class="callout warn"><strong>Valkuilen:</strong> <em>confirmation bias</em> (alleen zoeken naar wat je verhaal
        bevestigt), <em>anchoring</em> (vasthouden aan de eerste hypothese, zoals "het is een Intel-driver") en
        <em>autoriteitsbias</em> (het oordeel van de IT-manager zwaarder wegen dan het bewijs). Schrijf op welke alternatieven
        je hebt overwogen en waarom je ze verwierp.</div>
      `,
      lab: {
        type: 'admiralty',
        items: [
          { source: 'Eigen forensische kopie van de MFT en het USN-journaal van FS-02, met hashes vastgelegd', info: 'igfxsvc.exe is op 15 september 01:14:09 UTC aangemaakt', reliability: 'A', credibility: '1', explain: 'Eigen, geverifieerde meting, bevestigd door $FN, USN en Prefetch.' },
          { source: 'IT-manager van Havenlicht, mondeling', info: 'igfxsvc.exe is een Intel-driver die er al jaren staat', reliability: 'B', credibility: '5', explain: 'Normaal betrouwbare bron, maar de informatie wordt door het bewijs tegengesproken (onwaarschijnlijk).' },
          { source: 'Bericht op een leksite, geplaatst door de afpersers', info: 'Wij zijn een groep uit het buitenland en hebben 400 GB gestolen', reliability: 'E', credibility: '4', explain: 'Onbetrouwbare bron met belang bij overdrijving; de 400 GB past niet bij de 1,8 GB in de proxylog (twijfelachtig).' },
          { source: 'Luchtvaartmaatschappij, via een officiële vordering', info: 'Beheer.k zat tussen 23:40 en 03:10 UTC aan boord van een vlucht', reliability: 'A', credibility: '2', explain: 'Zeer betrouwbare bron; informatie waarschijnlijk juist en past bij de camerabeelden.' },
        ],
      },
      questions: [
        { q: 'De IT-manager zegt dat igfxsvc.exe een oude driver is. Welke geloofwaardigheid (1–6) krijgt die informatie?', answer: ['5'], hint: 'De informatie wordt door meerdere bronnen tegengesproken.', explain: '5 = onwaarschijnlijk: het bewijs uit $FN, USN en Prefetch spreekt het tegen, ook al is de bron normaal betrouwbaar.' },
        { q: 'Welke denkfout maakte het IT-team door bij "het is een Intel-driver" te blijven?', options: ['Anchoring', 'Base rate fallacy', 'Survivorship bias', 'Dunning-Kruger'], answer: 0, explain: 'Anchoring: vasthouden aan de eerste indruk (de $SI-tijd uit Verkenner) ondanks nieuw bewijs.' },
        { q: 'Ik scheid in mijn rapport waarneming, interpretatie en conclusie, en noem de alternatieven die ik verwierp.', noAnswer: true },
      ],
    },
  ],
});
