const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");
const requestIp = require("request-ip");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

// TODO: Our's cache will remove when have new deploy

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max:
    1000 *
    1024 *
    1024 /* cache size will be 1000 MB using `return n.length` as length() function */,
  length: function (n, key) {
    return n.length;
  },
  maxAge: 1000 * 60 * 60 * 24 * 30,
});

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.static("public/rootFiles"));
    server.use(requestIp.mw());

    server.use(function (req, res, next) {
      const ip = req.clientIp;
      console.log(ip);
      next();
    });

    server.get("/category/:slug/", (req, res) => {
      return app.render(req, res, "/category", { slug: req.params.slug });

      // return renderAndCache(req, res, "/category", { slug: req.params.slug });
      // return app.render(req, res, '/category', { slug: req.params.slug })
    });

    server.get("/", (req, res) => {
      return app.render(req, res, "/");
      // return renderAndCache(req, res, "/");
      // return app.render(req, res, '/')
    });

    server.get("/new-version/", (req, res) => {
      return renderAndCache(req, res, "/new-version");
      // return app.render(req, res, '/new-version')
    });

    server.get("/:slug/", (req, res) => {
      return renderAndCache(req, res, "/confession", { slug: req.params.slug });
      // return app.render(req, res, '/confession', { slug: req.params.slug })
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3003, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3003");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.path}`;
}

async function renderAndCache(req, res, path, query) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    //console.log(`serving from cache ${key}`);
    res.setHeader("x-cache", "HIT");
    res.send(ssrCache.get(key));
    return;
  }

  try {
    //console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, path, query);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    await app.renderError(err, req, res, req.path, req.query);
  }
}
