#!/usr/bin/env node
/*
 * Bouwt één zelfstandig HTML-bestand met het hele portaal erin (CSS, engine,
 * labs en alle rooms inline). Handig om offline te delen of als Artifact te
 * publiceren.
 *
 * Gebruik:  node tools/build-artifact.js [uitvoerpad]
 * Standaard uitvoer: dist/nineminds-cyber-dojo.html
 *
 * Let op: dit bestand bevat GEEN <!doctype>/<html>/<head>/<body>, zodat het
 * ook direct als claude.ai-Artifact gepubliceerd kan worden (dat voegt zelf
 * een skelet toe). Open je het als los bestand in je browser? Dan werkt het
 * alsnog — browsers vullen het skelet aan.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = process.argv[2] || path.join(ROOT, 'dist', 'nineminds-cyber-dojo.html');
const ORDER = ['fundamenten', 'security-kern', 'offensief', 'defensief', 'forensie', 'intelligence', 'datastromen', 'puzzels', 'meesterproeven', 'eindopdracht'];

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const safeJs = (s) => s.replace(/<\/(script)/gi, '<\\/$1'); // voorkom vroegtijdig sluiten van <script>

// Rooms sorteren op leerpad + order
const dir = path.join(ROOT, 'content/rooms');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
const rooms = files.map((f) => {
  let room = null;
  vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { CS: { registerRoom: (r) => (room = r) }, console });
  return { f, room };
}).filter((x) => x.room);
rooms.sort((a, b) => {
  const pa = ORDER.indexOf(a.room.path), pb = ORDER.indexOf(b.room.path);
  return (pa < 0 ? 99 : pa) - (pb < 0 ? 99 : pb) || a.room.order - b.room.order || a.f.localeCompare(b.f);
});

// De NineMinds-huislaag gaat mee: de letters als data-URI (één bestand kan geen
// fontbestanden naast zich hebben), de tokens en de beweging van het teken.
const fontsDir = path.join(ROOT, 'nineminds', 'brand', 'fonts');
const fonts = read('nineminds/brand/fonts/fonts.css').replace(/url\('([^']+\.woff2)'\)/g, (m, f) =>
  "url('data:font/woff2;base64," + fs.readFileSync(path.join(fontsDir, f)).toString('base64') + "')");
const css = [fonts, read('nineminds/brand/tokens.css'), read('nineminds/brand/motion/mark-animation.css'), read('assets/css/style.css')].join('\n');
require('./house').write(); // het teken uit nineminds/, actueel
const house = read('assets/js/house.js');
const icons = read('assets/js/icons.js');
const app = read('assets/js/app.js');
const labs = read('assets/js/labs.js');
const roomScripts = rooms.map((x) => '<script>\n' + safeJs(fs.readFileSync(path.join(dir, x.f), 'utf8')) + '\n</script>').join('\n');

const html = `<title>Cyber Dojo · NineMinds</title>
<style>
${css}
</style>

<header id="topbar" class="topbar"></header>
<main id="app"></main>

<script>
${safeJs(house)}
</script>
<script>
${safeJs(icons)}
</script>
<script>
${safeJs(app)}
</script>
<script>
${safeJs(labs)}
</script>
${roomScripts}
<script>CS.boot();</script>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
const kb = (html.length / 1024).toFixed(0);
console.log('Zelfstandig portaal geschreven: ' + path.relative(ROOT, OUT) + ' (' + kb + ' KB, ' + rooms.length + ' rooms)');
