#!/usr/bin/env node
/* Speelt elke game room (labtype incident) in een echte browser door: mandaat
 * accepteren, de oplossingsroute van de eigen variant typen, winnen, de vlag
 * invullen. Daarnaast negatieve tests: een onbekend commando, een misgreep met
 * gevolgen, een verloren dienst, en geen horizontale scroll op 390 px.
 * Gebruik: node tools/labtest-game.js [--shots map] */
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { chromium } = require('./_playwright');
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const shotDir = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;

const rooms = fs.readdirSync(path.join(__dirname, '../content/rooms')).filter((f) => f.endsWith('.js')).map((f) => {
  let r; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../content/rooms', f), 'utf8'), { CS: { registerRoom: (x) => (r = x) }, console });
  return r;
}).filter((r) => r.tasks.some((t) => t.lab && t.lab.type === 'incident'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const fails = [];
  page.on('pageerror', (e) => fails.push('pageerror: ' + e.message));
  page.on('dialog', (d) => d.accept());
  const ok = (name, cond) => { console.log((cond ? '  ✓ ' : '  ✗ ') + name); if (!cond) fails.push(name); };
  const open = async (hash) => { await page.goto(url + '#/', { waitUntil: 'networkidle' }); await page.evaluate((h) => window.CS.go(h), hash); await page.waitForTimeout(150); };
  const type = async (sel, cmd) => { await page.fill(sel + ' .term .inrow input', cmd); await page.press(sel + ' .term .inrow input', 'Enter'); await page.waitForTimeout(20); };
  const startDienst = async (sel) => {
    const btn = sel + ' .incident-start .btn.primary';
    const disabled = await page.$eval(btn, (b) => b.disabled);
    await page.check(sel + ' .mandaat-ok input');
    await page.click(btn);
    await page.waitForSelector(sel + ' .term');
    return disabled;
  };

  console.log('Game rooms: ' + rooms.map((r) => r.id).join(', '));
  ok('Minstens vijf game rooms', rooms.length >= 5);

  for (const room of rooms) {
    const ti = room.tasks.findIndex((t) => t.lab && t.lab.type === 'incident');
    const sel = '#task-' + ti;
    await open('#/room/' + room.id);
    ok(room.id + ': opent met een mandaat', (await page.textContent(sel + ' .incident')).includes('Mandaat'));
    ok(room.id + ': "Begin de dienst" pas na het accepteren van het mandaat', await startDienst(sel));
    const solution = await page.$eval(sel + ' .incident', (b) => b.__game.solution);
    for (const c of solution) await type(sel, c);
    await page.waitForSelector(sel + ' .debrief');
    const deb = await page.textContent(sel + ' .debrief');
    const flag = room.tasks[ti].lab.flag;
    ok(room.id + ': oplossingsroute wint, vlag zichtbaar', deb.includes('Incident beheerst') && deb.includes(flag));
    ok(room.id + ': nabespreking met doelen, aanvaller en verwijzing naar een lesroom', deb.includes('Je doelen') && deb.includes('Wat de aanvaller probeerde') && (await page.$$(sel + ' .debrief a[href^="#/room/"]')).length > 0);
    ok(room.id + ': walkthrough vrij na de poging', (await page.$$(sel + ' .walk details')).length === 1);
    // Leg-vast-vragen in de nabespreking: antwoord uit de eigen variant.
    const asks = await page.$eval(sel + ' .incident', (b) => (b.__game.cfg.ask || []).map((q) => q.answer[0]));
    const inputs = await page.$$(sel + ' .debrief .askrow input');
    for (let i = 0; i < inputs.length; i++) { await inputs[i].fill(asks[i]); await inputs[i].press('Enter'); }
    ok(room.id + ': leg-vast-vragen kloppen voor deze variant', (await page.$$(sel + ' .debrief .askrow .feedback.ok')).length === asks.length);
    // De vlag in de roomvraag invullen.
    const q = await page.$(sel + ' .questions .q input');
    await q.fill(flag); await q.press('Enter'); await page.waitForTimeout(80);
    ok(room.id + ': vlag geaccepteerd in de room', (await page.$(sel + ' .questions .q.correct')) !== null);
  }

  // ---- Negatief en gevolgen, in De Nachtdienst
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await open('#/room/game-nachtdienst');
  const sel = '#task-1';
  await startDienst(sel);
  await type(sel, 'rm -rf /');
  ok('Onbekend commando wordt geweigerd', (await page.textContent(sel + ' .term')).includes('onbekend commando'));
  await type(sel, 'block 198.51.100.20');
  ok('Misgreep (back-upleverancier blokkeren) toont het gevolg', (await page.textContent(sel + ' .term')).includes('Gevolg (−15)'));
  const before = await page.textContent(sel + ' .hud');
  await type(sel, 'wait 30');
  await type(sel, 'wait 30');
  await page.waitForSelector(sel + ' .debrief');
  ok('Niets doen: de dienst gaat verloren', (await page.textContent(sel + ' .debrief')).includes('Nog niet beheerst'));
  ok('Klok en schade lopen op in de HUD', before !== (await page.textContent(sel + ' .hud')));
  const rec = await page.evaluate(() => JSON.parse(localStorage.getItem('nineminds-cyber-dojo-v1')).game['game-nachtdienst']);
  ok('Poging bewaard, zonder winst', rec && rec.attempts === 1 && rec.wins === 0);
  await page.click(sel + ' .debrief button:has-text("Andere variant")');
  await page.waitForSelector(sel + ' .mandaat-ok');
  ok('Andere variant geeft een nieuw variantnummer', (await page.evaluate(() => JSON.parse(localStorage.getItem('nineminds-cyber-dojo-v1')).game['game-nachtdienst'].variant)) === 1);

  // ---- Telefoon
  await page.setViewportSize({ width: 390, height: 800 });
  for (const room of rooms) {
    await open('#/room/' + room.id);
    const s = '#task-' + room.tasks.findIndex((t) => t.lab && t.lab.type === 'incident');
    await startDienst(s);
    await type(s, 'help');
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok('390 px zonder horizontale scroll: ' + room.id, over <= 1);
    if (shotDir && room.id === 'game-nachtdienst') {
      fs.mkdirSync(shotDir, { recursive: true });
      await page.$eval(s + ' .incident', (n) => n.scrollIntoView());
      await page.screenshot({ path: path.join(shotDir, 'game-390.png') });
    }
  }
  if (shotDir) {
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const theme of ['light', 'dark']) {
      await open('#/room/game-ransomware-zes-uur');
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      await startDienst('#task-1');
      for (const c of ['alerts', 'ps ' + (await page.$eval('#task-1 .incident', (b) => b.__game.vars.ws)), 'restore fs-01']) await type('#task-1', c);
      await page.$eval('#task-1 .incident', (n) => n.scrollIntoView());
      await page.screenshot({ path: path.join(shotDir, 'game-1280-' + theme + '.png') });
    }
  }

  await browser.close();
  if (fails.length) { console.log('\n✗ ' + fails.length + ' fout(en)'); fails.slice(0, 5).forEach((f) => console.log('   ' + f)); process.exit(1); }
  console.log('\n✓ Alle game-room-tests geslaagd');
})();
