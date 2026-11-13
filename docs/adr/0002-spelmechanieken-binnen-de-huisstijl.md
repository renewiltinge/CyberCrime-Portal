# ADR-0002: Spelmechanieken en een leerlus, binnen de huisstijl

- Status: Accepted
- Date: 2026-11-12
- Hangt samen met: ADR-0001 (de dojo draagt de NineMinds-huisstijl), `docs/audit-leerervaring.md`

## Context

De audit laat zien dat 61% van de vragen terugvraagt wat er net stond, dat hints gratis waren
en dat een fout antwoord nergens terugkwam. Er waren XP, levels, 15 badges, een arena, een
examen en een dagchallenge, maar weinig dat beloont wat we willen zien: zelf uitzoeken, in één
keer goed, zonder hint, en terugkomen op wat misging.

De huisstijl laat weinig toe: twee signaalkleuren met een vaste betekenis, geen schaduwen,
vierkante hoeken, beweging alleen als die iets zegt.

## Beslissing

1. **Een hint heeft een prijs en een laag.** Maximaal drie lagen (richting, plek, bijna het
   antwoord); elke geopende laag kost 15% van de XP van die vraag. De prijs staat op de knop,
   in inkt. Geen rood: een hint openen is geen fout.
2. **Een fout antwoord krijgt een reden en komt terug.** `wrong` geeft specifieke uitleg; de
   vraag komt na 1, 3 en 7 dagen terug op `#/herhalen`. Drie keer goed en hij is weg.
3. **Rangen hangen aan wat je kunt laten zien.** Zes rangen, van Nieuwkomer tot Meester, met
   eisen als "het pad Fundamenten af" of "een uitdaging zonder handleiding opgelost". XP en
   levels blijven bestaan als teller; de rang is het woord erbij. Geen rang met een kleur.
4. **Badges belonen gedrag, niet klikken.** 29 nieuwe badges: eerste poging goed, zonder hint,
   boss-vragen, soorten labs gebruikt, fouten afgeleerd, reeksen, toetsen. Geen badge voor het
   openen van een pagina.
5. **Eén triomfregel.** Bij een gevonden vlag, een verslagen boss-vraag en een opgeloste puzzel
   typt één regel zichzelf op het donkere scherm (`> VLAG GEACCEPTEERD`) en telt de XP op.
   Violet, want er is iets bewezen. Bij "minder beweging" staat de regel er meteen. Geen
   confetti, geen geluid: geluid is overwogen en weggelaten, omdat het een instelling en een
   knop vraagt voor iets dat de meeste mensen uit zetten.
6. **Een dagpuzzel naast de dagchallenge.** De dagchallenge trekt vijf vragen uit de rooms
   (herinneren); de dagpuzzel is één opgave om te kraken, deterministisch uit de datum, in acht
   soorten. De weekopdracht is een vlag in drie lagen. De reeks is een getal, geen
   waarschuwing: wie een dag mist, begint opnieuw zonder melding.
7. **Zwakke plekken op het scorebord.** Per onderwerp het aandeel fouten en een knop die de
   arena op precies die vragen zet. De arena krijgt twee modi erbij: survival en een
   tijdsaanval van 90 seconden.
8. **Een resultaatkaart, geen certificaat.** Per voltooid pad een afdrukbare kaart. De naam
   blijft in de browser. Op de kaart staat dat het geen erkend certificaat is.
9. **"Check jezelf" draait de begrippen om.** Vijf vragen in drie minuten aan het eind van een
   room: je krijgt de omschrijving en kiest het begrip. Een schrijver kan eigen vragen meegeven
   (`room.check`).

## Gevolgen

Positief: de engine beloont nu zelf doen, en een schrijver kan een room omkeren (opdracht
eerst) zonder de engine aan te raken. Alles is uitbreidend opgeslagen; oude voortgang en
back-ups laden ongewijzigd (getest in `tools/labtest-leerlus.js`).

Negatief: XP is niet meer gelijk aan "aantal vragen maal tien", dus twee leerlingen met
dezelfde rooms af kunnen verschillende XP hebben. De variatie per dag is client-side en dus te
voorspellen voor wie de code leest; het doel is een reden om terug te komen, geen anti-cheat.

## Niet gedaan, met reden

- **Een vaardighedenkaart (skill tree).** De paden zijn al een lijn met knooppunten; een graaf
  vraagt per room een lijst van voorkennis die er nog niet is.
- **Geluid.** Zie punt 5.
- **Een gedeeld scorebord of multiplayer.** Dat vraagt een server en is een aparte beslissing.
- **Game rooms met een nagebootst doelwit om aan te vallen.** Niet gebouwd. De game rooms die er wel
  zijn, zijn verdedigend; zie [ADR-0003](0003-game-rooms-zijn-verdedigend.md).
