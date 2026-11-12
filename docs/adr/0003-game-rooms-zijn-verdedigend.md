# ADR-0003: Game rooms zijn verdedigend, met toestand en gevolgen

- Status: Accepted
- Date: 2026-11-12
- Hangt samen met: ADR-0001 (huisstijl), ADR-0002 (spelmechanieken), `docs/optimalisatie-prompt.md` (werkstroom B)

## Context

De audit (`docs/audit-leerervaring.md`) liet zien dat de labs statisch zijn: een vast bestandssysteem, vaste uitvoer per
commando, geen tijd en geen gevolgen. Werkstroom B vroeg om game rooms waarin je iets doet dat gevolgen heeft, met per
leerling een eigen variant, een debrief en een automatische oplossingstest. De opdracht noemde zowel aanvals- als
verdedigingsrooms.

## Beslissing

1. **Deze ronde bouwt alleen verdedigende game rooms.** De leerling staat aan de kant van de verdediger: SOC-analist,
   beheerder, incidentonderzoeker. Aanvalsketens (een doelwit binnendringen, rechten verhogen, pivoteren, een domein
   overnemen) zijn niet gebouwd. Wat de aanvaller doet, zit in het scenario als iets wat gebeurt, in logs en meldingen, en in
   de nabespreking met ATT&CK-technieken. De bestaande offensieve labs (SQL-injectie, verkenning, hashes kraken) blijven
   losse oefeningen in hun eigen rooms.
2. **Eén engine, `assets/js/game.js`, labtype `incident`.** Een console met een vaste opdrachtenset (logs lezen, isoleren,
   blokkeren, resetten, veiligstellen, herstellen, maatregelen doorvoeren). Er wordt niets van de leerling uitgevoerd en er
   gaat niets het netwerk op.
3. **De klok loopt mee met wat je doet.** Elke opdracht kost minuten (lezen 1, isoleren 2, een geheugenbeeld 5, terugzetten
   10). Dreigingen gebeuren op een vast moment, tenzij je ze daarvoor hebt gestopt. Geen echte tijd: dat zou op een telefoon
   of met een screenreader oneerlijk zijn, en het maakt de rooms testbaar.
4. **Drie soorten uitkomst.** Doelen (wat je moet bereiken), schade (wat de aanvaller bereikt omdat je te laat was) en
   gevolgen (wat je zelf kapotmaakt: een kritiek systeem zonder reden offline, de back-upleverancier blokkeren, bewijs wissen).
   Verliezen eindigt in een nabespreking en een walkthrough, niet in een leeg scherm.
5. **Elke game room opent met een mandaat** dat de leerling moet accepteren: wat mag je, en dat je dit alleen doet waar je
   opdracht en toestemming voor hebt.
6. **Per leerling een variant.** IP-adressen, accountnamen, hosts en procesnummers komen uit `vars`, gekozen met een zaadje
   per leerling en per room. Dit is client-side en dus te achterhalen: het doel is dat je een antwoord niet kunt overtypen
   van een ander, geen anti-cheat. De vlag is voor iedereen dezelfde; de vragen in de nabespreking gaan over je eigen variant.
7. **Geen room door de validator zonder bewijs dat hij oplosbaar en eerlijk is.** `tools/validate.js` speelt de
   oplossingsroute na in acht varianten (moet winnen, zonder gevolgen en zonder schade) en controleert dat meteen afsluiten
   niet wint. `tools/labtest-game.js` speelt elke room in een echte browser.

## Gevolgen

Positief: de leerling ervaart tijdsdruk, valse sporen (gepland werk dat er verdacht uitziet) en de prijs van een
misgreep, en leert dat bewijs veiligstellen tijd kost en toch loont. Een schrijver maakt een nieuwe room zonder de engine aan
te raken; de validator vangt een onoplosbare room af.

Negatief: de engine kent alleen de opdrachten die erin zitten. Een leerling die iets slims wil dat er niet in zit, krijgt
"onbekend commando". De nabespreking moet dat goedmaken door uit te leggen wat er in het echt nog had gekund.

## Niet gedaan, met reden

- **Aanvalsrooms** (inbreken, rechten verhogen, pivoteren, Active Directory) en de rood-tegen-blauw-room in zijn
  oorspronkelijke vorm. Bewust buiten deze ronde gelaten. "De ochtend erna" dekt de blauwe helft: de sporen van een
  aanvaller lezen en zijn persistentie opruimen.
- **Een escape room en een CTF-bord met eenmalige opgaven.** De dagpuzzel en weekopdracht (ADR-0002) vullen een deel.
