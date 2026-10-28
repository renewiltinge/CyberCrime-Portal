/* Room: Casus — de digitale nalatenschap (een cryptowallet terugvinden voor de erfgenamen) */

// =======================================================================
//  Alles in deze room is FICTIEF: de familie De Wit, de documenten, de
//  herstelzin en de wallet zijn verzonnen. De herstelzin bestaat uit
//  Nederlandse woorden om de puzzel leesbaar te houden; een echte zin
//  bestaat uit 12 of 24 Engelse woorden uit de BIP39-lijst.
// =======================================================================

const MPN_GEDICHT = [
  'in de haven ligt een oude boot',
  'de wind waait over het grijze water',
  'mijn vader bouwde hier zijn huis',
  'elke ochtend zong de merel zacht',
  'zomer kwam en bracht ons brood',
  'de molen draaide naast de witte kerk',
  'lantaarn licht op het natte plein',
  'wij liepen samen tot de dijk',
  'onder de linde stond een bank',
  'het water bleef altijd even koud',
  'zij zong een lied voor iedereen',
  'dag en nacht keek ik naar de zee',
].join('\n') + '\n';

const MPN_FS = {
  '/home/executeur/LEESMIJ.txt': 'Opdracht van mr. A. de Wit (executeur) aan het onderzoeksbureau, met schriftelijke toestemming van alle erfgenamen:\nHelp ons de bitcoin van mijn vader Henk de Wit (overleden 2 september 2026) terug te vinden.\nDe gescande documenten uit zijn bureau staan in de map nalatenschap/.\n',
  '/home/executeur/nalatenschap/notitieboek_p14.txt': 'Voor als ik er niet meer ben.\nDe twaalf woorden staan in mijn lievelingsgedicht (het staat ingelijst in de gang).\nRegel.woord, in deze volgorde:\n\n6.2 7.1 1.3 4.5 8.6 5.6 9.3 2.2 6.7 5.1 11.4 10.6\n\nHet wachtwoord van de wallet-app: de naam van onze eerste hond met daarachter het jaar dat Riet en ik trouwden.\n',
  '/home/executeur/nalatenschap/notitieboek_p09.txt': 'DOORGESTREEPT (oude wallet, leeg gemaakt in 2021, niet meer gebruiken):\n2.1 3.3 1.1 9.9 4.2 5.5 12.1 7.7 8.8 11.1 6.6 10.10\n',
  '/home/executeur/nalatenschap/gedicht_gang.txt': MPN_GEDICHT,
  '/home/executeur/nalatenschap/trouwkaart.txt': 'Henk de Wit en Riet Jansen\ngeven elkaar het ja-woord op vrijdag 14 mei 1971\nin het gemeentehuis van Zeeweide.\n',
  '/home/executeur/nalatenschap/dierenarts_1974.txt': 'Dierenkliniek Zeeweide — rekening 1974\nPatiënt: Bello (hond, kruising) — eigenaar: H. de Wit\nEnting en controle: f 35,-\n',
  '/home/executeur/nalatenschap/fotoalbum_index.txt': 'Fotoalbum (index, geschreven door Riet)\n1972 — Henk op de boot van zijn vader\n1975 — Bello in de sneeuw\n1988 — Max, onze tweede hond, als pup\n1998 — kerst met Max en de kleinkinderen\n2021 — Henk koopt zijn eerste bitcoin ("voor de kleinkinderen")\n',
  '/home/executeur/nalatenschap/brief_cryptoherstel.txt': 'Van: support@wallet-herstel-snel.example\nGeachte erfgenaam, wij kunnen uw wallet binnen 24 uur herstellen.\nStuur ons de twaalf woorden en wij doen de rest. Kosten: slechts 5% van het saldo.\n',
};

CS.registerRoom({
  id: 'casus-digitale-nalatenschap',
  path: 'puzzels',
  order: 9,
  title: 'Casus: de digitale nalatenschap',
  icon: '🗝️',
  difficulty: 'Moeilijk',
  minutes: 75,
  summary: 'Opa Henk liet bitcoin na "voor de kleinkinderen", maar niemand weet waar de sleutels zijn. In opdracht van de executeur zoek je in zijn papieren de herstelzin (verstopt in een gedicht), reconstrueer je het wachtwoord van de wallet-app uit familiedocumenten, en zorg je dat de erfenis veilig en rechtmatig bij de erfgenamen komt — zonder in de val van een "herstelbedrijf" te lopen.',
  objectives: [
    'Uitleggen wie mag zoeken naar de digitale bezittingen van een overledene (executeur, verklaring van erfrecht, toestemming)',
    'Begrijpen wat een herstelzin (seed phrase) is en waarom wie hem kent de volledige controle over de wallet heeft',
    'Een herstelzin reconstrueren uit een boekcijfer met terminalcommando\'s (head, tail, cut)',
    'Een wachtwoord afleiden uit persoonlijke documenten en daarbij afleiders herkennen',
    'Oplichting rond cryptoherstel herkennen en de erfenis veilig en gedocumenteerd overdragen',
  ],
  terms: [
    { term: 'Executeur', def: 'De persoon die in een testament is aangewezen om de nalatenschap af te wikkelen. Kan namens de erfgenamen handelen.' },
    { term: 'Verklaring van erfrecht', def: 'Een notariële akte die vastlegt wie de erfgenamen zijn en wie bevoegd is de nalatenschap af te wikkelen. Banken en beurzen vragen erom.' },
    { term: 'Herstelzin (seed phrase)', def: 'Een reeks van meestal 12 of 24 woorden (BIP39) waaruit alle sleutels van een wallet worden afgeleid. Wie de zin kent, kan over het geld beschikken.' },
    { term: 'Self-custody', def: 'Je bewaart de sleutels van je crypto zelf (bijv. met een hardware wallet), in plaats van bij een beurs. Bij overlijden is er dan geen bedrijf dat kan helpen.' },
    { term: 'Boekcijfer', def: 'Een geheimschrift waarbij getallen verwijzen naar woorden in een afgesproken tekst (bijv. regel en woord). Zonder de juiste tekst zijn de getallen betekenisloos.' },
    { term: 'Wachtwoord van de wallet-app', def: 'Beschermt de wallet op één apparaat. Het is iets anders dan de herstelzin: met de zin kun je de wallet altijd op een nieuw apparaat terughalen.' },
    { term: 'Herstelzwendel', def: 'Oplichting waarbij "herstelbedrijven" erfgenamen of slachtoffers vragen om de herstelzin, om daarna het geld te stelen.' },
  ],
  resources: [
    { title: 'Rijksoverheid — erven en de verklaring van erfrecht', url: 'https://www.rijksoverheid.nl/onderwerpen/erfrecht' },
    { title: 'Fraudehelpdesk — crypto- en herstelfraude', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'Bitcoin-wiki — BIP39 (herstelzinnen)', url: 'https://en.bitcoin.it/wiki/BIP_0039' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De opdracht: wie mag hier zoeken?',
      content: `
        <p>Henk de Wit (fictief) overleed op 2 september 2026. Zijn dochter Anja is executeur. In zijn agenda staat: "2021 —
        eerste bitcoin, voor de kleinkinderen". Er is geen account bij een beurs gevonden: Henk bewaarde zijn crypto zelf
        (<em>self-custody</em>). Dan is er geen klantenservice die kan helpen. Zonder sleutels is het geld voorgoed onbereikbaar.</p>
        <h3>Rechtmatig zoeken</h3>
        <ul>
          <li>De <strong>executeur</strong> (of de gezamenlijke erfgenamen) beheert de nalatenschap. De notaris legt dat vast in een
          <strong>verklaring van erfrecht</strong>.</li>
          <li>Een onderzoeker werkt alleen met een <strong>schriftelijke opdracht</strong> van wie daartoe bevoegd is, en legt vast wat
          hij doet. Andermans wallet "terugvinden" zonder die bevoegdheid is gewoon diefstal.</li>
          <li>De opbrengst valt in de nalatenschap. Voor de <strong>erfbelasting</strong> telt de waarde op de dag van overlijden,
          ook bij crypto.</li>
        </ul>
        <h3>Wat zoek je precies?</h3>
        <p>Een wallet-app heeft meestal twee geheimen:</p>
        <table>
          <thead><tr><th>Geheim</th><th>Wat het doet</th><th>Als je het kwijt bent</th></tr></thead>
          <tbody>
            <tr><td><strong>Herstelzin</strong> (12 of 24 woorden)</td><td>Hieruit volgen alle sleutels; de wallet is er op elk apparaat mee terug te zetten</td><td>Geld onbereikbaar (als het apparaat ook weg is)</td></tr>
            <tr><td><strong>Wachtwoord of pincode van de app</strong></td><td>Beschermt de wallet op één telefoon of computer</td><td>Met de herstelzin kun je opnieuw beginnen</td></tr>
          </tbody>
        </table>
        <div class="callout warn"><strong>Gouden regel:</strong> een herstelzin typ je nooit in op een website en stuur je nooit
        naar iemand. Wie hem kent, kan het geld wegsluizen, en een transactie op de blockchain is niet terug te draaien.</div>
      `,
      questions: [
        { q: 'Welke notariële akte legt vast wie de erfgenamen zijn en wie de nalatenschap mag afwikkelen?', answer: ['verklaring van erfrecht', 'een verklaring van erfrecht', 'de verklaring van erfrecht'], hint: 'Staat in de tekst.', explain: 'Beurzen en banken vragen om deze verklaring voordat ze iets vrijgeven.' },
        { q: 'Henk bewaarde zijn crypto zelf. Wat betekent dat voor de erfgenamen?', options: ['Er is geen bedrijf dat kan helpen: zonder de sleutels is het geld onbereikbaar', 'De beurs stuurt de sleutels naar de notaris', 'De bank kan het geld terughalen', 'Het geld gaat automatisch naar de partner'], answer: 0, explain: 'Bij self-custody bestaan de sleutels alleen bij de eigenaar.' },
        { q: 'Welke waarde telt voor de erfbelasting?', options: ['De waarde op de dag van overlijden', 'De aankoopprijs uit 2021', 'De waarde op het moment van verkopen', 'Crypto telt niet mee'], answer: 0, explain: 'De waarde in het economisch verkeer op de overlijdensdatum.' },
      ],
    },
    {
      title: 'Taak 2 — Het gedicht in de gang',
      content: `
        <p>In het bureau van Henk liggen gescande pagina's van zijn notitieboek. Op pagina 14 staat een reeks getallen en een
        verwijzing naar zijn "lievelingsgedicht", dat ingelijst in de gang hangt. Dat is een <strong>boekcijfer</strong>: elk getal
        <code>regel.woord</code> wijst één woord aan. Veel mensen verstoppen hun herstelzin zo: het briefje alleen is waardeloos
        voor een inbreker, maar de familie kan het oplossen.</p>
        <h3>Met de terminal</h3>
        <p>Je kunt het met de hand tellen, maar een onderzoeker werkt reproduceerbaar. Zo haal je regel 6, woord 2 op:</p>
<pre><code>head -n 6 gedicht_gang.txt | tail -n 1 | cut -d ' ' -f 2</code></pre>
        <p><code>head -n 6</code> geeft de eerste zes regels, <code>tail -n 1</code> daarvan de laatste (regel 6), en
        <code>cut -d ' ' -f 2</code> knipt op spaties en pakt het tweede woord.</p>
        <div class="callout tip"><strong>Let op afleiders:</strong> er staan twee reeksen getallen in de map. Lees welke reeks
        geldig is voordat je begint. Begin met <code>ls</code> en <code>cat notitieboek_p14.txt</code>.</div>
        <div class="callout info"><strong>In het echt</strong> bestaat een herstelzin uit Engelse woorden uit de BIP39-lijst van
        2048 woorden, en het laatste woord bevat een controlegetal (checksum). Een fout woord of een verkeerde volgorde valt dus
        meestal direct op. In deze oefening zijn het Nederlandse woorden.</div>
      `,
      lab: {
        type: 'terminal',
        user: 'onderzoeker', host: 'bureau-wit',
        home: '/home/executeur', cwd: '/home/executeur/nalatenschap',
        motd: 'Onderzoekswerkstation (kopie van de gescande documenten, alleen lezen). Begin met: ls',
        fs: MPN_FS,
      },
      questions: [
        { q: 'Welke reeks getallen is de geldige (van welke notitieboekpagina)?', options: ['Pagina 14', 'Pagina 9', 'Allebei', 'Geen van beide'], answer: 0, explain: 'Pagina 9 is doorgestreept: een oude, lege wallet.' },
        { q: 'Wat is het eerste woord van de herstelzin? (regel 6, woord 2)', answer: ['molen'], hint: 'head -n 6 gedicht_gang.txt | tail -n 1 | cut -d \' \' -f 2', explain: 'Regel 6: "de molen draaide naast de witte kerk" — woord 2 is "molen".' },
        { q: 'Wat is het zevende woord van de herstelzin? (regel 9, woord 3)', answer: ['linde'], hint: 'Regel 9 is "onder de linde stond een bank".', explain: 'Het zevende getal is 9.3: "linde".' },
        { q: 'Wat is het laatste (twaalfde) woord van de herstelzin?', answer: ['koud'], hint: 'Het laatste getal is 10.6.', explain: 'Regel 10, woord 6: "koud". De hele zin: molen lantaarn haven merel dijk brood linde wind kerk zomer lied koud.' },
      ],
    },
    {
      title: 'Taak 3 — Het wachtwoord van de wallet-app',
      content: `
        <p>Henks oude laptop staat nog aan, met de wallet-app erop. De app vraagt om een wachtwoord. Op pagina 14 schreef hij:
        "de naam van onze eerste hond met daarachter het jaar dat Riet en ik trouwden".</p>
        <p>Met de herstelzin uit taak 2 zou je de wallet ook op een nieuw apparaat kunnen terugzetten. Maar op de laptop staan
        ook notities en transactielabels die de erfgenamen graag willen zien, en het openen ervan laat zien dat de herstelzin
        bij precies deze wallet hoort. Je zoekt dus allebei.</p>
        <h3>Persoonlijke documenten als bron</h3>
        <p>Dit is de omgekeerde kant van wat je bij wachtwoordbeveiliging leert: wachtwoorden die bestaan uit namen van
        huisdieren en jaartallen zijn makkelijk te raden voor wie de persoon kent. Hier helpt dat de erfgenamen. Maar let op:
        er zijn twee honden en meerdere jaartallen. Welke combinatie past precies bij de aanwijzing?</p>
      `,
      lab: {
        type: 'osintpuzzle',
        scenario: 'Drie documenten uit het bureau van Henk. Welke hond was de eerste, en in welk jaar trouwden Henk en Riet?',
        records: [
          { title: 'Trouwkaart', icon: '💌', lines: ['Henk de Wit en Riet Jansen', 'geven elkaar het ja-woord op vrijdag 14 mei 1971', 'in het gemeentehuis van Zeeweide'] },
          { title: 'Rekening dierenarts (1974)', icon: '🐕', lines: ['Patiënt: Bello (hond, kruising)', 'Eigenaar: H. de Wit', 'Enting en controle'] },
          { title: 'Fotoalbum (index)', icon: '📷', lines: ['1975 — Bello in de sneeuw', '1988 — Max, onze tweede hond, als pup', '1998 — kerst met Max en de kleinkinderen'] },
        ],
        ask: [
          { q: 'Hoe heette de eerste hond?', answer: ['Bello'], hint: 'Max wordt "onze tweede hond" genoemd.' },
          { q: 'In welk jaar trouwden Henk en Riet?', answer: ['1971'], hint: 'De trouwkaart.' },
        ],
      },
      questions: [
        { q: 'Wat is het wachtwoord van de wallet-app?', answer: ['Bello1971'], hint: 'Naam van de eerste hond, direct gevolgd door het trouwjaar.', explain: 'Bello1971. Max (1988) en 1998 zijn afleiders.' },
        { q: 'Waarom is zo\'n wachtwoord in het algemeen geen goed idee?', options: ['Iedereen die de persoon of zijn sociale media kent, kan het raden', 'Omdat cijfers niet mogen', 'Omdat het te lang is', 'Dat is wel een goed idee'], answer: 0, explain: 'Persoonlijke feiten zijn vaak openbaar of bekend in de kring rond iemand.' },
      ],
    },
    {
      title: 'Taak 4 — De wallet openen',
      content: `
        <p>Voer het wachtwoord in. De app laat zien dat de wallet bij de gevonden herstelzin hoort, en toont het saldo en de
        notities van Henk.</p>
        <p>Waarom kan de app het wachtwoord niet zomaar "terugrekenen"? Een goede wallet bewaart het wachtwoord niet, maar
        leidt er met een bewust trage functie (zoals PBKDF2 of scrypt) een sleutel uit af. Daarmee wordt het versleutelde
        walletbestand geopend. Raden met miljoenen pogingen kost daardoor heel veel tijd; raden met de juiste aanwijzingen
        kost één poging.</p>
      `,
      lab: {
        type: 'crackme',
        title: 'Wallet-app van Henk',
        intro: 'De app vraagt om het wachtwoord om het lokale walletbestand te openen.',
        source: 'function ontgrendel(wachtwoord) {\n  // De app bewaart het wachtwoord niet. Met een trage afleidfunctie maakt hij er een sleutel van\n  // en probeert daarmee het versleutelde walletbestand te openen.\n  const sleutel = scrypt(wachtwoord, walletBestand.salt, { N: 32768, r: 8, p: 1 });\n  return probeerTeOntsleutelen(walletBestand.data, sleutel);\n}',
        check: (pw) => pw === 'Bello1971',
        flag: 'NM{nalatenschap_veilig_geopend}',
        reveal: 'Wallet geopend. Saldo: 0,8 BTC. Notitie van Henk: "Voor de kleinkinderen, eerlijk verdelen. Vraag hulp aan Anja."',
        hint: 'Hoofdletter B, daarna het trouwjaar zonder spatie.',
      },
      questions: [
        { q: 'Welke vlag toont de geopende wallet?', answer: ['NM{nalatenschap_veilig_geopend}'], encoded: true, hint: 'Gebruik het wachtwoord uit taak 3.', explain: 'De wallet is open en de herstelzin is bevestigd.', xp: 25 },
        { q: 'Waarom gebruikt een wallet een bewust trage afleidfunctie (zoals scrypt) voor het wachtwoord?', options: ['Zodat raden met miljoenen pogingen heel lang duurt', 'Zodat de app sneller opstart', 'Omdat snelle functies niet bestaan', 'Om het wachtwoord op te slaan'], answer: 0, explain: 'Elke poging kost bewust veel rekenwerk; voor één juiste poging maakt dat niet uit.' },
      ],
    },
    {
      title: 'Taak 5 — Veilig afronden, en de brief van het "herstelbedrijf"',
      content: `
        <p>In de map zat ook een brief van een bedrijf dat aanbiedt de wallet "binnen 24 uur te herstellen" als je de twaalf
        woorden opstuurt. Lees hem met <code>cat brief_cryptoherstel.txt</code> in het lab van taak 2. Dit is een klassieke
        <strong>herstelzwendel</strong>: wie de zin heeft, heeft het geld. Erfgenamen en slachtoffers van eerdere oplichting zijn
        een geliefd doelwit.</p>
        <h3>Zo rond je het af</h3>
        <ol>
          <li><strong>Leg alles vast</strong>: welke documenten, welke stappen, wie aanwezig was, het saldo en het tijdstip.</li>
          <li><strong>Maak een nieuwe wallet</strong> voor de nalatenschap (met een nieuwe herstelzin) en zet het saldo daarheen,
          met de executeur erbij. De oude zin is immers gezien door meerdere mensen en staat op papier.</li>
          <li><strong>Verdeel volgens de verklaring van erfrecht</strong> of het testament, met hulp van de notaris.</li>
          <li><strong>Vernietig of beveilig</strong> de oude briefjes en kopieën van de zin.</li>
          <li><strong>Meld de oplichtingsbrief</strong> bij de Fraudehelpdesk.</li>
        </ol>
        <div class="callout tip"><strong>Voor je eigen nalatenschap:</strong> leg vast <em>dat</em> je crypto hebt en
        <em>waar</em> de instructies liggen (bijvoorbeeld bij de notaris), zonder de zin zelf in een testament te zetten — een
        testament wordt door meerdere mensen gelezen.</div>
      `,
      questions: [
        { q: 'Wat doe je met het aanbod van wallet-herstel-snel.example?', options: ['Niets opsturen en het melden bij de Fraudehelpdesk', 'De twaalf woorden opsturen, 5% is redelijk', 'Alleen de eerste zes woorden opsturen', 'Het wachtwoord opsturen in plaats van de zin'], answer: 0, explain: 'Ook een deel van de zin delen is gevaarlijk; een betrouwbaar bedrijf vraagt nooit om je herstelzin.' },
        { q: 'Waarom zet je het saldo over naar een nieuwe wallet?', options: ['Omdat de oude herstelzin door meerdere mensen is gezien en op papier staat', 'Omdat oude wallets verlopen', 'Om belasting te ontwijken', 'Dat is niet nodig'], answer: 0, explain: 'Wie de oude zin ooit zag of een kopie heeft, kan het geld anders wegsluizen.' },
        { q: 'Ik begrijp dat ik alleen met een geldige opdracht van de executeur of de erfgenamen naar iemands wallet mag zoeken.', noAnswer: true },
      ],
    },
  ],
});
