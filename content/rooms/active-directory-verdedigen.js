/* Room: Active Directory verdedigen */
CS.registerRoom({
  id: 'active-directory-verdedigen',
  path: 'defensief',
  order: 17,
  title: 'Active Directory verdedigen',
  icon: '🏰',
  difficulty: 'Moeilijk',
  minutes: 90,
  level: 'Gevorderd',
  checked: '2026-11-12',
  summary: 'Active Directory is de sleutelbos van bijna elk Windows-netwerk. Lees Kerberos-gebeurtenissen op de domeincontroller, herken kerberoasting en password spraying, bouw een detectieregel, licht bevoorrechte groepen door en kies de hardening die de aanval had gestopt.',
  objectives: [
    'Kerberos op hoofdlijnen uitleggen (TGT, service ticket) en de bijbehorende gebeurtenissen 4768, 4769 en 4771 lezen',
    'Kerberoasting herkennen aan het patroon van 4769-gebeurtenissen en er een detectieregel met weinig vals alarm voor bouwen',
    'Password spraying onderscheiden van brute force in de logs van de domeincontroller en een server',
    'Bevoorrechte groepen en aanmeldingen van beheeraccounts doorlichten aan de hand van het tiermodel',
    'Hardening kiezen en prioriteren: gMSA en AES voor serviceaccounts, Protected Users, Windows LAPS en een lege Schema Admins',
  ],
  tasks: [
    {
      title: 'Taak 1: Kerberos op hoofdlijnen',
      tryFirst: true,
      intro: '<p>In het lab staat een half uur uit het Security-log van domeincontroller DC01 van het fictieve logistiekbedrijf Hoekstra. Twee medewerkers beginnen hun dag. Volg wat ze aanvragen: wie krijgt welk ticket, wie typte eerst een verkeerd wachtwoord, en welke dienst draait niet onder een computeraccount?</p>',
      content: `
        <p>Denk aan een kermis met polsbandjes. Bij de kassa laat je je identiteit zien en krijg je een polsbandje voor
        de dag. Bij elke attractie laat je het bandje zien en krijg je een muntje voor die ene attractie. De
        attractie kijkt alleen naar het muntje, en hoeft de kassa niet te bellen. Kerberos, het standaard
        aanmeldprotocol in een Active Directory-domein, werkt net zo.</p>
        <ol>
          <li><strong>Aanmelden bij de KDC.</strong> De domeincontroller speelt de rol van <em>Key Distribution Center</em>
          (KDC). De werkplek bewijst dat de gebruiker het wachtwoord kent (de <em>pre-authenticatie</em>) en krijgt een
          <strong>Ticket Granting Ticket</strong> (TGT): het polsbandje. Op de domeincontroller staat dan gebeurtenis
          <strong>4768</strong> (<em>A Kerberos authentication ticket (TGT) was requested</em>).</li>
          <li><strong>Een service ticket per dienst.</strong> Wil de gebruiker naar de bestandsserver, dan laat de
          werkplek het TGT zien en vraagt een <strong>service ticket</strong> voor die dienst: het muntje. Op de
          domeincontroller staat dan <strong>4769</strong> (<em>A Kerberos service ticket was requested</em>).</li>
          <li><strong>Naar de dienst.</strong> De werkplek geeft het service ticket aan de dienst. Een deel van dat ticket
          is versleuteld met een sleutel die is afgeleid van het wachtwoord van het account waaronder de dienst draait.
          Alleen die dienst kan het openen.</li>
        </ol>
        <p>Lukt de pre-authenticatie niet, omdat het wachtwoord fout is, dan staat er <strong>4771</strong>
        (<em>Kerberos pre-authentication failed</em>) met foutcode <code>0x18</code>. Bestaat de gebruikersnaam niet,
        dan zie je een mislukte 4768 met resultaatcode <code>0x6</code>.</p>
        <h3>Wat er in een 4769 staat</h3>
        <table>
          <thead><tr><th>Veld</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td>Account</td><td>Wie het ticket aanvraagt.</td></tr>
            <tr><td>Service</td><td>Het account waaronder de dienst draait. Eindigt de naam op <code>$</code>, dan is het
            een computeraccount, met een lang willekeurig wachtwoord dat Windows zelf wijzigt. Zonder <code>$</code> is
            het een gewoon gebruikersaccount dat als serviceaccount wordt gebruikt, met een wachtwoord dat een mens
            heeft gekozen.</td></tr>
            <tr><td>Client</td><td>Het IP-adres van de aanvrager.</td></tr>
            <tr><td>Result</td><td><code>0x0</code> is gelukt.</td></tr>
            <tr><td>TicketEnc</td><td>De versleuteling van het ticket: <code>0x12</code> en <code>0x11</code> zijn AES (256
            en 128 bit), <code>0x17</code> is RC4-HMAC, een ouder en zwakker type.</td></tr>
          </tbody>
        </table>
        <div class="callout info"><strong>Logging aanzetten:</strong> 4768 en 4771 komen uit de auditcategorie
        <em>Audit Kerberos Authentication Service</em>, 4769 uit <em>Audit Kerberos Service Ticket Operations</em>.
        Ze staan alleen op de domeincontrollers. Staan die categorieën uit, dan is er niets te zien.</div>
      `,
      lab: {
        type: 'logs',
        title: 'DC01 Security-log, 2026-11-10 08:00-08:30 (vereenvoudigd)',
        lines: `2026-11-10 08:01:12 DC01 4768 Account=a.visser Client=10.20.4.12 Result=0x0 TicketEnc=0x12 PreAuth=2
2026-11-10 08:01:13 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=WS-0412$ Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 08:01:20 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 08:02:05 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=MAIL01$ Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 08:03:44 DC01 4771 Account=r.jansen Client=10.20.4.19 Failure=0x18 PreAuth=2
2026-11-10 08:03:51 DC01 4771 Account=r.jansen Client=10.20.4.19 Failure=0x18 PreAuth=2
2026-11-10 08:04:02 DC01 4768 Account=r.jansen Client=10.20.4.19 Result=0x0 TicketEnc=0x12 PreAuth=2
2026-11-10 08:04:03 DC01 4769 Account=r.jansen@HOEKSTRA.NM.LAB Service=WS-0419$ Client=10.20.4.19 Result=0x0 TicketEnc=0x12
2026-11-10 08:06:30 DC01 4768 Account=WS-0433$ Client=10.20.4.33 Result=0x0 TicketEnc=0x12 PreAuth=2
2026-11-10 08:10:17 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=svc-crm Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 08:15:40 DC01 4769 Account=r.jansen@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.4.19 Result=0x0 TicketEnc=0x12
2026-11-10 08:22:30 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=PRINT01$ Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 08:27:51 DC01 4769 Account=r.jansen@HOEKSTRA.NM.LAB Service=MAIL01$ Client=10.20.4.19 Result=0x0 TicketEnc=0x12`,
      },
      questions: [
        { q: 'Voor hoeveel verschillende diensten vroeg a.visser een service ticket aan?', answer: ['5', 'vijf'],
          hints: ['Een service ticket is een 4769.', 'Filter op 4769 en a.visser en tel de verschillende waarden van Service.', 'Vier computeraccounts en één andere.'],
          wrong: { '6': 'De 4768 is het TGT, geen service ticket.', '4': 'Ook svc-crm is een dienst, al draait hij niet onder een computeraccount.' },
          explain: 'Vijf: WS-0412$ (zijn eigen werkplek), FS01$, MAIL01$, svc-crm en PRINT01$.' },
        { q: 'Welke gebruiker typte eerst twee keer een verkeerd wachtwoord voordat de aanmelding lukte?', answer: ['r.jansen', 'jansen'],
          hints: ['Zoek de gebeurtenis voor mislukte pre-authenticatie.', 'Filter op 4771.', 'Kijk welke 4768 er daarna voor hetzelfde account volgt.'],
          wrong: { 'a.visser': 'a.visser krijgt meteen een TGT. Er staat geen 4771 voor dit account.' },
          explain: 'r.jansen: twee keer 4771 met 0x18, daarna een geslaagde 4768 vanaf dezelfde werkplek. Een typefout, normaal gedrag.' },
        { q: 'Welke dienst in het log draait onder een gebruikersaccount in plaats van een computeraccount?', answer: ['svc-crm'],
          hints: ['Kijk naar de waarden van Service.', 'Een computeraccount eindigt op een dollarteken.', 'Er is er één zonder.'],
          wrong: { 'WS-0433$': 'Dat is een werkplek die zelf een TGT aanvraagt. Het dollarteken zegt dat het een computeraccount is.' },
          why: 'Een dienst onder een gebruikersaccount heeft een wachtwoord dat een mens koos en dat vaak jaren niet verandert. Precies die accounts zijn het doelwit van de aanval in de volgende taak.',
          explain: 'svc-crm. De CRM-applicatie draait onder een gewoon account met een SPN (service principal name), zodat er tickets voor kunnen worden aangevraagd.' },
        { q: 'Waarmee is het deel van een service ticket voor svc-crm versleuteld dat alleen de dienst kan openen?', options: ['Met een sleutel die is afgeleid van het wachtwoord van het account svc-crm', 'Met het wachtwoord van de gebruiker die het ticket aanvraagt', 'Met het TLS-certificaat van de domeincontroller', 'Het is niet versleuteld, alleen ondertekend'], answer: 0,
          wrong: { 1: 'Het wachtwoord van de aanvrager wordt gebruikt bij de pre-authenticatie, niet voor het ticket van de dienst.', 2: 'Kerberos gebruikt geen TLS-certificaten voor service tickets.', 3: 'Het ticket is wel versleuteld; daarom kan alleen de dienst het lezen.' },
          explain: 'Met een sleutel uit het wachtwoord van het serviceaccount. Is dat wachtwoord zwak, dan is de versleuteling van het ticket zo sterk als dat wachtwoord.' },
      ],
    },

    {
      title: 'Taak 2: Kerberoasting herkennen in 4769',
      tryFirst: true,
      intro: '<p>Dezelfde domeincontroller, een paar uur later. Iemand heeft in korte tijd veel service tickets aangevraagd. Zoek het account dat dit doet, tel voor hoeveel diensten het een RC4-ticket kreeg, en zoek het account dat ook RC4 gebruikt maar waarschijnlijk onschuldig is.</p>',
      content: `
        <p>Elke gebruiker in een domein mag een service ticket aanvragen voor elke dienst met een SPN. Dat is zo
        ontworpen. Bij <strong>kerberoasting</strong> (MITRE ATT&amp;CK T1558.003) maakt een aanvaller met een gewoon
        domeinaccount daar misbruik van. Hij vraagt tickets aan voor diensten die onder een gebruikersaccount draaien,
        en probeert daarna buiten het netwerk, op zijn eigen apparatuur, het wachtwoord van het serviceaccount te raden
        dat bij de versleuteling hoort. Dat raden laat geen enkel spoor achter in jouw netwerk.</p>
        <p>Voor de verdediger betekent dat: <strong>de 4769-gebeurtenissen zijn het enige moment waarop je het kunt
        zien</strong>. Wat je daarna mist, merk je pas als het serviceaccount ergens opduikt waar het niet hoort.</p>
        <h3>Het patroon</h3>
        <ul>
          <li><strong>Veel verschillende diensten, één aanvrager, korte tijd.</strong> Een gewone gebruiker vraagt
          tickets aan voor de diensten die hij gebruikt: zijn werkplek, de bestandsserver, de mail. Niet voor zeven
          serviceaccounts binnen een minuut.</li>
          <li><strong>RC4 (<code>0x17</code>) in een omgeving die AES gebruikt.</strong> Aanvallers vragen vaak om RC4,
          omdat dat het raden versnelt. Een plotselinge reeks RC4-tickets valt op tussen de AES-tickets.</li>
          <li><strong>Diensten zonder <code>$</code>.</strong> Computeraccounts zijn geen interessant doelwit: hun
          wachtwoord is lang en willekeurig.</li>
          <li><strong>Een ongebruikelijke bron.</strong> Een werkplek die nooit met de SQL-server praat, vraagt er
          ineens een ticket voor aan.</li>
        </ul>
        <h3>Vals alarm</h3>
        <p>RC4 alleen is geen bewijs. Oude apparaten, zoals een NAS of een scanner, ondersteunen soms alleen RC4 en
        vragen dagelijks hetzelfde ticket aan. Dat is een risico om op te lossen, maar geen aanval. Daarom combineer je
        signalen: RC4 <em>en</em> veel verschillende diensten.</p>
        <h3>Wat je doet als je het ziet</h3>
        <ul>
          <li>Ga ervan uit dat de tickets buiten het netwerk zijn. Je kunt ze niet terughalen.</li>
          <li>Vervang de wachtwoorden van de aangevraagde serviceaccounts door lange willekeurige wachtwoorden, of beter:
          zet ze om naar een gMSA (zie taak 6). Begin bij de accounts met de meeste rechten.</li>
          <li>Onderzoek het aanvragende account en de werkplek: die zijn waarschijnlijk zelf al overgenomen.</li>
        </ul>
        <div class="callout tip"><strong>Valstrik voor de aanvaller:</strong> maak een serviceaccount met een SPN dat
        door niets wordt gebruikt (een <em>honeypot-account</em>). Elke 4769 voor dat account is per definitie
        verdacht.</div>
      `,
      lab: {
        type: 'logs',
        title: 'DC01 Security-log, 2026-11-10 13:00-14:30, alleen 4769 (vereenvoudigd)',
        lines: `2026-11-10 13:02:10 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 13:05:33 DC01 4769 Account=r.jansen@HOEKSTRA.NM.LAB Service=MAIL01$ Client=10.20.4.19 Result=0x0 TicketEnc=0x12
2026-11-10 13:10:02 DC01 4769 Account=scan-kopieer@HOEKSTRA.NM.LAB Service=NAS-OUD$ Client=10.20.9.5 Result=0x0 TicketEnc=0x17
2026-11-10 13:14:20 DC01 4769 Account=h.kramer@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.4.23 Result=0x0 TicketEnc=0x12
2026-11-10 13:20:45 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=svc-crm Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 13:31:09 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.4.37 Result=0x0 TicketEnc=0x12
2026-11-10 13:31:15 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=MAIL01$ Client=10.20.4.37 Result=0x0 TicketEnc=0x12
2026-11-10 13:38:40 DC01 4769 Account=h.kramer@HOEKSTRA.NM.LAB Service=svc-crm Client=10.20.4.23 Result=0x0 TicketEnc=0x12
2026-11-10 13:42:01 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=svc-sql01 Client=10.20.4.37 Result=0x0 TicketEnc=0x17
2026-11-10 13:42:03 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=svc-crm Client=10.20.4.37 Result=0x0 TicketEnc=0x17
2026-11-10 13:42:04 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=svc-web Client=10.20.4.37 Result=0x0 TicketEnc=0x17
2026-11-10 13:42:06 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=svc-scan Client=10.20.4.37 Result=0x0 TicketEnc=0x17
2026-11-10 13:42:07 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=svc-print Client=10.20.4.37 Result=0x0 TicketEnc=0x17
2026-11-10 13:42:09 DC01 4769 Account=m.dewit@HOEKSTRA.NM.LAB Service=svc-hr-app Client=10.20.4.37 Result=0x0 TicketEnc=0x17
2026-11-10 13:44:30 DC01 4769 Account=r.jansen@HOEKSTRA.NM.LAB Service=PRINT01$ Client=10.20.4.19 Result=0x0 TicketEnc=0x12
2026-11-10 13:51:12 DC01 4769 Account=svc-monitor@HOEKSTRA.NM.LAB Service=SQL01$ Client=10.20.1.40 Result=0x0 TicketEnc=0x12
2026-11-10 13:51:13 DC01 4769 Account=svc-monitor@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.1.40 Result=0x0 TicketEnc=0x12
2026-11-10 13:51:13 DC01 4769 Account=svc-monitor@HOEKSTRA.NM.LAB Service=MAIL01$ Client=10.20.1.40 Result=0x0 TicketEnc=0x12
2026-11-10 13:58:02 DC01 4769 Account=a.visser@HOEKSTRA.NM.LAB Service=PRINT01$ Client=10.20.4.12 Result=0x0 TicketEnc=0x12
2026-11-10 14:10:02 DC01 4769 Account=scan-kopieer@HOEKSTRA.NM.LAB Service=NAS-OUD$ Client=10.20.9.5 Result=0x0 TicketEnc=0x17
2026-11-10 14:22:18 DC01 4769 Account=h.kramer@HOEKSTRA.NM.LAB Service=MAIL01$ Client=10.20.4.23 Result=0x0 TicketEnc=0x12`,
      },
      questions: [
        { q: 'Welk account vraagt in korte tijd tickets aan voor een reeks serviceaccounts?', answer: ['m.dewit', 'dewit', 'de wit'],
          hints: ['Zoek een moment waarop veel 4769 binnen enkele seconden staan.', 'Filter op 0x17 en kijk wie er naast scan-kopieer opduikt.', 'Rond 13:42, vanaf 10.20.4.37.'],
          wrong: { 'svc-monitor': 'svc-monitor vraagt drie tickets aan, alle drie voor computeraccounts en met AES. Dat is een monitoringdienst die zijn rondje doet.', 'scan-kopieer': 'scan-kopieer gebruikt RC4, maar steeds voor dezelfde ene dienst.' },
          why: 'Het raden van het wachtwoord gebeurt buiten het netwerk en laat niets achter. Wie dit moment in de 4769-gebeurtenissen mist, ziet de aanval pas als het serviceaccount wordt misbruikt.',
          explain: 'm.dewit vraagt om 13:42 binnen acht seconden zes RC4-tickets aan voor serviceaccounts, vanaf 10.20.4.37. Een half uur eerder gebruikte hetzelfde account nog AES voor de bestandsserver en de mail.' },
        { q: 'Voor hoeveel verschillende serviceaccounts kreeg dat account een RC4-ticket?', answer: ['6', 'zes'],
          hints: ['Filter op m.dewit.', 'Tel alleen de regels met TicketEnc=0x17.', 'Van svc-sql01 tot en met svc-hr-app.'],
          wrong: { '8': 'Je telt ook FS01$ en MAIL01$ mee. Die zijn met AES en horen bij normaal gebruik.', '7': 'Tel nog eens: van 13:42:01 tot en met 13:42:09.' },
          explain: 'Zes: svc-sql01, svc-crm, svc-web, svc-scan, svc-print en svc-hr-app. Al deze wachtwoorden moeten worden vervangen.' },
        { q: 'Welk account vraagt ook RC4-tickets aan, maar past niet in het patroon van kerberoasting?', answer: ['scan-kopieer'],
          hints: ['Filter op 0x17 en kijk wie er nog meer staat.', 'Vraagt dit account veel verschillende diensten aan?', 'Een oud apparaat dat steeds dezelfde NAS gebruikt.'],
          wrong: { 'svc-monitor': 'svc-monitor gebruikt AES. Het past niet in een filter op RC4.' },
          explain: 'scan-kopieer vraagt twee keer per middag hetzelfde ticket aan voor NAS-OUD$. Waarschijnlijk ondersteunt dat apparaat alleen RC4: een risico voor de lijst met verbeteringen, geen aanval.' },
        { q: 'Wat is de belangrijkste herstelstap voor de zes serviceaccounts?', options: ['Hun wachtwoorden vervangen door lange willekeurige wachtwoorden of de accounts omzetten naar gMSA, te beginnen bij het account met de meeste rechten', 'Wachten op mislukte aanmeldingen op die accounts, want dan weet je of het raden gelukt is', 'Alleen het account m.dewit blokkeren', 'Op de domeincontroller meteen alle RC4 uitzetten en verder niets'], answer: 0,
          wrong: { 1: 'Het raden gebeurt buiten het netwerk. Je krijgt geen mislukte aanmelding te zien, alleen straks een geslaagde.', 2: 'Dat stopt nieuwe aanvragen, maar de tickets die al buiten zijn, blijven te kraken.', 3: 'Dat breekt de NAS van scan-kopieer, en de tickets die al zijn uitgegeven blijven te kraken. RC4 uitfaseren is goed, maar gepland en naast het vervangen van de wachtwoorden.' },
          explain: 'Een ticket dat buiten is, kun je niet terughalen. Je maakt het waardeloos door het wachtwoord erachter te vervangen.' },
      ],
    },

    {
      title: 'Taak 3: Een detectieregel voor kerberoasting',
      tryFirst: true,
      intro: '<p>Het SOC van Hoekstra wil een regel die kerberoasting vangt zonder elke dag over de oude NAS of de monitoringdienst te alarmeren. In het lab staan tien samengevatte aanvragen uit de afgelopen week. Bouw een regel met alle drie de aanvallen en nul vals-positieven.</p>',
      content: `
        <p>Een SIEM kijkt zelden naar losse 4769-regels. Het telt per aanvrager in een tijdvenster: hoeveel
        verschillende diensten, met welke versleuteling, vanaf welke bron. In het lab is dat al gedaan. Elke regel is
        één aanvrager in een venster van tien minuten, met het aantal verschillende diensten
        (<code>DienstenPer10Min</code>) en de versleuteling die het vaakst voorkwam.</p>
        <h3>Twee soorten fouten</h3>
        <ul>
          <li><strong>Vals-positief</strong> (FP): de regel slaat aan op iets onschuldigs. Te veel FP's en het SOC gaat
          de regel negeren.</li>
          <li><strong>Vals-negatief</strong> (FN): de regel mist een aanval. Een regel met veel FN's geeft schijnzekerheid.</li>
        </ul>
        <p>Een goede regel beschrijft het gedrag van de aanval, niet een detail van één keer. "Alles vanaf werkplek
        WS-0437" vangt vandaag de aanvaller en morgen niets meer. "RC4 en meer dan een paar diensten tegelijk" blijft
        werken als de aanvaller een andere werkplek gebruikt.</p>
        <h3>Wat je erbij zet</h3>
        <p>Een regel heeft in de praktijk ook een beschrijving, een ernst, de koppeling met ATT&amp;CK (T1558.003) en
        een lijst bekende uitzonderingen. Een uitzondering zet je zo smal mogelijk: niet "alles van scan-kopieer", maar
        "scan-kopieer naar NAS-OUD$ met RC4", en met een einddatum waarop de NAS vervangen moet zijn.</p>
        <div class="callout tip"><strong>Werkwijze:</strong> begin met één voorwaarde, lees TP en FP af, en voeg dan een
        tweede voorwaarde toe die precies de vals-positieven uitsluit. De voorwaarden worden met EN gecombineerd.</div>
      `,
      lab: {
        type: 'detectrule',
        title: 'Service-ticketaanvragen per aanvrager per 10 minuten',
        scenario: 'Hoekstra (fictief) gebruikt AES voor alle moderne systemen. Bekende uitzondering: de oude NAS ondersteunt alleen RC4. De monitoringdienst svc-monitor controleert elke tien minuten alle servers.',
        fields: ['Account', 'Bron', 'TicketEnc', 'DienstenPer10Min'],
        events: [
          { label: 'a.visser begint de werkdag', malicious: false, fields: { Account: 'a.visser', Bron: '10.20.4.12', TicketEnc: '0x12', DienstenPer10Min: 3 } },
          { label: 'scan-kopieer gebruikt de oude NAS', malicious: false, fields: { Account: 'scan-kopieer', Bron: '10.20.9.5', TicketEnc: '0x17', DienstenPer10Min: 1 } },
          { label: 'm.dewit vraagt tickets aan voor zes serviceaccounts', malicious: true, fields: { Account: 'm.dewit', Bron: '10.20.4.37', TicketEnc: '0x17', DienstenPer10Min: 6 } },
          { label: 'svc-monitor doet zijn controlerondje', malicious: false, fields: { Account: 'svc-monitor', Bron: '10.20.1.40', TicketEnc: '0x12', DienstenPer10Min: 12 } },
          { label: 'h.kramer opent CRM en bestanden', malicious: false, fields: { Account: 'h.kramer', Bron: '10.20.4.23', TicketEnc: '0x12', DienstenPer10Min: 2 } },
          { label: 'Oude boekhoudapplicatie met RC4 naar twee servers', malicious: false, fields: { Account: 'app-boekhouding', Bron: '10.20.2.15', TicketEnc: '0x17', DienstenPer10Min: 2 } },
          { label: 'Overgenomen account j.bos vraagt negen serviceaccounts aan', malicious: true, fields: { Account: 'j.bos', Bron: '10.20.4.52', TicketEnc: '0x17', DienstenPer10Min: 9 } },
          { label: 'gmsa-backup$ maakt de nachtelijke back-up', malicious: false, fields: { Account: 'gmsa-backup$', Bron: '10.20.1.30', TicketEnc: '0x12', DienstenPer10Min: 3 } },
          { label: 'Aanvaller vanaf de vergaderzaal-pc vraagt vier serviceaccounts aan', malicious: true, fields: { Account: 'vergader-03', Bron: '10.20.7.3', TicketEnc: '0x17', DienstenPer10Min: 4 } },
          { label: 'r.jansen print en mailt', malicious: false, fields: { Account: 'r.jansen', Bron: '10.20.4.19', TicketEnc: '0x12', DienstenPer10Min: 2 } },
        ],
        solution: [{ field: 'TicketEnc', op: 'is', value: '0x17' }, { field: 'DienstenPer10Min', op: '>', value: '3' }],
        flag: 'NM{rc4_en_veel_diensten}',
      },
      questions: [
        { q: 'Test eerst alleen de voorwaarde TicketEnc is 0x17. Hoeveel vals-positieven geeft die?', answer: ['2', 'twee'],
          hints: ['Zet één voorwaarde en lees FP af.', 'Welke onschuldige accounts gebruiken RC4?', 'Een NAS en een oude applicatie.'],
          wrong: { '5': 'Dat is het totaal aantal treffers. Gevraagd is het aantal onschuldige.', '1': 'Naast scan-kopieer gebruikt nog een oude applicatie RC4.' },
          explain: 'Twee: scan-kopieer en app-boekhouding. Ze gebruiken RC4 voor één of twee vaste diensten.' },
        { q: 'Welk account geeft vals alarm als je alleen op DienstenPer10Min groter dan 3 let?', answer: ['svc-monitor'],
          hints: ['Vervang de eerste voorwaarde door een op het aantal diensten.', 'Welk onschuldig account praat met veel diensten?', 'De controlerondjes.'],
          wrong: { 'gmsa-backup$': 'gmsa-backup$ vraagt drie diensten aan. Groter dan 3 slaat daar niet op aan.' },
          explain: 'svc-monitor vraagt elke tien minuten tickets aan voor twaalf servers, met AES. Veel diensten alleen is dus ook geen bewijs.' },
        { q: 'Bouw een regel met TP 3 en FP 0. Welke vlag verschijnt?', answer: ['NM{rc4_en_veel_diensten}'],
          hints: ['Combineer de twee voorwaarden die je net los hebt getest.', 'TicketEnc is 0x17 ...', '... EN DienstenPer10Min > 3.'],
          wrong: { '/bron/i': 'Een regel op een bron-IP vangt alleen deze ene aanvaller, en mist de volgende.' },
          explain: 'RC4 en meer dan drie verschillende diensten per tien minuten. Elk signaal los geeft vals alarm, samen beschrijven ze het gedrag.' },
        { q: 'Het SOC wil scan-kopieer uitsluiten. Welke uitzondering is het best?', options: ['Alleen de combinatie scan-kopieer, dienst NAS-OUD$ en RC4 uitsluiten, met een einddatum voor de vervanging van de NAS', 'Het account scan-kopieer helemaal uitsluiten van alle Kerberos-regels', 'Alle aanvragen met RC4 uitsluiten zolang de NAS er staat', 'Geen uitzondering: de regel slaat toch niet aan op scan-kopieer'], answer: 0,
          wrong: { 1: 'Als dat account wordt overgenomen, ziet niemand het meer.', 2: 'Dan vang je geen enkele kerberoasting met RC4 meer.', 3: 'Met de combinatieregel klopt dat, maar een andere regel, zoals een alarm op elke RC4-aanvraag, slaat wel aan. Een smalle uitzondering met einddatum houdt het overzicht.' },
          explain: 'Uitzonderingen zo smal mogelijk en met een einddatum. Anders groeit de lijst met blinde vlekken.' },
      ],
    },

    {
      title: 'Taak 4: Password spraying in de logs',
      tryFirst: true,
      intro: '<p>In de nacht van 10 op 11 november ziet DC01 een golf mislukte aanmeldingen, en de RDS-server krijgt er ook een paar. In het lab staan beide. Zoek het adres van de spray, tel hoeveel accountnamen het probeerde en bepaal welk account waarschijnlijk is overgenomen.</p>',
      content: `
        <p>Bij <strong>brute force</strong> probeert een aanvaller veel wachtwoorden op één account. Dat loopt snel tegen
        een vergrendeling (<em>account lockout</em>) aan. Bij <strong>password spraying</strong> (ATT&amp;CK
        T1110.003) draait hij het om: één of twee veelgebruikte wachtwoorden, zoals een seizoen met een jaartal, op
        heel veel accounts. Per account blijft het aantal pogingen onder de drempel, dus niemand wordt vergrendeld en de
        helpdesk krijgt geen telefoontjes. Eén zwak wachtwoord in een organisatie van duizend mensen is genoeg.</p>
        <h3>Waar je het ziet</h3>
        <table>
          <thead><tr><th>Gebeurtenis</th><th>Waar</th><th>Wat het betekent</th></tr></thead>
          <tbody>
            <tr><td>4771, foutcode <code>0x18</code></td><td>Domeincontroller</td><td>Kerberos-pre-authenticatie mislukt: fout wachtwoord voor een bestaand account.</td></tr>
            <tr><td>4768, resultaat <code>0x6</code></td><td>Domeincontroller</td><td>TGT aangevraagd voor een naam die niet bestaat.</td></tr>
            <tr><td>4768, resultaat <code>0x0</code></td><td>Domeincontroller</td><td>TGT uitgegeven: de aanmelding is gelukt.</td></tr>
            <tr><td>4625</td><td>De machine waar de aanmelding mislukte</td><td>Mislukte aanmelding, bijvoorbeeld op een server waar iemand via RDP of NTLM probeert in te loggen. Het veld met de substatus zegt waarom, bijvoorbeeld <code>0xC000006A</code> voor een fout wachtwoord.</td></tr>
          </tbody>
        </table>
        <h3>Het patroon</h3>
        <ul>
          <li>Eén bron, veel <em>verschillende</em> accounts, elk één of twee pogingen, in een kort venster.</li>
          <li>Namen die niet bestaan ertussen (<code>admin</code>, <code>test</code>): de aanvaller gokt ook naar namen.</li>
          <li>Vaak herhaald in rondes, met tussenpozen die langer zijn dan de resettijd van de lockoutteller.</li>
          <li>Het belangrijkste: <strong>een geslaagde aanmelding vanaf dezelfde bron</strong>, midden in of direct na de
          reeks. Dat account is waarschijnlijk geraden.</li>
        </ul>
        <p>Een reeks mislukkingen op één account vanaf één bron is het omgekeerde patroon: brute force. Een reeks
        mislukkingen van één gebruiker vanaf zijn eigen werkplek, gevolgd door succes, is meestal gewoon een typefout.</p>
        <div class="callout warn"><strong>Let op:</strong> lockout per account helpt niet tegen spraying. Wat wel helpt:
        een lijst met verboden wachtwoorden (geen seizoen-plus-jaartal), MFA op alles wat van buiten bereikbaar is,
        en een detectie die per bron telt hoeveel verschillende accounts mislukken.</div>
      `,
      lab: {
        type: 'logs',
        title: 'DC01 en RDS01 Security-log, 2026-11-11 (vereenvoudigd)',
        lines: `2026-11-11 02:10:03 DC01 4771 Account=a.visser Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:05 DC01 4771 Account=r.jansen Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:08 DC01 4768 Account=admin Client=10.20.6.21 Result=0x6
2026-11-11 02:10:10 DC01 4771 Account=h.kramer Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:13 DC01 4771 Account=m.dewit Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:15 DC01 4771 Account=j.meijer Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:18 DC01 4768 Account=test Client=10.20.6.21 Result=0x6
2026-11-11 02:10:20 DC01 4771 Account=p.smit Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:23 DC01 4771 Account=k.bos Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:25 DC01 4771 Account=l.vos Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:28 DC01 4771 Account=s.yildiz Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:31 DC01 4768 Account=t.mulder Client=10.20.6.21 Result=0x0 TicketEnc=0x12
2026-11-11 02:10:33 DC01 4771 Account=e.bakker Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:36 DC01 4771 Account=n.claes Client=10.20.6.21 Failure=0x18
2026-11-11 02:10:38 DC01 4771 Account=d.smits Client=10.20.6.21 Failure=0x18
2026-11-11 02:13:02 DC01 4769 Account=t.mulder@HOEKSTRA.NM.LAB Service=FS01$ Client=10.20.6.21 Result=0x0 TicketEnc=0x12
2026-11-11 02:30:11 RDS01 4625 Account=administrator Source=203.0.113.45 Status=0xC000006D SubStatus=0xC000006A LogonType=10
2026-11-11 02:30:14 RDS01 4625 Account=administrator Source=203.0.113.45 Status=0xC000006D SubStatus=0xC000006A LogonType=10
2026-11-11 02:30:17 RDS01 4625 Account=administrator Source=203.0.113.45 Status=0xC000006D SubStatus=0xC000006A LogonType=10
2026-11-11 02:30:20 RDS01 4625 Account=administrator Source=203.0.113.45 Status=0xC000006D SubStatus=0xC000006A LogonType=10
2026-11-11 02:30:23 RDS01 4625 Account=administrator Source=203.0.113.45 Status=0xC000006D SubStatus=0xC000006A LogonType=10
2026-11-11 02:30:26 RDS01 4625 Account=administrator Source=203.0.113.45 Status=0xC000006D SubStatus=0xC000006A LogonType=10
2026-11-11 07:58:12 DC01 4771 Account=e.bakker Client=10.20.4.31 Failure=0x18
2026-11-11 07:58:20 DC01 4768 Account=e.bakker Client=10.20.4.31 Result=0x0 TicketEnc=0x12
2026-11-11 08:02:44 DC01 4768 Account=a.visser Client=10.20.4.12 Result=0x0 TicketEnc=0x12`,
      },
      questions: [
        { q: 'Vanaf welk IP-adres komt de password spray?', answer: ['10.20.6.21'],
          hints: ['Zoek een bron met mislukkingen op veel verschillende accounts.', 'Filter op 4771 en kijk naar Client.', 'Een intern adres, rond 02:10.'],
          wrong: { '203.0.113.45': 'Dat adres probeert steeds hetzelfde account op RDS01: dat is brute force, geen spraying.', '10.20.4.31': 'Dat is e.bakker die zich om 07:58 eenmaal vertypt op zijn eigen werkplek.' },
          explain: '10.20.6.21. Binnen 35 seconden mislukken daar aanmeldingen op een lange reeks accounts, elk één keer.' },
        { q: 'Hoeveel verschillende accountnamen probeert dat adres tussen 02:10 en 02:11, bestaand en niet-bestaand?', answer: ['15', 'vijftien'],
          hints: ['Filter op 10.20.6.21.', 'Tel 4771 en 4768, maar niet de 4769 van later.', 'Twaalf mislukkingen op bestaande accounts, twee niet-bestaande namen en één geslaagde.'],
          wrong: { '12': 'Je telt alleen de 4771. Ook de namen die niet bestaan (resultaat 0x6) en het account dat wel lukte, zijn geprobeerd.', '14': 'Vergeet het account niet waarbij het wel lukte.', '16': 'De 4769 om 02:13 is een gevolg, geen poging.' },
          explain: 'Vijftien namen: twaalf met 0x18, admin en test met 0x6, en t.mulder met succes.' },
        { q: 'Welk account is waarschijnlijk overgenomen?', answer: ['t.mulder', 'mulder'],
          hints: ['Zoek een geslaagde aanmelding vanaf het adres van de spray.', 'Een 4768 met resultaat 0x0 midden in de reeks.', 'Kijk ook wat er twee minuten later gebeurt.'],
          wrong: { 'e.bakker': 'e.bakker wordt in de spray geprobeerd en mislukt. Zijn geslaagde aanmelding om 07:58 komt van zijn eigen werkplek.', 'administrator': 'Op RDS01 mislukken alle pogingen op administrator.' },
          why: 'Bij spraying zijn de honderden mislukkingen ruis. Het signaal is die ene geslaagde aanmelding vanaf dezelfde bron, en die zie je alleen als je verder kijkt dan de lijst met fouten.',
          explain: 't.mulder krijgt om 02:10:31 een TGT vanaf 10.20.6.21 en vraagt om 02:13 een ticket aan voor de bestandsserver. Account uitschakelen, sessies intrekken, wachtwoord vervangen en nagaan wat er op FS01 gebeurde.' },
        { q: 'Wat beschrijft de reeks op RDS01 het best?', options: ['Brute force: veel pogingen met een fout wachtwoord op één account vanaf één extern adres', 'Password spraying: één wachtwoord op veel accounts', 'Kerberoasting: tickets aanvragen voor serviceaccounts', 'Een gebruiker die zijn wachtwoord vergeten is'], answer: 0,
          wrong: { 1: 'Het is steeds hetzelfde account. Spraying gaat breed over veel accounts.', 2: 'Kerberoasting staat in 4769 op de domeincontroller en geeft geen mislukte aanmeldingen.', 3: 'Een medewerker probeert het niet om half drie \'s nachts vanaf een extern adres, zes keer in vijftien seconden, op administrator.' },
          explain: 'Zes keer 4625 met substatus 0xC000006A (fout wachtwoord) op administrator vanaf 203.0.113.45: brute force via RDP. RDS01 hoort niet zonder MFA of gateway open te staan naar internet.' },
      ],
    },

    {
      title: 'Taak 5: Bevoorrechte groepen en het tiermodel',
      tryFirst: true,
      intro: '<p>Na de spray en de kerberoasting wil Hoekstra weten wie er eigenlijk domeinbeheerder is. In het lab staat een export van de bevoorrechte groepen en de aanmeldingen van beheeraccounts. Zoek wie er niet hoort, wie hem toevoegde en vanaf welke machine, en welk beheeraccount zich op een gewone werkplek aanmeldde.</p>',
      content: `
        <p>Een paar groepen in Active Directory geven, direct of via een omweg, de macht over het hele domein. Wie lid
        is, kan elk account overnemen, beleid naar alle machines sturen en sporen wissen.</p>
        <table>
          <thead><tr><th>Groep</th><th>Waarom gevaarlijk</th></tr></thead>
          <tbody>
            <tr><td>Domain Admins, Enterprise Admins, Administrators</td><td>Volledige controle over het domein (Enterprise Admins: over het hele forest).</td></tr>
            <tr><td>Schema Admins</td><td>Mag het schema van AD wijzigen. Hoort vrijwel altijd leeg te zijn en alleen tijdelijk gevuld voor een schemawijziging.</td></tr>
            <tr><td>Backup Operators</td><td>Mag bestanden lezen ongeacht de rechten, ook op domeincontrollers, en kan zo bij de AD-database.</td></tr>
            <tr><td>Account Operators, Server Operators, Print Operators</td><td>Oude ingebouwde groepen met verrassend veel rechten op domeincontrollers of accounts. Microsoft raadt aan ze leeg te laten en rechten gericht te delegeren.</td></tr>
          </tbody>
        </table>
        <p>Een toevoeging aan een beveiligingsgroep met globaal bereik, zoals Domain Admins, staat op de
        domeincontroller als gebeurtenis <strong>4728</strong> (<em>A member was added to a security-enabled global
        group</em>). Elke 4728 voor een bevoorrechte groep verdient een alarm.</p>
        <h3>Tiering</h3>
        <p>Het tiermodel deelt systemen en accounts in naar de schade die ze kunnen aanrichten:</p>
        <ul>
          <li><strong>Tier 0:</strong> wat het domein beheert. Domeincontrollers, AD-beheeraccounts, en systemen die
          daar macht over hebben, zoals de certificaatautoriteit (AD CS) en de synchronisatieserver naar de cloud.</li>
          <li><strong>Tier 1:</strong> servers en applicaties.</li>
          <li><strong>Tier 2:</strong> werkplekken en gebruikers.</li>
        </ul>
        <p>De regel: <strong>een account uit een hogere tier meldt zich nooit aan op een systeem uit een lagere
        tier</strong>. Wie zich als domeinbeheerder interactief aanmeldt op een werkplek om een printerprobleem op te
        lossen, laat inloggegevens achter in het geheugen van die werkplek. Wordt die werkplek later overgenomen, dan
        ligt het domein voor het oprapen. Beheer van tier 0 gebeurt vanaf een speciale beheerwerkplek
        (<em>privileged access workstation</em>, PAW). Microsoft beschrijft dit tegenwoordig breder als het
        <em>enterprise access model</em>; het tiermodel is nog altijd de gangbare manier om erover te praten.</p>
        <p>In de aanmeldgebeurtenis 4624 zie je het aanmeldtype: 2 is interactief aan het toetsenbord, 3 is via het
        netwerk (bijvoorbeeld een share of een beheertool), 10 is via Extern bureaublad (RDP).</p>
        <div class="callout tip"><strong>Vuistregel:</strong> serviceaccounts horen niet in Domain Admins. Een dienst die
        dat "nodig heeft", heeft bijna altijd veel minder nodig. Zoek uit wat precies en delegeer alleen dat.</div>
      `,
      lab: {
        type: 'logs',
        title: 'Export bevoorrechte groepen en aanmeldingen beheeraccounts, 2026-11-12',
        lines: `GROEP Domain Admins (globaal)
  Administrator     ingebouwd account            laatste aanmelding 2025-03-02
  adm-kbos          beheeraccount K. Bos         laatste aanmelding 2026-11-11
  adm-pdekker       beheeraccount P. Dekker      laatste aanmelding 2026-11-10
  svc-sql01         serviceaccount SQL01         laatste aanmelding 2026-11-12
  j.meijer          gebruiker, afdeling Verkoop  laatste aanmelding 2026-11-12
GROEP Enterprise Admins (universeel)
  Administrator
GROEP Schema Admins (universeel)
  adm-kbos          lid sinds 2023-04-18
GROEP Backup Operators (domeinlokaal)
  svc-backup-oud    laatste aanmelding 2024-01-15
GROEP Account Operators (domeinlokaal)
  GG-Helpdesk       (6 leden)

GEBEURTENISSEN DC01, 2026-11-05 t/m 2026-11-12
2026-11-06 09:12:40 DC01 4624 Account=adm-kbos LogonType=10 Bron=PAW01 (10.20.0.50)
2026-11-07 14:03:18 WS-0412 4624 Account=adm-kbos LogonType=2 (aan het toetsenbord van de werkplek)
2026-11-07 14:30:02 WS-0412 4634 Account=adm-kbos afgemeld
2026-11-09 23:46:58 DC01 4624 Account=adm-pdekker LogonType=3 Bron=WS-0437 (10.20.4.37)
2026-11-09 23:47:12 DC01 4728 Groep=Domain Admins Lid=j.meijer Door=adm-pdekker Bron=10.20.4.37
2026-11-10 10:20:31 DC01 4624 Account=adm-pdekker LogonType=10 Bron=PAW01 (10.20.0.50)
2026-11-11 08:40:05 DC01 4624 Account=adm-kbos LogonType=10 Bron=PAW01 (10.20.0.50)`,
      },
      questions: [
        { q: 'Welk gewoon gebruikersaccount is lid van Domain Admins?', answer: ['j.meijer', 'meijer'],
          hints: ['Kijk naar de leden van Domain Admins en hun omschrijving.', 'Geen beheeraccount, geen serviceaccount, niet ingebouwd.', 'Iemand van Verkoop.'],
          wrong: { 'svc-sql01': 'Dat is ook een probleem, maar het is een serviceaccount. Gevraagd is een gewoon gebruikersaccount.' },
          explain: 'j.meijer, een medewerker van Verkoop. Met dit account wordt gemaild en gesurft, en het heeft nu domeinrechten.' },
        { q: 'Vanaf welke werkplek werd dat lid toegevoegd? (hostnaam)', answer: ['WS-0437', 'ws-0437'],
          hints: ['Zoek de gebeurtenis voor een toevoeging aan een globale groep.', 'Kijk naar de bron van de 4728 en zoek de aanmelding die erbij hoort.', 'Het adres eindigt op .37.'],
          wrong: { 'PAW01': 'PAW01 is de afgesproken beheerwerkplek. De toevoeging kwam daar niet vandaan.', 'DC01': 'DC01 registreert de gebeurtenis. De bron is een andere machine.' },
          why: 'Hetzelfde adres vroeg in taak 2 als m.dewit RC4-tickets aan. Losse signalen uit verschillende logs vormen samen een aanvalsketen: dit is het moment om het incidentresponsplan te starten.',
          explain: 'WS-0437 (10.20.4.37). Om 23:46 meldt adm-pdekker zich vanaf die werkplek aan op DC01, buiten de PAW om, en voegt een kwartier voor middernacht j.meijer toe aan Domain Admins.' },
        { q: 'Welk beheeraccount meldde zich interactief aan op een gewone werkplek, in strijd met het tiermodel?', answer: ['adm-kbos'],
          hints: ['Zoek een 4624 die niet op DC01 staat.', 'Aanmeldtype 2 betekent aan het toetsenbord.', 'Op WS-0412, op 7 november.'],
          wrong: { 'adm-pdekker': 'adm-pdekker gebruikt een verkeerde bron, maar meldt zich aan op de domeincontroller, niet op een werkplek.' },
          explain: 'adm-kbos op WS-0412 met aanmeldtype 2. Een tier 0-account dat inloggegevens achterlaat op een tier 2-werkplek. Oplossen met een apart tier 2-beheeraccount voor de helpdesk en een aanmeldbeperking (bijvoorbeeld via een beleid dat tier 0-accounts weigert op werkplekken).' },
        { q: 'Wat doe je met het lidmaatschap van adm-kbos in Schema Admins?', options: ['Verwijderen; de groep blijft leeg en wordt alleen tijdelijk gevuld als er een schemawijziging gepland is', 'Laten staan, want adm-kbos is een beheeraccount', 'Vervangen door de groep GG-Helpdesk', 'Laten staan en alleen het wachtwoord van adm-kbos vervangen'], answer: 0,
          wrong: { 1: 'Ook een beheeraccount krijgt niet meer rechten dan het nodig heeft. Schemawijzigingen zijn zeldzaam.', 2: 'Dan krijgen zes helpdeskmedewerkers schemarechten. Precies het tegenovergestelde.', 3: 'Een nieuw wachtwoord verandert niets aan de overbodige rechten.' },
          explain: 'Permanent lidmaatschap van Schema Admins sinds 2023 is een vergeten tijdelijke toekenning. Leegmaken, en een 4728 of vergelijkbaar alarm op elke toevoeging.' },
      ],
    },

    {
      title: 'Taak 6: Hardening: serviceaccounts, Protected Users en LAPS',
      tryFirst: true,
      intro: '<p>Hoekstra krijgt een week om AD te versterken. In het lab staat de inventaris van serviceaccounts, beheeraccounts en werkplekken. Zoek wat er mis is in Protected Users, hoeveel werkplekken hetzelfde lokale beheerderswachtwoord delen, en welk serviceaccount als eerste moet worden aangepakt.</p>',
      content: `
        <p>Detectie vertelt je wat er gebeurt. Hardening zorgt dat het minder vaak gebeurt, en dat een geslaagde stap
        minder oplevert. Vier maatregelen hebben de meeste invloed.</p>
        <h3>Serviceaccounts: gMSA en AES</h3>
        <p>Een <strong>group Managed Service Account</strong> (gMSA) is een serviceaccount waarvan Windows zelf het
        wachtwoord beheert: lang, willekeurig en automatisch gewijzigd. Niemand kent het, en kerberoasting levert niets
        op omdat het niet te raden is. Kan een dienst geen gMSA gebruiken, geef het account dan een lang willekeurig
        wachtwoord uit een kluis, sta alleen AES toe (via het attribuut <code>msDS-SupportedEncryptionTypes</code>) en
        geef het niet meer rechten dan de dienst nodig heeft. Haal SPN's weg die niet meer gebruikt worden.</p>
        <h3>Protected Users</h3>
        <p>De groep <strong>Protected Users</strong> (sinds Windows Server 2012 R2) zet voor haar leden strengere
        regels aan. Onder meer: geen NTLM-aanmelding, geen DES of RC4 bij de Kerberos-aanmelding, geen delegatie, geen
        lokaal opgeslagen inloggegevens om offline mee aan te melden, en een TGT dat maar vier uur geldig is. Dat maakt
        het lastiger om gestolen inloggegevens te hergebruiken. Zet er beheeraccounts in. Microsoft is duidelijk dat
        <strong>accounts voor diensten en computers er niet in horen</strong>: die gaan stuk op de beperkingen. Test
        eerst met één account, want oude applicaties die NTLM nodig hebben, werken daarna niet meer voor dat account.</p>
        <h3>Windows LAPS</h3>
        <p>Op veel netwerken heeft het lokale beheerdersaccount op elke werkplek hetzelfde wachtwoord, omdat het ooit in
        het image is gezet. Wie het van één werkplek buitmaakt, is beheerder op allemaal. <strong>Windows LAPS</strong>
        (sinds april 2023 ingebouwd in ondersteunde versies van Windows) geeft elke machine een eigen willekeurig
        wachtwoord, wijzigt het periodiek en bewaart het in AD of Microsoft Entra ID, leesbaar voor alleen wie het
        nodig heeft.</p>
        <h3>Wachtwoordbeleid en tiering</h3>
        <p>Een lang minimum en een lijst met verboden wachtwoorden helpen meer dan een verplichte wijziging elke negentig
        dagen; dat is ook de lijn van NIST SP 800-63B. Met <em>fine-grained password policies</em> geef je beheer- en
        serviceaccounts strengere eisen dan de rest. En houd de tierregel uit taak 5 technisch af: beleid dat
        tier 0-accounts weigert op werkplekken en servers, en geen domeinbeheerder ooit op een werkplek.</p>
        <div class="callout info"><strong>Prioriteren:</strong> begin bij de combinatie van <em>bereikbaar</em> en
        <em>waardevol</em>. Een serviceaccount waarvoor al een ticket buiten is, met een oud wachtwoord en hoge rechten,
        gaat voor alles.</div>
      `,
      lab: {
        type: 'logs',
        title: 'hardening-inventaris-hoekstra-2026-11-12.txt',
        lines: `SERVICEACCOUNTS
naam            soort       SPN                                      groepen                    versleuteling   wachtwoord gewijzigd
svc-sql01       gebruiker   MSSQLSvc/sql01.hoekstra.nm.lab:1433      Domain Admins              RC4, AES        2017-03-14
svc-crm         gebruiker   HTTP/crm.hoekstra.nm.lab                 CRM-Servers-Beheer         RC4, AES        2021-06-02
svc-web         gebruiker   HTTP/intranet.hoekstra.nm.lab            Web-Servers-Beheer         RC4, AES        2026-02-10
svc-scan        gebruiker   HOST/scan01.hoekstra.nm.lab              Domain Users               RC4, AES        2019-11-20
svc-print       gebruiker   HOST/print01.hoekstra.nm.lab             Print-Beheer, Protected Users  RC4, AES    2018-05-07
svc-hr-app      gebruiker   HTTP/hr.hoekstra.nm.lab                  HR-App-Beheer              RC4, AES        2023-09-01
gmsa-backup$    gMSA        HOST/bak01.hoekstra.nm.lab               Backup-Beheer              AES             automatisch

BEHEERACCOUNTS
naam            tier   Protected Users
adm-kbos        0      ja
adm-pdekker     0      nee
adm-lvis        1      ja

LOKALE BEHEERDER OP WERKPLEKKEN
OU Werkplekken/Kantoor    214 machines   Windows LAPS aan, opslag in AD, rotatie 30 dagen
OU Werkplekken/Magazijn    38 machines   LAPS uit; wachtwoord ingesteld door image-script (hetzelfde op elke machine)
OU Werkplekken/Directie     9 machines   Windows LAPS aan, opslag in AD, rotatie 30 dagen`,
      },
      questions: [
        { q: 'Welk account staat in Protected Users terwijl het daar volgens Microsoft niet hoort?', answer: ['svc-print'],
          hints: ['Zoek Protected Users in de inventaris, ook buiten de lijst met beheeraccounts.', 'Wat voor soort accounts horen er volgens de uitleg niet in?', 'Een serviceaccount.'],
          wrong: { 'adm-kbos': 'Beheeraccounts horen juist wel in Protected Users.', 'adm-lvis': 'Beheeraccounts horen juist wel in Protected Users.' },
          explain: 'svc-print is een serviceaccount. Haal het eruit, geef het een lang wachtwoord en sta alleen AES toe, of zet het om naar een gMSA.' },
        { q: 'Welk tier 0-beheeraccount staat nog niet in Protected Users?', answer: ['adm-pdekker'],
          hints: ['Kijk naar de lijst met beheeraccounts.', 'Zoek de combinatie tier 0 en nee.', 'Dit account kwam ook in taak 5 voor.'],
          wrong: { 'adm-lvis': 'adm-lvis is tier 1 en staat er al in.' },
          explain: 'adm-pdekker. Juist dit account werd in taak 5 vanaf een werkplek gebruikt. Toevoegen aan Protected Users, en het wachtwoord vervangen.' },
        { q: 'Op hoeveel werkplekken deelt de lokale beheerder hetzelfde wachtwoord?', answer: ['38', 'achtendertig'],
          hints: ['Kijk in het laatste blok van de inventaris.', 'Zoek de OU zonder LAPS.', 'Het magazijn.'],
          wrong: { '214': 'Het kantoor heeft LAPS: elke machine een eigen wachtwoord.', '261': 'Je telt alle werkplekken. Alleen het magazijn heeft geen LAPS.' },
          explain: '38 machines in het magazijn. Eén buitgemaakt wachtwoord is beheer op alle 38. Windows LAPS ook daar aanzetten.' },
        { q: 'Je kunt vandaag één serviceaccount omzetten naar een gMSA. Kies het account waarvoor de aanvaller uit taak 2 al een RC4-ticket heeft en dat bij een geraden wachtwoord het snelst het hele domein oplevert.', answer: ['svc-sql01'],
          boss: true, xp: 25,
          hints: ['Neem uit taak 2 de lijst van accounts waarvoor m.dewit een RC4-ticket kreeg.', 'Leg die naast de groepen in de inventaris: welk account heeft domeinrechten?', 'Kijk ook naar de datum van de laatste wachtwoordwijziging.'],
          wrong: { 'gmsa-backup$': 'Dat is al een gMSA en er is in taak 2 geen ticket voor aangevraagd.', 'svc-print': 'svc-print heeft een oud wachtwoord, maar alleen printrechten.', 'svc-scan': 'svc-scan heeft een oud wachtwoord, maar alleen de rechten van een gewone gebruiker.', 'svc-hr-app': 'Gevoelige gegevens, maar geen domeinrechten. Er is een account met meer impact.' },
          why: 'Prioriteren is het combineren van wat de aanvaller al heeft met wat het hem oplevert. Een ticket voor een serviceaccount met een wachtwoord uit 2017 en lidmaatschap van Domain Admins is in feite een sleutel van het domein die al buiten ligt.',
          explain: 'svc-sql01: m.dewit kreeg er een RC4-ticket voor, RC4 is nog toegestaan, het wachtwoord is van 2017 en het account is lid van Domain Admins. Omzetten naar gMSA, uit Domain Admins halen en de rechten beperken tot wat SQL01 echt nodig heeft.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: herstel na een overgenomen domein',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Stel dat het bij Hoekstra misgaat: het wachtwoord van svc-sql01 wordt geraden en de aanvaller is
        domeinbeheerder. Wat dan? Het eerlijke antwoord is dat je een domein waarin een aanvaller volledige rechten had,
        niet meer volledig kunt vertrouwen. Hij kan accounts hebben aangemaakt, rechten verstopt in de toegangslijsten
        van objecten, groepsbeleid aangepast en zichzelf manieren gegeven om terug te komen. Herstel is daarom een
        project, geen knop.</p>
        <h3>Het krbtgt-account</h3>
        <p>Elke TGT in het domein is versleuteld en ondertekend met de sleutel van één speciaal account:
        <strong>krbtgt</strong>. Wie die sleutel heeft, bijvoorbeeld door de AD-database van een domeincontroller te
        kopiëren, kan zelf TGT's maken voor elk account, met elke groep en elke geldigheid. Dat heet een <em>golden
        ticket</em> (ATT&amp;CK T1558.001). Een wachtwoordreset van de gebruikers helpt daar niet tegen, want de
        domeincontroller vertrouwt elk ticket dat met de krbtgt-sleutel is gemaakt.</p>
        <p>De remedie is het krbtgt-wachtwoord wijzigen. Twee keer, omdat AD naast de huidige sleutel ook de vorige
        bewaart, zodat tickets die net zijn uitgegeven niet in één klap ongeldig worden. Na één reset werkt de oude
        sleutel dus nog. Tussen de twee resets wacht je tot de replicatie naar alle domeincontrollers klaar is en ten
        minste de maximale levensduur van een gebruikersticket voorbij is. Die staat standaard op 10 uur. Te snel
        achter elkaar resetten maakt ook de legitieme tickets van iedereen ongeldig, met storingen als gevolg.
        Microsoft publiceert hiervoor een script dat de stappen gecontroleerd uitvoert.</p>
        <h3>De rest van tier 0</h3>
        <ul>
          <li>Alle tier 0-accounts nieuwe wachtwoorden geven, ook serviceaccounts met hoge rechten.</li>
          <li>Leden van alle bevoorrechte groepen opnieuw vaststellen, niet alleen Domain Admins.</li>
          <li>Recent gewijzigd groepsbeleid, nieuwe accounts, nieuwe vertrouwensrelaties en geplande taken op
          domeincontrollers nalopen.</li>
          <li>Andere tier 0-systemen meenemen: de certificaatautoriteit, de synchronisatie naar de cloud, back-upsystemen
          die domeincontrollers kunnen terugzetten.</li>
        </ul>
        <p>Bij een diepe compromittering kiezen organisaties soms voor een nieuw forest waarnaar ze gecontroleerd
        migreren. Dat is duur, maar soms goedkoper dan blijven twijfelen. Hoe dan ook: de aanpak uit deze room
        (detectie op 4769 en 4728, tiering, gMSA, Protected Users en LAPS) is wat voorkomt dat je hier terechtkomt.</p>
      `,
      questions: [
        { q: 'De eerste reset van het krbtgt-wachtwoord gebeurt om 09:00 en de replicatie is om 09:20 klaar. De maximale levensduur van een gebruikersticket staat op de standaardwaarde. Vanaf hoe laat mag de tweede reset op zijn vroegst? (UU:MM)', answer: ['19:00', '19.00', '1900'],
          hints: ['Er gelden twee voorwaarden: replicatie klaar, en de maximale levensduur van een ticket voorbij.', 'Wat is de standaard maximale levensduur van een gebruikersticket?', 'Tien uur na de eerste reset.'],
          wrong: { '09:20': 'De replicatie is klaar, maar tickets die vlak voor 09:00 zijn uitgegeven, zijn nog tien uur geldig.', '19:20': 'De tien uur tellen vanaf de reset, niet vanaf het einde van de replicatie. Die was al ruim op tijd klaar.' },
          explain: 'Om 19:00. Dan is de replicatie allang klaar en zijn alle tickets van vóór de eerste reset verlopen.' },
        { q: 'Een beheerder reset het krbtgt-wachtwoord één keer en verklaart het incident gesloten. Waarom kan een golden ticket van de aanvaller dan nog steeds werken?', options: ['AD bewaart naast de nieuwe sleutel ook de vorige, dus tickets die met de oude sleutel zijn gemaakt, worden nog geaccepteerd', 'Een golden ticket gebruikt het wachtwoord van de gebruiker, niet krbtgt', 'Een reset werkt pas na een herstart van alle werkplekken', 'Golden tickets zijn met RC4 versleuteld en RC4 wordt niet door een reset geraakt'], answer: 0,
          wrong: { 1: 'Een golden ticket is juist gemaakt met de krbtgt-sleutel. Daarom helpen wachtwoordresets van gebruikers niet.', 2: 'De domeincontroller controleert tickets met de sleutels die hij heeft. Werkplekken herstarten verandert daar niets aan.', 3: 'Het versleutelingstype is niet de reden. Het gaat om welke sleutels de domeincontroller nog accepteert.' },
          explain: 'Na één reset is de oude sleutel de vorige sleutel, en die wordt nog geaccepteerd. Pas na de tweede reset is hij weg.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>In CySA+, GCIH en vergelijkbare examens komt Active Directory meestal voor als een logfragment of een korte
        beschrijving van wat een analist ziet, met de vraag welke techniek het is of welke maatregel het beste helpt.
        De afleiders zijn andere AD-technieken die op elkaar lijken: brute force tegenover spraying, kerberoasting
        tegenover een golden ticket, of een maatregel die op het verkeerde account werkt.</p>
        <h3>Waar je op let</h3>
        <ul>
          <li><strong>Wie mislukt er, en hoeveel:</strong> veel accounts met één poging is spraying, één account met veel
          pogingen is brute force.</li>
          <li><strong>Welke gebeurtenis:</strong> mislukte aanmeldingen wijzen op raden naar wachtwoorden; een reeks
          geslaagde 4769 met RC4 wijst op kerberoasting.</li>
          <li><strong>Voor wie de maatregel is:</strong> Protected Users is voor mensen met hoge rechten, gMSA voor
          diensten, LAPS voor lokale beheerders.</li>
        </ul>
        <p>Warm op met het lab: groepeer de zestien begrippen in vier groepen van vier. De vijf vragen eronder zijn zelf
        geschreven in examenstijl. Alle organisaties zijn fictief.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien begrippen in vier groepen van vier.',
        groups: [
          { name: 'Maatregelen tegen kerberoasting', items: ['gMSA', 'Alleen AES toestaan', 'Lang willekeurig wachtwoord', 'Honeypot-SPN'] },
          { name: 'Gevolgen van lidmaatschap van Protected Users', items: ['Geen NTLM', 'Geen delegatie', 'TGT vier uur geldig', 'Geen offline aanmelding'] },
          { name: 'Bevoorrechte groepen', items: ['Domain Admins', 'Enterprise Admins', 'Schema Admins', 'Backup Operators'] },
          { name: 'Tier 0-systemen', items: ['Domeincontroller', 'Certificaatautoriteit (AD CS)', 'Synchronisatieserver naar de cloud', 'Beheerwerkplek voor AD (PAW)'] },
        ],
      },
      questions: [
        { q: 'Een analist bij een fictieve verzekeraar ziet dat één gebruikersaccount binnen twee minuten service tickets aanvraagt voor 40 verschillende serviceaccounts, allemaal met versleutelingstype 0x17. Er zijn geen mislukte aanmeldingen. Welke techniek is het meest waarschijnlijk?',
          options: ['Password spraying', 'Kerberoasting', 'Golden ticket', 'Brute force op een serviceaccount'], answer: 1,
          wrong: { 0: 'Spraying geeft juist veel mislukte aanmeldingen, op veel verschillende accounts.', 2: 'Een golden ticket is een zelfgemaakt TGT. Daarvoor is geen reeks service-ticketaanvragen voor 40 diensten nodig.', 3: 'Brute force geeft mislukte aanmeldingen. Hier lukt elke aanvraag.' },
          explain: 'Veel service tickets, met RC4, voor serviceaccounts, vanaf één account: het patroon van kerberoasting (T1558.003).' },
        { q: 'Bij een fictieve gemeente staan op de domeincontroller om 03:00 honderden gebeurtenissen 4771 met foutcode 0x18, vanaf één intern adres, voor bijna elk account één keer. Om 03:30 herhaalt het patroon zich. Geen account raakt vergrendeld. Wat is dit?',
          options: ['Brute force', 'Password spraying', 'Kerberoasting', 'Een verlopen certificaat op de domeincontroller'], answer: 1,
          wrong: { 0: 'Brute force richt zich op één of enkele accounts met veel pogingen en raakt snel de vergrendeling.', 2: 'Kerberoasting geeft geslaagde 4769-gebeurtenissen, geen mislukte pre-authenticatie.', 3: 'Een certificaatprobleem geeft geen foutcode voor een fout wachtwoord op honderden accounts in rondes.' },
          explain: 'Eén poging per account, in rondes, onder de vergrendelingsdrempel: password spraying (T1110.003).' },
        { q: 'Een fictief ziekenhuis heeft een oude applicatie die onder een serviceaccount met een SPN draait. Een gMSA wordt door de applicatie niet ondersteund. Welke maatregel verkleint het risico van kerberoasting het meest?',
          options: ['Het account in Protected Users zetten', 'Een lang, willekeurig wachtwoord uit een kluis instellen en alleen AES toestaan', 'Accountvergrendeling na vijf mislukte pogingen instellen', 'MFA voor het serviceaccount verplichten'], answer: 1,
          wrong: { 0: 'Serviceaccounts horen niet in Protected Users: de applicatie gaat er waarschijnlijk stuk op.', 2: 'Het raden gebeurt buiten het netwerk. Er komen geen mislukte pogingen bij de domeincontroller.', 3: 'Het ticket wordt aangevraagd door de aanvaller met zijn eigen account. MFA op het serviceaccount speelt daarbij geen rol.' },
          explain: 'Een wachtwoord dat niet te raden is, maakt het ticket waardeloos. AES maakt het raden bovendien trager.' },
        { q: 'Bij een fictief transportbedrijf zitten alle helpdeskmedewerkers in Account Operators, zodat ze wachtwoorden kunnen resetten. Wat is de beste aanpassing?',
          options: ['Ze in Account Operators laten, want de helpdesk moet kunnen werken', 'Ze in Domain Admins zetten, zodat de rechten duidelijk zijn', 'De groep leegmaken en de helpdesk alleen het recht geven om wachtwoorden te resetten op de OU met gewone gebruikers', 'Ze Windows LAPS laten gebruiken voor het resetten'], answer: 2,
          wrong: { 0: 'Account Operators heeft veel meer rechten dan wachtwoorden resetten, ook rond domeincontrollers.', 1: 'Dan krijgt de helpdesk het hele domein. Het tegendeel van least privilege.', 3: 'LAPS beheert het lokale beheerderswachtwoord van machines, niet de wachtwoorden van gebruikers.' },
          explain: 'Gericht delegeren op een OU geeft precies het recht dat nodig is, en niet meer.' },
        { q: 'Bij een fictieve hogeschool blijkt het lokale beheerdersaccount op alle 600 werkplekken hetzelfde wachtwoord te hebben. Wat lost dit het best op?',
          options: ['Het gedeelde wachtwoord elk kwartaal via een script centraal wijzigen', 'Alle werkplekken in Protected Users zetten', 'Windows LAPS invoeren, zodat elke werkplek een eigen, periodiek wisselend wachtwoord krijgt', 'Een fine-grained password policy voor het lokale beheerdersaccount'], answer: 2,
          wrong: { 0: 'Dan is het wachtwoord nog steeds op alle 600 machines gelijk, alleen een ander.', 1: 'Protected Users is een groep voor domeinaccounts van mensen, niet voor computers, en raakt lokale accounts niet.', 3: 'Een fine-grained password policy geldt voor domeinaccounts, niet voor lokale accounts op werkplekken.' },
          explain: 'Windows LAPS geeft elke machine een eigen wachtwoord. Eén buitgemaakt wachtwoord geeft dan nog maar één machine.' },
      ],
    },
  ],

  terms: [
    { term: 'Kerberos', def: 'Standaard aanmeldprotocol in Active Directory: met een TGT vraag je per dienst een service ticket aan, zonder steeds je wachtwoord te sturen.' },
    { term: 'TGT', def: 'Ticket Granting Ticket: het bewijs van aanmelding dat de domeincontroller uitgeeft (gebeurtenis 4768) en waarmee je service tickets aanvraagt.' },
    { term: 'Service ticket', def: 'Ticket voor één dienst (gebeurtenis 4769), deels versleuteld met een sleutel uit het wachtwoord van het account waaronder de dienst draait.' },
    { term: 'SPN', def: 'Service principal name: de naam waaronder een dienst in AD bekend is, gekoppeld aan het account waaronder de dienst draait.' },
    { term: 'Kerberoasting', def: 'Service tickets aanvragen voor serviceaccounts en het wachtwoord buiten het netwerk proberen te raden (ATT&CK T1558.003).' },
    { term: 'Password spraying', def: 'Eén of enkele veelgebruikte wachtwoorden op veel accounts proberen, onder de vergrendelingsdrempel (ATT&CK T1110.003).' },
    { term: 'Tiermodel', def: 'Indeling van systemen en accounts naar impact (tier 0 beheert het domein); een account uit een hogere tier meldt zich nooit aan in een lagere.' },
    { term: 'gMSA', def: 'Group Managed Service Account: serviceaccount waarvan Windows het lange, willekeurige wachtwoord zelf beheert en wijzigt.' },
    { term: 'Protected Users', def: 'Beveiligingsgroep die voor haar leden onder meer NTLM, RC4 bij aanmelden en delegatie uitschakelt; bedoeld voor accounts van mensen met hoge rechten.' },
    { term: 'Windows LAPS', def: 'Functie die elke machine een eigen, periodiek gewijzigd wachtwoord voor de lokale beheerder geeft en dat in AD of Microsoft Entra ID bewaart.' },
  ],

  resources: [
    { title: 'MITRE ATT&CK: T1558.003 Kerberoasting', url: 'https://attack.mitre.org/techniques/T1558/003/' },
    { title: 'Microsoft Learn: Protected Users security group', url: 'https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/protected-users-security-group' },
    { title: 'Microsoft Learn: Windows LAPS overview', url: 'https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview' },
    { title: 'Microsoft Learn: Securing privileged access, enterprise access model', url: 'https://learn.microsoft.com/en-us/security/privileged-access-workstations/privileged-access-access-model' },
  ],
});
