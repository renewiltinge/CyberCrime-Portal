/* Uitdaging ★★★ — De onverklaarde geldstroom (zonder handleiding) */

// Alles FICTIEF: Kade Transport BV, Meridiaan Advies BV, de personen en de rekeningen zijn verzonnen.
const UOG_BANK = [
  { date: '02-03', amount: 48000, desc: 'Klant: Havenbedrijf Noord' },
  { date: '02-05', amount: -12500, desc: 'Leverancier X Brandstof' },
  { date: '02-09', amount: -9750, desc: 'Meridiaan Advies BV' },
  { date: '02-12', amount: -3200, desc: 'Loonheffing' },
  { date: '02-16', amount: -9850, desc: 'Meridiaan Advies BV' },
  { date: '02-18', amount: 22000, desc: 'Klant: Bouwgroep Oost' },
  { date: '02-23', amount: -9900, desc: 'Meridiaan Advies BV' },
  { date: '02-25', amount: -1150, desc: 'Energie Zuid' },
  { date: '03-02', amount: -4000, desc: 'Leverancier Y Banden' },
];
const UOG_BOEKHOUDING = [
  { date: '02-03', amount: 48000, desc: 'Debiteur Havenbedrijf Noord' },
  { date: '02-05', amount: -12500, desc: 'Brandstof februari' },
  { date: '02-09', amount: -9750, desc: 'Meridiaan Advies BV — advieskosten (factuur MA-0007)' },
  { date: '02-12', amount: -3200, desc: 'Loonheffing' },
  { date: '02-12', amount: -2400, desc: 'Kantoorartikelen (factuur nog te betalen)' },
  { date: '02-18', amount: 22000, desc: 'Debiteur Bouwgroep Oost' },
  { date: '02-25', amount: -1150, desc: 'Energie' },
  { date: '02-27', amount: -4000, desc: 'Banden (Leverancier Y)' },
];

CS.registerRoom({
  id: 'uitdaging-onverklaarde-geldstroom',
  path: 'uitdagingen',
  order: 3,
  title: '★★★ De onverklaarde geldstroom',
  icon: '💶',
  difficulty: 'Moeilijk',
  minutes: 75,
  summary: 'De controller van een transportbedrijf ziet dat het banksaldo niet klopt met de boekhouding. Waar is het geld gebleven, wie zat erachter en hoeveel is nog terug te halen? Drie bronnen, geen stappenplan — en de eerste bron vertelt niet het hele verhaal.',
  objectives: [
    'Twee administraties zelfstandig afstemmen en het verschil verklaren',
    'Begrijpen dat een geboekte post ook vals kan zijn',
    'Een geldstroom volgen tot de cash-out en het verlies kwantificeren',
    'Open bronnen en interne gegevens combineren tot een verdachte',
  ],
  terms: [
    { term: 'Reconciliatie', def: 'Twee administraties van dezelfde transacties naast elkaar leggen en elk verschil verklaren.' },
    { term: 'Leveranciersstam', def: 'De lijst met leveranciers en hun rekeningnummers in het boekhoudsysteem; wie daar een rekening kan toevoegen, kan betalingen sturen.' },
    { term: 'Cash-out', def: 'Het punt waarop wit te wassen geld de financiële keten verlaat, bijvoorbeeld bij een cryptobeurs of een geldautomaat.' },
  ],
  resources: [
    { title: 'KvK — het Handelsregister', url: 'https://www.kvk.nl/' },
  ],
  tasks: [
    {
      title: 'Bron 1 — bank en boekhouding',
      content: `
        <p>Kade Transport BV (fictief) betaalt boven € 10.000 alleen met twee handtekeningen. De controller ziet eind februari
        dat het banksaldo en de boekhouding uit elkaar lopen en vraagt jou om uit te zoeken waarom.</p>
      `,
      lab: { type: 'recon', title: 'Februari 2026', currency: '€', leftName: 'Bankafschrift', rightName: 'Boekhouding', left: UOG_BANK, right: UOG_BOEKHOUDING },
      questions: [
        { q: 'Welk bedrag (in euro) is wél van de bank afgeschreven maar staat niet in de boekhouding?', answer: ['19750', '19.750', '€ 19.750', '€19750'], hint: 'Tel alleen de uitgaande posten die nergens tegenover staan.', explain: '€ 9.850 en € 9.900 aan Meridiaan Advies BV.' },
        { q: 'Eén post staat alleen in de boekhouding. Is dat een aanwijzing voor fraude? (ja/nee)', answer: ['nee'], hint: 'Lees de omschrijving.', explain: 'Een factuur die nog betaald moet worden, staat logisch nog niet op de bank.' },
        { q: 'Hoeveel heeft Kade in februari in totaal aan Meridiaan Advies BV betaald? (euro)', answer: ['29500', '29.500', '€ 29.500', '€29500'], hint: 'De reconciliatie toont niet alles wat verdacht is.', explain: 'Drie betalingen: € 9.750 (geboekt met een factuur!) + € 9.850 + € 9.900. Een geboekte post is niet automatisch een echte post.', xp: 25 },
        { q: 'Welk patroon zie je in de bedragen aan Meridiaan?', options: ['Alle drie net onder de grens van € 10.000 waarboven twee handtekeningen nodig zijn', 'Ronde bedragen', 'Ze stijgen met precies 10%', 'Geen patroon'], answer: 0, explain: 'Opsplitsing onder de goedkeuringsgrens.' },
      ],
    },
    {
      title: 'Bron 2 — het spoor van Meridiaan',
      content: `
        <p>De bank van Meridiaan Advies BV heeft na een vordering van justitie gegevens verstrekt. De recherche zette ze om in
        een stroomschema.</p>
      `,
      lab: {
        type: 'flow', title: 'Meridiaan Advies BV', unit: '€',
        scenario: 'Gegevens van de bank van Meridiaan en de banken van de ontvangers (februari–maart 2026).',
        nodes: [
          { id: 'kade', type: 'victim', label: 'Kade Transport BV' },
          { id: 'mer', type: 'account', label: 'Meridiaan Advies BV' },
          { id: 'ma', type: 'mule', label: 'Rekening J. Bakker' },
          { id: 'mb', type: 'mule', label: 'Rekening S. Yilmaz' },
          { id: 'ex', type: 'exchange', label: 'Cryptobeurs EuroMunt' },
          { id: 'atm', type: 'cashout', label: 'Geldautomaten' },
        ],
        edges: [
          { from: 'kade', to: 'mer', amount: 9750, time: '02-09' },
          { from: 'kade', to: 'mer', amount: 9850, time: '02-16' },
          { from: 'kade', to: 'mer', amount: 9900, time: '02-23' },
          { from: 'mer', to: 'ma', amount: 14000, time: '02-24' },
          { from: 'mer', to: 'mb', amount: 15000, time: '02-25' },
          { from: 'ma', to: 'ex', amount: 13600, time: '02-24' },
          { from: 'mb', to: 'ex', amount: 9000, time: '02-25' },
          { from: 'mb', to: 'atm', amount: 5700, time: '02-26' },
        ],
      },
      questions: [
        { q: 'Hoeveel euro van het geld van Kade kwam bij de cryptobeurs terecht?', answer: ['22600', '22.600', '€ 22.600', '€22600'], hint: 'Er lopen twee stromen naar dezelfde bestemming.', explain: '€ 13.600 + € 9.000.' },
        { q: 'Welk percentage van het weggesluisde bedrag bereikte de beurs? (geheel getal)', answer: ['77', '77%'], hint: 'Vergelijk met het totaal uit bron 1, niet met de reconciliatie.', explain: '22.600 / 29.500 ≈ 76,6%, afgerond 77%.' },
        { q: 'Hoeveel euro bleef achter op de rekeningen van Meridiaan en de twee mules samen?', answer: ['1200', '1.200', '€ 1.200', '€1200'], hint: 'Saldo per knoop: inkomend min uitgaand.', explain: 'Meridiaan 500, Bakker 400, Yilmaz 300.' },
        { q: 'Waar heeft een vordering of beslag de meeste kans om nog geld terug te halen?', options: ['Bij de cryptobeurs, die KYC-gegevens heeft en tegoeden kan bevriezen', 'Bij de geldautomaten', 'Bij Kade zelf', 'Nergens'], answer: 0, explain: 'Contant opgenomen geld is weg; een gereguleerde beurs kan een account bevriezen en kent de klant.' },
      ],
    },
    {
      title: 'Bron 3 — wie zit erachter?',
      content: `
        <p>Drie fragmenten: een uittreksel uit het Handelsregister, een export uit het boekhoudsysteem en een stukje uit een
        personeelsdossier (opgevraagd door HR, met inachtneming van het interne onderzoeksprotocol).</p>
      `,
      lab: {
        type: 'osintpuzzle',
        scenario: 'Combineer de fragmenten. Werk alleen met wat er staat.',
        records: [
          { title: 'Handelsregister — Meridiaan Advies BV', icon: '🏢', lines: ['Opgericht: 19 januari 2026', 'Bestuurder: P. Smit', 'Adres: flexkantoor, Postbus 4410', 'Activiteit: bedrijfsadvies'] },
          { title: 'Boekhoudsysteem — wijzigingslog leveranciers', icon: '📒', lines: ['2026-02-02 16:44  leverancier toegevoegd: Meridiaan Advies BV', '  IBAN NL00 FICT 0123 4567 89  —  gebruiker: lsmit', '2026-02-02 16:45  factuur MA-0007 ingevoerd  —  gebruiker: lsmit'] },
          { title: 'Personeelsdossier (fragment)', icon: '🗂️', lines: ['Medewerker crediteuren: L. Smit-de Graaf (gebruiker lsmit)', 'Burgerlijke staat: gehuwd met P. Smit', 'Bevoegd tot betalingen tot € 10.000'] },
        ],
        ask: [
          { q: 'Welke gebruiker voegde Meridiaan toe aan de leveranciersstam?', answer: ['lsmit'], hint: 'Het wijzigingslog.' },
          { q: 'Hoeveel dagen na de oprichting van Meridiaan werd het als leverancier toegevoegd?', answer: ['14', 'veertien'], hint: 'Tel van 19 januari tot 2 februari.' },
        ],
      },
      questions: [
        { q: 'Wat is de relatie tussen de bestuurder van Meridiaan en de medewerker die de betalingen deed?', options: ['Ze zijn met elkaar getrouwd', 'Geen relatie', 'Collega\'s bij Kade', 'Dezelfde persoon'], answer: 0, explain: 'L. Smit-de Graaf is gehuwd met P. Smit, de bestuurder van Meridiaan.' },
        { q: 'Welke interne controle ontbrak?', options: ['Functiescheiding: dezelfde gebruiker kon een leverancier aanmaken, een factuur invoeren én betalen', 'Een virusscanner', 'Een sterker wachtwoord', 'Een hogere betaalgrens'], answer: 0, explain: 'Wie een rekeningnummer kan toevoegen én betalen, heeft geen tweede paar ogen nodig.' },
        { q: 'Welke formulering past in een zorgvuldig rapport?', options: ['"De gegevens wijzen op betrokkenheid van gebruiker lsmit; hoor en wederhoor en verder onderzoek zijn nodig."', '"L. Smit is schuldig aan verduistering."', '"Iemand heeft gefraudeerd."', '"Meridiaan is een witwasbedrijf."'], answer: 0, explain: 'Beschrijf wat de bronnen laten zien; over schuld beslist de rechter, en de betrokkene krijgt de kans om te reageren.' },
      ],
    },
  ],
});
