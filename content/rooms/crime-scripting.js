/* Room: Crime scripting (Cornish) — leerpad Cyber-intelligence & opsporing */

CS.registerRoom({
  id: 'crime-scripting',
  path: 'intelligence',
  order: 2,
  title: 'Crime scripting',
  icon: '🎬',
  difficulty: 'Gemiddeld',
  minutes: 65,
  summary: 'Hoe je een (cyber)misdaad als een filmdraaiboek ontleedt: het crime script van Cornish, het universele script in zes fasen van voorbereiding tot cash-out, abstractieniveaus, subscripts en displacement, en hoe je er met situationele criminaliteitspreventie en een interventiematrix op ingrijpt.',
  objectives: [
    'Uitleggen wat een crime script is en een scène beschrijven met handeling, actoren, middelen, locatie, randvoorwaarden en sporen',
    'Een (cyber)misdaad in het universele script van zes fasen plaatsen, van voorbereiding tot cash-out',
    'De abstractieniveaus metascript, protoscript, script en track onderscheiden',
    'Subscripts herkennen en de soorten displacement (verplaatsing) benoemen',
    'De vijf situationele-preventiestrategieën van Cornish & Clarke toepassen',
    'Een interventiematrix (fase × strategie) opstellen met een eigenaar per maatregel en beweringen labelen als bekend, afgeleid of aanname',
  ],
  tasks: [
    {
      title: 'Taak 1 — Wat is crime scripting? Het draaiboek van een misdaad',
      content: `
        <p>Stel je voor dat je een film maakt. Voordat er ook maar één camera draait, ligt er een
        <strong>draaiboek</strong> (script): scène voor scène staat erin wie er in beeld is, wat ze doen, welke
        spullen ze nodig hebben en waar het zich afspeelt. <strong>Crime scripting</strong> doet precies hetzelfde,
        maar dan voor een misdaad. Je schrijft als het ware het draaiboek van de dader: welke stappen zet iemand,
        in welke volgorde, om een misdaad van begin tot eind uit te voeren?</p>

        <p>De criminoloog <strong>Derek Cornish</strong> introduceerde dit idee in 1994. Zijn gedachte: een misdaad
        is geen losse gebeurtenis maar een <em>proces</em> van achtereenvolgende handelingen. Door dat proces op te
        knippen in scènes, zie je precies waar een dader keuzes maakt en wat er op elk moment moet kloppen. En waar
        keuzes zijn, kun je ingrijpen. Crime scripting komt uit de "gewone" criminologie (zakkenrollerij, inbraak,
        autodiefstal), maar het werkt uitstekend voor cybercrime, want ook een phishingcampagne of een
        ransomware-aanval verloopt in herkenbare stappen.</p>

        <h3>Een scène ontleed je op zes punten</h3>
        <p>Elke scène in een crime script beschrijf je zo volledig mogelijk. Gebruik deze zes velden als checklist:</p>
        <ul>
          <li><strong>Handeling</strong> — wat gebeurt er precies in deze stap?</li>
          <li><strong>Actoren</strong> — wie zijn erbij betrokken? Niet alleen de dader, maar ook het slachtoffer en
          eventuele <em>facilitators</em> (handlangers of dienstverleners, zoals een bulletproof hoster of een geronselde
          geldezel).</li>
          <li><strong>Middelen</strong> — welke tools, infrastructuur of hulpbronnen zijn nodig (een phishingkit, een
          domein, een botnet, een crypto-wallet)?</li>
          <li><strong>Locatie</strong> — waar speelt het zich af? Bij cybercrime vaak digitaal: op welk systeem,
          platform of netwerk.</li>
          <li><strong>Randvoorwaarden</strong> — wat moet er al waar zijn vóórdat deze stap kan slagen (het slachtoffer
          moet een account hebben, het malware-domein moet nog niet geblokkeerd zijn)?</li>
          <li><strong>Sporen</strong> — welke sporen laat deze stap achter? Dit veld is goud voor de opsporing:
          loginpogingen in een log, een geregistreerd domein, een transactie op de blockchain.</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> het veld <strong>sporen</strong> maakt het verschil tussen een leuk theoretisch
          plaatje en een bruikbaar opsporingsinstrument. Elke scène die sporen achterlaat, is een scène waar jij als
          onderzoeker kunt beginnen te graven.
        </div>

        <h3>Mini-voorbeeld</h3>
        <p>Scène "Slachtoffer klikt op de phishinglink". <strong>Handeling:</strong> medewerker opent de e-mail en
        klikt. <strong>Actoren:</strong> dader (verstuurder), slachtoffer, e-mailprovider. <strong>Middelen:</strong>
        nagemaakte inlogpagina, verzenddienst. <strong>Locatie:</strong> de mailbox en de browser van het slachtoffer.
        <strong>Randvoorwaarden:</strong> de mail passeert het spamfilter en het nepdomein is nog niet geblokkeerd.
        <strong>Sporen:</strong> de klik in de webserverlogs, het bezochte domein, het tijdstip.</p>

        <p>Zie je het? Eén zinnetje wordt een rijke, onderzoekbare stap. Daarmee heb je de kern van crime scripting
        te pakken: <strong>JVT{script_is_het_draaiboek}</strong>.</p>
      `,
      questions: [
        { q: 'Welke criminoloog introduceerde crime scripting (in 1994)?', answer: ['Cornish', 'cornish', 'Derek Cornish'], hint: 'Zijn achternaam begint met een C.', explain: 'Derek Cornish beschreef in 1994 de misdaad als een proces van scènes: het crime script.' },
        { q: 'Welk van de zes velden is het meest waardevol voor de opsporing, omdat het aanknopingspunten voor onderzoek oplevert?', options: ['Handeling', 'Locatie', 'Sporen', 'Randvoorwaarden'], answer: 2, explain: 'Sporen (logs, domeinen, transacties) zijn precies de aanknopingspunten waarmee een onderzoeker begint.' },
        { q: 'Hoe heet in een crime script een handlanger of dienstverlener die de misdaad mogelijk maakt, zoals een bulletproof hoster of een geldezel?', answer: ['facilitator', 'facilitators'], hint: 'Engelse term; iemand die iets faciliteert/mogelijk maakt.', explain: 'Een facilitator is een actor die de misdaad faciliteert zonder per se de hoofddader te zijn.' },
        { q: 'Wat is de vlag die de kern van crime scripting samenvat (zie het einde van de taak)?', answer: ['JVT{script_is_het_draaiboek}'], hint: 'Staat vetgedrukt onderaan de uitleg.', explain: 'Een crime script is niets anders dan het draaiboek van een misdaad, scène voor scène.' },
      ],
    },

    {
      title: 'Taak 2 — Het universele script: zes fasen van voorbereiding tot cash-out',
      content: `
        <p>Elke misdaad heeft zijn eigen scènes, maar Cornish merkte op dat vrijwel álle scripts dezelfde grove
        bewegingen volgen. Dat noemen we het <strong>universele script</strong>: een vaste reeks fasen die je als
        sjabloon over elke misdaad heen legt. Voor cybercrime gebruiken we een praktische versie van
        <strong>zes fasen</strong>, van de eerste voorbereiding tot het moment waarop het geld echt besteedbaar is
        (de <strong>cash-out</strong>).</p>

        <figure class="diagram">
          <svg viewBox="0 0 802 110" role="img" aria-label="De zes fasen van het universele script">
            <rect x="8" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="142" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="276" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="410" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="544" y="40" width="116" height="50" rx="6" fill="var(--surface-2)" stroke="currentColor"/>
            <rect x="678" y="40" width="116" height="50" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/>
            <text x="66" y="62" text-anchor="middle" fill="currentColor" font-size="13">1</text>
            <text x="66" y="79" text-anchor="middle" fill="currentColor" font-size="12">Voorbereiding</text>
            <text x="200" y="62" text-anchor="middle" fill="currentColor" font-size="13">2</text>
            <text x="200" y="79" text-anchor="middle" fill="currentColor" font-size="12">Binnenkomen</text>
            <text x="334" y="62" text-anchor="middle" fill="currentColor" font-size="13">3</text>
            <text x="334" y="79" text-anchor="middle" fill="currentColor" font-size="12">Uitvoeren</text>
            <text x="468" y="62" text-anchor="middle" fill="currentColor" font-size="13">4</text>
            <text x="468" y="79" text-anchor="middle" fill="currentColor" font-size="12">Buit</text>
            <text x="602" y="62" text-anchor="middle" fill="currentColor" font-size="13">5</text>
            <text x="602" y="79" text-anchor="middle" fill="currentColor" font-size="12">Vertrek</text>
            <text x="736" y="62" text-anchor="middle" fill="currentColor" font-size="13">6</text>
            <text x="736" y="79" text-anchor="middle" fill="currentColor" font-size="12">Cash-out</text>
            <line x1="126" y1="65" x2="138" y2="65" stroke="currentColor"/>
            <polygon points="142,65 136,61 136,69" fill="currentColor"/>
            <line x1="260" y1="65" x2="272" y2="65" stroke="currentColor"/>
            <polygon points="276,65 270,61 270,69" fill="currentColor"/>
            <line x1="394" y1="65" x2="406" y2="65" stroke="currentColor"/>
            <polygon points="410,65 404,61 404,69" fill="currentColor"/>
            <line x1="528" y1="65" x2="540" y2="65" stroke="currentColor"/>
            <polygon points="544,65 538,61 538,69" fill="currentColor"/>
            <line x1="662" y1="65" x2="674" y2="65" stroke="currentColor"/>
            <polygon points="678,65 672,61 672,69" fill="currentColor"/>
          </svg>
          <figcaption>Het universele script: zes fasen van voorbereiding tot cash-out.</figcaption>
        </figure>

        <h3>De zes fasen, toegepast op cybercrime</h3>
        <ol>
          <li><strong>Voorbereiding.</strong> De dader kiest een doelwit, verkent het, en regelt de middelen:
          infrastructuur huren, een phishingkit of malware kopen, domeinen registreren, een team samenstellen.</li>
          <li><strong>Binnenkomen (initiële toegang).</strong> De dader zet voet binnen: een slachtoffer klikt op een
          link, een gestolen wachtwoord werkt, of een kwetsbaarheid in een server wordt uitgebuit.</li>
          <li><strong>Uitvoeren (de daad).</strong> De kernhandeling: rechten uitbreiden, zich door het netwerk bewegen
          en de eigenlijke misdaad plegen — gegevens stelen, geld overboeken of bestanden versleutelen.</li>
          <li><strong>Buit veiligstellen.</strong> De dader haalt de opbrengst binnen: data wegsluizen (exfiltreren),
          het losgeld laten overmaken, of de frauduleuze transacties laten uitvoeren.</li>
          <li><strong>Vertrek en sporen wissen.</strong> De dader verlaat het toneel: logs opschonen, malware
          verwijderen, infrastructuur afbreken en verbindingen verbergen (bijvoorbeeld via tussenstations).</li>
          <li><strong>Cash-out en witwassen.</strong> De laatste, cruciale stap: de buit omzetten in besteedbaar,
          "schoon" geld. Via geldezels (<em>moneymules</em>), crypto-wisselaars, mixers of nepwebwinkels.</li>
        </ol>

        <div class="callout info">
          <strong>Waarom tot aan de cash-out?</strong> Veel onderzoekers stoppen hun script bij "de misdaad is
          gepleegd". Maar juist de cash-out is vaak de zwakste schakel: daar moet de dader uit de anonieme digitale
          wereld terug de echte wereld in, waar banken, exchanges en toezichthouders meekijken. Wie de hele keten tot
          en met de cash-out in kaart brengt, vindt de beste plekken om in te grijpen.
        </div>

        <p>Let op: niet elke misdaad doorloopt alle fasen even nadrukkelijk, en soms lopen fasen door elkaar. Het
        universele script is een <em>denkraam</em>, geen strak keurslijf — net als de kapstok die je uit andere rooms
        kent.</p>
      `,
      questions: [
        { q: 'Wat is de juiste volgorde van het universele script?', options: ['Binnenkomen, voorbereiding, uitvoeren, buit, vertrek, cash-out', 'Voorbereiding, binnenkomen, uitvoeren, buit veiligstellen, vertrek, cash-out', 'Voorbereiding, uitvoeren, binnenkomen, cash-out, buit, vertrek', 'Cash-out, voorbereiding, binnenkomen, uitvoeren, buit, vertrek'], answer: 1, explain: 'Het sjabloon loopt chronologisch van voorbereiding, via binnenkomen en uitvoeren, naar buit, vertrek en cash-out.' },
        { q: 'Hoe heet de laatste fase, waarin de buit wordt omgezet in besteedbaar, "schoon" geld?', answer: ['cash-out', 'cash out', 'cashout'], hint: 'Engelse term, staat ook in de titel van de taak.', explain: 'De cash-out (en het witwassen) is de laatste fase en vaak de zwakste schakel in de keten.' },
        { q: 'In welke fase zitten het uitbuiten van een kwetsbaarheid of een werkend gestolen wachtwoord — het voet aan de grond krijgen?', options: ['Voorbereiding', 'Binnenkomen', 'Vertrek', 'Cash-out'], answer: 1, explain: 'Binnenkomen (initiële toegang) is de fase waarin de dader voor het eerst voet binnen krijgt.' },
      ],
    },

    {
      title: 'Taak 3 — Abstractieniveaus: metascript, protoscript, script en track',
      content: `
        <p>Een crime script kun je grof of juist heel gedetailleerd schrijven. Cornish onderscheidde daarom
        <strong>abstractieniveaus</strong>: van een zeer algemeen sjabloon tot een haarfijne beschrijving van één
        specifieke uitvoering. Vier niveaus, van abstract naar concreet:</p>

        <table>
          <thead><tr><th>Niveau</th><th>Wat het is</th><th>Cybervoorbeeld</th></tr></thead>
          <tbody>
            <tr><td><strong>Metascript</strong></td><td>Het meest abstracte niveau: een hele familie van misdaden met dezelfde grove logica.</td><td>"Online fraude" in het algemeen.</td></tr>
            <tr><td><strong>Protoscript</strong></td><td>Een generiek script voor één type misdaad, los van de precieze uitvoering.</td><td>"Phishing-fraude" als categorie.</td></tr>
            <tr><td><strong>Script</strong></td><td>De concrete manier waarop dat type wordt uitgevoerd.</td><td>"Bankphishing via een nagemaakte inlogpagina".</td></tr>
            <tr><td><strong>Track</strong></td><td>Een specifieke variant binnen hetzelfde script.</td><td>Phishing per sms (smishing) versus per e-mail: twee tracks van hetzelfde script.</td></tr>
          </tbody>
        </table>

        <h3>De analogie van het kookboek</h3>
        <p>Denk aan koken. Het <strong>metascript</strong> is "een maaltijd bereiden" — veel te algemeen om direct mee
        aan de slag te gaan, maar het geeft de grote lijn. Het <strong>protoscript</strong> is "pasta koken": al
        specifieker. Het <strong>script</strong> is het recept voor "spaghetti carbonara". En een <strong>track</strong>
        is een concrete variant van dat recept: carbonara met spek in plaats van pancetta. Zelfde recept, andere
        uitvoering.</p>

        <div class="callout tip">
          <strong>Waarom dit handig is:</strong> op een hoog niveau (meta/proto) herken je patronen die over veel zaken
          heen gelden — ideaal voor beleid en strategische interventies. Op een laag niveau (script/track) zie je de
          concrete details waarmee je één specifieke zaak kunt verstoren. Kies het niveau dat bij je vraag past.
        </div>

        <p>Een valkuil: als je te abstract blijft, wordt je script een nietszeggend plaatje ("dader bereidt voor, dader
        slaat toe"). Blijf je te concreet, dan geldt je script maar voor één enkele zaak en kun je er niets van
        generaliseren. Goede analisten schuiven bewust heen en weer tussen de niveaus: inzoomen voor details,
        uitzoomen voor patronen.</p>
      `,
      questions: [
        { q: 'Welk abstractieniveau is het meest algemeen (het hoogste, over een hele familie van misdaden)?', options: ['Track', 'Script', 'Protoscript', 'Metascript'], answer: 3, explain: 'Het metascript is het meest abstracte niveau en omvat een hele familie van misdaadvormen.' },
        { q: 'Smishing (phishing via sms) en phishing via e-mail zijn twee ... van hetzelfde script.', answer: ['tracks', 'track'], hint: 'Het meest concrete niveau: een specifieke variant.', explain: 'Een track is een specifieke uitvoeringsvariant binnen één script.' },
        { q: 'Zet van abstract naar concreet: welke volgorde klopt?', options: ['Script, metascript, protoscript, track', 'Metascript, protoscript, script, track', 'Track, script, protoscript, metascript', 'Protoscript, metascript, track, script'], answer: 1, explain: 'Van abstract naar concreet: metascript, protoscript, script, track.' },
      ],
    },

    {
      title: 'Taak 4 — Subscripts en het herkennen van displacement',
      content: `
        <p>Sommige scènes uit een script zijn op zichzelf al een klein verhaal. Neem de scène "geldezels regelen" in de
        cash-outfase: dat is niet één handeling, maar een heel proces van werven, instrueren, rekeningen laten openen
        en uitbetalen. Zo'n op zichzelf uit te werken deelproces heet een <strong>subscript</strong>: je zoomt in op
        één scène en schrijft daar een compleet eigen script voor.</p>

        <p>Subscripts zijn krachtig omdat ze vaak <em>hergebruikt</em> worden. Het subscript "een phishingkit kopen op
        een crimineel forum" komt in talloze verschillende scripts terug. Verstoor je zo'n veelgebruikt subscript, dan
        raak je in één klap veel zaken tegelijk. Dat maakt subscripts interessante interventiepunten.</p>

        <h3>Displacement: de waterbed-waarschuwing</h3>
        <p>Grijp je ergens in, dan verdwijnt de misdaad lang niet altijd. Vaak <em>verplaatst</em> hij zich — als een
        waterbed waar je op duwt: op de ene plek zakt het, op de andere komt het omhoog. Dat heet
        <strong>displacement</strong> (verplaatsing). Er zijn vijf klassieke soorten (Reppetto; later aangevuld door
        Cornish &amp; Clarke):</p>
        <ul>
          <li><strong>Geografische verplaatsing</strong> (spatial) — zelfde misdaad, andere plek. Het phishingdomein
          wordt geblokkeerd, dus de dader zet een nieuwe server bij een andere hoster in een ander land neer.</li>
          <li><strong>Temporele verplaatsing</strong> (temporal) — zelfde misdaad, ander tijdstip. Monitoring is
          strak overdag, dus de aanval verschuift naar de nacht of het weekend.</li>
          <li><strong>Doelverplaatsing</strong> (target) — ander slachtoffer. De grootbank beveiligt zich goed, dus de
          dader richt zich op klanten van kleinere banken.</li>
          <li><strong>Tactische verplaatsing</strong> (tactical) — andere methode of modus operandi. E-mailfilters
          werken te goed, dus de dader stapt over op phishing via sms of QR-codes.</li>
          <li><strong>Misdaadverplaatsing</strong> (functional) — ander type misdaad. Ransomware wordt te risicovol,
          dus de groep schakelt over op gegevensdiefstal met afpersing.</li>
        </ul>
        <p>Cornish &amp; Clarke voegden daar nog een zesde aan toe: <strong>daderverplaatsing</strong> (perpetrator) —
        pak je de ene dader op, dan neemt een ander zijn plek in, zeker in een crime-as-a-service-markt.</p>

        <div class="callout info">
          <strong>Het goede nieuws — diffusion of benefits:</strong> het tegenovergestelde van displacement bestaat ook.
          Soms heeft een maatregel een <em>positieve uitstraling</em> naar plekken of doelen die je niet eens
          aanpakte. Camera's op één parkeerterrein verminderen soms ook de diefstal op het terrein ernaast. Dat heet
          <em>diffusion of benefits</em> (verspreiding van baten).
        </div>

        <p>De les voor een analist: ga er nooit automatisch van uit dat een interventie het probleem oplost. Vraag je
        bij elke maatregel af: <em>waarheen zou deze misdaad kunnen verschuiven?</em> Juist door displacement te
        voorspellen, kun je je interventies slim combineren zodat er geen makkelijke uitwijkroute overblijft.</p>
      `,
      questions: [
        { q: 'Hoe heet een scène die je als een compleet eigen, op zichzelf uit te werken deelproces beschrijft (zoals "geldezels regelen")?', answer: ['subscript', 'een subscript'], hint: 'Een script binnen een script.', explain: 'Een subscript werkt één scène uit tot een eigen script; het wordt vaak over meerdere zaken hergebruikt.' },
        { q: 'Een dader stapt na goede e-mailfilters over van phishing per e-mail naar phishing per sms. Welke soort displacement is dit?', options: ['Geografische verplaatsing', 'Temporele verplaatsing', 'Tactische verplaatsing', 'Doelverplaatsing'], answer: 2, explain: 'Een andere methode of modus operandi is tactische verplaatsing (tactical displacement).' },
        { q: 'Hoe heet het positieve tegenovergestelde van displacement, waarbij een maatregel ook buiten het doelgebied effect heeft?', answer: ['diffusion of benefits', 'diffusion', 'verspreiding van baten'], hint: 'Engelse term; de baten "lekken" naar buiten.', explain: 'Diffusion of benefits is de positieve uitstraling van een maatregel naar niet-aangepakte plekken of doelen.' },
        { q: 'Een ransomwaregroep vindt versleutelen te risicovol en gaat over op pure gegevensdiefstal met afpersing. Welke soort displacement?', options: ['Misdaadverplaatsing (functional)', 'Geografische verplaatsing (spatial)', 'Temporele verplaatsing (temporal)', 'Daderverplaatsing (perpetrator)'], answer: 0, explain: 'Overstappen naar een ander type misdaad is misdaadverplaatsing (functional displacement).' },
      ],
    },

    {
      title: 'Taak 5 — Situationele criminaliteitspreventie: de vijf strategieën',
      content: `
        <p>Crime scripting is pas echt nuttig als je er iets mee doet. Hier komt <strong>situationele
        criminaliteitspreventie</strong> (SCP; Engels: <em>situational crime prevention</em>) om de hoek kijken. Het
        idee: in plaats van daders proberen te "genezen", maak je de <em>situatie</em> zo onaantrekkelijk mogelijk om
        de misdaad te plegen. Je verandert de omgeving, niet de mens. Omdat je crime script precies laat zien wélke
        situaties er in elke scène zijn, sluiten crime scripting en SCP perfect op elkaar aan.</p>

        <p><strong>Cornish &amp; Clarke</strong> (2003) brachten alle maatregelen onder in <strong>vijf
        strategieën</strong> (met daaronder 25 concrete technieken). Dit zijn de vijf knoppen waaraan je kunt
        draaien:</p>
        <ol>
          <li><strong>Inspanning verhogen</strong> (increase the effort) — maak de misdaad simpelweg moeilijker.
          Cybervoorbeeld: multifactor-authenticatie (MFA), zodat een gestolen wachtwoord alleen niet genoeg is.</li>
          <li><strong>Risico verhogen</strong> (increase the risks) — vergroot de pakkans en de kans dat de dader
          wordt opgemerkt. Cybervoorbeeld: monitoring, loggen, en snelle detectie met een SOC.</li>
          <li><strong>Opbrengst verlagen</strong> (reduce the rewards) — maak de buit minder waard of onbruikbaar.
          Cybervoorbeeld: gegevens versleutelen of tokeniseren, zodat gestolen data waardeloos is; of goede offline
          back-ups, zodat losgeld betalen zinloos wordt.</li>
          <li><strong>Provocaties verminderen</strong> (reduce provocations) — neem prikkels en verleidingen weg die tot
          de misdaad aanzetten. Cybervoorbeeld: geen onnodige druk of haast in processen, en geen openlijk gepronk met
          waardevolle "trofeeën" die daders uitdagen.</li>
          <li><strong>Excuses wegnemen</strong> (remove excuses) — maak duidelijk dat gedrag niet mag en haal de smoesjes
          weg. Cybervoorbeeld: heldere gebruiksvoorwaarden, loginbanners ("ongeautoriseerd gebruik is strafbaar"),
          en bewustwordingstraining.</li>
        </ol>

        <div class="callout tip">
          <strong>Ezelsbruggetje:</strong> <em>inspanning, risico, opbrengst, provocaties, excuses</em>. De eerste drie
          gaan over de rationele kosten-batenafweging van de dader (moeilijker, gevaarlijker, minder lonend). De laatste
          twee gaan over de prikkels en rechtvaardigingen eromheen.
        </div>

        <h3>SCP en de rationele keuze</h3>
        <p>Onder SCP ligt dezelfde aanname als onder crime scripting: de dader maakt (grofweg) <em>rationele keuzes</em>.
        Als de inspanning te groot, het risico te hoog of de opbrengst te klein wordt, kiest een dader eerder voor een
        ander doel — of ziet hij er helemaal van af. Dat is meteen de reden dat je displacement (vorige taak) steeds
        moet meewegen: duw je op één knop, dan kan de dader de druk elders zoeken.</p>

        <p>Onthoud deze vijf strategieën goed — ze vormen samen met de zes fasen straks de assen van je
        interventiematrix. De vlag die je dit oplevert: <strong>JVT{vijf_knoppen_van_scp}</strong>.</p>
      `,
      questions: [
        { q: 'Welke van deze hoort NIET bij de vijf SCP-strategieën van Cornish & Clarke?', options: ['Inspanning verhogen', 'Risico verhogen', 'Daders opsluiten zonder proces', 'Excuses wegnemen'], answer: 2, explain: 'De vijf strategieën zijn: inspanning verhogen, risico verhogen, opbrengst verlagen, provocaties verminderen en excuses wegnemen.' },
        { q: 'Goede offline back-ups maken het betalen van losgeld zinloos. Welke SCP-strategie is dit vooral?', options: ['Inspanning verhogen', 'Opbrengst verlagen', 'Excuses wegnemen', 'Provocaties verminderen'], answer: 1, explain: 'Door de buit (afgedwongen losgeld) waardeloos te maken, verlaag je de opbrengst van de misdaad.' },
        { q: 'Multifactor-authenticatie (MFA) invoeren is vooral een voorbeeld van welke strategie?', answer: ['inspanning verhogen', 'de inspanning verhogen', 'increase the effort'], hint: 'Een gestolen wachtwoord is dan niet meer genoeg; de misdaad wordt moeilijker.', explain: 'MFA maakt de aanval moeilijker uit te voeren: dat is "inspanning verhogen".' },
        { q: 'Wat is de vlag die de vijf strategieën samenvat (einde van de taak)?', answer: ['JVT{vijf_knoppen_van_scp}'], hint: 'Staat vetgedrukt onderaan.', explain: 'De vijf strategieën zijn de vijf knoppen van situationele criminaliteitspreventie.' },
      ],
    },

    {
      title: 'Taak 6 — De interventiematrix en de labeling-conventie',
      content: `
        <p>Nu komt alles samen. Je hebt een misdaad opgeknipt in <strong>fasen</strong> (het universele script) en je
        kent de vijf <strong>strategieën</strong> van SCP. Zet die tegen elkaar af in een tabel, en je krijgt de
        <strong>interventiematrix</strong>: fase × strategie. In elke cel noteer je een concrete maatregel die in díé
        fase via díé strategie ingrijpt — plus, cruciaal, <strong>wie de eigenaar is</strong>.</p>

        <h3>Waarom een eigenaar per maatregel?</h3>
        <p>Een maatregel zonder eigenaar is een vrome wens (dat zag je ook bij lessons learned in de defensief-rooms).
        Cybercrime bestrijd je bovendien zelden alleen: een bank, een hostingprovider, het NCSC, een registrar, een
        crypto-exchange en de politie hebben elk hun eigen knoppen. De matrix maakt zichtbaar wie wat moet doen — en
        legt de verantwoordelijkheid ergens neer.</p>

        <table>
          <thead><tr><th>Fase</th><th>Strategie</th><th>Maatregel</th><th>Eigenaar</th></tr></thead>
          <tbody>
            <tr><td>Voorbereiding</td><td>Risico verhogen</td><td>Verdachte domeinregistraties monitoren en snel laten neerhalen (takedown)</td><td>Registrar / NCSC</td></tr>
            <tr><td>Binnenkomen</td><td>Inspanning verhogen</td><td>MFA afdwingen op alle accounts</td><td>Werkgever / IT-beheer</td></tr>
            <tr><td>Uitvoeren</td><td>Risico verhogen</td><td>Snelle detectie van afwijkend gedrag (SOC, EDR)</td><td>SOC / securityteam</td></tr>
            <tr><td>Buit veiligstellen</td><td>Opbrengst verlagen</td><td>Gegevens versleutelen/tokeniseren en exfiltratie blokkeren</td><td>Werkgever / IT-beheer</td></tr>
            <tr><td>Vertrek</td><td>Risico verhogen</td><td>Onveranderbare (append-only) logging, zodat sporen niet te wissen zijn</td><td>IT-beheer</td></tr>
            <tr><td>Cash-out</td><td>Opbrengst verlagen</td><td>Verdachte geldstromen bevriezen; mule-rekeningen signaleren</td><td>Bank / crypto-exchange</td></tr>
          </tbody>
        </table>

        <div class="callout tip">
          <strong>Tip:</strong> je hoeft niet elke cel te vullen. Zoek de cellen met de grootste hefboom: vaak zijn dat
          veelgebruikte subscripts (taak 4) en de cash-outfase, want daar komt de dader uit de anonimiteit tevoorschijn.
        </div>

        <h3>De labeling-conventie: bekend, afgeleid, aanname</h3>
        <p>Bij het invullen van een script of matrix mix je al snel feiten met interpretatie. Houd die scherp uit
        elkaar met drie labels — een gewoonte die je door het hele intelligence-leerpad heen gebruikt:</p>
        <ul>
          <li><strong>Bekend</strong> — een feit of directe waarneming (een log, een transactie, een e-mail die je zelf
          zag). Hard, controleerbaar.</li>
          <li><strong>Afgeleid</strong> — een analytische conclusie die je trekt uit het bekende ("de dader gebruikte
          waarschijnlijk een geautomatiseerde tool, want de acties volgden elkaar in milliseconden op").</li>
          <li><strong>Aanname</strong> — iets wat je (nog) niet hebt onderbouwd, maar wat je voorlopig aanneemt om
          verder te kunnen ("we nemen aan dat de geldezels niet wisten dat ze meehielpen").</li>
        </ul>

        <div class="callout warn">
          <strong>Waarom dit telt:</strong> wie bekend, afgeleid en aanname door elkaar haalt, bouwt een mooi verhaal op
          drijfzand. Door elk veld te labelen zie je in één oogopslag hoe stevig je script is — en waar je nog bewijs
          moet verzamelen voordat je een interventie op een <em>aanname</em> baseert.
        </div>

        <p>Tijd om het zelf te doen. In het lab hieronder werk je een phishing-fraude met geldezels uit in de zes fasen,
        met per fase een interventie. Label je velden netjes. De beloning: <strong>JVT{fase_maal_strategie}</strong>.</p>
      `,
      lab: {
        type: 'crimescript',
        scenario: 'Phishing-fraude met moneymules (geldezels) — een bende stuurt bankphishing en sluist het buitgemaakte geld weg via geronselde geldezels.',
        phases: ['1 · Voorbereiding', '2 · Binnenkomen', '3 · Uitvoeren', '4 · Buit veiligstellen', '5 · Vertrek & sporen wissen', '6 · Cash-out & witwassen'],
        fields: ['Handeling', 'Actoren', 'Middelen', 'Locatie', 'Randvoorwaarden', 'Sporen'],
        interventions: true,
        model: `
          <p><em>Voorbeelduitwerking. Beweringen gelabeld als (bekend) / (afgeleid) / (aanname).</em></p>
          <table>
            <thead><tr><th>Fase</th><th>Scène &amp; velden</th><th>Interventie — eigenaar — strategie</th></tr></thead>
            <tbody>
              <tr><td><strong>1 · Voorbereiding</strong></td>
                <td><strong>Handeling:</strong> nepdomein registreren en inlogpagina klonen.
                <strong>Actoren:</strong> dader, registrar (facilitator).
                <strong>Middelen:</strong> phishingkit, lookalike-domein.
                <strong>Locatie:</strong> hostingprovider.
                <strong>Randvoorwaarden:</strong> domein lijkt op de echte bank (afgeleid).
                <strong>Sporen:</strong> domeinregistratie in WHOIS en certificate transparency (bekend).</td>
                <td>Lookalike-domeinen monitoren en snel laten neerhalen. <strong>Eigenaar:</strong> registrar/NCSC. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>2 · Binnenkomen</strong></td>
                <td><strong>Handeling:</strong> slachtoffer klikt en vult inloggegevens in.
                <strong>Actoren:</strong> slachtoffer, dader.
                <strong>Middelen:</strong> phishingmail, nep-inlogpagina.
                <strong>Locatie:</strong> mailbox en browser van het slachtoffer.
                <strong>Randvoorwaarden:</strong> mail passeert het spamfilter (aanname).
                <strong>Sporen:</strong> klik in webserverlog, tijdstip, IP (bekend).</td>
                <td>MFA afdwingen zodat gestolen wachtwoord niet volstaat. <strong>Eigenaar:</strong> bank. <strong>Strategie:</strong> inspanning verhogen.</td></tr>
              <tr><td><strong>3 · Uitvoeren</strong></td>
                <td><strong>Handeling:</strong> dader logt in en zet een overboeking klaar.
                <strong>Actoren:</strong> dader.
                <strong>Middelen:</strong> gestolen inloggegevens.
                <strong>Locatie:</strong> bankomgeving.
                <strong>Randvoorwaarden:</strong> sessie blijft geldig (afgeleid).
                <strong>Sporen:</strong> loginlog, afwijkend apparaat/locatie (bekend).</td>
                <td>Afwijkende login en transactie realtime detecteren en tegenhouden. <strong>Eigenaar:</strong> bank (fraudeteam). <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>4 · Buit veiligstellen</strong></td>
                <td><strong>Handeling:</strong> geld wordt overgemaakt naar een mule-rekening.
                <strong>Actoren:</strong> dader, geldezel (facilitator).
                <strong>Middelen:</strong> mule-rekening.
                <strong>Locatie:</strong> betaalsysteem.
                <strong>Randvoorwaarden:</strong> mule-rekening staat klaar (bekend).
                <strong>Sporen:</strong> transactiegegevens, tegenrekening (bekend).</td>
                <td>Transactielimieten en vertraagde uitbetaling bij nieuwe tegenrekeningen. <strong>Eigenaar:</strong> bank. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
              <tr><td><strong>5 · Vertrek &amp; sporen wissen</strong></td>
                <td><strong>Handeling:</strong> dader logt uit en verbreekt verbindingen.
                <strong>Actoren:</strong> dader.
                <strong>Middelen:</strong> VPN/proxy.
                <strong>Locatie:</strong> tussenstations.
                <strong>Randvoorwaarden:</strong> herkomst verbergbaar (aanname).
                <strong>Sporen:</strong> proxy-/VPN-exit-IP, sessieduur (bekend).</td>
                <td>Onveranderbare (append-only) logging voor volledige reconstructie. <strong>Eigenaar:</strong> bank/IT. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>6 · Cash-out &amp; witwassen</strong></td>
                <td><strong>Handeling:</strong> geldezel neemt geld op of boekt door.
                <strong>Actoren:</strong> geldezel, ronselaar, (crypto-)wisselaar.
                <strong>Middelen:</strong> pinautomaat, exchange.
                <strong>Locatie:</strong> fysieke wereld / exchange.
                <strong>Randvoorwaarden:</strong> ezel werkt mee (aanname).
                <strong>Sporen:</strong> camerabeelden, opnametijdstip, exchange-KYC (bekend).</td>
                <td>Verdachte geldstromen bevriezen en mule-rekeningen signaleren. <strong>Eigenaar:</strong> bank/exchange + politie. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
            </tbody>
          </table>
        `,
      },
      questions: [
        { q: 'Wat vormen de twee assen van de interventiematrix?', options: ['Dader × slachtoffer', 'Fase (universeel script) × strategie (SCP)', 'Metascript × track', 'Bekend × aanname'], answer: 1, explain: 'De interventiematrix zet de fasen van het universele script tegen de vijf SCP-strategieën af.' },
        { q: 'Hoe label je een bewering die je (nog) niet hebt onderbouwd maar voorlopig voor waar aanneemt?', answer: ['aanname', 'een aanname'], hint: 'Niet bekend (feit) en niet afgeleid (conclusie), maar...', explain: 'Een aanname is onbewezen; label hem als zodanig zodat duidelijk is waar nog bewijs nodig is.' },
        { q: 'Waarom hoort bij elke maatregel in de matrix een eigenaar?', options: ['Een maatregel zonder eigenaar wordt zelden uitgevoerd, en cybercrime bestrijd je met meerdere partijen', 'Omdat de wet dat eist', 'Om de tabel langer te maken', 'Dat hoeft niet, het is optioneel'], answer: 0, explain: 'Zonder eigenaar blijft een maatregel een vrome wens; de matrix legt de verantwoordelijkheid bij de juiste partij.' },
        { q: 'Wat is de vlag die je in deze taak verdient?', answer: ['JVT{fase_maal_strategie}'], hint: 'Staat vetgedrukt vlak voor het lab.', explain: 'De interventiematrix is fase maal strategie: JVT{fase_maal_strategie}.' },
      ],
    },

    {
      title: 'Taak 7 — Oefening: een RaaS-affiliate-aanval scripten',
      content: `
        <p>Tot slot een pittigere casus. <strong>Ransomware-as-a-Service</strong> (RaaS) is een crimineel verdienmodel
        waarbij een kerngroep de ransomware bouwt en onderhoudt, en <strong>affiliates</strong> (partners) de
        daadwerkelijke aanvallen uitvoeren. De buit wordt gedeeld. Dit is crime-as-a-service ten voeten uit: de taken
        zijn verdeeld over gespecialiseerde partijen, elk met hun eigen subscript.</p>

        <h3>De keten in het kort</h3>
        <ul>
          <li>De <strong>kerngroep</strong> levert de ransomware, een leksite voor dubbele afpersing en de
          onderhandelingsinfrastructuur. (Een facilitator voor de affiliate.)</li>
          <li>De <strong>affiliate</strong> koopt of huurt initiële toegang (soms bij een <em>initial access broker</em>),
          dringt het netwerk binnen, versleutelt en steelt data, en eist losgeld.</li>
          <li>De <strong>cash-out</strong> loopt via crypto: betaling in een wallet, daarna mixers en exchanges om het
          spoor te vertroebelen.</li>
        </ul>

        <div class="callout info">
          <strong>Let op de abstractieniveaus:</strong> "ransomware-afpersing" is een protoscript. "RaaS-aanval via een
          gekochte toegang" is het script. En of de affiliate nu via RDP of via een VPN-kwetsbaarheid binnenkomt — dat
          zijn twee tracks. Zo hangt deze room aan elkaar.
        </div>

        <p>Werk nu in het lab de RaaS-affiliate-aanval uit in de zes fasen. Vul per fase de velden in (handeling,
        actoren, middelen, locatie, randvoorwaarden, sporen), label je beweringen als bekend/afgeleid/aanname, en
        bedenk per fase één interventie met een eigenaar en een SCP-strategie. Vergelijk daarna met de
        voorbeelduitwerking.</p>

        <h3>Samenvatting van de room</h3>
        <ul>
          <li>Een <strong>crime script</strong> (Cornish) ontleedt een misdaad scène voor scène, elk met handeling,
          actoren, middelen, locatie, randvoorwaarden en sporen.</li>
          <li>Het <strong>universele script</strong> telt zes fasen: voorbereiding, binnenkomen, uitvoeren, buit
          veiligstellen, vertrek en cash-out.</li>
          <li>Abstractieniveaus lopen van <strong>metascript</strong> via protoscript en script tot <strong>track</strong>;
          <strong>subscripts</strong> werken één scène verder uit.</li>
          <li><strong>Displacement</strong> waarschuwt dat misdaad kan verschuiven (geografisch, temporeel, doel,
          tactisch, misdaadtype, dader); <strong>diffusion of benefits</strong> is de positieve tegenhanger.</li>
          <li>Met de vijf <strong>SCP-strategieën</strong> (inspanning, risico, opbrengst, provocaties, excuses) en de
          <strong>interventiematrix</strong> (fase × strategie, mét eigenaar) kies je gericht waar je ingrijpt.</li>
        </ul>
      `,
      lab: {
        type: 'crimescript',
        scenario: 'RaaS-affiliate-aanval — een affiliate huurt ransomware van een kerngroep, koopt initiële toegang, versleutelt en steelt data (dubbele afpersing) en eist losgeld in crypto.',
        phases: ['1 · Voorbereiding', '2 · Binnenkomen', '3 · Uitvoeren', '4 · Buit veiligstellen', '5 · Vertrek & sporen wissen', '6 · Cash-out & witwassen'],
        fields: ['Handeling', 'Actoren', 'Middelen', 'Locatie', 'Randvoorwaarden', 'Sporen'],
        interventions: true,
        model: `
          <p><em>Voorbeelduitwerking. Beweringen gelabeld als (bekend) / (afgeleid) / (aanname).</em></p>
          <table>
            <thead><tr><th>Fase</th><th>Scène &amp; velden</th><th>Interventie — eigenaar — strategie</th></tr></thead>
            <tbody>
              <tr><td><strong>1 · Voorbereiding</strong></td>
                <td><strong>Handeling:</strong> affiliate huurt ransomware en koopt initiële toegang bij een broker.
                <strong>Actoren:</strong> affiliate, RaaS-kerngroep, initial access broker (facilitators).
                <strong>Middelen:</strong> ransomware-builder, gekochte toegang, leksite.
                <strong>Locatie:</strong> crimineel forum / marktplaats.
                <strong>Randvoorwaarden:</strong> toegang is nog geldig (aanname).
                <strong>Sporen:</strong> advertenties/verkoopberichten op fora (bekend, mits waargenomen).</td>
                <td>Toegangsmarkt verstoren en gelekte toegangen vroeg detecteren. <strong>Eigenaar:</strong> politie/NCSC + threat-intelteam. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>2 · Binnenkomen</strong></td>
                <td><strong>Handeling:</strong> affiliate logt in met de gekochte toegang (bv. via RDP of VPN).
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> geldige inloggegevens.
                <strong>Locatie:</strong> remote-toegangssysteem van het slachtoffer.
                <strong>Randvoorwaarden:</strong> geen MFA actief (afgeleid uit geslaagde login).
                <strong>Sporen:</strong> loginlog, bron-IP, ongebruikelijk tijdstip (bekend).</td>
                <td>MFA en geofencing op alle externe toegang. <strong>Eigenaar:</strong> IT-beheer slachtoffer. <strong>Strategie:</strong> inspanning verhogen.</td></tr>
              <tr><td><strong>3 · Uitvoeren</strong></td>
                <td><strong>Handeling:</strong> rechten uitbreiden, lateraal bewegen, back-ups saboteren, versleutelen.
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> tooling, credential-dumping, ransomware.
                <strong>Locatie:</strong> intern netwerk.
                <strong>Randvoorwaarden:</strong> onvoldoende segmentatie (afgeleid).
                <strong>Sporen:</strong> EDR-alerts, verwijderde schaduwkopieën, procesketen (bekend).</td>
                <td>EDR met automatische isolatie + netwerksegmentatie. <strong>Eigenaar:</strong> SOC/IT-beheer. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>4 · Buit veiligstellen</strong></td>
                <td><strong>Handeling:</strong> data exfiltreren vóór het versleutelen (dubbele afpersing).
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> exfiltratietool, C2-kanaal.
                <strong>Locatie:</strong> uitgaand netwerkverkeer.
                <strong>Randvoorwaarden:</strong> grote uploads vallen niet op (aanname).
                <strong>Sporen:</strong> uitgaand volume, verbinding met onbekende host (bekend).</td>
                <td>Exfiltratie detecteren/blokkeren (DLP, uitgaande filtering) en geteste offline back-ups. <strong>Eigenaar:</strong> IT-beheer. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
              <tr><td><strong>5 · Vertrek &amp; sporen wissen</strong></td>
                <td><strong>Handeling:</strong> logs opschonen, tooling verwijderen, losgeldbrief achterlaten.
                <strong>Actoren:</strong> affiliate.
                <strong>Middelen:</strong> wiper-/opschoonscripts.
                <strong>Locatie:</strong> getroffen systemen.
                <strong>Randvoorwaarden:</strong> lokale logs zijn wisbaar (afgeleid).
                <strong>Sporen:</strong> gaten in logs, losgeldbrief, tijdstempels (bekend).</td>
                <td>Logs centraal en onveranderbaar wegschrijven (SIEM, append-only). <strong>Eigenaar:</strong> SOC/IT-beheer. <strong>Strategie:</strong> risico verhogen.</td></tr>
              <tr><td><strong>6 · Cash-out &amp; witwassen</strong></td>
                <td><strong>Handeling:</strong> slachtoffer betaalt in crypto; buit wordt verdeeld en witgewassen.
                <strong>Actoren:</strong> affiliate, kerngroep, mixer, exchange.
                <strong>Middelen:</strong> wallet, mixer, exchange.
                <strong>Locatie:</strong> blockchain / exchange.
                <strong>Randvoorwaarden:</strong> exchange doet geen strenge controle (aanname).
                <strong>Sporen:</strong> wallet-adres, transacties op de blockchain, KYC bij uitbetaling (bekend).</td>
                <td>Wallets volgen en markeren; samenwerken met exchanges om uitbetaling te blokkeren; niet betalen. <strong>Eigenaar:</strong> politie + exchange. <strong>Strategie:</strong> opbrengst verlagen.</td></tr>
            </tbody>
          </table>
        `,
      },
      questions: [
        { q: 'Wat doet een affiliate in een RaaS-model?', options: ['Bouwt en onderhoudt de ransomware', 'Voert de daadwerkelijke aanvallen uit en deelt de buit met de kerngroep', 'Is een toezichthouder', 'Verzekert de slachtoffers'], answer: 1, explain: 'De affiliate (partner) voert de aanvallen uit; de kerngroep levert de ransomware en infrastructuur en krijgt een deel van de buit.' },
        { q: 'Op welk abstractieniveau zit het verschil tussen binnenkomen via RDP en via een VPN-kwetsbaarheid?', answer: ['track', 'tracks', 'track-niveau'], hint: 'Het meest concrete niveau: een specifieke uitvoeringsvariant.', explain: 'Verschillende uitvoeringswijzen van hetzelfde script zijn verschillende tracks.' },
        { q: 'Ik heb de RaaS-aanval in de zes fasen uitgewerkt, mijn beweringen gelabeld als bekend/afgeleid/aanname, en per fase een interventie met eigenaar en strategie bedacht.', noAnswer: true },
      ],
    },
  ],
  terms: [
    { term: 'Crime script', def: 'Draaiboek van een misdaad: een stapsgewijze (scène-voor-scène) ontleding van het misdaadproces, volgens Cornish (1994).' },
    { term: 'Scène', def: 'Eén stap in een crime script, beschreven op zes velden: handeling, actoren, middelen, locatie, randvoorwaarden en sporen.' },
    { term: 'Universeel script', def: 'Vast sjabloon van fasen dat vrijwel elke misdaad volgt; hier in zes fasen van voorbereiding tot cash-out.' },
    { term: 'Cash-out', def: 'De laatste fase: de buit omzetten in besteedbaar, witgewassen geld; vaak de zwakste schakel in de keten.' },
    { term: 'Metascript', def: 'Het meest abstracte abstractieniveau: een hele familie van misdaadvormen met dezelfde grove logica.' },
    { term: 'Protoscript', def: 'Een generiek script voor één type misdaad, los van de precieze uitvoering.' },
    { term: 'Track', def: 'Een specifieke uitvoeringsvariant binnen hetzelfde script (bijvoorbeeld smishing versus e-mailphishing).' },
    { term: 'Subscript', def: 'Een scène die als een compleet eigen script wordt uitgewerkt; vaak hergebruikt over meerdere zaken.' },
    { term: 'Displacement', def: 'Verplaatsing: een misdaad verschuift na een interventie (geografisch, temporeel, doel, tactisch, misdaadtype of dader).' },
    { term: 'Situationele criminaliteitspreventie (SCP)', def: 'Aanpak die de situatie onaantrekkelijk maakt voor de misdaad; vijf strategieën van Cornish & Clarke met 25 technieken.' },
    { term: 'Interventiematrix', def: 'Tabel fase (universeel script) × strategie (SCP) met per cel een concrete maatregel en een eigenaar.' },
    { term: 'RaaS / affiliate', def: 'Ransomware-as-a-Service: kerngroep levert de ransomware, affiliates voeren de aanvallen uit en delen de buit.' },
  ],
  resources: [
    { title: 'ASU Center for Problem-Oriented Policing (POP Center) — crime scripts en situationele preventie', url: 'https://popcenter.asu.edu/' },
    { title: 'College of Policing (VK) — Crime Reduction Toolkit', url: 'https://www.college.police.uk/' },
    { title: 'Dehghanniri & Borrion — Crime scripting: a systematic review (European Journal of Criminology, 2021)', url: 'https://doi.org/10.1177/1477370819850943' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
});
