/* Room: Security-kern — phishing gevorderd: spear, thread-hijack, quishing & clone */

// =======================================================================
//  Alles FICTIEF: verzonnen bedrijven, collega's en domeinen. Je oefent
//  het herkennen van geavanceerde, geloofwaardige phishing.
// =======================================================================

// --- Phishing-inbox: vijf lastige gevallen ---
const PG_EMAILS = [
  {
    phishing: true,
    fromName: 'Sanne de Wit (Inkoop)',
    from: 's.dewit@jouwbedrjf.nl',
    to: 'jij@jouwbedrijf.nl',
    subject: 'Even naar de offerte voor Project Zephyr kijken?',
    date: 'di 13 okt 2026 10:41',
    flags: {
      from: 'Kijk goed: het domein is "jouwbedrjf.nl" — de i ontbreekt (typosquat). Je echte collega mailt vanaf jouwbedrijf.nl.',
    },
    body: [
      [{ text: 'Hoi, zou je vóór de call van 15:00', flag: 'Zachte, geloofwaardige urgentie — net genoeg om je te laten klikken zonder argwaan.' }, { text: ' even naar de bijgewerkte offerte voor Project Zephyr willen kijken?' }],
      [{ text: 'Ik heb hem in ons gedeelde station gezet: ' }, { text: 'offerte-zephyr (openen)', link: 'https://jouwbedrijf-sharepoint.login-review.net/zephyr', flag: 'De echte bestemming is login-review.net — niet je bedrijfs-SharePoint. Een inlogpagina die je wachtwoord oogst.' }],
      [{ text: 'Thanks! Sanne' }],
    ],
  },
  {
    phishing: true,
    fromName: 'Leverancier Noord — Boekhouding',
    from: 'facturen@leverancier-noord.nl',
    to: 'financien@jouwbedrijf.nl',
    subject: 'RE: Factuur F-2026-0345',
    date: 'wo 14 okt 2026 09:03',
    body: [
      [{ text: 'Beste, in vervolg op onze eerdere mail hierbij de betaalherinnering voor F-2026-0345.' }],
      [{ text: 'Let op: ons ', flag: null }, { text: 'rekeningnummer is gewijzigd', flag: 'Een gewijzigd IBAN in een lopende correspondentie is dé klassieke truc (soms vanaf een gekaapt, echt account). Altijd verifiëren via een bekend telefoonnummer.' }, { text: ' naar NL02 BOOS 0199 4433 22. Gelieve ' }, { text: 'binnen 3 dagen', flag: 'Tijdsdruk om verificatie te ontmoedigen.' }, { text: ' te voldoen.' }],
      [{ text: 'Met vriendelijke groet, Boekhouding Leverancier Noord' }],
    ],
  },
  {
    phishing: true,
    fromName: 'IT-Support',
    from: 'mfa-support@account-beveiliging.net',
    to: 'jij@jouwbedrijf.nl',
    subject: 'Actie vereist: je MFA verloopt vandaag',
    date: 'do 15 okt 2026 08:20',
    flags: {
      from: 'Het domein account-beveiliging.net is niet je bedrijf of je provider. Echte IT gebruikt het interne domein.',
      subject: '"Verloopt vandaag" is kunstmatige urgentie; MFA "verloopt" zo niet.',
    },
    body: [
      [{ text: 'Je multifactor-authenticatie moet vandaag opnieuw worden ingesteld. Scan onderstaande QR-code met je telefoon om door te gaan:' }],
      [{ text: '[ QR-code — scan om MFA opnieuw in te stellen ]', flag: 'Een QR in plaats van een link (quishing) verbergt de bestemming én omzeilt linkcontrole op de mailserver. Scan nooit een QR uit een onverwachte mail.' }],
      [{ text: 'Doe dit vóór 17:00 om te voorkomen dat je account wordt vergrendeld.' }],
    ],
  },
  {
    phishing: false,
    fromName: 'Microsoft-account',
    from: 'account-security-noreply@accountprotection.microsoft.com',
    to: 'jij@voorbeeld.nl',
    subject: 'Nieuwe aanmelding op je Microsoft-account',
    date: 'do 15 okt 2026 21:12',
    body: [
      [{ text: 'We hebben een nieuwe aanmelding gezien vanaf een nieuw apparaat. Was jij dit? Dan hoef je niets te doen.' }],
      [{ text: 'Twijfel je? Ga zélf naar account.microsoft.com (typ het adres) en controleer je recente activiteit. We vragen je hier niet om in te loggen of gegevens in te vullen.' }],
      [{ text: 'Het Microsoft-accountteam' }],
    ],
  },
  {
    phishing: true,
    fromName: 'TechWijzer Nieuwsbrief',
    from: 'nieuws@techwijzer-update.com',
    to: 'jij@voorbeeld.nl',
    subject: 'Je wekelijkse update — plus 1 belangrijke actie',
    date: 'vr 16 okt 2026 07:00',
    flags: {
      from: 'Je bent geabonneerd op techwijzer.nl, maar dit komt van techwijzer-update.com — een nagemaakte (clone) afzender.',
    },
    body: [
      [{ text: 'Je vertrouwde wekelijkse nieuwsbrief, met dezelfde opmaak als altijd. Deze week: 5 tips voor veilig werken.' }],
      [{ text: 'Belangrijk: ', flag: null }, { text: 'werk je accountgegevens bij', link: 'https://techwijzer-update.com/account/verifieren', flag: 'In deze gekloonde nieuwsbrief is één link vervangen: een "update je gegevens"-link die normaal niet in de echte nieuwsbrief staat.' }, { text: ' om de nieuwsbrief te blijven ontvangen.' }],
      [{ text: 'Tot volgende week!' }],
    ],
  },
];

// --- Connections: geavanceerde technieken → kenmerk ---
const PG_GROUPS = [
  { name: 'Spear phishing', items: ['Gericht op jou persoonlijk', 'Noemt een echt project/collega', 'Typosquat-domein', 'Zachte urgentie ("vóór de call")'] },
  { name: 'Thread-hijacking', items: ['"RE:" op een echt lijkende draad', 'Vaak van een gekaapt echt account', 'Gewijzigd IBAN/rekeningnummer', 'Betaalverzoek in lopende correspondentie'] },
  { name: 'Quishing', items: ['QR in plaats van een link', 'Verbergt de echte bestemming', '"Scan om MFA te herstellen"', 'Omzeilt linkcontrole'] },
  { name: 'Clone phishing', items: ['Kopie van een echte mail', 'Eén link vervangen', 'Zelfde opmaak en logo', 'Nagemaakte afzender (lookalike)'] },
];

CS.registerRoom({
  id: 'phishing-gevorderd',
  path: 'security-kern',
  order: 11,
  title: 'Phishing gevorderd: als het er écht goed uitziet',
  icon: '🪝',
  difficulty: 'Gemiddeld',
  minutes: 50,
  summary: 'De basis-phishingmail met taalfouten is verleden tijd. Moderne phishing is gericht (spear), kaapt echte e-mailthreads, verbergt zich achter QR-codes (quishing) en kopieert vertrouwde mails (clone) — vaak AI-geschreven en foutloos. Je oefent met een lastige inbox waarin óók een legitieme-maar-spannende mail zit (niet overal een vlag van maken!), en je leert de ene regel die altijd werkt: verifieer via een onafhankelijk kanaal.',
  objectives: [
    'Geavanceerde phishingvormen herkennen: spear, whaling, thread-hijacking, quishing, clone',
    'Een typosquat- of lookalike-domein en een vervangen link herkennen',
    'Een gewijzigd IBAN in een lopende thread als rode vlag zien en out-of-band verifiëren',
    'Legitieme beveiligingsmeldingen onderscheiden van phishing (niet over-flaggen)',
    'De gouden regel toepassen: bij twijfel zelf verifiëren via een bekend kanaal',
  ],
  terms: [
    { term: 'Spear phishing', def: 'Gerichte phishing op één persoon, met echte details (project, collega) die het geloofwaardig maken.' },
    { term: 'Whaling', def: 'Spear phishing gericht op "grote vissen": directie en bestuur.' },
    { term: 'Thread-hijacking', def: 'Inbreken in (of nabootsen van) een echte e-mailconversatie om een betaling of klik te ontlokken.' },
    { term: 'Quishing', def: 'Phishing via een QR-code; de QR verbergt de bestemming en omzeilt linkcontrole.' },
    { term: 'Clone phishing', def: 'Een kopie van een echte, verwachte mail waarin één link of bijlage kwaadaardig is vervangen.' },
    { term: 'Typosquatting', def: 'Een domein dat net verkeerd gespeld is (jouwbedrjf.nl i.p.v. jouwbedrijf.nl) om op het echte te lijken.' },
    { term: 'Out-of-band verificatie', def: 'Een verzoek bevestigen via een ánder, bekend kanaal (zelf bellen), niet via de verdachte mail.' },
    { term: 'Over-flaggen', def: 'Legitieme berichten ten onrechte als phishing bestempelen; ook dat kost tijd en vertrouwen.' },
  ],
  resources: [
    { title: 'NCSC — phishing herkennen en melden', url: 'https://www.ncsc.nl/' },
    { title: 'Veilig internetten — phishing', url: 'https://veiliginternetten.nl/' },
    { title: 'APWG — phishing trends', url: 'https://apwg.org/' },
    { title: 'Fraudehelpdesk', url: 'https://www.fraudehelpdesk.nl/' },
  ],
  tasks: [
    {
      title: 'Taak 1 — Phishing is volwassen geworden',
      content: `
        <p>Vergeet de knullige mail met taalfouten en een "Geachte heer/mevrouw". Moderne phishing is
        <strong>AI-geschreven</strong> (foutloos), <strong>gericht</strong> (spear/whaling, met echte details over jou),
        kaapt <strong>echte e-mailthreads</strong> (thread-hijacking), verstopt zich achter <strong>QR-codes</strong>
        (quishing) en kopieert <strong>vertrouwde mails</strong> (clone). Taal en opmaak zijn geen betrouwbare test meer.</p>
        <p>Wat wél werkt, blijft simpel en onveranderd: controleer het <strong>domein</strong> achter de naam en de
        <strong>echte bestemming</strong> van een link, wantrouw elk <strong>betaal- of inlogverzoek</strong>, en
        <strong>verifieer via een onafhankelijk kanaal</strong> bij twijfel. En: niet álles is phishing — een legitieme
        beveiligingsmelding ten onrechte afschieten kost ook tijd en vertrouwen.</p>
        <div class="callout warn"><strong>Alles fictief:</strong> de bedrijven, collega's en domeinen zijn verzonnen.</div>
        <div class="callout tip"><strong>Beloning:</strong> taal faalt, verificatie wint. Vlag: <code>NM{verifieer_altijd}</code>.</div>
      `,
      questions: [
        { q: 'Waarom is "let op taalfouten" geen betrouwbare phishingtest meer?', options: ['Moderne (AI-geschreven) phishing is vaak foutloos', 'Omdat taalfouten niet bestaan', 'Omdat e-mail is afgeschaft', 'Dat is het nog wel'], answer: 0, explain: 'AI maakt overtuigende, foutloze teksten; je moet op domein, links en verzoek letten.' },
        { q: 'Wat werkt wél, ongeacht hoe goed de mail eruitziet?', options: ['Verifiëren via een onafhankelijk, bekend kanaal bij twijfel', 'Op het logo vertrouwen', 'Snel reageren', 'De opmaak beoordelen'], answer: 0, explain: 'Out-of-band verificatie ontmaskert zelfs een perfecte phishingmail.' },
        { q: 'Waarom is "alles maar als phishing markeren" ook niet goed?', options: ['Je schiet dan ook legitieme berichten af — dat kost tijd en vertrouwen (over-flaggen)', 'Dat is juist perfect', 'Omdat het niet mag', 'Omdat phishing niet bestaat'], answer: 0, explain: 'Een goede verdediger herkent óók wat legitiem is; over-flaggen leidt tot ruis en alarmmoeheid.' },
        { q: 'Welke vlag staat in de tip-callout?', answer: ['NM{verifieer_altijd}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{verifieer_altijd}.' },
      ],
    },
    {
      title: 'Taak 2 — De lastige inbox',
      content: `
        <p>Vijf mails, allemaal geloofwaardig. Klik in elke mail op wat jou verdacht lijkt (afzender, link, zinsdelen) en
        beoordeel daarna of het phishing is. Let op: er zit <strong>één legitieme</strong> mail tussen — maak daar geen vlag
        van. Kijk vooral naar het <strong>domein</strong> en de <strong>echte linkbestemming</strong>, en naar
        <strong>wat</strong> er gevraagd wordt.</p>
        <div class="callout tip"><strong>Beloning:</strong> vier vangen, één sparen. Vlag: <code>NM{vier_vangen_een_sparen}</code>.</div>
      `,
      lab: {
        type: 'phishing',
        emails: PG_EMAILS,
      },
      questions: [
        { q: 'De mail van "Sanne de Wit" gebruikt het domein jouwbedrjf.nl. Wat is daar mis mee?', options: ['Het is een typosquat: de "i" ontbreekt (jouwbedrjf.nl) — het echte domein is jouwbedrijf.nl', 'Niets, het klopt', 'Het is te lang', 'Het mist https'], answer: 0, explain: 'Een net-verkeerd gespeld domein (typosquat) is een klassiek spear-phishing-signaal.' },
        { q: 'In de "RE: Factuur"-mail staat een gewijzigd rekeningnummer. Wat doe je?', options: ['De leverancier bellen op een bekend nummer om de IBAN-wijziging te verifiëren', 'Gewoon betalen, het is een lopende thread', 'Op de mail antwoorden ter bevestiging', 'Binnen 3 dagen overmaken'], answer: 0, explain: 'Een IBAN-wijziging (ook in een echte thread/gekaapt account) verifieer je altijd out-of-band per telefoon.' },
        { q: 'Welke mail was legitiem?', options: ['De Microsoft-aanmeldingsmelding (correct domein, vraagt niets, laat je zelf de site typen)', 'De MFA-QR-mail', 'De factuur met nieuw IBAN', 'De nieuwsbrief-clone'], answer: 0, explain: 'De beveiligingsmelding gebruikt het echte domein, vraagt niets en stuurt je zelf naar account.microsoft.com — geen phishing.' },
        { q: 'Waarom is een QR-code in een MFA-mail (quishing) extra sneaky?', options: ['De QR verbergt de bestemming én omzeilt de linkcontrole op de mailserver', 'QR-codes zijn altijd veilig', 'Het is sneller', 'Dat is het niet'], answer: 0, explain: 'Je ziet de URL niet en filters die links scannen, zien een plaatje — scan nooit een QR uit een onverwachte mail.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{vier_vangen_een_sparen}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{vier_vangen_een_sparen}.' },
      ],
    },
    {
      title: 'Taak 3 — De technieken op een rij',
      content: `
        <p>Groepeer de zestien kenmerken in de vier geavanceerde technieken: <strong>spear phishing</strong>,
        <strong>thread-hijacking</strong>, <strong>quishing</strong> en <strong>clone phishing</strong>.</p>
        <div class="callout tip"><strong>Beloning:</strong> ken de techniek, zie de truc. Vlag: <code>NM{technieken_herkend}</code>.</div>
      `,
      lab: {
        type: 'connections',
        title: 'techniek → kenmerk',
        prompt: 'Vind de vier groepen van vier.',
        groups: PG_GROUPS,
      },
      questions: [
        { q: 'Wat is thread-hijacking?', options: ['Inbreken in of nabootsen van een echte e-mailconversatie om een klik/betaling te ontlokken', 'Een QR-aanval', 'Een virus', 'Een firewall-techniek'], answer: 0, explain: 'Door een lopende, vertrouwde draad te kapen, lijkt het verzoek vanzelfsprekend.' },
        { q: 'Wat maakt spear phishing geloofwaardiger dan massa-phishing?', options: ['Echte, persoonlijke details (project, collega) die de aanvaller vooraf verzamelde', 'Het is korter', 'Het heeft meer taalfouten', 'Niets'], answer: 0, explain: 'De aanvaller "googelt" je eerst; kloppende details verlagen je argwaan.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{technieken_herkend}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{technieken_herkend}.' },
      ],
    },
    {
      title: 'Taak 4 — Verifiëren en melden',
      content: `
        <p>Hoe goed een mail er ook uitziet, de verdediging blijft hetzelfde — en is grotendeels gewoon gedrag:</p>
        <ul>
          <li><strong>Hover vóór je klikt</strong> en lees de échte bestemming; op mobiel: ingedrukt houden.</li>
          <li><strong>Ga zelf naar de site</strong> (typ het adres of gebruik een bladwijzer) in plaats van op een link te klikken.</li>
          <li><strong>Verifieer out-of-band</strong> bij elk betaal-/inlogverzoek of IBAN-wijziging: bel op een bekend nummer.</li>
          <li><strong>Scan geen onverwachte QR-codes</strong> en vul nooit inloggegevens in na een QR.</li>
          <li><strong>Meld</strong> verdachte mails via de meldknop/IT, zodat anderen beschermd worden — en meld twijfelgevallen ook.</li>
          <li>Technisch eronder: <strong>MFA/passkeys</strong>, <strong>DMARC</strong> en linkfilters vangen veel af (zie de e-mail- en detectie-rooms).</li>
        </ul>
        <div class="callout tip"><strong>Beloning:</strong> zelf typen, zelf bellen, melden. Vlag: <code>NM{zelf_verifieren_melden}</code>.</div>
      `,
      questions: [
        { q: 'Wat is de veiligste manier om op een "inlog"-verzoek te reageren?', options: ['Niet op de link klikken; zelf het adres typen of je bladwijzer gebruiken', 'Op de link klikken en inloggen', 'Antwoorden met je gebruikersnaam', 'De mail doorsturen naar collega\'s'], answer: 0, explain: 'Door zelf te navigeren omzeil je elke valse link, hoe goed hij er ook uitziet.' },
        { q: 'Hoe ga je om met een IBAN-wijziging in een (ogenschijnlijk echte) factuurmail?', options: ['Bellen op een bekend nummer om de wijziging te verifiëren vóór je betaalt', 'Meteen naar het nieuwe nummer overmaken', 'Op de mail antwoorden', 'Negeren en toch naar het oude nummer betalen'], answer: 0, explain: 'IBAN-wijzigingen zijn een topfraude; altijd out-of-band verifiëren, ook bij een bekend afzender.' },
        { q: 'Waarom meld je ook twijfelgevallen bij IT/de meldknop?', options: ['Zo kan IT patronen zien en anderen beschermen; melden is beter dan stilzwijgen', 'Om collega\'s te pesten', 'Dat hoeft nooit', 'Om je inbox leeg te maken'], answer: 0, explain: 'Meldingen voeden detectie en blokkades; één melding kan een hele campagne stoppen.' },
        { q: 'Welke vlag staat in de tip-callout van deze taak?', answer: ['NM{zelf_verifieren_melden}'], hint: 'Lees de tip-callout.', explain: 'De vlag is NM{zelf_verifieren_melden}.' },
      ],
    },
  ],
});
