# Dataproject: Operatie Nachtvlinder

Je eerste echte dataproject als tactisch analist, buiten de browser, met Python, pandas, SQLite en networkx.
Het hoort bij het leerpad **Tactisch analist cybercrime** in de Cyber Dojo (room *Praktijkproject: Operatie
Nachtvlinder*). Alles in deze map is fictief: aliassen, wallets, teams en organisaties zijn verzonnen, IP-adressen
komen uit de documentatiebereiken.

Reken op zes tot tien uur, verspreid over een paar avonden.

## De casus

Vijf teams in de eenheid zien in oktober 2026 een golf van phishing, helpdeskfraude, DDoS en een paar
ransomware-aanvallen. Uit een eerder onderzoek heeft het Team Cybercrime een export gekregen van een
**phishingpanel**: het beheerscherm waarop criminele operators zien welke bankgegevens binnenkomen. Daarnaast zijn er
**berichten** tussen verdachten veiliggesteld en is er een export van **cryptobetalingen**.

Jouw vraag van de teamleider:

> Hangen de meldingen van de teams samen met dit panel? Wie zijn de belangrijkste personen, waar gaat het geld heen,
> en waar ligt de beste interventiekans? Ik wil maandag een notitie van één A4.

## Wat je nodig hebt

```bash
python -m venv .venv
```

Activeer de omgeving (`source .venv/bin/activate` op macOS/Linux, `.venv\Scripts\activate` op Windows) en installeer:

```bash
pip install -r requirements.txt
```

Werk in een Jupyter-notebook (`pip install notebook`, daarna `jupyter notebook`) of in losse `.py`-bestanden. Wat je
fijn vindt. SQLite zit in Python zelf (`import sqlite3`); wil je een grafische viewer, dan is
[DB Browser for SQLite](https://sqlitebrowser.org/) gratis.

## De data

| Bestand | Regels | Wat erin staat |
|---|---|---|
| `data/panel_logins.csv` | 2.497 | Elke actie op het panel: `tijd`, `server` (A of B), `operator`, `ip`, `doelbank`, `actie` |
| `data/meldingen.csv` | 374 | Meldingen van vijf teams: `melding_id`, `datum`, `team`, `soort`, `sector`, `schade_eur`, `ioc_ip`, `contact_id` |
| `data/berichten.csv` | 296 | Berichten tussen verdachten: `tijd_utc`, `van`, `naar`, `kanaal` |
| `data/betalingen.csv` | 141 | Cryptotransacties: `tx_id`, `tijd_utc`, `van_wallet`, `naar_wallet`, `bedrag_eur` |

> **Let op, net als in het echt:** de data is rommelig. Lees eerst, reken dan pas.

## Zo werk je

1. Lees per stap de opdracht en de vragen.
2. Schrijf je eigen code. Kijk niet in `uitwerking/` tot je klaar bent.
3. Vul je antwoorden in `antwoorden.txt` in en draai `python controleer.py`. Bij een fout antwoord krijg je een tip.
4. Houd een **logboek** bij: welke keuze maakte je bij het opschonen, en waarom? Dat logboek is in het echte werk
   net zo belangrijk als de uitkomst, want een ander moet je analyse kunnen herhalen.

---

## Stap 1 — Inladen en opschonen (pandas)

Laad `panel_logins.csv` met `pd.read_csv(..., dtype=str)` en kijk er eerst naar: `df.head(20)`, `df.info()`,
`df["operator"].value_counts()`, `df["doelbank"].value_counts()`.

Je zult drie problemen vinden:

- **Twee tijdnotaties.** Server A schrijft UTC (`2026-10-20T07:12:44Z`), server B lokale Nederlandse tijd met offset
  (`2026-10-20T09:12:44+02:00`). Na 25 oktober is het wintertijd (`+01:00`). Zet alles om naar UTC:
  `pd.to_datetime(df["tijd"], utc=True, format="ISO8601")`.
- **Schrijfvarianten.** Aliassen met hoofdletters of een spatie erachter, banknamen in vier vormen.
- **Dubbelingen.** Een deel van de export is twee keer aangeleverd (exact dezelfde regel). En een deel van de
  gebeurtenissen staat op **beide servers**: dezelfde actie, op hetzelfde moment, door dezelfde operator, maar in een
  andere notatie. Dat zie je pas ná het normaliseren.

**Vragen**
- **Q1** Hoeveel regels in de ruwe `panel_logins.csv` zijn een exacte kopie van een eerdere regel?
- **Q2** Hoeveel unieke gebeurtenissen blijven er over als je tijd, operator en doelbank normaliseert, de kolommen
  `tijd` (ruw) en `server` weglaat en dan ontdubbelt?
- **Q3** In hoeveel verschillende schrijfwijzen komt NederBank in de ruwe data voor?

## Stap 2 — Tellen, groeperen en koppelen (SQL)

Zet je opgeschoonde tabel en `meldingen.csv` in een SQLite-database:

```python
import sqlite3
db = sqlite3.connect("nachtvlinder.db")
schoon.to_sql("logins", db, index=False, if_exists="replace")
meldingen.to_sql("meldingen", db, index=False, if_exists="replace")
pd.read_sql("SELECT operator, COUNT(*) AS n FROM logins GROUP BY operator ORDER BY n DESC", db)
```

Schrijf de rest van de queries zelf. Gebruik `GROUP BY`, `COUNT(DISTINCT ...)` en een `JOIN`.

**Vragen**
- **Q4** Welke operator heeft na het opschonen de meeste gebeurtenissen op het panel?
- **Q5** Welk IP-adres uit het panel komt als `ioc_ip` voor in meldingen van de meeste **verschillende teams**?
- **Q6** Bij hoeveel verschillende teams komt dat IP-adres voor?
- **Q7** Bij hoeveel verschillende teams komt ransomware voor met contact-ID `tox-7F3A9C`?

## Stap 3 — Patronen en afwijkingen

Maak een tijdreeks: het aantal panelgebeurtenissen per uur (`schoon.set_index("tijd_utc").resample("1h").size()`)
en het aantal meldingen per dag. Maak van allebei een lijngrafiek met matplotlib. Wat valt op, en welke volgorde zie
je tussen het panel en de meldingen?

**Vragen**
- **Q8** Op welke datum (JJJJ-MM-DD, UTC) ligt het drukste uur op het panel?
- **Q9** Welk uur is dat in **Nederlandse tijd** (twee cijfers, bijvoorbeeld `14`)?
- **Q10** Op welke datum komen de meeste meldingen binnen?
- **Q11** Wat is de **mediaan** van het aantal meldingen per dag? Waarom is de mediaan hier een betere baseline dan
  het gemiddelde?

## Stap 4 — Het netwerk (networkx)

Bouw een **ongerichte** graaf uit `berichten.csv`: elke persoon is een knoop, elk paar dat berichten uitwisselt een
verbinding, met het aantal berichten als gewicht. Teken hem (`nx.draw_networkx`, met `nx.spring_layout`). Je ziet
twee groepen.

**Vragen**
- **Q12** Wie wisselt in totaal de meeste berichten uit (verzonden plus ontvangen)?
- **Q13** Wie heeft de hoogste **betweenness centrality**?
- **Q14** Met hoeveel verschillende personen heeft die persoon contact?

Denk na: wie zou je als eerste in beeld willen hebben, de persoon uit Q12 of die uit Q13? Waarom?

## Stap 5 — De geldstroom

Slachtoffers betalen aan verzamelwallets (`bc1q-verz-*`). Van daaruit gaat het geld via tussenwallets naar een
exchange. Volg het.

**Vragen**
- **Q15** Welke verzamelwallet ontvangt geld van de meeste **verschillende** slachtofferwallets (`bc1q-slo-*`)?
- **Q16** Hoeveel slachtofferwallets hebben meer dan één keer betaald?
- **Q17** Hoeveel euro komt er in totaal aan bij `exch-hot-noordwind`? Geef twee decimalen.

Maak eventueel een Sankey-diagram (bijvoorbeeld met plotly) van slachtoffers via verzamelwallets naar de exchange.

## Stap 6 — De notitie

Schrijf een notitie van maximaal één A4 voor de teamleider:

- **Conclusie eerst** (BLUF), in twee of drie zinnen.
- Wat je weet, wat je afleidt en wat je aanneemt, apart van elkaar, met **waarschijnlijkheidstaal**.
- Twee of drie **interventiekansen**, elk met een eigenaar.
- Wat je nog niet weet, en welke informatie dat zou oplossen.
- Eén grafiek die je verhaal draagt, niet vijf.

Vergelijk daarna met `uitwerking/notitie-voorbeeld.md`. Er is niet één goede notitie, maar het voorbeeld laat zien
wat erin hoort.

---

## Uitwerking

- `uitwerking/oplossing.py`: alle stappen in code (`python uitwerking/oplossing.py`).
- `uitwerking/notitie-voorbeeld.md`: een voorbeeldnotitie.
- `genereer_data.py`: zo is de data gemaakt. Lees dit pas als laatste: het verraadt de geplante sporen.

## Daarna

- Herhaal stap 1 tot en met 3 met een **openbare** dataset, bijvoorbeeld de open data van het CBS over
  geregistreerde criminaliteit (StatLine). Formuleer eerst zelf een vraag.
- Probeer dezelfde analyse in een ander gereedschap (Excel met Power Query, of een visualisatietool).
- Laat je notitie lezen door iemand die analist is, en vraag om feedback met het SBI-model.
