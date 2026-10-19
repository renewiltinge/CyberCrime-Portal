# nineminds/: de huislaag

De Cyber Dojo is een product van NineMinds, maar staat niet in de NineMinds-repository. Wat
het van NineMinds meeneemt staat in deze map, en **alleen** in deze map. Anders dan de andere
producten draagt de dojo de hele huisstijl, niet alleen het teken; waarom staat in
[ADR-0001](../docs/adr/0001-de-dojo-draagt-de-nineminds-huisstijl.md).

| Hier | Komt uit NineMinds | Waarvoor |
|---|---|---|
| `brand/tokens.css` | `brand/tokens/tokens.css` | Alle kleuren, maten en letterschalen, licht en donker. `assets/css/style.css` bouwt erop. |
| `brand/fonts/` | `brand/fonts/` | Archivo en Martian Mono, zelf gehost met `fonts.css` en de OFL-licenties. Werkt ook via `file://`. |
| `brand/logo/mark-mono.svg` | idem | Het teken in de voet en in het bewezen blok |
| `brand/logo/wordmark.svg` | idem | *Een product van NineMinds* in de voet |
| `brand/motion/mark-animated-inline.svg` | idem | Het teken in de topbalk, dat één keer uitslaat als je iets goed hebt |
| `brand/motion/mark-animation.css` | idem | Die beweging, met de regels van NineMinds (stil bij "minder beweging") |
| `brand/favicon.svg` | `brand/favicon/favicon.svg` | Het tabicoon |
| `lock.json` | n.v.t. | Van welke NineMinds-commit deze kopie is |

De lijst staat ook in [`house.json`](house.json), en daar is hij leidend. Naast deze README
is dat het enige bestand in deze map dat van de dojo is.

## De regels

1. **Niet met de hand bewerken**, behalve `house.json` en deze README. `sync.ps1` en
   `lock.json` zijn van het mechanisme; het script komt uit NineMinds (`house/sync.ps1`).
2. **Het teken wordt ingeplakt, niet nagetekend.** Een pagina via `file://` mag geen svg
   ophalen, dus `node tools/build.js` zet de svg's uit deze map in `assets/js/house.js`.
   `node tools/validate.js` faalt als dat bestand achterloopt op deze map.
3. **Bijwerken is een bewuste stap:**

   ```powershell
   .\nineminds\sync.ps1          # ophalen uit ..\NineMinds en lock.json bijwerken
   .\nineminds\sync.ps1 -Check   # alleen kijken of de kopie achterloopt
   node tools/build.js           # house.js opnieuw uit de nieuwe svg's
   ```

   Of vanuit NineMinds, voor alle producten tegelijk: `.\house\sync-products.ps1 -Commit`
   (draai daarna `node tools/build.js` hier).
4. **Geen eigen kleuren of letters erbij.** `assets/css/style.css` gebruikt alleen de tokens
   hieruit. Wat in de labs nog `--good`, `--bad` of `--warn` heet, wijst naar die tokens.
