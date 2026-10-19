/* Room: Security-kern — vishing & deepfake-stemmen (voice-fraude) */

// =======================================================================
//  Alles FICTIEF: verzonnen scenario's. Je oefent het herkennen van en
//  reageren op spraak-social-engineering; er wordt niets echt aangevallen.
// =======================================================================

// --- Connections: de vier social-engineering-kanalen ---
const VD_GROUPS = [
  { name: 'Phishing (e-mail)', items: ['Nep-inlogmail van "de bank"', 'Link naar een lookalike-site', 'Bijlage met een macro', 'Spoofed afzenderadres'] },
  { name: 'Vishing (telefoon)', items: ['"Bankhelpdesk" belt je', 'Deepfake-stem van de directeur', 'Spoofed beller-ID', 'Druk om nú te handelen'] },
  { name: 'Smishing (sms)', items: ['"Pakket kon niet bezorgd worden"', 'Korte link (bit.ly)', 'Nep-bezorgkosten betalen', 'Afzender is een 06-nummer'] },
  { name: 'Quishing (QR-code)', items: ['QR-sticker over de echte geplakt', 'Op een parkeer- of laadpaal', 'QR leidt naar een nep-betaalpagina', 'QR in een e-mail i.p.v. een link'] },
];

// --- Ordering: het script van een vishing-call ---
const VD_STEPS = [
  { id: '1', label: 'Aanvaller verzamelt info (OSINT/datalek) en kloont desnoods een stem uit publieke audio (deepfake)' },
  { id: '2', label: 'Belt met een spoofed beller-ID die op de bank of de directeur lijkt' },
  { id: '3', label: 'Bouwt vertrouwen op (kent je gegevens) en creëert urgentie' },
  { id: '4', label: 'Vraagt een handeling: een code doorgeven, een betaling of remote toegang' },
  { id: '5', label: 'Het slachtoffer handelt onder druk' },
  { id: '6', label: 'Geld of toegang wordt direct misbruikt' },
];

// --- Scenario: herkennen en weerstaan ---
const VD_SCEN = [
  {
    situation: 'Je "CEO" belt — de stem klinkt precies zoals je hem kent — en vraagt met spoed een vertrouwelijke betaling. Wat doe je?',
    choices: [
      { label: 'Verifieer via een onafhankelijk, bekend kanaal: hang op en bel terug op zijn vaste nummer', good: true, feedback: 'Precies: een bekende stem is geen bewijs meer. Een onafhankelijke callback ontmaskert een deepfake.' },
      { label: 'De stem klinkt echt, dus gewoon uitvoeren', good: false, feedback: 'AI kan een stem klonen uit enkele seconden publieke audio. "Het klonk echt" is geen verificatie.' },
      { label: 'Gevoelige details via de telefoon bevestigen', good: false, feedback: 'Je geeft informatie weg aan mogelijk de aanvaller. Stap uit het gesprek en verifieer apart.' },
    ],
  },
  {
    situation: 'Hoe betrouwbaar is "ik herkende zijn stem" nog als bewijs?',
    choices: [
      { label: 'Niet: moderne AI kloont stemmen uit korte publieke audio; een bekende stem bewijst niets', good: true, feedback: 'Juist: stem-deepfakes zijn realistisch en goedkoop. Verifieer altijd via een ander kanaal.' },
      { label: 'Volledig betrouwbaar — een stem is uniek en onnamaakbaar', good: false, feedback: 'Dat was ooit zo; met AI-stemkloning niet meer. Vertrouw niet op stemherkenning alleen.' },
      { label: 'Alleen betrouwbaar bij vaste telefoons', good: false, feedback: 'Het apparaat doet er niet toe; de stem zelf kan nagemaakt zijn.' },
    ],
  },
  {
    situation: 'De "bank" belt: "Uw rekening is gehackt, geef de sms-code door zodat wij hem kunnen beveiligen."',
    choices: [
      { label: 'Ophangen en zelf de bank bellen; de bank vraagt nooit om je code', good: true, feedback: 'Correct: geen enkele bank vraagt je code of pin. Zelf terugbellen doorbreekt de fraude.' },
      { label: 'De code doorgeven om snel te zijn', good: false, feedback: 'De code is precies wat de aanvaller nodig heeft om jouw rekening over te nemen. Nooit doen.' },
      { label: 'De code alleen doorgeven als ze je naam al weten', good: false, feedback: 'Je gegevens kennen ze uit een datalek; dat maakt het niet echt. Geef nooit codes door.' },
    ],
  },
  {
    situation: 'Welke afspraak beschermt je bedrijf het best tegen deepfake-CEO-fraude?',
    choices: [
      { label: 'Een afgesproken codewoord en/of verplichte callback-verificatie voor betaalopdrachten', good: true, feedback: 'Goed: een proces dat niet op stem of mail leunt, maar op een onafhankelijke verificatie.' },
      { label: 'Vertrouwen op stemherkenning door ervaren medewerkers', good: false, feedback: 'Mensen horen het verschil niet betrouwbaar; bouw niet op gehoor maar op proces.' },
      { label: 'Alleen \'s nachts geen betalingen doen', good: false, feedback: 'Fraude gebeurt ook overdag. Je hebt een verificatieproces nodig, geen tijdslot.' },
    ],
  },
  {
    situation: 'Op een laadpaal zit een QR-sticker die naar een "betaalpagina" leidt. Wat doe je?',
    choices: [
      { label: 'Niet scannen; betaal via de officiële app of de op de paal gedrukte URL', good: true, feedback: 'Precies: quishing plakt een valse QR over de echte. Gebruik de officiële, geverifieerde route.' },
      { label: 'Scannen en betalen, dat is het makkelijkst', good: false, feedback: 'De QR kan naar een nep-betaalpagina leiden die je gegevens steelt. Niet scannen.' },
      { label: 'Scannen om "even te kijken" waar hij heen gaat', good: false, feedback: 'Ook alleen openen kan je naar een kwaadaardige pagina leiden. Vermijd onbekende QR\'s.' },
    ],
  },
];

CS.registerRoom({
  id: 'vishing-deepfake',
  path: 'security-kern',
  order: 10,
  title: 'Vishing & deepfake-stemmen',
  icon: '📞',
  difficulty: 'Gemiddeld',
  minutes: 45,
  summary: 'Social engineering verplaatst zich naar je oor. Je leert vishing (fraude via de telefoon) en de nieuwe dreiging van AI-stemkloning (deepfake-stemmen) herkennen, onderscheidt de kanalen (phishing, vishing, smishing, quishing), ontleedt het script van een vishing-call en oefent de juiste reacties. De kernregel blijft: een stem is geen bewijs — verifieer via een onafhankelijk kanaal.',
  objectives: [
    'Vishing en de vier social-engineering-kanalen herkennen en onderscheiden',
    'Begrijpen dat een bekende stem door AI-kloning geen bewijs meer is',
    'Het script van een vishing-call op volgorde zetten',
    'De juiste reacties kiezen onder druk (ophangen, zelf terugbellen)',
    'Organisatorische afspraken benoemen tegen deepfake-CEO-fraude (codewoord, callback)',
  ],
  terms: [
    { term: 'Vishing', def: 'Voice phishing: fraude via een telefoongesprek, waarbij de beller zich voordoet als bank, overheid of collega.' },
    { term: 'Deepfake-stem', def: 'Een met AI gekloonde stem, gemaakt uit korte publieke audio, die klinkt als een echt persoon.' },
    { term: 'Smishing', def: 'Phishing via sms (bijv. een nep-pakketbericht met een korte link).' },
    { term: 'Quishing', def: 'Phishing via een QR-code, bijvoorbeeld een valse sticker over een echte op een betaalautomaat.' },
    { term: 'Spoofed beller-ID', def: 'Een vervalst telefoonnummer in het display, zodat een oproep van de bank of je baas lijkt te komen.' },
    { term: 'Callback-verificatie', def: 'Een verzoek bevestigen door zelf terug te bellen op een vooraf bekend nummer — niet op een nummer uit het gesprek.' },
    { term: 'Codewoord', def: 'Een vooraf afgesproken woord om bij gevoelige verzoeken te verifiëren dat je met de echte persoon spreekt.' },
    { term: 'Zero trust (voice)', def: 'Vertrouw geen stem of nummer op zichzelf; verifieer altijd onafhankelijk voordat je handelt.' },
  ],
  resources: [
    { title: 'Fraudehelpdesk — telefoonfraude en spoofing', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'NCSC — social engineering', url: 'https://www.ncsc.nl/' },
    { title: 'FBI — deepfakes en vishing (IC3)', url: 'https://www.ic3.gov/' },
    { title: 'Politie — fraude en oplichting', url: 'https://www.politie.nl/informatie/fraude.html' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De stem is geen bewijs meer',
      content: `
        <p>Fraude verplaatst zich naar je oor. Bij <strong>vishing</strong> (voice phishing) belt een "bankmedewerker",
        "politieagent" of "collega" en bewerkt je met autoriteit en urgentie. Nieuw en verraderlijk is de
        <strong>deepfake-stem</strong>: met AI klonen fraudeurs een stem uit <em>enkele seconden</em> publieke audio (een
        interview, een voicemail, een video). De stem van je CEO klinkt dan precies echt — en toch is het nep.</p>
        <p>Daarom geldt één harde regel: <strong>een stem (of een nummer) is geen bewijs</strong>. Verifieer elk gevoelig
        verzoek via een <strong>onafhankelijk, bekend kanaal</strong>: hang op en bel zelf terug op een nummer dat je al had.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de scenario's zijn verzonnen oefenmateriaal.</div>
        <div class="callout tip"><strong>Beloning:</strong> vertrouw geen stem, verifieer het kanaal. Vlag: <code>NM{stem_is_geen_bewijs}</code>.</div>
      `,
      questions: [
        { q: 'Wat is vishing?', options: ['Fraude via een telefoongesprek (voice phishing)', 'Phishing via e-mail', 'Een virus', 'Een firewall-techniek'], answer: 0, explain: 'Vishing is social engineering via de telefoon; de beller doet zich voor als een vertrouwde partij.' },
        { q: 'Hoe maakt AI een deepfake-stem geloofwaardig?', options: ['Door een stem te klonen uit korte publieke audio', 'Door het telefoonnummer te hacken', 'Door de microfoon te besturen', 'Dat kan niet'], answer: 0, explain: 'Enkele seconden audio volstaan vaak al om een overtuigende stemkloon te maken.' },
        { q: 'Wat is de kernregel tegen voice-fraude?', options: ['Een stem/nummer is geen bewijs — verifieer via een onafhankelijk, bekend kanaal', 'Herken de stem goed genoeg', 'Vraag of ze echt de bank zijn', 'Betaal snel om van het gesprek af te zijn'], answer: 0, explain: 'Alleen een onafhankelijke callback (of codewoord) is betrouwbare verificatie.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{stem_is_geen_bewijs}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{stem_is_geen_bewijs}.' },
      ],
    },
    {
      title: 'Taak 2 — De vier kanalen',
      content: `
        <p>Dezelfde trucs reizen over verschillende kanalen. Groepeer de zestien signalen in de vier kanalen:
        <strong>phishing</strong> (e-mail), <strong>vishing</strong> (telefoon), <strong>smishing</strong> (sms) en
        <strong>quishing</strong> (QR-code).</p>
        <div class="callout tip"><strong>Beloning:</strong> vier kanalen, één doel. Vlag: <code>NM{vier_kanalen}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'signaal → kanaal',
        prompt: 'Vind de vier groepen van vier: phishing, vishing, smishing en quishing.',
        groups: VD_GROUPS,
      },
      questions: [
        { q: 'Wat is smishing?', options: ['Phishing via sms', 'Phishing via telefoon', 'Phishing via QR', 'Phishing via e-mail'], answer: 0, explain: 'Smishing = SMS-phishing, bijvoorbeeld een nep-pakketbericht met een korte link.' },
        { q: 'Wat is quishing?', options: ['Phishing via een QR-code (bijv. een valse sticker over de echte)', 'Phishing via spraak', 'Een sterke vorm van encryptie', 'Een type firewall'], answer: 0, explain: 'Bij quishing leidt een kwaadaardige QR naar een nep-pagina; vaak op betaalautomaten geplakt.' },
        { q: 'Wat hebben alle vier de kanalen gemeen?', options: ['Ze manipuleren de mens met autoriteit en urgentie, niet de techniek', 'Ze gebruiken allemaal malware', 'Ze werken alleen \'s nachts', 'Ze zijn onschuldig'], answer: 0, explain: 'Het kanaal verschilt, de social-engineering-hefbomen zijn steeds dezelfde.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{vier_kanalen}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{vier_kanalen}.' },
      ],
    },
    {
      title: 'Taak 3 — Het script van een vishing-call',
      content: `
        <p>Een vishing-gesprek volgt een vast script. Zet de stappen op volgorde — van voorbereiding tot misbruik. Als je het
        script kent, hoor je de fraude al aankomen.</p>
        <div class="callout tip"><strong>Beloning:</strong> hoor het script aankomen. Vlag: <code>NM{hoor_het_script}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de vishing-call',
        prompt: 'Zet de zes stappen op volgorde, van voorbereiding tot misbruik.',
        items: VD_STEPS,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{hoor_het_script}',
        explain: 'Info verzamelen/stem klonen → spoofed bellen → vertrouwen + urgentie → handeling vragen → slachtoffer handelt → misbruik.',
      },
      questions: [
        { q: 'Wat gebeurt er in de voorbereiding?', options: ['Info verzamelen en eventueel een stem klonen om geloofwaardig te zijn', 'Het geld opnemen', 'De sms-code vragen', 'Niets'], answer: 0, explain: 'Met jouw gegevens (en soms een stemkloon) klinkt de beller overtuigend.' },
        { q: 'Op welk moment kun je de call het best breken?', options: ['Zodra er om een code/betaling/remote toegang wordt gevraagd: ophangen en zelf verifiëren', 'Nadat je betaald hebt', 'Nooit', 'Alleen aan het begin'], answer: 0, explain: 'De "vraag om een handeling" is het kantelpunt; daar stop je en verifieer je onafhankelijk.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{hoor_het_script}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{hoor_het_script}.' },
      ],
    },
    {
      title: 'Taak 4 — Herkennen en weerstaan',
      content: `
        <p>Nu de praktijk. Loop door vijf beslismomenten rond vishing en deepfake-stemmen en kies telkens de verstandigste
        reactie. Vier van de vijf goed = je houdt het hoofd koel.</p>
        <div class="callout tip"><strong>Beloning:</strong> ophangen en zelf terugbellen. Vlag: <code>NM{hang_op_verifieer}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'voice-fraude — jouw reacties',
        scenario: 'Vijf beslismomenten rond vishing, deepfake en QR. Kies verstandig.',
        steps: VD_SCEN,
        pass: 4,
        flag: 'NM{hang_op_verifieer}',
      },
      questions: [
        { q: 'Je "CEO" belt met een bekende stem en vraagt een spoedbetaling. Beste reactie?', options: ['Ophangen en terugbellen op zijn bekende nummer', 'Uitvoeren, de stem klinkt echt', 'Gevoelige details telefonisch bevestigen', 'Meteen betalen'], answer: 0, explain: 'Een bekende stem kan gekloond zijn; een onafhankelijke callback is de verificatie.' },
        { q: 'Welke afspraak beschermt het bedrijf het best tegen deepfake-CEO-fraude?', options: ['Een codewoord en/of verplichte callback-verificatie voor betaalopdrachten', 'Vertrouwen op stemherkenning', '\'s Nachts geen betalingen', 'Een langer wachtwoord'], answer: 0, explain: 'Een proces dat niet op stem/mail leunt maar op onafhankelijke verificatie houdt stand.' },
        { q: 'Een QR-sticker op een laadpaal leidt naar een "betaalpagina". Wat doe je?', options: ['Niet scannen; via de officiële app of gedrukte URL betalen', 'Scannen en betalen', 'Scannen om te kijken', 'Je pin invoeren'], answer: 0, explain: 'Quishing plakt een valse QR over de echte; gebruik alleen de officiële route.' },
        { q: 'Welke vlag hoort bij een goede afhandeling?', answer: ['NM{hang_op_verifieer}'], hint: 'Verschijnt bij ≥4/5 goed / staat in de tip-callout.', explain: 'De vlag is NM{hang_op_verifieer}.' },
      ],
    },
  ],
});
