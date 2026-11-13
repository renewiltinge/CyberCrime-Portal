/* Room: Identiteit, toegang en Zero Trust */
CS.registerRoom({
  id: 'iam-zero-trust',
  path: 'security-kern',
  order: 12,
  title: 'Identiteit, toegang en Zero Trust',
  icon: '🪪',
  difficulty: 'Gemiddeld',
  minutes: 75,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Wie ben je, wat mag je, en waarom nog steeds? Lees toegangslogs, licht een toegangsoverzicht door, handel een vertrekkende medewerker af, ontleed een ID-token, bouw een detectieregel op beheeraccounts en toets toegang aan Zero Trust volgens NIST SP 800-207.',
  objectives: [
    'Het verschil tussen authenticatie, autorisatie en accounting uitleggen en herkennen in een log',
    'RBAC, ABAC, least privilege, need-to-know en functiescheiding toepassen bij een access review',
    'De levenscyclus joiner, mover, leaver inrichten en de risico\'s van elke stap benoemen',
    'Uitleggen hoe SSO en federatie werken met SAML 2.0 en OpenID Connect, en een ID-token beoordelen',
    'Beheer van hoge rechten inrichten met PAM, just-in-time en break-glass, en misbruik ervan detecteren',
    'De principes en de kerncomponenten van Zero Trust volgens NIST SP 800-207 toepassen op toegangsbesluiten',
  ],
  tasks: [
    {
      title: 'Taak 1: Authenticatie, autorisatie en accounting',
      tryFirst: true,
      intro: '<p>In het lab staat een uur uit het toegangslog van de declaratie-app van het fictieve installatiebedrijf Dijkstra. Sommige verzoeken stranden omdat de app niet weet wie er aanklopt, andere omdat de app het wel weet maar het niet toestaat. Zoek uit welke van de twee het vaakst voorkomt en wie er herhaaldelijk iets probeert wat niet mag.</p>',
      content: `
        <p>Denk aan de receptie van een kantoorgebouw. Eerst laat je je pasje zien: de receptionist controleert
        <em>wie</em> je bent. Daarna bepaalt het toegangssysteem <em>welke</em> verdiepingen je pas opent. En
        ondertussen schrijft het systeem op welke deur je wanneer opende. Dat zijn drie verschillende dingen, en in
        IT heten ze samen <strong>AAA</strong>.</p>
        <ul>
          <li><strong>Authenticatie</strong> (<em>authentication</em>, AuthN): vaststellen dat je bent wie je zegt
          dat je bent. Met iets wat je weet (wachtwoord), iets wat je hebt (telefoon, sleutel) of iets wat je bent
          (vingerafdruk). Meer dan één soort factor heet MFA.</li>
          <li><strong>Autorisatie</strong> (<em>authorization</em>, AuthZ): bepalen wat een geauthenticeerde
          identiteit mag. Lezen, wijzigen, goedkeuren, beheren.</li>
          <li><strong>Accounting</strong>: vastleggen wie wat wanneer deed, zodat je achteraf kunt controleren en
          onderzoeken. Het log in het lab is daar een voorbeeld van.</li>
        </ul>
        <h3>Hoe je het verschil in een log ziet</h3>
        <p>Webapplicaties gebruiken twee HTTP-statuscodes die precies dit onderscheid maken. De naamgeving is
        historisch verwarrend:</p>
        <table>
          <thead><tr><th>Code</th><th>Officiële naam</th><th>Wat het echt betekent</th></tr></thead>
          <tbody>
            <tr><td>401</td><td>Unauthorized</td><td>Niet (geldig) geauthenticeerd: log eerst in.</td></tr>
            <tr><td>403</td><td>Forbidden</td><td>Wel bekend, maar geen recht op deze actie.</td></tr>
          </tbody>
        </table>
        <p>Een reeks 401's achter elkaar vanaf één adres wijst op raden naar wachtwoorden of op een verlopen sessie.
        Een reeks 403's van een ingelogde gebruiker betekent iets anders: iemand probeert functies die buiten zijn
        rol vallen. Dat kan nieuwsgierigheid zijn, een fout in de rechten, of een eerste stap van misbruik.</p>
        <h3>Identiteit is meer dan een account</h3>
        <p>Een <strong>identiteit</strong> is de digitale weergave van een persoon, een apparaat of een stuk software.
        Eén persoon heeft vaak meerdere accounts: een gewoon account, een beheeraccount en accounts in SaaS-diensten.
        Daarnaast zijn er <strong>niet-menselijke identiteiten</strong>, zoals serviceaccounts en API-sleutels. Die
        zijn vaak talrijker dan de medewerkers en worden slechter beheerd, omdat niemand zich er eigenaar van voelt.</p>
        <div class="callout tip"><strong>Vuistregel:</strong> authenticatie beantwoordt "wie ben je?", autorisatie
        "wat mag je?", accounting "wat heb je gedaan?". Een sterk wachtwoordbeleid lost geen autorisatiefout op.</div>
      `,
      lab: {
        type: 'logs',
        title: 'declaraties.dijkstra.nm.lab/access.log',
        lines: `2026-11-10 09:00:14 192.0.2.31 user=d.kuipers GET /declaraties/ 200
2026-11-10 09:01:02 192.0.2.44 user=- GET /declaraties/ 401
2026-11-10 09:01:09 192.0.2.44 user=s.vermeulen POST /login 200
2026-11-10 09:01:10 192.0.2.44 user=s.vermeulen GET /declaraties/ 200
2026-11-10 09:03:27 192.0.2.44 user=s.vermeulen GET /declaraties/nieuw 200
2026-11-10 09:05:51 192.0.2.44 user=s.vermeulen GET /beheer/goedkeuren 403
2026-11-10 09:06:03 192.0.2.31 user=d.kuipers POST /declaraties/nieuw 200
2026-11-10 09:08:40 192.0.2.44 user=s.vermeulen GET /beheer/goedkeuren?id=7781 403
2026-11-10 09:12:12 192.0.2.58 user=k.bos GET /declaraties/ 200
2026-11-10 09:14:33 192.0.2.58 user=k.bos GET /beheer/export 403
2026-11-10 09:17:45 192.0.2.44 user=s.vermeulen POST /beheer/goedkeuren 403
2026-11-10 09:20:01 198.51.100.23 user=- POST /login 401
2026-11-10 09:20:03 198.51.100.23 user=- POST /login 401
2026-11-10 09:20:05 198.51.100.23 user=- POST /login 401
2026-11-10 09:22:18 192.0.2.62 user=m.koster GET /beheer/goedkeuren 200
2026-11-10 09:22:40 192.0.2.62 user=m.koster POST /beheer/goedkeuren?id=7764 200
2026-11-10 09:31:09 192.0.2.31 user=d.kuipers GET /declaraties/7790 200
2026-11-10 09:40:56 192.0.2.44 user=s.vermeulen GET /declaraties/7781 200
2026-11-10 09:47:12 192.0.2.62 user=m.koster GET /declaraties/ 200
2026-11-10 09:58:30 192.0.2.58 user=k.bos POST /logout 200`,
      },
      questions: [
        { q: 'Hoeveel verzoeken in het log strandden op authenticatie?', answer: ['4', 'vier'],
          hints: ['Zoek de statuscode die "log eerst in" betekent.', 'Filter op 401.', 'Eén keer vanaf het interne adres, drie keer vanaf 198.51.100.23.'],
          wrong: { '8': 'Je telt 401 en 403 samen. Een 403 gaat over autorisatie: de gebruiker was wel ingelogd.', '3': 'Ook de eerste regel van s.vermeulen, voordat die inlogt, telt mee.' },
          explain: 'Vier keer 401. Drie daarvan komen kort na elkaar van 198.51.100.23: dat lijkt op raden naar een wachtwoord.' },
        { q: 'Welke gebruiker probeert herhaaldelijk een functie die buiten zijn of haar rechten valt?', answer: ['s.vermeulen', 'vermeulen'],
          hints: ['Kijk naar de code voor "wel bekend, geen recht".', 'Filter op 403 en tel per gebruiker.', 'Drie keer op /beheer/goedkeuren.'],
          wrong: { 'k.bos': 'k.bos krijgt één keer 403 op /beheer/export. s.vermeulen probeert het drie keer, met steeds een andere aanpak.', 'm.koster': 'm.koster mag de goedkeurfunctie gebruiken: de verzoeken krijgen 200.' },
          why: 'Herhaalde 403\'s van een ingelogde gebruiker zie je niet in een rapport over mislukte aanmeldingen. Wie alleen op 401 alarmeert, mist iemand die binnen is en zijn grenzen aftast.',
          explain: 's.vermeulen krijgt drie keer 403 op de goedkeurfunctie: eerst openen, dan een specifiek id, dan een POST. Opvallend: id 7781 is een declaratie die deze gebruiker later zelf opent.' },
        { q: 'Wat zegt een 403 op /beheer/goedkeuren over de gebruiker?', options: ['Zijn identiteit is vastgesteld, maar zijn rol geeft geen recht op deze actie', 'Hij heeft een verkeerd wachtwoord ingevoerd', 'Zijn sessie is verlopen en hij moet opnieuw inloggen', 'De server kan de pagina niet vinden'], answer: 0,
          wrong: { 1: 'Een verkeerd wachtwoord geeft een 401: authenticatie mislukt.', 2: 'Een verlopen sessie geeft ook een 401. Bij 403 weet de app juist wie je bent.', 3: 'Dat is 404 Not Found.' },
          explain: 'Bij 403 is authenticatie gelukt en autorisatie geweigerd.' },
      ],
    },

    {
      title: 'Taak 2: Toegangsmodellen en de access review',
      tryFirst: true,
      intro: '<p>Het is 12 november 2026 en je doet de halfjaarlijkse access review van Dijkstra. In het lab staat de export uit het identiteitssysteem, met de HR-status ernaast. Zoek vergeten accounts, te ruime rechten en een combinatie van rollen die nooit bij één persoon had mogen liggen.</p>',
      content: `
        <p>Rechten toekennen kan op verschillende manieren. Welk <strong>toegangsmodel</strong> je kiest, bepaalt hoe
        goed je het later nog kunt overzien.</p>
        <ul>
          <li><strong>DAC</strong> (<em>discretionary access control</em>): de eigenaar van een bestand bepaalt zelf wie
          erbij mag. Zo werken gedeelde mappen vaak. Flexibel, maar onoverzichtelijk.</li>
          <li><strong>MAC</strong> (<em>mandatory access control</em>): een centraal beleid met labels (bijvoorbeeld
          "geheim") beslist, en de gebruiker kan dat niet veranderen. Gebruikelijk bij defensie.</li>
          <li><strong>RBAC</strong> (<em>role-based access control</em>): rechten hangen aan een rol, zoals
          "crediteurenadministratie". Wie de rol krijgt, krijgt de rechten. Overzichtelijk, zolang het aantal rollen
          niet ontploft.</li>
          <li><strong>ABAC</strong> (<em>attribute-based access control</em>): een regel weegt eigenschappen van
          gebruiker, object en omstandigheden. Bijvoorbeeld: "medewerkers van afdeling Inkoop mogen bestellingen tot
          10.000 euro aanmaken, alleen vanaf een beheerd apparaat". Fijnmaziger, maar lastiger te controleren.</li>
        </ul>
        <h3>De principes eronder</h3>
        <p><strong>Least privilege</strong>: iedereen krijgt de minimale rechten die nodig zijn voor het werk, en niet
        meer. <strong>Need-to-know</strong>: ook binnen je rechten zie je alleen de informatie die je voor je taak nodig
        hebt. <strong>Functiescheiding</strong> (<em>segregation of duties</em>, SoD): taken die samen fraude
        mogelijk maken, liggen bij verschillende mensen. Het klassieke voorbeeld is een leverancier aanmaken of een
        bestelling plaatsen, en de betaling uitvoeren.</p>
        <h3>De access review</h3>
        <p>Rechten groeien vanzelf, ze krimpen niet vanzelf. Daarom laat je periodiek de leidinggevende of de
        eigenaar van een applicatie bevestigen dat elke toegang nog klopt. Waar je op let:</p>
        <ul>
          <li>Accounts van mensen die volgens HR niet meer in dienst zijn.</li>
          <li>Accounts die lang niet zijn gebruikt (veel organisaties hanteren 90 dagen als signaal).</li>
          <li>Rechten die niet bij de huidige functie passen, vaak na een interne overstap.</li>
          <li>Combinaties van rollen die functiescheiding doorbreken.</li>
          <li>Serviceaccounts en algemene accounts zonder eigenaar.</li>
        </ul>
        <div class="callout warn"><strong>Let op:</strong> een review waarin de manager alles in één keer goedkeurt
        ("rubber stamping"), levert een vinkje op en geen veiligheid. Laat afwijkingen bovenaan staan.</div>
      `,
      lab: {
        type: 'logs',
        title: 'toegangsoverzicht-2026-11-12.txt',
        lines: `account       afdeling     functie                 rollen                                   laatste-aanmelding  hr-status
d.kuipers     Planning     planner                 planbord-gebruiker, declaratie-indienen  2026-11-12          in dienst
s.vermeulen   Service      monteur                 werkbon-app, declaratie-indienen         2026-11-11          in dienst
m.koster      Verkoop      accountmanager          crm-verkoop, fin-salarisadmin, declaratie-goedkeuren  2026-11-12  in dienst (sinds 2026-07-01 Verkoop, daarvoor Financien)
j.devries     Inkoop       inkoper                 erp-bestellen, erp-leverancier-aanmaken, erp-betalen  2026-11-12  in dienst
k.bos         ICT          systeembeheerder        werkplekbeheer, declaratie-indienen      2026-11-10          in dienst
adm-kbos      ICT          beheeraccount k.bos     domeinbeheer                             2026-11-07          in dienst
r.smit        Verkoop      accountmanager          crm-verkoop, declaratie-indienen         2026-10-14          uit dienst per 2026-08-31
t.yilmaz      Planning     planner                 planbord-gebruiker                       2026-06-28          uit dienst per 2026-06-30
a.peters      ICT          stagiair                werkplekbeheer, domeinbeheer             2026-11-12          in dienst (stage tot 2027-01-31)
f.elamrani    Inkoop       inkoper                 erp-bestellen                            2026-11-12          in dienst
l.vis         ICT          databasebeheerder       sql-lezen                                2026-11-12          in dienst
adm-lvis      ICT          beheeraccount l.vis     sql-beheer                               2026-11-05          in dienst
svc-backup    ICT          serviceaccount          backup-operator                          2026-11-12          eigenaar: l.vis
svc-oudscan   ICT          serviceaccount          domeinbeheer                             2025-02-11          eigenaar: onbekend
receptie01    Facilitair   gedeeld account         bezoekersregistratie                     2026-11-12          eigenaar: facilitair
p.dekker      ICT          netwerkbeheerder        werkplekbeheer                           2026-11-12          in dienst`,
      },
      questions: [
        { q: 'Welk account van iemand die volgens HR uit dienst is, wordt na de uitdiensttreding nog gebruikt?', answer: ['r.smit', 'smit'],
          hints: ['Filter op "uit dienst".', 'Vergelijk bij beide treffers de datum van de laatste aanmelding met de datum van uitdiensttreding.', 'Eén van de twee meldde zich ruim zes weken na zijn laatste werkdag nog aan.'],
          wrong: { 't.yilmaz': 'Dit account is vergeten en moet weg, maar de laatste aanmelding ligt vóór de uitdiensttreding. Het wordt dus niet meer gebruikt.' },
          why: 'Een vergeten account is een risico. Een vergeten account dat nog wordt gebruikt, is mogelijk al een incident: dat meld je meteen, en je wacht niet tot het rapport van de review af is.',
          explain: 'r.smit is uit dienst per 31 augustus maar meldde zich op 14 oktober nog aan. Zet het account uit, bewaar de logs en zoek uit wie dat was en wat er gebeurde.' },
        { q: 'Welk account heeft een combinatie van rollen die functiescheiding doorbreekt?', answer: ['j.devries', 'devries', 'de vries'],
          hints: ['Zoek een account dat zowel iets kan aanmaken of bestellen als kan betalen.', 'Kijk naar de ERP-rollen.', 'Een inkoper met de rol erp-betalen.'],
          wrong: { 'm.koster': 'm.koster heeft te veel rechten, maar dat is een gevolg van een overstap. De combinatie bestellen en betalen bij één persoon zit bij iemand anders.', 'a.peters': 'Veel te ruime rechten, maar geen functiescheidingsconflict. Daarvoor zoek je twee taken die samen fraude mogelijk maken.' },
          explain: 'j.devries kan een leverancier aanmaken, bij die leverancier bestellen en de factuur betalen. Dat is de klassieke route voor een fictieve leverancier.' },
        { q: 'Wat is er aan de hand met de rechten van m.koster?', options: ['Bij de overstap naar Verkoop zijn de oude rechten van Financien blijven staan', 'Het account is een gedeeld account zonder eigenaar', 'De rollen schenden need-to-know omdat Verkoop geen CRM nodig heeft', 'Het account is langer dan 90 dagen niet gebruikt'], answer: 0,
          wrong: { 1: 'm.koster is een persoonlijk account. Het gedeelde account is receptie01.', 2: 'crm-verkoop past juist bij een accountmanager. Het probleem zit in een andere rol.', 3: 'De laatste aanmelding is vandaag.' },
          explain: 'Dit heet privilege creep: rechten stapelen zich op bij elke interne overstap. Een accountmanager hoort geen salarisadministratie te kunnen inzien.' },
        { q: 'Hoeveel accounts in het overzicht hebben de rol domeinbeheer, terwijl dat volgens least privilege bij hooguit één ervan past?', answer: ['3', 'drie'],
          hints: ['Filter op domeinbeheer.', 'Kijk bij elk account naar de functie en de eigenaar.', 'Een beheeraccount, een stagiair en een serviceaccount zonder eigenaar.'],
          wrong: { '2': 'Ook het serviceaccount svc-oudscan heeft domeinbeheer, al anderhalf jaar ongebruikt en zonder eigenaar.', '1': 'Je telt alleen het beheeraccount. Kijk ook naar de stagiair en de serviceaccounts.' },
          explain: 'adm-kbos, a.peters en svc-oudscan. Alleen het aparte beheeraccount van de systeembeheerder is verdedigbaar. De stagiair en het verweesde serviceaccount moeten de rol kwijt.' },
      ],
    },

    {
      title: 'Taak 3: Joiner, mover, leaver',
      tryFirst: true,
      intro: '<p>Fatima el Amrani, inkoper bij Dijkstra, krijgt vandaag te horen dat haar contract niet wordt verlengd. Ze is er niet blij mee. Speel het scenario in het lab door: jij bent de IAM-beheerder en je maakt vijf keuzes.</p>',
      content: `
        <p>Elk account doorloopt dezelfde levenscyclus, en op elke overgang kan het misgaan. In het vak heet dit
        <strong>joiner, mover, leaver</strong> (JML).</p>
        <h3>Joiner</h3>
        <p>Een nieuwe medewerker krijgt een account op basis van een melding uit HR, met de rollen die bij de functie
        horen. Niet "kopieer de rechten van collega X": dan erft de nieuwkomer ook alle uitzonderingen van X. Het
        startwachtwoord of de activatielink gaat via een ander kanaal dan het account zelf, en MFA wordt bij de eerste
        aanmelding ingericht.</p>
        <h3>Mover</h3>
        <p>Bij een interne overstap krijgt iemand nieuwe rechten. De oude rechten verdwijnen vaak niet, omdat niemand
        erom vraagt. Zo ontstaat <strong>privilege creep</strong>. Goede praktijk: bij een overstap worden de oude
        rollen na een korte overgangsperiode automatisch ingetrokken, tenzij de nieuwe leidinggevende ze bewust
        opnieuw aanvraagt.</p>
        <h3>Leaver</h3>
        <p>Bij vertrek gaat de toegang dicht, op het afgesproken moment en volledig. Bij een gewoon vertrek is dat het
        einde van de laatste werkdag. Bij een vertrek in conflict of bij ontslag op staande voet doe je het op het
        moment van het gesprek, in afstemming met HR en de leidinggevende. Volledig betekent:</p>
        <ul>
          <li>Het account uitschakelen en <strong>lopende sessies en tokens intrekken</strong>. Een wachtwoordreset
          alleen laat een al ingelogde app of telefoon gewoon doorwerken.</li>
          <li>MFA-methoden, VPN-certificaten en persoonlijke API-sleutels verwijderen.</li>
          <li>Accounts buiten de centrale identiteit niet vergeten: SaaS zonder SSO, leveranciersportalen, gedeelde
          wachtwoorden die de vertrekker kende. Die laatste wijzig je.</li>
          <li>Apparaten en passen innemen, en mailbox en bestanden overdragen aan de leidinggevende.</li>
          <li>Het account na een bewaartermijn verwijderen, maar het eerst uitschakelen, zodat je logs en eigendom
          nog kunt herleiden.</li>
        </ul>
        <p>Automatiseer dit vanuit HR als bron van waarheid: als HR iemand uit dienst meldt, start het
        identiteitssysteem het leaverproces. Standaarden als SCIM helpen om accounts in SaaS-diensten automatisch aan
        te maken en weer in te trekken.</p>
        <div class="callout info"><strong>Insider-risico:</strong> onderzoek naar insider-incidenten wijst de periode
        rond vertrek geregeld aan als een moment waarop gegevens worden meegenomen. Dat is geen reden om iedereen te wantrouwen, wel om
        het leaverproces strak en voorspelbaar te houden.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'Vertrek van een inkoper',
        scenario: 'Dijkstra Installatietechniek (fictief). Maandag 14:00: HR meldt dat Fatima el Amrani (inkoper) om 15:00 hoort dat haar contract niet wordt verlengd. Ze heeft een laptop, een telefoon met de MFA-app, toegang tot het ERP, de gedeelde inkoopmailbox en het leveranciersportaal van een groothandel (geen SSO).',
        pass: 5,
        flag: 'NM{leaver_op_tijd_eruit}',
        steps: [
          { situation: 'Wanneer schakel je de toegang uit?', choices: [
            { label: 'Om 15:00, tijdens het gesprek, afgestemd met HR', good: true, feedback: 'Bij een vertrek met conflictrisico sluit je de toegang op het moment dat de medewerker het nieuws hoort. Daarvoor is er geen reden en daarna is het te laat.' },
            { label: 'Aan het einde van haar contract, over een maand', good: false, feedback: 'Bij een vertrek in conflict is een maand toegang een maand gelegenheid om gegevens mee te nemen of schade aan te richten.' },
            { label: 'Nu meteen, om 14:00, zonder HR te informeren', good: false, feedback: 'Dan merkt ze het voor het gesprek en weet HR niet waarom. Afstemming voorkomt chaos en juridische problemen.' },
          ] },
          { situation: 'Om 15:00 reset je haar wachtwoord. Is dat genoeg voor het ERP en de mail?', choices: [
            { label: 'Ja, zonder wachtwoord komt ze nergens meer in', good: false, feedback: 'Apps en telefoons die al zijn ingelogd, werken door met hun sessie of token tot die verloopt.' },
            { label: 'Nee: account uitschakelen, alle sessies en tokens intrekken en de MFA-methoden verwijderen', good: true, feedback: 'Pas dan is de toegang via de centrale identiteit echt dicht.' },
          ] },
          { situation: 'Het leveranciersportaal van de groothandel hangt niet aan SSO. Fatima bestelde daar met een eigen login.', choices: [
            { label: 'Laten staan, het portaal valt niet onder onze IAM', good: false, feedback: 'Wel onder jouw verantwoordelijkheid: met die login kan ze op rekening van Dijkstra bestellen.' },
            { label: 'Haar login bij de groothandel laten intrekken en het gedeelde inkoopwachtwoord wijzigen', good: true, feedback: 'Accounts buiten SSO zijn het bekendste gat in een leaverproces. Houd er een lijst van bij.' },
          ] },
          { situation: 'Haar leidinggevende vraagt om het account meteen te verwijderen, "dan is het maar weg".', choices: [
            { label: 'Eerst uitschakelen, mailbox en bestanden overdragen, en pas na de bewaartermijn verwijderen', good: true, feedback: 'Zo blijven logs, eigendom van bestanden en lopende bestellingen te herleiden.' },
            { label: 'Direct verwijderen, inclusief mailbox', good: false, feedback: 'Daarmee gooi je bewijs en bedrijfsinformatie weg. Bij een later onderzoek kun je niets meer herleiden.' },
          ] },
          { situation: 'Een week later zie je in het log dat het account van Fatima om 03:12 een aanmeldpoging kreeg.', choices: [
            { label: 'Negeren: het account is uitgeschakeld, dus de poging mislukte', good: false, feedback: 'De poging mislukte, maar iemand probeert het nog. Dat wil je weten.' },
            { label: 'Herkomst van de poging onderzoeken en melden bij security, ook al mislukte ze', good: true, feedback: 'Een poging op een uitgeschakeld account is een sterk signaal: het account hoort niemand meer te gebruiken.' },
          ] },
        ],
      },
      questions: [
        { q: 'Speel het scenario foutloos uit. Welke vlag krijg je?', answer: ['NM{leaver_op_tijd_eruit}'],
          hints: ['Bij elke stap is één keuze goed. Lees de feedback bij een foute keuze.', 'Denk aan sessies, accounts buiten SSO en bewijs.', 'Je hebt vijf van de vijf nodig.'],
          explain: 'Op tijd, volledig, en zonder sporen te wissen: zo ziet een goed leaverproces eruit.' },
        { q: 'Na een wachtwoordreset leest iemand nog een uur lang mail op een telefoon die al ingelogd was. Wat had je moeten intrekken?', answer: ['sessies', 'tokens', 'sessies en tokens', 'de sessies', 'de tokens', 'sessie', 'token', 'refresh token', 'refresh tokens', 'sessies en tokens intrekken'],
          hints: ['De telefoon voert het wachtwoord niet steeds opnieuw in.', 'Wat bewijst de app bij elk verzoek in plaats van het wachtwoord?', 'Het staat in de tweede stap van het scenario.'],
          wrong: { 'wachtwoord': 'Het wachtwoord is al gereset. De telefoon gebruikt iets anders.', 'mfa': 'MFA wordt alleen gevraagd bij een nieuwe aanmelding. De telefoon was al aangemeld.' },
          explain: 'Een ingelogde app werkt met een sessie of token. Pas als je die intrekt, moet het apparaat opnieuw authenticeren, en dat lukt dan niet meer.' },
        { q: 'Een nieuwe planner begint maandag. Zijn leidinggevende vraagt: "Geef hem dezelfde rechten als t.yilmaz had." Wat is het bezwaar?', options: ['Rechten kopiëren neemt ook alle uitzonderingen en vergeten rechten van die persoon over; ken in plaats daarvan de rol toe die bij de functie hoort', 'Er is geen bezwaar, zolang t.yilmaz dezelfde functie had', 'Het mag niet omdat t.yilmaz uit dienst is en het account dus niet meer bestaat', 'Nieuwe medewerkers krijgen in de eerste maand geen rechten'], answer: 0,
          wrong: { 1: 'Ook bij dezelfde functie neem je de historie van die ene persoon over, inclusief rechten die ooit tijdelijk waren.', 2: 'Het account bestaat nog, dat zag je in de review. Maar daar gaat het bezwaar niet om.', 3: 'Dan kan iemand zijn werk niet doen. Least privilege betekent: wat nodig is, niet niets.' },
          explain: 'Toekennen op basis van een rol houdt rechten voorspelbaar. Kopiëren van een persoon is de snelste weg naar privilege creep.' },
      ],
    },

    {
      title: 'Taak 4: SSO en federatie met SAML 2.0 en OpenID Connect',
      tryFirst: true,
      intro: '<p>Daan Kuipers logt via de centrale inlogdienst in op de planningsapp. De app ontvangt daarbij het ID-token dat in het lab staat. Lees de claims: wie heeft het uitgegeven, voor welke app is het bedoeld, hoe lang is het geldig en hoe heeft Daan zich aangemeld?</p>',
      content: `
        <p>Met <strong>single sign-on</strong> (SSO) log je één keer in bij een centrale dienst, de
        <strong>identity provider</strong> (IdP), en kom je daarna in alle aangesloten applicaties zonder opnieuw een
        wachtwoord te typen. De applicaties zelf zien je wachtwoord nooit. Ze vertrouwen op een ondertekende
        verklaring van de IdP: "dit is Daan, hij heeft zich zojuist met MFA aangemeld". Gaat die vertrouwensrelatie
        over de grens van de eigen organisatie, bijvoorbeeld met een SaaS-leverancier, dan heet het
        <strong>federatie</strong>.</p>
        <p>Het voordeel voor security: één plek om MFA af te dwingen, één plek om een account uit te schakelen, en één
        log van alle aanmeldingen. Het nadeel: de IdP is een kroonjuweel. Wie daar binnen is, komt overal binnen.</p>
        <h3>SAML 2.0</h3>
        <p>SAML 2.0 is een XML-standaard van OASIS uit 2005. De applicatie heet daar de <strong>service provider</strong>
        (SP). Bij het aanmelden stuurt de SP de browser door naar de IdP. Die stuurt na een geslaagde aanmelding een
        ondertekende <strong>assertion</strong> terug, via de browser, met daarin wie de gebruiker is en eventueel
        attributen zoals groepen. SAML zie je veel bij zakelijke webapplicaties.</p>
        <h3>OAuth 2.0 en OpenID Connect</h3>
        <p><strong>OAuth 2.0</strong> is bedoeld voor <em>autorisatie</em>: een app krijgt een access token om namens
        jou iets te doen bij een API, zonder je wachtwoord. Het zegt op zichzelf niet wie je bent.
        <strong>OpenID Connect</strong> (OIDC) is een laag bovenop OAuth 2.0 die daar <em>authenticatie</em> aan
        toevoegt. De IdP heet hier de OpenID Provider, en die geeft een <strong>ID-token</strong> af: een ondertekend
        JWT met claims.</p>
        <table>
          <thead><tr><th>Claim</th><th>Betekenis</th><th>Wat de app moet controleren</th></tr></thead>
          <tbody>
            <tr><td>iss</td><td>Uitgever</td><td>Is dit onze eigen IdP?</td></tr>
            <tr><td>aud</td><td>Ontvanger</td><td>Is het token voor mij bedoeld?</td></tr>
            <tr><td>exp, iat</td><td>Verloop en uitgifte (Unix-tijd)</td><td>Is het nog geldig?</td></tr>
            <tr><td>nonce</td><td>Eenmalige waarde uit het verzoek</td><td>Hoort het bij mijn eigen aanvraag (tegen replay)?</td></tr>
            <tr><td>amr</td><td>Gebruikte aanmeldmethoden</td><td>Was er MFA, als het beleid dat eist?</td></tr>
          </tbody>
        </table>
        <p>En natuurlijk de handtekening, met de publieke sleutel van de IdP. Een app die het token niet controleert,
        accepteert alles wat er zo uitziet.</p>
        <div class="callout warn"><strong>Klassieke fout:</strong> een app die alleen de handtekening controleert en
        niet de <code>aud</code>, accepteert ook tokens die voor een andere app bedoeld waren. Wie een token van app A
        bemachtigt, komt zo ook in app B.</div>
      `,
      lab: { type: 'jwt', token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9lZmVuLTIwMjYtMTEifQ.eyJpc3MiOiJodHRwczovL2xvZ2luLmRpamtzdHJhLm5tLmxhYiIsInN1YiI6InUtNDA5MTciLCJhdWQiOiJwbGFuYm9yZC1hcHAiLCJpYXQiOjE3OTQ0Njk5MjAsImF1dGhfdGltZSI6MTc5NDQ2OTkwMCwiZXhwIjoxNzk0NDcyNjIwLCJub25jZSI6Ims3UWUyTHc5IiwiYW1yIjpbInB3ZCIsIm90cCJdLCJuYW1lIjoiRGFhbiBLdWlwZXJzIiwiZW1haWwiOiJkLmt1aXBlcnNAZGlqa3N0cmEubm0ubGFiIiwiZ3JvdXBzIjpbInBsYW5uaW5nIiwicGxhbmJvcmQtZ2VicnVpa2VyIl19.b2VmZW50b2tlbi16b25kZXItZWNodGUtaGFuZHRla2VuaW5nLW5pbmVtaW5kcw' },
      questions: [
        { q: 'Voor welke applicatie is dit ID-token bedoeld?', answer: ['planbord-app'],
          hints: ['Zoek de claim die de ontvanger aanwijst.', 'Kijk naar aud in de payload.', 'Het begint met planbord.'],
          wrong: { 'https://login.dijkstra.nm.lab': 'Dat is iss: de uitgever. Gevraagd is de ontvanger.', 'u-40917': 'Dat is sub: de gebruiker.' },
          explain: 'aud is planbord-app. Elke andere app hoort dit token te weigeren.' },
        { q: 'Hoeveel minuten zit er tussen uitgifte en verloop van het token?', answer: ['45', '45 minuten'],
          hints: ['Je hebt iat en exp nodig. Het lab zet ze om naar leesbare tijd.', 'Uitgifte om 07:52 UTC.', 'Verloop om 08:37 UTC.'],
          wrong: { '60': 'Een uur is een gebruikelijke waarde, maar reken het na met de tijden in het lab.', '2700': 'Dat is het verschil in seconden. Gevraagd is minuten.' },
          explain: 'exp min iat is 2700 seconden: 45 minuten. Het lab meldt het token als verlopen, omdat die 45 minuten inmiddels voorbij zijn.' },
        { q: 'Welke tweede factor gebruikte Daan naast zijn wachtwoord, volgens de claims?', answer: ['otp', 'one-time password', 'eenmalige code'],
          hints: ['Zoek de claim met de aanmeldmethoden.', 'amr is een lijst.', 'pwd is het wachtwoord, de andere waarde is de tweede factor.'],
          wrong: { 'pwd': 'pwd staat voor het wachtwoord zelf. Kijk naar de andere waarde in amr.' },
          explain: 'amr bevat pwd en otp: een wachtwoord plus een eenmalige code, bijvoorbeeld uit een authenticator-app.' },
        { q: 'De urenregistratie-app met client-id uren-app krijgt dit token aangeboden, met een geldige handtekening en binnen de geldigheidsduur. Wat moet de app doen?', options: ['Weigeren, omdat aud niet uren-app is', 'Accepteren, omdat de handtekening van de eigen IdP klopt', 'Accepteren, omdat de groep planning ook uren mag schrijven', 'Doorsturen naar de planningsapp'], answer: 0,
          wrong: { 1: 'Een geldige handtekening zegt alleen dat de IdP het token uitgaf, niet voor wie.', 2: 'Groepslidmaatschap is autorisatie. Eerst moet vaststaan dat het token voor deze app bedoeld is.', 3: 'Tokens horen niet tussen apps te worden doorgegeven.' },
          why: 'Zonder aud-controle wordt één gestolen token een sleutelbos. Dat is een van de meest gemaakte fouten bij zelfgebouwde OIDC-koppelingen.',
          explain: 'De app hoort iss, aud, exp, nonce en de handtekening te controleren. Hier faalt aud.' },
      ],
    },

    {
      title: 'Taak 5: Hoge rechten: PAM, just-in-time en break-glass',
      tryFirst: true,
      intro: '<p>Bij Dijkstra mogen beheeraccounts (adm-...) alleen via de PAM-jumphost worden gebruikt. In het lab staan tien aanmeldingen van afgelopen nacht en vanochtend. Bouw een regel die precies het misbruik van beheeraccounts vangt, zonder vals alarm.</p>',
      content: `
        <p>Een gewoon account dat wordt overgenomen, kost je een mailbox. Een beheeraccount dat wordt overgenomen, kost
        je het domein. Daarom krijgen hoge rechten een eigen regime: <strong>privileged access management</strong>
        (PAM).</p>
        <h3>De bouwstenen</h3>
        <ul>
          <li><strong>Gescheiden accounts:</strong> een beheerder mailt en surft met zijn gewone account en beheert met
          een apart account (hier <code>adm-</code>). Zo komt een phishingmail nooit binnen bij een account met
          domeinrechten.</li>
          <li><strong>Wachtwoordkluis:</strong> wachtwoorden van beheer- en serviceaccounts staan in een kluis, worden
          automatisch geroteerd en worden alleen uitgegeven na aanvraag.</li>
          <li><strong>Jumphost of beheerwerkplek:</strong> beheer gebeurt alleen vanaf een speciaal afgeschermde
          machine, niet vanaf de laptop waarop ook mail binnenkomt. Sessies worden daar vaak opgenomen.</li>
          <li><strong>Just-in-time</strong> (JIT): de beheerrol staat standaard uit en wordt voor een beperkte tijd
          toegekend, na een aanvraag met een reden en soms goedkeuring van een collega. Na afloop vervalt de rol
          vanzelf. Daarmee is er buiten die vensters niets te stelen.</li>
          <li><strong>Break-glass:</strong> een of twee noodaccounts voor als alles faalt, bijvoorbeeld als de
          IdP of het MFA-systeem uitligt. Lang, willekeurig wachtwoord, verdeeld bewaard in een kluis, uitgesloten van
          regels die bij een storing zouden blokkeren, en <em>elke</em> aanmelding geeft direct een alarm. Een
          break-glass-account dat je niet bewaakt, is een achterdeur.</li>
        </ul>
        <h3>Detecteren</h3>
        <p>De regels hierboven maken detectie eenvoudig, omdat normaal gedrag strak is omschreven. Je zoekt naar
        afwijkingen van het afgesproken patroon:</p>
        <ul>
          <li>Een beheeraccount dat zich aanmeldt vanaf iets anders dan de jumphost.</li>
          <li>Een beheeraccount dat wordt gebruikt zonder actieve JIT-toekenning.</li>
          <li>Elke aanmelding met een break-glass-account.</li>
          <li>Een serviceaccount dat zich interactief aanmeldt, of vanaf een onverwachte machine.</li>
        </ul>
        <p>Een goede regel is <strong>specifiek</strong>: hij vangt het misbruik en niets anders. Een regel op alleen
        het tijdstip of alleen de bronmachine slaat ook aan op legitiem werk. Dan gaat het SOC hem negeren, en dan
        mist het ook de echte melding.</p>
        <div class="callout tip"><strong>Tip voor het lab:</strong> de voorwaarden worden met EN gecombineerd. Begin
        met één voorwaarde, kijk naar de vals-positieven, en voeg dan een tweede toe die precies die
        vals-positieven uitsluit.</div>
      `,
      lab: {
        type: 'detectrule',
        title: 'aanmeldingen beheeraccounts',
        scenario: 'Afspraak bij Dijkstra: beheeraccounts (adm-...) worden alleen gebruikt via PAM-JUMP01. Serviceaccounts melden zich aan vanaf hun eigen server.',
        fields: ['Account', 'Bron', 'Doel', 'ViaPAM', 'Uur'],
        events: [
          { label: 'adm-pdekker beheert DC01 via de jumphost', malicious: false, fields: { Account: 'adm-pdekker', Bron: 'PAM-JUMP01', Doel: 'DC01', ViaPAM: 'ja', Uur: '10' } },
          { label: 'adm-lvis onderhoudt SQL01 via de jumphost', malicious: false, fields: { Account: 'adm-lvis', Bron: 'PAM-JUMP01', Doel: 'SQL01', ViaPAM: 'ja', Uur: '14' } },
          { label: 'p.dekker leest mail', malicious: false, fields: { Account: 'p.dekker', Bron: 'WS-ICT-03', Doel: 'MAIL01', ViaPAM: 'nee', Uur: '9' } },
          { label: 'adm-pdekker op DC01 vanaf een inkoopwerkplek', malicious: true, fields: { Account: 'adm-pdekker', Bron: 'WS-INK-07', Doel: 'DC01', ViaPAM: 'nee', Uur: '2' } },
          { label: 'adm-pdekker op FS02 vanaf een inkoopwerkplek', malicious: true, fields: { Account: 'adm-pdekker', Bron: 'WS-INK-07', Doel: 'FS02', ViaPAM: 'nee', Uur: '2' } },
          { label: 'svc-backup draait de nachtelijke back-up', malicious: false, fields: { Account: 'svc-backup', Bron: 'BAK01', Doel: 'FS02', ViaPAM: 'nee', Uur: '1' } },
          { label: 'adm-lvis op SQL01 vanaf een inkoopwerkplek', malicious: true, fields: { Account: 'adm-lvis', Bron: 'WS-INK-07', Doel: 'SQL01', ViaPAM: 'nee', Uur: '3' } },
          { label: 'f.elamrani opent het ERP', malicious: false, fields: { Account: 'f.elamrani', Bron: 'WS-INK-07', Doel: 'ERP01', ViaPAM: 'nee', Uur: '8' } },
          { label: 'adm-kbos past een firewallregel aan via de jumphost', malicious: false, fields: { Account: 'adm-kbos', Bron: 'PAM-JUMP01', Doel: 'FW01', ViaPAM: 'ja', Uur: '11' } },
          { label: 'adm-kbos geplande wijziging op DC01, avondvenster', malicious: false, fields: { Account: 'adm-kbos', Bron: 'PAM-JUMP01', Doel: 'DC01', ViaPAM: 'ja', Uur: '23' } },
        ],
        solution: [{ field: 'Account', op: 'bevat', value: 'adm-' }, { field: 'ViaPAM', op: 'is', value: 'nee' }],
        flag: 'NM{beheer_alleen_via_pam}',
      },
      questions: [
        { q: 'Test eerst de regel ViaPAM is nee. Hoeveel vals-positieven geeft die?', answer: ['3', 'drie'],
          hints: ['Voeg alleen die ene voorwaarde toe en lees FP af.', 'Welke gewone accounts en serviceaccounts melden zich ook zonder PAM aan?', 'p.dekker, svc-backup en f.elamrani.'],
          wrong: { '0': 'Dan heb je nog een tweede voorwaarde toegevoegd. Test eerst alleen ViaPAM is nee.', '6': 'Dat is het totaal aantal treffers. Gevraagd is het aantal onschuldige daarvan.' },
          explain: 'Drie: gewone accounts en serviceaccounts gaan nooit via PAM. De regel moet zich beperken tot beheeraccounts.' },
        { q: 'Vanaf welke machine worden de beheeraccounts misbruikt?', answer: ['WS-INK-07', 'ws-ink-07'],
          hints: ['Kijk naar de Bron van de kwaadaardige events.', 'Open "Toon de events".', 'Een werkplek van Inkoop.'],
          wrong: { 'PAM-JUMP01': 'Dat is de afgesproken route. Het misbruik komt juist niet van daar.', 'DC01': 'Dat is een doel, geen bron.' },
          explain: 'WS-INK-07. Waarschijnlijk is die werkplek gecompromitteerd en zijn er beheerwachtwoorden buitgemaakt. Die werkplek gaat in quarantaine en de wachtwoorden van adm-pdekker en adm-lvis worden geroteerd.' },
        { q: 'Bouw een regel met TP 3 en FP 0. Welke vlag verschijnt?', answer: ['NM{beheer_alleen_via_pam}'],
          hints: ['Combineer twee voorwaarden: welk soort account, en welke route.', 'Account bevat adm- ...', '... EN ViaPAM is nee.'],
          wrong: { '/bron/i': 'Een regel op Bron is WS-INK-07 vangt ook f.elamrani, en mist misbruik vanaf een andere werkplek.' },
          explain: 'Account bevat "adm-" EN ViaPAM is "nee". Die regel beschrijft de afspraak zelf en blijft werken als de aanvaller morgen een andere werkplek gebruikt.' },
        { q: 'Om 04:10 meldt het break-glass-account bg-nood01 zich aan. Er is geen storing gemeld. Wat is de juiste reactie?', options: ['Behandelen als incident: direct navragen wie het gebruikt en waarom, en zo nodig het account blokkeren en het wachtwoord vervangen', 'Niets doen: noodaccounts zijn juist bedoeld om buiten kantoortijd te werken', 'Het account voorgoed verwijderen, zodat dit niet meer kan', 'Een ticket aanmaken voor de volgende access review'], answer: 0,
          wrong: { 1: 'Een noodaccount is voor noodgevallen, niet voor nachtwerk. Zonder storing is er geen reden.', 2: 'Dan heb je bij de volgende echte storing geen noodtoegang meer. Vervang het wachtwoord en houd het account.', 3: 'De volgende review is over maanden. Elke aanmelding met break-glass vraagt om directe opvolging.' },
          why: 'Break-glass-accounts zijn bewust uitgezonderd van een deel van de toegangsregels, zodat ze bij een storing blijven werken. Juist daarom is een directe melding bij elk gebruik de belangrijkste beheersmaatregel.',
          explain: 'Elke aanmelding met een break-glass-account is een alarm. Zonder storing is het misbruik tot het tegendeel blijkt.' },
      ],
    },

    {
      title: 'Taak 6: Zero Trust volgens NIST SP 800-207',
      tryFirst: true,
      intro: '<p>Dijkstra heeft een policy engine ingevoerd die bij elk verzoek naar identiteit, apparaat, MFA en locatie kijkt. In het lab staat het beslislog van één ochtend. Zoek uit welke verzoeken zijn geweigerd en waarom, en of het beleid iets heeft doorgelaten wat het niet had mogen doorlaten.</p>',
      content: `
        <p>Het oude beveiligingsmodel lijkt op een kasteel met een slotgracht: wie binnen de muren is (het
        kantoornetwerk, de VPN), wordt vertrouwd. Dat model werkt slecht als medewerkers thuis werken, applicaties in
        de cloud draaien en een aanvaller via één phishingmail al binnen de muren staat. <strong>Zero Trust</strong>
        draait het om: de netwerklocatie geeft op zichzelf geen vertrouwen. Elk verzoek wordt beoordeeld, elke keer.</p>
        <p>Het Amerikaanse NIST beschreef dit in 2020 in <strong>SP 800-207, Zero Trust Architecture</strong>. Het is
        geen product maar een set principes. Op hoofdlijnen:</p>
        <ul>
          <li>Alle gegevens en diensten zijn <em>resources</em>, ook die op het eigen netwerk.</li>
          <li>Alle communicatie wordt beveiligd, ongeacht de netwerklocatie.</li>
          <li>Toegang wordt per sessie verleend, met zo min mogelijk rechten.</li>
          <li>Toegang hangt af van dynamisch beleid: identiteit, de staat van het apparaat, de applicatie en eventueel
          gedrag en omgeving.</li>
          <li>De organisatie bewaakt en meet de integriteit en beveiliging van alle eigen en gekoppelde apparaten.</li>
          <li>Authenticatie en autorisatie zijn dynamisch en worden afgedwongen vóórdat er toegang is.</li>
          <li>De organisatie verzamelt zoveel mogelijk informatie over haar toestand en gebruikt die om beter te worden.</li>
        </ul>
        <h3>De componenten</h3>
        <table>
          <thead><tr><th>Component</th><th>Rol</th></tr></thead>
          <tbody>
            <tr><td>Policy Engine (PE)</td><td>Neemt het besluit: toestaan of weigeren, op basis van beleid en signalen.</td></tr>
            <tr><td>Policy Administrator (PA)</td><td>Voert het besluit door: zet de sessie op of breekt hem af, geeft tokens uit.</td></tr>
            <tr><td>Policy Enforcement Point (PEP)</td><td>Staat tussen gebruiker en resource en laat het verkeer door of niet.</td></tr>
          </tbody>
        </table>
        <p>PE en PA samen heten in SP 800-207 het <strong>Policy Decision Point</strong> (PDP). De signalen komen
        van buiten: het identiteitssysteem, het apparaatbeheer (is de laptop beheerd en bijgewerkt?), threat
        intelligence en logs.</p>
        <h3>Wat Zero Trust niet doet</h3>
        <p>Het beleid kan alleen beslissen op wat het weet. Als het identiteitssysteem zegt dat een account bestaat en
        geldig is, en het apparaat voldoet, dan ziet de policy engine geen reden om te weigeren. Zero Trust is daarmee
        zo sterk als het identiteitsbeheer eronder. Een slordig leaverproces of een te ruime rol wordt door een
        policy engine keurig uitgevoerd.</p>
        <div class="callout info"><strong>Leesadvies:</strong> in het log staat per verzoek een ID, de signalen en
        het besluit. Filter op <code>WEIGEREN</code> om de weigeringen te zien, en op een gebruikersnaam om iemands
        verzoeken te volgen.</div>
      `,
      lab: {
        type: 'logs',
        title: 'pdp-besluiten-2026-11-12.log',
        lines: `07:58:12 Z-1031 subject=f.elamrani apparaat=LT-INK-07 beheerd=ja compliant=ja mfa=ja locatie=NL resource=erp.dijkstra.nm.lab besluit=TOESTAAN reden=rol-erp-bestellen
08:02:40 Z-1032 subject=d.kuipers apparaat=LT-PLN-02 beheerd=ja compliant=ja mfa=ja locatie=NL resource=planbord.dijkstra.nm.lab besluit=TOESTAAN reden=rol-planbord
08:05:03 Z-1033 subject=k.bos apparaat=PRIVE-LAPTOP beheerd=nee compliant=nee mfa=ja locatie=NL resource=werkplekbeheer.dijkstra.nm.lab besluit=WEIGEREN reden=apparaat-niet-beheerd
08:06:55 Z-1034 subject=k.bos apparaat=LT-ICT-01 beheerd=ja compliant=ja mfa=ja locatie=NL resource=werkplekbeheer.dijkstra.nm.lab besluit=TOESTAAN reden=rol-werkplekbeheer
08:11:21 Z-1035 subject=s.vermeulen apparaat=TAB-SRV-11 beheerd=ja compliant=ja mfa=nee locatie=NL resource=werkbon.dijkstra.nm.lab besluit=WEIGEREN reden=mfa-vereist
08:11:58 Z-1036 subject=s.vermeulen apparaat=TAB-SRV-11 beheerd=ja compliant=ja mfa=ja locatie=NL resource=werkbon.dijkstra.nm.lab besluit=TOESTAAN reden=rol-werkbon-app
08:14:30 Z-1037 subject=m.koster apparaat=LT-VRK-05 beheerd=ja compliant=nee mfa=ja locatie=NL resource=crm.dijkstra.nm.lab besluit=WEIGEREN reden=antivirus-verouderd
08:20:47 Z-1038 subject=m.koster apparaat=LT-VRK-05 beheerd=ja compliant=ja mfa=ja locatie=NL resource=salaris.dijkstra.nm.lab besluit=TOESTAAN reden=rol-fin-salarisadmin
08:26:09 Z-1039 subject=j.devries apparaat=LT-INK-03 beheerd=ja compliant=ja mfa=ja locatie=onbekend(203.0.113.77) resource=erp.dijkstra.nm.lab besluit=WEIGEREN reden=aanmeldrisico-hoog
08:31:15 Z-1040 subject=r.smit apparaat=PRIVE-PC beheerd=nee compliant=nee mfa=ja locatie=NL resource=crm.dijkstra.nm.lab besluit=WEIGEREN reden=apparaat-niet-beheerd
08:33:52 Z-1041 subject=adm-kbos apparaat=PAM-JUMP01 beheerd=ja compliant=ja mfa=ja locatie=NL resource=dc01.dijkstra.nm.lab besluit=TOESTAAN reden=jit-actief-tot-09:30
08:40:18 Z-1042 subject=adm-lvis apparaat=PAM-JUMP01 beheerd=ja compliant=ja mfa=ja locatie=NL resource=sql01.dijkstra.nm.lab besluit=WEIGEREN reden=geen-actieve-jit-toekenning
08:44:05 Z-1043 subject=f.elamrani apparaat=LT-INK-07 beheerd=ja compliant=ja mfa=ja locatie=NL resource=leveranciers.dijkstra.nm.lab besluit=TOESTAAN reden=rol-erp-bestellen
08:47:33 Z-1044 subject=r.smit apparaat=LT-VRK-02 beheerd=ja compliant=ja mfa=ja locatie=NL resource=crm.dijkstra.nm.lab besluit=TOESTAAN reden=rol-crm-verkoop
08:52:10 Z-1045 subject=a.peters apparaat=LT-ICT-04 beheerd=ja compliant=ja mfa=ja locatie=NL resource=dc01.dijkstra.nm.lab besluit=TOESTAAN reden=rol-domeinbeheer
09:03:44 Z-1046 subject=d.kuipers apparaat=LT-PLN-02 beheerd=ja compliant=ja mfa=ja locatie=NL resource=uren.dijkstra.nm.lab besluit=TOESTAAN reden=rol-planbord`,
      },
      questions: [
        { q: 'Hoeveel verzoeken werden geweigerd omdat het apparaat niet aan het beleid voldeed?', answer: ['3', 'drie'],
          hints: ['Kijk naar de apparaatsignalen bij de weigeringen.', 'Filter op compliant=nee.', 'Twee keer een niet-beheerd apparaat, één keer verouderde antivirus.'],
          wrong: { '6': 'Je telt alle weigeringen. Een deel daarvan gaat over MFA, aanmeldrisico of just-in-time.', '2': 'Ook verouderde antivirus maakt een beheerd apparaat niet-compliant.' },
          explain: 'Z-1033, Z-1037 en Z-1040. Toestemming hangt niet alleen af van wie je bent, maar ook van het apparaat waarmee je komt.' },
        { q: 'Welk verzoek van een beheeraccount werd geweigerd, terwijl apparaat en MFA in orde waren? (ID, bijvoorbeeld Z-1099)', answer: ['Z-1042', 'z1042', 'z-1042'],
          hints: ['Filter op adm-.', 'Beide verzoeken komen van de jumphost, met MFA.', 'Lees de reden: er ontbreekt iets wat in taak 5 aan bod kwam.'],
          wrong: { 'Z-1041': 'Dat verzoek werd toegestaan, omdat er een actieve JIT-toekenning was.' },
          explain: 'Z-1042: adm-lvis had geen actieve just-in-time-toekenning. De beheerrol staat standaard uit, ook voor een beheerder op de juiste machine.' },
        { q: 'Welke component uit SP 800-207 laat het verkeer van Z-1033 feitelijk niet door naar de beheerapplicatie?', options: ['Policy Enforcement Point', 'Policy Engine', 'Identity provider', 'De firewall aan de rand van het kantoornetwerk'], answer: 0,
          wrong: { 1: 'De engine neemt het besluit, maar staat zelf niet in het verkeerspad.', 2: 'De IdP levert een signaal (wie is het), maar beslist en blokkeert niet.', 3: 'In Zero Trust geeft of weigert de netwerkrand geen toegang tot een resource. k.bos zat bovendien thuis.' },
          explain: 'De Policy Engine besluit, de Policy Administrator geeft de opdracht en het Policy Enforcement Point voert hem uit in het verkeerspad.' },
        { q: 'Boss: de policy engine liet één verzoek door dat bij goed identiteitsbeheer nooit had mogen slagen, ook al voldeden apparaat en MFA. Welk verzoek? (ID)', boss: true, answer: ['Z-1044', 'z1044', 'z-1044'],
          hints: ['Het beslislog alleen is niet genoeg. Leg het naast wat je in de access review van taak 2 vond.', 'Zoek een gebruiker die volgens HR niet meer in dienst is.', 'Filter op r.smit en kijk welk verzoek werd toegestaan.'],
          wrong: { 'Z-1040': 'Dat verzoek van r.smit werd geweigerd, op het apparaat. Gevraagd is het verzoek dat wel doorkwam.', 'Z-1038': 'Ook een fout in de rechten (privilege creep bij m.koster), maar m.koster is in dienst en de vraag zegt dat het verzoek nooit had mogen slagen. Bij r.smit had het account niet eens mogen bestaan.', 'Z-1045': 'De stagiair heeft te ruime rechten, maar is wel in dienst. Zoek iemand die er helemaal niet meer zou moeten zijn.' },
          why: 'Zero Trust beslist op signalen. Een account dat nog bestaat, met een MFA-app en een niet ingeleverde laptop, ziet er voor de engine volkomen legitiem uit. Identiteitsbeheer is het fundament eronder.',
          explain: 'r.smit is uit dienst per 31 augustus. Om 08:31 weigert de engine hem op een privé-pc, om 08:47 komt hij binnen met een bedrijfslaptop die nooit is ingeleverd, en met MFA. Beleid, apparaat en MFA klopten; de identiteit had er niet meer mogen zijn.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: waarom een wachtwoordreset niet genoeg is',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Bij een overgenomen account is de eerste reflex: wachtwoord resetten. Met moderne authenticatie is dat
        zelden genoeg, omdat het wachtwoord maar één keer wordt gebruikt, bij de aanmelding. Daarna werken apps met
        tokens.</p>
        <h3>Drie soorten tokens</h3>
        <ul>
          <li>Het <strong>ID-token</strong> vertelt de app wie de gebruiker is. Het is bedoeld voor de app zelf, niet
          om API's mee aan te roepen.</li>
          <li>Het <strong>access token</strong> geeft toegang tot een API. Het leeft kort, vaak in de orde van een
          uur. Is het eenmaal uitgegeven, dan controleert de API meestal alleen de handtekening en de geldigheid. Een
          wachtwoordreset verandert daar niets aan: tot het verloopt, werkt het.</li>
          <li>Het <strong>refresh token</strong> leeft langer en wordt gebruikt om nieuwe access tokens op te halen
          zonder dat de gebruiker opnieuw inlogt. Wie het refresh token heeft, heeft in feite een blijvende sessie.</li>
        </ul>
        <p>Wat er bij een reset met refresh tokens gebeurt, verschilt per identiteitsplatform en per instelling. Ga er
        niet van uit dat ze vanzelf vervallen: trek ze expliciet in. De meeste platforms hebben daar een functie voor
        als "alle sessies afmelden" of "tokens intrekken".</p>
        <h3>Sessie- en tokendiefstal</h3>
        <p>Aanvallers weten dit. Phishingkits die als proxy tussen slachtoffer en echte inlogpagina zitten
        (<em>adversary-in-the-middle</em>), laten het slachtoffer gewoon MFA doen en stelen daarna het sessiecookie.
        Infostealers halen cookies en tokens uit de browser. In beide gevallen helpt MFA niet meer: de aanvaller
        hoeft niet aan te melden, hij is al aangemeld.</p>
        <h3>Toestemming voor apps</h3>
        <p>Een derde route is <em>consent phishing</em>: het slachtoffer geeft een kwaadaardige app via OAuth
        toestemming om namens hem mail te lezen. Die app heeft dan een eigen refresh token. Een wachtwoordreset raakt
        die toestemming niet. Je moet de toestemming voor de app zelf intrekken.</p>
        <h3>De volgorde bij een overgenomen account</h3>
        <ol>
          <li>Sessies en tokens intrekken en het account tijdelijk blokkeren.</li>
          <li>Wachtwoord resetten en MFA-methoden controleren: heeft de aanvaller er een toegevoegd?</li>
          <li>App-toestemmingen, doorstuurregels in de mailbox en nieuw geregistreerde apparaten nalopen.</li>
          <li>De aanmeldlogs terugkijken om te zien wat er met de tokens is gedaan.</li>
        </ol>
        <p>Korte levensduur van tokens, binding van tokens aan een apparaat en voorwaardelijke toegang die bij een
        risicosignaal opnieuw authenticatie eist, maken het venster kleiner. Ze vervangen het intrekken niet.</p>
      `,
      questions: [
        { q: 'In een fictieve configuratie leeft een access token 60 minuten. Een aanvaller krijgt er om 14:20 een uitgegeven. Om 14:35 reset je het wachtwoord, maar je trekt niets in. Tot hoe laat kan de aanvaller met dat access token de API aanroepen? (UU:MM)', answer: ['15:20', '15.20', '1520'],
          hints: ['Verandert een wachtwoordreset iets aan een access token dat al is uitgegeven?', 'Het token werkt tot het verloopt.', '14:20 plus 60 minuten.'],
          wrong: { '14:35': 'Dat zou kloppen als de reset het token ongeldig maakte. Dat doet een reset niet.', '15:35': 'Je rekent vanaf het moment van de reset. De levensduur loopt vanaf de uitgifte.' },
          explain: 'Tot 15:20. Daarna moet de aanvaller een nieuw access token halen, en met een refresh token lukt ook dat als je het niet intrekt.' },
        { q: 'Een medewerker gaf vorige week een onbekende app toestemming om haar mail te lezen. Vandaag reset je haar wachtwoord en trek je haar sessies in. Welke stap uit de volgorde hierboven haalt de app er pas echt uit? (stapnummer)', answer: ['3', 'stap 3', 'drie'],
          hints: ['Loop de vier stappen na. Welke heb je al gedaan?', 'Stap 1 en 2 zijn gedaan. Stap 4 is onderzoek, geen maatregel tegen de app.', 'De stap waarin je app-toestemmingen naloopt.'],
          wrong: { '1': 'Sessies intrekken raakt de sessies van de gebruiker, niet de eigen toestemming en het eigen refresh token van de app.', '4': 'Terugkijken in de logs is onderzoek. Het haalt de app er niet uit.', '2': 'Een wachtwoordreset verandert niets aan een toestemming die al is gegeven.' },
          explain: 'Stap 3: de app-toestemming intrekken. Pas dan verliest de app haar toegang tot de mailbox.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examens als Security+ en ISC2 CC toetsen IAM bijna altijd met een kort scenario: een organisatie, een
        probleem en vier maatregelen die allemaal iets goeds doen. Gevraagd wordt welke het <em>beste</em> past. De
        afleiders zijn maatregelen die op zichzelf zinnig zijn maar een ander probleem oplossen: een
        authenticatiemaatregel bij een autorisatieprobleem, of een detectiemaatregel waar preventie gevraagd wordt.
        Vraag je bij elke vraag eerst af: gaat dit over wie iemand is, wat iemand mag, of over controle achteraf?</p>
        <h3>Drie valkuilen</h3>
        <ul>
          <li><strong>Woorden die op elkaar lijken.</strong> Need-to-know en least privilege overlappen. Least
          privilege gaat over wat je mag <em>doen</em>, need-to-know over welke informatie je mag <em>zien</em>. Kijk
          in het scenario of het om handelingen of om inzage gaat.</li>
          <li><strong>OAuth tegenover OpenID Connect.</strong> Gaat de vraag over inloggen en wie de gebruiker is, dan
          is het OIDC (of SAML). Gaat het over een app die namens de gebruiker een API aanroept, dan is het OAuth.</li>
          <li><strong>Symptoom tegenover oorzaak.</strong> Bij "welke maatregel pakt dit het beste aan" wint de
          maatregel bij de bron: het moverproces, niet een extra review achteraf.</li>
        </ul>
        <p>Warm op met het lab: groepeer de zestien begrippen in vier groepen. De vijf vragen eronder zijn zelf
        geschreven in examenstijl. Alle organisaties zijn fictief.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien begrippen in vier groepen van vier.',
        groups: [
          { name: 'Standaarden voor identiteit', items: ['SAML 2.0', 'OpenID Connect', 'OAuth 2.0', 'SCIM'] },
          { name: 'Toegangsmodellen', items: ['RBAC', 'ABAC', 'DAC', 'MAC'] },
          { name: 'Beheer van hoge rechten', items: ['Just-in-time', 'Break-glass', 'Wachtwoordkluis', 'Sessie-opname'] },
          { name: 'Componenten uit NIST SP 800-207', items: ['Policy Engine', 'Policy Administrator', 'Policy Enforcement Point', 'Policy Decision Point'] },
        ],
      },
      questions: [
        { q: 'Bij een fictief ziekenhuis zien verpleegkundigen in het patiëntensysteem de dossiers van alle patiënten, ook van afdelingen waar ze niet werken. Welk principe wordt hier het duidelijkst geschonden?',
          options: ['Need-to-know', 'Functiescheiding', 'Multifactorauthenticatie', 'Accounting'], answer: 0,
          wrong: { 1: 'Functiescheiding gaat over taken die samen fraude mogelijk maken, zoals aanmaken en betalen. Hier gaat het om inzage.', 2: 'MFA versterkt de authenticatie. Het probleem is wat ze na het inloggen mogen zien.', 3: 'Logging helpt om misbruik achteraf te vinden, maar het probleem is dat de toegang er al is.' },
          explain: 'Ze hebben de rol "verpleegkundige" terecht, maar zien informatie die ze voor hun taak niet nodig hebben. Een ABAC-regel op afdeling of behandelrelatie lost dat op.' },
        { q: 'Een fictieve gemeente merkt bij een audit dat medewerkers die van afdeling wisselen hun oude rechten houden. Welke maatregel pakt de oorzaak het beste aan?',
          options: ['Jaarlijks een wachtwoordwijziging afdwingen', 'Bij een interne overstap de oude rollen automatisch intrekken, tenzij de nieuwe leidinggevende ze opnieuw aanvraagt', 'MFA verplicht stellen voor alle medewerkers', 'Alle accounts na 90 dagen inactiviteit uitschakelen'], answer: 1,
          wrong: { 0: 'Een nieuw wachtwoord verandert niets aan de rechten van het account.', 2: 'MFA bewijst beter wie iemand is. De overgebleven rechten blijven.', 3: 'Deze medewerkers zijn juist actief. Het probleem zit in het moverproces.' },
          explain: 'Privilege creep ontstaat bij de mover-stap. De oplossing hoort daar ook: intrekken als standaard, opnieuw toekennen als bewuste keuze.' },
        { q: 'Een fictief bedrijf wil dat beheerders alleen domeinrechten hebben op het moment dat ze die nodig hebben, voor een beperkte tijd en met vastlegging van de reden. Wat implementeren ze?',
          options: ['Role-based access control', 'Single sign-on', 'Just-in-time privileged access', 'Een break-glass-account per beheerder'], answer: 2,
          wrong: { 0: 'RBAC koppelt rechten aan rollen, maar zegt niets over tijdelijkheid. Een beheerder met de rol heeft de rechten permanent.', 1: 'SSO gaat over één keer inloggen voor meerdere applicaties, niet over tijdelijke rechten.', 3: 'Break-glass is voor noodgevallen, met een paar accounts voor de hele organisatie. Eén per beheerder vergroot juist het risico.' },
          explain: 'Just-in-time: de rol staat standaard uit, wordt op aanvraag voor een beperkte tijd toegekend en vervalt daarna vanzelf.' },
        { q: 'Een fictieve webwinkel laat klanten inloggen met een account van een externe identiteitsdienst. De webwinkel wil een ondertekend token waaruit blijkt wie de klant is. Welke standaard past het beste?',
          options: ['OAuth 2.0 zonder uitbreiding', 'OpenID Connect', 'SCIM', 'Kerberos'], answer: 1,
          wrong: { 0: 'OAuth 2.0 regelt gedelegeerde toegang tot een API. Het levert geen gestandaardiseerd bewijs van wie de gebruiker is.', 2: 'SCIM is voor het aanmaken en intrekken van accounts tussen systemen, niet voor aanmelden.', 3: 'Kerberos werkt binnen een eigen domein, niet voor federatie met een externe dienst via het web.' },
          explain: 'OpenID Connect voegt authenticatie toe aan OAuth 2.0 met een ondertekend ID-token.' },
        { q: 'Een fictieve organisatie heeft VPN, MFA en een firewall. Een aanvaller die via phishing een laptop heeft overgenomen, beweegt zich daarna vrij door het interne netwerk. Welke aanpak volgens NIST SP 800-207 had dat het meest beperkt?',
          options: ['Een sterkere VPN-versleuteling', 'Meer regels op de firewall aan de rand van het netwerk', 'Elk verzoek naar elke resource apart beoordelen op identiteit, apparaatstatus en beleid, ongeacht de netwerklocatie', 'Een tweede MFA-factor toevoegen'], answer: 2,
          wrong: { 0: 'Versleuteling beschermt het transport, niet tegen een aanvaller die al op een vertrouwd apparaat zit.', 1: 'De aanvaller zit al binnen de rand. Daar helpt een strengere rand niet.', 3: 'De aanvaller gebruikt de laptop die al is aangemeld. Een extra factor bij aanmelden verandert dat niet.' },
          explain: 'De kern van Zero Trust: de netwerklocatie geeft geen vertrouwen. Een overgenomen laptop krijgt alleen wat zijn identiteit en staat rechtvaardigen, per verzoek.' },
      ],
    },
  ],

  terms: [
    { term: 'Authenticatie', def: 'Vaststellen dat een gebruiker, apparaat of dienst is wie hij zegt te zijn.' },
    { term: 'Autorisatie', def: 'Bepalen wat een geauthenticeerde identiteit mag doen.' },
    { term: 'RBAC en ABAC', def: 'Toegangsmodellen: rechten via rollen (role-based), of via een regel die eigenschappen van gebruiker, object en omstandigheden weegt (attribute-based).' },
    { term: 'Least privilege', def: 'Iedereen krijgt de minimale rechten die nodig zijn voor het werk.' },
    { term: 'Functiescheiding', def: 'Segregation of duties: taken die samen fraude mogelijk maken, liggen bij verschillende personen.' },
    { term: 'Joiner, mover, leaver', def: 'De levenscyclus van een account: aanmaken bij indiensttreding, aanpassen bij een overstap, intrekken bij vertrek.' },
    { term: 'Federatie', def: 'Vertrouwensrelatie waarbij een applicatie de aanmelding overlaat aan een identity provider, ook over organisatiegrenzen heen, bijvoorbeeld met SAML 2.0 of OpenID Connect.' },
    { term: 'PAM', def: 'Privileged access management: het beheer van hoge rechten met kluis, jumphost, sessie-opname en just-in-time-toekenning.' },
    { term: 'Break-glass-account', def: 'Noodaccount voor als de normale toegang faalt; streng bewaard en elk gebruik geeft direct een alarm.' },
    { term: 'Zero Trust', def: 'Beveiligingsmodel waarin de netwerklocatie geen vertrouwen geeft en elk verzoek dynamisch wordt beoordeeld (NIST SP 800-207).' },
  ],

  resources: [
    { title: 'NIST SP 800-207: Zero Trust Architecture (2020)', url: 'https://csrc.nist.gov/pubs/sp/800/207/final' },
    { title: 'OpenID Foundation: OpenID Connect Core 1.0', url: 'https://openid.net/specs/openid-connect-core-1_0.html' },
    { title: 'OASIS: SAML 2.0-specificaties', url: 'https://docs.oasis-open.org/security/saml/v2.0/' },
  ],
});
