// Static site generator: renders every page in src/pages into dist/ and checks internal links.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const PAGE_MODULES = ['home', 'pricing', 'features', 'solutions', 'templates', 'blog', 'company', 'legal', 'support', 'support-widget'];

function clearRequireCache() {
  Object.keys(require.cache).forEach((k) => { if (k.startsWith(SRC)) delete require.cache[k]; });
}

function outFile(p) {
  if (p === '/') return path.join(DIST, 'index.html');
  if (p === '/404') return path.join(DIST, '404.html');
  return path.join(DIST, p.replace(/^\//, ''), 'index.html');
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

function build({ quiet = false } = {}) {
  const t0 = Date.now();
  clearRequireCache();
  const { page } = require('./src/layout');
  const pages = PAGE_MODULES.flatMap((m) => require(`./src/pages/${m}`));

  const seen = new Set();
  for (const p of pages) {
    if (seen.has(p.path)) throw new Error(`Duplicate page path: ${p.path}`);
    seen.add(p.path);
  }

  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

  const html = new Map();
  for (const p of pages) {
    const out = page(p);
    const file = outFile(p.path);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, out);
    html.set(p.path, out);
  }

  const { domain } = require('./src/site');
  const urls = pages.filter((p) => p.path !== '/404' && !p.noIndex).map((p) => `  <url><loc>https://${domain}${p.path === '/' ? '/' : p.path}</loc></url>`);
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://${domain}/sitemap.xml\n`);

  // Internal link check: every href="/..." must resolve to a page or asset.
  const broken = [];
  for (const [from, out] of html) {
    for (const m of out.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const target = m[1].replace(/\/$/, '') || '/';
      if (seen.has(target)) continue;
      if (fs.existsSync(path.join(DIST, target))) continue;
      broken.push(`${from} -> ${m[1]}`);
    }
  }

  if (!quiet) console.log(`Built ${pages.length} pages in ${Date.now() - t0}ms`);
  if (broken.length) {
    console.error(`\n${broken.length} broken internal link(s):\n  ` + [...new Set(broken)].join('\n  '));
    process.exitCode = 1;
  } else if (!quiet) {
    console.log('All internal links resolve.');
  }
  return { pages: pages.length, broken };
}

if (require.main === module) build();
module.exports = build;
