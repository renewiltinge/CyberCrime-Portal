/* ======================================================================
   NineMinds Cyber Dojo — game rooms: de incidentconsole
   Een verdedigende simulatie met toestand. De klok loopt mee met wat je doet,
   de aanval gaat door tot je hem stopt, en een verkeerde ingreep heeft
   gevolgen. Alles is een vaste, geteste opdrachtenset: er wordt niets van de
   leerling uitgevoerd (geen eval) en er gaat niets het netwerk op.

   De kern (CS.game.create) gebruikt geen DOM, zodat tools/validate.js en de
   tests elke room met zijn oplossingsroute kunnen naspelen.
   Zie docs/CONTENT-SPEC.md, "incident", en docs/adr/0003.
   ====================================================================== */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const CS = root.CS = root.CS || {};

  // ---- Kleine hulpen -----------------------------------------------------
  function rng(seed) {
    let t = seed >>> 0;
    return () => { t += 0x6D2B79F5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  }
  function hashStr(s) { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  // Per leerling een eigen variant: elke variabele krijgt één waarde uit zijn lijst.
  function pickVars(cfg, seed) {
    const r = rng(seed), out = {};
    Object.keys(cfg.vars || {}).forEach((k) => { const a = cfg.vars[k]; out[k] = String(a[Math.floor(r() * a.length)]); });
    return out;
  }
  // {{naam}} in alle teksten én sleutels vervangen door de waarde van deze variant.
  function fill(x, vars) {
    if (typeof x === 'string') return x.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
    if (Array.isArray(x)) return x.map((y) => fill(y, vars));
    if (x && typeof x === 'object') { const o = {}; Object.keys(x).forEach((k) => { o[fill(k, vars)] = fill(x[k], vars); }); return o; }
    return x;
  }
  function clock(start, t) {
    const p = String(start || '00:00').split(':').map(Number);
    const x = (((p[0] * 60 + p[1] + t) % 1440) + 1440) % 1440;
    return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0');
  }
  const lc = (s) => String(s == null ? '' : s).trim().toLowerCase();
  const pad = (s, n) => String(s).padEnd(n);

  // Hoeveel minuten een handeling kost. Lezen is snel, veiligstellen en herstellen niet.
  const COST = { help: 0, status: 0, alerts: 0, hosts: 0, accounts: 0, notes: 0, note: 0, report: 0,
    logs: 1, ps: 1, mail: 1, show: 1, block: 1, reset: 1, disable: 1, kill: 1, purge: 1, shutdown: 1,
    isolate: 2, fix: 2, snapshot: 5, restore: 10 };
  const ALIAS = { hulp: 'help', meldingen: 'alerts', isoleer: 'isolate', blokkeer: 'block', wacht: 'wait', afsluiten: 'report', notitie: 'note', notities: 'notes', toon: 'show', herstel: 'restore' };

  // =======================================================================
  //  De kern
  // =======================================================================
  function create(raw, seed) {
    const vars = pickVars(raw, seed);
    const cfg = fill(Object.assign({}, raw, { vars: null }), vars);
    const index = (list, key) => { const o = {}; (list || []).forEach((x) => { o[lc(x[key])] = x; }); return o; };
    const hosts = index(cfg.hosts, 'name'), accounts = index(cfg.accounts, 'name');
    const mails = index(cfg.mails, 'id'), fixes = index(cfg.fixes, 'id'), legit = index(cfg.legit, 'value');
    const deadline = cfg.deadline || 60, maxDamage = cfg.maxDamage || 100;
    const S = { now: 0, done: {}, damage: 0, penalties: [], fired: {}, ended: null, notes: [], history: [], off: {}, killed: {} };
    const at = (t) => clock(cfg.start, t);

    const isDone = (k, by) => { const t = S.done[lc(k)]; return t != null && (by == null || t <= by); };
    const shown = (it) => (it.t == null ? -9999 : it.t) <= S.now && !(it.unless || []).some((k) => isDone(k, it.t)) && (!it.after || S.fired[it.after] === 'hit');
    const hostHit = (h) => !!(h.compromised || (h.compromisedBy && S.fired[h.compromisedBy] === 'hit'));
    const acctHit = (a) => !!(a.compromised || (a.compromisedBy && S.fired[a.compromisedBy] === 'hit'));
    const hostState = (h) => (S.off[lc(h.name)] ? 'uit' : isDone('isolate:' + h.name) ? 'geïsoleerd' : 'online');

    function penalize(key, points, text, out) {
      if (S.penalties.some((p) => p.key === key)) return;
      S.penalties.push({ key, points, text, t: S.now });
      out.push({ cls: 'err', text: '   Gevolg (−' + points + '): ' + text });
    }
    function record(key, t, out) {
      key = lc(key);
      if (S.done[key] == null) S.done[key] = t;
      (cfg.rules || []).forEach((r, i) => {
        if (lc(r.on) === key && !(r.unless || []).some((k) => isDone(k))) penalize('regel:' + i, r.points || 10, r.text, out);
      });
    }
    function resolveThreat(th, by, out, after) {
      const need = th.requires && S.fired[th.requires] !== 'hit';
      const any = (th.stoppedBy || []).some((k) => isDone(k, by));
      const all = th.stoppedByAll && th.stoppedByAll.every((k) => isDone(k, by));
      const stopped = need || any || all;
      S.fired[th.id] = stopped ? 'stopped' : 'hit';
      if (stopped) { if (th.stoppedText && !need) out.push({ cls: 'ok', text: '[' + at(th.at) + '] ' + th.stoppedText }); return; }
      S.damage += th.damage || 0;
      out.push({ cls: 'alert', text: (after ? 'Na je overdracht' : '[' + at(th.at) + ']') + ' !! ' + th.text + (th.damage ? '  (schade +' + th.damage + ')' : '') });
    }
    function end(reason, out) {
      if (S.ended) return;
      if (reason === 'report') {
        // Wie afsluit terwijl de aanvaller nog binnen is, ziet wat er daarna gebeurt.
        const open = (cfg.threats || []).filter((th) => !S.fired[th.id]).sort((a, b) => a.at - b.at);
        if (open.length) out.push({ cls: 'muted', text: 'Je draagt het incident over. Wat er daarna nog zou gebeuren:' });
        open.forEach((th) => resolveThreat(th, null, out, true));
      }
      S.ended = reason;
      out.push({ cls: reason === 'report' ? 'muted' : 'err', text: { report: 'Incident afgesloten om ' + at(S.now) + '.', tijd: 'De dienst zit erop (' + at(deadline) + '). Het incident gaat over naar de volgende ploeg.', schade: 'De schade is te groot geworden: de directie neemt het over en schakelt een extern IR-bureau in.' }[reason] });
    }
    function advance(to, out) {
      const from = S.now;
      S.now = to;
      // Dreigingen en meldingen samen, op tijd: wat om 05:54 gebeurde, staat boven wat om 06:00 gebeurde.
      const ev = [];
      (cfg.threats || []).slice().sort((a, b) => a.at - b.at).forEach((th) => {
        if (S.fired[th.id] || th.at > to) return;
        const lines = []; resolveThreat(th, th.at, lines);
        lines.forEach((l) => ev.push({ t: th.at, l }));
      });
      (cfg.alerts || []).filter((a) => a.t > from && shown(a)).forEach((a) => ev.push({ t: a.t + 0.5, l: { cls: 'alert', text: '[' + at(a.t) + '] MELDING  ' + a.text } }));
      ev.sort((a, b) => a.t - b.t).forEach((e) => out.push(e.l));
      if (S.damage >= maxDamage) end('schade', out);
      else if (S.now >= deadline) end('tijd', out);
    }

    // ---- Handelingen. Elke functie geeft het aantal minuten terug. --------
    const needHost = (name, out) => { const h = hosts[lc(name)]; if (!h) out.push({ cls: 'err', text: (name || '(leeg)') + ': onbekende host. Typ hosts.' }); return h; };
    const needAcct = (name, out) => { const a = accounts[lc(name)]; if (!a) out.push({ cls: 'err', text: (name || '(leeg)') + ': onbekend account. Typ accounts.' }); return a; };
    const V = {
      help(args, out) {
        const rows = [
          ['status', 'klok, schade en je doelen'], ['alerts', 'de meldingen tot nu toe'],
          cfg.hosts ? ['hosts', 'systemen en hun toestand'] : null, cfg.accounts ? ['accounts', 'accounts en hun toestand'] : null,
          cfg.logs ? ['logs [bron] [zoekterm]', 'logregels lezen; zonder bron: de lijst met bronnen'] : null,
          cfg.procs ? ['ps <host>', 'draaiende processen'] : null,
          cfg.mails ? ['mail [id]', 'de mailwachtrij, of één mail met headers'] : null,
          cfg.show ? ['show [onderwerp]', 'configuratie of bestanden bekijken'] : null,
          cfg.hosts ? ['isolate <host>', 'host van het netwerk halen (EDR blijft verbonden)'] : null,
          ['block <ip of domein>', 'blokkeren op de firewall en de proxy'],
          cfg.accounts ? ['reset <account>', 'wachtwoord resetten en alle sessies intrekken'] : null,
          cfg.accounts ? ['disable <account>', 'account uitschakelen'] : null,
          cfg.procs ? ['kill <host> <pid>', 'een proces stoppen'] : null,
          cfg.hosts ? ['snapshot <host>', 'geheugen en schijf veiligstellen als bewijs'] : null,
          cfg.hosts ? ['shutdown <host>', 'host uitzetten'] : null,
          cfg.restore ? ['restore <host>', 'terugzetten uit de offline back-up'] : null,
          cfg.mails ? ['purge <mail-id>', 'een mail uit alle postvakken halen'] : null,
          cfg.fixes ? ['fix [maatregel]', 'een maatregel doorvoeren; zonder naam: de lijst'] : null,
          ['note <tekst> · notes', 'je kladblok'], ['wait [minuten]', 'wachten (standaard 5)'], ['report', 'het incident afsluiten'],
        ].filter(Boolean);
        out.push({ cls: 'muted', text: 'Opdrachten, met wat elke opdracht aan tijd kost:' });
        rows.forEach((r) => { const v = r[0].split(' ')[0]; const c = v === 'wait' ? 'n' : String(COST[v] != null ? COST[v] : 0); out.push({ text: '  ' + r[0] + '  (' + c + ' min)  ' + r[1] }); });
        return 0;
      },
      status(args, out) {
        const got = (cfg.objectives || []).filter(objOk).length;
        out.push({ text: 'Klok ' + at(S.now) + ' · dienst tot ' + at(deadline) + ' · schade ' + S.damage + ' van ' + maxDamage + ' · doelen ' + got + '/' + (cfg.objectives || []).length });
        (cfg.objectives || []).forEach((o) => out.push({ cls: objOk(o) ? 'ok' : 'muted', text: '  [' + (objOk(o) ? 'x' : ' ') + '] ' + o.text }));
        return 0;
      },
      alerts(args, out) {
        const list = (cfg.alerts || []).filter(shown).sort((a, b) => a.t - b.t);
        if (!list.length) out.push({ cls: 'muted', text: 'Geen meldingen.' });
        list.forEach((a) => out.push({ text: '[' + at(a.t) + '] ' + a.text }));
        return 0;
      },
      hosts(args, out) {
        (cfg.hosts || []).forEach((h) => out.push({ text: pad(h.name, 10) + pad(h.ip || '', 14) + pad(hostState(h), 12) + h.role }));
        return 0;
      },
      accounts(args, out) {
        (cfg.accounts || []).forEach((a) => out.push({ text: pad(a.name, 14) + pad(isDone('disable:' + a.name) ? 'uitgeschakeld' : isDone('reset:' + a.name) ? 'gereset' : 'actief', 15) + a.role }));
        return 0;
      },
      logs(args, out) {
        const srcs = Object.keys(cfg.logs || {});
        if (!args.length) { out.push({ cls: 'muted', text: 'Bronnen: ' + srcs.join(', ') + ', all. Voorbeeld: logs ' + (srcs[0] || 'all') + ' 4625' }); return 0; }
        const src = lc(args[0]), term = lc(args.slice(1).join(' '));
        const use = src === 'all' ? srcs : srcs.filter((s) => lc(s) === src);
        if (!use.length) { out.push({ cls: 'err', text: args[0] + ': onbekende bron. Bronnen: ' + srcs.join(', ') + ', all' }); return 0; }
        const lines = [];
        use.forEach((s) => (cfg.logs[s] || []).forEach((it) => { if (shown(it) && (!term || lc(it.line).includes(term))) lines.push({ t: it.t, s, line: it.line }); }));
        lines.sort((a, b) => a.t - b.t);
        if (!lines.length) out.push({ cls: 'muted', text: 'Geen regels' + (term ? ' met "' + term + '"' : '') + '.' });
        if (lines.length > 80) out.push({ cls: 'muted', text: '(' + (lines.length - 80) + ' oudere regels niet getoond; zoek gerichter)' });
        lines.slice(-80).forEach((l) => out.push({ text: '[' + at(l.t) + '] ' + (use.length > 1 ? pad(l.s, 9) : '') + l.line }));
        return COST.logs;
      },
      ps(args, out) {
        const h = needHost(args[0], out); if (!h) return 0;
        if (S.off[lc(h.name)]) { out.push({ cls: 'err', text: h.name + ' staat uit.' }); return 0; }
        const list = ((cfg.procs || {})[h.name] || []).filter((p) => shown(p) && !S.killed[lc(h.name) + ':' + p.pid]);
        out.push({ cls: 'muted', text: pad('PID', 7) + pad('GEBRUIKER', 14) + 'PROGRAMMA' });
        list.forEach((p) => out.push({ text: pad(p.pid, 7) + pad(p.user, 14) + p.name + (p.note ? '   ' + p.note : '') }));
        return COST.ps;
      },
      mail(args, out) {
        if (args.length) {
          const m = mails[lc(args[0])]; if (!m) { out.push({ cls: 'err', text: args[0] + ': geen mail met dit id.' }); return 0; }
          (m.detail || []).forEach((l) => out.push({ text: l }));
          return COST.mail;
        }
        out.push({ cls: 'muted', text: pad('ID', 8) + pad('TIJD', 7) + pad('AAN', 6) + pad('GEMELD', 8) + 'AFZENDER · ONDERWERP' });
        (cfg.mails || []).filter(shown).forEach((m) => out.push({ text: pad(m.id, 8) + pad(at(m.t), 7) + pad(m.to, 6) + pad(m.reported || 0, 8) + m.from + ' · ' + m.subject + (isDone('purge:' + m.id) ? '  [verwijderd]' : '') }));
        return COST.mail;
      },
      show(args, out) {
        const topics = Object.keys(cfg.show || {});
        if (!args.length) { out.push({ cls: 'muted', text: 'Onderwerpen: ' + topics.join(', ') }); return 0; }
        const k = topics.find((x) => lc(x) === lc(args[0]));
        if (!k) { out.push({ cls: 'err', text: args[0] + ': onbekend onderwerp. Onderwerpen: ' + topics.join(', ') }); return 0; }
        cfg.show[k].forEach((l) => out.push({ text: l }));
        return COST.show;
      },
      isolate(args, out) {
        const h = needHost(args[0], out); if (!h) return 0;
        if (S.off[lc(h.name)]) { out.push({ cls: 'muted', text: h.name + ' staat al uit.' }); return 0; }
        if (isDone('isolate:' + h.name)) { out.push({ cls: 'muted', text: h.name + ' is al geïsoleerd.' }); return 0; }
        const t = S.now + COST.isolate;
        out.push({ cls: 'ok', text: '[' + at(t) + '] ' + h.name + ': netwerkisolatie actief. De EDR-agent houdt contact, dus je kunt nog onderzoeken.' });
        if (!hostHit(h) && !h.safeToIsolate) penalize('isolate:' + h.name, h.critical ? 15 : 5, h.isolateText || (h.critical ? h.name + ' (' + h.role + ') ligt nu stil, terwijl er geen aanwijzing was dat deze machine besmet was.' : 'Er was geen aanwijzing dat ' + h.name + ' besmet was; een collega kan nu niet werken.'), out);
        record('isolate:' + h.name, t, out);
        return COST.isolate;
      },
      block(args, out) {
        const v = lc(args[0]); if (!v) { out.push({ cls: 'err', text: 'Gebruik: block <ip of domein>' }); return 0; }
        const t = S.now + COST.block;
        out.push({ cls: 'ok', text: '[' + at(t) + '] Firewall en proxy: verkeer van en naar ' + v + ' geblokkeerd.' });
        if (legit[v]) penalize('block:' + v, legit[v].points || 15, legit[v].text, out);
        record('block:' + v, t, out);
        return COST.block;
      },
      reset(args, out) { return acctAction('reset', args, out, 'wachtwoord gereset, alle sessies en tokens ingetrokken.'); },
      disable(args, out) { return acctAction('disable', args, out, 'account uitgeschakeld.'); },
      kill(args, out) {
        const h = needHost(args[0], out); if (!h) return 0;
        const p = ((cfg.procs || {})[h.name] || []).find((x) => x.pid === String(args[1] || '') && shown(x) && !S.killed[lc(h.name) + ':' + x.pid]);
        if (!p) { out.push({ cls: 'err', text: 'Geen draaiend proces ' + (args[1] || '(leeg)') + ' op ' + h.name + '. Typ ps ' + h.name + '.' }); return 0; }
        if (S.off[lc(h.name)]) { out.push({ cls: 'err', text: h.name + ' staat uit.' }); return 0; }
        const t = S.now + COST.kill;
        S.killed[lc(h.name) + ':' + p.pid] = true;
        out.push({ cls: 'ok', text: '[' + at(t) + '] ' + h.name + ': proces ' + p.pid + ' (' + p.name + ') gestopt.' });
        if (p.critical) penalize('kill:' + h.name + ':' + p.pid, 15, p.killText || p.name + ' is een onderdeel van het systeem of het werk zelf; ' + h.name + ' werkt nu niet meer.', out);
        record('kill:' + h.name + ':' + p.pid, t, out);
        return COST.kill;
      },
      snapshot(args, out) {
        const h = needHost(args[0], out); if (!h) return 0;
        if (S.off[lc(h.name)]) { out.push({ cls: 'err', text: h.name + ' staat uit: het werkgeheugen is weg. Een schijfkopie kan het lab later nog maken, maar processen en verbindingen zijn verloren.' }); return 0; }
        const t = S.now + COST.snapshot;
        const sum = (hashStr(h.name + seed) .toString(16) + hashStr(seed + h.name).toString(16)).padEnd(16, '0').slice(0, 16);
        S.notes.push('Bewijs ' + at(t) + ': geheugenbeeld en schijfkopie van ' + h.name + ', SHA-256 begint met ' + sum + ', in de kluis.');
        out.push({ cls: 'ok', text: '[' + at(t) + '] ' + h.name + ': geheugenbeeld en schijfkopie gemaakt (SHA-256 ' + sum + '…). Vastgelegd in je kladblok.' });
        record('snapshot:' + h.name, t, out);
        return COST.snapshot;
      },
      shutdown(args, out) {
        const h = needHost(args[0], out); if (!h) return 0;
        if (S.off[lc(h.name)]) { out.push({ cls: 'muted', text: h.name + ' staat al uit.' }); return 0; }
        const t = S.now + COST.shutdown;
        S.off[lc(h.name)] = true;
        out.push({ cls: 'ok', text: '[' + at(t) + '] ' + h.name + ' is uitgezet.' });
        if (hostHit(h) && !isDone('snapshot:' + h.name)) penalize('shutdown:' + h.name, 15, 'Vluchtig bewijs van ' + h.name + ' (geheugen, processen, netwerkverbindingen) is weg. Isoleren had de aanval net zo goed gestopt.', out);
        else if (!hostHit(h) && h.critical && !h.safeToIsolate) penalize('shutdown:' + h.name, 15, h.name + ' (' + h.role + ') ligt stil, zonder aanwijzing dat de machine besmet was.', out);
        record('shutdown:' + h.name, t, out);
        record('isolate:' + h.name, t, out);
        return COST.shutdown;
      },
      restore(args, out) {
        const h = needHost(args[0], out); if (!h) return 0;
        if (!(cfg.restore || []).map(lc).includes(lc(h.name))) { out.push({ cls: 'err', text: 'Er is geen offline back-up van ' + h.name + '.' }); return 0; }
        const t = S.now + COST.restore;
        out.push({ cls: 'ok', text: '[' + at(t) + '] ' + h.name + ': teruggezet uit de offline back-up van vannacht.' });
        record('restore:' + h.name, t, out);
        return COST.restore;
      },
      purge(args, out) {
        const m = mails[lc(args[0])]; if (!m) { out.push({ cls: 'err', text: (args[0] || '(leeg)') + ': geen mail met dit id. Typ mail.' }); return 0; }
        const t = S.now + COST.purge;
        out.push({ cls: 'ok', text: '[' + at(t) + '] ' + m.id + ' is uit ' + m.to + ' postvakken verwijderd.' });
        if (!m.malicious) penalize('purge:' + m.id, m.points || 15, m.purgeText || 'Dit was een echte mail.', out);
        record('purge:' + m.id, t, out);
        return COST.purge;
      },
      fix(args, out) {
        if (!args.length) {
          out.push({ cls: 'muted', text: 'Maatregelen (fix <naam>):' });
          (cfg.fixes || []).forEach((f) => out.push({ text: '  ' + pad(f.id, 16) + f.text + (isDone('fix:' + f.id) ? '  [gedaan]' : '') }));
          return 0;
        }
        const f = fixes[lc(args[0])]; if (!f) { out.push({ cls: 'err', text: args[0] + ': onbekende maatregel. Typ fix voor de lijst.' }); return 0; }
        if (isDone('fix:' + f.id)) { out.push({ cls: 'muted', text: 'Al gedaan.' }); return 0; }
        const t = S.now + COST.fix;
        out.push({ cls: f.good ? 'ok' : '', text: '[' + at(t) + '] ' + (f.done || 'Doorgevoerd: ' + f.text) });
        if (!f.good) penalize('fix:' + f.id, f.points || 15, f.why, out);
        record('fix:' + f.id, t, out);
        return COST.fix;
      },
      note(args, out) { if (args.length) { S.notes.push(at(S.now) + ' ' + args.join(' ')); out.push({ cls: 'muted', text: 'Genoteerd.' }); } return 0; },
      notes(args, out) { if (!S.notes.length) out.push({ cls: 'muted', text: 'Je kladblok is leeg. note <tekst> schrijft erin; snapshot legt bewijs vast.' }); S.notes.forEach((n) => out.push({ text: '- ' + n })); return 0; },
      wait(args, out) { const n = Math.max(1, Math.min(30, parseInt(args[0], 10) || 5)); out.push({ cls: 'muted', text: 'Je wacht ' + n + ' minuten.' }); return n; },
      report(args, out) { end('report', out); return 0; },
    };
    function acctAction(kind, args, out, msg) {
      const a = needAcct(args[0], out); if (!a) return 0;
      if (isDone(kind + ':' + a.name)) { out.push({ cls: 'muted', text: 'Al gedaan.' }); return 0; }
      const t = S.now + COST[kind];
      out.push({ cls: 'ok', text: '[' + at(t) + '] ' + a.name + ': ' + msg });
      if (a.critical && !acctHit(a)) penalize(kind + ':' + a.name, 15, a.lockText || a.name + ' (' + a.role + ') werkt niet meer, terwijl er geen aanwijzing was dat het account misbruikt werd.', out);
      record(kind + ':' + a.name, t, out);
      return COST[kind];
    }

    function exec(line) {
      const out = [];
      const raw = String(line == null ? '' : line).trim();
      if (!raw) return out;
      const parts = raw.split(/\s+/), verb = ALIAS[lc(parts[0])] || lc(parts[0]);
      if (S.ended && verb !== 'help' && verb !== 'notes') return [{ cls: 'muted', text: 'Het incident is afgesloten. Lees de nabespreking, of begin opnieuw.' }];
      S.history.push({ t: S.now, cmd: raw });
      const fn = Object.prototype.hasOwnProperty.call(V, verb) ? V[verb] : null;
      if (!fn) { out.push({ cls: 'err', text: parts[0] + ': onbekend commando. Typ help.' }); return out; }
      const cost = fn(parts.slice(1), out);
      if (cost && !S.ended) advance(S.now + cost, out);
      return out;
    }
    function objOk(o) {
      return (o.all || []).every((k) => isDone(k, o.before)) && (!o.any || o.any.some((k) => isDone(k, o.before)));
    }
    function result() {
      const objs = (cfg.objectives || []).map((o) => ({ text: o.text, points: o.points || 10, ok: objOk(o), required: !!o.required }));
      const max = objs.reduce((n, o) => n + o.points, 0);
      const got = objs.reduce((n, o) => n + (o.ok ? o.points : 0), 0);
      const pen = S.penalties.reduce((n, p) => n + p.points, 0);
      const score = Math.max(0, got - pen - S.damage);
      const pass = cfg.pass != null ? cfg.pass : Math.ceil(max * 0.7);
      const won = !!S.ended && S.ended !== 'schade' && objs.every((o) => !o.required || o.ok) && score >= pass;
      return { objs, max, got, pen, damage: S.damage, score, pass, won, clean: won && !pen && !S.damage, reason: S.ended,
        penalties: S.penalties.slice(), threats: (cfg.threats || []).map((t) => ({ label: t.label || t.text, state: S.fired[t.id] || 'open' })) };
    }
    return { cfg, vars, S, exec, result, objOk, now: () => at(S.now), until: at(deadline), maxDamage, solution: cfg.solution || [] };
  }

  CS.game = { create, hashStr, pickVars, fill, clock };

  // =======================================================================
  //  De weergave in de browser
  // =======================================================================
  if (!CS.registerLab || typeof document === 'undefined') return;
  CS.registerLab('incident', function (container, raw, ctx) {
    const { el, esc } = CS.util;
    const store = CS.store ? CS.store() : {};
    store.game = store.game || {};
    if (store.seed == null) store.seed = Math.floor(Math.random() * 1e9);
    const key = ctx && ctx.room ? ctx.room.id : 'gereedschap';
    const rec = store.game[key] = store.game[key] || { attempts: 0, wins: 0, best: null, variant: 0 };
    const save = () => { if (CS.saveStore) CS.saveStore(); };
    save();
    const box = el('div', { class: 'lab incident' });
    container.append(box);
    let game, openedAt = Date.now();

    const head = () => el('div', { class: 'lab-head' }, el('span', { class: 'title', html: 'Incidentconsole · <b>' + esc(raw.title || '') + '</b>' }));
    const variantName = () => (CS.game.hashStr(store.seed + ':' + key + ':' + rec.variant) % 65536).toString(16).padStart(4, '0');
    const newGame = () => { game = CS.game.create(raw, CS.game.hashStr(store.seed + ':' + key + ':' + rec.variant)); box.__game = game; };

    function briefing() {
      newGame();
      box.innerHTML = '';
      const pad0 = el('div', { class: 'lab-pad' });
      if (raw.role) pad0.append(el('p', {}, [el('strong', { text: 'Jouw rol. ' }), el('span', { text: game.cfg.role })]));
      if (raw.story) pad0.append(el('p', { text: game.cfg.story }));
      pad0.append(el('h4', { text: 'Mandaat' }));
      pad0.append(el('ul', { class: 'mandaat' }, (game.cfg.mandate || []).map((m) => el('li', { text: m }))));
      const chk = el('input', { type: 'checkbox', id: 'mandaat-' + key });
      const go = el('button', { class: 'btn primary', disabled: true, onclick: () => consoleView() }, [CS.icon('play', 16), el('span', { text: 'Begin de dienst' })]);
      chk.addEventListener('change', () => { go.disabled = !chk.checked; });
      pad0.append(el('label', { class: 'mandaat-ok', for: 'mandaat-' + key }, [chk, el('span', { text: 'Ik heb het mandaat gelezen en blijf erbinnen.' })]));
      pad0.append(el('div', { class: 'incident-start' }, [go,
        el('span', { class: 'num', text: 'Variant ' + variantName() }),
        el('button', { class: 'lnk', text: 'Andere variant', onclick: () => { rec.variant++; save(); briefing(); } })]));
      box.append(head(), pad0);
    }

    function consoleView() {
      box.innerHTML = '';
      const hud = el('div', { class: 'hud' });
      const term = el('div', { class: 'term', role: 'log', 'aria-live': 'polite' });
      const input = el('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Opdracht voor de incidentconsole' });
      const inrow = el('div', { class: 'inrow' }, [el('span', { class: 'prompt', text: 'soc> ' }), input]);
      term.append(inrow);
      const hist = []; let hi = 0;
      const print = (lines) => {
        lines.forEach((l) => inrow.before(el('div', { class: 'line' + (l.cls === 'err' ? ' err' : l.cls === 'muted' ? ' muted' : l.cls === 'alert' ? ' alertline' : l.cls === 'ok' ? ' okline' : ''), text: l.text })));
        term.scrollTop = term.scrollHeight;
      };
      const run = (cmd) => {
        print([{ cls: 'prompt', text: 'soc> ' + cmd }]);
        print(game.exec(cmd));
        paintHud();
        if (game.S.ended) debrief();
      };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { const v = input.value; input.value = ''; if (v.trim()) { hist.push(v); hi = hist.length; run(v); } }
        else if (e.key === 'ArrowUp' && hi > 0) { hi--; input.value = hist[hi]; e.preventDefault(); }
        else if (e.key === 'ArrowDown') { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; e.preventDefault(); }
      });
      term.addEventListener('click', () => input.focus());
      function paintHud() {
        hud.innerHTML = '';
        const r = game.result();
        const objs = game.cfg.objectives || [];
        hud.append(
          el('div', { class: 'cell' }, [el('span', { class: 'label', text: 'Klok' }), el('span', { class: 'num big', text: game.now() }), el('span', { class: 'found-note', text: 'dienst tot ' + game.until })]),
          el('div', { class: 'cell' }, [el('span', { class: 'label', text: 'Schade' }), el('span', { class: 'num big', text: game.S.damage + ' / ' + game.maxDamage }),
            el('div', { class: 'meter-line', role: 'meter', 'aria-valuemin': '0', 'aria-valuemax': String(game.maxDamage), 'aria-valuenow': String(game.S.damage), 'aria-label': 'Schade' }, el('i', { style: 'width:' + Math.min(100, Math.round((100 * game.S.damage) / game.maxDamage)) + '%' }))]),
          el('div', { class: 'cell' }, [el('span', { class: 'label', text: 'Doelen' }), el('span', { class: 'num big', text: objs.filter(game.objOk).length + ' / ' + objs.length }), el('span', { class: 'found-note', text: r.penalties.length ? r.penalties.length + ' ingreep met gevolgen' + (r.penalties.length > 1 ? '' : '') : 'geen misgrepen' })]),
        );
        hud.append(el('ul', { class: 'goals' }, objs.map((o) => el('li', { class: game.objOk(o) ? 'ok' : '' }, [CS.icon(game.objOk(o) ? 'check' : 'target', 15), el('span', { text: o.text + (game.objOk(o) ? ' (gehaald)' : '') })]))));
      }
      const chips = el('div', { class: 'chip-row' }, ['help', 'status', 'alerts', 'hosts', 'notes', 'wait'].map((c) => el('span', { class: 'chip', role: 'button', tabindex: '0', text: c, onclick: () => run(c), onkeydown: (e) => { if (e.key === 'Enter') run(c); } })));
      const finish = el('button', { class: 'btn', onclick: () => { if (confirm('Het incident afsluiten? Wat je nog niet gestopt hebt, gebeurt daarna alsnog.')) run('report'); } }, [CS.icon('flag', 16), el('span', { text: 'Incident afsluiten' })]);
      const walk = el('div', { class: 'walk' });
      box.append(head(), hud, el('div', { class: 'lab-body' }, term), el('div', { class: 'lab-pad incident-foot' }, [chips, finish, walk]));
      paintWalk(walk);
      print([{ cls: 'muted', text: game.cfg.motd || 'Typ help voor de opdrachten. Begin met alerts.' }]);
      paintHud();
      input.focus({ preventScroll: true });
    }

    // De walkthrough komt vrij na een eerste poging, of na een kwartier proberen.
    function paintWalk(node) {
      node.innerHTML = '';
      const open = rec.attempts > 0 || Date.now() - openedAt > 15 * 60000;
      if (!open) { node.append(el('p', { class: 'found-note', text: 'De walkthrough komt vrij na je eerste poging, of na een kwartier proberen.' })); setTimeout(() => { if (document.body.contains(node)) paintWalk(node); }, 60000); return; }
      node.append(el('details', {}, [el('summary', { text: 'Walkthrough (voor deze variant)' }),
        el('ol', { class: 'walklist' }, game.solution.map((c, i) => el('li', {}, [el('code', { text: c }), (game.cfg.solutionNotes || [])[i] ? el('span', { text: ' ' + game.cfg.solutionNotes[i] }) : null])))]));
    }

    function debrief() {
      const r = game.result();
      rec.attempts++;
      if (r.won) rec.wins++;
      if (rec.best == null || r.score > rec.best) rec.best = r.score;
      if (r.clean) rec.clean = true;
      save();
      if (CS.checkBadges) CS.checkBadges();
      const d = el('div', { class: 'lab-pad debrief' + (r.won ? ' won' : '') });
      d.append(el('span', { class: 'stamp', text: 'Nabespreking' }));
      d.append(el('h3', {}, [CS.icon(r.won ? 'check' : 'cross', 18), el('span', { text: r.won ? 'Incident beheerst' : 'Nog niet beheerst' })]));
      d.append(el('p', { class: 'num', text: 'Score ' + r.score + ' van ' + r.max + ' (nodig: ' + r.pass + ') · doelen ' + r.got + ' · aftrek voor ingrepen ' + r.pen + ' · schade ' + r.damage }));
      const li = (ok, text) => el('li', { class: ok ? 'ok' : 'no' }, [CS.icon(ok ? 'check' : 'cross', 15), el('span', { text })]);
      d.append(el('h4', { text: 'Je doelen' }), el('ul', { class: 'goals' }, r.objs.map((o) => li(o.ok, o.text + (o.ok ? ' (gehaald)' : ' (niet gehaald)') + (o.required ? ' · verplicht' : '')))));
      d.append(el('h4', { text: 'Wat de aanvaller probeerde' }), el('ul', { class: 'goals' }, r.threats.map((t) => li(t.state !== 'hit', t.label + (t.state === 'hit' ? ' (gebeurd)' : ' (gestopt)')))));
      if (r.penalties.length) d.append(el('h4', { text: 'Ingrepen met gevolgen' }), el('ul', { class: 'goals' }, r.penalties.map((p) => li(false, p.text + ' (−' + p.points + ')'))));
      if (game.cfg.debrief) d.append(el('div', { class: 'body', html: game.cfg.debrief }));
      if (game.cfg.ask && game.cfg.ask.length) {
        d.append(el('h4', { text: 'Leg vast wat je vond' }));
        game.cfg.ask.forEach((q) => {
          const inp = el('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', 'aria-label': q.q });
          const fb = el('div', { class: 'feedback' });
          const chk = () => { const ok = (q.answer || []).some((a) => lc(a) === lc(inp.value)); fb.className = 'feedback show ' + (ok ? 'ok' : 'no'); fb.textContent = ok ? 'Klopt.' : 'Nog niet; kijk terug in de console.'; if (ok) inp.disabled = true; };
          inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') chk(); });
          d.append(el('div', { class: 'askrow' }, [el('label', { text: q.q }), el('div', { class: 'ans-row' }, [inp, el('button', { class: 'btn small', text: 'Controleer', onclick: chk })]), fb]));
        });
      }
      if (r.won && game.cfg.flag) d.append(el('p', { class: 'flagline' }, [el('span', { text: 'Vlag: ' }), el('code', { text: game.cfg.flag })]));
      else if (!r.won) d.append(el('p', { class: 'found-note', text: 'Haal ' + r.pass + ' punten zonder de verplichte doelen te missen, dan krijg je de vlag. De walkthrough staat nu open.' }));
      d.append(el('div', { class: 'incident-start' }, [
        el('button', { class: 'btn primary', text: 'Opnieuw, zelfde variant', onclick: () => briefing() }),
        el('button', { class: 'btn', text: 'Andere variant', onclick: () => { rec.variant++; save(); briefing(); } }),
      ]));
      box.append(d);
      const walk = box.querySelector('.walk'); if (walk) paintWalk(walk);
      if (r.won && CS.triumph) CS.triumph(d, 'INCIDENT BEHEERST', r.score);
      d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    briefing();
  });
})();
