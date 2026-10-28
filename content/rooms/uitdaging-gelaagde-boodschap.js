/* Uitdaging ★★ — De gelaagde boodschap (zonder handleiding) */

// Alles FICTIEF. Twee bewijsstukken van een in beslag genomen telefoon van een koerier.
const UGB_FACTUUR = '89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 01 00 00 00 01 08 02 00 00 00 90 77 53 de 00 00 00 17 74 45 58 74 41 75 74 68 6f 72 00 46 6f 74 6f 73 74 75 64 69 6f 20 48 61 76 65 6e 60 98 a6 3d 00 00 00 1e 74 45 58 74 43 6f 6d 6d 65 6e 74 00 6b 3d 34 38 34 31 35 36 34 35 34 65 34 62 35 32 34 31 34 31 34 65 5a a6 fa 5f 00 00 00 0c 49 44 41 54 78 9c 63 70 68 38 00 00 02 84 01 81 26 97 a7 2b 00 00 00 00 49 45 4e 44 ae 42 60 82';
const UGB_BERICHT = '553256786157567a5a576367646e4a356347646c626d527164434275626d687949475a32626d746c4948706c6157787549477030494846764945356859586c76595846705953346756575a744947393649474e705a576f67596d5a3263694230616d786c494768705a7942756469427759574e775a5731705953346754485a325a575a686157496763584a6b4945564e6532746c61474670583252795a6e5a7558335a3263575a66616e7079596c39726432567966513d3d';

CS.registerRoom({
  id: 'uitdaging-gelaagde-boodschap',
  path: 'uitdagingen',
  order: 2,
  title: '★★ De gelaagde boodschap',
  icon: '🧅',
  difficulty: 'Moeilijk',
  minutes: 60,
  summary: 'Op de telefoon van een koerier staan een "factuur" en een onleesbaar bericht. Ergens zit de sleutel. Geen stappenplan en geen recept: zoek zelf uit wat de bestanden echt zijn en hoe het bericht in elkaar zit.',
  objectives: [
    'Een bestand beoordelen op zijn inhoud in plaats van zijn naam',
    'Verstopte informatie vinden in de structuur van een bestand',
    'Lagen codering en versleuteling herkennen en in de juiste volgorde terugdraaien',
  ],
  terms: [
    { term: 'Magic bytes', def: 'De vaste eerste bytes waaraan je een bestandstype herkent, los van de extensie.' },
    { term: 'Chain of custody', def: 'De vastgelegde keten van wie een bewijsstuk wanneer had en wat ermee gebeurde; werk altijd op een kopie.' },
    { term: 'Codering vs. versleuteling', def: 'Codering (hex, Base64) maakt data alleen anders leesbaar en heeft geen sleutel; versleuteling vereist een sleutel.' },
  ],
  resources: [
    { title: 'Wikipedia — lijst van bestandssignaturen', url: 'https://en.wikipedia.org/wiki/List_of_file_signatures' },
  ],
  tasks: [
    {
      title: 'Bewijsstuk 1 — factuur.pdf',
      content: `
        <p>De recherche heeft de telefoon van een koerier onderzocht in een smokkelzaak (fictief). In de downloads staat
        <code>factuur.pdf</code>. Het bestand opent niet in een pdf-lezer.</p>
      `,
      lab: { type: 'hexviewer', filename: 'factuur.pdf', hex: UGB_FACTUUR },
      questions: [
        { q: 'Wat voor bestand is factuur.pdf werkelijk? (bestandstype)', answer: ['png', 'een png', 'png-afbeelding', 'png afbeelding'], hint: 'Een extensie is maar een naam.', explain: 'De eerste bytes 89 50 4E 47 zijn de handtekening van een PNG-afbeelding.' },
        { q: 'Welke sleutel staat er verstopt in het bestand? (in leesbare tekst, hoofdletters)', answer: ['HAVENKRAAN'], hint: 'Niet alles in de leesbare kolom is al leesbaar.', explain: 'In een tEXt-blok staat "k=4841564…": hex voor HAVENKRAAN.', xp: 20 },
      ],
    },
    {
      title: 'Bewijsstuk 2 — het bericht',
      content: `
        <p>In een chat-app op dezelfde telefoon staat één bericht van een onbekend nummer, verstuurd een dag voor de levering.</p>
      `,
      lab: { type: 'multidecode', input: UGB_BERICHT },
      questions: [
        { q: 'Hoeveel lagen codering (zonder sleutel) zitten er om het versleutelde bericht?', answer: ['2', 'twee'], hint: 'Pel af tot je tekst ziet die op een zin lijkt, maar nog niet te lezen is.', explain: 'Hex, daarbinnen Base64, daarbinnen een versleutelde tekst. Viel het je op dat de automatische ketting hier "Atbash" voorstelde? Een tool kiest op statistiek; bij versleutelde tekst gokt hij mis. Handmatig afpellen (klik Hex, dan Base64) is de weg.' },
      ],
    },
    {
      title: 'Het bericht lezen',
      content: `
        <p>Wat staat er in het bericht?</p>
      `,
      lab: { type: 'cipher', text: '' },
      questions: [
        { q: 'Met welk klassiek cijfer is het bericht versleuteld?', options: ['Vigenère', 'Caesar', 'Atbash', 'XOR met één byte'], answer: 0, explain: 'Een woordsleutel van tien letters, toegepast op alleen de letters: Vigenère.' },
        { q: 'Naar welke haven wordt de levering verplaatst?', answer: ['Waalhaven', 'de Waalhaven'], hint: 'Je hebt alles al.', explain: '"Levering verplaatst naar kraan zeven op de Waalhaven."' },
        { q: 'Hoe laat is de afspraak? (UU:MM)', answer: ['02:05', '2:05', '14:05', '0205'], hint: 'In woorden geschreven.', explain: '"Vijf over twee".' },
        { q: 'Welke vlag staat in het bericht?', answer: ['NM{kraan_zeven_vijf_over_twee}'], encoded: true, hint: 'Ook de vlag zelf was versleuteld.', explain: 'Hex → Base64 → Vigenère met HAVENKRAAN.', xp: 30 },
      ],
    },
  ],
});
