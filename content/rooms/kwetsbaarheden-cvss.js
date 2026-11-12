/* Room: Kwetsbaarheden & CVSS — van CVE tot patch */

// Bestandssysteem voor het praktijklab in taak 7: de fictieve webserver web01 van Brandpunt Koffie B.V.
// met KoffieCMS 4.2.1, een map met beveiligingsadviezen en een configuratiebestand.
// Vlaggen: NM{advies_gelezen_versie_kwetsbaar} (advies) en NM{workaround_eerst_dan_patchen} (configuratie).
const KWETS_FS = {
  '/home/student/LEESMIJ.txt': `OPDRACHT — web01 (Brandpunt Koffie B.V., fictief)
=================================================
Je bent de dienstdoende beheerder. Vanochtend kwam er een nieuw beveiligingsadvies binnen.
1. Zoek uit welke versie van KoffieCMS op deze server draait (/opt/koffiecms/VERSION).
2. Zoek in /home/student/advies het advies dat over KoffieCMS gaat en lees het.
3. Bepaal of deze server kwetsbaar is en wat de tijdelijke maatregel (workaround) is.
4. Controleer in /etc/koffiecms/koffiecms.conf de instelling die het advies noemt.
Tip: grep -r KoffieCMS advies
`,
  '/home/student/inventaris.txt': `ASSET-INVENTARIS (uittreksel)
host     | rol                    | software            | eigenaar   | kroonjuweel
---------+------------------------+---------------------+------------+------------
web01    | webshop + klantportaal | KoffieCMS (zie VERSION) | e-commerce | JA
mail01   | e-mail                 | BrouwMail 7.0.4     | IT         | nee
kassa02  | kassasysteem winkel    | BonenKassa 2.3      | retail     | JA
test03   | testomgeving           | KoffieCMS 4.3.0     | IT         | nee
Onderhoudsvenster web01: dinsdag 22:00-23:00
`,
  '/home/student/advies/NM-SA-2026-009.txt': `NineMinds Security Advisory NM-SA-2026-009 (FICTIEF)
Product   : BrouwMail
Getroffen : 6.0.0 t/m 6.9.9
Opgelost  : 7.0.0
Ernst     : Medium (CVSS 3.1: 6.1, AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N)
Soort fout: CWE-79 (cross-site scripting) in de webmailinterface
Misbruik  : niet waargenomen
Advies    : upgrade naar 7.0.0 of hoger.
`,
  '/home/student/advies/NM-SA-2026-014.txt': `NineMinds Security Advisory NM-SA-2026-014 (FICTIEF)
=================================================
Product    : KoffieCMS
Getroffen  : 4.2.0 t/m 4.2.2
Opgelost in: 4.2.3
CVE-ID     : CVE-2026-XXXXX (fictief voorbeeld)
Soort fout : CWE-89 (SQL-injectie) in het endpoint /api/import
CVSS 3.1   : 9.8 Critical  CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
Misbruik   : JA — actief misbruik waargenomen sinds 2026-09-28

Beschrijving
Een aanvaller zonder account kan via het import-endpoint SQL-opdrachten
uitvoeren op de database en zo klantgegevens lezen en wijzigen.

Oplossing
Upgrade zo snel mogelijk naar KoffieCMS 4.2.3.

Workaround (als je niet direct kunt patchen)
Zet in /etc/koffiecms/koffiecms.conf de optie import_api op uit
en blokkeer /api/import in je webapplicatiefirewall (WAF).
Let op: dit is een tijdelijke maatregel, geen vervanging van de patch.

Controlecode voor wie dit advies volledig gelezen heeft: NM{advies_gelezen_versie_kwetsbaar}
`,
  '/opt/koffiecms/VERSION': 'KoffieCMS 4.2.1\n',
  '/opt/koffiecms/CHANGELOG.txt': `4.2.1 - bugfix: bestelbevestiging toonde verkeerde datum
4.2.0 - nieuw: import-API voor productcatalogus (/api/import)
4.1.9 - beveiligingsupdate sessiebeheer
`,
  '/etc/koffiecms/koffiecms.conf': `# KoffieCMS configuratie — web01
site_naam = Brandpunt Koffie
database = mysql://koffiecms@localhost/koffie
debug = uit
import_api = aan
# import_api: zet op uit als noodmaatregel (zie NM-SA-2026-014). Controlecode: NM{workaround_eerst_dan_patchen}
max_upload_mb = 20
`,
  '/var/log/koffiecms/': null,
};

CS.registerRoom({
  id: 'kwetsbaarheden-cvss',
  path: 'security-kern',
  order: 4,
  title: 'Kwetsbaarheden & CVSS: van CVE tot patch',
  icon: '🩹',
  difficulty: 'Gemiddeld',
  minutes: 60,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Van kwetsbaarheid tot patch: leer CVE, CWE en het EUVD lezen, scoor zelf kwetsbaarheden met CVSS, combineer ernst met EPSS en de KEV-catalogus en prioriteer patches als een echte beheerder.',
  objectives: [
    'Uitleggen wat een kwetsbaarheid, een exploit en een zero-day zijn',
    'Een CVE-ID lezen en het verschil benoemen tussen CVE, CWE, de NVD en het EUVD van ENISA',
    'De acht basismetrieken van CVSS v3.1 uitleggen en zelf een basisscore en ernstklasse bepalen',
    'Benoemen wat er in CVSS v4.0 verandert en waarom EPSS en de CISA KEV-catalogus naast CVSS nodig zijn',
    'Patches prioriteren met een asset-inventaris en mitigaties kiezen als patchen (nog) niet kan',
    'Uitleggen hoe coordinated vulnerability disclosure in Nederland werkt (NCSC, security.txt, bug bounty)',
  ],
  tasks: [
    {
      title: 'Taak 1 — Kwetsbaarheid, exploit en zero-day',
      tryFirst: true,
      intro: '<p>In het lab staat de levensloop van één lek in het fictieve planpakket PlanBord, van de dag dat de fout in de software kwam tot de dag dat een klant de patch installeerde. Zoek uit hoe lang aanvallers het lek konden misbruiken terwijl er nog geen patch bestond, en hoe lang de klant daarna nog kwetsbaar bleef.</p>',
      content: `
        <p>Stel je een kantoorpand voor met honderd ramen. Eén raam op de begane grond sluit niet goed: als je er
        hard genoeg tegen duwt, schuift het open. Dat slecht sluitende raam is een <strong>kwetsbaarheid</strong>
        (<em>vulnerability</em>): een zwakke plek waardoor iemand iets kan doen wat niet de bedoeling is. Iemand
        die precies weet hoe hard en waar je moet duwen, heeft een <strong>exploit</strong>: een concrete methode
        (vaak een stukje code) om die zwakke plek echt te misbruiken. En de reparatie door de glazenmaker is de
        <strong>patch</strong>.</p>

        <h3>De begrippen op een rij</h3>
        <ul>
          <li><strong>Kwetsbaarheid:</strong> een fout in software, hardware of configuratie die de
          vertrouwelijkheid, integriteit of beschikbaarheid (de CIA-triade) in gevaar kan brengen. Bijvoorbeeld een
          invoerveld dat SQL-opdrachten doorlaat, of een server die meer geheugen terugstuurt dan zou moeten.</li>
          <li><strong>Exploit:</strong> code of een stappenplan dat de kwetsbaarheid daadwerkelijk misbruikt. Een
          kwetsbaarheid zonder bekende exploit is nog steeds een risico, maar wel een kleiner risico op korte termijn.</li>
          <li><strong>Proof of concept (PoC):</strong> een "bewijs dat het kan" — een minimale exploit die laat zien
          dát de fout misbruikt kan worden, vaak zonder schadelijke lading.</li>
          <li><strong>Patch:</strong> een update van de leverancier die de fout oplost.</li>
          <li><strong>Zero-day:</strong> een kwetsbaarheid die al misbruikt wordt (of bekend is bij aanvallers)
          terwijl de leverancier er nog <em>nul dagen</em> de tijd voor heeft gehad: er is nog geen patch. Een
          <em>zero-day-exploit</em> is de bijbehorende aanvalscode.</li>
        </ul>

        <h3>Twee bekende voorbeelden uit de echte wereld</h3>
        <p><strong>Heartbleed</strong> (CVE-2014-0160, 2014) was een fout in de populaire cryptobibliotheek
        OpenSSL. Een aanvaller kon een server vragen om stukjes van zijn werkgeheugen terug te sturen. In dat
        geheugen konden wachtwoorden, sessiecookies en zelfs privésleutels van certificaten staan. Omdat OpenSSL op
        enorm veel webservers draaide, moesten wereldwijd beheerders tegelijk patchen én hun certificaten vervangen.</p>
        <p><strong>Log4Shell</strong> (CVE-2021-44228, december 2021) zat in Log4j 2, een veelgebruikte
        Java-bibliotheek om logregels weg te schrijven. Door een speciaal opgebouwde tekst te laten loggen
        (bijvoorbeeld in een gebruikersnaam of een HTTP-header) kon een aanvaller op afstand code laten uitvoeren op
        de server. Het lek kreeg de maximale CVSS-score van <strong>10.0</strong>. Het lastige: veel organisaties
        wisten niet eens dat Log4j ergens diep in hun software zat. Het NCSC hield destijds een openbare lijst bij
        van software waarin Log4j zat en wat de status was.</p>

        <div class="callout info">
          <strong>Kwetsbaarheid is niet hetzelfde als risico.</strong> Een kwetsbaarheid in software die je niet
          gebruikt, of die volledig afgeschermd staat, is voor jou een klein risico. Dezelfde kwetsbaarheid in je
          webshop die open op internet staat, is een groot risico. Risico hangt af van de kwetsbaarheid, de kans op
          misbruik én wat er voor jou op het spel staat. Daar komen we in taak 5 en 6 op terug.
        </div>

        <div class="callout warn">
          <strong>Ethiek:</strong> in deze room leer je kwetsbaarheden begrijpen, scoren en verhelpen. Je zoekt of
          test alleen op systemen waarvoor je schriftelijke toestemming hebt of in het lab van dit portaal.
          Zonder toestemming binnendringen in een systeem is in Nederland strafbaar (computervredebreuk, art. 138ab Sr).
        </div>
      `,
      lab: {
        type: 'logs',
        title: 'levensloop-planbord-lek.log',
        lines: `2026-03-02 leverancier  PlanBord 3.4.0 uitgebracht met een nieuwe exportfunctie (hier zit de fout in)
2026-03-30 klant        Veenstra Logistiek (fictief) installeert PlanBord 3.4.0
2026-04-19 aanvaller    eerste misbruik van de exportfunctie bij een klant (achteraf vastgesteld uit logs)
2026-04-24 aanvaller    misbruik bij Veenstra Logistiek: klantenbestand gedownload
2026-04-27 onderzoeker  meldt het lek vertrouwelijk bij de leverancier
2026-04-28 leverancier  bevestigt de melding en reserveert een CVE-ID
2026-05-06 leverancier  PlanBord 3.4.2 uitgebracht: lek gedicht, beveiligingsadvies gepubliceerd
2026-05-08 onderzoeker  publiceert een proof of concept
2026-05-11 aanvaller    geautomatiseerd scannen naar kwetsbare PlanBord-servers begint
2026-05-18 klant        Veenstra Logistiek installeert PlanBord 3.4.2`,
      },
      questions: [
        { q: 'Hoeveel dagen was dit lek een zero-day: van het eerste misbruik tot de dag dat de patch uitkwam?', answer: ['17', '17 dagen'],
          hints: ['Zoek in het log de regel met het eerste misbruik en de regel waarin het lek wordt gedicht.', 'Het loopt van 19 april tot 6 mei. April heeft 30 dagen.', '11 dagen in april plus 6 in mei.'],
          wrong: { '9': 'Je rekent vanaf de melding door de onderzoeker. Het lek werd toen al acht dagen misbruikt.', '65': 'Je rekent vanaf de dag dat de fout in de software kwam. Een zero-day begint pas te tellen als aanvallers het lek kennen of misbruiken.' },
          why: 'In die periode kan geen enkele klant patchen. Alleen mitigaties en detectie helpen dan. Daarom gaat taak 6 ook over wat je doet als patchen nog niet kan.',
          explain: 'Van 19 april tot 6 mei is 17 dagen. Zolang was er misbruik zonder dat er een patch bestond.' },
        { q: 'Wat is een zero-day?', options: ['Een kwetsbaarheid die al bekend is bij aanvallers of misbruikt wordt terwijl er nog geen patch is', 'Een kwetsbaarheid die op dag nul na de release wordt gepatcht', 'Een kwetsbaarheid met een CVSS-score van 0.0'], answer: 0,
          wrong: { 1: 'De "nul dagen" slaan op de tijd die de leverancier heeft gehad om het lek te dichten, niet op het moment van patchen.', 2: 'De naam zegt niets over de ernst. Zero-days scoren vaak juist hoog.' },
          explain: 'De leverancier heeft "nul dagen" gehad om het op te lossen: er is nog geen patch beschikbaar.' },
        { q: 'Welke CVSS-score kreeg Log4Shell (CVE-2021-44228)?', answer: ['10.0', '10', '10,0'],
          hints: ['Het staat bij de twee voorbeelden uit de echte wereld.', 'Het lek was op afstand te misbruiken, zonder account en zonder hulp van een gebruiker.', 'De hoogst mogelijke score.'],
          explain: 'Log4Shell kreeg 10.0: op afstand, zonder account en zonder hulp van een gebruiker code uitvoeren, met impact buiten de bibliotheek zelf.' },
        { q: 'Hoeveel dagen na het uitkomen van de patch bleef Veenstra Logistiek nog kwetsbaar?', answer: ['12', '12 dagen'],
          hints: ['Zoek wanneer de patch uitkwam en wanneer deze klant hem installeerde.', 'Van 6 mei tot 18 mei.', '18 min 6.'],
          wrong: { '10': 'Je rekent vanaf de publicatie van de proof of concept. De patch was er al twee dagen eerder.', '7': 'Je rekent vanaf het begin van het scannen. Gevraagd is de tijd sinds de patch.' },
          explain: 'Twaalf dagen. In die periode verscheen een proof of concept en begon het geautomatiseerd scannen. Een lek is na de patch vaak gevaarlijker dan ervoor, omdat iedereen nu weet waar het zit.' },
      ],
    },

    {
      title: 'Taak 2 — CVE, CWE, NVD en het EUVD',
      tryFirst: true,
      intro: '<p>Een collega heeft tien regels uit beveiligingsadviezen overgetikt. Niet elk nummer is een geldig CVE-ID. Schrijf in het lab één patroon dat alleen de geldige CVE-ID\'s raakt, en tel daarna hoe vaak hetzelfde soort fout terugkomt.</p>',
      content: `
        <p>Als duizenden organisaties over hetzelfde lek praten, heb je een gemeenschappelijke naam nodig. Anders
        noemt de ene leverancier het "het Log4j-probleem", de ander "LOG-2021-17" en de derde "dat Java-lek". Daarvoor
        bestaat <strong>CVE</strong>: <em>Common Vulnerabilities and Exposures</em>. Je kunt een CVE-ID vergelijken
        met een kenteken: één uniek nummer per kwetsbaarheid, zodat iedereen weet over welke het gaat.</p>

        <h3>De opbouw van een CVE-ID</h3>
        <pre><code>CVE-2021-44228
 │    │     └── volgnummer (minstens 4 cijfers, mag langer)
 │    └──────── jaar waarin het ID is toegekend of gereserveerd
 └───────────── voorvoegsel</code></pre>
        <p>Let op: het jaartal is het jaar van <em>toekenning</em>, niet per se het jaar waarin de fout ontstond of
        openbaar werd. En het volgnummer zegt niets over de ernst: CVE-2021-44228 is niet "erger" dan CVE-2021-1000.</p>

        <h3>Wie doet wat?</h3>
        <ul>
          <li><strong>MITRE</strong> beheert het CVE-programma (met financiering van de Amerikaanse overheid,
          CISA) en houdt de lijst met CVE-ID's bij.</li>
          <li><strong>CNA's</strong> (<em>CVE Numbering Authorities</em>) zijn organisaties die zelf CVE-ID's mogen
          uitdelen voor hun eigen producten of hun eigen terrein. Grote softwareleveranciers zijn vaak CNA, maar ook
          sommige CERT's en onderzoeksorganisaties. Zo hoeft niet alles via één loket.</li>
          <li><strong>NVD</strong> (<em>National Vulnerability Database</em>) van het Amerikaanse NIST verrijkt
          CVE's met extra informatie: een CVSS-score, het type fout (CWE) en welke productversies getroffen zijn.</li>
        </ul>

        <h3>CWE: het <em>soort</em> fout</h3>
        <p>Waar een CVE één specifieke kwetsbaarheid in één product aanduidt, beschrijft <strong>CWE</strong>
        (<em>Common Weakness Enumeration</em>) het <em>type</em> fout. Vergelijk het met een ziekte (CWE) en een
        individuele patiënt (CVE). Duizenden CVE's kunnen dezelfde CWE hebben. Bekende voorbeelden:</p>
        <table>
          <thead><tr><th>CWE</th><th>Soort fout</th></tr></thead>
          <tbody>
            <tr><td>CWE-79</td><td>Cross-site scripting (XSS): invoer komt ongefilterd als script in een webpagina</td></tr>
            <tr><td>CWE-89</td><td>SQL-injectie: invoer wordt onderdeel van een databasequery</td></tr>
            <tr><td>CWE-787</td><td>Out-of-bounds write: schrijven buiten het gereserveerde geheugen</td></tr>
            <tr><td>CWE-22</td><td>Path traversal: met <code>../</code> buiten de bedoelde map komen</td></tr>
          </tbody>
        </table>
        <p>CWE is vooral handig voor ontwikkelaars: zie je dat veel van je lekken CWE-89 zijn, dan weet je dat je team
        structureel prepared statements moet gaan gebruiken.</p>

        <h3>Europa: het EUVD van ENISA</h3>
        <p>Sinds 2025 heeft Europa een eigen databank: de <strong>European Vulnerability Database (EUVD)</strong>,
        beheerd door <strong>ENISA</strong>, het Europese agentschap voor cyberbeveiliging. De EUVD komt voort uit de
        NIS2-richtlijn (in Nederland uitgewerkt in de Cyberbeveiligingswet) en verzamelt informatie over
        kwetsbaarheden, inclusief verwijzingen naar CVE's, adviezen van Europese CSIRT's en of een lek actief
        misbruikt wordt. Zo is Europa minder afhankelijk van alleen Amerikaanse bronnen.</p>

        <div class="callout tip">
          <strong>Ezelsbruggetje:</strong> CVE = <em>welk</em> lek (het kenteken), CWE = <em>wat voor soort</em> fout
          (het merk auto), NVD en EUVD = de databanken waar je alles over dat kenteken opzoekt.
        </div>
      `,
      questions: [
        { q: 'Wat betekent "2021" in CVE-2021-44228?', options: ['Het jaar waarin het CVE-ID is toegekend of gereserveerd', 'Het aantal getroffen systemen', 'De ernst van de kwetsbaarheid'], answer: 0, explain: 'Het jaartal is het jaar van toekenning; het volgnummer zegt niets over de ernst.' },
        { q: 'Schrijf in het lab een patroon dat alleen geldige CVE-ID\'s raakt. Hoeveel treffers krijg je?', answer: ['5'],
          hints: ['Een geldig ID heeft het voorvoegsel CVE, een jaartal van vier cijfers en een volgnummer.', 'Het volgnummer heeft minstens vier cijfers en mag langer zijn. In een regex schrijf je "vier of meer" als {4,}.', 'Probeer CVE-\\d{4}-\\d{4,}'],
          wrong: { '7': 'Je patroon laat ook een jaartal van twee cijfers of een volgnummer van drie cijfers door. Leg het aantal cijfers vast.', '4': 'Het volgnummer mag langer zijn dan vier cijfers. Het ID met zeven cijfers is ook geldig.', '10': 'Je telt alle regels. Vijf ervan hebben een fout in het voorvoegsel, het jaartal, het volgnummer of de streepjes.' },
          why: 'Scanners, ticketsystemen en dreigingsfeeds koppelen alles aan het CVE-ID. Een ID dat niet precies klopt, wordt door geen enkel systeem teruggevonden.',
          explain: 'Vijf regels hebben een geldig ID. De andere vijf vallen af op een te kort volgnummer, een jaartal van twee cijfers, het voorvoegsel CWE, een ontbrekend streepje of liggende streepjes.' },
        { q: 'Hoe heten organisaties die zelf CVE-ID\'s mogen uitdelen?', answer: ['CNA', "CNA's", 'cnas', 'cve numbering authority', 'cve numbering authorities'],
          hints: ['Het staat onder "Wie doet wat?".', 'Grote softwareleveranciers zijn het vaak zelf.', 'CVE Numbering ...'],
          explain: 'CVE Numbering Authorities (CNA\'s) kennen ID\'s toe voor hun eigen producten of terrein.' },
        { q: 'Kijk alleen naar de regels met een geldig CVE-ID. Hoeveel daarvan zijn SQL-injectie?', answer: ['3'],
          hints: ['Zoek in de tabel van de uitleg welk CWE-nummer bij SQL-injectie hoort.', 'Tel CWE-89 alleen op regels waar je patroon een treffer geeft.', 'KoffieCMS, VoorraadPlus en LoonPortaal.'],
          wrong: { '5': 'Je telt CWE-89 op alle tien de regels. Twee daarvan hebben geen geldig CVE-ID.', '4': 'Eén van de regels met CWE-89 heeft een volgnummer van drie cijfers en telt dus niet mee.' },
          explain: 'Drie van de vijf geldige CVE\'s hebben CWE-89. Zie je dat in je eigen software, dan is dat een signaal om structureel prepared statements te gaan gebruiken.' },
      ],
      lab: {
        type: 'regex',
        pattern: 'CVE-',
        flags: 'g',
        text: 'CVE-2099-0417     KoffieCMS      CWE-89\nCVE-2099-12345    BrouwMail      CWE-79\nCVE-2099-123      PlanBord       CWE-89\nCVE-99-10444      BonenKassa     CWE-22\nCWE-2099-0417     RoosterApp     CWE-89\nCVE-2099-1000001  VoorraadPlus   CWE-89\nCVE2099-0555      KassaLink      CWE-787\nCVE-2099-0907     LoonPortaal    CWE-89\nCVE-2099-4410     AgendaWeb      CWE-22\nCVE_2099_7781     TicketDesk     CWE-79',
      },
    },

    {
      title: 'Taak 3 — CVSS v3.1: de acht basismetrieken',
      tryFirst: true,
      intro: '<p>In de calculator staat de vector van Heartbleed (7.5). Verander steeds één metriek en kijk wat er met de score gebeurt. Zo ontdek je welke knoppen zwaar wegen. De vragen vertellen welke wijzigingen je moet proberen.</p>',
      lab: { type: 'cvss', vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N' },
      content: `
        <p>Een CVE-ID zegt <em>welk</em> lek het is, maar niet hoe erg. Daarvoor is er <strong>CVSS</strong>, het
        <em>Common Vulnerability Scoring System</em>, beheerd door FIRST. CVSS geeft een kwetsbaarheid een score van
        <strong>0.0 tot 10.0</strong>. Je kunt het zien als de schaal van Richter voor kwetsbaarheden: één getal dat
        de technische ernst samenvat. We behandelen eerst versie 3.1, omdat die nog steeds het meest gebruikt wordt.</p>

        <p>De <strong>basisscore</strong> wordt berekend uit acht metrieken. De eerste vier beschrijven hoe makkelijk
        het lek te misbruiken is (<em>exploitability</em>), de laatste vier wat de gevolgen zijn (<em>impact</em>).</p>

        <h3>Hoe makkelijk is het?</h3>
        <ul>
          <li><strong>AV — Attack Vector</strong> (vanaf waar?): <code>N</code> Network (via internet),
          <code>A</code> Adjacent (vanaf hetzelfde lokale netwerk, bijv. dezelfde wifi), <code>L</code> Local (je
          moet al op het systeem zitten, bijv. met een account), <code>P</code> Physical (je moet het apparaat
          aanraken, bijv. via USB).</li>
          <li><strong>AC — Attack Complexity</strong>: <code>L</code> Low (werkt elke keer) of <code>H</code> High
          (de aanvaller moet omstandigheden afwachten of eerst informatie verzamelen, bijv. een race condition winnen).</li>
          <li><strong>PR — Privileges Required</strong>: welk account heeft de aanvaller vooraf nodig?
          <code>N</code> None, <code>L</code> Low (gewone gebruiker), <code>H</code> High (beheerder).</li>
          <li><strong>UI — User Interaction</strong>: moet een slachtoffer iets doen, zoals op een link klikken?
          <code>N</code> None of <code>R</code> Required.</li>
        </ul>

        <h3>Wat kan er gebeuren?</h3>
        <ul>
          <li><strong>S — Scope</strong>: blijft de schade binnen het kwetsbare onderdeel (<code>U</code> Unchanged),
          of raakt het ook andere onderdelen (<code>C</code> Changed)? Voorbeeld van Changed: een XSS-lek in een
          website waarmee je code draait in de <em>browser</em> van de bezoeker, of een lek waarmee je uit een
          virtuele machine breekt naar de host.</li>
          <li><strong>C — Confidentiality</strong>: kan de aanvaller gegevens lezen?</li>
          <li><strong>I — Integrity</strong>: kan de aanvaller gegevens wijzigen?</li>
          <li><strong>A — Availability</strong>: kan de aanvaller het systeem platleggen?</li>
        </ul>
        <p>C, I en A hebben elk de waarden <code>N</code> None, <code>L</code> Low (beperkt) of <code>H</code> High
        (volledig of zeer ernstig).</p>

        <h3>De vectorstring</h3>
        <p>Alle keuzes samen schrijf je als een <strong>vectorstring</strong>. Die van Log4Shell is:</p>
        <pre><code>CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H   →  10.0</code></pre>
        <p>Lees je die hardop, dan staat er: via het netwerk, eenvoudig, zonder account, zonder hulp van een
        gebruiker, met gevolgen buiten het kwetsbare onderdeel, en volledige impact op lezen, wijzigen en
        beschikbaarheid. Heartbleed had <code>AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N</code> = 7.5: makkelijk op afstand,
        maar "alleen" gegevens lezen.</p>

        <h3>Ernstklassen</h3>
        <table>
          <thead><tr><th>Score</th><th>Ernst</th></tr></thead>
          <tbody>
            <tr><td>0.0</td><td>None</td></tr>
            <tr><td>0.1 – 3.9</td><td>Low</td></tr>
            <tr><td>4.0 – 6.9</td><td>Medium</td></tr>
            <tr><td>7.0 – 8.9</td><td>High</td></tr>
            <tr><td>9.0 – 10.0</td><td>Critical</td></tr>
          </tbody>
        </table>

        <div class="callout info">
          <strong>Basisscore is generiek.</strong> De basisscore gaat over de kwetsbaarheid zelf, overal ter wereld
          hetzelfde. CVSS kent ook <em>temporal</em>-metrieken (is er een exploit, is er een patch?) en
          <em>environmental</em>-metrieken (hoe belangrijk is het systeem voor jóu?). Die worden in de praktijk veel
          minder ingevuld, terwijl ze juist het verschil maken.
        </div>
      `,
      questions: [
        { q: 'Neem de Heartbleed-vector in de calculator en zet alleen Attack Vector op Local. Wat wordt de basisscore?', answer: ['6.2', '6,2'],
          hints: ['De vector van Heartbleed staat al in de calculator.', 'Klik bij AV op L en laat de andere zeven metrieken staan.', 'De score zakt van High naar Medium.'],
          wrong: { '7.5': 'Dat is de score met AV:N. Zet Attack Vector op Local.', '5.9': 'Je hebt Attack Complexity op High gezet in plaats van Attack Vector op Local.' },
          explain: 'AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N = 6.2. Alleen al het feit dat de aanvaller op het systeem moet zitten, scheelt 1.3 punt.' },
        { q: 'Een slachtoffer moet op een kwaadaardige link klikken. Welke metriek en waarde horen daarbij?', options: ['UI:R (User Interaction: Required)', 'PR:H (Privileges Required: High)', 'AC:H (Attack Complexity: High)'], answer: 0, explain: 'Als een gebruiker iets moet doen, is User Interaction Required.' },
        { q: 'Plak nu de vector van Log4Shell uit de uitleg in de calculator en zet alleen Scope op Unchanged. Wat wordt de basisscore?', answer: ['9.8', '9,8'],
          hints: ['De vector van Log4Shell staat in de uitleg onder "De vectorstring".', 'Verander alleen S van C naar U.', 'De score blijft Critical, maar is geen 10 meer.'],
          wrong: { '10': 'Dat is de score met S:C. Zet Scope op Unchanged.', '10.0': 'Dat is de score met S:C. Zet Scope op Unchanged.' },
          why: 'Het verschil tussen 9.8 en 10.0 is precies de vraag of de schade buiten het kwetsbare onderdeel komt. Wie Scope verkeerd inschat, zit er bij lagere scores soms meer dan een punt naast.',
          explain: 'AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H = 9.8. Alleen met Scope Changed haalt deze vector de 10.0.' },
        { q: 'Welke metriek zegt of de schade buiten het kwetsbare onderdeel terechtkomt (bijvoorbeeld uitbreken uit een VM)?', answer: ['Scope', 'S', 'scope (s)'], hints: ['Het is de metriek die je bij de vorige vraag hebt omgezet.', 'De waarden zijn Unchanged en Changed.', 'Eén letter in de vector: S.'], explain: 'Scope Changed (S:C) betekent dat ook andere onderdelen dan het kwetsbare onderdeel geraakt worden.' },
      ],
    },

    {
      title: 'Taak 4 — Zelf scoren met de CVSS-calculator',
      content: `
        <p>Tijd om zelf te rekenen. Hieronder staat een CVSS v3.1-calculator. Klik per metriek de juiste waarde aan;
        de calculator rekent live de officiële basisscore en ernst uit. Lees elke beschrijving rustig en vraag je bij
        elke metriek af: <em>wat moet de aanvaller hebben of doen, en wat kan hij daarna?</em></p>

        <div class="callout info">
          <strong>Let op:</strong> de producten en lekken hieronder zijn fictief, bedacht voor deze oefening.
        </div>

        <h3>Melding A — KoffieCMS 4.2.1</h3>
        <p>KoffieCMS is een contentmanagementsysteem voor webshops. Via het openbare endpoint
        <code>/api/import</code> kan iedereen op internet, <strong>zonder in te loggen</strong>, SQL-opdrachten
        uitvoeren. Dat werkt <strong>elke keer</strong> en er is <strong>geen gebruiker</strong> nodig die ergens op
        klikt. De aanvaller kan alle klantgegevens <strong>lezen</strong>, prijzen en bestellingen
        <strong>wijzigen</strong> en de database <strong>wissen</strong>. De schade blijft binnen KoffieCMS en zijn
        database.</p>

        <h3>Melding B — BrouwMail 6.4</h3>
        <p>In de webmail van BrouwMail zit een XSS-fout. Een aanvaller zonder account maakt een speciale link en moet
        het slachtoffer <strong>overhalen om erop te klikken</strong>. Daarna draait zijn script in de
        <strong>browser van het slachtoffer</strong> (dus buiten de mailserver zelf). Hij kan daarmee een beperkte
        hoeveelheid informatie uit de sessie lezen en beperkt iets namens het slachtoffer wijzigen. De
        beschikbaarheid wordt niet geraakt. Het werkt betrouwbaar en via internet.</p>

        <h3>Melding C — BonenKassa 2.3</h3>
        <p>Op het kassasysteem BonenKassa kan iemand die al met een <strong>gewoon gebruikersaccount</strong>
        <strong>lokaal</strong> is ingelogd, door een fout in een hulpprogramma volledige beheerdersrechten krijgen
        (<em>privilege escalation</em>). Er is geen andere gebruiker voor nodig, het werkt elke keer, en daarna kan
        hij alles lezen, wijzigen en stilleggen op die kassa. De schade blijft op het systeem zelf.</p>

        <details>
          <summary>Hulp: zo vertaal je de beschrijving naar metrieken</summary>
          <ul>
            <li>"Via internet" → AV:N. "Al ingelogd op het systeem" → AV:L.</li>
            <li>"Werkt elke keer" → AC:L.</li>
            <li>"Zonder inloggen" → PR:N. "Gewoon account" → PR:L.</li>
            <li>"Slachtoffer moet klikken" → UI:R. "Geen gebruiker nodig" → UI:N.</li>
            <li>"In de browser van het slachtoffer" → S:C. "Blijft binnen het systeem" → S:U.</li>
            <li>"Alles" → H. "Beperkt" → L. "Niet geraakt" → N.</li>
          </ul>
        </details>

        <div class="callout tip">
          <strong>Controle:</strong> je kunt ook een vectorstring in de calculator plakken. Melding A begint
          bijvoorbeeld met <code>CVSS:3.1/AV:N/AC:L/PR:N/UI:N/...</code>. Vul de rest zelf in.
        </div>

        <p>Valt je op hoe groot het verschil is tussen A en C? Allebei geven ze uiteindelijk "volledige controle",
        maar bij C moet de aanvaller al binnen zijn met een account. Die drempel drukt de score. Dat betekent niet
        dat C onbelangrijk is: aanvallers combineren vaak een lek om binnen te komen met een lek om hogere rechten te
        krijgen (<em>chaining</em>).</p>
      `,
      lab: { type: 'cvss' },
      questions: [
        { q: 'Wat is de CVSS v3.1-basisscore van melding A (KoffieCMS)?', answer: ['9.8', '9,8'], hint: 'AV:N/AC:L/PR:N/UI:N/S:U met overal High impact.', explain: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H = 9.8 (Critical).' },
        { q: 'Wat is de basisscore van melding B (BrouwMail-XSS)?', answer: ['6.1', '6,1'], hint: 'UI:R, S:C, en C en I zijn Low, A is None.', explain: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N = 6.1 (Medium), een klassieke score voor reflected XSS.' },
        { q: 'Wat is de basisscore van melding C (BonenKassa)?', answer: ['7.8', '7,8'], hint: 'AV:L en PR:L, verder UI:N, S:U en overal High.', explain: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H = 7.8, een typische score voor lokale privilege escalation.' },
        { q: 'In welke ernstklasse valt melding C?', options: ['Medium', 'High', 'Critical'], answer: 1, explain: '7.8 ligt tussen 7.0 en 8.9, dus High.' },
      ],
    },

    {
      title: 'Taak 5 — CVSS v4.0, EPSS en de KEV-catalogus',
      tryFirst: true,
      intro: '<p>De scanner van Brandpunt Koffie heeft tien bevindingen opgeleverd. Je hebt vanavond tijd voor één patch. In het lab staat per bevinding de CVSS-score, de EPSS-kans, of het lek in KEV staat, of de host aan internet hangt en of het een kroonjuweel is. Bepaal welke bevinding bovenaan komt.</p>',
      content: `
        <h3>CVSS v4.0 in het kort</h3>
        <p>In november 2023 publiceerde FIRST <strong>CVSS v4.0</strong>. Het idee is hetzelfde (een score van 0 tot
        10), maar een aantal dingen is verfijnd:</p>
        <ul>
          <li><strong>AT — Attack Requirements</strong> is nieuw: zijn er speciale omstandigheden op het
          doelsysteem nodig (bijvoorbeeld een bepaalde configuratie)? Dit was in v3.1 deels in Attack Complexity
          verstopt.</li>
          <li><strong>User Interaction</strong> kent nu drie waarden: None, <em>Passive</em> (het slachtoffer
          bezoekt bijvoorbeeld alleen een pagina) en <em>Active</em> (het slachtoffer moet bewust iets doen, zoals een
          bestand openen en een waarschuwing wegklikken).</li>
          <li><strong>Scope is verdwenen.</strong> In plaats daarvan geef je de impact apart op voor het
          <em>kwetsbare systeem</em> (VC, VI, VA) en voor <em>volgende systemen</em> (SC, SI, SA).</li>
          <li>Er zijn namen voor welke metrieken je hebt meegenomen: <strong>CVSS-B</strong> (alleen basis),
          CVSS-BT (plus threat), CVSS-BE (plus environmental) en CVSS-BTE (alles).</li>
        </ul>
        <p>Toch kom je <strong>v3.1</strong> nog overal tegen: in de NVD, in adviezen van leveranciers en in
        scanners. In de praktijk moet je beide kunnen lezen. Kijk daarom altijd naar het voorvoegsel van de vector
        (<code>CVSS:3.1/</code> of <code>CVSS:4.0/</code>): een 9.3 in v4.0 is niet zomaar te vergelijken met een 9.3
        in v3.1.</p>

        <h3>Ernst is niet hetzelfde als kans</h3>
        <p>Elk jaar worden er tienduizenden CVE's gepubliceerd. Een groot deel scoort High of Critical. Als je alleen
        op CVSS sorteert, heb je al snel honderden "urgente" lekken — en dan patch je mogelijk eerst lekken die nooit
        misbruikt worden, terwijl een lek met een 7.5 waar criminelen al massaal op scannen blijft liggen. Daarom kijk
        je naast <em>ernst</em> ook naar de <em>kans op misbruik</em>.</p>

        <h3>EPSS: de weersverwachting</h3>
        <p>Het <strong>Exploit Prediction Scoring System (EPSS)</strong>, ook van FIRST, schat met een statistisch
        model de kans dat een CVE in de komende <strong>30 dagen</strong> in het wild misbruikt wordt. De uitkomst is
        een kans tussen 0 en 1 (bijvoorbeeld 0.02 = 2%, of 0.94 = 94%). Vergelijk het met een weersverwachting: CVSS
        zegt hoe zwaar de storm <em>zou</em> zijn, EPSS zegt hoe groot de kans is dat hij morgen ook echt komt.</p>

        <h3>KEV: het is al gebeurd</h3>
        <p>De <strong>Known Exploited Vulnerabilities (KEV)</strong>-catalogus van de Amerikaanse <strong>CISA</strong>
        is een lijst met kwetsbaarheden waarvan <em>bewezen</em> is dat ze echt misbruikt worden. Amerikaanse
        federale overheidsinstanties moeten lekken op die lijst binnen een vaste termijn verhelpen, maar organisaties
        wereldwijd gebruiken hem als "dit eerst"-lijst. Log4Shell staat er natuurlijk op. Ook het EUVD van ENISA geeft
        aan welke lekken actief misbruikt worden.</p>

        <table>
          <thead><tr><th>Bron</th><th>Vraag die het beantwoordt</th></tr></thead>
          <tbody>
            <tr><td>CVSS</td><td>Hoe erg is het technisch, als het misbruikt wordt?</td></tr>
            <tr><td>EPSS</td><td>Hoe groot is de kans op misbruik in de komende 30 dagen?</td></tr>
            <tr><td>KEV</td><td>Wordt het nu al aantoonbaar misbruikt?</td></tr>
          </tbody>
        </table>

        <div class="callout tip">
          <strong>Vuistregel:</strong> staat een lek in KEV en draait het op een systeem dat aan internet hangt, dan
          gaat het vóór vrijwel alles, ook vóór een hogere CVSS-score zonder bekend misbruik.
        </div>
      `,
      questions: [
        { q: 'Welke nieuwe basismetriek in CVSS v4.0 beschrijft of er speciale omstandigheden op het doelsysteem nodig zijn?', answer: ['AT', 'attack requirements', 'AT (attack requirements)'],
          hints: ['Het staat in het lijstje onder "CVSS v4.0 in het kort".', 'In v3.1 zat dit deels verstopt in Attack Complexity.', 'Twee letters: Attack ...'],
          explain: 'Attack Requirements (AT) is nieuw in v4.0; het haalt een deel uit de oude Attack Complexity.' },
        { q: 'Wat voorspelt EPSS?', options: ['De kans dat een CVE in de komende 30 dagen misbruikt wordt', 'De technische ernst van een kwetsbaarheid', 'Hoeveel dagen een patch duurt'], answer: 0,
          wrong: { 1: 'Dat is CVSS. EPSS zegt niets over hoe erg het is, alleen hoe waarschijnlijk misbruik is.', 2: 'EPSS gaat over misbruik door aanvallers, niet over het werk van beheerders.' },
          explain: 'EPSS geeft een kans tussen 0 en 1 op misbruik in de komende 30 dagen.' },
        { q: 'Welke bevinding uit het lab patch je vanavond als eerste? (ID, bijvoorbeeld V-09)', answer: ['V-01', 'V01', 'V-1', 'v 01'],
          hints: ['Sorteer niet op CVSS. Kijk eerst welke lekken aantoonbaar misbruikt worden.', 'Filter op kev=ja. Er blijven twee bevindingen over. Welke daarvan is vanaf internet bereikbaar?', 'De bevinding op web01 met CVSS 7.5.'],
          wrong: { 'V-02': 'Een 9.8, maar op een interne testserver, met een EPSS van 0.02 en geen bekend misbruik.', 'V-08': 'Staat in KEV, maar de printserver is alleen intern bereikbaar en geen kroonjuweel. Dit is nummer twee.', 'V-03': 'Hoog en aan internet, maar geen bekend misbruik en een EPSS van 0.01.', 'V-06': 'Aan internet en een flinke EPSS, maar niet in KEV. Belangrijk, alleen niet de eerste.' },
          why: 'Wie op CVSS sorteert, patcht hier eerst een testserver terwijl de webshop openstaat voor een lek waarvan vaststaat dat het wordt misbruikt.',
          explain: 'V-01: in KEV, bereikbaar vanaf internet en een kroonjuweel. Dat gaat voor alles, ook voor de twee bevindingen met 9.8.' },
        { q: 'Hoeveel bevindingen in het lab hebben een CVSS van 9.0 of hoger, maar een EPSS onder 0.05 en geen vermelding in KEV?', answer: ['3'],
          hints: ['Zoek eerst alle bevindingen met een score van 9.0 of hoger. Het filter /cvss=9/ helpt.', 'Streep daarvan weg wat in KEV staat of een hoge EPSS heeft.', 'V-02, V-03 en V-07.'],
          wrong: { '4': 'V-08 heeft ook een 9.8, maar staat in KEV en heeft een EPSS van 0.89.', '2': 'Ook precies 9.0 telt mee: V-07.' },
          explain: 'Drie. Op papier zijn ze Critical, maar er is nu geen aanwijzing voor misbruik. Ze komen na de lekken die wel misbruikt worden.' },
      ],
      lab: {
        type: 'logs',
        title: 'scanresultaten-brandpunt.txt',
        lines: `V-01  host=web01     bereik=internet  cvss=7.5  epss=0.91  kev=ja   kroonjuweel=ja
V-02  host=test03    bereik=intern    cvss=9.8  epss=0.02  kev=nee  kroonjuweel=nee
V-03  host=mail01    bereik=internet  cvss=9.1  epss=0.01  kev=nee  kroonjuweel=nee
V-04  host=kassa02   bereik=intern    cvss=7.8  epss=0.04  kev=nee  kroonjuweel=ja
V-05  host=web01     bereik=internet  cvss=5.3  epss=0.03  kev=nee  kroonjuweel=ja
V-06  host=vpn01     bereik=internet  cvss=8.1  epss=0.35  kev=nee  kroonjuweel=nee
V-07  host=hr-db01   bereik=intern    cvss=9.0  epss=0.03  kev=nee  kroonjuweel=ja
V-08  host=print04   bereik=intern    cvss=9.8  epss=0.89  kev=ja   kroonjuweel=nee
V-09  host=wiki01    bereik=intern    cvss=6.5  epss=0.12  kev=nee  kroonjuweel=nee
V-10  host=backup01  bereik=intern    cvss=8.8  epss=0.40  kev=nee  kroonjuweel=ja`,
      },
    },

    {
      title: 'Taak 6 — Patchmanagement, prioriteren en verantwoord melden',
      tryFirst: true,
      intro: '<p>Stel dat je een lek vindt in de webshop van Brandpunt Koffie en het netjes wilt melden. Zoek in het lab uit waar en hoe dat moet. Het verzoek dat klaarstaat levert niets op: bedenk waar een organisatie dit hoort te publiceren.</p>',
      content: `
        <p>Weten dat er een lek is, is pas het begin. <strong>Patchmanagement</strong> is het proces waarmee je
        ervoor zorgt dat updates op tijd, gecontroleerd en zonder brokken worden doorgevoerd.</p>

        <h3>1. Weet wat je hebt: de asset-inventaris</h3>
        <p>Je kunt niet patchen wat je niet kent. Een <strong>asset-inventaris</strong> is een actuele lijst van
        alle systemen, met per systeem de software en versies, de eigenaar en hoe belangrijk het is. Voor software
        binnen applicaties gebruik je een SBOM (Software Bill of Materials). Tijdens Log4Shell hadden organisaties met
        een goede inventaris binnen uren overzicht; anderen waren weken aan het zoeken.</p>

        <h3>2. Ken je kroonjuwelen</h3>
        <p><strong>Kroonjuwelen</strong> zijn de systemen en gegevens die voor je organisatie het belangrijkst zijn:
        de webshop, het klantbestand, de kassa's, het patiëntendossier. Een lek met CVSS 7.8 op een kroonjuweel kan
        belangrijker zijn dan een 9.8 op een afgeschermde testserver. Dit is precies waar de environmental-metrieken
        van CVSS voor bedoeld zijn.</p>

        <h3>3. Prioriteer en plan</h3>
        <p>Een praktische volgorde: (1) in KEV of actief misbruikt én bereikbaar vanaf internet; (2) hoge EPSS of
        Critical op kroonjuwelen; (3) de rest volgens een vast ritme. Patches rol je bij voorkeur uit in een
        <strong>onderhoudsvenster</strong>: een afgesproken tijd waarin storing acceptabel is (bijvoorbeeld dinsdag
        22:00-23:00). Test eerst op een testomgeving, en zorg dat je terug kunt (back-up of snapshot). Bij actief
        misbruik wacht je niet op het reguliere venster, maar plan je een noodwijziging.</p>

        <h3>4. Als patchen (nog) niet kan: mitigaties</h3>
        <p>Soms is er nog geen patch (zero-day), of kan een systeem niet zomaar herstarten (een productielijn, een
        medisch apparaat). Dan neem je <strong>mitigaties</strong> of <strong>workarounds</strong>: maatregelen die het
        risico verkleinen zonder de fout zelf op te lossen.</p>
        <ul>
          <li>De kwetsbare functie uitzetten (bijvoorbeeld een import-API of een plug-in).</li>
          <li>De toegang beperken: firewallregels, alleen via VPN, of een WAF-regel die het aanvalspatroon blokkeert.</li>
          <li>Het systeem in een apart netwerksegment plaatsen.</li>
          <li>Extra monitoren op tekenen van misbruik.</li>
        </ul>
        <p>Een workaround is een pleister, geen genezing: noteer hem en plan alsnog de echte patch.</p>

        <h3>5. Coordinated vulnerability disclosure in Nederland</h3>
        <p>Wat als <em>jij</em> een lek vindt bij een ander? Nederland heeft een sterke traditie van
        <strong>coordinated vulnerability disclosure (CVD)</strong>, vroeger <em>responsible disclosure</em>
        genoemd. Het <strong>NCSC</strong> heeft een leidraad gepubliceerd: de melder meldt het lek vertrouwelijk bij
        de eigenaar, die krijgt redelijke tijd om het te verhelpen, en daarna mag het samen openbaar gemaakt worden.
        Organisaties beloven in hun CVD-beleid vaak geen aangifte te doen als je je aan de spelregels houdt (niet meer
        doen dan nodig, geen gegevens kopiëren, niets delen voordat het is opgelost). In Nederland helpt ook het
        vrijwilligersinstituut DIVD bij het melden van lekken op grote schaal.</p>
        <ul>
          <li><strong>security.txt</strong> (RFC 9116): een klein bestand op <code>/.well-known/security.txt</code>
          waarin een organisatie vertelt hoe en waar je een lek kunt melden.</li>
          <li><strong>Bug bounty:</strong> een programma waarin een organisatie onderzoekers uitnodigt om binnen
          duidelijke regels te zoeken, en een beloning geeft voor geldige meldingen.</li>
        </ul>

        <div class="callout warn">
          <strong>Grens:</strong> een CVD-beleid is geen vrijbrief. Ga je verder dan nodig (data downloaden, systemen
          verstoren, dreigen met publicatie), dan kan het alsnog strafbaar zijn onder art. 138ab Sr.
        </div>
      `,
      questions: [
        { q: 'Vraag in het lab het security.txt-bestand van Brandpunt Koffie op. Tot welke datum is het geldig? (JJJJ-MM-DD)', answer: ['2027-06-30', '30-06-2027', '30 juni 2027'],
          hints: ['Het verzoek naar /security.txt geeft een 404. RFC 9116 schrijft een andere plek voor.', 'Het bestand staat in een vaste map die met een punt begint: /.well-known/', 'Lees de regel die met Expires begint.'],
          wrong: { '/404|not found/i': 'Dat is het antwoord op het verkeerde pad. Probeer /.well-known/security.txt' },
          explain: 'Het veld Expires staat op 30 juni 2027. Een security.txt met een verlopen datum mag je niet meer vertrouwen; daarom is dat veld verplicht.' },
        { q: 'Een medisch apparaat kan niet gepatcht worden. Wat is een goede mitigatie?', options: ['Het apparaat in een afgeschermd netwerksegment plaatsen en toegang beperken', 'Het lek negeren tot er een nieuw apparaat komt', 'Het apparaat rechtstreeks op internet zetten voor updates'], answer: 0, explain: 'Segmentatie en toegangsbeperking verkleinen het risico zolang patchen niet kan.' },
        { q: 'Naar welk e-mailadres meld je volgens dat bestand een lek bij Brandpunt Koffie?', answer: ['security@brandpunt-koffie.example', 'mailto:security@brandpunt-koffie.example'],
          hints: ['Je hebt het bestand nodig dat op /.well-known/security.txt staat.', 'Lees de regel die met Contact begint.', 'Het adres begint met security@'],
          wrong: { '/well-known/i': 'Dat is het pad van het bestand. Gevraagd is het adres dat erin staat.', '/^info@/i': 'Een algemeen adres is juist wat je wilt vermijden: een melding over een lek hoort bij het securityteam.' },
          explain: 'Het veld Contact noemt security@brandpunt-koffie.example. Lees ook het beleid waarnaar Policy verwijst voordat je iets test of meldt.' },
        { q: 'Wat hoort bij coordinated vulnerability disclosure?', options: ['Vertrouwelijk melden bij de eigenaar en die tijd geven om het op te lossen', 'Het lek direct op sociale media zetten', 'Zoveel mogelijk data downloaden als bewijs'], answer: 0, explain: 'Bij CVD meld je vertrouwelijk, doe je niet meer dan nodig en maak je het pas openbaar na herstel.' },
      ],
      lab: {
        type: 'http',
        host: 'www.brandpunt-koffie.example',
        start: { method: 'GET', path: '/security.txt', headers: {}, body: '' },
        routes: [
          { method: 'GET', path: '/', status: 200, headers: { 'Content-Type': 'text/plain' }, body: 'Brandpunt Koffie B.V. (fictief) - webshop\nVers gebrande koffie, voor 16:00 besteld is morgen in huis.' },
          { method: 'GET', path: '/.well-known/security.txt', status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: 'Contact: mailto:security@brandpunt-koffie.example\nExpires: 2027-06-30T22:00:00.000Z\nPreferred-Languages: nl, en\nPolicy: https://www.brandpunt-koffie.example/cvd-beleid\n' },
          { method: 'GET', path: '/cvd-beleid', status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: 'Beleid voor coordinated vulnerability disclosure - Brandpunt Koffie B.V. (fictief)\n\nMeld een lek vertrouwelijk via het adres in ons security.txt-bestand.\nWij bevestigen je melding binnen 5 werkdagen en streven ernaar het lek binnen 60 dagen te verhelpen.\n\nNiet toegestaan: meer gegevens inzien dan nodig is om het lek aan te tonen, gegevens kopieren of bewaren,\nde dienst verstoren, of het lek delen voordat het is opgelost.\n\nHoud je je aan deze regels, dan doen wij geen aangifte.' },
          { method: 'GET', path: '/security.txt', status: 404, headers: { 'Content-Type': 'text/plain' }, body: 'Not Found' },
        ],
      },
    },

    {
      title: 'Taak 7 — Praktijk: is onze server kwetsbaar?',
      content: `
        <p>Je bent dienstdoende beheerder bij het (fictieve) koffiebedrijf <strong>Brandpunt Koffie B.V.</strong>
        Vanochtend kwam er een stapel beveiligingsadviezen binnen. Jouw taak: uitzoeken of de webserver
        <code>web01</code> kwetsbaar is, en zo ja, wat je nu meteen kunt doen. Dit is precies de dagelijkse praktijk:
        <em>advies lezen → versie controleren → beslissen → handelen</em>.</p>

        <h3>Stap 1 — Oriënteren</h3>
        <p>Lees eerst de opdracht en de asset-inventaris. Let op welke systemen kroonjuwelen zijn.</p>
        <pre><code>cat LEESMIJ.txt
cat inventaris.txt</code></pre>

        <h3>Stap 2 — Welke versie draait er?</h3>
        <p>Veel software heeft een versiebestand of een changelog. Kijk ook even in de changelog: in welke versie
        kwam de import-API erbij?</p>
        <pre><code>cat /opt/koffiecms/VERSION
cat /opt/koffiecms/CHANGELOG.txt</code></pre>

        <h3>Stap 3 — Het juiste advies vinden</h3>
        <p>In de map <code>advies</code> staan meerdere adviezen. Met <code>grep -r</code> zoek je in één keer in
        alle bestanden in een map naar een woord:</p>
        <pre><code>ls advies
grep -r KoffieCMS advies</code></pre>
        <p>Open daarna het advies dat over KoffieCMS gaat met <code>cat</code> en lees het volledig: welke versies
        zijn getroffen, in welke versie is het opgelost, wat is de CVSS-score, wordt het al misbruikt, en wat is de
        workaround?</p>

        <h3>Stap 4 — De instelling controleren</h3>
        <p>Het advies noemt een instelling in het configuratiebestand. Zoek die op met <code>grep</code>:</p>
        <pre><code>grep import_api /etc/koffiecms/koffiecms.conf</code></pre>

        <div class="callout info">
          <strong>Denk als beheerder:</strong> de versie valt binnen het getroffen bereik, het lek staat als actief
          misbruikt gemeld, de CVSS is 9.8 en <code>web01</code> is een kroonjuweel aan internet. Wachten tot het
          onderhoudsvenster van dinsdag is dan geen goed idee. Je zet nu de workaround aan (import_api uit, WAF-regel),
          plant een noodwijziging om naar de gepatchte versie te gaan en controleert de logs op tekenen van eerder
          misbruik. Merk ook op dat <code>test03</code> al een nieuwere versie draait: daar kun je de update eerst testen.
        </div>

        <div class="callout tip">
          <strong>Tip:</strong> typ je een commando verkeerd, gebruik dan de pijltjestoets omhoog. Met <code>help</code>
          zie je welke commando's beschikbaar zijn.
        </div>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student', host: 'web01',
        home: '/home/student', cwd: '/home/student',
        motd: 'web01 — Brandpunt Koffie B.V. (fictieve labserver). Begin met: cat LEESMIJ.txt',
        fs: { ...KWETS_FS },
        denied: ['/root', '/etc/shadow'],
      },
      questions: [
        { q: 'Welke versie van KoffieCMS draait er op web01?', answer: ['4.2.1', 'koffiecms 4.2.1'], hint: 'cat /opt/koffiecms/VERSION', explain: 'web01 draait KoffieCMS 4.2.1, en dat valt binnen het getroffen bereik 4.2.0 t/m 4.2.2.' },
        { q: 'In welke versie is het lek uit NM-SA-2026-014 opgelost?', answer: ['4.2.3', 'koffiecms 4.2.3'], hint: 'Zoek de regel "Opgelost in" in het advies.', explain: 'Het lek is opgelost in 4.2.3; tot die update gebruik je de workaround.' },
        { q: 'Welke controlecode (vlag) staat onderaan het advies over KoffieCMS?', answer: ['NM{advies_gelezen_versie_kwetsbaar}'], hint: 'grep -r KoffieCMS advies, en dan cat op het juiste bestand.', explain: 'Je hebt het juiste advies gevonden en volledig gelezen.' },
        { q: 'Welke vlag staat bij de instelling import_api in het configuratiebestand?', answer: ['NM{workaround_eerst_dan_patchen}'], hint: 'grep import_api /etc/koffiecms/koffiecms.conf', explain: 'De workaround (import_api uit) koopt tijd, maar de echte oplossing blijft de update naar 4.2.3.' },
        { q: 'Boss: de leverancier van KoffieCMS brengt een rectificatie uit. Het kwetsbare endpoint blijkt alleen bereikbaar vanaf een aangrenzend netwerk en alleen voor iemand met een beheerdersaccount. De rest van de beoordeling blijft gelijk. Welke basisscore hoort bij het gecorrigeerde advies?', boss: true, answer: ['6.8', '6,8'],
          hints: ['Je hebt de oorspronkelijke vector nodig. Die staat in het advies op de server, niet in de uitleg.', 'Twee metrieken veranderen: vanaf waar de aanvaller moet komen en welk account hij vooraf nodig heeft. Gebruik de calculator van taak 4.', 'Zet in de vector uit het advies AV op A en PR op H en laat de rest staan.'],
          wrong: { '9.8': 'Dat is de score uit het oorspronkelijke advies. Verwerk de twee correcties.', '8.8': 'Je hebt één van de twee correcties verwerkt. Het gaat om Attack Vector en om Privileges Required.', '7.2': 'Privileges Required klopt nu. Attack Vector moet nog van Network naar Adjacent.', '8.0': 'Je hebt PR op Low gezet. Een beheerdersaccount is High.' },
          explain: 'In NM-SA-2026-014 staat CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H (9.8). Met AV:A en PR:H wordt dat 6.8, Medium. Zelfde fout in de code, bijna drie punten lager, alleen doordat de aanvaller er moeilijker bij kan.' },
      ],
    },

    {
      title: 'Taak 8: Verdieping: wat er achter het cijfer zit',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Een CVSS-score ziet eruit als een meting. Het is een afspraak: een formule met gewichten die experts hebben
        gekozen. Wie de formule kent, snapt ook waarom scores soms verrassen.</p>

        <h3>Hoe de basisscore van v3.1 tot stand komt</h3>
        <p>Elke metriekwaarde heeft een gewicht. Voor de impact geldt: High = 0.56, Low = 0.22, None = 0. Daaruit volgt
        de <em>Impact Sub Score</em>:</p>
        <pre><code>ISS = 1 - (1 - C) x (1 - I) x (1 - A)</code></pre>
        <p>Bij Scope Unchanged is de impact 6.42 x ISS. De exploitability is 8.22 x AV x AC x PR x UI. De basisscore is
        de som van die twee, met een maximum van 10 en <strong>altijd naar boven afgerond</strong> op één decimaal.
        Bij Scope Changed geldt een andere impactformule en wordt de som nog met 1.08 vermenigvuldigd. Ook wegen
        Privileges Required Low en High dan minder zwaar als drempel. Daarom doet Scope zoveel met de uitkomst.</p>
        <p>Twee gevolgen. De schaal is niet lineair: een 8.0 is niet "twee keer zo erg" als een 4.0. En drie keer
        High impact levert geen 3 x 0.56 op, omdat de factoren met elkaar vermenigvuldigd worden.</p>

        <h3>Randgevallen uit de praktijk</h3>
        <ul>
          <li><strong>Twee scores voor één CVE.</strong> De leverancier en de NVD scoren hetzelfde lek soms
          verschillend, omdat ze andere aannames doen over bijvoorbeeld Scope of de benodigde rechten. Kijk welke
          vector erbij staat en wie hem heeft toegekend.</li>
          <li><strong>CVE's zonder score.</strong> Sinds begin 2024 loopt de NVD achter met het verrijken van nieuwe
          CVE's. Een CVE zonder score is dus niet ongevaarlijk. Kijk dan naar de score van de CNA of naar het EUVD.</li>
          <li><strong>Niet in KEV.</strong> De catalogus bevat alleen lekken waarvan misbruik voor CISA vaststaat.
          Ontbreken betekent "niet aangetoond", niet "veilig". De verplichte termijnen gelden voor Amerikaanse federale
          instanties en komen uit de richtlijn BOD 22-01 (2021).</li>
          <li><strong>EPSS verandert.</strong> De kans wordt dagelijks herberekend. Een lek met 0.02 kan na een
          gepubliceerde exploit binnen dagen naar boven schieten. Kijk dus op de dag dat je plant.</li>
        </ul>

        <h3>Van score naar besluit</h3>
        <p>FIRST zegt het zelf in de documentatie bij v3.1: de basisscore meet ernst, geen risico. Om tot een besluit
        te komen is er naast "CVSS plus EPSS plus KEV" ook SSVC (<em>Stakeholder-Specific Vulnerability
        Categorization</em>), een beslisboom van het CERT/CC en CISA. Die levert geen getal op maar een handeling,
        bijvoorbeeld "volgen" of "nu handelen", op basis van misbruik, blootstelling en het belang van het systeem.</p>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Een v3.1-score en een v4.0-score naast elkaar zetten alsof het dezelfde schaal is.</li>
          <li>Alleen "alles vanaf 9.0" patchen en de 7.5 in KEV laten liggen.</li>
          <li>De basisscore aanpassen omdat het systeem bij jou afgeschermd staat. Daarvoor zijn de
          environmental-metrieken; de basisscore blijft voor iedereen gelijk.</li>
          <li>Een workaround noteren als "opgelost" en de patch nooit meer plannen.</li>
        </ul>
      `,
      questions: [
        { q: 'Bereken de Impact Sub Score voor een lek met C:H, I:H en A:N. Rond af op twee decimalen.', answer: ['0.81', '0,81', '0.8064', '0,8064', '0.806', '0,806'],
          hints: ['Vul de gewichten in de formule in: High = 0.56 en None = 0.', '1 min 0.56 is 0.44. Dat komt twee keer voor; de derde factor is 1.', '1 - (0.44 x 0.44 x 1)'],
          wrong: { '1.12': 'Je telt de gewichten op. In de formule worden de "restjes" (1 min het gewicht) met elkaar vermenigvuldigd.', '0.19': 'Dat is 0.44 x 0.44. Trek die uitkomst nog van 1 af.' },
          explain: '1 - (0.44 x 0.44 x 1) = 1 - 0.1936 = 0.8064. Twee keer High geeft dus geen 1.12, maar 0.81.' },
        { q: 'De formule geeft voor een lek een ruwe uitkomst van 7.01. Welke basisscore wordt er gepubliceerd?', answer: ['7.1', '7,1'],
          hints: ['CVSS rondt niet af zoals je op school leerde.', 'Lees in de uitleg hoe de som wordt afgerond.', 'Altijd naar boven, op één decimaal.'],
          wrong: { '7.0': 'Bij gewoon afronden wel. CVSS rondt altijd naar boven af.', '7': 'Bij gewoon afronden wel. CVSS rondt altijd naar boven af.' },
          explain: '7.1. Door het naar boven afronden kan een minimaal verschil in de formule net een hogere score of zelfs een hogere ernstklasse opleveren.' },
        { q: 'Een beheerder zoekt een CVE op en ziet dat het lek niet in de KEV-catalogus staat. Wat mag hij daaruit concluderen?', options: ['Dat misbruik niet is aangetoond; het lek kan wel degelijk misbruikt worden', 'Dat het lek niet misbruikt wordt en dus kan wachten', 'Dat de CVSS-score lager dan 7.0 is', 'Dat er nog geen exploit voor bestaat'], answer: 0,
          wrong: { 1: 'KEV is een lijst van bewezen gevallen. Wat er niet op staat, kan nog steeds worden misbruikt zonder dat het is vastgesteld.', 2: 'KEV kijkt naar misbruik, niet naar ernst. Er staan ook lekken met een lage score op.', 3: 'Er kan een publieke exploit bestaan zonder dat misbruik in het wild is aangetoond.' },
          explain: 'Niet in KEV betekent "niet aangetoond". Kijk ook naar EPSS en naar meldingen van je eigen leveranciers en het NCSC.' },
      ],
    },

    {
      title: 'Taak 9: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examens over kwetsbaarheidsbeheer geven je een beschrijving van een lek of een lijst met bevindingen en
        vragen om een score, een prioriteit of een volgende stap. De afleiders bij scorevragen zijn scores die je
        krijgt als je precies één metriek verkeerd kiest. Vertaal de beschrijving daarom metriek voor metriek en
        reken het na in de calculator hieronder. Bij prioriteitsvragen is de hoogste CVSS-score zelden het goede
        antwoord.</p>
        <p>De vier vragen zijn zelf geschreven in die stijl. Alle producten en organisaties zijn fictief.</p>
      `,
      lab: { type: 'cvss' },
      questions: [
        { q: 'In het fictieve RoosterApp kan een ingelogde gewone gebruiker via internet de roosters en persoonsgegevens van alle collega\'s lezen, wijzigen en wissen. Het werkt elke keer, er is geen andere gebruiker voor nodig en de schade blijft binnen de applicatie. Welke CVSS v3.1-basisscore hoort hierbij?',
          options: ['9.8 (Critical)', '8.8 (High)', '7.2 (High)', '9.9 (Critical)'], answer: 1,
          wrong: { 0: 'Dat is de score zonder benodigd account (PR:N). Hier moet de aanvaller ingelogd zijn.', 2: 'Dat hoort bij een beheerdersaccount (PR:H). Een gewone gebruiker is PR:L.', 3: 'Dat krijg je met Scope Changed. De schade blijft hier binnen de applicatie.' },
          explain: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H = 8.8.' },
        { q: 'Je hebt vanavond één onderhoudsvenster. Welke bevinding pak je op?',
          options: ['CVSS 9.8 op een interne testserver; EPSS 0.02; niet in KEV', 'CVSS 8.8 op het interne HR-systeem (kroonjuweel); EPSS 0.10; niet in KEV', 'CVSS 7.2 op de VPN-gateway aan internet; staat in KEV', 'Alle drie, in volgorde van CVSS-score, zover de tijd reikt'], answer: 2,
          wrong: { 0: 'De hoogste score, maar intern, zonder aanwijzing voor misbruik en op een systeem zonder waarde.', 1: 'Een kroonjuweel telt zwaar, maar er is geen aangetoond misbruik en het systeem is niet vanaf internet bereikbaar.', 3: 'Dan begin je bij de testserver en komt de gateway die nu wordt aangevallen misschien niet meer aan de beurt.' },
          explain: 'Aantoonbaar misbruik plus bereikbaar vanaf internet gaat voor. De VPN-gateway is bovendien de voordeur naar de andere twee.' },
        { q: 'Een advies vermeldt de vector CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N. Een collega zoekt de metriek Scope en vindt hem niet. Wat klopt?',
          options: ['De vector is onvolledig en dus ongeldig', 'Scope ontbreekt en is daarom Unchanged', 'Attack Requirements (AT) heeft Scope vervangen', 'In v4.0 bestaat Scope niet meer; de impact op volgende systemen staat in SC, SI en SA'], answer: 3,
          wrong: { 0: 'Dit is een volledige basisvector van v4.0. Kijk naar het voorvoegsel.', 1: 'Dat is v3.1-denken. In v4.0 wordt niets "aangenomen": de impact buiten het kwetsbare systeem staat er expliciet in.', 2: 'AT is nieuw, maar komt uit de oude Attack Complexity en heeft niets met Scope te maken.' },
          explain: 'CVSS v4.0 splitst de impact in het kwetsbare systeem (VC, VI, VA) en volgende systemen (SC, SI, SA). Hier zijn die laatste drie None.' },
        { q: 'Een student ontdekt dat hij in de webshop van een bakker de bestellingen van andere klanten kan zien door het klantnummer in de URL te veranderen. De bakker heeft geen security.txt en geen CVD-beleid. Wat is de beste stap?',
          options: ['Een paar honderd bestellingen downloaden, zodat de bakker het probleem wel moet geloven', 'Het lek direct openbaar maken om de andere klanten te waarschuwen', 'Stoppen zodra het lek is aangetoond, niets bewaren, de bakker vertrouwelijk benaderen en bij uitblijven van een reactie een tussenpartij zoals het NCSC of DIVD om hulp vragen', 'Niets melden, want zonder CVD-beleid is elke melding strafbaar'], answer: 2,
          wrong: { 0: 'Dat is meer doen dan nodig en het kopiëren van persoonsgegevens. Daarmee overschrijd je de grens, ook met goede bedoelingen.', 1: 'Dan kan iedereen het lek misbruiken voordat het dicht is. Openbaar maken komt na herstel, in overleg.', 3: 'Het ontbreken van beleid maakt melden niet strafbaar. Wat telt is hoe je hebt gehandeld: niet verder gaan dan nodig en vertrouwelijk melden.' },
          explain: 'De kern van CVD: aantonen, niet uitbuiten, vertrouwelijk melden en de eigenaar tijd geven. Een garantie tegen vervolging is het niet; proportioneel handelen wel je beste bescherming.' },
      ],
    },
  ],

  terms: [
    { term: 'Kwetsbaarheid', def: 'Een fout in software, hardware of configuratie waardoor vertrouwelijkheid, integriteit of beschikbaarheid in gevaar kan komen.' },
    { term: 'Exploit', def: 'Code of een stappenplan waarmee een kwetsbaarheid daadwerkelijk misbruikt wordt.' },
    { term: 'Zero-day', def: 'Een kwetsbaarheid die al bekend is bij aanvallers of misbruikt wordt terwijl er nog geen patch is.' },
    { term: 'CVE', def: 'Common Vulnerabilities and Exposures: uniek ID per kwetsbaarheid (bijv. CVE-2021-44228), beheerd binnen het CVE-programma van MITRE.' },
    { term: 'CNA', def: 'CVE Numbering Authority: organisatie die zelf CVE-ID\'s mag toekennen voor haar eigen producten of terrein.' },
    { term: 'CWE', def: 'Common Weakness Enumeration: lijst met soorten fouten, zoals CWE-79 (XSS) en CWE-89 (SQL-injectie).' },
    { term: 'NVD', def: 'National Vulnerability Database van NIST: verrijkt CVE\'s met o.a. CVSS-scores, CWE en getroffen versies.' },
    { term: 'EUVD', def: 'European Vulnerability Database van ENISA, sinds 2025, voortkomend uit de NIS2-richtlijn.' },
    { term: 'CVSS', def: 'Common Vulnerability Scoring System van FIRST: score van 0.0 tot 10.0 voor de technische ernst van een kwetsbaarheid.' },
    { term: 'EPSS', def: 'Exploit Prediction Scoring System: kans (0 tot 1) dat een CVE in de komende 30 dagen misbruikt wordt.' },
    { term: 'KEV', def: 'Known Exploited Vulnerabilities: catalogus van CISA met kwetsbaarheden die aantoonbaar misbruikt worden.' },
    { term: 'CVD', def: 'Coordinated vulnerability disclosure: een lek vertrouwelijk melden bij de eigenaar en pas openbaar maken na herstel.' },
  ],

  resources: [
    { title: 'FIRST — CVSS v3.1-calculator', url: 'https://www.first.org/cvss/calculator/3.1' },
    { title: 'NIST — National Vulnerability Database', url: 'https://nvd.nist.gov/' },
    { title: 'CISA — Known Exploited Vulnerabilities Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog' },
    { title: 'NCSC (Nederland) — kwetsbaarheden melden en adviezen', url: 'https://www.ncsc.nl/' },
  ],
});
