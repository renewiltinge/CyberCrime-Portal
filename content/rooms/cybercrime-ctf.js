/* Room: Puzzels & uitdagingen — Cybercrime-CTF "Operatie Spookgeld" (afsluitend) */

// --- Onderschept bericht (station 2): Vigenère met sleutel "dojo" ---
// Ontsleuteld: "De sleutel is dojo en de vlag luidt NM{vigenere_gekraakt}"
// (geverifieerd met de cipher-lab-functie; zie CRACK-REF).
//
// --- Campagne-tag (intro): Base64 ---
// Y2FtcGFnbmUtdGFnOiBOTXtzdGlsbGVfdmVubm9vdH0=  ->  "campagne-tag: NM{stille_vennoot}"

CS.registerRoom({
  id: 'cybercrime-ctf',
  path: 'puzzels',
  order: 5,
  title: 'Cybercrime-CTF: Operatie Spookgeld',
  icon: '🏴',
  difficulty: 'Moeilijk',
  minutes: 90,
  summary: 'De afsluitende cybercrime-CTF. Als geautoriseerd onderzoeker ontrafel je in acht stations het volledig fictieve ransomware- en witwasnetwerk "De Spookgeld-bende": je kraakt een inlog-hash, ontcijfert een onderschept bericht, mapt de aanval op MITRE ATT&CK, volgt de buit in BTC naar de exchange, koppelt twee zaken via één certificaat, weegt de attributie met ACH en levert een BLUF-eindproduct. Onderweg verzamel je tien vlaggen.',
  objectives: [
    'Een hashtype herkennen en de inlog-hash met een woordenlijst kraken',
    'Een onderschept, versleuteld bericht (Vigenère) ontcijferen',
    'Waarnemingen koppelen aan de juiste MITRE ATT&CK-techniek',
    'Een cryptostroom door katvangers en een mixer volgen naar de exchange',
    'Twee zaken verbinden via een hergebruikt certificaat en de attributie afwegen met ACH',
    'Een BLUF-intelligenceproduct schrijven en de operatie ethisch en reproduceerbaar afronden',
  ],
  terms: [
    { term: 'CTF', def: 'Capture The Flag: een oefening waarin je uitdagingen oplost en geheime codes (vlaggen) verzamelt.' },
    { term: 'Vlag (flag)', def: 'Een unieke code die bewijst dat je een uitdaging oploste, hier in het formaat NM{...}.' },
    { term: 'Ransomware', def: 'Afpersingssoftware die bestanden versleutelt; de dader eist losgeld voor de sleutel, vaak gecombineerd met diefstal van data (dubbele afpersing).' },
    { term: 'Witwassen', def: 'Crimineel geld een legale schijn geven. Klassiek in drie stappen: placement (erin brengen), layering (verhullen via vele stappen) en integration (terug de echte economie in).' },
    { term: 'Money mule (katvanger)', def: 'Iemand die zijn rekening of wallet beschikbaar stelt om crimineel geld door te sluizen, zodat het spoor naar de dader vertroebelt.' },
    { term: 'Mixer (tumbler)', def: 'Een dienst die cryptomunten van veel gebruikers samenvoegt en weer uitkeert, om de herkomst van een bedrag te verhullen (layering).' },
    { term: 'Exchange & KYC', def: 'Een wisseldienst waar crypto naar euro wordt omgezet. Omdat exchanges klanten moeten identificeren (Know Your Customer), zijn ze het knelpunt waar het spoor weer zichtbaar kan worden.' },
    { term: 'Pivoten', def: 'Van het ene kenmerk naar het andere springen (domein -> IP -> certificaat -> wallet) om verborgen verbanden tussen zaken te vinden.' },
    { term: 'Certificate transparency', def: 'Openbare logs van uitgegeven TLS-certificaten (zoals crt.sh), waarmee je een hergebruikt certificaat over meerdere domeinen kunt terugvinden.' },
    { term: 'Attributie', def: 'De vraag wie achter een aanval zit. Lastig en foutgevoelig: gedeelde tooling (zoals dezelfde RaaS) is een aanwijzing, geen identiteitsbewijs.' },
    { term: 'ACH', def: 'Analysis of Competing Hypotheses: je legt hypothesen naast elkaar en weerlegt ze; de hypothese met de minste inconsistenties blijft het langst overeind.' },
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
      title: 'Taak 1 — De opdracht: Operatie Spookgeld',
      content: `
        <p>Welkom bij de afsluitende puzzel van dit leerpad, onderzoeker. In <strong>Operatie Spookgeld</strong> werk je
        in een (fictief) gezamenlijk cybercrimeteam aan een netwerk dat wij "De Spookgeld-bende" noemen: ze breken binnen,
        gijzelen bestanden met <strong>ransomware</strong> en <strong>wassen</strong> het losgeld wit via cryptomunten.
        Alles in deze room is <strong>verzonnen</strong>: de IP-adressen zijn documentatie-adressen (RFC&nbsp;5737), de
        domeinen eindigen op <code>.nm.lab</code> en je werkt met bewijs dat rechtmatig is veiliggesteld.</p>

        <p>Je bent <strong>geautoriseerd</strong>: er ligt een bevel en je blijft binnen de wettelijke kaders (zoals
        art.&nbsp;126nba&nbsp;Sv voor het binnendringen in een geautomatiseerd werk, en de Wet politiegegevens). Dat is cruciaal, want precies dezelfde handelingen zonder
        toestemming zijn strafbaar: inbreken op een computer is <strong>computervredebreuk</strong>
        (art.&nbsp;138ab&nbsp;Sr). Jij valt niets aan en betaalt nooit blind losgeld; je <em>analyseert</em> en
        <em>volgt het spoor</em>.</p>

        <p>Je doorloopt acht stations die samen de hele keten vormen: <strong>toegang &rarr; uitvoering &rarr; buit
        &rarr; witwassen &rarr; attributie &rarr; product</strong>. Per station verdien je minstens één vlag
        (<code>NM{...}</code>); in totaal zijn het er tien. Houd, net als in het echt, een korte <strong>write-up</strong>
        bij: noteer per station wat je deed en wat je vond.</p>

        <p>In een onderschept chatlog liet de bende een gecodeerde <em>campagne-tag</em> achter:</p>
        <pre><code>Y2FtcGFnbmUtdGFnOiBOTXtzdGlsbGVfdmVubm9vdH0=</code></pre>
        <p>Het is geen hash maar <strong>Base64</strong> (letters, cijfers, eindigt op <code>=</code>). Decodeer de string
        met een decoder uit een eerdere room en je leest de eerste verborgen vlag.</p>

        <div class="callout tip"><strong>Startschot:</strong> als bewijs dat je de operatie bent gestart, krijg je de
        eerste vlag cadeau: <code>NM{spookgeld_gestart}</code>. De rest verdien je onderweg.</div>

        <div class="callout danger"><strong>Ethiek, eerst:</strong> deze technieken oefen je uitsluitend in dit lab of
        met een rechtmatige grondslag. Buiten je opdracht ben je geen onderzoeker maar een verdachte (art.&nbsp;138ab&nbsp;Sr).</div>
      `,
      questions: [
        { q: 'Wat maakt jouw onderzoek rechtmatig in plaats van strafbaar?', options: ['Dat de bende fictief is', 'Een rechtmatige grondslag/bevel binnen de wettelijke kaders (art. 126nba Sv, Wpg)', 'Dat je tien vlaggen zoekt', 'Dat je het snel doet'], answer: 1, explain: 'Een wettelijke grondslag is de grens tussen rechtmatig onderzoek en computervredebreuk (art. 138ab Sr). Zonder bevel zou je zelf strafbaar zijn.' },
        { q: 'Decodeer de Base64-campagne-tag. Welke vlag staat erin?', answer: ['NM{stille_vennoot}'], encoded: true, hint: 'Haal de string door een Base64-decoder; er staat "campagne-tag: ..." voor.', explain: 'De Base64 decodeert naar "campagne-tag: NM{stille_vennoot}".' },
        { q: 'Wat is de startvlag van deze operatie?', answer: ['NM{spookgeld_gestart}'], hint: 'Staat in de tip-callout als startschot.', explain: 'De startvlag is NM{spookgeld_gestart}.' },
        { q: 'Ik heb een rechtmatige grondslag en werk de dump station voor station uit, zonder blind te betalen.', noAnswer: true },
      ],
    },

    {
      title: 'Station 1 — Toegang (deel A): herken de inlog-hash',
      content: `
        <p>Het eerste bestand in de dump is <code>portaal-users.txt</code>: een wachtwoord-hash van het beheeraccount van
        het onderhandelingsportaal van de bende. Een goede onderzoeker begint nooit met kraken, maar met één vraag:
        <strong>wat voor hash is dit eigenlijk?</strong> Kies je het verkeerde algoritme, dan kan geen enkele gok ooit
        kloppen.</p>

        <p>De hash luidt:</p>
        <pre><code>48df3bc2a17177090cdb63ca2b7e5807beaabcd7</code></pre>

        <p>Gebruik de hash-herkenner hieronder (de hash staat er al in). Een tool als <em>hash-id</em> kijkt naar twee
        dingen: de <strong>lengte</strong> en de <strong>vorm</strong>. Tel de tekens: het zijn er precies
        <strong>40</strong>. Dat is het kenmerk van <strong>SHA-1</strong> (160 bits = 20 bytes = 40 hex-tekens). Ter
        vergelijking: 32 hex-tekens wijzen op MD5 of NTLM, 64 op SHA-256.</p>

        <p>SHA-1 is bovendien <strong>verouderd</strong> (er zijn botsingen bekend) en hier wordt het <strong>zonder
        salt</strong> gebruikt. Daardoor blijft elke losse gok razendsnel te berekenen en werkt een woordenlijstaanval
        nog prima. Dat buit je in deel B uit.</p>

        <div class="callout tip"><strong>Tip:</strong> eerst herkennen, dan de aanval kiezen. Zou je deze 40-teken-hash
        als MD5 (32 tekens) proberen te kraken, dan vergelijk je per definitie hashes van de verkeerde lengte — dat matcht
        nooit.</div>
      `,
      lab: { type: 'hashid', value: '48df3bc2a17177090cdb63ca2b7e5807beaabcd7' },
      questions: [
        { q: 'Welk hashtype is dit, gezien de 40 hex-tekens?', options: ['MD5', 'SHA-1', 'SHA-256', 'NTLM'], answer: 1, explain: '40 hex-tekens = 160 bits = SHA-1.' },
        { q: 'Waarom is deze (ongesalte) SHA-1-hash kwetsbaar voor een woordenlijstaanval?', options: ['Omdat SHA-1 geheim is', 'Omdat elke losse gok razendsnel te berekenen is en er geen salt per wachtwoord is', 'Omdat de hash te kort is om te kraken', 'Dat is hij niet'], answer: 1, explain: 'Zonder salt en met een snel algoritme kan een aanvaller enorme aantallen gokken per seconde proberen.' },
      ],
    },

    {
      title: 'Station 1 — Toegang (deel B): kraak de inlog-hash',
      content: `
        <p>Je weet nu dat het om <strong>SHA-1</strong> gaat. Tijd om te kraken. De hash-kraker hieronder staat al op het
        juiste algoritme (je ziet "Doel-hash (SHA1)" bovenaan) en bevat dezelfde hash als in deel A.</p>

        <pre><code>48df3bc2a17177090cdb63ca2b7e5807beaabcd7</code></pre>

        <p>Start de <strong>woordenlijstaanval</strong>: de tool hasht elk woord uit de lijst en vergelijkt het met de
        doel-hash. Het wachtwoord staat in de lijst. Het ziet er sterk uit — hoofdletters én cijfers — maar het is een
        bedrijfsthema-wachtwoord dat allang in een gelekte woordenlijst staat. Dat is precies de les: <strong>lengte en
        hoofdletters maken een wachtwoord niet veilig als het voorspelbaar is</strong>. Lukt het niet meteen? Je mag eigen
        gokken toevoegen en de <strong>regels (mangling)</strong> aanzetten (hoofdletter vooraan, een jaartal erachter),
        net zoals Hashcat en John the Ripper dat doen.</p>

        <p>Zodra je de hash kraakt, log je met dat wachtwoord in op het beheerportaal van de bende. Het dashboard
        verwelkomt je en toont de vlag <strong>NM{eerste_toegang}</strong>. Noteer zowel het gekraakte wachtwoord als de
        vlag in je write-up.</p>

        <div class="callout warn"><strong>Les voor later:</strong> SHA-1, MD5 én SHA-256 zijn razendsnel te berekenen.
        Wachtwoorden hoor je op te slaan met een traag, gesalt algoritme zoals <strong>bcrypt</strong>,
        <strong>scrypt</strong> of <strong>Argon2</strong>.</div>
      `,
      lab: {
        type: 'hashcrack',
        algo: 'sha1',
        hash: '48df3bc2a17177090cdb63ca2b7e5807beaabcd7',
        wordlist: ['welkom', 'zomer2024', 'admin', 'voetbal', 'qwerty', 'computer', 'amsterdam', 'KoffieKlap2026'],
      },
      questions: [
        { q: 'Wat is het gekraakte wachtwoord van het beheeraccount?', answer: ['KoffieKlap2026'], hint: 'Start de woordenlijstaanval op SHA-1; het is een bedrijfsthema-wachtwoord met een jaartal.', explain: 'De SHA-1-hash 48df3bc2... hoort bij het wachtwoord "KoffieKlap2026".' },
        { q: 'Welke vlag toont het beheerportaal nadat je bent ingelogd?', answer: ['NM{eerste_toegang}'], hint: 'Staat in de uitleg van deze taak, als beloning voor het kraken.', explain: 'Met het gekraakte wachtwoord krijg je toegang: NM{eerste_toegang}.' },
      ],
    },

    {
      title: 'Station 2 — Het onderschepte bericht',
      content: `
        <p>In het portaal vind je een interne chat tussen twee bendeleden. Eén regel is "beveiligd": geen hash, maar een
        <strong>versleuteld</strong> bericht. In tegenstelling tot codering (Base64, hex) heeft echte versleuteling een
        <strong>sleutel</strong> nodig. Dit is een <strong>Vigenère-cijfer</strong>: elke letter is verschoven volgens een
        herhalend sleutelwoord. Zonder de sleutel is het lastig; mét de sleutel valt het in één keer open.</p>

        <p>Het onderschepte bericht luidt:</p>
        <pre><code>Gs bzhicso wb rrxx sq rn joop zxwmh QA{ewjswsus_psnfjonh}</code></pre>

        <p>Uit een eerder bericht wisten we al dat deze bende voor interne berichten steevast het sleutelwoord
        <strong>dojo</strong> gebruikt. Gebruik het cijfer-lab hieronder, kies de methode <strong>Vigenère</strong> en vul
        de sleutel <code>dojo</code> in. Het bericht wordt dan leesbaar Nederlands, met daarin de vlag.</p>

        <p>Omdat de vlag pas <em>ná</em> ontsleutelen verschijnt (in de ciphertext staat <code>MJC{...}</code>, niet de
        echte vlag), is dit precies een geval waarin je de vraag met <code>encoded</code> markeert: je leidt de vlag zelf
        af.</p>

        <div class="callout info"><strong>Onthoud:</strong> een Vigenère met een kort, voorspelbaar sleutelwoord is nog
        steeds zwak. Ken je de sleutel niet, dan helpen herhalingen in de tekst (Kasiski) of korte veelvoorkomende woorden
        je op weg. Codering en klassieke cijfers zijn geen vervanging voor moderne encryptie.</div>
      `,
      lab: { type: 'cipher', text: 'Gs bzhicso wb rrxx sq rn joop zxwmh QA{ewjswsus_psnfjonh}' },
      questions: [
        { q: 'Welk sleutelwoord maakt het Vigenère-bericht leesbaar?', answer: ['dojo'], hint: 'Staat in de taaktekst: de bende gebruikt steeds hetzelfde korte woord.', explain: 'Met de sleutel "dojo" ontsleutelt het bericht naar leesbaar Nederlands.' },
        { q: 'Wat is de vlag na het ontcijferen van het Vigenère-bericht?', answer: ['NM{vigenere_gekraakt}'], encoded: true, hint: 'Kies Vigenère, vul sleutel "dojo" in; de zin eindigt op de vlag.', explain: 'Ontsleuteld staat er: "De sleutel is dojo en de vlag luidt NM{vigenere_gekraakt}".' },
      ],
    },

    {
      title: 'Station 3 — De aanval op MITRE ATT&CK',
      content: `
        <p>Nu je binnen bent, reconstrueer je <em>hoe</em> de bende te werk ging bij het slachtoffer. Voor detectie en om
        te delen met andere teams heb je een <strong>gemeenschappelijke taal</strong> nodig: MITRE ATT&amp;CK. Je koppelt
        elke concrete waarneming uit de logs aan een <strong>techniek</strong> met een vast ID. Let op het verschil: een
        <em>tactiek</em> is het doel (waarom), een <em>techniek</em> is de manier (hoe). Kies in het lab steeds de techniek,
        niet alleen de tactiek.</p>

        <p>Een paar waarnemingen vooraf, zodat je het patroon ziet:</p>
        <ul>
          <li>Inloggen met <strong>geldige, gekochte</strong> inloggegevens is technisch een "correcte" login en dus lastig
          te detecteren.</li>
          <li><code>rundll32.exe</code> dat <code>lsass.exe</code> opent (GrantedAccess 0x1010) is het uitlezen van
          wachtwoorden uit het <strong>LSASS-geheugen</strong>.</li>
          <li>Data <strong>inpakken</strong> met 7-Zip en daarna <strong>uploaden</strong> naar een clouddienst vlak vóór
          de versleuteling is het draaiboek van <em>dubbele afpersing</em>.</li>
        </ul>

        <p>In het lab staan zes waarnemingen uit de tijdlijn. Kies bij elke waarneming de juiste ATT&amp;CK-techniek uit de
        bank; bij <em>Controleer</em> zie je naam en tactiek. Heb je alle zes goed, dan heb je de keten in kaart en verdien
        je de vlag <strong>NM{keten_gemapt}</strong>.</p>

        <div class="callout warn"><strong>Let op de context:</strong> dezelfde techniek kan bij meerdere tactieken horen.
        Het doel in de situatie bepaalt de tactiek, niet de tool op zichzelf.</div>
      `,
      lab: {
        type: 'attackmap',
        items: [
          { desc: 'Het serviceaccount svc-herstel logt in op de VPN met geldige, eerder bij een IAB gekochte inloggegevens.', code: 'T1078', explain: 'Valid Accounts: een geldige login is technisch "correct" en moeilijk te detecteren; je herkent hem aan afwijkend gedrag (tijdstip, bron).' },
          { desc: 'powershell.exe -w hidden -enc <base64> start een verborgen, gecodeerde opdracht om de volgende fase te laden.', code: 'T1059.001', explain: 'PowerShell (Execution): met -enc wordt de opdracht in Base64 verhuld.' },
          { desc: 'rundll32.exe opent lsass.exe (GrantedAccess 0x1010) om wachtwoorden uit het geheugen te lezen.', code: 'T1003.001', explain: 'LSASS Memory (Credential Access): inloggegevens uit het LSASS-proces dumpen.' },
          { desc: 'Met het gestolen account wordt via RDP doorgesprongen naar fileserver SRV-FS02.', code: 'T1021.001', explain: 'Remote Desktop Protocol (Lateral Movement): zijdelings bewegen met geldige toegang.' },
          { desc: '7z.exe pakt de map met klantcontracten in één wachtwoordbeveiligd archief.', code: 'T1560', explain: 'Archive Collected Data (Collection): data inpakken vóór exfiltratie.' },
          { desc: 'Vlak vóór de versleuteling wordt 6 GB naar een externe cloud-opslagdienst geüpload.', code: 'T1567', explain: 'Exfiltration Over Web Service (Exfiltration): wegsluizen via een legitiem ogende clouddienst — de basis van dubbele afpersing.' },
        ],
      },
      questions: [
        { q: 'Welk techniek-ID hoort bij het uitlezen van LSASS-geheugen?', answer: ['T1003.001'], hint: 'Credential Access, sub-techniek van OS Credential Dumping.', explain: 'T1003.001 (LSASS Memory) valt onder Credential Access.' },
        { q: 'Welk techniek-ID past bij het uploaden van data naar een externe clouddienst vóór de versleuteling?', answer: ['T1567'], hint: 'Exfiltration Over Web Service.', explain: 'T1567 (Exfiltration Over Web Service): hét kenmerk van dubbele afpersing.' },
        { q: 'Het inloggen met een geldig maar gestolen serviceaccount is in ATT&CK vooral welke techniek?', options: ['T1078 Valid Accounts', 'T1486 Data Encrypted for Impact', 'T1110 Brute Force', 'T1083 File and Directory Discovery'], answer: 0, explain: 'T1078 Valid Accounts: geen bruteforce, maar misbruik van echte inloggegevens.' },
        { q: 'Welke vlag verdien je als je de hele keten correct mapt?', answer: ['NM{keten_gemapt}'], hint: 'Staat in de uitleg van deze taak, als beloning.', explain: 'Alle zes waarnemingen juist gekoppeld levert NM{keten_gemapt} op.' },
      ],
    },

    {
      title: 'Station 4 — Follow the money: de buit in BTC',
      content: `
        <p>De bende perste <strong>Spoedbouw Nederland</strong> af en kreeg het losgeld in <strong>bitcoin</strong>. Nu
        volg je de buit: <strong>follow the money</strong>. Crimineel geld wordt <em>witgewassen</em> door het in veel
        stappen te verhullen (layering). Je ziet hier het klassieke patroon: het losgeld wordt <strong>gesplitst</strong>
        over twee <strong>katvangers</strong> (money mules), samengevoegd in een <strong>mixer</strong> die de herkomst
        vertroebelt, en ten slotte uitbetaald bij een <strong>exchange</strong>.</p>

        <p>Gebruik het stroom-lab hieronder. Klik op een knoop om in- en uitgaand verkeer te zien, of lees de
        transactieledger. <strong>Reken na</strong>: tel op wat een knoop binnenkomt en uitgaat. Twee dingen vallen op.
        Ten eerste houden de katvangers en de mixer een <strong>fee</strong> in, dus er "verdampt" onderweg wat. Ten
        tweede komt alles uiteindelijk samen bij de <strong>exchange</strong> — en dat is het <strong>knelpunt</strong>:
        om crypto naar euro te wisselen moet iemand zich identificeren (KYC). Precies dáár kan het spoor weer zichtbaar
        worden.</p>

        <p>Beantwoord de vragen in het lab (reken ze uit de ledger) én hieronder. Doorzie je dat de exchange het
        cash-out-knelpunt is, dan verdien je de vlag <strong>NM{spoor_naar_de_exchange}</strong>.</p>

        <div class="callout danger"><strong>Nooit blind betalen:</strong> losgeld betalen financiert de volgende aanval en
        geeft geen garantie. Het spoor volgen tot aan een exchange (met KYC-plicht) is juist het aangrijpingspunt voor
        opsporing en bevriezing.</div>
      `,
      lab: {
        type: 'flow',
        title: 'Operatie Spookgeld — de losgeldstroom',
        unit: 'BTC',
        scenario: 'Spoedbouw Nederland betaalt het losgeld in BTC. Volg het geld: splitsing over twee katvangers, samenvoegen in een mixer, cash-out bij een exchange. Reken de bedragen na.',
        nodes: [
          { id: 'v', type: 'victim', label: 'Spoedbouw Nederland' },
          { id: 'm1', type: 'mule', label: 'Katvanger 1' },
          { id: 'm2', type: 'mule', label: 'Katvanger 2' },
          { id: 'mix', type: 'mixer', label: 'Mixer Nevelsluis' },
          { id: 'ex', type: 'exchange', label: 'Wisselhuis Delta' },
        ],
        edges: [
          { from: 'v', to: 'm1', amount: 2.5, time: '2026-03-02 09:10', note: 'eerste deel losgeld' },
          { from: 'v', to: 'm2', amount: 1.5, time: '2026-03-02 09:12', note: 'tweede deel losgeld' },
          { from: 'm1', to: 'mix', amount: 2.45, time: '2026-03-02 11:40', note: 'katvanger houdt 0,05 commissie' },
          { from: 'm2', to: 'mix', amount: 1.45, time: '2026-03-02 11:55', note: 'katvanger houdt 0,05 commissie' },
          { from: 'mix', to: 'ex', amount: 3.80, time: '2026-03-03 02:30', note: 'mixer houdt 0,10 fee; cash-out bij exchange' },
        ],
        ask: [
          { q: 'Hoeveel BTC betaalt Spoedbouw in totaal als losgeld (de som die de slachtofferknoop uitstuurt)?', answer: ['4', '4.0', '4,0', '4 btc'], hint: 'Tel de twee uitgaande transacties van het slachtoffer op.', explain: '2,5 + 1,5 = 4,0 BTC gaat de deur uit naar de twee katvangers.' },
          { q: 'Hoeveel BTC komt uiteindelijk bij de exchange (Wisselhuis Delta) aan?', answer: ['3.8', '3.80', '3,8', '3,80', '3.8 btc'], hint: 'Kijk naar de inkomende transactie bij de exchange.', explain: 'De mixer stuurt 3,80 BTC door naar de exchange.' },
          { q: 'Hoeveel BTC blijft onderweg achter als kosten (commissies + mixer-fee)?', answer: ['0.2', '0.20', '0,2', '0,20', '0.2 btc'], hint: 'Verschil tussen wat erin gaat (4,0) en wat de exchange ontvangt (3,8).', explain: '4,0 − 3,8 = 0,2 BTC aan fees (2×0,05 katvangers + 0,10 mixer).' },
        ],
      },
      questions: [
        { q: 'Hoeveel BTC komt uiteindelijk bij de exchange aan?', answer: ['3.8', '3.80', '3,8', '3,80'], hint: 'Lees de inkomende transactie bij Wisselhuis Delta in de ledger.', explain: 'De mixer stuurt 3,80 BTC naar de exchange; dat is wat er aankomt.' },
        { q: 'Bij welk type knoop is KYC het grote knelpunt waar het spoor weer zichtbaar kan worden?', options: ['De mixer', 'De exchange', 'De katvanger', 'Het slachtoffer'], answer: 1, explain: 'De exchange moet klanten identificeren (KYC); daar komt de stroom samen en kan het spoor weer oppikbaar worden.' },
        { q: 'Welke vlag hoort bij het volgen van de buit naar de cash-out?', answer: ['NM{spoor_naar_de_exchange}'], hint: 'Staat in de uitleg van deze taak, als beloning.', explain: 'Het geld volgen tot aan de exchange levert NM{spoor_naar_de_exchange} op.' },
      ],
    },

    {
      title: 'Station 5 — Pivoten: koppel twee zaken',
      content: `
        <p>De bende phishte om toegang te stelen, en die phishinginfrastructuur laat sporen na. <strong>Pivoten</strong> is
        van het ene kenmerk naar het andere springen — domein &rarr; IP &rarr; certificaat &rarr; e-mail &rarr; wallet —
        om verborgen verbanden tussen zaken te vinden. Je doet dit <strong>passief</strong>: open bronnen (WHOIS/RIPEstat,
        passive DNS, certificate transparency via crt.sh). Je benadert de infrastructuur van de verdachte nooit zelf
        (opsec).</p>

        <p>In het lab staan twee fictieve zaken. <strong>Zaak Alpha</strong> (<code>betaal-controle.nm.lab</code>) is de
        phishing waarmee de bende de toegang bij Spoedbouw stal. <strong>Zaak Bravo</strong>
        (<code>inlog-verificatie.nm.lab</code>) is een losse zaak van een ander team. Op het eerste gezicht lijken ze niet
        verbonden: ze draaien op <em>verschillende</em> IP-adressen. Jouw taak: vind het kenmerk dat ze tóch verbindt.</p>

        <p>Pas de <strong>zeldzaamheidstoets</strong> toe: niet elk gedeeld kenmerk is bewijs. Je ziet dat beide IP's bij
        <strong>dezelfde hostingprovider (ASN)</strong> horen — verleidelijk, maar zwak, want duizenden onschuldige sites
        delen die hoster. Een <strong>hergebruikt TLS-certificaat</strong> is daarentegen <em>zeldzaam</em>: dezelfde
        certificaat-fingerprint op twee los lijkende domeinen is een sterke aanwijzing dat dezelfde hand erachter zit.
        <strong>Hoe zeldzamer het gedeelde kenmerk, hoe sterker de link.</strong></p>

        <p>Pivoteer door de entiteiten aan te klikken, let op <strong>tijd</strong> en <strong>herkomst</strong> bij elke
        relatie, en typ het bruggende kenmerk in. Herken je dat het certificaat (en niet het ASN) de echte brug is, dan
        verdien je de vlag <strong>NM{cert_is_de_brug}</strong>.</p>

        <div class="callout warn"><strong>Blijf kritisch:</strong> "beide domeinen presenteren certificaat A1B2C3D4" is
        <em>bekend</em>. "Dezelfde actor beheert beide" is <em>afgeleid</em>. "Het is dezelfde persoon als in zaak X vorig
        jaar" zou een <em>aanname</em> zijn tot je meer zeldzame overlap vindt.</div>
      `,
      lab: {
        type: 'pivot',
        title: 'Zaak Alpha (bende-phishing) vs. Zaak Bravo',
        scenario: 'Zaak Alpha stal de toegang bij Spoedbouw. Zaak Bravo is een losse phishingzaak. Wat verbindt ze? Toets de zeldzaamheid van elk gedeeld kenmerk.',
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
        { q: 'Beide IP-adressen horen bij dezelfde hostingprovider (AS64500). Waarom is dat geen sterke brug?', options: ['Omdat heel veel onschuldige sites dezelfde hostingprovider delen — het kenmerk is niet zeldzaam', 'Omdat ASN-nummers altijd nep zijn', 'Omdat hosting niets met IP-adressen te maken heeft', 'Dat is wél een sterke brug'], answer: 0, explain: 'Een gedeelde hoster is te algemeen: de zeldzaamheidstoets bepaalt of een gedeeld kenmerk echt bewijs is.' },
        { q: 'Welke vlag verdien je door de zeldzaamheidstoets juist toe te passen?', answer: ['NM{cert_is_de_brug}'], hint: 'Staat in de uitleg van deze taak.', explain: 'Kies het zeldzame dwarsverband (het certificaat), niet het toevallige (de hoster): NM{cert_is_de_brug}.' },
      ],
    },

    {
      title: 'Station 6 — Attributie met ACH',
      content: `
        <p>Nu de lastigste stap: <strong>wie</strong> zit erachter? Attributie is gevaarlijk terrein, want hier worden de
        meeste denkfouten gemaakt. Je gebruikt <strong>Analysis of Competing Hypotheses (ACH)</strong>: je zet de
        hypothesen naast elkaar en je <em>weerlegt</em> ze. De hypothese met de <strong>minste inconsistenties (I)</strong>
        blijft het langst overeind. Je zoekt dus niet naar bevestiging, maar naar tegenspraak.</p>

        <p>De grootste valkuil is <strong>"tool = actor"</strong>. Deze aanval gebruikte een bekende RaaS. Verleidelijk om
        te zeggen: "dus het is de groep achter die RaaS." Maar een RaaS wordt door <em>tientallen</em> affiliates gehuurd.
        In de matrix zie je dit terug: de waarneming "bekende RaaS" is bij álle hypothesen consistent en dus
        <strong>niet-diagnostisch</strong> — die helpt je niet kiezen. Het lab markeert zulk bewijs.</p>

        <p>In het lab staat de vraag "wie zit achter de aanval?" met drie hypothesen: een <strong>statelijke actor</strong>,
        een <strong>financieel gemotiveerde cybercrimebende</strong> die toegang kocht bij een IAB, en een
        <strong>ontevreden insider</strong>. Vul de matrix in met C (consistent), I (inconsistent) of N (neutraal), tel de
        I's en vergelijk met het expertoordeel.</p>

        <p>Reken mee: in het expertoordeel houdt de <strong>cybercrimebende 0</strong> inconsistenties over, de
        <strong>statelijke actor 3</strong> en de <strong>insider 4</strong>. Er is dus één duidelijke, <strong>unieke</strong>
        winnaar met de laagste I-score. Herken je dat de bende het scherpst overeind blijft, dan verdien je de vlag
        <strong>NM{dader_het_scherpst}</strong>.</p>

        <div class="callout danger"><strong>Verantwoord attribueren:</strong> schrijf nooit "het is groep X" als je dat
        niet kunt onderbouwen. Schrijf: "de waarnemingen passen het best bij een financieel gemotiveerde cybercrimebende
        (afgeleid); een specifieke groep kunnen we nu niet met zekerheid aanwijzen (aanname)."</div>
      `,
      lab: {
        type: 'ach',
        question: 'Wie zit achter de aanval op Spoedbouw Nederland?',
        hypotheses: ['Statelijke actor (spionage/sabotage)', 'Financieel gemotiveerde cybercrimebende (kocht toegang bij een IAB)', 'Ontevreden insider bij Spoedbouw'],
        evidence: [
          { text: 'Er is losgeld in BTC geëist via een Tor-portaal, met dreiging om gestolen data op een leksite te publiceren (dubbele afpersing).', expert: ['I', 'C', 'I'] },
          { text: 'De eerste toegang is aantoonbaar gekocht: de VPN-gegevens van svc-herstel circuleerden eerder bij een Initial Access Broker op een crimineel forum.', expert: ['I', 'C', 'I'] },
          { text: 'De gebruikte ransomware is een bekende Ransomware-as-a-Service die door tientallen affiliates wordt gehuurd.', expert: ['C', 'C', 'C'] },
          { text: 'De slachtoffers over meerdere zaken zitten in uiteenlopende sectoren zonder politieke of strategische rode draad; de keuze oogt opportunistisch.', expert: ['I', 'C', 'I'] },
          { text: 'Vlak vóór de versleuteling is data in bulk naar een externe clouddienst weggesluisd.', expert: ['N', 'C', 'N'] },
          { text: 'De aanvaller moest de interne naamgeving van de servers eerst uitgebreid verkennen (net group, nltest) en kende die dus niet.', expert: ['C', 'C', 'I'] },
        ],
      },
      questions: [
        { q: 'Welke hypothese houdt in het expertoordeel de minste inconsistenties over en wint dus (uniek)?', options: ['Statelijke actor (spionage/sabotage)', 'Financieel gemotiveerde cybercrimebende (kocht toegang bij een IAB)', 'Ontevreden insider bij Spoedbouw', 'Ze eindigen gelijk'], answer: 1, explain: 'De bende houdt 0 I\'s over, de statelijke actor 3 en de insider 4. De cybercrimebende wint duidelijk en uniek.' },
        { q: 'De waarneming "bekende RaaS wordt gebruikt" is consistent met alle drie de hypothesen. Hoe heet zulk bewijs?', options: ['Niet-diagnostisch', 'Doorslaggevend', 'Een false flag', 'Een aanname'], answer: 0, explain: 'Bewijs dat overal past, helpt je niet kiezen: het is niet-diagnostisch. Het lab markeert deze rij.' },
        { q: 'Mag je de aanval aan een specifieke groep toeschrijven puur omdat ze die bekende RaaS gebruikten?', options: ['Nee, dezelfde RaaS wordt door veel affiliates gehuurd — tool is niet gelijk aan actor', 'Ja, de RaaS bepaalt de dader', 'Ja, maar alleen bij hoog losgeld', 'Alleen als de insider het ontkent'], answer: 0, explain: 'De "tool = actor"-valkuil: gedeelde tooling is een aanwijzing, geen identiteitsbewijs.' },
        { q: 'Welke vlag hoort bij een correct afgewogen attributie?', answer: ['NM{dader_het_scherpst}'], hint: 'Staat in de uitleg van deze taak.', explain: 'De hypothese met de unieke laagste I-score (de bende) blijft het scherpst overeind: NM{dader_het_scherpst}.' },
      ],
    },

    {
      title: 'Station 7 — Het BLUF-eindproduct',
      content: `
        <p>Je hebt alles: toegang, de ATT&amp;CK-mapping, de geldstroom, de pivot en de attributie. Nu lever je het
        <strong>intelligenceproduct</strong>. De ontvanger (de officier van justitie, de teamleider, de getroffen
        directie) heeft geen tijd voor een chronologisch verhaal. Daarom schrijf je <strong>BLUF</strong>: <em>Bottom Line
        Up Front</em> — de conclusie en het advies staan <strong>bovenaan</strong>, de onderbouwing eronder.</p>

        <h3>Wat een goed BLUF-product bevat</h3>
        <ul>
          <li>De <strong>kernboodschap eerst</strong>: wat is er gebeurd en wat moet er nu gebeuren.</li>
          <li><strong>Waarschijnlijkheidstaal</strong> ("waarschijnlijk", "zeer waarschijnlijk") in plaats van vage woorden.</li>
          <li>Een <strong>eigenaar per advies</strong>: wie doet wat, en wanneer.</li>
          <li><strong>Onzekerheid apart</strong>, met de labels bekend/afgeleid/aanname.</li>
          <li><strong>Beknopter</strong> dan de bron: schrappen is een vak.</li>
        </ul>

        <p>Let op de attributie. Juist: "De aanval past zeer waarschijnlijk bij een financieel gemotiveerde cybercrimebende
        die toegang kocht bij een IAB (afgeleid uit de ACH). Een specifieke groep kunnen we niet met zekerheid aanwijzen;
        dezelfde RaaS wordt door veel affiliates gebruikt." Fout: "Het is groep X." Dat is de tool=actor-valkuil.</p>

        <p>In het lab staat het chronologische bronmateriaal. Herschrijf het naar een BLUF-product, toets tegen de rubric
        (een heuristische checklist, geen AI-oordeel) en vergelijk met het modelantwoord. Lever je een echt
        BLUF-product, dan verdien je de vlag <strong>NM{product_geleverd}</strong>.</p>

        <div class="callout danger"><strong>Nooit blind betalen:</strong> zet in je advies expliciet dat losgeld betalen
        de volgende aanval financiert en geen garantie geeft. Adviseer herstel uit offline back-ups en het volgen van de
        wallet tot aan de exchange.</div>
      `,
      lab: {
        type: 'bluf',
        source: 'Op svc-herstel na kwam de bende binnen met gekochte VPN-toegang (zonder MFA). Via RDP werd doorgesprongen; met een Base64-gecodeerd PowerShell-commando werd een volgende fase geladen en LSASS uitgelezen. Data uit de map klantcontracten werd met 7-Zip ingepakt en 6 GB werd naar een clouddienst geüpload. Daarna werden de bestanden versleuteld en volgde een losgeldeis in BTC via een Tor-portaal. Het losgeld (4,0 BTC) is gesplitst over twee katvangers, door een mixer gehaald en voor 3,80 BTC uitbetaald bij een exchange. Een hergebruikt TLS-certificaat (A1B2C3D4) verbindt de phishinginfrastructuur met een tweede zaak. Uit de ACH blijkt dat de waarnemingen het best passen bij een financieel gemotiveerde cybercrimebende die toegang kocht bij een IAB; de gebruikte RaaS wordt door veel affiliates gehuurd, dus een specifieke groep is niet aan te wijzen.',
        model: 'BEOORDELING (BLUF): Spoedbouw Nederland is zeer waarschijnlijk getroffen door een financieel gemotiveerde cybercrimebende die gekochte VPN-toegang (IAB) gebruikte; er is sprake van dubbele afpersing (data geëxfiltreerd vóór versleuteling). Een specifieke groep is niet met zekerheid aan te wijzen (dezelfde RaaS kent veel affiliates).\n\nADVIES (met eigenaar):\n1. MFA afdwingen op alle (service)accounts en svc-herstel resetten — eigenaar: IT, binnen 24 uur.\n2. C2- en exfil-hosts blokkeren en takedown aanvragen — eigenaar: SOC + hostingpartij.\n3. Offline/immutable back-ups verifiëren en herstel starten; niet betalen — eigenaar: CISO.\n4. De losgeld-wallet volgen tot aan de exchange (KYC-knelpunt) en bevriezing/aangifte voorbereiden — eigenaar: opsporing.\n\nONDERBOUWING: bekend = logs (gekochte login zonder MFA, LSASS-toegang, 6 GB exfil, versleuteling) en de geldstroom (4,0 BTC in, 3,80 BTC bij de exchange). Afgeleid = cybercrimebende met gekochte toegang (ACH: unieke laagste inconsistentie-score). Betrouwbaarheid: hoog voor de techniek en de geldstroom, lager voor de exacte dader.',
      },
      questions: [
        { q: 'Wat hoort in een BLUF-product bovenaan te staan?', options: ['De conclusie en het advies (de kernboodschap)', 'De volledige chronologie', 'De lijst met alle loghashes', 'De namen van alle analisten'], answer: 0, explain: 'BLUF = Bottom Line Up Front: eerst de conclusie en wat er moet gebeuren, daarna de onderbouwing.' },
        { q: 'Hoe schrijf je de attributie in het eindproduct verantwoord?', options: ['Zeer waarschijnlijk een cybercrimebende (afgeleid); specifieke groep niet aan te wijzen (aanname vermijden)', 'Het is zeker groep X', 'De RaaS bepaalt de dader', 'Attributie laat je weg'], answer: 0, explain: 'Je benoemt de best passende hypothese met waarschijnlijkheidstaal en vermijdt de tool=actor-valkuil.' },
        { q: 'Welke vlag hoort bij het afronden van het BLUF-eindproduct?', answer: ['NM{product_geleverd}'], hint: 'Staat in de uitleg van deze taak, als beloning.', explain: 'Een echt BLUF-product levert de vlag NM{product_geleverd} op.' },
      ],
    },

    {
      title: 'Slotstation — De buit opmaken en netjes afronden',
      content: `
        <p>Gefeliciteerd, onderzoeker. 🏴 Je hebt het hele Spookgeld-netwerk ontrafeld: tien vlaggen, van de eerste
        gekraakte hash tot het eindproduct. Je doorliep in het klein een complete keten: <strong>toegang &rarr; uitvoering
        &rarr; buit &rarr; witwassen &rarr; attributie &rarr; product</strong>.</p>

        <h3>Wat je liet zien</h3>
        <ul>
          <li>Een hash eerst <strong>herkennen</strong> (SHA-1) en dan pas gericht kraken met een woordenlijst.</li>
          <li>Een onderschept bericht <strong>ontcijferen</strong> met de juiste Vigenère-sleutel.</li>
          <li>De aanval vertalen naar <strong>MITRE ATT&amp;CK</strong>: één gedeelde taal voor detectie en delen.</li>
          <li>De buit <strong>volgen</strong> door katvangers en een mixer naar de exchange — het KYC-knelpunt.</li>
          <li><strong>Pivoten</strong> met de zeldzaamheidstoets (het certificaat, niet de hoster) en <strong>attribueren</strong>
          met ACH (unieke laagste I-score), zonder in de tool=actor-valkuil te trappen.</li>
          <li>Een <strong>BLUF-product</strong> leveren: conclusie eerst, waarschijnlijkheidstaal, eigenaar per advies.</li>
        </ul>

        <h3>De eindvlag</h3>
        <p>Als bewijs dat je de hele operatie hebt afgerond, krijg je de eindvlag:
        <strong>NM{operatie_spookgeld_voltooid}</strong>. Zet die bovenaan je write-up.</p>

        <h3>Hoe je nu rapporteert — en verder groeit</h3>
        <ul>
          <li><strong>Scheid feiten van advies.</strong> Feit: "4,0 BTC betaald, 3,80 BTC bij de exchange aangekomen".
          Advies: "wallet volgen, exchange aanspreken, niet betalen".</li>
          <li><strong>Label bekend / afgeleid / aanname.</strong> Dat voorkomt dat een aanname als feit gaat rondzingen.</li>
          <li><strong>Maak het reproduceerbaar.</strong> Noteer per station je stappen, zodat collega's je kunnen nalopen.</li>
        </ul>

        <div class="callout danger"><strong>Ethische afsluiting:</strong> alles in deze CTF was fictief en rechtmatig.
        Je vaardigheden zijn krachtig en dus gevoelig. Gebruik ze uitsluitend binnen een wettelijke grondslag of in je
        eigen lab, betaal nooit blind losgeld, meld kwetsbaarheden netjes (coordinated vulnerability disclosure, bijvoorbeeld
        via het NCSC), en blijf aan de goede kant van art.&nbsp;138ab&nbsp;Sr. Daar word je een professional van — geen
        verdachte.</div>
      `,
      questions: [
        { q: 'Wat is de eindvlag van Operatie Spookgeld?', answer: ['NM{operatie_spookgeld_voltooid}'], hint: 'Staat in deze slottaak, als beloning voor het afronden.', explain: 'De eindvlag is NM{operatie_spookgeld_voltooid} — alle tien vlaggen binnen.' },
        { q: 'Waarom is de exchange het belangrijkste aangrijpingspunt bij het witwassen van het losgeld?', options: ['Omdat de exchange de hoogste fee rekent', 'Omdat daar crypto naar euro moet en KYC-identificatie het spoor weer zichtbaar maakt', 'Omdat mixers verboden zijn', 'Omdat het slachtoffer daar klant is'], answer: 1, explain: 'De exchange is het knelpunt: om uit te betalen is identificatie (KYC) nodig, hét moment waarop opsporing kan ingrijpen.' },
        { q: 'Ik heb alle tien vlaggen verzameld en rond de operatie ethisch en reproduceerbaar af. 🏆', noAnswer: true },
      ],
    },
  ],
});
