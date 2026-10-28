/* Room: OSINT-jacht — ontmasker de operator (puzzels) */

const KOERIER_POST = `GELEKTE OPERATOR-POST — bron: fraudeforum DropZone (gearchiveerde kopie)
Zaakcode: NM{koerier_ontmaskerd}

[v0idkoerier] KOERIER-kit v3 — "uitbetalingen netjes geregeld"
Contact alleen via v0idkoerier[at]mail[.]nm[.]lab (PGP verplicht, geen DM's).
Panel: hxxps://panel[.]koerier-track[.]nm[.]lab/login
Backup-panel: hxxps://koerier-track[.]nm[.]lab/panel
C2 / check-in draait op 198.51.100[.]77 en 203.0.113[.]60
Exfil-drop: 192.0.2[.]23
Let op: 198.51.100[.]77 verzorgt óók de phishing-redirect, dus dat adres zie je dubbel.
Kit-bestand: koerier_kit_v3.zip   MD5 41d6d195835fa4c5e4f57a207419d4c9
Panel-loader: SHA-256 9f2fa7c1d9b2db5df756672d044f0fe1f7d95be0ce2543127196235c00b75835
Werkt tegen ongepatchte gateways (CVE-2024-3400). Snelle uitbetaling, vaste fee.
`;

CS.registerRoom({
  id: 'osint-jacht',
  path: 'puzzels',
  order: 3,
  title: 'OSINT-jacht: ontmasker de operator',
  icon: '🔎',
  difficulty: 'Gemiddeld',
  minutes: 60,
  summary: 'Eén fictieve cybercrime-operator laat overal kleine sporen na. Correleer forumposts, certificaten, een wallet-tag en metadata tot één identiteit, ontleed zijn phishinglink, trek de indicatoren uit een gelekte post — en blijf netjes binnen de regels.',
  objectives: [
    'Uitleggen wat een pivot is en hoe een hergebruikte alias of e-mail losse bronnen aan elkaar knoopt',
    'Fictieve fragmenten (forum, crt.sh/WHOIS, wallet-tag, social, metadata) correleren tot één operator',
    'Een phishing-URL ontleden en de @-truc, een merknaam als subdomein en punycode herkennen',
    'Indicatoren (IOC\'s) uit een gedefangde operator-post halen en ze uit elkaar houden',
    'De zeldzaamheid en betrouwbaarheid van een spoor inschatten en nooit op één pivot vertrouwen',
    'De grenzen benoemen: passief observeren, geen echte personen, en art. 126g en 126j Sv kort',
  ],

  tasks: [
    {
      title: 'Taak 1 — De jacht begint: pivots en de rode draad',
      content: `
        <p>Een cybercrime-operator werkt zelden op één plek. Hij adverteert op een forum, registreert een domein, int betalingen in een wallet, roept wat op sociale media en lekt per ongeluk een bestand met metadata. Elk spoor op zich zegt weinig. De kunst van OSINT is om die losse stukjes aan elkaar te <strong>knopen</strong> tot één identiteit — precies zoals een rechercheur losse getuigenverklaringen tot één verhaal maakt.</p>

        <p>De techniek daarvoor heet <strong>pivoten</strong> (pivoting): je vindt één kenmerk en gebruikt dat als draaipunt om naar een volgende bron te springen. Vind je op een forum de gebruikersnaam <code>v0idkoerier</code>, dan zoek je of diezelfde naam elders opduikt. Staat er een e-mailadres bij, dan zoek je welke domeinen op dat adres geregistreerd zijn. Mensen zijn namelijk <strong>gewoontedieren</strong>: ze hergebruiken dezelfde alias op tien platforms en koppelen alles aan hetzelfde mailadres. Die luiheid is jouw rode draad.</p>

        <div class="callout info"><strong>De zaak in deze room (fictief):</strong> achter een phishing- en cash-out-dienst met de naam <strong>KOERIER</strong> zit één operator. Hij laat op vijf plekken sporen na. Jouw opdracht: correleer die tot één alias, ontleed zijn phishinglink, haal de indicatoren uit een gelekte post en beoordeel hoe hard je bewijs is. Alle personen, accounts, domeinen en adressen hier zijn <strong>verzonnen</strong>.</div>

        <h3>Wat maakt een spoor bruikbaar?</h3>
        <ul>
          <li><strong>Een alias</strong> die zeldzaam genoeg is. <code>v0idkoerier</code> komt niet toevallig bij twee mensen voor; <code>gamer123</code> wel.</li>
          <li><strong>Een e-mailadres.</strong> Hetzelfde adres op een forum én in een domeinregistratie is een sterke koppeling.</li>
          <li><strong>Infrastructuur.</strong> Een domein, een certificaat of een IP-adres dat terugkomt, verbindt losse campagnes.</li>
          <li><strong>Metadata.</strong> De auteur, software of een pad als <code>C:\\Users\\v0idkoerier</code> in een bestand verraadt vaak de maker.</li>
        </ul>

        <p>In de volgende taak krijg je de vijf fragmenten voorgeschoteld. Houd steeds één vraag in je hoofd: <em>welk kenmerk komt in meer dan één bron terug?</em> Dát is je pivot.</p>
      `,
      questions: [
        { q: 'Hoe heet de techniek waarbij je één gevonden kenmerk gebruikt als draaipunt om naar een volgende bron te springen?', answer: ['pivoten', 'pivoting', 'pivot', 'pivoteren'], hint: 'Een Engels woord voor "om een draaipunt draaien".', explain: 'Pivoten: je draait van het ene kenmerk (alias, e-mail, domein) naar het volgende en bouwt zo een profiel op.' },
        { q: 'Waarom is een hergebruikte, zeldzame gebruikersnaam waardevol voor een OSINT-onderzoek?', options: ['Het is altijd ook het wachtwoord', 'Dezelfde zeldzame naam op meerdere platforms laat je accounts van één persoon aan elkaar koppelen', 'Het verraadt direct het IP-adres', 'Dat is het niet'], answer: 1, explain: 'Mensen hergebruiken namen en mailadressen; een zeldzame naam die terugkeert, koppelt losse bronnen aan dezelfde persoon.' },
        { q: 'Ik begrijp dat deze hele zaak fictief is en alleen bedoeld om de methode te oefenen.', noAnswer: true },
      ],
    },

    {
      title: 'Taak 2 — De fragmenten correleren',
      content: `
        <p>Hieronder liggen vijf fragmenten uit de zaak KOERIER, plus een gelekte configregel. Ze komen van verschillende plekken: een fraudeforum, <strong>Certificate Transparency</strong> (de openbare logboeken van uitgegeven TLS-certificaten, doorzoekbaar via <code>crt.sh</code>) gecombineerd met <strong>WHOIS</strong>, een blockchain-explorer met een publiek wallet-label, een Mastodon-profiel en de metadata van een gelekte schermafbeelding.</p>

        <p>Bekijk de kaarten in het lab en zoek het kenmerk dat telkens terugkeert. Beantwoord daarna eerst de zelf-checkende vragen ín het lab (dat is je correlatie), en dan de vragen hieronder.</p>

        <div class="callout tip"><strong>Tip:</strong> leg naast elke kaart welk kenmerk je eruit haalt: alias, e-mail, domein, wallet. Het kenmerk dat op de meeste kaarten staat, is je rode draad. Twee kaarten noemen zelfs exact hetzelfde e-mailadres — dat is de hardste koppeling.</div>

        <h3>Let op de metadata en de memo</h3>
        <p>De schermafbeelding draagt een <code>UserComment</code>-veld; daar liet de maker per ongeluk een tekst achter. En in de Mastodon-post staat een <strong>memo</strong> die in Base64 is gecodeerd. Base64 herken je aan de mix van letters, cijfers en soms een <code>=</code> aan het eind. Decodeer die memo (bijvoorbeeld met het CyberChef-lab uit een eerdere room, of in je hoofd met een Base64-tabel) — er komt een vlag uit.</p>
      `,
      lab: {
        type: 'osintpuzzle',
        scenario: 'Zaak KOERIER — vijf fictieve fragmenten over één operator. Zoek het kenmerk dat telkens terugkeert.',
        records: [
          {
            title: 'Forumpost — fraudeforum "DropZone"', icon: '💬',
            lines: [
              'gebruiker: v0idkoerier',
              'handtekening: "koeriersdienst voor je uitbetalingen"',
              'contact: v0idkoerier@mail.nm.lab',
              'PGP-fingerprint: 9F2A C1D9 4B77 0E65 7AB3',
            ],
          },
          {
            title: 'crt.sh + WHOIS — domeinregistratie', icon: '🔎',
            lines: [
              'crt.sh zoekopdracht: koerier-track.nm.lab',
              'certificaat-subject: CN=panel.koerier-track.nm.lab',
              'WHOIS registrant-handle: v0idkoerier',
              'WHOIS e-mail: v0idkoerier@mail.nm.lab',
            ],
          },
          {
            title: 'Blockchain-explorer — wallet-tag', icon: '🪙',
            lines: [
              'adres: bc1qk0erierv0idtipjar000xmpl',
              'publiek label (door gebruikers toegevoegd): "v0idkoerier tipjar"',
              'eerste transactie: 2026-03-02',
            ],
          },
          {
            title: 'Social post — Mastodon', icon: '📣',
            lines: [
              'account: @v0idkoerier@sociaal.nm.lab',
              'bio: "pakketjes & betalingen — dm voor tarief"',
              'post 03:14 UTC: "nieuwe panel-build is live"',
              'memo (base64): Tk17cGl2b3RfdmlhX2hlcmdlYnJ1aWt9',
            ],
          },
          {
            title: 'Metadata — gelekte schermafbeelding panel.png', icon: '🖼️',
            lines: [
              'Software: KoerierKit 3.0',
              'Author: v0idkoerier',
              'pad: C:\\Users\\v0idkoerier\\build\\panel',
              'UserComment: NM{alias_is_de_rode_draad}',
            ],
          },
          {
            title: 'Paste — gelekte configsnipper (paste.nm.lab)', icon: '📨',
            lines: [
              'smtp_user = v0idkoerier@mail.nm.lab',
              'c2 = koerier-track.nm.lab',
              'note = zie forum DropZone voor tarief',
            ],
          },
        ],
        ask: [
          { q: 'Welke alias komt op (vrijwel) elke bron terug?', answer: ['v0idkoerier'], hint: 'Lees de gebruikersnaam, de registrant-handle, het wallet-label en de Author.' },
          { q: 'Welk e-mailadres koppelt de forumpost aan de WHOIS-registratie?', answer: ['v0idkoerier@mail.nm.lab'], hint: 'Hetzelfde adres staat op de forumkaart én de crt.sh/WHOIS-kaart.' },
          { q: 'Welk domein registreerde de operator (uit crt.sh/WHOIS)?', answer: ['koerier-track.nm.lab'], hint: 'Kijk naar de crt.sh-zoekopdracht en de config-paste.' },
          { q: 'Welk wallet-adres is publiek aan de operator gelabeld?', answer: ['bc1qk0erierv0idtipjar000xmpl'], hint: 'Staat op de blockchain-explorer-kaart.' },
        ],
      },
      questions: [
        { q: 'Welke alias is in dit onderzoek de rode draad?', options: ['gamer123', 'v0idkoerier', 'DropZone', 'KoerierKit'], answer: 1, explain: 'v0idkoerier komt terug op het forum, in de WHOIS-registratie, op het wallet-label, in de social bio en in de metadata — dat is dezelfde persoon.' },
        { q: 'Welk e-mailadres koppelt de forumpost hard aan de domeinregistratie?', answer: ['v0idkoerier@mail.nm.lab'], hint: 'Hetzelfde adres staat op twee onafhankelijke kaarten.', explain: 'Een identiek, zeldzaam mailadres op twee losse bronnen is een van de sterkste koppelingen die je kunt vinden.' },
        { q: 'Welke vlag staat in het UserComment-veld van de metadata van panel.png?', answer: ['NM{alias_is_de_rode_draad}'], hint: 'Lees de metadata-kaart; de maker liet de tekst per ongeluk staan.', explain: 'In de metadata staat UserComment: NM{alias_is_de_rode_draad} — metadata verraadt vaak de maker én meer.' },
        { q: 'Decodeer de Base64-memo uit de Mastodon-post. Welke vlag komt eruit?', answer: ['NM{pivot_via_hergebruik}'], encoded: true, hint: 'Tk17cGl2b3RfdmlhX2hlcmdlYnJ1aWt9 is Base64. Decodeer het.', explain: 'De Base64-string decodeert naar NM{pivot_via_hergebruik}: precies wat je net deed — pivoten op een hergebruikt kenmerk.' },
      ],
    },

    {
      title: 'Taak 3 — De phishinglink ontleden',
      content: `
        <p>De operator stuurt zijn slachtoffers met phishingmails naar nep-pagina's. Uit de mailgateway heb je vijf URL's verzameld. Jouw taak: bepaal waar ze écht naartoe gaan, zodat je de juiste hosts kunt blokkeren. Je klikt nergens op — je leest de URL als tekst.</p>

        <h3>Zo lees je een URL</h3>
        <pre><code>https://gebruiker@host.voorbeeld.nm.lab:8443/pad?id=12

schema          https
gebruikersdeel  gebruiker
host            host.voorbeeld.nm.lab
poort           8443
pad             /pad
query           id=12</code></pre>
        <ul>
          <li>De <strong>host</strong> is waar je browser echt verbinding mee maakt. Alles vóór een <code>@</code> is een gebruikersdeel en wordt genegeerd. Bij <code>https://www.nederbank.nl@203.0.113.60/</code> ga je dus naar <code>203.0.113.60</code>, niet naar de bank. Dat heet de <strong>@-truc</strong>.</li>
          <li>Een hostnaam lees je <strong>van rechts naar links</strong>. Bij <code>pakketpost.nl.koerier-track.nm.lab</code> bepaalt het laatste stuk de eigenaar: het domein is <code>koerier-track.nm.lab</code> (van de operator!). De merknaam vooraan is maar een verzonnen subdomein.</li>
          <li><strong>Punycode</strong> (<code>xn--</code>) codeert internationale tekens in een domeinnaam. Aanvallers gebruiken het voor lookalike-domeinen die bijna niet van echt te onderscheiden zijn (een homograafaanval).</li>
          <li>Een kaal <strong>IP-adres</strong> als host, <code>http</code> zonder <code>s</code>, of een vreemde <strong>poort</strong> zijn extra rode vlaggen.</li>
        </ul>

        <p>Het lab ontleedt elke URL en toont de rode vlaggen. Let op: het eerste domein hoort bij <code>koerier-track.nm.lab</code> — hetzelfde domein dat je in taak 2 in de WHOIS-registratie vond. De phishing en de operator hangen aan elkaar.</p>

        <div class="callout warn"><strong>Let op:</strong> klik nooit op een verdachte link "om even te kijken". Analyseer hem als tekst, zoals hier. Blokkeer meestal de hele <em>host</em>, want paden en parameters wisselt een aanvaller zo.</div>
      `,
      lab: {
        type: 'url',
        urls: [
          'http://pakketpost.nl.koerier-track.nm.lab/status?id=NL44',
          'https://www.nederbank.nl@203.0.113.60/herstel',
          'https://xn--pakketpst-l2a.nm.lab/track',
          'http://192.0.2.23:8088/koerier/afhalen',
          'https://portaal.nm.lab/klant',
        ],
      },
      questions: [
        { q: 'Met welke host maakt de browser écht verbinding bij https://www.nederbank.nl@203.0.113.60/herstel?', answer: ['203.0.113.60'], hint: 'Alles vóór de @ is het gebruikersdeel en wordt genegeerd.', explain: 'Door de @-truc lijkt het een link naar de bank, maar de echte host is het IP-adres 203.0.113.60.' },
        { q: 'Welke URL gebruikt punycode om op een bekend domein te lijken?', options: ['https://portaal.nm.lab/klant', 'https://xn--pakketpst-l2a.nm.lab/track', 'http://192.0.2.23:8088/koerier/afhalen', 'https://www.nederbank.nl@203.0.113.60/herstel'], answer: 1, explain: 'xn-- verraadt punycode: achter de schermen staat een teken dat op een gewone letter lijkt (homograafaanval).' },
        { q: 'Onder welk geregistreerd domein valt http://pakketpost.nl.koerier-track.nm.lab/status (lees van rechts naar links)?', answer: ['koerier-track.nm.lab'], hint: 'Het laatste stuk vóór de map bepaalt de eigenaar; de merknaam vooraan is een subdomein.', explain: 'De host valt onder koerier-track.nm.lab — het domein van de operator uit taak 2. "pakketpost.nl" is misleiding.' },
        { q: 'Welke poort gebruikt de URL met het kale IP-adres 192.0.2.23?', answer: ['8088'], hint: 'Kijk naar het getal na de dubbele punt.', explain: 'Een ongebruikelijke poort op een kaal IP-adres via http is een sterke rode vlag.' },
      ],
    },

    {
      title: 'Taak 4 — Indicatoren uit de gelekte post',
      content: `
        <p>Een rivaal heeft een oude verkooppost van de operator gelekt en gearchiveerd. De tekst staat vol <strong>indicatoren</strong> (IOC's): adressen, domeinen, een e-mailadres, bestandshashes en een CVE-nummer. Ze zijn <strong>gedefangd</strong> — onklikbaar gemaakt met trucjes als <code>hxxps</code>, <code>[.]</code> en <code>[at]</code> — zodat niemand per ongeluk contact maakt met de infrastructuur van de operator.</p>

        <h3>Wat is wat?</h3>
        <ul>
          <li><strong>IPv4-adres</strong> — bijv. <code>198.51.100[.]77</code> (een documentatie-adres).</li>
          <li><strong>Domein / URL</strong> — <code>koerier-track[.]nm[.]lab</code>, <code>hxxps://panel[.]koerier-track[.]nm[.]lab/login</code>.</li>
          <li><strong>E-mailadres</strong> — <code>v0idkoerier[at]mail[.]nm[.]lab</code> (ken je die nog uit taak 2?).</li>
          <li><strong>Hashes</strong> — MD5 (32 hextekens) en SHA-256 (64 hextekens) van bestanden.</li>
          <li><strong>CVE</strong> — een kwetsbaarheid die de kit misbruikt.</li>
        </ul>

        <p>Het lab haalt de indicatoren automatisch uit de tekst en telt ze per soort. Loop de tellingen na en vergelijk ze met wat je zelf in de tekst ziet. Let op één valkuil: <strong>één IP-adres komt twee keer voor</strong> (het doet zowel C2 als de phishing-redirect). Bij <em>unieke</em> indicatoren telt dat als één.</p>

        <div class="callout info"><strong>Rode draad:</strong> het e-mailadres en het domein in deze post zijn exact dezelfde als in taak 2. Dat bevestigt onafhankelijk dat deze post bij jouw operator hoort — een tweede pivot naar dezelfde identiteit.</div>

        <p>Bovenin de post staat een <strong>zaakcode</strong> die je als vlag invult.</p>
      `,
      lab: { type: 'ioc', text: KOERIER_POST },
      questions: [
        { q: 'Hoeveel unieke IPv4-adressen staan er in de post?', answer: ['3', 'drie'], hint: 'Tel de adressen, maar reken een dubbel adres één keer.', explain: '198.51.100.77, 203.0.113.60 en 192.0.2.23. Het adres 198.51.100.77 staat er twee keer in (C2 én redirect), maar telt als één uniek adres.' },
        { q: 'Welk CVE-nummer noemt de post?', answer: ['CVE-2024-3400'], hint: 'Zoek naar CVE- in de tekst of de CVE-telling in het lab.', explain: 'De kit richt zich op ongepatchte gateways via CVE-2024-3400; patchen heeft dus hoge prioriteit.' },
        { q: 'Welk e-mailadres in de post koppelt terug naar de operator uit taak 2?', answer: ['v0idkoerier@mail.nm.lab'], hint: 'Refang het gedefangde adres ([at] en [.] terugzetten).', explain: 'Gerefangd is dat v0idkoerier@mail.nm.lab — precies het adres uit de forumpost en de WHOIS-registratie.' },
        { q: 'Wat is de zaakcode (vlag) bovenin de post?', answer: ['NM{koerier_ontmaskerd}'], hint: 'Kijk in de eerste regels van de tekst in het lab.', explain: 'De zaakcode NM{koerier_ontmaskerd} markeert dat je de operator aan zijn eigen infrastructuur hebt gekoppeld.' },
      ],
    },

    {
      title: 'Taak 5 — Sorteer de zestien sporen',
      content: `
        <p>Tijdens de jacht ben je van alles tegengekomen: zoekbronnen, soorten entiteiten, vingerafdrukken van infrastructuur en platforms waar handles leven. Om overzicht te houden, sorteer je ze. In het lab staan <strong>zestien begrippen</strong> door elkaar; verdeel ze in <strong>vier groepen van vier</strong>.</p>

        <h3>De vier categorieën</h3>
        <ul>
          <li><strong>OSINT-bronnen</strong> — plekken die je bevráágt om te pivoten (zoekdiensten, logboeken, archieven).</li>
          <li><strong>Entiteitstypes</strong> — de abstracte soorten "ding" waarover je pivoteert (geen merk, maar het type).</li>
          <li><strong>Infrastructuur-vingerafdrukken</strong> — herhaalbare kenmerken die servers of personen clusteren.</li>
          <li><strong>Social-/communicatieplatforms</strong> — concrete plekken waar aliassen en accounts opduiken.</li>
        </ul>

        <p>Elk begrip past in precies één groep. Twijfel je? Vraag je af <em>wat</em> het is: een bron die je raadpleegt, een abstract type, een technische vingerafdruk, of een platform met een naam. <code>crt.sh</code> is bijvoorbeeld een bron; <code>certificaat</code> is het abstracte entiteitstype — die horen dus níét bij elkaar.</p>

        <div class="callout tip"><strong>Tip:</strong> het lab geeft "drie goed" als hint wanneer je er één fout hebt. Begin met de groep waar je het zekerst van bent, dan houd je minder opties over voor de rest. Los je alles op, dan verschijnt de vlag.</div>
      `,
      lab: {
        type: 'connections',
        prompt: 'Verdeel de zestien sporen in vier groepen van vier: OSINT-bronnen, entiteitstypes, infrastructuur-vingerafdrukken en social-/communicatieplatforms.',
        flag: 'NM{zestien_sporen_gesorteerd}',
        groups: [
          { name: 'OSINT-bronnen', items: ['crt.sh', 'WHOIS', 'Wayback Machine', 'Shodan'] },
          { name: 'Entiteitstypes', items: ['domein', 'wallet', 'alias', 'certificaat'] },
          { name: 'Infrastructuur-vingerafdrukken', items: ['favicon-hash', 'Google Analytics-ID', 'PGP-fingerprint', 'TLS-JA3'] },
          { name: 'Social-/communicatieplatforms', items: ['Mastodon', 'Telegram', 'Discord', 'Keybase'] },
        ],
      },
      questions: [
        { q: 'In welke groep hoort crt.sh?', options: ['Entiteitstypes', 'OSINT-bronnen', 'Infrastructuur-vingerafdrukken', 'Social-/communicatieplatforms'], answer: 1, explain: 'crt.sh is een doorzoekbare bron (de Certificate Transparency-logs). Het abstracte type "certificaat" hoort bij de entiteitstypes.' },
        { q: 'Een favicon-hash en een gedeeld Google Analytics-ID gebruik je vooral om wat te doen?', options: ['Een wachtwoord kraken', 'Verschillende servers of sites aan dezelfde eigenaar clusteren', 'Een foto geolokaliseren', 'Een e-mail versturen'], answer: 1, explain: 'Het zijn infrastructuur-vingerafdrukken: duikt dezelfde favicon-hash of tracking-ID op meerdere sites op, dan horen die waarschijnlijk bij dezelfde beheerder.' },
        { q: 'Welke vlag verschijnt als je alle vier de groepen goed hebt?', answer: ['NM{zestien_sporen_gesorteerd}'], hint: 'Los de puzzel in het lab op.', explain: 'Bij een volledige oplossing toont het lab NM{zestien_sporen_gesorteerd}.' },
      ],
    },

    {
      title: 'Taak 6 — Zeldzaamheid, betrouwbaarheid en bronkritiek',
      content: `
        <p>Je hebt de operator gevonden. Maar hoe <strong>hard</strong> is je bewijs? Een goede onderzoeker scheidt een sterke aanwijzing van een zwakke, en leunt nooit op één spoor. Twee begrippen helpen daarbij: <strong>zeldzaamheid</strong> en <strong>betrouwbaarheid</strong>.</p>

        <h3>Zeldzaamheid bepaalt de bewijskracht</h3>
        <p>Hoe zeldzamer een kenmerk, hoe sterker de koppeling. De alias <code>v0idkoerier</code> is uniek genoeg dat twee bronnen met die naam vrijwel zeker dezelfde persoon zijn. Zou de naam <code>admin</code> of <code>info</code> zijn, dan bewijst het niets — dat gebruikt half internet. Hetzelfde geldt voor een <strong>e-mailadres</strong> (zeer zeldzaam, sterke koppeling) versus een <strong>profielfoto</strong> die iemand van een stocksite plukte (kan toevallig gedeeld zijn).</p>

        <h3>Betrouwbaarheid: waar komt het spoor vandaan?</h3>
        <ul>
          <li><strong>Hard, geverifieerd.</strong> Een <code>crt.sh</code>-certificaat is door een certificaatautoriteit uitgegeven en in een openbaar logboek vastgelegd — moeilijk te vervalsen.</li>
          <li><strong>Matig.</strong> Een WHOIS-registratie kan met neppe gegevens zijn gedaan, maar het e-mailadres moest ergens kloppen om het domein te beheren.</li>
          <li><strong>Zwak.</strong> Een <em>wallet-label</em> op een explorer is vaak door willekeurige gebruikers toegevoegd. Het is een hint, geen bewijs, tot je het bevestigt.</li>
        </ul>

        <p>Dit is precies de gedachte achter beoordelingsmodellen zoals de <strong>Admiralty Code</strong>: je scoort de betrouwbaarheid van de <em>bron</em> apart van de geloofwaardigheid van de <em>informatie</em>.</p>

        <div class="callout warn"><strong>Eén pivot is een hypothese, geen conclusie.</strong> Pas als meerdere <em>onafhankelijke</em> sporen dezelfde kant op wijzen — de alias én het mailadres én het domein — wordt het een onderbouwde conclusie. Dat heet verificatie. En let op <strong>valse positieven</strong>: twee sites met dezelfde favicon-hash kunnen ook gewoon hetzelfde kant-en-klare thema gebruiken.</div>
      `,
      questions: [
        { q: 'Welke gebruikersnaam levert de sterkste koppeling tussen twee bronnen?', options: ['admin', 'info', 'v0idkoerier', 'user'], answer: 2, explain: 'Hoe zeldzamer de naam, hoe onwaarschijnlijker het toeval. v0idkoerier is uniek genoeg; admin/info/user zeggen niets.' },
        { q: 'Welke bron uit deze zaak is het hardste, moeilijkst te vervalsen bewijs?', options: ['Een wallet-label op een explorer', 'Een door gebruikers toegevoegde profielfoto', 'Een crt.sh-certificaat uit de Certificate Transparency-logs', 'Een anonieme forumreactie'], answer: 2, explain: 'Certificaten worden door een CA uitgegeven en openbaar gelogd; een wallet-label of foto kan iedereen toevoegen of hergebruiken.' },
        { q: 'Waarom vertrouw je nooit op één enkele pivot?', options: ['Omdat pivoten verboden is', 'Omdat één spoor pas een hypothese is; meerdere onafhankelijke sporen samen maken er een conclusie van', 'Omdat het te snel gaat', 'Dat hoeft ook niet, één is genoeg'], answer: 1, explain: 'Verificatie betekent bevestigen via meerdere onafhankelijke aanwijzingen; één spoor kan een valse positief zijn.' },
      ],
    },

    {
      title: 'Taak 7 — Passief, fictief en netjes: OPSEC en ethiek',
      content: `
        <p>Je kunt nu een operator ontmaskeren met open bronnen. De laatste — en belangrijkste — vaardigheid is weten <strong>waar de grens ligt</strong>. OSINT is krachtig, maar niet grenzeloos.</p>

        <h3>Blijf passief</h3>
        <p>Alles wat je in deze room deed, is <strong>passief observeren</strong>: je las openbare posts, certificaten en metadata. Je logde nergens in, je nam geen contact op, je lokte niemand uit. Dat onderscheid is cruciaal:</p>
        <ul>
          <li><strong>Mag wel:</strong> openbare bronnen lezen en combineren.</li>
          <li><strong>Mag niet (op eigen houtje):</strong> inloggen op het panel van de operator, een besloten groep binnendringen, of met een nep-account contact leggen om hem uit te lokken. Een wachtwoord raden of inbreken is <strong>computervredebreuk</strong> (art. 138ab Sr), geen OSINT meer.</li>
        </ul>

        <h3>OPSEC: scherm je eigen sporen af</h3>
        <p>Terwijl jij de operator onderzoekt, laat jíj ook sporen na: je IP-adres is zichtbaar voor een server, en een profielbezoek kan een melding geven. <strong>OPSEC</strong> (Operational Security) betekent een aparte onderzoeksomgeving gebruiken, niet je persoonlijke account, en vastleggen wat je doet zonder jezelf te verraden.</p>

        <h3>De juridische lijn (kort)</h3>
        <p>Als een <strong>opsporingsambtenaar</strong> iemand stelselmatig gaat volgen of een profiel van zijn leven opbouwt, is dat <strong>stelselmatige observatie</strong> (<strong>art. 126g Sv</strong>). Gaat hij daarbij heimelijk contact aan, zonder kenbaar te zijn als opsporingsambtenaar (bijvoorbeeld met een onderzoeksaccount in een besloten groep), dan is dat <strong>stelselmatige inwinning van informatie</strong> (<strong>art. 126j Sv</strong>). Beide vereisen een bevel van de officier van justitie en waarborgen. Een burger of leerling heeft die bevoegdheden <em>niet</em>. En privacyregels gelden altijd (voor organisaties de AVG, voor de politie de Wet politiegegevens): verzamel niet meer persoonsgegevens dan je voor je vraag nodig hebt (dataminimalisatie).</p>

        <div class="callout danger"><strong>Oefen alleen fictief.</strong> Alle aliassen, domeinen en adressen in deze room zijn verzonnen (<code>.nm.lab</code>, documentatie-IP's). Richt deze technieken nooit op een echt persoon zonder grondslag en bevoegdheid. De vaardigheid die telt is niet "zoveel mogelijk vinden", maar "het juiste vinden, kunnen bewijzen, en binnen de regels blijven".</div>
      `,
      questions: [
        { q: 'Wat is het verschil tussen toegestaan (passief) en niet-toegestaan optreden in dit onderzoek?', options: ['Er is geen verschil', 'Passief = openbare bronnen lezen en combineren; niet toegestaan = inloggen, infiltreren of met een nep-account uitlokken', 'Passief mag alleen \'s nachts', 'Alleen de politie mag googelen'], answer: 1, explain: 'Observeren wat openbaar is, mag. Zodra je inlogt, een slot forceert of iemand actief misleidt, is het geen OSINT meer.' },
        { q: 'Onder welk wetsartikel valt het stelselmatig inwinnen van informatie door een opsporingsambtenaar die niet als zodanig kenbaar is?', answer: ['art. 126j Sv', '126j Sv', '126j', 'artikel 126j sv'], hint: 'Een artikel uit het Wetboek van Strafvordering (Sv), nummer 126j.', explain: 'Art. 126j Sv regelt de heimelijke, stelselmatige inwinning van informatie; stelselmatig volgen zonder contact is observatie (art. 126g Sv). Beide zijn bevoegdheden voor opsporing, met waarborgen — niet voor burgers.' },
        { q: 'Wat betekent OPSEC voor jou als onderzoeker?', answer: ['operational security', 'operationele veiligheid'], hint: 'Het gaat om het afschermen van je éígen sporen tijdens het onderzoek.', explain: 'OPSEC (Operational Security): maatregelen om je eigen identiteit en onderzoek af te schermen, bijv. een aparte onderzoeksomgeving.' },
        { q: 'Ik begrijp dat ik passief openbaar materiaal mag observeren, maar niet op eigen houtje mag inloggen, infiltreren of uitlokken — en dat ik dit alleen op fictieve zaken oefen.', noAnswer: true },
      ],
    },
  ],

  terms: [
    { term: 'Pivoten', def: 'Van één gevonden kenmerk (alias, e-mail, domein) naar een volgende bron springen om een profiel op te bouwen.' },
    { term: 'Alias', def: 'Een zelfgekozen gebruikersnaam; een zeldzame, hergebruikte alias koppelt accounts van dezelfde persoon.' },
    { term: 'Certificate Transparency (crt.sh)', def: 'Openbare logboeken van uitgegeven TLS-certificaten, doorzoekbaar via crt.sh — hard, moeilijk te vervalsen bewijs over domeinen.' },
    { term: 'WHOIS', def: 'Openbare registratiegegevens van een domein (handle, e-mail, data); kan nep zijn, maar koppelt soms een mailadres aan infrastructuur.' },
    { term: 'IOC', def: 'Indicator of Compromise: een adres, domein, URL, e-mail, hash of CVE die een aanval of actor markeert.' },
    { term: 'Defangen', def: 'Een indicator onklikbaar maar leesbaar maken (hxxps, [.], [at]) om per ongeluk contact te voorkomen; refangen draait dat terug.' },
    { term: 'Punycode', def: 'Codering (xn--) van internationale tekens in domeinnamen, misbruikt voor lookalike-domeinen (homograafaanval).' },
    { term: '@-truc', def: 'Alles vóór een @ in een URL is een gebruikersdeel en wordt genegeerd; de echte host staat erna.' },
    { term: 'Infrastructuur-vingerafdruk', def: 'Een herhaalbaar kenmerk (favicon-hash, TLS-JA3, tracking-ID) waarmee je servers of sites aan dezelfde eigenaar clustert.' },
    { term: 'Zeldzaamheid', def: 'Hoe uniek een kenmerk is; hoe zeldzamer, hoe sterker de koppeling en hoe kleiner de kans op toeval (valse positief).' },
    { term: 'OPSEC', def: 'Operational Security: maatregelen om je eigen sporen en identiteit tijdens een onderzoek af te schermen.' },
    { term: 'Art. 126j Sv', def: 'Bijzondere opsporingsbevoegdheid voor stelselmatige inwinning van informatie door een opsporingsambtenaar die niet als zodanig kenbaar is. Stelselmatig volgen zonder contact is observatie (art. 126g Sv).' },
  ],

  resources: [
    { title: 'crt.sh — Certificate Transparency doorzoeken', url: 'https://crt.sh/' },
    { title: 'OSINT Framework — overzicht van open-bronnen-tools', url: 'https://osintframework.com/' },
    { title: 'Nationaal Cyber Security Centrum (NCSC)', url: 'https://www.ncsc.nl/' },
    { title: 'Wetboek van Strafvordering (o.a. art. 126j) op wetten.overheid.nl', url: 'https://wetten.overheid.nl/BWBR0001903/' },
  ],
});
