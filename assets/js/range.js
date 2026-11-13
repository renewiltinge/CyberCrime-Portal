/* ======================================================================
   NineMinds Cyber Dojo — game rooms: de oefenrange (offensief)
   Een gesimuleerd netwerk van fictieve hosts met toestand. Je verkent,
   vindt een ingang, verzamelt inloggegevens, verhoogt rechten en pivoteert
   naar een volgend net. Alles is een vaste, geteste opdrachtenset: er wordt
   niets van de leerling uitgevoerd (geen eval), er gaat niets het netwerk op,
   en er is geen werkende exploitcode. De "aanval" is een puzzel: lees de
   uitvoer, trek de juiste conclusie, zet de volgende stap.

   Elke range opent met rules of engagement en sluit af met een verdedigende
   debrief: wat de blue team had gezien, en wat elke stap had gestopt. Zo
   blijft het een leerportaal. Zie docs/CONTENT-SPEC.md ("range") en ADR-0004.

   De kern (CS.range.create) gebruikt geen DOM, zodat tools/validate.js en de
   tests elke range met zijn oplossingsroute kunnen naspelen.
   ====================================================================== */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const CS = root.CS = root.CS || {};

  function rng(seed) {
    let t = seed >>> 0;
    return () => { t += 0x6D2B79F5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  }
  function hashStr(s) { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function pickVars(cfg, seed) {
    const r = rng(seed), out = {};
    Object.keys(cfg.vars || {}).forEach((k) => { const a = cfg.vars[k]; out[k] = String(a[Math.floor(r() * a.length)]); });
    return out;
  }
  function fill(x, vars) {
    if (typeof x === 'string') return x.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
    if (Array.isArray(x)) return x.map((y) => fill(y, vars));
    if (x && typeof x === 'object') { const o = {}; Object.keys(x).forEach((k) => { o[fill(k, vars)] = fill(x[k], vars); }); return o; }
    return x;
  }
  const lc = (s) => String(s == null ? '' : s).trim().toLowerCase();
  const pad = (s, n) => String(s).padEnd(n);

  // Hoeveel de ontdekkingsmeter stijgt. Luidruchtig scannen en mislukte pogingen vallen op.
  const NOISE = { scanNet: 6, scanHost: 3, loudscan: 20, web: 1, sshFail: 10, escalateFail: 6, brute: 15 };

  function create(raw, seed) {
    const vars = pickVars(raw, seed);
    const cfg = fill(Object.assign({}, raw, { vars: null }), vars);
    const hosts = {};
    (cfg.hosts || []).forEach((h) => { hosts[lc(h.name)] = h; hosts[lc(h.ip)] = h; });
    const maxNoise = cfg.maxNoise || 100;
    const startNet = cfg.startNet || 'ext';
    const S = { nets: new Set([startNet]), shells: {}, active: null, creds: [], found: new Set(), flags: new Set(), noise: 0, notes: [], history: [], ended: null, bluelog: [] };

    const hostByName = (n) => hosts[lc(n)];
    const netOf = (h) => h.net || 'ext';
    const reachable = (h) => S.nets.has(netOf(h));
    const haveCred = (user, target) => S.creds.some((c) => lc(c.user) === lc(user) && (!target || !c.target || lc(c.target) === lc(target)));
    const isRoot = (h) => S.shells[lc(h.name)] === 'root';
    const addNoise = (n, out, why) => {
      S.noise += n;
      if (S.noise >= maxNoise && !S.ended) { out.push({ cls: 'err', text: 'De verdediger heeft je gezien: de ontdekkingsmeter staat vol. ' + (why || '') }); end('betrapt', out); }
    };
    const blue = (txt) => S.bluelog.push({ step: S.history.length, text: txt });

    function end(reason, out) {
      if (S.ended) return;
      S.ended = reason;
      const left = flagsLeft();
      out.push({ cls: reason === 'betrapt' ? 'err' : 'muted', text: reason === 'betrapt'
        ? 'De blue team isoleert je toegang en je verliest de range. Wat je te luid deed, had stiller gekund.'
        : (left ? 'Je rondt af met ' + S.flags.size + ' van ' + totalFlags() + ' vlaggen.' : 'Alle vlaggen binnen. Lees de nabespreking.') });
    }
    const totalFlags = () => (cfg.hosts || []).reduce((n, h) => n + (h.flags || []).length, 0);
    const flagsLeft = () => totalFlags() - S.flags.size;

    function reveal(h, locKey, out) {
      (h.secrets || []).forEach((sec) => {
        if (lc(sec.loc) !== lc(locKey) || S.found.has('secret:' + h.name + ':' + sec.loc)) return;
        S.found.add('secret:' + h.name + ':' + sec.loc);
        if (sec.cred) { S.creds.push({ user: sec.cred.user, pass: sec.cred.pass, target: sec.cred.target || '', note: sec.cred.note || ('gevonden op ' + h.name) }); out.push({ cls: 'ok', text: '   Inloggegevens gevonden: ' + sec.cred.user + (sec.cred.target ? ' (voor ' + sec.cred.target + ')' : '') + ' — opgeslagen in je kladblok (creds).' }); }
        if (sec.text) out.push({ cls: 'ok', text: '   ' + sec.text });
      });
    }
    function captureFlagsAt(h, path, out) {
      (h.flags || []).forEach((f) => {
        if (lc(f.path) !== lc(path) || S.flags.has(f.id + '@' + h.name)) return;
        if (f.root && !isRoot(h)) return;
        S.flags.add(f.id + '@' + h.name);
        out.push({ cls: 'flag', text: '   >> VLAG: ' + f.value + '  (+' + (f.points || 10) + ')' });
      });
    }

    // ---- shell-bestandssysteem (alleen lezen) -----------------------------
    function shellHost() { return S.active ? hostByName(S.active) : null; }
    function dirList(h, dir) {
      const files = h.files || {};
      dir = dir.replace(/\/$/, '') || '';
      const names = new Set();
      Object.keys(files).forEach((p) => {
        if (lc(p).startsWith(lc(dir) + '/')) {
          const rest = p.slice(dir.length + 1).split('/')[0];
          if (rest) names.add(rest + (p.slice(dir.length + 1).includes('/') ? '/' : ''));
        }
      });
      return [...names].sort();
    }

    const V = {
      help(a, out) {
        const rows = [
          ['scan <subnet|host>', 'poorten en diensten in kaart brengen (een subnet is luidruchtiger)'],
          ['web <host> [pad]', 'een webserver bekijken; begin bij / en /robots.txt'],
          ['creds', 'de inloggegevens die je hebt gevonden'],
          ['ssh <gebruiker>@<host>', 'inloggen met een wachtwoord dat je al hebt gevonden'],
          ['ls [pad] · cat <pad>', 'bestanden lezen op de host waar je nu een shell hebt'],
          ['whoami · id · ps', 'wie en wat je bent op deze host'],
          ['sudo -l · find-suid · crontab -l', 'zoeken naar een manier om root te worden'],
          ['escalate <aanwijzing>', 'root worden via de zwakte die je vond'],
          ['hosts · use <host>', 'je shells; wisselen van actieve host'],
          ['flag <waarde> · notes · note <tekst>', 'een vlag inleveren; je kladblok'],
          ['done', 'de opdracht afronden'],
        ];
        out.push({ cls: 'muted', text: 'Opdrachten:' });
        rows.forEach((r) => out.push({ text: '  ' + pad(r[0], 30) + r[1] }));
        out.push({ cls: 'muted', text: 'Alles is gesimuleerd. Doe dit nooit buiten een lab of zonder schriftelijke toestemming.' });
        return out;
      },
      status(a, out) {
        out.push({ text: 'Vlaggen ' + S.flags.size + '/' + totalFlags() + ' · ontdekkingsmeter ' + S.noise + '/' + maxNoise + ' · netten: ' + [...S.nets].join(', ') });
        (cfg.objectives || []).forEach((o) => out.push({ cls: objOk(o) ? 'ok' : 'muted', text: '  [' + (objOk(o) ? 'x' : ' ') + '] ' + o.text }));
        const sh = Object.keys(S.shells);
        if (sh.length) out.push({ cls: 'muted', text: 'Shells: ' + sh.map((n) => n + ' (' + S.shells[n] + ')').join(', ') });
        return out;
      },
      hosts(a, out) {
        const seen = (cfg.hosts || []).filter((h) => S.found.has('seen:' + h.name) || S.shells[lc(h.name)]);
        if (!seen.length) { out.push({ cls: 'muted', text: 'Nog niets ontdekt. Begin met scan ' + (cfg.startScan || startNet) + '.' }); return out; }
        seen.forEach((h) => out.push({ text: pad(h.ip, 15) + pad(h.name, 14) + pad(S.shells[lc(h.name)] ? 'shell: ' + S.shells[lc(h.name)] : '', 16) + h.role }));
        return out;
      },
      scan(a, out) {
        const t = lc(a[0]);
        if (!t) { out.push({ cls: 'err', text: 'Gebruik: scan <subnet of host>. Bekende netten: ' + [...S.nets].join(', ') }); return out; }
        const loud = a.includes('-p-') || a.includes('--all');
        // Subnet of net-id
        const asNet = cfg.nets && cfg.nets[t] ? t : (Object.keys(cfg.nets || {}).find((n) => lc(cfg.nets[n].cidr) === t));
        if (asNet || t === 'all') {
          if (asNet && !S.nets.has(asNet)) { out.push({ cls: 'err', text: 'Dat net is van hieruit niet bereikbaar. Je moet eerst een voet aan de grond krijgen op een host die eraan grenst.' }); return out; }
          addNoise(loud ? NOISE.loudscan : NOISE.scanNet, out, 'Een breed poortscan valt op.');
          if (S.ended) return out;
          const list = (cfg.hosts || []).filter((h) => (asNet ? netOf(h) === asNet : reachable(h)) && reachable(h));
          if (!list.length) { out.push({ cls: 'muted', text: 'Geen hosts gevonden.' }); return out; }
          list.forEach((h) => { S.found.add('seen:' + h.name); blue('poortscan gezien op ' + h.ip + ' vanaf het aanvalsadres'); out.push({ text: pad(h.ip, 15) + pad(h.name, 14) + (h.ports || []).map((p) => p.n + '/' + p.svc).join(' ') }); });
          return out;
        }
        const h = hostByName(t);
        if (!h || !reachable(h)) { out.push({ cls: 'err', text: t + ': geen bereikbare host met dat adres.' }); return out; }
        addNoise(NOISE.scanHost, out);
        if (S.ended) return out;
        S.found.add('seen:' + h.name);
        blue('gerichte poortscan op ' + h.ip);
        out.push({ cls: 'muted', text: 'Nmap-achtig resultaat voor ' + h.ip + ' (' + h.name + '):' });
        (h.ports || []).forEach((p) => out.push({ text: '  ' + pad(p.n + '/tcp', 10) + pad('open', 6) + pad(p.svc, 10) + (p.ver || '') + (p.note ? '   ' + p.note : '') }));
        return out;
      },
      web(a, out) {
        const h = hostByName(a[0]);
        if (!h || !reachable(h)) { out.push({ cls: 'err', text: (a[0] || '(leeg)') + ': geen bereikbare webhost.' }); return out; }
        if (!h.pages) { out.push({ cls: 'err', text: h.name + ' heeft geen webserver die je kunt lezen.' }); return out; }
        const path = a[1] || '/';
        const body = h.pages[path] != null ? h.pages[path] : h.pages[lc(path)];
        addNoise(NOISE.web, out);
        blue('HTTP-verzoek ' + path + ' op ' + h.name);
        if (body == null) { out.push({ cls: 'muted', text: 'HTTP 404 Not Found: ' + path }); return out; }
        out.push({ cls: 'muted', text: 'GET ' + path + ' op ' + h.name + ':' });
        String(body).split('\n').forEach((l) => out.push({ text: '  ' + l }));
        reveal(h, 'web:' + path, out);
        captureFlagsAt(h, 'web:' + path, out);
        return out;
      },
      creds(a, out) {
        if (!S.creds.length) { out.push({ cls: 'muted', text: 'Nog geen inloggegevens gevonden. Lees bestanden en webpaginas.' }); return out; }
        S.creds.forEach((c) => out.push({ text: '  ' + pad(c.user + (c.pass ? ':' + c.pass : ''), 28) + (c.target ? '-> ' + c.target + '  ' : '') + (c.note || '') }));
        return out;
      },
      ssh(a, out) {
        const m = (a[0] || '').match(/^([^@]+)@(.+)$/);
        if (!m) { out.push({ cls: 'err', text: 'Gebruik: ssh <gebruiker>@<host>' }); return out; }
        const user = m[1], h = hostByName(m[2]);
        if (!h || !reachable(h)) { out.push({ cls: 'err', text: m[2] + ': niet bereikbaar.' }); return out; }
        const accs = h.accounts || {};
        if (!accs[user]) { addNoise(NOISE.sshFail, out); blue('mislukte SSH-aanmelding voor ' + user + ' op ' + h.name); out.push({ cls: 'err', text: 'Aanmelding geweigerd voor ' + user + '. Fout wachtwoord of geen account.' }); return out; }
        if (!haveCred(user, h.name) && !haveCred(user)) { addNoise(NOISE.brute, out, 'Wachtwoorden blind proberen valt op.'); blue('veel mislukte SSH-pogingen voor ' + user + ' op ' + h.name); out.push({ cls: 'err', text: 'Je hebt het wachtwoord van ' + user + ' nog niet gevonden. Blind proberen is luidruchtig.' }); return out; }
        S.shells[lc(h.name)] = user; S.active = lc(h.name); S.found.add('shell:' + h.name);
        blue('geslaagde SSH-aanmelding ' + user + ' op ' + h.name);
        out.push({ cls: 'ok', text: 'Verbonden met ' + h.name + ' als ' + user + '.' });
        (h.bridges || []).forEach((n) => { if (!S.nets.has(n)) { S.nets.add(n); out.push({ cls: 'ok', text: '   Deze host grenst aan een nieuw net: ' + n + ' (scan ' + n + ').' }); } });
        return out;
      },
      use(a, out) {
        const h = hostByName(a[0]);
        if (!h || !S.shells[lc(h.name)]) { out.push({ cls: 'err', text: (a[0] || '(leeg)') + ': daar heb je geen shell. Typ hosts.' }); return out; }
        S.active = lc(h.name); out.push({ cls: 'muted', text: 'Actieve host: ' + h.name + ' (' + S.shells[S.active] + ').' });
        return out;
      },
      whoami(a, out) { const h = shellHost(); out.push({ text: h ? S.shells[S.active] : 'geen shell' }); return out; },
      id(a, out) { const h = shellHost(); out.push({ text: h ? 'uid=' + S.shells[S.active] + (isRoot(h) ? ' (root)' : '') + ' op ' + h.name : 'geen shell' }); return out; },
      ps(a, out) { const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell.' }); return out; } (h.procs || ['init', 'sshd', 'bash']).forEach((p) => out.push({ text: '  ' + p })); return out; },
      ls(a, out) {
        const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell. Log eerst in met ssh.' }); return out; }
        const dir = a[0] || (isRoot(h) ? '/root' : '/home/' + S.shells[S.active]);
        const entries = dirList(h, dir);
        if (!entries.length) { out.push({ cls: 'muted', text: '(leeg of geen toegang: ' + dir + ')' }); return out; }
        entries.forEach((e) => out.push({ text: '  ' + e }));
        return out;
      },
      cat(a, out) {
        const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell.' }); return out; }
        const p = a[0]; if (!p) { out.push({ cls: 'err', text: 'Gebruik: cat <pad>' }); return out; }
        const files = h.files || {};
        const body = files[p] != null ? files[p] : files[lc(p)];
        const rootOnly = /^\/root\//.test(p) || (h.rootOnly || []).some((x) => lc(x) === lc(p));
        if (body == null) { out.push({ cls: 'muted', text: 'cat: ' + p + ': bestaat niet' }); return out; }
        if (rootOnly && !isRoot(h)) { out.push({ cls: 'err', text: 'cat: ' + p + ': toegang geweigerd (root)' }); return out; }
        String(body).split('\n').forEach((l) => out.push({ text: l }));
        reveal(h, 'file:' + p, out);
        captureFlagsAt(h, p, out);
        return out;
      },
      'find-suid': function (a, out) {
        const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell.' }); return out; }
        const esc = h.escalation;
        out.push({ cls: 'muted', text: 'SUID-bestanden op ' + h.name + ':' });
        ['/usr/bin/passwd', '/usr/bin/sudo'].concat(esc && esc.via === 'suid' ? [esc.show || ('/usr/bin/' + esc.token)] : []).forEach((f) => out.push({ text: '  -rwsr-xr-x ' + f }));
        if (esc && esc.via === 'suid') { S.found.add('privseen:' + h.name); out.push({ cls: 'ok', text: '   Opvallend: ' + (esc.note || (esc.token + ' hoort hier geen SUID te hebben')) + '  (escalate ' + esc.token + ')'}); }
        return out;
      },
      sudo(a, out) {
        const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell.' }); return out; }
        const esc = h.escalation;
        if (a[0] === '-l') {
          out.push({ cls: 'muted', text: 'Toegestane sudo-opdrachten voor ' + S.shells[S.active] + ' op ' + h.name + ':' });
          if (esc && esc.via === 'sudo') { S.found.add('privseen:' + h.name); out.push({ text: '  (ALL) NOPASSWD: ' + (esc.show || esc.token) }); out.push({ cls: 'ok', text: '   ' + (esc.note || 'Dit laat zich misbruiken om root te worden') + '  (escalate ' + esc.token + ')' }); }
          else out.push({ text: '  (geen)' });
          return out;
        }
        out.push({ cls: 'muted', text: 'Gebruik sudo -l om te zien wat mag, of escalate <aanwijzing>.' });
        return out;
      },
      crontab(a, out) {
        const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell.' }); return out; }
        const esc = h.escalation;
        out.push({ cls: 'muted', text: 'Geplande taken op ' + h.name + ':' });
        if (esc && esc.via === 'cron') { S.found.add('privseen:' + h.name); out.push({ text: '  ' + (esc.show || ('*/5 * * * * root ' + esc.token)) }); out.push({ cls: 'ok', text: '   ' + (esc.note || 'Dit script draait als root en is te beinvloeden') + '  (escalate ' + esc.token + ')' }); }
        else out.push({ text: '  (geen interessante taken)' });
        return out;
      },
      escalate(a, out) {
        const h = shellHost(); if (!h) { out.push({ cls: 'err', text: 'Geen shell.' }); return out; }
        const esc = h.escalation;
        if (isRoot(h)) { out.push({ cls: 'muted', text: 'Je bent hier al root.' }); return out; }
        if (!esc) { out.push({ cls: 'err', text: 'Op deze host is geen eenvoudige weg naar root die je zo kunt nemen.' }); return out; }
        if (!S.found.has('privseen:' + h.name)) { addNoise(NOISE.escalateFail, out); out.push({ cls: 'err', text: 'Je weet nog niet welke zwakte je zou misbruiken. Zoek eerst (sudo -l, find-suid, crontab -l).' }); return out; }
        if (lc(a[0]) !== lc(esc.token)) { addNoise(NOISE.escalateFail, out); out.push({ cls: 'err', text: (a[0] || '(leeg)') + ' brengt je niet naar root. Kijk nog eens naar wat opviel.' }); return out; }
        S.shells[lc(h.name)] = 'root'; S.found.add('root:' + h.name);
        blue('rechtenverhoging naar root op ' + h.name + ' via ' + esc.via);
        out.push({ cls: 'ok', text: 'Je bent nu root op ' + h.name + '.' });
        (h.onRoot || []).forEach((sec) => { if (sec.cred) { S.creds.push({ user: sec.cred.user, pass: sec.cred.pass, target: sec.cred.target || '', note: sec.cred.note || 'uit root-toegang op ' + h.name }); out.push({ cls: 'ok', text: '   Inloggegevens gevonden: ' + sec.cred.user + (sec.cred.target ? ' (voor ' + sec.cred.target + ')' : '') }); } if (sec.text) out.push({ cls: 'ok', text: '   ' + sec.text }); });
        return out;
      },
      flag(a, out) {
        const v = (a[0] || '').trim();
        let hit = null;
        (cfg.hosts || []).forEach((h) => (h.flags || []).forEach((f) => { if (lc(f.value) === lc(v)) hit = { h, f }; }));
        if (!hit) { out.push({ cls: 'err', text: 'Dat is geen vlag uit deze range.' }); return out; }
        const key = hit.f.id + '@' + hit.h.name;
        if (S.flags.has(key)) { out.push({ cls: 'muted', text: 'Die vlag had je al.' }); return out; }
        out.push({ cls: 'flag', text: '>> VLAG AANVAARD: ' + hit.f.value + '  (+' + (hit.f.points || 10) + ')' });
        S.flags.add(key);
        return out;
      },
      note(a, out) { if (a.length) { S.notes.push(a.join(' ')); out.push({ cls: 'muted', text: 'Genoteerd.' }); } return out; },
      notes(a, out) { if (!S.notes.length) out.push({ cls: 'muted', text: 'Je kladblok is leeg.' }); S.notes.forEach((n) => out.push({ text: '- ' + n })); return out; },
      done(a, out) { end('klaar', out); return out; },
    };

    function objOk(o) {
      if (o.flags) return o.flags.every((id) => [...S.flags].some((k) => k.split('@')[0] === id || k === id));
      if (o.found) return o.found.every((k) => S.found.has(k));
      if (o.all) return o.all.every((k) => S.found.has(k));
      return false;
    }

    function exec(line) {
      const out = [];
      const raw = String(line == null ? '' : line).trim();
      if (!raw) return out;
      if (S.ended && !['help', 'notes', 'status'].includes(lc(raw.split(/\s+/)[0]))) return [{ cls: 'muted', text: 'De opdracht is afgesloten. Lees de nabespreking of begin opnieuw.' }];
      S.history.push(raw);
      const parts = raw.split(/\s+/);
      let verb = lc(parts[0]);
      const alias = { connect: 'ssh', download: 'cat', get: 'web', 'suid': 'find-suid' };
      if (alias[verb]) verb = alias[verb];
      const fn = Object.prototype.hasOwnProperty.call(V, verb) ? V[verb] : null;
      if (!fn) { out.push({ cls: 'err', text: parts[0] + ': onbekend commando. Typ help.' }); return out; }
      fn(parts.slice(1), out);
      if (!S.ended && flagsLeft() === 0 && (cfg.objectives || []).every(objOk)) end('klaar', out);
      return out;
    }

    function result() {
      const objs = (cfg.objectives || []).map((o) => ({ text: o.text, points: o.points || 10, ok: objOk(o), required: o.required !== false }));
      const flagPts = (cfg.hosts || []).reduce((n, h) => n + (h.flags || []).reduce((m, f) => m + (S.flags.has(f.id + '@' + h.name) ? (f.points || 10) : 0), 0), 0);
      const max = (cfg.hosts || []).reduce((n, h) => n + (h.flags || []).reduce((m, f) => m + (f.points || 10), 0), 0);
      const won = S.ended && S.ended !== 'betrapt' && S.flags.size === totalFlags() && objs.every((o) => !o.required || o.ok);
      return { objs, flags: S.flags.size, totalFlags: totalFlags(), score: flagPts, max, noise: S.noise, won, caught: S.ended === 'betrapt', reason: S.ended, bluelog: S.bluelog.slice() };
    }
    return { cfg, vars, S, exec, result, objOk, solution: cfg.solution || [], totalFlags, flagsLeft };
  }

  CS.range = { create, hashStr, pickVars, fill };

  // =======================================================================
  //  Weergave in de browser
  // =======================================================================
  if (!CS.registerLab || typeof document === 'undefined') return;
  CS.registerLab('range', function (container, raw, ctx) {
    const { el, esc } = CS.util;
    const store = CS.store ? CS.store() : {};
    store.range = store.range || {};
    if (store.seed == null) store.seed = Math.floor(Math.random() * 1e9);
    const key = ctx && ctx.room ? ctx.room.id : 'gereedschap';
    const rec = store.range[key] = store.range[key] || { attempts: 0, wins: 0, best: null, variant: 0, clean: false };
    const save = () => { if (CS.saveStore) CS.saveStore(); };
    save();
    const box = el('div', { class: 'lab range' });
    container.append(box);
    let game, openedAt = Date.now();
    const head = () => el('div', { class: 'lab-head' }, el('span', { class: 'title', html: 'Oefenrange · <b>' + esc(raw.title || '') + '</b>' }));
    const variantName = () => (CS.range.hashStr(store.seed + ':' + key + ':' + rec.variant) % 65536).toString(16).padStart(4, '0');
    const newGame = () => { game = CS.range.create(raw, CS.range.hashStr(store.seed + ':' + key + ':' + rec.variant)); box.__game = game; };

    function briefing() {
      newGame();
      box.innerHTML = '';
      const pad0 = el('div', { class: 'lab-pad' });
      if (raw.role) pad0.append(el('p', {}, [el('strong', { text: 'Jouw rol. ' }), el('span', { text: game.cfg.role })]));
      if (raw.story) pad0.append(el('p', { text: game.cfg.story }));
      pad0.append(el('h4', { text: 'Rules of engagement' }));
      pad0.append(el('ul', { class: 'mandaat' }, (game.cfg.mandate || []).map((m) => el('li', { text: m }))));
      const chk = el('input', { type: 'checkbox', id: 'roe-' + key });
      const go = el('button', { class: 'btn primary', disabled: true, onclick: () => consoleView() }, [CS.icon('play', 16), el('span', { text: 'Start de oefening' })]);
      chk.addEventListener('change', () => { go.disabled = !chk.checked; });
      pad0.append(el('label', { class: 'mandaat-ok', for: 'roe-' + key }, [chk, el('span', { text: 'Ik blijf binnen de scope en begrijp dat dit een simulatie is.' })]));
      pad0.append(el('div', { class: 'incident-start' }, [go, el('span', { class: 'num', text: 'Variant ' + variantName() }), el('button', { class: 'lnk', text: 'Andere variant', onclick: () => { rec.variant++; save(); briefing(); } })]));
      box.append(head(), pad0);
    }

    function consoleView() {
      box.innerHTML = '';
      const hud = el('div', { class: 'hud' });
      const term = el('div', { class: 'term', role: 'log', 'aria-live': 'polite' });
      const input = el('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Opdracht voor de oefenrange' });
      const inrow = el('div', { class: 'inrow' }, [el('span', { class: 'prompt', text: 'range> ' }), input]);
      term.append(inrow);
      const hist = []; let hi = 0;
      const print = (lines) => { lines.forEach((l) => inrow.before(el('div', { class: 'line' + (l.cls === 'err' ? ' err' : l.cls === 'muted' ? ' muted' : l.cls === 'ok' ? ' okline' : l.cls === 'flag' ? ' flagline' : ''), text: l.text }))); term.scrollTop = term.scrollHeight; };
      const run = (cmd) => { print([{ cls: 'prompt', text: 'range> ' + cmd }]); print(game.exec(cmd)); paintHud(); if (game.S.ended) debrief(); };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { const v = input.value; input.value = ''; if (v.trim()) { hist.push(v); hi = hist.length; run(v); } }
        else if (e.key === 'ArrowUp' && hi > 0) { hi--; input.value = hist[hi]; e.preventDefault(); }
        else if (e.key === 'ArrowDown') { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; e.preventDefault(); }
      });
      term.addEventListener('click', () => input.focus());
      function paintHud() {
        hud.innerHTML = '';
        const r = game.result();
        hud.append(
          el('div', { class: 'cell' }, [el('span', { class: 'label', text: 'Vlaggen' }), el('span', { class: 'num big', text: r.flags + ' / ' + r.totalFlags })]),
          el('div', { class: 'cell' }, [el('span', { class: 'label', text: 'Ontdekkingsmeter' }), el('span', { class: 'num big', text: game.S.noise + ' / ' + (game.cfg.maxNoise || 100) }), el('div', { class: 'meter-line', role: 'meter', 'aria-valuemin': '0', 'aria-valuemax': String(game.cfg.maxNoise || 100), 'aria-valuenow': String(game.S.noise), 'aria-label': 'Ontdekkingsmeter' }, el('i', { style: 'width:' + Math.min(100, Math.round((100 * game.S.noise) / (game.cfg.maxNoise || 100))) + '%' }))]),
          el('div', { class: 'cell' }, [el('span', { class: 'label', text: 'Netten' }), el('span', { class: 'num big', text: String(game.S.nets.size) }), el('span', { class: 'found-note', text: [...game.S.nets].join(', ') })]),
        );
        hud.append(el('ul', { class: 'goals' }, (game.cfg.objectives || []).map((o) => el('li', { class: game.objOk(o) ? 'ok' : '' }, [CS.icon(game.objOk(o) ? 'check' : 'target', 15), el('span', { text: o.text })]))));
      }
      const chips = el('div', { class: 'chip-row' }, ['help', 'status', 'hosts', 'creds', 'notes'].map((c) => el('span', { class: 'chip', role: 'button', tabindex: '0', text: c, onclick: () => run(c), onkeydown: (e) => { if (e.key === 'Enter') run(c); } })));
      const finish = el('button', { class: 'btn', onclick: () => run('done') }, [CS.icon('flag', 16), el('span', { text: 'Afronden' })]);
      const walk = el('div', { class: 'walk' });
      box.append(head(), hud, el('div', { class: 'lab-body' }, term), el('div', { class: 'lab-pad incident-foot' }, [chips, finish, walk]));
      paintWalk(walk);
      print([{ cls: 'muted', text: game.cfg.motd || 'Typ help. Begin met scan ' + (game.cfg.startScan || game.cfg.startNet || 'ext') + '.' }]);
      paintHud();
      input.focus({ preventScroll: true });
    }

    function paintWalk(node) {
      node.innerHTML = '';
      const open = rec.attempts > 0 || Date.now() - openedAt > 15 * 60000;
      if (!open) { node.append(el('p', { class: 'found-note', text: 'De walkthrough komt vrij na je eerste poging, of na een kwartier proberen.' })); setTimeout(() => { if (document.body.contains(node)) paintWalk(node); }, 60000); return; }
      node.append(el('details', {}, [el('summary', { text: 'Walkthrough (voor deze variant)' }), el('ol', { class: 'walklist' }, game.solution.map((c, i) => el('li', {}, [el('code', { text: c }), (game.cfg.solutionNotes || [])[i] ? el('span', { text: ' ' + game.cfg.solutionNotes[i] }) : null])))]));
    }

    function debrief() {
      const r = game.result();
      rec.attempts++;
      if (r.won) rec.wins++;
      if (r.score > (rec.best || 0)) rec.best = r.score;
      if (r.won && !r.caught && r.noise <= (game.cfg.quietUnder != null ? game.cfg.quietUnder : 40)) rec.clean = true;
      save();
      if (CS.checkBadges) CS.checkBadges();
      const d = el('div', { class: 'lab-pad debrief' + (r.won ? ' won' : '') });
      d.append(el('span', { class: 'stamp', text: 'Nabespreking' }));
      d.append(el('h3', {}, [CS.icon(r.won ? 'check' : 'cross', 18), el('span', { text: r.won ? 'Alle vlaggen binnen' : (r.caught ? 'Betrapt' : 'Nog niet alle vlaggen') })]));
      d.append(el('p', { class: 'num', text: 'Vlaggen ' + r.flags + '/' + r.totalFlags + ' · score ' + r.score + '/' + r.max + ' · ontdekkingsmeter ' + r.noise + '/' + (game.cfg.maxNoise || 100) }));
      const li = (ok, text) => el('li', { class: ok ? 'ok' : 'no' }, [CS.icon(ok ? 'check' : 'cross', 15), el('span', { text })]);
      d.append(el('h4', { text: 'Doelen' }), el('ul', { class: 'goals' }, r.objs.map((o) => li(o.ok, o.text))));
      if (game.cfg.debrief) d.append(el('div', { class: 'body', html: game.cfg.debrief }));
      if ((game.cfg.ask || []).length) {
        d.append(el('h4', { text: 'Leg vast wat je deed' }));
        game.cfg.ask.forEach((q) => {
          const inp = el('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': q.q });
          const fb = el('div', { class: 'feedback' });
          const chk = () => { const ok = (q.answer || []).some((x) => lc(x) === lc(inp.value)); fb.className = 'feedback show ' + (ok ? 'ok' : 'no'); fb.textContent = ok ? 'Klopt.' : 'Nog niet; kijk terug in de console.'; if (ok) inp.disabled = true; };
          inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') chk(); });
          d.append(el('div', { class: 'askrow' }, [el('label', { text: q.q }), el('div', { class: 'ans-row' }, [inp, el('button', { class: 'btn small', text: 'Controleer', onclick: chk })]), fb]));
        });
      }
      if (r.won) { if (game.cfg.flag) d.append(el('p', { class: 'flagline' }, [el('span', { text: 'Eindvlag: ' }), el('code', { text: game.cfg.flag })])); }
      else d.append(el('p', { class: 'found-note', text: 'Haal alle vlaggen zonder betrapt te worden. De walkthrough staat nu open.' }));
      d.append(el('div', { class: 'incident-start' }, [el('button', { class: 'btn primary', text: 'Opnieuw, zelfde variant', onclick: () => briefing() }), el('button', { class: 'btn', text: 'Andere variant', onclick: () => { rec.variant++; save(); briefing(); } })]));
      box.append(d);
      const walk = box.querySelector('.walk'); if (walk) paintWalk(walk);
      if (r.won && CS.triumph) CS.triumph(d, 'ALLE VLAGGEN BINNEN', r.score);
      d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    briefing();
  });
})();
