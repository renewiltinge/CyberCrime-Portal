/* Room: Netwerkbeveiliging en zakelijke wifi */
CS.registerRoom({
  id: 'netwerkbeveiliging-wifi',
  path: 'defensief',
  order: 15,
  title: 'Netwerkbeveiliging en zakelijke wifi',
  icon: '🧱',
  difficulty: 'Gemiddeld',
  minutes: 85,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Een netwerk ontwerp je zo dat een inbraak op één plek niet overal een inbraak wordt. Beoordeel een firewallregelset, deel een netwerk in zones in, lees firewall- en IDS-logs, kies een VPN-aanpak, betrap misbruik van netwerktoegang via 802.1X-logs en licht de wifi van een bedrijf door.',
  objectives: [
    'Een firewallregelset beoordelen op standaard weigeren, te ruime regels, volgorde en overschaduwde regels',
    'Een netwerk indelen in zones (DMZ, servers, beheer, gasten, IoT) en bepalen welk verkeer ertussen mag',
    'Firewall- en IDS-logs lezen om een gecompromitteerd systeem en zijn bewegingen te vinden, en het verschil tussen IDS en IPS uitleggen',
    'Site-to-site en remote access VPN inrichten en de risico\'s ervan beperken',
    'Netwerktoegang regelen met IEEE 802.1X en NAC, en zakelijke wifi beoordelen op WPA2, WPA3, Personal tegenover Enterprise en een gescheiden gastnetwerk',
  ],
  tasks: [
    {
      title: 'Taak 1: Een firewallregelset beoordelen',
      tryFirst: true,
      intro: '<p>Het fictieve Hoogland Logistiek heeft één firewall tussen internet, de DMZ en de interne VLAN\'s. De regelset is in zes jaar gegroeid en niemand kent hem nog helemaal. Lees hem in het lab van boven naar beneden, zoals de firewall dat doet, en zoek regels die te veel toestaan, regels die nooit worden geraakt en wat er aan het eind ontbreekt.</p>',
      content: `
        <p>Een firewall bekijkt verkeer en beslist op basis van regels of het door mag. Er zijn grofweg drie soorten:</p>
        <ul>
          <li>Een <strong>pakketfilter</strong> (<em>stateless</em>) kijkt per pakket naar adressen, protocol en poorten.
          Snel, maar dom: hij weet niet of een pakket bij een bestaande verbinding hoort.</li>
          <li>Een <strong>stateful firewall</strong> houdt verbindingen bij. Je schrijft een regel voor de richting waarin
          een verbinding wordt opgezet, en het antwoordverkeer mag vanzelf terug.</li>
          <li>Een <strong>next-generation firewall</strong> (NGFW) herkent daarnaast applicaties en gebruikers, en heeft
          vaak een IPS aan boord. Een <strong>web application firewall</strong> (WAF) is gespecialiseerd in HTTP-verkeer
          naar webapplicaties.</li>
        </ul>
        <h3>Hoe een regelset wordt gelezen</h3>
        <p>De meeste firewalls werken met <strong>first match</strong>: ze lopen de regels van boven naar beneden af en
        voeren de eerste regel uit die past. Daarna kijken ze niet verder. Twee gevolgen:</p>
        <ul>
          <li>Een specifieke regel moet <em>boven</em> een algemene regel staan. Staat een brede allow boven een smalle
          deny, dan wordt de deny nooit geraakt. Zo'n regel heet <strong>overschaduwd</strong> (<em>shadowed</em>).</li>
          <li>Wat aan het eind gebeurt met verkeer dat geen enkele regel raakt, bepaalt het karakter van de hele set.</li>
        </ul>
        <h3>Standaard weigeren</h3>
        <p>Het uitgangspunt is <strong>default deny</strong>: alles wat niet uitdrukkelijk is toegestaan, wordt geweigerd.
        Je schrijft dus regels die zeggen wat <em>wel</em> mag, zo smal mogelijk: een bepaalde bron, een bepaalde
        bestemming, een bepaalde poort. De laatste regel is een gelogde "deny any any". Dat geldt ook voor verkeer naar
        buiten (<em>egress</em>): een server die nooit zelf het internet op hoeft, mag dat ook niet. Zo maak je het een
        aanvaller moeilijker om gereedschap op te halen of gegevens weg te sturen.</p>
        <h3>Regelhygiëne</h3>
        <p>NIST SP 800-41 Rev. 1 (richtlijnen voor firewalls en firewallbeleid) en elke audit vragen om hetzelfde:</p>
        <ul>
          <li>Per regel een eigenaar, een reden en, bij tijdelijke regels, een einddatum.</li>
          <li>Geen <code>any</code> in bron, bestemming én dienst tegelijk, behalve in de laatste deny.</li>
          <li>Beheerdiensten zoals RDP (3389) en SSH (22) nooit open naar het hele internet. Gebruik een VPN of een
          beheeroplossing met MFA.</li>
          <li>Periodiek nalopen welke regels nooit verkeer zien (de meeste firewalls tellen treffers per regel) en die
          opruimen.</li>
        </ul>
        <div class="callout warn"><strong>Tijdelijk is permanent:</strong> een regel met "tijdelijk" in de opmerking en
        geen einddatum, staat er over drie jaar nog. Leg de einddatum vast in het wijzigingsproces, niet in een
        opmerking.</div>
      `,
      lab: {
        type: 'logs',
        title: 'fw-hoogland-01_regelset.txt',
        lines: `# Regelset FW-HOOGLAND-01. Werkwijze: eerste regel die past, wint.
# Netwerken: DMZ 192.168.100.0/24 | VLAN 10 kantoor 10.10.10.0/24 | VLAN 20 servers 10.10.20.0/24
#            VLAN 30 gasten 10.10.30.0/24 | VLAN 40 beheer 10.10.40.0/24
nr  bron                   bestemming               dienst            actie  opmerking
1   any                    192.168.100.10 (web01)   tcp/443           allow  webshop
2   any                    192.168.100.10 (web01)   tcp/80            allow  doorsturen naar https
3   any                    10.10.20.15 (ts01)       tcp/3389          allow  tijdelijk, leverancier ERP 2024
4   192.168.100.10 (web01) 10.10.20.30 (db01)       tcp/5432          allow  webshop naar database
5   10.10.10.0/24          any                      tcp/80, tcp/443   allow  werkplekken naar internet
6   10.10.10.0/24          10.10.20.0/24            any               allow  werkplekken naar servers
7   10.10.30.0/24          any                      any               allow  gasten naar internet
8   10.10.30.0/24          10.0.0.0/8               any               deny   gasten niet naar intern
9   10.10.40.0/24          any                      any               allow  beheer
10  10.10.10.0/24          10.10.20.25 (fs01)       tcp/445           deny   geen SMB naar oude fileserver
11  10.10.20.0/24          any                      tcp/53, udp/53    allow  DNS van servers
12  any                    any                      any               allow  test 2025-03, later weghalen`,
      },
      questions: [
        { q: 'Welke regel zorgt ervoor dat regel 8 nooit wordt geraakt? (nummer)', answer: ['7', 'regel 7'],
          hints: ['Bij first match telt alleen de eerste regel die past.', 'Zoek een eerdere regel met dezelfde bron als regel 8.', 'Een regel die gasten naar "any" toestaat, bevat ook 10.0.0.0/8.'],
          wrong: { '12': 'Regel 12 staat onder regel 8. Een lagere regel kan een hogere nooit overschaduwen.', '9': 'Regel 9 gaat over het beheernetwerk, een andere bron.' },
          why: 'Wie alleen naar de deny-regel kijkt, denkt dat gasten van het interne netwerk worden geweerd. De volgorde zegt het tegendeel. Een gastnetwerk dat bij de fileserver kan, is een open deur voor elk bezoekend apparaat.',
          explain: 'Regel 7 staat gasten alles naar "any" toe, en any omvat ook 10.0.0.0/8. Wissel de volgorde: eerst de deny naar intern, dan de allow naar internet.' },
        { q: 'Hoeveel regels in de set worden nooit geraakt omdat een eerdere regel al hetzelfde verkeer vangt?', answer: ['2', 'twee'],
          hints: ['Je hebt er al één gevonden. Zoek nog een deny onder een bredere allow.', 'Kijk naar de bron 10.10.10.0/24.', 'Regel 6 staat werkplekken alles naar de servers toe, ook poort 445.'],
          wrong: { '1': 'Ook regel 10 doet niets: regel 6 staat werkplekken al alles naar het hele servernetwerk toe, inclusief fs01 op 445.', '3': 'Regel 12 wordt wel geraakt, door al het verkeer dat geen eerdere regel raakt. Dat is juist het probleem.' },
          explain: 'Regel 8 (door regel 7) en regel 10 (door regel 6). Beide zijn deny-regels die iemand bewust heeft toegevoegd en die geen effect hebben.' },
        { q: 'Welke regel zet een beheerdienst open voor het hele internet? (nummer)', answer: ['3', 'regel 3'],
          hints: ['Zoek een bron any met een poort voor beheer op afstand.', 'Poort 3389 is RDP.', 'Een "tijdelijke" regel voor een leverancier.'],
          wrong: { '12': 'Regel 12 zet alles open, dat is nog erger, maar de vraag is welke regel specifiek een beheerdienst openzet.', '9': 'Regel 9 heeft het beheernetwerk als bron, niet internet.' },
          explain: 'Regel 3: RDP naar ts01 vanaf elk adres op internet, al twee jaar "tijdelijk". RDP vanaf internet wordt veel misbruikt bij ransomware-aanvallen. Vervang dit door toegang voor de leverancier via een VPN met MFA, alleen tijdens afgesproken vensters.' },
        { q: 'Wat moet er met regel 12 gebeuren, en waarom?', options: ['Vervangen door een gelogde deny any any, zodat alles wat niet is toegestaan wordt geweigerd', 'Naar boven verplaatsen, zodat testverkeer voorrang krijgt', 'Laten staan, want de regels erboven vangen het meeste verkeer al', 'Beperken tot tcp, omdat udp zelden wordt misbruikt'], answer: 0,
          wrong: { 1: 'Bovenaan zou hij álle andere regels overschaduwen. Dan is er geen firewall meer.', 2: 'Het gaat juist om het verkeer dat de regels erboven niet vangen. Dat moet geweigerd worden, niet toegestaan.', 3: 'Ook via udp loopt kwaadaardig verkeer, zoals DNS-tunneling. En een halve any-regel is nog steeds een gat.' },
          explain: 'Met regel 12 is de set in feite "default allow". Een gelogde deny any any herstelt het uitgangspunt en levert bovendien de logregels op die je in taak 3 leest.' },
      ],
    },

    {
      title: 'Taak 2: Zones en segmentatie',
      tryFirst: true,
      intro: '<p>Hoogland herbouwt zijn netwerk in zones. In het lab staan zestien systemen. Deel ze in vier zones in, zo dat systemen met hetzelfde risico en dezelfde behoefte aan toegang bij elkaar zitten. Bedenk per zone: wie moet erbij kunnen, en wat gebeurt er als hier iets wordt overgenomen?</p>',
      content: `
        <p>Een plat netwerk, waarin elk apparaat elk ander apparaat kan bereiken, is als een kantoorgebouw zonder
        binnendeuren: wie door de voordeur komt, loopt overal. <strong>Segmentatie</strong> verdeelt het netwerk in
        <strong>zones</strong>, en verkeer tussen zones gaat langs een firewall of filter met regels. Een aanvaller die
        één systeem overneemt, zit dan in één zone en moet langs een controlepunt om verder te komen.</p>
        <h3>Gangbare zones</h3>
        <table>
          <thead><tr><th>Zone</th><th>Wat erin hoort</th><th>Uitgangspunt voor verkeer</th></tr></thead>
          <tbody>
            <tr><td>DMZ (in Security+-termen ook <em>screened subnet</em>)</td><td>Diensten die vanaf internet bereikbaar moeten zijn.</td><td>Internet mag erin op specifieke poorten. Vanuit de DMZ naar binnen alleen smalle, benoemde verbindingen.</td></tr>
            <tr><td>Servernetwerk</td><td>Interne diensten en gegevens.</td><td>Werkplekken alleen naar de diensten die ze nodig hebben, niet naar alle poorten.</td></tr>
            <tr><td>Kantoornetwerk</td><td>Werkplekken en randapparatuur van medewerkers.</td><td>Naar internet via filtering, naar servers per dienst.</td></tr>
            <tr><td>Beheernetwerk</td><td>Alles waarmee je de infrastructuur zelf bestuurt.</td><td>Alleen bereikbaar vanaf beheerwerkplekken of een jumphost.</td></tr>
            <tr><td>Gastnetwerk</td><td>Apparaten die niet van de organisatie zijn.</td><td>Alleen internet, nooit intern.</td></tr>
            <tr><td>IoT en gebouwsystemen</td><td>Apparaten die je slecht kunt bijwerken of beveiligen.</td><td>Alleen naar hun eigen beheerserver, verder niets.</td></tr>
          </tbody>
        </table>
        <p>Voor industriële omgevingen bestaat een eigen model met zones en <em>conduits</em> in de normenreeks
        IEC 62443; zie de room over OT en ICS.</p>
        <h3>VLAN's: scheiding is nog geen beveiliging</h3>
        <p>Een <strong>VLAN</strong> (IEEE 802.1Q) maakt van één fysieke switch meerdere logische netwerken: elk VLAN is een
        eigen broadcastdomein. Dat is de bouwsteen voor zones, maar op zichzelf geen beveiligingsgrens. Als de router of
        de layer-3-switch zonder filter tussen alle VLAN's routeert, kan alles nog steeds alles bereiken. Pas een
        firewall of een toegangslijst (ACL) tussen de VLAN's maakt er een zone van. Houd daarnaast de switches netjes:
        ongebruikte poorten uit, geen poorten die automatisch een trunk worden, en het beheer van de switch zelf in het
        beheernetwerk.</p>
        <h3>Microsegmentatie</h3>
        <p>Grote zones kun je verder opdelen, tot regels per systeem of per workload. Dat heet
        <strong>microsegmentatie</strong> en wordt vaak afgedwongen in de virtualisatielaag of op de host zelf. Het past
        bij Zero Trust: ook binnen het servernetwerk mag niet alles met alles praten (zie de room
        <em>Identiteit, toegang en Zero Trust</em>).</p>
        <div class="callout tip"><strong>Denkregel:</strong> vraag per systeem twee dingen. Wie moet erbij? En als dit
        systeem wordt overgenomen, wat moet het dan juist <em>niet</em> kunnen bereiken? Het antwoord op de tweede vraag
        bepaalt vaak de zone.</div>
      `,
      lab: {
        type: 'connections',
        prompt: 'Deel de zestien systemen van Hoogland in vier zones van vier in.',
        flag: 'NM{elke_zone_eigen_regels}',
        groups: [
          { name: 'DMZ', items: ['Webshopserver', 'Mailrelay voor inkomende mail', 'Reverse proxy', 'Publieke DNS-server voor hoogland.nm.lab'] },
          { name: 'Servernetwerk', items: ['Domeincontroller', 'Fileserver', 'ERP-database', 'Printserver'] },
          { name: 'Beheernetwerk', items: ['Jumphost voor beheerders', 'Out-of-band-beheerkaarten van servers', 'Beheerinterfaces van switches en firewalls', 'Beheerconsole van de virtualisatieomgeving'] },
          { name: 'IoT en gebouwsystemen', items: ['IP-camera\'s', 'Toegangspaslezers', 'Klimaatregeling', 'Besturing van de laaddeuren'] },
        ],
      },
      questions: [
        { q: 'Deel alle systemen goed in. Welke vlag krijg je?', answer: ['NM{elke_zone_eigen_regels}'],
          hints: ['Begin met de vier systemen die vanaf internet bereikbaar moeten zijn.', 'Alles waarmee je de infrastructuur zelf bestuurt, hoort bij elkaar.', 'Apparaten die je nauwelijks kunt bijwerken, zitten in een eigen groep.'],
          explain: 'DMZ, servers, beheer en IoT. Kantoor en gasten zijn de twee zones die er in deze oefening niet bij staan.' },
        { q: 'De webshop in de DMZ moet bestellingen in de ERP-database zetten. Welke firewallregel past bij segmentatie?', options: ['Alleen van de webshopserver naar de database, op de ene databasepoort', 'De database in de DMZ zetten, naast de webshop', 'Van de hele DMZ naar het hele servernetwerk, op alle poorten', 'Van het servernetwerk naar de DMZ, zodat de database de bestellingen zelf ophaalt op alle poorten'], answer: 0,
          wrong: { 1: 'Dan staat je meest waardevolle gegevensverzameling in de zone die als eerste wordt aangevallen.', 2: 'Dan heeft een aanvaller die de webshop overneemt vrij spel in het servernetwerk. Zo\'n regel maakt de DMZ zinloos.', 3: 'Een verbinding vanuit de hogere zone naar de DMZ kan soms, maar "alle poorten" is nooit de bedoeling.' },
          explain: 'Eén bron, één bestemming, één poort. Regel 4 uit de regelset van taak 1 is daar een goed voorbeeld van.' },
        { q: 'Hoogland zet de IP-camera\'s in een eigen VLAN. De layer-3-switch routeert zonder filter tussen alle VLAN\'s. Een camera wordt overgenomen. Kan hij de fileserver bereiken?', options: ['Ja: zonder filter tussen de VLAN\'s is er geen beveiligingsgrens', 'Nee: een VLAN is een gescheiden netwerk, dus de camera kan er niet uit', 'Alleen als de camera hetzelfde VLAN-nummer krijgt als de fileserver', 'Nee, want camera\'s spreken geen SMB'], answer: 0,
          wrong: { 1: 'Een VLAN scheidt broadcastdomeinen. Routeert de switch tussen de VLAN\'s, dan is elk ander VLAN gewoon bereikbaar.', 2: 'Dat is niet nodig: met routering ertussen bereikt hij elk VLAN.', 3: 'Een overgenomen camera draait de software van de aanvaller. Wat het apparaat normaal doet, maakt dan niet meer uit.' },
          why: 'Organisaties melden geregeld "we hebben gesegmenteerd" terwijl ze alleen VLAN\'s hebben aangemaakt. Een pentest of een aanvaller merkt het verschil binnen minuten.',
          explain: 'Pas met een ACL of firewall tussen de VLAN\'s, met standaard weigeren, wordt het camera-VLAN een zone.' },
      ],
    },

    {
      title: 'Taak 3: Firewalllogs lezen, en wat een IDS en een IPS doen',
      tryFirst: true,
      intro: '<p>Na de opschoning van taak 1 eindigt de regelset van Hoogland met een gelogde regel 99: deny any any. In het lab staan de firewalllogs van afgelopen nacht, met daartussen de meldingen van het netwerk-IDS achter de reverse proxy. Er is iets misgegaan. Zoek welk systeem is overgenomen, door wie, en welke weg naar binnen nog openstaat.</p>',
      content: `
        <h3>Firewalllogs</h3>
        <p>Een firewalllog vertelt per verbinding: tijd, actie (allow of deny), protocol, bron en bestemming met poort, en
        welke regel besliste. Waar je op let:</p>
        <ul>
          <li><strong>Veel deny's van één interne bron</strong> naar veel adressen of poorten. Dat is een systeem dat
          probeert te ontdekken wat er bereikbaar is: een scan. Komt die bron uit een zone die normaal niets naar binnen
          doet, dan is dat een sterk signaal dat het systeem is overgenomen.</li>
          <li><strong>Allow's die je niet verwacht</strong>: een server die naar internet gaat terwijl dat nooit nodig is,
          of een verbinding die via een te ruime regel binnenkomt.</li>
          <li><strong>Treffers op de laatste deny-regel</strong>: alles wat daar terechtkomt, had niemand voorzien.</li>
        </ul>
        <p>Let op: een deny laat zien wat <em>niet</em> lukte. Het gevaar zit vaak in de verbinding die tussen de deny's
        door wél slaagde.</p>
        <h3>IDS en IPS</h3>
        <p>Een <strong>IDS</strong> (<em>intrusion detection system</em>) bekijkt verkeer en meldt verdachte patronen. Een
        <strong>IPS</strong> (<em>intrusion prevention system</em>) staat in het verkeerspad (<em>inline</em>) en kan
        verkeer ook tegenhouden. Een netwerk-IDS krijgt een kopie van het verkeer via een spiegelpoort op de switch
        (SPAN) of een netwerktap, en kan dus niets blokkeren. Bekende open-source-engines zijn Suricata en Snort.</p>
        <table>
          <thead><tr><th></th><th>IDS</th><th>IPS</th></tr></thead>
          <tbody>
            <tr><td>Plaats</td><td>Naast het verkeer (kopie)</td><td>In het verkeer</td></tr>
            <tr><td>Bij een melding</td><td>Alarm naar SOC of SIEM</td><td>Alarm én het verkeer droppen</td></tr>
            <tr><td>Risico</td><td>Aanval slaagt terwijl iemand de melding nog moet lezen</td><td>Vals-positief blokkeert legitiem verkeer</td></tr>
          </tbody>
        </table>
        <p>Detectie gebeurt op twee manieren. <strong>Op signatuur</strong>: een regel beschrijft een bekend patroon,
        bijvoorbeeld een stuk SQL in een HTTP-parameter. Weinig vals alarm, maar niets nieuws. <strong>Op
        afwijking</strong>: het systeem leert wat normaal is en meldt wat ervan afwijkt. Ziet nieuwe dingen, maar met
        meer vals alarm. Naast netwerk-IDS bestaat <strong>host-IDS</strong> (HIDS), dat op het systeem zelf naar
        bestanden, processen en logs kijkt.</p>
        <h3>Versleuteling en zicht</h3>
        <p>Een IDS dat versleuteld HTTPS-verkeer ziet, kan de inhoud niet lezen. Daarom staat het bij Hoogland
        <em>achter</em> de reverse proxy, waar TLS al is afgehaald. Het echte bronadres van de bezoeker staat dan in de
        header X-Forwarded-For, omdat de verbinding zelf van de proxy komt.</p>
      `,
      lab: {
        type: 'logs',
        title: 'fw01_ids01_2026-11-10.log',
        lines: `2026-11-10 01:52:40 FW01 ALLOW tcp 10.10.10.31:52211 -> 198.51.100.20:443 regel=5
2026-11-10 01:58:12 FW01 ALLOW tcp 198.51.100.77:40122 -> 192.168.100.5:443 regel=1 (reverse proxy)
2026-11-10 01:58:13 IDS01 ALERT sid=2100011 prio=1 "SQL-injectie in HTTP-parameter (UNION SELECT)" xff=198.51.100.77 192.168.100.5 -> 192.168.100.10:8080 actie=alleen-melden
2026-11-10 01:58:40 IDS01 ALERT sid=2100011 prio=1 "SQL-injectie in HTTP-parameter (UNION SELECT)" xff=198.51.100.77 192.168.100.5 -> 192.168.100.10:8080 actie=alleen-melden
2026-11-10 01:59:02 FW01 DENY  tcp 10.10.30.44:50110 -> 10.10.20.25:445 regel=8
2026-11-10 02:01:17 IDS01 ALERT sid=2100204 prio=1 "Webapplicatie voert systeemcommando uit (cmd= in parameter)" xff=198.51.100.77 192.168.100.5 -> 192.168.100.10:8080 actie=alleen-melden
2026-11-10 02:03:44 FW01 ALLOW tcp 192.168.100.10:48810 -> 203.0.113.200:80 regel=14 (DMZ updates naar internet)
2026-11-10 02:03:45 IDS01 ALERT sid=2100377 prio=2 "Download van ELF-bestand over HTTP" 192.168.100.10 -> 203.0.113.200:80 actie=alleen-melden
2026-11-10 02:06:10 FW01 ALLOW tcp 10.10.10.18:61002 -> 10.10.20.25:445 regel=6b
2026-11-10 02:11:02 FW01 DENY  tcp 192.168.100.10:39001 -> 10.10.20.25:21 regel=99
2026-11-10 02:11:02 FW01 DENY  tcp 192.168.100.10:39002 -> 10.10.20.25:22 regel=99
2026-11-10 02:11:03 FW01 DENY  tcp 192.168.100.10:39003 -> 10.10.20.25:139 regel=99
2026-11-10 02:11:03 FW01 DENY  tcp 192.168.100.10:39004 -> 10.10.20.25:445 regel=99
2026-11-10 02:11:03 FW01 DENY  tcp 192.168.100.10:39005 -> 10.10.20.25:1433 regel=99
2026-11-10 02:11:04 FW01 DENY  tcp 192.168.100.10:39006 -> 10.10.20.25:3389 regel=99
2026-11-10 02:11:04 FW01 DENY  tcp 192.168.100.10:39007 -> 10.10.20.25:5985 regel=99
2026-11-10 02:11:20 FW01 DENY  tcp 192.168.100.10:39020 -> 10.10.20.10:389 regel=99
2026-11-10 02:11:20 FW01 DENY  tcp 192.168.100.10:39021 -> 10.10.20.10:445 regel=99
2026-11-10 02:11:21 FW01 DENY  tcp 192.168.100.10:39022 -> 10.10.20.10:88 regel=99
2026-11-10 02:11:40 FW01 DENY  tcp 192.168.100.10:39040 -> 10.10.20.30:22 regel=99
2026-11-10 02:11:40 FW01 ALLOW tcp 192.168.100.10:39041 -> 10.10.20.30:5432 regel=4
2026-11-10 02:11:41 FW01 DENY  tcp 192.168.100.10:39042 -> 10.10.20.30:3389 regel=99
2026-11-10 02:12:05 FW01 DENY  tcp 192.168.100.10:39060 -> 10.10.10.0/24 sweep icmp regel=99 (254 pogingen)
2026-11-10 02:14:30 FW01 ALLOW tcp 192.168.100.10:39101 -> 10.10.20.30:5432 regel=4
2026-11-10 02:14:31 IDS01 ALERT sid=2100512 prio=2 "PostgreSQL: COPY TO PROGRAM in query" 192.168.100.10 -> 10.10.20.30:5432 actie=alleen-melden
2026-11-10 02:20:15 FW01 ALLOW udp 10.10.20.10:53001 -> 198.51.100.53:53 regel=11
2026-11-10 02:31:48 FW01 ALLOW tcp 10.10.10.31:52240 -> 198.51.100.20:443 regel=5`,
      },
      questions: [
        { q: 'Welk systeem in de DMZ is overgenomen en probeert nu het interne netwerk te verkennen? (IP-adres)', answer: ['192.168.100.10', 'web01'],
          hints: ['Zoek een bron met veel deny\'s achter elkaar.', 'Filter op regel=99.', 'Het is het systeem waar de SQL-injecties op gericht waren.'],
          wrong: { '10.10.30.44': 'Dat gastapparaat probeert één keer SMB en wordt door regel 8 tegengehouden. Geen reeks, geen patroon.', '198.51.100.77': 'Dat is de aanvaller op internet. Gevraagd is het systeem in de DMZ dat hij heeft overgenomen.', '192.168.100.5': 'De reverse proxy geeft het verkeer door, maar de scans komen niet van de proxy.' },
          explain: 'web01 (192.168.100.10) probeert binnen een minuut tientallen poorten op drie servers en een sweep van het kantoornetwerk. Een webserver doet dat nooit uit zichzelf.' },
        { q: 'Vanaf welk adres op internet werd web01 aangevallen?', answer: ['198.51.100.77'],
          hints: ['De firewall ziet alleen de reverse proxy als bron naar web01.', 'Kijk in de IDS-meldingen naar het veld xff.', 'Het adres komt drie keer voor bij meldingen met prio=1.'],
          wrong: { '192.168.100.5': 'Dat is de reverse proxy. Het echte bronadres staat in X-Forwarded-For.', '203.0.113.200': 'Daar haalde web01 na de inbraak een bestand op. Dat is waarschijnlijk infrastructuur van de aanvaller, maar niet het adres waarvandaan de aanval kwam.' },
          explain: '198.51.100.77: eerst SQL-injectie, daarna het uitvoeren van een systeemcommando, daarna haalt web01 een ELF-bestand op bij 203.0.113.200.' },
        { q: 'Welke firewallregel geeft de aanvaller op dit moment nog een weg naar het servernetwerk? (nummer)', answer: ['4', 'regel 4'],
          hints: ['Zoek tussen de deny\'s naar een ALLOW met web01 als bron.', 'Het gaat om een verbinding naar 10.10.20.30.', 'Kijk welk regelnummer bij die ALLOW staat, en wat het IDS twee minuten later meldt.'],
          wrong: { '99': 'Regel 99 weigert. Die houdt de scans juist tegen.', '14': 'Regel 14 laat web01 naar internet. Dat is een probleem (een DMZ-server hoort niet vrij te downloaden), maar het is geen weg naar het servernetwerk.' },
          why: 'Segmentatie houdt een aanvaller tegen op elke poort behalve de poort die je openzet. Die ene toegestane verbinding wordt daarom het doelwit. Bescherm wat erachter zit met eigen maatregelen: een databaseaccount met minimale rechten en monitoring.',
          explain: 'Regel 4 staat web01 naar db01 op 5432 toe. Het IDS ziet daarna een poging om via de database een programma te starten. Isoleer web01, controleer db01 en beperk het databaseaccount van de webshop.' },
        { q: 'Alle IDS-meldingen hadden actie=alleen-melden. Wat had de SQL-injectie automatisch kunnen tegenhouden?', options: ['Dezelfde signaturen in een IPS die inline staat, of in een WAF voor de webshop', 'Het IDS met een spiegelpoort op een snellere switch', 'Een strengere regel 99', 'Een host-IDS op de reverse proxy'], answer: 0,
          wrong: { 1: 'Een IDS op een spiegelpoort ziet een kopie van het verkeer. Hoe snel ook, het kan niets tegenhouden.', 2: 'De SQL-injectie kwam binnen via regel 1, op poort 443, die open moet zijn voor de webshop. Regel 99 komt daar niet aan te pas.', 3: 'Een HIDS op de proxy ziet wat er op de proxy gebeurt. De aanval was gericht op de webshop erachter.' },
          explain: 'Pas inline kun je blokkeren. Begin met de signaturen die weinig vals alarm geven, en houd in de gaten wat er geblokkeerd wordt: een IPS die een legitieme bestelling tegenhoudt, is ook een storing.' },
      ],
    },

    {
      title: 'Taak 4: VPN, site-to-site en remote access',
      tryFirst: true,
      intro: '<p>Hoogland opent een tweede magazijn in Venlo en heeft veertig verkopers die vaak onderweg zijn. Jij bent de netwerkarchitect. Maak in het lab vijf keuzes over hoe die mensen en locaties veilig met het hoofdkantoor verbinden.</p>',
      content: `
        <p>Een <strong>VPN</strong> (<em>virtual private network</em>) maakt een versleutelde tunnel over een onbetrouwbaar
        netwerk, meestal internet. Er zijn twee toepassingen.</p>
        <h3>Site-to-site</h3>
        <p>Twee vaste locaties worden permanent verbonden, meestal tussen twee firewalls of routers. Gebruikers merken er
        niets van: voor hen lijkt het één netwerk. De gangbare techniek is <strong>IPsec</strong> (architectuur in
        RFC 4301) met <strong>IKEv2</strong> (RFC 7296) om sleutels af te spreken. Binnen IPsec zorgt
        <strong>ESP</strong> voor versleuteling en integriteit. In <em>tunnelmodus</em> wordt het hele oorspronkelijke
        pakket ingepakt; dat is wat je bij site-to-site gebruikt. De twee kanten bewijzen wie ze zijn met certificaten
        of met een vooraf gedeelde sleutel (PSK). Een PSK moet dan lang en willekeurig zijn: wie de IKE-uitwisseling
        kan opvangen, kan bij sommige configuraties offline wachtwoorden proberen.</p>
        <h3>Remote access</h3>
        <p>Een losse gebruiker verbindt vanaf een laptop met een VPN-gateway. Dat kan met IPsec/IKEv2, met een VPN op
        basis van TLS, of met WireGuard. Belangrijke keuzes:</p>
        <ul>
          <li><strong>Authenticatie:</strong> altijd met MFA, liefst gecombineerd met een certificaat op een beheerd
          apparaat. Een VPN met alleen een wachtwoord is een voordeur met een hangslot van de bouwmarkt.</li>
          <li><strong>Wat je daarna mag:</strong> een VPN-gebruiker hoort niet in het hele interne netwerk te landen.
          Wijs per groep toe welke systemen bereikbaar zijn, met firewallregels achter de gateway.</li>
          <li><strong>Full tunnel of split tunnel:</strong> bij een full tunnel gaat al het verkeer via het kantoor en
          zijn filtering. Bij split tunneling gaat alleen het bedrijfsverkeer door de tunnel en de rest rechtstreeks naar
          internet. Dat is sneller, maar dan moet het apparaat zelf goed beveiligd zijn.</li>
        </ul>
        <h3>De VPN-gateway is een doelwit</h3>
        <p>Een VPN-gateway staat per definitie open naar internet en geeft na aanmelding toegang tot het interne
        netwerk. Kwetsbaarheden in VPN-producten van grote leveranciers zijn de afgelopen jaren herhaaldelijk op grote
        schaal misbruikt, vaak binnen dagen na publicatie. Ze staan geregeld in de catalogus van actief misbruikte
        kwetsbaarheden (KEV) van het Amerikaanse CISA. Behandel updates voor de gateway daarom als spoed, en kijk na een
        kritieke kwetsbaarheid ook in de logs of er al misbruik is geweest: patchen sluit de deur, maar haalt niemand
        naar buiten die al binnen is.</p>
        <div class="callout info"><strong>Alternatief:</strong> steeds meer organisaties vervangen remote access VPN
        door toegang per applicatie volgens Zero Trust (ZTNA): de gebruiker komt niet "op het netwerk", maar krijgt per
        verzoek toegang tot één applicatie.</div>
      `,
      lab: {
        type: 'scenario',
        title: 'Venlo en de verkopers',
        scenario: 'Hoogland Logistiek (fictief) opent een magazijn in Venlo met handscanners, een printer en twee werkplekken die het ERP op het hoofdkantoor nodig hebben. Daarnaast werken veertig verkopers met een beheerde laptop vanuit huis en bij klanten. Zij hebben het CRM en de mail nodig.',
        pass: 5,
        flag: 'NM{tunnel_is_geen_vrijbrief}',
        steps: [
          { situation: 'Hoe verbind je het magazijn in Venlo met het hoofdkantoor?', choices: [
            { label: 'Een site-to-site IPsec-tunnel (IKEv2) tussen de firewall in Venlo en die op het hoofdkantoor', good: true, feedback: 'Eén permanente, beheerde verbinding tussen twee firewalls, met regels aan beide kanten.' },
            { label: 'Op elke handscanner en werkplek een VPN-client installeren', good: false, feedback: 'Handscanners ondersteunen dat vaak niet, en je krijgt tientallen losse tunnels om te beheren. Voor een vaste locatie is site-to-site de bedoeling.' },
            { label: 'Het ERP via een publieke poort bereikbaar maken voor het IP-adres van Venlo', good: false, feedback: 'Dan gaat ERP-verkeer onversleuteld of met een eigen oplossing over internet, en hangt je beveiliging aan één IP-adres dat kan veranderen.' },
          ] },
          { situation: 'De leverancier stelt voor de tunnel te beveiligen met de gedeelde sleutel "Hoogland2026!".', choices: [
            { label: 'Akkoord, er staat een hoofdletter, een cijfer en een leesteken in', good: false, feedback: 'Een korte, voorspelbare sleutel kan bij sommige IKE-configuraties offline worden geraden. Complexiteitsregels maken een voorspelbaar wachtwoord niet sterk.' },
            { label: 'Certificaten van de eigen interne CA voor beide firewalls, of anders een lange willekeurige sleutel uit een kluis', good: true, feedback: 'Certificaten kun je intrekken en per kant beheren. Een willekeurige sleutel van 30 tekens of meer is het minimum als het toch een PSK wordt.' },
          ] },
          { situation: 'Hoe melden de verkopers zich aan op de remote access VPN?', choices: [
            { label: 'Gebruikersnaam en wachtwoord, net als op kantoor', good: false, feedback: 'Een VPN met alleen een wachtwoord is een van de bekendste ingangen bij ransomware-incidenten. Gestolen of geraden wachtwoorden zijn genoeg.' },
            { label: 'MFA plus een apparaatcertificaat, zodat alleen beheerde laptops verbinden', good: true, feedback: 'Wie een wachtwoord steelt, heeft dan nog geen tweede factor en geen beheerde laptop.' },
          ] },
          { situation: 'Een verkoper is verbonden. Wat kan hij bereiken?', choices: [
            { label: 'Het hele interne netwerk, net als op kantoor', good: false, feedback: 'Dan geeft één gestolen laptop met een open sessie toegang tot alles, ook tot beheerinterfaces en de database.' },
            { label: 'Alleen het CRM en de mail, via regels per groep achter de gateway', good: true, feedback: 'Least privilege op netwerkniveau. Zo blijft een overgenomen verkoperslaptop een klein incident.' },
          ] },
          { situation: 'De leverancier van de VPN-gateway publiceert een kritieke kwetsbaarheid die al actief wordt misbruikt. Het reguliere onderhoudsvenster is over drie weken.', choices: [
            { label: 'Wachten tot het onderhoudsvenster, zodat de verkopers geen hinder hebben', good: false, feedback: 'Bij actief misbruik van een gateway die aan internet hangt, zijn drie weken een eeuwigheid.' },
            { label: 'Vandaag buiten kantoortijd bijwerken én de logs van de gateway nalopen op tekenen van misbruik van vóór de update', good: true, feedback: 'Bijwerken sluit het gat. De logs vertellen of iemand er al doorheen is gegaan.' },
          ] },
        ],
      },
      questions: [
        { q: 'Maak alle vijf keuzes goed. Welke vlag krijg je?', answer: ['NM{tunnel_is_geen_vrijbrief}'],
          hints: ['Bij elke stap is één keuze goed. Lees de feedback bij een foute keuze.', 'Denk aan sterke authenticatie, least privilege en de gateway als doelwit.', 'Je hebt vijf van de vijf nodig.'],
          explain: 'Een VPN versleutelt de weg, maar zegt niets over wie er mag rijden en waar naartoe. Dat regel je met authenticatie, regels achter de gateway en onderhoud.' },
        { q: 'Een verkopersfirma vraagt waarom de verkopers niet het hele netwerk krijgen, "want ze zijn toch al via de VPN geauthenticeerd". Wat is het beste antwoord?', options: ['Authenticatie zegt wie je bent, niet wat je nodig hebt; een overgenomen laptop krijgt anders alles wat de verkoper ook kan bereiken', 'Omdat de tunnel anders te veel bandbreedte gebruikt', 'Omdat IPsec maar een beperkt aantal subnetten kan doorgeven', 'Omdat het hele netwerk alleen via een site-to-site-tunnel bereikbaar mag zijn'], answer: 0,
          wrong: { 1: 'Bandbreedte is geen beveiligingsargument, en het aantal bereikbare systemen zegt weinig over het verkeer.', 2: 'Dat is geen echte beperking die hier speelt, en het zou ook geen reden zijn om rechten te beperken.', 3: 'Het type tunnel bepaalt niet wat iemand mag. Dat doen de regels erachter.' },
          explain: 'Authenticatie en autorisatie zijn twee verschillende vragen, ook op het netwerk. Least privilege beperkt wat een aanvaller met een gestolen sessie kan.' },
      ],
    },

    {
      title: 'Taak 5: Netwerktoegang met IEEE 802.1X en NAC',
      tryFirst: true,
      intro: '<p>Bij Hoogland mag een apparaat pas op het bedrijfsnetwerk als de switch het heeft laten controleren door de NAC-server. In het lab staat het log van die server van gisteren. Iemand heeft een apparaat aangesloten in een vergaderruimte en is binnengekomen. Zoek uit hoe, en waar.</p>',
      content: `
        <p>Een netwerkaansluiting in een vergaderruimte of een open wifi-netwerk is een deur. <strong>Network access
        control</strong> (NAC) zorgt dat er pas verkeer doorgaat als het apparaat (en soms de gebruiker) bekend is en
        aan het beleid voldoet. De standaard daaronder is <strong>IEEE 802.1X</strong>: poortgebaseerde
        toegangscontrole.</p>
        <h3>Drie rollen</h3>
        <ul>
          <li>De <strong>supplicant</strong>: software op het apparaat dat toegang vraagt.</li>
          <li>De <strong>authenticator</strong>: de switch of het access point. Die laat tot de controle alleen
          aanmeldverkeer door.</li>
          <li>De <strong>authentication server</strong>: meestal een RADIUS-server (RFC 2865) die beslist:
          Access-Accept of Access-Reject. Bij een accept kan hij ook een VLAN meegeven, zodat het apparaat meteen in de
          juiste zone landt.</li>
        </ul>
        <p>Het eigenlijke bewijs gaat via <strong>EAP</strong> (RFC 3748). Twee methoden kom je vaak tegen:</p>
        <ul>
          <li><strong>EAP-TLS</strong>: apparaat en server hebben allebei een certificaat. Sterk, geen wachtwoorden, wel
          een PKI nodig (zie de room <em>TLS en PKI in de praktijk</em>).</li>
          <li><strong>PEAP met MSCHAPv2</strong>: de gebruiker meldt zich aan met gebruikersnaam en wachtwoord, in een
          TLS-tunnel naar de server. Dit is alleen veilig als het apparaat het certificaat van de server controleert.
          Doet het dat niet, dan geeft het zijn aanmeldgegevens aan elke server die zich voordoet als de echte.</li>
        </ul>
        <h3>Apparaten zonder 802.1X</h3>
        <p>Printers, camera's en oudere apparaten hebben vaak geen supplicant. Voor die apparaten gebruiken switches
        <strong>MAC Authentication Bypass</strong> (MAB): de switch stuurt het MAC-adres naar de RADIUS-server, en als dat
        op de lijst staat, mag het apparaat erin. Een MAC-adres is geen geheim: het staat op een sticker en is met elke
        netwerkkaart na te bootsen. MAB is dus een zwak punt. Beperk het zo:</p>
        <ul>
          <li>Geef MAB-apparaten een eigen VLAN met alleen de bestemmingen die ze nodig hebben (een printer hoeft niet bij
          de domeincontroller).</li>
          <li>Gebruik <strong>profilering</strong>: de NAC kijkt naar kenmerken zoals de manier waarop het apparaat een
          IP-adres vraagt, en vergelijkt dat met wat er bij het MAC-adres hoort.</li>
          <li>Let op een bekend MAC-adres dat op een andere poort of switch opduikt dan gewoonlijk.</li>
        </ul>
        <p>NAC kan ook de staat van het apparaat controleren (<em>posture</em>): is het beheerd, zijn de updates
        bijgewerkt? Wie niet voldoet, komt in een quarantaine-VLAN waar hij alleen bij de updateserver kan.</p>
      `,
      lab: {
        type: 'logs',
        title: 'nac01_radius_2026-11-11.log',
        lines: `2026-11-11 07:58:03 NAC01 Access-Accept switch=sw-kantoor-1  poort=Gi1/0/5  methode=EAP-TLS identiteit=host/WS-0412.hoogland.nm.lab vlan=10
2026-11-11 08:01:12 NAC01 Access-Accept switch=sw-kantoor-1  poort=Gi1/0/9  methode=EAP-TLS identiteit=host/WS-0388.hoogland.nm.lab vlan=10
2026-11-11 08:03:40 NAC01 Access-Accept switch=sw-kantoor-2  poort=Gi1/0/22 methode=MAB     mac=00:1b:2c:44:10:9e profiel=printer (HP-JetDirect) vlan=60
2026-11-11 08:05:17 NAC01 Access-Reject switch=sw-kantoor-2  poort=Gi1/0/14 methode=EAP-TLS identiteit=host/LAPTOP-PRIVE reden=certificaat-niet-uitgegeven-door-interne-CA
2026-11-11 08:12:55 NAC01 Access-Accept switch=sw-magazijn-1 poort=Gi1/0/30 methode=MAB     mac=00:0e:8e:71:aa:02 profiel=ip-camera vlan=70
2026-11-11 08:20:31 NAC01 Access-Accept switch=sw-kantoor-1  poort=Gi1/0/12 methode=EAP-TLS identiteit=host/WS-0450.hoogland.nm.lab vlan=10
2026-11-11 09:44:09 NAC01 Access-Reject switch=sw-vergader-1 poort=Gi1/0/3  methode=EAP-TLS identiteit=host/DESKTOP-7QK2L reden=certificaat-niet-uitgegeven-door-interne-CA
2026-11-11 09:44:40 NAC01 Access-Reject switch=sw-vergader-1 poort=Gi1/0/3  methode=MAB     mac=d4:3b:04:9a:61:7c reden=onbekend-mac
2026-11-11 10:15:22 NAC01 Access-Accept switch=sw-kantoor-2  poort=Gi1/0/7  methode=EAP-TLS identiteit=host/WS-0402.hoogland.nm.lab vlan=10
2026-11-11 12:31:05 sw-kantoor-2 Gi1/0/22 link down
2026-11-11 12:33:48 NAC01 Access-Accept switch=sw-vergader-1 poort=Gi1/0/3  methode=MAB     mac=00:1b:2c:44:10:9e profiel=printer (HP-JetDirect) vlan=60
2026-11-11 12:34:02 NAC01 PROFIEL-AFWIJKING mac=00:1b:2c:44:10:9e verwacht=printer waargenomen=Windows-werkplek (DHCP-kenmerken) actie=alleen-melden
2026-11-11 12:58:19 NAC01 Access-Accept switch=sw-kantoor-1  poort=Gi1/0/5  methode=EAP-TLS identiteit=host/WS-0412.hoogland.nm.lab vlan=10
2026-11-11 13:40:11 NAC01 Access-Reject switch=sw-kantoor-1  poort=Gi1/0/18 methode=EAP-TLS identiteit=host/WS-0299.hoogland.nm.lab reden=certificaat-ingetrokken
2026-11-11 14:02:47 NAC01 Access-Accept switch=sw-magazijn-1 poort=Gi1/0/31 methode=MAB     mac=00:0e:8e:71:aa:07 profiel=ip-camera vlan=70`,
      },
      questions: [
        { q: 'Op welke switch kwam het apparaat binnen door zich voor te doen als de printer?', answer: ['sw-vergader-1'],
          hints: ['Zoek het MAC-adres van de printer en kijk waar het overal opduikt.', 'Filter op 00:1b:2c:44:10:9e.', 'Kort nadat de echte printerpoort down ging, verschijnt het MAC-adres op een andere switch.'],
          wrong: { 'sw-kantoor-2': 'Daar hangt de echte printer, op Gi1/0/22. Om 12:31 gaat die poort down: iemand heeft de printer losgekoppeld.', 'sw-kantoor-1': 'Op sw-kantoor-1 melden alleen beheerde werkplekken zich aan met EAP-TLS.' },
          why: 'MAB vertrouwt op een kenmerk dat iedereen kan aflezen en nabootsen. Wie de printer kan loskoppelen, kan zijn plek innemen. Profilering en het opmerken van een "verhuisd" MAC-adres zijn de detectiemaatregelen.',
          explain: 'Om 09:44 lukt het op sw-vergader-1 poort Gi1/0/3 niet met een eigen certificaat en niet met een eigen MAC. Om 12:31 gaat de printerpoort down, om 12:33 meldt het printer-MAC zich aan op de vergaderruimte, en de profilering ziet een Windows-werkplek.' },
        { q: 'Hoeveel aanmeldpogingen met EAP-TLS werden geweigerd?', answer: ['3', 'drie'],
          hints: ['Filter op Access-Reject.', 'Let op de methode: niet elke weigering is EAP-TLS.', 'Twee keer een certificaat van buiten de interne CA, één keer een ingetrokken certificaat.'],
          wrong: { '4': 'Je telt ook de MAB-weigering mee. Gevraagd zijn de EAP-TLS-pogingen.', '2': 'Ook het ingetrokken certificaat van WS-0299 telt mee.' },
          explain: 'LAPTOP-PRIVE, DESKTOP-7QK2L en WS-0299. Bij die laatste werkt de PKI zoals bedoeld: een ingetrokken certificaat komt er niet meer in.' },
        { q: 'In welk VLAN is de indringer terechtgekomen?', answer: ['60', 'vlan 60', 'vlan=60'],
          hints: ['Kijk naar de Access-Accept om 12:33.', 'De RADIUS-server geeft een VLAN mee.', 'Het is het VLAN voor printers.'],
          wrong: { '10': 'VLAN 10 is het kantoornetwerk. Daar kom je alleen in met een certificaat van de interne CA.', '70': 'VLAN 70 is voor de camera\'s in het magazijn.' },
          explain: 'VLAN 60, het printer-VLAN. Hoeveel schade de indringer kan doen, hangt nu af van de regels tussen VLAN 60 en de rest. Die horen alleen printverkeer van de printserver toe te laten.' },
      ],
    },

    {
      title: 'Taak 6: Zakelijke wifi doorlichten',
      tryFirst: true,
      intro: '<p>Hoogland heeft een draadloze scan laten maken op het hoofdkantoor, met daarnaast de lijst van eigen access points. Beoordeel elk netwerk dat je ziet: hoort het bij Hoogland, hoe is het beveiligd, en in welk VLAN komt een apparaat dat verbindt? Houd de regelset van taak 1 erbij.</p>',
      content: `
        <h3>WPA2 en WPA3</h3>
        <p><strong>WPA2</strong> is gebaseerd op IEEE 802.11i en versleutelt met AES (CCMP). <strong>WPA3</strong> is in
        2018 door de Wi-Fi Alliance geïntroduceerd. De belangrijkste verschillen:</p>
        <ul>
          <li><strong>WPA3-Personal</strong> vervangt de aanmelding met een gedeelde sleutel door <strong>SAE</strong>
          (<em>Simultaneous Authentication of Equals</em>). Bij WPA2-Personal kan iemand die een aanmelding opvangt, daarna
          offline wachtwoorden blijven proberen. SAE maakt dat offline raden onmogelijk: elke gok vraagt een nieuwe
          poging bij het access point. SAE geeft ook forward secrecy.</li>
          <li><strong>Protected Management Frames</strong> (PMF, IEEE 802.11w) zijn bij WPA3 verplicht. Ze beschermen
          beheerberichten, zoals het bericht dat een apparaat van het netwerk afmeldt, tegen vervalsing.</li>
          <li><strong>WPA3-Enterprise</strong> kent een optionele 192-bitsmodus voor omgevingen met hoge eisen.</li>
        </ul>
        <p>Veel netwerken draaien in een <em>overgangsmodus</em> (WPA2 en WPA3 naast elkaar) zodat oudere apparaten
        kunnen blijven verbinden. Dat is een tijdelijke oplossing: zolang WPA2 wordt aangeboden, gelden ook de zwaktes
        van WPA2.</p>
        <h3>Personal of Enterprise</h3>
        <p><strong>Personal</strong> betekent: één wachtwoord voor iedereen. Wie vertrekt, kent het nog. Wie het deelt,
        deelt het met iedereen. Veranderen betekent: elk apparaat opnieuw instellen, en daarom gebeurt het zelden.
        <strong>Enterprise</strong> betekent: aanmelden per gebruiker of apparaat via IEEE 802.1X en RADIUS, zoals in taak
        5. Een vertrekkende medewerker of een gestolen laptop zet je uit zonder dat de rest er iets van merkt, en elk
        apparaat kan zijn eigen VLAN krijgen. Voor een organisatie is Enterprise de norm.</p>
        <h3>Gastnetwerk</h3>
        <ul>
          <li>Een eigen SSID, in een eigen VLAN dat alleen naar internet mag (zie taak 1: de volgorde van de regels
          telt).</li>
          <li><strong>Client-isolatie</strong> aan, zodat gasten elkaar niet kunnen bereiken.</li>
          <li><strong>OWE</strong> (<em>Opportunistic Wireless Encryption</em>, RFC 8110, door de Wi-Fi Alliance
          "Enhanced Open" genoemd) versleutelt een open netwerk zonder wachtwoord per apparaat. Het bewijst niet wie het
          access point is, maar meekijken wordt een stuk lastiger.</li>
        </ul>
        <h3>Nep-access points opmerken</h3>
        <p>Een access point dat de naam (SSID) van je bedrijfsnetwerk uitzendt maar niet van jou is, heet een
        <strong>rogue access point</strong> of <em>evil twin</em>. De naam van een netwerk is niet beschermd: iedereen kan
        hem uitzenden. Wat wel uniek is, is het hardware-adres van het access point, de <strong>BSSID</strong>. Een
        draadloos IDS (WIDS) vergelijkt de BSSID's die het ziet met de lijst van eigen access points en meldt
        afwijkingen. Of een nep-AP schade doet, hangt af van de aanmeldmethode: bij EAP-TLS of PEAP met
        servercertificaatcontrole verbinden de bedrijfsapparaten er niet mee, bij een gedeeld wachtwoord kan het
        gevaarlijk zijn.</p>
      `,
      lab: {
        type: 'logs',
        title: 'wifi-scan-hoogland-2026-11-12.txt',
        lines: `# EIGEN ACCESS POINTS (inventaris)
AP-KANTOOR-01  bssid-reeks=f0:9f:c2:10:00:xx  locatie=kantoor begane grond
AP-KANTOOR-02  bssid-reeks=f0:9f:c2:10:01:xx  locatie=kantoor eerste verdieping
AP-MAGAZIJN-01 bssid-reeks=f0:9f:c2:10:02:xx  locatie=magazijn
# DRAADLOZE SCAN (WIDS) 2026-11-12 09:30
ssid=Hoogland-Kantoor   bssid=f0:9f:c2:10:00:11 beveiliging=WPA3-Enterprise (802.1X, EAP-TLS)  pmf=verplicht  vlan=10  kanaal=36
ssid=Hoogland-Kantoor   bssid=f0:9f:c2:10:01:11 beveiliging=WPA3-Enterprise (802.1X, EAP-TLS)  pmf=verplicht  vlan=10  kanaal=100
ssid=Hoogland-Gast      bssid=f0:9f:c2:10:00:12 beveiliging=OWE (Enhanced Open)  client-isolatie=aan  vlan=30  kanaal=36
ssid=Hoogland-Gast      bssid=f0:9f:c2:10:01:12 beveiliging=OWE (Enhanced Open)  client-isolatie=aan  vlan=30  kanaal=100
ssid=Hoogland-Directie  bssid=f0:9f:c2:10:01:13 beveiliging=WPA2-Personal (PSK)  pmf=optioneel  vlan=10  psk-gewijzigd=2024-01-15  kanaal=100
ssid=Hoogland-Scanners  bssid=f0:9f:c2:10:02:14 beveiliging=WPA2-Personal (PSK)  pmf=uit  vlan=20  psk-gewijzigd=2021-03-02  kanaal=6  clients=118
ssid=Hoogland-Kantoor   bssid=3a:41:7e:90:5c:02 beveiliging=WPA2-Personal (PSK)  pmf=uit  vlan=?  kanaal=6  signaal=sterk bij vergaderruimte 2
ssid=Bakkerij-Smit      bssid=6c:5a:b0:22:31:40 beveiliging=WPA3-Personal (SAE)  kanaal=11  signaal=zwak (buren)
ssid=DIRECT-7f-Printer  bssid=02:1b:2c:44:10:9e beveiliging=WPA2-Personal (PSK)  kanaal=6  signaal=sterk bij kopieerhoek`,
      },
      questions: [
        { q: 'Welke BSSID zendt de naam van het bedrijfsnetwerk uit, maar hoort niet bij Hoogland?', answer: ['3a:41:7e:90:5c:02', '3a417e905c02'],
          hints: ['Vergelijk elke BSSID met de reeksen in de inventaris.', 'Filter op Hoogland-Kantoor.', 'Eén van de drie heeft een heel ander begin en een andere beveiliging.'],
          wrong: { 'f0:9f:c2:10:00:11': 'Die valt in de reeks van AP-KANTOOR-01.', '6c:5a:b0:22:31:40': 'Dat is het netwerk van de buren, met een eigen naam. Niet van Hoogland, maar ook geen nabootsing.' },
          explain: '3a:41:7e:90:5c:02 zendt "Hoogland-Kantoor" uit met WPA2-Personal, staat niet in de inventaris en is sterk bij vergaderruimte 2. Een rogue access point. Opsporen, fysiek verwijderen en nagaan hoe het daar kwam.' },
        { q: 'Maakt dit nep-access point de bedrijfslaptops op Hoogland-Kantoor kwetsbaar?', options: ['Nauwelijks: de laptops gebruiken EAP-TLS en verbinden niet met een netwerk dat geen 802.1X met het juiste servercertificaat aanbiedt', 'Ja: elk apparaat verbindt automatisch met het sterkste signaal met de juiste naam en geeft dan zijn wachtwoord', 'Nee, omdat PMF verplicht is op het nep-access point', 'Ja, omdat WPA3-Enterprise geen versleuteling gebruikt'], answer: 0,
          wrong: { 1: 'Een apparaat dat is ingesteld op WPA3-Enterprise met EAP-TLS, verbindt niet met een netwerk met dezelfde naam maar een andere beveiliging, en het heeft geen wachtwoord om te geven.', 2: 'Op het nep-AP staat PMF juist uit. PMF op de echte access points beschermt de beheerberichten daar.', 3: 'WPA3-Enterprise versleutelt wel, met sleutels die per apparaat via 802.1X worden afgeleid.' },
          explain: 'Het nep-AP biedt WPA2-Personal. De bedrijfslaptops verwachten 802.1X en controleren het servercertificaat. Gasten of medewerkers die met de hand een privételefoon verbinden, lopen wel risico. Daarom verwijder je het toch.' },
        { q: 'Welke beveiliging biedt het gastnetwerk, en waarom is dat voor gasten beter dan een open netwerk?', options: ['OWE: het verkeer per apparaat is versleuteld, ook zonder wachtwoord', 'WPA3-Enterprise: elke gast heeft een eigen account', 'WPA2-Personal: het wachtwoord hangt bij de receptie', 'Geen: client-isolatie vervangt versleuteling'], answer: 0,
          wrong: { 1: 'De scan toont geen Enterprise bij de gasten. Dat zou ook een account per bezoeker vragen.', 2: 'De scan toont geen PSK bij het gastnetwerk.', 3: 'Client-isolatie voorkomt dat gasten elkaar bereiken, maar meekijken in de lucht houdt het niet tegen.' },
          explain: 'OWE (Enhanced Open). Geen wachtwoord, wel versleuteling per apparaat. In combinatie met client-isolatie en VLAN 30 zonder toegang naar intern is dit een nette gastvoorziening.' },
        { q: 'Boss: welk eigen draadloos netwerk van Hoogland moet als eerste worden aangepakt, omdat één oud, gedeeld wachtwoord daar rechtstreeks toegang geeft tot de zone met de domeincontroller en de ERP-database? (SSID)', boss: true, answer: ['Hoogland-Scanners'],
          hints: ['Zoek de netwerken met een gedeeld wachtwoord (PSK) en kijk in welk VLAN ze uitkomen.', 'Welk VLAN-nummer hoort volgens de regelset van taak 1 bij het servernetwerk?', 'Het wachtwoord van dit netwerk is sinds 2021 niet veranderd en er hangen meer dan honderd apparaten aan.'],
          wrong: { 'Hoogland-Directie': 'Ook een gedeeld wachtwoord, maar dit netwerk komt uit in VLAN 10, het kantoornetwerk. Slecht, maar niet in de zone met de servers.', 'Hoogland-Kantoor': 'Het echte Hoogland-Kantoor gebruikt WPA3-Enterprise met EAP-TLS. Het nep-AP met dezelfde naam is niet van Hoogland.', 'DIRECT-7f-Printer': 'Dat is de directe wifi van een printer: uitzetten, maar het komt niet uit in een VLAN met servers.' },
          why: 'Een netwerk voor apparaten die "geen 802.1X kunnen" eindigt opvallend vaak in een VLAN waar het niet hoort, met een wachtwoord dat iedere oud-medewerker en elke leverancier kent. Juist zulke netwerken vind je alleen door scan, VLAN-indeling en regelset naast elkaar te leggen.',
          explain: 'Hoogland-Scanners: WPA2-Personal zonder PMF, wachtwoord uit maart 2021, 118 apparaten, en uitkomend in VLAN 20: het servernetwerk. Wie het wachtwoord kent, staat naast de domeincontroller. Verplaats de scanners naar een eigen VLAN met alleen toegang tot de ERP-dienst die ze nodig hebben, en stap over op 802.1X of ten minste WPA3-Personal met een nieuw, lang wachtwoord.' },
      ],
    },

    {
      title: 'Taak 7: Verdieping: waarom één wifiwachtwoord niet schaalt',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Bij WPA2-Personal leiden alle apparaten hun sleutels af van hetzelfde wachtwoord en de netwerknaam. Daaruit
        volgen drie problemen die niets met de sterkte van de versleuteling te maken hebben.</p>
        <h3>1. Iedereen die het wachtwoord kent, is een insider</h3>
        <p>In WPA2-Personal wordt per verbinding een sessiesleutel afgesproken, maar die is af te leiden uit het gedeelde
        wachtwoord plus waarden die tijdens de aanmelding onversleuteld door de lucht gaan. Wie het wachtwoord kent en een
        aanmelding van een ander apparaat opvangt, kan dat verkeer dus ontsleutelen. Het wachtwoord beschermt tegen
        buitenstaanders, niet tegen de andere mensen die het kennen.</p>
        <h3>2. Offline raden</h3>
        <p>Wie een aanmelding opvangt, heeft genoeg om thuis, zonder verder contact met het netwerk, wachtwoorden te
        proberen. Een kort of voorspelbaar wachtwoord is zo binnen afzienbare tijd te vinden. Bij WPA3-Personal is dat
        niet mogelijk: SAE dwingt elke gok via het access point, en dat merk je en kun je afremmen. SAE geeft bovendien
        forward secrecy: ook wie later het wachtwoord leert, kan eerder opgenomen verkeer niet lezen.</p>
        <h3>3. Wisselen is duur</h3>
        <p>Een gedeeld wachtwoord moet op elk apparaat tegelijk worden veranderd. Bij een paar laptops is dat een
        middag, bij honderd handscanners in een magazijn dat de hele dag draait, is het een project. Daarom gebeurt het
        niet, en kent elke oud-medewerker, uitzendkracht en onderhoudsmonteur van de afgelopen jaren het nog. Dat is in
        de praktijk het grootste risico.</p>
        <h3>Wat dan wel</h3>
        <ul>
          <li>Voor eigen apparaten die het kunnen: WPA3-Enterprise met 802.1X, liefst EAP-TLS met certificaten die via het
          apparaatbeheer worden uitgerold. Intrekken per apparaat, geen gedeeld geheim.</li>
          <li>Voor apparaten die alleen Personal kunnen: WPA3-Personal als de apparaten het ondersteunen, een eigen VLAN met
          strikte regels, en een lang, willekeurig wachtwoord dat via het beheer wordt uitgerold, zodat wisselen geen
          handwerk is. Sommige leveranciers bieden ook een eigen wachtwoord per apparaat op één SSID; hoe dat werkt
          verschilt per product.</li>
          <li>Voor gasten: OWE of een open netwerk met captive portal, altijd in een eigen VLAN met alleen internet.</li>
        </ul>
      `,
      questions: [
        { q: 'Het wachtwoord van Hoogland-Scanners moet worden gewijzigd. Op elke handscanner kost dat met de hand 3 minuten, en er zijn 118 scanners. Hoeveel uur werk is dat, afgerond op een heel uur?', answer: ['6', '6 uur', 'zes'],
          hints: ['Vermenigvuldig het aantal scanners met de minuten per scanner.', '118 keer 3 is 354 minuten.', 'Deel door 60 en rond af.'],
          wrong: { '354': 'Dat zijn minuten. Gevraagd is het aantal uren.', '5': '354 minuten is 5,9 uur. Afgerond is dat 6.' },
          explain: '354 minuten, bijna zes uur, terwijl de scanners eigenlijk de hele dag in gebruik zijn. Met uitrol via apparaatbeheer is het één wijziging.' },
        { q: 'Een oud-medewerker kent het WPA3-Personal-wachtwoord van een netwerk nog en heeft vorige maand verkeer opgenomen, toen hij nog in dienst was. Kan hij dat opgenomen verkeer van collega\'s nu ontsleutelen?', options: ['Nee: SAE geeft per verbinding sleutels met forward secrecy, die niet uit het wachtwoord en de opname zijn af te leiden', 'Ja: wie het wachtwoord kent, kan alles ontsleutelen, net als bij WPA2-Personal', 'Alleen als het netwerk in overgangsmodus stond en de collega\'s via WPA3 verbonden', 'Ja, maar alleen het verkeer van de eerste minuut na elke aanmelding'], answer: 0,
          wrong: { 1: 'Dat geldt voor WPA2-Personal. Bij SAE is de sessiesleutel niet af te leiden uit het wachtwoord plus wat er door de lucht ging.', 2: 'Verbonden de collega\'s via WPA3 met SAE, dan geldt forward secrecy. Het risico in overgangsmodus zit bij apparaten die via WPA2 verbinden.', 3: 'Er is geen venster van een minuut: de sessiesleutel is niet af te leiden.' },
          why: 'Forward secrecy is dezelfde eigenschap als bij TLS met (EC)DHE: een geheim dat later uitlekt, opent het verleden niet.',
          explain: 'SAE gebruikt een sleuteluitwisseling waarbij beide kanten een geheim afleiden dat een meeluisteraar niet kan reconstrueren, ook niet met het wachtwoord.' },
      ],
    },

    {
      title: 'Taak 8: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Security+ en Network+ toetsen netwerkbeveiliging vooral met plaatsingsvragen: welk middel hoort waar, en
        welk middel lost dit probleem op? De afleiders zijn echte beveiligingsmiddelen die op een andere plek of tegen
        een ander probleem helpen. Vraag je steeds af: moet dit verkeer <em>tegenhouden</em> of alleen <em>zien</em>,
        gaat het om <em>wie</em> er op het netwerk komt of om <em>waar</em> hij daarna heen mag?</p>
        <h3>Drie valkuilen</h3>
        <ul>
          <li><strong>IDS en IPS.</strong> Een vraag die "automatisch blokkeren" noemt, gaat over een IPS. Een vraag over
          "zonder invloed op het verkeer" over een IDS.</li>
          <li><strong>Personal en Enterprise.</strong> Zodra er "per gebruiker", "RADIUS" of "intrekken bij vertrek" staat,
          is het Enterprise met 802.1X.</li>
          <li><strong>VLAN en firewall.</strong> Een VLAN scheidt; pas regels ertussen beveiligen.</li>
        </ul>
        <p>Warm op met het lab en maak daarna de vijf vragen. Ze zijn zelf geschreven in examenstijl, alle organisaties zijn
        fictief.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien begrippen in vier groepen van vier.',
        groups: [
          { name: 'Rollen en protocollen bij 802.1X', items: ['Supplicant', 'Authenticator', 'RADIUS', 'EAP-TLS'] },
          { name: 'Wifi-beveiliging', items: ['SAE', 'PMF', 'OWE', 'WPA3-Enterprise'] },
          { name: 'VPN-techniek', items: ['IKEv2', 'ESP', 'Tunnelmodus', 'Split tunneling'] },
          { name: 'Firewallontwerp', items: ['Default deny', 'First match', 'Overschaduwde regel', 'Egress-filtering'] },
        ],
      },
      questions: [
        { q: 'Een fictief ziekenhuis wil dat verdacht netwerkverkeer naar de afdeling radiologie automatisch wordt tegengehouden, niet alleen gemeld. Wat plaatsen ze?',
          options: ['Een netwerk-IDS op een spiegelpoort', 'Een inline IPS tussen de rest van het netwerk en de afdeling', 'Een host-IDS op de werkplekken van radiologie', 'Een SIEM dat de firewalllogs verzamelt'], answer: 1,
          wrong: { 0: 'Een IDS op een spiegelpoort ziet een kopie en kan niets tegenhouden.', 2: 'Een HIDS meldt wat er op de host gebeurt, maar staat niet in het netwerkverkeer.', 3: 'Een SIEM correleert en alarmeert. Blokkeren doet het niet uit zichzelf.' },
          explain: 'Tegenhouden vraagt om een systeem in het verkeerspad: een IPS inline.' },
        { q: 'Een fictief advocatenkantoor gebruikt één wifiwachtwoord voor alle medewerkers. Bij elk vertrek moet het op dertig laptops worden veranderd, en dat gebeurt nooit. Wat lost dit structureel op?',
          options: ['Een langer wachtwoord van 25 tekens', 'WPA3-Enterprise met aanmelding per gebruiker of apparaat via 802.1X en RADIUS', 'De SSID verbergen', 'MAC-filtering op het access point'], answer: 1,
          wrong: { 0: 'Langer helpt tegen raden, maar het blijft één gedeeld geheim dat vertrekkers kennen.', 2: 'Een verborgen SSID is met elke scan te vinden en verandert niets aan het gedeelde wachtwoord.', 3: 'MAC-adressen zijn na te bootsen, en de lijst bijhouden is net zoveel handwerk.' },
          explain: 'Met Enterprise zet je één account of certificaat uit bij vertrek. Niemand anders merkt er iets van.' },
        { q: 'In de regelset van een fictieve gemeente staat regel 4 "werkplekken naar internet: allow any" boven regel 9 "werkplekken naar 203.0.113.66: deny". Toch bereiken werkplekken 203.0.113.66. Wat is de oorzaak?',
          options: ['De firewall is stateless', 'Regel 9 wordt overschaduwd door regel 4, omdat de firewall de eerste passende regel uitvoert', 'Het adres valt in een privéreeks', 'Regel 9 moet als allow worden geschreven'], answer: 1,
          wrong: { 0: 'Ook een stateless firewall leest regels van boven naar beneden. Het probleem zit in de volgorde.', 2: '203.0.113.0/24 is een documentatiereeks, geen privéreeks, en dat maakt voor de regelvolgorde niet uit.', 3: 'Een allow zou het verkeer juist toestaan. De deny moet boven de algemene allow.' },
          explain: 'First match: zet specifieke regels, en zeker specifieke deny\'s, boven de algemene.' },
        { q: 'Een fictief distributiecentrum wil voorkomen dat iemand een laptop in een vrije netwerkaansluiting in de kantine steekt en op het interne netwerk komt. Welke maatregel past het beste?',
          options: ['IEEE 802.1X op de switchpoorten met een RADIUS-server', 'Een sterker wachtwoord op de domeinaccounts', 'Een extra VLAN voor de kantine zonder verdere regels', 'Een IDS op de internetverbinding'], answer: 0,
          wrong: { 1: 'De laptop komt dan nog steeds op het netwerk, en kan daar scannen en aanvallen zonder ooit in te loggen.', 2: 'Een VLAN zonder filtering ertussen houdt niemand tegen.', 3: 'Dat IDS ziet verkeer naar internet, niet een laptop die intern rondkijkt.' },
          explain: 'Met 802.1X laat de switch tot een geslaagde aanmelding alleen aanmeldverkeer door. Zet ongebruikte poorten daarnaast uit.' },
        { q: 'Een fictief adviesbureau verbindt twee vestigingen permanent over internet. Het verkeer moet versleuteld zijn en gebruikers mogen niets hoeven te doen. Welke oplossing past het beste?',
          options: ['Remote access VPN-clients op alle laptops', 'Een site-to-site IPsec-tunnel tussen de firewalls van beide vestigingen', 'Een WAF voor de applicaties op het hoofdkantoor', 'Split tunneling voor de medewerkers van de tweede vestiging'], answer: 1,
          wrong: { 0: 'Dat vraagt per gebruiker een handeling, en apparaten zonder client (printers, scanners) blijven buiten.', 2: 'Een WAF filtert HTTP-verkeer naar webapplicaties, maar verbindt geen netwerken.', 3: 'Split tunneling is een instelling van remote access VPN, geen manier om twee vestigingen te koppelen.' },
          explain: 'Site-to-site: één tunnel tussen twee gateways, onzichtbaar voor de gebruikers.' },
      ],
    },
  ],

  terms: [
    { term: 'Default deny', def: 'Uitgangspunt van een firewallbeleid: alles wat niet uitdrukkelijk is toegestaan, wordt geweigerd. De laatste regel is een gelogde deny any any.' },
    { term: 'Overschaduwde regel', def: 'Firewallregel die nooit wordt geraakt omdat een eerdere, bredere regel hetzelfde verkeer al afhandelt (first match).' },
    { term: 'DMZ', def: 'Zone voor diensten die vanaf internet bereikbaar moeten zijn, gescheiden van het interne netwerk door firewallregels. Ook wel screened subnet.' },
    { term: 'VLAN', def: 'Logisch netwerk op een gedeelde switch (IEEE 802.1Q). Scheidt broadcastdomeinen, maar is pas een beveiligingsgrens met filtering ertussen.' },
    { term: 'IDS en IPS', def: 'Intrusion detection system meldt verdacht verkeer; intrusion prevention system staat inline en kan het ook tegenhouden.' },
    { term: 'Site-to-site VPN', def: 'Permanente versleutelde tunnel tussen twee locaties, meestal met IPsec en IKEv2 tussen twee firewalls.' },
    { term: 'IEEE 802.1X', def: 'Standaard voor poortgebaseerde netwerktoegang: supplicant, authenticator (switch of access point) en een RADIUS-server die beslist.' },
    { term: 'MAC Authentication Bypass', def: 'Toegang op basis van een bekend MAC-adres voor apparaten zonder 802.1X. Zwak, want een MAC-adres is na te bootsen.' },
    { term: 'WPA3-SAE', def: 'Aanmelding bij WPA3-Personal (Simultaneous Authentication of Equals) die offline raden van het wachtwoord voorkomt en forward secrecy geeft.' },
    { term: 'Rogue access point', def: 'Access point dat niet van de organisatie is, vaak met de naam van het bedrijfsnetwerk. Op te sporen via de BSSID.' },
  ],

  resources: [
    { title: 'NIST SP 800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy', url: 'https://csrc.nist.gov/pubs/sp/800/41/r1/final' },
    { title: 'NIST SP 800-153: Guidelines for Securing Wireless Local Area Networks', url: 'https://csrc.nist.gov/pubs/sp/800/153/final' },
    { title: 'RFC 7296: Internet Key Exchange Protocol Version 2 (IKEv2)', url: 'https://www.rfc-editor.org/rfc/rfc7296' },
    { title: 'NIST SP 800-77 Rev. 1: Guide to IPsec VPNs', url: 'https://csrc.nist.gov/pubs/sp/800/77/r1/final' },
  ],
});
