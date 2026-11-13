#!/usr/bin/env node
/* Speelt elke oefenrange (labtype range) in een echte browser door: rules of
 * engagement accepteren, de oplossingsroute van de eigen variant typen, alle
 * vlaggen pakken en winnen. Plus negatieve tests: blind inloggen is luid, een
 * onbekend commando wordt geweigerd, en een telefoonbreedte zonder scroll.
 * Gebruik: node tools/labtest-range.js [--shots map] */
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { chromium } = require('./_playwright');
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const shotDir = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;

const rooms = fs.readdirSync(path.join(__dirname, '../content/rooms')).filter((f) => f.endsWith('.js')).map((f) => {
  let r; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../content/rooms', f), 'utf8'), { CS: { registerRoom: (x) => (r = x) }, console });
  return r;
}).filter((r) => r.tasks.some((t) => t.lab && t.lab.type === 'range'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const fails = [];
  page.on('pageerror', (e) => fails.push('pageerror: ' + e.message));
  page.on('dialog', (d) => d.accept());
  const ok = (name, cond) => { console.log((cond ? '  ✓ ' : '  ✗ ') + name); if (!cond) fails.push(name); };
  const open = async (hash) => { await page.goto(url + '#/', { waitUntil: 'networkidle' }); await page.evaluate((h) => window.CS.go(h), hash); await page.waitForTimeout(150); };
  const type = async (sel, cmd) => { await page.fill(sel + ' .term .inrow input', cmd); await page.press(sel + ' .term .inrow input', 'Enter'); await page.waitForTimeout(20); };
  const start = async (sel) => { const btn = sel + ' .incident-start .btn.primary'; const disabled = await page.$eval(btn, (b) => b.disabled); await page.check(sel + ' .mandaat-ok input'); await page.click(btn); await page.waitForSelector(sel + ' .term'); return disabled; };

  console.log('Oefenranges: ' + rooms.map((r) => r.id).join(', '));
  ok('Minstens een oefenrange', rooms.length >= 1); // wordt 5 als alle ranges er zijn

  for (const room of rooms) {
    const ti = room.tasks.findIndex((t) => t.lab && t.lab.type === 'range');
    const sel = '#task-' + ti;
    await open('#/room/' + room.id);
    ok(room.id + ': opent met rules of engagement', (await page.textContent(sel + ' .range')).includes('Rules of engagement'));
    ok(room.id + ': "Start" pas na het accepteren', await start(sel));
    const solution = await page.$eval(sel + ' .range', (b) => b.__game.solution);
    const vars = await page.$eval(sel + ' .range', (b) => b.__game.vars);
    const fillv = (c) => String(c == null ? '' : c).replace(/\{\{(\w+)\}\}/g, (m, k) => (vars && k in vars ? vars[k] : m));
    for (const c of solution) await type(sel, fillv(c));
    await page.waitForSelector(sel + ' .debrief');
    const deb = await page.textContent(sel + ' .debrief');
    const flag = room.tasks[ti].lab.flag;
    ok(room.id + ': oplossingsroute wint, alle vlaggen', deb.includes('Alle vlaggen binnen'));
    ok(room.id + ': eindvlag en verdedigende debrief', deb.includes(fillv(flag)) && /gestopt|voorkom|gezien/i.test(deb) && (await page.$$(sel + ' .debrief a[href^="#/room/"]')).length > 0);
    ok(room.id + ': walkthrough vrij na de poging', (await page.$$(sel + ' .walk details')).length === 1);
    const asks = await page.$eval(sel + ' .range', (b) => (b.__game.cfg.ask || []).map((q) => q.answer[0]));
    const inputs = await page.$$(sel + ' .debrief .askrow input');
    for (let i = 0; i < Math.min(inputs.length, asks.length); i++) { await inputs[i].fill(fillv(asks[i])); await inputs[i].press('Enter'); }
    ok(room.id + ': leg-vast-vragen kloppen', inputs.length === 0 || (await page.$$(sel + ' .debrief .askrow .feedback.ok')).length === asks.length);
    const q = await page.$(sel + ' .questions .q input');
    if (q) { await q.fill(fillv(flag)); await q.press('Enter'); await page.waitForTimeout(80); ok(room.id + ': eindvlag geaccepteerd in de room', (await page.$(sel + ' .questions .q.correct')) !== null); }
  }

  // ---- Negatief in de eerste range
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  const first = rooms[0];
  const fti = first.tasks.findIndex((t) => t.lab && t.lab.type === 'range');
  const sel = '#task-' + fti;
  await open('#/room/' + first.id);
  await start(sel);
  await type(sel, 'kaboom');
  ok('Onbekend commando wordt geweigerd', (await page.textContent(sel + ' .term')).includes('onbekend commando'));
  await type(sel, 'ssh webadmin@web-01');
  ok('Blind inloggen zonder gevonden wachtwoord lukt niet en is luid', /nog niet gevonden|luidruchtig|geweigerd/i.test(await page.textContent(sel + ' .term')));
  const noise = await page.$eval(sel + ' .range', (b) => b.__game.S.noise);
  ok('Blind proberen verhoogt de ontdekkingsmeter', noise > 0);

  // ---- Telefoon
  await page.setViewportSize({ width: 390, height: 800 });
  for (const room of rooms) {
    await open('#/room/' + room.id);
    const s = '#task-' + room.tasks.findIndex((t) => t.lab && t.lab.type === 'range');
    await start(s);
    await type(s, 'help');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('390 px zonder horizontale scroll: ' + room.id, over <= 1);
    if (shotDir && room.id === rooms[0].id) { fs.mkdirSync(shotDir, { recursive: true }); await page.$eval(s + ' .range', (n) => n.scrollIntoView()); await page.screenshot({ path: path.join(shotDir, 'range-390.png') }); }
  }

  await browser.close();
  if (fails.length) { console.log('\n✗ ' + fails.length + ' fout(en)'); fails.slice(0, 6).forEach((f) => console.log('   ' + f)); process.exit(1); }
  console.log('\n✓ Alle oefenrange-tests geslaagd');
})();
