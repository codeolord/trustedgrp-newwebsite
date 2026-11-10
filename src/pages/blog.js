// Blog and customer stories.
const ui = require('../ui');
const { icon, esc, join, btn, linkArrow, breadcrumb, sectionHead, postCover, avatar } = ui;
const { posts, authors, customers } = require('../data/content');
const site = require('../site');

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const authorBlock = (key, date, read) => {
  const a = authors[key];
  const i = Object.keys(authors).indexOf(key);
  return `<div class="author"><span class="av" style="background:${ui.AV_COLORS[i + 2]}">${ui.initials(a.name)}</span><div><b style="font-weight:500">${esc(a.name)}</b><small>${esc(a.role)} · ${esc(date)} · ${esc(read)} read</small></div></div>`;
};

const postCard = (p) => `<a class="post-card" href="/blog/${p.slug}" data-item data-category="${esc(p.category)}" data-name="${esc(p.title + ' ' + p.excerpt)}">
  ${postCover(p)}
  <div class="post-meta"><span class="tag tag--gray">${esc(p.category)}</span><span>${esc(p.date)}</span><span>· ${esc(p.read)}</span></div>
  <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>
</a>`;

const featured = posts.find((p) => p.featured) || posts[0];
const cats = [...new Set(posts.map((p) => p.category))];

const blogIndex = {
  path: '/blog',
  title: 'Blog',
  description: 'Guides, templates and ideas for running successful certification programs.',
  body: `
<section class="hero hero--center" style="padding-bottom:40px"><div class="container"><div class="hero-copy">
  <span class="pill">${icon('book', 14)} The ${esc(site.name)} blog</span>
  <h1 class="h1 h1--sm">Guides for better credential programs</h1>
  <p class="lead">Practical advice on designing, issuing and marketing certificates and digital badges.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container">
  <a class="post-featured post-card" href="/blog/${featured.slug}">
    ${postCover(featured, 40)}
    <div class="stack">
      <div class="post-meta"><span class="tag">Featured</span><span class="tag tag--gray">${esc(featured.category)}</span></div>
      <h2>${esc(featured.title)}</h2>
      <p class="lead">${esc(featured.excerpt)}</p>
      ${authorBlock(featured.author, featured.date, featured.read)}
    </div>
  </a>
  <div data-filter>
    <div class="toolbar">
      <div class="chips" role="group" aria-label="Filter by category">
        <button class="chip is-active" data-filter-value="all" aria-pressed="true">All articles</button>
        ${join(cats, (c) => `<button class="chip" data-filter-value="${esc(c)}" aria-pressed="false">${esc(c)}</button>`)}
      </div>
      <label class="search"><span class="sr-only">Search articles</span>${icon('search', 18)}<input class="input" type="search" placeholder="Search articles" data-filter-search></label>
    </div>
    <div class="grid-3" style="row-gap:48px">${join(posts, postCard)}</div>
    <div class="empty" data-empty><p class="h4">No articles found</p><p class="mt-8">Try a different search, or <button class="text-link" data-filter-reset>show all articles</button>.</p></div>
  </div>
</div></section>
<section class="section--sm"><div class="container"><div class="newsletter">
  <div class="stack-sm"><h2 class="h3">Get new guides in your inbox</h2><p class="muted">One useful email a month. No spam, unsubscribe anytime.</p></div>
  <div>
    <form class="form newsletter-form" data-form="newsletter">
      <div class="field"><label class="sr-only" for="nl-email">Email</label><input class="input" id="nl-email" type="email" name="email" placeholder="you@company.com" required><span class="err">Enter a valid email address</span></div>
      <p class="form-submit-error" data-form-error role="alert" hidden></p>
      <button class="btn btn--primary" type="submit">Subscribe</button>
    </form>
    <div class="form-success" style="padding:0;justify-items:start;text-align:left"><b>You're subscribed 🎉</b><span class="small muted">Watch your inbox for the next issue.</span></div>
  </div>
</div></div></section>
${ui.ctaBand()}`,
};

const postPages = posts.map((p) => {
  const related = posts.filter((o) => o.slug !== p.slug).slice(0, 3);
  return {
    path: `/blog/${p.slug}`,
    title: p.title,
    description: p.excerpt,
    body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: p.category }])}</div>
<article>
  <header class="container container--narrow article-head">
    <span class="tag tag--gray" style="justify-self:start">${esc(p.category)}</span>
    <h1 class="h1 h1--sm">${esc(p.title)}</h1>
    <p class="lead">${esc(p.excerpt)}</p>
    ${authorBlock(p.author, p.date, p.read)}
  </header>
  <div class="container" style="max-width:1080px">
    <div style="margin-bottom:48px">${postCover(p, 48)}</div>
    <div class="article-layout">
      <nav class="toc" aria-label="On this page" data-scrollspy><b>On this page</b>${join(p.sections, ([h]) => `<a href="#${slugify(h)}">${esc(h)}</a>`)}</nav>
      <div class="prose">
        ${join(p.sections, ([h, paras]) => `<h2 id="${slugify(h)}">${esc(h)}</h2>${join(paras, (para) => `<p>${esc(para)}</p>`)}`)}
        <div class="callout"><b>Explore Trusted Verifier.</b> Browse our <a href="/certificate-templates">certificate templates</a> or <a href="/contact">talk to our team</a> about issuing credentials.</div>
        <div class="row" style="gap:8px;flex-wrap:wrap;padding-top:8px">
          <span class="small muted">Share this article:</span>
          <a class="btn btn--secondary btn--sm" href="https://www.linkedin.com/sharing/share-offsite/?url=https://${site.domain}/blog/${p.slug}" target="_blank" rel="noopener">${icon('linkedin', 14)} LinkedIn</a>
          <a class="btn btn--secondary btn--sm" href="https://x.com/intent/post?url=https://${site.domain}/blog/${p.slug}&text=${encodeURIComponent(p.title)}" target="_blank" rel="noopener">${icon('x', 13)} Post</a>
        </div>
      </div>
    </div>
  </div>
</article>
<section class="section bg-beige mt-64"><div class="container">
  <div class="section-head section-head--row"><h2 class="h2">Keep reading</h2>${linkArrow('All articles', '/blog')}</div>
  <div class="grid-3">${join(related, postCard)}</div>
</div></section>
${ui.ctaBand()}`,
  };
});

// Customer stories ----------------------------------------------------------------
const customersIndex = {
  path: '/customers',
  title: 'Customer Stories',
  description: `How schools, training providers, events and associations run their credential programs with ${site.name}.`,
  body: `
<section class="hero hero--center" style="padding-bottom:40px"><div class="container"><div class="hero-copy">
  <span class="pill">${icon('heart', 14)} Customer stories</span>
  <h1 class="h1 h1--sm">Programs that run on ${esc(site.name)}</h1>
  <p class="lead">See how organizations save time, prevent fraud and grow their reach with digital credentials.</p>
</div></div></section>
<section class="section--sm section--flush-top"><div class="container"><div class="grid-2">
  ${join(customers, (c) => `<a class="card" href="/customers/${c.slug}">
    <div class="card-media" style="background:${c.tint};aspect-ratio:16/8;place-items:center">
      <div class="row" style="gap:12px;font-size:24px;font-weight:600;letter-spacing:-0.02em">${icon(c.glyph, 30)}${esc(c.org)}</div>
    </div>
    <div class="card-body">
      <span class="small subtle">${esc(c.industry)}</span>
      <h2 class="h4">${esc(c.headline)}</h2>
      <div class="row" style="gap:28px;margin-top:6px">${join(c.metrics.slice(0, 2), ([n, l]) => `<div class="stat"><span style="font-size:28px;font-weight:500;letter-spacing:-0.02em">${esc(n)}</span><span class="small muted">${esc(l)}</span></div>`)}</div>
      <span class="link-arrow">Read the story${icon('arrowRight', 16)}</span>
    </div>
  </a>`)}
</div></div></section>
${ui.logoWall('More teams issuing with us')}
${ui.ctaBand({ title: 'Write your own success story' })}`,
};

const customerPages = customers.map((c, i) => ({
  path: `/customers/${c.slug}`,
  title: `${c.org} customer story`,
  description: c.summary,
  body: `
<div class="container">${breadcrumb([{ label: 'Home', href: '/' }, { label: 'Customer stories', href: '/customers' }, { label: c.org }])}</div>
<section class="hero"><div class="container hero-grid">
  <div class="hero-copy">
    <span class="pill">${icon(c.glyph, 14)} ${esc(c.industry)}</span>
    <h1 class="h1 h1--sm">${esc(c.headline)}</h1>
    <p class="lead">${esc(c.summary)}</p>
  </div>
  <div style="background:${c.tint};border-radius:24px;padding:40px;display:grid;gap:24px">
    <div class="row" style="gap:12px;font-size:26px;font-weight:600;letter-spacing:-0.02em">${icon(c.glyph, 32)}${esc(c.org)}</div>
    <div class="grid-3" style="gap:16px">${join(c.metrics, ([n, l]) => `<div class="card-flat" style="padding:18px"><span class="stat-num" style="font-size:30px">${esc(n)}</span><span class="small muted">${esc(l)}</span></div>`)}</div>
  </div>
</div></section>
<section class="section--sm"><div class="container container--text prose">
  <h2>The challenge</h2><p>${esc(c.challenge)}</p>
  <h2>The solution</h2><p>${esc(c.solution)}</p>
  <h2>The results</h2><p>${esc(c.results)}</p>
</div></section>
<section class="section bg-beige"><div class="container">
  <div class="section-head section-head--row"><h2 class="h2">More customer stories</h2>${linkArrow('All stories', '/customers')}</div>
  <div class="grid-3">${join(customers.filter((o) => o.slug !== c.slug), (o) => `<a class="card" href="/customers/${o.slug}"><div class="card-body"><span class="row" style="gap:8px;font-weight:600">${icon(o.glyph, 20)}${esc(o.org)}</span><h3 class="h5">${esc(o.headline)}</h3><span class="link-arrow">Read the story${icon('arrowRight', 16)}</span></div></a>`)}</div>
</div></section>
${ui.ctaBand()}`,
}));

module.exports = [blogIndex, ...postPages, customersIndex, ...customerPages];
