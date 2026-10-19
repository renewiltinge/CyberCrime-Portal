/* Room: Defensief — ransomware: incident response & onderhandeling (simulatie) */

// =======================================================================
//  Alles FICTIEF: een verzonnen ransomware-incident bij een verzonnen
//  organisatie. Je oefent besluitvorming; er wordt niets echt aangevallen.
// =======================================================================

// --- Scenario: besluitvorming tijdens het incident ---
const RR_STEPS = [
  {
    situation: 'Maandagochtend: bestanden zijn versleuteld met de extensie .kryptlock en overal staat een losgeldbrief. Wat doe je als éérste?',
    choices: [
      { label: 'Besmette systemen isoleren van het netwerk (van het net halen, maar aan laten staan)', good: true, feedback: 'Precies: isoleren stopt de verspreiding, en aan laten staan behoudt vluchtig bewijs (geheugen, verbindingen) voor forensie.' },
      { label: 'Alles direct helemaal uitzetten', good: false, feedback: 'Uitzetten wist het geheugen en lopende verbindingen — waardevol forensisch bewijs gaat verloren. Isoleren is beter.' },
      { label: 'Meteen het losgeld betalen om tijd te winnen', good: false, feedback: 'Veel te vroeg: je kent de scope niet, betalen geeft geen garantie en financiert de daders.' },
    ],
  },
  {
    situation: 'Het incidentteam komt bijeen. Wat check je met prioriteit?',
    choices: [
      { label: 'Of er schone, offline/immutable back-ups zijn en of de aanvaller nog binnen is', good: true, feedback: 'Goed: back-ups bepalen of je zónder betalen kunt herstellen, en je wilt weten of de aanvaller nog actief is.' },
      { label: 'Niets — back-ups zijn vast ook versleuteld, dus zinloos', good: false, feedback: 'Aanname zonder controle. Juist offline/immutable back-ups overleven ransomware vaak; eerst kijken.' },
      { label: 'Meteen alles terugzetten zonder te kijken of de aanvaller weg is', good: false, feedback: 'Dan herbesmet je je herstelde omgeving. Eerst eradicatie (aanvaller eruit), dan recovery.' },
    ],
  },
  {
    situation: 'De directie vraagt: "Moeten we gewoon betalen zodat dit weggaat?"',
    choices: [
      { label: 'Adviseer tegen snel betalen: geen garantie, financiert misdaad, mogelijk sanctierecht; onderzoek eerst herstel uit back-up', good: true, feedback: 'Juist. Betalen is een laatste redmiddel met grote haken en ogen; herstel uit back-up is bijna altijd beter.' },
      { label: 'Zeg: "Betaal, dan zijn we er vanaf"', good: false, feedback: 'Betalen garandeert niets (soms werkt de decryptor niet), maakt je een doelwit, en kan juridisch problematisch zijn.' },
      { label: 'Negeer de directie en beslis zelf in stilte', good: false, feedback: 'Zo\'n beslissing is van de directie, mét jouw advies. Communicatie is onderdeel van goede IR.' },
    ],
  },
  {
    situation: 'De aanvaller opent een chat: 24 uur deadline, en dreigt gestolen data te lekken (dubbele afpersing). Hoe reageer je?',
    choices: [
      { label: 'Kalm blijven, tijd winnen, en juristen, cyberverzekeraar en politie betrekken; geen toezeggingen doen', good: true, feedback: 'Precies: onderhandelen is een vak. Win tijd, doe geen beloftes, en laat professionals meekijken.' },
      { label: 'Scheld de aanvaller uit en zeg dat je nooit betaalt', good: false, feedback: 'Emotie weggeven schaadt je positie en kan de aanvaller provoceren tot sneller lekken. Blijf zakelijk.' },
      { label: 'Beloof meteen te betalen om de deadline te halen', good: false, feedback: 'Deadlines zijn een drukmiddel; vaak rekbaar. Een overhaaste belofte geeft je onderhandelingspositie weg.' },
    ],
  },
  {
    situation: 'Er zijn persoonsgegevens gestolen. Moet je het incident melden?',
    choices: [
      { label: 'Ja: datalek melden bij de Autoriteit Persoonsgegevens (binnen 72 uur) en aangifte doen bij de politie', good: true, feedback: 'Correct: een datalek meld je binnen 72 uur bij de AP, en aangifte helpt opsporing en is vaak nodig voor de verzekering.' },
      { label: 'Nee, stilhouden om de reputatie te beschermen', good: false, feedback: 'Verzwijgen is bij een datalek wettelijk niet toegestaan en schaadt de reputatie juist méér als het uitkomt.' },
      { label: 'Alleen intern vastleggen, verder niets', good: false, feedback: 'Onvoldoende: de meldplicht bij de AP en aangifte bij de politie horen erbij.' },
    ],
  },
  {
    situation: 'Het ergste is voorbij en je herstelt. Wat voorkomt herhaling het best?',
    choices: [
      { label: 'Root cause dichten (patch/credentials), MFA, offline back-ups, EDR en de lessons learned verwerken', good: true, feedback: 'Precies: zonder de oorzaak te dichten en te verharden ben je zo weer terug bij af.' },
      { label: 'Hetzelfde systeem exact terugzetten zoals het was', good: false, feedback: 'Dan herstel je ook het gat waardoor ze binnenkwamen. Fix de root cause en verhard.' },
      { label: 'Niets — het was gewoon pech', good: false, feedback: 'Ransomware is zelden pech; een gemiste patch of gelekt wachtwoord is meestal de oorzaak. Leer ervan.' },
    ],
  },
];

// --- Ordering: de NIST-incidentresponsfasen ---
const RR_PHASES = [
  { id: '1', label: 'Detectie & analyse — bevestig de ransomware en bepaal de scope' },
  { id: '2', label: 'Containment — isoleer de besmette systemen van het netwerk' },
  { id: '3', label: 'Melding — meld het datalek bij de AP en doe aangifte bij de politie' },
  { id: '4', label: 'Eradicatie — verwijder de malware en de aanvaller, dicht de root cause' },
  { id: '5', label: 'Recovery — herstel vanuit schone, offline back-ups' },
  { id: '6', label: 'Post-incident — evalueer en verwerk de lessons learned' },
];

CS.registerRoom({
  id: 'ransomware-respons',
  path: 'defensief',
  order: 7,
  title: 'Ransomware: incident & onderhandeling',
  icon: '🔒',
  difficulty: 'Gemiddeld',
  minutes: 55,
  summary: 'Een ransomware-aanval is een beslissingenstorm onder druk. In deze simulatie neem je stap voor stap de juiste beslissingen — van isoleren en back-ups tot de omgang met een afpersende aanvaller (dubbele afpersing) — en zet je de NIST-incidentresponsfasen op volgorde. Je leert waarom betalen een laatste redmiddel is en wat herhaling voorkomt.',
  objectives: [
    'De juiste eerste reactie op ransomware bepalen (isoleren, niet uitzetten)',
    'De afweging rond losgeld betalen onderbouwen (geen garantie, financiert misdaad, sancties)',
    'Verstandig omgaan met een afpersende aanvaller bij dubbele afpersing',
    'De meldplicht (AP, 72 uur) en aangifte kennen',
    'De NIST-incidentresponsfasen op volgorde zetten en herhaling voorkomen',
  ],
  terms: [
    { term: 'Ransomware', def: 'Malware die bestanden versleutelt (en vaak data steelt) en losgeld eist voor de sleutel of om niet te lekken.' },
    { term: 'Dubbele afpersing', def: 'Niet alleen versleutelen, maar ook data stelen en dreigen die te lekken — zodat een back-up alleen niet genoeg is.' },
    { term: 'Containment', def: 'Het incident indammen: besmette systemen isoleren zodat de schade niet verder verspreidt.' },
    { term: 'Eradicatie', def: 'De aanvaller en de malware volledig verwijderen en de oorzaak (root cause) dichten.' },
    { term: 'Recovery', def: 'Herstellen vanuit schone back-ups, pas nadat de aanvaller eruit is.' },
    { term: 'Immutable back-up', def: 'Een back-up die niet gewijzigd of gewist kan worden; overleeft ransomware en afpersing.' },
    { term: 'NIST IR-cyclus', def: 'Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-incident Activity.' },
    { term: 'Meldplicht datalek', def: 'Een datalek met risico voor personen meld je binnen 72 uur bij de Autoriteit Persoonsgegevens (AVG).' },
  ],
  resources: [
    { title: 'NCSC — ransomware en incidentrespons', url: 'https://www.ncsc.nl/' },
    { title: 'No More Ransom — decryptors en hulp', url: 'https://www.nomoreransom.org/' },
    { title: 'Autoriteit Persoonsgegevens — datalek melden', url: 'https://www.autoriteitpersoonsgegevens.nl/' },
    { title: 'NIST SP 800-61 — Computer Security Incident Handling', url: 'https://csrc.nist.gov/pubs/sp/800/61/r2/final' },
  ],
  tasks: [
    {
      title: 'Taak 1 — De storm begrijpen',
      content: `
        <p>Ransomware is zelden alleen een technisch probleem — het is een <strong>beslissingenstorm onder druk</strong>.
        Moderne aanvallers doen aan <strong>dubbele afpersing</strong>: ze versleutelen je bestanden én stelen data, zodat
        "we hebben toch back-ups" niet meer genoeg is: ze dreigen die data te lekken.</p>
        <p>De verleiding om snel te betalen is groot, maar betalen is een <strong>laatste redmiddel</strong>: er is geen
        garantie dat je je data terugkrijgt, je financiert de misdaad (en maakt jezelf een doelwit), en betalen aan sommige
        groepen kan zelfs onder <strong>sanctierecht</strong> vallen. Goede incidentrespons volgt een plan — de
        <strong>NIST-cyclus</strong> — in plaats van paniek.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> het incident, de organisatie en de aanvaller zijn verzonnen
        oefenmateriaal. De ransomware-extensie <code>.kryptlock</code> is een verzonnen familienaam.</div>
        <div class="callout tip"><strong>Beloning:</strong> een plan verslaat paniek. Vlag: <code>NM{plan_verslaat_paniek}</code>.</div>
      `,
      questions: [
        { q: 'Wat is dubbele afpersing?', options: ['Data versleutelen én stelen, en dreigen die te lekken', 'Twee keer hetzelfde losgeld eisen', 'Twee slachtoffers tegelijk', 'Betalen in twee termijnen'], answer: 0, explain: 'Door ook te stelen en te dreigen met lekken, helpt een back-up alleen niet meer — dat is dubbele afpersing.' },
        { q: 'Waarom is losgeld betalen een laatste redmiddel?', options: ['Geen garantie op herstel, je financiert misdaad, en soms geldt sanctierecht', 'Omdat het te duur is om over te maken', 'Omdat het altijd illegaal is', 'Omdat de aanvaller het niet aanneemt'], answer: 0, explain: 'Betalen lost zelden netjes op en heeft grote nadelen; herstel uit back-up heeft de voorkeur.' },
        { q: 'Wat kenmerkt goede incidentrespons?', options: ['Een plan volgen (NIST-cyclus) in plaats van paniekbeslissingen', 'Zo snel mogelijk betalen', 'Alles direct uitzetten', 'Het incident stilhouden'], answer: 0, explain: 'Een vooraf geoefend plan zorgt voor rust en de juiste volgorde onder druk.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{plan_verslaat_paniek}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{plan_verslaat_paniek}.' },
      ],
    },
    {
      title: 'Taak 2 — De simulatie: neem de beslissingen',
      content: `
        <p>Nu jij. Je bent de dienstdoende responder. Loop door de zes beslismomenten van het incident en kies telkens de
        beste optie. Je krijgt bij elke keuze meteen feedback; aan het eind zie je je score. Haal je minstens vijf van de zes
        goed, dan heb je het incident sterk afgehandeld.</p>
        <div class="callout tip"><strong>Beloning:</strong> handel het incident sterk af. Vlag: <code>NM{koel_hoofd_onder_druk}</code>.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'ransomware-incident bij "Zuidkust Logistiek"',
        scenario: 'Zes beslismomenten, van de eerste ontdekking tot herstel. Kies verstandig onder druk.',
        steps: RR_STEPS,
        pass: 5,
        flag: 'NM{koel_hoofd_onder_druk}',
      },
      questions: [
        { q: 'Wat is de juiste allereerste reactie?', options: ['Besmette systemen isoleren van het netwerk, maar aan laten staan', 'Alles uitzetten', 'Meteen betalen', 'Niets doen'], answer: 0, explain: 'Isoleren stopt verspreiding; aan laten staan behoudt vluchtig bewijs voor forensie.' },
        { q: 'Hoe ga je om met de 24-uursdeadline en dreiging om te lekken?', options: ['Kalm blijven, tijd winnen en juristen/verzekeraar/politie betrekken; geen toezeggingen', 'De aanvaller uitschelden', 'Direct betalen', 'De deadline negeren en niets doen'], answer: 0, explain: 'Deadlines zijn drukmiddel; blijf zakelijk, win tijd en laat professionals meekijken.' },
        { q: 'Waarom eerst eradicatie en dan pas recovery?', options: ['Anders herbesmet je je herstelde omgeving omdat de aanvaller er nog is', 'Omdat recovery duurder is', 'Omdat het zo in de wet staat', 'Dat maakt niet uit'], answer: 0, explain: 'Herstellen terwijl de aanvaller nog binnen is, brengt je meteen terug bij af.' },
        { q: 'Welke vlag hoort bij een sterke afhandeling?', answer: ['NM{koel_hoofd_onder_druk}'], hint: 'Verschijnt bij ≥5/6 goed / staat in de tip-callout.', explain: 'De vlag is NM{koel_hoofd_onder_druk}.' },
      ],
    },
    {
      title: 'Taak 3 — De fasen op volgorde',
      content: `
        <p>Goede incidentrespons volgt een vaste volgorde. Zet de fasen op de juiste plek, van het bevestigen van het incident
        tot de evaluatie achteraf. Onthoud: eerst indammen, dan de aanvaller eruit, dán pas herstellen.</p>
        <div class="callout tip"><strong>Beloning:</strong> containment vóór recovery. Vlag: <code>NM{fasen_op_orde}</code>.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'de incidentresponsfasen',
        prompt: 'Zet de zes fasen op volgorde, van detectie tot evaluatie.',
        items: RR_PHASES,
        correct: ['1', '2', '3', '4', '5', '6'],
        flag: 'NM{fasen_op_orde}',
        explain: 'Detectie & analyse → containment → melding → eradicatie → recovery → post-incident.',
      },
      questions: [
        { q: 'Welke fase komt direct na detectie & analyse?', options: ['Containment (isoleren)', 'Recovery (herstellen)', 'Post-incident', 'Betalen'], answer: 0, explain: 'Eerst indammen zodat de schade niet verder verspreidt, vóór je gaat opruimen of herstellen.' },
        { q: 'Waarom staat recovery ná eradicatie?', options: ['Je wilt de aanvaller en de root cause eerst weg hebben, anders herbesmet je', 'Recovery is sneller', 'Dat is willekeurig', 'Omdat back-ups traag zijn'], answer: 0, explain: 'Herstellen in een nog besmette omgeving is zinloos; eerst eradicatie.' },
        { q: 'Wat is het doel van de post-incidentfase?', options: ['Evalueren en lessons learned verwerken om herhaling te voorkomen', 'Het losgeld betalen', 'De logs wissen', 'Niets, het incident is voorbij'], answer: 0, explain: 'Leren van het incident (wat ging goed/fout) maakt de organisatie de volgende keer weerbaarder.' },
        { q: 'Welke vlag hoort bij de juiste volgorde?', answer: ['NM{fasen_op_orde}'], hint: 'Verschijnt bij de juiste volgorde / staat in de tip-callout.', explain: 'De vlag is NM{fasen_op_orde}.' },
      ],
    },
    {
      title: 'Taak 4 — Voorkomen is beter',
      content: `
        <p>De beste incidentrespons is de aanval die niet lukt. De grootste winst zit in een paar maatregelen:</p>
        <ul>
          <li><strong>Offline/immutable back-ups</strong> die je regelmatig test op herstel — je redmiddel tegen versleuteling.</li>
          <li><strong>MFA</strong> overal, en snel <strong>patchen</strong> van internet-facing systemen — dicht de twee
          meestgebruikte voordeuren.</li>
          <li><strong>EDR/monitoring</strong> om beaconing en laterale beweging vroeg te zien (zie de detectie-rooms).</li>
          <li>Een <strong>geoefend IR-plan</strong> met rollen, contactpersonen (juristen, verzekeraar, NCSC, politie) en
          een communicatielijn.</li>
          <li><strong>Segmentatie</strong> en least privilege, zodat één besmette werkplek niet het hele netwerk meeneemt.</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> geteste back-ups zijn je redmiddel. Vlag: <code>NM{teste_back_ups_redden}</code>.</div>
      `,
      questions: [
        { q: 'Wat is de belangrijkste maatregel tegen versleuteling door ransomware?', options: ['Offline/immutable back-ups die je regelmatig test op herstel', 'Een sterker antivirus-icoon', 'Vaker het wachtwoord wijzigen', 'Een snellere internetverbinding'], answer: 0, explain: 'Met een schone, geteste back-up kun je herstellen zonder te betalen — mits ook de dubbele-afpersing-kant is afgedekt.' },
        { q: 'Welke twee maatregelen dichten de meestgebruikte voordeuren?', options: ['MFA overal en snel patchen van internet-facing systemen', 'Een langer wachtwoord en een screensaver', 'Meer schijfruimte en RAM', 'Een nieuwe router'], answer: 0, explain: 'Gestolen/zwakke credentials en ongepatchte systemen zijn de klassieke toegangswegen; MFA en patchen sluiten ze.' },
        { q: 'Waarom helpt netwerksegmentatie?', options: ['Eén besmette werkplek neemt dan niet het hele netwerk mee', 'Het versnelt de back-up', 'Het voorkomt phishing', 'Het is wettelijk verplicht'], answer: 0, explain: 'Segmentatie en least privilege beperken laterale beweging en dus de schade van een besmetting.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{teste_back_ups_redden}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{teste_back_ups_redden}.' },
      ],
    },
  ],
});
