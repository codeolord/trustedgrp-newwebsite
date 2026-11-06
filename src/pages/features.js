const ui = require('../ui');
const { icon, esc, join, btn, linkArrow, breadcrumb } = ui;
const { renderDetail, mock } = require('./shared');
const { featureDetails, featureGroups } = require('../data/features');
const site = require('../site');

const index = {
  path: '/features',
  title: 'Features',
  description: `Explore every ${site.name} feature for designing, issuing, sharing and verifying digital credentials.`,
  body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Features' }])}</div>
<section class="hero hero--center" style="padding-top:40px"><div class="container"><div class="hero-copy">
  <h1 class="h1 h1--sm">Everything you need to run credential programs</h1>
  <p class="lead">80+ features for a streamlined, automated way to design, issue, share and verify certificates and badges.</p>
  <div class="btn-row btn-row--center">${btn('Talk to our team', '/contact', 'primary', { size: 'lg' })}${btn('Book a demo', site.demoUrl, 'secondary', { size: 'lg' })}</div>
</div></div></section>

<section class="section--sm section--flush-top"><div class="container"><div class="features-layout">
  <nav class="side-nav" aria-label="Feature categories" data-scrollspy>
    <b>All features</b>
    ${join(featureGroups, (g) => `<a href="#${g.id}">${esc(g.name)}</a>`)}
  </nav>
  <div>
    ${join(featureGroups, (g) => `<section class="feature-group" id="${g.id}">
      <div class="feature-group-head"><h2 class="h3">${esc(g.name)}</h2>${linkArrow('See all', g.href)}</div>
      <div class="grid-2" style="gap:16px">${join(g.items, ([t, d]) => `<div class="f-card"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`)}</div>
    </section>`)}
  </div>
</div></div></section>

<section class="section bg-beige"><div class="container">
  <div class="section-head"><h2 class="h2">Deep dives</h2><p class="lead">Take a closer look at the core building blocks.</p></div>
  <div class="grid-3">${join(featureDetails, (f) => `<a class="card" href="/features/${f.slug}">
    <div class="card-media ${f.tint}" style="aspect-ratio:16/11"><div style="width:100%">${mock(f.mock)}</div></div>
    <div class="card-body"><h3 class="h4">${esc(f.name)}</h3><p class="muted">${esc(f.lead)}</p><span class="link-arrow">Learn more${icon('arrowRight', 16)}</span></div>
  </a>`)}</div>
</div></section>
${ui.ctaBand()}`,
};

const details = featureDetails.map((f, i) => ({
  path: `/features/${f.slug}`,
  title: f.name,
  description: f.lead,
  body: renderDetail({ ...f, eyebrow: f.name }, {
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Features', href: '/features' }, { label: f.name }],
    related: featureDetails.filter((o) => o.slug !== f.slug).slice(0, 3).map((o) => ({ href: `/features/${o.slug}`, icon: o.icon, name: o.name, lead: o.lead })),
    quoteIndex: i,
  }),
}));

module.exports = [index, ...details];
