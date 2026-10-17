/* Room: Praktijkcase — de complete intelligence-workflow (afsluitend) */

// --- Super-timeline van het (fictieve) incident bij Noorderlicht Logistiek B.V. ---
// Alles fictief: documentatie-IP's (RFC 5737) en .nm.lab-domeinen.
// In de PowerShell-regel zit een Base64-opdracht; die decodeert naar de campagne-tag (vlag).
const INCIDENT_TIMELINE = [
  // Dag 1 — de gekochte toegang wordt één keer kort getest
  { t: '2026-09-14 02:14:07', src: 'VPN', host: 'VPN-GW', desc: 'Succesvolle VPN-login serviceaccount svc-backup vanaf 203.0.113.77 (buiten kantooruren)' },
  { t: '2026-09-14 02:16:22', src: 'VPN', host: 'VPN-GW', desc: 'svc-backup: geen MFA afgedwongen op dit serviceaccount' },
  { t: '2026-09-14 02:19:48', src: 'VPN', host: 'VPN-GW', desc: 'svc-backup logt uit — sessieduur ~5 min, daarna geen activiteit meer' },
  // Ruis (gewone werkdagen)
  { t: '2026-09-14 08:41:10', src: 'Security', host: 'WS-FIN-07', desc: '4624 aanmelding type 2 user j.bos (normale werkplek-login)' },
  { t: '2026-09-15 11:20:33', src: 'WSUS', host: 'SRV-UPD01', desc: 'Windows-updates uitgerold naar 48 werkplekken (gepland onderhoud)' },
  { t: '2026-09-16 13:02:57', src: 'Security', host: 'WS-FIN-07', desc: '4624 aanmelding type 2 user j.bos' },
  { t: '2026-09-16 17:58:04', src: 'VPN', host: 'VPN-GW', desc: 'VPN-login m.sari (thuiswerken, bekend apparaat)' },
  // Dag 4 — hands-on-keyboard (de affiliate is nu actief)
  { t: '2026-09-17 19:03:11', src: 'Security', host: 'WS-ADM-04', desc: '4624 aanmelding type 10 (RDP) svc-backup vanaf 10.20.3.12' },
  { t: '2026-09-17 19:05:40', src: 'Sysmon', host: 'WS-ADM-04', desc: 'ProcessCreate net.exe  CommandLine: net group "Domain Admins" /domain' },
  { t: '2026-09-17 19:06:12', src: 'Sysmon', host: 'WS-ADM-04', desc: 'ProcessCreate nltest.exe  CommandLine: nltest /dclist:noorderlicht.nm.lab' },
  { t: '2026-09-17 19:09:55', src: 'Sysmon', host: 'WS-ADM-04', desc: 'ProcessCreate powershell.exe -w hidden -enc U3RhZ2UyIGdlbGFkZW4gdmFuYWYgY2RuLXNsdWlzLm5tLmxhYjsgY2FtcGFnbmUtdGFnOiBOTXtzdGFnZV90d2VlX29udGh1bGR9' },
  { t: '2026-09-17 19:10:30', src: 'Proxy', host: 'WS-ADM-04', desc: 'GET hxxps://cdn-sluis[.]nineminds[.]lab/stage2  ->  203.0.113.91:443' },
  { t: '2026-09-17 19:14:03', src: 'Sysmon', host: 'WS-ADM-04', desc: 'ProcessAccess rundll32.exe -> lsass.exe  GrantedAccess=0x1010' },
  { t: '2026-09-17 19:14:20', src: 'EDR', host: 'WS-ADM-04', desc: 'ALERT HIGH  Credential.LsassAccess  Process=rundll32.exe' },
  { t: '2026-09-17 19:40:12', src: 'Analist', host: '-', desc: 'Handmatige notitie: het gat van ~3 dagen tussen de eerste toegang en de hands-on-keyboard-actie past bij koop-en-doorverkoop van toegang (IAB -> affiliate). NM{pauze_is_een_signaal}' },
  // Dag 5 — laterale beweging, exfiltratie, versleuteling
  { t: '2026-09-18 00:52:40', src: 'Security', host: 'SRV-FS02', desc: '4624 aanmelding type 10 (RDP) svc-backup vanaf WS-ADM-04' },
  { t: '2026-09-18 01:10:18', src: 'Sysmon', host: 'SRV-FS02', desc: 'ProcessCreate 7z.exe  CommandLine: 7z.exe a -p<redacted> C:\\Temp\\klanten.7z D:\\Shares\\Klanten' },
  { t: '2026-09-18 01:55:30', src: 'Proxy', host: 'SRV-FS02', desc: 'POST hxxps://opslag-cloud[.]nineminds[.]lab/upload  ->  192.0.2.60:443  BytesSent=2147483648' },
  // Korte pauze (~1,5 uur): de staging is klaar, de affiliate wacht
  { t: '2026-09-18 03:28:05', src: 'Sysmon', host: 'SRV-FS02', desc: 'ProcessCreate vssadmin.exe  CommandLine: vssadmin.exe delete shadows /all /quiet' },
  { t: '2026-09-18 03:30:11', src: 'FileAudit', host: 'SRV-FS02', desc: 'FileRename D:\\Shares\\Klanten\\contracten.xlsx -> contracten.xlsx.sluislock' },
  { t: '2026-09-18 03:30:12', src: 'FileAudit', host: 'SRV-FS02', desc: 'FileRename D:\\Shares\\Planning\\ritten.xlsx -> ritten.xlsx.sluislock' },
  { t: '2026-09-18 03:30:14', src: 'FileAudit', host: 'SRV-FS02', desc: 'FileCreate D:\\Shares\\Klanten\\KLANTEN_LEESMIJ.txt (losgeldbrief met Tor-portaal + wallet)' },
  { t: '2026-09-18 03:31:02', src: 'EDR', host: 'SRV-FS02', desc: 'ALERT HIGH  Behavior.MassFileEncrypt  Files=3187' },
];

// --- IOC-tekst voor de defang-oefening (alles fictief, gedefanged) ---
const INCIDENT_IOCS = `INTERN IOC-OVERZICHT — incident Noorderlicht Logistiek (TLP:AMBER)
Bron-IP VPN-login (gekochte toegang): 203.0.113[.]77
Stage2-download: hxxps://cdn-sluis[.]nineminds[.]lab/stage2  (203.0.113[.]91)
C2/stage2-host: cdn-sluis[.]nineminds[.]lab
Exfiltratie naar: hxxps://opslag-cloud[.]nineminds[.]lab/upload  (192.0.2[.]60)
Let op: 203.0.113[.]91 komt zowel bij de download als in het beacon-verkeer voor (tel één keer).
Afzender oorspronkelijke phishing (via de IAB): beheer[at]betaal-controle[.]nineminds[.]lab
Losgeld-wallet: bc1qfictief0alpha
Versleutelaar (SHA-256): 4f1c9b7a2e6d5038a1c4bb90de72f183ac05e9d1b7640c2fa38e91d6c7b4a502
`;

CS.registerRoom({
  id: 'praktijkcase-intel',
  path: 'intelligence',
  order: 7,
  title: 'Praktijkcase: de complete workflow',
  icon: '🧩',
  difficulty: 'Moeilijk',
  minutes: 80,
  summary: 'Eén samenhangende, fictieve ransomware-casus van begin tot eind. Je bouwt de tijdlijn, ontleedt de aanval als crime script, mapt de waarnemingen op MITRE ATT&CK, pivoteert op de infrastructuur, weegt de attributie met ACH, defangt de indicatoren en levert een BLUF-eindproduct. De hele intelligence-workflow in één werkproces.',
  objectives: [
    'Een incident reconstrueren als tijdlijn en pauzes (dwell time) lezen als signaal',
    'Een aanval ontleden als crime script en per fase een interventie kiezen',
    'Waarnemingen koppelen aan de juiste MITRE ATT&CK-techniek',
    'Pivoteren op infrastructuur en de zeldzaamheid van een dwarsverband toetsen',
    'Attributie afwegen met ACH en de valkuil "tool = actor" vermijden',
    'Indicatoren veilig defangen en een BLUF-intelligenceproduct schrijven met eigenaar per advies',
  ],
  terms: [
    { term: 'Initial Access Broker (IAB)', def: 'Crimineel die toegang tot gehackte netwerken verkoopt (bijvoorbeeld VPN- of RDP-inloggegevens), vaak op criminele fora.' },
    { term: 'Ransomware-as-a-Service (RaaS)', def: 'Afpersingssoftware die als dienst wordt verhuurd: de makers leveren de malware en infrastructuur, affiliates voeren de aanvallen uit en delen de opbrengst.' },
    { term: 'Affiliate', def: 'Een "huurder" van een RaaS die de daadwerkelijke inbraak en versleuteling uitvoert; dezelfde RaaS kan door tientallen verschillende affiliates worden ingezet.' },
    { term: 'Dubbele afpersing (double extortion)', def: 'Data eerst stelen en dan pas versleutelen, zodat je zowel met verlies van toegang als met publicatie op een leksite kunt dreigen.' },
    { term: 'Dwell time', def: 'De tijd tussen de eerste toegang van een aanvaller en het moment dat hij wordt opgemerkt of toeslaat; een opvallende pauze is vaak een signaal.' },
    { term: 'Crime script', def: 'Het delict beschreven als een draaiboek in fasen (Cornish), zodat je per fase kunt zien waar je de keten kunt breken.' },
    { term: 'ATT&CK-mapping', def: 'Het koppelen van een waargenomen handeling aan een techniek met een vast ID (zoals T1003.001) in de MITRE ATT&CK-kennisbank.' },
    { term: 'Pivoten', def: 'Van het ene kenmerk naar het andere springen (domein -> IP -> certificaat -> ...) om verborgen verbanden tussen zaken bloot te leggen.' },
    { term: 'Certificate transparency', def: 'Openbare logs van uitgegeven TLS-certificaten (bijvoorbeeld via crt.sh), waarmee je een hergebruikt certificaat over meerdere domeinen kunt terugvinden.' },
    { term: 'Zeldzaamheidstoets', def: 'De vraag of een gedeeld kenmerk zeldzaam genoeg is om een echte link te zijn: een hergebruikt certificaat zegt meer dan een gedeelde hostingprovider.' },
    { term: 'ACH', def: 'Analysis of Competing Hypotheses: je legt hypothesen naast elkaar en weerlegt ze; de hypothese met de minste inconsistenties blijft het langst overeind.' },
    { term: 'Tool = actor (valkuil)', def: 'De denkfout dat dezelfde tool of RaaS automatisch dezelfde dader betekent; gedeelde tooling is een aanwijzing, geen bewijs van identiteit.' },
    { term: 'BLUF', def: 'Bottom Line Up Front: de conclusie en het advies staan bovenaan, de onderbouwing eronder.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — kennisbank van aanvalsgedrag', url: 'https://attack.mitre.org/' },
    { title: 'crt.sh — zoeken in certificate transparency-logs', url: 'https://crt.sh/' },
    { title: 'No More Ransom — gratis decryptietools en preventie', url: 'https://www.nomoreransom.org/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De casus en de tijdlijn',
      content: `
        <p>Welkom bij de eindopdracht van dit leerpad. Dit is geen nieuwe theorie, maar de <strong>complete
        intelligence-workflow</strong> toegepast op één samenhangende casus. Je werkt als analist bij een (fictief)
        opsporings- en responseteam. Alles in deze room is <strong>verzonnen</strong>: de IP-adressen zijn
        documentatie-adressen, de domeinen eindigen op <code>.nm.lab</code>, en je werkt met bewijsmateriaal dat
        rechtmatig is veiliggesteld. Je valt niets aan; je <em>analyseert</em>.</p>

        <h3>De casus</h3>
        <p><strong>Noorderlicht Logistiek B.V.</strong> is een middelgroot transportbedrijf. Op 18 september meldt het
        bedrijf dat bestanden op de fileservers versleuteld zijn en dat er een losgeldbrief is achtergelaten. Jij krijgt
        de logs en gaat reconstrueren wat er is gebeurd. Uit het eerste beeld blijkt een patroon dat je dit hele hoofdstuk
        zult uitwerken: iemand kocht <strong>toegang</strong> tot het netwerk (bij een <em>Initial Access Broker</em>),
        een <strong>RaaS-affiliate</strong> gebruikte die toegang om binnen te komen, stal eerst data
        (<strong>exfiltratie</strong>) en versleutelde daarna de bestanden (<strong>dubbele afpersing</strong>).</p>

        <h3>Het verschil tussen weten, afleiden en aannemen</h3>
        <p>Een goede analist labelt elke bewering. Je gebruikt dit label de hele room:</p>
        <ul>
          <li><strong>Bekend</strong> — een feit of directe waarneming uit de logs ("om 03:28 draaide
          <code>vssadmin delete shadows</code>").</li>
          <li><strong>Afgeleid</strong> — een analytische conclusie uit meerdere waarnemingen ("de data is vóór de
          versleuteling weggesluisd, dus er is sprake van dubbele afpersing").</li>
          <li><strong>Aanname</strong> — iets wat je (nog) niet kunt bewijzen ("de affiliate zit vermoedelijk in een
          andere tijdzone").</li>
        </ul>

        <h3>Bouw de tijdlijn — en let op de pauzes</h3>
        <p>In het lab hieronder staat de <strong>super-timeline</strong>: gebeurtenissen uit verschillende bronnen
        (VPN-gateway, Windows Security, Sysmon, de proxy, de EDR en een analistennotitie) op tijd gesorteerd. Lees van
        boven naar beneden. Let vooral op de kolom <strong>&Delta;</strong> (de tijd sinds de vorige gebeurtenis):
        <strong>een onverwachte pauze is zelf informatie</strong>. In deze casus zie je een gat van ongeveer drie dagen
        tussen de allereerste VPN-login (14 september, kort getest) en het moment dat er echt op het toetsenbord wordt
        gewerkt (17 september). Zo'n gat past precies bij <em>koop-en-doorverkoop</em>: de broker testte de toegang even,
        verkocht hem, en pas later ging de affiliate aan de slag.</p>

        <p>In de tijdlijn zit ook een <strong>PowerShell-regel met <code>-enc</code></strong>: de affiliate heeft een
        opdracht in Base64 gecodeerd. Decodeer die string (bijvoorbeeld met de CyberChef-achtige decoder uit een eerdere
        room) en je vindt de campagne-tag die de aanvaller achterliet.</p>

        <div class="callout tip"><strong>Startschot:</strong> als bewijs dat je de workflow bent gestart, krijg je de
        eerste vlag cadeau: <code>NM{de_complete_workflow}</code>. De rest verdien je onderweg.</div>

        <div class="callout danger"><strong>Ethiek:</strong> je reconstrueert en duidt bewijs dat rechtmatig is
        veiliggesteld. Pivoten doe je passief, op open bronnen en in een afgeschermde omgeving — nooit door de
        infrastructuur van een verdachte actief te benaderen (opsec, en de kaders van art. 126j Sv en de Wet
        politiegegevens). Nabouwen van aanvalstechnieken mag alleen in je eigen lab of met schriftelijke toestemming.</div>
      `,
      lab: { type: 'timeline', title: 'Incident Noorderlicht Logistiek — super-timeline', events: INCIDENT_TIMELINE },
      questions: [
        { q: 'Hoeveel dagen zit er ongeveer tussen de eerste VPN-login (14 sep) en de hands-on-keyboard-activiteit (17 sep)?', answer: ['3', '3 dagen', 'drie', 'drie dagen'], hint: 'Kijk naar de datums en naar de grote Δ in het lab.', explain: 'Het gat van ~3 dagen (bekend) wijst erop dat de toegang eerst is gekocht en pas later gebruikt (afgeleid): een IAB verkocht aan een affiliate.' },
        { q: 'Welke vlag staat in de handmatige analistennotitie in de tijdlijn?', answer: ['NM{pauze_is_een_signaal}'], hint: 'Filter in het lab op de bron "Analist" of op het woord notitie.', explain: 'De notitie onderstreept de les: een opvallende pauze (dwell time) is zelf een aanwijzing.' },
        { q: 'Decodeer de Base64 in het powershell -enc commando. Wat is de campagne-tag (vlag)?', answer: ['NM{stage_twee_onthuld}'], encoded: true, hint: 'Kopieer de lange string na -enc en haal hem door een Base64-decoder.', explain: 'De Base64 decodeert naar: "Stage2 geladen vanaf cdn-sluis.nm.lab; campagne-tag: NM{stage_twee_onthuld}".' },
        { q: 'Wat is de startvlag van deze praktijkcase?', answer: ['NM{de_complete_workflow}'], hint: 'Staat in de tip-callout als startschot.', explain: 'De startvlag is NM{de_complete_workflow}.' },
      ],
    },

    {
      title: 'Taak 2 — De aanval als crime script',
      content: `
        <p>Nu je weet wat er is gebeurd, ontleed je het delict als een <strong>crime script</strong> (naar Derek
        Cornish). Een crime script beschrijft de misdaad als een draaiboek in fasen. Waarom is dat handig? Omdat je per
        fase een <strong>interventie</strong> kunt kiezen: één schakel breken is vaak genoeg om de hele keten te laten
        mislukken. Precies zoals de Pyramid of Pain: je zoekt de plek waar ingrijpen de aanvaller het meeste pijn doet.</p>

        <h3>De zes fasen toegepast op Noorderlicht</h3>
        <table>
          <thead><tr><th>Fase</th><th>Wat er in deze casus gebeurde (bekend/afgeleid)</th></tr></thead>
          <tbody>
            <tr><td><strong>1 · Voorbereiding</strong></td><td>De IAB verzamelt via phishing geldige VPN-inloggegevens en biedt de toegang te koop aan (afgeleid uit het ~3-daagse gat).</td></tr>
            <tr><td><strong>2 · Toegang / entree</strong></td><td>De affiliate logt in op de VPN met het account <code>svc-backup</code> zonder MFA (bekend).</td></tr>
            <tr><td><strong>3 · Voorbereidende handeling</strong></td><td>Verkenning (<code>net group</code>, <code>nltest</code>), stage2 downloaden, LSASS uitlezen (bekend).</td></tr>
            <tr><td><strong>4 · Uitvoering</strong></td><td>Laterale beweging via RDP, data inpakken met 7-Zip, exfiltreren naar een clouddienst (bekend).</td></tr>
            <tr><td><strong>5 · Na afloop</strong></td><td>Schaduwkopieën wissen, bestanden versleutelen, losgeldbrief plaatsen (bekend).</td></tr>
            <tr><td><strong>6 · Cash-out / witwassen</strong></td><td>Losgeld eisen via een Tor-portaal en cryptowallet; dreigen met publicatie op een leksite (bekend/afgeleid).</td></tr>
          </tbody>
        </table>

        <h3>Van fase naar interventie</h3>
        <p>Bij elke fase hoort een maatregel die de keten breekt, en een <strong>eigenaar</strong> die hem uitvoert.
        Een paar voorbeelden: in fase 2 dwingt het bedrijf <strong>MFA op alle accounts</strong> af (eigenaar: IT); in
        fase 1 verstoort de politie of een provider het <strong>handelsplatform van de IAB</strong> (eigenaar:
        opsporing/hostingpartij); in fase 5 beperken <strong>offline, onveranderbare back-ups</strong> de schade
        (eigenaar: IT/CISO). Zo koppel je elke fase aan een concrete actie.</p>

        <p>Vul in het lab hieronder het crime script in. Beschrijf per fase de handeling, de actoren, de middelen, de
        locatie, de randvoorwaarden en de sporen — en bedenk per fase een interventie. Klik daarna op
        <em>Controleer volledigheid</em>. Een modeluitwerking zit onder de knop.</p>

        <div class="callout info"><strong>Waarom fasen?</strong> Een losse maatregel ("blokkeer dit IP") helpt even. Een
        maatregel die een hele fase onmogelijk maakt (MFA, waardoor gestolen wachtwoorden waardeloos worden) helpt tegen
        de hele klasse van aanvallen.</div>
      `,
      lab: {
        type: 'crimescript',
        scenario: 'Ransomware-aanval op Noorderlicht Logistiek: gekochte toegang (IAB) -> RaaS-affiliate -> exfiltratie -> versleuteling -> afpersing.',
        model: `<table><thead><tr><th>Fase</th><th>Kern</th><th>Interventie (eigenaar)</th></tr></thead><tbody>
          <tr><td>1 Voorbereiding</td><td>IAB phisht VPN-gegevens en verkoopt toegang</td><td>Handelsplatform verstoren (opsporing/hoster); phishingweerbaarheid trainen (CISO)</td></tr>
          <tr><td>2 Entree</td><td>VPN-login svc-backup, geen MFA</td><td>MFA afdwingen op álle accounts (IT)</td></tr>
          <tr><td>3 Voorbereidend</td><td>Discovery + LSASS dumpen</td><td>LSASS-bescherming, EDR-detectie op credential access (SOC)</td></tr>
          <tr><td>4 Uitvoering</td><td>RDP lateraal, 7z-archief, exfil naar cloud</td><td>RDP-segmentatie, uitgaande DLP/egress-filtering (IT/SOC)</td></tr>
          <tr><td>5 Na afloop</td><td>Shadow copies wissen, versleutelen</td><td>Offline/immutable back-ups, snelle respons (IT/CISO)</td></tr>
          <tr><td>6 Cash-out</td><td>Losgeld via wallet, leksite-dreiging</td><td>Nooit blind betalen; wallet volgen bij exchange als knelpunt (opsporing)</td></tr>
        </tbody></table>`,
      },
      questions: [
        { q: 'In welke fase van het crime script hoort "toegang kopen bij een IAB" vooral thuis?', options: ['Voorbereiding', 'Uitvoering', 'Na afloop', 'Cash-out'], answer: 0, explain: 'Het regelen van toegang is een voorbereidende handeling, nog voordat de affiliate echt binnenkomt.' },
        { q: 'Welke interventie maakt gestolen wachtwoorden in fase 2 (entree) in één klap veel minder waard?', answer: ['MFA', 'multifactorauthenticatie', 'tweestapsverificatie', 'twee-factor', 'mfa afdwingen'], hint: 'Een tweede factor naast het wachtwoord.', explain: 'Met MFA is een los wachtwoord (ook een gekocht wachtwoord) niet meer genoeg om in te loggen.' },
        { q: 'Waarom werk je met fasen in plaats van losse maatregelen?', options: ['Omdat je dan per fase de zwakste schakel en een eigenaar kunt kiezen', 'Omdat fasen sneller zijn', 'Omdat het verplicht is van de AVG', 'Dat maakt niet uit'], answer: 0, explain: 'Per fase ingrijpen laat je de hele keten breken en maakt duidelijk wie wat moet doen.' },
        { q: 'Ik heb het crime script per fase ingevuld, met een interventie en een eigenaar.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 3 — De waarnemingen op MITRE ATT&CK',
      content: `
        <p>Het crime script vertelt het <em>verhaal</em>. Voor detectie en voor delen met anderen heb je een
        <strong>gemeenschappelijke taal</strong> nodig: MITRE ATT&amp;CK. Je koppelt elke concrete waarneming (een
        <strong>bekend</strong> feit uit de logs) aan een <strong>techniek</strong> met een vast ID. Let op het verschil:
        een <em>tactiek</em> is het doel (waarom), een <em>techniek</em> is de manier (hoe). Kies in het lab steeds de
        techniek, niet alleen de tactiek.</p>

        <h3>Van log naar techniek</h3>
        <p>Een paar voorbeelden uit deze casus, zodat je het patroon ziet:</p>
        <ul>
          <li><code>powershell.exe -w hidden -enc ...</code> is uitvoering via een scripttaal, specifiek PowerShell.</li>
          <li><code>rundll32.exe</code> dat <code>lsass.exe</code> opent (GrantedAccess 0x1010) is het uitlezen van
          inloggegevens uit het LSASS-geheugen.</li>
          <li>Een <code>4624</code>-aanmelding <strong>type 10 (RDP)</strong> met een gestolen account op een andere
          machine is laterale beweging via Remote Desktop.</li>
        </ul>

        <p>In het lab hieronder staan tien waarnemingen uit de tijdlijn. Kies bij elke waarneming de juiste
        ATT&amp;CK-techniek uit de bank. Bij <em>Controleer</em> zie je de naam en de tactiek erbij. Alle ID's komen uit
        de officiële ATT&amp;CK-kennisbank (zie de bron onderaan de room).</p>

        <div class="callout warn"><strong>Let op de context:</strong> dezelfde techniek kan bij meerdere tactieken horen.
        Een geplande taak kan code uitvoeren én persistentie geven. Het doel in de situatie bepaalt de tactiek.</div>

        <div class="callout tip"><strong>Waarom mappen?</strong> Zodra je waarnemingen in ATT&amp;CK-taal zet, kun je ze
        vergelijken met andere incidenten, gaten in je detectie vinden en je rapport leesbaar maken voor elk ander SOC.</div>
      `,
      lab: {
        type: 'attackmap',
        items: [
          { desc: 'Het serviceaccount svc-backup logt in op de VPN met geldige, eerder gestolen inloggegevens (bij een IAB gekocht).', code: 'T1078', explain: 'Valid Accounts: geldige accounts zijn lastig te detecteren, want de login is technisch "correct". Je herkent ze aan afwijkend gedrag.' },
          { desc: 'De inloggegevens werden oorspronkelijk buitgemaakt met een phishingmail met een kwaadaardige bijlage.', code: 'T1566.001', explain: 'Spearphishing Attachment (Initial Access): de oorspronkelijke toegangsmethode van de IAB.' },
          { desc: 'powershell.exe -w hidden -enc <base64> start een verborgen, gecodeerde opdracht.', code: 'T1059.001', explain: 'PowerShell (Execution): -enc verhult de opdracht in Base64.' },
          { desc: 'net group "Domain Admins" /domain en nltest /dclist worden gebruikt om accounts en domeincontrollers te vinden.', code: 'T1087', explain: 'Account Discovery (Discovery): de aanvaller verkent wie de beheerders en DC\'s zijn.' },
          { desc: 'rundll32.exe opent lsass.exe (GrantedAccess 0x1010) om wachtwoorden uit het geheugen te lezen.', code: 'T1003.001', explain: 'LSASS Memory (Credential Access): inloggegevens uit het LSASS-proces dumpen.' },
          { desc: 'Met het gestolen account wordt via RDP ingelogd op fileserver SRV-FS02.', code: 'T1021.001', explain: 'Remote Desktop Protocol (Lateral Movement): zijdelings bewegen met geldige toegang.' },
          { desc: '7z.exe pakt de map D:\\Shares\\Klanten in één wachtwoordbeveiligd archief.', code: 'T1560', explain: 'Archive Collected Data (Collection): data inpakken vóór exfiltratie.' },
          { desc: 'Vlak vóór de versleuteling wordt 2 GB geüpload naar een externe cloud-opslagdienst.', code: 'T1567', explain: 'Exfiltration Over Web Service (Exfiltration): wegsluizen via een legitiem ogende clouddienst — de basis van dubbele afpersing.' },
          { desc: 'vssadmin.exe delete shadows /all /quiet verwijdert de schaduwkopieën.', code: 'T1490', explain: 'Inhibit System Recovery (Impact): herstel onmogelijk maken zodat betalen aantrekkelijker lijkt.' },
          { desc: 'Bestanden op de shares worden massaal hernoemd en versleuteld (.sluislock).', code: 'T1486', explain: 'Data Encrypted for Impact (Impact): de daadwerkelijke versleuteling.' },
        ],
      },
      questions: [
        { q: 'Welk techniek-ID hoort bij het uitlezen van LSASS-geheugen?', answer: ['T1003.001'], hint: 'Credential Access, sub-techniek van OS Credential Dumping.', explain: 'T1003.001 (LSASS Memory) valt onder Credential Access.' },
        { q: 'Welk techniek-ID past bij het uploaden van data naar een externe clouddienst vóór de versleuteling?', answer: ['T1567'], hint: 'Exfiltration Over Web Service.', explain: 'T1567 (Exfiltration Over Web Service): wegsluizen via een webdienst, hét kenmerk van dubbele afpersing.' },
        { q: 'Het inloggen met een geldig maar gestolen serviceaccount is in ATT&CK vooral welke techniek?', options: ['T1078 Valid Accounts', 'T1486 Data Encrypted for Impact', 'T1083 File and Directory Discovery', 'T1110 Brute Force'], answer: 0, explain: 'T1078 Valid Accounts: geen bruteforce, maar misbruik van echte inloggegevens — technisch een "normale" login.' },
        { q: 'Wat is in ATT&CK het verschil tussen een tactiek en een techniek?', options: ['Een tactiek is het doel (waarom), een techniek de manier (hoe)', 'Een tactiek is een stuk malware', 'Een techniek is altijd een tool', 'Er is geen verschil'], answer: 0, explain: 'Tactiek Credential Access (doel) vs. techniek LSASS Memory (manier).' },
      ],
    },

    {
      title: 'Taak 4 — Pivoten op de infrastructuur',
      content: `
        <p>De IAB die de toegang verkocht, gebruikte phishing. Die phishinginfrastructuur laat sporen na, en die sporen
        kun je volgen. <strong>Pivoten</strong> is van het ene kenmerk naar het andere springen — domein &rarr; IP
        &rarr; certificaat &rarr; e-mail &rarr; wallet — om verborgen verbanden tussen zaken te vinden. Je doet dit
        <strong>passief</strong>: je raadpleegt open bronnen (WHOIS/RIPEstat, passive DNS, certificate transparency via
        crt.sh), je benadert de infrastructuur van de verdachte nooit zelf (opsec).</p>

        <h3>Twee zaken, één dwarsverband</h3>
        <p>In het lab staan twee fictieve phishingzaken. <strong>Zaak Alpha</strong> is de infrastructuur waarmee de IAB
        de inloggegevens van Noorderlicht stal (<code>betaal-controle.nm.lab</code>). <strong>Zaak Bravo</strong> is een
        losse phishingzaak van een ander team (<code>inlog-verificatie.nm.lab</code>). Op het eerste gezicht lijken ze
        niet verbonden: ze draaien op <em>verschillende</em> IP-adressen. Jouw taak: vind het kenmerk dat ze tóch
        verbindt.</p>

        <h3>De zeldzaamheidstoets</h3>
        <p>Niet elk gedeeld kenmerk is bewijs. Je ziet in het lab dat beide IP-adressen bij <strong>dezelfde hostingprovider
        (ASN)</strong> horen. Verleidelijk, maar zwak: duizenden onschuldige websites delen dezelfde hoster. Dat is net
        zoiets als "beide verdachten woonden in Nederland". Een <strong>hergebruikt TLS-certificaat</strong> daarentegen is
        <em>zeldzaam</em>: dezelfde certificaat-fingerprint op twee los lijkende domeinen is een sterke aanwijzing dat
        dezelfde hand erachter zit. Dat is de kern van de zeldzaamheidstoets: <strong>hoe zeldzamer het gedeelde kenmerk,
        hoe sterker de link</strong>.</p>

        <p>Pivoteer in het lab door de entiteiten aan te klikken, let op <strong>tijd</strong> en <strong>herkomst</strong>
        bij elke relatie, en typ het bruggende kenmerk in. Let op: de brug is het <em>zeldzame</em> kenmerk, niet het
        gedeelde ASN.</p>

        <div class="callout tip"><strong>Beloning:</strong> herken je dat het certificaat (en niet de hostingprovider) de
        echte brug is, dan verdien je de vlag <code>NM{zeldzaamheid_boven_toeval}</code>.</div>

        <div class="callout warn"><strong>Blijf kritisch (bekend/afgeleid/aanname):</strong> "beide domeinen presenteren
        certificaat A1B2C3D4" is <em>bekend</em>. "Dezelfde actor beheert beide" is <em>afgeleid</em>. "Het is dezelfde
        persoon als in zaak X vorig jaar" zou een <em>aanname</em> zijn tot je meer zeldzame overlap vindt.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'Zaak Alpha (IAB-phishing) vs. Zaak Bravo',
        scenario: 'Zaak Alpha stal de VPN-gegevens van Noorderlicht. Zaak Bravo is een losse phishingzaak. Wat verbindt ze? Toets de zeldzaamheid van elk gedeeld kenmerk.',
        entities: [
          { id: 'dA', type: 'domain', label: 'betaal-controle.nm.lab' },
          { id: 'ipA', type: 'ip', label: '203.0.113.10' },
          { id: 'dB', type: 'domain', label: 'inlog-verificatie.nm.lab' },
          { id: 'ipB', type: 'ip', label: '198.51.100.20' },
          { id: 'cert', type: 'cert', label: 'A1B2C3D4' },
          { id: 'wal', type: 'wallet', label: 'bc1qfictief0alpha' },
          { id: 'mail', type: 'email', label: 'beheer@betaal-controle.nm.lab' },
          { id: 'asn', type: 'asn', label: 'AS64500 FictiefHost' },
        ],
        edges: [
          { from: 'dA', to: 'ipA', rel: 'resolvet naar', time: '2026-01', source: 'passive DNS' },
          { from: 'dA', to: 'cert', rel: 'presenteert cert', time: '2026-01', source: 'crt.sh' },
          { from: 'dA', to: 'mail', rel: 'WHOIS-contact', time: '2026-01', source: 'WHOIS' },
          { from: 'dA', to: 'wal', rel: 'losgeld-adres', time: '2026-01', source: 'rapport' },
          { from: 'dB', to: 'ipB', rel: 'resolvet naar', time: '2026-02', source: 'passive DNS' },
          { from: 'dB', to: 'cert', rel: 'presenteert cert', time: '2026-02', source: 'crt.sh' },
          { from: 'ipA', to: 'asn', rel: 'hoort bij (hosting)', time: '2026-01', source: 'RIPEstat' },
          { from: 'ipB', to: 'asn', rel: 'hoort bij (hosting)', time: '2026-02', source: 'RIPEstat' },
        ],
        goal: 'Welk kenmerk verbindt Zaak Alpha en Zaak Bravo? (typ het label of het type)',
        bridge: ['A1B2C3D4', 'cert', 'certificaat'],
      },
      questions: [
        { q: 'Welk zeldzaam kenmerk bruggt Zaak Alpha en Zaak Bravo?', answer: ['certificaat', 'cert', 'A1B2C3D4', 'het certificaat', 'tls-certificaat'], hint: 'Hetzelfde kenmerk staat in crt.sh bij beide domeinen; de IP-adressen verschillen juist.', explain: 'Beide domeinen presenteren hetzelfde TLS-certificaat A1B2C3D4 (bekend). Een hergebruikt certificaat is zeldzaam, dus een sterke brug.' },
        { q: 'Beide IP-adressen horen bij dezelfde hostingprovider (AS64500). Waarom is dat geen sterke brug?', options: ['Omdat heel veel onschuldige sites dezelfde hostingprovider delen — het kenmerk is niet zeldzaam', 'Omdat ASN-nummers altijd nep zijn', 'Omdat hosting niets met IP-adressen te maken heeft', 'Dat is wél een sterke brug'], answer: 0, explain: 'Een gedeelde hoster is te algemeen: het is de zeldzaamheidstoets die bepaalt of een gedeeld kenmerk echt bewijs is.' },
        { q: 'Welke vlag verdien je door de zeldzaamheidstoets juist toe te passen?', answer: ['NM{zeldzaamheid_boven_toeval}'], hint: 'Staat in de tip-callout van deze taak.', explain: 'De les: kies het zeldzame dwarsverband (het certificaat), niet het toevallige (de hoster): NM{zeldzaamheid_boven_toeval}.' },
      ],
    },

    {
      title: 'Taak 5 — Attributie met ACH',
      content: `
        <p>Nu de lastigste stap: <strong>wie</strong> zit erachter? Attributie is gevaarlijk terrein, want hier worden
        de meeste denkfouten gemaakt. Je gebruikt <strong>Analysis of Competing Hypotheses (ACH)</strong>: je zet de
        hypothesen naast elkaar en je <em>weerlegt</em> ze. De hypothese met de <strong>minste inconsistenties (I)</strong>
        blijft het langst overeind. Je zoekt dus niet naar bevestiging, maar naar tegenspraak.</p>

        <h3>De valkuil: tool is niet gelijk aan actor</h3>
        <p>De meest voorkomende attributiefout is <strong>"tool = actor"</strong>. Deze aanval gebruikte een bekende RaaS.
        Verleidelijk om te zeggen: "dus het is de groep achter die RaaS." Maar een RaaS wordt door <em>tientallen</em>
        affiliates gehuurd. De tool zegt iets over de werkwijze, niet over de identiteit. In de ACH-matrix zie je dit
        terug: de waarneming "bekende RaaS" is bij álle hypothesen consistent en dus <strong>niet-diagnostisch</strong> —
        die helpt je niet kiezen. Het lab markeert zulk bewijs.</p>

        <h3>Drie hypothesen</h3>
        <p>In het lab staat de vraag "wie zit achter de aanval?" met drie hypothesen: een <strong>statelijke actor</strong>,
        een <strong>financieel gemotiveerde RaaS-affiliate die toegang kocht bij een IAB</strong>, en een
        <strong>ontevreden insider</strong>. Vul de matrix zelf in met C (consistent), I (inconsistent) of N (neutraal),
        tel de inconsistenties en vergelijk daarna met het expertoordeel.</p>

        <p>Reken mee: in het expertoordeel houdt de <strong>RaaS-affiliate</strong> <strong>0</strong> inconsistenties
        over, de <strong>statelijke actor</strong> 3 en de <strong>insider</strong> 4. Er is dus één duidelijke winnaar.
        Let op de labels: dat de affiliate het sterkst staat, is <em>afgeleid</em>. Zeggen dat het "groep X" is puur omdat
        ze die RaaS gebruiken, zou een <em>aanname</em> (en de tool=actor-fout) zijn.</p>

        <div class="callout warn"><strong>Waarom de insider afvalt:</strong> een eigen medewerker kent de interne
        naamgeving en hoeft geen toegang te kopen. De logs tonen juist uitgebreide verkenning (<code>net group</code>,
        <code>nltest</code>) en gekochte toegang — dat spreekt de insider-hypothese tegen (meerdere I's).</div>

        <div class="callout danger"><strong>Verantwoord attribueren:</strong> schrijf nooit "het is groep X" als je dat
        niet kunt onderbouwen. Schrijf: "de waarnemingen passen het best bij een financieel gemotiveerde RaaS-affiliate
        (afgeleid); een specifieke groep kunnen we op dit moment niet met zekerheid aanwijzen (aanname)."</div>
      `,
      lab: {
        type: 'ach',
        question: 'Wie zit achter de aanval op Noorderlicht Logistiek?',
        hypotheses: ['Statelijke actor (spionage/sabotage)', 'Financieel gemotiveerde RaaS-affiliate (kocht toegang bij IAB)', 'Ontevreden insider'],
        evidence: [
          { text: 'Er is losgeld geëist via een Tor-onderhandelingsportaal en een cryptowallet, met dreiging tot publicatie op een leksite (dubbele afpersing).', expert: ['I', 'C', 'I'] },
          { text: 'De eerste toegang is gekocht: VPN-inloggegevens van svc-backup circuleerden eerder bij een Initial Access Broker op een crimineel forum.', expert: ['I', 'C', 'I'] },
          { text: 'De ingezette ransomware is een bekende Ransomware-as-a-Service; dezelfde builder wordt door tientallen affiliates gehuurd.', expert: ['C', 'C', 'C'] },
          { text: 'De slachtoffers over meerdere zaken zitten in uiteenlopende sectoren zonder politieke of strategische rode draad; het doelwit lijkt opportunistisch.', expert: ['I', 'C', 'I'] },
          { text: 'Data is in bulk naar een externe clouddienst geëxfiltreerd vlak vóór de versleuteling (dubbele afpersing).', expert: ['N', 'C', 'N'] },
          { text: 'De aanvaller moest de interne naamgeving van de fileservers eerst uitgebreid verkennen (net group, nltest) en kende die dus niet.', expert: ['C', 'C', 'I'] },
        ],
      },
      questions: [
        { q: 'Welke hypothese houdt in het expertoordeel de minste inconsistenties over en wint dus?', options: ['Statelijke actor (spionage/sabotage)', 'Financieel gemotiveerde RaaS-affiliate (kocht toegang bij IAB)', 'Ontevreden insider', 'Ze eindigen gelijk'], answer: 1, explain: 'De affiliate houdt 0 I\'s over, de statelijke actor 3 en de insider 4. De RaaS-affiliate wint duidelijk.' },
        { q: 'De waarneming "bekende RaaS wordt gebruikt" is consistent met alle drie de hypothesen. Hoe heet zulk bewijs?', options: ['Niet-diagnostisch', 'Doorslaggevend', 'Een false flag', 'Een aanname'], answer: 0, explain: 'Bewijs dat overal past, helpt je niet kiezen: het is niet-diagnostisch. Het lab markeert deze rij.' },
        { q: 'Mag je de aanval aan een specifieke groep toeschrijven puur omdat ze die bekende RaaS gebruikten?', options: ['Nee, dezelfde RaaS wordt door veel affiliates gehuurd — tool is niet gelijk aan actor', 'Ja, de RaaS bepaalt de dader', 'Ja, maar alleen op dinsdag', 'Alleen als het losgeld hoog is'], answer: 0, explain: 'De "tool = actor"-valkuil: gedeelde tooling is een aanwijzing, geen identiteitsbewijs.' },
        { q: 'Welke letter tel je in ACH om de zwakste hypothesen weg te strepen?', answer: ['I', 'i', 'inconsistent', 'inconsistenties'], hint: 'Je weerlegt, je bevestigt niet.', explain: 'Je telt de inconsistenties (I); de hypothese met de minste I\'s blijft het sterkst overeind.' },
      ],
    },

    {
      title: 'Taak 6 — Indicatoren defangen en interventies kiezen',
      content: `
        <p>Je weet nu wat er gebeurde en wie het waarschijnlijk was. Tijd om te handelen. Eerst maak je de indicatoren
        <strong>veilig deelbaar</strong>, daarna kies je per indicator en per fase een <strong>interventie</strong> met
        een eigenaar.</p>

        <h3>Defangen: de tanden eruit</h3>
        <p>Plak je <code>https://cdn-sluis.nm.lab/stage2</code> rechtstreeks in een mail of ticket, dan maakt de software
        er vaak een klikbare link van of haalt automatisch een voorbeeld op — en heb je per ongeluk contact gemaakt met de
        infrastructuur van de aanvaller. Daarom <strong>defang</strong> je indicatoren: <code>hxxps://</code> in plaats van
        <code>https://</code>, en <code>[.]</code> in plaats van een punt. Zo is <code>192.0.2.60</code> gedefangd
        <code>192.0.2[.]60</code>. Het lab hieronder haalt de indicatoren uit de tekst en kan ze defangen én refangen
        (refangen doe je pas vlak voordat je een indicator in je SIEM of firewall zet).</p>

        <h3>Interventies: koppel niveau aan maatregel aan eigenaar</h3>
        <p>Niet elke interventie is gelijk. Combineer het <em>snelle</em> onderste deel van de Pyramid of Pain met het
        <em>blijvende</em> bovenste deel, en denk aan de interventietypologie (strafrechtelijk, verstoren, preventief,
        alternatief):</p>
        <table>
          <thead><tr><th>Indicator / fase</th><th>Interventie</th><th>Soort (eigenaar)</th></tr></thead>
          <tbody>
            <tr><td>C2/stage2-host <code>cdn-sluis[.]nineminds[.]lab</code>, exfil-host</td><td>Blokkeren in proxy/DNS, takedown aanvragen</td><td>Verstoren (SOC + hostingpartij/registrar)</td></tr>
            <tr><td>Losgeld-wallet <code>bc1qfictief0alpha</code></td><td>Volgen op de blockchain; exchange als knelpunt aanspreken</td><td>Strafrechtelijk (opsporing)</td></tr>
            <tr><td>Gekochte toegang / ontbrekende MFA</td><td>MFA afdwingen, serviceaccounts herzien</td><td>Preventief (IT/CISO)</td></tr>
            <tr><td>Jonge first-offender in beeld</td><td>Alternatief traject (bijv. Hack_Right-achtig)</td><td>Alternatief (opsporing/OM)</td></tr>
          </tbody>
        </table>

        <p>Werk in het lab: laat de indicatoren extraheren, defang ze, en tel hoeveel <strong>unieke</strong> IPv4-adressen
        er zijn (let op: één adres staat er twee keer in).</p>

        <div class="callout danger"><strong>Nooit blind betalen, en denk aan privacy:</strong> losgeld betalen financiert
        de volgende aanval en geeft geen garantie. Deel indicatoren onder het juiste TLP-label en haal persoonsgegevens
        (zoals het mailadres van een slachtoffer) eruit voordat je ze deelt — de AVG geldt ook voor je responsteam.</div>
      `,
      lab: { type: 'ioc', text: INCIDENT_IOCS },
      questions: [
        { q: 'Hoe schrijf je het exfiltratie-IP 192.0.2.60 gedefangd (laatste punt vervangen)?', answer: ['192.0.2[.]60', '192[.]0[.]2[.]60'], hint: 'Vervang de punt door [.]', explain: 'Gedefangd is het adres onklikbaar maar nog leesbaar: 192.0.2[.]60.' },
        { q: 'Hoeveel unieke IPv4-adressen staan er in het IOC-overzicht?', answer: ['3', 'drie'], hint: 'Kijk naar de IPv4-telling in het lab; 203.0.113.91 staat er twee keer in.', explain: '203.0.113.77, 203.0.113.91 en 192.0.2.60 — het adres 203.0.113.91 telt één keer, dus drie unieke adressen.' },
        { q: 'Een takedown van de C2-host aanvragen bij de hostingpartij valt onder welk type interventie?', options: ['Verstoren', 'Preventief', 'Alternatief', 'Niets doen'], answer: 0, explain: 'Infrastructuur offline halen is een verstorende interventie, vaak samen met de hostingpartij of registrar.' },
        { q: 'Waarom defang je een indicator voordat je hem deelt?', options: ['Zodat hij onklikbaar is en je niet per ongeluk contact maakt met de aanvaller', 'Omdat hij dan korter wordt', 'Omdat de AVG dat eist', 'Om hem te versleutelen'], answer: 0, explain: 'Defangen voorkomt dat software er een klikbare link van maakt of automatisch verbinding legt.' },
      ],
    },

    {
      title: 'Taak 7 — Het BLUF-eindproduct',
      content: `
        <p>Je hebt alles: tijdlijn, crime script, ATT&amp;CK-mapping, pivots, attributie en interventies. Nu lever je het
        <strong>intelligenceproduct</strong>. De ontvanger (de directie, de CISO, een rechercheleider) heeft geen tijd
        voor een chronologisch verhaal. Daarom schrijf je <strong>BLUF</strong>: <em>Bottom Line Up Front</em> — de
        conclusie en het advies staan <strong>bovenaan</strong>, de onderbouwing eronder.</p>

        <h3>Wat een goed BLUF-product bevat</h3>
        <ul>
          <li>De <strong>kernboodschap eerst</strong>: wat is er gebeurd en wat moet er nu gebeuren.</li>
          <li><strong>Waarschijnlijkheidstaal</strong> uit de yardstick ("waarschijnlijk", "zeer waarschijnlijk") in
          plaats van vage woorden.</li>
          <li>Een <strong>eigenaar per advies</strong>: wie doet wat, en wanneer.</li>
          <li><strong>Onzekerheid apart</strong> benoemd, met de labels bekend/afgeleid/aanname.</li>
          <li><strong>Beknopter</strong> dan de bron: schrappen is een vak.</li>
        </ul>

        <h3>Let op de attributie</h3>
        <p>Schrijf de attributie verantwoord. Juist: "De aanval past zeer waarschijnlijk bij een financieel gemotiveerde
        RaaS-affiliate die toegang kocht bij een IAB (afgeleid uit de ACH). Een specifieke groep kunnen we niet met
        zekerheid aanwijzen; dezelfde RaaS wordt door veel affiliates gebruikt (aanname vermijden)." Fout: "Het is groep
        X." Dat is de tool=actor-valkuil.</p>

        <p>In het lab staat het chronologische bronmateriaal. Herschrijf het naar een BLUF-product: conclusie eerst,
        waarschijnlijkheidstaal, een eigenaar per advies en de onzekerheid apart. Toets daarna tegen de rubric (een
        heuristische checklist, geen AI-oordeel) en vergelijk met het modelantwoord.</p>

        <div class="callout tip"><strong>Slotvlag:</strong> rond je de workflow af met een echt BLUF-product, dan verdien
        je de laatste vlag: <code>NM{conclusie_staat_boven}</code>.</div>

        <div class="callout info"><strong>Gefeliciteerd:</strong> je hebt de complete intelligence-workflow doorlopen —
        van ruwe logs tot een bruikbaar advies. Dit is precies het werkproces dat een intelligence-analist bij de politie,
        een CSIRT of een SOC elke dag doorloopt. In de volgende room breng je het samen in een herbruikbaar werkblad.</div>
      `,
      lab: {
        type: 'bluf',
        source: 'Op 14 september logde serviceaccount svc-backup om 02:14 kort in op de VPN vanaf 203.0.113.77, zonder MFA. Daarna gebeurde er drie dagen niets. Op 17 september om 19:03 werd via RDP ingelogd op WS-ADM-04. De aanvaller verkende de omgeving (net group, nltest), downloadde een stage2-payload van cdn-sluis.nm.lab (203.0.113.91) via een Base64-gecodeerd PowerShell-commando en las LSASS uit; de EDR sloeg alarm. Op 18 september werd via RDP doorgesprongen naar fileserver SRV-FS02, werd de map Klanten met 7-Zip ingepakt en werd 2 GB naar opslag-cloud.nm.lab (192.0.2.60) geüpload. Daarna werden de schaduwkopieën gewist en 3187 bestanden versleuteld (.sluislock), met een losgeldbrief. Uit de ACH blijkt dat de waarnemingen het best passen bij een financieel gemotiveerde RaaS-affiliate die toegang kocht bij een IAB; de gebruikte RaaS wordt door veel affiliates gehuurd, dus een specifieke groep is niet aan te wijzen. Een hergebruikt TLS-certificaat verbindt de phishinginfrastructuur met een tweede zaak.',
        model: 'BEOORDELING (BLUF): Noorderlicht Logistiek is zeer waarschijnlijk getroffen door een financieel gemotiveerde RaaS-affiliate die gekochte VPN-toegang (IAB) gebruikte; er is sprake van dubbele afpersing (data geëxfiltreerd vóór versleuteling). Een specifieke groep is niet met zekerheid aan te wijzen (aanname vermijden: dezelfde RaaS kent veel affiliates).\n\nADVIES (met eigenaar):\n1. MFA afdwingen op alle (service)accounts en svc-backup resetten — eigenaar: IT, binnen 24 uur.\n2. C2- en exfil-hosts blokkeren en takedown aanvragen — eigenaar: SOC + hostingpartij.\n3. Offline/immutable back-ups verifiëren en herstel starten; niet betalen — eigenaar: CISO.\n4. Losgeld-wallet laten volgen; aangifte doen — eigenaar: opsporing.\n\nONDERBOUWING: bekend = logs (VPN-login zonder MFA, LSASS-toegang, exfil 2 GB, versleuteling 3187 bestanden). Afgeleid = RaaS-affiliate met gekochte toegang (ACH: minste inconsistenties). Betrouwbaarheid: hoog voor de techniek, lager voor de exacte dader.',
      },
      questions: [
        { q: 'Wat hoort in een BLUF-product bovenaan te staan?', options: ['De conclusie en het advies (de kernboodschap)', 'De volledige chronologie', 'De lijst met alle loghashes', 'De namen van alle analisten'], answer: 0, explain: 'BLUF = Bottom Line Up Front: eerst de conclusie en wat er moet gebeuren, daarna de onderbouwing.' },
        { q: 'Welke vlag hoort bij het afronden van het BLUF-eindproduct?', answer: ['NM{conclusie_staat_boven}'], hint: 'Staat in de slotvlag-callout van deze taak.', explain: 'De slotvlag is NM{conclusie_staat_boven}.' },
        { q: 'Hoe schrijf je de attributie in het eindproduct verantwoord?', options: ['Waarschijnlijk een RaaS-affiliate (afgeleid); specifieke groep niet aan te wijzen (aanname vermijden)', 'Het is zeker groep X', 'De RaaS bepaalt de dader', 'Attributie laat je weg'], answer: 0, explain: 'Je benoemt de best passende hypothese met waarschijnlijkheidstaal en vermijdt de tool=actor-valkuil.' },
        { q: 'Ik heb een BLUF-product geschreven met conclusie eerst, waarschijnlijkheidstaal, een eigenaar per advies en onzekerheid apart. 🧩', noAnswer: true },
      ],
    },
  ],
});
