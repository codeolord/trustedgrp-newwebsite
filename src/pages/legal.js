// Legal & security pages. The policy text is a starting template — have it reviewed before publishing.
const ui = require('../ui');
const { icon, esc, join, linkArrow, breadcrumb, sectionHead } = ui;
const site = require('../site');

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const UPDATED = 'October 1, 2026';

function legalPage(path, title, intro, sections) {
  return {
    path, title, description: `${site.name} ${title.toLowerCase()}.`,
    body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Legal & security', href: '/legal-and-security' }, { label: title }])}</div>
<header class="container container--narrow article-head">
  <h1 class="h1 h1--sm">${esc(title)}</h1>
  <p class="small subtle">Last updated: ${UPDATED}</p>
  <div class="notice">${icon('info', 18)}<span>This document is a template. Replace it with text reviewed by your legal counsel before going live.</span></div>
</header>
<div class="container" style="max-width:1080px;padding-bottom:96px"><div class="article-layout">
  <nav class="toc" aria-label="Sections" data-scrollspy><b>Sections</b>${join(sections, ([h]) => `<a href="#${slug(h)}">${esc(h)}</a>`)}</nav>
  <div class="prose prose--legal">
    <p>${intro}</p>
    ${join(sections, ([h, paras]) => `<h2 id="${slug(h)}">${esc(h)}</h2>${join(paras, (p) => (Array.isArray(p) ? `<ul>${join(p, (li) => `<li>${li}</li>`)}</ul>` : `<p>${p}</p>`))}`)}
  </div>
</div></div>`,
  };
}

const privacy = legalPage('/privacy', 'Privacy Policy',
  `This Privacy Policy explains how ${site.name} (“we”, “us”) collects, uses and protects personal data when you use our website and services.`,
  [
    ['Who we are', [`${site.name} provides software for creating, issuing and verifying digital credentials. For questions about this policy, contact <a href="mailto:${site.email}">${site.email}</a>.`]],
    ['Data we collect', ['We collect the following categories of data:', ['Account data, such as your name, email and organization.', 'Recipient data that our customers upload to issue credentials.', 'Usage data, such as pages visited and features used.', 'Billing data processed by our payment provider.']]],
    ['How we use data', ['We use personal data to provide and improve the service, communicate with you, process payments, ensure security and meet legal obligations.']],
    ['Recipients of credentials', ['When an organization issues you a credential, that organization is the controller of your data and we process it on their behalf. Contact the issuing organization to exercise your rights.']],
    ['Sharing', ['We share data only with service providers that help us operate the service (for example hosting, email delivery and payments), under contracts that protect your data. We do not sell personal data.']],
    ['Retention', ['We keep personal data for as long as your account is active or as needed to provide the service, and delete or anonymize it afterwards unless the law requires otherwise.']],
    ['Your rights', ['Depending on where you live, you may have the right to access, correct, delete, restrict or port your data, and to object to processing. Contact us to exercise these rights.']],
    ['Changes', ['We may update this policy from time to time. We will notify you of material changes by email or through the service.']],
  ]);

const terms = legalPage('/terms', 'Terms of Service',
  `These Terms of Service govern your use of ${site.name}. By creating an account or using the service, you agree to these terms.`,
  [
    ['The service', [`${site.name} lets you design, issue, deliver and verify digital certificates and badges. We may improve and change features over time.`]],
    ['Accounts', ['You are responsible for your account, for keeping your login details secure, and for all activity under your account.']],
    ['Acceptable use', ['You agree not to:', ['Issue credentials that are fraudulent or misleading.', 'Upload content you do not have the rights to use.', 'Attempt to disrupt or gain unauthorized access to the service.']]],
    ['Your content', ['You keep ownership of the content you upload. You grant us the rights needed to host and display it to provide the service.']],
    ['Plans and payment', ['Paid plans are billed in advance on a monthly or yearly basis. You can cancel at any time; access continues until the end of the billing period.']],
    ['Affiliate program', ['Affiliates earn commission on qualifying payments from referred customers, subject to the program rules provided on approval.']],
    ['Liability', ['To the extent permitted by law, our total liability is limited to the amount you paid us in the 12 months before the claim.']],
    ['Termination', ['We may suspend accounts that violate these terms. You may close your account at any time.']],
    ['Contact', [`Questions about these terms? Email <a href="mailto:${site.email}">${site.email}</a>.`]],
  ]);

const cookies = legalPage('/cookies', 'Cookie Policy',
  'This Cookie Policy explains how we use cookies and similar technologies on our website.',
  [
    ['What are cookies?', ['Cookies are small text files stored on your device that help websites work and remember your preferences.']],
    ['Cookies we use', [['<b>Essential</b> — required for login, security and core functionality.', '<b>Preferences</b> — remember settings such as language.', '<b>Analytics</b> — help us understand how the site is used, only with your consent.']]],
    ['Managing cookies', ['You can change your cookie preferences at any time in your browser settings. Blocking essential cookies may affect how the site works.']],
  ]);

const security = {
  path: '/legal-and-security',
  title: 'Legal & Security',
  description: `How ${site.name} protects your data, plus our legal documents.`,
  body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Legal & security' }])}</div>
<section class="hero hero--center" style="padding:40px 0"><div class="container"><div class="hero-copy">
  <span class="pill">${icon('shield', 14)} Trust center</span>
  <h1 class="h1 h1--sm">Security and legal</h1>
  <p class="lead">How we protect your data and your recipients’ data — and the documents that govern our service.</p>
</div></div></section>
<section class="section--sm section--flush-top" id="security-policies"><div class="container">
  ${sectionHead({ title: 'Security practices', align: 'left' })}
  <div class="grid-3">${join([
    ['lock', 'Encryption', 'TLS 1.2+ in transit and AES-256 encryption at rest for all customer data.'],
    ['cloud', 'Hosting', 'Hosted with major cloud providers in the EU or US, with daily encrypted backups.'],
    ['key', 'Access control', 'SSO, role-based permissions and least-privilege access for our staff.'],
    ['eye', 'Monitoring', '24/7 uptime monitoring, alerting and centralized audit logging.'],
    ['shield', 'Testing', 'Regular third-party penetration tests and automated dependency scanning.'],
    ['users', 'People', 'Background checks, security training and confidentiality agreements for every employee.'],
  ], ([ic, t, p]) => `<div class="card-bordered"><span class="icon-tile">${icon(ic, 22)}</span><h3 class="h5">${t}</h3><p class="muted">${p}</p></div>`)}</div>
</div></section>
<section class="section bg-beige" id="legal-documents"><div class="container">
  ${sectionHead({ title: 'Legal documents', align: 'left' })}
  <div class="grid-3">${join([
    ['/privacy', 'Privacy Policy', 'How we collect, use and protect personal data.'],
    ['/terms', 'Terms of Service', 'The rules for using our service.'],
    ['/cookies', 'Cookie Policy', 'Which cookies we use and why.'],
  ], ([h, t, p]) => `<a class="card" href="${h}"><div class="card-body"><span class="icon-tile">${icon('fileText', 22)}</span><h3 class="h4">${t}</h3><p class="muted">${p}</p><span class="link-arrow">Read${icon('arrowRight', 16)}</span></div></a>`)}</div>
  <div class="card-bordered mt-24" style="grid-template-columns:1fr auto;align-items:center">
    <div><h3 class="h5">Need a DPA or security questionnaire?</h3><p class="muted">We sign data processing agreements and complete vendor security reviews.</p></div>
    ${linkArrow('Contact us', '/contact')}
  </div>
</div></section>
<section class="section--sm"><div class="container container--text center stack">
  <h2 class="h3">Responsible disclosure</h2>
  <p class="muted">Found a vulnerability? Please email <a class="text-link" href="mailto:security@${site.domain}">security@${site.domain}</a>. We respond within two business days and never take legal action against good-faith research.</p>
</div></section>`,
};

module.exports = [security, privacy, terms, cookies];
