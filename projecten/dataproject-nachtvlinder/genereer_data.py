#!/usr/bin/env python3
"""
Genereert de fictieve dataset van Operatie Nachtvlinder.

Alles is verzonnen: aliassen, wallets, organisaties. IP-adressen komen uit de
documentatiebereiken (RFC 5737), domeinen eindigen op .example.

De data in data/ staat al in de repository; je hoeft dit script niet te draaien.
Doe je het toch, dan krijg je exact dezelfde bestanden (vaste seed).

Gebruik:  python genereer_data.py
"""
import csv
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

SEED = 20261019
AMS = ZoneInfo("Europe/Amsterdam")
UIT = Path(__file__).parent / "data"
START = datetime(2026, 10, 12, tzinfo=timezone.utc)
DAGEN = 20  # 12 t/m 31 oktober 2026 (over de overgang naar wintertijd op 25 oktober)

rnd = random.Random(SEED)


def schrijf(naam, kop, rijen):
    UIT.mkdir(exist_ok=True)
    with open(UIT / naam, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(kop)
        w.writerows(rijen)


def willekeurig_moment(dag, uur=None):
    t = START + timedelta(days=dag)
    h = uur if uur is not None else rnd.choices(range(24), weights=[1, 1, 1, 1, 1, 2, 4, 6, 7, 7, 6, 6, 5, 6, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1])[0]
    return t + timedelta(hours=h, minutes=rnd.randrange(60), seconds=rnd.randrange(60))


# ---------------------------------------------------------------------------
# 1. Logins op het phishingpanel (twee servers, twee tijdnotaties)
# ---------------------------------------------------------------------------
OPERATORS = {  # alias -> (gewicht, schrijfvarianten)
    "spinner": (34, ["spinner", "Spinner", "spinner "]),
    "motte": (27, ["motte", "MOTTE"]),
    "lantaarn": (21, ["lantaarn", "Lantaarn"]),
    "dwaallicht": (12, ["dwaallicht"]),
    "kever": (6, ["kever"]),
}
BANKEN = {  # canonieke naam -> (gewicht, schrijfvarianten)
    "NederBank": (50, ["NederBank", "nederbank", "Neder Bank", "NEDERBANK"]),
    "Polderbank": (30, ["Polderbank", "polderbank"]),
    "Duinkrediet": (20, ["Duinkrediet"]),
}
OPERATOR_IPS = {
    "spinner": ["203.0.113.77", "198.51.100.14"],
    "motte": ["203.0.113.21", "198.51.100.30"],
    "lantaarn": ["192.0.2.45", "203.0.113.90"],
    "dwaallicht": ["192.0.2.88"],
    "kever": ["198.51.100.61"],
}


def stempel(t_utc, server):
    """Server A schrijft UTC met Z, server B lokale tijd met offset."""
    if server == "A":
        return t_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    return t_utc.astimezone(AMS).isoformat(timespec="seconds")


logins = []
for dag in range(DAGEN):
    for _ in range(rnd.randint(95, 125)):
        logins.append(willekeurig_moment(dag))
# De campagne: een piek op 20 oktober tussen 07:00 en 08:00 UTC.
for _ in range(140):
    logins.append(START + timedelta(days=8, hours=7, minutes=rnd.randrange(60), seconds=rnd.randrange(60)))

panel = []
for t in sorted(logins):
    alias = rnd.choices(list(OPERATORS), weights=[v[0] for v in OPERATORS.values()])[0]
    bank = rnd.choices(list(BANKEN), weights=[v[0] for v in BANKEN.values()])[0]
    server = rnd.choice("AB")
    panel.append([
        stempel(t, server),
        server,
        rnd.choice(OPERATORS[alias][1]),
        rnd.choice(OPERATOR_IPS[alias]),
        rnd.choice(BANKEN[bank][1]),
        rnd.choices(["inlog", "buit_bekeken", "export"], weights=[70, 22, 8])[0],
    ])
# Een deel van de export is twee keer aangeleverd: exacte dubbelingen.
dubbel = rnd.sample(panel, 97)
panel.extend(dubbel)
# En een deel staat op beide servers: dezelfde gebeurtenis, andere notatie.
gespiegeld = []
for r in rnd.sample([r for r in panel if r[1] == "A"], 43):
    t = datetime.strptime(r[0], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
    gespiegeld.append([stempel(t, "B"), "B"] + r[2:])
panel.extend(gespiegeld)
rnd.shuffle(panel)
schrijf("panel_logins.csv", ["tijd", "server", "operator", "ip", "doelbank", "actie"], panel)

# ---------------------------------------------------------------------------
# 2. Meldingen van incidenten door vijf teams
# ---------------------------------------------------------------------------
TEAMS = ["Basisteam Duinstreek", "Basisteam Veenhaven", "Districtsrecherche Kust", "Team Cybercrime", "Basisteam Molenwaard"]
SECTOREN = ["mkb", "zorg", "onderwijs", "particulier", "gemeente"]
ruis_ips = ["192.0.2.%d" % i for i in range(100, 140)] + ["198.51.100.%d" % i for i in range(150, 190)]
meldingen = []
nr = 1
for dag in range(DAGEN):
    n = 60 if dag == 9 else rnd.randint(12, 20)  # 21 oktober: de golf aangiftes na de campagne
    for _ in range(n):
        soort = rnd.choices(["phishing", "ransomware", "ddos", "helpdeskfraude"], weights=[55, 10, 15, 20])[0]
        meldingen.append({
            "melding_id": "M-%04d" % nr,
            "datum": (START + timedelta(days=dag)).date().isoformat(),
            "team": rnd.choice(TEAMS),
            "soort": soort,
            "sector": rnd.choice(SECTOREN),
            "schade_eur": rnd.choice([0, 0, 150, 400, 850, 1200, 2500, 4800, 9800]),
            "ioc_ip": rnd.choice(ruis_ips),
            "contact_id": "",
        })
        nr += 1
# Geplante sporen: het panel-IP van spinner bij vier teams, een ander panel-IP bij twee.
def plant(n, teams, **velden):
    kandidaten = [m for m in meldingen if m["team"] in teams and m["contact_id"] == "" and m["ioc_ip"] in ruis_ips]
    for m in rnd.sample(kandidaten, n):
        m.update(velden)

plant(9, TEAMS[:4], ioc_ip="203.0.113.77")
plant(4, TEAMS[3:5], ioc_ip="192.0.2.45")
# Ransomware met hetzelfde contact-ID bij drie teams; een ander ID bij één team.
for teams, cid, n in [(["Basisteam Veenhaven", "Districtsrecherche Kust", "Team Cybercrime"], "tox-7F3A9C", 6), (["Basisteam Duinstreek"], "tox-21BB04", 2)]:
    kand = [m for m in meldingen if m["team"] in teams and m["soort"] == "ransomware" and not m["contact_id"]]
    gekozen = []
    for t in teams:  # elk team minstens één keer
        gekozen.append(rnd.choice([m for m in kand if m["team"] == t and m not in gekozen]))
    rest = [m for m in kand if m not in gekozen]
    gekozen += rnd.sample(rest, n - len(gekozen))
    for m in gekozen:
        m["contact_id"] = cid
schrijf("meldingen.csv", list(meldingen[0]), [list(m.values()) for m in meldingen])

# ---------------------------------------------------------------------------
# 3. Berichten tussen verdachten (twee groepen en één schakel)
# ---------------------------------------------------------------------------
WERVING = ["spinner", "motte", "lantaarn", "dwaallicht", "kever", "rups"]
TECHNIEK = ["sluiswachter", "bunkerbaas", "crypterkoning", "ijzerman", "kabelaar", "stroomloper"]
SCHAKEL = "nachtvlinder"
berichten = []


def bericht(van, naar):
    t = willekeurig_moment(rnd.randrange(DAGEN))
    berichten.append([t.strftime("%Y-%m-%dT%H:%M:%SZ"), van, naar, rnd.choice(["Telegram", "Session", "Threema"])])


for groep, hub in [(WERVING, "spinner"), (TECHNIEK, "bunkerbaas")]:
    for a in groep:
        for b in groep:
            if a != b and rnd.random() < 0.45:
                for _ in range(rnd.randint(2, 9)):
                    bericht(a, b)
    for a in groep:  # de hub praat met iedereen in zijn groep, veel
        if a != hub:
            for _ in range(rnd.randint(10, 18)):
                bericht(hub, a) if rnd.random() < 0.5 else bericht(a, hub)
# De schakel: weinig berichten, maar de enige verbinding tussen beide groepen.
for a, n in [("spinner", 4), ("lantaarn", 2), ("bunkerbaas", 5), ("crypterkoning", 3)]:
    for _ in range(n):
        bericht(SCHAKEL, a) if rnd.random() < 0.5 else bericht(a, SCHAKEL)
berichten.sort()
schrijf("berichten.csv", ["tijd_utc", "van", "naar", "kanaal"], berichten)

# ---------------------------------------------------------------------------
# 4. Cryptobetalingen: van slachtoffers via verzamelwallets naar een exchange
# ---------------------------------------------------------------------------
tx = []
txnr = 1


def betaling(van, naar, bedrag, t):
    global txnr
    tx.append(["tx-%05d" % txnr, t.strftime("%Y-%m-%dT%H:%M:%SZ"), van, naar, "%.2f" % bedrag])
    txnr += 1


VERZAMEL = {"bc1q-verz-01": 61, "bc1q-verz-02": 34, "bc1q-verz-03": 22}
ontvangen = {w: 0.0 for w in VERZAMEL}
slachtoffer = 1
for wallet, n in VERZAMEL.items():
    for _ in range(n):
        bedrag = round(rnd.uniform(180, 4200), 2)
        betaling("bc1q-slo-%03d" % slachtoffer, wallet, bedrag, willekeurig_moment(rnd.randrange(DAGEN - 3)))
        ontvangen[wallet] += bedrag
        slachtoffer += 1
# Een paar slachtoffers betalen twee keer (aan dezelfde wallet).
for _ in range(9):
    van = "bc1q-slo-%03d" % rnd.randint(1, 61)
    bedrag = round(rnd.uniform(180, 900), 2)
    betaling(van, "bc1q-verz-01", bedrag, willekeurig_moment(rnd.randrange(DAGEN - 3)))
    ontvangen["bc1q-verz-01"] += bedrag
# Peel chain: elke verzamelwallet stuurt 90% door via tussenwallets naar de exchange, 10% naar operators.
EXCHANGE = "exch-hot-noordwind"
for i, (wallet, totaal) in enumerate(ontvangen.items(), 1):
    t = START + timedelta(days=DAGEN - 2, hours=2 * i)
    tussen = "bc1q-peel-%02d" % i
    door = round(totaal * 0.9, 2)
    betaling(wallet, tussen, door, t)
    betaling(wallet, "bc1q-oper-%02d" % i, round(totaal - door, 2), t + timedelta(minutes=5))
    rest = door
    for stap in range(3):
        deel = round(rest / (3 - stap), 2) if stap < 2 else round(rest, 2)
        betaling(tussen, EXCHANGE, deel, t + timedelta(hours=1, minutes=17 * stap))
        rest = round(rest - deel, 2)
tx.sort(key=lambda r: r[1])
schrijf("betalingen.csv", ["tx_id", "tijd_utc", "van_wallet", "naar_wallet", "bedrag_eur"], tx)

print("Geschreven naar", UIT)
for f in sorted(UIT.glob("*.csv")):
    print("  %-20s %6d regels" % (f.name, sum(1 for _ in open(f, encoding="utf-8")) - 1))
