#!/usr/bin/env node
/* Labtest voor het leerpad Meesterproeven: de Vigenère-werkbank, de many-time pad,
 * de RSA-werkbank en de Nachtwacht-VM, plus de antwoorden van de rooms die ze gebruiken.
 * Gebruik: node tools/labtest-meester.js */
const path = require('path');
const { chromium } = require('./_playwright');
const url = 'file://' + path.join(__dirname, '..', 'index.html');

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const fails = [];
  p.on('pageerror', (e) => fails.push('pageerror: ' + e.message));
  const ok = (n, c) => { console.log((c ? '  ✓ ' : '  ✗ ') + n); if (!c) fails.push(n); };
  const text = (sel) => p.$eval(sel, (e) => e.textContent).catch(() => '');

  // Vigenère-werkbank: bericht 1 kraakt automatisch, bericht 2 pas na de correctie van één sleutelletter.
  await p.goto(url + '#/room/cryptanalyse-vigenere', { waitUntil: 'networkidle' });
  await p.waitForSelector('.lab');
  const vig = await p.evaluate(() => [...document.querySelectorAll('.task')].map((t, i) => (t.querySelector('textarea') && /Vigenère-werkbank/.test(t.textContent) ? i : -1)).filter((i) => i >= 0));
  ok('Cryptanalyse-room heeft twee Vigenère-werkbanken', vig.length === 2);
  if (vig.length === 2) {
    ok('Bericht 1: automatische sleutel geeft de vlag', /NM\{kasiski_breekt_vigenere\}/.test(await text('#task-' + vig[0] + ' .lab-out')));
    const before = await text('#task-' + vig[1] + ' .lab-out');
    ok('Bericht 2: automatische sleutel heeft nog een fout (twijfelgeval)', !/harde schijven/.test(before));
    const keyInp = await p.$('#task-' + vig[1] + ' .ans-row input[type=text]');
    await keyInp.fill('SPIEGELPALEIS');
    await p.waitForTimeout(100);
    ok('Bericht 2: gecorrigeerde sleutel SPIEGELPALEIS leest vloeiend', /harde schijven/.test(await text('#task-' + vig[1] + ' .lab-out')));
  }

  // Many-time pad: met de juiste reconstructie van bericht 1 verschijnt bericht 2.
  const mtp = await p.evaluate(() => [...document.querySelectorAll('.task')].findIndex((t) => /Many-time pad/.test(t.textContent) && t.querySelector('.lab')));
  ok('Many-time pad aanwezig', mtp >= 0);
  if (mtp >= 0) {
    const tas = await p.$$('#task-' + mtp + ' .lab textarea');
    await tas[tas.length - 1].fill('de betaling gaat morgen via de mixer naar wallet NM{many_time_pad_lekt}');
    await p.waitForTimeout(100);
    const r = await text('#task-' + mtp + ' .lab-out');
    ok('Many-time pad: bericht 2 bevat "de oude loods"', /de oude loods/.test(r));
  }

  // Forensie-room: de tijdstempels uit taak 2 rekenen om naar de antwoorden.
  await p.goto(url + '#/room/forensie-misleiding', { waitUntil: 'networkidle' });
  await p.waitForSelector('.lab');
  const ts = await p.evaluate(() => [...document.querySelectorAll('.task')].findIndex((t) => /Eén tijdlijn, vijf klokken/.test(t.textContent)));
  if (ts >= 0) {
    const inp = await p.$('#task-' + ts + ' .lab input[type=text], #task-' + ts + ' .lab textarea');
    for (const [val, want, name] of [['134339084490000000', '01:14:09', 'FILETIME'], ['13433909070000000', '01:24:30', 'WebKit']]) {
      await inp.fill(val); await p.waitForTimeout(100);
      ok('Tijdstempel ' + name + ' ' + val + ' → ' + want + ' UTC', (await text('#task-' + ts + ' .lab')).includes(want));
    }
  } else ok('Tijdstempeltaak in forensie-room', false);

  // Benford: de referentie is aanvaardbaar, de inkoopfacturen hebben te veel vieren.
  await p.goto(url + '#/room/fraude-in-de-cijfers', { waitUntil: 'networkidle' });
  await p.waitForSelector('.lab');
  const bf = await p.evaluate(() => [...document.querySelectorAll('.task')].findIndex((t) => /Benford-analyse/.test(t.textContent) && t.querySelector('.lab')));
  ok('Benford-lab aanwezig', bf >= 0);
  if (bf >= 0) {
    ok('Benford: referentiejaar geeft "aanvaardbare overeenkomst"', /aanvaardbare overeenkomst/.test(await text('#task-' + bf + ' .lab-out')));
    await p.click('#task-' + bf + ' .chip:has-text("Inkoopfacturen")');
    const inkoop = await text('#task-' + bf + ' .lab-out');
    ok('Benford: inkoopfacturen hebben cijfer 4 sterkst oververtegenwoordigd', /cijfer 4 \(\+22\.0/.test(inkoop) && /geen overeenkomst/.test(inkoop));
  }

  // Bayes: de kansen uit de rooms (84% insider, 16% en 92% bij de dreigmail).
  const bayesFinal = async (room, title, boxes) => {
    await p.goto(url + '#/room/' + room, { waitUntil: 'networkidle' });
    await p.waitForSelector('.lab');
    const ti = await p.evaluate((t) => [...document.querySelectorAll('.task')].findIndex((x) => x.querySelector('.lab') && x.textContent.includes(t)), title);
    const cbs = await p.$$('#task-' + ti + ' .lab input[type=checkbox]');
    for (const i of boxes) await cbs[i].check();
    return text('#task-' + ti + ' .lab-out');
  };
  ok('Bayes: insider 84,00% na drie bewijsstukken', /\+ MFA\s+Insider 84\.00%/.test(await bayesFinal('redeneren-met-kansen', 'Gemeente Zeeweide', [0, 1, 2])));
  ok('Bayes: crimineel 83,33% na alleen de brief', /Crimineel 83\.33%/.test(await bayesFinal('redeneren-met-kansen', 'Ingenieursbureau', [0])));
  ok('Bayes: dreigmail 15,97% na het IP-bewijs', /Hp \(P\.\) 15\.97%/.test(await bayesFinal('bewijs-in-de-rechtszaal', 'De dreigmail', [0])));
  ok('Bayes: dreigmail 91,94% na beide bewijsstukken', /Hp \(P\.\) 91\.94%/.test(await bayesFinal('bewijs-in-de-rechtszaal', 'De dreigmail', [0, 1])));

  // Gereedschapskist: RSA-werkbank en Nachtwacht-VM.
  await p.goto(url + '#/tools', { waitUntil: 'networkidle' });
  await p.waitForSelector('#tool-rsa');
  await p.click('#tool-rsa button:has-text("Proefdeling")');
  await p.waitForTimeout(150);
  const rsa = await text('#tool-rsa .lab-out');
  ok('RSA: proefdeling factoriseert 3233 en vindt d = 2753', /= 2753/.test(rsa));
  ok('RSA: c = 2790 ontsleutelt naar "A" (65)', /m = c\^d mod n = 65\b/.test(rsa));

  const vmIn = await p.$('#tool-vm .ans-row input[type=text]');
  await vmIn.fill('NOM'); await p.click('#tool-vm button:has-text("Uitvoeren")'); await p.waitForTimeout(100);
  ok('VM: verkeerde invoer wordt geweigerd', /GEWEIGERD/.test(await text('#tool-vm .lab-out')));
  await vmIn.fill('nom'); await p.click('#tool-vm button:has-text("Uitvoeren")'); await p.waitForTimeout(100);
  ok('VM: juiste invoer krijgt toegang', /TOEGANG VERLEEND/.test(await text('#tool-vm .lab-out')));
  await p.click('#tool-vm button:has-text("Reset")');
  for (let i = 0; i < 3; i++) await p.click('#tool-vm button:has-text("Stap")');
  ok('VM: stap-modus houdt een trace bij', (await p.$$('#tool-vm .logview .ln')).length > 3);

  await b.close();
  if (fails.length) { console.log('\n✗ ' + fails.length + ' mislukt'); process.exit(1); }
  console.log('\n✓ Alle Meesterproeven-labtests geslaagd');
})();
