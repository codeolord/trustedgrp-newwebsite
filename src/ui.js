// Shared UI building blocks and product mockups.
const { icon, logoMark } = require('./icons');
const site = require('./site');

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const join = (arr, fn) => arr.map(fn).join('');

let uid = 0;
const nextId = (p) => `${p}${++uid}`;

const AV_COLORS = ['#0b65ad', '#f07b2d', '#12a150', '#7a4ee0', '#d9468f', '#0e9aa7', '#c98a0b', '#4b5563'];
const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('');

/* --------------------------------------------------------------------------
   Primitives
   -------------------------------------------------------------------------- */
function btn(label, href, variant = 'primary', opts = {}) {
  const size = opts.size ? ` btn--${opts.size}` : '';
  const cls = `btn btn--${variant}${size}${opts.block ? ' btn--block' : ''}${opts.cls ? ' ' + opts.cls : ''}`;
  const ic = opts.icon ? icon(opts.icon, 18) : '';
  const attrs = opts.attrs || '';
  if (!href) return `<button type="${opts.type || 'button'}" class="${cls}" ${attrs}>${opts.iconLeft ? ic : ''}${esc(label)}${opts.iconLeft ? '' : ic}</button>`;
  return `<a class="${cls}" href="${href}" ${attrs}>${opts.iconLeft ? ic : ''}${esc(label)}${opts.iconLeft ? '' : ic}</a>`;
}

const linkArrow = (label, href) => `<a class="link-arrow" href="${href}">${esc(label)}${icon('arrowRight', 16)}</a>`;

function sectionHead({ eyebrow, title, lead, align = 'center', level = 2, extra = '' }) {
  const cls = align === 'left' ? 'section-head section-head--left' : 'section-head';
  return `<div class="${cls}">
    ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
    <h${level} class="h2">${title}</h${level}>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div>`;
}

const checklist = (items, cls = '') => `<ul class="checklist ${cls}">${join(items, (i) => `<li>${icon('check', 18)}<span>${i}</span></li>`)}</ul>`;

function breadcrumb(items) {
  const parts = items.map((it, i) => {
    if (i === items.length - 1) return `<span aria-current="page">${esc(it.label)}</span>`;
    return `${it.href ? `<a href="${it.href}">${esc(it.label)}</a>` : `<span>${esc(it.label)}</span>`}${icon('chevronRight', 14)}`;
  });
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join('')}</nav>`;
}

function avatar(name, i = 0, cls = 'mini-av') {
  return `<span class="${cls}" style="background:${AV_COLORS[i % AV_COLORS.length]}">${esc(initials(name))}</span>`;
}

/* --------------------------------------------------------------------------
   Certificate / badge / document SVG generators
   -------------------------------------------------------------------------- */
const CERT_DEFAULTS = {
  style: 'classic',
  accent: '#0b65ad',
  accent2: '#f5b84a',
  title: 'Certificate',
  subtitle: 'of Completion',
  presented: 'This certificate is proudly presented to',
  name: 'Chinedu Okafor',
  line: 'for successfully completing the course',
  course: 'Advanced Project Management',
  date: 'May 14, 2026',
  org: 'Northwind Academy',
  paper: '#fffdf9',
};

function seal(cx, cy, r, color, ring = '#fff') {
  const pts = [];
  for (let i = 0; i < 24; i++) {
    const a = (Math.PI * 2 * i) / 24;
    const rr = i % 2 ? r : r * 0.86;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${color}"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="none" stroke="${ring}" stroke-width="1" opacity=".8"/>
    <path d="M${cx - r * 0.25} ${cy}l${r * 0.18} ${r * 0.2} ${r * 0.34}-${r * 0.38}" fill="none" stroke="${ring}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
}

const sig = (x, y, color = '#2a2a2a') => `<path d="M${x} ${y}c6-10 10-12 12-6s-4 10 2 6 8-12 12-8-2 8 4 6 10-6 14-3" fill="none" stroke="${color}" stroke-width="1.1" stroke-linecap="round"/>`;

function qr(x, y, s, color = '#1f1f1f') {
  const cells = [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1];
  const c = s / 6;
  let out = `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#fff"/>`;
  cells.forEach((on, i) => {
    if (on) out += `<rect x="${(x + (i % 6) * c).toFixed(1)}" y="${(y + Math.floor(i / 6) * c).toFixed(1)}" width="${c.toFixed(1)}" height="${c.toFixed(1)}" fill="${color}"/>`;
  });
  return out;
}

function certSVG(opts = {}) {
  const o = { ...CERT_DEFAULTS, ...opts };
  const W = 420, H = 297;
  // Tag text nodes with the field they show so the client-side generator can rewrite them.
  const FIELDS = ['name', 'course', 'title', 'subtitle', 'line', 'presented', 'date', 'org'];
  const fieldAttr = (txt) => {
    if (txt === `${o.title} ${o.subtitle}`.toUpperCase()) return ' data-f="titlefull"';
    const k = FIELDS.find((f) => o[f] === txt || String(o[f]).toUpperCase() === txt);
    if (!k) return '';
    return ` data-f="${k}"${o[k] !== txt ? ' data-case="upper"' : ''}`;
  };
  const t = (x, y, txt, a = '') => `<text x="${x}" y="${y}" ${a}${fieldAttr(txt)}>${esc(txt)}</text>`;
  const sans = `font-family="Onest, Arial, sans-serif"`;
  const serif = `font-family="Georgia, 'Times New Roman', serif"`;
  let body = '';

  switch (o.style) {
    case 'modern':
      body = `<rect width="${W}" height="${H}" fill="#fff"/>
        <rect width="112" height="${H}" fill="${o.accent}"/>
        <circle cx="20" cy="250" r="70" fill="${o.accent2}" opacity=".9"/>
        <circle cx="96" cy="40" r="34" fill="#fff" opacity=".14"/>
        <rect x="24" y="118" width="64" height="64" rx="14" fill="#fff" opacity=".16"/>
        ${t(24, 34, o.org.toUpperCase(), `${sans} font-size="7.5" font-weight="700" letter-spacing="1.2" fill="#fff"`)}
        ${t(140, 74, o.title, `${sans} font-size="30" font-weight="700" fill="#141414" letter-spacing="-.6"`)}
        ${t(141, 92, o.subtitle.toUpperCase(), `${sans} font-size="9" font-weight="600" letter-spacing="2.4" fill="${o.accent}"`)}
        ${t(141, 128, 'Awarded to', `${sans} font-size="8.5" fill="#7a7672"`)}
        ${t(140, 158, o.name, `${sans} font-size="25" font-weight="600" fill="#141414" letter-spacing="-.4"`)}
        <rect x="141" y="168" width="40" height="2.5" rx="1" fill="${o.accent}"/>
        ${t(141, 190, o.line, `${sans} font-size="8" fill="#6f6b67"`)}
        ${t(141, 204, o.course, `${sans} font-size="9.5" font-weight="600" fill="#2a2a2a"`)}
        ${sig(150, 246)}
        <line x1="141" y1="256" x2="232" y2="256" stroke="#d8d4cf" stroke-width=".8"/>
        ${t(141, 267, 'Program Director', `${sans} font-size="7" fill="#8a8580"`)}
        ${t(260, 250, o.date, `${sans} font-size="8.5" font-weight="500" fill="#2a2a2a"`)}
        <line x1="260" y1="256" x2="340" y2="256" stroke="#d8d4cf" stroke-width=".8"/>
        ${t(260, 267, 'Date issued', `${sans} font-size="7" fill="#8a8580"`)}
        ${qr(362, 232, 34)}`;
      break;

    case 'geo':
      body = `<rect width="${W}" height="${H}" fill="#fff"/>
        <polygon points="0,0 150,0 0,110" fill="${o.accent}"/>
        <polygon points="0,0 80,0 0,170" fill="${o.accent2}" opacity=".85"/>
        <polygon points="${W},${H} ${W - 150},${H} ${W},${H - 110}" fill="${o.accent}"/>
        <polygon points="${W},${H} ${W - 80},${H} ${W},${H - 170}" fill="${o.accent2}" opacity=".85"/>
        ${t(W / 2, 70, o.title.toUpperCase(), `${sans} font-size="24" font-weight="700" letter-spacing="5" text-anchor="middle" fill="#161616"`)}
        ${t(W / 2, 88, o.subtitle.toUpperCase(), `${sans} font-size="9" font-weight="600" letter-spacing="3" text-anchor="middle" fill="${o.accent}"`)}
        ${t(W / 2, 118, o.presented, `${sans} font-size="8" text-anchor="middle" fill="#7a7672"`)}
        ${t(W / 2, 152, o.name, `${serif} font-size="28" font-style="italic" text-anchor="middle" fill="#161616"`)}
        <line x1="120" y1="162" x2="300" y2="162" stroke="${o.accent}" stroke-width=".8"/>
        ${t(W / 2, 182, o.line, `${sans} font-size="8" text-anchor="middle" fill="#6f6b67"`)}
        ${t(W / 2, 197, o.course, `${sans} font-size="10" font-weight="600" text-anchor="middle" fill="#2a2a2a"`)}
        ${seal(W / 2, 240, 20, o.accent)}
        ${t(110, 246, o.date, `${sans} font-size="8" text-anchor="middle" fill="#2a2a2a"`)}
        <line x1="70" y1="252" x2="150" y2="252" stroke="#cfcac4" stroke-width=".8"/>
        ${t(110, 263, 'DATE', `${sans} font-size="6.5" letter-spacing="1.5" text-anchor="middle" fill="#8a8580"`)}
        ${sig(282, 244)}
        <line x1="270" y1="252" x2="350" y2="252" stroke="#cfcac4" stroke-width=".8"/>
        ${t(310, 263, 'SIGNATURE', `${sans} font-size="6.5" letter-spacing="1.5" text-anchor="middle" fill="#8a8580"`)}`;
      break;

    case 'ribbon':
      body = `<rect width="${W}" height="${H}" fill="${o.paper}"/>
        <rect width="${W}" height="78" fill="${o.accent}"/>
        <rect y="78" width="${W}" height="5" fill="${o.accent2}"/>
        ${t(36, 38, o.title.toUpperCase(), `${sans} font-size="20" font-weight="700" letter-spacing="3" fill="#fff"`)}
        ${t(36, 56, o.subtitle.toUpperCase(), `${sans} font-size="8.5" font-weight="500" letter-spacing="2.5" fill="#fff" opacity=".8"`)}
        <path d="M340 66l-10 52 18-10 12 14 6-50z" fill="${o.accent2}"/>
        <path d="M372 66l10 52-18-10-12 14-6-50z" fill="${o.accent2}" opacity=".8"/>
        ${seal(356, 56, 28, o.accent2, '#fff')}
        ${t(36, 126, o.presented, `${sans} font-size="8.5" fill="#7a7672"`)}
        ${t(36, 160, o.name, `${serif} font-size="30" fill="#161616"`)}
        ${t(36, 186, o.line, `${sans} font-size="8.5" fill="#6f6b67"`)}
        ${t(36, 201, o.course, `${sans} font-size="10.5" font-weight="600" fill="#2a2a2a"`)}
        ${sig(46, 244)}
        <line x1="36" y1="254" x2="136" y2="254" stroke="#cfcac4" stroke-width=".8"/>
        ${t(36, 266, o.org, `${sans} font-size="7.5" fill="#8a8580"`)}
        ${t(170, 248, o.date, `${sans} font-size="8.5" fill="#2a2a2a"`)}
        <line x1="170" y1="254" x2="250" y2="254" stroke="#cfcac4" stroke-width=".8"/>
        ${t(170, 266, 'Date', `${sans} font-size="7.5" fill="#8a8580"`)}`;
      break;

    case 'minimal':
      body = `<rect width="${W}" height="${H}" fill="#fff"/>
        <rect x="14" y="14" width="${W - 28}" height="${H - 28}" fill="none" stroke="#e4e0db" stroke-width=".8"/>
        <circle cx="48" cy="48" r="11" fill="${o.accent}"/>
        <path d="M43 48l3.5 3.5 6.5-7" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        ${t(66, 51, o.org, `${sans} font-size="9" font-weight="600" fill="#2a2a2a"`)}
        <rect x="38" y="96" width="3" height="104" fill="${o.accent}"/>
        ${t(54, 110, `${o.title} ${o.subtitle}`.toUpperCase(), `${sans} font-size="8.5" font-weight="600" letter-spacing="2.2" fill="${o.accent}"`)}
        ${t(53, 152, o.name, `${sans} font-size="34" font-weight="500" letter-spacing="-1" fill="#141414"`)}
        ${t(54, 178, o.line, `${sans} font-size="8.5" fill="#6f6b67"`)}
        ${t(54, 194, o.course, `${sans} font-size="11" font-weight="600" fill="#2a2a2a"`)}
        ${t(54, 252, 'Issued', `${sans} font-size="7" fill="#8a8580"`)}
        ${t(54, 264, o.date, `${sans} font-size="8.5" fill="#2a2a2a"`)}
        ${t(150, 252, 'Credential ID', `${sans} font-size="7" fill="#8a8580"`)}
        ${t(150, 264, 'NW-48C1-92FA', `${sans} font-size="8.5" fill="#2a2a2a"`)}
        ${sig(300, 254)}
        <line x1="290" y1="262" x2="380" y2="262" stroke="#e0dcd7" stroke-width=".8"/>`;
      break;

    case 'wave':
      body = `<rect width="${W}" height="${H}" fill="#fff"/>
        <path d="M0 ${H - 62}c70-30 140 30 210 6s140-38 210-10V${H}H0z" fill="${o.accent2}" opacity=".75"/>
        <path d="M0 ${H - 40}c80-24 150 26 220 4s130-30 200-6V${H}H0z" fill="${o.accent}"/>
        ${join([0, 1, 2, 3, 4], (r) => join([0, 1, 2, 3, 4, 5], (c) => `<circle cx="${340 + c * 10}" cy="${24 + r * 10}" r="1.6" fill="${o.accent}" opacity=".35"/>`))}
        ${t(W / 2, 62, o.title, `${serif} font-size="30" text-anchor="middle" fill="#161616"`)}
        ${t(W / 2, 80, o.subtitle.toUpperCase(), `${sans} font-size="8.5" font-weight="600" letter-spacing="3" text-anchor="middle" fill="${o.accent}"`)}
        ${t(W / 2, 110, o.presented, `${sans} font-size="8" text-anchor="middle" fill="#7a7672"`)}
        ${t(W / 2, 144, o.name, `${sans} font-size="26" font-weight="600" text-anchor="middle" letter-spacing="-.4" fill="#141414"`)}
        ${t(W / 2, 168, o.line, `${sans} font-size="8" text-anchor="middle" fill="#6f6b67"`)}
        ${t(W / 2, 183, o.course, `${sans} font-size="10" font-weight="600" text-anchor="middle" fill="#2a2a2a"`)}
        ${sig(98, 214)}
        <line x1="80" y1="222" x2="170" y2="222" stroke="#cfcac4" stroke-width=".8"/>
        ${t(125, 233, 'Instructor', `${sans} font-size="7" text-anchor="middle" fill="#8a8580"`)}
        ${t(295, 217, o.date, `${sans} font-size="8.5" text-anchor="middle" fill="#2a2a2a"`)}
        <line x1="250" y1="222" x2="340" y2="222" stroke="#cfcac4" stroke-width=".8"/>
        ${t(295, 233, 'Date', `${sans} font-size="7" text-anchor="middle" fill="#8a8580"`)}`;
      break;

    default: // classic
      body = `<rect width="${W}" height="${H}" fill="${o.paper}"/>
        <rect x="10" y="10" width="${W - 20}" height="${H - 20}" fill="none" stroke="${o.accent}" stroke-width="3"/>
        <rect x="17" y="17" width="${W - 34}" height="${H - 34}" fill="none" stroke="${o.accent}" stroke-width=".7"/>
        ${join([[17, 17], [W - 17, 17], [17, H - 17], [W - 17, H - 17]], ([x, y]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" transform="rotate(45 ${x} ${y})" fill="${o.accent2}"/>`)}
        ${t(W / 2, 66, o.title.toUpperCase(), `${serif} font-size="26" letter-spacing="6" text-anchor="middle" fill="${o.accent}"`)}
        ${t(W / 2, 84, o.subtitle.toUpperCase(), `${serif} font-size="9" letter-spacing="4" text-anchor="middle" fill="#6f6b67"`)}
        ${t(W / 2, 112, o.presented, `${serif} font-size="8.5" font-style="italic" text-anchor="middle" fill="#7a7672"`)}
        ${t(W / 2, 148, o.name, `${serif} font-size="30" font-style="italic" text-anchor="middle" fill="#1d1d1d"`)}
        <line x1="115" y1="158" x2="305" y2="158" stroke="${o.accent2}" stroke-width="1"/>
        ${t(W / 2, 178, o.line, `${serif} font-size="8.5" text-anchor="middle" fill="#6f6b67"`)}
        ${t(W / 2, 194, o.course, `${serif} font-size="11" font-weight="700" text-anchor="middle" fill="#2a2a2a"`)}
        ${seal(W / 2, 238, 22, o.accent2, '#fff')}
        ${t(105, 244, o.date, `${serif} font-size="8.5" text-anchor="middle" fill="#2a2a2a"`)}
        <line x1="65" y1="250" x2="145" y2="250" stroke="#bdb7b0" stroke-width=".8"/>
        ${t(105, 261, 'Date', `${serif} font-size="7.5" text-anchor="middle" fill="#8a8580"`)}
        ${sig(285, 242)}
        <line x1="275" y1="250" x2="355" y2="250" stroke="#bdb7b0" stroke-width=".8"/>
        ${t(315, 261, 'Signature', `${serif} font-size="7.5" text-anchor="middle" fill="#8a8580"`)}`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(o.title + ' ' + o.subtitle)} preview">${body}</svg>`;
}

const BADGE_GLYPHS = {
  star: '<path d="M0 -15l4.4 9 9.9 1.4-7.2 7 1.7 9.9L0 8.6l-8.8 4.7 1.7-9.9-7.2-7 9.9-1.4z" fill="#fff"/>',
  check: '<path d="M-11 0l7 7 15-15" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  book: '<path d="M-13 -9h10a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3h-10zM13 -9H3a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h10z" fill="#fff"/>',
  bolt: '<path d="M3 -16l-14 19h10l-3 13 14-19H0z" fill="#fff"/>',
  heart: '<path d="M0 12s-14-8-14-17a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 9-14 17-14 17z" fill="#fff"/>',
  code: '<path d="M-6 -9l-9 9 9 9M6 -9l9 9-9 9" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
  leaf: '<path d="M-12 12C-12 -4 0 -14 14 -14 14 2 4 12-12 12zM-12 12l12-12" fill="#fff" stroke="#fff" stroke-width="1"/>',
  shield: '<path d="M0 -15l12 5v7c0 9-6 14-12 16-6-2-12-7-12-16v-7z" fill="#fff"/>',
};

function badgeSVG(opts = {}) {
  const o = { shape: 'hex', accent: '#0b65ad', accent2: '#59a2d8', glyph: 'star', label: 'EXPERT', top: '', ...opts };
  const id = nextId('bg');
  const grad = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${o.accent2}"/><stop offset="1" stop-color="${o.accent}"/></linearGradient></defs>`;
  let shape = '';
  if (o.shape === 'hex') {
    shape = `<polygon points="60,6 108,33 108,91 60,118 12,91 12,33" fill="${o.accent}"/>
      <polygon points="60,16 99,38 99,86 60,108 21,86 21,38" fill="url(#${id})" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`;
  } else if (o.shape === 'shield') {
    shape = `<path d="M60 6l50 16v34c0 32-22 54-50 62C32 110 10 88 10 56V22z" fill="${o.accent}"/>
      <path d="M60 16l40 13v27c0 26-18 44-40 51-22-7-40-25-40-51V29z" fill="url(#${id})" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`;
  } else if (o.shape === 'star') {
    const pts = [];
    for (let i = 0; i < 16; i++) { const a = (Math.PI * 2 * i) / 16 - Math.PI / 2; const r = i % 2 ? 46 : 54; pts.push(`${(60 + Math.cos(a) * r).toFixed(1)},${(60 + Math.sin(a) * r).toFixed(1)}`); }
    shape = `<polygon points="${pts.join(' ')}" fill="${o.accent}"/><circle cx="60" cy="60" r="38" fill="url(#${id})" stroke="#fff" stroke-opacity=".6" stroke-width="1.5"/>`;
  } else {
    shape = `<path d="M38 96l-8 38 14-8 10 12 6-38zM82 96l8 38-14-8-10 12-6-38z" fill="${o.accent}" opacity=".85"/>
      <circle cx="60" cy="60" r="52" fill="${o.accent}"/><circle cx="60" cy="60" r="43" fill="url(#${id})"/>
      <circle cx="60" cy="60" r="47" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1" stroke-dasharray="3 3"/>`;
  }
  const ribbonY = o.shape === 'circle' ? 78 : 80;
  const ribbon = o.label ? `<path d="M8 ${ribbonY}h104l-7 9 7 9H8l7-9z" fill="#fff"/><path d="M14 ${ribbonY + 2}h92l-5.5 7 5.5 7H14l5.5-7z" fill="${o.accent}"/>
    <text x="60" y="${ribbonY + 12.5}" text-anchor="middle" font-family="Onest, Arial, sans-serif" font-size="9" font-weight="700" letter-spacing="1.6" fill="#fff">${esc(o.label)}</text>` : '';
  const topText = o.top ? `<text x="60" y="${o.shape === 'shield' ? 40 : 38}" text-anchor="middle" font-family="Onest, Arial, sans-serif" font-size="7" font-weight="700" letter-spacing="1.4" fill="#fff" opacity=".9">${esc(o.top)}</text>` : '';
  return `<svg viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(o.label || 'Badge')} badge">${grad}${shape}${topText}<g transform="translate(60 ${o.label ? 58 : 62})">${BADGE_GLYPHS[o.glyph] || BADGE_GLYPHS.star}</g>${ribbon}</svg>`;
}

function docSVG(opts = {}) {
  const o = { kind: 'transcript', accent: '#0b65ad', title: 'Academic Transcript', org: 'Meridian University', name: 'Chinedu Okafor', ...opts };
  const W = 210, H = 297;
  const sans = `font-family="Onest, Arial, sans-serif"`;
  const serif = `font-family="Georgia, serif"`;
  const lines = (y0, n, w = 150, gap = 9, x = 30) => join(Array.from({ length: n }), (_, i) => `<rect x="${x}" y="${y0 + i * gap}" width="${i % 3 === 2 ? w * 0.7 : w}" height="3" rx="1.5" fill="#e7e3de"/>`);
  let body = '';
  if (o.kind === 'transcript') {
    body = `<rect width="${W}" height="${H}" fill="#fff"/><rect width="${W}" height="8" fill="${o.accent}"/>
      <circle cx="38" cy="38" r="10" fill="${o.accent}"/>
      <text x="54" y="36" ${sans} font-size="8" font-weight="700" fill="#1d1d1d">${esc(o.org)}</text>
      <text x="54" y="46" ${sans} font-size="6" fill="#8a8580">Office of the Registrar</text>
      <text x="30" y="76" ${sans} font-size="13" font-weight="700" fill="#141414">${esc(o.title)}</text>
      <text x="30" y="90" ${sans} font-size="7" fill="#6f6b67">Student: ${esc(o.name)}  ·  ID 2024-0193</text>
      <rect x="30" y="102" width="150" height="14" fill="#f5f3f2"/>
      <text x="34" y="111.5" ${sans} font-size="6" font-weight="700" fill="#6f6b67">COURSE</text><text x="140" y="111.5" ${sans} font-size="6" font-weight="700" fill="#6f6b67">CREDITS</text><text x="166" y="111.5" ${sans} font-size="6" font-weight="700" fill="#6f6b67">GRADE</text>
      ${join(Array.from({ length: 9 }), (_, i) => `<rect x="34" y="${124 + i * 13}" width="${70 + (i * 13) % 30}" height="3" rx="1.5" fill="#e7e3de"/><text x="146" y="${127 + i * 13}" ${sans} font-size="6" fill="#2a2a2a">${(i % 3) + 2}</text><text x="170" y="${127 + i * 13}" ${sans} font-size="6" font-weight="600" fill="${o.accent}">${['A', 'A-', 'B+', 'A', 'B', 'A'][i % 6]}</text><line x1="30" y1="${132 + i * 13}" x2="180" y2="${132 + i * 13}" stroke="#f0eeeb" stroke-width=".6"/>`)}
      <text x="30" y="262" ${sans} font-size="7" font-weight="700" fill="#141414">Cumulative GPA 3.82</text>
      ${qr(150, 244, 28)}`;
  } else if (o.kind === 'letter') {
    body = `<rect width="${W}" height="${H}" fill="#fff"/>
      <rect x="0" y="0" width="${W}" height="56" fill="${o.accent}" opacity=".08"/>
      <circle cx="38" cy="28" r="10" fill="${o.accent}"/><text x="54" y="31" ${sans} font-size="8.5" font-weight="700" fill="#1d1d1d">${esc(o.org)}</text>
      <text x="30" y="84" ${sans} font-size="12" font-weight="700" fill="#141414">${esc(o.title)}</text>
      <text x="30" y="98" ${sans} font-size="6.5" fill="#8a8580">To whom it may concern</text>
      ${lines(112, 6)}${lines(176, 5)}${lines(230, 2, 90)}
      <path d="M32 266c6-10 10-12 12-6s-4 10 2 6 8-12 12-8" fill="none" stroke="#2a2a2a" stroke-width="1"/>
      <text x="30" y="282" ${sans} font-size="6.5" fill="#6f6b67">Head of Learning, ${esc(o.org)}</text>`;
  } else if (o.kind === 'card') {
    body = `<rect width="${W}" height="${H}" fill="#f5f3f2"/>
      <g transform="translate(18 80)"><rect width="174" height="110" rx="10" fill="${o.accent}"/>
      <circle cx="150" cy="18" r="40" fill="#fff" opacity=".1"/>
      <text x="14" y="24" ${sans} font-size="7.5" font-weight="700" letter-spacing="1" fill="#fff">${esc(o.org.toUpperCase())}</text>
      <rect x="14" y="40" width="38" height="46" rx="5" fill="#fff" opacity=".9"/><circle cx="33" cy="58" r="8" fill="${o.accent}" opacity=".35"/><path d="M21 80a12 10 0 0 1 24 0" fill="${o.accent}" opacity=".35"/>
      <text x="62" y="50" ${sans} font-size="9" font-weight="700" fill="#fff">${esc(o.name)}</text>
      <text x="62" y="62" ${sans} font-size="6" fill="#fff" opacity=".8">${esc(o.title)}</text>
      <text x="62" y="80" ${sans} font-size="5.5" fill="#fff" opacity=".8">VALID THRU 05/2028</text>
      ${qr(136, 64, 26)}</g>`;
  } else { // diploma (portrait)
    body = `<rect width="${W}" height="${H}" fill="#fffdf8"/>
      <rect x="10" y="10" width="${W - 20}" height="${H - 20}" fill="none" stroke="${o.accent}" stroke-width="2.4"/>
      <rect x="16" y="16" width="${W - 32}" height="${H - 32}" fill="none" stroke="${o.accent}" stroke-width=".6"/>
      ${seal(W / 2, 58, 18, o.accent, '#fff')}
      <text x="${W / 2}" y="104" ${serif} font-size="9" letter-spacing="2" text-anchor="middle" fill="#6f6b67">${esc(o.org.toUpperCase())}</text>
      <text x="${W / 2}" y="130" ${serif} font-size="18" text-anchor="middle" fill="${o.accent}">${esc(o.title)}</text>
      <text x="${W / 2}" y="152" ${serif} font-size="6.5" font-style="italic" text-anchor="middle" fill="#7a7672">is hereby conferred upon</text>
      <text x="${W / 2}" y="178" ${serif} font-size="17" font-style="italic" text-anchor="middle" fill="#1d1d1d">${esc(o.name)}</text>
      ${lines(196, 3, 120, 8, 45)}
      <path d="M40 252c6-10 10-12 12-6s-4 10 2 6 8-12 12-8" fill="none" stroke="#2a2a2a" stroke-width="1"/>
      <line x1="34" y1="260" x2="94" y2="260" stroke="#bdb7b0" stroke-width=".6"/>
      <line x1="116" y1="260" x2="176" y2="260" stroke="#bdb7b0" stroke-width=".6"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(o.title)} preview">${body}</svg>`;
}

/* --------------------------------------------------------------------------
   Product mockups
   -------------------------------------------------------------------------- */
function windowFrame(inner, url = 'app.' + site.domain, bodyCls = 'window-body') {
  return `<div class="window"><div class="window-bar"><i></i><i></i><i></i><div class="window-url">${icon('lock', 10)}${esc(url)}</div></div><div class="${bodyCls}">${inner}</div></div>`;
}

function editorMock(cert = { style: 'modern', accent: '#0b65ad', accent2: '#ffb547' }) {
  const tools = ['grid', 'type', 'image', 'qr', 'pen', 'layers', 'sliders'];
  return `<div class="editor">
    <div class="editor-tools">${join(tools, (t, i) => `<span class="${i === 1 ? 'on' : ''}">${icon(t, 16)}</span>`)}</div>
    <div class="editor-canvas">${certSVG(cert)}</div>
    <div class="editor-props">
      <div class="lbl">Elements</div>
      <div class="prop on">Text ${icon('type', 14)}</div>
      <div class="prop">Logo ${icon('image', 14)}</div>
      <div class="prop">QR code ${icon('qr', 14)}</div>
      <div class="prop">Signature ${icon('pen', 14)}</div>
      <div class="lbl">Brand colors</div>
      <div class="swatches"><i style="background:#0b65ad"></i><i style="background:#ffb547"></i><i style="background:#161616"></i><i style="background:#12a150"></i></div>
      <div class="lbl">Dynamic fields</div>
      <div class="prop">[recipient.name]</div>
      <div class="prop">[course.title]</div>
    </div>
  </div>`;
}

function heroArt() {
  return `<div class="hero-art" aria-hidden="true">
    <div class="bg-card"></div>
    ${windowFrame(editorMock(), `app.${site.domain}/designs/course-completion`, '')}
    <div class="float-card float-card--a"><div class="fc-ico" style="background:var(--green-50);color:var(--green)">${icon('send', 18)}</div><div><b>1,248 credentials sent</b><span>Spring cohort · just now</span></div></div>
    <div class="float-card float-card--b"><div style="width:42px">${badgeSVG({ shape: 'hex', accent: '#7a4ee0', accent2: '#b892ff', glyph: 'star', label: 'PRO' })}</div><div><b>Badge earned</b><span>Shared on LinkedIn</span></div></div>
    <div class="float-card float-card--c"><div class="fc-ico" style="background:var(--blue-50);color:var(--blue)">${icon('shield', 18)}</div><div><b>Verified 3,902×</b><span>by employers this month</span></div></div>
  </div>`;
}

const PEOPLE = [
  ['Amara Okafor', 'amara@northwind.edu', 'Data Analytics'],
  ['Tunde Adeyemi', 'tunde.adeyemi@mail.com', 'Data Analytics'],
  ['Zainab Musa', 'zainab.musa@mail.com', 'UX Foundations'],
  ['Chika Eze', 'chika.eze@mail.com', 'Cloud Security'],
  ['Ifeoma Nwosu', 'ifeoma.nwosu@mail.com', 'UX Foundations'],
  ['Ayo Balogun', 'ayo.balogun@mail.com', 'Cloud Security'],
];

function sendMock() {
  const statuses = [['opened', 'Opened'], ['shared', 'Shared'], ['sent', 'Delivered'], ['opened', 'Opened'], ['sent', 'Delivered'], ['queued', 'Scheduled']];
  return windowFrame(`
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <div><b style="font-weight:600">Spring cohort · Data Analytics</b><div class="xs subtle">248 recipients · template “Modern Blue”</div></div>
      <span class="btn btn--primary btn--sm" style="pointer-events:none">${icon('send', 14)} Send all</span>
    </div>
    <table class="mock-table"><thead><tr><th>Recipient</th><th>Email</th><th>Status</th></tr></thead><tbody>
      ${join(PEOPLE, (p, i) => `<tr><td>${avatar(p[0], i)}${esc(p[0])}</td><td class="subtle">${esc(p[1])}</td><td><span class="status status--${statuses[i][0]}">${statuses[i][1]}</span></td></tr>`)}
    </tbody></table>`, `app.${site.domain}/send`);
}

function emailMock() {
  return `<div class="email">
    <div class="email-head"><b>Your certificate is ready 🎉</b><span>From: Northwind Academy &lt;certificates@${site.domain}&gt;</span></div>
    <div class="email-body">
      <div style="max-width:220px">${certSVG({ style: 'geo', accent: '#0b65ad', accent2: '#ffb547', name: 'Amara Okafor', course: 'Data Analytics' })}</div>
      <span>Hi Amara, congratulations on completing <b style="color:var(--ink)">Data Analytics</b>! Your credential is attached and hosted online.</span>
      <span class="fake-btn">View credential</span>
    </div>
  </div>`;
}

function shareMock() {
  return windowFrame(`
    <div class="share-grid">
      <div>${certSVG({ style: 'ribbon', accent: '#0e7a6b', accent2: '#f2b84b', name: 'Zainab Musa', course: 'UX Foundations', title: 'Certificate', subtitle: 'of Achievement' })}</div>
      <div class="share-btns">
        <div class="xs subtle" style="margin-bottom:2px">Share your achievement</div>
        <div class="share-btn"><i style="background:#0a66c2">in</i>Add to LinkedIn profile</div>
        <div class="share-btn"><i style="background:#111">𝕏</i>Post on X</div>
        <div class="share-btn"><i style="background:#1877f2">f</i>Share on Facebook</div>
        <div class="share-btn"><i style="background:var(--blue)">${icon('download', 13)}</i>Download PDF</div>
        <div class="share-btn"><i style="background:#161616">${icon('wallet', 13)}</i>Add to digital wallet</div>
      </div>
    </div>`, `credentials.${site.domain}/c/48c1-92fa`);
}

function verifyMock() {
  return windowFrame(`
    <div class="verify">
      <div class="verify-head"><div class="vh-ico">${icon('check', 20)}</div><div><b style="font-weight:600">This credential is valid</b><div class="xs">Verified by ${esc(site.name)} · tamper-proof record</div></div></div>
      <div style="max-width:300px;margin:0 auto">${certSVG({ style: 'classic', accent: '#123c7a', accent2: '#c99a2e', name: 'Tunde Adeyemi', course: 'Cloud Security Fundamentals' })}</div>
      <div class="verify-rows">
        <div><span>Recipient</span><span>Tunde Adeyemi</span></div>
        <div><span>Issued by</span><span>Kestrel Labs</span></div>
        <div><span>Issue date</span><span>March 2, 2026</span></div>
        <div><span>Expires</span><span>March 2, 2028</span></div>
        <div><span>Credential ID</span><span>KL-7Q2M-11XD</span></div>
      </div>
    </div>`, `verify.${site.domain}/KL-7Q2M-11XD`);
}

function analyticsMock() {
  const vals = [38, 52, 44, 70, 62, 88, 76, 94, 81, 100, 90, 72];
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return windowFrame(`
    <div class="row" style="justify-content:space-between;margin-bottom:12px"><b style="font-weight:600">Program performance</b><span class="tag tag--gray">Last 12 months</span></div>
    <div class="kpis">
      <div class="kpi"><small>Credentials issued</small><b>12,480</b><em>+18%</em></div>
      <div class="kpi"><small>Email open rate</small><b>87%</b><em>+6%</em></div>
      <div class="kpi"><small>Social shares</small><b>4,312</b><em>+31%</em></div>
    </div>
    <div class="bars" style="margin-top:14px">${join(vals, (v, i) => `<span class="${i === 9 ? 'hi' : ''}" style="height:${v}%"></span>`)}</div>
    <div class="bar-labels">${join(months, (m) => `<span>${m}</span>`)}</div>`, `app.${site.domain}/analytics`);
}

function sheetMock() {
  return windowFrame(`
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <div class="row" style="gap:8px"><span class="icon-tile icon-tile--sm" style="background:var(--green-50);color:var(--green)">${icon('table', 16)}</span><div><b style="font-weight:600;font-size:14px">graduates_spring.csv</b><div class="xs subtle">248 rows · 4 columns matched</div></div></div>
      <span class="tag tag--green">${icon('check', 12)} Ready</span>
    </div>
    <table class="mock-table"><thead><tr><th>name</th><th>email</th><th>course</th><th>issue_date</th></tr></thead><tbody>
      ${join(PEOPLE.slice(0, 5), (p) => `<tr><td>${esc(p[0])}</td><td class="subtle">${esc(p[1])}</td><td>${esc(p[2])}</td><td class="subtle">2026-05-14</td></tr>`)}
    </tbody></table>
    <div style="margin-top:12px;display:flex;justify-content:flex-end"><span class="btn btn--primary btn--sm" style="pointer-events:none">${icon('bolt', 14)} Generate 248 certificates</span></div>`, `app.${site.domain}/generate`);
}

function walletMock(count = 6) {
  const items = [
    ['c', { style: 'modern', accent: '#0b65ad', accent2: '#ffb547' }, 'Data Analytics'],
    ['b', { shape: 'hex', accent: '#7a4ee0', accent2: '#b892ff', glyph: 'star', label: 'PRO' }, 'Analytics Pro'],
    ['c', { style: 'ribbon', accent: '#0e7a6b', accent2: '#f2b84b' }, 'UX Foundations'],
    ['b', { shape: 'shield', accent: '#0e7a6b', accent2: '#3fc6a3', glyph: 'shield', label: 'SECURE' }, 'Security Basics'],
    ['c', { style: 'classic', accent: '#123c7a', accent2: '#c99a2e' }, 'Cloud Security'],
    ['b', { shape: 'circle', accent: '#f07b2d', accent2: '#ffb36b', glyph: 'bolt', label: 'SPEAKER' }, 'Summit 2026'],
  ];
  return windowFrame(`
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <div class="row" style="gap:10px">${avatar('Amara Okafor', 0, 'mini-av')}<div><b style="font-weight:600;font-size:14px">Amara's credentials</b><div class="xs subtle">6 earned · 3 issuers</div></div></div>
      <span class="tag">${icon('share', 12)} Public profile</span>
    </div>
    <div class="wallet">${join(items.slice(0, count), ([k, o, name]) => `<div class="wallet-item">${k === 'c' ? certSVG(o) : `<div style="background:var(--beige);border-radius:4px;padding:6px 18%">${badgeSVG(o)}</div>`}<b>${esc(name)}</b></div>`)}</div>`, `wallet.${site.domain}/amara`);
}

function securityArt() {
  return `<div style="display:grid;place-items:center;gap:14px;width:100%">
    <div style="width:92px;height:92px;border-radius:24px;background:#fff;display:grid;place-items:center;color:var(--blue);box-shadow:var(--shadow)">${icon('lock', 40)}</div>
    <div class="row" style="flex-wrap:wrap;justify-content:center;gap:8px">
      <span class="tag" style="background:#fff">${icon('shield', 12)} Encrypted at rest</span>
      <span class="tag" style="background:#fff">${icon('key', 12)} SSO / SAML</span>
      <span class="tag" style="background:#fff">${icon('globe', 12)} GDPR-ready</span>
    </div>
  </div>`;
}

function hostingArt() {
  return `<div style="display:grid;place-items:center;width:100%;position:relative">
    <div style="width:70%;max-width:280px">${certSVG({ style: 'minimal', accent: '#f07b2d' })}</div>
    <div class="float-card" style="position:absolute;right:6%;top:-6px;animation:none"><div class="fc-ico" style="background:var(--green-50);color:var(--green)">${icon('cloud', 18)}</div><div><b>$0</b><span>to host forever</span></div></div>
  </div>`;
}

/* --------------------------------------------------------------------------
   Reusable sections
   -------------------------------------------------------------------------- */
const LOGOS = [
  { name: 'Northwind', glyph: 'graduation', cls: '' },
  { name: 'Meridian University', glyph: '', cls: 'serif' },
  { name: 'Kestrel Labs', glyph: 'bolt', cls: '' },
  { name: 'BLUEPEAK', glyph: '', cls: 'caps' },
  { name: 'Oakline', glyph: 'heart', cls: 'light' },
  { name: 'Polaris Institute', glyph: 'star', cls: '' },
  { name: 'Brightpath', glyph: 'sparkles', cls: '' },
  { name: 'Harbor & Co.', glyph: '', cls: 'serif' },
  { name: 'NOVAFORM', glyph: 'layers', cls: 'caps' },
  { name: 'Atlas Learning', glyph: 'globe', cls: '' },
  { name: 'Cedar College', glyph: '', cls: 'serif' },
  { name: 'Summit Health', glyph: 'plus', cls: 'light' },
];

function logoWall(title = 'Trusted by schools, training providers and global teams', count = 12) {
  return `<section class="logos" aria-label="Customers"><div class="container">
    <p class="logos-title">${esc(title)}</p>
    <div class="logo-grid">${join(LOGOS.slice(0, count), (l) => `<div class="logo-item ${l.cls}">${l.glyph ? icon(l.glyph, 20) : ''}${esc(l.name)}</div>`)}</div>
  </div></section>`;
}

function testimonials(list) {
  const blobs = ['#ffd2b8', '#c9dcff', '#d8c8ff', '#bfe8d3', '#ffe39a'];
  return `<div class="carousel" data-carousel>
    <div class="carousel-viewport"><div class="carousel-track">
      ${join(list, (q, i) => `<div class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${list.length}">
        <figure class="quote-card">
          <div>
            <span class="quote-mark">${icon('quote', 34)}</span>
            <blockquote class="quote-text">${esc(q.quote)}</blockquote>
            <figcaption class="quote-who"><strong>${esc(q.name)}</strong><span>${esc(q.role)}</span></figcaption>
          </div>
          <div class="quote-art" style="background:${q.tint || 'var(--peach)'}">
            <span class="blob" style="width:60%;height:60%;left:-10%;top:-10%;background:${blobs[i % blobs.length]}"></span>
            <span class="blob" style="width:40%;height:40%;right:-6%;bottom:-6%;background:${blobs[(i + 2) % blobs.length]}"></span>
            <div class="portrait" style="background:${AV_COLORS[i % AV_COLORS.length]}">${esc(initials(q.name))}</div>
            ${q.metric ? `<div class="quote-metric"><b>${esc(q.metric[0])}</b>${esc(q.metric[1])}</div>` : ''}
          </div>
        </figure>
      </div>`)}
    </div></div>
    <div class="carousel-controls">
      <div class="dots" role="tablist">${join(list, (_, i) => `<button class="dot" aria-label="Go to slide ${i + 1}" ${i === 0 ? 'aria-current="true"' : ''}></button>`)}</div>
      <div class="arrows"><button class="arrow-btn" data-prev aria-label="Previous slide">${icon('chevronLeft', 20)}</button><button class="arrow-btn" data-next aria-label="Next slide">${icon('chevronRight', 20)}</button></div>
    </div>
  </div>`;
}

function accordion(items, { plain = false, first = true } = {}) {
  return `<div class="acc ${plain ? 'acc--plain' : ''}" data-accordion>${join(items, (it, i) => `
    <div class="acc-item ${first && i === 0 ? 'is-open' : ''}">
      <h3><button class="acc-btn" aria-expanded="${first && i === 0}">${esc(it.q)}<span class="pm">${icon('plus', 16)}</span></button></h3>
      <div class="acc-panel"><div class="acc-inner"><div>${it.a}</div></div></div>
    </div>`)}</div>`;
}

function faqSection(items, { title = 'Questions? We have answers', lead = '', cls = 'bg-beige' } = {}) {
  return `<section class="section ${cls}"><div class="container"><div class="faq">
    ${sectionHead({ eyebrow: 'FAQ', title, align: 'left', lead: lead || `Can't find what you're looking for? <a class="text-link" href="/contact">Talk to our team</a>.` })}
    ${accordion(items)}
  </div></div></section>`;
}

function ctaBand({ title = 'See what Trusted Verifier can do', lead = 'Talk with our team about your credential program and find the right way to get started.', primary = ['Talk to our team', '/contact'], secondary = ['Book a demo', site.demoUrl] } = {}) {
  return `<section class="section--sm"><div class="container"><div class="cta-band">
    <h2 class="h2">${title}</h2>
    <p class="lead">${lead}</p>
    <div class="btn-row btn-row--center">
      ${btn(primary[0], primary[1], 'white', { size: 'lg' })}
      ${secondary ? btn(secondary[0], secondary[1], 'outline-white', { size: 'lg' }) : ''}
    </div>
    <div class="cta-note"><span>${icon('check', 16)} Personal guidance</span><span>${icon('check', 16)} Book directly online</span></div>
  </div></div></section>`;
}

function intLogo(intg, sm = false) {
  return `<span class="int-logo${sm ? ' int-logo--sm' : ''}" style="background:${intg.color}">${esc(intg.mono || intg.name[0])}</span>`;
}

function postCover(post, size = 28) {
  const palettes = {
    Guides: ['#e2f0fa', '#bad8ee'], Templates: ['#fde5d9', '#ffc4a6'], Product: ['#ece5fb', '#cdb8ff'],
    'Digital badges': ['#dcf2e8', '#a6e3c6'], Marketing: ['#fff1c7', '#ffe08a'], Industry: ['#fde1e7', '#ffb8c7'],
  };
  const [bg, shape] = palettes[post.category] || palettes.Guides;
  return `<div class="post-cover" style="background:${bg}">
    <span class="pc-shape" style="width:55%;aspect-ratio:1;left:-12%;top:-20%;background:${shape}"></span>
    <span class="pc-shape" style="width:35%;aspect-ratio:1;right:-6%;bottom:-14%;background:${shape}"></span>
    <span class="pc-ico">${icon(post.icon || 'book', size)}</span>
  </div>`;
}

module.exports = {
  esc, join, btn, linkArrow, sectionHead, checklist, breadcrumb, avatar, initials, AV_COLORS,
  certSVG, badgeSVG, docSVG, windowFrame, editorMock, heroArt, sendMock, emailMock, shareMock,
  verifyMock, analyticsMock, sheetMock, walletMock, securityArt, hostingArt,
  logoWall, testimonials, accordion, faqSection, ctaBand, intLogo, postCover, icon, logoMark,
};
