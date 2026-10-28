/* Room: Bewijs in de rechtszaal — digitaal bewijs wegen en eerlijk rapporteren */

// =======================================================================
//  Alles in deze room is FICTIEF, behalve de genoemde historische zaken
//  (Sally Clark, Lucia de Berk), die als les dienen over het misbruik van kansen.
// =======================================================================

CS.registerRoom({
  id: 'bewijs-in-de-rechtszaal',
  path: 'meesterproeven',
  order: 5,
  title: 'Bewijs in de rechtszaal: digitaal bewijs wegen en rapporteren',
  icon: '⚖️',
  difficulty: 'Moeilijk',
  minutes: 95,
  summary: 'Een spoor is pas bewijs als je eerlijk zegt wat het wél en níet bewijst. Leer de drie niveaus van vraagstellingen (bron, activiteit, delict), herken de prosecutor\'s fallacy die tot gerechtelijke dwalingen leidde, druk bewijskracht uit met een likelihood ratio, bouw een forensisch rapport op, en bescherm je oordeel tegen contextuele bias.',
  objectives: [
    'Het verschil uitleggen tussen bron-, activiteits- en delictsniveau, en waarom digitaal bewijs vaak alleen het bronniveau dekt',
    'De prosecutor\'s fallacy en de defense fallacy herkennen en met Bayes laten zien waarom ze fout zijn',
    'De bewijskracht van een spoor uitdrukken als likelihood ratio, met een verbale schaal',
    'De opbouw van een controleerbaar forensisch rapport beschrijven',
    'Contextuele bias herkennen en maatregelen noemen zoals blinde verificatie en linear sequential unmasking',
  ],
  terms: [
    { term: 'Hiërarchie van vraagstellingen', def: 'Indeling van forensische vragen in drie niveaus: bron (van wie of wat komt het spoor?), activiteit (wat is er gebeurd?) en delict (heeft de verdachte het strafbare feit gepleegd?). Over het delictsniveau beslist de rechter.' },
    { term: 'Hp en Hd', def: 'De twee hypothesen die een deskundige vergelijkt: die van de vervolging (prosecution) en die van de verdediging (defence).' },
    { term: 'Prosecutor\'s fallacy', def: 'De denkfout waarbij P(bewijs | onschuld) wordt aangezien voor P(onschuld | bewijs): "de kans dat dit toeval is, is 1 op 1.000, dus is hij voor 99,9% schuldig".' },
    { term: 'Defense fallacy', def: 'De omgekeerde denkfout: "in een stad met 5.000 mogelijke daders past het spoor op 5 mensen, dus is het bewijs vrijwel waardeloos". Het bewijs verkleint de groep wel degelijk enorm.' },
    { term: 'Likelihood ratio (LR)', def: 'P(E | Hp) / P(E | Hd). Hoeveel keer waarschijnlijker het bewijs is onder de ene hypothese dan onder de andere. De deskundige rapporteert de LR; de rechter weegt de prior.' },
    { term: 'Contextuele bias', def: 'Het effect dat informatie die voor de analyse niet relevant is (bijv. "de verdachte heeft al bekend") het oordeel van een deskundige beïnvloedt.' },
    { term: 'Linear sequential unmasking', def: 'Werkwijze waarbij een onderzoeker eerst het spoor zelf analyseert en pas daarna, stap voor stap, het vergelijkingsmateriaal en de context te zien krijgt.' },
    { term: 'Trojan horse defense', def: 'Het verweer dat malware, en niet de verdachte, de bestanden of handelingen op een computer veroorzaakte. Een zorgvuldig onderzoek toetst die alternatieve hypothese actief.' },
  ],
  resources: [
    { title: 'Nederlands Forensisch Instituut (NFI)', url: 'https://www.forensischinstituut.nl/' },
    { title: 'Nederlands Register Gerechtelijk Deskundigen (NRGD)', url: 'https://www.nrgd.nl/' },
    { title: 'Wikipedia — Prosecutor\'s fallacy', url: 'https://en.wikipedia.org/wiki/Prosecutor%27s_fallacy' },
    { title: 'Wikipedia — Lucia de Berk', url: 'https://nl.wikipedia.org/wiki/Lucia_de_Berk' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat bewijst een spoor eigenlijk?',
      content: `
        <p>Een fictieve zaak: bij een gemeente komt een dreigmail binnen. Het IP-adres in de headers hoort bij de
        internetaansluiting van meneer <strong>P.</strong> Een ervaren rechercheur zegt: "Dan heeft P. die mail gestuurd."
        Klopt dat?</p>
        <h3>Drie niveaus</h3>
        <p>Forensisch onderzoekers (Cook en collega's, 1998) onderscheiden drie niveaus van vraagstellingen:</p>
        <table>
          <thead><tr><th>Niveau</th><th>Vraag</th><th>In deze zaak</th></tr></thead>
          <tbody>
            <tr><td><strong>Bron</strong></td><td>Van welke bron komt het spoor?</td><td>Kwam de mail via de aansluiting van P.?</td></tr>
            <tr><td><strong>Activiteit</strong></td><td>Welke handeling heeft het spoor veroorzaakt?</td><td>Heeft iemand op die aansluiting de mail getypt en verstuurd?</td></tr>
            <tr><td><strong>Delict</strong></td><td>Heeft de verdachte het strafbare feit gepleegd?</td><td>Heeft P. zelf de dreiging geuit?</td></tr>
          </tbody>
        </table>
        <p>Het IP-adres zegt iets op <strong>bronniveau</strong>. Tussen "deze aansluiting" en "deze persoon" zitten
        huisgenoten, gasten op de wifi, een gehackte router, een VPN-dienst of malware. Over het delictsniveau beslist niet
        de deskundige, maar de rechter.</p>
        <div class="callout warn"><strong>Een IP-adres is geen persoon.</strong> Een goede deskundige schrijft dus niet "P.
        verstuurde de mail", maar bijvoorbeeld: "De mail is verstuurd via de internetaansluiting die op naam staat van P."
        En hij onderzoekt welke apparaten en gebruikers op die aansluiting actief waren.</div>
      `,
      questions: [
        { q: 'Op welk niveau zegt het IP-adres iets?', options: ['Bronniveau', 'Activiteitsniveau', 'Delictsniveau', 'Geen enkel niveau'], answer: 0, explain: 'Het koppelt de mail aan een aansluiting, niet aan een persoon of een handeling.' },
        { q: 'Wie beslist over het delictsniveau?', answer: ['de rechter', 'rechter'], hint: 'Niet de deskundige.', explain: 'De deskundige helpt bij bron en activiteit; de rechter beslist of de verdachte het feit heeft gepleegd.' },
        { q: 'Welke formulering past bij een zorgvuldig rapport?', options: ['"De mail is verstuurd via de aansluiting op naam van P."', '"P. heeft de mail verstuurd."', '"P. is schuldig."', '"Het IP-adres bewijst de dreiging."'], answer: 0, explain: 'Beschrijf wat het spoor laat zien, op het juiste niveau.' },
      ],
    },
    {
      title: 'Taak 2 — De prosecutor\'s fallacy: rekenen kan levens redden',
      content: `
        <p>Een deskundige zegt in de rechtszaal: "De kans dat de mail via de aansluiting van P. komt als iemand anders hem
        stuurde, is 1 op 1.000." Een journalist schrijft: "Er is maar 0,1% kans dat P. onschuldig is." Dat is de
        <strong>prosecutor's fallacy</strong>: P(bewijs | onschuld) wordt verward met P(onschuld | bewijs).</p>
        <h3>Twee gerechtelijke dwalingen</h3>
        <ul>
          <li><strong>Sally Clark (Engeland, 1999):</strong> veroordeeld voor de dood van haar twee baby's. Een
          kinderarts stelde dat de kans op twee wiegendoden in één gezin "1 op 73 miljoen" was. Die berekening negeerde dat
          wiegendood in families vaker voorkomt, en verwarde die kleine kans met de kans op onschuld. Clark werd in 2003 in
          hoger beroep vrijgesproken.</li>
          <li><strong>Lucia de Berk (Nederland, 2003):</strong> een verpleegkundige werd veroordeeld, mede op basis van een
          berekening dat de kans dat zij "toevallig" bij zoveel incidenten aanwezig was 1 op 342 miljoen zou zijn. De
          statistiek was ondeugdelijk en de medische basis van de zaak bleek niet te kloppen. In 2010 volgde vrijspraak.</li>
        </ul>
        <h3>Reken het zelf</h3>
        <p>Stel dat vooraf, zonder bewijs, ongeveer 5.000 mensen de mail hadden kunnen sturen (P. is er één van). Verwerk het
        bewijs in het lab en kijk wat er werkelijk van de kans overblijft. Voeg daarna het tweede bewijsstuk toe.</p>
        <div class="callout info"><strong>En de omgekeerde fout:</strong> de verdediging zegt: "Op 1 op de 1.000 passen bij 5.000
        mensen nog 5 andere kandidaten, dus het bewijs is waardeloos." Ook fout (de <em>defense fallacy</em>): het bewijs
        heeft de groep van 5.000 teruggebracht tot een handvol. Dat is sterk bewijs, alleen nog geen sluitend bewijs.</div>
      `,
      lab: {
        type: 'bayes',
        title: 'De dreigmail',
        scenario: 'Hp: P. verstuurde de dreigmail. Hd: iemand anders (een van ongeveer 5.000 mogelijke afzenders). De prior voor P. is dus 1 op 5.000 = 0,02%.',
        hypotheses: ['Hp (P.)', 'Hd (ander)'],
        prior: [0.0002, 0.9998],
        evidence: [
          { short: 'IP', text: 'De mail kwam via de internetaansluiting van P.', likelihood: [0.95, 0.001] },
          { short: 'concept', text: 'Op de laptop van P. staat een eerder concept van de mail', likelihood: [0.6, 0.01] },
        ],
      },
      questions: [
        { q: 'Hoe groot is de kans op Hp na alleen het IP-bewijs? (procent, geheel getal)', answer: ['16', '16%'], hint: 'Vink alleen het eerste bewijs aan.', explain: 'Ongeveer 16%: het IP-bewijs is sterk (LR 950), maar de startkans was 1 op 5.000. Zeker niet de "99,9%" uit de krant.' },
        { q: 'Wat is de likelihood ratio van het IP-bewijs?', answer: ['950', '950:1', '950 : 1'], hint: '0,95 / 0,001.', explain: 'LR = 950: het bewijs is 950 keer waarschijnlijker als P. de afzender is.' },
        { q: 'Hoe groot is de kans op Hp na beide bewijsstukken? (procent, geheel getal)', answer: ['92', '92%'], hint: 'Vink beide aan.', explain: 'Ongeveer 92%. Het tweede, onafhankelijke bewijsstuk (LR 60) maakt het verschil.' },
        { q: 'Waarom werd Sally Clark ten onrechte veroordeeld?', options: ['Een kleine kans op het bewijs bij onschuld werd verward met een kleine kans op onschuld, en afhankelijkheid werd genegeerd', 'Omdat er geen deskundige was', 'Omdat ze bekende', 'Door een DNA-fout'], answer: 0, explain: 'Dubbel fout: de 1 op 73 miljoen was te laag berekend, én het was niet de kans op onschuld.' },
      ],
    },
    {
      title: 'Taak 3 — Bewijskracht in getallen en in woorden',
      content: `
        <p>Uit taak 2 volgt een belangrijke rolverdeling. De <strong>deskundige</strong> rapporteert hoe sterk het bewijs is:
        de <strong>likelihood ratio</strong>. De <strong>rechter</strong> weegt alles samen, inclusief de startkans (die
        hangt af van ander bewijs, getuigen en de omstandigheden). Zo blijft de deskundige binnen zijn vak.</p>
<pre><code>LR = P(E | Hp) / P(E | Hd)

"Het bewijs is ongeveer 950 keer waarschijnlijker als de mail via deze aansluiting door P. is verstuurd,
 dan als iemand anders hem heeft verstuurd."</code></pre>
        <h3>Een verbale schaal</h3>
        <p>Omdat getallen in de rechtszaal makkelijk verkeerd worden gelezen, werken forensische instituten (waaronder het
        NFI) met een vaste woordenschaal naast het getal. Een voorbeeld van zo'n schaal:</p>
        <table>
          <thead><tr><th>LR</th><th>Formulering ("het bewijs is ... onder Hp dan onder Hd")</th></tr></thead>
          <tbody>
            <tr><td>1 – 2</td><td>ongeveer even waarschijnlijk</td></tr>
            <tr><td>2 – 10</td><td>iets waarschijnlijker</td></tr>
            <tr><td>10 – 100</td><td>waarschijnlijker</td></tr>
            <tr><td>100 – 10.000</td><td>veel waarschijnlijker</td></tr>
            <tr><td>10.000 – 1.000.000</td><td>zeer veel waarschijnlijker</td></tr>
            <tr><td>&gt; 1.000.000</td><td>extreem veel waarschijnlijker</td></tr>
          </tbody>
        </table>
        <div class="callout tip"><strong>Let op de formulering:</strong> de zin gaat over de kans op het <em>bewijs</em> onder
        twee hypothesen, nooit over de kans op de hypothese zelf. "Hp is veel waarschijnlijker" is precies de prosecutor's
        fallacy in woorden.</div>
        <h3>Digitaal bewijs heeft zelden een nette LR</h3>
        <p>Bij DNA zijn er databanken om kansen te berekenen. Bij digitaal bewijs zijn de getallen vaak schattingen op basis
        van ervaring. Dan geldt: maak de redenering controleerbaar, benoem de alternatieve scenario's die je hebt getoetst, en
        wees terughoudend met getallen die nauwkeuriger lijken dan ze zijn.</p>
      `,
      questions: [
        { q: 'Bij welke formulering hoort een LR van 950 op de schaal hierboven?', options: ['Veel waarschijnlijker', 'Waarschijnlijker', 'Zeer veel waarschijnlijker', 'Extreem veel waarschijnlijker'], answer: 0, explain: '950 valt in de band 100 – 10.000.' },
        { q: 'Welke zin is juist geformuleerd?', options: ['"Het bewijs is veel waarschijnlijker als P. de afzender is dan als iemand anders dat is."', '"Het is veel waarschijnlijker dat P. de afzender is."', '"P. is met 99,9% zekerheid de afzender."', '"De kans dat P. onschuldig is, is 1 op 950."'], answer: 0, explain: 'Alleen de eerste gaat over de kans op het bewijs; de andere drie gaan over de hypothese en vallen in de prosecutor\'s fallacy.' },
        { q: 'Waarom rapporteert de deskundige de LR en niet de eindkans op schuld?', options: ['Omdat de startkans afhangt van ander bewijs, dat de rechter weegt', 'Omdat de LR altijd hoger is', 'Omdat de wet getallen verbiedt', 'Omdat eindkansen niet bestaan'], answer: 0, explain: 'De deskundige kent alleen zijn eigen spoor; de rechter overziet de hele zaak.' },
      ],
    },
    {
      title: 'Taak 4 — Het forensisch rapport',
      content: `
        <p>Een rapport moet over jaren nog te begrijpen en te controleren zijn, door een rechter, een advocaat en een
        tegenonderzoeker. Daarom heeft het een vaste opbouw, en geldt: <strong>alles wat je concludeert, moet een ander kunnen
        narekenen</strong>.</p>
        <h3>Specifiek voor digitaal bewijs</h3>
        <ul>
          <li><strong>Integriteit:</strong> hashwaarden van alle bronnen, vastgelegd bij ontvangst en opnieuw gecontroleerd.</li>
          <li><strong>Gevalideerde tools:</strong> welke software, welke versie, en hoe weet je dat die correct werkt?</li>
          <li><strong>Tijd:</strong> in welke tijdzone, en klopte de systeemklok?</li>
          <li><strong>Alternatieve scenario's:</strong> denk aan het Trojaanse-paardverweer. In 2003 werd in Engeland een
          tiener vrijgesproken van een digitale aanval nadat hij aanvoerde dat malware op zijn computer de dader was. Een goed
          rapport onderzoekt zo'n verklaring actief: is er malware gevonden, en past die bij de handelingen?</li>
          <li><strong>Beperkingen:</strong> wat kon je niet onderzoeken (versleutelde opslag, ontbrekende logs)?</li>
        </ul>
        <div class="callout info"><strong>In Nederland</strong> kunnen deskundigen zich laten registreren in het Nederlands
        Register Gerechtelijk Deskundigen (NRGD), dat per deskundigheidsgebied eisen stelt aan vakbekwaamheid en
        rapportage. Rechters en het Openbaar Ministerie kunnen zo nagaan of een deskundige aan die eisen voldoet.</div>
        <p>Zet de onderdelen van een forensisch rapport in de juiste volgorde.</p>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de onderdelen van een forensisch rapport op volgorde.',
        items: [
          { id: 'v', label: 'Vraagstelling: welke vragen stelde de opdrachtgever, op welk niveau?' },
          { id: 'm', label: 'Ontvangen materiaal: wat, wanneer, van wie, met hashwaarden' },
          { id: 'o', label: 'Onderzoeksmethode: stappen, tools en versies' },
          { id: 'r', label: 'Resultaten: wat is waargenomen, zonder interpretatie' },
          { id: 'i', label: 'Interpretatie: de waarnemingen gewogen onder Hp en Hd' },
          { id: 'c', label: 'Conclusie: bewijskracht in getal en woorden, met beperkingen' },
          { id: 'b', label: 'Bijlagen: logs, tijdlijnen en hashlijsten om na te rekenen' },
        ],
        correct: ['v', 'm', 'o', 'r', 'i', 'c', 'b'],
        flag: 'NM{controleerbaar_rapport}',
        explain: 'Van vraag via materiaal, methode en waarnemingen naar interpretatie en conclusie, met bijlagen om alles na te rekenen.',
      },
      questions: [
        { q: 'Welke vlag krijg je bij de juiste volgorde?', answer: ['NM{controleerbaar_rapport}'], encoded: true, hint: 'Begin bij de vraagstelling, eindig bij de bijlagen.', explain: 'Een controleerbaar rapport scheidt waarneming van interpretatie.', xp: 20 },
        { q: 'Waarom staan resultaten en interpretatie in aparte onderdelen?', options: ['Zodat een ander de waarnemingen kan controleren los van jouw oordeel', 'Omdat het korter is', 'Omdat de wet dat verbiedt', 'Dat hoeft niet'], answer: 0, explain: 'Een tegenonderzoeker kan het eens zijn met je waarnemingen en het toch oneens zijn met je interpretatie.' },
        { q: 'De verdediging stelt dat malware de handelingen uitvoerde. Wat doe je als deskundige?', options: ['Die alternatieve hypothese actief onderzoeken en rapporteren wat je vond', 'Het verweer negeren', 'Zeggen dat malware niet bestaat', 'Alleen de vervolging helpen'], answer: 0, explain: 'Een deskundige is onpartijdig en toetst ook de hypothese van de verdediging.' },
      ],
    },
    {
      title: 'Taak 5 — Contextuele bias: als je al weet wat je zoekt',
      content: `
        <p>Onderzoek van onder anderen Itiel Dror liet zien dat ervaren vingerafdrukdeskundigen hetzelfde spoor anders
        beoordeelden als ze andere achtergrondinformatie kregen, zoals "de verdachte heeft al bekend". Dat heet
        <strong>contextuele bias</strong>. Het is geen kwestie van eerlijkheid: het gebeurt onbewust, ook bij de besten. Digitale
        forensie is er net zo gevoelig voor: wie weet wie de verdachte is, ziet sneller "zijn" bestanden.</p>
        <h3>Maatregelen</h3>
        <ul>
          <li><strong>Linear sequential unmasking:</strong> analyseer eerst het spoor zelf; krijg pas daarna stap voor stap
          het vergelijkingsmateriaal en de context. Leg vast wat je wanneer wist.</li>
          <li><strong>Blinde verificatie:</strong> een tweede onderzoeker controleert het werk zonder de conclusie van de eerste
          en zonder irrelevante context.</li>
          <li><strong>Altijd twee hypothesen:</strong> formuleer Hd net zo serieus als Hp, en zoek bewijs dat Hp zou weerleggen.</li>
          <li><strong>Documenteer afwijkingen:</strong> ook wat niet past bij het verhaal hoort in het rapport.</li>
        </ul>
        <p>Doorloop de beslissimulatie.</p>
      `,
      lab: {
        type: 'scenario',
        title: 'Onpartijdig blijven',
        scenario: 'Je bent digitaal deskundige in de zaak van de dreigmail. Onder druk van tijd en verwachtingen neem je vier beslissingen.',
        pass: 4,
        flag: 'NM{twee_hypothesen_altijd}',
        steps: [
          { situation: 'De rechercheur stuurt je de laptop met de opmerking: "P. heeft trouwens al half bekend, je zult het snel vinden." Wat doe je?', choices: [
            { label: 'Vragen om alleen de informatie die voor je onderzoek nodig is, en de opmerking vastleggen als mogelijke bron van bias', good: true, feedback: 'Zo beperk en documenteer je contextuele informatie.' },
            { label: 'Fijn, dan weet je waar je moet zoeken', good: false, feedback: 'Precies zo ontstaat tunnelvisie.' },
            { label: 'De zaak weigeren', good: false, feedback: 'Niet nodig; wel de invloed beheersen.' } ] },
          { situation: 'Je vindt het concept van de mail op de laptop. Wat onderzoek je nog?', choices: [
            { label: 'Wie dat concept aanmaakte: gebruikersprofiel, tijden, en of er malware of afstandsbediening actief was', good: true, feedback: 'Je toetst het activiteitsniveau én de alternatieve hypothese.' },
            { label: 'Niets meer, de zaak is rond', good: false, feedback: 'Een bestand op een laptop zegt nog niet wie het maakte.' },
            { label: 'Alleen nog de hash van het bestand', good: false, feedback: 'Nodig voor integriteit, maar het beantwoordt de vraag niet.' } ] },
          { situation: 'Een collega controleert je werk. Hoe pak je dat aan?', choices: [
            { label: 'Blind: de collega krijgt de sporen en de vraag, niet jouw conclusie', good: true, feedback: 'Zo is de verificatie echt onafhankelijk.' },
            { label: 'Je stuurt je conclusie mee, dan gaat het sneller', good: false, feedback: 'Dan bevestigt de collega vooral wat jij al dacht.' },
            { label: 'Geen controle, je bent ervaren', good: false, feedback: 'Juist ervaren deskundigen blijken gevoelig voor bias.' } ] },
          { situation: 'De officier van justitie vraagt: "Kunt u zeggen dat P. de dader is?"', choices: [
            { label: 'Nee: ik kan de bewijskracht van de sporen onder Hp en Hd geven; over het delict beslist de rechter', good: true, feedback: 'Je blijft binnen je vak en op het juiste niveau.' },
            { label: 'Ja, met 99,9% zekerheid', good: false, feedback: 'Dat is de prosecutor\'s fallacy en buiten je rol.' },
            { label: 'Dat hangt af van wat u wilt horen', good: false, feedback: 'Een deskundige is onpartijdig.' } ] },
        ],
      },
      questions: [
        { q: 'Welke vlag krijg je als je alle beslissingen goed neemt?', answer: ['NM{twee_hypothesen_altijd}'], encoded: true, hint: 'Blijf onpartijdig en op het juiste niveau.', explain: 'Altijd twee hypothesen, altijd binnen je rol.', xp: 20 },
        { q: 'Hoe heet de werkwijze waarbij je eerst het spoor analyseert en pas daarna stap voor stap context krijgt?', answer: ['linear sequential unmasking', 'lsu'], hint: 'Drie Engelse woorden.', explain: 'Linear sequential unmasking beperkt de invloed van context op je eerste waarneming.' },
        { q: 'Waarom is contextuele bias geen kwestie van eerlijkheid?', options: ['Het werkt onbewust, ook bij eerlijke en ervaren deskundigen', 'Omdat alleen oneerlijke deskundigen bias hebben', 'Omdat bias niet bestaat', 'Omdat het alleen bij vingerafdrukken voorkomt'], answer: 0, explain: 'Daarom heb je procedures nodig, niet alleen goede bedoelingen.' },
      ],
    },
  ],
});
