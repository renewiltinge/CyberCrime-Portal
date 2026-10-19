/* Room: Intelligence — money-mule-ronseling (geldezels: ronselen, gebruik, gevolgen) */

// =======================================================================
//  Alles FICTIEF: verzonnen scenario's. Deze room leert geldezel-ronseling
//  herkennen, weigeren en melden — én de juridische gevolgen. Geen
//  aanmoediging; juist een waarschuwing.
// =======================================================================

// --- Scenario: word je geronseld? herken en weiger ---
const MM_SCEN = [
  {
    situation: 'Op social media: "Verdien € 300 door simpelweg geld via jouw bankrekening te laten lopen. 100% veilig!" Wat doe je?',
    choices: [
      { label: 'Weigeren en melden — dit is geldezel-ronseling en strafbaar', good: true, feedback: 'Precies: "geld via je rekening laten lopen" tegen een vergoeding is witwassen. Nooit doen, wél melden.' },
      { label: 'Doen, het is makkelijk en snel geld', good: false, feedback: 'Dit is ronseling voor witwassen. Je bent medeplichtig, met zware gevolgen — geen "makkelijk geld".' },
      { label: 'Eén keertje kan geen kwaad', good: false, feedback: 'Ook één keer is strafbaar en wordt vastgelegd; banken en politie herkennen het patroon.' },
    ],
  },
  {
    situation: '"Het is toch niet mijn geld, dus ik doe niets strafbaars." Klopt dat?',
    choices: [
      { label: 'Nee: je rekening lenen voor crimineel geld is witwassen (art. 420bis Sr), ook als je verder "niets deed"', good: true, feedback: 'Correct: het ter beschikking stellen van je rekening voor misdaadgeld is zelf een misdrijf.' },
      { label: 'Ja, je bent onschuldig want je deed niets', good: false, feedback: 'De wet ziet het doorsluizen van crimineel geld als witwassen — ook als jij "alleen je rekening leende".' },
      { label: 'Alleen de opdrachtgever is strafbaar', good: false, feedback: 'De geldezel is zelf óók strafbaar; onwetendheid of "ik kreeg maar weinig" is geen vrijbrief.' },
    ],
  },
  {
    situation: 'Welke gevolgen heeft meedoen als geldezel?',
    choices: [
      { label: 'Strafblad, je bankrekening(en) geblokkeerd, moeilijk nog ergens bankieren, en terugbetalingsplicht', good: true, feedback: 'Precies: de gevolgen reiken jaren vooruit — van geen bankrekening tot problemen met studie, werk en reizen.' },
      { label: 'Geen enkel gevolg, het is anoniem', good: false, feedback: 'Niets is anoniem: je rekening staat op jouw naam. De gevolgen zijn fors en langdurig.' },
      { label: 'Alleen een waarschuwing', good: false, feedback: 'Het is een misdrijf, geen waarschuwing; een strafblad en een bankverbod zijn reële gevolgen.' },
    ],
  },
  {
    situation: 'Een "vriend" vraagt of hij "even je rekening mag gebruiken" voor een overboeking.',
    choices: [
      { label: 'Weigeren — leen nooit je rekening, pas, pincode of DigiD uit', good: true, feedback: 'Goed: je rekening uitlenen maakt je een geldezel, ook voor een vriend. Houd het strikt privé.' },
      { label: 'Lenen, het is tenslotte een vriend', good: false, feedback: 'Vriendschap is juist de ronsel-haak. Jouw naam, jouw verantwoordelijkheid — niet doen.' },
      { label: 'Lenen maar alleen voor een klein bedrag', good: false, feedback: 'Elk bedrag maakt je medeplichtig. Leen je rekening nooit uit.' },
    ],
  },
  {
    situation: 'Je beseft dat je al benaderd (of geronseld) bent. Wat doe je?',
    choices: [
      { label: 'Stoppen, de berichten bewaren en melden bij je bank en de politie', good: true, feedback: 'Precies: direct stoppen en melden beperkt de schade en je aansprakelijkheid; bewaar het bewijs.' },
      { label: 'Negeren en hopen dat het overwaait', good: false, feedback: 'Doorgaan of wegkijken maakt het erger. Stoppen en melden is de enige goede route.' },
      { label: 'De berichten verwijderen om geen sporen te hebben', good: false, feedback: 'Juist bewaren: het bewijs helpt jou en de opsporing. Verwijderen werkt tegen je.' },
    ],
  },
];

// --- Flow: de rol van de geldezel in de keten ---
const MM_NODES = [
  { id: 'v', type: 'victim', label: 'Slachtoffer (fraude)' },
  { id: 'mule', type: 'mule', label: 'Geronselde geldezel' },
  { id: 'org', type: 'account', label: 'Organisatie (verzamelrekening)' },
  { id: 'cash', type: 'cashout', label: 'Cash-out' },
];
const MM_EDGES = [
  { from: 'v', to: 'mule', amount: 5000, time: 'dag 1', note: 'buit van fraude komt binnen op de rekening van de geldezel' },
  { from: 'mule', to: 'org', amount: 4700, time: 'dag 1', note: 'geldezel houdt € 300 "vergoeding" en sluist door' },
  { from: 'org', to: 'cash', amount: 4500, time: 'dag 2', note: 'organisatie houdt € 200; cash-out' },
];

CS.registerRoom({
  id: 'money-mule-ronseling',
  path: 'intelligence',
  order: 12,
  title: 'Money-mule-ronseling: de geldezel',
  icon: '🐴',
  difficulty: 'Gemiddeld',
  minutes: 45,
  summary: 'Elke witwasketen heeft geldezels nodig: mensen die hun rekening uitlenen om crimineel geld door te sluizen. Ze worden geronseld met "makkelijk geld" — vaak jongeren. Je leert hoe ronseling werkt (crime script), hoe je het herkent en weigert (simulatie), welke rol de geldezel in de geldstroom speelt, en — cruciaal — dat een geldezel zélf strafbaar is, met jarenlange gevolgen.',
  objectives: [
    'Uitleggen wat een money mule (geldezel) is en waarom criminelen ze nodig hebben',
    'Ronseltactieken herkennen (nep-bijbaan, "makkelijk geld", vriendendienst)',
    'Weten dat een geldezel zélf strafbaar is (witwassen, art. 420bis Sr) met zware gevolgen',
    'De rol van de geldezel in de geldstroom volgen',
    'Weten hoe te weigeren, stoppen en melden',
  ],
  terms: [
    { term: 'Money mule / geldezel', def: 'Iemand die zijn bankrekening (of pas/identiteit) ter beschikking stelt om crimineel geld door te sluizen, meestal tegen een vergoeding.' },
    { term: 'Ronselen', def: 'Werven van geldezels, vaak via social media, nep-vacatures, gaming-chats of vriendenkringen, met de belofte van snel geld.' },
    { term: 'Witwassen (art. 420bis Sr)', def: 'Crimineel geld een legale schijn geven; je rekening lenen voor misdaadgeld valt hieronder — de geldezel is zelf strafbaar.' },
    { term: 'Katvanger', def: 'Een ander woord voor iemand die zijn rekening/identiteit uitleent voor criminele doeleinden.' },
    { term: 'Doorsluizen', def: 'Geld snel verder sturen (layering) zodat de herkomst vervaagt; de kernrol van een geldezel.' },
    { term: 'Gevolgen', def: 'Strafblad, geblokkeerde rekeningen, geen bankrekening meer kunnen krijgen, terugbetalingsplicht — jarenlang.' },
    { term: 'Grooming/ronselhaak', def: 'De psychologische haak (vriendschap, status, geld, druk) waarmee ronselaars vooral jongeren binnenhalen.' },
    { term: 'Melden', def: 'Stoppen, bewijs bewaren en melden bij je bank en de politie beperkt schade én je aansprakelijkheid.' },
  ],
  resources: [
    { title: 'Politie — geldezels (money mules)', url: 'https://www.politie.nl/informatie/geldezel.html' },
    { title: 'Fraudehelpdesk — geldezel worden', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'Europol — Money Mule-campagne (#DontBeAMule)', url: 'https://www.europol.europa.eu/' },
    { title: 'Wijzer in geldzaken — veilig bankieren', url: 'https://www.wijzeringeldzaken.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is een geldezel?',
      content: `
        <p>Criminelen willen hun buit niet op hun eigen rekening. Daarom hebben ze <strong>geldezels</strong> (money mules)
        nodig: mensen die hun bankrekening uitlenen om crimineel geld te ontvangen en snel <strong>door te sluizen</strong>.
        Ze worden <strong>geronseld</strong> met de belofte van "makkelijk geld" — via social media, nep-vacatures,
        gaming-chats of vriendenkringen. Vooral jongeren zijn een doelwit.</p>
        <p>De grote misvatting: <em>"het is toch niet mijn geld, dus ik doe niets fout."</em> Mis. Je rekening lenen voor
        crimineel geld is <strong>witwassen</strong> (art. 420bis Sr) — de geldezel is <strong>zelf strafbaar</strong>. De
        gevolgen zijn fors en langdurig: een strafblad, geblokkeerde rekeningen, nergens meer kunnen bankieren en soms een
        terugbetalingsplicht.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de scenario's zijn verzonnen. Deze room waarschuwt en leert
        herkennen — het is nadrukkelijk geen aanmoediging.</div>
        <div class="callout tip"><strong>Beloning:</strong> je rekening lenen = witwassen. Vlag: <code>NM{geen_makkelijk_geld}</code>.</div>
      `,
      questions: [
        { q: 'Wat is een geldezel (money mule)?', options: ['Iemand die zijn rekening uitleent om crimineel geld door te sluizen', 'Een medewerker van de bank', 'Een type malware', 'Een cryptomunt'], answer: 0, explain: 'De geldezel ontvangt en sluist crimineel geld door — een cruciale schakel in witwassen.' },
        { q: 'Klopt het dat een geldezel "niets strafbaars" doet?', options: ['Nee — je rekening lenen voor crimineel geld is witwassen (art. 420bis Sr)', 'Ja, want het is niet zijn geld', 'Ja, zolang hij weinig krijgt', 'Alleen de opdrachtgever is strafbaar'], answer: 0, explain: 'De geldezel is zelf strafbaar; onwetendheid of een kleine vergoeding is geen vrijbrief.' },
        { q: 'Hoe worden geldezels vooral geronseld?', options: ['Via social media, nep-vacatures en vriendenkringen met de belofte van snel geld', 'Via de belastingdienst', 'Via de bank zelf', 'Dat gebeurt niet'], answer: 0, explain: 'Ronselaars gebruiken "makkelijk geld" en sociale druk, vooral richting jongeren.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{geen_makkelijk_geld}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{geen_makkelijk_geld}.' },
      ],
    },
    {
      title: 'Taak 2 — Het ronsel- en gebruiksscript',
      content: `
        <p>Ronselen en inzetten van geldezels verloopt volgens een <strong>crime script</strong>. Ontleed het per fase: wie
        doet wat, met welke middelen, waar, onder welke randvoorwaarden en welke sporen het nalaat — plus een
        <strong>interventie</strong> per fase (bijv. voorlichting, bankdetectie). Met "Toon een voorbeelduitwerking"
        vergelijk je achteraf.</p>
        <div class="callout tip"><strong>Beloning:</strong> elke fase is te onderbreken. Vlag: <code>NM{ronsel_script_ontleed}</code>.</div>
      `,
      lab: {
        type: 'crimescript',
        title: 'geldezel-ronseling en -gebruik',
        scenario: 'Een netwerk ronselt jongeren als geldezel, laat fraudegeld binnenkomen op hun rekening en sluist het snel door naar een verzamelrekening en cash-out.',
        phases: ['1 · Voorbereiding (doelgroep & kanaal)', '2 · Benaderen (de ronselhaak)', '3 · Werven (rekening/pas regelen)', '4 · Gebruik (geld doorsluizen)', '5 · Afschermen (sporen/afstand)', '6 · Cash-out & witwassen'],
        model: '<ul><li><strong>Voorbereiding:</strong> doelgroep (jongeren, geldnood) en kanaal (Snapchat/Telegram, nep-vacature). Interventie: voorlichting op scholen, advertenties weren.</li><li><strong>Benaderen:</strong> "verdien snel geld, 100% veilig". Interventie: herkennen en melden; #DontBeAMule-campagnes.</li><li><strong>Werven:</strong> rekening/pas/DigiD vragen. Interventie: nooit uitlenen; banken detecteren nieuwe/ongebruikelijke rekeningopeningen.</li><li><strong>Gebruik:</strong> fraudegeld binnen, snel doorsluizen. Interventie: transactiemonitoring (plotse in- en uitstroom).</li><li><strong>Afschermen:</strong> ronselaar houdt afstand, mule draagt risico. Interventie: de keten omhoog volgen vanaf de mule.</li><li><strong>Cash-out:</strong> verzamelen, contant/crypto. Interventie: cash-out-knelpunten en KYC.</li></ul>',
      },
      questions: [
        { q: 'Wat is de "ronselhaak" in de benaderingsfase?', options: ['De psychologische haak (snel geld, vriendschap, status) om iemand binnen te halen', 'Een technische exploit', 'Een bankpas', 'Een virus'], answer: 0, explain: 'Ronselaars spelen in op geldnood, vriendschap of status — vooral bij jongeren.' },
        { q: 'Welke bankmaatregel past bij de "gebruik"-fase (doorsluizen)?', options: ['Transactiemonitoring die plotse in- en uitstroom op een rekening detecteert', 'Een langer wachtwoord', 'Een snellere app', 'Niets'], answer: 0, explain: 'Een rekening die opeens geld ontvangt en meteen doorsluist, is een klassiek mule-patroon.' },
        { q: 'Waarom houdt de ronselaar "afstand" in de afschermingsfase?', options: ['De geldezel draagt het zichtbare risico; de ronselaar blijft buiten beeld', 'Omdat hij het geld niet wil', 'Omdat het verplicht is', 'Dat doet hij niet'], answer: 0, explain: 'De mule staat met naam op de rekening en draagt het risico; daarom volg je de keten omhoog vanaf de mule.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{ronsel_script_ontleed}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{ronsel_script_ontleed}.' },
      ],
    },
    {
      title: 'Taak 3 — Herkennen, weigeren, melden',
      content: `
        <p>Nu jij. Loop door vijf situaties waarin je geronseld wordt of ermee in aanraking komt, en kies telkens de juiste
        reactie. Vier van de vijf goed = je trapt er niet in en weet wat te doen.</p>
        <div class="callout tip"><strong>Beloning:</strong> weigeren en melden. Vlag: <code>NM{weiger_en_meld}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'word je geronseld?',
        scenario: 'Vijf situaties rond geldezel-ronseling. Kies verstandig.',
        steps: MM_SCEN,
        pass: 4,
        flag: 'NM{weiger_en_meld}',
      },
      questions: [
        { q: 'Iemand biedt je geld om "geld via je rekening te laten lopen". Wat doe je?', options: ['Weigeren en melden — dit is strafbare ronseling', 'Doen voor het snelle geld', 'Eén keertje meedoen', 'Onderhandelen over meer'], answer: 0, explain: 'Dit is witwassen; weigeren en melden is de enige goede route.' },
        { q: 'Mag je je rekening "even lenen" aan een vriend voor een overboeking?', options: ['Nee — leen nooit je rekening, pas, pincode of DigiD uit', 'Ja, voor een vriend', 'Ja, voor een klein bedrag', 'Alleen eenmalig'], answer: 0, explain: 'Je rekening uitlenen maakt je een geldezel, ook voor een vriend.' },
        { q: 'Je bent al benaderd/geronseld. Wat nu?', options: ['Stoppen, de berichten bewaren en melden bij bank en politie', 'Negeren en hopen dat het overwaait', 'De berichten verwijderen', 'Gewoon doorgaan'], answer: 0, explain: 'Stoppen en melden beperkt de schade en je aansprakelijkheid; bewaar het bewijs.' },
        { q: 'Welke vlag hoort bij een goede afhandeling?', answer: ['NM{weiger_en_meld}'], hint: 'Verschijnt bij ≥4/5 goed / staat in de tip-callout.', explain: 'De vlag is NM{weiger_en_meld}.' },
      ],
    },
    {
      title: 'Taak 4 — De rol in de geldstroom',
      content: `
        <p>Zie tot slot waar de geldezel precies zit: tussen het slachtoffer en de cash-out, als bufferende schakel die de
        herkomst versluiert. Volg de stroom en zie hoe weinig de geldezel overhoudt — tegenover hoeveel risico hij draagt.</p>
        <div class="callout tip"><strong>Beloning:</strong> veel risico, weinig buit. Vlag: <code>NM{veel_risico_weinig_buit}</code>.</div>
      `,
      lab: {
        type: 'flow',
        title: 'de geldezel in de keten',
        unit: '€',
        scenario: 'Fraudegeld loopt via de rekening van de geldezel naar een verzamelrekening en cash-out.',
        nodes: MM_NODES,
        edges: MM_EDGES,
        ask: [
          { q: 'Hoeveel "vergoeding" houdt de geldezel over? (alleen het getal)', answer: ['300'], hint: 'Vergelijk wat binnenkomt en wat de geldezel doorsluist.' },
          { q: 'Hoeveel bereikt uiteindelijk de cash-out?', answer: ['4500', '4.500'], hint: 'De laatste transactie.' },
        ],
      },
      questions: [
        { q: 'Hoeveel houdt de geldezel over van € 5.000 die binnenkwam?', answer: ['300', '€ 300', '€300'], hint: 'Binnen 5000, doorgesluisd 4700.', explain: 'De geldezel houdt € 300 "vergoeding" — een schijntje tegenover het risico van een strafblad.' },
        { q: 'Waarom is de geldezel zo belangrijk voor de criminelen?', options: ['Hij vormt een buffer die de herkomst versluiert en het risico draagt', 'Hij levert de malware', 'Hij maakt de phishingmail', 'Hij is de bank'], answer: 0, explain: 'De mule zet afstand tussen de buit en de organisatie en draagt het zichtbare risico.' },
        { q: 'Wat is de verhouding risico/opbrengst voor de geldezel?', options: ['Veel risico (strafblad, bankverbod) voor een kleine vergoeding', 'Weinig risico, veel geld', 'Geen risico', 'Alleen risico voor de bank'], answer: 0, explain: 'Een paar honderd euro tegenover jarenlange, zware gevolgen — een extreem slechte deal.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{veel_risico_weinig_buit}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{veel_risico_weinig_buit}.' },
      ],
    },
  ],
});
