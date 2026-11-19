#!/usr/bin/env python3
"""
UITWERKING van Operatie Nachtvlinder. Open dit pas als je zelf klaar bent.

Draait alle stappen met pandas, SQLite en networkx en print per vraag het antwoord.
Gebruik (vanuit de projectmap):  python uitwerking/oplossing.py
"""
import sqlite3
from pathlib import Path

import networkx as nx
import pandas as pd

MAP = Path(__file__).resolve().parent.parent
DATA = MAP / "data"
ant = {}

# ---------------------------------------------------------------------------
# Stap 1 — inladen en opschonen
# ---------------------------------------------------------------------------
ruw = pd.read_csv(DATA / "panel_logins.csv", dtype=str)
ant["Q1"] = int(ruw.duplicated().sum())

# NederBank in alle schrijfwijzen: vergelijk zonder hoofdletters en spaties.
sleutel = ruw["doelbank"].str.lower().str.replace(" ", "", regex=False)
ant["Q3"] = int(ruw.loc[sleutel == "nederbank", "doelbank"].nunique())

schoon = ruw.copy()
# Tijd: server A schrijft UTC met Z, server B lokale tijd met offset. utc=True rekent alles om.
schoon["tijd_utc"] = pd.to_datetime(schoon["tijd"], utc=True, format="ISO8601")
schoon["operator"] = schoon["operator"].str.strip().str.lower()
canon = {"nederbank": "NederBank", "polderbank": "Polderbank", "duinkrediet": "Duinkrediet"}
schoon["doelbank"] = sleutel.map(canon)
# Dezelfde gebeurtenis op twee servers is ook een dubbeling: kolom server en ruwe tijd vallen weg.
schoon = schoon.drop(columns=["tijd", "server"]).drop_duplicates()
ant["Q2"] = len(schoon)

# ---------------------------------------------------------------------------
# Stap 2 — tellen, groeperen en koppelen met SQL
# ---------------------------------------------------------------------------
db = sqlite3.connect(":memory:")
schoon.assign(tijd_utc=schoon["tijd_utc"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")).to_sql("logins", db, index=False)
meld = pd.read_csv(DATA / "meldingen.csv", dtype={"contact_id": str}).fillna({"contact_id": ""})
meld.to_sql("meldingen", db, index=False)

q = "SELECT operator, COUNT(*) AS n FROM logins GROUP BY operator ORDER BY n DESC"
per_op = pd.read_sql(q, db)
ant["Q4"] = per_op.iloc[0]["operator"]

q = """
SELECT m.ioc_ip, COUNT(DISTINCT m.team) AS teams
FROM meldingen m
JOIN (SELECT DISTINCT ip FROM logins) l ON l.ip = m.ioc_ip
GROUP BY m.ioc_ip ORDER BY teams DESC
"""
koppel = pd.read_sql(q, db)
ant["Q5"] = koppel.iloc[0]["ioc_ip"]
ant["Q6"] = int(koppel.iloc[0]["teams"])

q = "SELECT COUNT(DISTINCT team) FROM meldingen WHERE soort = 'ransomware' AND contact_id = 'tox-7F3A9C'"
ant["Q7"] = int(db.execute(q).fetchone()[0])

# ---------------------------------------------------------------------------
# Stap 3 — patronen en afwijkingen
# ---------------------------------------------------------------------------
per_uur = schoon.set_index("tijd_utc").resample("1h").size()
piek = per_uur.idxmax()
ant["Q8"] = piek.strftime("%Y-%m-%d")
ant["Q9"] = piek.tz_convert("Europe/Amsterdam").strftime("%H")  # Nederlandse tijd

per_dag = meld.groupby("datum").size()
ant["Q10"] = per_dag.idxmax()
ant["Q11"] = float(per_dag.median())

# ---------------------------------------------------------------------------
# Stap 4 — het netwerk
# ---------------------------------------------------------------------------
ber = pd.read_csv(DATA / "berichten.csv")
paren = ber.apply(lambda r: tuple(sorted((r["van"], r["naar"]))), axis=1).value_counts()
G = nx.Graph()
for (a, b), n in paren.items():
    G.add_edge(a, b, weight=int(n))
gewogen = dict(G.degree(weight="weight"))
ant["Q12"] = max(gewogen, key=gewogen.get)
bc = nx.betweenness_centrality(G)
ant["Q13"] = max(bc, key=bc.get)
ant["Q14"] = G.degree(ant["Q13"])

# ---------------------------------------------------------------------------
# Stap 5 — de geldstroom
# ---------------------------------------------------------------------------
tx = pd.read_csv(DATA / "betalingen.csv")
slo = tx[tx["van_wallet"].str.startswith("bc1q-slo-")]
ant["Q15"] = slo.groupby("naar_wallet")["van_wallet"].nunique().idxmax()
ant["Q16"] = int((slo.groupby("van_wallet").size() > 1).sum())
ant["Q17"] = "%.2f" % tx.loc[tx["naar_wallet"] == "exch-hot-noordwind", "bedrag_eur"].sum()

if __name__ == "__main__":
    print("Operator-telling:\n" + per_op.to_string(index=False))
    print("\nPanel-IP's in meldingen:\n" + koppel.to_string(index=False))
    print("\nTop-5 betweenness:", sorted(bc.items(), key=lambda x: -x[1])[:5])
    print("Top-5 berichten (gewogen degree):", sorted(gewogen.items(), key=lambda x: -x[1])[:5])
    print("Top-3 uren:", per_uur.sort_values(ascending=False).head(3).to_dict())
    print()
    for k, v in ant.items():
        print(f"{k}: {v}")
