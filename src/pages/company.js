// Integrations, enterprise, developers, AI generator, about, contact, demo, changelog, affiliate.
const ui = require('../ui');
const { icon, esc, join, btn, linkArrow, breadcrumb, sectionHead, checklist, certSVG } = ui;
const { mock } = require('./shared');
const { integrations, testimonials, changelog, team } = require('../data/content');
const site = require('../site');

const field = (id, label, { type = 'text', required = true, placeholder = '', err = 'This field is required', attrs = '' } = {}) =>
  `<div class="field"><label for="${id}">${label}${required ? '' : ' <span class="subtle">(optional)</span>'}</label><input class="input" id="${id}" name="${id}" type="${type}" placeholder="${esc(placeholder)}" ${required ? 'required' : ''} ${attrs}><span class="err">${err}</span></div>`;
const selectField = (id, label, options) =>
  `<div class="field"><label for="${id}">${label}</label><select class="select" id="${id}" name="${id}" required style="height:46px"><option value="">Select…</option>${join(options, (o) => `<option>${esc(o)}</option>`)}</select><span class="err">Please choose an option</span></div>`;

/* Integrations ------------------------------------------------------------------ */
const intCats = [...new Set(integrations.map((i) => i.category))];
const integrationsPage = {
  path: '/integrations',
  title: 'Integrations',
  description: `Connect ${site.name} to your LMS, CRM, forms, events and automation tools.`,
  body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Integrations' }])}</div>
<section class="hero hero--center" style="padding:40px 0"><div class="container"><div class="hero-copy">
  <span class="pill">${icon('plug', 14)} Integrations</span>
  <h1 class="h1 h1--sm">Connect the tools you already use</h1>
  <p class="lead">Issue credentials automatically from your LMS, CRM, forms and event platforms. Every integration is included on paid plans.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container" data-filter>
  <div class="toolbar">
    <div class="chips" role="group" aria-label="Filter by category">
      <button class="chip is-active" data-filter-value="all" aria-pressed="true">All</button>
      ${join(intCats, (c) => `<button class="chip" data-filter-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`)}
    </div>
    <label class="search"><span class="sr-only">Search integrations</span>${icon('search', 18)}<input class="input" type="search" placeholder="Search integrations" data-filter-search></label>
  </div>
  <div class="grid-3" style="gap:16px">
    ${join(integrations, (i) => `<div class="f-card" data-item data-category="${esc(i.category)}" data-name="${esc(i.name + ' ' + i.category)}">
      <div class="row" style="justify-content:space-between">${ui.intLogo(i)}<span class="tag tag--gray">${esc(i.category)}</span></div>
      <h2 class="h5" style="margin-top:6px">${esc(i.name)}</h2><p>${esc(i.desc)}</p>
      ${i.category === 'Developer' ? linkArrow('View docs', '/developers') : linkArrow('Contact us', '/contact')}
    </div>`)}
  </div>
  <div class="empty" data-empty><p class="h4">No integration found</p><p class="mt-8">Connect it through Zapier, Make or our API — or <a class="text-link" href="/contact">request it</a>. <button class="text-link" data-filter-reset>Clear search</button></p></div>
</div></section>
<section class="section bg-beige"><div class="container"><div class="split">
  <div class="split-copy">
    <span class="eyebrow">Developers</span>
    <h2 class="h2">Build your own integration</h2>
    <p class="lead">Use the REST API, webhooks or our MCP server to issue and manage credentials from any system — or from an AI assistant.</p>
    ${checklist(['Create, send and update credentials', 'Real-time webhooks for every event', 'Scoped API keys per workspace'])}
    <div class="btn-row mt-8">${btn('Explore the API', '/developers', 'primary')}${linkArrow('Request an integration', '/contact')}</div>
  </div>
  <div class="split-media">${codeSample()}</div>
</div></div></section>
${ui.ctaBand()}`,
};

function codeSample(id = 'code-1') {
  return `<div style="position:relative"><button class="btn btn--sm btn--outline-white" style="position:absolute;right:12px;top:12px" data-copy="${id}">${icon('pages', 14)} Copy</button><pre class="code" id="${id}"><span class="c"># Issue a credential</span>
curl https://api.${site.domain}/v1/credentials \\
  -H <span class="s">"Authorization: Bearer $API_KEY"</span> \\
  -H <span class="s">"Content-Type: application/json"</span> \\
  -d <span class="s">'{
    "groupId": "grp_spring_cohort",
    "recipient": {
      "name": "Amara Okafor",
      "email": "amara@northwind.edu"
    },
    "attributes": { "course.hours": 24 },
    "send": true
  }'</span></pre></div>`;
}

/* Developers ------------------------------------------------------------------ */
const developers = {
  path: '/developers',
  title: 'API & MCP Server',
  description: `Issue and manage credentials programmatically with the ${site.name} REST API, webhooks and MCP server.`,
  body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Integrations', href: '/integrations' }, { label: 'API & MCP' }])}</div>
<section class="hero"><div class="container hero-grid">
  <div class="hero-copy">
    <span class="pill">${icon('code', 14)} For developers</span>
    <h1 class="h1 h1--sm">Credentials as an API</h1>
    <p class="lead">Create, send, verify and analyze credentials from your product, your data pipeline or your AI assistant.</p>
    <div class="btn-row">${btn('Request an API key', '/contact', 'primary', { size: 'lg' })}${btn('Talk to an engineer', '/contact', 'secondary', { size: 'lg' })}</div>
  </div>
  <div>${codeSample('code-hero')}</div>
</div></section>
<section class="section--sm"><div class="container"><div class="grid-3">
  ${join([
    ['code', 'REST API', 'Predictable, resource-oriented endpoints for credentials, groups, designs and recipients.'],
    ['bell', 'Webhooks', 'Subscribe to issued, delivered, opened, shared and verified events in real time.'],
    ['sparkles', 'MCP server', 'Give AI assistants scoped tools to issue credentials and look up records safely.'],
  ], ([ic, t, p]) => `<div class="card-bordered"><span class="icon-tile">${icon(ic, 22)}</span><h2 class="h4">${t}</h2><p class="muted">${p}</p></div>`)}
</div></div></section>
<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'Core endpoints', align: 'left' })}
  <div class="compare-wrap"><table class="compare">
    <thead><tr><th scope="col" style="text-align:left">Endpoint</th><th scope="col" style="text-align:left">Description</th></tr></thead>
    <tbody>
      ${join([
        ['POST /v1/credentials', 'Create (and optionally send) a credential'],
        ['GET /v1/credentials/:id', 'Retrieve a credential and its status'],
        ['PATCH /v1/credentials/:id', 'Update attributes — the hosted page updates instantly'],
        ['POST /v1/credentials/:id/revoke', 'Revoke a credential with a reason'],
        ['GET /v1/groups', 'List groups and their designs'],
        ['GET /v1/analytics', 'Engagement metrics for any date range'],
      ], ([e, d]) => `<tr><td style="text-align:left"><code style="font-family:ui-monospace,Consolas,monospace;font-size:14px">${e}</code></td><td style="text-align:left" class="muted">${d}</td></tr>`)}
    </tbody>
  </table></div>
</div></section>
${ui.ctaBand({ title: 'Ship credentials in your product', primary: ['Request an API key', '/contact'], secondary: ['Contact us', '/contact'] })}`,
};

/* Enterprise ------------------------------------------------------------------ */
const enterprise = {
  path: '/enterprise',
  title: 'Enterprise',
  description: `${site.name} for enterprise: SSO, custom domains, data residency, SLAs and dedicated support.`,
  body: `
<section class="hero"><div class="container hero-grid">
  <div class="hero-copy">
    <span class="pill">${icon('building', 14)} ${esc(site.name)} for Enterprise</span>
    <h1 class="h1">Credentials at enterprise scale</h1>
    <p class="lead">Security, control and support for organizations issuing hundreds of thousands of credentials across teams and regions.</p>
    ${checklist(['SSO / SAML and SCIM provisioning', 'Custom domain and full white-labelling', 'Dedicated success manager and SLA'], 'checklist--ink')}
    <div class="btn-row">${btn('Talk to sales', site.demoUrl, 'primary', { size: 'lg' })}${btn('See pricing', '/pricing', 'secondary', { size: 'lg' })}</div>
  </div>
  <div class="tint-sky" style="border-radius:24px;padding:clamp(20px,4vw,44px)">${mock('analytics')}</div>
</div></section>
${ui.logoWall('Enterprise teams that issue with us', 12)}
<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'Built for security and compliance teams', lead: 'Everything your IT, legal and procurement reviewers will ask about.' })}
  <div class="grid-3">
    ${join([
      ['key', 'Single sign-on', 'SAML 2.0 SSO with Okta, Azure AD, Google Workspace and more.'],
      ['users', 'Roles & permissions', 'Granular access per workspace, group and action.'],
      ['fileText', 'Audit logs', 'Every action recorded and exportable for compliance.'],
      ['globe', 'Data residency', 'Store data in the EU or the US.'],
      ['lock', 'Encryption', 'TLS in transit and AES-256 encryption at rest.'],
      ['shield', 'Security reviews', 'We complete questionnaires and sign DPAs.'],
    ], ([ic, t, p]) => `<div class="card-flat"><span class="icon-tile">${icon(ic, 22)}</span><h3 class="h5">${t}</h3><p class="muted">${p}</p></div>`)}
  </div>
</div></section>
<section class="section"><div class="container">
  <div class="split"><div class="split-copy">
    <span class="eyebrow">White label</span><h2 class="h2">Your brand, end to end</h2>
    <p class="lead">Credential pages, wallet and emails on your domain with your design system — recipients never see ours.</p>
    ${checklist(['credentials.yourcompany.com', 'Custom email sending domain', 'Custom CSS and fonts'])}
  </div><div class="split-media tint-lav" style="border-radius:24px;padding:clamp(20px,4vw,44px)">${mock('wallet')}</div></div>
  <div class="split split--rev"><div class="split-copy">
    <span class="eyebrow">Scale</span><h2 class="h2">Multiple teams, one platform</h2>
    <p class="lead">Separate workspaces for departments, brands or regions with central billing and governance.</p>
    ${checklist(['Unlimited workspaces', 'Central admin and billing', 'API keys per workspace'])}
  </div><div class="split-media tint-mint" style="border-radius:24px;padding:clamp(20px,4vw,44px)">${mock('send')}</div></div>
</div></section>
<section class="section bg-sky"><div class="container">${ui.testimonials([testimonials[2], testimonials[0], testimonials[3]])}</div></section>
<section class="section"><div class="container"><div class="split split--even">
  <div class="split-copy">
    <h2 class="h2">Let’s talk about your program</h2>
    <p class="lead">Tell us a little about your needs and we’ll put together a tailored walkthrough and quote.</p>
    ${checklist(['Personalized demo with a product expert', 'Volume pricing and custom terms', 'Security and procurement support'])}
  </div>
  <div class="btn-row">${btn('Book a demo', site.demoUrl, 'primary', { size: 'lg' })}</div>
</div></div></section>`,
};

const demo = {
  path: '/request-a-demo',
  title: 'Book a demo',
  description: `See ${site.name} in action with a personalized product walkthrough.`,
  redirectTo: site.demoUrl,
  bare: true,
  body: `<section class="section"><div class="container center"><h1 class="h2">Opening Calendly…</h1><p class="lead">If Calendly does not open automatically, <a class="text-link" href="${site.demoUrl}">continue to book your demo</a>.</p></div></section>`,
};

/* AI generator ------------------------------------------------------------------ */
const styles = ['modern', 'classic', 'geo', 'ribbon', 'minimal', 'wave'];
const colors = { blue: '#0b65ad', navy: '#0a3260', green: '#0e7a6b', purple: '#7a4ee0', pink: '#d9468f', orange: '#f07b2d', red: '#c1121f', teal: '#0e9aa7', black: '#161616' };
const aiPage = {
  path: '/free-ai-certificate-generator',
  title: 'Free AI Certificate Generator',
  description: 'Describe the certificate you need and get a ready-to-use design in seconds. Free, no sign-up required.',
  body: `
<section class="hero hero--center" style="padding-bottom:32px"><div class="container"><div class="hero-copy">
  <span class="pill">${icon('sparkles', 14)} Free tool · No sign-up</span>
  <h1 class="h1 h1--sm">Certificate generator</h1>
  <p class="lead">Describe the certificate you need — the occasion, style and colors — and get a ready-to-use design in seconds.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container" data-ai>
  <div class="ai-box">
    <div class="ai-input">
      <label class="sr-only" for="ai-prompt">Describe your certificate</label>
      <textarea class="textarea" id="ai-prompt" data-ai-input placeholder="e.g. An elegant navy certificate of completion for a Python bootcamp"></textarea>
      <button class="btn btn--primary btn--lg" data-ai-go>${icon('sparkles', 18)} Generate</button>
    </div>
    <div class="ai-suggest"><span class="small subtle" style="align-self:center">Try:</span>
      ${join(['Modern purple certificate for a UX design workshop', 'Classic award of excellence for the sales team', 'Playful orange certificate of attendance for a kids coding camp', 'Minimal black training certificate in cloud security'], (s) => `<button data-ai-suggest>${s}</button>`)}
    </div>
  </div>
  <div class="ai-result mt-32">
    <div class="ai-preview" data-ai-preview><div data-ai-svg style="width:100%"></div><span class="spinner" aria-hidden="true"></span></div>
    <div class="ai-controls">
      <div class="field"><label>Style</label><div class="style-opts">${join(styles, (s) => `<button data-style-opt="${s}">${s[0].toUpperCase() + s.slice(1)}</button>`)}</div></div>
      <div class="field"><label>Color</label><div class="color-opts">${join(Object.entries(colors), ([n, c]) => `<button data-color-opt="${n}" style="background:${c}" aria-label="${n}"></button>`)}</div></div>
      <div class="field"><label for="ai-name">Recipient name</label><input class="input" id="ai-name" data-ai-field="name"></div>
      <div class="field"><label for="ai-course">Course or achievement</label><input class="input" id="ai-course" data-ai-field="course"></div>
      <div class="field"><label for="ai-date">Date</label><input class="input" id="ai-date" data-ai-field="date" value="May 14, 2026"></div>
      <div class="btn-row">
        <button class="btn btn--secondary" data-ai-download>${icon('download', 16)} Download SVG</button>
        <a class="btn btn--primary" href="/contact">Ask about issuing${icon('arrowRight', 16)}</a>
      </div>
      <p class="small subtle">Want to send this to hundreds of people? <a class="text-link" href="/contact">Talk to our team about bulk issuing.</a></p>
    </div>
  </div>
  ${join(styles, (s) => `<template id="ai-tpl-${s}">${certSVG({ style: s, accent: '#0b65ad', accent2: '#ffb547' })}</template>`)}
</div></section>
<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'How it works' })}
  <div class="steps">${join([['Describe it', 'Type the occasion, style and colors you want in plain language.'], ['Refine it', 'Tweak the style, colors and text until it’s just right.'], ['Send it', 'Download your design, or contact our team to issue it in bulk.']], ([t, p], i) => `<div class="step"><span class="step-num">${i + 1}</span><h3 class="h4">${t}</h3><p class="muted">${p}</p></div>`)}</div>
</div></section>
${ui.ctaBand({ title: 'Ready to send it to your recipients?', primary: ['Talk to our team', '/contact'], secondary: ['Browse templates', '/certificate-templates'] })}`,
};

/* About ------------------------------------------------------------------ */
const about = {
  path: '/about',
  title: 'About us',
  description: `${site.name} helps organizations recognize achievement with verifiable digital credentials.`,
  body: `
<section class="hero hero--center"><div class="container"><div class="hero-copy">
  <span class="pill">About ${esc(site.name)}</span>
  <h1 class="h1">Every achievement deserves to be seen</h1>
  <p class="lead">We build software that makes it effortless to recognize learning — and for that recognition to travel with people throughout their careers.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container"><div class="grid-4">
  ${join([['2019', 'Founded'], ['40+', 'Countries'], ['5M+', 'Credentials issued'], ['35', 'Team members']], ([n, l]) => `<div class="card-flat" style="background:var(--beige)"><span class="stat-num">${n}</span><span class="stat-label">${l}</span></div>`)}
</div></div></section>
<section class="section"><div class="container"><div class="split">
  <div class="split-copy">
    <span class="eyebrow">Our story</span>
    <h2 class="h2">From a weekend fix to a global platform</h2>
    <p class="lead">${esc(site.name)} started when our founders spent a weekend hand-making certificates for a coding bootcamp. There had to be a better way.</p>
    <p class="muted">Today, schools, training providers, event organizers and companies use ${esc(site.name)} to issue certificates and badges that are beautiful, verifiable and easy to share. We’re a remote-first team that cares about craft, clarity and the people who receive what our customers send.</p>
  </div>
  <div class="split-media tint-peach" style="border-radius:24px;padding:clamp(20px,4vw,44px)">${mock('certs')}</div>
</div></div></section>
<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'What we value' })}
  <div class="grid-3">${join([
    ['heart', 'Recipients first', 'Every decision starts with the person receiving the credential.'],
    ['sparkles', 'Simple by default', 'Powerful features that never feel complicated.'],
    ['shield', 'Trust is earned', 'Security, privacy and honesty in everything we ship.'],
  ], ([ic, t, p]) => `<div class="card-flat"><span class="icon-tile">${icon(ic, 22)}</span><h3 class="h4">${t}</h3><p class="muted">${p}</p></div>`)}</div>
</div></section>
<section class="section"><div class="container">
  ${sectionHead({ title: 'Meet the team', lead: 'A small, distributed team building the future of credentials.' })}
  <div class="team">${join(team, ([n, r, tint]) => `<div class="member"><div class="photo" style="background:${tint}">${ui.initials(n)}</div><b>${esc(n)}</b><span>${esc(r)}</span></div>`)}</div>
</div></section>
<section class="section--sm"><div class="container"><div class="card-bordered" style="text-align:center;justify-items:center;padding:48px;background:var(--sky);border:0">
  <h2 class="h3">Want to work with us?</h2><p class="muted">We’re always happy to meet thoughtful people. Send us a note and tell us what you’d like to build.</p>
  ${btn('Get in touch', '/contact', 'primary')}
</div></div></section>
${ui.ctaBand()}`,
};

/* Contact ------------------------------------------------------------------ */
const contact = {
  path: '/contact',
  title: 'Contact us',
  description: `Get in touch with the ${site.name} team for sales, support or partnerships.`,
  body: `
<section class="hero hero--center" style="padding-bottom:40px"><div class="container"><div class="hero-copy">
  <h1 class="h1 h1--sm">How can we help?</h1>
  <p class="lead">Questions about the product, pricing or partnerships? We usually reply within a few hours on business days.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container">
  <div class="contact-cards">
    ${join([
      ['briefcase', 'Sales', 'Talk about plans, volume pricing and security.', ['Book a demo', site.demoUrl]],
      ['headset', 'Support', `Help with your account at ${site.supportEmail}.`, ['Email support', `mailto:${site.supportEmail}`]],
      ['users', 'Partnerships', 'Integrations, resellers and affiliates.', ['Affiliate program', '/affiliate']],
    ], ([ic, t, p, [l, h]]) => `<div class="card-bordered"><span class="icon-tile">${icon(ic, 22)}</span><h2 class="h4">${t}</h2><p class="muted">${esc(p)}</p>${linkArrow(l, h)}</div>`)}
  </div>
  <div class="split split--even mt-64" style="align-items:start">
    <div class="split-copy">
      <h2 class="h2">Send us a message</h2>
      <p class="lead">Fill in the form and the right person will get back to you.</p>
      <div class="stack mt-16">
        <div class="row">${icon('mail', 20)}<a class="text-link" href="mailto:${site.email}">${site.email}</a></div>
        <div class="row">${icon('mapPin', 20)}<span class="muted">${esc(site.address)}</span></div>
        <div class="row">${icon('phone', 20)}<a class="text-link" href="tel:+2349128115310">${esc(site.phone)}</a></div>
        <div class="row">${icon('phone', 20)}<a class="text-link" href="https://wa.me/2348120466258">${esc(site.whatsapp)} · WhatsApp</a></div>
        <div class="row">${icon('clock', 20)}<span class="muted">${esc(site.businessHours)}</span></div>
      </div>
    </div>
    <div class="form-card">
      <form class="form" data-form>
        <div class="form-row">${field('c-name', 'Name')}${field('c-email', 'Email', { type: 'email', err: 'Enter a valid email address' })}</div>
        ${selectField('c-topic', 'Topic', ['Sales question', 'Product support', 'Billing', 'Partnerships', 'Press', 'Something else'])}
        <div class="field"><label for="c-msg">Message</label><textarea class="textarea" id="c-msg" name="message" required minlength="10"></textarea><span class="err">Please write at least 10 characters</span></div>
        <label class="check"><input type="checkbox" required> <span>I agree to the <a class="text-link" href="/privacy">privacy policy</a>.</span></label>
        <button class="btn btn--primary btn--lg btn--block" type="submit">Send message</button>
      </form>
      <div class="form-success"><span class="ok">${icon('check', 28)}</span><h3 class="h4">Message received</h3><p class="muted">Thanks for reaching out. We’ll reply to <b data-sent-email></b> shortly.</p><button class="btn btn--secondary btn--sm" data-form-again>Send another message</button></div>
    </div>
  </div>
</div></section>`,
};

/* Changelog ------------------------------------------------------------------ */
const tagCls = { New: 'tag--green', Improved: '', Fixed: 'tag--orange' };
const changelogPage = {
  path: '/changelog',
  title: 'Changelog',
  description: `New features and improvements in ${site.name}.`,
  body: `
<section class="hero hero--center" style="padding-bottom:40px"><div class="container"><div class="hero-copy">
  <span class="pill">${icon('rocket', 14)} Changelog</span>
  <h1 class="h1 h1--sm">What’s new</h1>
  <p class="lead">New features, improvements and fixes — shipped every few weeks.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container container--narrow"><div class="timeline">
  ${join(changelog, (r, i) => `<article class="release" id="release-${i}">
    <div class="release-date"><span>${esc(r.date)}</span><span class="tag ${tagCls[r.tag] || ''}" style="justify-self:start">${esc(r.tag)}</span></div>
    <div class="release-body">
      <h2 class="h3">${esc(r.title)}</h2>
      <div class="release-art ${['tint-sky', 'tint-lav', 'tint-peach', 'tint-mint', 'tint-butter'][i % 5]}"><span class="icon-tile" style="width:64px;height:64px;border-radius:18px;background:#fff">${icon(r.art, 30)}</span></div>
      <ul>${join(r.items, ([t, d]) => `<li><span class="tag ${tagCls[t] || ''}">${t}</span><span>${esc(d)}</span></li>`)}</ul>
    </div>
  </article>`)}
</div></div></section>
${ui.ctaBand({ title: 'Try the latest features', lead: 'Everything above is live today. Start free and see for yourself.' })}`,
};

/* Affiliate ------------------------------------------------------------------ */
const affiliate = {
  path: '/affiliate',
  title: 'Affiliate Program',
  description: `Earn recurring commission by referring customers to ${site.name}.`,
  body: `
<section class="hero"><div class="container hero-grid">
  <div class="hero-copy">
    <span class="pill">${icon('gift', 14)} Affiliate program</span>
    <h1 class="h1">Earn 30% recurring commission</h1>
    <p class="lead">Recommend ${esc(site.name)} to your audience and earn 30% of every payment for the first 12 months.</p>
    <div class="btn-row">${btn('Apply now', '#apply', 'primary', { size: 'lg' })}${btn('Read the FAQ', '#faq', 'secondary', { size: 'lg' })}</div>
  </div>
  <div class="tint-butter" style="border-radius:24px;padding:40px;display:grid;gap:16px">
    ${join([['30%', 'Recurring commission for 12 months'], ['90 days', 'Cookie window'], ['Monthly', 'Payouts via PayPal or bank transfer']],([n, l]) => `<div class="card-flat" style="padding:20px"><span class="stat-num" style="font-size:34px">${n}</span><span class="small muted">${l}</span></div>`)}
  </div>
</div></section>
<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'How it works' })}
  <div class="steps">${join([['Apply', 'Fill in the short form below. We review applications within two business days.'], ['Share', 'Use your unique link in content, newsletters, courses or client work.'], ['Earn', 'Get 30% of every payment your referrals make for 12 months.']], ([t, p], i) => `<div class="step"><span class="step-num">${i + 1}</span><h3 class="h4">${t}</h3><p class="muted">${p}</p></div>`)}</div>
</div></section>
<section class="section" id="apply"><div class="container"><div class="split split--even" style="align-items:start">
  <div class="split-copy"><h2 class="h2">Who it’s for</h2><p class="lead">Educators, consultants, LMS experts, agencies and creators whose audiences issue certificates.</p>${checklist(['Course creators and education bloggers', 'L&D and HR consultants', 'Agencies building learning platforms', 'Event and community organizers'])}</div>
  <div class="form-card">
    <form class="form" data-form>
      ${field('af-name', 'Full name')}
      ${field('af-email', 'Email', { type: 'email', err: 'Enter a valid email address' })}
      ${field('af-site', 'Website or profile URL', { type: 'url', err: 'Enter a URL starting with https://', placeholder: 'https://' })}
      <div class="field"><label for="af-how">How will you promote ${esc(site.name)}?</label><textarea class="textarea" id="af-how" required></textarea><span class="err">Tell us briefly how you’ll promote us</span></div>
      <label class="check"><input type="checkbox" required> <span>I agree to the <a class="text-link" href="/terms">affiliate terms</a>.</span></label>
      <button class="btn btn--primary btn--lg btn--block" type="submit">Submit application</button>
    </form>
    <div class="form-success"><span class="ok">${icon('check', 28)}</span><h3 class="h4">Application received</h3><p class="muted">We’ll review it and email <b data-sent-email></b> within two business days.</p></div>
  </div>
</div></div></section>
<div id="faq">${ui.faqSection([
  { q: 'How much can I earn?', a: '<p>You earn 30% of every payment a referred customer makes during their first 12 months, including upgrades.</p>' },
  { q: 'When do I get paid?', a: '<p>Payouts are made monthly once your balance reaches $50.</p>' },
  { q: 'Can I refer my own clients?', a: '<p>Yes — agencies and consultants often refer the organizations they work with.</p>' },
], { title: 'Affiliate FAQ' })}</div>`,
};

/* 404 ------------------------------------------------------------------ */
const notFound = {
  path: '/404',
  title: 'Page not found',
  body: `<section class="section"><div class="container center" style="display:grid;gap:20px;justify-items:center">
    <div style="width:min(360px,80vw)">${certSVG({ style: 'geo', title: 'Certificate', subtitle: 'of Getting Lost', name: 'You', line: 'for finding a page that does not exist', course: 'Error 404' })}</div>
    <h1 class="h1 h1--sm">We couldn’t find that page</h1>
    <p class="lead">The link may be broken or the page may have moved.</p>
    <div class="btn-row btn-row--center">${btn('Go to homepage', '/', 'primary', { size: 'lg' })}${btn('Contact support', '/contact', 'secondary', { size: 'lg' })}</div>
  </div></section>`,
};

module.exports = [integrationsPage, developers, enterprise, demo, aiPage, about, contact, changelogPage, affiliate, notFound];
