/* Room: Cryptografie — coderen, versleutelen, hashen */

// Taak 3: tien blokken AES-128 in ECB-mode (echt berekend). Vijf fictieve rekeningen, elk een
// naamblok en een saldoblok van 16 bytes. Vier saldoblokken zijn gelijk; dat van rekening 3 wijkt af.
const CRY_ECB_HEX =
  'C9 72 B2 67 96 6C 6A 69 6A 29 CB 2B E4 D6 38 75 ' +
  '9D 93 84 C1 CB FA 4C 0B 55 20 14 F1 F7 96 0A 79 ' +
  'A2 3C E4 3D D2 44 39 C1 63 B6 1A BC 44 E5 C8 6E ' +
  '9D 93 84 C1 CB FA 4C 0B 55 20 14 F1 F7 96 0A 79 ' +
  'E1 09 B2 02 2B 17 97 63 A3 88 A5 E8 0F 4C C3 02 ' +
  '9A F2 78 76 2D 16 60 4A EE A8 A8 4F 32 06 EF 84 ' +
  'F1 28 A5 8C A0 D3 16 51 41 06 08 28 8C 53 0A F3 ' +
  '9D 93 84 C1 CB FA 4C 0B 55 20 14 F1 F7 96 0A 79 ' +
  'AE EE 7C 07 CC 7F 98 D2 7A 7D 59 13 1F 7E 76 B6 ' +
  '9D 93 84 C1 CB FA 4C 0B 55 20 14 F1 F7 96 0A 79';

// Taak 5: uitvoer van een fictieve certificaatcontrole. Het oordeel staat er niet bij: dat velt de leerling.
const CRY_CERTLOG = `Certificaatcontrole, uitgevoerd op 2026-11-12 10:00 UTC
Vertrouwde root in deze browser: NM Lab Root CA
---
[1] host=portaal.nm.lab poort=443
    onderwerp  CN=portaal.nm.lab
    namen      portaal.nm.lab, www.portaal.nm.lab
    uitgever   CN=NM Lab Issuing CA 2
    geldig     2026-09-01 t/m 2026-11-30
    keten      portaal.nm.lab <- NM Lab Issuing CA 2 <- NM Lab Root CA
---
[2] host=shop.nm.lab poort=443
    onderwerp  CN=shop.nm.lab
    namen      shop.nm.lab
    uitgever   CN=NM Lab Issuing CA 1
    geldig     2026-07-10 t/m 2026-10-08
    keten      shop.nm.lab <- NM Lab Issuing CA 1 <- NM Lab Root CA
---
[3] host=betalen.nm.lab poort=443
    onderwerp  CN=betalen-nm.example
    namen      betalen-nm.example
    uitgever   CN=NM Lab Issuing CA 2
    geldig     2026-10-20 t/m 2027-01-18
    keten      betalen-nm.example <- NM Lab Issuing CA 2 <- NM Lab Root CA
---
[4] host=intern.nm.lab poort=443
    onderwerp  CN=intern.nm.lab
    namen      intern.nm.lab
    uitgever   CN=intern.nm.lab
    geldig     2026-01-05 t/m 2036-01-03
    keten      intern.nm.lab
---
[5] host=mail.nm.lab poort=443
    onderwerp  CN=mail.nm.lab
    namen      mail.nm.lab, webmail.nm.lab
    uitgever   CN=NM Lab Issuing CA 1
    geldig     2026-10-01 t/m 2026-12-30
    keten      mail.nm.lab <- NM Lab Issuing CA 1 <- NM Lab Root CA`;

CS.registerRoom({
  id: 'cryptografie',
  path: 'security-kern',
  order: 1,
  title: 'Cryptografie: coderen, versleutelen, hashen',
  icon: '🔐',
  difficulty: 'Gemiddeld',
  minutes: 120,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Leer het verschil tussen encoding, encryptie en hashing, en hoe AES, RSA, TLS en veilige wachtwoordopslag echt werken.',
  objectives: [
    'Encoding, encryptie en hashing uit elkaar houden en uitleggen waarom Base64 geen beveiliging is',
    'Het verschil tussen symmetrische (AES) en asymmetrische (RSA, ECC) encryptie beschrijven',
    'Uitleggen hoe sleuteluitwisseling, digitale handtekeningen, certificaten en TLS samenwerken',
    'Benoemen welke eigenschappen een goede hashfunctie heeft en waarom MD5 en SHA-1 niet meer veilig zijn',
    'Een gecodeerde vlag decoderen en een SHA-256 berekenen met CyberChef',
    'Wachtwoorden veilig opslaan met een salt en een langzame hash (bcrypt, scrypt, Argon2)',
  ],
  tasks: [
    {
      title: 'Taak 1 — Encoding, encryptie en hashing: drie verschillende dingen',
      tryFirst: true,
      intro: `<p>In het lab staat een string die er geheim uitziet. Zoek uit welke bewerking hem leesbaar maakt (probeer <code>Van Base64</code> en <code>Van Hex</code>) en vind de vlag. Doe daarna hetzelfde met de hex-string uit de derde vraag. Heb je onderweg ergens een sleutel nodig gehad?</p>`,
      content: `
        <p>Drie begrippen worden voortdurend door elkaar gehaald. Toch doen ze iets totaal anders.
        Als je ze uit elkaar kunt houden, begrijp je meteen waarom veel "beveiliging" die je online ziet
        helemaal geen beveiliging is.</p>

        <h3>1. Encoding (coderen)</h3>
        <p>Encoding zet gegevens om in een ander formaat zodat ze veilig door een systeem kunnen reizen —
        niet om ze geheim te maken. Denk aan <strong>Base64</strong>, <strong>hex</strong> (hexadecimaal) en
        <strong>URL-encoding</strong> (<code>%20</code> voor een spatie). Er is <em>geen sleutel</em> nodig:
        iedereen die het schema kent, draait het zo weer terug. Een analogie: je tekst in morse omzetten.
        Leuk, maar niet geheim — iedereen met een morsetabel leest mee.</p>
        <div class="callout warn">
          <strong>Veelgemaakte fout:</strong> "Base64 is versleuteling." Nee. Base64 is <em>codering</em>.
          Er zit geen sleutel in. Vind je ergens een Base64-string, dan is de inhoud één klik verwijderd van leesbaar.
          Behandel Base64-tekst nooit als "veilig opgeslagen".
        </div>

        <h3>2. Encryptie (versleutelen)</h3>
        <p>Encryptie maakt gegevens <strong>vertrouwelijk</strong>. Zonder de juiste <strong>sleutel</strong>
        is de uitvoer (de <em>ciphertext</em>) onleesbaar. Met de sleutel draai je het terug naar de
        oorspronkelijke tekst (<em>plaintext</em>). Dit is wél geheim, mits de sleutel geheim blijft.</p>

        <h3>3. Hashing</h3>
        <p>Een hashfunctie zet een invoer om in een vaste, korte "vingerafdruk". Dit is
        <strong>eenrichtingsverkeer</strong>: uit de hash krijg je de oorspronkelijke tekst niet terug.
        Je gebruikt het om te controleren of iets ongewijzigd is of om wachtwoorden op te slaan — nooit
        om iets later weer "uit te pakken".</p>

        <table>
          <thead><tr><th></th><th>Omkeerbaar?</th><th>Sleutel nodig?</th><th>Doel</th></tr></thead>
          <tbody>
            <tr><td>Encoding</td><td>Ja, door iedereen</td><td>Nee</td><td>Transport / formaat</td></tr>
            <tr><td>Encryptie</td><td>Ja, met sleutel</td><td>Ja</td><td>Vertrouwelijkheid</td></tr>
            <tr><td>Hashing</td><td>Nee</td><td>Nee</td><td>Integriteit / opslag</td></tr>
          </tbody>
        </table>

      `,
      lab: { type: 'cyberchef', input: 'Tk17YmFzZTY0X2lzX3NsZWNodHNfY29kZXJpbmd9' },
      questions: [
        { q: 'Is Base64 een vorm van versleuteling?', options: ['Ja, het maakt tekst geheim', 'Nee, het is codering zonder sleutel', 'Alleen met een wachtwoord'], answer: 1, explain: 'Base64 heeft geen sleutel. Iedereen kan het terugdraaien, dus het beschermt niets.' },
        { q: 'Decodeer de string in het lab. Wat is de vlag?', answer: ['NM{base64_is_slechts_codering}'], encoded: true,
          hints: ['Kijk naar de tekens: hoofdletters, kleine letters en cijfers door elkaar.', 'Voeg in het lab de bewerking "Van Base64" toe aan het recept.', 'De uitvoer begint met NM{base64_ en eindigt op _codering}.'],
          wrong: { 'Tk17YmFzZTY0X2lzX3NsZWNodHNfY29kZXJpbmd9': 'Dat is de gecodeerde invoer. Voeg een bewerking toe en lees de uitvoer.', '/^[0-9a-f]{32,64}$/': 'Je hebt de string gehasht. Een hash kun je niet terugdraaien; hier moet je decoderen.' },
          why: 'In de praktijk staan wachtwoorden en API-sleutels geregeld als Base64 in configuratiebestanden en logregels. Wie Base64 herkent, leest ze direct.',
          explain: 'Base64 is zonder sleutel terug te draaien. Daarom is het geen beveiliging.' },
        { q: 'Plak 4e4d7b6865785f69735f6f6f6b5f6d6161725f636f646572696e677d in het lab en decodeer. Wat is de vlag?', answer: ['NM{hex_is_ook_maar_codering}'], encoded: true,
          hints: ['Alleen de tekens 0 tot 9 en a tot f: dat wijst op een andere schrijfwijze dan Base64.', 'Haal de vorige bewerking uit het recept en kies "Van Hex".', 'Elke twee tekens zijn één byte: 4e is N, 4d is M, 7b is {.'],
          wrong: { '/^[\\x80-\\uffff]|\\ufffd/': 'Je hebt "Van Base64" laten staan. Deze string is hex; verwijder de oude bewerking uit het recept.' },
          explain: 'Hex is net als Base64 alleen een andere schrijfwijze van dezelfde bytes.' },
        { q: 'Welke bewerking is NIET omkeerbaar?', options: ['Base64', 'AES-encryptie', 'Hashing (SHA-256)'], answer: 2, explain: 'Een hash is eenrichtingsverkeer; je krijgt de invoer er niet uit terug.' },
      ],
    },

    {
      title: 'Taak 2 — Klassieke cijfers: Caesar en ROT13',
      tryFirst: true,
      intro: `<p>Drie opdrachten in het lab. Eén: het woord <code>wpujvkl</code> is met een Caesarcijfer versleuteld, maar je weet de verschuiving niet. Probeer verschuivingen tot er een Nederlands woord staat. Twee: de string die al in het lab staat is met ROT13 bewerkt. Drie: de string uit de derde vraag heeft twee lagen. Hoe lang houdt elk van deze "geheimen" het vol?</p>`,
      content: `
        <p>Voordat computers bestonden, versleutelden mensen al berichten. Die klassieke cijfers zijn
        tegenwoordig waardeloos als beveiliging, maar perfect om het idee te snappen: je neemt plaintext,
        past een regel toe, en krijgt ciphertext.</p>

        <h3>Het Caesarcijfer</h3>
        <p>Vernoemd naar Julius Caesar: je schuift elke letter een vast aantal plaatsen op in het alfabet.
        Bij een verschuiving van 3 wordt <code>a</code> een <code>d</code>, <code>b</code> een <code>e</code>,
        enzovoort. Het woord <code>geheim</code> wordt dan <code>jhkhlp</code>. De "sleutel" is het getal waarmee
        je schuift — en daar zit meteen het probleem: er zijn maar 25 zinvolle verschuivingen. Een aanvaller
        probeert ze gewoon allemaal (dat heet <em>brute force</em>) en is binnen een seconde klaar.</p>

        <h3>ROT13</h3>
        <p>ROT13 is een Caesarcijfer met een vaste verschuiving van 13. Omdat het alfabet 26 letters heeft,
        is ROT13 <strong>zijn eigen omkering</strong>: tweemaal ROT13 toepassen geeft de oorspronkelijke tekst.
        Je zag het vroeger op forums om spoilers te verbergen — níet om iets echt geheim te houden.</p>
        <div class="callout info">
          <strong>Let op:</strong> ROT13 en Caesar raken alleen letters. Cijfers, de accolades
          <code>{ }</code> en underscores in een vlag blijven staan. Een versleutelde vlag ziet er daarom
          nog steeds "een beetje als een vlag" uit.
        </div>

        <h3>Waarom zijn ze zwak?</h3>
        <ul>
          <li><strong>Te kleine sleutelruimte:</strong> 25 mogelijkheden bij Caesar — triviaal om allemaal te proberen.</li>
          <li><strong>Geen echt sleutelgeheim:</strong> het algoritme <em>is</em> de sleutel; ken je ROT13, dan ben je binnen.</li>
          <li><strong>Frequentieanalyse:</strong> in het Nederlands komt de <code>e</code> het vaakst voor. Tel de letters
          in de ciphertext en je raadt de verschuiving zonder alles te proberen.</li>
        </ul>
        <p>De les: echte versleuteling leunt niet op een geheim algoritme, maar op een geheime sleutel die groot
        genoeg is (het <em>principe van Kerckhoffs</em>). Dat werken we in de volgende taken uit met AES en RSA.</p>

        <p>Bij gestapelde lagen draai je de volgorde om: wat als laatste is toegepast, haal je er als eerste af.
        Een vlag die eerst met ROT13 is bewerkt en daarna als Base64 is gecodeerd, lees je dus met eerst
        <code>Van Base64</code> en dan <code>ROT13</code>.</p>
      `,
      lab: { type: 'cyberchef', input: 'AZ{xynffvrxr_pvwsref_mvwa_mjnx}' },
      questions: [
        { q: 'Het woord wpujvkl is versleuteld met een Caesarcijfer met een onbekende verschuiving. Welk Nederlands woord staat er?', answer: ['pincode'],
          hints: ['Er zijn maar 25 mogelijkheden. Proberen is sneller dan nadenken.', 'Zet wpujvkl in het invoervak, kies "Caesar (n)" en loop n af van 1 tot 25.', 'Het woord is iets wat je intoetst bij een betaalautomaat.'],
          wrong: { 'wpujvkl': 'Dat is de ciphertext zelf. Voeg de Caesar-bewerking toe en verander het getal.', 'jchwixy': 'Je hebt ROT13 gebruikt. Dat is Caesar met precies 13; hier is een andere verschuiving gebruikt.' },
          explain: 'Bij n = 19 in het lab (zeven terug) staat er "pincode". Je had hooguit 25 pogingen nodig: de sleutelruimte is veel te klein.' },
        { q: 'Pas ROT13 toe op de string in het lab. Wat is de vlag?', answer: ['NM{klassieke_cijfers_zijn_zwak}'], encoded: true, hint: 'ROT13 is zijn eigen omkering; één keer toepassen is genoeg.', explain: 'ROT13 verbergt niets; het is binnen één klik leesbaar.' },
        { q: 'Meerstaps: neem QVp7Z2pycl9tam54eHJfeW50cmF9, kies eerst "Van Base64" en daarna "ROT13". Wat is de vlag?', answer: ['NM{twee_zwakke_lagen}'], encoded: true, hint: 'Twee zwakke lagen stapelen maakt het niet sterk. Eerst Base64 eraf, dan ROT13.', explain: 'Twee omkeerbare bewerkingen stapelen levert nog steeds geen echte beveiliging op.' },
        { q: 'Hoeveel plaatsen was elke letter van het woord uit de eerste vraag vooruit geschoven bij het versleutelen?', answer: ['7', 'zeven'],
          hints: ['Vergelijk de eerste letter van de ciphertext met de eerste letter van je oplossing.', 'Tel in het alfabet van p naar w.', 'Het getal waarmee je in het lab terugdraait en het getal waarmee is versleuteld tellen samen op tot 26.'],
          wrong: { '19': 'Dat is het getal waarmee je in het lab terugdraait. Versleutelen en ontsleutelen tellen samen op tot 26; gevraagd is de andere helft.', '13': 'Dat zou ROT13 zijn. Tel van p naar w.' },
          explain: 'p wordt w: zeven plaatsen vooruit. Terugdraaien is zeven terug, of 19 vooruit, want 7 + 19 = 26.' },
      ],
    },

    {
      title: 'Taak 3 — Symmetrische encryptie: één sleutel (AES)',
      tryFirst: true,
      intro: `<p>Het bestand in het lab is echt versleuteld met AES-128. Je hebt de sleutel niet en die ga je ook niet vinden. Wat je wel weet: het origineel is een lijst van vijf rekeningen, in volgorde. Elke rekening beslaat twee regels van 16 bytes: eerst een regel met het rekeningnummer, dan een regel met het saldo. Bekijk de tien regels in de hex-dump. Wat kun je over de saldi zeggen zonder iets te ontsleutelen?</p>`,
      lab: { type: 'hexviewer', filename: 'saldi.aes (AES-128, mode onbekend)', hex: CRY_ECB_HEX },
      content: `
        <p>Bij <strong>symmetrische encryptie</strong> gebruik je <em>dezelfde</em> sleutel om te versleutelen
        én te ontsleutelen. Analogie: een kluis met één sleutel. Wie de sleutel heeft, kan erin én eruit.</p>

        <h3>AES</h3>
        <p>De standaard van vandaag is <strong>AES</strong> (Advanced Encryption Standard), met sleutels van
        128, 192 of 256 bits. AES is een <em>blokcijfer</em>: het versleutelt gegevens in blokken van 16 bytes.
        Het is snel (moderne processors hebben er speciale instructies voor) en wordt wereldwijd vertrouwd —
        van je versleutelde harde schijf (BitLocker, FileVault) tot wifi (WPA2/WPA3) en de inhoud van een
        TLS-verbinding.</p>
        <p>Waarom is AES-256 veilig terwijl Caesar dat niet is? De sleutelruimte. 256 bits betekent ongeveer
        10<sup>77</sup> mogelijke sleutels. Alle computers op aarde samen zouden het heelal meerdere keren
        moeten overleven om ze allemaal te proberen. Brute force is dan geen optie.</p>

        <div class="callout tip">
          <strong>Tip:</strong> hoe je AES gebruikt is net zo belangrijk als dát je het gebruikt. Een blokcijfer
          heeft een <em>mode</em> nodig. Gebruik een moderne mode zoals <strong>GCM</strong> (die ook integriteit
          controleert) en nooit het ouderwetse <strong>ECB</strong>: dat laat patronen in je data gewoon zichtbaar.
          Gebruik ook per bericht een unieke <em>IV/nonce</em>.
        </div>

        <h3>Het sleutelbeheerprobleem</h3>
        <p>Hier wringt het bij symmetrische encryptie. Jij en ik moeten allebei dezelfde geheime sleutel hebben.
        Maar hoe krijg ik die sleutel bij jou zónder dat een afluisteraar hem onderschept? Hem meesturen in een
        mailtje kan niet — dan kan die afluisteraar alles lezen. Dit heet het
        <strong>sleutelbeheer- of sleuteldistributieprobleem</strong>.</p>
        <p>Nog een probleem: het aantal sleutels. Als tien mensen onderling veilig willen praten en iedereen een
        aparte sleutel per paar nodig heeft, zijn dat al 45 sleutels. Bij honderd mensen bijna 5000. Dat schaalt
        niet. De oplossing — asymmetrische encryptie en slimme sleuteluitwisseling — is het onderwerp van de
        volgende taak.</p>
      `,
      questions: [
        { q: 'Welke eigenschap is kenmerkend voor symmetrische encryptie?', options: ['Twee verschillende sleutels, een publieke en een private', 'Dezelfde sleutel versleutelt en ontsleutelt', 'Er is helemaal geen sleutel nodig'], answer: 1, explain: 'Symmetrisch = één gedeelde sleutel voor beide richtingen.' },
        { q: 'Hoeveel van de vijf saldoregels in het versleutelde bestand zijn byte voor byte aan elkaar gelijk?', answer: ['4', 'vier'],
          hints: ['Elke regel in de hex-dump is precies één blok van 16 bytes.', 'De saldoregels zijn de tweede, vierde, zesde, achtste en tiende regel. Vergelijk hun eerste bytes.', 'Vier regels beginnen met 9D 93 84 C1. Eén begint anders.'],
          wrong: { '5': 'Bijna: één saldoregel begint met 9A F2 in plaats van 9D 93.', '0': 'Kijk naar de regels op offset 10, 30, 70 en 90: die zijn identiek.', '10': 'Er zijn tien blokken, maar gevraagd is hoeveel saldoblokken aan elkaar gelijk zijn.' },
          why: 'Gelijke blokken in ciphertext verraden gelijke blokken in het origineel. Zo lekt een bestand informatie terwijl het algoritme zelf niet gebroken is.',
          explain: 'Vier saldoblokken zijn identiek. Dat kan alleen als elk blok los en met dezelfde sleutel is versleuteld: de mode ECB.' },
        { q: 'Hoe heet het kernprobleem dat symmetrische encryptie alleen niet oplost?', options: ['Het sleutelbeheer-/sleuteldistributieprobleem', 'Dat AES te langzaam is', 'Dat de ciphertext te lang wordt'], answer: 0, explain: 'Je moet de gedeelde sleutel veilig bij de ander krijgen zonder dat die onderschept wordt.' },
        { q: 'Welke rekening (1 tot en met 5) heeft een ander saldo dan de rest?', answer: ['3', 'rekening 3', '0003'],
          hints: ['Zoek de saldoregel die afwijkt en tel bij welke rekening hij hoort.', 'Elke rekening is twee regels: regel 1 en 2 zijn rekening 1, regel 3 en 4 rekening 2, enzovoort.', 'De afwijkende regel staat op offset 50, de zesde regel.'],
          wrong: { '6': 'De zesde regel wijkt af, maar elke rekening beslaat twee regels. Deel door twee.', '50': 'Dat is de offset van het afwijkende blok. Gevraagd is het nummer van de rekening.' },
          explain: 'Het zesde blok is het saldo van rekening 3. Je weet nu wie een afwijkend saldo heeft, zonder sleutel. Met GCM en een unieke nonce per bericht zouden alle blokken er verschillend uitzien.' },
      ],
    },

    {
      title: 'Taak 4 — Asymmetrische encryptie: twee sleutels',
      tryFirst: true,
      intro: `<p>In het lab staat een publieke RSA-sleutel (n en e) en een onderschept bericht c. De sleutel is expres veel te klein. Laat het lab n ontbinden in twee priemgetallen, bereken daarmee de private exponent en ontsleutel het bericht. Bedenk daarna: wat verandert er als n niet 34 bits telt maar 2048?</p>`,
      lab: { type: 'rsa', title: 'een veel te kleine sleutel', n: '10967535067', e: '65537', c: '2831459048' },
      content: `
        <p><strong>Asymmetrische encryptie</strong> (ook wel <em>public-key cryptografie</em>) lost het
        sleutelprobleem op met een geniale truc: iedereen krijgt een <strong>sleutelpaar</strong> — een
        <strong>publieke sleutel</strong> die je gerust mag rondstrooien, en een <strong>private sleutel</strong>
        die je nooit deelt. Wat je met de ene versleutelt, open je alleen met de andere.</p>

        <figure class="diagram">
          <svg viewBox="0 0 520 150">
            <rect x="10" y="50" width="110" height="50" rx="8" fill="var(--surface-2)" stroke="currentColor" />
            <text x="65" y="80" text-anchor="middle" fill="currentColor" font-size="13">Afzender</text>
            <rect x="400" y="50" width="110" height="50" rx="8" fill="var(--surface-2)" stroke="currentColor" />
            <text x="455" y="80" text-anchor="middle" fill="currentColor" font-size="13">Ontvanger</text>
            <line x1="120" y1="75" x2="400" y2="75" stroke="var(--accent)" />
            <text x="260" y="40" text-anchor="middle" fill="currentColor" font-size="13">versleutel met PUBLIEKE sleutel ontvanger</text>
            <text x="260" y="100" text-anchor="middle" fill="currentColor" font-size="13">ontsleutel met PRIVATE sleutel ontvanger</text>
          </svg>
          <figcaption>Vertrouwelijkheid: versleutel met de publieke sleutel van de ontvanger; alleen die kan het met zijn private sleutel openen.</figcaption>
        </figure>

        <h3>RSA en ECC</h3>
        <p><strong>RSA</strong> is het klassieke algoritme; de veiligheid leunt op het feit dat het ontbinden van
        een heel groot getal in priemfactoren extreem traag is. RSA-sleutels zijn daarom groot (2048 of 4096 bits).
        <strong>ECC</strong> (Elliptic Curve Cryptography) bereikt dezelfde sterkte met veel kleinere sleutels
        (een 256-bits ECC-sleutel is ruwweg zo sterk als RSA-3072), wat sneller is en zuiniger — ideaal voor
        telefoons en kleine apparaten.</p>
        <div class="callout info">
          <strong>Waarom niet alles asymmetrisch?</strong> Asymmetrische encryptie is traag en voor grote
          hoeveelheden data onpraktisch. In de praktijk combineer je: je gebruikt asymmetrische encryptie alléén
          om een verse <em>symmetrische</em> sleutel veilig uit te wisselen, en versleutelt daarna de echte data
          snel met AES. Dat heet een <em>hybride</em> systeem — precies wat TLS doet.
        </div>

        <h3>Sleuteluitwisseling: Diffie-Hellman</h3>
        <p>Met <strong>Diffie-Hellman</strong> kunnen twee partijen samen een gedeelde geheime sleutel
        afspreken terwijl ze alleen openbare berichten uitwisselen. De analogie met verf: jullie beginnen allebei
        met dezelfde publieke basiskleur, mengen daar ieder in het geheim een eigen kleur door, en wisselen de
        mengsels uit. Vervolgens mengt ieder zijn eigen geheime kleur door het ontvangen mengsel. Beiden komen op
        exact dezelfde eindkleur uit, terwijl een afluisteraar die de mengsels onderschept de geheime kleuren niet
        kan terugrekenen. De moderne variant <strong>ECDH</strong> doet dit op elliptische krommen. Doe je dit met
        telkens verse, tijdelijke sleutels (<em>ephemeral</em>), dan krijg je <strong>forward secrecy</strong>:
        zelfs als later een private sleutel uitlekt, blijven oude gesprekken onleesbaar.</p>

        <h3>Digitale handtekeningen</h3>
        <p>Je kunt het sleutelpaar ook andersom gebruiken, voor <strong>authenticiteit</strong> en
        <strong>onweerlegbaarheid</strong>. De afzender maakt een hash van het bericht en versleutelt die hash met
        zijn <em>private</em> sleutel: dat is de handtekening. Iedereen kan met de bijbehorende <em>publieke</em>
        sleutel controleren dat de handtekening klopt. Lukt dat, dan weet je zeker dat het bericht van de houder
        van de private sleutel komt én onderweg niet is gewijzigd.</p>
      `,
      questions: [
        { q: 'Je wilt een vertrouwelijk bericht aan Fatima sturen. Met welke sleutel versleutel je het?', options: ['Fatima\'s publieke sleutel', 'Fatima\'s private sleutel', 'Je eigen private sleutel'], answer: 0, explain: 'Alleen Fatima kan het dan openen, want alleen zij heeft de bijbehorende private sleutel.' },
        { q: 'Laat het lab de modulus n ontbinden. Wat is de kleinste van de twee priemfactoren?', answer: ['104723'],
          hints: ['De veiligheid van RSA hangt af van hoe moeilijk n te ontbinden is.', 'Klik op een van de aanvallen op n, bijvoorbeeld proefdeling of Fermat.', 'De twee factoren liggen vlak bij elkaar, net boven de 104.700.'],
          wrong: { '104729': 'Dat is de grootste van de twee. Gevraagd is de kleinste.', '10967535067': 'Dat is n zelf. Je zoekt de priemgetallen waarvan n het product is.', '65537': 'Dat is de publieke exponent e. Die is geen factor van n.' },
          why: 'Wie n kan ontbinden, heeft de private sleutel. Bij 2048 bits lukt dat met de bekende methoden niet binnen een bruikbare tijd; bij 34 bits kost het een fractie van een seconde.',
          explain: 'n = 104723 × 104729. Met de factoren is de rest gewoon rekenwerk.' },
        { q: 'Waarvoor wordt Diffie-Hellman gebruikt?', options: ['Het veilig afspreken van een gedeelde sleutel over een open kanaal', 'Het permanent opslaan van wachtwoorden', 'Het comprimeren van bestanden'], answer: 0, explain: 'DH laat twee partijen een gedeelde geheime sleutel afleiden zonder die ooit te versturen.' },
        { q: 'Met welke sleutel plaatst een afzender een digitale handtekening?', options: ['Zijn eigen private sleutel', 'De publieke sleutel van de ontvanger', 'Een gedeelde AES-sleutel'], answer: 0, explain: 'Hij tekent met zijn private sleutel; iedereen verifieert met zijn publieke sleutel.' },
        { q: 'Bereken met de gevonden factoren de private exponent en ontsleutel c. Welke tekst van vier letters komt eruit?', answer: ['SLOT'],
          hints: ['Met p en q kun je φ(n) uitrekenen, en daarmee de private exponent d.', 'Klik op "Bereken φ, d en ontsleutel" zodra p en q zijn ingevuld.', 'Lees de regel "m (tekst)" in de uitvoer. Het is iets wat je op een deur vindt.'],
          wrong: { '1397509972': 'Dat is het bericht als getal. Het lab toont het ook als tekst.', '10195862609': 'Dat is de private exponent d. Gebruik die om c te ontsleutelen en lees de tekst.', '/^0x/': 'Dat is de hex-weergave. Eén regel lager staat het bericht als tekst.' },
          explain: 'd = 10195862609 en c tot de macht d modulo n geeft de bytes van "SLOT". De publieke sleutel was genoeg om het bericht te lezen, omdat n te klein was.' },
      ],
    },

    {
      title: 'Taak 5 — Certificaten, PKI en hoe TLS alles combineert',
      tryFirst: true,
      intro: `<p>Een browser controleert bij elke HTTPS-verbinding drie dingen: klopt de naam, is het certificaat nog geldig, en eindigt de keten bij een root die hij vertrouwt? In het lab staat de ruwe uitvoer van zo'n controle voor vijf fictieve sites, zonder oordeel. Speel zelf voor browser: welke sites keur je af, en waarom?</p>`,
      lab: { type: 'logs', title: 'certificaatcontrole.txt (vijf fictieve sites)', lines: CRY_CERTLOG },
      content: `
        <p>Asymmetrische encryptie heeft één zwakke plek: hoe weet je zeker dat een publieke sleutel écht van
        wie je denkt is? Als een aanvaller je zijn eigen publieke sleutel aansmeert als die van je bank, versleutel
        je netjes... naar de aanvaller. Dit noemen we een <strong>man-in-the-middle</strong>-aanval. De oplossing
        is een vertrouwensstructuur: certificaten en PKI.</p>

        <h3>Certificaten</h3>
        <p>Een <strong>digitaal certificaat</strong> koppelt een identiteit (bijvoorbeeld het domein
        <code>www.voorbeeld.nl</code>) aan een publieke sleutel. Een <strong>Certificate Authority</strong> (CA) —
        een partij die iedereen vertrouwt — controleert die identiteit en <em>ondertekent</em> het certificaat
        met háár private sleutel. Een certificaat is dus eigenlijk "een publieke sleutel plus een naam, digitaal
        ondertekend door een CA".</p>

        <h3>PKI en de vertrouwensketen</h3>
        <p><strong>PKI</strong> (Public Key Infrastructure) is het hele systeem van CA's, certificaten en regels
        eromheen. Je besturingssysteem en browser hebben een lijst met vertrouwde <strong>root-CA's</strong>. Een
        website-certificaat is meestal niet direct door een root ondertekend, maar door een <em>tussenliggende</em>
        CA, die weer door de root is ondertekend. Zo ontstaat een <strong>certificaatketen</strong> die eindigt
        bij een root die jouw apparaat al vertrouwt.</p>

        <figure class="diagram">
          <svg viewBox="0 0 520 90">
            <rect x="10" y="30" width="120" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor" />
            <text x="70" y="55" text-anchor="middle" fill="currentColor" font-size="13">Root-CA</text>
            <line x1="130" y1="50" x2="200" y2="50" stroke="var(--accent)" />
            <rect x="200" y="30" width="120" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor" />
            <text x="260" y="55" text-anchor="middle" fill="currentColor" font-size="13">Tussen-CA</text>
            <line x1="320" y1="50" x2="390" y2="50" stroke="var(--accent)" />
            <rect x="390" y="30" width="120" height="40" rx="8" fill="var(--surface-2)" stroke="currentColor" />
            <text x="450" y="55" text-anchor="middle" fill="currentColor" font-size="13">Website</text>
          </svg>
          <figcaption>De vertrouwensketen: de root ondertekent de tussen-CA, die ondertekent het certificaat van de website.</figcaption>
        </figure>

        <h3>Hoe TLS alles samenbrengt</h3>
        <p><strong>TLS</strong> (de "s" van HTTP<strong>S</strong>) combineert alles uit deze room in één handdruk:</p>
        <ol>
          <li>De server stuurt zijn <strong>certificaat</strong>. Je browser controleert de handtekeningketen tot
          een vertrouwde root, checkt of het certificaat bij het domein hoort, nog geldig is en niet is ingetrokken.</li>
          <li>Via <strong>(EC)DH</strong> spreken client en server een verse, gedeelde <strong>symmetrische</strong>
          sleutel af. De server bewijst met zijn <strong>private</strong> sleutel dat hij echt de houder van het
          certificaat is (<em>authenticatie</em> via een handtekening).</li>
          <li>De rest van het verkeer gaat snel en vertrouwelijk met <strong>AES</strong> (symmetrisch), met
          integriteitscontrole erbij.</li>
        </ol>
        <div class="callout tip">
          <strong>Tip:</strong> het hangslotje in de adresbalk betekent alleen dat de <em>verbinding</em> versleuteld
          is, niet dat de site te vertrouwen is. Ook phishingsites hebben tegenwoordig een gratis certificaat. Kijk
          dus altijd ook naar het <em>domein</em> zelf.
        </div>
      `,
      questions: [
        { q: 'Wat koppelt een digitaal certificaat aan elkaar?', options: ['Een identiteit (zoals een domein) en een publieke sleutel', 'Twee symmetrische sleutels', 'Een wachtwoord en een gebruikersnaam'], answer: 0, explain: 'Een certificaat zegt: "deze publieke sleutel hoort bij deze naam", ondertekend door een CA.' },
        { q: 'Welke host biedt een certificaat aan dat op de dag van de controle al verlopen is?', answer: ['shop.nm.lab'],
          hints: ['Vergelijk bij elke site de regel "geldig" met de datum bovenaan de uitvoer.', 'Filter op "geldig" om de vijf geldigheidsperiodes onder elkaar te zien.', 'De einddatum ligt in oktober 2026.'],
          wrong: { 'intern.nm.lab': 'Dat certificaat is nog tot 2036 geldig. Er is daar iets anders mis: kijk naar de uitgever en de keten.', 'portaal.nm.lab': 'Dat certificaat verloopt binnenkort (30 november), maar is op 12 november nog geldig.', 'betalen.nm.lab': 'De datums kloppen hier. Kijk bij deze site naar de naam in het certificaat.' },
          explain: 'Het certificaat van shop.nm.lab liep tot en met 8 oktober 2026; de controle is van 12 november. De keten en de naam kloppen wel.' },
        { q: 'Waarom gebruikt TLS zowel asymmetrische als symmetrische encryptie?', options: ['Asymmetrisch om veilig een symmetrische sleutel af te spreken, symmetrisch (AES) voor de snelle data erna', 'Puur toeval, het had ook met alleen RSA gekund', 'Om de verbinding langzamer en dus veiliger te maken'], answer: 0, explain: 'Hybride: asymmetrisch lost de sleuteluitwisseling op, symmetrisch doet het snelle werk.' },
        { q: 'Betekent een geldig hangslotje dat een website te vertrouwen is?', options: ['Nee, het zegt alleen dat de verbinding versleuteld is', 'Ja, dan is de site gegarandeerd echt', 'Alleen bij banken'], answer: 0, explain: 'Ook phishingsites hebben een certificaat; controleer altijd het domein zelf.' },
        { q: 'De site betalen.nm.lab stuurt een geldig, netjes ondertekend certificaat, en toch keurt de browser het af. Voor welke naam is dat certificaat uitgegeven?', answer: ['betalen-nm.example'],
          hints: ['Een certificaat koppelt een sleutel aan een naam. Welke naam staat erin?', 'Lees bij site 3 de regels "onderwerp" en "namen" en vergelijk ze met de host.', 'De naam eindigt op .example.'],
          wrong: { 'betalen.nm.lab': 'Dat is de host waarmee je verbinding maakt. In het certificaat staat een andere naam.', 'NM Lab Issuing CA 2': 'Dat is de uitgever. Gevraagd is de naam waarvoor het certificaat is uitgegeven.' },
          why: 'Zonder naamcontrole kan iedereen met een geldig certificaat voor zijn eigen domein zich voordoen als een ander. Dit is de controle die een man-in-the-middle tegenhoudt.',
          explain: 'Datum en keten zijn in orde, maar het certificaat is van betalen-nm.example. De naam hoort bij een andere partij, dus de browser weigert.' },
        { q: 'Welke host gebruikt een certificaat dat door zichzelf is ondertekend (self-signed)?', answer: ['intern.nm.lab'],
          hints: ['Bij een self-signed certificaat zijn onderwerp en uitgever dezelfde.', 'Filter op "keten": één keten is maar één schakel lang.', 'Het is de site met een geldigheid van tien jaar.'],
          wrong: { 'shop.nm.lab': 'Dat certificaat is uitgegeven door NM Lab Issuing CA 1. Het probleem daar is de datum.', 'mail.nm.lab': 'Bij mail.nm.lab klopt alles: naam, datum en keten.' },
          explain: 'Bij intern.nm.lab is de uitgever gelijk aan het onderwerp en eindigt de keten niet bij NM Lab Root CA. De verbinding is wel versleuteld, maar niemand staat in voor de identiteit.' },
      ],
    },

    {
      title: 'Taak 6 — Hashfuncties en integriteit',
      content: `
        <p>Een <strong>cryptografische hashfunctie</strong> neemt een invoer van elke lengte en geeft een vaste,
        korte uitvoer: de <strong>hash</strong> of <em>digest</em>. SHA-256 geeft bijvoorbeeld altijd 256 bits
        (64 hextekens), of je er nu één letter of een hele film in stopt.</p>

        <h3>Eigenschappen van een goede hashfunctie</h3>
        <ul>
          <li><strong>Deterministisch:</strong> dezelfde invoer geeft altijd dezelfde hash.</li>
          <li><strong>Eenrichting (preimage-bestendig):</strong> uit de hash de invoer terugrekenen is onmogelijk.</li>
          <li><strong>Lawine-effect:</strong> één bitje veranderen in de invoer verandert de hele hash volledig.</li>
          <li><strong>Botsingsbestendig (collision resistant):</strong> het is onhaalbaar om twee verschillende
          invoeren te vinden met dezelfde hash.</li>
        </ul>

        <h3>Integriteitscontrole</h3>
        <p>Omdat de hash als een vingerafdruk werkt, gebruik je hashes om te controleren of een bestand onderweg
        niet is veranderd. Downloadsites publiceren vaak de SHA-256 van een installatiebestand. Download je het,
        dan bereken je zelf de hash en vergelijk je die. Komt er ook maar één teken niet overeen, dan is het
        bestand beschadigd of gemanipuleerd — niet installeren dus.</p>
        <div class="callout info">
          <strong>Integriteit vs. authenticiteit:</strong> een kale hash bewijst alleen dat de data niet
          <em>per ongeluk</em> veranderde. Een aanvaller die het bestand én de gepubliceerde hash kan aanpassen,
          komt ermee weg. Voor echte authenticiteit combineer je een hash met een geheim (een <strong>HMAC</strong>)
          of met een digitale handtekening.
        </div>

        <h3>Waarom MD5 en SHA-1 gebroken zijn</h3>
        <p><strong>MD5</strong> en <strong>SHA-1</strong> waren vroeger populair, maar onderzoekers hebben echte
        <em>botsingen</em> gevonden: twee verschillende invoeren met dezelfde hash. Dat ondermijnt precies de
        garantie die een hash moet geven. MD5-botsingen bereken je inmiddels in seconden; voor SHA-1 is in 2017
        de eerste praktische botsing gedemonstreerd ("SHAttered"). Gebruik ze daarom <strong>niet meer</strong>
        voor beveiliging — alleen nog hooguit als simpele checksum tegen toevallige fouten. De moderne keuze is de
        <strong>SHA-2-familie</strong> (zoals SHA-256) of <strong>SHA-3</strong>.</p>

        <p>Gebruik het CyberChef-lab om zelf een SHA-256 te berekenen. Typ in het invoervak het woord
        <code>integriteit</code> (alleen dat woord, kleine letters, geen spaties) en kies de bewerking
        <code>SHA2 256</code>. Lees de eerste 8 tekens van de hash af.</p>
      `,
      lab: { type: 'cyberchef', input: 'integriteit' },
      questions: [
        { q: 'Bereken de SHA-256 van het woord "integriteit" in het lab. Wat zijn de eerste 8 tekens van de hash?', answer: ['cb168abe'], hint: 'Kies SHA2 256 en lees de eerste acht tekens van links af.', explain: 'De volledige hash begint met cb168abe...; dezelfde invoer geeft altijd dezelfde hash (deterministisch).' },
        { q: 'Verander in het lab alleen de eerste letter in een hoofdletter: Integriteit. Wat zijn nu de eerste 8 tekens van de SHA-256?', answer: ['a67fba74'],
          hints: ['Verander niets anders dan die ene letter en laat de bewerking SHA2 256 staan.', 'Vergelijk de nieuwe hash met de vorige: hoeveel tekens zijn gelijk gebleven?', 'De hash begint nu met a67f.'],
          wrong: { 'cb168abe': 'Dat is de hash van het woord met een kleine letter i. Typ een hoofdletter I.', '/^[0-9a-f]{32}$/': 'Dat lijkt een MD5 (32 tekens). Kies SHA2 256.' },
          explain: 'Eén letter anders en de hele hash is anders: van cb168abe naar a67fba74. Dat is het lawine-effect, en daarom zie je aan een hash meteen of een bestand is gewijzigd.' },
        { q: 'Waarom gelden MD5 en SHA-1 als onveilig voor beveiliging?', options: ['Er zijn praktische botsingen gevonden', 'Ze zijn te langzaam geworden', 'Ze geven een te lange hash'], answer: 0, explain: 'Gevonden botsingen breken de botsingsbestendigheid, de kern van een veilige hash.' },
        { q: 'Je downloadt een bestand en de SHA-256 komt niet overeen met de gepubliceerde waarde. Wat doe je?', options: ['Niet installeren; het bestand is beschadigd of gemanipuleerd', 'Toch installeren, een paar tekens verschil mag', 'De hash negeren, die is onbelangrijk'], answer: 0, explain: 'Elke afwijking betekent gewijzigde bytes; vertrouw het bestand niet.' },
      ],
    },

    {
      title: 'Taak 7 — Wachtwoorden veilig opslaan',
      tryFirst: true,
      intro: `<p>Uit een fictieve webwinkel is de gebruikerstabel gelekt. Zes gebruikers, zes manieren van opslaan. Plak elke waarde in het lab en zoek uit wat het is. Wie is het best beschermd, wie het slechtst, en welke rij is helemaal geen hash?</p>
<pre><code>anna    b0d96558e9ce2176c09a69a4685c676f
bram    $2b$12$LaBN9dY6pc/WEtC6bLzSjTOSqy69ov6iEMzeT7Fpv7g1Vx1Pk.NOP
chris   {SHA}Gfb5oDae7pz0pduNOPe6ysIaM+0=
dewi    $argon2id$v=19$m=19456,t=2,p=1$mIXHvUBy+B6Zm1B/Rdkj1l$spWqKsDEo8t4Y4QRMteercQltpGLDXdbEQ+htFKExfT
emre    fe09724f917fccf987e1d5c71d422d23fc7b08e603ffb49ca737ca9a8f89c8dd
femke   QVp7cGJxcmVyYV92Zl90cnJhX3VuZnVyYX0=</code></pre>`,
      lab: { type: 'hashid', value: '' },
      content: `
        <p>Een dienst mag jouw wachtwoord nooit als leesbare tekst opslaan. Lekt de database, dan liggen meteen
        alle wachtwoorden op straat — en omdat mensen wachtwoorden hergebruiken, ook hun accounts elders. De
        oplossing is hashing, maar met een paar belangrijke aanvullingen.</p>

        <h3>Stap 1: hash het wachtwoord</h3>
        <p>Sla niet het wachtwoord op, maar de hash ervan. Bij het inloggen hash je het ingetypte wachtwoord
        opnieuw en vergelijk je de hashes. Maar een gewone snelle hash (zoals SHA-256) is hier juist een probleem:
        aanvallers kunnen er miljarden per seconde proberen.</p>

        <h3>Stap 2: voeg een salt toe</h3>
        <p>Een <strong>salt</strong> is een willekeurige, unieke waarde per wachtwoord die je er vóór het hashen
        bij plakt. Je slaat de salt gewoon naast de hash op (die hoeft niet geheim te zijn). Een salt doet twee
        dingen:</p>
        <ul>
          <li>Twee gebruikers met hetzelfde wachtwoord krijgen tóch verschillende hashes.</li>
          <li>Voorberekende tabellen (<strong>rainbow tables</strong>) worden waardeloos, want de aanvaller zou
          voor elke mogelijke salt een aparte tabel moeten bouwen.</li>
        </ul>

        <h3>Stap 3: gebruik een langzame hash</h3>
        <p>Snel is hier slecht. Je wilt een functie die juist <em>expres traag</em> en geheugenintensief is, zodat
        een aanvaller er maar weinig per seconde kan proberen terwijl jij bij het inloggen nauwelijks vertraging
        merkt. Daarvoor zijn speciale <strong>wachtwoordhashes</strong> ontworpen:</p>
        <table>
          <thead><tr><th>Functie</th><th>Kenmerk</th></tr></thead>
          <tbody>
            <tr><td><strong>bcrypt</strong></td><td>Beproefd, instelbare werkfactor (cost).</td></tr>
            <tr><td><strong>scrypt</strong></td><td>Ook geheugenintensief, lastiger met speciale hardware te versnellen.</td></tr>
            <tr><td><strong>Argon2</strong></td><td>De moderne aanrader (won de Password Hashing Competition), regelt tijd én geheugen.</td></tr>
          </tbody>
        </table>
        <div class="callout danger">
          <strong>Niet doen:</strong> wachtwoorden opslaan als platte tekst, als Base64 (dat is geen beveiliging!),
          of als kale MD5/SHA-1/SHA-256 zonder salt en zonder werkfactor. Dat is in de praktijk zo gekraakt.
        </div>
        <div class="callout info">
          <strong>Pepper:</strong> sommige systemen voegen naast de salt nog een geheime, serverbrede waarde toe
          (een <em>pepper</em>) die níet in de database staat maar in een sleutelkluis. Lekt alleen de database,
          dan mist de aanvaller de pepper.
        </div>
        <p>In de volgende room over wachtwoorden en authenticatie zie je in een lab zelf hoe snel een zwak,
        slecht gehasht wachtwoord valt tegen een woordenlijst.</p>
      `,
      questions: [
        { q: 'Wat is de belangrijkste reden om een salt toe te voegen aan een wachtwoord-hash?', options: ['Zodat gelijke wachtwoorden verschillende hashes krijgen en rainbow tables nutteloos worden', 'Om het wachtwoord korter te maken', 'Om het wachtwoord later weer te kunnen uitlezen'], answer: 0, explain: 'De salt is uniek per wachtwoord, dus voorberekende tabellen werken niet meer.' },
        { q: 'Moet een salt geheim worden gehouden?', options: ['Nee, de salt mag gewoon naast de hash worden opgeslagen', 'Ja, net zo geheim als het wachtwoord', 'Ja, anders werkt de encryptie niet'], answer: 0, explain: 'Een salt hoeft niet geheim te zijn; zijn kracht zit in uniciteit, niet in geheimhouding.' },
        { q: 'Welke gebruiker in de gelekte tabel heeft een hash van het type dat de Password Hashing Competition won?', answer: ['dewi'],
          hints: ['Plak de waarden een voor een in het lab en lees wat het lab herkent.', 'Twee rijen markeert het lab als traag of gesalt. Eén daarvan noemt het lab geheugenhard.', 'De waarde begint met een dollarteken en de naam van de functie.'],
          wrong: { 'bram': 'Dat is bcrypt: ook een goede, trage wachtwoordhash, maar niet de winnaar van de competitie.', 'emre': 'Dat is een kale SHA-256 zonder salt. Lang, maar snel te proberen.' },
          explain: 'De waarde van dewi begint met $argon2id$. In de string staan ook de instellingen voor geheugen (m), tijd (t) en parallelle draden (p), en de salt.' },
        { q: 'Waarom wil je bij wachtwoordopslag een LANGZAME hash in plaats van een snelle zoals SHA-256?', options: ['Een trage, geheugenintensieve hash beperkt hoeveel gokken een aanvaller per seconde kan doen', 'Omdat trage hashes veiliger versleutelen', 'Omdat SHA-256 niet bestaat voor wachtwoorden'], answer: 0, explain: 'De traagheid raakt de aanvaller met miljarden pogingen veel harder dan jou met één login.' },
        { q: 'Ik begrijp waarom je wachtwoorden nooit als platte tekst of als kale MD5 opslaat.', noAnswer: true },
        { q: 'Plak de waarde van anna in het lab. Hoeveel mogelijke hashtypen noemt het lab bij deze ene waarde?', answer: ['3', 'drie'],
          hints: ['Een hash draagt geen etiket. Het lab kijkt alleen naar lengte en tekens.', 'Tel de blokken die het lab onder het invoerveld toont.', 'Het lab noemt MD5 en nog twee typen met dezelfde lengte.'],
          wrong: { '1': 'Het lab toont meer dan één kandidaat. 32 hextekens passen bij meerdere functies.', '32': 'Dat is het aantal tekens van de waarde. Gevraagd is het aantal typen dat het lab noemt.' },
          why: 'Wie het verkeerde type kiest, kraakt niets, ook niet met het juiste wachtwoord in de woordenlijst. De context (een webwinkel of een Windows-domein) beslist.',
          explain: 'MD5, NTLM en MD4 zijn alle drie 32 hextekens. In een webwinkel is MD5 de waarschijnlijke; in een Windows-omgeving zou je eerst aan NTLM denken.' },
        { q: 'Van welke gebruiker is het wachtwoord niet gehasht, maar alleen gecodeerd?', answer: ['femke'],
          hints: ['Een van de zes waarden is omkeerbaar zonder sleutel.', 'Plak de waarden in het lab; bij één waarde zegt het lab dat het geen hash is.', 'De waarde eindigt op een is-teken.'],
          wrong: { 'chris': 'Die waarde bevat wel Base64, maar het is de Base64 van een SHA-1-hash ({SHA}). Terugdraaien levert de hash op, niet het wachtwoord.', 'anna': 'Dat is een echte hash, al is het een zwakke.' },
          explain: 'De waarde van femke is gewone Base64. Wie de tabel heeft, heeft haar wachtwoord.' },
        { q: 'Haal het wachtwoord van die gebruiker uit de tabel. Wat is de vlag?', boss: true, encoded: true, answer: ['NM{coderen_is_geen_hashen}'],
          hints: ['Wat je na de eerste stap ziet, lijkt op een vlag maar is het nog niet. Je hebt zoiets eerder in deze room gezien.', 'Gebruik het CyberChef-lab van taak 1 of 2 en stapel twee bewerkingen.', 'Eerst de laag eraf die het hashid-lab herkende; daarna de bewerking die alleen letters verschuift en zijn eigen omkering is.'],
          wrong: { 'AZ{pbqrera_vf_trra_unfura}': 'Je bent halverwege. Accolades en underscores staan goed, de letters nog niet: er zit nog een laag omheen.', '/^[0-9a-f]{32,64}$/': 'Je hebt de waarde gehasht. Hier moet je twee omkeerbare lagen terugdraaien.' },
          why: 'Twee omkeerbare lagen blijven omkeerbaar. Alleen een trage hash met salt beschermt een wachtwoord als de database lekt.',
          explain: 'Base64 eraf geeft AZ{pbqrera_vf_trra_unfura}; ROT13 daarop geeft de vlag. Herkennen wat iets is, is de helft van het werk.' },
      ],
    },

    {
      title: 'Taak 8 — Verdieping: wat er onder de motorkap gebeurt',
      kind: 'verdieping', optional: true,
      content: `
        <h3>Base64 is rekenwerk, geen geheim</h3>
        <p>Base64 (RFC 4648, 2006) neemt telkens drie bytes, dus 24 bits, en schrijft die als vier tekens van elk
        6 bits. De uitvoer is daardoor een derde langer dan de invoer. Blijft er aan het eind één byte over, dan
        komen er twee is-tekens als opvulling; blijven er twee over, dan één. Daaraan herken je Base64 vaak, maar
        niet altijd: de variant voor URL's en tokens (base64url) gebruikt <code>-</code> en <code>_</code> en laat
        de opvulling meestal weg.</p>

        <h3>AES: de mode maakt of breekt het</h3>
        <p>AES zelf (FIPS 197, 2001) is een blokcijfer met blokken van 128 bits. In taak 3 zag je wat er gebeurt
        als je elk blok los versleutelt. Moderne modes koppelen een teller of het vorige blok eraan. GCM
        (NIST SP 800-38D, 2007) levert daarnaast een controlegetal waarmee je merkt of iemand aan de ciphertext heeft
        gezeten. De valkuil is de nonce: gebruik je bij GCM twee keer dezelfde nonce met dezelfde sleutel, dan lekt
        het verschil tussen de twee berichten en kan een aanvaller geldige controlegetallen vervalsen. De meeste
        fouten met cryptografie zitten in zulk gebruik en zelden in het algoritme.</p>

        <h3>Ondertekenen is geen "versleutelen met de private sleutel"</h3>
        <p>Die zin uit taak 4 is een bruikbaar beeld bij RSA uit het leerboek, maar het klopt niet letterlijk. Echte
        RSA-handtekeningen gebruiken een opvulschema, en algoritmen als ECDSA en Ed25519 versleutelen helemaal
        niets. Onthoud liever: alleen de houder van de private sleutel kan de handtekening maken, iedereen met de
        publieke sleutel kan hem controleren.</p>

        <h3>TLS in de praktijk</h3>
        <p>In TLS 1.3 (RFC 8446, 2018) is de sleuteluitwisseling altijd tijdelijk (ephemeral Diffie-Hellman), zo nodig
        gecombineerd met een eerder gedeelde sleutel. De oude variant waarbij de browser de sessiesleutel versleutelde
        met de RSA-sleutel van de server is geschrapt; daarmee is forward secrecy de norm geworden. Wat TLS niet
        doet: je vertellen of de partij achter het domein betrouwbaar is.</p>

        <h3>Hashes en wachtwoorden</h3>
        <ul>
          <li>Voor SHA-1 volgde na de eerste botsing in 2017 in 2020 een aanval waarbij de aanvaller het begin van
          beide bestanden zelf kiest. Daarmee is SHA-1 ook voor handtekeningen onbruikbaar.</li>
          <li>Argon2 is vastgelegd in RFC 9106 (2021); de variant Argon2id is de gangbare keuze. bcrypt blijft prima,
          maar kijkt alleen naar de eerste 72 bytes van het wachtwoord.</li>
          <li>Een hash is deterministisch. Voor een kleine invoerruimte (een pincode, een telefoonnummer) kun je
          alle mogelijkheden hashen en vergelijken. Een gehasht telefoonnummer is dus niet anoniem.</li>
        </ul>

        <h3>Wat eraan komt</h3>
        <p>Een voldoende grote quantumcomputer zou RSA en ECC breken. NIST publiceerde daarom in augustus 2024 de
        eerste standaarden die daartegen bestand moeten zijn: FIPS 203 (ML-KEM, voor sleuteluitwisseling) en FIPS 204
        en 205 (handtekeningen). AES-256 en SHA-2 gelden vooralsnog als voldoende sterk. De zorg van nu is verkeer
        dat vandaag wordt opgeslagen om het later te ontsleutelen.</p>
      `,
      questions: [
        { q: 'Hoeveel tekens telt de Base64-codering van 10 bytes, inclusief opvulling?', answer: ['16'],
          hints: ['Base64 werkt in groepjes van drie bytes.', 'Tien bytes zijn drie volle groepjes en één byte rest; ook de rest wordt een groepje van vier tekens.', 'Vier groepjes van vier tekens.'],
          wrong: { '14': 'Zonder opvulling kom je op 14 tekens. Met de is-tekens erbij wordt het een veelvoud van vier.', '13': '10 × 4 / 3 is 13,3, maar Base64 schrijft altijd hele groepjes van vier tekens.', '40': 'Vier tekens per byte is te veel: het zijn vier tekens per drie bytes.' },
          explain: 'Drie groepjes van drie bytes geven twaalf tekens; de losse byte geeft twee tekens plus twee is-tekens. Samen 16.' },
        { q: 'Hoeveel is-tekens staan er aan het eind van die Base64-string van 10 bytes?', answer: ['2', 'twee'],
          hints: ['De opvulling hangt af van hoeveel bytes er overblijven na de volle groepjes van drie.', 'Tien gedeeld door drie laat één byte over.', 'Eén byte over betekent de meeste opvulling die Base64 kent.'],
          wrong: { '1': 'Eén is-teken hoort bij twee bytes rest. Hier blijft er één byte over.', '0': 'Geen opvulling is er alleen als het aantal bytes deelbaar is door drie.' },
          explain: 'Eén byte rest: twee tekens data en twee is-tekens.' },
        { q: 'Een pincode van vier cijfers is opgeslagen als SHA-256 zonder salt. Hoeveel hashes moet een aanvaller hooguit berekenen om hem terug te vinden?', answer: ['10000', '10.000', '10^4'],
          hints: ['De hash is niet om te keren, maar de invoerruimte is bekend.', 'Tel hoeveel verschillende pincodes van vier cijfers er bestaan.', 'Van 0000 tot en met 9999.'],
          wrong: { '9999': 'Tel 0000 ook mee.', '/^2\\^256$|^1[.,]?1/': 'Zo groot is de uitvoerruimte van SHA-256. De aanvaller hoeft alleen alle mogelijke invoeren te proberen.' },
          explain: 'Tienduizend pogingen. De sterkte van een hash helpt niet als de invoer te raden is.' },
      ],
    },

    {
      title: 'Taak 9 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examenvragen over cryptografie draaien bijna altijd om één ding: het juiste middel bij het juiste doel.
        Vertrouwelijkheid, integriteit, herkomst en veilige opslag van wachtwoorden vragen elk iets anders. De
        afleiders zijn middelen die wel bestaan en goed klinken, maar een ander doel dienen. Bepaal eerst welk doel
        de situatie vraagt, kies dan pas.</p>
        <p>De vier vragen hieronder zijn voor deze room geschreven, in de stijl van zulke examens.</p>
      `,
      questions: [
        { q: 'Een ontwikkelaar zet API-sleutels als Base64 in een configuratiebestand "zodat ze versleuteld zijn". Het bestand komt in een openbare repository terecht. Wat is de juiste beoordeling?',
          options: ['De sleutels zijn veilig zolang niemand weet dat het Base64 is', 'De sleutels zijn leesbaar voor iedereen; ze moeten worden ingetrokken en voortaan in een sleutelkluis staan', 'De sleutels hadden daarnaast met ROT13 bewerkt moeten worden', 'De sleutels hadden met SHA-256 gehasht in het bestand moeten staan'], answer: 1,
          wrong: { 0: 'Beveiliging die leunt op het geheimhouden van de methode houdt geen stand. Base64 is aan de vorm te herkennen en zonder sleutel om te keren.', 2: 'Twee omkeerbare lagen zonder sleutel blijven omkeerbaar.', 3: 'Hashen klinkt veilig, maar de toepassing heeft de sleutel zelf nodig om zich aan te melden. Uit een hash is die niet terug te halen, dus dit lost het probleem niet op.' },
          explain: 'Base64 is codering. Een gelekt geheim is gelekt: intrekken, vervangen en daarna opslaan op een plek waar toegang wordt geregeld.' },
        { q: 'Je moet een bestand van 2 GB vertrouwelijk naar een partner sturen. Je hebt alleen diens publieke RSA-sleutel. Welke aanpak is gangbaar en veilig?',
          options: ['Het hele bestand in stukken versleutelen met de publieke RSA-sleutel', 'Een willekeurige AES-sleutel maken, het bestand daarmee versleutelen en de AES-sleutel versleutelen met de publieke RSA-sleutel', 'Het bestand ondertekenen met de publieke sleutel van de partner', 'De SHA-256 van het bestand meesturen, zodat alleen de partner het kan lezen'], answer: 1,
          wrong: { 0: 'Asymmetrische encryptie is traag en bedoeld voor kleine hoeveelheden data, zoals een sleutel. Zo wordt het in de praktijk niet gedaan.', 2: 'Ondertekenen doe je met je eigen private sleutel en het geeft herkomst en integriteit. Het maakt niets onleesbaar.', 3: 'Een hash bewijst dat het bestand ongewijzigd is. Het bestand zelf gaat dan nog steeds leesbaar over de lijn.' },
          explain: 'Hybride: asymmetrisch voor de sleutel, symmetrisch voor de data. Dat is ook wat TLS doet.' },
        { q: 'Uit een gelekte database blijkt dat twee gebruikers exact dezelfde wachtwoordhash hebben. De hashes zijn 64 hextekens lang. Wat is de beste conclusie en verbetering?',
          options: ['Er is een botsing in SHA-256 gevonden; stap over op SHA-512', 'De twee gebruikers hebben hetzelfde wachtwoord; gebruik per gebruiker een salt en een trage functie zoals Argon2id', 'De database was niet versleuteld; versleutel de hashes met AES en bewaar de sleutel in dezelfde database', 'De hashes zijn te kort; voeg een tweede ronde SHA-256 toe'], answer: 1,
          wrong: { 0: 'Voor SHA-256 zijn geen botsingen bekend. Gelijke invoer geeft gelijke uitvoer; dat is de verklaring. SHA-512 is even snel te proberen en lost niets op.', 2: 'Een sleutel naast de data die hij beschermt, lekt mee. En het echte probleem, een snelle hash zonder salt, blijft bestaan.', 3: 'Twee snelle rondes zijn nog steeds snel, en gelijke wachtwoorden houden gelijke hashes.' },
          explain: 'Gelijke hashes zonder salt betekenen gelijke wachtwoorden. Een salt per gebruiker en een trage, geheugenharde functie pakken beide problemen aan.' },
        { q: 'Een aanvaller heeft een jaar lang versleuteld TLS-verkeer naar een webserver opgeslagen. Daarna steelt hij de private sleutel van die server. Wat bepaalt of hij het oude verkeer alsnog kan lezen?',
          options: ['Of het certificaat van de server inmiddels is ingetrokken', 'Of de sessies een tijdelijke (ephemeral) Diffie-Hellman-uitwisseling gebruikten', 'Of de sessies AES-256 gebruikten in plaats van AES-128', 'Of de site HSTS had ingeschakeld'], answer: 1,
          wrong: { 0: 'Intrekken voorkomt dat de gestolen sleutel in de toekomst wordt vertrouwd. Aan opgeslagen verkeer uit het verleden verandert het niets.', 2: 'De sleutellengte van AES doet er niet toe als de aanvaller de sessiesleutel zelf kan achterhalen.', 3: 'HSTS dwingt de browser om HTTPS te gebruiken. Het zegt niets over hoe de sessiesleutel tot stand kwam.' },
          explain: 'Met tijdelijke sleutels per sessie (forward secrecy) helpt de private sleutel van de server niet om oude sessiesleutels terug te rekenen.' },
      ],
    },
  ],
  terms: [
    { term: 'Encoding', def: 'Omzetten van data naar een ander formaat (Base64, hex, URL) zonder sleutel; omkeerbaar door iedereen en dus geen beveiliging.' },
    { term: 'Encryptie', def: 'Data vertrouwelijk maken met een sleutel; zonder de juiste sleutel is de ciphertext onleesbaar.' },
    { term: 'Hashing', def: 'Eenrichtingsfunctie die van elke invoer een vaste, korte vingerafdruk maakt; niet terug te rekenen.' },
    { term: 'Symmetrische encryptie', def: 'Encryptie met één gedeelde sleutel voor versleutelen én ontsleutelen, bijvoorbeeld AES.' },
    { term: 'Asymmetrische encryptie', def: 'Encryptie met een sleutelpaar: een publieke sleutel om te delen en een private sleutel om geheim te houden (RSA, ECC).' },
    { term: 'Diffie-Hellman', def: 'Methode om over een open kanaal samen een gedeelde geheime sleutel af te spreken zonder die te versturen.' },
    { term: 'Forward secrecy', def: 'Eigenschap waarbij oude sessies onleesbaar blijven, zelfs als later een private sleutel uitlekt (door ephemeral sleutels).' },
    { term: 'Digitale handtekening', def: 'Een met de private sleutel versleutelde hash van een bericht; bewijst herkomst en integriteit, te verifiëren met de publieke sleutel.' },
    { term: 'Certificaat', def: 'Document dat een identiteit aan een publieke sleutel koppelt, ondertekend door een Certificate Authority.' },
    { term: 'PKI', def: 'Public Key Infrastructure: het geheel van CA\'s, certificaten en vertrouwensketens dat publieke sleutels betrouwbaar maakt.' },
    { term: 'TLS', def: 'Protocol achter HTTPS dat asymmetrische sleuteluitwisseling, authenticatie via certificaten en symmetrische AES-encryptie combineert.' },
    { term: 'Salt', def: 'Unieke, willekeurige waarde die vóór het hashen aan een wachtwoord wordt toegevoegd om rainbow tables en gelijke hashes te voorkomen.' },
    { term: 'Argon2', def: 'Moderne, langzame en geheugenintensieve wachtwoordhashfunctie; winnaar van de Password Hashing Competition.' },
    { term: 'Botsing (collision)', def: 'Twee verschillende invoeren met dezelfde hash; het bestaan ervan breekt een hashfunctie (MD5, SHA-1).' },
  ],
  resources: [
    { title: 'CyberChef (officiële versie)', url: 'https://gchq.github.io/CyberChef/' },
    { title: 'NCSC — ICT-beveiligingsrichtlijnen voor TLS', url: 'https://www.ncsc.nl/documenten/publicaties/2021/januari/19/ict-beveiligingsrichtlijnen-voor-transport-layer-security-2.1' },
    { title: 'OWASP — Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
    { title: 'Computerphile — uitlegvideo\'s over cryptografie', url: 'https://www.youtube.com/user/Computerphile' },
  ],
});
