# 🥷 NineMinds Cyber Dojo

Een **doelgericht, Nederlandstalig leerportaal voor cybersecurity** — in de stijl van TryHackMe, maar helemaal van jou. Korte uitleg, veel oefenen in **echte interactieve browser-labs**, en oefenvragen met **vlaggen** (flags) om te vinden. Van de absolute basis tot je eerste hacks én verdedigingen.

> **Geen installatie nodig.** Het is één statische website (HTML + CSS + JavaScript, zonder build-stap of server). Je opent `index.html` in je browser, of je zet het online via GitHub Pages.

---

## 🚀 Snel starten

**Optie A — lokaal openen**
Dubbelklik `index.html`. Klaar. Alles werkt direct, ook je voortgang (die wordt lokaal in je browser bewaard).

**Optie B — online via GitHub Pages**
1. Ga in deze repo naar **Settings → Pages**.
2. Kies bij *Source*: **Deploy from a branch**, branch **main** (of de branch waar dit op staat), map **/ (root)**.
3. Na een minuutje staat je Dojo op `https://<jouw-gebruikersnaam>.github.io/<repo-naam>/`.

**Optie C — lokale webserver** (handig tijdens het ontwikkelen)
```bash
python3 -m http.server 8000
# open daarna http://localhost:8000
```

**Optie D — één bestand** 
In [`dist/nineminds-cyber-dojo.html`](dist/nineminds-cyber-dojo.html) staat het hele portaal (alle lessen, labs en opmaak) in één bestand. Handig om te mailen, op een USB-stick te zetten of offline te openen. Opnieuw genereren na een wijziging: `node tools/build-artifact.js`.

---

## 🎓 Wat ga je leren?

Het portaal is opgebouwd uit **leerpaden**. Volg ze van boven naar beneden; elke room bouwt voort op de vorige.

### 🧱 Fundamenten
De basis die alles draagt.
1. **Welkom in cybersecurity** — CIA-triade, soorten aanvallers, ethiek en de wet (art. 138ab Sr).
2. **Netwerken: de basis** — IP/MAC, OSI-model, TCP/UDP, poorten.
3. **IP-adressen en subnetting** — subnetten rekenen, met een interactieve calculator.
4. **Hoe het web werkt** — DNS, HTTP(S), cookies.
5. **Linux: de basis** — de terminal, bestanden, rechten.
6. **Windows en Active Directory: de basis** — PowerShell, accounts, logs.

### 🔐 Security-kern
De bouwstenen van beveiliging.
1. **Cryptografie** — coderen vs. versleutelen vs. hashen (met CyberChef).
2. **Wachtwoorden en authenticatie** — sterke wachtwoorden, hashes kraken, MFA & passkeys.
3. **Social engineering & phishing** — de menselijke factor, met een phishing-inbox om te oefenen.
4. **Kwetsbaarheden & CVSS** — van CVE tot patch, met een interactieve CVSS-calculator, EPSS en de KEV-catalogus.
5. **Klassieke cijfers kraken** — Caesar, Vigenère en XOR ontcijferen met een cijfer-kraker.
6. **Rainbow tables & waarom salt wint** — precomputatie, salt, peper en trage hashes.
7. **Fraudevormen herkennen** — helpdesk-, marktplaats-, investerings- en CEO-/spoofingfraude herkennen, het crime script ontleden en de geldstroom volgen.

### ⚔️ Offensief (red team)
Denken als een aanvaller — altijd in een veilig lab.
1. **OWASP Top 10** — de tien grootste webrisico's (editie 2025).
2. **Verkenning & scannen** — reconnaissance en nmap.
3. **Webhacking: SQL-injectie** — kwetsbaarheden zelf uitbuiten.
4. **Wachtwoorden kraken** — woordenlijst, regels (mangling) en brute-force (maskers) op MD5/SHA/NTLM.
5. **Crack the Hash — de uitdaging** — een oplopende reeks hashes om zelf te herkennen en te kraken.
6. **Reverse engineering: crackmes kraken** — lees de controle en vind de sleutel (met een echte crackme-lab).
7. **Decoderen & multi-decode (CTF)** — gelaagde codering afpellen met de multi-decoder en CyberChef.

### 🛡️ Defensief (blue team)
Denken als een verdediger.
1. **Logs & detectie** — aanvallen terugvinden in logbestanden.
2. **Incident response** — reageren volgens het NIST-framework (CSF 2.0).
3. **Veilig thuis & op het werk** — updates, back-ups, hardening.
4. **Threat intelligence & MITRE ATT&CK** — IOC's, de Pyramid of Pain, TLP en het ATT&CK-model.
5. **Detectie-engineering** — detectieregels bouwen met regex, Sigma en YARA.
6. **Detectie bouwen: van IOC naar regel** — zelf een detectieregel samenstellen en live tunen op true/false positives.
7. **Ransomware: incident & onderhandeling** — een incidentsimulatie: isoleren, back-ups, omgaan met een afperser en de NIST-fasen op volgorde.

### 🕵️ Digitale forensie & opsporing
De weg naar digitaal rechercheur — sporen vinden, veiligstellen en duiden.
1. **Digitaal rechercheur worden** — wat forensie is, de rollen en de wet.
2. **Bewijs veiligstellen** — chain of custody, imaging en hashing.
3. **Schijf- en bestandssysteemforensie** — verwijderde bestanden, file carving.
4. **Geheugenforensie** — wat het RAM verraadt.
5. **Netwerkforensie** — het verhaal in het verkeer (met pcap-lab).
6. **Forensische Windows-artefacten** — prefetch, registry, event logs.
7. **Mobiele en cloud-forensie** — telefoons en clouddiensten.
8. **OSINT: opsporen met open bronnen** — veilig en gestructureerd zoeken.
9. **Malware-analyse: de basis** — statisch en dynamisch, altijd in een lab.
10. **Tijdlijnanalyse** — van tijdstempel tot super-timeline.
11. **Forensie-CTF: Zaak Zilverlab** — een volledig onderzoek als oefening.
12. **Verder leren** — boeken, tools en platforms.

### 🧠 Cyber-intelligence & opsporing
Van fenomeen naar interventie: denken en werken als intelligence-analist.
1. **Het cybercrime-ecosysteem** — crime-as-a-service, RaaS, leksites en interventietypes (met casussen).
2. **Crime scripting** — delicten ontleden in fasen (Cornish) en de interventiematrix.
3. **Intelligencecyclus, CSAE & analyse** — bronbeoordeling (Admiralty), waarschijnlijkheidstaal, ACH en denkfouten.
4. **Threat intelligence-modellen** — Kill Chain, ATT&CK, Diamond Model en de Pyramid of Pain.
5. **Infrastructuur-OSINT & pivoting** — entiteiten, bronnen, fingerprinting en een pivot-sandbox (met juridische grenzen).
6. **Intelligenceproducten & interventieadvies** — strategisch/tactisch/operationeel, BLUF-schrijven en de STAR-methode.
7. **Praktijkcase: de complete workflow** — één casus van tijdlijn t/m BLUF-product.
8. **Werkblad** — alle technieken in één werkproces met een checklist.
9. **OSINT-infrastructuur: ontmantel het netwerk** — infra clusteren op gedeelde kenmerken (favicon, analytics, JARM), de zeldzaamheidstoets toepassen en pivoteren naar een tweede dossier.

### 💧 Datastromen volgen
Word expert in geld- en datastromen — de rode draad van bijna elke cybercrimezaak.
1. **Witwassen & structurering** — de drie witwasfasen, smurfing betrappen onder de Wwft-meldgrens, de geldstroom volgen tot de cash-out en met ACH wegen wie erachter zit.
2. **Netwerkstromen: beaconing & exfiltratie** — C2-beaconing (strak ritme) onderscheiden van data-exfiltratie (groot uitgaand volume), eerst via NetFlow en dan op pakketniveau.
3. **E-mail forensics** — de Received-keten van onder naar boven lezen, spoofing betrappen met SPF/DKIM/DMARC, IOCs extraheren en een phishinglink ontleden.
4. **DNS: de stille uitgang** — DNS-tunneling (data in lange subdomeinen, vaak TXT) en een DGA (veel NXDOMAIN) herkennen, detecteren en blokkeren.
5. **Crypto-witwassen: peel chains & chain-hopping** — waarom peelen de taint niet verwijdert, en hoe mixers, chain-hopping, stablecoins en NFT-wash-trading het spoor versluieren.
6. **Financiële recherche: reconstrueer de rekeningen** — bankafschrift en boekhouding reconciliëren om de onverklaarde post te vinden en het geld te volgen.
7. **Capstone: Operatie Spiegelstroom** — één zaak die alles samenbrengt: van BEC-phishing via exfiltratie tot witwassen, met een afsluitend BLUF-product.

### 🧩 Puzzels & uitdagingen
Leren door te doen — veel plezier met oplosbare cybercrime-puzzels.
1. **Follow the money: cryptostromen volgen** — volg de buit door mules, mixers en exchanges.
2. **Datastromen & exfiltratie herkennen** — beaconing, DNS-tunneling en een exfil-tijdlijn.
3. **OSINT-jacht: ontmasker de operator** — correleer sporen tot één identiteit.
4. **Cybercrime-arcade: gemengde puzzels** — verbanden, volgorde, regex-golf, cijfers en een crackme.
5. **Cybercrime-CTF: Operatie Spookgeld** — een grote capstone van hash tot BLUF (tien vlaggen).
6. **Casus: bankhelpdeskfraude** — vishing, money mules en de geldstroom naar de cash-out.
7. **Casus: botnet-takedown** — C2-verkeer, ATT&CK, pivoten en de stappen van een takedown.
8. **Casus: het cryptomixer-onderzoek** — taint volgen door een mixer met de blockchain-tracer.

### 🏁 Eindopdracht
1. **Mini-CTF: Operatie KoffieKlap** — breng alles samen in een afsluitende Capture The Flag met zes vlaggen.
2. **Grote kraak-CTF: Operatie Sleutelbos** — een uitgebreide kraak-CTF langs hashes, cijfers, codering, een crackme, een JWT en NTLM (zeven vlaggen).

---

## 🧪 De interactieve labs

Alle labs draaien **volledig in je browser** — veilig, offline, zonder dat er echt iets wordt aangevallen:

| Lab | Wat je ermee oefent |
|-----|---------------------|
| 🖥️ **Terminal** | Een nagebootste Linux-shell (en PowerShell) met een echt bestandssysteem, `ls/cat/grep/find/base64/...` en pipes. |
| 🧪 **CyberChef** | Coderen, decoderen en hashen (Base64, hex, ROT13, XOR, MD5/SHA-…), met een recept dat je zelf opbouwt. |
| 🔓 **Hash-kraker** | Hashes kraken met een woordenlijst, **regels (mangling)** of **brute-force (maskers)** — op MD5, SHA-1/256 en **NTLM**, met en zonder salt. Toont live snelheid. |
| 🧭 **Hash-herkenner** | Het hashtype herkennen (MD5, NTLM, SHA, bcrypt, sha512crypt, …) vóór je gaat kraken. |
| 🗝️ **Cijfer-kraker** | Klassieke versleuteling ontcijferen: Caesar/ROT (auto), single-byte XOR (brute-force), Vigenère en Atbash. |
| 🔑 **Wachtwoord-analyse** | Live de sterkte en kraaktijd van een wachtwoord zien. |
| 🎣 **Phishing-inbox** | Rode vlaggen zoeken in nep-e-mails. |
| 📊 **Logviewer** | Logbestanden filteren (tekst én regex) om een aanval te vinden. |
| 🌐 **HTTP-client** | Verzoeken sturen naar een nepserver en kwetsbaarheden vinden. |
| 💉 **SQL-injectie** | Een kwetsbaar loginformulier echt uitbuiten — en de fix zien werken. |
| 🧮 **Subnet-calculator** | Subnetten uitrekenen en oefenvragen genereren. |
| 🔢 **Hex-viewer** | Rauwe bytes lezen: magic bytes herkennen en verstopte strings vinden. |
| 📡 **Pakketanalyse** | Netwerkverkeer lezen (Wireshark-light) en een spoor volgen in de stream. |
| 🎫 **JWT-inspecteur** | JSON Web Tokens decoderen, de claims lezen en een HS256-handtekening controleren. |
| 🔤 **Regex-tester** | Reguliere expressies live testen met markering en capture-groepen. |
| 🩹 **CVSS-calculator** | De basisscore (v3.1) van een kwetsbaarheid uitrekenen uit de vector. |
| 🕰️ **Tijdstempel-omrekenaar** | Unix, FILETIME, WebKit en Cocoa-tijd omzetten naar een leesbare datum. |
| 🧾 **IOC-extractor** | Indicatoren (IP's, domeinen, hashes, CVE's) uit vrije tekst halen en defangen. |
| 🔗 **URL-ontleder** | Een link ontleden en phishing-rode-vlaggen zichtbaar maken. |
| 🧬 **YARA-lab** | Detectieregels schrijven en op voorbeeldbestanden testen. |
| ⏳ **Super-timeline** | Gebeurtenissen uit vele bronnen op één tijdlijn filteren en markeren. |
| 🔐 **chmod & getallen** | Linux-rechten en getalstelsels (hex/binair/octaal) omrekenen. |
| 🔃 **Crackme** | Reverse-engineering puzzel: lees de controlefunctie en vind de sleutel. |
| ✨ **Multi-decoder** | Herkent en pelt lagen codering af (Base64/32, hex, binair, Morse, ROT13, URL…) en zoekt automatisch de vlag. |
| 🌈 **Rainbow table** | Zie waarom onvergezouten hashes direct op te zoeken zijn — en hoe salt dat breekt. |
| 🧮 **ACH-matrix** | Concurrerende hypothesen afwegen door bewijs te scoren (C/I/N) — de houdbaarste wint. |
| 🎬 **Crime script-builder** | Een delict ontleden in zes fasen met een interventie per fase. |
| 📊 **Bronbeoordeling** | Betrouwbaarheid (A–F) en geloofwaardigheid (1–6) apart beoordelen (Admiralty Code). |
| 📈 **Waarschijnlijkheidstaal** | Woorden als "waarschijnlijk" aan de juiste percentage-band koppelen. |
| 🗺️ **ATT&CK-mapping** | Een waarneming aan de juiste MITRE ATT&CK-techniek koppelen. |
| 📡 **Pivot-sandbox** | Door een fictieve entiteit/relatie-graaf pivoteren om het dwarsverband te vinden. |
| 📝 **BLUF-herschrijven** | Een chronologisch verhaal herschrijven naar "conclusie eerst" (met rubric-check). |
| 💸 **Stroom volgen** | Geld of data door mules, mixers en exchanges volgen naar de cash-out. |
| 🔢 **Volgorde-puzzel** | Een aanvals-tijdlijn of kill chain reconstrueren. |
| 🎯 **Regex-golf** | Eén patroon dat de kwaadaardige regels matcht en de goede mijdt. |
| 🔎 **OSINT-puzzel** | Fictieve fragmenten correleren en het verband ontmaskeren. |
| 🧩 **Verbanden** | 16 begrippen in 4 categorieën groeperen (Connections-stijl). |
| ⛓️ **Blockchain-tracer** | Vuil geld door transacties volgen: common-input-clustering en taint-analyse (haircut). |
| 📡 **NetFlow-analyse** | Beaconing (strak ritme) en exfiltratie (groot uitgaand volume) in netwerkstromen betrappen. |
| 💶 **Structurering-detector** | Smurfing herkennen: stortingen net onder de Wwft-meldgrens, met totaalbedrag en dagen. |
| ✉️ **E-mailheader-analyse** | De Received-keten traceren en spoofing betrappen met From/Return-Path en SPF/DKIM/DMARC. |
| 🌫️ **DNS-log-analyse** | DNS-tunneling (TXT + lange subdomeinen) en een DGA (veel NXDOMAIN) in een querylog herkennen. |
| 📒 **Reconciliatie** | Bankafschrift en boekhouding naast elkaar leggen en de onverklaarde (fraude)post vinden. |
| 🧰 **Detectieregel bouwen** | Zelf een detectieregel samenstellen en live testen op true/false positives tegen events. |
| 🛰️ **Infrastructuur-fingerprinting** | Hosts clusteren op gedeelde kenmerken (favicon, analytics, JARM) met de zeldzaamheidstoets. |
| 🎲 **Beslissimulatie** | Beslissingen nemen onder druk (incident response/onderhandeling) en de gevolgen zien. |

Alle tools zijn ook los te gebruiken via de **🧰 Gereedschapskist** (knop op de startpagina, of `#/tools`) — handig voor je eigen, ethische oefeningen.

Je verdient **XP** en **badges**, en je voortgang wordt per vraag bewaard (lokaal, in `localStorage`).

---

## ⚖️ Ethiek — lees dit

Dit portaal leert aanvalstechnieken **uitsluitend** om je te leren verdedigen en om legaal, bevoegd beveiligingswerk te doen.

> **Oefen aanvalstechnieken alleen op je eigen systemen of met schriftelijke toestemming.** In Nederland is ongeautoriseerd binnendringen strafbaar (computervredebreuk, art. 138ab Sr). Vind je een kwetsbaarheid in andermans systeem? Meld het netjes (coordinated vulnerability disclosure), bijvoorbeeld via het [NCSC](https://www.ncsc.nl/).

Alle scenario's, bedrijven en IP-adressen in dit portaal zijn **fictief**.

---

## 🛠️ Zelf content toevoegen of aanpassen

Elke room is één bestand in [`content/rooms/`](content/rooms/). De volledige handleiding staat in **[`docs/CONTENT-SPEC.md`](docs/CONTENT-SPEC.md)**: hoe je een room schrijft, welke vraagtypes er zijn, en hoe je elk labtype configureert.

Werkwijze:
1. Maak `content/rooms/<mijn-room>.js` (kopieer een bestaande room als voorbeeld).
2. Controleer het: `node tools/validate.js content/rooms/<mijn-room>.js`
3. Werk de scriptlijst in `index.html` bij: `node tools/build.js`
4. (Optioneel) test in een echte browser: `node tools/smoke.js` en `node tools/labtest.js`

### Hulpscripts
| Script | Doel |
|--------|------|
| `node tools/validate.js [bestand…]` | Controleert rooms op structuur, vragen, vlaggen en labs. Rekent hashes na. |
| `node tools/build.js` | Zet alle rooms (gesorteerd op leerpad + volgorde) in `index.html`. |
| `node tools/build-artifact.js` | Bouwt de losse versie `dist/nineminds-cyber-dojo.html` (alles in één bestand). |
| `node tools/smoke.js` | Laadt het portaal in een headless browser en controleert dat alles rendert. |
| `node tools/labtest.js` + `labtest-extra.js` | Bedienen de labs echt en controleren de uitkomsten. |

*(De testscripts gebruiken Node + Playwright; de validator en build werken met alleen Node.)*

---

## 📁 Structuur

```
index.html              # het portaal (start hier)
assets/
  css/style.css         # thema (licht/donker) en opmaak
  js/app.js             # engine: routering, voortgang, XP, badges, zoeken
  js/labs.js            # alle interactieve labs + crypto-helpers
content/
  rooms/*.js            # de lesinhoud (één bestand per room)
docs/CONTENT-SPEC.md    # handleiding om content te schrijven
tools/                  # validate / build / smoke / labtest
```

---

*Veel plezier, en blijf nieuwsgierig — op de goede manier. 🥷*
