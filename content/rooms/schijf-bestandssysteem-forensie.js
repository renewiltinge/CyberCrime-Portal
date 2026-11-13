/* Room: Schijf- en bestandssysteemforensie */

// Taak 5: hex-dump van verdacht.bin. Een ingekorte maar correct opgebouwde PNG (signature, IHDR met
// 640 x 480 big-endian, tEXt-chunk met de vlag NM{png_magic_bytes}, IEND). CRC's nagerekend met Node.
const SBF_PNG_HEX =
  '89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52 00 00 02 80 00 00 01 E0 ' +
  '08 06 00 00 00 35 D1 DC E4 00 00 00 2B 74 45 58 74 43 6F 6D 6D 65 6E 74 ' +
  '00 76 65 72 62 6F 72 67 65 6E 20 76 6C 61 67 3A 20 4E 4D 7B 70 6E 67 5F ' +
  '6D 61 67 69 63 5F 62 79 74 65 73 7D 04 39 50 F0 00 00 00 00 49 45 4E 44 ' +
  'AE 42 60 82';

// Taak 2: eerste 96 bytes van een NTFS-bootsector (VBR). Little-endian:
// 0x0B bytes per sector = 00 02 (512), 0x0D sectoren per cluster = 0x10 (16), 0x30 $MFT-cluster = 0xC0000 (786432).
const SBF_VBR_HEX =
  'EB 52 90 4E 54 46 53 20 20 20 20 00 02 10 00 00 00 00 00 00 00 F8 00 00 ' +
  '3F 00 FF 00 00 08 00 00 00 00 00 00 80 00 80 00 FF F7 FF 00 00 00 00 00 ' +
  '00 00 0C 00 00 00 00 00 02 00 00 00 00 00 00 00 F6 00 00 00 F4 00 00 00 ' +
  '3A 7C 1E 52 9B 40 E6 C8 00 00 00 00 FA 33 C0 8E D0 BC 00 7C 00 00 00 00';

// Taak 4: één cluster van 1024 bytes (2 sectoren) van een USB-stick. Bestand van 41 bytes, de rest van
// sector 1 is met nullen gevuld, sector 2 bevat nog een stuk van een oud bestand (vlag op offset 0x27F).
const SBF_SLACK_HEX = (() => {
  const toHex = (s) => s.split('').map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  const zeros = (n) => Array(n).fill('00').join(' ');
  const bestand = 'Boodschappen: brood, melk, koffie, kaas.\n';
  const oud = 'ken voor de overboeking van 25.000 euro naar rekening 8841-22 (Kade Holding BV). Na betaling dit bestand wissen. Controlecode: NM{slack_bewaart_oude_data} -- verstuurd vanaf laptop-RB, 14-09-2026 22:41. Herinnering: de tweede termijn volgt op 1 oktober.';
  return [toHex(bestand), zeros(512 - bestand.length), toHex(oud), zeros(512 - oud.length)].join(' ');
})();

// Taak 1: bewijsregistratie van drie stukken uit zaak 2026-0442. Bij stuk B1 ontbreekt een overdracht
// en klopt het zegelnummer bij ontvangst niet (Z-44901 aangebracht, Z-44910 ontvangen).
const SBF_COC_LOG = `2026-10-02 09:14  [B1] INBESLAGNAME  laptop Dell Latitude (SN 7XK2-91), woning Kade 12 | door: R. Bakker | zegel: Z-44817
2026-10-02 09:16  [B2] INBESLAGNAME  telefoon (IMEI eindigt op 4410), woonkamer | door: R. Bakker | zegel: Z-44818
2026-10-02 09:19  [B3] INBESLAGNAME  USB-stick 32 GB, bureaula | door: M. Jansen | zegel: Z-44819
2026-10-02 09:20  [B1] FOTO          laptop, kabels en scherm gefotografeerd (14 foto's) | door: R. Bakker
2026-10-02 09:24  [B2] NOTITIE       telefoon in vliegtuigmodus gezet en in afgeschermde zak | door: R. Bakker
2026-10-02 09:26  [B1] NOTITIE       laptop stond uit; niet aangezet | door: R. Bakker
2026-10-02 10:05  [B1] OVERDRACHT    R. Bakker -> A. Yilmaz (bewijskamer) | zegel: Z-44817 intact
2026-10-02 10:06  [B2] OVERDRACHT    R. Bakker -> A. Yilmaz (bewijskamer) | zegel: Z-44818 intact
2026-10-02 10:09  [B3] OVERDRACHT    M. Jansen -> A. Yilmaz (bewijskamer) | zegel: Z-44819 intact
2026-10-02 13:30  [B3] OVERDRACHT    A. Yilmaz -> S. de Wit (digitaal rechercheur) | zegel: Z-44819 intact
2026-10-02 13:41  [B3] ZEGEL         Z-44819 verbroken | door: S. de Wit | reden: imaging
2026-10-02 14:20  [B3] HASH          bron en image gelijk (sha256 5d0c71a2...9e04)
2026-10-02 14:24  [B3] ZEGEL         nieuw zegel Z-44900 | door: S. de Wit
2026-10-02 14:31  [B3] OVERDRACHT    S. de Wit -> A. Yilmaz (bewijskamer) | zegel: Z-44900 intact
2026-10-02 16:40  [B1] OVERDRACHT    A. Yilmaz -> S. de Wit (digitaal rechercheur) | zegel: Z-44817 intact
2026-10-02 16:52  [B1] ZEGEL         Z-44817 verbroken | door: S. de Wit | reden: imaging
2026-10-02 16:55  [B1] SCHIJF        SSD (SN S4EV-1180) uitgebouwd
2026-10-02 16:58  [B1] WRITE-BLOCKER Tableau T8u (SN 44102) aangesloten op SSD
2026-10-02 17:02  [B1] HASH          bron sha256 ae3e49d8...ca11
2026-10-02 18:47  [B1] IMAGE         bewijs.dd aangemaakt met dcfldd
2026-10-02 18:49  [B1] HASH          image sha256 ae3e49d8...ca11 (gelijk aan bron)
2026-10-02 18:55  [B1] ZEGEL         nieuw zegel Z-44901 | door: S. de Wit
2026-10-03 08:02  [B2] OVERDRACHT    A. Yilmaz -> K. Visser (mobiel onderzoek) | zegel: Z-44818 intact
2026-10-03 08:10  [B1] ONTVANGST     bewijskamer | door: A. Yilmaz | zegel: Z-44910
2026-10-03 11:15  [B2] NOTITIE       extractie gestart | door: K. Visser`;

// Taak 3: vereenvoudigde uitvoer van een MFT-parser (CSV) over bewijs.dd.
const SBF_MFT_CSV = `Entry,Seq,InUse,ParentPath,FileName,FileSize,ADS
0,1,True,.,$MFT,262144,
1,1,True,.,$MFTMirr,4096,
2,2,True,.,$LogFile,67108864,
64,1,True,.\\Users\\rb\\Documents,begroting-2026.xlsx,18233,
65,1,True,.\\Users\\rb\\Documents,notities.txt,1840,codes.txt
66,3,False,.\\Users\\rb\\Documents,wachtwoorden.txt,312,
67,1,True,.\\Users\\rb\\Downloads,factuur_0931.pdf,88412,Zone.Identifier
68,1,True,.\\Users\\rb\\Downloads,setup_vpn.exe,4120448,Zone.Identifier
69,2,False,.\\Users\\rb\\Documents,betalingen_q3.xlsx,48211,
70,1,True,.\\Users\\rb\\Pictures,IMG_0040.jpg,2291004,
71,1,True,.\\Users\\rb\\Pictures,IMG_0041.jpg,2310877,
72,4,False,.\\Users\\rb\\Pictures,IMG_0042.jpg,2304711,
73,1,True,.\\Users\\rb\\Desktop,boodschappen.txt,41,
74,1,True,.\\Users\\rb\\AppData\\Roaming\\VPNClient,config.ini,522,
75,1,True,.\\Users\\rb\\Downloads,handleiding_printer.pdf,1204551,Zone.Identifier
76,1,True,.\\Users\\rb\\Videos,les-3.mp4,5368709120,
77,2,True,.\\Users\\rb\\Documents,cv-2026.docx,25510,
78,1,True,.\\Users\\rb\\Desktop,todo.txt,96,
79,1,True,.\\Windows\\Temp,~DF3A1.tmp,0,
80,1,True,.\\Users\\rb\\Documents,huurcontract.pdf,301877,`;

// Taak 7: bestandssysteem voor het onderzoekslab.
const SBF_PNG_FS = '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR...+tEXtComment\x00verborgen vlag: NM{png_magic_bytes}...IEND\n';
const SBF_FS = {
  '/cases/zaak-2026-0442/verdacht.bin': SBF_PNG_FS,
  '/cases/zaak-2026-0442/bewijs.dd': '...(forensische schijfkopie, 8 GB, afgekort)...\n',
  '/cases/zaak-2026-0442/werkkopie.dd': '...(tweede kopie van de schijf, 8 GB, afgekort)...\n',
  '/cases/zaak-2026-0442/chain-of-custody.txt':
    'Zaak 2026-0442, Team Cybercrime\nStuk B1: laptop Dell Latitude (SN 7XK2-91), SSD S4EV-1180\nWrite-blocker: Tableau T8u (SN 44102)\nImager: dcfldd\nSHA-256 bij acquisitie (02-10-2026 17:02):\nae3e49d8b680d40b2d626d96e037e4c72d30abde93ee581aa6c6544fe92fca11\n',
  '/cases/zaak-2026-0442/unalloc/LEESMIJ.txt': 'Uitvoer van de carver over de unallocated space van bewijs.dd.\nDe namen en extensies zijn door de carver gekozen.\n',
  '/cases/zaak-2026-0442/unalloc/f0001.jpg': '\xff\xd8\xff\xe0\x00\x10JFIF...(JPEG-data)...\xff\xd9\n',
  '/cases/zaak-2026-0442/unalloc/f0002.jpg': '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR...+tEXtComment\x00vakantie Texel 2025...IEND\n',
  '/cases/zaak-2026-0442/unalloc/f0003.jpg': SBF_PNG_FS,
  '/cases/zaak-2026-0442/unalloc/f0004.pdf': '%PDF-1.7\n...(documentdata)...\n%%EOF\n',
};
const SBF_FILE_OUT = {
  f1: 'JPEG image data, JFIF standard 1.01',
  png: 'PNG image data, 640 x 480, 8-bit/color RGBA, non-interlaced',
  f2: 'PNG image data, 1024 x 768, 8-bit/color RGB, non-interlaced',
  f4: 'PDF document, version 1.7',
};
const SBF_SHA = {
  bin: '4fdbd68914075174b2282d75f6c47ae08d4b7b1627ea23b31537b0deb08e6669',
  f1: 'c30e5f2c2e4a5e81352f40982ed4793e825921e06704e4532f2e0b1e6c89f8fc',
  f2: 'cea6f90174d877ee41894424518cc740e45a8e784f281bc95cc30cf48f92896b',
  f4: '8bd0e4f0cd6487bff11bef1e51ffd476f756681cec4b2ef8367a9710c4bac8d0',
};

CS.registerRoom({
  id: 'schijf-bestandssysteem-forensie',
  path: 'forensie',
  order: 3,
  title: 'Schijf- en bestandssysteemforensie',
  icon: '💽',
  difficulty: 'Gemiddeld',
  minutes: 95,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Hoe een schijf data opslaat, wat er echt gebeurt als je een bestand "verwijdert", en hoe je met magic bytes, slack space en file carving verborgen bewijs terugvindt.',
  objectives: [
    'Uitleggen hoe opslag werkt (sectoren, clusters) en wat FAT, exFAT, NTFS en ext4 onderscheidt',
    'Beschrijven wat er met een bestand gebeurt als je het verwijdert, en waarom recovery vaak mogelijk is',
    'Slack space en unallocated space herkennen en uitleggen waar verborgen data zit',
    'Een bestandstype herkennen aan de magic bytes (bestandssignatuur), ook zonder extensie',
    'File carving uitleggen: bestanden terugvinden op basis van signaturen zonder bestandssysteem',
    'De integriteit van bewijs aantonen met hashing, en MAC-tijden kritisch lezen',
  ],
  tasks: [
    {
      title: 'Taak 1 — De digitale plaats delict: schijfforensie',
      tryFirst: true,
      intro: `<p>In het lab staat de bewijsregistratie van zaak 2026-0442: drie in beslag genomen stukken, elk met een eigen zegel. Bij één stuk klopt de keten niet. Filter op het stuknummer (bijvoorbeeld <code>[B1]</code>) en volg wie het stuk wanneer had en welk zegel erop zat.</p>`,
      lab: { type: 'logs', title: 'bewijsregistratie zaak-2026-0442.log', lines: SBF_COC_LOG },
      content: `
        <p>Stel je voor: de Politie neemt bij een inval een laptop in beslag. Op die schijf kan het bewijs staan dat een zaak maakt of breekt: een verwijderd document, een foto, een chatgeschiedenis. Als <strong>digitaal rechercheur</strong> onderzoek je die schijf zonder er één byte aan te veranderen, en kun je daarna uitleggen, desnoods voor de rechter, hoe je aan je bewijs komt. Dat vakgebied heet <strong>schijfforensie</strong> (disk forensics).</p>

        <h3>Vergelijk het met een echte plaats delict</h3>
        <p>Een rechercheur die een woning onderzoekt, trekt handschoenen aan, fotografeert alles voordat hij iets aanraakt, en noteert wie wat wanneer deed. Digitaal doe je hetzelfde. Drie begrippen die je overal tegenkomt:</p>
        <ul>
          <li><strong>Machtiging</strong>: je hebt toestemming nodig (van de officier van justitie, de rechter-commissaris, of bij een bedrijf een schriftelijke opdracht) om een gegevensdrager te onderzoeken. Zonder grondslag is je onderzoek onrechtmatig en kan het bewijs worden uitgesloten.</li>
          <li><strong>Chain of custody</strong> (bewijsketen): een sluitend logboek van wie het bewijs wanneer in handen had. Elke overdracht wordt vastgelegd, met het zegelnummer erbij. Zit er een gat in de keten, of klopt een zegel niet, dan kan de verdediging het bewijs aanvechten.</li>
          <li><strong>Forensische kopie</strong> (image): je werkt nooit op het origineel. Je maakt een exacte, bit-voor-bit kopie (vaak een <code>.dd</code>- of E01-bestand) via een <strong>write-blocker</strong>: een apparaat dat schrijfacties naar de schijf onmogelijk maakt.</li>
        </ul>

        <h3>Hoe je een keten controleert</h3>
        <p>Neem één stuk en loop de regels op tijd af. Elke regel moet aansluiten op de vorige: wie het stuk ontvangt, is de persoon die het daarna overdraagt. Na elke verbroken verzegeling volgt een nieuw zegel, en bij de volgende overdracht of ontvangst moet precies dat nummer terugkomen. Een overdracht die ontbreekt of een zegelnummer dat verandert zonder verklaring, is een gat.</p>

        <div class="callout info"><strong>Nederlandse context:</strong> grote en complexe digitale onderzoeken lopen vaak via het <strong>NFI</strong> (Nederlands Forensisch Instituut) en de cybercrimeteams van de Politie. Zij hanteren strikte procedures, juist omdat digitaal bewijs zo makkelijk (per ongeluk) te veranderen is.</div>

        <h3>Waarom bit-voor-bit?</h3>
        <p>Als je een bestand gewoon kopieert (met Verkenner of <code>cp</code>), krijg je alleen de <em>zichtbare</em> bestanden. Een forensische kopie pakt de <strong>hele schijf</strong>, inclusief lege ruimte, restjes van verwijderde bestanden en verborgen hoeken. Juist daar zit vaak het interessantste bewijs. In deze room leer je waar die restjes vandaan komen en hoe je ze terugvindt.</p>
      `,
      questions: [
        { q: 'Wat is de belangrijkste reden om op een forensische kopie te werken in plaats van op de originele schijf?', options: ['Een kopie is sneller te doorzoeken', 'Zo verander je het originele bewijs niet en blijft het bruikbaar in een zaak', 'Een kopie is kleiner', 'Het origineel is versleuteld'], answer: 1, explain: 'Je werkt op een exacte kopie zodat het origineel onaangetast blijft en als betrouwbaar bewijs overeind blijft.' },
        { q: 'Wie had stuk B1 als laatste aantoonbaar in handen voordat de keten breekt?', answer: ['S. de Wit', 'de wit', 's de wit', 's.de wit'],
          hints: ['Filter op [B1] en lees de regels van boven naar beneden.', 'Kijk wie het nieuwe zegel aanbrengt na het imagen, en of daarna een OVERDRACHT volgt.', 'De laatste persoon die iets met B1 doet op 2 oktober is de digitaal rechercheur.'],
          wrong: { 'a. yilmaz': 'A. Yilmaz ontvangt het stuk pas op 3 oktober, zonder dat er een overdracht naar haar is vastgelegd. Wie had het daarvoor?', 'yilmaz': 'A. Yilmaz ontvangt het stuk pas op 3 oktober, zonder dat er een overdracht naar haar is vastgelegd. Wie had het daarvoor?', 'r. bakker': 'R. Bakker droeg B1 al om 10:05 over aan de bewijskamer.' },
          explain: 'S. de Wit brengt om 18:55 zegel Z-44901 aan. Daarna ontbreekt een overdracht: de volgende regel is de ontvangst in de bewijskamer op 3 oktober om 08:10.' },
        { q: 'Welk zegelnummer is bij de ontvangst van B1 op 3 oktober genoteerd, terwijl er een ander zegel op hoorde te zitten?', answer: ['Z-44910', 'z44910', '44910'],
          hints: ['Zoek de regel ONTVANGST bij B1.', 'Vergelijk het zegel bij ontvangst met het zegel dat om 18:55 is aangebracht.', 'De cijfers lijken op Z-44901, maar twee ervan staan omgedraaid.'],
          wrong: { 'z-44901': 'Dat is het zegel dat S. de Wit aanbracht. Bij ontvangst staat een ander nummer.', 'z-44817': 'Dat was het oorspronkelijke zegel. Het is om 16:52 verbroken voor het imagen.' },
          why: 'Een afwijkend zegelnummer kan een typefout zijn of een teken dat het stuk is geopend. Zonder verklaring kan de verdediging het hele onderzoek aan de laptop aanvechten, ook al klopte de hash.',
          explain: 'Aangebracht is Z-44901, ontvangen is Z-44910. Dat moet worden uitgezocht en vastgelegd (een proces-verbaal van bevindingen), niet stil worden verbeterd.' },
        { q: 'De hash van bewijs.dd is gelijk aan de hash van de bron. Wat zegt dat over het gat in de keten van de laptop?',
          options: ['Niets: het gat telt niet meer mee', 'De kopie is intact, maar over wat er daarna met de laptop zelf gebeurde, zegt de hash niets', 'De laptop is gegarandeerd gemanipuleerd', 'De hash moet opnieuw met MD5 worden berekend'], answer: 1,
          wrong: { 0: 'De hash dekt alleen de kopie van 18:47. Wat er daarna met de fysieke laptop gebeurde, moet de keten aantonen.', 2: 'Een gat is een vraag, geen bewijs van manipulatie. Je zoekt het uit en legt het vast.', 3: 'Een ander algoritme verandert niets aan het probleem: het gaat om de bewaring van het stuk, niet om de kopie.' },
          explain: 'De image is betrouwbaar (bron en kopie hebben dezelfde hash). Het gat gaat over de laptop zelf, bijvoorbeeld als die later nog eens moet worden onderzocht.' },
      ],
    },

    {
      title: 'Taak 2 — Hoe een schijf data opslaat: sectoren en clusters',
      tryFirst: true,
      intro: `<p>In het lab staan de eerste 96 bytes van de bootsector van het NTFS-volume uit <code>bewijs.dd</code>. Daarin staat hoe groot een sector en een cluster zijn. Lees de bytes op offset <code>0x0B</code> (twee bytes) en <code>0x0D</code> (één byte) en reken uit hoe groot één cluster is. Pas op: NTFS slaat getallen little-endian op.</p>`,
      lab: { type: 'hexviewer', filename: 'bewijs.dd (bootsector, eerste 96 bytes)', hex: SBF_VBR_HEX },
      content: `
        <p>Voordat je verborgen data kunt terugvinden, moet je snappen hoe een schijf data <em>bewaart</em>.</p>

        <h3>Sectoren: de kleinste blokjes</h3>
        <p>Een schijf is opgedeeld in gelijke blokjes die <strong>sectoren</strong> heten. Traditioneel is een sector <strong>512 bytes</strong> (nieuwere schijven gebruiken intern 4096 bytes, "Advanced Format"). De schijf zelf weet niets van bestanden; hij kent alleen genummerde sectoren.</p>

        <h3>Clusters: de blokjes van het bestandssysteem</h3>
        <p>Het <strong>bestandssysteem</strong> (file system) is de administratie die bijhoudt welke sectoren bij welk bestand horen. Het werkt niet per sector, maar bundelt sectoren tot <strong>clusters</strong> (ook wel "allocation units"). Een cluster is bijvoorbeeld 8 sectoren = 4096 bytes (4 KB), de standaard bij NTFS op de meeste volumes. Een cluster is de <strong>kleinste eenheid</strong> die het bestandssysteem aan één bestand kan toewijzen.</p>

        <div class="callout tip"><strong>Analogie:</strong> zie een sector als één postvakje en een cluster als een rij postvakjes die altijd samen worden verhuurd. Zelfs als je maar één briefje te bewaren hebt, huur je de hele rij. De lege postvakjes in die rij blijven voor jou gereserveerd. Onthoud dat, want daar komt straks "slack space" vandaan.</div>

        <figure class="diagram">
          <svg viewBox="0 0 440 120" role="img" aria-label="Sectoren gebundeld tot een cluster">
            <text x="0" y="16" fill="currentColor" font-size="13">1 cluster = 8 sectoren (hier 4096 bytes)</text>
            <rect x="0" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="48" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="96" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="144" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="192" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="240" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="288" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <rect x="336" y="30" width="48" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <text x="12" y="55" fill="currentColor" font-size="13">512</text>
            <text x="0" y="92" fill="currentColor" font-size="13">elk blokje = 1 sector (512 bytes)</text>
          </svg>
          <figcaption>Het bestandssysteem wijst ruimte toe per cluster, niet per losse sector.</figcaption>
        </figure>

        <h3>De bootsector lezen</h3>
        <p>De eerste sector van een NTFS-volume (de <em>volume boot record</em>) beschrijft het volume. Na drie bytes springcode staat op offset <code>0x03</code> de tekst <code>NTFS</code>. Daarna volgen vaste velden:</p>
        <table>
          <thead><tr><th>Offset</th><th>Lengte</th><th>Betekenis</th></tr></thead>
          <tbody>
            <tr><td><code>0x0B</code></td><td>2 bytes</td><td>bytes per sector</td></tr>
            <tr><td><code>0x0D</code></td><td>1 byte</td><td>sectoren per cluster</td></tr>
            <tr><td><code>0x28</code></td><td>8 bytes</td><td>totaal aantal sectoren van het volume</td></tr>
            <tr><td><code>0x30</code></td><td>8 bytes</td><td>clusternummer waar de $MFT begint</td></tr>
          </tbody>
        </table>
        <p><strong>Little-endian</strong> betekent: de minst belangrijke byte staat voorop. De bytes <code>00 08</code> lees je dus als <code>0x0800</code> = 2048, niet als <code>0x0008</code>. Draai de volgorde van de bytes om, schrijf ze achter elkaar en reken dan pas om naar decimaal. Intel-processors en NTFS werken zo; veel netwerkprotocollen en PNG werken juist big-endian (de belangrijkste byte voorop).</p>

        <h3>HDD en SSD</h3>
        <p>Een <strong>HDD</strong> (harde schijf) heeft draaiende magnetische schijven en een leeskop, vergelijkbaar met een platenspeler. Een <strong>SSD</strong> gebruikt flashgeheugen zonder bewegende delen: veel sneller, maar forensisch lastiger. Het besturingssysteem meldt verwijderde blokken met <strong>TRIM</strong> aan de SSD, die ze op de achtergrond leegmaakt. Op een HDD blijft verwijderde data meestal veel langer staan dan op een SSD.</p>
      `,
      questions: [
        { q: 'Wat is de kleinste eenheid die een bestandssysteem aan één bestand toewijst?', options: ['Een byte', 'Een sector', 'Een cluster', 'Een partitie'], answer: 2, explain: 'Het bestandssysteem werkt per cluster (een bundel sectoren); dat is de kleinste toewijsbare eenheid.' },
        { q: 'Hoe groot is één cluster op dit volume, in bytes?', answer: ['8192', '8 kb', '8kb', '8 kib'],
          hints: ['Je hebt twee getallen nodig: bytes per sector en sectoren per cluster. Vermenigvuldig ze.', 'Offset 0x0B en 0x0C bevatten 00 02; offset 0x0D bevat 10. Lees de twee bytes little-endian.', '00 02 little-endian is 0x0200 = 512. De byte 10 is hex, dus 16 sectoren.'],
          wrong: { '4096': 'Dat is de clustergrootte uit het voorbeeld in de tekst. Lees zelf het aantal sectoren per cluster op offset 0x0D.', '5120': 'Je leest de byte 10 op offset 0x0D als decimaal tien. Het is hex: 0x10 = 16.', '32': 'Je leest 00 02 big-endian als 2. NTFS is little-endian: 00 02 wordt 0x0200 = 512.', '16': 'Dat is het aantal sectoren per cluster. Gevraagd zijn bytes.' },
          explain: '512 bytes per sector maal 16 sectoren per cluster = 8192 bytes (8 KB). Het volume is dus met een grotere clustergrootte dan de standaard geformatteerd.' },
        { q: 'Waarom is verwijderde data op een SSD vaak sneller écht weg dan op een HDD?', options: ['SSD\'s zijn kleiner', 'Door TRIM worden verwijderde blokken op de achtergrond leeggemaakt', 'SSD\'s versleutelen alles', 'HDD\'s hebben geen clusters'], answer: 1, explain: 'TRIM laat de SSD vrijgegeven blokken op de achtergrond leegmaken, waardoor recovery op SSD vaak niet meer lukt.' },
        { q: 'Op welk clusternummer begint de $MFT volgens offset 0x30? Geef het decimale getal.', answer: ['786432', '0xc0000', 'c0000'],
          hints: ['Lees acht bytes vanaf offset 0x30.', 'De bytes zijn 00 00 0C 00 00 00 00 00. Draai de volgorde om.', 'Omgedraaid: 00 00 00 00 00 0C 00 00, dus 0x0C0000.'],
          wrong: { '3072': 'Je leest de bytes 00 00 0C 00 big-endian. Draai ze om: 0x000C0000.', '12': 'Je neemt alleen de byte 0C. De nullen ervoor tellen mee als plaatsen: 0x0C0000.', '6442450944': 'Dat is de byte-offset (cluster maal clustergrootte). Gevraagd is het clusternummer.' },
          explain: '0x0C0000 = 786432. Maal 8192 bytes per cluster begint de $MFT op byte 6.442.450.944 van het volume. Zo vindt een forensische tool de $MFT ook als de bestandsnamen niets meer zeggen.' },
      ],
    },

    {
      title: 'Taak 3 — Bestandssystemen en de MFT',
      tryFirst: true,
      intro: `<p>Een MFT-parser heeft de Master File Table van <code>bewijs.dd</code> uitgelezen. Elke regel is één record: nummer, of het nog in gebruik is (<code>InUse</code>), map, naam, grootte en eventuele extra streams (<code>ADS</code>). Zoek de verwijderde bestanden en de stream die er niet hoort.</p>`,
      lab: { type: 'logs', title: 'mft-uitvoer bewijs.dd (vereenvoudigd)', lines: SBF_MFT_CSV },
      content: `
        <p>Er zijn meerdere bestandssystemen, elk met een eigen manier van administratie voeren. Als rechercheur herken je ze en weet je welk systeem de rijkste sporen achterlaat.</p>

        <table>
          <thead><tr><th>Bestandssysteem</th><th>Waar je het vindt</th><th>Kenmerk</th></tr></thead>
          <tbody>
            <tr><td><strong>FAT32</strong></td><td>Oude USB-sticks, SD-kaartjes, camera's</td><td>Simpel, maximaal 4 GB per bestand, weinig metadata</td></tr>
            <tr><td><strong>exFAT</strong></td><td>Grote USB-sticks en SD-kaarten</td><td>Als FAT, maar zonder de 4 GB-limiet</td></tr>
            <tr><td><strong>NTFS</strong></td><td>Windows-systeemschijven</td><td>Rijk aan metadata, rechten, logging: een goudmijn voor forensie</td></tr>
            <tr><td><strong>ext4</strong></td><td>De meeste Linux-systemen</td><td>Modern Linux-bestandssysteem met journaling</td></tr>
          </tbody>
        </table>

        <h3>De MFT: de inhoudsopgave van NTFS</h3>
        <p>Het hart van NTFS is de <strong>Master File Table</strong>, kortweg de <strong>$MFT</strong>. Voor <em>elk</em> bestand en elke map staat er een record in met de naam, de grootte, de tijdstempels en een verwijzing naar de clusters waar de data staat.</p>

        <div class="callout tip"><strong>Analogie:</strong> de $MFT is de kaartenbak van een oude bibliotheek. Gooi je een boek weg, dan haal je meestal alleen het kaartje door; het boek staat nog even in het magazijn. Zo blijft in de $MFT vaak nog een spoor van een "verwijderd" bestand staan.</div>

        <p>Verwijdert iemand een bestand, dan zet NTFS in het record een vlag op "niet in gebruik". Het record zelf blijft staan tot NTFS het voor een nieuw bestand hergebruikt. Een parser laat dat zien als <code>InUse = False</code>. Het volgnummer (<code>Seq</code>) gaat omhoog wanneer een record vrijkomt en opnieuw wordt gebruikt.</p>

        <p>Heel kleine bestanden (grofweg tot zo'n 700 bytes, afhankelijk van de rest van het record) worden volledig <em>in</em> de $MFT zelf opgeslagen: "MFT-resident". Is zo'n bestand verwijderd maar het record nog niet hergebruikt, dan staat de inhoud letterlijk nog in de inhoudsopgave. De $MFT is daarom vaak het eerste wat een onderzoeker uitleest.</p>

        <h3>Alternate data streams (ADS)</h3>
        <p>NTFS kan aan één bestand meerdere "streams" hangen. Naast de gewone inhoud kun je in een extra stream data meesmokkelen, bijvoorbeeld <code>rapport.txt:geheim.exe</code>. In Verkenner zie je alleen <code>rapport.txt</code>, met de grootte van de gewone inhoud. Windows gebruikt zelf ook een stream: <code>Zone.Identifier</code> markeert bestanden die van internet zijn gedownload ("Mark of the Web"). Die is normaal. Een stream met een andere naam verdient een tweede blik.</p>
      `,
      questions: [
        { q: 'Welk bestandssysteem bevat de $MFT en is het rijkst aan forensische metadata?', options: ['FAT32', 'exFAT', 'NTFS', 'ext4'], answer: 2, explain: 'NTFS (Windows) houdt in de $MFT uitgebreide metadata bij; dat maakt het een rijke bron.' },
        { q: 'Hoeveel bestanden in de uitvoer zijn verwijderd, maar hebben nog een record?', answer: ['3', 'drie'],
          hints: ['Verwijderd herken je aan de kolom InUse.', 'Filter op ,False,', 'Twee documenten en één foto.'],
          wrong: { '0': 'Filter op False in plaats van op True.', '17': 'Dat zijn de records die nog in gebruik zijn.', '2': 'Kijk ook in de map Pictures.' },
          explain: 'wachtwoorden.txt, betalingen_q3.xlsx en IMG_0042.jpg staan op InUse = False. Hun records bestaan nog, dus naam, grootte en tijden zijn terug te halen.' },
        { q: 'Van welk verwijderd bestand staat de inhoud waarschijnlijk nog in het MFT-record zelf?', answer: ['wachtwoorden.txt', 'wachtwoorden'],
          hints: ['Alleen kleine bestanden passen in een MFT-record.', 'Vergelijk de grootte van de drie verwijderde bestanden.', 'Het is het enige verwijderde bestand van een paar honderd bytes.'],
          wrong: { 'boodschappen.txt': 'Dat bestand is klein genoeg, maar het is niet verwijderd (InUse = True).', 'todo.txt': 'Dat bestand is klein genoeg, maar het is niet verwijderd (InUse = True).', 'betalingen_q3.xlsx': 'Ruim 48 KB past niet in een record van 1 KB. Die data staat in clusters, en die kunnen al zijn overschreven.' },
          explain: 'wachtwoorden.txt is 312 bytes en verwijderd. Zolang record 66 niet is hergebruikt, staat de inhoud nog in het record. Een parser kan die er direct uit halen.' },
        { q: 'Welke extra stream (ADS) valt op, omdat het geen Zone.Identifier is? Geef de naam van de stream.', answer: ['codes.txt', 'notities.txt:codes.txt'],
          hints: ['Kijk naar de laatste kolom.', 'Filter op .txt en kijk welke regel twee namen bevat.', 'Drie streams heten Zone.Identifier; één niet. Hij hangt aan een tekstbestand in Documents.'],
          wrong: { 'zone.identifier': 'Die stream zet Windows zelf op gedownloade bestanden. Gevraagd is de stream die daar niet bij hoort.', 'notities.txt': 'Dat is het bestand. Gevraagd is de naam van de stream die eraan hangt.' },
          explain: 'notities.txt heeft een stream codes.txt. In Verkenner zie je alleen notities.txt van 1840 bytes; de inhoud van de stream lees je met forensische tools of in PowerShell met Get-Content -Stream.' },
      ],
    },

    {
      title: 'Taak 4 — "Verwijderd" is niet weg: recovery, slack en unallocated space',
      tryFirst: true,
      intro: `<p>In het lab staat één cluster van 1024 bytes (twee sectoren) van een USB-stick. Volgens het bestandssysteem hoort er alleen <code>boodschappen.txt</code> in, met een grootte van 41 bytes. Kijk wat er na die 41 bytes nog in het cluster staat.</p>`,
      lab: { type: 'hexviewer', filename: 'cluster 1187 (1024 bytes)', hex: SBF_SLACK_HEX },
      content: `
        <p>Dit is een van de belangrijkste lessen van de room, en meteen de reden dat schijfforensie zo krachtig is.</p>

        <h3>Wat gebeurt er echt bij "verwijderen"?</h3>
        <p>Als je een bestand naar de prullenbak sleept en die leegt, denk je dat het weg is. Maar het bestandssysteem haalt meestal alleen het <strong>kaartje uit de kaartenbak</strong>. De ruimte wordt gemarkeerd als "vrij", maar de <strong>eigenlijke data blijft op de schijf staan</strong> totdat er iets anders overheen wordt geschreven.</p>
        <p>Zolang die clusters niet zijn overschreven, kun je het bestand vaak terughalen. Dat heet <strong>recovery</strong>. Pas als nieuwe data over die sectoren heen wordt geschreven, is het oude bestand echt verloren. (Op een SSD kan TRIM dat moment flink vervroegen, zie taak 2.)</p>

        <div class="callout info"><strong>Gevolg voor onderzoek:</strong> een verdachte die "alles heeft gewist" heeft vaak alleen de verwijzingen weggehaald. Daarom kun je met forensische tools verwijderde foto's, documenten en berichten regelmatig reconstrueren.</div>

        <h3>Slack space: het restje in het laatste cluster</h3>
        <p>Ruimte wordt per cluster toegewezen. Stel: een cluster is 4096 bytes en je bestand is maar 100 bytes. Dan krijgt het bestand toch het hele cluster. De overige 3996 bytes heten <strong>slack space</strong>. In die ruimte kunnen nog <em>oude</em> gegevens staan van een bestand dat daar eerder stond.</p>
        <p>Slack bestaat uit twee delen. Het stuk van het einde van het bestand tot het einde van <em>die</em> sector heet <strong>RAM slack</strong> of sector slack: een schijf schrijft altijd hele sectoren, en moderne Windows-versies vullen dat restje met nullen. De sectoren daarna, tot het einde van het cluster, heten <strong>drive slack</strong> of file slack. Die worden bij het schrijven van het nieuwe bestand niet aangeraakt, dus daar staat nog wat er eerder stond. Zie je in een hexviewer na het bestand eerst nullen en dan ineens weer tekst, dan begint de tekst meestal precies op een sectorgrens.</p>

        <figure class="diagram">
          <svg viewBox="0 0 400 90" role="img" aria-label="Een cluster deels gevuld met een bestand, de rest is slack space">
            <rect x="0" y="25" width="140" height="40" fill="var(--accent-soft)" stroke="currentColor" />
            <rect x="140" y="25" width="260" height="40" fill="var(--surface-2)" stroke="currentColor" />
            <text x="18" y="50" fill="currentColor" font-size="13">bestand (100 B)</text>
            <text x="180" y="50" fill="currentColor" font-size="13">slack space (oude data?)</text>
            <text x="0" y="82" fill="currentColor" font-size="13">1 cluster (4096 B)</text>
          </svg>
          <figcaption>Een bestand vult zelden een cluster precies; de rest is slack space.</figcaption>
        </figure>

        <h3>Unallocated space: de grote vrije ruimte</h3>
        <p><strong>Unallocated space</strong> (niet-toegewezen ruimte) is alle ruimte die op dit moment niet aan een bestand is toegewezen. Veel daarvan is "vrij", maar bevat nog data van eerder verwijderde bestanden waar niets overheen kwam. Dit is het jachtgebied voor de techniek uit taak 6: file carving.</p>
      `,
      questions: [
        { q: 'Wat gebeurt er technisch gezien meestal als je een bestand "verwijdert" en de prullenbak leegt?', options: ['De data wordt direct met nullen overschreven', 'Alleen de verwijzing wordt weggehaald; de data blijft tot overschrijven', 'De schijf wordt opnieuw geformatteerd', 'Het bestand wordt versleuteld'], answer: 1, explain: 'Het bestandssysteem markeert de ruimte als vrij maar laat de data staan tot er iets overheen wordt geschreven; vandaar dat recovery kan.' },
        { q: 'Op welke offset (hex) begint de oude data in het cluster?', answer: ['200', '0x200', '00000200', '512'],
          hints: ['Scroll voorbij de tekst van het boodschappenlijstje en de nullen.', 'De oude data begint niet direct na het bestand, maar op een sectorgrens.', 'Een sector is hier 512 bytes. Reken dat om naar hex.'],
          wrong: { '29': 'Op 0x29 eindigt het bestand (41 bytes). Daarna volgen eerst nullen: de RAM slack.', '0x29': 'Op 0x29 eindigt het bestand (41 bytes). Daarna volgen eerst nullen: de RAM slack.', '41': 'Dat is de grootte van het bestand. Daarna volgen nog nullen tot het einde van de sector.', '1024': 'Dat is het einde van het cluster.' },
          explain: 'Vanaf 0x29 tot 0x1FF staan nullen (de rest van de eerste sector). Op 0x200, het begin van de tweede sector, staat ineens weer tekst: drive slack met de resten van een ouder bestand.' },
        { q: 'Wat is unallocated space?', options: ['Ruimte die kapot is', 'Ruimte die nu niet aan een bestand is toegewezen (vaak met resten van verwijderde bestanden)', 'Ruimte die het BIOS gebruikt', 'Versleutelde ruimte'], answer: 1, explain: 'Unallocated space is niet-toegewezen ruimte; veel ervan bevat nog data van verwijderde bestanden.' },
        { q: 'Welke vlag staat in de oude data in de slack?', answer: ['NM{slack_bewaart_oude_data}'], encoded: true,
          hints: ['Lees de ASCII-kolom in de tweede helft van het cluster.', 'De vlag staat achter het woord Controlecode.', 'Hij begint op offset 0x27F.'],
          explain: 'Het lijkt een stuk van een oud bericht over een betaling. Het boodschappenlijstje heeft daar niets mee te maken: de tekst stond er al voordat het lijstje dit cluster kreeg.' },
        { q: 'Hoeveel bytes slack space heeft boodschappen.txt in dit cluster in totaal?', answer: ['983'],
          hints: ['Slack is alles in het cluster na het einde van het bestand.', 'Clustergrootte min bestandsgrootte.', '1024 min 41.'],
          wrong: { '471': 'Dat is alleen de RAM slack (tot het einde van de eerste sector). De tweede sector hoort er ook bij.', '512': 'Dat is alleen de drive slack. Tel de nullen in de eerste sector mee.', '1024': 'Trek de 41 bytes van het bestand eraf.' },
          explain: '1024 - 41 = 983 bytes: 471 bytes RAM slack (nullen) en 512 bytes drive slack (oude data).' },
      ],
    },

    {
      title: 'Taak 5 — Magic bytes: een bestandstype herkennen aan zijn bytes',
      tryFirst: true,
      intro: `<p>Hieronder staat de hex-dump van <code>verdacht.bin</code>. De extensie zegt niets. Bepaal aan de eerste bytes wat voor bestand het is, zoek de afmetingen van het plaatje op in de bytes, en lees de ASCII-kolom: er staat een vlag tussen.</p>`,
      lab: {
        type: 'hexviewer',
        filename: 'verdacht.bin',
        hex: SBF_PNG_HEX,
      },
      content: `
        <p>Een bestandsnaam liegt makkelijk. Iemand noemt een programma <code>vakantiefoto.jpg</code> of een database-dump <code>verdacht.bin</code>; de extensie zegt niets over wat er écht in zit. Bijna elk bestandsformaat verraadt zichzelf aan de <strong>eerste paar bytes</strong>. Die herkenningsbytes heten de <strong>magic bytes</strong> of de <strong>bestandssignatuur</strong> (file signature).</p>

        <div class="callout tip"><strong>Analogie:</strong> magic bytes zijn als de eerste maten van een liedje. Ook zonder de titel herken je het nummer aan de intro. Zo herken je een PNG, een PDF of een ZIP aan de eerste bytes, ongeacht hoe het bestand heet.</div>

        <h3>De signaturen die je uit je hoofd wilt kennen</h3>
        <table>
          <thead><tr><th>Type</th><th>Magic bytes (hex)</th><th>Als tekst</th></tr></thead>
          <tbody>
            <tr><td>PNG-afbeelding</td><td><code>89 50 4E 47</code></td><td><code>.PNG</code></td></tr>
            <tr><td>JPEG-afbeelding</td><td><code>FF D8 FF</code></td><td>(geen leesbare tekst)</td></tr>
            <tr><td>PDF-document</td><td><code>25 50 44 46</code></td><td><code>%PDF</code></td></tr>
            <tr><td>ZIP / DOCX / XLSX</td><td><code>50 4B 03 04</code></td><td><code>PK..</code></td></tr>
            <tr><td>ELF (Linux-programma)</td><td><code>7F 45 4C 46</code></td><td><code>.ELF</code></td></tr>
            <tr><td>EXE (Windows-programma)</td><td><code>4D 5A</code></td><td><code>MZ</code></td></tr>
          </tbody>
        </table>
        <p>Twee weetjes: een <strong>DOCX</strong> begint met <code>PK</code> omdat het eigenlijk een ingepakt ZIP-bestand is. En de <code>MZ</code> van een EXE verwijst naar Mark Zbikowski, een van de ontwikkelaars van MS-DOS.</p>

        <h3>Na de signatuur: de opbouw van een PNG</h3>
        <p>Een PNG bestaat na de signatuur van 8 bytes uit <strong>chunks</strong>. Elke chunk heeft vier bytes lengte, vier letters type, de data en vier bytes controlegetal (CRC). De eerste chunk is altijd <code>IHDR</code>: de eerste vier databytes zijn de breedte en de volgende vier de hoogte in pixels. PNG schrijft getallen <strong>big-endian</strong>: de belangrijkste byte voorop, dus je leest ze gewoon van links naar rechts. Een <code>tEXt</code>-chunk bevat vrije tekst, zoals een commentaar of de naam van de software. De laatste chunk is <code>IEND</code>.</p>

        <div class="callout info"><strong>Les:</strong> dit is precies hoe het commando <code>file</code> (uit taak 7) werkt. Het negeert de extensie en kijkt naar de bytes.</div>
      `,
      questions: [
        { q: 'Welk bestandstype is verdacht.bin werkelijk, gezien de eerste bytes 89 50 4E 47?', options: ['Een PDF-document', 'Een PNG-afbeelding', 'Een Windows-EXE', 'Een ZIP-archief'], answer: 1, explain: '89 50 4E 47 (".PNG") is de signatuur van een PNG-afbeelding; de .bin-extensie was misleidend.' },
        { q: 'Welke vlag staat verstopt in de ASCII-kolom van de hex-dump?', answer: ['NM{png_magic_bytes}'], encoded: true,
          hints: ['Lees de rechterkolom van de hex-dump.', 'De vlag staat in de tEXt-chunk.', 'Zoek naar "verborgen vlag:".'],
          explain: 'In de ASCII-weergave is de tekst NM{png_magic_bytes} leesbaar, ook al staat hij als losse bytes op de schijf.' },
        { q: 'Hoe breed is de afbeelding volgens de IHDR-chunk, in pixels?', answer: ['640'],
          hints: ['De breedte staat in de vier bytes direct na de letters IHDR.', 'Dat zijn de bytes op offset 0x10 tot en met 0x13: 00 00 02 80.', '0x0280 omrekenen naar decimaal: 2 x 256 + 128.'],
          wrong: { '480': 'Dat is de hoogte: de vier bytes daarna.', '280': 'Dat is de hexwaarde. Reken 0x280 om naar decimaal.', '0x280': 'Dat is de hexwaarde. Reken 0x280 om naar decimaal.', '2147614720': 'Je leest de bytes little-endian (achterstevoren). PNG is big-endian: lees van links naar rechts.', '13': 'Dat is de lengte van de IHDR-chunk (00 00 00 0D), die staat vóór de letters IHDR.' },
          explain: '00 00 02 80 big-endian is 0x280 = 640. De hoogte erna is 00 00 01 E0 = 480. Een plaatje van 640 x 480 met een commentaar dat er niet in thuishoort: reden om verder te kijken.' },
      ],
    },

    {
      title: 'Taak 6 — File carving, metadata en MAC-tijden',
      tryFirst: true,
      intro: `<p>Op de laptop staat <code>C:\\Users\\rb\\AppData\\Local\\svc-update.exe</code>. NTFS bewaart voor dit bestand twee aanmaaktijden, als FILETIME-getal:</p>
<table><thead><tr><th>Attribuut</th><th>Created (FILETIME)</th></tr></thead><tbody>
<tr><td>$STANDARD_INFORMATION ($SI)</td><td><code>131968584000000000</code></td></tr>
<tr><td>$FILE_NAME ($FN)</td><td><code>134353628474718263</code></td></tr>
</tbody></table>
<p>Reken beide om in het lab en zet ze in Nederlandse tijd. Welke past bij de zaak, en welke niet?</p>`,
      lab: { type: 'timestamp', value: '134353628474718263' },
      content: `
        <p>Nu combineer je de vorige twee taken. Verwijderde data blijft in unallocated space staan (taak 4) en elk bestandstype heeft herkenbare magic bytes (taak 5). Samen leveren ze een krachtige techniek op.</p>

        <h3>File carving: bestanden redden zonder bestandssysteem</h3>
        <p>Soms is de "kaartenbak" (de $MFT of de FAT) beschadigd of gewist, of je kijkt naar rauwe unallocated space zonder administratie. Dan weet je niet meer welke bytes bij welk bestand horen. <strong>File carving</strong> lost dat op: de tool scant de rauwe bytes op bekende <strong>magic bytes</strong> (het begin van een bestand) en vaak ook op het <strong>einde</strong> (bijvoorbeeld <code>FF D9</code> voor JPEG). Alles ertussen "snijdt" hij eruit als hersteld bestand. De carver kiest zelf een naam en extensie; de oorspronkelijke naam is weg.</p>

        <div class="callout tip"><strong>Analogie:</strong> je hebt een grote bak met losse vellen papier. Je kent de koptekst van elk soort document ("FACTUUR", "RECEPT"). Je zoekt alle koppen en pakt vanaf elke kop tot de volgende het hele document, ook al is de inhoudsopgave weg. Dat is carving. Bekende tools zijn <em>PhotoRec</em> en <em>Scalpel</em>.</div>
        <p>De grens van carving: is een bestand <strong>gefragmenteerd</strong> (in losse stukken over de schijf verspreid), dan plakt carving soms de verkeerde stukken aan elkaar. Daarom blijft de $MFT, als die er nog is, de betrouwbaarste bron.</p>

        <h3>Metadata en de MAC-tijden</h3>
        <p>Naast de inhoud bewaart een bestandssysteem <strong>metadata</strong>: gegevens over het bestand. De bekendste zijn de <strong>MAC-tijden</strong>:</p>
        <ul>
          <li><strong>M (Modified)</strong>: wanneer de inhoud voor het laatst is gewijzigd.</li>
          <li><strong>A (Accessed)</strong>: wanneer het bestand voor het laatst is geopend of gelezen.</li>
          <li><strong>C (Changed of Created)</strong>: op NTFS de wijziging van het MFT-record; op ext4/POSIX de <em>ctime</em> (laatste metadata-wijziging). Het aanmaakmoment heet in de MACB-notatie <strong>B</strong> (Born).</li>
        </ul>
        <p>Met MAC-tijden bouw je een <strong>tijdlijn</strong> van wat er wanneer gebeurde. Wees wel kritisch.</p>

        <h3>FILETIME en tijdzones</h3>
        <p>NTFS slaat tijden op als <strong>FILETIME</strong>: het aantal intervallen van 100 nanoseconden sinds 1 januari 1601, in <strong>UTC</strong>. Een getal van 18 cijfers rond 1,3 x 10<sup>17</sup> is dus vrijwel zeker een FILETIME. Nederland loopt in de winter een uur voor op UTC (CET) en in de zomer twee uur (CEST). De zomertijd loopt van de laatste zondag van maart tot de laatste zondag van oktober.</p>
        <div class="callout warn"><strong>Let op tijdzones:</strong> sommige bronnen bewaren UTC, andere lokale tijd. Reken altijd om naar één referentie en zet erbij welke, anders trek je verkeerde conclusies over wie wanneer actief was.</div>

        <h3>Twee sets tijden en timestomping</h3>
        <p>NTFS bewaart per bestand twee sets tijden: in het attribuut <strong>$STANDARD_INFORMATION</strong> ($SI) en in <strong>$FILE_NAME</strong> ($FN). Verkenner en de meeste programma's tonen $SI. Die tijden kan elk programma met gewone Windows-functies aanpassen. De $FN-tijden worden door het bestandssysteem zelf bijgewerkt, bijvoorbeeld bij aanmaken, hernoemen of verplaatsen, en zijn met gewone middelen veel lastiger te veranderen.</p>
        <div class="callout danger"><strong>Let op manipulatie:</strong> een aanvaller kan de tijden van zijn malware op een oude datum zetten om onder de radar te blijven (timestomping). Aanwijzingen: een $SI-aanmaaktijd die vóór de $FN-aanmaaktijd ligt, of een $SI-tijd met precies nul als fractie van de seconde. Vergelijk daarom $SI met $FN en met andere bronnen, zoals Prefetch of logs.</div>

        <h3>Hashing: bewijs dat niets is veranderd</h3>
        <p>Hoe toon je aan dat jouw kopie identiek is aan het origineel en dat je er niets aan hebt veranderd? Met een <strong>hash</strong> (bijvoorbeeld SHA-256): een vaste "vingerafdruk" van de data. Verandert er één bit, dan verandert de hash volledig. Je berekent de hash vóór het kopiëren en erna; zijn ze gelijk, dan is de kopie bewijsbaar intact. Die hashes leg je vast in je rapport en in de chain of custody.</p>
      `,
      questions: [
        { q: 'Wat doet file carving?', options: ['Het versleutelt bestanden', 'Het herstelt bestanden op basis van magic bytes, zonder de administratie van het bestandssysteem', 'Het wist bestanden veilig', 'Het verkleint bestanden'], answer: 1, explain: 'Carving zoekt in rauwe data naar bekende begin- (en eind)signaturen en snijdt daartussen de bestanden eruit.' },
        { q: 'Hoe laat is svc-update.exe volgens $FN aangemaakt, in Nederlandse tijd? Geef UU:MM:SS.', answer: ['23:14:07', '23.14.07', '231407'],
          hints: ['Het lab staat al op de $FN-waarde. Zoek de interpretatie als Windows FILETIME.', 'Het lab toont UTC en Europe/Amsterdam. Gebruik de Nederlandse tijd.', 'Het is 1 oktober 2026, nog zomertijd: UTC plus twee uur.'],
          wrong: { '21:14:07': 'Dat is UTC. FILETIME staat in UTC; in Nederland was het op 1 oktober zomertijd (UTC+2).', '22:14:07': 'Je telt één uur op, maar op 1 oktober geldt nog zomertijd: UTC+2.', '/^11:00/': 'Dat is de $SI-tijd. Gevraagd is de $FN-aanmaaktijd.' },
          why: 'Een tijdlijn met tijden uit verschillende zones is een klassieke fout in rapporten. Eén uur verschil kan bepalen of iemand nog op kantoor was of al thuis.',
          explain: 'Het getal is 2026-10-01 21:14:07 UTC, in Nederland 23:14:07 (CEST). Dat is de avond waarop de verdachte volgens de zaak actief was.' },
        { q: 'Waarom vertrouw je niet blind op een enkele tijdstempel?', options: ['Omdat tijdstempels niet bestaan in NTFS', 'Omdat ze vervalst (getimestompt) kunnen zijn en in verschillende tijdzones staan', 'Omdat ze altijd in UTC staan', 'Omdat ze te groot zijn'], answer: 1, explain: 'Tijdstempels kunnen gemanipuleerd zijn en in UTC of lokale tijd staan; vergelijk daarom meerdere bronnen.' },
        { q: 'Waarmee toon je aan dat je forensische kopie bit-voor-bit gelijk is aan het origineel?', answer: ['hash', 'hashing', 'sha256', 'sha-256', 'checksum'], hint: 'Een vaste "vingerafdruk" zoals SHA-256.', explain: 'Een hash (bv. SHA-256) over bron en kopie moet identiek zijn; dat bewijst dat er niets is veranderd.' },
        { q: 'In welk jaar zou svc-update.exe volgens $SI zijn aangemaakt?', answer: ['2019'],
          hints: ['Plak de $SI-waarde uit de tabel in het lab.', 'Lees de interpretatie als Windows FILETIME.', 'Het is in maart, ruim zeven jaar voor de $FN-tijd.'],
          wrong: { '2026': 'Dat is het jaar van de $FN-tijd. Plak de $SI-waarde in het lab.', '1601': 'Dat is het nulpunt van FILETIME. Het getal zelf is veel groter dan nul.' },
          explain: '131968584000000000 is 12 maart 2019, 10:00:00,0000000 UTC: een ronde tijd zonder fractie, zeven jaar vóór de $FN-tijd. Samen zijn dat twee klassieke tekenen van timestomping.' },
      ],
    },

    {
      title: 'Taak 7 — Onderzoek in de terminal',
      content: `
        <p>Tijd om het echt te doen. Je werkt op de forensische kopie van zaak <strong>2026-0442</strong>, die onder <code>/cases/zaak-2026-0442/</code> staat. Je voert vier klassieke handelingen uit: een onbekend bestand identificeren, de leesbare tekst eruit halen, de integriteit van de schijfkopieën controleren en gecarvede bestanden beoordelen.</p>

        <h3>Stap 1: identificeer het bestandstype</h3>
        <p>De extensie <code>.bin</code> zegt niets. Laat <code>file</code> naar de magic bytes kijken. Typ:</p>
        <pre><code>file verdacht.bin</code></pre>

        <h3>Stap 2: haal de leesbare strings eruit</h3>
        <p>Met <code>strings</code> trek je alle leesbare tekst uit een binair bestand: verstopte URL's, namen of vlaggen. De rauwe bytes bekijk je met <code>xxd</code>:</p>
        <pre><code>strings verdacht.bin</code></pre>
        <pre><code>xxd verdacht.bin</code></pre>

        <h3>Stap 3: controleer de integriteit van de schijfkopieën</h3>
        <p>Er staan twee kopieën van de schijf: <code>bewijs.dd</code> en <code>werkkopie.dd</code>. Lees met <code>cat chain-of-custody.txt</code> welke hash bij de acquisitie is vastgelegd en bereken die van beide kopieën:</p>
        <pre><code>sha256sum bewijs.dd</code></pre>
        <pre><code>sha256sum werkkopie.dd</code></pre>
        <div class="callout tip"><strong>In de praktijk:</strong> je noteert de hash in je rapport en in de chain of custody. Alleen een kopie waarvan de hash gelijk is aan die van de bron, gebruik je als bewijs. Wijkt een kopie af, dan zoek je uit waarom en werk je er niet verder mee.</div>

        <h3>Stap 4: beoordeel de gecarvede bestanden</h3>
        <p>De carver heeft vier bestanden uit de unallocated space van <code>bewijs.dd</code> gehaald en in de map <code>unalloc/</code> gezet. De namen en extensies heeft de carver zelf gekozen. Gebruik <code>ls unalloc</code>, <code>file</code> en <code>sha256sum</code> op die bestanden (bijvoorbeeld <code>file unalloc/f0001.jpg</code> of <code>sha256sum unalloc/*</code>).</p>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'rechercheur', host: 'nfi-lab',
        home: '/cases/zaak-2026-0442', cwd: '/cases/zaak-2026-0442',
        motd: 'Forensisch werkstation (read-only image). Start met: file verdacht.bin',
        fs: { ...SBF_FS },
        denied: ['/root'],
        commands: {
          'file verdacht.bin': 'verdacht.bin: ' + SBF_FILE_OUT.png,
          'file bewijs.dd': 'bewijs.dd: DOS/MBR boot sector; partition 1 : ID=0x7 (NTFS), start-CHS ...',
          'file werkkopie.dd': 'werkkopie.dd: DOS/MBR boot sector; partition 1 : ID=0x7 (NTFS), start-CHS ...',
          'strings verdacht.bin': `IHDR
+tEXtComment
verborgen vlag: NM{png_magic_bytes}
IEND`,
          'xxd verdacht.bin': `00000000: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
00000010: 0000 0280 0000 01e0 0806 0000 0035 d1dc  .............5..
00000020: e400 0000 2b74 4558 7443 6f6d 6d65 6e74  ....+tEXtComment
00000030: 0076 6572 626f 7267 656e 2076 6c61 673a  .verborgen vlag:
00000040: 204e 4d7b 706e 675f 6d61 6769 635f 6279   NM{png_magic_by
00000050: 7465 737d 0439 50f0 0000 0000 4945 4e44  tes}.9P.....IEND
00000060: ae42 6082                                .B\`.`,
          'sha256sum bewijs.dd': 'ae3e49d8b680d40b2d626d96e037e4c72d30abde93ee581aa6c6544fe92fca11  bewijs.dd',
          'sha256sum werkkopie.dd': '74e70b122ff88a312c96f2153085209f0958f61fc720fb17716da711c2968bd0  werkkopie.dd',
          'sha256sum bewijs.dd werkkopie.dd': 'ae3e49d8b680d40b2d626d96e037e4c72d30abde93ee581aa6c6544fe92fca11  bewijs.dd\n74e70b122ff88a312c96f2153085209f0958f61fc720fb17716da711c2968bd0  werkkopie.dd',
          'sha256sum *.dd': 'ae3e49d8b680d40b2d626d96e037e4c72d30abde93ee581aa6c6544fe92fca11  bewijs.dd\n74e70b122ff88a312c96f2153085209f0958f61fc720fb17716da711c2968bd0  werkkopie.dd',
          'sha256sum verdacht.bin': SBF_SHA.bin + '  verdacht.bin',
          'file unalloc/f0001.jpg': 'unalloc/f0001.jpg: ' + SBF_FILE_OUT.f1,
          'file unalloc/f0002.jpg': 'unalloc/f0002.jpg: ' + SBF_FILE_OUT.f2,
          'file unalloc/f0003.jpg': 'unalloc/f0003.jpg: ' + SBF_FILE_OUT.png,
          'file unalloc/f0004.pdf': 'unalloc/f0004.pdf: ' + SBF_FILE_OUT.f4,
          'file unalloc/*': 'unalloc/LEESMIJ.txt: ASCII text\nunalloc/f0001.jpg:  ' + SBF_FILE_OUT.f1 + '\nunalloc/f0002.jpg:  ' + SBF_FILE_OUT.f2 + '\nunalloc/f0003.jpg:  ' + SBF_FILE_OUT.png + '\nunalloc/f0004.pdf:  ' + SBF_FILE_OUT.f4,
          'sha256sum unalloc/f0001.jpg': SBF_SHA.f1 + '  unalloc/f0001.jpg',
          'sha256sum unalloc/f0002.jpg': SBF_SHA.f2 + '  unalloc/f0002.jpg',
          'sha256sum unalloc/f0003.jpg': SBF_SHA.bin + '  unalloc/f0003.jpg',
          'sha256sum unalloc/f0004.pdf': SBF_SHA.f4 + '  unalloc/f0004.pdf',
          'sha256sum unalloc/*': '0d3b9a1c6e2f87d4b5a09e13c7f2d8a6b4e1c0f9a8d7b6c5e4f3a2b1c0d9e8f7  unalloc/LEESMIJ.txt\n' + SBF_SHA.f1 + '  unalloc/f0001.jpg\n' + SBF_SHA.f2 + '  unalloc/f0002.jpg\n' + SBF_SHA.bin + '  unalloc/f0003.jpg\n' + SBF_SHA.f4 + '  unalloc/f0004.pdf',
          'file f0001.jpg': 'f0001.jpg: ' + SBF_FILE_OUT.f1,
          'file f0002.jpg': 'f0002.jpg: ' + SBF_FILE_OUT.f2,
          'file f0003.jpg': 'f0003.jpg: ' + SBF_FILE_OUT.png,
          'file f0004.pdf': 'f0004.pdf: ' + SBF_FILE_OUT.f4,
          'file *': 'LEESMIJ.txt: ASCII text\nf0001.jpg:   ' + SBF_FILE_OUT.f1 + '\nf0002.jpg:   ' + SBF_FILE_OUT.f2 + '\nf0003.jpg:   ' + SBF_FILE_OUT.png + '\nf0004.pdf:   ' + SBF_FILE_OUT.f4,
          'sha256sum f0001.jpg': SBF_SHA.f1 + '  f0001.jpg',
          'sha256sum f0002.jpg': SBF_SHA.f2 + '  f0002.jpg',
          'sha256sum f0003.jpg': SBF_SHA.bin + '  f0003.jpg',
          'sha256sum f0004.pdf': SBF_SHA.f4 + '  f0004.pdf',
          'sha256sum *': '0d3b9a1c6e2f87d4b5a09e13c7f2d8a6b4e1c0f9a8d7b6c5e4f3a2b1c0d9e8f7  LEESMIJ.txt\n' + SBF_SHA.f1 + '  f0001.jpg\n' + SBF_SHA.f2 + '  f0002.jpg\n' + SBF_SHA.bin + '  f0003.jpg\n' + SBF_SHA.f4 + '  f0004.pdf',
        },
      },
      questions: [
        { q: 'Wat meldt "file verdacht.bin" als werkelijk bestandstype?', answer: ['png', 'png image data', 'png image', 'een png'], hint: 'file kijkt naar de magic bytes, niet naar de extensie.', explain: 'file leest 89 50 4E 47 en rapporteert "PNG image data", ongeacht de .bin-extensie.' },
        { q: 'Welke vlag vind je in de uitvoer van "strings verdacht.bin"?', answer: ['NM{png_magic_bytes}'], hint: 'strings haalt alle leesbare tekst uit het bestand; lees de regels.', explain: 'strings toont de verstopte tekstregel met de vlag NM{png_magic_bytes}: dezelfde vlag als in de hex-dump, maar nu zonder dat je hex hoeft te lezen. Eén bestand, één inhoud.' },
        { q: 'Welke van de twee schijfkopieën mag je niet als bewijs gebruiken?', answer: ['werkkopie.dd', 'werkkopie'],
          hints: ['Vergelijk de hash van elke kopie met de hash in chain-of-custody.txt.', 'Bereken sha256sum van bewijs.dd en van werkkopie.dd.', 'Eén van de twee begint met ae3e49d8; de ander niet.'],
          wrong: { 'bewijs.dd': 'De hash van bewijs.dd is gelijk aan de hash bij acquisitie. Die kopie is in orde.', 'geen': 'Bereken de hash van allebei: één wijkt af.' },
          why: 'Wie op een afwijkende kopie werkt, kan niet aantonen dat zijn bevindingen uit de schijf van de verdachte komen. Eén controle met sha256sum voorkomt dat het hele onderzoek sneuvelt.',
          explain: 'werkkopie.dd heeft een totaal andere hash dan de bron. Er is iets mee gebeurd (bijvoorbeeld beschreven of onvolledig gekopieerd). Je legt dat vast en werkt verder met bewijs.dd.' },
        { q: 'Welk gecarved bestand in unalloc/ is bit-voor-bit hetzelfde bestand als verdacht.bin?', boss: true, answer: ['f0003.jpg', 'unalloc/f0003.jpg', 'f0003'],
          hints: ['Je hebt twee technieken nodig: eerst bepalen wat elk gecarved bestand werkelijk is, dan bewijzen welk bestand exact gelijk is.', 'Met file zie je welke bestanden ondanks de .jpg-naam een PNG zijn. Met sha256sum vergelijk je ze met verdacht.bin.', 'Twee bestanden zijn een PNG. Alleen één heeft ook dezelfde afmetingen en dezelfde hash als verdacht.bin.'],
          wrong: { 'f0002.jpg': 'Ook een PNG, maar 1024 x 768 en met een andere hash. Het is een ander plaatje.', 'f0001.jpg': 'Dat is echt een JPEG. verdacht.bin is een PNG.', 'f0004.pdf': 'Dat is een PDF-document.', 'verdacht.bin': 'Gevraagd is welk bestand in unalloc/ dezelfde inhoud heeft.' },
          why: 'Een gecarved bestand in de unallocated space betekent dat dit plaatje ook eerder op de schijf stond en is verwijderd. Dat zegt iets over hoe lang en hoe bewust de verdachte het had.',
          explain: 'f0003.jpg is volgens file een PNG van 640 x 480 en heeft dezelfde SHA-256 (4fdbd689...6669) als verdacht.bin. De carver gaf het de extensie .jpg; de magic bytes en de hash vertellen wat het werkelijk is.' },
      ],
    },

    {
      title: 'Taak 8 — Verdieping: een MFT-record van dichtbij',
      kind: 'verdieping', optional: true,
      content: `
        <p>In de taken hiervoor las je de uitvoer van een MFT-parser. Hier zie je wat zo'n parser eigenlijk leest.</p>

        <h3>Vaste recordgrootte</h3>
        <p>De $MFT is één groot bestand dat bestaat uit records van vaste grootte. Op vrijwel alle NTFS-volumes is een record 1024 bytes. Dat staat in de bootsector op offset <code>0x40</code>: de waarde <code>F6</code> is als getal met teken -10 en betekent 2<sup>10</sup> = 1024 bytes. (Een positieve waarde zou een aantal clusters betekenen.) Omdat de grootte vast is, vind je record <em>n</em> op byte <em>n</em> x 1024 vanaf het begin van de $MFT. De eerste records zijn gereserveerd voor NTFS zelf: record 0 is de $MFT, record 1 de $MFTMirr, record 2 de $LogFile, record 5 de hoofdmap.</p>

        <h3>Wat er in een record staat</h3>
        <p>Elk record begint met de vier tekens <code>FILE</code> (een beschadigd record kan <code>BAAD</code> tonen). Daarna volgen een kop met onder meer het volgnummer en de vlag "in gebruik", en dan een reeks <strong>attributen</strong>. De belangrijkste:</p>
        <ul>
          <li><code>0x10 $STANDARD_INFORMATION</code>: vier tijden (aangemaakt, gewijzigd, MFT gewijzigd, geopend) en vlaggen zoals verborgen of systeem.</li>
          <li><code>0x30 $FILE_NAME</code>: de naam, een verwijzing naar de bovenliggende map, en nog eens vier tijden.</li>
          <li><code>0x80 $DATA</code>: de inhoud. Is die klein, dan staat hij hier direct (resident). Anders staat hier een lijst met clusterreeksen (data runs).</li>
        </ul>
        <p>Een alternate data stream is gewoon een tweede <code>$DATA</code>-attribuut met een naam. Daarom ziet een parser hem wel en Verkenner niet.</p>

        <h3>Wat er gebeurt bij verwijderen en hergebruik</h3>
        <p>Bij verwijderen gaat de vlag "in gebruik" uit en worden de clusters in de bitmap ($Bitmap) vrijgegeven. Het record blijft verder staan. Krijgt een nieuw bestand later dit record, dan worden de attributen overschreven en staat het volgnummer hoger dan bij het vorige bestand. Een verwijzing ergens anders (bijvoorbeeld in een snelkoppeling of in $UsnJrnl) bevat vaak record- én volgnummer. Klopt het volgnummer niet meer, dan weet je dat de verwijzing naar een vorig bestand in dat record wees.</p>

        <h3>Waarom dit ertoe doet</h3>
        <p>Tools kunnen zich vergissen of iets weglaten. Wie weet waar de bytes staan, kan een opvallende uitkomst zelf nalopen in een hexviewer. Dat maakt je bevinding sterker als iemand die later betwist.</p>
      `,
      questions: [
        { q: 'Op welke byte-offset vanaf het begin van de $MFT begint record 66 (wachtwoorden.txt uit taak 3)?', answer: ['67584', '0x10800', '10800'],
          hints: ['Records hebben een vaste grootte.', 'Recordnummer maal de recordgrootte.', '66 maal 1024.'],
          wrong: { '66': 'Dat is het recordnummer. Vermenigvuldig met de recordgrootte.', '540672': 'Je rekent met 8192 (de clustergrootte). Een MFT-record is 1024 bytes.', '66560': 'Dat is 65 maal 1024. Records tellen vanaf 0, dus record 66 begint na 66 hele records.' },
          explain: '66 x 1024 = 67584 bytes (0x10800). Daar moet je de tekens FILE zien staan.' },
        { q: 'Hoeveel MFT-records passen in één cluster van het volume uit taak 2?', answer: ['8', 'acht'],
          hints: ['Je weet de clustergrootte uit taak 2 en de recordgrootte uit deze tekst.', 'Deel de clustergrootte door de recordgrootte.', '8192 gedeeld door 1024.'],
          wrong: { '4': 'Dat klopt bij clusters van 4096 bytes. Het volume uit taak 2 heeft grotere clusters.', '16': 'Dat is het aantal sectoren per cluster.' },
          explain: '8192 / 1024 = 8 records per cluster.' },
        { q: 'Een snelkoppeling verwijst naar MFT-record 77 met volgnummer 1. In de parser staat record 77 in gebruik (cv-2026.docx) met Seq 2. Wat betekent dat?', options: ['De snelkoppeling is vervalst', 'Het record is na het aanmaken van de snelkoppeling vrijgekomen en opnieuw gebruikt; de snelkoppeling wees naar een eerder bestand', 'De $MFT is beschadigd', 'cv-2026.docx is twee keer gekopieerd'], answer: 1,
          wrong: { 0: 'Een ander volgnummer is een normaal gevolg van hergebruik. Er is geen reden om vervalsing aan te nemen.', 2: 'Een hoger volgnummer is precies hoe NTFS hergebruik bijhoudt. Dat is geen beschadiging.', 3: 'Kopiëren maakt een nieuw record met een ander nummer; het verhoogt het volgnummer van dit record niet.' },
          explain: 'Het volgnummer is hoger dan in de verwijzing. De snelkoppeling hoort dus bij het bestand dat eerder in record 77 stond, niet bij cv-2026.docx. Zo voorkom je dat je een verwijzing aan het verkeerde bestand koppelt.' },
      ],
    },

    {
      title: 'Taak 9 — Zo komt dit voor op een examen',
      kind: 'examen', optional: true,
      content: `
        <p>Examenvragen over schijfforensie beschrijven bijna altijd een situatie en vragen naar de beste volgende stap of de best te verdedigen conclusie. De afleiders zijn handelingen die technisch kunnen maar het bewijs aantasten, of conclusies die verder gaan dan de waarneming. Vraag je bij elk antwoord af: verandert dit iets aan het bewijs, en volgt het echt uit wat er staat?</p>
        <p>De vier vragen hieronder zijn voor deze room geschreven, in de stijl van zulke examens.</p>
      `,
      questions: [
        { q: 'Na het imagen van een schijf is de SHA-256 van de image anders dan de SHA-256 die je vooraf over de bron berekende. Wat doe je?',
          options: ['Doorwerken met de image; een kleine afwijking is normaal bij grote schijven', 'Alleen de MD5 vergelijken, want die is sneller', 'De afwijking vastleggen, de oorzaak onderzoeken en opnieuw imagen via de write-blocker', 'De hash van de bron opnieuw berekenen zonder write-blocker, zodat het sneller gaat'], answer: 2,
          wrong: { 0: 'Een hash kent geen kleine afwijking: één ander bit geeft een totaal andere hash. Deze image is niet aantoonbaar gelijk aan de bron.', 1: 'Een ander algoritme lost niets op. Als de SHA-256 afwijkt, wijkt elke andere hash ook af.', 3: 'Zonder write-blocker kan het besturingssysteem naar de bron schrijven. Dan verander je het origineel juist.' },
          explain: 'Een afwijkende hash betekent dat de image niet aantoonbaar gelijk is aan de bron. Je legt dat vast, zoekt de oorzaak (bijvoorbeeld leesfouten of een defecte schijf) en maakt een nieuwe image.' },
        { q: 'Een bestand heet vakantie_042.jpg, maar begint met de bytes 50 4B 03 04. Wat is de best te verdedigen conclusie?',
          options: ['Het is een beschadigde JPEG', 'Het is vermoedelijk een ZIP-gebaseerd bestand (bijvoorbeeld ZIP of DOCX) met een misleidende extensie', 'Het is een Windows-programma', 'De extensie bepaalt het type, dus het is een JPEG'], answer: 1,
          wrong: { 0: 'Een JPEG begint met FF D8 FF. Deze bytes horen bij een heel ander formaat, niet bij een kapotte JPEG.', 2: 'Een Windows-programma begint met 4D 5A (MZ).', 3: 'De extensie is een etiket dat iedereen kan veranderen. De bytes vertellen wat er werkelijk in zit.' },
          explain: '50 4B 03 04 (PK) is de signatuur van ZIP en van alle formaten die erop gebouwd zijn, zoals DOCX en XLSX. Open het als archief om te zien wat erin zit.' },
        { q: 'Volgens $STANDARD_INFORMATION is een bestand aangemaakt in 2019; volgens $FILE_NAME in 2026. Andere bronnen tonen het eerste gebruik in 2026. Wat concludeer je?',
          options: ['Het bestand bestaat sinds 2019', 'De $SI-tijd is vermoedelijk gemanipuleerd; je onderbouwt dat met meer bronnen', 'De klok van de computer stond in 2019 verkeerd', '$FN is onbetrouwbaar, want die kan elk programma aanpassen'], answer: 1,
          wrong: { 0: 'Dat is wat de aanvaller wil dat je denkt. De $SI-tijd is de makkelijkst te veranderen tijd, en twee andere bronnen spreken hem tegen.', 2: 'Een verkeerd ingestelde klok zou ook de $FN-tijd hebben beïnvloed. Die zegt 2026.', 3: 'Het is andersom: $SI is met gewone Windows-functies aan te passen, $FN veel lastiger.' },
          explain: 'Een $SI-aanmaaktijd vóór de $FN-aanmaaktijd is een bekende aanwijzing voor timestomping. "Vermoedelijk" is de juiste toon: je bevestigt het met Prefetch, logs of $UsnJrnl.' },
        { q: 'Je moet verwijderde foto\'s terughalen van een SSD die na het verwijderen nog weken in gebruik was. File carving levert vrijwel niets op. Wat is de meest waarschijnlijke verklaring?',
          options: ['De carver werkt alleen op FAT32', 'TRIM heeft de vrijgegeven blokken vermoedelijk laten leegmaken', 'De foto\'s stonden in slack space, en die kan een carver niet lezen', 'De SSD is versleuteld met MD5'], answer: 1,
          wrong: { 0: 'Carving werkt juist zonder het bestandssysteem: het zoekt alleen naar signaturen in de rauwe bytes.', 2: 'Een carver kan slack space prima doorzoeken. En foto\'s zijn meestal veel groter dan de slack van één cluster.', 3: 'MD5 is een hashfunctie, geen versleuteling.' },
          explain: 'Bij een SSD laat het besturingssysteem met TRIM weten welke blokken vrij zijn, en de SSD maakt die op de achtergrond leeg. Hoe langer de schijf daarna in gebruik was, hoe kleiner de kans op herstel.' },
      ],
    },
  ],

  terms: [
    { term: 'Sector', def: 'Kleinste fysieke blokje op een schijf, klassiek 512 bytes (nieuwer 4096).' },
    { term: 'Cluster', def: 'Bundel sectoren die het bestandssysteem als één eenheid toewijst; de kleinste toewijsbare ruimte.' },
    { term: 'Bestandssysteem', def: 'De administratie die bijhoudt welke clusters bij welk bestand horen, bijv. FAT, exFAT, NTFS of ext4.' },
    { term: '$MFT', def: 'Master File Table: de centrale inhoudsopgave van NTFS met voor elk bestand naam, tijden en clusterverwijzingen.' },
    { term: 'Recovery', def: 'Een verwijderd bestand terughalen zolang de clusters nog niet zijn overschreven.' },
    { term: 'Slack space', def: 'Ongebruikte ruimte tussen het einde van een bestand en het einde van zijn laatste cluster; kan resten van oude bestanden bevatten.' },
    { term: 'Unallocated space', def: 'Niet aan een bestand toegewezen ruimte; bevat vaak nog data van verwijderde bestanden.' },
    { term: 'Magic bytes', def: 'De eerste herkenningsbytes van een bestand (bestandssignatuur), bijv. 89 50 4E 47 voor PNG.' },
    { term: 'File carving', def: 'Bestanden terugvinden in rauwe data op basis van magic bytes, zonder de administratie van het bestandssysteem.' },
    { term: 'Metadata', def: 'Gegevens over een bestand (naam, grootte, tijdstempels) in plaats van de inhoud zelf.' },
    { term: 'MAC-tijden', def: 'Modified, Accessed en Changed/Created: de tijdstempels waarmee je een tijdlijn van een bestand bouwt.' },
    { term: 'Timestomping', def: 'Het vervalsen van tijdstempels om sporen te verbergen.' },
    { term: 'Write-blocker', def: 'Apparaat dat schrijfacties naar een in beslag genomen schijf onmogelijk maakt, zodat het bewijs intact blijft.' },
    { term: 'Hash', def: 'Vaste "vingerafdruk" van data (bijv. SHA-256) om integriteit aan te tonen; verandert volledig bij elke wijziging.' },
    { term: 'Little-endian', def: 'Bytevolgorde waarbij de minst belangrijke byte voorop staat, zoals in NTFS. Tegenhanger: big-endian (bijv. PNG).' },
    { term: 'FILETIME', def: 'Windows-tijdformaat: aantal intervallen van 100 nanoseconden sinds 1 januari 1601, in UTC.' },
  ],

  resources: [
    { title: 'Wikipedia — List of file signatures (magic bytes)', url: 'https://en.wikipedia.org/wiki/List_of_file_signatures' },
    { title: 'Forensic Focus — nieuws en artikelen over digitale forensie', url: 'https://www.forensicfocus.com/' },
    { title: 'SANS — Digital Forensics & Incident Response', url: 'https://www.sans.org/' },
    { title: 'CyberDefenders — gratis forensische oefenzaken', url: 'https://cyberdefenders.org/' },
  ],
});
