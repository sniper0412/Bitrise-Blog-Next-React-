const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    const matchedRoute = routes.find(([path]) => path.test(parsedUrl.pathname));
    if (matchedRoute) {
      const [path, handler] = matchedRoute;
      return handler(app, req, res, path.test(parsedUrl.pathname));
    }

    return handle(req, res, parsedUrl);
  }).listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
