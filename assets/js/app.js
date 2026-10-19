/* ======================================================================
   NineMinds Cyber Dojo — core engine
   Geen build, geen dependencies. Werkt via file:// en GitHub Pages.
   ====================================================================== */
(function () {
  'use strict';

  // ---- Globale namespace -------------------------------------------------
  const CS = window.CS = window.CS || {};
  const ROOMS = [];
  CS.registerRoom = (room) => { ROOMS.push(room); };
  CS.labs = CS.labs || {};          // labrenderers registreren zich hier
  CS.registerLab = (type, fn) => { CS.labs[type] = fn; };

  // ---- Leerpaden ---------------------------------------------------------
  const PATHS = [
    { id: 'fundamenten',   title: 'Fundamenten',            desc: 'De basis die alles draagt: wat security is, hoe netwerken, het web, Linux en Windows werken. Begin hier.' },
    { id: 'security-kern', title: 'Security-kern',          desc: 'Cryptografie, wachtwoorden & authenticatie en de menselijke factor — social engineering en phishing.' },
    { id: 'offensief',     title: 'Offensief (red team)',   desc: 'Denken als een aanvaller: de OWASP Top 10, verkenning, en webkwetsbaarheden zelf uitbuiten in een veilig lab.' },
    { id: 'defensief',     title: 'Defensief (blue team)',  desc: 'Aanvallen detecteren in logs, reageren op incidenten (NIST) en systemen thuis en op het werk weerbaar maken.' },
    { id: 'forensie',      title: 'Digitale forensie & opsporing', desc: 'De weg naar digitaal rechercheur: sporen veiligstellen, schijven, geheugen, netwerk en Windows-artefacten onderzoeken, OSINT en een echt forensisch onderzoek.' },
    { id: 'intelligence',  title: 'Cyber-intelligence & opsporing', desc: 'Van fenomeen naar interventie: het cybercrime-ecosysteem, crime scripting, de intelligencecyclus, threat-intel-modellen, infrastructuur-OSINT & pivoting, en gestructureerde analyse tot een BLUF-product.' },
    { id: 'datastromen',   title: 'Datastromen volgen',        desc: 'Word expert in geld- en datastromen: volg witwasconstructies en structurering, betrap beaconing en exfiltratie in netwerkverkeer, en traceer de herkomst van een e-mail. De rode draad van cybercrime: het geld en de data.' },
    { id: 'puzzels',       title: 'Puzzels & uitdagingen',  desc: 'Leren door te doen: volg geld- en datastromen, ontmasker operators met OSINT, groepeer en reconstrueer, en los een grote cybercrime-CTF op. Alle oefening, veel plezier.' },
    { id: 'eindopdracht',  title: 'Eindopdracht',           desc: 'Breng alles samen in een afsluitende mini-CTF. Bewijs aan jezelf wat je kunt.' },
  ];

  // ---- Utilities ---------------------------------------------------------
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const el = (tag, attrs = {}, kids = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else if (v === false || v === null || v === undefined) { /* booleaanse attributen: niet zetten als uit */ }
      else if (v === true) n.setAttribute(k, '');
      else n.setAttribute(k, v);
    }
    (Array.isArray(kids) ? kids : [kids]).forEach((c) => { if (c != null) n.append(c.nodeType ? c : document.createTextNode(c)); });
    return n;
  };
  const norm = (s) => String(s == null ? '' : s).trim().replace(/\s+/g, ' ');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  CS.util = { $, $$, el, norm, esc };

  // ---- Voortgang (localStorage) -----------------------------------------
  const LS_KEY = 'nineminds-cyber-dojo-v1';
  let STATE = loadState();
  function loadState() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; }
    return {};
  }
  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(STATE)); } catch (e) { /* privémodus e.d. */ }
  }
  // STATE vorm: { answered: { "roomId::t::q": true }, xp: 0, badges: {id:true}, seenIntro: true, name: "" }
  STATE.answered = STATE.answered || {};
  STATE.xp = STATE.xp || 0;
  STATE.badges = STATE.badges || {};

  const qKey = (roomId, ti, qi) => `${roomId}::${ti}::${qi}`;
  const isAnswered = (roomId, ti, qi) => !!STATE.answered[qKey(roomId, ti, qi)];

  function roomQuestionCount(room) {
    return (room.tasks || []).reduce((n, t) => n + (t.questions ? t.questions.length : 0), 0);
  }
  function roomAnsweredCount(room) {
    let n = 0;
    (room.tasks || []).forEach((t, ti) => (t.questions || []).forEach((q, qi) => { if (isAnswered(room.id, ti, qi)) n++; }));
    return n;
  }
  function roomDone(room) {
    const tot = roomQuestionCount(room);
    return tot > 0 && roomAnsweredCount(room) >= tot;
  }
  function roomProgress(room) {
    const tot = roomQuestionCount(room);
    return tot ? roomAnsweredCount(room) / tot : 0;
  }

  // ---- Levels & XP -------------------------------------------------------
  function levelFor(xp) {
    // oplopende drempels; level n vereist 50*n*(n+1)/... houden we simpel:
    let lvl = 1, need = 100, acc = 0;
    while (xp >= acc + need) { acc += need; lvl++; need = Math.round(need * 1.35); }
    return { lvl, into: xp - acc, need, floor: acc };
  }
  function addXP(amount, reason) {
    const before = levelFor(STATE.xp).lvl;
    STATE.xp += amount;
    const after = levelFor(STATE.xp).lvl;
    saveState();
    renderXP();
    if (after > before) toast('Level ' + after, 'Je bent nu level ' + after + '.', 'proof');
  }

  // ---- Badges ------------------------------------------------------------
  const BADGES = [
    { id: 'first-blood', icon: 'check', name: 'Eerste bloed', desc: 'Je eerste vraag goed', test: () => Object.keys(STATE.answered).length >= 1 },
    { id: 'fundamenten', icon: 'path-fundamenten', name: 'Fundamentalist', desc: 'Alle Fundamenten-rooms af', test: () => pathDone('fundamenten') },
    { id: 'crypto',      icon: 'path-security-kern', name: 'Cryptograaf', desc: 'Alle Security-kern-rooms af', test: () => pathDone('security-kern') },
    { id: 'redteam',     icon: 'path-offensief', name: 'Red teamer', desc: 'Alle Offensief-rooms af', test: () => pathDone('offensief') },
    { id: 'blueteam',    icon: 'path-defensief', name: 'Blue teamer', desc: 'Alle Defensief-rooms af', test: () => pathDone('defensief') },
    { id: 'forensics',   icon: 'path-forensie', name: 'Digitaal rechercheur', desc: 'Alle Forensie-rooms af', test: () => pathDone('forensie') },
    { id: 'analyst',     icon: 'path-intelligence', name: 'Intelligence-analist', desc: 'Alle Cyber-intelligence-rooms af', test: () => pathDone('intelligence') },
    { id: 'tracer',      icon: 'path-datastromen', name: 'Stromenvolger', desc: 'Alle Datastromen-rooms af', test: () => pathDone('datastromen') },
    { id: 'puzzler',     icon: 'path-puzzels', name: 'Puzzelmeester', desc: 'Alle Puzzels & uitdagingen af', test: () => pathDone('puzzels') },
    { id: 'arena10',     icon: 'practice', name: 'Scherpschutter', desc: 'Reeks van 10 in de Oefenarena', test: () => (STATE.bestStreak || 0) >= 10 },
    { id: 'hacker10',    icon: 'seal', name: 'Doorzetter', desc: '10 rooms afgerond', test: () => ROOMS.filter(roomDone).length >= 10 },
    { id: 'flaghunter',  icon: 'flag', name: 'Vlaggenjager', desc: '15 vlaggen gevonden', test: () => (STATE.flags || 0) >= 15 },
    { id: 'capstone',    icon: 'path-eindopdracht', name: 'Dojo-meester', desc: 'De eindopdracht voltooid', test: () => pathDone('eindopdracht') },
  ];
  function pathDone(pathId) {
    const rs = ROOMS.filter((r) => r.path === pathId);
    return rs.length > 0 && rs.every(roomDone);
  }
  function checkBadges() {
    BADGES.forEach((b) => {
      if (!STATE.badges[b.id] && b.test()) {
        STATE.badges[b.id] = true; saveState();
        toast('Badge: ' + b.name, b.desc, 'proof');
      }
    });
  }

  // ---- Meldingen ---------------------------------------------------------
  // kind 'proof': er is iets bewezen (room af, badge, level). Dat is de enige
  // melding die violet mag zijn; de rest is inkt.
  let toastWrap;
  function toast(title, sub, kind) {
    if (!toastWrap) { toastWrap = el('div', { class: 'toast-wrap', role: 'status', 'aria-live': 'polite' }); document.body.append(toastWrap); }
    const t = el('div', { class: 'toast' + (kind === 'proof' ? ' proof' : '') }, [
      CS.icon(kind === 'proof' ? 'check' : 'chevron', 18),
      el('div', {}, [el('div', { class: 't', text: title }), sub ? el('div', { class: 's', text: sub }) : null]),
    ]);
    toastWrap.append(t);
    setTimeout(() => { t.style.transition = 'opacity .4s, transform .4s'; t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; setTimeout(() => t.remove(), 400); }, 3400);
  }
  CS.toast = toast;

  // ---- Het NineMinds-teken -----------------------------------------------
  // Komt uit de huislaag (assets/js/house.js, gegenereerd uit nineminds/). Het
  // staat stil. Alleen als er iets bewezen is (een goed antwoord, een room af)
  // slaat het één keer naar buiten uit: de 'verified'-beweging van NineMinds.
  // Nooit als versiering, en bij "minder beweging" helemaal niet (dat regelt
  // mark-animation.css).
  function markNode(cls, animated) {
    const span = el('span', { class: cls, 'aria-hidden': 'true' });
    span.innerHTML = animated ? CS.house.markAnimated : CS.house.mark;
    const svg = span.querySelector('svg');
    if (svg) { svg.removeAttribute('role'); if (animated) svg.setAttribute('data-state', 'static'); }
    return span;
  }
  function wordmarkNode() {
    const span = el('span', { class: 'wordmark', role: 'img', 'aria-label': 'NineMinds' });
    span.innerHTML = CS.house.wordmark;
    return span;
  }
  let proveTimer;
  function proveMark() {
    const svg = document.querySelector('.brand .mark svg');
    if (!svg) return;
    svg.removeAttribute('data-state');
    void svg.getBoundingClientRect(); // opnieuw afspelen, ook als hij net al uitsloeg
    svg.setAttribute('data-state', 'verified');
    clearTimeout(proveTimer);
    proveTimer = setTimeout(() => svg.setAttribute('data-state', 'static'), 1600);
  }

  // ---- Thema -------------------------------------------------------------
  // Zonder keuze volgt de dojo het systeem (nineminds/brand/tokens.css regelt
  // dat). De knop legt een keuze vast.
  function currentTheme() {
    const set = document.documentElement.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('nineminds-theme'); } catch (e) { /* geen opslag */ }
    if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
  }
  function toggleTheme() {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('nineminds-theme', next); } catch (e) { /* geen opslag */ }
    paintThemeBtn();
  }
  function paintThemeBtn() {
    const b = $('#themeBtn'); if (!b) return;
    const dark = currentTheme() === 'dark';
    b.innerHTML = '';
    b.append(CS.icon(dark ? 'sun' : 'moon', 18));
    b.title = dark ? 'Licht thema' : 'Donker thema';
    b.setAttribute('aria-label', b.title);
  }

  // =======================================================================
  //  RENDER: topbalk
  // =======================================================================
  const NAV = [
    { hash: '#/', label: 'Leerpaden', icon: 'paths', match: (h) => h === '#/' || h === '' || /^#\/(pad|room)\//.test(h) },
    { hash: '#/oefenen', label: 'Oefenen', icon: 'practice', match: (h) => /^#\/(oefenen|arena|flashcards|examen|daily|scorebord)/.test(h) },
    { hash: '#/tools', label: 'Gereedschap', icon: 'tools', match: (h) => h === '#/tools' },
  ];
  function renderTopbar() {
    const bar = $('#topbar');
    bar.innerHTML = '';
    const wrap = el('div', { class: 'wrap' });
    const brand = el('button', { class: 'brand', onclick: () => go('#/'), 'aria-label': 'Cyber Dojo, naar het overzicht' }, [
      markNode('mark', true),
      el('span', { class: 'name', text: 'Cyber Dojo' }),
    ]);
    const nav = el('nav', { class: 'topnav', 'aria-label': 'Hoofdmenu' },
      NAV.map((n) => el('a', { href: n.hash, 'data-nav': n.hash }, [CS.icon(n.icon, 17), el('span', { class: 't', text: n.label })])));
    const search = el('div', { class: 'search', role: 'search' }, [
      CS.icon('search', 16),
      el('input', { type: 'search', placeholder: 'Zoek een onderwerp…', id: 'searchInput', 'aria-label': 'Zoek in alle rooms', autocomplete: 'off', spellcheck: 'false', oninput: onSearch, onkeydown: onSearchKey }),
      el('kbd', { text: '/', title: 'Druk / om te zoeken' }),
    ]);
    const searchBtn = el('button', { class: 'iconbtn searchbtn', title: 'Zoeken', 'aria-label': 'Zoeken', onclick: () => {
      search.classList.toggle('open');
      if (search.classList.contains('open')) $('#searchInput').focus(); else closeSearch();
    } }, CS.icon('search', 18));
    const themeBtn = el('button', { class: 'iconbtn', id: 'themeBtn', onclick: toggleTheme });
    const xp = el('button', { class: 'xp-pill', id: 'xpPill', title: 'Jouw voortgang', onclick: showProfile });
    wrap.append(brand, nav, el('span', { class: 'spacer' }), search, searchBtn, themeBtn, xp);
    bar.append(wrap);
    paintThemeBtn();
    renderXP();
    markNav();
  }
  function markNav() {
    const h = location.hash || '#/';
    $$('.topnav a').forEach((a) => {
      const n = NAV.find((x) => x.hash === a.getAttribute('data-nav'));
      const on = !!n && n.match(h);
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  function renderXP() {
    const pill = $('#xpPill'); if (!pill) return;
    const L = levelFor(STATE.xp);
    pill.innerHTML = '';
    pill.append(
      el('span', { class: 'lvl', text: 'LV ' + L.lvl }),
      el('span', { class: 'bar', 'aria-hidden': 'true' }, el('i', { style: 'width:' + Math.round((L.into / L.need) * 100) + '%' })),
      el('span', { class: 'xp', text: STATE.xp + ' XP' }),
    );
    pill.setAttribute('aria-label', 'Level ' + L.lvl + ', ' + STATE.xp + ' XP. Bekijk je voortgang.');
  }

  // =======================================================================
  //  Kleine bouwstenen
  // =======================================================================
  function pathRooms(pathId) { return ROOMS.filter((r) => r.path === pathId).sort((a, b) => a.order - b.order); }
  function pathGlyph(pathId, size) { return CS.icon('path-' + pathId, size || 20); }
  function fmtMinutes(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return h ? h + ' u' + (m ? ' ' + m + ' min' : '') : m + ' min';
  }
  // "Taak 3 — Dreiging, kwetsbaarheid en risico" → "Dreiging, kwetsbaarheid en risico":
  // het nummer staat er al als stempel boven.
  function taskTitle(title) { return String(title || '').replace(/^Taak\s*\d+\s*[—–:-]\s*/i, ''); }
  function diffNode(d) {
    const n = { Makkelijk: 1, Gemiddeld: 2, Moeilijk: 3 }[d] || 1;
    return el('span', { class: 'diff', title: 'Moeilijkheid: ' + d }, [
      el('span', { class: 'pips', 'aria-hidden': 'true' }, [1, 2, 3].map((i) => el('i', { class: i <= n ? 'on' : '' }))),
      el('span', { text: d }),
    ]);
  }
  function metaItem(icon, text, mono) {
    return el('span', {}, [CS.icon(icon, 15), el('span', { class: mono ? 'num' : '', text })]);
  }
  function meterLine(frac, done) {
    const pct = Math.round(Math.max(0, Math.min(1, frac)) * 100);
    return el('div', { class: 'meter-line' + (done ? ' done' : ''), role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pct) },
      el('i', { style: 'width:' + pct + '%' }));
  }
  function crumbs(items) {
    const nav = el('nav', { class: 'crumbs', 'aria-label': 'Kruimelpad' });
    items.forEach((it, i) => {
      if (i) nav.append(el('span', { class: 'sep', 'aria-hidden': 'true', text: '/' }));
      nav.append(it[1] ? el('a', { href: it[1], text: it[0] }) : el('strong', { text: it[0], 'aria-current': 'page' }));
    });
    return nav;
  }
  function pageHead(icon, title, desc) {
    return el('header', { class: 'page-head' }, [
      el('h1', {}, [CS.icon(icon, 22), el('span', { text: title })]),
      desc ? el('p', { text: desc }) : null,
    ]);
  }
  function homeSection(title, sub, body, id) {
    return el('section', { class: 'home-section', id: id || null }, [
      el('header', {}, [el('h2', { text: title }), sub ? el('p', { text: sub }) : null]),
      body,
    ]);
  }
  function stat(n, l) { return el('div', { class: 'stat' }, [el('div', { class: 'n', text: n }), el('div', { class: 'l', text: l })]); }

  // =======================================================================
  //  RENDER: home
  // =======================================================================
  const PRACTICE = [
    { hash: '#/arena', icon: 'practice', title: 'Oefenarena', desc: 'Willekeurige vragen uit alle lessen. Hoe lang wordt je reeks?' },
    { hash: '#/flashcards', icon: 'cards', title: 'Begrippentrainer', desc: 'Alle vakbegrippen als kaarten. Wat je nog niet kent, komt vaker terug.' },
    { hash: '#/examen', icon: 'exam', title: 'Examen', desc: 'Een getimede toets met vragen uit alle lessen. Vanaf 70% ben je geslaagd.' },
    { hash: '#/daily', icon: 'calendar', title: 'Dagchallenge', desc: 'Elke dag vijf vragen, voor iedereen dezelfde. Bouw een reeks op.' },
    { hash: '#/tools', icon: 'tools', title: 'Gereedschapskist', desc: 'Alle labs los, voor je eigen ethische oefeningen.' },
    { hash: '#/scorebord', icon: 'chart', title: 'Scorebord', desc: 'Je voortgang, badges en records op één plek.' },
  ];
  function practiceGrid() {
    return el('div', { class: 'practice-grid' }, PRACTICE.map((t) => el('button', { class: 'tile', onclick: () => go(t.hash) }, [
      CS.icon(t.icon, 20),
      el('div', {}, [el('h3', { text: t.title }), el('p', { text: t.desc })]),
    ])));
  }

  function renderHome() {
    const root = $('#app');
    root.innerHTML = '';
    const totalRooms = ROOMS.length;
    const doneRooms = ROOMS.filter(roomDone).length;
    const totalQ = ROOMS.reduce((n, r) => n + roomQuestionCount(r), 0);
    const doneQ = ROOMS.reduce((n, r) => n + roomAnsweredCount(r), 0);
    const L = levelFor(STATE.xp);
    const next = continueRoom();
    const started = doneQ > 0;

    const home = el('section', { class: 'home wrap' });
    const intro = el('div', {}, [
      el('span', { class: 'label', text: 'NineMinds Cyber Dojo' }),
      el('h1', { text: 'Leer cybersecurity door het te doen.' }),
      el('p', { class: 'lead', text: 'Korte uitleg, oefenen in echte labs in je browser, en vragen met vlaggen om te vinden. In het Nederlands, van de basis tot je eerste onderzoek naar cybercrime.' }),
      el('ol', { class: 'how' }, [
        ['Lees', 'Korte uitleg per taak, met voorbeelden uit echte zaken.'],
        ['Oefen', 'Een lab in je browser: veilig, offline, niets wordt echt aangevallen.'],
        ['Bewijs', 'Beantwoord de vragen en vind de vlag. Zo weet je dat je het echt kunt.'],
      ].map((x, i) => el('li', {}, [el('span', { class: 'num', text: '0' + (i + 1) }), el('strong', { text: x[0] }), el('span', { class: 'd', text: x[1] })]))),
    ]);

    // Rechts: waar je bent, en één knop om verder te gaan.
    const cont = el('div', { class: 'continue' });
    if (next) {
      const p = PATHS.find((x) => x.id === next.path) || { title: '' };
      const sib = pathRooms(next.path);
      const inRoom = roomProgress(next) > 0;
      cont.append(el('div', { class: 'head' }, [
        el('span', { class: 'label', text: started ? 'Ga verder' : 'Begin hier' }),
        el('h2', { text: next.title }),
        el('p', { class: 'where', text: p.title + ' · room ' + (sib.indexOf(next) + 1) + ' van ' + sib.length }),
      ]));
      cont.append(el('div', { class: 'body' }, [
        el('div', { class: 'meta-row' }, [diffNode(next.difficulty), metaItem('clock', next.minutes + ' min'), metaItem('question', roomAnsweredCount(next) + '/' + roomQuestionCount(next), true)]),
        meterLine(roomProgress(next)),
        el('button', { class: 'btn primary', onclick: () => go('#/room/' + next.id) }, [el('span', { text: inRoom ? 'Verder met deze room' : 'Start deze room' }), CS.icon('arrowRight', 18)]),
      ]));
    } else {
      cont.append(el('div', { class: 'head' }, [
        el('span', { class: 'label', text: 'Alles voltooid' }),
        el('h2', { text: 'Je hebt elke room afgerond.' }),
        el('p', { class: 'where', text: 'Houd het scherp met een examen of de dagchallenge.' }),
      ]));
      cont.append(el('div', { class: 'body' }, el('button', { class: 'btn primary', onclick: () => go('#/examen') }, [el('span', { text: 'Doe een examen' }), CS.icon('arrowRight', 18)])));
    }
    const cell = (n, of, l) => el('div', { class: 's' }, [el('div', { class: 'n' }, [document.createTextNode(String(n)), of != null ? el('small', { text: '/' + of }) : null]), el('div', { class: 'l', text: l })]);
    cont.append(el('div', { class: 'stats' }, [
      cell(doneRooms, totalRooms, 'rooms af'),
      cell(doneQ, totalQ, 'vragen'),
      cell(STATE.flags || 0, null, 'vlaggen'),
      cell('LV ' + L.lvl, null, STATE.xp + ' XP'),
    ]));
    home.append(el('div', { class: 'home-top' }, [intro, cont]));

    // De leerpaden: een lijst, niet 78 kaarten. Een pad openen toont zijn rooms.
    const list = el('ol', { class: 'pathlist' });
    PATHS.forEach((p, i) => {
      const rooms = pathRooms(p.id);
      if (!rooms.length) return;
      const done = rooms.filter(roomDone).length;
      const all = done === rooms.length;
      list.append(el('li', {}, el('a', { class: 'pathrow' + (all ? ' done' : ''), href: '#/pad/' + p.id }, [
        el('span', { class: 'no', text: String(i + 1).padStart(2, '0') }),
        el('span', { class: 'glyph' }, pathGlyph(p.id, 20)),
        el('div', {}, [el('h3', { text: p.title }), el('p', { text: p.desc })]),
        el('div', { class: 'prog' }, [
          el('span', { class: 'num', text: done + '/' + rooms.length + ' rooms · ' + fmtMinutes(rooms.reduce((n, r) => n + r.minutes, 0)) }),
          meterLine(done / rooms.length, all),
        ]),
        el('span', { class: 'go' }, CS.icon('chevron', 18)),
      ])));
    });
    home.append(homeSection('Leerpaden', 'Volg ze van boven naar beneden; elke room bouwt voort op de vorige.', list));
    home.append(homeSection('Oefenen', 'Herhalen, jezelf toetsen en losse gereedschappen.', practiceGrid(), 'oefenen'));

    root.append(home);
    renderFooter(root);
    checkBadges();
  }

  // =======================================================================
  //  RENDER: oefenen
  // =======================================================================
  function renderPractice() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Oefenen']]));
    wrap.append(pageHead('practice', 'Oefenen', 'Herhaal wat je geleerd hebt, toets jezelf, of gebruik een lab los. Niets hiervan verandert je lesvoortgang; badges en records tellen wel.'));
    wrap.append(practiceGrid());
    root.append(wrap); renderFooter(root); window.scrollTo(0, 0);
  }

  // =======================================================================
  //  RENDER: leerpad
  // =======================================================================
  function renderPath(pathId) {
    const p = PATHS.find((x) => x.id === pathId);
    const rooms = p ? pathRooms(p.id) : [];
    if (!p || !rooms.length) { renderHome(); return; }
    const root = $('#app'); root.innerHTML = '';
    const idx = PATHS.indexOf(p);
    const done = rooms.filter(roomDone).length;
    const view = el('section', { class: 'pathview wrap' });
    view.append(crumbs([['Leerpaden', '#/'], [p.title]]));
    view.append(el('header', { class: 'path-hero' }, [
      el('span', { class: 'glyph' }, pathGlyph(p.id, 28)),
      el('div', {}, [
        el('span', { class: 'label', text: 'Leerpad ' + String(idx + 1).padStart(2, '0') + ' van ' + PATHS.length }),
        el('h1', { text: p.title }),
        el('p', { text: p.desc }),
        el('div', { class: 'meta-row' }, [
          el('span', { class: 'num', text: done + '/' + rooms.length + ' rooms af' }),
          metaItem('clock', fmtMinutes(rooms.reduce((n, r) => n + r.minutes, 0))),
          metaItem('question', rooms.reduce((n, r) => n + roomQuestionCount(r), 0) + ' vragen', true),
        ]),
        meterLine(done / rooms.length, done === rooms.length),
      ]),
    ]));
    const spine = el('ol', { class: 'spine' });
    rooms.forEach((r, i) => spine.append(el('li', {}, roomRow(r, rooms, i))));
    view.append(spine);

    const withRooms = PATHS.filter((x) => pathRooms(x.id).length);
    const pi = withRooms.indexOf(p);
    const prev = withRooms[pi - 1], nxt = withRooms[pi + 1];
    view.append(el('div', { class: 'path-foot' }, [
      prev ? el('a', { class: 'btn', href: '#/pad/' + prev.id }, [CS.icon('arrowLeft', 18), el('span', { text: prev.title })]) : el('span', {}),
      nxt ? el('a', { class: 'btn', href: '#/pad/' + nxt.id }, [el('span', { text: nxt.title }), CS.icon('arrowRight', 18)]) : el('span', {}),
    ]));
    root.append(view);
    renderFooter(root);
    window.scrollTo(0, 0);
  }

  function roomRow(room, siblings, idx) {
    const prog = roomProgress(room);
    const done = roomDone(room);
    // Zachte volgorde: een room is "op slot" tot de vorige in dit pad af is. Het is
    // een advies, geen muur; de melding zegt welke eerst.
    const locked = idx > 0 && !roomDone(siblings[idx - 1]) && prog === 0;
    const open = () => {
      if (!locked) go('#/room/' + room.id);
      else toast('Eerst de vorige room', 'Rond eerst "' + siblings[idx - 1].title + '" af.');
    };
    const row = el('div', {
      class: 'roomrow' + (done ? ' done' : prog > 0 ? ' started' : '') + (locked ? ' locked' : ''),
      role: 'link', tabindex: '0', 'aria-label': room.title + (done ? ', voltooid' : locked ? ', nog op slot' : ''),
      onclick: open, onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } },
    });
    row.append(el('span', { class: 'node', 'aria-hidden': 'true' }));
    row.append(el('div', {}, [
      el('span', { class: 'stamp', text: 'Room ' + (idx + 1) }),
      el('h3', { text: room.title }),
      el('p', { class: 'sum', text: room.summary }),
      el('div', { class: 'meta-row' }, [diffNode(room.difficulty), metaItem('clock', room.minutes + ' min'), metaItem('question', String(roomQuestionCount(room)), true)]),
    ]));
    const state = el('div', { class: 'state' });
    if (done) state.append(el('span', { class: 'ok' }, [CS.icon('check', 16), el('span', { text: 'Voltooid' })]));
    else if (locked) state.append(el('span', { class: 'num' }, [CS.icon('lock', 15)]));
    else if (prog > 0) state.append(el('span', { class: 'num', text: Math.round(prog * 100) + '%' }), meterLine(prog));
    else state.append(el('span', { class: 'num', text: 'Start' }), CS.icon('arrowRight', 16));
    row.append(state);
    return row;
  }

  function firstRoomHash() {
    const all = orderedRooms();
    return all.length ? '#/room/' + all[0].id : '#/';
  }
  function orderedRooms() {
    const out = [];
    PATHS.forEach((p) => pathRooms(p.id).forEach((r) => out.push(r)));
    return out;
  }
  function continueRoom() {
    const all = orderedRooms();
    return all.find((r) => !roomDone(r) && roomProgress(r) > 0) || all.find((r) => !roomDone(r)) || null;
  }
  function continueTarget() {
    const r = continueRoom();
    return r ? '#/room/' + r.id : null;
  }

  // =======================================================================
  //  RENDER: room
  // =======================================================================
  let taskObserver;
  function renderRoom(roomId) {
    const room = ROOMS.find((r) => r.id === roomId);
    const root = $('#app');
    root.innerHTML = '';
    if (!room) {
      root.append(el('section', { class: 'roomview wrap' }, [pageHead('question', 'Room niet gevonden', 'Deze room bestaat niet (meer).'), el('a', { class: 'btn', href: '#/', text: 'Naar het overzicht' })]));
      return;
    }
    const p = PATHS.find((x) => x.id === room.path) || { id: room.path, title: room.path };
    const siblings = pathRooms(room.path);
    const pos = siblings.indexOf(room);

    const view = el('section', { class: 'roomview wrap' });
    view.append(crumbs([['Leerpaden', '#/'], [p.title, '#/pad/' + p.id], [room.title]]));
    view.append(el('header', { class: 'room-hero' }, [
      el('span', { class: 'label', text: p.title + ' · room ' + (pos + 1) + ' van ' + siblings.length }),
      el('h1', { text: room.title }),
      el('p', { class: 'sum', text: room.summary }),
      el('div', { class: 'meta-row' }, [
        diffNode(room.difficulty),
        metaItem('clock', room.minutes + ' min'),
        metaItem('question', roomQuestionCount(room) + ' vragen', true),
        el('span', { class: 'num', text: '+' + roomMaxXP(room) + ' XP' }),
      ]),
    ]));

    if (room.objectives && room.objectives.length) {
      view.append(el('section', { class: 'objectives' }, [
        el('h3', { class: 'label', text: 'Wat je na deze room kunt' }),
        el('ul', {}, room.objectives.map((o) => el('li', {}, [CS.icon('check', 15), el('span', { text: o })]))),
      ]));
    }

    const layout = el('div', { class: 'roomlayout' });
    const nav = el('nav', { class: 'tasknav', 'aria-label': 'Taken in deze room' });
    nav.append(el('span', { class: 'label', text: 'Taken' }));
    nav.append(el('div', { class: 'tn-progress' }, [meterLine(roomProgress(room), roomDone(room)), el('span', { class: 'num tn-count', text: roomAnsweredCount(room) + '/' + roomQuestionCount(room) })]));
    const ol = el('ol');
    (room.tasks || []).forEach((t, ti) => {
      const li = el('li', { 'data-ti': ti, tabindex: '0', onclick: () => jumpTo(ti), onkeydown: (e) => { if (e.key === 'Enter') jumpTo(ti); } }, [
        el('span', { class: 'chk', 'data-n': String(ti + 1), 'aria-hidden': 'true' }),
        el('span', {}, [el('span', { class: 'tn-sub', text: 'Taak ' + (ti + 1) }), el('span', { class: 'tn-title', text: taskTitle(t.title) })]),
      ]);
      if (taskComplete(room, ti)) li.classList.add('complete');
      ol.append(li);
    });
    nav.append(ol);
    layout.append(nav);

    const content = el('div', { class: 'room-content' });
    (room.tasks || []).forEach((t, ti) => content.append(renderTask(room, t, ti)));

    if (room.terms && room.terms.length) {
      content.append(el('section', { class: 'task glossary' }, [
        el('span', { class: 'stamp', text: 'Naslag' }),
        el('h2', { text: 'Begrippenlijst' }),
        el('dl', {}, room.terms.flatMap((t) => [el('dt', { text: t.term }), el('dd', { text: t.def })])),
      ]));
    }
    if (room.resources && room.resources.length) {
      content.append(el('section', { class: 'task' }, [
        el('span', { class: 'stamp', text: 'Verder' }),
        el('h2', { text: 'Verder oefenen' }),
        el('ul', { class: 'resources' }, room.resources.map((r) => el('li', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener' }, [CS.icon('link', 16), el('span', { text: r.title })])))),
      ]));
    }

    content.append(el('div', { id: 'roomDone' }));
    const all = orderedRooms();
    const at = all.findIndex((r) => r.id === room.id);
    const prevR = all[at - 1], nextR = all[at + 1];
    content.append(el('div', { class: 'room-foot' }, [
      prevR ? el('button', { class: 'btn', onclick: () => go('#/room/' + prevR.id) }, [el('span', { class: 'stamp', text: 'Vorige room' }), el('span', { text: prevR.title })]) : el('span', {}),
      nextR
        ? el('button', { class: 'btn primary next', onclick: () => go('#/room/' + nextR.id) }, [el('span', { class: 'stamp', text: 'Volgende room' }), el('span', { text: nextR.title })])
        : el('button', { class: 'btn primary next', onclick: () => go('#/') }, [el('span', { class: 'stamp', text: 'Klaar' }), el('span', { text: 'Naar het overzicht' })]),
    ]));

    layout.append(content);
    view.append(layout);
    root.append(view);
    renderFooter(root);
    renderRoomDone(room, false);
    watchTasks();
    window.scrollTo(0, 0);
  }
  function jumpTo(ti) {
    const node = $('#task-' + ti);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Markeer in de takenlijst de taak die je nu leest.
  function watchTasks() {
    if (taskObserver) taskObserver.disconnect();
    if (!('IntersectionObserver' in window)) return;
    const seen = new Map();
    taskObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      const first = $$('.room-content > .task[id^="task-"]').find((n) => seen.get(n.id));
      if (!first) return;
      const ti = first.id.slice(5);
      $$('.tasknav li').forEach((li) => li.classList.toggle('active', li.getAttribute('data-ti') === ti));
    }, { rootMargin: '-80px 0px -55% 0px' });
    $$('.room-content > .task[id^="task-"]').forEach((n) => taskObserver.observe(n));
  }
  // Het bewezen blok onderaan, zodra de room af is.
  function renderRoomDone(room, fresh) {
    const box = $('#roomDone'); if (!box) return;
    box.innerHTML = '';
    if (!roomDone(room)) return;
    const seal = markNode('seal', true);
    box.append(el('div', { class: 'room-done', role: 'status' }, [
      seal,
      el('div', {}, [el('h3', { text: 'Room voltooid' }), el('p', { text: 'Alle ' + roomQuestionCount(room) + ' vragen goed. ' + roomMaxXP(room) + ' XP verdiend.' })]),
    ]));
    const svg = seal.querySelector('svg');
    if (svg) svg.setAttribute('data-state', fresh ? 'verified' : 'static');
  }

  function roomMaxXP(room) {
    let xp = 0;
    (room.tasks || []).forEach((t) => (t.questions || []).forEach((q) => { xp += qXP(q); }));
    return xp;
  }
  function qXP(q) { return q.xp != null ? q.xp : (q.noAnswer ? 2 : (Array.isArray(q.options) ? 5 : 10)); }
  function taskComplete(room, ti) {
    const t = room.tasks[ti];
    if (!t.questions || !t.questions.length) return true;
    return t.questions.every((q, qi) => isAnswered(room.id, ti, qi));
  }

  function renderTask(room, task, ti) {
    const node = el('section', { class: 'task', id: 'task-' + ti });
    node.append(el('span', { class: 'stamp', text: 'Taak ' + (ti + 1) + ' van ' + room.tasks.length }));
    node.append(el('h2', { text: taskTitle(task.title) }));
    node.append(el('div', { class: 'body', html: task.content || '' }));

    if (task.lab) {
      const labBox = el('div', {});
      node.append(labBox);
      const renderer = CS.labs[task.lab.type];
      if (renderer) { try { renderer(labBox, task.lab, { room, ti }); } catch (e) { labBox.append(el('div', { class: 'callout danger', text: 'Lab kon niet laden: ' + e.message })); console.error(e); } }
      else labBox.append(el('div', { class: 'callout warn', text: 'Onbekend labtype: ' + task.lab.type }));
    }

    if (task.questions && task.questions.length) {
      const qwrap = el('div', { class: 'questions' });
      qwrap.append(el('h3', {}, [CS.icon('question', 15), el('span', { text: task.questions.length === 1 ? 'Vraag' : task.questions.length + ' vragen' })]));
      task.questions.forEach((q, qi) => qwrap.append(renderQuestion(room, task, ti, q, qi)));
      node.append(qwrap);
    }
    return node;
  }

  function markAnswered(room, ti, qi, q) {
    const key = qKey(room.id, ti, qi);
    if (STATE.answered[key]) return;
    STATE.answered[key] = true;
    // vlaggen tellen
    const ansFirst = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    if (typeof ansFirst === 'string' && /^NM\{/.test(ansFirst)) { STATE.flags = (STATE.flags || 0) + 1; }
    saveState();
    addXP(qXP(q), 'vraag');
    updateTaskNav(room);
    proveMark();
    if (roomDone(room)) {
      toast('Room voltooid', room.title, 'proof');
      renderRoomDone(room, true);
    }
    checkBadges();
  }

  function updateTaskNav(room) {
    $$('.tasknav li').forEach((li) => {
      const ti = +li.getAttribute('data-ti');
      li.classList.toggle('complete', taskComplete(room, ti));
    });
    const prog = $('.tasknav .tn-progress');
    if (prog) {
      prog.replaceChild(meterLine(roomProgress(room), roomDone(room)), prog.firstChild);
      $('.tn-count', prog).textContent = roomAnsweredCount(room) + '/' + roomQuestionCount(room);
    }
  }

  function setFeedback(fb, ok, text) {
    fb.innerHTML = '';
    fb.append(CS.icon(ok ? 'check' : 'cross', 16), el('span', { text }));
    fb.className = 'feedback show ' + (ok ? 'ok' : 'no');
  }

  function renderQuestion(room, task, ti, q, qi) {
    const already = isAnswered(room.id, ti, qi);
    const node = el('div', { class: 'q' + (already ? ' correct' : '') });
    node.append(el('div', { class: 'qtext' }, [el('span', { html: esc(q.q) }), el('span', { class: 'badge-xp', text: '+' + qXP(q) + ' XP' })]));

    const feedback = el('div', { class: 'feedback', 'aria-live': 'polite' });
    const explainBox = q.explain ? el('div', { class: 'explain' + (already ? ' show' : ''), html: esc(q.explain) }) : null;
    const solved = () => { node.classList.add('correct'); if (explainBox) explainBox.classList.add('show'); markAnswered(room, ti, qi, q); };

    if (q.noAnswer) {
      // Geen antwoord nodig: lezen en bevestigen.
      const btn = el('button', { class: 'btn small' + (already ? '' : ' primary'), disabled: already });
      const paint = (done) => { btn.innerHTML = ''; if (done) btn.append(CS.icon('check', 16)); btn.append(el('span', { text: done ? 'Gelezen' : 'Markeer als gelezen' })); };
      paint(already);
      btn.addEventListener('click', () => { solved(); paint(true); btn.disabled = true; btn.classList.remove('primary'); });
      node.append(btn);
    } else if (Array.isArray(q.options)) {
      const mc = el('div', { class: 'mc', role: 'group' });
      q.options.forEach((opt, oi) => {
        const b = el('button', { html: esc(opt), disabled: already });
        if (already && oi === q.answer) b.classList.add('reveal-ok');
        b.addEventListener('click', () => {
          if (isAnswered(room.id, ti, qi)) return;
          const ok = oi === q.answer;
          b.classList.add('chosen', ok ? 'ok' : 'no');
          if (ok) {
            // Eerder fout gekozen opties tonen geen kruis meer: alleen het goede antwoord blijft staan.
            $$('button', mc).forEach((x) => { x.disabled = true; if (x !== b) x.classList.remove('chosen', 'no'); });
            setFeedback(feedback, true, 'Goed.');
            solved();
          } else {
            setFeedback(feedback, false, 'Niet helemaal. Kies opnieuw.');
            setTimeout(() => { b.classList.remove('chosen', 'no'); }, 1100);
          }
        });
        mc.append(b);
      });
      node.append(mc);
    } else {
      // Open antwoord: een vlag, een getal, een begrip.
      const answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => String(a));
      const placeholder = answers[0].replace(/[^\s]/g, '•').slice(0, 24) || 'antwoord…';
      const input = el('input', { type: 'text', placeholder: already ? answers[0] : placeholder, value: already ? answers[0] : '', disabled: already, autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Jouw antwoord' });
      if (already) input.classList.add('ok');
      const submit = el('button', { class: 'btn small primary', disabled: already });
      const paint = (done) => { submit.innerHTML = ''; if (done) submit.append(CS.icon('check', 16)); submit.append(el('span', { text: done ? 'Goed' : 'Controleer' })); };
      paint(already);
      const check = () => {
        if (isAnswered(room.id, ti, qi)) return;
        const val = norm(input.value).toLowerCase();
        if (!val) return;
        const ok = answers.some((a) => norm(a).toLowerCase() === val);
        if (ok) {
          input.classList.add('ok'); input.classList.remove('no'); input.disabled = true; submit.disabled = true; submit.classList.remove('primary'); paint(true);
          setFeedback(feedback, true, /^NM\{/i.test(answers[0]) ? 'Vlag gevonden.' : 'Correct.');
          solved();
        } else {
          input.classList.remove('no'); void input.offsetWidth; input.classList.add('no');
          setFeedback(feedback, false, q.hint ? 'Nog niet goed. Lees de uitleg nog eens, of open de hint.' : 'Nog niet goed. Lees de uitleg nog eens.');
        }
      };
      submit.addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
      node.append(el('div', { class: 'ans-row' }, [input, submit]));

      if (q.hint) {
        const hintLine = el('div', { class: 'hintline' }, [CS.icon('hint', 16), el('span', { text: q.hint })]);
        const hintBtn = el('button', { class: 'lnk', text: 'Toon een hint', 'aria-expanded': 'false' });
        hintBtn.addEventListener('click', () => {
          const open = hintLine.classList.toggle('show');
          hintBtn.textContent = open ? 'Verberg de hint' : 'Toon een hint';
          hintBtn.setAttribute('aria-expanded', String(open));
        });
        node.append(el('div', { class: 'hintrow' }, hintBtn));
        node.append(hintLine);
      }
    }
    node.append(feedback);
    if (explainBox) node.append(explainBox);
    return node;
  }

  // =======================================================================
  //  Zoeken
  // =======================================================================
  let searchPanel;
  let searchHits = [];
  function closeSearch() {
    if (searchPanel) { searchPanel.remove(); searchPanel = null; }
    searchHits = [];
  }
  function openHit(r) {
    closeSearch();
    const input = $('#searchInput'); if (input) { input.value = ''; input.blur(); }
    const s = $('.search'); if (s) s.classList.remove('open');
    go('#/room/' + r.id);
  }
  function onSearch() {
    const q = norm(($('#searchInput') || {}).value || '').toLowerCase();
    closeSearch();
    if (q.length < 2) return;
    // Eerst wat in de titel staat, dan wat in de samenvatting of doelen staat,
    // dan wat ergens in de lesstof voorkomt.
    const scored = [];
    ROOMS.forEach((r) => {
      const title = r.title.toLowerCase();
      const meta = (r.summary + ' ' + (r.objectives || []).join(' ') + ' ' + (r.terms || []).map((t) => t.term).join(' ')).toLowerCase();
      const body = ((r.terms || []).map((t) => t.def).join(' ') + ' ' + (r.tasks || []).map((t) => t.title + ' ' + (t.content || '')).join(' ')).toLowerCase();
      const score = title.includes(q) ? 3 : meta.includes(q) ? 2 : body.includes(q) ? 1 : 0;
      if (score) scored.push({ r, score });
    });
    scored.sort((a, b) => b.score - a.score);
    searchHits = scored.slice(0, 8).map((x) => x.r);
    const panel = el('div', { class: 'panel', role: 'listbox', 'aria-label': 'Zoekresultaten' },
      searchHits.length ? searchHits.map((r, i) => {
        const p = PATHS.find((x) => x.id === r.path) || { title: '' };
        return el('div', { class: 'item' + (i === 0 ? ' sel' : ''), role: 'option', onclick: () => openHit(r) }, [
          pathGlyph(r.path, 17),
          el('div', {}, [el('div', { class: 't', text: r.title }), el('div', { class: 's', text: p.title + ' · ' + r.summary })]),
        ]);
      }) : el('div', { class: 'empty', text: 'Niets gevonden voor "' + q + '".' }));
    searchPanel = el('div', { class: 'searchres' }, el('div', { class: 'wrap' }, panel));
    document.body.append(searchPanel);
  }
  function onSearchKey(e) {
    if (e.key === 'Escape') { e.target.value = ''; closeSearch(); e.target.blur(); return; }
    const items = searchPanel ? $$('.item', searchPanel) : [];
    if (!items.length) return;
    let i = items.findIndex((n) => n.classList.contains('sel'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      i = (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((n, k) => n.classList.toggle('sel', k === i));
    } else if (e.key === 'Enter' && searchHits[Math.max(0, i)]) {
      openHit(searchHits[Math.max(0, i)]);
    }
  }
  document.addEventListener('click', (e) => {
    if (searchPanel && !searchPanel.contains(e.target) && !e.target.closest('.search') && !e.target.closest('.searchbtn')) closeSearch();
  });
  // "/" springt naar het zoekveld, zoals op de meeste leerplatforms.
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    const input = $('#searchInput'); if (!input) return;
    e.preventDefault();
    const s = $('.search'); if (s) s.classList.add('open');
    input.focus();
  });

  // =======================================================================
  //  Dialogen: badges & profiel
  // =======================================================================
  function modal(title, bodyNode) {
    const prevFocus = document.activeElement;
    const close = () => { back.remove(); document.removeEventListener('keydown', onKey); if (prevFocus && prevFocus.focus) prevFocus.focus(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const back = el('div', { class: 'modal-back', onclick: (e) => { if (e.target === back) close(); } });
    const m = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title });
    const closeBtn = el('button', { class: 'iconbtn close', title: 'Sluiten', 'aria-label': 'Sluiten', onclick: close }, CS.icon('close', 18));
    m.append(closeBtn, el('h2', { text: title }), bodyNode);
    back.append(m);
    document.body.append(back);
    document.addEventListener('keydown', onKey);
    closeBtn.focus();
    back.close = close;
    return back;
  }
  function badgeGrid() {
    const grid = el('div', { class: 'badge-grid' });
    BADGES.forEach((b) => {
      const got = !!STATE.badges[b.id];
      grid.append(el('div', { class: 'badge-item' + (got ? '' : ' locked') }, [
        el('div', { class: 'bi' }, CS.icon(got ? b.icon : 'lock', 18)),
        el('div', { class: 'bn', text: b.name }),
        el('div', { class: 'bd', text: b.desc }),
      ]));
    });
    return grid;
  }
  function showBadges() {
    modal('Badges · ' + Object.keys(STATE.badges).length + ' van ' + BADGES.length, badgeGrid());
  }
  function showProfile() {
    const L = levelFor(STATE.xp);
    const doneRooms = ROOMS.filter(roomDone).length;
    const body = el('div', {});
    body.append(el('div', { class: 'stat-row', style: 'margin:0 0 16px' }, [
      stat('LV ' + L.lvl, STATE.xp + ' XP totaal'),
      stat(doneRooms + '/' + ROOMS.length, 'rooms af'),
      stat(String(STATE.flags || 0), 'vlaggen'),
    ]));
    body.append(el('div', { class: 'meter-line' }, el('i', { style: 'width:' + Math.round((L.into / L.need) * 100) + '%' })));
    body.append(el('p', { class: 'found-note', text: L.into + ' / ' + L.need + ' XP tot level ' + (L.lvl + 1) }));
    body.append(el('h3', { class: 'label', style: 'margin:22px 0 0', text: 'Badges · ' + Object.keys(STATE.badges).length + ' van ' + BADGES.length }));
    body.append(badgeGrid());
    body.append(el('hr', {}));
    body.append(el('p', { class: 'found-note', text: 'Je voortgang staat alleen in deze browser. Wissen kan niet ongedaan worden gemaakt.' }));
    const dlg = modal('Jouw voortgang', body);
    body.append(el('button', { class: 'btn small', onclick: () => {
      if (confirm('Weet je het zeker? Al je voortgang, XP en badges worden gewist.')) {
        STATE = { answered: {}, xp: 0, badges: {}, flags: 0 }; saveState(); renderXP();
        dlg.close(); route();
      }
    } }, [CS.icon('reset', 16), el('span', { text: 'Voortgang wissen' })]));
  }

  // =======================================================================
  //  Oefenarena — willekeurige herhaalvragen uit alle rooms
  // =======================================================================
  function allQuestions(filterPath) {
    const pool = [];
    ROOMS.forEach((r) => {
      if (filterPath && filterPath !== 'alles' && r.path !== filterPath) return;
      (r.tasks || []).forEach((t, ti) => (t.questions || []).forEach((q, qi) => {
        if (q.noAnswer) return; // alleen echte vragen
        pool.push({ room: r, ti, qi, q });
      }));
    });
    return pool;
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

  function renderArena() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Oefenen', '#/oefenen'], ['Oefenarena']]), pageHead('practice', 'Oefenarena', 'Willekeurige vragen uit alle lessen, door elkaar. Puur om te herhalen — dit verandert je lesvoortgang niet. Hoe lang wordt je reeks?'));

    // filter op leerpad
    const filterRow = el('div', { class: 'chip-row', style: 'margin:14px 0' });
    let curFilter = 'alles';
    const paths = [{ id: 'alles', title: 'Alles' }].concat(PATHS.filter((p) => ROOMS.some((r) => r.path === p.id)).map((p) => ({ id: p.id, title: p.title })));
    const scoreBox = el('div', { class: 'stat-row', style: 'margin:0 0 16px' });
    const qbox = el('div', {});
    let pool = [], idx = 0, score = 0, streak = 0, answered = 0;

    function start() {
      pool = shuffle(allQuestions(curFilter)); idx = 0; score = 0; streak = 0; answered = 0;
      next();
      renderScore();
    }
    function renderScore() {
      scoreBox.innerHTML = '';
      scoreBox.append(
        stat(answered ? score + '/' + answered : '0', 'goed'),
        stat(streak + '', 'huidige reeks'),
        stat((STATE.bestStreak || 0) + '', 'langste reeks ooit'),
      );
    }
    paths.forEach((p) => {
      const chip = el('span', { class: 'chip' + (p.id === curFilter ? ' on' : ''), text: p.title, onclick: () => { curFilter = p.id; $$('.chip', filterRow).forEach((c) => c.classList.remove('on')); chip.classList.add('on'); start(); } });
      filterRow.append(chip);
    });

    function next() {
      qbox.innerHTML = '';
      if (!pool.length) { qbox.append(el('div', { class: 'callout warn', text: 'Geen vragen in deze categorie.' })); return; }
      const item = pool[idx % pool.length];
      const card = el('div', { class: 'q quizcard' });
      card.append(el('div', { class: 'stamp', style: 'display:block;margin-bottom:8px', text: item.room.title }));
      card.append(el('div', { class: 'qtext', style: 'font-weight:600;margin-bottom:12px', html: esc(item.q.q) }));
      const fb = el('div', { class: 'feedback' });
      const nextBtn = el('button', { class: 'btn primary', text: 'Volgende', onclick: () => { idx++; next(); } });
      nextBtn.style.display = 'none';
      const afterAnswer = (correct) => {
        answered++;
        if (correct) { score++; streak++; if (streak > (STATE.bestStreak || 0)) { STATE.bestStreak = streak; saveState(); checkBadges(); } }
        else { streak = 0; }
        renderScore();
        nextBtn.style.display = '';
        if (item.q.explain) { const ex = el('div', { class: 'explain show', html: esc(item.q.explain) }); card.append(ex); }
      };
      if (Array.isArray(item.q.options)) {
        const mc = el('div', { class: 'mc' });
        let done = false;
        item.q.options.forEach((opt, oi) => {
          const b = el('button', { html: esc(opt), onclick: () => {
            if (done) return; done = true;
            const ok = oi === item.q.answer;
            b.classList.add('chosen', ok ? 'ok' : 'no');
            $$('button', mc).forEach((x, xi) => { x.disabled = true; if (xi === item.q.answer) x.classList.add('reveal-ok'); });
            setFeedback(fb, ok, ok ? 'Goed.' : 'Mis.');
            afterAnswer(ok);
          } });
          mc.append(b);
        });
        card.append(mc);
      } else {
        const answers = (Array.isArray(item.q.answer) ? item.q.answer : [item.q.answer]).map(String);
        const input = el('input', { type: 'text', class: '', placeholder: 'antwoord…', autocomplete: 'off', spellcheck: 'false' });
        const submit = el('button', { class: 'btn small primary', text: 'Controleer' });
        let done = false;
        const check = () => {
          if (done) return; const val = norm(input.value).toLowerCase(); if (!val) return;
          const ok = answers.some((a) => norm(a).toLowerCase() === val);
          if (ok) { done = true; input.classList.add('ok'); input.disabled = true; submit.disabled = true; setFeedback(fb, true, 'Correct.'); afterAnswer(true); }
          else { input.classList.add('no'); setFeedback(fb, false, 'Nog niet. Het juiste antwoord: ' + answers[0]); done = true; input.disabled = true; submit.disabled = true; afterAnswer(false); }
        };
        submit.addEventListener('click', check);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
        card.append(el('div', { class: 'ans-row' }, [input, submit]));
      }
      card.append(fb);
      card.append(el('div', { style: 'margin-top:12px' }, nextBtn));
      qbox.append(card);
    }

    wrap.append(filterRow, scoreBox, qbox);
    root.append(wrap);
    renderFooter(root);
    start();
    window.scrollTo(0, 0);
  }

  // =======================================================================
  //  Begrippentrainer — flashcards uit alle rooms
  // =======================================================================
  function allTerms() {
    const out = [];
    ROOMS.forEach((r) => (r.terms || []).forEach((t) => out.push({ term: t.term, def: t.def, room: r.title })));
    return out;
  }
  function renderFlashcards() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Oefenen', '#/oefenen'], ['Begrippentrainer']]), pageHead('cards', 'Begrippentrainer', 'Flashcards met alle vakbegrippen. Lees de term, denk aan de betekenis, draai de kaart om en beoordeel jezelf. Begrippen die je nog oefent komen vaker terug.'));

    STATE.cardsLearned = STATE.cardsLearned || {}; // term -> true als "kende ik"
    let deck = shuffle(allTerms());
    // zet nog-te-leren vooraan
    deck.sort((a, b) => (STATE.cardsLearned[a.term] ? 1 : 0) - (STATE.cardsLearned[b.term] ? 1 : 0));
    let pos = 0, flipped = false;

    const counter = el('div', { class: 'found-note', style: 'margin:10px 0' });
    const cardWrap = el('div', {});
    function known() { return allTerms().filter((t) => STATE.cardsLearned[t.term]).length; }
    function draw() {
      cardWrap.innerHTML = '';
      const total = deck.length;
      counter.textContent = 'Kaart ' + (pos + 1) + ' / ' + total + ' · ' + known() + ' van ' + total + ' gemarkeerd als geleerd';
      if (!total) { cardWrap.append(el('div', { class: 'callout warn', text: 'Nog geen begrippen beschikbaar.' })); return; }
      const c = deck[pos % total];
      const card = el('div', { class: 'flashcard' + (flipped ? ' flipped' : ''), role: 'button', tabindex: '0', 'aria-label': flipped ? 'Kaart, achterkant' : 'Kaart, draai om', onclick: flip, onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } } });
      if (!flipped) {
        card.append(el('span', { class: 'label', text: 'Begrip · tik om te draaien' }));
        card.append(el('div', { class: 'term', text: c.term }));
      } else {
        card.append(el('span', { class: 'label', text: c.term }));
        card.append(el('div', { class: 'def', text: c.def }));
        card.append(el('span', { class: 'stamp', text: 'uit: ' + c.room }));
      }
      cardWrap.append(card);
      const btns = el('div', { class: 'room-foot' });
      if (!flipped) {
        btns.append(el('span', {}), el('button', { class: 'btn primary next', text: 'Draai om', onclick: flip }));
      } else {
        btns.append(
          el('button', { class: 'btn', text: 'Nog oefenen', onclick: () => { STATE.cardsLearned[c.term] = false; saveState(); advance(); } }),
          el('button', { class: 'btn primary next', text: 'Kende ik', onclick: () => { STATE.cardsLearned[c.term] = true; saveState(); checkBadges(); advance(); } }),
        );
      }
      cardWrap.append(btns);
    }
    function flip() { flipped = !flipped; draw(); }
    function advance() { pos = (pos + 1) % deck.length; flipped = false; draw(); }

    wrap.append(counter, cardWrap);
    root.append(wrap);
    renderFooter(root);
    draw();
    window.scrollTo(0, 0);
  }

  // =======================================================================
  //  Gereedschapskist — alle interactieve tools los te gebruiken
  // =======================================================================
  const TOOLBOX = [
    { type: 'cyberchef', name: 'CyberChef', desc: 'Coderen, decoderen en hashen (Base64, hex, ROT13, XOR, MD5/SHA-…).', cfg: { input: 'NM{probeer_mij}' } },
    { type: 'hashcrack', name: 'Hash-kraker', desc: 'Woordenlijst, regels (mangling) of brute-force (masker) — op MD5/SHA/NTLM.', cfg: { algo: 'md5', hash: '5f4dcc3b5aa765d61d8327deb882cf99', wordlist: ['123456', 'welkom', 'password', 'qwerty', 'geheim', 'letmein'] } },
    { type: 'hashid', name: 'Hash-herkenner', desc: 'Welk hashtype is dit? Herkent MD5, NTLM, SHA, bcrypt en meer.', cfg: { value: '$2y$10$N9qo8uLOickgx2ZMRZoMy.MH/rq8qjHjhHj' } },
    { type: 'cipher', name: 'Cijfer-kraker', desc: 'Caesar/ROT, XOR, Vigenère en Atbash ontcijferen.', cfg: { text: 'Kl nlolptl cshn pz QCA{jhlzhy_pz_thrrlspqr}' } },
    { type: 'multidecode', name: 'Multi-decoder', desc: 'Herkent en pelt lagen codering af (Base64/32, hex, binair, morse, ROT13, URL…).', cfg: { input: '536c5a55653231316248527058327868655756795832397266513d3d' } },
    { type: 'crackme', name: 'Crackme', desc: 'Reverse-engineering puzzel: lees de controle en vind de sleutel.', cfg: { title: 'demo', source: 'function check(key) {\n  // toegang als key, achterstevoren gelezen, "62oziuj" oplevert\n  return key.split("").reverse().join("") === "62oziuj";\n}', check: (k) => k.split('').reverse().join('') === '62oziuj', flag: 'NM{reverse_engineered}', hint: 'Draai de doelstring om: wat moet key dan zijn?' } },
    { type: 'rainbow', name: 'Rainbow table', desc: 'Zie waarom onvergezouten hashes direct op te zoeken zijn — en salt dat breekt.', cfg: { algo: 'md5', wordlist: ['welkom', 'zomer2024', 'admin', 'geheim', 'voetbal', 'wachtwoord', 'qwerty', 'liefde'], target: '371620aa75830b1388b63305b0d42f06', saltExample: { word: 'welkom', salt: 'Xy7' } } },
    { type: 'ach', name: 'ACH-matrix', desc: 'Concurrerende hypothesen afwegen door bewijs te scoren (C/I/N).', cfg: { question: 'Wie zit achter de ransomware-aanval op een fictief bedrijf?', hypotheses: ['Ontevreden insider', 'Georganiseerde crimineel (RaaS-affiliate)', 'Statelijke actor'], evidence: [{ text: 'Er is losgeld in crypto geëist', expert: ['I', 'C', 'I'] }, { text: 'Zeer gerichte spear-phishing vooraf' }, { text: 'Data gelekt op een bekende leksite' }, { text: 'Activiteit vooral tijdens kantooruren UTC+3' }] } },
    { type: 'crimescript', name: 'Crime script-builder', desc: 'Ontleed een delict in zes fasen met interventies per fase.', cfg: { scenario: 'Phishing-fraude met moneymules (fictief).' } },
    { type: 'admiralty', name: 'Bronbeoordeling', desc: 'Betrouwbaarheid (A–F) en geloofwaardigheid (1–6) apart beoordelen.', cfg: { items: [{ source: 'Anonieme tip via Meld Misdaad Anoniem', info: 'Verdachte X plant een aanval', reliability: 'E', credibility: '4', explain: 'Onbekende, niet te verifiëren bron; info niet bevestigd.' }, { source: 'Eigen SIEM-logs, geverifieerd', info: 'Mislukte logins vanaf één IP', reliability: 'A', credibility: '1', explain: 'Eigen betrouwbare meting, door meerdere logs bevestigd.' }] } },
    { type: 'probability', name: 'Waarschijnlijkheidstaal', desc: 'Koppel woorden als "waarschijnlijk" aan de juiste percentage-band.', cfg: {} },
    { type: 'attackmap', name: 'ATT&CK-mapping', desc: 'Koppel een waarneming aan de juiste MITRE ATT&CK-techniek.', cfg: { items: [{ desc: 'Aanvaller dumpt het LSASS-geheugen om wachtwoorden te stelen', code: 'T1003.001' }, { desc: 'Bestanden worden versleuteld en er verschijnt een losgeldbrief', code: 'T1486' }, { desc: 'Binnenkomst via een kwaadaardige bijlage in een mail', code: 'T1566.001' }, { desc: 'Zijwaartse beweging via RDP naar een andere host', code: 'T1021.001' }] } },
    { type: 'bluf', name: 'BLUF-herschrijven', desc: 'Herschrijf een chronologisch verhaal naar "conclusie eerst".', cfg: { source: 'Om 08:40 vijf mislukte RDP-logins vanaf 203.0.113.77. Om 08:44 een geslaagde login als adm.backup. Om 08:45 start powershell.exe. Om 09:01 een grote upload naar een clouddienst. Om 09:25 is het securitylog gewist.', model: 'Waarschijnlijk is account adm.backup overgenomen en is data geëxfiltreerd (betrouwbaarheid: gemiddeld, op basis van eigen logs). Advies: reset adm.backup en blokkeer het bron-IP — eigenaar: SOC. Onderbouwing: brute-force om 08:40, geslaagde login 08:44, upload 09:01, logwissing 09:25.' } },
    { type: 'flow', name: 'Stroom volgen', desc: 'Volg geld/data door mules, mixers en exchanges naar de cash-out.', cfg: { unit: 'BTC', scenario: 'Losgeld van 3 BTC — waar komt het eruit?', nodes: [{ id: 'v', type: 'victim', label: 'Slachtoffer' }, { id: 'm1', type: 'mule', label: 'Mule A' }, { id: 'm2', type: 'mule', label: 'Mule B' }, { id: 'mix', type: 'mixer', label: 'Mixer' }, { id: 'ex', type: 'exchange', label: 'Exchange Zuid' }], edges: [{ from: 'v', to: 'm1', amount: 1.8, time: '10:00' }, { from: 'v', to: 'm2', amount: 1.2, time: '10:01', note: 'splitsing' }, { from: 'm1', to: 'mix', amount: 1.75, time: '10:20', note: 'fee' }, { from: 'm2', to: 'mix', amount: 1.15, time: '10:22', note: 'fee' }, { from: 'mix', to: 'ex', amount: 2.8, time: '11:30' }], ask: [{ q: 'Waar stroomt het geld uiteindelijk uit?', answer: ['Exchange Zuid', 'exchange'], hint: 'Volg tot het laatste knooppunt.' }, { q: 'Hoeveel BTC bereikt de exchange?', answer: ['2.8'], hint: 'Tel de twee stromen door de mixer op.' }] } },
    { type: 'ordering', name: 'Volgorde-puzzel', desc: 'Reconstrueer de juiste volgorde van een aanval (tijdlijn/kill chain).', cfg: { prompt: 'Zet de fasen van de Cyber Kill Chain op volgorde.', items: [{ id: '1', label: 'Reconnaissance' }, { id: '2', label: 'Weaponization' }, { id: '3', label: 'Delivery' }, { id: '4', label: 'Exploitation' }, { id: '5', label: 'Installation' }, { id: '6', label: 'Command & Control' }, { id: '7', label: 'Actions on Objectives' }], correct: ['1', '2', '3', '4', '5', '6', '7'], explain: 'Dit is de volgorde van de Lockheed Martin Cyber Kill Chain.' } },
    { type: 'regexgolf', name: 'Regex-golf', desc: 'Schrijf één patroon dat de kwaadaardige regels matcht en de goede mijdt.', cfg: { prompt: 'Match alleen de phishing-domeinen.', match: ['login-nederbank.nm.lab', 'verify-postnl.nm.lab', 'ideal-check.nm.lab'], avoid: ['nederbank.nl', 'postnl.nl', 'ideal.nl'] } },
    { type: 'osintpuzzle', name: 'OSINT-puzzel', desc: 'Correleer fictieve fragmenten en ontmasker het verband.', cfg: { scenario: 'Drie fragmenten over verdachte "M". Welke draad verbindt ze?', records: [{ title: 'Hackforum-post', icon: '💬', lines: ['gebruiker: <b>n1ghtcrawl3r</b>', 'biedt loader-dienst aan', 'contact: nc_sales@mail.nm.lab'] }, { title: 'WHOIS (crt.sh)', icon: '📜', lines: ['domein: loader-shop.nm.lab', 'registrant-e-mail: nc_sales@mail.nm.lab'] }, { title: 'Wallet-tag', icon: '💰', lines: ['alias n1ghtcrawl3r gelinkt', 'aan wallet bc1qfictief…'] }], ask: [{ q: 'Welke gebruikersnaam/alias verbindt alle drie de bronnen?', answer: ['n1ghtcrawl3r'], hint: 'Zoek wat letterlijk terugkomt.' }, { q: 'Welk e-mailadres linkt de forumpost aan het domein?', answer: ['nc_sales@mail.nm.lab'], hint: 'Vergelijk contact en registrant.' }] } },
    { type: 'chaintrace', name: 'Blockchain-tracer', desc: 'Volg vuil geld door transacties: common-input-clustering en taint-analyse.', cfg: { unit: 'BTC', scenario: 'Losgeld van 10 BTC gaat de keten in. Hoeveel bereikt de exchange?', labels: { D: 'Ransom-wallet', EX: 'Exchange Zuid', C: 'Schone handelaar' }, exchanges: ['EX'], origins: [{ addr: 'D', amount: 10 }, { addr: 'C', amount: 5, dirty: false }], txs: [{ inputs: ['D'], outputs: [{ addr: 'A', amount: 6 }, { addr: 'B', amount: 4 }], time: '10:00' }, { inputs: ['A'], outputs: [{ addr: 'EX', amount: 3 }, { addr: 'M', amount: 3 }], time: '11:00' }, { inputs: ['B', 'C'], outputs: [{ addr: 'EX', amount: 9 }], time: '12:00' }], ask: [{ q: 'Hoeveel vuil geld (BTC) bereikt de exchange?', answer: ['7'], hint: 'Lees de taint-kolom bij de exchange.' }] } },
    { type: 'connections', name: 'Verbanden', desc: 'Groepeer 16 begrippen in 4 categorieën — zoals NYT Connections, maar cyber.', cfg: { prompt: 'Vind de vier groepen van vier.', groups: [{ name: 'Hashtypes', items: ['MD5', 'SHA-256', 'NTLM', 'bcrypt'] }, { name: 'Cybercrime-rollen', items: ['IAB', 'Affiliate', 'Moneymule', 'Bulletproof hoster'] }, { name: 'ATT&CK-tactieken', items: ['Execution', 'Persistence', 'Exfiltration', 'Impact'] }, { name: 'OSINT-bronnen', items: ['crt.sh', 'Shodan', 'VirusTotal', 'abuse.ch'] }] } },
    { type: 'netflow', name: 'NetFlow-analyse', desc: 'Betrap beaconing (strak ritme) en exfiltratie (groot uitgaand volume) in netwerkstromen.', cfg: { title: 'demo-egress', scenario: 'Eén bestemming tikt als een klok, één slokt gigabytes op.', flows: [{ dst: '203.0.113.50', dstLabel: 'cdn-telemetry.nm.lab', port: 443, proto: 'tcp', conns: 480, intervalSec: 60, jitterPct: 4, bytesOut: 52000, bytesIn: 38000, note: 'klein, elke ~60s' }, { dst: '203.0.113.77', dstLabel: 'opslag-x9f3.nm.lab', port: 443, proto: 'tcp', conns: 3, bytesOut: 2100000000, bytesIn: 4200, note: 'nachtelijke uploads' }, { dst: '198.51.100.12', dstLabel: 'intranet.nm.lab', port: 443, proto: 'tcp', conns: 95, jitterPct: 58, bytesOut: 4200000, bytesIn: 31000000, note: 'normaal portaal' }], ask: [{ q: 'Welke bestemming is het C2-baken?', answer: ['cdn-telemetry.nm.lab', 'cdn-telemetry'], hint: 'Laagste jitter, veel kleine check-ins.' }, { q: 'Welke bestemming wijst op exfiltratie?', answer: ['opslag-x9f3.nm.lab', 'opslag-x9f3'], hint: 'Grootste uitgaande volume.' }] } },
    { type: 'structuring', name: 'Structurering-detector', desc: 'Betrap smurfing: meerdere stortingen net onder de meldgrens (Wwft).', cfg: { threshold: 10000, currency: '€', scenario: 'Twee katvangers storten net onder de grens.', tx: [{ date: '2026-03-02', who: 'M. de Groot', amount: 9800, kind: 'contant' }, { date: '2026-03-02', who: 'K. Visser', amount: 9500, kind: 'contant' }, { date: '2026-03-03', who: 'R. Bakker', amount: 250, kind: 'pin', note: 'normaal' }, { date: '2026-03-03', who: 'M. de Groot', amount: 9900, kind: 'contant' }, { date: '2026-03-04', who: 'K. Visser', amount: 12000, kind: 'overboeking', note: 'boven grens' }], ask: [{ q: 'Hoeveel stortingen passen in het smurf-patroon?', answer: ['3'], hint: 'Tel de gemarkeerde rijen.' }] } },
    { type: 'emailheader', name: 'E-mailheader-analyse', desc: 'Traceer de echte herkomst via de Received-keten en betrap spoofing met SPF/DKIM/DMARC.', cfg: { title: 'demo-mail', from: 'Nederbank <beveiliging@nederbank.nl>', returnPath: 'retour@mail.boos.nm.lab', hops: [{ from: '[vervalst]', ip: '203.0.113.66', by: 'mail.boos.nm.lab', time: '09:58' }, { from: 'mail.boos.nm.lab', ip: '203.0.113.66', by: 'mx.nm.lab', time: '10:00' }], auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' }, ask: [{ q: 'Wat is het oorspronkelijke verzend-IP?', answer: ['203.0.113.66'], hint: 'De onderste Received-regel.' }, { q: 'Is dit spoofing? (ja/nee)', answer: ['ja'], hint: 'Vergelijk From, Return-Path en SPF.' }] } },
    { type: 'dnslog', name: 'DNS-log-analyse', desc: 'Betrap DNS-tunneling (TXT + lange subdomeinen) en een DGA (veel NXDOMAIN).', cfg: { title: 'demo-DNS', scenario: 'Eén domein tunnelt via TXT; een reeks willekeurige namen botst op NXDOMAIN.', queries: [{ time: '02:11', name: 'k5euo63fmjtv64lomfptgmt5aib7q.exfil.nm.lab', type: 'TXT', resp: 'OK' }, { time: '02:11', name: 'nf4xq1k9plm2wdr3nxc8vbp7za9qm.exfil.nm.lab', type: 'TXT', resp: 'OK' }, { time: '02:11', name: 'w1sbt4ydxd9ko5x2tcu5zeye1lp6ab.exfil.nm.lab', type: 'TXT', resp: 'OK' }, { time: '02:12', name: 'xk3f9q2v8.nm.lab', type: 'A', resp: 'NXDOMAIN' }, { time: '02:12', name: 'p7m2v8z1a.nm.lab', type: 'A', resp: 'NXDOMAIN' }, { time: '02:13', name: 'mail.nm.lab', type: 'A', resp: 'OK' }], ask: [{ q: 'Welk domein is het tunneling-kanaal?', answer: ['exfil.nm.lab'], hint: 'Veel TXT + lange subdomeinen.' }] } },
    { type: 'recon', name: 'Reconciliatie', desc: 'Leg bankafschrift en boekhouding naast elkaar en vind de onverklaarde post.', cfg: { title: 'demo-recon', currency: '€', leftName: 'Bankafschrift', rightName: 'Boekhouding', left: [{ date: '02-03', amount: 12000, desc: 'Klantbetaling' }, { date: '02-05', amount: -3500, desc: 'Leverancier' }, { date: '02-08', amount: -4500, desc: 'Onbekende BV' }, { date: '02-28', amount: 800, desc: 'Rente' }], right: [{ date: '02-03', amount: 12000, desc: 'Klantbetaling' }, { date: '02-05', amount: -3500, desc: 'Leverancier' }, { date: '02-28', amount: 800, desc: 'Rente' }], ask: [{ q: 'Welk bedrag is onverklaard? (getal)', answer: ['4500', '4.500'], hint: 'De niet-gematchte regel.' }] } },
    { type: 'detectrule', name: 'Detectieregel bouwen', desc: 'Bouw een regel uit voorwaarden en test hem live op TP/FP tegen events.', cfg: { title: 'demo-detectie', fields: ['Image', 'CommandLine'], events: [{ label: 'kwaadaardig', malicious: true, fields: { Image: 'powershell.exe', CommandLine: 'powershell -w hidden -enc ...' } }, { label: 'kwaadaardig', malicious: true, fields: { Image: 'powershell.exe', CommandLine: 'powershell -w hidden IEX DownloadString' } }, { label: 'legitiem', malicious: false, fields: { Image: 'powershell.exe', CommandLine: 'powershell Get-ChildItem -Hidden' } }, { label: 'normaal', malicious: false, fields: { Image: 'chrome.exe', CommandLine: 'chrome --type=renderer' } }], solution: [{ field: 'CommandLine', op: 'bevat', value: '-w hidden' }] } },
    { type: 'fingerprint', name: 'Infrastructuur-fingerprinting', desc: 'Cluster hosts op gedeelde kenmerken en pas de zeldzaamheidstoets toe.', cfg: { title: 'demo-cluster', scenario: 'Vier phishingdomeinen delen een zeldzaam favicon; de JARM deelt iedereen (ruis).', attrs: [{ key: 'favicon', label: 'Favicon' }, { key: 'analytics', label: 'Analytics-ID' }, { key: 'jarm', label: 'JARM' }], hosts: [{ host: 'inlog-a.nm.lab', favicon: 'f7a1c9', analytics: 'UA-66613-7', jarm: '2ad2ad00' }, { host: 'inlog-b.nm.lab', favicon: 'f7a1c9', analytics: 'UA-66613-7', jarm: '2ad2ad00' }, { host: 'inlog-c.nm.lab', favicon: 'f7a1c9', analytics: 'UA-66613-7', jarm: '2ad2ad00' }, { host: 'webshop.nm.lab', favicon: '11bb20', analytics: 'UA-20011-1', jarm: '2ad2ad00' }], ask: [{ q: 'Hoeveel hosts delen favicon f7a1c9?', answer: ['3'], hint: 'Klik de favicon-waarde aan.' }] } },
    { type: 'scenario', name: 'Beslissimulatie', desc: 'Neem beslissingen onder druk (incident response) en zie de gevolgen.', cfg: { title: 'demo-IR', scenario: 'Een mini-incident: kies verstandig.', pass: 2, steps: [{ situation: 'Je ziet versleutelde bestanden en een losgeldbrief. Eerste actie?', choices: [{ label: 'Besmette systemen isoleren (aan laten staan)', good: true, feedback: 'Isoleren stopt verspreiding; aan laten staan behoudt bewijs.' }, { label: 'Alles uitzetten', good: false, feedback: 'Je verliest vluchtig forensisch bewijs.' }, { label: 'Direct betalen', good: false, feedback: 'Veel te vroeg en zonder garantie.' }] }, { situation: 'De directie vraagt of jullie moeten betalen.', choices: [{ label: 'Adviseer eerst herstel uit back-up te onderzoeken', good: true, feedback: 'Betalen is een laatste redmiddel.' }, { label: 'Zeg: gewoon betalen', good: false, feedback: 'Geen garantie, financiert misdaad.' }] }] } },
    { type: 'phishing', name: 'Phishing-inbox', desc: 'Oefen vrij: klik de rode vlaggen aan en beoordeel of een mail phishing is.', cfg: { emails: [{ phishing: true, fromName: 'NederBank Beveiliging', from: 'security@nederbank-verificatie.info', to: 'jij@voorbeeld.nl', subject: 'URGENT: uw rekening wordt binnen 24 uur geblokkeerd', date: 'ma 6 okt 2026 07:12', flags: { from: 'Het domein is nederbank-verificatie.info, niet nederbank.nl.', subject: 'Haast en dreiging zijn klassieke drukmiddelen.' }, body: [[{ text: 'Geachte klant,', flag: 'Onpersoonlijke aanhef — je bank kent je naam.' }], [{ text: 'Verifieer nu uw rekening', link: 'http://nederbank.nl.verify-login.ru/inloggen', flag: 'Het echte domein is verify-login.ru, geen nederbank.nl.' }]] }, { phishing: false, fromName: 'PakketPost', from: 'noreply@pakketpost.nl', to: 'jij@voorbeeld.nl', subject: 'Je pakket PP-48213 is onderweg', date: 'ma 6 okt 2026 09:30', body: [[{ text: 'Je bestelling PP-48213 wordt vandaag bezorgd. Je hoeft niets te doen; volg het zelf via de app of pakketpost.nl.' }]] }] } },
    { type: 'password', name: 'Wachtwoord-analyse', desc: 'Live de sterkte en kraaktijd van een wachtwoord zien.', cfg: {} },
    { type: 'subnet', name: 'Subnet-calculator', desc: 'Subnetten uitrekenen en oefenvragen genereren.', cfg: {} },
    { type: 'hexviewer', name: 'Hex-viewer', desc: 'Rauwe bytes lezen: magic bytes en verstopte strings.', cfg: { filename: 'voorbeeld.bin', hex: '89 50 4E 47 0D 0A 1A 0A 4A 56 54 7B 68 65 78 5F 6B 69 6A 6B 65 72 7D' } },
    { type: 'jwt', name: 'JWT-inspecteur', desc: 'JSON Web Tokens decoderen en de handtekening controleren.', cfg: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYW4iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2MDAwMDAwMH0.4t3m7nQe8m0b9Qb1Qw5m3Hc0lJjQJh2b3n4c5d6e7f8' } },
    { type: 'regex', name: 'Regex-tester', desc: 'Reguliere expressies live testen met markering en groepen.', cfg: { text: 'Oct 1 08:12:03 srv sshd[2211]: Failed password for root from 203.0.113.9\nOct 1 08:12:07 srv sshd[2213]: Failed password for invalid user admin from 203.0.113.9\nOct 1 08:13:01 srv sshd[2219]: Accepted password for jbakker from 10.0.0.5', pattern: 'Failed password for (?:invalid user )?(\\w+)', flags: 'gm' } },
    { type: 'cvss', name: 'CVSS-calculator', desc: 'De CVSS v3.1-basisscore uit de vector berekenen.', cfg: {} },
    { type: 'timestamp', name: 'Tijdstempel-omrekenaar', desc: 'Unix, FILETIME, WebKit en Cocoa-tijd omzetten.', cfg: {} },
    { type: 'ioc', name: 'IOC-extractor', desc: 'Indicatoren uit tekst halen en defangen.', cfg: { text: 'Verdachte host 203.0.113[.]44 en hxxps://login-check[.]nineminds[.]lab/x\nMD5 44d88612fea8a8f36de82e1278abb02f — zie CVE-2021-44228.' } },
    { type: 'url', name: 'URL-ontleder', desc: 'Een link ontleden en phishing-rode-vlaggen tonen.', cfg: { urls: ['https://www.nederbank.nl@203.0.113.45/inloggen', 'https://pakketpost.nl.bezorging-status.nm.lab/track?id=1'] } },
    { type: 'yara', name: 'YARA-lab', desc: 'Detectieregels schrijven en op bestanden testen.', cfg: {
      rule: 'rule Verdacht_Script {\n  strings:\n    $a = "powershell" nocase\n    $b = "-enc" nocase\n    $mz = { 4D 5A }\n  condition:\n    ($a and $b) or $mz at 0\n}',
      files: [
        { name: 'macro.docm', text: 'AutoOpen: powershell -enc VwByAGkA... start2' },
        { name: 'notitie.txt', text: 'PowerShell-cursus volgende week.' },
        { name: 'klein.exe', hex: '4D 5A 90 00 03 00 00 00' },
      ] } },
    { type: 'timeline', name: 'Super-timeline', desc: 'Gebeurtenissen uit vele bronnen op één tijdlijn.', cfg: {
      title: 'voorbeeld-onderzoek', events: [
        { t: '2026-10-01 08:44:19', src: 'Security', host: 'WS-07', user: 'adm.backup', desc: '4624 aanmelding type 10 (RDP) vanaf 203.0.113.77' },
        { t: '2026-10-01 08:45:37', src: 'Prefetch', host: 'WS-07', desc: 'POWERSHELL.EXE — eerste uitvoering' },
        { t: '2026-10-01 09:01:10', src: 'Proxy', host: 'WS-07', desc: 'Upload naar upload.cloudvault.example (198.51.100.140)' },
        { t: '2026-10-01 09:25:19', src: 'Security', host: 'WS-07', desc: '1102 — audit-log gewist' },
      ] } },
    { type: 'chmod', name: 'chmod-calculator', desc: 'Linux-rechten ↔ octaal ↔ rwx.', cfg: { mode: '644' } },
    { type: 'numconv', name: 'Getallen-omzetter', desc: 'Decimaal · hex · binair · octaal · ASCII.', cfg: { value: '0x4D5A' } },
  ];
  function renderTools() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Gereedschapskist']]), pageHead('tools', 'Gereedschapskist', 'Alle interactieve tools uit de lessen, los te gebruiken — ook voor je eigen (ethische) oefeningen. Alles draait lokaal in je browser; er wordt niets verstuurd. Klik een gereedschap om het te openen.'));

    const nav = el('div', { class: 'chip-row', style: 'margin:14px 0 20px' });
    TOOLBOX.forEach((t) => nav.append(el('span', { class: 'chip', text: t.name, onclick: () => { const node = $('#tool-' + t.type); if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' }); } })));
    wrap.append(nav);

    TOOLBOX.forEach((t) => {
      const sec = el('div', { class: 'task', id: 'tool-' + t.type });
      sec.append(el('h2', { text: t.name }));
      sec.append(el('div', { class: 'body', html: '<p style="color:var(--muted);margin-top:0">' + esc(t.desc) + '</p>' }));
      const box = el('div', {});
      sec.append(box);
      const renderer = CS.labs[t.type];
      if (renderer) { try { renderer(box, t.cfg || {}, {}); } catch (e) { box.append(el('div', { class: 'callout danger', text: 'Tool kon niet laden: ' + e.message })); } }
      else box.append(el('div', { class: 'callout warn', text: 'Onbekende tool: ' + t.type }));
      wrap.append(sec);
    });
    root.append(wrap);
    renderFooter(root);
    window.scrollTo(0, 0);
  }

  // =======================================================================
  //  Gedeelde quizkaart (voor examen & dagchallenge)
  // =======================================================================
  function quizCard(item, onDone) {
    const card = el('div', { class: 'q quizcard' });
    card.append(el('div', { class: 'stamp', style: 'display:block;margin-bottom:8px', text: item.room.title }));
    card.append(el('div', { class: 'qtext', style: 'font-weight:600;margin-bottom:12px', html: esc(item.q.q) }));
    const fb = el('div', { class: 'feedback' });
    let done = false;
    if (Array.isArray(item.q.options)) {
      const mc = el('div', { class: 'mc' });
      item.q.options.forEach((opt, oi) => {
        const bt = el('button', { html: esc(opt), onclick: () => {
          if (done) return; done = true;
          const ok = oi === item.q.answer;
          bt.classList.add('chosen', ok ? 'ok' : 'no');
          $$('button', mc).forEach((x, xi) => { x.disabled = true; if (xi === item.q.answer) x.classList.add('reveal-ok'); });
          setFeedback(fb, ok, ok ? 'Goed.' : 'Mis.');
          if (item.q.explain) card.append(el('div', { class: 'explain show', html: esc(item.q.explain) }));
          onDone(ok);
        } });
        mc.append(bt);
      });
      card.append(mc);
    } else {
      const answers = (Array.isArray(item.q.answer) ? item.q.answer : [item.q.answer]).map(String);
      const input = el('input', { type: 'text', placeholder: 'antwoord…', autocomplete: 'off', spellcheck: 'false' });
      const submit = el('button', { class: 'btn small primary', text: 'Controleer' });
      const check = () => {
        if (done) return; const val = norm(input.value).toLowerCase(); if (!val) return;
        const ok = answers.some((a) => norm(a).toLowerCase() === val);
        done = true; input.disabled = true; submit.disabled = true;
        input.classList.add(ok ? 'ok' : 'no');
        setFeedback(fb, ok, ok ? 'Correct.' : 'Het juiste antwoord: ' + answers[0]);
        if (item.q.explain) card.append(el('div', { class: 'explain show', html: esc(item.q.explain) }));
        onDone(ok);
      };
      submit.addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
      card.append(el('div', { class: 'ans-row' }, [input, submit]));
    }
    card.append(fb);
    return card;
  }
  function seededPick(pool, n, seed) {
    let t = seed >>> 0;
    const rnd = () => { t += 0x6D2B79F5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
    const idx = pool.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp; }
    return idx.slice(0, n).map((i) => pool[i]);
  }

  // =======================================================================
  //  EXAMEN — getimede, gescoorde toets met willekeurige vragen
  // =======================================================================
  function renderExam() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Oefenen', '#/oefenen'], ['Examen']]), pageHead('exam', 'Examen', 'Een getimede toets met willekeurige vragen uit alle lessen. Haal je 70% of meer, dan slaag je. Dit verandert je lesvoortgang niet.'));
    if (STATE.examBest) wrap.append(el('div', { class: 'found-note', text: 'Jouw beste score: ' + STATE.examBest + '%' }));

    let len = 20, filter = 'alles';
    const lenRow = el('div', { class: 'chip-row' });
    [10, 20, 30].forEach((n) => { const c = el('span', { class: 'chip' + (n === len ? ' on' : ''), text: n + ' vragen', onclick: () => { len = n; $$('.chip', lenRow).forEach((x) => x.classList.remove('on')); c.classList.add('on'); } }); lenRow.append(c); });
    const pathRow = el('div', { class: 'chip-row' });
    const paths = [{ id: 'alles', title: 'Alles' }].concat(PATHS.filter((p) => ROOMS.some((r) => r.path === p.id)).map((p) => ({ id: p.id, title: p.title })));
    paths.forEach((p) => { const c = el('span', { class: 'chip' + (p.id === filter ? ' on' : ''), text: p.title, onclick: () => { filter = p.id; $$('.chip', pathRow).forEach((x) => x.classList.remove('on')); c.classList.add('on'); } }); pathRow.append(c); });
    const startBtn = el('button', { class: 'btn primary', text: 'Start het examen', style: 'margin-top:18px' });
    const examArea = el('div', {});
    wrap.append(el('label', { text: 'Aantal vragen' }), lenRow, el('label', { text: 'Onderwerp' }), pathRow, startBtn, examArea);
    root.append(wrap); renderFooter(root); window.scrollTo(0, 0);

    startBtn.addEventListener('click', () => {
      const pool = shuffle(allQuestions(filter));
      const qs = pool.slice(0, Math.min(len, pool.length));
      if (!qs.length) { examArea.innerHTML = ''; examArea.append(el('div', { class: 'callout warn', text: 'Geen vragen in deze categorie.' })); return; }
      startBtn.style.display = 'none'; lenRow.style.display = 'none'; pathRow.style.display = 'none';
      let idx = 0, score = 0, answered = false;
      const started = Date.now();
      const progress = el('div', { class: 'found-note' });
      const qbox = el('div', {});
      const nav = el('div', { class: 'room-foot' });
      examArea.innerHTML = ''; examArea.append(progress, qbox, nav);
      function showResult() {
        const secs = Math.round((Date.now() - started) / 1000);
        const pctScore = Math.round((score / qs.length) * 100);
        const pass = pctScore >= 70;
        if (!STATE.examBest || pctScore > STATE.examBest) { STATE.examBest = pctScore; saveState(); }
        qbox.innerHTML = ''; nav.innerHTML = ''; progress.textContent = '';
        qbox.append(el('div', { class: 'callout ' + (pass ? 'tip' : 'warn'), html: (pass ? '<strong>Geslaagd.</strong>' : '<strong>Nog niet gehaald.</strong>') + ' Je scoorde <strong>' + score + ' / ' + qs.length + '</strong> (' + pctScore + '%) in ' + Math.floor(secs / 60) + 'm ' + (secs % 60) + 's.' + (pass ? ' Mooi werk!' : ' De grens is 70% — probeer het nog eens.') }));
        // Geslaagd is bewezen: hetzelfde blok als een voltooide room.
        if (pass) qbox.append(el('div', { class: 'room-done' }, [
          markNode('seal', false),
          el('div', {}, [
            el('h3', { text: 'Examencertificaat' }),
            el('p', { text: 'NineMinds Cyber Dojo · score ' + pctScore + '% · ' + qs.length + ' vragen · onderwerp: ' + (paths.find((p) => p.id === filter) || {}).title }),
          ]),
        ]));
        nav.append(el('button', { class: 'btn', text: 'Opnieuw', onclick: () => renderExam() }), el('button', { class: 'btn primary next', text: 'Naar het overzicht', onclick: () => go('#/') }));
      }
      function next() {
        if (idx >= qs.length) return showResult();
        answered = false;
        qbox.innerHTML = ''; nav.innerHTML = '';
        progress.textContent = 'Vraag ' + (idx + 1) + ' / ' + qs.length + ' · score ' + score;
        const nextBtn = el('button', { class: 'btn primary', text: idx === qs.length - 1 ? 'Afronden' : 'Volgende', onclick: () => { if (!answered) return; idx++; next(); } });
        nextBtn.disabled = true;
        qbox.append(quizCard(qs[idx], (ok) => { if (answered) return; answered = true; if (ok) score++; nextBtn.disabled = false; progress.textContent = 'Vraag ' + (idx + 1) + ' / ' + qs.length + ' · score ' + score; }));
        nextBtn.classList.add('next'); nav.append(el('span', {}), nextBtn);
      }
      next();
    });
  }

  // =======================================================================
  //  DAGCHALLENGE — elke dag dezelfde 5 vragen, met streak
  // =======================================================================
  function renderDaily() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Oefenen', '#/oefenen'], ['Dagchallenge']]), pageHead('calendar', 'Dagchallenge'));
    const today = new Date();
    const key = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    const seed = parseInt(key.replace(/-/g, ''), 10);
    STATE.daily = STATE.daily || { last: '', streak: 0, best: 0, doneToday: '', todayScore: 0 };
    const D = STATE.daily;
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:640px', text: 'Elke dag vijf nieuwe vragen — voor iedereen dezelfde. Kom elke dag terug om je reeks (streak) op te bouwen.' }));
    wrap.append(el('div', { class: 'stat-row', style: 'margin:10px 0 16px' }, [
      stat(String(D.streak || 0), 'dagen op rij'),
      stat(String(D.best || 0), 'langste reeks'),
    ]));

    const pool = allQuestions('alles');
    const qs = seededPick(pool, Math.min(5, pool.length), seed);
    const area = el('div', {});
    wrap.append(area);
    root.append(wrap); renderFooter(root); window.scrollTo(0, 0);

    if (D.doneToday === key) {
      area.append(el('div', { class: 'callout tip', html: '<strong>Je hebt de challenge van vandaag al gedaan</strong> (' + (D.todayScore || 0) + '/' + qs.length + '). Kom morgen terug voor vijf nieuwe vragen!' }));
      return;
    }
    let idx = 0, score = 0, answered = false;
    const progress = el('div', { class: 'found-note' });
    const qbox = el('div', {});
    const nav = el('div', { class: 'room-foot' });
    area.append(progress, qbox, nav);
    function finish() {
      // streak-logica
      const y = new Date(today); y.setDate(y.getDate() - 1);
      const yk = y.getFullYear() + '-' + String(y.getMonth() + 1).padStart(2, '0') + '-' + String(y.getDate()).padStart(2, '0');
      D.streak = (D.last === yk) ? (D.streak || 0) + 1 : 1;
      D.last = key; D.doneToday = key; D.todayScore = score;
      if (D.streak > (D.best || 0)) D.best = D.streak;
      saveState();
      qbox.innerHTML = ''; nav.innerHTML = ''; progress.textContent = '';
      qbox.append(el('div', { class: 'callout tip', html: '<strong>Challenge klaar.</strong> ' + score + ' / ' + qs.length + ' goed. Je reeks staat nu op <strong>' + D.streak + ' dag' + (D.streak === 1 ? '' : 'en') + '</strong>. Tot morgen!' }));
      nav.append(el('span', {}), el('button', { class: 'btn primary next', text: 'Naar het overzicht', onclick: () => go('#/') }));
    }
    function next() {
      if (idx >= qs.length) return finish();
      answered = false; qbox.innerHTML = ''; nav.innerHTML = '';
      progress.textContent = 'Vraag ' + (idx + 1) + ' / ' + qs.length;
      const nextBtn = el('button', { class: 'btn primary', text: idx === qs.length - 1 ? 'Afronden' : 'Volgende', onclick: () => { if (!answered) return; idx++; next(); } });
      nextBtn.disabled = true;
      qbox.append(quizCard(qs[idx], (ok) => { if (answered) return; answered = true; if (ok) score++; nextBtn.disabled = false; }));
      nextBtn.classList.add('next'); nav.append(el('span', {}), nextBtn);
    }
    next();
  }

  // =======================================================================
  //  SCOREBORD — persoonlijk voortgangsoverzicht (lokaal)
  // =======================================================================
  function renderScorebord() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(crumbs([['Overzicht', '#/'], ['Oefenen', '#/oefenen'], ['Scorebord']]), pageHead('chart', 'Scorebord', 'Jouw voortgang in één overzicht. Alles wordt lokaal op dit apparaat bewaard (in je browser).'));
    const L = levelFor(STATE.xp);
    const doneRooms = ROOMS.filter(roomDone).length;
    const doneQ = ROOMS.reduce((n, r) => n + roomAnsweredCount(r), 0);
    const totalQ = ROOMS.reduce((n, r) => n + roomQuestionCount(r), 0);
    wrap.append(el('div', { class: 'stat-row', style: 'margin:10px 0 18px' }, [
      stat('LV ' + L.lvl, STATE.xp + ' XP'),
      stat(doneRooms + '/' + ROOMS.length, 'rooms voltooid'),
      stat(doneQ + '/' + totalQ, 'vragen beantwoord'),
      stat(String(STATE.flags || 0), 'vlaggen'),
      stat(Object.keys(STATE.badges || {}).length + '/' + BADGES.length, 'badges'),
      stat(String(STATE.bestStreak || 0), 'beste arena-reeks'),
      stat((STATE.examBest || 0) + '%', 'beste examen'),
      stat(String((STATE.daily && STATE.daily.best) || 0), 'langste dagreeks'),
    ]));
    wrap.append(el('h2', { style: 'margin-top:40px', text: 'Voortgang per leerpad' }));
    const list = el('ol', { class: 'pathlist' });
    PATHS.forEach((p, i) => {
      const rs = pathRooms(p.id); if (!rs.length) return;
      const done = rs.filter(roomDone).length;
      list.append(el('li', {}, el('a', { class: 'pathrow' + (done === rs.length ? ' done' : ''), href: '#/pad/' + p.id }, [
        el('span', { class: 'no', text: String(i + 1).padStart(2, '0') }),
        el('span', { class: 'glyph' }, pathGlyph(p.id, 20)),
        el('div', {}, [el('h3', { text: p.title })]),
        el('div', { class: 'prog' }, [el('span', { class: 'num', text: done + '/' + rs.length + ' rooms' }), meterLine(done / rs.length, done === rs.length)]),
        el('span', { class: 'go' }, CS.icon('chevron', 18)),
      ])));
    });
    wrap.append(list);
    wrap.append(el('h2', { style: 'margin-top:40px', text: 'Badges' }), badgeGrid());
    wrap.append(el('div', { class: 'room-foot', style: 'margin-top:18px' }, [
      el('button', { class: 'btn', text: 'Doe een examen', onclick: () => go('#/examen') }),
      el('button', { class: 'btn next', text: 'Dagchallenge', onclick: () => go('#/daily') }),
    ]));
    root.append(wrap); renderFooter(root); window.scrollTo(0, 0);
  }

  // =======================================================================
  //  Voet + router
  // =======================================================================
  // NineMinds staat onderaan, één keer: de dojo staat voorop, het merk dat
  // ervoor instaat sluit af.
  function renderFooter(root) {
    root.append(el('footer', { class: 'sitefoot' }, el('div', { class: 'wrap' }, [
      el('div', { class: 'by' }, [markNode('mark', false), el('div', {}, [el('small', { text: 'Een product van' }), wordmarkNode()])]),
      el('p', { class: 'fine', text: 'Oefen aanvalstechnieken alleen in je eigen lab of met schriftelijke toestemming (computervredebreuk, art. 138ab Sr). Alle scenario\'s, bedrijven en adressen hier zijn verzonnen. Je voortgang staat alleen in deze browser.' }),
    ])));
  }

  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  CS.go = go;
  function route() {
    const h = location.hash || '#/';
    closeSearch();
    if (taskObserver) { taskObserver.disconnect(); taskObserver = null; }
    const room = h.match(/^#\/room\/(.+)$/);
    const pad = h.match(/^#\/pad\/(.+)$/);
    if (room) renderRoom(decodeURIComponent(room[1]));
    else if (pad) renderPath(decodeURIComponent(pad[1]));
    else if (h === '#/oefenen') renderPractice();
    else if (h === '#/arena') renderArena();
    else if (h === '#/flashcards') renderFlashcards();
    else if (h === '#/tools') renderTools();
    else if (h === '#/examen') renderExam();
    else if (h === '#/daily') renderDaily();
    else if (h === '#/scorebord') renderScorebord();
    else renderHome();
    markNav();
    const s = $('.search'); if (s) s.classList.remove('open');
  }
  window.addEventListener('hashchange', route);

  // ---- Boot --------------------------------------------------------------
  CS.boot = function boot() {
    initTheme();
    ROOMS.sort((a, b) => {
      const pa = PATHS.findIndex((p) => p.id === a.path), pb = PATHS.findIndex((p) => p.id === b.path);
      return pa - pb || a.order - b.order;
    });
    renderTopbar();
    route();
  };
})();
