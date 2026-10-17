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
    { id: 'fundamenten',   title: 'Fundamenten',            icon: '🧱', desc: 'De basis die alles draagt: wat security is, hoe netwerken, het web, Linux en Windows werken. Begin hier.' },
    { id: 'security-kern', title: 'Security-kern',          icon: '🔐', desc: 'Cryptografie, wachtwoorden & authenticatie en de menselijke factor — social engineering en phishing.' },
    { id: 'offensief',     title: 'Offensief (red team)',   icon: '⚔️', desc: 'Denken als een aanvaller: de OWASP Top 10, verkenning, en webkwetsbaarheden zelf uitbuiten in een veilig lab.' },
    { id: 'defensief',     title: 'Defensief (blue team)',  icon: '🛡️', desc: 'Aanvallen detecteren in logs, reageren op incidenten (NIST) en systemen thuis en op het werk weerbaar maken.' },
    { id: 'forensie',      title: 'Digitale forensie & opsporing', icon: '🕵️', desc: 'De weg naar digitaal rechercheur: sporen veiligstellen, schijven, geheugen, netwerk en Windows-artefacten onderzoeken, OSINT en een echt forensisch onderzoek.' },
    { id: 'intelligence',  title: 'Cyber-intelligence & opsporing', icon: '🧠', desc: 'Van fenomeen naar interventie: het cybercrime-ecosysteem, crime scripting, de intelligencecyclus, threat-intel-modellen, infrastructuur-OSINT & pivoting, en gestructureerde analyse tot een BLUF-product.' },
    { id: 'datastromen',   title: 'Datastromen volgen',        icon: '💧', desc: 'Word expert in geld- en datastromen: volg witwasconstructies en structurering, betrap beaconing en exfiltratie in netwerkverkeer, en traceer de herkomst van een e-mail. De rode draad van cybercrime: het geld en de data.' },
    { id: 'puzzels',       title: 'Puzzels & uitdagingen',  icon: '🧩', desc: 'Leren door te doen: volg geld- en datastromen, ontmasker operators met OSINT, groepeer en reconstrueer, en los een grote cybercrime-CTF op. Alle oefening, veel plezier.' },
    { id: 'eindopdracht',  title: 'Eindopdracht',           icon: '🏁', desc: 'Breng alles samen in een afsluitende mini-CTF. Bewijs aan jezelf wat je kunt.' },
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
    if (after > before) toast('⭐ Level ' + after + '!', 'Je bent nu level ' + after + '. Doorgaan zo!');
  }

  // ---- Badges ------------------------------------------------------------
  const BADGES = [
    { id: 'first-blood', icon: '🩸', name: 'Eerste bloed', desc: 'Je eerste vraag goed', test: () => Object.keys(STATE.answered).length >= 1 },
    { id: 'fundamenten', icon: '🧱', name: 'Fundamentalist', desc: 'Alle Fundamenten-rooms af', test: () => pathDone('fundamenten') },
    { id: 'crypto',      icon: '🔐', name: 'Cryptograaf', desc: 'Alle Security-kern-rooms af', test: () => pathDone('security-kern') },
    { id: 'redteam',     icon: '⚔️', name: 'Red teamer', desc: 'Alle Offensief-rooms af', test: () => pathDone('offensief') },
    { id: 'blueteam',    icon: '🛡️', name: 'Blue teamer', desc: 'Alle Defensief-rooms af', test: () => pathDone('defensief') },
    { id: 'forensics',   icon: '🕵️', name: 'Digitaal rechercheur', desc: 'Alle Forensie-rooms af', test: () => pathDone('forensie') },
    { id: 'analyst',     icon: '🧠', name: 'Intelligence-analist', desc: 'Alle Cyber-intelligence-rooms af', test: () => pathDone('intelligence') },
    { id: 'tracer',      icon: '💧', name: 'Stromenvolger', desc: 'Alle Datastromen-rooms af', test: () => pathDone('datastromen') },
    { id: 'puzzler',     icon: '🧩', name: 'Puzzelmeester', desc: 'Alle Puzzels & uitdagingen af', test: () => pathDone('puzzels') },
    { id: 'arena10',     icon: '🎯', name: 'Scherpschutter', desc: 'Reeks van 10 in de Oefenarena', test: () => (STATE.bestStreak || 0) >= 10 },
    { id: 'hacker10',    icon: '💡', name: 'Doorzetter', desc: '10 rooms afgerond', test: () => ROOMS.filter(roomDone).length >= 10 },
    { id: 'flaghunter',  icon: '🚩', name: 'Vlaggenjager', desc: '15 vlaggen gevonden', test: () => (STATE.flags || 0) >= 15 },
    { id: 'capstone',    icon: '🏆', name: 'Dojo-meester', desc: 'De eindopdracht voltooid', test: () => pathDone('eindopdracht') },
  ];
  function pathDone(pathId) {
    const rs = ROOMS.filter((r) => r.path === pathId);
    return rs.length > 0 && rs.every(roomDone);
  }
  function checkBadges() {
    BADGES.forEach((b) => {
      if (!STATE.badges[b.id] && b.test()) {
        STATE.badges[b.id] = true; saveState();
        toast('🏅 Badge: ' + b.name, b.desc);
      }
    });
  }

  // ---- Toasts ------------------------------------------------------------
  let toastWrap;
  function toast(title, sub) {
    if (!toastWrap) { toastWrap = el('div', { class: 'toast-wrap' }); document.body.append(toastWrap); }
    const t = el('div', { class: 'toast' }, [el('div', { class: 't', text: title }), sub ? el('div', { class: 's', text: sub }) : null]);
    toastWrap.append(t);
    setTimeout(() => { t.style.transition = 'opacity .4s, transform .4s'; t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; setTimeout(() => t.remove(), 400); }, 3200);
  }
  CS.toast = toast;

  // ---- Thema -------------------------------------------------------------
  function initTheme() {
    const saved = localStorage.getItem('nineminds-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nineminds-theme', next);
    $('#themeBtn').textContent = next === 'light' ? '🌙' : '☀️';
  }

  // =======================================================================
  //  RENDER: topbar
  // =======================================================================
  function renderTopbar() {
    const bar = $('#topbar');
    bar.innerHTML = '';
    const wrap = el('div', { class: 'wrap' });
    const brand = el('button', { class: 'brand', onclick: () => go('#/') }, [
      el('span', { class: 'logo', text: '◈' }),
      el('span', {}, [document.createTextNode('NineMinds Cyber Dojo'), el('small', { text: 'Leer cybersecurity, stap voor stap' })]),
    ]);
    const search = el('div', { class: 'search' }, [
      el('span', { text: '🔎' }),
      el('input', { type: 'text', placeholder: 'Zoek in alle rooms…', id: 'searchInput', oninput: onSearch, onkeydown: (e) => { if (e.key === 'Escape') { e.target.value = ''; onSearch(); } } }),
    ]);
    const themeBtn = el('button', { class: 'iconbtn', id: 'themeBtn', title: 'Thema wisselen', onclick: toggleTheme, text: document.documentElement.getAttribute('data-theme') === 'light' ? '🌙' : '☀️' });
    const badgeBtn = el('button', { class: 'iconbtn', title: 'Badges', onclick: showBadges, text: '🏅' });
    const xp = el('button', { class: 'xp-pill', id: 'xpPill', title: 'Jouw voortgang', onclick: showProfile });
    wrap.append(brand, el('span', { class: 'spacer' }), search, themeBtn, badgeBtn, xp);
    bar.append(wrap);
    renderXP();
  }
  function renderXP() {
    const pill = $('#xpPill'); if (!pill) return;
    const L = levelFor(STATE.xp);
    pill.innerHTML = '';
    pill.append(el('span', { class: 'lvl', text: 'Lv ' + L.lvl }), el('span', { text: STATE.xp + ' XP' }));
  }

  // =======================================================================
  //  RENDER: home
  // =======================================================================
  function renderHome() {
    const root = $('#app');
    root.innerHTML = '';
    const totalRooms = ROOMS.length;
    const doneRooms = ROOMS.filter(roomDone).length;
    const totalQ = ROOMS.reduce((n, r) => n + roomQuestionCount(r), 0);
    const doneQ = ROOMS.reduce((n, r) => n + roomAnsweredCount(r), 0);

    const hero = el('section', { class: 'hero wrap' }, [
      el('h1', { html: 'Word stap voor stap <span class="g">cyber­security-vaardig</span>.' }),
      el('p', { class: 'lead', text: 'Een doelgericht leerportaal: korte uitleg, veel oefenen in echte browser-labs, en vragen met vlaggen om te vinden. Helemaal in het Nederlands, van de basis tot je eerste hacks en verdedigingen.' }),
      el('div', { class: 'hero-actions' }, [
        el('button', { class: 'btn primary', text: continueTarget() ? '▶ Ga verder waar je was' : '▶ Begin bij het begin', onclick: () => go(continueTarget() || firstRoomHash()) }),
        el('button', { class: 'btn', text: '🎯 Oefenarena', onclick: () => go('#/arena') }),
        el('button', { class: 'btn', text: '🃏 Begrippentrainer', onclick: () => go('#/flashcards') }),
        el('button', { class: 'btn', text: '🧰 Gereedschapskist', onclick: () => go('#/tools') }),
        el('button', { class: 'btn', text: '🎓 Examen', onclick: () => go('#/examen') }),
        el('button', { class: 'btn', text: '🔥 Dagchallenge', onclick: () => go('#/daily') }),
        el('button', { class: 'btn', text: '📊 Scorebord', onclick: () => go('#/scorebord') }),
        el('button', { class: 'btn ghost', text: '🏅 Badges', onclick: showBadges }),
      ]),
      el('div', { class: 'stat-row' }, [
        stat(doneRooms + '/' + totalRooms, 'rooms voltooid'),
        stat(doneQ + '/' + totalQ, 'vragen beantwoord'),
        stat('Lv ' + levelFor(STATE.xp).lvl, STATE.xp + ' XP'),
        stat(Object.keys(STATE.badges).length + '/' + BADGES.length, 'badges'),
      ]),
    ]);
    root.append(hero);

    const main = el('section', { class: 'wrap' });
    PATHS.forEach((p, i) => {
      const rooms = ROOMS.filter((r) => r.path === p.id).sort((a, b) => a.order - b.order);
      if (!rooms.length) return;
      const done = rooms.filter(roomDone).length;
      main.append(el('div', { class: 'section-head' }, [
        el('span', { class: 'num', text: String(i + 1) }),
        el('h2', { text: p.icon + ' ' + p.title }),
        el('span', { class: 'meta', text: done + '/' + rooms.length + ' af · ' + rooms.reduce((n, r) => n + r.minutes, 0) + ' min' }),
      ]));
      main.append(el('p', { class: 'section-desc', text: p.desc }));
      main.append(el('div', { class: 'pathbar' }, el('i', { style: 'width:' + Math.round((done / rooms.length) * 100) + '%' })));
      const grid = el('div', { class: 'grid' });
      rooms.forEach((r, idx) => grid.append(roomCard(r, rooms, idx)));
      main.append(grid);
    });
    root.append(main);
    renderFooter(root);
    checkBadges();
  }
  function stat(n, l) { return el('div', { class: 'stat' }, [el('div', { class: 'n', text: n }), el('div', { class: 'l', text: l })]); }

  function roomCard(room, siblings, idx) {
    const prog = roomProgress(room);
    const done = roomDone(room);
    // slot: een room is "locked" tot de vorige in hetzelfde pad af is (zachte gate, alleen visueel/optioneel)
    const locked = idx > 0 && !roomDone(siblings[idx - 1]) && prog === 0;
    const card = el('div', { class: 'card' + (locked ? ' locked' : ''), onclick: () => { if (!locked) go('#/room/' + room.id); else toast('🔒 Nog op slot', 'Rond eerst "' + siblings[idx - 1].title + '" af.'); } });
    card.append(el('div', { class: 'top' }, [
      el('div', { class: 'ic', text: room.icon }),
      el('div', {}, [el('h3', { text: room.title }), el('div', { class: 'tags' }, [
        el('span', { class: 'tag diff-' + room.difficulty, text: room.difficulty }),
        el('span', { class: 'tag', text: '⏱ ' + room.minutes + ' min' }),
        el('span', { class: 'tag', text: '❓ ' + roomQuestionCount(room) }),
      ])]),
    ]));
    card.append(el('div', { class: 'sum', text: room.summary }));
    card.append(el('div', { class: 'progress' }, el('i', { style: 'width:' + Math.round(prog * 100) + '%' })));
    card.append(el('div', { class: 'foot' }, [
      el('span', { text: roomAnsweredCount(room) + '/' + roomQuestionCount(room) + ' vragen' }),
      el('span', { text: done ? '✓ voltooid' : (prog > 0 ? Math.round(prog * 100) + '%' : 'start →') }),
    ]));
    if (done) card.append(el('div', { class: 'done-badge', text: '✓ KLAAR' }));
    else if (locked) card.append(el('div', { class: 'lock', text: '🔒' }));
    return card;
  }

  function firstRoomHash() {
    const all = orderedRooms();
    return all.length ? '#/room/' + all[0].id : '#/';
  }
  function orderedRooms() {
    const out = [];
    PATHS.forEach((p) => ROOMS.filter((r) => r.path === p.id).sort((a, b) => a.order - b.order).forEach((r) => out.push(r)));
    return out;
  }
  function continueTarget() {
    const all = orderedRooms();
    const next = all.find((r) => !roomDone(r) && roomProgress(r) > 0) || all.find((r) => !roomDone(r));
    return next ? '#/room/' + next.id : null;
  }

  // =======================================================================
  //  RENDER: room
  // =======================================================================
  function renderRoom(roomId) {
    const room = ROOMS.find((r) => r.id === roomId);
    const root = $('#app');
    root.innerHTML = '';
    if (!room) { root.append(el('div', { class: 'wrap', html: '<p>Room niet gevonden. <a href="#/">Terug naar overzicht</a></p>' })); return; }

    const view = el('section', { class: 'roomview wrap' });
    view.append(el('div', { class: 'crumbs' }, [
      el('a', { text: '🏠 Home', onclick: () => go('#/') }),
      document.createTextNode('  ›  ' + (PATHS.find((p) => p.id === room.path) || {}).title + '  ›  '),
      el('strong', { text: room.title }),
    ]));

    view.append(el('div', { class: 'room-hero' }, [
      el('div', { class: 'ic', text: room.icon }),
      el('div', {}, [
        el('h1', { text: room.title }),
        el('div', { class: 'sum', text: room.summary }),
        el('div', { class: 'tags' }, [
          el('span', { class: 'tag diff-' + room.difficulty, text: room.difficulty }),
          el('span', { class: 'tag', text: '⏱ ' + room.minutes + ' min' }),
          el('span', { class: 'tag', text: '❓ ' + roomQuestionCount(room) + ' vragen' }),
          el('span', { class: 'tag', text: '🎯 +' + roomMaxXP(room) + ' XP' }),
        ]),
      ]),
    ]));

    if (room.objectives && room.objectives.length) {
      view.append(el('div', { class: 'objectives' }, [
        el('h3', { text: '🎯 Wat je na deze room kunt' }),
        el('ul', {}, room.objectives.map((o) => el('li', { text: o }))),
      ]));
    }

    const layout = el('div', { class: 'roomlayout' });
    const nav = el('nav', { class: 'tasknav' });
    const ol = el('ol');
    (room.tasks || []).forEach((t, ti) => {
      const li = el('li', { 'data-ti': ti, onclick: () => { const node = $('#task-' + ti); if (node) node.scrollIntoView({ behavior: 'smooth' }); } }, [
        el('span', { class: 'chk', text: taskComplete(room, ti) ? '✓' : '' }),
        el('span', { text: t.title }),
      ]);
      if (taskComplete(room, ti)) li.classList.add('complete');
      ol.append(li);
    });
    nav.append(ol);
    layout.append(nav);

    const content = el('div', {});
    (room.tasks || []).forEach((t, ti) => content.append(renderTask(room, t, ti)));

    // terms / resources
    if (room.terms && room.terms.length) {
      content.append(el('div', { class: 'task glossary' }, [
        el('h2', { text: '📖 Begrippenlijst' }),
        el('dl', {}, room.terms.flatMap((t) => [el('dt', { text: t.term }), el('dd', { text: t.def })])),
      ]));
    }
    if (room.resources && room.resources.length) {
      content.append(el('div', { class: 'task' }, [
        el('h2', { text: '🔗 Verder oefenen' }),
        el('ul', {}, room.resources.map((r) => el('li', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener', text: r.title })))),
      ]));
    }

    // navigatie onderaan
    const all = orderedRooms();
    const pos = all.findIndex((r) => r.id === room.id);
    content.append(el('div', { class: 'room-foot' }, [
      pos > 0 ? el('button', { class: 'btn', text: '← ' + all[pos - 1].title, onclick: () => go('#/room/' + all[pos - 1].id) }) : el('span', {}),
      pos < all.length - 1 ? el('button', { class: 'btn primary', text: all[pos + 1].title + ' →', onclick: () => go('#/room/' + all[pos + 1].id) }) : el('button', { class: 'btn primary', text: '🏁 Naar overzicht', onclick: () => go('#/') }),
    ]));

    layout.append(content);
    view.append(layout);
    root.append(view);
    renderFooter(root);
    window.scrollTo(0, 0);
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
    const node = el('div', { class: 'task', id: 'task-' + ti });
    node.append(el('h2', {}, [document.createTextNode(task.title)]));
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
      qwrap.append(el('h3', { text: '❓ Vragen beantwoorden' }));
      task.questions.forEach((q, qi) => qwrap.append(renderQuestion(room, task, ti, q, qi)));
      node.append(qwrap);
    }
    return node;
  }

  function markAnswered(room, ti, qi, q, qNode) {
    const key = qKey(room.id, ti, qi);
    if (STATE.answered[key]) return;
    STATE.answered[key] = true;
    // vlaggen tellen
    const ansFirst = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    if (typeof ansFirst === 'string' && /^NM\{/.test(ansFirst)) { STATE.flags = (STATE.flags || 0) + 1; }
    saveState();
    addXP(qXP(q), 'vraag');
    updateTaskNav(room);
    // room af?
    if (roomDone(room)) {
      toast('✅ Room voltooid!', room.title);
    }
    checkBadges();
  }

  function updateTaskNav(room) {
    $$('.tasknav li').forEach((li) => {
      const ti = +li.getAttribute('data-ti');
      const done = taskComplete(room, ti);
      li.classList.toggle('complete', done);
      $('.chk', li).textContent = done ? '✓' : '';
    });
  }

  function renderQuestion(room, task, ti, q, qi) {
    const already = isAnswered(room.id, ti, qi);
    const node = el('div', { class: 'q' + (already ? ' correct' : '') });
    const qtext = el('div', { class: 'qtext', html: esc(q.q) });
    qtext.append(el('span', { class: 'badge-xp', text: '+' + qXP(q) + ' XP' }));
    node.append(qtext);

    const feedback = el('div', { class: 'feedback' });
    const explainBox = q.explain ? el('div', { class: 'explain' + (already ? ' show' : ''), html: esc(q.explain) }) : null;

    if (q.noAnswer) {
      // bevestigen
      const btn = el('button', { class: 'btn small' + (already ? ' ' : ' primary'), text: already ? '✓ Gelezen' : 'Markeer als gelezen', disabled: already, onclick: () => {
        markAnswered(room, ti, qi, q, node); node.classList.add('correct'); btn.textContent = '✓ Gelezen'; btn.disabled = true; btn.classList.remove('primary');
      } });
      node.append(btn);
    } else if (Array.isArray(q.options)) {
      const mc = el('div', { class: 'mc' });
      q.options.forEach((opt, oi) => {
        const b = el('button', { html: esc(opt), disabled: already });
        if (already && oi === q.answer) b.classList.add('reveal-ok');
        b.addEventListener('click', () => {
          if (isAnswered(room.id, ti, qi)) return;
          const ok = oi === q.answer;
          b.classList.add('chosen', ok ? 'ok' : 'no');
          if (ok) {
            $$('button', mc).forEach((x) => { x.disabled = true; });
            feedback.textContent = '✓ Goed!'; feedback.className = 'feedback show ok';
            if (explainBox) explainBox.classList.add('show');
            markAnswered(room, ti, qi, q, node); node.classList.add('correct');
          } else {
            feedback.textContent = '✗ Niet helemaal. Probeer nog eens.'; feedback.className = 'feedback show no';
            setTimeout(() => { b.classList.remove('chosen', 'no'); }, 900);
          }
        });
        mc.append(b);
      });
      node.append(mc);
    } else {
      // open antwoord
      const answers = (Array.isArray(q.answer) ? q.answer : [q.answer]).map((a) => String(a));
      const placeholder = answers[0].replace(/[^\s]/g, '•').slice(0, 24) || 'antwoord…';
      const input = el('input', { type: 'text', placeholder: already ? answers[0] : placeholder, value: already ? answers[0] : '', disabled: already, autocomplete: 'off', spellcheck: 'false' });
      if (already) input.classList.add('ok');
      const submit = el('button', { class: 'btn small primary', text: already ? '✓' : 'Controleer', disabled: already });
      const check = () => {
        if (isAnswered(room.id, ti, qi)) return;
        const val = norm(input.value).toLowerCase();
        if (!val) return;
        const ok = answers.some((a) => norm(a).toLowerCase() === val);
        if (ok) {
          input.classList.add('ok'); input.classList.remove('no'); input.disabled = true; submit.textContent = '✓'; submit.disabled = true;
          feedback.textContent = '✓ Correct!'; feedback.className = 'feedback show ok';
          if (explainBox) explainBox.classList.add('show');
          markAnswered(room, ti, qi, q, node); node.classList.add('correct');
        } else {
          input.classList.add('no');
          feedback.textContent = '✗ Nog niet goed. Lees de uitleg of vraag een hint.'; feedback.className = 'feedback show no';
          setTimeout(() => input.classList.remove('no'), 900);
        }
      };
      submit.addEventListener('click', check);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
      node.append(el('div', { class: 'ans-row' }, [input, submit]));

      if (q.hint) {
        const hintLine = el('div', { class: 'hintline', text: '💡 ' + q.hint });
        const hintBtn = el('button', { class: 'lnk', text: 'Hint', onclick: () => { hintLine.classList.toggle('show'); } });
        node.append(el('div', { style: 'margin-top:6px' }, hintBtn));
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
  function onSearch(e) {
    const q = norm(($('#searchInput') || {}).value || '').toLowerCase();
    if (searchPanel) { searchPanel.remove(); searchPanel = null; }
    if (q.length < 2) return;
    const hits = [];
    ROOMS.forEach((r) => {
      const hay = (r.title + ' ' + r.summary + ' ' + (r.objectives || []).join(' ') + ' ' + (r.terms || []).map((t) => t.term + ' ' + t.def).join(' ') + ' ' + (r.tasks || []).map((t) => t.title + ' ' + (t.content || '')).join(' ')).toLowerCase();
      if (hay.includes(q)) hits.push(r);
    });
    searchPanel = el('div', { class: 'searchres' }, el('div', { class: 'panel' },
      hits.length ? hits.slice(0, 8).map((r) => el('div', { class: 'item', onclick: () => { go('#/room/' + r.id); if (searchPanel) { searchPanel.remove(); searchPanel = null; } $('#searchInput').value = ''; } }, [
        el('span', { class: 'ic', text: r.icon }),
        el('div', {}, [el('div', { class: 't', text: r.title }), el('div', { class: 's', text: r.summary })]),
      ])) : el('div', { class: 'empty', text: 'Niets gevonden voor "' + q + '".' })
    ));
    document.body.append(searchPanel);
  }
  document.addEventListener('click', (e) => {
    if (searchPanel && !searchPanel.contains(e.target) && !e.target.closest('.search')) { searchPanel.remove(); searchPanel = null; }
  });

  // =======================================================================
  //  Modals: badges & profiel
  // =======================================================================
  function modal(title, bodyNode) {
    const back = el('div', { class: 'modal-back', onclick: (e) => { if (e.target === back) back.remove(); } });
    const m = el('div', { class: 'modal' });
    m.append(el('button', { class: 'iconbtn close', text: '✕', onclick: () => back.remove() }));
    m.append(el('h2', { text: title }));
    m.append(bodyNode);
    back.append(m);
    document.body.append(back);
    return back;
  }
  function showBadges() {
    const grid = el('div', { class: 'badge-grid' });
    BADGES.forEach((b) => {
      const got = !!STATE.badges[b.id];
      grid.append(el('div', { class: 'badge-item' + (got ? '' : ' locked') }, [
        el('div', { class: 'bi', text: b.icon }),
        el('div', { class: 'bn', text: b.name }),
        el('div', { class: 'bd', text: b.desc }),
      ]));
    });
    const got = Object.keys(STATE.badges).length;
    modal('🏅 Badges (' + got + '/' + BADGES.length + ')', grid);
  }
  function showProfile() {
    const L = levelFor(STATE.xp);
    const doneRooms = ROOMS.filter(roomDone).length;
    const body = el('div', {});
    body.append(el('p', { html: '<strong>Level ' + L.lvl + '</strong> · ' + STATE.xp + ' XP totaal' }));
    body.append(el('div', { class: 'meter' }, el('i', { style: 'width:' + Math.round((L.into / L.need) * 100) + '%;background:var(--accent)' })));
    body.append(el('p', { class: 'found-note', text: L.into + ' / ' + L.need + ' XP tot level ' + (L.lvl + 1) }));
    body.append(el('ul', {}, [
      el('li', { text: doneRooms + ' van ' + ROOMS.length + ' rooms voltooid' }),
      el('li', { text: Object.keys(STATE.answered).length + ' vragen beantwoord' }),
      el('li', { text: (STATE.flags || 0) + ' vlaggen gevonden' }),
      el('li', { text: Object.keys(STATE.badges).length + ' van ' + BADGES.length + ' badges' }),
    ]));
    body.append(el('hr', { style: 'border:0;border-top:1px solid var(--border);margin:16px 0' }));
    body.append(el('button', { class: 'btn', text: '↺ Voortgang wissen', onclick: () => {
      if (confirm('Weet je het zeker? Al je voortgang, XP en badges worden gewist.')) {
        STATE = { answered: {}, xp: 0, badges: {}, flags: 0 }; saveState(); renderXP();
        document.querySelector('.modal-back').remove(); route();
      }
    } }));
    modal('👤 Jouw voortgang', body);
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
    wrap.append(el('div', { class: 'crumbs' }, [el('a', { text: '🏠 Home', onclick: () => go('#/') }), document.createTextNode('  ›  '), el('strong', { text: '🎯 Oefenarena' })]));
    wrap.append(el('h1', { text: '🎯 Oefenarena' }));
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:640px', text: 'Willekeurige vragen uit alle lessen, door elkaar. Puur om te herhalen — dit verandert je lesvoortgang niet. Hoe lang wordt je reeks?' }));

    // filter op leerpad
    const filterRow = el('div', { class: 'chip-row', style: 'margin:14px 0' });
    let curFilter = 'alles';
    const paths = [{ id: 'alles', title: 'Alles' }].concat(PATHS.filter((p) => ROOMS.some((r) => r.path === p.id)).map((p) => ({ id: p.id, title: p.icon + ' ' + p.title })));
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
      const card = el('div', { class: 'task' });
      card.append(el('div', { style: 'color:var(--muted);font-size:.82rem;margin-bottom:6px', text: item.room.icon + ' ' + item.room.title }));
      card.append(el('div', { class: 'qtext', style: 'font-weight:600;margin-bottom:12px', html: esc(item.q.q) }));
      const fb = el('div', { class: 'feedback' });
      const nextBtn = el('button', { class: 'btn primary', text: 'Volgende →', onclick: () => { idx++; next(); } });
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
            fb.textContent = ok ? '✓ Goed!' : '✗ Mis'; fb.className = 'feedback show ' + (ok ? 'ok' : 'no');
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
          if (ok) { done = true; input.classList.add('ok'); input.disabled = true; submit.disabled = true; fb.textContent = '✓ Correct!'; fb.className = 'feedback show ok'; afterAnswer(true); }
          else { input.classList.add('no'); fb.textContent = '✗ Nog niet. Juiste antwoord: ' + answers[0]; fb.className = 'feedback show no'; done = true; input.disabled = true; submit.disabled = true; afterAnswer(false); }
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
    wrap.append(el('div', { class: 'crumbs' }, [el('a', { text: '🏠 Home', onclick: () => go('#/') }), document.createTextNode('  ›  '), el('strong', { text: '🃏 Begrippentrainer' })]));
    wrap.append(el('h1', { text: '🃏 Begrippentrainer' }));
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:640px', text: 'Flashcards met alle vakbegrippen. Lees de term, denk aan de betekenis, draai de kaart om en beoordeel jezelf. Begrippen die je nog oefent komen vaker terug.' }));

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
      const card = el('div', { class: 'task', style: 'text-align:center;cursor:pointer;min-height:150px;display:flex;flex-direction:column;justify-content:center;gap:10px', onclick: flip });
      if (!flipped) {
        card.append(el('div', { style: 'font-size:.78rem;color:var(--faint)', text: 'BEGRIP — klik om om te draaien' }));
        card.append(el('div', { style: 'font-size:1.5rem;font-weight:800', text: c.term }));
      } else {
        card.append(el('div', { style: 'font-size:.78rem;color:var(--accent)', text: c.term }));
        card.append(el('div', { style: 'font-size:1.05rem', text: c.def }));
        card.append(el('div', { style: 'font-size:.75rem;color:var(--faint)', text: 'uit: ' + c.room }));
      }
      cardWrap.append(card);
      const btns = el('div', { class: 'room-foot' });
      if (!flipped) {
        btns.append(el('span', {}), el('button', { class: 'btn primary', text: 'Draai om ↻', onclick: flip }));
      } else {
        btns.append(
          el('button', { class: 'btn', text: '🔁 Nog oefenen', onclick: () => { STATE.cardsLearned[c.term] = false; saveState(); advance(); } }),
          el('button', { class: 'btn primary', text: '✓ Kende ik', onclick: () => { STATE.cardsLearned[c.term] = true; saveState(); checkBadges(); advance(); } }),
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
    { type: 'cyberchef', icon: '🧪', name: 'CyberChef', desc: 'Coderen, decoderen en hashen (Base64, hex, ROT13, XOR, MD5/SHA-…).', cfg: { input: 'NM{probeer_mij}' } },
    { type: 'hashcrack', icon: '🔓', name: 'Hash-kraker', desc: 'Woordenlijst, regels (mangling) of brute-force (masker) — op MD5/SHA/NTLM.', cfg: { algo: 'md5', hash: '5f4dcc3b5aa765d61d8327deb882cf99', wordlist: ['123456', 'welkom', 'password', 'qwerty', 'geheim', 'letmein'] } },
    { type: 'hashid', icon: '🧭', name: 'Hash-herkenner', desc: 'Welk hashtype is dit? Herkent MD5, NTLM, SHA, bcrypt en meer.', cfg: { value: '$2y$10$N9qo8uLOickgx2ZMRZoMy.MH/rq8qjHjhHj' } },
    { type: 'cipher', icon: '🗝️', name: 'Cijfer-kraker', desc: 'Caesar/ROT, XOR, Vigenère en Atbash ontcijferen.', cfg: { text: 'Kl nlolptl cshn pz QCA{jhlzhy_pz_thrrlspqr}' } },
    { type: 'multidecode', icon: '✨', name: 'Multi-decoder', desc: 'Herkent en pelt lagen codering af (Base64/32, hex, binair, morse, ROT13, URL…).', cfg: { input: '536c5a55653231316248527058327868655756795832397266513d3d' } },
    { type: 'crackme', icon: '🔃', name: 'Crackme', desc: 'Reverse-engineering puzzel: lees de controle en vind de sleutel.', cfg: { title: 'demo', source: 'function check(key) {\n  // toegang als key, achterstevoren gelezen, "62oziuj" oplevert\n  return key.split("").reverse().join("") === "62oziuj";\n}', check: (k) => k.split('').reverse().join('') === '62oziuj', flag: 'NM{reverse_engineered}', hint: 'Draai de doelstring om: wat moet key dan zijn?' } },
    { type: 'rainbow', icon: '🌈', name: 'Rainbow table', desc: 'Zie waarom onvergezouten hashes direct op te zoeken zijn — en salt dat breekt.', cfg: { algo: 'md5', wordlist: ['welkom', 'zomer2024', 'admin', 'geheim', 'voetbal', 'wachtwoord', 'qwerty', 'liefde'], target: '371620aa75830b1388b63305b0d42f06', saltExample: { word: 'welkom', salt: 'Xy7' } } },
    { type: 'ach', icon: '🧮', name: 'ACH-matrix', desc: 'Concurrerende hypothesen afwegen door bewijs te scoren (C/I/N).', cfg: { question: 'Wie zit achter de ransomware-aanval op een fictief bedrijf?', hypotheses: ['Ontevreden insider', 'Georganiseerde crimineel (RaaS-affiliate)', 'Statelijke actor'], evidence: [{ text: 'Er is losgeld in crypto geëist', expert: ['I', 'C', 'I'] }, { text: 'Zeer gerichte spear-phishing vooraf' }, { text: 'Data gelekt op een bekende leksite' }, { text: 'Activiteit vooral tijdens kantooruren UTC+3' }] } },
    { type: 'crimescript', icon: '🎬', name: 'Crime script-builder', desc: 'Ontleed een delict in zes fasen met interventies per fase.', cfg: { scenario: 'Phishing-fraude met moneymules (fictief).' } },
    { type: 'admiralty', icon: '📊', name: 'Bronbeoordeling', desc: 'Betrouwbaarheid (A–F) en geloofwaardigheid (1–6) apart beoordelen.', cfg: { items: [{ source: 'Anonieme tip via Meld Misdaad Anoniem', info: 'Verdachte X plant een aanval', reliability: 'E', credibility: '4', explain: 'Onbekende, niet te verifiëren bron; info niet bevestigd.' }, { source: 'Eigen SIEM-logs, geverifieerd', info: 'Mislukte logins vanaf één IP', reliability: 'A', credibility: '1', explain: 'Eigen betrouwbare meting, door meerdere logs bevestigd.' }] } },
    { type: 'probability', icon: '📈', name: 'Waarschijnlijkheidstaal', desc: 'Koppel woorden als "waarschijnlijk" aan de juiste percentage-band.', cfg: {} },
    { type: 'attackmap', icon: '🗺️', name: 'ATT&CK-mapping', desc: 'Koppel een waarneming aan de juiste MITRE ATT&CK-techniek.', cfg: { items: [{ desc: 'Aanvaller dumpt het LSASS-geheugen om wachtwoorden te stelen', code: 'T1003.001' }, { desc: 'Bestanden worden versleuteld en er verschijnt een losgeldbrief', code: 'T1486' }, { desc: 'Binnenkomst via een kwaadaardige bijlage in een mail', code: 'T1566.001' }, { desc: 'Zijwaartse beweging via RDP naar een andere host', code: 'T1021.001' }] } },
    { type: 'bluf', icon: '📝', name: 'BLUF-herschrijven', desc: 'Herschrijf een chronologisch verhaal naar "conclusie eerst".', cfg: { source: 'Om 08:40 vijf mislukte RDP-logins vanaf 203.0.113.77. Om 08:44 een geslaagde login als adm.backup. Om 08:45 start powershell.exe. Om 09:01 een grote upload naar een clouddienst. Om 09:25 is het securitylog gewist.', model: 'Waarschijnlijk is account adm.backup overgenomen en is data geëxfiltreerd (betrouwbaarheid: gemiddeld, op basis van eigen logs). Advies: reset adm.backup en blokkeer het bron-IP — eigenaar: SOC. Onderbouwing: brute-force om 08:40, geslaagde login 08:44, upload 09:01, logwissing 09:25.' } },
    { type: 'flow', icon: '💸', name: 'Stroom volgen', desc: 'Volg geld/data door mules, mixers en exchanges naar de cash-out.', cfg: { unit: 'BTC', scenario: 'Losgeld van 3 BTC — waar komt het eruit?', nodes: [{ id: 'v', type: 'victim', label: 'Slachtoffer' }, { id: 'm1', type: 'mule', label: 'Mule A' }, { id: 'm2', type: 'mule', label: 'Mule B' }, { id: 'mix', type: 'mixer', label: 'Mixer' }, { id: 'ex', type: 'exchange', label: 'Exchange Zuid' }], edges: [{ from: 'v', to: 'm1', amount: 1.8, time: '10:00' }, { from: 'v', to: 'm2', amount: 1.2, time: '10:01', note: 'splitsing' }, { from: 'm1', to: 'mix', amount: 1.75, time: '10:20', note: 'fee' }, { from: 'm2', to: 'mix', amount: 1.15, time: '10:22', note: 'fee' }, { from: 'mix', to: 'ex', amount: 2.8, time: '11:30' }], ask: [{ q: 'Waar stroomt het geld uiteindelijk uit?', answer: ['Exchange Zuid', 'exchange'], hint: 'Volg tot het laatste knooppunt.' }, { q: 'Hoeveel BTC bereikt de exchange?', answer: ['2.8'], hint: 'Tel de twee stromen door de mixer op.' }] } },
    { type: 'ordering', icon: '🔢', name: 'Volgorde-puzzel', desc: 'Reconstrueer de juiste volgorde van een aanval (tijdlijn/kill chain).', cfg: { prompt: 'Zet de fasen van de Cyber Kill Chain op volgorde.', items: [{ id: '1', label: 'Reconnaissance' }, { id: '2', label: 'Weaponization' }, { id: '3', label: 'Delivery' }, { id: '4', label: 'Exploitation' }, { id: '5', label: 'Installation' }, { id: '6', label: 'Command & Control' }, { id: '7', label: 'Actions on Objectives' }], correct: ['1', '2', '3', '4', '5', '6', '7'], explain: 'Dit is de volgorde van de Lockheed Martin Cyber Kill Chain.' } },
    { type: 'regexgolf', icon: '🎯', name: 'Regex-golf', desc: 'Schrijf één patroon dat de kwaadaardige regels matcht en de goede mijdt.', cfg: { prompt: 'Match alleen de phishing-domeinen.', match: ['login-nederbank.nm.lab', 'verify-postnl.nm.lab', 'ideal-check.nm.lab'], avoid: ['nederbank.nl', 'postnl.nl', 'ideal.nl'] } },
    { type: 'osintpuzzle', icon: '🔎', name: 'OSINT-puzzel', desc: 'Correleer fictieve fragmenten en ontmasker het verband.', cfg: { scenario: 'Drie fragmenten over verdachte "M". Welke draad verbindt ze?', records: [{ title: 'Hackforum-post', icon: '💬', lines: ['gebruiker: <b>n1ghtcrawl3r</b>', 'biedt loader-dienst aan', 'contact: nc_sales@mail.nm.lab'] }, { title: 'WHOIS (crt.sh)', icon: '📜', lines: ['domein: loader-shop.nm.lab', 'registrant-e-mail: nc_sales@mail.nm.lab'] }, { title: 'Wallet-tag', icon: '💰', lines: ['alias n1ghtcrawl3r gelinkt', 'aan wallet bc1qfictief…'] }], ask: [{ q: 'Welke gebruikersnaam/alias verbindt alle drie de bronnen?', answer: ['n1ghtcrawl3r'], hint: 'Zoek wat letterlijk terugkomt.' }, { q: 'Welk e-mailadres linkt de forumpost aan het domein?', answer: ['nc_sales@mail.nm.lab'], hint: 'Vergelijk contact en registrant.' }] } },
    { type: 'chaintrace', icon: '⛓️', name: 'Blockchain-tracer', desc: 'Volg vuil geld door transacties: common-input-clustering en taint-analyse.', cfg: { unit: 'BTC', scenario: 'Losgeld van 10 BTC gaat de keten in. Hoeveel bereikt de exchange?', labels: { D: 'Ransom-wallet', EX: 'Exchange Zuid', C: 'Schone handelaar' }, exchanges: ['EX'], origins: [{ addr: 'D', amount: 10 }, { addr: 'C', amount: 5, dirty: false }], txs: [{ inputs: ['D'], outputs: [{ addr: 'A', amount: 6 }, { addr: 'B', amount: 4 }], time: '10:00' }, { inputs: ['A'], outputs: [{ addr: 'EX', amount: 3 }, { addr: 'M', amount: 3 }], time: '11:00' }, { inputs: ['B', 'C'], outputs: [{ addr: 'EX', amount: 9 }], time: '12:00' }], ask: [{ q: 'Hoeveel vuil geld (BTC) bereikt de exchange?', answer: ['7'], hint: 'Lees de taint-kolom bij de exchange.' }] } },
    { type: 'connections', icon: '🧩', name: 'Verbanden', desc: 'Groepeer 16 begrippen in 4 categorieën — zoals NYT Connections, maar cyber.', cfg: { prompt: 'Vind de vier groepen van vier.', groups: [{ name: 'Hashtypes', items: ['MD5', 'SHA-256', 'NTLM', 'bcrypt'] }, { name: 'Cybercrime-rollen', items: ['IAB', 'Affiliate', 'Moneymule', 'Bulletproof hoster'] }, { name: 'ATT&CK-tactieken', items: ['Execution', 'Persistence', 'Exfiltration', 'Impact'] }, { name: 'OSINT-bronnen', items: ['crt.sh', 'Shodan', 'VirusTotal', 'abuse.ch'] }] } },
    { type: 'netflow', icon: '📡', name: 'NetFlow-analyse', desc: 'Betrap beaconing (strak ritme) en exfiltratie (groot uitgaand volume) in netwerkstromen.', cfg: { title: 'demo-egress', scenario: 'Eén bestemming tikt als een klok, één slokt gigabytes op.', flows: [{ dst: '203.0.113.50', dstLabel: 'cdn-telemetry.nm.lab', port: 443, proto: 'tcp', conns: 480, intervalSec: 60, jitterPct: 4, bytesOut: 52000, bytesIn: 38000, note: 'klein, elke ~60s' }, { dst: '203.0.113.77', dstLabel: 'opslag-x9f3.nm.lab', port: 443, proto: 'tcp', conns: 3, bytesOut: 2100000000, bytesIn: 4200, note: 'nachtelijke uploads' }, { dst: '198.51.100.12', dstLabel: 'intranet.nm.lab', port: 443, proto: 'tcp', conns: 95, jitterPct: 58, bytesOut: 4200000, bytesIn: 31000000, note: 'normaal portaal' }], ask: [{ q: 'Welke bestemming is het C2-baken?', answer: ['cdn-telemetry.nm.lab', 'cdn-telemetry'], hint: 'Laagste jitter, veel kleine check-ins.' }, { q: 'Welke bestemming wijst op exfiltratie?', answer: ['opslag-x9f3.nm.lab', 'opslag-x9f3'], hint: 'Grootste uitgaande volume.' }] } },
    { type: 'structuring', icon: '💶', name: 'Structurering-detector', desc: 'Betrap smurfing: meerdere stortingen net onder de meldgrens (Wwft).', cfg: { threshold: 10000, currency: '€', scenario: 'Twee katvangers storten net onder de grens.', tx: [{ date: '2026-03-02', who: 'M. de Groot', amount: 9800, kind: 'contant' }, { date: '2026-03-02', who: 'K. Visser', amount: 9500, kind: 'contant' }, { date: '2026-03-03', who: 'R. Bakker', amount: 250, kind: 'pin', note: 'normaal' }, { date: '2026-03-03', who: 'M. de Groot', amount: 9900, kind: 'contant' }, { date: '2026-03-04', who: 'K. Visser', amount: 12000, kind: 'overboeking', note: 'boven grens' }], ask: [{ q: 'Hoeveel stortingen passen in het smurf-patroon?', answer: ['3'], hint: 'Tel de gemarkeerde rijen.' }] } },
    { type: 'emailheader', icon: '✉️', name: 'E-mailheader-analyse', desc: 'Traceer de echte herkomst via de Received-keten en betrap spoofing met SPF/DKIM/DMARC.', cfg: { title: 'demo-mail', from: 'Nederbank <beveiliging@nederbank.nl>', returnPath: 'retour@mail.boos.nm.lab', hops: [{ from: '[vervalst]', ip: '203.0.113.66', by: 'mail.boos.nm.lab', time: '09:58' }, { from: 'mail.boos.nm.lab', ip: '203.0.113.66', by: 'mx.nm.lab', time: '10:00' }], auth: { spf: 'fail', dkim: 'none', dmarc: 'fail' }, ask: [{ q: 'Wat is het oorspronkelijke verzend-IP?', answer: ['203.0.113.66'], hint: 'De onderste Received-regel.' }, { q: 'Is dit spoofing? (ja/nee)', answer: ['ja'], hint: 'Vergelijk From, Return-Path en SPF.' }] } },
    { type: 'dnslog', icon: '🌫️', name: 'DNS-log-analyse', desc: 'Betrap DNS-tunneling (TXT + lange subdomeinen) en een DGA (veel NXDOMAIN).', cfg: { title: 'demo-DNS', scenario: 'Eén domein tunnelt via TXT; een reeks willekeurige namen botst op NXDOMAIN.', queries: [{ time: '02:11', name: 'k5euo63fmjtv64lomfptgmt5aib7q.exfil.nm.lab', type: 'TXT', resp: 'OK' }, { time: '02:11', name: 'nf4xq1k9plm2wdr3nxc8vbp7za9qm.exfil.nm.lab', type: 'TXT', resp: 'OK' }, { time: '02:11', name: 'w1sbt4ydxd9ko5x2tcu5zeye1lp6ab.exfil.nm.lab', type: 'TXT', resp: 'OK' }, { time: '02:12', name: 'xk3f9q2v8.nm.lab', type: 'A', resp: 'NXDOMAIN' }, { time: '02:12', name: 'p7m2v8z1a.nm.lab', type: 'A', resp: 'NXDOMAIN' }, { time: '02:13', name: 'mail.nm.lab', type: 'A', resp: 'OK' }], ask: [{ q: 'Welk domein is het tunneling-kanaal?', answer: ['exfil.nm.lab'], hint: 'Veel TXT + lange subdomeinen.' }] } },
    { type: 'password', icon: '🔑', name: 'Wachtwoord-analyse', desc: 'Live de sterkte en kraaktijd van een wachtwoord zien.', cfg: {} },
    { type: 'subnet', icon: '🧮', name: 'Subnet-calculator', desc: 'Subnetten uitrekenen en oefenvragen genereren.', cfg: {} },
    { type: 'hexviewer', icon: '🔢', name: 'Hex-viewer', desc: 'Rauwe bytes lezen: magic bytes en verstopte strings.', cfg: { filename: 'voorbeeld.bin', hex: '89 50 4E 47 0D 0A 1A 0A 4A 56 54 7B 68 65 78 5F 6B 69 6A 6B 65 72 7D' } },
    { type: 'jwt', icon: '🎫', name: 'JWT-inspecteur', desc: 'JSON Web Tokens decoderen en de handtekening controleren.', cfg: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYW4iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2MDAwMDAwMH0.4t3m7nQe8m0b9Qb1Qw5m3Hc0lJjQJh2b3n4c5d6e7f8' } },
    { type: 'regex', icon: '🔤', name: 'Regex-tester', desc: 'Reguliere expressies live testen met markering en groepen.', cfg: { text: 'Oct 1 08:12:03 srv sshd[2211]: Failed password for root from 203.0.113.9\nOct 1 08:12:07 srv sshd[2213]: Failed password for invalid user admin from 203.0.113.9\nOct 1 08:13:01 srv sshd[2219]: Accepted password for jbakker from 10.0.0.5', pattern: 'Failed password for (?:invalid user )?(\\w+)', flags: 'gm' } },
    { type: 'cvss', icon: '🩹', name: 'CVSS-calculator', desc: 'De CVSS v3.1-basisscore uit de vector berekenen.', cfg: {} },
    { type: 'timestamp', icon: '🕰️', name: 'Tijdstempel-omrekenaar', desc: 'Unix, FILETIME, WebKit en Cocoa-tijd omzetten.', cfg: {} },
    { type: 'ioc', icon: '🧾', name: 'IOC-extractor', desc: 'Indicatoren uit tekst halen en defangen.', cfg: { text: 'Verdachte host 203.0.113[.]44 en hxxps://login-check[.]nineminds[.]lab/x\nMD5 44d88612fea8a8f36de82e1278abb02f — zie CVE-2021-44228.' } },
    { type: 'url', icon: '🔗', name: 'URL-ontleder', desc: 'Een link ontleden en phishing-rode-vlaggen tonen.', cfg: { urls: ['https://www.nederbank.nl@203.0.113.45/inloggen', 'https://pakketpost.nl.bezorging-status.nm.lab/track?id=1'] } },
    { type: 'yara', icon: '🧬', name: 'YARA-lab', desc: 'Detectieregels schrijven en op bestanden testen.', cfg: {
      rule: 'rule Verdacht_Script {\n  strings:\n    $a = "powershell" nocase\n    $b = "-enc" nocase\n    $mz = { 4D 5A }\n  condition:\n    ($a and $b) or $mz at 0\n}',
      files: [
        { name: 'macro.docm', text: 'AutoOpen: powershell -enc VwByAGkA... start2' },
        { name: 'notitie.txt', text: 'PowerShell-cursus volgende week.' },
        { name: 'klein.exe', hex: '4D 5A 90 00 03 00 00 00' },
      ] } },
    { type: 'timeline', icon: '⏳', name: 'Super-timeline', desc: 'Gebeurtenissen uit vele bronnen op één tijdlijn.', cfg: {
      title: 'voorbeeld-onderzoek', events: [
        { t: '2026-10-01 08:44:19', src: 'Security', host: 'WS-07', user: 'adm.backup', desc: '4624 aanmelding type 10 (RDP) vanaf 203.0.113.77' },
        { t: '2026-10-01 08:45:37', src: 'Prefetch', host: 'WS-07', desc: 'POWERSHELL.EXE — eerste uitvoering' },
        { t: '2026-10-01 09:01:10', src: 'Proxy', host: 'WS-07', desc: 'Upload naar upload.cloudvault.example (198.51.100.140)' },
        { t: '2026-10-01 09:25:19', src: 'Security', host: 'WS-07', desc: '1102 — audit-log gewist' },
      ] } },
    { type: 'chmod', icon: '🔐', name: 'chmod-calculator', desc: 'Linux-rechten ↔ octaal ↔ rwx.', cfg: { mode: '644' } },
    { type: 'numconv', icon: '🔟', name: 'Getallen-omzetter', desc: 'Decimaal · hex · binair · octaal · ASCII.', cfg: { value: '0x4D5A' } },
  ];
  function renderTools() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(el('div', { class: 'crumbs' }, [el('a', { text: '🏠 Home', onclick: () => go('#/') }), document.createTextNode('  ›  '), el('strong', { text: '🧰 Gereedschapskist' })]));
    wrap.append(el('h1', { text: '🧰 Gereedschapskist' }));
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:680px', text: 'Alle interactieve tools uit de lessen, los te gebruiken — ook voor je eigen (ethische) oefeningen. Alles draait lokaal in je browser; er wordt niets verstuurd. Klik een gereedschap om het te openen.' }));

    const nav = el('div', { class: 'chip-row', style: 'margin:14px 0 20px' });
    TOOLBOX.forEach((t) => nav.append(el('span', { class: 'chip', text: t.icon + ' ' + t.name, onclick: () => { const node = $('#tool-' + t.type); if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' }); } })));
    wrap.append(nav);

    TOOLBOX.forEach((t) => {
      const sec = el('div', { class: 'task', id: 'tool-' + t.type });
      sec.append(el('h2', { text: t.icon + ' ' + t.name }));
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
    const card = el('div', { class: 'task' });
    card.append(el('div', { style: 'color:var(--muted);font-size:.82rem;margin-bottom:6px', text: item.room.icon + ' ' + item.room.title }));
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
          fb.textContent = ok ? '✓ Goed!' : '✗ Mis'; fb.className = 'feedback show ' + (ok ? 'ok' : 'no');
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
        fb.textContent = ok ? '✓ Correct!' : ('✗ Juist: ' + answers[0]); fb.className = 'feedback show ' + (ok ? 'ok' : 'no');
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
    wrap.append(el('div', { class: 'crumbs' }, [el('a', { text: '🏠 Home', onclick: () => go('#/') }), document.createTextNode('  ›  '), el('strong', { text: '🎓 Examen' })]));
    wrap.append(el('h1', { text: '🎓 Examen' }));
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:640px', text: 'Een getimede toets met willekeurige vragen uit alle lessen. Haal je 70% of meer, dan slaag je. Dit verandert je lesvoortgang niet.' }));
    if (STATE.examBest) wrap.append(el('div', { class: 'found-note', text: '🏆 Jouw beste score: ' + STATE.examBest + '%' }));

    let len = 20, filter = 'alles';
    const lenRow = el('div', { class: 'chip-row' });
    [10, 20, 30].forEach((n) => { const c = el('span', { class: 'chip' + (n === len ? ' on' : ''), text: n + ' vragen', onclick: () => { len = n; $$('.chip', lenRow).forEach((x) => x.classList.remove('on')); c.classList.add('on'); } }); lenRow.append(c); });
    const pathRow = el('div', { class: 'chip-row' });
    const paths = [{ id: 'alles', title: 'Alles' }].concat(PATHS.filter((p) => ROOMS.some((r) => r.path === p.id)).map((p) => ({ id: p.id, title: p.icon + ' ' + p.title })));
    paths.forEach((p) => { const c = el('span', { class: 'chip' + (p.id === filter ? ' on' : ''), text: p.title, onclick: () => { filter = p.id; $$('.chip', pathRow).forEach((x) => x.classList.remove('on')); c.classList.add('on'); } }); pathRow.append(c); });
    const startBtn = el('button', { class: 'btn primary', text: '▶ Start examen', style: 'margin-top:12px' });
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
        qbox.append(el('div', { class: 'callout ' + (pass ? 'tip' : 'warn'), html: (pass ? '🎉 <strong>Geslaagd!</strong>' : '📚 <strong>Nog niet gehaald.</strong>') + ' Je scoorde <strong>' + score + ' / ' + qs.length + '</strong> (' + pctScore + '%) in ' + Math.floor(secs / 60) + 'm ' + (secs % 60) + 's.' + (pass ? ' Mooi werk!' : ' De grens is 70% — probeer het nog eens.') }));
        if (pass) qbox.append(el('div', { class: 'task', style: 'text-align:center' }, [
          el('div', { style: 'font-size:2.4rem', text: '🎓' }),
          el('div', { style: 'font-weight:800;font-size:1.2rem', text: 'NineMinds Cyber Dojo — Examencertificaat' }),
          el('div', { class: 'found-note', text: 'Score ' + pctScore + '% · ' + qs.length + ' vragen · onderwerp: ' + (paths.find((p) => p.id === filter) || {}).title }),
        ]));
        nav.append(el('button', { class: 'btn', text: '↺ Opnieuw', onclick: () => renderExam() }), el('button', { class: 'btn primary', text: '🏠 Naar home', onclick: () => go('#/') }));
      }
      function next() {
        if (idx >= qs.length) return showResult();
        answered = false;
        qbox.innerHTML = ''; nav.innerHTML = '';
        progress.textContent = 'Vraag ' + (idx + 1) + ' / ' + qs.length + ' · score ' + score;
        const nextBtn = el('button', { class: 'btn primary', text: idx === qs.length - 1 ? 'Afronden →' : 'Volgende →', onclick: () => { if (!answered) return; idx++; next(); } });
        nextBtn.disabled = true;
        qbox.append(quizCard(qs[idx], (ok) => { if (answered) return; answered = true; if (ok) score++; nextBtn.disabled = false; progress.textContent = 'Vraag ' + (idx + 1) + ' / ' + qs.length + ' · score ' + score; }));
        nav.append(el('span', {}), nextBtn);
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
    wrap.append(el('div', { class: 'crumbs' }, [el('a', { text: '🏠 Home', onclick: () => go('#/') }), document.createTextNode('  ›  '), el('strong', { text: '🔥 Dagchallenge' })]));
    wrap.append(el('h1', { text: '🔥 Dagchallenge' }));
    const today = new Date();
    const key = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    const seed = parseInt(key.replace(/-/g, ''), 10);
    STATE.daily = STATE.daily || { last: '', streak: 0, best: 0, doneToday: '', todayScore: 0 };
    const D = STATE.daily;
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:640px', text: 'Elke dag vijf nieuwe vragen — voor iedereen dezelfde. Kom elke dag terug om je reeks (streak) op te bouwen.' }));
    wrap.append(el('div', { class: 'stat-row', style: 'margin:10px 0 16px' }, [
      stat('🔥 ' + (D.streak || 0), 'dagen op rij'),
      stat('🏅 ' + (D.best || 0), 'langste reeks'),
    ]));

    const pool = allQuestions('alles');
    const qs = seededPick(pool, Math.min(5, pool.length), seed);
    const area = el('div', {});
    wrap.append(area);
    root.append(wrap); renderFooter(root); window.scrollTo(0, 0);

    if (D.doneToday === key) {
      area.append(el('div', { class: 'callout tip', html: '✅ <strong>Je hebt de challenge van vandaag al gedaan</strong> (' + (D.todayScore || 0) + '/' + qs.length + '). Kom morgen terug voor vijf nieuwe vragen!' }));
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
      qbox.append(el('div', { class: 'callout tip', html: '🔥 <strong>Challenge klaar!</strong> ' + score + ' / ' + qs.length + ' goed. Je reeks staat nu op <strong>' + D.streak + ' dag' + (D.streak === 1 ? '' : 'en') + '</strong>. Tot morgen!' }));
      nav.append(el('span', {}), el('button', { class: 'btn primary', text: '🏠 Naar home', onclick: () => go('#/') }));
    }
    function next() {
      if (idx >= qs.length) return finish();
      answered = false; qbox.innerHTML = ''; nav.innerHTML = '';
      progress.textContent = 'Vraag ' + (idx + 1) + ' / ' + qs.length;
      const nextBtn = el('button', { class: 'btn primary', text: idx === qs.length - 1 ? 'Afronden →' : 'Volgende →', onclick: () => { if (!answered) return; idx++; next(); } });
      nextBtn.disabled = true;
      qbox.append(quizCard(qs[idx], (ok) => { if (answered) return; answered = true; if (ok) score++; nextBtn.disabled = false; }));
      nav.append(el('span', {}), nextBtn);
    }
    next();
  }

  // =======================================================================
  //  SCOREBORD — persoonlijk voortgangsoverzicht (lokaal)
  // =======================================================================
  function renderScorebord() {
    const root = $('#app'); root.innerHTML = '';
    const wrap = el('section', { class: 'roomview wrap' });
    wrap.append(el('div', { class: 'crumbs' }, [el('a', { text: '🏠 Home', onclick: () => go('#/') }), document.createTextNode('  ›  '), el('strong', { text: '📊 Scorebord' })]));
    wrap.append(el('h1', { text: '📊 Scorebord' }));
    wrap.append(el('p', { class: 'sum', style: 'color:var(--muted);max-width:640px', text: 'Jouw voortgang in één overzicht. Alles wordt lokaal op dit apparaat bewaard (in je browser).' }));
    const L = levelFor(STATE.xp);
    const doneRooms = ROOMS.filter(roomDone).length;
    const doneQ = ROOMS.reduce((n, r) => n + roomAnsweredCount(r), 0);
    const totalQ = ROOMS.reduce((n, r) => n + roomQuestionCount(r), 0);
    wrap.append(el('div', { class: 'stat-row', style: 'margin:10px 0 18px' }, [
      stat('Lv ' + L.lvl, STATE.xp + ' XP'),
      stat(doneRooms + '/' + ROOMS.length, 'rooms voltooid'),
      stat(doneQ + '/' + totalQ, 'vragen beantwoord'),
      stat('🚩 ' + (STATE.flags || 0), 'vlaggen'),
      stat('🏅 ' + Object.keys(STATE.badges || {}).length + '/' + BADGES.length, 'badges'),
      stat('🎯 ' + (STATE.bestStreak || 0), 'beste arena-reeks'),
      stat('🎓 ' + (STATE.examBest || 0) + '%', 'beste examen'),
      stat('🔥 ' + ((STATE.daily && STATE.daily.best) || 0), 'langste dagreeks'),
    ]));
    wrap.append(el('h3', { text: 'Voortgang per leerpad' }));
    PATHS.forEach((p) => {
      const rs = ROOMS.filter((r) => r.path === p.id); if (!rs.length) return;
      const done = rs.filter(roomDone).length;
      wrap.append(el('div', { class: 'section-head', style: 'margin:14px 0 4px' }, [el('h2', { style: 'font-size:1.05rem', text: p.icon + ' ' + p.title }), el('span', { class: 'meta', text: done + '/' + rs.length + ' af' })]));
      wrap.append(el('div', { class: 'pathbar', style: 'margin:0 0 6px' }, el('i', { style: 'width:' + Math.round((done / rs.length) * 100) + '%' })));
    });
    wrap.append(el('div', { class: 'room-foot', style: 'margin-top:18px' }, [
      el('button', { class: 'btn', text: '🎓 Doe een examen', onclick: () => go('#/examen') }),
      el('button', { class: 'btn', text: '🔥 Dagchallenge', onclick: () => go('#/daily') }),
    ]));
    root.append(wrap); renderFooter(root); window.scrollTo(0, 0);
  }

  // =======================================================================
  //  Footer + router
  // =======================================================================
  function renderFooter(root) {
    root.append(el('footer', { class: 'sitefoot' }, el('div', { class: 'wrap' }, [
      el('div', { html: 'NineMinds Cyber Dojo · gemaakt om doelgericht te leren · <em>oefen aanvalstechnieken alleen in je eigen lab of met schriftelijke toestemming</em>' }),
      el('div', { text: 'Voortgang wordt lokaal in je browser bewaard.' }),
    ])));
  }

  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  CS.go = go;
  function route() {
    const h = location.hash || '#/';
    const m = h.match(/^#\/room\/(.+)$/);
    if (m) renderRoom(decodeURIComponent(m[1]));
    else if (h === '#/arena') renderArena();
    else if (h === '#/flashcards') renderFlashcards();
    else if (h === '#/tools') renderTools();
    else if (h === '#/examen') renderExam();
    else if (h === '#/daily') renderDaily();
    else if (h === '#/scorebord') renderScorebord();
    else renderHome();
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
