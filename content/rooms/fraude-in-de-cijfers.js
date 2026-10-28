/* Room: Fraude in de cijfers — Benford, drempels en verzonnen bedragen */

// Alles in deze room is FICTIEF: Rijnmond Logistiek, de leveranciers en de bedragen zijn verzonnen.

// Drie datasets voor de Benford-analyse (deterministisch gegenereerd; zie de taakteksten).
const MPB_REFERENTIE = [2134.18,1200.26,45683.47,6235.37,10287.85,5724.45,1214.69,40.48,15.71,80.4,141.08,97304.19,6944.05,4847.6,280.25,106,26.2,39612.72,25078.2,22856.58,638.04,133.27,23244.19,15.2,11598.66,71236.59,16597.81,28.85,222.89,3964.88,16.75,119.17,1046.73,11844.11,121.77,1165.4,10.26,2037.72,1661.81,4035.13,6427.76,25969.7,17829.09,83.17,22066.57,514.86,46903.27,36.13,24312.5,144.42,11.76,901.3,12.67,41.34,56019.06,91.97,200.4,2864.69,8561.6,2181.09,16890.72,2701.49,3020.28,22.66,119.59,20.86,39837.7,80204.92,90.49,18057.86,76.96,487.74,19.37,12.7,38.71,264.68,1483.37,94829.92,495.82,330.25,262.87,3301.5,459.81,12.31,10674.49,535.38,20823.69,48.28,5350.87,1316.41,11370.26,3271.8,881.21,467.91,86.65,11.1,207.58,1449.49,143.62,89506.23,19757.44,2415.99,24.78,65074.08,2186.04,2406.67,31.51,24.21,21150.49,4765.35,725.45,13225.85,3750.38,29364.92,222.77,32.53,673.61,18.65,41465.31,234.61,6795.23,1076.52,18.67,23.08,1424.94,620.46,63422.34,13.13,62315.74,55228.67,2747.48,3051.33,1243.16,696.08,1160.64,84.53,75.47,23.65,212.31,91831.41,3448.27,84.09,6428.27,142.24,6750.23,34715.01,106.9,18.05,1530.2,11749.04,3684.14,92.38,11357.08,57201.66,47.9,13.41,93.93,52.73,638.7,92.25,11976.32,111.55,16.78,63.05,233.57,15.04,18722.55,10.9,31314.86,19.36,6427.25,59.49,13034,187.36,328.43,1580.39,509.08,5897.54,7664.74,4832.72,438.39,177.18,2623.1,14687.03,45625.67,370.82,16.48,19.57,36476.12,1691.7,1952.31,38791.41,19691.17,21792.56,29271.95,15.84,377.24,399.1,14.02,779.44,5164.12,2853.7,23578.68,4999.03,4545.61,12.47,19124.6,1822.33,169.49,44.78,46.94,11.84,55.32,6638.56,20.18,44.98,5583.32,33.18,49.89,10.35,38.27,23750.11,9762.76,249.81,332.58,5602.83,334.71,3193.27,19981.97,4604.06,433.42,10.47,15.13,14.04,260.11,1201.81,51.73,9652.74,5683.63,362.79,23.72,129.77,477.89,7704.04,44.91,3672.97,25683.72,582.49,32836.65,31.56,6253.53,25.83,77746.26,1241.05,9332.91,165.18,2100.47,6602.21,69035.69,18.59,18.39,1346.35,160,244.94,60.68,3076.79,50.3,112.07,1996.37,498.91,90.08,715.3,666.9,26.68,3872.04,8471.02,19411.98,15.88,27714.69,28934.17,8632.88,4339.51,375.41,24.88,41628.53,3156.35,79168.76,103.67,4411.81,533.52,59997.27,19762.73,2944.55,17.51,3623.07,74877.45,14.39,41.56,3395.96,23.26];
const MPB_INKOOP = [123.13,40.35,34.57,5906.23,1152.05,13609.75,2034.39,26306.27,3378.03,9546.14,1010.15,11908.35,74027.38,61.82,46938.78,777.63,1433.14,39.82,196.05,405.85,24.28,132.79,136.5,32300.07,16400.88,11.87,1009.81,7791.4,2510.29,8646.31,493.7,58.15,18.37,4288.31,32.06,34499.92,8818.08,28.94,1626.93,78.16,890.85,64.36,1176.05,2060.21,10134.83,7981.48,5667.38,615.38,198.89,292.29,75.91,510.49,233.6,89.95,57.73,1672.18,848.14,10241.05,2049.54,17478.31,1925.32,123.43,897.36,71846.6,492.65,1643.23,15.12,42920.69,16648.5,540.96,17.95,4730.08,651.29,22621.07,64.7,57.62,923.03,996.46,283.63,5042.14,59162.44,17.55,1969.74,1780.68,283.99,4867.91,508.4,525.49,16154.25,28.9,24517.35,15667.91,54784.65,358.81,25.55,971.27,71.58,160.23,17.23,2573.21,19.75,5633.58,305.59,5617.61,3169.35,551.55,385.39,775.58,631.64,621.27,31776.06,257.95,16599.2,27400.2,33931.53,472.78,854.47,25.67,5227.41,21.76,378.65,284.29,44825.44,341.42,157.85,84329.7,19.36,46818.65,834.3,1940.73,444.28,29147.67,3467.7,22369.07,11.76,57252.44,10503.41,48.65,27.52,43.96,12085.84,767.35,1763.77,12078.53,7027.24,13.94,572.37,403.09,99323.65,77440.73,69039.25,34025.69,12248.24,18043.03,843.41,13126.27,832.49,28975.34,14.01,9644.08,353.62,103.81,1658.17,11224.29,22610.72,42.78,688.8,28388.92,1755.18,1273.85,6985.5,6663.13,2283.3,566.07,54.71,58.51,12.7,1819.79,8972.7,33.77,1339.96,219.49,10.48,41525.32,2967.8,11.95,220.07,67.95,43438.49,45467.49,16.82,81374.75,32409.38,40728.87,24274.16,26.05,28.25,25636.01,10504.74,224.15,62.35,91.53,143.95,32.4,3209.15,543.39,20.59,3787.6,198.94,43605.34,19.45,3759.12,64.99,33773.61,722.44,100.3,38.65,15589.29,19.83,34.3,48125.7,47731.95,1193.02,95955.52,440.35,37.88,23.44,79121.97,77907.05,273.38,4543.01,4552.14,4607.65,4727.49,4517.34,4940.79,4609.38,4831.4,4907.72,4971.1,4850.61,4875.17,4646.17,4711.71,4820.47,4945.77,4693.29,4614.69,4754.45,4878.48,4937.45,4779.04,4732.81,4647.33,4661.7,4654.47,4566.55,4948.39,4674.84,4938.66,4666.77,4653.2,4992.2,4593.44,4516.05,4944.12,4939.55,4721.87,4560.06,4837.25,4935.89,4711.93,4914.78,4992.76,4749.77,4783.65,4851.02,4601.11,4565.13,4703.41,4970.47,4856.51,4656.11,4893.52,4638.93,4500.15,4689.4,4585.55,4707.33,4689.6,4617.77,4826.82,4976.9,4875.86,4856.66,4886.08,4724.73,4857.82,4891.13,4721.03];
const MPB_DECLARATIES = [464.37,13.64,388.23,31.61,212.96,134.39,8.45,180.41,747.34,9.9,138.55,46.17,410.02,485.05,56.92,22.84,13.01,222.68,491.22,807.51,24.79,150.11,289.06,23.95,58.46,109.96,48.04,7.22,899.91,330.88,5.24,48.79,184.55,405.28,69.89,40.2,806.14,734.3,22.71,48.62,34.81,429.66,22.35,637.99,18.19,277.01,19.15,192.54,35.81,16.07,123.91,806.65,475.13,849.55,797.39,19.39,194.97,10.75,67.44,9.55,36.31,27.38,134.17,548.92,20.64,7.44,140.63,5.99,5.87,51.31,99.57,11.88,7.04,5.69,207.49,7.7,14.61,52.14,9.29,115.15,166.23,817.51,117.72,40.06,59.51,115.17,61.44,5.76,5.08,372,8.75,7.23,6.08,718.13,11.74,42.22,7.33,40.08,369.73,67.81,8.16,83.05,211.91,310.68,339.92,8.93,686.04,20.66,296.25,170.07,14.92,26.31,103.48,428.11,318.8,15.62,16.22,5.71,444.8,175.69,850,700,610,830,600,890,830,620,670,550,680,650,520,520,770,830,760,740,690,540,670,640,740,780,680,600,840,630,810,730,530,520,500,690,630,810,660,810,830,850,610,610,620,680,660,840,670,540,650,570,640,590,510,850,740,690,840,830,620,730];

// Inkoopfacturen van mei 2026; boven € 5.000 is een tweede handtekening nodig.
const MPB_FACTUREN = [
  { date: '2026-05-04', who: 'Kantoorhuis Delta BV', amount: 4870, kind: 'factuur' },
  { date: '2026-05-04', who: 'Kantoorhuis Delta BV', amount: 4920, kind: 'factuur' },
  { date: '2026-05-04', who: 'Kantoorhuis Delta BV', amount: 4650, kind: 'factuur' },
  { date: '2026-05-06', who: 'Schoonmaak Noord BV', amount: 1240, kind: 'factuur' },
  { date: '2026-05-07', who: 'IT-Partners Rijn', amount: 12800, kind: 'factuur', note: 'boven de grens: twee handtekeningen' },
  { date: '2026-05-11', who: 'Kantoorhuis Delta BV', amount: 4990, kind: 'factuur' },
  { date: '2026-05-11', who: 'Kantoorhuis Delta BV', amount: 4780, kind: 'factuur' },
  { date: '2026-05-12', who: 'Drukkerij Van Os', amount: 4550, kind: 'factuur', note: 'jaarlijkse drukorder' },
  { date: '2026-05-14', who: 'Energiebedrijf Zuid', amount: 3180, kind: 'factuur' },
  { date: '2026-05-18', who: 'Kantoorhuis Delta BV', amount: 4895, kind: 'factuur' },
  { date: '2026-05-20', who: 'Catering De Haven', amount: 860, kind: 'factuur' },
  { date: '2026-05-25', who: 'IT-Partners Rijn', amount: 5400, kind: 'factuur', note: 'boven de grens: twee handtekeningen' },
];

CS.registerRoom({
  id: 'fraude-in-de-cijfers',
  path: 'meesterproeven',
  order: 3,
  title: 'Fraude in de cijfers: Benford, drempels en verzonnen bedragen',
  icon: '📊',
  difficulty: 'Moeilijk',
  minutes: 90,
  summary: 'Fraudeurs verzinnen bedragen, en mensen zijn slechte toevalsgeneratoren. Leer waarom in echte administraties het cijfer 1 vaker vooraan staat dan het cijfer 9 (de wet van Benford), betrap een opgesplitste reeks facturen net onder een goedkeuringsgrens, herken verzonnen declaraties, en werk een statistisch signaal uit tot een eerlijk onderzoeksdossier.',
  objectives: [
    'De wet van Benford uitleggen, de verwachte kansen per eerste cijfer berekenen en weten wanneer de wet wel en niet geldt',
    'Een Benford-analyse lezen met de MAD en de chi-kwadraattoets, en de invloed van de steekproefgrootte begrijpen',
    'Opsplitsing van facturen onder een goedkeuringsgrens herkennen als vorm van structurering',
    'Kenmerken van verzonnen bedragen herkennen: ronde getallen, favoriete cijfers en ontbrekende spreiding',
    'Een statistisch signaal omzetten in een onderbouwd dossier met ACH, steekproef en hoor en wederhoor',
  ],
  terms: [
    { term: 'Wet van Benford', def: 'In veel natuurlijke reeksen getallen is de kans dat het eerste cijfer d is gelijk aan log10(1 + 1/d): ongeveer 30,1% voor een 1 en 4,6% voor een 9.' },
    { term: 'Schaalinvariantie', def: 'Een verdeling blijft gelijk als je alle getallen met dezelfde factor vermenigvuldigt (bijv. euro naar dollar). Benford is de enige eerste-cijferverdeling met die eigenschap.' },
    { term: 'MAD', def: 'Mean Absolute Deviation: het gemiddelde verschil tussen waargenomen en verwachte percentages. Nigrini gebruikt hem omdat hij, anders dan χ², niet vanzelf groeit met de steekproef.' },
    { term: 'Chi-kwadraattoets', def: 'Toetst of afwijkingen groter zijn dan toeval. Bij 9 cijfers (8 vrijheidsgraden) is 15,51 de grens bij 5% significantie.' },
    { term: 'Goedkeuringsgrens', def: 'Het bedrag waarboven een betaling een extra handtekening of controle nodig heeft. Een klassiek doelwit voor opsplitsing.' },
    { term: 'Opsplitsing (split purchases)', def: 'Een grote aankoop bewust verdelen over meerdere kleine facturen om onder een goedkeuringsgrens te blijven; de administratieve tegenhanger van structurering.' },
    { term: 'Functiescheiding', def: 'Interne controle waarbij aanmaken van een leverancier, invoeren van een factuur en goedkeuren van een betaling door verschillende mensen gebeurt.' },
    { term: 'Hoor en wederhoor', def: 'De betrokkene de kans geven om te reageren op de bevindingen voordat je conclusies trekt; een basisregel van zorgvuldig onderzoek.' },
  ],
  resources: [
    { title: 'Wikipedia — Wet van Benford', url: 'https://nl.wikipedia.org/wiki/Wet_van_Benford' },
    { title: 'ACFE — Association of Certified Fraud Examiners', url: 'https://www.acfe.com/' },
    { title: 'NBA — beroepsorganisatie van accountants (fraude en controle)', url: 'https://www.nba.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Waarom staat er zo vaak een 1 vooraan?',
      content: `
        <p>In 1881 merkte de astronoom Simon Newcomb iets vreemds op: in boeken met logaritmetabellen waren de eerste
        pagina's (getallen die met 1 beginnen) veel smoezeliger dan de laatste. In 1938 testte de natuurkundige Frank Benford
        het op meer dan 20.000 getallen: rivierlengtes, bevolkingsaantallen, natuurconstanten. Steeds hetzelfde patroon:</p>
<pre><code>P(eerste cijfer = d) = log10(1 + 1/d)

d    1      2      3      4     5     6     7     8     9
%  30,1   17,6   12,5   9,7   7,9   6,7   5,8   5,1   4,6</code></pre>
        <h3>De intuïtie: groeien kost tijd</h3>
        <p>Stel je een spaarrekening voor die elk jaar 10% groeit, beginnend bij € 1.000. Om van € 1.000 naar € 2.000 te
        komen (eerste cijfer 1) duurt ruim 7 jaar. Van € 9.000 naar € 10.000 (eerste cijfer 9) duurt nog geen jaar. Het
        saldo "woont" dus het langst bij een 1 vooraan. Op een logaritmische schaal neemt het stuk van 1 tot 2 net zoveel
        ruimte in als van 2 tot 4 of van 5 tot 10.</p>
        <h3>Wanneer geldt Benford?</h3>
        <table>
          <thead><tr><th>Wel (meestal)</th><th>Niet</th></tr></thead>
          <tbody>
            <tr><td>Factuurbedragen, banktransacties, verkoopcijfers</td><td>Toegekende nummers: telefoonnummers, postcodes, factuurnummers</td></tr>
            <tr><td>Getallen die over meerdere ordes van grootte lopen (€ 10 tot € 100.000)</td><td>Begrensde reeksen: lengtes van volwassenen, uurlonen in één cao-schaal</td></tr>
            <tr><td>Getallen die ontstaan door vermenigvuldigen en groeien</td><td>Bedragen met een vast minimum of maximum, of vaste prijzen (€ 9,99-abonnementen)</td></tr>
          </tbody>
        </table>
        <div class="callout warn"><strong>Belangrijk:</strong> een afwijking van Benford is <em>geen bewijs</em> van fraude.
        Het is een manier om in tienduizenden regels te bepalen <em>waar je moet kijken</em>. Een bedrijf dat veel
        abonnementen van € 49 verkoopt, heeft van nature te veel vieren.</div>
      `,
      questions: [
        { q: 'Hoe groot is volgens Benford de kans (in procenten, afgerond op één decimaal) dat een bedrag met een 1 begint?', answer: ['30.1', '30,1', '30,1%', '30.1%'], hint: 'log10(1 + 1/1) = log10(2).', explain: 'log10(2) ≈ 0,301, dus 30,1%.' },
        { q: 'Hoe groot is de kans op een 9 als eerste cijfer? (procent, één decimaal)', answer: ['4.6', '4,6', '4,6%', '4.6%'], hint: 'log10(1 + 1/9) = log10(10/9).', explain: 'log10(1,111) ≈ 0,046, dus 4,6%.' },
        { q: 'Op welke reeks is Benford NIET van toepassing?', options: ['Factuurnummers die oplopend worden toegekend', 'Banktransacties van een groothandel', 'Inwonertallen van gemeenten', 'Omzetcijfers per filiaal'], answer: 0, explain: 'Factuurnummers zijn toegekende volgnummers; die volgen geen natuurlijke groei.' },
        { q: 'Waarom blijft Benford gelden als je alle bedragen van euro naar dollar omrekent?', options: ['Omdat de verdeling schaalinvariant is', 'Omdat de koers ongeveer 1 is', 'Omdat Benford alleen voor euro\'s geldt', 'Dat klopt niet'], answer: 0, explain: 'Benford is de enige eerste-cijferverdeling die gelijk blijft bij vermenigvuldigen met een constante.' },
      ],
    },
    {
      title: 'Taak 2 — De analyse: MAD, chi-kwadraat en steekproefgrootte',
      content: `
        <p>De interne auditor van het fictieve groothandelsbedrijf <strong>Rijnmond Logistiek</strong> exporteert drie
        reeksen: een referentiejaar zonder bekende problemen, alle inkoopfacturen van 2026, en de declaraties van de
        buitendienst. Bekijk alle drie in het lab.</p>
        <h3>Twee maten, twee vragen</h3>
        <ul>
          <li><strong>Chi-kwadraat (χ²)</strong> beantwoordt: <em>is de afwijking groter dan toeval?</em> Nadeel: bij heel
          grote reeksen (100.000 regels) is vrijwel elke kleine afwijking "significant", ook als die er in de praktijk niet toe doet.</li>
          <li><strong>MAD</strong> beantwoordt: <em>hoe groot is de afwijking gemiddeld?</em> Mark Nigrini, de bekendste
          onderzoeker op dit gebied, geeft voor het eerste cijfer deze grenzen: ≤ 0,006 sterke overeenkomst, ≤ 0,012
          aanvaardbaar, ≤ 0,015 twijfelachtig, daarboven geen overeenkomst.</li>
        </ul>
        <div class="callout info"><strong>Let op de steekproefgrootte:</strong> de MAD-grenzen zijn bedoeld voor
        duizenden regels. Bij een paar honderd bedragen schommelt de MAD door toeval al rond 0,01. Probeer het zelf: de
        referentiereeks (300 bedragen, echt volgens Benford gegenereerd) haalt "aanvaardbaar", niet "sterk". Kijk bij kleine
        reeksen daarom ook naar χ², en vooral naar <em>welk</em> cijfer afwijkt.</div>
        <h3>Waar zit het verhaal?</h3>
        <p>Een algemene afwijking zegt weinig. Een uitschieter bij <strong>één</strong> cijfer is veel interessanter: te veel
        vieren in inkoopfacturen kan betekenen dat iemand stelselmatig net onder € 5.000 blijft. Te veel vijven tot achten
        in declaraties wijst op bedragen die iemand "gevoelsmatig" invult.</p>
      `,
      lab: { type: 'benford', title: 'Rijnmond Logistiek', scenario: 'Kies een reeks: het referentiejaar, de inkoopfacturen 2026 of de declaraties van de buitendienst.', sets: [{ name: 'Referentiejaar', amounts: MPB_REFERENTIE }, { name: 'Inkoopfacturen 2026', amounts: MPB_INKOOP }, { name: 'Declaraties buitendienst', amounts: MPB_DECLARATIES }] },
      questions: [
        { q: 'Welk oordeel geeft de MAD voor het referentiejaar?', options: ['Sterke overeenkomst', 'Aanvaardbare overeenkomst', 'Twijfelachtige overeenkomst', 'Geen overeenkomst'], answer: 1, explain: 'MAD ≈ 0,0105: aanvaardbaar. Bij 300 bedragen is "sterk" door toeval nauwelijks haalbaar; χ² ≈ 5 is ruim onder de 15,51.' },
        { q: 'Welk eerste cijfer is in de inkoopfacturen sterk oververtegenwoordigd?', answer: ['4'], hint: 'Zoek de rode balk die ver voorbij de streep uitsteekt.', explain: 'Het cijfer 4: 31,7% tegen 9,7% verwacht, ongeveer 22 procentpunt te veel.' },
        { q: 'Welke goedkeuringsgrens vermoed je bij die oververtegenwoordiging? (bedrag in euro)', answer: ['5000', '5.000', '€ 5.000', '€5000', '5000 euro'], hint: 'Bedragen die met een 4 beginnen en net onder een rond getal blijven.', explain: 'Een grens van € 5.000: wie die wil vermijden, factureert € 4.6xx tot € 4.9xx.' },
        { q: 'Welk cijfer is in de declaraties het sterkst oververtegenwoordigd?', answer: ['6'], hint: 'Kijk welke balk het verst voorbij de streep komt.', explain: 'Het cijfer 6: ruim 11 procentpunt te veel. Ook 5, 7 en 8 zitten erboven — het patroon van verzonnen, "gemiddeld voelende" bedragen.' },
      ],
    },
    {
      title: 'Taak 3 — Opsplitsen onder de goedkeuringsgrens',
      content: `
        <p>De Benford-analyse wees naar de vieren. Nu zoom je in op de facturen van mei. Bij Rijnmond Logistiek mag één
        inkoper een factuur tot € 5.000 alleen goedkeuren; daarboven is een tweede handtekening van de controller nodig.</p>
        <h3>Structurering in de crediteurenadministratie</h3>
        <p>Je kent structurering uit het witwassen: stortingen net onder de meldgrens. Binnen een bedrijf werkt het hetzelfde:
        een grote bestelling wordt verdeeld over meerdere facturen die elk net onder de grens blijven. Typische signalen:</p>
        <ul>
          <li>meerdere facturen van <strong>dezelfde leverancier</strong> op dezelfde dag of in korte tijd;</li>
          <li>bedragen in een smalle band onder de grens (hier € 4.500 tot € 5.000);</li>
          <li>opeenvolgende factuurnummers, dezelfde omschrijving, dezelfde goedkeurder;</li>
          <li>een leverancier die kort geleden is aangemaakt door dezelfde persoon die de facturen goedkeurt.</li>
        </ul>
        <div class="callout tip"><strong>Opdracht:</strong> het lab markeert alle facturen in de band van 90 tot 100% van de
        grens. Niet elke markering is verdacht: kijk naar de leverancier en het patroon, niet alleen naar het bedrag.</div>
      `,
      lab: { type: 'structuring', title: 'Inkoopfacturen mei 2026', threshold: 5000, bandLow: 0.9, currency: '€', scenario: 'Boven € 5.000 is een tweede handtekening nodig. Welke facturen blijven er stelselmatig net onder?', tx: MPB_FACTUREN },
      questions: [
        { q: 'Hoeveel facturen markeert het lab in de band van € 4.500 tot € 5.000?', answer: ['7', 'zeven'], hint: 'Tel de gemarkeerde rijen.', explain: 'Zeven: zes van Kantoorhuis Delta BV en één van Drukkerij Van Os.' },
        { q: 'Welke gemarkeerde factuur is waarschijnlijk onschuldig?', options: ['De jaarlijkse drukorder van Drukkerij Van Os', 'De factuur van Kantoorhuis Delta BV van 4 mei', 'De factuur van € 4.990', 'De factuur van 18 mei'], answer: 0, explain: 'Eén losse, jaarlijkse factuur past niet in een patroon. Zes facturen van één leverancier in twee weken wel.' },
        { q: 'Hoeveel euro factureerde Kantoorhuis Delta BV in totaal in mei? (zonder punt)', answer: ['29105', '29.105', '€ 29.105', '€29105'], hint: '4870 + 4920 + 4650 + 4990 + 4780 + 4895.', explain: '€ 29.105: bijna zes keer de grens, zonder dat er ooit een tweede handtekening nodig was.' },
      ],
    },
    {
      title: 'Taak 4 — Mensen zijn slechte toevalsgeneratoren',
      content: `
        <p>Vraag mensen om "een willekeurig getal tussen 1 en 10" en het vaakst gekozen antwoord is 7. Zulke voorkeuren lekken ook in
        verzonnen bedragen. Onderzoek naar bedachte getallen laat steeds dezelfde patronen zien:</p>
        <ul>
          <li><strong>Te ronde bedragen:</strong> € 600, € 750, € 800. Echte bonnetjes eindigen zelden op twee nullen.</li>
          <li><strong>Middencijfers:</strong> mensen beginnen bedragen graag met 5, 6, 7 of 8 ("niet te veel, niet te weinig"),
          en vermijden de 1 en de 9.</li>
          <li><strong>Te weinig herhaling of juist te veel:</strong> wie verzint, vermijdt bewust dubbele bedragen, terwijl echte
          reeksen (vaste lunchprijs, kilometervergoeding) juist veel herhaling hebben. Of het omgekeerde: steeds hetzelfde bedrag.</li>
          <li><strong>Net onder een grens:</strong> declaraties van € 49 als bonnetjes pas vanaf € 50 verplicht zijn.</li>
        </ul>
        <h3>Meer tests uit de gereedschapskist van de auditor</h3>
        <table>
          <thead><tr><th>Test</th><th>Wat zoekt hij?</th></tr></thead>
          <tbody>
            <tr><td>Eerste twee cijfers</td><td>Pieken bij bijv. 48 en 49: net onder 5.000 of 50</td></tr>
            <tr><td>Laatste twee cijfers</td><td>Te veel 00 en 50: afgeronde, bedachte bedragen</td></tr>
            <tr><td>Duplicatentest</td><td>Hetzelfde bedrag, dezelfde leverancier, dezelfde dag: dubbele betaling of opsplitsing</td></tr>
            <tr><td>Relatieve-grootte-factor</td><td>De grootste factuur van een leverancier vergeleken met de op één na grootste</td></tr>
          </tbody>
        </table>
        <div class="callout info"><strong>Terug naar het lab van taak 2:</strong> in de declaraties is een derde van de bedragen
        een rond tiental, en zijn de cijfers 5 tot en met 8 vooraan duidelijk oververtegenwoordigd. Dat is geen bewijs, maar wel
        een goede reden voor een steekproef: vraag voor die declaraties de bonnetjes op.</div>
      `,
      questions: [
        { q: 'Welke test vindt het best bedragen die net onder € 5.000 blijven?', options: ['De test op de eerste twee cijfers (pieken bij 48 en 49)', 'De test op het laatste cijfer', 'De duplicatentest', 'Een test op factuurnummers'], answer: 0, explain: '€ 4.8xx en € 4.9xx geven pieken bij de eerste twee cijfers 48 en 49.' },
        { q: 'Een medewerker declareert maandenlang lunches van precies € 25, € 30 en € 40. Welk signaal zie je vooral?', options: ['Te ronde bedragen', 'Te veel enen vooraan', 'Een leverancier die net is aangemaakt', 'Niets bijzonders'], answer: 0, explain: 'Echte restaurantrekeningen eindigen zelden op een rond tiental. Reden voor een steekproef, geen bewijs.' },
        { q: 'Waarom vermijdt iemand die bedragen verzint vaak dubbele bedragen?', options: ['Omdat dubbele bedragen "verdacht" voelen, terwijl ze in echte reeksen juist normaal zijn', 'Omdat de software dat verbiedt', 'Omdat Benford dat eist', 'Dat doen mensen niet'], answer: 0, explain: 'Mensen denken dat toeval "gevarieerd" moet ogen; echt toeval kent juist herhalingen.' },
      ],
    },
    {
      title: 'Taak 5 — Van signaal naar dossier',
      content: `
        <p>Je hebt een sterk signaal: zes facturen van Kantoorhuis Delta BV net onder de grens. De verleiding is groot om
        meteen "fraude" te roepen. Maar een onderzoek dat later voor de rechter of in een arbeidszaak standhoudt, werkt
        zorgvuldiger.</p>
        <ol>
          <li><strong>Formuleer alternatieve verklaringen.</strong> Misschien zijn het afgesproken deelleveringen. Misschien
          is het toeval.</li>
          <li><strong>Zoek diagnostisch bewijs.</strong> Wat onderscheidt de verklaringen? Het contract, het magazijnregister,
          wie de leverancier aanmaakte.</li>
          <li><strong>Neem een steekproef</strong> en vraag de onderliggende stukken op: bestelling, pakbon, contract.</li>
          <li><strong>Hoor en wederhoor:</strong> geef de inkoper de kans om te reageren, en leg dat vast.</li>
          <li><strong>Herstel de controle:</strong> functiescheiding tussen leveranciersbeheer en goedkeuren, en een
          automatische controle op opsplitsing (meerdere facturen per leverancier per week opgeteld).</li>
        </ol>
        <div class="callout warn"><strong>Privacy en arbeidsrecht:</strong> een intern onderzoek naar een medewerker raakt
        persoonsgegevens. Werk volgens het interne onderzoeksprotocol, betrek de functionaris gegevensbescherming en verzamel
        niet meer dan nodig. Bij een vermoeden van een strafbaar feit volgt aangifte; daarna is het opsporen aan de politie.</div>
      `,
      lab: {
        type: 'ach',
        question: 'Waarom factureert Kantoorhuis Delta BV stelselmatig net onder € 5.000?',
        hypotheses: ['Bewuste opsplitsing om de tweede handtekening te omzeilen', 'Deelleveringen volgens contract', 'Toeval'],
        evidence: [
          { text: 'Zes facturen tussen € 4.650 en € 4.990 van één leverancier in drie weken', expert: ['C', 'C', 'I'] },
          { text: 'Drie facturen op dezelfde dag, met opeenvolgende factuurnummers', expert: ['C', 'C', 'I'] },
          { text: 'Het raamcontract met Delta bevat geen afspraak over deelleveringen', expert: ['C', 'I', 'N'] },
          { text: 'Het magazijn ontving alle bureaustoelen in één levering op 3 mei', expert: ['C', 'I', 'N'] },
          { text: 'Alle zes facturen zijn ingevoerd en goedgekeurd door dezelfde inkoper', expert: ['C', 'N', 'N'] },
          { text: 'Delta is twee maanden eerder als nieuwe leverancier aangemaakt door diezelfde inkoper', expert: ['C', 'N', 'N'] },
        ],
      },
      questions: [
        { q: 'Welke hypothese heeft volgens het expertoordeel de minste inconsistenties?', options: ['Bewuste opsplitsing', 'Deelleveringen volgens contract', 'Toeval'], answer: 0, explain: 'Opsplitsing: 0 I\'s. Deelleveringen: 2 (geen contractafspraak, één levering). Toeval: 2.' },
        { q: 'Welk bewijsstuk weerlegt de deelleveringen-hypothese het sterkst, naast het contract?', options: ['Alle stoelen kwamen in één levering binnen', 'Dezelfde inkoper keurde goed', 'De bedragen liggen onder de grens', 'Delta is een nieuwe leverancier'], answer: 0, explain: 'Eén levering past niet bij gespreide deelleveringen: dat bewijs is diagnostisch.' },
        { q: 'Welke interne controle had dit patroon vooraf het best voorkomen?', options: ['Functiescheiding: wie leveranciers aanmaakt, keurt geen facturen goed, plus een opsplitsingscontrole per leverancier', 'Een hogere goedkeuringsgrens', 'Meer facturen per dag toestaan', 'Een Benford-analyse eens per tien jaar'], answer: 0, explain: 'De kern van het probleem was dat één persoon de hele keten in handen had.' },
        { q: 'Ik begrijp dat een Benford-afwijking een reden is om te kijken, geen bewijs, en dat hoor en wederhoor bij een zorgvuldig onderzoek hoort.', noAnswer: true },
      ],
    },
  ],
});
