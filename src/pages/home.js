const ui = require('../ui');
const { icon, esc, join, btn, linkArrow, sectionHead, checklist, certSVG, badgeSVG } = ui;
const { mock } = require('./shared');
const { integrations, testimonials, homeFaq, posts, certificateTemplates } = require('../data/content');
const site = require('../site');

const integrationLogoFiles = {
  Zapier: 'zapier.png',
  HubSpot: 'hubspot.png',
  Salesforce: 'salesforce.png',
  'Google Sheets': 'google-sheets.png',
  'Google Forms': 'google-forms.png',
  'Microsoft Excel': 'excel.png',
  Webflow: 'webflow.png',
  Jotform: 'jotform.png',
  'LearnWorlds': 'learnworlds.png',
  TalentLMS: 'talentlms.png',
  Airtable: 'airtable.png',
  Typeform: 'typeform.png',
  Moodle: 'moodle.png',
};
const integrationTile = (integration) => {
  const file = integrationLogoFiles[integration.name];
  if (!file) return '';
  return `<a class="int-tile" href="/integrations?q=${encodeURIComponent(integration.name)}"><img class="int-logo-image" src="/assets/integrations/${file}" alt="${esc(integration.name)} logo"><span>${esc(integration.name)}</span></a>`;
};

const tabs = [
  ['Design', 'Build on-brand certificates and badges with a drag-and-drop editor.', 'editor', 'tint-sky'],
  ['Send', 'Generate in bulk and deliver by email, link or integration.', 'send', 'tint-peach'],
  ['Share', 'Recipients share to LinkedIn and social networks in one click.', 'share', 'tint-mint'],
  ['Verify', 'Anyone can confirm a credential is genuine in seconds.', 'verify', 'tint-lav'],
  ['Analyze', 'Track opens, shares and verifications for every program.', 'analytics', 'tint-butter'],
];

const benefits = [
  ['clock', 'Save hours on every program', 'Stop copy-pasting names into slides. Generate, send and store every credential automatically, with no manual errors.', 'email', 'tint-peach'],
  ['megaphone', 'Grow your visibility', 'Every shared credential puts your brand in front of the recipient’s network — free, authentic marketing.', 'share', 'tint-sky'],
  ['shield', 'Eliminate credential fraud', 'Unique IDs, QR codes and live verification pages make fake certificates easy to spot.', 'verify', 'tint-mint'],
  ['heart', 'Give recipients a better experience', 'Credentials arrive instantly, look great on any device and live in one branded wallet forever.', 'wallet', 'tint-lav'],
];

const advanced = [
  ['clock', 'Expiry & renewals', 'Set validity periods and send reminders automatically.'],
  ['sliders', 'Custom attributes', 'Add grades, hours, credits or any field you need.'],
  ['users', 'Teams & permissions', 'Invite colleagues with granular roles.'],
  ['key', 'Single sign-on', 'SAML SSO with your identity provider.'],
  ['wallet', 'Wallet passes', 'Apple and Google Wallet support for every credential.'],
  ['globe', 'Multi-language', 'Credential pages and emails in 20+ languages.'],
  ['code', 'API & webhooks', 'Issue and track credentials from your own systems.'],
  ['link', 'Custom domain', 'Host credentials on credentials.yourbrand.com.'],
  ['fileText', 'Audit logs', 'A complete history of every action in your account.'],
];

function bulkArt(kind) {
  if (kind === 'send') {
    return `<div style="position:relative;width:78%">
      <div style="transform:rotate(-7deg) translate(-14%,4%);position:absolute;inset:0;opacity:.85">${certSVG({ style: 'geo', accent: '#d9468f', accent2: '#ffd166' })}</div>
      <div style="transform:rotate(5deg) translate(10%,-2%);position:absolute;inset:0">${certSVG({ style: 'minimal', accent: '#0e7a6b' })}</div>
      <div style="position:relative;box-shadow:var(--shadow)">${certSVG({ style: 'modern', accent: '#f07b2d', accent2: '#1d3557' })}</div>
      <span class="tag" style="position:absolute;right:-6%;top:-10%;background:#fff;box-shadow:var(--shadow);font-size:13px;padding:6px 10px">${icon('send', 13)} 248 sent</span>
    </div>`;
  }
  if (kind === 'pdf') {
    return `<div class="row" style="gap:14px">
      ${join(['#0b65ad', '#7a4ee0', '#0e7a6b'], (c, i) => `<div style="width:74px;aspect-ratio:3/4;background:#fff;border-radius:10px;box-shadow:var(--shadow);display:grid;place-items:center;transform:translateY(${i === 1 ? -10 : 0}px)"><div style="display:grid;gap:6px;justify-items:center"><span style="width:34px;height:34px;border-radius:9px;background:${c};color:#fff;display:grid;place-items:center">${icon('fileText', 18)}</span><b style="font-size:11px">PDF</b></div></div>`)}
      <span style="width:44px;height:44px;border-radius:50%;background:var(--blue);color:#fff;display:grid;place-items:center;box-shadow:var(--shadow)">${icon('download', 20)}</span>
    </div>`;
  }
  return `<div class="stack" style="gap:8px;width:86%">
    ${join([['AO', 'Amara Okafor', '48c1-92fa'], ['TA', 'Tunde Adeyemi', '7bd2-11ee'], ['ZM', 'Zainab Musa', '0c93-a7f4']], ([ini, n, id], i) => `<div style="background:#fff;border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-sm);font-size:12.5px">${ui.avatar(n, i)}<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><b style="font-weight:500">${n}</b><br><span class="subtle">credentials.${site.domain}/c/${id}</span></span>${icon('external', 14)}</div>`)}
  </div>`;
}

const body = `
<section class="hero"><div class="container hero-grid">
  <div class="hero-copy">
    <span class="pill">${icon('award', 14)} Certificate &amp; badge platform</span>
    <h1 class="h1">Issue digital credentials people are proud to share</h1>
    <p class="lead">${esc(site.name)} helps you design, send, track and verify certificates and digital badges at scale — connected to the tools you already use.</p>
    ${checklist(['Save hours of manual work on every program', 'Grow your reach with every shared credential', 'Give recipients a polished, on-brand experience'], 'checklist--ink')}
    <div class="btn-row">
      ${btn('Talk to our team', '/contact', 'primary', { size: 'lg' })}
      <button class="btn btn--secondary btn--lg" data-open="tour">${icon('playFill', 16)} Take the 1-minute tour</button>
    </div>
    <div class="hero-proof">
      <div class="avatars">${join(['Priya Raman', 'Marcus Bell', 'Elena Varga', 'Tomás Herrera'], (n, i) => `<span style="background:${ui.AV_COLORS[i]}">${ui.initials(n)}</span>`)}</div>
      <span>Free forever for up to 250 credentials a year</span>
    </div>
  </div>
  ${ui.heroArt()}
</div></section>

${ui.logoWall()}

<section class="section--sm section--flush-top"><div class="container"><div class="grid-3">
  ${join([
    ['/create', 'Digital certificates', 'Issue verifiable certificates with the certificate maker. Send in bulk, give recipients login-free access, and host every certificate online.', 'Start for free', 'tint-sky', 'certs'],
    ['/digital-badges', 'Digital badges', 'Recognize skills and milestones with Open Badges 3.0 compliant badges that recipients can stack and share.', 'Explore badges', 'tint-lav', 'badges'],
    ['/credential-wallet', 'Credential wallet', 'Give recipients a branded portal to access, download and share everything you have issued them.', 'See the wallet', 'tint-mint', 'wallet'],
  ], ([href, t, p, cta, tint, m]) => `<a class="card" href="${href}">
    <div class="card-media ${tint}" style="aspect-ratio:16/11">${m === 'wallet' ? ui.walletMock(3) : mock(m)}</div>
    <div class="card-body"><h2 class="h4">${t}</h2><p class="muted">${p}</p><span class="link-arrow">${cta}${icon('arrowRight', 16)}</span></div>
  </a>`)}
</div></div></section>

<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'The complete credential management platform', lead: `${esc(site.name)} automates every step of the credential journey, from first design to the thousandth verification.` })}
  <div class="tabs" data-tabs>
    <div class="tab-list" role="tablist" aria-label="Platform steps">
      ${join(tabs, ([t, d], i) => `<button class="tab-btn" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t}<small>${d}</small></button>`)}
    </div>
    <div>
      ${join(tabs, ([t, d, m, tint], i) => `<div class="tab-panel${i === 0 ? ' is-active' : ''}" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}"><div class="tab-stage ${tint}">${mock(m)}</div></div>`)}
    </div>
  </div>
</div></section>

<section class="section"><div class="container">
  ${sectionHead({ title: 'Generate credentials for any program', lead: 'Create, send, export and host credentials in bulk — whether you issue ten or ten thousand.' })}
  <div class="grid-3">
    ${join([
      ['send', 'tint-peach', 'Send credentials in bulk', 'Personalize and deliver credentials to every recipient at once. Automatic, reliable and error-free.'],
      ['pdf', 'tint-lav', 'Export PDFs instantly', 'Download individual or merged print-ready PDFs for archives, mailings and physical ceremonies.'],
      ['url', 'tint-mint', 'Share unique URLs', 'Every credential has its own link, so recipients can access it anytime and employers can verify it.'],
    ], ([art, tint, t, p]) => `<div class="card"><div class="card-media ${tint}">${bulkArt(art)}</div><div class="card-body"><h3 class="h4">${t}</h3><p class="muted">${p}</p></div></div>`)}
  </div>
  <div class="grid-2 mt-24">
    <div class="card"><div class="card-media tint-sky" style="aspect-ratio:16/8">${mock('security')}</div><div class="card-body"><h3 class="h4">Enterprise-grade security</h3><p class="muted">Encryption in transit and at rest, SSO, granular permissions and audit logs keep your data and your recipients’ data safe.</p>${linkArrow('Security & compliance', '/legal-and-security')}</div></div>
    <div class="card"><div class="card-media tint-butter" style="aspect-ratio:16/8">${mock('hosting')}</div><div class="card-body"><h3 class="h4">Unlimited credential hosting</h3><p class="muted">Every credential you issue stays online for free, forever. Recipients never lose access, even years later.</p>${linkArrow('How hosting works', '/features/generator')}</div></div>
  </div>
  <div class="btn-row btn-row--center mt-48">${btn('Book a free demo', site.demoUrl, 'primary', { size: 'lg' })}${linkArrow('Generate certificates', '/features/generator')}</div>
</div></section>

<section class="section bg-sky"><div class="container">
  ${sectionHead({ eyebrow: 'Customer stories', title: 'Teams that switched never looked back' })}
  ${ui.testimonials(testimonials)}
  <div class="btn-row btn-row--center mt-32">${btn('Read more customer stories', '/customers', 'primary')}</div>
</div></section>

<section class="section"><div class="container"><div class="split">
  <div class="split-copy">
    <span class="eyebrow">Design builder</span>
    <h2 class="h2">Create professional designs in minutes</h2>
    <p class="lead">Start from a template or a blank canvas. Add your logo, colors and signatures, then insert dynamic fields that personalize every credential.</p>
    ${checklist(['Hundreds of ready-made templates', 'Edit text, fonts and colors freely', 'Upload your own backgrounds and artwork', 'Add QR codes, IDs and dynamic attributes'])}
    <div class="btn-row mt-8">${btn('Book a demo', site.demoUrl, 'primary')}${linkArrow('Contact our team', '/contact')}</div>
  </div>
  <div class="split-media tint-butter" style="border-radius:24px;padding:clamp(20px,4vw,44px)">${mock('editor')}</div>
</div></div></section>

<section class="section bg-beige"><div class="container">
  ${sectionHead({ eyebrow: 'Integrations', title: 'Connect your LMS, CRM or forms. Every integration included.', lead: 'Issue credentials automatically from the tools you already use — or build your own with our API and MCP server.' })}
  <div class="int-cloud int-cloud--centered">
    ${join(integrations.slice(0, 8), integrationTile)}
    <div class="int-tile int-hub int-hub--center"><span class="brand">${ui.logoMark(34, '#fff')}${esc(site.name)}</span></div>
    ${join(integrations.slice(8, 20), integrationTile)}
  </div>
  <div class="btn-row btn-row--center mt-48">${btn('See all integrations', '/integrations', 'primary')}${linkArrow('Explore the API', '/developers')}</div>
</div></section>

<section class="section"><div class="container"><div class="split split--rev">
  <div class="split-copy">
    <span class="eyebrow">Branding</span>
    <h2 class="h2">Make every touchpoint unmistakably yours</h2>
    <p class="lead">From the delivery email to the credential page and wallet, recipients see your brand — not ours.</p>
    ${checklist(['Custom domain for credential pages', 'Branded emails from your own sender', 'White-label recipient wallet', 'Your fonts, colors and logo everywhere'])}
    <div class="btn-row mt-8">${btn('See Enterprise', '/enterprise', 'primary')}${linkArrow('Compare plans', '/pricing')}</div>
  </div>
  <div class="split-media tint-lav" style="border-radius:24px;padding:clamp(20px,4vw,44px)">${mock('wallet')}</div>
</div></div></section>

<section class="section bg-sand"><div class="container">
  ${sectionHead({ title: 'Real, measurable benefits of automation', lead: 'What changes when credentials stop being a manual chore.' })}
  <div class="benefits">
    <div class="acc" data-accordion data-linked="benefit-stage">
      ${join(benefits, ([ic, t, p], i) => `<div class="acc-item${i === 0 ? ' is-open' : ''}">
        <h3><button class="acc-btn" aria-expanded="${i === 0}"><span class="row"><span class="b-ico">${icon(ic, 22)}</span>${t}</span><span class="pm">${icon('plus', 16)}</span></button></h3>
        <div class="acc-panel"><div class="acc-inner"><div><p>${p}</p></div></div></div>
      </div>`)}
    </div>
    <div id="benefit-stage">
      ${join(benefits, ([, , , m, tint], i) => `<div class="benefit-art${i === 0 ? ' is-active' : ''}"><div class="benefit-stage ${tint}">${mock(m)}</div></div>`)}
    </div>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="section-head section-head--row">
    <div class="stack"><span class="eyebrow">Templates</span><h2 class="h2">Templates designed for you</h2><p class="lead">Hundreds of certificate, badge and document templates — free to customize.</p></div>
    ${linkArrow('See all templates', '/certificate-templates')}
  </div>
  <div class="tpl-grid">
    ${join(certificateTemplates.filter((_, i) => i % 3 === 0).slice(0, 8), ({ name, ...t }) => `<a class="tpl-card" href="/certificate-templates#${t.id}"><div class="tpl-thumb">${certSVG(t)}</div><div class="tpl-meta"><h3>${esc(name)}</h3>${t.pro ? '<span class="tag tag--purple">Pro</span>' : '<span class="tag tag--gray">Free</span>'}</div></a>`)}
  </div>
  <div class="btn-row btn-row--center mt-48">${btn('Ask about issuing certificates', '/contact', 'primary', { size: 'lg' })}${linkArrow('Browse badge templates', '/badge-templates')}</div>
</div></section>

<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'Advanced features in a simple package', lead: `Everything growing programs need, without the complexity. <a class="text-link" href="/features">See all features</a>.` })}
  <div class="grid-3">
    ${join(advanced, ([ic, t, p]) => `<div class="card-flat"><span class="icon-tile">${icon(ic, 22)}</span><h3 class="h5">${t}</h3><p class="muted">${p}</p></div>`)}
  </div>
</div></section>

${ui.faqSection(homeFaq, { title: 'Still have questions? We have answers', cls: '' })}

<section class="section bg-beige"><div class="container">
  <div class="section-head section-head--row">
    <div class="stack"><span class="eyebrow">Blog</span><h2 class="h2">Guides and ideas from our team</h2></div>
    ${linkArrow('Visit the blog', '/blog')}
  </div>
  <div class="grid-3">
    ${join(posts.slice(0, 3), (p) => `<a class="post-card" href="/blog/${p.slug}">${ui.postCover(p)}<div class="post-meta"><span class="tag tag--gray">${esc(p.category)}</span><span>${esc(p.read)} read</span></div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></a>`)}
  </div>
</div></section>

${ui.ctaBand({ title: 'Ready to issue your first credential?' })}
`;

module.exports = [{
  path: '/',
  title: 'Digital Certificate & Badge Maker',
  description: `Create, send, track and verify digital certificates and badges at scale with ${site.name}. Free plan available.`,
  body,
}];
