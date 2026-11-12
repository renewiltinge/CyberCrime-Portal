# Audit van de leerervaring

Datum: 2026-11-12. Gemeten op 88 rooms, 509 taken, 260 labs, 1798 vragen en ruim 118.000
woorden lesstof. De cijfers komen uit `node tools/audit.js`; de tabel onderaan is daarmee
gemaakt (`--md`) en is opnieuw te draaien na elke herziening.

## Hoe er gemeten is

Elke vraag krijgt één van drie etiketten:

- **herinneren**: het antwoord staat letterlijk in de taaktekst, of het is een meerkeuzevraag
  bij een taak zonder lab;
- **toepassen**: de taak heeft een lab en het antwoord staat niet in de tekst;
- **analyseren**: een open vraag zonder lab waarvan het antwoord niet in de tekst staat.

Dit is een heuristiek. Hij ziet niet of je het lab echt nodig hebt, en een meerkeuzevraag die
inzicht vraagt telt toch als herinneren. Als rangorde tussen rooms is hij bruikbaar; als
oordeel over één vraag niet.

## Wat de cijfers zeggen

| | Aantal | Aandeel |
|---|---|---|
| Herinneren | 1056 | 61% |
| Toepassen | 644 | 37% |
| Analyseren | 21 | 1% |
| Alleen lezen en afvinken | 77 | |

Per leerpad (aandeel herinneren, woorden per taak): Fundamenten 74% (268), Intelligence 74%
(256), Forensie 70% (247), Defensief 66% (233), Offensief 63% (285), Security-kern 60% (237),
Puzzels 53% (240), Datastromen 49% (82), Eindopdracht 44% (125), Meesterproeven 41% (247),
Uitdagingen 0% (27).

## Bevindingen, getoetst aan het vertrekpunt

1. **Te veel lezen voor doen: bevestigd.** Zes op de tien vragen vragen terug wat er net stond.
   De zwakste rooms hebben 300 tot 430 woorden per taak en één lab op zeven taken
   (`intelligenceproducten`, `crime-scripting`, `intelligencecyclus`, `cybercrime-ecosysteem`,
   `incident-response`, `owasp-top-10`). Datastromen laat zien dat het anders kan: 82 woorden
   per taak en een lab in bijna elke taak.
2. **Bijna niets vraagt om afleiden: scherper dan gedacht.** 21 van de 1798 vragen, vrijwel
   allemaal in Uitdagingen en Meesterproeven.
3. **Hints waren gratis en ongelaagd: bevestigd.** 967 hints, elk één regel, zonder prijs.
   Sinds deze ronde zijn hints gelaagd en kosten ze XP (zie hieronder).
4. **Statische labs: bevestigd.** 19 rooms gebruiken de terminal; die kent een vast
   bestandssysteem en vaste uitvoer per commando. Er is geen toestand die verandert.
5. **Weinig variatie: bevestigd.** Elke leerling ziet dezelfde data en dezelfde vlaggen.
6. **Geen leerlus: deels weerlegd.** Er waren al een Oefenarena met reeks, een
   Begrippentrainer, een Examen en een Dagchallenge met streak. Wat ontbrak: fouten die
   terugkomen, een overzicht van zwakke plekken en feedback die zegt wat er mis ging.
7. **Dagelijkse reden om terug te komen: deels weerlegd.** De Dagchallenge bestaat, maar trekt
   vijf willekeurige vragen uit de rooms, dus vooral herinneren. Een echte puzzel per dag
   ontbreekt.
8. **Aanvulling: de verdeling over de paden is scheef.** Juist de paden waar een beginner
   start (Fundamenten) en waar het vak om oordelen draait (Intelligence) leunen het zwaarst op
   herinneren.
9. **Aanvulling: de volgorde van een room ligt vast op lezen, lab, vragen.** De engine kon een
   opdracht niet vóór de uitleg zetten. Dat kan nu (`tryFirst`).

## Wat er in deze ronde is gebouwd

- `tools/audit.js`: deze meting, herhaalbaar.
- **Gelaagde hints** (`hints: [richting, plek, bijna]`), 15% van de XP per geopende hint,
  zichtbaar op de knop en in het XP-label. Het oude `hint: '...'` werkt als één laag.
- **Specifieke foutfeedback** (`wrong: { 'antwoord': 'uitleg' }`, ook met regex-sleutel en per
  meerkeuze-optie) en **waarom dit ertoe doet** (`why`).
- **Herhaling**: een fout antwoord komt na 1, 3 en 7 dagen terug op `#/herhalen`.
- **Eerst proberen, dan lezen** (`tryFirst` met `intro`), **boss-vraag** (`boss: true`),
  **Verdieping** en **examenvragen** als taken die niet meetellen voor "room af" (`optional`).
- Een triomfregel bij een gevonden vlag of een verslagen boss-vraag, stil bij minder beweging.
- `tools/labtest-leerlus.js` test dit in een echte browser, ook dat oude voortgang blijft werken.

## De twintig zwakste rooms

Dit zijn de eerste twintig rijen van de tabel: de kandidaten voor herwerking volgens "eerst
proberen, dan lezen". `verder-leren-bronnen` (100% herinneren) is een bronnenlijst en hoort
daar niet bij.

## Tabel: alle rooms, zwakste eerst

Gesorteerd op aandeel herinneren maal woorden per taak.

| # | Room | Pad | Taken | Labs | Woorden/taak | Herinneren | Toepassen | Analyseren | Aandeel herinneren |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `intelligenceproducten` | intelligence | 7 | 1 | 347 | 24 | 1 | 0 | 96% |
| 2 | `crime-scripting` | intelligence | 7 | 2 | 364 | 21 | 3 | 0 | 88% |
| 3 | `intelligencecyclus` | intelligence | 7 | 3 | 382 | 22 | 5 | 0 | 81% |
| 4 | `kwetsbaarheden-cvss` | security-kern | 7 | 2 | 435 | 20 | 8 | 0 | 71% |
| 5 | `cybercrime-ecosysteem` | intelligence | 7 | 1 | 324 | 20 | 1 | 0 | 95% |
| 6 | `werkblad-intel` | intelligence | 6 | 1 | 328 | 15 | 1 | 0 | 94% |
| 7 | `osint-pivoting` | intelligence | 7 | 1 | 328 | 22 | 1 | 1 | 92% |
| 8 | `ti-modellen` | intelligence | 7 | 1 | 348 | 21 | 2 | 2 | 84% |
| 9 | `incident-response` | defensief | 7 | 1 | 295 | 24 | 2 | 0 | 92% |
| 10 | `owasp-top-10` | offensief | 7 | 1 | 296 | 23 | 2 | 0 | 92% |
| 11 | `threat-intel-attack` | defensief | 7 | 3 | 375 | 18 | 7 | 1 | 69% |
| 12 | `intro-cybersecurity` | fundamenten | 7 | 1 | 273 | 14 | 1 | 0 | 93% |
| 13 | `wachtwoorden-kraken` | offensief | 7 | 6 | 394 | 16 | 10 | 0 | 62% |
| 14 | `subnetting` | fundamenten | 5 | 1 | 255 | 9 | 0 | 1 | 90% |
| 15 | `schijf-bestandssysteem-forensie` | forensie | 7 | 2 | 297 | 17 | 4 | 1 | 77% |
| 16 | `wachtwoorden-authenticatie` | security-kern | 5 | 2 | 279 | 17 | 4 | 0 | 81% |
| 17 | `veilig-thuis-werk` | defensief | 6 | 1 | 280 | 16 | 2 | 2 | 80% |
| 18 | `cryptografie` | security-kern | 7 | 3 | 324 | 20 | 9 | 0 | 69% |
| 19 | `netwerken-basis` | fundamenten | 7 | 1 | 271 | 12 | 3 | 0 | 80% |
| 20 | `webhacking-sqli` | offensief | 7 | 2 | 265 | 20 | 5 | 0 | 80% |
| 21 | `malware-analyse-basis` | forensie | 7 | 2 | 268 | 18 | 5 | 0 | 78% |
| 22 | `windows-artefacten` | forensie | 7 | 2 | 274 | 17 | 6 | 1 | 71% |
| 23 | `cryptanalyse-vigenere` | meesterproeven | 5 | 3 | 403 | 10 | 11 | 0 | 48% |
| 24 | `detectie-engineering` | defensief | 7 | 4 | 383 | 13 | 12 | 2 | 48% |
| 25 | `hoe-het-web-werkt` | fundamenten | 6 | 2 | 299 | 8 | 5 | 0 | 62% |
| 26 | `cryptomixer-onderzoek` | puzzels | 7 | 5 | 298 | 17 | 11 | 0 | 61% |
| 27 | `verkenning-scannen` | offensief | 7 | 2 | 247 | 16 | 6 | 0 | 73% |
| 28 | `verder-leren-bronnen` | forensie | 6 | 0 | 177 | 15 | 0 | 0 | 100% |
| 29 | `rainbow-tables-salt` | security-kern | 6 | 5 | 387 | 10 | 12 | 0 | 45% |
| 30 | `datastromen-exfil` | puzzels | 7 | 4 | 329 | 15 | 13 | 0 | 54% |
| 31 | `logs-detectie` | defensief | 7 | 3 | 291 | 15 | 10 | 0 | 60% |
| 32 | `botnet-takedown` | puzzels | 7 | 5 | 261 | 16 | 8 | 0 | 67% |
| 33 | `follow-the-money` | puzzels | 7 | 3 | 257 | 19 | 9 | 0 | 68% |
| 34 | `tijdlijnanalyse` | forensie | 7 | 3 | 377 | 12 | 12 | 2 | 46% |
| 35 | `intro-forensie` | forensie | 6 | 1 | 205 | 15 | 2 | 1 | 83% |
| 36 | `osint-opsporing` | forensie | 7 | 2 | 263 | 13 | 6 | 1 | 65% |
| 37 | `windows-basis` | fundamenten | 6 | 2 | 244 | 9 | 4 | 0 | 69% |
| 38 | `netwerk-forensie` | forensie | 7 | 3 | 222 | 19 | 6 | 0 | 76% |
| 39 | `mobiel-cloud-forensie` | forensie | 7 | 2 | 237 | 14 | 6 | 0 | 70% |
| 40 | `social-engineering-phishing` | security-kern | 5 | 1 | 204 | 12 | 2 | 1 | 80% |
| 41 | `bewijs-veiligstellen` | forensie | 6 | 1 | 183 | 16 | 2 | 1 | 84% |
| 42 | `praktijkcase-intel` | intelligence | 7 | 7 | 319 | 11 | 14 | 0 | 44% |
| 43 | `memory-forensie` | forensie | 7 | 4 | 241 | 14 | 11 | 0 | 56% |
| 44 | `linux-basis` | fundamenten | 6 | 3 | 261 | 6 | 6 | 0 | 50% |
| 45 | `bank-helpdeskfraude` | puzzels | 7 | 4 | 217 | 16 | 10 | 1 | 59% |
| 46 | `cijfers-kraken` | security-kern | 6 | 4 | 332 | 7 | 11 | 1 | 37% |
| 47 | `cybercrime-ctf` | puzzels | 10 | 8 | 227 | 15 | 12 | 1 | 54% |
| 48 | `decoderen-ctf` | offensief | 6 | 4 | 288 | 7 | 10 | 0 | 41% |
| 49 | `osint-jacht` | puzzels | 7 | 4 | 240 | 11 | 12 | 0 | 48% |
| 50 | `forensie-ctf` | forensie | 8 | 6 | 206 | 14 | 13 | 0 | 52% |
| 51 | `reverse-engineering` | offensief | 7 | 5 | 313 | 7 | 15 | 0 | 32% |
| 52 | `kraak-ctf` | eindopdracht | 9 | 7 | 199 | 10 | 11 | 0 | 48% |
| 53 | `fraude-in-de-cijfers` | meesterproeven | 5 | 3 | 199 | 8 | 9 | 0 | 47% |
| 54 | `bewijs-in-de-rechtszaal` | meesterproeven | 5 | 3 | 197 | 7 | 9 | 0 | 44% |
| 55 | `redeneren-met-kansen` | meesterproeven | 5 | 3 | 207 | 6 | 8 | 1 | 40% |
| 56 | `detectie-bouwen` | defensief | 3 | 1 | 106 | 9 | 3 | 0 | 75% |
| 57 | `crack-the-hash` | offensief | 6 | 6 | 174 | 8 | 10 | 0 | 44% |
| 58 | `casus-digitale-nalatenschap` | puzzels | 5 | 3 | 166 | 6 | 7 | 0 | 46% |
| 59 | `dns-datastromen` | datastromen | 3 | 1 | 105 | 9 | 4 | 0 | 69% |
| 60 | `osint-infrastructuur` | intelligence | 4 | 2 | 95 | 12 | 4 | 0 | 75% |
| 61 | `forensie-misleiding` | meesterproeven | 5 | 5 | 229 | 5 | 13 | 0 | 28% |
| 62 | `netwerkstromen-analyse` | datastromen | 4 | 2 | 88 | 11 | 6 | 0 | 65% |
| 63 | `ransomware-respons` | defensief | 4 | 2 | 85 | 10 | 6 | 0 | 63% |
| 64 | `darkweb-vendor-osint` | intelligence | 5 | 3 | 85 | 12 | 8 | 0 | 60% |
| 65 | `cybercrime-arcade` | puzzels | 6 | 6 | 182 | 5 | 13 | 0 | 28% |
| 66 | `phishing-gevorderd` | security-kern | 4 | 2 | 79 | 10 | 6 | 0 | 63% |
| 67 | `mini-ctf` | eindopdracht | 8 | 6 | 124 | 7 | 11 | 0 | 39% |
| 68 | `ceo-fraude-simulatie` | security-kern | 4 | 2 | 77 | 10 | 6 | 0 | 63% |
| 69 | `casus-kluis-zonder-beheerder` | puzzels | 5 | 5 | 191 | 4 | 13 | 0 | 24% |
| 70 | `financiele-recherche` | datastromen | 4 | 2 | 70 | 10 | 6 | 0 | 63% |
| 71 | `carding-economie` | intelligence | 5 | 3 | 78 | 11 | 9 | 0 | 55% |
| 72 | `phishing-kit-infrastructuur` | defensief | 5 | 3 | 69 | 12 | 8 | 0 | 60% |
| 73 | `witwassen-structurering` | datastromen | 4 | 3 | 92 | 9 | 11 | 0 | 45% |
| 74 | `fraudevormen` | security-kern | 5 | 3 | 69 | 11 | 9 | 0 | 55% |
| 75 | `email-forensics` | datastromen | 4 | 3 | 78 | 8 | 10 | 0 | 44% |
| 76 | `money-mule-ronseling` | intelligence | 4 | 3 | 69 | 7 | 9 | 0 | 44% |
| 77 | `ot-ics-ransomware` | defensief | 4 | 3 | 59 | 7 | 7 | 0 | 50% |
| 78 | `simswap-aanval` | security-kern | 4 | 3 | 67 | 7 | 9 | 0 | 44% |
| 79 | `insider-threat` | defensief | 4 | 3 | 57 | 7 | 7 | 0 | 50% |
| 80 | `botnet-ddos-economie` | intelligence | 4 | 3 | 56 | 7 | 7 | 0 | 50% |
| 81 | `infostealers-datamarkten` | intelligence | 4 | 3 | 55 | 7 | 8 | 0 | 47% |
| 82 | `vishing-deepfake` | security-kern | 4 | 3 | 55 | 7 | 8 | 0 | 47% |
| 83 | `operatie-spiegelstroom` | datastromen | 5 | 4 | 65 | 7 | 12 | 0 | 37% |
| 84 | `crypto-witwassen` | datastromen | 3 | 3 | 91 | 3 | 10 | 0 | 23% |
| 85 | `datastromen-ctf` | eindopdracht | 7 | 6 | 30 | 9 | 11 | 0 | 45% |
| 86 | `uitdaging-gelaagde-boodschap` | uitdagingen | 3 | 3 | 17 | 0 | 7 | 0 | 0% |
| 87 | `uitdaging-het-lege-bureau` | uitdagingen | 1 | 1 | 57 | 0 | 5 | 0 | 0% |
| 88 | `uitdaging-onverklaarde-geldstroom` | uitdagingen | 3 | 3 | 28 | 0 | 11 | 0 | 0% |
