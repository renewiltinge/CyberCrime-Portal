#!/usr/bin/env python3
"""Eenmalige bijwerking van docs/dekking-certificeringen.md na de ronde van november 2026.

Werkt rijen bij op basis van hun eerste cel: nieuwe status, extra rooms (alleen als het
roombestand bestaat) en een nieuwe opmerking. Voegt onderaan de stand per groot gat toe.
Draai vanuit de root van de repository:  python3 tools/matrix-update-2026-11.py
"""
import os
import re

P = 'docs/dekking-certificeringen.md'
ROOMS = 'content/rooms'
exists = lambda r: os.path.exists(os.path.join(ROOMS, r + '.js'))

# eerste cel (begin) -> (status, nieuwe rooms, opmerking)
UPD = [
    ('General Security Concepts: Zero Trust', 'gedekt', ['iam-zero-trust'], 'Zero Trust volgens NIST SP 800-207, met oefening op een beslislog.'),
    ('General Security Concepts: PKI en certificaatbeheer', 'gedekt', ['tls-pki'], 'Keten, validatie, intrekking (OCSP, CRL), Certificate Transparency en configuratiefouten.'),
    ('Threats: overige kwetsbaarheidstypen', 'deels', ['cloudbeveiliging', 'linux-container-hardening', 'veilig-ontwikkelen-codereview'], 'Cloud, containers en supply chain (SBOM) nu wel. Virtualisatie en mobiel niet.'),
    ('Threats: mitigaties', 'gedekt', ['game-vergeten-server', 'linux-container-hardening', 'netwerkbeveiliging-wifi'], 'Hardening en segmentatie met oefening, ook onder tijdsdruk in een game room.'),
    ('**Security Architecture**: cloud, virtualisatie, containers', 'deels', ['cloudbeveiliging', 'linux-container-hardening'], 'Cloud (gedeelde verantwoordelijkheid, misconfiguraties, auditlogs) en containers wel. Virtualisatie en infrastructure as code niet.'),
    ('Security Architecture: netwerkbeveiliging', 'gedekt', ['netwerkbeveiliging-wifi'], 'Firewallontwerp, zonering, VLAN, VPN, IDS/IPS en 802.1X, met regelsets en logs.'),
    ('Security Architecture: weerbaarheid en herstel', 'gedekt', ['bedrijfscontinuiteit-herstel', 'game-ransomware-zes-uur'], 'BIA, RTO en RPO, herstelvolgorde en een tabletop, plus herstel onder druk in een game room.'),
    ('**Security Operations**: hardening en veilige baselines', 'gedekt', ['game-vergeten-server', 'linux-container-hardening'], 'Linux en containers, en een game room met valkuilen.'),
    ('Security Operations: draadloze beveiliging', 'gedekt', ['netwerkbeveiliging-wifi'], 'WPA2 en WPA3, Personal tegenover Enterprise, gastnetwerk. Geen aanvallen (bewust).'),
    ('Security Operations: IAM breed', 'gedekt', ['iam-zero-trust'], 'Toegangsmodellen, levenscyclus, SSO en federatie, PAM.'),
    ('**Security Program Management and Oversight**: governance', 'gedekt', ['risicomanagement-frameworks'], 'ISO/IEC 27001:2022, NIST CSF 2.0, CIS Controls v8 en de BIO.'),
    ('Program Management: risicomanagement', 'gedekt', ['risicomanagement-frameworks'], 'Risicoanalyse, register en behandelopties als oefening.'),
    ('Program Management: compliance en privacy', 'gedekt', ['privacy-wetgeving-praktijk'], 'AVG breed, NIS2 en de Cyberbeveiligingswet, Wwft. Zie sectie 6.'),
    ('Draadloze netwerken', 'gedekt', ['netwerkbeveiliging-wifi'], 'Zakelijke inrichting (802.1X, WPA3-Enterprise).'),
    ('Netwerkbeveiliging (firewall, segmentatie, VPN', 'gedekt', ['netwerkbeveiliging-wifi'], ''),
    ('Cloud- en datacenternetwerken', 'deels', ['cloudbeveiliging', 'netwerkbeveiliging-wifi'], 'Op hoofdlijnen.'),
    ('Security Principles: risicomanagement', 'gedekt', ['risicomanagement-frameworks'], ''),
    ('BC, DR en IR: bedrijfscontinuïteit en disaster recovery', 'gedekt', ['bedrijfscontinuiteit-herstel'], 'Plan, hersteldoelen, uitwijk en oefenen.'),
    ('**Access Controls Concepts**: logische en fysieke toegang', 'gedekt', ['iam-zero-trust'], 'Logische toegang volledig. Fysieke toegang alleen kort.'),
    ('Network Security: netwerkinfrastructuur', 'deels', ['netwerkbeveiliging-wifi', 'cloudbeveiliging'], 'Zonering wel, datacenter alleen op hoofdlijnen.'),
    ('Security Operations: hardening, configuratiebeheer, beleid, awareness', 'gedekt', ['linux-container-hardening', 'risicomanagement-frameworks', 'game-vergeten-server'], ''),
    ('Privilege escalation op Linux', 'deels', ['linux-container-hardening'], 'SUID en sudo als controlepunt voor de verdediger. Escalatie als aanvalstechniek bewust niet uitgewerkt (ADR-0003).'),
    ('Privilege escalation op Windows', 'ontbreekt', ['active-directory-verdedigen'], 'Bewust uitgesteld (ADR-0003). De verdedigende kant (tiering, LAPS) staat in active-directory-verdedigen.'),
    ('Pivoting en tunneling tussen netwerken', 'ontbreekt', [], 'Bewust uitgesteld (ADR-0003). "Pivoten" betekent in de dojo OSINT-pivoting.'),
    ('Active Directory-aanvallen', 'deels', ['active-directory-verdedigen'], 'Alleen herkennen en detecteren (onder meer kerberoasting in 4769-logs) en hardening. Geen aanvalsketen, bewust (ADR-0003).'),
    ('SIEM: zoekvragen, correlatie en dashboards', 'gedekt', ['siem-threat-hunting'], 'Zoekvragen, correlatie en het afstemmen van regels, productonafhankelijk.'),
    ('Threat hunting (hypothese, jacht, vastleggen)', 'gedekt', ['siem-threat-hunting'], 'Hypothesegedreven jacht met een nieuwe detectie als uitkomst.'),
    ('Aanvalstechnieken herkennen: post-exploitatie', 'gedekt', ['active-directory-verdedigen', 'game-nachtdienst', 'game-ochtend-erna'], 'In logs en onder tijdsdruk in game rooms.'),
    ('Cloud- en identiteitslogs', 'gedekt', ['cloudbeveiliging', 'iam-zero-trust'], ''),
    ('Cloud-forensie', 'deels', ['cloudbeveiliging'], 'Cloud-auditlog doorzoeken wel; acquisitie bij een provider alleen hoog-over.'),
    ('Opsporingswerkwijze: bevoegdheid, machtiging, proces-verbaal', 'gedekt', ['opsporing-bevoegdheden'], 'Bevoegdheden kiezen en verbaliseren als oefening. Geen juridisch advies.'),
    ('Wet computercriminaliteit III', 'gedekt', ['opsporing-bevoegdheden'], ''),
    ('Opsporingsbevoegdheden uit Strafvordering', 'gedekt', ['opsporing-bevoegdheden'], ''),
    ('AVG breed: grondslagen', 'gedekt', ['privacy-wetgeving-praktijk'], 'Grondslagen, rechten van betrokkenen, DPIA en verwerkers, in casussen.'),
    ('NIS2 / Cyberbeveiligingswet', 'gedekt', ['privacy-wetgeving-praktijk'], 'Reikwijdte en meldplicht; de zorgplicht kort. Controleer de actuele status van de Cyberbeveiligingswet.'),
    ('Wwft: cliëntenonderzoek', 'gedekt', ['privacy-wetgeving-praktijk'], ''),
    ('Normenkaders in Nederland', 'gedekt', ['risicomanagement-frameworks'], 'ISO/IEC 27001:2022 en de BIO (controleer de actuele versie).'),
    ('HBO-ICT: veilige softwareontwikkeling', 'gedekt', ['veilig-ontwikkelen-codereview'], 'SDLC, STRIDE, code-review, SCA en SBOM.'),
    ('HBO-ICT: security-architectuur en cloud', 'deels', ['cloudbeveiliging', 'iam-zero-trust', 'netwerkbeveiliging-wifi'], ''),
]

GAPS = """
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
| 12. Hardening van Linux en containers | {g12} | {r12} |
| 13. Veilige softwareontwikkeling en code-review | gedicht | `veilig-ontwikkelen-codereview` |
| 14. TLS en PKI | gedicht | `tls-pki` |
| 15. Bedrijfscontinuïteit en disaster recovery | {g15} | {r15} |

Daarnaast zijn er vijf verdedigende game rooms (pad `gamerooms`) die incident response, phishing, ransomware,
hardening en persistentie onder tijdsdruk laten oefenen, en achttien uitdagingen zonder handleiding.

**Bewust uitgesteld.** Aanvalstechnieken als rechten verhogen, pivoteren en een Active Directory-aanvalsketen zijn in
deze ronde niet uitgewerkt (zie [ADR-0003](adr/0003-game-rooms-zijn-verdedigend.md)). Voor eJPT, PNPT en OSCP betekent
dat: de dojo dekt verkenning, web en hashes, maar niet de praktijk van het binnendringen en doorbewegen. Oefen dat op een
platform dat daarvoor gemaakt is, binnen de regels ervan.
"""


def main():
    s = open(P, encoding='utf8').read()
    n = 0
    lines = s.split('\n')
    for i, line in enumerate(lines):
        if not line.startswith('| ') or line.startswith('|---'):
            continue
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if len(cells) != 4:
            continue
        for key, status, rooms, note in UPD:
            if cells[0].startswith(key):
                have = re.findall(r'`([^`]+)`', cells[2])
                add = [r for r in rooms if exists(r) and r not in have]
                cells[2] = ', '.join('`' + r + '`' for r in add + have)
                if status == 'gedekt' and not any(exists(r) for r in rooms):
                    break  # room ontbreekt nog: status niet ophogen
                cells[1] = status
                if note:
                    cells[3] = note
                lines[i] = '| ' + ' | '.join(cells) + ' |'
                n += 1
                break
    s = '\n'.join(lines)
    total = len([f for f in os.listdir(ROOMS) if f.endswith('.js')])
    s = re.sub(r'Laatst gecontroleerd op [0-9-]+, tegen \d+ rooms', 'Laatst gecontroleerd op 2026-11-12, tegen ' + str(total) + ' rooms', s)
    lc, bc = exists('linux-container-hardening'), exists('bedrijfscontinuiteit-herstel')
    s = s.rstrip('\n') + '\n' + GAPS.format(
        g12='gedicht' if lc else 'deels', r12='`linux-container-hardening`, `game-vergeten-server`' if lc else '`game-vergeten-server`',
        g15='gedicht' if bc else 'open', r15='`bedrijfscontinuiteit-herstel`' if bc else 'nog geen eigen room')
    open(P, 'w', encoding='utf8').write(s)
    print('rijen bijgewerkt:', n, 'van', len(UPD), '· rooms:', total)


if __name__ == '__main__':
    main()
