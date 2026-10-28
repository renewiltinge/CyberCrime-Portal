/* Room: Cryptanalyse — Vigenère en de many-time pad kraken zonder sleutel */

// =======================================================================
//  Alles in deze room is FICTIEF: de cel "De Nachtwacht", de berichten en
//  de sleutels zijn verzonnen. Je oefent de methode, niet een echte zaak.
// =======================================================================

// Onderschept bericht 1 — Vigenère, sleutellengte 8 (de sleutel vind je zelf).
const MPV_CIPHER_1 = 'Nap hefm wrdgu ouv or cgs. Wy vtruyl wlwa iipkm jtlntu vi xwyqetkta vl zifkxlvlphv ibd lp bufl eiwof acu ayb hntgy. Gymx nlnlxh kzatcum amwq mgl xh tlnt fl mytpsoqul npfvs, yhgn lp conpmcm whiuaxlb xre qw wy vzemcsx eiynlgu. Wy szrrklk bmpst fl duicgep txn lp teuahfmy teiloyvd oil gbwp pa vgypuksg dg ixniwvni pg nepr dgsxh. Etr tg stub vbmv, dhlle aiga fymc oipuxhopyavlg yv grrnpxmb kvjp hthlprl ku wy waorguzmb gnn flsy ulnnf. Cxlvtrtkn wcb mrrkjan lteeea gu ppg lggxh my tedyncs gnncm go ppg nklnqm nbdgdhizo ioqy wy dzygguwy zzadg: UF{eidvsmp_ulmpxt_xpzyvpee}. Vvm xwyqetkta my jegz oiwcmieomco zadgypyo.';

// Onderschept bericht 2 — Vigenère met een langere sleutel; één kolom is een twijfelgeval.
const MPV_CIPHER_2 = 'Jpxtuve kay hm gthmvbeexe. Sib vgttaox gtrwmml gb perj ytgpr lw odvmtk pc rpil ewi mit kcxjki jwkimpcertn yeij ztb mthfhtcmmlwgzior lpn oi zsfs det hp htlh. Lssg wrzqzttei pab ieik syqevivvw birtiy sip imf rlivk ozufpv wnwglvuirtn. Oi sgxumv cics iy hm dsplvamxie ritwys mr ji hpgpr dwjizsq htgenx zauwbmtk ot syitowv. Dsrkpcs oi qfxdzqgre qegeb vw zwjlic wachm kuwqnbiy bee hm svbqrowegaemm nsc li cmeladszyscqwgxtt ey hm kdtcxkpd kay hm ujnxxualalpxa. Vw gmgnicrhp elnahmixx zb dp aiywc jmp hp tecwbngaoithp iayoalge axgeyse ei pgmsmr kr ot kzjnwj kmmrmr ie dxmddtv zuscsae hm ywvmzkrd lochmf ntzroiexgo. Lml ltiq yxlpt aezssi mr cenwt zt mwf psouscs vlr lw gunmimpg vlr rmkiqxoi.';

// Twee berichten, versleuteld met DEZELFDE sleutelstroom (hex).
const MPV_MTP_1 = '35 a5 22 64 d3 35 76 e9 e9 ed 18 2f e1 c5 0e 17 37 48 11 92 75 68 a6 ca 5b 97 90 e6 18 f7 af 11 c7 2a e6 0c f3 45 68 1c 21 6e bc 42 8b 53 1a e3 42 d2 19 da c1 97 c2 45 7d f3 34 20 89 64 4d 11 b8 7b 04 d6 91 a0 5b';
const MPV_MTP_2 = '35 a5 22 6d d9 24 65 ec e5 f1 5f 78 e7 c7 07 17 37 53 1f 8e 73 7b a7 84 49 de 93 af 16 b2 eb 19 8e 3d f6 1a b6 0b 65 12 3c 2a b8 03 86 5e 11 b7 0a f9 20 81 db 97 d8 59 50 a7 30 28 98 1b 59 15 fc 4f 09 d2 88 a0 43 95';

CS.registerRoom({
  id: 'cryptanalyse-vigenere',
  path: 'meesterproeven',
  order: 1,
  title: 'Cryptanalyse: Vigenère en de many-time pad kraken',
  icon: '🗝️',
  difficulty: 'Moeilijk',
  minutes: 90,
  summary: 'Kraak versleutelde berichten van een fictieve criminele cel zonder de sleutel te kennen: vind de sleutellengte met Kasiski en de index of coincidence, haal per kolom de verschuiving eruit met chi-kwadraat, herken een statistisch twijfelgeval, en breek een "onbreekbaar" one-time pad dat twee keer is gebruikt.',
  objectives: [
    'Uitleggen waarom een polyalfabetisch cijfer de letterfrequentie afvlakt en hoe de index of coincidence (IoC) dat meet',
    'De sleutellengte van een Vigenère-cijfer bepalen met de Kasiski-test, de IoC per kolom en de Friedman-schatting',
    'Per kolom de Caesar-verschuiving vinden met de chi-kwadraattoets en een twijfelgeval met taalgevoel corrigeren',
    'Een many-time pad breken met crib dragging, en uitleggen waarom C1 ⊕ C2 = P1 ⊕ P2',
    'De moderne lessen benoemen: sleutelstroom- en nonce-hergebruik (WEP, AES-CTR/GCM) en repeating-key XOR in malware',
  ],
  terms: [
    { term: 'Polyalfabetisch cijfer', def: 'Een cijfer dat meerdere substitutie-alfabetten afwisselt (bij Vigenère: één Caesar-verschuiving per sleutelletter), zodat dezelfde klartekstletter steeds anders versleuteld wordt.' },
    { term: 'Index of coincidence (IoC)', def: 'De kans dat twee willekeurig gekozen letters uit een tekst gelijk zijn: Σ f(f−1) / N(N−1). Nederlands ≈ 0,080, Engels ≈ 0,066, willekeurige letters ≈ 0,038.' },
    { term: 'Kasiski-test', def: 'Methode (Friedrich Kasiski, 1863) die herhaalde stukjes ciphertext zoekt; hun onderlinge afstanden zijn vaak veelvouden van de sleutellengte.' },
    { term: 'Friedman-test', def: 'Ruwe schatting van de sleutellengte uit de IoC van de hele tekst: L ≈ (κ_taal − κ_willekeur) / (κ_tekst − κ_willekeur).' },
    { term: 'Chi-kwadraattoets', def: 'Statistische maat voor hoe ver een waargenomen letterverdeling afwijkt van de verwachte taalverdeling; de verschuiving met de laagste χ² is de beste gok.' },
    { term: 'Crib', def: 'Een stukje vermoede klare tekst (bijv. " de " of "NM{") dat je gebruikt om een cijfer open te breken.' },
    { term: 'Crib dragging', def: 'Een crib langs alle posities van C1 ⊕ C2 schuiven; waar het resultaat leesbaar wordt, staat in het andere bericht vermoedelijk echte tekst.' },
    { term: 'One-time pad (OTP)', def: 'Versleuteling met een echt willekeurige sleutel die even lang is als het bericht en maar één keer wordt gebruikt. Bewijsbaar onbreekbaar — tot je de sleutel hergebruikt.' },
    { term: 'Many-time pad', def: 'Het misbruik van een one-time pad of sleutelstroom voor meerdere berichten. Dan valt de sleutel weg: C1 ⊕ C2 = P1 ⊕ P2.' },
    { term: 'Nonce-hergebruik', def: 'Het twee keer gebruiken van dezelfde nonce/IV bij een stroomcijfer of AES-CTR/GCM; dat levert dezelfde sleutelstroom op en dus een many-time pad.' },
    { term: 'Hammingafstand', def: 'Het aantal bits waarin twee bytereeksen verschillen. Gebruikt om de sleutellengte van repeating-key XOR te schatten.' },
  ],
  resources: [
    { title: 'Cryptopals — de klassieke crypto-uitdagingen (set 1: repeating-key XOR)', url: 'https://cryptopals.com/sets/1' },
    { title: 'Wikipedia — Vigenère-cijfer (geschiedenis, Kasiski en Friedman)', url: 'https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher' },
    { title: 'Wikipedia — Het Venona-project (many-time pad in de praktijk)', url: 'https://en.wikipedia.org/wiki/Venona_project' },
    { title: 'NCSC — Cryptografie-richtlijnen voor TLS en versleuteling', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Le chiffre indéchiffrable',
      content: `
        <p>Een recherche-team heeft beslag gelegd op de laptop van een tussenpersoon van de fictieve cel <strong>"De Nachtwacht"</strong>.
        Op de laptop staan berichten die met de hand versleuteld zijn. Geen AES, geen PGP: de cel gebruikt een klassiek
        <strong>Vigenère-cijfer</strong>, in de veronderstelling dat "niemand dat zonder sleutel leest". Jouw taak in deze room is
        bewijzen dat dat niet klopt.</p>

        <h3>Van Caesar naar Vigenère</h3>
        <p>Een Caesar-cijfer schuift elke letter een vast aantal plaatsen op. Dat breek je in seconden: er zijn maar 25
        verschuivingen, en de meest voorkomende letter in het geheimschrift is vrijwel zeker de <code>e</code>. Vigenère
        (16e eeuw) lost dat op door per letter een <em>andere</em> verschuiving te gebruiken, gestuurd door een sleutelwoord:</p>
<pre><code>klare tekst : d e d r o p i s d o n d e r d a g
sleutel     : N A C H T U I L N A C H T U I L N
verschuiving: 13 0 2 7 19 20 8 11 13 0 2 7 19 20 8 11 13
geheimschrift: q e f y h j q d q o p k x l l l t</code></pre>
        <p>De vijf <code>d</code>'s worden achtereenvolgens <code>q</code>, <code>f</code>, <code>q</code>, <code>k</code> en
        <code>l</code>. Dat is precies het punt: de letterfrequentie wordt <strong>afgevlakt</strong>. (Zie je dat de eerste en
        de derde <code>d</code> allebei een <code>q</code> werden? Ze staan precies 8 posities uit elkaar, onder dezelfde
        sleutelletter <code>N</code>. Onthoud dat: het is de sleutel tot taak 2.) Eeuwenlang heette Vigenère daarom <em>le chiffre
        indéchiffrable</em>. Pas in 1863 publiceerde de Pruisische officier Friedrich Kasiski een algemene aanval (Charles Babbage
        had hem al eerder, maar hield het geheim).</p>

        <h3>De zwakke plek: de sleutel herhaalt zich</h3>
        <p>Een sleutel van 8 letters betekent dat letter 1, 9, 17, 25, ... allemaal met <em>dezelfde</em> verschuiving zijn
        versleuteld. Zet je de tekst in 8 kolommen, dan is <strong>elke kolom een gewoon Caesar-cijfer</strong>. En Caesar
        breek je met frequentieanalyse. Het hele probleem draait dus om één vraag: <strong>hoe lang is de sleutel?</strong></p>

        <h3>De index of coincidence</h3>
        <p>William Friedman (1922) bedacht een getal dat meet hoe "ongelijk" de letters van een tekst verdeeld zijn: de
        <strong>index of coincidence</strong>. Pak twee willekeurige letters uit de tekst; hoe groot is de kans dat ze gelijk
        zijn?</p>
<pre><code>IoC = Σ f_i · (f_i − 1)  /  N · (N − 1)        (f_i = aantal keer letter i, N = aantal letters)</code></pre>
        <table>
          <thead><tr><th>Soort tekst</th><th>IoC (ongeveer)</th><th>Waarom</th></tr></thead>
          <tbody>
            <tr><td>Nederlands</td><td>0,080</td><td>De <code>e</code> alleen is al bijna 19% van alle letters</td></tr>
            <tr><td>Engels</td><td>0,066</td><td>Vlakkere verdeling dan Nederlands</td></tr>
            <tr><td>Caesar/monoalfabetisch</td><td>gelijk aan de taal</td><td>Letters worden alleen hernoemd, de verdeling blijft</td></tr>
            <tr><td>Vigenère met lange sleutel</td><td>richting 0,04</td><td>De verschuivingen mengen de verdelingen</td></tr>
            <tr><td>Willekeurige letters</td><td>1/26 ≈ 0,038</td><td>Elke letter even vaak</td></tr>
          </tbody>
        </table>
        <div class="callout tip"><strong>Waarom dit werkt:</strong> een monoalfabetische substitutie <em>hernoemt</em> letters
        maar verandert de vorm van de verdeling niet, dus de IoC blijft gelijk. Een polyalfabetisch cijfer mengt meerdere
        verschoven verdelingen en drukt de IoC omlaag. De IoC verraadt dus <em>welk soort</em> cijfer je voor je hebt,
        nog voor je iets ontsleuteld hebt.</div>
        <div class="callout warn"><strong>Ethiek:</strong> je kraakt hier fictieve berichten in een lab. Echt onderschept
        materiaal ontsleutelen mag alleen binnen een wettelijke bevoegdheid (bijvoorbeeld onder het Wetboek van Strafvordering)
        of op eigen data.</div>
      `,
      questions: [
        { q: 'Welke IoC (afgerond op drie decimalen) verwacht je bij volledig willekeurige letters (1/26)?', answer: ['0.038', '0,038'], hint: 'Reken 1 gedeeld door 26 uit.', explain: '1/26 ≈ 0,0385: elke letter is even waarschijnlijk.' },
        { q: 'Een ciphertext heeft een IoC van 0,079. Wat voor cijfer is het waarschijnlijk?', options: ['Vigenère met een lange sleutel', 'Een monoalfabetische substitutie of transpositie van Nederlandse tekst', 'Een one-time pad', 'AES'], answer: 1, explain: 'Een IoC op taalniveau betekent dat de letterverdeling intact is: letters zijn hernoemd (substitutie) of verplaatst (transpositie), niet gemengd.' },
        { q: 'Met een sleutel van lengte L: welk soort cijfer is elke kolom (letter 1, 1+L, 1+2L, ...)?', options: ['Een Caesar-cijfer', 'Een one-time pad', 'Een transpositie', 'Een hash'], answer: 0, explain: 'Alle letters in één kolom zijn met dezelfde sleutelletter, dus dezelfde verschuiving, versleuteld.' },
        { q: 'In welk jaar publiceerde Kasiski zijn algemene aanval op Vigenère?', answer: '1863', hint: 'Staat in de tekst.', explain: 'Friedrich Kasiski publiceerde in 1863; Babbage had de methode eerder, maar maakte haar niet openbaar.' },
      ],
    },
    {
      title: 'Taak 2 — Kasiski en IoC: de sleutellengte vinden',
      content: `
        <p>Het eerste onderschepte bericht staat hieronder in de <strong>Vigenère-werkbank</strong>. Werk de drie stappen af,
        precies zoals een cryptanalist dat met pen en papier zou doen.</p>

        <h3>Stap 1 — Kasiski: herhalingen zijn geen toeval</h3>
        <p>Als hetzelfde stukje klare tekst (bijvoorbeeld <code>de</code> + spatie + <code>donderdag</code>) toevallig op twee
        plekken onder dezelfde sleutelpositie valt, levert het <em>hetzelfde</em> stukje ciphertext op. De afstand tussen die
        twee plekken is dan een veelvoud van de sleutellengte. Verzamel veel afstanden en kijk welke deler steeds terugkomt.</p>
<pre><code>XWY op letterpositie 45 en 461       → afstand 416 = 2⁵ · 13     = 8 · 52   ("donderdag", twee keer)
UWY op 179 en 323                    → afstand 144 = 2⁴ · 3²     = 8 · 18
TLN op 38 en 118                     → afstand  80 = 2⁴ · 5      = 8 · 10
MYT op 124, 214 en 382               → afstanden 90 en 168
                                        168 = 8 · 21   ✓
                                         90 = 2 · 3² · 5          ← toeval!</code></pre>
        <p>Let op de laatste regel: niet elke herhaling is echt. Twee verschillende stukken klare tekst kunnen toevallig
        dezelfde ciphertext opleveren. Daarom tel je <em>welke deler het vaakst</em> past, in plaats van blind de
        grootste gemene deler van alles te nemen.</p>

        <h3>Stap 2 — IoC per kolom</h3>
        <p>Probeer elke sleutellengte L = 1, 2, 3, ... Splits de tekst in L kolommen en reken de gemiddelde IoC uit. Bij de
        <em>juiste</em> L is elke kolom een Caesar-cijfer en springt de IoC naar taalniveau (≈ 0,08). Bij een verkeerde L blijft
        hij rond de 0,04. Een veelvoud van de juiste lengte (2L, 3L) scoort ook hoog, want ook dan zit elke kolom onder één
        sleutelletter. Kies dus de <strong>kleinste</strong> lengte die hoog scoort.</p>

        <h3>Stap 3 — Friedman als controle</h3>
        <p>De Friedman-test geeft een snelle schatting zonder kolommen te maken:</p>
<pre><code>L ≈ (κ_taal − κ_willekeur) / (κ_tekst − κ_willekeur)
  ≈ (0,080 − 0,0385) / (0,0428 − 0,0385)  ≈  9,7</code></pre>
        <p>Dat is maar een <em>schatting</em> (de echte lengte blijkt 8): de formule gaat uit van een ideale, lange tekst.
        Gebruik haar als richtingaanwijzer, niet als antwoord.</p>

        <h3>Stap 4 — Het lezen</h3>
        <p>Heb je de lengte, dan stelt de werkbank per kolom de beste verschuiving voor (zie taak 3 voor de wiskunde). Lees
        de ontsleutelde tekst en beantwoord de vragen.</p>
        <div class="callout tip"><strong>Tip:</strong> klik in stap 2 op een andere lengte om te zien hoe "net niet goed"
        eruitziet. Bij L=4 is precies de helft van elke kolom goed: de IoC zit dan tussenin.</div>
      `,
      lab: { type: 'vigenere', text: MPV_CIPHER_1, lang: 'nl' },
      questions: [
        { q: 'Wat is de sleutellengte van bericht 1?', answer: '8', hint: 'Kleinste L met een IoC rond 0,08; vergelijk met de Kasiski-afstanden.', explain: 'L=8 geeft een gemiddelde IoC van ≈ 0,082; 16 scoort ook hoog, maar dat is een veelvoud.' },
        { q: 'Wat is de sleutel van bericht 1?', answer: ['NACHTUIL', 'nachtuil'], hint: 'Lees de voorgestelde sleutel in stap 3.', explain: 'NACHTUIL — passend bij "De Nachtwacht".' },
        { q: 'Op welke dag vindt de nieuwe drop plaats?', answer: ['donderdag'], hint: 'Lees de ontsleutelde tekst.', explain: 'Donderdag na middernacht, bij de oude loods aan het water.' },
        { q: 'Welke vlag staat in de ontsleutelde tekst?', answer: ['NM{kasiski_breekt_vigenere}'], encoded: true, hint: 'Aan het eind: het nieuwe codewoord.', explain: 'Ook de letters van de vlag waren versleuteld; de accolades en underscores niet — een klassieke lek: leestekens verraden structuur.', xp: 25 },
        { q: 'Waarom is de herhaling "MYT" met afstand 90 waarschijnlijk toeval?', options: ['90 is niet deelbaar door 8, terwijl bijna alle andere afstanden dat wel zijn', 'Omdat trigrammen nooit herhalen', 'Omdat 90 een priemgetal is', 'Omdat MYT geen Nederlands woord is'], answer: 0, explain: 'Een echte herhaling ligt op een veelvoud van de sleutellengte. 90 = 2·3²·5 past niet bij 8: twee verschillende klare teksten gaven toevallig dezelfde ciphertext.' },
      ],
    },
    {
      title: 'Taak 3 — Chi-kwadraat en het twijfelgeval',
      content: `
        <p>Een tweede bericht, van een ander lid van de cel. Hij vond een sleutel van 8 letters te kort en koos een veel
        langere. Langere sleutel = minder letters per kolom = <strong>zwakkere statistiek</strong>. Hier ga je zien dat de
        computer het niet altijd goed heeft, en dat jij als analist het laatste woord hebt.</p>

        <h3>Hoe kies je per kolom de verschuiving?</h3>
        <p>Elke kolom is een Caesar-cijfer. Je probeert alle 26 verschuivingen en vergelijkt de letterverdeling van de
        uitkomst met de verwachte verdeling van het Nederlands. De maat daarvoor is de <strong>chi-kwadraat</strong>:</p>
<pre><code>χ² = Σ (waargenomen_i − verwacht_i)² / verwacht_i      (over de 26 letters)</code></pre>
        <p>Hoe kleiner χ², hoe beter de kolom op Nederlands lijkt. De werkbank toont per kolom de beste én de tweede keus,
        met het verschil. Een klein verschil (minder dan ~15) betekent: <strong>de statistiek twijfelt</strong>.</p>

        <h3>Waarom kan de beste χ² fout zijn?</h3>
        <ul>
          <li><strong>Te weinig letters per kolom.</strong> Met 565 letters en een sleutel van 13 heeft elke kolom ~43 letters.
          Eén paar toevallige <code>a</code>'s of <code>n</code>'s kan de score omgooien.</li>
          <li><strong>De verkeerde taalverdeling.</strong> Probeer de Engelse frequentietabel: soms vind je dan voor een
          twijfelkolom wél de goede letter, omdat de Engelse verdeling minder op de <code>e</code> leunt.</li>
          <li><strong>Vakjargon en namen.</strong> Een tekst vol "cryptowallets" en "witwasorganisatie" heeft een andere
          verdeling dan een roman.</li>
        </ul>

        <h3>Taalgevoel als laatste stap</h3>
        <p>De sleutel is bij mensen bijna altijd een <strong>woord of zin</strong>. Leest de voorgestelde sleutel als een woord
        met één letter fout, dan weet je welke kolom je moet corrigeren. En de ontsleutelde tekst zelf helpt ook: staat er
        overal "obhervatie" en "dotlwit", dan is precies één kolom één plek verschoven.</p>
        <div class="callout info"><strong>Werkwijze:</strong> kies de lengte (Kasiski + IoC), lees de voorgestelde sleutel,
        zoek de twijfelkolom, probeer de tweede keus, en controleer of de hele tekst nu vloeiend leest. Pas de sleutel aan in
        het invoerveld; de tekst eronder werkt live mee.</div>
      `,
      lab: { type: 'vigenere', text: MPV_CIPHER_2, lang: 'nl' },
      questions: [
        { q: 'Wat is de sleutellengte van bericht 2?', answer: '13', hint: 'In stap 2 springt één lengte er duidelijk bovenuit.', explain: 'L=13 geeft een IoC van ≈ 0,085; alle andere lengtes blijven rond 0,043. Kasiski wijst ook op 13 (22 treffers).' },
        { q: 'Wat is de volledige, juiste sleutel van bericht 2?', answer: ['SPIEGELPALEIS', 'spiegelpaleis'], hint: 'De automatische gok heeft één letter fout. Welke kolom twijfelt, en wat is daar de tweede keus?', explain: 'Met de Nederlandse tabel kiest kolom 2 een A (te veel a\'s in die kolom); de tweede keus P maakt er SPIEGELPALEIS van. Met de Engelse tabel komt hij direct goed uit — taal en tekstlengte maken uit.', xp: 25 },
        { q: 'Wat zit er volgens de informant in de koffer? (twee woorden)', answer: ['harde schijven', 'harde schijf'], hint: 'Lees de ontsleutelde tekst na de correctie.', explain: 'Harde schijven met de administratie van de witwasorganisatie en de sleutels van de cryptowallets.' },
        { q: 'Waarom is een langere Vigenère-sleutel moeilijker statistisch te kraken (bij dezelfde tekstlengte)?', options: ['Er zijn minder letters per kolom, dus de frequentieverdeling per kolom is onbetrouwbaarder', 'Omdat lange sleutels een andere wiskunde gebruiken', 'Omdat de IoC dan hoger wordt', 'Dat is niet zo: lengte maakt niet uit'], answer: 0, explain: 'Tekstlengte gedeeld door sleutellengte = letters per kolom. Hoe minder letters, hoe meer ruis in de telling. Bij sleutellengte = tekstlengte heb je... een one-time pad.' },
      ],
    },
    {
      title: 'Taak 4 — De many-time pad: als "onbreekbaar" toch breekt',
      content: `
        <p>De cel werd voorzichtiger en stapte over op een <strong>one-time pad</strong>: een willekeurige sleutelstroom die even
        lang is als het bericht, ge-XORd met de klare tekst. Claude Shannon bewees in 1949 dat dit <em>perfect geheim</em> is.
        Maar die garantie heeft drie voorwaarden: de sleutel is echt willekeurig, minstens zo lang als het bericht, en wordt
        <strong>nooit hergebruikt</strong>. De cel gebruikte hetzelfde blok voor twee berichten.</p>

        <h3>Waarom hergebruik fataal is</h3>
<pre><code>C1 = P1 ⊕ K
C2 = P2 ⊕ K
C1 ⊕ C2 = P1 ⊕ K ⊕ P2 ⊕ K = P1 ⊕ P2       (want K ⊕ K = 0)</code></pre>
        <p>De sleutel valt volledig weg. Wat overblijft is twee klare teksten over elkaar heen. Dat klinkt nog onleesbaar,
        maar klare tekst heeft structuur: spaties, veelvoorkomende woorden, voorspelbare kopjes.</p>

        <h3>Crib dragging</h3>
        <p>Raad een woord dat waarschijnlijk in één van de berichten staat — een <strong>crib</strong>, zoals
        <code>" de "</code>. XOR het op elke positie met <code>C1 ⊕ C2</code>. Staat de crib echt op die plek in P1, dan krijg
        je op die plek een stuk van P2 te zien, en dat is leesbaar. Op alle andere plekken krijg je rommel.</p>
        <ol>
          <li>Begin met korte, veelvoorkomende cribs: <code>" de "</code>, <code>" het "</code>, <code>" van "</code>, <code>" een "</code>.</li>
          <li>Een leesbaar fragment uit P2 kun je zelf <em>verlengen</em> (raad hoe het woord verder gaat) en weer als crib gebruiken.</li>
          <li>Bekende formats zijn goud waard: een vlag begint met <code>NM{</code>, een wallet-adres met <code>bc1</code>.</li>
          <li>Vul bij stap 2 je reconstructie van bericht 1 in; de lab toont direct het bijbehorende stuk van bericht 2 én de sleutelstroom.</li>
        </ol>
        <div class="callout tip"><strong>Startpunt:</strong> beide berichten beginnen met precies dezelfde drie bytes
        (<code>35 a5 22</code>). Dan zijn de eerste drie tekens van beide berichten gelijk. Wat begint een Nederlandse zin vaak
        mee? Probeer bericht 1 te beginnen met <code>de </code>.</div>

        <h3>Dit gebeurde echt</h3>
        <ul>
          <li><strong>Venona (1943–1980):</strong> Sovjet-diplomaten hergebruikten one-time-padbladen onder oorlogsdruk.
          Amerikaanse cryptanalisten ontcijferden daardoor duizenden berichten, onder meer over atoomspionage.</li>
          <li><strong>WEP (wifi, 1999–2004):</strong> een IV van slechts 24 bits zorgde dat de RC4-sleutelstroom zich na enkele
          duizenden pakketten herhaalde. WEP werd binnen minuten kraakbaar.</li>
          <li><strong>AES-CTR en AES-GCM:</strong> dezelfde sleutel met dezelfde nonce = dezelfde sleutelstroom = many-time pad.
          Bij GCM lekt nonce-hergebruik bovendien de authenticatiesleutel, zodat een aanvaller berichten kan vervalsen.</li>
        </ul>
      `,
      lab: {
        type: 'xorcrib',
        title: 'twee berichten, één sleutelstroom',
        scenario: 'Twee onderschepte berichten van De Nachtwacht (hex). Ze zijn met hetzelfde one-time-padblok ge-XORd. Reconstrueer beide.',
        c1: MPV_MTP_1,
        c2: MPV_MTP_2,
        crib: ' de ',
        start: 'de ',
      },
      questions: [
        { q: 'Welke vlag staat aan het eind van bericht 1?', answer: ['NM{many_time_pad_lekt}'], encoded: true, hint: 'Sleep de crib "NM{" en zoek waar bericht 2 leesbaar wordt; of reconstrueer bericht 1 van voor naar achter.', explain: 'Bericht 1: "de betaling gaat morgen via de mixer naar wallet NM{many_time_pad_lekt}".', xp: 30 },
        { q: 'Waar wacht de koerier volgens bericht 2? (drie woorden)', answer: ['de oude loods', 'oude loods', 'bij de oude loods'], hint: 'Hoe verder je bericht 1 reconstrueert, hoe meer je van bericht 2 ziet.', explain: 'Bericht 2: "de koerier wacht vanavond bij de oude loods aan het water met de kaarten".' },
        { q: 'Waarom valt bij hergebruik de sleutel weg?', options: ['Omdat K ⊕ K = 0', 'Omdat XOR omkeerbaar is met elke sleutel', 'Omdat de berichten even lang zijn', 'Omdat het een zwakke random-generator is'], answer: 0, explain: 'XOR met jezelf geeft nul. C1 ⊕ C2 = P1 ⊕ P2 ⊕ (K ⊕ K) = P1 ⊕ P2.' },
        { q: 'Welke moderne fout is wiskundig hetzelfde als een many-time pad?', options: ['Twee berichten versleutelen met AES-GCM onder dezelfde sleutel én dezelfde nonce', 'Een wachtwoord hashen met bcrypt', 'Een TLS-certificaat hergebruiken op twee domeinen', 'AES-256 in plaats van AES-128 gebruiken'], answer: 0, explain: 'CTR/GCM maakt een sleutelstroom uit (sleutel, nonce, teller). Zelfde sleutel + zelfde nonce = zelfde sleutelstroom.' },
      ],
    },
    {
      title: 'Taak 5 — Van museumstuk naar malware: repeating-key XOR',
      content: `
        <p>Denk je dat Vigenère alleen in een museum hoort? Malware-analisten komen zijn digitale neef dagelijks tegen:
        <strong>repeating-key XOR</strong>. Malware versleutelt haar configuratie (C2-adressen, campagne-ID, encryptiesleutels)
        vaak met een korte sleutel die zich herhaalt. Dat is Vigenère op bytes in plaats van letters, en het breekt op
        precies dezelfde manier.</p>

        <h3>Stap 1 — Sleutellengte via de Hammingafstand</h3>
        <p>Bij letters gebruikten we de IoC. Bij bytes werkt de <strong>genormaliseerde Hammingafstand</strong> goed: neem voor
        elke kandidaat-lengte L een aantal blokken van L bytes en tel hoeveel <em>bits</em> opeenvolgende blokken verschillen,
        gedeeld door L. Bij de juiste L wordt de sleutel weg-ge-XORd en vergelijk je twee stukken klare tekst; die lijken in
        bits meer op elkaar dan willekeurige bytes. De laagste afstand wint.</p>
<pre><code>hamming("this is a test", "wokka wokka!!!") = 37   ← het bekende testgeval van Cryptopals</code></pre>

        <h3>Stap 2 — Transponeren en per byte kraken</h3>
        <p>Zet alle bytes 1, 1+L, 1+2L, ... in één blok: dat is een <strong>single-byte XOR</strong>. Probeer alle 256
        sleutels en scoor de uitkomst op leesbaarheid (letters, spaties, bekende woorden). Doe dat voor elk van de L blokken
        en je hebt de sleutel. In de Cijfer-kraker van de Gereedschapskist zit precies die single-byte-brute-force.</p>

        <h3>Stap 3 — Known plaintext maakt het nóg makkelijker</h3>
        <p>Malwareconfiguraties hebben voorspelbare stukken: <code>http://</code>, <code>.exe</code>, <code>User-Agent:</code>,
        nul-bytes als opvulling. Weet je dat ergens <code>http://</code> staat, dan is <code>C ⊕ "http://"</code> direct
        zeven bytes van de sleutel. Een XOR met <code>0x00</code> levert zelfs de sleutel letterlijk op: bij opvulling met
        nullen "lekt" de sleutel in het bestand, wat je in een hex-viewer kunt zien als een zich herhalend patroon.</p>

        <h3>De lessen voor verdedigers</h3>
        <table>
          <thead><tr><th>Fout</th><th>Moderne vorm</th><th>Goede praktijk</th></tr></thead>
          <tbody>
            <tr><td>Korte, herhalende sleutel</td><td>Repeating-key XOR in configs en "eigen crypto"</td><td>Gebruik een bewezen AEAD (AES-GCM, ChaCha20-Poly1305)</td></tr>
            <tr><td>Sleutel(stroom) hergebruiken</td><td>Nonce-hergebruik bij CTR/GCM</td><td>Unieke nonce per bericht, of een nonce-misuse-resistente modus (AES-GCM-SIV)</td></tr>
            <tr><td>Structuur lekt</td><td>Leestekens, opvulling, vaste headers</td><td>Versleutel alles, gebruik padding-veilige formaten</td></tr>
            <tr><td>Geheimhouding van het algoritme</td><td>"Niemand kent onze methode"</td><td>Kerckhoffs: alleen de sleutel mag geheim zijn</td></tr>
          </tbody>
        </table>
        <div class="callout info"><strong>Principe van Kerckhoffs (1883):</strong> een systeem moet veilig blijven, ook als
        de vijand alles weet behalve de sleutel. De Nachtwacht dacht dat een oud cijfer veilig was omdat "niemand dat meer
        gebruikt". Obscuriteit is geen beveiliging.</div>
      `,
      questions: [
        { q: 'Wat is de Hammingafstand tussen "this is a test" en "wokka wokka!!!" (in bits)?', answer: '37', hint: 'Staat in de tekst, of tel de verschillende bits na een XOR.', explain: '37 bits verschillen: het klassieke controlegetal uit Cryptopals set 1.' },
        { q: 'Een malwareconfig is ge-XORd met een herhalende sleutel en opgevuld met nul-bytes. Wat zie je in de opvulling?', options: ['De sleutel zelf, herhaald (want x ⊕ 0 = x)', 'Alleen nullen', 'Willekeurige bytes', 'De klare tekst'], answer: 0, explain: 'XOR met 0x00 laat de sleutelbyte ongewijzigd: de opvulling bevat de sleutel letterlijk.' },
        { q: 'Welk principe zegt dat alleen de sleutel geheim hoeft te zijn, niet het algoritme?', answer: ['Kerckhoffs', 'principe van Kerckhoffs', 'kerckhoffs principe'], hint: 'Nederlandse taalkundige en cryptograaf, 1883.', explain: 'Auguste Kerckhoffs (1883), geboren in Nuth (Limburg).' },
        { q: 'Na het transponeren op sleutellengte L: welk probleem moet je per blok oplossen?', options: ['Een single-byte XOR (256 mogelijkheden)', 'Een volledige AES-sleutel raden', 'Een hash kraken', 'Een priemfactorisatie'], answer: 0, explain: 'Elk blok is met één sleutelbyte ge-XORd: 256 kandidaten, scoor op leesbaarheid.' },
      ],
    },
  ],
});
