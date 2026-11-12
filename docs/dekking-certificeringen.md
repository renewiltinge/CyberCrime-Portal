# Dekkingsmatrix: Cyber Dojo tegenover certificeringen en kaders

> **Lees dit eerst.** Dit portaal vervangt geen erkend examen en levert geen certificaat op. Deze matrix is een eigen inschatting van de makers, niet beoordeeld of goedgekeurd door CompTIA, ISC2, INE, TCM Security, OffSec, Security Blue Team, GIAC, EC-Council, MITRE of een andere exameninstantie. Laatst gecontroleerd op 2026-11-12, tegen 120 rooms in `content/rooms/`.

## Hoe je deze matrix leest

| Status | Betekenis |
|---|---|
| **gedekt** | Minstens één room behandelt het onderwerp inhoudelijk en laat je ermee oefenen (lab, casus, quiz of vlag). |
| **deels** | Het onderwerp wordt genoemd of van één kant belicht (bijvoorbeeld alleen de verdedigende kant), of er is geen eigen oefening. |
| **ontbreekt** | Geen room behandelt het onderwerp. |

Kanttekeningen:

- De indeling in domeinen volgt de openbare examendoelen op hoofdlijnen. Subdoelen, nummering en wegingen zijn bewust weggelaten. Controleer altijd de actuele syllabus van de exameninstantie voordat je een studieplan maakt.
- "Gedekt" zegt iets over het onderwerp, niet over het examenniveau. Alle labs in de dojo zijn simulaties in de browser. Praktijkexamens zoals eJPT, PNPT, OSCP en BTL1 vragen daarnaast uren oefening op echte systemen en met echte tools.
- De status is bepaald op basis van titel, samenvatting, leerdoelen, taaktitels en begrippenlijst per room, aangevuld met zoeken op trefwoorden in de roombestanden. Niet elke room is regel voor regel nagelezen.
- Room-id's staan in `code`. Het bijbehorende bestand is `content/rooms/<id>.js`.

## 1. Instap

### 1.1 CompTIA Security+ (SY0-701)

Vijf domeinen. De onderwerpen per domein zijn een eigen samenvatting; controleer de actuele syllabus.

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| **General Security Concepts**: CIA, AAA, authenticiteit, onweerlegbaarheid | gedekt | `intro-cybersecurity`, `wachtwoorden-authenticatie` | Kernbegrippen met oefening. |
| General Security Concepts: soorten maatregelen (technisch, organisatorisch, fysiek; preventief, detectief, correctief) | deels | `financiele-recherche`, `crime-scripting`, `ceo-fraude-simulatie` | Interne controles en preventiestrategieën komen voor, de indeling zelf niet. |
| General Security Concepts: Zero Trust | gedekt | `iam-zero-trust` | Zero Trust volgens NIST SP 800-207, met oefening op een beslislog. |
| General Security Concepts: fysieke beveiliging | deels | `social-engineering-phishing` | Alleen tailgating en baiting als social engineering. |
| General Security Concepts: change management | ontbreekt | | |
| General Security Concepts: cryptografie (symmetrisch, asymmetrisch, hashing, handtekening) | gedekt | `cryptografie`, `cijfers-kraken`, `rainbow-tables-salt` | |
| General Security Concepts: PKI en certificaatbeheer | gedekt | `tls-pki`, `cryptografie`, `casus-kluis-zonder-beheerder`, `osint-pivoting` | Keten, validatie, intrekking (OCSP, CRL), Certificate Transparency en configuratiefouten. |
| **Threats, Vulnerabilities and Mitigations**: dreigingsactoren en motieven | gedekt | `intro-cybersecurity`, `cybercrime-ecosysteem` | |
| Threats: social engineering en phishing | gedekt | `social-engineering-phishing`, `phishing-gevorderd`, `vishing-deepfake`, `ceo-fraude-simulatie`, `fraudevormen` | Sterk punt van de dojo. |
| Threats: malware en indicatoren van kwaadaardige activiteit | gedekt | `malware-analyse-basis`, `infostealers-datamarkten`, `ransomware-respons`, `botnet-takedown`, `netwerkstromen-analyse` | |
| Threats: kwetsbaarheden in webapplicaties | gedekt | `owasp-top-10`, `webhacking-sqli` | OWASP Top 10 (2025) zoals in de dojo. |
| Threats: wachtwoordaanvallen | gedekt | `wachtwoorden-authenticatie`, `wachtwoorden-kraken`, `crack-the-hash`, `rainbow-tables-salt` | |
| Threats: netwerkaanvallen (DDoS, DNS, on-path, draadloos) | deels | `botnet-ddos-economie`, `dns-datastromen` | DDoS en DNS-misbruik wel. On-path-aanvallen en draadloze aanvallen niet. |
| Threats: overige kwetsbaarheidstypen (cloud, virtualisatie, mobiel, supply chain) | deels | `cloudbeveiliging`, `linux-container-hardening`, `veilig-ontwikkelen-codereview`, `owasp-top-10`, `kwetsbaarheden-cvss` | Cloud, containers en supply chain (SBOM) nu wel. Virtualisatie en mobiel niet. |
| Threats: mitigaties (segmentatie, patchen, least privilege, hardening) | gedekt | `game-vergeten-server`, `linux-container-hardening`, `netwerkbeveiliging-wifi`, `subnetting`, `ot-ics-ransomware`, `kwetsbaarheden-cvss`, `veilig-thuis-werk` | Hardening en segmentatie met oefening, ook onder tijdsdruk in een game room. |
| **Security Architecture**: cloud, virtualisatie, containers, infrastructure as code | deels | `cloudbeveiliging`, `linux-container-hardening` | Cloud (gedeelde verantwoordelijkheid, misconfiguraties, auditlogs) en containers wel. Virtualisatie en infrastructure as code niet. |
| Security Architecture: OT, ICS en IoT | gedekt | `ot-ics-ransomware`, `botnet-ddos-economie` | |
| Security Architecture: netwerkbeveiliging (firewall, IDS/IPS, VPN, zonering) | gedekt | `netwerkbeveiliging-wifi`, `logs-detectie`, `subnetting`, `ot-ics-ransomware`, `veilig-thuis-werk` | Firewallontwerp, zonering, VLAN, VPN, IDS/IPS en 802.1X, met regelsets en logs. |
| Security Architecture: gegevensbescherming (classificatie, DLP, tokenisatie) | deels | `cryptografie`, `insider-threat`, `carding-economie` | Versleuteling gedekt. Dataclassificatie ontbreekt. |
| Security Architecture: weerbaarheid en herstel (back-ups, continuïteit, hersteldoelen) | gedekt | `bedrijfscontinuiteit-herstel`, `game-ransomware-zes-uur`, `veilig-thuis-werk`, `ransomware-respons`, `casus-kluis-zonder-beheerder` | BIA, RTO en RPO, herstelvolgorde en een tabletop, plus herstel onder druk in een game room. |
| **Security Operations**: hardening en veilige baselines | gedekt | `game-vergeten-server`, `linux-container-hardening`, `mini-ctf`, `owasp-top-10` | Linux en containers, en een game room met valkuilen. |
| Security Operations: draadloze beveiliging | gedekt | `netwerkbeveiliging-wifi`, `veilig-thuis-werk` | WPA2 en WPA3, Personal tegenover Enterprise, gastnetwerk. Geen aanvallen (bewust). |
| Security Operations: kwetsbaarheidsbeheer | gedekt | `kwetsbaarheden-cvss` | CVE, CWE, CVSS v3.1 en v4.0, EPSS, KEV. Geen scannertools, geen assetbeheer. |
| Security Operations: monitoring, logs en alerting | gedekt | `logs-detectie`, `detectie-bouwen`, `detectie-engineering`, `windows-basis` | |
| Security Operations: authenticatie (MFA, passkeys, wachtwoordbeleid) | gedekt | `wachtwoorden-authenticatie`, `simswap-aanval`, `rainbow-tables-salt` | |
| Security Operations: IAM breed (SSO, federatie, toegangsmodellen, beheer van hoge rechten) | gedekt | `iam-zero-trust` | Toegangsmodellen, levenscyclus, SSO en federatie, PAM. |
| Security Operations: e-mailbeveiliging (SPF, DKIM, DMARC) | gedekt | `email-forensics`, `ceo-fraude-simulatie` | |
| Security Operations: automatisering en orkestratie | ontbreekt | | |
| Security Operations: incident response | gedekt | `incident-response`, `ransomware-respons`, `insider-threat` | |
| Security Operations: digitale forensie en bewijs | gedekt | `bewijs-veiligstellen`, `intro-forensie` | Zie ook sectie 4. |
| **Security Program Management and Oversight**: governance (beleid, standaarden, rollen) | gedekt | `risicomanagement-frameworks`, `intro-cybersecurity`, `incident-response` | ISO/IEC 27001:2022, NIST CSF 2.0, CIS Controls v8 en de BIO. |
| Program Management: risicomanagement | gedekt | `risicomanagement-frameworks`, `intro-cybersecurity`, `kwetsbaarheden-cvss` | Risicoanalyse, register en behandelopties als oefening. |
| Program Management: leveranciers- en ketenrisico | deels | `owasp-top-10` | Alleen de softwareketen. |
| Program Management: compliance en privacy | gedekt | `privacy-wetgeving-praktijk`, `incident-response`, `veilig-thuis-werk` | AVG breed, NIS2 en de Cyberbeveiligingswet, Wwft. Zie sectie 6. |
| Program Management: audits, assessments en pentests | deels | `verkenning-scannen`, `financiele-recherche` | Fasen van een pentest en audit trail. Geen auditproces. |
| Program Management: security awareness | deels | `social-engineering-phishing`, `phishing-gevorderd`, `veilig-thuis-werk` | De dojo is zelf awareness-materiaal. Het opzetten en meten van een programma ontbreekt. |

### 1.2 CompTIA Network+ (N10-009), relevante onderdelen

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| OSI- en TCP/IP-model, encapsulatie | gedekt | `netwerken-basis` | |
| IP-adressering, subnetting, IPv6-notatie | gedekt | `subnetting` | |
| Poorten en protocollen, TCP en UDP | gedekt | `netwerken-basis`, `hoe-het-web-werkt` | |
| DNS, DHCP, ARP, NAT | gedekt | `netwerken-basis`, `hoe-het-web-werkt`, `dns-datastromen` | |
| Switching en routing (VLAN's, routeringsprotocollen) | ontbreekt | | Switch en router alleen als begrip. |
| Draadloze netwerken | gedekt | `netwerkbeveiliging-wifi`, `veilig-thuis-werk` | Zakelijke inrichting (802.1X, WPA3-Enterprise). |
| Netwerkbeveiliging (firewall, segmentatie, VPN, toegangscontrole op het netwerk) | gedekt | `netwerkbeveiliging-wifi`, `subnetting`, `logs-detectie`, `ot-ics-ransomware` |  |
| Netwerkmonitoring (flows, pakketanalyse) | gedekt | `netwerkstromen-analyse`, `netwerk-forensie`, `datastromen-exfil` | NetFlow en pcap. SNMP en beheerprotocollen niet. |
| Troubleshooting: methode en tools | deels | `netwerken-basis`, `verkenning-scannen` | Een lab en dig. Geen storingsmethodiek. |
| Cloud- en datacenternetwerken | deels | `cloudbeveiliging`, `netwerkbeveiliging-wifi` | Op hoofdlijnen. |

### 1.3 ISC2 Certified in Cybersecurity (CC)

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| **Security Principles**: CIA, authenticatie, ethiek | gedekt | `intro-cybersecurity`, `wachtwoorden-authenticatie` | De ISC2-gedragscode zelf wordt niet behandeld. |
| Security Principles: risicomanagement, maatregelen, governance | gedekt | `risicomanagement-frameworks`, `intro-cybersecurity`, `incident-response` | Zie Security+ Program Management. |
| **Business Continuity, Disaster Recovery and Incident Response Concepts**: incident response | gedekt | `incident-response`, `ransomware-respons` | |
| BC, DR en IR: bedrijfscontinuïteit en disaster recovery | gedekt | `bedrijfscontinuiteit-herstel`, `ransomware-respons`, `veilig-thuis-werk`, `casus-kluis-zonder-beheerder` | Plan, hersteldoelen, uitwijk en oefenen. |
| **Access Controls Concepts**: logische en fysieke toegang | gedekt | `iam-zero-trust`, `wachtwoorden-authenticatie`, `linux-basis`, `insider-threat` | Logische toegang volledig. Fysieke toegang alleen kort. |
| **Network Security**: netwerkbasis en dreigingen | gedekt | `netwerken-basis`, `subnetting`, `botnet-ddos-economie`, `logs-detectie` | |
| Network Security: netwerkinfrastructuur (datacenter, cloud, zonering) | deels | `netwerkbeveiliging-wifi`, `cloudbeveiliging` | Zonering wel, datacenter alleen op hoofdlijnen. |
| **Security Operations**: gegevensbeveiliging, versleuteling, logging | gedekt | `cryptografie`, `logs-detectie` | |
| Security Operations: hardening, configuratiebeheer, beleid, awareness | gedekt | `linux-container-hardening`, `risicomanagement-frameworks`, `game-vergeten-server`, `veilig-thuis-werk`, `kwetsbaarheden-cvss`, `social-engineering-phishing` | Patchen en awareness wel. Hardening, configuratiebeheer en beleid niet. |

## 2. Praktisch offensief: eJPT en de basis van PNPT/OSCP

De rijen zijn thema's, geen officiële examendoelen. eJPT (INE), PNPT (TCM Security) en OSCP (OffSec) zijn praktijkexamens op echte systemen; controleer de actuele syllabus.

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| Scope, toestemming en juridisch kader | gedekt | `verkenning-scannen`, `intro-cybersecurity`, `wachtwoorden-kraken` | Art. 138ab Sr en CVD komen in veel rooms terug. |
| Passieve verkenning en OSINT | gedekt | `verkenning-scannen`, `osint-opsporing`, `osint-pivoting` | |
| Scannen en servicedetectie (nmap) | gedekt | `verkenning-scannen`, `mini-ctf` | Gesimuleerde nmap-uitvoer. |
| Service-enumeratie (bestandsdeling, mail, beheerprotocollen) | deels | `verkenning-scannen`, `netwerken-basis` | Poorten bekend, geen enumeratie per dienst. |
| Kwetsbaarheden vinden en beoordelen | gedekt | `kwetsbaarheden-cvss` | Zonder scannertools. |
| Exploitatie van hosts (exploitframeworks, shells) | ontbreekt | | |
| Wachtwoordaanvallen | gedekt | `wachtwoorden-kraken`, `crack-the-hash`, `kraak-ctf` | Offline kraken. Online brute force alleen vanuit de detectiekant in `logs-detectie`. |
| Web: SQL-injectie, XSS, gebroken toegangscontrole (IDOR) | gedekt | `webhacking-sqli`, `owasp-top-10`, `mini-ctf` | |
| Web: overige technieken (SSRF, bestandsupload, commando-injectie, tokens, proxytooling) | deels | `owasp-top-10`, `kraak-ctf` | SSRF beschreven, JWT in één station. Geen werken met een onderscheppende proxy. |
| Privilege escalation op Linux | deels | `linux-container-hardening`, `linux-basis`, `mini-ctf` | SUID en sudo als controlepunt voor de verdediger. Escalatie als aanvalstechniek bewust niet uitgewerkt (ADR-0003). |
| Privilege escalation op Windows | ontbreekt | `active-directory-verdedigen` | Bewust uitgesteld (ADR-0003). De verdedigende kant (tiering, LAPS) staat in active-directory-verdedigen. |
| Post-exploitatie, persistentie en laterale beweging | deels | `windows-basis`, `praktijkcase-intel`, `ransomware-respons` | Alleen vanuit verdediger en analist. |
| Pivoting en tunneling tussen netwerken | ontbreekt |  | Bewust uitgesteld (ADR-0003). "Pivoten" betekent in de dojo OSINT-pivoting. |
| Active Directory-aanvallen | deels | `active-directory-verdedigen`, `windows-basis`, `kraak-ctf`, `crack-the-hash` | Alleen herkennen en detecteren (onder meer kerberoasting in 4769-logs) en hardening. Geen aanvalsketen, bewust (ADR-0003). |
| Methodiek (PTES, OWASP WSTG) | deels | `verkenning-scannen` | Fasen van een pentest. De standaarden zelf worden niet genoemd. |
| Rapporteren van bevindingen | deels | `verkenning-scannen`, `mini-ctf`, `kraak-ctf` | Van verkenning naar rapportage, write-up. Geen volledig pentestrapport met bevinding, risico en advies. |

## 3. Defensief en SOC: CySA+, BTL1 en GCIH-thema's

CompTIA CySA+ (CS0-003) kent vier domeinen: Security Operations, Vulnerability Management, Incident Response and Management, Reporting and Communication. BTL1 (Security Blue Team) behandelt security-basis, phishinganalyse, threat intelligence, digitale forensie, SIEM en incident response. GCIH (GIAC) draait om incidentafhandeling en het herkennen van aanvalstechnieken. De rijen hieronder zijn thema's over deze kaders heen; controleer de actuele syllabus.

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| Loganalyse (authenticatie, firewall, web, Windows-events) | gedekt | `logs-detectie`, `windows-basis`, `windows-artefacten`, `tijdlijnanalyse` | CySA+ Security Operations, BTL1. |
| SIEM: concept en rol in het SOC | gedekt | `logs-detectie` | |
| SIEM: zoekvragen, correlatie en dashboards in een product | gedekt | `siem-threat-hunting`, `detectie-engineering` | Zoekvragen, correlatie en het afstemmen van regels, productonafhankelijk. |
| Detectieregels (regex, Sigma, YARA), tunen en vals-positieven | gedekt | `detectie-bouwen`, `detectie-engineering` | |
| Netwerkdetectie (beaconing, exfiltratie, DNS-tunneling) | gedekt | `netwerkstromen-analyse`, `dns-datastromen`, `datastromen-exfil`, `netwerk-forensie` | |
| Phishinganalyse (headers, URL's, bijlagen, infrastructuur) | gedekt | `email-forensics`, `phishing-gevorderd`, `phishing-kit-infrastructuur` | BTL1. |
| Threat intelligence in het SOC (IOC's, TLP, ATT&CK) | gedekt | `threat-intel-attack`, `ti-modellen` | |
| Threat hunting (hypothese, jacht, vastleggen) | gedekt | `siem-threat-hunting`, `datastromen-exfil`, `netwerkstromen-analyse`, `threat-intel-attack` | Hypothesegedreven jacht met een nieuwe detectie als uitkomst. |
| Endpointdetectie (EDR, Sysmon, procesgedrag) | deels | `detectie-engineering`, `incident-response`, `memory-forensie` | Sysmon-logregels in oefeningen. Geen eigen room over endpointtelemetrie. |
| Malwaretriage | gedekt | `malware-analyse-basis` | Basisniveau. |
| Kwetsbaarheidsbeheer en prioriteren | gedekt | `kwetsbaarheden-cvss` | CySA+ Vulnerability Management. Geen scanneruitvoer. |
| Incident-levenscyclus (voorbereiden tot lessons learned) | gedekt | `incident-response`, `ransomware-respons` | NIST CSF 2.0 en de NIST-incidentfasen. |
| Aanvalstechnieken herkennen: wachtwoorden, web, scannen, phishing | gedekt | `logs-detectie`, `webhacking-sqli`, `wachtwoorden-kraken`, `verkenning-scannen` | GCIH-thema. |
| Aanvalstechnieken herkennen: post-exploitatie, laterale beweging, AD-misbruik | gedekt | `active-directory-verdedigen`, `game-nachtdienst`, `game-ochtend-erna`, `praktijkcase-intel`, `windows-basis`, `ransomware-respons` | In logs en onder tijdsdruk in game rooms. |
| Insider threat en datadiefstal | gedekt | `insider-threat`, `forensie-ctf`, `uitdaging-het-lege-bureau` | |
| Rapportage en communicatie naar belanghebbenden | gedekt | `intelligenceproducten`, `incident-response`, `logs-detectie` | CySA+ Reporting and Communication. Meetwaarden en KPI's ontbreken. |
| Cloud- en identiteitslogs | gedekt | `cloudbeveiliging`, `iam-zero-trust` |  |
| Automatisering van respons (SOAR, playbooks als code) | ontbreekt | | Playbook als document wel in `incident-response`. |
| OT/ICS-incidenten | gedekt | `ot-ics-ransomware` | |

## 4. Forensie: GCFA/CHFI-thema's en opsporingswerkwijze

GCFA (GIAC) en CHFI (EC-Council) worden hier alleen als thematische richting gebruikt; controleer de actuele syllabus.

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| Forensisch proces en beginselen | gedekt | `intro-forensie` | |
| Veiligstellen: order of volatility, write blocker, image, hashing | gedekt | `bewijs-veiligstellen`, `forensie-ctf` | Verwijst naar ISO/IEC 27037 en RFC 3227. |
| Chain of custody | gedekt | `bewijs-veiligstellen`, `forensie-ctf`, `uitdaging-gelaagde-boodschap` | |
| Schijf- en bestandssysteemforensie (NTFS, carving, slack) | gedekt | `schijf-bestandssysteem-forensie` | |
| Windows-artefacten (registry, Prefetch, event logs, USB) | gedekt | `windows-artefacten`, `windows-basis` | |
| Linux- en macOS-forensie | deels | `uitdaging-het-lege-bureau`, `linux-basis`, `schijf-bestandssysteem-forensie` | Thuismap en commandogeschiedenis. Geen systematische artefactenkaart. |
| Geheugenforensie (Volatility 3) | gedekt | `memory-forensie`, `forensie-ctf` | |
| Tijdlijnanalyse en super-timeline | gedekt | `tijdlijnanalyse`, `forensie-misleiding` | |
| Netwerkforensie (pcap) | gedekt | `netwerk-forensie`, `netwerkstromen-analyse` | |
| E-mailforensie | gedekt | `email-forensics` | |
| Mobiele forensie | gedekt | `mobiel-cloud-forensie` | |
| Cloud-forensie | deels | `cloudbeveiliging`, `mobiel-cloud-forensie` | Cloud-auditlog doorzoeken wel; acquisitie bij een provider alleen hoog-over. |
| Malware-analyse | gedekt | `malware-analyse-basis`, `reverse-engineering` | Basis. Geen geavanceerde dynamische analyse. |
| Anti-forensie en misleidende sporen | gedekt | `forensie-misleiding`, `tijdlijnanalyse` | Timestomping, valse aanwijzingen. |
| Verborgen data en steganografie | deels | `forensie-misleiding`, `decoderen-ctf` | Data achter het einde van een bestand en gelaagde codering. Geen steganografie in beeld of audio. |
| Wachtwoorden en versleutelde containers | gedekt | `wachtwoorden-kraken`, `casus-kluis-zonder-beheerder`, `casus-digitale-nalatenschap` | |
| OSINT in het onderzoek | gedekt | `osint-opsporing`, `osint-jacht`, `darkweb-vendor-osint` | |
| Financieel onderzoek en cryptosporen | gedekt | `financiele-recherche`, `follow-the-money`, `crypto-witwassen`, `fraude-in-de-cijfers` | Valt buiten GCFA/CHFI, hoort wel bij opsporing. |
| Forensisch rapport | gedekt | `bewijs-in-de-rechtszaal`, `forensie-ctf`, `tijdlijnanalyse` | |
| Bewijswaarde wegen (hypothesen, likelihood ratio, bias) | gedekt | `bewijs-in-de-rechtszaal`, `redeneren-met-kansen` | |
| Optreden als deskundige ter zitting | deels | `bewijs-in-de-rechtszaal` | Rapporteren en redeneren wel. Verhoor en verdediging van het rapport niet. |
| Opsporingswerkwijze: bevoegdheid, machtiging, proces-verbaal | gedekt | `opsporing-bevoegdheden`, `intro-forensie`, `mobiel-cloud-forensie`, `osint-jacht` | Bevoegdheden kiezen en verbaliseren als oefening. Geen juridisch advies. |

## 5. Intelligence: MITRE ATT&CK, Diamond Model, structured analytic techniques

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| MITRE ATT&CK: tactieken, technieken, procedures, mapping | gedekt | `ti-modellen`, `threat-intel-attack`, `praktijkcase-intel`, `botnet-takedown`, `cybercrime-ctf` | De dojo noemt geen ATT&CK-versie. |
| ATT&CK-dekking van detecties meten | gedekt | `detectie-engineering`, `ti-modellen` | |
| Cyber Kill Chain | gedekt | `ti-modellen`, `threat-intel-attack`, `cybercrime-arcade` | |
| Diamond Model | gedekt | `ti-modellen` | Eén room. |
| Pyramid of Pain | gedekt | `ti-modellen`, `threat-intel-attack`, `detectie-bouwen` | |
| Intelligencecyclus en vraagarticulatie | gedekt | `intelligencecyclus`, `werkblad-intel` | Het formuleren van informatiebehoeften blijft beknopt. |
| Analysis of Competing Hypotheses (ACH) | gedekt | `intelligencecyclus`, `praktijkcase-intel`, `witwassen-structurering`, `cryptomixer-onderzoek` | |
| Overige structured analytic techniques (key assumptions check, devil's advocacy, red team, scenario's) | deels | `redeneren-met-kansen`, `intelligencecyclus`, `forensie-misleiding` | Kernaannames en denkfouten wel. De andere technieken niet als eigen oefening. |
| Bronbeoordeling (Admiralty Code) | gedekt | `intelligencecyclus`, `cybercrime-ecosysteem`, `darkweb-vendor-osint` | |
| Waarschijnlijkheidstaal en betrouwbaarheidsniveau | gedekt | `intelligencecyclus`, `redeneren-met-kansen` | |
| Redeneren met kansen (Bayes, kalibratie) | gedekt | `redeneren-met-kansen` | |
| Denkfouten en bias | gedekt | `intelligencecyclus`, `bewijs-in-de-rechtszaal` | |
| Delen: TLP 2.0 en defangen | gedekt | `threat-intel-attack`, `praktijkcase-intel` | |
| Delen: uitwisselformaten en platforms (STIX/TAXII, MISP) | deels | `threat-intel-attack` | Alleen genoemd. |
| Infrastructuur-OSINT en pivoting | gedekt | `osint-pivoting`, `osint-infrastructuur`, `osint-jacht` | |
| Attributie en valse vlaggen | gedekt | `praktijkcase-intel`, `forensie-misleiding`, `darkweb-vendor-osint` | |
| Crime scripting en interventies | gedekt | `crime-scripting`, `cybercrime-ecosysteem`, `carding-economie` | |
| Intelligenceproducten (BLUF, niveaus, interventieadvies) | gedekt | `intelligenceproducten`, `werkblad-intel`, `operatie-spiegelstroom` | |

## 6. Nederlandse context

Wetgeving verandert. Controleer de actuele wettekst op wetten.overheid.nl en de status van inwerkingtreding, met name voor de Cyberbeveiligingswet (de Nederlandse omzetting van NIS2, Richtlijn (EU) 2022/2555).

| Domein / onderwerp | Status | Rooms (id's) | Opmerking |
|---|---|---|---|
| Computervredebreuk (art. 138ab Sr), ethiek en CVD | gedekt | `intro-cybersecurity`, `verkenning-scannen`, `webhacking-sqli`, `kwetsbaarheden-cvss` | Komt in bijna elke offensieve room terug. |
| Wet computercriminaliteit III (in werking sinds 2019), waaronder de hackbevoegdheid (art. 126nba Sv) | gedekt | `opsporing-bevoegdheden`, `intro-forensie`, `cybercrime-ctf` | Alleen genoemd. Geen uitleg van wat de wet wijzigde. |
| Opsporingsbevoegdheden uit Strafvordering (stelselmatig informatie inwinnen, vorderen van gegevens, rol van de rechter-commissaris) | gedekt | `opsporing-bevoegdheden`, `intro-forensie`, `osint-jacht`, `osint-pivoting`, `mobiel-cloud-forensie` | Grenzen bij OSINT wel. Geen overzicht van bevoegdheden. |
| Wet politiegegevens (Wpg) | deels | `osint-infrastructuur`, `osint-pivoting`, `darkweb-vendor-osint` | Genoemd als kader bij OSINT. |
| AVG: meldplicht datalek | gedekt | `incident-response`, `ransomware-respons` | Melden binnen 72 uur bij de Autoriteit Persoonsgegevens. |
| AVG breed: grondslagen, rechten van betrokkenen, DPIA, verwerkers | gedekt | `privacy-wetgeving-praktijk`, `veilig-thuis-werk`, `osint-opsporing`, `incident-response` | Grondslagen, rechten van betrokkenen, DPIA en verwerkers, in casussen. |
| NIS2 / Cyberbeveiligingswet: meldplicht bij incidenten | gedekt | `privacy-wetgeving-praktijk`, `incident-response` |  |
| NIS2 / Cyberbeveiligingswet: reikwijdte, zorgplicht, bestuur en toezicht | gedekt | `privacy-wetgeving-praktijk`, `incident-response`, `intro-cybersecurity`, `kwetsbaarheden-cvss` | Reikwijdte en meldplicht; de zorgplicht kort. Controleer de actuele status van de Cyberbeveiligingswet. |
| Wwft: meldplicht ongebruikelijke transacties, FIU-Nederland, structurering | gedekt | `witwassen-structurering`, `follow-the-money`, `cryptomixer-onderzoek` | |
| Wwft: cliëntenonderzoek en de rol van meldplichtige instellingen | gedekt | `privacy-wetgeving-praktijk`, `witwassen-structurering`, `follow-the-money`, `crypto-witwassen` | KYC bij exchanges wel. Het cliëntenonderzoek zelf niet. |
| Witwassen in het strafrecht (art. 420bis Sr) en geldezels | gedekt | `money-mule-ronseling`, `witwassen-structurering` | |
| Fraudevormen in Nederland (helpdeskfraude, CEO-fraude, marktplaatsfraude) | gedekt | `fraudevormen`, `bank-helpdeskfraude`, `ceo-fraude-simulatie` | |
| Ketenpartners (politie, OM, NFI, FIU-Nederland, NCSC, Fraudehelpdesk) | gedekt | `intro-forensie`, `botnet-takedown`, `threat-intel-attack` | |
| Internationale samenwerking (rechtshulp, Europol, Cybercrimeverdrag) | deels | `mobiel-cloud-forensie`, `botnet-takedown` | Rechtshulpverzoek en takedown hoog-over. Het verdrag wordt niet genoemd. |
| Digitaal bewijs in het Nederlandse strafproces | gedekt | `bewijs-in-de-rechtszaal`, `intro-forensie` | |
| Overige EU-regels (DORA, Cyber Resilience Act, AI-verordening) | ontbreekt | | |
| Normenkaders in Nederland (ISO/IEC 27001, BIO voor de overheid) | gedekt | `risicomanagement-frameworks`, `intro-cybersecurity`, `casus-kluis-zonder-beheerder` | ISO/IEC 27001:2022 en de BIO (controleer de actuele versie). |
| HBO-ICT: netwerken, besturingssystemen, cryptografie | gedekt | `netwerken-basis`, `subnetting`, `linux-basis`, `windows-basis`, `cryptografie` | |
| HBO-ICT: scripting en programmeren voor security | deels | `linux-basis`, `windows-basis`, `detectie-engineering` | Shell, PowerShell en regex. Geen programmeertaal. |
| HBO-ICT: veilige softwareontwikkeling | gedekt | `veilig-ontwikkelen-codereview` | SDLC, STRIDE, code-review, SCA en SBOM. |
| HBO-ICT: security-architectuur en cloud | deels | `cloudbeveiliging`, `iam-zero-trust`, `netwerkbeveiliging-wifi` |  |
| HBO-ICT: onderzoeks- en rapportagevaardigheden | gedekt | `intelligenceproducten`, `werkblad-intel`, `bewijs-in-de-rechtszaal` | |

## Grootste gaten

Geprioriteerd op het aantal kaders dat het raakt en op hoe weinig er nu staat. Elk punt verdient een eigen nieuwe room.

1. **Identiteits- en toegangsbeheer en Zero Trust.** Toegangsmodellen, SSO en federatie, beheer van hoge rechten en Zero Trust ontbreken volledig. Raakt Security+, ISC2 CC, CySA+ en HBO-ICT.
2. **Cloudbeveiliging.** Gedeelde verantwoordelijkheid, cloud-identiteit, misconfiguraties en cloudlogs komen nergens aan bod. Raakt Security+, Network+, ISC2 CC, CySA+, GCIH, GCFA en HBO-ICT.
3. **Risicomanagement en frameworks (ISO/IEC 27001, NIST CSF 2.0, CIS Controls).** Risico bestaat alleen als begrip; er is geen risicoanalyse, register of ISMS. Raakt Security+, ISC2 CC en HBO-ICT.
4. **Active Directory: aanvallen en verdediging.** Alleen AD-basis en NTLM-hashes; de aanvalsketen en de bijbehorende detectie ontbreken. Raakt PNPT, OSCP, GCIH, CySA+ en GCFA.
5. **Privilege escalation op Linux en Windows.** SUID en sudo zijn begrippen, Windows-escalatie ontbreekt. Raakt eJPT, PNPT, OSCP en GCIH.
6. **Pivoting, tunneling en laterale beweging.** De netwerktechnische betekenis van pivoting ontbreekt en is in de dojo verwarrend met OSINT-pivoting. Raakt eJPT, PNPT, OSCP en GCIH.
7. **SIEM in de praktijk en threat hunting.** Er is geen oefening met zoekvragen, correlatie of een hypothesegedreven jacht. Raakt BTL1, CySA+, GCIH en het werk van een SOC-analist.
8. **Privacy en wetgeving voor de praktijk (AVG breed, NIS2/Cyberbeveiligingswet, Wwft-cliëntenonderzoek).** Alleen de meldplichten zijn uitgewerkt. Raakt Security+, ISC2 CC, HBO-ICT en de Nederlandse context.
9. **Opsporingsbevoegdheden en Wet computercriminaliteit III.** Bevoegdheden worden genoemd maar niet uitgelegd of geoefend, en verbaliseren ontbreekt. Raakt de digitaal rechercheur en de forensische opsporingswerkwijze.
10. **Pentest-methodiek en rapportage (PTES, OWASP WSTG).** Er is geen room over scope, werkwijze en een volledig rapport met bevinding, risico en advies. Raakt eJPT, PNPT, OSCP en HBO-ICT.
11. **Netwerkbeveiliging en draadloos (firewallontwerp, zonering, VLAN's, VPN, zakelijke wifi).** Alleen begrippen en thuisadvies. Raakt Security+, Network+ en ISC2 CC.
12. **Hardening van Linux en containers.** Hardening wordt alleen genoemd; containers komen niet voor. Raakt Security+, CySA+, ISC2 CC en HBO-ICT.
13. **Veilige softwareontwikkeling en code-review.** De dojo toont kwetsbaarheden, niet hoe je ze in ontwikkeling en review voorkomt. Raakt Security+, HBO-ICT en de webonderdelen van eJPT.
14. **TLS en PKI in detail.** Certificaatketen, intrekking, sleutelbeheer en veelgemaakte configuratiefouten ontbreken. Raakt Security+, Network+ en ISC2 CC.
15. **Bedrijfscontinuïteit en disaster recovery.** Back-ups zijn gedekt, continuïteitsplanning en hersteldoelen niet. Raakt Security+ en ISC2 CC.

Kleinere gaten die bij een bestaande room kunnen: webtechnieken buiten SQLi, XSS en IDOR (bij `webhacking-sqli`), exploitatie van hosts (samen met punt 5), overige structured analytic techniques (bij `intelligencecyclus`), uitwisselformaten voor threat intelligence (bij `threat-intel-attack`), endpointtelemetrie (bij `detectie-engineering`) en Linux- en macOS-forensie (bij `schijf-bestandssysteem-forensie`).

## Stand na de ronde van november 2026

Per groot gat hierboven: wat er nu staat.

| Gat | Stand | Rooms |
|---|---|---|
| 1. IAM en Zero Trust | gedicht | `iam-zero-trust` |
| 2. Cloudbeveiliging | gedicht | `cloudbeveiliging` |
| 3. Risicomanagement en frameworks | gedicht | `risicomanagement-frameworks` |
| 4. Active Directory | deels: alleen verdedigen | `active-directory-verdedigen` |
| 5. Privilege escalation | bewust uitgesteld | zie ADR-0003; controlepunten in `linux-container-hardening` |
| 6. Pivoting en tunneling | bewust uitgesteld | zie ADR-0003 |
| 7. SIEM en threat hunting | gedicht | `siem-threat-hunting` |
| 8. Privacy en wetgeving | gedicht | `privacy-wetgeving-praktijk` |
| 9. Opsporingsbevoegdheden en Wet computercriminaliteit III | gedicht | `opsporing-bevoegdheden` |
| 10. Pentest-methodiek en rapportage | open | nog geen eigen room |
| 11. Netwerkbeveiliging en draadloos | gedicht | `netwerkbeveiliging-wifi` |
| 12. Hardening van Linux en containers | gedicht | `linux-container-hardening`, `game-vergeten-server` |
| 13. Veilige softwareontwikkeling en code-review | gedicht | `veilig-ontwikkelen-codereview` |
| 14. TLS en PKI | gedicht | `tls-pki` |
| 15. Bedrijfscontinuïteit en disaster recovery | gedicht | `bedrijfscontinuiteit-herstel` |

Daarnaast zijn er vijf verdedigende game rooms (pad `gamerooms`) die incident response, phishing, ransomware,
hardening en persistentie onder tijdsdruk laten oefenen, en achttien uitdagingen zonder handleiding.

**Bewust uitgesteld.** Aanvalstechnieken als rechten verhogen, pivoteren en een Active Directory-aanvalsketen zijn in
deze ronde niet uitgewerkt (zie [ADR-0003](adr/0003-game-rooms-zijn-verdedigend.md)). Voor eJPT, PNPT en OSCP betekent
dat: de dojo dekt verkenning, web en hashes, maar niet de praktijk van het binnendringen en doorbewegen. Oefen dat op een
platform dat daarvoor gemaakt is, binnen de regels ervan.
