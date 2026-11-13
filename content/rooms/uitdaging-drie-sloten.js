/* Uitdaging ★★★★★: Drie sloten, één sleutel (eindbaas, zonder handleiding) */

// Alles FICTIEF: Drukkerij Van Hout & Zn, de accounts, servers, adressen, wallets en de beurs zijn verzonnen.
CS.registerRoom({
  id: 'uitdaging-drie-sloten',
  path: 'uitdagingen',
  order: 13,
  title: '★★★★★ Drie sloten, één sleutel',
  icon: '🗝️',
  difficulty: 'Moeilijk',
  level: 'Expert',
  checked: '2026-11-12',
  minutes: 120,
  summary: 'De eindbaas. Een drukkerij is leeggehaald en heeft losgeld betaald. Op een in beslag genomen server van de daders staat een kluis die alleen opent voor wie de klus van binnen kent. Tijdlijn, geldspoor en code: drie sloten, één sleutel.',
  objectives: [
    'In een tijdlijn uit meerdere bronnen de eerste toegang vinden, en tijden correct in UTC lezen',
    'Een losgeldbetaling door een keten volgen en het deel van één slachtoffer berekenen als geld wordt samengevoegd',
    'Een controle in code lezen en de bevindingen uit eerdere lagen exact samenvoegen tot een sleutel',
  ],
  terms: [
    { term: 'Password spraying', def: 'Eén of enkele veelgebruikte wachtwoorden proberen op veel accounts tegelijk, zodat geen enkel account snel geblokkeerd raakt.' },
    { term: 'Eerste toegang (initial access)', def: 'Het moment en de route waarlangs een aanvaller voor het eerst binnenkomt. Vaak een ander account dan het account dat hij later misbruikt.' },
    { term: 'Haircut-methode', def: 'Taint-analyse waarbij elke uitgaande som hetzelfde aandeel vuil geld krijgt als de samengevoegde inputs hadden.' },
    { term: 'Common-input-heuristiek', def: 'Adressen die samen als input in één transactie worden uitgegeven, zijn waarschijnlijk van dezelfde eigenaar.' },
    { term: 'FNV-1a', def: 'Een snelle, niet-cryptografische hashfunctie. Je kunt hem niet terugrekenen, maar wel controleren of een invoer de juiste uitkomst geeft.' },
  ],
  resources: [
    { title: 'MITRE ATT&CK: T1110.003 Password Spraying', url: 'https://attack.mitre.org/techniques/T1110/003/' },
    { title: 'MITRE ATT&CK: T1078 Valid Accounts', url: 'https://attack.mitre.org/techniques/T1078/' },
  ],
  tasks: [
    {
      title: 'Slot 1: de nacht van 17 oktober',
      content: `
        <p>Drukkerij Van Hout &amp; Zn (fictief) vond op zaterdagochtend 17 oktober 2026 een losgeldbrief op de
        bestandsserver. De klantdossiers waren gekopieerd. De directie betaalde 2 BTC. De recherche heeft de logs van die
        nacht in één tijdlijn gezet, en heeft later een server van de daders in beslag genomen. Daarop staat per klus een
        kluis.</p>
        <p>Begin bij het begin. Er is geen stappenplan.</p>
      `,
      lab: {
        type: 'timeline',
        title: 'Zaak HOUT-2026-17 · nacht van 16 op 17 oktober (t in UTC)',
        events: [
          { t: '2026-10-16 15:40:02', src: 'Security', host: 'SRV-FS01', user: 'adm.vliet', desc: '4624 aanmelding type 10 (RDP) vanaf 10.40.1.15 (WS-IT-02)' },
          { t: '2026-10-16 16:12:45', src: 'Security', host: 'SRV-FS01', user: 'adm.vliet', desc: '4634 afmelding' },
          { t: '2026-10-16 17:05:33', src: 'VPN', user: 'm.hout', desc: 'Aanmelding geslaagd vanaf 203.0.113.61, MFA goedgekeurd (apparaatlog: 19:05:33 lokale tijd)' },
          { t: '2026-10-16 18:22:10', src: 'VPN', user: 'm.hout', desc: 'Sessie beëindigd (apparaatlog: 20:22:10 lokale tijd)' },
          { t: '2026-10-17 00:30:00', src: 'Security', host: 'SRV-PRINT01', user: 'svc-print', desc: '4624 aanmelding type 5 (service), geplande taak wachtrij opschonen' },
          { t: '2026-10-17 00:48:02', src: 'VPN', user: 'administrator', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 02:48:02 lokale tijd)' },
          { t: '2026-10-17 00:48:40', src: 'VPN', user: 'a.devos', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 02:48:40 lokale tijd)' },
          { t: '2026-10-17 00:49:15', src: 'VPN', user: 'm.hout', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 02:49:15 lokale tijd)' },
          { t: '2026-10-17 00:50:01', src: 'VPN', user: 'ext.onderhoud', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 02:50:01 lokale tijd)' },
          { t: '2026-10-17 00:58:22', src: 'VPN', user: 'administrator', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 02:58:22 lokale tijd)' },
          { t: '2026-10-17 00:59:10', src: 'VPN', user: 'scan', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 02:59:10 lokale tijd)' },
          { t: '2026-10-17 01:05:47', src: 'VPN', user: 'b.kramer', desc: 'Aanmelding mislukt vanaf 198.51.100.20: onjuist wachtwoord (apparaatlog: 03:05:47 lokale tijd)' },
          { t: '2026-10-17 01:12:44', src: 'VPN', user: 'ext.onderhoud', desc: 'Aanmelding geslaagd vanaf 198.51.100.20, geen MFA ingesteld voor dit account (apparaatlog: 03:12:44 lokale tijd)' },
          { t: '2026-10-17 01:13:30', src: 'VPN', user: 'ext.onderhoud', desc: 'Tunneladres 10.99.0.23 toegekend (apparaatlog: 03:13:30 lokale tijd)' },
          { t: '2026-10-17 01:16:05', src: 'Security', host: 'SRV-PRINT01', user: 'ext.onderhoud', desc: '4624 aanmelding type 10 (RDP) vanaf 10.99.0.23' },
          { t: '2026-10-17 01:22:40', src: 'Sysmon', host: 'SRV-PRINT01', user: 'ext.onderhoud', desc: 'Event 1: proces gestart C:\\Users\\Public\\t.exe (onbekende hash, niet ondertekend)' },
          { t: '2026-10-17 01:31:12', src: 'Sysmon', host: 'SRV-PRINT01', user: 'ext.onderhoud', desc: 'Event 10: t.exe opent het geheugen van lsass.exe' },
          { t: '2026-10-17 01:58:20', src: 'Security', host: 'SRV-PRINT01', user: 'ext.onderhoud', desc: '4648 aanmelding met expliciete referenties voor adm.vliet' },
          { t: '2026-10-17 02:04:51', src: 'Security', host: 'SRV-FS01', user: 'adm.vliet', desc: '4624 aanmelding type 3 vanaf 10.40.2.30 (SRV-PRINT01)' },
          { t: '2026-10-17 02:10:03', src: 'Security', host: 'DC01', user: 'adm.vliet', desc: '4624 aanmelding type 3 vanaf 10.40.2.30 (SRV-PRINT01)' },
          { t: '2026-10-17 02:12:00', src: 'MFT', host: 'SRV-FS01', desc: 'D:\\export\\klanten.7z aangemaakt (4,1 GB)' },
          { t: '2026-10-17 02:41:17', src: 'Firewall', host: 'SRV-FS01', desc: 'Uitgaand 10.40.2.10 → 203.0.113.140:443 (opslag-vlug.nm.lab), 4,2 GB in 38 minuten' },
          { t: '2026-10-17 03:19:55', src: 'Firewall', host: 'SRV-FS01', desc: 'Verbinding naar 203.0.113.140:443 gesloten' },
          { t: '2026-10-17 03:52:08', src: 'Security', host: 'SRV-FS01', user: 'adm.vliet', desc: '1102 het auditlog is gewist' },
          { t: '2026-10-17 03:55:40', src: 'MFT', host: 'SRV-FS01', desc: 'D:\\Klanten\\LEES_MIJ_HOUT.txt aangemaakt' },
          { t: '2026-10-17 04:02:31', src: 'VPN', user: 'ext.onderhoud', desc: 'Sessie beëindigd (apparaatlog: 06:02:31 lokale tijd)' },
          { t: '2026-10-17 06:10:12', src: 'Mail', user: 'directie', desc: 'Ontvangen: "Uw klantdossiers" met betaalinstructie 2 BTC naar nm1q-7r0a' },
          { t: '2026-10-18 13:45:00', src: 'Notitie', user: 'directie', desc: 'Directie meldt aan recherche: 2 BTC betaald naar nm1q-7r0a' },
        ],
      },
      questions: [
        { q: 'Via welk account kwam de aanvaller als eerste binnen?', answer: ['ext.onderhoud'],
          hints: ['Het account dat de meeste schade deed, is niet per se het account waarmee het begon.', 'Zoek de eerste geslaagde aanmelding van buitenaf na een reeks mislukte pogingen vanaf hetzelfde adres.', 'Het is een account van een externe partij, zonder tweede factor.'],
          wrong: { 'adm.vliet': 'Dat beheeraccount gebruikte de aanvaller later, nadat hij het geheugen van lsass had gelezen. Hij kwam binnen via een ander account.', 'administrator': 'Op administrator werd geprobeerd, maar die pogingen mislukten allemaal.', 'svc-print': 'Dat is een gewone geplande taak van de printserver.' },
          why: 'Leveranciersaccounts zonder MFA zijn een veelvoorkomende eerste toegang. Ze vallen buiten het eigen beleid en worden zelden gecontroleerd.',
          explain: 'Vanaf 198.51.100.20 mislukken pogingen op allerlei accounts (password spraying). Om 01:12:44 UTC slaagt ext.onderhoud, een leveranciersaccount zonder MFA. Daarna volgen RDP naar SRV-PRINT01, het uitlezen van lsass en de overstap naar adm.vliet.' },
        { q: 'Hoe laat (UTC, UU:MM) was die eerste geslaagde aanmelding?', answer: ['01:12', '1:12', '01:12:44'],
          hints: ['Niet elke tijd in de tijdlijn staat in dezelfde tijdzone.', 'De kolom met de tijd is UTC. Het VPN-apparaat noemt in de omschrijving zijn eigen klok.', 'Midden oktober is het in Nederland zomertijd, UTC+2. Neem de tijd uit de tijdkolom.'],
          wrong: { '03:12': 'Dat is de lokale tijd van het VPN-apparaat (zomertijd, UTC+2). Gevraagd is UTC.', '03:12:44': 'Dat is de lokale tijd van het VPN-apparaat (zomertijd, UTC+2). Gevraagd is UTC.', '00:48': 'Dat is de eerste poging, en die mislukte.' },
          why: 'Tijdzones zijn een bekende bron van fouten in onderzoeken. Zet alles naar UTC voordat je bronnen vergelijkt, en noteer welke bron welke klok gebruikt.',
          explain: 'In de tijdkolom staat 2026-10-17 01:12:44 UTC. Het apparaatlog noemt 03:12:44 lokale tijd: zomertijd, UTC+2.' },
      ],
    },
    {
      title: 'Slot 2: het losgeld',
      content: `
        <p>De recherche heeft de betaling van Van Hout gevolgd. Halverwege komt er geld van een ander adres bij.</p>
      `,
      lab: {
        type: 'chaintrace',
        title: 'Losgeld Van Hout',
        unit: 'BTC',
        scenario: 'De 2 BTC van Van Hout kwamen binnen op nm1q-7r0a. Adres nm1q-c44e staat in een andere zaak (Tiel) als losgeldadres bekend; ook dat geld telt hier als vuil.',
        labels: { R: 'nm1q-7r0a (losgeld Van Hout)', A: 'nm1q-a51c', B: 'nm1q-b8d2', C: 'nm1q-c44e (losgeld zaak Tiel)', D: 'nm1q-d9f0', E: 'nm1q-e2b7', F: 'nm1q-f61a', G: 'nm1q-g03d', EX: 'Beurs NoordMunt' },
        exchanges: ['EX'],
        origins: [{ addr: 'R', amount: 2 }, { addr: 'C', amount: 0.6 }],
        txs: [
          { inputs: ['R'], outputs: [{ addr: 'A', amount: 1.2 }, { addr: 'B', amount: 0.8 }], time: '2026-10-18 14:02' },
          { inputs: ['B'], outputs: [{ addr: 'E', amount: 0.5 }, { addr: 'F', amount: 0.3 }], time: '2026-10-18 14:30' },
          { inputs: ['A', 'C'], outputs: [{ addr: 'D', amount: 1.8 }], time: '2026-10-19 09:15' },
          { inputs: ['D'], outputs: [{ addr: 'EX', amount: 1.5 }, { addr: 'G', amount: 0.3 }], time: '2026-10-19 11:40' },
          { inputs: ['E'], outputs: [{ addr: 'EX', amount: 0.5 }], time: '2026-10-20 08:05' },
        ],
      },
      questions: [
        { q: 'Wat leer je uit de transactie waarin nm1q-a51c en nm1q-c44e samen worden uitgegeven?', options: ['Beide adressen zijn waarschijnlijk van dezelfde eigenaar, dus dezelfde groep zit vermoedelijk achter beide zaken', 'Het geld is gewassen en niet meer te volgen', 'De beurs heeft de twee adressen samengevoegd', 'Er is niets uit af te leiden'], answer: 0,
          hints: ['Wat moet je in handen hebben om geld van een adres uit te geven?', 'Kijk in de tracer bij de clusters: welke adressen staan daar samen?', 'Om twee inputs in één transactie uit te geven, heb je van allebei de privésleutel nodig.'],
          wrong: { '1': 'Samenvoegen maakt het volgen juist makkelijker: je ziet welke adressen bij elkaar horen.', '2': 'De beurs komt pas later in beeld. Wie twee inputs in één transactie uitgeeft, moet van beide de sleutel hebben.', '3': 'Wie twee inputs samen uitgeeft, heeft van beide de privésleutel. Dat zegt veel over de eigenaar.' },
          why: 'Clustering koppelt zaken die los van elkaar leken. Twee aangiftes bij verschillende teams kunnen zo één onderzoek worden.',
          explain: 'Common-input-heuristiek: om beide inputs uit te geven heb je beide sleutels nodig. Het adres dat het losgeld van Van Hout ontving en het losgeldadres uit de zaak Tiel zijn dus vermoedelijk van dezelfde groep.' },
        { q: 'Hoeveel BTC uit het losgeld van Van Hout bereikte de beurs? Reken met de haircut-methode.', answer: ['1.5', '1,5', '1.5 btc', '1,5 btc'],
          hints: ['De tracer telt al het vuile geld bij elkaar. Gevraagd is het deel van één slachtoffer.', 'Volg de twee takken vanaf het losgeldadres apart, en reken bij de samenvoeging met de verhouding van de inputs.', 'De ene tak komt zonder menging aan. In de andere is na de samenvoeging twee derde van Van Hout.'],
          wrong: { '2': 'Dat is al het vuile geld bij de beurs, inclusief het losgeld uit de zaak Tiel dat bij de samenvoeging meekwam.', '1': 'Dat is alleen de tak via de samenvoeging. Er komt via een andere tak ook geld van Van Hout binnen.', '0.5': 'Dat is alleen de tak zonder menging. Ook via de samenvoeging komt geld van Van Hout binnen.', '1.2': 'Dat is wat er in de samengevoegde transactie ging, niet wat er bij de beurs aankwam.' },
          why: 'Als losgeld van meerdere slachtoffers wordt gemengd, moet je per slachtoffer kunnen zeggen hoeveel er bij een beurs ligt. Dat bepaalt wat je bij beslag aan wie kunt teruggeven.',
          explain: 'Tak 1: 0,8 naar nm1q-b8d2, daarvan 0,5 via nm1q-e2b7 naar de beurs, volledig van Van Hout. Tak 2: 1,2 van Van Hout plus 0,6 uit Tiel wordt 1,8 op nm1q-d9f0, dus twee derde Van Hout. Van de 1,5 naar de beurs is 1,0 van Van Hout. Samen 1,5 BTC. De tracer toont 2 BTC vuil geld, omdat hij ook Tiel meetelt.' },
      ],
    },
    {
      title: 'Slot 3: de kluis',
      content: `
        <p>Op de in beslag genomen server staat per klus een kluis. Deze hoort bij Van Hout. In de kluis zou het
        overzicht van de groep staan: wie wat deed, en waar de buit heen ging.</p>
      `,
      lab: {
        type: 'crackme',
        title: 'kluis-hout.js',
        intro: 'Fragment van het kluisprogramma op de server van de groep. Voer de sleutel in zoals de code hem verwacht.',
        source: [
          '// Eén kluis per klus. De sleutel kent alleen wie erbij was.',
          '//   wie     = het account waarmee we binnenkwamen',
          '//   wanneer = UU:MM van die eerste aanmelding, in UTC',
          '//   buit    = BTC uit dít losgeld die bij de beurs aankwam',
          '// Vorm: wie|wanneer|buit',
          '',
          'function fnv1a(s) {',
          '  let h = 0x811c9dc5;',
          '  for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; }',
          '  return h;',
          '}',
          '',
          'function check(sleutel) {',
          '  let [wie, wanneer, buit] = sleutel.split(\'|\');',
          '  wie = wie.trim().toLowerCase();',
          '  wanneer = wanneer.trim().padStart(5, \'0\');',
          '  buit = String(Number(buit.trim().replace(\',\', \'.\')));',
          '  return fnv1a(wie + \'|\' + wanneer + \'|\' + buit) === 0x5f2f85d0;',
          '}',
        ].join('\n'),
        check: function (sleutel) {
          var p = String(sleutel).split('|');
          if (p.length !== 3) return false;
          var s = p[0].trim().toLowerCase() + '|' + p[1].trim().padStart(5, '0') + '|' + String(Number(p[2].trim().replace(',', '.')));
          var h = 0x811c9dc5;
          for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
          return h === 0x5f2f85d0;
        },
        flag: 'NM{drie_sloten_een_sleutel}',
        reveal: 'De kluis opent. Het overzicht koppelt de eerste toegang, de overstap naar het beheeraccount en de cash-out bij Beurs NoordMunt aan één groep, die ook achter de zaak Tiel zit.',
        hint: 'Een hash kun je niet terugrekenen. Je hebt drie precieze waarden uit de eerdere sloten nodig.',
      },
      questions: [
        { q: 'Open de kluis. Wat is de vlag?', boss: true, answer: ['NM{drie_sloten_een_sleutel}'],
          hints: ['De code vertelt welke drie dingen je nodig hebt. Je hebt ze alle drie al gezien, als je ze precies goed hebt.', 'Lees de commentaarregels: wie, wanneer en buit komen uit slot 1 en slot 2. Let op tijdzone en op welk deel van het geld bij de beurs.', 'De sleutel heeft de vorm account|UU:MM|bedrag, met de tijd in UTC en alleen het deel van Van Hout.'],
          wrong: { '/^[a-z.]+\\|/': 'Dat is de sleutel. Voer hem in de kluis in; bij succes verschijnt de vlag.', '/^NM\\{/': 'Die vlag hoort niet bij deze kluis.' },
          why: 'In een echt onderzoek klopt een conclusie pas als alle lagen elkaar bevestigen. Eén verkeerde tijdzone of een verkeerd toegerekend bedrag en het verhaal valt om.',
          explain: 'De sleutel is ext.onderhoud|01:12|1.5: het account van de eerste toegang, de tijd in UTC (niet de lokale 03:12) en het deel van Van Hout bij de beurs (niet de 2 BTC die de tracer als vuil toont).' },
      ],
    },
  ],
});
