/* Room: Werkblad — alles in één werkproces (intelligence) */
CS.registerRoom({
  id: 'werkblad-intel',
  path: 'intelligence',
  order: 8,
  title: 'Werkblad: alles in één werkproces',
  icon: '🗂️',
  difficulty: 'Gemiddeld',
  minutes: 50,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Het sluitstuk van het intelligence-pad: alle technieken uit de vorige lessen samengebracht in één werkproces, met een checklist die je bij elke zaak kunt aflopen, de valkuilen die je wilt vermijden, en een eindoefening waarin je een casus naar een BLUF-product herschrijft.',
  objectives: [
    'Het volledige intelligence-werkproces in stappen benoemen: van richten tot product',
    'Een checklist afwerken die je bij elke nieuwe zaak kunt gebruiken',
    'De veelgemaakte fouten herkennen en er een tegenmiddel tegenover zetten',
    'Je werk kwaliteitsborgen met peer review, labeling en vastgelegde herkomst',
    'Een korte casus herschrijven naar een BLUF-product met concreet interventieadvies',
  ],
  tasks: [
    {
      title: 'Taak 1 — Het werkproces in stappen',
      tryFirst: true,
      intro: `<p>In het lab staan zeven handelingen uit één fictieve zaak door elkaar. Zet ze in de volgorde waarin een
        analist ze uitvoert en beantwoord daarna de vragen. Loop je vast, klap dan de uitleg open.</p>`,
      content: `
        <p>In de vorige lessen leerde je losse technieken: de intelligencecyclus, CSAE, de Admiralty Code,
        waarschijnlijkheidstaal, ACH, de modellen (Kill Chain, ATT&CK, Diamond, Pyramid of Pain), pivoten en het
        BLUF-product. Het gaat erom dat je ze <strong>in de juiste volgorde</strong> inzet. Dit werkblad rijgt alles
        aan elkaar tot één werkproces dat je bij elke zaak kunt herhalen.</p>

        <h3>De zeven stappen</h3>
        <ol>
          <li><strong>Richten.</strong> Begin met de vraag, niet met de data. Wat wil de opdrachtgever weten, en
          waarom? Een scherpe <em>intelligence-vraag</em> ("Hangen deze twee phishingzaken samen, en wie zit erachter?")
          stuurt alles wat daarna komt. Zonder richting verzamel je eindeloos en concludeer je niets.</li>
          <li><strong>Verzamelen met CSAE.</strong> Verzamel gericht (Collect), bewaar elke entiteit mét herkomst en
          tijd (Store), duid wat je ziet (Analyse) en betrek op tijd je partners — SOC, ISAC, NCSC, politie (Engage).
          Een losse indicator zonder bron en datum is bijna waardeloos.</li>
          <li><strong>Modelleren.</strong> Leg je waarnemingen op de kaart. De <strong>Cyber Kill Chain</strong> ordent
          de aanval in fasen; <strong>MITRE ATT&CK</strong> codeert het gedrag (bijvoorbeeld T1566 phishing of T1486
          data-versleuteling); het <strong>Diamond Model</strong> verbindt tegenstander, capaciteit, infrastructuur en
          slachtoffer; de <strong>Pyramid of Pain</strong> vertelt je hoeveel pijn een indicator de aanvaller doet.</li>
          <li><strong>Pivoten.</strong> Verken de infrastructuur: van domein naar IP, naar certificaat, naar wallet.
          Zoek het bruggende kenmerk tussen zaken — een herbruikt TLS-certificaat verbindt soms twee zaken die op het
          eerste gezicht los staan. Toets steeds de <em>zeldzaamheid</em>: een gedeeld cert zegt meer dan een gedeelde
          populaire favicon.</li>
          <li><strong>Analyseren.</strong> Weeg je bronnen met de Admiralty Code (betrouwbaarheid A–F én
          geloofwaardigheid 1–6, apart), zet hypothesen tegen elkaar met ACH (je weerlegt, je bevestigt niet) en
          druk kansen uit in waarschijnlijkheidstaal met een band ("waarschijnlijk", 55–75%), met het
          betrouwbaarheidsniveau er los naast.</li>
          <li><strong>Product maken.</strong> Giet je oordeel in een <strong>BLUF</strong>-product: de conclusie
          bovenaan, kort, met de onzekerheid apart benoemd. Daaronder het verhaal.</li>
          <li><strong>Interventieadvies.</strong> Een product zonder "en dus?" is een boekverslag. Sluit af met
          concreet advies: wát, wáárom, wíe (eigenaar) en wannéér, inclusief de risico's.</li>
        </ol>

        <div class="callout tip"><strong>Onthoud de richting:</strong> het proces loopt van de vraag naar het advies, niet
        andersom. Wie met de data begint in plaats van met de vraag, verdwaalt.</div>
      `,
      lab: {
        type: 'ordering',
        title: 'zaak 2026-031, Noordkade Logistiek',
        prompt: 'Zaak 2026-031 (fictief): phishing bij Noordkade Logistiek. Zet de zeven handelingen in de volgorde van het werkproces.',
        items: [
          { id: 'ri', label: 'Analist en opdrachtgever leggen in één zin vast: "Hoort de phishing bij Noordkade Logistiek bij dezelfde campagne als die bij Veerdienst Westerdiep?"' },
          { id: 've', label: 'De analist slaat het domein factuur-portaal[.]nm[.]lab op met bron (mailgateway) en tijdstip, en vraagt het SOC wat zij zien.' },
          { id: 'mo', label: 'De waarnemingen krijgen een fase in de Kill Chain en een ATT&CK-code (T1566 voor de phishingmail).' },
          { id: 'pi', label: 'Via passive DNS en certificate transparency zoekt de analist welke andere domeinen hetzelfde certificaat gebruiken.' },
          { id: 'an', label: 'Elke bron krijgt een Admiralty-oordeel en twee hypothesen komen tegenover elkaar in een ACH-matrix.' },
          { id: 'pr', label: 'De analist schrijft bovenaan: "Waarschijnlijk dezelfde campagne", met de onzekerheid in een aparte alinea.' },
          { id: 'ad', label: 'Onder het product komt: het SOC blokkeert vandaag beide domeinen, IT-beheer reset binnen 24 uur de wachtwoorden.' },
        ],
        correct: ['ri', 've', 'mo', 'pi', 'an', 'pr', 'ad'],
        flag: 'NM{eerst_de_vraag}',
        explain: 'Richten, verzamelen, modelleren, pivoten, analyseren, product, interventieadvies.',
      },
      questions: [
        { q: 'Waarmee begin je het werkproces: met de data of met de vraag?', options: ['Met de data die je toevallig hebt', 'Met een scherpe intelligence-vraag van de opdrachtgever', 'Met het BLUF-product', 'Met het interventieadvies'], answer: 1,
          wrong: { 0: 'Dan bepaalt het toeval wat je onderzoekt. Zonder vraag weet je niet welke data ertoe doet.', 2: 'Het product is de uitkomst van het proces, niet het begin.', 3: 'Een advies zonder analyse eronder is een mening.' },
          explain: 'Richten komt eerst: de vraag stuurt wat je verzamelt, modelleert en concludeert.' },
        { q: 'Op welke plek (1 tot 7) staat in de juiste volgorde de handeling met passive DNS en certificate transparency?', answer: ['4', 'plek 4'],
          hints: ['Bedenk welke stap van het werkproces dit is: de analist zoekt vanuit één kenmerk naar verwante infrastructuur.', 'Dat is pivoten. Tel in het lab welke handelingen ervoor moeten komen: de vraag, het vastleggen, het modelleren.', 'Het komt direct na de Kill Chain en ATT&CK, en vóór het Admiralty-oordeel.'],
          wrong: { '2': 'Stap 2 is verzamelen: vastleggen wat je al hebt, met bron en tijd. Vanuit een kenmerk naar nieuwe infrastructuur zoeken is pivoten, en dat komt later.', '5': 'Stap 5 is analyseren: bronnen wegen en hypothesen toetsen. Dat kan pas als het pivoten de verbanden heeft opgeleverd.', '3': 'Stap 3 is modelleren. Eerst orden je wat je hebt, daarna ga je gericht verder zoeken.' },
          why: 'Wie pivoteert voordat de vraag en het model er liggen, verzamelt eindeloos infrastructuur zonder te weten wat relevant is.',
          explain: 'Pivoten is stap 4: na richten, verzamelen en modelleren, en vóór analyseren.' },
        { q: 'Welke vlag toont het lab als alle zeven handelingen op de juiste plek staan?', answer: ['NM{eerst_de_vraag}'],
          hints: ['De knop "Controleer volgorde" vertelt hoeveel handelingen goed staan.', 'Begin met de handeling waarin nog niets is verzameld, en eindig met de handeling waarin iemand een taak met een deadline krijgt.', 'Volgorde: vraag vastleggen, domein opslaan, Kill Chain en ATT&CK, passive DNS, Admiralty en ACH, de conclusie schrijven, het advies met eigenaren.'],
          explain: 'De volgorde is richten, verzamelen, modelleren, pivoten, analyseren, product, interventieadvies.' },
      ],
    },

    {
      title: 'Taak 2 — De checklist die je bij elke zaak afloopt',
      tryFirst: true,
      intro: `<p>Een collega draagt zaak 2026-031 aan je over. In het lab staat het entiteitenregister. Controleer het
        zoals je een overdracht hoort te controleren: wat ontbreekt er, en wat staat er onveilig in? De checklist zelf
        staat in de uitleg.</p>`,
      content: `
        <p>Een werkproces dat alleen in je hoofd zit, sla je onder druk over. Daarom giet je het in een
        <strong>checklist</strong>: een lijst die je letterlijk afvinkt, net als een piloot vóór het opstijgen. Niet
        omdat je de stof niet kent, maar omdat ook ervaren mensen onder tijdsdruk stappen vergeten.</p>

        <h3>Checklist intelligence-zaak</h3>
        <ol>
          <li><strong>Richten</strong>
            <ul>
              <li>De intelligence-vraag staat op papier, in één zin.</li>
              <li>Duidelijk wie de opdrachtgever is en waarvoor het product dient (strategisch, tactisch of operationeel).</li>
            </ul>
          </li>
          <li><strong>Verzamelen (CSAE)</strong>
            <ul>
              <li>Elke entiteit (IP, domein, hash, wallet, e-mail, alias) is opgeslagen mét herkomst en tijd.</li>
              <li>Indicatoren zijn "defanged" bewaard (hxxp, 185.220.101[.]4) zodat niemand er per ongeluk op klikt.</li>
              <li>Partners (SOC, ISAC, NCSC, politie) zijn op tijd betrokken — en je hebt gevraagd wat zíj zien.</li>
            </ul>
          </li>
          <li><strong>Modelleren</strong>
            <ul>
              <li>De aanval is in de Kill Chain-fasen gezet.</li>
              <li>Het gedrag is gecodeerd met echte ATT&CK-ID's.</li>
              <li>De Diamond-hoekpunten zijn ingevuld (voor zover bekend) en de Pyramid of Pain zegt hoe waardevol je indicatoren zijn.</li>
            </ul>
          </li>
          <li><strong>Pivoten</strong>
            <ul>
              <li>De relaties staan in een graaf of tabel, elk met tijd en herkomst.</li>
              <li>Het bruggende kenmerk tussen zaken is benoemd én op zeldzaamheid getoetst.</li>
              <li>Opsec bewaakt: geen actief contact met de infrastructuur van de verdachte, geen verraderlijke uploads.</li>
            </ul>
          </li>
          <li><strong>Analyseren</strong>
            <ul>
              <li>Elke bron heeft een Admiralty-oordeel (bron A–F én info 1–6, apart).</li>
              <li>De hypothesen zijn met ACH afgewogen; niet-diagnostisch bewijs is herkend.</li>
              <li>Kansen staan in waarschijnlijkheidstaal, met het betrouwbaarheidsniveau er los naast.</li>
            </ul>
          </li>
          <li><strong>Product + advies</strong>
            <ul>
              <li>De conclusie staat bovenaan (BLUF) en is korter dan de bron.</li>
              <li>De onzekerheid staat apart benoemd, niet weggemoffeld.</li>
              <li>Elk interventieadvies heeft een eigenaar, een moment en een risico-afweging.</li>
            </ul>
          </li>
          <li><strong>Kwaliteit (zie taak 4)</strong>
            <ul>
              <li>Een collega heeft meegelezen (peer review).</li>
              <li>Alles is gelabeld als bekend, afgeleid of aanname.</li>
            </ul>
          </li>
        </ol>

        <div class="callout info"><strong>Waarom dit werkt:</strong> een checklist verlaagt de kans dat je de saaie-maar-
        cruciale stappen (herkomst vastleggen, bronnen wegen, onzekerheid benoemen) overslaat als het druk wordt. Het
        kost een paar minuten en redt je rapport in de rechtszaal.</div>
      `,
      lab: {
        type: 'logs',
        title: 'zaak-2026-031/entiteiten.csv',
        lines: `id;type;waarde;bron;waargenomen_utc;opmerking
E01;domein;factuur-portaal[.]nm[.]lab;mailgateway;2026-03-02 08:14;link in phishingmail
E02;ip;203.0.113[.]44;passive DNS;2026-03-02 09:01;A-record van E01
E03;hash;9f2c7a1be04d55c3a8e6f0b1d2c3e4f5;interne sandbox;2026-03-02 10:20;bijlage factuur_maart.zip
E04;e-mail;administratie[at]factuur-portaal[.]nm[.]lab;mailgateway;2026-03-02 08:14;afzender
E05;domein;inlog-noordkade[.]nm[.]lab;;2026-03-03 11:40;gemeld door collega
E06;cert;SHA1 3C:91:0A:7E:44;crt.sh;2026-03-03 12:05;staat op E01 en E05
E07;url;http://inlog-noordkade.nm.lab/portaal/login;proxylog;2026-03-03 12:30;POST vanaf 1 werkstation
E08;ip;198.51.100[.]23;passive DNS;2026-03-03 12:41;A-record van E05
E09;alias;kade_wolf;;2026-03-04 09:15;forumnaam, van horen zeggen
E10;wallet;bc1qfictief7noordkade;extern rapport;;genoemd in losgeldbrief
E11;domein;cdn-statisch[.]example;proxylog;2026-03-04 10:02;legitiem CDN, geen indicator
E12;hash;5b0e7d2a94c1f38e6a7b0c9d1e2f3a4b;EDR;2026-03-04 10:30;dropper
E13;ip;203.0.113[.]91;;2026-03-04 13:12;uitgaand verkeer werkstation
E14;e-mail;helpdesk[at]inlog-noordkade[.]nm[.]lab;mailgateway;2026-03-05 07:58;tweede golf
E15;domein;betaal-noordkade[.]nm[.]lab;crt.sh;2026-03-05 08:20;zelfde certificaat als E06
E16;asn;AS64511;WHOIS;2026-03-05 08:45;hoster van E02 en E08`,
      },
      questions: [
        { q: 'Waarom gebruiken juist ervaren onderzoekers een checklist?', options: ['Omdat ze de stof niet kennen', 'Omdat ook ervaren mensen onder tijdsdruk stappen vergeten', 'Omdat het verplicht is van de wet', 'Omdat het sneller is dan nadenken'], answer: 1, explain: 'Een checklist vangt menselijke fouten op, net als de checklist van een piloot.' },
        { q: 'Hoeveel entiteiten in het register missen een herkomst (kolom bron)?', answer: ['3'],
          hints: ['De kolommen zijn gescheiden door puntkomma\'s. Een leeg veld zie je als twee puntkomma\'s achter elkaar.', 'Filter op ;; en kijk per treffer wélk veld leeg is: het vierde (bron) of het vijfde (tijd).', 'Het zijn een domein, een alias en een IP-adres.'],
          wrong: { '4': 'Je telt E10 mee. Daar staat wel een bron (extern rapport); het tijdstip ontbreekt.', '1': 'Er zijn er meer. Filter op ;; en loop alle treffers na.', '2': 'Je mist er één. Kijk ook naar het IP-adres van het uitgaande verkeer.' },
          why: 'Zonder herkomst kun je een indicator niet wegen en kan niemand jouw conclusie natrekken. In een overdracht zijn dit de eerste dingen die je terugvraagt.',
          explain: 'E05, E09 en E13 hebben een leeg bronveld. E10 heeft wel een bron, maar geen tijdstip.' },
        { q: 'Welke entiteit (ID, bijvoorbeeld E01) is niet defanged opgeslagen?', answer: ['E07', 'e7', '07'],
          hints: ['Defanged betekent: zo geschreven dat niemand er per ongeluk op kan klikken.', 'Zoek naar [.] en [at]. Welke regel met een domein of URL heeft ze niet?', 'Het is de enige regel van het type url.'],
          wrong: { 'e10': 'Een wallet-adres is geen klikbare link. Defangen gaat om URL\'s, domeinen, IP-adressen en e-mailadressen.', 'e11': 'E11 is wel defanged (cdn-statisch[.]example). Dat het een legitiem CDN is, is een ander punt.', 'e06': 'Een certificaat-vingerafdruk kun je niet aanklikken; die hoeft niet defanged.' },
          explain: 'E07 staat als werkende http-URL in het register. Eén klik in een ticket of mail en iemand bezoekt de phishingpagina.' },
        { q: 'Welke entiteit (ID) mist het tijdstip van waarneming?', answer: ['E10', 'e 10'],
          hints: ['Weer een leeg veld, maar nu het vijfde.', 'Filter op ;; en zoek de regel waar de bron wél is ingevuld.', 'Het is de wallet.'],
          explain: 'E10: de wallet uit het externe rapport heeft geen tijdstip. Zonder tijd weet je niet of de indicator nog actueel is.' },
      ],
    },

    {
      title: 'Taak 3 — Veelgemaakte fouten & tegenmiddelen',
      tryFirst: true,
      intro: `<p>Twee bedrijven zijn getroffen door dezelfde ransomware. Een collega roept: "Zelfde dader!" Vul in het
        lab de ACH-matrix in (C = consistent, I = inconsistent, N = neutraal), vergelijk daarna met de expert en
        beantwoord de vragen.</p>`,
      content: `
        <p>De gevaarlijkste fouten in dit vak zitten niet in de techniek maar in het hoofd. Een goede analist kent zijn
        eigen valkuilen en zet er bewust een tegenmiddel tegenover. De vier die je het vaakst zult tegenkomen:</p>

        <h3>1. Denkfouten (cognitive bias)</h3>
        <p>Je brein zoekt bevestiging. Heb je eenmaal een verdachte in gedachten, dan ga je onbewust bewijs zoeken dat
        klopt (<em>confirmation bias</em>) en blijf je hangen bij je eerste indruk (<em>anchoring</em>).</p>
        <ul>
          <li><strong>Tegenmiddel:</strong> werk met ACH. Zet meerdere hypothesen náást elkaar en zoek bewust naar
          bewijs dat ze <em>weerlegt</em>. De hypothese met de minste tegenspraak wint — niet de hypothese die je het
          liefst wilde.</li>
        </ul>

        <h3>2. Tool = actor</h3>
        <p>Twee zaken gebruiken dezelfde ransomware, of hetzelfde open-source hulpmiddel. Conclusie: dezelfde dader!
        Fout. Gereedschap wordt gedeeld, gekocht en gehuurd (crime-as-a-service). Een gedeelde <em>tool</em> (in de Pyramid of Pain
        net onder de TTP's) bewijst nog geen gedeelde <em>actor</em>.</p>
        <ul>
          <li><strong>Tegenmiddel:</strong> attribueer op zeldzame, dure kenmerken (TTP's, eigen infrastructuur) hoog
          in de piramide, niet op breed verkrijgbare tools. Label een actor-conclusie als <em>afgeleid</em>, nooit als
          <em>bekend</em>.</li>
        </ul>

        <h3>3. Schijnprecisie</h3>
        <p>"De aanval was voor 87,3% zeker Russisch." Dat getal suggereert een nauwkeurigheid die je helemaal niet hebt.
        Schijnprecisie (<em>false precision</em>) misleidt de lezer en verbergt onzekerheid.</p>
        <ul>
          <li><strong>Tegenmiddel:</strong> gebruik de waarschijnlijkheidsbanden ("waarschijnlijk", 55–75%) en geef het
          betrouwbaarheidsniveau er los naast. Een eerlijke band is sterker dan een vals-precies getal.</li>
        </ul>

        <h3>4. Opsec-uploads</h3>
        <p>Je vindt een verdacht bestand en uploadt het meteen naar een online sandbox of scanner om te zien wat het is.
        Begrijpelijk — maar de aanvaller kan meekijken: veel diensten delen samples publiek, en een plotselinge upload
        of een probe naar zijn infrastructuur kan de dader waarschuwen dat hij ontdekt is. Dan brandt je lopende
        onderzoek af.</p>
        <ul>
          <li><strong>Tegenmiddel:</strong> blijf passief waar het kan (passive DNS, crt.sh, WHOIS), weeg bewust af
          voordat je iets uploadt of een server rechtstreeks benadert, en overleg bij twijfel met je team. Opsec is
          onderdeel van het werkproces, geen bijzaak.</li>
        </ul>

        <div class="callout danger"><strong>Rode draad:</strong> elke fout hierboven komt erop neer dat je méér beweert dan
        je bewijs toelaat. Het tegenmiddel is steeds hetzelfde: wees expliciet over wat je weet, wat je afleidt en wat
        je aanneemt — en handel opsec-bewust.</div>
      `,
      lab: {
        type: 'ach',
        question: 'Drukkerij Veldhuis (zaak A) en Bouwgroep Terhorst (zaak B) zijn beide versleuteld. Wie zit erachter?',
        hypotheses: ['Eén en dezelfde actor', 'Twee losse afnemers van dezelfde RaaS-dienst', 'Een insider bij Terhorst'],
        evidence: [
          { text: 'Beide zaken zijn versleuteld met dezelfde ransomware ("Kraaiennest"), die als dienst te huur is', expert: ['C', 'C', 'C'] },
          { text: 'De eerste toegang verschilt: zaak A via een phishingmail, zaak B via een VPN-account dat op een forum te koop stond', expert: ['I', 'C', 'I'] },
          { text: 'De losgeldbrieven verwijzen naar twee verschillende onderhandelportalen en wallets', expert: ['I', 'C', 'N'] },
          { text: 'Werktijden van de aanvaller: zaak A 06:00 tot 14:00 UTC, zaak B 17:00 tot 01:00 UTC', expert: ['I', 'C', 'N'] },
          { text: 'In zaak B begon de versleuteling op een server waar geen enkele eigen medewerker rechten op had', expert: ['C', 'C', 'I'] },
        ],
      },
      questions: [
        { q: 'Klik na je eigen poging op "Vergelijk met expert". Hoeveel inconsistenties (I) telt de hypothese "Eén en dezelfde actor"?', answer: ['3'],
          hints: ['Het lab telt de I\'s per hypothese onder de matrix.', 'Kijk naar de eerste kolom: bij welke bewijsstukken past "dezelfde actor" slecht?', 'De toegangsweg, de portalen en wallets, en de werktijden spreken het alle drie tegen.'],
          wrong: { '0': 'Nul is de score van de RaaS-hypothese. De vraag gaat over de eerste kolom.', '1': 'Je telt alleen de toegangsweg. Ook de verschillende portalen en de werktijden passen slecht bij één actor.', '2': 'Twee is de score van de insider-hypothese.' },
          why: 'ACH kiest niet de hypothese met het meeste bewijs vóór, maar die met het minste bewijs tégen. Zo houd je je lievelingstheorie eerlijk.',
          explain: 'Drie I\'s: andere toegangsweg, andere portalen en wallets, andere werktijden. "Twee losse afnemers" houdt nul inconsistenties over en is dus het meest houdbaar.' },
        { q: 'Wat is het beste tegenmiddel tegen confirmation bias?', options: ['Sneller werken', 'Meerdere hypothesen met ACH afwegen en bewust naar weerlegging zoeken', 'Alleen je eigen theorie onderbouwen', 'De zaak overdragen'], answer: 1, explain: 'ACH dwingt je hypothesen te weerleggen in plaats van je lievelingstheorie te bevestigen.' },
        { q: 'Welke rij wijst het lab aan als weinig onderscheidend bewijs? (rijnummer)', answer: ['1', 'rij 1'],
          hints: ['Bewijs dat bij elke hypothese even goed past, helpt je niet kiezen.', 'Na "Vergelijk met expert" staat onder de matrix een regel over weinig onderscheidend bewijs.', 'Het is precies het bewijsstuk waarop je collega zijn conclusie bouwde.'],
          wrong: { '5': 'Rij 5 onderscheidt wel: het spreekt de insider-hypothese tegen.', '2': 'Rij 2 is juist sterk diagnostisch: het past bij maar één van de drie hypothesen.' },
          explain: 'Rij 1, de gedeelde ransomware. Die past bij alle drie de hypothesen en bewijst dus niets over de dader: tool is geen actor.' },
      ],
    },

    {
      title: 'Taak 4 — Kwaliteitsborging',
      tryFirst: true,
      intro: `<p>Jij bent de peer reviewer. In het lab staat een conceptrapport waarin de auteur elke zin een label gaf:
        BEKEND, AFGELEID of AANNAME. Niet elk label klopt. Zoek de fouten en beantwoord de vragen.</p>`,
      content: `
        <p>Je product belandt misschien op het bureau van een officier van justitie of een directie die er beslissingen
        op baseert. Dan moet het kloppen, en moet aantoonbaar zijn dát het klopt. Drie pijlers.</p>

        <h3>1. Peer review</h3>
        <p>Laat altijd een collega meelezen vóór je een product uitbrengt. Een frisse blik ziet de sprong in je logica
        die jij niet meer ziet, want jij zit al dagen in de zaak. Goede review gaat niet over spelling maar over de
        redenering: volgt de conclusie echt uit het bewijs? Is er een hypothese over het hoofd gezien? Coach elkaar
        zonder te oordelen — de zaak wordt er beter van, niet de ego's.</p>

        <h3>2. Labelen: bekend, afgeleid of aanname</h3>
        <p>Dit is misschien wel de belangrijkste gewoonte uit het hele pad. Markeer elke bewering expliciet:</p>
        <ul>
          <li><strong>Bekend</strong> — een feit of directe waarneming ("het domein <code>betaal-controle.nm.lab</code>
          resolvete op 2026-01 naar 203.0.113.10, bron: passive DNS").</li>
          <li><strong>Afgeleid</strong> — een analytische conclusie uit het bewijs ("beide zaken delen één TLS-certificaat,
          dus zijn ze waarschijnlijk door dezelfde actor opgezet").</li>
          <li><strong>Aanname</strong> — onbewezen, nog in te vullen ("de actor is vermoedelijk Russisch" — zonder bewijs
          een aanname, geen feit).</li>
        </ul>
        <p>Wie deze drie door elkaar haalt, presenteert een gok als een feit. Dat is precies waar rapporten in de
        rechtszaal op sneuvelen.</p>

        <h3>3. Herkomst en tijd vastleggen (provenance)</h3>
        <p>Bij élke entiteit en bewering leg je vast: wáár komt het vandaan en wannéér is het waargenomen. Zonder herkomst
        kun je de betrouwbaarheid niet wegen; zonder tijd weet je niet of de indicator nog actueel is (een IP dat vandaag
        kwaadaardig is, kan over een maand een onschuldige webshop hosten). Deze <em>provenance</em> maakt je werk
        reproduceerbaar: een ander moet jouw conclusie kunnen natrekken en op dezelfde uitkomst komen.</p>

        <div class="callout info"><strong>Verdedigbaar werk:</strong> kun je laten zien dat je bronnen hebt gewogen, hypothesen
        hebt afgewogen, beweringen hebt gelabeld en herkomst hebt vastgelegd, dan staat je méthode niet meer ter discussie —
        alleen nog je bevindingen. Dat is het verschil tussen een onderbouwd oordeel en een losse flodder.</div>
      `,
      lab: {
        type: 'logs',
        title: 'concept-rapport zaak 2026-031, v0.3 (ter review)',
        lines: `Auteur: analist 2. Label per zin: BEKEND, AFGELEID of AANNAME.
Z01 [BEKEND]   Op 2026-03-02 08:14 UTC ontving Noordkade Logistiek een mail met een link naar factuur-portaal[.]nm[.]lab (bron: mailgateway).
Z02 [BEKEND]   Eén werkstation stuurde een POST naar de inlogpagina op inlog-noordkade[.]nm[.]lab (bron: proxylog, 2026-03-03 12:30 UTC).
Z03 [BEKEND]   De aanvaller is dezelfde groep als bij Veerdienst Westerdiep.
Z04 [AFGELEID] factuur-portaal[.]nm[.]lab en inlog-noordkade[.]nm[.]lab delen één certificaat, dus ze zijn waarschijnlijk door dezelfde partij opgezet.
Z05 [BEKEND]   Het certificaat met SHA1 3C:91:0A:7E:44 staat op beide domeinen (bron: crt.sh, 2026-03-03 12:05 UTC).
Z06 [AANNAME]  De actor werkt vermoedelijk vanuit Oost-Europa; hiervoor is geen bewijs.
Z07 [BEKEND]   De gestolen inloggegevens zijn al doorverkocht.
Z08 [AFGELEID] Het werkstation maakte na de POST verbinding met 203.0.113[.]91 (bron: firewall-log, 2026-03-04 13:12 UTC).
Z09 [BEKEND]   De bijlage factuur_maart.zip heeft MD5 9f2c7a1be04d55c3a8e6f0b1d2c3e4f5 (bron: interne sandbox, 2026-03-02 10:20 UTC).
Z10 [AFGELEID] Beide domeinen staan bij dezelfde hoster (AS64511); dat is een zwakke aanwijzing voor een verband.
Z11 [AANNAME]  De forumnaam kade_wolf hoort mogelijk bij de actor (van horen zeggen, niet getoetst).
Z12 [BEKEND]   De kans dat dit dezelfde campagne is, bedraagt 87,3%.`,
      },
      questions: [
        { q: '"Beide zaken delen één zeldzaam TLS-certificaat, dus waarschijnlijk dezelfde actor." Welk label hoort hierbij?', options: ['bekend', 'afgeleid', 'aanname'], answer: 1,
          wrong: { 0: 'Het gedeelde certificaat is bekend, maar de stap naar "dezelfde actor" is een conclusie van de analist.', 2: 'Een aanname heeft geen bewijs onder zich. Hier is er wel bewijs: het gedeelde certificaat.' },
          explain: 'Een analytische conclusie uit bewijs is afgeleid: geen direct waargenomen feit (bekend) en ook niet onbewezen (aanname).' },
        { q: 'Hoeveel zinnen met het label BEKEND zijn in werkelijkheid géén directe waarneming met een bron?', answer: ['3'],
          hints: ['Een bekende bewering kun je natrekken: er staat bij waar ze vandaan komt en wanneer ze is waargenomen.', 'Filter op BEKEND en vraag bij elke zin: staat er een bron, en is dit iets wat je kunt zien of iets wat iemand concludeert of schat?', 'Twee zinnen zijn conclusies zonder bron, één zin is een schatting met een verdacht precies getal.'],
          wrong: { '2': 'Je mist er één. Een percentage is een inschatting van de analist, geen waarneming.', '4': 'Eén te veel. Z02 en Z09 hebben allebei een bron en een tijdstip en beschrijven iets wat in een log of sandbox te zien is.', '7': 'Dat is het aantal zinnen mét het label BEKEND. Gevraagd is hoeveel daarvan het label niet verdienen.' },
          why: 'Een aanname die als feit in een rapport staat, is het eerste waar een verdediging of een kritische directie op doorvraagt. Eén zo\'n zin trekt het hele rapport in twijfel.',
          explain: 'Z03 (attributie zonder bron), Z07 (bewering zonder bron) en Z12 (een schatting, en nog met schijnprecisie ook). Z01, Z02, Z05 en Z09 zijn terecht bekend.' },
        { q: 'Eén zin is te voorzichtig gelabeld: een directe waarneming met bron en tijd die als AFGELEID staat. Welke? (bijvoorbeeld Z01)', answer: ['Z08', 'z8', '08', '8'],
          hints: ['Filter op AFGELEID. Een afleiding herken je aan een redenering: "dus", "waarschijnlijk", "aanwijzing".', 'Eén van de drie bevat geen redenering, alleen een feit uit een log.', 'De zin gaat over een verbinding die in de firewall-log staat.'],
          wrong: { 'z04': 'Z04 trekt een conclusie ("dus waarschijnlijk dezelfde partij"). Dat is terecht afgeleid.', 'z10': 'Z10 weegt een aanwijzing. Dat is een oordeel van de analist, dus terecht afgeleid.' },
          explain: 'Z08: de verbinding naar 203.0.113[.]91 staat met tijdstip in de firewall-log. Dat is gewoon bekend. Te voorzichtig labelen is ook een fout: de lezer weet dan niet meer waar hij op kan bouwen.' },
        { q: 'Welke zin bevat schijnprecisie? (bijvoorbeeld Z01)', answer: ['Z12', '12'],
          hints: ['Zoek een getal dat nauwkeuriger is dan het bewijs kan dragen.', 'Het is een percentage met een cijfer achter de komma.', 'De laatste zin van het concept.'],
          explain: 'Z12 noemt 87,3%. Schrijf liever "zeer waarschijnlijk" met het betrouwbaarheidsniveau er los naast.' },
      ],
    },

    {
      title: 'Taak 5 — Eindoefening: schrijf een BLUF-product',
      content: `
        <p>Tijd om het hele proces in één oefening samen te brengen. Hieronder staat een korte, chronologische casus zoals
        je die ruw zou aantreffen: een opsomming van wat er gebeurde, van begin naar eind. Dat leest prettig als verhaal,
        maar een drukke lezer wil niet eerst door de hele tijdlijn ploegen om de pointe te vinden.</p>

        <p>Jouw opdracht in het lab: <strong>herschrijf deze casus naar een BLUF-product</strong> — <em>Bottom Line Up
        Front</em>, de conclusie eerst. Zet bovenaan wat het betekent en wat er moet gebeuren; zet de onderbouwing
        daaronder. Denk aan de rubric die je in het lab kunt aanvinken:</p>
        <ul>
          <li>De <strong>conclusie staat bovenaan</strong>, niet aan het eind.</li>
          <li>Je gebruikt <strong>waarschijnlijkheidstaal</strong> (een band zoals "waarschijnlijk"), niet een vals-precies getal.</li>
          <li>Elk <strong>interventieadvies heeft een eigenaar</strong> (wie doet het) en een moment.</li>
          <li>Het product is <strong>beknopter dan de bron</strong>.</li>
          <li>De <strong>onzekerheid staat apart</strong> benoemd.</li>
        </ul>

        <div class="callout tip"><strong>Aanpak:</strong> lees de casus, bepaal de kernboodschap ("wat is hier aan de hand en
        wat moet er gebeuren?"), schrijf die als eerste zin, en vul daarna de onderbouwing en het advies aan. Het lab
        draait een heuristische checklist over je tekst — geen AI-cijfer, maar een spiegel. Haal je alle punten, dan
        verdien je de vlag <strong>NM{conclusie_eerst}</strong>.</div>

        <p>Vergelijk je versie daarna met het meegeleverde voorbeeld (de knop in het lab). Er is niet één juist antwoord;
        het gaat erom dat de lezer binnen vijf seconden weet wat hij moet doen.</p>
      `,
      lab: {
        type: 'bluf',
        source: 'CASUS (ruw, chronologisch):\n\nOp 12 januari 2026 meldde de helpdesk dat drie medewerkers een e-mail hadden ontvangen met een link naar "betaal-controle.nm.lab". Op 13 januari bevestigde onze eigen SIEM-log (A2) dat een medewerker op de link had geklikt en inloggegevens had ingevoerd. Op 15 januari zag het SOC uitgaand verkeer vanaf het werkstation naar 203.0.113.10. Via passive DNS, certificate transparency (crt.sh) en WHOIS, herkomst vastgelegd bleek dat "betaal-controle.nm.lab" een TLS-certificaat met vingerafdruk A1B2C3D4 presenteerde. Datzelfde certificaat A1B2C3D4 dook op 2 februari op bij een tweede phishingdomein, "inlog-verificatie.nm.lab", dat een collega-organisatie had gemeld (bron B, nog onbevestigd). De WHOIS-contactmail bij de eerste zaak was "beheer@betaal-controle.nm.lab". Een extern rapport (betrouwbaarheid C) noemde een losgeld-wallet bc1qfictief0alpha. De twee domeinen resolveerden naar verschillende IP-adressen, maar deelden dus wel het certificaat. Er is nog geen bewijs voor de identiteit van de actor.',
        model: 'BLUF: Zaak Alpha (betaal-controle.nm.lab) en Zaak Bravo (inlog-verificatie.nm.lab) zijn waarschijnlijk (55-75%) opgezet door dezelfde actor; betrouwbaarheidsniveau: gemiddeld. De sterkste aanwijzing is een zeldzaam, herbruikt TLS-certificaat (A1B2C3D4) dat op beide domeinen voorkomt. Er is bevestigde phishing met credential-diefstal op ons eigen netwerk.\n\nADVIES:\n1. Blokkeer beide domeinen en het IP 203.0.113.10 op de proxy/DNS-filter (eigenaar: SOC, vandaag).\n2. Reset de wachtwoorden van de getroffen medewerker en schakel MFA af/opnieuw in (eigenaar: IT-beheer, binnen 24 uur).\n3. Deel certificaat A1B2C3D4 en de IOCs (defanged) met de ISAC en het NCSC (eigenaar: analist, deze week).\n\nONZEKERHEID: de identiteit van de actor is onbekend (aanname, geen bewijs). De melding van Zaak Bravo is nog onbevestigd (bron B). De losgeld-wallet komt uit een extern rapport van beperkte betrouwbaarheid (C).\n\nONDERBOUWING (kort): bevestigde klik + credential-invoer (eigen SIEM, A2) op 13-1; uitgaand verkeer naar 203.0.113.10 op 15-1; gedeeld certificaat A1B2C3D4 bij beide domeinen (crt.sh, herkomst vastgelegd). IP-adressen verschillen, het certificaat bruggt de zaken.',
      },
      questions: [
        { q: 'Eén indicator in de casus komt uit een bron met betrouwbaarheid C en is nergens bevestigd. Die hoort onder "onzekerheid", niet in je conclusie. Welke indicator is dat?', answer: ['bc1qfictief0alpha', 'de wallet', 'wallet', 'losgeld-wallet', 'de losgeld-wallet'],
          hints: ['Lees de casus in het lab en let op waar een betrouwbaarheid tussen haakjes staat.', 'Zoek de zin over het externe rapport.', 'Het is geen domein en geen IP-adres, maar een adres waar geld naartoe moet.'],
          wrong: { 'a1b2c3d4': 'Het certificaat is juist het sterkste bewijs: zelf vastgesteld via crt.sh, met herkomst.', '203.0.113.10': 'Dat IP komt uit de eigen SOC-waarneming. Dat is een bevestigde, eigen bron.', 'inlog-verificatie.nm.lab': 'Dat domein komt van bron B en is nog onbevestigd, maar de vraag gaat over de bron met betrouwbaarheid C.' },
          explain: 'De losgeld-wallet bc1qfictief0alpha komt uit een extern rapport met betrouwbaarheid C. In het voorbeeld-BLUF staat hij daarom onder ONZEKERHEID.' },
        { q: 'In het BLUF-voorbeeld: welk kenmerk verbindt Zaak Alpha en Zaak Bravo?', options: ['Hetzelfde IP-adres', 'Hetzelfde herbruikte TLS-certificaat (A1B2C3D4)', 'Dezelfde losgeld-wallet', 'Dezelfde medewerker'], answer: 1, explain: 'De IP-adressen verschillen; het gedeelde, zeldzame certificaat A1B2C3D4 is de brug tussen de zaken.' },
        { q: 'Ik heb de casus naar een BLUF-product herschreven en tegen de rubric getoetst (vlag NM{conclusie_eerst}).', noAnswer: true },
      ],
    },

    {
      title: 'Taak 6 — Afsluiting & hoe verder',
      tryFirst: true,
      intro: `<p>Eén laatste zaak, zonder stappenplan. In het lab staan zaak Charlie en zaak Delta als graaf. Pivoteer,
        weeg wat je vindt en beantwoord de laatste vraag van deze taak.</p>`,
      content: `
        <p>Je hebt het hele intelligence-pad doorlopen en alles samengebracht in één werkproces. Je kunt nu van een
        scherpe vraag, via gericht verzamelen, modelleren, pivoten en analyseren, naar een BLUF-product met concreet
        interventieadvies, en je borgt de kwaliteit met peer review, labeling en vastgelegde herkomst. Dat is
        wat een intelligence-analist bij de politie, een CERT of een SOC dag in dag uit doet.</p>

        <h3>De rooms in dit pad nog eens op een rij</h3>
        <p>Loop ze gerust terug als een stap nog niet lekker zit:</p>
        <ul>
          <li><strong>Het cybercrime-ecosysteem</strong> — crime-as-a-service, RaaS en de interventietypologie: de wereld waarin je werkt.</li>
          <li><strong>Crime scripting</strong> — de misdaad in fasen ontleden en per fase een interventie kiezen.</li>
          <li><strong>Intelligencecyclus, CSAE &amp; gestructureerd analyseren</strong> — de cyclus, de Admiralty Code, waarschijnlijkheidstaal, ACH en je eigen denkfouten.</li>
          <li><strong>Threat intelligence-modellen</strong> — Kill Chain, MITRE ATT&CK, Diamond Model en de Pyramid of Pain.</li>
          <li><strong>OSINT &amp; pivoting</strong> — het entiteitenmodel, passieve bronnen, fingerprinting en het bruggende kenmerk vinden.</li>
          <li><strong>Intelligenceproducten</strong> — BLUF, jargon vertalen en een goed interventieadvies schrijven.</li>
          <li><strong>De praktijkcase</strong> — de volledige workflow in één keer op een fictieve zaak.</li>
        </ul>

        <h3>Waar sluit dit op aan?</h3>
        <p>Intelligence staat niet op zichzelf. Twee buurpaden versterken je direct:</p>
        <ul>
          <li>Het <strong>forensie-pad</strong> levert de harde sporen waar je intelligence op bouwt: schijf- en
          geheugenonderzoek, tijdlijnen, netwerkforensie en OSINT-opsporing. Een goed onderbouwd oordeel begint bij goed
          veiliggesteld bewijs.</li>
          <li>Het <strong>defensief-pad</strong> laat zien hoe je intelligence <em>gebruikt</em>: detectie-engineering,
          logs en detectie, incident response en de room over threat intelligence &amp; ATT&CK die de modellen aanvult.
          Jouw indicatoren worden daar detectieregels en response-acties.</li>
        </ul>

        <div class="callout tip"><strong>Blijf scherp:</strong> gebruik de <strong>🎯 Oefenarena</strong> en de
        <strong>🃏 Begrippentrainer</strong> om de begrippen uit dit pad te laten beklijven. En onthoud de kern: beweer
        nooit méér dan je bewijs toelaat, label wat je weet, afleidt en aanneemt, en werk opsec-bewust. Succes op de weg
        naar de digitale opsporing. 🕵️</div>
      `,
      lab: {
        type: 'pivot',
        title: 'zaak Charlie en zaak Delta',
        scenario: 'Zaak Charlie draait om pakket-status.nm.lab, zaak Delta om track-zending.nm.lab. Klik de entiteiten aan en lees bij elke relatie de bron (met Admiralty-code) en de opmerking.',
        entities: [
          { id: 'c1', type: 'domain', label: 'pakket-status.nm.lab' },
          { id: 'd1', type: 'domain', label: 'track-zending.nm.lab' },
          { id: 'ip1', type: 'ip', label: '198.51.100.20' },
          { id: 'ct1', type: 'cert', label: '5E:10:C4:9B:72' },
          { id: 'w1', type: 'wallet', label: 'bc1qfictief3delta' },
          { id: 'm1', type: 'email', label: 'registratie@postvak-noord.example' },
          { id: 'm2', type: 'email', label: 'info@zending-hulp.example' },
          { id: 'a1', type: 'alias', label: 'pakjesman' },
        ],
        edges: [
          { from: 'c1', to: 'ip1', rel: 'resolvet naar', time: '2026-04', source: 'passive DNS (A1); gedeelde hosting, ruim 3.900 andere domeinen op dit adres' },
          { from: 'd1', to: 'ip1', rel: 'resolvet naar', time: '2026-05', source: 'passive DNS (A1); gedeelde hosting, ruim 3.900 andere domeinen op dit adres' },
          { from: 'c1', to: 'w1', rel: 'genoemd in losgeldbrief', time: '2026-04', source: 'eigen incidentdossier (A1)' },
          { from: 'd1', to: 'w1', rel: 'zou zijn gebruikt bij', time: '2026-05', source: 'anoniem forumbericht (F6)' },
          { from: 'c1', to: 'ct1', rel: 'presenteert certificaat', time: '2026-04', source: 'scandataset van een vaste partner (B1); zelfondertekend, in de hele dataset op 2 hosts gezien' },
          { from: 'd1', to: 'ct1', rel: 'presenteert certificaat', time: '2026-05', source: 'scandataset van een vaste partner (B1); zelfondertekend, in de hele dataset op 2 hosts gezien' },
          { from: 'c1', to: 'm1', rel: 'geregistreerd met', time: '2026-03', source: 'WHOIS-historie (B2)' },
          { from: 'd1', to: 'm2', rel: 'geregistreerd met', time: '2026-05', source: 'WHOIS-historie (B2)' },
          { from: 'a1', to: 'c1', rel: 'adverteert met', time: '2026-04', source: 'forumadvertentie (E4)' },
        ],
      },
      questions: [
        { q: 'Welk pad levert de harde sporen (schijf, geheugen, netwerk) waarop je intelligence voortbouwt?', options: ['Het forensie-pad', 'Het eindopdracht-pad', 'Het fundamenten-pad', 'Geen enkel pad'], answer: 0, explain: 'Forensie stelt het bewijs veilig en reconstrueert wat er gebeurde; intelligence bouwt daarop voort.' },
        { q: 'In welk pad worden jouw indicatoren omgezet in detectieregels en response-acties?', options: ['Het offensief-pad', 'Het defensief-pad', 'Het forensie-pad', 'Het intelligence-pad'], answer: 1, explain: 'Het defensief-pad (detectie-engineering, logs, incident response) gebruikt intelligence om aanvallen te detecteren en erop te reageren.' },
        { q: 'Ik kan het hele werkproces zelfstandig doorlopen, van richten tot interventieadvies, en ik borg de kwaliteit. 🚀', noAnswer: true },
        { q: 'Zaak Charlie en zaak Delta hebben drie entiteiten gemeen. Op welke ene mag je in je BLUF het verband tussen de zaken bouwen? Geef het label.', boss: true,
          answer: ['5E:10:C4:9B:72', '5e10c49b72', 'cert 5E:10:C4:9B:72', 'certificaat 5E:10:C4:9B:72', 'het certificaat', 'certificaat'],
          hints: ['Zoek eerst welke entiteiten aan beide domeinen hangen. Dat zijn er drie.', 'Stel bij elk van de drie twee vragen: hoe zeldzaam is dit kenmerk, en hoe goed is de bron van béíde relaties?', 'Eén valt af omdat duizenden anderen het delen, één omdat de helft van het bewijs niet te beoordelen is.'],
          wrong: { '198.51.100.20': 'Beide domeinen wijzen ernaar, maar het is gedeelde hosting met duizenden andere domeinen. Het zakt voor de zeldzaamheidstoets.', 'bc1qfictief3delta': 'De koppeling met zaak Delta komt uit een anoniem forumbericht (F6): bron en informatie zijn niet te beoordelen. Daar bouw je geen conclusie op.', 'pakjesman': 'De alias hangt alleen aan zaak Charlie, en de bron is E4.', '/postvak-noord/': 'Dit e-mailadres komt alleen in zaak Charlie voor; Delta is met een ander adres geregistreerd.' },
          why: 'In echte zaken vind je bijna altijd meerdere overlappingen. Het vak zit in het wegstrepen: wat is zeldzaam genoeg én goed genoeg onderbouwd om in een rapport te zetten?',
          explain: 'Het zelfondertekende certificaat 5E:10:C4:9B:72: op slechts twee hosts gezien (zeldzaam) en beide relaties komen uit een bron met B1. Het IP is gedeelde hosting (ruis), en de wallet hangt aan Delta via een F6-bron.' },
      ],
    },

    {
      title: 'Taak 7: Waarom deze technieken werken, en waar ze ophouden',
      kind: 'verdieping', optional: true,
      content: `
        <p>Het werkproces uit deze room is een verzameling <em>gestructureerde analysetechnieken</em>. Ze maken je niet
        slimmer; ze maken je redenering zichtbaar, zodat een ander haar kan aanvallen. Dat is het hele idee. Hier lees je
        waar elk gereedschap vandaan komt en waar het in de praktijk tekortschiet.</p>

        <h3>ACH: sterk tegen tunnelvisie, zwak bij slecht bewijs</h3>
        <p>ACH is uitgewerkt door Richards Heuer in <em>Psychology of Intelligence Analysis</em> (1999). De kern is
        weerleggen in plaats van bevestigen. Drie randgevallen:</p>
        <ul>
          <li><strong>Elke I telt even zwaar.</strong> Het lab telt inconsistenties, maar één hard feit kan een hypothese
          in zijn eentje onderuit halen, terwijl drie zwakke signalen dat niet doen. Weeg dus mee hoe goed de bron van
          elk bewijsstuk is.</li>
          <li><strong>De matrix kent alleen de hypothesen die jij bedacht.</strong> Ontbreekt de juiste verklaring, dan
          wint de minst slechte. Neem daarom altijd een "iets anders"-hypothese in gedachten mee.</li>
          <li><strong>Misleiding.</strong> Een tegenstander die weet hoe je redeneert, kan bewijs planten. Bewijs dat
          opvallend goed in één hypothese past, verdient extra wantrouwen.</li>
        </ul>

        <h3>Admiralty Code: twee assen die door elkaar gaan lopen</h3>
        <p>De code scheidt de bron (A tot F) van de informatie (1 tot 6). In de praktijk beïnvloeden die twee elkaar:
        informatie van een vertrouwde bron krijgt al snel ook een goed cijfer. Een bekende kritiek is dat beoordelingen
        daardoor rond het midden klonteren. Twee dingen om te onthouden: de laagste categorie op beide assen betekent
        <em>niet te beoordelen</em>, niet <em>slecht</em>. En een cijfer voor de informatie hoort te rusten op
        <em>onafhankelijke</em> bevestiging: drie nieuwssites die hetzelfde persbericht overschrijven, zijn één bron.</p>

        <h3>Waarschijnlijkheidstaal: woorden betekenen voor iedereen iets anders</h3>
        <p>Sherman Kent beschreef in 1964 ("Words of Estimative Probability") hoe lezers van hetzelfde rapport bij de
        woorden "serious possibility" kansen in gedachten hadden die uiteenliepen van ongeveer 20 tot 80 procent. Vaste
        banden, zoals de Britse Probability Yardstick, zijn daar het antwoord op. Ze werken alleen als de lezer de banden
        kent: zet de tabel dus in je product, of noem de band erbij.</p>
        <p>Houd kans en betrouwbaarheid uit elkaar. "Waarschijnlijk, betrouwbaarheid laag" betekent: dit is onze beste
        inschatting, maar ze rust op weinig. Dat is een heel andere boodschap dan "reële kans, betrouwbaarheid hoog".</p>

        <h3>Checklists: tegen vergeten, niet tegen verkeerd denken</h3>
        <p>De bekendste checklist buiten de luchtvaart is de Surgical Safety Checklist van de WHO (2008). Een checklist
        vangt de stappen op die je kent maar overslaat. Hij helpt niet tegen een verkeerd oordeel, en hij wordt
        waardeloos zodra mensen hem afvinken zonder te kijken. Houd hem daarom kort en laat een tweede persoon meelezen.</p>
      `,
      questions: [
        { q: 'Een ACH-matrix heeft in de eerste kolom zes keer C en twee keer I, en in de tweede kolom twee keer C en één keer I. Welke kolom is volgens ACH het meest houdbaar? (1 of 2)', answer: ['2', 'kolom 2'],
          hints: ['ACH telt niet wat vóór een hypothese pleit.', 'Vergelijk alleen het aantal I\'s.', 'Eén I is minder dan twee.'],
          wrong: { '1': 'Zes keer consistent voelt overtuigend, maar bewijs dat past, past vaak bij meer hypothesen. ACH kijkt naar het aantal inconsistenties.' },
          explain: 'Kolom 2 heeft de minste inconsistenties. Het aantal C\'s telt niet mee.' },
        { q: 'Bron: een tipgever die je niet kent en niet kunt natrekken. Informatie: komt overeen met wat twee onafhankelijke andere bronnen melden. Welke Admiralty-code geef je? (letter en cijfer)', answer: ['F1', 'f-1', 'f 1'],
          hints: ['Beoordeel de bron en de informatie los van elkaar.', 'Een bron die je niet kunt beoordelen krijgt de laatste letter. Informatie die door andere bronnen is bevestigd krijgt het eerste cijfer.', 'De letter is F.'],
          wrong: { 'f6': 'De bron is niet te beoordelen, maar de informatie wel: die is bevestigd door onafhankelijke bronnen.', 'e1': 'E betekent dat je weet dat de bron onbetrouwbaar is. Hier weet je niets over de bron.', 'a1': 'De bevestiging zegt iets over de informatie, niet over de bron.' },
          explain: 'F1: bron niet te beoordelen, informatie bevestigd. De twee assen staan los van elkaar.' },
        { q: 'Drie nieuwssites melden hetzelfde, en alle drie citeren ze hetzelfde persbericht. Hoeveel onafhankelijke bronnen heb je?', answer: ['1'],
          hints: ['Vraag je af waar elke site zijn informatie vandaan heeft.', 'Onafhankelijk betekent: de bron heeft het zelf waargenomen of uit een eigen kanaal.', 'Alle drie herhalen ze één document.'],
          explain: 'Eén: het persbericht. Herhaling is geen bevestiging.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examens over threat intelligence en analyse vragen zelden naar definities. Je krijgt een korte situatie en
        moet kiezen wat een analist dan doet. Let op de afleiders: ze zijn vaak half waar. Lees eerst de vraag, dan pas
        de opties, en streep weg.</p>
      `,
      questions: [
        { q: 'Een bron heeft je het afgelopen jaar tien keer informatie geleverd, waarvan negen keer juist. Vandaag meldt hij dat een bepaald domein bij een nieuwe phishingcampagne hoort. Je hebt nog geen tweede bron, maar de melding past bij wat je over de campagne weet. Welke Admiralty-beoordeling past het best?',
          options: ['A1', 'B2', 'B1', 'F3'], answer: 1,
          wrong: { 0: 'A is voor een bron zonder twijfel over betrouwbaarheid, en 1 vraagt om bevestiging door andere bronnen. Die is er niet.', 2: 'De bron klopt (meestal betrouwbaar), maar een 1 mag pas als onafhankelijke bronnen de informatie bevestigen.', 3: 'F is voor een bron die je niet kunt beoordelen. Deze bron heeft juist een bekende staat van dienst.' },
          explain: 'B2: de bron is meestal betrouwbaar (B); de informatie is niet bevestigd maar wel logisch en consistent met wat bekend is (2, waarschijnlijk waar).' },
        { q: 'Een analist heeft drie hypothesen in een ACH-matrix gezet. H1 scoort 7 keer consistent en 3 keer inconsistent. H2 scoort 3 keer consistent, 6 keer neutraal en 1 keer inconsistent. H3 scoort 5 keer consistent en 5 keer inconsistent. Welke conclusie past bij de methode?',
          options: ['H1 is het meest houdbaar, want die heeft het meeste ondersteunende bewijs', 'H2 is voorlopig het meest houdbaar, want die heeft de minste inconsistenties', 'H3 valt af en H1 en H2 zijn even sterk', 'Geen conclusie mogelijk zolang H2 zoveel neutrale scores heeft'], answer: 1,
          wrong: { 0: 'Dit is de klassieke valkuil. Ondersteunend bewijs past vaak bij meerdere hypothesen; ACH rangschikt op inconsistenties.', 2: 'H3 is inderdaad het zwakst, maar H1 (3 keer I) en H2 (1 keer I) zijn niet gelijk.', 3: 'Neutraal bewijs is niet-diagnostisch voor die hypothese, maar het blokkeert geen voorlopige conclusie.' },
          explain: 'ACH weerlegt. De hypothese met de minste inconsistenties blijft voorlopig staan: H2. "Voorlopig", omdat nieuw bewijs de matrix kan veranderen.' },
        { q: 'In een conceptrapport voor de directie staat: "Het is 82% zeker dat de inbraak het werk is van een bekende ransomwaregroep." De conclusie rust op twee bronnen, waarvan één onbevestigd. Welke herschrijving is het best?',
          options: ['De zin laten staan: een getal is duidelijker dan een woord', '"Het is zeer waarschijnlijk dat een bekende ransomwaregroep achter de inbraak zit. Betrouwbaarheid van dit oordeel: gemiddeld, omdat één van de twee bronnen onbevestigd is."', '"Mogelijk is er een verband met een ransomwaregroep."', '"Vaststaat dat een bekende ransomwaregroep achter de inbraak zit."'], answer: 1,
          wrong: { 0: 'Twee bronnen kunnen geen 82% dragen. Het getal suggereert een nauwkeurigheid die er niet is: schijnprecisie.', 2: 'Te vaag: "mogelijk" dekt alles tussen 1 en 99 procent en laat de lezer zelf raden wat de analist denkt.', 3: 'Dit maakt van een afleiding een feit. Met één onbevestigde bron is dat niet te verdedigen.' },
          explain: 'Een vaste term uit de waarschijnlijkheidsbanden, met het betrouwbaarheidsniveau er los naast en de reden erbij.' },
        { q: 'Tijdens een lopend onderzoek naar een gerichte inbraak vindt een analist een onbekend uitvoerbaar bestand op een server. De aanvaller is vermoedelijk nog actief. Wat is de beste eerste stap?',
          options: ['Het bestand uploaden naar een publieke online scanner, want dat geeft het snelst een oordeel', 'De hash van het bestand opzoeken in bestaande bronnen en het bestand zelf in een eigen, afgesloten sandbox onderzoeken', 'Verbinding maken met het adres waar het bestand naartoe belt, om te zien of de server nog leeft', 'Het bestand verwijderen zodat het geen schade meer kan doen'], answer: 1,
          wrong: { 0: 'Bij gerichte malware kan de maker zien dat zijn bestand is geüpload. Dan weet hij dat hij ontdekt is.', 2: 'Actief contact met de infrastructuur van de aanvaller verraadt je en kan het onderzoek schaden.', 3: 'Dan vernietig je bewijs, en de aanvaller heeft waarschijnlijk meer dan één ingang.' },
          explain: 'Een hash opzoeken verraadt niets over het bestand zelf, en een eigen sandbox houdt het monster binnen. Zo krijg je informatie zonder de aanvaller te waarschuwen.' },
      ],
    },
  ],
  terms: [
    { term: 'Werkproces', def: 'De vaste volgorde waarin je de technieken inzet: richten, verzamelen, modelleren, pivoten, analyseren, product en interventieadvies.' },
    { term: 'Richten', def: 'De eerste stap: een scherpe intelligence-vraag formuleren die alles wat daarna komt stuurt.' },
    { term: 'CSAE', def: 'Collect, Store, Analyse, Engage: gericht verzamelen, met herkomst en tijd bewaren, duiden en partners betrekken.' },
    { term: 'Pivoten', def: 'Langs relaties (domein, IP, cert, wallet) van de ene entiteit naar de andere springen om het bruggende kenmerk tussen zaken te vinden.' },
    { term: 'ACH', def: 'Analysis of Competing Hypotheses: meerdere hypothesen náást elkaar zetten en zoeken naar bewijs dat ze weerlegt in plaats van bevestigt.' },
    { term: 'Admiralty Code', def: 'Bron apart beoordelen op betrouwbaarheid (A–F) en informatie op geloofwaardigheid (1–6).' },
    { term: 'Waarschijnlijkheidstaal', def: 'Kansen uitdrukken in vaste banden (zoals "waarschijnlijk", 55–75%) in plaats van vals-precieze getallen, met het betrouwbaarheidsniveau er los naast.' },
    { term: 'BLUF', def: 'Bottom Line Up Front: de conclusie en het advies bovenaan, de onderbouwing eronder.' },
    { term: 'Interventieadvies', def: 'Concreet advies bij een product: wat, waarom, wie (eigenaar) en wanneer, inclusief de risico\'s.' },
    { term: 'Checklist', def: 'Een afvinkbare lijst die je bij elke zaak afloopt, zodat je ook onder tijdsdruk geen cruciale stap overslaat.' },
    { term: 'Schijnprecisie', def: 'False precision: een getal gebruiken dat een nauwkeurigheid suggereert die je niet hebt; vervang het door een waarschijnlijkheidsband.' },
    { term: 'Provenance', def: 'Herkomst en tijd die je bij elke entiteit en bewering vastlegt, zodat je werk weegbaar en reproduceerbaar is.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — kennisbank van tactieken en technieken', url: 'https://attack.mitre.org/' },
    { title: 'Lockheed Martin — Cyber Kill Chain', url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html' },
    { title: 'David Bianco — The Pyramid of Pain', url: 'https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html' },
    { title: 'NCSC — hulp, adviezen en dreigingsbeeld', url: 'https://www.ncsc.nl/' },
  ],
});
