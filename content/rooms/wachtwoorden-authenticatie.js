/* Room: Wachtwoorden en authenticatie */

// Fictief auditlog van een personeelsportaal (taak 1): identificatie, authenticatie, autorisatie.
const WWA_AUDITLOG = `2026-11-03 08:01:12 IDENT user=a.bakker ip=192.0.2.14
2026-11-03 08:01:15 AUTHN user=a.bakker result=OK methode=wachtwoord+totp ip=192.0.2.14
2026-11-03 08:01:16 AUTHZ user=a.bakker rol=medewerker resource=/rooster result=ALLOW
2026-11-03 08:14:40 IDENT user=s.dekker ip=192.0.2.31
2026-11-03 08:14:44 AUTHN user=s.dekker result=FAIL reden=wachtwoord_onjuist ip=192.0.2.31
2026-11-03 08:14:59 AUTHN user=s.dekker result=FAIL reden=wachtwoord_onjuist ip=192.0.2.31
2026-11-03 08:15:21 AUTHN user=s.dekker result=OK methode=wachtwoord+totp ip=192.0.2.31
2026-11-03 08:15:22 AUTHZ user=s.dekker rol=medewerker resource=/rooster result=ALLOW
2026-11-03 08:47:03 IDENT user=t.visser ip=192.0.2.52
2026-11-03 08:47:07 AUTHN user=t.visser result=OK methode=wachtwoord+totp ip=192.0.2.52
2026-11-03 08:47:09 AUTHZ user=t.visser rol=medewerker resource=/rooster result=ALLOW
2026-11-03 08:49:30 AUTHZ user=t.visser rol=medewerker resource=/salaris result=DENY
2026-11-03 08:49:41 AUTHZ user=t.visser rol=medewerker resource=/salaris result=DENY
2026-11-03 09:02:10 IDENT user=admin ip=203.0.113.77
2026-11-03 09:02:11 AUTHN user=admin result=FAIL reden=onbekende_gebruiker ip=203.0.113.77
2026-11-03 09:02:13 IDENT user=beheer ip=203.0.113.77
2026-11-03 09:02:14 AUTHN user=beheer result=FAIL reden=onbekende_gebruiker ip=203.0.113.77
2026-11-03 09:02:16 IDENT user=a.bakker ip=203.0.113.77
2026-11-03 09:02:17 AUTHN user=a.bakker result=FAIL reden=wachtwoord_onjuist ip=203.0.113.77
2026-11-03 09:02:19 AUTHN user=a.bakker result=FAIL reden=wachtwoord_onjuist ip=203.0.113.77
2026-11-03 09:02:21 AUTHN user=a.bakker result=FAIL reden=wachtwoord_onjuist ip=203.0.113.77
2026-11-03 09:02:22 LOCKOUT user=a.bakker duur=15m
2026-11-03 09:30:05 IDENT user=stage-03 ip=192.0.2.88
2026-11-03 09:30:09 AUTHN user=stage-03 result=OK methode=wachtwoord ip=192.0.2.88
2026-11-03 09:30:11 AUTHZ user=stage-03 rol=beheerder resource=/beheer/gebruikers result=ALLOW
2026-11-03 09:31:02 AUTHZ user=stage-03 rol=beheerder resource=/salaris result=ALLOW
2026-11-03 10:05:44 IDENT user=m.elidrissi ip=192.0.2.60
2026-11-03 10:05:47 AUTHN user=m.elidrissi result=OK methode=wachtwoord+totp ip=192.0.2.60
2026-11-03 10:05:48 AUTHZ user=m.elidrissi rol=hr resource=/salaris result=ALLOW`;

CS.registerRoom({
  id: 'wachtwoorden-authenticatie',
  path: 'security-kern',
  order: 2,
  title: 'Wachtwoorden en authenticatie',
  icon: '🔑',
  difficulty: 'Makkelijk',
  minutes: 75,
  level: 'Instap',
  checked: '2026-11-12',
  summary: 'Van identificatie, authenticatie en autorisatie tot sterke wachtwoordzinnen, wachtwoordmanagers, MFA en passkeys.',
  objectives: [
    'Het verschil uitleggen tussen identificatie, authenticatie en autorisatie',
    'De drie authenticatiefactoren benoemen en voorbeelden geven',
    'Beschrijven wat een wachtwoord sterk maakt en waarom een wachtwoordmanager helpt',
    'Herkennen hoe aanvallers wachtwoorden kraken (brute force, woordenlijst, credential stuffing, spraying)',
    'Uitleggen waarom multifactor-authenticatie en passkeys de beveiliging sterk verbeteren',
  ],
  tasks: [
    {
      title: 'Taak 1 — Identificatie, authenticatie en autorisatie',
      tryFirst: true,
      intro: `<p>Hieronder staat het auditlog van een fictief personeelsportaal. Elke regel is één stap: <code>IDENT</code> (iemand noemt een naam), <code>AUTHN</code> (het bewijs wordt gecontroleerd) of <code>AUTHZ</code> (mag deze rol bij deze pagina?). Zoek uit wie waar strandt en beantwoord de vragen. Filteren kan op tekst of met een regex tussen slashes.</p>`,
      lab: { type: 'logs', title: 'portaal-audit.log (personeelsportaal, fictief)', lines: WWA_AUDITLOG },
      content: `
        <p>Drie woorden die op elkaar lijken maar echt iets anders betekenen. Als je ze uit elkaar houdt, snap je
        meteen hoe inloggen en toegang overal werken — van je laptop tot een bedrijfsnetwerk.</p>

        <h3>De analogie van het vliegveld</h3>
        <ul>
          <li><strong>Identificatie</strong> — je zegt wie je bent. Je laat je paspoort zien en claimt een identiteit.
          In IT is dit je gebruikersnaam of e-mailadres. Een claim, meer niet.</li>
          <li><strong>Authenticatie</strong> — je <em>bewijst</em> dat je het echt bent. De douanier controleert of de
          foto en de gegevens kloppen. In IT doe je dit met een wachtwoord, een code of je vingerafdruk.</li>
          <li><strong>Autorisatie</strong> — nadat je hebt bewezen wie je bent, wordt bepaald wat je <em>mag</em>.
          Met je ticket mag je het vliegtuig in, maar niet de cockpit. In IT: je rol en rechten (lezen, schrijven,
          beheren).</li>
        </ul>
        <div class="callout info">
          <strong>Onthoud de volgorde:</strong> eerst zeg je wie je bent (identificatie), dan bewijs je het
          (authenticatie), en pas daarna wordt bepaald wat je mag (autorisatie). Zonder bewezen identiteit kun je
          niets autoriseren.
        </div>

        <h3>AAA</h3>
        <p>In netwerk- en systeembeheer kom je vaak de afkorting <strong>AAA</strong> tegen: Authentication,
        Authorization en <strong>Accounting</strong>. Dat laatste, <em>accounting</em> (ook wel <em>auditing</em>),
        is het vastleggen van wat er gebeurt: wie logde wanneer in, wie wijzigde wat. Die logs zijn goud waard als er
        iets misgaat en je wilt uitzoeken wat er gebeurde.</p>

        <h3>Waarom dit onderscheid telt</h3>
        <p>Veel beveiligingsfouten zitten in de verwarring tussen deze drie. Een systeem dat iedereen die is
        ingelogd meteen álles laat doen, verwart authenticatie met autorisatie. Het principe
        <strong>least privilege</strong> (zo min mogelijk rechten) zegt: geef een gebruiker of proces alleen de
        rechten die strikt nodig zijn. Een goede authenticatie zonder nette autorisatie is als een streng gecontroleerde
        voordeur in een gebouw waar daarna alle binnendeuren openstaan.</p>
      `,
      questions: [
        { q: 'Welke gebruiker bewijst met succes wie hij is, maar wordt daarna toch geweigerd bij een pagina? (gebruikersnaam)', answer: ['t.visser', 'tvisser', 't visser'],
          hints: ['Je zoekt iemand bij wie de authenticatie slaagt en de autorisatie niet.', 'Filter op DENY en kijk of dezelfde gebruiker eerder een AUTHN met result=OK heeft.', 'De gebruiker vraagt twee keer /salaris op met de rol medewerker.'],
          wrong: { 's.dekker': 'Die typt twee keer een fout wachtwoord en komt daarna gewoon binnen. Dat is een probleem bij de authenticatie, en er wordt niets geweigerd.', 'a.bakker': 'Het account a.bakker wordt geblokkeerd na foute wachtwoorden vanaf een vreemd IP-adres. Dat strandt bij de authenticatie, niet bij de autorisatie.', 'stage-03': 'Bij stage-03 wordt juist alles toegestaan. Dat is een ander probleem, zie de laatste vraag.' },
          why: 'Wie authenticatie en autorisatie door elkaar haalt, bouwt systemen waarin "ingelogd" hetzelfde betekent als "mag alles".',
          explain: 't.visser logt correct in (AUTHN OK) en mag bij /rooster, maar krijgt twee keer DENY op /salaris. Bewezen identiteit is nog geen toestemming.' },
        { q: 'Hoeveel authenticatiepogingen mislukken er vanaf het IP-adres 203.0.113.77?', answer: ['5', 'vijf'],
          hints: ['Tel alleen de regels waarin het bewijs wordt gecontroleerd, niet de regels waarin een naam wordt genoemd.', 'Filter met /AUTHN.*FAIL.*203\\.0\\.113\\.77/ en lees de teller.', 'Twee pogingen op namen die niet bestaan, plus drie op een bestaand account.'],
          wrong: { '8': 'Je telt de IDENT-regels mee. Een naam noemen is identificatie; pas bij AUTHN wordt er iets gecontroleerd.', '3': 'Dat zijn alleen de pogingen op a.bakker. De pogingen op admin en beheer mislukken ook.', '7': 'Je telt ook de mislukte pogingen van s.dekker mee. Die komen van een ander IP-adres.' },
          explain: 'admin (1), beheer (1) en a.bakker (3). Daarna volgt de LOCKOUT: de dienst remt het online gokken af.' },
        { q: 'Waar staat de derde A in AAA voor, naast Authentication en Authorization?', answer: ['Accounting', 'accounting'], hint: 'Het gaat over het vastleggen/loggen van wat er gebeurt.', explain: 'Accounting (of auditing) legt vast wie wat wanneer deed — onmisbaar bij onderzoek.' },
        { q: 'Eén account heeft veel meer rechten dan bij de functie past, en logt ook nog in zonder tweede factor. Welk account?', answer: ['stage-03', 'stage03', 'stage 03'],
          hints: ['Kijk naar de combinatie van accountnaam, rol en methode.', 'Filter op rol=beheerder en lees de AUTHN-regel van dat account.', 'De naam wijst op een stagiair.'],
          wrong: { 'm.elidrissi': 'Die heeft de rol hr en vraagt /salaris op. Dat past bij de functie, en de login gebruikt wachtwoord plus TOTP.', 't.visser': 'Die wordt juist tegengehouden. Hier werkt de autorisatie zoals bedoeld.' },
          why: 'Een tijdelijk account met beheerrechten en alleen een wachtwoord is in de praktijk een van de makkelijkste ingangen voor een aanvaller.',
          explain: 'stage-03 heeft de rol beheerder, mag bij /beheer/gebruikers en /salaris, en logt in met alleen een wachtwoord. Dat botst met least privilege.' },
      ],
    },

    {
      title: 'Taak 2 — De drie authenticatiefactoren',
      tryFirst: true,
      intro: `<p>Sorteer de zestien kaartjes in vier groepen van vier. Drie groepen zijn de authenticatiefactoren; de vierde groep bestaat uit signalen die een dienst wel gebruikt, maar die geen factor zijn. Als alles klopt, krijg je een vlag.</p>`,
      lab: { type: 'connections', prompt: 'Vier groepen: iets wat je weet, iets wat je hebt, iets wat je bent, en context (geen factor).', flag: 'NM{drie_factoren_plus_context}',
        groups: [
          { name: 'Iets wat je weet', items: ['Pincode', 'Wachtwoordzin', 'Antwoord op een geheime vraag', 'Ontgrendelpatroon'] },
          { name: 'Iets wat je hebt', items: ['Hardwaresleutel', 'Bankpas', 'Authenticator-app', 'Smartcard'] },
          { name: 'Iets wat je bent', items: ['Vingerafdruk', 'Irisscan', 'Gezichtsscan', 'Stemherkenning'] },
          { name: 'Context (geen factor)', items: ['Land van het IP-adres', 'Tijdstip van inloggen', 'Onmogelijke reistijd', 'Nieuw type browser'] },
        ] },
      content: `
        <p>Authenticeren kan op drie fundamenteel verschillende manieren. We noemen ze de drie
        <strong>factoren</strong>. Ken je ze, dan begrijp je ook meteen waarom het combineren ervan zo krachtig is.</p>

        <table>
          <thead><tr><th>Factor</th><th>Betekenis</th><th>Voorbeelden</th></tr></thead>
          <tbody>
            <tr><td><strong>Iets wat je weet</strong></td><td>Kennis</td><td>Wachtwoord, pincode, wachtwoordzin</td></tr>
            <tr><td><strong>Iets wat je hebt</strong></td><td>Bezit</td><td>Telefoon met authenticator-app, hardwaresleutel, bankpas</td></tr>
            <tr><td><strong>Iets wat je bent</strong></td><td>Eigenschap (biometrie)</td><td>Vingerafdruk, gezichtsscan, iris</td></tr>
          </tbody>
        </table>

        <h3>Sterktes en zwaktes</h3>
        <ul>
          <li><strong>Iets wat je weet</strong> is goedkoop en flexibel, maar te raden, af te kijken, te phishen en
          te hergebruiken. Het zwakste van de drie als het alleen staat.</li>
          <li><strong>Iets wat je hebt</strong> moet een aanvaller fysiek bezitten of overnemen. Veel sterker, al kan
          een telefoon gestolen of (bij SMS) omgeleid worden.</li>
          <li><strong>Iets wat je bent</strong> is handig en moeilijk te vergeten, maar je kunt je vingerafdruk niet
          veranderen als die ooit lekt. Biometrie werkt het best als lokale ontgrendeling, niet als los wachtwoord
          dat over het netwerk gaat.</li>
        </ul>

        <div class="callout tip">
          <strong>Tip:</strong> het gaat om <em>verschillende</em> factoren. Twee wachtwoorden achter elkaar zijn
          nog steeds één factor ("iets wat je weet") en dus geen echte multifactor. Een wachtwoord plus een code uit
          een app zijn twee factoren: kennis én bezit.
        </div>

        <h3>Context als extra signaal</h3>
        <p>Moderne systemen kijken ook naar <em>context</em>: vanaf welk apparaat, welke locatie, welk tijdstip log
        je in? Dat heet <strong>risicogebaseerde</strong> of adaptieve authenticatie. Log je plots vanuit een ander
        land in op een onbekend apparaat, dan vraagt het systeem om een extra bewijs. Context is geen volwaardige
        vierde factor, maar wel een slim hulpmiddel.</p>
      `,
      questions: [
        { q: 'Welke vlag krijg je als alle vier de groepen kloppen?', answer: ['NM{drie_factoren_plus_context}'],
          hints: ['Begin met de groep die je zeker weet; wat overblijft wordt vanzelf kleiner.', 'Het lab meldt het als je er drie van de vier goed hebt. Wissel dan één kaartje.', 'De authenticator-app hoort bij "hebben": de code komt van een apparaat dat je bezit.'],
          explain: 'Een code uit een app bewijst bezit van het apparaat. Locatie, tijdstip en reistijd zijn context: nuttig als extra signaal, geen factor.' },
        { q: 'Een dienst vraagt bij het inloggen een wachtwoord, daarna een pincode en daarna het antwoord op een geheime vraag. Hoeveel verschillende factoren zijn dat?', answer: ['1'],
          hints: ['Tel geen stappen maar soorten bewijs.', 'Zoek de drie onderdelen op in de groepen van het lab.', 'Ze staan alle drie in dezelfde groep.'],
          wrong: { '3': 'Drie stappen, maar alle drie zijn iets wat je weet. Wie het ene kan afkijken of phishen, kan dat ook met de andere twee.', '2': 'Een pincode is ook kennis, geen bezit. Het wordt pas een tweede factor als er een apparaat of een lichaamskenmerk bij komt.' },
          explain: 'Alle drie zijn kennis, dus één factor. Echte MFA combineert verschillende soorten.' },
        { q: 'Welke factor is het lastigst te veranderen als hij ooit lekt?', options: ['Iets wat je bent (biometrie)', 'Iets wat je weet', 'Iets wat je hebt'], answer: 0, explain: 'Je kunt een wachtwoord of token vervangen, maar je vingerafdruk niet.' },
        { q: 'Hoe heet authenticatie die ook naar locatie, apparaat en tijdstip kijkt?', answer: ['risicogebaseerd', 'risicogebaseerde authenticatie', 'adaptief', 'adaptieve authenticatie'], hint: 'Het past de eisen aan op basis van het risico van de situatie.', explain: 'Risicogebaseerde (adaptieve) authenticatie vraagt extra bewijs bij verdachte context.' },
      ],
    },

    {
      title: 'Taak 3 — Sterke wachtwoorden en wachtwoordmanagers',
      tryFirst: true,
      intro: `<p>Typ in het lab achter elkaar: <code>Welkom01!</code>, daarna acht willekeurige kleine letters (bijvoorbeeld <code>qmzkrpte</code>) en daarna <code>paarse-kraan-fietst-maandag</code>. Noteer per wachtwoord de bits entropie en de geschatte kraaktijd. Wat maakt het grootste verschil: vreemde tekens of lengte?</p>`,
      content: `
        <p>Wachtwoorden verdwijnen voorlopig niet, dus laten we ze goed doen. Het oude advies ("minstens 8 tekens,
        een hoofdletter, een cijfer en een vreemd teken, en elke maand wijzigen") is achterhaald. Het leverde vooral
        wachtwoorden op die moeilijk te onthouden zijn voor mensen, maar makkelijk te raden voor computers
        (<code>Welkom01!</code>, iemand?).</p>

        <h3>Lengte verslaat complexiteit</h3>
        <p>Het aantal mogelijke wachtwoorden groeit explosief met de <strong>lengte</strong>, veel sneller dan met
        het toevoegen van vreemde tekens. Daarom raadt onder andere het NCSC <strong>wachtwoordzinnen</strong>
        (passphrases) aan: een reeks willekeurige woorden zoals <code>paarse-kraan-fietst-maandag</code>. Lang,
        goed te onthouden, en voor een computer enorm veel werk om te raden. Vermijd voorspelbare dingen: namen,
        geboortedata, <code>123456</code>, de bedrijfsnaam en toetsenbordrijtjes als <code>qwerty</code>.</p>

        <h3>Uniek per account</h3>
        <p>De belangrijkste regel: <strong>gebruik overal een ander wachtwoord</strong>. Waarom? Als één dienst
        gehackt wordt en jouw wachtwoord uitlekt, proberen aanvallers datzelfde wachtwoord automatisch bij tientallen
        andere diensten (dat heet <em>credential stuffing</em>, meer daarover in de volgende taak). Eén lek mag nooit
        al je accounts meesleuren.</p>

        <h3>De wachtwoordmanager</h3>
        <p>Niemand kan tientallen lange, unieke wachtwoorden onthouden — en dat hoeft ook niet. Een
        <strong>wachtwoordmanager</strong> genereert en bewaart ze versleuteld. Jij onthoudt nog maar één sterk
        <em>hoofdwachtwoord</em> (beveilig dat met MFA). Voordelen:</p>
        <ul>
          <li>Elk account krijgt automatisch een lang, willekeurig, uniek wachtwoord.</li>
          <li>Hij vult alleen in op het juiste domein — dat beschermt je tegen phishingsites met een lijkend adres.</li>
          <li>Veel managers waarschuwen als een wachtwoord in een bekend datalek voorkomt.</li>
        </ul>

        <div class="callout warn">
          <strong>Let op wat het lab meet:</strong> de schatting gaat ervan uit dat elk teken willekeurig is gekozen.
          Een wachtwoord dat een bekend patroon volgt (woord, hoofdletter vooraan, jaartal of cijfers, uitroepteken)
          valt in de praktijk veel sneller dan het getal doet vermoeden.
        </div>
      `,
      lab: { type: 'password' },
      questions: [
        { q: 'Typ Welkom01! in het lab. Hoeveel bits entropie meldt het lab?', answer: ['66', '66 bits'],
          hints: ['Het getal staat direct onder de balk.', 'Let op de hoofdletter W en het uitroepteken; typ het precies zo.', 'Tien tekens uit een set van 95: ruim zes en een half bit per teken.'],
          wrong: { '/^4[0-9]$/': 'Je mist waarschijnlijk de hoofdletter of het uitroepteken. Elke tekensoort vergroot de set waarmee het lab rekent.', '60': 'Dat is de uitkomst zonder uitroepteken. Typ het wachtwoord inclusief het laatste teken.' },
          why: 'Het lab noemt dit "redelijk", maar dit patroon staat vooraan in elke regelset van een kraker. Een entropiegetal zegt alleen iets over willekeurig gekozen tekens.',
          explain: '10 tekens × log2(95) is ongeveer 66 bits. Op papier redelijk, in de praktijk een van de eerste pogingen.' },
        { q: 'Wat is de belangrijkste reden om overal een ander wachtwoord te gebruiken?', options: ['Eén lek sleept dan niet al je andere accounts mee', 'Het staat netter', 'Het is sneller intypen'], answer: 0, explain: 'Hergebruik maakt credential stuffing mogelijk: één lek opent vele deuren.' },
        { q: 'Typ acht willekeurige kleine letters, bijvoorbeeld qmzkrpte. Welke kraaktijd schat het lab?', answer: ['27 seconden', '27', '27 sec', '27s'],
          hints: ['De kraaktijd staat onder het oordeel, bij 10 miljard pogingen per seconde.', 'Gebruik alleen kleine letters, precies acht stuks, en geen bestaand woord uit de lijst met veelgebruikte wachtwoorden.', 'Het antwoord is minder dan een halve minuut.'],
          wrong: { '/jaar|dag|uur/': 'Dan heb je meer dan acht tekens of meer tekensoorten getypt. Gebruik precies acht kleine letters.', 'direct': 'Je hebt een wachtwoord getypt dat in de lijst met veelgebruikte wachtwoorden staat. Neem acht willekeurige letters.' },
          explain: '26 tot de macht 8 is ruim 200 miljard mogelijkheden. Bij 10 miljard pogingen per seconde is de hele ruimte in ongeveer 27 seconden doorzocht.' },
        { q: 'Noem een voordeel van een wachtwoordmanager naast het bewaren van wachtwoorden.', options: ['Hij vult alleen in op het juiste domein en beschermt zo tegen phishing', 'Hij maakt je wachtwoorden korter', 'Hij deelt je wachtwoorden met andere sites'], answer: 0, explain: 'Omdat hij op domein controleert, trapt hij niet in een lijkend phishingadres.' },
        { q: 'Typ paarse-kraan-fietst-maandag in het lab. Hoeveel bits entropie meldt het lab?', answer: ['159', '159 bits'],
          hints: ['Typ de zin met de drie streepjes erbij.', 'Het getal staat direct onder de balk, naast het oordeel.', 'Het is ruim twee keer zo veel als bij Welkom01!.'],
          wrong: { '/^1[0-4][0-9]$/': 'Je hebt waarschijnlijk een streepje of een letter gemist. De zin telt 27 tekens.' },
          explain: '27 tekens leveren 159 bits op. Het lab rekent per teken; wie per woord rekent (vier willekeurige woorden uit een lijst van 7776) komt op ongeveer 52 bits. Lager, maar nog altijd veel beter dan een kort wachtwoord met een trucje.' },
      ],
    },

    {
      title: 'Taak 4 — Hoe wachtwoorden worden gekraakt',
      content: `
        <p>Om je wachtwoorden goed te beschermen, moet je weten hoe ze vallen. Vrijwel nooit "raadt" iemand jouw
        wachtwoord door het in te typen op het inlogscherm — daar zit meestal een limiet op pogingen op. Het echte
        werk gebeurt <em>offline</em>, nadat een aanvaller een database met gehashte wachtwoorden heeft buitgemaakt.</p>

        <h3>De belangrijkste aanvallen</h3>
        <ul>
          <li><strong>Brute force:</strong> systematisch alle combinaties proberen. Werkt alleen tegen korte
          wachtwoorden; bij voldoende lengte duurt het onhaalbaar lang.</li>
          <li><strong>Woordenlijstaanval (dictionary):</strong> een lijst van waarschijnlijke wachtwoorden afgaan —
          lekken uit het verleden, veelgebruikte woorden, namen. Veel sneller dan pure brute force omdat mensen
          voorspelbaar zijn.</li>
          <li><strong>Credential stuffing:</strong> gelekte combinaties van e-mail + wachtwoord uit de ene dienst
          automatisch uitproberen op tientallen andere. Pakt iedereen die wachtwoorden hergebruikt.</li>
          <li><strong>Password spraying:</strong> andersom — één veelvoorkomend wachtwoord (zoals
          <code>Welkom2025</code>) proberen op heel veel accounts. Zo ontwijk je de blokkade na een paar foute
          pogingen per account.</li>
          <li><strong>Phishing:</strong> het wachtwoord gewoon aan je vragen via een neppe inlogpagina. Technisch
          de minste moeite, vaak het meest succesvol.</li>
        </ul>

        <div class="callout info">
          <strong>Have I Been Pwned:</strong> op de dienst haveibeenpwned.com check je of jouw e-mailadres in een
          bekend datalek voorkomt. Zo ja: wijzig dat wachtwoord overal waar je het (her)gebruikte.
        </div>

        <h3>Verdediging</h3>
        <p>Aan de kant van de dienst helpen: wachtwoorden <strong>gesalt en langzaam gehasht</strong> opslaan (zie de
        cryptografie-room), <strong>rate limiting</strong> en account-lockout tegen online gokken, controle tegen
        bekende gelekte wachtwoorden, en vooral <strong>MFA</strong> (volgende taak). Aan jouw kant: lange, unieke
        wachtwoorden uit een manager.</p>

        <p>In het lab bootsen we een woordenlijstaanval na op een MD5-hash. Start de aanval en laat de tool de lijst
        aflopen. Welk wachtwoord hoort bij de hash?</p>
      `,
      lab: {
        type: 'hashcrack',
        algo: 'md5',
        hash: '2a4652cb030cfef3627fe1624e77ac16',
        salt: '',
        wordlist: ['123456', 'welkom', 'wachtwoord', 'qwerty', 'zomer2024', 'admin', 'liefde', 'voetbal'],
      },
      questions: [
        { q: 'Start de woordenlijstaanval in het lab. Welk wachtwoord hoort bij de hash?', answer: ['zomer2024'], hint: 'Laat de tool de hele lijst afgaan; één woord geeft precies dezelfde MD5.', explain: 'MD5 is snel, dus zo\'n lijst is in een oogwenk doorlopen — reden te meer voor langzame, gesalte hashes.' },
        { q: 'Een aanvaller probeert één populair wachtwoord op heel veel accounts. Hoe heet dat?', options: ['Password spraying', 'Brute force', 'Credential stuffing'], answer: 0, explain: 'Spraying mijdt de lockout per account door juist breed en ondiep te proberen.' },
        { q: 'Zet het lab op brute-force met alleen kleine letters (a tot z) en lengte 4. Hoeveel pogingen telt de volledige zoekruimte?', answer: ['456976', '456.976', '456,976'],
          hints: ['Elke positie heeft evenveel mogelijkheden; die vermenigvuldig je.', 'Kies de modus brute-force (masker) in het lab, of reken het zelf uit: 26 × 26 × 26 × 26.', 'Het is iets minder dan een half miljoen.'],
          wrong: { '104': 'Je hebt 26 × 4 gedaan. Bij elke extra positie vermenigvuldigt de ruimte zich; optellen is het niet.', '17576': 'Dat is 26 tot de macht 3, dus lengte 3.' },
          explain: '26 tot de macht 4 is 456.976. Elke extra kleine letter maakt de ruimte 26 keer zo groot; daarom wint lengte.' },
        { q: 'Een aanvaller probeert één wachtwoord op 500 accounts. De dienst blokkeert een account na 5 foute pogingen. Hoeveel accounts raken door deze ronde geblokkeerd?', answer: ['0', 'nul', 'geen'],
          hints: ['Tel het aantal foute pogingen per account, niet het totaal.', 'Elk account krijgt in deze ronde precies één poging.', 'Eén poging is minder dan vijf.'],
          wrong: { '500': 'Elk account krijgt maar één foute poging. De blokkade telt per account en komt pas bij vijf.', '100': '500 gedeeld door 5 klopt alleen als de pogingen op dezelfde accounts terechtkomen. Hier krijgt elk account er één.' },
          why: 'Password spraying blijft onder de lockout per account. Je ziet het alleen als je ook per bron-IP en per wachtwoord telt.',
          explain: 'Geen enkel account komt aan vijf pogingen. Lockout per account stopt brute force op één account, maar niet een brede, ondiepe aanval.' },
      ],
    },

    {
      title: 'Taak 5 — Multifactor-authenticatie en passkeys',
      tryFirst: true,
      intro: `<p>Na het inloggen geeft de aanmelddienst van het fictieve <code>idp.nm.lab</code> een sessietoken uit. In het lab staat zo'n token. Lees de claims: wie logde in, met welke methoden (de claim <code>amr</code>), en hoe lang is het token geldig? Beoordeel daarna hoe sterk deze login was.</p>`,
      lab: { type: 'jwt', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkcC5ubS5sYWIiLCJzdWIiOiJsLmhhZGRvdSIsInJvbCI6Im1lZGV3ZXJrZXIiLCJhbXIiOlsicHdkIiwic21zIl0sImlhdCI6MTc5NDIwOTQwMCwiZXhwIjoxNzk0MjUyNjAwfQ.I_lKvtsUep50BuYTSBSC_EYt34_1yD7za9-gtR4l0yk' },
      content: `
        <p>Zelfs het beste wachtwoord kan uitlekken of worden gephisht. De oplossing is een tweede slot op de deur:
        <strong>multifactor-authenticatie</strong> (MFA, ook wel 2FA voor twee factoren). Je combineert twee
        verschillende factoren, zodat een gestolen wachtwoord alleen niet genoeg is.</p>

        <h3>Vormen van MFA, van zwak naar sterk</h3>
        <ul>
          <li><strong>SMS-code:</strong> beter dan niets, maar het zwakst. SMS is te onderscheppen en kwetsbaar voor
          <em>SIM-swapping</em> (een aanvaller laat jouw nummer naar zijn simkaart overzetten).</li>
          <li><strong>Authenticator-app (TOTP):</strong> je app genereert elke 30 seconden een code op basis van een
          gedeeld geheim en de tijd. Veel sterker dan SMS en gratis. Nadeel: je kunt een TOTP-code nog steeds op een
          phishingsite intypen.</li>
          <li><strong>Hardwaresleutel / passkey (FIDO2):</strong> de sterkste optie. Een fysieke sleutel of een in je
          apparaat ingebouwde beveiligingschip doet aan cryptografische uitdaging-antwoord en is gebonden aan het
          echte domein.</li>
        </ul>

        <h3>Passkeys: inloggen zonder wachtwoord</h3>
        <p>Een <strong>passkey</strong> (gebaseerd op de FIDO2/WebAuthn-standaard) vervangt het wachtwoord helemaal.
        Onder de motorkap is het gewoon asymmetrische cryptografie uit de vorige room: bij het aanmaken genereert je
        apparaat een <strong>sleutelpaar</strong>. De <em>publieke</em> sleutel gaat naar de dienst; de
        <em>private</em> sleutel verlaat je apparaat nooit en ontgrendel je lokaal met je vingerafdruk, gezicht of
        pincode. Inloggen gaat dan zo: de dienst stuurt een uitdaging, jouw apparaat ondertekent die met de private
        sleutel, de dienst controleert met de publieke sleutel.</p>
        <div class="callout tip">
          <strong>Waarom passkeys phishing-bestendig zijn:</strong> de passkey is vastgeklonken aan het echte domein
          en er wordt nooit een geheim verstuurd dat je per ongeluk op een nepsite kunt intypen. Een gekloonde
          inlogpagina krijgt simpelweg geen geldige handtekening los.
        </div>

        <h3>Nog even dit</h3>
        <p>Zet MFA in elk geval aan op je belangrijkste accounts: e-mail (want via "wachtwoord vergeten" opent dat
        vaak al je andere accounts), je wachtwoordmanager, bankieren en werkaccounts. En let op
        <strong>MFA-moeheid</strong>: aanvallers die je wachtwoord al hebben, sturen soms een stroom push-meldingen
        in de hoop dat je per ongeluk op "goedkeuren" tikt. Keur nooit een melding goed die je niet zelf hebt
        gestart.</p>

        <h3>Wat een sessietoken over de login vertelt</h3>
        <p>Veel diensten leggen in het token vast <em>hoe</em> iemand is ingelogd. De claim <code>amr</code>
        (Authentication Methods References, RFC 8176 uit 2017) is een lijstje met afkortingen: <code>pwd</code> voor een
        wachtwoord, <code>otp</code> voor een eenmalige code uit een app, <code>hwk</code> voor een sleutel in hardware.
        De claims <code>iat</code> en <code>exp</code> geven aan wanneer het token is uitgegeven en wanneer het verloopt.
        Een token is gecodeerd, niet versleuteld: iedereen die het in handen krijgt, kan de inhoud lezen.</p>
      `,
      questions: [
        { q: 'Welke MFA-vorm is het sterkst en phishing-bestendig?', options: ['Passkey / hardwaresleutel (FIDO2)', 'SMS-code', 'E-mailcode'], answer: 0, explain: 'FIDO2-passkeys zijn aan het domein gebonden en versturen geen geheim dat je kunt afstaan.' },
        { q: 'Hoeveel uur is het sessietoken in het lab geldig? (exp min iat)', answer: ['12', '12 uur', 'twaalf'],
          hints: ['Het lab zet iat en exp om naar een leesbare datum en tijd in UTC.', 'Trek de twee tijden van elkaar af.', 'Uitgegeven om 07:30 UTC, verlopen om 19:30 UTC op dezelfde dag.'],
          wrong: { '43200': 'Dat is het verschil in seconden. Deel door 3600 voor uren.', '720': 'Dat zijn minuten. Gevraagd is het aantal uren.' },
          explain: 'exp min iat is 43.200 seconden, dus 12 uur. Wie het token in die tijd steelt, heeft geen wachtwoord of tweede factor meer nodig.' },
        { q: 'Welke sleutel van een passkey verlaat je apparaat nooit?', options: ['De private sleutel', 'De publieke sleutel', 'Allebei'], answer: 0, explain: 'Alleen de publieke sleutel gaat naar de dienst; de private blijft lokaal.' },
        { q: 'Je krijgt onverwacht push-meldingen om een login goed te keuren terwijl je zelf niets doet. Wat doe je?', options: ['Afwijzen; iemand probeert via MFA-moeheid binnen te komen', 'Goedkeuren, dan houdt het op', 'Negeren en je wachtwoord laten staan'], answer: 0, explain: 'Keur nooit een melding goed die je niet zelf startte; wijzig daarna je wachtwoord.' },
        { q: 'Op welk account zet je MFA als eerste aan omdat het via "wachtwoord vergeten" veel andere accounts kan openen?', answer: ['e-mail', 'email', 'e-mailaccount', 'mail'], hint: 'Het is het account waar herstel-mails binnenkomen.', explain: 'Je e-mail is de hoofdsleutel tot herstel van veel andere accounts; beveilig die het best.' },
        { q: 'Welke waarde in de claim amr van het token staat voor de tweede factor van deze login?', answer: ['sms'],
          hints: ['De claim amr is een lijstje met twee afkortingen.', 'De eerste afkorting staat voor het wachtwoord; je zoekt de andere.', 'Het is de zwakste vorm uit het rijtje in de uitleg.'],
          wrong: { 'pwd': 'Dat is het wachtwoord, de eerste factor.', 'otp': 'Dat zou een code uit een app zijn. In dit token staat een andere afkorting.', 'medewerker': 'Dat is de rol (autorisatie). Gevraagd is de methode van inloggen.' },
          explain: 'amr is ["pwd","sms"]: wachtwoord plus een code per sms. Twee factoren, maar de tweede is te onderscheppen en gevoelig voor SIM-swapping.' },
        { q: 'Het token is ondertekend met HS256 en een zwak geheim: een van de woorden uit de woordenlijst van taak 4. Welk geheim maakt de handtekening geldig?', boss: true, answer: ['liefde'],
          hints: ['Een handtekening met een gedeeld geheim is te controleren door iedereen die het geheim raadt.', 'Het lab heeft een veld om een HS256-handtekening met een vermoedelijk geheim te controleren.', 'Loop de acht woorden van de woordenlijst een voor een af; het is niet het wachtwoord dat je in taak 4 kraakte.'],
          wrong: { 'zomer2024': 'Dat was het wachtwoord achter de MD5-hash in taak 4. Het lab meldt dat de handtekening hiermee niet klopt.', 'sms': 'Dat is een claim in het token. Gevraagd is het geheim waarmee het token is ondertekend.' },
          why: 'Wie het geheim kent, kan zelf tokens maken met een andere gebruiker, een andere rol of een amr die sterker lijkt. Een geheim uit een woordenlijst maakt de hele login waardeloos.',
          explain: 'Met het geheim "liefde" klopt de handtekening. Een woordenlijstaanval werkt dus net zo goed op een tokengeheim als op een wachtwoordhash.' },
      ],
    },

    {
      title: 'Taak 6 — Verdieping: wat een entropiegetal waard is en hoe TOTP rekent',
      kind: 'verdieping', optional: true,
      content: `
        <p>Het lab in taak 3 rekent simpel: lengte maal het aantal bits per teken. Dat klopt alleen als elk teken
        willekeurig is gekozen. Mensen kiezen niet willekeurig, en krakers weten dat. Ze beginnen met gelekte
        wachtwoorden, dan woordenlijsten met regels (hoofdletter vooraan, jaartal erachter, a wordt @), en pas
        daarna brute force. Een wachtwoord als <code>Welkom01!</code> heeft op papier 66 bits, maar zit in de eerste
        minuut van zo'n aanval.</p>

        <h3>Rekenen aan een wachtwoordzin</h3>
        <p>Bij een wachtwoordzin reken je eerlijker per woord. De bekende Diceware-methode gebruikt een lijst van
        7776 woorden (vijf dobbelstenen: 6 tot de macht 5). Eén willekeurig woord levert log2(7776), ongeveer
        12,9 bits. Vier woorden geven dus ruim 51 bits. Dat geldt alleen als de woorden echt door toeval zijn
        gekozen; een zin die je zelf bedenkt, is voorspelbaarder.</p>

        <h3>Wat de richtlijnen zeggen</h3>
        <p>NIST SP 800-63B (revisie 3, 2017) brak met het oude beleid: geen verplichte mix van tekensoorten, geen
        verplichte periodieke wijziging zonder aanwijzing van een lek, wel een minimumlengte, ruimte voor lange
        wachtwoorden (minstens 64 tekens toestaan) en een controle van nieuwe wachtwoorden tegen lijsten met gelekte
        en veelgebruikte wachtwoorden. Geheime vragen ("de naam van je eerste huisdier") mag een dienst volgens die
        richtlijn niet gebruiken. De vierde revisie uit 2025 houdt die lijn vast.</p>

        <h3>Hoe TOTP echt werkt</h3>
        <p>TOTP (RFC 6238, 2011) is geen magie. App en server delen één geheim, uitgewisseld via de QR-code. Beide
        delen de Unix-tijd door 30, nemen een HMAC van dat getal met het geheim en knippen daar een code van meestal
        zes cijfers uit. Omdat klokken niet precies gelijk lopen, accepteren veel servers ook de code van het
        tijdvak ervoor en erna.</p>
        <ul>
          <li><strong>Het geheim staat ook op de server.</strong> Lekt die database, dan kan de aanvaller alle codes
          zelf berekenen. Bij een passkey staat op de server alleen een publieke sleutel.</li>
          <li><strong>De code is niet aan het domein gebonden.</strong> Een nepsite kan de code in real time
          doorsturen naar de echte site. Daarom is TOTP niet phishing-bestendig.</li>
          <li><strong>Herstel is de zwakke plek.</strong> Reservecodes op een briefje, een helpdesk die MFA uitzet na
          een telefoontje, of terugvallen op sms: aanvallers kiezen de zwakste route, niet de sterkste.</li>
        </ul>

        <h3>Veelgemaakte fouten</h3>
        <ul>
          <li>Een lang geldig sessietoken na een sterke login. Dan steelt de aanvaller het token in plaats van het
          wachtwoord.</li>
          <li>Lockout per account zonder te tellen per bron-IP: spraying blijft dan onzichtbaar, en een aanvaller
          kan bovendien bewust accounts van anderen laten blokkeren.</li>
          <li>Biometrie zien als geheim. Een vingerafdruk ontgrendelt lokaal een sleutel; hij hoort niet als
          wachtwoord over het netwerk te gaan.</li>
        </ul>
      `,
      questions: [
        { q: 'Een TOTP-code heeft zes cijfers. Hoeveel verschillende codes zijn er mogelijk?', answer: ['1000000', '1.000.000', '1 miljoen', '10^6', 'een miljoen'],
          hints: ['Elke positie is een cijfer van 0 tot en met 9.', 'Vermenigvuldig het aantal mogelijkheden per positie, zes keer.', 'Een 1 met zes nullen.'],
          wrong: { '60': 'Je hebt 6 × 10 gedaan. De mogelijkheden per positie vermenigvuldig je met elkaar.', '999999': 'Bijna: 000000 is ook een geldige code.' },
          explain: '10 tot de macht 6. Dat is weinig, en daarom moet de server het aantal pogingen per tijdvak beperken.' },
        { q: 'Een server accepteert de code van het huidige tijdvak van 30 seconden, plus het tijdvak ervoor en erna. Hoeveel seconden is één code dan in totaal bruikbaar?', answer: ['90', '90 seconden'],
          hints: ['Tel de tijdvakken waarin dezelfde code wordt geaccepteerd.', 'Drie tijdvakken van elk 30 seconden.', 'Anderhalve minuut.'],
          wrong: { '30': 'Dat is één tijdvak. De server accepteert er hier drie.', '60': 'Je telt twee tijdvakken; het zijn het vorige, het huidige en het volgende.' },
          explain: '3 × 30 = 90 seconden. Ruim genoeg voor een nepsite die de code direct doorstuurt.' },
        { q: 'Hoeveel woorden uit een lijst van 7776 heb je minimaal nodig voor een willekeurige wachtwoordzin van meer dan 75 bits?', answer: ['6'],
          hints: ['Eén woord levert ongeveer 12,9 bits.', 'Deel 75 door 12,9 en rond naar boven af.', 'Vijf woorden komen uit op ongeveer 64,6 bits; dat is net te weinig.'],
          wrong: { '5': 'Vijf woorden geven ongeveer 64,6 bits. Dat haalt de 75 niet.', '4': 'Vier woorden geven ruim 51 bits.' },
          explain: '6 × 12,9 is ongeveer 77,5 bits.' },
      ],
    },

    {
      title: 'Taak 7 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examens over security vragen zelden naar een definitie. Je krijgt een korte situatie en moet kiezen wat er
        aan de hand is of wat de beste maatregel is. Vaak zijn meerdere antwoorden niet onzinnig; je zoekt het antwoord
        dat het best bij de gegevens past. Lees eerst wat er precies gevraagd wordt, streep dan weg wat aantoonbaar
        niet klopt.</p>
        <p>De vier vragen hieronder zijn voor deze room geschreven, in de stijl van zulke examens.</p>
      `,
      questions: [
        { q: 'Een beheerder ziet in een uur tijd 400 mislukte aanmeldingen vanaf één IP-adres: op 400 verschillende accounts, telkens één poging. Geen enkel account is geblokkeerd. Welke aanval past hier het best bij?',
          options: ['Brute force op één account', 'Credential stuffing', 'Password spraying', 'Een rainbow-table-aanval'], answer: 2,
          wrong: { 0: 'Bij brute force krijgt één account heel veel pogingen en zou de lockout afgaan. Hier krijgt elk account er één.', 1: 'Verleidelijk, want ook daar zie je veel accounts. Maar bij credential stuffing hoort bij elk account een eigen gelekt wachtwoord en er is meestal geen reden om bij één poging te stoppen. Eén poging per account, onder de lockout, is het patroon van spraying.', 3: 'Een rainbow table gebruik je offline op buitgemaakte hashes. Die aanval zie je niet in een aanmeldlog.' },
          explain: 'Breed en ondiep: weinig pogingen per account, veel accounts, zodat de blokkade per account niet afgaat.' },
        { q: 'Een organisatie wil voor haar beheerders een tweede factor die ook standhoudt als een beheerder op een overtuigende nepsite inlogt. Welke keuze voldoet?',
          options: ['Een code per sms', 'Een TOTP-code uit een authenticator-app', 'Een pushmelding waarbij je een getal moet overtypen', 'Een FIDO2-hardwaresleutel'], answer: 3,
          wrong: { 0: 'Een sms-code kun je op de nepsite intypen, en sms is daarnaast te onderscheppen.', 1: 'Sterker dan sms, maar de code is niet aan het domein gebonden. De nepsite stuurt hem direct door.', 2: 'Het overtypen van een getal helpt tegen MFA-moeheid, maar de nepsite kan de echte login starten en het getal tonen. De gebruiker keurt dan zelf de login van de aanvaller goed.' },
          explain: 'Alleen FIDO2 (WebAuthn) bindt de handtekening aan het echte domein. Op een ander domein komt er geen geldige handtekening.' },
        { q: 'Een stagiair logt in met zijn eigen account en een tweede factor. Daarna blijkt hij de salarisgegevens van alle collega\'s te kunnen openen. Welk onderdeel is hier niet op orde?',
          options: ['Identificatie', 'Authenticatie', 'Autorisatie', 'Accounting'], answer: 2,
          wrong: { 0: 'De stagiair gebruikt zijn eigen naam; de claim klopt.', 1: 'Het bewijs is in orde, zelfs met een tweede factor. Dat maakt deze afleider verleidelijk: sterke authenticatie voelt als goede beveiliging, maar zegt niets over wat iemand daarna mag.', 3: 'Accounting legt vast wat er gebeurt. Dat kan hier prima werken; het probleem is dat de toegang wordt verleend.' },
          explain: 'De rechten zijn te ruim: een schending van least privilege, en dat is autorisatie.' },
        { q: 'Een bedrijf herziet zijn wachtwoordbeleid en wil aansluiten bij NIST SP 800-63B (revisie 3, 2017). Welke maatregel past daarbij?',
          options: ['Elke 90 dagen een verplichte wachtwoordwijziging voor iedereen', 'Minimaal één hoofdletter, één cijfer en één leesteken verplichten', 'Nieuwe wachtwoorden toetsen aan een lijst met gelekte wachtwoorden en lange wachtwoordzinnen toestaan', 'Geheime vragen invoeren als herstelmethode'], answer: 2,
          wrong: { 0: 'De richtlijn raadt verplichte periodieke wijziging af; wijzigen hoort bij een aanwijzing dat het wachtwoord is gelekt. Gedwongen wisselen levert voorspelbare reeksen op (Zomer2026, Herfst2026).', 1: 'Samenstellingsregels raadt de richtlijn af. Ze leiden tot patronen als Welkom01! die krakers als eerste proberen.', 3: 'Antwoorden op geheime vragen zijn vaak op te zoeken of te raden. De richtlijn staat ze niet toe.' },
          explain: 'Lengte toestaan en toetsen tegen bekende lekken: dat pakt de wachtwoorden aan die echt als eerste vallen.' },
      ],
    },
  ],
  terms: [
    { term: 'Identificatie', def: 'Claimen wie je bent, bijvoorbeeld met een gebruikersnaam of e-mailadres; nog zonder bewijs.' },
    { term: 'Authenticatie', def: 'Bewijzen dat je echt bent wie je claimt, met een wachtwoord, code of biometrie.' },
    { term: 'Autorisatie', def: 'Bepalen wat een bewezen gebruiker mag doen: zijn rechten en rol.' },
    { term: 'AAA', def: 'Authentication, Authorization en Accounting: authenticeren, rechten toekennen en vastleggen wat er gebeurt.' },
    { term: 'Authenticatiefactor', def: 'Een soort bewijs: iets wat je weet, iets wat je hebt, of iets wat je bent.' },
    { term: 'Multifactor-authenticatie (MFA)', def: 'Twee of meer verschillende factoren combineren, zodat een gestolen wachtwoord alleen niet volstaat.' },
    { term: 'TOTP', def: 'Time-based One-Time Password: code die een authenticator-app elke 30 seconden genereert uit een gedeeld geheim en de tijd.' },
    { term: 'Passkey (FIDO2/WebAuthn)', def: 'Wachtwoordloze login met een sleutelpaar; de private sleutel blijft op je apparaat en is gebonden aan het echte domein.' },
    { term: 'Wachtwoordmanager', def: 'Programma dat lange, unieke wachtwoorden genereert en versleuteld bewaart achter één hoofdwachtwoord.' },
    { term: 'Wachtwoordzin (passphrase)', def: 'Een lang wachtwoord van meerdere woorden; goed te onthouden en lastig te kraken door de lengte.' },
    { term: 'Brute force', def: 'Systematisch alle mogelijke wachtwoorden proberen; alleen haalbaar tegen korte wachtwoorden.' },
    { term: 'Woordenlijstaanval', def: 'Een lijst van waarschijnlijke wachtwoorden afgaan in plaats van alle combinaties; sneller omdat mensen voorspelbaar zijn.' },
    { term: 'Credential stuffing', def: 'Gelekte e-mail/wachtwoord-combinaties automatisch op andere diensten uitproberen; werkt door hergebruik.' },
    { term: 'Password spraying', def: 'Eén veelvoorkomend wachtwoord op veel accounts proberen om lockout per account te ontwijken.' },
  ],
  resources: [
    { title: 'NCSC — Advies sterke wachtwoorden', url: 'https://www.ncsc.nl/onderwerpen/weerbaarheid/wachtwoorden' },
    { title: 'Have I Been Pwned — check je e-mail op datalekken', url: 'https://haveibeenpwned.com/' },
    { title: 'OWASP — Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
    { title: 'FIDO Alliance — uitleg over passkeys', url: 'https://fidoalliance.org/passkeys/' },
  ],
});
