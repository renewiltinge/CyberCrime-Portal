# DESIGN.md — Cyber Dojo

De dojo draagt de NineMinds-huisstijl ([ADR-0001](docs/adr/0001-de-dojo-draagt-de-nineminds-huisstijl.md)).
De bron is `DESIGN.md` in de NineMinds-repository; dit bestand zegt alleen hoe die stijl op
een leerportaal is toegepast. Tokens, letters en het teken komen uit [`nineminds/`](nineminds/README.md),
de opmaak staat in [`assets/css/style.css`](assets/css/style.css), de iconen in
[`assets/js/icons.js`](assets/js/icons.js).

## Wat de kleuren betekenen

| Kleur | Token | Betekent in de dojo | Nooit voor |
|---|---|---|---|
| Violet | `--nm-verdict-verified` (`--good`) | Een goed antwoord, een gevonden vlag, een voltooide room, een gehaald examen, een verdiende badge | Knoppen, voortgang, categorieën, versiering |
| Vermiljoen | `--nm-verdict-failed` (`--bad`) | Een fout antwoord, iets dat in een lab faalt, een rode vlag in een phishingmail | Waarschuwingen, "moeilijk" |
| Inkt | `--nm-text`, `--nm-interactive` | Al het andere: tekst, primaire knoppen, voortgangsbalken, de actieve taak | — |

Er is geen derde signaalkleur. "Let op" is een callout met dat woord erboven en een rozige
ondergrond (`--nm-surface-tint`); moeilijkheid zijn drie blokjes; een gemiddelde CVSS-score
is inkt met het woord "Medium". Kleur is nooit het enige signaal: goed en fout hebben ook
een vinkje of kruis en een woord.

## Letters

**Archivo** voor alles wat een mens schreef: titels, lesstof, vragen, knoppen.
**Martian Mono** alleen voor wat een machine maakte of telt: XP, levels, tellers ("3/16"),
stempels ("TAAK 2 VAN 7"), vlaggen en antwoorden die je intypt, en alle labuitvoer.

## Vorm

Vierkante hoeken, haarlijnen, geen schaduwen. Een kaart is een rand óf een ondergrond.
Hoofdsecties sluiten af met een harde lijn van 2px in inkt, zoals de werkkaart van NineMinds.

## Bouwstenen

| Onderdeel | Waar | Vorm |
|---|---|---|
| Topbalk | `renderTopbar` | Teken (beweegt alleen bij een goed antwoord), "Cyber Dojo", Leerpaden · Oefenen · Gereedschap, zoeken (`/`), thema, level en XP |
| Ga verder | `renderHome` | Eén blok met de volgende room, zijn voortgang en één knop; eronder de vier tellers |
| Leerpaden | `renderHome`, `renderPath` | Een genummerde lijst met een getekend teken per pad; een pad opent zijn rooms op een lijn met een knooppunt per room (leeg, half, violet = af) |
| Room | `renderRoom` | Kop met stempel, doelen met vinkjes, links de taken als lijn (op een telefoon genummerde vakjes die meelopen), rechts de tekst op leesbreedte |
| Vraag | `renderQuestion` | Een open plek: gestippeld op een verzonken ondergrond, rand doorgetrokken bij focus, een bewezen blok als het goed is |
| Lab | `labs.js` | Een raam met een kopregel `LAB`; machine-uitvoer is een donker scherm in beide thema's |
| Room af | `renderRoomDone` | Het bewezen blok met het NineMinds-teken in violet |
| Voet | `renderFooter` | *Een product van* met het woordmerk, en de regel over ethiek |

## Beweging

Alleen wat iets zegt: het teken bij een goed antwoord, een fout antwoord dat even schudt, een
melding die binnenschuift. Alles staat stil bij `prefers-reduced-motion`.

## Telefoon

Op 390px breed scrolt geen enkele pagina horizontaal (alle rooms en pagina's gecontroleerd);
brede tabellen en logregels scrollen binnen hun eigen vak. Invoervelden zijn 16px, zodat iOS
niet inzoomt. Knoppen en antwoordopties zijn minstens 44px hoog; chips in labs 32px.
