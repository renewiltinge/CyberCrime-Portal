#!/usr/bin/env node
/*
 * Controleert room-bestanden op structuur en inhoud.
 * Gebruik:  node tools/validate.js                 (alle rooms)
 *           node tools/validate.js content/rooms/linux-basis.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const PATHS = ['fundamenten', 'security-kern', 'offensief', 'defensief', 'forensie', 'intelligence', 'datastromen', 'puzzels', 'meesterproeven', 'gamerooms', 'uitdagingen', 'eindopdracht'];
const DIFFS = ['Makkelijk', 'Gemiddeld', 'Moeilijk'];
const LABS = ['terminal', 'cyberchef', 'hashcrack', 'password', 'phishing', 'logs', 'http', 'sqli', 'subnet', 'hexviewer', 'pcap',
  'jwt', 'regex', 'cvss', 'timestamp', 'ioc', 'url', 'yara', 'timeline', 'chmod', 'numconv',
  'hashid', 'cipher', 'crackme', 'multidecode', 'rainbow',
  'ach', 'crimescript', 'admiralty', 'probability', 'attackmap', 'pivot', 'bluf',
  'flow', 'ordering', 'regexgolf', 'osintpuzzle', 'connections', 'chaintrace',
  'netflow', 'structuring', 'emailheader', 'dnslog', 'recon', 'detectrule',
  'fingerprint', 'scenario', 'vigenere', 'xorcrib', 'rsa', 'vm', 'benford', 'bayes', 'incident'];

// De incidentconsole (assets/js/game.js) laden zonder browser, om elke game room na te spelen.
const GAME = (() => { const sb = { window: { CS: {} }, console }; vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/js/game.js'), 'utf8'), sb); return sb.window.CS.game; })();
function checkIncident(rel, where, lab) {
  for (const k of ['title', 'role', 'story', 'start', 'flag']) if (!lab[k]) err(rel, `${where}: incident mist ${k}`);
  if (!Array.isArray(lab.mandate) || lab.mandate.length < 2) err(rel, `${where}: incident heeft een mandaat van minstens twee regels nodig`);
  if (!Array.isArray(lab.objectives) || !lab.objectives.length) err(rel, `${where}: incident heeft geen doelen`);
  if (!Array.isArray(lab.solution) || !lab.solution.length) { err(rel, `${where}: incident heeft geen oplossingsroute (solution)`); return; }
  if (!lab.debrief) err(rel, `${where}: incident heeft geen nabespreking (debrief)`);
  const ids = new Set((lab.threats || []).map((t) => t.id));
  (lab.threats || []).forEach((t) => { if (!t.id || t.at == null || !t.text) err(rel, `${where}: dreiging mist id/at/text`); if (t.requires && !ids.has(t.requires)) err(rel, `${where}: dreiging ${t.id} wacht op onbekende ${t.requires}`); });
  // Elke variant: de oplossingsroute wint zonder misgreep en zonder schade; niets doen wint niet.
  const seeds = [1, 2, 3, 7, 42, 1234, 99991, 31337];
  for (const seed of seeds) {
    const g = GAME.create(lab, seed);
    const left = JSON.stringify(g.cfg).match(/\{\{\w+\}\}/);
    if (left) { err(rel, `${where}: variabele ${left[0]} heeft geen waarde in vars`); return; }
    const log = [];
    g.solution.forEach((c) => g.exec(c).forEach((l) => { if (l.cls === 'err' && !/^\s+Gevolg/.test(l.text) && !g.S.ended) log.push(c + ' -> ' + l.text); }));
    if (!g.S.ended) g.exec('report');
    const r = g.result();
    if (log.length) err(rel, `${where}: oplossingsroute (seed ${seed}) geeft fouten: ${log.slice(0, 2).join(' | ')}`);
    if (!r.won || !r.clean) { err(rel, `${where}: oplossingsroute wint niet schoon bij seed ${seed} (score ${r.score}/${r.max}, aftrek ${r.pen}, schade ${r.damage}, reden ${r.reason}${r.penalties.length ? ': ' + r.penalties[0].text : ''})`); return; }
    const idle = GAME.create(lab, seed); idle.exec('report');
    if (idle.result().won) { err(rel, `${where}: wie meteen afsluit, wint ook (seed ${seed})`); return; }
  }
  console.log(`    (incident: oplossingsroute wint in ${seeds.length} varianten)`);
}

const args = process.argv.slice(2);
const files = args.length
  ? args.map((f) => path.resolve(f))
  : fs.readdirSync(path.join(ROOT, 'content/rooms')).filter((f) => f.endsWith('.js')).map((f) => path.join(ROOT, 'content/rooms', f));

let errors = 0;
let warnings = 0;
const err = (file, msg) => { errors++; console.log(`  ✗ ${msg}`); };
const warn = (file, msg) => { warnings++; console.log(`  ! ${msg}`); };

function checkHtml(file, html, where) {
  const voids = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'col', 'source', 'path', 'line', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'use', 'stop']);
  const stack = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let m;
  const stripped = html.replace(/<pre[\s\S]*?<\/pre>/g, (blk) => blk.replace(/<code[^>]*>|<\/code>/g, '').replace(/<(?!\/?pre)[^>]*>/g, ''));
  while ((m = re.exec(stripped))) {
    const tag = m[1].toLowerCase();
    const closing = m[0][1] === '/';
    const selfClosing = m[2] === '/' || voids.has(tag);
    if (closing) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) { err(file, `${where}: sluitende </${tag}> zonder opening`); continue; }
      if (idx !== stack.length - 1) warn(file, `${where}: tags niet netjes genest rond </${tag}> (open: ${stack.slice(idx + 1).join(',')})`);
      stack.length = idx;
    } else if (!selfClosing) {
      stack.push(tag);
    }
  }
  const leftover = stack.filter((t) => !['li', 'p', 'td', 'th', 'tr'].includes(t));
  if (leftover.length) err(file, `${where}: niet afgesloten tags: ${leftover.join(', ')}`);
  if (/\$\{/.test(html)) warn(file, `${where}: bevat "\${" — bedoeld?`);
}

const hintsText = (q) => (Array.isArray(q.hints) ? q.hints : (q.hint ? [q.hint] : []));
function labText(lab) {
  return JSON.stringify(lab);
}

// Zelfstandige MD4 (Node-crypto heeft md4 niet altijd) voor NTLM-controle.
function md4Bytes(bytes) {
  const add = (a, b) => (a + b) & 0xffffffff;
  const rol = (x, s) => ((x << s) | (x >>> (32 - s))) & 0xffffffff;
  const F = (x, y, z) => (x & y) | (~x & z);
  const G = (x, y, z) => (x & y) | (x & z) | (y & z);
  const H = (x, y, z) => x ^ y ^ z;
  const msg = bytes.slice(); const bitLen = msg.length * 8;
  msg.push(0x80); while (msg.length % 64 !== 56) msg.push(0);
  for (let i = 0; i < 8; i++) msg.push((Math.floor(bitLen / Math.pow(2, 8 * i))) & 0xff);
  let A = 0x67452301, B = 0xefcdab89, C = 0x98badcfe, D = 0x10325476;
  for (let off = 0; off < msg.length; off += 64) {
    const X = [];
    for (let i = 0; i < 16; i++) X[i] = (msg[off + i * 4] | (msg[off + i * 4 + 1] << 8) | (msg[off + i * 4 + 2] << 16) | (msg[off + i * 4 + 3] << 24)) >>> 0;
    let a = A, b = B, c = C, d = D;
    const ff = (a, b, c, d, k, s) => rol(add(add(a, F(b, c, d)), X[k]), s);
    const gg = (a, b, c, d, k, s) => rol(add(add(add(a, G(b, c, d)), X[k]), 0x5a827999), s);
    const hh = (a, b, c, d, k, s) => rol(add(add(add(a, H(b, c, d)), X[k]), 0x6ed9eba1), s);
    for (let k = 0; k < 16; k += 4) { a = ff(a, b, c, d, k, 3); d = ff(d, a, b, c, k + 1, 7); c = ff(c, d, a, b, k + 2, 11); b = ff(b, c, d, a, k + 3, 19); }
    for (let j = 0; j < 4; j++) { a = gg(a, b, c, d, j, 3); d = gg(d, a, b, c, j + 4, 5); c = gg(c, d, a, b, j + 8, 9); b = gg(b, c, d, a, j + 12, 13); }
    const r3 = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
    for (let i = 0; i < 16; i += 4) { a = hh(a, b, c, d, r3[i], 3); d = hh(d, a, b, c, r3[i + 1], 9); c = hh(c, d, a, b, r3[i + 2], 11); b = hh(b, c, d, a, r3[i + 3], 15); }
    A = add(A, a); B = add(B, b); C = add(C, c); D = add(D, d);
  }
  const le = (n) => { let s = ''; for (let i = 0; i < 4; i++) s += ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, '0'); return s; };
  return le(A) + le(B) + le(C) + le(D);
}
function hashOf(algo, s) {
  algo = String(algo).toLowerCase();
  if (algo === 'ntlm') { const bytes = []; for (let i = 0; i < s.length; i++) { const code = s.charCodeAt(i); bytes.push(code & 0xff, (code >>> 8) & 0xff); } return md4Bytes(bytes); }
  if (algo === 'md4') return md4Bytes(Array.from(Buffer.from(s, 'utf8')));
  return crypto.createHash(algo).update(s, 'utf8').digest('hex');
}

const seenIds = new Set();
const globalDecls = {}; // naam -> [bestanden] : top-level const/let/var/function (botst in de browser-globalscope)
for (const file of files) {
  const rel = path.relative(ROOT, file);
  try {
    const src = fs.readFileSync(file, 'utf8');
    const re = /^(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/gm;
    const seenHere = new Set();
    let mm;
    while ((mm = re.exec(src))) { const nm = mm[1]; if (seenHere.has(nm)) continue; seenHere.add(nm); (globalDecls[nm] = globalDecls[nm] || []).push(path.basename(file)); }
  } catch (e) { /* lezen mislukt; de parser hieronder meldt het wel */ }
  console.log(`• ${rel}`);
  const rooms = [];
  const sandbox = { CS: { registerRoom: (r) => rooms.push(r) }, console };
  try {
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: rel });
  } catch (e) {
    err(rel, `JavaScript-fout: ${e.message}`);
    continue;
  }
  if (rooms.length !== 1) { err(rel, `registerRoom moet precies 1x aangeroepen worden (nu ${rooms.length})`); continue; }
  const r = rooms[0];
  const base = path.basename(file, '.js');
  if (r.id !== base) err(rel, `id "${r.id}" komt niet overeen met bestandsnaam "${base}"`);
  if (seenIds.has(r.id)) err(rel, `dubbele id ${r.id}`);
  seenIds.add(r.id);
  for (const k of ['title', 'summary']) if (!r[k] || typeof r[k] !== 'string') err(rel, `veld ${k} ontbreekt`);
  // icon is optioneel sinds de huisstijl van NineMinds (docs/adr/0001): de interface toont het niet.
  if (r.icon != null && typeof r.icon !== 'string') err(rel, 'veld icon moet tekst zijn');
  if (!PATHS.includes(r.path)) err(rel, `onbekend path "${r.path}"`);
  if (!DIFFS.includes(r.difficulty)) err(rel, `onbekende difficulty "${r.difficulty}"`);
  if (typeof r.order !== 'number') err(rel, 'order moet een getal zijn');
  if (typeof r.minutes !== 'number') err(rel, 'minutes moet een getal zijn');
  if (!Array.isArray(r.objectives) || r.objectives.length < 2) warn(rel, 'weinig of geen objectives');
  if (r.level != null && !['Instap', 'Praktijk', 'Gevorderd', 'Expert'].includes(r.level)) err(rel, `onbekend level "${r.level}"`);
  if (r.checked != null && !/^\d{4}-\d{2}-\d{2}$/.test(r.checked)) err(rel, 'checked moet een datum JJJJ-MM-DD zijn');
  if (!Array.isArray(r.tasks) || !r.tasks.length) { err(rel, 'geen tasks'); continue; }
  if (r.tasks.every((t) => t.optional)) err(rel, 'alle taken zijn optional: de room kan nooit af');
  if (!Array.isArray(r.terms) || r.terms.length < 3) warn(rel, 'weinig of geen terms');
  (r.terms || []).forEach((t, i) => { if (!t.term || !t.def) err(rel, `term ${i} mist term/def`); });
  (r.resources || []).forEach((x, i) => { if (!x.title || !/^https:\/\//.test(x.url || '')) err(rel, `resource ${i} mist titel of https-url`); });

  let qCount = 0;
  const allText = [];
  r.tasks.forEach((t, ti) => {
    const where = `taak ${ti + 1}`;
    if (!t.title) err(rel, `${where}: geen title`);
    if (t.tryFirst && !t.intro) err(rel, `${where}: tryFirst vraagt om een intro (de opdracht die open staat)`);
    if (t.tryFirst && !t.lab && !(t.questions || []).length) err(rel, `${where}: tryFirst zonder lab of vragen: er valt niets te proberen`);
    if (t.intro) checkHtml(rel, t.intro, where + ' intro');
    if (t.kind != null && !['verdieping', 'examen'].includes(t.kind)) err(rel, `${where}: onbekende kind "${t.kind}"`);
    if (!t.content) err(rel, `${where}: geen content`);
    else { checkHtml(rel, t.content, where); allText.push(t.content); }
    if (t.lab) allText.push(labText(t.lab)); // een vlag die letterlijk in een lab staat, telt ook als vindbaar
    if (t.lab) {
      allText.push(labText(t.lab));
      if (!LABS.includes(t.lab.type)) err(rel, `${where}: onbekend labtype "${t.lab.type}"`);
      if (t.lab.type === 'terminal') {
        if (t.lab.fs) for (const p of Object.keys(t.lab.fs)) if (!p.startsWith('/')) err(rel, `${where}: fs-pad niet absoluut: ${p}`);
        if (t.lab.cwd && t.lab.fs && t.lab.shell !== 'powershell') {
          const dirs = new Set(['/']);
          for (const p of Object.keys(t.lab.fs)) { const parts = p.split('/').filter(Boolean); const isDir = p.endsWith('/'); for (let i = 1; i <= parts.length - (isDir ? 0 : 1); i++) dirs.add('/' + parts.slice(0, i).join('/')); }
          if (!dirs.has(t.lab.cwd)) warn(rel, `${where}: cwd ${t.lab.cwd} bestaat niet in fs`);
        }
      }
      if (t.lab.type === 'hashcrack') {
        const algo = t.lab.algo || 'md5';
        const salt = t.lab.salt || '';
        const withSalt = (w) => (t.lab.saltPos === 'suffix' ? w + salt : salt + w);
        const hit = (t.lab.wordlist || []).find((w) => hashOf(algo, withSalt(w)) === String(t.lab.hash).toLowerCase());
        if (!hit) warn(rel, `${where}: hash wordt door geen enkel woord uit de wordlist gekraakt (controleer algo/salt/saltPos, of zet een crackbaar woord in de wordlist)`);
        else console.log(`    (hashcrack: wachtwoord = "${hit}")`);
      }
      if (t.lab.type === 'phishing') {
        (t.lab.emails || []).forEach((m, mi) => {
          if (typeof m.phishing !== 'boolean') err(rel, `${where}: email ${mi} mist phishing:true/false`);
          if (!Array.isArray(m.body)) err(rel, `${where}: email ${mi} body moet een array zijn`);
        });
      }
      if (t.lab.type === 'incident') checkIncident(rel, where, t.lab);
      if (t.lab.type === 'http') {
        (t.lab.routes || []).forEach((rt, ri) => { if (!rt.method || !rt.path || !rt.status) err(rel, `${where}: route ${ri} mist method/path/status`); });
      }
    }
    if (!Array.isArray(t.questions) || !t.questions.length) { warn(rel, `${where}: geen vragen`); return; }
    t.questions.forEach((q, qi) => {
      qCount++;
      const w = `${where} vraag ${qi + 1}`;
      if (!q.q) err(rel, `${w}: geen vraagtekst`);
      if (q.noAnswer) return;
      // Leerlus-velden (zie docs/CONTENT-SPEC.md): hints, wrong, why, boss.
      if (q.hints != null) {
        if (!Array.isArray(q.hints) || !q.hints.length || q.hints.length > 3 || q.hints.some((h) => typeof h !== 'string' || !h.trim())) err(rel, `${w}: hints moet een lijst van 1 tot 3 teksten zijn`);
        if (q.hint) err(rel, `${w}: gebruik hint of hints, niet allebei`);
      }
      if (q.why != null && (typeof q.why !== 'string' || !q.why.trim())) err(rel, `${w}: why moet tekst zijn`);
      if (q.wrong != null) {
        if (typeof q.wrong !== 'object' || Array.isArray(q.wrong)) err(rel, `${w}: wrong moet een object { antwoord: uitleg } zijn`);
        else for (const k of Object.keys(q.wrong)) {
          if (typeof q.wrong[k] !== 'string' || !q.wrong[k].trim()) err(rel, `${w}: wrong["${k}"] heeft geen uitleg`);
          const cut = k.lastIndexOf('/');
          if (k.length > 2 && k[0] === '/' && cut > 0) { try { new RegExp(k.slice(1, cut), k.slice(cut + 1) || 'i'); } catch (e) { err(rel, `${w}: wrong-patroon ${k} is geen geldige regex`); } }
          if (Array.isArray(q.options)) {
            if (!/^\d+$/.test(k) || +k >= q.options.length) err(rel, `${w}: wrong["${k}"] is geen index van een optie`);
            else if (+k === q.answer) err(rel, `${w}: wrong["${k}"] wijst naar het goede antwoord`);
          } else {
            const good = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => String(a).trim().toLowerCase());
            if (good.includes(k.trim().toLowerCase())) err(rel, `${w}: wrong["${k}"] is zelf een goed antwoord`);
          }
        }
      }
      if (q.boss && hintsText(q).length && r.path !== 'uitdagingen') {
        const plainTask = (t.content || '').replace(/<[^>]+>/g, ' ').toLowerCase();
        const a0 = String(Array.isArray(q.answer) ? q.answer[0] : q.answer).toLowerCase();
        if (!Array.isArray(q.options) && a0.length > 2 && plainTask.includes(a0)) err(rel, `${w}: het antwoord op een boss-vraag staat letterlijk in de taaktekst`);
      }
      if (Array.isArray(q.options)) {
        if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) err(rel, `${w}: answer moet index binnen options zijn`);
        return;
      }
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      if (!answers.length || answers.some((a) => typeof a !== 'string' || !a.trim())) { err(rel, `${w}: answer ontbreekt of is leeg`); return; }
      if (answers[0].length > 60) warn(rel, `${w}: lang antwoord (${answers[0].length} tekens) — kan het korter?`);
      for (const a of answers) {
        if (/^NM\{/.test(a) && !/^NM\{[a-z0-9_]+\}$/.test(a)) warn(rel, `${w}: vlag "${a}" volgt niet NM{kleine_letters_underscores}`);
      }
    });
    // Vlaggen moeten ergens in deze room (tekst of lab) te vinden zijn, eventueel gecodeerd.
  });
  const corpus = allText.join('\n');
  r.tasks.forEach((t, ti) => (t.questions || []).forEach((q, qi) => {
    if (q.noAnswer || Array.isArray(q.options)) return;
    const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    const flag = answers.find((a) => /^NM\{/.test(a));
    if (flag && !corpus.includes(flag) && !q.encoded) {
      warn(rel, `taak ${ti + 1} vraag ${qi + 1}: vlag ${flag} komt niet letterlijk voor in tekst/lab (gecodeerd? zet dan encoded: true)`);
    }
  }));
  // Uitdagingen zonder handleiding: een antwoord of vlag mag niet letterlijk in de taaktekst staan.
  if (r.path === 'uitdagingen') {
    const plain = r.tasks.map((t) => (t.content || '').replace(/<[^>]+>/g, ' ')).join('\n').toLowerCase();
    r.tasks.forEach((t, ti) => (t.questions || []).forEach((q, qi) => {
      if (q.noAnswer || Array.isArray(q.options)) return;
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      const inText = (a, txt) => new RegExp('(^|[^a-z0-9{_])' + a.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9}_])').test(txt);
      const leak = answers.find((a) => a.length > 2 && inText(a, plain));
      if (leak) err(rel, `taak ${ti + 1} vraag ${qi + 1}: antwoord "${leak}" staat letterlijk in de tekst van een uitdaging`);
      if (hintsText(q).slice(0, 2).some((h) => answers.some((a) => a.length > 2 && inText(a, h.toLowerCase())))) err(rel, `taak ${ti + 1} vraag ${qi + 1}: de hint verraadt het antwoord`);
    }));
  }
  console.log(`    ${r.tasks.length} taken, ${qCount} vragen`);
}

// Cross-file: top-level declaraties die in meer dan één bestand voorkomen botsen
// in de globale scope van de browser (alle rooms laden als losse <script>).
Object.keys(globalDecls).forEach((nm) => {
  const fs2 = globalDecls[nm];
  if (fs2.length > 1) { errors++; console.log(`  ✗ top-level naam "${nm}" is in meerdere bestanden gedeclareerd (botst in de browser): ${fs2.join(', ')} — hernoem of maak uniek per room`); }
});

// De huislaag: assets/js/house.js moet zijn wat nineminds/ nu oplevert, anders toont de
// pagina een ander NineMinds-teken dan de huislaag zegt.
if (!require('./house').upToDate()) {
  errors++;
  console.log('  ✗ assets/js/house.js loopt achter op nineminds/ — draai node tools/build.js');
}

// Leerroutes (assets/js/app.js): elke genoemde room moet bestaan.
if (!args.length) {
  const app = fs.readFileSync(path.join(ROOT, 'assets/js/app.js'), 'utf8');
  const block = (app.match(/const ROUTES = \[([\s\S]*?)\n  \];/) || [])[1] || '';
  (block.match(/rooms: \[[^\]]*\]/g) || []).forEach((lst) => (lst.match(/'([^']+)'/g) || []).forEach((q) => {
    const id = q.slice(1, -1);
    if (!seenIds.has(id)) { errors++; console.log(`  ✗ leerroute verwijst naar een room die niet bestaat: ${id}`); }
  }));
}

console.log(`\n${files.length} bestand(en), ${errors} fout(en), ${warnings} waarschuwing(en)`);
process.exit(errors ? 1 : 0);
