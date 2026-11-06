const ui = require('../ui');
const { icon, esc, join, btn, breadcrumb, sectionHead, certSVG, badgeSVG, docSVG } = ui;
const { certificateTemplates, badgeTemplates, documentTemplates } = require('../data/content');
const site = require('../site');

// A template's display name must not override the sample recipient name on the artwork.
const art = ({ name, ...opts }) => opts;

const KINDS = {
  certificate: { path: '/certificate-templates', label: 'Certificates', items: certificateTemplates, render: certSVG, thumb: '' },
  badge: { path: '/badge-templates', label: 'Badges', items: badgeTemplates, render: badgeSVG, thumb: 'tpl-thumb--badge' },
  document: { path: '/document-templates', label: 'Documents', items: documentTemplates, render: docSVG, thumb: 'tpl-thumb--doc' },
};

const previewModal = `<div class="modal" id="preview" data-modal role="dialog" aria-modal="true" aria-labelledby="preview-title">
  <div class="modal-backdrop" data-close></div>
  <div class="modal-dialog">
    <button class="modal-close" aria-label="Close" data-close>${icon('close', 20)}</button>
    <div class="modal-head"><span class="eyebrow" data-preview-cat></span><h2 class="h3" id="preview-title" data-preview-title></h2></div>
    <div class="modal-body">
      <div class="tpl-thumb" style="aspect-ratio:auto;padding:clamp(16px,4vw,40px)"><div data-preview-slot style="width:100%;max-width:640px;display:grid;place-items:center"></div></div>
      <div class="btn-row mt-24" style="justify-content:space-between">
        <span class="small muted">Fully editable · Add your logo, colors and dynamic fields</span>
        <div class="btn-row"><button class="btn btn--secondary" data-close>Keep browsing</button><a class="btn btn--primary" href="/contact" data-preview-use>Ask about this template${icon('arrowRight', 16)}</a></div>
      </div>
    </div>
  </div>
</div>`;

function gallery(kind, { title, lead, faq }) {
  const k = KINDS[kind];
  const cats = [...new Set(k.items.map((t) => t.category))];
  const steps = [
    ['Pick a template', 'Choose a design and open it in the editor — it’s free.'],
    ['Make it yours', 'Add your logo, colors, signatures and dynamic fields.'],
    ['Issue in bulk', 'Upload recipients and send hundreds of credentials at once.'],
  ];
  return `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Templates' }, { label: k.label }])}</div>
<section class="hero hero--center" style="padding:40px 0 40px"><div class="container"><div class="hero-copy">
  <h1 class="h1 h1--sm">${title}</h1>
  <p class="lead">${lead}</p>
  <nav class="chip-tabs" aria-label="Template types">${join(Object.values(KINDS), (o) => `<a href="${o.path}" class="${o === k ? 'is-active' : ''}" ${o === k ? 'aria-current="page"' : ''}>${o.label}</a>`)}</nav>
</div></div></section>

<section class="section--sm section--flush-top"><div class="container" data-filter>
  <div class="toolbar">
    <div class="chips" role="group" aria-label="Filter by category">
      <button class="chip is-active" data-filter-value="all" aria-pressed="true">All</button>
      ${join(cats, (c) => `<button class="chip" data-filter-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`)}
    </div>
    <label class="search"><span class="sr-only">Search templates</span>${icon('search', 18)}<input class="input" type="search" placeholder="Search templates" data-filter-search></label>
  </div>
  <p class="small muted" style="margin:-12px 0 20px"><span data-count>${k.items.length}</span> templates</p>
  <div class="tpl-grid">
    ${join(k.items, (t) => `<article class="tpl-card" id="${t.id}" data-item data-category="${esc(t.category)}" data-name="${esc(t.name + ' ' + t.category)}" data-title="${esc(t.name)}">
      <div class="tpl-thumb ${k.thumb}">${k.render(art(t))}
        <div class="tpl-overlay"><button class="btn btn--white btn--sm" data-preview>${icon('eye', 16)} Preview</button><a class="btn btn--primary btn--sm" href="/contact?template=${t.id}">Ask about this template</a></div>
      </div>
      <div class="tpl-meta"><h3>${esc(t.name)}</h3>${t.pro ? '<span class="tag tag--purple">Pro</span>' : '<span class="tag tag--gray">Free</span>'}</div>
    </article>`)}
  </div>
  <div class="empty" data-empty><p class="h4">No templates match your search</p><p class="mt-8">Try another keyword, or <button class="text-link" data-filter-reset>clear filters</button>.</p></div>
</div></section>

<section class="section bg-beige"><div class="container">
  ${sectionHead({ title: 'From template to sent credential in three steps' })}
  <div class="steps">${join(steps, ([t, p], i) => `<div class="step"><span class="step-num">${i + 1}</span><h3 class="h4">${t}</h3><p class="muted">${p}</p></div>`)}</div>
  <div class="btn-row btn-row--center mt-48">${btn('Talk to our team', '/contact', 'primary', { size: 'lg' })}${btn('Try the AI generator', '/free-ai-certificate-generator', 'secondary', { size: 'lg', icon: 'sparkles', iconLeft: true })}</div>
</div></section>

${ui.faqSection(faq, { title: 'Template questions', cls: '' })}
${ui.ctaBand({ title: 'Can’t find the right design?', lead: 'Tell our team what you need for your credential program.', primary: ['Contact our team', '/contact'], secondary: ['See design features', '/features/design'] })}
${previewModal}`;
}

const commonFaq = [
  { q: 'Are the templates free?', a: '<p>Templates marked Free can be used on every plan, including Starter. Pro templates are available on paid plans.</p>' },
  { q: 'Can I edit every part of a template?', a: '<p>Yes. Change any text, color, font, image or layout element in the design builder.</p>' },
  { q: 'Can I use my own design instead?', a: '<p>Absolutely. Upload a PNG, JPG or PDF background and add dynamic fields on top.</p>' },
  { q: 'Which formats can I export?', a: '<p>Recipients can download PDF and PNG files, and every credential is also hosted online with a verification page.</p>' },
];

module.exports = [
  { path: '/certificate-templates', title: 'Certificate Templates', description: 'Free, editable certificate templates for completion, achievement, training, events and more.',
    body: gallery('certificate', { title: 'Certificate templates', lead: 'Professionally designed, fully editable templates for every occasion. Customize one in minutes and send it to hundreds of recipients.', faq: commonFaq }) },
  { path: '/badge-templates', title: 'Badge Templates', description: 'Editable digital badge templates for skills, events, memberships and levels.',
    body: gallery('badge', { title: 'Digital badge templates', lead: 'Badges for skills, levels, events and memberships — Open Badges 3.0 ready and easy to make your own.', faq: commonFaq }) },
  { path: '/document-templates', title: 'Document Templates', description: 'Templates for transcripts, letters, diplomas and membership cards.',
    body: gallery('document', { title: 'Document templates', lead: 'Transcripts, letters, diplomas and cards — combine them into multi-page credentials.', faq: commonFaq }) },
];
