// Tiny static server for dist/. `node serve.js --watch` rebuilds when src/ changes.
const http = require('http');
const fs = require('fs');
const path = require('path');
const build = require('./build');

const PORT = Number(process.env.PORT) || 4321;
const DIST = path.join(__dirname, 'dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml',
};

build();

if (process.argv.includes('--watch')) {
  let t;
  fs.watch(path.join(__dirname, 'src'), { recursive: true }, () => {
    clearTimeout(t);
    t = setTimeout(() => { try { build(); } catch (e) { console.error(e); } }, 120);
  });
  console.log('Watching src/ for changes…');
}

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '') || '/';
  const candidates = clean === '/'
    ? ['index.html']
    : [clean.slice(1), path.join(clean.slice(1), 'index.html'), clean.slice(1) + '.html'];
  for (const c of candidates) {
    const f = path.join(DIST, c);
    if (!f.startsWith(DIST)) return null;
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

http.createServer((req, res) => {
  const file = resolve(req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return fs.createReadStream(path.join(DIST, '404.html')).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}`));
