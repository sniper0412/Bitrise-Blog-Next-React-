const { parse } = require('url');
const Path = require('path-parser').default;
const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');

const { fetchPosts } = require('./services/butter');

const redirectWithSlugConfig = (from, to) => [
  new Path(from),
  async (app, req, res, { slug }) => app.render(req, res, to, { slug })
];

module.exports = [
  redirectWithSlugConfig('/posts/:slug', '/post'),
  redirectWithSlugConfig('/categories/:slug', '/category'),
  redirectWithSlugConfig('/tags/:slug', '/tag'),
  redirectWithSlugConfig('/authors/:slug', '/author'),
  [
    new Path('/fetch-posts'),
    async (app, req, res) => {
      const { query } = parse(req.url, true);

      const camelCaseQuery = mapKeys(query, (_, key) => camelCase(key));

      const posts = await fetchPosts(camelCaseQuery);

      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(posts));
    }
  ]
];
