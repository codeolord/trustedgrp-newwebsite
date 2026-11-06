const ui = require('../ui');
const { icon, esc, join, btn, linkArrow, sectionHead } = ui;
const site = require('../site');
const { testimonials } = require('../data/content');

const plans = [
  {
    id: 'starter', name: 'Starter', desc: 'Essential tools to start issuing digital certificates and badges.',
    tiers: [250], cta: ['Contact us for a quote', '/contact', 'primary'], note: `${icon('check', 14)} Request a tailored Starter quotation`,
    lead: 'Features included:',
    features: ['Design builder and templates', 'Bulk generation from CSV or Excel', 'Email delivery', 'Verification pages and QR codes', 'Unlimited credential hosting', 'Add to LinkedIn', 'PDF and PNG downloads'],
  },
  {
    id: 'pro', name: 'Pro', flag: 'Most popular', desc: 'For growing programs that need branding, automation and insights.',
    tiers: [1000, 2500, 5000, 10000], cta: ['Contact us for a quote', '/contact', 'primary'], note: `${icon('shield', 14)} Request a tailored Pro quotation`,
    lead: 'Everything in Starter, plus:',
    features: ['Custom branding and brand kits', `Remove ${site.name} branding`, 'Branded email sender', 'Expiry dates and reminders', 'All integrations, including LMS', 'Analytics dashboard', 'Forms', 'Digital badges (Open Badges 3.0)', '3 team members'],
  },
  {
    id: 'business', name: 'Business', desc: 'Advanced controls and white-labelled experiences for multi-team programs.',
    tiers: [5000, 10000, 25000, 50000], cta: ['Contact us for a quote', '/contact', 'secondary'], note: `Ask us about custom volumes and terms.`,
    lead: 'Everything in Pro, plus:',
    features: ['Custom domain', 'White-label credential wallet', 'Multi-page credentials', 'Custom email sending domain', 'Roles and permissions', 'API and webhooks', 'Audit logs', '10 team members', 'Priority support'],
  },
];

const Y = '✓', N = '—';
const compare = [
  ['Issuing', [
    ['Credentials per year', '250', 'From 1,000', 'From 5,000'],
    ['Bulk generation (CSV / Excel)', Y, Y, Y],
    ['Credential hosting', 'Unlimited', 'Unlimited', 'Unlimited'],
    ['Digital badges', N, Y, Y],
    ['Multi-page credentials', N, N, Y],
  ]],
  ['Design', [
    ['Templates', Y, Y, Y],
    ['Custom fonts and brand kits', N, Y, Y],
    [`Remove ${site.name} branding`, N, Y, Y],
  ]],
  ['Delivery', [
    ['Email delivery', Y, Y, Y],
    ['Scheduled sending and reminders', N, Y, Y],
    ['Custom sender name', N, Y, Y],
    ['Custom sending domain', N, N, Y],
  ]],
  ['Sharing & verification', [
    ['Verification pages and QR codes', Y, Y, Y],
    ['Add to LinkedIn', Y, Y, Y],
    ['Calls to action on credential pages', N, Y, Y],
    ['Custom domain', N, N, Y],
    ['White-label wallet', N, N, Y],
  ]],
  ['Management & insights', [
    ['Expiry and renewals', N, Y, Y],
    ['Analytics dashboard', 'Basic', Y, 'Advanced'],
    ['Team members', '1', '3', '10'],
    ['Roles and permissions', N, N, Y],
    ['Audit logs', N, N, Y],
  ]],
  ['Integrations & support', [
    ['Zapier and Make', Y, Y, Y],
    ['Native LMS / CRM integrations', N, Y, Y],
    ['API and webhooks', N, N, Y],
    ['Support', 'Email', 'Email & chat', 'Priority'],
  ]],
];

const faq = [
  { q: 'What counts as a credential?', a: '<p>Each certificate or badge issued to one recipient counts as one credential. Editing, resending or re-downloading an existing credential does not count again.</p>' },
  { q: 'How do I get a quotation?', a: '<p>Select the annual credential volume closest to your needs and contact us. Our team will discuss your requirements and provide a tailored quotation.</p>' },
  { q: 'What happens if I need a different annual volume?', a: '<p>Contact us with your expected credential volume and we can discuss a suitable plan or custom quotation.</p>' },
  { q: 'Do you offer education or nonprofit pricing?', a: '<p>Contact us with details about your organization to discuss available options.</p>' },
];

const fmtNum = (n) => n.toLocaleString('en-NG');
const cell = (v) => (v === Y ? icon('check', 18) : v === N ? '<span class="no">—</span>' : esc(v));

const body = `
<section class="hero hero--center" style="padding-bottom:24px"><div class="container">
  <div class="hero-copy">
    <h1 class="h1 h1--sm">Plans for programs of every size</h1>
    <p class="lead">Tell us what your credential program needs and our team will provide a quotation. Pricing is available on request.</p>
    <div class="includes"><span class="subtle">All plans include:</span>
      ${join(['Bulk personalization', 'Email delivery', 'Add to LinkedIn', 'Verifiable credentials'], (s) => `<span>${icon('check', 16)}${s}</span>`)}
    </div>
  </div>
</div></section>

<section class="section--sm section--flush-top"><div class="container">
  <div class="pricing-bar">
    <div class="row small"><span class="muted">Need custom volumes, terms or security reviews?</span>${linkArrow('Contact us for a quotation', '/contact')}</div>
  </div>
  <div class="plans">
    ${join(plans, (p) => `<div class="plan${p.flag ? ' plan--featured' : ''}" data-plan>
      ${p.flag ? `<span class="plan-flag">${p.flag}</span>` : ''}
      <div><h2 class="plan-name">${p.name}</h2><p class="plan-desc">${p.desc}</p></div>
      <div class="plan-price"><span class="amount">Contact us</span></div>
      <div class="plan-period">For a tailored quotation</div>
      <div class="plan-select">
        <label for="tier-${p.id}">Estimated annual issuing volume</label>
        <select class="select" id="tier-${p.id}">
          ${join(p.tiers, (n) => `<option value="${n}">${fmtNum(n)} credentials / year</option>`)}
        </select>
      </div>
      ${btn(p.cta[0], p.cta[1], p.cta[2], { block: true, size: 'lg' })}
      <div class="plan-note">${p.note}</div>
      <ul class="plan-features"><li class="pf-title">${p.lead}</li>${join(p.features, (f) => `<li>${icon('check', 18)}<span>${esc(f)}</span></li>`)}</ul>
      <a class="btn btn--secondary btn--block btn-more" href="#compare">Compare all features</a>
    </div>`)}
  </div>
  <div class="enterprise-strip">
    <div>
      <h2 class="h3">Enterprise</h2>
      <p class="mt-8">For large organizations that need custom volumes, security reviews and dedicated support.</p>
      <ul>${join(['SSO / SAML', 'Dedicated success manager', 'Custom contracts and invoicing', 'Data residency (EU / US)', 'Uptime SLA'], (s) => `<li>${icon('check', 16)}${s}</li>`)}</ul>
    </div>
    <div class="btn-row">${btn('Contact us for a quote', '/contact', 'white', { size: 'lg' })}${btn('Learn more', '/enterprise', 'outline-white', { size: 'lg' })}</div>
  </div>
</div></section>

${ui.logoWall('Chosen by schools, academies and global teams', 6)}

<section class="section bg-beige" id="compare"><div class="container">
  ${sectionHead({ title: 'Compare plans', lead: 'Every feature, side by side.' })}
  <div class="compare-wrap"><table class="compare">
    <thead><tr><th scope="col"><span class="sr-only">Feature</span></th>${join(plans, (p) => `<th scope="col">${p.name}</th>`)}</tr></thead>
    <tbody>
      ${join(compare, ([grp, rows]) => `<tr class="grp"><td colspan="4">${esc(grp)}</td></tr>${join(rows, ([f, ...vals]) => `<tr><td>${esc(f)}</td>${join(vals, (v) => `<td>${cell(v)}</td>`)}</tr>`)}`)}
      <tr><td></td>${join(plans, (p) => `<td>${btn(p.cta[0], p.cta[1], p.cta[2], { size: 'sm' })}</td>`)}</tr>
    </tbody>
  </table></div>
</div></section>

<section class="section bg-sky"><div class="container">
  ${sectionHead({ title: 'Worth every credential', eyebrow: 'Customer stories' })}
  ${ui.testimonials(testimonials.slice(0, 3))}
</div></section>

${ui.faqSection(faq, { title: 'Pricing questions', cls: '' })}
${ui.ctaBand({ title: 'Need a quotation?', lead: 'Tell us about your credential program and our team will recommend the right option.', primary: ['Contact us for a quote', '/contact'], secondary: ['Book a demo', site.demoUrl] })}
`;

module.exports = [{
  path: '/pricing',
  title: 'Pricing',
  description: `Plans for every program size. Start issuing digital certificates and badges free with ${site.name}.`,
  body,
}];
