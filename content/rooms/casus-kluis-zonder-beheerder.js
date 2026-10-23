/* Room: Casus — de kluis zonder beheerder (sleutels terugvinden in je eigen organisatie) */

// =======================================================================
//  Alles in deze room is FICTIEF: Kade Transport BV, de medewerkers, de
//  sleutels en de aandelen zijn verzonnen. Je werkt in opdracht van de
//  directie, aan de eigen systemen van de organisatie.
// =======================================================================

const MPK_TIMELINE = [
  { t: '2024-11-02 15:40:10', src: 'Sleutelceremonie', host: 'SRV-ARCHIEF', user: 'j.kramer', desc: 'BitLocker opnieuw ingesteld; herstelsleutel {1B44E0D9-…} opgeslagen in AD' },
  { t: '2024-11-04 10:00:00', src: 'Sleutelceremonie', host: '—', user: 'j.kramer', desc: 'Archiefsleutel (versie 2024) gesplitst in 5 aandelen, drempel 3 (Shamir)' },
  { t: '2025-06-18 09:30:00', src: 'Wachtwoordmanager', host: '—', user: 'j.kramer', desc: 'Noodtoegang ingesteld; noodcontact: j.kramer@kade-transport.example (eigen tweede account)' },
  { t: '2026-03-14 09:12:44', src: 'Sleutelceremonie', host: 'SRV-ARCHIEF', user: 'j.kramer', desc: 'Schijf vervangen; nieuwe BitLocker-herstelsleutel {7A3F91C2-…} opgeslagen in AD' },
  { t: '2026-03-16 10:00:00', src: 'Sleutelceremonie', host: '—', user: 'j.kramer', desc: 'NIEUWE archiefsleutel (versie 2026) gesplitst in 5 aandelen, drempel 3 (Shamir), priemgetal p = 101; aandelen 1–5 uitgereikt aan directie en HR; aandelen 2024 vervallen' },
  { t: '2026-03-16 10:05:00', src: 'Sleutelceremonie', host: '—', user: 'j.kramer', desc: 'Herstelbestand "archief-herstel.bin" versleuteld met XOR-sleutel "Kade" + herstelgeheim + "!" en in de kluis gelegd' },
  { t: '2026-09-29 07:55:12', src: 'HR', host: '—', user: '—', desc: 'J. Kramer (enige beheerder) langdurig uitgevallen wegens ziekte; niet bereikbaar' },
  { t: '2026-10-05 06:12:40', src: 'Monitoring', host: 'SRV-ARCHIEF', user: '—', desc: 'Moederbord vervangen na storing; server start op in het BitLocker-herstelscherm' },
  { t: '2026-10-05 08:30:00', src: 'Directie', host: '—', user: 'm.dekker', desc: 'Schriftelijke opdracht aan het herstelteam: toegang tot SRV-ARCHIEF en het archief herstellen' },
  { t: '2026-10-06 11:20:00', src: 'Kluis', host: '—', user: 'm.dekker', desc: 'Envelop "aandeel 3 (2024)" gevonden in de kluis; aandeel 3 (2026) van CFO-assistent zoekgeraakt' },
];

const MPK_PWSH = {
  'Get-ADComputer SRV-ARCHIEF': 'DistinguishedName : CN=SRV-ARCHIEF,OU=Servers,DC=kade,DC=local\nDNSHostName       : srv-archief.kade.local\nEnabled           : True\nName              : SRV-ARCHIEF\nObjectClass       : computer',
  'Get-ADObject -Filter "objectClass -eq \'msFVE-RecoveryInformation\'" -SearchBase "CN=SRV-ARCHIEF,OU=Servers,DC=kade,DC=local" -Properties msFVE-RecoveryPassword | Format-List Name,msFVE-RecoveryPassword':
    'Name                   : 2024-11-02T15:40:10+01:00{1B44E0D9-2C6A-4F81-B0D3-7E95A1C2F604}\nmsFVE-RecoveryPassword : 505142-718531-429704-609884-322377-674278-483769-403513\n\nName                   : 2026-03-14T09:12:44+01:00{7A3F91C2-5E1B-4C2D-9F0A-3B8E6D1C4A77}\nmsFVE-RecoveryPassword : 585717-711007-181093-517638-504911-008404-208351-150018',
  'Get-Content .\\notitie_kramer.txt': 'Gevonden in de bureaula van J. Kramer, handgeschreven:\n"Archief-BitLocker, voor noodgevallen:\n 585717-711007-181093-517638-504011-008404-208351-150018"',
  'Get-ChildItem': '    Directory: C:\\Herstel\n\nMode   LastWriteTime        Length Name\n----   -------------        ------ ----\n-a---  06-10-2026  11:02      214  notitie_kramer.txt',
  'dir': '    Directory: C:\\Herstel\n\nMode   LastWriteTime        Length Name\n----   -------------        ------ ----\n-a---  06-10-2026  11:02      214  notitie_kramer.txt',
};

// Het versleutelde herstelbestand (hex), ge-XORd met de sleutel uit het herstelgeheim.
const MPK_HERSTEL_HEX = '03 24 36 36 63 76 6d 0f 2e 27 30 7a 76 6f 1f 41 25 37 74 7b 68 0e 27 49 2e 7b 66 68 18 6b 25 17 54 5b 48 2e 07 13 04 54 5b 55 3c 0e 0b 17 53 09 01 11 04 01 07 45 5a 44 38 4c 29 0a 45 54 44 25 4c 56 55 05 05 2b 1d 0d 05 02 0d 13 6f 06 1a 17 0d 56 5e 48 39 3e 00 17 5e 56 7e 3d 00 0a 3a 41 5a 4b 2d 1c 6e';

CS.registerRoom({
  id: 'casus-kluis-zonder-beheerder',
  path: 'puzzels',
  order: 10,
  title: 'Casus: de kluis zonder beheerder',
  icon: '🔐',
  difficulty: 'Moeilijk',
  minutes: 90,
  summary: 'De enige beheerder van een transportbedrijf valt langdurig uit, en net dan start de archiefserver op in het BitLocker-herstelscherm. In opdracht van de directie zoek je de juiste herstelsleutel in Active Directory (en betrap je een overschrijffout in een briefje), reconstrueer je het herstelgeheim uit drie van de vijf Shamir-aandelen, ontsleutel je het herstelbestand en schrijf je de lessen op voor sleutelbeheer.',
  objectives: [
    'Uitleggen waarom één beheerder met alle sleutels een risico is (bus factor) en hoe sleutelbeheer dat opvangt',
    'Een BitLocker-herstelsleutel opzoeken in Active Directory aan de hand van de sleutel-ID, en een sleutel controleren met de deelbaar-door-11-regel',
    'Uitleggen hoe Shamir\'s Secret Sharing werkt en een geheim reconstrueren uit drie aandelen met Lagrange-interpolatie modulo een priemgetal',
    'Een versleuteld herstelbestand openen met de afgeleide sleutel',
    'Een verbeterplan voor sleutelbeheer opstellen: escrow, vier-ogenprincipe, versiebeheer van aandelen en herstelproeven',
  ],
  terms: [
    { term: 'Bus factor', def: 'Het aantal mensen dat kan uitvallen voordat een organisatie vastloopt. Een bus factor van 1 betekent: één persoon weet alles.' },
    { term: 'Key escrow', def: 'Het veilig in bewaring geven van (een kopie van) een sleutel, zodat de organisatie er bij nood bij kan.' },
    { term: 'BitLocker-herstelsleutel', def: 'Een sleutel van 48 cijfers in 8 blokken van 6 waarmee een BitLocker-schijf te openen is als de normale ontgrendeling faalt. Elk blok is deelbaar door 11.' },
    { term: 'Sleutel-ID', def: 'Een kenmerk (GUID) dat het herstelscherm toont, zodat je weet welke van de opgeslagen herstelsleutels bij deze schijf hoort.' },
    { term: 'Shamir\'s Secret Sharing', def: 'Een methode (Adi Shamir, 1979) om een geheim te verdelen in n aandelen, waarvan er k nodig zijn om het terug te rekenen. Met minder dan k aandelen weet je niets over het geheim.' },
    { term: 'Lagrange-interpolatie', def: 'De rekenmethode om uit k punten de unieke veelterm van graad k−1 terug te vinden; bij Shamir gebruik je hem om f(0), het geheim, te berekenen.' },
    { term: 'Modulair rekenen', def: 'Rekenen met resten na deling door een getal p ("klokrekenen"). Delen door a betekent vermenigvuldigen met de inverse van a modulo p.' },
    { term: 'Herstelproef', def: 'Een geplande oefening waarin je echt probeert te herstellen met de bewaarde sleutels en aandelen, om te bewijzen dat het werkt voordat het nodig is.' },
  ],
  resources: [
    { title: 'Microsoft Learn — BitLocker-herstel: overzicht', url: 'https://learn.microsoft.com/windows/security/operating-system-security/data-protection/bitlocker/recovery-overview' },
    { title: 'Wikipedia — Shamir\'s Secret Sharing', url: 'https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing' },
    { title: 'NCSC — informatiebeveiliging en continuïteit', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De situatie: één beheerder, alle sleutels',
      content: `
        <p><strong>Kade Transport BV</strong> (fictief) heeft één IT-beheerder: Joost Kramer. Hij is sinds eind september
        langdurig ziek en niet bereikbaar. Op 5 oktober vervangt de leverancier het moederbord van de archiefserver
        <code>SRV-ARCHIEF</code>. Bij het opstarten verschijnt het BitLocker-herstelscherm: de schijf herkent de nieuwe hardware
        niet en vraagt om de herstelsleutel. Daarachter zit nog een versleuteld archief, waarvan de sleutel volgens Joost
        "veilig bij de directie" ligt.</p>
        <p>De directie geeft jou een <strong>schriftelijke opdracht</strong>: herstel de toegang. Het zijn de eigen systemen en
        gegevens van het bedrijf; leg toch elke stap vast, want je komt aan gevoelige informatie.</p>
        <h3>Lees de tijdlijn</h3>
        <p>Joost was gelukkig een nette beheerder: in het logboek van zijn sleutelceremonies staat wat hij deed. Filter de
        tijdlijn en zoek uit welke sleutels je nodig hebt, waar ze liggen en welke versie geldt.</p>
        <div class="callout warn"><strong>Let op versies:</strong> een sleutel of aandeel uit een oude ceremonie lijkt
        bruikbaar, maar levert het verkeerde resultaat. Noteer bij elk stuk uit welke ceremonie het komt.</div>
      `,
      lab: { type: 'timeline', title: 'Logboek sleutelbeheer — Kade Transport BV', events: MPK_TIMELINE },
      questions: [
        { q: 'Hoeveel aandelen zijn er nodig om de archiefsleutel (versie 2026) te reconstrueren?', answer: ['3', 'drie'], hint: 'De drempel uit de ceremonie van 16 maart 2026.', explain: 'Drie van de vijf (een 3-uit-5-schema).' },
        { q: 'Welk priemgetal p is bij de ceremonie van 2026 gebruikt?', answer: ['101'], hint: 'Staat in dezelfde regel.', explain: 'Alle berekeningen gebeuren modulo 101.' },
        { q: 'Waarom werkte de noodtoegang van de wachtwoordmanager niet?', options: ['Joost had zichzelf (een eigen tweede account) als noodcontact ingesteld', 'De wachtwoordmanager was verlopen', 'Noodtoegang bestaat niet', 'De directie had het wachtwoord veranderd'], answer: 0, explain: 'Een noodcontact moet iemand anders zijn: anders verdwijnt de toegang samen met de persoon.' },
        { q: 'Welke gevonden envelop moet je NIET gebruiken?', options: ['Aandeel 3 (2024)', 'Aandeel 1 (2026)', 'Aandeel 2 (2026)', 'Aandeel 4 (2026)'], answer: 0, explain: 'De aandelen van 2024 zijn vervallen: ze horen bij een ander geheim en een andere veelterm.' },
      ],
    },
    {
      title: 'Taak 2 — De BitLocker-herstelsleutel',
      content: `
        <p>Het herstelscherm van SRV-ARCHIEF toont:</p>
<pre><code>BitLocker-herstel
Voer de herstelsleutel voor dit station in.
Herstelsleutel-id (om de sleutel te identificeren): 7A3F91C2</code></pre>
        <p>In een domein worden BitLocker-herstelsleutels vaak opgeslagen in Active Directory (of in Microsoft Entra ID), als
        <code>msFVE-RecoveryInformation</code>-object onder het computerobject. De naam van zo'n object bevat de datum en de
        sleutel-ID. Een server kan er meerdere hebben, bijvoorbeeld na een vervangen schijf. Je kiest de sleutel waarvan de ID
        overeenkomt met het herstelscherm.</p>
        <h3>Opzoeken in PowerShell</h3>
        <p>Je werkt op een beheerwerkplek met de juiste rechten (gedelegeerd door de directie). Gebruik deze commando's:</p>
<pre><code>Get-ADComputer SRV-ARCHIEF
Get-ADObject -Filter "objectClass -eq 'msFVE-RecoveryInformation'" -SearchBase "CN=SRV-ARCHIEF,OU=Servers,DC=kade,DC=local" -Properties msFVE-RecoveryPassword | Format-List Name,msFVE-RecoveryPassword
Get-ChildItem
Get-Content .\\notitie_kramer.txt</code></pre>
        <h3>De controleregel: deelbaar door 11</h3>
        <p>Een BitLocker-herstelsleutel bestaat uit 8 blokken van 6 cijfers. Elk blok is een getal dat <strong>deelbaar is door
        11</strong> (en kleiner dan 720.896). Zo vangt BitLocker typfouten op. Je kunt een overgeschreven sleutel dus zelf
        controleren: deel elk blok door 11; komt er een rest uit, dan zit daar een fout.</p>
        <div class="callout tip"><strong>Voorbeeld:</strong> 585717 / 11 = 53.247, precies. Probeer zelf het vijfde blok van
        het briefje in de bureaula.</div>
      `,
      lab: { type: 'terminal', shell: 'powershell', user: 'herstel', host: 'BEHEER-01', cwd: 'C:\\Herstel', motd: 'Beheerwerkplek Kade Transport — sessie wordt gelogd (opdracht directie, 05-10-2026). Typ help voor hulp.', commands: MPK_PWSH },
      questions: [
        { q: 'Wat zijn de eerste zes cijfers van de juiste herstelsleutel voor ID 7A3F91C2?', answer: ['585717'], hint: 'Zoek het object waarvan de naam {7A3F91C2-…} bevat.', explain: 'De sleutel van 14 maart 2026: 585717-711007-…' },
        { q: 'Welk blok (1–8) van het handgeschreven briefje bevat een fout?', answer: ['5', 'vijf', 'het vijfde'], hint: 'Vergelijk met AD, of deel elk blok door 11.', explain: 'Blok 5 is 504011 in plaats van 504911. 504011 / 11 = 45.819 rest 2: ongeldig.' },
        { q: 'Waarom gebruik je de sleutel uit AD en niet die van het briefje?', options: ['AD is de bron die bij de sleutel-ID hoort; het briefje is overgeschreven en bevat een fout', 'Briefjes zijn nooit geldig', 'AD-sleutels zijn langer', 'Het briefje is van 2024'], answer: 0, explain: 'Werk met de primaire, gekoppelde bron, en controleer een kopie altijd.' },
      ],
    },
    {
      title: 'Taak 3 — Shamir: drie van de vijf aandelen',
      content: `
        <p>De server draait weer, maar het archief zelf is apart versleuteld. Joost verdeelde het <strong>herstelgeheim</strong>
        met <strong>Shamir's Secret Sharing</strong>: vijf aandelen, waarvan er drie nodig zijn. Zo kan niemand alleen bij het
        archief, en blijft het herstel mogelijk als één of twee mensen er niet zijn.</p>
        <h3>Hoe het werkt</h3>
        <p>Joost koos een veelterm van graad 2 (een parabool) met het geheim S als constante term, en rekende modulo het
        priemgetal p = 101:</p>
<pre><code>f(x) = S + a₁·x + a₂·x²   (mod 101)          aandeel i = (i, f(i))</code></pre>
        <p>Door twee punten gaan oneindig veel parabolen, door drie punten precies één. Daarom zeggen twee aandelen niets over
        S, en drie aandelen alles.</p>
        <h3>De beschikbare aandelen (versie 2026)</h3>
        <table>
          <thead><tr><th>Aandeel</th><th>Houder</th><th>Waarde f(i)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Directeur M. Dekker</td><td>96</td></tr>
            <tr><td>2</td><td>CFO</td><td>34</td></tr>
            <tr><td>3</td><td>Assistent CFO</td><td>zoekgeraakt (de envelop "aandeel 3 (2024)" is vervallen)</td></tr>
            <tr><td>4</td><td>HR-manager</td><td>59</td></tr>
            <tr><td>5</td><td>Commissaris</td><td>niet bereikbaar (buitenland)</td></tr>
          </tbody>
        </table>
        <h3>Lagrange-interpolatie in f(0)</h3>
        <p>Met de aandelen x = 1, 2 en 4 is het geheim S = f(0) = y₁·L₁ + y₂·L₂ + y₄·L₄, met:</p>
<pre><code>L₁ = (0−2)(0−4) / ((1−2)(1−4)) = 8 / 3
L₂ = (0−1)(0−4) / ((2−1)(2−4)) = 4 / −2 = −2
L₄ = (0−1)(0−2) / ((4−1)(4−2)) = 2 / 6  = 1 / 3</code></pre>
        <p>Delen bestaat modulo 101 niet zoals gewoon; je vermenigvuldigt met de <strong>inverse</strong>. De inverse van 3
        modulo 101 is 34, want 3 × 34 = 102 = 1 (mod 101). Dus:</p>
<pre><code>L₁ = 8 × 34 = 272 = 70   (mod 101)
L₂ = −2              = 99   (mod 101)
L₄ = 34

S = 96 × 70 + 34 × 99 + 59 × 34   (mod 101)</code></pre>
        <p>Reken het uit en neem de rest na deling door 101. Vul S in bij de herstelmodule hieronder.</p>
        <div class="callout info"><strong>In het echt</strong> gebruik je een veel groter priemgetal (honderden bits) en
        betrouwbare software, en verdeel je vaak de sleutel van een wachtwoordkluis of een hardware security module. Het
        principe is precies hetzelfde.</div>
      `,
      lab: {
        type: 'crackme',
        title: 'Herstelmodule archiefkluis',
        intro: 'De herstelmodule controleert het gereconstrueerde geheim tegen de hash die bij de ceremonie is vastgelegd.',
        source: 'function controleer(geheim) {\n  // Bij de ceremonie is alleen een hash van het geheim opgeslagen, niet het geheim zelf.\n  return sha256("kade-2026:" + geheim) === CEREMONIE_HASH;\n}',
        check: (k) => String(k).trim() === '73',
        flag: 'NM{drie_aandelen_een_geheim}',
        reveal: 'Herstelgeheim bevestigd. Het herstelbestand gebruikt de XOR-sleutel "Kade" + geheim + "!".',
        hint: 'Bereken 96·70 + 34·99 + 59·34 en neem de rest na deling door 101.',
      },
      questions: [
        { q: 'Wat is het herstelgeheim S?', answer: ['73'], hint: '6720 + 3366 + 2006 = 12092; 12092 mod 101 = ?', explain: '12092 = 119 × 101 + 73, dus S = 73.' },
        { q: 'Welke vlag geeft de herstelmodule?', answer: ['NM{drie_aandelen_een_geheim}'], encoded: true, hint: 'Vul het juiste geheim in.', explain: 'Drie aandelen zijn genoeg om de parabool en dus f(0) vast te leggen.', xp: 25 },
        { q: 'Wat weet iemand die maar twee aandelen heeft over het geheim?', options: ['Niets: bij elke waarde van S past een parabool door die twee punten', 'De helft van het geheim', 'Het geheim op 1 na', 'Alles'], answer: 0, explain: 'Dat is de kracht van Shamir: onder de drempel lekt er geen informatie.' },
        { q: 'Wat is de inverse van 3 modulo 101?', answer: ['34'], hint: '3 × ? = 1 (mod 101).', explain: '3 × 34 = 102 = 1 (mod 101).' },
      ],
    },
    {
      title: 'Taak 4 — Het herstelbestand openen',
      content: `
        <p>In de kluis ligt <code>archief-herstel.bin</code>. Volgens het logboek is het versleuteld met de XOR-sleutel
        <code>"Kade" + herstelgeheim + "!"</code>. Hieronder staat de inhoud als hex.</p>
        <ol>
          <li>Voeg in het lab de bewerking <strong>Hex decoderen</strong> toe.</li>
          <li>Voeg daarna <strong>XOR (sleutel)</strong> toe en vul de sleutel in.</li>
          <li>Lees het herstelwachtwoord van het archief en de vlag.</li>
        </ol>
        <div class="callout warn"><strong>Kanttekening:</strong> XOR met een korte, herhalende sleutel is geen sterke
        versleuteling (zie de cryptanalyse-room in Meesterproeven). Het werkt hier omdat het bestand in een fysieke kluis ligt
        en het geheim alleen met drie aandelen terug te rekenen is. Een beter ontwerp gebruikt een echte versleuteling met
        authenticatie (bijvoorbeeld AES-GCM) en een sleutel die direct uit het herstelgeheim wordt afgeleid.</div>
      `,
      lab: { type: 'cyberchef', input: MPK_HERSTEL_HEX },
      questions: [
        { q: 'Wat is de volledige XOR-sleutel?', answer: ['Kade73!'], hint: '"Kade" + 73 + "!".', explain: 'Kade73!' },
        { q: 'Wat is het archiefwachtwoord in het herstelbestand?', answer: ['Zeebries-Morgen-2026'], hint: 'Hex decoderen, daarna XOR met de sleutel.', explain: 'Het archief is weer te openen; Kade Transport heeft zijn data terug.' },
        { q: 'Welke vlag staat in het herstelbestand?', answer: ['NM{shamir_drie_van_vijf}'], encoded: true, hint: 'Staat op de laatste regel van de ontsleutelde tekst.', explain: 'Drie van de vijf aandelen bleken genoeg.', xp: 25 },
      ],
    },
    {
      title: 'Taak 5 — Lessen voor sleutelbeheer',
      content: `
        <p>Het is goed afgelopen, maar het scheelde weinig: het noodcontact was de beheerder zelf, één aandeel was zoek, één
        houder was onbereikbaar, en het briefje in de bureaula bevatte een fout. Met nog één tegenvaller was het archief
        verloren geweest.</p>
        <h3>Verbeterplan</h3>
        <table>
          <thead><tr><th>Probleem</th><th>Maatregel</th></tr></thead>
          <tbody>
            <tr><td>Bus factor van 1</td><td>Minstens twee mensen met beheerrechten, en een gedocumenteerde procedure die een ander kan volgen</td></tr>
            <tr><td>Noodcontact = beheerder zelf</td><td>Noodtoegang naar een functie (bijv. directie), niet naar een persoon die zelf de beheerder is</td></tr>
            <tr><td>Oude en nieuwe aandelen door elkaar</td><td>Versienummer en datum op elk aandeel; oude aandelen aantoonbaar vernietigen</td></tr>
            <tr><td>Kopie met typfout</td><td>Sleutels niet overschrijven; uitprinten uit de bron en de controle (deelbaar door 11) toepassen</td></tr>
            <tr><td>Nooit getest</td><td>Jaarlijkse <strong>herstelproef</strong>: echt herstellen met de bewaarde sleutels en aandelen</td></tr>
            <tr><td>Houders niet bereikbaar</td><td>Aandelen spreiden over mensen die niet tegelijk weg zijn, en een vervangingsregeling vastleggen</td></tr>
          </tbody>
        </table>
        <div class="callout info"><strong>Voor de NIS2/Cyberbeveiligingswet</strong> en voor ISO 27001 horen continuïteit,
        back-ups en het beheer van cryptografische sleutels bij de basismaatregelen. Een herstelproef is daarvoor het beste
        bewijs dat het werkt.</div>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de stappen van een goede jaarlijkse herstelproef op volgorde.',
        items: [
          { id: 'p', label: 'Plannen: doel, scope en wie de aandelen en sleutels meebrengt' },
          { id: 'c', label: 'Controleren: zijn alle aandelen en sleutels van de juiste versie?' },
          { id: 'h', label: 'Herstellen op een testomgeving met de bewaarde sleutels' },
          { id: 'v', label: 'Verifiëren: is de data compleet en leesbaar?' },
          { id: 'd', label: 'Documenteren: wat ging goed, wat niet, hoe lang duurde het?' },
          { id: 'b', label: 'Bijwerken: procedure, houders en aandelen aanpassen waar nodig' },
        ],
        correct: ['p', 'c', 'h', 'v', 'd', 'b'],
        flag: 'NM{herstelproef_elk_jaar}',
        explain: 'Plannen, controleren, herstellen, verifiëren, documenteren en bijwerken.',
      },
      questions: [
        { q: 'Welke vlag krijg je bij de juiste volgorde?', answer: ['NM{herstelproef_elk_jaar}'], encoded: true, hint: 'Van plannen tot bijwerken.', explain: 'Een herstel dat nooit geoefend is, is een hoop, geen plan.', xp: 20 },
        { q: 'Wat had dit incident het meest voorkomen?', options: ['Een jaarlijkse herstelproef, die de fouten (noodcontact, zoekgeraakt aandeel, typfout) vooraf aan het licht had gebracht', 'Een langer wachtwoord', 'Een snellere server', 'Minder aandelen'], answer: 0, explain: 'Alle zwakke plekken waren bij een proef zichtbaar geworden.' },
        { q: 'Hoe heet het risico dat alles afhangt van één persoon?', answer: ['bus factor', 'busfactor', 'bus factor van 1'], hint: 'Wat als die persoon onder de bus komt?', explain: 'Een bus factor van 1.' },
      ],
    },
  ],
});
