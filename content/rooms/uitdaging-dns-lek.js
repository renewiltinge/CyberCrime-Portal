/* Uitdaging ★★★ — Het lek in de DNS (zonder handleiding) */

// Alles FICTIEF: Drukkerij De Pers BV, de werkplekken, de klanten en de domeinen zijn verzonnen.
// De datastukken in de DNS-namen zijn echte Base32 (kleine letters, zonder opvulling) van één tekst, in stukken van 24 tekens.
CS.registerRoom({
  id: 'uitdaging-dns-lek',
  path: 'uitdagingen',
  order: 7,
  title: '★★★ Het lek in de DNS',
  icon: '📡',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-12',
  minutes: 60,
  summary: 'Een werkplek op de drukvloer stelt midden in de nacht vreemde DNS-vragen. Een netwerkopname en het log van de DNS-server vertellen samen wat er gebeurde. Welke werkplek, welk domein, en wat ging er naar buiten? Geen stappenplan.',
  objectives: [
    'In een netwerkopname een onversleutelde aanmelding en een verdachte download terugvinden',
    'DNS-tunneling onderscheiden van gewone, lange DNS-namen',
    'Weggesluisde data reconstrueren uit stukken die in de verkeerde volgorde en dubbel binnenkomen',
  ],
  terms: [
    { term: 'DNS-tunneling', def: 'Data verstoppen in DNS-vragen, meestal in lange subdomeinen naar één domein dat de aanvaller beheert. DNS mag vaak overal naar buiten en valt minder op.' },
    { term: 'TXT-record', def: 'Een DNS-record met vrije tekst. Bij tunneling gebruikt de aanvaller het antwoord als terugkanaal.' },
    { term: 'SERVFAIL', def: 'Het DNS-antwoord "server faalde". Een client of tunneltool stelt dezelfde vraag dan vaak opnieuw.' },
    { term: 'Base32', def: 'Een codering met alleen a-z en 2-7. Past goed in DNS-namen, omdat DNS geen verschil maakt tussen hoofdletters en kleine letters.' },
    { term: 'DHCP', def: 'Het protocol waarmee een werkplek een IP-adres krijgt. Het verzoek bevat vaak de hostnaam, handig om een adres aan een machine te koppelen.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: Exfiltration Over Alternative Protocol (T1048)', url: 'https://attack.mitre.org/techniques/T1048/' },
    { title: 'RFC 4648: Base16, Base32 en Base64', url: 'https://www.rfc-editor.org/rfc/rfc4648' },
  ],
  tasks: [
    {
      title: 'Bewijs 1: de netwerkopname',
      content: `
        <p>Drukkerij De Pers BV (fictief) krijgt op vrijdagochtend een melding van haar beveiligingsleverancier: een werkplek op de
        drukvloer deed vannacht ongewoon veel DNS-vragen. De netwerkbeheerder liet op dat moment een opname lopen op de switch van
        de drukvloer. De opname begint om 03:11:50.</p>
        <p>Zoek uit wat er gebeurde. Er is geen stappenplan.</p>
      `,
      lab: { type: 'pcap', title: 'span-drukvloer_2026-11-06_031150.pcap', packets: [
          {
            "no": 1,
            "time": "0.000",
            "src": "0.0.0.0",
            "dst": "255.255.255.255",
            "proto": "DHCP",
            "len": 342,
            "info": "DHCP Request  - Transaction ID 0x5a1c9e02",
            "stream": "Client MAC: 00:1b:21:4c:9a:17\nRequested IP Address: 10.40.2.31\nHost Name: WS-INK-14\nVendor class: MSFT 5.0"
          },
          {
            "no": 2,
            "time": "0.004",
            "src": "10.40.0.1",
            "dst": "10.40.2.31",
            "proto": "DHCP",
            "len": 342,
            "info": "DHCP ACK      - Transaction ID 0x5a1c9e02"
          },
          {
            "no": 3,
            "time": "8.112",
            "src": "10.40.2.31",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 77,
            "info": "Standard query 0x3f01 A crm.depers.nm.lab"
          },
          {
            "no": 4,
            "time": "8.114",
            "src": "10.40.0.10",
            "dst": "10.40.2.31",
            "proto": "DNS",
            "len": 93,
            "info": "Standard query response 0x3f01 A crm.depers.nm.lab A 10.40.0.25"
          },
          {
            "no": 5,
            "time": "8.120",
            "src": "10.40.2.31",
            "dst": "10.40.0.25",
            "proto": "TCP",
            "len": 66,
            "info": "50122 \u2192 80 [SYN]"
          },
          {
            "no": 6,
            "time": "8.121",
            "src": "10.40.0.25",
            "dst": "10.40.2.31",
            "proto": "TCP",
            "len": 66,
            "info": "80 \u2192 50122 [SYN, ACK]"
          },
          {
            "no": 7,
            "time": "8.121",
            "src": "10.40.2.31",
            "dst": "10.40.0.25",
            "proto": "TCP",
            "len": 54,
            "info": "50122 \u2192 80 [ACK]"
          },
          {
            "no": 8,
            "time": "8.204",
            "src": "10.40.2.31",
            "dst": "10.40.0.25",
            "proto": "HTTP",
            "len": 512,
            "info": "POST /login HTTP/1.1  (application/x-www-form-urlencoded)",
            "stream": "POST /login HTTP/1.1\nHost: crm.depers.nm.lab\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 39\n\ngebruiker=beheer&wachtwoord=Drukpers2019"
          },
          {
            "no": 9,
            "time": "8.260",
            "src": "10.40.0.25",
            "dst": "10.40.2.31",
            "proto": "HTTP",
            "len": 310,
            "info": "HTTP/1.1 302 Found  (Location: /dashboard)",
            "stream": "HTTP/1.1 302 Found\nLocation: /dashboard\nSet-Cookie: crmsessie=4be1c0d7a9; HttpOnly"
          },
          {
            "no": 10,
            "time": "12.551",
            "src": "10.40.2.31",
            "dst": "10.40.0.25",
            "proto": "HTTP",
            "len": 421,
            "info": "GET /rapporten/export?type=klanten&formaat=csv HTTP/1.1",
            "stream": "GET /rapporten/export?type=klanten&formaat=csv HTTP/1.1\nHost: crm.depers.nm.lab\nCookie: crmsessie=4be1c0d7a9"
          },
          {
            "no": 11,
            "time": "12.940",
            "src": "10.40.0.25",
            "dst": "10.40.2.31",
            "proto": "HTTP",
            "len": 1514,
            "info": "HTTP/1.1 200 OK  (text/csv)",
            "stream": "HTTP/1.1 200 OK\nContent-Type: text/csv; charset=utf-8\nContent-Length: 412877\n\nklantnr;naam;plaats;email\n10001;Bakkerij Zoet;Zwolle;info@zoet.example\n10002;Sportclub De Vlieger;Deventer;secretaris@vlieger.example\n\u2026"
          },
          {
            "no": 12,
            "time": "31.207",
            "src": "10.40.2.18",
            "dst": "198.51.100.80",
            "proto": "TLSv1.3",
            "len": 571,
            "info": "Client Hello (SNI=portal.drukwerkportaal.example)"
          },
          {
            "no": 13,
            "time": "31.244",
            "src": "198.51.100.80",
            "dst": "10.40.2.18",
            "proto": "TLSv1.3",
            "len": 1514,
            "info": "Server Hello, Change Cipher Spec, Application Data"
          },
          {
            "no": 14,
            "time": "40.003",
            "src": "10.40.2.18",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 78,
            "info": "Standard query 0x7a10 MX mail.depers.nm.lab"
          },
          {
            "no": 15,
            "time": "40.005",
            "src": "10.40.0.10",
            "dst": "10.40.2.18",
            "proto": "DNS",
            "len": 110,
            "info": "Standard query response 0x7a10 MX mail.depers.nm.lab MX 10 mx1.depers.nm.lab"
          },
          {
            "no": 16,
            "time": "51.017",
            "src": "10.40.2.31",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 78,
            "info": "Standard query 0x0001 A wpad.depers.nm.lab"
          },
          {
            "no": 17,
            "time": "51.019",
            "src": "10.40.0.10",
            "dst": "10.40.2.31",
            "proto": "DNS",
            "len": 78,
            "info": "Standard query response 0x0001 No such name A wpad.depers.nm.lab"
          },
          {
            "no": 18,
            "time": "75.310",
            "src": "10.40.2.18",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 110,
            "info": "Standard query 0x7a3c A 7f3a9c0e21b84d6fa0c5e9.cdn.drukwerkportaal.example"
          },
          {
            "no": 19,
            "time": "75.322",
            "src": "10.40.0.10",
            "dst": "10.40.2.18",
            "proto": "DNS",
            "len": 126,
            "info": "Standard query response 0x7a3c A 7f3a9c0e21b84d6fa0c5e9.cdn.drukwerkportaal.example A 198.51.100.81"
          },
          {
            "no": 20,
            "time": "110.020",
            "src": "10.40.2.31",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 81,
            "info": "Standard query 0x51a0 A statistiek-cdn.nm.lab"
          },
          {
            "no": 21,
            "time": "110.071",
            "src": "10.40.0.10",
            "dst": "10.40.2.31",
            "proto": "DNS",
            "len": 97,
            "info": "Standard query response 0x51a0 A statistiek-cdn.nm.lab A 203.0.113.53"
          },
          {
            "no": 22,
            "time": "132.004",
            "src": "10.40.2.31",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 110,
            "info": "Standard query 0x51a1 TXT p01.mjsxg5dbnzsd223mmfxhizlo.statistiek-cdn.nm.lab"
          },
          {
            "no": 23,
            "time": "132.118",
            "src": "10.40.0.10",
            "dst": "10.40.2.31",
            "proto": "DNS",
            "len": 126,
            "info": "Standard query response 0x51a1 TXT p01.mjsxg5dbnzsd223mmfxhizlo.statistiek-cdn.nm.lab TXT \"ok\""
          },
          {
            "no": 24,
            "time": "136.009",
            "src": "10.40.2.31",
            "dst": "10.40.0.10",
            "proto": "DNS",
            "len": 110,
            "info": "Standard query 0x51a2 TXT p02.fvsxq4dpoj2c4y3toyqhe2lk.statistiek-cdn.nm.lab"
          },
          {
            "no": 25,
            "time": "136.121",
            "src": "10.40.0.10",
            "dst": "10.40.2.31",
            "proto": "DNS",
            "len": 126,
            "info": "Standard query response 0x51a2 TXT p02.fvsxq4dpoj2c4y3toyqhe2lk.statistiek-cdn.nm.lab TXT \"ok\""
          },
          {
            "no": 26,
            "time": "138.500",
            "src": "10.40.2.18",
            "dst": "10.40.0.30",
            "proto": "SMB2",
            "len": 182,
            "info": "Create Request File: Orders\\week45.pdf"
          }
        ] },
      questions: [
        { q: 'Met welk account werd er die nacht op het CRM ingelogd?',
          answer: ['beheer'],
          hints: ['Een aanmelding over onversleuteld HTTP laat alles zien.',
                  'Klik het POST-verzoek naar het CRM aan en lees de stream.',
                  'Kijk naar het veld gebruiker in het formulier.'],
          wrong: { 'drukpers2019': 'Dat is het wachtwoord. Gevraagd is het account.' },
          explain: 'Pakket 8: POST /login met gebruiker=beheer en het wachtwoord in leesbare tekst. Een beheeraccount, om 03:12 \'s nachts, vanaf een werkplek op de drukvloer. Direct daarna haalt dezelfde sessie het klantenbestand op (pakket 11 en 12).',
          why: 'Een intern systeem zonder HTTPS lekt wachtwoorden aan iedereen die meeluistert, en een gedeeld beheeraccount maakt het onmogelijk te zeggen wie het was.' },
        { q: 'Welke werkplek stuurde daarna data naar buiten? (IP-adres of hostnaam)',
          answer: ['10.40.2.31', 'WS-INK-14'],
          hints: ['Kijk wie de vreemde DNS-vragen stelt, niet wie ze beantwoordt.',
                  'Filter op TXT en kijk naar de bron. Een hostnaam vind je in het DHCP-verzoek.',
                  'Dezelfde werkplek die het klantenbestand ophaalde; zijn naam begint met WS-INK.'],
          wrong: { '10.40.0.10': 'Dat is de interne DNS-server. Die stuurt de vragen alleen door naar buiten.',
                   '10.40.2.18': 'Die werkplek vroeg een lange CDN-naam op, maar met een gewone A-query en een gewoon antwoord. Dat is normaal webverkeer.',
                   '203.0.113.53': 'Dat is de ontvangende kant buiten het netwerk. Gevraagd is de werkplek binnen.' },
          explain: 'De TXT-vragen komen van 10.40.2.31. Het DHCP-verzoek in pakket 1 koppelt dat adres aan de hostnaam WS-INK-14.' },
      ],
    },
    {
      title: 'Bewijs 2: het log van de DNS-server',
      content: `
        <p>De opname op de switch stopte na ruim twee minuten. De interne DNS-server houdt een querylog bij voor alle werkplekken.
        Dit is het log van die nacht, van 03:11 tot 03:16.</p>
      `,
      lab: {
        type: 'dnslog', title: 'dns01 querylog 2026-11-06',
        scenario: 'Querylog van de interne resolver dns01 (alle clients).',
        queries: [
          {
            "time": "03:11:58",
            "name": "crm.depers.nm.lab",
            "type": "A",
            "resp": "OK"
          },
          {
            "time": "03:12:30",
            "name": "mail.depers.nm.lab",
            "type": "MX",
            "resp": "OK"
          },
          {
            "time": "03:12:41",
            "name": "wpad.depers.nm.lab",
            "type": "A",
            "resp": "NXDOMAIN"
          },
          {
            "time": "03:13:05",
            "name": "7f3a9c0e21b84d6fa0c5e9.cdn.drukwerkportaal.example",
            "type": "A",
            "resp": "OK"
          },
          {
            "time": "03:13:40",
            "name": "statistiek-cdn.nm.lab",
            "type": "A",
            "resp": "OK"
          },
          {
            "time": "03:14:02",
            "name": "p01.mjsxg5dbnzsd223mmfxhizlo.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:06",
            "name": "p02.fvsxq4dpoj2c4y3toyqhe2lk.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:11",
            "name": "p03.mvxd2mryge2caytsn5xd2y3s.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:17",
            "name": "p04.nuxgizlqmvzhgltonuxgyylc.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:21",
            "name": "p06.l53gk2lmnftwkx3vnf2goylo.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "SERVFAIL"
          },
          {
            "time": "03:14:24",
            "name": "p06.l53gk2lmnftwkx3vnf2goylo.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:29",
            "name": "p05.ebhe263enzzv62ltl5twkzlo.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:35",
            "name": "p07.m56q.statistiek-cdn.nm.lab",
            "type": "TXT",
            "resp": "TXT \"ok\""
          },
          {
            "time": "03:14:59",
            "name": "time.depers.nm.lab",
            "type": "A",
            "resp": "OK"
          },
          {
            "time": "03:15:20",
            "name": "mail.depers.nm.lab",
            "type": "A",
            "resp": "OK"
          }
        ],
      },
      questions: [
        { q: 'Naar welk domein liep de DNS-tunnel?',
          answer: ['statistiek-cdn.nm.lab'],
          hints: ['Een lange naam alleen bewijst niets. Kijk ook naar het soort vraag en hoe vaak hij terugkomt.',
                  'De samenvatting per domein telt TXT-vragen en de lengte van de langste subnaam.',
                  'Het domein klinkt als een onschuldige statistiekdienst.'],
          wrong: { '/drukwerkportaal/': 'Een lange naam, maar één A-query met een gewoon antwoord van een andere werkplek. Dat is een CDN, geen tunnel.',
                   'depers.nm.lab': 'Dat is het eigen domein van de drukkerij.' },
          explain: 'Acht TXT-vragen met subnamen tot 28 tekens naar statistiek-cdn.nm.lab, allemaal van WS-INK-14. De naam is gekozen om saai te lijken.' },
        { q: 'Uit hoeveel verschillende datastukken bestaat de weggesluisde data?',
          answer: ['7', 'zeven'],
          hints: ['Niet elke vraag is een nieuw stuk.',
                  'Let op het nummer vooraan in elke naam en op het antwoord dat de server gaf.',
                  'Eén stuk is na een SERVFAIL opnieuw verstuurd.'],
          wrong: { '8': 'Je telde de herhaalde vraag na de SERVFAIL mee. Dat is hetzelfde stuk, met hetzelfde nummer en dezelfde inhoud.',
                   '2': 'Dat zijn alleen de stukken in de netwerkopname. Die stopte te vroeg; het DNS-log ziet alles.' },
          explain: 'Acht TXT-vragen, maar p06 staat er twee keer in: eerst SERVFAIL, daarna opnieuw. Er zijn dus zeven stukken, p01 tot en met p07. Let ook op de volgorde: p06 kwam vóór p05 binnen.' },
      ],
    },
    {
      title: 'Wat ging er naar buiten?',
      content: `
        <p>Reconstrueer wat de werkplek wegsluisde. Het invoerveld is leeg.</p>
      `,
      lab: { type: 'multidecode', input: '' },
      questions: [
        { q: 'Welke vlag zat in de weggesluisde data?',
          answer: ['NM{dns_is_geen_veilige_uitgang}'],
          encoded: true,
          boss: true,
          hints: ['Zet de stukken eerst in de goede volgorde.',
                  'Sorteer op het nummer, niet op de tijd. Plak alleen de datastukken achter elkaar, zonder nummer, zonder punten en zonder het domein.',
                  'Alleen a-z en 2-7: dat is Base32. Stuk p05 hoort vóór p06.'],
          wrong: { 'nm{dns_is_geeng}': 'Je zette de stukken op volgorde van tijd. Stuk p06 kwam eerder binnen dan p05, maar hoort erachter.' },
          explain: 'p01 t/m p07 achter elkaar en Base32 gedecodeerd geeft: "bestand=klanten-export.csv rijen=2814 bron=crm.depers.nm.lab NM{dns_is_geen_veilige_uitgang}". Het gaat om het klantenbestand uit het CRM. In dit lab is alleen de kopregel weggesluisd; in het echt gaan zo, stuk voor stuk, complete bestanden naar buiten.',
          why: 'Wie alleen web- en mailverkeer bewaakt, mist DNS. Laat werkplekken alleen de eigen resolver gebruiken en let in het DNS-log op veel TXT-vragen met lange, unieke subnamen naar één domein.' },
      ],
    },
  ],
});
