# ADR-0004: Offensieve game rooms zijn gesimuleerde oefenranges

- Status: Accepted
- Date: 2026-11-13
- Hangt samen met: ADR-0003 (game rooms waren eerst alleen verdedigend), `docs/optimalisatie-prompt.md` (werkstroom B)

## Context

ADR-0003 koos er bewust voor om de eerste game rooms verdedigend te houden en aanvalsrooms uit te stellen. René
vroeg daarna alsnog om de offensieve helft uit werkstroom B: inbreken, rechten verhogen, pivoteren, een Active
Directory-keten en een rood-tegen-blauw-room. Dit herziet het "bewust uitgesteld" uit ADR-0003 voor die rooms.

Een leerportaal dat alleen verdedigt, laat niet zien hoe een aanval echt verloopt. Dat is nodig om te leren verdedigen,
en het hoort bij de examendoelen van eJPT, PNPT en OSCP. De vraag was hoe we dat doen zonder een kant-en-klaar
aanvalswerktuig te worden.

## Beslissing

1. **Een offensieve game room is een gesimuleerde oefenrange**, labtype `range` (`assets/js/range.js`), een tegenhanger
   van de verdedigende incidentconsole. De leerling verkent een nagebootst netwerk, vindt een ingang, verzamelt
   inloggegevens, verhoogt rechten en pivoteert naar een volgend net.
2. **Het is een puzzel, geen werktuig.** De console kent een vaste, geteste opdrachtenset (`scan`, `web`, `ssh`,
   `sudo -l`, `escalate`, `cat`, ...). Elke opdracht geeft scripted uitvoer uit de roomdefinitie. Er wordt niets van de
   leerling uitgevoerd (geen `eval`), er gaat niets het netwerk op, en er staat nergens werkende exploitcode. De
   "exploitatie" is een logische stap: lees de uitvoer, trek de conclusie, zet de volgende opdracht. `escalate` werkt
   pas nadat de leerling de zwakte zelf heeft gevonden (via `sudo -l`, `find-suid` of `crontab -l`).
3. **Inzet via een ontdekkingsmeter.** Luidruchtig scannen en blind wachtwoorden proberen vullen de meter; vol betekent
   betrapt en de range kwijt. Zo leert de leerling stil en gericht werken, zonder echte tooling.
4. **Rules of engagement vooraf en een verdedigende debrief achteraf.** Elke range opent met een scope die de leerling
   accepteert, en sluit af met: welke keten je liep (met ATT&CK-technieken), wat de blue team had kunnen zien, en wat
   elke stap had gestopt. De aanval dient het verdedigen; dat is de reden dat de room bestaat.
5. **Per leerling een variant** (wachtwoorden, paden, adressen, de escalatietool uit `vars`), zodat een route niet
   1-op-1 te delen is. Client-side, dus geen anti-cheat; het doel is leren.
6. **Rood tegen blauw** combineert beide: je valt eerst aan in de range en produceert sporen, en onderzoekt daarna in
   een logboek je eigen sporen terug. Zo zie je wat een aanvaller achterlaat.
7. **De validator speelt elke range na** in acht varianten (`tools/validate.js`, `checkRange`): de oplossingsroute moet
   alle vlaggen pakken en winnen, en meteen afronden mag niet winnen. `tools/labtest-range.js` speelt ze in de browser.

## Gevolgen

Positief: de leerling ervaart de volledige keten (verkennen, binnenkomen, rechten verhogen, pivoteren) en begrijpt
daardoor de verdediging beter. De rooms zijn testbaar en kunnen niet stilletjes onoplosbaar raken.

Negatief: de engine kent alleen de opdrachten die erin zitten. Wie een echte tool of een echt commando verwacht, krijgt
"onbekend commando". De rooms leren het denkwerk en de keten, niet het bedienen van echte aanvalstooling; dat hoort op
een platform met echte doelen, binnen de regels daarvan. De debrief zegt dit ook.

## Grens

Geen enkele room bevat werkende exploitcode, payloads of commando's die buiten de simulatie iets doen. Alle doelen,
adressen en bedrijven zijn fictief. De rooms blijven binnen "leren verdedigen en legaal, bevoegd beveiligingswerk doen".
