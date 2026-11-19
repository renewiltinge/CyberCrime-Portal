/* Room: Praktijkproject Operatie Nachtvlinder — leerpad Tactisch analist cybercrime */

CS.registerRoom({
  id: 'ta-dataproject',
  path: 'tactisch-analist',
  order: 10,
  title: 'Praktijkproject: Operatie Nachtvlinder',
  icon: '🦋',
  difficulty: 'Moeilijk',
  minutes: 480,
  level: 'Gevorderd',
  checked: '2026-11-19',
  summary: 'Je eerste echte dataproject, buiten de browser: een rommelige export van een phishingpanel, meldingen van vijf teams, berichten tussen verdachten en cryptobetalingen. Je schoont op met pandas, telt en koppelt met SQL, zoekt de broker met networkx, volgt het geld en schrijft een notitie van één A4.',
  objectives: [
    'Een rommelige export opschonen met pandas: tijdzones naar UTC, schrijfvarianten normaliseren en verborgen dubbelingen vinden',
    'Tellen, groeperen en koppelen met SQL in SQLite (GROUP BY, COUNT DISTINCT, JOIN)',
    'Een piek en een baseline onderscheiden in een tijdreeks, en de mediaan als baseline gebruiken',
    'Met networkx de spil en de broker in een berichtennetwerk vinden',
    'Een geldstroom van slachtoffers via verzamelwallets naar een exchange volgen',
    'Je analyse herhaalbaar vastleggen en samenvatten in een notitie met de conclusie eerst',
  ],
  tasks: [
    {
      title: 'Taak 1 — Het project klaarzetten',
      content: `
        <p>Tot nu toe deed je alles in de browser. In het echte werk krijg je een export van duizenden regels, en die
        open je niet in een lab maar in je eigen gereedschap. Dit project oefent precies dat, met de drie soorten
        software die de vacature noemt: een <strong>programmeertaal</strong> (Python met pandas),
        <strong>databasesoftware</strong> (SQLite) en <strong>visualisatie</strong> (matplotlib en networkx).</p>

        <h3>Waar het project staat</h3>
        <p>Het project staat in de repository van de dojo, in de map <code>projecten/dataproject-nachtvlinder/</code>.
        Daarin vind je:</p>
        <ul>
          <li><code>README.md</code>: de casus en het stappenplan met alle vragen (Q1 tot en met Q17);</li>
          <li><code>data/</code>: vier CSV-bestanden (ook los te downloaden:
          <a href="projecten/dataproject-nachtvlinder/data/panel_logins.csv" target="_blank" rel="noopener">panel_logins</a>,
          <a href="projecten/dataproject-nachtvlinder/data/meldingen.csv" target="_blank" rel="noopener">meldingen</a>,
          <a href="projecten/dataproject-nachtvlinder/data/berichten.csv" target="_blank" rel="noopener">berichten</a>,
          <a href="projecten/dataproject-nachtvlinder/data/betalingen.csv" target="_blank" rel="noopener">betalingen</a>);</li>
          <li><code>antwoorden.txt</code> en <code>controleer.py</code>: vul je antwoorden in en laat ze nakijken;</li>
          <li><code>uitwerking/</code>: de oplossing in code en een voorbeeldnotitie. Pas openen als je klaar bent.</li>
        </ul>

        <h3>Installeren</h3>
<pre><code>cd projecten/dataproject-nachtvlinder
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python controleer.py             # 0 van 17 goed: je kunt beginnen</code></pre>

        <h3>De casus</h3>
        <p>Vijf teams zien in oktober 2026 een golf van phishing, helpdeskfraude, DDoS en ransomware. Uit een eerder
        onderzoek is een export van een <strong>phishingpanel</strong> beschikbaar, plus veiliggestelde berichten en
        cryptotransacties. De teamleider vraagt: hangen de meldingen samen met dit panel, wie zijn de belangrijkste
        personen, waar gaat het geld heen en waar ligt de beste interventiekans? Maandag wil zij één A4.</p>

        <div class="callout tip">
          <strong>Tip:</strong> houd vanaf de eerste regel code een <strong>logboek</strong> bij van elke keuze bij
          het opschonen. Als je collega je getal niet kan reproduceren, is het geen bevinding maar een mening.
        </div>
        <p>De vragen in deze room zijn dezelfde als in <code>antwoorden.txt</code>. Je kunt ze hier invullen voor XP,
        of met <code>controleer.py</code> nakijken. Allebei mag.</p>
      `,
      questions: [
        { q: 'Ik heb de projectmap geopend, de pakketten geïnstalleerd en controleer.py gedraaid.', noAnswer: true },
        { q: 'Waarom houd je een logboek bij van je keuzes bij het opschonen?', options: ['Omdat het verplicht is in Python', 'Zodat een ander je analyse kan herhalen en je getallen kan controleren', 'Om de data kleiner te maken', 'Zodat je de ruwe data kunt weggooien'], answer: 1,
          wrong: { 0: 'Python verplicht niets; het is een vakeis voor analisten.', 2: 'Een logboek verandert de data niet.', 3: 'De ruwe data bewaar je juist altijd, ongewijzigd.' },
          explain: 'Herhaalbaarheid: een getal zonder herleidbare stappen kun je niet verdedigen.' },
      ],
    },

    {
      title: 'Taak 2 — Stap 1: inladen en opschonen',
      content: `
        <p>Laad <code>panel_logins.csv</code> met <code>pd.read_csv(..., dtype=str)</code> en bekijk de data
        voordat je rekent: <code>df.head(20)</code>, <code>df.info()</code> en <code>value_counts()</code> op de
        kolommen <code>operator</code> en <code>doelbank</code>.</p>
        <p>Je vindt drie problemen. <strong>Twee tijdnotaties</strong>: server A schrijft UTC met een Z, server B
        Nederlandse tijd met een offset, en op 25 oktober gaat de zomertijd eruit. Zet alles om met
        <code>pd.to_datetime(df["tijd"], utc=True, format="ISO8601")</code>. <strong>Schrijfvarianten</strong>: aliassen
        met hoofdletters of een spatie, banknamen in meerdere vormen. En <strong>dubbelingen</strong>, van twee
        soorten: exacte kopieën, en dezelfde gebeurtenis op beide servers in een andere notatie. Die tweede soort zie
        je pas ná het normaliseren.</p>
<pre><code>schoon = df.copy()
schoon["tijd_utc"] = pd.to_datetime(schoon["tijd"], utc=True, format="ISO8601")
schoon["operator"] = schoon["operator"].str.strip().str.lower()
# ... doelbank normaliseren ...
schoon = schoon.drop(columns=["tijd", "server"]).drop_duplicates()</code></pre>
      `,
      questions: [
        { q: 'Q1 — Hoeveel regels in de ruwe panel_logins.csv zijn een exacte kopie van een eerdere regel?', answer: ['97'],
          hints: ['Gebruik df.duplicated() op de ruwe data, vóór je iets aanpast.', 'df.duplicated().sum() telt alleen de herhalingen, niet de eerste keer.'],
          explain: '97 regels zijn twee keer aangeleverd.' },
        { q: 'Q2 — Hoeveel unieke gebeurtenissen blijven er over na normaliseren (tijd, operator, doelbank), weglaten van de kolommen tijd en server, en ontdubbelen?', answer: ['2357'],
          hints: ['Eerst normaliseren, dan pas drop_duplicates().', 'Als je de kolom server laat staan, blijven de gespiegelde gebeurtenissen dubbel.', 'Het antwoord ligt tussen 2300 en 2400.'],
          wrong: { '2400': 'Dat is na het weghalen van de exacte kopieën. Er staan nog gebeurtenissen dubbel die op beide servers voorkomen.', '2497': 'Dat is het ruwe aantal regels.' },
          why: 'Gespiegelde logs komen in het echt veel voor (twee servers, twee exports, twee tijdzones). Wie ze niet vindt, telt sommige gebeurtenissen dubbel.',
          explain: '2.497 − 97 exacte kopieën − 43 gespiegelde gebeurtenissen = 2.357.' },
        { q: 'Q3 — In hoeveel verschillende schrijfwijzen komt NederBank in de ruwe data voor?', answer: ['4', 'vier'],
          hints: ['Kijk naar df["doelbank"].value_counts().', 'Hoofdletters en een spatie in de naam tellen als andere schrijfwijzen.'],
          explain: 'NederBank, nederbank, Neder Bank en NEDERBANK.' },
      ],
    },

    {
      title: 'Taak 3 — Stap 2: tellen, groeperen en koppelen met SQL',
      content: `
        <p>Zet de opgeschoonde logins en <code>meldingen.csv</code> in SQLite en schrijf je queries zelf:</p>
<pre><code>import sqlite3
db = sqlite3.connect("nachtvlinder.db")
schoon.to_sql("logins", db, index=False, if_exists="replace")
meldingen.to_sql("meldingen", db, index=False, if_exists="replace")
pd.read_sql("SELECT operator, COUNT(*) AS n FROM logins GROUP BY operator ORDER BY n DESC", db)</code></pre>
        <p>Voor de koppeling heb je een <code>JOIN</code> nodig tussen de unieke IP-adressen van het panel en de kolom
        <code>ioc_ip</code> in de meldingen, en een <code>COUNT(DISTINCT team)</code>. Tel <em>teams</em>, geen
        meldingen: het gaat om de vraag of dit één fenomeen is dat in meerdere teams opduikt.</p>
      `,
      questions: [
        { q: 'Q4 — Welke operator heeft na het opschonen de meeste gebeurtenissen op het panel?', answer: ['spinner'],
          hints: ['GROUP BY operator, ORDER BY het aantal aflopend.', 'Tel ná het normaliseren; varianten van dezelfde alias vallen samen.'],
          explain: 'spinner: 768 gebeurtenissen, gevolgd door motte (657).' },
        { q: 'Q5 — Welk IP-adres uit het panel komt als ioc_ip voor in meldingen van de meeste verschillende teams?', answer: ['203.0.113.77'],
          hints: ['JOIN (SELECT DISTINCT ip FROM logins) op meldingen.ioc_ip.', 'Groepeer op ioc_ip en tel DISTINCT team.'],
          wrong: { '192.0.2.45': 'Dat panel-IP komt ook in de meldingen voor, maar bij minder teams.' },
          explain: '203.0.113.77, een IP-adres dat in het panel alleen door spinner wordt gebruikt.' },
        { q: 'Q6 — Bij hoeveel verschillende teams komt dat IP-adres voor?', answer: ['3', 'drie'],
          hints: ['Dezelfde query als bij Q5.'],
          explain: 'Basisteam Duinstreek, Districtsrecherche Kust en Team Cybercrime.' },
        { q: 'Q7 — Bij hoeveel verschillende teams komt ransomware voor met contact-ID tox-7F3A9C?', answer: ['3', 'drie'],
          hints: ['WHERE soort = \'ransomware\' AND contact_id = \'tox-7F3A9C\'', 'Tel DISTINCT team.'],
          explain: 'Drie teams. Dat is een dwarsverband, maar of het bij dit panel hoort, zegt deze query nog niet.' },
      ],
    },

    {
      title: 'Taak 4 — Stap 3: patronen en afwijkingen',
      content: `
        <p>Maak twee tijdreeksen: panelgebeurtenissen per uur
        (<code>schoon.set_index("tijd_utc").resample("1h").size()</code>) en meldingen per dag
        (<code>meldingen.groupby("datum").size()</code>). Teken ze onder elkaar met matplotlib. Kijk naar de volgorde:
        wat gebeurt er eerst, en wat volgt?</p>
        <p>Een piek is pas een piek tegenover een <strong>baseline</strong>. Neem daarvoor de <strong>mediaan</strong>,
        niet het gemiddelde: één uitschieter trekt het gemiddelde omhoog, de mediaan niet. En let op de tijd: rapporteer
        je aan een Nederlandse teamleider, dan noem je Nederlandse tijd en zeg je dat erbij.</p>
      `,
      questions: [
        { q: 'Q8 — Op welke datum (JJJJ-MM-DD, UTC) ligt het drukste uur op het panel?', answer: ['2026-10-20'],
          hints: ['Zoek idxmax() van de reeks per uur.'],
          explain: '20 oktober 2026, met 147 gebeurtenissen in één uur.' },
        { q: 'Q9 — Welk uur is dat in Nederlandse tijd (twee cijfers)?', answer: ['09', '9'],
          hints: ['Het piekuur in UTC is 07.', 'Op 20 oktober geldt nog zomertijd (UTC+2).'],
          wrong: { '07': 'Dat is UTC. Op 20 oktober is het in Nederland twee uur later.', '7': 'Dat is UTC. Op 20 oktober is het in Nederland twee uur later.', '08': 'Dat zou wintertijd zijn (UTC+1). Die begint pas op 25 oktober.', '8': 'Dat zou wintertijd zijn (UTC+1). Die begint pas op 25 oktober.' },
          explain: '07:00 UTC is 09:00 in Nederland (zomertijd tot 25 oktober).' },
        { q: 'Q10 — Op welke datum komen de meeste meldingen binnen?', answer: ['2026-10-21'],
          hints: ['Groepeer de meldingen per datum en zoek het maximum.'],
          explain: '21 oktober: 60 meldingen, één dag na de piek op het panel.' },
        { q: 'Q11 — Wat is de mediaan van het aantal meldingen per dag?', answer: ['17', '17.0', '17,0'],
          hints: ['.median() op de reeks per dag.'],
          why: 'Met een gemiddelde als baseline wordt de piekdag deels zijn eigen maatstaf; de mediaan blijft staan.',
          explain: 'De mediaan is 17 per dag; de 60 meldingen op 21 oktober zijn dus ruim drie keer zo veel.' },
      ],
    },

    {
      title: 'Taak 5 — Stap 4: het netwerk',
      content: `
        <p>Bouw een <strong>ongerichte</strong> graaf uit <code>berichten.csv</code>, met het aantal berichten per paar
        als gewicht:</p>
<pre><code>import networkx as nx
G = nx.Graph()
for (a, b), n in paren.items():          # paren: aantal berichten per (persoon, persoon)
    G.add_edge(a, b, weight=n)
dict(G.degree(weight="weight"))          # berichten per persoon
nx.betweenness_centrality(G)             # wie ligt op de kortste paden?</code></pre>
        <p>Teken de graaf met <code>nx.draw_networkx(G, pos=nx.spring_layout(G, seed=1))</code>. Je ziet twee groepen:
        een groep die werft en het panel bedient, en een groep die techniek levert. De vraag voor je advies is niet
        alleen <em>wie is het drukst</em>, maar ook <em>wie verbindt</em>.</p>
      `,
      questions: [
        { q: 'Q12 — Wie wisselt in totaal de meeste berichten uit (verzonden plus ontvangen)?', answer: ['bunkerbaas'],
          hints: ['Gewogen degree: G.degree(weight="weight").', 'Het is de spil van de technische groep, niet van de wervers.'],
          wrong: { 'spinner': 'Spinner is de spil van de wervers en tweede in berichten. Iemand in de andere groep wisselt er meer uit.', 'nachtvlinder': 'Nachtvlinder heeft juist weinig berichten. Kijk naar betweenness voor zijn rol.' },
          explain: 'bunkerbaas: 100 berichten, gevolgd door spinner (89).' },
        { q: 'Q13 — Wie heeft de hoogste betweenness centrality?', answer: ['nachtvlinder'],
          hints: ['nx.betweenness_centrality(G), dan het maximum.', 'Zoek de persoon die als enige in beide groepen contacten heeft.'],
          explain: 'nachtvlinder (0,55): de enige verbinding tussen de wervers en de technische groep.' },
        { q: 'Q14 — Met hoeveel verschillende personen heeft die persoon contact?', answer: ['4', 'vier'],
          hints: ['G.degree("nachtvlinder"), zonder gewicht.'],
          explain: 'Vier contacten: twee in elke groep. Weinig contact, grote positie: het klassieke profiel van een broker.' },
        { q: 'Je kunt maar één persoon als eerste in beeld brengen. Wie raakt het netwerk het hardst?', options: ['bunkerbaas, want die heeft de meeste berichten', 'nachtvlinder, want zonder hem vallen werving en techniek uit elkaar', 'spinner, want die is het actiefst op het panel', 'kever, want die valt het minst op'], answer: 1,
          boss: true,
          wrong: { 0: 'Veel berichten maakt iemand belangrijk binnen zijn groep, maar de groep heeft andere verbindingen die het kunnen overnemen.', 2: 'Spinner is een sterk opsporingsdoel (het IP-adres in drie teams), maar de wervers kunnen een andere operator inzetten. De schakel is schaarser.', 3: 'Weinig opvallen is geen reden om iemand als eerste te kiezen.' },
          why: 'Combineer betweenness (de positie) met vervangbaarheid (de rol): een broker zonder vervanger is vaak de beste interventiekans.',
          explain: 'nachtvlinder is de enige brug. Zonder hem moeten de wervers een nieuwe technische leverancier zoeken.' },
      ],
    },

    {
      title: 'Taak 6 — Stap 5: de geldstroom',
      content: `
        <p>Slachtoffers betalen aan verzamelwallets (<code>bc1q-verz-*</code>). Van daaruit gaat ongeveer negen tiende
        via tussenwallets naar een exchange, de rest naar wallets van operators. Filter de betalingen die van een
        slachtofferwallet (<code>bc1q-slo-*</code>) komen, en tel per verzamelwallet het aantal <em>unieke</em>
        afzenders: dat zegt meer over de omvang dan het aantal transacties. Volg daarna de stroom naar de exchange en
        tel de bedragen op. Een Sankey-diagram (bijvoorbeeld met plotly) maakt de stroom zichtbaar voor een lezer
        zonder cryptokennis.</p>
      `,
      questions: [
        { q: 'Q15 — Welke verzamelwallet ontvangt geld van de meeste verschillende slachtofferwallets?', answer: ['bc1q-verz-01'],
          hints: ['groupby("naar_wallet")["van_wallet"].nunique()'],
          explain: 'bc1q-verz-01, met 61 unieke slachtofferwallets.' },
        { q: 'Q16 — Hoeveel slachtofferwallets hebben meer dan één keer betaald?', answer: ['8', 'acht'],
          hints: ['Tel per van_wallet het aantal betalingen en kijk welke boven 1 komen.'],
          explain: 'Acht slachtoffers betaalden twee keer: een signaal voor herhaald slachtofferschap, en dus voor een waarschuwing aan de bank.' },
        { q: 'Q17 — Hoeveel euro komt er in totaal aan bij exch-hot-noordwind? Twee decimalen.', answer: ['234666.10', '234666,10', '234666.1', '234.666,10'],
          hints: ['Filter op naar_wallet == "exch-hot-noordwind" en tel bedrag_eur op.'],
          explain: '€ 234.666,10: negen tiende van wat de slachtoffers betaalden.' },
      ],
    },

    {
      title: 'Taak 7 — Stap 6: de notitie',
      content: `
        <p>Schrijf nu de notitie van maximaal één A4. Begin met de conclusie (BLUF). Houd uit elkaar wat je
        <strong>weet</strong> (uit de data), wat je <strong>afleidt</strong> en wat je <strong>aanneemt</strong>, en
        gebruik waarschijnlijkheidstaal. Geef twee of drie interventiekansen, elk met een eigenaar. Zet erbij wat je
        nog niet weet en welke informatie dat zou oplossen. Kies één grafiek die je verhaal draagt.</p>
        <p>Vergelijk daarna met <code>uitwerking/notitie-voorbeeld.md</code>. Let vooral op twee valkuilen. Ten eerste:
        de ransomware met <code>tox-7F3A9C</code> verbindt drie teams, maar komt niet in het panel of de berichten
        voor. Dat is een dwarsverband tussen meldingen, geen bewijs dat het om dezelfde groep gaat. Ten tweede: de
        drukste persoon in het netwerk is niet vanzelf de beste interventiekans.</p>
        <div class="callout info">
          <strong>Daarna:</strong> herhaal stap 1 tot en met 3 met een openbare dataset (bijvoorbeeld de
          criminaliteitscijfers van het CBS op StatLine), met een vraag die je zelf formuleert. Laat je notitie lezen
          door een ervaren analist en vraag om feedback met het SBI-model.
        </div>
      `,
      questions: [
        { q: 'Je notitie noemt de ransomware met tox-7F3A9C. Hoe formuleer je die?', options: ['Als vaststaand onderdeel van de groep rond het panel', 'Als dwarsverband tussen drie teams, met een reële kans dat het een losse affiliate is die niet bij het panel hoort', 'Je laat hem weg, want hij past niet', 'Als bewijs dat spinner ook ransomware inzet'], answer: 1,
          wrong: { 0: 'Niets in het panel of de berichten verbindt het contact-ID met deze groep. Dat zou een aanname als feit presenteren.', 2: 'Weglaten verbergt een relevant dwarsverband. Benoem het en zeg wat je niet weet.', 3: 'Daar is geen enkel spoor voor in de data.' },
          explain: 'Benoem het dwarsverband, label de koppeling met het panel als aanname, en zeg welke informatie de vraag zou beslissen.' },
        { q: 'Ik heb mijn notitie geschreven en vergeleken met de voorbeeldnotitie.', noAnswer: true },
      ],
    },
  ],
  check: [
    { q: 'Waarom zet je alle tijden om naar UTC voordat je ontdubbelt of telt?', options: ['UTC is korter om te schrijven', 'Omdat dezelfde gebeurtenis anders in twee notaties als twee gebeurtenissen telt, en uren niet vergelijkbaar zijn', 'Omdat pandas geen lokale tijd kent', 'Dat hoeft niet bij gegevens uit Nederland'], answer: 1, explain: 'Eén tijdsbasis maakt dubbelingen zichtbaar en tijdreeksen eerlijk; voor de lezer reken je terug naar Nederlandse tijd.' },
    { q: 'Wat meet COUNT(DISTINCT team) in de koppelquery?', options: ['Het aantal meldingen', 'Het aantal verschillende teams waarin het spoor voorkomt', 'Het aantal IP-adressen', 'Het aantal dubbele meldingen'], answer: 1, explain: 'Je wilt weten of een spoor teamgrenzen overschrijdt: dat is een dwarsverband.' },
    { q: 'Een persoon met weinig contacten maar de hoogste betweenness is meestal...', options: ['onbelangrijk', 'een broker tussen groepen', 'de leider', 'een slachtoffer'], answer: 1, explain: 'Betweenness meet de positie op kortste paden; een broker verbindt groepen die anders los zouden staan.' },
    { q: 'Waarom tel je unieke slachtofferwallets in plaats van transacties?', options: ['Transacties zijn niet te tellen', 'Omdat sommige slachtoffers meerdere keren betalen; unieke afzenders zeggen meer over het aantal slachtoffers', 'Omdat wallets geen bedragen hebben', 'Het maakt niet uit'], answer: 1, explain: 'Acht slachtoffers betaalden twee keer; tel je transacties, dan overschat je het aantal slachtoffers.' },
  ],
  terms: [
    { term: 'pandas', def: 'Python-bibliotheek voor tabellen (DataFrames): inladen, opschonen, groeperen en koppelen.' },
    { term: 'SQLite', def: 'Een database in één bestand, zonder server; standaard ingebouwd in Python (sqlite3).' },
    { term: 'networkx', def: 'Python-bibliotheek voor grafen en netwerkanalyse, met onder meer degree en betweenness centrality.' },
    { term: 'UTC', def: 'Gecoördineerde wereldtijd: één tijdsbasis zonder zomer- en wintertijd. In Nederland is het UTC+2 in de zomer en UTC+1 in de winter.' },
    { term: 'Gespiegelde log', def: 'Dezelfde gebeurtenis die in twee bronnen (bijvoorbeeld twee servers) staat, vaak in een andere notatie.' },
    { term: 'Baseline', def: 'Het normale niveau waartegen je een afwijking afzet; de mediaan is robuuster dan het gemiddelde.' },
    { term: 'Gewogen degree', def: 'De som van de gewichten van iemands verbindingen, hier het totale aantal berichten.' },
    { term: 'Betweenness centrality', def: 'Het aandeel kortste paden tussen anderen dat via een knoop loopt; hoog bij een broker.' },
    { term: 'Verzamelwallet', def: 'Wallet die betalingen van veel slachtoffers ontvangt voordat het geld wordt doorgesluisd.' },
    { term: 'Herhaalbaarheid', def: 'Een ander kan met dezelfde data en stappen hetzelfde resultaat krijgen; vereist een logboek of code.' },
  ],
  resources: [
    { title: 'pandas: 10 minutes to pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html' },
    { title: 'SQLite: SELECT', url: 'https://www.sqlite.org/lang_select.html' },
    { title: 'networkx: tutorial', url: 'https://networkx.org/documentation/stable/tutorial.html' },
    { title: 'CBS StatLine: open data', url: 'https://opendata.cbs.nl/statline/' },
  ],
});
