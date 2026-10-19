/* Room: Casus — bankhelpdeskfraude (vishing, spoofing & money mules) */

// --- De fictieve geldstroom van de casus (alle partijen/bedragen zijn verzonnen) ---
const CASUS_NODES = [
  { id: 'v', type: 'victim', label: 'Slachtoffer (mevr. De Boer)' },
  { id: 'd', type: 'mule', label: "Katvanger 'Dennis'" },
  { id: 'p', type: 'mule', label: "Katvanger 'Priya'" },
  { id: 'c', type: 'account', label: 'Verzamelrekening (katvanger-ronselaar)' },
  { id: 'co', type: 'cashout', label: 'Cash-out: geldautomaat + crypto' },
];

const CASUS_EDGES = [
  { from: 'v', to: 'd', amount: 8000, time: '20:15', note: '1e overboeking naar de "veilige kluisrekening"' },
  { from: 'v', to: 'p', amount: 7000, time: '20:40', note: '2e overboeking (daglimiet "voor de zekerheid" verhoogd)' },
  { from: 'd', to: 'c', amount: 7600, time: '20:50', note: "Dennis houdt EUR 400 provisie; sluist de rest door" },
  { from: 'p', to: 'c', amount: 6650, time: '21:05', note: "Priya houdt EUR 350 provisie; sluist de rest door" },
  { from: 'c', to: 'co', amount: 14000, time: '21:30', note: 'verzamelrekening houdt EUR 250; rest wordt opgenomen/omgezet (cash-out)' },
];

CS.registerRoom({
  id: 'bank-helpdeskfraude',
  path: 'puzzels',
  order: 6,
  title: 'Casus: bankhelpdeskfraude',
  icon: '☎️',
  difficulty: 'Gemiddeld',
  minutes: 60,
  summary: 'Een telefoontje van "de bank", een vervalst nummer in het schermpje en spaargeld dat binnen een uur weg is via katvangers. Je ontrafelt één samenhangende casus: van de eerste belletje-truc tot de cash-out, en je leert hoe je de zet herkent en stopt.',
  objectives: [
    'Uitleggen wat vishing, (nummer)spoofing en social engineering zijn, met echte NL-context',
    'De overtuigingsprincipes van Cialdini (autoriteit, urgentie, schaarste, vertrouwen) herkennen in een gesprek',
    'De rode vlaggen van een bijbehorend phishing-bericht op afzender, taal en links benoemen',
    'De stappen van de oplichting reconstrueren en de geldstroom via money mules narekenen tot de cash-out',
    'Een kort, bruikbaar waarschuwings-/adviesproduct schrijven (conclusie eerst)',
    'Weten wat je doet (en vooral niet doet) als slachtoffer: bank bellen, melden, aangifte',
  ],
  tasks: [
    {
      title: 'Taak 1 — De casus: een telefoontje van "de bank"',
      content: `
        <p>Het is dinsdagavond kwart over acht. De telefoon van <strong>mevrouw De Boer</strong> rinkelt. In het schermpje
        staat keurig <strong>"NederBank"</strong> — precies de naam die er ook staat als haar echte bank belt. Aan de lijn:
        een rustige, behulpzame "medewerker van de fraudedesk". Er zou een verdachte afschrijving zijn. Of ze even wil
        meewerken om haar spaargeld <em>in veiligheid te brengen</em>. Een uur later is 15.000 euro verdwenen.</p>

        <div class="callout warn"><strong>Alles fictief:</strong> NederBank, mevrouw De Boer en de katvangers "Dennis" en
        "Priya" zijn verzonnen voor deze oefening. De <em>werkwijze</em> is echter heel realistisch — dit type fraude heet
        <strong>bankhelpdeskfraude</strong> en komt in Nederland veel voor.</div>

        <h3>Drie begrippen die je nodig hebt</h3>
        <ul>
          <li><strong>Social engineering</strong> — niet de techniek hacken, maar de <em>mens</em> manipuleren. De oplichter
          kraakt geen rekening; hij praat het slachtoffer zelf naar de overboekknop.</li>
          <li><strong>Vishing</strong> (voice phishing) — phishing via de <strong>telefoon</strong>. Geen mail of sms, maar
          een stem die je stap voor stap meeneemt. Een stem klinkt persoonlijk en betrouwbaar, en je kunt hem niet rustig
          teruglezen zoals een mail.</li>
          <li><strong>(Nummer)spoofing</strong> — het <strong>vervalsen van de beller-ID</strong>. Via internettelefonie is
          het weggeefnummer vrij in te stellen, dus kan er "NederBank" of zelfs het echte 0800-nummer in je scherm staan,
          terwijl de oproep van een oplichter komt. <em>Het nummer in je scherm is geen bewijs.</em></li>
        </ul>

        <figure class="diagram">
          <svg viewBox="0 0 580 90" role="img" aria-label="Keten van het telefoontje tot de cash-out">
            <rect x="6" y="30" width="120" height="34" rx="6" stroke="var(--accent)" fill="none" />
            <text x="66" y="51" fill="currentColor" font-size="13" text-anchor="middle">Spoof-belletje</text>
            <rect x="166" y="30" width="120" height="34" rx="6" stroke="currentColor" fill="none" />
            <text x="226" y="51" fill="currentColor" font-size="13" text-anchor="middle">Overboeking</text>
            <rect x="326" y="30" width="120" height="34" rx="6" stroke="currentColor" fill="none" />
            <text x="386" y="51" fill="currentColor" font-size="13" text-anchor="middle">Money mules</text>
            <rect x="466" y="30" width="108" height="34" rx="6" stroke="var(--bad)" fill="none" />
            <text x="520" y="51" fill="currentColor" font-size="13" text-anchor="middle">Cash-out</text>
            <line x1="126" y1="47" x2="166" y2="47" stroke="currentColor" />
            <line x1="286" y1="47" x2="326" y2="47" stroke="currentColor" />
            <line x1="446" y1="47" x2="466" y2="47" stroke="currentColor" />
          </svg>
          <figcaption>De hele casus in één lijn: een vervalst belletje leidt tot een overboeking, die via katvangers bij de cash-out verdwijnt.</figcaption>
        </figure>

        <p>De belangrijkste les zit in één zin, en die is in Nederland letterlijk een voorlichtingscampagne geweest:</p>

        <div class="callout danger"><strong>Onthoud:</strong> een bank vraagt je <strong>nooit</strong> om je pincode, je
        volledige inlogcode of om geld over te boeken naar een "veilige rekening". Een echte medewerker komt ook nooit je
        pinpas ophalen. Noteer de kernvlag: <code>NM{bank_belt_nooit_om_je_pincode}</code>.</div>
      `,
      questions: [
        { q: 'Phishing via de telefoon, waarbij een "medewerker" je aan de lijn praat, heet:', answer: ['vishing'], hint: 'Voice + phishing.', explain: 'Vishing = voice phishing: de oplichter werkt via een telefoongesprek.' },
        { q: 'In het schermpje staat "NederBank" of zelfs het echte 0800-nummer. Wat is hier aan de hand?', options: ['Dan is het zeker de echte bank', 'Nummerspoofing: de beller-ID is vervalst en zegt dus niets', 'De telefoon is gehackt', 'Dat kan technisch niet'], answer: 1, explain: 'Via spoofing is het weergegeven nummer vrij in te stellen. Het nummer in je scherm is geen bewijs van wie er belt.' },
        { q: 'Bankhelpdeskfraude valt vooral de ... aan.', options: ['firewall van de bank', 'app van de bank', 'mens (het slachtoffer zelf)', 'geldautomaat'], answer: 2, explain: 'Het is social engineering: het slachtoffer wordt zelf naar de overboeking gepraat.' },
        { q: 'Welke kernvlag staat in de rode callout?', answer: ['NM{bank_belt_nooit_om_je_pincode}'], hint: 'Lees de danger-callout onderaan.', explain: 'De kernboodschap en -vlag: NM{bank_belt_nooit_om_je_pincode}.' },
      ],
    },

    {
      title: 'Taak 2 — De knoppen waarop ze drukken: Cialdini',
      content: `
        <p>Waarom trapt iemand hierin? Niet omdat het slachtoffer dom is — maar omdat de oplichter heel gericht op normale,
        menselijke reflexen drukt. Psycholoog <strong>Robert Cialdini</strong> beschreef een paar van die
        <strong>overtuigingsprincipes</strong>. In een vishing-gesprek hoor je ze bijna allemaal langskomen.</p>

        <table>
          <thead><tr><th>Principe</th><th>Wat de "medewerker" zegt</th><th>Waarom het werkt</th></tr></thead>
          <tbody>
            <tr><td><strong>Autoriteit</strong></td><td>"U spreekt met de fraudedesk van NederBank."</td><td>We gehoorzamen gezag en twijfelen niet aan een "officiële" instantie.</td></tr>
            <tr><td><strong>Urgentie</strong></td><td>"Er wordt NU geld afgeschreven, we moeten direct handelen."</td><td>Tijdsdruk schakelt je nadenken uit; je handelt vóór je checkt.</td></tr>
            <tr><td><strong>Schaarste</strong></td><td>"Dit tijdslot om te redden sluit over een paar minuten."</td><td>Iets wat bijna "op" of "voorbij" is, voelt kostbaarder en dwingender.</td></tr>
            <tr><td><strong>Vertrouwen / sympathie</strong></td><td>"Ik help u er samen doorheen, blijft u maar rustig aan de lijn."</td><td>Een vriendelijke, geduldige stem bouwt een band; je wilt de aardige helper niet teleurstellen.</td></tr>
          </tbody>
        </table>

        <div class="callout info"><strong>Nog twee tangen uit de doos.</strong> Vaak komt er <strong>geheimhouding</strong>
        bij ("vertel dit aan niemand, ook niet aan de balie, want we onderzoeken intern een lek") en
        <strong>consistentie</strong> ("u wilt uw geld toch beschermen? Dan is deze stap logisch"). Geheimhouding is
        misschien wel de gevaarlijkste: ze knipt precies de persoon weg die de truc zou doorzien — een kind, een buurvrouw,
        de echte baliemedewerker.</div>

        <div class="callout tip"><strong>Tegengif:</strong> elk van deze knoppen werkt alleen onder druk en in het moment.
        Het tegengif is dus simpel: <strong>ophangen, zelf terugbellen</strong> via een nummer dat je zélf opzoekt (achterop
        je pas of in de app), en het er met iemand over hebben. Wie één minuut rust pakt, prikt het verhaal meestal meteen
        door. Beloning voor dit inzicht: <code>NM{autoriteit_opent_deuren}</code>.</div>

        <h3>Mini-oefening: benoem het principe</h3>
        <p>In het gesprek met mevrouw De Boer vielen deze zinnen. Koppel ze straks in de vragen aan het juiste principe.</p>
        <ul>
          <li>"U spreekt met de officiële fraudedesk." → autoriteit</li>
          <li>"Er loopt op dit moment een afschrijving, we hebben geen tijd te verliezen." → urgentie</li>
          <li>"Zegt u er tegen niemand iets over, ook niet bij de balie." → geheimhouding</li>
        </ul>
      `,
      questions: [
        { q: '"U spreekt met de officiële fraudedesk van de bank." Welk Cialdini-principe is dit?', answer: ['autoriteit'], hint: 'Gezag, een officiële instantie.', explain: 'Autoriteit: we gehoorzamen een bron die gezag uitstraalt en twijfelen minder snel.' },
        { q: '"We moeten NU handelen, anders bent u uw geld kwijt." Dat is vooral een beroep op:', options: ['sympathie', 'urgentie', 'schaarste', 'autoriteit'], answer: 1, explain: 'Urgentie/tijdsdruk zorgt dat je handelt vóór je nadenkt of verifieert.' },
        { q: 'Welk middel gebruikt de oplichter om te voorkomen dat je het bij een ander checkt?', answer: ['geheimhouding', 'geheim houden', 'zwijgen'], hint: '"Vertel dit aan niemand."', explain: 'Geheimhouding knipt de persoon weg die de truc zou doorzien — een grote rode vlag.' },
        { q: 'Wat is het beste tegengif tegen al deze druk-knoppen?', options: ['Snel meewerken zodat het voorbij is', 'Ophangen en zelf terugbellen via een nummer dat je zelf opzoekt', 'Het nummer in je scherm terugbellen', 'Je pincode doorgeven zodat ze het kunnen oplossen'], answer: 1, explain: 'Rust nemen, ophangen en via een eigen, opgezocht kanaal verifiëren breekt de hele truc.' },
        { q: 'Welke beloningsvlag staat in de tip-callout?', answer: ['NM{autoriteit_opent_deuren}'], hint: 'Lees de groene tip-callout.', explain: 'De beloningsvlag is NM{autoriteit_opent_deuren}.' },
      ],
    },

    {
      title: 'Taak 3 — Het bijbehorende phishing-bericht',
      content: `
        <p>Een vishing-aanval komt zelden alleen. Vaak gaat er een <strong>smishing</strong> (phishing-sms) of phishingmail
        aan vooraf of achteraan, om het slachtoffer "warm" te maken of om een nep-inlogpagina te laten invullen. Hieronder
        staat de inbox van mevrouw De Boer rond het telefoontje. <strong>Klik op alles wat verdacht is</strong> — afzender,
        onderwerp, zinsdelen, links — en beoordeel per bericht of het phishing of legitiem is.</p>

        <div class="callout tip"><strong>Waar je op let:</strong> het domein <em>achter</em> de afzendernaam (staat er echt
        <code>nederbank.nl</code>?), de echte bestemming van een link, tijdsdruk en dreiging, een onpersoonlijke aanhef, en
        elk verzoek om codes, pincode of een "veilige rekening".</div>

        <h3>De inbox</h3>
        <p>Let vooral op het domein achter de knoppen en adressen; de naam voor het adres mag namelijk van alles zijn.</p>

        <div class="callout tip"><strong>Beloning:</strong> wie afzender, link en dreiging doorprikt, verdient de vlag <code>NM{herken_de_spoof}</code>.</div>
      `,
      lab: {
        type: 'phishing',
        emails: [
          {
            phishing: true,
            fromName: 'NederBank Alert',
            from: 'melding@nederbank-sms.info',
            to: 'mevr.deboer@voorbeeld.nl',
            subject: 'Nieuw apparaat gekoppeld aan uw rekening — was u dit?',
            date: 'di 14 okt 2026 20:03',
            flags: {
              from: 'Het domein is nederbank-sms.info, niet nederbank.nl. De echte bank mailt niet vanaf zo\'n adres.',
              subject: 'Een onverwachte "waarschuwing" die je wil laten schrikken en snel laten klikken.',
            },
            body: [
              [{ text: 'Geachte klant,', flag: 'Onpersoonlijke aanhef — je bank kent je naam.' }],
              [{ text: 'Er is zojuist een nieuw apparaat gekoppeld aan uw NederBank-rekening. Als u dit niet was, moet u ' }, { text: 'binnen 10 minuten', flag: 'Tijdsdruk om je te laten handelen vóór je nadenkt.' }, { text: ' uw toegang blokkeren.' }],
              [{ text: 'Blokkeer nu mijn rekening', link: 'http://nederbank.nl.beveilig-login.ru/blokkeren', flag: 'De echte bestemming is beveilig-login.ru (een .ru-domein). "nederbank.nl" staat er alleen als subdomein om je te misleiden.' }],
              [{ text: 'Onze fraudedesk belt u mogelijk om u te ', flag: null }, { text: 'helpen; houd uw inlogcodes bij de hand', flag: 'De bank vraagt NOOIT om je codes en kondigt geen "hulp-telefoontje" aan om je op het gesprek voor te bereiden.' }, { text: '.' }],
            ],
          },
          {
            phishing: true,
            fromName: 'NederBank Fraudedesk',
            from: 'fraudedesk@nederbank-verificatie.info',
            to: 'mevr.deboer@voorbeeld.nl',
            subject: 'ACTIE VEREIST: breng uw saldo in veiligheid',
            date: 'di 14 okt 2026 20:35',
            flags: {
              from: 'Weer een nep-domein (nederbank-verificatie.info). Een echte fraudedesk mailt niet vanaf zoiets.',
              subject: 'Hoofdletters, dreiging en haast ("ACTIE VEREIST") zijn klassieke drukmiddelen.',
            },
            body: [
              [{ text: 'Zoals zojuist telefonisch besproken: om uw spaargeld te beschermen dient u het over te maken naar onze ' }, { text: 'veilige kluisrekening', flag: 'Een "veilige kluisrekening" bestaat niet. Dit is altijd een rekening van een money mule.' }, { text: '.' }],
              [{ text: 'Rekeningnummer en instructies vindt u via onderstaande knop. ' }, { text: 'Deel dit met niemand', flag: 'Geheimhouding vragen is een grote rode vlag — zo voorkomt de oplichter dat je het checkt.' }, { text: ', ook niet met uw bankfiliaal.' }],
              [{ text: 'Open de beveiligde instructies', link: 'http://kluis-nederbank.secure-verify.top/overboeken', flag: 'Het echte domein is secure-verify.top, geen nederbank.nl.' }],
            ],
          },
          {
            phishing: false,
            fromName: 'NederBank',
            from: 'noreply@nederbank.nl',
            to: 'mevr.deboer@voorbeeld.nl',
            subject: 'Zo herkent u babbeltrucs — wij bellen nooit om uw pincode',
            date: 'ma 13 okt 2026 10:00',
            body: [
              [{ text: 'Beste klant, oplichters doen zich soms voor als medewerker van de bank. Onthoud: wij vragen u nooit om uw pincode of volledige inlogcode, en wij vragen u nooit geld over te maken naar een andere rekening.' }],
              [{ text: 'U hoeft op deze mail niets te doen en wij vragen u nergens om in te loggen. Twijfelt u over een telefoontje? Hang op en bel ons zelf via het nummer achter op uw pas of via de officiële app.' }],
              [{ text: 'Meer tips vindt u door zelf naar nederbank.nl te gaan en te zoeken op "veilig bankieren".' }],
            ],
          },
        ],
      },
      questions: [
        { q: 'In het eerste bericht: wat is het échte hoofddomein waar de knop "Blokkeer nu mijn rekening" naartoe leidt? (de laatste twee delen vóór het pad)', answer: ['beveilig-login.ru'], hint: 'Lees de hele link. "nederbank.nl" staat er alleen als subdomein; het echte domein zijn de laatste twee delen.', explain: 'Het hoofddomein is beveilig-login.ru. Alles ervoor (nederbank.nl.) is maar een subdomein om je te misleiden.' },
        { q: 'Het tweede bericht vraagt om geld naar een "veilige kluisrekening". Wat is zo\'n rekening in werkelijkheid?', options: ['Een extra spaarrekening van de bank', 'Een rekening van een money mule (katvanger)', 'Een kluis bij de Nederlandsche Bank', 'Een beveiligde crypto-wallet van de bank'], answer: 1, explain: 'Een "veilige kluisrekening" bestaat niet; het is altijd de rekening van een katvanger waar jouw geld verdwijnt.' },
        { q: 'Welk bericht was legitiem?', options: ['Het eerste (nieuw apparaat)', 'Het tweede (actie vereist)', 'Het derde (babbeltrucs-tip van nederbank.nl)', 'Geen van alle'], answer: 2, explain: 'Alleen het derde komt van nederbank.nl, vraagt nergens om in te loggen en kondigt geen actie aan.' },
        { q: 'Je hebt de rode vlaggen doorzien. Noteer de beloningsvlag uit de inbox-opdracht: NM{herken_de_spoof}.', answer: ['NM{herken_de_spoof}'], hint: 'Staat in de vraagtekst hierboven.', explain: 'Wie afzender, link en dreiging doorprikt, verdient NM{herken_de_spoof}.' },
      ],
    },

    {
      title: 'Taak 4 — Reconstrueer de oplichting',
      content: `
        <p>Je hebt het telefoontje, de psychologie en het phishing-bericht gezien. Zet nu de hele oplichting op een rij —
        van het allereerste contact tot de cash-out. Een goede reconstructie helpt de recherche én maakt pijnlijk zichtbaar
        waar het slachtoffer had kunnen uitstappen.</p>

        <div class="callout info"><strong>Zo doe je het:</strong> schuif de stappen in de logische volgorde. Denk vanuit de
        oplichter: eerst voorbereiden en vertrouwen winnen, dan de overboeking afdwingen, en pas daarna het geld
        wegsluizen en opnemen.</div>

        <p>Los de volgorde-puzzel hieronder op. Lukt dat, dan heb je de zaak in kaart.</p>
      `,
      lab: {
        type: 'ordering',
        title: 'Van belletje tot cash-out',
        prompt: 'Zet de zeven stappen van de bankhelpdeskfraude in de juiste volgorde (van eerste contact tot cash-out).',
        flag: 'NM{van_belletje_tot_cashout}',
        explain: 'De oplichter bereidt voor (nummer spoofen), belt met gezag en urgentie, bouwt het "veilige kluisrekening"-verhaal op, laat het slachtoffer overboeken naar katvangers, die sluizen door naar een verzamelrekening, en ten slotte wordt het geld opgenomen/omgezet (cash-out).',
        items: [
          { id: 'a', label: 'Oplichter bereidt de aanval voor en stelt de beller-ID in op "NederBank" (spoofing)' },
          { id: 'b', label: 'De telefoon rinkelt: in het scherm staat "NederBank", het echte nummer wordt nagebootst' },
          { id: 'c', label: '"Medewerker fraudedesk" meldt een verdachte afschrijving en bouwt autoriteit + urgentie op' },
          { id: 'd', label: 'Het slachtoffer moet het spaargeld "in veiligheid brengen" op een veilige kluisrekening' },
          { id: 'e', label: 'Het slachtoffer boekt het geld over naar de rekeningen van katvangers Dennis en Priya' },
          { id: 'f', label: 'De katvangers sluizen het geld meteen door naar een verzamelrekening' },
          { id: 'g', label: 'Het geld wordt opgenomen bij de geldautomaat en omgezet in crypto (cash-out)' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      },
      questions: [
        { q: 'Met welke stap begint de oplichting?', options: ['Met de overboeking', 'Met het voorbereiden en spoofen van het nummer', 'Met de cash-out', 'Met de verzamelrekening'], answer: 1, explain: 'Eerst bereidt de oplichter de aanval voor en stelt hij de beller-ID in; pas daarna rinkelt de telefoon.' },
        { q: 'Vlak voordat de overboeking plaatsvindt, bouwt de oplichter welk verhaal op?', options: ['Dat je een prijs hebt gewonnen', 'Dat je geld "in veiligheid" moet brengen op een veilige kluisrekening', 'Dat je een pakket moet betalen', 'Dat je software moet installeren'], answer: 1, explain: 'Het "veilige kluisrekening"-verhaal is de kern van bankhelpdeskfraude.' },
        { q: 'Los de volgorde-puzzel op. Welke vlag verschijnt bij de juiste reconstructie?', answer: ['NM{van_belletje_tot_cashout}'], hint: 'Zet de zeven stappen goed; bij succes toont het lab de vlag.', explain: 'De juiste tijdlijn beloont je met NM{van_belletje_tot_cashout}.' },
      ],
    },

    {
      title: 'Taak 5 — Follow the money: het geld via de mules',
      content: `
        <p>Zodra het slachtoffer op "overboeken" heeft gedrukt, begint de race. Het geld landt op rekeningen van
        <strong>money mules</strong> (katvangers): mensen die hun bankrekening uitlenen of verkopen, soms uit geldnood, soms
        geronseld met de belofte van "snel verdienen". Zij houden een provisie en sluizen de rest razendsnel door, zodat de
        bank het niet meer kan terughalen en het spoor vertroebelt.</p>

        <div class="callout warn"><strong>Alles fictief:</strong> de bedragen en rekeningen hieronder zijn verzonnen. Je
        oefent de denkwijze "follow the money", je volgt geen echte mensen.</div>

        <h3>Zo lees je het lab</h3>
        <ul>
          <li><strong>Klik een knoop</strong> (bijv. de verzamelrekening) om te zien wat erin en eruit gaat, en het saldo.</li>
          <li><strong>Lees de transactietabel</strong>: elke regel is één overboeking met bedrag, tijd en notitie.</li>
          <li><strong>Reken na.</strong> Komt een knoop van twee kanten geld binnen? Tel op. De "provisie" die een katvanger
          achterhoudt, is het verschil tussen wat binnenkomt en wat weer uitgaat (het saldo van die knoop).</li>
        </ul>

        <p>Volg zo het geld van mevrouw De Boer tot aan het cash-out-punt — de plek waar het contant of in crypto verdwijnt.</p>
      `,
      lab: {
        type: 'flow',
        title: 'Casus De Boer — het geld volgen',
        unit: '€',
        scenario: 'Mevrouw De Boer boekte in twee keer haar spaargeld over. Volg de stroom via de katvangers Dennis en Priya en de verzamelrekening tot de cash-out. Reken de bedragen per knoop na.',
        nodes: CASUS_NODES,
        edges: CASUS_EDGES,
        ask: [
          { q: 'Hoeveel euro boekt mevrouw De Boer in totaal over? (tel beide overboekingen op)', answer: ['15000', '15.000', '€15000', '€15.000'], hint: 'De eerste twee transacties: 8000 + 7000.' },
          { q: 'Hoeveel provisie houdt katvanger "Dennis" voor zichzelf? (het saldo van zijn knoop)', answer: ['400', '€400'], hint: 'Dennis krijgt 8000 binnen en stuurt 7600 door. Het verschil blijft hangen.' },
          { q: 'Hoeveel euro komt er in totaal binnen op de verzamelrekening? (tel beide inkomende stromen op)', answer: ['14250', '14.250', '€14250', '€14.250'], hint: 'Dennis brengt 7600, Priya brengt 6650. Klik de verzamelrekening-knoop voor het totaal.' },
          { q: 'Hoeveel euro wordt uiteindelijk bij het cash-out-punt opgenomen/omgezet?', answer: ['14000', '14.000', '€14000', '€14.000'], hint: 'De laatste transactie: van de verzamelrekening naar de cash-out.' },
        ],
      },
      questions: [
        { q: 'Hoeveel euro boekte mevrouw De Boer in totaal over?', answer: ['15000', '15.000'], hint: 'Tel de twee overboekingen op: 8000 + 7000.', explain: '8000 + 7000 = 15.000 euro ging in twee keer naar de katvangers.' },
        { q: 'Hoeveel euro komt er in totaal binnen op de verzamelrekening?', answer: ['14250', '14.250'], hint: '7600 (van Dennis) + 6650 (van Priya).', explain: '7600 + 6650 = 14.250 euro landt op de verzamelrekening.' },
        { q: 'Hoeveel euro bereikt uiteindelijk het cash-out-punt?', answer: ['14000', '14.000'], hint: 'De verzamelrekening houdt 250 in en sluist de rest door.', explain: 'De verzamelrekening kreeg 14.250 binnen, hield 250 en boekte 14.000 euro door naar de cash-out.' },
        { q: 'Hoe heet iemand die zijn bankrekening uitleent/verkoopt zodat crimineel geld erdoorheen kan stromen?', answer: ['money mule', 'katvanger', 'mule'], hint: 'Nederlands: "katvanger".', explain: 'Een money mule of katvanger leent zijn rekening uit; dat is strafbaar en gedupeerden zijn vaak jongeren.' },
      ],
    },

    {
      title: 'Taak 6 — Schrijf een waarschuwing (conclusie eerst)',
      content: `
        <p>Een onderzoek is pas nuttig als anderen er iets aan hebben. Schrijf daarom een kort
        <strong>waarschuwings-/adviesproduct</strong> waarmee bijvoorbeeld een wijkagent, een bankfiliaal of een
        buurtapp-beheerder morgen mensen kan behoeden. De kunst is de <strong>BLUF</strong>-stijl: <em>Bottom Line Up
        Front</em> — je <strong>conclusie en je advies staan bovenaan</strong>, niet pas aan het eind.</p>

        <div class="callout tip"><strong>Rubric (waar het lab op toetst):</strong> conclusie bovenaan, concrete adviezen met
        een <em>eigenaar</em> (wie moet wat doen), korter dan de brontekst, en onzekerheid apart benoemd. Gebruik
        waarschijnlijkheidstaal ("waarschijnlijk", "zeer waarschijnlijk") in plaats van stellige zekerheden waar je het niet
        zeker weet.</div>

        <p>Hieronder staat de chronologische casus als bron. Herschrijf hem naar een kort product. Er staat een
        voorbeelduitwerking klaar, maar probeer het eerst zelf.</p>
      `,
      lab: {
        type: 'bluf',
        source: 'Op dinsdag 14 oktober om 20.03 ontving mevrouw De Boer een mail van "NederBank Alert" over een nieuw gekoppeld apparaat. Om 20.10 werd zij gebeld; in haar scherm stond "NederBank". De beller noemde zich medewerker van de fraudedesk, meldde een verdachte afschrijving en drong aan op snelheid. Hij vroeg haar het spaargeld "in veiligheid te brengen" op een veilige kluisrekening en benadrukte dat zij hierover met niemand mocht praten. Om 20.15 boekte zij 8.000 euro over en om 20.40, nadat de "medewerker" haar hielp de daglimiet te verhogen, nog eens 7.000 euro, naar twee onbekende rekeningen. Die rekeningen bleken van katvangers; het geld werd binnen een uur doorgesluisd naar een verzamelrekening en vervolgens opgenomen en deels omgezet in crypto. In totaal is 15.000 euro verdwenen; ongeveer 14.000 euro bereikte het cash-out-punt.',
        model: '<p><strong>BLUF:</strong> Mevrouw De Boer is slachtoffer van bankhelpdeskfraude (vishing met nummerspoofing). Zij boekte na een vervalst "bank"-telefoontje 15.000 euro over naar katvangerrekeningen; naar schatting 14.000 euro bereikte de cash-out. Directe actie is nodig om schade te beperken en herhaling bij anderen te voorkomen.</p><p><strong>Adviezen (met eigenaar):</strong></p><ul><li><em>Slachtoffer:</em> bel direct de echte bank (nummer achter op de pas) om de overboekingen te laten blokkeren/terughalen; doe aangifte bij de politie en meld bij de Fraudehelpdesk.</li><li><em>Bank:</em> onderzoek en bevries de ontvangende rekeningen; waarschuw via de eigen kanalen dat zij nooit om pincode/codes vraagt.</li><li><em>Wijkagent/buurtbeheerder:</em> deel een korte waarschuwing: "de bank belt nooit om je pincode of om geld naar een veilige rekening te boeken — hang op en bel zelf terug."</li></ul><p><strong>Onzekerheid:</strong> het exact teruggehaalde bedrag is nog onbekend; de identiteit achter de cash-out is waarschijnlijk (nog) niet vastgesteld.</p>',
      },
      questions: [
        { q: 'Wat betekent BLUF in een adviesproduct?', answer: ['bottom line up front', 'conclusie eerst', 'conclusie bovenaan'], hint: 'Bottom Line Up Front.', explain: 'BLUF = Bottom Line Up Front: je zet je conclusie en advies bovenaan, niet pas aan het eind.' },
        { q: 'Welk element hoort volgens de rubric bij elk advies te staan?', options: ['Een datum', 'Een eigenaar (wie moet het doen)', 'Een paginanummer', 'Een handtekening'], answer: 1, explain: 'Een bruikbaar advies benoemt wie het moet uitvoeren — de eigenaar.' },
        { q: 'Ik heb mijn eigen waarschuwing geschreven en tegen de rubric getoetst.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 7 — Preventie & wat te doen als slachtoffer',
      content: `
        <p>De beste verdediging is simpel, maar vergt dat je hem kent vóórdat je gebeld wordt. Onthoud de reflex:
        <strong>ophangen, zelf terugbellen, erover praten</strong>.</p>

        <h3>Preventie — zo trap je er niet in</h3>
        <ul>
          <li>De bank vraagt <strong>nooit</strong> om je pincode, volledige inlogcode, of om geld over te maken naar een
          "veilige rekening". Komt zo'n verzoek: het is per definitie oplichting.</li>
          <li>Het <strong>nummer in je scherm is geen bewijs</strong> (spoofing). Vertrouw er niet op, ook niet als het het
          echte 0800-nummer lijkt.</li>
          <li>Voelt het dringend of geheim? Dat is juist het alarm. <strong>Hang op</strong> en bel de bank terug via het
          nummer achter op je pas of in de officiële app — nooit via de gegevens uit het gesprek of bericht.</li>
          <li>Laat je niet opjagen en overleg gerust met een familielid of de balie. Een echte bank vindt dat prima.</li>
          <li>Leen of verkoop <strong>nooit</strong> je bankrekening of pas. Een money mule/katvanger zijn is strafbaar — ook
          als je "alleen maar" je rekening uitleende.</li>
        </ul>

        <h3>Al slachtoffer? Doe dit meteen (snelheid beperkt de schade)</h3>
        <ol>
          <li><strong>Bel direct je bank</strong> (nummer achter op je pas) en laat de overboeking blokkeren/terughalen en je
          rekening beveiligen. Hoe sneller, hoe groter de kans dat geld nog tegengehouden wordt.</li>
          <li><strong>Doe aangifte bij de politie</strong> via politie.nl of 0900-8844; bij direct gevaar 112.</li>
          <li><strong>Meld het bij de Fraudehelpdesk</strong> (0800-nummer, kosteloos). Melden helpt anderen: trends en
          nummers worden gedeeld en slachtoffers krijgen advies.</li>
          <li><strong>Bewaar bewijs:</strong> het telefoonnummer, de tijdstippen, screenshots van berichten en de
          overboekingen. Dat helpt bank en politie enorm.</li>
          <li><strong>Wees mild voor jezelf.</strong> Deze oplichters zijn professioneel en spelen op paniek. Schaamte houdt
          mensen tegen om te melden — en juist melden beperkt de schade voor jou en anderen.</li>
        </ol>

        <div class="callout info"><strong>Melden = helpen.</strong> Noteer de laatste vlag als je weet waar een slachtoffer
        in Nederland terechtkan: <code>NM{melden_bij_fraudehelpdesk}</code>.</div>

        <div class="callout warn"><strong>Let op de nummers:</strong> een echte bank en de Fraudehelpdesk gebruiken
        <strong>gratis 0800-nummers</strong>. Een <strong>0900-nummer</strong> (betaald) in een "bank"-bericht is juist
        verdacht. Zoek officiële nummers altijd zélf op, typ ze niet over uit het bericht.</div>
      `,
      questions: [
        { q: 'Je wordt gebeld door "de bank" die vraagt geld naar een veilige rekening te boeken. Wat doe je?', options: ['Snel overboeken zodat je geld veilig is', 'Je pincode doorgeven zodat zij het regelen', 'Ophangen en zelf de bank terugbellen via het nummer achter op je pas', 'Het nummer uit het scherm terugbellen'], answer: 2, explain: 'Ophangen en via een eigen, opgezocht kanaal verifiëren. De bank vraagt dit nooit.' },
        { q: 'Je hebt zojuist geld overgemaakt na zo\'n telefoontje. Wat is de eerste stap?', answer: ['bank bellen', 'direct de bank bellen', 'de bank bellen'], hint: 'Zorg dat de overboeking nog geblokkeerd/teruggehaald kan worden.', explain: 'Bel meteen je echte bank (nummer achter op je pas) om te blokkeren; daarna aangifte en melden.' },
        { q: 'Bij welke instantie meld je dit type fraude (naast je bank en de politie)?', answer: ['fraudehelpdesk', 'de fraudehelpdesk'], hint: 'Een landelijk meldpunt met een gratis 0800-nummer.', explain: 'De Fraudehelpdesk is het landelijke meldpunt; melden helpt ook anderen.' },
        { q: 'Welk soort telefoonnummer in een "bank"-bericht is juist verdacht?', options: ['Een gratis 0800-nummer', 'Een betaald 0900-nummer', 'Het alarmnummer 112', 'Een mobiel 06-nummer van een familielid'], answer: 1, explain: 'Echte banken en de Fraudehelpdesk gebruiken gratis 0800-nummers; een 0900-nummer is een rode vlag.' },
        { q: 'Welke vlag staat in de laatste info-callout?', answer: ['NM{melden_bij_fraudehelpdesk}'], hint: 'Lees de info-callout over melden.', explain: 'De afsluitende vlag is NM{melden_bij_fraudehelpdesk}.' },
      ],
    },
  ],
  terms: [
    { term: 'Bankhelpdeskfraude', def: 'Oplichting waarbij iemand zich voordoet als bankmedewerker (vaak telefonisch) en je overhaalt geld over te maken of codes te geven.' },
    { term: 'Vishing', def: 'Voice phishing: phishing via de telefoon, waarbij een "medewerker" je live manipuleert.' },
    { term: 'Spoofing (nummerspoofing)', def: 'Het vervalsen van de beller-ID, zodat er een vertrouwde naam of het echte nummer in je scherm staat terwijl een oplichter belt.' },
    { term: 'Smishing', def: 'Phishing via sms, vaak als opwarmer of bevestiging rond een vishing-telefoontje.' },
    { term: 'Social engineering', def: 'Mensen manipuleren om iets te doen (klikken, betalen, codes geven) in plaats van techniek te hacken.' },
    { term: 'Overtuigingsprincipes (Cialdini)', def: 'Vaste psychologische hefbomen zoals autoriteit, urgentie, schaarste en vertrouwen waarmee een oplichter je overhaalt.' },
    { term: 'Veilige kluisrekening', def: 'Een verzonnen "veilige rekening" waar je je geld heen zou moeten boeken; in werkelijkheid altijd de rekening van een katvanger.' },
    { term: 'Money mule / katvanger', def: 'Iemand die zijn bankrekening uitleent of verkoopt zodat crimineel geld erdoorheen stroomt; strafbaar.' },
    { term: 'Daglimiet', def: 'De maximale som die je per dag kunt overboeken; oplichters laten het slachtoffer dit verhogen om meer te kunnen wegsluizen.' },
    { term: 'Cash-out', def: 'Het moment waarop het gestolen geld contant wordt opgenomen of omgezet (bijv. in crypto) en het spoor eindigt.' },
    { term: 'Fraudehelpdesk', def: 'Het landelijke Nederlandse meldpunt voor fraude en oplichting; melden helpt slachtoffers en waarschuwt anderen.' },
    { term: 'BLUF', def: 'Bottom Line Up Front: een schrijfstijl waarbij de conclusie en het advies bovenaan staan.' },
  ],
  resources: [
    { title: 'Fraudehelpdesk — melden en advies bij oplichting', url: 'https://www.fraudehelpdesk.nl/' },
    { title: 'Politie — aangifte doen van fraude', url: 'https://www.politie.nl/' },
    { title: 'Veilig internetten — babbeltrucs en phishing herkennen', url: 'https://veiliginternetten.nl/' },
    { title: 'Betaalvereniging Nederland — veilig bankieren', url: 'https://www.betaalvereniging.nl/' },
  ],
});
