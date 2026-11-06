// Inline stroke icons (24x24 grid). Use icon(name, size).
const paths = {
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  send: '<path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4 18-7z"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  chart: '<path d="M3 20h18"/><path d="M6 16v-5M11 16V6M16 16V9M21 16v-3"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  cloud: '<path d="M7 18a5 5 0 1 1 .9-9.9A6 6 0 0 1 19 9a4.5 4.5 0 0 1-1 9z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  certificate: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h5"/><circle cx="16.5" cy="14.5" r="2"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/><path d="M6 6V5a2 2 0 0 1 2-2h9"/>',
  form: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  pages: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
  sparkles: '<path d="M11 3l1.8 4.8L17.5 9.5l-4.7 1.8L11 16l-1.8-4.7L4.5 9.5l4.7-1.7z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  graduation: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 7v2M14 11v2M14 15v2"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v1M14 20h1M18 18h3v3h-3z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h8"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.7-4.3L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.7 4.3L20 16"/><path d="M20 21v-5h-5"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  type: '<path d="M5 6V4h14v2M12 4v16M9 20h6"/>',
  megaphone: '<path d="M3 10v4h4l7 5V5L7 10z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13"/><path d="M12 8c-2-4-6-4-6-1.5S9 8 12 8zM12 8c2-4 6-4 6-1.5S15 8 12 8z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.01"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  heart: '<path d="M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.9-.6-1.3-.6-2.1 0-.9.7-1.6 1.6-1.6H17a4 4 0 0 0 4-4c0-4.7-4-8.7-9-8.7z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  dollar: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
  quote: '<path d="M4 18v-5a6 6 0 0 1 6-6M14 18v-5a6 6 0 0 1 6-6" stroke-width="2.4"/><path d="M4 18h5v-5H4zM14 18h5v-5h-5z" fill="currentColor"/>',
  message: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  mapPin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14 4c3-1.5 6-1 6-1s.5 3-1 6l-6 6-5-5z"/><path d="M9 10H5l3-3h4M14 15v4l3-3v-4"/>',
  fileText: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  wand: '<path d="M15 4V2M15 10V8M11 6h2M17 6h2M4 20l10-10"/><path d="M19 13v2M18 14h2"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
};

const filled = {
  linkedin: '<path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.93 1.3-1.93 2.64V21h-4z"/>',
  x: '<path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.9 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/>',
  instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>',
  youtube: '<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z"/>',
  facebook: '<path d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.6L14 1.5c-4 0-4.9 3-4.9 4.9v2.1H6.8v4h2.3V22.5H14V12.5h3.3l.4-4z"/>',
  starFill: '<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
  playFill: '<path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z"/>',
};

function icon(name, size = 20, extra = '') {
  if (filled[name]) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" ${extra}>${filled[name]}</svg>`;
  }
  const p = paths[name];
  if (!p) throw new Error(`Unknown icon: ${name}`);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
}

// Segmented hexagon mark used in compact in-page brand lockups.
function logoMark(size = 28, color = '#0b65ad') {
  const side = color === '#fff' ? '#fff' : '#0b65ad';
  const deep = color === '#fff' ? '#fff' : '#0a3260';
  return `<svg class="brand-mark" width="${size}" height="${size}" viewBox="0 0 280 300" aria-hidden="true">
    <g stroke="#fff" stroke-width="4" stroke-linejoin="round">
      <path d="M140 2L263 89 201 127 140 77z" fill="${side}"/>
      <path d="M263 89L273 243 205 204 201 127z" fill="${side}"/>
      <path d="M273 243L140 298 140 229 205 204z" fill="${deep}"/>
      <path d="M140 298L5 243 72 204 140 229z" fill="${side}"/>
      <path d="M5 243L15 89 72 127 72 204z" fill="${side}"/>
      <path d="M15 89L140 2 140 77 72 127z" fill="${deep}"/>
    </g>
  </svg>`;
}

module.exports = { icon, logoMark };
