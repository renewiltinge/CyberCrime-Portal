/* Room: Veilig thuis en op het werk */

// Taak 1: apparatenoverzicht van een fictief huishouden (peildatum 12-11-2026).
const VTW_INVENTARIS = `Apparatenoverzicht familie Jansen, opgesteld 12-11-2026
APPARAAT         TYPE       SOFTWARE             VERSIE    AUTO-UPDATE  LAATSTE UPDATE  ONDERSTEUND TOT
laptop-sanne     laptop     WerkplekOS 11        24.10.3   aan          2026-11-04      2029-10
laptop-pa        laptop     WerkplekOS 9         19.4.2    aan          2025-11-28      2025-12-01
telefoon-sanne   telefoon   MobielOS 19          19.1      aan          2026-11-02      2031-09
telefoon-ma      telefoon   MobielOS 17          17.6      aan          2026-10-29      2027-09
router           router     KadeLink firmware    3.7.9     uit          2026-02-11      2030-01
deurbel          IoT        DingDong firmware    5.2.0     aan          2026-10-20      2028-06
tv-woonkamer     smart-tv   TeeVee OS            8.4       aan          2026-09-30      2027-12
nas-zolder       NAS        OpslagOS             6.2.4     aan          2026-10-15      2028-03
printer          printer    PrintFW              2.11      uit          2023-05-02      2024-12
thermostaat      IoT        WarmHuis firmware    1.9.3     aan          2026-08-12      2029-01`;

// Taak 2: back-upoverzicht en hersteltests van hetzelfde huishouden.
const VTW_BACKUPS = `Back-upoverzicht familie Jansen
MAP              ORIGINEEL        KOPIE 2                                        KOPIE 3
Foto's           laptop-sanne     externe schijf (altijd aangesloten op laptop)  cloudopslag (sync, geen versiegeschiedenis)
Administratie    laptop-sanne     USB-schijf, maandelijks, ligt in kluis bij oma cloudopslag (sync, 30 dagen versiegeschiedenis)
Studie Sanne     laptop-sanne     cloudopslag (sync, geen versiegeschiedenis)    -
Muziek           nas-zolder       -                                              -
Recepten         telefoon-ma      cloudopslag (sync, geen versiegeschiedenis)    -

Hersteltests
2026-03-02  Administratie  bron: USB-schijf kluis    12 bestanden teruggezet   OK
2026-06-01  Foto's         bron: externe schijf      0 bestanden van 2026      FOUT: back-uptaak gestopt op 2025-11-14 (schijf vol), geen melding gezien
2026-06-01  Studie Sanne   bron: cloudopslag         5 bestanden teruggezet    OK
2026-09-07  Administratie  bron: USB-schijf kluis    20 bestanden teruggezet   OK`;

// Taak 4: statusrapport van de router, na de update uit taak 1.
const VTW_ROUTER = `=== Statusrapport router KadeLink KL-500 (familie Jansen) ===
Firmware               3.8.2 | automatisch bijwerken: aan
Beheerder              gebruikersnaam: admin | wachtwoord: fabrieksinstelling (nooit gewijzigd)
Beheer via internet    AAN | poort 8080
WPS (pincode)          AAN
Wifi 1 "Jansen-Thuis"  beveiliging: WPA2/WPA3 | sleutel: 18 tekens
Wifi 2 "Jansen-Gast"   beveiliging: WEP | sleutel: 10 hextekens
--- Apparaten op Jansen-Thuis ---
192.0.2.10    laptop-sanne
192.0.2.11    telefoon-sanne
192.0.2.12    laptop-pa
192.0.2.13    telefoon-ma
192.0.2.20    nas-zolder
192.0.2.31    deurbel-voordeur (DingDong)
--- Apparaten op Jansen-Gast ---
198.51.100.30 tv-woonkamer
198.51.100.31 lamp-keuken
198.51.100.32 thermostaat
198.51.100.40 telefoon-bezoek`;

// Taak 6: gebeurtenissen bij fictieve Drukkerij Vonk (lokale tijd). Spoor: bijlage met script op 2 nov,
// gestolen browserwachtwoorden, mailboxovername met doorstuurregel, ransomware op 3 nov.
const VTW_INCIDENT = `2026-10-30 17:30  BACKUP   job usb-wekelijks: 18.402 bestanden naar USB-schijf "Kluis-B" | OK | schijf losgekoppeld, mee naar huis (L. Vonk)
2026-11-02 07:00  BACKUP   job nas-elk-uur: kopie naar \\\\NAS01\\backup | OK
2026-11-02 08:00  BACKUP   job nas-elk-uur: kopie naar \\\\NAS01\\backup | OK
2026-11-02 08:41  MAIL     m.devries@drukkerij-vonk.example ontvangt "Offerte folders" van klant@bloemenhuis.example
2026-11-02 08:58  MAIL     l.vonk@drukkerij-vonk.example ontvangt "Factuur 2026-1187" van boekhouding@factuur-snel.example | bijlage factuur_1187.zip
2026-11-02 09:00  BACKUP   job nas-elk-uur: kopie naar \\\\NAS01\\backup | OK
2026-11-02 09:03  LAPTOP   LT-LOTTE | factuur_1187.zip geopend, factuur_1187.js gestart door wscript.exe
2026-11-02 09:03  LAPTOP   LT-LOTTE | wscript.exe maakt verbinding met 198.51.100.23:443
2026-11-02 09:04  LAPTOP   LT-LOTTE | opgeslagen browserwachtwoorden gelezen door wscript.exe | antivirus: geen melding
2026-11-02 10:00  BACKUP   job nas-elk-uur: kopie naar \\\\NAS01\\backup | OK
2026-11-02 11:20  MAIL     l.vonk@drukkerij-vonk.example stuurt "Proef visitekaartjes" naar info@kapsalon-knip.example
2026-11-02 12:30  CLOUD    job cloud-sync: 214 bestanden gesynchroniseerd | versiegeschiedenis: uit
2026-11-02 17:00  BACKUP   job nas-elk-uur: kopie naar \\\\NAS01\\backup | OK
2026-11-02 21:14  MAILBOX  l.vonk@drukkerij-vonk.example aangemeld vanaf 203.0.113.77 (onbekend apparaat) | MFA: niet ingesteld
2026-11-02 21:16  MAILBOX  nieuwe regel "archief": alle inkomende mail doorsturen naar kopie.archief@postvak.example
2026-11-02 21:17  MAILBOX  herstel-telefoonnummer gewijzigd
2026-11-02 21:18  MAILBOX  regel "archief" aangepast: doorgestuurde berichten verplaatsen naar Verwijderde items
2026-11-03 01:55  LAPTOP   LT-LOTTE | verbinding met \\\\NAS01\\data en \\\\NAS01\\backup
2026-11-03 02:10  NAS      NAS01 | 41.200 bestanden hernoemd naar *.kadelock in \\\\NAS01\\data en \\\\NAS01\\backup
2026-11-03 02:11  BACKUP   job nas-elk-uur: FOUT, doelmap onleesbaar
2026-11-03 02:20  CLOUD    job cloud-sync: 9.877 bestanden gesynchroniseerd (*.kadelock) | versiegeschiedenis: uit
2026-11-03 07:45  LAPTOP   LT-LOTTE | nieuw bestand op bureaublad: LEES_MIJ_KADELOCK.txt
2026-11-03 07:52  MAIL     m.devries@drukkerij-vonk.example meldt: "ik kan niets meer openen op de NAS"`;

CS.registerRoom({
  id: 'veilig-thuis-werk',
  path: 'defensief',
  order: 3,
  title: 'Veilig thuis en op het werk',
  icon: '🏠',
  difficulty: 'Makkelijk',
  minutes: 70,
  level: 'Instap',
  checked: '2026-11-12',
  summary: 'Praktische digitale weerbaarheid die je vandaag nog kunt toepassen: updaten, back-ups (3-2-1), MFA en een wachtwoordmanager, veilig wifi, USB en publieke netwerken, privacy, en wat te doen als het tóch misgaat.',
  objectives: [
    'Uitleggen waarom updaten en patchen je belangrijkste basismaatregel is',
    'De 3-2-1-regel voor back-ups toepassen en het belang van geteste back-ups uitleggen',
    'MFA en een wachtwoordmanager instellen als standaard voor al je accounts',
    'Je thuisnetwerk en gebruik onderweg veiliger maken (WPA3, gastnetwerk, publieke wifi en VPN)',
    'Veilig omgaan met USB-sticks, randapparatuur en de AVG-basis van privacy',
    'Weten wat je moet doen en bij wie je meldt als een account of apparaat gehackt is',
  ],
  tasks: [
    {
      title: "Taak 1 — Updaten en patchen",
      tryFirst: true,
      intro: `<p>Het is 12 november 2026. In het lab staat het apparatenoverzicht van familie Jansen. Vandaag verscheen een (fictief) advies: in de firmware van KadeLink-routers zit een lek dat actief wordt misbruikt, opgelost in versie 3.8.2 van 14 oktober 2026. Zoek uit welk apparaat nog kwetsbaar is en welke apparaten helemaal geen updates meer krijgen.</p>`,
      lab: { type: 'logs', title: 'apparatenoverzicht-jansen.txt', lines: VTW_INVENTARIS },
      content: `
        <p>Als je maar één gewoonte overneemt uit deze room, laat het dan deze zijn: <strong>houd alles bij</strong>.
        Updaten (bijwerken) is saai, maar het is de meest effectieve en goedkoopste beveiligingsmaatregel die er
        bestaat.</p>

        <h3>Waarom updates zo belangrijk zijn</h3>
        <p>Software bevat fouten, en sommige fouten zijn beveiligingsgaten (<strong>kwetsbaarheden</strong>, Engels:
        <em>vulnerabilities</em>). Een <strong>patch</strong> is een reparatie die zo'n gat dicht. Zodra een patch
        uitkomt, is openbaar <em>welk</em> gat hij dicht, en gaan aanvallers op zoek naar systemen die
        nog niet zijn bijgewerkt. Een niet-bijgewerkt apparaat is als een huis waarvan iedereen weet dat het
        achterraam openstaat.</p>

        <div class="callout tip">
          <strong>Tip:</strong> zet <strong>automatische updates</strong> aan waar het kan: voor je telefoon, je
          computer, je browser en je apps. Dan gebeurt het vanzelf en vergeet je het niet. Herstart je apparaat ook
          echt als erom gevraagd wordt; veel updates worden pas na een herstart actief.
        </div>

        <h3>Vergeet deze niet</h3>
        <ul>
          <li><strong>Je router.</strong> Dat kastje van je internet staat dag en nacht aan het internet en wordt vaak
          vergeten. Controleer of hij automatisch bijwerkt.</li>
          <li><strong>Slimme apparaten (IoT).</strong> Camera's, slimme lampen, een slimme deurbel: ook dat is software
          die bijgewerkt moet worden.</li>
          <li><strong>Oude software (end-of-life).</strong> Als een fabrikant stopt met updates (zoals bij een heel oud
          besturingssysteem), komen er geen patches meer. Zulke software blijft voorgoed lek; upgrade of vervang hem.</li>
        </ul>

        <h3>Hoe je een overzicht leest</h3>
        <p>Loop per apparaat drie vragen langs. Staat automatisch bijwerken aan? Is de laatste update recent? En valt de
        datum "ondersteund tot" nog in de toekomst? Een apparaat met automatisch bijwerken aan maar een verlopen
        ondersteuning, krijgt toch niets meer binnen. Bij een advies over een lek vergelijk je bovendien de
        versie: alles onder de versie met de reparatie is kwetsbaar.</p>

        <h3>De analogie van het lek in de band</h3>
        <p>Een kwetsbaarheid is een lek in je fietsband. Een patch is het plakkertje. Rij je door met een bekend lek,
        dan sta je vroeg of laat stil, en bij software staat er iemand klaar om je dan onderuit te halen.</p>
      `,
      questions: [
        { q: "Wat is een 'patch'?", options: ["Een reparatie die een beveiligingsgat (kwetsbaarheid) in software dicht", "Een nieuw wachtwoord", "Een soort virus", "Een back-up"], answer: 0, explain: "Een patch dicht een bekend gat. Daarom is snel installeren belangrijk." },
        { q: "Welk apparaat uit het overzicht is nog kwetsbaar voor het lek uit het advies?", answer: ["router", "de router"],
          hints: ["Het advies gaat over één soort software.", "Filter op KadeLink en vergelijk de versie met 3.8.2.", "Het apparaat heeft automatisch bijwerken uit en draait 3.7.9."],
          wrong: { "printer": "De printer is wel een probleem, maar draait geen KadeLink-firmware. Dit advies gaat over de router.", "laptop-pa": "Die laptop krijgt geen updates meer, maar het advies gaat over KadeLink-routerfirmware." },
          why: "Een lek dat actief wordt misbruikt en een router die niet zelf bijwerkt: dat is de combinatie die aanvallers zoeken. De router staat bovendien direct aan het internet.",
          explain: "De router draait 3.7.9, lager dan 3.8.2, en werkt niet automatisch bij. De laatste update was in februari, dus de reparatie van oktober zit er niet op." },
        { q: "Hoeveel apparaten in het overzicht krijgen helemaal geen updates meer?", answer: ["2", "twee"],
          hints: ["Kijk naar de laatste kolom.", "Vergelijk elke datum 'ondersteund tot' met 12 november 2026.", "Eén laptop en één apparaat dat op kantoorpapier werkt."],
          wrong: { "1": "Kijk ook naar laptop-pa: automatisch bijwerken staat aan, maar de ondersteuning is al voorbij.", "3": "De router krijgt nog wel updates (ondersteund tot 2030); hij haalt ze alleen niet zelf op.", "0": "Vergelijk de datum 'ondersteund tot' met vandaag, 12 november 2026." },
          explain: "laptop-pa (ondersteund tot 1 december 2025) en de printer (tot december 2024) zijn end-of-life. Automatisch bijwerken aan helpt dan niet: er komt niets meer. Die moet je vervangen of van het netwerk halen." },
      ],
    },

    {
      title: "Taak 2 — Back-ups en de 3-2-1-regel",
      tryFirst: true,
      intro: `<p>In het lab staat het back-upoverzicht van familie Jansen: per map waar de kopieën staan, en de uitslag van de hersteltests. Leg elke map naast de 3-2-1-regel. Welke map is goed geregeld, en waar zit een gat waar niemand iets van merkte?</p>`,
      lab: { type: 'logs', title: 'back-upoverzicht-jansen.txt', lines: VTW_BACKUPS },
      content: `
        <p>Updaten voorkomt veel ellende, maar niet alles. Gaat er een schijf stuk, verlies je je telefoon of slaat
        ransomware toe, dan redt alleen een goede <strong>back-up</strong> (reservekopie) je. Zonder
        back-up zijn je foto's, documenten en administratie in één klap weg.</p>

        <h3>De 3-2-1-regel</h3>
        <p>Een simpele, beproefde vuistregel voor back-ups:</p>
        <ul>
          <li><strong>3</strong> kopieën van je belangrijke data (het origineel plus twee back-ups).</li>
          <li><strong>2</strong> verschillende media of plekken (bijvoorbeeld een externe schijf én de cloud).</li>
          <li><strong>1</strong> kopie <strong>offsite</strong> en bij voorkeur <strong>offline</strong>: op een andere
          locatie en losgekoppeld van je netwerk.</li>
        </ul>

        <div class="callout info">
          <strong>Waarom die ene offline kopie cruciaal is:</strong> moderne ransomware zoekt naar aangesloten
          schijven en netwerkmappen en versleutelt die mee. Een back-up die altijd aangesloten is, gaat dan óók verloren.
          Een kopie die losgekoppeld of onveranderbaar (immutable) is, kan de ransomware niet raken. Dat is je
          vangnet.
        </div>

        <h3>Synchroniseren is geen back-up</h3>
        <p>Een map die automatisch met de cloud wordt gesynchroniseerd, neemt elke wijziging over, ook een
        versleuteling of een per ongeluk gewiste map. Alleen als de dienst oude versies bewaart (versiegeschiedenis),
        kun je terug naar een moment van vóór het probleem. Kijk dus altijd of en hoe lang oude versies bewaard
        blijven.</p>

        <h3>Een back-up die je nooit getest hebt, is geen back-up</h3>
        <p>De klassieke fout: trouw back-uppen, maar nooit controleren of je ook echt kunt <em>terugzetten</em>. Dan
        ontdek je op het slechtste moment dat de back-up leeg, corrupt of onvolledig was. <strong>Test je herstel</strong>
        regelmatig: zet een paar bestanden terug en kijk of het werkt. Pas dan weet je zeker dat je vangnet er is.</p>

        <h3>De analogie van de reservesleutel</h3>
        <p>Een back-up is je reservesleutel. Je legt hem bij iemand anders (offsite), niet onder dezelfde deurmat als
        waar de inbreker kijkt (offline). En af en toe check je of de reservesleutel echt op het slot past (testen).</p>
      `,
      questions: [
        { q: "Waar staat de 3-2-1-regel voor?", options: ["3 kopieën, op 2 verschillende media, waarvan 1 offsite/offline", "3 wachtwoorden, 2 gebruikers, 1 computer", "3 updates per 2 weken op 1 apparaat", "3 firewalls, 2 routers, 1 modem"], answer: 0, explain: "3 kopieën, 2 soorten media, 1 kopie offsite en bij voorkeur offline." },
        { q: "Welke map voldoet volledig aan de 3-2-1-regel?", answer: ["Administratie", "de administratie"],
          hints: ["Tel per map de kopieën en kijk of er één is die buiten huis en losgekoppeld ligt.", "Een schijf die altijd aan de laptop hangt, is niet offline.", "Er is maar één map met een kopie in een kluis bij iemand anders."],
          wrong: { "foto's": "Drie kopieën, maar de externe schijf is altijd aangesloten en de cloud synchroniseert zonder versies. Geen enkele kopie is offline.", "fotos": "Drie kopieën, maar de externe schijf is altijd aangesloten en de cloud synchroniseert zonder versies. Geen enkele kopie is offline.", "studie sanne": "Maar twee kopieën, en geen enkele offline.", "muziek": "Muziek staat alleen op de NAS: er is helemaal geen back-up." },
          explain: "Administratie: origineel op de laptop, een USB-schijf in de kluis bij oma (offsite en offline) en de cloud met versiegeschiedenis. Drie kopieën, twee soorten media, één offline buiten de deur, en geregeld getest." },
        { q: "Sinds welke datum staan er geen nieuwe foto's meer op de externe schijf?", answer: ["2025-11-14", "14-11-2025", "14 november 2025"],
          hints: ["Lees de hersteltests onderaan het overzicht.", "Kijk naar de test die FOUT gaf.", "De datum staat achter 'back-uptaak gestopt op'."],
          wrong: { "2026-06-01": "Dat is de datum van de hersteltest, waarop het probleem werd ontdekt. De taak was al eerder gestopt.", "01-06-2026": "Dat is de datum van de hersteltest, waarop het probleem werd ontdekt. De taak was al eerder gestopt." },
          why: "Ruim een half jaar lang dacht het gezin dat de foto's veilig waren. Alleen een hersteltest brengt zo'n stil falen aan het licht.",
          explain: "De taak stopte op 14 november 2025 omdat de schijf vol was. Pas bij de hersteltest van juni 2026 bleek dat. Een back-up die niemand controleert, kan maandenlang niets doen." },
        { q: "Ransomware versleutelt laptop-sanne en alles wat eraan hangt. Welke kopie van de map Foto's is daarna nog bruikbaar?",
          options: ["De externe schijf", "De cloudopslag", "Geen van beide; er is geen kopie die buiten bereik was en oude versies bewaart", "Beide, want het zijn twee verschillende media"], answer: 2,
          wrong: { 0: "De externe schijf hangt altijd aan de laptop. Ransomware versleutelt aangesloten schijven mee. En hij was al sinds november 2025 niet bijgewerkt.", 1: "De cloud synchroniseert zonder versiegeschiedenis: de versleutelde bestanden overschrijven de goede.", 3: "Twee media helpt alleen als minstens één kopie buiten bereik is of oude versies bewaart." },
          explain: "Twee media, maar allebei bereikbaar voor de ransomware en zonder weg terug. Voor de foto's ontbreekt precies de '1' van 3-2-1." },
      ],
    },

    {
      title: "Taak 3 — Sterke login: wachtwoordmanager en MFA",
      content: `
        <p>Je accounts zijn de sleutels tot je digitale leven. Twee maatregelen maken ze in één klap veel veiliger:
        een <strong>wachtwoordmanager</strong> en <strong>MFA</strong>. Samen zijn ze misschien wel de grootste
        beveiligingswinst per minuut moeite.</p>

        <h3>Gebruik een wachtwoordmanager</h3>
        <p>Niemand kan tientallen lange, unieke wachtwoorden onthouden. Een <strong>wachtwoordmanager</strong> doet dat
        voor je: hij maakt en bewaart voor elk account een lang, willekeurig, uniek wachtwoord, versleuteld achter
        één sterk <em>hoofdwachtwoord</em>. Zo voorkom je de grootste fout: <strong>hergebruik</strong>. Wordt één
        dienst gehackt, dan opent dat ene gelekte wachtwoord niet meteen al je andere accounts.</p>
        <p>Maak voor je hoofdwachtwoord een <strong>wachtwoordzin</strong> (passphrase): een reeks willekeurige woorden,
        lang en toch te onthouden. Probeer in het lab hoeveel een paar extra woorden uitmaken voor de
        geschatte kraaktijd.</p>

        <h3>Wat het lab wel en niet meet</h3>
        <p>Het lab rekent alsof elk teken willekeurig is gekozen: lengte maal het aantal mogelijke tekens. Een echte
        aanvaller werkt slimmer. Hij probeert eerst bekende wachtwoorden, woorden met een hoofdletter vooraan en een
        jaartal en uitroepteken erachter, en bij wachtwoordzinnen hele woorden in plaats van losse letters. Een
        voorspelbaar patroon is dus veel zwakker dan het lab zegt. Een zin van vier woorden die je echt willekeurig uit
        een lijst van 7776 woorden kiest, heeft ongeveer 52 bits: minder dan het lab toont, maar nog steeds lastig te
        raden, en elk extra woord telt flink mee.</p>

        <div class="callout tip">
          <strong>Tip:</strong> zet op je belangrijkste accounts, zeker je <strong>e-mail</strong>, altijd MFA aan.
          Je e-mail is de hoofdsleutel: via "wachtwoord vergeten" kan iemand anders daarmee je andere accounts
          overnemen.
        </div>

        <h3>Zet MFA overal aan</h3>
        <p><strong>MFA</strong> (multifactor-authenticatie) voegt een tweede slot toe: naast je wachtwoord (iets wat je
        weet) heb je een tweede bewijs nodig, zoals een code uit een app of een hardwaresleutel (iets wat je hebt). Een
        gestolen wachtwoord alleen is dan niet genoeg. Gebruik bij voorkeur een <strong>authenticator-app</strong> of
        een <strong>passkey</strong> boven SMS. (Meer hierover in de room over wachtwoorden en authenticatie.)</p>

        <h3>En phishing dan?</h3>
        <p>Veel accountovernames beginnen met <strong>phishing</strong>: een nep-bericht dat je verleidt je wachtwoord
        in te typen op een valse pagina. Vuistregel: klik niet zomaar op links in onverwachte berichten, controleer het
        afzenderadres, en zie haast en dreiging als alarmbel. Een wachtwoordmanager helpt bovendien: hij vult
        alleen in op het échte domein. <em>Phishing herkennen oefen je in de aparte phishing-room in dit portaal.</em></p>
      `,
      lab: { type: "password" },
      questions: [
        { q: "Wat is het grootste voordeel van een wachtwoordmanager?", options: ["Elk account krijgt een lang, uniek wachtwoord, zodat één lek niet al je accounts opent", "Je hoeft helemaal geen wachtwoorden meer te hebben", "Je wachtwoorden worden korter", "Hij deelt je wachtwoorden met vrienden"], answer: 0, explain: "Unieke wachtwoorden per account stoppen credential stuffing: één lek sleept de rest niet mee." },
        { q: "Op welk account zet je MFA als allereerste aan, omdat het via 'wachtwoord vergeten' veel andere accounts kan openen?", answer: ["e-mail", "email", "mijn e-mail", "e-mailaccount"], hint: "Daar komen je herstelmails binnen.", explain: "Je e-mail is de hoofdsleutel tot herstel van andere accounts; beveilig die het best." },
        { q: "Typ in het lab eerst Zomer2026! en daarna de wachtwoordzin kaas fiets wolk lamp (met spaties). Hoeveel bits entropie geeft het lab voor de wachtwoordzin?", answer: ["118", "118 bits"],
          hints: ["Typ de zin precies over, met kleine letters en spaties.", "Het lab toont het aantal bits direct onder de balk.", "Het is bijna twee keer zoveel als bij Zomer2026!."],
          wrong: { "66": "Dat is de waarde voor Zomer2026!. Typ nu de wachtwoordzin.", "80": "Dat krijg je zonder spaties. Het lab telt de spatie als leesteken, waardoor er meer mogelijke tekens zijn." },
          explain: "Het lab geeft 118 bits voor de zin en 66 voor Zomer2026!. Beide getallen zijn te hoog: Zomer2026! volgt een patroon dat aanvallers als eerste proberen, en vier woorden uit een lijst van 7776 zijn zo'n 52 bits. De zin blijft wel de sterkere en de makkelijker te onthouden van de twee." },
        { q: "Open het lab en test twee wachtwoorden. Ik heb gezien dat extra lengte (meer woorden) de geschatte kraaktijd fors verhoogt.", noAnswer: true },
      ],
    },

    {
      title: "Taak 4 — Veilig wifi, thuis en onderweg",
      tryFirst: true,
      intro: `<p>Familie Jansen heeft de router bijgewerkt. In het lab staat het statusrapport van de router. Loop het na alsof je een vriend helpt: welke instellingen moeten anders, en welk apparaat staat op het verkeerde netwerk?</p>`,
      lab: { type: 'logs', title: 'router-status KL-500', lines: VTW_ROUTER },
      content: `
        <p>Je netwerk is de weg naar al je apparaten. Een paar instellingen maken thuis en onderweg een groot verschil.</p>

        <h3>Je thuisnetwerk</h3>
        <ul>
          <li><strong>Gebruik WPA3 (of minstens WPA2).</strong> Dit is de versleuteling van je wifi.
          <strong>WPA3</strong> is de nieuwste en veiligste; kan je router het aan, zet het aan. Vermijd het oude,
          gebroken WEP volledig.</li>
          <li><strong>Verander het standaard beheerderswachtwoord van je router.</strong> Routers komen vaak met een
          bekend standaardwachtwoord dat op internet te vinden is. Stel een eigen, sterk wachtwoord in en kies ook
          een sterke wifi-sleutel.</li>
          <li><strong>Zet beheer via internet uit</strong> als je het niet nodig hebt. Dan is de beheerpagina alleen
          vanuit je eigen huis bereikbaar, en kan niemand van buitenaf wachtwoorden proberen.</li>
          <li><strong>Zet WPS met pincode uit.</strong> Die koppelfunctie is handig, maar de pincode is bij veel
          routers in korte tijd te raden.</li>
          <li><strong>Zet een gastnetwerk op.</strong> Een <strong>gastnetwerk</strong> is een apart wifi-netwerk voor
          bezoekers en voor je slimme apparaten (IoT). Zo staan die los van je laptop en telefoon: raakt een onveilige
          slimme lamp besmet, dan kan die niet zomaar bij je belangrijke apparaten. Beveilig het gastnetwerk wel net zo
          goed als je hoofdnetwerk.</li>
        </ul>

        <div class="callout info">
          <strong>WPA3 in het kort:</strong> WPA staat voor Wi-Fi Protected Access. Het cijfer is de generatie: hoe
          hoger, hoe beter de beveiliging. WEP (de oudste) is al jaren onveilig en mag je nooit meer gebruiken.
        </div>

        <h3>Onderweg: publieke wifi</h3>
        <p>Gratis wifi in de trein, een café of het vliegveld is handig, maar je deelt het netwerk met vreemden, en je
        weet niet wie het beheert. Behandel het als een openbare ruimte waar iemand kan meeluisteren.</p>
        <ul>
          <li>Doe geen gevoelige dingen (bankieren, inloggen op werk) op onvertrouwde publieke wifi, tenzij via een
          beveiligde verbinding.</li>
          <li>Gebruik een <strong>VPN</strong> (Virtual Private Network): dat maakt een versleutelde tunnel, zodat
          anderen op hetzelfde netwerk je verkeer niet kunnen meelezen. Je werkgever biedt hiervoor vaak een VPN aan.</li>
          <li>Let op: veel verkeer is dankzij <strong>HTTPS</strong> (het slotje) al versleuteld. Dat helpt, maar een
          VPN beschermt al je verkeer en verbergt voor anderen op dat netwerk naar welke diensten je verbindt.</li>
        </ul>

        <h3>De analogie van de ansichtkaart</h3>
        <p>Onversleuteld verkeer op publieke wifi is als een ansichtkaart: iedereen die hem onderweg vastheeft, kan
        meelezen. HTTPS en een VPN stoppen je bericht in een dichte envelop.</p>
      `,
      questions: [
        { q: "Welke wifi-versleuteling is het veiligst van deze drie?", options: ["WPA3", "WPA2", "WEP"], answer: 0, explain: "WPA3 is de nieuwste en veiligste; WEP is al jaren gebroken en moet je nooit gebruiken." },
        { q: "Welk apparaat op Jansen-Thuis zou je naar het gastnetwerk verhuizen?", answer: ["deurbel-voordeur", "deurbel", "de deurbel"],
          hints: ["Het gastnetwerk is ook bedoeld voor slimme apparaten.", "Bekijk de lijst onder Jansen-Thuis: welk apparaat is geen laptop, telefoon of opslag?", "Het hangt bij de voordeur."],
          wrong: { "nas-zolder": "Op de NAS staan de bestanden van het gezin; die moet juist bij de laptops kunnen.", "thermostaat": "De thermostaat staat al op het gastnetwerk.", "tv-woonkamer": "De tv staat al op het gastnetwerk." },
          explain: "De slimme deurbel is een IoT-apparaat op het hoofdnetwerk, naast de laptops en de NAS. Raakt hij besmet, dan zit de aanvaller meteen naast de belangrijkste apparaten." },
        { q: "Wat doet een VPN op publieke wifi voor je?", options: ["Het maakt een versleutelde tunnel zodat anderen op het netwerk je verkeer niet kunnen meelezen", "Het maakt je internet sneller", "Het vervangt je wachtwoord", "Het maakt automatisch back-ups"], answer: 0, explain: "Een VPN versleutelt je verkeer in een tunnel, zodat meeluisteren op hetzelfde netwerk niet lukt." },
        { q: "Op welke poort is de beheerpagina van de router vanaf internet bereikbaar?", answer: ["8080"],
          hints: ["Zoek de regel over beheer.", "Het gaat om beheer via internet.", "Het getal staat achter 'poort'."],
          wrong: { "443": "Dat is de standaardpoort voor HTTPS, maar deze router gebruikt een andere.", "80": "Dat is de standaardpoort voor HTTP, maar deze router gebruikt een andere." },
          why: "Een beheerpagina die vanaf internet bereikbaar is, met het wachtwoord uit de fabriek: zo worden routers in grote aantallen overgenomen, vaak automatisch.",
          explain: "Beheer via internet staat aan op poort 8080, met het fabriekswachtwoord. Zet beheer via internet uit en verander het wachtwoord: twee minuten werk." },
        { q: "Welke beveiliging gebruikt het gastnetwerk nu?", answer: ["WEP"],
          hints: ["Zoek de regel van Wifi 2.", "Kijk achter 'beveiliging'.", "Het is de oudste van de drie wifi-beveiligingen uit de tekst."],
          wrong: { "wpa2/wpa3": "Dat geldt voor Jansen-Thuis. Kijk bij Jansen-Gast.", "wpa2": "Dat geldt voor Jansen-Thuis. Kijk bij Jansen-Gast." },
          explain: "Het gastnetwerk gebruikt WEP. De apparaten erop zijn dus voor iedereen in de buurt bereikbaar. Zet het op WPA2 of WPA3 met een eigen sleutel." },
      ],
    },

    {
      title: "Taak 5 — USB's, randapparatuur en privacy",
      tryFirst: true,
      intro: `<p>Zestien kaartjes over veilig werken en privacy. Ze horen bij vier groepen: maatregelen op de werkplek, beginselen van de AVG, rechten die mensen hebben onder de AVG, en aanvallen via hardware. Maak vier groepen van vier.</p>`,
      lab: { type: 'connections', prompt: 'Vier groepen: fysiek op de werkplek, AVG-beginsel, recht van de betrokkene, aanval via hardware.', flag: 'NM{vier_groepen_veilig_werken}',
        groups: [
          { name: 'Fysiek op de werkplek', items: ['Scherm vergrendelen', 'Clean desk', 'Bezoekers begeleiden', 'Printjes direct ophalen'] },
          { name: 'AVG-beginsel', items: ['Dataminimalisatie', 'Doelbinding', 'Opslagbeperking', 'Juistheid'] },
          { name: 'Recht van de betrokkene', items: ['Inzage', 'Rectificatie', 'Gegevenswissing', 'Dataportabiliteit'] },
          { name: 'Aanval via hardware', items: ['Gevonden USB-stick', 'Stick die zich als toetsenbord voordoet', 'Laadkabel met verborgen chip', 'Keylogger tussen toetsenbord en pc'] },
        ] },
      content: `
        <p>Niet elke aanval komt via het internet. Soms ligt het gevaar letterlijk op straat, of zit het in hoe je met
        gegevens omgaat.</p>

        <h3>De gevonden USB-stick</h3>
        <p>Een klassieke truc: een aanvaller laat een USB-stick 'rondslingeren' op een parkeerplaats of in de
        bedrijfskantine. Nieuwsgierig steek je hem in je computer om te kijken van wie hij is, en precies dat wil de
        aanvaller. Zo'n stick kan malware bevatten die je per ongeluk start, of zich voordoen als een toetsenbord dat
        razendsnel commando's typt. Hetzelfde trucje bestaat in laadkabels met een verborgen chip, en in kleine
        keyloggers die tussen toetsenbord en computer worden gestoken.</p>
        <div class="callout danger">
          <strong>Gouden regel:</strong> steek <strong>nooit</strong> een gevonden of onbekende USB-stick in je
          apparaat. Lever hem in bij de receptie of de IT-afdeling. Je weet niet waar hij geweest is of wat erop staat.
        </div>

        <h3>Fysieke veiligheid op de werkplek</h3>
        <ul>
          <li><strong>Vergrendel je scherm</strong> als je wegloopt (Windows-toets + L). Een onbeheerde, ontgrendelde
          computer is een open deur.</li>
          <li><strong>Clean desk:</strong> laat geen wachtwoorden op briefjes of gevoelige documenten open rondslingeren.
          Haal printjes direct op.</li>
          <li><strong>Begeleid bezoekers</strong> en laat niemand zomaar achter je mee naar binnen lopen.</li>
          <li>Let op <strong>meekijken</strong> (shoulder surfing) in de trein of een café als je gevoelige dingen doet.</li>
        </ul>

        <h3>Privacy en de AVG-basis</h3>
        <p>De <strong>AVG</strong> (Algemene verordening gegevensbescherming, EU-verordening 2016/679, van toepassing
        sinds 25 mei 2018) beschermt persoonsgegevens: alles wat te herleiden is tot een persoon, zoals een naam,
        e-mailadres of BSN. Artikel 5 noemt de beginselen. Een paar die je op je werk direct kunt toepassen:</p>
        <ul>
          <li><strong>Dataminimalisatie</strong> (in de wet: minimale gegevensverwerking): verzamel alleen de gegevens die je echt nodig hebt. Wat je niet hebt, kan ook niet lekken.</li>
          <li><strong>Opslagbeperking:</strong> bewaar gegevens niet langer dan nodig.</li>
          <li><strong>Doelbinding:</strong> gebruik gegevens alleen voor het doel waarvoor ze zijn verzameld.</li>
          <li><strong>Juistheid:</strong> zorg dat gegevens kloppen en werk ze bij.</li>
        </ul>
        <p>Als persoon (de "betrokkene") heb je rechten: je mag inzage vragen in de gegevens die een organisatie over
        je heeft, en vragen om ze te corrigeren (rectificatie), te verwijderen (gegevenswissing) of in een bruikbaar
        formaat mee te nemen (dataportabiliteit). De <strong>Autoriteit Persoonsgegevens</strong> houdt in
        Nederland toezicht op de AVG.</p>
      `,
      questions: [
        { q: "Je vindt een onbekende USB-stick op de parkeerplaats. Wat doe je?", options: ["Niet insteken; inleveren bij receptie of IT", "Insteken om te zien van wie hij is", "Insteken op een werkcomputer, die is beter beveiligd", "Mee naar huis nemen en daar insteken"], answer: 0, explain: "Een gevonden stick kan malware bevatten of een toetsenbord nabootsen. Nooit insteken; inleveren." },
        { q: "Wat betekent dataminimalisatie onder de AVG?", options: ["Alleen de gegevens verzamelen die je echt nodig hebt voor het doel", "Zoveel mogelijk gegevens verzamelen voor later", "Gegevens zo klein mogelijk comprimeren", "Alle data versleutelen"], answer: 0, explain: "Wat je niet verzamelt, kan niet lekken. Hoe lang je gegevens bewaart, valt onder een ander beginsel: opslagbeperking." },
        { q: "Welke vlag krijg je als de vier groepen in het lab kloppen?", answer: ["NM{vier_groepen_veilig_werken}"],
          hints: ["Begin met de groep die je het zekerst weet, bijvoorbeeld de hardware-aanvallen.", "Beginselen zeggen wat een organisatie moet doen; rechten zeggen wat een persoon mag vragen.", "Inzage, rectificatie, gegevenswissing en dataportabiliteit vraag je zelf aan: dat zijn de rechten."],
          wrong: { "/^nm\\{.*\\}$/i": "Dat is niet de vlag die het lab toont. Hij verschijnt pas als alle vier de groepen kloppen." },
          explain: "Beginselen (dataminimalisatie, doelbinding, opslagbeperking, juistheid) zijn plichten van de organisatie. Rechten (inzage, rectificatie, wissing, portabiliteit) zijn wat jij als persoon kunt vragen." },
        { q: "Welke organisatie houdt in Nederland toezicht op de AVG?", answer: ["Autoriteit Persoonsgegevens", "autoriteit persoonsgegevens", "AP"], hint: "De privacytoezichthouder.", explain: "De Autoriteit Persoonsgegevens (AP) is de Nederlandse privacytoezichthouder." },
      ],
    },

    {
      title: "Taak 6 — Als het tóch misgaat",
      tryFirst: true,
      intro: `<p>Bij het fictieve Drukkerij Vonk kan op dinsdagochtend niemand meer iets openen op de NAS. In het lab staan de gebeurtenissen van de dagen ervoor: mail, de laptop van Lotte, de mailbox, de NAS en de back-ups. Reconstrueer wat er gebeurde, en bepaal hoe de drukkerij haar bestanden terugkrijgt.</p>`,
      lab: { type: 'logs', title: 'gebeurtenissen drukkerij-vonk (lokale tijd)', lines: VTW_INCIDENT },
      content: `
        <p>Zelfs met alle maatregelen kan het misgaan. Dan telt vooral dat je <strong>snel en kalm</strong> handelt. Hoe
        eerder je ingrijpt, hoe kleiner de schade. Hier is je noodplan.</p>

        <h3>Vermoed je dat een account gehackt is?</h3>
        <ol>
          <li><strong>Wijzig meteen het wachtwoord</strong> van dat account (vanaf een apparaat dat je vertrouwt), en
          van elk ander account waar je hetzelfde wachtwoord gebruikte.</li>
          <li><strong>Zet MFA aan</strong> als dat er nog niet op zat.</li>
          <li><strong>Log alle actieve sessies uit</strong> ("afmelden op alle apparaten") en controleer de
          beveiligingsinstellingen: ingestelde herstel-e-mail, telefoonnummers en doorstuurregels in je mail
          (aanvallers zetten die vaak stiekem aan, zodat ze blijven meelezen nadat je je wachtwoord hebt gewijzigd).</li>
          <li><strong>Waarschuw je contacten</strong> als er vanuit jouw account rare berichten zijn verstuurd.</li>
        </ol>
        <p>Gebruikte je een apparaat dat zelf besmet is, dan heeft het wijzigen van je wachtwoord daarop weinig zin:
        malware kan het nieuwe wachtwoord ook weer lezen. Wijzig het vanaf een ander, schoon apparaat.</p>

        <h3>Vermoed je dat een apparaat besmet is?</h3>
        <ul>
          <li>Haal het <strong>van het netwerk</strong> (wifi uit, kabel eruit) om verspreiding te stoppen.</li>
          <li>Op je werk: <strong>bel direct de IT- of securityafdeling</strong>. Ga niet zelf aanmodderen; zij stellen
          bewijs veilig en pakken het goed aan (zie de incidentrespons-room).</li>
          <li>Thuis: scan met bijgewerkte beveiligingssoftware, of zet het apparaat in het ergste geval helemaal
          opnieuw op en herstel je data vanaf een schone back-up.</li>
        </ul>

        <h3>Een tijdlijn lezen</h3>
        <p>Begin bij het moment dat iemand iets merkt, en werk terug: wat ging eraan vooraf, en wat daarvoor? Vaak
        ligt het begin uren of dagen eerder dan de schade. Let op wat de aanvaller onderweg verandert om te blijven:
        een regel in de mailbox, een ander herstelnummer. En kijk bij elke back-up of de aanvaller erbij kon.</p>

        <h3>Waar je terecht kunt (Nederland)</h3>
        <ul>
          <li><strong>Politie</strong>: doe aangifte bij fraude, oplichting of een hack. Bewaar bewijs (schermafbeeldingen, berichten).</li>
          <li><strong>Fraudehelpdesk</strong>: voor melden van en hulp bij oplichting en phishing.</li>
          <li><strong>Autoriteit Persoonsgegevens</strong>: als er persoonsgegevens zijn gelekt (voor organisaties geldt de meldplicht).</li>
          <li><strong>NCSC en Veilig Internetten</strong>: voor betrouwbare uitleg en actueel advies.</li>
        </ul>

        <div class="callout tip">
          <strong>Onthoud:</strong> je hoeft je niet te schamen als je ergens intrapt; dat overkomt iedereen weleens.
          Melden en snel handelen is wat telt, niet verzwijgen. Hoe eerder je het zegt, hoe meer er nog te redden is.
        </div>
      `,
      questions: [
        { q: "Wat is de eerste stap als je vermoedt dat een account gehackt is?", options: ["Meteen het wachtwoord wijzigen (en overal waar je het hergebruikte) en MFA aanzetten", "Niets doen en afwachten", "Je account verwijderen", "Je contacten blokkeren"], answer: 0, explain: "Verander meteen het wachtwoord, zet MFA aan en log actieve sessies uit." },
        { q: "Wat doe je als eerste bij een vermoedelijk besmet apparaat?", answer: ["van het netwerk halen", "wifi uit", "netwerk eruit", "offline halen"], hint: "Stop de verspreiding.", explain: "Haal het apparaat van het netwerk om verspreiding te stoppen; op het werk bel je daarna direct IT/security." },
        { q: "Bij welke instantie kun je terecht om oplichting en phishing te melden en hulp te krijgen?", options: ["Fraudehelpdesk", "De Belastingdienst", "Je internetprovider", "De gemeente"], answer: 0, explain: "De Fraudehelpdesk helpt bij en registreert oplichting en phishing. Bij strafbare feiten doe je ook aangifte bij de Politie." },
        { q: "Naar welk adres stuurt de mailbox van Lotte sinds maandagavond alle inkomende mail door?", answer: ["kopie.archief@postvak.example"],
          hints: ["Filter op MAILBOX.", "Zoek de regel waarin een nieuwe regel wordt aangemaakt.", "Het adres eindigt op @postvak.example."],
          wrong: { "boekhouding@factuur-snel.example": "Dat is de afzender van de nepfactuur, niet het adres waar de mail naartoe gaat.", "l.vonk@drukkerij-vonk.example": "Dat is de mailbox van Lotte zelf." },
          explain: "De regel 'archief' stuurt alles door naar kopie.archief@postvak.example en verplaatst de doorgestuurde berichten daarna naar Verwijderde items. Zo leest de aanvaller mee zonder dat het opvalt, ook na een nieuw wachtwoord." },
        { q: "Hoe kwam de aanvaller waarschijnlijk aan het wachtwoord van de mailbox?",
          options: ["Door duizenden wachtwoorden te proberen op de mailbox", "Doordat het script uit de bijlage de opgeslagen browserwachtwoorden las en verstuurde", "Via de cloud-sync van de bestanden", "Door het herstel-telefoonnummer te wijzigen"], answer: 1,
          wrong: { 0: "Daar is in het log geen spoor van: geen reeks mislukte aanmeldingen. De eerste aanmelding vanaf 203.0.113.77 lukt meteen.", 2: "Cloud-sync speelt pas op dinsdagnacht een rol, bij de versleutelde bestanden.", 3: "Dat gebeurde pas ná de inlog, om er later weer in te kunnen komen." },
          explain: "Om 09:04 leest wscript.exe de opgeslagen browserwachtwoorden, vlak nadat de bijlage is geopend. Om 21:14 logt iemand in met het juiste wachtwoord, zonder MFA. Een tweede factor had die inlog tegengehouden." },
        { q: "De drukkerij zet de laptop en de NAS opnieuw op. Van welke datum is de nieuwste back-up waarmee je de bestanden betrouwbaar terugzet?", boss: true, answer: ["2026-10-30", "30-10-2026", "30 oktober 2026", "30 oktober", "vrijdag 30 oktober"],
          hints: ["Twee vragen: welke back-ups kon de aanvaller bereiken, en welke lag buiten zijn bereik?", "Kijk waar nas-elk-uur naartoe schrijft en wat er om 02:10 en 02:20 gebeurt. Kijk welke job zijn schijf daarna loskoppelt.", "Alleen usb-wekelijks schrijft naar een schijf die daarna mee naar huis gaat. Zoek de laatste keer dat die job draaide."],
          wrong: { "2026-11-02": "De back-ups van maandag staan op \\\\NAS01\\backup, en die map is dinsdagnacht ook versleuteld.", "02-11-2026": "De back-ups van maandag staan op \\\\NAS01\\backup, en die map is dinsdagnacht ook versleuteld.", "2026-11-03": "Op dinsdag is alles al versleuteld, ook de cloudkopie (zonder versiegeschiedenis).", "/cloud/i": "De cloud-sync heeft om 02:20 de versleutelde bestanden overgenomen en bewaart geen oude versies.", "/nas/i": "De back-upmap op de NAS is samen met de data versleuteld: hij was altijd bereikbaar vanaf de besmette laptop." },
          why: "De back-up die het vaakst draait, is niet automatisch de beste. Wat telt is of de aanvaller erbij kon. Twee van de drie jobs bleken bij de aanval waardeloos.",
          explain: "nas-elk-uur schreef naar een map op dezelfde NAS (versleuteld om 02:10), cloud-sync nam de versleutelde bestanden over zonder oude versies. Alleen usb-wekelijks lag buiten bereik: de run van vrijdag 30 oktober. Het werk van daarna moet opnieuw, maar de drukkerij hoeft niet te betalen." },
      ],
    },

    {
      title: "Taak 7 — Verdieping: waarom de ene tweede factor sterker is dan de andere",
      kind: 'verdieping', optional: true,
      content: `
        <p>MFA aanzetten is de grootste stap. Maar niet elke tweede factor houdt evenveel tegen. Het verschil zit in de
        vraag: wat kan een aanvaller doen als hij je naar een valse inlogpagina lokt?</p>

        <h3>SMS-codes</h3>
        <p>Een code per SMS is beter dan niets. De zwakke plek is je telefoonnummer. Bij <strong>SIM-swapping</strong>
        overtuigt een aanvaller je provider om je nummer over te zetten op een simkaart van hem; daarna krijgt hij je
        codes. En een code die je zelf op een nepsite intypt, kan de aanvaller direct doorgeven aan de echte site.</p>

        <h3>Codes uit een authenticator-app</h3>
        <p>Een app maakt elke 30 seconden een nieuwe code van meestal zes cijfers, berekend uit een geheim dat
        alleen jouw app en de dienst kennen (TOTP, beschreven in RFC 6238 uit 2011). Er is geen telefoonnummer om te
        kapen. Maar ook hier geldt: typ je de code in op een nepsite die als tussenpersoon werkt, dan gebruikt de
        aanvaller hem binnen die 30 seconden zelf. Zulke phishingkits die het hele inlogverkeer doorgeven en
        de sessie overnemen, worden door criminelen gewoon verhuurd.</p>

        <h3>Pushmeldingen</h3>
        <p>Bij een pushmelding tik je op "Goedkeuren". Aanvallers die je wachtwoord al hebben, sturen soms tientallen
        meldingen achter elkaar, midden in de nacht, in de hoop dat je er één goedkeurt om ervan af te zijn
        (MFA-moeheid). Daarom laten veel diensten je nu een getal overtypen dat op het inlogscherm staat.</p>

        <h3>Passkeys en hardwaresleutels</h3>
        <p>Een <strong>passkey</strong> (gebaseerd op de standaarden FIDO2 en WebAuthn) werkt anders. Je apparaat
        bewaart een sleutel die aan het domein van de dienst is gekoppeld. De browser biedt die sleutel alleen aan op
        precies dat domein. Op een nepsite met een andere naam gebeurt er dus niets: er valt niets in te typen en
        niets door te geven. Daarom heten passkeys en hardwaresleutels <em>phishingbestendig</em>. Er gaat ook geen
        geheim over de lijn dat bij een datalek bij de dienst kan uitlekken: de dienst bewaart alleen een publieke
        sleutel.</p>

        <h3>Wat dit voor jou betekent</h3>
        <ul>
          <li>Kan een dienst passkeys aan, gebruik die. Zo niet: een authenticator-app. SMS als het niet anders kan.</li>
          <li>Krijg je een melding om goed te keuren terwijl je zelf niet aan het inloggen bent: weigeren en je
          wachtwoord wijzigen. Iemand anders heeft het.</li>
          <li>Bewaar de herstelcodes die je bij het instellen krijgt op een veilige plek, bijvoorbeeld in je
          wachtwoordmanager of op papier in een la.</li>
        </ul>
      `,
      questions: [
        { q: "Hoeveel verschillende codes van zes cijfers bestaan er?", answer: ["1000000", "1.000.000", "een miljoen", "10^6"],
          hints: ["Elk cijfer heeft tien mogelijkheden.", "Zes keer tien met zichzelf vermenigvuldigen.", "Van 000000 tot en met 999999."],
          wrong: { "999999": "Je vergeet 000000. Van 000000 tot en met 999999 zijn het er één meer.", "60": "Je telt op in plaats van te vermenigvuldigen: het is 10 x 10 x 10 x 10 x 10 x 10." },
          explain: "10^6 = 1.000.000. Raden binnen 30 seconden is dus kansloos zolang een dienst het aantal pogingen beperkt; het echte gevaar is dat je de code zelf weggeeft." },
        { q: "Je wordt naar inlog.mailbox-check.nm.lab gelokt, een kopie van je echte maildienst. Welke tweede factor levert de aanvaller daar niets op?",
          options: ["Een SMS-code", "Een code uit een authenticator-app", "Een passkey", "Een pushmelding die je goedkeurt"], answer: 2,
          wrong: { 0: "Een SMS-code die je op de nepsite typt, geeft de aanvaller direct door aan de echte dienst.", 1: "Ook een app-code kun je intypen op de nepsite. De aanvaller heeft 30 seconden en dat is genoeg.", 3: "Keur je de melding goed, dan geef je de aanvaller toegang. De melding zegt niet op welke site jij zit." },
          explain: "De passkey hoort bij het echte domein. De browser biedt hem op inlog.mailbox-check.nm.lab niet aan, dus er valt niets te stelen." },
        { q: "Om 03:12 krijg je zes keer achter elkaar een melding 'Inlogpoging goedkeuren?'. Je bent niet aan het inloggen. Wat weet je nu?",
          options: ["Niets, het is een storing", "Iemand heeft je wachtwoord en probeert je MFA te omzeilen", "Je telefoon is besmet", "Je MFA werkt niet"], answer: 1,
          wrong: { 0: "Een melding komt pas na een geslaagde eerste stap: iemand heeft het juiste wachtwoord ingevoerd.", 2: "De meldingen komen van de dienst, na een inlogpoging elders. Daar is geen besmette telefoon voor nodig.", 3: "Je MFA werkt juist: hij houdt de aanvaller tegen zolang jij niet goedkeurt." },
          explain: "Weiger alle meldingen, wijzig je wachtwoord vanaf een vertrouwd apparaat en meld het. De tweede factor heeft je net gered." },
      ],
    },

    {
      title: "Taak 8 — Zo komt dit voor op een examen",
      kind: 'examen', optional: true,
      content: `
        <p>Examenvragen over basisbeveiliging beschrijven een situatie op kantoor of thuis en vragen wat je het beste
        eerst doet. De afleiders zijn vaak handelingen die logisch voelen of die een beetje helpen, maar het eigenlijke
        risico laten staan. Vraag je bij elk antwoord af: welk risico neemt dit weg, en is dat het grootste?</p>
        <p>De vier vragen hieronder zijn voor deze room geschreven, in de stijl van zulke examens.</p>
      `,
      questions: [
        { q: "Een klein accountantskantoor maakt elke nacht een back-up naar een NAS in dezelfde kast als de server. De NAS is altijd verbonden. Wat is de belangrijkste verbetering?",
          options: ["Elk uur een back-up maken in plaats van elke nacht", "Een extra kopie die offline of onveranderbaar is en buiten het kantoor ligt", "Een grotere NAS kopen", "De NAS een ander wachtwoord geven dan de server"], answer: 1,
          wrong: { 0: "Vaker back-uppen verkleint het verlies bij een kapotte schijf, maar ransomware versleutelt de NAS nog steeds mee, en een brand treft beide.", 2: "Meer ruimte verandert niets aan het risico: de NAS blijft bereikbaar en op dezelfde plek.", 3: "Dat helpt een beetje, maar ransomware gebruikt vaak de verbinding die de back-up zelf al heeft." },
          explain: "Het kantoor mist de '1' uit 3-2-1: een kopie buiten bereik van een aanval en buiten het gebouw." },
        { q: "Een medewerker meldt dat hij zijn wachtwoord heeft ingevuld op een pagina die op de inlogpagina van het werk leek. MFA met een app staat aan. Wat doe je eerst?",
          options: ["Niets, want MFA staat aan", "Het wachtwoord wijzigen, actieve sessies afmelden en de mailboxregels controleren", "Zijn laptop formatteren", "Een nieuwe telefoon voor de authenticator-app bestellen"], answer: 1,
          wrong: { 0: "Een nepsite die als tussenpersoon werkt, kan ook de app-code en daarmee de sessie hebben buitgemaakt. Je weet niet of MFA heeft geholpen.", 2: "Er is geen aanwijzing dat de laptop besmet is. Het probleem is het account.", 3: "De telefoon is niet gecompromitteerd; de aanvaller heeft het wachtwoord en misschien een sessie." },
          explain: "Ga ervan uit dat het account in gevaar is: nieuw wachtwoord, alle sessies uitloggen en zoeken naar wat de aanvaller kan hebben ingesteld, zoals doorstuurregels." },
        { q: "Bij een bedrijf blijkt een lijst met namen en adressen van klanten per ongeluk openbaar op internet te hebben gestaan. Wat geldt volgens de AVG (2016/679)?",
          options: ["Het bedrijf hoeft niets te doen als niemand klaagt", "Het bedrijf meldt het datalek binnen 72 uur bij de Autoriteit Persoonsgegevens, tenzij het waarschijnlijk geen risico oplevert", "Alleen de Politie moet worden ingelicht", "Het bedrijf moet binnen een jaar de klanten informeren"], answer: 1,
          wrong: { 0: "De meldplicht hangt niet af van klachten. Hij geldt vanaf het moment dat het bedrijf het lek ontdekt.", 2: "Aangifte kan, maar de AVG verplicht een melding bij de toezichthouder: de Autoriteit Persoonsgegevens.", 3: "Bij een hoog risico moeten betrokkenen zonder onnodige vertraging worden ingelicht, niet pas na een jaar." },
          explain: "Artikel 33 AVG: melden bij de toezichthouder binnen 72 uur na ontdekking, behalve als het lek waarschijnlijk geen risico oplevert voor de betrokkenen. Bij een hoog risico informeer je ook de betrokkenen (artikel 34)." },
        { q: "Thuis staat een slimme camera van een merk dat al twee jaar geen updates meer uitbrengt. Hij werkt nog prima. Wat is het beste advies?",
          options: ["Laten staan; zolang hij werkt is er geen probleem", "Het wachtwoord van de camera elke maand wijzigen", "De camera vervangen, of hem tot dan op een apart gastnetwerk zetten", "Automatische updates aanzetten"], answer: 2,
          wrong: { 0: "Werken en veilig zijn is niet hetzelfde. Nieuwe lekken worden niet meer gerepareerd.", 1: "Een nieuw wachtwoord helpt niet tegen een lek in de software zelf.", 3: "Er komen geen updates meer. De instelling verandert daar niets aan." },
          explain: "End-of-life betekent: elk nieuw lek blijft open. Vervangen is de echte oplossing; een gastnetwerk beperkt de schade tot die tijd." },
      ],
    },
  ],
  terms: [
    { term: "Patch", def: "Reparatie die een beveiligingsgat (kwetsbaarheid) in software dicht; snel installeren is belangrijk." },
    { term: "Kwetsbaarheid", def: "Beveiligingsfout in software die een aanvaller kan misbruiken (Engels: vulnerability)." },
    { term: "End-of-life", def: "Software die geen updates meer krijgt van de fabrikant en dus voorgoed lek blijft." },
    { term: "Back-up", def: "Reservekopie van je data, zodat je bij verlies, schade of ransomware kunt herstellen." },
    { term: "3-2-1-regel", def: "Vuistregel voor back-ups: 3 kopieën, op 2 verschillende media, waarvan 1 offsite en bij voorkeur offline." },
    { term: "Wachtwoordmanager", def: "Programma dat lange, unieke wachtwoorden genereert en versleuteld bewaart achter één hoofdwachtwoord." },
    { term: "MFA", def: "Multifactor-authenticatie: naast je wachtwoord een tweede bewijs, zoals een code uit een app of een passkey." },
    { term: "Passkey", def: "Inlogsleutel (FIDO2/WebAuthn) die aan het domein van een dienst gekoppeld is en daardoor bestand is tegen phishing." },
    { term: "WPA3", def: "Nieuwste en veiligste beveiliging voor wifi; gebruik dit (of minstens WPA2), nooit het gebroken WEP." },
    { term: "Gastnetwerk", def: "Apart wifi-netwerk voor bezoekers en slimme apparaten, gescheiden van je belangrijke apparaten." },
    { term: "VPN", def: "Virtual Private Network: versleutelde tunnel die je verkeer beschermt, handig op publieke wifi." },
    { term: "AVG", def: "Algemene verordening gegevensbescherming (EU 2016/679): EU-privacywet die persoonsgegevens beschermt (Engels: GDPR)." },
    { term: "Dataminimalisatie", def: "AVG-principe: verzamel alleen de gegevens die je echt nodig hebt." },
  ],
  resources: [
    { title: "Veilig internetten — praktische tips", url: "https://veiliginternetten.nl/" },
    { title: "NCSC — advies en actueel nieuws", url: "https://www.ncsc.nl/" },
    { title: "Autoriteit Persoonsgegevens — privacy en datalekken", url: "https://www.autoriteitpersoonsgegevens.nl/" },
    { title: "Fraudehelpdesk — oplichting en phishing melden", url: "https://www.fraudehelpdesk.nl/" },
  ],
});
