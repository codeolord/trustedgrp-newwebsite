const ui = require('../ui');
const { icon, esc, join, btn, breadcrumb, sectionHead } = ui;
const { renderDetail, mock } = require('./shared');
const { products, useCases } = require('../data/solutions');
const site = require('../site');

const card = (s) => `<a class="card" href="${s.path}">
  <div class="card-media ${s.tint}" style="aspect-ratio:16/11"><div style="width:100%">${mock(s.mock)}</div></div>
  <div class="card-body"><span class="row" style="gap:8px;color:var(--blue)">${icon(s.icon, 18)}<span class="small" style="font-weight:600">${esc(s.name)}</span></span><h3 class="h4">${esc(s.title)}</h3><span class="link-arrow">Learn more${icon('arrowRight', 16)}</span></div>
</a>`;

const index = {
  path: '/solutions',
  title: 'Solutions',
  description: `${site.name} products and solutions for education, training, events, HR and associations.`,
  body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Solutions' }])}</div>
<section class="hero hero--center" style="padding-top:40px"><div class="container"><div class="hero-copy">
  <h1 class="h1 h1--sm">One platform for every kind of credential</h1>
  <p class="lead">Certificates, badges, documents and forms — tailored to the way your organization recognizes achievement.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container">
  ${sectionHead({ eyebrow: 'Products', title: 'Products', align: 'left' })}
  <div class="grid-3">${join(products, card)}</div>
</div></section>
<section class="section bg-beige"><div class="container">
  ${sectionHead({ eyebrow: 'Use cases', title: 'Built for your industry', align: 'left' })}
  <div class="grid-3">${join(useCases, card)}
    <a class="card" href="${site.demoUrl}" style="background:var(--blue);border-color:var(--blue);color:#fff">
      <div class="card-body" style="align-content:center;gap:16px;padding:32px"><span class="icon-tile" style="background:rgba(255,255,255,.15);color:#fff">${icon('message', 22)}</span><h3 class="h3">Something else in mind?</h3><p style="color:rgba(255,255,255,.8)">Tell us about your program and we’ll show you how teams like yours use ${esc(site.name)}.</p><span class="link-arrow" style="color:#fff">Talk to us${icon('arrowRight', 16)}</span></div>
    </a>
  </div>
</div></section>
${ui.ctaBand()}`,
};

const detail = (s, i, group) => ({
  path: s.path,
  title: s.name,
  description: s.lead,
  body: renderDetail(s, {
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: s.name }],
    related: group.filter((o) => o.path !== s.path).slice(0, 3).map((o) => ({ href: o.path, icon: o.icon, name: o.name, lead: o.lead })),
    quoteIndex: i + 1,
  }),
});

module.exports = [index, ...products.map((s, i) => detail(s, i, products)), ...useCases.map((s, i) => detail(s, i, useCases))];
