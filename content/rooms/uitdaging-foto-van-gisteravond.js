/* Uitdaging ★★★★: De foto van gisteravond (zonder handleiding) */

// Alles FICTIEF: Ter Horst, de afperser en de bouwplaats zijn verzonnen.
// bewijs.png is een echte, geldige PNG (1x1, met juiste CRC's) met daarachter een echt, ongecomprimeerd ZIP-archief.
CS.registerRoom({
  id: 'uitdaging-foto-van-gisteravond',
  path: 'uitdagingen',
  order: 8,
  title: '★★★★ De foto van gisteravond',
  icon: '📷',
  difficulty: 'Moeilijk',
  level: 'Expert',
  checked: '2026-11-12',
  minutes: 75,
  summary: 'Een afperser stuurt een foto "van gisteravond". Het bestand vertelt drie verschillende dingen over zijn eigen leeftijd. Welke tijd is echt, wat zit er achter het einde van de afbeelding, en hoe oud is de foto werkelijk? Geen stappenplan.',
  objectives: [
    'De structuur van een PNG-bestand byte voor byte lezen en data achter het einde herkennen',
    'Tijdstempels in verschillende vormen (tekst, binair, Windows FILETIME) vinden, omrekenen en tegen elkaar afwegen',
    'Meerdere sporen combineren tot één onderbouwde conclusie over de echte opnamedatum',
  ],
  terms: [
    { term: 'PNG-chunk', def: 'Een PNG bestaat uit blokken: lengte (4 bytes), type (4 letters), data en een CRC (4 bytes). IHDR staat vooraan, IEND sluit de afbeelding af.' },
    { term: 'Appended data', def: 'Gegevens achter het officiële einde van een bestand. Een viewer negeert ze, een hexviewer niet. Een bekende manier om iets te verstoppen.' },
    { term: 'tIME-chunk', def: 'Het PNG-blok met de laatste wijziging van de afbeelding: jaar (2 bytes), maand, dag, uur, minuut, seconde, in UTC.' },
    { term: 'Windows FILETIME', def: 'Een 64-bits getal: het aantal intervallen van 100 nanoseconden sinds 1 januari 1601 UTC. Gebruikt door NTFS en Windows.' },
    { term: 'Local file header', def: 'Het begin van elk bestand in een ZIP-archief, herkenbaar aan 50 4B 03 04 (PK..). Bij methode 0 (stored) staat de inhoud er onversleuteld en ongecomprimeerd achter.' },
  ],
  resources: [
    { title: 'W3C: Portable Network Graphics (PNG) Specification', url: 'https://www.w3.org/TR/png-3/' },
    { title: 'PKWARE: APPNOTE.TXT, de ZIP-specificatie', url: 'https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT' },
  ],
  tasks: [
    {
      title: 'Bewijs: bewijs.png',
      content: `
        <p>Bouwbedrijf Ter Horst (fictief) krijgt op 11 november 2026 een anonieme mail met een foto van een steiger zonder
        leuningen op een van zijn bouwplaatsen. "Gisteravond gemaakt. Betaal, of de foto gaat naar de inspectie." De
        uitvoerder zweert dat die steiger dit voorjaar is vervangen.</p>
        <p>Je hebt het bestand zoals het bij de mail zat. Zoek uit wat erin zit. Er is geen stappenplan.</p>
      `,
      lab: { type: 'hexviewer', filename: 'bewijs.png', hex: "89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 01 00 00 00 01 08 02 00 00 00 90 77 53 de 00 00 00 1e 74 45 58 74 43 72 65 61 74 69 6f 6e 20 54 69 6d 65 00 32 30 32 36 2d 31 31 2d 31 30 20 32 31 3a 34 30 e9 18 9e af 00 00 00 17 74 45 58 74 53 6f 66 74 77 61 72 65 00 46 6f 74 6f 42 65 77 65 72 6b 20 33 2e 32 68 2b bf b0 00 00 00 07 74 49 4d 45 07 ea 0b 0a 14 29 07 a2 6b 42 d5 00 00 00 0c 49 44 41 54 78 9c 63 e8 ca b5 01 00 02 b8 01 34 0b 55 a4 9c 00 00 00 00 49 45 4e 44 ae 42 60 82 50 4b 03 04 0a 00 00 00 00 00 c0 ac 6a 5d 9a 3b 35 f8 3a 00 00 00 3a 00 00 00 0d 00 00 00 6f 72 69 67 69 6e 65 65 6c 2e 74 78 74 44 61 74 65 54 61 6b 65 6e 3d 31 33 33 39 34 33 32 37 31 30 30 30 30 30 30 30 30 30 0a 4b 65 6e 6d 65 72 6b 3d 51 56 70 37 62 6e 42 31 5a 33 4a 6c 58 33 5a 79 59 58 46 39 0a 50 4b 01 02 1e 03 0a 00 00 00 00 00 c0 ac 6a 5d 9a 3b 35 f8 3a 00 00 00 3a 00 00 00 0d 00 00 00 00 00 00 00 00 00 00 00 a4 81 00 00 00 00 6f 72 69 67 69 6e 65 65 6c 2e 74 78 74 50 4b 05 06 00 00 00 00 01 00 01 00 3b 00 00 00 65 00 00 00 00 00" },
      questions: [
        { q: 'Op welke offset begint de data die niet meer bij de afbeelding hoort? (hex, bijvoorbeeld 0x1f)',
          answer: ['0xa5', 'a5', '0x000000a5', '000000a5', '165'],
          hints: ['Een afbeelding houdt ergens op. Het bestand niet altijd.',
                  'Zoek het blok dat een PNG afsluit en kijk wat er na zijn controlegetal nog komt. De spiekbrief noemt de handtekening van wat daar begint.',
                  'IEND, dan vier bytes CRC (ae 42 60 82), en direct daarna 50 4B 03 04.'],
          wrong: { '/^(0x)?0*(99|9d|a1)$|^(153|157|161)$/': 'Dat valt nog binnen het IEND-blok (lengte, type of CRC). Wat er niet meer bij hoort, begint pas na de CRC.',
                   '/^(0x)?0*a0$|^160$/': 'Dat is het begin van de regel. Tel binnen de regel door tot de handtekening.' },
          explain: 'Het IEND-blok begint op 0x99: lengte 00 00 00 00, type IEND, CRC ae 42 60 82. Daar stopt een PNG-lezer. Op 0xa5 (165) begint 50 4B 03 04: een ZIP-archief, methode 0 (niet gecomprimeerd), met het bestand origineel.txt. Het bestand is daardoor tegelijk een geldige PNG en een geldige ZIP.',
          why: 'Een viewer laat alleen de afbeelding zien. Wie bewijsmateriaal beoordeelt, kijkt naar de bytes en naar wat er ná het einde staat.' },
        { q: 'Hoe laat is de afbeelding voor het laatst bewerkt volgens de binaire tijdstempel in de PNG? (UTC, UU:MM)',
          answer: ['20:41', '20:41:07'],
          hints: ['Er staat meer dan één tijd in de PNG. Eén ervan is geen leesbare tekst.',
                  'Zoek het blok tIME. Volgens de standaard: twee bytes jaar, dan maand, dag, uur, minuut en seconde, in UTC.',
                  'Uur en minuut zijn 0x14 en 0x29. Reken ze om naar decimaal.'],
          wrong: { '14:29': 'Je las de hexwaarden als decimale getallen. 0x14 is 20 en 0x29 is 41.',
                   '21:40': 'Dat is de tekst bij Creation Time, die iedereen kan intikken. Gevraagd is het binaire tIME-blok.',
                   '/^21:41/': 'Dat is de Nederlandse tijd. Het tIME-blok staat in UTC.' },
          explain: 'tIME = 07 EA 0B 0A 14 29 07: 2026-11-10 20:41:07 UTC, in Nederland 21:41 (wintertijd). Dat is één minuut na de ingetikte Creation Time van 21:40. Het tIME-blok zegt wanneer FotoBewerk het bestand opsloeg: een bewerkingstijd, geen opnametijd.' },
      ],
    },
    {
      title: 'Het kenmerk',
      content: `
        <p>De maker liet in het bestand iets achter dat niet voor de ontvanger bedoeld lijkt. Het invoerveld is leeg.</p>
      `,
      lab: { type: 'multidecode', input: '' },
      questions: [
        { q: 'Welke vlag zit verstopt in het bestand?',
          answer: ["NM{achter_iend}"],
          encoded: true,
          hints: ['Niet alles in het verborgen bestand is een tijd.',
                  'Het kenmerk gebruikt het alfabet van Base64. Neem de waarde achter het =-teken over in de decoder.',
                  'Na Base64 lijkt het al op een vlag, maar de letters zijn verschoven: ROT13.'],
          wrong: { 'az{npugre_vraq}': 'Bijna. De letters zijn nog verschoven; pel nog een laag af.' },
          explain: 'Kenmerk=QVp7bnB1Z3JlX3ZyYXF9 → Base64 → AZ{npugre_vraq} → ROT13 → de vlag. Twee lagen codering, geen versleuteling.' },
      ],
    },
    {
      title: 'Hoe oud is de foto?',
      content: `
        <p>De advocaat van Ter Horst wil in haar antwoord aan de afperser één getal noemen: hoeveel ouder de foto is dan beweerd.
        Ze wil dat getal kunnen onderbouwen.</p>
      `,
      lab: { type: 'timestamp' },
      questions: [
        { q: 'In welke tijdstempelnotatie staat de waarde DateTaken in het verborgen bestand?',
          answer: ['Windows FILETIME', 'filetime', 'windows-filetime', 'ntfs filetime', 'windows filetime (ntfs)'],
          hints: ['Achttien cijfers is te veel voor een gewone Unix-tijd.',
                  'Zet het getal in de omrekenaar en kijk welke uitleg een geloofwaardige datum oplevert.',
                  'De notatie van Windows en NTFS: intervallen van 100 nanoseconden sinds 1601.'],
          wrong: { '/unix/i': 'Als Unix-tijd, in seconden of milliseconden, levert dit getal geen bestaande datum op.',
                   '/chrome|webkit/i': 'Die rekent in microseconden sinds 1601. Dan kom je duizenden jaren in de toekomst uit.' },
          explain: '133943271000000000 als FILETIME is 2025-06-13 22:25:00 UTC. Alle andere uitleggen geven geen geloofwaardige datum.' },
        { q: 'Hoeveel dagen vóór de beweerde datum is de foto werkelijk gemaakt? (reken met de datums in Nederlandse tijd)',
          answer: ['514'],
          boss: true,
          hints: ['Je hebt twee datums nodig: wat de afperser beweert, en wat het bestand zelf verraadt.',
                  'Neem de Nederlandse tijd van DateTaken uit de omrekenaar, niet de UTC-datum. Tel het verschil in kalenderdagen tot de beweerde avond.',
                  'Van 14 juni 2025 tot 10 november 2026.'],
          wrong: { '515': 'Je rekende vanaf 13 juni, de UTC-datum. In Nederland was het om 22:25 UTC al 00:25 op 14 juni (zomertijd).',
                   '/^(0|1)$/': 'Dat is het verschil tussen de Creation Time en het tIME-blok: beide zeggen alleen wanneer het bestand bewerkt is.' },
          explain: 'DateTaken 133943271000000000 = 2025-06-13 22:25:00 UTC = 14 juni 2025 00:25 in Nederland. Beweerd: 10 november 2026. Verschil: 514 dagen. De Creation Time is ingetikt, het tIME-blok toont de bewerking, en alleen het verstopte origineel zegt iets over de opname. Die past bij de oude steiger.',
          why: 'Metadata kun je vervalsen, maar wie vervalst, vergeet vaak een spoor. Leg elke tijd vast met bron, notatie en tijdzone, en trek pas een conclusie als de sporen samen een verhaal vertellen.' },
      ],
    },
  ],
});
