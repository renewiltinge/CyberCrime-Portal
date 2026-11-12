/* Uitdaging ★★ — De kapotte back-up (zonder handleiding) */

// Alles FICTIEF: De Glimlach, de patiënten, de beheerder en de sleutel zijn verzonnen.
// De back-ups zijn echt doorgerekend: SQL-dump → XOR met de sleutel → Base64. Twee bestanden zijn beschadigd.
CS.registerRoom({
  id: 'uitdaging-kapotte-backup',
  path: 'uitdagingen',
  order: 5,
  title: '★★ De kapotte back-up',
  icon: '💾',
  difficulty: 'Gemiddeld',
  level: 'Praktijk',
  checked: '2026-11-12',
  minutes: 45,
  summary: 'Een tandartspraktijk is zijn database kwijt. Er zijn back-ups, maar niemand heeft er ooit een teruggezet, en de man die ze maakte is weg. Welke is nog heel, en hoe krijg je hem open? Geen stappenplan.',
  objectives: [
    'De integriteit van back-ups zelf controleren met checksums',
    'Uit een script en achtergelaten notities afleiden hoe gegevens zijn versleuteld en waar de sleutel is',
    'Codering en versleuteling in de juiste volgorde terugdraaien en het resultaat controleren',
  ],
  terms: [
    { term: 'Checksum', def: 'Een hash (bijvoorbeeld SHA-256) van een bestand, vastgelegd bij het maken. Wijkt de hash later af, dan is het bestand veranderd of beschadigd.' },
    { term: 'Bitrot', def: 'Stille beschadiging van opgeslagen gegevens: een paar bits of tekens veranderen zonder dat het bestand kleiner wordt of een foutmelding geeft.' },
    { term: 'XOR-versleuteling', def: 'Elke byte wordt met een byte van de sleutel ge-XORd. Dezelfde bewerking met dezelfde sleutel draait het terug. Met een herhaalde, korte sleutel is dit zwakke versleuteling.' },
    { term: 'Base64', def: 'Een codering die bytes als leesbare tekens schrijft. Er is geen sleutel: iedereen kan het terugdraaien.' },
    { term: 'Hersteltest', def: 'Een back-up echt terugzetten op een testomgeving. Pas dan weet je dat hij bruikbaar is.' },
  ],
  resources: [
    { title: 'Wikipedia: XOR cipher', url: 'https://en.wikipedia.org/wiki/XOR_cipher' },
    { title: 'Wikipedia: Data degradation (bitrot)', url: 'https://en.wikipedia.org/wiki/Data_degradation' },
  ],
  tasks: [
    {
      title: 'Bewijs: de NAS en de oude beheerserver',
      content: `
        <p>Tandartspraktijk De Glimlach (fictief) is na een stroomstoring zijn databaseserver kwijt. Op de NAS staan back-ups van de
        patiëntendatabase. De beheerder die ze instelde, vertrok deze zomer. Niemand heeft ooit geprobeerd er een terug te zetten.</p>
        <p>Je hebt toegang tot de NAS en tot de oude beheerserver, maar niet als root. Zoek uit welke back-up bruikbaar is en hoe hij
        open gaat. Er is geen stappenplan.</p>
      `,
      lab: {
        type: 'terminal',
        user: 'herstel', host: 'beheer-01',
        home: '/mnt/nas/backup', cwd: '/mnt/nas/backup',
        motd: 'De Glimlach, beheerserver. Typ help voor de beschikbare commando\'s.',
        fs: {
          "/mnt/nas/backup/SHA256SUMS": "25b360c482a2c56a510d6002afcad4482959b4cfb64a042d2dc621d5f668a39c  patienten-2026-10-19.sql.xor.b64\n0c14512941946849d1a62081730d26c7604fd2211d9e67595acd372e554a284f  patienten-2026-10-26.sql.xor.b64\nf686eb8b682791f6b0bcbe2bdf11ad3d9962a3428d3655edccbf941478efea89  patienten-2026-11-02.sql.xor.b64\n13faf6970631698608549ae816b369ed748aa4abc926090b1bef1711f1fad4e5  patienten-2026-11-09.sql.xor.b64\n",
          "/mnt/nas/backup/patienten-2026-10-26.sql.xor.b64": "QEJMERMTXEMEBQcFFB9HFykKTCYNG1pbDAwETUFABwVbQl1RTEABF11dVlFReHRlKC44JEEmdnUhKkwRAAZeUgMbCQ9BWl5TTSYiNU1SWVYMAkw3ICB0fyw9RFdRWxsXCgoODhMXWRcpLjgkTVJbVgwbHxUELVRYAxseDg0XF3MsOylIWnh+eT4qPjVBO3ljIk8cABUbUlkZCgJBNzN7Yig8TElQXhB2Q08IBEEwWFIfSEBGUEsCD0BfWExQQBAbSl1cU1dfBw5AXFxGSEk9fiM8KTM1Un55OSBMEQAGXlIDGwkPQSR2ezgqP0FJQBsQIEFMOAgeWlYXSEBGUEsPAEBeXUxRQRAbSl1cU1dfBgdAXlhGSEk9fiM8KTM1Un55OSBMEQAGXlIDGwkPQSR2ezgqP0FJQRsQJ0FMMQgXQ1IfHAkPRl4QBV1eXUxRRBoFXEhARlNCBQFAX1RMUEsQHlZlJS8yN2VjTSYiNS5SR1YZBgkPFRdZFzsuIDQkIRcfWUNLMk9SQVYDTygADFUbEFxWW1NMQgUaXVdLTUZABwVbQl1RTEAGEERUZigvIXJlOU8lLzU9F0cMGwUEDwZSWU05LS00N2QXRVpARjNcF3oMBw0DCBdFEEFIXVhYRxoHVEJdVkZeEAVdXVpMUUUaB19IRVprO3lkKD04QSg8Y3hNHw0VCBdZQwgBTDcgPmJyPk9EV01VexlNJwkPBQBeXB5IQEZTQgcDQF9dTFNLEBtKXVxTV18GB0BfW0ZIST1+IzwpMzVSfnk5IEwRAAZeUgMbCQ9BJHZ7OCo/QUlFGxAmQUwjDgEQG0peVVVYXwYFQF1YRk1VBQdfWUFRV18GBkpGV2siIHJ2OSpMNSAwe3JNDgoSEQBWXAgBTEkRE0NeCAEYQSg8YxtNCw0VFB8Xcyw7KTUoP3IbTQ0JCQAcU1IBDg0TQSR2ZS4nLTNJQQceRFRmKC8hcmU5TyUvNT0XVgscHBMAGVJZTTktLTQ3ZBdFXUBGU0IFAUBeXUxRRhcHVFVfUUZeEEMMAQgAEwZEFzsKCQ8SBkVWSkZXayg8ZHI/O0woLyZ4FwwJHxETE1xSA086IC0ncmRNR1hNRkAHBVtCXVBMQgIXXFtWUVFVGxAAAAIFCQtQXggBBRIVUnxFDAIJE0ZbDD0kIT8kMyYXfiM7I0EAFERHHw4HBA9SYXYhOikyQVoBG0pdXFNXXwYGQF5dQVBCDQZYSEBGFRNZUwwdGBJBJFJSAxwYEwBVHgxnQkFBCRdFRBkKABUEAUMNTSEhGgAeW1IIATMEBBxoUAgbCRIVF2hVDAwHFBEtQ1IBGxFr",
          "/mnt/nas/backup/patienten-2026-11-02.sql.xor.b64": "QEJMERMTXEMEBQcFFB9HFykKTCYNG1pbDAwETUFABwVbQl1QTEIFF11dVlFReHRlKC44JEEmdnUhKkwRAAZeUgMbCQ9BWl5TTSYiNU1SWVYMAkw3ICB0fyw9RFdRWxsXCgoODhMXWRcpLjgkTVJbVgwbHxUELVRYAxseDg0XF3MsOylIWnh+eT4qPjVBO3ljIk8cABUbUlkZCgJBNzN7Yig8TElQXhB2Q08IBEEwWFIfSEBGUEsCD0BfWExQQBAbSl1cU1dfBw5AXFxGSEk9fiM8KTM1Un55OSBMEQAGXlIDGwkPQSR2ezgqP0FJQBsQIEFMOAgeWlYXSEBGUEsPAEBeXUxRQRAbSl1cU1dfBgdAXlhGSEk9fiM8KTM1Un55OSBMEQAGXlIDGwkPQSR2ezgqP0FJQRsQJ0FMMQgXQ1IfHAkPRl4QBV1eXUxRRBoFXEhARlNCBQFAX1RMUEsQHlZlJS8yN2VjTSYiNS5SR1YZBgkPFRdZFzsuIDQkIRcfWUNLMk9SQVYDTygADFUbEFxWW1NMQgUaXVdLTUZABwVbQl1RTEAGEERUZigvIXJlOU8lLzU9F0cMGwUEDwZSWU05LS00N2QXRVpARjNcF3oMBw0DCBdFEEFIXVhYRxoHVEJdVkZeEAVdXVpMUUUaB19IRVprO3lkKD04QSg8Y3hNHw0VCBdZQwgBTDcgPmJyPk9EV01VexlNJwkPBQBeXB5IQEZTQgcDQF9dTFNLEBtKXVxTV18GB0BfW0ZIST1+IzwpMzVSfnk5IEwRAAZeUgMbCQ9BJHZ7OCo/QUlFGxAmQUwjDgEQG0peVVVYXwYFQF1YRk1VBQdfWUFRV18GBkpGV2soPGRyPztMKC8meBcdDhgIBBxDUgNPOiAtJ3JkTUdUTUYmGRcjCBkYBBwQG0peVVhRXwcCQFxcRk1VBQdfWUFQUV8FDkpGV2siIHJ2OSpMNSAwe3JNDgoSEQBWXAgBTEkRE0NeCAEYQSg8YxtNCw0VFB8Xcyw7KTUoP3IbTQ0JCQAcU1IBDg0TQSR2ZS4nLTNJQQceRFRmKC8hcmU5TyUvNT0XVgscHBMAGVJZTTktLTQ3ZBdFXUBGU0IFAUBeXUxRRhcHVFVfUUZeEEMMAQgAEwZEFzsKCQ8SBkVWSkZXayg8ZHI/O0woLyZ4FwwJHxETE1xSA086IC0ncmRNR1hNRkAHBVtCXVBMQgIXXFtWUVFVGxAAAAIFCQtQXggBBRIVUnxFDAIJE0ZbDD0kIT8kMyYXfiM7I0EAFERHHw4HBA9SYXYhOikyQVoBG0pdXFNXXwYGQF5dQVBCDQZYSEBGFRNZUwwdGBJBJFJSAxwYEwBVHgxnQkFBCRdFQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtQ1IBGxFr",
          "/mnt/nas/backup/patienten-2026-11-09.sql.xor.b64": "QEJMERMTXEMEBQcFFB9HFykKTCYNG1pbDAwETUFABwVbQl1QTEIOF11dVlFReHRlKC44JEEmdnUhKkwRAAZeUgMbCQ9BWl5TTSYiNU1SWVYMAkw3ICB0fyw9RFdRWxsXCgoODhMXWRcpLjgkTVJbVgwbHxUELVRYAxseDg0XF3MsOylIWnh+eT4qPjVBO3ljIk8cABUbUlkZCgJBNzN7Yig8TElQXhB2Q08IBEEwWFIfSEBGUEsCD0BfWExQQBAbSl1cU1dfBw5AXFxGSEk9fiM8KTM1Un55OSBMEQAGXlIDGwkPQSR2ezgqP0FJQBsQIEFMOAgeWlYXSEBGUEsPAEBeXUxRQRAbSl1cU1dfBgdAXlhGSEk9fiM8KTM1Un55OSBMEQAGXlIDGwkPQSR2ezgqP0FJ",
          "/opt/backup/maak-backup.sh": "#!/bin/sh\n# Nachtelijke back-up van de praktijkdatabase. B. Kok, 2024.\n# Draait elke maandag om 02:00 (cron).\nDATUM=$(date +%F)\nKEY=$(base64 -d /etc/backup/sleutel)\nmysqldump praktijk \\\n  | python3 /opt/backup/xor.py \"$KEY\" \\\n  | base64 -w0 > /mnt/nas/backup/patienten-$DATUM.sql.xor.b64\ncd /mnt/nas/backup && sha256sum patienten-$DATUM.sql.xor.b64 >> SHA256SUMS\n",
          "/opt/backup/xor.py": "# Eenvoudige \"versleuteling\" voor de back-up. B. Kok.\nimport sys\nkey = sys.argv[1].encode()\ndata = sys.stdin.buffer.read()\nsys.stdout.buffer.write(bytes(b ^ key[i % len(key)] for i, b in enumerate(data)))\n",
          "/etc/backup/sleutel": "(geen toegang)\n",
          "/home/bkok/overdracht.txt": "Voor wie mij opvolgt (B. Kok, laatste werkdag 31-07-2026)\n\n- De back-up draait elke maandag om 02:00. Het script staat in /opt/backup.\n- Een hersteltest heb ik nooit gedaan. Sorry.\n- De back-upsleutel staat in /etc/backup/sleutel. Kun je daar niet bij: het is\n  hetzelfde als het wifi-wachtwoord van de behandelkamers. Staat in de wiki-export.\n",
          "/home/bkok/wiki-export/wifi.md": "# Wifi in de praktijk\n\n| Netwerk           | Voor wie          | Wachtwoord                     |\n|-------------------|-------------------|--------------------------------|\n| Glimlach-Gast     | wachtkamer        | welkom2026                     |\n| Glimlach-Balie    | balie en kantoor  | zie de kluis bij de balie      |\n| Glimlach-Behandel | behandelkamers    | bW9sYWFyNzc= (Base64, niet uitprinten) |\n",
          "/home/bkok/wiki-export/back-ups.md": "# Back-ups\n\nScript: /opt/backup/maak-backup.sh\nBestemming: NAS, map backup. Na vier weken handmatig opruimen.\nHerstellen: nog uitzoeken.\n",
          "/home/bkok/.bash_history": "crontab -l\nsudo nano /opt/backup/maak-backup.sh\nls -la /mnt/nas/backup\nsudo cat /etc/backup/sleutel\nrm /mnt/nas/backup/patienten-2026-07-20.sql.xor.b64\nexit\n"
        },
        denied: ['/etc/backup/sleutel'],
        owners: { '/etc/backup/sleutel': 'root' },
        modes: { '/etc/backup/sleutel': '-r--------', '/opt/backup/maak-backup.sh': '-rwxr-xr-x' },
      },
      questions: [
        { q: 'Welk back-upbestand is als enige nog intact? (bestandsnaam)',
          answer: ['patienten-2026-10-26.sql.xor.b64', '/mnt/nas/backup/patienten-2026-10-26.sql.xor.b64', '2026-10-26'],
          hints: ['De nieuwste is niet vanzelf de beste.',
                  'Naast de back-ups staat een lijst met controlegetallen. Reken zelf na met sha256sum en vergelijk.',
                  'Twee hashes wijken af. Alleen de back-up van eind oktober klopt.'],
          wrong: { '/11-09/': 'De nieuwste, maar ls -l laat zien dat hij veel kleiner is dan de andere: het schrijven is afgebroken door de stroomstoring. Ook de hash klopt niet.',
                   '/11-02/': 'Even groot als verwacht, maar de hash klopt niet met SHA256SUMS. Er zijn onderweg tekens veranderd (bitrot).',
                   '/10-19/': 'Die staat nog in SHA256SUMS, maar het bestand zelf is al opgeruimd.' },
          explain: 'sha256sum geeft alleen voor patienten-2026-10-26.sql.xor.b64 dezelfde hash als SHA256SUMS. De back-up van 9 november is afgebroken (412 tekens), die van 2 november heeft de juiste grootte maar een andere hash.',
          why: 'Een back-up zonder controle is een hoop, geen back-up. Controleer checksums automatisch en doe regelmatig een hersteltest.' },
        { q: 'Met welke sleutel zijn de back-ups versleuteld? (leesbare tekst)',
          answer: ['molaar77'],
          hints: ['Het script weet waar de sleutel staat, maar daar kom jij niet bij. Iemand anders wist het ook.',
                  'Lees wat de vorige beheerder in zijn thuismap achterliet, en volg zijn verwijzing.',
                  'Het wifi-wachtwoord van de behandelkamers staat in Base64. Decodeer het, bijvoorbeeld met echo … | base64 -d.'],
          wrong: { 'bW9sYWFyNzc=': 'Dat is nog Base64. Het script doet base64 -d op het sleutelbestand; de sleutel is wat eruit komt.',
                   'welkom2026': 'Dat is het wachtwoord van het gastnetwerk in de wachtkamer.' },
          explain: 'overdracht.txt verwijst naar het wifi-wachtwoord van de behandelkamers. In wifi.md staat bW9sYWFyNzc=, en base64 -d maakt daar molaar77 van. Dat past bij het script: KEY=$(base64 -d /etc/backup/sleutel).',
          why: 'Een sleutel die ook een wifi-wachtwoord is en in een wiki staat, beschermt niets. Bewaar back-upsleutels apart, bijvoorbeeld in een kluis met twee beheerders.' },
      ],
    },
    {
      title: 'Herstel',
      content: `
        <p>Zet de back-up terug. Het invoerveld is leeg: je kiest zelf wat je erin zet.</p>
      `,
      lab: { type: 'cyberchef', input: '' },
      questions: [
        { q: 'Hoeveel patiënten kun je terugzetten?',
          answer: ['7', 'zeven'],
          hints: ['Eerst herstellen, dan tellen.',
                  'Draai de stappen van het script in omgekeerde volgorde terug: wat het als laatste deed, doe jij als eerste.',
                  'Base64 decoderen, dan XOR met de sleutel. Tel de INSERT-regels van de tabel patienten.'],
          wrong: { '8': 'Dat aantal haal je uit een back-up van november. Die zijn beschadigd: je kunt ze niet vertrouwen.',
                   '10': 'Je telde de afspraken mee. Gevraagd is het aantal patiënten.' },
          explain: 'De back-up van 26 oktober bevat zeven patiënten. Patiënt 8 kwam later en staat alleen in de beschadigde back-ups: die moet de praktijk opnieuw invoeren.' },
        { q: 'Welke vlag staat in de herstelde back-up?',
          answer: ['NM{alleen_een_geteste_backup_telt}'],
          encoded: true,
          boss: true,
          hints: ['Als het herstel lukt, staat er onderaan een controleregel.',
                  'Zie je onleesbare tekens? Dan gebruik je het verkeerde bestand, of de sleutel nog in Base64.',
                  'Recept: Base64 decoderen, daarna XOR met molaar77. De laatste regel begint met -- hersteltest.'],
          wrong: { '/telt\\}$/': 'Het eind klopt, maar het begin van de regel is verminkt. Dat is de beschadigde back-up van 2 november.' },
          explain: 'patienten-2026-10-26.sql.xor.b64 → Base64 decoderen → XOR met "molaar77" geeft een leesbare SQL-dump met als laatste regel de vlag.',
          why: 'Een hersteltest laat zien wat een checksum niet kan: dat je de sleutel nog hebt en weet hoe het terug moet.' },
      ],
    },
  ],
});
