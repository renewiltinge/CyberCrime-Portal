#!/usr/bin/env node
/*
 * Audit van de leerervaring: classificeert elke vraag en meet de leesblokken.
 *   herinneren  - het antwoord staat letterlijk in de taaktekst, of het is een meerkeuzevraag bij een taak zonder lab
 *   toepassen   - de taak heeft een lab en het antwoord staat niet in de taaktekst
 *   analyseren  - open vraag zonder lab waarvan het antwoord niet in de tekst staat (afleiden, rekenen, combineren)
 * Het is een heuristiek, geen oordeel per vraag: hij ziet niet of een lab echt nodig is.
 * Gebruik:  node tools/audit.js            (tabel in de terminal)
 *           node tools/audit.js --md       (Markdown-tabel, voor docs/audit-leerervaring.md)
 *           node tools/audit.js --json
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = path.join(__dirname, '..', 'content/rooms');
const plain = (html) => String(html || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => (s ? s.split(' ').length : 0);

function classify(q, task, text) {
  if (q.noAnswer) return 'lezen';
  if (Array.isArray(q.options)) {
    const opt = plain(q.options[q.answer]).toLowerCase();
    if (!task.lab) return 'herinneren';
    return opt.length > 3 && text.includes(opt) ? 'herinneren' : 'toepassen';
  }
  const answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => String(a).toLowerCase());
  if (answers.some((a) => a.length > 1 && text.includes(a))) return 'herinneren';
  return task.lab ? 'toepassen' : 'analyseren';
}

function audit() {
  return fs.readdirSync(DIR).filter((f) => f.endsWith('.js')).map((f) => {
    let room = null;
    vm.runInNewContext(fs.readFileSync(path.join(DIR, f), 'utf8'), { CS: { registerRoom: (r) => (room = r) }, console });
    const c = { lezen: 0, herinneren: 0, toepassen: 0, analyseren: 0 };
    let w = 0, maxW = 0, labs = 0, hints = 0, layered = 0, boss = 0;
    room.tasks.forEach((t) => {
      const text = plain(t.content).toLowerCase();
      const n = words(text); w += n; maxW = Math.max(maxW, n);
      if (t.lab) labs++;
      (t.questions || []).forEach((q) => {
        c[classify(q, t, text)]++;
        if (q.hint || q.hints) hints++;
        if (Array.isArray(q.hints)) layered++;
        if (q.boss) boss++;
      });
    });
    const real = c.herinneren + c.toepassen + c.analyseren;
    const recall = real ? c.herinneren / real : 0;
    return { id: room.id, path: room.path, title: room.title, tasks: room.tasks.length, labs, words: w, maxWords: maxW, ...c, real, recall,
      layered, boss, score: recall * (w / room.tasks.length) };
  });
}

if (require.main === module) {
  const rows = audit().sort((a, b) => b.score - a.score);
  if (process.argv.includes('--json')) { console.log(JSON.stringify(rows, null, 1)); process.exit(0); }
  const tot = rows.reduce((t, r) => { ['lezen', 'herinneren', 'toepassen', 'analyseren', 'words', 'labs', 'tasks'].forEach((k) => (t[k] = (t[k] || 0) + r[k])); return t; }, {});
  const pct = (n, d) => (d ? Math.round((100 * n) / d) + '%' : '-');
  if (process.argv.includes('--md')) {
    console.log('| # | Room | Pad | Taken | Labs | Woorden/taak | Herinneren | Toepassen | Analyseren | Aandeel herinneren |');
    console.log('|---|---|---|---|---|---|---|---|---|---|');
    rows.forEach((r, i) => console.log(`| ${i + 1} | \`${r.id}\` | ${r.path} | ${r.tasks} | ${r.labs} | ${Math.round(r.words / r.tasks)} | ${r.herinneren} | ${r.toepassen} | ${r.analyseren} | ${pct(r.herinneren, r.real)} |`));
  } else {
    rows.forEach((r, i) => console.log(String(i + 1).padStart(3), r.id.padEnd(36), r.path.padEnd(14), 'w/taak', String(Math.round(r.words / r.tasks)).padStart(4), 'labs', r.labs + '/' + r.tasks, 'H/T/A', r.herinneren + '/' + r.toepassen + '/' + r.analyseren, pct(r.herinneren, r.real)));
  }
  const real = tot.herinneren + tot.toepassen + tot.analyseren;
  console.log(`\nTotaal: ${rows.length} rooms, ${tot.tasks} taken, ${tot.labs} labs, ${tot.words} woorden lesstof.`);
  console.log(`Vragen: ${tot.lezen} lezen, ${tot.herinneren} herinneren (${pct(tot.herinneren, real)}), ${tot.toepassen} toepassen (${pct(tot.toepassen, real)}), ${tot.analyseren} analyseren (${pct(tot.analyseren, real)}).`);
}
module.exports = { audit };
