#!/usr/bin/env node
/*
 * Scant content/rooms/*.js, sorteert op leerpad + order, en schrijft de
 * <script>-lijst tussen <!-- ROOMS:START --> en <!-- ROOMS:END --> in index.html.
 * Draai dit na het toevoegen of hernoemen van een room:  node tools/build.js
 * Schrijft ook assets/js/house.js opnieuw uit nineminds/ (na een sync van de huislaag).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'content/rooms');
const INDEX = path.join(ROOT, 'index.html');
const ORDER = ['fundamenten', 'security-kern', 'offensief', 'defensief', 'forensie', 'intelligence', 'datastromen', 'puzzels', 'meesterproeven', 'uitdagingen', 'eindopdracht'];

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
const metas = files.map((f) => {
  let room = null;
  const sandbox = { CS: { registerRoom: (r) => (room = r) }, console };
  try { vm.runInNewContext(fs.readFileSync(path.join(DIR, f), 'utf8'), sandbox); } catch (e) { console.error('Kon ' + f + ' niet lezen:', e.message); }
  return { file: f, path: room ? room.path : 'zzz', order: room ? room.order : 999, title: room ? room.title : f };
});
metas.sort((a, b) => {
  const pa = ORDER.indexOf(a.path), pb = ORDER.indexOf(b.path);
  return (pa < 0 ? 99 : pa) - (pb < 0 ? 99 : pb) || a.order - b.order || a.file.localeCompare(b.file);
});

const block = metas.map((m) => '  <script src="content/rooms/' + m.file + '"></script>').join('\n');
let html = fs.readFileSync(INDEX, 'utf8');
const re = /(<!-- ROOMS:START -->)[\s\S]*?(<!-- ROOMS:END -->)/;
if (!re.test(html)) { console.error('Markers <!-- ROOMS:START/END --> niet gevonden in index.html'); process.exit(1); }
html = html.replace(re, '$1\n' + block + '\n  $2');

// Het NineMinds-teken uit de huislaag, als script (zie tools/house.js).
require('./house').write();
console.log('assets/js/house.js bijgewerkt uit nineminds/.');

// Cache-busting: elk lokaal script en stylesheet krijgt ?v=<inhoudshash>. Verandert een bestand,
// dan verandert zijn URL, en laadt de browser (of de Cloudflare-cache) nooit meer een oude versie
// naast een nieuwe index.html. Dat gebeurde wel: een oude app.js toonde maar 9 leerpaden.
const crypto = require('crypto');
html = html.replace(/(<(?:script|link)\b[^>]*?\b(?:src|href)=")((?:assets|content|nineminds)\/[^"?]+)(?:\?v=[0-9a-f]+)?(")/g, (m, pre, rel, post) => {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { console.error('Waarschuwing: ' + rel + ' bestaat niet'); return m; }
  const v = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10);
  return pre + rel + '?v=' + v + post;
});
fs.writeFileSync(INDEX, html);

console.log('index.html bijgewerkt met ' + metas.length + ' rooms:');
let cur = '';
metas.forEach((m) => { if (m.path !== cur) { cur = m.path; console.log('  [' + cur + ']'); } console.log('    ' + m.order + '. ' + m.title + '  (' + m.file + ')'); });
