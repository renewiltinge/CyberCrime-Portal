#!/usr/bin/env node
/* Test de spelmechanieken: dagpuzzel en weekopdracht, rangen, badges, zwakke plekken,
 * arena-modi, "Check jezelf" en de resultaatkaart. Controleert ook dat geen van die
 * pagina's op 390 px horizontaal scrolt.
 * Gebruik: node tools/labtest-spel.js [--shots map]   (schermafbeeldingen, licht en donker) */
const path = require('path');
const fs = require('fs');
const { chromium } = require('./_playwright');
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const LS = 'nineminds-cyber-dojo-v1';
const shotDir = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const fails = [];
  page.on('pageerror', (e) => fails.push('pageerror: ' + e.message));
  const ok = (name, cond) => { console.log((cond ? '  ✓ ' : '  ✗ ') + name); if (!cond) fails.push(name); };
  const state = () => page.evaluate((k) => JSON.parse(localStorage.getItem(k)), LS);
  const open = async (hash) => { await page.goto(url + '#/', { waitUntil: 'networkidle' }); await page.evaluate((h) => window.CS.go(h), hash); await page.waitForTimeout(150); };

  // ---- Dagpuzzel: elke soort is oplosbaar met het antwoord dat de generator zelf geeft
  await open('#/puzzel');
  const kinds = await page.evaluate(() => {
    const seen = {};
    for (let seed = 20260101; seed < 20260400; seed++) {
      const p = window.CS.puzzle.makePuzzle(seed);
      if (!p.answer[0] || !p.q) return 'kapot bij ' + seed;
      seen[p.kind] = true;
    }
    return Object.keys(seen).sort().join(',');
  });
  ok('Dagpuzzel: acht soorten, elk met vraag en antwoord (' + kinds + ')', kinds.split(',').length === 8);
  const same = await page.evaluate(() => JSON.stringify(window.CS.puzzle.makePuzzle(20261112)) === JSON.stringify(window.CS.puzzle.makePuzzle(20261112)));
  ok('Dagpuzzel is deterministisch per datum', same);

  const answers = await page.evaluate(() => {
    const d = new Date();
    const key = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    return [window.CS.puzzle.makePuzzle(parseInt(key, 10)).answer[0], window.CS.puzzle.makeWeekly(window.CS.puzzle.isoWeek(d)).answer[0]];
  });
  const cards = await page.$$('.quizcard');
  const solve = async (card, v) => { const i = await card.$('input'); await i.fill(v); await i.press('Enter'); await page.waitForTimeout(700); };
  await solve(cards[0], 'zeker-fout');
  ok('Dagpuzzel: fout antwoord mag opnieuw', !(await (await cards[0].$('input')).isDisabled()));
  await solve(cards[0], answers[0]);
  await solve(cards[1], answers[1]);
  let st = await state();
  ok('Dagpuzzel opgelost: reeks 1, +15 XP', st.puzzle.streak === 1 && st.puzzle.total === 1);
  ok('Weekopdracht opgelost: vlag geteld, 55 XP totaal', st.puzzle.weeks === 1 && st.xp === 55 && /^NM\{week_\d\d_[a-z]+\}$/.test(answers[1]));
  ok('Badge Weekopdracht verdiend', !!st.badges['week-1']);
  await open('#/puzzel');
  ok('Na herladen staat de puzzel van vandaag op opgelost', await (await page.$('.quizcard input')).isDisabled());

  // ---- Zwakke plekken en de arena
  await page.evaluate((k) => {
    const s = JSON.parse(localStorage.getItem(k));
    s.miss = { 'netwerken-basis::1::0': 3, 'netwerken-basis::2::0': 1, 'logs-detectie::1::0': 1 };
    s.answered = { 'netwerken-basis::1::0': true };
    localStorage.setItem(k, JSON.stringify(s));
  }, LS);
  await page.reload({ waitUntil: 'networkidle' });
  await open('#/scorebord');
  const weak = await page.textContent('table.weak');
  ok('Scorebord toont zwakke plekken per onderwerp', weak.includes('Fundamenten') && weak.includes('Defensief') && weak.includes('Oefen dit'));
  ok('Scorebord toont de rang', (await page.textContent('.rankline')).includes('Nieuwkomer'));
  await page.click('table.weak a.btn');
  await page.waitForSelector('.quizcard');
  ok('"Oefen dit" opent de arena op gemiste vragen', (await page.textContent('#app')).includes('eerder fout had'));
  await page.click('.chip-row .chip:has-text("Survival")');
  const first = await page.$('.quizcard');
  if (await first.$('.mc')) { await page.evaluate(() => { const b = document.querySelectorAll('.quizcard .mc button'); b[0].click(); }); }
  else { const i = await first.$('input'); await i.fill('zeker-fout'); await i.press('Enter'); }
  await page.waitForTimeout(1700);
  const body = await page.textContent('#app');
  ok('Survival: reageert op een antwoord (door of voorbij)', body.includes('voorbij') || body.includes('Volgende'));
  await page.click('.chip-row .chip:has-text("Tijdsaanval")');
  await page.waitForTimeout(700);
  ok('Tijdsaanval toont de resterende tijd', (await page.textContent('.stat-row')).includes('tijd over'));

  // ---- Check jezelf
  await open('#/room/netwerken-basis');
  await page.click('.checkself button');
  await page.waitForSelector('.checkself .quizcard');
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => document.querySelector('.checkself .quizcard .mc button').click());
    await page.waitForTimeout(60);
    await page.click('.checkself .btn.primary');
    await page.waitForTimeout(60);
  }
  ok('Check jezelf: vijf vragen, daarna een score', /\d van 5 goed/.test(await page.textContent('.checkself')));
  st = await state();
  ok('Check jezelf bewaart de score', typeof st.checks['netwerken-basis'] === 'number');

  // ---- Resultaatkaart: pas met een voltooid pad
  await open('#/kaart');
  ok('Resultaatkaart zonder voltooid pad legt uit waarom niet', (await page.textContent('#app')).includes('nog geen leerpad'));
  await page.evaluate((k) => {
    const s = JSON.parse(localStorage.getItem(k));
    for (let t = 0; t < 30; t++) for (let q = 0; q < 30; q++) ['mini-ctf', 'kraak-ctf', 'datastromen-ctf'].forEach((r) => { s.answered[r + '::' + t + '::' + q] = true; });
    localStorage.setItem(k, JSON.stringify(s));
  }, LS);
  await page.reload({ waitUntil: 'networkidle' });
  await open('#/kaart');
  await page.fill('.noprint input', 'Proefpersoon');
  const card = await page.textContent('.resultcard');
  ok('Resultaatkaart: naam, pad en de zin dat het geen certificaat is', card.includes('Proefpersoon') && card.includes('Eindopdracht') && card.includes('geen erkend certificaat'));

  // ---- Telefoon: geen horizontale scroll; optioneel schermafbeeldingen
  const pages = ['#/puzzel', '#/scorebord', '#/herhalen', '#/kaart', '#/arena', '#/oefenen', '#/room/netwerken-basis'];
  await page.setViewportSize({ width: 390, height: 800 });
  for (const h of pages) {
    await open(h);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('390 px zonder horizontale scroll: ' + h, over <= 1);
  }
  if (shotDir) {
    fs.mkdirSync(shotDir, { recursive: true });
    for (const theme of ['light', 'dark']) for (const w of [390, 1280]) {
      await page.setViewportSize({ width: w, height: 900 });
      for (const h of ['#/puzzel', '#/scorebord', '#/kaart']) {
        await open(h);
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        await page.screenshot({ path: path.join(shotDir, h.slice(2) + '-' + w + '-' + theme + '.png'), fullPage: false });
      }
    }
  }

  await browser.close();
  if (fails.length) { console.log('\n✗ ' + fails.length + ' fout(en)'); process.exit(1); }
  console.log('\n✓ Alle spelmechaniek-tests geslaagd');
})();
