/*
 * Het NineMinds-teken uit nineminds/ (de huislaag) als JavaScript, zodat de pagina het
 * kan inplakken. Via file:// mag een pagina geen svg-bestanden ophalen; een script
 * met de tekst erin wel. Zo blijft het teken ingeplakt en nooit nagetekend: past
 * NineMinds het aan, dan staat het hier na `nineminds/sync.ps1` en `node tools/build.js`.
 *
 * Gebruikt door tools/build.js (schrijft het bestand) en tools/validate.js (controleert
 * of het nog klopt met nineminds/).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'js', 'house.js');
const SOURCES = {
  mark: 'nineminds/brand/logo/mark-mono.svg',
  markAnimated: 'nineminds/brand/motion/mark-animated-inline.svg',
  wordmark: 'nineminds/brand/logo/wordmark.svg',
};

function render() {
  const lines = Object.entries(SOURCES).map(([key, rel]) => {
    const svg = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n').trim();
    return '  ' + key + ': ' + JSON.stringify(svg) + ',';
  });
  return [
    '/* Gegenereerd door tools/build.js uit nineminds/ (de NineMinds-huislaag). Niet bewerken. */',
    '(function () {',
    "  'use strict';",
    '  const CS = window.CS = window.CS || {};',
    '  CS.house = {',
    ...lines,
    '  };',
    '})();',
    '',
  ].join('\n');
}

module.exports = {
  OUT,
  render,
  write() { fs.writeFileSync(OUT, render()); },
  /** true als assets/js/house.js precies is wat nineminds/ nu oplevert. */
  upToDate() {
    try { return fs.readFileSync(OUT, 'utf8').replace(/\r\n/g, '\n') === render(); } catch (e) { return false; }
  },
};
