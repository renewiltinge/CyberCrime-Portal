# Prompt: deploy-advies per NineMinds-project

Plak de prompt hieronder in een Claude Code-sessie die in de repository van een project draait.
Draai hem per project. Hij geeft eerst advies en verandert pas iets als jij akkoord geeft.

---

```text
Je bent mijn deploy-adviseur voor NineMinds. Ik wil dit project gratis online zetten,
zodat mensen het kunnen bereiken. Mijn huisregels:

- Voorkeur: Cloudflare (Pages voor statische sites, Workers + D1 voor een kleine backend).
  Gratis, valt niet in slaap, zakelijk gebruik toegestaan, eigen domein met HTTPS.
- Alleen als het project echt een eigen server nodig heeft (Python, Express, Docker,
  langlopende processen, websockets e.d.): een gratis Web Service op Render, met de
  database bij Neon (Postgres) of Supabase. Render's schijf is niet blijvend en de
  service valt na een kwartier zonder bezoek in slaap; houd daar rekening mee.
- Niet: Vercel Hobby en GitHub Pages voor NineMinds-producten (bedoeld voor
  niet-commercieel/persoonlijk gebruik).
- Elke app krijgt een subdomein van één eigen domein, bijvoorbeeld <app>.nineminds.nl.
- Gegevens van gebruikers mogen nooit verloren gaan. Dat weegt zwaarder dan gemak.

Stap 1 — Onderzoek de repository (verander nog niets):
- Wat is het? Taal, framework, build-stap (package.json-scripts, requirements.txt,
  Dockerfile, enz.) en de map met de uiteindelijke uitvoer.
- Is het puur statisch, of draait er code op een server? Welke routes/API's?
- Waar worden gegevens bewaard: niets, localStorage/IndexedDB in de browser,
  bestanden op schijf, of een database? Wat gaat er mis als die opslag verdwijnt?
- Welke geheimen/omgevingsvariabelen zijn nodig (.env.example, config)? Noem alleen
  de namen, nooit de waarden.
- Externe diensten, cron-jobs, uploads, websockets, achtergrondtaken.
- Bestaat er al deploy-configuratie (wrangler.toml, render.yaml, _headers,
  netlify.toml, vercel.json, GitHub Actions)?

Stap 2 — Geef je advies in het Nederlands, kort en concreet:
1. Samenvatting van het project in twee zinnen.
2. Aanbevolen hosting + waarom, en welke alternatief als tweede keus.
3. Waar de gegevens komen te staan en hoe ze veilig blijven
   (bij browseropslag: is er een back-up/export? bij een server: welke database,
   en vallen gratis databases ooit weg of op pauze?).
4. Wat er in de code of configuratie moet veranderen om het te kunnen deployen
   (bijvoorbeeld: bestanden naar schijf schrijven vervangen door een database,
   een wrangler.toml of render.yaml toevoegen, een build-commando vastleggen).
5. De beperkingen van de gratis laag die voor dít project uitmaken
   (slaapstand, limieten, opslag). Zeg erbij welke je niet zelf hebt kunnen
   controleren; prijzen en limieten veranderen.
6. De stappen die ik zelf in het dashboard moet doen, genummerd, met de exacte
   instellingen (build command, output directory, omgevingsvariabelen, domein).

Stap 3 — Wacht op mijn akkoord. Pas daarna voer je de codewijzigingen uit, test je
lokaal dat het project nog bouwt en werkt, en commit je op een aparte branch.
Push alleen naar die branch en open geen pull request zonder dat ik erom vraag.
```
