# ADR-0001: De Cyber Dojo draagt de NineMinds-huisstijl, en leert in één kolom

- Status: Accepted
- Date: 2026-10-19
- Deciders: René
- Hangt samen met: NineMinds ADR-0025 (een product buiten NFC krijgt een eigen repository),
  ADR-0031 (de huislaag werkt door in elk product) en ADR-0033 (een product mag de hele
  huisstijl dragen)

## Context

De dojo is een statisch leerportaal voor cybersecurity in het Nederlands: 78 rooms in negen
leerpaden, ongeveer 50 labs die in de browser draaien, en 1654 vragen. Het heette al
"NineMinds Cyber Dojo", maar zag er niet zo uit: systeemletters, een eigen groen accent,
afgeronde kaarten met schaduw en emoji als iconen. De startpagina zette alle 78 rooms onder
elkaar; op een telefoon was die 27.000 pixels lang.

René wil dat de dojo onder NineMinds valt, met het logo én de stijl, en dat de UI fijn is
om in te leren. De huislaag van NineMinds geeft andere producten alleen het teken; de
kleuren, letters en tokens zijn er alleen "met een reden in de eigen ADR". Dit is die ADR.

## Beslissing

1. **De dojo draagt de hele huisstijl.** Tokens, Archivo en Martian Mono, vierkante hoeken,
   haarlijnen, geen schaduwen, en de twee signaalkleuren met hun betekenis. De reden: de dojo
   is geen product met een eigen wereld (zoals FlaminGo of Siphon), maar een NineMinds-product
   dat als NineMinds wordt aangeboden. Alles komt uit `nineminds/` via de huislaag; er staat
   geen eigen kleur in `assets/css/style.css`.
2. **De betekenis van de kleuren past op leren.** Violet (`verified`) betekent bij NineMinds
   "bewezen". In de dojo is dat een goed antwoord, een gevonden vlag, een voltooide room of
   een gehaald examen, en verder niets: voortgang, knoppen en categorieën zijn inkt.
   Vermiljoen (`failed`) is een fout antwoord. Er is geen derde signaalkleur, ook niet voor
   "let op" of "gemiddeld"; daar staat het woord.
3. **Het teken beweegt alleen als er iets bewezen is.** In de topbalk staat het stil. Bij een
   goed antwoord slaat het één keer uit (de `verified`-beweging van NineMinds), en een
   voltooide room krijgt het teken in violet. Bij "minder beweging" beweegt niets.
4. **Leren in één kolom, met een ruggengraat.** De startpagina toont waar je bent (één knop
   om verder te gaan) en de negen paden als lijst. Een pad heeft een eigen pagina
   (`#/pad/<id>`) met zijn rooms op een lijn met een knooppunt per room, zoals de handelingen
   op een NineMinds-werkkaart. In een room staat de tekst in een leesbreedte van 70 tekens,
   met links de taken als dezelfde lijn; op een telefoon worden dat genummerde vakjes die
   meelopen. Een vraag is een open plek (gestippeld), die bij een goed antwoord een bewezen
   blok wordt.
5. **Iconen zijn getekend**, op één lijndikte (`assets/js/icons.js`), met een eigen teken per
   leerpad. Emoji zijn uit de interface gehaald. In de lesteksten blijven ze staan: dat is de
   stem van de schrijver, niet de interface.
6. **Machine-uitvoer is een donker scherm**, in beide thema's: terminal, logs, hexviewer,
   pakketten. Monochroom in Martian Mono; alleen een gevonden vlag is violet.
7. **Geen build-stap erbij.** De dojo blijft een statische site die via `file://` werkt. Het
   teken komt in `assets/js/house.js`, dat `node tools/build.js` uit `nineminds/` schrijft;
   `tools/validate.js` bewaakt dat het actueel is. De losse versie in `dist/` neemt de letters
   als data-URI mee.

## Gevolgen

Positief: de dojo is herkenbaar NineMinds, en een wijziging aan de tokens, letters of het
teken in NineMinds staat er met één sync en één build in. Een beginner ziet op de startpagina
één ding om te doen, en een pad toont in één oogopslag waar je staat.

Negatief: de dojo heeft geen eigen kleur meer om op te vallen; dat is de prijs van "als
NineMinds". De labs gebruiken nog de oude variabelenamen (`--good`, `--warn`), die nu naar
tokens wijzen; dat is een vertaallaag die iemand moet kennen (`assets/css/style.css`, bovenaan).
Via `file://` behandelt Firefox elk bestand als een eigen herkomst en kan het de letters
weigeren; dan valt de dojo terug op Helvetica (getest is alleen Chromium, waar ze laden).
Via een webserver of de losse versie in `dist/` speelt dat niet.

## Alternatieven overwogen

- **Alleen het teken, met een eigen design (zoals FlaminGo en Siphon).** Dan blijft de dojo
  een product met een NineMinds-sticker, terwijl René hem als NineMinds wil aanbieden.
- **Een framework en een build-stap (bijvoorbeeld Vite).** Maakt svg- en fontimports
  makkelijker, maar de dojo moet met een dubbelklik op `index.html` werken, ook offline. Een
  gegenereerd `house.js` is genoeg.
- **Emoji vervangen door een icoonfont.** NineMinds verbiedt icoonfonts, en een font laadt
  via `file://` in Firefox niet. Inline svg wel.
