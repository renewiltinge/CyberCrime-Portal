# Notitie: Operatie Nachtvlinder (voorbeeld)

*Fictief. TLP:AMBER. Opsteller: tactisch analist, cluster Cybercrime Intelligence. Peildatum 31 oktober 2026.*

## Conclusie

Het is **zeer waarschijnlijk** dat de phishinggolf in de eenheid van oktober uit één phishingpanel komt, bediend door
vijf operators. "Spinner" is de meest actieve operator. Spinners IP-adres staat in meldingen van drie teams. De beste
interventiekans is de persoon **"nachtvlinder"**: de enige schakel tussen de wervingsgroep en de technische
dienstverleners. Het geld (circa € 235.000 aan de exchange-kant) is via één exchange te volgen. **Advies:** één
gezamenlijk onderzoek in plaats van losse aangiftes, en een vordering bij de exchange.

## Wat we weten (uit de data)

- Het panel registreerde 2.357 unieke acties van 12 tot en met 31 oktober, na het opschonen van 97 dubbele regels en
  43 acties die op twee servers stonden.
- Op 20 oktober tussen 09:00 en 10:00 Nederlandse tijd waren er 147 acties, tegen hooguit 16 in elk ander uur. Op
  21 oktober kwamen er 60 meldingen binnen, de mediaan is 17 per dag.
- Het IP-adres 203.0.113.77, uitsluitend gebruikt door "spinner", staat in meldingen van Basisteam Duinstreek,
  Districtsrecherche Kust en Team Cybercrime.
- Ransomware met contact-ID tox-7F3A9C komt voor bij drie teams.
- 117 slachtofferwallets betaalden samen € 260.740,11 aan drie verzamelwallets. Daarvan kwam € 234.666,10 via
  tussenwallets aan bij exchange "noordwind". Ongeveer 10% ging naar wallets die we aan operators toeschrijven.

## Wat we afleiden

- De piek op het panel en de golf meldingen een dag later horen **zeer waarschijnlijk** bij één campagne. De
  volgorde past (eerst buit, dan aangiftes) en het IP-adres verbindt beide.
- "Nachtvlinder" heeft weinig berichten (4 contacten), maar de hoogste betweenness. Zonder deze persoon zijn de
  werving en de techniek in de berichten niet met elkaar verbonden. "Bunkerbaas" en "spinner" zijn de spil van hun
  eigen groep (meeste berichten). Zij zijn **waarschijnlijk** eerder te vervangen dan de schakel.

## Wat we aannemen (en nog moeten toetsen)

- Dat de berichtenset volledig is. Als er kanalen ontbreken, kan er een tweede schakel bestaan.
- Dat de ransomware met tox-7F3A9C bij deze groep hoort. Er is **een reële kans** dat het een losse affiliate is die
  dezelfde infrastructuur huurt: het contact-ID komt niet in het panel of de berichten voor.

## Interventiekansen

| Kans | Wat | Eigenaar |
|---|---|---|
| 1 | De drie teams bundelen in één onderzoek, met "spinner" en "nachtvlinder" als prioriteit | Teamleider Team Cybercrime |
| 2 | Gegevens vorderen bij exchange "noordwind" over de ontvangende accounts | Officier van justitie, op voorstel van het onderzoeksteam |
| 3 | De drie doelbanken waarschuwen voor het IP-adres en de kenmerken van het panel | Analist, via de bestaande publiek-private afspraken |

## Wat we nog niet weten

- Wie er achter de aliassen zit: hiervoor zijn identificerende gegevens bij de exchange en de hoster nodig.
- Of de piek van 20 oktober bij een bepaalde mailing of sms-golf hoort: de meldingen bevatten geen afzender.

*Bijlage: grafiek panelacties per uur met daaronder de meldingen per dag (stap 3).*
