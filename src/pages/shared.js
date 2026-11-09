// Mock registry + the shared "detail page" template used by features, products and use cases.
const ui = require('../ui');
const { icon, esc, join, btn, linkArrow, sectionHead, checklist, breadcrumb, certSVG, badgeSVG, docSVG, windowFrame } = ui;
const { integrations, testimonials } = require('../data/content');
const site = require('../site');

function formMock() {
  return `<div style="position:relative;width:100%">${windowFrame(`
    <div class="stack" style="gap:12px">
      <div><b style="font-weight:600">Workshop attendance</b><div class="xs subtle">Takes 30 seconds · Certificate sent on submit</div></div>
      <div class="field"><label class="xs">Full name</label><div class="input" style="height:36px;display:flex;align-items:center;font-size:13px">Zainab Musa</div></div>
      <div class="field"><label class="xs">Email</label><div class="input" style="height:36px;display:flex;align-items:center;font-size:13px">zainab.musa@mail.com</div></div>
      <div class="field"><label class="xs">Session attended</label><div class="input" style="height:36px;display:flex;align-items:center;justify-content:space-between;font-size:13px">UX Foundations — Day 2 ${icon('chevronDown', 14)}</div></div>
      <div class="row" style="gap:4px;color:#f5a524">${join([1, 2, 3, 4, 5], () => icon('starFill', 18))}<span class="xs subtle" style="margin-left:6px">Rate the session</span></div>
      <span class="btn btn--primary btn--sm" style="pointer-events:none;justify-self:start">Submit</span>
    </div>`, `forms.${site.domain}/attendance`)}
    <div class="float-card" style="right:-8px;bottom:22px"><div class="fc-ico" style="background:var(--green-50);color:var(--green)">${icon('check', 18)}</div><div><b>Certificate issued</b><span>to zainab.musa@mail.com</span></div></div>
  </div>`;
}

function pagesMock() {
  return `<div style="position:relative;width:100%;max-width:460px;margin:0 auto;aspect-ratio:1.15">
    <div style="position:absolute;left:0;top:8%;width:42%;transform:rotate(-6deg);box-shadow:var(--shadow-lg)">${docSVG({ kind: 'transcript' })}</div>
    <div style="position:absolute;right:0;top:4%;width:42%;transform:rotate(6deg);box-shadow:var(--shadow-lg)">${docSVG({ kind: 'letter', title: 'Letter of Recommendation' })}</div>
    <div style="position:absolute;left:12%;right:12%;bottom:4%;box-shadow:var(--shadow-lg)">${certSVG({ style: 'classic', accent: '#123c7a', accent2: '#c99a2e', title: 'Diploma', subtitle: 'Bachelor of Science' })}</div>
    <span class="tag" style="position:absolute;left:50%;top:0;transform:translateX(-50%);background:#fff;box-shadow:var(--shadow)">${icon('pages', 12)} 3 pages · 1 credential</span>
  </div>`;
}

function docsMock() {
  return `<div class="grid-3" style="gap:14px;width:100%;align-items:center">
    <div style="box-shadow:var(--shadow)">${docSVG({ kind: 'transcript' })}</div>
    <div style="box-shadow:var(--shadow)">${docSVG({ kind: 'diploma', accent: '#123c7a', title: 'Diploma' })}</div>
    <div>${docSVG({ kind: 'card', accent: '#7a4ee0', title: 'Full Member', org: 'Atlas Learning' })}</div>
  </div>`;
}

function badgesMock() {
  return `<div class="badge-row">
    ${badgeSVG({ shape: 'hex', accent: '#0b65ad', accent2: '#59a2d8', glyph: 'star', label: 'EXPERT', top: 'DATA' })}
    ${badgeSVG({ shape: 'shield', accent: '#0e7a6b', accent2: '#3fc6a3', glyph: 'shield', label: 'SECURE', top: 'CERTIFIED' })}
    ${badgeSVG({ shape: 'circle', accent: '#f07b2d', accent2: '#ffb36b', glyph: 'bolt', label: 'SPEAKER' })}
    ${badgeSVG({ shape: 'star', accent: '#7a4ee0', accent2: '#b892ff', glyph: 'heart', label: 'MENTOR' })}
  </div>`;
}

function certsMock() {
  return `<div class="cert-stack">
    <div class="back">${certSVG({ style: 'geo', accent: '#d9468f', accent2: '#ffd166' })}</div>
    <div class="mid">${certSVG({ style: 'ribbon', accent: '#0e7a6b', accent2: '#f2b84b' })}</div>
    <div class="front">${certSVG({ style: 'modern', accent: '#0b65ad', accent2: '#ffb547' })}</div>
  </div>`;
}

function templatesMock() {
  const t = [['classic', '#123c7a', '#c99a2e'], ['modern', '#7a4ee0', '#ff9ec7'], ['wave', '#0e9aa7', '#f6cd61'], ['geo', '#f07b2d', '#1d3557']];
  return `<div class="grid-2" style="gap:14px;width:100%">${join(t, ([style, accent, accent2]) => `<div style="box-shadow:var(--shadow);border-radius:3px;overflow:hidden">${certSVG({ style, accent, accent2 })}</div>`)}</div>`;
}

function integrationsMock() {
  const list = integrations.slice(0, 8);
  const integrationTile = (integration) => {
    if (!integration.logo) return '';
    return `<div class="int-tile"><img class="int-logo-image" src="/assets/integrations/${integration.logo}" alt="${esc(integration.name)} logo"><span>${esc(integration.name)}</span></div>`;
  };
  return `<div class="int-cloud" style="grid-template-columns:repeat(4,1fr);width:100%">
    ${join(list.slice(0, 2), integrationTile)}
    <div class="int-hub int-tile" style="grid-row:span 2"><span class="brand">${ui.logoMark(34, '#fff')}${esc(site.name)}</span></div>
    ${join(list.slice(2), integrationTile)}
  </div>`;
}

const MOCKS = {
  editor: () => windowFrame(ui.editorMock(), `app.${site.domain}/designs`, ''),
  sheet: ui.sheetMock, send: ui.sendMock, email: ui.emailMock, share: ui.shareMock, verify: ui.verifyMock,
  analytics: ui.analyticsMock, wallet: ui.walletMock, security: ui.securityArt, hosting: ui.hostingArt,
  form: formMock, pages: pagesMock, docs: docsMock, badges: badgesMock, certs: certsMock, templates: templatesMock, integrations: integrationsMock,
};
const mock = (name) => (MOCKS[name] || MOCKS.certs)();

// Shared detail template --------------------------------------------------------
function renderDetail(d, { crumbs, related = [], quoteIndex = 0 }) {
  return `
<div class="container">${breadcrumb(crumbs)}</div>
<section class="hero"><div class="container hero-grid">
  <div class="hero-copy">
    <span class="pill">${icon(d.icon, 14)} ${esc(d.eyebrow || d.name)}</span>
    <h1 class="h1 h1--sm">${esc(d.title)}</h1>
    <p class="lead">${esc(d.lead)}</p>
    <div class="btn-row">${btn('Talk to our team', '/contact', 'primary', { size: 'lg' })}${btn('Book a demo', site.demoUrl, 'secondary', { size: 'lg' })}</div>
    <p class="small subtle">Free plan available · No credit card required</p>
  </div>
  <div class="${d.tint}" style="border-radius:24px;padding:clamp(20px,4vw,48px);display:grid;place-items:center">${mock(d.mock)}</div>
</div></section>

${ui.logoWall('Used by teams at', 6)}

<section class="section--sm"><div class="container"><div class="grid-3">
  ${join(d.benefits, ([ic, t, p]) => `<div class="card-bordered"><span class="icon-tile">${icon(ic, 22)}</span><h2 class="h4">${esc(t)}</h2><p class="muted">${esc(p)}</p></div>`)}
</div></div></section>

<section class="section"><div class="container">
  ${join(d.sections, (s, i) => `<div class="split${i % 2 ? ' split--rev' : ''} reveal">
    <div class="split-copy">
      <span class="eyebrow">${esc(s.eyebrow)}</span>
      <h2 class="h2">${esc(s.title)}</h2>
      <p class="lead">${esc(s.text)}</p>
      ${checklist(s.bullets.map(esc))}
    </div>
    <div class="split-media ${s.tint}" style="border-radius:24px;padding:clamp(20px,4vw,44px);display:grid;place-items:center;min-height:340px">${mock(s.mock)}</div>
  </div>`)}
</div></section>

<section class="section bg-sky"><div class="container">
  ${sectionHead({ eyebrow: 'Customer stories', title: 'Loved by teams who issue credentials every day' })}
  ${ui.testimonials(testimonials)}
  <div class="btn-row btn-row--center mt-32">${btn('Read customer stories', '/customers', 'primary')}</div>
</div></section>

${related.length ? `<section class="section"><div class="container">
  ${sectionHead({ title: 'Explore more', align: 'left' })}
  <div class="grid-3">${join(related, (r) => `<a class="card" href="${r.href}"><div class="card-body"><span class="icon-tile">${icon(r.icon, 22)}</span><h3 class="h4">${esc(r.name)}</h3><p class="muted">${esc(r.lead)}</p><span class="link-arrow">Learn more${icon('arrowRight', 16)}</span></div></a>`)}</div>
</div></section>` : ''}

${ui.faqSection(d.faq.map(([q, a]) => ({ q, a: `<p>${esc(a)}</p>` })), { title: `${d.name}: common questions` })}
${ui.ctaBand()}`;
}

module.exports = { mock, renderDetail, MOCKS };
