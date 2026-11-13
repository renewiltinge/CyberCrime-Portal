# Prompt: Cyber Dojo leuker, uitdagender en spannender maken

Kopieer alles onder de streep als opdracht voor Fable (of een andere agent) in deze repository.

---

## Rol en doel

Je bent een senior security-trainer, game designer en front-end engineer in één. Je werkt aan **Cyber Dojo**, het Nederlandstalige cybersecurity-leerportaal van NineMinds (statische site: HTML, CSS, JS, geen server, geen build). Het portaal is inhoudelijk breed en sterk (88 rooms, 11 leerpaden, ruim 50 interactieve labs, een eigen validator en browsertests). Het is nu vooral een **goed naslagwerk met oefeningen**. Jouw taak is het te veranderen in iets waar mensen **uit zichzelf voor terugkomen**: leren door te doen, door te winnen, door vast te zitten en dan door te breken.

Naast leuker moet het ook **zwaarder en completer** worden: wie het portaal volledig doorwerkt, moet op het niveau zitten dat een opleiding of certificering van je verwacht. Leuk én diep, geen van beide ten koste van de ander.

Leidend principe: **elke minuut leesstof moet binnen enkele minuten worden gevolgd door iets waarbij de leerling zelf iets moet doen, ontdekken of kraken.** Beloning komt uit het bereiken van inzicht, niet uit het aanklikken van dingen.

## Eerst lezen (verplicht, voordat je iets wijzigt)

1. `README.md`, `DESIGN.md`, `docs/CONTENT-SPEC.md` en `docs/adr/0001-*.md`. De huisstijlregels zijn bindend (zie "Randvoorwaarden").
2. `assets/js/app.js` (engine: routering, voortgang, XP, badges, oefenarena, scorebord) en `assets/js/labs.js` (alle labs, `LABS`-registratie, terminal-emulator).
3. Drie rooms van verschillend type om het niveau te voelen: `content/rooms/uitdaging-het-lege-bureau.js` (beste voorbeeld van "zonder handleiding"), `content/rooms/cybercrime-ctf.js` (capstone) en een gewone lesroom zoals `content/rooms/netwerken-basis.js`.
4. `tools/validate.js`, `tools/smoke.js`, `tools/labtest*.js`. Draai `node tools/validate.js` en `node tools/smoke.js` zodat je weet wat groen is vóór je begint.

Schrijf daarna een **kort auditverslag** (`docs/audit-leerervaring.md`, max. 2 pagina's) met je eigen bevindingen. Hieronder staan mijn bevindingen als vertrekpunt; bevestig, weerleg of vul aan.

## Bevindingen van de scan (vertrekpunt)

**Sterk**
- Brede, inhoudelijk degelijke stof, goed Nederlands, juridisch en ethisch verantwoord (art. 138ab Sr, fictieve bedrijven).
- Veel echte labs in de browser (terminal, CyberChef, hash-kraker, pakketanalyse, JWT, YARA, tijdlijn, RSA, Vigenère, assembler-VM, Bayes, Benford).
- Het leerpad "Uitdagingen (zonder handleiding)" en de Meesterproeven laten zien dat het kan: antwoorden staan nergens in de tekst, hints zijn bewust vaag.
- Mooie, consistente huisstijl en goede toegankelijkheid (reduced motion, kleur nooit enig signaal).

**Zwak of ontbrekend**
1. **Spelbeleving is dun.** XP, 15 badges, levels en een streak in de Oefenarena. Geen verhaal, geen inzet, geen rangen, geen dagelijkse reden om terug te komen, geen gevoel van "ik zit er echt in".
2. **Te veel lezen vóór doen.** Veel rooms zijn 5 tot 7 taken met een lang uitlegblok, daarna pas vragen. De vragen zijn grotendeels "typ het antwoord dat in de tekst staat". Veel meerkeuze en open vragen die een tekst controleren in plaats van een vaardigheid.
3. **Statische labs.** Het terminal-lab kent alleen een vast bestandssysteem plus exacte `commands`-matches. Je kunt niet echt een host aanvallen: geen services die reageren, geen toestand die verandert, geen gevolgen van je acties, geen "ik kom binnen".
4. **Geen echte hack-ervaring.** Er is geen enkele room waarin je een doelwit verkent, een kwetsbaarheid vindt, uitbuit, rechten verhoogt en een vlag pakt. De offensieve rooms (SQLi, verkenning) zijn losse labs, geen keten.
5. **Geen verdedigend spel.** Er is geen room waar je live een aanval moet tegenhouden of detecteren met tijdsdruk en gevolgen.
6. **Weinig variatie en herhaalbaarheid.** Elke leerling krijgt dezelfde data en dezelfde vlaggen. Antwoorden zijn dus deelbaar en een room is na één keer "op".
7. **Geen leerlus.** Geen spaced repetition, geen "je maakte dit type fout, probeer deze oefening", geen zwakke-plekken-overzicht, geen adaptieve moeilijkheid.
8. **Hints zijn gratis en ongestuurd.** Een hint kost niets en is niet gelaagd, dus geen afweging en geen leermoment.
9. **Weinig "juice".** Er is bewust bijna geen beweging. Dat past bij de stijl, maar er ontbreekt een moment van triomf bij een gevonden vlag, een gekraakte hash, een opgelost incident.
10. **Geen sociale of tijdsgebonden laag.** Geen dagelijkse uitdaging, geen weekopdracht, geen deelbaar resultaat (bijvoorbeeld een certificaat of resultaatkaart).

## Wat je gaat bouwen

Werk in **vijf werkstromen**. Lever per werkstroom iets dat af, getest en gecommit is voordat je aan de volgende begint. Begin met werkstroom A en B; die geven het snelste zichtbare effect. Werkstroom E bepaalt hoe diep alles wordt en loopt als kwaliteitslat door de andere vier heen.

### Werkstroom A — Betere challenges in de bestaande rooms

Doel: van "tekst overtypen" naar "zelf ontdekken".

1. Loop alle 88 rooms langs en classificeer elke vraag: *herinneren* (antwoord staat letterlijk in de tekst), *toepassen* (je moet iets doen met een lab) of *analyseren* (je moet afleiden en combineren). Zet het resultaat in een tabel in het auditverslag.
2. Herwerk de **20 zwakste rooms** (meeste herinneringsvragen, langste leesblokken). Per room:
   - Kort het leesblok in en **zet de uitleg in een inklapbare `<details>` of splits hem** zodat de leerling eerst de opdracht ziet en alleen leest als hij vastzit ("probeer eerst, lees dan").
   - Vervang minstens de helft van de herinneringsvragen door **taken met een lab** waarin het antwoord pas ontstaat door iets te doen.
   - Voeg per room één **"boss-vraag"** toe: een vraag zonder hint-tekst in de uitleg, waarvoor je twee of meer technieken uit de room moet combineren.
   - Maak hints **gelaagd** (zie werkstroom D).
3. Schrijf **minstens 15 nieuwe uitdagingen** in het pad `uitdagingen` (nu 3), in oplopende zwaarte (★ tot ★★★★★), elk zonder handleiding en met een eigen verhaal en eigen bewijsmateriaal. Voorbeelden van gewenste richtingen, kies of verzin beter:
   - Een gelekte `.git`-map of `.env` in een webroot: wat staat er in de historie?
   - Een phishingmail met bijlage: reconstrueer de keten van macro tot C2 vanuit een tekstdump.
   - Een Wireshark-achtige pcap-tekstdump met een verdachte login en een exfil in DNS.
   - Een Windows-eventlog met een brute-force gevolgd door lateral movement: welk account, welke host, hoe laat.
   - Een crypto-fout: hergebruikte nonce, zwakke RNG, of een JWT met `alg: none`.
   - Een kapotte "back-up" waarin de enige goede kopie versleuteld is: vind de sleutel in de omgeving.
   - Een steganografie- of metadata-puzzel (EXIF, verborgen bestanden in een archief).
   - Een social-engineeringscenario waarin je moet kiezen en de keuzes het verloop veranderen.
   Elke uitdaging: eigen `id`, minstens twee lagen, minstens één "aha"-moment, en een `explain` die na afloop uitlegt wat de echte wereld hiervan leert.
4. Voeg een **"Dagelijkse puzzel"** en **"Weekopdracht"** toe (zie werkstroom C).

### Werkstroom B — Game rooms: echt moeten hacken en verdedigen

Dit is de grote nieuwe functie. Bouw een **mini-engine voor stateful doelwitten** in `labs.js` (of een nieuw bestand `assets/js/game.js` dat netjes in `index.html` en `tools/build.js` wordt opgenomen) en gebruik hem voor een nieuw leerpad **"Game rooms"** (`path: 'gamerooms'`, voeg het toe aan `PATHS` in `app.js`, met icoon in `icons.js`).

**Engine-eisen**
- **Virtueel netwerk** met meerdere fictieve hosts (IP, hostnaam, open poorten, services, gebruikers, bestanden). De leerling bedient een terminal die **toestand bewaart**: wat je doet heeft gevolgen.
- Een **uitgebreidere terminal** dan nu: dynamische `nmap`-uitvoer die klopt met de host, `ssh`/`ftp`/`curl`-achtige verbindingen naar andere virtuele hosts, `sudo -l`, `find / -perm -4000`, `cat /etc/passwd`, `crontab`, `ps`, `netstat`/`ss`, `su`, `chmod`, het bewerken van bestanden, en pipes. Geen echte netwerkverbindingen, geen `eval` van leerlinginvoer: alles is een gesimuleerde interpreter met een vaste, geteste opdrachtenset.
- **Doelen en voortgang** als missie-HUD (bijvoorbeeld "1/5 vlaggen", "toegang: web → app → db"), met bewijsstukken (loot) die je verzamelt in een kladblok.
- **Gevolgen en inzet**: een tijdlimiet of een "ontdekkingsmeter" (hoe luidruchtiger je scant, hoe sneller de verdediger je ziet), met een echt verliesscenario dat leert, geen frustrerende dood.
- **Per-leerling variatie**: genereer wachtwoorden, poortnummers en vlaggen uit een zaadje (naam of willekeurig) zodat de oplossing niet 1-op-1 te delen is. Wees eerlijk dat dit client-side blijft: het doel is leren, niet anti-cheat. Documenteer dat in de spec.
- Alles blijft **fictief, lokaal in de browser en ethisch ingekaderd**: elke game room opent met een korte rules-of-engagement (scope, toestemming) die de leerling bewust moet accepteren. Dat is onderdeel van het leren.

**Minimaal 8 game rooms, oplopend in moeilijkheid**
1. **Eerste inbraak (★)** — een kwetsbare webserver: verken, vind de verborgen map, bruteforce een login, lees de vlag.
2. **Cookie-monster (★★)** — een webapp met zwakke sessies of een JWT met `alg: none`; word beheerder.
3. **De vergeten back-up (★★)** — FTP anoniem, een database-dump, hashes kraken, hergebruikte wachtwoorden, SSH naar een tweede host.
4. **Rechten verhogen (★★★)** — van gewone gebruiker naar root via SUID, sudo-misconfiguratie of een cronjob.
5. **Pivoteren (★★★)** — twee netwerken, een host met twee interfaces; vanaf de DMZ naar het interne netwerk.
6. **Active Directory-lite (★★★★)** — kerberoasting en wachtwoordhergebruik op een gesimuleerd domein, uitkomend op een domeinbeheerder.
7. **Blue team: de Nachtdienst (★★★)** — **verdedigen**. Een live stroom logregels (gegenereerd en tijdsgestuurd) met een aanval erin. Detecteer, isoleer de host, blokkeer het IP, reset het account, bewaar bewijs. Fout ingrijpen (bedrijfsproces platleggen, bewijs wissen) kost punten en laat zien waarom.
8. **Red vs. Blue: Operatie Gelijkspel (★★★★★)** — dezelfde omgeving twee keer: eerst als aanvaller doen (en sporen achterlaten), daarna als verdediger je eigen sporen vinden in de logs die je zojuist produceerde. Dit is de beste les in wat aanvallers achterlaten.

Optioneel als bonus: een **escape room** ("het serverhok") waarin cryptografie, hex, een crackme en een terminal elkaar nodig hebben, en een **CTF-bord** met eenmalige, procedureel gegenereerde opgaven.

**Elke game room krijgt**
- Een verhaal in twee à drie zinnen, een rol ("je bent de pentester van Kade Transport BV"), een doel en een duidelijke eindtoestand.
- Een **walkthrough die pas ontgrendelt na een poging of na X minuten**, plus **gelaagde hints** (zie D).
- Een **debrief** na afloop: wat deed je, wat had de verdediger kunnen zien, welke maatregel had het gestopt (met verwijzing naar de relevante lesroom en MITRE ATT&CK-technieken). Zo blijft het een leerportaal en wordt het geen speeltuin.
- Eigen tests in `tools/labtest-game.js`: één automatisch afspelen van de **oplossingsroute** per room, zodat we weten dat elke room oplosbaar blijft, en negatieve tests (verkeerde invoer, ongeldig commando).

### Werkstroom C — Spelmechanieken en juice (binnen de huisstijl)

Kies wat past; voeg niets toe dat de stijl breekt. Leg elke keuze kort uit in een nieuwe ADR (`docs/adr/0002-...`).

- **Rangen met identiteit** boven de huidige levels (bijvoorbeeld Script kiddie → Analist → Pentester → Rechercheur → Meester), gekoppeld aan echte vaardigheden, niet alleen aan XP.
- **Leerpad als vaardighedenkaart** (skill tree): zie in één oogopslag welke rooms op elkaar voortbouwen, wat je kunt en wat nog op slot zit. Toon een **aanbevolen volgende stap** op basis van wat je net deed.
- **Streak en dagelijkse puzzel**: elke dag één kleine opgave (hash, cijfer, logregel, regex), deterministisch uit de datum, met een reeks die je kunt onderhouden. Toon een rustige, niet-pushy streak.
- **Weekopdracht** die uit bestaande labs een nieuw scenario samenstelt.
- **Meer badges (minimaal 25 extra)** voor gedrag dat we willen belonen: zonder hint opgelost, eerste keer goed, een game room onder een bepaalde tijd, elke lab-soort minstens één keer gebruikt, een uitdaging in één poging, een foutmelding juist geïnterpreteerd. Geen badges voor puur klikken.
- **Triomf-moment**: bij een gevonden vlag, een gekraakte hash en een opgeloste game room een kort, **stil-elegant** effect binnen de stijl (het teken dat tekent, een terminal die even "ACCESS GRANTED" typt, een tellende XP-regel). Alles uit bij `prefers-reduced-motion`. Optioneel en standaard uit: subtiel geluid met een aan-uitknop.
- **Resultaatkaart / certificaat** als deelbaar PNG of printbare pagina per voltooid pad, zonder dat er persoonsgegevens de browser verlaten.
- **Zwakke-plekken-overzicht** op het scorebord: per onderwerp je foutpercentage, met een knop "oefen dit" die een gerichte set uit de Oefenarena start.
- **Oefenarena uitbreiden** met een tijdsaanval, een "survival"-modus (reeks tot je fout gaat) en sets die je zwakke onderwerpen bevoordelen.

### Werkstroom D — Betere leerlus (hints, feedback, herhaling)

- **Gelaagde hints**: hint 1 is een richting, hint 2 het gereedschap of de plek, hint 3 bijna het antwoord. Elke extra hint kost een klein deel van de XP en wordt zichtbaar gemaakt. Pas de datastructuur in `CONTENT-SPEC.md` en de validator aan, en wees terugwaarts compatibel met bestaande `hint: '...'`.
- **Slimme foutfeedback**: bij typische verkeerde antwoorden (bijvoorbeeld een hash van het verkeerde type, een tijdzone-fout, een off-by-one in een subnet) een korte, specifieke terugkoppeling in plaats van alleen "onjuist". Maak dit een optioneel veld `wrong: { 'antwoord': 'uitleg' }` bij de vraag.
- **Waarom-antwoord**: laat bij belangrijke vragen na een goed antwoord een korte "waarom dit ertoe doet in de praktijk" zien.
- **Herhaling**: een lichte spaced-repetition-laag die een vraag die je eerder fout had na 1, 3 en 7 dagen opnieuw als flashcard aanbiedt (alles in `localStorage`, meegenomen in de bestaande back-up).
- **Toetsmomenten**: een korte "Check jezelf" (5 vragen, tijd) aan het eind van elke room die het geleerde in een ander jasje stopt.

### Werkstroom E — Diepte en niveau: opleidings- en certificeringsklaar

Doel: wie het hele portaal doorwerkt, moet **aantoonbaar op het niveau zitten dat een opleiding of certificering verwacht**. Nu is de stof breed maar op veel plekken een introductie. Maak haar waar nodig **uitgebreider, dieper en toetsbaar**, zonder dat het een droge syllabus wordt.

1. **Eindtermen in kaart brengen.** Maak `docs/dekking-certificeringen.md`: een matrix van onderwerpen uit de officiële examendoelen (of openbare syllabi) naar de rooms die ze dekken, met per rij: **gedekt / deels / ontbreekt**. Gebruik minimaal:
   - Instap: **CompTIA Security+ (SY0-701)** en **Network+**-onderdelen, ISC2 **CC**.
   - Praktisch offensief: **eJPT** en de basis van **PNPT/OSCP** (verkenning, web, privilege escalation, pivoting, rapporteren).
   - Defensief/SOC: **CompTIA CySA+**, **BTL1** en **GCIH**-thema's (detectie, incident response, logs, threat hunting).
   - Forensie: **GCFA/CHFI**-thema's en de werkwijze van opsporing (chain of custody, rapportage, bewijswaarde).
   - Intelligence: **MITRE ATT&CK**, diamond model, structured analytic techniques.
   - Nederlandse context: relevante onderdelen van **HBO-ICT/Cyber Security**, de **Wwft**, **AVG**, **NIS2**, **Wet computercriminaliteit III**, en wat een digitaal rechercheur of SOC-analist hier verwacht.
   Gebruik alleen wat je zeker weet over de examenstructuur; vermeld bij onzekerheid "controleer de actuele syllabus" in plaats van iets te verzinnen. Geef nooit de indruk dat dit portaal een erkend examen vervangt of een certificaat oplevert.
2. **Gaten dichten.** Schrijf nieuwe rooms voor de belangrijkste ontbrekende onderwerpen (verwacht o.a.: risicomanagement en frameworks zoals ISO 27001/NIST/CIS, IAM en Zero Trust, cloudbeveiliging (AWS/Azure-basis, gedeelde verantwoordelijkheid, verkeerd ingestelde storage), TLS/PKI in detail, draadloze beveiliging, container- en Linux-hardening, Active Directory-aanvallen en -verdediging, SIEM-gebruik en threat hunting, secure coding en code-review, beveiligingsrapportage en pentest-methodiek (PTES/OWASP WSTG), privacy- en wetgeving. Controleer eerst wat er al is; dubbel werk is waardeloos.
3. **Bestaande rooms verdiepen.** Per room die je aanraakt: voeg een **"Verdieping"-taak** toe voor wie meer wil (de theorie achter het gereedschap, randgevallen, hoe het echt in de praktijk gaat, veelgemaakte fouten) en een korte **"Zo komt dit voor op een examen"**-sectie met 3 à 5 examenstijlvragen (scenario-gebaseerd, meerkeuze met plausibele afleiders, en een prestatiegerichte vraag). Streef naar examenniveau, niet naar quizniveau: afleiders moeten echt verleidelijk zijn en uitleg moet ook de foute opties verklaren.
4. **Niveaus en leerroutes.** Voeg per room een niveauaanduiding toe (Instap / Praktijk / Gevorderd / Expert) en maak **leerroutes naar een doel** (bijvoorbeeld "SOC-analist", "Pentester", "Digitaal rechercheur", "Intelligence-analist") die rooms en game rooms in een verstandige volgorde zetten, met per route een **eindtoets**.
5. **Eindtoetsen en proefexamens.** Bouw een **proefexamenmodus**: een gemengde set van 40 tot 90 vragen uit een gekozen route, met tijdslimiet, markeren-voor-later, geen directe feedback tot het einde, en daarna een **analyse per domein** (waar zit je zwak) met doorverwijzing naar de juiste room. Vragenbank per domein, met minstens 30 originele vragen per domein; schrijf alle vragen zelf, kopieer nooit echte examenvragen of "braindumps".
6. **Bronvermelding en actualiteit.** Elke inhoudelijke claim over standaarden, wetten en frameworks moet een **versie of jaartal** dragen (bijvoorbeeld "OWASP Top 10 2025", "NIST CSF 2.0"). Voeg per room "Laatst gecontroleerd: <datum>" toe en verwijs naar primaire bronnen (standaard, wettekst, vendor-documentatie) in plaats van blogs. Een nieuw script `tools/` mag verouderde of onvolledige bronnen signaleren.
7. **Kwaliteitsbewaking op inhoud.** Draai per nieuwe of herziene room een **inhoudelijke review**: klopt elke feitelijke bewering, zijn getallen en commando's juist, en is niets zo vereenvoudigd dat het onwaar wordt? Rapporteer onzekerheden expliciet in plaats van ze glad te strijken.

## Randvoorwaarden (niet onderhandelbaar)

- **Huisstijl en design**: lees `DESIGN.md` en ADR-0001 volledig. Violet betekent alleen "bewezen/goed", vermiljoen alleen "fout/gefaald", inkt voor al het andere. Geen derde signaalkleur, geen schaduwen, vierkante hoeken, Martian Mono alleen voor machine-output. Heb je een nieuwe visuele taal nodig (bijvoorbeeld een HUD of een "ontdekkingsmeter"), ontwerp die binnen die regels en leg de afweging vast in een ADR en in `DESIGN.md`. Alle beweging uit bij `prefers-reduced-motion`. Kleur is nooit het enige signaal.
- **Statisch en zonder build**: het portaal moet nog steeds werken door `index.html` te openen (`file://`) en als één Cloudflare-static-site. Geen externe afhankelijkheden, geen CDN's, geen frameworks, geen netwerkcalls. Nieuwe scripts worden opgenomen via `tools/build.js` en `tools/build-artifact.js`; draai `node tools/build.js` en `node tools/build-artifact.js` zodat `index.html` en `dist/nineminds-cyber-dojo.html` kloppen.
- **Taal**: alle zichtbare tekst in helder Nederlands, in de bestaande toon (direct, volwassen, niet kinderachtig). Vakwoorden uit het Engels blijven Engels waar dat de praktijk is.
- **Ethiek en veiligheid**: alles fictief (`example`, `.nm.lab`, RFC 5737-adressen), geen echte exploit-code die buiten de simulatie werkt, geen instructies die buiten het lab schade kunnen doen. Elke aanvalsroom heeft rules-of-engagement en een verdedigende debrief. Geen echte netwerkverbindingen vanuit de browser.
- **Vlaggen**: formaat `NM{kleine_letters_met_underscores}`. Houd je aan `encoded: true` waar de validator dat vraagt en breid de validator uit voor elke nieuwe structuur (hints, `wrong`, game-room-definities). Een kapotte of onoplosbare room mag nooit door de validator komen.
- **Bestaande voortgang blijft werken**: wijzig de `STATE`-structuur alleen uitbreidend en met een migratie, zodat bestaande `localStorage`-voortgang en back-ups niet breken.
- **Geen regressies**: `node tools/validate.js`, `node tools/smoke.js`, `node tools/labtest.js`, `node tools/labtest-extra.js` en `node tools/labtest-meester.js` blijven groen.
- **Kwaliteit boven aantal**: liever 6 uitstekende game rooms dan 12 matige. Elke challenge moet zelf door jou volledig zijn uitgespeeld en moet eerlijk zijn (geen gokwerk, geen verborgen conventies, één eenduidig antwoord).

## Werkwijze en oplevering

1. Werk op de toegewezen branch. Commit in **kleine, logische stappen** met duidelijke Nederlandstalige commitberichten (één werkstroom of één room per commit). Push regelmatig.
2. Volgorde: auditverslag en dekkingsmatrix (E.1) → werkstroom D (hints en feedback, want die ondersteunen de rest) → werkstroom A (de zwakste 20 rooms en de 15 uitdagingen, in batches van 5) → werkstroom B (engine eerst, dan de rooms één voor één, elk met oplossingstest) → werkstroom C (mechanieken en juice) → werkstroom E (gaten dichten, verdiepen, proefexamens), waarbij je de verdieping per room liefst meeneemt op het moment dat je die room toch al herwerkt.
3. Na elke batch: validator, smoke en labtests draaien, daarna **in een headless browser (Playwright, zie `tools/_playwright.js`) de nieuwe rooms echt doorspelen** en screenshots maken op 390 px (telefoon) en 1280 px. Controleer licht en donker thema en `prefers-reduced-motion`.
4. Werk `README.md` (leerpaden, labs, hulpscripts) en `docs/CONTENT-SPEC.md` (nieuwe velden, de game-engine en hoe je een game room schrijft) bij, zodat de volgende auteur het kan uitbreiden zonder jou.
5. Maak **geen pull request** tenzij daar om gevraagd wordt.
6. Sluit af met een kort verslag: wat is er gebouwd, wat is er getest en hoe, wat is bewust niet gedaan, en welke volgende stappen je aanraadt (bijvoorbeeld echte multiplayer-scoreborden of een docentenmodus, die een server vereisen en dus een aparte beslissing zijn).

## Definition of done

- De auditdocumenten, de dekkingsmatrix voor certificeringen en de ADR's staan er.
- Gelaagde hints, `wrong`-feedback en spaced repetition werken en zijn getest.
- Minstens 20 bestaande rooms zijn herwerkt volgens "eerst proberen, dan lezen" en hebben een boss-vraag.
- Minstens 15 nieuwe uitdagingen zonder handleiding staan in het pad Uitdagingen.
- Minstens 8 game rooms (waaronder minstens één blue-team-room en de Red-vs-Blue-room) zijn speelbaar, oplosbaar (automatische oplossingstest) en hebben een debrief.
- Dagelijkse puzzel, rangen, extra badges, triomf-effecten en het zwakke-plekken-overzicht werken en zijn stijlconform.
- Elke herziene room heeft een Verdieping-taak en examenstijlvragen; de ontbrekende onderwerpen uit de dekkingsmatrix zijn als nieuwe rooms geschreven of bewust met reden uitgesteld.
- Er zijn leerroutes met eindtoets en een proefexamenmodus met domeinanalyse, gevuld met originele vragen.
- Alle bestaande tests en de nieuwe tests zijn groen en `dist/nineminds-cyber-dojo.html` is opnieuw gegenereerd.
- Wie een leerroute afrondt, kan zonder lacunes de bijbehorende examendoelen benoemen en toepassen (zie de dekkingsmatrix).
- Een nieuwe leerling kan binnen 10 minuten na het openen van de site iets echts kraken of binnendringen, zonder eerst een uur te lezen.
