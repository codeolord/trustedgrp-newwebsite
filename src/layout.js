// Page shell: <head>, header with mega menus, mobile drawer, footer, help widget.
const site = require('./site');
const { icon } = require('./icons');
const { esc, join, editorMock, sendMock, verifyMock, certSVG, intLogo } = require('./ui');
const { integrations } = require('./data/content');

const NAV = {
  features: {
    create: [
      { href: '/features/design', icon: 'pen', title: 'Design builder', desc: 'Drag-and-drop editor for on-brand designs' },
      { href: '/features/generator', icon: 'bolt', title: 'Bulk generator', desc: 'Create thousands of credentials at once' },
      { href: '/features/distribution', icon: 'send', title: 'Automated delivery', desc: 'Email, schedule and trigger sends' },
    ],
    manage: [
      { href: '/features/management', icon: 'folder', title: 'Credential management', desc: 'Edit, renew, revoke and organize' },
      { href: '/features/sharing', icon: 'share', title: 'Social sharing', desc: 'Turn recipients into promoters' },
      { href: '/features/analytics', icon: 'chart', title: 'Analytics', desc: 'Track opens, shares and verifications' },
    ],
  },
  products: [
    { href: '/create', icon: 'certificate', title: 'Certificates', desc: 'Issue verifiable digital certificates' },
    { href: '/digital-badges', icon: 'award', title: 'Digital badges', desc: 'Open Badges 3.0 compliant' },
    { href: '/credential-wallet', icon: 'wallet', title: 'Credential wallet', desc: 'A branded home for every credential' },
    { href: '/forms', icon: 'form', title: 'Forms', desc: 'Collect data and issue on submit', tag: 'New' },
    { href: '/multi-page-credentials', icon: 'pages', title: 'Multi-page credentials', desc: 'Transcripts, diplomas and more' },
  ],
  useCases: [
    { href: '/solutions/education', icon: 'graduation', title: 'Education' },
    { href: '/solutions/training', icon: 'book', title: 'Training providers' },
    { href: '/solutions/events', icon: 'ticket', title: 'Events & conferences' },
    { href: '/solutions/corporate', icon: 'briefcase', title: 'HR & corporate' },
    { href: '/solutions/associations', icon: 'users', title: 'Associations' },
  ],
  resources: [
    { href: '/certificate-templates', title: 'Certificate templates' },
    { href: '/badge-templates', title: 'Badge templates' },
    { href: '/document-templates', title: 'Document templates' },
    { href: '/blog', title: 'Blog' },
    { href: '/customers', title: 'Customer stories' },
  ],
};

const megaLink = (l) => `<a class="mega-link" href="${l.href}"><span class="mega-icon">${icon(l.icon, 18)}</span><span><span class="mega-title">${esc(l.title)}${l.tag ? `<span class="tag tag--green">${l.tag}</span>` : ''}</span>${l.desc ? `<span class="mega-desc">${esc(l.desc)}</span>` : ''}</span></a>`;
const simpleLink = (l) => `<a class="mega-int" href="${l.href}">${l.icon ? `<span class="mega-icon" style="width:30px;height:30px">${icon(l.icon, 16)}</span>` : ''}${esc(l.title)}</a>`;

function header(path) {
  const active = (prefixes) => prefixes.some((p) => path === p || path.startsWith(p + '/')) ? ' aria-current="page"' : '';
  const topInts = integrations.slice(0, 8);
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="container nav">
    <a class="brand" href="/" aria-label="${esc(site.name)} home"><img class="brand-logo" src="/assets/logo.svg" alt=""></a>
    <nav class="nav-menu" aria-label="Main">
      <div class="nav-item" data-dropdown>
        <button class="nav-link" aria-expanded="false"${active(['/features'])}>Features ${icon('chevronDown', 16, 'class="chev"')}</button>
        <div class="mega mega--3">
          <div class="mega-col"><div class="mega-label">Create &amp; issue</div>${join(NAV.features.create, megaLink)}</div>
          <div class="mega-col"><div class="mega-label">Manage &amp; grow</div>${join(NAV.features.manage, megaLink)}</div>
          <a class="mega-promo" href="/free-ai-certificate-generator">
            <div class="promo-art">${certSVG({ style: 'wave', accent: '#0b65ad', accent2: '#8fc4ed', name: 'Your Name', course: 'Generated in seconds' })}</div>
            <span class="tag tag--purple">${icon('sparkles', 12)} Free tool</span>
            <b style="font-weight:500">AI certificate generator</b>
            <span class="mega-desc">Describe it, and get a ready-to-send design in seconds.</span>
          </a>
          <div class="mega-foot"><a class="link-arrow" href="/features">Explore all features${icon('arrowRight', 16)}</a><a href="/changelog">What's new →</a></div>
        </div>
      </div>
      <div class="nav-item" data-dropdown>
        <button class="nav-link" aria-expanded="false"${active(['/solutions', '/create', '/digital-badges', '/credential-wallet', '/forms', '/multi-page-credentials'])}>Solutions ${icon('chevronDown', 16, 'class="chev"')}</button>
        <div class="mega mega--3">
          <div class="mega-col"><div class="mega-label">Products</div>${join(NAV.products, megaLink)}</div>
          <div class="mega-col"><div class="mega-label">Use cases</div>${join(NAV.useCases, simpleLink)}</div>
          <div class="mega-col"><div class="mega-label">Resources</div>${join(NAV.resources, simpleLink)}</div>
          <div class="mega-foot"><a class="link-arrow" href="/solutions">All solutions${icon('arrowRight', 16)}</a><a href="/customers">Customer stories →</a></div>
        </div>
      </div>
      <div class="nav-item" data-dropdown>
        <button class="nav-link" aria-expanded="false"${active(['/integrations', '/developers'])}>Integrations ${icon('chevronDown', 16, 'class="chev"')}</button>
        <div class="mega mega--2">
          <div class="mega-col"><div class="mega-label">Popular</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px">${join(topInts, (i) => `<a class="mega-int" href="/integrations?q=${encodeURIComponent(i.name)}">${intLogo(i, true)}${esc(i.name)}</a>`)}</div>
          </div>
          <div class="mega-col"><div class="mega-label">Build your own</div>
            ${megaLink({ href: '/developers', icon: 'code', title: 'API & MCP server', desc: 'Issue credentials from your own app or AI agent' })}
            ${megaLink({ href: '/contact', icon: 'plug', title: 'Request an integration', desc: "Tell us what you'd like to connect" })}
          </div>
          <div class="mega-foot"><a class="link-arrow" href="/integrations">See all ${integrations.length}+ integrations${icon('arrowRight', 16)}</a></div>
        </div>
      </div>
      <a class="nav-link" href="/enterprise"${active(['/enterprise'])}>Enterprise</a>
      <a class="nav-link" href="/pricing"${active(['/pricing'])}>Pricing</a>
    </nav>
    <div class="nav-actions">
      <a class="btn btn--primary" href="${site.demoUrl}">Book a demo</a>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle>${icon('menu', 24, 'class="i-menu"')}${icon('close', 24, 'class="i-close"')}</button>
    </div>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" data-mobile-nav>
  <details class="mnav-group"><summary>Features ${icon('chevronDown', 20)}</summary><div class="mnav-sub">
    ${join([...NAV.features.create, ...NAV.features.manage], (l) => `<a href="${l.href}">${icon(l.icon, 18)}${esc(l.title)}</a>`)}
    <a href="/free-ai-certificate-generator">${icon('sparkles', 18)}AI certificate generator</a>
    <a href="/features">${icon('grid', 18)}All features</a>
  </div></details>
  <details class="mnav-group"><summary>Solutions ${icon('chevronDown', 20)}</summary><div class="mnav-sub">
    ${join([...NAV.products, ...NAV.useCases], (l) => `<a href="${l.href}">${icon(l.icon, 18)}${esc(l.title)}</a>`)}
    <a href="/solutions">${icon('grid', 18)}All solutions</a>
  </div></details>
  <details class="mnav-group"><summary>Resources ${icon('chevronDown', 20)}</summary><div class="mnav-sub">
    ${join(NAV.resources, (l) => `<a href="${l.href}">${esc(l.title)}</a>`)}
    <a href="/changelog">Changelog</a>
  </div></details>
  <a class="mnav-link" href="/integrations">Integrations ${icon('chevronRight', 20)}</a>
  <a class="mnav-link" href="/enterprise">Enterprise ${icon('chevronRight', 20)}</a>
  <a class="mnav-link" href="/pricing">Pricing ${icon('chevronRight', 20)}</a>
  <div class="mnav-actions">
    <a class="btn btn--primary btn--lg" href="${site.demoUrl}">Book a demo</a>
  </div>
</div>`;
}

const FOOTER = [
  ['Product', [['Pricing', '/pricing'], ['Enterprise', '/enterprise'], ['Certificates', '/create'], ['Digital badges', '/digital-badges'], ['Credential wallet', '/credential-wallet'], ['Forms', '/forms'], ['Multi-page credentials', '/multi-page-credentials'], ['All solutions', '/solutions']]],
  ['Features', [['All features', '/features'], ['Integrations', '/integrations'], ['Design builder', '/features/design'], ['Bulk generator', '/features/generator'], ['Automated delivery', '/features/distribution'], ['Credential management', '/features/management'], ['Social sharing', '/features/sharing'], ['Analytics', '/features/analytics'], ['AI certificate generator', '/free-ai-certificate-generator'], ['API & MCP', '/developers']]],
  ['Resources', [['Blog', '/blog'], ['Certificate templates', '/certificate-templates'], ['Badge templates', '/badge-templates'], ['Document templates', '/document-templates'], ['Customer stories', '/customers'], ['Changelog', '/changelog']]],
  ['Company', [['About us', '/about'], ['Contact', '/contact'], ['Book a demo', site.demoUrl], ['Affiliate program', '/affiliate'], ['Legal & security', '/legal-and-security'], ['Privacy policy', '/privacy'], ['Terms of service', '/terms'], ['Cookie policy', '/cookies']]],
];

function footer() {
  const s = site.social;
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="${esc(site.name)} home"><img class="brand-logo" src="/assets/logo.svg" alt=""></a>
        <p>${esc(site.tagline)} Design, send, track and verify certificates and badges from one place.</p>
        <div class="socials">
          <a href="${s.linkedin}" aria-label="LinkedIn" rel="noopener" target="_blank">${icon('linkedin', 18)}</a>
          <a href="${s.x}" aria-label="X" rel="noopener" target="_blank">${icon('x', 16)}</a>
          <a href="${s.instagram}" aria-label="Instagram" rel="noopener" target="_blank">${icon('instagram', 18)}</a>
          <a href="${s.youtube}" aria-label="YouTube" rel="noopener" target="_blank">${icon('youtube', 18)}</a>
          ${s.facebook ? `<a href="${s.facebook}" aria-label="Facebook" rel="noopener" target="_blank">${icon('facebook', 18)}</a>` : ''}
        </div>
        <address class="footer-contact">
          <a href="https://maps.google.com/?q=${encodeURIComponent(site.address)}" target="_blank" rel="noopener">${esc(site.address)}</a>
          <a href="tel:+2349128115310">${esc(site.phone)}</a>
          <a href="tel:+2348120466258">${esc(site.whatsapp)}</a>
          <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        </address>
      </div>
      ${join(FOOTER, ([h, links]) => `<div class="footer-col"><h3>${h}</h3><ul>${join(links, ([l, href]) => `<li><a href="${href}">${esc(l)}</a></li>`)}</ul></div>`)}
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${esc(site.name)}. All rights reserved.</span>
      <span class="status-dot">All systems operational</span>
      <nav aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookies">Cookies</a><a href="/legal-and-security">Security</a></nav>
    </div>
  </div>
</footer>`;
}

function visitorChat({ embedded = false } = {}) {
  const backLabel = embedded ? 'Close support chat' : 'Back to help options';
  return `<section class="visitor-chat" data-chat-view${embedded ? '' : ' hidden'} aria-label="Chat with support">
    <div class="visitor-chat-head"><button type="button" class="chat-back" data-chat-back aria-label="${backLabel}">${icon(embedded ? 'close' : 'chevronLeft', 18)}</button><div><b>Trusted Verifier Support</b><small>Messages are usually answered during business hours</small></div></div>
    <div class="chat-scroll" data-chat-messages role="log" aria-live="polite" aria-relevant="additions text"></div>
    <div class="chat-error" data-chat-error role="alert" hidden></div>
    <form class="chat-start-form" data-chat-start-form>
      <p>Tell us who you are to start chatting. Email is optional; stay on this page to see replies.</p>
      <label for="chat-visitor-name">Your name</label><input id="chat-visitor-name" name="name" class="input" maxlength="120" autocomplete="name" required>
      <label for="chat-visitor-email">Email <span>(optional)</span></label><input id="chat-visitor-email" name="email" class="input" type="email" maxlength="254" autocomplete="email">
      <small>Chat messages and the details you provide are stored to help our support team respond. See our <a href="/privacy">Privacy Policy</a>.</small>
      <button type="submit" class="btn btn--primary btn--block">Start chat</button>
    </form>
    <form class="chat-compose" data-chat-compose hidden>
      <label class="sr-only" for="chat-message">Your message</label>
      <textarea class="input" id="chat-message" name="message" rows="2" maxlength="5000" placeholder="Write a message…" required></textarea>
      <button type="submit" class="btn btn--primary" aria-label="Send message">${icon('send', 18)}</button>
    </form>
    <p class="chat-closed" data-chat-closed hidden>This conversation is closed. <button type="button" class="text-link" data-chat-new>Start a new chat</button> to contact the team.</p>
  </section>
`;
}

function helpWidget() {
  return `<button class="help-fab" aria-label="Open help menu" aria-expanded="false" aria-controls="help-panel" data-help-toggle>${icon('message', 24)}</button>
<div class="help-panel" id="help-panel" data-help-panel role="dialog" aria-label="Help">
  <div data-chat-home>
    <div class="help-head"><b style="font-size:18px;font-weight:500">Hi there 👋</b><p>How can we help you today?</p></div>
    <div class="help-links">
      <button type="button" class="help-chat-link" data-chat-open><span class="icon-tile">${icon('message', 18)}</span><span>Chat with support<small>Talk directly with our support team</small></span></button>
      <a href="${site.demoUrl}"><span class="icon-tile">${icon('calendar', 18)}</span><span>Book a demo<small>See ${esc(site.name)} with a product expert</small></span></a>
      <a href="/contact"><span class="icon-tile">${icon('headset', 18)}</span><span>Contact support<small>Send our team a message</small></span></a>
      <a href="/certificate-templates"><span class="icon-tile">${icon('grid', 18)}</span><span>Browse templates<small>Hundreds of ready-made designs</small></span></a>
      <a href="/blog"><span class="icon-tile">${icon('book', 18)}</span><span>Guides &amp; articles<small>Learn credentialing best practices</small></span></a>
    </div>
  </div>
  ${visitorChat()}
</div>`;
}

function tourModal() {
  return `<div class="modal" id="tour" data-modal role="dialog" aria-modal="true" aria-labelledby="tour-title">
  <div class="modal-backdrop" data-close></div>
  <div class="modal-dialog">
    <button class="modal-close" aria-label="Close" data-close>${icon('close', 20)}</button>
    <div class="modal-head"><span class="eyebrow">Product tour</span><h2 class="h3" id="tour-title">From design to verified credential in three steps</h2></div>
    <div class="modal-body" data-tour>
      <div class="tour-stage tint-sky">
        <div class="tour-slide" data-tour-slide>${editorMock()}</div>
        <div class="tour-slide" data-tour-slide hidden>${sendMock()}</div>
        <div class="tour-slide" data-tour-slide hidden>${verifyMock()}</div>
      </div>
      <div class="tour-steps">
        <button class="is-active" data-tour-step><b>1. Design</b>Pick a template and brand it.<div class="tour-progress"><i></i></div></button>
        <button data-tour-step><b>2. Send</b>Upload recipients and send in bulk.<div class="tour-progress"><i></i></div></button>
        <button data-tour-step><b>3. Verify</b>Anyone can verify it in one click.<div class="tour-progress"><i></i></div></button>
      </div>
    </div>
  </div>
</div>`;
}

function page({ path, title, description, body, bare = false, noFooter = false, redirectTo, noIndex = false }) {
  const fullTitle = path === '/' ? `${site.name} | ${title}` : `${title} | ${site.name}`;
  const desc = description || site.tagline;
  const needsTour = body.includes('data-open="tour"');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
${bare || noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
${redirectTo ? `<meta http-equiv="refresh" content="0;url=${esc(redirectTo)}">` : ''}
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0b65ad">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
<script src="/assets/main.js" defer></script>
<script src="/assets/support.js" defer></script>
</head>
<body>
${bare ? '' : header(path)}
<main id="main">
${body}
</main>
${bare || noFooter ? '' : footer()}
${bare ? '' : helpWidget()}
${needsTour ? tourModal() : ''}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

module.exports = { page, visitorChat, NAV };
