#!/usr/bin/env node
/* Test de leerlus: gelaagde hints met XP-kosten, wrong-feedback, missers en herhaling.
 * Zet een proefroom in de pagina (niet in content/) en bedient hem echt.
 * Gebruik: node tools/labtest-leerlus.js */
const path = require('path');
const { chromium } = require('./_playwright');
const url = 'file://' + path.join(__dirname, '..', 'index.html');
const LS = 'nineminds-cyber-dojo-v1';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const fails = [];
  page.on('pageerror', (e) => fails.push('pageerror: ' + e.message));
  const ok = (name, cond) => { console.log((cond ? '  ✓ ' : '  ✗ ') + name); if (!cond) fails.push(name); };
  const state = () => page.evaluate((k) => JSON.parse(localStorage.getItem(k)), LS);

  // De proefroom wordt na het laden geregistreerd, ook na elke reload.
  const addRoom = () => page.evaluate(() => {
      window.CS.registerRoom({
        id: 'zz-proef', path: 'fundamenten', order: 99, title: 'Proef', difficulty: 'Makkelijk', minutes: 1, summary: 's', objectives: [], terms: [],
        tasks: [
          {
            title: 'Taak 1', tryFirst: true, intro: '<p>Opdracht eerst.</p>', content: '<p>Uitleg daarna.</p>',
            questions: [
              { q: 'Poort van HTTPS?', answer: '443', hints: ['Richting', 'Plek', 'Bijna'], wrong: { 80: 'Dat is HTTP zonder TLS.', '/^8[0-9]{3}$/': 'Dat is een alternatieve poort.' }, why: 'Firewalls filteren hierop.' },
              { q: 'Kies', options: ['a', 'b', 'c'], answer: 1, wrong: { 0: 'a is het niet omdat.' } },
              { q: 'Boss', answer: 'NM{proef_vlag}', boss: true, encoded: true },
            ],
          },
          { title: 'Taak 2', kind: 'verdieping', optional: true, content: '<p>Extra.</p>', questions: [{ q: 'Extra?', answer: 'ja' }] },
        ],
      });
  });
  await page.goto(url + '#/', { waitUntil: 'networkidle' });
  await addRoom();
  await page.evaluate(() => window.CS.go('#/room/zz-proef'));
  await page.waitForSelector('#task-0 .q');
  const closed = await page.$eval('#task-0 details.uitleg', (d) => !d.open);
  ok('Eerst proberen: opdracht open, uitleg ingeklapt', closed && (await page.textContent('#task-0')).includes('Opdracht eerst'));

  const qs = await page.$$('#task-0 .q');
  const type = async (q, v) => { const i = await q.$('input'); await i.fill(v); await i.press('Enter'); await page.waitForTimeout(80); };

  await type(qs[0], '80');
  ok('wrong: specifieke uitleg bij 80', (await qs[0].textContent()).includes('Dat is HTTP zonder TLS.'));
  await type(qs[0], '8443');
  ok('wrong: regex-sleutel werkt', (await qs[0].textContent()).includes('alternatieve poort'));

  const hb = await qs[0].$('.hintrow button');
  ok('Hintknop noemt laag en prijs', /hint 1 van 3.*kost 2 XP/i.test(await hb.textContent()));
  await hb.click();
  await hb.click();
  const badge = await (await qs[0].$('.badge-xp')).textContent();
  ok('Twee hints open, XP gezakt naar 7', (await qs[0].$$('.hintline')).length === 2 && badge === '+7 XP');
  await type(qs[0], '443');
  ok('Goed antwoord toont waarom', (await qs[0].textContent()).includes('Waarom dit ertoe doet'));

  let st = await state();
  ok('XP = 7 na twee hints', st.xp === 7);
  ok('Misser geteld en ingepland voor herhaling', st.miss['zz-proef::0::0'] === 2 && !!st.srs['zz-proef::0::0']);

  await (await qs[1].$$('.mc button'))[0].click();
  await page.waitForTimeout(60);
  ok('Meerkeuze: wrong per optie', (await qs[1].textContent()).includes('a is het niet omdat.'));
  await (await qs[1].$$('.mc button'))[1].click();

  await type(qs[2], 'NM{proef_vlag}');
  await page.waitForTimeout(900);
  const bossText = await qs[2].textContent();
  ok('Boss-vraag: 25 XP en triomfregel', bossText.includes('VLAG GEACCEPTEERD') && bossText.includes('+25 XP'));
  ok('Room af zonder de optionele verdieping', (await page.textContent('#roomDone')).includes('Room voltooid'));

  // Herhaling: maak de kaart vandaag verschuldigd.
  await page.evaluate((k) => { const s = JSON.parse(localStorage.getItem(k)); s.srs['zz-proef::0::0'].due = '2000-01-01'; localStorage.setItem(k, JSON.stringify(s)); }, LS);
  await page.goto(url + '#/', { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
  await addRoom();
  await page.evaluate(() => window.CS.go('#/herhalen'));
  await page.waitForSelector('.quizcard');
  const inp = await page.$('.quizcard input');
  await inp.fill('443');
  await inp.press('Enter');
  await page.waitForTimeout(80);
  st = await state();
  ok('Herhaalkaart goed: schuift naar stap 1', st.srs['zz-proef::0::0'].step === 1);

  // Oude voortgang (v1, zonder de nieuwe velden) blijft werken.
  await page.evaluate((k) => localStorage.setItem(k, JSON.stringify({ answered: { 'intro-cybersecurity::0::0': true }, xp: 40, badges: {} })), LS);
  await page.goto(url + '#/');
  await page.reload({ waitUntil: 'networkidle' });
  ok('Oude voortgang zonder nieuwe velden laadt', (await page.textContent('#xpPill')).includes('40 XP'));

  await browser.close();
  if (fails.length) { console.log('\n✗ ' + fails.length + ' fout(en)'); process.exit(1); }
  console.log('\n✓ Alle leerlus-tests geslaagd');
})();
