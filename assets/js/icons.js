/* ======================================================================
   NineMinds Cyber Dojo — iconen
   Getekend in SVG op één lijndikte met ronde uiteinden, zoals de NineMinds-
   huisstijl voorschrijft: nooit emoji, nooit een systeemglyph, nooit een
   icoonfont. Kleur via currentColor. Gebruik: CS.icon('naam', 18).
   ====================================================================== */
(function () {
  'use strict';
  const CS = window.CS = window.CS || {};

  // Elk icoon is de inhoud van een 24×24-viewBox.
  const PATHS = {
    // navigatie en bediening
    paths: '<path d="M5 19V9m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v4M5 9c0 4 14 2 14 6"/>',
    practice: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12h.01"/>',
    tools: '<path d="M14.5 6.5a3.5 3.5 0 0 0-4.6 4.2L4 16.6V20h3.4l5.9-5.9a3.5 3.5 0 0 0 4.2-4.6l-2.2 2.2-2.4-.6-.6-2.4Z"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.6-4.6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1"/>',
    moon: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrowRight: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    arrowLeft: '<path d="M19 12H5m5-5-5 5 5 5"/>',
    chevron: '<path d="m10 6 6 6-6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    cross: '<path d="M7 7l10 10M17 7 7 17"/>',
    lock: '<rect x="5" y="10.5" width="14" height="9.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
    question: '<circle cx="12" cy="12" r="8"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.7-.9 1.3v.6M12 16.5h.01"/>',
    flag: '<path d="M6 21V4m0 0h10.5l-2 4 2 4H6"/>',
    hint: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"/>',
    book: '<path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h9"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    seal: '<circle cx="12" cy="10" r="6"/><path d="m8.5 15-1.5 6 5-2.5 5 2.5-1.5-6"/><path d="m9.5 10 1.8 1.8 3.2-3.3"/>',
    cards: '<rect x="4" y="7" width="12" height="13"/><path d="M8 7V4h12v13h-4"/>',
    exam: '<path d="M8 4h8v3H8zM6 5.5H5V21h14V5.5h-1"/><path d="m8.5 13.5 2 2 4-4.5"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="14.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M12 13v3.5"/>',
    chart: '<path d="M4 20h16M7 20v-6M12 20V8M17 20v-9"/>',
    user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/>',
    target: '<circle cx="12" cy="12" r="8"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/>',
    play: '<path d="M8 5.5v13l10-6.5-10-6.5Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',

    // de negen leerpaden
    'path-fundamenten': '<path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z"/><path d="m4 12.5 8 4.5 8-4.5M4 16.5 12 21l8-4.5"/>',
    'path-security-kern': '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-3 3 2.5 2.5M14 9l2 2"/>',
    'path-offensief': '<circle cx="12" cy="12" r="7"/><path d="M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5"/>',
    'path-defensief': '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    'path-forensie': '<circle cx="10.5" cy="10.5" r="6"/><path d="m20 20-5.2-5.2M8 8.8c.8-1.3 2.6-1.7 3.9-.9M7.8 12.2c.6 1.5 2.4 2.3 4 1.7"/>',
    'path-intelligence': '<circle cx="6" cy="7" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="13" r="2.2"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="18" r="2"/><path d="m7.6 8.3 3 3.2M16.6 7.4l-3.2 3.9M10.8 14.8l-2.6 2.6M13.6 14.6l3 2.2"/>',
    'path-datastromen': '<path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 16c3-3 6 3 9 0s6 3 9 0"/><path d="m17 11 2-3M7 13l-2 3"/>',
    'path-puzzels': '<path d="M4 4h7v3a2 2 0 1 0 4 0V4h5v7h-3a2 2 0 1 0 0 4h3v5h-7v-3a2 2 0 1 0-4 0v3H4v-7h3a2 2 0 1 0 0-4H4V4Z"/>',
    'path-eindopdracht': '<path d="M6 21V4m0 0h12v8H6"/><path d="M10 4v8M14 4v8M6 8h12"/>',
  };

  /** Een icoon als DOM-element. `label` maakt het betekenisvol voor schermlezers. */
  CS.icon = function icon(name, size, label) {
    const body = PATHS[name] || PATHS.question;
    const span = document.createElement('span');
    span.className = 'ic ic-' + name;
    span.innerHTML = '<svg viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18) + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"' +
      (label ? ' role="img" aria-label="' + label + '"' : ' aria-hidden="true"') + '>' + body + '</svg>';
    return span;
  };
  CS.icon.names = Object.keys(PATHS);
})();
