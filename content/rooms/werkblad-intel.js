/* Room: Werkblad — alles in één werkproces (intelligence) */
CS.registerRoom({
  id: 'werkblad-intel',
  path: 'intelligence',
  order: 8,
  title: 'Werkblad: alles in één werkproces',
  icon: '🗂️',
  difficulty: 'Gemiddeld',
  minutes: 50,
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
      content: `
        <p>In de vorige lessen leerde je losse technieken: de intelligencecyclus, CSAE, de Admiralty Code,
        waarschijnlijkheidstaal, ACH, de modellen (Kill Chain, ATT&CK, Diamond, Pyramid of Pain), pivoten en het
        BLUF-product. Losse gereedschappen maken je nog geen vakman — het gaat erom dat je ze <strong>in de juiste
        volgorde</strong> inzet. Dit werkblad rijgt alles aan elkaar tot één werkproces dat je bij elke zaak kunt
        herhalen. Zie het als het recept waar de losse ingrediënten uit de vorige lessen in samenkomen.</p>

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
        andersom. Wie met de data begint in plaats van met de vraag, verdwaalt. Beloning voor wie het hele proces kan
        navertellen: <strong>NM{van_richten_tot_product}</strong>.</div>
      `,
      questions: [
        { q: 'Waarmee begin je het werkproces: met de data of met de vraag?', options: ['Met de data die je toevallig hebt', 'Met een scherpe intelligence-vraag van de opdrachtgever', 'Met het BLUF-product', 'Met het interventieadvies'], answer: 1, explain: 'Richten komt eerst: de vraag stuurt wat je verzamelt, modelleert en concludeert.' },
        { q: 'Welke stap komt direct ná "modelleren" in dit werkproces?', options: ['Richten', 'Pivoten', 'Interventieadvies', 'Product maken'], answer: 1, explain: 'De volgorde is richten → verzamelen → modelleren → pivoten → analyseren → product → interventieadvies.' },
        { q: 'Wat is de vlag die je als beloning krijgt voor het navertellen van het hele proces?', answer: ['NM{van_richten_tot_product}'], hint: 'Staat vetgedrukt in de tip onderaan de taak.', explain: 'NM{van_richten_tot_product} — van de vraag helemaal tot het advies.' },
      ],
    },

    {
      title: 'Taak 2 — De checklist die je bij elke zaak afloopt',
      content: `
        <p>Een werkproces dat alleen in je hoofd zit, sla je onder druk over. Daarom giet je het in een
        <strong>checklist</strong>: een lijst die je letterlijk afvinkt, net als een piloot vóór het opstijgen. Niet
        omdat je dom bent, maar juist omdat ervaren mensen onder tijdsdruk stappen vergeten. Print deze checklist, of
        plak hem boven je bureau, en loop hem bij elke nieuwe zaak af.</p>

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
      questions: [
        { q: 'Waarom gebruiken juist ervaren onderzoekers een checklist?', options: ['Omdat ze de stof niet kennen', 'Omdat ook ervaren mensen onder tijdsdruk stappen vergeten', 'Omdat het verplicht is van de wet', 'Omdat het sneller is dan nadenken'], answer: 1, explain: 'Een checklist vangt menselijke fouten op, net als de checklist van een piloot — niet omdat je onkundig bent.' },
        { q: 'Welke twee dingen leg je volgens de checklist bij élke entiteit vast?', options: ['Kleur en grootte', 'Herkomst en tijd', 'Prijs en eigenaar', 'Taal en land'], answer: 1, explain: 'Zonder herkomst weeg je betrouwbaarheid niet; zonder tijd weet je niet of de indicator nog klopt.' },
        { q: 'Op welk kenmerk toets je het bruggende kenmerk tussen twee zaken?', answer: ['zeldzaamheid', 'de zeldzaamheid'], hint: 'Een gedeeld cert zegt meer dan een gedeelde populaire favicon.', explain: 'Zeldzaamheid: hoe unieker het gedeelde kenmerk, hoe sterker het de zaken verbindt.' },
      ],
    },

    {
      title: 'Taak 3 — Veelgemaakte fouten & tegenmiddelen',
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
      questions: [
        { q: 'Twee zaken gebruiken dezelfde kant-en-klare ransomware. Wat mag je daaruit concluderen?', options: ['Zeker dezelfde dader', 'Nog niets over de dader: gereedschap wordt gedeeld en gehuurd', 'Dat de tool slecht is', 'Dat er geen verband is'], answer: 1, explain: 'Tool is geen actor. Attributie bouw je op zeldzame kenmerken hoog in de Pyramid of Pain, niet op gedeelde tools.' },
        { q: 'Wat is het beste tegenmiddel tegen confirmation bias?', options: ['Sneller werken', 'Meerdere hypothesen met ACH afwegen en bewust naar weerlegging zoeken', 'Alleen je eigen theorie onderbouwen', 'De zaak overdragen'], answer: 1, explain: 'ACH dwingt je hypothesen te weerleggen in plaats van je lievelingstheorie te bevestigen.' },
        { q: 'Waarom kan het riskant zijn om een verdacht bestand meteen online te uploaden?', options: ['Het kost geld', 'De aanvaller kan het merken en weet dan dat hij ontdekt is', 'Het bestand wordt dan gewist', 'Dat is nooit riskant'], answer: 1, explain: 'Een opsec-lek: publieke uploads of probes kunnen de dader waarschuwen en je lopende onderzoek verraden.' },
      ],
    },

    {
      title: 'Taak 4 — Kwaliteitsborging',
      content: `
        <p>Je product belandt misschien op het bureau van een officier van justitie of een directie die er beslissingen
        op baseert. Dan moet het kloppen — en moet aantoonbaar zijn dát het klopt. Kwaliteitsborging is geen extra laagje;
        het is wat je werk van een mening onderscheidt. Drie pijlers.</p>

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
        rechtszaal op sneuvelen. Beloning voor wie dit standaard toepast: <strong>NM{bekend_afgeleid_aanname}</strong>.</p>

        <h3>3. Herkomst en tijd vastleggen (provenance)</h3>
        <p>Bij élke entiteit en bewering leg je vast: wáár komt het vandaan en wannéér is het waargenomen. Zonder herkomst
        kun je de betrouwbaarheid niet wegen; zonder tijd weet je niet of de indicator nog actueel is (een IP dat vandaag
        kwaadaardig is, kan over een maand een onschuldige webshop hosten). Deze <em>provenance</em> maakt je werk
        reproduceerbaar: een ander moet jouw conclusie kunnen natrekken en op dezelfde uitkomst komen.</p>

        <div class="callout info"><strong>Verdedigbaar werk:</strong> kun je laten zien dat je bronnen hebt gewogen, hypothesen
        hebt afgewogen, beweringen hebt gelabeld en herkomst hebt vastgelegd, dan staat je méthode niet meer ter discussie —
        alleen nog je bevindingen. Dat is het verschil tussen een onderbouwd oordeel en een losse flodder.</div>
      `,
      questions: [
        { q: '"Beide zaken delen één zeldzaam TLS-certificaat, dus waarschijnlijk dezelfde actor." Welk label hoort hierbij?', options: ['bekend', 'afgeleid', 'aanname'], answer: 1, explain: 'Een analytische conclusie uit bewijs is afgeleid — niet een direct waargenomen feit (bekend) en niet onbewezen (aanname).' },
        { q: 'Wat is het belangrijkste doel van peer review bij een intelligence-product?', options: ['Spelfouten verbeteren', 'Controleren of de conclusie echt uit het bewijs volgt en of een hypothese is gemist', 'Het product korter maken', 'De auteur beoordelen'], answer: 1, explain: 'Peer review toetst de redenering: een frisse blik ziet de logische sprongen die de auteur niet meer opmerkt.' },
        { q: 'Welke vlag hoort bij het standaard labelen van je beweringen?', answer: ['NM{bekend_afgeleid_aanname}'], hint: 'Staat vetgedrukt onder het kopje over labelen.', explain: 'NM{bekend_afgeleid_aanname} — de drie labels die je gok van een feit onderscheiden.' },
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
        { q: 'Wat betekent BLUF?', answer: ['bottom line up front', 'bottom-line up front'], hint: 'Engelse term; de conclusie komt eerst.', explain: 'Bottom Line Up Front: zet de kernboodschap en het advies bovenaan, de onderbouwing daaronder.' },
        { q: 'In het BLUF-voorbeeld: welk kenmerk verbindt Zaak Alpha en Zaak Bravo?', options: ['Hetzelfde IP-adres', 'Hetzelfde herbruikte TLS-certificaat (A1B2C3D4)', 'Dezelfde losgeld-wallet', 'Dezelfde medewerker'], answer: 1, explain: 'De IP-adressen verschillen; het gedeelde, zeldzame certificaat A1B2C3D4 is de brug tussen de zaken.' },
        { q: 'Ik heb de casus naar een BLUF-product herschreven en tegen de rubric getoetst (vlag NM{conclusie_eerst}).', noAnswer: true },
      ],
    },

    {
      title: 'Taak 6 — Afsluiting & hoe verder',
      content: `
        <p>Je hebt het hele intelligence-pad doorlopen en alles samengebracht in één werkproces. Je kunt nu van een
        scherpe vraag, via gericht verzamelen, modelleren, pivoten en analyseren, naar een BLUF-product met concreet
        interventieadvies — en je borgt de kwaliteit met peer review, labeling en vastgelegde herkomst. Dat is precies
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
      questions: [
        { q: 'Welk pad levert de harde sporen (schijf, geheugen, netwerk) waarop je intelligence voortbouwt?', options: ['Het forensie-pad', 'Het eindopdracht-pad', 'Het fundamenten-pad', 'Geen enkel pad'], answer: 0, explain: 'Forensie stelt het bewijs veilig en reconstrueert wat er gebeurde; intelligence bouwt daarop voort.' },
        { q: 'In welk pad worden jouw indicatoren omgezet in detectieregels en response-acties?', options: ['Het offensief-pad', 'Het defensief-pad', 'Het forensie-pad', 'Het intelligence-pad'], answer: 1, explain: 'Het defensief-pad (detectie-engineering, logs, incident response) gebruikt intelligence om aanvallen te detecteren en erop te reageren.' },
        { q: 'Ik kan het hele werkproces zelfstandig doorlopen, van richten tot interventieadvies, en ik borg de kwaliteit. 🚀', noAnswer: true },
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
