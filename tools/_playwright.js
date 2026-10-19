/* Laadt Playwright voor de testscripts, waar het ook staat.
 * Volgorde: PLAYWRIGHT_MODULE (pad naar playwright of playwright-core), de vaste plek in
 * de cloud-omgeving, en tot slot een gewone `require('playwright')`.
 * CHROMIUM_PATH wijst desgewenst naar een eigen chrome.exe/chromium. */
const candidates = [process.env.PLAYWRIGHT_MODULE, '/opt/node-tools/node_modules/playwright', 'playwright', 'playwright-core'].filter(Boolean);
let pw;
for (const c of candidates) {
  try { pw = require(c); break; } catch (e) { /* volgende proberen */ }
}
if (!pw) throw new Error('Playwright niet gevonden. Installeer het (npm i -g playwright) of zet PLAYWRIGHT_MODULE.');
const launch = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = (opts = {}) => launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH, ...opts } : opts);
module.exports = pw;
