/* Room: Intelligencecyclus, CSAE & gestructureerd analyseren */

CS.registerRoom({
  id: 'intelligencecyclus',
  path: 'intelligence',
  order: 3,
  title: 'Intelligencecyclus, CSAE & gestructureerd analyseren',
  icon: '🔄',
  difficulty: 'Gemiddeld',
  minutes: 75,
  summary: 'Van ruwe data naar een onderbouwd oordeel: de intelligencecyclus en de "so what?"-test, CSAE, bronnen beoordelen met de Admiralty Code, waarschijnlijkheidstaal met een apart betrouwbaarheidsniveau, hypothesen afwegen met ACH en je eigen denkfouten bestrijden.',
  objectives: [
    'De stappen van de intelligencecyclus benoemen en op elk product de "so what?"-test toepassen',
    'Ruwe data via CSAE omzetten naar entiteiten met herkomst en tijd, en de juiste partners betrekken',
    'Kwantitatieve en kwalitatieve informatie combineren tot één onderbouwd oordeel',
    'Een bron beoordelen met de Admiralty Code: betrouwbaarheid (A–F) en geloofwaardigheid (1–6) apart',
    'Waarschijnlijkheidstaal (yardstick) correct gebruiken en het betrouwbaarheidsniveau apart aangeven',
    'Hypothesen gestructureerd afwegen met ACH (met gevoeligheidscheck en indicatoren) en veelvoorkomende denkfouten met tegenmaatregelen bestrijden',
  ],
  tasks: [
    {
      title: 'Taak 1 — De intelligencecyclus en de "so what?"-test',
      content: `
        <p>Een analist krijgt elke dag meer binnen dan hij kan verwerken: logs, rapporten, tips, tweets, meldingen.
        Zonder structuur word je een doorgeefluik van losse feitjes. De <strong>intelligencecyclus</strong> is het
        werkproces dat van ruwe data een <em>bruikbaar oordeel</em> maakt. Het is geen eenmalig recept maar een cyclus:
        je komt steeds terug bij het begin.</p>

        <h3>De analogie van de kok</h3>
        <p>Een kok begint niet met koken, maar met de vraag "voor wie kook ik en wat willen ze eten?" (richten). Daarna
        haalt hij boodschappen (verzamelen), wast en snijdt hij (verwerken), bereidt en proeft hij (analyseren) en zet
        hij het gerecht op tafel (verspreiden). Komt het bord terug omdat het te zout was, dan past hij het de volgende
        keer aan (feedback). Boodschappen zonder bestelling worden een dure, willekeurige maaltijd — net als
        verzamelen zonder vraag.</p>

        <h3>De vijf stappen (plus feedback)</h3>
        <ol>
          <li><strong>Richten</strong> (direction) — wat willen we weten? Je vertaalt de vraag van een opdrachtgever
          naar een concrete <em>intelligence requirement</em>, bijvoorbeeld: "welke groepen vallen deze maand
          Nederlandse gemeenten aan, en hoe komen ze binnen?"</li>
          <li><strong>Verzamelen</strong> (collection) — gericht bronnen raadplegen die op die vraag antwoord geven:
          eigen logs, partnerrapporten, open bronnen, het NCSC.</li>
          <li><strong>Verwerken</strong> (processing) — ruwe data ordenen, ontdubbelen, vertalen en in een vast formaat
          zetten, zodat je ermee kunt werken.</li>
          <li><strong>Analyseren</strong> — duiden: wat betekent dit voor óns? Hier beoordeel je bronnen, weeg je
          hypothesen af en formuleer je een oordeel met de juiste onzekerheid.</li>
          <li><strong>Verspreiden</strong> (dissemination) — het juiste product naar de juiste mensen, op het juiste
          moment en in de juiste taal: een IOC-lijst naar het SOC, een notitie van een halve pagina naar de directie.</li>
        </ol>
        <p>En dan de lijm die alles verbindt: <strong>feedback</strong>. Was het product bruikbaar? Wat miste de
        ontvanger nog? Die terugkoppeling stuurt de volgende ronde en scherpt je requirements aan.</p>

        <figure class="diagram">
          <svg viewBox="0 0 320 320" role="img" aria-label="De intelligencecyclus als kringloop">
            <circle cx="160" cy="160" r="110" fill="none" stroke="var(--muted)" stroke-dasharray="4 6"/>
            <circle cx="160" cy="50" r="26" fill="var(--accent-soft)" stroke="currentColor"/>
            <circle cx="255" cy="115" r="26" fill="var(--accent-soft)" stroke="currentColor"/>
            <circle cx="218" cy="248" r="26" fill="var(--accent-soft)" stroke="currentColor"/>
            <circle cx="102" cy="248" r="26" fill="var(--accent-soft)" stroke="currentColor"/>
            <circle cx="65" cy="115" r="26" fill="var(--accent-soft)" stroke="currentColor"/>
            <text x="160" y="54" text-anchor="middle" fill="currentColor" font-size="13">Richten</text>
            <text x="255" y="119" text-anchor="middle" fill="currentColor" font-size="13">Verzamelen</text>
            <text x="218" y="252" text-anchor="middle" fill="currentColor" font-size="13">Verwerken</text>
            <text x="102" y="252" text-anchor="middle" fill="currentColor" font-size="13">Analyseren</text>
            <text x="65" y="119" text-anchor="middle" fill="currentColor" font-size="13">Verspreiden</text>
            <text x="160" y="165" text-anchor="middle" fill="currentColor" font-size="13">feedback</text>
            <text x="160" y="183" text-anchor="middle" fill="var(--muted)" font-size="11">stuurt de ronde</text>
          </svg>
          <figcaption>De intelligencecyclus draait rond: feedback in het midden stuurt elke nieuwe ronde.</figcaption>
        </figure>

        <h3>De "so what?"-test</h3>
        <p>Het grootste risico voor een analist is een mooi, uitgebreid product dat de ontvanger niets oplevert. Daarom
        houd je elk oordeel tegen het licht met de <strong>"so what?"-test</strong>: <em>dus wat?</em> Als je een feit
        of conclusie opschrijft, vraag je door: en dus? Wat moet de lezer hierdoor anders doen of beslissen? Kun je die
        vraag niet beantwoorden, dan is het achtergrondruis en haal je het weg.</p>
        <p>Voorbeeld. "We zagen 2.000 scanpogingen op onze firewall." So what? Scannen is er altijd; hier verandert
        niemand zijn dag voor. Maar: "Een groep die deze week drie gemeenten raakte, scant nu ook onze gateway op
        exact de kwetsbaarheid die wij nog niet gepatcht hebben." So what? Patch vanavond. Datzelfde feit, nu met
        betekenis én een handeling. Goede intelligence eindigt niet bij "dit zagen we", maar bij "en daarom raden we
        dit aan".</p>

        <div class="callout tip">
          <strong>Beloning:</strong> je eerste vlag voor deze room is <code>NM{so_what_maakt_intel}</code>. Onthoud
          waarom: data wordt pas intelligence als de "so what?" beantwoord is.
        </div>
      `,
      questions: [
        { q: 'In welke stap vertaal je de vraag van de opdrachtgever naar een concrete intelligence requirement?', options: ['Richten', 'Verzamelen', 'Verwerken', 'Verspreiden'], answer: 0, explain: 'Richten (direction) bepaalt wat je wilt weten; zonder die vraag verzamel je willekeurig.' },
        { q: 'Welk element verbindt alle stappen en stuurt de volgende ronde van de cyclus?', answer: ['feedback', 'terugkoppeling'], hint: 'Was het product bruikbaar? Wat miste de ontvanger?', explain: 'Feedback scherpt je requirements aan en maakt van de cyclus een kringloop in plaats van een eenmalige lijn.' },
        { q: 'Wat is de kern van de "so what?"-test?', options: ['Vragen welke handeling of beslissing dit feit oplevert voor de lezer', 'Zoveel mogelijk feiten toevoegen', 'Alleen technische details vermelden', 'De bron verzwijgen'], answer: 0, explain: 'Levert een feit geen handeling of beslissing op, dan is het ruis en haal je het weg.' },
        { q: 'Wat is de vlag die als beloning in deze taak staat?', answer: ['NM{so_what_maakt_intel}'], hint: 'Kijk in de groene tip onderaan de taak.' },
      ],
    },

    {
      title: 'Taak 2 — Van losse data naar entiteiten: CSAE',
      content: `
        <p>De intelligencecyclus zegt <em>wat</em> je doet; <strong>CSAE</strong> is een handig ezelsbruggetje voor
        <em>hoe</em> je met de informatie zelf omgaat. CSAE staat voor <strong>Collect, Store, Analyse, Engage</strong>.</p>

        <h3>Collect — gericht verzamelen</h3>
        <p>Verzamel vanuit je requirement, niet "alles wat los en vast zit". Een berg data die niemand besteld heeft, is
        een berg werk zonder opbrengst. Vraag je bij elke bron af: beantwoordt dit mijn vraag, en mag ik dit (privacy,
        opsec, juridisch)?</p>

        <h3>Store — bewaren als entiteiten met herkomst én tijd</h3>
        <p>Dit is de belangrijkste stap en wordt het vaakst overgeslagen. Bewaar informatie niet als losse zinnen in een
        document, maar als <strong>entiteiten</strong>: een IP-adres, een domein, een e-mailadres, een hash, een alias,
        een wallet. Leg bij elke entiteit twee dingen vast:</p>
        <ul>
          <li><strong>Herkomst</strong> — waar komt dit vandaan? ("passive DNS", "crt.sh", "WHOIS", "rapport van
          partner X"). Zo kun je later de betrouwbaarheid wegen en je bron teruglezen.</li>
          <li><strong>Tijd</strong> — wanneer was dit waar? Een domein dat in januari naar een kwaadaardig IP wees, kan
          in maart alweer van iemand anders zijn. Zonder tijd is een indicator niet te vertrouwen.</li>
        </ul>
        <p>Een relatie tussen entiteiten (domein <em>resolvet naar</em> IP) bewaar je net zo, met herkomst en tijd
        erbij. Zo bouw je een graaf die je later kunt doorzoeken en combineren — precies wat je in de room over OSINT en
        pivoting gaat doen.</p>

        <h3>Analyse — duiden en labelen</h3>
        <p>Nu geef je betekenis. Houd daarbij streng uit elkaar wat je wéét en wat je dénkt. Gebruik de
        <strong>labeling-conventie</strong>:</p>
        <table>
          <thead><tr><th>Label</th><th>Betekenis</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td><strong>bekend</strong></td><td>Feit of directe waarneming</td><td>"Het domein presenteerde op 3 jan een TLS-certificaat met serienummer A1B2."</td></tr>
            <tr><td><strong>afgeleid</strong></td><td>Analytische conclusie uit bewijs</td><td>"Omdat beide zaken hetzelfde certificaat delen, horen ze afgeleid bij dezelfde actor."</td></tr>
            <tr><td><strong>aanname</strong></td><td>Onbewezen, nog in te vullen</td><td>"We nemen aan dat de actor Nederlandstalig is (nog niet onderbouwd)."</td></tr>
          </tbody>
        </table>
        <p>Die drie woordjes maken je product eerlijk: de lezer ziet meteen waar het hard is en waar je gokt. Een
        aanname die als feit wordt gepresenteerd, is de meest voorkomende oorzaak van een verkeerde conclusie.</p>

        <h3>Engage — de juiste partners betrekken</h3>
        <p>Je werkt niet alleen. De laatste E dwingt je na te denken: wie moet dit weten, en wie weet meer dan ik?
        Betrek op tijd je SOC, een sectorpartner of ISAC, het NCSC, of (bij strafbare feiten) de politie. "Engage" is
        tweerichtingsverkeer: je deelt wat je hebt én je vraagt om wat anderen zien. Een goede analist weet dat
        samenwerken bijna altijd meer oplevert dan alleen puzzelen.</p>

        <div class="callout info">
          <strong>Koppeling:</strong> Store (entiteiten met herkomst en tijd) komt overeen met "verwerken" uit de
          cyclus; Analyse met "analyseren"; Engage met "verspreiden". CSAE is dus geen concurrent van de cyclus, maar
          een praktische checklist bij het omgaan met je data.
        </div>
      `,
      questions: [
        { q: 'Wat staat de E van CSAE voor?', answer: ['Engage', 'engage', 'betrekken'], hint: 'De juiste partners betrekken.', explain: 'Engage: betrek op tijd je SOC, partners, ISAC, NCSC of politie — en vraag ook om wat anderen zien.' },
        { q: 'Welke twee dingen leg je volgens de Store-stap altijd bij een entiteit vast?', options: ['Herkomst en tijd', 'Kleur en grootte', 'Prijs en eigenaar', 'Taal en land'], answer: 0, explain: 'Zonder herkomst kun je betrouwbaarheid niet wegen; zonder tijd weet je niet of de indicator nog klopt.' },
        { q: 'Je schrijft: "De actor is vermoedelijk Russisch", zonder enig bewijs. Welk label hoort hierbij?', options: ['bekend', 'afgeleid', 'aanname'], answer: 2, explain: 'Onbewezen en nog in te vullen: dat is een aanname. Presenteer het nooit als feit.' },
        { q: 'Je ziet in je eigen, geverifieerde log dat host WS-07 om 02:14 verbinding maakte met een C2-domein. Welk label past?', options: ['bekend', 'afgeleid', 'aanname'], answer: 0, explain: 'Een directe, geverifieerde waarneming is bekend (een feit).' },
      ],
    },

    {
      title: 'Taak 3 — Kwantitatief én kwalitatief combineren',
      content: `
        <p>Informatie komt in twee smaken. <strong>Kwantitatieve</strong> informatie is te tellen of te meten: 2.000
        scanpogingen, 14 besmette werkplekken, 300 GB uitgaand verkeer, een piek om 02:00 uur. <strong>Kwalitatieve</strong>
        informatie gaat over betekenis en context: het <em>motief</em> van een groep, de <em>intentie</em> achter een
        campagne, de inschatting van een ervaren analist, het verhaal achter de cijfers.</p>

        <h3>De analogie van de dokter</h3>
        <p>Een arts kijkt naar je bloedwaarden en temperatuur (kwantitatief), maar ook naar hoe je eruitziet, wat je
        vertelt en wat zijn ervaring hem influistert (kwalitatief). Alleen de cijfers maken van een arts een
        meetapparaat; alleen het gevoel maakt hem een waarzegger. De diagnose ontstaat als hij beide combineert.</p>

        <h3>Waarom je ze nodig hebt — allebei</h3>
        <ul>
          <li><strong>Cijfers zonder context misleiden.</strong> "Het aantal aanvallen is verdubbeld" klinkt alarmerend,
          maar misschien kwam dat doordat je een nieuwe sensor aanzette die nu méér ziet. De telling veranderde, de
          dreiging niet.</li>
          <li><strong>Context zonder cijfers is een mening.</strong> "Ik denk dat deze groep gevaarlijk is" overtuigt
          niemand. "Deze groep raakte in twee weken drie vergelijkbare gemeenten, met gemiddeld vier dagen tussen
          inbraak en versleuteling" geeft je mening een ruggengraat.</li>
        </ul>

        <h3>Combineren in de praktijk</h3>
        <p>Een sterk oordeel vlecht de twee door elkaar: je noemt het meetbare patroon (<em>bekend</em>), trekt daar een
        conclusie uit (<em>afgeleid</em>) en bent eerlijk over wat je nog invult (<em>aanname</em>). Bijvoorbeeld:</p>
        <div class="callout info">
          <strong>Voorbeeld-oordeel:</strong> "In drie weken zagen we 11 phishingmails met dezelfde nepfactuur
          (<em>bekend</em>, kwantitatief). De mails gebruikten telkens hetzelfde verhaal en dezelfde infrastructuur,
          wat afgeleid wijst op één actor (<em>afgeleid</em>, kwalitatief). We nemen aan dat de actor zich op de
          logistiek richt omdat alle doelwitten in die sector zitten (<em>aanname</em>, te toetsen)."
        </div>
        <p>Let op een valkuil: een getal voelt objectiever dan het is. "73% van de aanvallen" suggereert precisie, maar
        als het op 11 gevallen gebaseerd is, is het een grof percentage. Zeg dan liever "8 van de 11". En andersom:
        geef je een kwalitatief oordeel ("waarschijnlijk"), gebruik dan vaste waarschijnlijkheidstaal — daarover gaat
        taak 5.</p>
      `,
      questions: [
        { q: 'Welk soort informatie is "het motief en de intentie van een aanvalsgroep"?', options: ['Kwantitatief', 'Kwalitatief'], answer: 1, explain: 'Motief en intentie zijn niet te tellen; het is kwalitatieve, betekenisgevende informatie.' },
        { q: 'Waarom kan "het aantal aanvallen is verdubbeld" misleidend zijn zonder context?', options: ['Omdat de stijging door een nieuwe sensor kan komen die meer ziet, niet door meer dreiging', 'Omdat aanvallen nooit toenemen', 'Omdat cijfers altijd fout zijn', 'Omdat verdubbelen onmogelijk is'], answer: 0, explain: 'Een veranderde meting is niet hetzelfde als een veranderde werkelijkheid; context duidt het cijfer.' },
        { q: 'Je baseert "73%" op 11 gevallen. Wat is een eerlijker formulering?', options: ['8 van de 11', 'Bijna driekwart gegarandeerd', '73,0%', 'Heel veel'], answer: 0, explain: 'Bij kleine aantallen suggereert een percentage een precisie die er niet is; noem het absolute aantal.' },
      ],
    },

    {
      title: 'Taak 4 — Bronbeoordeling met de Admiralty Code',
      content: `
        <p>Niet elke bron is even goed, en niet elke claim van een goede bron is waar. Beginners gooien die twee op één
        hoop ("het komt van een betrouwbare partner, dus het klopt"). De <strong>Admiralty Code</strong> (ook wel het
        NAVO-systeem) dwingt je ze <em>apart</em> te scoren:</p>
        <ul>
          <li><strong>Betrouwbaarheid van de bron</strong> met een letter <strong>A–F</strong>: hoe goed is het
          trackrecord van deze bron?</li>
          <li><strong>Geloofwaardigheid van de informatie</strong> met een cijfer <strong>1–6</strong>: hoe
          waarschijnlijk is déze specifieke claim, los van wie hem doet?</li>
        </ul>

        <h3>De twee schalen</h3>
        <table>
          <thead><tr><th>Bron (A–F)</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td><strong>A</strong></td><td>Volledig betrouwbaar</td></tr>
            <tr><td><strong>B</strong></td><td>Meestal betrouwbaar</td></tr>
            <tr><td><strong>C</strong></td><td>Tamelijk betrouwbaar</td></tr>
            <tr><td><strong>D</strong></td><td>Niet altijd betrouwbaar</td></tr>
            <tr><td><strong>E</strong></td><td>Onbetrouwbaar</td></tr>
            <tr><td><strong>F</strong></td><td>Betrouwbaarheid niet te beoordelen</td></tr>
          </tbody>
        </table>
        <table>
          <thead><tr><th>Info (1–6)</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td><strong>1</strong></td><td>Bevestigd (door onafhankelijke bronnen)</td></tr>
            <tr><td><strong>2</strong></td><td>Waarschijnlijk waar</td></tr>
            <tr><td><strong>3</strong></td><td>Mogelijk waar</td></tr>
            <tr><td><strong>4</strong></td><td>Twijfelachtig</td></tr>
            <tr><td><strong>5</strong></td><td>Onwaarschijnlijk</td></tr>
            <tr><td><strong>6</strong></td><td>Niet te beoordelen</td></tr>
          </tbody>
        </table>

        <h3>Waarom apart?</h3>
        <p>Omdat de combinaties je iets leren. Een <strong>A1</strong> (geverifieerde eigen waarneming, bevestigd) mag je
        vertrouwen. Een <strong>E4</strong> (onbetrouwbare bron, twijfelachtige claim) niet. Maar let op de lastige
        tussengevallen: een <strong>B2</strong> komt van een partner die je vertrouwt, maar de claim is nog niet
        bevestigd — handel er voorzichtig naar en probeer te verifiëren. En een geweldige bron kan onzin vertellen
        (A5), terwijl een twijfelachtige bron toevallig gelijk heeft (E2). Door bron en info los te scoren, blijf je
        scherp.</p>
        <div class="callout warn">
          <strong>Veelgemaakte fout:</strong> een anonieme tip krijgt vaak automatisch een hoge geloofwaardigheid als
          hij "eng genoeg" klinkt. Fout: een anonieme bron heeft geen trackrecord (lage letter) én een onbevestigde
          claim blijft laag op de cijferschaal — tenzij een onafhankelijke bron hem bevestigt.
        </div>

        <h3>Oefening</h3>
        <p>In het lab hieronder staan vijf situaties. Scoor telkens de bron (A–F) én de info (1–6) apart, en vergelijk
        daarna met het expertoordeel. Denk hardop: wat weet ik over het trackrecord van deze bron, en hoe sterk is
        juist deze claim?</p>

        <div class="callout tip">
          <strong>Beloning:</strong> de tweede vlag van deze room vat het kernidee samen —
          <code>NM{bron_en_info_apart}</code>. Beoordeel bron en informatie altijd los van elkaar.
        </div>
      `,
      lab: {
        type: 'admiralty',
        items: [
          { source: 'Een gebeurtenis in je eigen SIEM, bevestigd door een tweede, onafhankelijke logbron', info: 'Werkplek WS-07 maakte om 02:14 verbinding met een bekend C2-domein', reliability: 'A', credibility: '1', explain: 'Je eigen, geverifieerde telemetrie is een volledig betrouwbare bron (A). Een tweede onafhankelijke logbron bevestigt de waarneming, dus de info is bevestigd (1): A1.' },
          { source: 'Een anonieme, onbevestigde tip via Meld Misdaad Anoniem', info: 'Bedrijf X wordt volgende week geraakt door ransomware', reliability: 'E', credibility: '4', explain: 'Een anonieme bron heeft geen trackrecord en is niet te verifiëren — in de praktijk scoor je die laag (E). De claim staat op zichzelf en is twijfelachtig (4): E4.' },
          { source: 'Een sectorpartner (ISAC) die je al jaren kent en die een goed trackrecord heeft, nog niet door jou geverifieerd', info: 'Er circuleert een nieuwe phishinggolf tegen de logistiek', reliability: 'B', credibility: '2', explain: 'Een partner met een goed trackrecord is meestal betrouwbaar (B). De claim klinkt plausibel maar is door jou nog niet bevestigd: waarschijnlijk waar (2): B2.' },
          { source: 'Een claim op de leksite van een ransomwaregroep zelf', info: 'Wij hebben gemeente Y versleuteld en 300 GB data buitgemaakt', reliability: 'D', credibility: '3', explain: 'Criminele groepen overdrijven, hergebruiken oude slachtoffers en liegen om druk te zetten: niet altijd betrouwbaar (D). De claim kan kloppen maar is onbevestigd: mogelijk waar (3): D3.' },
          { source: 'Een technisch rapport van een gerenommeerde securityleverancier met IOC\'s en onderbouwing', info: 'Campagne Z gebruikt een kwetsbaarheid in een VPN-gateway voor initiële toegang', reliability: 'B', credibility: '2', explain: 'Een gerenommeerde leverancier is doorgaans betrouwbaar (B). Het rapport is onderbouwd maar nog niet in jouw omgeving bevestigd (2): B2. Verifieer in je eigen logs om naar 1 te komen.' },
        ],
      },
      questions: [
        { q: 'Wat meet de letterschaal A–F in de Admiralty Code?', options: ['De betrouwbaarheid (het trackrecord) van de bron', 'De geloofwaardigheid van de claim', 'De ernst van de aanval', 'De snelheid van de reactie'], answer: 0, explain: 'A–F gaat over de bron; het cijfer 1–6 gaat apart over de specifieke informatie.' },
        { q: 'Welke score hoort bij een geverifieerde, door een tweede bron bevestigde waarneming uit je eigen SIEM?', answer: ['A1', 'a1'], hint: 'Volledig betrouwbare bron + bevestigde info.', explain: 'Eigen geverifieerde telemetrie = A; bevestigd door een onafhankelijke bron = 1. Samen A1.' },
        { q: 'Een partner met een goed trackrecord meldt iets wat jij nog niet hebt kunnen bevestigen. Welke score past het best?', options: ['A1', 'B2', 'E4', 'F6'], answer: 1, explain: 'Betrouwbare bron (B), plausibele maar onbevestigde claim (2): B2. Verifieer voor je er zwaar op leunt.' },
        { q: 'Wat is de vlag die hoort bij het kernidee van deze taak?', answer: ['NM{bron_en_info_apart}'], hint: 'Staat in de groene tip onderaan.' },
      ],
    },

    {
      title: 'Taak 5 — Waarschijnlijkheidstaal: de yardstick (plus een apart betrouwbaarheidsniveau)',
      content: `
        <p>"Waarschijnlijk" betekent voor de ene lezer 60% en voor de andere 90%. Dat is een probleem: een directeur die
        op jouw "waarschijnlijk" een dure beslissing neemt, moet weten wat je bedoelt. Daarom gebruiken
        inlichtingendiensten een <strong>waarschijnlijkheidstaal</strong> (de <em>probability yardstick</em>): een vaste
        set woorden die elk bij een percentagebereik horen.</p>

        <h3>De standaardbanden</h3>
        <table>
          <thead><tr><th>Term</th><th>Ongeveer</th></tr></thead>
          <tbody>
            <tr><td>vrijwel uitgesloten</td><td>0–5%</td></tr>
            <tr><td>zeer onwaarschijnlijk</td><td>10–20%</td></tr>
            <tr><td>onwaarschijnlijk</td><td>25–35%</td></tr>
            <tr><td>reële kans</td><td>40–50%</td></tr>
            <tr><td>waarschijnlijk</td><td>55–75%</td></tr>
            <tr><td>zeer waarschijnlijk</td><td>80–90%</td></tr>
            <tr><td>vrijwel zeker</td><td>95–100%</td></tr>
          </tbody>
        </table>
        <p>Let op de <strong>gaten</strong> tussen de banden (bijvoorbeeld tussen 75% en 80%). Die zijn er expres: ze
        voorkomen dat je doet alsof je op de procent nauwkeurig bent. Een oordeel is geen weegschaal.</p>

        <h3>Waarschijnlijkheid is NIET hetzelfde als betrouwbaarheid</h3>
        <p>Dit is de valkuil waar bijna iedereen intrapt. Twee dingen die je <em>apart</em> moet aangeven:</p>
        <ul>
          <li><strong>Waarschijnlijkheid</strong> — hoe waarschijnlijk is het dat de bewering waar is? (de yardstick)</li>
          <li><strong>Betrouwbaarheidsniveau</strong> (confidence) — hoe stevig is je oordeel? Dit hangt af van de
          kwaliteit en hoeveelheid bronnen, hun onderlinge bevestiging en het ontbreken van grote aannames. Je drukt het
          vaak uit als <em>laag / midden / hoog</em>.</li>
        </ul>
        <div class="callout info">
          <strong>Voorbeeld:</strong> "Het is <strong>waarschijnlijk</strong> (55–75%) dat groep KOFFIEKAT achter de
          aanval zit — <strong>betrouwbaarheidsniveau: midden</strong>, omdat we op twee bronnen leunen en één
          sleutelaanname nog niet getoetst is." Je kunt dus heel <em>waarschijnlijk</em> iets vinden met een
          <em>laag</em> betrouwbaarheidsniveau (één wankele bron), of iets een <em>reële kans</em> geven met een
          <em>hoog</em> niveau (veel goede bronnen die naar een onzekere uitkomst wijzen).
        </div>

        <h3>Oefening</h3>
        <p>In het lab zet je per term een percentage op de schuif. Probeer de band te raken. Oefen daarna hardop:
        formuleer een oordeel over een fictieve zaak waarin je zowel een term van de yardstick als een apart
        betrouwbaarheidsniveau noemt. Een goede analist geeft altijd beide.</p>
      `,
      lab: {
        type: 'probability',
        items: [
          { term: 'vrijwel uitgesloten', low: 0, high: 5 },
          { term: 'zeer onwaarschijnlijk', low: 10, high: 20 },
          { term: 'onwaarschijnlijk', low: 25, high: 35 },
          { term: 'reële kans', low: 40, high: 50 },
          { term: 'waarschijnlijk', low: 55, high: 75 },
          { term: 'zeer waarschijnlijk', low: 80, high: 90 },
          { term: 'vrijwel zeker', low: 95, high: 100 },
        ],
      },
      questions: [
        { q: 'Welk percentagebereik hoort bij de term "waarschijnlijk" op de yardstick?', answer: ['55-75', '55–75', '55 tot 75', '55-75%'], hint: 'Kijk in de tabel met standaardbanden.', explain: 'In deze yardstick staat "waarschijnlijk" voor ongeveer 55–75%.' },
        { q: 'Waarom zitten er gaten tussen de banden van de yardstick?', options: ['Om schijnprecisie te voorkomen — een oordeel is niet op de procent nauwkeurig', 'Omdat sommige percentages verboden zijn', 'Om ruimte te laten voor reclame', 'Dat is een drukfout'], answer: 0, explain: 'De gaten laten zien dat je een inschatting geeft, geen meting.' },
        { q: 'Je leunt op één wankele bron, maar vindt de bewering toch heel waarschijnlijk. Wat geef je apart aan?', options: ['Een laag betrouwbaarheidsniveau', 'Een hoger percentage', 'Niets, dat hoeft niet', 'Een andere yardstick'], answer: 0, explain: 'Waarschijnlijkheid en betrouwbaarheid staan los: hoge waarschijnlijkheid kan samengaan met een laag betrouwbaarheidsniveau.' },
        { q: 'Wat drukt het betrouwbaarheidsniveau (confidence) uit?', options: ['Hoe stevig je oordeel is, op basis van bron-kwaliteit, aantal en aannames', 'De kans dat de bewering waar is', 'De snelheid van de aanval', 'Het aantal slachtoffers'], answer: 0, explain: 'Confidence gaat over de stevigheid van je oordeel, niet over de kans zelf.' },
      ],
    },

    {
      title: 'Taak 6 — Hypothesen afwegen met ACH',
      content: `
        <p>Mensen pakken graag de eerste verklaring die past en zoeken daarna alleen nog bewijs dat die bevestigt. Dat is
        precies hoe attributie (wie zit erachter?) misgaat. <strong>Analysis of Competing Hypotheses</strong> (ACH), een
        methode van CIA-analist Richards Heuer, draait het om: je zet meerdere hypothesen náást elkaar en gaat actief op
        zoek naar bewijs dat ze <em>weerlegt</em>.</p>

        <h3>De kern: je weerlegt, je bevestigt niet</h3>
        <p>In ACH maak je een matrix: de hypothesen bovenaan, de bewijsstukken links. Per cel beoordeel je of het bewijs
        <strong>C</strong> (consistent — past bij deze hypothese), <strong>I</strong> (inconsistent — spreekt deze
        hypothese tegen) of <strong>N</strong> (neutraal — zegt niets) is. Daarna tel je per hypothese de
        <strong>I's</strong>. De winnaar is <em>niet</em> de hypothese met de meeste C's, maar die met de
        <strong>minste inconsistenties</strong>: de verklaring die je op basis van het bewijs niet kunt wegstrepen.</p>
        <div class="callout info">
          <strong>Waarom tellen de I's en niet de C's?</strong> Eén tegenbewijs (I) kan een hele hypothese onderuithalen,
          terwijl tien keer "dat past ook wel" (C) niets bewijst — bijna alles past bij meerdere verklaringen. Zoeken
          naar wat een hypothese <em>kapot</em> maakt, is sterker dan zoeken naar wat haar steunt.
        </div>

        <h3>Niet-diagnostisch bewijs</h3>
        <p>Een bewijsstuk dat bij álle hypothesen consistent is (overal C), helpt je niet kiezen: het is
        <strong>niet-diagnostisch</strong>. "De aanval begon met phishing" past bij vrijwel elke dader. Zulk bewijs mag
        in je rapport, maar laat het je oordeel niet sturen. ACH maakt dit zichtbaar.</p>

        <h3>Gevoeligheidscheck en indicatoren</h3>
        <ul>
          <li><strong>Gevoeligheidscheck:</strong> kijk welke paar bewijsstukken je conclusie dragen. Vraag per stuk:
          "als dit vals of misleidend blijkt (bijvoorbeeld een bewuste false flag), verandert mijn conclusie dan?" Is je
          hele oordeel afhankelijk van één item, dan is het fragiel — zeg dat erbij.</li>
          <li><strong>Indicatoren:</strong> benoem vooraf wat je in de toekomst zou moeten zien als een bepaalde
          hypothese waar is. Zie je die signalen (bijvoorbeeld "de groep verschijnt op een crimineel forum"), dan wint
          die hypothese terrein; blijven ze uit, dan verliest ze. Zo blijf je toetsen in plaats van vastklampen.</li>
        </ul>

        <h3>Oefening: wie zit achter de aanval?</h3>
        <p>In het lab staat een fictieve attributievraag met drie hypothesen (een statelijke actor, een financieel
        gemotiveerde ransomwaregroep en een hacktivistisch collectief) en vijf bewijsstukken. Vul de matrix zelf in met
        C/I/N, tel de inconsistenties en vergelijk met het expertoordeel. Welke hypothese houdt de minste I's over?</p>

        <div class="callout tip">
          <strong>Beloning:</strong> de derde vlag vat de regel samen — <code>NM{minste_i_wint}</code>. In ACH wint de
          hypothese met de minste inconsistenties.
        </div>
      `,
      lab: {
        type: 'ach',
        question: 'Wie zit achter de aanval op een reeks Nederlandse organisaties?',
        hypotheses: ['Statelijke actor (spionage)', 'Financieel gemotiveerde ransomwaregroep', 'Hacktivistisch collectief'],
        evidence: [
          { text: 'Er is een losgeldbrief achtergelaten met een Tor-onderhandelingsportaal en een cryptowallet', expert: ['I', 'C', 'I'] },
          { text: 'De gebruikte malware is een bekende Ransomware-as-a-Service (RaaS) die door wisselende affiliates wordt ingezet', expert: ['I', 'C', 'I'] },
          { text: 'De slachtoffers zitten in heel verschillende sectoren (logistiek, zorg, productie), zonder gemeenschappelijke politieke lijn', expert: ['I', 'C', 'I'] },
          { text: 'De groep past dubbele afpersing toe: gestolen data komt op een leksite als er niet wordt betaald', expert: ['N', 'C', 'N'] },
          { text: 'De eerste toegang verliep via spearphishing met een kwaadaardige bijlage', expert: ['C', 'C', 'C'] },
        ],
      },
      questions: [
        { q: 'Welke letter tel je in ACH om de zwakste hypothesen weg te strepen?', answer: ['I', 'i', 'inconsistent', 'inconsistenties'], hint: 'Je weerlegt, je bevestigt niet.', explain: 'Je telt de inconsistenties (I). De hypothese met de minste I\'s blijft het sterkst overeind.' },
        { q: 'Welke hypothese houdt in de oefening de minste inconsistenties over en wint dus?', options: ['Statelijke actor (spionage)', 'Financieel gemotiveerde ransomwaregroep', 'Hacktivistisch collectief', 'Ze eindigen gelijk'], answer: 1, explain: 'Losgeldportaal, RaaS, brede/opportunistische doelwitten en dubbele afpersing zijn allemaal consistent met een financieel gemotiveerde groep; die houdt nul I\'s over.' },
        { q: '"De aanval begon met phishing" is consistent met alle drie de hypothesen. Hoe heet zulk bewijs?', options: ['Niet-diagnostisch', 'Doorslaggevend', 'Een false flag', 'Een indicator'], answer: 0, explain: 'Bewijs dat bij alle hypothesen past, helpt je niet kiezen: het is niet-diagnostisch.' },
        { q: 'Wat controleer je met een gevoeligheidscheck?', options: ['Of je conclusie omvalt als één sleutelbewijs vals of misleidend blijkt', 'Hoeveel C\'s een hypothese heeft', 'Hoe snel je rapport af is', 'Welke kleur de matrix heeft'], answer: 0, explain: 'Je toetst hoe afhankelijk je oordeel is van een enkel bewijsstuk (bijvoorbeeld een bewuste false flag).' },
      ],
    },

    {
      title: 'Taak 7 — Denkfouten en hoe je ze bestrijdt',
      content: `
        <p>De gevaarlijkste fout in analyse zit niet in de data, maar in je eigen hoofd. Je brein neemt voortdurend
        sluiproutes (biases). Ze maken je snel, maar ook vatbaar voor systematische vergissingen. Wie ze kent, kan
        tegensturen.</p>

        <h3>Zes denkfouten die je vaak tegenkomt</h3>
        <table>
          <thead><tr><th>Denkfout</th><th>Wat het is</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td><strong>Confirmation bias</strong></td><td>Je ziet vooral bewijs dat je eerste idee bevestigt</td><td>Je denkt "het is groep X" en negeert alles wat daar niet bij past.</td></tr>
            <tr><td><strong>Anchoring</strong></td><td>Het eerste getal of idee blijft hangen als ankerpunt</td><td>De eerste schatting ("50 slachtoffers") kleurt al je latere inschattingen, ook als die te hoog was.</td></tr>
            <tr><td><strong>Mirror imaging</strong></td><td>Je gaat ervan uit dat de tegenstander denkt zoals jij</td><td>"Dat zou ik nooit zo doen, dus zij ook niet" — terwijl hun logica heel anders is.</td></tr>
            <tr><td><strong>"Tool = actor"</strong></td><td>Je verwart het gebruikte gereedschap met de dader</td><td>Twee aanvallen gebruiken dezelfde RaaS of tool, dus "het is dezelfde groep" — terwijl die tool door tientallen affiliates wordt gehuurd.</td></tr>
            <tr><td><strong>Availability bias</strong></td><td>Wat je makkelijk voor de geest komt, lijkt waarschijnlijker</td><td>Na een spraakmakende ransomware-zaak zie je overal ransomware, ook waar het iets anders is.</td></tr>
            <tr><td><strong>Groupthink</strong></td><td>Het team zoekt harmonie en niemand spreekt twijfel uit</td><td>Iedereen knikt mee met de teamleider; afwijkende signalen blijven onbesproken.</td></tr>
          </tbody>
        </table>

        <div class="callout warn">
          <strong>Let op "tool = actor":</strong> dit is in cyber-attributie de sluipmoordenaar. Gedeelde malware,
          gedeelde infrastructuur of een gedeelde taal (denk aan de ACH-oefening) zijn aanwijzingen, geen bewijs van
          identiteit. Het hele crime-as-a-service-ecosysteem bestaat erbij dat dezelfde tools door verschillende daders
          worden gebruikt.
        </div>

        <h3>Tegenmaatregelen</h3>
        <ul>
          <li><strong>Devil's advocate</strong> — wijs iemand aan die expres het tegendeel verdedigt. Het team móét de
          sterkste tegenargumenten horen, ook als niemand ze gelooft.</li>
          <li><strong>Key assumptions check</strong> — schrijf je sleutelaannames op en toets ze één voor één: waarop
          berust dit, en wat als het niet klopt? (Gebruik de labels <em>bekend / afgeleid / aanname</em> uit taak 2.)</li>
          <li><strong>Pre-mortem</strong> — stel je voor dat je conclusie over een half jaar compleet fout blijkt. Schrijf
          het verhaal hoe dat kon gebeuren. Zo zie je zwakke plekken vóórdat ze je inhalen.</li>
        </ul>
        <p>Deze technieken horen bij de bredere familie van <em>gestructureerde analysetechnieken</em>. ACH uit de vorige
        taak is er één van. Ze hebben allemaal hetzelfde doel: je trage, zorgvuldige denken inschakelen op het moment dat
        je snelle brein een sluiproute wil nemen.</p>

        <div class="callout tip">
          <strong>Onthoud:</strong> je raakt je biases nooit helemaal kwijt — zelfs weten dat ze bestaan beschermt je
          niet vanzelf. Wat wél werkt, is een vast proces: hypothesen náást elkaar (ACH), aannames expliciet labelen,
          en iemand laten tegenspreken.
        </div>
      `,
      questions: [
        { q: 'Twee aanvallen gebruiken dezelfde gehuurde RaaS, en je concludeert meteen "zelfde dader". Welke denkfout is dit?', options: ['"Tool = actor"', 'Anchoring', 'Availability bias', 'Groupthink'], answer: 0, explain: 'Gedeeld gereedschap is geen gedeelde identiteit; RaaS wordt door veel verschillende affiliates gebruikt.' },
        { q: 'Hoe heet de denkfout waarbij je aanneemt dat de tegenstander denkt en handelt zoals jij zou doen?', answer: ['mirror imaging', 'mirrorimaging', 'spiegelen'], hint: 'Je spiegelt je eigen logica op de ander.', explain: 'Mirror imaging: "dat zou ik nooit zo doen" is geen bewijs dat de tegenstander het ook niet doet.' },
        { q: 'Welke tegenmaatregel laat je je voorstellen dat je conclusie over een half jaar fout blijkt, om vooraf de zwakke plekken te vinden?', options: ['Pre-mortem', 'Anchoring', 'Confirmation bias', 'Mirror imaging'], answer: 0, explain: 'Bij een pre-mortem reconstrueer je vooraf hoe het mis kon gaan, zodat je de risico\'s op tijd ziet.' },
        { q: 'Je wijst expres iemand aan die het tegendeel van de teamconclusie moet verdedigen. Hoe heet die rol?', answer: ['devil\'s advocate', 'devils advocate', 'advocaat van de duivel'], hint: 'Advocaat van de duivel.', explain: 'De devil\'s advocate dwingt het team om de sterkste tegenargumenten serieus te horen en bestrijdt groupthink.' },
      ],
    },
  ],
  terms: [
    { term: 'Intelligencecyclus', def: 'Het terugkerende werkproces richten, verzamelen, verwerken, analyseren en verspreiden, met feedback die elke nieuwe ronde stuurt.' },
    { term: '"So what?"-test', def: 'Controle of een feit of conclusie een handeling of beslissing oplevert voor de lezer; zo niet, dan is het ruis.' },
    { term: 'CSAE', def: 'Collect, Store, Analyse, Engage: praktische checklist om data gericht te verzamelen, als entiteiten met herkomst en tijd te bewaren, te duiden en partners te betrekken.' },
    { term: 'Entiteit (met herkomst en tijd)', def: 'Een los te bewaren gegeven (IP, domein, hash, alias, wallet) met vermelding van de bron en het moment waarop het gold.' },
    { term: 'Labeling-conventie', def: 'Het expliciet markeren van beweringen als bekend (feit), afgeleid (conclusie) of aanname (onbewezen).' },
    { term: 'Admiralty Code', def: 'Systeem dat een bron op betrouwbaarheid (A–F) en de informatie op geloofwaardigheid (1–6) apart beoordeelt, bijvoorbeeld A1 of E4.' },
    { term: 'Waarschijnlijkheidstaal (yardstick)', def: 'Vaste set termen die elk bij een percentagebereik horen, van "vrijwel uitgesloten" tot "vrijwel zeker", met gaten tegen schijnprecisie.' },
    { term: 'Betrouwbaarheidsniveau (confidence)', def: 'Apart aangegeven maat voor hoe stevig een oordeel is, op basis van bronkwaliteit, aantal bronnen en openstaande aannames.' },
    { term: 'Analysis of Competing Hypotheses (ACH)', def: 'Methode van Heuer waarbij je hypothesen naast elkaar zet en de inconsistenties (I) telt; de hypothese met de minste I\'s wint. Bewijs dat bij alle hypothesen past is niet-diagnostisch.' },
    { term: 'Gevoeligheidscheck', def: 'Toets hoe afhankelijk je conclusie is van een enkel bewijsstuk, bijvoorbeeld als dat een bewuste false flag blijkt.' },
    { term: 'Mirror imaging', def: 'Denkfout waarbij je aanneemt dat de tegenstander denkt en handelt zoals jijzelf zou doen.' },
    { term: '"Tool = actor"', def: 'Denkfout waarbij gedeeld gereedschap of infrastructuur wordt verward met een gedeelde dader, terwijl tools gehuurd en gedeeld worden.' },
  ],
  resources: [
    { title: 'CIA — Psychology of Intelligence Analysis (Richards J. Heuer Jr.)', url: 'https://www.cia.gov/resources/csi/static/Pyschology-of-Intelligence-Analysis.pdf' },
    { title: 'GOV.UK — Explaining uncertainty in UK intelligence assessment (Probability Yardstick & confidence)', url: 'https://www.gov.uk/government/publications/explaining-uncertainty-in-uk-intelligence-assessment/explaining-uncertainty-in-uk-intelligence-assessment' },
    { title: 'GOV.UK — PHIA Common Analytical Standards', url: 'https://www.gov.uk/government/publications/phia-common-analytical-standards/phia-common-analytical-standards' },
    { title: 'SC World — How to leverage structured analytic techniques in threat intelligence', url: 'https://www.scworld.com/news/how-to-leverage-structured-analytic-techniques-in-threat-intelligence' },
  ],
});
