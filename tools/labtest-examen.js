#!/usr/bin/env node
/* Test de leerroutes en het proefexamen: geen terugkoppeling onderweg, markeren voor
 * later, inleveren, analyse per domein en de nabespreking.
 * Gebruik: node tools/labtest-examen.js */
const path = require('path');
const { chromium } = require('./_playwright');
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const LS = 'nineminds-cyber-dojo-v1';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const fails = [];
  page.on('pageerror', (e) => fails.push('pageerror: ' + e.message));
  page.on('dialog', (d) => d.accept());
  const ok = (name, cond) => { console.log((cond ? '  ✓ ' : '  ✗ ') + name); if (!cond) fails.push(name); };
  const open = async (hash) => { await page.goto(url + '#/', { waitUntil: 'networkidle' }); await page.evaluate((h) => window.CS.go(h), hash); await page.waitForTimeout(150); };

  await open('#/routes');
  const routes = await page.evaluate(() => window.CS.routes.map((r) => r.id));
  ok('Vijf leerroutes op de routepagina', routes.length === 5 && (await page.$$('.pathrow')).length === 5);
  for (const id of routes) {
    await open('#/route/' + id);
    const rows = (await page.$$('.spine .roomrow')).length;
    const want = await page.evaluate((x) => window.CS.routes.find((r) => r.id === x).rooms.length, id);
    ok('Route ' + id + ': alle ' + want + ' rooms staan erin, geen op slot', rows === want && (await page.$$('.roomrow.locked')).length === 0);
  }

  await open('#/proefexamen/soc-analist');
  await page.click('button:has-text("Start het proefexamen")');
  await page.waitForSelector('.mockgrid');
  const n = (await page.$$('.mockcell')).length;
  ok('Proefexamen SOC-analist: 40 vragen', n === 40);

  // Beantwoord de eerste tien vragen (meerkeuze: eerste optie; open: een gok), markeer er één.
  for (let i = 0; i < 10; i++) {
    if (await page.$('.quizcard .mc')) await page.click('.quizcard .mc button');
    else { await page.fill('.quizcard input', 'gok'); await page.dispatchEvent('.quizcard input', 'change'); }
    if (i === 3) await page.click('button:has-text("Markeer voor later")');
    {
      const txt = await page.textContent('.quizcard');
      if (/Goed\.|Correct\.|Mis\.|juiste antwoord/.test(txt)) fails.push('feedback zichtbaar tijdens het examen bij vraag ' + (i + 1));
    }
    await page.click('button:has-text("Volgende")');
  }
  ok('Geen terugkoppeling tijdens het examen', !fails.some((f) => f.startsWith('feedback zichtbaar')));
  ok('Tien vragen ingevuld en één gemarkeerd in het overzicht', (await page.$$('.mockcell.filled')).length === 10 && (await page.$$('.mockcell.marked')).length === 1);
  await page.click('.mockcell >> nth=3');
  ok('Springen via het overzicht bewaart het gegeven antwoord', (await page.$('.quizcard .mc button.picked')) !== null || (await page.inputValue('.quizcard input').catch(() => '')) === 'gok');
  ok('De klok loopt', /^\d+:\d\d$/.test((await page.textContent('.mockhead .num:last-child')).trim()));

  await page.click('.mockcell >> nth=39');
  await page.click('button:has-text("Inleveren")');
  await page.waitForSelector('table.weak');
  const text = await page.textContent('#app');
  ok('Uitslag met score en grens', /\d+ van 40 goed/.test(text) && text.includes('70%'));
  ok('Analyse per domein met doorverwijzing naar een room', text.includes('Analyse per domein') && (await page.$$('table.weak tbody tr')).length >= 2 && (await page.$$('table.weak a')).length >= 1);
  ok('Nabespreking toont het goede antwoord bij de fouten', text.includes('Nabespreking') && text.includes('Goed: '));
  const st = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)), LS);
  ok('Score bewaard per route, fouten ingepland voor herhaling', typeof st.exams['soc-analist'] === 'number' && Object.keys(st.srs).length >= 30);

  await page.setViewportSize({ width: 390, height: 800 });
  for (const h of ['#/routes', '#/route/soc-analist', '#/proefexamen/soc-analist']) {
    await open(h);
    if (h.includes('proefexamen')) { await page.click('button:has-text("Start het proefexamen")'); await page.waitForSelector('.mockgrid'); }
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('390 px zonder horizontale scroll: ' + h, over <= 1);
  }

  await browser.close();
  if (fails.length) { console.log('\n✗ ' + fails.length + ' fout(en)'); process.exit(1); }
  console.log('\n✓ Alle route- en proefexamentests geslaagd');
})();
