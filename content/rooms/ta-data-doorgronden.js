/* Room: Tactisch analist — Grote datasets doorgronden: kwantitatief werken */

// =======================================================================
//  Alles FICTIEF: het phishingpanel, de banken (NederBank, Spaarbank Delta,
//  KustBank), de aliassen en de domeinen (.nm.lab). IP-adressen komen uit
//  de documentatiebereiken van RFC 5737.
//  Eén dataset voor de terminal-labs van taak 1 t/m 3: 87 unieke hits uit
//  het panel op maandag 12 oktober 2026, als ruwe export en als schone tabel.
// =======================================================================
const TADG_FS = (() => {
  const rows = [
    '05:08:33|nederbank|192.0.2.149|mirella_x', '05:30:21|nederbank|198.51.100.95|vosje', '05:37:03|nederbank|198.51.100.3|vosje',
    '06:01:44|kustbank|198.51.100.161|vosje', '06:10:24|spaarbank delta|192.0.2.222|vosje', '06:11:20|nederbank|203.0.113.180|mirella_x',
    '06:48:36|kustbank|198.51.100.236|mirella_x', '07:05:13|spaarbank delta|198.51.100.210|vosje', '07:08:38|spaarbank delta|192.0.2.239|vosje',
    '07:08:53|nederbank|192.0.2.206|mirella_x', '07:11:01|nederbank|198.51.100.214|vosje', '07:11:11|spaarbank delta|192.0.2.167|k0ning',
    '07:19:59|nederbank|198.51.100.151|k0ning', '07:20:11|nederbank|198.51.100.58|k0ning', '07:23:03|spaarbank delta|203.0.113.219|k0ning',
    '07:26:10|nederbank|192.0.2.223|k0ning', '07:27:07|nederbank|203.0.113.169|k0ning', '07:36:02|nederbank|203.0.113.140|k0ning',
    '07:36:38|nederbank|203.0.113.47|k0ning', '07:37:21|nederbank|192.0.2.211|k0ning', '07:38:17|nederbank|198.51.100.49|k0ning',
    '07:41:37|spaarbank delta|198.51.100.195|k0ning', '07:45:48|nederbank|198.51.100.243|vosje', '07:46:47|nederbank|192.0.2.124|k0ning',
    '07:55:05|nederbank|203.0.113.222|mirella_x', '07:55:24|nederbank|198.51.100.125|k0ning', '07:57:32|nederbank|192.0.2.138|mirella_x',
    '07:58:32|nederbank|192.0.2.125|k0ning', '08:12:31|nederbank|192.0.2.171|k0ning', '08:14:12|nederbank|203.0.113.198|k0ning',
    '08:20:59|nederbank|192.0.2.49|vosje', '08:29:13|kustbank|198.51.100.229|k0ning', '08:30:26|spaarbank delta|192.0.2.71|vosje',
    '08:32:35|nederbank|203.0.113.63|mirella_x', '08:45:06|nederbank|198.51.100.29|vosje', '09:06:09|nederbank|192.0.2.248|k0ning',
    '09:24:46|spaarbank delta|203.0.113.29|k0ning', '09:24:49|nederbank|198.51.100.190|vosje', '09:26:11|kustbank|192.0.2.201|k0ning',
    '09:43:47|kustbank|198.51.100.42|vosje', '10:15:02|kustbank|192.0.2.185|mirella_x', '10:21:48|nederbank|192.0.2.151|vosje',
    '10:23:19|spaarbank delta|192.0.2.38|k0ning', '10:47:58|nederbank|198.51.100.69|vosje', '10:58:13|spaarbank delta|192.0.2.159|vosje',
    '11:03:41|nederbank|192.0.2.187|mirella_x', '11:06:34|nederbank|203.0.113.226|mirella_x', '11:11:02|nederbank|203.0.113.120|k0ning',
    '11:35:13|nederbank|192.0.2.85|vosje', '11:39:21|spaarbank delta|203.0.113.191|mirella_x', '11:47:40|nederbank|192.0.2.96|vosje',
    '12:00:36|spaarbank delta|198.51.100.8|vosje', '12:06:22|nederbank|203.0.113.168|vosje', '12:16:21|nederbank|192.0.2.74|vosje',
    '12:36:42|kustbank|203.0.113.199|mirella_x', '13:01:50|kustbank|198.51.100.172|vosje', '13:04:50|nederbank|203.0.113.149|mirella_x',
    '13:05:02|nederbank|198.51.100.180|mirella_x', '13:27:29|spaarbank delta|198.51.100.247|mirella_x', '13:47:57|nederbank|203.0.113.209|vosje',
    '14:02:59|spaarbank delta|192.0.2.64|mirella_x', '14:25:54|kustbank|203.0.113.42|vosje', '14:26:19|nederbank|203.0.113.250|mirella_x',
    '14:49:45|nederbank|198.51.100.121|vosje', '14:50:01|nederbank|198.51.100.207|vosje', '15:01:14|spaarbank delta|198.51.100.132|vosje',
    '15:01:35|nederbank|198.51.100.160|k0ning', '15:23:41|nederbank|198.51.100.194|vosje', '15:35:03|kustbank|192.0.2.59|vosje',
    '16:04:36|nederbank|192.0.2.143|k0ning', '16:11:15|nederbank|203.0.113.147|vosje', '16:12:26|spaarbank delta|192.0.2.58|mirella_x',
    '16:20:13|nederbank|192.0.2.177|mirella_x', '16:29:20|nederbank|192.0.2.240|vosje', '16:35:34|kustbank|192.0.2.70|vosje',
    '17:18:32|nederbank|203.0.113.211|vosje', '17:24:23|kustbank|192.0.2.221|k0ning', '17:52:32|nederbank|198.51.100.233|vosje',
    '17:52:50|kustbank|198.51.100.165|mirella_x', '18:03:57|nederbank|192.0.2.35|mirella_x', '18:32:18|nederbank|198.51.100.99|vosje',
    '18:51:45|nederbank|203.0.113.14|k0ning', '19:06:24|spaarbank delta|198.51.100.111|vosje', '19:18:20|nederbank|192.0.2.102|vosje',
    '19:59:53|spaarbank delta|192.0.2.72|mirella_x', '20:05:47|nederbank|203.0.113.156|vosje', '20:38:44|nederbank|198.51.100.123|mirella_x',
  ].map((r) => r.split('|'));
  const dom = { vosje: 'veilig-bankieren', k0ning: 'pas-vernieuwen', mirella_x: 'klantcontrole' };
  const bankRaw = {
    nederbank: ['NederBank', 'nederbank', 'NEDERBANK '],
    'spaarbank delta': ['Spaarbank Delta', 'spaarbank delta', 'Spaarbank Delta'],
    kustbank: ['KustBank', 'Kustbank', 'KustBank'],
  };
  const p2 = (n) => String(n).padStart(2, '0');
  const local = (t) => { const [h, m, s] = t.split(':'); return '2026-10-12 ' + p2(+h + 2) + ':' + m + ':' + s + '+02:00'; };
  const utc = (t) => '2026-10-12T' + t + 'Z';
  const clean = ['tijd_utc,bank,slachtoffer_ip,operator,landingsdomein'];
  const raw = ['tijd,bank,slachtoffer_ip,operator,landingspagina'];
  rows.forEach(([t, bank, ip, op], i) => {
    clean.push([utc(t), bank, ip, op, dom[op] + '[.]nm[.]lab'].join(','));
    const page = i % 4 === 0 ? 'hxxps://' + dom[op] + '[.]nm[.]lab/login' : dom[op] + '.nm.lab';
    const rest = [bankRaw[bank][i % 3], ip, op, page].join(',');
    const isLocal = [0, 2, 3].includes(i % 5);
    raw.push((isLocal ? local(t) : utc(t)) + ',' + rest);
    if (i % 10 === 4) raw.push((isLocal ? local(t) : utc(t)) + ',' + rest);          // exacte dubbeling (export liep twee keer)
    if ([20, 50, 75].includes(i)) raw.push((isLocal ? utc(t) : local(t)) + ',' + rest); // zelfde hit, andere tijdnotatie
  });
  return {
    '/home/student/zaak/ruw.csv': raw.join('\n') + '\n',
    '/home/student/zaak/schoon.csv': clean.join('\n') + '\n',
    '/home/student/zaak/LEESMIJ.txt': [
      'Zaak PANEL-12 (fictief) - export van een in beslag genomen phishingpanel',
      '',
      'ruw.csv     de export zoals hij binnenkwam (tijd, bank, slachtoffer_ip, operator, landingspagina)',
      'schoon.csv  de opgeschoonde tabel: tijd in UTC, banknamen genormaliseerd,',
      '            dubbelingen eruit, landingsdomein gedefangd',
      'operators/  notities per alias uit eerdere zaken',
      '',
      'Kolommen tellen vanaf 1. Scheidingsteken: komma.',
    ].join('\n') + '\n',
    '/home/student/zaak/operators/vosje.txt': 'Alias vosje\nEerder gezien: 2025, zaak Kustlijn (fictief).\nRol: beheert het panel en de meeste campagnes.\nControlevlag voor wie hier via de telling kwam: NM{tellen_groeperen_sorteren}\n',
    '/home/student/zaak/operators/k0ning.txt': 'Alias k0ning\nEerder gezien: 2026, smishing-golven op werkdagen.\nWerkt vaak in korte, intensieve pieken.\nDeze notitie bevat geen vlag: telde je wel goed?\n',
    '/home/student/zaak/operators/mirella_x.txt': 'Alias mirella_x\nNieuw in deze zaak. Geen eerdere registraties.\nDeze notitie bevat geen vlag: telde je wel goed?\n',
  };
})();

CS.registerRoom({
  id: 'ta-data-doorgronden',
  path: 'tactisch-analist',
  order: 4,
  title: 'Grote datasets doorgronden: kwantitatief werken',
  icon: '📊',
  difficulty: 'Gemiddeld',
  minutes: 75,
  level: 'Praktijk',
  checked: '2026-11-19',
  summary: 'Van een rommelige export naar een onderbouwd getal: opschonen (tijdzones, dubbelingen, normaliseren, defangen), tellen, groeperen en koppelen met SQL, pandas en de terminal, pieken en uitschieters herkennen tegen een baseline, de juiste grafiek kiezen voor je vraag en alleen verwerken wat je nodig hebt onder de Wet politiegegevens.',
  objectives: [
    'Een ruwe export opschonen: tijden naar UTC, exacte en verborgen dubbelingen verwijderen, waarden normaliseren en indicatoren defangen',
    'Tellen, filteren, groeperen en koppelen met SQL (SELECT, WHERE, GROUP BY, COUNT, JOIN), pandas en de terminal (cut, sort, uniq -c)',
    'Een piek en een uitschieter herkennen tegen een baseline, en de base rate meewegen bij een signaal',
    'Per analysevraag de passende visualisatie kiezen (tijdlijn, linkchart, heatmap, kaart, Sankey) en misleidende grafieken herkennen',
    'Dataminimalisatie en doelbinding onder de Wet politiegegevens toepassen op een dataset',
  ],
  tasks: [
    {
      title: 'Taak 1 — Van ruwe export naar bruikbare tabel',
      tryFirst: true,
      intro: '<p>Het team heeft een phishingpanel in beslag genomen (fictief). In de terminal staat de export <code>ruw.csv</code> en de opgeschoonde versie <code>schoon.csv</code>. Tel hoeveel records de ruwe export heeft, hoeveel daarvan exacte dubbelingen zijn, en hoeveel unieke hits er na het opschonen overblijven. Begin met <code>cat LEESMIJ.txt</code> en <code>head -n 8 ruw.csv</code>.</p>',
      content: `
        <p>Een export uit een in beslag genomen systeem, een provider of een bank is bijna nooit meteen bruikbaar. Je
        krijgt een tabel waarin dezelfde bank op drie manieren geschreven is, tijden in twee notaties door elkaar staan en
        sommige regels dubbel zijn omdat de export twee keer liep. Wie daar direct op gaat tellen, telt verkeerd. Vuistregel
        van elke analist: <strong>eerst begrijpen en opschonen, dan pas tellen</strong>.</p>

        <h3>Vier vaste stappen</h3>
        <ol>
          <li><strong>Tijd naar één zone (UTC).</strong> Bronnen leveren lokale tijd (<code>09:14:05+02:00</code>, zomertijd
          in Nederland) en UTC (<code>07:14:05Z</code>) door elkaar. Zet alles om naar UTC en noteer in de kolomnaam dat je
          dat deed (<code>tijd_utc</code>). Pas bij het rapporteren zet je de tijd terug naar Nederlandse tijd voor de lezer.
          Let op: de zomertijd eindigt in 2026 op zondag 25 oktober; daarna is het verschil één uur.</li>
          <li><strong>Dubbelingen verwijderen.</strong> Exacte dubbelingen (identieke regels) vind je makkelijk. Lastiger zijn
          <em>verborgen</em> dubbelingen: dezelfde gebeurtenis in een andere notatie. Die zie je pas nádat je genormaliseerd
          hebt. Daarom ontdubbel je na het normaliseren nog een keer.</li>
          <li><strong>Normaliseren.</strong> <code>NederBank</code>, <code>nederbank</code> en <code>NEDERBANK&nbsp;</code>
          (met een spatie erachter) zijn voor een computer drie verschillende waarden. Kies één schrijfwijze: kleine
          letters, spaties weg.</li>
          <li><strong>Defangen.</strong> Een kwaadaardige URL of domeinnaam maak je onklikbaar voordat de tabel gedeeld wordt:
          <code>hxxps://</code> in plaats van <code>https://</code> en <code>[.]</code> in plaats van een punt. Kies één vorm
          voor de hele kolom. Wil je later tegen een andere bron matchen, dan zet je hem eerst terug (refangen).</li>
        </ol>

        <h3>Tellen in de terminal</h3>
        <pre><code>wc -l ruw.csv                    # aantal regels, inclusief de kopregel
sort ruw.csv | uniq | wc -l      # regels na het weghalen van exacte dubbelingen
grep -c Z, ruw.csv               # regels met een tijd in UTC-notatie
grep -c 02:00, ruw.csv           # regels met een tijd in lokale notatie
wc -l schoon.csv                 # de opgeschoonde tabel</code></pre>
        <p><code>uniq</code> haalt alleen dubbelingen weg die direct onder elkaar staan. Daarom sorteer je eerst. En
        vergeet de kopregel niet: <code>wc -l</code> telt hem mee, dus het aantal records is één minder.</p>

        <div class="callout warn"><strong>Let op:</strong> leg elke opschoonstap vast (wat, waarom, hoeveel regels erin en
        eruit). Een tabel waarvan niemand weet hoe hij ontstaan is, kun je in een proces-verbaal of intelligenceproduct niet
        verantwoorden.</div>
      `,
      lab: {
        type: 'terminal',
        user: 'student', host: 'analyse-ws',
        home: '/home/student', cwd: '/home/student/zaak',
        motd: 'Zaak PANEL-12 (fictief). Typ ls en cat LEESMIJ.txt om te beginnen.',
        fs: TADG_FS,
      },
      questions: [
        { q: 'Hoeveel records (zonder kopregel) bevat ruw.csv?', answer: ['99'],
          hints: ['Tel de regels van het bestand.', 'Gebruik wc -l ruw.csv en trek de kopregel eraf.', 'wc -l geeft 100.'],
          wrong: { '100': 'Dat is inclusief de kopregel met kolomnamen. Die is geen record.' },
          explain: 'wc -l ruw.csv geeft 100 regels: één kopregel en 99 records.' },
        { q: 'Hoeveel exacte dubbelingen zitten er in ruw.csv?', answer: ['9', 'negen'],
          hints: ['Vergelijk het aantal regels voor en na het weghalen van identieke regels.', 'sort ruw.csv | uniq | wc -l', '100 min 91.'],
          wrong: { '91': 'Dat is het aantal regels dat overblijft. Gevraagd is hoeveel er weggaan.', '12': 'Dat zijn alle dubbelingen samen. sort | uniq vindt alleen de exacte; de rest zie je pas na het normaliseren.' },
          explain: 'Na sort | uniq blijven 91 regels over (90 records plus de kop): 9 exacte dubbelingen.' },
        { q: 'schoon.csv telt 87 unieke hits. Hoeveel verborgen dubbelingen (zelfde hit, andere tijdnotatie) zaten er dus nog in de 90 records na sort | uniq?', answer: ['3', 'drie'],
          hints: ['Controleer eerst met wc -l schoon.csv dat er 87 records zijn.', 'Trek het aantal schone records af van het aantal na exact ontdubbelen.', '90 min 87.'],
          why: 'Wie alleen exacte dubbelingen verwijdert, telt hier drie slachtoffers te veel. In een zaak met duizenden records loopt dat snel op.',
          explain: 'Drie hits stonden er één keer in lokale tijd en één keer in UTC in. Pas na het omzetten naar UTC zijn ze identiek.' },
        { q: 'In ruw.csv staat een hit om 2026-10-12 09:05:13+02:00. Hoe laat is dat in UTC? (UU:MM:SS)', answer: ['07:05:13', '7:05:13'],
          hints: ['+02:00 betekent: twee uur voor op UTC.', 'Trek het verschil af om bij UTC uit te komen.', '09 min 2.'],
          wrong: { '11:05:13': 'Je telde het verschil op. De lokale tijd loopt twee uur vóór op UTC, dus je trekt het eraf.' },
          explain: '09:05:13 lokale zomertijd min twee uur is 07:05:13 UTC.' },
      ],
    },

    {
      title: 'Taak 2 — Tellen, groeperen en koppelen',
      tryFirst: true,
      intro: '<p>Welke operator in het panel is verantwoordelijk voor de meeste hits? Gebruik <code>schoon.csv</code> en tel per waarde in de kolom <code>operator</code> (kolom 4). Open daarna het notitiebestand van die operator in de map <code>operators</code>.</p>',
      content: `
        <p>Bijna elke kwantitatieve vraag is een variatie op vier bewegingen: <strong>selecteren</strong> (welke kolommen),
        <strong>filteren</strong> (welke rijen), <strong>groeperen en tellen</strong> (hoeveel per waarde) en
        <strong>koppelen</strong> (twee tabellen samenvoegen op een gedeelde sleutel). Of je nu SQL, Python of de terminal
        gebruikt: het denkwerk is hetzelfde. Dat is ook waarom de vacature om "programmeertaal(en) en databasesoftware"
        vraagt: met tienduizenden regels kom je in een spreadsheet niet ver meer.</p>

        <h3>In SQL</h3>
        <pre><code>-- hoeveel hits per operator, alleen voor NederBank, grootste eerst
SELECT operator, COUNT(*) AS hits
FROM   hits
WHERE  bank = 'nederbank'
GROUP  BY operator
ORDER  BY hits DESC;</code></pre>
        <p><code>WHERE</code> filtert rijen vóór het groeperen. Wil je filteren op het resultaat van de telling (bijvoorbeeld
        alleen operators met meer dan tien hits), dan gebruik je <code>HAVING COUNT(*) &gt; 10</code> na de
        <code>GROUP BY</code>.</p>

        <h3>Koppelen met JOIN</h3>
        <p>Stel dat je een tweede tabel <code>domeinen</code> hebt met per landingsdomein de hoster en de registratiedatum.
        Met een <code>JOIN</code> leg je die naast elke hit:</p>
        <pre><code>SELECT h.operator, d.hoster, COUNT(*) AS hits
FROM   hits h
JOIN   domeinen d ON d.domein = h.landingsdomein
GROUP  BY h.operator, d.hoster;</code></pre>
        <p>Een gewone (<em>inner</em>) <code>JOIN</code> houdt alleen rijen over die in beide tabellen een match hebben.
        Staat een domein niet in <code>domeinen</code>, dan valt die hit stilletjes weg. Met een <code>LEFT JOIN</code> blijven
        alle hits staan en krijgen ontbrekende hosters de waarde <code>NULL</code>. Dat is meteen een reden om je sleutels
        eerst te normaliseren (taak 1): <code>Pas-Vernieuwen.nm.lab</code> matcht niet met <code>pas-vernieuwen.nm.lab</code>.</p>

        <h3>Hetzelfde in Python (pandas)</h3>
        <pre><code>import pandas as pd
hits = pd.read_csv('schoon.csv', parse_dates=['tijd_utc'])
(hits[hits.bank == 'nederbank']
     .groupby('operator').size()
     .sort_values(ascending=False))

domeinen = pd.read_csv('domeinen.csv')
samen = hits.merge(domeinen, left_on='landingsdomein', right_on='domein', how='left')</code></pre>

        <h3>En in de terminal</h3>
        <pre><code>cut -d , -f 4 schoon.csv | sort | uniq -c | sort -rn
cut -d , -f 2 ruw.csv | sort | uniq -c
grep -c nederbank schoon.csv</code></pre>
        <p>Lees de eerste regel van links naar rechts: knip kolom 4 eruit, sorteer zodat gelijke waarden onder elkaar
        komen, tel per waarde, en sorteer de tellingen numeriek van groot naar klein. Het is de terminalversie van
        <code>GROUP BY ... ORDER BY ... DESC</code>. De kopregel komt in de uitvoer één keer mee als waarde; die negeer je.</p>

        <div class="callout tip"><strong>Tip:</strong> draai de tweede regel ook eens. Je ziet dan in de ruwe export
        dezelfde bank onder verschillende schrijfwijzen staan, elk met een eigen, te lage telling. Zo ziet een
        normalisatiefout eruit.</div>
      `,
      lab: {
        type: 'terminal',
        user: 'student', host: 'analyse-ws',
        home: '/home/student', cwd: '/home/student/zaak',
        motd: 'Zaak PANEL-12 (fictief). Dezelfde dataset als in taak 1.',
        fs: TADG_FS,
      },
      questions: [
        { q: 'Open het notitiebestand van de operator met de meeste hits in schoon.csv. Welke vlag staat erin?', answer: ['NM{tellen_groeperen_sorteren}'],
          hints: ['Tel per waarde in kolom 4 van schoon.csv.', 'cut -d , -f 4 schoon.csv | sort | uniq -c | sort -rn', 'Open daarna met cat het bestand in operators/ dat de naam draagt van de bovenste alias.'],
          wrong: { '/^nm\\{.*\\}$/i': 'Dat is niet de vlag uit de notitie van de grootste operator.' },
          explain: 'De grootste operator heeft 38 van de 87 hits; zijn notitie bevat de vlag.' },
        { q: 'Op hoeveel verschillende manieren is NederBank geschreven in ruw.csv?', answer: ['3', 'drie'],
          hints: ['Tel per waarde in de bankkolom van de ruwe export.', 'cut -d , -f 2 ruw.csv | sort | uniq -c', 'Let ook op hoofdletters en een spatie aan het eind.'],
          explain: 'NederBank, nederbank en NEDERBANK (met een spatie erachter): drie waarden die na normaliseren één worden.' },
        { q: 'Hoeveel hits op NederBank telt schoon.csv?', answer: ['56'],
          hints: ['Filter de schone tabel op de genormaliseerde banknaam.', 'grep -c nederbank schoon.csv', 'Het landingsdomein bevat de banknaam niet, dus grep telt alleen de bankkolom.'],
          explain: '56 van de 87 hits gingen over NederBank. In de ruwe export was dat getal verspreid over drie schrijfwijzen.' },
        { q: 'Je koppelt hits aan een tabel domeinen met een gewone (inner) JOIN. Twee landingsdomeinen ontbreken in die tabel. Wat gebeurt er met de hits op die domeinen?', options: ['Ze vallen weg uit het resultaat', 'Ze krijgen NULL als hoster', 'De query geeft een foutmelding', 'Ze worden aan het eerste domein in de tabel gekoppeld'], answer: 0,
          wrong: { 1: 'Dat doet een LEFT JOIN. Een inner JOIN houdt alleen rijen met een match.', 2: 'SQL geeft geen fout; het resultaat is alleen stil kleiner.', 3: 'Zonder match wordt er niets gekoppeld.' },
          why: 'Een stil wegvallende groep is een klassieke telfout: je rapporteert een kleiner probleem dan er is.',
          explain: 'Een inner JOIN houdt alleen rijen die in beide tabellen voorkomen. Gebruik een LEFT JOIN als je niets wilt kwijtraken.' },
      ],
    },

    {
      title: 'Taak 3 — Patronen en afwijkingen: baseline, piek, base rate',
      tryFirst: true,
      intro: '<p>Op welk uur (UTC) kwamen de meeste hits binnen, en hoeveel waren dat? Maak in de terminal een telling per uur van <code>schoon.csv</code>. Bedenk daarna wat een "normaal" uur is.</p>',
      content: `
        <p>Een getal zegt pas iets als je weet waarmee je het vergelijkt. "21 hits in een uur" is veel of weinig, afhankelijk
        van wat er normaal gebeurt. Dat normaal heet de <strong>baseline</strong>. Een afwijking is altijd een afwijking
        <em>ten opzichte van</em> iets.</p>

        <h3>Een tijdreeks per uur</h3>
        <pre><code>grep -v tijd_utc schoon.csv | cut -d T -f 2 | cut -d : -f 1 | sort | uniq -c</code></pre>
        <p>Stap voor stap: haal de kopregel weg, knip alles na de <code>T</code> in de tijd, houd het uur over, sorteer en
        tel. Je krijgt zestien regels, één per uur waarin iets gebeurde. Zet ze in je hoofd onder elkaar als een staafdiagram
        en je ziet het patroon.</p>

        <h3>Baseline: mediaan, niet gemiddelde</h3>
        <p>Het <strong>gemiddelde</strong> wordt meegetrokken door de piek zelf. De <strong>mediaan</strong> (de middelste
        waarde als je alle uurtellingen sorteert) heeft daar veel minder last van. Daarom is de mediaan meestal de betere
        baseline. Bij een even aantal waarden neem je het gemiddelde van de middelste twee. Een eenvoudige vuistregel voor een
        <strong>uitschieter</strong>: een waarde die meerdere keren boven de baseline ligt, of die buiten
        Q3 + 1,5 × IQR valt (de interkwartielafstand, bekend van de boxplot).</p>

        <h3>Een piek verklaren</h3>
        <p>Een piek is een vraag, geen antwoord. Is er een sms-golf verstuurd? Begon een nieuwe operator? Werd een
        landingspagina net gedeeld op een forum? Of is het een meetfout, zoals een export die een uur dubbel liep? Kijk
        binnen de piek naar de verdeling over operators, banken en landingsdomeinen en vergelijk die met de rest van de dag.
        Verschilt de samenstelling sterk, dan heb je waarschijnlijk een apart verschijnsel te pakken.</p>

        <h3>Base rate: de valkuil van het zeldzame signaal</h3>
        <p>Stel: een filter markeert verdachte transacties. Het filter ziet 99% van de echte fraude en markeert 1% van de
        gewone transacties ten onrechte. Op 100.000 transacties zitten 50 frauduleuze. Dan krijg je ongeveer
        <strong>50 terechte</strong> en <strong>1.000 onterechte</strong> meldingen (1% van 99.950). Van alle meldingen is
        dus maar zo'n 5% echt. Dat is de <strong>base rate</strong> (de basiskans): als het verschijnsel zeldzaam is, zijn de
        meeste treffers vals, ook bij een "nauwkeurig" filter. Wie dat vergeet, maakt de <em>base rate fallacy</em>.</p>

        <div class="callout info"><strong>Kwantitatief én kwalitatief:</strong> de telling vertelt je <em>dat</em> er om
        een bepaald uur iets gebeurde. Waarom, dat haal je uit andere bronnen: meldingen van de bank, de sms zelf,
        chatberichten van de operators. Daarover gaat de volgende room.</div>
      `,
      lab: {
        type: 'terminal',
        user: 'student', host: 'analyse-ws',
        home: '/home/student', cwd: '/home/student/zaak',
        motd: 'Zaak PANEL-12 (fictief). Maak een telling per uur van schoon.csv.',
        fs: TADG_FS,
      },
      questions: [
        { q: 'In welk uur (UTC, twee cijfers) kwamen de meeste hits binnen?', answer: ['07', '7'],
          hints: ['Maak een telling per uur.', 'grep -v tijd_utc schoon.csv | cut -d T -f 2 | cut -d : -f 1 | sort | uniq -c', 'Zoek de regel met verreweg de hoogste telling.'],
          wrong: { '09': 'Dat is het uur in Nederlandse zomertijd. Gevraagd is UTC, zoals in schoon.csv.' },
          explain: 'Om 07 UTC (09:00 Nederlandse tijd) kwamen 21 hits binnen.' },
        { q: 'Wat is de mediaan van de zestien uurtellingen? (gebruik een komma of punt bij een halve waarde)', answer: ['4,5', '4.5'],
          hints: ['Zet de zestien tellingen op volgorde van klein naar groot.', 'Bij zestien waarden is de mediaan het gemiddelde van de 8e en 9e waarde.', 'De 8e is 4, de 9e is 5.'],
          wrong: { '5,4': 'Dat is ongeveer het gemiddelde (87 / 16 = 5,4). Het gemiddelde wordt omhoog getrokken door de piek.', '5.4': 'Dat is ongeveer het gemiddelde (87 / 16 = 5,4). Het gemiddelde wordt omhoog getrokken door de piek.', '5': 'Bijna: bij een even aantal waarden neem je het gemiddelde van de middelste twee.' },
          explain: 'Gesorteerd: 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 7, 21. De middelste twee zijn 4 en 5, dus de mediaan is 4,5. Het piekuur ligt daar ruim vier keer boven.' },
        { q: 'Een filter vangt 99% van de fraude en markeert 1% van de normale transacties. Op 100.000 transacties zijn er 50 frauduleus. Welk deel van de meldingen is ongeveer terecht?', options: ['Ongeveer 99%', 'Ongeveer 50%', 'Ongeveer 5%', 'Ongeveer 1%'], answer: 2,
          wrong: { 0: '99% is hoeveel fraude het filter vindt, niet hoeveel meldingen terecht zijn.', 1: 'Er zijn veel meer normale dan frauduleuze transacties; de onterechte meldingen zijn in de meerderheid.', 3: '1% is het aandeel normale transacties dat ten onrechte wordt gemarkeerd.' },
          why: 'Wie de base rate negeert, stuurt een team op duizend valse sporen af en noemt het filter toch "99% nauwkeurig".',
          explain: 'Ongeveer 50 terechte tegen 1.000 onterechte meldingen: 50 / 1.050 is ongeveer 5%.' },
      ],
    },

    {
      title: 'Taak 4 — Visualiseren: de vorm volgt de vraag',
      tryFirst: true,
      intro: '<p>In het lab staan zestien analysevragen. Elke vraag hoort bij één van vier visualisatievormen. Sorteer ze in vier groepen van vier.</p>',
      content: `
        <p>Een goede grafiek beantwoordt één vraag in één oogopslag. Begin daarom niet bij het gereedschap ("ik maak een
        netwerkplaatje") maar bij de vraag ("wie staat met wie in contact?"). De vacature noemt visualisatiesoftware; in de
        praktijk gaat het vaak om linkchartprogramma's zoals i2 Analyst's Notebook, om tools als Maltego, of om grafieken in
        Python, Excel of een dashboard. Het principe is overal gelijk.</p>

        <table>
          <thead><tr><th>Vraag</th><th>Vorm</th><th>Voorbeeld</th></tr></thead>
          <tbody>
            <tr><td>Wanneer gebeurde wat, en in welke volgorde?</td><td><strong>Tijdlijn of tijdreeks</strong></td><td>Hits per uur, de stappen van een aanval, een piek na een sms-golf.</td></tr>
            <tr><td>Wie of wat hangt met wie samen?</td><td><strong>Linkchart</strong> (netwerkdiagram)</td><td>Aliassen, wallets, domeinen en IP-adressen als knopen, relaties als lijnen.</td></tr>
            <tr><td>Wanneer is het druk, in twee dimensies tegelijk?</td><td><strong>Heatmap</strong></td><td>Uur van de dag tegen dag van de week: zie je een "kantoorritme" van de daders?</td></tr>
            <tr><td>Waar gebeurt het?</td><td><strong>Kaart</strong></td><td>Woonplaatsen van slachtoffers, locaties van pinopnames van geldezels.</td></tr>
            <tr><td>Waar gaat het naartoe, en hoeveel?</td><td><strong>Sankey</strong> (stroomdiagram)</td><td>Geld van slachtoffers via mule-rekeningen naar exchanges, met de breedte als bedrag.</td></tr>
          </tbody>
        </table>

        <h3>Zo misleid je (per ongeluk) met een grafiek</h3>
        <ul>
          <li><strong>Afgekapte y-as.</strong> Een staafdiagram dat bij 90 begint, laat een stijging van 92 naar 96 eruitzien
          als een verdubbeling. Staven beginnen bij nul.</li>
          <li><strong>Cumulatief tonen.</strong> Een cumulatieve lijn stijgt altijd, ook als het aantal nieuwe incidenten
          daalt.</li>
          <li><strong>Absolute aantallen zonder noemer.</strong> "Meeste slachtoffers in Amsterdam" zegt weinig zonder het
          aantal inwoners of klanten. Reken waar nodig om naar een aandeel.</li>
          <li><strong>Een kaart die bevolking toont.</strong> Een kaart met absolute aantallen is vaak gewoon een kaart van
          waar veel mensen wonen.</li>
          <li><strong>Een linkchart als bewijs.</strong> Een lijn tussen twee knopen ziet er even stevig uit, of hij nu op
          een bankafschrift of op een vermoeden rust. Zet de bron en de betrouwbaarheid op de lijn.</li>
        </ul>

        <div class="callout tip"><strong>Tip:</strong> zet onder elke grafiek in één zin wat de lezer moet zien
        ("Het aantal hits verviervoudigde om 09:00, direct na de sms-golf"). Lukt die zin niet, dan beantwoordt de
        grafiek nog geen vraag.</div>
      `,
      lab: {
        type: 'connections',
        title: 'welke vorm past bij de vraag?',
        prompt: 'Zestien analysevragen, vier visualisatievormen: tijdlijn, linkchart, heatmap en Sankey. Vraag je bij elke vraag af wat de lezer moet zien: een volgorde, een verband, een ritme of een stroom.',
        flag: 'NM{de_vorm_volgt_de_vraag}',
        groups: [
          { name: 'Tijdlijn / tijdreeks', items: ['In welke volgorde verliepen de stappen van de aanval?', 'Steeg het aantal meldingen na de sms-golf?', 'Hoe lang zat de dader binnen voor hij versleutelde?', 'Wanneer ging het panel online en weer offline?'] },
          { name: 'Linkchart', items: ['Welke aliassen gebruiken dezelfde wallet?', 'Via welk domein hangen twee zaken samen?', 'Wie is de spil tussen ronselaars en geldezels?', 'Welke IP-adressen deelt het panel met het C2-netwerk?'] },
          { name: 'Heatmap', items: ['Op welke uren en dagen is de operator actief?', 'Werkt de groep in een vast kantoorritme?', 'In welke week en op welke weekdag piekt de fraude?', 'Welke combinatie van bank en maand valt op?'] },
          { name: 'Sankey (stroomdiagram)', items: ['Hoe verdeelt het losgeld zich over wallets?', 'Waar komt het geld van slachtoffers uiteindelijk terecht?', 'Welk deel van de buit bereikt een exchange?', 'Hoeveel geld stroomt via elke mule-rekening door?'] },
        ],
      },
      questions: [
        { q: 'Vind in het lab de vier groepen van vier. Welke vlag verschijnt?', answer: ['NM{de_vorm_volgt_de_vraag}'],
          hints: ['Begin met de vragen over geld of buit die ergens naartoe gaat: dat is een stroom.', 'Twijfel je tussen tijdlijn en heatmap? Een heatmap heeft twee tijdsassen tegelijk (uur en dag, week en weekdag).', 'Het lab meldt het als drie van de vier goed zijn. Wissel er dan één.'],
          explain: 'Volgorde: tijdlijn. Verband: linkchart. Ritme over twee dimensies: heatmap. Stroom met volume: Sankey.' },
        { q: 'Een staafdiagram toont het aantal phishingmeldingen per maand; de y-as begint bij 400. Wat is het risico?', options: ['Kleine verschillen lijken groot', 'De grafiek toont te weinig maanden', 'Staafdiagrammen zijn ongeschikt voor tellingen', 'De mediaan wordt verkeerd berekend'], answer: 0,
          wrong: { 1: 'Het aantal maanden is niet het probleem; de schaal is het.', 2: 'Staafdiagrammen zijn juist geschikt voor tellingen, mits de as bij nul begint.', 3: 'De as verandert niets aan de berekening, wel aan de indruk.' },
          explain: 'De lengte van een staaf moet evenredig zijn met de waarde. Begint de as niet bij nul, dan vergroot je verschillen kunstmatig.' },
        { q: 'Welke vorm kies je om te tonen hoe € 240.000 aan losgeld zich verdeelt over wallets en uiteindelijk bij drie exchanges uitkomt?', answer: ['sankey', 'sankey-diagram', 'sankeydiagram', 'stroomdiagram'],
          hints: ['Het gaat om een stroom met een hoeveelheid.', 'De breedte van de lijnen staat voor het bedrag.', 'Een diagram genoemd naar een Ierse ingenieur.'],
          wrong: { 'linkchart': 'Een linkchart toont dat er verbanden zijn, maar niet hoeveel er doorheen stroomt.' },
          explain: 'Een Sankey toont stromen met hun omvang: hoe breder de band, hoe meer geld.' },
      ],
    },

    {
      title: 'Taak 5 — Dataminimalisatie en grondslag onder de Wpg',
      content: `
        <p>Met goede tooling kun je alles aan alles koppelen. Dat betekent niet dat het mag. Politiegegevens verwerk je
        onder de <strong>Wet politiegegevens (Wpg)</strong>, de Nederlandse uitwerking van de Europese richtlijn voor
        politie en justitie (Richtlijn (EU) 2016/680). Niet de AVG dus, al lijken de principes op elkaar.</p>

        <h3>De kern</h3>
        <ul>
          <li><strong>Doelbinding.</strong> Je verwerkt gegevens voor een bepaald, omschreven doel. De Wpg onderscheidt
          verschillende doelen met elk eigen regels, onder meer de dagelijkse politietaak (artikel 8), het onderzoek in een
          bepaald geval (artikel 9) en het verkrijgen van inzicht in de betrokkenheid van personen bij bepaalde ernstige
          misdrijven (artikel 10, vaak "thematisch" genoemd). Onder welk doel jouw dataset valt, bepaalt wie hem mag zien,
          waarmee je hem mag combineren en hoe lang hij bewaard blijft.</li>
          <li><strong>Noodzaak en minimalisatie.</strong> Gegevens moeten toereikend, ter zake dienend en niet bovenmatig
          zijn voor dat doel. Een kolom die je niet nodig hebt voor je vraag, neem je niet mee.</li>
          <li><strong>Juistheid.</strong> Dat is ook een reden om op te schonen (taak 1): verkeerde tijden of dubbel getelde
          slachtoffers zijn onjuiste gegevens.</li>
          <li><strong>Vastleggen.</strong> Wie welke gegevens waarom raadpleegde en bewerkte, moet achteraf na te gaan zijn.</li>
        </ul>

        <h3>Minimaliseren in de praktijk</h3>
        <p>In de panelexport zitten slachtoffer-IP-adressen. Voor de vraag "wanneer en door wie werd de campagne gedraaid"
        heb je die niet nodig: tijd, operator en bank volstaan. Voor de vraag "hoeveel unieke slachtoffers" heb je ze wel
        nodig, maar alleen om te tellen. Dan kun je ze vervangen door een pseudoniem, bijvoorbeeld een gesalte hash, zodat
        tellen en koppelen blijven werken zonder dat de analist het adres ziet. Let wel: gepseudonimiseerde gegevens blijven
        persoonsgegevens. Wie de sleutel of salt heeft, kan terug.</p>

        <div class="callout warn"><strong>Let op:</strong> deze room geeft het principe, geen werkinstructie. Hoe een
        eenheid de Wpg-doelen in systemen en autorisaties vertaalt, is intern geregeld. Twijfel je over een koppeling, vraag
        het de privacyfunctionaris of de officier van justitie voordat je hem maakt, niet erna.</div>

        <h3>Alles bij elkaar</h3>
        <p>Je hebt nu de hele keten: opschonen, tellen en groeperen, een piek herkennen tegen de baseline, de juiste
        grafiek kiezen en verantwoorden welke gegevens je gebruikte. De laatste vraag combineert de terminalvaardigheden uit
        taak 1 tot en met 3. Open daarvoor de terminal van taak 3 opnieuw.</p>
      `,
      questions: [
        { q: 'Welke wet regelt in Nederland het verwerken van politiegegevens, zoals de panelexport?', answer: ['Wet politiegegevens', 'wpg', 'de wet politiegegevens', 'de wpg'],
          hints: ['Niet de AVG.', 'Een afkorting van drie letters.', 'Wet p......gegevens.'],
          wrong: { 'avg': 'De AVG geldt niet voor de verwerking van politiegegevens bij de uitvoering van de politietaak; daarvoor is de Wpg.' },
          explain: 'De Wet politiegegevens (Wpg), de Nederlandse uitwerking van Richtlijn (EU) 2016/680.' },
        { q: 'Je wilt weten hoeveel unieke slachtoffers het panel had, zonder dat de analist de IP-adressen ziet. Wat is de beste aanpak?', options: ['De IP-kolom vervangen door een gesalte hash en daarop tellen', 'De IP-kolom gewoon laten staan, het is toch een politiesysteem', 'De IP-kolom weggooien en het aantal rijen tellen', 'De IP-adressen defangen'], answer: 0,
          wrong: { 1: 'Toegang tot een systeem is geen reden om meer te zien dan nodig. Minimalisatie geldt ook binnen de politie.', 2: 'Het aantal rijen is het aantal hits, niet het aantal unieke slachtoffers: één slachtoffer kan meerdere hits hebben.', 3: 'Defangen maakt een indicator onklikbaar, maar het adres blijft volledig leesbaar.' },
          explain: 'Een pseudoniem laat tellen en koppelen werken, terwijl de analist het adres zelf niet ziet. Het blijft wel een persoonsgegeven.' },
        { q: 'Boss: de bank meldt dat de sms-golf op 12 oktober om 09:00 Nederlandse tijd begon. Welke operator nam in het uur 09:00–10:00 Nederlandse tijd de meeste hits voor zijn rekening? Gebruik de terminal van taak 3.', boss: true, answer: ['k0ning'],
          hints: ['Zet eerst het uur om naar de tijd waarin schoon.csv staat.', 'In oktober 2026 (vóór de 25e) is het verschil met UTC twee uur. Filter de regels van dat uur met grep op T, het uur en een dubbele punt.', 'grep T07: schoon.csv | cut -d , -f 4 | sort | uniq -c'],
          wrong: { 'vosje': 'Die operator heeft over de hele dag de meeste hits, maar niet in het piekuur. Filter eerst op het uur.', 'mirella_x': 'Tel nog eens: filter op het juiste uur in UTC en tel per operator.' },
          why: 'De grootste speler over de hele dag is niet altijd de drijvende kracht achter een piek. Een interventie op het verkeerde alias mist de golf.',
          explain: '09:00 Nederlandse zomertijd is 07:00 UTC. In dat uur heeft k0ning 14 van de 21 hits; over de hele dag is hij pas tweede.' },
      ],
    },

    {
      title: 'Taak 6 — Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examenvragen over kwantitatief werken geven je een korte situatie en vragen welke stap, maat of grafiek past. De
        afleiders zijn meestal echte technieken die in een ándere situatie wel kloppen. Vraag je steeds af: wat is hier de
        vraag, en wat vertekent het antwoord?</p>
        <p>De vragen hieronder zijn zelf geschreven in die stijl. Alle organisaties zijn fictief.</p>
      `,
      questions: [
        { q: 'Twee bronnen over dezelfde inbraak geven tijden die precies één uur verschillen. Het incident was op 3 november. Wat is de meest waarschijnlijke verklaring?',
          options: ['Eén bron noteert UTC, de andere Nederlandse wintertijd', 'Eén van de bronnen is gemanipuleerd', 'De inbraak duurde een uur', 'Eén bron noteert Nederlandse zomertijd, de andere wintertijd'], answer: 0,
          wrong: { 1: 'Manipulatie is mogelijk, maar een verschil van precies een uur heeft een veel gewonere verklaring.', 2: 'Dan zouden de tijden van begin en eind verschillen, niet dezelfde gebeurtenis een uur verschoven.', 3: 'Op één datum geldt in Nederland maar één van de twee.' },
          explain: 'Na de laatste zondag van oktober geldt wintertijd (UTC+1). Eén uur verschil wijst dan op UTC tegenover lokale tijd.' },
        { q: 'Een analist telt het aantal unieke e-mailadressen in een gelekte database en vindt er 120.000. Na omzetten naar kleine letters zijn het er 104.000. Wat is er aan de hand?',
          options: ['Hetzelfde adres stond er met verschillende hoofdletters in', 'Er zijn 16.000 adressen verloren gegaan', 'De database is versleuteld', 'De telling is willekeurig'], answer: 0,
          wrong: { 1: 'Er is niets verloren: de adressen waren dubbel geteld.', 2: 'Versleuteling heeft niets met hoofdletters te maken.', 3: 'De telling is juist nauwkeuriger geworden.' },
          explain: 'Normaliseren voegt varianten samen die hetzelfde betekenen. Het eerste getal was te hoog.' },
        { q: 'Welke SQL-clausule gebruik je om alleen groepen te houden met meer dan vijf hits, ná het groeperen?',
          options: ['WHERE', 'HAVING', 'ORDER BY', 'JOIN'], answer: 1,
          wrong: { 0: 'WHERE filtert rijen vóór het groeperen; daar bestaat de telling nog niet.', 2: 'ORDER BY sorteert, het filtert niet.', 3: 'JOIN koppelt tabellen.' },
          explain: 'HAVING COUNT(*) > 5 filtert op het resultaat van de groepering.' },
        { q: 'Een rapport toont een kaart van Nederland met per gemeente het absolute aantal slachtoffers van helpdeskfraude. De grote steden kleuren het donkerst. Wat is de belangrijkste kanttekening?',
          options: ['De kaart toont vooral waar veel mensen wonen; reken om naar slachtoffers per inwoner', 'Een kaart is nooit geschikt voor fraudecijfers', 'Er moeten meer kleuren worden gebruikt', 'De kaart moet cumulatief worden'], answer: 0,
          wrong: { 1: 'Een kaart is prima als de vraag "waar?" is, mits je de juiste maat kiest.', 2: 'Meer kleuren lossen het noemerprobleem niet op.', 3: 'Cumulatief maakt het eerder erger.' },
          explain: 'Zonder noemer is een kaart van aantallen vaak een kaart van bevolking. Een aandeel per inwoner maakt gemeenten vergelijkbaar.' },
      ],
    },
  ],
  terms: [
    { term: 'UTC', def: 'Coordinated Universal Time: de referentietijd zonder zomer- of wintertijd. Zet tijden uit verschillende bronnen eerst om naar UTC voordat je ze vergelijkt.' },
    { term: 'Normaliseren', def: 'Varianten van dezelfde waarde gelijk maken (hoofdletters, spaties, notatie), zodat de computer ze als één waarde ziet.' },
    { term: 'Ontdubbelen', def: 'Dubbele records verwijderen. Exacte dubbelingen vind je met sort | uniq; verborgen dubbelingen pas na het normaliseren.' },
    { term: 'Defangen', def: 'Een kwaadaardige URL of domeinnaam onklikbaar maken, bijvoorbeeld hxxps:// en [.] in plaats van https:// en een punt.' },
    { term: 'GROUP BY', def: 'SQL-clausule die rijen met dezelfde waarde samenneemt, zodat je per groep kunt tellen (COUNT) of optellen (SUM).' },
    { term: 'JOIN', def: 'Twee tabellen koppelen op een gedeelde sleutel. Een inner JOIN houdt alleen rijen met een match; een LEFT JOIN houdt alle rijen van de linkertabel.' },
    { term: 'Baseline', def: 'Het normale niveau waartegen je een waarde vergelijkt; vaak de mediaan over een representatieve periode.' },
    { term: 'Uitschieter', def: 'Een waarde die sterk afwijkt van de rest, bijvoorbeeld boven Q3 + 1,5 × de interkwartielafstand.' },
    { term: 'Base rate', def: 'De basiskans dat iets voorkomt. Bij een zeldzaam verschijnsel zijn de meeste treffers van een filter vals, ook als het filter nauwkeurig is.' },
    { term: 'Linkchart', def: 'Netwerkdiagram met entiteiten als knopen en relaties als lijnen, zoals in i2 Analyst\'s Notebook of Maltego.' },
    { term: 'Sankey-diagram', def: 'Stroomdiagram waarin de breedte van elke band de omvang van de stroom toont, bijvoorbeeld geld van slachtoffers naar exchanges.' },
    { term: 'Dataminimalisatie', def: 'Niet meer gegevens verwerken dan nodig voor het doel: toereikend, ter zake dienend en niet bovenmatig.' },
  ],
  resources: [
    { title: 'pandas — Group by: split-apply-combine', url: 'https://pandas.pydata.org/docs/user_guide/groupby.html' },
    { title: 'SQLite — de SELECT-opdracht (WHERE, GROUP BY, HAVING, JOIN)', url: 'https://www.sqlite.org/lang_select.html' },
    { title: 'From Data to Viz — welke grafiek past bij je data?', url: 'https://www.data-to-viz.com/' },
    { title: 'Wet politiegegevens (wetten.overheid.nl)', url: 'https://wetten.overheid.nl/BWBR0022463' },
  ],
  check: [
    { q: 'Waarom zet je tijden uit verschillende bronnen eerst om naar UTC?', options: ['Zodat gebeurtenissen uit bronnen met verschillende tijdzones en zomertijd in de juiste volgorde komen', 'Omdat UTC nauwkeuriger is dan lokale tijd', 'Omdat de Wpg dat voorschrijft', 'Omdat grafieken anders niet werken'], answer: 0, explain: 'UTC kent geen zomertijd en geen zones. Pas als alles in één referentietijd staat, kun je vergelijken en sorteren.' },
    { q: 'Wat doet cut -d , -f 4 schoon.csv | sort | uniq -c | sort -rn?', options: ['Telt per waarde in kolom 4 en zet de grootste bovenaan', 'Verwijdert kolom 4', 'Sorteert het bestand op kolom 4', 'Telt het aantal kolommen'], answer: 0, explain: 'Kolom knippen, sorteren, tellen per waarde, numeriek aflopend sorteren: de terminalversie van GROUP BY met ORDER BY DESC.' },
    { q: 'Waarom is de mediaan vaak een betere baseline dan het gemiddelde?', options: ['Het gemiddelde wordt meegetrokken door de piek zelf', 'De mediaan is altijd hoger', 'Het gemiddelde kun je niet in SQL berekenen', 'De mediaan houdt rekening met tijdzones'], answer: 0, explain: 'Een uitschieter trekt het gemiddelde omhoog, waardoor de piek kleiner lijkt dan hij is.' },
    { q: 'Welke visualisatie past bij de vraag "op welke uren en weekdagen is deze operator actief"?', options: ['Heatmap', 'Sankey', 'Linkchart', 'Taartdiagram'], answer: 0, explain: 'Twee tijdsdimensies tegelijk (uur × weekdag) toon je het helderst in een heatmap.' },
  ],
});
