/* Uitdaging ★★★★: Een vertrouwd toestelnummer (zonder handleiding) */

// Alles FICTIEF: Zorggroep Vlietland, de medewerkers, toestelnummers, telefoonnummers en adressen zijn verzonnen.
CS.registerRoom({
  id: 'uitdaging-de-helpdeskbeller',
  path: 'uitdagingen',
  order: 12,
  title: '★★★★ Een vertrouwd toestelnummer',
  icon: '☎️',
  difficulty: 'Moeilijk',
  level: 'Expert',
  checked: '2026-11-12',
  minutes: 75,
  summary: 'Eerst zit je zelf aan de telefoon van de servicedesk, met een beller die haast heeft. Daarna krijg je de sporen van een ochtend waarop het wél misging. Welk account is overgenomen, en waar ging de controle mis?',
  objectives: [
    'Onder druk de juiste beslissingen nemen bij een verzoek om een MFA-reset',
    'Telefonie, servicedesktickets en aanmeldlogs combineren tot één verhaal',
    'Vaststellen welke controle faalde en waarom een getoond toestelnummer geen bewijs is',
  ],
  terms: [
    { term: 'Pretexting', def: 'Een aanvaller verzint een geloofwaardig verhaal (een rol, een noodsituatie) om iemand iets te laten doen wat hij anders niet zou doen.' },
    { term: 'Caller-ID-spoofing', def: 'Het getoonde nummer van een beller vervalsen. Via een externe telefoonlijn kan een aanvaller ook een intern toestelnummer laten zien.' },
    { term: 'Terugbelprocedure', def: 'De identiteit van een beller controleren door zelf terug te bellen naar een nummer uit een betrouwbare bron, zoals het HR-systeem.' },
    { term: 'MFA-reset', def: 'Het verwijderen of vervangen van de tweede factor van een account. Wie dat kan laten doen, omzeilt de extra beveiliging.' },
    { term: 'Inboxregel', def: 'Een regel in een mailbox die berichten verplaatst of doorstuurt. Aanvallers gebruiken ze om mail te verbergen of mee te lezen.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: T1656 Impersonation', url: 'https://attack.mitre.org/techniques/T1656/' },
    { title: 'MITRE ATT&CK: T1564.008 Email Hiding Rules', url: 'https://attack.mitre.org/techniques/T1564/008/' },
  ],
  tasks: [
    {
      title: 'Deel 1: aan de telefoon',
      content: `
        <p>Zorggroep Vlietland (fictief) heeft een servicedesk voor 2.400 medewerkers. Na een incident is er een oefening
        gemaakt. Jij zit vandaag aan de telefoon. Elke keuze heeft gevolgen voor wat er daarna gebeurt.</p>
      `,
      lab: {
        type: 'scenario',
        title: 'Servicedesk, dinsdag 07:50',
        scenario: 'Je bent servicedeskmedewerker bij Zorggroep Vlietland. Je mag wachtwoorden en MFA resetten, volgens de procedure. Alles is een oefening.',
        pass: 5,
        flag: 'NM{eerst_terugbellen}',
        steps: [
          { situation: 'De telefoon gaat. Op het display staat intern toestel 3318. "Goedemorgen, Hans Brouwer van het bestuurssecretariaat. Mijn telefoon is gisteren gestolen en ik kom niet meer in mijn mail. Kun je mijn MFA even opnieuw instellen? Ik heb om acht uur een vergadering."',
            choices: [
              { label: 'Het is een intern toestel, dus je zet de reset meteen in gang.', good: false, feedback: 'Een getoond nummer is geen bewijs. Via een externe lijn kan een beller elk nummer laten zien, ook een intern toestel. De beller heeft nu zonder controle een nieuwe tweede factor.' },
              { label: 'Je vraagt naar zijn personeelsnummer en geboortedatum en reset als die kloppen.', good: false, feedback: 'Kennisvragen zijn geen verificatie: een geboortedatum staat vaak online en een personeelsnummer staat op loonstroken en in mailhandtekeningen. De beller is binnen.' },
              { label: 'Je zegt dat je hem terugbelt op het nummer dat in het HR-systeem staat.', good: true, feedback: 'Terugbellen naar een nummer uit een betrouwbare bron haalt de controle uit handen van de beller. Je bepaalt zelf wie je aan de lijn krijgt.' },
            ] },
          { situation: '"Dat nummer is juist van de gestolen telefoon! Daar neemt niemand op. Kun je niet gewoon een uitzondering maken? Het is echt dringend."',
            choices: [
              { label: 'Je stelt voor dat zijn leidinggevende hem bevestigt via een nummer dat jij opzoekt, of dat hij met zijn pas langskomt bij de balie.', good: true, feedback: 'Een tweede, onafhankelijke route is precies waar een procedure voor een gestolen telefoon om vraagt. Haast is geen reden om die route over te slaan.' },
              { label: 'Je maakt een uitzondering, want een bestuurder laten wachten levert ook problemen op.', good: false, feedback: 'Tijdsdruk is het meest gebruikte middel van social engineering. De uitzondering is precies wat de beller wilde.' },
              { label: 'Je hangt op zonder iets vast te leggen.', good: false, feedback: 'Weigeren is goed, maar zonder ticket weet niemand dat er een poging was. De volgende collega trapt erin.' },
            ] },
          { situation: '"Ik ken je teamleider, Petra. Zij zal hier niet blij mee zijn. Geef me anders haar mobiele nummer, dan regel ik het met haar."',
            choices: [
              { label: 'Je geeft het mobiele nummer van Petra, dan kan zij beslissen.', good: false, feedback: 'Nu heeft de beller een nieuw doelwit en een naam om mee te schermen bij de volgende collega. Je lekt informatie.' },
              { label: 'Je blijft vriendelijk, zegt dat je Petra zelf inlicht, en dat de procedure voor iedereen geldt.', good: true, feedback: 'Je laat je niet onder druk zetten door autoriteit, en jij houdt de regie over wie wie belt.' },
              { label: 'Je doet de reset alsnog, want met de teamleider wil je geen ruzie.', good: false, feedback: 'Autoriteit inroepen is een klassieke techniek. Wie de procedure volgt, hoeft geen ruzie te vrezen.' },
            ] },
          { situation: 'De beller hangt geïrriteerd op. Het is 07:56.',
            choices: [
              { label: 'Er is niets gebeurd, dus je gaat door met de volgende melding.', good: false, feedback: 'Er is wel iets gebeurd: een poging. Zonder melding kan niemand zien dat dezelfde beller het straks bij een collega probeert.' },
              { label: 'Je zet de naam en het toestelnummer van de beller in de groepsapp van het team.', good: false, feedback: 'Goed bedoeld, maar buiten de vastgelegde kanalen. Er komt geen onderzoek en je verspreidt mogelijk de naam van een echte collega.' },
              { label: 'Je maakt een ticket met tijd, getoond nummer en verzoek, en meldt het bij het securityteam als mogelijke social engineering.', good: true, feedback: 'Zo kan het securityteam de telefonie nakijken, collega\'s waarschuwen en de echte Hans Brouwer bereiken.' },
            ] },
          { situation: 'Om 08:20 zegt een collega: "Hans Brouwer? Die heb ik om half acht geholpen met een nieuwe MFA." Je kijkt in het aanmeldlog en ziet een aanmelding van zijn account vanaf een onbekend adres.',
            choices: [
              { label: 'Je belt eerst Hans Brouwer op zijn HR-nummer en wacht af of hij terugbelt.', good: false, feedback: 'Navragen is nuttig, maar intussen werkt de aanvaller door. Eerst indammen, dan uitzoeken.' },
              { label: 'Je zet zijn wachtwoord opnieuw en mailt het tijdelijke wachtwoord naar zijn mailbox.', good: false, feedback: 'Die mailbox is waarschijnlijk in handen van de aanvaller. Je geeft hem het nieuwe wachtwoord.' },
              { label: 'Je schaalt direct op naar security: sessies intrekken, het nieuwe MFA-apparaat verwijderen, het account blokkeren en de mailbox nakijken.', good: true, feedback: 'Snel indammen beperkt de schade. Daarna volgt het onderzoek: wat deed het account na de overname?' },
            ] },
        ],
      },
      questions: [
        { q: 'Doorloop de oefening zonder fout. Welke vlag krijg je?', answer: ['NM{eerst_terugbellen}'],
          hints: ['Een fout is geen ramp: je kunt opnieuw beginnen.', 'Let bij elke keuze op wie de controle heeft: jij of de beller.', 'Goed is steeds de keuze waarbij jij een betrouwbare bron gebruikt, niets weggeeft, alles vastlegt en bij een overname eerst indamt.'],
          wrong: { '/^NM\\{/': 'Die vlag staat niet in deze oefening. Je krijgt hem pas als alle vijf keuzes goed zijn.' },
          why: 'Social engineering werkt met haast, autoriteit en behulpzaamheid. Een procedure die je in alle rust hebt geoefend, is onder druk je beste verdediging.',
          explain: 'Terugbellen naar het HR-nummer, een onafhankelijke tweede route, niets weggeven, alles vastleggen en melden, en bij een overname eerst indammen.' },
      ],
    },
    {
      title: 'Deel 2: maandag 9 november',
      content: `
        <p>Een week eerder ging het echt mis. Op maandag 9 november krijgt de afdeling crediteuren een mail van een
        afdelingshoofd met een nieuw rekeningnummer voor een vaste leverancier. Het securityteam heeft de telefonie, de
        servicedesktickets, het aanmeldlog en de audit van de mailserver van die ochtend in één tijdlijn gezet.</p>
        <p>Stel vast wat er gebeurde. Er is geen stappenplan. Alle tijden zijn UTC.</p>
      `,
      lab: {
        type: 'timeline',
        title: 'Zaak VLT-2026-031 · maandag 9 november',
        events: [
          { t: '2026-11-02 06:00:00', src: 'HR-rooster', user: 'r.dijkstra', desc: 'Verlof geregistreerd van 2 tot en met 13 november (afdelingshoofd financiën)' },
          { t: '2026-11-06 14:10:00', src: 'HR-rooster', user: 's.bakker', desc: 'Dienstreis Gent 9 tot en met 11 november (congres)' },
          { t: '2026-11-09 06:58:02', src: 'Aanmeldlog', user: 'j.verbeek', desc: 'Aanmelding geslaagd vanaf 10.30.4.22 (intern), MFA-push goedgekeurd' },
          { t: '2026-11-09 07:02:10', src: 'Telefonie', desc: 'Inkomend gesprek naar servicedesk toestel 1001 (l.vermeer) · getoond nummer 2301 · via intern · duur 2m50' },
          { t: '2026-11-09 07:06:30', src: 'Servicedesk', user: 'l.vermeer', desc: 'SD-8810 printer afdeling radiologie storing, doorgezet naar facilitair' },
          { t: '2026-11-09 07:41:05', src: 'Telefonie', desc: 'Inkomend gesprek naar servicedesk toestel 1001 (l.vermeer) · getoond nummer +32 470 00 18 22 · via externe trunk TRK-EXT-01 · duur 5m40' },
          { t: '2026-11-09 07:43:30', src: 'Servicedesk', user: 'l.vermeer', desc: 'SD-8812 aangemaakt: S. Bakker wil MFA overzetten naar nieuwe telefoon. Verificatie: teruggebeld op mobiel nummer uit HR-systeem, bevestigd' },
          { t: '2026-11-09 07:48:12', src: 'Servicedesk', user: 'l.vermeer', desc: 'SD-8812 MFA-methode van s.bakker vervangen' },
          { t: '2026-11-09 07:55:40', src: 'Aanmeldlog', user: 's.bakker', desc: 'Aanmelding geslaagd vanaf 203.0.113.18 (België), nieuw MFA-apparaat geregistreerd: iPhone (s.bakker)' },
          { t: '2026-11-09 07:58:20', src: 'Aanmeldlog', user: 'r.dijkstra', desc: 'Wachtwoord juist, MFA-push geweigerd door gebruiker · vanaf 198.51.100.73' },
          { t: '2026-11-09 07:59:41', src: 'Aanmeldlog', user: 'r.dijkstra', desc: 'Wachtwoord juist, MFA-push niet beantwoord · vanaf 198.51.100.73' },
          { t: '2026-11-09 08:03:15', src: 'Aanmeldlog', user: 'k.smits', desc: 'Aanmelding geslaagd vanaf 10.30.6.40 (intern), MFA-push goedgekeurd' },
          { t: '2026-11-09 08:12:33', src: 'Telefonie', desc: 'Inkomend gesprek naar servicedesk toestel 1002 (m.koster) · getoond nummer 2210 · via externe trunk TRK-EXT-02 · duur 6m05' },
          { t: '2026-11-09 08:19:02', src: 'Servicedesk', user: 'm.koster', desc: 'SD-8815 aangemaakt: R. Dijkstra (financiën), telefoon gestolen, verzoekt MFA-reset. Verificatie: personeelsnummer en geboortedatum juist genoemd, belde van intern toestel' },
          { t: '2026-11-09 08:20:47', src: 'Servicedesk', user: 'm.koster', desc: 'SD-8815 alle MFA-methoden van r.dijkstra verwijderd, tijdelijk wachtwoord ingesteld' },
          { t: '2026-11-09 08:24:15', src: 'Aanmeldlog', user: 'r.dijkstra', desc: 'Aanmelding geslaagd met tijdelijk wachtwoord vanaf 198.51.100.73, nieuw MFA-apparaat geregistreerd: Android (onbekend)' },
          { t: '2026-11-09 08:26:02', src: 'Mailserver', user: 'r.dijkstra', desc: 'Nieuwe inboxregel "RSS-archief": berichten met "factuur" of "betaling" naar map RSS-feeds verplaatsen en doorsturen naar r.dijkstra.fin@mailbox.example' },
          { t: '2026-11-09 08:31:40', src: 'Mailserver', user: 'r.dijkstra', desc: 'Verzonden aan crediteuren@vlietland.nm.lab: "Wijziging bankrekening leverancier Medisupply Oost"' },
          { t: '2026-11-09 08:40:12', src: 'Aanmeldlog', user: 's.bakker', desc: 'Aanmelding geslaagd vanaf 203.0.113.18 (België), MFA-push goedgekeurd op iPhone (s.bakker)' },
          { t: '2026-11-09 09:30:12', src: 'Telefonie', desc: 'Inkomend gesprek naar servicedesk toestel 1001 (l.vermeer) · getoond nummer 2214 · via intern · duur 3m02' },
          { t: '2026-11-09 09:33:20', src: 'Servicedesk', user: 'l.vermeer', desc: 'SD-8817 aangemaakt: L. Hoekstra wachtwoord vergeten. Verificatie: teruggebeld op toestel 2214 uit de telefoongids' },
          { t: '2026-11-09 09:34:05', src: 'Servicedesk', user: 'l.vermeer', desc: 'SD-8817 wachtwoord van l.hoekstra opnieuw ingesteld' },
          { t: '2026-11-09 09:36:48', src: 'Aanmeldlog', user: 'l.hoekstra', desc: 'Aanmelding geslaagd vanaf 10.30.2.14 (intern), MFA-push goedgekeurd' },
          { t: '2026-11-09 10:05:31', src: 'Mailserver', user: 'crediteuren', desc: 'Bericht "Wijziging bankrekening leverancier Medisupply Oost" doorgestuurd naar teamleider voor akkoord' },
          { t: '2026-11-09 10:22:09', src: 'Servicedesk', user: 'm.koster', desc: 'SD-8821 melding van crediteuren: rekeningwijziging lijkt verdacht, doorgezet naar security' },
        ],
      },
      questions: [
        { q: 'Welk account is overgenomen? (gebruikersnaam)', answer: ['r.dijkstra'],
          hints: ['Er werden die ochtend meerdere resets gedaan. Ze zijn niet allemaal verdacht.', 'Bekijk per reset wat er daarna met het account gebeurde: vanaf waar werd aangemeld, en wat deed het account toen?', 'Eén account is van iemand die die week niet werkt, en stuurt kort na de reset een mail over een bankrekening.'],
          wrong: { 's.bakker': 'Die meldt zich aan vanuit België, maar ze is volgens het rooster in Gent en de servicedesk heeft haar teruggebeld op haar nummer uit het HR-systeem.', 'l.hoekstra': 'Die reset is gecontroleerd met een terugbelactie naar het toestel uit de telefoongids, en de aanmelding komt van intern.', 'm.koster': 'Dat is de servicedeskmedewerker die de reset uitvoerde, niet het slachtoffer.' },
          why: 'Een aanmelding vanuit het buitenland is op zichzelf geen bewijs. Je beoordeelt een account op de combinatie: hoe de reset werd gecontroleerd, wat de context van de medewerker is, en wat het account daarna doet.',
          explain: 'r.dijkstra heeft verlof, maar na de reset van 08:20:47 meldt het account zich aan vanaf 198.51.100.73 met een onbekend Android-toestel, maakt een inboxregel die facturen verbergt en doorstuurt, en mailt crediteuren over een nieuwe bankrekening.' },
        { q: 'Op welk moment (UTC, UU:MM:SS) blijkt voor het eerst dat de aanvaller het wachtwoord van dat account al had?', answer: ['07:58:20', '7:58:20', '07:58', '075820'],
          hints: ['De reset gaf de aanvaller de tweede factor. Wat had hij daarvoor al?', 'Kijk in het aanmeldlog naar pogingen op dit account vóór het telefoongesprek.', 'Het wachtwoord was juist, maar de MFA-push werd geweigerd.'],
          wrong: { '08:24:15': 'Dat is de aanmelding met het tijdelijke wachtwoord na de reset. Er was een eerder spoor.', '08:12:33': 'Dat is het telefoongesprek. Het wachtwoord was al eerder bekend.' },
          why: 'Geweigerde MFA-pushes met een juist wachtwoord betekenen dat het wachtwoord gelekt is. Dat signaal had de reset kunnen tegenhouden als de servicedesk het had gezien.',
          explain: 'Om 07:58:20 en 07:59:41 klopt het wachtwoord van r.dijkstra vanaf 198.51.100.73, maar weigert de echte eigenaar de MFA-push of reageert niet. Een kwartier later belt de aanvaller de servicedesk om juist die tweede factor te laten verwijderen.' },
        { q: 'Welke controle faalde bij de reset die tot de overname leidde?', options: ['De servicedesk belde niet terug naar een bekend nummer en accepteerde kennisvragen en een getoond toestelnummer als bewijs', 'Het wachtwoordbeleid was te zwak', 'De firewall blokkeerde het adres van de aanvaller niet', 'De mailserver had geen virusscanner'], answer: 0,
          hints: ['Vergelijk de drie resets van die ochtend met elkaar.', 'Lees in de servicedesktickets per reset de regel over verificatie.', 'Bij twee resets werd teruggebeld naar een nummer uit een betrouwbare bron, bij de derde niet.'],
          wrong: { '1': 'Het wachtwoord was al gelekt en MFA hield de aanvaller tegen. Het misging pas toen MFA werd verwijderd.', '2': 'Een firewall beschermt geen cloudaanmelding met een geldig account. De fout zat in de identiteitscontrole.', '3': 'Er zat geen malware in het spel. Het ging om een overgenomen account.' },
          why: 'De servicedesk is de achterdeur van MFA. Een reset hoort minstens zo goed gecontroleerd te worden als de aanmelding die hij vervangt.',
          explain: 'Bij s.bakker en l.hoekstra werd teruggebeld naar een nummer uit een betrouwbare bron. Bij r.dijkstra niet: personeelsnummer en geboortedatum zijn te achterhalen, en een getoond toestelnummer zegt niets.' },
        { q: 'Welk toestelnummer zag de servicedesk op het display bij het gesprek dat tot de overname leidde?', boss: true, answer: ['2210'],
          hints: ['Werk terug: van het overgenomen account naar het ticket, en van het ticket naar het gesprek.', 'Het ticket noemt de servicedeskmedewerker en de tijd. Zoek in de telefonie het gesprek naar diens toestel dat vlak daarvoor eindigde.', 'Het gesprek kwam binnen via een externe trunk, terwijl het display een intern nummer van vier cijfers liet zien.'],
          wrong: { '2214': 'Dat is het toestel van L. Hoekstra. Dat gesprek kwam echt van intern en werd teruggebeld.', '1002': 'Dat is het toestel van de servicedesk zelf, dat het gesprek aannam.', '1001': 'Dat is het toestel van een andere servicedeskmedewerker.', '/^\\+?32/': 'Dat is het Belgische nummer van S. Bakker, die correct werd teruggebeld.' },
          why: 'Een intern nummer dat via een externe trunk binnenkomt, is een sterk signaal van spoofing. Veel telefooncentrales kunnen zulke gesprekken markeren of blokkeren.',
          explain: 'SD-8815 werd om 08:19:02 door m.koster aangemaakt. Het gesprek daarvoor naar toestel 1002 begon om 08:12:33 en duurde 6m05, tot 08:18:38. Getoond nummer 2210, maar binnengekomen via TRK-EXT-02: een extern gesprek dat zich voordeed als intern. Het ticket zegt "belde van intern toestel".' },
      ],
    },
  ],
});
