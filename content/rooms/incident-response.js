/* Room: Incident response (NIST CSF 2.0) */

const EDR_LOG = `2026-10-03 01:58:12  NM-FS01  Sysmon  EventID=1  ProcessCreate  Image=C:\\Windows\\explorer.exe  User=NM\\mkoster
2026-10-03 02:03:44  NM-FS01  Sysmon  EventID=1  ProcessCreate  Image=C:\\Users\\mkoster\\Downloads\\factuur_oktober.pdf.exe  User=NM\\mkoster  CommandLine="factuur_oktober.pdf.exe"
2026-10-03 02:03:46  NM-FS01  Sysmon  EventID=3  NetworkConnect  Image=factuur_oktober.pdf.exe  DestinationIp=203.0.113.66  DestinationPort=443
2026-10-03 02:04:01  NM-FS01  Sysmon  EventID=1  ProcessCreate  Image=C:\\Windows\\System32\\vssadmin.exe  CommandLine="vssadmin.exe delete shadows /all /quiet"  User=NM\\mkoster
2026-10-03 02:04:02  NM-FS01  Sysmon  EventID=1  ProcessCreate  Image=C:\\Windows\\System32\\wbadmin.exe  CommandLine="wbadmin delete catalog -quiet"  User=NM\\mkoster
2026-10-03 02:04:03  NM-FS01  Sysmon  EventID=1  ProcessCreate  Image=C:\\Windows\\System32\\bcdedit.exe  CommandLine="bcdedit /set {default} recoveryenabled No"  User=NM\\mkoster
2026-10-03 02:04:30  NM-FS01  EDR  ALERT  Severity=HIGH  Detection=Ransom.Generic.Locker  Process=factuur_oktober.pdf.exe  incident-tag=NM{schaduwkopieen_gewist}
2026-10-03 02:04:41  NM-FS01  FileAudit  FileRename  C:\\Shares\\Financien\\begroting_2026.xlsx -> begroting_2026.xlsx.kryptlock
2026-10-03 02:04:41  NM-FS01  FileAudit  FileRename  C:\\Shares\\Financien\\jaarrekening.docx -> jaarrekening.docx.kryptlock
2026-10-03 02:04:42  NM-FS01  FileAudit  FileRename  C:\\Shares\\Financien\\salarissen.xlsx -> salarissen.xlsx.kryptlock
2026-10-03 02:04:42  NM-FS01  FileAudit  FileRename  C:\\Shares\\HR\\contracten.docx -> contracten.docx.kryptlock
2026-10-03 02:04:43  NM-FS01  FileAudit  FileRename  C:\\Shares\\HR\\verzuim.xlsx -> verzuim.xlsx.kryptlock
2026-10-03 02:04:43  NM-FS01  FileAudit  FileRename  C:\\Shares\\Projecten\\offerte.pdf -> offerte.pdf.kryptlock
2026-10-03 02:04:44  NM-FS01  FileAudit  FileRename  C:\\Shares\\Projecten\\planning.xlsx -> planning.xlsx.kryptlock
2026-10-03 02:04:58  NM-FS01  FileAudit  FileCreate  C:\\Shares\\Financien\\LEES_DIT_HERSTEL.txt
2026-10-03 02:05:10  NM-FS01  FileAudit  FileCreate  C:\\Shares\\HR\\LEES_DIT_HERSTEL.txt
2026-10-03 02:05:22  NM-FS01  Sysmon  EventID=3  NetworkConnect  Image=factuur_oktober.pdf.exe  DestinationIp=203.0.113.66  DestinationPort=443
2026-10-03 02:06:00  NM-FS01  EDR  ALERT  Severity=HIGH  Detection=Behavior.MassFileEncrypt  Process=factuur_oktober.pdf.exe  Files=1284
2026-10-03 02:06:05  NM-FS01  EDR  ACTION  Host-Isolation=ENABLED  Reason=automatic-containment
`;

CS.registerRoom({
  id: 'incident-response',
  path: 'defensief',
  order: 2,
  title: 'Incident response volgens NIST',
  icon: '🚨',
  difficulty: 'Gemiddeld',
  minutes: 60,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Hoe je een cyberincident gestructureerd aanpakt met het NIST Cybersecurity Framework 2.0 en de zes functies, van detectie en containment tot herstel, lessons learned en de meldplichten (AVG en NIS2).',
  objectives: [
    'Uitleggen wat een security-incident is en waarom voorbereiding het halve werk is',
    'De zes functies van het NIST Cybersecurity Framework 2.0 benoemen (Govern, Identify, Protect, Detect, Respond, Recover)',
    'De praktische incident-levenscyclus doorlopen: detectie en analyse, containment, eradication, recovery en lessons learned',
    'In een EDR-tijdlijn een ransomware-aanval herkennen',
    'De verschillen tussen containment, eradication en recovery uitleggen',
    'De meldplichten bij de Autoriteit Persoonsgegevens (AVG) en onder NIS2 (Cyberbeveiligingswet) benoemen',
  ],
  tasks: [
    {
      title: "Taak 1 — Wat is een incident, en waarom voorbereiding telt",
      tryFirst: true,
      intro: `<p>Je begint je dienst in het SOC. In het lab staan de twaalf meldingen van afgelopen nacht. De meeste zijn
        gewone gebeurtenissen; een paar zijn een security-incident. Bepaal welke, en beantwoord de vragen.</p>`,
      content: `
        <p>Een <strong>event</strong> (gebeurtenis) is alles wat er op een systeem gebeurt: een login, een update, een
        geblokkeerde verbinding. De meeste events zijn volkomen normaal. Een <strong>security-incident</strong> is iets
        anders: een gebeurtenis die de vertrouwelijkheid, integriteit of beschikbaarheid van je informatie
        daadwerkelijk schaadt of bedreigt. Een gelukte inbraak, een datalek, een ransomware-besmetting: dat zijn
        incidenten.</p>

        <h3>De analogie van de brandweer</h3>
        <p>Incident response (incidentrespons) is de brandweer van cybersecurity. En net als bij de brandweer geldt:
        je oefent en bereidt je voor <em>voordat</em> het brandt. Als het pand in de fik staat, is het te laat om nog
        te bedenken waar de brandslang hangt en wie de leiding heeft. Dezelfde logica geldt hier: het meeste werk zit
        in de voorbereiding.</p>

        <h3>Waarom een plan?</h3>
        <p>Tijdens een echt incident is het chaos: de telefoon gaat, de directie wil antwoorden, systemen liggen plat
        en iedereen kijkt naar elkaar. Een vooraf afgesproken <strong>incident-responsplan</strong> neemt die paniek
        weg. Het beantwoordt vragen die je niet in het heetst van de strijd wilt bedenken:</p>
        <ul>
          <li>Wie heeft de leiding (de <em>incident lead</em>)? Wie mag besluiten een systeem van het net te halen?</li>
          <li>Wie bel je: intern (IT, directie, communicatie, juridisch) en extern (NCSC, leverancier, Politie)?</li>
          <li>Waar staan de back-ups, en wanneer zijn ze voor het laatst getest?</li>
          <li>Hoe stellen we bewijs veilig zonder sporen te vernietigen?</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> een plan dat in een la ligt helpt niet. Goede teams houden een <em>oefening</em>
          (een <em>tabletop exercise</em>): je speelt een incident op papier door en ontdekt zo waar het plan rammelt
          — rustig, zonder dat er echt iets op het spel staat.
        </div>

        <p>In deze room gebruiken we een modern, gestructureerd kader om incidenten aan te pakken: het NIST
        Cybersecurity Framework. Dat behandelen we in de volgende taak.</p>
      `,
      lab: {
        type: "logs",
        title: "SOC-wachtrij, nacht van 2 op 3 november 2026",
        lines: `M01 02:10 Firewall  14 verbindingen vanaf 198.51.100.9 naar poort 23 geblokkeerd
M02 02:31 AD        wachtwoord van p.jansen verlopen en door hemzelf gewijzigd
M03 03:02 Mail      phishingmail in quarantaine geplaatst, niet afgeleverd
M04 03:15 EDR       op WS-HR-04 leest een onbekend proces het geheugen van lsass.exe uit (account h.smit)
M05 03:40 Patch     maandelijkse updates geïnstalleerd op 212 werkplekken
M06 04:05 AD        1 mislukte aanmelding voor k.devries, daarna geslaagd vanaf haar eigen werkplek
M07 04:22 Proxy     WS-HR-04 uploadt 2,1 GB naar bestand-delen[.]example
M08 05:00 Back-up   nachtelijke back-up van FS-01 geslaagd
M09 05:48 Helpdesk  medewerker meldt dat hij gisteren zijn wachtwoord invulde op een nagemaakte inlogpagina
M10 06:10 Monitor   schijf van PRINT-01 is voor 91% vol
M11 06:30 Web       startpagina van de publieke website vervangen door tekst van een onbekende partij
M12 06:45 AV        EICAR-testbestand gedetecteerd en verwijderd op de testmachine van beheer`,
      },
      questions: [
        { q: "Wat is het verschil tussen een event en een security-incident?", options: ["Een incident schaadt of bedreigt echt de vertrouwelijkheid, integriteit of beschikbaarheid; een event is elke gebeurtenis", "Een event is altijd erger dan een incident", "Er is geen verschil", "Een incident gebeurt alleen op Windows"], answer: 0, explain: "Elk incident is een event, maar niet elk event is een incident. Een incident richt schade aan of dreigt dat te doen." },
        { q: "Bij hoeveel van de twaalf meldingen is de vertrouwelijkheid, integriteit of beschikbaarheid echt geraakt, zodat je er een incident van maakt?", answer: ["4"],
          hints: ["Streep eerst weg wat routine is of wat door een maatregel is tegengehouden.", "Geblokkeerd, in quarantaine, geslaagd, verlopen en gewijzigd: dat zijn events. Kijk wat overblijft.", "Twee meldingen gaan over WS-HR-04, één over een wachtwoord dat in verkeerde handen is, één over de website."],
          wrong: { "3": "Je mist er één. Een wachtwoord dat op een nagemaakte pagina is ingevuld, is in handen van een ander: de vertrouwelijkheid is geraakt.", "5": "Eén te veel. De phishingmail (M03) en de poortscan (M01) zijn tegengehouden; het EICAR-bestand (M12) is een test.", "6": "Te veel. Alles wat geblokkeerd of in quarantaine is, heeft geen schade aangericht." },
          why: "Een SOC dat elk event als incident behandelt, verdrinkt. Een SOC dat een incident als event wegklikt, mist de inbraak. Dit onderscheid maak je tientallen keren per dienst.",
          explain: "M04 (inloggegevens uitgelezen), M07 (grote upload vanaf dezelfde werkplek), M09 (wachtwoord prijsgegeven) en M11 (website aangepast). De rest is routine of is tegengehouden." },
        { q: "Welke melding raakt in de eerste plaats de integriteit? (bijvoorbeeld M01)", answer: ["M11", "11"],
          hints: ["Integriteit gaat over de juistheid van informatie: is er iets veranderd dat niet veranderd had mogen worden?", "Zoek een melding waarin iets is vervangen of aangepast.", "Het gaat om de publieke website."],
          wrong: { "m07": "Een upload naar buiten raakt de vertrouwelijkheid: gegevens komen bij iemand die ze niet hoort te hebben.", "m04": "Het uitlezen van inloggegevens raakt de vertrouwelijkheid.", "m10": "Een volle schijf kan de beschikbaarheid raken, maar dit is een beheermelding, geen aanval." },
          explain: "M11: de inhoud van de website is zonder toestemming gewijzigd (defacement). Dat is een aantasting van de integriteit." },
      ],
    },

    {
      title: "Taak 2 — Het NIST Cybersecurity Framework 2.0: zes functies",
      tryFirst: true,
      intro: `<p>In het lab staan zestien activiteiten van een ziekenhuis. Ze horen bij vier van de zes functies van NIST CSF
        2.0: Govern, Identify, Protect en Detect. Zet ze bij de juiste functie. Respond en Recover oefen je in de volgende taken.</p>`,
      content: `
        <p>Het <strong>NIST Cybersecurity Framework</strong> (CSF) is een wereldwijd veelgebruikt kader, opgesteld door
        het Amerikaanse NIST (National Institute of Standards and Technology). Het helpt organisaties hun
        cyberweerbaarheid te ordenen. In versie <strong>2.0</strong> (2024) bestaat het uit <strong>zes functies</strong>.
        De eerste, GOVERN, is in 2.0 nieuw en omvat de andere vijf.</p>

        <table>
          <thead><tr><th>Functie</th><th>Nederlands</th><th>Waar het over gaat</th></tr></thead>
          <tbody>
            <tr><td><strong>GOVERN</strong></td><td>Besturen</td><td>Strategie, rollen, beleid en risicomanagement: wie is waarvoor verantwoordelijk?</td></tr>
            <tr><td><strong>IDENTIFY</strong></td><td>Identificeren</td><td>Weten wat je hebt en wat de risico's zijn: systemen, data, kwetsbaarheden.</td></tr>
            <tr><td><strong>PROTECT</strong></td><td>Beschermen</td><td>Maatregelen om aanvallen te voorkomen: toegangsbeheer, updates, back-ups, training.</td></tr>
            <tr><td><strong>DETECT</strong></td><td>Detecteren</td><td>Aanvallen en anomalieën op tijd opmerken: monitoring, logs, SIEM, IDS.</td></tr>
            <tr><td><strong>RESPOND</strong></td><td>Reageren</td><td>Handelen tijdens een incident: inperken, communiceren, onderzoeken.</td></tr>
            <tr><td><strong>RECOVER</strong></td><td>Herstellen</td><td>Terug naar normaal: systemen en data herstellen, en leren van wat gebeurde.</td></tr>
          </tbody>
        </table>

        <h3>Van vier fasen naar zes functies</h3>
        <p>Jarenlang leerde iedereen incidentrespons via de klassieke <strong>vier-fasen-cyclus</strong> uit de oude
        NIST-gids SP 800-61: <em>voorbereiding, detectie en analyse, inperking/uitroeiing/herstel, en activiteit na het
        incident</em>. In <strong>SP 800-61 Revisie 3</strong> (2025) heeft NIST de incidentrespons opnieuw opgehangen:
        niet meer als losstaande cyclus, maar <strong>rond de zes CSF 2.0-functies</strong>. De gedachte: incidentrespons
        is geen apart eilandje, maar verweven met je hele beveiligingsaanpak. Je bereidt je voor (Govern, Identify,
        Protect), je merkt het incident op (Detect), je handelt (Respond) en je herstelt (Recover).</p>

        <div class="callout info">
          <strong>Waarom dit handig is:</strong> de zes functies geven je een gemeenschappelijke taal. Of je nu met de
          directie praat (vooral Govern en Identify) of met de SOC-analist (vooral Detect en Respond), iedereen plaatst
          zijn werk in hetzelfde plaatje. Het is geen strak stappenplan maar een kapstok om je maatregelen aan op te
          hangen.
        </div>

        <h3>De analogie van het ziekenhuis</h3>
        <p>Denk aan gezondheid. GOVERN is het ziekenhuisbestuur dat beleid maakt. IDENTIFY is je medisch dossier: weten
        wat je hebt. PROTECT is gezond leven en vaccineren. DETECT is de controle die een probleem vroeg opspoort.
        RESPOND is de behandeling. RECOVER is de revalidatie én de evaluatie zodat het de volgende keer beter gaat.</p>
      `,
      lab: {
        type: "connections",
        title: "welke activiteit bij welke functie",
        prompt: "Groepeer de zestien activiteiten onder Govern, Identify, Protect of Detect (NIST CSF 2.0).",
        flag: "NM{zes_functies_een_taal}",
        groups: [
          { name: "Govern", items: ["Het bestuur stelt het beveiligingsbeleid vast", "Rollen en verantwoordelijkheden toewijzen", "Bepalen hoeveel risico acceptabel is", "Beveiligingseisen stellen aan leveranciers"] },
          { name: "Identify", items: ["Een inventaris bijhouden van alle servers en laptops", "Kwetsbaarheden opsporen en vastleggen", "Een risicoanalyse maken van het patiëntendossier", "Verbeterpunten uit een oefening vastleggen"] },
          { name: "Protect", items: ["MFA verplichten voor alle accounts", "Medewerkers trainen in het herkennen van phishing", "Back-ups maken en het terugzetten testen", "Updates installeren"] },
          { name: "Detect", items: ["Netwerkverkeer continu monitoren", "Alerts van de EDR beoordelen", "Afwijkend inloggedrag analyseren", "Vaststellen of een melding een incident is"] },
        ],
      },
      questions: [
        { q: "Hoeveel functies heeft het NIST Cybersecurity Framework 2.0?", options: ["Vier", "Vijf", "Zes", "Zeven"], answer: 2, explain: "CSF 2.0 heeft zes functies: Govern, Identify, Protect, Detect, Respond en Recover." },
        { q: "Welke vlag geeft het lab als alle zestien activiteiten bij de juiste functie staan?", answer: ["NM{zes_functies_een_taal}"],
          hints: ["Begin met de groep die je het zekerst weet. Het lab meldt het als drie van de vier kloppen.", "Govern is wie beslist en wie verantwoordelijk is. Identify is weten wat je hebt en waar het zwak is. Protect is voorkomen. Detect is opmerken.", "Back-ups en updates zijn Protect. Kwetsbaarheden vastleggen en verbeterpunten zijn Identify. Leverancierseisen zijn Govern."],
          wrong: { "/zes_functies$/": "Neem de vlag letterlijk over, inclusief accolades." },
          explain: "Opvallend voor veel mensen: back-ups maken valt onder Protect (je regelt het vooraf), terugzetten onder Recover. En leren van een oefening valt onder Identify (verbetering)." },
        { q: "Rond welk kader organiseert NIST SP 800-61 Revisie 3 (2025) de incidentrespons, in plaats van de oude vier-fasen-cyclus?", options: ["De zes functies van CSF 2.0", "De drie wetten van robotica", "De OSI-lagen", "De CIA-triade alleen"], answer: 0, explain: "SP 800-61r3 hangt incidentrespons op aan de zes CSF 2.0-functies in plaats van aan een losstaande 4-fasen-cyclus." },
        { q: "Onder welke functie valt het opmerken van een aanval via monitoring, logs en een SIEM?", answer: ["Detect", "detect", "Detecteren", "DETECT"], hint: "Engels voor 'detecteren'.", explain: "DETECT gaat over op tijd opmerken dat er iets mis is: monitoring, logs, SIEM en IDS." },
      ],
    },

    {
      title: "Taak 3 — De incident-levenscyclus in de praktijk",
      tryFirst: true,
      intro: `<p>Zes handelingen rond één ransomware-incident staan in het lab door elkaar. Zet ze in de volgorde waarin een
        goed team ze uitvoert. Eén verkeerde volgorde kan betekenen dat je twee keer wordt versleuteld.</p>`,
      content: `
        <p>Het framework is de kapstok; nu de kleren. In de praktijk doorloop je bij elk incident een aantal
        herkenbare stappen. We gebruiken de klassieke, praktische benamingen (die prima naast de CSF-functies passen).</p>

        <h3>De stappen</h3>
        <ol>
          <li><strong>Voorbereiding</strong> (Govern, Identify, Protect) — plan, rollen, contacten, back-ups en
          tooling op orde. Zie taak 1.</li>
          <li><strong>Detectie en analyse</strong> (Detect) — opmerken dat er iets mis is en uitzoeken wat, hoe erg,
          en welke systemen geraakt zijn. Hier lees je logs en bouw je een tijdlijn (volgende taak).</li>
          <li><strong>Inperking / containment</strong> (Respond) — de bloeding stelpen. Je isoleert het getroffen
          systeem zodat de aanval zich niet verder verspreidt, bijvoorbeeld door het van het netwerk te halen.</li>
          <li><strong>Uitroeiing / eradication</strong> (Respond) — de oorzaak weghalen: malware verwijderen, het
          misbruikte account blokkeren, het gat (de kwetsbaarheid) dichten.</li>
          <li><strong>Herstel / recovery</strong> (Recover) — systemen en data schoon en veilig terugbrengen,
          bijvoorbeeld vanaf een betrouwbare back-up, en extra in de gaten houden of het echt weg is.</li>
          <li><strong>Geleerde lessen / lessons learned</strong> (Identify: verbetering, ID.IM) — kort na afloop: wat ging goed, wat
          kon beter, welke maatregel voorkomt herhaling? Dit sluit de cirkel en voedt weer de voorbereiding.</li>
        </ol>

        <div class="callout warn">
          <strong>Volgorde telt:</strong> eerst <em>containment</em> (verspreiding stoppen), dan pas
          <em>eradication</em> (oorzaak weghalen) en <em>recovery</em> (terugbrengen). Herstel je te vroeg vanaf een
          back-up terwijl de aanvaller nog binnen is of het gat nog openstaat, dan ben je zo weer besmet. Eerst de
          deur dicht, dan de boel opruimen.
        </div>

        <h3>De analogie van de lekkage</h3>
        <p>Je huis staat blank. <strong>Containment</strong>: draai de hoofdkraan dicht zodat er geen water meer bij
        komt. <strong>Eradication</strong>: repareer de gesprongen leiding (de oorzaak). <strong>Recovery</strong>:
        pomp het water weg, droog de boel en trek weer in. <strong>Lessons learned</strong>: plaats een lekdetector,
        zodat je het de volgende keer eerder ziet. Dweilen met de kraan open — meteen herstellen zonder eerst de
        oorzaak weg te nemen — is precies wat je niet wilt.</p>
      `,
      lab: {
        type: "ordering",
        title: "ransomware op WS-HR-04 en FS-01",
        prompt: "Zes handelingen van het incidentteam. Zet ze in de juiste volgorde.",
        items: [
          { id: "s1", label: "Maanden eerder: het team oefent het ransomware-playbook aan tafel en test of de back-up terug te zetten is." },
          { id: "s2", label: "De SOC-analist bevestigt de EDR-alert en stelt vast dat WS-HR-04 en FS-01 zijn geraakt." },
          { id: "s3", label: "WS-HR-04 en FS-01 worden van het netwerk geïsoleerd; het account h.smit wordt geblokkeerd." },
          { id: "s4", label: "De malware en de kwaadaardige geplande taak worden verwijderd, en uitvoerbare bijlagen worden voortaan door het mailfilter geblokkeerd." },
          { id: "s5", label: "FS-01 wordt opnieuw opgebouwd en de data wordt teruggezet vanaf de offline back-up." },
          { id: "s6", label: "Het team bespreekt wat goed ging en wat traag ging, en wijst per verbeterpunt een eigenaar aan." },
        ],
        correct: ["s1", "s2", "s3", "s4", "s5", "s6"],
        flag: "NM{eerst_de_kraan_dicht}",
        explain: "Voorbereiding, detectie en analyse, containment, eradication, recovery, lessons learned.",
      },
      questions: [
        { q: "Wat is de juiste volgorde van deze drie stappen?", options: ["Containment, eradication, recovery", "Recovery, containment, eradication", "Eradication, recovery, containment", "Recovery, eradication, containment"], answer: 0, explain: "Eerst de verspreiding stoppen (containment), dan de oorzaak weghalen (eradication), dan herstellen (recovery)." },
        { q: "Op welke plek (1 tot 6) staat het verwijderen van de malware en de geplande taak?", answer: ["4", "plek 4"],
          hints: ["Bedenk welke stap dit is: de oorzaak weghalen.", "Dat is eradication. Wat moet daarvoor gebeurd zijn, en wat mag pas daarna?", "Na het isoleren, vóór het terugzetten van de back-up."],
          wrong: { "3": "Plek 3 is containment: eerst zorgen dat het zich niet verder verspreidt. Opruimen op een systeem dat nog aan het netwerk hangt, is dweilen met de kraan open.", "5": "Dan zet je de back-up terug terwijl de malware en de geplande taak er nog staan. De aanvaller is zo weer binnen." },
          why: "De meest gemaakte fout onder druk is te vroeg herstellen. Wie de oorzaak niet weghaalt, zet zijn back-up terug in een omgeving waar de aanvaller nog rondloopt.",
          explain: "Plek 4, eradication: na containment (plek 3) en vóór recovery (plek 5)." },
        { q: "Waarom mag je niet te vroeg herstellen vanaf een back-up?", options: ["Als de aanvaller nog binnen is of het gat nog openstaat, ben je zo weer besmet", "Back-ups zijn altijd kapot", "Herstellen kost te veel tijd", "Dat mag juist wel altijd meteen"], answer: 0, explain: "Zonder eerst containment en eradication herstel je in een onveilige situatie en loop je opnieuw besmetting op." },
        { q: "Welke vlag toont het lab als alle zes handelingen op de juiste plek staan?", answer: ["NM{eerst_de_kraan_dicht}"],
          hints: ["De knop \"Controleer volgorde\" zegt hoeveel er goed staan.", "De oefening komt eerst, de evaluatie laatst. Daartussen: vaststellen, isoleren, opruimen, terugzetten.", "Oefenen, alert bevestigen, isoleren, malware verwijderen, back-up terugzetten, evalueren."],
          explain: "Voorbereiding, detectie en analyse, containment, eradication, recovery, lessons learned." },
      ],
    },

    {
      title: "Taak 4 — Detectie en analyse: een ransomware-aanval lezen",
      tryFirst: true,
      intro: `<p>Het is 3 oktober, kort na twee uur 's nachts. De EDR op bestandsserver <code>NM-FS01</code> heeft alarm geslagen.
        Lees de tijdlijn in het lab en reconstrueer wat er gebeurde. Gebruik het filter van de viewer.</p>`,
      content: `
        <p>Tijd voor de praktijk van de DETECT-functie. Hieronder zie je een tijdlijn uit de <strong>EDR</strong>
        (Endpoint Detection and Response: beveiligingssoftware op een werkplek/server die processen en
        bestandsacties bewaakt) van bestandsserver <code>NM-FS01</code>. Er is iets grondig mis. Gebruik het filter
        van de viewer om het verhaal te reconstrueren.</p>

        <h3>Het patroon van ransomware</h3>
        <p><strong>Ransomware</strong> is gijzelsoftware: ze versleutelt je bestanden en eist losgeld. Een typisch
        aanvalsverloop zie je hier terug:</p>
        <ol>
          <li><strong>Binnenkomst.</strong> Een gebruiker opent een bijlage die zich voordoet als een PDF maar in
          werkelijkheid een programma is (let op de dubbele extensie <code>.pdf.exe</code>). Daarna legt het programma
          verbinding met een server van de aanvaller (<em>command and control</em>).</li>
          <li><strong>Back-ups saboteren.</strong> Slimme ransomware wist eerst je lokale herstelmogelijkheden, zodat
          je niet zomaar kunt terugdraaien. Filter op <code>vssadmin</code>: dat commando verwijdert de
          <em>volume shadow copies</em> (schaduwkopieën) van Windows. Ook <code>wbadmin</code> en <code>bcdedit</code>
          worden misbruikt om herstel onmogelijk te maken.</li>
          <li><strong>Versleutelen.</strong> Daarna hernoemt en versleutelt ze massaal bestanden. Filter op
          <code>kryptlock</code>: alle bestanden krijgen die extensie. Er verschijnt ook overal een losgeldbrief
          (filter op <code>LEES_DIT_HERSTEL</code>).</li>
          <li><strong>Detectie en containment.</strong> De EDR herkent het gedrag, slaat alarm en isoleert
          automatisch de host.</li>
        </ol>

        <div class="callout tip">
          <strong>Filtertip:</strong> filter op <code>ALERT</code> om meteen naar de twee EDR-meldingen te springen.
          De eerste alert (<code>Detection=Ransom.Generic.Locker</code>) heeft een <code>incident-tag</code>: daarin
          staat de vlag. Filter daarna eens op <code>vssadmin</code> en op <code>.kryptlock</code> om te zien wat er
          gebeurde.
        </div>

        <p>Zie je dat de back-ups (schaduwkopieën) zijn gewist, dan weet je meteen dat lokaal herstellen niet gaat
        lukken — en dat een goede, <em>offline</em> back-up (zie de volgende room) letterlijk je redding is.</p>
      `,
      lab: {
        type: "logs",
        title: "EDR-tijdlijn — NM-FS01 (bestandsserver)",
        lines: EDR_LOG,
      },
      questions: [
        { q: "Welk verdacht bestand werd uitgevoerd dat zich voordeed als een PDF?", answer: ["factuur_oktober.pdf.exe", "factuur_oktober.pdf.exe"], hint: "Let op de dubbele extensie; het eindigt niet op .pdf maar op .exe.", explain: "factuur_oktober.pdf.exe is een programma vermomd als PDF: de dubbele extensie is een klassieke truc." },
        { q: "Hoeveel seconden zaten er tussen het starten van dat bestand en het wissen van de schaduwkopieën?", answer: ["17", "17 seconden", "17s"],
          hints: ["Je hebt twee tijdstippen nodig: de start van het bestand en het commando dat de schaduwkopieën verwijdert.", "Filter op vssadmin voor het tweede tijdstip.", "Van 02:03:44 tot 02:04:01."],
          wrong: { "18": "Dat is de tijd tot wbadmin (02:04:02). De schaduwkopieën worden gewist door vssadmin, een seconde eerder.", "15": "Dat is gerekend vanaf de netwerkverbinding (02:03:46). De vraag begint bij de start van het bestand.", "46": "Dat is de tijd tot de eerste EDR-alert." },
          why: "Zeventien seconden is te kort voor een mens. Daarom moet dit gedrag (vssadmin delete shadows) een automatische blokkade of isolatie opleveren, geen ticket.",
          explain: "02:03:44 start, 02:04:01 vssadmin delete shadows: 17 seconden. Lokaal herstellen was daarna al onmogelijk." },
        { q: "Hoeveel seconden zaten er tussen de eerste EDR-alert en het moment waarop de host werd geïsoleerd?", answer: ["95", "95 seconden", "95s"],
          hints: ["Filter op EDR: je ziet twee alerts en één actie.", "De eerste alert is om 02:04:30. Zoek de regel met Host-Isolation.", "Van 02:04:30 tot 02:06:05."],
          wrong: { "5": "Dat is de tijd tussen de tweede alert en de isolatie. De eerste alert kwam ruim anderhalve minuut eerder.", "90": "Dat is de tijd tot de tweede alert (02:06:00). De isolatie volgt vijf seconden later." },
          explain: "02:04:30 tot 02:06:05 is 95 seconden. In die tijd werden 1284 bestanden versleuteld. De isolatie kwam pas na de tweede alert." },
        { q: "Wat is de vlag in de incident-tag van de eerste EDR-alert?", answer: ["NM{schaduwkopieen_gewist}"], hint: "Filter op ALERT en lees de incident-tag bij Ransom.Generic.Locker.", explain: "De EDR tagde het incident: NM{schaduwkopieen_gewist}." },
        { q: "Naar welk IP-adres maakte het programma verbinding, vóór en na het versleutelen?", answer: ["203.0.113.66"],
          hints: ["Zoek de netwerkgebeurtenissen van het verdachte proces.", "Filter op NetworkConnect of op EventID=3.", "Het adres begint met 203.0.113."],
          explain: "203.0.113.66 op poort 443, twee keer. Verkeer naar buiten vóór het versleutelen kan betekenen dat er ook gegevens zijn meegenomen. Dat is van belang voor de meldplicht in taak 6." },
      ],
    },

    {
      title: "Taak 5 — Containment, eradication en recovery",
      tryFirst: true,
      intro: `<p>Jij hebt vannacht dienst. In het lab neem je zes beslissingen, van de eerste minuten tot het herstel op dag
        drie. Je krijgt na elke keuze te horen waarom ze goed of fout was. Met vijf goede keuzes verdien je de vlag.</p>`,
      content: `
        <p>Je hebt de ransomware op <code>NM-FS01</code> gedetecteerd en geanalyseerd. Nu het echte werk van de
        RESPOND- en RECOVER-functies. We lopen de stappen langs met concrete do's en don'ts.</p>

        <h3>1. Containment — stop de verspreiding</h3>
        <ul>
          <li><strong>Doe:</strong> isoleer de getroffen machine (netwerkkabel eruit of poort blokkeren). De EDR deed
          dit hier al automatisch. Blokkeer het misbruikte account en de verbinding naar het command-and-control-IP
          (<code>203.0.113.66</code>).</li>
          <li><strong>Doe niet:</strong> de machine meteen uitzetten. In het werkgeheugen (RAM) kan waardevol bewijs
          staan (sleutels, processen) dat verdwijnt bij uitschakelen. Isoleren mag, uitzetten alleen weloverwogen.</li>
        </ul>

        <div class="callout danger">
          <strong>Bewijs veiligstellen (forensics):</strong> maak zo mogelijk eerst een kopie (image) van het systeem
          en bewaar de logs. Noteer wie wat wanneer deed: de <em>chain of custody</em> (bewijsketen). Dat is belangrijk
          voor onderzoek, verzekering en een eventuele aangifte bij de Politie.
        </div>

        <h3>2. Eradication — haal de oorzaak weg</h3>
        <ul>
          <li>Verwijder de malware en alle sporen (zoals een via de aanvaller aangemaakt account of een geplande taak).</li>
          <li>Dicht het gat waardoor het binnenkwam: hier bijvoorbeeld e-mailfilters aanscherpen en uitvoerbare
          bijlagen blokkeren, plus de betrokken gebruiker voorlichten.</li>
          <li>Reset wachtwoorden van betrokken accounts; ga ervan uit dat ze gecompromitteerd zijn.</li>
        </ul>

        <h3>3. Recovery — breng veilig terug naar normaal</h3>
        <ul>
          <li>Herstel data vanaf een <strong>schone, offline back-up</strong>. Omdat de schaduwkopieën gewist zijn, is
          dat hier de enige veilige route. Herbouw de server zo nodig helemaal opnieuw.</li>
          <li>Herstel gefaseerd en houd de systemen daarna extra in de gaten (verscherpte monitoring) om zeker te
          weten dat de aanvaller echt weg is.</li>
        </ul>

        <div class="callout warn">
          <strong>Betaal geen losgeld.</strong> Het advies van onder meer het NCSC en de Politie is: betaal niet. Je
          hebt geen garantie dat je je data terugkrijgt, je financiert criminelen, en je maakt jezelf een aantrekkelijk
          doelwit. Een geteste back-up maakt betalen bovendien overbodig.
        </div>
      `,
      lab: {
        type: "scenario",
        title: "ransomware op NM-FS01",
        scenario: "3 oktober 2026, 02:10. De EDR heeft bestandsserver NM-FS01 vier minuten geleden automatisch geïsoleerd. Jij bent de incident lead.",
        pass: 5,
        flag: "NM{eerst_inperken_dan_herstellen}",
        steps: [
          { situation: "02:10. Een collega stelt voor om NM-FS01 uit te zetten, \"voor de zekerheid\".", choices: [
            { label: "Uitzetten: dan kan er niets meer gebeuren", good: false, feedback: "Bij uitzetten verdwijnt het werkgeheugen, en daarmee lopende processen, netwerkverbindingen en mogelijk sleutels. De host is al geïsoleerd; de verspreiding is gestopt." },
            { label: "Aan laten en geïsoleerd houden; eerst geheugen en logs veiligstellen", good: true, feedback: "Juist. De isolatie stopt de verspreiding, en het vluchtige bewijs blijft bewaard tot het is veiliggesteld." },
            { label: "De isolatie opheffen om te zien welke gebruikers er nog bij kunnen", good: false, feedback: "Dan geef je de ransomware weer toegang tot het netwerk en de andere shares." },
          ] },
          { situation: "02:20. Het bestand is gestart onder het account mkoster en maakte verbinding met 203.0.113.66.", choices: [
            { label: "Niets: de server is al geïsoleerd", good: false, feedback: "Het account en het externe adres bestaan ook buiten deze server. Met hetzelfde account kan de aanvaller op andere systemen inloggen." },
            { label: "Het account mkoster blokkeren, zijn sessies beëindigen en verkeer naar 203.0.113.66 blokkeren op de firewall", good: true, feedback: "Juist. Containment gaat over alles wat de aanvaller kan gebruiken, niet alleen over één machine." },
            { label: "mkoster morgenochtend vragen zijn wachtwoord te wijzigen", good: false, feedback: "Tot die tijd is het account bruikbaar voor de aanvaller. Bij een actief incident blokkeer je direct." },
          ] },
          { situation: "02:40. De directeur belt: \"Zet de back-up nu terug. Maandag moet iedereen kunnen werken.\"", choices: [
            { label: "Direct de back-up terugzetten op NM-FS01", good: false, feedback: "Je weet nog niet hoe de aanvaller binnenkwam en of hij elders nog zit. Herstel je nu, dan kun je binnen een uur opnieuw versleuteld zijn." },
            { label: "Uitleggen dat eerst de oorzaak en de omvang worden vastgesteld, en een realistische planning voor het herstel geven", good: true, feedback: "Juist. Eerst containment en eradication, dan recovery. De directeur heeft een planning nodig, geen valse belofte." },
            { label: "Voorstellen het losgeld te betalen, omdat dat sneller is", good: false, feedback: "Betalen geeft geen garantie, financiert de daders en lost de oorzaak niet op. Er is bovendien een offline back-up." },
          ] },
          { situation: "03:30. Je stelt bewijs veilig voor onderzoek, verzekering en een mogelijke aangifte.", choices: [
            { label: "Eerst de malware verwijderen, daarna een kopie van de schijf maken", good: false, feedback: "Dan heb je het bewijs veranderd voordat het is vastgelegd." },
            { label: "Een geheugendump en een schijfkopie maken, de hashes noteren en bijhouden wie wat wanneer deed", good: true, feedback: "Juist. Eerst het vluchtige (geheugen), dan de schijf, met hashes en een sluitende bewijsketen (chain of custody)." },
            { label: "Een foto van de losgeldbrief is voldoende", good: false, feedback: "De brief bewijst dát er iets gebeurde, niet hoe, wanneer en door welk account." },
          ] },
          { situation: "09:00. In de versleutelde mappen stonden salaris- en verzuimgegevens. Vóór de versleuteling was er verkeer naar het adres van de aanvaller.", choices: [
            { label: "Versleuteld is niet gelekt, dus er hoeft niets gemeld te worden", good: false, feedback: "Ook verlies van beschikbaarheid van persoonsgegevens is een inbreuk, en het verkeer naar buiten kan betekenen dat er gegevens zijn meegenomen." },
            { label: "Wachten met melden tot het forensisch rapport klaar is", good: false, feedback: "De termijn van 72 uur loopt vanaf het moment van ontdekking. Je mag melden met wat je weet en later aanvullen." },
            { label: "Uitgaan van een mogelijk datalek, de functionaris gegevensbescherming inschakelen en de melding aan de AP voorbereiden", good: true, feedback: "Juist. De klok loopt sinds vannacht. Melden kan in stappen." },
          ] },
          { situation: "Dag 3. De oorzaak is bekend en verholpen. Hoe breng je NM-FS01 terug?", choices: [
            { label: "De ransomware met een virusscanner verwijderen en de server weer aansluiten", good: false, feedback: "Je weet niet wat de aanvaller nog meer heeft achtergelaten. Een systeem waarop iemand beheerrechten had, vertrouw je niet meer." },
            { label: "De schaduwkopieën van Windows terugzetten", good: false, feedback: "Die zijn in de eerste seconden van de aanval gewist." },
            { label: "De server opnieuw opbouwen, data terugzetten vanaf de offline back-up, wachtwoorden resetten en daarna verscherpt monitoren", good: true, feedback: "Juist. Schoon opbouwen, terugzetten vanaf een back-up waar de aanvaller niet bij kon, en blijven kijken of hij terugkomt." },
          ] },
        ],
      },
      questions: [
        { q: "Waarom isoleer je een besmette machine liever van het netwerk dan dat je hem meteen uitzet?", options: ["Uitzetten wist het werkgeheugen (RAM), waar waardevol bewijs kan staan", "Uitzetten gaat te langzaam", "Een machine mag nooit uit", "Isoleren is hetzelfde als uitzetten"], answer: 0, explain: "Isoleren stopt de verspreiding terwijl je bewijs in het RAM behoudt; uitzetten kan dat bewijs vernietigen." },
        { q: "Welke vlag krijg je als je in het scenario minstens vijf van de zes beslissingen goed neemt?", answer: ["NM{eerst_inperken_dan_herstellen}"],
          hints: ["Lees na een foute keuze de uitleg en gebruik de knop \"Opnieuw\".", "Vraag je bij elke stap af: stopt dit de verspreiding, bewaart dit bewijs, en is de oorzaak al weg?", "Niet uitzetten, account en adres blokkeren, niet te vroeg herstellen, eerst geheugen dan schijf, melden met wat je weet, schoon opbouwen."],
          explain: "De rode draad: eerst inperken en bewijs bewaren, dan de oorzaak weghalen, dan pas herstellen. En de meldplicht loopt ondertussen door." },
        { q: "Wat is het advies van NCSC en Politie over het betalen van losgeld bij ransomware?", options: ["Niet betalen: geen garantie, je financiert criminelen en wordt een doelwit", "Altijd meteen betalen", "Onderhandelen tot de helft", "Alleen betalen bij kleine bedragen"], answer: 0, explain: "Betalen geeft geen garantie en houdt het verdienmodel in stand; een geteste back-up maakt het overbodig." },
        { q: "De laatste offline back-up van NM-FS01 is van vrijdag 2 oktober 22:00. Het kwaadaardige bestand startte op 3 oktober om 02:03. Hoeveel hele uren aan wijzigingen ben je na het terugzetten hooguit kwijt?", answer: ["4", "4 uur"],
          hints: ["Alles wat na de back-up is gewijzigd, staat er niet in.", "Reken van het moment van de back-up tot het begin van de besmetting.", "Van 22:00 tot 02:03 de volgende dag."],
          wrong: { "0": "De back-up is van vóór de besmetting. Wat daarna nog is opgeslagen, staat er niet in.", "24": "De back-up is van de avond ervoor, niet van een etmaal eerder." },
          explain: "Ruim vier uur. In vakjargon: het werkelijke dataverlies, dat je vergelijkt met het afgesproken Recovery Point Objective (RPO). Midden in de nacht valt dat mee; midden op een werkdag is vier uur veel." },
      ],
    },

    {
      title: "Taak 6 — Melden: AVG en NIS2 (Cyberbeveiligingswet)",
      content: `
        <p>Een incident afhandelen is niet alleen techniek. Er gelden in Nederland en de EU ook <strong>wettelijke
        meldplichten</strong>. Wie te laat of niet meldt, riskeert flinke boetes. Twee sporen zijn voor jou belangrijk.</p>

        <h3>1. Datalek? Melden bij de Autoriteit Persoonsgegevens</h3>
        <p>Zijn er <strong>persoonsgegevens</strong> gelekt, vernietigd of ingezien (zoals de HR- en
        salarisbestanden op <code>NM-FS01</code>), dan is er sprake van een <strong>datalek</strong>. Onder de
        <strong>AVG</strong> (Algemene verordening gegevensbescherming; Engels: GDPR) moet je zo'n datalek in beginsel
        <strong>binnen 72 uur</strong> melden bij de <strong>Autoriteit Persoonsgegevens</strong> (AP), tenzij het
        waarschijnlijk geen risico voor de betrokkenen oplevert. Is het risico voor de betrokkenen hoog, dan moet je
        ook <em>hen</em> informeren.</p>

        <div class="callout info">
          <strong>Onthoud de 72 uur:</strong> de klok begint te lopen zodra je van het datalek op de hoogte bent. Je
          hoeft nog niet alles te weten; je mag melden en later aanvullen. Beter op tijd en onvolledig dan te laat.
        </div>

        <h3>2. Essentiële of belangrijke organisatie? NIS2 / Cyberbeveiligingswet</h3>
        <p>De EU heeft met de <strong>NIS2-richtlijn</strong> strengere cybersecurity-eisen ingevoerd voor sectoren die
        de samenleving draaiende houden: energie, water, zorg, transport, digitale infrastructuur, overheid en meer.
        Nederland zet NIS2 om in de <strong>Cyberbeveiligingswet</strong>, waarvan de inwerkingtreding meermaals is verschoven; controleer de actuele datum bij het NCSC of de Rijksoverheid. Valt jouw organisatie eronder als <em>essentiële</em> of <em>belangrijke</em>
        entiteit, dan gelden onder andere:</p>
        <ul>
          <li>Een <strong>zorgplicht</strong>: passende technische en organisatorische maatregelen nemen.</li>
          <li>Een <strong>meldplicht</strong> bij significante incidenten: een eerste melding al <strong>binnen 24
          uur</strong> (een vroege waarschuwing), gevolgd door uitgebreidere meldingen daarna.</li>
          <li>Verantwoordelijkheid bij de <strong>bestuurders</strong> zelf (dit raakt de GOVERN-functie uit taak 2).</li>
        </ul>
        <p>Het <strong>NCSC</strong> is in Nederland een centraal punt voor hulp en informatie bij incidenten. Meldingen
        onder de Cyberbeveiligingswet lopen via de aangewezen toezichthouder en het CSIRT voor jouw sector.</p>

        <div class="callout warn">
          <strong>Twee sporen tegelijk:</strong> een ransomware-aanval met gelekte persoonsgegevens bij een
          ziekenhuis raakt <em>beide</em> meldplichten: datalek bij de AP (AVG) en incident onder de
          Cyberbeveiligingswet (NIS2). Ze staan los van elkaar; vink ze allebei af.
        </div>
      `,
      questions: [
        { q: "Een bedrijf ontdekt op zaterdag 3 oktober 2026 om 02:06 dat persoonsgegevens zijn geraakt. Op welke datum verloopt de termijn voor de melding bij de Autoriteit Persoonsgegevens? (DD-MM)", answer: ["06-10", "6-10", "6 oktober", "06-10-2026", "6-10-2026", "dinsdag 6 oktober"],
          hints: ["De termijn staat in de AVG en loopt vanaf het moment dat je het weet.", "Reken 72 uur vanaf zaterdag 02:06. Weekenddagen tellen gewoon mee.", "72 uur is precies drie etmalen."],
          wrong: { "05-10": "Dat is 48 uur. De termijn is 72 uur, dus drie etmalen.", "5-10": "Dat is 48 uur. De termijn is 72 uur, dus drie etmalen.", "08-10": "Je hebt het weekend overgeslagen. De 72 uur zijn kalenderuren, geen werkdagen.", "8-10": "Je hebt het weekend overgeslagen. De 72 uur zijn kalenderuren, geen werkdagen.", "04-10": "Dat is 24 uur: de termijn voor de vroege waarschuwing onder NIS2, niet die van de AVG." },
          why: "De termijn loopt door in het weekend, juist wanneer veel aanvallen beginnen. Wie pas maandag aan de melding denkt, heeft al meer dan de helft van de tijd verbruikt.",
          explain: "Zaterdag 3 oktober 02:06 plus 72 uur is dinsdag 6 oktober 02:06. Je mag melden met wat je weet en later aanvullen." },
        { q: "Hoe heet de Nederlandse wet die de EU-richtlijn NIS2 omzet?", answer: ["Cyberbeveiligingswet", "cyberbeveiligingswet", "de Cyberbeveiligingswet"], hint: "De wet die zorgplicht en meldplicht regelt voor essentiële en belangrijke organisaties.", explain: "Nederland implementeert NIS2 via de Cyberbeveiligingswet." },
        { q: "Een webwinkel in fietsonderdelen met twaalf medewerkers, geen essentiële of belangrijke entiteit, ontdekt dat het klantenbestand is gestolen. Hoeveel van de twee meldplichten uit deze taak gelden voor deze winkel?", answer: ["1"],
          hints: ["Loop de twee sporen los van elkaar na.", "Zijn er persoonsgegevens geraakt? Valt de organisatie onder NIS2?", "Een klantenbestand bevat persoonsgegevens. De winkel is geen NIS2-entiteit."],
          wrong: { "2": "NIS2 geldt voor essentiële en belangrijke entiteiten. Deze winkel is dat niet.", "0": "Een gestolen klantenbestand is een datalek. De AVG geldt voor elke organisatie die persoonsgegevens verwerkt, groot of klein." },
          explain: "Eén: de melding van het datalek bij de AP onder de AVG. De AVG kent geen ondergrens voor de omvang van de organisatie." },
        { q: "Een ransomware-aanval bij een ziekenhuis lekt patiëntgegevens. Welke meldplichten spelen er?", options: ["Beide: datalek bij de AP (AVG) en incident onder de Cyberbeveiligingswet (NIS2)", "Alleen de AVG", "Alleen NIS2", "Geen enkele"], answer: 0, explain: "De sporen staan los: een datalek meld je bij de AP, en als essentiële organisatie meld je het incident ook onder NIS2." },
      ],
    },

    {
      title: "Taak 7 — Lessons learned en het playbook",
      tryFirst: true,
      intro: `<p>Een tandartsengroep werd op één dag twee keer versleuteld. Jij leidt de evaluatie. In het lab staat de tijdlijn
        van beide dagen. Zoek uit wat er misging in de aanpak; de vragen over het lab staan onderaan.</p>`,
      content: `
        <p>Het vuur is uit, de systemen draaien weer. De verleiding is groot om opgelucht door te gaan met de orde van
        de dag. Maar de belangrijkste winst zit in de laatste stap: <strong>leren</strong>.</p>

        <h3>De evaluatie (post-incident review)</h3>
        <p>Kort na afloop (als het nog vers is) zet je de betrokkenen bij elkaar voor een eerlijke terugblik. Geen
        schuldigen aanwijzen, wel het proces verbeteren. Drie kernvragen:</p>
        <ul>
          <li><strong>Wat ging goed?</strong> Welke maatregelen en afspraken werkten en moeten we behouden?</li>
          <li><strong>Wat ging mis of traag?</strong> Waar liepen we vast — ontbrekende contacten, onduidelijke rollen,
          een back-up die niet bleek te werken?</li>
          <li><strong>Wat veranderen we?</strong> Concrete, toegewezen acties met een eigenaar en een datum. Een
          lesson learned zonder actiehouder is een vrome wens.</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> zet veelvoorkomende incidenten vast in een <strong>playbook</strong> (ook wel
          <em>runbook</em>): een kant-en-klaar stappenplan voor bijvoorbeeld "ransomware" of "gephishte gebruiker". Zo
          hoeft het team het wiel niet opnieuw uit te vinden onder druk, en starten ook minder ervaren collega's goed.
        </div>

        <h3>De cirkel is rond</h3>
        <p>Merk op hoe lessons learned terugvoedt naar de <strong>voorbereiding</strong> (en naar GOVERN en PROTECT):
        je plan wordt beter, je maatregelen scherper, je team geoefender. Zo is incidentrespons geen eenmalige brand
        maar een doorlopende verbetercyclus. Elk incident maakt je volgende reactie beter.</p>

        <h3>Samenvatting van de room</h3>
        <ul>
          <li>Een incident schaadt echt je informatie; voorbereiding is de belangrijkste fase.</li>
          <li>CSF 2.0 ordent alles in zes functies: Govern, Identify, Protect, Detect, Respond, Recover. SP 800-61r3
          (2025) hangt incidentrespons daaraan op.</li>
          <li>In de praktijk: detectie en analyse, dan containment, eradication en recovery, en tot slot lessons
          learned.</li>
          <li>Vergeet de meldplichten niet: datalek bij de AP (AVG, 72 uur) en incidenten onder de Cyberbeveiligingswet
          (NIS2).</li>
        </ul>
      `,
      lab: {
        type: "timeline",
        title: "Tandartsengroep Molenwijk, 2 en 3 november 2026 (UTC)",
        events: [
          { t: "2026-11-02 20:00:00", src: "Back-up", host: "PRAK-FS02", desc: "offline back-up geslaagd" },
          { t: "2026-11-02 21:14:09", src: "Mailgateway", host: "MX-01", user: "s.visser", desc: "mail \"Pakbon 88213\" afgeleverd, bijlage pakbon_88213.pdf.exe" },
          { t: "2026-11-02 21:20:33", src: "Sysmon", host: "WS-BALIE-02", user: "s.visser", desc: "pakbon_88213.pdf.exe gestart" },
          { t: "2026-11-02 21:21:02", src: "Security", host: "WS-BALIE-02", user: "s.visser", desc: "4698 geplande taak \"DriverSyncCheck\" aangemaakt: start C:\\ProgramData\\drvsync\\ds.exe elk uur" },
          { t: "2026-11-02 21:21:40", src: "Firewall", host: "WS-BALIE-02", desc: "uit naar 198.51.100.200:443" },
          { t: "2026-11-02 22:21:02", src: "Sysmon", host: "WS-BALIE-02", user: "s.visser", desc: "ds.exe gestart door taak DriverSyncCheck" },
          { t: "2026-11-02 23:05:44", src: "Security", host: "WS-BALIE-01", user: "a.yilmaz", desc: "4634 afmelding" },
          { t: "2026-11-03 01:12:30", src: "Security", host: "PRAK-FS02", user: "s.visser", desc: "4624 aanmelding type 3 (netwerk) vanaf WS-BALIE-02" },
          { t: "2026-11-03 01:15:11", src: "Sysmon", host: "PRAK-FS02", user: "s.visser", desc: "vssadmin.exe delete shadows /all /quiet" },
          { t: "2026-11-03 01:16:00", src: "FileAudit", host: "PRAK-FS02", desc: "2.310 bestanden hernoemd naar .molenlock" },
          { t: "2026-11-03 01:16:20", src: "EDR", host: "PRAK-FS02", desc: "ALERT Behavior.MassFileEncrypt (geen automatische isolatie ingesteld)" },
          { t: "2026-11-03 06:30:12", src: "Security", host: "WS-BALIE-01", user: "a.yilmaz", desc: "4624 aanmelding type 2 (interactief)" },
          { t: "2026-11-03 07:40:00", src: "Helpdesk", host: "PRAK-FS02", user: "a.yilmaz", desc: "melding: de agenda opent niet, bestanden hebben een vreemde extensie" },
          { t: "2026-11-03 07:55:00", src: "IR", host: "PRAK-FS02", desc: "PRAK-FS02 van het netwerk gehaald" },
          { t: "2026-11-03 08:30:00", src: "IR", host: "PRAK-FS02", desc: "versleutelde bestanden en losgeldbrieven verwijderd van PRAK-FS02" },
          { t: "2026-11-03 09:10:00", src: "IR", host: "PRAK-FS02", desc: "terugzetten gestart vanaf de offline back-up van 2 november 20:00" },
          { t: "2026-11-03 11:45:00", src: "IR", host: "PRAK-FS02", desc: "PRAK-FS02 weer aangesloten; de praktijken werken weer" },
          { t: "2026-11-03 12:21:02", src: "Sysmon", host: "WS-BALIE-02", user: "s.visser", desc: "ds.exe gestart door taak DriverSyncCheck" },
          { t: "2026-11-03 12:24:37", src: "Security", host: "PRAK-FS02", user: "s.visser", desc: "4624 aanmelding type 3 (netwerk) vanaf WS-BALIE-02" },
          { t: "2026-11-03 12:26:05", src: "FileAudit", host: "PRAK-FS02", desc: "2.298 bestanden hernoemd naar .molenlock" },
          { t: "2026-11-03 12:26:30", src: "EDR", host: "PRAK-FS02", desc: "ALERT Behavior.MassFileEncrypt" },
          { t: "2026-11-03 12:40:00", src: "IR", host: "PRAK-FS02", desc: "PRAK-FS02 opnieuw van het netwerk gehaald" },
        ],
      },
      questions: [
        { q: "Wat is het belangrijkste doel van een post-incident review (lessons learned)?", options: ["Het proces verbeteren en herhaling voorkomen, niet schuldigen aanwijzen", "Een schuldige vinden en straffen", "Zo snel mogelijk vergeten wat er gebeurde", "Alleen de kosten berekenen"], answer: 0, explain: "Een eerlijke, blame-vrije evaluatie levert concrete verbeteracties op." },
        { q: "Hoe heet een kant-en-klaar stappenplan voor een specifiek type incident, zoals ransomware?", answer: ["playbook", "runbook", "een playbook"], hint: "Engels; ook wel runbook genoemd.", explain: "Een playbook (runbook) geeft het team een beproefd stappenplan onder druk." },
        { q: "Tijdlijn: op welk systeem had het team óók moeten ingrijpen, maar gebeurde dat op 3 november niet? (hostnaam)", answer: ["WS-BALIE-02", "ws-balie02", "balie-02"],
          hints: ["Het team werkte alleen op de server. Waar begon de aanval?", "Filter op Sysmon en kijk op welke host het kwaadaardige bestand is gestart.", "Het is een werkplek aan de balie, niet de fileserver."],
          wrong: { "prak-fs02": "Daar greep het team juist wel in. De vraag is waar het níét gebeurde.", "ws-balie-01": "Op WS-BALIE-01 staan alleen gewone aan- en afmeldingen van a.yilmaz.", "mx-01": "De mailserver leverde de mail af, maar is zelf niet besmet." },
          why: "De plek waar de schade zichtbaar wordt, is zelden de plek waar de aanvaller binnenkwam. Een analyse die bij het zichtbare systeem stopt, mist de bron.",
          explain: "WS-BALIE-02: daar werd pakbon_88213.pdf.exe gestart en van daaruit is op de server ingelogd. Het team heeft alleen de server opgeruimd." },
        { q: "Ik kan de zes functies van NIST CSF 2.0 benoemen en de praktische incidentstappen op volgorde zetten.", noAnswer: true },
        { q: "Tijdlijn: hoeveel hele uren bleef de eerste EDR-alert liggen voordat een mens het probleem meldde?", answer: ["6", "6 uur"],
          hints: ["Zoek de eerste alert en de eerste melding van een persoon.", "De alert is van 01:16:20. Filter op Helpdesk voor de melding.", "Van 01:16 tot 07:40."],
          wrong: { "7": "Tot 07:40 is het zes uur en ruim twintig minuten. Gevraagd zijn hele uren.", "0": "De EDR sloeg wel alarm, maar er keek 's nachts niemand naar en er was geen automatische isolatie." },
          explain: "Ruim zes uur. Een alert waar niemand naar kijkt, is geen detectie. Verbeterpunt: automatische isolatie bij dit gedrag, of nachtelijke opvolging van alerts." },
        { q: "Tijdlijn: het herstel was om 11:45 klaar en om 12:26 was de server opnieuw versleuteld. Hoe heet het persistentiemechanisme dat bij de eradication is gemist?", boss: true,
          answer: ["DriverSyncCheck", "taak DriverSyncCheck", "geplande taak DriverSyncCheck", "driver sync check"],
          hints: ["Kijk wat er vlak vóór de tweede versleuteling gebeurde, en op welke host.", "Om 12:21:02 start er iets op WS-BALIE-02. Zoek terug wanneer datzelfde tijdstip binnen het uur eerder voorkomt.", "Op 2 november om 21:21:02 is er iets aangemaakt dat elk uur een programma start."],
          wrong: { "ds.exe": "Dat is het programma dat wordt gestart. Gevraagd is het mechanisme dat ervoor zorgt dat het steeds opnieuw start.", "s.visser": "Het account had ook geblokkeerd moeten worden, maar het is geen persistentiemechanisme: iets moet het kwaadaardige programma telkens starten.", "pakbon_88213.pdf.exe": "Dat is het bestand waarmee het begon. Het draaide één keer; iets anders zorgt voor de terugkeer.", "/molenlock/": "Dat is de extensie van de versleutelde bestanden, het gevolg en niet de oorzaak." },
          why: "Dit is het verschil tussen opruimen en eradication. Het team haalde de schade weg, maar niet de toegang. De evaluatie moet opleveren dat het playbook voortaan eist dat eerst de omvang is vastgesteld.",
          explain: "De geplande taak DriverSyncCheck op WS-BALIE-02, aangemaakt op 2 november om 21:21:02, start elk uur ds.exe. Het team isoleerde en herstelde alleen de server (containment en recovery), zonder de analyse af te maken en de bron op te ruimen (eradication). Om 12:21:02 startte de taak opnieuw en vijf minuten later was de server weer versleuteld." },
      ],
    },

    {
      title: "Taak 8: Hoe het in de praktijk echt gaat",
      kind: "verdieping", optional: true,
      content: `
        <p>De nette volgorde uit deze room is een model. In een echt incident lopen de stappen door elkaar, ontbreekt
        informatie en moet je kiezen tussen twee kwaden. Dit zijn de afwegingen waar ervaren teams op letten.</p>

        <h3>Containment is een keuze, geen reflex</h3>
        <p>Isoleren stopt de schade, maar vertelt de aanvaller ook dat hij is ontdekt. Bij ransomware die al versleutelt,
        is dat geen punt: isoleer direct. Bij een stille, gerichte inbraak ligt het anders. Haal je daar één systeem weg
        terwijl de aanvaller nog op vijf andere zit, dan verandert hij van werkwijze en raak je hem kwijt. Daar stel je
        eerst de omvang vast en perk je daarna alles in één keer in. NIST SP 800-61 Revisie 2 (2012) noemt deze afweging uitdrukkelijk:
        de strategie hangt af van het type incident, de mogelijke schade en de noodzaak om bewijs te bewaren.</p>

        <h3>Volgorde van vluchtigheid</h3>
        <p>Bewijs stel je veilig van vluchtig naar blijvend. RFC 3227 (2002) geeft de volgorde: eerst wat in het geheugen
        en in actieve tabellen staat (processen, netwerkverbindingen), dan tijdelijke bestanden, dan de schijf, en pas
        daarna logs op andere systemen en archieven. Wie eerst een schijfkopie maakt en daarna de machine herstart voor
        een geheugendump, is te laat.</p>

        <h3>Twee getallen voor herstel: RPO en RTO</h3>
        <ul>
          <li><strong>RPO</strong> (Recovery Point Objective): hoeveel data mag je hooguit kwijtraken? Dat bepaalt hoe
          vaak je een back-up maakt.</li>
          <li><strong>RTO</strong> (Recovery Time Objective): hoe lang mag het herstel hooguit duren? Dat bepaalt hoe je
          herstelt.</li>
        </ul>
        <p>Een back-up die nooit is teruggezet, is een aanname. Veel organisaties ontdekken pas tijdens een incident dat
        terugzetten dagen duurt, of dat de back-up aan hetzelfde netwerk hing en ook is versleuteld.</p>

        <h3>Meldplichten: de kleine lettertjes</h3>
        <ul>
          <li><strong>AVG, artikel 33:</strong> melden bij de toezichthouder binnen 72 uur na ontdekking, tenzij een risico
          voor betrokkenen onwaarschijnlijk is. Ook datalekken die je niet meldt, leg je vast in een eigen register.</li>
          <li><strong>AVG, artikel 34:</strong> bij een waarschijnlijk hoog risico informeer je ook de betrokkenen zelf.</li>
          <li><strong>NIS2, artikel 23:</strong> drie stappen bij een significant incident. Een vroege waarschuwing binnen
          24 uur, een incidentmelding binnen 72 uur, en een eindverslag uiterlijk een maand na de incidentmelding.</li>
          <li>Verlies van <em>beschikbaarheid</em> van persoonsgegevens, zoals bij versleuteling zonder bruikbare back-up,
          telt ook als inbreuk. "Er is niets gestolen" is dus niet automatisch "geen datalek".</li>
        </ul>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Herstellen voordat duidelijk is hoe de aanvaller binnenkwam (zie de tijdlijn in taak 7).</li>
          <li>Communiceren via kanalen die de aanvaller kan meelezen, zoals de eigen mail of chat.</li>
          <li>Geen logboek bijhouden van beslissingen. Achteraf weet niemand meer wie wat wanneer besloot.</li>
          <li>Een evaluatie zonder acties met een eigenaar en een datum.</li>
        </ul>
      `,
      questions: [
        { q: "Een bedrijf maakt elke nacht om 01:00 een back-up. Op een donderdag valt de server om 16:00 uit en moet de back-up terug. Hoeveel uur aan werk is verloren?", answer: ["15", "15 uur"],
          hints: ["Alles na de laatste back-up ontbreekt.", "Reken van 01:00 tot 16:00 op dezelfde dag.", "16 min 1."],
          wrong: { "16": "De back-up is van 01:00, niet van middernacht.", "24": "Een etmaal is het maximum dat verloren kan gaan bij een nachtelijke back-up, niet wat hier verloren is." },
          explain: "Vijftien uur. Is het afgesproken RPO vier uur, dan is één back-up per nacht te weinig." },
        { q: "Je komt bij een draaiende, besmette server. Wat stel je als eerste veilig: A de schijfkopie, B het werkgeheugen, of C de logs op de centrale logserver? (letter)", answer: ["B"],
          hints: ["Denk aan de volgorde van vluchtigheid.", "Wat verdwijnt als de server uitvalt of herstart?", "De schijf en de centrale logs zijn er over een uur nog."],
          wrong: { "a": "De schijf blijft bestaan als de stroom uitvalt. Het geheugen niet.", "c": "Logs op een ander systeem zijn het minst vluchtig van de drie." },
          explain: "B, het werkgeheugen. Daarna de schijf, daarna de logs elders." },
        { q: "Een drinkwaterbedrijf (essentiële entiteit onder NIS2) stelt op maandag om 10:00 een significant incident vast. Welke reeks klopt volgens artikel 23 van NIS2?", options: ["Eén melding binnen 72 uur is voldoende", "Vroege waarschuwing binnen 24 uur, incidentmelding binnen 72 uur, eindverslag uiterlijk een maand na de incidentmelding", "Vroege waarschuwing binnen 72 uur, eindverslag binnen een jaar", "Alleen een eindverslag zodra het incident is afgesloten"], answer: 1,
          wrong: { 0: "Dat is het patroon van de AVG. NIS2 kent drie stappen.", 2: "De vroege waarschuwing is binnen 24 uur, en het eindverslag komt al na een maand.", 3: "NIS2 vraagt juist om een vroege melding, ook als nog niet alles bekend is." },
          explain: "Drie stappen: 24 uur, 72 uur, een maand. De vroege waarschuwing mag kort zijn; het gaat erom dat de autoriteiten snel weten dat er iets speelt." },
      ],
    },

    {
      title: "Taak 9: Zo komt dit voor op een examen",
      kind: "examen", optional: true,
      content: `
        <p>Examenvragen over incident response beschrijven een situatie en vragen naar de <em>beste eerste</em> of de
        <em>beste volgende</em> stap. Vaak zijn meerdere opties nuttig; het gaat om de volgorde. Let op woorden als
        "eerst", "het meest" en "direct".</p>
      `,
      questions: [
        { q: "Een analist bevestigt dat een werkstation elke minuut verbinding maakt met een bekend C2-adres. Er zijn aanwijzingen dat dezelfde aanvaller ook op andere systemen actief is. De gebruiker wil zo snel mogelijk weer aan het werk. Wat is de beste eerste stap?",
          options: ["Het werkstation direct opnieuw installeren vanaf een schone image", "Het werkstation van het netwerk isoleren, het geheugen veiligstellen en ondertussen nagaan welke andere systemen met hetzelfde adres praten", "De stekker uit het werkstation trekken", "Het wachtwoord van de gebruiker resetten en het ticket sluiten"], answer: 1,
          wrong: { 0: "Dat is herstel vóór containment en analyse. Je vernietigt bewijs en weet nog niet hoe ver de aanvaller is gekomen.", 2: "Dat stopt de verbinding, maar wist het geheugen en zegt niets over de andere systemen.", 3: "Een nieuw wachtwoord verwijdert de malware niet, en de aanvaller zit mogelijk ook elders." },
          explain: "Eerst inperken en bewijs bewaren, en tegelijk de omvang vaststellen. Herstellen komt daarna." },
        { q: "Een forensisch onderzoeker arriveert bij een server die nog aan staat. Er is weinig tijd. Welke gegevens stelt hij als eerste veilig?",
          options: ["Een volledige kopie van de harde schijf", "De inhoud van het werkgeheugen en de actieve netwerkverbindingen", "De back-uptapes van de afgelopen maand", "De firewall-logs op de centrale logserver"], answer: 1,
          wrong: { 0: "De schijf is belangrijk maar niet vluchtig: hij is er na een uur nog.", 2: "Archieven veranderen niet en kunnen wachten.", 3: "Die staan op een ander systeem en verdwijnen niet als deze server uitvalt." },
          explain: "De volgorde van vluchtigheid: eerst wat verdwijnt bij uitval of herstart, dus geheugen en actieve verbindingen." },
        { q: "Een ziekenhuis, essentiële entiteit onder NIS2, stelt op maandag om 09:00 vast dat ransomware actief is. Er zijn aanwijzingen dat patiëntgegevens zijn weggesluisd. Welke uitspraak over de meldtermijnen klopt?",
          options: ["Een vroege waarschuwing onder NIS2 binnen 24 uur, en een melding van het datalek bij de AP binnen 72 uur", "Alleen een melding bij de AP binnen 72 uur; die vervangt de NIS2-melding", "Beide meldingen binnen 72 uur", "Geen melding zolang niet vaststaat dat er gegevens zijn gestolen"], answer: 0,
          wrong: { 1: "De twee meldplichten staan los van elkaar en gaan naar verschillende instanties.", 2: "De AVG geeft 72 uur, maar de vroege waarschuwing onder NIS2 moet al binnen 24 uur.", 3: "Beide termijnen lopen vanaf het moment van vaststellen. Zekerheid over diefstal is geen voorwaarde; je meldt met wat je weet." },
          explain: "Twee sporen, twee klokken: 24 uur voor de vroege waarschuwing onder NIS2 (in Nederland: de Cyberbeveiligingswet), 72 uur voor het datalek onder de AVG." },
        { q: "Na een afgehandeld phishingincident houdt het team een evaluatie. Welke uitkomst is de beste \"lesson learned\"?",
          options: ["De medewerker die klikte krijgt een officiële waarschuwing", "Het team spreekt af voortaan beter op te letten", "Beheer blokkeert vóór 1 december uitvoerbare bijlagen in het mailfilter, en de incident lead vult het playbook aan met een controle op achtergebleven geplande taken", "Het incidentrapport wordt gearchiveerd"], answer: 2,
          wrong: { 0: "Een schuldige aanwijzen zorgt dat mensen de volgende keer niets meer melden. De evaluatie gaat over het proces.", 1: "Een voornemen zonder eigenaar, maatregel en datum verandert niets.", 3: "Archiveren is nodig, maar het is geen verbetering." },
          explain: "Een goede lesson learned is een concrete maatregel met een eigenaar en een datum, en werkt door in het playbook." },
      ],
    },
  ],
  terms: [
    { term: "Security-incident", def: "Gebeurtenis die de vertrouwelijkheid, integriteit of beschikbaarheid van informatie echt schaadt of bedreigt." },
    { term: "Incident response", def: "De gestructureerde aanpak om een cyberincident te detecteren, in te perken, op te lossen en ervan te leren." },
    { term: "NIST CSF 2.0", def: "Cybersecurity Framework van NIST met zes functies: Govern, Identify, Protect, Detect, Respond en Recover." },
    { term: "Govern", def: "CSF-functie 'besturen': strategie, rollen, beleid en risicomanagement; nieuw en overkoepelend in versie 2.0." },
    { term: "Containment", def: "Inperking: de verspreiding van een aanval stoppen, bijvoorbeeld door een systeem te isoleren." },
    { term: "Eradication", def: "Uitroeiing: de oorzaak weghalen, zoals malware verwijderen en de misbruikte kwetsbaarheid dichten." },
    { term: "Recovery", def: "Herstel: systemen en data veilig terugbrengen naar normaal, bij voorkeur vanaf een schone back-up." },
    { term: "Lessons learned", def: "Geleerde lessen: evaluatie na een incident om het proces te verbeteren en herhaling te voorkomen." },
    { term: "EDR", def: "Endpoint Detection and Response: software op werkplekken/servers die processen en bestandsacties bewaakt en kan ingrijpen." },
    { term: "Ransomware", def: "Gijzelsoftware die bestanden versleutelt en losgeld eist; wist vaak eerst back-ups en schaduwkopieën." },
    { term: "Datalek", def: "Inbreuk waarbij persoonsgegevens worden gelekt, vernietigd of ingezien; onder de AVG vaak binnen 72 uur te melden bij de AP." },
    { term: "NIS2 / Cyberbeveiligingswet", def: "EU-richtlijn en de Nederlandse wet met zorg- en meldplicht voor essentiële en belangrijke organisaties." },
    { term: "Chain of custody", def: "Bewijsketen: het nauwkeurig vastleggen wie wanneer welk bewijs behandelde, zodat het bruikbaar blijft." },
    { term: "Playbook", def: "Kant-en-klaar stappenplan (runbook) voor een specifiek type incident, zoals ransomware of een gephishte gebruiker." },
  ],
  resources: [
    { title: "NIST — Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
    { title: "NIST CSRC — SP 800-61 (Computer Security Incident Handling)", url: "https://csrc.nist.gov/" },
    { title: "NCSC — hulp en informatie bij incidenten", url: "https://www.ncsc.nl/" },
    { title: "Autoriteit Persoonsgegevens — datalek melden", url: "https://www.autoriteitpersoonsgegevens.nl/" },
  ],
});
