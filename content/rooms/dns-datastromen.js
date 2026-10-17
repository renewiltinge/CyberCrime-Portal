/* Room: Datastromen — DNS als stille uitgang (tunneling & DGA) */

// =======================================================================
//  Alles FICTIEF: .nm.lab-domeinen en verzonnen queries. Je oefent het
//  lezen van DNS-verkeer, je bevraagt geen echte naamservers.
// =======================================================================

const DNS_QUERIES = [
  { time: '02:10:01', name: 'intranet.nm.lab', type: 'A', resp: 'OK' },
  { time: '02:10:03', name: 'mail.nm.lab', type: 'A', resp: 'OK' },
  { time: '02:11:00', name: 'k5euo63fmjtv64lomfptgmt5aib7q.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:11:02', name: 'nf4xq1k9plm2wdr3nxc8vbp7za9qm.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:11:05', name: 'w1sbt4ydxd9ko5x2tcu5zeye1lp6ab.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:11:07', name: 'v7qra3xswc8ij4m4p8r2wd9cq7m2v8.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:11:10', name: 'p0r3n4c8vbk5euo63fmjtv64lomfpt.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:11:12', name: 'z9qm2wdr3nxc8vbp7za9k9plm2wdxd.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:11:15', name: 'aegh5t7qk5euo63fmjtv64lomfptgm.exfil.nm.lab', type: 'TXT', resp: 'OK' },
  { time: '02:12:00', name: 'updates.nm.lab', type: 'A', resp: 'OK' },
  { time: '02:12:30', name: 'xk3f9q2v8.nm.lab', type: 'A', resp: 'NXDOMAIN' },
  { time: '02:12:31', name: 'p7m2v8z1a.nm.lab', type: 'A', resp: 'NXDOMAIN' },
  { time: '02:12:33', name: 'w1sbt4yd0.nm.lab', type: 'A', resp: 'NXDOMAIN' },
  { time: '02:12:35', name: 'r3nxc8vb2.nm.lab', type: 'A', resp: 'NXDOMAIN' },
  { time: '02:12:37', name: 'm4p8r2wd9.nm.lab', type: 'A', resp: 'NXDOMAIN' },
  { time: '02:12:39', name: 'v7qra3xs1.nm.lab', type: 'A', resp: 'NXDOMAIN' },
  { time: '02:13:00', name: 'mail.nm.lab', type: 'A', resp: 'OK' },
];

CS.registerRoom({
  id: 'dns-datastromen',
  path: 'datastromen',
  order: 5,
  title: 'DNS: de stille uitgang',
  icon: '🌫️',
  difficulty: 'Gemiddeld',
  minutes: 45,
  summary: 'DNS mag bijna overal naar buiten — en juist daarom misbruiken aanvallers het als geheim kanaal. Je leert DNS-tunneling (data wegsmokkelen in lange subdomeinen, vaak TXT) onderscheiden van een DGA (malware die willekeurige domeinen aftast om zijn C2 te vinden), en hoe je beide detecteert en blokkeert.',
  objectives: [
    'Uitleggen waarom DNS een aantrekkelijk covert channel is',
    'DNS-tunneling herkennen aan veel TXT-queries met lange, hoog-entropische subdomeinen naar één domein',
    'Een DGA herkennen aan veel willekeurige domeinen met NXDOMAIN-antwoorden',
    'Een DNS-querylog lezen en de verdachte stromen aanwijzen',
    'Detectie- en blokkeermaatregelen benoemen (NXDOMAIN-ratio, RPZ/sinkhole, lengte/entropie)',
  ],
  terms: [
    { term: 'DNS', def: 'Domain Name System: vertaalt namen (example.com) naar IP-adressen. Vrijwel elk netwerk laat DNS naar buiten.' },
    { term: 'Covert channel', def: 'Een verborgen communicatiekanaal via een protocol dat voor iets anders bedoeld is — zoals data in DNS-queries.' },
    { term: 'DNS-tunneling', def: 'Data (of C2-verkeer) verstoppen in DNS: de payload gaat als lange, gecodeerde subdomeinen naar een domein dat de aanvaller beheert; antwoorden komen vaak in TXT-records.' },
    { term: 'TXT-record', def: 'Een DNS-record dat vrije tekst kan bevatten; populair bij tunneling omdat er veel data in past.' },
    { term: 'DGA', def: 'Domain Generation Algorithm: malware genereert dagelijks veel willekeurige domeinnamen en probeert ze één voor één; de meeste bestaan niet (NXDOMAIN) tot het de actieve C2 raakt.' },
    { term: 'NXDOMAIN', def: 'Het DNS-antwoord "dit domein bestaat niet". Een plotselinge piek aan NXDOMAIN is een klassiek DGA-signaal.' },
    { term: 'Entropie', def: 'Maat voor willekeur. Hoog-entropische (random ogende) subdomeinen wijzen op gegenereerde of gecodeerde namen, niet op menselijk gekozen woorden.' },
    { term: 'RPZ / sinkhole', def: 'Response Policy Zone of DNS-sinkhole: kwaadaardige domeinen op de resolver blokkeren of omleiden naar een onschadelijk adres.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK — Exfiltration Over Alternative Protocol (T1048)', url: 'https://attack.mitre.org/techniques/T1048/' },
    { title: 'MITRE ATT&CK — Dynamic Resolution: DGA (T1568.002)', url: 'https://attack.mitre.org/techniques/T1568/002/' },
    { title: 'SANS — Detecting DNS tunneling', url: 'https://www.sans.org/white-papers/' },
    { title: 'NCSC — Nationaal Cyber Security Centrum', url: 'https://www.ncsc.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Waarom DNS de perfecte sluiproute is',
      content: `
        <p>Een firewall blokkeert van alles, maar <strong>DNS</strong> mag bijna altijd naar buiten — anders werkt het
        internet niet. Precies daarom is DNS geliefd bij aanvallers als <strong>covert channel</strong>: een verborgen
        kanaal via een protocol dat eigenlijk voor iets anders bedoeld is.</p>
        <p>Er zijn twee misbruikvormen die je moet kunnen herkennen:</p>
        <ul>
          <li><strong>DNS-tunneling</strong> — data wegsmokkelen in de <em>subdomeinen</em> van een domein dat de aanvaller
          beheert. Het slachtoffer vraagt bijvoorbeeld <code>k5euo63fmjtv64lo….exfil.nm.lab</code> op; de "vraag" ís de data.
          Antwoorden komen vaak in <strong>TXT</strong>-records.</li>
          <li><strong>DGA</strong> (domain generation algorithm) — malware verzint dagelijks veel <em>willekeurige</em>
          domeinnamen en probeert ze af te tasten om zijn C2 te vinden. De meeste bestaan niet, dus je ziet een piek aan
          <strong>NXDOMAIN</strong>.</li>
        </ul>
        <div class="callout warn"><strong>Alles fictief:</strong> de domeinen eindigen op <code>.nm.lab</code> en de queries
        zijn verzonnen. Je oefent het lezen van DNS-verkeer.</div>
        <div class="callout tip"><strong>Beloning:</strong> DNS mag naar buiten, dus wordt het misbruikt. Vlag:
        <code>NM{dns_mag_naar_buiten}</code>.</div>
      `,
      questions: [
        { q: 'Waarom is DNS een aantrekkelijk kanaal voor aanvallers?', options: ['Het mag bijna overal naar buiten, ook waar andere protocollen geblokkeerd zijn', 'Het is versleuteld', 'Het is sneller dan HTTPS', 'Het wordt nooit gelogd'], answer: 0, explain: 'DNS is zo fundamenteel dat het bijna altijd door de firewall mag — ideaal als sluiproute.' },
        { q: 'Hoe smokkelt DNS-tunneling data naar buiten?', options: ['In lange, gecodeerde subdomeinen naar een domein van de aanvaller', 'Door het IP-adres te veranderen', 'Door de firewall uit te zetten', 'Via e-mailbijlagen'], answer: 0, explain: 'De data zit in de query zelf (de subdomeinen); de resolver stuurt die netjes naar de kwaadaardige naamserver.' },
        { q: 'Wat is het klassieke signaal van een DGA?', options: ['Een piek aan NXDOMAIN-antwoorden op willekeurige domeinen', 'Veel TXT-records', 'Een enkele grote download', 'Lage jitter'], answer: 0, explain: 'Een DGA raakt veel niet-bestaande domeinen: de NXDOMAIN-ratio schiet omhoog tot het de actieve C2 vindt.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{dns_mag_naar_buiten}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{dns_mag_naar_buiten}.' },
      ],
    },
    {
      title: 'Taak 2 — Lees het DNS-querylog',
      content: `
        <p>Hieronder staat een stukje DNS-querylog van één werkplek. Twee dingen zijn mis. Zoek het
        <strong>tunneling-domein</strong> (veel TXT-queries met lange, willekeurige subdomeinen naar één domein) en herken
        het <strong>DGA</strong>-patroon (een reeks willekeurige domeinen met NXDOMAIN). Laat je niet afleiden door het
        normale verkeer naar intranet, mail en updates.</p>
        <div class="callout tip"><strong>Beloning:</strong> betrap de stille uitgang. Vlag: <code>NM{stille_uitgang_betrapt}</code>.</div>
      `,
      lab: {
        type: 'dnslog',
        title: 'DNS-queries van werkplek WRK-23',
        scenario: 'Eén domein slurpt data via TXT; een reeks willekeurige namen botst op NXDOMAIN. Welke is welke?',
        queries: DNS_QUERIES,
        ask: [
          { q: 'Welk domein is het DNS-tunneling-kanaal?', answer: ['exfil.nm.lab'], hint: 'Veel TXT-queries met lange subdomeinen naar hetzelfde domein.' },
          { q: 'Welk DNS-recordtype gebruikt dat kanaal om data te verbergen?', answer: ['TXT', 'txt'], hint: 'Kijk naar de typekolom bij de verdachte queries.' },
          { q: 'Hoeveel queries kregen NXDOMAIN (teken van een DGA)?', answer: ['6', 'zes'], hint: 'Lees de regel onder de samenvatting.' },
        ],
      },
      questions: [
        { q: 'Welk domein wordt gebruikt voor DNS-tunneling?', answer: ['exfil.nm.lab'], hint: 'Veel TXT + lange subdomeinen naar één domein.', explain: 'exfil.nm.lab kreeg zeven TXT-queries met lange, hoog-entropische subdomeinen — klassieke tunneling.' },
        { q: 'Waaraan herken je de tunneling in het log?', options: ['Veel TXT-queries met lange, willekeurige subdomeinen naar hetzelfde domein', 'Veel NXDOMAIN', 'Eén grote download', 'A-records naar intranet'], answer: 0, explain: 'De combinatie lange subdomeinen + TXT + steeds hetzelfde domein verraadt het tunneling-kanaal.' },
        { q: 'Hoeveel queries kregen een NXDOMAIN-antwoord?', answer: ['6', 'zes'], hint: 'De samenvatting onderaan het lab.', explain: 'Zes willekeurige domeinen gaven NXDOMAIN — het DGA tast domeinen af op zoek naar de C2.' },
        { q: 'Welke stroom is juist normaal verkeer?', options: ['De A-queries naar intranet.nm.lab, mail.nm.lab en updates.nm.lab (die resolven netjes)', 'De TXT-queries naar exfil.nm.lab', 'De NXDOMAIN-reeks', 'Alle .nm.lab-queries zijn kwaadaardig'], answer: 0, explain: 'Korte, bekende namen die netjes resolven (OK) zijn gewoon normaal gebruik.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{stille_uitgang_betrapt}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{stille_uitgang_betrapt}.' },
      ],
    },
    {
      title: 'Taak 3 — Detecteren en blokkeren',
      content: `
        <p>Nu je het patroon kent, hoe vang je het structureel? DNS-misbruik detecteer je niet aan één query, maar aan
        <strong>patronen over tijd</strong>:</p>
        <ul>
          <li><strong>Lengte &amp; entropie</strong> van subdomeinen — meet hoe lang en hoe willekeurig ze zijn (tunneling
          valt op).</li>
          <li><strong>Volume per domein</strong> — veel queries naar één zelden-bezocht domein is verdacht.</li>
          <li><strong>NXDOMAIN-ratio</strong> — een plotselinge piek wijst op een DGA.</li>
          <li><strong>Recordtypes</strong> — ongewoon veel TXT (of NULL) is een rode vlag.</li>
        </ul>
        <p>Blokkeren doe je op de resolver met een <strong>RPZ</strong> of <strong>sinkhole</strong>: je weigert het
        kwaadaardige domein of leidt het om naar een onschadelijk adres, zodat je besmette machines ook meteen ziet.</p>
        <div class="callout tip"><strong>Beloning:</strong> meet patronen, niet losse queries. Vlag: <code>NM{meet_de_patronen}</code>.</div>
      `,
      questions: [
        { q: 'Welke maat helpt het best om DNS-tunneling te detecteren?', options: ['Lengte en entropie van de subdomeinen', 'De kleur van het domein', 'Het aantal letters in de TLD', 'De tijd van de dag'], answer: 0, explain: 'Tunneling-subdomeinen zijn lang en willekeurig; lengte/entropie meten vangt ze automatisch.' },
        { q: 'Een plotselinge piek in de NXDOMAIN-ratio wijst vooral op…', options: ['Een DGA die domeinen aftast op zoek naar zijn C2', 'Normaal browsen', 'Een software-update', 'Een trage resolver'], answer: 0, explain: 'Veel mislukte lookups op willekeurige namen is het handtekeningpatroon van een DGA.' },
        { q: 'Hoe blokkeer je een kwaadaardig DNS-domein op de resolver?', options: ['Met een RPZ of sinkhole (weigeren of omleiden naar een onschadelijk adres)', 'Door de werkplek uit te zetten', 'Door DNS helemaal te blokkeren', 'Door het wachtwoord te wijzigen'], answer: 0, explain: 'Een RPZ/sinkhole blokkeert het domein centraal én onthult welke machines het nog proberen (besmet).' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{meet_de_patronen}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{meet_de_patronen}.' },
      ],
    },
  ],
});
