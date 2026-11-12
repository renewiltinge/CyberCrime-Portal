/* Uitdaging ★★★ — De beheerder die er niet was (zonder handleiding) */

// Alles FICTIEF: Groenhuis Verhuur BV, het klantportaal, de accounts, tokens en adressen zijn verzonnen.
// De tokens zijn alleen om te lezen en te beoordelen; ze horen bij geen enkele echte dienst.
CS.registerRoom({
  id: 'uitdaging-ongetekend-token',
  path: 'uitdagingen',
  order: 10,
  title: '★★★ De beheerder die er niet was',
  icon: '🎫',
  difficulty: 'Moeilijk',
  level: 'Gevorderd',
  checked: '2026-11-12',
  minutes: 60,
  summary: 'Het klantportaal van een verhuurder heeft een complete huurderslijst geëxporteerd, zogenaamd door een beheerder die die avond niet werkte. Lees de tokens, volg de sessies en stel vast wie het was en hoe lang het doorging.',
  objectives: [
    'Een JSON Web Token lezen en beoordelen: header, claims en handtekening',
    'Uit een applicatielog en tokens afleiden welk account er werkelijk achter een verzoek zat',
    'Vaststellen waarom een oplossing het lek niet dichtte, en de schade tellen',
  ],
  terms: [
    { term: 'JSON Web Token (JWT)', def: 'Een token van drie Base64url-delen (header, payload, handtekening) waarmee een server onthoudt wie je bent zonder sessie op te slaan.' },
    { term: 'alg-claim', def: 'Het veld in de header dat zegt hoe het token ondertekend is. Een server hoort zelf te bepalen welk algoritme hij accepteert en dit veld niet blind te volgen.' },
    { term: 'HS256', def: 'HMAC met SHA-256: één gedeeld geheim maakt én controleert de handtekening. Wie het geheim kent, kan elk token maken.' },
    { term: 'Claim', def: 'Een bewering in de payload, zoals sub (wie), rol of iat (uitgegeven op). Een claim is pas te vertrouwen als de handtekening klopt.' },
    { term: 'Sessie-id', def: 'Een kenmerk dat bij het aanmelden wordt toegekend. Komt hetzelfde kenmerk in een ander token terug, dan komt dat token waarschijnlijk uit dezelfde sessie.' },
  ],
  resources: [
    { title: 'RFC 7519 — JSON Web Token', url: 'https://www.rfc-editor.org/rfc/rfc7519' },
    { title: 'OWASP — JSON Web Token Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html' },
  ],
  tasks: [
    {
      title: 'Bron 1 — het applicatielog',
      content: `
        <p>Groenhuis Verhuur BV (fictief) verhuurt woningen en heeft een klantportaal. Op 6 november merkt de privacy officer
        dat er een export van alle huurders is gemaakt op naam van beheerder M. de Vries, op een avond dat zij vrij was.
        Sinds een update op 3 november logt het portaal bij elk beheerverzoek ook het meegestuurde token.</p>
        <p>Zoek uit wie zich als beheerder voordeed en vanaf wanneer. Er is geen stappenplan. Alle tijden zijn UTC.</p>
      `,
      lab: {
        type: 'logs',
        title: 'portaal-app.log (3 tot en met 5 november 2026, UTC)',
        lines: (function () {
          var T = {
            kbos: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrLmJvcyIsInJvbCI6Imh1dXJkZXIiLCJzaWQiOiJTLTQ0NzEiLCJpYXQiOjE3OTM3NDI3MzAsImV4cCI6MTc5Mzc3MTUzMH0.Nke9P4orAZqhPuzKIxDnprQTJjpc1---IwbVbX1yM3g',
            vals1: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJtLmRldnJpZXMiLCJyb2wiOiJiZWhlZXJkZXIiLCJzaWQiOiJTLTQ0NzEiLCJpYXQiOjE3OTM3NDI3MzAsImV4cCI6MTc5NjMzNDczMH0.',
            md1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtLmRldnJpZXMiLCJyb2wiOiJiZWhlZXJkZXIiLCJzaWQiOiJTLTM5MjAiLCJpYXQiOjE3OTM3Nzk1MDAsImV4cCI6MTc5MzgwODMwMH0.h9upHhMxtY3J88mupalQHC5JPLO4AV4rB9T9Q1cB34Q',
            jp1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqLnBldGVycyIsInJvbCI6ImJlaGVlcmRlciIsInNpZCI6IlMtMzkyNSIsImlhdCI6MTc5Mzc4MzU1MSwiZXhwIjoxNzkzODEyMzUxfQ.yX5srQ_BugAuUCsDIJGrPyp8YSWcAREUburScBJ0DRM',
            md2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtLmRldnJpZXMiLCJyb2wiOiJiZWhlZXJkZXIiLCJzaWQiOiJTLTM5MzEiLCJpYXQiOjE3OTM4NjgwNjcsImV4cCI6MTc5Mzg5Njg2N30.QiXVi3l0CCGAQooFNV70nBirJ0msk9ljKwkejMsGujM',
            vals2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtLmRldnJpZXMiLCJyb2wiOiJiZWhlZXJkZXIiLCJzaWQiOiJTLTQ0NzEiLCJpYXQiOjE3OTM5MTM1OTAsImV4cCI6MTc5NjUwNTU5MH0.UwNHNNHWfgNsXINguRtndo7XiumOOAX_UkOapQsAPWE',
          };
          return [
            '2026-11-03T21:40:02Z 10.8.0.22 GET /api/status 200',
            '2026-11-03T21:47:31Z 198.51.100.31 POST /api/login 200 sub=p.jansen (sessie S-4468 aangemaakt)',
            '2026-11-03T21:48:05Z 198.51.100.31 GET /api/mijn/facturen 200 sub=p.jansen',
            '2026-11-03T21:52:10Z 203.0.113.45 POST /api/login 200 sub=k.bos (sessie S-4471 aangemaakt)',
            '2026-11-03T21:53:02Z 203.0.113.45 GET /api/mijn/contract 200 sub=k.bos',
            '2026-11-03T21:55:47Z 203.0.113.45 GET /api/mijn/facturen 200 sub=k.bos',
            '2026-11-03T21:58:40Z 203.0.113.45 GET /api/beheer/gebruikers 403 sub=k.bos reden=onvoldoende rechten',
            '2026-11-03T21:58:40Z DEBUG auth bearer=' + T.kbos,
            '2026-11-03T22:01:15Z 203.0.113.45 GET /api/beheer/gebruikers 401 sub=- reden=algoritme niet toegestaan',
            '2026-11-03T22:01:15Z DEBUG auth bearer=' + T.vals1,
            '2026-11-03T22:10:00Z 10.8.0.5 DEPLOY portaal v4.2.0 (nieuwe tokenbibliotheek)',
            '2026-11-03T22:14:09Z 203.0.113.45 GET /api/beheer/gebruikers 200 sub=m.devries',
            '2026-11-03T22:14:09Z DEBUG auth bearer=' + T.vals1,
            '2026-11-03T22:15:30Z 203.0.113.45 GET /api/beheer/huurders/export 200 sub=m.devries bytes=2488113',
            '2026-11-03T22:15:30Z DEBUG auth bearer=' + T.vals1,
            '2026-11-04T07:58:44Z 198.51.100.62 POST /api/login 200 sub=a.yildiz (sessie S-4472 aangemaakt)',
            '2026-11-04T07:59:10Z 198.51.100.62 GET /api/mijn/onderhoud 200 sub=a.yildiz',
            '2026-11-04T08:05:00Z 10.8.0.14 POST /api/login 200 sub=m.devries (sessie S-3920 aangemaakt)',
            '2026-11-04T08:06:12Z 10.8.0.14 GET /api/beheer/gebruikers 200 sub=m.devries',
            '2026-11-04T08:06:12Z DEBUG auth bearer=' + T.md1,
            '2026-11-04T09:12:31Z 10.8.0.19 POST /api/login 200 sub=j.peters (sessie S-3925 aangemaakt)',
            '2026-11-04T09:14:02Z 10.8.0.19 GET /api/beheer/huurders/export 200 sub=j.peters bytes=2488113',
            '2026-11-04T09:14:02Z DEBUG auth bearer=' + T.jp1,
            '2026-11-04T12:30:18Z 198.51.100.31 GET /api/mijn/facturen 200 sub=p.jansen',
            '2026-11-04T23:40:11Z 203.0.113.45 GET /api/beheer/huurders/export 200 sub=m.devries bytes=2490077',
            '2026-11-04T23:40:11Z DEBUG auth bearer=' + T.vals1,
            '2026-11-05T08:30:00Z 10.8.0.5 DEPLOY portaal v4.2.1 (fix: tokens zonder handtekening weigeren)',
            '2026-11-05T08:41:07Z 10.8.0.14 POST /api/login 200 sub=m.devries (sessie S-3931 aangemaakt)',
            '2026-11-05T08:43:55Z 10.8.0.14 GET /api/beheer/gebruikers 200 sub=m.devries',
            '2026-11-05T08:43:55Z DEBUG auth bearer=' + T.md2,
            '2026-11-05T17:22:40Z 198.51.100.62 GET /api/mijn/onderhoud 200 sub=a.yildiz',
            '2026-11-05T21:02:44Z 198.51.100.150 GET /api/beheer/gebruikers 401 sub=- reden=algoritme niet toegestaan',
            '2026-11-05T21:02:44Z DEBUG auth bearer=' + T.vals1,
            '2026-11-05T21:20:05Z 198.51.100.150 GET /api/beheer/gebruikers 200 sub=m.devries',
            '2026-11-05T21:20:05Z DEBUG auth bearer=' + T.vals2,
            '2026-11-05T21:21:40Z 198.51.100.150 POST /api/beheer/gebruikers 201 sub=m.devries nieuw=svc-rapportage rol=beheerder',
            '2026-11-05T21:21:40Z DEBUG auth bearer=' + T.vals2,
            '2026-11-05T21:30:00Z 10.8.0.22 GET /api/status 200',
          ].join('\n');
        })(),
      },
      questions: [
        { q: 'Vanaf welk IP-adres werd op 3 november een beheerverzoek op naam van m.devries geaccepteerd?', answer: ['203.0.113.45'],
          hints: ['Waar werkt een beheerder normaal vandaan?', 'Filter op /api/beheer en vergelijk de bronadressen met die van de echte aanmeldingen van beheerders.', 'Het is een extern adres dat die avond ook al bij een huurder hoorde.'],
          wrong: { '10.8.0.14': 'Dat is het VPN-adres waarvandaan M. de Vries zich zelf aanmeldt, de ochtend erna.', '198.51.100.150': 'Dat adres verschijnt pas op 5 november.' },
          why: 'Een beheeractie vanaf een adres waarvandaan die beheerder nooit werkt, is een sterk signaal. Een detectieregel op beheerpaden per bronadres had dit dezelfde avond gemeld.',
          explain: 'Om 22:14:09 en 22:15:30 accepteert het portaal beheerverzoeken van 203.0.113.45 op naam van m.devries. Hetzelfde adres meldde zich om 21:52:10 aan als huurder.' },
        { q: 'Op welk moment (UTC, UU:MM:SS) werd voor het eerst een vervalst beheerderstoken geaccepteerd?', answer: ['22:14:09', '2026-11-03 22:14:09', '2026-11-03T22:14:09Z', '221409'],
          hints: ['Niet elke poging slaagde. Let op de statuscode.', 'Zet de verzoeken van dat adres naar /api/beheer op een rij en kijk wat er tussen een weigering en een acceptatie gebeurde.', 'Het eerste geaccepteerde verzoek kwam kort na de deploy van 22:10.'],
          wrong: { '21:58:40': 'Dat verzoek kreeg 403: het eigen huurderstoken had geen beheerrechten.', '22:01:15': 'Dat verzoek kreeg 401: het vervalste token werd toen nog geweigerd.', '22:15:30': 'Dat is de export, maar er was een eerder geslaagd verzoek.' },
          why: 'Een update die een beveiligingscontrole weghaalt, is een klassieke oorzaak. Koppel incidenten daarom altijd aan je deploy-historie.',
          explain: 'Om 22:01:15 werd hetzelfde token nog geweigerd ("algoritme niet toegestaan"). Om 22:10 kwam v4.2.0 met een nieuwe tokenbibliotheek, en om 22:14:09 werd het geaccepteerd.' },
      ],
    },
    {
      title: 'Bron 2 — de tokens',
      content: `
        <p>Het eerste geaccepteerde token staat al in de inspecteur. De andere tokens staan in de DEBUG-regels van het log;
        plak ze erin om ze te vergelijken.</p>
      `,
      lab: { type: 'jwt', token: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJtLmRldnJpZXMiLCJyb2wiOiJiZWhlZXJkZXIiLCJzaWQiOiJTLTQ0NzEiLCJpYXQiOjE3OTM3NDI3MzAsImV4cCI6MTc5NjMzNDczMH0.' },
      questions: [
        { q: 'Welke waarde heeft alg in de header van het token dat om 22:14:09 werd geaccepteerd?', answer: ['none'],
          hints: ['Kijk niet naar wat het token beweert, maar naar hoe het beschermd is.', 'De header is het eerste deel, vóór de eerste punt. De inspecteur decodeert hem voor je.', 'Na de laatste punt staat niets: er is geen handtekening.'],
          wrong: { 'hs256': 'HS256 staat in de tokens van de echte beheerders en in het token van 5 november. Dit token is anders.', 'jwt': 'Dat is de waarde van typ, niet van alg.' },
          why: 'Een server die alg: none accepteert, laat iedereen elke claim invullen. De server moet zelf vastleggen welk algoritme geldig is.',
          explain: 'De header is {"alg":"none","typ":"JWT"} en het derde deel is leeg. Versie 4.2.0 accepteerde zo\'n token gewoon.' },
        { q: 'Welk account zat er werkelijk achter de vervalste tokens? (gebruikersnaam)', answer: ['k.bos'],
          hints: ['Een token zonder handtekening kan van alles beweren. Zoek een kenmerk dat de aanvaller vergat aan te passen.', 'Vergelijk de sid en iat van het vervalste token met de aanmeldregels in het log.', 'Bij welke aanmelding werd sessie S-4471 aangemaakt?'],
          wrong: { 'm.devries': 'Dat beweert het token. Zonder handtekening kan iedereen sub invullen; haar eigen sessies hebben andere nummers.', 'j.peters': 'Die beheerder heeft een eigen, correct ondertekend token met een ander sessienummer.' },
          why: 'Aanvallers passen de claim aan die ze nodig hebben en laten de rest vaak staan. Een overgebleven sessie-id of tijdstempel koppelt het vervalsde token aan een echte aanmelding.',
          explain: 'Het vervalste token heeft sid S-4471 en iat 1793742730 (2026-11-03 21:52:10 UTC). Dat is precies de sessie die om 21:52:10 werd aangemaakt bij de aanmelding van k.bos vanaf 203.0.113.45. Hij paste alleen sub en rol aan en haalde de handtekening weg.' },
      ],
    },
    {
      title: 'Bron 3 — na de patch',
      content: `
        <p>Op 5 november om 08:30 kwam een fix. Toch accepteerde het portaal die avond weer beheerverzoeken die niet van een
        beheerder kwamen, nu met een token dat wel ondertekend was. Een ontwikkelaar vond dit fragment in het JavaScript dat
        het portaal naar elke bezoeker stuurt:</p>
        <pre><code>/* app.4c1e9f.js (geminificeerd, fragment) */
...;window.__PORTAAL_CFG__="65794a6863476b694f694976595842704c335930496977696232316e5a585a70626d63694f694a77636d396b64574e30615755694c434a71643352485a57686c615730694f694a6e636d396c626d683161584d794d444930496977695a475669645764426458526f496a7030636e566c66513d3d";
function laadCfg(){return JSON.parse(atob(hexNaarTekst(window.__PORTAAL_CFG__)))};...</code></pre>
      `,
      lab: { type: 'multidecode', input: '' },
      questions: [
        { q: 'Met welk geheim zijn de HS256-tokens van het portaal ondertekend?', answer: ['groenhuis2024'],
          hints: ['De functie laadCfg vertelt je welke lagen er om de configuratie zitten.', 'Plak de waarde van __PORTAAL_CFG__ in de multi-decoder, en controleer je vondst daarna in de JWT-inspecteur.', 'Het geheim is een bedrijfsnaam met een jaartal; de inspecteur zegt "Handtekening klopt" bij het token van 21:20:05.'],
          wrong: { 'jwtgeheim': 'Dat is de naam van het veld. Gevraagd is de waarde.', '/^[0-9a-f]{40,}$/': 'Dat is nog de gecodeerde waarde. Er zitten twee lagen omheen.' },
          why: 'Alles wat in front-end-JavaScript staat, kan elke bezoeker lezen. Een geheim dat tokens ondertekent, hoort alleen op de server, en hoort lang en willekeurig te zijn.',
          explain: 'Hex, dan Base64, dan JSON: {"jwtGeheim":"groenhuis2024", ...}. Met dat geheim klopt de handtekening van zowel de echte tokens als het token van 21:20:05. De patch dichtte alg: none, maar het geheim lag al op straat.' },
        { q: 'Hoeveel beheerverzoeken van de aanvaller zijn van 3 tot en met 5 november geslaagd (status 2xx)?', boss: true, answer: ['5', 'vijf'],
          hints: ['De aanvaller veranderde na de patch van werkwijze en van adres.', 'Decodeer de token van elk geslaagd beheerverzoek en kijk welke sessie erin staat.', 'Tel alle 2xx-verzoeken naar /api/beheer waarvan het token sessie S-4471 draagt, ook de 201.'],
          wrong: { '3': 'Dat zijn alleen de tokens zonder handtekening. Na de patch ging het door met een ondertekend token vanaf een ander adres.', '4': 'Bijna. Telde je de POST met status 201 mee? Ook dat is een geslaagd verzoek, en een ernstig: er is een beheeraccount bijgemaakt.', '8': 'Je telt ook de geweigerde verzoeken (401 en 403) mee.' },
          why: 'Een patch is pas klaar als je ook nagaat of de aanvaller op een andere manier binnen kan blijven. Hier moet het geheim vervangen worden, en moeten alle uitgegeven tokens en het nieuwe account svc-rapportage vervallen.',
          explain: 'Met alg: none: 22:14:09, 22:15:30 (3 nov) en 23:40:11 (4 nov). Na de patch, vanaf 198.51.100.150 met een HS256-token met hetzelfde sessienummer S-4471: 21:20:05 en 21:21:40 (201, nieuw beheeraccount). Samen 5.' },
      ],
    },
  ],
});
