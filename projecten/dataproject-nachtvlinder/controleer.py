#!/usr/bin/env python3
"""
Kijkt je antwoorden van Operatie Nachtvlinder na.

Vul antwoorden.txt in (één regel per vraag, bijvoorbeeld "Q4: spinner") en draai:
    python controleer.py

De goede antwoorden staan hier alleen als vingerafdruk (hash), zodat je ze niet
per ongeluk leest. Hoofdletters, spaties, een euroteken en een komma als
decimaalteken maken niet uit; "17" en "17,0" tellen als hetzelfde getal.
"""
import hashlib
import re
import sys
from pathlib import Path

VINGERAFDRUK = {
    'Q1': '8048f5fd9bda7568',
    'Q2': '8d168e588585854d',
    'Q3': '7ca2bd2a5e6b2bac',
    'Q4': '0c2c9b1fe06db4d8',
    'Q5': '578ef2fb26957458',
    'Q6': '6fae77f0bec32dd5',
    'Q7': '332fb305063c548c',
    'Q8': '8290c790edf209c4',
    'Q9': 'acad8985c4f2bfb9',
    'Q10': '4e06b11517ac27a1',
    'Q11': 'c851b31f554a030a',
    'Q12': '8ece9317b48c0365',
    'Q13': 'c66b272af87f8dcd',
    'Q14': 'c22a16eccd97b51e',
    'Q15': 'a92252882abc9a43',
    'Q16': '408a9232dbcdb73e',
    'Q17': '7df6f00004078f7e',
}

TIP = {
    'Q1': 'Tel rijen die exact gelijk zijn aan een eerdere rij: df.duplicated().sum().',
    'Q2': 'Normaliseer tijd (naar UTC), operator en doelbank, laat de kolommen tijd en server weg en ontdubbel dan pas.',
    'Q3': 'Zoek alle waarden die zonder hoofdletters en spaties "nederbank" zijn, en tel de verschillende ruwe schrijfwijzen.',
    'Q4': 'Tel ná het opschonen; " Spinner" en "spinner" zijn dezelfde operator.',
    'Q5': 'JOIN de unieke IP-adressen uit de logins op ioc_ip in meldingen en tel DISTINCT team.',
    'Q6': 'Zelfde query als Q5: het aantal verschillende teams.',
    'Q7': 'Filter op soort en contact_id, tel DISTINCT team.',
    'Q8': 'Resample de opgeschoonde logins per uur (UTC) en zoek het maximum.',
    'Q9': 'Reken het piekuur om naar Europe/Amsterdam. Let op: zomer- of wintertijd op die datum?',
    'Q10': 'Groepeer meldingen per datum.',
    'Q11': 'De mediaan van het aantal meldingen per dag, niet het gemiddelde.',
    'Q12': 'Tel alle berichten per persoon, verzonden én ontvangen.',
    'Q13': 'Bouw een ongerichte graaf en gebruik nx.betweenness_centrality.',
    'Q14': 'Het aantal verschillende contacten (degree zonder gewicht).',
    'Q15': 'Alleen betalingen van bc1q-slo-*; tel per ontvanger het aantal unieke afzenders.',
    'Q16': 'Hoeveel slachtofferwallets komen meer dan één keer voor als afzender?',
    'Q17': 'Som van bedrag_eur naar exch-hot-noordwind, op twee decimalen.',
}


def norm(s):
    s = s.strip().lower().replace('€', '').replace(' ', '')
    if ',' in s and '.' in s:
        s = s.replace('.', '').replace(',', '.')
    elif re.fullmatch(r'-?\d+,\d+', s):
        s = s.replace(',', '.')
    if re.fullmatch(r'-?\d+(\.\d+)?', s):
        s = ('%.2f' % float(s)).rstrip('0').rstrip('.')
    return s


def afdruk(vraag, antwoord):
    return hashlib.sha256(('nachtvlinder:' + vraag + ':' + norm(antwoord)).encode()).hexdigest()[:16]


def main():
    bestand = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / 'antwoorden.txt')
    gegeven = {}
    for regel in bestand.read_text(encoding='utf-8').splitlines():
        m = re.match(r'\s*(Q\d+)\s*[:=]\s*(.*)$', regel, re.I)
        if m and m.group(2).strip():
            gegeven[m.group(1).upper()] = m.group(2)
    goed = 0
    for vraag in VINGERAFDRUK:
        if vraag not in gegeven:
            print(f'  ·  {vraag}  nog leeg')
        elif afdruk(vraag, gegeven[vraag]) == VINGERAFDRUK[vraag]:
            goed += 1
            print(f'  ✓  {vraag}  {gegeven[vraag].strip()}')
        else:
            print(f'  ✗  {vraag}  {gegeven[vraag].strip()}   tip: {TIP[vraag]}')
    print(f'\n{goed} van {len(VINGERAFDRUK)} goed.')
    if goed == len(VINGERAFDRUK):
        print('Alles goed. Schrijf nu je notitie (stap 6) en vergelijk die met uitwerking/notitie-voorbeeld.md.')


if __name__ == '__main__':
    main()
