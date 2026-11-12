/* Room: TLS en PKI in de praktijk */
CS.registerRoom({
  id: 'tls-pki',
  path: 'security-kern',
  order: 14,
  title: 'TLS en PKI in de praktijk',
  icon: '🔏',
  difficulty: 'Gemiddeld',
  minutes: 80,
  level: 'Praktijk',
  checked: '2026-11-12',
  summary: 'Wat gebeurt er echt achter het slotje? Zet een TLS 1.3-handshake in volgorde, vind een gebroken certificaatketen, betrap een certificaat dat niemand aanvroeg via Certificate Transparency, lees een TLS-scan en spoor een gelekte sleutel op in de certificaatinventaris.',
  objectives: [
    'De handshake van TLS 1.2 (RFC 5246) en TLS 1.3 (RFC 8446) op hoofdlijnen uitleggen, inclusief sleuteluitwisseling en forward secrecy',
    'Een certificaatketen tot een root-CA beoordelen en uitleggen welke controles een client doet: naam, geldigheid, keten en intrekking',
    'OCSP, CRL en Certificate Transparency inzetten om ingetrokken of ongewenste certificaten te vinden',
    'De uitvoer van een TLS-scan lezen en verouderde protocollen, zwakke cipher suites en ontbrekende instellingen aanwijzen',
    'Sleutels en certificaten beheren over hun hele levenscyclus en weten wat je doet als een private sleutel uitlekt',
  ],
  tasks: [
    {
      title: 'Taak 1: Zo verloopt een TLS-handshake',
      tryFirst: true,
      intro: '<p>Een browser en een webserver hebben elkaar nooit eerder gesproken, en binnen één heen-en-weer moeten ze een geheime sleutel delen en moet de server bewijzen wie hij is. In het lab staan de stappen van een volledige TLS 1.3-handshake door elkaar. Zet ze in de goede volgorde. Je hoeft de namen niet te kennen: vraag je bij elke stap af wat er al bekend moet zijn voordat hij kan gebeuren.</p>',
      content: `
        <p><strong>TLS</strong> (<em>Transport Layer Security</em>) zit onder HTTPS, maar ook onder beveiligde mail
        (SMTP met STARTTLS, IMAPS), veel VPN's en API-verkeer. Het levert drie dingen: vertrouwelijkheid (niemand leest
        mee), integriteit (niemand verandert iets onderweg) en authenticatie van de server (je praat met wie je denkt).
        In de room <em>Cryptografie</em> zag je de bouwstenen. Hier kijk je hoe ze in één protocol samenkomen.</p>
        <h3>Versies</h3>
        <table>
          <thead><tr><th>Versie</th><th>Standaard</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>SSL 2.0 en 3.0</td><td>voorlopers van TLS</td><td>verboden (RFC 6176 en RFC 7568)</td></tr>
            <tr><td>TLS 1.0 en 1.1</td><td>RFC 2246 en RFC 4346</td><td>afgeschaft in 2021 (RFC 8996)</td></tr>
            <tr><td>TLS 1.2</td><td>RFC 5246 (2008)</td><td>nog toegestaan, mits goed ingesteld</td></tr>
            <tr><td>TLS 1.3</td><td>RFC 8446 (2018)</td><td>de voorkeur</td></tr>
          </tbody>
        </table>
        <h3>TLS 1.2: twee keer heen en weer</h3>
        <pre><code>Client  ClientHello                        -&gt;
                                     &lt;-  ServerHello, Certificate,
                                         ServerKeyExchange, ServerHelloDone
Client  ClientKeyExchange,
        ChangeCipherSpec, Finished         -&gt;
                                     &lt;-  ChangeCipherSpec, Finished
Client  applicatiedata                     -&gt;</code></pre>
        <p>De client stelt voor welke <strong>cipher suites</strong> hij kent, de server kiest er één. In TLS 1.2 legt
        de naam van een suite alles in één keer vast, bijvoorbeeld <code>TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</code>:
        sleuteluitwisseling ECDHE, servercertificaat met RSA-sleutel, versleuteling AES-128 in GCM-modus, hash SHA-256.
        Alles tot en met het certificaat gaat onversleuteld over de lijn: wie meekijkt, ziet welk certificaat de
        server toont.</p>
        <h3>Sleuteluitwisseling en forward secrecy</h3>
        <p>TLS 1.2 kent twee families. Bij <strong>RSA-sleuteltransport</strong> (suites die beginnen met
        <code>TLS_RSA_WITH_</code>) versleutelt de client een geheim met de publieke sleutel uit het certificaat. Wie
        later de private sleutel van de server in handen krijgt, kan opgenomen verkeer van jaren terug alsnog
        ontsleutelen. Bij <strong>(EC)DHE</strong> maken beide kanten per verbinding een tijdelijk sleutelpaar
        (<em>ephemeral</em>) en leiden ze samen een geheim af. De private sleutel van de server wordt dan alleen
        gebruikt om te <em>ondertekenen</em>. Een later gestolen sleutel helpt niet om oude sessies te lezen: dat heet
        <strong>forward secrecy</strong>.</p>
        <h3>TLS 1.3: kaal en sneller</h3>
        <p>TLS 1.3 heeft veel weggesneden: geen RSA-sleuteltransport, geen statische DH, geen CBC- of RC4-versleuteling,
        geen compressie en geen heronderhandeling. Een volledige handshake gebruikt altijd (EC)DHE, dus forward secrecy
        is daar standaard. De client stuurt in zijn eerste bericht meteen een tijdelijke publieke sleutel mee (de
        extensie <code>key_share</code>), voor de groep die hij verwacht, zoals X25519. Antwoordt de server met zijn
        eigen <code>key_share</code>, dan kennen beide kanten het gedeelde geheim en kan <em>alles daarna</em>
        versleuteld, ook het certificaat. Daardoor kan de client na één keer heen en weer al applicatiedata sturen.</p>
        <p>Een TLS 1.3-suite noemt alleen nog de versleuteling en de hash, bijvoorbeeld <code>TLS_AES_128_GCM_SHA256</code>
        of <code>TLS_CHACHA20_POLY1305_SHA256</code>. Sleuteluitwisseling en handtekening worden apart afgesproken.</p>
        <p>Met de handtekening in <strong>CertificateVerify</strong> bewijst de server dat hij de private sleutel bij
        het certificaat heeft: hij ondertekent een samenvatting van de hele handshake tot dan toe. Met
        <strong>Finished</strong> bevestigt elke kant dat beide hetzelfde gesprek hebben gezien. Heeft iemand onderweg
        iets aangepast, bijvoorbeeld een zwakkere suite ingefluisterd, dan klopt Finished niet en stopt de verbinding.</p>
        <div class="callout warn"><strong>0-RTT:</strong> TLS 1.3 kent bij een hervatte verbinding ook "early data":
        de client stuurt data al in zijn eerste bericht. Die data kan door een aanvaller opnieuw worden afgespeeld
        (<em>replay</em>). Sta het alleen toe voor verzoeken die geen kwaad kunnen als ze twee keer aankomen.</div>
      `,
      lab: {
        type: 'ordering',
        prompt: 'Zet de stappen van een volledige TLS 1.3-handshake (met certificaat) in volgorde, van het eerste bericht tot de eerste applicatiedata.',
        items: [
          { id: 'a', label: 'Client stuurt ClientHello: ondersteunde versies, cipher suites en een tijdelijke publieke sleutel (key_share)' },
          { id: 'b', label: 'Server stuurt ServerHello: gekozen suite en zijn eigen tijdelijke publieke sleutel' },
          { id: 'c', label: 'Beide kanten berekenen het gedeelde geheim en leiden de handshakesleutels af' },
          { id: 'd', label: 'Server stuurt EncryptedExtensions (overige afspraken, nu al versleuteld)' },
          { id: 'e', label: 'Server stuurt Certificate: zijn certificaat en de tussencertificaten' },
          { id: 'f', label: 'Server stuurt CertificateVerify: handtekening over de handshake met zijn private sleutel' },
          { id: 'g', label: 'Server stuurt Finished' },
          { id: 'h', label: 'Client controleert keten, naam en handtekening, en stuurt zijn eigen Finished' },
          { id: 'i', label: 'Client stuurt het eerste HTTP-verzoek, versleuteld met de verkeerssleutels' },
        ],
        correct: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
        flag: 'NM{een_rondgang_tls13}',
        explain: 'Na ServerHello kennen beide kanten het gedeelde geheim. Daarom gaat alles daarna versleuteld, ook het certificaat. De handtekening in CertificateVerify kan pas als het certificaat er is, en Finished sluit de handshake af.',
      },
      questions: [
        { q: 'Zet de stappen in de goede volgorde. Welke vlag krijg je?', answer: ['NM{een_rondgang_tls13}'],
          hints: ['Er kan pas iets versleuteld als beide kanten elkaars tijdelijke publieke sleutel hebben.', 'De server kan pas over de handshake tekenen nadat hij zijn certificaat heeft gestuurd.', 'Volgorde aan serverkant: ServerHello, sleutels afleiden, EncryptedExtensions, Certificate, CertificateVerify, Finished.'],
          explain: 'Eén keer heen en weer, en vanaf het tweede serverbericht is alles versleuteld.' },
        { q: 'Wat is het eerste bericht van de server dat iemand die het netwerk afluistert in TLS 1.3 niet meer kan lezen?', answer: ['EncryptedExtensions', 'encrypted extensions'],
          hints: ['Zoek het moment waarop beide kanten het gedeelde geheim kennen.', 'Dat is direct na de ServerHello.', 'Het eerstvolgende serverbericht in jouw volgorde heeft "Encrypted" in de naam.'],
          wrong: { 'certificate': 'Het certificaat is in TLS 1.3 inderdaad versleuteld, maar er komt al een versleuteld bericht vóór.', 'serverhello': 'De ServerHello moet leesbaar zijn: daarin staat de sleutel van de server die de client nodig heeft om het geheim te berekenen.' },
          explain: 'Na de ServerHello zijn de handshakesleutels bekend. EncryptedExtensions is het eerste bericht dat ermee is versleuteld.' },
        { q: 'Een afluisteraar neemt in 2026 al het verkeer naar een server op. In 2028 lekt de private sleutel van die server. Bij welke van deze verbindingen kan hij het opgenomen verkeer alsnog lezen?', options: ['TLS 1.2 met TLS_RSA_WITH_AES_128_GCM_SHA256', 'TLS 1.2 met TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256', 'TLS 1.3 met TLS_AES_128_GCM_SHA256', 'Bij geen van drieën, want AES-128 is niet te kraken'], answer: 0,
          wrong: { 1: 'ECDHE gebruikt per verbinding een tijdelijk sleutelpaar. De private sleutel van de server tekent alleen, en helpt niet om de sessiesleutel terug te rekenen.', 2: 'Een volledige TLS 1.3-handshake gebruikt altijd (EC)DHE. Er is dus forward secrecy.', 3: 'AES hoeft hij niet te kraken. Bij RSA-sleuteltransport haalt hij met de private sleutel het geheim uit de opname, en daarmee de sessiesleutel.' },
          why: 'Afluisteren nu en later ontsleutelen ("harvest now, decrypt later") is een reëel scenario, bijvoorbeeld als een server jaren later wordt gehackt. Forward secrecy beperkt de schade van een gelekte sleutel tot de toekomst.',
          explain: 'Bij TLS_RSA_WITH_ is het sessiegeheim met de publieke sleutel van de server versleuteld. Wie de private sleutel heeft, kan elk opgenomen gesprek openen.' },
        { q: 'Hoe vaak moet een TLS 1.2-client bij een volledige handshake heen en weer (round trips) voordat hij zijn eerste applicatiedata stuurt?', answer: ['2', 'twee'],
          hints: ['Tel in het schema hoe vaak de client moet wachten op een antwoord van de server.', 'Eerst wacht hij op ServerHelloDone, daarna op de Finished van de server.', 'Eén meer dan bij TLS 1.3.'],
          wrong: { '1': 'Dat is TLS 1.3. In TLS 1.2 wacht de client ook nog op ChangeCipherSpec en Finished van de server.', '4': 'Je telt berichten. Gevraagd is hoe vaak de client heen en weer moet.' },
          explain: 'Twee: de client wacht op ServerHelloDone en daarna op de Finished van de server. TLS 1.3 doet het in één.' },
      ],
    },

    {
      title: 'Taak 2: Certificaten en de keten tot een root-CA',
      tryFirst: true,
      intro: '<p>Medewerkers van het fictieve Rietveld Assuradeuren melden dat het klantportaal in hun browser werkt, maar dat de mobiele app en een koppeling van een partner foutmeldingen geven. Je hebt een terminal met uitvoer van <code>openssl</code>. Begin met <code>cat LEESMIJ.txt</code> en zoek uit wat er mis is met de keten van <code>portaal.rietveld.nm.lab</code>.</p>',
      content: `
        <p>Een <strong>X.509-certificaat</strong> (het profiel voor internet staat in RFC 5280) koppelt een publieke
        sleutel aan een naam, en een <strong>certificaatautoriteit</strong> (CA) zet daar haar handtekening onder. De
        belangrijkste velden:</p>
        <table>
          <thead><tr><th>Veld</th><th>Wat erin staat</th></tr></thead>
          <tbody>
            <tr><td>Subject en Subject Alternative Name (SAN)</td><td>Voor welke namen het certificaat geldt. Browsers kijken alleen nog naar de SAN.</td></tr>
            <tr><td>Issuer</td><td>Welke CA het heeft ondertekend.</td></tr>
            <tr><td>Validity</td><td>Not Before en Not After: de geldigheidsperiode.</td></tr>
            <tr><td>Basic Constraints</td><td>CA:TRUE bij een CA-certificaat, CA:FALSE bij een servercertificaat.</td></tr>
            <tr><td>Key Usage en Extended Key Usage</td><td>Waarvoor de sleutel mag worden gebruikt, zoals TLS Web Server Authentication.</td></tr>
            <tr><td>Authority Information Access (AIA)</td><td>Waar de OCSP-dienst van de uitgever zit, en waar je het certificaat van de uitgever kunt ophalen.</td></tr>
            <tr><td>CRL Distribution Points</td><td>Waar de intrekkingslijst van de uitgever staat.</td></tr>
          </tbody>
        </table>
        <h3>De keten</h3>
        <p>Een root-CA ondertekent bijna nooit zelf servercertificaten. Haar private sleutel ligt offline in een kluis.
        Ze ondertekent een paar <strong>tussen-CA's</strong> (<em>intermediates</em>), en die ondertekenen de
        servercertificaten. De client heeft een lijst met vertrouwde roots (de <em>trust store</em>) van het
        besturingssysteem of de browser, maar meestal niet de tussencertificaten. Daarom moet de server
        <strong>zijn eigen certificaat plus alle tussencertificaten</strong> meesturen. De root zelf hoeft niet mee: die
        heeft de client al, en een meegestuurde root wordt niet vertrouwd omdat hij is meegestuurd.</p>
        <h3>Wat een client controleert</h3>
        <ol>
          <li><strong>Keten:</strong> elke handtekening klopt, elke tussenschakel heeft CA:TRUE, en de keten eindigt bij
          een root in de trust store.</li>
          <li><strong>Geldigheid:</strong> de huidige datum ligt tussen Not Before en Not After, voor elk certificaat in
          de keten.</li>
          <li><strong>Naam:</strong> de hostnaam staat in de SAN. Een wildcard als <code>*.voorbeeld.nm.lab</code> dekt
          precies één label links: <code>a.voorbeeld.nm.lab</code> wel, <code>voorbeeld.nm.lab</code> en
          <code>a.b.voorbeeld.nm.lab</code> niet (RFC 9525, de opvolger van RFC 6125).</li>
          <li><strong>Gebruik:</strong> Key Usage en Extended Key Usage passen bij een webserver.</li>
          <li><strong>Intrekking:</strong> het certificaat is niet ingetrokken. Daarover gaat taak 3.</li>
        </ol>
        <h3>Waarom het "in de browser wel werkt"</h3>
        <p>Ontbreekt een tussencertificaat, dan reageren clients verschillend. Sommige browsers hebben het
        tussencertificaat nog in hun cache van een eerdere site, of halen het zelf op via de AIA-verwijzing in het
        certificaat. Veel andere clients doen dat niet: OpenSSL, programmeertalen, mobiele apps, koppelingen tussen
        servers. Zo ontstaat de verwarrende situatie dat een fout configuratie voor de beheerder onzichtbaar blijft.</p>
        <h3>Lezen met openssl</h3>
        <ul>
          <li><code>openssl s_client -connect host:443 -servername host</code> toont de keten zoals de server die stuurt
          (regels met <code>s:</code> zijn het subject, <code>i:</code> de issuer) en eindigt met
          <code>Verify return code</code>. Een 0 betekent dat de keten klopt.</li>
          <li><code>openssl x509 -in bestand.pem -noout -text</code> toont alle velden van één certificaat.</li>
        </ul>
        <div class="callout tip"><strong>Zelfondertekend:</strong> bij een self-signed certificaat zijn subject en issuer
        gelijk en staat niemand in voor de identiteit. Voor interne systemen is een eigen interne CA beter, waarvan je de
        root via het werkplekbeheer naar alle apparaten uitrolt. Dan kun je wél controleren, intrekken en vervangen.</div>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student', host: 'rietveld-analist',
        home: '/home/student', cwd: '/home/student',
        motd: 'Analistenwerkplek Rietveld Assuradeuren (fictief). Alleen leesopdrachten. Begin met: cat LEESMIJ.txt',
        fs: {
          '/home/student/LEESMIJ.txt': 'KETENCONTROLE (fictief)\nDe uitvoer van deze opdrachten staat klaar:\n  openssl s_client -connect portaal.rietveld.nm.lab:443 -servername portaal.rietveld.nm.lab\n  openssl s_client -connect mail.rietveld.nm.lab:443 -servername mail.rietveld.nm.lab\n  openssl x509 -in portaal.pem -noout -text\nDezelfde uitvoer staat ook in de map uitvoer/ (gebruik cat).\n',
          '/home/student/portaal.pem': '-----BEGIN CERTIFICATE-----\n(fictief lab-certificaat, gebruik openssl x509 -in portaal.pem -noout -text)\n-----END CERTIFICATE-----\n',
          '/home/student/uitvoer/s_client-portaal.txt': 'CONNECTED(00000003)\ndepth=0 CN = portaal.rietveld.nm.lab\nverify error:num=20:unable to get local issuer certificate\nverify return:1\ndepth=0 CN = portaal.rietveld.nm.lab\nverify error:num=21:unable to verify the first certificate\nverify return:1\n---\nCertificate chain\n 0 s:CN = portaal.rietveld.nm.lab\n   i:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256\n   v:NotBefore: Aug  3 00:00:00 2026 GMT; NotAfter: Feb 18 23:59:59 2027 GMT\n---\nServer certificate\nsubject=CN = portaal.rietveld.nm.lab\nissuer=C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n---\nNo client certificate CA names sent\nPeer signature type: ECDSA\nServer Temp Key: X25519, 253 bits\n---\nSSL handshake has read 1702 bytes and written 398 bytes\nVerification error: unable to verify the first certificate\n---\nNew, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384\nProtocol: TLSv1.3\nVerify return code: 21 (unable to verify the first certificate)\n---\n',
          '/home/student/uitvoer/s_client-mail.txt': 'CONNECTED(00000003)\ndepth=2 C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen Root CA\nverify return:1\ndepth=1 C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\nverify return:1\ndepth=0 CN = mail.rietveld.nm.lab\nverify return:1\n---\nCertificate chain\n 0 s:CN = mail.rietveld.nm.lab\n   i:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256\n   v:NotBefore: Sep 14 00:00:00 2026 GMT; NotAfter: Mar 12 23:59:59 2027 GMT\n 1 s:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n   i:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen Root CA\n   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA384\n   v:NotBefore: Jan 10 00:00:00 2024 GMT; NotAfter: Jan  9 23:59:59 2032 GMT\n---\nServer certificate\nsubject=CN = mail.rietveld.nm.lab\nissuer=C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n---\nPeer signature type: ECDSA\nServer Temp Key: X25519, 253 bits\n---\nNew, TLSv1.3, Cipher is TLS_AES_128_GCM_SHA256\nProtocol: TLSv1.3\nVerify return code: 0 (ok)\n---\n',
          '/home/student/uitvoer/x509-portaal.txt': 'Certificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            3b:9e:41:d0:7a:22:c5:10:8f:61:2d:aa:04:19:e7:b3\n        Signature Algorithm: sha256WithRSAEncryption\n        Issuer: C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n        Validity\n            Not Before: Aug  3 00:00:00 2026 GMT\n            Not After : Feb 18 23:59:59 2027 GMT\n        Subject: CN = portaal.rietveld.nm.lab\n        Subject Public Key Info:\n            Public Key Algorithm: id-ecPublicKey\n                Public-Key: (256 bit)\n                ASN1 OID: prime256v1\n        X509v3 extensions:\n            X509v3 Key Usage: critical\n                Digital Signature\n            X509v3 Extended Key Usage:\n                TLS Web Server Authentication\n            X509v3 Basic Constraints: critical\n                CA:FALSE\n            X509v3 Subject Alternative Name:\n                DNS:portaal.rietveld.nm.lab, DNS:*.klant.rietveld.nm.lab\n            Authority Information Access:\n                OCSP - URI:http://ocsp.fictiefvertrouwen.example\n                CA Issuers - URI:http://ca.fictiefvertrouwen.example/tlsca2.crt\n            X509v3 CRL Distribution Points:\n                Full Name:\n                  URI:http://crl.fictiefvertrouwen.example/tlsca2.crl\n            CT Precertificate SCTs:\n                Signed Certificate Timestamp:\n                    Log Name : Fictief CT-log Noord 2026\n                    Timestamp : Aug  3 09:02:11.418 2026 GMT\n                Signed Certificate Timestamp:\n                    Log Name : Fictief CT-log Zuid 2026\n                    Timestamp : Aug  3 09:02:11.502 2026 GMT\n',
        },
        commands: {
          'openssl s_client -connect portaal.rietveld.nm.lab:443 -servername portaal.rietveld.nm.lab': 'CONNECTED(00000003)\ndepth=0 CN = portaal.rietveld.nm.lab\nverify error:num=20:unable to get local issuer certificate\nverify return:1\ndepth=0 CN = portaal.rietveld.nm.lab\nverify error:num=21:unable to verify the first certificate\nverify return:1\n---\nCertificate chain\n 0 s:CN = portaal.rietveld.nm.lab\n   i:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256\n   v:NotBefore: Aug  3 00:00:00 2026 GMT; NotAfter: Feb 18 23:59:59 2027 GMT\n---\nServer certificate\nsubject=CN = portaal.rietveld.nm.lab\nissuer=C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n---\nNo client certificate CA names sent\nPeer signature type: ECDSA\nServer Temp Key: X25519, 253 bits\n---\nSSL handshake has read 1702 bytes and written 398 bytes\nVerification error: unable to verify the first certificate\n---\nNew, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384\nProtocol: TLSv1.3\nVerify return code: 21 (unable to verify the first certificate)\n---',
          'openssl s_client -connect mail.rietveld.nm.lab:443 -servername mail.rietveld.nm.lab': 'CONNECTED(00000003)\ndepth=2 C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen Root CA\nverify return:1\ndepth=1 C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\nverify return:1\ndepth=0 CN = mail.rietveld.nm.lab\nverify return:1\n---\nCertificate chain\n 0 s:CN = mail.rietveld.nm.lab\n   i:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256\n   v:NotBefore: Sep 14 00:00:00 2026 GMT; NotAfter: Mar 12 23:59:59 2027 GMT\n 1 s:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n   i:C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen Root CA\n   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA384\n   v:NotBefore: Jan 10 00:00:00 2024 GMT; NotAfter: Jan  9 23:59:59 2032 GMT\n---\nServer certificate\nsubject=CN = mail.rietveld.nm.lab\nissuer=C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n---\nPeer signature type: ECDSA\nServer Temp Key: X25519, 253 bits\n---\nNew, TLSv1.3, Cipher is TLS_AES_128_GCM_SHA256\nProtocol: TLSv1.3\nVerify return code: 0 (ok)\n---',
          'openssl x509 -in portaal.pem -noout -text': 'Certificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            3b:9e:41:d0:7a:22:c5:10:8f:61:2d:aa:04:19:e7:b3\n        Signature Algorithm: sha256WithRSAEncryption\n        Issuer: C = NL, O = Fictief Vertrouwen B.V., CN = Fictief Vertrouwen TLS CA 2\n        Validity\n            Not Before: Aug  3 00:00:00 2026 GMT\n            Not After : Feb 18 23:59:59 2027 GMT\n        Subject: CN = portaal.rietveld.nm.lab\n        Subject Public Key Info:\n            Public Key Algorithm: id-ecPublicKey\n                Public-Key: (256 bit)\n                ASN1 OID: prime256v1\n        X509v3 extensions:\n            X509v3 Key Usage: critical\n                Digital Signature\n            X509v3 Extended Key Usage:\n                TLS Web Server Authentication\n            X509v3 Basic Constraints: critical\n                CA:FALSE\n            X509v3 Subject Alternative Name:\n                DNS:portaal.rietveld.nm.lab, DNS:*.klant.rietveld.nm.lab\n            Authority Information Access:\n                OCSP - URI:http://ocsp.fictiefvertrouwen.example\n                CA Issuers - URI:http://ca.fictiefvertrouwen.example/tlsca2.crt\n            X509v3 CRL Distribution Points:\n                Full Name:\n                  URI:http://crl.fictiefvertrouwen.example/tlsca2.crl\n            CT Precertificate SCTs:\n                Signed Certificate Timestamp:\n                    Log Name : Fictief CT-log Noord 2026\n                    Timestamp : Aug  3 09:02:11.418 2026 GMT\n                Signed Certificate Timestamp:\n                    Log Name : Fictief CT-log Zuid 2026\n                    Timestamp : Aug  3 09:02:11.502 2026 GMT',
        },
      },
      questions: [
        { q: 'Welk certificaat stuurt portaal.rietveld.nm.lab niet mee? Geef de CN.', answer: ['Fictief Vertrouwen TLS CA 2', 'TLS CA 2'],
          hints: ['Vergelijk de "Certificate chain" van portaal met die van mail.', 'Bij mail staan twee certificaten in de keten, bij portaal één.', 'Kijk naar de i:-regel van certificaat 0: dat is de uitgever die ontbreekt.'],
          wrong: { 'Fictief Vertrouwen Root CA': 'De root hoeft de server niet mee te sturen: die zit al in de trust store. Ook mail stuurt hem niet mee.', 'portaal.rietveld.nm.lab': 'Dat certificaat wordt wel gestuurd: het is nummer 0 in de keten.' },
          why: 'Een ontbrekend tussencertificaat is een van de meest voorkomende TLS-fouten. Omdat sommige browsers het zelf aanvullen, merkt de beheerder het vaak pas als een app of een partnerkoppeling faalt.',
          explain: 'De server stuurt alleen zijn eigen certificaat. De client kan zo geen pad naar de root bouwen: "unable to get local issuer certificate". Oplossing: configureer de server met het volledige ketenbestand (eigen certificaat plus tussencertificaat).' },
        { q: 'Van welke URL kan een client die dat zelf doet het ontbrekende certificaat ophalen?', answer: ['http://ca.fictiefvertrouwen.example/tlsca2.crt', 'ca.fictiefvertrouwen.example/tlsca2.crt'],
          hints: ['Bekijk alle velden van het servercertificaat.', 'Zoek in de extensie Authority Information Access.', 'Niet de OCSP-regel, maar de regel CA Issuers.'],
          wrong: { 'http://ocsp.fictiefvertrouwen.example': 'Dat is de OCSP-dienst: die beantwoordt of een certificaat is ingetrokken.', 'http://crl.fictiefvertrouwen.example/tlsca2.crl': 'Dat is de intrekkingslijst, niet het certificaat van de uitgever.' },
          explain: 'CA Issuers in de AIA wijst naar het certificaat van de uitgever. Sommige browsers halen het daar op; OpenSSL en de meeste apps niet. Vertrouw er dus niet op.' },
        { q: 'Tot en met welke datum is het servercertificaat van portaal geldig? (JJJJ-MM-DD)', answer: ['2027-02-18'],
          hints: ['Zoek het veld Validity.', 'Not After is de einddatum.', 'Februari 2027.'],
          wrong: { '2026-08-03': 'Dat is Not Before: de begindatum.', '2032-01-09': 'Dat is de einddatum van het tussencertificaat bij mail.' },
          explain: 'Not After: 18 februari 2027. Dat is 199 dagen na Not Before, binnen het maximum dat sinds maart 2026 voor publiek vertrouwde certificaten geldt.' },
        { q: 'Een ontwikkelaar wil hetzelfde certificaat gebruiken voor api.v2.klant.rietveld.nm.lab. Wat gebeurt er?', options: ['Clients weigeren het: de wildcard dekt maar één label, en api.v2 zijn er twee', 'Het werkt, want alles onder klant.rietveld.nm.lab valt onder de wildcard', 'Het werkt alleen als de CN wordt aangepast', 'Het werkt, maar alleen met TLS 1.2'], answer: 0,
          wrong: { 1: 'Een wildcard staat voor precies één label. *.klant.rietveld.nm.lab dekt v2.klant.rietveld.nm.lab, maar niet api.v2.klant.rietveld.nm.lab.', 2: 'Browsers kijken alleen naar de SAN, niet naar de CN. Een andere CN zou ook een nieuw certificaat vragen.', 3: 'De protocolversie verandert niets aan de naamcontrole.' },
          explain: 'De SAN bevat portaal.rietveld.nm.lab en *.klant.rietveld.nm.lab. Een naam met twee labels vóór klant valt erbuiten. Vraag een certificaat aan met die naam in de SAN.' },
      ],
    },

    {
      title: 'Taak 3: Intrekking en Certificate Transparency',
      tryFirst: true,
      intro: '<p>Rietveld laat een monitor meelezen in de openbare Certificate Transparency-logs: elke keer dat een CA ergens ter wereld een certificaat voor een naam onder rietveld.nm.lab uitgeeft, komt er een regel bij. In het lab staat die feed naast de eigen administratie en een OCSP-controle van vandaag. Zoek het certificaat dat niemand bij Rietveld heeft aangevraagd.</p>',
      content: `
        <p>Een certificaat is een belofte met een einddatum. Maar wat als de belofte vóór die datum niet meer klopt,
        omdat de private sleutel is uitgelekt of het domein van eigenaar is gewisseld? Dan trekt de CA het certificaat
        in (<em>revocation</em>). RFC 5280 kent daarvoor redenen zoals <code>keyCompromise</code>,
        <code>superseded</code> en <code>cessationOfOperation</code>. Een client kan op twee manieren nagaan of een
        certificaat is ingetrokken.</p>
        <h3>CRL</h3>
        <p>Een <strong>Certificate Revocation List</strong> is een door de CA ondertekende lijst met serienummers van
        ingetrokken certificaten (RFC 5280). Waar de lijst staat, lees je in het certificaat bij CRL Distribution
        Points. Nadeel: de lijst kan groot worden, en de client moet hem regelmatig ophalen.</p>
        <h3>OCSP en stapling</h3>
        <p>Met het <strong>Online Certificate Status Protocol</strong> (RFC 6960) vraagt de client per certificaat aan
        de CA: is dit serienummer nog goed? Het antwoord is <code>good</code>, <code>revoked</code> of
        <code>unknown</code>, ondertekend door de CA. Nadelen: de CA ziet welke sites je bezoekt, en als de OCSP-dienst
        niet antwoordt, gaan de meeste clients gewoon door (<em>soft-fail</em>). Bij <strong>OCSP stapling</strong>
        haalt de server zelf periodiek het ondertekende antwoord op en stuurt het mee in de handshake (de
        <code>status_request</code>-extensie uit RFC 6066). Dat lost het privacyprobleem op.</p>
        <p>Omdat intrekking in de praktijk slecht werkt, gaan browsers er eigen wegen voor gebruiken, zoals lijsten die
        de browsermaker zelf samenstelt en verspreidt. Het CA/Browser Forum heeft OCSP voor publiek vertrouwde
        certificaten optioneel gemaakt, en een deel van de CA's is ermee gestopt ten gunste van CRL's. Controleer dus
        bij je eigen CA wat ze ondersteunt.</p>
        <h3>Certificate Transparency</h3>
        <p>Intrekking helpt alleen als je weet dát er iets in te trekken valt. Wat als een CA, door een fout of na een
        hack, een certificaat voor jouw domein uitgeeft aan iemand anders? <strong>Certificate Transparency</strong>
        (CT, RFC 6962) maakt dat zichtbaar. Een CA moet elk publiek vertrouwd certificaat eerst in openbare,
        alleen-toevoegen logs zetten. Het log geeft een ondertekend ontvangstbewijs terug, een <strong>SCT</strong>
        (<em>Signed Certificate Timestamp</em>), dat in het certificaat wordt opgenomen. Grote browsers, waaronder Chrome
        en Safari, accepteren publiek vertrouwde certificaten zonder geldige SCT's niet.</p>
        <p>De CA logt eerst een <strong>precertificaat</strong> (een versie met een speciale markering die nooit als echt
        certificaat werkt), krijgt de SCT's terug, en zet die in het definitieve certificaat. Dat heeft hetzelfde
        serienummer. In een CT-monitor zie je daarom vaak twee regels per certificaat.</p>
        <p>Als domeineigenaar laat je een <strong>CT-monitor</strong> meekijken op je eigen namen, en leg je elk gelogd
        certificaat naast je eigen administratie. Wat er niet in staat, is een incident tot het tegendeel blijkt.</p>
        <h3>Voorkomen met CAA</h3>
        <p>Met een <strong>CAA-record</strong> in DNS (RFC 8659) leg je vast welke CA's certificaten voor je domein mogen
        uitgeven, bijvoorbeeld <code>rietveld.nm.lab. CAA 0 issue "fictiefvertrouwen.example"</code>. Publieke CA's
        moeten dat record controleren voordat ze uitgeven. Het voorkomt geen hack van je eigen DNS of van de toegestane
        CA, maar wel dat een willekeurige andere CA zich laat overhalen.</p>
      `,
      lab: {
        type: 'logs',
        title: 'ct-monitor-rietveld.txt (export 2026-11-12)',
        lines: `# EIGEN ADMINISTRATIE: certificaten aangevraagd door Rietveld (alle bij Fictief Vertrouwen TLS CA 2)
aanvraag 2026-06-22 host=vpn.rietveld.nm.lab           aanvrager=b.koster   methode=handmatig
aanvraag 2026-07-30 host=www.rietveld.nm.lab           aanvrager=b.koster   methode=handmatig
aanvraag 2026-08-03 host=portaal.rietveld.nm.lab       aanvrager=acme-bot   methode=ACME
aanvraag 2026-09-14 host=mail.rietveld.nm.lab          aanvrager=acme-bot   methode=ACME
aanvraag 2026-10-05 host=www.rietveld.nm.lab           aanvrager=acme-bot   methode=ACME (vervanging na sleutellek)
# CT-MONITOR: nieuw gelogde certificaten voor *.rietveld.nm.lab
2026-06-22 10:14:02 type=precert serial=5d:02:9a:11 issuer="Fictief Vertrouwen TLS CA 2" san=vpn.rietveld.nm.lab spki=e4d2..7b9
2026-06-22 10:14:03 type=cert    serial=5d:02:9a:11 issuer="Fictief Vertrouwen TLS CA 2" san=vpn.rietveld.nm.lab spki=e4d2..7b9
2026-07-30 15:41:27 type=precert serial=6a:f0:13:0f issuer="Fictief Vertrouwen TLS CA 2" san=www.rietveld.nm.lab spki=e4d2..7b9
2026-07-30 15:41:28 type=cert    serial=6a:f0:13:0f issuer="Fictief Vertrouwen TLS CA 2" san=www.rietveld.nm.lab spki=e4d2..7b9
2026-08-03 09:02:11 type=precert serial=3b:9e:41:d0 issuer="Fictief Vertrouwen TLS CA 2" san=portaal.rietveld.nm.lab,*.klant.rietveld.nm.lab spki=1b77..e02
2026-08-03 09:02:12 type=cert    serial=3b:9e:41:d0 issuer="Fictief Vertrouwen TLS CA 2" san=portaal.rietveld.nm.lab,*.klant.rietveld.nm.lab spki=1b77..e02
2026-09-14 06:30:45 type=precert serial=71:c3:08:2e issuer="Fictief Vertrouwen TLS CA 2" san=mail.rietveld.nm.lab spki=5c90..a7d
2026-09-14 06:30:46 type=cert    serial=71:c3:08:2e issuer="Fictief Vertrouwen TLS CA 2" san=mail.rietveld.nm.lab spki=5c90..a7d
2026-10-05 08:12:09 type=precert serial=0e:57:b4:39 issuer="Fictief Vertrouwen TLS CA 2" san=www.rietveld.nm.lab spki=9f3a..c41
2026-10-05 08:12:10 type=cert    serial=0e:57:b4:39 issuer="Fictief Vertrouwen TLS CA 2" san=www.rietveld.nm.lab spki=9f3a..c41
2026-10-29 03:41:55 type=precert serial=7c:e2:50:a4 issuer="Snelcert Fictief DV CA" san=login.rietveld.nm.lab spki=d018..3e6
2026-10-29 03:41:56 type=cert    serial=7c:e2:50:a4 issuer="Snelcert Fictief DV CA" san=login.rietveld.nm.lab spki=d018..3e6
# OCSP-CONTROLE 2026-11-12 10:00 UTC
ocsp serial=5d:02:9a:11 host=vpn.rietveld.nm.lab     status=good
ocsp serial=6a:f0:13:0f host=www.rietveld.nm.lab     status=revoked reden=keyCompromise ingetrokken=2026-10-04 22:17 UTC
ocsp serial=3b:9e:41:d0 host=portaal.rietveld.nm.lab status=good
ocsp serial=71:c3:08:2e host=mail.rietveld.nm.lab    status=good
ocsp serial=0e:57:b4:39 host=www.rietveld.nm.lab     status=good
ocsp serial=7c:e2:50:a4 host=login.rietveld.nm.lab   status=good responder=ocsp.snelcert.example`,
      },
      questions: [
        { q: 'Voor welke hostnaam is een certificaat uitgegeven dat Rietveld niet heeft aangevraagd?', answer: ['login.rietveld.nm.lab'],
          hints: ['Leg elke regel uit de CT-monitor naast de eigen administratie.', 'Kijk naar de uitgever: Rietveld vraagt alles aan bij één CA.', 'Eén certificaat komt van een andere CA, midden in de nacht.'],
          wrong: { 'www.rietveld.nm.lab': 'Voor www zijn twee certificaten gelogd, maar beide staan in de administratie: het tweede is de vervanging na het sleutellek.', 'portaal.rietveld.nm.lab': 'Dat certificaat is via ACME aangevraagd en staat in de administratie.' },
          why: 'Een certificaat op naam van jouw domein in handen van een ander maakt een overtuigende phishingsite of een man-in-the-middle mogelijk. CT is vaak de enige plek waar je dat ziet voordat het wordt misbruikt.',
          explain: 'login.rietveld.nm.lab, uitgegeven door Snelcert Fictief DV CA op 29 oktober om 03:41. Rietveld heeft die naam niet aangevraagd en gebruikt die CA niet. Volgende stappen: nagaan wie de DNS-validatie voor die naam kon halen, het certificaat bij Snelcert laten intrekken en een CAA-record zetten.' },
        { q: 'Hoeveel verschillende certificaten staan er in de CT-feed?', answer: ['6', 'zes'],
          hints: ['Een CA logt eerst een precertificaat en daarna het echte certificaat.', 'Tel unieke serienummers, geen regels.', 'Twaalf regels, steeds twee per serienummer.'],
          wrong: { '12': 'Je telt regels. Precertificaat en certificaat hebben hetzelfde serienummer en zijn samen één certificaat.', '5': 'Je telt hostnamen. Voor www zijn twee verschillende certificaten uitgegeven.' },
          explain: 'Zes serienummers. Voor www staan er twee: het oude (ingetrokken) en de vervanging.' },
        { q: 'Met welk soort DNS-record had Rietveld kunnen vastleggen dat alleen Fictief Vertrouwen certificaten voor het domein mag uitgeven?', answer: ['CAA', 'caa-record', 'caa record'],
          hints: ['Het is een DNS-record dat over certificaatautoriteiten gaat.', 'De naam is een afkorting van drie letters.', 'Certification Authority Authorization.'],
          wrong: { 'txt': 'Een TXT-record wordt wel gebruikt bij domeinvalidatie, maar legt niet vast welke CA mag uitgeven.', 'tlsa': 'TLSA (DANE) koppelt een certificaat of sleutel aan een dienst, maar publieke CA\'s controleren het niet bij uitgifte.' },
          explain: 'Een CAA-record. Publieke CA\'s moeten het controleren. Snelcert had dan geweigerd, tenzij de aanvaller ook de DNS kon aanpassen.' },
        { q: 'Een oude, eenvoudige client controleert intrekking met soft-fail. Een aanvaller met de gelekte www-sleutel zet een nepserver op en blokkeert tegelijk het verkeer naar de OCSP-dienst. Wat doet de client met het ingetrokken certificaat (serial 6a:f0:13:0f)?', options: ['Hij accepteert het, omdat hij zonder antwoord doorgaat', 'Hij weigert het, omdat het in de CT-log staat', 'Hij weigert het, omdat de reden keyCompromise is', 'Hij accepteert het alleen als de CRL ook onbereikbaar is, en die staat op een andere server'], answer: 0,
          wrong: { 1: 'In de CT-log staan alle certificaten, ook geldige. CT zegt niets over intrekking.', 2: 'De reden staat in het OCSP-antwoord. Dat antwoord komt nooit aan.', 3: 'Een client die OCSP gebruikt, valt niet vanzelf terug op de CRL.' },
          explain: 'Soft-fail betekent: geen antwoord is goed nieuws. Wie het verkeer naar de responder kan blokkeren, en bij een man-in-the-middle kan dat vaak, zet intrekking zo buiten werking. Dat is een van de redenen dat certificaten korter geldig worden.' },
      ],
    },

    {
      title: 'Taak 4: Een TLS-scan lezen',
      tryFirst: true,
      intro: '<p>De webshop van Rietveld draait op een oudere server die buiten het geautomatiseerde beheer valt. Een collega heeft er een scan op losgelaten. Draai in het lab <code>tlscheck webshop.rietveld.nm.lab</code> en maak een lijst van alles wat niet in orde is. Rangschik daarna: wat moet vandaag, wat kan volgende week?</p>',
      content: `
        <p>Een TLS-scanner maakt verbinding met een server en probeert systematisch elke protocolversie en elke cipher
        suite. Bekende open-sourcetools zijn testssl.sh, SSLyze en de <code>ssl-enum-ciphers</code>-script van Nmap. Scan
        alleen systemen waarvoor je toestemming hebt. De uitvoer verschilt per tool, maar de onderdelen zijn
        steeds dezelfde.</p>
        <h3>Protocollen</h3>
        <p>De Mozilla-richtlijnen voor serverconfiguratie geven drie profielen. <strong>Modern</strong>: alleen TLS 1.3.
        <strong>Intermediate</strong>, de aanbeveling voor de meeste servers: TLS 1.2 en TLS 1.3. <strong>Old</strong>:
        alleen voor als je heel oude clients moet bedienen. SSL 2.0 en 3.0, TLS 1.0 en TLS 1.1 horen bij een gewone
        dienst uit te staan. Het NCSC geeft in zijn eigen TLS-richtlijnen een vergelijkbaar oordeel.</p>
        <h3>Cipher suites</h3>
        <p>Let bij TLS 1.2 op drie dingen in de naam van een suite:</p>
        <ul>
          <li><strong>Sleuteluitwisseling.</strong> <code>ECDHE</code> of <code>DHE</code> geeft forward secrecy.
          <code>TLS_RSA_WITH_...</code> niet.</li>
          <li><strong>Versleuteling.</strong> AEAD-modi zoals <code>GCM</code> en <code>CHACHA20_POLY1305</code> hebben de
          voorkeur. <code>CBC</code> is ouder en heeft een geschiedenis van aanvallen. <code>RC4</code> is gebroken en
          verboden (RFC 7465). <code>3DES</code> heeft blokken van 64 bits: bij lange verbindingen maakt dat een
          botsingsaanval mogelijk, bekend als Sweet32 (CVE-2016-2183).</li>
          <li><strong>Exportsuites en NULL.</strong> Alles met <code>EXPORT</code>, <code>NULL</code> of
          <code>anon</code> in de naam hoort er nooit tussen te staan.</li>
        </ul>
        <h3>Certificaat en extra's</h3>
        <ul>
          <li>Een certificaat dat binnenkort verloopt, is een storing met een aangekondigde datum. Handmatig beheerde
          certificaten zijn de klassieke oorzaak.</li>
          <li><strong>HSTS</strong> (<em>HTTP Strict Transport Security</em>, RFC 6797) is een HTTP-header die de browser
          opdraagt de site voortaan alleen via HTTPS te benaderen. Zonder HSTS kan een aanvaller op hetzelfde netwerk de
          eerste HTTP-aanvraag onderscheppen en het slachtoffer op onversleuteld HTTP houden.</li>
          <li><strong>OCSP stapling</strong> is gewenst, maar geen kritieke fout als het ontbreekt.</li>
        </ul>
        <h3>Prioriteren</h3>
        <p>Een scan geeft een lijst, geen prioriteit. Kijk per bevinding naar de gevolgen en naar de termijn: wat leidt
        binnenkort hoe dan ook tot uitval of misbruik, en wat is een verbetering? Overleg bij het uitzetten van oude
        protocollen met de eigenaar van de dienst: soms hangt er een oude koppeling of kassasysteem aan dat dan stopt.
        Dat is een reden om die koppeling te vervangen, niet om het protocol aan te laten.</p>
      `,
      lab: {
        type: 'terminal',
        shell: 'bash',
        user: 'student', host: 'rietveld-analist',
        home: '/home/student', cwd: '/home/student',
        motd: 'Scanwerkplek Rietveld (fictief). Toestemming voor de scan: wijzigingsverzoek RFC-2026-311. Typ: tlscheck webshop.rietveld.nm.lab',
        fs: {
          '/home/student/toestemming.txt': 'Wijzigingsverzoek RFC-2026-311\nScope: webshop.rietveld.nm.lab (203.0.113.40), poort 443\nVenster: 2026-11-12 09:00-12:00 UTC\nGoedgekeurd door: eigenaar webshop, I. Bulut\n',
        },
        commands: {
          'tlscheck webshop.rietveld.nm.lab': `tlscheck 2.3 (fictief lab-gereedschap)
doel: webshop.rietveld.nm.lab:443 (203.0.113.40)   datum: 2026-11-12 10:02 UTC

PROTOCOLLEN
  SSLv2      niet aangeboden
  SSLv3      niet aangeboden
  TLS 1.0    aangeboden
  TLS 1.1    aangeboden
  TLS 1.2    aangeboden
  TLS 1.3    niet aangeboden

CIPHER SUITES (TLS 1.2, volgorde van de server)
  0xC02F  TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256     kx=ECDH x25519  enc=AESGCM 128
  0xC030  TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384     kx=ECDH x25519  enc=AESGCM 256
  0x009C  TLS_RSA_WITH_AES_128_GCM_SHA256           kx=RSA          enc=AESGCM 128
  0x002F  TLS_RSA_WITH_AES_128_CBC_SHA              kx=RSA          enc=AES-CBC 128
  0x000A  TLS_RSA_WITH_3DES_EDE_CBC_SHA             kx=RSA          enc=3DES-CBC 168

CERTIFICAAT
  onderwerp       CN=webshop.rietveld.nm.lab
  SAN             webshop.rietveld.nm.lab
  uitgever        Fictief Vertrouwen TLS CA 2
  sleutel         RSA 2048 bits
  handtekening    sha256WithRSAEncryption
  geldig tot      2026-11-21 23:59 UTC
  keten           compleet (2 certificaten), eindigt bij Fictief Vertrouwen Root CA
  OCSP stapling   niet aangeboden

HTTP-HEADERS
  Strict-Transport-Security   ontbreekt

BEKENDE KWETSBAARHEDEN
  Heartbleed (CVE-2014-0160)      niet kwetsbaar
  POODLE SSL (CVE-2014-3566)      niet kwetsbaar (geen SSLv3)
  SWEET32 (CVE-2016-2183)         kwetsbaar (64-bits blokcijfer aangeboden)
  RC4 (RFC 7465)                  niet aangeboden

klaar in 14,2 s`,
        },
      },
      questions: [
        { q: 'Hoeveel aangeboden protocolversies moeten uit om aan het Mozilla-profiel Intermediate te voldoen?', answer: ['2', 'twee'],
          hints: ['Intermediate staat twee versies toe.', 'Kijk welke versies "aangeboden" zijn.', 'Twee aangeboden versies vallen buiten Intermediate.'],
          wrong: { '3': 'TLS 1.2 mag blijven. Alleen TLS 1.0 en 1.1 moeten uit.', '1': 'Zowel TLS 1.0 als TLS 1.1 is aangeboden, en beide zijn afgeschaft (RFC 8996).' },
          explain: 'TLS 1.0 en TLS 1.1 moeten uit. Daarnaast hoort TLS 1.3 aan, want Intermediate is TLS 1.2 plus TLS 1.3.' },
        { q: 'Hoeveel van de aangeboden cipher suites geven geen forward secrecy?', answer: ['3', 'drie'],
          hints: ['Forward secrecy hangt af van de sleuteluitwisseling.', 'Kijk naar kx= of naar het begin van de naam.', 'Tel de suites die beginnen met TLS_RSA_WITH_.'],
          wrong: { '1': 'Niet alleen de 3DES-suite: ook de andere suites met kx=RSA geven geen forward secrecy, ook al gebruiken ze AES-GCM.', '2': 'Ook TLS_RSA_WITH_AES_128_GCM_SHA256 heeft RSA-sleuteltransport. Een goede versleuteling verandert daar niets aan.' },
          explain: 'Drie: alle suites met kx=RSA. Laat in TLS 1.2 alleen ECDHE-suites met AES-GCM of ChaCha20-Poly1305 over.' },
        { q: 'Welke HTTP-header ontbreekt volgens de scan?', answer: ['Strict-Transport-Security', 'HSTS'],
          hints: ['Er is een apart blok voor HTTP-headers.', 'De header dwingt HTTPS af in de browser.', 'Afgekort HSTS.'],
          explain: 'Strict-Transport-Security. Zet hem met een lange max-age nadat je zeker weet dat alles onder het domein via HTTPS werkt.' },
        { q: 'Welke bevinding pak je vandaag als eerste aan?', options: ['Het certificaat vervangen en de vervanging automatiseren', 'De 3DES-suite verwijderen', 'OCSP stapling aanzetten', 'HSTS toevoegen'], answer: 0,
          wrong: { 1: 'Sweet32 vraagt heel veel verkeer binnen één verbinding en is lastig uit te buiten. Moet weg, maar heeft niet de kortste termijn.', 2: 'Stapling is een verbetering, geen dringende fout.', 3: 'HSTS is belangrijk, maar zonder geldig certificaat zou je klanten met HSTS juist volledig buitensluiten.' },
          why: 'Verlopen certificaten zijn een van de bekendste oorzaken van grote storingen, ook bij grote organisaties. De oorzaak is bijna altijd hetzelfde: handmatig beheer en niemand die eigenaar is van de datum.',
          explain: 'Over negen dagen verloopt het certificaat en ligt de webshop eruit voor elke klant. Dat heeft de kortste termijn en de grootste gevolgen. Daarna in één wijziging: TLS 1.0 en 1.1 uit, TLS 1.3 aan, RSA-suites weg, HSTS erbij.' },
      ],
    },

    {
      title: 'Taak 5: Sleutelbeheer en de certificaatinventaris',
      tryFirst: true,
      intro: '<p>Na het sleutellek van oktober heeft Rietveld een inventaris laten maken van alle certificaten op alle servers, met een vingerafdruk van elke publieke sleutel. In het lab staat het resultaat. Zoek wat er de komende weken misgaat, wat niet aan de eisen voldoet, en of het lek echt is opgeruimd.</p>',
      content: `
        <p>Een certificaat is publiek. De waarde zit in de <strong>private sleutel</strong> die erbij hoort: wie die
        heeft, kan zich voordoen als de server. Sleutelbeheer gaat over de hele levenscyclus van die sleutel, van
        aanmaken tot vernietigen. NIST SP 800-57 is de standaardreferentie voor sleutelbeheer in het algemeen.</p>
        <h3>De levenscyclus</h3>
        <ol>
          <li><strong>Aanmaken.</strong> De sleutel wordt gemaakt op de server zelf, of in een <strong>HSM</strong>
          (<em>hardware security module</em>) of sleutelkluis. Daarna maak je een <strong>CSR</strong> (<em>certificate
          signing request</em>) met de publieke sleutel en de namen. Alleen de CSR gaat naar de CA. De private sleutel
          verlaat de server niet, en hoort niet in mail, tickets of een coderepository.</li>
          <li><strong>Gebruiken en bewaren.</strong> Alleen de webserverdienst mag het sleutelbestand lezen (op Linux
          bijvoorbeeld rechten 600). Kies voldoende sterkte: RSA van minstens 2048 bits of een elliptische kromme als
          P-256.</li>
          <li><strong>Vernieuwen.</strong> Maak bij elke vernieuwing een <em>nieuwe</em> sleutel. Wie de oude sleutel
          hergebruikt, verlengt ook een eventueel lek.</li>
          <li><strong>Intrekken en vernietigen.</strong> Bij een vermoeden van een lek laat je het certificaat intrekken
          met reden keyCompromise, en verwijder je de sleutel overal waar hij stond.</li>
        </ol>
        <h3>Inventaris en automatisering</h3>
        <p>Je kunt niet beheren wat je niet kent. Een <strong>certificaatinventaris</strong> zegt per host welk
        certificaat er draait, wie de uitgever is, tot wanneer het geldig is, wie de eigenaar is en hoe het wordt
        vernieuwd. Bronnen: netwerkscans, de CT-logs van taak 3 en de administratie van je CA's.</p>
        <p>Met <strong>ACME</strong> (RFC 8555) vraagt een programma op de server zelf certificaten aan en vernieuwt
        het ze automatisch, ruim voor het einde van de geldigheid, telkens met een nieuwe sleutel. Dat wordt steeds
        minder optioneel: het CA/Browser Forum heeft besloten de maximale geldigheid van publiek vertrouwde
        certificaten stapsgewijs te verkorten, van 398 dagen naar 200 dagen sinds maart 2026, en verder naar 47 dagen
        in 2029. Handmatig vernieuwen elke anderhalve maand houdt niemand vol.</p>
        <h3>Een gedeelde sleutel is een gedeeld lek</h3>
        <p>Een wildcardcertificaat of één sleutel op meerdere servers is handig, maar het lek van één server is dan het
        lek van allemaal. Om te zien welke servers dezelfde sleutel gebruiken, vergelijk je niet het certificaat maar
        de <strong>vingerafdruk van de publieke sleutel</strong>: een hash over het veld Subject Public Key Info (SPKI).
        Twee certificaten met verschillende serienummers en datums kunnen dezelfde SPKI-hash hebben, en dan delen ze
        de private sleutel.</p>
        <h3>Interne certificaten</h3>
        <p>Voor interne systemen gebruik je een <strong>interne CA</strong>: een root die offline staat, een tussen-CA
        die uitgeeft, en een root die via het werkplekbeheer op alle apparaten staat. Zelfondertekende certificaten
        horen alleen in een testomgeving. In productie leren ze gebruikers om waarschuwingen weg te klikken, en dat is
        precies wat een aanvaller nodig heeft.</p>
      `,
      lab: {
        type: 'logs',
        title: 'certificaatinventaris-2026-11-12.txt',
        lines: `host                         uitgever                        sleutel     spki-sha256   geldig-tot   vernieuwing  eigenaar
www.rietveld.nm.lab          Fictief Vertrouwen TLS CA 2     EC P-256    9f3a..c41     2027-04-03   ACME         webteam
portaal.rietveld.nm.lab      Fictief Vertrouwen TLS CA 2     EC P-256    1b77..e02     2027-02-18   ACME         webteam
api.klant.rietveld.nm.lab    Fictief Vertrouwen TLS CA 2     EC P-256    1b77..e02     2027-02-18   ACME         webteam
mail.rietveld.nm.lab         Fictief Vertrouwen TLS CA 2     EC P-256    5c90..a7d     2027-03-12   ACME         ict-beheer
vpn.rietveld.nm.lab          Fictief Vertrouwen TLS CA 2     RSA 2048    e4d2..7b9     2026-12-20   handmatig    b.koster
webshop.rietveld.nm.lab      Fictief Vertrouwen TLS CA 2     RSA 2048    0a6c..f15     2026-11-21   handmatig    I. Bulut
printbeheer.rietveld.nm.lab  Rietveld Interne Uitgevende CA  RSA 2048    8812..b40     2026-11-30   handmatig    ict-beheer
intranet.rietveld.nm.lab     CN=intranet.rietveld.nm.lab     RSA 1024    c3e7..19a     2034-01-01   geen         onbekend
backup-beheer.rietveld.nm.lab Rietveld Interne Uitgevende CA RSA 3072    44bd..e8f     2027-09-30   intern ACME  ict-beheer
login.rietveld.nm.lab        (niet gevonden op eigen servers)  -          -             -            -            -`,
      },
      questions: [
        { q: 'Hoeveel certificaten in de inventaris verlopen binnen 30 dagen, dus vóór 12 december 2026?', answer: ['2', 'twee'],
          hints: ['Filter niet, lees de kolom geldig-tot.', 'Vergelijk elke datum met 2026-12-12.', 'De VPN verloopt op 20 december: dat is net buiten de 30 dagen.'],
          wrong: { '3': 'vpn.rietveld.nm.lab verloopt op 20 december, na 12 december. Het hoort wel op de lijst voor volgende maand.', '1': 'Ook printbeheer verloopt nog in november. Een intern certificaat verloopt net zo hard.' },
          explain: 'webshop (21 november) en printbeheer (30 november). Beide worden handmatig vernieuwd: dat is het patroon.' },
        { q: 'Welke host draait een zelfondertekend certificaat met een sleutel die te kort is?', answer: ['intranet.rietveld.nm.lab', 'intranet'],
          hints: ['Bij een zelfondertekend certificaat is de uitgever het certificaat zelf.', 'Kijk welke uitgever geen CA is maar een CN met een hostnaam.', 'Dezelfde host heeft ook de kleinste RSA-sleutel.'],
          wrong: { 'printbeheer.rietveld.nm.lab': 'Printbeheer heeft een certificaat van de interne CA, met RSA 2048. Dat is in orde, al verloopt het binnenkort.' },
          explain: 'intranet.rietveld.nm.lab: uitgever is het certificaat zelf, RSA 1024, tien jaar geldig, geen eigenaar. Vervangen door een certificaat van de interne CA met een eigenaar en automatische vernieuwing.' },
        { q: 'Boss: Rietveld meldde in oktober dat het sleutellek was opgelost, omdat www een nieuw certificaat heeft. Welke host gebruikt nog steeds de gelekte private sleutel?', boss: true, answer: ['vpn.rietveld.nm.lab', 'vpn'],
          hints: ['Welk certificaat is in taak 3 ingetrokken met reden keyCompromise, en welke spki hoorde daarbij?', 'Zoek die spki-waarde in de inventaris.', 'Dezelfde beheerder vroeg twee certificaten handmatig aan, vijf weken na elkaar.'],
          wrong: { 'www.rietveld.nm.lab': 'www heeft een nieuw certificaat met een nieuwe sleutel (spki 9f3a..c41). Daar is het lek wel opgelost.', 'login.rietveld.nm.lab': 'Dat ongewenste certificaat heeft een andere sleutel (d018..3e6). Het is een tweede probleem, geen restant van het lek.', 'api.klant.rietveld.nm.lab': 'api.klant deelt een sleutel met portaal, maar dat is niet de gelekte sleutel.' },
          why: 'Een certificaat vervangen lost een sleutellek niet op als dezelfde sleutel ook ergens anders draait. Wie op de SPKI zoekt, vindt de plekken die een zoektocht op hostnaam of serienummer mist.',
          explain: 'Het ingetrokken www-certificaat (serial 6a:f0:13:0f) had spki e4d2..7b9. Het VPN-certificaat uit juni heeft dezelfde spki: b.koster gebruikte één sleutel voor beide. Het VPN-certificaat is zelf niet ingetrokken (OCSP: good), dus wie de gelekte sleutel heeft, kan zich voordoen als de VPN-server. Nieuwe sleutel maken, nieuw certificaat, het oude intrekken met keyCompromise.' },
      ],
    },

    {
      title: 'Taak 6: Verdieping: waarom certificaten steeds korter leven',
      kind: 'verdieping',
      optional: true,
      content: `
        <p>Je zag in taak 3 dat intrekking in de praktijk zwak is. Er zijn drie redenen. Ten eerste soft-fail: een
        client die geen antwoord krijgt van de OCSP-dienst, gaat meestal door, omdat een harde weigering bij elke
        storing van een CA het halve internet onbereikbaar zou maken. Ten tweede privacy: een OCSP-vraag vertelt de CA
        welke site je bezoekt. Ten derde schaal: CRL's van grote CA's kunnen groot worden, en niet elke client haalt ze
        op of houdt ze bij.</p>
        <p>Browsermakers hebben daarom eigen mechanismen gebouwd. Ze verzamelen intrekkingen centraal en sturen
        compacte lijsten naar de browser, vaak alleen voor een selectie van belangrijke intrekkingen. Dat werkt beter
        dan OCSP, maar het blijft een lapmiddel: de beslissing of een certificaat te vertrouwen is, hangt dan af van de
        updatefrequentie van de browser.</p>
        <p>De structurele oplossing is anders: zorg dat een certificaat zo kort leeft dat intrekking minder uitmaakt. Als
        een certificaat na een lek nog maximaal een paar weken geldig is, is het venster voor misbruik klein, ook als
        geen enkele client de intrekking ziet. Het CA/Browser Forum heeft daarom in 2025 een schema aangenomen dat de
        maximale geldigheid van publiek vertrouwde TLS-certificaten in stappen verlaagt: 200 dagen vanaf maart 2026,
        100 dagen vanaf maart 2027 en 47 dagen vanaf maart 2029. Ook de periode waarin een CA een eerdere
        domeinvalidatie mag hergebruiken, wordt korter.</p>
        <p>Voor beheerders betekent dit één ding: automatiseer. ACME (RFC 8555) is daarvoor de open standaard, en de
        meeste webservers, loadbalancers en cloudplatforms ondersteunen het. Automatisering lost ook het probleem uit taak
        5 op: een ACME-client maakt bij elke vernieuwing een verse sleutel, zodat een lek vanzelf verloopt.</p>
        <p>Er is een tweede reden om te automatiseren, op langere termijn. Cryptografie verandert. NIST publiceerde in
        2024 de eerste standaarden voor post-kwantumcryptografie (FIPS 203 tot en met 205), en er wordt gewerkt aan
        hybride sleuteluitwisseling in TLS 1.3, waarbij een klassieke en een post-kwantummethode samen worden gebruikt.
        Wie zijn certificaten en sleutels al automatisch beheert, kan zo'n overstap uitrollen zonder elke server met de
        hand langs te gaan. Dat vermogen heet <strong>crypto-agility</strong>.</p>
        <div class="callout info"><strong>Interne PKI:</strong> de regels van het CA/Browser Forum gelden voor publiek
        vertrouwde certificaten. Voor je eigen interne CA stel je zelf de termijn vast. Kies daar ook voor kort en
        automatisch; dezelfde argumenten gelden.</div>
      `,
      questions: [
        { q: 'Een certificaat met de oude maximale geldigheid van 398 dagen lekt uit op dag 30 van zijn geldigheid. Een client die intrekking niet controleert, vertrouwt het nog tot het verloopt. Hoeveel dagen is dat nog?', answer: ['368'],
          hints: ['De client vertrouwt het tot het einde van de geldigheid.', 'Trek de verstreken dagen af van de totale geldigheid.', '398 min 30.'],
          wrong: { '398': 'Er zijn al 30 dagen voorbij als het lek gebeurt.', '30': 'Dat is hoe lang het certificaat al in gebruik was.' },
          explain: '398 - 30 = 368 dagen misbruikvenster voor clients die de intrekking niet zien.' },
        { q: 'Hetzelfde lek, maar het certificaat had een geldigheid van 47 dagen. Hoeveel dagen blijft het venster dan over?', answer: ['17'],
          hints: ['Zelfde berekening, andere totale geldigheid.', '47 min 30.', 'Minder dan drie weken.'],
          wrong: { '47': 'Ook hier zijn er al 30 dagen voorbij.', '368': 'Dat is het antwoord bij 398 dagen.' },
          why: 'Korte geldigheid maakt van een slecht werkend intrekkingssysteem een minder groot probleem. Daarom drukken browsermakers en CA\'s er samen op.',
          explain: '47 - 30 = 17 dagen. Ruim twintig keer korter, zonder dat clients iets anders hoeven te doen.' },
      ],
    },

    {
      title: 'Taak 7: Zo komt dit voor op een examen',
      kind: 'examen',
      optional: true,
      content: `
        <p>Examens als Security+ en ISC2 CC vragen bij PKI zelden naar velden of RFC-nummers. Ze schetsen een
        situatie en vragen welk mechanisme het probleem oplost of verklaart. De afleiders zijn echte mechanismen die
        een ander probleem oplossen: intrekking waar transparantie gevraagd wordt, versleuteling waar authenticatie
        gevraagd wordt. Vraag je bij elke vraag af: gaat het om <em>vertrouwelijkheid</em>, om <em>identiteit</em>, om
        <em>intrekking</em> of om <em>zichtbaarheid</em>?</p>
        <h3>Drie valkuilen</h3>
        <ul>
          <li><strong>Pinning en stapling.</strong> Ze klinken hetzelfde. Stapling gaat over de intrekkingsstatus,
          pinning over welke sleutel een client verwacht.</li>
          <li><strong>Wie tekent wat.</strong> Een CA tekent certificaten met haar private sleutel. De server tekent in de
          handshake met de zijne. De client heeft alleen publieke sleutels nodig.</li>
          <li><strong>Sterker is niet altijd het antwoord.</strong> Een langere sleutel helpt niet tegen een verlopen
          certificaat of een ontbrekende keten.</li>
        </ul>
        <p>Warm op met het lab: groepeer de zestien begrippen. De vijf vragen zijn zelf geschreven in examenstijl. Alle
        organisaties zijn fictief.</p>
      `,
      lab: {
        type: 'connections',
        prompt: 'Groepeer de zestien begrippen in vier groepen van vier.',
        groups: [
          { name: 'Berichten in de TLS 1.3-handshake', items: ['ClientHello', 'ServerHello', 'CertificateVerify', 'Finished'] },
          { name: 'Intrekking en zichtbaarheid', items: ['OCSP', 'CRL', 'OCSP stapling', 'Certificate Transparency'] },
          { name: 'Velden en extensies in een X.509-certificaat', items: ['Subject Alternative Name', 'Basic Constraints', 'Authority Information Access', 'Not After'] },
          { name: 'Uitzetten op een server', items: ['SSL 3.0', 'TLS 1.0', 'RC4', '3DES'] },
        ],
      },
      questions: [
        { q: 'Een fictieve gemeente krijgt een melding dat een onbekende partij een geldig certificaat heeft voor inloggen.gemeente-x.example, een naam die de gemeente zelf nooit heeft aangevraagd. Welk mechanisme heeft dit vrijwel zeker zichtbaar gemaakt?',
          options: ['OCSP stapling', 'Certificate Transparency-monitoring', 'Een CRL van de eigen CA', 'HSTS-preloading'], answer: 1,
          wrong: { 0: 'Stapling levert de intrekkingsstatus van het eigen certificaat in de handshake. Het meldt niets over certificaten die anderen hebben.', 2: 'Een CRL bevat alleen ingetrokken certificaten van die ene CA. Dit certificaat is niet ingetrokken en komt misschien van een andere CA.', 3: 'HSTS dwingt HTTPS af in de browser. Het zegt niets over wie welk certificaat heeft.' },
          explain: 'Publiek vertrouwde certificaten moeten in CT-logs staan. Een monitor op de eigen domeinnamen ziet elk nieuw certificaat, ook dat van een ander.' },
        { q: 'Een fictieve webwinkel wil dat opgenomen verkeer onleesbaar blijft, ook als de private sleutel van de server over twee jaar uitlekt. Welke instelling is daarvoor nodig?',
          options: ['Een RSA-sleutel van 4096 bits', 'Alleen cipher suites met tijdelijke (EC)DHE-sleuteluitwisseling', 'Een certificaat met Extended Validation', 'OCSP stapling met Must-Staple'], answer: 1,
          wrong: { 0: 'Een langere sleutel is moeilijker te kraken, maar als hij uitlekt, opent hij bij RSA-sleuteltransport nog steeds alle opgenomen sessies.', 2: 'Extended Validation zegt iets over de identiteitscontrole bij uitgifte, niets over de sleuteluitwisseling.', 3: 'Intrekking beschermt tegen toekomstig misbruik van de sleutel, niet tegen het ontsleutelen van verkeer uit het verleden.' },
          explain: 'Forward secrecy: per verbinding een tijdelijk sleutelpaar. TLS 1.3 doet dit altijd, in TLS 1.2 kies je de ECDHE-suites.' },
        { q: 'Na de migratie naar een nieuwe loadbalancer werkt een fictieve website in de browser van de beheerder, maar meldt een partnerkoppeling "unable to get local issuer certificate". Wat is de meest waarschijnlijke oorzaak?',
          options: ['Het certificaat is verlopen', 'De loadbalancer stuurt het tussencertificaat niet mee', 'De partner gebruikt TLS 1.3', 'Het certificaat is ingetrokken'], answer: 1,
          wrong: { 0: 'Dan zou ook de browser van de beheerder een fout geven, en de melding zou over de geldigheid gaan.', 2: 'TLS 1.3 verandert niets aan de ketencontrole, en de melding gaat over een ontbrekende uitgever.', 3: 'Een ingetrokken certificaat geeft een andere melding, en de browser zou het ook weigeren.' },
          explain: 'De client kan geen pad naar een root bouwen. Browsers vullen het tussencertificaat soms zelf aan, servers en apps niet.' },
        { q: 'Een fictieve beheerder ontdekt dat de private sleutel van een webserver per ongeluk in een openbare coderepository heeft gestaan. Wat is de juiste volgorde van maatregelen?',
          options: ['Een nieuwe sleutel en een nieuw certificaat maken, de nieuwe installeren, het oude certificaat laten intrekken met reden keyCompromise, en nagaan waar de oude sleutel nog meer draait', 'Het oude certificaat verlengen bij de CA met dezelfde CSR', 'De repository privé maken; dan is het lek gedicht', 'Het sleutelbestand op de server versleutelen met een wachtwoord'], answer: 0,
          wrong: { 1: 'Met dezelfde CSR krijgt het nieuwe certificaat dezelfde publieke sleutel, en dus dezelfde gelekte private sleutel.', 2: 'Wat openbaar heeft gestaan, kan al gekopieerd zijn. Privé maken voorkomt nieuwe kopieën, niet het misbruik van bestaande.', 3: 'Dat beschermt de sleutel op de server, maar de gelekte kopie blijft bruikbaar.' },
          explain: 'Een gelekte sleutel is verbrand: vervangen, intrekken, en zoeken naar hergebruik, bijvoorbeeld via de SPKI-hash.' },
        { q: 'Een fictief bedrijf wil voorkomen dat een willekeurige publieke CA zich laat overhalen om certificaten voor zijn domein uit te geven. Welke maatregel past het beste?',
          options: ['Een CAA-record in DNS dat alleen de eigen CA toestaat', 'HSTS met een lange max-age', 'Een wildcardcertificaat voor alle subdomeinen', 'OCSP stapling op alle servers'], answer: 0,
          wrong: { 1: 'HSTS dwingt HTTPS af, maar een aanvaller met een geldig certificaat voldoet daar gewoon aan.', 2: 'Een wildcard is een certificaat dat het bedrijf zelf heeft. Het houdt een andere CA niet tegen.', 3: 'Stapling gaat over de intrekkingsstatus van je eigen certificaten, niet over wie mag uitgeven.' },
          explain: 'Publieke CA\'s moeten het CAA-record controleren voordat ze uitgeven. CT-monitoring is de aanvulling: zien wat er toch doorheen glipt.' },
      ],
    },
  ],

  terms: [
    { term: 'TLS 1.3', def: 'Huidige versie van Transport Layer Security (RFC 8446, 2018). Volledige handshake in één keer heen en weer, altijd met (EC)DHE, en het certificaat gaat versleuteld over de lijn.' },
    { term: 'Cipher suite', def: 'Afgesproken combinatie van algoritmen voor een TLS-verbinding. In TLS 1.2 inclusief sleuteluitwisseling, in TLS 1.3 alleen versleuteling en hash.' },
    { term: 'Forward secrecy', def: 'Eigenschap waarbij een later gelekte private sleutel van de server niet helpt om eerder opgenomen sessies te ontsleutelen, dankzij tijdelijke (EC)DHE-sleutels per verbinding.' },
    { term: 'Certificaatketen', def: 'Reeks certificaten van het servercertificaat via een of meer tussen-CA\'s tot een vertrouwde root-CA. De server stuurt zijn eigen certificaat plus de tussencertificaten mee.' },
    { term: 'Subject Alternative Name', def: 'Extensie in een X.509-certificaat met de namen waarvoor het geldt. Browsers kijken alleen naar dit veld; een wildcard dekt precies één label.' },
    { term: 'OCSP', def: 'Online Certificate Status Protocol (RFC 6960): per certificaat aan de CA vragen of het is ingetrokken. Bij stapling stuurt de server het ondertekende antwoord zelf mee.' },
    { term: 'CRL', def: 'Certificate Revocation List: door de CA ondertekende lijst met serienummers van ingetrokken certificaten (RFC 5280).' },
    { term: 'Certificate Transparency', def: 'Openbare, alleen-toevoegen logs waarin CA\'s elk publiek vertrouwd certificaat moeten zetten (RFC 6962). Domeineigenaren kunnen zo ongewenste uitgifte zien.' },
    { term: 'CAA-record', def: 'DNS-record waarmee een domeineigenaar vastlegt welke CA\'s certificaten voor het domein mogen uitgeven (RFC 8659).' },
    { term: 'SPKI-hash', def: 'Vingerafdruk van de publieke sleutel in een certificaat. Gelijke SPKI-hash bij twee certificaten betekent dat ze dezelfde private sleutel delen.' },
  ],

  resources: [
    { title: 'RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3', url: 'https://www.rfc-editor.org/rfc/rfc8446' },
    { title: 'RFC 5280: Internet X.509 Public Key Infrastructure Certificate and CRL Profile', url: 'https://www.rfc-editor.org/rfc/rfc5280' },
    { title: 'Mozilla: Server Side TLS (aanbevolen configuraties)', url: 'https://wiki.mozilla.org/Security/Server_Side_TLS' },
    { title: 'RFC 6962: Certificate Transparency', url: 'https://www.rfc-editor.org/rfc/rfc6962' },
  ],
});
