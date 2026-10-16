/* Room: Cybercrime-arcade — gemengde puzzels (puzzels-leerpad, speelse mix) */
CS.registerRoom({
  id: 'cybercrime-arcade',
  path: 'puzzels',
  order: 4,
  title: 'Cybercrime-arcade: gemengde puzzels',
  icon: '🕹️',
  difficulty: 'Gemiddeld',
  minutes: 55,
  summary: 'Een speelse mix van mini-puzzels: sorteer begrippen, zet een aanval op volgorde, schrijf een regex, kraak een cijfer en een crackme. Elke ronde die je wint levert een vlag op — haal ze allemaal en word arcade-kampioen.',
  objectives: [
    'Hash-algoritmen, cybercrime-rollen, ATT&CK-tactieken en OSINT-bronnen uit elkaar houden',
    'De zeven fasen van de Cyber Kill Chain op volgorde zetten',
    'Een reguliere expressie schrijven die kwaadaardige domeinen matcht en legitieme mijdt',
    'Een klassiek cijfer (Caesar) en een eenvoudige crackme terugrekenen',
    'Een ransomware-crime-script reconstrueren van toegang tot cash-out',
  ],
  terms: [
    { term: 'Cyber Kill Chain', def: 'Model van Lockheed Martin dat een gerichte aanval in zeven fasen beschrijft, van verkenning tot acties op het doel.' },
    { term: 'ATT&CK-tactiek', def: 'Het "waarom" van een aanvalsstap in MITRE ATT&CK (bijv. Verkenning, Persistentie, Exfiltratie, Impact). Een tactiek bundelt concrete technieken.' },
    { term: 'Command & Control (C2)', def: 'Het kanaal waarmee malware na installatie contact maakt met de aanvaller om opdrachten te ontvangen.' },
    { term: 'Money mule (geldezel)', def: 'Iemand die zijn rekening of wallet beschikbaar stelt om crimineel geld door te sluizen, vaak geronseld onder valse voorwendselen.' },
    { term: 'Access broker (toegangsmakelaar)', def: 'Een crimineel die toegang tot gehackte netwerken koopt en doorverkoopt aan bijvoorbeeld ransomware-groepen.' },
    { term: 'Typosquatting', def: 'Een domeinnaam registreren die sterk lijkt op een echte (met koppelteken, verwisselde letters of een extra woord) om slachtoffers te misleiden.' },
    { term: 'IOC (Indicator of Compromise)', def: 'Een waarneembaar spoor van een aanval: een verdacht domein, IP-adres, hash of e-mailadres.' },
    { term: 'Caesarcijfer (ROT)', def: 'Een klassiek cijfer dat elke letter een vast aantal plaatsen in het alfabet opschuift. Met 26 mogelijke verschuivingen zo gekraakt.' },
    { term: 'Crackme', def: 'Een klein oefenprogramma met een sleutelcontrole die je mag reverse-engineeren. Je leest de controle en leidt de juiste sleutel af.' },
    { term: 'Reguliere expressie (regex)', def: 'Een patroontaal om tekst te matchen. In cybersecurity handig om IOC\'s en verdachte patronen uit logs en lijsten te vissen.' },
    { term: 'NTLM', def: 'Windows-wachtwoordhash (MD4 van het wachtwoord in UTF-16LE), 32 hex-tekens — aan de hash niet van MD5 te onderscheiden.' },
    { term: 'Crime script', def: 'Een stap-voor-stapbeschrijving van hoe een misdaad wordt uitgevoerd (Cornish), handig om interventiemomenten te vinden.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — tactieken en technieken', url: 'https://attack.mitre.org/' },
    { title: 'Lockheed Martin — Cyber Kill Chain', url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html' },
    { title: 'regex101 — regex bouwen en testen met uitleg', url: 'https://regex101.com/' },
    { title: 'OverTheWire — wargames om puzzelend te oefenen', url: 'https://overthewire.org/wargames/' },
  ],
  tasks: [
    {
      title: 'Ronde 1 — Sorteer de begrippen (Connections)',
      content: `
        <p>Welkom in de <strong>Cybercrime-arcade</strong>! Geen lange theorie, wel zes rondes mini-puzzels. Elke ronde die
        je wint levert een <strong>vlag</strong> op (<code>JVT{...}</code>). Haal ze allemaal en pak de bonusvlag.</p>

        <p>We openen met een klassieker: <strong>Connections</strong>. Je ziet zestien door elkaar gegooide begrippen. Ze
        horen bij <strong>vier groepen van vier</strong>. Jouw taak: selecteer telkens vier die bij elkaar horen en controleer.
        Het lab geeft "drie goed" als hint wanneer je er net naast zit.</p>

        <p>De vier categorieën van deze ronde zijn:</p>
        <ul>
          <li><strong>Hash-algoritmen</strong> — manieren om een vingerafdruk van data te maken.</li>
          <li><strong>Cybercrime-rollen</strong> — wie doet wat in een criminele operatie.</li>
          <li><strong>ATT&amp;CK-tactieken</strong> — het "waarom" van een aanvalsstap in MITRE ATT&amp;CK.</li>
          <li><strong>OSINT-bronnen</strong> — plekken waar je open bronnen-informatie opzoekt.</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> twijfel je? Begin met de groep waar je het zekerst van bent (meestal de hashes: MD5, SHA-1,
          SHA-256 en NTLM zijn alle vier algoritmen). Zodra vier items weg zijn, wordt de rest overzichtelijker.
        </div>

        <p>Los alle vier de groepen op; bij de laatste groep verschijnt de vlag van ronde 1.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Sleep de zestien begrippen in de juiste vier categorieën van elk vier.',
        flag: 'JVT{alles_gesorteerd}',
        groups: [
          { name: 'Hash-algoritmen', items: ['MD5', 'SHA-1', 'SHA-256', 'NTLM'] },
          { name: 'Cybercrime-rollen', items: ['Money mule', 'Access broker', 'Botnetbeheerder', 'Witwasser'] },
          { name: 'ATT&CK-tactieken', items: ['Verkenning', 'Persistentie', 'Exfiltratie', 'Impact'] },
          { name: 'OSINT-bronnen', items: ['Shodan', 'WHOIS', 'Wayback Machine', 'Have I Been Pwned'] },
        ],
      },
      questions: [
        { q: 'In welke groep hoort "NTLM" thuis?', options: ['Hash-algoritmen', 'Cybercrime-rollen', 'ATT&CK-tactieken', 'OSINT-bronnen'], answer: 0, explain: 'NTLM is een Windows-wachtwoordhash (MD4 van UTF-16LE) en hoort dus bij de hash-algoritmen.' },
        { q: 'Welk begrip is een cybercrime-rol en geen OSINT-bron?', options: ['Shodan', 'Access broker', 'WHOIS', 'Wayback Machine'], answer: 1, explain: 'Een access broker (toegangsmakelaar) verkoopt toegang tot gehackte netwerken — een rol, geen zoekbron.' },
        { q: 'Welke vlag verschijnt als je alle vier de groepen goed hebt? (JVT{alles_gesorteerd})', answer: ['JVT{alles_gesorteerd}'], hint: 'De vlag staat in het lab en letterlijk in deze vraag.', explain: 'Ronde 1 gehaald: JVT{alles_gesorteerd}.' },
      ],
    },

    {
      title: 'Ronde 2 — Zet de Cyber Kill Chain op volgorde (Ordering)',
      content: `
        <p>Ronde 2: een <strong>volgorde-puzzel</strong>. De <strong>Cyber Kill Chain</strong> van Lockheed Martin beschrijft
        een gerichte aanval in <strong>zeven fasen</strong>. Ze volgen een logische ketting: eerst leer je het doelwit kennen,
        helemaal aan het eind haal je je slag binnen. Haal je één schakel eruit, dan stopt de aanval — vandaar de naam.</p>

        <p>De zeven fasen, in het kort:</p>
        <ol>
          <li><strong>Verkenning</strong> (Reconnaissance): doelwit en e-mailadressen verzamelen.</li>
          <li><strong>Bewapening</strong> (Weaponization): een exploit in een kwaadaardig bestand stoppen.</li>
          <li><strong>Aflevering</strong> (Delivery): het via bijvoorbeeld een phishingmail bezorgen.</li>
          <li><strong>Exploitatie</strong> (Exploitation): de kwetsbaarheid wordt misbruikt bij het openen.</li>
          <li><strong>Installatie</strong> (Installation): een achterdeur (implant) nestelt zich.</li>
          <li><strong>Command &amp; Control</strong> (C2): het implant belt naar de aanvaller.</li>
          <li><strong>Acties op het doel</strong> (Actions on Objectives): data stelen of versleutelen.</li>
        </ol>

        <p>In het lab staan de fasen <strong>geschud</strong>. Schuif ze met de pijltjes in de juiste volgorde en controleer.
        Bij de juiste volgorde krijg je de vlag van ronde 2.</p>

        <div class="callout info">
          <strong>Waarom handig?</strong> Als je weet in welke fase een aanval zit, weet je ook wat er nog komt — en waar je
          hem het goedkoopst kunt stoppen (liefst vroeg, bij aflevering).
        </div>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de zeven fasen van de Cyber Kill Chain in de juiste volgorde.',
        items: [
          { id: 'recon', label: 'Verkenning — doelwit en e-mailadressen verzamelen' },
          { id: 'weapon', label: 'Bewapening — exploit in een kwaadaardig document stoppen' },
          { id: 'delivery', label: 'Aflevering — de phishingmail versturen' },
          { id: 'exploit', label: 'Exploitatie — de kwetsbaarheid wordt misbruikt bij openen' },
          { id: 'install', label: 'Installatie — een achterdeur (implant) nestelt zich' },
          { id: 'c2', label: 'Command & Control — het implant belt naar de aanvaller' },
          { id: 'actions', label: 'Acties op het doel — data stelen of versleutelen' },
        ],
        correct: ['recon', 'weapon', 'delivery', 'exploit', 'install', 'c2', 'actions'],
        flag: 'JVT{kill_chain_compleet}',
        explain: 'De volgorde is Verkenning → Bewapening → Aflevering → Exploitatie → Installatie → C2 → Acties op het doel.',
      },
      questions: [
        { q: 'Welke fase komt direct NA "Aflevering"?', options: ['Verkenning', 'Exploitatie', 'Command & Control', 'Installatie'], answer: 1, explain: 'Na aflevering volgt exploitatie: de kwetsbaarheid wordt misbruikt zodra het slachtoffer het bestand opent.' },
        { q: 'Hoeveel fasen telt de Cyber Kill Chain?', answer: ['7', 'zeven'], hint: 'Tel de fasen in de opsomming.', explain: 'De Cyber Kill Chain heeft zeven fasen, van verkenning tot acties op het doel.' },
        { q: 'Welke vlag hoort bij de juiste volgorde? (JVT{kill_chain_compleet})', answer: ['JVT{kill_chain_compleet}'], hint: 'De vlag verschijnt in het lab en staat letterlijk in de vraag.', explain: 'Ronde 2 gehaald: JVT{kill_chain_compleet}.' },
      ],
    },

    {
      title: 'Ronde 3 — Regex golf: match de nep, mijd de echte',
      content: `
        <p>Ronde 3 is <strong>regex golf</strong>: schrijf één <strong>reguliere expressie</strong> (regex) die <em>alle</em>
        regels in de <strong>match</strong>-lijst raakt en <em>geen enkele</em> regel in de <strong>avoid</strong>-lijst.
        Hoe korter je patroon, hoe mooier (vandaar "golf": lage score = goed).</p>

        <p>De opdracht: de match-lijst bevat vier <strong>kwaadaardige, nep-domeinen</strong> die een merknaam nabootsen. De
        avoid-lijst bevat de vier <strong>echte</strong> domeinen. Kijk goed naar het verschil:</p>
        <table>
          <thead><tr><th>Match (nep)</th><th>Avoid (echt)</th></tr></thead>
          <tbody>
            <tr><td>nederbank-beveiliging.jvt.lab</td><td>nederbank.nl</td></tr>
            <tr><td>pakketpost-track.jvt.lab</td><td>pakketpost.nl</td></tr>
            <tr><td>mijnoverheid-check.jvt.lab</td><td>mijnoverheid.nl</td></tr>
            <tr><td>rijksbelastingen-terugbetaling.jvt.lab</td><td>rijksbelastingen.nl</td></tr>
          </tbody>
        </table>

        <p>Zie je het patroon? De nep-domeinen <strong>plakken met een koppelteken een extra woord</strong> achter de merknaam
        (en wonen op <code>.jvt.lab</code> in plaats van <code>.nl</code>). De echte domeinen zijn kaal: <code>merk.nl</code>.
        Een piepklein patroon als <code>-</code> matcht al <strong>alle</strong> nep-regels en <strong>geen enkele</strong>
        echte. Ook <code>\\.lab</code> of <code>lab</code> werkt. Typ je patroon en kijk live per regel het vinkje ✓/✗.</p>

        <div class="callout warn">
          <strong>Let op:</strong> in het echt zijn phishing-domeinen zo herkenbaar: een koppelteken tussen merk en woord, een
          vreemd verlengstuk, of een ander topniveaudomein. Deze oefendomeinen zijn fictief (<code>.jvt.lab</code>).
        </div>
      `,
      lab: {
        type: 'regexgolf',
        prompt: 'Schrijf één patroon dat alle nep-domeinen matcht en geen enkel echt domein.',
        match: ['nederbank-beveiliging.jvt.lab', 'pakketpost-track.jvt.lab', 'mijnoverheid-check.jvt.lab', 'rijksbelastingen-terugbetaling.jvt.lab'],
        avoid: ['nederbank.nl', 'pakketpost.nl', 'mijnoverheid.nl', 'rijksbelastingen.nl'],
        flags: '',
        flag: 'JVT{patroon_gevonden}',
      },
      questions: [
        { q: 'Welk kenmerk onderscheidt de nep-domeinen van de echte?', options: ['Ze zijn langer dan 10 tekens', 'Ze plakken met een koppelteken een extra woord achter de merknaam', 'Ze beginnen met een hoofdletter', 'Ze bevatten een cijfer'], answer: 1, explain: 'De nep-domeinen gebruiken een koppelteken plus extra woord (en .jvt.lab); een patroon op "-" is al genoeg.' },
        { q: 'Welk kort patroon matcht alle nep-domeinen en geen enkel echt domein? (één teken volstaat)', answer: ['-'], hint: 'Kijk naar het teken dat álle nep-domeinen hebben en geen enkel echt domein.', explain: 'Het koppelteken "-" komt alleen in de nep-domeinen voor. Ook \\.lab of lab is een geldige oplossing.' },
        { q: 'Welke vlag hoort bij een opgelost patroon? (JVT{patroon_gevonden})', answer: ['JVT{patroon_gevonden}'], hint: 'De vlag staat in het lab en letterlijk in deze vraag.', explain: 'Ronde 3 gehaald: JVT{patroon_gevonden}.' },
      ],
    },

    {
      title: 'Ronde 4 — Kraak het cijfer (Caesar)',
      content: `
        <p>Ronde 4: een <strong>versleuteld bericht</strong>. Ergens in de arcade knippert dit op het scherm:</p>
        <pre><code>Kl nlolptl cshn pz QCA{jhlzhy_pz_thrrlspqr}</code></pre>

        <p>Het ziet er als wartaal uit, maar de structuur verraadt een <strong>Caesarcijfer</strong> (ook wel ROT genoemd):
        elke letter is een vast aantal plaatsen in het alfabet <strong>opgeschoven</strong>. Zie je dat <code>QCA{...}</code>-blok?
        Dat is bijna zeker een vlag die eigenlijk <code>JVT{...}</code> moet zijn. Tel het verschil: <code>Q</code> → <code>J</code>
        is zeven letters terug. De hele tekst is dus met <strong>7 opgeschoven</strong>; schuif alles 7 terug en je leest het.</p>

        <p>Gebruik het <strong>cipher-lab</strong> hieronder. Zet het op <strong>Caesar/ROT</strong>: de tool toont alle 26
        verschuivingen én een automatische "beste gok". Die beste gok landt precies op de leesbare zin. Daar staat de vlag van
        ronde 4 in — let op: de vlag verschijnt pas <em>na</em> het ontsleutelen, dus hij staat niet letterlijk in deze tekst.</p>

        <div class="callout tip">
          <strong>Tip:</strong> een Caesarcijfer heeft maar 26 mogelijkheden. Zelfs zonder hint kun je ze allemaal proberen
          ("brute-force") tot er leesbare Nederlandse tekst verschijnt. Dat heet het aftellen van de sleutelruimte.
        </div>
      `,
      lab: { type: 'cipher', text: 'Kl nlolptl cshn pz QCA{jhlzhy_pz_thrrlspqr}' },
      questions: [
        { q: 'Met hoeveel plaatsen is de tekst opgeschoven (dus hoeveel moet je terugschuiven)?', answer: ['7'], hint: 'Vergelijk de cijfer-letter Q met de verwachte J: hoeveel plaatsen zit daartussen?', explain: 'Q → J is 7 plaatsen; de hele tekst is met ROT7 versleuteld.' },
        { q: 'Wat is de vlag uit het ontsleutelde bericht?', answer: ['JVT{caesar_is_makkelijk}'], encoded: true, hint: 'Ontsleutel met het cipher-lab (Caesar, 7 terug); de "beste gok" toont de hele zin met de vlag.', explain: 'De tekst luidt "De geheime vlag is JVT{caesar_is_makkelijk}". Ronde 4 gehaald.' },
        { q: 'Waarom is een Caesarcijfer makkelijk te kraken?', options: ['Omdat het razendsnel te berekenen is', 'Omdat er maar 26 mogelijke verschuivingen zijn om te proberen', 'Omdat het alleen op Windows werkt', 'Omdat de sleutel altijd 7 is'], answer: 1, explain: 'Met slechts 26 sleutels probeer je ze simpelweg allemaal tot er leesbare tekst verschijnt.' },
      ],
    },

    {
      title: 'Ronde 5 — Insert coin: kraak de crackme',
      content: `
        <p>Ronde 5: een <strong>crackme</strong>. Een nep-arcadeautomaat vraagt om een <strong>muntcode</strong> voordat je
        mag spelen. In het lab lees je de controlefunctie <code>check(sleutel)</code>. Jij moet de sleutel afleiden die de
        controle <code>true</code> maakt — niet door te gokken, maar door de bewerkingen <strong>terug te rekenen</strong>.</p>

        <p>De controle doet twee dingen met jouw sleutel:</p>
        <ol>
          <li>het verhoogt elke <strong>tekencode met 1</strong> (de letter erna: <code>a</code>→<code>b</code>,
          <code>c</code>→<code>d</code>, <code>1</code>→<code>2</code>);</li>
          <li>daarna <strong>keert het de hele string om</strong> (achterstevoren);</li>
          <li>het resultaat moet exact gelijk zijn aan de doelstring <code>6313ojpd</code>.</li>
        </ol>

        <h3>Zo reken je het terug</h3>
        <p>Draai de stappen in <strong>omgekeerde volgorde</strong> om. Keer eerst de doelstring om: <code>6313ojpd</code>
        achterstevoren is <code>dpjo3136</code>. Trek daarna van elke tekencode er <strong>1 af</strong> (de letter ervoor):
        <code>d</code>→<code>c</code>, <code>p</code>→<code>o</code>, <code>j</code>→<code>i</code>, <code>o</code>→<code>n</code>,
        <code>3</code>→<code>2</code>, <code>1</code>→<code>0</code>, <code>3</code>→<code>2</code>, <code>6</code>→<code>5</code>.
        Lees het resultaat: dat is je muntcode. Typ hem in het lab; bij succes verschijnt de vlag van ronde 5.</p>

        <div class="callout tip">
          <strong>Tip:</strong> het terugdraaien van een crackme is altijd dezelfde truc: lees wát de controle met je invoer
          doet en draai elke bewerking in omgekeerde volgorde om. Een checksom of "+1" is nooit echte beveiliging.
        </div>
      `,
      lab: {
        type: 'crackme',
        title: 'Muntcode-automaat',
        intro: 'De automaat verhoogt elke tekencode met 1, keert de string om en vergelijkt met 6313ojpd. Welke muntcode geeft toegang?',
        source: `function check(sleutel) {
  // 1) elke tekencode +1 (de letter/cijfer erna)
  var verhoogd = [...sleutel].map(function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }).join('');
  // 2) de hele string omkeren
  var omgekeerd = verhoogd.split('').reverse().join('');
  // 3) moet exact gelijk zijn aan de doelstring
  return omgekeerd === '6313ojpd';
}`,
        check: (sleutel) => {
          const verhoogd = [...sleutel].map((c) => String.fromCharCode(c.charCodeAt(0) + 1)).join('');
          const omgekeerd = verhoogd.split('').reverse().join('');
          return omgekeerd === '6313ojpd';
        },
        flag: 'JVT{insert_coin}',
        reveal: 'Toegang verleend! Je keerde de doelstring om (dpjo3136) en trok overal 1 af. Insert coin om te spelen.',
        hint: 'Keer 6313ojpd om tot dpjo3136 en trek van elke tekencode 1 af: d→c, p→o, j→i, o→n, 3→2, 1→0, 3→2, 6→5.',
      },
      questions: [
        { q: 'Welke muntcode (sleutel) geeft toegang tot de automaat?', answer: ['coin2025'], hint: '6313ojpd omgekeerd is dpjo3136; trek van elk teken 1 af.', explain: 'dpjo3136 met elke tekencode -1 wordt coin2025 — dat is de sleutel.' },
        { q: 'Wat is de algemene truc om een crackme te kraken?', options: ['Heel snel typen', 'De bewerkingen van de controle in omgekeerde volgorde terugdraaien', 'Het programma verwijderen', 'De automaat resetten'], answer: 1, explain: 'Je leest wat de controle doet en draait elke stap in omgekeerde volgorde om naar de juiste invoer.' },
        { q: 'Welke vlag verschijnt bij de juiste muntcode? (JVT{insert_coin})', answer: ['JVT{insert_coin}'], hint: 'De vlag verschijnt in het lab en staat letterlijk in de vraag.', explain: 'Ronde 5 gehaald: JVT{insert_coin}.' },
      ],
    },

    {
      title: 'Ronde 6 — Reconstrueer het crime script (Ordering)',
      content: `
        <p>Laatste ronde! Opnieuw een <strong>volgorde-puzzel</strong>, maar nu vanuit het oogpunt van de crimineel: een
        <strong>crime script</strong> van een <strong>ransomware-afpersing met cash-out</strong>. Een crime script beschrijft
        stap voor stap hoe een misdaad wordt uitgevoerd — handig om te zien wáár je kunt ingrijpen.</p>

        <p>De bende werkt met "double extortion": ze stelen eerst data én versleutelen daarna de bestanden, zodat het
        slachtoffer dubbel onder druk staat. De zeven stappen, van begin tot geld:</p>
        <ul>
          <li>Toegang <strong>kopen</strong> bij een access broker of binnenkomen via phishing.</li>
          <li><strong>Inloggen</strong> met de gestolen gegevens (initiële toegang).</li>
          <li>Rechten <strong>verhogen</strong> en lateraal door het netwerk bewegen.</li>
          <li>Gevoelige data <strong>kopiëren en wegsluizen</strong> (exfiltratie) — dit is het chantagemateriaal.</li>
          <li>De <strong>ransomware uitrollen</strong> en bestanden versleutelen.</li>
          <li>Een <strong>losgeldbrief</strong> plaatsen en onderhandelen.</li>
          <li>Het losgeld in crypto <strong>door een mixer naar een exchange</strong> sluizen (cash-out).</li>
        </ul>

        <p>In het lab staan de stappen geschud. Zet ze in de logische volgorde — je kunt immers pas afpersen nadat je
        versleuteld hebt, en pas uitbetalen nadat er betaald is. Bij de juiste volgorde krijg je de laatste rondevlag.</p>

        <div class="callout danger">
          <strong>Arcade-kampioen:</strong> heb je alle zes de rondes gewonnen, dan verdien je de bonusvlag
          <code>JVT{arcade_kampioen}</code>. Goed gespeeld!
        </div>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de zeven stappen van het ransomware-crime-script op volgorde, van toegang tot cash-out.',
        items: [
          { id: 'koop', label: 'Toegang kopen bij een access broker of via phishing' },
          { id: 'login', label: 'Inloggen met gestolen gegevens (initiële toegang)' },
          { id: 'lateraal', label: 'Rechten verhogen en lateraal door het netwerk bewegen' },
          { id: 'exfil', label: 'Gevoelige data kopiëren en wegsluizen (exfiltratie)' },
          { id: 'encrypt', label: 'Ransomware uitrollen en bestanden versleutelen' },
          { id: 'afpers', label: 'Losgeldbrief plaatsen en onderhandelen' },
          { id: 'cashout', label: 'Losgeld door een mixer naar een exchange sluizen (cash-out)' },
        ],
        correct: ['koop', 'login', 'lateraal', 'exfil', 'encrypt', 'afpers', 'cashout'],
        flag: 'JVT{crime_script_af}',
        explain: 'Toegang kopen → inloggen → lateraal bewegen → data exfiltreren → versleutelen → afpersen → cash-out.',
      },
      questions: [
        { q: 'Waarom stelen de criminelen de data (exfiltratie) vóór ze versleutelen?', options: ['Omdat versleutelde data niet meer te kopiëren is en de gestolen data extra chantagemiddel oplevert', 'Omdat het sneller is', 'Omdat de politie dat voorschrijft', 'Dat maakt geen verschil'], answer: 0, explain: 'Bij double extortion is de gestolen data het tweede drukmiddel; na versleuteling kun je niets bruikbaars meer kopiëren.' },
        { q: 'Wat is de laatste stap van het crime script?', answer: ['cash-out', 'cashout'], hint: 'Het gaat om wat er met het losgeld gebeurt.', explain: 'De cash-out: het losgeld via een mixer naar een exchange sluizen om het te verzilveren.' },
        { q: 'Welke bonusvlag verdien je als je alle zes de rondes hebt gewonnen? (JVT{arcade_kampioen})', answer: ['JVT{arcade_kampioen}'], hint: 'De bonusvlag staat in de laatste callout en letterlijk in deze vraag.', explain: 'Alle rondes gehaald: JVT{arcade_kampioen}. Jij bent de arcade-kampioen!' },
      ],
    },
  ],
});
